#!/usr/bin/env bash
# Harvest a YouTube playlist end-to-end on a machine that can reach YouTube.
#
#   ./scripts/harvest_playlist.sh <playlist-url> <collection-slug> [extra args]
#
#   ./scripts/harvest_playlist.sh "https://www.youtube.com/playlist?list=PL92Wc..." christian-house
#   ./scripts/harvest_playlist.sh "https://www.youtube.com/playlist?list=PLxxxx" my-collection --refresh
#
# What it does, in order:
#   1. resolves the playlist into a manifest (scripts/yt/playlist.py)
#   2. downloads every caption track it can (scripts/yt/harvest.py)
#   3. imports the raw JSON into data/transcripts/<collection>/ (import_transcripts.py)
#   4. rebuilds the TypeScript library index (harvest_drive.py --build-ts)
#
# Why this exists: the agent sandbox and the harvest CI runner both lack YouTube
# egress, so harvesting has to run where YouTube is reachable. This script means
# that is one command instead of four, with the same result either way.
#
# --refresh re-resolves the playlist and re-downloads every transcript from
# scratch. Without it the run resumes: existing per-video JSON is skipped, so a
# crash costs one video rather than the whole job.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ $# -lt 2 ]; then
  sed -n '2,18p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit 1
fi

URL="$1"; COLLECTION="$2"; shift 2

REFRESH=0
PASSTHROUGH=()
for arg in "$@"; do
  case "$arg" in
    --refresh) REFRESH=1 ;;
    *) PASSTHROUGH+=("$arg") ;;
  esac
done

WORK_DIR="${HARVEST_WORK_DIR:-.harvest}"
mkdir -p "$WORK_DIR"

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
fail() { printf '\033[1;31mERROR:\033[0m %s\n' "$*" >&2; exit 1; }

command -v python3 >/dev/null 2>&1 || fail "python3 not found"
command -v yt-dlp  >/dev/null 2>&1 || fail "yt-dlp not found — run: python3 -m pip install -r scripts/requirements-harvest.txt"

say "Playlist  $URL"
say "Collection $COLLECTION"
say "Work dir   $WORK_DIR"

# 1. playlist -> manifest
MANIFEST="$WORK_DIR/manifest-$COLLECTION.json"
if [ "$REFRESH" = "1" ] || [ ! -s "$MANIFEST" ]; then
  python3 scripts/yt/playlist.py "$URL" -o "$MANIFEST"
else
  echo "reusing $MANIFEST (pass --refresh to re-resolve)"
fi

# playlist.py writes a top-level JSON array: [{"id","title","duration","url","order"}]
COUNT=$(python3 -c "import json; d=json.load(open('$MANIFEST')); print(len(d if isinstance(d,list) else d.get('videos') or d.get('items') or []))")
[ "$COUNT" -gt 0 ] || fail "playlist resolved to 0 videos — check the URL is public"
say "Playlist lists $COUNT videos"

# 2. captions
# harvest.py skips ids whose JSON already exists, so re-runs resume for free.
# --refresh clears the previous raw output for a clean re-download.
RAW_DIR="$WORK_DIR/raw-$COLLECTION"
if [ "$REFRESH" = "1" ] && [ -d "$RAW_DIR" ]; then
  echo "clearing $RAW_DIR for a clean re-harvest"
  rm -rf "$RAW_DIR"
fi
HARVEST_ARGS=( "$MANIFEST" -o "$RAW_DIR" )
python3 scripts/yt/harvest.py "${HARVEST_ARGS[@]}" "${PASSTHROUGH[@]+"${PASSTHROUGH[@]}"}"

# 3. honest tally of what the harvest actually produced
python3 - "$RAW_DIR" "$COUNT" <<'PY'
import json, os, sys
raw, expected = sys.argv[1], int(sys.argv[2])
ok = blocked = missing = 0
for name in os.listdir(raw) if os.path.isdir(raw) else []:
    if not name.endswith(".json"):
        continue
    try:
        rec = json.load(open(os.path.join(raw, name)))
    except Exception:
        missing += 1
        continue
    status = rec.get("status") or ("ok" if rec.get("text") else "missing")
    if status == "ok" and rec.get("text"):
        ok += 1
    elif status == "blocked":
        blocked += 1
    else:
        missing += 1
print(f"\nharvest result: ok {ok} / blocked {blocked} / missing {missing} / playlist {expected}")
if blocked:
    print("blocked items hit YouTube's bot wall. Retry with --cookies <cookies.txt>")
if ok == 0:
    sys.exit("nothing usable was harvested - not importing")
PY

# 4. import into the repo
say "Importing into data/transcripts/$COLLECTION/"
python3 scripts/import_transcripts.py --src "$RAW_DIR" --collection "$COLLECTION" --manifest "$MANIFEST"

# 5. rebuild the index the app reads
say "Rebuilding library index"
python3 scripts/harvest_drive.py --build-ts

cat <<'EOF'

Done. Next:
  npm run build && npm run smoke:ui     # verify
  git add -A && git commit -m "feat(transcripts): add <collection>"
  git push
EOF
