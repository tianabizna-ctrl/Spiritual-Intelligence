---
name: youtube-transcript-library
description: Harvest English transcripts from YouTube playlists and check them before a build. Ships preflight (5-second environment verdict), ytfetch (direct/relay/cookies, en-orig preference, format fallbacks), harvest (resumable, parallel), verify_transcripts (offline validation). Use when asked to transcribe/scrape YouTube, build a reading library or dataset from videos, or when a fetch returns 429, IpBlocked, "Sign in to confirm you're not a bot", or the host has no YouTube access.
---

# YouTube → transcript library

Built and verified on 861 transcripts / 5.2M words across 17 playlists, including the case
that matters most: **a sandbox that cannot reach YouTube at all**.

## §0 Do this first — the 5-second gate

```bash
python3 scripts/preflight.py
```

It prints one verdict and exits **2** when harvesting is impossible here:

| Verdict | Meaning | Action |
|---|---|---|
| `DIRECT` | YouTube metadata OK | harvest normally |
| `RELAY:<name>` | direct blocked, this relay reaches YouTube | `--transport "<relay template>"` |
| `COOKIES` | bot-walled IP | `--cookies cookies.txt` |
| `NO-EGRESS` | **no route to YouTube from this host** | stop; use §Arena |
| `BLOCKED` | metadata walled, relays failed | cookies, or move the harvest |

Never start a harvest on a `NO-EGRESS` host. Twenty-two retries cannot fix a network that
drops the packet, and each attempt costs minutes.

## §Arena — sandboxes with no YouTube egress

Measured in an E2B sandbox tied to a GitHub repo:

```
curl -sI https://www.youtube.com   → 000
curl -sI https://r.jina.ai          → 000
curl -sI https://api.github.com     → 200
```

Only the allowlisted hosts answer. This is not a bot wall, a cookie problem, a `yt-dlp` flag,
a proxy problem, or a parsing bug. **No script in this skill can fetch YouTube from there**,
and no amount of retrying changes it.

### Escape ladder — use the first rung that works, top to bottom

| # | Rung | When | Cost |
|---|---|---|---|
| 1 | **Relay** — `--transport "<relay template>"` | preflight says `RELAY:<name>` | free, automatic |
| 2 | **Handoff** — harvest elsewhere, commit the JSON | always available if anyone can run it | one commit, deterministic |
| 3 | **Cookies locally** — `--cookies cookies.txt` | metadata returns `COOKIES` (bot wall) | needs a browser login, expires |
| 4 | **Dispatch to CI with cookies** — last resort | nobody can run rung 2 or 3 | one secret, shared IPs, opaque |

**Rung 2 — handoff (default).** Harvest on any machine with YouTube access, commit the JSON,
let the sandbox only read files:

```bash
# on the machine that has egress
python3 scripts/preflight.py                       # expect DIRECT or RELAY
python3 scripts/harvest_all.py "<playlist url>" -o transcripts --workers 4
python3 scripts/verify_transcripts.py transcripts  # expect VERDICT: OK
git add transcripts && git commit -m "data: transcripts" && git push
```

```bash
# in the sandbox
git pull
python3 scripts/verify_transcripts.py data/transcripts
npm run build            # or your app's build
```

Acquisition and build are separate steps, so CI is reproducible and never depends on an IP.

**Rung 4 — dispatch to CI, only as a last resort.** Use this only when neither a local harvest
nor a committed handoff is possible. The sandbox reaches GitHub, so it can start a workflow —
but the runner's IP may still be bot-walled, and a machine-generated harvest is harder to
inspect than files you can read before committing.

```bash
# one time: store the cookies as a secret. Never write them to a tracked file.
gh secret set YT_COOKIES --repo <owner>/<repo> < cookies.txt

gh workflow run harvest-youtube.yml --repo <owner>/<repo>
gh run watch --repo <owner>/<repo>
```

Cookie hygiene, because `YT_COOKIES` is a live session credential:

- Export from a browser you are willing to sign out of; they expire within days and must be
  refreshed when the run starts reporting `COOKIES` again.
- Never `echo` the secret, never commit `cookies.txt` (add it to `.gitignore`), and revoke by
  signing out of that browser session.
- Prefer a throwaway account over your primary one.
- If the dispatched run is still blocked, automation is exhausted — go back to rung 2. Do not
  keep dispatching.

**Never** re-run the harvest inside the sandbox to "see if it works now". Check with
`python3 scripts/preflight.py`; if it says `NO-EGRESS`, report that and move down the ladder.

## §1 Enumerate the playlist

```bash
python3 scripts/playlist.py "<playlist url>" -o manifest.json
```

- `--flat-playlist` uses a cheap listing endpoint, far more rate-limit resistant than
  per-video extraction. Get the inventory before fetching anything.
- Separator is `\x1f`: titles contain `|` and break naive `split("|")`.
- Compare the count with what the user expects. A mismatch means a wrong, deleted, or
  private playlist — say so instead of harvesting the wrong thing.
- **Deduplicate across playlists by video id.** 13 playlists → 793 entries → 474 unique
  videos is normal. One record per video, `collections: [slug...]` on it.

## §2 Harvest

```bash
python3 scripts/harvest_all.py "<playlist url>" -o out --workers 4        # one command
python3 scripts/harvest.py out/manifest.json -o out --transport "https://r.jina.ai/{url}"
python3 scripts/ytfetch.py VIDEO_ID --cookies cookies.txt                 # one video
```

- One JSON per video → a crash costs one video.
- Existing ids are skipped → re-running resumes.
- `no-caption-track`, `too-short`, `no-egress` are terminal and not retried.
- 4 workers ≈ 8 s/video. More gets throttled.
- `harvest.py` writes `_summary.json` and exits 2 when nothing could be fetched for
  network reasons, so a pipeline can gate on it instead of scraping stdout.

Transports: `direct` (your IP), `https://r.jina.ai/{url}` (reader proxy — it fetches the
**signed `timedtext` JSON endpoint**, not an HTML page, so "reader proxies strip the script
payload" does not apply), or `{q}` templates for CORS proxies.

## §3 Pick the right caption track

1. manual `en` → best.
2. `en-orig` auto → English original.
3. plain `en` → may be a **machine translation**; its URL contains `tlang=en`. Flag it
   (`translated: true`) or fetch the original language instead of pretending.
4. `json3` is not universal → fall back to `srv1`, then `vtt`.

Two traps that make every video look captionless:

- `info["subtitles"]` often holds only `live_chat`, which is truthy — so
  `subtitles or automatic_captions` never falls through. Search both maps explicitly.
- yt-dlp needs `--remote-components ejs:github` (plus Deno installed) or some videos come back
  with no caption tracks at all.

## §4 Make the text readable

- Strip `[Music]`, `[Applause]`, `>>` speaker marks.
- **Paragraphs:** split on sentence ends, regroup to ~420 chars. Unpunctuated auto-captions
  have no sentence ends — chunk by words to the same target, or a 28k-word sermon becomes a
  single block in the reader. (This is the bug that shipped in v2.)
- **De-loop** long "all night"/"10 hours" uploads: if paragraphs > 160, test offsets
  k=30…len/2; cut when ≥60% of paragraph heads repeat.
- **Cap repeats:** keep at most 2 occurrences of any 90-char signature in >25k-word files.
- **Channel boilerplate** ("provided by…", "we hope this message is a blessing", partner
  appeals) repeats in every upload from a ministry archive — filter per sentence, or every
  excerpt is the same ad.
- Auto-caption spelling drift: Munroe/Monroe/Monro, Myles/Miles — match with character
  classes, never literals.

## §5 Verify before a build consumes it

```bash
python3 scripts/verify_transcripts.py data/transcripts --schema app   # no network needed
```

Checks id/filename agreement, >300 chars of text, duplicate ids, `paragraphs[]` for app
schemas, and flags 12k+ word single-paragraph files and machine-translated text. Exit 1 on
problems — wire it into CI before the build step.

## §6 Report honestly

- Which playlists were substituted, missing, or private, and why.
- Playlist entries ≠ transcripts (dedupe): report both numbers.
- What was skipped (no English track, music-only, removed) and the count.
- If any text is translated, say so.
- If the host could not reach YouTube, say that plainly and name the handoff — do not leave
  the user thinking a fix is one flag away.
