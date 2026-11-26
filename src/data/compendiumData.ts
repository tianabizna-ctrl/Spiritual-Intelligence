export interface PlaylistTrackItem {
  youtubeId: string;
  title_en: string;
  title_fr: string;
  duration: string;
  channel: string;
  url: string;
  isPrimaryRequested?: boolean;
  hasFullTranscriptInApp: boolean;
  summary_en: string;
  summary_fr: string;
}

export interface PlaylistDirectoryItem {
  playlistId: string;
  playlistTitle_en: string;
  playlistTitle_fr: string;
  channel: string;
  playlistUrl: string;
  primaryVideoUrl: string;
  description_en: string;
  description_fr: string;
  tracks: PlaylistTrackItem[];
}


export const PLAYLIST_DIRECTORY: PlaylistDirectoryItem[] = [
  {
    playlistId: 'PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    playlistTitle_en: 'Playlist 1: POWERFUL JOSHUA SELMAN PRAYERS FOR YOU TODAY | MORNING PRAYERS | NIGHT PRAYERS',
    playlistTitle_fr: 'Playlist 1 : PUISSANTES PRIÈRES DE JOSHUA SELMAN POUR AUJOURD’HUI | PRIÈRES DU MATIN & DE LA NUIT',
    channel: 'Prayer By Grace (@PrayerByGrace)',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    primaryVideoUrl: 'https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    description_en:
      'Extended prophetic warfare, morning watch command, altar-breaking, and midnight recovery ministrations curated by Prayer By Grace.',
    description_fr:
      'Sessions prolongées de combat prophétique, commandement de l’aube, destruction des autels et récupération de minuit diffusées par Prayer By Grace.',
    tracks: [
      {
        youtubeId: '4YElIs15_Ak',
        title_en: '[POWERFUL 🔥] COMMAND YOUR DAY IN TOTAL VICTORY BY DECLARING THESE POWERFUL PRAYER | JOSHUA SELMAN',
        title_fr: '[PUISSANT 🔥] COMMANDEZ VOTRE JOURNÉE DANS UNE VICTOIRE TOTALE EN DÉCLARANT CES PUISSANTES PRIÈRES | JOSHUA SELMAN',
        duration: '1:24:44',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
        isPrimaryRequested: true,
        hasFullTranscriptInApp: true,
        summary_en: 'Primary Requested Video 1 — 14-chapter Dawn Command & Midnight Warfare manual (Job 38:12-13, Esther 7:10, Isaiah 54:17).',
        summary_fr: 'Vidéo Principale 1 — Manuel en 14 chapitres de Commandement de l’Aube & Veille de Minuit (Job 38:12-13, Esther 7:10, Ésaïe 54:17).',
      },
      {
        youtubeId: 'HQzfk0DMgCo',
        title_en: 'SPEAK FIRE INTO THE NEW MONTH BEFORE THE ENEMY DOES | APOSTLE JOSHUA SELMAN',
        title_fr: 'PROCLAMEZ LE FEU DANS LE NOUVEAU MOIS AVANT QUE L’ENNEMI NE LE FASSE | APÔTRE JOSHUA SELMAN',
        duration: '41:17',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=HQzfk0DMgCo&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7&index=2',
        hasFullTranscriptInApp: true,
        summary_en: 'Speaking first into the courts of heaven over the new month, breaking yokes, overthrowing altars, and prophesying over all 4 weeks.',
        summary_fr: 'Parler le premier dans les parvis célestes sur le nouveau mois, briser les jougs, renverser les autels et prophétiser sur les 4 semaines.',
      },
      {
        youtubeId: 'ZSKymClHnzE',
        title_en: 'JEHOVAH SHAMMAH, THE GOD WHO IS THERE, GO AHEAD OF ME INTO EVERY ROOM I ENTER TODAY! | JOSHUA SELMAN',
        title_fr: 'JÉHOVAH SHAMMAH, LE DIEU QUI EST LÀ, PRÉCÈDE-MOI DANS CHAQUE PIÈCE OÙ J’ENTRE AUJOURD’HUI ! | JOSHUA SELMAN',
        duration: '39:52',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=ZSKymClHnzE&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7&index=3',
        hasFullTranscriptInApp: true,
        summary_en: 'Ezekiel 48:35 & Deuteronomy 31:8 ministration sending God’s presence ahead of you into every room and transition today.',
        summary_fr: 'Ministration sur Ézéchiel 48:35 et Deutéronome 31:8 envoyant la présence de Dieu vous précéder dans chaque pièce aujourd’hui.',
      },
      {
        youtubeId: '5SHUzMacfkY',
        title_en: 'ENOUGH IS ENOUGH YOUR BAD DAYS ARE OVER SAYS THE LORD | JOSHUA SELMAN',
        title_fr: 'ASSEZ C’EST ASSEZ : VOS MAUVAIS JOURS SONT TERMINÉS DIT LE SEIGNEUR | JOSHUA SELMAN',
        duration: '40:08',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=5SHUzMacfkY&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
        hasFullTranscriptInApp: false,
        summary_en: 'Prophetic termination of cycles of affliction, stagnation, and recurring sorrow.',
        summary_fr: 'Fin prophétique des cycles d’affliction, de stagnation et de chagrin récurrent.',
      },
      {
        youtubeId: 'GK5VrH2nm1g',
        title_en: 'OH GOD OF JABEZ HEAR MY CRY TODAY AND HELP ME | APOSTLE JOSHUA SELMAN',
        title_fr: 'Ô DIEU DE JAEBETS ENTENDS MON CRI AUJOURD’HUI ET SECOURS-MOI | APÔTRE JOSHUA SELMAN',
        duration: '42:22',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=GK5VrH2nm1g&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
        hasFullTranscriptInApp: false,
        summary_en: '1 Chronicles 4:9-10 cry for divine blessing, territorial enlargement, and preservation from evil.',
        summary_fr: 'Cri de 1 Chroniques 4:9-10 pour la bénédiction divine, l’élargissement des limites et la préservation du mal.',
      },
      {
        youtubeId: 'ErYYar3kjYA',
        title_en: '45 MINUTES MOST POWERFUL PSALM 120 MORNING PRAYER TO START YOUR DAY | JOSHUA SELMAN',
        title_fr: '45 MINUTES DE PUISSANTE PRIÈRE MATINALE DU PSAUME 120 POUR COMMENCER LA JOURNÉE | JOSHUA SELMAN',
        duration: '38:03',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=ErYYar3kjYA&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
        hasFullTranscriptInApp: false,
        summary_en: 'Deliverance from lying lips, deceitful tongues, and contentious atmospheres (Psalm 120).',
        summary_fr: 'Délivrance des lèvres mensongères, des langues trompeuses et des atmosphères de discorde (Psaume 120).',
      },
      {
        youtubeId: 'iR_oqgunPkg',
        title_en: 'POWERFUL PRAYERS & DECLARATION TO COMMAND THE MORNING | JOSHUA SELMAN',
        title_fr: 'PUISSANTES PRIÈRES & DÉCLARATIONS POUR COMMANDER LE MATIN | JOSHUA SELMAN',
        duration: '47:39',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=iR_oqgunPkg&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
        hasFullTranscriptInApp: false,
        summary_en: 'Extended morning watch decrees establishing dominion over the day.',
        summary_fr: 'Décrets prolongés de la veille du matin établissant la domination sur la journée.',
      },
      {
        youtubeId: 'TuquWlqxk0A',
        title_en: '5 MINUTES POWERFUL MORNING PRAYERS TO COVER YOUR DAY WITH THE BLOOD | JOSHUA SELMAN',
        title_fr: 'PUISSANTES PRIÈRES MATINALES POUR COUVRIR VOTRE JOURNÉE PAR LE SANG DE JÉSUS | JOSHUA SELMAN',
        duration: '39:46',
        channel: 'Prayer By Grace',
        url: 'https://www.youtube.com/watch?v=TuquWlqxk0A&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
        hasFullTranscriptInApp: false,
        summary_en: 'Pleading the blood of Jesus over family, highways, workplaces, and health.',
        summary_fr: 'Invoquer le sang de Jésus sur la famille, les routes, le travail et la santé.',
      },
    ],
  },
  {
    playlistId: 'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    playlistTitle_en: 'Playlist 2: Morning Prayers — Grace Enclave Devotional Collection',
    playlistTitle_fr: 'Playlist 2 : Prières du Matin — Collection Dévotionnelle Grace Enclave',
    channel: 'Grace Enclave (@graceenclave)',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    primaryVideoUrl: 'https://www.youtube.com/watch?v=XWBUBtEv70A&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=2',
    description_en:
      'Scripture-rich contemplative morning prayers focused on calling on the Name of Jesus, wholehearted devotion, putting on the Armor of God, and resting in Psalm 121 protection.',
    description_fr:
      'Prières matinales contemplatives riches en Écritures centrées sur l’invocation du Nom de Jésus, la dévotion de tout le cœur, l’armure de Dieu et la garde du Psaume 121.',
    tracks: [
      {
        youtubeId: 'CK9rP2ZBGKg',
        title_en: 'Seek God with All Your Heart and Witness His Miracles in Your Life | Morning Prayer',
        title_fr: 'Cherchez Dieu de Tout Votre Cœur et Voyez Ses Miracles dans Votre Vie | Prière du Matin',
        duration: '13:18',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=CK9rP2ZBGKg&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=1',
        hasFullTranscriptInApp: true,
        summary_en: 'Index #1 in Playlist 2 — Jeremiah 29:13 prayer for wholehearted devotion and fullness of joy.',
        summary_fr: 'Index n°1 de la Playlist 2 — Prière sur Jérémie 29:13 pour une dévotion sans partage et une joie parfaite.',
      },
      {
        youtubeId: 'XWBUBtEv70A',
        title_en: 'Call on the Name of Jesus and Watch God Work Today | Morning Prayer',
        title_fr: 'Invoquez le Nom de Jésus et Voyez Dieu Agir Aujourd’hui | Prière du Matin',
        duration: '09:02',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=XWBUBtEv70A&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=2',
        isPrimaryRequested: true,
        hasFullTranscriptInApp: true,
        summary_en: 'Primary Requested Video 2 (Index #2) — 6-movement devotional invoking the Strong Tower of the Name of Jesus.',
        summary_fr: 'Vidéo Principale 2 (Index n°2) — Méditation en 6 mouvements invoquant la Tour Forte du Nom de Jésus.',
      },
      {
        youtubeId: 'zPOULLgPjYc',
        title_en: 'Powerful 13-Minute Morning Prayer with God to Start Your Day Right | Morning Prayer',
        title_fr: 'Puissante Prière Matinale de 13 Minutes avec Dieu pour Bien Commencer la Journée | Prière du Matin',
        duration: '13:25',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=zPOULLgPjYc&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=3',
        hasFullTranscriptInApp: true,
        summary_en: 'Index #3 in Playlist 2 — Morning consecration, mind of Christ, surrendered agenda, and full Armor of God.',
        summary_fr: 'Index n°3 de la Playlist 2 — Consécration matinale, pensée de Christ, agenda remis à Dieu et armure d’Éphésiens 6.',
      },
      {
        youtubeId: 'Zvk_jzAsoi8',
        title_en: 'Psalm 121: Morning Prayer For Protection and Safety | Blessed Morning Prayer',
        title_fr: 'Psaume 121 : Prière Matinale pour la Protection et la Sécurité | Prière Bénie du Matin',
        duration: '07:21',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=Zvk_jzAsoi8&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=4',
        hasFullTranscriptInApp: true,
        summary_en: 'Index #4 in Playlist 2 — Verse-by-verse prayer through Psalm 121:1-8 for unslumbering protection.',
        summary_fr: 'Index n°4 de la Playlist 2 — Prière verset par verset sur le Psaume 121:1-8 pour la garde divine.',
      },
      {
        youtubeId: 'AKCFsUsqNnw',
        title_en: 'Special Prayer for Divine Breakthrough | Morning Prayer for Tough Times',
        title_fr: 'Prière Spéciale pour une Percée Divine | Prière du Matin pour les Temps Difficiles',
        duration: '11:06',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=AKCFsUsqNnw&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
        hasFullTranscriptInApp: false,
        summary_en: 'Encouragement and intercession for supernatural breakthrough in seasons of pressure.',
        summary_fr: 'Encouragement et intercession pour une percée surnaturelle dans les saisons d’épreuve.',
      },
      {
        youtubeId: '1YJW4-7hokQ',
        title_en: 'Morning Prayer to Start Your Day with God | Powerful Daily Blessing & Protection',
        title_fr: 'Prière du Matin pour Commencer la Journée avec Dieu | Puissante Bénédiction et Protection',
        duration: '08:06',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=1YJW4-7hokQ&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
        hasFullTranscriptInApp: false,
        summary_en: 'Daily blessing and covering over home, work, and relationships.',
        summary_fr: 'Bénédiction quotidienne et couverture sur le foyer, le travail et les relations.',
      },
      {
        youtubeId: 'LvN2AUymW24',
        title_en: 'Prayer for Struggle and Pain | Knowing You’re Not Alone in God’s Presence',
        title_fr: 'Prière dans la Lutte et la Douleur | Savoir que Vous N’êtes Pas Seul dans la Présence de Dieu',
        duration: '09:47',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=LvN2AUymW24&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
        hasFullTranscriptInApp: false,
        summary_en: 'Comfort from the God of all mercies in seasons of grief or heaviness.',
        summary_fr: 'Consolation du Père des miséricordes dans les saisons de peine ou de lourdeur.',
      },
      {
        youtubeId: 'fsYF-nMzJbM',
        title_en: 'Lord, Fill Me with Your Holy Spirit and Lead Me into All Truth Today',
        title_fr: 'Seigneur, Remplis-Moi de Ton Saint-Esprit et Conduis-Moi dans Toute la Vérité Aujourd’hui',
        duration: '08:39',
        channel: 'Grace Enclave',
        url: 'https://www.youtube.com/watch?v=fsYF-nMzJbM&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
        hasFullTranscriptInApp: false,
        summary_en: 'Morning invocation of the Holy Spirit for counsel, discernment, and sanctification.',
        summary_fr: 'Invocation matinale du Saint-Esprit pour le conseil, le discernement et la sanctification.',
      },
    ],
  },
  {
    playlistId: 'PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    playlistTitle_en: 'Playlist 3: Morning Declarations with Apostle Joshua Selman — Overcoming Daily Series',
    playlistTitle_fr: 'Playlist 3 : Déclarations Matinales avec l’Apôtre Joshua Selman — Série Overcoming Daily',
    channel: 'OVERCOMING DAILY (@therealovercomingdaily)',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    primaryVideoUrl: 'https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    description_en:
      'Early-morning apostolic declarations (6:30 AM & 6:45 AM) by Apostle Joshua Selman legislating restoration, favor, preservation, Jabez expansion, and the mantle of honor.',
    description_fr:
      'Déclarations apostoliques matinales (6h30 et 6h45) avec l’Apôtre Joshua Selman légiférant la restauration, la faveur, la préservation, l’élargissement de Jaebets et le manteau d’honneur.',
    tracks: [
      {
        youtubeId: '45wUm7wffBQ',
        title_en: '6:45 AM #prayer 10 POWERFUL MORNING DECLARATIONS WITH APOSTLE JOSHUA SELMAN',
        title_fr: '6H45 #prière 10 PUISSANTES DÉCLARATIONS MATINALES AVEC L’APÔTRE JOSHUA SELMAN',
        duration: '29:12',
        channel: 'OVERCOMING DAILY',
        url: 'https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
        isPrimaryRequested: true,
        hasFullTranscriptInApp: true,
        summary_en: 'Primary Requested Video 3 — 10 Apostolic Morning Declarations + Jabez Enlargement & Mantle of Honor.',
        summary_fr: 'Vidéo Principale 3 — 10 Déclarations Matinales Apostoliques + Élargissement de Jaebets & Manteau d’Honneur.',
      },
      {
        youtubeId: 'BwWxo1T564Q',
        title_en: 'POWERFUL 6:30 AM SUNDAY MORNING DECLARATIONS #prayer WITH APOSTLE JOSHUA SELMAN',
        title_fr: 'PUISSANTES DÉCLARATIONS DU DIMANCHE MATIN À 6H30 #prière AVEC L’APÔTRE JOSHUA SELMAN',
        duration: '23:21',
        channel: 'OVERCOMING DAILY',
        url: 'https://www.youtube.com/watch?v=BwWxo1T564Q',
        hasFullTranscriptInApp: true,
        summary_en: 'Companion 6:30 AM Declarations — Plenty, Exemption from Sickness, Watered Garden, Token for Good, Quality Men & Threefold Impartation.',
        summary_fr: 'Déclarations Compagnons de 6h30 — Abondance, Exemption de Maladie, Jardin Arrosé, Signe de Bonté, Hommes de Qualité & Triple Impartation.',
      },
    ],
  },
];
