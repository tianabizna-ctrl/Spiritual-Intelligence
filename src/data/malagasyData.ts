// Complete Malagasy (MG) translations for all Videos, Chapters, Prayers, Devotionals, Scriptures & Playlists

export interface VideoMalagasyTranslation {
  title_mg: string;
  watchCategory_mg: string;
  tagline_mg: string;
  overview_mg: string;
}

export interface ChapterMalagasyTranslation {
  title_mg: string;
  mg_text: string;
  declaration_mg: string;
}

export interface PrayerCardMalagasyTranslation {
  categoryLabel_mg: string;
  title_mg: string;
  scriptureQuote_mg: string;
  prayerText_mg: string;
  decree_mg: string;
}

export interface DevotionalMalagasyTranslation {
  dayLabel_mg: string;
  title_mg: string;
  subtitle_mg: string;
  anchorVerse_mg: string;
  meditation_mg: string[];
  reflectionPrompts_mg: string[];
  closingPrayer_mg: string;
}

export interface ScriptureMalagasyTranslation {
  reference_mg: string;
  theme_mg: string;
  mg_text: string;
  application_mg: string;
}

export const VIDEO_MG_MAP: Record<string, VideoMalagasyTranslation> = {
  '4YElIs15_Ak': {
    title_mg: '[MAHERY VAIKA 🔥] FEHEZO AMIN’NY FANDRESENA TANTERAKA NY ANDRONAO AMIN’NY FANAMBARANA IRETO VAVAKA MAHERY IRETO | JOSHUA SELMAN',
    watchCategory_mg: 'Fibaikoana ny Mangiran-dratsy & Ady amin’ny Misasakalina',
    tagline_mg: 'Fandraisana fahefana eo am-bavahadin’ny maraina sy famerenana ny zana-tsipìkan’ny maizina rehetra any amin’ny mpandefa azy.',
    overview_mg:
      'Boky torolalana feno momba ny vavaka ara-paminaniana maharitra 84 minitra voazara ho fizarana roa lehibe : Ny Fizarana I dia mibaiko ny fiambenana maraina alohan’ny hiposahan’ny masoandro (Joba 38:12-13, Salamo 5:3, Eksodosy 14:24), manapotika ny zioga amin’ny alalan’ny fanosorana, mandoro ny alitara ratsy, mamafa ny sora-tanan’ny razana, manaisotra ny faharatsiana ao an-tokantrano, mamerina ny voninahitra nangalarina ary manodidina ny fianakaviana amin’ny manda afo. Ny Fizarana II kosa dia miditra amin’ny Fiambenana amin’ny Misasakalina (« Miverina amin’ny Mpandefa » sy Famerenana Tanteraka) mifototra amin’ny Estera 7:10, Salamo 7:15-16, Isaia 54:17 ary Obadia 1:17.',
  },
  'XWBUBtEv70A': {
    title_mg: 'Antsoy ny Anaran’i Jesosy dia Jereo Andriamanitra Miasa Anio | Vavaka Maraina',
    watchCategory_mg: 'Vavaka Fandinihan-tena Maraina',
    tagline_mg: 'Vavaka maraina feno fankasitrahana, fanoloran-tena, fifonana ho an’ny hafa ary fitoerana ao amin’ny Tena Voaloboka.',
    overview_mg:
      'Vavaka maraina feno fiadanana maharitra 9 minitra izay manomboka ny andro ao amin’ny Tilikambo Mafy dia ny Anaran’i Jesosy (Ohabolana 18:10, Filipiana 2:9-11), manaiky hovolavolain’ny Mpanefy tanimanga (Isaia 64:8), mitoetra ao amin’i Kristy Ilay Tena Voaloboka (Jaona 15:5), mitady fahasoavana amin’ny fahalemena (2 Korintiana 12:9), miambina ny fo sy ny lela (Ohabolana 4:23), miantso an’i Jesosy ho Mpamatsy, Mpanasitrana sy Tompon’ny Fiadanana, ary mivavaka ho an’ny ankohonana sy ny Fiangonana.',
  },
  '45wUm7wffBQ': {
    title_mg: '6:45 MARAINA #vavaka FANAMBARANA MARAINA 10 MAHERY VAIKA MIARAKA AMIN’NY APOSTOLY JOSHUA SELMAN',
    watchCategory_mg: 'Fanambarana Apostolika amin’ny 6:45 Maraina',
    tagline_mg: 'Mivavaka tahaka ny mpino manana Faharanitan-tsaina Ara-panahy (Spiritual Intelligence) : didy ara-paminaniana 10 mamorona zava-misy.',
    overview_mg:
      'Fanambarana maraina apostolika folo sy fampianarana Soratra Masina tarihin’ny Apostoly Joshua Selman : (1) Fanandratana mahagaga (Salamo 3:1-3) ; (2) Faharavan’ny vavahady vy manakana ny fahitana anao (Asan’ny Apostoly 12:4-10) ; (3) Fanafahana amin’ny fahatarana sy hafainganam-pandehan’i Elia (1 Mpanjaka 18:46) ; (4) Fahatapahan’ny tehin’ny ratsy fanahy (Salamo 125:3) ; (5) Fanekena fiarovana amin’ny vato any an-tsaha (Joba 5:19-23) ; (6) Fiadanana mandrakariva amin’ny lafiny rehetra (2 Tesaloniana 3:16) ; (7) Fanompoan’ireo mpanampy sy ny latabatr’i Mefiboseta (Isaia 61:1-5, 2 Samoela 9) ; (8) Fifonana ho an’ny firenena amim-paharanitan-tsaina ara-panahy (Salamo 122:6, Estera 4:13-16) ; (9) Varavarana misokatra sy fanitarana ny faritr’i Jabeza (1 Tantara 4:9-10) ; ary (10) Ny akanjon’ny fanomezam-boninahitra izay mamafa ny latsa (Nomery 27:18-20).',
  },
  'HQzfk0DMgCo': {
    title_mg: 'MITENENA AFO AO AMIN’NY VOLANA VAOVAO ALOHAN’NY HITENENAN’NY FAHAVALO | APOSTOLY JOSHUA SELMAN',
    watchCategory_mg: 'Playlist 1 • Ady Ara-paminaniana ho an’ny Volana Vaovao',
    tagline_mg: 'Miteny voalohany any amin’ny fitsaran’ny lanitra mba hametrahana fanorenana afo, fahasoavana ary varavarana misokatra mandritra ny volana manontolo.',
    overview_mg:
      'Fotoam-bavaka mahery vaika maharitra 41 minitra avy amin’ny Playlist 1 izay mampianatra ny mpino hiteny voalohany amin’ny volana vaovao (Joba 22:28, Ohabolana 18:21), hanapotika ny zioga (Isaia 10:27), handrodana ny alitaran-drazana tahaka an’i Gideona (Mpitsara 6:25), hamerina ny voninahitra very (Obadia 1:17), hiaro ny ankohonana (Josoa 24:15), hamoha ny vavahadin’ny fihariana (Salamo 24:7, Malakia 3:10-11), hanambara fahasalamana (Isaia 53:5) ary haminany amin’ny herinandro efatra amin’ny volana.',
  },
  'ZSKymClHnzE': {
    title_mg: 'JEHOVAH SHAMMAH, ILAY ANDRIAMANITRA AO, MANDEHANA MIALOHA AHY ANY AMIN’NY EFITRA REHETRA HIDIRAKO ANIO ! | JOSHUA SELMAN',
    watchCategory_mg: 'Playlist 1 • Fanatrehan’ny Fanekena & Fiomanana',
    tagline_mg: 'Miditra any amin’ny birao, efitra fivoriana, hopitaly ary resaka ao an-tokantrano amim-pahatokiana fa efa tonga ao alohanao i Jehovah Shammah.',
    overview_mg:
      'Fampianarana sy vavaka maharitra 39 minitra mifototra amin’ny Ezekiela 48:35 (« Ny anaran’ny tanàna hatramin’izany andro izany dia Jehovah-shama — Jehovah no ao »), Deoteronomia 31:8 (« Jehovah, Izy no mandeha eo alohanao »), Salamo 139:7-10 ary Eksodosy 33:14 (« Ny fanatrehako no handeha, ka homeko fitsaharana ianao »), maniraka ny fanatrehan’Andriamanitra hialoha lalana anao any amin’ny efitra sy lalana rehetra handehananao anio.',
  },
  'CK9rP2ZBGKg': {
    title_mg: 'Mitadiava an’Andriamanitra amin’ny Fonao Rehetra dia Hahita ny Fahagagany eo amin’ny Fiainanao Ianao | Vavaka Maraina',
    watchCategory_mg: 'Playlist 2 • Fanokanan-tena Amin’ny Fo Manontolo',
    tagline_mg: 'Vavaka maraina mifototra amin’ny Jeremia 29:13 — mikatsaka Ilay Mpanome mihoatra noho ny fanomezana amin’ny fo tsy mizarazara.',
    overview_mg:
      'Miorina amin’ny Jeremia 29:13 (« Hitady Ahy ianareo ka hahita Ahy, raha katsahinareo amin’ny fonareo rehetra Aho »), ity vavaka maharitra 13 minitra avy amin’ny Playlist 2 ity dia mitarika ny mpino hiala amin’ny fivavahana matimaty ka hiditra ao amin’ny Fitoerana Masina Indrindra, handrodana ny sampin’ny fitiavan-tena, haharitra tahaka an’i Jakoba (Genesisy 32:26) ary hahita fifaliana feno eo anatrehan’Andriamanitra (Salamo 16:11).',
  },
  'zPOULLgPjYc': {
    title_mg: 'Vavaka Maraina Mahery 13 Minitra Miaraka amin’Andriamanitra Hanombohana Tsara ny Andronao | Vavaka Maraina',
    watchCategory_mg: 'Playlist 2 • Fanokanan-tena Maraina & Fiadian’Andriamanitra',
    tagline_mg: 'Manolotra ny saina, ny fandaharam-potoana, ny ankohonana ary ny asa ho an’Andriamanitra sady mitafy ny fiadian’Andriamanitra rehetra ao amin’ny Efesiana 6.',
    overview_mg:
      'Vavaka fanokanan-tena maraina maharitra 13 minitra avy amin’ny Playlist 2 maneho fisaorana noho ny fiambenan’ny anjely nandritra ny alina, mangataka ny sain’i Kristy (1 Korintiana 2:16), fo madio (Salamo 51:10) ary fiadanana miaro ny saina (Filipiana 4:7), manolotra ny fandaharam-potoana sy ny asa (Kolosiana 3:23), mivavaka ho an’ny marary sy ny mpitondra, ary mitafy ny fiadian’Andriamanitra rehetra (Efesiana 6:10-18).',
  },
  'Zvk_jzAsoi8': {
    title_mg: 'Salamo 121 : Vavaka Maraina ho an’ny Fiarovana sy ny Filaminana | Vavaka Maraina Voatahy',
    watchCategory_mg: 'Playlist 2 • Fiambenana sy Fiarovana ao amin’ny Salamo 121',
    tagline_mg: 'Vavaka fandinihan-tena andininy isan’andininy amin’ny Salamo 121:1-8 — mitoetra eo ambany fiarovan’Ilay Mpiaro ny Isiraely izay tsy mba rendrehana na matory.',
    overview_mg:
      'Vavaka maharitra 7 minitra mamaly andininy isan’andininy ny Salamo 121:1-8 (Playlist 2), manopy ny maso hihoatra ny tendrombohitra ho amin’ny Mpanao ny lanitra sy ny tany izay tsy mamela ny tongotrao hangozohozo, tsy mba rendrehana na matory, mialokaloka anao eo amin’ny ankavananao amin’ny masoandro nony andro sy ny volana nony alina, ary miaro ny fivoahanao sy ny fidiranao hatramin’izao ka ho mandrakizay.',
  },
  'BwWxo1T564Q': {
    title_mg: 'FANAMBARANA MAHERY AMIN’NY ALAHADY MARAINA 6:30 #vavaka MIARAKA AMIN’NY APOSTOLY JOSHUA SELMAN',
    watchCategory_mg: 'Playlist 3 • Fanambarana Apostolika amin’ny 6:30 Maraina',
    tagline_mg: 'Didy apostolika folo ny alahady maraina mitondra fahavokarana, fahasalamana, fitarihana marina, mpanampy mahatoky ary ny fahasoavana telo sosona : Fankasitrahana, Famantarana ary Voninahitra.',
    overview_mg:
      'Fotoam-bavaka maharitra 23 minitra miaraka amin’ny Apostoly Joshua Selman (Overcoming Daily), manambara fitahiana apostolika 10 : (1) Fahavokarana amin’ny asan’ny tanana rehetra (Deoteronomia 30:9), (2) Fanafahana amin’ny aretina rehetra (Deoteronomia 7:15), (3) Fandresena ny fiadiana sy ny lela rehetra (Isaia 54:17), (4) Fitarihana tsy tapaka tahaka ny saha vonton-drano (Isaia 58:11), (5) Famantarana hita maso ho amin’ny soa (Salamo 86:17), (6) Fanomezana olona manana ny maha-izy azy (Isaia 43:4), (7) Tso-dranon’ny mpisorona (Nomery 6:24-26), (8) Fitsanganan’ny fiainam-bavaka, (9) Fitantanana ny harenan’ny Fanjakana (Salamo 66:12), ary (10) Ny Fanomezana Telo Sosona : Fahasoavana, Famantarana sy Fahagagana, ary Voninahitra.',
  },
};

export const CHAPTER_MG_MAP: Record<string, ChapterMalagasyTranslation> = {
  'v1-ch1': {
    title_mg: 'Fibaikoana ny Vavahadin’ny Maraina sy Fanintsana ny Ratsy Fanahy',
    mg_text:
      'Mitsangàna eo am-pandriana izao ankehitriny izao. Alohan’ny hiposahan’ny masoandro tanteraka dia misy olona tsy maintsy mandray ny fahefana amin’ity andro ity. Ao amin’ny Joba 38:12-13, Andriamanitra dia nanontany an’i Joba hoe : « Moa mba efa nandidy ny maraina va ianao hatrizay niainanao, na nanondro ny fitoeran’ny mazava atsinanana, mba hisamborany ny sisin’ny tany, ka hohetezana hiala aminy ny ratsy fanahy ? » Manana sisiny ny maraina ary azo raisina sy ahifikifika ireo sisiny ireo. Isa-maraina dia miandry baiko ny andro. Ny Salamo 5:3 dia milaza hoe : « Jehovah ô, ny maraina no handrenesanao ny feoko ; ny maraina no handaharako ny fivavako aminao ka hiandrasako. » Ary ao amin’ny Eksodosy 14:24, tamin’ny fiambenana maraina, Jehovah dia nijery ny tobin’ny Egyptiana avy tao amin’ny andry afo sy rahona ka nampikorontana azy.',
    declaration_mg:
      'An’Andriamanitra ity maraina ity ary ahy ity maraina ity ! Ray ô, amin’ny anaran’i Jesosy, raisiko ny sisin’ity maraina ity sy ny vazan-tany efatra amin’ity andro ity. Izay fandaminana ratsy rehetra, vaovao ratsy, loza na fahadisoam-panantenana nomanina ho an’ity andro ity — ahifikifiko amin’ny afo ! Ry masoandro sy volana, tsy hamely ahy ianareo. Tompo ô, jereo avy ao amin’ny andry afo ny mpanenjika ahy ka ampikorontano ny tobiny !',
  },
  'v1-ch2': {
    title_mg: 'Fanapotehana ny Zioga amin’ny Fanosorana sy Fanafahana ny Babon’ny Mahery',
    mg_text:
      'Isaia 10:27 dia milaza hoe : « Ary amin’izany andro izany dia ho afaka amin’ny sorokao ny entany, ary ny ziogany ho afaka amin’ny tendanao, ary ho potika ny zioga noho ny fanosorana. » Tsy hoe hanalefahana fotsiny ny zioga fa ho potika tanteraka ! Ny ziogan’ny fandrosoana miadana, ny « efa saika nahazo », ny fisasarana tsy misy fijinjana, ny trosa sy ny henatra dia tsy maintsy tapaka. Ary ao amin’ny Isaia 49:24-26, hoy Jehovah : « Na dia ny sambotry ny mahery aza dia halaina aminy, ary ny babon’ny lozabe dia ho afaka ; fa Izaho hiady amin’izay miady aminao, ary Izaho hamonjy ny zanakao. »',
    declaration_mg:
      'Izay ziogan’ny fameperana rehetra eo amin’ny tendako, potika noho ny fanosorana ! Gadran’ny fahatarana manodidina ny tongotro, ny tanako, ny vavako sy ny saiko — tapaka amin’ny sabatry ny Fanahy ! Tompo ô, miadia amin’izay miady amiko anio maraina ; izay mahery rehetra mitazona ny anjarako ho babo, avoty izao ankehitriny izao !',
  },
  'v1-ch3': {
    title_mg: 'Fiantsoana Afo handevona ny Alitara Ratsy sy Famonoana ny Fanekena avy amin’ny Razana',
    mg_text:
      'Isa-maraina alohan’ny hifohazanao dia mety misy olona nanonona ny anaranao teo ambonin’ny alitara maizina. Ny valin-tenin’Andriamanitra amin’ny maraina dia ny afo ! Ny ran’ny osilahy sy ny ombilahy dia tsy maharesy ny ran’ny Zanak’ondry ; ny ran’i Jesosy dia miteny tsara lavitra noho ny ran’i Abela (Hebreo 12:24). Kolosiana 2:14-15 dia manambara fa novonoiny ny sora-tanana izay niampanga antsika ka nohomboany teo amin’ny hazofijaliana. Ary Galatiana 3:13 dia manamafy fa Kristy efa nanavotra antsika tamin’ny ozon’ny lalàna.',
    declaration_mg:
      'Izay alitara rehetra natsangana hanohitra ny fiainako any an-tanànan-drazako, eo ambanin’ny hazo na any anaty renirano — may amin’ny afo ! Ry ran’i Jesosy, mitenena mafy kokoa noho ny alitara sy ny ozona rehetra ! Izay sora-tanana rehetra nosoniavin’ny razambeko talohan’ny nahaterahako dia voafafa amin’ny ran’i Jesosy. Mijanona eo am-baravarako ny ozona nolovaina : manomboka anio maraina dia taranaka vaovao voatahy aho !',
  },
  'v1-ch4': {
    title_mg: 'Fanehoana ny Faharatsiana ao an-Tokantrano sy Fanafoanana ny Nofy Ratsy amin’ny Alina',
    mg_text:
      'Mika 7:6 dia mampitandrina fa ny fahavalon’ny olona dia ny ankohonany ihany. Salamo 68:1-2 : « Aoka hitsangana Andriamanitra, aoka hielezana ny fahavalony ! Tahaka ny fipaokan’ny rivotra ny setroka no hipaokanao azy ; tahaka ny fiempon’ny savoka eo anoloan’ny afo no hahafoana ny ratsy fanahy eo anatrehan’Andriamanitra. » Ary ao amin’ny Matio 13:25, raha natory ny olona dia tonga ny fahavalony ka namafy tsimparifary. Tsy maintsy ongotana izay rehetra nafafy tao amin’ny nofy nandritra ny alina.',
    declaration_mg:
      'Aoka hitsangana Andriamanitra ka hielezana ny fahavaloko rehetra ! Izay maso manara-maso ny fandrosoako mba hamely ahy eo amoron’ny fandresena, jamba amin’ny afo ! Izay sakafo ratsy, fanambadiana ara-panahy na fanafihana tao amin’ny nofiko tamin’ny alina — foanako sy levoniko amin’ny ran’i Jesosy !',
  },
  'v1-ch5': {
    title_mg: 'Fandraisana ny Fananana Nangalarina sy Famerenana ny Voninahitra Nalevina',
    mg_text:
      'Obadia 1:17 dia manambara hoe : « Fa ao an-tendrombohitra Ziona dia hisy sisa afaka, ary ho masina izy ; ary ny taranak’i Jakoba hahazo ny fananany. » Rehefa vita ny fanafahana dia miditra amin’ny fandraisana ny fananana isika. Ary Isaia 60:1 dia miantso hoe : « Mifohaza, mihazavà, fa tonga ny fahazavanao, ary ny voninahitr’i Jehovah efa miposaka aminao. »',
    declaration_mg:
      'Izay rehetra nangalarin’ny fahavalo tamin’ny anjara-lalako, ny kintako, ny fahasalamako sy ny harenako — alaiko amin’ny afo izao ankehitriny izao ! Mifohaza ry voninahitro nalevina, ka mamirapirata amin’ny anaran’i Jesosy !',
  },
  'v1-ch6': {
    title_mg: 'Fiarovana ny Ankohonana, Fanasitranana ny Fanambadiana ary Fitenenana Mafy ny Mpandany',
    mg_text:
      'Fitomaniana 3:22-23 dia manome toky fa ny famindram-pon’i Jehovah tsyritra fa vaovao isa-maraina. Ho an’ny fihariana, Malakia 3:11 dia milaza fa horaran’i Jehovah ny mpandany noho ny aminareo, ary Salamo 24:7 dia mibaiko ny vavahady hanandratra ny lohany hidiran’ny Mpanjakan’ny voninahitra. Deoteronomia 28:7,12 dia mampanantena fa handresy ny fahavalonao amin’ny lalana fito ianao ary hovohan’i Jehovah ho anao ny fiharian-kireny tsara any an-danitra.',
    declaration_mg:
      'Voarakotry ny ran’i Jesosy ny vady aman-janako sy ny ankohonako manontolo ! Voarara ny mpandany ny volako sy ny vokatry ny tanako ; misokatra eo ambonin’ny asako ny varavaran’ny lanitra ka hindrana ny firenena maro aho fa tsy mba hindrana !',
  },
  'v1-ch7': {
    title_mg: 'Fahasalamana avy amin’Andriamanitra, Fanirahana Anjely, Taona Voaverina ary Manda Afo',
    mg_text:
      'Jeremia 30:17 : « Fa hampody ny fahasalamanao Aho sy hanasitrana ny ferinao, hoy Jehovah. » Isaia 40:31 : Izay miandry an’i Jehovah dia manavao ny heriny ka miakatra amin’ny elatra tahaka ny voromahery. Salamo 34:7 : Ny anjelin’i Jehovah mitoby manodidina izay matahotra Azy. Joela 2:25 : « Honerako ho anareo ny taona izay nohanin’ny valala. » Zakaria 2:5 sy Isaia 54:17 : Jehovah dia manda afo manodidina antsika ary tsy misy fiadiana voaforona hambinina.',
    declaration_mg:
      'Tempolin’ny Fanahy Masina ny tenako : miala amin’ny afo ny aretina sy ny fahalemena rehetra ! Anjelin’i Jehovah, mandehana mialoha ahy anio ; voaverina ny taona very rehetra, ary voahodidina manda afo aho sy ny ankohonako !',
  },
  'v1-ch8': {
    title_mg: 'Fizarana II — Ny Fiambenana amin’ny Misasakalina : Mihantona amin’ny Hazony i Hamana & Miverina ny Zana-tsipìka',
    mg_text:
      'Estera 7:10 : « Dia nahantony teo amin’ny hazo izay natsangany ho an’i Mordekay i Hamana. » Salamo 7:15-16 sy Ohabolana 26:27 : Izayady lavaka dia izy ihany no latsaka ao, ary ny faharatsiany miverina eo an-dohany. Salamo 91:5 sy Salamo 64:7 : Tsy hatahotra ny zana-tsipìka manidina nony andro na ny fampangorohoroana nony alina ianao, fa Andriamanitra no handefa zana-tsipìka hampietry ny mpanenjika.',
    declaration_mg:
      'Amin’izao fiambenana amin’ny misasakalina izao, izay hazo rehetra natsangan’i Hamana ho ahy dia izy ihany no mihantona eo ! Izay zana-tsipìkan’ny aretina, fahafatesana na fahantrana nalefa tamiko — miverena any amin’ny mpandefa amin’ny afo !',
  },
  'v1-ch9': {
    title_mg: 'Fanapotehana ny Fanokanana avy amin’ny Razana, ny Ziogan’ny Fahatarana ary ny Fandrika',
    mg_text:
      'Galatiana 3:13 sy Kolosiana 2:14 dia manafaka antsika tanteraka amin’ny fanekena miafina nataon’ny razana. Isaia 10:27 manapotika ny zioga, ary Salamo 124:7 dia manambara hoe : « Ny fanahintsika dia afaka tahaka ny vorona afaka amin’ny fandriky ny mpihaza ; ny fandrika dia tapaka, ary isika dia afaka ! » Obadia 1:15 : « Araka izay nataonao no hatao aminao ; ny valin’ny nataonao dia hiverina eo an-dohanao. »',
    declaration_mg:
      'Tapaka ny fandriky ny mpihaza rehetra ary afaka ny fanahiko ! Tsy babon’ny fanekena taloha intsony aho fa navotan’ny ran’i Jesosy Kristy !',
  },
  'v1-ch10': {
    title_mg: 'Fanadiovana ny Fahalotoana amin’ny Alina, Fandravana ny Vilany Famosaviana ary Fampanginana ny Alitara',
    mg_text:
      'Matio 15:13 : « Ny zavatra rehetra izay tsy nambolen’ny Raiko izay any an-danitra dia hongotana. » Eksodosy 22:18 sy Mika 5:12 dia manapaka ny herin’ny famosaviana rehetra. Ary tahaka ny mpaminany tao amin’ny 1 Mpanjaka 13:2 izay naminany nanohitra ny alitara tao Betela ka vaky ny alitara ary raraka ny lavenona, dia vaky ny alitara ratsy rehetra manohitra ny fiainanao.',
    declaration_mg:
      'Izay zava-maniry ratsy rehetra tsy nambolen’ny Raiko any an-danitra ato amin’ny vatako sy ny fiainako — ongotana hatramin’ny fakany ! Mivadika ny vilany famosaviana rehetra ary vaky ny alitaran’ny maizina !',
  },
  'v1-ch11': {
    title_mg: 'Fanajambana ny Fanahy Mpanara-maso, Fanesorana Sarona ny Mpamadika ary Fanandratana ny Voninahitra',
    mg_text:
      'Ao amin’ny 2 Mpanjaka 6:18, i Elisa dia nivavaka ka nokapohin’i Jehovah fahajambana ny miaramilan’i Syria. Mika 7:6, Salamo 41:9 ary Salamo 55:12-14 dia mampiseho fa Andriamanitra dia mamoaka ny teti-dratsin’ny fahavalo miafina. Ary Salamo 3:3 dia manamafy fa Jehovah no voninahitrao sy Mpanandratra ny lohanao.',
    declaration_mg:
      'Tompo ô, kapohy fahajambana ny fanahy mpanara-maso rehetra sy ny fitaratra maizina mijery ny diako ! Izay voninahitro sy kintako rehetra nalevina — mitsangàna ka mamirapirata izao ankehitriny izao !',
  },
  'v1-ch12': {
    title_mg: 'Fisarahana amin’ny Vady Ara-panahy, Fiarovana ny Zanaka ary Fanokafana ny Vavahadin’ny Harena',
    mg_text:
      '2 Korintiana 6:14 : Tsy misy firaisan’ny mazava sy ny maizina. Isaia 49:25 sy Isaia 8:18 : Jehovah no miaro ny zanakao ary natao ho famantarana sy fahagagana eo amin’ny Isiraely izy ireo. Deoteronomia 28:12, Malakia 3:11 ary Hagay 2:8 (« Ahy ny volafotsy, ary Ahy ny volamena ») dia manokatra ny fihariana ho an’ny fanjakan’Andriamanitra.',
    declaration_mg:
      'Tapaka amin’ny ran’i Jesosy ny fanekena rehetra amin’ny vady ara-panahy ! Ny zanako dia famantarana sy fahagagana, ary misokatra ho ahy ny vavahadin’ny fitahiana ara-bola !',
  },
  'v1-ch13': {
    title_mg: 'Fanongotana ny Aretina, Famerenana ny Didim-pahafatesana ary Fanirahana ny Anjely Mpiady',
    mg_text:
      'Isaia 53:5 sy Eksodosy 23:25 : Amin’ny dian-kapoka taminy no nahasitranana antsika, ary hesorin’i Jehovah ny aretina eo aminao. Salamo 118:17 sy Hebreo 2:14-15 : « Tsy ho faty aho, fa ho velona ka hitantara ny asan’i Jehovah. » Salamo 34:7, Salamo 35:5-6 ary Salamo 91:11 : Ny anjelin’i Jehovah no manenjika ny mpanenjika anao sy mitandrina anao amin’ny lalanao rehetra.',
    declaration_mg:
      'Tsy ho faty aho na ny ankohonako fa ho velona ka hitantara ny asan’i Jehovah ! Anjelin’i Jehovah, mivoaha hiady ho ahy sy hiaro ny diako rehetra !',
  },
  'v1-ch14': {
    title_mg: 'Famerenana ny Taona Nangalarina, Famehezana amin’ny Manda Afo ary Tso-drano Farany',
    mg_text:
      'Joela 2:25 sy Ohabolana 6:31 : Averin’Andriamanitra avo fito heny ny taona sy ny harena nangalarina. Obadia 1:17, Zakaria 2:5, Apokalypsy 12:11 ary Nomery 23:23 : « Tsy misy fankatovana mahomby amin’i Jakoba, ary tsy misy sikidy mahomby amin’ny Isiraely. »',
    declaration_mg:
      'Voaverina avo fito heny ny taona sy ny fahafahana rehetra nangalarin’ny fahavalo ! Voaisy tombo-kase ao anatin’ny manda afon’i Jehovah sy ny ran’ny Zanak’ondry ny fandreseko. Amena !',
  },
  'v2-ch1': {
    title_mg: 'Fidirana amin’ny Maraina ao amin’ny Tilikambo Mafy dia ny Anaran’i Jesosy',
    mg_text:
      'Ray ô, tonga eo anatrehanao aho amin’ny fiandohan’ity andro vaovao ity, ary ny zavatra voalohany ataoko dia ny miantso ny Anaran’i Jesosy. Misaotra Anao aho noho ny fitempon’ny foko sy ny fofonaina ao amin’ny havokavoko. Ny Anaran’i Jesosy dia tilikambo mafy ; ny marina miezaka ho ao ka voavonjy (Ohabolana 18:10, Filipiana 2:9-11).',
    declaration_mg:
      'Miantso ny Anaran’i Jesosy aho eo am-bavahadin’ity maraina ity ! Ny Anaran’i Jesosy no tilikambo mafy sy fiarovana ahy mandritra ity andro ity !',
  },
  'v2-ch2': {
    title_mg: 'Fanekena ny Tanan’ny Mpanefy Tanimanga sy Fitoerana ao amin’ny Tena Voaloboka',
    mg_text:
      'Tompo ô, tsy fantatro izay hoentin’ny ampitso, fa fantatro Ilay mitantana ny hoaviko. Ianao no Mpanefy tanimanga ary izaho no tanimanga eo an-tananao (Isaia 64:8). Ampianaro aho hitoetra ao Aminao tahaka ny sampana mitoetra amin’ny voaloboka, satria raha misaraka Aminao aho dia tsy mahay manao na inona na inona (Jaona 15:5).',
    declaration_mg:
      'Mitoetra ao amin’i Kristy Ilay Tena Voaloboka aho anio ! Ny sitraponao no aoka hatao eo amin’ny fiainako mba hamoazako voa betsaka !',
  },
  'v2-ch3': {
    title_mg: 'Hery ao anatin’ny Fahalemena, Fandresena ny Fakam-panahy ary Fiarovana ny Fo sy ny Lela',
    mg_text:
      'Ampy ho ahy ny fahasoavanao, fa ny herinao dia tanterahina amin’ny fahalemena (2 Korintiana 12:9, 1 Korintiana 10:13). Ambeno ny foko mihoatra noho ny zavatra rehetra azo ambenana, fa avy ao aminy no ivoahan’ny aina (Ohabolana 4:23), ary aoka ho teny mahasoa sy manome fahasoavana hatrany no haloaky ny vavako (Efesiana 4:29).',
    declaration_mg:
      'Tanterahina ao anatin’ny fahalemeko ny herin’i Kristy ! Voaro amin’ny fahamarinana ny foko ary mitondra fanasitranana sy fahasoavana ny lelako !',
  },
  'v2-ch4': {
    title_mg: 'Fiantsoana an’i Jesosy ho Mpamatsy, Mpanasitrana, Mpanome Fiadanana ary Mpamelombelona ny Reraka',
    mg_text:
      'Andriamanitro hahafeno izay rehetra ilainareo araka ny harenany amin’ny voninahitra ao amin’i Kristy Jesosy (Filipiana 4:19). Amin’ny dian-kapoka taminy no nahasitranana antsika (Isaia 53:5). Fiadanana no avelako ho anareo, ny fiadanako no omeko anareo (Jaona 14:27, Matio 11:28).',
    declaration_mg:
      'Jesosy no Mpamatsy ahy, Mpanasitrana ahy ary Fiadanako ! Mandray fitsaharana sy hery vaovao avy eo anatrehany aho anio !',
  },
  'v2-ch5': {
    title_mg: 'Fifonana ho an’ny Ankohonana, ny Fiangonana ary Fandehanana ho Fanasina sy Fahazavana',
    mg_text:
      'Mivavaka ho an’ny fianakaviako aho mba hodidinin’ny anjelinao (Salamo 91:11), ary ho an’ny Fiangonana mba ho iray ihany ao Aminao (Jaona 17:21). Ataovy fanasin’ny tany sy fahazavan’izao tontolo izao aho anio (Matio 5:13-16).',
    declaration_mg:
      'Voaro eo ambany elatry ny Tsitoha ny ankohonako ! Mandeha ho fanasin’ny tany sy fahazavan’izao tontolo izao aho anio !',
  },
  'v2-ch6': {
    title_mg: 'Fanantenana Mandrakizay, Fahavononana amin’ny Fiavian’i Kristy ary Fiderana Farany',
    mg_text:
      'Saino ny zavatra any ambony fa aza ny zavatra ety an-tany (Kolosiana 3:2). Tsy misy famonjena amin’ny hafa afa-tsy amin’ny Anaran’i Jesosy (Asan’ny Apostoly 4:12, Apokalypsy 22:20).',
    declaration_mg:
      'Ao amin’ny Anaran’i Jesosy irery ihany no misy famonjena sy fandresena ! Ho an’Andriamanitra irery anie ny voninahitra anio sy mandrakizay. Amena !',
  },
  'v3-ch1': {
    title_mg: 'Fanambarana 1 : Fanandratana Mahagaga & Faharavan’ny Vavahady Vy Manakana ny Fahitana Anao',
    mg_text:
      'Salamo 3:1-3 : « Fa Ianao, Jehovah ô, no ampinga manodidina ahy, voninahitro sy Mpanandratra ny lohako. » Ary ao amin’ny Asan’ny Apostoly 12:10, rehefa tonga teo amin’ny vavahady vy izay mivoaka ho any an-tanàna i Petera sy ny anjely dia nisokatra ho azy ny vavahady vy !',
    declaration_mg:
      'Amin’ny anaran’i Jesosy, tsy misy mahazaka ny lohako hiondrika intsony — asandratra mahagaga aho ary misokatra ho azy ny vavahady vy rehetra eo anoloako !',
  },
  'v3-ch2': {
    title_mg: 'Fanambarana 2 : Fanafahana amin’ny Fahatarana & Hafainganam-pandehan’i Elia',
    mg_text:
      'Matio 25:1-5 mampiseho fa ny faharendremana dia mitondra fahatarana. Fa ao amin’ny 1 Mpanjaka 18:46, ny tanan’i Jehovah dia tao amin’i Elia ka nihazakazaka nialoha ny kalesin’i Ahaba izy.',
    declaration_mg:
      'Tapaka amin’ny fiainako ny fanahin’ny fahatarana ! Raisiko ny tanan’i Jehovah sy ny hafainganam-pandeha avy any an-danitra : izay tokony ho vita tao anatin’ny folo taona dia ho vitako ao anatin’ny taona iray !',
  },
  'v3-ch3': {
    title_mg: 'Fanambarana 3 : Fahatapahan’ny Tehin’ny Ratsy Fanahy eo amin’ny Lovan’ny Marina',
    mg_text:
      'Salamo 125:3 : « Fa ny tehin’ny faharatsiana tsy havela hitoetra eo amin’ny lovan’ny marina, fandrao ny marina haninjitra ny tanany ho amin’ny faharatsiana. »',
    declaration_mg:
      'Ny tehin’ny faharatsiana rehetra — aretina, fahantrana na faharesena — dia tsy havela hitoetra eo amin’ny fiainako sy ny ankohonako amin’ny anaran’i Jesosy !',
  },
  'v3-ch4': {
    title_mg: 'Fanambarana 4 : Fanekena Fiarovana amin’ny Vato any an-tsaha Manohitra ny Fankatovana',
    mg_text:
      'Joba 5:19-23 : « Amin’ny enina no hamonjeny anao, eny, amin’ny fito aza dia tsy hisy loza hihatra aminao... Fa manao fanekena amin’ny vato any an-tsaha ianao. » Ary Nomery 23:23 : Tsy misy fankatovana mahomby amin’i Jakoba.',
    declaration_mg:
      'Manana fanekena amin’ny vato any an-tsaha aho noho ny ran’i Jesosy : tsy misy zavaboary na fankatovana azo ampiasaina hanohitra ny fiainako !',
  },
  'v3-ch5': {
    title_mg: 'Fanambarana 5 : Fiadanana Mandrakariva sy Amin’ny Lafiny Rehetra',
    mg_text:
      '2 Tesaloniana 3:16 : « Ary ny Tompon’ny fiadanana anie hanome anareo fiadanana mandrakariva amin’ny lafiny rehetra. Ny Tompo anie ho aminareo rehetra. »',
    declaration_mg:
      'Ny Tompon’ny fiadanana dia manome ahy fiadanana mandrakariva sy amin’ny lafiny rehetra — eo amin’ny saiko, ny vatako, ny ankohonako ary ny fihariako !',
  },
  'v3-ch6': {
    title_mg: 'Fanambarana 6 : Ny Fanompoan’ireo Mpanampy & Ny Latabatr’i Mefiboseta',
    mg_text:
      'Isaia 61:1-5 : « Ary ny vahiny hitsangana hiandry ny ondrinareo. » Ary ao amin’ny 2 Samoela 9:1-11, Davida Mpanjaka dia nanontany hoe : « Mbola misy sisa ihany va amin’ny mpianakavin’i Saoly mba hanehoako famindram-po aminy noho ny amin’i Jonatana ? » Dia nampaka an’i Mefiboseta avy tany Lo-debara izy.',
    declaration_mg:
      'amin’ny anaran’i Jesosy, manangana mpanampy avy amin’ny vazan-tany rehetra Andriamanitra hanohana sy hampandroso ny antsoko, ary miala amin’i Lo-debara ho eo amin’ny latabatry ny Mpanjaka aho !',
  },
  'v3-ch7': {
    title_mg: 'Fanambarana 7 : Mivavaka amim-Paharanitan-tsaina Ara-panahy (Spiritual Intelligence) ho an’ny Firenena',
    mg_text:
      'Salamo 122:6 sy Estera 4:13-16 : Ny iraka ampanaovina antsika dia ny mivavaka — mivavaka tahaka ny mpino manana faharanitan-tsaina ara-panahy ! Rehefa miadana i Jerosalema dia miadana sy miroborobo koa ny mponina ao aminy.',
    declaration_mg:
      'Mijoro ho mpisorona manana faharanitan-tsaina ara-panahy aho : ambarako ny fiadanana, ny fahamarinana ary ny fifohazam-panahy eo amin’ny firenentsika !',
  },
  'v3-ch8': {
    title_mg: 'Fanambarana 8 : Mamorona Zava-misy ny Teny Ara-paminaniana & Fanitarana ny Faritr’i Jabeza',
    mg_text:
      'Romana 4:17 sy 1 Tantara 4:9-10 : Ny teny ara-paminaniana dia tsy manambara fotsiny fa mamorona ! Jabeza dia niantso an’Andriamanitra hoe : « Enga anie ka hitahy ahy tokoa Ianao ka hampitombo ny faritro ! »',
    declaration_mg:
      'Miteny amin’ny Avaratra, Atsimo, Atsinanana ary Andrefana aho : misokatra ny varavarana rehetra ary miitatra amin’ny lafiny rehetra ny faritro amin’ny anaran’i Jesosy !',
  },
  'v3-ch9': {
    title_mg: 'Fanambarana 9 : Famelomana ny Afo Ara-panahy, Fifaliana Tsy Azo Tononina & Fahagagana amin’ny Asa',
    mg_text:
      'Zakaria 12:10, Isaia 12:3, 1 Petera 1:8 ary Salamo 1:3 : « Amin’ny fifaliana no hantsakanareo rano amin’ny loharanon’ny famonjena. » Aza mamela ny fahatezerana hangalatra ny fifalianao, ary ho tahaka ny hazo ambolena eo amoron’ny rano velona ny asan’ny tananao rehetra.',
    declaration_mg:
      'Mirehitra vaovao indray ny afon’ny vavaka sy ny Tenin’Andriamanitra ato am-poko ! feno fifaliana tsy azo tononina aho ary menavoka amin’ny fotoanany ny asan’ny tanako rehetra !',
  },
  'v3-ch10': {
    title_mg: 'Fanambarana 10 : Ny Akanjon’ny Fanomezam-boninahitra Izay Mamafa ny Latsa Rehetra',
    mg_text:
      'Nomery 27:18-20 sy 2 Tantara 1:11-12 : « Ary omeo azy ny sasany amin’ny voninahitrao, mba heken’ny fiangonan’ny Zanak’Isiraely rehetra izy. » Ny fanomezam-boninahitra dia akanjo ara-panahy azo ampitaina izay mamafa ny latsa sy ny fahafaham-baraka rehetra.',
    declaration_mg:
      'Raisiko ny Akanjon’ny Fanomezam-boninahitra anio maraina ! Voafafa mandrakizay ny latsa sy ny henatra rehetra teo amin’ny fiainako amin’ny anaran’i Jesosy Kristy !',
  },
  'v4-ch1': {
    title_mg: 'Fitenenana Voalohany any amin’ny Fitsaran’ny Lanitra & Fanapotehana ny Ziogan’ny Fahatarana',
    mg_text:
      'Alohan’ny hiposahan’ny masoandro voalohany amin’ny volana vaovao dia aoka ny didinao no ho voasoratra voalohany any an-danitra (Joba 22:28, Ohabolana 18:21). Izay miteny voalohany no mamaritra ny rivotra iainana. Ary amin’ny fanosorana ao amin’ny Isaia 10:27 dia potika amin’ny afo ny ziogan’ny fahatarana rehetra.',
    declaration_mg:
      'Amin’ity volana ity dia mametraka fanorenana afo, fahasoavana ary varavarana misokatra aho ! Potika amin’ny afo ny zioga rehetra nanaraka ahy hatramin’ny volana lasa !',
  },
  'v4-ch2': {
    title_mg: 'Fandrodanana ny Alitara Ratsy, Fandraisana ny Voninahitra Nangalarina & Fiarovana ny Ankohonana',
    mg_text:
      'Tahaka an’i Gideona tao amin’ny Mpitsara 6:25, arodano ny alitara rehetra ao an-tranon-drainao izay miteny hanohitra ny taranakao, ka reseo amin’ny ran’i Jesosy ny sorona maizina rehetra (Hebreo 12:24). Ao an-tendrombohitra Ziona dia hisy fanafahana ka hahazo ny fananany ny taranak’i Jakoba (Obadia 1:17), ary mijoroa amin’ny Josoa 24:15 ho an’ny ankohonanao.',
    declaration_mg:
      'Reseko amin’ny ran’i Jesosy ny sorona maizina rehetra ! Alaiko amin’ny hery ny anjara-lalako marina, ny kintako ary ny ankohonako manontolo amin’ny anaran’i Jesosy !',
  },
  'v4-ch3': {
    title_mg: 'Vavahadin’ny Fihariana, Fahasalamana, Taona Voaverina & Faminaniana amin’ny Herinandro Efatra',
    mg_text:
      'Asandrato ny lohanareo ry vavahadin’ny fihariana (Salamo 24:7), rarào ny mpandany (Malakia 3:11), raiso ny fanasitranana amin’ny dian-kapoka tamin’i Jesosy (Isaia 53:5), avereno ny taona nohanin’ny valala (Joela 2:25), ary maminania amin’ny herinandro efatra : Herinandro 1 ho an’ny varavarana misokatra, Herinandro 2 ho an’ny hafainganam-pandeha, Herinandro 3 ho an’ny fijinjana, ary ny faran’ny volana ho an’ny fisaorana (Salamo 65:11).',
    declaration_mg:
      'Misokatra eo ambonin’ny fiainako ny varavaran’ny lanitra ! Herinandro voalohany : varavarana misokatra ; faharoa : hafainganam-pandeha ; fahatelo : fijinjana ; faran’ny volana : fankalazana sy fisaorana !',
  },
  'v5-ch1': {
    title_mg: 'Ny Anaran’ny Fanekena Jehovah Shammah : Mandeha Mialoha Anao Andriamanitra Hanome Fitsaharana',
    mg_text:
      'Ezekiela 48:35 dia manambara hoe : « Ny anaran’ny tanàna hatramin’izany andro izany dia Jehovah-shama (Jehovah no ao). » Deoteronomia 31:8 dia milaza fa Jehovah no mandeha eo alohanao sy momba anao. Ary Eksodosy 33:14 dia manamafy fa ny fanatrehany mialoha lalana anao dia mitondra tena fitsaharana fa tsy tebiteby.',
    declaration_mg:
      'Ambarako Jehovah Shammah eo ambonin’ny efitra rehetra hidirako anio ! Efa tonga mialoha ahy ao Andriamanitra, ary mandeha ao anatin’ny fitsaharany aho !',
  },
  'v5-ch2': {
    title_mg: 'Fanokanana ny Efitra Rehetra sy ny Lalana Mampifandray Azy Ireo eo Ambany Fiarovan’Andriamanitra',
    mg_text:
      'Maniraka an’i Jehovah Shammah hialoha lalana antsika isika any amin’ny efitry ny anjara-lalana (Ezekiela 37), ny resaka ao an-tokantrano (Josoa 24:15), ny fivoriana ara-bola (Deoteronomia 8:18), ny efitra fitsaboana (Eksodosy 15:26), ny efitrano fanadinana (Daniela 1:17), ary ny lalantsara sy arabe rehetra mampifandray azy ireo (Salamo 121:8), voaisy tombo-kase amin’ny tso-dranon’ny Nomery 6:24-26.',
    declaration_mg:
      'Jehovah Shammah dia ao amin’ny efitra rehetra alohan’ny hahatongavako, mandritra ny fotoana itoerako ao, ary aorian’ny fialako — ary miaro ny diako rehetra amin’ny anaran’i Jesosy Izy !',
  },
  'v6-ch1': {
    title_mg: 'Fikatsahana an’Andriamanitra amin’ny Fo Rehetra, Fandrodanana ny Sampy & Fifaliana Feno',
    mg_text:
      'Jeremia 29:13 dia mampanantena hoe : « Ary hitady Ahy ianareo ka hahita Ahy, raha katsahinareo amin’ny fonareo rehetra Aho. » Mibebaka isika amin’ny fikatsahana ny fanomezana mihoatra noho Ilay Mpanome. Amin’ny fanesorana ny sampin’ny fitiavan-tena sy ny fikirizan’i Jakoba (Genesisy 32:26) dia manatona an’Andriamanitra isika ka mahita fifaliana be eo anatrehany (Salamo 16:11).',
    declaration_mg:
      'Ray ô, mitady Anao amin’ny foko rehetra, ny fanahiko rehetra, ny saiko rehetra ary ny heriko rehetra aho ! Manatona Anao aho anio, ary eo anatrehanao no misy fifaliana feno sy fahafinaretana mandrakizay !',
  },
  'v7-ch1': {
    title_mg: 'Fisaorana Maraina, ny Sain’i Kristy, Fanolorana ny Fandaharam-potoana & ny Fiadian’Andriamanitra Rehetra',
    mg_text:
      'Mifoha amim-pisaorana isika noho ny famindram-po vaovao isa-maraina (Fitomaniana 3:22-23) sy ny ady tsy hita maso nandresen’Andriamanitra ho antsika. Mangataka fo madio (Salamo 51:10) sy fiadanana miaro ny saina (Filipiana 4:7) isika, manolotra ny asantsika, mivavaka ho an’ny fianakaviana sy ny mpitondra, ary mitafy ny fiadian’Andriamanitra rehetra (Efesiana 6:10-18).',
    declaration_mg:
      'Mitafy ny fiadian’Andriamanitra rehetra aho anio ! Voaro amin’ny fiadanany ny saiko, atolotro ho amin’ny sitrapony ny fandaharam-potoanako, ary alitaram-panompoana ny fiainako amin’ny anaran’i Jesosy !',
  },
  'v8-ch1': {
    title_mg: 'Vavaka Andininy Isan’andininy amin’ny Salamo 121 : Mpanao Ahy, Mpiaroko, Alokaloko ary Mpiambina Ahy',
    mg_text:
      '« Manopy ny masoko ho amin’ny tendrombohitra aho ; avy aiza ny famonjena ahy ? Ny famonjena ahy dia avy amin’i Jehovah, Mpanao ny lanitra sy ny tany. Tsy mba havelany hangozohozo ny tongotrao ; tsy mba rendrehana ny Mpiaro anao... Jehovah no Mpiaro anao ; Jehovah no alokalokao eo amin’ny ankavananao. Ny masoandro tsy mba hamely anao nony andro, na ny volana nony alina. Jehovah hiaro anao amin’ny ratsy rehetra ; hiaro ny fanahinao Izy. Jehovah hiaro anao, na mivoaka na miditra, hatramin’izao ka ho mandrakizay. »',
    declaration_mg:
      'Avy amin’i Jehovah Mpanao ny lanitra sy ny tany ny famonjena ahy ! Tsy mba rendrehana na matory Ilay Mpiaro ahy ; Izy no alokaloko eo amin’ny ankavanako ary miaro ny fivoahako sy ny fidirako mandrakizay !',
  },
  'v9-ch1': {
    title_mg: 'Fahavokarana, Fanafahana amin’ny Aretina, Fitarihana Marina, Famantarana ho amin’ny Soa & Olona Manana ny Maha-izy Azy',
    mg_text:
      'Ampitaina amin’ny teny arahin’ny finoana ny fitahiana : Hampitomboin’i Jehovah ny asan’ny tananao rehetra (Deoteronomia 30:9), hesoriny aminao ny aretina rehetra (Deoteronomia 7:15), hitarika anao mandrakariva tahaka ny saha vonton-drano Izy (Isaia 58:11), haneho famantarana hita maso ho amin’ny soa hahataperan’ny henatra (Salamo 86:17), ary hanome olona sy mpanampy manana ny maha-izy azy ho an’ny fiainanao (Isaia 43:4).',
    declaration_mg:
      'Mahita ahy amin’izao vanim-potoana izao ny fahavokarana ! Mandray fitarihana marina tahaka ny saha vonton-drano, famantarana ho amin’ny soa ary mpanampy avy amin’Andriamanitra aho amin’ny anaran’i Jesosy !',
  },
  'v9-ch2': {
    title_mg: 'Ny Tso-dranon’ny Mpisorona, Fitsanganan’ny Fiainam-bavaka, Harenan’ny Fanjakana & Fanomezana Telo Sosona',
    mg_text:
      'Eo ambanin’ny Nomery 6:24-26, mitahy sy miaro anao Jehovah, mampamirapiratra ny tavany aminao amin’ny fahasoavana ary manome anao fiadanana. Mitsangana amin’ny maty ny fiainam-bavaka sy ny hafanam-po ara-panahy ; ampidirin’Andriamanitra amin’ny tany lonaka ianao ho mpitantana mahatoky ny harenan’ny Fanjakana (Salamo 66:12), ary omeny anao ny fahasoavana telo sosona : Fankasitrahana, Famantarana sy Fahagagana, ary ny Akanjon’ny Voninahitra !',
    declaration_mg:
      'Mitahy ahy sy miaro ahy Jehovah, mampamirapiratra ny tavany amiko Izy ka manome ahy fiadanana ! Raisiko ny fanomezana telo sosona : Fahasoavana, Famantarana sy Fahagagana, ary ny Akanjon’ny Voninahitra amin’ny anaran’i Jesosy !',
  },
};

export const PRAYER_CARD_MG_MAP: Record<string, PrayerCardMalagasyTranslation> = {
  'pr-1': {
    categoryLabel_mg: 'Fiambenana Maraina',
    title_mg: 'Fibaikoana ny Vavahadin’ny Maraina',
    scriptureQuote_mg: '« Moa mba efa nandidy ny maraina va ianao hatrizay niainanao, na nanondro ny fitoeran’ny mazava atsinanana, mba hisamborany ny sisin’ny tany, ka hohetezana hiala aminy ny ratsy fanahy ? »',
    prayerText_mg:
      'Ray any an-danitra ô, mifoha alohan’ny hiposahan’ny masoandro aho handamina ny fivavako eo anatrehanao (Salamo 5:3). Raisiko ny sisin’ity maraina ity sy ny vazan-tany efatra amin’ity andro ity. Ahifikifiko hiala amin’ny fandaharam-potoanako izay loza, vaovao ratsy ary fandrika rehetra nomanin’ny maizina.',
    decree_mg: 'Ambarako fa an’i Jehovah ity maraina ity ! Ny masoandro tsy hamely ahy nony andro na ny volana nony alina, ary ny zavaboary rehetra dia miasa ho amin’ny fandreseko anio !',
  },
  'pr-2': {
    categoryLabel_mg: 'Fanoloran-tena & Anaran’i Jesosy',
    title_mg: 'Fiantsoana ny Tilikambo Mafy dia ny Anaran’i Jesosy',
    scriptureQuote_mg: '« Ny anaran’i Jehovah dia tilikambo mafy ; ny marina miezaka ho ao ka voavonjy. »',
    prayerText_mg:
      'Jesosy Tompo ô, ny Anaranao no tononiko voalohany amin’ity maraina ity. Miazakazaka miditra ao amin’ny Tilikambo Mafin’ny Anaranao aho. Ianao no Mpanefy tanimanga ary izaho no tanimanga eo an-tananao ; ampianaro aho hitoetra ao Aminao tahaka ny sampana ao amin’ny Tena Voaloboka (Jaona 15:5).',
    decree_mg: 'Amin’ny Anaran’i Jesosy, voavonjy sy voasandratra aho anio ! Mitoetra ao amin’ny Tena Voaloboka aho ary mamoa voa maharitra amin’ny zavatra rehetra ataoko !',
  },
  'pr-3': {
    categoryLabel_mg: 'Fanambarana Apostolika',
    title_mg: 'Faharavan’ny Vavahady Vy Manakana ny Fahitana Anao',
    scriptureQuote_mg: '« Rehefa tonga teo amin’ny vavahady vy izay mivoaka ho any an-tanàna izy ireo, dia nisokatra ho azy tamin’ny tenany ihany izany. »',
    prayerText_mg:
      'Ray ô, Ianao no ampinga manodidina ahy, voninahitro ary Mpanandratra ny lohako (Salamo 3:3). Manatona ireo vavahady vy rehetra izay nanakana ny fandrosoako sy ny fahitana ny asako aho anio miaraka amin’ny fanatrehan’ny anjelinao.',
    decree_mg: 'Amin’ny anaran’i Jesosy, tsy misy mahazaka ny lohako hiondrika intsony ! Misokatra ho azy ny vavahady vy rehetra eo anoloako izao ankehitriny izao !',
  },
  'pr-4': {
    categoryLabel_mg: 'Ady Ara-panahy & Fanafahana',
    title_mg: 'Fandoroana ny Alitara Ratsy & Famonoana ny Sora-tanan’ny Razana',
    scriptureQuote_mg: '« Novonoiny ny sora-tanana izay niampanga antsika tamin’ny didy... ka nohomboany teo amin’ny hazofijaliana izany. »',
    prayerText_mg:
      'Ray ô, amin’ny alalan’ny ran’i Jesosy izay miteny tsara lavitra noho ny ran’i Abela (Hebreo 12:24), dia manafoana ny fanekena sy ny ozona rehetra avy amin’ny razana izay miteny hanohitra ny anjara-lalako aho.',
    decree_mg: 'May amin’ny afon’Andriamanitra ny alitara ratsy rehetra ! Voafafa amin’ny ran’i Jesosy ny sora-tanana rehetra nanohitra ahy, ary mijanona eo am-baravarako ny ozona nolovaina !',
  },
  'pr-5': {
    categoryLabel_mg: 'Mpanampy amin’ny Anjara-lalana',
    title_mg: 'Ny Fanompoan’ireo Mpanampy & Ny Latabatr’i Mefiboseta',
    scriptureQuote_mg: '« Ary ny vahiny hitsangana hiandry ny ondrinareo, ary ny hafa firenena ho mpiasa tany sy mpamboatra voaloboka ho anareo. »',
    prayerText_mg:
      'Tompo ô, tahaka ny nahatsiarovan’i Davida Mpanjaka an’i Mefiboseta tany Lo-debara noho ny fanekena tamin’i Jonatana (2 Samoela 9:7), dia manangàna mpanampy mahatoky avy amin’ny vazan-tany rehetra hanohana ny vina nomenao ahy.',
    decree_mg: 'Miala amin’i Lo-debara aho ka mipetraka eo amin’ny latabatry ny Mpanjaka ! Mitsangana ny vahiny sy ny mpanampy avy amin’Andriamanitra hanohana sy hampandroso ny antsoko !',
  },
  'pr-6': {
    categoryLabel_mg: 'Ankohonana & Fanambadiana',
    title_mg: 'Fiarovana ny Ankohonana & Famerenana ny Divain’ny Fanambadiana',
    scriptureQuote_mg: '« Izaho hiady amin’izay miady aminao, ary Izaho hamonjy ny zanakao. »',
    prayerText_mg:
      'Ray ô, araka ny Josoa 24:15 sy Isaia 49:25, apetrako eo ambany ran’i Jesosy ny vadiko, ny zanako ary ny fianakaviako manontolo. Diovy amin’ny fisarahana sy ny fifandirana ny tokantranonay ary ataovy divay tsara indrindra ny fitiavanay.',
    decree_mg: 'Izaho sy ny ankohonako dia hanompo an’i Jehovah ! Ny zanako dia famantarana sy fahagagana (Isaia 8:18) ary feno fiadanana sy fifaliana ny tokantranoko !',
  },
  'pr-7': {
    categoryLabel_mg: 'Fihariana & Vavahady Misokatra',
    title_mg: 'Fitenenana Mafy ny Mpandany & Fanokafana ny Vavahady Varahina',
    scriptureQuote_mg: '« Ary horarako ny mpandany noho ny aminareo, ka tsy hanimba ny vokatry ny taninareo intsony izy. »',
    prayerText_mg:
      'Tompo ô, Ianao no manome hery hahazoana harena hanorenana ny fanekenao (Deoteronomia 8:18). Rarào ny mpandany ny volako sy ny fisasarako, ary ampitsangano ny lohan’ny vavahadin’ny fihariana rehetra (Salamo 24:7).',
    decree_mg: 'Voarara amin’ny anaran’i Jesosy ny mpandany ! Misokatra eo ambonin’ny asan’ny tanako ny varavaran’ny lanitra ka hindrana ny firenena maro aho fa tsy mba hindrana !',
  },
  'pr-8': {
    categoryLabel_mg: 'Fanasitranana & Fahasalamana',
    title_mg: 'Fanongotana ny Aretina & Fanambarana Fahasalamana avy amin’Andriamanitra',
    scriptureQuote_mg: '« Fa hampody ny fahasalamanao Aho sy hanasitrana ny ferinao, hoy Jehovah. »',
    prayerText_mg:
      'Jehovah Rafa ô, amin’ny dian-kapoka tamin’i Jesosy no efa nahasitranana anay (Isaia 53:5). Ongotako hatramin’ny fakany izay zava-maniry ratsy sy aretina rehetra tsy nambolen’ny Raiko any an-danitra ao amin’ny vatako (Matio 15:13).',
    decree_mg: 'Tempolin’ny Fanahy Masina ny tenako ! Tsy ho faty aho fa ho velona ka hitantara ny asan’i Jehovah (Salamo 118:17), ary mandeha amin’ny fahasalamana feno aho !',
  },
  'pr-9': {
    categoryLabel_mg: 'Hafainganam-pandeha & Famerenana',
    title_mg: 'Hafainganam-pandeha Mahagaga & Famerenana ny Taona Very',
    scriptureQuote_mg: '« Ary honerako ho anareo ny taona izay nohanin’ny valala... »',
    prayerText_mg:
      'Tompo ô, araka ny Joela 2:25 sy 1 Mpanjaka 18:46, avereno avo fito heny ireo taona sy fahafahana rehetra nangalarin’ny fahavalo. Aoka hipetraka amiko ny tanan’i Jehovah mba hihazakazahako hihoatra ny kalesin’i Ahaba.',
    decree_mg: 'Voaverina avo fito heny ny taona very rehetra ! Mandray ny hafainganam-pandehan’i Elia aho ka mahavita ao anatin’ny taona iray izay ilain’ny hafa folo taona !',
  },
  'pr-10': {
    categoryLabel_mg: 'Fiarovana & Manda Afo',
    title_mg: 'Fanekena Fiarovana & Manda Afon’i Jehovah',
    scriptureQuote_mg: '« Fa Izaho, hoy Jehovah, ho manda afo manodidina azy, ary ho voninahitra ao afovoany. »',
    prayerText_mg:
      'Ray ô, manao fanekena amin’ny vato any an-tsaha aho (Joba 5:23) ary mialokaloka ao ambanin’ny elatry ny Tsitoha (Salamo 91). Hodidino manda afo aho, ny ankohonako ary ny fananako rehetra.',
    decree_mg: 'Manda afo manodidina ahy Jehovah ! Ny fiadiana rehetra voaforona hamelezana ahy dia tsy hisy hambinina, ary manitsaka bibilava sy maingoka amin’ny fahefan’i Kristy aho !',
  },
  'pr-11': {
    categoryLabel_mg: 'Fifonana ho an’ny Firenena',
    title_mg: 'Fifonana Sacerdotaly ho an’ny Firenena amim-Paharanitan-tsaina Ara-panahy',
    scriptureQuote_mg: '« Mangataha fiadanana ho an’i Jerosalema : aoka hambinina izay tia anao. »',
    prayerText_mg:
      'Tompo ô, mijoro tahaka an’i Estera sy Daniela izahay hivavaka amim-paharanitan-tsaina ara-panahy ho an’ny firenenay. Ampanjakao ny fiadanana, ny rariny, ny fahendrena eo amin’ny mpitondra ary ny fifohazam-panahy lehibe.',
    decree_mg: 'Ambarako ny fiadanana sy ny fahamarinana eo amin’ny firenenay ! Misokatra ho an’ny Filazantsara sy ny fandrosoana ny vavahadin’ny tanindrazanay !',
  },
  'pr-12': {
    categoryLabel_mg: 'Fanitarana & Voninahitra',
    title_mg: 'Ny Fanitarana an’i Jabeza & Ny Akanjon’ny Fanomezam-boninahitra',
    scriptureQuote_mg: '« Enga anie ka hitahy ahy tokoa Ianao ka hampitombo ny faritro, ary ho amiko anie ny tananao ! »',
    prayerText_mg:
      'Andriamanitry ny Isiraely ô, tahio tokoa aho ka ampitomboy amin’ny vazan-tany efatra ny faritro (1 Tantara 4:10), ary apetraho eo amiko ny akanjon’ny fanomezam-boninahitra (Nomery 27:20) izay mamafa ny latsa rehetra.',
    decree_mg: 'Miitatra any Avaratra, Atsimo, Atsinanana ary Andrefana ny faritro ! Mitafy ny akanjon’ny fanomezam-boninahitra sy ny fankasitrahana aho amin’ny anaran’i Jesosy !',
  },
};

export const DEVOTIONAL_MG_MAP: Record<string, DevotionalMalagasyTranslation> = {
  'dev-1': {
    dayLabel_mg: 'Torolalana Fandinihan-tena 1 • Video 1',
    title_mg: 'Ny Zava-miafina amin’ny Fibaikoana ny Fiambenana Maraina',
    subtitle_mg: ' ny antony hitsanganan’ny mpino manana faharanitan-tsaina ara-panahy alohan’ny masoandro mba hamolavola ny androny.',
    anchorVerse_mg:
      '« Moa mba efa nandidy ny maraina va ianao hatrizay niainanao, na nanondro ny fitoeran’ny mazava atsinanana, mba hisamborany ny sisin’ny tany, ka hohetezana hiala aminy ny ratsy fanahy ? » — Joba 38:12-13',
    meditation_mg: [
      'Ao amin’ny Soratra Masina, ny maraina dia tsy fotoana eo amin’ny famantaranandro fotsiny fa vavahady ara-panahy. Isa-maraina dia miposaka miandry baiko ny andro. Raha mangina ny olon’Andriamanitra, dia ny fahavalo no mamafy tsimparifary ao anatin’ny fandaharam-potoanan’ny olona (Matio 13:25).',
      'Rehefa mifoha alohan’ny masoandro ianao ka mandahara ny fivavanao tahaka ny zana-tsipìka (Salamo 5:3), dia raisinao ny sisin’ny maraina ka ahifikifikao hiala ny fandrika sy ny loza rehetra. Amin’ny fiambenana maraina koa no nijeren’i Jehovah ny tobin’ny Egyptiana avy tao amin’ny andry afo ka nampikorontanany ny mpanenjika (Eksodosy 14:24).',
      'Ny fibaikoana ny maraina dia mitaky fahasahiana entin’ny fanosorana (Isaia 10:27) sy fiankinana amin’ny ran’i Jesosy izay miteny mafy kokoa noho ny alitara rehetra (Hebreo 12:24).',
    ],
    reflectionPrompts_mg: [
      'Inona no teny voalohany aloaky ny vavanao rehefa mifoha isa-maraina ianao ?',
      'Aiza ireo sehatra eo amin’ny fianakavianao na ny asanao izay mila ny fijerin’Andriamanitra avy ao amin’ny andry afo anio ?',
      'Ahoana no fomba ametrahanao manda afo (Zakaria 2:5) manodidina ny ankohonanao alohan’ny hivoahana ny trano ?',
    ],
    closingPrayer_mg:
      'Ray ô, misaotra Anao aho noho ny fahefana nomenao ahy amin’ny Anaran’i Jesosy hibaiko ny maraina. Manomboka anio dia tsy havelako handeha ho azy intsony ny androko, fa hosatrohako amin’ny Teninao, ny ran’i Jesosy ary ny afon’ny Fanahy Masina ny maraina rehetra. Amena.',
  },
  'dev-2': {
    dayLabel_mg: 'Torolalana Fandinihan-tena 2 • Video 2',
    title_mg: 'Ny Fitoerana ao amin’ny Voaloboka & Ny Fahefan’ny Anaran’i Jesosy',
    subtitle_mg: 'Ny fampifangaroana ny fahefana amin’ny vavaka sy ny fanetren-tena feno eo am-pelatanan’ny Mpanefy tanimanga.',
    anchorVerse_mg:
      '« Izaho no voaloboka, ianareo no sampana. Izay mitoetra amiko, ary Izaho aminy, dia izy no mamoa be ; fa raha misaraka amiko kosa ianareo, dia tsy mahay manao na inona na inona. » — Jaona 15:5',
    meditation_mg: [
      'Ny hery ara-panahy marina dia miorina amin’ny fifandraisana lalina amin’i Jesosy. Ny Anaran’i Jesosy dia Tilikambo Mafy (Ohabolana 18:10), kanefa ny tsiambaratelon’ny famoazana voa maharitra dia ny fitoerana tsy tapaka ao Aminy tahaka ny sampana ao amin’ny voaloboka.',
      'Rehefa manaiky ho tanimanga eo an-tanan’ny Mpanefy isika isa-maraina (Isaia 64:8), dia manaisotra ny fanahiana momba ny ampitso ka mandray ny fahasoavana izay tanterahina ao anatin’ny fahalementsika (2 Korintiana 12:9).',
      'Avy ao amin’izany fitoerana feno fiadanana izany no iantsoantsika an’i Jesosy ho Mpamatsy (Filipiana 4:19), Mpanasitrana (Isaia 53:5) ary Fahazavana mamirapiratra amin’ny manodidina antsika (Matio 5:13-16).',
    ],
    reflectionPrompts_mg: [
      'Inona no tebiteby na enta-mavesatra tokony hatolotrao eo an-tanan’ny Mpanefy tanimanga anio maraina ?',
      'Ahoana no fomba iambenanao ny fonao sy ny lelanao (Ohabolana 4:23, Efesiana 4:29) mandritra ny fotoana sarotra ?',
      'Iza amin’ny manodidina anao no mila ny fifonanao sy ny teny fankaherezana avy aminao anio ?',
    ],
    closingPrayer_mg:
      'Jesosy Tompo ô, Ianao no Tena Voaloboka ary izaho no sampana. Ampianaro aho hitoetra lalina ao amin’ny fitiavanao sy ny Teninao anio, mba hahitan’izao tontolo izao ny fahasoavanao sy ny fiadananao amin’ny alalan’ny fiainako. Amena.',
  },
  'dev-3': {
    dayLabel_mg: 'Torolalana Fandinihan-tena 3 • Video 3',
    title_mg: 'Faharanitan-tsaina Ara-panahy : Ny Fomba Amoronan’ny Teny Ara-paminaniana ny Zava-misy',
    subtitle_mg: 'Fahatakarana ny lalàna ara-panahy mifehy ny fanandratana, ny hafainganam-pandeha, ny mpanampy ary ny akanjon’ny voninahitra.',
    anchorVerse_mg:
      '« ... Ilay manome aina ny maty sy miantso ny tsy misy ho tahaka ny misy. » — Romana 4:17',
    meditation_mg: [
      'Ny Apostoly Joshua Selman dia mampianatra antsika fa ny iraka ampanaovina antsika dia ny mivavaka tahaka ny mpino manana Faharanitan-tsaina Ara-panahy (Spiritual Intelligence). Ny teny ara-paminaniana dia tsy milaza fotsiny izay hitranga fa mamorona ny hoavy araka ny sitrapon’Andriamanitra.',
      'Rehefa manambara ny Soratra Masina amim-pinoana isika, dia misokatra ho azy ny vavahady vy (Asan’ny Apostoly 12:10), omena antsika ny hafainganam-pandehan’i Elia (1 Mpanjaka 18:46), ary antsoina avy any Lo-debara ho eo amin’ny latabatry ny Mpanjaka tahaka an’i Mefiboseta isika (2 Samoela 9).',
      'Ambonin’izany rehetra izany, aza avela hangalarin’ny fahatezerana ny fifalianao (Isaia 12:3), ary raiso amim-pinoana ny Akanjon’ny Fanomezam-boninahitra (Nomery 27:20) izay mamafa ny latsa rehetra.',
    ],
    reflectionPrompts_mg: [
      'Inona ilay « vavahady vy » teo amin’ny fiainanao na ny asanao izay ijoroanao amim-pinoana mba hisokatra ho azy anio ?',
      'Ahoana no fomba iarovanao ny fifalianao tsy ho voaroban’ny fahatezerana mba hantsakanao rano amin’ny loharanon’ny famonjena ?',
      'Ahoana no fomba ivavahanao amim-paharanitan-tsaina ara-panahy ho an’ny firenenao sy ny taranakao ?',
    ],
    closingPrayer_mg:
      'Ray ô, omeo ahy ny fanahin’ny fahendrena sy ny faharanitan-tsaina ara-panahy. Ampiasao ny vavako hanambara ny Teninao amim-pinoana mba hamorona fiadanana, fandrosoana ary voninahitra ho an’ny Fanjakanao, amin’ny anaran’i Jesosy Kristy. Amena.',
  },
};

export const SCRIPTURE_MG_MAP: Record<string, ScriptureMalagasyTranslation> = {
  'scr-1': {
    reference_mg: 'Joba 38:12-13',
    theme_mg: 'Fibaikoana ny Mangiran-dratsy sy ny Maraina',
    mg_text:
      '« Moa mba efa nandidy ny maraina va ianao hatrizay niainanao, na nanondro ny fitoeran’ny mazava atsinanana, mba hisamborany ny sisin’ny tany, ka hohetezana hiala aminy ny ratsy fanahy ? »',
    application_mg: 'Manome fahefana ny mpino hifoha alohan’ny masoandro ka hibaiko ny maraina sy hanintsana ny ratsy fanahy hiala amin’ny androny.',
  },
  'scr-2': {
    reference_mg: 'Salamo 5:3 & Eksodosy 14:24',
    theme_mg: 'Ny Fivavaka amin’ny Fiambenana Maraina',
    mg_text:
      '« Jehovah ô, ny maraina no handrenesanao ny feoko ; ny maraina no handaharako ny fivavako aminao ka hiandrasako... Ary tamin’ny fiambenana maraina dia nijery ny tobin’ny Egyptiana Jehovah avy tao amin’ny andry afo sy rahona ka nampikorontana ny tobin’ny Egyptiana. »',
    application_mg: 'Mandahara ny fivavaka tahaka ny zana-tsipìka isa-maraina mba hidiran’Andriamanitra an-tsehatra amin’ny andry afo.',
  },
  'scr-3': {
    reference_mg: 'Isaia 10:27 & Isaia 49:24-26',
    theme_mg: 'Zioga Potiky ny Fanosorana & Fanafahana ny Babo',
    mg_text:
      '« Ary amin’izany andro izany dia ho afaka amin’ny sorokao ny entany, ary ny ziogany ho afaka amin’ny tendanao, ary ho potika ny zioga noho ny fanosorana... Fa Izaho hiady amin’izay miady aminao, ary Izaho hamonjy ny zanakao. »',
    application_mg: 'Manapotika tanteraka ny ziogan’ny fahatarana sy ny fanandevozana amin’ny alalan’ny fanosoran’ny Fanahy Masina.',
  },
  'scr-4': {
    reference_mg: 'Ohabolana 18:10 & Filipiana 2:9-11',
    theme_mg: 'Ny Tilikambo Mafy amin’ny Anaran’i Jesosy',
    mg_text:
      '« Ny anaran’i Jehovah dia tilikambo mafy ; ny marina miezaka ho ao ka voavonjy... Koa izany no nanandratan’Andriamanitra Azy indrindra sy nanomezany Azy ny anarana izay ambony noho ny anarana rehetra. »',
    application_mg: 'Mialokaloka ao amin’ny Anaran’i Jesosy ho fiarovana sy fandresena amin’ny fiandohan’ny andro.',
  },
  'scr-5': {
    reference_mg: 'Jaona 15:5 & Isaia 64:8',
    theme_mg: 'Fitoerana ao amin’ny Tena Voaloboka & Ny Tanan’ny Mpanefy',
    mg_text:
      '« Izaho no voaloboka, ianareo no sampana. Izay mitoetra amiko, ary Izaho aminy, dia izy no mamoa be... Izahay dia tanimanga, ary Ianao no Mpanefy anay. »',
    application_mg: 'Fanoloran-tena feno sy fitoerana ao amin’i Kristy mba hamoazana voa maharitra.',
  },
  'scr-6': {
    reference_mg: 'Salamo 3:3 & Asan’ny Apostoly 12:10',
    theme_mg: 'Mpanandratra ny Lohako & Ny Vavahady Vy Misokatra Ho Azy',
    mg_text:
      '« Fa Ianao, Jehovah ô, no ampinga manodidina ahy, voninahitro sy Mpanandratra ny lohako... Rehefa tonga teo amin’ny vavahady vy izy ireo, dia nisokatra ho azy tamin’ny tenany ihany izany. »',
    application_mg: 'Fanambarana fanandratana sy fisokafan’ny vavahady vy rehetra izay nanakana ny fandrosoana.',
  },
  'scr-7': {
    reference_mg: 'Salamo 125:3',
    theme_mg: 'Fahatapahan’ny Tehin’ny Ratsy Fanahy',
    mg_text:
      '« Fa ny tehin’ny faharatsiana tsy havela hitoetra eo amin’ny lovan’ny marina, fandrao ny marina haninjitra ny tanany ho amin’ny faharatsiana. »',
    application_mg: 'Fandavana ny hitoeran’ny aretina, ny ozona na ny fahantrana eo amin’ny lovan’ny ankohonanao.',
  },
  'scr-8': {
    reference_mg: 'Joba 5:19-23',
    theme_mg: 'Fanekena amin’ny Vato any an-tsaha',
    mg_text:
      '« Amin’ny enina no hamonjeny anao, eny, amin’ny fito aza dia tsy hisy loza hihatra aminao... Fa manao fanekena amin’ny vato any an-tsaha ianao, ary ny bibi-dia koa aza dia hihavana aminao. »',
    application_mg: 'Fiarovana amin’ny fanekena izay miantoka fa tsy misy zavaboary azo ampiasaina hamely anao.',
  },
  'scr-9': {
    reference_mg: 'Isaia 61:1-5',
    theme_mg: 'ravaka ho solon’ny Lavenona & Vahiny Hiandry ny Ondrinao',
    mg_text:
      '« Hanome azy ravaka ho solon’ny lavenona, sy diloilo fifaliana ho solon’ny fahalahelovana... Ary ny vahiny hitsangana hiandry ny ondrinareo. »',
    application_mg: 'Andriamanitra manangana mpanampy tsyampoizina hanohana sy hampandroso ny asanao.',
  },
  'scr-10': {
    reference_mg: 'Kolosiana 2:14-15',
    theme_mg: 'Famonoana ny Sora-tanana Nanohitra Antsika',
    mg_text:
      '« Ary novonoiny ny sora-tanana izay niampanga antsika tamin’ny didy, izay nanohitra antsika, ka nesoriny tsy ho eo mba ho voahombo teo amin’ny hazofijaliana ; ary rehefa nesoriny ny fanapahana sy ny fahefana, dia nasehony niharihary izany. »',
    application_mg: 'Fanafoanana amin’ny alalan’ny hazofijalian’i Kristy ny fanekena sy ny ozona rehetra avy amin’ny razana.',
  },
  'scr-11': {
    reference_mg: 'Obadia 1:15, 17',
    theme_mg: 'Fahazoana ny Fananana & Valin-kasasarana Marina',
    mg_text:
      '« Araka izay nataonao no hatao aminao ; ny valin’ny nataonao dia hiverina eo an-dohanao... Fa ao an-tendrombohitra Ziona dia hisy sisa afaka, ary ho masina izy ; ary ny taranak’i Jakoba hahazo ny fananany. »',
    application_mg: 'Firosoana avy amin’ny fanafahana ho amin’ny famerenana tanteraka ny lova sy ny voninahitra nangalarina.',
  },
  'scr-12': {
    reference_mg: 'Joela 2:25 & 1 Mpanjaka 18:46',
    theme_mg: 'Famerenana ny Taona Very & Hafainganam-pandeha avy amin’Andriamanitra',
    mg_text:
      '« Ary honerako ho anareo ny taona izay nohanin’ny valala... Ary ny tanan’i Jehovah dia tao amin’i Elia, ka nisikina izy ary nihazakazaka nialoha an’i Ahaba. »',
    application_mg: 'Famintinana ny fotoana — mahavita ao anatin’ny taona iray izay ilain’ny hafa folo taona noho ny tanan’i Jehovah.',
  },
  'scr-13': {
    reference_mg: '2 Tesaloniana 3:16',
    theme_mg: 'Fiadanana Mandrakariva sy Amin’ny Lafiny Rehetra',
    mg_text:
      '« Ary ny Tompon’ny fiadanana anie hanome anareo fiadanana mandrakariva amin’ny lafiny rehetra. Ny Tompo anie ho aminareo rehetra. »',
    application_mg: 'Fitakiana ny fiadanan’Andriamanitra eo amin’ny lafiny rehetra amin’ny fiainana.',
  },
  'scr-14': {
    reference_mg: 'Zakaria 2:5 & Isaia 54:17',
    theme_mg: 'Manda Afo & Fanamelohana ny Lela Ratsy Rehetra',
    mg_text:
      '« Fa Izaho, hoy Jehovah, ho manda afo manodidina azy... Ny fiadiana rehetra izay voaforona hamelezana anao dia tsy hisy hambinina ; ary ny lela rehetra izay mitsangana hifandahatra aminao dia resenao lahatra. »',
    application_mg: 'Fanodidinana ny ankohonana amin’ny manda afo sy fampiasana ny fahefan’ny mpanompon’i Jehovah.',
  },
  'scr-15': {
    reference_mg: 'Nomery 27:18-20 & 1 Tantara 4:10',
    theme_mg: 'Fanitarana ny Faritr’i Jabeza & Ny Akanjon’ny Fanomezam-boninahitra',
    mg_text:
      '« Ary omeo azy ny sasany amin’ny voninahitrao, mba heken’ny fiangonan’ny Zanak’Isiraely rehetra izy... Enga anie ka hitahy ahy tokoa Ianao ka hampitombo ny faritro ! »',
    application_mg: 'Fandraisana fanitarana amin’ny vazan-tany efatra sy ny akanjon’ny fanomezam-boninahitra izay mamafa ny latsa.',
  },
};

export const PLAYLIST_MG_MAP: Record<string, { title_mg: string; description_mg: string }> = {
  PLaptSPguGlRafSbwyTRdhKBc9axh9znP7: {
    title_mg: 'Playlist 1 : VAVAKA MAHERY VAIKA MIARAKA AMIN’NY APOSTOLY JOSHUA SELMAN | VAVAKA MARAINA & ALINA',
    description_mg: 'Vavaka ady ara-panahy, fibaikoana ny maraina, fandrodanana alitara ary famerenana amin’ny misasakalina.',
  },
  'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz': {
    title_mg: 'Playlist 2 : Vavaka Maraina — Fanangonana Vavaka Fandinihan-tena Grace Enclave',
    description_mg: 'Vavaka maraina feno Soratra Masina mifantoka amin’ny Anaran’i Jesosy, ny fikatsahana an’Andriamanitra amin’ny fo manontolo, ny fiadian’Andriamanitra ary ny Salamo 121.',
  },
  'PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs': {
    title_mg: 'Playlist 3 : Fanambarana Maraina Miaraka amin’ny Apostoly Joshua Selman — Overcoming Daily',
    description_mg: 'Fanambarana apostolika maraina (6:30 sy 6:45 maraina) mitondra fanandratana, fahasoavana, fiarovana, fanitarana an’i Jabeza ary ny akanjon’ny voninahitra.',
  },
};

export const TRACK_MG_MAP: Record<string, { title_mg: string; summary_mg: string }> = {
  '4YElIs15_Ak': {
    title_mg: '[MAHERY VAIKA 🔥] FEHEZO AMIN’NY FANDRESENA TANTERAKA NY ANDRONAO AMIN’NY FANAMBARANA IRETO VAVAKA MAHERY IRETO | JOSHUA SELMAN',
    summary_mg: 'Video Voalohany Nangatahana — Boky torolalana misy toko 14 momba ny fibaikoana ny maraina sy ny misasakalina (Joba 38:12-13, Estera 7:10, Isaia 54:17).',
  },
  HQzfk0DMgCo: {
    title_mg: 'MITENENA AFO AO AMIN’NY VOLANA VAOVAO ALOHAN’NY HITENENAN’NY FAHAVALO | APOSTOLY JOSHUA SELMAN',
    summary_mg: 'Fitenenana voalohany any amin’ny fitsaran’ny lanitra ho an’ny volana vaovao, fanapotehana zioga ary faminaniana amin’ny herinandro 4.',
  },
  ZSKymClHnzE: {
    title_mg: 'JEHOVAH SHAMMAH, ILAY ANDRIAMANITRA AO, MANDEHANA MIALOHA AHY ANY AMIN’NY EFITRA REHETRA HIDIRAKO ANIO ! | JOSHUA SELMAN',
    summary_mg: 'Fampianarana sy vavaka ao amin’ny Ezekiela 48:35 sy Deoteronomia 31:8 maniraka ny fanatrehan’Andriamanitra hialoha lalana anao anio.',
  },
  '5SHUzMacfkY': {
    title_mg: 'AMPY IZAY : TAPITRA NY ANDRO RATSINAO HOY JEHOVAH | JOSHUA SELMAN',
    summary_mg: 'Famaritana ara-paminaniana ny fiafaran’ny fahoriana, ny fijanonana amin’ny toerana iray ary ny alahelo miverimberina.',
  },
  GK5VrH2nm1g: {
    title_mg: 'ANDRIAMANITR’I JABEZA Ô, HENOY NY FITARAINKO ANIO KA VONJEO AHO | APOSTOLY JOSHUA SELMAN',
    summary_mg: 'Antso ao amin’ny 1 Tantara 4:9-10 ho amin’ny fitahiana, ny fanitarana ny faritra ary ny fiarovana amin’ny ratsy.',
  },
  ErYYar3kjYA: {
    title_mg: 'VAVAKA MARAINA MAHERY 45 MINITRA AMIN’NY SALAMO 120 HANOMBOHANA NY ANDRONAO | JOSHUA SELMAN',
    summary_mg: 'Fanafahana amin’ny molotra mandainga sy ny lela mamitaka (Salamo 120).',
  },
  iR_oqgunPkg: {
    title_mg: 'VAVAKA SY FANAMBARANA MAHERY HIBAIKOANA NY MARAINA | JOSHUA SELMAN',
    summary_mg: 'Fanambarana maraina mitondra fanjakana sy fandresena mandritra ny tontolo andro.',
  },
  TuquWlqxk0A: {
    title_mg: 'VAVAKA MARAINA MAHERY MANDRAKOTRA NY ANDRONAO AMIN’NY RAN’I JESOSY | JOSHUA SELMAN',
    summary_mg: 'Fandrakofana ny ankohonana, ny lalana, ny toeram-piasana ary ny fahasalamana amin’ny ran’i Jesosy.',
  },
  CK9rP2ZBGKg: {
    title_mg: 'Mitadiava an’Andriamanitra amin’ny Fonao Rehetra dia Hahita ny Fahagagany eo amin’ny Fiainanao Ianao | Vavaka Maraina',
    summary_mg: 'Laharana #1 ao amin’ny Playlist 2 — Vavaka ao amin’ny Jeremia 29:13 ho amin’ny fikatsahana an’Andriamanitra amin’ny fo manontolo.',
  },
  XWBUBtEv70A: {
    title_mg: 'Antsoy ny Anaran’i Jesosy dia Jereo Andriamanitra Miasa Anio | Vavaka Maraina',
    summary_mg: 'Video Faharoa Nangatahana (Laharana #2) — Fandinihan-tena misy fizarana 6 miantso ny Tilikambo Mafin’ny Anaran’i Jesosy.',
  },
  zPOULLgPjYc: {
    title_mg: 'Vavaka Maraina Mahery 13 Minitra Miaraka amin’Andriamanitra Hanombohana Tsara ny Andronao | Vavaka Maraina',
    summary_mg: 'Laharana #3 ao amin’ny Playlist 2 — Fanokanan-tena maraina, sain’i Kristy ary ny fiadian’Andriamanitra rehetra.',
  },
  Zvk_jzAsoi8: {
    title_mg: 'Salamo 121 : Vavaka Maraina ho an’ny Fiarovana sy ny Filaminana | Vavaka Maraina Voatahy',
    summary_mg: 'Laharana #4 ao amin’ny Playlist 2 — Vavaka andininy isan’andininy amin’ny Salamo 121:1-8 ho an’ny fiarovana.',
  },
  AKCFsUsqNnw: {
    title_mg: 'Vavaka Manokana ho an’ny Fandresena sy Vahaolana avy amin’Andriamanitra | Vavaka Maraina amin’ny Fotoan-tsarotra',
    summary_mg: 'Fankaherezana sy fifonana ho an’ny vahaolana mahagaga ao anatin’ny fizahan-toetra.',
  },
  '1YJW4-7hokQ': {
    title_mg: 'Vavaka Maraina Hanombohana ny Andro Miaraka amin’Andriamanitra | Fitahiana sy Fiarovana Isan’andro',
    summary_mg: 'Fitahiana sy fiarovana ny tokantrano, ny asa ary ny fifandraisana.',
  },
  LvN2AUymW24: {
    title_mg: 'Vavaka ao Anatin’ny Ady sy ny Fanaintainana | Fahalalana fa Tsy Irery Ianao eo Anatrehan’Andriamanitra',
    summary_mg: 'Fampiononana avy amin’ny Rain’ny famindram-po rehetra ao anatin’ny fotoana mangidy.',
  },
  'fsYF-nMzJbM': {
    title_mg: 'Tompo ô, Fenoy ny Fanahy Masinao Aho ary Tariho ho amin’ny Marina Rehetra Anio',
    summary_mg: 'Fiantsoana ny Fanahy Masina hanome fahendrena, fahaiza-manavaka ary fahamasinana.',
  },
  '45wUm7wffBQ': {
    title_mg: '6:45 MARAINA #vavaka FANAMBARANA MARAINA 10 MAHERY VAIKA MIARAKA AMIN’NY APOSTOLY JOSHUA SELMAN',
    summary_mg: 'Video Fahatelo Nangatahana — Fanambarana Maraina Apostolika 10 + Fanitarana an’i Jabeza & Akanjon’ny Voninahitra.',
  },
  BwWxo1T564Q: {
    title_mg: 'FANAMBARANA MAHERY AMIN’NY ALAHADY MARAINA 6:30 #vavaka MIARAKA AMIN’NY APOSTOLY JOSHUA SELMAN',
    summary_mg: 'Fanambarana amin’ny 6:30 Maraina — Fahavokarana, Fahasalamana, Saha Vonton-drano, Famantarana ho amin’ny Soa & Fanomezana Telo Sosona.',
  },
};
