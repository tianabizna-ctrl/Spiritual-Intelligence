import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Layers,
  Library,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  LanguageMode,
  UILang,
  VIDEOS_DATA,
} from './data/spiritualData';
import { ALL_VIDEOS_DATA } from './data/compendiumData';
import { TranscriptionsView } from './components/TranscriptionsView';
import { PrayersAltarView } from './components/PrayersAltarView';
import {
  DevotionalsScriptureView,
  SavedBookmarkItem,
} from './components/DevotionalsScriptureView';
import { DocxDownloadsView } from './components/DocxDownloadsView';
import { MasterCompendiumView } from './components/MasterCompendiumView';
import { LibraryView } from './components/LibraryView';
import { LIBRARY_TOTAL_VIDEOS } from './data/libraryCatalog';

type ActiveSection =
  | 'transcriptions'
  | 'library'
  | 'prayers'
  | 'devotionals'
  | 'compendium'
  | 'downloads';

/** Compact UI strings for the shell (header / footer / nav). */
const SHELL_TEXT: Record<
  UILang,
  {
    tagline: string;
    nav: Record<ActiveSection, string>;
    download: string;
    languageLabel: string;
    footerBlurb: string;
    footerVideos: string;
    footerDocs: string;
    footerRights: string;
    readNow: string;
  }
> = {
  en: {
    tagline: 'Prayers • Devotionals • Transcriptions (EN • FR • MG)',
    nav: {
      transcriptions: 'Read Prayers',
      prayers: 'Prayer Altar',
      devotionals: 'Devotionals',
      compendium: 'All Titles',
      library: 'Full Library',
      downloads: '.DOCX',
    },
    download: 'Download .DOCX',
    languageLabel: 'Reading language',
    footerBlurb:
      'A trilingual (English, French & Malagasy) devotional sanctuary dedicated to fervent prayer, prophetic declarations, Scripture meditation, and sacred video transcriptions.',
    footerVideos: 'Source Library — 377 Videos in 3 Playlists',
    footerDocs: 'Direct .DOCX Downloads',
    footerRights:
      'Spiritual Intelligence • Trilingual English, French & Malagasy Prayers, Devotionals & Transcriptions',
    readNow: 'Read Prayers',
  },
  fr: {
    tagline: 'Prières • Méditations • Transcriptions (EN • FR • MG)',
    nav: {
      transcriptions: 'Lire les Prières',
      prayers: 'Autel de Prière',
      devotionals: 'Méditations',
      compendium: 'Tous les Titres',
      library: 'Bibliothèque',
      downloads: '.DOCX',
    },
    download: 'Télécharger .DOCX',
    languageLabel: 'Langue de lecture',
    footerBlurb:
      'Un sanctuaire trilingue (anglais, français et malgache) dédié à la prière fervente, aux déclarations prophétiques, à la méditation de la Parole et à l’étude des transcriptions sacrées.',
    footerVideos: 'Bibliothèque Source — 377 Vidéos en 3 Playlists',
    footerDocs: 'Téléchargements Directs (.DOCX)',
    footerRights:
      'Intelligence Spirituelle • Prières, Méditations & Transcriptions en Anglais, Français et Malgache',
    readNow: 'Lire les Prières',
  },
  mg: {
    tagline: 'Vavaka • Fanadihadiana • Fandikana (EN • FR • MG)',
    nav: {
      transcriptions: 'Vakio ny Vavaka',
      prayers: 'Alitara Vavaka',
      devotionals: 'Fanadihadiana',
      compendium: 'Lohateny Rehetra',
      library: 'Tranomboky',
      downloads: '.DOCX',
    },
    download: 'Alaivo ny .DOCX',
    languageLabel: 'Fiteny ampiasaina',
    footerBlurb:
      'Toerana masina telo fiteny (anglisy, frantsay ary malagasy) natokana ho an’ny vavaka mafana fo, fanambarana ara-paminaniana, fisaintsainana ny Tenin’Andriamanitra ary fandalinana ny fandikana masina.',
    footerVideos: 'Tranomboky niandohana — video 377 amin’ny playlists 3',
    footerDocs: 'Fampidirana mivantana (.DOCX)',
    footerRights:
      'Faharanitan-tsaina Ara-panahy • Vavaka, Fanadihadiana & Fandikana amin’ny Anglisy, Frantsay ary Malagasy',
    readNow: 'Vakio ny Vavaka',
  },
};

const LANG_PILLS: { id: UILang; flag: string; code: string; full: string }[] = [
  { id: 'en', flag: '🇬🇧', code: 'EN', full: 'English' },
  { id: 'fr', flag: '🇫🇷', code: 'FR', full: 'Français' },
  { id: 'mg', flag: '🇲🇬', code: 'MG', full: 'Malagasy' },
];

const DEFAULT_BOOKMARKS: SavedBookmarkItem[] = [
  {
    id: 'v1-ch1',
    title: 'Commanding the Gate of the Morning (Job 38:12-13)',
    textEn:
      'This morning belongs to God and this morning belongs to me! Every wicked arrangement scheduled for today—I shake you out by fire!',
    textFr:
      'Ce matin appartient à Dieu et ce matin m’appartient ! Tout arrangement maléfique programmé pour aujourd’hui — je te secoue par le feu !',
    ref: 'Job 38:12-13 • Psalm 5:3',
  },
  {
    id: 'v3-ch1',
    title: 'Breaking the Iron Gate of Visibility (Acts 12:10)',
    textEn:
      'In the name of Jesus, nothing keeps my head down in this season—I am lifted supernaturally and every Iron Gate of visibility opens of its own accord!',
    textFr:
      'Au nom de Jésus, rien ne maintient ma tête baissée en cette saison — je suis élevé surnaturellement et toute Porte de Fer s’ouvre d’elle-même !',
    ref: 'Psalm 3:3 • Acts 12:10',
  },
];

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('transcriptions');
  const [selectedReaderVideoId, setSelectedReaderVideoId] = useState<string>(VIDEOS_DATA[0].id);
  const [uiLang, setUiLang] = useState<UILang>('en');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const strings = SHELL_TEXT[uiLang];

  const handleSelectLanguage = (lang: UILang) => {
    setUiLang(lang);
    setLanguageMode(lang);
  };

  const [savedBookmarks, setSavedBookmarks] = useState<SavedBookmarkItem[]>(() => {
    try {
      const raw = localStorage.getItem('si_bookmarks');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return DEFAULT_BOOKMARKS;
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

  const handleOpenVideoInReader = (videoId: string) => {
    setSelectedReaderVideoId(videoId);
    setActiveSection('transcriptions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: ActiveSection) => {
    setActiveSection(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: ActiveSection; icon: React.ReactNode }[] = [
    { id: 'transcriptions', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'prayers', icon: <Flame className="w-4 h-4" /> },
    { id: 'devotionals', icon: <Compass className="w-4 h-4" /> },
    { id: 'library', icon: <Library className="w-4 h-4" /> },
    { id: 'compendium', icon: <Layers className="w-4 h-4" /> },
    { id: 'downloads', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-[#0F141C] text-[#F5F2EB]' : 'bg-[#FBF8F3] text-[#1C1917]'
      }`}
    >
      {/* ---------- Ultra-compact sticky header (never blocks reading) ---------- */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${
          darkMode ? 'bg-[#0F141C]/95 border-[#263246]' : 'bg-[#FBF8F3]/95 border-[#B48327]/20'
        }`}
      >
        {/* Row 1: brand + language pills + theme */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleNavigateTab('transcriptions')}
            className="flex items-center gap-2 text-left group min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg bg-gradient-to-br from-[#B48327] to-[#7C2D12] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-sm sm:text-lg tracking-tight block leading-tight truncate">
                Spiritual Intelligence
              </span>
              <span className="hidden sm:block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B48327] truncate">
                {strings.tagline}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* 1-tap language pills: EN | FR | MG */}
            <div
              className={`inline-flex items-center rounded-full p-0.5 border ${
                darkMode ? 'bg-[#171F2C] border-[#263246]' : 'bg-[#F3EDE2] border-[#B48327]/30'
              }`}
              role="group"
              aria-label={strings.languageLabel}
              title={strings.languageLabel}
            >
              {LANG_PILLS.map((pill) => {
                const isActive = uiLang === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handleSelectLanguage(pill.id)}
                    aria-pressed={isActive}
                    title={`${pill.full} (${pill.code})`}
                    className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#B48327] text-white shadow-sm'
                        : darkMode
                        ? 'text-[#A8A29E] hover:text-[#D4AF37]'
                        : 'text-[#57534E] hover:text-[#B48327]'
                    }`}
                  >
                    <span aria-hidden>{pill.flag}</span>
                    <span>{pill.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Theme switcher */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 sm:p-2 rounded-lg border transition ${
                darkMode
                  ? 'bg-[#171F2C] border-[#263246] text-amber-300 hover:border-[#D4AF37]'
                  : 'bg-[#F3EDE2] border-[#B48327]/25 text-[#7C2D12] hover:bg-[#EAE1D3]'
              }`}
              title={darkMode ? 'Dawn Parchment' : 'Midnight Watch'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              download="Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#7C2D12] text-amber-100 hover:bg-[#63220D] transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>{strings.download}</span>
            </a>
          </div>
        </div>

        {/* Row 2: slim horizontally scrollable nav — reading tab first */}
        <nav
          className={`border-t px-2 sm:px-6 lg:px-8 py-1 flex items-center gap-1 overflow-x-auto ${
            darkMode ? 'border-[#263246]' : 'border-[#B48327]/12'
          }`}
          aria-label="Sections"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigateTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  isActive
                    ? 'bg-[#B48327] text-white shadow-sm'
                    : darkMode
                    ? 'text-[#A8A29E] hover:bg-[#171F2C]'
                    : 'text-[#57534E] hover:bg-[#F3EDE2]'
                }`}
              >
                {item.icon}
                <span>{strings.nav[item.id]}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ---------- Main content: prayers straight away, no blocking hero ---------- */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8">
        {activeSection === 'transcriptions' && (
          <TranscriptionsView
            uiLang={uiLang}
            languageMode={languageMode}
            setLanguageMode={(mode) => {
              if (mode === 'en' || mode === 'fr' || mode === 'mg') {
                handleSelectLanguage(mode);
              } else {
                setLanguageMode(mode);
              }
            }}
            darkMode={darkMode}
            bookmarkedIds={savedBookmarks.map((b) => b.id)}
            onToggleBookmark={handleToggleBookmark}
            externalSelectedVideoId={selectedReaderVideoId}
            onSelectVideoId={setSelectedReaderVideoId}
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

        {activeSection === 'compendium' && (
          <MasterCompendiumView
            uiLang={uiLang}
            languageMode={languageMode}
            onSelectLanguage={handleSelectLanguage}
            darkMode={darkMode}
            onOpenVideoInReader={handleOpenVideoInReader}
            onNavigateTab={(tab) => handleNavigateTab(tab)}
          />
        )}

        {activeSection === 'library' && (
          <LibraryView uiLang={uiLang} darkMode={darkMode} />
        )}

        {activeSection === 'downloads' && (
          <DocxDownloadsView uiLang={uiLang} darkMode={darkMode} />
        )}
      </main>

      {/* ---------- Sanctuary footer ---------- */}
      <footer
        className={`border-t mt-10 ${
          darkMode
            ? 'bg-[#0B0F15] border-[#263246] text-[#A8A29E]'
            : 'bg-[#F3EDE2] border-[#B48327]/20 text-[#57534E]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Col 1: Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#B48327] flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-display font-bold text-lg">Spiritual Intelligence</span>
              </div>
              <p className="text-xs leading-relaxed">{strings.footerBlurb}</p>
            </div>

            {/* Col 2: Source Videos */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#B48327]">
                {strings.footerVideos}
              </h4>
              <button
                type="button"
                onClick={() => handleNavigateTab('library')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-[#B48327] transition"
              >
                <Library className="w-3 h-3 text-[#B48327]" />
                <span>
                  {LIBRARY_TOTAL_VIDEOS} {'videos across 3 playlists — '} {strings.nav.library}
                </span>
              </button>
              <ul className="space-y-1 text-xs">
                {ALL_VIDEOS_DATA.map((v) => (
                  <li key={v.id}>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#B48327] transition"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0 text-[#B48327]" />
                      <span className="truncate max-w-[16rem]">
                        Video {v.videoNumber}: {v.title_en} ({v.duration})
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Direct DOCX Downloads */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#B48327]">
                {strings.footerDocs}
              </h4>
              <div className="flex flex-col gap-1.5 text-xs">
                <a
                  href="downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
                  download
                  className="inline-flex items-center gap-1.5 font-semibold text-[#7C2D12] dark:text-amber-300 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  Trilingual Master Edition (EN / FR / MG)
                </a>
                <a
                  href="downloads/Spiritual_Intelligence_Transcriptions_EN.docx"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_Transcriptions_EN.docx
                </a>
                <a
                  href="downloads/Spiritual_Intelligence_Transcriptions_FR.docx"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_Transcriptions_FR.docx
                </a>
                <a
                  href="downloads/Spiritual_Intelligence_Transcriptions_MG.docx"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_Transcriptions_MG.docx
                </a>
                <a
                  href="downloads/Spiritual_Intelligence_DOCX_Transcriptions_Package.zip"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-[#B48327]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Spiritual_Intelligence_DOCX_Transcriptions_Package.zip
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#B48327]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <p>✦ {strings.footerRights}</p>
            <p className="font-mono-code">github.com/tianabizna-ctrl/Spiritual-Intelligence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
