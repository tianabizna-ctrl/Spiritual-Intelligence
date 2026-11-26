# ✦ Spiritual Intelligence — Faharanitan-tsaina Ara-panahy (EN / FR / MG)

A trilingual (**English, French & Malagasy**) web application and devotional sanctuary built on a harvested transcript library — **844 real transcripts** (377 prayers, 464 Dr. Myles Munroe teachings, 3 Christian House) — with prophetic declarations, interactive prayer watches, a trilingual Scripture concordance, a Collections index, and downloadable **Microsoft Word (`.docx`)** packages generated from that corpus.

There are no hand-authored session structures: every reading surface shows harvested transcript text, and every count in the UI is derived from the data.

---

## 📱 Reading-First Mobile Layout

The UI is reorganised so that **prayers and transcriptions are always reachable above the fold on a phone**:

- The app opens directly on the **Read Prayers** tab — no large hero banner, no video card grid to scroll past.
- A single **ultra-compact sticky header** carries the brand, one-tap `🇬🇧 EN` / `🇫🇷 FR` / `🇲🇬 MG` language pills, the theme switch, and a slim scrollable tab bar.
- The transcription reader uses a compact session `<select>`, horizontal quick-switch pills, and a **collapsible 9-video drawer**; the full video-card directory lives at the bottom of the page instead of above the reading pane.
- Mobile chapter navigation is a horizontal chip strip, and each session ends with a "next session" jump so reading flows continuously.

---

## 🎯 The Real Scope — 377 Prayers + 464 Myles Munroe Teachings

The library is no longer a target. **It is downloaded.**

### Prayer library — 377 of 377 complete ✅

| Playlist | Channel | Transcripts |
|---|---|---|
| `PLaptSPguGlRafSbwyTRdhKBc9axh9znP7` | Prayer by Grace | **194** |
| `PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz` | Grace Enclave | **141** |
| `PLFyTbdmIZAj4c9I6CJNvV2XHon1SUypTh` | Overcoming Daily | **42** |
| **Total** | | **377** |

Every one of the 377 has a real, non-empty English transcript. `PL-7eNLW...`
was deleted by YouTube, so those 42 came from a live sibling playlist on the
same channel. The playlist ID in `src/data/libraryCatalog.ts` reflects where
the transcripts actually came from.

### Dr. Myles Munroe — 464 of 474

| | |
|---|---|
| Teachings listed in the Drive manifest | 474 |
| Teachings with a transcript file | **464** |
| Missing from Drive | 10 (listed in the manifest, JSON absent) |

Topics: kingdom (139), animated-teachings (101), munroe-global-media (85),
leadership (60), short-messages (48), crisis-management (38), men-fatherhood
(21), marriage-relationship (17), purpose (16), success (15), prayer-fasting
(12), general-teachings (6).

That is **841 real transcripts, ~5.4 million words**. No placeholder text
anywhere — every file was fetched and validated.

### How it works (no cookies, no secrets, no YouTube)

YouTube refuses datacenter IPs with `Sign in to confirm you're not a bot`; that
block is real and still stands (42 of 42 attempts failed). It no longer matters:
the shared Drive library already contains the extracted transcripts as JSON, and
the folders are public.

`scripts/harvest_drive.py` reads them anonymously:

| Step | Endpoint |
|---|---|
| list a folder | `https://drive.google.com/embeddedfolderview?id=<FOLDER_ID>#list` |
| download a file | `https://drive.usercontent.google.com/download?id=<FILE_ID>&export=download` |

```bash
python3 scripts/harvest_drive.py               # download both collections
python3 scripts/harvest_drive.py --build-ts    # regenerate the app index
npm run build
```

Or run **Actions → harvest-drive → Run workflow**. It requires **no secrets**
and commits the result back to the branch. A full run takes about 25 minutes.

### Bundle size

Full texts are **not** inlined into the JavaScript. Each transcript is written to
`public/transcripts/<collection>__<id>.json` and fetched only when a reader taps
*Read full transcript*; the bundle carries just an id/title/excerpt index.
841 transcripts at a 6,373-word average would otherwise add ~30 MB to the JS.

## Bundle size

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

- **`Spiritual_Intelligence_PRAYERS_Complete_Transcriptions.docx`** — all 377 prayer transcripts
- **`Spiritual_Intelligence_TEACHINGS_Complete_Transcriptions.docx`** — all 464 Myles Munroe teaching transcripts
- **`Spiritual_Intelligence_CHRISTIAN_HOUSE_Complete_Transcriptions.docx`** — the Christian House playlist transcripts harvested so far
- **`Spiritual_Intelligence_DOCX_Transcriptions_Package.zip`** — every package above in one archive

Regenerate them from the corpus with `python3 scripts/generate_docx_packages.py` (or pass a collection key to build just one).
- **`Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx`** — Video 1 Bilingual Edition (`1:24:44`)
- **`Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx`** — Video 2 Bilingual Edition (`09:02`)
- **`Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx`** — Video 3 Bilingual Edition (`29:12`)
- **`Spiritual_Intelligence_DOCX_Transcriptions_Package.zip`** — Complete `.zip` archive containing all 7 `.docx` manuals

## Importing transcripts harvested elsewhere

Harvesting needs a machine where YouTube is reachable. CI cannot reach it (bot
wall on the runner IP) and the agent sandbox has no YouTube egress at all, so the
harvest runs on a workstation and the JSON is brought in:

```bash
python3 scripts/yt/playlist.py "<playlist url>" -o manifest.json
python3 scripts/yt/harvest.py manifest.json -o transcripts --workers 4

python3 scripts/import_transcripts.py --src transcripts --collection christian-house
python3 scripts/harvest_drive.py --build-ts
python3 scripts/generate_docx_packages.py
```

`import_transcripts.py` accepts the toolkit's raw `{"id","status":"ok","text"}`
output or an already-built app record, applies the SKILL.md §6 cleaning rules,
splits paragraphs, and writes `data/transcripts/<collection>/<id>.json` with
`collectionSlug` (source group) and `author` (who actually spoke) preserved — so a
teaching library can hold several speakers without mislabelling them.

Every transcript is stored as JSON in [`/data/transcripts`](./data/transcripts) and served to the app from `public/transcripts`. The hand-authored plain-text files that used to live in `data/raw_transcripts` went with the nine removed sessions.

---

## ✨ Key Features of the Web Application

- **Full Library tab**: two collections — Prayers (377) and Myles Munroe (464) — with the per-playlist breakdown, live counts, and a searchable list of every transcript. Tap any entry to read the full text inline.
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
