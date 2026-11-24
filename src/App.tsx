import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Languages,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  LanguageMode,
  UILang,
  VIDEOS_DATA,
} from './data/spiritualData';
import { TranscriptionsView } from './components/TranscriptionsView';
import { PrayersAltarView } from './components/PrayersAltarView';
import {
  DevotionalsScriptureView,
  SavedBookmarkItem,
} from './components/DevotionalsScriptureView';
import { DocxDownloadsView } from './components/DocxDownloadsView';

type ActiveSection = 'transcriptions' | 'prayers' | 'devotionals' | 'downloads';

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('transcriptions');
  const [uiLang, setUiLang] = useState<UILang>('en');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('both');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [savedBookmarks, setSavedBookmarks] = useState<SavedBookmarkItem[]>(() => {
    try {
      const raw = localStorage.getItem('si_bookmarks');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [
      {
        id: 'v1-ch1',
        title: 'Commanding the Gate of the Morning (Job 38:12-13)',
        textEn: 'This morning belongs to God and this morning belongs to me! Every wicked arrangement scheduled for today—I shake you out by fire!',
        textFr: 'Ce matin appartient à Dieu et ce matin m’appartient ! Tout arrangement maléfique programmé pour aujourd’hui — je te secoue par le feu !',
        ref: 'Job 38:12-13 • Psalm 5:3',
      },
      {
        id: 'v3-ch1',
        title: 'Breaking the Iron Gate of Visibility (Acts 12:10)',
        textEn: 'In the name of Jesus, nothing keeps my head down in this season—I am lifted supernaturally and every Iron Gate of visibility opens of its own accord!',
        textFr: 'Au nom de Jésus, rien ne maintient ma tête baissée en cette saison — je suis élevé surnaturellement et toute Porte de Fer s’ouvre d’elle-même !',
        ref: 'Psalm 3:3 • Acts 12:10',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('si_bookmarks', JSON.stringify(savedBookmarks));
    } catch {
      // ignore
    }
  }, [savedBookmarks]);

  const handleToggleBookmark = (
    id: string,
    title: string,
    textEn: string,
    textFr: string,
    ref: string
  ) => {
    setSavedBookmarks((prev) => {
      if (prev.some((b) => b.id === id)) {
        return prev.filter((b) => b.id !== id);
      }
      return [{ id, title, textEn, textFr, ref }, ...prev];
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setSavedBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const navItems: {
    id: ActiveSection;
    label_en: string;
    label_fr: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'transcriptions',
      label_en: 'Transcriptions (EN / FR)',
      label_fr: 'Transcriptions (EN / FR)',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'prayers',
      label_en: 'Prayers & Declarations',
      label_fr: 'Prières & Déclarations',
      icon: <Flame className="w-4 h-4" />,
    },
    {
      id: 'devotionals',
      label_en: 'Devotionals & Scriptures',
      label_fr: 'Méditations & Écritures',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'downloads',
      label_en: 'DOCX Package',
      label_fr: 'Pack DOCX',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-[#0F141C] text-[#F5F2EB]'
          : 'bg-[#FBF8F3] text-[#1C1917]'
      }`}
    >
      {/* Top Sticky Frosted Sanctuary Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          darkMode
            ? 'bg-[#0F141C]/90 border-[#263246]'
            : 'bg-[#FBF8F3]/90 border-[#B48327]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => setActiveSection('transcriptions')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B48327] to-[#7C2D12] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight block leading-none">
                Spiritual Intelligence
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B48327] block mt-0.5">
                {uiLang === 'fr'
                  ? 'Sanctuaire de Prières & Transcriptions (EN • FR)'
                  : 'Prayers, Devotionals & Transcriptions (EN • FR)'}
              </span>
            </div>
          </button>

          {/* Main Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#B48327] text-white shadow-sm'
                      : darkMode
                      ? 'text-[#A8A29E] hover:text-white hover:bg-[#171F2C]'
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EDE2]'
                  }`}
                >
                  {item.icon}
                  <span>{uiLang === 'fr' ? item.label_fr : item.label_en}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: UI Language, Theme & Direct DOCX Download CTA */}
          <div className="flex items-center gap-2">
            {/* UI Language Toggle EN / FR */}
            <div
              className={`inline-flex items-center rounded-xl p-0.5 border ${
                darkMode ? 'bg-[#171F2C] border-[#263246]' : 'bg-[#F3EDE2] border-[#B48327]/25'
              }`}
              title="Switch Interface & Reader Language"
            >
              <button
                type="button"
                onClick={() => {
                  setUiLang('en');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  uiLang === 'en'
                    ? 'bg-[#B48327] text-white'
                    : 'text-[#57534E] dark:text-[#A8A29E]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => {
                  setUiLang('fr');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  uiLang === 'fr'
                    ? 'bg-[#B48327] text-white'
                    : 'text-[#57534E] dark:text-[#A8A29E]'
                }`}
              >
                FR
              </button>
            </div>

            {/* Dawn Parchment / Midnight Watch Theme Switcher */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition ${
                darkMode
                  ? 'bg-[#171F2C] border-[#263246] text-amber-300 hover:border-[#D4AF37]'
                  : 'bg-[#F3EDE2] border-[#B48327]/25 text-[#7C2D12] hover:bg-[#EAE1D3]'
              }`}
              title={
                darkMode
                  ? 'Switch to Dawn Parchment Mode'
                  : 'Switch to Midnight Watch Mode'
              }
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Direct Master DOCX Download CTA */}
            <a
              href="/downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              download="Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#7C2D12] text-amber-100 hover:bg-[#63220D] transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">
                {uiLang === 'fr' ? 'Pack .DOCX (EN/FR)' : 'Download .DOCX'}
              </span>
            </a>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Bar */}
        <div
          className={`xl:hidden border-t px-4 py-2 flex items-center gap-1.5 overflow-x-auto ${
            darkMode ? 'border-[#263246]' : 'border-[#B48327]/15'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                  isActive
                    ? 'bg-[#B48327] text-white'
                    : darkMode
                    ? 'text-[#A8A29E] bg-[#171F2C]'
                    : 'text-[#57534E] bg-[#F3EDE2]'
                }`}
              >
                {item.icon}
                <span>{uiLang === 'fr' ? item.label_fr : item.label_en}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Illuminated Sanctuary Hero Banner */}
      <section
        className={`relative overflow-hidden border-b ${
          darkMode
            ? 'bg-gradient-to-b from-[#171F2C] via-[#121822] to-[#0F141C] border-[#263246]'
            : 'bg-gradient-to-b from-[#F3EDE2] via-[#FBF8F3] to-[#FBF8F3] border-[#B48327]/20'
        }`}
      >
        {/* Subtle radial gold glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[320px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #B48327 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#B48327]/35 bg-[#B48327]/10 text-[#B48327]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {uiLang === 'fr'
                    ? 'TRANSCRIPTIONS BILINGUES COMPLÈTES (ANGLAIS & FRANÇAIS) • 3 SESSIONS DE PRIÈRE'
                    : 'COMPLETE BILINGUAL TRANSCRIPTIONS (ENGLISH & FRENCH) • 3 PRAYER SESSIONS'}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[1.1] tracking-tight">
                {uiLang === 'fr' ? (
                  <>
                    Intelligence Spirituelle :{' '}
                    <span className="italic font-normal text-[#B48327]">
                      Sanctuaire de Prières, Déclarations & Méditations
                    </span>
                  </>
                ) : (
                  <>
                    Spiritual Intelligence:{' '}
                    <span className="italic font-normal text-[#B48327]">
                      A Sanctuary for Prayers, Devotionals & Sacred Words
                    </span>
                  </>
                )}
              </h1>

              <p
                className={`font-reading text-base sm:text-lg leading-relaxed max-w-3xl ${
                  darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]'
                }`}
              >
                {uiLang === 'fr'
                  ? 'Explorez les transcriptions intégrales en anglais (EN) et en français (FR) des trois sessions fondamentales de prière matinale, de dévotion contemplative et de déclarations prophétiques avec l’Apôtre Joshua Selman et Grace Enclave — accompagnées d’un autel de prière interactif, d’une concordance biblique bilingue et d’un pack téléchargeable Microsoft Word (.docx).'
                  : 'Explore the complete, unabridged English (EN) and French (FR) transcriptions of the three foundational sessions of morning warfare, contemplative devotion, and apostolic declarations with Apostle Joshua Selman and Grace Enclave—complete with an interactive prayer altar, bilingual Scripture concordance, and downloadable Microsoft Word (.docx) packages.'}
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSection('transcriptions')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-md"
                >
                  <BookOpen className="w-4 h-4" />
                  {uiLang === 'fr'
                    ? 'Lire les Transcriptions (EN & FR)'
                    : 'Read Transcriptions (EN & FR)'}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('prayers')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold border transition ${
                    darkMode
                      ? 'bg-[#171F2C] border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#1C2636]'
                      : 'bg-[#F3EDE2] border-[#B48327]/40 text-[#7C2D12] hover:bg-[#EAE1D3]'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  {uiLang === 'fr'
                    ? 'Ouvrir l’Autel de Prière'
                    : 'Enter Prayer & Declarations Altar'}
                </button>

                <a
                  href="/downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
                  download="Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#7C2D12] text-amber-100 hover:bg-[#63220D] transition shadow-md"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  {uiLang === 'fr'
                    ? 'Télécharger Pack .DOCX (EN + FR)'
                    : 'Download Master .DOCX Package'}
                </a>
              </div>
            </div>

            {/* Right Key Scripture & Quick Stats Card */}
            <div className="lg:col-span-4">
              <div
                className={`rounded-2xl border p-5 sm:p-6 shadow-sm space-y-4 ${
                  darkMode
                    ? 'bg-[#171F2C]/90 border-[#263246]'
                    : 'bg-[#F3EDE2]/95 border-[#B48327]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37]">
                    ✦ {uiLang === 'fr' ? 'Parole d’Ancrage' : 'Foundational Mandate'}
                  </span>
                  <span className="font-mono-code text-[11px] font-bold text-[#B48327]">
                    Job 38:12 • Psalm 5:3 • John 15:5
                  </span>
                </div>

                <blockquote className="font-display italic text-lg sm:text-xl leading-relaxed border-l-3 border-[#B48327] pl-3.5">
                  {uiLang === 'fr'
                    ? '« Notre mission est de prier — prier comme des croyants dotés d’intelligence spirituelle ! Les paroles prophétiques ne font pas que révéler : elles créent. »'
                    : '“Our assignment is to pray—pray like believers with spiritual intelligence! Prophetic words don’t only reveal; they create.”'}
                </blockquote>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#B48327]/15 text-center">
                  <div className="p-2 rounded-xl bg-[#B48327]/10">
                    <div className="font-display font-bold text-xl text-[#B48327]">3</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider">
                      {uiLang === 'fr' ? 'Vidéos (2h03)' : 'Videos (2h03m)'}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#B48327]/10">
                    <div className="font-display font-bold text-xl text-[#7C2D12] dark:text-[#D4AF37]">
                      EN • FR
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider">
                      {uiLang === 'fr' ? '100% Bilingue' : '100% Bilingual'}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#B48327]/10">
                    <div className="font-display font-bold text-xl text-[#B48327]">6</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider">
                      {uiLang === 'fr' ? 'Manuels .DOCX' : '.DOCX Manuals'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeSection === 'transcriptions' && (
          <TranscriptionsView
            uiLang={uiLang}
            languageMode={languageMode}
            setLanguageMode={setLanguageMode}
            darkMode={darkMode}
            bookmarkedIds={savedBookmarks.map((b) => b.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeSection === 'prayers' && (
          <PrayersAltarView
            uiLang={uiLang}
            languageMode={languageMode}
            darkMode={darkMode}
            bookmarkedIds={savedBookmarks.map((b) => b.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeSection === 'devotionals' && (
          <DevotionalsScriptureView
            uiLang={uiLang}
            languageMode={languageMode}
            darkMode={darkMode}
            savedBookmarks={savedBookmarks}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}

        {activeSection === 'downloads' && (
          <DocxDownloadsView uiLang={uiLang} darkMode={darkMode} />
        )}
      </main>

      {/* Sanctuary Footer */}
      <footer
        className={`border-t mt-16 ${
          darkMode
            ? 'bg-[#0B0F15] border-[#263246] text-[#A8A29E]'
            : 'bg-[#F3EDE2] border-[#B48327]/20 text-[#57534E]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#B48327] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-xl text-[#1C1917] dark:text-[#F5F2EB]">
                  Spiritual Intelligence
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {uiLang === 'fr'
                  ? 'Un sanctuaire bilingue (Anglais & Français) dédié à la prière fervente, aux déclarations prophétiques, à la méditation de la Parole et à l’étude des transcriptions sacrées.'
                  : 'A bilingual (English & French) devotional sanctuary dedicated to fervent prayer, prophetic declarations, Scripture meditation, and sacred video transcriptions.'}
              </p>
            </div>

            {/* Col 2: Source Videos */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
                {uiLang === 'fr' ? 'Sources Vidéo YouTube' : 'Source YouTube Videos & Playlists'}
              </h4>
              <ul className="space-y-1.5 text-xs">
                {VIDEOS_DATA.map((v) => (
                  <li key={v.id}>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#B48327] transition"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0 text-[#B48327]" />
                      <span className="truncate max-w-xs">
                        Video {v.videoNumber}: {v.title_en} ({v.duration})
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Direct DOCX Downloads */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
                {uiLang === 'fr' ? 'Téléchargements Directs (.DOCX)' : 'Direct .DOCX Downloads'}
              </h4>
              <div className="flex flex-col gap-1.5 text-xs">
                <a
                  href="/downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
                  download
                  className="inline-flex items-center gap-1.5 font-semibold text-[#7C2D12] dark:text-amber-300 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx
                </a>
                <a
                  href="/downloads/Spiritual_Intelligence_Transcriptions_EN.docx"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_Transcriptions_EN.docx (English)
                </a>
                <a
                  href="/downloads/Spiritual_Intelligence_Transcriptions_FR.docx"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_Transcriptions_FR.docx (Français)
                </a>
                <a
                  href="/downloads/Spiritual_Intelligence_DOCX_Transcriptions_Package.zip"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_DOCX_Transcriptions_Package.zip
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#B48327]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>
              ✦ Spiritual Intelligence • Bilingual English & French Prayers, Devotionals & Transcriptions
            </p>
            <p className="font-mono-code text-[11px]">
              github.com/tianabizna-ctrl/Spiritual-Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
