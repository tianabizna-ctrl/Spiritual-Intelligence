import React, { useState, useEffect } from 'react';
import {
  Flame,
  Sparkles,
  Check,
  Copy,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import {
  PRAYER_ALTAR_CARDS,
  LanguageMode,
  UILang,
  PrayerCardItem,
} from '../data/spiritualData';
import { PRAYER_CARD_MG_MAP } from '../data/malagasyData';

interface PrayersAltarViewProps {
  uiLang: UILang;
  languageMode: LanguageMode;
  darkMode: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, textEn: string, textFr: string, ref: string) => void;
}

export const PrayersAltarView: React.FC<PrayersAltarViewProps> = ({
  uiLang,
  darkMode,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [declaredIds, setDeclaredIds] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('si_declared_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Prayer Watch Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleDeclareAmen = (id: string) => {
    setDeclaredIds((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem('si_declared_counts', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const getCardContent = (card: PrayerCardItem) => {
    const mg = PRAYER_CARD_MG_MAP[card.id];
    if (uiLang === 'mg') {
      return {
        categoryLabel: mg?.categoryLabel_mg || card.categoryLabel_en,
        title: mg?.title_mg || card.title_en,
        quote: mg?.scriptureQuote_mg || card.scriptureQuote_en,
        prayer: mg?.prayerText_mg || card.prayerText_en,
        decree: mg?.decree_mg || card.decree_en,
      };
    }
    if (uiLang === 'fr') {
      return {
        categoryLabel: card.categoryLabel_fr,
        title: card.title_fr,
        quote: card.scriptureQuote_fr,
        prayer: card.prayerText_fr,
        decree: card.decree_fr,
      };
    }
    return {
      categoryLabel: card.categoryLabel_en,
      title: card.title_en,
      quote: card.scriptureQuote_en,
      prayer: card.prayerText_en,
      decree: card.decree_en,
    };
  };

  const handleCopy = (id: string, card: PrayerCardItem) => {
    const c = getCardContent(card);
    const text = `${c.title} (${card.scriptureRef})\n"${c.quote}"\n\n${c.prayer}\n\n${c.decree}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', en: 'All Prayers (12)', fr: 'Toutes (12)', mg: 'Rehetra (12)' },
    { id: 'morning', en: 'Morning Watch', fr: 'Veille du Matin', mg: 'Fiambenana Maraina' },
    { id: 'devotional', en: 'Surrender', fr: 'Abandon', mg: 'Fanoloran-tena' },
    { id: 'declarations', en: 'Declarations', fr: 'Déclarations', mg: 'Fanambarana' },
    { id: 'finances', en: 'Finances & Helpers', fr: 'Finances & Aides', mg: 'Fihariana & Mpanampy' },
    { id: 'family', en: 'Family & Marriage', fr: 'Famille & Mariage', mg: 'Ankohonana' },
    { id: 'healing', en: 'Divine Healing', fr: 'Guérison Divine', mg: 'Fanasitranana' },
    { id: 'protection', en: 'Wall of Fire', fr: 'Muraille de Feu', mg: 'Manda Afo' },
    { id: 'warfare', en: 'Midnight Warfare', fr: 'Combat de Minuit', mg: 'Ady Misasakalina' },
  ];

  const filteredCards =
    selectedCategory === 'all'
      ? PRAYER_ALTAR_CARDS
      : PRAYER_ALTAR_CARDS.filter((c) => c.category === selectedCategory);

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/95 border-[#B48327]/25 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  const totalAmens = Object.values(declaredIds).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-5">
      {/* Compact Mobile-Friendly Altar Header & Timer Bar */}
      <div className={`rounded-2xl border p-4 sm:p-6 ${cardSurface} shadow-sm space-y-4`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
              <Flame className="w-3.5 h-3.5" />
              {uiLang === 'mg'
                ? 'Alitaram-bavaka & Fanambarana Ara-paminaniana (MG)'
                : uiLang === 'fr'
                ? 'Autel de Prière & Déclarations Prophétiques (FR)'
                : 'Sanctuary Prayer Altar & Prophetic Declarations (EN)'}
            </span>
            <h2 className="font-display text-xl sm:text-3xl font-bold">
              {uiLang === 'mg'
                ? 'Mivavaha amim-Paharanitan-tsaina Ara-panahy'
                : uiLang === 'fr'
                ? 'Priez avec Intelligence Spirituelle à Chaque Veille'
                : 'Pray with Spiritual Intelligence Across Every Watch'}
            </h2>
          </div>

          {/* Compact Timer & Guided Deck Controls */}
          <div
            className={`rounded-xl border px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 ${
              darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#FBF8F3] border-[#B48327]/25'
            }`}
          >
            <div className="flex items-center gap-3">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${subText}`}>
                  <Clock className="w-3 h-3 inline mr-1 text-[#B48327]" />
                  {uiLang === 'mg' ? 'Fotoam-bavaka' : uiLang === 'fr' ? 'Chronomètre' : 'Prayer Timer'}
                </span>
                <div className="font-mono-code text-lg sm:text-xl font-bold text-[#B48327]">
                  {formatTimer(timerSeconds)}
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-[#B48327]/15 text-[#B48327] font-bold">
                ✦ {totalAmens} Amen
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {timerRunning
                  ? uiLang === 'mg'
                    ? 'Ajanony'
                    : uiLang === 'fr'
                    ? 'Pause'
                    : 'Pause'
                  : uiLang === 'mg'
                  ? 'Manomboka'
                  : uiLang === 'fr'
                  ? 'Démarrer'
                  : 'Start'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="p-1.5 rounded-lg border border-[#B48327]/30 text-[#B48327] hover:bg-[#B48327]/10"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setFocusIndex(focusIndex === null ? 0 : null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  focusIndex !== null
                    ? 'bg-[#7C2D12] text-white border-[#7C2D12]'
                    : 'border-[#B48327]/35 text-[#B48327] hover:bg-[#B48327]/10'
                }`}
              >
                {focusIndex !== null
                  ? uiLang === 'mg'
                    ? 'Hiala'
                    : uiLang === 'fr'
                    ? 'Quitter'
                    : 'Exit Deck'
                  : uiLang === 'mg'
                  ? 'Karatra Tsirairay'
                  : uiLang === 'fr'
                  ? 'Mode Guidé'
                  : 'Guided Deck'}
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-[#B48327]/15 no-scrollbar">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setFocusIndex(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                  active
                    ? 'bg-[#B48327] text-white shadow-sm'
                    : darkMode
                    ? 'bg-[#0F141C] text-[#A8A29E] hover:text-white border border-[#263246]'
                    : 'bg-[#FBF8F3] text-[#57534E] hover:text-[#1C1917] border border-[#B48327]/20'
                }`}
              >
                {uiLang === 'mg' ? cat.mg : uiLang === 'fr' ? cat.fr : cat.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guided Focus Altar Deck (when active) */}
      {focusIndex !== null && filteredCards[focusIndex] && (
        <div
          className={`rounded-3xl border-2 border-[#B48327] p-5 sm:p-8 shadow-xl ${
            darkMode ? 'bg-[#121822]' : 'bg-[#FBF8F3]'
          } space-y-5`}
        >
          {(() => {
            const card = filteredCards[focusIndex];
            const c = getCardContent(card);
            const amenCount = declaredIds[card.id] || 0;
            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#B48327]/20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                      {c.categoryLabel}
                    </span>
                    <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#B48327]/15 text-[#B48327] font-semibold">
                      {card.watchHour}
                    </span>
                    <span className="font-mono-code text-xs text-[#7C2D12] dark:text-[#D4AF37] font-bold">
                      {card.scriptureRef}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono-code ${subText}`}>
                      {focusIndex + 1} / {filteredCards.length}
                    </span>
                    <button
                      type="button"
                      disabled={focusIndex === 0}
                      onClick={() => setFocusIndex(Math.max(0, focusIndex - 1))}
                      className="p-2 rounded-lg border border-[#B48327]/30 disabled:opacity-40 hover:bg-[#B48327]/15"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={focusIndex === filteredCards.length - 1}
                      onClick={() =>
                        setFocusIndex(Math.min(filteredCards.length - 1, focusIndex + 1))
                      }
                      className="p-2 rounded-lg border border-[#B48327]/30 disabled:opacity-40 hover:bg-[#B48327]/15"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">{c.title}</h3>
                  <blockquote className="p-4 rounded-xl border-l-4 border-[#7C2D12] bg-[#B48327]/10 font-display italic text-base sm:text-lg">
                    “{c.quote}” —{' '}
                    <span className="font-mono-code text-xs not-italic font-bold">
                      {card.scriptureRef}
                    </span>
                  </blockquote>
                  <p className="font-reading text-base sm:text-lg leading-relaxed">{c.prayer}</p>
                  <div className="p-4 rounded-xl border border-[#B48327]/40 bg-[#B48327]/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B48327] block mb-1">
                      ✦{' '}
                      {uiLang === 'mg'
                        ? 'Fanambarana Ara-paminaniana'
                        : uiLang === 'fr'
                        ? 'Décret Prophétique'
                        : 'Prophetic Decree'}
                    </span>
                    <p className="font-display font-bold text-lg sm:text-xl">“{c.decree}”</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#B48327]/20 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleDeclareAmen(card.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-md"
                  >
                    <Flame className="w-4 h-4" />
                    {uiLang === 'mg'
                      ? `Ambarako izany — AMENA (${amenCount})`
                      : uiLang === 'fr'
                      ? `Je Déclare & Dis AMEN (${amenCount})`
                      : `I Declare & Say AMEN (${amenCount})`}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(card.id, card)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#B48327]/30 hover:bg-[#B48327]/15"
                  >
                    {copiedId === card.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {uiLang === 'mg' ? 'Voadikao' : uiLang === 'fr' ? 'Copié' : 'Copied'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                        {uiLang === 'mg'
                          ? 'Adikao ny Vavaka'
                          : uiLang === 'fr'
                          ? 'Copier la Prière'
                          : 'Copy Prayer'}
                      </>
                    )}
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Prayer Cards Grid in Chosen Language (EN, FR, or MG) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCards.map((card, index) => {
          const c = getCardContent(card);
          const amenCount = declaredIds[card.id] || 0;
          const isSaved = bookmarkedIds.includes(card.id);
          return (
            <article
              key={card.id}
              className={`rounded-2xl border p-5 sm:p-6 ${cardSurface} shadow-sm flex flex-col justify-between space-y-4 transition hover:border-[#B48327]/50`}
            >
              <div className="space-y-3.5">
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                      #{index + 1} • {c.categoryLabel}
                    </span>
                    <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-[#B48327]/15 text-[#B48327] font-semibold">
                      {card.watchHour}
                    </span>
                  </div>
                  <span className="font-mono-code text-xs font-bold text-[#B48327]">
                    {card.scriptureRef}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                  {c.title}
                </h3>

                {/* Scripture Quote */}
                <blockquote
                  className={`p-3.5 rounded-xl border-l-4 border-[#B48327] font-display italic text-base leading-relaxed ${
                    darkMode ? 'bg-[#121822]' : 'bg-[#FBF8F3]'
                  }`}
                >
                  “{c.quote}”
                </blockquote>

                {/* Prayer Body */}
                <p className="font-reading text-sm sm:text-base leading-relaxed">{c.prayer}</p>

                {/* Spoken Prophetic Decree */}
                <div
                  className={`p-3.5 rounded-xl border border-[#B48327]/35 ${
                    darkMode ? 'bg-[#121822]/90' : 'bg-[#FBF8F3]'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48327] block mb-1">
                    ✦{' '}
                    {uiLang === 'mg'
                      ? 'Fanambarana Ara-paminaniana :'
                      : uiLang === 'fr'
                      ? 'Décret Prophétique :'
                      : 'Prophetic Decree:'}
                  </span>
                  <p className="font-display italic font-bold text-base sm:text-lg leading-snug">
                    “{c.decree}”
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3.5 border-t border-[#B48327]/15 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDeclareAmen(card.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {uiLang === 'mg'
                    ? `Amena ! (${amenCount})`
                    : uiLang === 'fr'
                    ? `Je Dis Amen (${amenCount})`
                    : `Say Amen (${amenCount})`}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(card.id, card)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      darkMode
                        ? 'border-[#263246] hover:bg-[#121822]'
                        : 'border-[#B48327]/25 bg-[#FBF8F3] hover:bg-[#EAE1D3]'
                    }`}
                  >
                    {copiedId === card.id ? (
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
                        card.id,
                        c.title,
                        card.decree_en,
                        card.decree_fr,
                        card.scriptureRef
                      )
                    }
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      isSaved
                        ? 'bg-[#7C2D12] text-white border-[#7C2D12]'
                        : darkMode
                        ? 'border-[#263246] hover:bg-[#121822]'
                        : 'border-[#B48327]/25 bg-[#FBF8F3] hover:bg-[#EAE1D3]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {isSaved
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
            </article>
          );
        })}
      </div>
    </div>
  );
};
