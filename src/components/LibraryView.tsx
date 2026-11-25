import React, { useMemo, useState } from 'react';
import {
  ExternalLink,
  Library,
  Search,
  Sparkles,
  Terminal,
  CheckCircle2,
  CircleDashed,
  Copy,
  Check,
} from 'lucide-react';
import { UILang } from '../data/spiritualData';
import { LIBRARY_PLAYLISTS, LIBRARY_TOTAL_VIDEOS } from '../data/libraryCatalog';
import { LIBRARY_TRANSCRIPTS } from '../data/libraryTranscripts';

interface LibraryViewProps {
  uiLang: UILang;
  darkMode: boolean;
}

const CARDS_PER_PAGE = 24;

const TEXT = {
  en: {
    title: 'Full Library — 377 Video Transcriptions',
    subtitle:
      'The three source playlists hold 377 videos in total. Every one of them is part of the transcription target; the 9 sessions in the reader are the first fully-structured set.',
    playlists: 'Source playlists',
    videos: 'videos',
    harvested: 'English transcripts downloaded',
    of: 'of',
    search: 'Search downloaded transcripts…',
    empty: 'No transcripts downloaded yet.',
    setupTitle: 'To load the full 377-transcript library',
    setupNote:
      'Run these three commands from the repository root on a machine with normal internet access, then commit the generated data.',
    openReader: 'Open in reader',
    words: 'words',
    loadMore: 'Show more',
    readTranscript: 'Read full transcript',
    hideTranscript: 'Close transcript',
    noResults: 'Nothing matches that search yet.',
    alreadyStructured: 'Already fully structured in the reader',
  },
  fr: {
    title: 'Bibliothèque Complète — 377 Transcriptions Vidéo',
    subtitle:
      'Les trois playlists sources totalisent 377 vidéos. Toutes font partie de l’objectif de transcription ; les 9 sessions du lecteur sont le premier ensemble entièrement structuré.',
    playlists: 'Playlists sources',
    videos: 'vidéos',
    harvested: 'Transcriptions anglaises téléchargées',
    of: 'sur',
    search: 'Rechercher dans les transcriptions téléchargées…',
    empty: 'Aucune transcription téléchargée pour le moment.',
    setupTitle: 'Pour charger la bibliothèque complète de 377 transcriptions',
    setupNote:
      'Exécutez ces trois commandes depuis la racine du dépôt sur une machine disposant d’un accès Internet normal, puis committez les données générées.',
    openReader: 'Ouvrir dans le lecteur',
    words: 'mots',
    loadMore: 'Afficher plus',
    readTranscript: 'Lire la transcription complète',
    hideTranscript: 'Fermer la transcription',
    noResults: 'Aucun résultat pour cette recherche.',
    alreadyStructured: 'Déjà entièrement structuré dans le lecteur',
  },
  mg: {
    title: 'Tranomboky Feno — Fandikana Video 377',
    subtitle:
      'Misy video 377 ny playlists telo niandohana. Anisan’ny tanjona fandikana izy rehetra ; ny sesy 9 ao amin’ny mpamaky no andiany voarindra tanteraka voalohany.',
    playlists: 'Playlists niandohana',
    videos: 'video',
    harvested: 'Fandikana anglisy efa alaina',
    of: 'amin’ny',
    search: 'Hikaroka amin’ny fandikana efa alaina…',
    empty: 'Mbola tsy misy fandikana alaina.',
    setupTitle: 'Hametrahana ny tranomboky feno 377 fandikana',
    setupNote:
      'Ampiasao ireto baiko telo ireto ao amin’ny fototr’ny tahiry amin’ny milina manana aterineto mahazatra, dia commitéo ny angona vokatra.',
    openReader: 'Sokafy ao amin’ny mpamaky',
    words: 'teny',
    loadMore: 'Asehoy bebe kokoa',
    readTranscript: 'Vakio ny fandikana feno',
    hideTranscript: 'Hidio ny fandikana',
    noResults: 'Tsy misy mifanaraka amin’io fikarohana io.',
    alreadyStructured: 'Efa voarindra tanteraka ao amin’ny mpamaky',
  },
};

const SETUP_COMMANDS = [
  'python3 scripts/harvest_catalog.py',
  'python3 scripts/harvest_transcripts.py --sleep 2',
  'python3 scripts/harvest_transcripts.py --build-ts && npm run build',
];

export const LibraryView: React.FC<LibraryViewProps> = ({ uiLang, darkMode }) => {
  const t = TEXT[uiLang];
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(CARDS_PER_PAGE);
  const [copied, setCopied] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [fullText, setFullText] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const all = useMemo(
    () =>
      Object.values(LIBRARY_TRANSCRIPTS).sort((a, b) =>
        a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        (fullText[item.id] || '').toLowerCase().includes(q)
    );
  }, [all, query, fullText]);

  const toggleTranscript = async (id: string) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (fullText[id]) return;
    setLoadingId(id);
    try {
      const res = await fetch(`transcripts/${id}.json`);
      if (res.ok) {
        const data = await res.json();
        setFullText((prev) => ({ ...prev, [id]: data.text || '' }));
      } else {
        setFullText((prev) => ({ ...prev, [id]: '' }));
      }
    } catch {
      setFullText((prev) => ({ ...prev, [id]: '' }));
    } finally {
      setLoadingId(null);
    }
  };

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/90 border-[#B48327]/20 text-[#1C1917]';
  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';
  const shortfall = Math.max(0, LIBRARY_TOTAL_VIDEOS - all.length);

  const copyCommands = () => {
    const script = SETUP_COMMANDS.join('\n');
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(script).then(done).catch(() => {});
    } else {
      done();
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact header */}
      <div className={`rounded-2xl border p-3.5 sm:p-5 ${cardSurface} shadow-sm space-y-2`}>
        <div className="flex items-center gap-2">
          <Library className="w-4 h-4 text-[#B48327]" />
          <h1 className="font-display font-bold text-lg sm:text-2xl leading-tight">{t.title}</h1>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed max-w-4xl ${subText}`}>{t.subtitle}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#7C2D12] text-amber-100">
            <Sparkles className="w-3 h-3" />
            {LIBRARY_TOTAL_VIDEOS} {t.videos}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
              all.length
                ? 'border-[#B48327]/40 text-[#B48327]'
                : darkMode
                ? 'border-[#263246] text-[#A8A29E]'
                : 'border-[#B48327]/25 text-[#57534E]'
            }`}
          >
            {all.length ? <CheckCircle2 className="w-3 h-3" /> : <CircleDashed className="w-3 h-3" />}
            {all.length} {t.of} {LIBRARY_TOTAL_VIDEOS} {t.harvested}
          </span>
        </div>
      </div>

      {/* Playlist breakdown — 3 compact rows, no card grid blocking reading */}
      <div className={`rounded-2xl border p-3.5 sm:p-5 ${cardSurface} shadow-sm space-y-2.5`}>
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#B48327]">
          {t.playlists}
        </h2>
        <ul className="divide-y divide-[#B48327]/15">
          {LIBRARY_PLAYLISTS.map((playlist) => {
            const done = all.filter((tr) => tr.playlistId === playlist.playlistId).length;
            const title =
              uiLang === 'mg'
                ? playlist.title_mg
                : uiLang === 'fr'
                ? playlist.title_fr
                : playlist.title_en;
            return (
              <li key={playlist.playlistId} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <a
                      href={playlist.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 font-semibold text-xs sm:text-sm hover:text-[#B48327] transition leading-snug"
                    >
                      <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 text-[#B48327]" />
                      <span className="line-clamp-2">{title}</span>
                    </a>
                    <p className={`text-[11px] mt-0.5 ${subText}`}>{playlist.channel}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono-code text-sm font-bold text-[#B48327]">
                      {playlist.expectedVideoCount}
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                      {t.videos}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${subText}`}>
                      {done}/{playlist.expectedVideoCount} ✎
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Harvested transcript list, or the setup instructions when empty */}
      {all.length === 0 ? (
        <div className={`rounded-2xl border p-3.5 sm:p-5 ${cardSurface} shadow-sm space-y-3`}>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#B48327]" />
            <h2 className="text-sm font-bold">{t.setupTitle}</h2>
          </div>
          <p className={`text-xs leading-relaxed ${subText}`}>{t.setupNote}</p>
          <div className="relative">
            <pre
              className={`overflow-x-auto rounded-xl p-3 pr-10 text-[11px] leading-relaxed font-mono-code ${
                darkMode ? 'bg-[#0F141C] text-[#D4AF37]' : 'bg-[#1C1917] text-[#F5F2EB]'
              }`}
            >
              {SETUP_COMMANDS.map((cmd) => `$ ${cmd}`).join('\n')}
            </pre>
            <button
              type="button"
              onClick={copyCommands}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
              title="Copy commands"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className={`text-[11px] ${subText}`}>
            {t.empty} — {shortfall} {t.of} {LIBRARY_TOTAL_VIDEOS} {t.harvested}
          </p>
        </div>
      ) : (
        <div className={`rounded-2xl border p-3.5 sm:p-5 ${cardSurface} shadow-sm space-y-3`}>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B48327]" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(CARDS_PER_PAGE);
              }}
              placeholder={t.search}
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border outline-none transition ${
                darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB] focus:border-[#D4AF37]'
                  : 'bg-[#FBF8F3] border-[#B48327]/30 text-[#1C1917] focus:border-[#B48327]'
              }`}
            />
          </div>

          {filtered.length === 0 ? (
            <p className={`text-xs ${subText}`}>{t.noResults}</p>
          ) : (
            <ul className="divide-y divide-[#B48327]/15">
              {filtered.slice(0, visible).map((item) => (
                <li key={item.id} className="py-2.5 first:pt-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-xs sm:text-sm leading-snug hover:text-[#B48327] transition line-clamp-2"
                  >
                    {item.title}
                  </a>
                  <p className={`text-[11px] mt-0.5 ${subText}`}>
                    {item.channel} • {item.duration} • {item.wordCount.toLocaleString()} {t.words}
                  </p>
                  <p className={`text-xs mt-1 ${subText}`}>
                    {openId === item.id
                      ? loadingId === item.id
                        ? '…'
                        : fullText[item.id] || item.excerpt
                      : `${item.excerpt}…`}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleTranscript(item.id)}
                    className="mt-1 text-[11px] font-bold text-[#B48327] hover:underline"
                  >
                    {openId === item.id ? t.hideTranscript : t.readTranscript}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {filtered.length > visible && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + CARDS_PER_PAGE)}
              className="w-full py-2 rounded-xl text-xs font-bold border border-[#B48327]/40 text-[#B48327] hover:bg-[#B48327]/10 transition"
            >
              {t.loadMore} ({filtered.length - visible})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LibraryView;
