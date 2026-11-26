import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  ExternalLink,
  Layers,
  ScrollText,
} from 'lucide-react';
import {
  DEVOTIONAL_GUIDES,
  DOCX_PACKAGES_LIST,
  LanguageMode,
  PRAYER_ALTAR_CARDS,
  SCRIPTURE_TREASURY,
  UILang,
} from '../data/spiritualData';
import { PLAYLIST_DIRECTORY } from '../data/compendiumData';
import {
  PRAYER_CARD_MG_MAP,
  DEVOTIONAL_MG_MAP,
  SCRIPTURE_MG_MAP,
  PLAYLIST_MG_MAP,
  TRACK_MG_MAP,
} from '../data/malagasyData';

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
  onSelectLanguage,
  darkMode,
  onOpenVideoInReader,
  onNavigateTab,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/90 border-[#B48327]/20 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';


  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Compendium Header */}
      <div className={`rounded-2xl border p-4 sm:p-6 ${mainSurface} shadow-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B48327]/15 text-[#B48327]">
              <Layers className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? 'Fizahan-takelaka Feno • Lohateny sy Transcription Rehetra (MG)'
                : uiLang === 'fr'
                ? 'Répertoire Intégral • Tous les Titres & Transcriptions (FR)'
                : 'Master Index • All Available Titles & Transcripts (EN)'}
            </span>
            <h2 className="font-display text-xl sm:text-3xl font-bold">
              {uiLang === 'mg'
                ? 'Lisitry ny Lohateny, Playlists sy Transcription Rehetra'
                : uiLang === 'fr'
                ? 'Catalogue Complet des Titres, Playlists & Transcriptions'
                : 'Complete Directory of All Titles, Playlists & Transcripts'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* 3-Language Choice Pill (EN vs FR vs MG) */}
            <div
              className={`inline-flex items-center rounded-xl p-1 border ${
                darkMode ? 'bg-[#171F2C] border-[#263246]' : 'bg-[#F3EDE2] border-[#B48327]/30'
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
                  onClick={() => onSelectLanguage(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    uiLang === tab.id
                      ? 'bg-[#B48327] text-white shadow-sm'
                      : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#B48327]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>


      {/* SECTION 1: every title, grouped by its source playlist */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
            {uiLang === 'mg'
              ? 'Fizarana 1 • Fanangonana miaraka amin’ny transcriptions'
              : uiLang === 'fr'
              ? 'Section 1 • Collections avec transcriptions'
              : 'Section 1 • Collections with harvested transcripts'}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
            {uiLang === 'mg'
              ? 'Lisitry ny Video Rehetra ao amin’ireo Playlists YouTube 3'
              : uiLang === 'fr'
              ? 'Tous les Titres Disponibles dans les 3 Playlists YouTube'
              : 'All Available Video Titles Across the 3 YouTube Playlists'}
          </h3>
        </div>

        <div className="space-y-5">
          {PLAYLIST_DIRECTORY.map((playlist, pIdx) => {
            const pMg = PLAYLIST_MG_MAP[playlist.playlistId];
            const pTitle =
              uiLang === 'mg'
                ? pMg?.title_mg || playlist.playlistTitle_en
                : uiLang === 'fr'
                ? playlist.playlistTitle_fr
                : playlist.playlistTitle_en;
            const pDesc =
              uiLang === 'mg'
                ? pMg?.description_mg || playlist.description_en
                : uiLang === 'fr'
                ? playlist.description_fr
                : playlist.description_en;

            return (
              <div key={playlist.playlistId} className={`rounded-2xl border p-4 sm:p-6 ${cardSurface}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#B48327]/15">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#B48327] text-white">
                        Playlist {pIdx + 1}
                      </span>
                      <span className="text-xs font-mono-code font-semibold text-[#B48327]">
                        {playlist.playlistId}
                      </span>
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-bold">{pTitle}</h4>
                    <p className={`text-xs ${subText} mt-0.5`}>{pDesc}</p>
                  </div>
                  <a
                    href={playlist.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#B48327]/30 text-[#B48327] hover:bg-[#B48327]/10 transition self-start"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    YouTube Playlist
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {playlist.tracks.map((track, tIdx) => {
                    const tMg = TRACK_MG_MAP[track.youtubeId];
                    const tTitle =
                      uiLang === 'mg'
                        ? tMg?.title_mg || track.title_en
                        : uiLang === 'fr'
                        ? track.title_fr
                        : track.title_en;
                    const tSummary =
                      uiLang === 'mg'
                        ? tMg?.summary_mg || track.summary_en
                        : uiLang === 'fr'
                        ? track.summary_fr
                        : track.summary_en;

                    return (
                      <div
                        key={track.youtubeId}
                        className={`rounded-xl border p-3.5 flex flex-col justify-between transition ${
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
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B48327]/20 text-[#B48327]">
                              #{tIdx + 1} • {track.duration}
                            </span>
                            {track.hasFullTranscriptInApp && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-800/20 text-emerald-500 border border-emerald-600/30">
                                ✓ EN • FR • MG
                              </span>
                            )}
                          </div>
                          <p className="font-display font-bold text-sm sm:text-base leading-snug mb-1">
                            {tTitle}
                          </p>
                          <p className={`text-xs ${subText}`}>{tSummary}</p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-[#B48327]/15 flex items-center justify-between gap-2">
                          {track.hasFullTranscriptInApp ? (
                            <button
                              onClick={() => onOpenVideoInReader(track.youtubeId)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              {uiLang === 'mg'
                                ? 'Vakio ny Vavaka →'
                                : uiLang === 'fr'
                                ? 'Lire la Prière →'
                                : 'Read Prayer →'}
                            </button>
                          ) : (
                            <span className={`text-[11px] italic ${subText}`}>
                              {track.channel}
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: prayer altar titles, devotionals and scripture treasury */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 12 Prayers */}
        <div className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${mainSurface}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#B48327]">
              {uiLang === 'mg'
                ? 'Vavaka 12 eo amin’ny Alitara'
                : uiLang === 'fr'
                ? '12 Prières de l’Autel'
                : '12 Prayer Altar Cards'}
            </h3>
            <button
              onClick={() => onNavigateTab('prayers')}
              className="text-xs font-bold text-[#B48327] underline"
            >
              {uiLang === 'mg' ? 'Sokafy →' : uiLang === 'fr' ? 'Ouvrir →' : 'Open →'}
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {PRAYER_ALTAR_CARDS.map((card, i) => {
              const title =
                uiLang === 'mg'
                  ? PRAYER_CARD_MG_MAP[card.id]?.title_mg || card.title_en
                  : uiLang === 'fr'
                  ? card.title_fr
                  : card.title_en;
              return (
                <div key={card.id} className={`p-2.5 rounded-xl border text-xs ${cardSurface}`}>
                  <strong className="text-[#B48327]">#{i + 1}.</strong> {title}{' '}
                  <span className="font-mono-code text-[10px] opacity-75">({card.scriptureRef})</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Devotionals */}
        <div className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${mainSurface}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#B48327]">
              {uiLang === 'mg'
                ? 'Torolalana Fandinihan-tena 3'
                : uiLang === 'fr'
                ? '3 Guides Dévotionnels'
                : '3 Devotional Study Guides'}
            </h3>
            <button
              onClick={() => onNavigateTab('devotionals')}
              className="text-xs font-bold text-[#B48327] underline"
            >
              {uiLang === 'mg' ? 'Sokafy →' : uiLang === 'fr' ? 'Ouvrir →' : 'Open →'}
            </button>
          </div>
          <div className="space-y-2.5">
            {DEVOTIONAL_GUIDES.map((g, i) => {
              const title =
                uiLang === 'mg'
                  ? DEVOTIONAL_MG_MAP[g.id]?.title_mg || g.title_en
                  : uiLang === 'fr'
                  ? g.title_fr
                  : g.title_en;
              return (
                <div key={g.id} className={`p-3 rounded-xl border text-xs ${cardSurface}`}>
                  <div className="font-mono-code text-[11px] font-bold text-[#B48327] mb-0.5">
                    #{i + 1} • {g.anchorScripture}
                  </div>
                  <div className="font-display font-bold text-sm">{title}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 15 Scriptures */}
        <div className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${mainSurface}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#B48327]">
              {uiLang === 'mg'
                ? 'Soratra Masina 15 (Baiboly MG)'
                : uiLang === 'fr'
                ? '15 Écritures (LSG 1910)'
                : '15 Scriptures (KJV)'}
            </h3>
            <button
              onClick={() => onNavigateTab('devotionals')}
              className="text-xs font-bold text-[#B48327] underline"
            >
              {uiLang === 'mg' ? 'Sokafy →' : uiLang === 'fr' ? 'Ouvrir →' : 'Open →'}
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {SCRIPTURE_TREASURY.map((scr, i) => {
              const mgS = SCRIPTURE_MG_MAP[scr.id];
              const ref =
                uiLang === 'mg'
                  ? mgS?.reference_mg || scr.reference_en
                  : uiLang === 'fr'
                  ? scr.reference_fr
                  : scr.reference_en;
              const theme =
                uiLang === 'mg'
                  ? mgS?.theme_mg || scr.theme_en
                  : uiLang === 'fr'
                  ? scr.theme_fr
                  : scr.theme_en;
              return (
                <div key={scr.id} className={`p-2.5 rounded-xl border text-xs ${cardSurface}`}>
                  <strong className="text-[#B48327]">
                    #{i + 1} {ref}:
                  </strong>{' '}
                  {theme}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: DOCX packages */}
      <section className={`rounded-2xl border p-4 sm:p-6 space-y-4 ${mainSurface}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">
            {uiLang === 'mg'
              ? 'Rakitra Microsoft Word (.DOCX) Azo Sintomina'
              : uiLang === 'fr'
              ? 'Packages Microsoft Word (.DOCX) Disponibles'
              : 'Downloadable Microsoft Word (.DOCX) Packages'}
          </h3>
          <button
            onClick={() => onNavigateTab('downloads')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#B48327] text-white"
          >
            {uiLang === 'mg'
              ? 'Hanamboatra .DOCX →'
              : uiLang === 'fr'
              ? 'Générateur .DOCX →'
              : 'Custom .DOCX Builder →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DOCX_PACKAGES_LIST.map((pkg) => (
            <div key={pkg.id} className={`rounded-xl border p-3.5 flex flex-col justify-between ${cardSurface}`}>
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#B48327] mb-1">
                  <span>{uiLang === 'fr' ? pkg.badge_fr : pkg.badge_en}</span>
                  <span>{pkg.sizeLabel}</span>
                </div>
                <h4 className="font-display font-bold text-sm mb-2">
                  {uiLang === 'fr' ? pkg.title_fr : pkg.title_en}
                </h4>
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
