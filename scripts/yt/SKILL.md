---
name: youtube-transcript-library
description: Harvest readable transcripts from YouTube playlists without the transcript API, survive IP blocks and bot walls, clean captions into paragraphs, and build a searchable reading library with an inverted index. Ships tested scripts (playlist.py, ytfetch.py, harvest.py). Use when asked to transcribe/scrape YouTube playlists, build a reading app or dataset from videos, or when a transcript fetch returns 429 / IpBlocked / "Sign in to confirm you're not a bot".
---

# YouTube → readable library

Proven on 861 transcripts (5.2M words) across 17 playlists. The scripts in `scripts/` are the
working implementation — read this file for the reasoning, run the scripts for the result.

**Start here:** `scripts/README.md` has the two-command quick start.

---

## 0. Diagnose before you debug

Most failures are one of five things. Identify which *before* changing code:

| Symptom | Cause | Fix |
|---|---|---|
| `Sign in to confirm you're not a bot` / `No title found in player responses` | **IP-level** bot wall on metadata | cookies, residential proxy, or run elsewhere |
| yt-dlp metadata OK, but zero caption tracks — or only `live_chat` | `subtitles` dict shadowing real tracks, **or** JS solver missing | see §2 and §3 |
| Metadata OK, tracks exist, `chars == 0` | wrong caption format parsed | srv1/vtt fallback (§3) |
| `HTTP 429` / `IpBlocked` on the caption URL only | rate limit on `timedtext` | fetch via reader proxy (§4) |
| Text reads *translated* but original was Spanish/etc. | `en` track is a machine translation (`tlang=en` in URL) | prefer `en-orig`; label translations (§3) |

Two rules that save hours:

1. **Metadata failures and caption failures are different problems.** If yt-dlp cannot read the
   video, no caption trick helps. Fix the IP first.
2. **Never trust `info["subtitles"] or info["automatic_captions"]`.** `subtitles` frequently
   contains `live_chat`, which is truthy and has no `en` key, so the `or` never fires and every
   video looks captionless. Search both dicts explicitly. (This cost me 13 of 22 videos.)

---

## 1. Enumerate the playlist first

```bash
python scripts/playlist.py "https://www.youtube.com/playlist?list=PLxxxx" -o manifest.json
```

- `--flat-playlist` uses a cheap listing endpoint: far more resistant to rate limits than
  per-video extraction. Get the inventory before fetching anything.
- Use a separator that cannot appear in a title (`\x1f`); titles contain `|` and will break
  naive `split("|")` — a real bug I hit on "…Destroying Your Future | Apostle Joshua Selman".
- Compare the count to what the user expects. Mismatch = wrong/deleted playlist → say so.
- **Deduplicate across playlists by video id.** 13 playlists → 793 entries → 474 unique videos
  is normal. Store `collections: [slug...]` on one record per video.

## 2. yt-dlp needs a JS runtime — and the solver flag

Modern yt-dlp requires a JS engine and, for many videos, a challenge solver:

```bash
# Deno, not Node (Node is ignored unless explicitly named)
--remote-components ejs:github
```

Without `--remote-components ejs:github`, a subset of videos returns metadata with **no caption
tracks at all** and a warning about skipped solver components. It looks exactly like "this video
has no captions". It is not.

## 3. Pick the right track

Order of preference, and why it matters:

1. **manual `en`** (`info["subtitles"]`) — human, punctuated, best.
2. **`en-orig`** (`info["automatic_captions"]`) — auto-captions of an English original.
3. **`en`** — auto-captions *or a translation*. Check the URL: if it contains `tlang=en`, the
   speaker was not speaking English and you are storing machine-translated prose. Either label
   it (`"translated": true`) or fetch the original language and translate deliberately.
4. Non-English original: pass `lang="es"` etc. Do not pretend it is English.

Formats: `json3` is convenient but **not universal** — fall back to `srv1` (XML) then `vtt`.

## 4. Fetch the caption URL through a reader proxy

`timedtext` is what gets rate-limited (HTTP 429 / `IpBlocked`) after ~100 videos, while metadata
keeps working. So: read the signed caption URL from metadata, then fetch *that URL* from a
different IP:

```python
raw = requests.get("https://r.jina.ai/" + caption_url, timeout=90).text
events = json.loads(raw[raw.index("{"):])["events"]
text = "".join("".join(s.get("utf8","") for s in e.get("segs",[]))
               for e in events if "segs" in e)
```

**This is not HTML scraping.** `timedtext` returns a JSON/XML caption document, so a reader proxy
returns that document intact. Claims that "reader proxies strip the `<script>` payload where
caption URLs live" describe a *different* approach (scraping the player page) — don't debug that
dead end; get the URL from yt-dlp instead.

Verify parity once: fetch a video you already have and diff. If identical, trust it for the rest.

## 5. Harvest resumably

```bash
python scripts/harvest.py manifest.json -o transcripts --workers 4
```

- One JSON per video → a crash costs one video.
- Existing ids are skipped → re-running resumes.
- 4 workers ≈ 8s/video; more gets throttled.
- Retry 3× with backoff, but do **not** retry `no-caption-track` / `too-short` — those are final.
- Report at the end: ok / no-caption-track / blocked / too-short, and name the misses.

## 6. Clean the captions

- Strip `[Music]`, `[Applause]`, `>>` speaker marks.
- Paragraphs: split on `(?<=[.!?])\s+`, regroup to ~420 chars.
- **De-loop:** long "all night"/"10 hours" uploads repeat one track. If paragraphs > 160, test
  offsets k=30…len/2; when ≥60% of paragraph heads repeat at k, cut. Turns a 3-hour file back
  into one prayer.
- **Cap repeats:** >25k-word transcripts keep at most 2 occurrences of any 90-char signature.
- **Channel boilerplate:** ministry archives wrap every video in the same sponsor read
  ("…another power-packed message from Dr. Myles Monroe, provided by Monroe Global…"). Filter
  *per sentence* against patterns (`provided by`, `moneglobal`-style domains, `we hope this
  message is a blessing`, `partner with us`, `for more products`). Otherwise every excerpt is the
  same ad.
- **Spelling drift in auto-captions:** Munroe/Monroe/Monro, Myles/Miles — match with character
  classes, never literals.
- Titles: strip emoji and `[...]`; for card display cut long titles at the last `–`/`|`/`:` so a
  two-line clamp never ends on "PRAYER &".

## 7. Don't ship one big corpus

At 850+ documents a single `corpus.json` is 20–30 MB and stalls the first search. Ship:

| File | Purpose | Size @861 |
|---|---|---|
| `index.json` | metadata, excerpt, topics | ~650 KB |
| `texts/<id>.json` | paragraphs, loaded per page | ~28 MB total |
| `search.json` | inverted index `{ids, terms:{word:[docIdx]}}` | ~1 MB |

Index the top ~320 terms per doc plus all title terms; stopword-filter; 3–24 chars. Rank by
matched terms + 4×title hit + 2×topic hit, prefix-expand queries ≥4 chars. Build snippets on
demand from the top ~8 `texts/<id>.json`. Warm query ≈17 ms.

## 8. QA loop that catches real bugs

- Headless route audit: assert `scrollWidth <= innerWidth` at 1440 and 390 px, capture console
  errors, check fonts.
- Interaction tests: reader paragraph count + drop cap, bookmark badge, theme persistence,
  deep-link filters, next-item navigation.
- Search test with a fixed query → expect ≥1 hit **and** a snippet.
- Screenshot + vision check on a *section*: ask a specific question ("are the cards balanced, is
  text clipped"), fix, re-shoot to a **new filename** (same-name screenshots come back stale).
- Perf: time keystroke → results. Over 600 ms means fix the index, not the timeout.

## 9. Never make CI do the harvesting

The most common dead end: a CI runner whose IP is bot-walled, spending a whole pipeline round
trip per iteration. **Separate acquisition from build.**

- Harvest on a machine where YouTube is reachable (or with cookies/residential proxy), commit the
  `transcripts/*.json` artifacts.
- CI only reads those files and builds the site. It never touches YouTube, so it never hits a bot
  wall, and every build is reproducible.

If you must harvest from a blocked runner, you need exactly one of: `--cookies cookies.txt`
(export from a logged-in browser), a residential proxy, or a hosted harvester.

## 10. Say these out loud to the user

- Which playlists were substituted/missing and why.
- Captions are machine-generated: errors exist; link every reader back to the source video.
- N playlist entries ≠ N transcripts (dedupe). Report both numbers.
- What was skipped (no English track, music-only, removed) and how many.
- If any text is a translation, say so.
