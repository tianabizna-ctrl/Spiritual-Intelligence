#!/usr/bin/env python3
"""CI connectivity probe: how much of the YouTube harvest works from a runner?

Writes data/catalog/probe_report.json so the result is readable from the repo.
Tests, in order of importance:
  1. plain HTTP reachability of youtube.com
  2. yt-dlp playlist enumeration for all three source playlists
  3. yt-dlp auto-subtitle download for one video
  4. youtube-transcript-api fetch for one video
  5. the same two transcript paths through an optional proxy (env PROXY_URL)
"""
import json
import os
import traceback
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "data", "catalog", "probe_report.json")

PLAYLISTS = {
    "prayer_by_grace_194": "PLaptSPguGlRafSbwyTRdhKBc9axh9znP7",
    "grace_enclave_141": "PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz",
    "overcoming_daily_42": "PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs",
}
VIDEO = "5SHUzMacfkY"
PROXY = os.environ.get("PROXY_URL") or None


def http_status(url: str):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=25) as resp:
            return resp.status
    except Exception as exc:
        return f"{type(exc).__name__}: {str(exc)[:120]}"


def probe_playlists(report):
    import yt_dlp

    report["yt_dlp_version"] = yt_dlp.version.__version__
    for label, pid in PLAYLISTS.items():
        opts = {
            "quiet": True,
            "no_warnings": True,
            "extract_flat": "in_playlist",
            "skip_download": True,
            "socket_timeout": 30,
        }
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(
                    f"https://www.youtube.com/playlist?list={pid}", download=False
                )
            entries = [e for e in (info.get("entries") or []) if e]
            report[label] = {
                "playlistId": pid,
                "entries": len(entries),
                "reportedVideoCount": info.get("playlist_count"),
                "first_ids": [e.get("id") for e in entries[:3]],
            }
        except Exception as exc:
            report[label] = {"playlistId": pid, "error": str(exc)[-240:]}


def probe_ytdlp_subtitles(report):
    import glob
    import tempfile

    import yt_dlp

    with tempfile.TemporaryDirectory() as tmp:
        opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "writeautomaticsub": True,
            "writesubtitles": True,
            "subtitleslangs": ["en", "en-orig"],
            "outtmpl": os.path.join(tmp, "%(id)s.%(ext)s"),
            "socket_timeout": 30,
        }
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                ydl.download([f"https://www.youtube.com/watch?v={VIDEO}"])
            files = glob.glob(os.path.join(tmp, "*"))
            report["ytdlp_subtitle_files"] = [os.path.basename(f) for f in files]
        except Exception as exc:
            report["ytdlp_subtitle_error"] = str(exc)[-240:]


def probe_transcript_api(report, key="transcript_api", proxy=None):
    from youtube_transcript_api import YouTubeTranscriptApi

    try:
        kwargs = {}
        if proxy:
            from youtube_transcript_api.proxies import GenericProxyConfig

            kwargs["proxy_config"] = GenericProxyConfig(http_url=proxy, https_url=proxy)
        api = YouTubeTranscriptApi(**kwargs)
        listing = api.list(VIDEO)
        tr = next(iter(listing))
        fetched = tr.fetch()
        text = " ".join(s.text for s in fetched)
        report[key] = {
            "lang": tr.language_code,
            "segments": len(fetched),
            "words": len(text.split()),
            "head": text[:160],
        }
    except Exception as exc:
        report[key] = {"error": f"{type(exc).__name__}: {str(exc)[:240]}"}


def probe_cookies(report):
    """yt-dlp can reuse YouTube cookies if YT_COOKIES is supplied as a secret."""
    cookie = os.environ.get("YT_COOKIES")
    report["cookies_present"] = bool(cookie)
    if not cookie:
        return
    import tempfile

    import yt_dlp

    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as fh:
        fh.write(cookie.replace("\\n", "\n"))
        cookie_path = fh.name
    try:
        opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "writeautomaticsub": True,
            "subtitleslangs": ["en"],
            "cookiefile": cookie_path,
            "outtmpl": os.path.join(tempfile.gettempdir(), "%(id)s.%(ext)s"),
        }
        import glob

        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([f"https://www.youtube.com/watch?v={VIDEO}"])
        report["cookie_subtitle_files"] = [
            os.path.basename(p) for p in glob.glob(os.path.join(tempfile.gettempdir(), f"{VIDEO}*"))
        ]
    except Exception as exc:
        report["cookie_subtitle_error"] = str(exc)[-240:]
    finally:
        os.unlink(cookie_path)


def main() -> int:
    report = {
        "youtube_home_http": http_status("https://www.youtube.com/"),
        "proxy_configured": bool(PROXY),
        "runner": os.environ.get("RUNNER_NAME", "local"),
    }
    try:
        probe_playlists(report)
    except Exception:
        report["playlist_probe_error"] = traceback.format_exc()[-400:]

    try:
        probe_ytdlp_subtitles(report)
    except Exception:
        report["ytdlp_subtitle_fatal"] = traceback.format_exc()[-400:]

    try:
        probe_transcript_api(report)
    except Exception:
        report["transcript_api_fatal"] = traceback.format_exc()[-400:]

    if PROXY:
        try:
            probe_transcript_api(report, key="transcript_api_via_proxy", proxy=PROXY)
        except Exception:
            report["proxy_probe_fatal"] = traceback.format_exc()[-400:]

    try:
        probe_cookies(report)
    except Exception:
        report["cookie_probe_fatal"] = traceback.format_exc()[-400:]

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
