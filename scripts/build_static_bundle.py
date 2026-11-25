#!/usr/bin/env python3
"""
Builds two deployable artefacts from the Vite production build (dist/):

1. docs/  — static site with base './' for GitHub Pages / GitHack hosting.
2. Spiritual_Intelligence_Webapp_Preview.html — a single self-contained HTML
   file with inlined CSS, inlined JS and every .docx / .zip download embedded
   as a base64 data URL, so it works offline by double-clicking it.

Usage:  npm run build && python3 scripts/build_static_bundle.py
"""
import base64
import mimetypes
import os
import re
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(ROOT_DIR, "dist")
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
PREVIEW_FILE = os.path.join(ROOT_DIR, "Spiritual_Intelligence_Webapp_Preview.html")

DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"


def clean_dir(path: str):
    if os.path.isdir(path):
        shutil.rmtree(path)
    os.makedirs(path, exist_ok=True)


def copy_docs():
    """Copy dist/ -> docs/ (relative asset paths, .nojekyll marker)."""
    clean_dir(DOCS_DIR)
    for entry in os.listdir(DIST_DIR):
        src = os.path.join(DIST_DIR, entry)
        dst = os.path.join(DOCS_DIR, entry)
        if os.path.isdir(src):
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)
    open(os.path.join(DOCS_DIR, ".nojekyll"), "w").close()
    print(f"docs/ rebuilt ({len(os.listdir(DOCS_DIR))} entries)")


def data_url(path: str) -> str:
    ext = os.path.splitext(path)[1].lower()
    mime = DOCX_MIME if ext == ".docx" else "application/zip"
    with open(path, "rb") as f:
        payload = base64.b64encode(f.read()).decode("ascii")
    return f"data:{mime};base64,{payload}"


def build_preview():
    """Inline CSS/JS and embed downloads as data URLs."""
    html_path = os.path.join(DIST_DIR, "index.html")
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Inline stylesheets
    def inline_css(match: "re.Match") -> str:
        href = match.group(1).lstrip("./")
        css_path = os.path.join(DIST_DIR, href)
        if not os.path.isfile(css_path):
            return match.group(0)
        with open(css_path, "r", encoding="utf-8") as f:
            css = f.read()
        return f"<style>\n{css}\n</style>"

    html = re.sub(
        r'<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>', inline_css, html
    )

    # Inline module script
    def inline_js(match: "re.Match") -> str:
        src = match.group(1).lstrip("./")
        js_path = os.path.join(DIST_DIR, src)
        if not os.path.isfile(js_path):
            return match.group(0)
        with open(js_path, "r", encoding="utf-8") as f:
            js = f.read()
        js = js.replace("</script>", "<\\/script>")
        return f'<script type="module">\n{js}\n</script>'

    html = re.sub(
        r'<script type="module"[^>]*src="([^"]+)"[^>]*>\s*</script>', inline_js, html
    )

    # Embed every download as a base64 data URL so file:// usage works offline
    downloads_dir = os.path.join(DIST_DIR, "downloads")
    for name in sorted(os.listdir(downloads_dir)):
        path = os.path.join(downloads_dir, name)
        if not os.path.isfile(path):
            continue
        url = data_url(path)
        html = html.replace(f"downloads/{name}", url)

    title = (
        "Spiritual Intelligence — Trilingual Prayers, Devotionals & Transcriptions "
        "(English • Français • Malagasy)"
    )
    html = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", html, flags=re.S)
    html = re.sub(
        r'<meta name="description" content="[^"]*"\s*/?>',
        '<meta name="description" content="A trilingual (EN / FR / MG) sanctuary of '
        'prayers, prophetic declarations, devotionals, and complete video transcriptions." />',
        html,
    )

    with open(PREVIEW_FILE, "w", encoding="utf-8") as f:
        f.write(html)
    size_mb = os.path.getsize(PREVIEW_FILE) / (1024 * 1024)
    print(f"{os.path.basename(PREVIEW_FILE)} rebuilt ({size_mb:.2f} MB)")


if __name__ == "__main__":
    copy_docs()
    build_preview()
