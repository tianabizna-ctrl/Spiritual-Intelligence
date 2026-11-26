/**
 * Single source of truth for the two different things this app contains.
 *
 * The reader has NINE hand-authored sessions — chapters, prayers, declarations
 * and Malagasy translations written by hand. The Full Library holds the whole
 * harvested corpus as plain text. Conflating the two is what produced the
 * stale "9 videos" and "40 chapters" claims, so every label reads its number
 * from here instead of hardcoding it.
 */

import { VIDEOS_DATA } from './spiritualData';
import { COMPANION_VIDEOS_DATA } from './compendiumData';
import { LIBRARY_TRANSCRIPT_COUNT } from './libraryTranscripts';

/** Distinct videos that have hand-authored chapters. */
const STRUCTURED_VIDEOS = [...VIDEOS_DATA, ...COMPANION_VIDEOS_DATA];

/** Number of sessions with full hand-authored structure (chapters etc.). */
export const STRUCTURED_SESSION_COUNT = STRUCTURED_VIDEOS.length;

/**
 * Number of chapters across those sessions. Derived, because the UI previously
 * hardcoded "40" while the data contained 26.
 */
export const STRUCTURED_CHAPTER_COUNT = STRUCTURED_VIDEOS.reduce(
  (sum, video) => sum + (video.chapters?.length ?? 0),
  0
);

/** Every harvested transcript, prayers plus teachings. */
export const TOTAL_TRANSCRIPT_COUNT = LIBRARY_TRANSCRIPT_COUNT;

/** Localised copy for the structured-vs-library distinction. */
export const SCOPE_TEXT = {
  en: {
    sessionOf: (n: number) => `Structured ${n} of ${STRUCTURED_SESSION_COUNT}`,
    sessionShort: (n: number) => `${n}/${STRUCTURED_SESSION_COUNT}`,
    hideCards: 'Hide session cards',
    browseSessions: `Browse ${STRUCTURED_SESSION_COUNT} structured sessions`,
    allSessions: `✦ ${STRUCTURED_SESSION_COUNT} structured prayer sessions (tap to switch)`,
    expandAll: `Expand ${STRUCTURED_SESSION_COUNT} structured sessions`,
    compendiumSection: `${STRUCTURED_SESSION_COUNT} structured sessions · ${STRUCTURED_CHAPTER_COUNT} chapters`,
    compendiumContents: 'Contents of all structured sessions (English)',
    scopeNote: `${STRUCTURED_SESSION_COUNT} structured sessions with chapters, prayers and MG translations · ${TOTAL_TRANSCRIPT_COUNT} full transcripts in the Full Library`,
  },
  fr: {
    sessionOf: (n: number) => `Structuré ${n} sur ${STRUCTURED_SESSION_COUNT}`,
    sessionShort: (n: number) => `${n}/${STRUCTURED_SESSION_COUNT}`,
    hideCards: 'Masquer les cartes de session',
    browseSessions: `Parcourir les ${STRUCTURED_SESSION_COUNT} sessions structurées`,
    allSessions: `✦ ${STRUCTURED_SESSION_COUNT} sessions de prière structurées (cliquez pour changer)`,
    expandAll: `Déplier les ${STRUCTURED_SESSION_COUNT} sessions structurées`,
    compendiumSection: `${STRUCTURED_SESSION_COUNT} sessions structurées · ${STRUCTURED_CHAPTER_COUNT} chapitres`,
    compendiumContents: 'Contenu de toutes les sessions structurées (anglais)',
    scopeNote: `${STRUCTURED_SESSION_COUNT} sessions structurées avec chapitres, prières et traductions MG · ${TOTAL_TRANSCRIPT_COUNT} transcriptions complètes dans la Bibliothèque`,
  },
  mg: {
    sessionOf: (n: number) => `Voarindra ${n} amin’ny ${STRUCTURED_SESSION_COUNT}`,
    sessionShort: (n: number) => `${n}/${STRUCTURED_SESSION_COUNT}`,
    hideCards: 'Afenina ny karatra fotoam-bavaka',
    browseSessions: `Hijery ireo fotoam-bavaka voarindra ${STRUCTURED_SESSION_COUNT}`,
    allSessions: `✦ Fotoam-bavaka voarindra ${STRUCTURED_SESSION_COUNT} (tsindrio hanovana)`,
    expandAll: `Sokafy ireo fotoam-bavindra ${STRUCTURED_SESSION_COUNT}`,
    compendiumSection: `Fotoam-bavaka voarindra ${STRUCTURED_SESSION_COUNT} · Toko ${STRUCTURED_CHAPTER_COUNT}`,
    compendiumContents: 'Votoatin’ny fotoam-bavaka voarindra rehetra (anglisy)',
    scopeNote: `Fotoam-bavaka voarindra ${STRUCTURED_SESSION_COUNT} misy toko, vavaka sy fandikana MG · Fandikana feno ${TOTAL_TRANSCRIPT_COUNT} ao amin’ny Tranomboky`,
  },
} as const;
