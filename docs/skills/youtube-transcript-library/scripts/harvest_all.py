"""One command: playlist URL → manifest → transcripts → verified report.

    python harvest_all.py "https://www.youtube.com/playlist?list=PL..." -o out

It runs preflight first and refuses to start when the host cannot reach YouTube, so a
blocked environment fails in seconds instead of after 22 timed-out retries.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


def run(cmd: list[str]) -> int:
    return subprocess.call(cmd, cwd=HERE)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("playlist")
    ap.add_argument("-o", "--out", default="harvest")
    ap.add_argument("--limit", type=int)
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--cookies")
    ap.add_argument("--transport", default="", help="empty = use the preflight verdict")
    ap.add_argument("--skip-preflight", action="store_true")
    a = ap.parse_args()

    os.makedirs(a.out, exist_ok=True)
    manifest = os.path.join(a.out, "manifest.json")

    transport = a.transport
    if not a.skip_preflight and not transport:
        print("== preflight ==")
        code = run([sys.executable, "preflight.py"])
        if code == 2:
            print("No egress: harvesting here cannot work. Use the committed-artifact path (SKILL.md §Arena).")
            return 2
        try:
            pf = json.load(open(os.path.join(HERE, ".preflight.json")))
            transport = pf.get("transport") or "direct"
        except (OSError, json.JSONDecodeError):
            transport = "direct"
        print(f"== transport: {transport or 'direct'} ==")

    transport = transport or "direct"

    print("== enumerate ==")
    code = run([sys.executable, "playlist.py", a.playlist, "-o", manifest] + (["--limit", str(a.limit)] if a.limit else []))
    if code != 0 or not os.path.exists(manifest):
        print("enumeration failed")
        return 1
    n = len(json.load(open(manifest)))
    if n == 0:
        print("playlist is empty or private")
        return 1

    print("== harvest ==")
    code = run([
        sys.executable, "harvest.py", manifest, "-o", a.out,
        "--transport", transport, "--workers", str(a.workers), "--lang", "en",
    ] + (["--cookies", a.cookies] if a.cookies else []))
    if code == 2:
        return 2

    print("== verify ==")
    files = sorted(glob.glob(os.path.join(a.out, "*.json")))
    files = [f for f in files if not f.endswith(("_summary.json", "manifest.json"))]
    words = 0
    bad = []
    for f in files:
        d = json.load(open(f))
        if not isinstance(d, dict):
            continue
        t = d.get("text", "")
        if len(t) < 300:
            bad.append(d["id"])
        words += len(t.split())
    print(f"{len(files)}/{n} transcripts · {words:,} words · {len(bad)} unusable")
    if bad:
        print("unusable:", " ".join(bad[:10]))
    return 0 if len(files) == n else 1


if __name__ == "__main__":
    raise SystemExit(main())
