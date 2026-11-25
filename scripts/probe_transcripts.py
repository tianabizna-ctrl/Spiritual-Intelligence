#!/usr/bin/env python3
"""Which transcript path actually works from a GitHub Actions runner?

Tests every combination of (video, extraction strategy) and writes
data/catalog/probe_transcripts.json. Strategies, cheapest first:

  transcript_api        youtube-transcript-api, default client
  ytdlp:<player_client> yt-dlp auto-captions via a specific YouTube client
                        (datacenter IPs are usually blocked on 'web' but
                        often allowed on 'android'/'ios'/'tv'/'mweb')

Videos are chosen from the two playlists that enumerate correctly, plus the
45wUm7wffBQ video whose playlist (PL-7eNL...) appears deleted.
"""
import glob
import json
import os
import tempfile
import traceback

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "data", "catalog", "probe_transcripts.json")

VIDEOS = ["4YElIs15_Ak", "HQzfk0DMgCo", "ZSKymClHnzE", "CK9rP2ZBGKg", "45wUm7wffBQ", "5SHUzMacfkY"]
CLIENTS = ["default", "android", "ios", "tv", "mweb", "web_safari"]


def try_transcript_api(video):
    from youtube_transcript_api import YouTubeTranscriptApi

    api = YouTubeTranscriptApi()
    listing = api.list(video)
    tr = next(iter(listing))
    text = " ".join(s.text for s in tr.fetch())
    return {"ok": True, "lang": tr.language_code, "words": len(text.split()), "head": text[:100]}


def try_ytdlp(video, client):
    import yt_dlp

    with tempfile.TemporaryDirectory() as tmp:
        opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "writeautomaticsub": True,
            "writesubtitles": True,
            "subtitleslangs": ["en", "en-orig", "en-US"],
            "subtitlesformat": "json3/vtt",
            "outtmpl": os.path.join(tmp, "%(id)s.%(ext)s"),
            "socket_timeout": 30,
            "retries": 3,
        }
        if client != "default":
            opts["extractor_args"] = {"youtube": {"player_client": [client]}}
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([f"https://www.youtube.com/watch?v={video}"])
        files = glob.glob(os.path.join(tmp, "*.json3")) + glob.glob(os.path.join(tmp, "*.vtt"))
        if not files:
            return {"ok": False, "error": "no subtitle file written"}
        with open(sorted(files)[0], "r", encoding="utf-8") as f:
            raw = f.read()
        if sorted(files)[0].endswith(".json3"):
            data = json.loads(raw)
            text = " ".join(
                "".join(seg.get("utf8", "") for seg in ev.get("segs") or [])
                for ev in data.get("events") or []
            )
        else:
            text = " ".join(
                ln.strip() for ln in raw.splitlines()
                if ln.strip() and "-->" not in ln and not ln.startswith("WEBVTT")
            )
        text = " ".join(text.split())
        return {"ok": True, "words": len(text.split()), "file": os.path.basename(sorted(files)[0]),
                "head": text[:100]}


def main() -> int:
    report = {"videos": {}, "summary": {"working_paths": [], "blocked_videos": []}}

    for video in VIDEOS:
        entry = {}
        try:
            entry["transcript_api"] = try_transcript_api(video)
        except Exception as exc:
            entry["transcript_api"] = {"ok": False, "error": f"{type(exc).__name__}: {str(exc)[:150]}"}

        for client in CLIENTS:
            try:
                result = try_ytdlp(video, client)
            except Exception as exc:
                result = {"ok": False, "error": f"{type(exc).__name__}: {str(exc)[:150]}"}
            entry[f"ytdlp_{client}"] = result
            if result.get("ok"):
                report["summary"]["working_paths"].append(f"{video}:ytdlp_{client}")
                break  # one working strategy per video is enough

        if not any(v.get("ok") for v in entry.values()):
            report["summary"]["blocked_videos"].append(video)
        report["videos"][video] = entry
        print(f"{video}: {[k for k, v in entry.items() if v.get('ok')] or 'ALL FAILED'}")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SystemExit:
        raise
    except Exception:
        traceback.print_exc()
        raise SystemExit(1)
