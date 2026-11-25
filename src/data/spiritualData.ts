export type LanguageMode = 'both' | 'en' | 'fr';
export type UILang = 'en' | 'fr';

export interface TranscriptChapter {
  id: string;
  number: string;
  timestamp: string;
  title_en: string;
  title_fr: string;
  scriptures: string[];
  en_text: string;
  fr_text: string;
  declaration_en: string;
  declaration_fr: string;
}

export interface VideoResource {
  id: string;
  videoNumber: number;
  youtubeId: string;
  url: string;
  playlistId: string;
  playlistUrl: string;
  title_en: string;
  title_fr: string;
  speaker: string;
  channel: string;
  channelHandle: string;
  duration: string;
  uploadedAt: string;
  thumbnail: string;
  watchCategory_en: string;
  watchCategory_fr: string;
  tagline_en: string;
  tagline_fr: string;
  overview_en: string;
  overview_fr: string;
  docxFile: string;
  keyScriptures: string[];
  chapters: TranscriptChapter[];
}

export interface PrayerCardItem {
  id: string;
  videoRefId: string;
  category: 'morning' | 'devotional' | 'declarations' | 'warfare' | 'family' | 'finances' | 'healing' | 'protection';
  categoryLabel_en: string;
  categoryLabel_fr: string;
  watchHour: string;
  title_en: string;
  title_fr: string;
  scriptureRef: string;
  scriptureQuote_en: string;
  scriptureQuote_fr: string;
  prayerText_en: string;
  prayerText_fr: string;
  decree_en: string;
  decree_fr: string;
}

export interface DevotionalGuide {
  id: string;
  dayLabel_en: string;
  dayLabel_fr: string;
  videoRefId: string;
  title_en: string;
  title_fr: string;
  subtitle_en: string;
  subtitle_fr: string;
  anchorScripture: string;
  anchorVerse_en: string;
  anchorVerse_fr: string;
  meditation_en: string[];
  meditation_fr: string[];
  reflectionPrompts_en: string[];
  reflectionPrompts_fr: string[];
  closingPrayer_en: string;
  closingPrayer_fr: string;
}

export interface ScriptureEntry {
  id: string;
  reference_en: string;
  reference_fr: string;
  theme_en: string;
  theme_fr: string;
  kjv_en: string;
  lsg_fr: string;
  application_en: string;
  application_fr: string;
  videoIds: string[];
}

export const VIDEOS_DATA: VideoResource[] = [
  {
    id: '4YElIs15_Ak',
    videoNumber: 1,
    youtubeId: '4YElIs15_Ak',
    url: 'https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    playlistId: 'PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
    title_en: '[POWERFUL 🔥] COMMAND YOUR DAY IN TOTAL VICTORY BY DECLARING THESE POWERFUL PRAYER | JOSHUA SELMAN',
    title_fr: '[PUISSANT 🔥] COMMANDEZ VOTRE JOURNÉE DANS UNE VICTOIRE TOTALE EN DÉCLARANT CES PUISSANTES PRIÈRES | JOSHUA SELMAN',
    speaker: 'Apostle Joshua Selman',
    channel: 'Prayer By Grace',
    channelHandle: '@PrayerByGrace',
    duration: '1:24:44',
    uploadedAt: '2026-11-14',
    thumbnail: 'https://i.ytimg.com/vi/4YElIs15_Ak/maxresdefault.jpg',
    watchCategory_en: 'Dawn Command & Midnight Warfare',
    watchCategory_fr: 'Commandement de l’Aube & Veille de Minuit',
    tagline_en: 'Taking charge of the gate of the morning and returning every arrow of darkness back to sender.',
    tagline_fr: 'Prendre autorité à la porte du matin et renvoyer chaque flèche des ténèbres à l’envoyeur.',
    overview_en:
      'A comprehensive 84-minute prophetic prayer manual divided into two major movements: Part I commands the morning watch before sunrise (Job 38:12-13, Psalm 5:3, Exodus 14:24), destroying yokes by the anointing, consuming evil altars, blotting out ancestral ordinances, exposing household wickedness, recovering stolen glory, and sealing the household in a wall of fire. Part II enters the Midnight Watch ("Back to Sender" & Total Recovery) rooted in Esther 7:10, Psalm 7:15-16, Isaiah 54:17, and Obadiah 1:17.',
    overview_fr:
      'Un manuel complet de prière prophétique de 84 minutes structuré en deux grands mouvements : la Partie I commande la veille du matin avant le lever du soleil (Job 38:12-13, Psaume 5:4, Exode 14:24), brisant les jougs par l’onction, consumant les autels maléfiques, effaçant les actes ancestraux, exposant la méchanceté domestique, récupérant la gloire volée et entourant la famille d’une muraille de feu. La Partie II ouvre la veille de minuit (« Retour à l’envoyeur » et récupération totale) fondée sur Esther 7:10, Psaume 7:16-17, Ésaïe 54:17 et Abdias 1:17.',
    docxFile: 'downloads/Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx',
    keyScriptures: [
      'Job 38:12-13',
      'Psalm 5:3',
      'Psalm 121',
      'Exodus 14:24',
      'Isaiah 10:27',
      'Isaiah 49:24-26',
      'Colossians 2:14-15',
      'Galatians 3:13',
      'Micah 7:6-8',
      'Psalm 68:1-2',
      'Psalm 91:5-8',
      'Obadiah 1:15-17',
      'Isaiah 60:1',
      'Lamentations 3:22-23',
      'Malachi 3:11',
      'Psalm 24:7',
      'Deuteronomy 28:7,12',
      'Jeremiah 30:17',
      'Isaiah 40:31',
      'Psalm 34:7',
      'Joel 2:25',
      'Zechariah 2:5',
      'Isaiah 54:15-17',
      'Luke 10:19',
      'Esther 7:10',
      'Psalm 124:7',
    ],
    chapters: [
      {
        id: 'v1-ch1',
        number: 'I',
        timestamp: '00:00 – 07:30',
        title_en: 'Commanding the Gate of the Morning & Shaking Out the Wicked',
        title_fr: 'Commander la Porte du Matin et Secouer les Méchants',
        scriptures: ['Job 38:12-13', 'Psalm 5:3', 'Psalm 121', 'Exodus 14:24'],
        en_text:
          'Get up from that bed right now. Before the sun fully rises, somebody has to take charge of this day. Will it be you or the enemy? In Job 38:12-13, God asks Job: "Have you commanded the morning since your days, and caused the dayspring to know his place, that it might take hold of the ends of the earth, that the wicked might be shaken out of it?" The morning has ends, and those ends can be grabbed and shaken. Every morning the day comes waiting for instructions. Psalm 5:3 says, "My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up." And in Exodus 14:24, in the morning watch, the Lord looked unto the host of the Egyptians through the pillar of fire and of the cloud, and troubled the host of the Egyptians.',
        fr_text:
          'Lève-toi de ce lit maintenant même. Avant que le soleil ne se lève pleinement, quelqu’un doit prendre le contrôle de cette journée. Sera-ce toi ou l’ennemi ? Dans Job 38:12-13, Dieu demande à Job : « Depuis que tu existes, as-tu commandé au matin ? As-tu montré sa place à l’aurore, pour qu’elle saisisse les extrémités de la terre, et que les méchants en soient secoués ? » Le matin a des extrémités que l’on peut saisir et secouer. Chaque matin, le jour attend des instructions. Le Psaume 5:4 dit : « Éternel ! le matin tu entends ma voix ; le matin je me tourne vers toi, et je regarde. » Et selon Exode 14:24, à la veille du matin, l’Éternel, de la colonne de feu et de nuée, regarda le camp des Égyptiens et les mit en déroute.',
        declaration_en:
          'This morning belongs to God and this morning belongs to me! Father, in the name of Jesus, I take hold of the ends of this morning and the corners of this day. Every wicked arrangement, bad news, accident, or disappointment scheduled for today—I shake you out by fire! Sun and moon, you will not smite me. Lord, look at my pursuers through the pillar of fire and trouble their camp!',
        declaration_fr:
          'Ce matin appartient à Dieu et ce matin m’appartient ! Père, au nom de Jésus, je saisis les extrémités de ce matin et les quatre coins de ce jour. Tout arrangement maléfique, mauvaise nouvelle, accident ou déception programmé pour aujourd’hui — je te secoue par le feu ! Soleil et lune, vous ne me frapperez point. Seigneur, regarde mes poursuivants à travers la colonne de feu et trouble leur camp !',
      },
      {
        id: 'v1-ch2',
        number: 'II',
        timestamp: '07:31 – 14:20',
        title_en: 'Destroying Yokes by the Anointing & Delivering the Lawful Captive',
        title_fr: 'Briser les Jougs par l’Onction et Délivrer le Captif Légitime',
        scriptures: ['Isaiah 10:27', 'Isaiah 49:24-26'],
        en_text:
          'Isaiah 10:27 says: "The burden shall be taken away from off thy shoulder, and the yoke from off thy neck, and the yoke shall be destroyed because of the anointing." It does not say the yoke will be adjusted or loosened a little—it says destroyed! Every yoke of slow progress, of "almost there," of laboring without harvest, of running fast and staying in the same place, of borrowing, begging, and shame must break. And in Isaiah 49:24-26, the Lord says: "Even the captives of the mighty shall be taken away, and the prey of the terrible shall be delivered: for I will contend with him that contendeth with thee, and I will save thy children."',
        fr_text:
          'Ésaïe 10:27 déclare : « En ce jour, son fardeau sera ôté de dessus ton épaule, et son joug de dessus ton cou ; et la graisse (l’onction) fera éclater le joug. » Il n’est pas dit que le joug sera ajusté ou légèrement desserré — il est dit détruit ! Tout joug de lenteur, du « presque arrivé », de labeur sans moisson, de course sur place, d’emprunt, de mendicité et de honte doit se briser. Et dans Ésaïe 49:24-26, l’Éternel dit : « Oui, la capture du puissant lui sera enlevée, et le butin du tyran lui échappera ; je combattrai tes ennemis, et je sauverai tes fils. »',
        declaration_en:
          'Every yoke of limitation on my neck, be destroyed by the anointing! Chain of delay around my legs, my hands, my mouth, and my mind—snap by the sword of the Spirit! Lord, contend with those who contend with me this morning; every strong man holding my portion as prey, release it now!',
        declaration_fr:
          'Tout joug de limitation sur mon cou, sois détruit par l’onction ! Chaîne de retard autour de mes jambes, de mes mains, de ma bouche et de mon esprit — romps-toi par l’épée de l’Esprit ! Seigneur, combats ceux qui me combattent ce matin ; tout homme fort qui retient ma portion en otage, relâche-la maintenant !',
      },
      {
        id: 'v1-ch3',
        number: 'III',
        timestamp: '14:21 – 21:40',
        title_en: 'Calling Fire on Evil Altars & Blotting Out Ancestral Covenants',
        title_fr: 'Appeler le Feu sur les Autels Maléfiques et Effacer les Alliances Ancestrales',
        scriptures: ['1 Kings 18:38', 'Hebrews 12:24', 'Colossians 2:14-15', 'Galatians 3:13'],
        en_text:
          'Every morning before you wake up, someone may have spoken your name over an altar. In the early morning, God’s answer is fire! The blood of goats and bulls cannot overpower the blood of the Lamb; Hebrews says the blood of Jesus speaks better things than the blood of Abel. Colossians 2:14-15 declares that He blotted out the handwriting of ordinances that was against us, nailing it to His cross, and spoiled principalities and powers openly. And Galatians 3:13 affirms: "Christ hath redeemed us from the curse of the law, being made a curse for us."',
        fr_text:
          'Chaque matin avant ton réveil, quelqu’un a pu prononcer ton nom sur un autel. Dès l’aube, la réponse de Dieu est le feu ! Le sang des boucs et des taureaux ne peut vaincre le sang de l’Agneau ; le sang de Jésus parle mieux que celui d’Abel. Colossiens 2:14-15 déclare qu’Il a effacé l’acte dont les ordonnances nous condamnaient en le clouant à la croix, dépouillant publiquement les dominations et les autorités. Et Galates 3:13 affirme : « Christ nous a rachetés de la malédiction de la loi, étant devenu malédiction pour nous. »',
        declaration_en:
          'Every altar raised against my life in my father’s village, under any tree, or in any river—catch fire! Blood of Jesus, speak louder than every altar and every curse! Every handwriting signed by my ancestors before I was born, be blotted out by the blood of Jesus. Generational curse, you stop at my door: from this morning, I am the beginning of a new lineage!',
        declaration_fr:
          'Tout autel élevé contre ma vie dans le village de mon père, sous un arbre ou dans une rivière — prends feu ! Sang de Jésus, parle plus fort que tout autel et toute malédiction ! Tout acte signé par mes ancêtres avant ma naissance, sois effacé par le sang de Jésus. Malédiction générationnelle, tu t’arrêtes à ma porte : dès ce matin, je suis le commencement d’une nouvelle lignée !',
      },
      {
        id: 'v1-ch4',
        number: 'IV',
        timestamp: '21:41 – 27:30',
        title_en: 'Exposing Household Wickedness & Canceling Evil Night Dreams',
        title_fr: 'Exposer la Méchanceté Domestique et Annuler les Rêves Nocturnes',
        scriptures: ['Micah 7:6', 'Psalm 68:1-2', 'Psalm 91:5-6'],
        en_text:
          'Micah 7:6 says, "A man’s enemies are the men of his own house." We do not pray against people; we pray against the spirits using people and monitoring your star. Psalm 68:1-2 cries out: "Let God arise, let his enemies be scattered... as smoke is driven away, so drive them away: as wax melteth before the fire, so let the wicked perish at the presence of God." We also cancel every night operation: being fed in the dream, spirit spouses, masquerades, serpents, and dreams of backwardness (going back to old schools, villages, or old houses). Psalm 91:5-6 covers you from midnight to midday.',
        fr_text:
          'Michée 7:6 dit : « L’homme a pour ennemis les gens de sa maison. » Nous ne prions pas contre les personnes, mais contre les esprits qui utilisent les gens et surveillent votre étoile. Le Psaume 68:2-3 proclame : « Dieu se lève, ses ennemis se dispersent... comme la fumée se dissipe, tu les dissipes ; comme la cire se fond au feu, les méchants disparaissent devant Dieu. » Nous annulons aussi toute opération nocturne : nourriture nocturne, maris ou femmes de nuit, serpents et rêves de régression. Le Psaume 91:5-6 vous couvre de minuit à midi.',
        declaration_en:
          'Let God arise in my house, my bedroom, my office, and let every monitoring spirit scatter like smoke and melt like wax! Every night operation against my life is cancelled: every food eaten in the dream, be flushed out by the blood of Jesus; every spirit spouse, I divorce you; every dream of backwardness, I cancel you—I will go forward!',
        declaration_fr:
          'Que Dieu se lève dans ma maison, ma chambre et mon bureau, et que tout esprit de surveillance se dissipe comme la fumée et fonde comme la cire ! Toute opération nocturne contre ma vie est annulée : toute nourriture mangée en rêve, sois évacuée par le sang de Jésus ; tout conjoint spirituel, je divorce d’avec toi ; tout rêve de régression, je t’annule — j’avancerai !',
      },
      {
        id: 'v1-ch5',
        number: 'V',
        timestamp: '27:31 – 36:50',
        title_en: 'Possessing Possessions, Restoring Glory, New Mercies & Family Salvation',
        title_fr: 'Posséder ses Possessions, Restaurer la Gloire, Miséricordes Nouvelles & Salut Familial',
        scriptures: ['Obadiah 1:17', 'Matthew 16:19', 'Isaiah 60:1', 'Lamentations 3:22-23', 'Isaiah 49:25'],
        en_text:
          'Obadiah 1:17 declares: "But upon Mount Zion shall be deliverance, and there shall be holiness; and the house of Jacob shall possess their possessions." Deliverance is not the end—possession is the end! Like David at Ziklag, pursue, overtake, and recover all. Isaiah 60:1 commands: "Arise, shine; for thy light is come, and the glory of the Lord is risen upon thee." Lamentations 3:22-23 reminds us that His compassions fail not; they are new every morning—yesterday’s failure has no jurisdiction over today’s mercy. And in Isaiah 49:25, God promises: "I will save thy children."',
        fr_text:
          'Abdias 1:17 déclare : « Mais le salut sera sur la montagne de Sion, elle sera sainte, et la maison de Jacob reprendra ses possessions. » La délivrance n’est pas la fin — la prise de possession est la fin ! Comme David à Tsiklag, poursuis, atteins et récupère tout. Ésaïe 60:1 ordonne : « Lève-toi, sois éclairée, car ta lumière arrive, et la gloire de l’Éternel se lève sur toi. » Lamentations 3:22-23 nous rappelle que Ses compassions se renouvellent chaque matin. Et dans Ésaïe 49:25, Dieu promet : « Je sauverai tes fils. »',
        declaration_en:
          'Everything the enemy stole from me—my glory, my star, my opportunities, my contracts, my joy, and my finances—I recover it sevenfold! My glory is restored: from this morning I will be seen, found, chosen, and celebrated. Lord, I receive new mercy that shuts every door my mistakes opened, and I decree that my entire household and children are saved and taught of the Lord!',
        declaration_fr:
          'Tout ce que l’ennemi m’a volé — ma gloire, mon étoile, mes opportunités, mes contrats, ma joie et mes finances — je le récupère au septuple ! Ma gloire est restaurée : dès ce matin je serai vu, trouvé, choisi et célébré. Seigneur, je reçois une miséricorde nouvelle, et je décrète que toute ma maison et mes enfants sont sauvés et enseignés de l’Éternel !',
      },
      {
        id: 'v1-ch6',
        number: 'VI',
        timestamp: '36:51 – 46:30',
        title_en: 'Marital Breakthrough, Rebuking the Financial Devourer & Divine Healing',
        title_fr: 'Percée Conjugale, Réprimande du Dévoreur Financier & Guérison Divine',
        scriptures: ['Genesis 2:18', 'Exodus 23:25-26', 'Haggai 1:6', 'Malachi 3:11', 'Psalm 24:7', 'Deuteronomy 28:12', 'Jeremiah 30:17', 'Isaiah 40:31'],
        en_text:
          'Genesis 2:18 says it is not good for man to be alone, and Exodus 23:25-26 promises no barrenness or miscarriage. For your finances, Haggai 1:6 speaks of wages in a bag with holes, while Malachi 3:11 promises: "I will rebuke the devourer for your sakes." Psalm 24:7 commands the gates of finance, contracts, and international doors to lift up their heads, and Deuteronomy 28:12 opens heaven’s good treasure so you lend and do not borrow. For your body, Jeremiah 30:17 promises: "I will restore health unto thee, and I will heal thee of thy wounds," and Isaiah 40:31 renews your strength like the eagle’s.',
        fr_text:
          'Genèse 2:18 dit qu’il n’est pas bon que l’homme soit seul, et Exode 23:25-26 promet qu’il n’y aura ni femme qui avorte ni femme stérile. Pour vos finances, Aggée 1:6 parle d’un sac percé, tandis que Malachie 3:11 promet : « Pour vous je menacerai celui qui dévore. » Le Psaume 24:7 ordonne aux portes des finances et des contrats d’élever leurs linteaux, et Deutéronome 28:12 ouvre le bon trésor du ciel. Pour votre corps, Jérémie 30:17 promet : « Je te guérirai, je panserai tes plaies », et Ésaïe 40:31 renouvelle vos forces comme celles de l’aigle.',
        declaration_en:
          'Every veil blocking my marital breakthrough is torn, and every bleeding marriage is restored into a sanctuary of peace! Devourer of my finances, the Lord rebukes you; every hole in my pocket is sealed by fire! Gates of finance and destiny helpers, open to me now! Every sickness, growth, high blood pressure, pain, and infirmity in my body—dry up from the root; by His stripes I am healed and renewed in strength!',
        declaration_fr:
          'Tout voile bloquant ma percée conjugale est déchiré, et tout foyer blessé redevient un sanctuaire de paix ! Dévoreur de mes finances, l’Éternel te réprimande ; tout trou dans ma poche est scellé par le feu ! Portes de finances et aides de destinée, ouvrez-vous maintenant ! Toute maladie, tumeur, hypertension, douleur et infirmité dans mon corps — sèche depuis la racine ; par Ses meurtrissures je suis guéri et renouvelé en force !',
      },
      {
        id: 'v1-ch7',
        number: 'VII',
        timestamp: '46:31 – 56:15',
        title_en: 'Warring Angels, Restoring Wasted Years & Sealing the Day in a Wall of Fire',
        title_fr: 'Anges de Guerre, Restauration des Années Perdues & Muraille de Feu',
        scriptures: ['Psalm 34:7', '2 Kings 19:35', 'Psalm 35:5-6', 'Exodus 15:3', 'Numbers 23:23', 'Joel 2:25', 'Psalm 90:14', 'Zechariah 2:5', 'Revelation 12:11', 'Isaiah 54:17', 'Luke 10:19', 'Psalm 46:5', 'Psalm 30:5'],
        en_text:
          'In 2 Kings 19:35, one angel struck 185,000 Assyrians in a single night. Psalm 34:7 and Psalm 35:5-6 deploy the angel of the Lord to encamp around you and chase your enemies. Numbers 23:23 declares there is no enchantment against Jacob nor divination against Israel. Joel 2:25 promises: "I will restore to you the years that the locust hath eaten." What took others ten years will take you one! Finally, Zechariah 2:5 surrounds you with a wall of fire, Luke 10:19 gives you authority over serpents and scorpions, Psalm 46:5 promises God helps you right early, and Psalm 30:5 ushers in morning joy.',
        fr_text:
          'Dans 2 Rois 19:35, un seul ange frappa 185 000 Assyriens en une seule nuit. Les Psaumes 34:8 et 35:5-6 déploient l’ange de l’Éternel pour camper autour de vous et chasser vos ennemis. Nombres 23:23 proclame que l’enchantement ne peut rien contre Jacob. Joël 2:25 promet : « Je vous remplacerai les années qu’ont dévorées la sauterelle. » Ce qui a pris dix ans aux autres vous en prendra un ! Enfin, Zacharie 2:5 vous entoure d’une muraille de feu, Luc 10:19 vous donne pouvoir sur toute la puissance de l’ennemi, et le Psaume 30:6 fait éclater l’allégresse du matin.',
        declaration_en:
          'Father, release warring angels, angels of provision, and angels of healing into my life today! Restore my wasted years with divine speed and acceleration. Lord, be a wall of fire around me, my family, my journeys, and my work today. I speak to this day: you will favor me, bring good news, and carry divine appointments. Victory! Victory! Victory!',
        declaration_fr:
          'Père, relâche Tes anges de guerre, de provision et de guérison dans ma vie aujourd’hui ! Restaure mes années perdues avec une vitesse et une accélération divines. Seigneur, sois une muraille de feu autour de moi, de ma famille, de mes trajets et de mon travail aujourd’hui. Je parle à ce jour : tu me favoriseras et porteras de bonnes nouvelles. Victoire ! Victoire ! Victoire !',
      },
      {
        id: 'v1-ch8',
        number: 'VIII',
        timestamp: '56:16 – 1:24:44',
        title_en: 'Part II: Midnight Warfare — Back to Sender & Total Recovery',
        title_fr: 'Partie II : Combat de Minuit — Retour à l’Envoyeur & Récupération Totale',
        scriptures: ['Esther 7:10', 'Psalm 7:15-16', 'Isaiah 54:17', 'Psalm 124:7', 'Proverbs 26:27', 'Psalm 9:16', 'Matthew 12:29', 'Obadiah 1:15-17', 'Galatians 6:17', 'Psalm 113:9', 'Deuteronomy 2:3', 'Revelation 3:7', '2 Kings 6:17', 'Daniel 6:24', 'Isaiah 43:18-19', 'Deuteronomy 28:7', 'Isaiah 59:19', 'Psalm 18:37-40', 'Psalm 57:6'],
        en_text:
          'While men slept, the enemy came and sowed tares—not tonight! Esther 7:10 shows Haman hanged on the gallows he prepared for Mordecai, and Psalm 7:15-16 declares he falls into the ditch he made. Every evil delivery of sickness, poverty, sorrow, and untimely death is returned unopened to its sender. Psalm 124:7 proclaims: "The snare is broken, and we are escaped!" Proverbs 26:27 rolls every stone back upon the one pushing it. Matthew 12:29 binds the strong man and spoils his house. Joseph’s pit becomes your platform to the palace; Galatians 6:17 places the marks of Jesus upon you; Revelation 3:7 opens doors with the Key of David; 2 Kings 6:17 surrounds you with horses and chariots of fire; and Psalm 57:6 seals the victory.',
        fr_text:
          'Pendant que les hommes dormaient, l’ennemi est venu semer l’ivraie — pas cette nuit ! Esther 7:10 montre Haman pendu au bois qu’il avait préparé pour Mardochée, et le Psaume 7:16-17 déclare qu’il tombe dans la fosse qu’il a creusée. Tout colis maléfique de maladie, de pauvreté, de chagrin et de mort prématurée est retourné non ouvert à son expéditeur. Le Psaume 124:7 proclame : « Le filet s’est rompu, et nous nous sommes échappés ! » Proverbes 26:27 fait rouler chaque pierre sur celui qui la pousse. Matthieu 12:29 lie l’homme fort et pille sa maison. La fosse de Joseph devient votre tremplin vers le palais ; Galates 6:17 place sur vous les marques de Jésus ; Apocalypse 3:7 ouvre les portes avec la clé de David ; et 2 Rois 6:17 vous entoure de chevaux et de chars de feu.',
        declaration_en:
          'Every gallows raised for my life, carry your builder! Every pit dug for my feet, swallow your digger! Every arrow fired at my destiny from childhood until tonight—Back to Sender! The snare is broken and I have escaped! I bind the strong man, I spoil his house, I possess my possessions, and I seal my deliverance, healing, breakthrough, and family with the blood of Jesus. Back to sender—it is finished in Jesus’ mighty name, Amen!',
        declaration_fr:
          'Que toute potence dressée contre ma vie porte son constructeur ! Que toute fosse creusée pour mes pieds engloutisse son fossoyeur ! Toute flèche tirée contre ma destinée depuis mon enfance jusqu’à cette nuit — Retour à l’envoyeur ! Le filet est rompu et je me suis échappé ! Je lie l’homme fort, je pille sa maison, je possède mes possessions et je scelle ma délivrance, ma guérison, ma percée et ma famille par le sang de Jésus. Tout est accompli au nom puissant de Jésus, Amen !',
      },
    ],
  },
  {
    id: 'XWBUBtEv70A',
    videoNumber: 2,
    youtubeId: 'XWBUBtEv70A',
    url: 'https://www.youtube.com/watch?v=XWBUBtEv70A&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=2',
    playlistId: 'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
    title_en: 'Call on the Name of Jesus and Watch God Work Today | Morning Prayer',
    title_fr: 'Invoquez le Nom de Jésus et Regardez Dieu Agir Aujourd’hui | Prière du Matin',
    speaker: 'Grace Enclave Devotional Voice',
    channel: 'Grace Enclave',
    channelHandle: '@graceenclave',
    duration: '09:02',
    uploadedAt: '2025-08-09',
    thumbnail: 'https://i.ytimg.com/vi/XWBUBtEv70A/maxresdefault.jpg',
    watchCategory_en: 'Contemplative Dawn Devotional',
    watchCategory_fr: 'Dévotion Contemplative de l’Aube',
    tagline_en: 'A heartfelt morning prayer of gratitude, surrender, intercession, and abiding in the True Vine.',
    tagline_fr: 'Une prière matinale fervente de gratitude, d’abandon, d’intercession et de communion avec le Cep véritable.',
    overview_en:
      'A serene, deeply scriptural 9-minute morning devotional prayer that guides the believer through six sacred movements: (1) Awakening in Mercy & Gratitude for Unseen Protection; (2) Wise Stewardship of Time & Generosity; (3) Heart Examination, Confession & Cleansing; (4) Total Surrender of Daily Plans & Trusting God’s Wisdom (Proverbs 3:5-6); (5) Compassionate Intercession for Family, Friends, the Suffering & the Needy; and (6) Eternal Perspective, Christlike Humility & Abiding in the Vine (John 15:5).',
    overview_fr:
      'Une prière matinale contemplative et profondément biblique de 9 minutes qui guide le croyant à travers six mouvements sacrés : (1) Éveil dans la miséricorde et gratitude pour la protection invisible ; (2) Intendance sage du temps et générosité ; (3) Examen du cœur, confession et purification ; (4) Abandon total des projets du jour et confiance en la sagesse divine (Proverbes 3:5-6) ; (5) Intercession compatissante pour la famille, les amis, les malades et les démunis ; et (6) Perspective éternelle, humilité et demeure en Christ, le Cep véritable (Jean 15:5).',
    docxFile: 'downloads/Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx',
    keyScriptures: [
      'Matthew 5:45',
      'Lamentations 3:22-23',
      'Psalm 121:3-4',
      'Psalm 90:12',
      'Psalm 139:23-24',
      '1 John 1:9',
      'Proverbs 3:5-6',
      '2 Corinthians 5:7',
      '2 Timothy 1:7',
      'Philippians 3:20',
      'Philippians 2:3',
      'Colossians 4:6',
      'John 15:5',
      'Psalm 5:3',
    ],
    chapters: [
      {
        id: 'v2-ch1',
        number: 'I',
        timestamp: '00:00 – 02:10',
        title_en: 'Awakening in Mercy, Unseen Protection & Wise Stewardship of the Day',
        title_fr: 'Éveil dans la Miséricorde, Protection Invisible & Intendance Sage du Jour',
        scriptures: ['Matthew 5:45', 'Lamentations 3:22-23', 'Psalm 121:3-4', 'Psalm 90:12'],
        en_text:
          'Father in heaven, I come before you at the dawn of this new day with a heart that longs to be near you. As the light begins to touch the earth, I am reminded that you are the one who causes the sun to rise on the just and the unjust, that every day is birthed in your mercy, and that even now as I speak, your hand is sustaining all creation. I breathe in deeply and remember that my very breath is a gift from you—that I woke not by chance but by your will. Lord, you have brought me through the night, keeping me when I could not keep myself, guarding my soul as a shepherd watches his sheep. I rise today not as one who owns the day, but as a steward of the hours you have given me. I thank you for the simple blessings: the strength of my body, the ability to think and speak, food, water, shelter, and clothing. May my gratitude spill over into generosity.',
        fr_text:
          'Père céleste, je viens devant Toi à l’aube de ce jour nouveau avec un cœur qui soupire après Ta présence. Alors que la lumière commence à effleurer la terre, il m’est rappelé que c’est Toi qui fais lever le soleil sur les méchants et sur les bons, que chaque jour naît de Ta miséricorde et que Ta main soutient toute la création. J’inspire profondément et je me souviens que mon souffle même est un don qui vient de Toi — que je ne me suis pas réveillé par hasard, mais par Ta volonté. Seigneur, Tu m’as fait traverser la nuit, veillant sur mon âme comme un berger veille sur ses brebis. Je me lève aujourd’hui non pas comme celui à qui appartient la journée, mais comme un intendant des heures que Tu m’as confiées. Je Te rends grâce pour les bénédictions simples : la vigueur de mon corps, la capacité de penser et de parler, la nourriture, l’eau, le toit et les vêtements. Que ma gratitude déborde en générosité.',
        declaration_en:
          'My breath is a sacred gift from God. I rise today as a faithful steward of every hour, walking in wisdom and overflowing with gratitude and generosity.',
        declaration_fr:
          'Mon souffle est un don sacré de Dieu. Je me lève aujourd’hui comme un intendant fidèle de chaque heure, marchant dans la sagesse et débordant de gratitude et de générosité.',
      },
      {
        id: 'v2-ch2',
        number: 'II',
        timestamp: '02:11 – 04:25',
        title_en: 'Heart Examination, Cleansing, Surrender & Walking by Faith',
        title_fr: 'Examen du Cœur, Purification, Abandon & Marche par la Foi',
        scriptures: ['Psalm 139:23-24', '1 John 1:9', 'Proverbs 3:5-6', '2 Corinthians 5:7', '2 Timothy 1:7'],
        en_text:
          'Search me, Lord. Look into my heart and see if there is any thought or motive that does not honor you. Forgive me for careless words, thoughts of doubt or pride, and times I sought my own comfort over obedience. Wash me clean today; make me sensitive to the whispers of your Spirit. As I stand on the edge of this day, I place it entirely in your hands—my plans, my meetings, my work, my conversations, all of it is yours. You have promised in Proverbs 3:5-6 that if I trust in you with all my heart and lean not on my own understanding, and in all my ways acknowledge you, you will make my paths straight. Grant me strength to approach responsibilities as opportunities to serve you, to be a light in someone’s darkness, and to walk in the Spirit of power, love, and a sound mind.',
        fr_text:
          'Sonde-moi, Seigneur. Regarde au fond de mon cœur et vois s’il s’y trouve quelque pensée ou quelque motif qui ne T’honore pas. Pardonne-moi mes paroles imprudentes, mes pensées de doute ou d’orgueil, et les moments où j’ai recherché mon propre confort plutôt que l’obéissance. Purifie-moi aujourd’hui et rends-moi sensible aux murmures de Ton Esprit. Au seuil de cette journée, je la remets entièrement entre Tes mains : mes projets, mes rencontres, mon travail, mes conversations — tout T’appartient. Selon Ta promesse dans Proverbes 3:5-6, je me confie en Toi de tout mon cœur sans m’appuyer sur ma sagesse, et Tu aplaniras mes sentiers. Accorde-moi la sagesse d’En-Haut et un esprit de force, d’amour et de sagesse.',
        declaration_en:
          'I place my plans, my work, and my conversations entirely in the Lord’s hands. I trust in Him with all my heart; He makes my paths straight and fills me with power, love, and a sound mind.',
        declaration_fr:
          'Je remets mes projets, mon travail et mes conversations entièrement entre les mains du Seigneur. Je me confie en Lui de tout mon cœur ; Il aplanit mes sentiers et me remplit de force, d’amour et de sagesse.',
      },
      {
        id: 'v2-ch3',
        number: 'III',
        timestamp: '04:26 – 06:35',
        title_en: 'Intercession for Loved Ones & the Needy, Eternal Perspective & Humility',
        title_fr: 'Intercession pour les Proches & les Démunis, Perspective Éternelle & Humilité',
        scriptures: ['Philippians 3:20', 'Philippians 2:3', 'Colossians 4:6'],
        en_text:
          'Father, I lift before you those I love—family, friends, and all who cross my path. Surround them with your favor as with a shield. Bring healing to the ill, comfort to the grieving, cords of kindness to those far from you, and clarity to those making decisions. I pray also for the poor, the hungry, the oppressed, the lonely, and the brokenhearted: send laborers into the fields and make me willing to be part of the answer. Keep me mindful of the eternal in the midst of the temporary, remembering that my citizenship is in heaven and my hope is in Christ alone. Help me to walk in genuine love, cheerful service, and words seasoned with grace. When I grow weary, be my strength; when discouraged, my hope; when uncertain, my anchor; when tempted, my escape.',
        fr_text:
          'Père, j’élève devant Toi ceux que j’aime — ma famille, mes amis et tous ceux qui croiseront ma route. Entoure-les de Ta faveur comme d’un bouclier. Apporte la guérison aux malades, la consolation aux endeuillés, des cordages d’amour à ceux qui sont éloignés, et la clarté à ceux qui prennent des décisions. Je prie aussi pour les pauvres, les affamés, les opprimés, les personnes seules et les cœurs brisés : fais de moi une réponse à ces prières. Garde-moi attentif à l’éternel au milieu du temporaire, car ma citoyenneté est dans les cieux. Que mes paroles soient accompagnées de grâce. Quand je me lasse, sois ma force ; quand je me décourage, mon espérance ; quand je doute, mon ancre.',
        declaration_en:
          'The favor of the Lord surrounds my loved ones like a shield. My citizenship is in heaven; my love is genuine, my words are seasoned with grace, and Christ is my strength, my hope, and my anchor.',
        declaration_fr:
          'La faveur de l’Éternel entoure mes proches comme un bouclier. Ma citoyenneté est dans les cieux ; mon amour est sincère, mes paroles sont pleines de grâce, et Christ est ma force, mon espérance et mon ancre.',
      },
      {
        id: 'v2-ch4',
        number: 'IV',
        timestamp: '06:36 – 09:02',
        title_en: 'Abiding in the True Vine & Deeper Hunger for Communion with God',
        title_fr: 'Demeurer dans le Cep Véritable & Faim Profonde de Communion avec Dieu',
        scriptures: ['John 15:5', '1 Thessalonians 5:17'],
        en_text:
          'As the hours unfold, give me a spirit of prayer that lingers throughout the day. Teach me to abide in you so closely that your desires become my desires, your heart my heart, your ways my ways. For you have said: "I am the vine, you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing" (John 15:5). Draw me into the depths of your word, the richness of communion in prayer, the joy of obedience, and the peace of surrender. Let me know you more tomorrow than I do today, and more today than I did yesterday. Take my mind, my heart, my hands, my voice—and at the close of this day, may I look back and see your fingerprints on every moment. In the name of Jesus, my Savior, my Lord, my Friend, my Life. Amen.',
        fr_text:
          'Au fil des heures qui s’ouvrent, donne-moi un esprit de prière qui demeure tout au long du jour. Enseigne-moi à demeurer en Toi si étroitement que Tes désirs deviennent mes désirs, Ton cœur mon cœur, Tes voies mes voies. Car Tu as dit : « Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire » (Jean 15:5). Attire-moi dans les profondeurs de Ta Parole, dans la richesse de la communion avec Toi, dans la joie de l’obéissance et la paix de l’abandon. Prends mon intelligence, mon cœur, mes mains, ma voix — et au soir de cette journée, puissé-je contempler Tes empreintes sur chaque instant. Au nom de Jésus, mon Sauveur, mon Seigneur, mon Ami, ma Vie. Amen.',
        declaration_en:
          'I abide in Christ the True Vine, and His life bears abundant fruit in me. At the close of this day, I will see God’s fingerprints on every moment. Amen!',
        declaration_fr:
          'Je demeure en Christ, le Cep véritable, et Sa vie porte en moi un fruit abondant. Au soir de cette journée, je contemplerai les empreintes de Dieu sur chaque instant. Amen !',
      },
    ],
  },
  {
    id: '45wUm7wffBQ',
    videoNumber: 3,
    youtubeId: '45wUm7wffBQ',
    url: 'https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    playlistId: 'PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    playlistUrl: 'https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs',
    title_en: '6:45 AM #prayer 10 POWERFUL MORNING DECLARATIONS WITH APOSTLE JOSHUA SELMAN',
    title_fr: '6h45 #prière 10 PUISSANTES DÉCLARATIONS MATINALES AVEC L’APÔTRE JOSHUA SELMAN',
    speaker: 'Apostle Joshua Selman',
    channel: 'OVERCOMING DAILY',
    channelHandle: '@therealovercomingdaily',
    duration: '29:12',
    uploadedAt: '2023-09-11',
    thumbnail: 'https://i.ytimg.com/vi/45wUm7wffBQ/maxresdefault.jpg',
    watchCategory_en: '6:45 AM Apostolic Declarations',
    watchCategory_fr: 'Déclarations Apostoliques de 6h45',
    tagline_en: 'Praying like believers with Spiritual Intelligence: 10 prophetic decrees that create reality.',
    tagline_fr: 'Prier comme des croyants dotés d’Intelligence Spirituelle : 10 décrets prophétiques qui créent la réalité.',
    overview_en:
      'A high-impact 29-minute apostolic prayer session where Apostle Joshua Selman leads believers through 10 scriptural declarations—teaching directly that "our assignment is to pray like believers with spiritual intelligence" and that "prophetic words don’t only reveal; they create—they call things that be not and make them appear." Covers supernatural lifting, breaking the Iron Gate of visibility, Elijah speed, covenant immunity with creation, peace by all means, strangers feeding your flocks (Mephibosheth), priestly intercession for the nation, Jabez expansion, guarding joy against offense, and the transferable mantle of honor.',
    overview_fr:
      'Une session apostolique percutante de 29 minutes au cours de laquelle l’Apôtre Joshua Selman conduit les croyants dans 10 déclarations bibliques — enseignant que « notre mission est de prier comme des croyants dotés d’intelligence spirituelle » et que « les paroles prophétiques ne font pas que révéler : elles créent et appellent à l’existence ce qui n’est pas ». Couvre l’élévation surnaturelle, le brisement de la Porte de Fer de la visibilité, la vitesse d’Élie, l’alliance avec les pierres des champs, la paix de toute manière, les étrangers au service de votre destinée (Mephiboscheth), l’intercession sacerdotale pour la nation, l’élargissement de Jaebets, la sauvegarde de la joie contre l’offense et le manteau d’honneur.',
    docxFile: 'downloads/Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx',
    keyScriptures: [
      'Psalm 3:1-3',
      'Acts 12:4-10',
      'Isaiah 45:2',
      'Matthew 25:1-5',
      '1 Kings 18:46',
      'Psalm 125:3',
      'Job 5:19-23',
      '2 Thessalonians 3:16',
      'Isaiah 61:1-5',
      '2 Samuel 9:1-11',
      'Psalm 122:6',
      'Esther 4:13-16',
      'Romans 4:17',
      '1 Chronicles 4:9-10',
      'Zechariah 12:10',
      'Isaiah 12:3',
      'Psalm 1:3',
      'Numbers 27:18-20',
    ],
    chapters: [
      {
        id: 'v3-ch1',
        number: 'I',
        timestamp: '00:00 – 03:30',
        title_en: 'Declarations 1 & 2: The Lifter of My Head & Breaking the Iron Gate of Visibility',
        title_fr: 'Déclarations 1 & 2 : Celui qui Relève ma Tête & Briser la Porte de Fer de la Visibilité',
        scriptures: ['Psalm 3:1-3', 'Acts 12:4-10', 'Isaiah 45:2'],
        en_text:
          'Declaration 1 — Psalm 3:1-3: "But thou, O Lord, art a shield for me; my glory, and the lifter up of mine head." Nothing keeps your head down in this season! Declaration 2 — Acts 12:4-10: When the angel brought Peter out of Herod’s prison, they passed the first ward and the second ward, and came unto the Iron Gate that leadeth unto the city, which opened to them of its own accord. The Iron Gate is the gate that stops visibility and controls influence. Your business or gift can be genuine, yet hidden behind an iron gate. When that gate breaks, the next thing you see is the city!',
        fr_text:
          'Déclaration 1 — Psaume 3:2-4 : « Mais toi, ô Éternel ! tu es mon bouclier, tu es ma gloire, et tu relèves ma tête. » Rien ne maintiendra votre tête baissée en cette saison ! Déclaration 2 — Actes 12:4-10 : Lorsque l’ange fit sortir Pierre de la prison d’Hérode, ils passèrent la première et la seconde garde et arrivèrent à la Porte de Fer qui mène à la ville, laquelle s’ouvrit d’elle-même. La Porte de Fer est celle qui bloque la visibilité et contrôle l’influence. Lorsque cette porte se brise, la chose suivante que vous voyez est la ville !',
        declaration_en:
          'In the name of Jesus, nothing keeps my head down in this season—I am lifted supernaturally! Every Iron Gate standing in my way of visibility and influence, be broken right now! He has broken the gates of brass and cut the bars of iron in sunder!',
        declaration_fr:
          'Au nom de Jésus, rien ne maintient ma tête baissée en cette saison — je suis élevé surnaturellement ! Toute Porte de Fer qui se dresse sur mon chemin de visibilité et d’influence, sois brisée maintenant ! Il a brisé les portes d’airain et mis en pièces les verrous de fer !',
      },
      {
        id: 'v3-ch2',
        number: 'II',
        timestamp: '03:31 – 09:40',
        title_en: 'Declarations 3, 4 & 5: Supernatural Speed, Breaking the Wicked Rod & Covenant with Creation',
        title_fr: 'Déclarations 3, 4 & 5 : Vitesse Surnaturelle, Sceptre Brisé & Alliance avec la Création',
        scriptures: ['Matthew 25:1-5', '1 Kings 18:46', 'Psalm 125:3', 'Job 5:19-23'],
        en_text:
          'Declaration 3 — Against Delay (Matthew 25:5 & 1 Kings 18:46): It was the delay of the bridegroom that made the oil of the foolish virgins finish. The unit of destiny is time, and the hand of the Lord came upon Elijah so that he ran barefoot and overtook the chariots of Ahab down to Jezreel. Declaration 4 — Psalm 125:3: "For the rod of the wicked shall not rest upon the lot of the righteous." Command every finger of darkness over your family to give way. Declaration 5 — Job 5:19-23: "He shall deliver thee in six troubles: yea, in seven there shall no evil touch thee... For thou shalt be in league [covenant] with the stones of the field." Because you have dominion over creation, no one can use sand, water, or earth to make enchantments against your destiny!',
        fr_text:
          'Déclaration 3 — Contre le Retard (Matthieu 25:5 & 1 Rois 18:46) : C’est le retard de l’époux qui épuisa l’huile des vierges. L’unité de la destinée est le temps, et la main de l’Éternel fut sur Élie de sorte qu’il devança les chars d’Achab jusqu’à Jizreel. Déclaration 4 — Psaume 125:3 : « Le sceptre de la méchanceté ne restera pas sur le lot des justes. » Déclaration 5 — Job 5:19-23 : « Six fois il te délivrera de l’angoisse, et sept fois le mal ne t’atteindra pas... Car tu feras alliance avec les pierres des champs. » Parce que vous avez reçu la domination sur la création, nul ne peut utiliser le sable, l’eau ou la terre pour faire des enchantements contre votre destinée !',
        declaration_en:
          'Lord, bring supernatural speed to my life and destiny like Elijah! The rod of the wicked shall not rest upon my lot! By the power of the Holy Spirit, I am in covenant with the stones of the field—no enchantment or divination against my life shall thrive!',
        declaration_fr:
          'Seigneur, accorde une vitesse surnaturelle à ma vie et à ma destinée comme à Élie ! Le sceptre de la méchanceté ne reposera pas sur mon lot ! Par la puissance du Saint-Esprit, je suis en alliance avec les pierres des champs — aucun enchantement ni aucune divination contre ma vie ne prospérera !',
      },
      {
        id: 'v3-ch3',
        number: 'III',
        timestamp: '09:41 – 18:50',
        title_en: 'Declarations 6, 7 & 8: Peace By All Means, Strangers Feeding Your Flocks & Priestly Intercession',
        title_fr: 'Déclarations 6, 7 & 8 : Paix de Toute Manière, Étrangers à Votre Service & Intercession Sacerdotale',
        scriptures: ['2 Thessalonians 3:16', 'Isaiah 61:1-5', '2 Samuel 9:1-11', 'Psalm 122:6', 'Esther 4:13-16'],
        en_text:
          'Declaration 6 — 2 Thessalonians 3:16: "Now the Lord of peace himself give you peace always by all means"—even if it means clearing troublemakers out of the way! Declaration 7 — Isaiah 61:1-5 & 2 Samuel 9: "And strangers shall stand and feed your flocks, and the sons of the alien shall be your plowmen." Just as King David summoned Mephibosheth out of Lo-debar and assigned Ziba’s fifteen sons to plow his land while Mephibosheth ate continually at the king’s table, stop limiting God to the uncle or person you know—let God direct strangers to bless you! Declaration 8 — Priestly Intercession with Spiritual Intelligence (Psalm 122:6 & Esther 4:13-16): Our assignment is to pray like believers with spiritual intelligence, laying aside selfishness to stand as priests who midwife deliverance and peace over our nation.',
        fr_text:
          'Déclaration 6 — 2 Thessaloniciens 3:16 : « Que le Seigneur de la paix vous donne lui-même la paix, en tout temps, de toute manière ! » Déclaration 7 — Ésaïe 61:1-5 & 2 Samuel 9 : « Des étrangers se tiendront là et feront paître vos troupeaux ; des fils de l’étranger seront vos laboureurs. » Tout comme David fit sortir Mephiboscheth de Lodebar et ordonna aux quinze fils de Tsiba de cultiver ses terres pendant que Mephiboscheth mangeait à la table du roi, ne limitez plus Dieu aux personnes que vous connaissez ! Déclaration 8 — Intercession Sacerdotale avec Intelligence Spirituelle (Psaume 122:6 & Esther 4:13-16) : Notre mission est de prier comme des croyants dotés d’intelligence spirituelle, nous tenant comme des sacrificateurs qui enfantent la paix et la délivrance pour notre nation.',
        declaration_en:
          'Lord of peace, give me peace always and by all means! In this season, strangers shall stand and feed my flocks, and helpers of destiny are rising for me from everywhere! As a royal priest praying with spiritual intelligence, I decree angelic protection, safety, and peace over our nation!',
        declaration_fr:
          'Seigneur de la paix, donne-moi la paix en tout temps et de toute manière ! En cette saison, des étrangers se lèvent pour paître mes troupeaux, et des aides de destinée surgissent de toutes parts ! En tant que sacrificateur priant avec intelligence spirituelle, je décrète la protection angélique, la sécurité et la paix sur notre nation !',
      },
      {
        id: 'v3-ch4',
        number: 'IV',
        timestamp: '18:51 – 29:12',
        title_en: 'Declarations 9 & 10: Prophetic Creation, Jabez Expansion, Unspeakable Joy & The Mantle of Honor',
        title_fr: 'Déclarations 9 & 10 : Création Prophétique, Élargissement de Jaebets, Joie Ineffable & Manteau d’Honneur',
        scriptures: ['Romans 4:17', '1 Chronicles 4:9-10', 'Zechariah 12:10', 'Isaiah 12:3', 'Psalm 1:3', 'Numbers 27:18-20'],
        en_text:
          'Prophetic words don’t only reveal—they create! They call things that be not and make them appear. Declaration 9 — Open Doors, Breaking Family Patterns, Jabez Expansion & System-Shifting Favor (1 Chronicles 4:9-10): Every door that refused to open, open now! Every negative family pattern is broken by the rod of a higher priesthood! Like Jabez, expand to the east, north, south, west, and overseas, and return with a fearful testimony of favor! Declaration 10 — Spiritual Hunger, Guarding Joy Against Offense, Business Wonders & The Mantle of Honor (Zechariah 12:10, Isaiah 12:3, Psalm 1:3, Numbers 27:18-20): Receive a fresh spirit of prayer and supplication. Refuse the trap of offense when new seasons open, for with joy you draw water from the wells of salvation. Watch wonders happen in your business. Finally, honor is a transferable grace (as Moses put his honor upon Joshua) and the cure for shame and reproach.',
        fr_text:
          'Les paroles prophétiques ne font pas que révéler — elles créent ! Elles appellent les choses qui ne sont point comme si elles étaient. Déclaration 9 — Portes Ouvertes, Rupture des Cycles Familiaux, Élargissement de Jaebets & Faveur (1 Chroniques 4:9-10) : Toute porte fermée s’ouvre maintenant ! Tout schéma familial négatif est brisé par la verge d’un sacerdoce supérieur ! Comme Jaebets, étendez-vous à l’est, au nord, au sud, à l’ouest et au-delà des mers ! Déclaration 10 — Faim Spirituelle, Joie contre l’Offense, Prodiges dans les Affaires & Manteau d’Honneur (Zacharie 12:10, Ésaïe 12:3, Psaume 1:3, Nombres 27:18-20) : Recevez un esprit nouveau de prière et de supplication. Refusez le piège de l’offense, car c’est avec joie que vous puiserez aux sources du salut. Voyez des prodiges dans vos affaires, et recevez le manteau d’honneur qui guérit de la honte et vous distingue parmi vos contemporains !',
        declaration_en:
          'By the power that raised Christ from the dead, every closed door over my destiny opens now! I expand to the north, south, east, west, and overseas! I receive a fresh spirit of prayer, I guard my unspeakable joy against every trap of offense, whatsoever I do prospers, and the transferable Mantle of Honor rests upon my life now!',
        declaration_fr:
          'Par la puissance qui a ressuscité Christ d’entre les morts, toute porte fermée sur ma destinée s’ouvre maintenant ! Je m’étends au nord, au sud, à l’est, à l’ouest et au-delà des mers ! Je reçois un esprit nouveau de prière, je garde ma joie ineffable contre tout piège d’offense, tout ce que je fais prospère, et le Manteau d’Honneur repose sur ma vie maintenant !',
      },
    ],
  },
];

export const PRAYER_ALTAR_CARDS: PrayerCardItem[] = [
  {
    id: 'p-morning-1',
    videoRefId: '4YElIs15_Ak',
    category: 'morning',
    categoryLabel_en: 'Command the Morning',
    categoryLabel_fr: 'Commander le Matin',
    watchHour: '05:00 AM',
    title_en: 'Seizing the Four Corners of the Dawn',
    title_fr: 'Saisir les Quatre Coins de l’Aube',
    scriptureRef: 'Job 38:12-13 • Psalm 5:3',
    scriptureQuote_en: 'Have you commanded the morning since your days, and caused the dayspring to know his place, that it might take hold of the ends of the earth, that the wicked might be shaken out of it?',
    scriptureQuote_fr: 'Depuis que tu existes, as-tu commandé au matin ? As-tu montré sa place à l’aurore, pour qu’elle saisisse les extrémités de la terre, et que les méchants en soient secoués ?',
    prayerText_en:
      'Father, in the name of Jesus, I come early before the noise and take hold of the ends of this morning. Every wicked arrangement, bad news, accident, or disappointment programmed into this day—I shake you out by fire! Morning of this day, you will not cooperate with my enemies; you will carry only God’s favor and divine appointments for me.',
    prayerText_fr:
      'Père, au nom de Jésus, je viens tôt avant le bruit et je saisis les extrémités de ce matin. Tout arrangement maléfique, mauvaise nouvelle, accident ou déception programmé dans cette journée — je te secoue par le feu ! Matin de ce jour, tu ne coopéreras pas avec mes ennemis ; tu ne porteras que la faveur de Dieu et Ses rendez-vous divins pour moi.',
    decree_en: 'This morning belongs to God and this morning belongs to me!',
    decree_fr: 'Ce matin appartient à Dieu et ce matin m’appartient !',
  },
  {
    id: 'p-devotional-1',
    videoRefId: 'XWBUBtEv70A',
    category: 'devotional',
    categoryLabel_en: 'Morning Surrender',
    categoryLabel_fr: 'Abandon Matinal',
    watchHour: '06:00 AM',
    title_en: 'Stewardship of Breath & Total Trust in the Lord',
    title_fr: 'Intendance du Souffle & Confiance Totale en l’Éternel',
    scriptureRef: 'Proverbs 3:5-6 • Psalm 121:3-4',
    scriptureQuote_en: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    scriptureQuote_fr: 'Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.',
    prayerText_en:
      'Lord, you brought me through the night, keeping me when I could not keep myself. I rise today not as one who owns the day, but as a steward of the hours you have given me. Wash my heart clean from every shadow of pride or doubt. I place my plans, my meetings, my work, and my conversations entirely in your hands. Lead me by your Spirit of power, love, and a sound mind.',
    prayerText_fr:
      'Seigneur, Tu m’as fait traverser la nuit, me gardant lorsque je ne pouvais pas me garder moi-même. Je me lève aujourd’hui comme un intendant fidèle des heures que Tu m’as données. Purifie mon cœur de toute ombre d’orgueil ou de doute. Je remets mes projets, mes rencontres, mon travail et mes conversations entièrement entre Tes mains. Conduis-moi par Ton Esprit de force, d’amour et de sagesse.',
    decree_en: 'I walk not by sight but by faith; the wisdom of God directs every step I take today.',
    decree_fr: 'Je marche non par la vue mais par la foi ; la sagesse de Dieu dirige chacun de mes pas aujourd’hui.',
  },
  {
    id: 'p-declarations-1',
    videoRefId: '45wUm7wffBQ',
    category: 'declarations',
    categoryLabel_en: '6:45 AM Declarations',
    categoryLabel_fr: 'Déclarations de 6h45',
    watchHour: '06:45 AM',
    title_en: 'Shattering the Iron Gate of Visibility & Influence',
    title_fr: 'Briser la Porte de Fer de la Visibilité & de l’Influence',
    scriptureRef: 'Acts 12:7-10 • Psalm 3:3',
    scriptureQuote_en: 'They came unto the iron gate that leadeth unto the city; which opened to them of his own accord: and they went out, and passed on through one street.',
    scriptureQuote_fr: 'Ils arrivèrent à la porte de fer qui mène à la ville, et qui s’ouvrit d’elle-même devant eux ; ils sortirent, et s’avancèrent dans une rue.',
    prayerText_en:
      'O Lord, thou art my shield, my glory, and the lifter up of my head! By the apostolic authority of Christ, I speak to every Iron Gate standing between my gift, my business, my ministry, and the city of influence: open of your own accord right now! He has broken the gates of brass and cut the bars of iron in sunder!',
    prayerText_fr:
      'Ô Éternel, Tu es mon bouclier, ma gloire, et Tu relèves ma tête ! Par l’autorité apostolique de Christ, je parle à toute Porte de Fer dressée entre mon don, mon entreprise, mon ministère et la ville de l’influence : ouvre-toi d’elle-même maintenant ! Il a brisé les portes d’airain et mis en pièces les verrous de fer !',
    decree_en: 'Nothing keeps my head down in this season—the Iron Gate is broken and I step into visibility!',
    decree_fr: 'Rien ne maintient ma tête baissée en cette saison — la Porte de Fer est brisée et j’entre dans la visibilité !',
  },
  {
    id: 'p-declarations-2',
    videoRefId: '45wUm7wffBQ',
    category: 'declarations',
    categoryLabel_en: '6:45 AM Declarations',
    categoryLabel_fr: 'Déclarations de 6h45',
    watchHour: '06:45 AM',
    title_en: 'Covenant with the Stones of the Field & Elijah Speed',
    title_fr: 'Alliance avec les Pierres des Champs & Vitesse d’Élie',
    scriptureRef: 'Job 5:19-23 • 1 Kings 18:46',
    scriptureQuote_en: 'For thou shalt be in league with the stones of the field: and the beasts of the field shall be at peace with thee.',
    scriptureQuote_fr: 'Car tu feras alliance avec les pierres des champs, et les bêtes de la terre seront en paix avec toi.',
    prayerText_en:
      'In the name of Jesus, the unit of destiny is time: Lord, let your hand come upon me as upon Elijah to outrun every delay and overtake the chariots of Ahab! Because I have dominion over creation and am in covenant with the stones of the field, no one can use sand, water, wind, or earth to make enchantments or divinations against my destiny.',
    prayerText_fr:
      'Au nom de Jésus, l’unité de la destinée est le temps : Seigneur, que Ta main repose sur moi comme sur Élie pour devancer tout retard ! Parce que j’ai reçu la domination sur la création et que je suis en alliance avec les pierres des champs, nul ne peut utiliser le sable, l’eau, le vent ou la terre pour faire des enchantements contre ma destinée.',
    decree_en: 'Divine speed is my portion, and every element of creation is at covenant peace with me!',
    decree_fr: 'La vitesse divine est mon partage, et chaque élément de la création est en paix d’alliance avec moi !',
  },
  {
    id: 'p-finances-1',
    videoRefId: '45wUm7wffBQ',
    category: 'finances',
    categoryLabel_en: 'Finances & Destiny Helpers',
    categoryLabel_fr: 'Finances & Aides de Destinée',
    watchHour: '07:00 AM',
    title_en: 'Strangers Feeding Your Flocks & Jabez Expansion',
    title_fr: 'Des Étrangers Paissant Vos Troupeaux & Élargissement de Jaebets',
    scriptureRef: 'Isaiah 61:5 • 1 Chronicles 4:10 • Deuteronomy 28:12',
    scriptureQuote_en: 'And strangers shall stand and feed your flocks, and the sons of the alien shall be your plowmen and your vinedressers.',
    scriptureQuote_fr: 'Des étrangers se tiendront là et feront paître vos troupeaux ; des fils de l’étranger seront vos laboureurs et vos vignerons.',
    prayerText_en:
      'Father, as David fetched Mephibosheth out of Lo-debar to eat continually at the King’s table, I take my mind off limited human channels and decree that strangers and sons of foreigners shall stand to build my vision! Rebuke every devourer of my finances, seal every leaking bag by fire, and expand my coast to the north, south, east, west, and overseas!',
    prayerText_fr:
      'Père, tout comme David fit venir Mephiboscheth de Lodebar pour manger continuellement à la table du Roi, je détourne mon regard des appuis humains limités et je décrète que des étrangers se lèvent pour bâtir ma vision ! Réprimande tout dévoreur de mes finances, scelle tout sac percé par le feu et étends mes limites au nord, au sud, à l’est, à l’ouest et au-delà des mers !',
    decree_en: 'System-shifting favor locates me this week! Whatsoever I lay my hands upon prospers, and the Mantle of Honor distinguishes me!',
    decree_fr: 'Une faveur qui déplace les systèmes me localise cette semaine ! Tout ce que je touche prospère, et le Manteau d’Honneur me distingue !',
  },
  {
    id: 'p-family-1',
    videoRefId: '4YElIs15_Ak',
    category: 'family',
    categoryLabel_en: 'Family & Marriage',
    categoryLabel_fr: 'Famille & Mariage',
    watchHour: '08:00 AM',
    title_en: 'Priestly Intercession for Household, Spouse & Children',
    title_fr: 'Intercession Sacerdotale pour le Foyer, le Conjoint & les Enfants',
    scriptureRef: 'Isaiah 49:25 • Psalm 113:9 • Galatians 6:17',
    scriptureQuote_en: 'For I will contend with him that contendeth with thee, and I will save thy children.',
    scriptureQuote_fr: 'Je combattrai tes ennemis, et je sauverai tes fils.',
    prayerText_en:
      'Lord, I stand as a priest over my household. Every power holding any member of my family captive, release them now! Save my children in their schools, workplaces, and nations—they are taught of the Lord and are for signs and wonders. Every veil of marital delay is torn, every third-party manipulation is broken, and every home is restored into a sanctuary of warmth, fruitfulness, and peace.',
    prayerText_fr:
      'Seigneur, je me tiens comme sacrificateur sur ma maison. Toute puissance retenant un membre de ma famille captif, relâche-le maintenant ! Sauve mes enfants dans leurs écoles, leurs lieux de travail et les nations — ils sont enseignés de l’Éternel et sont des signes et des prodiges. Tout voile de retard conjugal est déchiré, toute manipulation est brisée et mon foyer est restauré dans la paix et la fécondité.',
    decree_en: 'As for me and my house, we will serve the Lord! We bear in our bodies the marks of the Lord Jesus!',
    decree_fr: 'Moi et ma maison, nous servirons l’Éternel ! Nous portons sur nos corps les marques du Seigneur Jésus !',
  },
  {
    id: 'p-healing-1',
    videoRefId: '4YElIs15_Ak',
    category: 'healing',
    categoryLabel_en: 'Divine Healing & Vitality',
    categoryLabel_fr: 'Guérison Divine & Vitalité',
    watchHour: '12:00 PM',
    title_en: 'Uprooting Infirmity & Mounting Up with Wings as Eagles',
    title_fr: 'Déraciner l’Infirmité & Prendre le Vol comme les Aigles',
    scriptureRef: 'Jeremiah 30:17 • Isaiah 53:5 • Isaiah 40:31',
    scriptureQuote_en: 'For I will restore health unto thee, and I will heal thee of thy wounds, saith the Lord.',
    scriptureQuote_fr: 'Mais je te guérirai, je panserai tes plaies, dit l’Éternel.',
    prayerText_en:
      'Healer of heaven, I lay my hand upon my body in faith. Every sickness, abnormal growth, fibroid, tumor, high blood pressure, diabetes, migraine, and hereditary affliction that God did not plant—be uprooted and dissolved by the blood of Jesus! Kidneys, liver, heart, lungs, bones, eyes, and blood: align with the Word of God! Weariness and heaviness depart; I receive eagle strength!',
    prayerText_fr:
      'Médecin céleste, je pose ma main sur mon corps avec foi. Toute maladie, excroissance anormale, fibrome, tumeur, hypertension, diabète, migraine et affliction héréditaire que Dieu n’a pas plantée — sois déracinée et dissoute par le sang de Jésus ! Reins, foie, cœur, poumons, os, yeux et sang : alignez-vous sur la Parole de Dieu ! Je reçois la force de l’aigle !',
    decree_en: 'By His stripes I am healed! I shall not die, but live and declare the works of the Lord!',
    decree_fr: 'Par Ses meurtrissures je suis guéri ! Je ne mourrai pas, je vivrai et je raconterai les œuvres de l’Éternel !',
  },
  {
    id: 'p-protection-1',
    videoRefId: '4YElIs15_Ak',
    category: 'protection',
    categoryLabel_en: 'Wall of Fire & Abiding',
    categoryLabel_fr: 'Muraille de Feu & Demeure',
    watchHour: '09:00 PM',
    title_en: 'Encamped by Chariots of Fire & Abiding in the Vine',
    title_fr: 'Entouré de Chars de Feu & Demeurant dans le Cep',
    scriptureRef: 'Zechariah 2:5 • 2 Kings 6:17 • John 15:5',
    scriptureQuote_en: 'For I, saith the Lord, will be unto her a wall of fire round about, and will be the glory in the midst of her.',
    scriptureQuote_fr: 'Je serai pour elle, dit l’Éternel, une muraille de feu tout autour, et je serai sa gloire au milieu d’elle.',
    prayerText_en:
      'Lord, be a wall of fire around my going out, my coming in, my home, and my rest tonight. Open my spiritual eyes like Elisha’s servant to see the mountain full of horses and chariots of fire round about me. Keep me abiding in Jesus the True Vine, guarded against every trap of offense, and filled with joy unspeakable and full of glory.',
    prayerText_fr:
      'Seigneur, sois une muraille de feu autour de mon départ, de mon arrivée, de ma maison et de mon repos cette nuit. Ouvre mes yeux spirituels comme ceux du serviteur d’Élisée pour voir la montagne pleine de chevaux et de chars de feu autour de moi. Garde-moi attaché à Jésus, le Cep véritable, préservé de tout piège d’offense et rempli d’une joie ineffable.',
    decree_en: 'A thousand may fall at my side and ten thousand at my right hand, but it shall not come near my dwelling!',
    decree_fr: 'Que mille tombent à mon côté et dix mille à ma droite, je ne serai pas atteint !',
  },
  {
    id: 'p-warfare-1',
    videoRefId: '4YElIs15_Ak',
    category: 'warfare',
    categoryLabel_en: 'Midnight Warfare',
    categoryLabel_fr: 'Combat de Minuit',
    watchHour: '12:00 AM',
    title_en: 'Back to Sender, Escaping the Fowler’s Snare & Total Recovery',
    title_fr: 'Retour à l’Envoyeur, Échapper au Filet de l’Oiseleur & Récupération Totale',
    scriptureRef: 'Esther 7:10 • Psalm 124:7 • Obadiah 1:17',
    scriptureQuote_en: 'Our soul is escaped as a bird out of the snare of the fowlers: the snare is broken, and we are escaped.',
    scriptureQuote_fr: 'Notre âme s’est échappée comme l’oiseau du filet des oiseleurs ; le filet s’est rompu, et nous nous sommes échappés.',
    prayerText_en:
      'Father, in the midnight watch I stand in the authority of the blood of Jesus! Every gallows prepared by Haman for my destiny, carry your builder! Every pit dug for my feet, swallow your digger! Every evil package of sorrow, shame, or sickness addressed to my name—I refuse to sign for it; return unopened to your sender! I bind the strong man, spoil his house, recover my wasted years, and possess all my possessions!',
    prayerText_fr:
      'Père, dans la veille de minuit je me tiens dans l’autorité du sang de Jésus ! Que toute potence préparée par Haman contre ma destinée porte son constructeur ! Que toute fosse creusée pour mes pieds engloutisse son fossoyeur ! Tout colis maléfique de chagrin, de honte ou de maladie adressé à mon nom — je refuse de le réceptionner ; retourne non ouvert à ton expéditeur ! Je lie l’homme fort, je pille sa maison, je récupère mes années perdues et je possède toutes mes possessions !',
    decree_en: 'The snare is broken and I have escaped! What was sent to bury me shall build and announce me!',
    decree_fr: 'Le filet est rompu et je me suis échappé ! Ce qui a été envoyé pour m’enterrer me bâtira et m’annoncera !',
  },
];

export const DEVOTIONAL_GUIDES: DevotionalGuide[] = [
  {
    id: 'dev-1',
    dayLabel_en: 'Devotional Path I • The Dawn Watch',
    dayLabel_fr: 'Parcours Dévotionnel I • La Veille de l’Aube',
    videoRefId: '4YElIs15_Ak',
    title_en: 'Spiritual Intelligence at the Gate of the Morning',
    title_fr: 'L’Intelligence Spirituelle à la Porte du Matin',
    subtitle_en: 'Why the womb of the morning responds to prophetic instruction before the noise of the world begins.',
    subtitle_fr: 'Pourquoi le sein de l’aurore répond à l’instruction prophétique avant que le tumulte du monde ne commence.',
    anchorScripture: 'Job 38:12-13 & Psalm 5:3',
    anchorVerse_en: 'My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up.',
    anchorVerse_fr: 'Éternel ! le matin tu entends ma voix ; le matin je me tourne vers toi, et je regarde.',
    meditation_en: [
      'In Scripture, the morning is not merely a chronological transition of light—it is a spiritual gate. When God questioned Job out of the whirlwind ("Have you commanded the morning since your days?"), He unveiled a profound kingdom principle: each new day arrives like an unscripted canvas waiting for authoritative instruction.',
      'Spiritual intelligence means refusing to enter the day passively. Before reaching for your phone, before absorbing the anxiety of headlines or messages, the believer stands at the threshold of dawn as a royal priest. In Psalm 5:3, the Hebrew verb for "direct my prayer" (arak) means to arrange in order—like setting wood and sacrifice upon an altar or aiming an arrow toward its mark.',
      'When you command the morning through the blood of Jesus, you shake the corners of the day so that hidden traps lose their footing, and you invite the God of the Morning Watch (Exodus 14:24) to look through the pillar of fire upon every obstacle ahead of you.',
    ],
    meditation_fr: [
      'Dans les Écritures, le matin n’est pas simplement une transition astronomique de lumière — c’est une porte spirituelle. Lorsque Dieu interrogea Job du sein de la tempête (« Depuis que tu existes, as-tu commandé au matin ? »), Il révéla une loi fondamentale du Royaume : chaque jour nouveau se présente comme une terre qui attend un ordre spirituel.',
      'L’intelligence spirituelle consiste à refuser d’entrer passivement dans sa journée. Avant même de consulter son téléphone ou d’absorber le bruit du monde, le croyant se tient au seuil de l’aube comme un sacrificateur royal. Dans le Psaume 5:4, disposer sa prière devant Dieu signifie l’ordonner avec précision, comme une flèche dirigée vers sa cible.',
      'Lorsque vous commandez au matin par le sang de Jésus, vous secouez les extrémités du jour afin que les pièges cachés tombent, et vous invitez le Dieu de la veille du matin (Exode 14:24) à regarder vos adversaires à travers la colonne de feu.',
    ],
    reflectionPrompts_en: [
      'What is the very first voice or habit that usually claims my attention in the first ten minutes after waking?',
      'Which specific hours, meetings, or crossroads today need to be intentionally aimed and covered like an arrow in prayer?',
      'Where have I tolerated a "yoke of almost there" instead of demanding its total destruction by the anointing (Isaiah 10:27)?',
    ],
    reflectionPrompts_fr: [
      'Quelle est la toute première voix ou habitude qui capte habituellement mon attention durant les dix premières minutes après mon réveil ?',
      'Quelles heures, rencontres ou décisions précises d’aujourd’hui doivent être visées et couvertes intentionnellement dans la prière ?',
      'Où ai-je toléré un « joug du presque arrivé » au lieu d’exiger sa destruction totale par l’onction (Ésaïe 10:27) ?',
    ],
    closingPrayer_en:
      'Father of the Morning Watch, I consecrate the firstfruits of my voice and my mind to You today. I take hold of the corners of this day in the name of Jesus: let Your light go before me, let every yoke be destroyed by the anointing, and let Your mercies rewrite my story today. Amen.',
    closingPrayer_fr:
      'Père de la Veille du Matin, je Te consacre les prémices de ma voix et de mes pensées aujourd’hui. Je saisis les quatre coins de cette journée au nom de Jésus : que Ta lumière me précède, que tout joug soit détruit par l’onction et que Tes compassions nouvelles réécrivent mon histoire aujourd’hui. Amen.',
  },
  {
    id: 'dev-2',
    dayLabel_en: 'Devotional Path II • Contemplative Abiding',
    dayLabel_fr: 'Parcours Dévotionnel II • Demeurer dans le Cep',
    videoRefId: 'XWBUBtEv70A',
    title_en: 'The Steward’s Breath & The Secret of the Vine',
    title_fr: 'Le Souffle de l’Intendant & Le Secret du Cep',
    subtitle_en: 'Moving from hurried anxiety to quiet communion, generosity, and fruitfulness in Christ.',
    subtitle_fr: 'Passer de la précipitation inquiète à la communion paisible, à la générosité et à la fécondité en Christ.',
    anchorScripture: 'John 15:5 & Proverbs 3:5-6',
    anchorVerse_en: 'I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.',
    anchorVerse_fr: 'Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire.',
    meditation_en: [
      'True spiritual authority is inseparable from deep surrender. The Grace Enclave morning prayer reminds us of a humbling truth: we wake up not as owners of the day, but as stewards of hours gifted to us by a loving Shepherd who watched over us while we slept.',
      'Often, the greatest threat to our spiritual life is not an external attack, but the temptation to rush through the day—allowing small inconveniences to steal our joy, or relying on human cleverness instead of the gentle whispers of the Holy Spirit.',
      'To abide in the Vine (John 15:5) means cultivating a lingering spirit of prayer that does not end when we say "Amen" in the morning, but continues as a quiet conversation with God in every room we enter, seasoning our words with grace and turning our responsibilities into sanctuaries of service.',
    ],
    meditation_fr: [
      'La véritable autorité spirituelle est indissociable d’un abandon profond. La prière matinale de Grace Enclave nous rappelle une vérité essentielle : nous ne nous réveillons pas en propriétaires de la journée, mais en intendants des heures confiées par le Bon Berger qui a veillé sur nous pendant notre sommeil.',
      'Bien souvent, la plus grande menace pour notre paix intérieure est la tentation de traverser la journée à la hâte, en laissant de petites contrariétés voler notre joie ou en nous appuyant sur notre propre habileté plutôt que sur la sagesse paisible du Saint-Esprit.',
      'Demeurer dans le Cep (Jean 15:5), c’est cultiver un esprit de prière qui ne s’arrête pas après l’« Amen » du matin, mais qui se prolonge en une communion silencieuse avec Dieu dans chaque pièce où nous entrons, assaisonnant nos paroles de grâce.',
    ],
    reflectionPrompts_en: [
      'Which simple daily blessings (breath, health, shelter, water, speech) can I pause to thank God for right now, and how can my gratitude overflow into generosity toward someone else today?',
      'Is there any careless word, prideful motive, or unforgiveness I need to ask the Lord to wash clean before I step into my work?',
      'Who around me today is carrying grief, illness, or loneliness and needs me to carry God’s peace into the room?',
    ],
    reflectionPrompts_fr: [
      'Pour quelles bénédictions simples (le souffle, la santé, le toit, l’eau, la parole) puis-je remercier Dieu dès maintenant, et comment ma gratitude peut-elle déborder en générosité envers quelqu’un aujourd’hui ?',
      'Y a-t-il une parole imprudente, un motif d’orgueil ou un manque de pardon dont je dois demander la purification avant d’entamer mon travail ?',
      'Qui autour de moi porte aujourd’hui un deuil, une maladie ou une solitude et a besoin que j’apporte la paix de Christ ?',
    ],
    closingPrayer_en:
      'Lord Jesus, True Vine of my soul, keep me abiding in You throughout every hour of this day. When I grow weary, be my strength; when uncertain, be my anchor. Use my mind, my heart, my hands, and my voice to bring life and comfort, so that tonight I may see Your fingerprints on every moment. Amen.',
    closingPrayer_fr:
      'Seigneur Jésus, Cep véritable de mon âme, garde-moi attaché à Toi à chaque heure de cette journée. Quand je me lasse, sois ma force ; quand je doute, sois mon ancre. Utilise mon esprit, mon cœur, mes mains et ma voix pour consoler et bénir, afin que ce soir je contemple Tes empreintes sur chaque instant. Amen.',
  },
  {
    id: 'dev-3',
    dayLabel_en: 'Devotional Path III • Apostolic Decrees',
    dayLabel_fr: 'Parcours Dévotionnel III • Décrets Apostoliques',
    videoRefId: '45wUm7wffBQ',
    title_en: 'Praying with Spiritual Intelligence: From Lo-debar to the King’s Table',
    title_fr: 'Prier avec Intelligence Spirituelle : De Lodebar à la Table du Roi',
    subtitle_en: 'How prophetic decrees, priestly burden, guarded joy, and the Mantle of Honor shift seasons.',
    subtitle_fr: 'Comment les décrets prophétiques, le sacerdoce, la joie gardée et le Manteau d’Honneur changent les saisons.',
    anchorScripture: 'Isaiah 61:4-5, Esther 4:14 & Numbers 27:20',
    anchorVerse_en: 'And strangers shall stand and feed your flocks, and the sons of the alien shall be your plowmen and your vinedressers.',
    anchorVerse_fr: 'Des étrangers se tiendront là et feront paître vos troupeaux ; des fils de l’étranger seront vos laboureurs et vos vignerons.',
    meditation_en: [
      'In the 6:45 AM Morning Declarations, Apostle Joshua Selman highlights four pillars of Spiritual Intelligence in prayer. First, prophetic words do not merely describe reality—they create reality by calling things that be not as though they were (Romans 4:17).',
      'Second, God is the ultimate Movie Director of your breakthrough. Like Mephibosheth in Lo-debar (2 Samuel 9), when King David remembered his covenant with Jonathan, strangers (Ziba and his fifteen sons) were commanded to plow the land while Mephibosheth sat at the King’s table. Stop limiting God’s provision to the people you already know.',
      'Third, mature believers rise above spiritual selfishness. Like Esther, we are called to stand as watchmen and priests who midwife deliverance for our communities and nations. Finally, when a new season is about to open, the enemy deploys two traps: spiritual slumber and offense. Guard your prayer altar and guard your joy—for with joy you draw water out of the wells of salvation (Isaiah 12:3), receiving the transferable Mantle of Honor that cures all shame.',
    ],
    meditation_fr: [
      'Dans les 10 Déclarations Matinales de 6h45, l’Apôtre Joshua Selman met en lumière quatre piliers de l’Intelligence Spirituelle dans la prière. Premièrement, les paroles prophétiques ne se contentent pas de décrire la réalité : elles la créent en appelant les choses qui ne sont point comme si elles étaient (Romains 4:17).',
      'Deuxièmement, Dieu est le Souverain Metteur en scène de votre percée. Comme pour Mephiboscheth à Lodebar (2 Samuel 9), Dieu peut ordonner à des inconnus de labourer votre champ pendant qu’Il vous fait asseoir à la table du Roi. Ne limitez jamais Dieu aux relations que vous connaissez déjà.',
      'Troisièmement, la maturité spirituelle nous appelle à dépasser l’égoïsme pour porter le fardeau sacerdotal de notre nation, à l’image d’Esther. Enfin, à l’aube d’une nouvelle saison, l’ennemi tend deux pièges : l’assoupissement spirituel et l’offense. Gardez votre feu de prière et protégez jalousement votre joie (Ésaïe 12:3), en recevant le Manteau d’Honneur qui efface tout opprobre.',
    ],
    reflectionPrompts_en: [
      'Have I been limiting God by fixing my eyes on a specific person to help me, rather than trusting God to raise destiny helpers from anywhere?',
      'Is the enemy trying to use offense in my home, workplace, or relationships to abort a new season that is about to open?',
      'How can I pray with "Spiritual Intelligence" today not only for my personal needs, but as a priest interceding for my city and nation?',
    ],
    reflectionPrompts_fr: [
      'Ai-je limité Dieu en fixant mes regards sur une personne précise pour m’aider, au lieu de Lui faire confiance pour susciter des aides de destinée de toutes parts ?',
      'L’ennemi tente-t-il d’utiliser l’offense dans mon foyer ou mon travail pour faire avorter une nouvelle saison sur le point de s’ouvrir ?',
      'Comment puis-je prier avec « Intelligence Spirituelle » aujourd’hui, non seulement pour mes besoins personnels, mais en sacrificateur qui intercède pour sa ville et sa nation ?',
    ],
    closingPrayer_en:
      'Lord God of Increase, thank You for imparting to me a fresh spirit of prayer and supplication. I refuse every trap of slumber and offense; my joy remains full of glory! Let every Iron Gate of visibility open, let strangers and destiny helpers arise globally, and let the Mantle of Honor rest upon my life today in Jesus’ name. Amen.',
    closingPrayer_fr:
      'Seigneur Dieu d’Accroissement, merci de m’accorder un esprit nouveau de prière et de supplication. Je refuse tout piège d’assoupissement et d’offense ; ma joie demeure ineffable et glorieuse ! Que toute Porte de Fer s’ouvre, que des aides de destinée se lèvent et que le Manteau d’Honneur repose sur ma vie aujourd’hui au nom de Jésus. Amen.',
  },
];

export const SCRIPTURE_TREASURY: ScriptureEntry[] = [
  {
    id: 'scr-1',
    reference_en: 'Job 38:12-13',
    reference_fr: 'Job 38:12-13',
    theme_en: 'Commanding the Morning',
    theme_fr: 'Commander au Matin',
    kjv_en: 'Hast thou commanded the morning since thy days; and caused the dayspring to know his place; That it might take hold of the ends of the earth, that the wicked might be shaken out of it?',
    lsg_fr: 'Depuis que tu existes, as-tu commandé au matin ? As-tu montré sa place à l’aurore, pour qu’elle saisisse les extrémités de la terre, et que les méchants en soient secoués ?',
    application_en: 'Prophetic authority to instruct the new day at dawn and shake out every wicked plot before it manifests.',
    application_fr: 'Autorité prophétique pour donner des instructions au jour nouveau dès l’aube et secouer tout complot maléfique.',
    videoIds: ['4YElIs15_Ak'],
  },
  {
    id: 'scr-2',
    reference_en: 'Psalm 5:3',
    reference_fr: 'Psaume 5:4 (5:3)',
    theme_en: 'Directing the Morning Arrow',
    theme_fr: 'Diriger la Prière du Matin',
    kjv_en: 'My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up.',
    lsg_fr: 'Éternel ! le matin tu entends ma voix ; le matin je me tourne vers toi, et je regarde.',
    application_en: 'Aiming your prayer like a targeted arrow at the gate of the morning and looking up in expectant faith.',
    application_fr: 'Orienter sa prière comme une flèche précise dès le matin et lever les yeux dans une foi attentive.',
    videoIds: ['4YElIs15_Ak', 'XWBUBtEv70A'],
  },
  {
    id: 'scr-3',
    reference_en: 'Proverbs 3:5-6',
    reference_fr: 'Proverbes 3:5-6',
    theme_en: 'Total Trust & Straight Paths',
    theme_fr: 'Confiance Totale & Sentiers Aplanis',
    kjv_en: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    lsg_fr: 'Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.',
    application_en: 'Surrendering plans, meetings, and uncertainties into God’s hands so His wisdom makes our paths straight.',
    application_fr: 'Remettre ses projets, ses rencontres et ses incertitudes entre les mains de Dieu afin que Sa sagesse aplanisse nos sentiers.',
    videoIds: ['XWBUBtEv70A'],
  },
  {
    id: 'scr-4',
    reference_en: 'John 15:5',
    reference_fr: 'Jean 15:5',
    theme_en: 'Abiding in the True Vine',
    theme_fr: 'Demeurer dans le Cep Véritable',
    kjv_en: 'I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.',
    lsg_fr: 'Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire.',
    application_en: 'Maintaining unbroken communion with Christ throughout the day so His desires become our desires and bear lasting fruit.',
    application_fr: 'Maintenir une communion ininterrompue avec Christ tout au long du jour afin de porter un fruit durable.',
    videoIds: ['XWBUBtEv70A'],
  },
  {
    id: 'scr-5',
    reference_en: 'Psalm 3:1-3',
    reference_fr: 'Psaume 3:2-4 (3:1-3)',
    theme_en: 'The Lifter Up of My Head',
    theme_fr: 'Celui qui Relève ma Tête',
    kjv_en: 'Lord, how are they increased that trouble me! many are they that rise up against me... But thou, O Lord, art a shield for me; my glory, and the lifter up of mine head.',
    lsg_fr: 'Ô Éternel, que mes ennemis sont nombreux ! Quelle multitude se lève contre moi !... Mais toi, ô Éternel ! tu es mon bouclier, tu es ma gloire, et tu relèves ma tête.',
    application_en: 'Supernatural lifting and shield of glory when surrounded by opposition or discouragement.',
    application_fr: 'Élévation surnaturelle et bouclier de gloire face à l’opposition ou au découragement.',
    videoIds: ['45wUm7wffBQ'],
  },
  {
    id: 'scr-6',
    reference_en: 'Acts 12:7-10',
    reference_fr: 'Actes 12:7-10',
    theme_en: 'The Iron Gate of Visibility & Influence',
    theme_fr: 'La Porte de Fer de la Visibilité & de l’Influence',
    kjv_en: 'When they were past the first and the second ward, they came unto the iron gate that leadeth unto the city; which opened to them of his own accord.',
    lsg_fr: 'Lorsqu’ils eurent passé la première et la seconde garde, ils arrivèrent à la porte de fer qui mène à la ville, et qui s’ouvrit d’elle-même devant eux.',
    application_en: 'Breaking the invisible barrier that keeps genuine gifts, businesses, and destinies hidden from the city of influence.',
    application_fr: 'Briser la barrière de fer qui empêche les dons, les entreprises et les destinées d’accéder à la visibilité dans la ville.',
    videoIds: ['45wUm7wffBQ'],
  },
  {
    id: 'scr-7',
    reference_en: 'Isaiah 10:27',
    reference_fr: 'Ésaïe 10:27',
    theme_en: 'The Yoke Destroyed by the Anointing',
    theme_fr: 'Le Joug Détruit par l’Onction',
    kjv_en: 'And it shall come to pass in that day, that his burden shall be taken away from off thy shoulder, and his yoke from off thy neck, and the yoke shall be destroyed because of the anointing.',
    lsg_fr: 'En ce jour, son fardeau sera ôté de dessus ton épaule, et son joug de dessus ton cou ; et la graisse (l’onction) fera éclater le joug.',
    application_en: 'Total destruction—not mere adjustment—of generational yokes of stagnation, debt, and fruitless labor.',
    application_fr: 'Destruction totale — et non simple ajustement — des jougs héréditaires de stagnation, de dette et de labeur stérile.',
    videoIds: ['4YElIs15_Ak'],
  },
  {
    id: 'scr-8',
    reference_en: 'Job 5:19-23',
    reference_fr: 'Job 5:19-23',
    theme_en: 'Covenant with the Stones of the Field',
    theme_fr: 'Alliance avec les Pierres des Champs',
    kjv_en: 'He shall deliver thee in six troubles: yea, in seven there shall no evil touch thee... For thou shalt be in league with the stones of the field: and the beasts of the field shall be at peace with thee.',
    lsg_fr: 'Six fois il te délivrera de l’angoisse, et sept fois le mal ne t’atteindra pas... Car tu feras alliance avec les pierres des champs, et les bêtes de la terre seront en paix avec toi.',
    application_en: 'Dominion immunity ensuring that no element of creation (earth, sand, water, wind) can be used for enchantment against you.',
    application_fr: 'Immunité d’alliance garantissant qu’aucun élément de la création ne peut être utilisé en enchantement contre vous.',
    videoIds: ['45wUm7wffBQ'],
  },
  {
    id: 'scr-9',
    reference_en: 'Isaiah 61:1-5',
    reference_fr: 'Ésaïe 61:1-5',
    theme_en: 'Beauty for Ashes & Strangers Feeding Your Flocks',
    theme_fr: 'Un Diadème au lieu de la Cendre & Des Étrangers à Votre Service',
    kjv_en: 'To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning... And strangers shall stand and feed your flocks, and the sons of the alien shall be your plowmen.',
    lsg_fr: 'Pour accorder aux affligés de Sion, pour leur donner un diadème au lieu de la cendre, une huile de joie au lieu du deuil... Des étrangers se tiendront là et feront paître vos troupeaux ; des fils de l’étranger seront vos laboureurs.',
    application_en: 'God raising unexpected destiny helpers and strangers globally to build and finance your kingdom assignment.',
    application_fr: 'Dieu suscitant des aides de destinée inattendues et des étrangers pour bâtir et soutenir votre appel.',
    videoIds: ['45wUm7wffBQ'],
  },
  {
    id: 'scr-10',
    reference_en: 'Colossians 2:14-15',
    reference_fr: 'Colossians 2:14-15',
    theme_en: 'Blotting Out Ancestral Ordinances',
    theme_fr: 'Effacer l’Acte des Ordonnances Contre Nous',
    kjv_en: 'Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross; And having spoiled principalities and powers, he made a shew of them openly.',
    lsg_fr: 'Il a effacé l’acte dont les ordonnances nous condamnaient et qui subsistait contre nous, et il l’a détruit en le clouant à la croix ; il a dépouillé les dominations et les autorités.',
    application_en: 'Nullifying hidden spiritual agreements, ancestral dedications, and blood covenants through the cross of Calvary.',
    application_fr: 'Annuler par la croix du Calvaire les pactes spirituels cachés et les alliances ancestrales.',
    videoIds: ['4YElIs15_Ak'],
  },
  {
    id: 'scr-11',
    reference_en: 'Obadiah 1:15, 17',
    reference_fr: 'Abdias 1:15, 17',
    theme_en: 'Possessing Your Possessions & Divine Recompense',
    theme_fr: 'Posséder ses Possessions & Rétribution Divine',
    kjv_en: 'As thou hast done, it shall be done unto thee: thy reward shall return upon thine own head... But upon mount Zion shall be deliverance, and there shall be holiness; and the house of Jacob shall possess their possessions.',
    lsg_fr: 'Comme tu as fait, il te sera fait ; tes œuvres retomberont sur ta tête... Mais le salut sera sur la montagne de Sion, elle sera sainte, et la maison de Jacob reprendra ses possessions.',
    application_en: 'Moving beyond deliverance into full recovery of stolen stars, contracts, joy, and inheritance.',
    application_fr: 'Passer de la délivrance à la récupération intégrale des opportunités, de la joie et de l’héritage volés.',
    videoIds: ['4YElIs15_Ak'],
  },
  {
    id: 'scr-12',
    reference_en: 'Joel 2:25 & 1 Kings 18:46',
    reference_fr: 'Joël 2:25 & 1 Rois 18:46',
    theme_en: 'Restoration of Wasted Years & Supernatural Speed',
    theme_fr: 'Restauration des Années Dévorées & Vitesse Surnaturelle',
    kjv_en: 'And I will restore to you the years that the locust hath eaten, the cankerworm, and the caterpillar, and the palmerworm... And the hand of the Lord was on Elijah; and he girded up his loins, and ran before Ahab.',
    lsg_fr: 'Je vous remplacerai les années qu’ont dévorées la sauterelle, le jélek, le hasil et le gazam... Et la main de l’Éternel fut sur Élie, qui se ceignit les reins et courut devant Achab.',
    application_en: 'Divine compression of time—achieving in one year what takes others ten years through the hand of the Lord.',
    application_fr: 'Compression divine du temps — accomplir en une année ce qui en demande dix par la main de l’Éternel.',
    videoIds: ['4YElIs15_Ak', '45wUm7wffBQ'],
  },
  {
    id: 'scr-13',
    reference_en: '2 Thessalonians 3:16',
    reference_fr: '2 Thessaloniciens 3:16',
    theme_en: 'Peace Always and By All Means',
    theme_fr: 'La Paix en Tout Temps et de Toute Manière',
    kjv_en: 'Now the Lord of peace himself give you peace always by all means. The Lord be with you all.',
    lsg_fr: 'Que le Seigneur de la paix vous donne lui-même la paix, en tout temps, de toute manière ! Que le Seigneur soit avec vous tous !',
    application_en: 'Claiming the peace of God in every sphere of life by all means necessary.',
    application_fr: 'Réclamer la paix souveraine de Dieu dans chaque domaine de la vie, par tous les moyens.',
    videoIds: ['45wUm7wffBQ'],
  },
  {
    id: 'scr-14',
    reference_en: 'Zechariah 2:5 & Isaiah 54:17',
    reference_fr: 'Zacharie 2:5 & Ésaïe 54:17',
    theme_en: 'Wall of Fire & Condemning Every Evil Tongue',
    theme_fr: 'Muraille de Feu & Condamner Toute Langue Maléfique',
    kjv_en: 'For I, saith the Lord, will be unto her a wall of fire round about... No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn.',
    lsg_fr: 'Je serai pour elle, dit l’Éternel, une muraille de feu tout autour... Toute arme forgée contre toi sera sans effet ; et toute langue qui s’élèvera en justice contre toi, tu la condamneras.',
    application_en: 'Surrounding your household with an impenetrable wall of fire and exercising your heritage to condemn every accusing tongue.',
    application_fr: 'Entourer sa maison d’une muraille de feu infranchissable et exercer son droit d’alliance pour condamner toute langue accusatrice.',
    videoIds: ['4YElIs15_Ak'],
  },
  {
    id: 'scr-15',
    reference_en: 'Numbers 27:18-20 & 1 Chronicles 4:10',
    reference_fr: 'Nombres 27:18-20 & 1 Chroniques 4:10',
    theme_en: 'Jabez Expansion & The Transferable Mantle of Honor',
    theme_fr: 'Élargissement de Jaebets & Le Manteau Transférable d’Honneur',
    kjv_en: 'And thou shalt put some of thine honour upon him, that all the congregation of the children of Israel may be obedient... Oh that thou wouldest bless me indeed, and enlarge my coast!',
    lsg_fr: 'Tu mettras de ta dignité (ton honneur) sur lui, afin que toute l’assemblée des enfants d’Israël l’écoute... Si tu me bénis et que tu étendes mes limites !',
    application_en: 'Receiving territorial expansion in all four directions and the mantle of honor that distinguishes you among your contemporaries.',
    application_fr: 'Recevoir l’élargissement territorial aux quatre vents et le manteau d’honneur qui efface l’opprobre et distingue parmi ses contemporains.',
    videoIds: ['45wUm7wffBQ'],
  },
];

export interface DocxPackageItem {
  id: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  filename: string;
  href: string;
  badge_en: string;
  badge_fr: string;
  sizeLabel: string;
  languages: string;
  isPrimary?: boolean;
}

export const DOCX_PACKAGES_LIST: DocxPackageItem[] = [
  {
    id: 'pkg-master-en-fr',
    title_en: 'Complete Bilingual Master Package (All 3 Videos — EN & FR)',
    title_fr: 'Pack Maître Bilingue Complet (Les 3 Vidéos — EN & FR)',
    description_en:
      'The complete Microsoft Word (.docx) volume containing all 3 video transcriptions in both English and French, devotional summaries, and Scripture concordances.',
    description_fr:
      'Le volume Microsoft Word (.docx) complet réunissant les 3 transcriptions vidéo intégrales en anglais et en français, les synthèses dévotionnelles et les références bibliques.',
    filename: 'Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    href: 'downloads/Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx',
    badge_en: 'Recommended Master DOCX',
    badge_fr: 'DOCX Maître Recommandé',
    sizeLabel: '95 KB • .DOCX',
    languages: 'English + Français',
    isPrimary: true,
  },
  {
    id: 'pkg-zip-all',
    title_en: 'Complete All-in-One DOCX Archive Bundle (6 .DOCX Files in .ZIP)',
    title_fr: 'Archive Complète de Tous les Fichiers DOCX (6 Fichiers .DOCX en .ZIP)',
    description_en:
      'A single downloadable ZIP package containing the Master Bilingual DOCX, English Edition DOCX, French Edition DOCX, and all 3 individual video DOCX manuals.',
    description_fr:
      'Une archive ZIP téléchargeable regroupant le DOCX Maître Bilingue, l’Édition Anglaise, l’Édition Française et les 3 manuels DOCX individuels par vidéo.',
    filename: 'Spiritual_Intelligence_DOCX_Transcriptions_Package.zip',
    href: 'downloads/Spiritual_Intelligence_DOCX_Transcriptions_Package.zip',
    badge_en: 'Full Bundle (.ZIP of 6 .DOCX)',
    badge_fr: 'Pack Intégral (.ZIP de 6 .DOCX)',
    sizeLabel: '380 KB • .ZIP',
    languages: 'EN + FR (6 Documents)',
    isPrimary: true,
  },
  {
    id: 'pkg-en-only',
    title_en: 'English Complete Transcriptions Edition (All 3 Videos — EN)',
    title_fr: 'Édition Complète des Transcriptions en Anglais (Les 3 Vidéos — EN)',
    description_en:
      'All three complete video transcriptions, prophetic declarations, and scripture references in English only.',
    description_fr:
      'Les trois transcriptions vidéo intégrales, déclarations prophétiques et références bibliques uniquement en anglais.',
    filename: 'Spiritual_Intelligence_Transcriptions_EN.docx',
    href: 'downloads/Spiritual_Intelligence_Transcriptions_EN.docx',
    badge_en: 'English Edition',
    badge_fr: 'Édition Anglaise',
    sizeLabel: '74 KB • .DOCX',
    languages: 'English (EN)',
  },
  {
    id: 'pkg-fr-only',
    title_en: 'French Complete Transcriptions Edition (All 3 Videos — FR)',
    title_fr: 'Édition Complète des Transcriptions en Français (Les 3 Vidéos — FR)',
    description_en:
      'All three complete video transcriptions, prophetic declarations, and Louis Segond scripture references in French only.',
    description_fr:
      'Les trois transcriptions vidéo intégrales, déclarations prophétiques et références bibliques Louis Segond uniquement en français.',
    filename: 'Spiritual_Intelligence_Transcriptions_FR.docx',
    href: 'downloads/Spiritual_Intelligence_Transcriptions_FR.docx',
    badge_en: 'French Edition',
    badge_fr: 'Édition Française',
    sizeLabel: '58 KB • .DOCX',
    languages: 'Français (FR)',
  },
  {
    id: 'pkg-v1',
    title_en: 'Video 1 DOCX: Command Your Day in Total Victory | Joshua Selman (EN & FR)',
    title_fr: 'DOCX Vidéo 1 : Commandez Votre Journée dans une Victoire Totale | Joshua Selman (EN & FR)',
    description_en:
      'Dedicated bilingual (English & French) transcription and prayer manual for Video 1 (4YElIs15_Ak — 1:24:44).',
    description_fr:
      'Manuel de prière et transcription bilingue (anglais et français) dédié à la Vidéo 1 (4YElIs15_Ak — 1:24:44).',
    filename: 'Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx',
    href: 'downloads/Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx',
    badge_en: 'Video 1 • 1:24:44',
    badge_fr: 'Vidéo 1 • 1:24:44',
    sizeLabel: '75 KB • .DOCX',
    languages: 'English + Français',
  },
  {
    id: 'pkg-v2',
    title_en: 'Video 2 DOCX: Call on the Name of Jesus | Morning Prayer (EN & FR)',
    title_fr: 'DOCX Vidéo 2 : Invoquez le Nom de Jésus | Prière du Matin (EN & FR)',
    description_en:
      'Dedicated bilingual (English & French) transcription and devotional manual for Video 2 (XWBUBtEv70A — 09:02).',
    description_fr:
      'Manuel dévotionnel et transcription bilingue (anglais et français) dédié à la Vidéo 2 (XWBUBtEv70A — 09:02).',
    filename: 'Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx',
    href: 'downloads/Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx',
    badge_en: 'Video 2 • 09:02',
    badge_fr: 'Vidéo 2 • 09:02',
    sizeLabel: '44 KB • .DOCX',
    languages: 'English + Français',
  },
  {
    id: 'pkg-v3',
    title_en: 'Video 3 DOCX: 6:45 AM 10 Powerful Morning Declarations | Joshua Selman (EN & FR)',
    title_fr: 'DOCX Vidéo 3 : 6h45 — 10 Puissantes Déclarations Matinales | Joshua Selman (EN & FR)',
    description_en:
      'Dedicated bilingual (English & French) transcription and declaration manual for Video 3 (45wUm7wffBQ — 29:12).',
    description_fr:
      'Manuel de déclarations et transcription bilingue (anglais et français) dédié à la Vidéo 3 (45wUm7wffBQ — 29:12).',
    filename: 'Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx',
    href: 'downloads/Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx',
    badge_en: 'Video 3 • 29:12',
    badge_fr: 'Vidéo 3 • 29:12',
    sizeLabel: '49 KB • .DOCX',
    languages: 'English + Français',
  },
];
