"""
harvest — resumable, parallel, self-reporting fetch of a manifest.

    python harvest.py manifest.json -o transcripts --transport direct
    python harvest.py manifest.json -o transcripts --transport "https://r.jina.ai/{url}"

Design points that matter at 500+ videos:
  * one JSON per video, so a crash costs one video, not the run
  * existing ids are skipped, so re-running resumes
  * terminal failures (no-caption-track, too-short) are not retried
  * a machine-readable summary is written, so a caller never has to scrape stdout
"""

from __future__ import annotations

import argparse
import json
import os
import time
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed

from ytfetch import fetch

TERMINAL = {"no-caption-track", "too-short", "no-egress"}


def one(item: dict, out_dir: str, transport: str, cookies: str | None, lang: str) -> tuple[str, str]:
    vid = item["id"]
    dest = os.path.join(out_dir, f"{vid}.json")
    if os.path.exists(dest):
        return vid, "cached"

    last = "fail"
    for attempt in range(3):
        res = fetch(vid, transport=transport, cookies=cookies, lang=lang)
        status = res["status"]
        if status == "ok":
            res["title"] = item.get("title") or res.get("title", "")
            res["order"] = item.get("order")
            res["collection"] = item.get("collection")
            with open(dest, "w") as f:
                json.dump(res, f)
            return vid, "ok"
        last = status
        if status in TERMINAL:
            break
        time.sleep(5 + attempt * 6)
    return vid, last


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest")
    ap.add_argument("-o", "--out", default="transcripts")
    ap.add_argument("--transport", default="direct")
    ap.add_argument("--cookies")
    ap.add_argument("--lang", default="en")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--limit", type=int)
    a = ap.parse_args()

    manifest = json.load(open(a.manifest))
    if a.limit:
        manifest = manifest[: a.limit]
    os.makedirs(a.out, exist_ok=True)

    todo = [m for m in manifest if not os.path.exists(os.path.join(a.out, f"{m['id']}.json"))]
    print(f"{len(manifest)} in manifest · {len(todo)} to fetch · transport={a.transport}", flush=True)

    counts: Counter = Counter()
    done = 0
    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futures = {ex.submit(one, m, a.out, a.transport, a.cookies, a.lang): m for m in todo}
        for fut in as_completed(futures):
            vid, status = fut.result()
            counts[status] += 1
            done += 1
            if status not in ("ok", "cached"):
                print(f"  {done}/{len(todo)} {status:18s} {vid}", flush=True)

    have = [m["id"] for m in manifest if os.path.exists(os.path.join(a.out, f"{m['id']}.json"))]
    summary = {
        "manifest": len(manifest),
        "fetched": counts.get("ok", 0),
        "cached": counts.get("cached", 0),
        "have": len(have),
        "statuses": dict(counts),
        "missing": [m["id"] for m in manifest if m["id"] not in set(have)][:50],
        "transport": a.transport,
    }
    with open(os.path.join(a.out, "_summary.json"), "w") as f:
        json.dump(summary, f, indent=1)

    print(json.dumps({k: v for k, v in summary.items() if k != "missing"}, indent=1))
    if summary["missing"]:
        print("missing:", " ".join(summary["missing"][:12]))

    # A run that produced nothing because of the network should say so, loudly and once.
    if summary["have"] == 0 and summary["statuses"].get("no-egress"):
        print("::error::no YouTube egress from this host — stop and use the handoff path")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
