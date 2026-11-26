export type LanguageMode = 'en' | 'fr' | 'mg' | 'both';
export type UILang = 'en' | 'fr' | 'mg';

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
    id: 'pkg-prayers',
    title_en: 'Prayer Library — Complete Transcripts (377 volumes in one .DOCX)',
    title_fr: 'Bibliothèque de Prières — Transcriptions Complètes (377 volumes en un .DOCX)',
    description_en:
      'Every harvested prayer transcript in a single Microsoft Word document, with word counts and the source link for each entry.',
    description_fr:
      'Toutes les transcriptions de prière récoltées dans un seul document Microsoft Word, avec le nombre de mots et le lien source pour chaque entrée.',
    filename: 'Spiritual_Intelligence_PRAYERS_Complete_Transcriptions.docx',
    href: 'downloads/Spiritual_Intelligence_PRAYERS_Complete_Transcriptions.docx',
    badge_en: 'Prayer Library',
    badge_fr: 'Bibliothèque de Prières',
    sizeLabel: '4.7 MB • .DOCX',
    languages: 'English (EN)',
    isPrimary: true,
  },
  {
    id: 'pkg-teachings',
    title_en: 'Myles Munroe Teaching Library — Complete Transcripts (464 volumes)',
    title_fr: 'Bibliothèque d’Enseignements Myles Munroe — Transcriptions Complètes (464 volumes)',
    description_en:
      'Every harvested Dr. Myles Munroe teaching transcript in one Microsoft Word document.',
    description_fr:
      'Toutes les transcriptions d’enseignement du Dr. Myles Munroe récoltées, dans un seul document Word.',
    filename: 'Spiritual_Intelligence_TEACHINGS_Complete_Transcriptions.docx',
    href: 'downloads/Spiritual_Intelligence_TEACHINGS_Complete_Transcriptions.docx',
    badge_en: 'Myles Munroe',
    badge_fr: 'Myles Munroe',
    sizeLabel: '4.4 MB • .DOCX',
    languages: 'English (EN)',
    isPrimary: true,
  },
  {
    id: 'pkg-christian-house',
    title_en: 'Christian House — Complete Transcripts (Apostle Joshua Selman)',
    title_fr: 'Christian House — Transcriptions Complètes (Apôtre Joshua Selman)',
    description_en:
      'Harvested Christian House playlist transcripts. The package grows as the rest of the playlist is transcribed.',
    description_fr:
      'Transcriptions récoltées de la playlist Christian House. Le pack s’enrichit au fur et à mesure de la transcription du reste de la playlist.',
    filename: 'Spiritual_Intelligence_CHRISTIAN_HOUSE_Complete_Transcriptions.docx',
    href: 'downloads/Spiritual_Intelligence_CHRISTIAN_HOUSE_Complete_Transcriptions.docx',
    badge_en: 'Christian House',
    badge_fr: 'Christian House',
    sizeLabel: '0.1 MB • .DOCX',
    languages: 'English (EN)',
  },
  {
    id: 'pkg-zip-all',
    title_en: 'Complete Archive Bundle (all collections in one .ZIP)',
    title_fr: 'Archive Complète (toutes les collections en un .ZIP)',
    description_en:
      'A single downloadable ZIP containing every per-collection .DOCX package above.',
    description_fr:
      'Une archive ZIP unique contenant chaque pack .DOCX par collection ci-dessus.',
    filename: 'Spiritual_Intelligence_DOCX_Transcriptions_Package.zip',
    href: 'downloads/Spiritual_Intelligence_DOCX_Transcriptions_Package.zip',
    badge_en: 'Full Bundle (.ZIP)',
    badge_fr: 'Pack Intégral (.ZIP)',
    sizeLabel: '9.2 MB • .ZIP',
    languages: 'EN (all collections)',
    isPrimary: true,
  },
];
