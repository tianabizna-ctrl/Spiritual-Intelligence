import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Languages,
  ListOrdered,
  Play,
  Search,
  Sparkles,
  Bookmark,
  Video,
  Volume2,
  X,
} from 'lucide-react';
import {
  VIDEOS_DATA,
  LanguageMode,
  UILang,
  VideoResource,
} from '../data/spiritualData';
import { RAW_TRANSCRIPTS } from '../data/rawTranscripts';

interface TranscriptionsViewProps {
  uiLang: UILang;
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  darkMode: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, textEn: string, textFr: string, ref: string) => void;
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
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(VIDEOS_DATA[0].id);
  const [readerScope, setReaderScope] = useState<ReaderScope>('all');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeVideo: VideoResource = useMemo(
    () => VIDEOS_DATA.find((v) => v.id === selectedVideoId) || VIDEOS_DATA[0],
    [selectedVideoId]
  );

  const rawTranscript = RAW_TRANSCRIPTS[activeVideo.id];

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
    return activeVideo.chapters.filter(
      (ch) =>
        ch.title_en.toLowerCase().includes(q) ||
        ch.title_fr.toLowerCase().includes(q) ||
        ch.en_text.toLowerCase().includes(q) ||
        ch.fr_text.toLowerCase().includes(q) ||
        ch.declaration_en.toLowerCase().includes(q) ||
        ch.declaration_fr.toLowerCase().includes(q) ||
        ch.scriptures.some((s) => s.toLowerCase().includes(q))
    );
  }, [activeVideo, searchQuery]);

  const filteredVerbatimPairs = useMemo(() => {
    if (!rawTranscript) return [];
    const maxLen = Math.max(rawTranscript.en_paragraphs.length, rawTranscript.fr_paragraphs.length);
    const pairs: { index: number; en: string; fr: string }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const en = rawTranscript.en_paragraphs[i] || '';
      const fr = rawTranscript.fr_paragraphs[i] || '';
      if (!searchQuery.trim()) {
        pairs.push({ index: i + 1, en, fr });
      } else {
        const q = searchQuery.toLowerCase();
        if (en.toLowerCase().includes(q) || fr.toLowerCase().includes(q)) {
          pairs.push({ index: i + 1, en, fr });
        }
      }
    }
    return pairs;
  }, [rawTranscript, searchQuery]);

  const showEn = languageMode === 'both' || languageMode === 'en';
  const showFr = languageMode === 'both' || languageMode === 'fr';

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/90 border-[#B48327]/20 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  return (
    <div className="space-y-8">
      {/* Section Header & Source Videos Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#B48327]">
              <BookOpen className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? 'Bibliothèque des 3 Transcriptions Sacrées (Anglais & Français)'
                : 'Sacred 3-Video Transcription Library (English & French)'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-1">
              {uiLang === 'fr'
                ? 'Sélectionnez une Session Vidéo à Étudier et Prier'
                : 'Select a Video Session to Read, Study & Pray'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              download="Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? 'Télécharger Pack Maître .DOCX (EN + FR)'
                : 'Download Master .DOCX (EN + FR)'}
            </a>
            <a
              href="/downloads/Spiritual_Intelligence_DOCX_Transcriptions_Package.zip"
              download="Spiritual_Intelligence_DOCX_Transcriptions_Package.zip"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
                darkMode
                  ? 'border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  : 'border-[#B48327]/40 text-[#7C2D12] bg-[#F3EDE2] hover:bg-[#EAE1D3]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {uiLang === 'fr' ? 'Pack Complet .ZIP (6 .DOCX)' : 'Full .ZIP Package (6 .DOCX)'}
            </a>
          </div>
        </div>

        {/* 3 Video Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {VIDEOS_DATA.map((video) => {
            const isSelected = video.id === selectedVideoId;
            return (
              <div
                key={video.id}
                onClick={() => setSelectedVideoId(video.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedVideoId(video.id);
                }}
                className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? darkMode
                      ? 'bg-[#1C2636] border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-lg'
                      : 'bg-[#F3EDE2] border-[#B48327] ring-2 ring-[#B48327]/30 shadow-md'
                    : `${cardSurface} hover:border-[#B48327]/50`
                }`}
              >
                <div>
                  {/* Thumbnail + Badges */}
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-3.5 bg-[#1E293B]">
                    <img
                      src={video.thumbnail}
                      alt={video.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#B48327] text-white shadow">
                        {uiLang === 'fr' ? `Vidéo ${video.videoNumber}` : `Video ${video.videoNumber}`}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/70 text-amber-200 backdrop-blur-sm">
                        EN • FR
                      </span>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-mono-code font-semibold bg-black/80 text-white">
                      {video.duration}
                    </span>
                    <div className="absolute bottom-2.5 left-2.5 right-16">
                      <p className="text-[11px] text-amber-200/95 font-medium truncate">
                        {uiLang === 'fr' ? video.watchCategory_fr : video.watchCategory_en}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg leading-snug line-clamp-2 mb-1.5">
                    {uiLang === 'fr' ? video.title_fr : video.title_en}
                  </h3>
                  <p className={`text-xs ${subText} mb-2 font-medium`}>
                    {video.speaker} • {video.channel} ({video.channelHandle})
                  </p>
                  <p className={`text-xs ${subText} line-clamp-2 mb-3`}>
                    {uiLang === 'fr' ? video.tagline_fr : video.tagline_en}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-[#B48327]/15 flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-semibold inline-flex items-center gap-1.5 ${
                      isSelected ? 'text-[#B48327]' : subText
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isSelected
                      ? uiLang === 'fr'
                        ? 'Transcription Active'
                        : 'Active Transcription'
                      : uiLang === 'fr'
                      ? 'Lire la Transcription'
                      : 'Read Transcription'}
                  </span>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={video.docxFile}
                      download
                      title={uiLang === 'fr' ? 'Télécharger le DOCX de cette vidéo' : 'Download Video DOCX'}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        darkMode
                          ? 'border-[#263246] hover:bg-[#263246] text-[#D4AF37]'
                          : 'border-[#B48327]/25 hover:bg-[#EAE1D3] text-[#7C2D12]'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Watch on YouTube"
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        darkMode
                          ? 'border-[#263246] hover:bg-[#263246] text-[#A8A29E]'
                          : 'border-[#B48327]/25 hover:bg-[#EAE1D3] text-[#57534E]'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reader Control Bar */}
      <div className={`rounded-2xl border p-4 sm:p-5 ${cardSurface} shadow-sm space-y-4`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Active Video Title & Metadata */}
          <div className="space-y-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7C2D12] text-amber-100">
                {uiLang === 'fr' ? `VIDÉO ${activeVideo.videoNumber}` : `VIDEO ${activeVideo.videoNumber}`}
              </span>
              <span className="font-mono-code text-xs px-2 py-0.5 rounded bg-[#B48327]/15 text-[#B48327] font-semibold">
                {activeVideo.duration}
              </span>
              <span className={`text-xs ${subText}`}>
                {activeVideo.channel} • {activeVideo.uploadedAt}
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
            <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
              {showEn ? activeVideo.title_en : activeVideo.title_fr}
            </h3>
            {showEn && showFr && (
              <p className="font-display italic text-base text-[#B48327]">
                FR : {activeVideo.title_fr}
              </p>
            )}
          </div>

          {/* Watch Embedded Player + Single Video DOCX Download */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowVideoPlayer(!showVideoPlayer)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                showVideoPlayer
                  ? 'bg-[#7C2D12] text-white border-[#7C2D12]'
                  : darkMode
                  ? 'border-[#263246] bg-[#121822] text-[#F5F2EB] hover:border-[#D4AF37]'
                  : 'border-[#B48327]/35 bg-[#FBF8F3] text-[#1C1917] hover:bg-[#EAE1D3]'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#B48327]" />
              {showVideoPlayer
                ? uiLang === 'fr'
                  ? 'Masquer le Lecteur YouTube'
                  : 'Hide YouTube Player'
                : uiLang === 'fr'
                ? 'Écouter / Voir la Vidéo'
                : 'Watch / Listen Along'}
            </button>

            <a
              href={activeVideo.docxFile}
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? `Télécharger DOCX Vidéo ${activeVideo.videoNumber}`
                : `Download Video ${activeVideo.videoNumber} DOCX`}
            </a>
          </div>
        </div>

        {/* Optional Embedded YouTube Player */}
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

        {/* Filter & Typography Toolbar */}
        <div className="pt-3 border-t border-[#B48327]/15 flex flex-wrap items-center justify-between gap-3">
          {/* Language Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${subText}`}>
              <Languages className="w-3.5 h-3.5 text-[#B48327]" />
              {uiLang === 'fr' ? 'Langue de Transcription :' : 'Transcription Language:'}
            </span>
            <div
              className={`inline-flex rounded-xl p-1 border ${
                darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#EAE1D3]/70 border-[#B48327]/20'
              }`}
            >
              {(
                [
                  { id: 'both', label_en: 'EN + FR Parallel', label_fr: 'Bilingue EN + FR' },
                  { id: 'en', label_en: 'English Only (EN)', label_fr: 'Anglais (EN)' },
                  { id: 'fr', label_en: 'Français Only (FR)', label_fr: 'Français (FR)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLanguageMode(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    languageMode === tab.id
                      ? 'bg-[#B48327] text-white shadow-sm'
                      : `${subText} hover:text-[#B48327]`
                  }`}
                >
                  {uiLang === 'fr' ? tab.label_fr : tab.label_en}
                </button>
              ))}
            </div>
          </div>

          {/* Content Scope Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`inline-flex rounded-xl p-1 border ${
                darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#EAE1D3]/70 border-[#B48327]/20'
              }`}
            >
              {(
                [
                  { id: 'all', label_en: 'Chapters + Full Verbatim', label_fr: 'Chapitres + Texte Intégral' },
                  { id: 'structured', label_en: 'Structured Chapters', label_fr: 'Chapitres & Prières' },
                  { id: 'verbatim', label_en: 'Full Verbatim Transcript', label_fr: 'Transcription Intégrale' },
                ] as const
              ).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setReaderScope(sc.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    readerScope === sc.id
                      ? 'bg-[#1E293B] text-amber-200 shadow-sm'
                      : `${subText} hover:text-[#B48327]`
                  }`}
                >
                  {uiLang === 'fr' ? sc.label_fr : sc.label_en}
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
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#B48327] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                uiLang === 'fr'
                  ? 'Rechercher dans la transcription...'
                  : 'Search in transcription (EN / FR)...'
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

      {/* Main Two-Column Sanctuary Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sticky Sidebar: Chapters & Scripture Index */}
        <aside className={`lg:col-span-3 rounded-2xl border p-4 ${cardSurface} lg:sticky lg:top-20 space-y-5`}>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#B48327] flex items-center gap-1.5 mb-2.5">
              <ListOrdered className="w-3.5 h-3.5" />
              {uiLang === 'fr' ? 'Sommaire des Mouvements' : 'Chapters & Movements'}
            </h4>
            <nav className="space-y-1.5">
              {activeVideo.chapters.map((ch) => (
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
                    <span>MOVEMENT {ch.number}</span>
                    <span>{ch.timestamp}</span>
                  </div>
                  <p className="font-semibold mt-0.5 line-clamp-2">
                    {uiLang === 'fr' ? ch.title_fr : ch.title_en}
                  </p>
                </a>
              ))}
              <a
                href="#verbatim-section"
                className={`block px-3 py-2 rounded-xl text-xs font-semibold transition border border-[#B48327]/30 mt-2 ${
                  darkMode
                    ? 'bg-[#1C2636]/70 text-[#D4AF37] hover:bg-[#1C2636]'
                    : 'bg-[#EAE1D3]/60 text-[#7C2D12] hover:bg-[#EAE1D3]'
                }`}
              >
                ✦ {uiLang === 'fr' ? 'Transcription Verbatim Intégrale (EN/FR)' : 'Full Verbatim Transcript (EN/FR)'}
              </a>
            </nav>
          </div>

          {/* Key Scriptures in this Video */}
          <div className="pt-4 border-t border-[#B48327]/15">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#B48327] mb-2">
              {uiLang === 'fr' ? 'Écritures Clés Citées' : 'Key Scriptures Cited'}
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
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
        <div className="lg:col-span-9 space-y-8">
          {/* Overview Banner */}
          <div className={`rounded-2xl border p-5 sm:p-6 ${mainSurface} shadow-sm`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {showEn && (
                <div className={!showFr ? 'md:col-span-2' : ''}>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48327] block mb-1">
                    Devotional Synopsis (English)
                  </span>
                  <p className={`font-reading text-sm leading-relaxed ${subText}`}>
                    {activeVideo.overview_en}
                  </p>
                </div>
              )}
              {showFr && (
                <div className={!showEn ? 'md:col-span-2' : ''}>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                    Synthèse Dévotionnelle (Français)
                  </span>
                  <p className={`font-reading text-sm leading-relaxed ${subText}`}>
                    {activeVideo.overview_fr}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PART A: Structured Chapters & Prophetic Declarations */}
          {(readerScope === 'all' || readerScope === 'structured') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#B48327]" />
                  {uiLang === 'fr'
                    ? 'Chapitres Thématiques & Déclarations Prophétiques'
                    : 'Thematic Chapters & Prophetic Declarations'}
                </h3>
                <span className={`text-xs font-mono-code ${subText}`}>
                  {filteredChapters.length} / {activeVideo.chapters.length}{' '}
                  {uiLang === 'fr' ? 'sections' : 'chapters'}
                </span>
              </div>

              {filteredChapters.map((ch) => {
                const isBookmarked = bookmarkedIds.includes(ch.id);
                return (
                  <article
                    id={ch.id}
                    key={ch.id}
                    className={`rounded-2xl border p-5 sm:p-7 ${mainSurface} shadow-sm transition hover:border-[#B48327]/45 space-y-5`}
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#B48327]/15">
                      <div className="space-y-1">
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
                        {showEn && (
                          <h4 className="font-display text-xl sm:text-2xl font-bold pt-1">
                            {ch.title_en}
                          </h4>
                        )}
                        {showFr && (
                          <p
                            className={`font-display ${
                              showEn ? 'italic text-lg text-[#B48327]' : 'text-xl sm:text-2xl font-bold pt-1'
                            }`}
                          >
                            {ch.title_fr}
                          </p>
                        )}
                      </div>

                      {/* Copy & Bookmark Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              ch.id,
                              `${ch.title_en}\n${ch.en_text}\nDecree: ${ch.declaration_en}\n\n${ch.title_fr}\n${ch.fr_text}\nDécret : ${ch.declaration_fr}`
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
                              {uiLang === 'fr' ? 'Copié' : 'Copied'}
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                              {uiLang === 'fr' ? 'Copier' : 'Copy'}
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onToggleBookmark(
                              ch.id,
                              uiLang === 'fr' ? ch.title_fr : ch.title_en,
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
                            ? uiLang === 'fr'
                              ? 'Sauvegardé'
                              : 'Saved'
                            : uiLang === 'fr'
                            ? 'Sauvegarder'
                            : 'Save'}
                        </button>
                      </div>
                    </div>

                    {/* Bilingual Parallel or Single-Language Body */}
                    <div
                      className={`grid grid-cols-1 ${
                        showEn && showFr ? ' lg:grid-cols-2' : ''
                      } gap-6`}
                    >
                      {showEn && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48327]">
                              English Transcription (EN)
                            </span>
                          </div>
                          <p className={`font-reading ${fontSizeClass}`}>
                            {ch.en_text}
                          </p>
                          <div
                            className={`p-4 rounded-xl border-l-4 border-[#B48327] ${
                              darkMode ? 'bg-[#171F2C]' : 'bg-[#F3EDE2]/90'
                            }`}
                          >
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                              ✦ Prophetic Declaration (Speak Aloud)
                            </span>
                            <p className="font-display italic font-semibold text-base sm:text-lg leading-relaxed">
                              “{ch.declaration_en}”
                            </p>
                          </div>
                        </div>
                      )}

                      {showFr && (
                        <div
                          className={`space-y-3 ${
                            showEn && showFr
                              ? 'lg:border-l lg:border-[#B48327]/20 lg:pl-6'
                              : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37]">
                              Transcription Française (FR)
                            </span>
                          </div>
                          <p className={`font-reading ${fontSizeClass}`}>
                            {ch.fr_text}
                          </p>
                          <div
                            className={`p-4 rounded-xl border-l-4 border-[#7C2D12] ${
                              darkMode ? 'bg-[#171F2C]' : 'bg-[#F3EDE2]/90'
                            }`}
                          >
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48327] block mb-1">
                              ✦ Déclaration Prophétique (À Proclamer)
                            </span>
                            <p className="font-display italic font-semibold text-base sm:text-lg leading-relaxed">
                              « {ch.declaration_fr} »
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* PART B: Full Unabridged Verbatim Transcription (Every single paragraph in EN & FR) */}
          {(readerScope === 'all' || readerScope === 'verbatim') && rawTranscript && (
            <section
              id="verbatim-section"
              className={`rounded-2xl border p-5 sm:p-8 ${mainSurface} shadow-sm space-y-6`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#B48327]/20">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C2D12] dark:text-[#D4AF37]">
                    {uiLang === 'fr'
                      ? `Texte Intégral Verbatim • Vidéo ${activeVideo.videoNumber} (${activeVideo.duration})`
                      : `Complete Unabridged Verbatim Transcript • Video ${activeVideo.videoNumber} (${activeVideo.duration})`}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1">
                    {uiLang === 'fr'
                      ? 'Transcription Complète Mot-à-Mot (Anglais & Français)'
                      : 'Complete Word-for-Word Transcription (English & French)'}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {showEn && (
                    <button
                      type="button"
                      onClick={() => handleCopy('verbatim-en', rawTranscript.en_full)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                        darkMode
                          ? 'border-[#263246] bg-[#171F2C] hover:border-[#D4AF37]'
                          : 'border-[#B48327]/30 bg-[#F3EDE2] hover:bg-[#EAE1D3]'
                      }`}
                    >
                      {copiedKey === 'verbatim-en' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied Full EN
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                          Copy Full English
                        </>
                      )}
                    </button>
                  )}

                  {showFr && (
                    <button
                      type="button"
                      onClick={() => handleCopy('verbatim-fr', rawTranscript.fr_full)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                        darkMode
                          ? 'border-[#263246] bg-[#171F2C] hover:border-[#D4AF37]'
                          : 'border-[#B48327]/30 bg-[#F3EDE2] hover:bg-[#EAE1D3]'
                      }`}
                    >
                      {copiedKey === 'verbatim-fr' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          FR Copié
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#7C2D12]" />
                          Copier Tout le Français
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Verbatim Paragraphs */}
              {languageMode === 'both' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Full English Column */}
                  <div className="space-y-4">
                    <div className="sticky top-16 z-10 py-2 px-3 rounded-lg bg-[#B48327] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-between shadow-sm">
                      <span>English Full Verbatim Transcript (EN)</span>
                      <span>{rawTranscript.en_paragraphs.length} Paragraphs</span>
                    </div>
                    {rawTranscript.en_paragraphs
                      .filter(
                        (p) =>
                          !searchQuery.trim() ||
                          p.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((para, i) => (
                        <div
                          key={`en-v-${i}`}
                          className={`p-4 rounded-xl border ${
                            darkMode
                              ? 'bg-[#171F2C]/60 border-[#263246]'
                              : 'bg-[#F3EDE2]/60 border-[#B48327]/15'
                          }`}
                        >
                          <span className="font-mono-code text-[11px] font-semibold text-[#B48327] block mb-1">
                            EN §{i + 1}
                          </span>
                          <p className={`font-reading ${fontSizeClass}`}>{para}</p>
                        </div>
                      ))}
                  </div>

                  {/* Full French Column */}
                  <div className="space-y-4">
                    <div className="sticky top-16 z-10 py-2 px-3 rounded-lg bg-[#7C2D12] text-amber-100 text-xs font-bold uppercase tracking-widest flex items-center justify-between shadow-sm">
                      <span>Transcription Intégrale en Français (FR)</span>
                      <span>{rawTranscript.fr_paragraphs.length} Paragraphes</span>
                    </div>
                    {rawTranscript.fr_paragraphs
                      .filter(
                        (p) =>
                          !searchQuery.trim() ||
                          p.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((para, i) => (
                        <div
                          key={`fr-v-${i}`}
                          className={`p-4 rounded-xl border ${
                            darkMode
                              ? 'bg-[#171F2C]/60 border-[#263246]'
                              : 'bg-[#F3EDE2]/60 border-[#B48327]/15'
                          }`}
                        >
                          <span className="font-mono-code text-[11px] font-semibold text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                            FR §{i + 1}
                          </span>
                          <p className={`font-reading ${fontSizeClass}`}>{para}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                  {(languageMode === 'en'
                    ? rawTranscript.en_paragraphs
                    : rawTranscript.fr_paragraphs
                  )
                    .filter(
                      (p) =>
                        !searchQuery.trim() ||
                        p.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((para, i) => (
                      <div
                        key={`single-v-${i}`}
                        className={`p-5 rounded-xl border ${
                          darkMode
                            ? 'bg-[#171F2C]/60 border-[#263246]'
                            : 'bg-[#F3EDE2]/60 border-[#B48327]/15'
                        }`}
                      >
                        <span className="font-mono-code text-[11px] font-semibold text-[#B48327] block mb-1.5">
                          {languageMode.toUpperCase()} • PARAGRAPH {i + 1}
                        </span>
                        <p className={`font-reading ${fontSizeClass}`}>{para}</p>
                      </div>
                    ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
