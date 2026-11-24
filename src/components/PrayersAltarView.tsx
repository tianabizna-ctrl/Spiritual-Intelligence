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
  Shield,
  Heart,
  Sun,
  Moon,
} from 'lucide-react';
import {
  PRAYER_ALTAR_CARDS,
  LanguageMode,
  UILang,
  PrayerCardItem,
} from '../data/spiritualData';

interface PrayersAltarViewProps {
  uiLang: UILang;
  languageMode: LanguageMode;
  darkMode: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, textEn: string, textFr: string, ref: string) => void;
}

export const PrayersAltarView: React.FC<PrayersAltarViewProps> = ({
  uiLang,
  languageMode,
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

  const handleCopy = (id: string, card: PrayerCardItem) => {
    const text = `${card.title_en} (${card.scriptureRef})\n"${card.scriptureQuote_en}"\nPrayer: ${card.prayerText_en}\nDecree: ${card.decree_en}\n\n${card.title_fr}\n« ${card.scriptureQuote_fr} »\nPrière : ${card.prayerText_fr}\nDécret : ${card.decree_fr}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label_en: 'All Prayer Watches (9)', label_fr: 'Toutes les Veilles (9)' },
    { id: 'morning', label_en: 'Command the Morning', label_fr: 'Commander le Matin' },
    { id: 'devotional', label_en: 'Morning Surrender', label_fr: 'Abandon Matinal' },
    { id: 'declarations', label_en: '6:45 AM Declarations', label_fr: 'Déclarations 6h45' },
    { id: 'finances', label_en: 'Finances & Helpers', label_fr: 'Finances & Aides' },
    { id: 'family', label_en: 'Family & Marriage', label_fr: 'Famille & Mariage' },
    { id: 'healing', label_en: 'Divine Healing', label_fr: 'Guérison Divine' },
    { id: 'protection', label_en: 'Wall of Fire', label_fr: 'Muraille de Feu' },
    { id: 'warfare', label_en: 'Midnight Warfare', label_fr: 'Combat de Minuit' },
  ];

  const filteredCards =
    selectedCategory === 'all'
      ? PRAYER_ALTAR_CARDS
      : PRAYER_ALTAR_CARDS.filter((c) => c.category === selectedCategory);

  const showEn = languageMode === 'both' || languageMode === 'en';
  const showFr = languageMode === 'both' || languageMode === 'fr';

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/95 border-[#B48327]/25 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  const totalAmens = Object.values(declaredIds).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Header & Prayer Altar Watch Timer Banner */}
      <div className={`rounded-2xl border p-5 sm:p-7 ${cardSurface} shadow-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
              <Flame className="w-4 h-4" />
              {uiLang === 'fr'
                ? 'Autel de Prière & Déclarations Prophétiques (EN / FR)'
                : 'Sanctuary Prayer Altar & Prophetic Declarations (EN / FR)'}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold">
              {uiLang === 'fr'
                ? 'Priez avec Intelligence Spirituelle à Chaque Veille'
                : 'Pray with Spiritual Intelligence Across Every Watch'}
            </h2>
            <p className={`text-sm ${subText} leading-relaxed`}>
              {uiLang === 'fr'
                ? 'Toutes les prières ci-dessous sont extraites directement des 3 vidéos de l’Apôtre Joshua Selman et de Grace Enclave, structurées avec leurs versets bibliques d’ancrage et leurs décrets prophétiques en anglais et en français.'
                : 'Every prayer point below is distilled directly from the 3 video sessions by Apostle Joshua Selman and Grace Enclave, complete with anchor Scriptures and spoken prophetic decrees in both English and French.'}
            </p>
          </div>

          {/* Interactive Prayer Watch Timer & Focus Mode Launcher */}
          <div
            className={`rounded-xl border p-4 flex flex-col sm:flex-row items-center gap-4 shrink-0 ${
              darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#FBF8F3] border-[#B48327]/25'
            }`}
          >
            <div className="text-center sm:text-left">
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${subText}`}>
                <Clock className="w-3 h-3 inline mr-1 text-[#B48327]" />
                {uiLang === 'fr' ? 'Chronomètre de Veille' : 'Prayer Watch Timer'}
              </span>
              <div className="font-mono-code text-2xl font-bold text-[#B48327] mt-0.5">
                {formatTimer(timerSeconds)}
              </div>
              <span className="text-[11px] text-[#7C2D12] dark:text-[#D4AF37] font-semibold">
                ✦ {totalAmens} {uiLang === 'fr' ? 'Déclarations « Amen »' : 'Spoken "Amen" Decrees'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {timerRunning
                  ? uiLang === 'fr'
                    ? 'Pause'
                    : 'Pause'
                  : uiLang === 'fr'
                  ? 'Démarrer Veille'
                  : 'Start Watch'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(0);
                }}
                title="Reset Timer"
                className={`p-2 rounded-lg border transition ${
                  darkMode ? 'border-[#263246] hover:bg-[#171F2C]' : 'border-[#B48327]/25 hover:bg-[#EAE1D3]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setFocusIndex(focusIndex === null ? 0 : null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#7C2D12] text-amber-100 hover:bg-[#63220D] transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {focusIndex !== null
                  ? uiLang === 'fr'
                    ? 'Quitter Mode Guidé'
                    : 'Exit Guided Deck'
                  : uiLang === 'fr'
                  ? 'Mode Autel Guidé'
                  : 'Guided Altar Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-5 mt-5 border-t border-[#B48327]/15 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setFocusIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
                selectedCategory === cat.id
                  ? 'bg-[#B48327] text-white border-[#B48327] shadow-sm'
                  : darkMode
                  ? 'bg-[#0F141C] border-[#263246] text-[#A8A29E] hover:border-[#D4AF37]'
                  : 'bg-[#FBF8F3] border-[#B48327]/25 text-[#57534E] hover:bg-[#EAE1D3]'
              }`}
            >
              {uiLang === 'fr' ? cat.label_fr : cat.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* Guided Focus Altar Deck (when active) */}
      {focusIndex !== null && filteredCards[focusIndex] && (
        <div
          className={`rounded-3xl border-2 border-[#B48327] p-6 sm:p-10 shadow-xl ${
            darkMode ? 'bg-[#121822]' : 'bg-[#FBF8F3]'
          } space-y-6`}
        >
          {(() => {
            const card = filteredCards[focusIndex];
            const amenCount = declaredIds[card.id] || 0;
            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#B48327]/20">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                      {uiLang === 'fr' ? card.categoryLabel_fr : card.categoryLabel_en}
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
                      {uiLang === 'fr' ? 'Carte de Prière' : 'Prayer Card'} {focusIndex + 1} /{' '}
                      {filteredCards.length}
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {showEn && (
                    <div className={`space-y-4 ${!showFr ? 'lg:col-span-2' : ''}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#B48327]">
                        English Prayer Point (EN)
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold">
                        {card.title_en}
                      </h3>
                      <blockquote className="p-4 rounded-xl border-l-4 border-[#7C2D12] bg-[#B48327]/10 font-display italic text-lg">
                        “{card.scriptureQuote_en}” —{' '}
                        <span className="font-mono-code text-xs not-italic font-bold">
                          {card.scriptureRef}
                        </span>
                      </blockquote>
                      <p className="font-reading text-lg leading-relaxed">{card.prayerText_en}</p>
                      <div className="p-4 rounded-xl border border-[#B48327]/40 bg-[#B48327]/10">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#B48327] block mb-1">
                          ✦ Prophetic Decree
                        </span>
                        <p className="font-display font-bold text-xl">“{card.decree_en}”</p>
                      </div>
                    </div>
                  )}

                  {showFr && (
                    <div className={`space-y-4 ${!showEn ? 'lg:col-span-2' : ''}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37]">
                        Point de Prière en Français (FR)
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold">
                        {card.title_fr}
                      </h3>
                      <blockquote className="p-4 rounded-xl border-l-4 border-[#B48327] bg-[#B48327]/10 font-display italic text-lg">
                        « {card.scriptureQuote_fr} » —{' '}
                        <span className="font-mono-code text-xs not-italic font-bold">
                          {card.scriptureRef}
                        </span>
                      </blockquote>
                      <p className="font-reading text-lg leading-relaxed">{card.prayerText_fr}</p>
                      <div className="p-4 rounded-xl border border-[#7C2D12]/40 bg-[#7C2D12]/10">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] dark:text-[#D4AF37] block mb-1">
                          ✦ Décret Prophétique
                        </span>
                        <p className="font-display font-bold text-xl">« {card.decree_fr} »</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#B48327]/20 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleDeclareAmen(card.id)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-md"
                  >
                    <Flame className="w-4 h-4" />
                    {uiLang === 'fr'
                      ? `Je Déclare & Dis AMEN (${amenCount})`
                      : `I Declare & Say AMEN (${amenCount})`}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(card.id, card)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#B48327]/30 hover:bg-[#B48327]/15"
                    >
                      {copiedId === card.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#B48327]" /> Copy Prayer (EN/FR)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Prayer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card, index) => {
          const amenCount = declaredIds[card.id] || 0;
          const isSaved = bookmarkedIds.includes(card.id);
          return (
            <article
              key={card.id}
              className={`rounded-2xl border p-6 ${cardSurface} shadow-sm flex flex-col justify-between space-y-5 transition hover:border-[#B48327]/50`}
            >
              <div className="space-y-4">
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#7C2D12] text-amber-100">
                      {uiLang === 'fr' ? card.categoryLabel_fr : card.categoryLabel_en}
                    </span>
                    <span className="font-mono-code text-xs px-2 py-0.5 rounded bg-[#B48327]/15 text-[#B48327] font-semibold">
                      {card.watchHour}
                    </span>
                  </div>
                  <span className="font-mono-code text-xs font-bold text-[#7C2D12] dark:text-[#D4AF37]">
                    {card.scriptureRef}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  {showEn && (
                    <h3 className="font-display text-2xl font-bold leading-snug">
                      {card.title_en}
                    </h3>
                  )}
                  {showFr && (
                    <p
                      className={`font-display ${
                        showEn ? 'italic text-lg text-[#B48327] mt-0.5' : 'text-2xl font-bold leading-snug'
                      }`}
                    >
                      {card.title_fr}
                    </p>
                  )}
                </div>

                {/* Scripture Anchor */}
                <div
                  className={`p-3.5 rounded-xl border-l-4 border-[#B48327] ${
                    darkMode ? 'bg-[#0F141C]' : 'bg-[#FBF8F3]'
                  } space-y-2`}
                >
                  {showEn && (
                    <p className="font-display italic text-base leading-relaxed">
                      “{card.scriptureQuote_en}”
                    </p>
                  )}
                  {showFr && (
                    <p className="font-display italic text-base leading-relaxed text-[#7C2D12] dark:text-amber-200/90">
                      « {card.scriptureQuote_fr} »
                    </p>
                  )}
                </div>

                {/* Prayer Body */}
                <div className="space-y-3">
                  {showEn && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48327] block mb-0.5">
                        English Prayer (EN)
                      </span>
                      <p className="font-reading text-[15.5px] leading-relaxed">
                        {card.prayerText_en}
                      </p>
                    </div>
                  )}
                  {showFr && (
                    <div className={showEn ? 'pt-2 border-t border-[#B48327]/15' : ''}>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C2D12] dark:text-[#D4AF37] block mb-0.5">
                        Prière en Français (FR)
                      </span>
                      <p className="font-reading text-[15.5px] leading-relaxed">
                        {card.prayerText_fr}
                      </p>
                    </div>
                  )}
                </div>

                {/* Prophetic Decree Box */}
                <div
                  className={`p-3.5 rounded-xl border ${
                    darkMode
                      ? 'bg-[#1C2636] border-[#D4AF37]/30'
                      : 'bg-[#EAE1D3]/70 border-[#B48327]/30'
                  } space-y-1.5`}
                >
                  {showEn && (
                    <p className="font-display font-bold text-base">
                      ✦ EN Decree: “{card.decree_en}”
                    </p>
                  )}
                  {showFr && (
                    <p className="font-display font-bold text-base text-[#7C2D12] dark:text-amber-200">
                      ✦ Décret FR : « {card.decree_fr} »
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Buttons */}
              <div className="pt-3 border-t border-[#B48327]/15 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDeclareAmen(card.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
                >
                  <Flame className="w-3.5 h-3.5" />
                  {uiLang === 'fr' ? `Amen ! Je Déclare (${amenCount})` : `Amen! I Declare (${amenCount})`}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFocusIndex(index)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      darkMode
                        ? 'border-[#263246] hover:bg-[#0F141C]'
                        : 'border-[#B48327]/25 bg-[#FBF8F3] hover:bg-[#EAE1D3]'
                    }`}
                  >
                    {uiLang === 'fr' ? 'Focus' : 'Focus'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(card.id, card)}
                    className={`p-1.5 rounded-lg border transition ${
                      darkMode
                        ? 'border-[#263246] hover:bg-[#0F141C]'
                        : 'border-[#B48327]/25 bg-[#FBF8F3] hover:bg-[#EAE1D3]'
                    }`}
                    title="Copy Prayer"
                  >
                    {copiedId === card.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#B48327]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onToggleBookmark(
                        card.id,
                        uiLang === 'fr' ? card.title_fr : card.title_en,
                        card.decree_en,
                        card.decree_fr,
                        card.scriptureRef
                      )
                    }
                    className={`p-1.5 rounded-lg border transition ${
                      isSaved
                        ? 'bg-[#B48327] text-white border-[#B48327]'
                        : darkMode
                        ? 'border-[#263246] hover:bg-[#0F141C]'
                        : 'border-[#B48327]/25 bg-[#FBF8F3] hover:bg-[#EAE1D3]'
                    }`}
                    title="Save to Personal Altar"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
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
