import React, { useState, useMemo, useRef } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Flame,
  LayoutGrid,
  ListOrdered,
  Search,
  Sparkles,
  Bookmark,
  Video,
  X,
} from 'lucide-react';
import {
  VIDEOS_DATA,
  LanguageMode,
  UILang,
  VideoResource,
} from '../data/spiritualData';
import { ALL_VIDEOS_DATA, COMPANION_VIDEOS_DATA } from '../data/compendiumData';
import { RAW_TRANSCRIPTS } from '../data/rawTranscripts';
import { VIDEO_MG_MAP, CHAPTER_MG_MAP } from '../data/malagasyData';

interface TranscriptionsViewProps {
  uiLang: UILang;
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  darkMode: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, textEn: string, textFr: string, ref: string) => void;
  externalSelectedVideoId?: string;
  onSelectVideoId?: (id: string) => void;
}

type ReaderScope = 'all' | 'structured' | 'verbatim';
type FontScale = 'sm' | 'md' | 'lg' | 'xl';

export const TranscriptionsView: React.FC<TranscriptionsViewProps> = ({
  uiLang,
  languageMode,
  setLanguageMode,
  darkMode,
  bookmarkedIds,
  onToggleBookmark,
  externalSelectedVideoId,
  onSelectVideoId,
}) => {
  const [internalVideoId, setInternalVideoId] = useState<string>(VIDEOS_DATA[0].id);
  const selectedVideoId = externalSelectedVideoId || internalVideoId;
  const readerTopRef = useRef<HTMLDivElement>(null);

  const [showVideoCatalogDrawer, setShowVideoCatalogDrawer] = useState<boolean>(false);
  const [showMobileChapters, setShowMobileChapters] = useState<boolean>(false);
  const [readerScope, setReaderScope] = useState<ReaderScope>('all');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectAndScrollToReader = (id: string) => {
    setInternalVideoId(id);
    if (onSelectVideoId) onSelectVideoId(id);
    setShowVideoCatalogDrawer(false);
    setTimeout(() => {
      readerTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const activeVideo: VideoResource = useMemo(
    () => ALL_VIDEOS_DATA.find((v) => v.id === selectedVideoId) || ALL_VIDEOS_DATA[0],
    [selectedVideoId]
  );

  const activeVideoMg = VIDEO_MG_MAP[activeVideo.id];
  const rawTranscript = RAW_TRANSCRIPTS[activeVideo.id];

  const getVideoTitle = (v: VideoResource) => {
    if (uiLang === 'mg') return VIDEO_MG_MAP[v.id]?.title_mg || v.title_en;
    if (uiLang === 'fr') return v.title_fr;
    return v.title_en;
  };

  const getVideoCategory = (v: VideoResource) => {
    if (uiLang === 'mg') return VIDEO_MG_MAP[v.id]?.watchCategory_mg || v.watchCategory_en;
    if (uiLang === 'fr') return v.watchCategory_fr;
    return v.watchCategory_en;
  };

  const getVideoTagline = (v: VideoResource) => {
    if (uiLang === 'mg') return VIDEO_MG_MAP[v.id]?.tagline_mg || v.tagline_en;
    if (uiLang === 'fr') return v.tagline_fr;
    return v.tagline_en;
  };

  const getVideoOverview = (v: VideoResource) => {
    if (uiLang === 'mg') return VIDEO_MG_MAP[v.id]?.overview_mg || v.overview_en;
    if (uiLang === 'fr') return v.overview_fr;
    return v.overview_en;
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const fontSizeClass = {
    sm: 'text-[15px] leading-[1.7]',
    md: 'text-[17px] leading-[1.8]',
    lg: 'text-[19px] leading-[1.85]',
    xl: 'text-[21px] leading-[1.9]',
  }[fontScale];

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return activeVideo.chapters;
    const q = searchQuery.toLowerCase();
    return activeVideo.chapters.filter((ch) => {
      const mg = CHAPTER_MG_MAP[ch.id];
      return (
        ch.title_en.toLowerCase().includes(q) ||
        ch.title_fr.toLowerCase().includes(q) ||
        (mg?.title_mg || '').toLowerCase().includes(q) ||
        ch.en_text.toLowerCase().includes(q) ||
        ch.fr_text.toLowerCase().includes(q) ||
        (mg?.mg_text || '').toLowerCase().includes(q) ||
        ch.declaration_en.toLowerCase().includes(q) ||
        ch.declaration_fr.toLowerCase().includes(q) ||
        (mg?.declaration_mg || '').toLowerCase().includes(q) ||
        ch.scriptures.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [activeVideo, searchQuery]);

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/90 border-[#B48327]/20 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  const activeParagraphs = useMemo(() => {
    if (!rawTranscript) return [];
    const list =
      uiLang === 'mg'
        ? rawTranscript.mg_paragraphs
        : uiLang === 'fr'
        ? rawTranscript.fr_paragraphs
        : rawTranscript.en_paragraphs;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((p) => p.toLowerCase().includes(q));
  }, [rawTranscript, uiLang, searchQuery]);

  const activeRawFullText = useMemo(() => {
    if (!rawTranscript) return '';
    if (uiLang === 'mg') return rawTranscript.mg_raw;
    if (uiLang === 'fr') return rawTranscript.fr_raw;
    return rawTranscript.en_raw;
  }, [rawTranscript, uiLang]);

  return (
    <div ref={readerTopRef} className="space-y-5 scroll-mt-20">
      {/* 1. COMPACT MOBILE-FIRST SESSION & LANGUAGE SWITCHER BAR (Does NOT block prayers on phone screens) */}
      <div className={`rounded-2xl border p-3.5 sm:p-5 ${cardSurface} shadow-sm space-y-3`}>
        {/* Row 1: Dropdown / Session Selector + Optional Video Catalog Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100 shrink-0">
              {uiLang === 'mg'
                ? `Video ${activeVideo.videoNumber}/9`
                : uiLang === 'fr'
                ? `Vidéo ${activeVideo.videoNumber}/9`
                : `Video ${activeVideo.videoNumber}/9`}
            </span>

            {/* Instant Mobile/Desktop Select Dropdown to switch any of the 9 videos without scrolling */}
            <select
              aria-label="Select Prayer Video Session"
              value={selectedVideoId}
              onChange={(e) => selectAndScrollToReader(e.target.value)}
              className={`flex-1 min-w-0 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border outline-none transition truncate ${
                darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB] focus:border-[#D4AF37]'
                  : 'bg-[#FBF8F3] border-[#B48327]/35 text-[#1C1917] focus:border-[#B48327]'
              }`}
            >
              <optgroup
                label={
                  uiLang === 'mg'
                    ? '★ Video 3 Voalohany Nangatahana'
                    : uiLang === 'fr'
                    ? '★ 3 Vidéos Principales Demandées'
                    : '★ 3 Primary Requested Videos'
                }
              >
                {VIDEOS_DATA.map((v) => (
                  <option key={v.id} value={v.id}>
                    #{v.videoNumber} ({v.duration}) — {getVideoTitle(v)}
                  </option>
                ))}
              </optgroup>
              <optgroup
                label={
                  uiLang === 'mg'
                    ? '✦ Video 6 Fanampiny avy amin’ny Playlists'
                    : uiLang === 'fr'
                    ? '✦ 6 Sessions Compagnons des Playlists'
                    : '✦ 6 Companion Playlist Sessions'
                }
              >
                {COMPANION_VIDEOS_DATA.map((v) => (
                  <option key={v.id} value={v.id}>
                    #{v.videoNumber} ({v.duration}) — {getVideoTitle(v)}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowVideoCatalogDrawer(!showVideoCatalogDrawer)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                showVideoCatalogDrawer
                  ? 'bg-[#B48327] text-white border-[#B48327]'
                  : darkMode
                  ? 'border-[#263246] bg-[#0F141C] text-[#D4AF37] hover:border-[#D4AF37]'
                  : 'border-[#B48327]/30 bg-[#FBF8F3] text-[#7C2D12] hover:bg-[#EAE1D3]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>
                {showVideoCatalogDrawer
                  ? uiLang === 'mg'
                    ? 'Afenina ny Karatra 9'
                    : uiLang === 'fr'
                    ? 'Masquer les 9 Cartes'
                    : 'Hide 9 Video Cards'
                  : uiLang === 'mg'
                  ? 'Hijery ireo Video 9'
                  : uiLang === 'fr'
                  ? 'Parcourir les 9 Vidéos'
                  : 'Browse All 9 Videos'}
              </span>
              {showVideoCatalogDrawer ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowVideoPlayer(!showVideoPlayer)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                showVideoPlayer
                  ? 'bg-[#7C2D12] text-white border-[#7C2D12]'
                  : darkMode
                  ? 'border-[#263246] bg-[#0F141C] text-[#F5F2EB]'
                  : 'border-[#B48327]/30 bg-[#FBF8F3] text-[#1C1917]'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#B48327]" />
              <span>
                {showVideoPlayer
                  ? uiLang === 'mg'
                    ? 'Afenina Video'
                    : uiLang === 'fr'
                    ? 'Masquer Vidéo'
                    : 'Hide Video'
                  : 'YouTube'}
              </span>
            </button>
          </div>
        </div>

        {/* Horizontal Quick-Switch Pills for the 9 Videos */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {ALL_VIDEOS_DATA.map((v) => {
            const isSel = v.id === selectedVideoId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => selectAndScrollToReader(v.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition border ${
                  isSel
                    ? 'bg-[#B48327] text-white border-[#B48327] shadow-sm'
                    : darkMode
                    ? 'bg-[#0F141C] border-[#263246] text-[#A8A29E] hover:text-white'
                    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                V{v.videoNumber} • {v.duration}
              </button>
            );
          })}
        </div>

        {/* Collapsible 9-Video Card Drawer (Only shown when user taps "Browse All 9 Videos") */}
        {showVideoCatalogDrawer && (
          <div className="pt-3 border-t border-[#B48327]/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B48327]">
                {uiLang === 'mg'
                  ? 'Misafidiana Video Hovaciana (Tsindrio dia Miverina Avy Hatrany any amin’ny Vavaka)'
                  : uiLang === 'fr'
                  ? 'Sélectionnez une Vidéo (Un clic ouvre directement la prière)'
                  : 'Select Any Video Session (Tapping a card opens the prayer immediately)'}
              </span>
              <button
                type="button"
                onClick={() => setShowVideoCatalogDrawer(false)}
                className="text-xs font-bold text-[#B48327] hover:underline"
              >
                {uiLang === 'mg' ? 'Hidio ✕' : uiLang === 'fr' ? 'Fermer ✕' : 'Close ✕'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto pr-1">
              {ALL_VIDEOS_DATA.map((video) => {
                const isSelected = video.id === selectedVideoId;
                return (
                  <div
                    key={video.id}
                    onClick={() => selectAndScrollToReader(video.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectAndScrollToReader(video.id);
                    }}
                    className={`cursor-pointer rounded-xl border p-3 transition flex gap-3 items-center ${
                      isSelected
                        ? darkMode
                          ? 'bg-[#1C2636] border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                          : 'bg-[#FBF8F3] border-[#B48327] ring-2 ring-[#B48327]/30'
                        : darkMode
                        ? 'bg-[#121822] border-[#263246] hover:border-[#D4AF37]/40'
                        : 'bg-[#FBF8F3] border-[#B48327]/20 hover:border-[#B48327]/50'
                    }`}
                  >
                    <img
                      src={video.thumbnail}
                      alt={getVideoTitle(video)}
                      className="w-20 h-14 object-cover rounded-lg shrink-0 bg-black"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48327]">
                          Video {video.videoNumber} • {video.duration}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                        {getVideoTitle(video)}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Video Title & Reader Toolbar */}
        <div className="pt-3 border-t border-[#B48327]/15 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#B48327]">
                {getVideoCategory(activeVideo)}
              </span>
              <span className={subText}>• {activeVideo.speaker}</span>
              <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-[#B48327]/15 text-[#B48327] font-semibold">
                {activeVideo.duration}
              </span>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#B48327] hover:underline"
              >
                YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h2 className="font-display text-lg sm:text-2xl font-bold leading-snug">
              {getVideoTitle(activeVideo)}
            </h2>
          </div>

          {/* Language Picker (EN | FR | MG) + Font Size + Search */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 3-Language Choice (EN | FR | MG) */}
            <div
              className={`inline-flex rounded-xl p-1 border ${
                darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#EAE1D3]/70 border-[#B48327]/25'
              }`}
            >
              {(
                [
                  { id: 'en', label: '🇬🇧 EN' },
                  { id: 'fr', label: '🇫🇷 FR' },
                  { id: 'mg', label: '🇲🇬 MG' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLanguageMode(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    uiLang === tab.id
                      ? 'bg-[#B48327] text-white shadow-sm'
                      : `${subText} hover:text-[#B48327]`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scope Filter */}
            <div
              className={`inline-flex rounded-xl p-1 border ${
                darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#EAE1D3]/70 border-[#B48327]/20'
              }`}
            >
              {(
                [
                  { id: 'all', en: 'All', fr: 'Tout', mg: 'Rehetra' },
                  { id: 'structured', en: 'Chapters', fr: 'Chapitres', mg: 'Toko' },
                  { id: 'verbatim', en: 'Full Text', fr: 'Intégral', mg: 'Teny Rehetra' },
                ] as const
              ).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setReaderScope(sc.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    readerScope === sc.id
                      ? 'bg-[#1E293B] text-amber-200 shadow-sm'
                      : `${subText} hover:text-[#B48327]`
                  }`}
                >
                  {uiLang === 'mg' ? sc.mg : uiLang === 'fr' ? sc.fr : sc.en}
                </button>
              ))}
            </div>

            {/* Font Scale Controls */}
            <div
              className={`inline-flex items-center rounded-xl p-1 border ${
                darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#EAE1D3]/70 border-[#B48327]/20'
              }`}
              title="Adjust Reading Font Size"
            >
              {(['sm', 'md', 'lg', 'xl'] as FontScale[]).map((sz, idx) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFontScale(sz)}
                  className={`px-2 py-1 rounded-lg text-xs font-serif font-bold transition ${
                    fontScale === sz
                      ? 'bg-[#B48327] text-white'
                      : `${subText} hover:text-[#B48327]`
                  }`}
                >
                  A{idx === 0 ? '-' : idx === 1 ? '' : idx === 2 ? '+' : '++'}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-52 min-w-[160px]">
              <Search className="w-3.5 h-3.5 text-[#B48327] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  uiLang === 'mg'
                    ? 'Hikaroka teny...'
                    : uiLang === 'fr'
                    ? 'Rechercher...'
                    : 'Search prayers...'
                }
                className={`w-full pl-8 pr-7 py-1.5 rounded-xl text-xs border outline-none transition ${
                  darkMode
                    ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB] focus:border-[#D4AF37]'
                    : 'bg-[#FBF8F3] border-[#B48327]/30 text-[#1C1917] focus:border-[#B48327]'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#57534E] hover:text-[#7C2D12]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Embedded YouTube Player (only when toggled open) */}
        {showVideoPlayer && (
          <div className="pt-2">
            <div className="rounded-xl overflow-hidden border border-[#B48327]/30 bg-black aspect-video max-w-3xl mx-auto shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                title={activeVideo.title_en}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Mobile Horizontal Chapter Jump Chips (Never blocks vertical screen space on phones!) */}
        <div className="lg:hidden pt-2 border-t border-[#B48327]/15">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48327] flex items-center gap-1">
              <ListOrdered className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? `Fizahan-takelaka (${activeVideo.chapters.length} Toko)`
                : uiLang === 'fr'
                ? `Accès Rapide aux Chapitres (${activeVideo.chapters.length})`
                : `Quick Jump to Chapters (${activeVideo.chapters.length})`}
            </span>
            <button
              type="button"
              onClick={() => setShowMobileChapters(!showMobileChapters)}
              className="text-[11px] font-semibold text-[#B48327] underline"
            >
              {showMobileChapters
                ? uiLang === 'mg'
                  ? 'Afenina ny Lohateny'
                  : uiLang === 'fr'
                  ? 'Masquer la Liste'
                  : 'Hide Titles'
                : uiLang === 'mg'
                ? 'Asehoy ny Lohateny'
                : uiLang === 'fr'
                ? 'Voir les Titres'
                : 'Show Titles'}
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {activeVideo.chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-semibold shrink-0 border transition ${
                  darkMode
                    ? 'bg-[#0F141C] border-[#263246] text-amber-200 hover:border-[#D4AF37]'
                    : 'bg-[#FBF8F3] border-[#B48327]/25 text-[#7C2D12] hover:bg-[#EAE1D3]'
                }`}
              >
                {ch.number} ({ch.timestamp.split('–')[0].trim()})
              </a>
            ))}
            <a
              href="#verbatim-section"
              className="px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 bg-[#B48327] text-white"
            >
              ✦ {uiLang === 'mg' ? 'Teny Rehetra' : uiLang === 'fr' ? 'Texte Intégral' : 'Full Transcript'}
            </a>
          </div>

          {showMobileChapters && (
            <div className="mt-2 space-y-1 max-h-48 overflow-y-auto pr-1">
              {activeVideo.chapters.map((ch) => {
                const chTitle =
                  uiLang === 'mg'
                    ? CHAPTER_MG_MAP[ch.id]?.title_mg || ch.title_en
                    : uiLang === 'fr'
                    ? ch.title_fr
                    : ch.title_en;
                return (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    onClick={() => setShowMobileChapters(false)}
                    className={`block px-2.5 py-1.5 rounded-lg text-xs border ${
                      darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#FBF8F3] border-[#B48327]/20'
                    }`}
                  >
                    <strong className="text-[#B48327] mr-1.5">{ch.number}.</strong>
                    {chTitle}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN READING AREA (IMMEDIATELY VISIBLE ON MOBILE PHONES & DESKTOP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop-Only Left Sticky Sidebar (Hidden on mobile so it never blocks phone screens!) */}
        <aside
          className={`hidden lg:block lg:col-span-3 rounded-2xl border p-4 ${cardSurface} lg:sticky lg:top-20 space-y-5 max-h-[82vh] overflow-y-auto`}
        >
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#B48327] flex items-center gap-1.5 mb-2.5">
              <ListOrdered className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? 'Fizahan-takelaka & Toko'
                : uiLang === 'fr'
                ? 'Sommaire des Mouvements'
                : 'Chapters & Movements'}
            </h4>
            <nav className="space-y-1.5">
              {activeVideo.chapters.map((ch) => {
                const chTitle =
                  uiLang === 'mg'
                    ? CHAPTER_MG_MAP[ch.id]?.title_mg || ch.title_en
                    : uiLang === 'fr'
                    ? ch.title_fr
                    : ch.title_en;
                return (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    className={`block px-3 py-2 rounded-xl text-xs transition border border-transparent ${
                      darkMode
                        ? 'hover:bg-[#1C2636] hover:border-[#D4AF37]/30'
                        : 'hover:bg-[#EAE1D3]/80 hover:border-[#B48327]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono-code text-[11px] text-[#7C2D12] dark:text-[#D4AF37] font-semibold">
                      <span>
                        {uiLang === 'mg' ? 'TOKO' : uiLang === 'fr' ? 'MOUVEMENT' : 'MOVEMENT'}{' '}
                        {ch.number}
                      </span>
                      <span>{ch.timestamp}</span>
                    </div>
                    <p className="font-semibold mt-0.5 line-clamp-2">{chTitle}</p>
                  </a>
                );
              })}
              <a
                href="#verbatim-section"
                className={`block px-3 py-2 rounded-xl text-xs font-semibold transition border border-[#B48327]/30 mt-2 ${
                  darkMode
                    ? 'bg-[#1C2636]/70 text-[#D4AF37] hover:bg-[#1C2636]'
                    : 'bg-[#EAE1D3]/60 text-[#7C2D12] hover:bg-[#EAE1D3]'
                }`}
              >
                ✦{' '}
                {uiLang === 'mg'
                  ? 'Transcription Feno (Teny Rehetra)'
                  : uiLang === 'fr'
                  ? 'Transcription Verbatim Intégrale'
                  : 'Full Verbatim Transcript'}
              </a>
            </nav>
          </div>

          {/* Key Scriptures in this Video */}
          <div className="pt-4 border-t border-[#B48327]/15">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#B48327] mb-2">
              {uiLang === 'mg'
                ? 'Soratra Masina Fototra'
                : uiLang === 'fr'
                ? 'Écritures Clés Citées'
                : 'Key Scriptures Cited'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeVideo.keyScriptures.map((sc) => (
                <span
                  key={sc}
                  className={`px-2 py-0.5 rounded-md font-mono-code text-[11px] border ${
                    darkMode
                      ? 'bg-[#0F141C] border-[#263246] text-amber-200/90'
                      : 'bg-[#FBF8F3] border-[#B48327]/25 text-[#7C2D12]'
                  }`}
                >
                  {sc}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Reading Canvas */}
        <div className="lg:col-span-9 space-y-6">
          {/* Overview Banner in Chosen Language (EN, FR, or MG) */}
          <div className={`rounded-2xl border p-4 sm:p-6 ${mainSurface} shadow-sm`}>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48327] block mb-1.5">
              {uiLang === 'mg'
                ? 'Famintinana ny Vavaka sy Fampianarana (Malagasy)'
                : uiLang === 'fr'
                ? 'Synthèse Dévotionnelle (Français)'
                : 'Devotional Synopsis (English)'}
            </span>
            <p className={`font-reading text-sm sm:text-base leading-relaxed ${subText}`}>
              {getVideoOverview(activeVideo)}
            </p>
          </div>

          {/* PART A: Structured Chapters & Prophetic Declarations */}
          {(readerScope === 'all' || readerScope === 'structured') && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#B48327]" />
                  {uiLang === 'mg'
                    ? 'Toko sy Fanambarana Ara-paminaniana'
                    : uiLang === 'fr'
                    ? 'Chapitres Thématiques & Déclarations Prophétiques'
                    : 'Thematic Chapters & Prophetic Declarations'}
                </h3>
                <span className={`text-xs font-mono-code ${subText}`}>
                  {filteredChapters.length} / {activeVideo.chapters.length}
                </span>
              </div>

              {filteredChapters.map((ch) => {
                const isBookmarked = bookmarkedIds.includes(ch.id);
                const mgCh = CHAPTER_MG_MAP[ch.id];
                const chapterTitle =
                  uiLang === 'mg'
                    ? mgCh?.title_mg || ch.title_en
                    : uiLang === 'fr'
                    ? ch.title_fr
                    : ch.title_en;
                const chapterBody =
                  uiLang === 'mg'
                    ? mgCh?.mg_text || ch.en_text
                    : uiLang === 'fr'
                    ? ch.fr_text
                    : ch.en_text;
                const chapterDecree =
                  uiLang === 'mg'
                    ? mgCh?.declaration_mg || ch.declaration_en
                    : uiLang === 'fr'
                    ? ch.declaration_fr
                    : ch.declaration_en;

                return (
                  <article
                    id={ch.id}
                    key={ch.id}
                    className={`rounded-2xl border p-4 sm:p-7 ${mainSurface} shadow-sm transition hover:border-[#B48327]/45 space-y-4 scroll-mt-24`}
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-[#B48327]/15">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md font-display font-bold text-sm bg-[#7C2D12] text-amber-100">
                            {ch.number}
                          </span>
                          <span className="font-mono-code text-xs px-2.5 py-0.5 rounded-md bg-[#B48327]/15 text-[#B48327] font-semibold">
                            {ch.timestamp}
                          </span>
                          {ch.scriptures.map((sc) => (
                            <span
                              key={sc}
                              className={`font-mono-code text-[11px] px-2 py-0.5 rounded border ${
                                darkMode
                                  ? 'bg-[#171F2C] border-[#263246] text-amber-200'
                                  : 'bg-[#F3EDE2] border-[#B48327]/25 text-[#7C2D12]'
                              }`}
                            >
                              {sc}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-display text-xl sm:text-2xl font-bold pt-1">
                          {chapterTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              ch.id,
                              `${chapterTitle}\n\n${chapterBody}\n\n${chapterDecree}`
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            darkMode
                              ? 'border-[#263246] hover:bg-[#171F2C]'
                              : 'border-[#B48327]/25 bg-[#F3EDE2] hover:bg-[#EAE1D3]'
                          }`}
                        >
                          {copiedKey === ch.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              {uiLang === 'mg' ? 'Voadikao' : uiLang === 'fr' ? 'Copié' : 'Copied'}
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                              {uiLang === 'mg' ? 'Adikao' : uiLang === 'fr' ? 'Copier' : 'Copy'}
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onToggleBookmark(
                              ch.id,
                              chapterTitle,
                              ch.declaration_en,
                              ch.declaration_fr,
                              ch.scriptures.join(', ')
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            isBookmarked
                              ? 'bg-[#B48327] text-white border-[#B48327]'
                              : darkMode
                              ? 'border-[#263246] hover:bg-[#171F2C]'
                              : 'border-[#B48327]/25 bg-[#F3EDE2] hover:bg-[#EAE1D3]'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          {isBookmarked
                            ? uiLang === 'mg'
                              ? 'Voatahiry'
                              : uiLang === 'fr'
                              ? 'Sauvegardé'
                              : 'Saved'
                            : uiLang === 'mg'
                            ? 'Tehirizo'
                            : uiLang === 'fr'
                            ? 'Sauvegarder'
                            : 'Save'}
                        </button>
                      </div>
                    </div>

                    {/* Clean Single-Language Chapter Body & Prophetic Decree */}
                    <div className="space-y-4">
                      <p className={`font-reading ${fontSizeClass}`}>
                        {chapterBody}
                      </p>
                      <div
                        className={`p-4 sm:p-5 rounded-xl border-l-4 border-[#B48327] ${
                          darkMode ? 'bg-[#171F2C]' : 'bg-[#F3EDE2]/90'
                        }`}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                          ✦{' '}
                          {uiLang === 'mg'
                            ? 'Fanambarana Ara-paminaniana (Tonony amin’ny Feo Avo)'
                            : uiLang === 'fr'
                            ? 'Déclaration Prophétique (À Proclamer à Haute Voix)'
                            : 'Prophetic Declaration (Speak Aloud)'}
                        </span>
                        <p className="font-display italic font-semibold text-base sm:text-lg leading-relaxed">
                          “{chapterDecree}”
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* PART B: Full Unabridged Verbatim Transcription in Selected Language (EN, FR, or MG) */}
          {(readerScope === 'all' || readerScope === 'verbatim') && rawTranscript && (
            <section
              id="verbatim-section"
              className={`rounded-2xl border p-4 sm:p-8 ${mainSurface} shadow-sm space-y-5 scroll-mt-24`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#B48327]/20">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C2D12] dark:text-[#D4AF37]">
                    {uiLang === 'mg'
                      ? `Transcription Feno • Video ${activeVideo.videoNumber} (${activeVideo.duration})`
                      : uiLang === 'fr'
                      ? `Texte Intégral Verbatim • Vidéo ${activeVideo.videoNumber} (${activeVideo.duration})`
                      : `Complete Unabridged Verbatim Transcript • Video ${activeVideo.videoNumber} (${activeVideo.duration})`}
                  </span>
                  <h3 className="font-display text-xl sm:text-3xl font-bold mt-1">
                    {uiLang === 'mg'
                      ? 'Vavaka sy Fanambarana Feno amin’ny Teny Malagasy (MG)'
                      : uiLang === 'fr'
                      ? 'Transcription Complète en Français (FR)'
                      : 'Complete Word-for-Word Transcription in English (EN)'}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy('verbatim-active', activeRawFullText)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                      darkMode
                        ? 'border-[#263246] bg-[#171F2C] hover:border-[#D4AF37]'
                        : 'border-[#B48327]/30 bg-[#F3EDE2] hover:bg-[#EAE1D3]'
                    }`}
                  >
                    {copiedKey === 'verbatim-active' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {uiLang === 'mg'
                          ? 'Voadikao ny Teny Rehetra'
                          : uiLang === 'fr'
                          ? 'Texte Intégral Copié'
                          : 'Copied Full Transcript'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                        {uiLang === 'mg'
                          ? 'Adikao ny Vavaka Rehetra (MG)'
                          : uiLang === 'fr'
                          ? 'Copier Tout le Texte (FR)'
                          : 'Copy Full Transcript (EN)'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="py-2 px-3.5 rounded-xl bg-[#B48327] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-between shadow-sm">
                  <span>
                    {uiLang === 'mg'
                      ? '🇲🇬 Transcription Feno amin’ny Teny Malagasy'
                      : uiLang === 'fr'
                      ? '🇫🇷 Transcription Intégrale en Français'
                      : '🇬🇧 Full Verbatim Transcript in English'}
                  </span>
                  <span>
                    {activeParagraphs.length}{' '}
                    {uiLang === 'mg'
                      ? 'Fizarana'
                      : uiLang === 'fr'
                      ? 'Paragraphes'
                      : 'Paragraphs'}
                  </span>
                </div>

                {activeParagraphs.map((para, i) => (
                  <div
                    key={`para-${uiLang}-${i}`}
                    className={`p-4 sm:p-5 rounded-xl border ${
                      darkMode
                        ? 'bg-[#171F2C]/60 border-[#263246]'
                        : 'bg-[#F3EDE2]/60 border-[#B48327]/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono-code text-[11px] font-bold text-[#B48327]">
                        [{uiLang.toUpperCase()} • #{i + 1}]
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(`p-${i}`, para)}
                        className={`text-[11px] inline-flex items-center gap-1 ${subText} hover:text-[#B48327]`}
                      >
                        {copiedKey === `p-${i}` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <p className={`font-reading ${fontSizeClass}`}>{para}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. BOTTOM SESSION DIRECTORY (Placed BELOW the prayers so it never blocks reading on mobile phones!) */}
          <section className={`rounded-2xl border p-4 sm:p-6 ${cardSurface} space-y-5 mt-8`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#B48327]/15 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B48327]">
                  {uiLang === 'mg'
                    ? '✦ Ireo Fotoam-bavaka 9 (Tsindrio ny Video Hifindrana)'
                    : uiLang === 'fr'
                    ? '✦ Catalogue des 9 Sessions Vidéo (Cliquez pour Changer de Prière)'
                    : '✦ All 9 Prayer Video Sessions (Tap Any Session to Switch & Read)'}
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold mt-0.5">
                  {uiLang === 'mg'
                    ? 'Misafidiana Fotoam-bavaka Hafa'
                    : uiLang === 'fr'
                    ? 'Choisir une Autre Session Vidéo'
                    : 'Switch to Another Video Session'}
                </h4>
              </div>
              <a
                href="downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition self-start"
              >
                <Download className="w-3.5 h-3.5" />
                {uiLang === 'mg'
                  ? 'Sintomy ny Boky .DOCX'
                  : uiLang === 'fr'
                  ? 'Télécharger Pack .DOCX'
                  : 'Download Master .DOCX'}
              </a>
            </div>

            {/* 3 Primary Videos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS_DATA.map((video) => {
                const isSelected = video.id === selectedVideoId;
                return (
                  <div
                    key={video.id}
                    onClick={() => selectAndScrollToReader(video.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectAndScrollToReader(video.id);
                    }}
                    className={`cursor-pointer rounded-xl border p-3.5 transition flex flex-col justify-between ${
                      isSelected
                        ? darkMode
                          ? 'bg-[#1C2636] border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                          : 'bg-[#FBF8F3] border-[#B48327] ring-2 ring-[#B48327]/30'
                        : darkMode
                        ? 'bg-[#121822] border-[#263246] hover:border-[#D4AF37]/40'
                        : 'bg-[#FBF8F3] border-[#B48327]/20 hover:border-[#B48327]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B48327] text-white">
                          Video {video.videoNumber} • EN/FR/MG
                        </span>
                        <span className="text-xs font-mono-code font-bold text-[#B48327]">
                          {video.duration}
                        </span>
                      </div>
                      <h5 className="font-display font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-1">
                        {getVideoTitle(video)}
                      </h5>
                      <p className={`text-xs ${subText} line-clamp-2`}>
                        {getVideoTagline(video)}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#B48327]/15 flex items-center justify-between text-xs font-bold text-[#B48327]">
                      <span>{video.channel}</span>
                      <span>
                        {isSelected
                          ? uiLang === 'mg'
                            ? '✓ Eo am-pamakiana'
                            : uiLang === 'fr'
                            ? '✓ En lecture'
                            : '✓ Reading Now'
                          : uiLang === 'mg'
                          ? 'Vakio →'
                          : uiLang === 'fr'
                          ? 'Lire →'
                          : 'Read →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 6 Companion Sessions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {COMPANION_VIDEOS_DATA.map((video) => {
                const isSelected = video.id === selectedVideoId;
                return (
                  <div
                    key={video.id}
                    onClick={() => selectAndScrollToReader(video.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectAndScrollToReader(video.id);
                    }}
                    className={`cursor-pointer rounded-xl border p-3 transition flex flex-col justify-between ${
                      isSelected
                        ? darkMode
                          ? 'bg-[#1C2636] border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                          : 'bg-[#FBF8F3] border-[#B48327] ring-2 ring-[#B48327]/30'
                        : darkMode
                        ? 'bg-[#121822]/80 border-[#263246] hover:border-[#D4AF37]/40'
                        : 'bg-[#FBF8F3]/80 border-[#B48327]/20 hover:border-[#B48327]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B48327]/20 text-[#B48327]">
                          Video {video.videoNumber} • EN/FR/MG
                        </span>
                        <span className="text-[11px] font-mono-code font-semibold text-[#B48327]">
                          {video.duration}
                        </span>
                      </div>
                      <h5 className="font-display font-bold text-sm leading-snug line-clamp-2">
                        {getVideoTitle(video)}
                      </h5>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#B48327]/10 flex items-center justify-between text-[11px] font-bold text-[#B48327]">
                      <span>{video.channel}</span>
                      <span>
                        {isSelected
                          ? '✓'
                          : uiLang === 'mg'
                          ? 'Vakio →'
                          : uiLang === 'fr'
                          ? 'Lire →'
                          : 'Read →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
