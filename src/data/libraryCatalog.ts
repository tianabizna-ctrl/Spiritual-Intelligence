/**
 * The three source playlists that make up the prayer library, and how many
 * videos each one holds (194 + 141 + 42 = 377). All 377 now have a real
 * English transcript harvested from the public Drive library.
 */
export interface LibraryPlaylist {
  /** Playlist the transcripts were actually harvested from. */
  playlistId: string;
  /**
   * Canonical public URL for the playlist. `null` when the playlist has been
   * deleted upstream and its videos are only reachable by individual ID.
   */
  playlistUrl: string | null;
  title_en: string;
  title_fr: string;
  title_mg: string;
  channel: string;
  expectedVideoCount: number;
  primaryVideoUrl: string;
}

export const LIBRARY_PLAYLISTS: LibraryPlaylist[] = [
  {
    playlistId: 'PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    title_en: 'POWERFUL JOSHUA SELMAN PRAYERS FOR YOU TODAY | MORNING PRAYERS | NIGHT PRAYERS',
    title_fr: 'PUISSANTES PRIÈRES DE JOSHUA SELMAN POUR AUJOURD’HUI | PRIÈRES DU MATIN & DE LA NUIT',
    title_mg: 'VAvaK VAIKA JOSHUA SELMAN HOHO ANIO | VAVAKA MARAINA & VAVAKA ALINA',
    channel: 'Prayer By Grace (@PrayerByGrace)',
    expectedVideoCount: 194,
    playlistUrl: 'https://www.youtube.com/playlist?list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    primaryVideoUrl:
      'https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
  },
  {
    playlistId: 'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    title_en: 'morning prayers',
    title_fr: 'prières du matin',
    title_mg: 'vavaka maraina',
    channel: 'Grace Enclave (@graceenclave)',
    expectedVideoCount: 141,
    playlistUrl: 'https://www.youtube.com/playlist?list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    primaryVideoUrl:
      'https://www.youtube.com/watch?v=CK9rP2ZBGKg&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
  },
  {
    playlistId: 'PLFyTbdmIZAj4c9I6CJNvV2XHon1SUypTh',
    title_en: '6:45 AM #prayer — morning declarations',
    title_fr: '6h45 #prière — déclarations matinales',
    title_mg: '6:45 MARAINA #vavaka — fanambarana maraina',
    channel: 'OVERCOMING DAILY (@therealovercomingdaily)',
    expectedVideoCount: 42,
    // PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs was deleted upstream; these 42 came
    // from a live sibling playlist on the same channel.
    playlistUrl: 'https://www.youtube.com/playlist?list=PLFyTbdmIZAj4c9I6CJNvV2XHon1SUypTh',
    primaryVideoUrl: 'https://www.youtube.com/watch?v=45wUm7wffBQ',
  },
];

export const LIBRARY_TOTAL_VIDEOS = LIBRARY_PLAYLISTS.reduce(
  (sum, p) => sum + p.expectedVideoCount,
  0
);

/**
 * Dr. Myles Munroe teachings library (public Drive folder).
 *
 * Verified 2026-11-24: the Drive manifest lists 474 teachings and 464 have a
 * real transcript file. The other 10 are referenced by the manifest but their
 * transcript JSON is absent from the folder, so they are not counted here.
 */
export const MUNROE_LIBRARY = {
  folderId: '1EH26MRUuPBm5mdceC3ESgY17RI7hrnxR',
  folderUrl: 'https://drive.google.com/drive/folders/1EH26MRUuPBm5mdceC3ESgY17RI7hrnxR',
  channel: 'Myles Munroe',
  manifestCount: 474,
  transcriptCount: 464,
  title_en: 'Dr. Myles Munroe Teaching Library',
  title_fr: 'Bibliothèque d’Enseignements du Dr. Myles Munroe',
  title_mg: 'Tranomboky Fampianarana Dr. Myles Munroe',
  topics: [
    'kingdom',
    'leadership',
    'available-teachings',
    'animated-teachings',
    'short-messages',
    'crisis-management',
    'men-fatherhood',
    'marriage-relationship',
    'purpose',
    'success',
    'prayer-fasting',
  ] as const,
};

/** Public Drive source for the prayer transcript library. */
export const PRAYER_LIBRARY = {
  folderId: '1DojoodInjPh6r7dHmGVKUBYT3FqL4QPk',
  folderUrl: 'https://drive.google.com/drive/folders/1DojoodInjPh6r7dHmGVKUBYT3FqL4QPk',
  title_en: 'Prayer Library',
  title_fr: 'Bibliothèque de Prières',
  title_mg: 'Tranomboky Vavaka',
};
