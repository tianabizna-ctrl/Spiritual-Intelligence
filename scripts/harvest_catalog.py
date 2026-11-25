#!/usr/bin/env python3
"""
Step 1 of the full-library harvest: enumerate every video in the three
Spiritual Intelligence source playlists (194 + 141 + 42 = 377 videos).

Writes one resumable JSON file per playlist into data/catalog/:

    data/catalog/playlist_<PLAYLIST_ID>.json
    {
      "playlistId": "...", "title": "...", "channel": "...",
      "videoCount": 194,
      "videos": [{"index": 1, "id": "4YElIs15_Ak", "title": "...", "duration": "1:24:44"}, ...]
    }

Requires network access (YouTube). Run from the repository root:

    python3 scripts/harvest_catalog.py              # all three playlists
    python3 scripts/harvest_catalog.py --playlist PLaptSPguGlRafSbwyTRdhKBc9axh9znP7
    python3 scripts/harvest_catalog.py --force      # re-download finished files

Re-running is safe: a playlist whose JSON already holds as many videos as
YouTube reports is skipped unless --force is passed.
"""
import argparse
import json
import os
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_DIR = os.path.join(ROOT_DIR, "data", "catalog")

PLAYLISTS = [
    {
        "playlistId": "PLaptSPguGlRafSbwyTRdhKBc9axh9znP7",
        "expected": 194,
        "channel": "Prayer By Grace",
        "label": "POWERFUL JOSHUA SELMAN PRAYERS FOR YOU TODAY",
    },
    {
        "playlistId": "PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz",
        "expected": 141,
        "channel": "Grace Enclave",
        "label": "morning prayers",
    },
    {
        "playlistId": "PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs",
        "expected": 42,
        "channel": "OVERCOMING DAILY",
        "label": "Overcoming Daily prayer watch",
    },
]


def load_existing(path: str) -> dict:
    if os.path.isfile(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, OSError):
            pass
    return {}


def harvest(playlist: dict, force: bool) -> dict:
    import yt_dlp  # imported lazily so --help works without the dependency

    os.makedirs(CATALOG_DIR, exist_ok=True)
    path = os.path.join(CATALOG_DIR, f"playlist_{playlist['playlistId']}.json")
    existing = load_existing(path)
    expected = playlist.get("expected") or 0

    if (
        not force
        and existing.get("videos")
        and expected
        and len(existing["videos"]) >= expected
    ):
        print(f"  skip {playlist['playlistId']} (already {len(existing['videos'])}/{expected})")
        return existing

    url = f"https://www.youtube.com/playlist?list={playlist['playlistId']}"
    opts = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": "in_playlist",
        "skip_download": True,
        "socket_timeout": 30,
        "retries": 5,
    }

    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=False)

    videos = []
    for idx, entry in enumerate(info.get("entries") or [], start=1):
        if not entry:
            continue
        duration = entry.get("duration")
        videos.append(
            {
                "index": idx,
                "id": entry.get("id"),
                "title": (entry.get("title") or "").strip(),
                "durationSeconds": duration,
                "duration": _fmt_duration(duration),
                "channel": entry.get("channel") or entry.get("uploader") or playlist["channel"],
                "url": f"https://www.youtube.com/watch?v={entry.get('id')}",
            }
        )

    payload = {
        "playlistId": playlist["playlistId"],
        "title": info.get("title") or playlist["label"],
        "channel": info.get("channel") or info.get("uploader") or playlist["channel"],
        "expectedVideoCount": expected,
        "videoCount": len(videos),
        "videos": videos,
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"  saved {len(videos)}/{expected or '?'} videos -> {os.path.relpath(path, ROOT_DIR)}")
    return payload


def _fmt_duration(seconds) -> str:
    if not seconds:
        return ""
    seconds = int(seconds)
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--playlist", action="append", help="only harvest this playlist id (repeatable)")
    ap.add_argument("--force", action="store_true", help="re-download even if a complete file exists")
    args = ap.parse_args()

    targets = [p for p in PLAYLISTS if not args.playlist or p["playlistId"] in args.playlist]
    if not targets:
        print("No matching playlist id.", file=sys.stderr)
        return 2

    failures = 0
    total = 0
    print("Harvesting playlist catalogs:")
    for playlist in targets:
        try:
            payload = harvest(playlist, args.force)
            total += len(payload.get("videos") or [])
        except Exception as exc:  # network / yt-dlp errors are expected offline
            failures += 1
            print(f"  FAILED {playlist['playlistId']}: {type(exc).__name__}: {str(exc)[:200]}")

    print(f"\nTotal catalogued videos: {total}")
    if failures:
        print(
            f"{failures} playlist(s) could not be reached. This script needs live internet "
            "access to youtube.com (a normal machine has it; a locked-down CI sandbox may not).",
            file=sys.stderr,
        )
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
