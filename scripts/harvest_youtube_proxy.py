#!/usr/bin/env python3
"""
Harvest YouTube transcripts via the reader-proxy trick.

The `timedtext` endpoint blocks datacenter IPs after roughly 100 videos
(``IpBlocked`` / HTTP 429), and retries, backoff, alternate player clients and
impersonation all fail. Two things do work:

  1. Metadata is not blocked — ``yt-dlp -J <id>`` returns the signed caption URL.
  2. Fetching that URL through a reader proxy resolves from a different IP.

So the pattern per video is: yt-dlp for the URL, then r.jina.ai to read it.

Usage (run somewhere with ordinary internet access, e.g. a GitHub runner):

    python3 scripts/harvest_youtube_proxy.py --playlist PLxxxx
    python3 scripts/harvest_youtube_proxy.py --playlist PLxxxx --limit 3   # smoke
    python3 scripts/harvest_youtube_proxy.py --playlist PLxxxx --build-ts

Output matches the Drive harvest schema so the app reads it unchanged:
    data/transcripts/<collection>/<videoId>.json
    data/catalog/youtube_manifest_<collection>.json
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_DIR = os.path.join(ROOT_DIR, "data", "catalog")
OUT_DIR = os.path.join(ROOT_DIR, "data", "transcripts")

PROXY_PREFIX = "https://r.jina.ai/"

# yt-dlp needs a JavaScript runtime plus its EJS solver scripts to get past
# YouTube's JS challenges. Only Deno is enabled by default, so any other
# runtime must be named explicitly.
_JS_RUNTIME_ARGS: list[str] | None = None


def js_runtime_args() -> list[str]:
    global _JS_RUNTIME_ARGS
    if _JS_RUNTIME_ARGS is not None:
        return _JS_RUNTIME_ARGS
    import shutil

    for runtime in ("deno", "node", "bun"):
        path = shutil.which(runtime)
        if path:
            _JS_RUNTIME_ARGS = ["--js-runtimes", f"{runtime}:{path}"]
            print(f"  JS runtime: {runtime} ({path})")
            return _JS_RUNTIME_ARGS
    print("  JS runtime: NONE — yt-dlp may fail to resolve caption URLs")
    _JS_RUNTIME_ARGS = []
    return _JS_RUNTIME_ARGS

# Playlists to harvest, with the collection slug they land in.
PLAYLISTS = {
    "christian-house-selman": {
        "playlistId": "PL92WcLuzyEGORejB8thjnIOCfxedSicKR",
        "channel": "Christian House",
        "author": "Apostle Joshua Selman",
        "subdir": "christian-house",
        "kind": "teachings",
    },
}


COOKIE_ARGS: list[str] = []


def run(cmd: list[str], timeout: int = 120) -> str:
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    if res.returncode != 0:
        raise RuntimeError(f"{cmd[0]} failed: {res.stderr[:200]}")
    return res.stdout


def enumerate_playlist(playlist_id: str) -> list[dict]:
    """Flat playlist mode is cheap and does not rate-limit."""
    out = run(
        [
            "yt-dlp",
            *js_runtime_args(),
            *COOKIE_ARGS,
            "--flat-playlist",
            "--print",
            "%(id)s\t%(title)s\t%(duration)s",
            f"https://www.youtube.com/playlist?list={playlist_id}",
        ],
        timeout=300,
    )
    entries = []
    for line in out.splitlines():
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        vid, title = parts[0].strip(), parts[1].strip()
        try:
            duration = float(parts[2]) if len(parts) > 2 and parts[2] not in ("", "NA") else 0.0
        except ValueError:
            duration = 0.0
        if vid:
            entries.append(
                {"id": vid, "title": title, "duration": duration, "order": len(entries)}
            )
    return entries


def discover_caption_urls(video_id: str) -> list[str]:
    """
    Ask YouTube's player endpoint (via the reader proxy) for caption tracks.

    yt-dlp cannot resolve metadata from a datacenter IP — it gets "Sign in to
    confirm you're not a bot". The player response itself is still served, so
    the track list is read from there instead.
    """
    import re as _re
    import urllib.request

    target = (
        "https://www.youtube.com/watch?v="
        + video_id
        + "&hl=en"
    )
    req = urllib.request.Request(
        PROXY_PREFIX + target,
        headers={"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        body = resp.read().decode("utf-8", "replace")

    # Caption track URLs appear in the player response, already signed.
    urls = _re.findall(
        r'"(https://www\.youtube\.com/api/timedtext\?[^"\\]+)"', body
    )
    # Prefer English tracks.
    english = [u for u in urls if ("lang=en" in u or "vss_id" in u and "en" in u)]
    ordered = english + [u for u in urls if u not in english]
    seen, out = set(), []
    for u in ordered:
        if "fmt=json3" in u or "lang=en" in u:
            if u not in seen:
                seen.add(u)
                out.append(u.replace("\\u0026", "&"))
    return out


def caption_url(video_id: str) -> str | None:
    """Signed caption URL from metadata; prefers manual English over auto."""
    raw = run(
        ["yt-dlp", *js_runtime_args(), *COOKIE_ARGS, "-J", "--skip-download", video_id],
        timeout=180,
    )
    info = json.loads(raw)
    for track_group in (info.get("subtitles") or {}, info.get("automatic_captions") or {}):
        for lang, tracks in track_group.items():
            if not lang.startswith("en"):
                continue
            for track in tracks:
                if track.get("ext") == "json3":
                    return track["url"]
    return None


def fetch_via_proxy(url: str) -> str:
    """Read the caption JSON through a reader proxy (different egress IP)."""
    import urllib.request

    req = urllib.request.Request(
        PROXY_PREFIX + url,
        headers={"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        body = resp.read().decode("utf-8", "replace")

    start = body.find("{")
    if start < 0:
        raise RuntimeError("proxy returned no JSON")
    payload = json.loads(body[start:])
    events = payload.get("events") or []
    text = "".join(
        "".join(seg.get("utf8", "") for seg in event.get("segs", []))
        for event in events
        if "segs" in event
    )

    # Clean: drop sound markers, collapse whitespace.
    text = re.sub(r"\[(music|applause|laughter|silence|singing|Music|Applause)\]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def paragraphs(text: str, target: int = 420) -> list[str]:
    """Split into readable paragraphs without inventing content."""
    sentences = re.split(r"(?<=[.!?])\s+", text)
    if len(sentences) == 1:
        # Unpunctuated auto-captions have no ". " to split on. Chunk by words to the same
        # target length so a 28k-word sermon is still readable on screen; nothing is added.
        if not text:
            return []
        out, buf = [], ""
        for word in text.split():
            if len(buf) + len(word) + 1 <= target:
                buf = f"{buf} {word}".strip()
            else:
                out.append(buf)
                buf = word
        if buf:
            out.append(buf)
        return out
    out, buf = [], ""
    for sentence in sentences:
        if len(buf) + len(sentence) + 1 <= target:
            buf = f"{buf} {sentence}".strip()
        else:
            if buf:
                out.append(buf)
            buf = sentence
    if buf:
        out.append(buf)
    return out


CORPUS_IDS: set[str] = set()


def load_existing_ids() -> set[str]:
    ids = set()
    for base in (OUT_DIR, os.path.join(OUT_DIR, "munroe"), os.path.join(OUT_DIR, "christian-house")):
        if not os.path.isdir(base):
            continue
        for name in os.listdir(base):
            if name.endswith(".json"):
                ids.add(name[: -len(".json")])
    return ids


def harvest_one(entry: dict, spec: dict, seen: set[str], force: bool) -> tuple[str, str]:
    vid = entry["id"]
    path = os.path.join(OUT_DIR, spec["subdir"], f"{vid}.json")
    if not force and os.path.isfile(path):
        return vid, "skip"
    if vid in seen:
        return vid, "duplicate"

    # Preferred: scrape the signed track URLs from the player response.
    text, detail = "", ""
    try:
        candidates = discover_caption_urls(vid)
    except Exception as exc:  # noqa: BLE001
        candidates = []
        detail = f"player-fail:{type(exc).__name__}"

    for url in candidates[:3]:
        try:
            candidate = fetch_via_proxy(url)
            if len(candidate) >= 300:
                text = candidate
                break
            detail = f"short:{len(candidate)}"
        except Exception as exc:  # noqa: BLE001
            detail = f"proxy-fail:{type(exc).__name__}"

    # Fallback: yt-dlp metadata (works on residential IPs).
    if not text:
        try:
            url = caption_url(vid)
            if url:
                text = fetch_via_proxy(url)
        except Exception as exc:  # noqa: BLE001
            if not detail:
                detail = f"meta-fail:{type(exc).__name__}"

    if not text:
        return vid, detail or "no-english-track"

    if len(text) < 300:
        return vid, "empty"

    record = {
        "id": vid,
        "title": entry["title"],
        "collection": spec["kind"],
        "collectionSlug": spec["slug"],
        "channel": spec["channel"],
        "author": spec["author"],
        "playlistId": spec["playlistId"],
        "duration": str(int(entry.get("duration") or 0)),
        "order": entry["order"],
        "language": "en",
        "wordCount": len(text.split()),
        "charCount": len(text),
        "paragraphs": paragraphs(text),
        "text": text,
        "source": "youtube-r.jina.ai",
    }
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(record, f, ensure_ascii=False, indent=0)
    return vid, f"ok:{len(text)}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--collection", default="christian-house-selman", choices=list(PLAYLISTS))
    ap.add_argument("--limit", type=int, default=0, help="0 = all")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--build-ts", action="store_true")
    ap.add_argument("--cookies", default="", help="Netscape cookies.txt — clears the bot wall")
    args = ap.parse_args()

    if args.build_ts:
        os.execv(sys.executable, [sys.executable, os.path.join(ROOT_DIR, "scripts", "harvest_drive.py"), "--build-ts"])

    if args.cookies:
        global COOKIE_ARGS
        COOKIE_ARGS = ["--cookies", args.cookies]
        print(f"  cookies: {args.cookies}")

    spec = dict(PLAYLISTS[args.collection], slug=args.collection)
    print(f"== {args.collection} ({spec['playlistId']}) ==")

    entries = enumerate_playlist(spec["playlistId"])
    print(f"  enumerated {len(entries)} videos")
    if not entries:
        print("::error::playlist enumeration returned nothing", file=sys.stderr)
        return 1

    os.makedirs(CATALOG_DIR, exist_ok=True)
    with open(os.path.join(CATALOG_DIR, f"youtube_manifest_{args.collection}.json"), "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, indent=1)

    if args.limit:
        entries = entries[: args.limit]

    seen = load_existing_ids()
    results: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = [pool.submit(harvest_one, e, spec, seen, args.force) for e in entries]
        for i, fut in enumerate(futures, 1):
            vid, outcome = fut.result()
            key = outcome.split(":")[0]
            results[key] = results.get(key, 0) + 1
            if key != "ok":
                print(f"  [{i}/{len(entries)}] {vid}: {outcome}")
            elif i % 5 == 0:
                print(f"  [{i}/{len(entries)}] saved")

    print(f"  summary: {results}")
    ok = results.get("ok", 0)
    if ok == 0:
        print("::error::no transcripts harvested — the proxy is likely blocked", file=sys.stderr)
        return 3
    print("\nNow run: python3 scripts/harvest_drive.py --build-ts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
