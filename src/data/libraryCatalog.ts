/**
 * The three source playlists that make up the Spiritual Intelligence library,
 * and how many videos each one holds. These counts are the authoritative
 * target for the harvest pipeline (194 + 141 + 42 = 377).
 */
export interface LibraryPlaylist {
  playlistId: string;
  title_en: string;
  title_fr: string;
  title_mg: string;
  channel: string;
  expectedVideoCount: number;
  playlistUrl: string;
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
    playlistId: 'PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    title_en: '6:45 AM #prayer — morning declarations',
    title_fr: '6h45 #prière — déclarations matinales',
    title_mg: '6:45 MARAINA #vavaka — fanambarana maraina',
    channel: 'OVERCOMING DAILY (@therealovercomingdaily)',
    expectedVideoCount: 42,
    playlistUrl: 'https://www.youtube.com/playlist?list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    primaryVideoUrl:
      'https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
  },
];

export const LIBRARY_TOTAL_VIDEOS = LIBRARY_PLAYLISTS.reduce(
  (sum, p) => sum + p.expectedVideoCount,
  0
);
