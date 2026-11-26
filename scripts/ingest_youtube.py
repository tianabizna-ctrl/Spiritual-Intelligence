#!/usr/bin/env python3
"""
Ingest transcripts harvested by the vendored scripts/yt/ toolkit.

scripts/yt/harvest.py writes ``{"id", "status", "chars", "track", "translated",
"title", "text"}``. The app reads collection-tagged records in
``data/transcripts/<subdir>/<id>.json``, so this converts one to the other and
applies the cleaning rules from SKILL.md §6 along the way.

    python3 scripts/ingest_youtube.py --collection christian-house \\
        --src transcripts --manifest manifest.json

Then:
    python3 scripts/harvest_drive.py --build-ts
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_ROOT = os.path.join(ROOT_DIR, "data", "transcripts")

# YouTube collections: subdir on disk + how they should appear in the app.
COLLECTIONS = {
    "christian-house": {
        "subdir": "christian-house",
        "playlistId": "PL92WcLuzyEGORejB8thjnIOCfxedSicKR",
        "channel": "Christian House",
        "author": "Apostle Joshua Selman",
        "kind": "teachings",
        "label": "Apostle Joshua Selman Message",
    },
}

# Channel boilerplate that gets transcribed into every upload. Filtered per
# sentence; without this every excerpt is the same sponsor read.
BOILERPLATE = (
    "provided by",
    "monroeglobal",
    "moneglobal",
    "we hope this message is a blessing",
    "for more products",
    "partner with us",
    "subscribe to our channel",
    "click the bell",
    "kindly subscribe",
)

SOUND_MARKERS = re.compile(
    r"\[(music|applause|laughter|silence|singing|Music|Applause|Laughter)\]", re.I
)


def clean_text(text: str) -> str:
    text = SOUND_MARKERS.sub(" ", text)
    text = text.replace(">>", " ")
    text = re.sub(r"\s+", " ", text).strip()

    # Drop boilerplate sentences.
    sentences = re.split(r"(?<=[.!?])\s+", text)
    kept = [s for s in sentences if not any(p in s.lower() for p in BOILERPLATE)]
    return " ".join(kept)


def paragraphise(text: str, target: int = 420) -> list[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text)
    if len(sentences) <= 1:
        return [text] if text else []
    out, buf = [], ""
    for sentence in sentences:
        if len(buf) + len(sentence) + 1 <= target:
            buf = f"{buf} {sentence}".strip()
        else:
            if buf:
                out.append(buf)
            buf = sentence
    if buf:
        out.append(buf)
    return out


def de_loop(paras: list[str]) -> list[str]:
    """Long 'all night' uploads repeat one loop; cut at the repeat point."""
    if len(paras) <= 160:
        return paras
    heads = [p[:40] for p in paras]
    for k in range(30, len(paras) // 2):
        repeats = sum(1 for i in range(len(paras) - k) if heads[i] == heads[i + k])
        if repeats >= 0.6 * (len(paras) - k):
            return paras[:k]
    return paras


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--collection", required=True, choices=list(COLLECTIONS))
    ap.add_argument("--src", default="transcripts", help="directory harvest.py wrote to")
    ap.add_argument("--manifest", default="manifest.json", help="playlist.py output")
    args = ap.parse_args()

    spec = COLLECTIONS[args.collection]
    out_dir = os.path.join(OUT_ROOT, spec["subdir"])
    os.makedirs(out_dir, exist_ok=True)

    meta = {}
    if os.path.isfile(args.manifest):
        for row in json.load(open(args.manifest, encoding="utf-8")):
            meta[row["id"]] = row

    if not os.path.isdir(args.src):
        print(f"error: no harvest directory at {args.src}", file=sys.stderr)
        return 1

    files = [n for n in sorted(os.listdir(args.src)) if n.endswith(".json")]
    print(f"harvest directory: {args.src} ({len(files)} json files)")
    if not files:
        # harvest.py only writes a json for status == ok, so an empty directory
        # means the runner could not fetch any caption this time.
        print(
            "no harvested json files: the runner got no usable caption tracks "
            "(see the harvest step's own status summary above)",
            file=sys.stderr,
        )
        return 1

    statuses: dict[str, int] = {}
    written = skipped = 0
    for name in files:
        if not name.endswith(".json"):
            continue
        try:
            raw = json.load(open(os.path.join(args.src, name), encoding="utf-8"))
        except Exception as exc:  # a truncated file must not sink the whole run
            statuses["unreadable"] = statuses.get("unreadable", 0) + 1
            print(f"skip {name}: unreadable ({exc})", file=sys.stderr)
            continue
        st = raw.get("status", "missing-status")
        statuses[st] = statuses.get(st, 0) + 1
        if st != "ok":
            skipped += 1
            print(f"skip {name}: status={st}")
            continue

        text = clean_text(raw.get("text") or "")
        if len(text) < 300:
            skipped += 1
            print(f"skip {name}: too short after cleaning ({len(text)} chars)")
            continue

        vid = raw["id"]
        row = meta.get(vid, {})
        paras = de_loop(paragraphise(text))

        record = {
            "id": vid,
            "title": row.get("title") or raw.get("title") or vid,
            "collection": spec["kind"],
            "collectionSlug": args.collection,
            "channel": spec["channel"],
            "author": spec["author"],
            "playlistId": spec["playlistId"],
            "duration": str(int(row.get("duration") or 0)),
            "order": row.get("order", 0),
            "language": "en",
            "translated": bool(raw.get("translated")),
            "track": raw.get("track", ""),
            "wordCount": len(text.split()),
            "charCount": len(text),
            "paragraphs": paras,
            "text": text,
            "source": "youtube",
        }
        with open(os.path.join(out_dir, f"{vid}.json"), "w", encoding="utf-8") as f:
            json.dump(record, f, ensure_ascii=False)
        written += 1

    print(f"statuses seen: {statuses}")
    print(f"ingested {written} transcripts into {os.path.relpath(out_dir, ROOT_DIR)}")
    print(f"skipped {skipped} (not ok / too short)")
    print("\nNow run: python3 scripts/harvest_drive.py --build-ts")
    if not written:
        # Say why, on stderr, so a CI annotation carries the reason.
        print(f"no usable transcripts; statuses={statuses}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
