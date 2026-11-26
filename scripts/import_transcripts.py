#!/usr/bin/env python3
"""
Imports transcripts harvested elsewhere into this repo.

Harvesting needs a machine where YouTube is reachable. This repo's CI cannot
reach it (bot wall), and the sandbox that runs the agent has no YouTube egress at
all, so the harvest happens on a workstation and the JSON is brought in here.

Accepts either shape:

  * the toolkit's raw output  — transcripts/<videoId>.json with {"id","status":"ok",
    "text",...} exactly as scripts/yt/harvest.py writes it
  * an app record already built by scripts/ingest_youtube.py

    python3 scripts/import_transcripts.py --src ~/transcripts --collection christian-house
    python3 scripts/import_transcripts.py --src ~/transcripts --collection christian-house --dry-run

Grouping follows the toolkit's SKILL.md: collectionSlug is the real source group,
and the speaker is per item, so one teaching library can hold several speakers.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_TRANSCRIPTS = os.path.join(ROOT_DIR, "data", "transcripts")

KNOWN = {
    "christian-house": {
        "kind": "teachings",
        "channel": "Christian House",
        "author": "Apostle Joshua Selman",
        "playlistId": "PL92WcLuzyEGORejB8thjnIOCfxedSicKR",
    },
}

MIN_CHARS = 300
PARA_CHARS = 420

_SOUND = re.compile(
    r"\[(?:music|applause|laughter|clears throat|snorts?|sighs|laughs)\]",
    re.I,
)


def clean_text(text: str) -> str:
    """Apply the SKILL.md §6 cleaning rules the ingest step uses."""
    text = _SOUND.sub(" ", text)
    text = text.replace(">>", " ")
    text = re.sub(r"[ \t]+", " ", text)
    # Drop per-sentence boilerplate the same way ingest does.
    text = re.sub(r"(?i)\b(please )?subscribe\b[^.!?]*[.!?]", " ", text)
    text = re.sub(r"(?i)\blike and share\b[^.!?]*[.!?]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def paragraphise(text: str) -> list[str]:
    """Split a flat transcript into readable paragraphs at sentence ends."""
    out: list[str] = []
    buf = ""
    for sentence in re.split(r"(?<=[.!?])\s+", text):
        if buf and len(buf) + len(sentence) > PARA_CHARS:
            out.append(buf.strip())
            buf = ""
        buf += ((" " if buf else "") + sentence)
    if buf.strip():
        out.append(buf.strip())
    return out


def parse_duration(value) -> str:
    """Normalise a duration to H:MM:SS / M:SS.

    playlist.py yields float seconds, some payloads carry "12:34", and the
    toolkit's raw records usually have none at all. Anything unusable becomes ""
    so the UI can omit the field rather than print a dangling separator.
    """
    if value in (None, "", "NA", "None"):
        return ""
    try:
        if isinstance(value, str) and ":" in value:
            parts = [int(p) for p in value.split(":")]
            seconds = 0
            for part in parts:
                seconds = seconds * 60 + part
        else:
            seconds = int(float(value))
    except (TypeError, ValueError):
        return ""
    if seconds <= 0:
        return ""
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def load_manifest_durations(path: str | None) -> dict[str, str]:
    """Map videoId -> formatted duration from a playlist.py manifest."""
    if not path:
        return {}
    if not os.path.isfile(path):
        print(f"warning: no manifest at {path}, durations will be blank", file=sys.stderr)
        return {}
    with open(path, "r", encoding="utf-8") as f:
        rows = json.load(f)
    if isinstance(rows, dict):
        rows = rows.get("videos") or rows.get("items") or []
    out = {}
    for row in rows:
        if not isinstance(row, dict) or not row.get("id"):
            continue
        formatted = parse_duration(row.get("duration"))
        if formatted:
            out[row["id"]] = formatted
    return out


def normalise(
    raw: dict, collection: str, spec: dict, durations: dict[str, str] | None = None
) -> dict | None:
    """Turn either input shape into an app record, or None when unusable."""
    if raw.get("status") not in (None, "ok"):
        return None
    text = clean_text(raw.get("text") or "")
    if len(text) < MIN_CHARS:
        return None

    vid = raw.get("id")
    if not vid:
        return None

    slug = raw.get("collectionSlug") or collection
    paras = raw.get("paragraphs")
    if not isinstance(paras, list) or not paras:
        paras = paragraphise(text)

    return {
        "id": vid,
        "title": raw.get("title") or vid,
        # app-side kind; the source group lives in collectionSlug
        "collection": raw.get("collection") or spec["kind"],
        "collectionSlug": slug,
        "channel": raw.get("channel") or spec["channel"],
        "author": (raw.get("author") or spec["author"] or "").strip(),
        "playlistId": raw.get("playlistId") or spec["playlistId"],
        "duration": parse_duration(raw.get("duration"))
        or (durations or {}).get(vid, ""),
        "order": raw.get("order", 0),
        "language": raw.get("language") or "en",
        "translated": bool(raw.get("translated")),
        "track": raw.get("track", ""),
        "wordCount": len(text.split()),
        "charCount": len(text),
        "paragraphs": paras,
        "text": text,
        "source": raw.get("source") or "youtube",
    }


def main() -> int:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("--src", required=True, help="directory of harvested .json files")
    ap.add_argument("--collection", required=True, help="target group, e.g. christian-house")
    ap.add_argument("--dry-run", action="store_true", help="report without writing")
    ap.add_argument("--manifest", help="playlist.py manifest, joined in for video durations")
    args = ap.parse_args()

    spec = KNOWN.get(args.collection, {
        "kind": "teachings",
        "channel": args.collection.replace("-", " ").title(),
        "author": args.collection.replace("-", " ").title(),
        "playlistId": None,
    })

    if not os.path.isdir(args.src):
        print(f"error: no such directory: {args.src}", file=sys.stderr)
        return 1

    durations = load_manifest_durations(args.manifest)

    out_dir = os.path.join(DATA_TRANSCRIPTS, args.collection)
    files = [n for n in sorted(os.listdir(args.src)) if n.endswith(".json")]
    if not files:
        print(f"error: no .json files in {args.src}", file=sys.stderr)
        return 1

    written = skipped = 0
    seen: set[str] = set()
    for name in files:
        try:
            with open(os.path.join(args.src, name), "r", encoding="utf-8") as f:
                raw = json.load(f)
        except Exception as exc:  # a truncated file must not sink the run
            skipped += 1
            print(f"skip {name}: unreadable ({exc})", file=sys.stderr)
            continue

        if isinstance(raw, list):  # tolerate a playlist manifest
            skipped += 1
            continue

        rec = normalise(raw, args.collection, spec, durations)
        if not rec:
            skipped += 1
            print(f"skip {name}: no usable text (status={raw.get('status')})")
            continue

        # Later files win, so the sort is stable and reruns are idempotent.
        seen.add(rec["id"])
        if not args.dry_run:
            os.makedirs(out_dir, exist_ok=True)
            with open(os.path.join(out_dir, f"{rec['id']}.json"), "w", encoding="utf-8") as f:
                json.dump(rec, f, ensure_ascii=False, indent=2)
        written += 1

    on_disk = len([n for n in os.listdir(out_dir)]) if os.path.isdir(out_dir) else 0
    print(f"\n{'would import' if args.dry_run else 'imported'}: {written}")
    print(f"skipped: {skipped}")
    print(f"{args.collection} now holds {on_disk if not args.dry_run else len(seen)} records")
    if not args.dry_run and written:
        print("\nnext: python3 scripts/harvest_drive.py --build-ts")
        print("then: python3 scripts/generate_docx_packages.py")
    return 0 if written else 1


if __name__ == "__main__":
    raise SystemExit(main())
