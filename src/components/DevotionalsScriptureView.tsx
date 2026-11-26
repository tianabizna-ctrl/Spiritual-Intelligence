import React, { useState } from 'react';
import {
  BookMarked,
  Compass,
  Feather,
  Search,
  Sparkles,
  Trash2,
  PlusCircle,
  Check,
  Copy,
  BookmarkCheck,
  X,
} from 'lucide-react';
import {
  DEVOTIONAL_GUIDES,
  SCRIPTURE_TREASURY,
  LanguageMode,
  UILang,
} from '../data/spiritualData';
import { DEVOTIONAL_MG_MAP, SCRIPTURE_MG_MAP } from '../data/malagasyData';

export interface SavedBookmarkItem {
  id: string;
  title: string;
  textEn: string;
  textFr: string;
  ref: string;
}

interface JournalNote {
  id: string;
  date: string;
  title: string;
  content: string;
}

interface DevotionalsScriptureViewProps {
  uiLang: UILang;
  languageMode: LanguageMode;
  darkMode: boolean;
  savedBookmarks: SavedBookmarkItem[];
  onRemoveBookmark: (id: string) => void;
}

export const DevotionalsScriptureView: React.FC<DevotionalsScriptureViewProps> = ({
  uiLang,
  darkMode,
  savedBookmarks,
  onRemoveBookmark,
}) => {
  const [activeDevotionalId, setActiveDevotionalId] = useState<string>(
    DEVOTIONAL_GUIDES[0].id
  );
  const [scriptureSearch, setScriptureSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Personal Prayer & Devotional Journal persisted in localStorage
  const [journalNotes, setJournalNotes] = useState<JournalNote[]>(() => {
    try {
      const raw = localStorage.getItem('si_prayer_journal');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [
      {
        id: 'sample-note-1',
        date: '2026-11-24',
        title: 'Morning Watch Vision & Prayer Focus / Fanoloran-tena Maraina',
        content:
          'EN: "Every morning the day comes waiting for instructions" (Job 38:12-13).\nFR : « Chaque matin, le jour attend des instructions » (Job 38:12-13).\nMG : « Isa-maraina dia miposaka miandry baiko ny andro » (Joba 38:12-13).',
      },
    ];
  });
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    const newNote: JournalNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      title:
        noteTitle.trim() ||
        (uiLang === 'mg'
          ? 'Fandinihan-tena & Vavaka'
          : uiLang === 'fr'
          ? 'Réflexion & Sujet de Prière'
          : 'Devotional Reflection & Prayer Point'),
      content: noteContent.trim(),
    };
    const updated = [newNote, ...journalNotes];
    setJournalNotes(updated);
    setNoteTitle('');
    setNoteContent('');
    try {
      localStorage.setItem('si_prayer_journal', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteNote = (id: string) => {
    const updated = journalNotes.filter((n) => n.id !== id);
    setJournalNotes(updated);
    try {
      localStorage.setItem('si_prayer_journal', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeDevotional =
    DEVOTIONAL_GUIDES.find((d) => d.id === activeDevotionalId) || DEVOTIONAL_GUIDES[0];

  const activeDevMg = DEVOTIONAL_MG_MAP[activeDevotional.id];

  const devContent = {
    dayLabel:
      uiLang === 'mg'
        ? activeDevMg?.dayLabel_mg || activeDevotional.dayLabel_en
        : uiLang === 'fr'
        ? activeDevotional.dayLabel_fr
        : activeDevotional.dayLabel_en,
    title:
      uiLang === 'mg'
        ? activeDevMg?.title_mg || activeDevotional.title_en
        : uiLang === 'fr'
        ? activeDevotional.title_fr
        : activeDevotional.title_en,
    subtitle:
      uiLang === 'mg'
        ? activeDevMg?.subtitle_mg || activeDevotional.subtitle_en
        : uiLang === 'fr'
        ? activeDevotional.subtitle_fr
        : activeDevotional.subtitle_en,
    anchorVerse:
      uiLang === 'mg'
        ? activeDevMg?.anchorVerse_mg || activeDevotional.anchorVerse_en
        : uiLang === 'fr'
        ? activeDevotional.anchorVerse_fr
        : activeDevotional.anchorVerse_en,
    meditation:
      uiLang === 'mg'
        ? activeDevMg?.meditation_mg || activeDevotional.meditation_en
        : uiLang === 'fr'
        ? activeDevotional.meditation_fr
        : activeDevotional.meditation_en,
    prompts:
      uiLang === 'mg'
        ? activeDevMg?.reflectionPrompts_mg || activeDevotional.reflectionPrompts_en
        : uiLang === 'fr'
        ? activeDevotional.reflectionPrompts_fr
        : activeDevotional.reflectionPrompts_en,
    closingPrayer:
      uiLang === 'mg'
        ? activeDevMg?.closingPrayer_mg || activeDevotional.closingPrayer_en
        : uiLang === 'fr'
        ? activeDevotional.closingPrayer_fr
        : activeDevotional.closingPrayer_en,
  };

  const filteredScriptures = SCRIPTURE_TREASURY.filter((sc) => {
    if (!scriptureSearch.trim()) return true;
    const q = scriptureSearch.toLowerCase();
    const mg = SCRIPTURE_MG_MAP[sc.id];
    return (
      sc.reference_en.toLowerCase().includes(q) ||
      sc.reference_fr.toLowerCase().includes(q) ||
      (mg?.reference_mg || '').toLowerCase().includes(q) ||
      sc.theme_en.toLowerCase().includes(q) ||
      sc.theme_fr.toLowerCase().includes(q) ||
      (mg?.theme_mg || '').toLowerCase().includes(q) ||
      sc.kjv_en.toLowerCase().includes(q) ||
      sc.lsg_fr.toLowerCase().includes(q) ||
      (mg?.mg_text || '').toLowerCase().includes(q)
    );
  });

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/95 border-[#B48327]/25 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  return (
    <div className="space-y-8">
      {/* PART 1: DEVOTIONAL STUDY GUIDES */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
              <Compass className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? 'Torolalana Fandinihan-tena sy Fampianarana (MG)'
                : uiLang === 'fr'
                ? 'Guides d’Étude Dévotionnelle (FR)'
                : 'Devotional Study Guides (EN)'}
            </span>
            <h2 className="font-display text-xl sm:text-3xl font-bold mt-0.5">
              {uiLang === 'mg'
                ? 'Fampianarana sy Fandinihan-tena Lalina'
                : uiLang === 'fr'
                ? 'Méditations Théologiques & Pratiques'
                : 'Deep Devotional Meditations & Reflections'}
            </h2>
          </div>

          {/* 3 Devotional Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DEVOTIONAL_GUIDES.map((dev, idx) => {
              const isSelected = dev.id === activeDevotionalId;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => setActiveDevotionalId(dev.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                    isSelected
                      ? 'bg-[#B48327] text-white border-[#B48327] shadow-sm'
                      : darkMode
                      ? 'bg-[#171F2C] border-[#263246] text-[#A8A29E] hover:text-white'
                      : 'bg-[#F3EDE2] border-[#B48327]/25 text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {uiLang === 'mg'
                    ? `Torolalana ${idx + 1}`
                    : uiLang === 'fr'
                    ? `Guide ${idx + 1}`
                    : `Guide ${idx + 1}`}{' '}
                  • {dev.anchorScripture.split('•')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Devotional Study Card in Chosen Language (EN, FR, or MG) */}
        <article className={`rounded-2xl border p-5 sm:p-8 ${mainSurface} shadow-sm space-y-6`}>
          <div className="space-y-2 pb-5 border-b border-[#B48327]/20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                {devContent.dayLabel}
              </span>
              <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#B48327]/15 text-[#B48327] font-bold">
                {activeDevotional.anchorScripture}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold pt-1">
              {devContent.title}
            </h3>
            <p className={`text-sm sm:text-base ${subText}`}>{devContent.subtitle}</p>
          </div>

          {/* Anchor Verse Blockquote */}
          <blockquote
            className={`p-4 sm:p-5 rounded-xl border-l-4 border-[#B48327] font-display italic text-base sm:text-lg leading-relaxed ${
              darkMode ? 'bg-[#171F2C]' : 'bg-[#F3EDE2]/90'
            }`}
          >
            {devContent.anchorVerse}
          </blockquote>

          {/* Meditation Paragraphs */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
              {uiLang === 'mg'
                ? 'Fandinihana sy Fampianarana'
                : uiLang === 'fr'
                ? 'Méditation & Enseignement'
                : 'Devotional Meditation'}
            </h4>
            {devContent.meditation.map((para, idx) => (
              <p
                key={idx}
                className="font-reading text-base sm:text-[17px] leading-[1.8]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Reflection Prompts & Closing Prayer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
            <div className={`p-4 sm:p-5 rounded-xl border ${cardSurface} space-y-2.5`}>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B48327] block">
                ✦{' '}
                {uiLang === 'mg'
                  ? 'Fanontaniana Fandinihan-tena'
                  : uiLang === 'fr'
                  ? 'Questions de Réflexion Personnelle'
                  : 'Personal Reflection Prompts'}
              </span>
              <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside">
                {devContent.prompts.map((pr, idx) => (
                  <li key={idx}>{pr}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 sm:p-5 rounded-xl border-l-4 border-[#7C2D12] ${cardSurface} space-y-2`}>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] dark:text-[#D4AF37] block">
                ✦{' '}
                {uiLang === 'mg'
                  ? 'Vavaka Famaranana'
                  : uiLang === 'fr'
                  ? 'Prière de Consécration'
                  : 'Closing Consecration Prayer'}
              </span>
              <p className="font-display italic font-semibold text-base sm:text-lg leading-relaxed">
                “{devContent.closingPrayer}”
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* PART 2: SCRIPTURE TREASURY CONCORDANCE (KJV / LSG 1910 / BAIBOLY MALAGASY) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
              <BookMarked className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? 'Tahirin-tsoratra Masina — Baiboly Malagasy (15 Andininy Fototra)'
                : uiLang === 'fr'
                ? 'Trésor Biblique — Louis Segond 1910 (15 Textes Clés)'
                : 'Scripture Treasury — King James Version (15 Anchor Passages)'}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
              {uiLang === 'mg'
                ? ' ireo Soratra Masina Fototra amin’ny Vavaka'
                : uiLang === 'fr'
                ? 'Concordance des Écritures Prophétiques'
                : 'Prophetic Scripture Concordance'}
            </h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#B48327] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={scriptureSearch}
              onChange={(e) => setScriptureSearch(e.target.value)}
              placeholder={
                uiLang === 'mg'
                  ? 'Hikaroka andininy...'
                  : uiLang === 'fr'
                  ? 'Rechercher un verset...'
                  : 'Search Scripture...'
              }
              className={`w-full pl-8 pr-7 py-1.5 rounded-xl text-xs border outline-none transition ${
                darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB] focus:border-[#D4AF37]'
                  : 'bg-[#FBF8F3] border-[#B48327]/30 text-[#1C1917] focus:border-[#B48327]'
              }`}
            />
            {scriptureSearch && (
              <button
                type="button"
                onClick={() => setScriptureSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#57534E]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScriptures.map((sc) => {
            const mgSc = SCRIPTURE_MG_MAP[sc.id];
            const ref =
              uiLang === 'mg'
                ? mgSc?.reference_mg || sc.reference_en
                : uiLang === 'fr'
                ? sc.reference_fr
                : sc.reference_en;
            const theme =
              uiLang === 'mg'
                ? mgSc?.theme_mg || sc.theme_en
                : uiLang === 'fr'
                ? sc.theme_fr
                : sc.theme_en;
            const verseText =
              uiLang === 'mg'
                ? mgSc?.mg_text || sc.kjv_en
                : uiLang === 'fr'
                ? sc.lsg_fr
                : sc.kjv_en;
            const appText =
              uiLang === 'mg'
                ? mgSc?.application_mg || sc.application_en
                : uiLang === 'fr'
                ? sc.application_fr
                : sc.application_en;

            return (
              <div
                key={sc.id}
                className={`rounded-2xl border p-5 ${cardSurface} flex flex-col justify-between space-y-3`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-code text-xs font-bold px-2.5 py-0.5 rounded bg-[#B48327] text-white">
                      {ref}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(sc.id, `${ref} — ${theme}\n${verseText}`)}
                      className={`text-xs inline-flex items-center gap-1 ${subText} hover:text-[#B48327]`}
                    >
                      {copiedId === sc.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#B48327]">{theme}</h4>
                  <blockquote
                    className={`p-3.5 rounded-xl border-l-3 border-[#B48327] font-reading italic text-sm sm:text-base leading-relaxed ${
                      darkMode ? 'bg-[#121822]' : 'bg-[#FBF8F3]'
                    }`}
                  >
                    {verseText}
                  </blockquote>
                </div>

                <p className={`text-xs ${subText} pt-2 border-t border-[#B48327]/15`}>
                  <strong className="text-[#B48327]">
                    {uiLang === 'mg'
                      ? 'Fampiharana : '
                      : uiLang === 'fr'
                      ? 'Application : '
                      : 'Application: '}
                  </strong>
                  {appText}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PART 3: PERSONAL PRAYER JOURNAL & SAVED BOOKMARKS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Saved Bookmarks */}
        <div className={`lg:col-span-5 rounded-2xl border p-5 ${mainSurface} space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-[#B48327]" />
              {uiLang === 'mg'
                ? `Fanambarana Voatahiry (${savedBookmarks.length})`
                : uiLang === 'fr'
                ? `Déclarations Sauvegardées (${savedBookmarks.length})`
                : `Saved Declarations (${savedBookmarks.length})`}
            </h3>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {savedBookmarks.map((bm) => (
              <div key={bm.id} className={`p-3.5 rounded-xl border ${cardSurface} space-y-1.5`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base">{bm.title}</h4>
                    <span className="font-mono-code text-[11px] text-[#B48327]">{bm.ref}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="text-rose-500 hover:text-rose-600 p-1"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs italic leading-relaxed">
                  {uiLang === 'fr' ? bm.textFr : bm.textEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Prayer Journal */}
        <div className={`lg:col-span-7 rounded-2xl border p-5 ${mainSurface} space-y-4`}>
          <h3 className="font-display text-xl font-bold flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#B48327]" />
            {uiLang === 'mg'
              ? 'Diary Fivavahana sy Fandinihan-tena Manokana'
              : uiLang === 'fr'
              ? 'Journal Personnel de Prière & Méditation'
              : 'Personal Prayer & Devotional Journal'}
          </h3>

          <form onSubmit={handleAddNote} className="space-y-3">
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={
                uiLang === 'mg'
                  ? 'Lohatenin’ny vavaka na fahitana...'
                  : uiLang === 'fr'
                  ? 'Titre de votre sujet de prière...'
                  : 'Prayer topic or prophetic note title...'
              }
              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB]'
                  : 'bg-[#FBF8F3] border-[#B48327]/30 text-[#1C1917]'
              }`}
            />
            <textarea
              rows={3}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder={
                uiLang === 'mg'
                  ? 'Soraty eto ny vavakao, ny teny fikasana na ny fijoroana vavolombelona...'
                  : uiLang === 'fr'
                  ? 'Écrivez votre prière, révélation ou témoignage...'
                  : 'Write your prayer, revelation, or testimony...'
              }
              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB]'
                  : 'bg-[#FBF8F3] border-[#B48327]/30 text-[#1C1917]'
              }`}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? 'Tehirizo ao amin’ny Diary'
                : uiLang === 'fr'
                ? 'Enregistrer dans le Journal'
                : 'Save to Prayer Journal'}
            </button>
          </form>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-2">
            {journalNotes.map((n) => (
              <div key={n.id} className={`p-3.5 rounded-xl border ${cardSurface} space-y-1`}>
                <div className="flex items-center justify-between">
                  <strong className="text-xs sm:text-sm text-[#B48327]">{n.title}</strong>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code text-[10px] opacity-75">{n.date}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(n.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs whitespace-pre-line leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
