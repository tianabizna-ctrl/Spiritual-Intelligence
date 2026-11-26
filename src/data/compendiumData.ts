import { VideoResource, VIDEOS_DATA } from './spiritualData';

export interface PlaylistTrackItem {
  youtubeId: string;
  title_en: string;
  title_fr: string;
  duration: string;
  channel: string;
  url: string;
  isPrimaryRequested?: boolean;
  hasFullTranscriptInApp: boolean;
  rawTranscriptKey?: 'video1' | 'video2' | 'video3' | 'video4' | 'video5' | 'video6' | 'video7' | 'video8' | 'video9';
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

export const COMPANION_VIDEOS_DATA: VideoResource[] = [
  {
    id: 'HQzfk0DMgCo',
    videoNumber: 4,
    youtubeId: 'HQzfk0DMgCo',
    url: 'https://www.youtube.com/watch?v=HQzfk0DMgCo&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7&index=2',
    playlistId: 'PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    title_en: 'SPEAK FIRE INTO THE NEW MONTH BEFORE THE ENEMY DOES | APOSTLE JOSHUA SELMAN',
    title_fr: 'PROCLAMEZ LE FEU DANS LE NOUVEAU MOIS AVANT QUE L’ENNEMI NE LE FASSE | APÔTRE JOSHUA SELMAN',
    speaker: 'Apostle Joshua Selman',
    channel: 'Prayer By Grace',
    channelHandle: '@PrayerByGrace',
    duration: '41:17',
    uploadedAt: '2026-10-29',
    thumbnail: 'https://i.ytimg.com/vi/HQzfk0DMgCo/maxresdefault.jpg',
    watchCategory_en: 'Playlist 1 • New Month Prophetic Warfare',
    watchCategory_fr: 'Playlist 1 • Combat Prophétique du Nouveau Mois',
    tagline_en: 'Speaking first in the courts of heaven to establish a foundation of fire, favor, and open doors over every week of the month.',
    tagline_fr: 'Parler le premier dans les parvis célestes pour poser un fondement de feu, de faveur et de portes ouvertes sur chaque semaine du mois.',
    overview_en:
      'A 41-minute prophetic warfare and decree session from Playlist 1 teaching believers to speak first into the new month (Job 22:28, Proverbs 18:21), destroy inherited yokes (Isaiah 10:27), pull down ancestral altars like Gideon (Judges 6:25), possess stolen glory (Obadiah 1:17), cover the household (Joshua 24:15), unlock financial gates (Psalm 24:7, Malachi 3:10-11), enforce divine health (Isaiah 53:5), and prophesy over all four weeks of the month.',
    overview_fr:
      'Une session de 41 minutes issue de la Playlist 1 enseignant à parler le premier dans le nouveau mois (Job 22:28, Proverbes 18:21), briser les jougs par l’onction (Ésaïe 10:27), renverser les autels familiaux comme Gédéon (Juges 6:25), reprendre ses possessions (Abdias 1:17), couvrir sa maison (Josué 24:15), ouvrir les portes financières (Psaume 24:7, Malachie 3:10-11), proclamer la guérison (Ésaïe 53:5) et prophétiser sur les quatre semaines du mois.',
    docxFile: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    keyScriptures: [
      'Job 22:28',
      'Proverbs 18:21',
      'Isaiah 10:27',
      'Isaiah 49:24-26',
      'Judges 6:25',
      'Colossians 2:14-15',
      'Galatians 3:13',
      'Micah 5:12',
      'Obadiah 1:17',
      'Joshua 24:15',
      'Psalm 118:17',
      'Deuteronomy 8:18',
      'Psalm 24:7',
      'Malachi 3:10-11',
      'Isaiah 53:5',
      'Jeremiah 30:17',
      'Joel 2:25',
      'Psalm 91:10-11',
      'Zechariah 2:5',
      'Psalm 65:11',
    ],
    chapters: [
      {
        id: 'v4-ch1',
        number: 'I',
        timestamp: '00:00 – 10:15',
        title_en: 'Speaking First in the Courts of Heaven & Destroying Yokes of Delay',
        title_fr: 'Parler le Premier dans les Parvis Célestes et Briser les Jougs de Retard',
        scriptures: ['Job 22:28', 'Proverbs 18:21', 'Isaiah 10:27', 'Isaiah 49:24-26'],
        en_text:
          'Before the first sunrise of the month, let your decree be registered in the courts of heaven. Job 22:28 says, "Thou shalt also decree a thing, and it shall be established unto thee: and the light shall shine upon thy ways." Whoever speaks first sets the atmosphere. And by the anointing of Isaiah 10:27, every yoke of delay, "almost there," and unfulfilled promises that followed you from last month is destroyed by fire.',
        fr_text:
          'Avant le premier lever de soleil du mois, que votre décret soit enregistré dans les parvis célestes. Job 22:28 déclare : « À tes résolutions répondra le succès ; sur tes sentiers brillera la lumière. » Celui qui parle le premier établit l’atmosphère. Et par l’onction d’Ésaïe 10:27, tout joug de retard, du « presque arrivé » et de promesses non tenues est détruit par le feu.',
        declaration_en:
          'This month I lay a foundation of fire, favor, and open doors! Every yoke on my neck that followed me from last month, break by fire! Lord, contend with those who contend with me and release my portion!',
        declaration_fr:
          'Ce mois-ci, je pose un fondement de feu, de faveur et de portes ouvertes ! Tout joug sur mon cou qui m’a suivi depuis le mois dernier, brise-toi par le feu ! Seigneur, combats ceux qui me combattent et libère ma portion !',
      },
      {
        id: 'v4-ch2',
        number: 'II',
        timestamp: '10:16 – 22:00',
        title_en: 'Overthrowing Evil Altars, Possessing Stolen Glory & Covering the Household',
        title_fr: 'Renverser les Autels Maléfiques, Reprendre la Gloire Volée et Couvrir la Maison',
        scriptures: ['Judges 6:25', 'Colossians 2:14-15', 'Obadiah 1:17', 'Joshua 24:15', 'Psalm 118:17'],
        en_text:
          'Like Gideon in Judges 6:25, throw down every ancestral altar speaking against your generation and outbid every dark sacrifice with the blood of Jesus (Hebrews 12:24). Upon Mount Zion shall be deliverance and holiness, and the house of Jacob shall possess their possessions (Obadiah 1:17). Then enforce Joshua 24:15 over your entire family, marriage, and children.',
        fr_text:
          'Comme Gédéon dans Juges 6:25, renversez tout autel ancestral qui parle contre votre génération et surpassez tout sacrifice occulte par le sang de Jésus (Hébreux 12:24). Sur la montagne de Sion seront la délivrance et la sainteté, et la maison de Jacob reprendra ses possessions (Abdias 1:17). Établissez ensuite Josué 24:15 sur toute votre famille, votre mariage et vos enfants.',
        declaration_en:
          'I outbid every dark sacrifice with the blood of Jesus! I reject the counterfeit and take back my original destiny, my star, and my household in Jesus’ name!',
        declaration_fr:
          'Je surpasse tout sacrifice des ténèbres par le sang de Jésus ! Je rejette la contrefaçon et je reprends ma destinée originelle, mon étoile et toute ma maison au nom de Jésus !',
      },
      {
        id: 'v4-ch3',
        number: 'III',
        timestamp: '22:01 – 41:17',
        title_en: 'Financial Gates, Divine Healing, Restored Years & Prophesying Over the Four Weeks',
        title_fr: 'Portes Financières, Guérison Divine, Années Restaurées et Prophétie sur les Quatre Semaines',
        scriptures: ['Deuteronomy 8:18', 'Psalm 24:7', 'Malachi 3:10-11', 'Isaiah 53:5', 'Joel 2:25', 'Psalm 65:11'],
        en_text:
          'Command the gates of finance to lift up their heads (Psalm 24:7), seal every hole in your bag (Haggai 1:6), rebuke the devourer (Malachi 3:11), claim healing by the stripes of Jesus (Isaiah 53:5), recover wasted years (Joel 2:25), and prophesy over all four weeks of the month: Week 1 for beginnings and open doors, Week 2 for acceleration and divine connection, Week 3 for harvest and testimonies, and the closing days for celebration and thanksgiving (Psalm 65:11).',
        fr_text:
          'Commandez aux portes des finances d’élever leurs linteaux (Psaume 24:7), scellez tout trou dans votre sac (Aggée 1:6), réprimandez le dévoreur (Malachie 3:11), saisissez la guérison par les meurtrissures de Jésus (Ésaïe 53:5), récupérez les années perdues (Joël 2:25) et prophétisez sur les quatre semaines du mois : Semaine 1 d’ouverture, Semaine 2 d’accélération, Semaine 3 de moisson et clôture dans la célébration (Psaume 65:12).',
        declaration_en:
          'Windows of heaven, open over my life! First week: open doors; second week: acceleration; third week: harvest; closing days: celebration! Lord, crown this month with Thy goodness and let my paths drop fatness!',
        declaration_fr:
          'Écluses des cieux, ouvrez-vous sur ma vie ! Première semaine : portes ouvertes ; deuxième semaine : accélération ; troisième semaine : moisson ; derniers jours : célébration ! Seigneur, couronne ce mois de Tes biens et que mes sentiers ruissellent d’abondance !',
      },
    ],
  },
  {
    id: 'ZSKymClHnzE',
    videoNumber: 5,
    youtubeId: 'ZSKymClHnzE',
    url: 'https://www.youtube.com/watch?v=ZSKymClHnzE&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7&index=3',
    playlistId: 'PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    title_en: 'JEHOVAH SHAMMAH, THE GOD WHO IS THERE, GO AHEAD OF ME INTO EVERY ROOM I ENTER TODAY! | JOSHUA SELMAN',
    title_fr: 'JÉHOVAH SHAMMAH, LE DIEU QUI EST LÀ, PRÉCÈDE-MOI DANS CHAQUE PIÈCE OÙ J’ENTRE AUJOURD’HUI ! | JOSHUA SELMAN',
    speaker: 'Apostle Joshua Selman',
    channel: 'Prayer By Grace',
    channelHandle: '@PrayerByGrace',
    duration: '39:52',
    uploadedAt: '2026-10-05',
    thumbnail: 'https://i.ytimg.com/vi/ZSKymClHnzE/maxresdefault.jpg',
    watchCategory_en: 'Playlist 1 • Covenant Presence & Preparation',
    watchCategory_fr: 'Playlist 1 • Présence d’Alliance & Préparation',
    tagline_en: 'Walking into offices, boardrooms, medical rooms, and family conversations knowing Jehovah Shammah has already arrived ahead of you.',
    tagline_fr: 'Entrer dans les bureaux, salles de conseil, cliniques et conversations familiales en sachant que Jéhovah Shammah vous y a déjà précédé.',
    overview_en:
      'A 39-minute teaching and prayer ministration built around Ezekiel 48:35 ("The name of the city from that day shall be, The Lord is there — Jehovah Shammah"), Deuteronomy 31:8 ("The Lord, he it is that doth go before thee"), Psalm 139:7-10, and Exodus 33:14 ("My presence shall go with thee, and I will give thee rest"), commissioning God’s presence ahead of you into every room of destiny, family, marriage, finance, health, and transition.',
    overview_fr:
      'Un enseignement et une prière de 39 minutes fondés sur Ézéchiel 48:35 (« L’Éternel est ici — Jéhovah Shammah »), Deutéronome 31:8 (« L’Éternel marchera lui-même devant toi »), le Psaume 139:7-10 et Exode 33:14 (« Ma présence ira avec toi, et je te donnerai du repos »), envoyant la présence de Dieu vous précéder dans chaque pièce de destinée, de famille, de mariage, de finance, de santé et de déplacement.',
    docxFile: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    keyScriptures: [
      'Ezekiel 48:35',
      'Deuteronomy 31:8',
      'Psalm 139:7-10',
      'Exodus 33:14',
      'Joshua 24:15',
      'Malachi 3:10',
      'Exodus 15:26',
      'Numbers 23:23',
      'Psalm 34:7',
      '2 Kings 6:17',
      'Psalm 121:4-8',
      'Daniel 1:17',
      'Matthew 28:20',
      'Numbers 6:24-26',
    ],
    chapters: [
      {
        id: 'v5-ch1',
        number: 'I',
        timestamp: '00:00 – 12:30',
        title_en: 'The Covenant Name Jehovah Shammah: God Goes Before You to Give You Rest',
        title_fr: 'Le Nom d’Alliance Jéhovah Shammah : Dieu Vous Précède pour Vous Donner du Repos',
        scriptures: ['Ezekiel 48:35', 'Deuteronomy 31:8', 'Psalm 139:7-10', 'Exodus 33:14'],
        en_text:
          'Ezekiel 48:35 reveals the permanent covenant identity: "The name of the city from that day shall be, The Lord is there (Jehovah Shammah)." Deuteronomy 31:8 establishes the divine sequence: "The Lord, he it is that doth go before thee; he will be with thee." And Exodus 33:14 declares that His presence going ahead of you produces genuine rest rather than anxious performance.',
        fr_text:
          'Ézéchiel 48:35 révèle l’identité d’alliance permanente : « Dès ce jour le nom de la ville sera : L’Éternel est ici (Jéhovah Shammah). » Deutéronome 31:8 établit l’ordre divin : « L’Éternel marchera lui-même devant toi, il sera avec toi. » Et Exode 33:14 affirme que Sa présence qui vous précède produit un repos véritable au lieu d’une performance anxieuse.',
        declaration_en:
          'I declare Jehovah Shammah over every room I enter today! God has already gone ahead of me into each one, arriving before I do, and I walk in His rest!',
        declaration_fr:
          'Je déclare Jéhovah Shammah sur chaque pièce où j’entre aujourd’hui ! Dieu m’a déjà précédé dans chacune d’elles avant mon arrivée, et je marche dans Son repos !',
      },
      {
        id: 'v5-ch2',
        number: 'II',
        timestamp: '12:31 – 39:52',
        title_en: 'Consecrating Every Room of Destiny, Family, Finance, Health & The Transitions Between Them',
        title_fr: 'Consacrer Chaque Pièce de Destinée, Famille, Finance, Santé et les Déplacements Entre Elles',
        scriptures: ['Exodus 15:26', 'Numbers 23:23', '2 Kings 6:17', 'Psalm 121:8', 'Matthew 28:20', 'Numbers 6:24-26'],
        en_text:
          'We send Jehovah Shammah ahead into rooms of destiny (Ezekiel 37), family conversations (Joshua 24:15), financial meetings (Deuteronomy 8:18), hospital and diagnostic rooms (Exodus 15:26), examination halls (Daniel 1:17), boardrooms (Psalm 1:3), and every hallway, elevator, sidewalk, and vehicle between those rooms (Psalm 121:8), sealed with the priestly blessing of Numbers 6:24-26.',
        fr_text:
          'Nous envoyons Jéhovah Shammah nous précéder dans les salles de destinée (Ézéchiel 37), les conversations familiales (Josué 24:15), les réunions financières (Deutéronome 8:18), les salles médicales (Exode 15:26), les salles d’examen (Daniel 1:17), les conseils d’administration (Psaume 1:3) ainsi que chaque couloir, route et véhicule reliant ces lieux (Psaume 121:8), sous la bénédiction sacerdotale de Nombres 6:24-26.',
        declaration_en:
          'I declare that Jehovah Shammah is in every room before I arrive, while I remain, and after I leave—and He preserves every transition between them in Jesus’ name!',
        declaration_fr:
          'Je déclare que Jéhovah Shammah est dans chaque pièce avant mon arrivée, pendant que j’y demeure et après mon départ — et qu’Il garde chacun de mes déplacements au nom de Jésus !',
      },
    ],
  },
  {
    id: 'CK9rP2ZBGKg',
    videoNumber: 6,
    youtubeId: 'CK9rP2ZBGKg',
    url: 'https://www.youtube.com/watch?v=CK9rP2ZBGKg&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=1',
    playlistId: 'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    title_en: 'Seek God with All Your Heart and Witness His Miracles in Your Life | Morning Prayer',
    title_fr: 'Cherchez Dieu de Tout Votre Cœur et Voyez Ses Miracles dans Votre Vie | Prière du Matin',
    speaker: 'Grace Enclave',
    channel: 'Grace Enclave',
    channelHandle: '@graceenclave',
    duration: '13:18',
    uploadedAt: '2025-08-10',
    thumbnail: 'https://i.ytimg.com/vi/CK9rP2ZBGKg/maxresdefault.jpg',
    watchCategory_en: 'Playlist 2 • Wholehearted Devotion',
    watchCategory_fr: 'Playlist 2 • Dévotion de Tout le Cœur',
    tagline_en: 'A contemplative morning prayer on Jeremiah 29:13—seeking the Giver above the gifts with undivided loyalty.',
    tagline_fr: 'Une prière matinale contemplative sur Jérémie 29:13 — chercher le Donateur plus que les dons avec un cœur sans partage.',
    overview_en:
      'Anchored in Jeremiah 29:13 ("You will seek me and find me when you seek me with all your heart"), this 13-minute devotional prayer from Playlist 2 leads the believer out of half-hearted seeking into the Holy of Holies, pulling down idols of comfort and control, persevering like Jacob (Genesis 32:26), and finding fullness of joy in God’s presence (Psalm 16:11).',
    overview_fr:
      'Ancrée dans Jérémie 29:13 (« Vous me chercherez, et vous me trouverez, si vous me cherchez de tout votre cœur »), cette prière dévotionnelle de 13 minutes issue de la Playlist 2 conduit le croyant hors de la tiédeur jusque dans le Lieu Très Saint, renversant les idoles du confort et du contrôle, persévérant comme Jacob (Genèse 32:26) et trouvant la plénitude de joie dans la présence de Dieu (Psaume 16:11).',
    docxFile: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    keyScriptures: ['Jeremiah 29:13', 'Matthew 5:6', 'Mark 12:30', 'Genesis 32:26', 'James 4:8', 'Psalm 139:23-24', 'Psalm 16:11'],
    chapters: [
      {
        id: 'v6-ch1',
        number: 'I',
        timestamp: '00:00 – 13:18',
        title_en: 'Wholehearted Seeking, Tearing Down Idols & Abiding in Fullness of Joy',
        title_fr: 'Chercher de Tout son Cœur, Renverser les Idoles et Demeurer dans la Plénitude de Joie',
        scriptures: ['Jeremiah 29:13', 'Matthew 5:6', 'Genesis 32:26', 'James 4:8', 'Psalm 16:11'],
        en_text:
          'Jeremiah 29:13 promises: "You will seek me and find me when you seek me with all your heart." We repent of seeking answers more than the Answerer and blessings more than the Blesser. Stripping away the idols of comfort, recognition, control, and self-sufficiency, we draw near to God with the perseverance of Jacob until our lives reflect the likeness of Jesus in the fullness of joy (Psalm 16:11).',
        fr_text:
          'Jérémie 29:13 promet : « Vous me chercherez, et vous me trouverez, si vous me cherchez de tout votre cœur. » Nous nous repentons d’avoir cherché les réponses plus que Celui qui répond et les bénédictions plus que Celui qui bénit. En renversant les idoles du confort, de la reconnaissance et du contrôle, nous nous approchons de Dieu avec la persévérance de Jacob jusqu’à refléter l’image de Jésus dans la plénitude de Sa joie (Psaume 16:11).',
        declaration_en:
          'Father, I seek You with all my heart, soul, mind, and strength! I draw near to You today, and in Your presence I find fullness of joy and pleasures forevermore!',
        declaration_fr:
          'Père, je Te cherche de tout mon cœur, de toute mon âme, de toute ma pensée et de toute ma force ! Je m’approche de Toi aujourd’hui, et dans Ta présence je trouve d’abondantes joies !',
      },
    ],
  },
  {
    id: 'zPOULLgPjYc',
    videoNumber: 7,
    youtubeId: 'zPOULLgPjYc',
    url: 'https://www.youtube.com/watch?v=zPOULLgPjYc&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=3',
    playlistId: 'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    title_en: 'Powerful 13-Minute Morning Prayer with God to Start Your Day Right | Morning Prayer',
    title_fr: 'Puissante Prière Matinale de 13 Minutes avec Dieu pour Bien Commencer la Journée | Prière du Matin',
    speaker: 'Grace Enclave',
    channel: 'Grace Enclave',
    channelHandle: '@graceenclave',
    duration: '13:25',
    uploadedAt: '2025-08-08',
    thumbnail: 'https://i.ytimg.com/vi/zPOULLgPjYc/maxresdefault.jpg',
    watchCategory_en: 'Playlist 2 • Morning Consecration & Armor of God',
    watchCategory_fr: 'Playlist 2 • Consécration Matinale & Armure de Dieu',
    tagline_en: 'Surrendering your mind, calendar, family, and work to God while putting on the full Armor of Ephesians 6.',
    tagline_fr: 'Remettre ses pensées, son agenda, sa famille et son travail à Dieu tout en revêtant l’armure complète d’Éphésiens 6.',
    overview_en:
      'A 13-minute morning consecration prayer from Playlist 2 expressing gratitude for angelic protection through the night, asking for the mind of Christ (1 Corinthians 2:16), a clean heart (Psalm 51:10), and a guarded mind (Philippians 4:7), surrendering the day’s agenda, interceding for family, the hurting, and leaders, and putting on the full Armor of God (Ephesians 6:10-18).',
    overview_fr:
      'Une prière de consécration matinale de 13 minutes issue de la Playlist 2 exprimant la reconnaissance pour la garde angélique nocturne, demandant la pensée de Christ (1 Corinthiens 2:16), un cœur pur (Psaume 51:12) et la paix de l’esprit (Philippiens 4:7), remettant l’emploi du temps à Dieu, intercédant pour la famille, les affligés et les dirigeants, et revêtant toutes les armes de Dieu (Éphésiens 6:10-18).',
    docxFile: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    keyScriptures: ['Lamentations 3:22-23', 'Isaiah 45:2', '1 Corinthians 2:16', 'Psalm 51:10', 'Philippians 4:7', '2 Corinthians 10:5', 'Colossians 3:23', 'Ephesians 6:10-18'],
    chapters: [
      {
        id: 'v7-ch1',
        number: 'I',
        timestamp: '00:00 – 13:25',
        title_en: 'Morning Gratitude, The Mind of Christ, Surrendered Plans & The Full Armor of God',
        title_fr: 'Gratitude Matinale, Pensée de Christ, Projets Abandonnés et Armure Complète de Dieu',
        scriptures: ['Lamentations 3:22-23', 'Psalm 51:10', 'Philippians 4:7', 'Colossians 3:23', 'Ephesians 6:10-18'],
        en_text:
          'We rise grateful for mercies that renew every morning (Lamentations 3:22-23) and for unseen battles won while we slept. Asking for a clean heart (Psalm 51:10) and the peace that guards the mind (Philippians 4:7), we surrender our calendar, lift up our families, the sick, and our leaders, and clothe ourselves with the belt of truth, breastplate of righteousness, shoes of peace, shield of faith, helmet of salvation, and sword of the Spirit (Ephesians 6:10-18).',
        fr_text:
          'Nous nous levons reconnaissants pour les compassions qui se renouvellent chaque matin (Lamentations 3:22-23) et pour les batailles invisibles remportées durant notre sommeil. Demandant un cœur pur (Psaume 51:12) et la paix qui garde nos pensées (Philippiens 4:7), nous abandonnons notre emploi du temps à Dieu, intercédons pour nos familles, les malades et les autorités, et revêtons toutes les armes de Dieu (Éphésiens 6:10-18).',
        declaration_en:
          'I put on the full armor of God today! My mind is guarded by peace, my plans are surrendered to His will, and my life is an altar of worship in Jesus’ name!',
        declaration_fr:
          'Je revêts toutes les armes de Dieu aujourd’hui ! Mon esprit est gardé par Sa paix, mes projets sont soumis à Sa volonté et ma vie est un autel d’adoration au nom de Jésus !',
      },
    ],
  },
  {
    id: 'Zvk_jzAsoi8',
    videoNumber: 8,
    youtubeId: 'Zvk_jzAsoi8',
    url: 'https://www.youtube.com/watch?v=Zvk_jzAsoi8&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=4',
    playlistId: 'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    title_en: 'Psalm 121: Morning Prayer For Protection and Safety | Blessed Morning Prayer',
    title_fr: 'Psaume 121 : Prière Matinale pour la Protection et la Sécurité | Prière Bénie du Matin',
    speaker: 'Grace Enclave',
    channel: 'Grace Enclave',
    channelHandle: '@graceenclave',
    duration: '07:21',
    uploadedAt: '2025-08-05',
    thumbnail: 'https://i.ytimg.com/vi/Zvk_jzAsoi8/maxresdefault.jpg',
    watchCategory_en: 'Playlist 2 • Psalm 121 Protection Watch',
    watchCategory_fr: 'Playlist 2 • Veille de Protection du Psaume 121',
    tagline_en: 'A line-by-line contemplative prayer through all 8 verses of Psalm 121—resting under the Keeper of Israel who neither slumbers nor sleeps.',
    tagline_fr: 'Une prière contemplative verset par verset à travers le Psaume 121 — demeurer sous la garde de Celui qui ne sommeille ni ne dort.',
    overview_en:
      'A 7-minute verse-by-verse devotional response to Psalm 121:1-8 from Playlist 2, lifting our eyes beyond the hills to the Maker of heaven and earth who steadies our feet, never slumbers nor sleeps, stands as our shade at our right hand against the sun by day and moon by night, and preserves our going out and coming in from this time forth and forevermore.',
    overview_fr:
      'Une prière méditative de 7 minutes répondant verset par verset au Psaume 121:1-8 (Playlist 2), levant nos yeux au-delà des montagnes vers le Créateur des cieux et de la terre qui affermit nos pas, ne sommeille ni ne dort, demeure notre ombre à notre main droite contre le soleil le jour et la lune la nuit, et garde notre départ et notre arrivée dès maintenant et à toujours.',
    docxFile: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    keyScriptures: ['Psalm 121:1-2', 'Psalm 121:3-4', 'Psalm 121:5-6', 'Psalm 121:7-8'],
    chapters: [
      {
        id: 'v8-ch1',
        number: 'I',
        timestamp: '00:00 – 07:21',
        title_en: 'Line-by-Line Prayer Through Psalm 121: My Maker, My Keeper, My Shade & My Watchman',
        title_fr: 'Prière Verset par Verset sur le Psaume 121 : Mon Créateur, Mon Gardien, Mon Ombre et Ma Sentinelle',
        scriptures: ['Psalm 121:1-8'],
        en_text:
          '"I lift up my eyes to the hills. From where does my help come? My help comes from the Lord, who made heaven and earth. He will not let your foot be moved; he who keeps you will not slumber... The Lord is your keeper; the Lord is your shade on your right hand. The sun shall not strike you by day, nor the moon by night. The Lord will keep you from all evil; he will keep your life. The Lord will keep your going out and your coming in from this time forth and forevermore."',
        fr_text:
          '« Je lève mes yeux vers les montagnes... D’où me viendra le secours ? Le secours me vient de l’Éternel, qui a fait les cieux et la terre. Il ne permettra point que ton pied chancelle ; Celui qui te garde ne sommeillera point... L’Éternel est celui qui te garde, l’Éternel est ton ombre à ta main droite. Pendant le jour le soleil ne te frappera point, ni la lune pendant la nuit. L’Éternel te gardera de tout mal, il gardera ton âme ; l’Éternel gardera ton départ et ton arrivée, dès maintenant et à toujours. »',
        declaration_en:
          'My help comes from the Lord who made heaven and earth! He who keeps me neither slumbers nor sleeps; He is my shade at my right hand and preserves my going out and my coming in forevermore!',
        declaration_fr:
          'Mon secours vient de l’Éternel qui a fait les cieux et la terre ! Celui qui me garde ne sommeille ni ne dort ; Il est mon ombre à ma main droite et garde mon départ et mon arrivée dès maintenant et à toujours !',
      },
    ],
  },
  {
    id: 'BwWxo1T564Q',
    videoNumber: 9,
    youtubeId: 'BwWxo1T564Q',
    url: 'https://www.youtube.com/watch?v=BwWxo1T564Q',
    playlistId: 'PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    title_en: 'POWERFUL 6:30 AM SUNDAY MORNING DECLARATIONS #prayer WITH APOSTLE JOSHUA SELMAN',
    title_fr: 'PUISSANTES DÉCLARATIONS DU DIMANCHE MATIN À 6H30 #prière AVEC L’APÔTRE JOSHUA SELMAN',
    speaker: 'Apostle Joshua Selman',
    channel: 'OVERCOMING DAILY',
    channelHandle: '@therealovercomingdaily',
    duration: '23:21',
    uploadedAt: '2023-09-10',
    thumbnail: 'https://i.ytimg.com/vi/BwWxo1T564Q/maxresdefault.jpg',
    watchCategory_en: 'Playlist 3 • 6:30 AM Apostolic Declarations',
    watchCategory_fr: 'Playlist 3 • Déclarations Apostoliques de 6h30',
    tagline_en: 'Ten Sunday morning apostolic decrees conferring plenty, divine health, unfailing guidance, quality destiny helpers, and the threefold mantle of Favor, Signs & Honor.',
    tagline_fr: 'Dix décrets apostoliques du dimanche matin conférant l’abondance, la santé divine, la direction infaillible, les aides de destinée et le triple manteau de Faveur, de Signes et d’Honneur.',
    overview_en:
      'A 23-minute companion session to the 6:45 AM Morning Declarations by Apostle Joshua Selman (Overcoming Daily), releasing 10 apostolic blessings: (1) Plenty in every work of your hand (Deuteronomy 30:9), (2) Exemption from all sickness (Deuteronomy 7:15), (3) Victory over every weapon and tongue (Isaiah 54:17), (4) Continual guidance & watered garden (Isaiah 58:11), (5) A visible token for good to end shame (Psalm 86:17), (6) The gift of quality men (Isaiah 43:4), (7) The Aaronic blessing of keeping, favor & peace (Numbers 6:24-26), (8) Resurrection of prayer life, (9) Kingdom wealth trusteeship (Psalm 66:12), and (10) The Threefold Impartation of Favor, Signs & Wonders, and Honor.',
    overview_fr:
      'Une session compagnon de 23 minutes aux Déclarations de 6h45 avec l’Apôtre Joshua Selman (Overcoming Daily), libérant 10 bénédictions apostoliques : (1) L’abondance (Deutéronome 30:9), (2) L’exemption de toute maladie (Deutéronome 7:15), (3) La victoire sur toute arme et toute langue (Ésaïe 54:17), (4) La direction continuelle et la source intarissable (Ésaïe 58:11), (5) Un signe visible de bonté mettant fin à la honte (Psaume 86:17), (6) Le don d’hommes de qualité (Ésaïe 43:4), (7) La bénédiction sacerdotale de garde, faveur et paix (Nombres 6:24-26), (8) La résurrection de la vie de prière, (9) L’intendance des richesses du Royaume (Psaume 66:12) et (10) La triple impartation de Faveur, de Signes et Prodiges, et d’Honneur.',
    docxFile: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    keyScriptures: [
      'Exodus 14:13',
      'Deuteronomy 30:9',
      'Deuteronomy 7:15',
      'Isaiah 54:17',
      'Isaiah 58:11',
      'Psalm 86:17',
      'Isaiah 43:4',
      'Numbers 6:24-26',
      'John 17:12',
      'Psalm 44:3',
      'Psalm 66:12',
      'Luke 2:52',
      'Isaiah 8:18',
      'Numbers 27:20',
    ],
    chapters: [
      {
        id: 'v9-ch1',
        number: 'I',
        timestamp: '00:00 – 11:30',
        title_en: 'Plenty, Exemption from Sickness, Unfailing Guidance, A Token for Good & Quality Men',
        title_fr: 'Abondance, Exemption de Maladie, Direction Infaillible, Signe de Bonté et Hommes de Qualité',
        scriptures: ['Deuteronomy 30:9', 'Deuteronomy 7:15', 'Isaiah 54:17', 'Isaiah 58:11', 'Psalm 86:17', 'Isaiah 43:4'],
        en_text:
          'The blessing is conferred by words mixed with faith: God makes you plenteous in every work of your hand (Deuteronomy 30:9), takes away all sickness (Deuteronomy 7:15), guides you continually like a watered garden whose waters fail not (Isaiah 58:11), shows you a visible token for good that puts shame to an end (Psalm 86:17), and gives quality men—helpers, comforters, financiers, and prophetic voices—for your life (Isaiah 43:4).',
        fr_text:
          'La bénédiction est transmise par des paroles mêlées de foi : Dieu vous comble de biens dans tout le travail de vos mains (Deutéronome 30:9), éloigne de vous toute maladie (Deutéronome 7:15), vous guide continuellement comme un jardin arrosé et une source dont les eaux ne tarissent pas (Ésaïe 58:11), vous accorde un signe visible de bonté mettant fin à l’opprobre (Psaume 86:17) et donne des hommes de qualité pour votre vie (Ésaïe 43:4).',
        declaration_en:
          'Plenty locates me in this season! I receive accuracy of direction like a watered garden, a visible token for good, and the gift of quality destiny helpers in Jesus’ name!',
        declaration_fr:
          'L’abondance me localise en cette saison ! Je reçois la précision de direction comme un jardin arrosé, un signe visible de bonté et le don d’aides de destinée de qualité au nom de Jésus !',
      },
      {
        id: 'v9-ch2',
        number: 'II',
        timestamp: '11:31 – 23:21',
        title_en: 'The Priestly Blessing, Resurrection of Prayer Life, Kingdom Wealth & The Threefold Impartation',
        title_fr: 'La Bénédiction Sacerdotale, Résurrection de la Vie de Prière, Richesse du Royaume et Triple Impartation',
        scriptures: ['Numbers 6:24-26', 'John 17:12', 'Psalm 44:3', 'Psalm 66:12', 'Luke 2:52', 'Isaiah 8:18', 'Numbers 27:20'],
        en_text:
          'Under Numbers 6:24-26, the Lord blesses and keeps you, causes His face to shine upon you in favor, and gives you peace that surpasses all understanding. Every dead prayer life and spiritual passion resurrects now; God brings you into a wealthy place as a Kingdom trustee (Psalm 66:12); and He imparts the threefold grace of Favor, Signs and Wonders, and the Mantle of Honor!',
        fr_text:
          'Selon Nombres 6:24-26, l’Éternel vous bénit et vous garde, fait luire Sa face de faveur sur vous et vous donne la paix qui surpasse toute intelligence. Toute vie de prière et passion spirituelle ressuscite maintenant ; Dieu vous introduit dans l’abondance comme intendant fidèle du Royaume (Psaume 66:12) et vous communique la triple grâce de la Faveur, des Signes et Prodiges, et du Manteau d’Honneur !',
        declaration_en:
          'The Lord blesses me, keeps me, causes His face to shine upon me, and gives me peace! I receive the threefold impartation of Favor, Signs & Wonders, and the Mantle of Honor in Jesus’ name!',
        declaration_fr:
          'L’Éternel me bénit, me garde, fait luire Sa face sur moi et me donne la paix ! Je reçois la triple impartation de la Faveur, des Signes et Prodiges, et du Manteau d’Honneur au nom de Jésus !',
      },
    ],
  },
];

export const ALL_VIDEOS_DATA: VideoResource[] = [...VIDEOS_DATA, ...COMPANION_VIDEOS_DATA];

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
        rawTranscriptKey: 'video1',
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
        rawTranscriptKey: 'video4',
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
        rawTranscriptKey: 'video5',
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
        rawTranscriptKey: 'video6',
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
        rawTranscriptKey: 'video2',
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
        rawTranscriptKey: 'video7',
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
        rawTranscriptKey: 'video8',
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
        rawTranscriptKey: 'video3',
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
        rawTranscriptKey: 'video9',
        summary_en: 'Companion 6:30 AM Declarations — Plenty, Exemption from Sickness, Watered Garden, Token for Good, Quality Men & Threefold Impartation.',
        summary_fr: 'Déclarations Compagnons de 6h30 — Abondance, Exemption de Maladie, Jardin Arrosé, Signe de Bonté, Hommes de Qualité & Triple Impartation.',
      },
    ],
  },
];
