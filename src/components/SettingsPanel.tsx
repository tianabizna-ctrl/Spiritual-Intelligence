import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  Download,
  RotateCcw,
  Sun,
  Type,
  Upload,
  X,
  Languages,
  BookOpen,
  Database,
} from 'lucide-react';
import type { UILang } from '../data/spiritualData';
import { LIBRARY_TOTAL_VIDEOS, MUNROE_LIBRARY } from '../data/libraryCatalog';
import {
  type AppSettings,
  type LineWidth,
  type ReadingFont,
  type TextScale,
  type ThemeMode,
} from '../hooks/useSettings';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  settings: AppSettings;
  update: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  reset: () => void;
  darkMode: boolean;
  bookmarkCount: number;
  onExportBookmarks: () => void;
  onImportBookmarks: (file: File) => void;
}

const COPY: Record<
  UILang,
  {
    title: string;
    close: string;
    appearance: string;
    theme: string;
    themeParchment: string;
    themeMidnight: string;
    themeSystem: string;
    textSize: string;
    font: string;
    serif: string;
    sans: string;
    language: string;
    uiLanguage: string;
    contentLanguage: string;
    reading: string;
    lineWidth: string;
    narrow: string;
    normal: string;
    wide: string;
    rememberScroll: string;
    rememberScrollHint: string;
    library: string;
    prayers: string;
    teachings: string;
    total: string;
    data: string;
    bookmarks: string;
    exportBm: string;
    importBm: string;
    resetAll: string;
    resetHint: string;
  }
> = {
  en: {
    title: 'Settings',
    close: 'Close settings',
    appearance: 'Appearance',
    theme: 'Theme',
    themeParchment: 'Dawn Parchment',
    themeMidnight: 'Midnight Watch',
    themeSystem: 'Follow system',
    textSize: 'Reading text size',
    font: 'Reading typeface',
    serif: 'Serif',
    sans: 'Sans',
    language: 'Language',
    uiLanguage: 'Interface language',
    contentLanguage: 'Prayer content language',
    reading: 'Reading',
    lineWidth: 'Line width',
    narrow: 'Narrow',
    normal: 'Normal',
    wide: 'Wide',
    rememberScroll: 'Remember reading position',
    rememberScrollHint: 'Return to where you were when you come back.',
    library: 'Library',
    prayers: 'Prayer transcripts',
    teachings: 'Myles Munroe teachings',
    total: 'Total transcripts',
    data: 'Your data',
    bookmarks: 'Saved bookmarks',
    exportBm: 'Export',
    importBm: 'Import',
    resetAll: 'Reset all settings',
    resetHint: 'Bookmarks are not affected.',
  },
  fr: {
    title: 'Paramètres',
    close: 'Fermer les paramètres',
    appearance: 'Apparence',
    theme: 'Thème',
    themeParchment: 'Parchemin',
    themeMidnight: 'Veille de Minuit',
    themeSystem: 'Suivre le système',
    textSize: 'Taille du texte',
    font: 'Police de lecture',
    serif: 'Serif',
    sans: 'Sans',
    language: 'Langue',
    uiLanguage: 'Langue de l’interface',
    contentLanguage: 'Langue du contenu',
    reading: 'Lecture',
    lineWidth: 'Largeur des lignes',
    narrow: 'Étroite',
    normal: 'Normale',
    wide: 'Large',
    rememberScroll: 'Mémoriser la position',
    rememberScrollHint: 'Revenir là où vous étiez.',
    library: 'Bibliothèque',
    prayers: 'Transcriptions de prières',
    teachings: 'Enseignements Myles Munroe',
    total: 'Total des transcriptions',
    data: 'Vos données',
    bookmarks: 'Favoris enregistrés',
    exportBm: 'Exporter',
    importBm: 'Importer',
    resetAll: 'Réinitialiser',
    resetHint: 'Les favoris ne sont pas affectés.',
  },
  mg: {
    title: 'Fikirana',
    close: 'Hidio ny fikirana',
    appearance: 'Bika',
    theme: 'Loko',
    themeParchment: 'Taratsy vao maraina',
    themeMidnight: 'Fiambenana alina',
    themeSystem: 'Araka ny rafitra',
    textSize: 'Haben’ny soratra',
    font: 'Karazana litera',
    serif: 'Serif',
    sans: 'Sans',
    language: 'Fiteny',
    uiLanguage: 'Fitenin’ny sehatra',
    contentLanguage: 'Fitenin’ny vavaka',
    reading: 'Famakiana',
    lineWidth: 'Sakan’ny andalana',
    narrow: 'Tery',
    normal: 'Mahazatra',
    wide: 'Malalaka',
    rememberScroll: 'Tadidio ny toerana',
    rememberScrollHint: 'Hiverina amin’ny toerana nisy anao.',
    library: 'Tranomboky',
    prayers: 'Fandikana vavaka',
    teachings: 'Fampianarana Myles Munroe',
    total: 'Fandikana rehetra',
    data: 'Ny angonao',
    bookmarks: 'Mari-pamakiana voatahiry',
    exportBm: 'Avoahy',
    importBm: 'Ampidiro',
    resetAll: 'Avereno ny fikirana',
    resetHint: 'Tsy voakasika ny mari-pamakiana.',
  },
};

const LANGS: { id: UILang; flag: string; code: string; name: string }[] = [
  { id: 'en', flag: '🇬🇧', code: 'EN', name: 'English' },
  { id: 'fr', flag: '🇫🇷', code: 'FR', name: 'Français' },
  { id: 'mg', flag: '🇲🇬', code: 'MG', name: 'Malagasy' },
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  open,
  onClose,
  settings,
  update,
  reset,
  darkMode,
  bookmarkCount,
  onExportBookmarks,
  onImportBookmarks,
}) => {
  const t = COPY[settings.uiLang];
  const panelRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [justReset, setJustReset] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const surface = darkMode ? 'bg-[#131B26] text-[#F5F2EB]' : 'bg-[#FBF8F3] text-[#1C1917]';
  const border = darkMode ? 'border-[#263246]' : 'border-[#B48327]/20';
  const muted = darkMode ? 'text-[#A8A29E]' : 'text-[#78716C]';
  const card = darkMode ? 'bg-[#1A2433] border-[#263246]' : 'bg-[#F3EDE2] border-[#B48327]/20';
  const segOn = 'bg-[#B48327] text-white shadow-sm';
  const segOff = darkMode ? 'text-[#A8A29E] hover:text-[#D4AF37]' : 'text-[#57534E] hover:text-[#B48327]';

  const Section = ({
    icon,
    label,
    children,
  }: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
  }) => (
    <section className="space-y-2">
      <h3 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B48327]">
        {icon}
        {label}
      </h3>
      <div className={`rounded-xl border ${card} p-3 space-y-3`}>{children}</div>
    </section>
  );

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-semibold shrink-0">{label}</span>
      {children}
    </div>
  );

  const Segment = <T extends string>({
    value,
    options,
    onChange,
  }: {
    value: T;
    options: { id: T; label: string; title?: string }[];
    onChange: (v: T) => void;
  }) => (
    <div
      className={`inline-flex items-center rounded-lg p-0.5 border ${
        darkMode ? 'bg-[#0F141C] border-[#263246]' : 'bg-[#EAE1D3]/70 border-[#B48327]/25'
      }`}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          title={o.title}
          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
            value === o.id ? segOn : segOff
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label={t.title}
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 w-full sm:w-[26rem] border-l ${border} ${surface} shadow-xl transition-transform duration-200 overflow-y-auto outline-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className={`sticky top-0 z-10 flex items-center justify-between gap-2 px-4 py-3 border-b ${border} ${
            darkMode ? 'bg-[#131B26]/95' : 'bg-[#FBF8F3]/95'
          } backdrop-blur-md`}
        >
          <h2 className="font-display font-bold text-base flex items-center gap-2">
            <Type className="w-4 h-4 text-[#B48327]" />
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className={`p-1.5 rounded-lg ${muted} transition ${
              darkMode ? 'hover:bg-[#1C2636]' : 'hover:bg-[#EAE1D3]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-5">
          {/* Appearance */}
          <Section icon={<Sun className="w-3 h-3" />} label={t.appearance}>
            <Row label={t.theme}>
              <Segment<ThemeMode>
                value={settings.theme}
                onChange={(v) => update('theme', v)}
                options={[
                  { id: 'parchment', label: '☀', title: t.themeParchment },
                  { id: 'midnight', label: '🌙', title: t.themeMidnight },
                  { id: 'system', label: '🖥', title: t.themeSystem },
                ]}
              />
            </Row>
            <Row label={t.textSize}>
              <Segment<TextScale>
                value={settings.textScale}
                onChange={(v) => update('textScale', v)}
                options={[
                  { id: 'sm', label: 'A-' },
                  { id: 'md', label: 'A' },
                  { id: 'lg', label: 'A+' },
                  { id: 'xl', label: 'A++' },
                ]}
              />
            </Row>
            <Row label={t.font}>
              <Segment<ReadingFont>
                value={settings.readingFont}
                onChange={(v) => update('readingFont', v)}
                options={[
                  { id: 'serif', label: t.serif },
                  { id: 'sans', label: t.sans },
                ]}
              />
            </Row>
          </Section>

          {/* Language */}
          <Section icon={<Languages className="w-3 h-3" />} label={t.language}>
            <Row label={t.uiLanguage}>
              <div className="inline-flex items-center gap-0.5">
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      update('uiLang', l.id);
                      update('languageMode', l.id);
                    }}
                    aria-pressed={settings.uiLang === l.id}
                    title={l.name}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition ${
                      settings.uiLang === l.id ? segOn : segOff
                    }`}
                  >
                    <span aria-hidden className="mr-1">
                      {l.flag}
                    </span>
                    {l.code}
                  </button>
                ))}
              </div>
            </Row>
            <Row label={t.contentLanguage}>
              <Segment
                value={settings.languageMode}
                onChange={(v) => update('languageMode', v)}
                options={[
                  { id: 'en', label: 'EN' },
                  { id: 'fr', label: 'FR' },
                  { id: 'mg', label: 'MG' },
                  { id: 'both', label: 'EN+FR' },
                ]}
              />
            </Row>
          </Section>

          {/* Reading */}
          <Section icon={<BookOpen className="w-3 h-3" />} label={t.reading}>
            <Row label={t.lineWidth}>
              <Segment<LineWidth>
                value={settings.lineWidth}
                onChange={(v) => update('lineWidth', v)}
                options={[
                  { id: 'narrow', label: t.narrow },
                  { id: 'normal', label: t.normal },
                  { id: 'wide', label: t.wide },
                ]}
              />
            </Row>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold">{t.rememberScroll}</p>
                <p className={`text-[10px] leading-snug mt-0.5 ${muted}`}>{t.rememberScrollHint}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.rememberScroll}
                onClick={() => update('rememberScroll', !settings.rememberScroll)}
                className={`shrink-0 w-10 h-5 rounded-full transition relative ${
                  settings.rememberScroll ? 'bg-[#B48327]' : darkMode ? 'bg-[#334155]' : 'bg-[#D6D3D1]'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    settings.rememberScroll ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </Section>

          {/* Library */}
          <Section icon={<Database className="w-3 h-3" />} label={t.library}>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-mono font-bold text-base text-[#B48327]">{LIBRARY_TOTAL_VIDEOS}</div>
                <div className={`text-[10px] leading-tight ${muted}`}>{t.prayers}</div>
              </div>
              <div>
                <div className="font-mono font-bold text-base text-[#B48327]">
                  {MUNROE_LIBRARY.transcriptCount}
                </div>
                <div className={`text-[10px] leading-tight ${muted}`}>{t.teachings}</div>
              </div>
              <div>
                <div className="font-mono font-bold text-base text-[#B48327]">
                  {LIBRARY_TOTAL_VIDEOS + MUNROE_LIBRARY.transcriptCount}
                </div>
                <div className={`text-[10px] leading-tight ${muted}`}>{t.total}</div>
              </div>
            </div>
          </Section>

          {/* Data */}
          <Section icon={<Download className="w-3 h-3" />} label={t.data}>
            <Row label={`${t.bookmarks} (${bookmarkCount})`}>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onExportBookmarks}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold border ${border} ${muted} transition ${
                    darkMode ? 'hover:bg-[#1C2636]' : 'hover:bg-[#EAE1D3]'
                  }`}
                >
                  <Download className="w-3 h-3" />
                  {t.exportBm}
                </button>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold border ${border} ${muted} transition ${
                    darkMode ? 'hover:bg-[#1C2636]' : 'hover:bg-[#EAE1D3]'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  {t.importBm}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onImportBookmarks(f);
                    e.target.value = '';
                  }}
                />
              </div>
            </Row>

            <div>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setJustReset(true);
                  setTimeout(() => setJustReset(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-red-500/40 text-red-600 dark:text-red-400 transition hover:bg-red-500/10"
              >
                {justReset ? <Check className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
                {t.resetAll}
              </button>
              <p className={`text-[10px] mt-1 ${muted}`}>{t.resetHint}</p>
            </div>
          </Section>

          <p className={`text-[10px] text-center pb-2 ${muted}`}>
            Spiritual Intelligence • v2
          </p>
        </div>
      </div>
    </div>
  );
};
