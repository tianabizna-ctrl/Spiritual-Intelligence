#!/usr/bin/env python3
"""CI connectivity probe: can this runner reach YouTube and pull a transcript?

Writes data/catalog/probe_report.json so the result is readable from the repo
even when workflow logs are not accessible.
"""
import json
import os
import traceback
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "data", "catalog", "probe_report.json")

PLAYLIST = "PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs"  # 42-video OVERCOMING DAILY playlist
VIDEO = "5SHUzMacfkY"


def http_status(url: str):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=25) as resp:
            return resp.status
    except Exception as exc:
        return f"{type(exc).__name__}: {str(exc)[:120]}"


def main() -> int:
    report = {
        "youtube_home_http": http_status("https://www.youtube.com/"),
        "youtube_rss_http": http_status(
            "https://www.youtube.com/feeds/videos.xml?channel_id=UCmpTViEwhN4kdklHpFY9KTQ"
        ),
    }

    try:
        import yt_dlp

        report["yt_dlp_version"] = yt_dlp.version.__version__
        opts = {"quiet": True, "extract_flat": "in_playlist", "skip_download": True}
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(
                f"https://www.youtube.com/playlist?list={PLAYLIST}", download=False
            )
        entries = [e for e in (info.get("entries") or []) if e]
        report["playlist_entries"] = len(entries)
        report["playlist_expected"] = 42
        report["playlist_first_ids"] = [e.get("id") for e in entries[:5]]
    except Exception:
        report["yt_dlp_error"] = traceback.format_exc()[-800:]

    try:
        from youtube_transcript_api import YouTubeTranscriptApi

        listing = YouTubeTranscriptApi().list(VIDEO)
        transcript = next(iter(listing))
        fetched = transcript.fetch()
        text = " ".join(s.text for s in fetched)
        report["transcript_lang"] = transcript.language_code
        report["transcript_segments"] = len(fetched)
        report["transcript_words"] = len(text.split())
        report["transcript_head"] = text[:200]
    except Exception:
        report["transcript_error"] = traceback.format_exc()[-800:]

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
