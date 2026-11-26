"""
ytfetch — pull English captions for one video, without the transcript API.

Why this exists: youtube-transcript-api gets IP-blocked (HTTP 429) after ~100 videos,
and yt-dlp --write-auto-subs suffers the same rate limit. This module asks yt-dlp for the
signed `timedtext` URL from video metadata, then fetches *that JSON endpoint* — optionally
through a reader proxy so the request comes from a different IP.

Important: the proxy fetches a JSON/XML caption endpoint, not an HTML page, so "reader
proxies strip <script> payloads" does not apply. Nothing here scrapes the player page.

Usage:
    from ytfetch import fetch
    r = fetch("dQw4w9WgXcQ")           # dict: id, status, chars, text, track
    r = fetch(vid, cookies="cookies.txt", proxy=True)

CLI:
    python ytfetch.py <videoId> [--cookies F] [--direct] [--lang es]
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time

try:
    import requests
except ImportError:  # pragma: no cover
    requests = None

TIMEDTEXT_PROXY = "https://r.jina.ai/"

# Languages we accept for an English library, best first. `en-orig` is the original
# English track; plain `en` on a non-English video is usually a machine *translation*
# (its URL carries `tlang=en`), which is a silent quality trap worth flagging.
EN_PREFERENCE = ("en-orig", "en-GB", "en-US", "en")


def _yt_dlp_json(video_id: str, cookies: str | None = None, lang: str = "en") -> dict:
    cmd = [
        "yt-dlp",
        "-J",
        "--skip-download",
        # Modern yt-dlp needs a JS runtime + solver scripts for many videos.
        # Node is ignored unless named; Deno works. Without this, metadata for some
        # videos comes back without caption tracks at all.
        "--remote-components",
        "ejs:github",
        video_id,
    ]
    if cookies:
        cmd += ["--cookies", cookies]
    out = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    if out.returncode != 0 or not out.stdout.strip().startswith("{"):
        raise RuntimeError((out.stderr or out.stdout).strip()[:300])
    return json.loads(out.stdout)


def pick_track(info: dict, lang: str = "en") -> tuple[str | None, str | None, str | None]:
    """Return (url, kind, lang_key). Prefers manual subs, then original-language auto."""
    manual = info.get("subtitles") or {}
    auto = info.get("automatic_captions") or {}

    # `subtitles` can contain non-caption entries such as `live_chat`. Never let a
    # truthy-but-useless dict shadow the real auto tracks — that bug silently turns
    # every video into "no captions".
    wanted = EN_PREFERENCE if lang == "en" else (lang, f"{lang}-orig")

    for kind, tracks in (("manual", manual), ("auto", auto)):
        for key in wanted:
            for t in tracks.get(key) or []:
                if t.get("ext") == "json3":
                    return t["url"], kind, key

    # json3 is not universal — fall back to formats we can still parse text out of.
    for kind, tracks in (("manual", manual), ("auto", auto)):
        for key in wanted:
            for t in tracks.get(key) or []:
                if t.get("ext") in ("srv1", "vtt"):
                    return t["url"], kind + ":" + t["ext"], key
    return None, None, None


def _parse_json3(text: str) -> str:
    data = json.loads(text[text.index("{"):])
    parts = []
    for ev in data.get("events", []):
        segs = ev.get("segs") or []
        if segs:
            parts.append("".join(s.get("utf8", "") for s in segs))
    return " ".join(" ".join(parts).split())


def _parse_srv1(text: str) -> str:
    import html
    import re

    body = re.sub(r"<text[^>]*>", "\n", text)
    body = re.sub(r"<[^>]+>", "", body)
    return " ".join(html.unescape(body).split())


def _parse_vtt(text: str) -> str:
    lines = []
    for line in text.splitlines():
        if "-->" in line or line.startswith(("WEBVTT", "NOTE", "Kind:", "Language:")):
            continue
        line = line.strip()
        if line and (not lines or line != lines[-1]):
            lines.append(line)
    return " ".join(" ".join(lines).split())


def _fetch_url(url: str, proxy: bool, timeout: int = 120) -> str:
    target = (TIMEDTEXT_PROXY + url) if proxy else url
    if requests is None:
        raise RuntimeError("pip install requests")
    last = None
    for attempt in range(3):
        try:
            r = requests.get(
                target,
                timeout=timeout,
                headers={
                    "User-Agent": "curl/8.4.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.9",
                },
            )
            if r.status_code == 200 and len(r.text) > 80:
                return r.text
            last = f"HTTP {r.status_code} len={len(r.text)}"
        except Exception as exc:  # noqa: BLE001
            last = str(exc)[:120]
        time.sleep(3 + attempt * 4)
    raise RuntimeError(f"caption fetch failed: {last}")


def fetch(
    video_id: str,
    cookies: str | None = None,
    lang: str = "en",
    direct: bool = False,
) -> dict:
    """Fetch one transcript. Never raises for expected failures — check r['status']."""
    try:
        info = _yt_dlp_json(video_id, cookies=cookies, lang=lang)
    except Exception as exc:  # noqa: BLE001
        msg = str(exc)
        blocked = "Sign in to confirm" in msg or "bot" in msg.lower()
        return {
            "id": video_id,
            "status": "blocked" if blocked else "meta-fail",
            "err": msg,
            "hint": "pass cookies=... or run on a residential IP" if blocked else None,
        }

    url, kind, key = pick_track(info, lang)
    if not url:
        return {
            "id": video_id,
            "status": "no-caption-track",
            "title": (info.get("title") or "")[:80],
            "tracks": list((info.get("automatic_captions") or {}).keys())[:6],
        }

    try:
        raw = _fetch_url(url, proxy=not direct)
        if kind and "srv1" in kind:
            text = _parse_srv1(raw)
        elif kind and "vtt" in kind:
            text = _parse_vtt(raw)
        else:
            text = _parse_json3(raw)
    except Exception as exc:  # noqa: BLE001
        return {"id": video_id, "status": "caption-fetch-fail", "err": str(exc)[:200], "track": kind}

    return {
        "id": video_id,
        "status": "ok" if len(text) >= 300 else "too-short",
        "chars": len(text),
        "track": f"{kind}:{key}",
        # `en` on a non-English original is a translation; say so instead of pretending.
        "translated": lang == "en" and key == "en" and "tlang" in url,
        "title": (info.get("title") or "")[:80],
        "text": text,
    }


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("video_id")
    ap.add_argument("--cookies")
    ap.add_argument("--lang", default="en")
    ap.add_argument("--direct", action="store_true", help="skip r.jina.ai (use when your IP is clean)")
    a = ap.parse_args()
    res = fetch(a.video_id, cookies=a.cookies, lang=a.lang, direct=a.direct)
    head = res.pop("text", "")
    print(json.dumps(res, indent=1))
    if head:
        print("\n--- first 400 chars ---\n" + head[:400])
