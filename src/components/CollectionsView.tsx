import React, { useMemo, useState } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { UILang } from '../data/spiritualData';
import { LIBRARY_PLAYLISTS, MUNROE_LIBRARY } from '../data/libraryCatalog';
import { LIBRARY_TRANSCRIPTS, LibraryTranscript } from '../data/libraryTranscripts';

/**
 * Collections — one cover-art card per source playlist / teaching library.
 *
 * Every count is derived from the harvested transcripts, never hardcoded, so the
 * badges stay truthful as the harvest grows.
 */

interface CollectionCard {
  id: string;
  title: string;
  blurb: string;
  cover: string | null;
  transcriptCount: number;
  catalogCount: number | null;
}

const TEXT: Record<
  UILang,
  {
    heading: string;
    intro: string;
    teachings: (n: number) => string;
    coverAlt: (title: string) => string;
    open: string;
    empty: string;
    harvested: (have: number, total: number) => string;
    more: (n: number) => string;
  }
> = {
  en: {
    heading: 'Collections',
    intro:
      'Every source we have harvested, grouped by the channel it came from. Counts reflect real transcripts in the library.',
    teachings: (n) => `${n} teaching${n === 1 ? '' : 's'}`,
    coverAlt: (title) => `${title} cover art`,
    open: 'Open collection',
    empty: 'No transcripts harvested for this collection yet.',
    harvested: (have, total) => `${have} of ${total} transcribed`,
    more: (n) => `+${n} more`,
  },
  fr: {
    heading: 'Collections',
    intro:
      'Toutes nos sources récoltées, regroupées par chaîne d’origine. Les compteurs correspondent aux transcriptions réelles.',
    teachings: (n) => `${n} enseignement${n === 1 ? '' : 's'}`,
    coverAlt: (title) => `Visuel de ${title}`,
    open: 'Ouvrir la collection',
    empty: 'Aucune transcription récoltée pour cette collection.',
    harvested: (have, total) => `${have} sur ${total} transcrites`,
    more: (n) => `+${n} de plus`,
  },
  mg: {
    heading: 'Fanangonana',
    intro:
      'Ny loharano rehetra efa voajinja, nalamina araka ny fantsona niaviany. Ny isa dia tena transcriptions ao amin’ny tranomboky.',
    teachings: (n) => `Fampianarana ${n}`,
    coverAlt: (title) => `Sary fonon’ny ${title}`,
    open: 'Sokafy ny fanangonana',
    empty: 'Mbola tsy misy transcription ho an’ity fanangonana ity.',
    harvested: (have, total) => `${have} amin’ny ${total} no voasoratra`,
    more: (n) => `+${n} hafa`,
  },
};

/** Deterministic cover: the first harvested video's thumbnail for that group. */
function coverFor(rows: LibraryTranscript[]): string | null {
  const first = rows[0];
  return first ? `https://i.ytimg.com/vi/${first.id}/hqdefault.jpg` : null;
}

export const CollectionsView: React.FC<{ uiLang: UILang; darkMode: boolean }> = ({
  uiLang,
  darkMode,
}) => {
  const t = TEXT[uiLang];
  const [active, setActive] = useState<string | null>(null);
  const all = useMemo(() => Object.values(LIBRARY_TRANSCRIPTS), []);

  const cards = useMemo<CollectionCard[]>(() => {
    const out: CollectionCard[] = [];

    // One card per prayer playlist.
    LIBRARY_PLAYLISTS.forEach((playlist) => {
      const rows = all.filter((tr) => tr.playlistId === playlist.playlistId);
      out.push({
        id: playlist.playlistId,
        title: playlist.title_en,
        blurb: playlist.channel,
        cover: coverFor(rows),
        transcriptCount: rows.length,
        catalogCount: playlist.expectedVideoCount,
      });
    });

    // The Myles Munroe teaching library.
    const munroe = all.filter((tr) => tr.collection === 'teachings');
    out.push({
      id: 'munroe',
      title: MUNROE_LIBRARY.title_en,
      blurb: MUNROE_LIBRARY.channel,
      cover: coverFor(munroe),
      transcriptCount: munroe.length,
      catalogCount: MUNROE_LIBRARY.manifestCount,
    });

    // Any further collection (e.g. christian-house) gets its own card.
    Array.from(new Set(all.map((tr) => tr.collection)))
      .filter((key) => key !== 'prayers' && key !== 'teachings')
      .forEach((key) => {
        const rows = all.filter((tr) => tr.collection === key);
        out.push({
          id: key,
          title: rows[0]?.channel || key,
          blurb: rows[0]?.title || '',
          cover: coverFor(rows),
          transcriptCount: rows.length,
          catalogCount: null,
        });
      });

    return out.filter((card) => card.transcriptCount > 0);
  }, [all]);

  const activeRows = useMemo(() => {
    if (!active) return [];
    return all.filter((tr) => {
      if (tr.playlistId === active) return true;
      if (active === 'munroe') return tr.collection === 'teachings';
      return tr.collection === active;
    });
  }, [active, all]);

  const border = darkMode ? 'border-[#263246]' : 'border-[#B48327]/20';
  const panel = darkMode ? 'bg-[#131B26]' : 'bg-white';
  const heading = darkMode ? 'text-[#F5F1E8]' : 'text-[#2A2118]';
  const sub = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h1 className={`font-serif-display text-2xl sm:text-3xl font-bold ${heading}`}>
          {t.heading}
        </h1>
        <p className={`text-sm ${sub} max-w-2xl`}>{t.intro}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => {
          const isActive = active === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActive(isActive ? null : card.id)}
              aria-pressed={isActive}
              aria-label={`${card.title} — ${t.open}`}
              className={`group text-left rounded-2xl border overflow-hidden transition ${
                isActive
                  ? 'border-[#B48327] ring-2 ring-[#B48327]/40'
                  : `${border} hover:border-[#B48327]/60`
              } ${panel}`}
            >
              <div className="relative aspect-video bg-[#0B0F15]">
                {card.cover ? (
                  <img
                    src={card.cover}
                    alt={t.coverAlt(card.title)}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#A8A29E]">
                    <Play className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-bold uppercase tracking-wider text-amber-100">
                  {t.teachings(card.transcriptCount)}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <div className="flex items-start gap-2">
                  <h2 className={`text-sm font-bold leading-snug line-clamp-2 flex-1 ${heading}`}>
                    {card.title}
                  </h2>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 mt-0.5 transition ${
                      isActive ? 'rotate-90 text-[#B48327]' : 'text-[#A8A29E]'
                    }`}
                  />
                </div>
                <p className={`text-xs line-clamp-1 ${sub}`}>{card.blurb}</p>
                {card.catalogCount !== null && (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B48327]">
                    {t.harvested(card.transcriptCount, card.catalogCount)}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className={`rounded-2xl border ${border} ${panel} p-3`}>
          {activeRows.length === 0 ? (
            <p className={`text-sm ${sub}`}>{t.empty}</p>
          ) : (
            <ul className="divide-y divide-[#263246]/40">
              {activeRows.slice(0, 50).map((row) => (
                <li key={row.key} className="py-2 flex items-start gap-2">
                  <span className="font-mono-code text-[10px] text-[#B48327] mt-0.5 shrink-0">
                    {row.wordCount.toLocaleString()}w
                  </span>
                  <span className={`text-xs leading-snug ${sub}`}>{row.title}</span>
                </li>
              ))}
              {activeRows.length > 50 && (
                <li className={`py-2 text-[11px] font-semibold ${sub}`}>
                  {t.more(activeRows.length - 50)}
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};
