// Complete Malagasy (MG) translations for all Videos, Chapters, Prayers, Devotionals, Scriptures & Playlists

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
