#!/usr/bin/env python3
"""
Harvest transcripts from the public Spiritual Intelligence Google Drive library.

This replaces the YouTube harvester entirely: YouTube blocks datacenter IPs
("Sign in to confirm you're not a bot"), but the Drive folders are public and
serve the same transcripts already extracted as JSON.

Source folders (public, no authentication required):
  prayers/transcripts    — Prayer By Grace / Grace Enclave / Overcoming Daily
  teachings/transcripts  — Dr. Myles Munroe
  each folder has a manifest.json listing id/title/channel/playlist/order

Two Drive endpoints are used, both anonymous:
  listing : https://drive.google.com/embeddedfolderview?id=<FOLDER_ID>#list
  download: https://drive.usercontent.google.com/download?id=<FILE_ID>&export=download

Output, matching the schema the app already reads:
  data/transcripts/<videoId>.json          prayers
  data/transcripts/munroe/<videoId>.json   teachings
  data/catalog/drive_manifest_*.json       the Drive manifests, copied locally

Usage:
    python3 scripts/harvest_drive.py                 # both collections
    python3 scripts/harvest_drive.py --collection prayers
    python3 scripts/harvest_drive.py --limit 5       # smoke test
    python3 scripts/harvest_drive.py --build-ts      # regenerate app index
"""
import argparse
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_DIR = os.path.join(ROOT_DIR, "data", "catalog")
OUT_DIR = os.path.join(ROOT_DIR, "data", "transcripts")

LIST_URL = "https://drive.google.com/embeddedfolderview?id={folder}#list"
DOWNLOAD_URL = "https://drive.usercontent.google.com/download?id={fid}&export=download"

COLLECTIONS = {
    "prayers": {
        "folderId": "1DojoodInjPh6r7dHmGVKUBYT3FqL4QPk",
        "manifestId": "14FUN_S0L8dZ7YSLLZ1VTGLITMdcdSnEl",
        "subdir": "",
        "label": "Prayer library",
    },
    "teachings": {
        "folderId": "1EH26MRUuPBm5mdceC3ESgY17RI7hrnxR",
        "manifestId": "1kUCpadmmYEcOufadMP6r0-22oJhnvEZ-",
        "subdir": "munroe",
        "label": "Dr. Myles Munroe teachings",
    },
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}


def http_get(url: str, timeout: int = 60) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def list_folder(folder_id: str) -> list[dict]:
    """Return [{id, name}] for every file in a public Drive folder."""
    html = http_get(LIST_URL.format(folder=urllib.parse.quote(folder_id))).decode("utf-8", "replace")
    # entries look like: <a href="https://drive.google.com/file/d/<ID>/view...">...<name>.json
    pattern = re.compile(
        r'href="https://drive\.google\.com/file/d/([A-Za-z0-9_-]{20,})/view[^"]*"[^>]*>(.*?)</a>',
        re.S,
    )
    found, seen = [], set()
    for match in pattern.finditer(html):
        file_id = match.group(1)
        if file_id in seen:
            continue
        seen.add(file_id)
        inner = re.sub(r"<[^>]+>", " ", match.group(2))
        inner = re.sub(r"\s+", " ", inner).strip()
        name = inner.split()[-1] if inner else ""
        if not name.endswith(".json"):
            m = re.search(r"([A-Za-z0-9_\-]{6,}\.json)", inner)
            name = m.group(1) if m else ""
        if name:
            found.append({"id": file_id, "name": name})
    return found


def download_json(file_id: str) -> dict:
    raw = http_get(DOWNLOAD_URL.format(fid=urllib.parse.quote(file_id)))
    return json.loads(raw.decode("utf-8", "replace"))


def target_path(collection: dict, video_id: str) -> str:
    base = os.path.join(OUT_DIR, collection["subdir"]) if collection["subdir"] else OUT_DIR
    return os.path.join(base, f"{video_id}.json")


def harvest(collection_key: str, limit: int, sleep: float, force: bool) -> dict:
    coll = COLLECTIONS[collection_key]
    print(f"\n== {coll['label']} ==")

    # 1. manifest first so we get titles / channels / playlists
    meta = {}
    try:
        manifest = download_json(coll["manifestId"])
        os.makedirs(CATALOG_DIR, exist_ok=True)
        stem = f"drive_manifest_{collection_key}.json"
        with open(os.path.join(CATALOG_DIR, stem), "w", encoding="utf-8") as f:
            json.dump(manifest, f, ensure_ascii=False, indent=1)
        if isinstance(manifest, list):
            for entry in manifest:
                if isinstance(entry, dict) and entry.get("id"):
                    meta[entry["id"]] = entry
        print(f"  manifest: {len(meta)} entries")
    except Exception as exc:
        print(f"  manifest FAILED: {type(exc).__name__}: {str(exc)[:140]}")

    # 2. folder listing
    try:
        files = list_folder(coll["folderId"])
    except Exception as exc:
        print(f"  listing FAILED: {type(exc).__name__}: {str(exc)[:160]}", file=sys.stderr)
        return {"ok": 0, "skip": 0, "fail": 1}
    print(f"  folder listing: {len(files)} files")

    ok = skip = fail = 0
    attempted = 0
    for entry in files:
        name = entry["name"]
        if not name.endswith(".json") or name == "manifest.json":
            continue
        video_id = name[: -len(".json")]
        path = target_path(coll, video_id)
        if not force and os.path.isfile(path):
            skip += 1
            continue
        if limit and attempted >= limit:
            break
        attempted += 1
        try:
            payload = download_json(entry["id"])
        except Exception as exc:
            fail += 1
            print(f"  x {video_id}: {type(exc).__name__}: {str(exc)[:100]}")
            time.sleep(sleep)
            continue

        text = (payload.get("text") or "").strip()
        if not text:
            fail += 1
            print(f"  x {video_id}: empty text")
            time.sleep(sleep)
            continue

        info = meta.get(video_id, {})
        record = {
            "id": video_id,
            "title": info.get("title") or payload.get("title") or video_id,
            "collection": collection_key,
            "channel": info.get("channel") or "",
            "playlistId": info.get("playlist") or "",
            "duration": str(info.get("duration") or ""),
            "order": info.get("order", 0),
            "language": payload.get("lang", "en"),
            "wordCount": len(text.split()),
            "charCount": payload.get("chars") or len(text),
            "fetchedAt": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "source": "google-drive",
            "text": text,
        }
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(record, f, ensure_ascii=False)
        ok += 1
        if ok % 25 == 0:
            print(f"  … {ok} saved")
        time.sleep(sleep)

    print(f"  saved={ok} skipped={skip} failed={fail}")
    return {"ok": ok, "skip": skip, "fail": fail}


def build_ts():
    """Regenerate the app index + public per-transcript files."""
    public_dir = os.path.join(ROOT_DIR, "public", "transcripts")
    os.makedirs(public_dir, exist_ok=True)

    entries = []
    for collection_key, coll in COLLECTIONS.items():
        base = os.path.join(OUT_DIR, coll["subdir"]) if coll["subdir"] else OUT_DIR
        if not os.path.isdir(base):
            continue
        for name in sorted(os.listdir(base)):
            if not name.endswith(".json"):
                continue
            with open(os.path.join(base, name), "r", encoding="utf-8") as f:
                data = json.load(f)
            text = (data.get("text") or "").strip()
            if not text:
                continue
            out_name = f"{collection_key}__{data['id']}.json"
            with open(os.path.join(public_dir, out_name), "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False)
            entries.append(
                {
                    "id": data["id"],
                    "title": data.get("title", ""),
                    "collection": collection_key,
                    "channel": data.get("channel", ""),
                    "playlistId": data.get("playlistId") or None,
                    "duration": str(data.get("duration") or ""),
                    "wordCount": data.get("wordCount", len(text.split())),
                    "excerpt": " ".join(text.split()[:40]),
                }
            )

    target = os.path.join(ROOT_DIR, "src", "data", "libraryTranscripts.ts")
    by_collection = {}
    for e in entries:
        by_collection.setdefault(e["collection"], []).append(e)

    with open(target, "w", encoding="utf-8") as f:
        f.write("// Auto-generated by scripts/harvest_drive.py --build-ts. Do not edit by hand.\n")
        f.write("// Full text lives in public/transcripts/<collection>__<id>.json and is\n")
        f.write("// fetched on demand, so a large library does not bloat the JS bundle.\n")
        f.write("export interface LibraryTranscript {\n")
        f.write("  id: string;\n  title: string;\n  collection: 'prayers' | 'teachings';\n")
        f.write("  channel: string;\n  playlistId: string | null;\n  duration: string;\n")
        f.write("  wordCount: number;\n  excerpt: string;\n}\n\n")
        f.write("export const LIBRARY_TRANSCRIPTS: Record<string, LibraryTranscript> = {\n")
        for e in sorted(entries, key=lambda x: (x["collection"], x["title"].lower())):
            key = f"{e['collection']}__{e['id']}"
            f.write(f"  {json.dumps(key)}: {{\n")
            f.write(f"    id: {json.dumps(e['id'])},\n")
            f.write(f"    title: {json.dumps(e['title'], ensure_ascii=False)},\n")
            f.write(f"    collection: {json.dumps(e['collection'])},\n")
            f.write(f"    channel: {json.dumps(e['channel'], ensure_ascii=False)},\n")
            f.write(f"    playlistId: {json.dumps(e['playlistId'])},\n")
            f.write(f"    duration: {json.dumps(e['duration'])},\n")
            f.write(f"    wordCount: {e['wordCount']},\n")
            f.write(f"    excerpt: {json.dumps(e['excerpt'], ensure_ascii=False)},\n")
            f.write("  },\n")
        f.write("};\n\n")
        f.write("export const LIBRARY_TRANSCRIPT_COUNT = Object.keys(LIBRARY_TRANSCRIPTS).length;\n")
        for key in ("prayers", "teachings"):
            f.write(
                f"export const {key.upper()}_TRANSCRIPT_COUNT = "
                f"Object.values(LIBRARY_TRANSCRIPTS).filter((t) => t.collection === "
                f"{json.dumps(key)}).length;\n"
            )
    print(
        f"Wrote {len(entries)} transcripts "
        f"({len(by_collection.get('prayers', []))} prayers, "
        f"{len(by_collection.get('teachings', []))} teachings) -> {os.path.relpath(target, ROOT_DIR)}"
    )


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--collection", action="append", choices=list(COLLECTIONS), help="limit to one collection")
    ap.add_argument("--limit", type=int, default=0, help="max files to download per collection (0 = all)")
    ap.add_argument("--sleep", type=float, default=0.4, help="delay between downloads (default 0.4s)")
    ap.add_argument("--force", action="store_true", help="re-download files that already exist")
    ap.add_argument("--build-ts", action="store_true", help="only regenerate the app index")
    args = ap.parse_args()

    if args.build_ts:
        build_ts()
        return 0

    totals = {"ok": 0, "skip": 0, "fail": 0}
    for key in args.collection or list(COLLECTIONS):
        for stat, value in harvest(key, args.limit, args.sleep, args.force).items():
            totals[stat] += value

    print(f"\nTOTAL saved={totals['ok']} skipped={totals['skip']} failed={totals['fail']}")
    if totals["ok"]:
        print("Now run:  python3 scripts/harvest_drive.py --build-ts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
