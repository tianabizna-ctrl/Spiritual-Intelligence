import React, { useEffect, useRef } from 'react';
import {
  BookOpen,
  Compass,
  ExternalLink,
  FileText,
  Flame,
  Layers,
  LayoutGrid,
  Library,
  Settings as SettingsIcon,
  Sparkles,
  X,
} from 'lucide-react';
import type { UILang } from '../data/spiritualData';
import { LIBRARY_TOTAL_VIDEOS, MUNROE_LIBRARY } from '../data/libraryCatalog';

export type Section =
  | 'transcriptions'
  | 'prayers'
  | 'devotionals'
  | 'library'
  | 'collections'
  | 'compendium'
  | 'downloads';

interface SidebarProps {
  uiLang: UILang;
  activeSection: Section;
  onNavigate: (section: Section) => void;
  onOpenSettings: () => void;
  darkMode: boolean;
  /** Mobile drawer state. On desktop the rail is always visible. */
  open: boolean;
  onClose: () => void;
}

const NAV_TEXT: Record<
  UILang,
  {
    groups: { read: string; study: string; outputs: string };
    sections: Record<Section, string>;
    settings: string;
    close: string;
    source: string;
  }
> = {
  en: {
    groups: { read: 'Read', study: 'Study', outputs: 'Outputs' },
    sections: {
      transcriptions: 'Read Prayers',
      prayers: 'Prayer Altar',
      devotionals: 'Devotionals',
      library: 'Full Library',
      collections: 'Collections',
      compendium: 'All Titles',
      downloads: 'DOCX Downloads',
    },
    settings: 'Settings',
    close: 'Close menu',
    source: 'Source library',
  },
  fr: {
    groups: { read: 'Lire', study: 'Étudier', outputs: 'Fichiers' },
    sections: {
      transcriptions: 'Lire les Prières',
      prayers: 'Autel de Prière',
      devotionals: 'Méditations',
      library: 'Bibliothèque',
      collections: 'Collections',
      compendium: 'Tous les Titres',
      downloads: 'Téléchargements .DOCX',
    },
    settings: 'Paramètres',
    close: 'Fermer le menu',
    source: 'Bibliothèque source',
  },
  mg: {
    groups: { read: 'Vakio', study: 'Fandalinana', outputs: 'Rakitra' },
    sections: {
      transcriptions: 'Vakio ny Vavaka',
      prayers: 'Alitara Vavaka',
      devotionals: 'Fanadihadiana',
      library: 'Tranomboky',
      collections: 'Fanangonana',
      compendium: 'Lohateny Rehetra',
      downloads: 'Fampidirana .DOCX',
    },
    settings: 'Fikirana',
    close: 'Hidio ny menio',
    source: 'Tranomboky niandohana',
  },
};

const GROUPS: { key: 'read' | 'study' | 'outputs'; items: { id: Section; icon: React.ReactNode }[] }[] =
  [
    {
      key: 'read',
      items: [
        { id: 'transcriptions', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'prayers', icon: <Flame className="w-4 h-4" /> },
        { id: 'devotionals', icon: <Compass className="w-4 h-4" /> },
      ],
    },
    {
      key: 'study',
      items: [
        { id: 'library', icon: <Library className="w-4 h-4" /> },
        { id: 'collections', icon: <LayoutGrid className="w-4 h-4" /> },
        { id: 'compendium', icon: <Layers className="w-4 h-4" /> },
      ],
    },
    {
      key: 'outputs',
      items: [{ id: 'downloads', icon: <FileText className="w-4 h-4" /> }],
    },
  ];

export const Sidebar: React.FC<SidebarProps> = ({
  uiLang,
  activeSection,
  onNavigate,
  onOpenSettings,
  darkMode,
  open,
  onClose,
}) => {
  const t = NAV_TEXT[uiLang];
  const panelRef = useRef<HTMLElement>(null);

  // Mobile drawer: ESC closes, body scroll locks, focus moves into the panel.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;

      // Keep Tab inside the drawer while it is open.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const muted = darkMode ? 'text-[#A8A29E]' : 'text-[#78716C]';
  const border = darkMode ? 'border-[#263246]' : 'border-[#B48327]/15';
  const activeBg = 'bg-[#B48327] text-white shadow-sm';
  const hoverBg = darkMode ? 'hover:bg-[#1C2636]' : 'hover:bg-[#EAE1D3]/70';

  const panel = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className={`px-4 py-4 border-b ${border} flex items-center justify-between gap-2`}>
        <button
          type="button"
          onClick={() => {
            onNavigate('transcriptions');
            onClose();
          }}
          className="flex items-center gap-2.5 text-left min-w-0"
        >
          <div className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-[#B48327] to-[#7C2D12] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="font-display font-bold text-sm block leading-tight truncate">
              Spiritual Intelligence
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#B48327]">
              EN • FR • MG
            </span>
          </div>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className={`lg:hidden p-1.5 rounded-lg ${muted} ${hoverBg} transition`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sections */}
      <nav aria-label="Sections" className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {GROUPS.map((group) => (
          <div key={group.key} className="space-y-0.5">
            <h3 className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B48327]">
              {t.groups[group.key]}
            </h3>
            {group.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-left transition ${
                    isActive ? activeBg : `${muted} ${hoverBg}`
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{t.sections[item.id]}</span>
                </button>
              );
            })}
          </div>
        ))}

        {/* Library source hint */}
        <div className={`mx-1 rounded-lg border ${border} p-2.5 space-y-1`}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#B48327]">
            {t.source}
          </p>
          <p className={`text-[11px] leading-snug ${muted}`}>
            {LIBRARY_TOTAL_VIDEOS} + {MUNROE_LIBRARY.transcriptCount} transcripts
          </p>
          <a
            href={MUNROE_LIBRARY.folderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B48327] hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Drive
          </a>
        </div>
      </nav>

      {/* Settings pinned to the bottom */}
      <div className={`px-2 py-3 border-t ${border}`}>
        <button
          type="button"
          onClick={() => {
            onOpenSettings();
            onClose();
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-left transition ${muted} ${hoverBg}`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>{t.settings}</span>
        </button>
      </div>
    </div>
  );

  const surface = darkMode ? 'bg-[#131B26] text-[#F5F2EB]' : 'bg-[#FBF8F3] text-[#1C1917]';

  return (
    <>
      {/* Desktop rail */}
      <aside
        className={`hidden lg:flex lg:flex-col fixed inset-y-0 left-0 w-60 border-r ${border} ${surface} z-40`}
      >
        {panel}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <aside
          ref={panelRef}
          role="dialog"
          aria-modal={open}
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 w-[85%] max-w-xs border-r ${border} ${surface} shadow-xl transition-transform duration-200 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {panel}
        </aside>
      </div>
    </>
  );
};
