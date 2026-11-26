"""
Harvest transcripts for a manifest, resumable, 4 workers.

    python harvest.py manifest.json -o transcripts
    python harvest.py manifest.json -o transcripts --cookies cookies.txt --workers 4

Behaviour that matters on a 500-video job:
  * one JSON file per video -> a crash costs you one video, not the run
  * already-downloaded ids are skipped, so re-running resumes
  * per-status report at the end (ok / no-caption-track / blocked / caption-fetch-fail)
  * 4 workers is the safe ceiling; more gets you throttled
"""

from __future__ import annotations

import argparse
import json
import os
import threading
import time
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed

from ytfetch import fetch

lock = threading.Lock()


def one(item: dict, out_dir: str, cookies: str | None, lang: str, direct: bool) -> tuple[str, str]:
    vid = item["id"]
    dest = os.path.join(out_dir, f"{vid}.json")
    if os.path.exists(dest):
        return vid, "cached"
    last = "fail"
    for attempt in range(3):
        res = fetch(vid, cookies=cookies, lang=lang, direct=direct)
        status = res["status"]
        if status == "ok":
            res["title"] = item.get("title") or res.get("title", "")
            res["collection"] = item.get("collection")
            json.dump(res, open(dest, "w"))
            return vid, "ok"
        last = status
        if status in ("no-caption-track", "too-short"):
            return vid, status  # retrying will not help
        time.sleep(5 + attempt * 6)
    return vid, last


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest")
    ap.add_argument("-o", "--out", default="transcripts")
    ap.add_argument("--cookies")
    ap.add_argument("--lang", default="en")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--direct", action="store_true")
    ap.add_argument("--limit", type=int)
    a = ap.parse_args()

    manifest = json.load(open(a.manifest))
    if a.limit:
        manifest = manifest[: a.limit]
    os.makedirs(a.out, exist_ok=True)

    todo = [m for m in manifest if not os.path.exists(os.path.join(a.out, f"{m['id']}.json"))]
    print(f"{len(manifest)} in manifest, {len(todo)} to fetch", flush=True)

    counts: Counter = Counter()
    done = 0
    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futures = {ex.submit(one, m, a.out, a.cookies, a.lang, a.direct): m for m in todo}
        for fut in as_completed(futures):
            vid, status = fut.result()
            counts[status] += 1
            done += 1
            if status not in ("ok", "cached"):
                print(f"{done}/{len(todo)} {status:18s} {vid}", flush=True)

    print("\nsummary:", dict(counts))
    bad = [m["id"] for m in manifest if not os.path.exists(os.path.join(a.out, f"{m['id']}.json"))]
    if bad:
        print(f"{len(bad)} without a transcript:", " ".join(bad[:20]))


if __name__ == "__main__":
    main()
