"""
verify_transcripts — sanity-check a tree of committed transcripts, no network needed.

    python verify_transcripts.py data/transcripts
    python verify_transcripts.py data/transcripts --schema app

Use this in CI or in a sandbox that cannot reach YouTube: it is the step that proves the
harvested files are real before a build consumes them.

Checks per file:
  * parses as JSON and is an object
  * has an id, a non-trivial text (>300 chars), and a matching filename
  * records paragraph count (a one-paragraph 20k-word file renders as a wall)
  * flags machine-translated English (track / translated flag), which is easy to miss
Exit code 1 when anything is unusable.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
from collections import Counter


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--schema", default="any", choices=["any", "app"], help="app = paragraphs[] + collectionSlug")
    a = ap.parse_args()

    files = sorted(glob.glob(os.path.join(a.root, "**", "*.json"), recursive=True))
    files = [f for f in files if not os.path.basename(f).startswith("_") and "manifest" not in os.path.basename(f)]
    if not files:
        print(f"no transcript files under {a.root}")
        return 1

    ids: Counter = Counter()
    bad, thin, translated, walled = [], [], [], []
    words = 0
    for f in files:
        base = os.path.basename(f)[:-5]
        try:
            d = json.load(open(f))
        except json.JSONDecodeError:
            bad.append((base, "invalid JSON"))
            continue
        if not isinstance(d, dict):
            continue
        text = d.get("text") or ""
        words += len(text.split())
        ids[d.get("id", base)] += 1
        if d.get("id") and d["id"] != base:
            bad.append((base, f"id mismatch: {d['id']}"))
        if len(text) < 300:
            thin.append(base)
        if d.get("translated"):
            translated.append(base)
        paras = d.get("paragraphs")
        if isinstance(paras, list) and len(paras) <= 1 and len(text.split()) > 4000:
            walled.append(base)
        if a.schema == "app":
            for key in ("id", "text", "paragraphs"):
                if key not in d:
                    bad.append((base, f"missing {key}"))
                    break

    dupes = [i for i, n in ids.items() if n > 1]
    print(f"files            {len(files)}")
    print(f"unique ids       {len(ids)}")
    print(f"words            {words:,}")
    print(f"unusable         {len(set(thin)) + len(bad)}")
    for label, group in (("duplicate ids", dupes), ("empty/short", thin), ("12k+ words in 1 paragraph", walled), ("machine-translated", translated)):
        if group:
            print(f"{label:16s} {len(group)}: {' '.join(sorted(set(group))[:8])}")
    for base, why in bad[:8]:
        print(f"  BAD {base}: {why}")

    ok = not bad and not thin and not dupes
    print("\nVERDICT:", "OK" if ok else "PROBLEMS FOUND")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
