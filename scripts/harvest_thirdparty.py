#!/usr/bin/env python3
"""Harvest transcripts from a third-party transcript service.

Why this exists
---------------
scripts/yt/ytfetch.py asks YouTube directly for the caption track. YouTube
bot-walls datacenter IPs, which is why the harvest CI job returns `blocked` for
every video. A public transcript service resolves the video server-side and
serves the text over plain HTTP, so a runner can read it without touching
YouTube at all.

Output is the same shape scripts/yt/harvest.py writes, so
scripts/import_transcripts.py consumes it unchanged:

    {"id","status":"ok","title","duration","order","text","source","fetchedAt"}

    python3 scripts/harvest_thirdparty.py manifest.json -o transcripts
    python3 scripts/harvest_thirdparty.py manifest.json -o transcripts --limit 1 --dump-html /tmp/html

Statuses: ok / no-transcript (service has nothing) / blocked (HTTP refused,
typically Cloudflare) / too-short (under MIN_CHARS after cleaning).
"""
from __future__ import annotations

import argparse
import datetime as dt
import html as html_lib
import json
import os
import re
import threading
import time
import urllib.error
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed

ENDPOINT = "https://youtubetotranscript.com/transcript?v={vid}"
MIN_CHARS = 300

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}

# Page chrome that sits inside the transcript block but is not speech. Inline
# buttons collapse to a single line with the first caption, so these have to be
# stripped as leading tokens rather than as whole lines. Longest first.
CHROME = (
    "copy timestamp off",
    "copy timestamp on",
    "get free transcript",
    "generating content",
    "show transcript",
    "back to top",
    "pin video",
    "timestamp off",
    "timestamp on",
    "transcript",
    "translate",
    "copy",
    "ai",
)

lock = threading.Lock()


def _strip_tags(block: str) -> str:
    block = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", block, flags=re.S | re.I)
    block = re.sub(r"<br\s*/?>", "\n", block, flags=re.I)
    block = re.sub(r"</(p|div|li|h[1-6])>", "\n", block, flags=re.I)
    block = re.sub(r"<[^>]+>", " ", block)
    return html_lib.unescape(block)


def extract_transcript(html: str) -> str | None:
    """Pull the spoken text out of a transcript page, or None if absent."""
    # The transcript sits between the "Transcript" heading and the footer link.
    m = re.search(
        r"<h2\b[^>]*>\s*Transcript\s*</h2>(.*?)(?:Back To Top|Back to top)",
        html, re.S | re.I,
    )
    if not m:
        return None

    text = _strip_tags(m.group(1))

    out: list[str] = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        # Trailing page furniture glued onto the last caption line.
        line = re.sub(r"\s*(Back To Top|AI Features|Summarize)\s*$", "", line, flags=re.I).strip()

        # Strip leading chrome repeatedly: "Copy Timestamp OFF Translate Prayer…"
        # is one line, so a single pass per token is not enough.
        lowered = line.lower()
        changed = True
        while changed:
            changed = False
            for token in CHROME:
                if lowered == token:
                    line = ""
                    break
                if lowered.startswith(token + " "):
                    line = line[len(token):].lstrip()
                    lowered = line.lower()
                    changed = True
                    break
        if not line:
            continue
        # Caption markers arrive as "&gt;&gt;" once unescaped; drop them.
        line = re.sub(r"^[>\s\\]+", "", line).strip()
        if not line:
            continue
        out.append(line)

    if not out:
        return None
    # Caption lines are hard-wrapped at the caption boundary, so join with
    # spaces and let import_transcripts.paragraphise() re-break at sentences.
    return re.sub(r"\s+", " ", " ".join(out)).strip()


def fetch_one(vid: str, timeout: int = 45, dump_dir: str | None = None) -> tuple[str, str, str]:
    """Return (videoId, status, text)."""
    url = ENDPOINT.format(vid=vid)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as exc:
        if dump_dir:
            _dump(dump_dir, vid, f"http{exc.code}")
        return vid, "blocked", ""
    except Exception:
        return vid, "blocked", ""

    if dump_dir:
        _dump(dump_dir, vid, "ok", body)

    text = extract_transcript(body)
    if text is None:
        return vid, "no-transcript", ""
    if len(text) < MIN_CHARS:
        return vid, "too-short", ""
    return vid, "ok", text


def _dump(dump_dir: str, vid: str, suffix: str, body: str = "") -> None:
    os.makedirs(dump_dir, exist_ok=True)
    with open(os.path.join(dump_dir, f"{vid}.{suffix}.html"), "w", encoding="utf-8") as f:
        f.write(body)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("manifest", help="playlist manifest from scripts/yt/playlist.py")
    ap.add_argument("-o", "--out", default="transcripts")
    ap.add_argument("--limit", type=int, default=0, help="max videos (0 = all)")
    ap.add_argument("--workers", type=int, default=2, help="parallel requests (be polite: 2)")
    ap.add_argument("--delay", type=float, default=1.5, help="seconds between requests per worker")
    ap.add_argument("--dump-html", help="save raw pages here (debugging a parse failure)")
    args = ap.parse_args()

    with open(args.manifest, "r", encoding="utf-8") as f:
        items = json.load(f)
    if isinstance(items, dict):
        items = items.get("videos") or items.get("items") or []
    if args.limit:
        items = items[: args.limit]

    os.makedirs(args.out, exist_ok=True)
    todo = [it for it in items if not os.path.exists(os.path.join(args.out, f"{it['id']}.json"))]
    print(f"{len(items)} in manifest, {len(todo)} to fetch")

    counts: Counter = Counter()

    def run(item: dict) -> None:
        vid = item["id"]
        time.sleep(args.delay)
        status, text = fetch_one(vid, dump_dir=args.dump_html)
        with lock:
            counts[status] += 1
            if status != "ok":
                print(f"  {status:<14} {vid}")
                return
            record = {
                "id": vid,
                "status": "ok",
                "title": item.get("title") or "",
                "duration": item.get("duration"),
                "order": item.get("order", 0),
                "text": text,
                "source": "youtubetotranscript.com",
                "fetchedAt": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            }
            with open(os.path.join(args.out, f"{vid}.json"), "w", encoding="utf-8") as f:
                json.dump(record, f, ensure_ascii=False)
            print(f"  ok             {vid}  {len(text):>7,} chars")

    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futures = [pool.submit(run, it) for it in todo]
        for fut in as_completed(futures):
            fut.result()

    print(f"\nsummary: {dict(counts)}")
    return 0 if counts.get("ok") else 1


if __name__ == "__main__":
    raise SystemExit(main())
