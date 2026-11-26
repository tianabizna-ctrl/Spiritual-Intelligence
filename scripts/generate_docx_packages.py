#!/usr/bin/env python3
"""
Builds the downloadable Microsoft Word (.docx) packages straight from the
harvested transcript corpus in public/transcripts/.

There are no hand-authored sessions any more: every document here is real
transcript text, and each package is named after the collection it contains so
the label can never over-claim.

    python3 scripts/generate_docx_packages.py            # all collections
    python3 scripts/generate_docx_packages.py prayers    # one collection
"""
from __future__ import annotations

import json
import os
import shutil
import sys
import zipfile

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, RGBColor

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRANSCRIPTS_DIR = os.path.join(ROOT_DIR, "public", "transcripts")
PUBLIC_DOWNLOADS = os.path.join(ROOT_DIR, "public", "downloads")
REPO_DOWNLOADS = os.path.join(ROOT_DIR, "downloads")

BRASS = RGBColor(0xB4, 0x83, 0x27)
DEEP_BRASS = RGBColor(0x7C, 0x2D, 0x12)
SLATE = RGBColor(0x33, 0x33, 0x33)

COLLECTION_TITLES = {
    "prayers": (
        "Prayer Library — Complete Transcripts",
        "Bibliothèque de Prières — Transcriptions Complètes",
    ),
    "teachings": (
        "Myles Munroe Teaching Library — Complete Transcripts",
        "Bibliothèque d'Enseignements Myles Munroe — Transcriptions Complètes",
    ),
    "christian-house": (
        "Christian House — Complete Transcripts",
        "Christian House — Transcriptions Complètes",
    ),
}


def group_key(data: dict) -> str:
    """
    The library slug a transcript belongs to.

    YouTube-ingested records are typed as the app collection ("teachings") but
    carry their real playlist slug in collectionSlug, so prefer that when set.
    """
    return data.get("collectionSlug") or data.get("collection") or ""


def load_collection(key: str) -> list[dict]:
    """Every transcript in a collection, ordered by title."""
    rows: list[dict] = []
    if not os.path.isdir(TRANSCRIPTS_DIR):
        return rows
    for name in sorted(os.listdir(TRANSCRIPTS_DIR)):
        if not name.endswith(".json"):
            continue
        try:
            with open(os.path.join(TRANSCRIPTS_DIR, name), "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            continue
        if group_key(data) != key:
            continue
        rows.append(data)
    rows.sort(key=lambda d: (d.get("title") or "").lower())
    return rows


def split_paragraphs(data: dict, width: int = 420) -> list[str]:
    """Use the stored paragraphs, or split the flat text blob on sentences."""
    paragraphs = data.get("paragraphs")
    if isinstance(paragraphs, list) and paragraphs:
        return paragraphs

    flat = " ".join((data.get("text") or "").split())
    if not flat:
        return []

    out: list[str] = []
    buf = ""
    for sentence in flat.split(". "):
        piece = sentence if not buf else ". " + sentence
        if buf and len(buf) + len(piece) > width:
            out.append(buf.strip())
            buf = sentence
        else:
            buf += piece
    if buf.strip():
        out.append(buf.strip())
    return out


def configure_styles(doc: Document) -> None:
    normal = doc.styles["Normal"]
    normal.font.name = "Georgia"
    normal.font.size = Pt(11)
    normal.font.color.rgb = SLATE


def add_cover(doc: Document, title: str, subtitle: str) -> None:
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("✦  SPIRITUAL INTELLIGENCE  ✦")
    run.bold = True
    run.font.size = Pt(13)
    run.font.color.rgb = BRASS
    run.font.name = "Georgia"

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(title)
    run.bold = True
    run.font.size = Pt(20)
    run.font.color.rgb = DEEP_BRASS
    run.font.name = "Georgia"

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(subtitle)
    run.italic = True
    run.font.size = Pt(10)
    run.font.color.rgb = SLATE
    run.font.name = "Georgia"


def add_transcript(doc: Document, data: dict, paragraphs: list[str]) -> None:
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    run = p.add_run(data.get("title") or data.get("id", "Untitled"))
    run.bold = True
    run.font.size = Pt(14)
    run.font.color.rgb = DEEP_BRASS
    run.font.name = "Georgia"

    meta = (
        f"{data.get('channel', '')}  •  {int(data.get('wordCount') or 0):,} words  •  "
        f"https://www.youtube.com/watch?v={data.get('id', '')}"
    )
    p = doc.add_paragraph()
    run = p.add_run(meta)
    run.italic = True
    run.font.size = Pt(8)
    run.font.color.rgb = BRASS
    run.font.name = "Georgia"

    for para in paragraphs:
        body = doc.add_paragraph()
        body.paragraph_format.space_after = Pt(6)
        run = body.add_run(para)
        run.font.size = Pt(10)
        run.font.name = "Georgia"


def build_collection(key: str) -> list[str]:
    rows = load_collection(key)
    if not rows:
        print(f"skip {key}: no transcripts")
        return []

    title_en, title_fr = COLLECTION_TITLES.get(
        key, (f"{key} Transcripts", f"{key} Transcriptions")
    )

    doc = Document()
    configure_styles(doc)
    total_words = sum(int(r.get("wordCount") or 0) for r in rows)
    add_cover(
        doc,
        title_en,
        f"{title_fr}\n{len(rows):,} transcripts  •  {total_words:,} words  •  "
        "harvested from the public source library",
    )

    for row in rows:
        paragraphs = split_paragraphs(row)
        if not paragraphs:
            continue
        add_transcript(doc, row, paragraphs)

    os.makedirs(PUBLIC_DOWNLOADS, exist_ok=True)
    slug = key.upper().replace("-", "_")
    filename = f"Spiritual_Intelligence_{slug}_Complete_Transcriptions.docx"
    path = os.path.join(PUBLIC_DOWNLOADS, filename)
    doc.save(path)

    size_mb = os.path.getsize(path) / (1024 * 1024)
    print(f"{filename}: {len(rows):,} transcripts, {total_words:,} words, {size_mb:.1f} MB")
    return [path]


def build_zip(paths: list[str]) -> list[str]:
    if not paths:
        return []
    zip_name = "Spiritual_Intelligence_DOCX_Transcriptions_Package.zip"
    zip_path = os.path.join(PUBLIC_DOWNLOADS, zip_name)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in paths:
            zf.write(path, arcname=os.path.basename(path))
    print(f"{zip_name}: {os.path.getsize(zip_path) / (1024 * 1024):.1f} MB")
    return [zip_path]


def discover_collections() -> list[str]:
    """Every collection key actually present in the corpus."""
    keys: set[str] = set()
    if os.path.isdir(TRANSCRIPTS_DIR):
        for name in os.listdir(TRANSCRIPTS_DIR):
            if not name.endswith(".json"):
                continue
            try:
                with open(os.path.join(TRANSCRIPTS_DIR, name), "r", encoding="utf-8") as f:
                    keys.add(group_key(json.load(f)))
            except Exception:
                continue
    ordered = [k for k in ("prayers", "teachings") if k in keys]
    return ordered + sorted(keys - set(ordered) - {""})


def main() -> int:
    keys = sys.argv[1:] or discover_collections()
    generated: list[str] = []
    for key in keys:
        generated.extend(build_collection(key))

    if len(keys) > 1:
        generated.extend(build_zip(generated))

    os.makedirs(REPO_DOWNLOADS, exist_ok=True)
    for path in generated:
        shutil.copy2(path, os.path.join(REPO_DOWNLOADS, os.path.basename(path)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
