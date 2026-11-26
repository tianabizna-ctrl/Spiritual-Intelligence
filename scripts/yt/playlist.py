"""
Enumerate a playlist (or channel) into a manifest, without touching captions.

    python playlist.py "https://www.youtube.com/playlist?list=PLxxxx" -o manifest.json
    python playlist.py "https://www.youtube.com/@channel/videos" --limit 50

Why flat-playlist: it uses a cheap listing endpoint that is far less likely to be
rate-limited than per-video extraction, so a 500-video job gets its inventory first and
can be resumed even if caption fetching fails halfway.

Records look like:
    {"id", "title", "duration", "url", "order"}
Deduplicate across playlists by `id` yourself — a video commonly sits in 2-3 playlists.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys

SEP = "\x1f"  # unit separator: never appears in a YouTube title


def enumerate_playlist(url: str, limit: int | None = None) -> list[dict]:
    cmd = ["yt-dlp", "--flat-playlist", "--ignore-errors", "--print",
           f"%(id)s{SEP}%(title)s{SEP}%(duration)s", url]
    if limit:
        cmd += ["--playlist-end", str(limit)]
    out = subprocess.run(cmd, capture_output=True, text=True, timeout=1800)
    rows = []
    for line in out.stdout.splitlines():
        parts = line.split(SEP)
        if len(parts) < 2 or len(parts[0]) != 11:
            continue
        dur = 0.0
        try:
            dur = float(parts[2]) if len(parts) > 2 and parts[2] not in ("", "NA", "None") else 0.0
        except ValueError:
            pass
        rows.append({
            "id": parts[0],
            "title": parts[1],
            "duration": dur,
            "url": f"https://www.youtube.com/watch?v={parts[0]}",
            "order": len(rows),
        })
    if not rows:
        sys.stderr.write((out.stderr or "no rows")[:400] + "\n")
    return rows


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("-o", "--out", default="manifest.json")
    ap.add_argument("--limit", type=int)
    a = ap.parse_args()
    rows = enumerate_playlist(a.url, a.limit)
    json.dump(rows, open(a.out, "w"), indent=1)
    print(f"{len(rows)} videos -> {a.out}")
    for r in rows[:3]:
        print(" ", r["id"], r["title"][:60])
