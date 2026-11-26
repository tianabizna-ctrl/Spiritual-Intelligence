"""
preflight — decide whether this machine can fetch YouTube, in about 5 seconds.

Run this FIRST. It answers three questions and prints one verdict:

  1. Can yt-dlp reach YouTube metadata from here?   (egress + bot wall)
  2. Can a caption document be fetched, directly or through a relay?
  3. Is the toolchain complete?                     (requests, deno, yt-dlp)

Verdicts
  DIRECT       fetch normally
  RELAY:<url>  direct is blocked but this relay reaches YouTube; pass it as transport
  COOKIES      YouTube responds with a bot check; a cookies.txt will clear it
  NO-EGRESS    YouTube is unreachable from this host. Stop, and use the handoff path.

Exit code is 0 for DIRECT/RELAY/COOKIES and 2 for NO-EGRESS, so a pipeline can gate on it:

    if ! python3 preflight.py; then echo "cannot harvest here"; exit 0; fi     # skip, don't fail
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys

PROBE_VIDEO = "2gEcMvKjmzc"  # public, has en-orig auto captions
YOUTUBE_PROBE = "https://www.youtube.com/robots.txt"

# Reader/CORS relays that can proxy a fetch on your behalf. Ordered by reliability.
RELAYS = [
    ("r.jina.ai", "https://r.jina.ai/{url}"),
    ("allorigins", "https://api.allorigins.win/raw?url={q}"),
    ("codetabs", "https://api.codetabs.com/v1/proxy?quest={q}"),
    ("corsproxy.io", "https://corsproxy.io/?{q}"),
]


def _requests():
    try:
        import requests  # noqa: F401
        return __import__("requests")
    except ImportError:
        return None


def _get(url: str, timeout: int = 12) -> tuple[bool, str]:
    requests = _requests()
    if requests is None:
        return False, "requests not installed"
    try:
        r = requests.get(url, timeout=timeout, headers={"User-Agent": "curl/8.4.0"})
        return r.status_code == 200, f"HTTP {r.status_code} {len(r.text)}b"
    except Exception as exc:  # noqa: BLE001
        return False, type(exc).__name__


def toolchain() -> dict:
    requests = _requests()
    return {
        "yt-dlp": shutil.which("yt-dlp") or "",
        "deno": shutil.which("deno") or "",
        "requests": bool(requests),
        "yt-dlp version": (
            subprocess.run(["yt-dlp", "--version"], capture_output=True, text=True).stdout.strip()
            if shutil.which("yt-dlp")
            else "missing"
        ),
    }


def youtube_egress() -> tuple[str, str]:
    """Classify what happens when we ask YouTube for metadata."""
    if not shutil.which("yt-dlp"):
        return "no-ytdlp", "yt-dlp not on PATH"
    try:
        p = subprocess.run(
            ["yt-dlp", "-J", "--skip-download", "--remote-components", "ejs:github", PROBE_VIDEO],
            capture_output=True,
            text=True,
            timeout=90,
        )
    except subprocess.TimeoutExpired:
        return "no-egress", "metadata call timed out"
    out = (p.stderr or "") + (p.stdout or "")
    if out.strip().startswith("{") or '"formats"' in out[:4000]:
        return "ok", "metadata ok"
    low = out.lower()
    if "sign in to confirm" in low or "not a bot" in low:
        return "cookies", "YouTube is asking for a signed-in session"
    if "no title found" in low or "player response" in low:
        return "blocked", "player response missing (IP wall)"
    if any(s in low for s in ("ssl", "certificate", "connection reset", "timed out", "getaddrinfo", "urlopen error")):
        return "no-egress", out.strip().splitlines()[-1][:120] if out.strip() else "connection failed"
    return "unknown", out.strip().splitlines()[-1][:120] if out.strip() else "no output"


def direct_egress() -> tuple[bool, str]:
    """Independent of yt-dlp wording: can a plain HTTPS GET to YouTube succeed at all?

    yt-dlp says "no title found" both when an IP is bot-walled and when the connection is
    dead, so its message alone cannot tell the two apart. This can.
    """
    requests = _requests()
    if requests is None:
        return True, "requests missing, assuming egress"
    try:
        r = requests.get(YOUTUBE_PROBE, timeout=8, headers={"User-Agent": "curl/8.4.0"})
        return r.status_code == 200, f"HTTP {r.status_code}"
    except Exception as exc:  # noqa: BLE001
        return False, type(exc).__name__


def relay_probe() -> list[dict]:
    """Ask each relay to fetch YouTube. A relay that returns YouTube HTML got through."""
    found = []
    for name, tpl in RELAYS:
        url = tpl.format(url=YOUTUBE_PROBE, q=YOUTUBE_PROBE)
        ok, detail = _get(url)
        found.append({"relay": name, "tpl": tpl, "ok": ok, "detail": detail})
        if ok:
            break  # first working relay is enough
    return found


def main() -> int:
    report = {"toolchain": toolchain()}
    print("toolchain:", json.dumps(report["toolchain"]))

    meta_state, meta_detail = youtube_egress()
    report["metadata"] = {"state": meta_state, "detail": meta_detail}
    print(f"YouTube metadata: {meta_state} — {meta_detail}")

    if meta_state == "ok":
        verdict, transport = "DIRECT", "direct"
    elif meta_state == "cookies":
        verdict, transport = "COOKIES", "direct"
    else:
        egress_ok, egress_detail = direct_egress()
        report["egress"] = {"ok": egress_ok, "detail": egress_detail}
        print(f"direct egress to youtube.com: {'OK' if egress_ok else 'BLOCKED'} ({egress_detail})")
        relays = relay_probe()
        working = next((r for r in relays if r["ok"]), None)
        report["relays"] = relays
        for r in relays:
            print(f"  relay {r['relay']:14s} {'OK' if r['ok'] else 'fail'}  ({r['detail']})")
        if working:
            verdict, transport = f"RELAY:{working['relay']}", working["tpl"]
        elif not egress_ok or meta_state == "no-egress":
            verdict, transport = "NO-EGRESS", ""
        else:
            verdict, transport = "BLOCKED", ""

    report["verdict"] = verdict
    report["transport"] = transport
    print(json.dumps(report, indent=1))

    with open(".preflight.json", "w") as f:
        json.dump(report, f, indent=1)

    print(f"\nVERDICT: {verdict}")
    if verdict == "NO-EGRESS":
        print("  This host cannot reach YouTube. Do not retry here — see SKILL.md §Arena handoff.")
        return 2
    if verdict == "COOKIES":
        print("  Export cookies from a logged-in browser and pass --cookies cookies.txt.")
    if verdict == "BLOCKED":
        print("  Metadata is walled but a relay may still work; retry with --transport <relay>.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
