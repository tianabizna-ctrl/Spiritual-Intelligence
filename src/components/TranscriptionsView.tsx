import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronDown,
  Copy,
  ListOrdered,
  Search,
  Youtube,
} from 'lucide-react';
import { UILang } from '../data/spiritualData';
import {
  LINE_WIDTH_CLASS,
  READING_FONT_CLASS,
  TEXT_SCALE_CLASS,
  type LineWidth,
  type ReadingFont,
  type TextScale,
} from '../hooks/useSettings';
import { LIBRARY_TRANSCRIPTS, type LibraryTranscript } from '../data/libraryTranscripts';
import { loadTranscript } from '../utils/transcriptText';

/**
 * The reader over the harvested corpus.
 *
 * There are no hand-authored session structures any more: every entry is a real
 * transcript, so this lists the library and reads the transcript itself in
 * paragraphs. Counts come from data, never from copy.
 */

interface ReaderProps {
  uiLang: UILang;
  languageMode: 'en' | 'fr' | 'mg' | 'both';
  darkMode: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, textEn: string, textFr: string, ref: string) => void;
  externalSelectedVideoId?: string;
  onSelectVideoId?: (id: string) => void;
  textScale: TextScale;
  readingFont: ReadingFont;
  lineWidth: LineWidth;
}

const TEXT = {
  en: {
    pick: 'Choose a transcript',
    searchPlaceholder: 'Search titles and channels…',
    transcripts: (n: number) => `${n.toLocaleString()} transcripts`,
    paragraphs: (n: number) => `${n} paragraphs`,
    words: (n: number) => `${n.toLocaleString()} words`,
    loading: 'Loading transcript…',
    missing: 'This transcript could not be loaded. It may not be published yet.',
    copy: 'Copy transcript',
    copied: 'Copied',
    watch: 'Watch on YouTube',
    save: 'Save',
    saved: 'Saved',
    noResults: 'No transcript matches that search.',
  },
  fr: {
    pick: 'Choisissez une transcription',
    searchPlaceholder: 'Rechercher titres et chaînes…',
    transcripts: (n: number) => `${n.toLocaleString()} transcriptions`,
    paragraphs: (n: number) => `${n} paragraphes`,
    words: (n: number) => `${n.toLocaleString()} mots`,
    loading: 'Chargement de la transcription…',
    missing: 'Cette transcription n’a pas pu être chargée. Elle n’est peut-être pas encore publiée.',
    copy: 'Copier la transcription',
    copied: 'Copié',
    watch: 'Regarder sur YouTube',
    save: 'Enregistrer',
    saved: 'Enregistré',
    noResults: 'Aucune transcription ne correspond.',
  },
  mg: {
    pick: 'Safidio ny transcription',
    searchPlaceholder: 'Karohy ny lohateny sy ny fantsona…',
    transcripts: (n: number) => `${n.toLocaleString()} transcription`,
    paragraphs: (n: number) => `Fizarana ${n}`,
    words: (n: number) => `Teny ${n.toLocaleString()}`,
    loading: 'Eo am-pakàna ny transcription…',
    missing: 'Tsy afaka nalaina ity transcription ity. Mety tsy mbola navoaka.',
    copy: 'Adikao ny transcription',
    copied: 'Voadikao',
    watch: 'Jereo ao YouTube',
    save: 'Tehirizo',
    saved: 'Voatahiry',
    noResults: 'Tsy misy transcription mifanaraka amin’izany.',
  },
} as const;

const COLLECTION_LABEL: Record<UILang, Record<string, string>> = {
  en: { prayers: 'Prayers', teachings: 'Myles Munroe', 'christian-house': 'Joshua Selman' },
  fr: { prayers: 'Prières', teachings: 'Myles Munroe', 'christian-house': 'Joshua Selman' },
  mg: { prayers: 'Vavaka', teachings: 'Myles Munroe', 'christian-house': 'Joshua Selman' },
};

export const TranscriptionsView: React.FC<ReaderProps> = ({
  uiLang,
  darkMode,
  bookmarkedIds,
  onToggleBookmark,
  externalSelectedVideoId,
  onSelectVideoId,
  textScale,
  readingFont,
  lineWidth,
}) => {
  const t = TEXT[uiLang];

  const all = useMemo<LibraryTranscript[]>(() => {
    const rank: Record<string, number> = { prayers: 0, teachings: 1 };
    return Object.values(LIBRARY_TRANSCRIPTS).sort(
      (a, b) =>
        (rank[a.collection] ?? 2) - (rank[b.collection] ?? 2) ||
        a.title.localeCompare(b.title)
    );
  }, []);

  const [internalId, setInternalId] = useState<string>(all[0]?.id ?? '');
  const selectedId = externalSelectedVideoId || internalId;
  const [query, setQuery] = useState('');
  const [listOpen, setListOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const tabs = useMemo(() => Array.from(new Set(all.map((r) => r.collection))), [all]);
  const [tab, setTab] = useState<string>(tabs[0] ?? 'prayers');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(
      (row) =>
        (!q || row.title.toLowerCase().includes(q) || row.channel.toLowerCase().includes(q)) &&
        (q ? true : row.collection === tab)
    );
  }, [all, query, tab]);

  const active = all.find((r) => r.id === selectedId) ?? all[0];

  const [paras, setParas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [missing, setMissing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    setLoading(true);
    setMissing(false);
    setParas([]);
    loadTranscript(active.collection, active.id).then((loaded) => {
      if (cancelled) return;
      if (!loaded) setMissing(true);
      else setParas(loaded.paragraphs);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [active?.id, active?.collection]);

  const select = (id: string) => {
    setInternalId(id);
    onSelectVideoId?.(id);
    setListOpen(false);
    window.setTimeout(
      () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    );
  };

  const fullText = paras.join('\n\n');
  const isBookmarked = active ? bookmarkedIds.includes(active.id) : false;

  const surface = darkMode
    ? 'bg-[#131B26] border-[#263246] text-[#F5F2EB]'
    : 'bg-white border-[#B48327]/20 text-[#1C1917]';
  const sub = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';
  const field = darkMode
    ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/25 text-[#1C1917]';

  if (!active) return null;

  const typeClass = `${TEXT_SCALE_CLASS[textScale]} ${READING_FONT_CLASS[readingFont]} ${LINE_WIDTH_CLASS[lineWidth]}`;

  return (
    <div ref={topRef} className="space-y-3">
      {/* Compact picker — never a blocking hero on phones. */}
      <div className={`rounded-xl border p-2 sm:p-3 ${surface}`}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setListOpen((v) => !v)}
            aria-expanded={listOpen}
            className={`flex-1 min-w-0 text-left px-2.5 py-2 rounded-lg border flex items-center gap-2 ${field}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48327] shrink-0">
              {t.pick}
            </span>
            <span className="text-xs font-semibold truncate flex-1">{active.title}</span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 text-[#B48327] transition ${listOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        <p className={`pt-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider ${sub}`}>
          {t.transcripts(all.length)}
        </p>

        {listOpen && (
          <div className="mt-2 space-y-2">
            <div className="flex flex-wrap items-center gap-1">
              {tabs.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                    tab === key
                      ? 'bg-[#7C2D12] text-amber-100 border-[#7C2D12]'
                      : `${field} hover:border-[#B48327]`
                  }`}
                >
                  {COLLECTION_LABEL[uiLang][key] ?? key} (
                  {all.filter((r) => r.collection === key).length.toLocaleString()})
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${field}`}>
              <Search className="w-3.5 h-3.5 text-[#B48327] shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent text-xs outline-none placeholder:opacity-60"
              />
            </div>

            <ul className="max-h-72 overflow-y-auto divide-y divide-[#263246]/30">
              {filtered.length === 0 && <li className={`p-2 text-xs ${sub}`}>{t.noResults}</li>}
              {filtered.slice(0, 200).map((row) => (
                <li key={row.key}>
                  <button
                    type="button"
                    onClick={() => select(row.id)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-start gap-2 transition ${
                      row.id === active.id ? 'bg-[#B48327]/15' : ''
                    }`}
                  >
                    <span className="font-mono-code text-[10px] text-[#B48327] mt-0.5 shrink-0">
                      {row.wordCount.toLocaleString()}w
                    </span>
                    <span className="text-xs leading-snug flex-1 line-clamp-2">{row.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Transcript */}
      <article className={`rounded-xl border p-3 sm:p-5 ${surface}`}>
        <header className="space-y-1.5 pb-3 border-b border-[#B48327]/20">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#B48327] text-white text-[10px] font-bold uppercase tracking-wider">
              {COLLECTION_LABEL[uiLang][active.collection] ?? active.collection}
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${sub}`}>
              {t.words(active.wordCount)} · {active.channel}
            </span>
          </div>
          <h2 className="font-serif-display text-lg sm:text-2xl font-bold leading-snug">
            {active.title}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() =>
                onToggleBookmark(
                  active.id,
                  active.title,
                  fullText.slice(0, 800),
                  fullText.slice(0, 800),
                  active.channel
                )
              }
              aria-pressed={isBookmarked}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${
                isBookmarked
                  ? 'bg-[#B48327] text-white border-[#B48327]'
                  : `${field} hover:border-[#B48327]`
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? t.saved : t.save}
            </button>

            <button
              type="button"
              disabled={!fullText}
              onClick={() => {
                navigator.clipboard.writeText(fullText);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition disabled:opacity-40 ${field} hover:border-[#B48327]`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#B48327]" />
              )}
              {copied ? t.copied : t.copy}
            </button>

            <a
              href={`https://www.youtube.com/watch?v=${active.id}${
                active.playlistId ? `&list=${active.playlistId}` : ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border ${field} hover:border-[#B48327]`}
            >
              <Youtube className="w-3.5 h-3.5 text-[#B48327]" />
              {t.watch}
            </a>
          </div>
        </header>

        {loading && <p className={`pt-4 text-sm ${sub}`}>{t.loading}</p>}
        {missing && !loading && <p className="pt-4 text-sm text-[#B45309]">{t.missing}</p>}

        {!loading && !missing && (
          <>
            <div className="pt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#B48327]">
              <ListOrdered className="w-3.5 h-3.5" />
              {t.paragraphs(paras.length)}
            </div>
            <div className={`pt-2 space-y-3.5 ${typeClass}`}>
              {paras.map((p, i) => (
                <p key={i} id={`para-${i + 1}`} className="scroll-mt-24">
                  {p}
                </p>
              ))}
            </div>
          </>
        )}
      </article>
    </div>
  );
};
