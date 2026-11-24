# ✦ Spiritual Intelligence — Intelligence Spirituelle (EN / FR)

A bilingual (**English & French**) web application and devotional sanctuary featuring complete video transcriptions, prophetic declarations, interactive prayer watches, a bilingual Scripture concordance, and downloadable **Microsoft Word (`.docx`)** transcription packages.

---

## 📺 Source Videos & Transcriptions (English & Français)

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

- **`Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx`** — Complete Bilingual Master Package (All 3 videos in English & French, devotional overviews, and Scripture references)
- **`Spiritual_Intelligence_Transcriptions_EN.docx`** — Complete English Edition (All 3 videos in English)
- **`Spiritual_Intelligence_Transcriptions_FR.docx`** — Complete French Edition (All 3 videos in French)
- **`Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx`** — Video 1 Bilingual Edition (`1:24:44`)
- **`Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx`** — Video 2 Bilingual Edition (`09:02`)
- **`Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx`** — Video 3 Bilingual Edition (`29:12`)
- **`Spiritual_Intelligence_DOCX_Transcriptions_Package.zip`** — Complete `.zip` archive containing all 6 `.docx` manuals

Plain-text raw English & French transcripts are also stored in [`/data/raw_transcripts`](./data/raw_transcripts).

---

## ✨ Key Features of the Web Application

- **Bilingual Transcription Sanctuary (`EN + FR Parallel`, `English Only`, `Français Only`)**:
  - Read structured chapters with Scripture pills and prophetic decrees alongside the **100% unabridged verbatim transcripts** in both English and French.
  - Adjustable typography scale (`A-` to `A++`), instant bilingual search, one-click copy, bookmarking, and an embedded YouTube player to listen/watch along.
- **Interactive Prayers & Prophetic Declarations Altar**:
  - Categorized prayer points across every watch (*Command the Morning*, *Morning Surrender*, *6:45 AM Declarations*, *Finances & Helpers*, *Family & Marriage*, *Divine Healing*, *Wall of Fire*, *Midnight Warfare*).
  - Built-in **Prayer Watch Timer**, **Guided Focus Altar Mode**, and interactive **"I Declare / Amen"** counter.
- **Devotional Study Guides & Bilingual Scripture Treasury**:
  - Three in-depth devotional meditations in English and French, reflection questions, a searchable **KJV / Louis Segond 1910 Scripture Concordance**, and a persistent **Personal Prayer & Prophetic Idea Journal**.
- **DOCX Download Center & Custom `.DOCX` Builder**:
  - Instant download of all 6 pre-built `.docx` files and the `.zip` bundle, plus a client-side custom `.docx` generator.
- **Dawn Parchment & Midnight Watch Themes**:
  - Switch effortlessly between Warm Parchment Light Mode and Midnight Watch Dark Mode.

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
