#!/usr/bin/env bash
# Assemble the GitHub Pages artifact.
#
# Layout produced:
#   <out>/                  → the production site (main branch build)
#   <out>/<name>/           → one preview build per open pull request
#
# GitHub's own PR-preview input on actions/deploy-pages is alpha-only and not
# publicly available, so previews are published as sibling directories of the
# same static site instead. The Vite config uses `base: './'`, which is what
# makes the nested copies work: assets and transcript fetches resolve relative
# to the page, not to the domain root.
#
# Usage:
#   scripts/build_pages_site.sh --out _site --root ./root/dist \
#       --extra pr-2:./pr-2/dist --extra pr-3:./pr-3/dist
set -euo pipefail

OUT=""
ROOT_DIST=""
EXTRAS=()
PRUNE=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --out)   OUT="$2"; shift 2 ;;
    --root)  ROOT_DIST="$2"; shift 2 ;;
    --extra) EXTRAS+=("$2"); shift 2 ;;
    # Drop a subdirectory from preview copies only. Transcript payloads are
    # ~30MB and identical between builds, so previews fall back to the root
    # copy via a relative fetch instead of duplicating them per PR.
    --prune) PRUNE+=("$2"); shift 2 ;;
    -h|--help) sed -n '2,22p' "$0"; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$OUT" || -z "$ROOT_DIST" ]]; then
  echo "error: --out and --root are both required" >&2
  exit 2
fi
if [[ ! -d "$ROOT_DIST" ]]; then
  echo "error: root build not found at $ROOT_DIST" >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT"
cp -a "$ROOT_DIST"/. "$OUT"/

# Stop Pages from running Jekyll over the output (it would drop _-prefixed files).
touch "$OUT/.nojekyll"

added=0
for entry in ${EXTRAS[@]+"${EXTRAS[@]}"}; do
  [[ -z "$entry" ]] && continue
  name="${entry%%:*}"
  dir="${entry#*:}"

  if [[ -z "$name" || -z "$dir" || "$name" == "$entry" ]]; then
    echo "warning: skipping malformed --extra '$entry' (expected name:dir)" >&2
    continue
  fi
  if [[ ! -d "$dir" ]]; then
    echo "warning: skipping preview '$name' — no build at $dir" >&2
    continue
  fi

  mkdir -p "$OUT/$name"
  cp -a "$dir"/. "$OUT/$name"/

  for prune in ${PRUNE[@]+"${PRUNE[@]}"}; do
    rm -rf "${OUT:?}/$name/$prune"
  done
  echo "preview  /$name  $(du -sh "$OUT/$name" | cut -f1)"
  added=$((added + 1))
done

echo "site root    $(du -sh "$OUT" | cut -f1)"
echo "previews     $added"
