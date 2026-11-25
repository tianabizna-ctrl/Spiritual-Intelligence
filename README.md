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

### Loading the remaining 368 transcripts

Two resumable scripts do the work, and both are safe to re-run:

```bash
# 1. Enumerate all 377 videos from the three playlists
python3 scripts/harvest_catalog.py
#    -> data/catalog/playlist_<ID>.json  (one file per playlist)

# 2. Download every English transcript (skips anything already fetched)
python3 scripts/harvest_transcripts.py --sleep 2
#    -> data/transcripts/<VIDEO_ID>.json (one file per video)

# 3. Regenerate the TypeScript module the app reads, then rebuild
python3 scripts/harvest_transcripts.py --build-ts
npm run build && python3 scripts/build_static_bundle.py
```

Useful flags: `--playlist <ID>` (one playlist), `--limit 20` (smoke test), `--only <VIDEO_ID>` (single video), `--sleep 3` (gentler pacing). Transcripts come from `youtube-transcript-api`, falling back to `yt-dlp` auto-captions. **These scripts need live internet access to youtube.com** — some locked-down CI sandboxes block it, in which case run them locally or on any normal machine.

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
