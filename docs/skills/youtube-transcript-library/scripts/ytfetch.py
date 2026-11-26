"""
ytfetch — one video → English transcript text, over a chosen transport.

Transport is explicit, because the hard part is rarely the parsing:

    "direct"                          your IP talks to YouTube
    "https://r.jina.ai/{url}"         a relay fetches the signed caption URL for you
    ("{q}" in the template = URL-encoded form, for CORS proxies)

The transport only affects the caption document fetch. Metadata always comes from yt-dlp,
which must be able to reach YouTube — see preflight.py.

Track selection, learned the hard way:
  * `info["subtitles"]` can contain `live_chat`; `subtitles or automatic_captions` therefore
    never falls through, and every video looks captionless. Search both maps explicitly.
  * prefer `en-orig` over `en`: on a non-English video, `en` is a machine translation
    (its URL contains `tlang=en`). Flag that instead of storing it silently.
  * `json3` is not universal → fall back to `srv1`, then `vtt`.
  * yt-dlp needs `--remote-components ejs:github` (plus Deno) or some videos return
    metadata with no caption tracks at all.
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

EN_PREFERENCE = ("en-orig", "en-GB", "en-US", "en")


def metadata(video_id: str, cookies: str | None = None) -> tuple[dict | None, str]:
    cmd = ["yt-dlp", "-J", "--skip-download", "--remote-components", "ejs:github", video_id]
    if cookies:
        cmd += ["--cookies", cookies]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    except subprocess.TimeoutExpired:
        return None, "no-egress: metadata timed out"
    out = p.stdout or ""
    if out.lstrip().startswith("{"):
        try:
            return json.loads(out), ""
        except json.JSONDecodeError:
            return None, "meta-fail: unparsable JSON"
    msg = ((p.stderr or "") + out).strip().splitlines()
    tail = msg[-1][:160] if msg else "no output"
    low = tail.lower()
    if "sign in to confirm" in low or "not a bot" in low:
        return None, f"blocked-bot-wall: {tail}"
    if any(k in low for k in ("ssl", "proxyerror", "urlopen", "connection", "timed out", "getaddrinfo")):
        return None, f"no-egress: {tail}"
    return None, f"meta-fail: {tail}"


def pick_track(info: dict, lang: str = "en") -> tuple[str | None, str | None, str | None]:
    manual = info.get("subtitles") or {}
    auto = info.get("automatic_captions") or {}
    wanted = EN_PREFERENCE if lang == "en" else (lang, f"{lang}-orig")

    for kind, tracks in (("manual", manual), ("auto", auto)):
        for key in wanted:
            for t in tracks.get(key) or []:
                if t.get("ext") == "json3":
                    return t["url"], kind, key
    for kind, tracks in (("manual", manual), ("auto", auto)):
        for key in wanted:
            for t in tracks.get(key) or []:
                if t.get("ext") in ("srv1", "vtt"):
                    return t["url"], f"{kind}:{t['ext']}", key
    return None, None, None


def _parse_json3(text: str) -> str:
    data = json.loads(text[text.index("{"):])
    parts = ["".join(s.get("utf8", "") for s in (ev.get("segs") or [])) for ev in data.get("events", [])]
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


def _target(caption_url: str, transport: str) -> str:
    if transport in ("", "direct"):
        return caption_url
    from urllib.parse import quote
    if "{q}" in transport:
        return transport.replace("{q}", quote(caption_url, safe=""))
    return transport.replace("{url}", caption_url)


def fetch(
    video_id: str,
    transport: str = "direct",
    cookies: str | None = None,
    lang: str = "en",
    retries: int = 3,
) -> dict:
    """Fetch one transcript. Never raises for expected failures — read r["status"]."""
    info, err = metadata(video_id, cookies=cookies)
    if info is None:
        code = err.split(":")[0]
        status = {
            "blocked-bot-wall": "blocked",
            "no-egress": "no-egress",
        }.get(code, "meta-fail")
        return {"id": video_id, "status": status, "err": err}

    url, kind, key = pick_track(info, lang)
    if not url:
        return {
            "id": video_id,
            "status": "no-caption-track",
            "title": (info.get("title") or "")[:90],
            "available": sorted(k for k in (info.get("automatic_captions") or {}) if not k.startswith("live"))[:6],
        }

    last = "unreachable"
    for attempt in range(retries):
        try:
            if requests is None:
                raise RuntimeError("requests not installed")
            r = requests.get(
                _target(url, transport),
                timeout=120,
                headers={"User-Agent": "curl/8.4.0", "Accept": "*/*", "Accept-Language": "en-US,en;q=0.9"},
            )
            if r.status_code == 200 and len(r.text) > 80:
                if kind.endswith("srv1"):
                    text = _parse_srv1(r.text)
                elif kind.endswith("vtt"):
                    text = _parse_vtt(r.text)
                else:
                    text = _parse_json3(r.text)
                return {
                    "id": video_id,
                    "status": "ok" if len(text) >= 300 else "too-short",
                    "chars": len(text),
                    "track": f"{kind}:{key}",
                    "translated": lang == "en" and key == "en" and "tlang" in url,
                    "title": (info.get("title") or "")[:90],
                    "duration": int(info.get("duration") or 0),
                    "text": text,
                }
            last = f"HTTP {r.status_code} ({len(r.text)}b)"
            if r.status_code in (403, 410):  # signed URL expired → get a fresh one
                info, err = metadata(video_id, cookies=cookies)
                if info is None:
                    return {"id": video_id, "status": "no-egress" if "no-egress" in err else "meta-fail", "err": err}
                url, kind, key = pick_track(info, lang)
                if not url:
                    return {"id": video_id, "status": "no-caption-track"}
        except Exception as exc:  # noqa: BLE001
            last = type(exc).__name__
        time.sleep(3 + attempt * 4)
    return {"id": video_id, "status": "caption-fetch-fail", "err": last, "track": kind}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("video_id")
    ap.add_argument("--transport", default="direct", help='"direct" or a relay template')
    ap.add_argument("--cookies")
    ap.add_argument("--lang", default="en")
    a = ap.parse_args()
    res = fetch(a.video_id, transport=a.transport, cookies=a.cookies, lang=a.lang)
    head = res.pop("text", "")
    print(json.dumps(res, indent=1))
    if head:
        print("\n--- first 400 chars ---\n" + head[:400])
