# ✦ Spiritual Intelligence — Faharanitan-tsaina Ara-panahy (EN / FR / MG)

A trilingual (**English, French & Malagasy**) web application and devotional sanctuary featuring complete video transcriptions for all **9 sessions**, prophetic declarations, interactive prayer watches, a trilingual Scripture concordance, and downloadable **Microsoft Word (`.docx`)** transcription packages in `EN`, `FR` and `MG`.

---

## 📱 Reading-First Mobile Layout

The UI is reorganised so that **prayers and transcriptions are always reachable above the fold on a phone**:

- The app opens directly on the **Read Prayers** tab — no large hero banner, no video card grid to scroll past.
- A single **ultra-compact sticky header** carries the brand, one-tap `🇬🇧 EN` / `🇫🇷 FR` / `🇲🇬 MG` language pills, the theme switch, and a slim scrollable tab bar.
- The transcription reader uses a compact session `<select>`, horizontal quick-switch pills, and a **collapsible 9-video drawer**; the full video-card directory lives at the bottom of the page instead of above the reading pane.
- Mobile chapter navigation is a horizontal chip strip, and each session ends with a "next session" jump so reading flows continuously.

---

## 🎯 The Real Scope: 377 Videos, Not 9

The three source playlists are much larger than the first set of sessions:

| Playlist | Channel | Videos |
|---|---|---|
| `PLaptSPguGlRafSbwyTRdhKBc9axh9znP7` | Prayer By Grace | **194** |
| `PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz` | Grace Enclave | **141** |
| `PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs` | OVERCOMING DAILY | **42** |
| **Total** | | **377** |

**Current state, stated plainly:** the app ships **9 fully structured sessions** (all three languages, chapters, prayers, devotionals, DOCX). Those 9 are the *first* set — they are **not** the whole library. The **Full Library** tab tracks the real target of 377 and lists every harvested transcript.

### Two things prevent an automated harvest, both verified

I ran the full harvest from this sandbox and from a GitHub Actions runner on the repo. Results, not guesses:

| Check | Result |
|---|---|
| YouTube reachable from the agent sandbox | **No** — `TLS/SSL connection has been closed`. Only GitHub, npm and PyPI are allowed. |
| GitHub Actions on this repo | **Enabled and working** (probe runs completed, runners reached youtube.com with HTTP 200) |
| Playlist 1 enumeration from the runner | **194 / 194 videos** ✅ |
| Playlist 2 enumeration from the runner | **141 / 141 videos** ✅ |
| Playlist 3 (`PL-7eNL...`) | **"The playlist does not exist"** — deleted by YouTube, so its 42 videos must be harvested individually |
| Transcript fetch, 6 videos × 7 strategies (`youtube-transcript-api` + yt-dlp via `web`, `android`, `ios`, `tv`, `mweb`, `web_safari`) | **0 of 42 succeeded** |

Every transcript attempt returns the same message from Google:

```
Sign in to confirm you're not a bot. Use --cookies-from-browser or --cookies for the authentication.
```

That is YouTube refusing datacenter IP addresses. No amount of retrying or client juggling fixes it — **it needs authenticated cookies from a real browser session.**

### Unblocking it: export cookies, add a secret, run the workflow

**1. Export a `cookies.txt`** (one minute, on your own computer):

- Install the *Get cookies.txt LOCALLY* extension (Chrome/Firefox/Edge) — or any Netscape-format cookie exporter.
- Open `youtube.com`, make sure you are signed in.
- Export cookies for `youtube.com` and save the file as `cookies.txt`.

**2. Add it as a repository secret:**

GitHub → repo → **Settings → Secrets and variables → Actions → New repository secret**

- Name: `YT_COOKIES`
- Value: paste the entire contents of `cookies.txt`

Optionally add `PROXY_URL` (e.g. `socks5://user:pass@host:port`) if you have a residential proxy; the scripts pass it through automatically.

> ⚠️ Use a throwaway/secondary Google account for this. YouTube can permanently ban an account whose cookies are used for automated requests.

**3. Run the harvest:**

The workflow fails fast: if the first 12 transcript attempts all fail with 0 successes it aborts in seconds with an `::error::` annotation telling you the cookies are missing, instead of grinding through 377 impossible requests.



GitHub → **Actions → harvest-library → Run workflow**

Leave the inputs at their defaults (`limit 0` = all, `sleep 2`). The job:

1. enumerates the three playlists,
2. downloads every missing English transcript into `data/transcripts/<id>.json` (resumable — re-running only fetches what is still missing),
3. writes `public/transcripts/<id>.json` plus the `src/data/libraryTranscripts.ts` index,
4. commits everything back to the branch.

Then rebuild the site:

```bash
npm run build && python3 scripts/build_static_bundle.py
```

### The same thing locally

```bash
python3 scripts/harvest_catalog.py --cookies cookies.txt
python3 scripts/harvest_transcripts.py --sleep 2 --cookies cookies.txt
python3 scripts/harvest_transcripts.py --build-ts   # regenerate the index
```

Flags: `--playlist <ID>`, `--only <VIDEO_ID>`, `--limit 20` (smoke test), `--sleep 3` (gentler), `--proxy <url>`.

### Bundle size

Full texts are **not** inlined into the JavaScript. Each transcript is written to `public/transcripts/<id>.json` and fetched only when a reader taps *Read full transcript*; the bundle carries just an id/title/excerpt index. 377 transcripts at ~10k words would otherwise add ~40 MB to the JS.

---

## 📺 Source Videos & Transcriptions (English • Français • Malagasy)

1. **Video 1 (`4YElIs15_Ak` — 1:24:44)**
   - **Title (EN):** *[POWERFUL 🔥] COMMAND YOUR DAY IN TOTAL VICTORY BY DECLARING THESE POWERFUL PRAYER | JOSHUA SELMAN*
   - **Titre (FR) :** *[PUISSANT 🔥] COMMANDEZ VOTRE JOURNÉE DANS UNE VICTOIRE TOTALE EN DÉCLARANT CES PUISSANTES PRIÈRES | JOSHUA SELMAN*
   - **URL:** [https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7](https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7)
   - **Channel:** Prayer By Grace (`@PrayerByGrace`) • Apostle Joshua Selman

2. **Video 2 (`XWBUBtEv70A` — 09:02)**
   - **Title (EN):** *Call on the Name of Jesus and Watch God Work Today | Morning Prayer*
   - **Titre (FR) :** *Invoquez le Nom de Jésus et Regardez Dieu Agir Aujourd'hui | Prière du Matin*
   - **URL:** [https://www.youtube.com/watch?v=XWBUBtEv70A&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=2](https://www.youtube.com/watch?v=XWBUBtEv70A&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=2)
   - **Channel:** Grace Enclave (`@graceenclave`)

3. **Video 3 (`45wUm7wffBQ` — 29:12)**
   - **Title (EN):** *6:45 AM #prayer 10 POWERFUL MORNING DECLARATIONS WITH APOSTLE JOSHUA SELMAN*
   - **Titre (FR) :** *6h45 #prière 10 PUISSANTES DÉCLARATIONS MATINALES AVEC L'APÔTRE JOSHUA SELMAN*
   - **URL:** [https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs](https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs)
   - **Channel:** OVERCOMING DAILY (`@therealovercomingdaily`) • Apostle Joshua Selman

---

## 📦 Downloadable `.DOCX` Transcription Packages

All pre-built Microsoft Word (`.docx`) transcription documents are available in [`/downloads`](./downloads) and served directly in the web application under `/downloads/`:

- **`Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx`** — Complete Trilingual Master Package (all 9 videos in English, French & Malagasy, devotional overviews, and Scripture references)
- **`Spiritual_Intelligence_Transcriptions_EN.docx`** — Complete English Edition (all 9 videos in English)
- **`Spiritual_Intelligence_Transcriptions_FR.docx`** — Complete French Edition (all 9 videos in French)
- **`Spiritual_Intelligence_Transcriptions_MG.docx`** — Complete Malagasy Edition (all 9 videos in Malagasy)
- **`Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx`** — Video 1 Bilingual Edition (`1:24:44`)
- **`Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx`** — Video 2 Bilingual Edition (`09:02`)
- **`Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx`** — Video 3 Bilingual Edition (`29:12`)
- **`Spiritual_Intelligence_DOCX_Transcriptions_Package.zip`** — Complete `.zip` archive containing all 7 `.docx` manuals

Plain-text raw English, French & Malagasy transcripts are also stored in [`/data/raw_transcripts`](./data/raw_transcripts).

---

## ✨ Key Features of the Web Application

- **Full Library tab**: shows the 377-video target, the per-playlist breakdown, harvest progress, and a searchable list of every downloaded transcript.
- **Trilingual Transcription Sanctuary (`EN` / `FR` / `MG`, parallel or single language):
  - Read structured chapters with Scripture pills and prophetic decrees alongside the **100% unabridged verbatim transcripts** in English, French and Malagasy.
  - Adjustable typography scale (`A-` to `A++`), instant trilingual search, one-click copy, bookmarking, and an embedded YouTube player to listen/watch along.
- **Interactive Prayers & Prophetic Declarations Altar**:
  - Categorized prayer points across every watch (*Command the Morning*, *Morning Surrender*, *6:45 AM Declarations*, *Finances & Helpers*, *Family & Marriage*, *Divine Healing*, *Wall of Fire*, *Midnight Warfare*).
  - Built-in **Prayer Watch Timer**, **Guided Focus Altar Mode**, and interactive **"I Declare / Amen"** counter.
- **Devotional Study Guides & Trilingual Scripture Treasury**:
  - Three in-depth devotional meditations in English, French and Malagasy, reflection questions, a searchable **KJV / Louis Segond 1910 / Malagasy Scripture Concordance**, and a persistent **Personal Prayer & Prophetic Idea Journal**.
- **DOCX Download Center & Custom `.DOCX` Builder**:
  - Instant download of all 7 pre-built `.docx` files and the `.zip` bundle, plus a client-side custom `.docx` generator.
- **Dawn Parchment & Midnight Watch Themes**:
  - Switch effortlessly between Warm Parchment Light Mode and Midnight Watch Dark Mode.

---

## 🛠️ Rebuild Scripts

```bash
npm run generate:docx                       # regenerate all 7 .docx files + .zip bundle
npm run build                               # TypeScript check + Vite production build to dist/
python3 scripts/build_static_bundle.py      # refresh docs/ (GitHub Pages) and the standalone preview HTML
```

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Start live development server
npm run dev

# Regenerate .docx & .zip packages from raw transcripts
npm run generate:docx

# Build for production
npm run build
```
