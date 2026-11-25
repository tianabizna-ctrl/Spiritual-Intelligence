#!/usr/bin/env python3
"""
Step 2 of the full-library harvest: download the English transcript for every
video in data/catalog/*.json.

Output (one small file per video, so a 377-video run is fully resumable):

    data/transcripts/<VIDEO_ID>.json
    {
      "id": "5SHUzMacfkY",
      "title": "...",
      "playlistId": "PLapt...",
      "channel": "Prayer By Grace",
      "duration": "40:08",
      "language": "en",
      "wordCount": 5123,
      "fetchedAt": "2026-11-24T09:00:00Z",
      "segments": [{"start": 0.0, "duration": 3.2, "text": "Something shifted"}, ...],
      "text": "Something shifted the moment this gathering ..."
    }

Usage:
    python3 scripts/harvest_transcripts.py                    # everything missing
    python3 scripts/harvest_transcripts.py --limit 20         # first 20 missing
    python3 scripts/harvest_transcripts.py --playlist PLaptSPguGlRafSbwyTRdhKBc9axh9znP7
    python3 scripts/harvest_transcripts.py --only 5SHUzMacfkY 5SHUzMacfkY
    python3 scripts/harvest_transcripts.py --build-ts         # regenerate src/data

Two independent backends are tried in order, so a run keeps going when one
path is rate-limited:
  1. youtube-transcript-api (fast, unofficial, may be blocked from datacenters)
  2. yt-dlp auto-generated subtitles (slower fallback)
Re-running skips any video whose JSON already exists and is non-empty.
"""
import argparse
import datetime as dt
import glob
import json
import os
import re
import sys
import time

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_DIR = os.path.join(ROOT_DIR, "data", "catalog")
OUT_DIR = os.path.join(ROOT_DIR, "data", "transcripts")

LANG_PREFERENCE = ["en", "en-US", "en-GB", "a.en"]


def load_catalog(only_playlists=None):
    videos, seen = [], set()
    for path in sorted(glob.glob(os.path.join(CATALOG_DIR, "playlist_*.json"))):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if only_playlists and data.get("playlistId") not in only_playlists:
            continue
        for v in data.get("videos") or []:
            vid = v.get("id")
            if not vid or vid in seen:
                continue
            seen.add(vid)
            videos.append({**v, "playlistId": data.get("playlistId"), "playlistTitle": data.get("title")})
    return videos


def out_path(video_id: str) -> str:
    return os.path.join(OUT_DIR, f"{video_id}.json")


def already_done(video_id: str) -> bool:
    path = out_path(video_id)
    if not os.path.isfile(path):
        return False
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return bool((data.get("text") or "").strip())
    except (json.JSONDecodeError, OSError):
        return False


NET = {"cookies": None, "proxy": None}


def fetch_with_youtube_transcript_api(video_id: str):
    from youtube_transcript_api import YouTubeTranscriptApi

    api_kwargs = {}
    if NET["proxy"]:
        from youtube_transcript_api.proxies import GenericProxyConfig

        api_kwargs["proxy_config"] = GenericProxyConfig(
            http_url=NET["proxy"], https_url=NET["proxy"]
        )
    api = YouTubeTranscriptApi(**api_kwargs)
    listing = api.list(video_id)
    for lang in LANG_PREFERENCE:
        for tr in listing:
            if tr.language_code == lang or tr.language_code.startswith("en"):
                fetched = tr.fetch()
                segments = [
                    {"start": float(s.start), "duration": float(s.duration), "text": s.text}
                    for s in fetched
                ]
                return segments, tr.language_code
    return None, None


def fetch_with_ytdlp(video_id: str):
    import yt_dlp

    with __import__("tempfile").TemporaryDirectory() as tmp:
        opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "writesubtitles": True,
            "writeautomaticsub": True,
            "subtitleslangs": ["en", "en-orig", "en-US"],
            "subtitlesformat": "json3/vtt",
            "outtmpl": os.path.join(tmp, "%(id)s.%(ext)s"),
            "socket_timeout": 30,
        }
        if NET["cookies"]:
            opts["cookiefile"] = NET["cookies"]
        if NET["proxy"]:
            opts["proxy"] = NET["proxy"]
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([f"https://www.youtube.com/watch?v={video_id}"])

        candidates = glob.glob(os.path.join(tmp, "*.json3")) + glob.glob(os.path.join(tmp, "*.vtt"))
        if not candidates:
            return None, None
        path = sorted(candidates)[0]
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()

    if path.endswith(".json3"):
        data = json.loads(raw)
        segments, cursor = [], 0.0
        for event in data.get("events") or []:
            text = "".join(seg.get("utf8", "") for seg in event.get("segs") or [])
            text = text.replace("\n", " ").strip()
            if not text:
                continue
            start = event.get("tStartMs", cursor * 1000) / 1000.0
            dur = event.get("dDurationMs", 0) / 1000.0
            segments.append({"start": start, "duration": dur, "text": text})
            cursor = start + dur
        return segments, "en"

    segments = []
    for block in re.split(r"\n\n+", raw):
        lines = [ln.strip() for ln in block.strip().splitlines() if ln.strip()]
        if not lines or lines[0].upper().startswith("WEBVTT"):
            continue
        if "-->" in lines[0]:
            timing, text_lines = lines[0], lines[1:]
        elif len(lines) > 1 and "-->" in lines[1]:
            timing, text_lines = lines[1], lines[2:]
        else:
            continue
        start_s, _, end_s = timing.partition(" --> ")
        try:
            start = _ts_to_seconds(start_s)
            end = _ts_to_seconds(end_s.split()[0])
        except ValueError:
            continue
        text = " ".join(text_lines)
        text = re.sub(r"<[^>]+>", "", text).strip()
        if text:
            segments.append({"start": start, "duration": max(0.0, end - start), "text": text})
    return segments, "en"


def _ts_to_seconds(stamp: str) -> float:
    stamp = stamp.replace(",", ".")
    parts = [float(p) for p in stamp.split(":")]
    while len(parts) < 3:
        parts.insert(0, 0.0)
    return parts[0] * 3600 + parts[1] * 60 + parts[2]


def harvest_one(video: dict, sleep_seconds: float) -> str:
    """Returns 'ok', 'skip', or 'fail'."""
    vid = video["id"]
    if already_done(vid):
        return "skip"

    segments, lang = None, None
    last_error = None
    for fetcher in (fetch_with_youtube_transcript_api, fetch_with_ytdlp):
        try:
            segments, lang = fetcher(vid)
            if segments:
                break
        except Exception as exc:
            last_error = exc
        time.sleep(sleep_seconds)

    if not segments:
        print(f"  x {vid}: {type(last_error).__name__ if last_error else 'no captions'}: "
              f"{str(last_error)[:120] if last_error else ''}")
        return "fail"

    text = " ".join(s["text"].strip() for s in segments if s.get("text")).strip()
    text = re.sub(r"\s+", " ", text)
    words = len(text.split())

    payload = {
        "id": vid,
        "title": video.get("title", ""),
        "playlistId": video.get("playlistId"),
        "playlistTitle": video.get("playlistTitle"),
        "channel": video.get("channel"),
        "duration": video.get("duration", ""),
        "index": video.get("index"),
        "language": lang or "en",
        "wordCount": words,
        "fetchedAt": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "segments": segments,
        "text": text,
    }
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(out_path(vid), "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)
    print(f"  + {vid} ({words} words) {video.get('title', '')[:70]}")
    return "ok"


def build_ts():
    """Regenerate the app's transcript index from data/transcripts/.

    Two outputs, deliberately split so the JavaScript bundle stays small:

      public/transcripts/<id>.json  full transcript, fetched on demand
      src/data/libraryTranscripts.ts  metadata index + short excerpt only
    """
    public_dir = os.path.join(ROOT_DIR, "public", "transcripts")
    os.makedirs(public_dir, exist_ok=True)
    entries = []
    for path in sorted(glob.glob(os.path.join(OUT_DIR, "*.json"))):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        text = data.get("text") or ""
        if not text.strip():
            continue
        with open(os.path.join(public_dir, f"{data['id']}.json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
        entries.append(
            {
                "id": data["id"],
                "title": data.get("title", ""),
                "playlistId": data.get("playlistId"),
                "channel": data.get("channel", ""),
                "duration": data.get("duration", ""),
                "wordCount": data.get("wordCount", len(text.split())),
                "excerpt": " ".join(text.split()[:40]),
            }
        )

    target = os.path.join(ROOT_DIR, "src", "data", "libraryTranscripts.ts")
    with open(target, "w", encoding="utf-8") as f:
        f.write("// Auto-generated by scripts/harvest_transcripts.py --build-ts. Do not edit by hand.\n")
        f.write("export interface LibraryTranscript {\n")
        f.write("  id: string;\n  title: string;\n  playlistId: string | null;\n")
        f.write("  channel: string;\n  duration: string;\n  wordCount: number;\n")
        f.write("  /** First ~40 words, for list previews and lightweight search. */\n")
        f.write("  excerpt: string;\n}\n\n")
        f.write("export const LIBRARY_TRANSCRIPTS: Record<string, LibraryTranscript> = {\n")
        for e in entries:
            f.write(f"  {json.dumps(e['id'])}: {{\n")
            f.write(f"    id: {json.dumps(e['id'])},\n")
            f.write(f"    title: {json.dumps(e['title'], ensure_ascii=False)},\n")
            f.write(f"    playlistId: {json.dumps(e['playlistId'])},\n")
            f.write(f"    channel: {json.dumps(e['channel'], ensure_ascii=False)},\n")
            f.write(f"    duration: {json.dumps(e['duration'])},\n")
            f.write(f"    wordCount: {e['wordCount']},\n")
            f.write(f"    excerpt: {json.dumps(e['excerpt'], ensure_ascii=False)},\n")
            f.write("  },\n")
        f.write("};\n\n")
        f.write("export const LIBRARY_TRANSCRIPT_COUNT = Object.keys(LIBRARY_TRANSCRIPTS).length;\n")
    print(f"Wrote {len(entries)} transcripts -> {os.path.relpath(target, ROOT_DIR)}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--playlist", action="append")
    ap.add_argument("--only", nargs="+", help="specific video ids")
    ap.add_argument("--limit", type=int, default=0, help="stop after N newly fetched videos")
    ap.add_argument("--sleep", type=float, default=1.0, help="delay between requests (default 1s)")
    ap.add_argument("--build-ts", action="store_true", help="only regenerate the app transcript index")
    ap.add_argument("--cookies", help="Netscape cookies.txt exported from a logged-in browser")
    ap.add_argument("--proxy", help="proxy URL, e.g. socks5://user:pass@host:port")
    args = ap.parse_args()

    NET["cookies"] = args.cookies
    NET["proxy"] = args.proxy

    if args.build_ts:
        build_ts()
        return 0

    videos = load_catalog(args.playlist)
    if args.only:
        wanted = set(args.only)
        videos = [v for v in videos if v["id"] in wanted]
    if not videos:
        print("No videos found. Run scripts/harvest_catalog.py first.", file=sys.stderr)
        return 2

    pending = [v for v in videos if not already_done(v["id"])]
    print(f"{len(videos)} videos in scope, {len(pending)} still missing transcripts, "
          f"{len(videos) - len(pending)} already done.")
    if args.limit:
        pending = pending[: args.limit]

    ok = skip = fail = 0
    for video in pending:
        status = harvest_one(video, args.sleep)
        ok += status == "ok"
        skip += status == "skip"
        fail += status == "fail"
        time.sleep(args.sleep)

    print(f"\nfetched={ok} skipped={skip} failed={fail}")
    if ok:
        print("Regenerate the TypeScript module with:  python3 scripts/harvest_transcripts.py --build-ts")
    if fail:
        print(
            "Some transcripts failed. YouTube blocks transcript endpoints from many datacenter IPs; "
            "re-run later or with --sleep 3 to reduce throttling.",
            file=sys.stderr,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
