import React, { useState } from 'react';
import {
  BookMarked,
  Sparkles,
  Search,
  PenTool,
  Plus,
  Trash2,
  Copy,
  Check,
  Bookmark,
  Compass,
} from 'lucide-react';
import {
  DEVOTIONAL_GUIDES,
  SCRIPTURE_TREASURY,
  LanguageMode,
  UILang,
} from '../data/spiritualData';

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
  languageMode,
  darkMode,
  savedBookmarks,
  onRemoveBookmark,
}) => {
  const [activeDevotionalId, setActiveDevotionalId] = useState<string>(DEVOTIONAL_GUIDES[0].id);
  const [scriptureSearch, setScriptureSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Personal Devotional & Prayer Journal persisted in localStorage
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
        title: 'Morning Watch Vision & Prayer Focus / Vision de la Veille du Matin',
        content:
          'EN: "Every morning the day comes waiting for instructions" (Job 38:12-13). Today I direct my prayer like an arrow (Psalm 5:3) and abide closely in the True Vine (John 15:5).\nFR : « Chaque matin, le jour attend des instructions » (Job 38:12-13). Aujourd’hui, je dirige ma prière comme une flèche et je demeure attaché au Cep véritable.',
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
        (uiLang === 'fr' ? 'Réflexion & Sujet de Prière' : 'Devotional Reflection & Prayer Point'),
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

  const filteredScriptures = SCRIPTURE_TREASURY.filter((sc) => {
    if (!scriptureSearch.trim()) return true;
    const q = scriptureSearch.toLowerCase();
    return (
      sc.reference_en.toLowerCase().includes(q) ||
      sc.reference_fr.toLowerCase().includes(q) ||
      sc.theme_en.toLowerCase().includes(q) ||
      sc.theme_fr.toLowerCase().includes(q) ||
      sc.kjv_en.toLowerCase().includes(q) ||
      sc.lsg_fr.toLowerCase().includes(q)
    );
  });

  const showEn = languageMode === 'both' || languageMode === 'en';
  const showFr = languageMode === 'both' || languageMode === 'fr';

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/95 border-[#B48327]/25 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/20 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  return (
    <div className="space-y-12">
      {/* SECTION 1: 3 Deep Devotional Study Guides */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
              <Compass className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? 'Méditations & Guides Dévotionnels Bilingues (EN / FR)'
                : 'Bilingual Devotional Study Guides (EN / FR)'}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold mt-1">
              {uiLang === 'fr'
                ? 'Trois Parcours de Méditation Inspirés des Transcriptions'
                : 'Three Devotional Pathways Drawn from the Video Transcriptions'}
            </h2>
          </div>

          {/* Devotional Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {DEVOTIONAL_GUIDES.map((dev, idx) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => setActiveDevotionalId(dev.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  activeDevotionalId === dev.id
                    ? 'bg-[#B48327] text-white border-[#B48327] shadow-sm'
                    : darkMode
                    ? 'bg-[#171F2C] border-[#263246] text-[#A8A29E] hover:border-[#D4AF37]'
                    : 'bg-[#F3EDE2] border-[#B48327]/25 text-[#57534E] hover:bg-[#EAE1D3]'
                }`}
              >
                {uiLang === 'fr' ? `Méditation ${idx + 1}` : `Devotional ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>

        {/* Active Devotional Reading Sanctuary */}
        <div className={`rounded-3xl border p-6 sm:p-10 ${mainSurface} shadow-sm space-y-8`}>
          {/* Header */}
          <div className="border-b border-[#B48327]/20 pb-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                {uiLang === 'fr' ? activeDevotional.dayLabel_fr : activeDevotional.dayLabel_en}
              </span>
              <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#B48327]/15 text-[#B48327] font-bold">
                {activeDevotional.anchorScripture}
              </span>
            </div>

            {showEn && (
              <h3 className="font-display text-2xl sm:text-4xl font-bold pt-1">
                {activeDevotional.title_en}
              </h3>
            )}
            {showFr && (
              <p
                className={`font-display ${
                  showEn
                    ? 'italic text-xl sm:text-2xl text-[#B48327]'
                    : 'text-2xl sm:text-4xl font-bold pt-1'
                }`}
              >
                {activeDevotional.title_fr}
              </p>
            )}
            <p className={`text-sm ${subText}`}>
              {uiLang === 'fr' ? activeDevotional.subtitle_fr : activeDevotional.subtitle_en}
            </p>
          </div>

          {/* Anchor Scripture Banner */}
          <div
            className={`p-5 rounded-2xl border-l-4 border-[#B48327] ${
              darkMode ? 'bg-[#171F2C]' : 'bg-[#F3EDE2]'
            } grid grid-cols-1 ${showEn && showFr ? 'lg:grid-cols-2' : ''} gap-6`}
          >
            {showEn && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48327] block mb-1">
                  Anchor Scripture (KJV) — {activeDevotional.anchorScripture}
                </span>
                <p className="font-display italic text-lg sm:text-xl leading-relaxed">
                  “{activeDevotional.anchorVerse_en}”
                </p>
              </div>
            )}
            {showFr && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                  Verset d’Ancrage (Louis Segond) — {activeDevotional.anchorScripture}
                </span>
                <p className="font-display italic text-lg sm:text-xl leading-relaxed">
                  « {activeDevotional.anchorVerse_fr} »
                </p>
              </div>
            )}
          </div>

          {/* Devotional Meditation Body (EN & FR) */}
          <div className={`grid grid-cols-1 ${showEn && showFr ? 'lg:grid-cols-2' : ''} gap-8`}>
            {showEn && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
                  Devotional Meditation (English)
                </h4>
                {activeDevotional.meditation_en.map((para, idx) => (
                  <p key={idx} className="font-reading text-[17px] leading-[1.8]">
                    {para}
                  </p>
                ))}

                <div
                  className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-[#171F2C] border-[#263246]' : 'bg-[#F3EDE2]/80 border-[#B48327]/25'
                  } space-y-2.5 mt-4`}
                >
                  <h5 className="font-display font-bold text-lg text-[#7C2D12] dark:text-[#D4AF37]">
                    ✦ Questions for Heart Reflection (EN)
                  </h5>
                  <ul className="space-y-2 text-sm font-reading list-disc pl-5">
                    {activeDevotional.reflectionPrompts_en.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#B48327]/15 border border-[#B48327]/35">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B48327] block mb-1">
                    Consecration Prayer (EN)
                  </span>
                  <p className="font-display italic text-lg leading-relaxed">
                    “{activeDevotional.closingPrayer_en}”
                  </p>
                </div>
              </div>
            )}

            {showFr && (
              <div
                className={`space-y-4 ${
                  showEn && showFr ? 'lg:border-l lg:border-[#B48327]/20 lg:pl-8' : ''
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37]">
                  Méditation Dévotionnelle (Français)
                </h4>
                {activeDevotional.meditation_fr.map((para, idx) => (
                  <p key={idx} className="font-reading text-[17px] leading-[1.8]">
                    {para}
                  </p>
                ))}

                <div
                  className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-[#171F2C] border-[#263246]' : 'bg-[#F3EDE2]/80 border-[#B48327]/25'
                  } space-y-2.5 mt-4`}
                >
                  <h5 className="font-display font-bold text-lg text-[#7C2D12] dark:text-[#D4AF37]">
                    ✦ Questions d’Examen Spirituel (FR)
                  </h5>
                  <ul className="space-y-2 text-sm font-reading list-disc pl-5">
                    {activeDevotional.reflectionPrompts_fr.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#7C2D12]/10 border border-[#7C2D12]/35">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                    Prière de Consécration (FR)
                  </span>
                  <p className="font-display italic text-lg leading-relaxed">
                    « {activeDevotional.closingPrayer_fr} »
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Bilingual Scripture Treasury (Bible Concordance of the 3 Videos) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
              <BookMarked className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? 'Trésor des Écritures & Concordance de Prière (KJV & Louis Segond)'
                : 'Bilingual Scripture Treasury & Prayer Concordance (KJV & Louis Segond)'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              {uiLang === 'fr'
                ? 'Versets Bibliques Fondamentaux des 3 Vidéos'
                : 'Foundational Scriptures from the 3 Video Transcriptions'}
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#B48327] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={scriptureSearch}
              onChange={(e) => setScriptureSearch(e.target.value)}
              placeholder={
                uiLang === 'fr'
                  ? 'Filtrer par verset ou thème...'
                  : 'Filter by verse or theme...'
              }
              className={`w-full pl-8 pr-4 py-2 rounded-xl text-xs border outline-none ${
                darkMode
                  ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
                  : 'bg-[#F3EDE2] border-[#B48327]/30 text-[#1C1917]'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScriptures.map((sc) => (
            <div
              key={sc.id}
              className={`rounded-2xl border p-5 ${cardSurface} flex flex-col justify-between space-y-4 shadow-sm`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono-code text-xs font-bold px-2.5 py-0.5 rounded bg-[#7C2D12] text-amber-100">
                      {uiLang === 'fr' ? sc.reference_fr : sc.reference_en}
                    </span>
                    <h4 className="font-display font-bold text-xl mt-1.5">
                      {uiLang === 'fr' ? sc.theme_fr : sc.theme_en}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        sc.id,
                        `${sc.reference_en}: "${sc.kjv_en}"\n${sc.reference_fr} : « ${sc.lsg_fr} »`
                      )
                    }
                    className="p-1.5 rounded-lg border border-[#B48327]/25 hover:bg-[#B48327]/15"
                    title="Copy Bilingual Verse"
                  >
                    {copiedId === sc.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                    )}
                  </button>
                </div>

                {showEn && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48327]">
                      English (KJV)
                    </span>
                    <p className="font-display italic text-base leading-relaxed">
                      “{sc.kjv_en}”
                    </p>
                  </div>
                )}

                {showFr && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37]">
                      Français (Louis Segond 1910)
                    </span>
                    <p className="font-display italic text-base leading-relaxed">
                      « {sc.lsg_fr} »
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#B48327]/15">
                <p className={`text-xs ${subText} leading-relaxed`}>
                  <strong className="text-[#B48327]">
                    {uiLang === 'fr' ? 'Application : ' : 'Prayer Focus: '}
                  </strong>
                  {uiLang === 'fr' ? sc.application_fr : sc.application_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Personal Prayer Journal & Saved Declarations */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Personal Prayer & Vision Journal */}
        <div className={`lg:col-span-7 rounded-2xl border p-6 ${cardSurface} space-y-5`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48327] flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" />
              {uiLang === 'fr'
                ? 'Journal Personnel de Prière & d’Inspiration'
                : 'Personal Prayer & Prophetic Idea Journal'}
            </span>
            <h3 className="font-display text-2xl font-bold mt-1">
              {uiLang === 'fr'
                ? 'Notez vos Sujets de Prière, Idées Reçues & Témoignages'
                : 'Write Down Your Prayer Points, Inspired Ideas & Testimonies'}
            </h3>
            <p className={`text-xs ${subText} mt-0.5`}>
              {uiLang === 'fr'
                ? '« Pendant que nous priions, une idée est descendue. Ne la laissez pas partir. Écrivez-la après cette prière : cette idée est une porte ! » (Vidéo 1)'
                : '“While we were praying an idea dropped. Don’t let it go. Write it down after this prayer. That idea is a door!” (Video 1)'}
            </p>
          </div>

          <form onSubmit={handleAddNote} className="space-y-3">
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={
                uiLang === 'fr'
                  ? 'Titre (ex. : Intention de prière, idée reçue, témoignage)...'
                  : 'Title (e.g., Morning prayer focus, inspired idea, testimony)...'
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
                uiLang === 'fr'
                  ? 'Écrivez votre prière personnelle, votre déclaration ou votre méditation ici...'
                  : 'Write your personal prayer, prophetic declaration, or devotional reflection here...'
              }
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#F5F2EB]'
                  : 'bg-[#FBF8F3] border-[#B48327]/30 text-[#1C1917]'
              }`}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              {uiLang === 'fr' ? 'Ajouter au Journal de Prière' : 'Save to Prayer Journal'}
            </button>
          </form>

          <div className="space-y-3 pt-2">
            {journalNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#FBF8F3] border-[#B48327]/20'
                } space-y-1.5`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code text-[11px] text-[#B48327] font-semibold">
                      {note.date}
                    </span>
                    <h4 className="font-display font-bold text-base">{note.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-xs text-[#57534E] hover:text-red-600 p-1"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-reading text-xs whitespace-pre-line leading-relaxed">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Saved / Bookmarked Declarations */}
        <div className={`lg:col-span-5 rounded-2xl border p-6 ${cardSurface} space-y-4`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37] flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              {uiLang === 'fr' ? 'Déclarations Sauvegardées' : 'Saved Sanctuary Declarations'}
            </span>
            <h3 className="font-display text-2xl font-bold mt-1">
              {uiLang === 'fr'
                ? `Vos Décrets Favoris (${savedBookmarks.length})`
                : `Your Bookmarked Decrees (${savedBookmarks.length})`}
            </h3>
          </div>

          {savedBookmarks.length === 0 ? (
            <div
              className={`p-6 rounded-xl border border-dashed text-center ${
                darkMode ? 'border-[#263246]' : 'border-[#B48327]/30'
              }`}
            >
              <p className={`text-xs ${subText}`}>
                {uiLang === 'fr'
                  ? 'Cliquez sur « Sauvegarder » sur n’importe quel chapitre de transcription ou carte de prière pour conserver vos décrets favoris ici.'
                  : 'Click "Save" on any transcription chapter or prayer card to keep your favorite prophetic decrees here for quick daily declaration.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {savedBookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#FBF8F3] border-[#B48327]/20'
                  } space-y-2`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono-code text-[10px] font-bold text-[#7C2D12] dark:text-[#D4AF37]">
                        {bm.ref}
                      </span>
                      <h4 className="font-display font-bold text-base leading-snug">{bm.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="text-xs text-[#57534E] hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {showEn && (
                    <p className="font-display italic text-sm">EN: “{bm.textEn}”</p>
                  )}
                  {showFr && (
                    <p className="font-display italic text-sm text-[#7C2D12] dark:text-amber-200">
                      FR : « {bm.textFr} »
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
