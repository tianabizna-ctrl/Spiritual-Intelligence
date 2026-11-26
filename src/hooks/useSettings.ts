import { useCallback, useEffect, useState } from 'react';
import type { LanguageMode, UILang } from '../data/spiritualData';

/**
 * One persisted settings store for the whole shell.
 *
 * Before this existed, theme / language / text size were scattered across the
 * header and every individual view, each keeping its own copy of the state.
 * Everything now flows from here and is written to localStorage.
 */

export type ThemeMode = 'parchment' | 'midnight' | 'system';
export type ReadingFont = 'serif' | 'sans';
export type TextScale = 'sm' | 'md' | 'lg' | 'xl';
export type LineWidth = 'narrow' | 'normal' | 'wide';

export interface AppSettings {
  theme: ThemeMode;
  uiLang: UILang;
  languageMode: LanguageMode;
  textScale: TextScale;
  readingFont: ReadingFont;
  lineWidth: LineWidth;
  rememberScroll: boolean;
  searchScope: 'all' | 'current';
}

const STORAGE_KEY = 'si_settings_v2';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'parchment',
  uiLang: 'en',
  languageMode: 'en',
  textScale: 'md',
  readingFont: 'serif',
  lineWidth: 'normal',
  rememberScroll: true,
  searchScope: 'all',
};

function readStored(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    // Merge so a settings object written by an older build still loads.
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Reading text size, shared by the reader and any other long-form content. */
export const TEXT_SCALE_CLASS: Record<TextScale, string> = {
  sm: 'text-[15px] leading-[1.7]',
  md: 'text-[17px] leading-[1.8]',
  lg: 'text-[19px] leading-[1.85]',
  xl: 'text-[21px] leading-[1.9]',
};

export const LINE_WIDTH_CLASS: Record<LineWidth, string> = {
  narrow: 'max-w-[52ch]',
  normal: 'max-w-[68ch]',
  wide: 'max-w-[84ch]',
};

export const READING_FONT_CLASS: Record<ReadingFont, string> = {
  serif: 'font-serif',
  sans: 'font-sans',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage can be unavailable (private mode) — settings stay in memory
    }
  }, [settings]);

  const update = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const patch = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  return { settings, update, patch, reset };
}

/**
 * Resolves the theme setting to a boolean, following the OS when set to
 * 'system' and reacting to OS changes live.
 */
export function useDarkMode(theme: ThemeMode): boolean {
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  const [systemDark, setSystemDark] = useState<boolean>(() => prefersDark?.matches ?? false);

  useEffect(() => {
    if (!prefersDark) return;
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    prefersDark.addEventListener('change', handler);
    return () => prefersDark.removeEventListener('change', handler);
  }, [prefersDark]);

  if (theme === 'system') return systemDark;
  return theme === 'midnight';
}
