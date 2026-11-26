# youtube-transcript-library (v3)

Harvest English transcripts from YouTube playlists — and know in five seconds whether the
machine you're on can do it at all.

```bash
pip install requests
brew install yt-dlp deno        # yt-dlp for metadata, deno for the JS challenge solver
```

## Quick start

```bash
python3 scripts/preflight.py                                   # gate: is harvesting possible here?
python3 scripts/harvest_all.py "<playlist url>" -o out --workers 4
python3 scripts/verify_transcripts.py out                      # VERDICT: OK
```

Each video becomes `out/<videoId>.json`:

```json
{ "id": "...", "status": "ok", "chars": 96187, "track": "auto:en-orig",
  "translated": false, "title": "...", "duration": 2314, "text": "..." }
```

Re-running is free: finished ids are skipped.

## No YouTube access? (sandboxes, CI runners behind a wall)

`preflight.py` exits 2 and says `NO-EGRESS`. That is a network fact, not a bug — stop.

Escape ladder, first rung that works:

1. **Relay** — preflight returned `RELAY:<name>`; harvest with `--transport "<relay template>"`.
2. **Handoff (default)** — harvest where YouTube is reachable, commit, and let the sandbox read files:

   ```bash
   # on a machine with YouTube access
   python3 scripts/harvest_all.py "<playlist url>" -o transcripts
   python3 scripts/verify_transcripts.py transcripts
   git add transcripts && git commit -m "data: transcripts" && git push

   # in the sandbox / CI
   git pull && python3 scripts/verify_transcripts.py transcripts
   ```

3. **Cookies locally** — `--cookies cookies.txt` when metadata reports a bot wall.
4. **Last resort: dispatch to CI with cookies** — only when 2 and 3 are impossible:

   ```bash
   gh secret set YT_COOKIES --repo <owner>/<repo> < cookies.txt   # one time
   gh workflow run harvest-youtube.yml && gh run watch
   ```

   `YT_COOKIES` is a live session credential: never commit `cookies.txt`, refresh it when it
   expires, revoke by signing out, prefer a throwaway account. If the run is still blocked,
   automation is exhausted — return to rung 2.

## Scripts

| Script | Purpose |
|---|---|
| `preflight.py` | 5 s verdict: DIRECT / RELAY / COOKIES / NO-EGRESS / BLOCKED, exit 2 when impossible |
| `playlist.py` | playlist or channel → `manifest.json` (cheap, rate-limit resistant) |
| `ytfetch.py` | one video → text; transports, cookies, `en-orig` preference, srv1/vtt fallbacks |
| `harvest.py` | resumable parallel harvest, `_summary.json`, exits 2 on network-wide failure |
| `harvest_all.py` | preflight → enumerate → harvest → verify, one command |
| `verify_transcripts.py` | offline schema/content check for committed transcripts (CI-safe) |

## Limits

- Videos with captions or auto-captions, in any language, work. Music-only and silent clips
  have none — they will fail, correctly.
- Removed / private / members-only / region-locked videos cannot be fetched.
- A non-English original yields `en` only as a machine translation; the record is flagged
  `translated: true`. Use `--lang <code>` for the original.
- Relays are third parties and rate-limit; `direct` or cookies are more durable.
- Respect YouTube's terms and creators' rights; link every reader back to the source video.
