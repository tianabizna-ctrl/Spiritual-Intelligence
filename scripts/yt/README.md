# youtube-transcript-library

Harvest transcripts from YouTube playlists without `youtube-transcript-api`, then build a
searchable reading library. Tested end to end (861 transcripts, 17 playlists).

## Install

```bash
pip install requests
brew install yt-dlp deno          # yt-dlp for metadata, deno for the JS challenge solver
```

## Two commands

```bash
# 1. inventory the playlist (cheap, survives rate limits)
python scripts/playlist.py "https://www.youtube.com/playlist?list=PLxxxx" -o manifest.json

# 2. fetch every transcript, resumable, 4 workers
python scripts/harvest.py manifest.json -o transcripts --workers 4
```

Each video becomes `transcripts/<videoId>.json`:

```json
{ "id": "...", "status": "ok", "chars": 96187, "track": "auto:en-orig",
  "translated": false, "title": "...", "text": "full transcript ..." }
```

Re-running is free — finished ids are skipped. Failures are reported at the end, grouped by
`status`.

## If it fails

| What you see | What to do |
|---|---|
| `Sign in to confirm you're not a bot`, `No title found` | IP wall. `--cookies cookies.txt` (export from a logged-in browser), or a residential proxy |
| `no-caption-track` on everything, or only `live_chat` | update the scripts — the `subtitles`/`auto` fallback and `--remote-components ejs:github` live there |
| `caption-fetch-fail` with 429 | the reader proxy is rate-limited: lower `--workers`, wait, or pass `--direct` on a clean IP |
| Text is a translation, not the original language | `--lang es` / etc.; check `translated` in the output |
| Nothing works in CI | harvest locally, commit `transcripts/*.json`, let CI build from files only |

## Single video

```bash
python scripts/ytfetch.py VIDEO_ID            # via reader proxy
python scripts/ytfetch.py VIDEO_ID --direct   # your IP is clean
python scripts/ytfetch.py VIDEO_ID --cookies cookies.txt
```

```python
from ytfetch import fetch
r = fetch("VIDEO_ID")
if r["status"] == "ok":
    print(r["text"][:400])
```

## What's inside

- `SKILL.md` — the full playbook: diagnosis table, proxy mechanics, cleaning rules, index format, QA loop, and the CI anti-pattern.
- `scripts/playlist.py` — manifest from playlist/channel URL.
- `scripts/ytfetch.py` — one video → text (proxy, cookies, format fallbacks, `en-orig` preference, translation flagging).
- `scripts/harvest.py` — resumable parallel fetch over a manifest.

## Limits

- Public videos with captions in some language, or with auto-captions, work. Music-only and
  silent clips have none — they will always fail, correctly.
- Removed / private / members-only / region-locked videos cannot be fetched.
- The reader proxy is a third party: if it changes or rate-limits, use `--direct`, cookies, or
  another proxy.
- Respect YouTube's terms and the creators' rights. This is for personal study and archiving, and
  every reader should link back to the source video.
