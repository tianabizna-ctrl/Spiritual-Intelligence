import React, { useState } from 'react';
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
  FolderOpen,
  Layers,
  ListChecks,
  Play,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import {
  DEVOTIONAL_GUIDES,
  DOCX_PACKAGES_LIST,
  LanguageMode,
  PRAYER_ALTAR_CARDS,
  SCRIPTURE_TREASURY,
  UILang,
} from '../data/spiritualData';
import { ALL_VIDEOS_DATA, PLAYLIST_DIRECTORY } from '../data/compendiumData';
import { RAW_TRANSCRIPTS } from '../data/rawTranscripts';

interface MasterCompendiumViewProps {
  uiLang: UILang;
  languageMode: LanguageMode;
  onSelectLanguage: (lang: UILang) => void;
  darkMode: boolean;
  onOpenVideoInReader: (videoId: string) => void;
  onNavigateTab: (tab: 'transcriptions' | 'prayers' | 'devotionals' | 'downloads') => void;
}

export const MasterCompendiumView: React.FC<MasterCompendiumViewProps> = ({
  uiLang,
  languageMode,
  onSelectLanguage,
  darkMode,
  onOpenVideoInReader,
  onNavigateTab,
}) => {
  const [expandedVideoIds, setExpandedVideoIds] = useState<string[]>(['4YElIs15_Ak', 'XWBUBtEv70A', '45wUm7wffBQ']);
  const [showFullRawInCompendium, setShowFullRawInCompendium] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showEn = languageMode === 'both' || languageMode === 'en';
  const showFr = languageMode === 'both' || languageMode === 'fr';

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/90 border-[#B48327]/20 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  const toggleVideoExpand = (id: string) => {
    setExpandedVideoIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAllVideos = () => {
    setExpandedVideoIds(ALL_VIDEOS_DATA.map((v) => v.id));
  };

  const collapseAllVideos = () => {
    setExpandedVideoIds([]);
  };

  const toggleRawTranscript = (id: string) => {
    setShowFullRawInCompendium((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Top Compendium Header */}
      <div className={`rounded-2xl border p-6 sm:p-8 ${mainSurface} shadow-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B48327]/15 text-[#B48327]">
              <Layers className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? 'Répertoire Intégral • Tous les Titres & Contenus (EN & FR)'
                : 'Master Index • All Available Titles & Contents (EN & FR)'}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold">
              {uiLang === 'fr'
                ? 'Catalogue Complet des Titres, Playlists, Chapitres & Transcriptions'
                : 'Complete Directory of All Available Titles, Playlists, Chapters & Contents'}
            </h2>
            <p className={`text-sm sm:text-base ${subText}`}>
              {uiLang === 'fr'
                ? 'Retrouvez sur une seule page tous les titres disponibles dans les 3 playlists YouTube, les 9 sessions intégralement transcrites en anglais et en français (les 3 vidéos principales + 6 sessions compagnons), les 40 chapitres, les 12 prières de l’autel, les 3 guides dévotionnels, les 15 Écritures bilingues et les 7 fichiers .DOCX/.ZIP.'
                : 'View every available video title across all 3 YouTube playlists, all 9 fully transcribed sessions in English and French (the 3 primary requested videos + 6 playlist companion sessions), all 40 chapters, 12 Prayer Altar cards, 3 Devotional Study Guides, 15 Bilingual Scriptures, and 7 downloadable .DOCX/.ZIP files.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Language Choice Pill (EN vs FR) */}
            <div
              className={`inline-flex items-center rounded-xl p-1 border ${
                darkMode ? 'bg-[#171F2C] border-[#263246]' : 'bg-[#F3EDE2] border-[#B48327]/30'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  uiLang === 'en'
                    ? 'bg-[#B48327] text-white shadow-sm'
                    : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#B48327]'
                }`}
              >
                🇬🇧 English (EN)
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('fr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  uiLang === 'fr'
                    ? 'bg-[#B48327] text-white shadow-sm'
                    : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#B48327]'
                }`}
              >
                🇫🇷 Français (FR)
              </button>
            </div>

            <button
              onClick={expandAllVideos}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
            >
              {uiLang === 'fr' ? 'Tout Déplier (9 Vidéos)' : 'Expand All 9 Videos'}
            </button>
            <button
              onClick={collapseAllVideos}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition ${
                darkMode
                  ? 'border-[#263246] text-[#A8A29E] hover:bg-[#1E293B]'
                  : 'border-[#B48327]/30 text-[#57534E] hover:bg-[#EAE1D3]'
              }`}
            >
              {uiLang === 'fr' ? 'Tout Réduire' : 'Collapse All'}
            </button>
            <a
              href="downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
              download
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100 hover:bg-[#62230E] transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {uiLang === 'fr' ? 'Pack Maître .DOCX' : 'Master .DOCX'}
            </a>
          </div>
        </div>

        {/* Summary Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-[#B48327]/15">
          {[
            {
              count: '3 Primary + 6 Companion',
              label_en: '9 Full EN/FR Video Transcripts',
              label_fr: '9 Vidéos Transcrites (EN/FR)',
            },
            {
              count: '3 Playlists • 18 Titles',
              label_en: 'All YouTube Playlist Titles',
              label_fr: 'Tous les Titres des 3 Playlists',
            },
            {
              count: '40 Chapters',
              label_en: 'Bilingual Thematic Movements',
              label_fr: 'Chapitres Thématiques Bilingues',
            },
            {
              count: '12 Altar Prayers',
              label_en: 'Interactive Prayer Watch Cards',
              label_fr: 'Cartes de Prière de l’Autel',
            },
            {
              count: '3 Devotional Guides',
              label_en: 'Bilingual Study Meditations',
              label_fr: 'Guides d’Étude Dévotionnelle',
            },
            {
              count: '15 Scriptures + 7 DOCX',
              label_en: 'KJV / LSG 1910 & Word Files',
              label_fr: 'KJV / LSG 1910 & Fichiers Word',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 ${
                darkMode ? 'bg-[#171F2C]/80 border-[#263246]' : 'bg-[#F3EDE2]/70 border-[#B48327]/20'
              }`}
            >
              <p className="font-display font-bold text-base sm:text-lg text-[#B48327]">
                {stat.count}
              </p>
              <p className={`text-xs ${subText} font-medium`}>
                {uiLang === 'fr' ? stat.label_fr : stat.label_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: ALL 3 YOUTUBE PLAYLISTS & ALL 18 AVAILABLE VIDEO TITLES */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
              {uiLang === 'fr' ? 'Section 1 • Répertoire des 3 Playlists' : 'Section 1 • 3 YouTube Playlists Directory'}
            </span>
            <h3 className="font-display text-2xl font-bold mt-0.5">
              {uiLang === 'fr'
                ? 'Tous les Titres Disponibles dans les 3 Liens & Playlists YouTube (EN & FR)'
                : 'All Available Video Titles Across the 3 Provided YouTube Links & Playlists (EN & FR)'}
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          {PLAYLIST_DIRECTORY.map((playlist, pIdx) => (
            <div key={playlist.playlistId} className={`rounded-2xl border p-5 sm:p-6 ${cardSurface}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#B48327]/15">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#B48327] text-white">
                      {uiLang === 'fr' ? `Playlist ${pIdx + 1}` : `Playlist ${pIdx + 1}`}
                    </span>
                    <span className="text-xs font-mono-code font-semibold text-[#B48327]">
                      ID: {playlist.playlistId}
                    </span>
                    <span className={`text-xs ${subText}`}>• {playlist.channel}</span>
                  </div>
                  <h4 className="font-display text-xl font-bold">
                    {uiLang === 'fr' ? playlist.playlistTitle_fr : playlist.playlistTitle_en}
                  </h4>
                  <p className={`text-xs sm:text-sm ${subText} mt-1`}>
                    {uiLang === 'fr' ? playlist.description_fr : playlist.description_en}
                  </p>
                </div>
                <a
                  href={playlist.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#B48327]/30 text-[#B48327] hover:bg-[#B48327]/10 transition self-start"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {uiLang === 'fr' ? 'Ouvrir la Playlist YouTube' : 'Open YouTube Playlist'}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {playlist.tracks.map((track, tIdx) => (
                  <div
                    key={track.youtubeId}
                    className={`rounded-xl border p-4 flex flex-col justify-between transition ${
                      track.isPrimaryRequested
                        ? darkMode
                          ? 'bg-[#1C2636] border-[#D4AF37]'
                          : 'bg-[#FBF8F3] border-[#B48327] shadow-sm'
                        : darkMode
                        ? 'bg-[#121822]/90 border-[#263246]'
                        : 'bg-[#FBF8F3]/75 border-[#B48327]/20'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B48327]/20 text-[#B48327]">
                            #{tIdx + 1} • {track.duration}
                          </span>
                          {track.isPrimaryRequested && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                              {uiLang === 'fr' ? '★ Vidéo Principale Demandée' : '★ Primary Requested Link'}
                            </span>
                          )}
                          {track.hasFullTranscriptInApp && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-800/20 text-emerald-500 border border-emerald-600/30">
                              {uiLang === 'fr' ? '✓ Transcription EN & FR Complète' : '✓ Full EN & FR Transcript Included'}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono-code opacity-75">
                          {track.youtubeId}
                        </span>
                      </div>

                      {showEn && (
                        <p className="font-display font-bold text-sm sm:text-base leading-snug mb-1">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#B48327] mr-1.5">
                            [EN]
                          </span>
                          {track.title_en}
                        </p>
                      )}
                      {showFr && (
                        <p className="font-display font-semibold text-sm leading-snug text-[#B48327] mb-2">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider mr-1.5">
                            [FR]
                          </span>
                          {track.title_fr}
                        </p>
                      )}

                      <p className={`text-xs ${subText} mt-1`}>
                        {uiLang === 'fr' ? track.summary_fr : track.summary_en}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#B48327]/15 flex flex-wrap items-center justify-between gap-2">
                      {track.hasFullTranscriptInApp ? (
                        <button
                          onClick={() => onOpenVideoInReader(track.youtubeId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          {uiLang === 'fr'
                            ? 'Ouvrir dans le Lecteur Bilingue (EN/FR)'
                            : 'Open in Bilingual Reader (EN/FR)'}
                        </button>
                      ) : (
                        <span className={`text-[11px] italic ${subText}`}>
                          {uiLang === 'fr'
                            ? 'Titre répertorié dans la playlist'
                            : 'Cataloged playlist companion title'}
                        </span>
                      )}

                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#B48327] hover:underline"
                      >
                        YouTube <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: COMPLETE CHAPTER-BY-CHAPTER & FULL VERBATIM CONTENTS OF ALL 9 TRANSCRIBED VIDEOS */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
              {uiLang === 'fr'
                ? 'Section 2 • Toutes les Transcriptions & Chapitres (Vidéos 1 à 9)'
                : 'Section 2 • All 9 Video Transcriptions, Chapters & Declarations'}
            </span>
            <h3 className="font-display text-2xl font-bold mt-0.5">
              {uiLang === 'fr'
                ? 'Contenu Intégral des 9 Vidéos Transcrites (Anglais & Français)'
                : 'Complete Contents of All 9 Transcribed Videos (English & French)'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAllVideos}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#B48327]/15 text-[#B48327] hover:bg-[#B48327]/25 transition"
            >
              {uiLang === 'fr' ? 'Déplier les 9 Vidéos' : 'Expand All 9 Videos'}
            </button>
            <button
              onClick={collapseAllVideos}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#B48327]/25 text-[#B48327] hover:bg-[#B48327]/10 transition"
            >
              {uiLang === 'fr' ? 'Réduire Tout' : 'Collapse All'}
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {ALL_VIDEOS_DATA.map((video) => {
            const isExpanded = expandedVideoIds.includes(video.id);
            const raw = RAW_TRANSCRIPTS[video.id];
            const showRaw = !!showFullRawInCompendium[video.id];

            return (
              <div
                key={video.id}
                className={`rounded-2xl border overflow-hidden transition ${mainSurface}`}
              >
                {/* Video Accordion Header */}
                <div
                  onClick={() => toggleVideoExpand(video.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleVideoExpand(video.id);
                  }}
                  className={`p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#B48327]/15 ${
                    darkMode ? 'hover:bg-[#171F2C]' : 'hover:bg-[#F3EDE2]/70'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B48327] text-white">
                        {uiLang === 'fr' ? `Vidéo ${video.videoNumber}` : `Video ${video.videoNumber}`}
                      </span>
                      {video.videoNumber <= 3 && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                          {uiLang === 'fr' ? 'Vidéo Principale' : 'Primary Requested Video'}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-code font-semibold bg-[#B48327]/15 text-[#B48327]">
                        {video.duration}
                      </span>
                      <span className={`text-xs font-medium ${subText}`}>
                        {video.speaker} • {video.channel}
                      </span>
                      <span className="text-xs font-semibold text-[#B48327]">
                        • {video.chapters.length} {uiLang === 'fr' ? 'Chapitres' : 'Chapters'}
                      </span>
                    </div>

                    {showEn && (
                      <h4 className="font-display text-lg sm:text-xl font-bold leading-snug">
                        <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#B48327] mr-2">
                          [EN]
                        </span>
                        {video.title_en}
                      </h4>
                    )}
                    {showFr && (
                      <h5 className="font-display text-base sm:text-lg font-semibold text-[#B48327] leading-snug">
                        <span className="text-xs font-sans font-bold uppercase tracking-wider mr-2">
                          [FR]
                        </span>
                        {video.title_fr}
                      </h5>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start lg:self-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onOpenVideoInReader(video.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {uiLang === 'fr' ? 'Ouvrir dans le Lecteur' : 'Open in Reader'}
                    </button>
                    <button
                      onClick={() => toggleVideoExpand(video.id)}
                      className={`p-2 rounded-xl border ${
                        darkMode ? 'border-[#263246] text-[#D4AF37]' : 'border-[#B48327]/30 text-[#7C2D12]'
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Video Contents */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* Overview in Selected Language */}
                    <div className={`grid grid-cols-1 ${showEn && showFr ? 'lg:grid-cols-2' : ''} gap-4`}>
                      {showEn && (
                        <div className={`rounded-xl border p-4 ${cardSurface}`}>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#B48327] mb-1">
                            English Executive Summary
                          </p>
                          <p className="text-sm leading-relaxed">{video.overview_en}</p>
                        </div>
                      )}
                      {showFr && (
                        <div className={`rounded-xl border p-4 ${cardSurface}`}>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#B48327] mb-1">
                            Synthèse Exécutive en Français
                          </p>
                          <p className="text-sm leading-relaxed">{video.overview_fr}</p>
                        </div>
                      )}
                    </div>

                    {/* Key Scriptures */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B48327] mr-1">
                        {uiLang === 'fr' ? 'Écritures Clés :' : 'Key Scriptures:'}
                      </span>
                      {video.keyScriptures.map((sc) => (
                        <span
                          key={sc}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#B48327]/15 text-[#B48327]"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>

                    {/* All Chapters Table of Contents & Texts */}
                    <div className="space-y-4">
                      <h5 className="font-display font-bold text-lg border-b border-[#B48327]/20 pb-2">
                        {uiLang === 'fr'
                          ? `Tous les Chapitres & Déclarations (${video.chapters.length} Mouvements — Français)`
                          : `All Chapters & Prophetic Declarations (${video.chapters.length} Movements — English)`}
                      </h5>

                      <div className="space-y-4">
                        {video.chapters.map((ch) => (
                          <div key={ch.id} className={`rounded-xl border p-4 sm:p-5 ${cardSurface}`}>
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#B48327] text-white">
                                  {uiLang === 'fr' ? `Chapitre ${ch.number}` : `Chapter ${ch.number}`}
                                </span>
                                <span className="text-xs font-mono-code font-semibold text-[#B48327]">
                                  {ch.timestamp}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {ch.scriptures.map((s) => (
                                  <span
                                    key={s}
                                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#B48327]/15 text-[#B48327]"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className={`grid grid-cols-1 ${showEn && showFr ? 'lg:grid-cols-2' : ''} gap-4 mt-3`}>
                              {showEn && (
                                <div className="space-y-2">
                                  <h6 className="font-display font-bold text-base text-[#B48327]">
                                    {ch.title_en}
                                  </h6>
                                  <p className="font-serif-body text-sm sm:text-[15px] leading-relaxed">
                                    {ch.en_text}
                                  </p>
                                  <div className="p-3 rounded-lg bg-[#B48327]/10 border-l-4 border-[#B48327] text-xs sm:text-sm">
                                    <span className="font-bold uppercase tracking-wider text-[#B48327] block mb-0.5">
                                      Prophetic Decree (EN):
                                    </span>
                                    <span className="italic">{ch.declaration_en}</span>
                                  </div>
                                </div>
                              )}

                              {showFr && (
                                <div className="space-y-2">
                                  <h6 className="font-display font-bold text-base text-[#B48327]">
                                    {ch.title_fr}
                                  </h6>
                                  <p className="font-serif-body text-sm sm:text-[15px] leading-relaxed">
                                    {ch.fr_text}
                                  </p>
                                  <div className="p-3 rounded-lg bg-[#7C2D12]/10 border-l-4 border-[#7C2D12] text-xs sm:text-sm">
                                    <span className="font-bold uppercase tracking-wider text-[#B48327] block mb-0.5">
                                      Décret Prophétique (FR) :
                                    </span>
                                    <span className="italic">{ch.declaration_fr}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Unabridged Verbatim Transcript Toggle */}
                    {raw && (
                      <div className="pt-2">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <button
                            onClick={() => toggleRawTranscript(video.id)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
                          >
                            <ScrollText className="w-4 h-4" />
                            {showRaw
                              ? uiLang === 'fr'
                                ? 'Masquer la Transcription Intégrale Mot-à-Mot'
                                : 'Hide Full Verbatim Word-for-Word Transcript'
                              : uiLang === 'fr'
                              ? `Afficher la Transcription Intégrale en Français (${raw.fr_paragraphs.length} Paragraphes)`
                              : `Display Full Verbatim English Transcript (${raw.en_paragraphs.length} Paragraphs)`}
                          </button>

                          <div className="flex items-center gap-2">
                            {showEn && (
                              <button
                                onClick={() => handleCopy(`${video.id}-en`, raw.en_raw)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#B48327]/30 text-[#B48327] hover:bg-[#B48327]/10 transition"
                              >
                                {copiedId === `${video.id}-en` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                Copy Full English (EN)
                              </button>
                            )}
                            {showFr && (
                              <button
                                onClick={() => handleCopy(`${video.id}-fr`, raw.fr_raw)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#B48327]/30 text-[#B48327] hover:bg-[#B48327]/10 transition"
                              >
                                {copiedId === `${video.id}-fr` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                Copier Tout en Français (FR)
                              </button>
                            )}
                          </div>
                        </div>

                        {showRaw && (
                          <div className={`grid grid-cols-1 ${showEn && showFr ? 'lg:grid-cols-2' : ''} gap-5 mt-4`}>
                            {showEn && (
                              <div className={`rounded-xl border p-4 sm:p-5 max-h-[600px] overflow-y-auto ${cardSurface}`}>
                                <h6 className="font-display font-bold text-base text-[#B48327] mb-3 sticky top-0 py-1 bg-inherit">
                                  Full English Transcription — {video.title_en}
                                </h6>
                                <div className="space-y-3 font-serif-body text-sm sm:text-[15px] leading-relaxed">
                                  {raw.en_paragraphs.map((p, idx) => (
                                    <p key={idx}>
                                      <span className="font-mono-code text-[11px] text-[#B48327] mr-2">
                                        [EN ¶{idx + 1}]
                                      </span>
                                      {p}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {showFr && (
                              <div className={`rounded-xl border p-4 sm:p-5 max-h-[600px] overflow-y-auto ${cardSurface}`}>
                                <h6 className="font-display font-bold text-base text-[#B48327] mb-3 sticky top-0 py-1 bg-inherit">
                                  Transcription Française Intégrale — {video.title_fr}
                                </h6>
                                <div className="space-y-3 font-serif-body text-sm sm:text-[15px] leading-relaxed">
                                  {raw.fr_paragraphs.map((p, idx) => (
                                    <p key={idx}>
                                      <span className="font-mono-code text-[11px] text-[#B48327] mr-2">
                                        [FR ¶{idx + 1}]
                                      </span>
                                      {p}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: ALL 12 PRAYER ALTAR TITLES & DECREES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
              {uiLang === 'fr' ? 'Section 3 • Autel de Prière (12 Prières)' : 'Section 3 • Prayer Altar Directory (12 Prayers)'}
            </span>
            <h3 className="font-display text-2xl font-bold mt-0.5">
              {uiLang === 'fr'
                ? 'Les 12 Titres & Décrets de l’Autel de Prière (EN & FR)'
                : 'All 12 Prayer Altar Titles & Prophetic Decrees (EN & FR)'}
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('prayers')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
          >
            {uiLang === 'fr' ? 'Ouvrir l’Autel Interactif →' : 'Open Interactive Prayer Altar →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRAYER_ALTAR_CARDS.map((card, idx) => (
            <div key={card.id} className={`rounded-2xl border p-4 flex flex-col justify-between ${cardSurface}`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#B48327]/20 text-[#B48327]">
                    #{idx + 1} • {uiLang === 'fr' ? card.categoryLabel_fr : card.categoryLabel_en}
                  </span>
                  <span className="text-xs font-mono-code font-semibold text-[#B48327]">
                    {card.scriptureRef}
                  </span>
                </div>
                {showEn && (
                  <h4 className="font-display font-bold text-base mb-1">
                    [EN] {card.title_en}
                  </h4>
                )}
                {showFr && (
                  <h5 className="font-display font-semibold text-sm text-[#B48327] mb-2">
                    [FR] {card.title_fr}
                  </h5>
                )}
                {showEn && (
                  <p className={`text-xs ${subText} mb-2 line-clamp-3`}>
                    {card.decree_en}
                  </p>
                )}
                {showFr && (
                  <p className={`text-xs ${subText} italic line-clamp-3`}>
                    {card.decree_fr}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ALL 3 DEVOTIONAL STUDY GUIDES & ALL 15 BILINGUAL SCRIPTURES */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3 Devotional Study Guides */}
        <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${mainSurface}`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
                {uiLang === 'fr' ? 'Section 4A • 3 Guides Dévotionnels' : 'Section 4A • 3 Devotional Study Guides'}
              </span>
              <h3 className="font-display text-xl font-bold mt-0.5">
                {uiLang === 'fr' ? 'Guides de Méditation Bilingues' : 'Bilingual Devotional Study Guides'}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('devotionals')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
            >
              {uiLang === 'fr' ? 'Étudier →' : 'Open Guides →'}
            </button>
          </div>

          <div className="space-y-3">
            {DEVOTIONAL_GUIDES.map((guide) => (
              <div key={guide.id} className={`rounded-xl border p-4 ${cardSurface}`}>
                <div className="flex items-center justify-between text-xs font-bold text-[#B48327] mb-1">
                  <span>{uiLang === 'fr' ? guide.dayLabel_fr : guide.dayLabel_en}</span>
                  <span>{guide.anchorScripture}</span>
                </div>
                {showEn && <h4 className="font-display font-bold text-base">[EN] {guide.title_en}</h4>}
                {showFr && <h5 className="font-display font-semibold text-sm text-[#B48327]">[FR] {guide.title_fr}</h5>}
                <p className={`text-xs ${subText} mt-1.5`}>
                  {uiLang === 'fr' ? guide.subtitle_fr : guide.subtitle_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 15 Bilingual Scripture Treasury References */}
        <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${mainSurface}`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
                {uiLang === 'fr' ? 'Section 4B • 15 Écritures (KJV & LSG)' : 'Section 4B • 15 Scripture Treasury Entries'}
              </span>
              <h3 className="font-display text-xl font-bold mt-0.5">
                {uiLang === 'fr' ? 'Trésor Biblique Bilingue' : 'Bilingual Scripture Concordance (KJV & LSG 1910)'}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('devotionals')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
            >
              {uiLang === 'fr' ? 'Trésor Biblique →' : 'Open Treasury →'}
            </button>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {SCRIPTURE_TREASURY.map((scr, idx) => (
              <div key={scr.id} className={`rounded-xl border p-3 ${cardSurface}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-code text-xs font-bold text-[#B48327]">
                    #{idx + 1} • {scr.reference_en} / {scr.reference_fr}
                  </span>
                </div>
                {showEn && <p className="text-xs font-semibold mt-0.5">[EN] {scr.theme_en}</p>}
                {showFr && <p className="text-xs font-medium text-[#B48327]">[FR] {scr.theme_fr}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ALL 7 DOWNLOADABLE DOCX & ZIP PACKAGES */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${mainSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
              {uiLang === 'fr' ? 'Section 5 • 7 Packages .DOCX & .ZIP' : 'Section 5 • 7 Downloadable .DOCX & .ZIP Packages'}
            </span>
            <h3 className="font-display text-2xl font-bold mt-0.5">
              {uiLang === 'fr'
                ? 'Tous les Fichiers Microsoft Word (.DOCX) Disponibles au Téléchargement'
                : 'All Available Microsoft Word (.DOCX) Transcription Packages'}
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('downloads')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition self-start"
          >
            {uiLang === 'fr' ? 'Générateur .DOCX sur Mesure →' : 'Open Custom .DOCX Builder →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {DOCX_PACKAGES_LIST.map((pkg) => (
            <div key={pkg.id} className={`rounded-xl border p-4 flex flex-col justify-between ${cardSurface}`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B48327]/20 text-[#B48327]">
                    {uiLang === 'fr' ? pkg.badge_fr : pkg.badge_en}
                  </span>
                  <span className="text-[11px] font-mono-code font-semibold text-[#B48327]">
                    {pkg.sizeLabel}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base mb-1">
                  {uiLang === 'fr' ? pkg.title_fr : pkg.title_en}
                </h4>
                <p className={`text-xs ${subText} mb-3`}>
                  {uiLang === 'fr' ? pkg.description_fr : pkg.description_en}
                </p>
              </div>
              <a
                href={pkg.href}
                download={pkg.filename}
                className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
              >
                <Download className="w-3.5 h-3.5" />
                {pkg.filename}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
