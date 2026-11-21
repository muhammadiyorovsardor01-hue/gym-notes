import type { ExerciseItem, MuscleGroup } from '../types';

export const MUSCLE_GROUPS: { key: MuscleGroup; labelUz: string; icon: string }[] = [
  { key: 'chest', labelUz: "Ko'krak (Chest)", icon: '💪' },
  { key: 'back', labelUz: "Orqa (Back)", icon: '🦅' },
  { key: 'legs', labelUz: "Oyoq (Legs)", icon: '🦵' },
  { key: 'shoulders', labelUz: "Yelka (Shoulders)", icon: '🛡️' },
  { key: 'arms', labelUz: "Qo'l (Arms)", icon: '⚡' },
  { key: 'core', labelUz: "Qorin (Core)", icon: '🔥' },
  { key: 'neck', labelUz: "Bo'yin (Neck)", icon: '👤' },
  { key: 'cardio', labelUz: "Kardio (Cardio)", icon: '🏃' },
];

export const DEFAULT_EXERCISES: ExerciseItem[] = [
  // DAY 1 EXERCISES
  {
    id: 'squats',
    name: 'Barbell Back Squat',
    nameUz: 'Squats (Shtanga bilan o‘tirish)',
    muscleGroup: 'legs',
    difficulty: 'heavy',
    restSeconds: 120,
    cues: [
      "Oyoqlarni yelka kengligida qo'ying, oyoq barmoqlari 15-30° tashqariga qarasin.",
      "Tizzalar oyoq uchi tomon harakatlansin, tovon yerdan uzilmasin.",
      "Kamida sonlar parallel bo'lguncha tushing, belni to'g'ri tuting."
    ],
    mistakes: [
      "Tizzalarni ichkariga qulatish.",
      "Tovonlarni yerdan ko'tarib olish."
    ],
    youtubeQuery: 'Jeff Nippard How To Squat With Perfect Technique',
    youtubeId: 'zoW1Wlq67nE',
    shortsQuery: 'Jeff Nippard squat proper form shorts #shorts'
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    nameUz: 'Bench Press (Shtanga yotib ko‘tarish)',
    muscleGroup: 'chest',
    difficulty: 'heavy',
    restSeconds: 120,
    cues: [
      "Skameykaga yotganda yelka kuraklarini (scapula) orqaga va pastga qisib oling.",
      "Oyoqlarni polga mahkam tirab 'leg drive' hosil qiling.",
      "Shtangani ko'krak uchi sohasiga nazorat bilan tushiring, tirsaklar 45-75° burchakda bo'lsin."
    ],
    mistakes: [
      "Shtangani ko'krakka urib sakratish.",
      "Tirsaklarni 90° ga yoyib yuborish."
    ],
    youtubeQuery: 'Jeff Nippard How To Bench Press with Perfect Technique',
    youtubeId: 'vcBig73ojpE',
    shortsQuery: 'Jeff Nippard bench press form shorts #shorts'
  },
  {
    id: 'cable-rows',
    name: 'Seated Cable Rows',
    nameUz: 'Cable Rows (Blokda gorizontal tortish)',
    muscleGroup: 'back',
    difficulty: 'medium',
    restSeconds: 90,
    cues: [
      "Gavdani tik tuting, orqa va belni to'g'ri ushlang, tizzalar yengil bukilgan bo'lsin.",
      "Dastakni qorin pastiga qarab torting, tirsaklar tanaga yaqin harakatlansin.",
      "Harakat oxirida kuraklarni qattiq siqib 1 soniya ushlang."
    ],
    mistakes: [
      "Haddan tashqari orqaga va oldinga mayatnik kabi chayqalish.",
      "Yelkalarni quloqqa tortib ko'tarib olish."
    ],
    youtubeQuery: 'Jeff Nippard Seated Cable Row proper form',
    youtubeId: 'GZbfZ033f74',
    shortsQuery: 'Jeff Nippard seated cable row form shorts #shorts'
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Seated Dumbbell Shoulder Press',
    nameUz: 'Dumbbell Shoulder Press (Gantel bilan yelka)',
    muscleGroup: 'shoulders',
    difficulty: 'medium',
    restSeconds: 90,
    cues: [
      "Skameykaga suyangan holda, gantellarni quloq balandligidan boshlab tepaga ko'taring.",
      "Tirsaklarni to'liq yonboshga emas, 15-30° oldinga (scapular plane) yo'naltiring.",
      "Tepada gantellarni bir-biriga urishtirmang."
    ],
    mistakes: [
      "Belni qavariq qilib skameykadan uzish.",
      "Tirsaklarni orqaga yoyib yelkani zo'riqtirish."
    ],
    youtubeQuery: 'Jeff Nippard Dumbbell Shoulder Press proper form',
    youtubeId: 'qEwKCR5JCog',
    shortsQuery: 'Jeff Nippard dumbbell shoulder press form shorts #shorts'
  },
  {
    id: 'triceps-pushdowns',
    name: 'Cable Triceps Pushdown',
    nameUz: 'Triceps Pushdowns (Blokda triceps)',
    muscleGroup: 'arms',
    difficulty: 'medium',
    restSeconds: 60,
    cues: [
      "Tirsaklarni qovurg'alarga mahkam tirang va butun harakat davomida qimirlatmang.",
      "Arqon yoki dastakni pastga to'liq yozib, tricepsni qattiq siqing.",
      "Sekin qaytaring (90 gradus burchakkacha)."
    ],
    mistakes: [
      "Tirsaklarni harakat bilan birga oldinga-orqaga tebratish.",
      "Gavda og'irligi bilan blok ustiga yotib olish."
    ],
    youtubeQuery: 'Jeff Nippard The Best Way To Build Bigger Triceps',
    youtubeId: '2-LAMcpzODU',
    shortsQuery: 'Jeff Nippard tricep pushdown form shorts #shorts'
  },
  {
    id: 'lateral-raises',
    name: 'Dumbbell Lateral Raises',
    nameUz: 'Lateral Raises (Gantellarni yonga ko‘tarish)',
    muscleGroup: 'shoulders',
    difficulty: 'light',
    restSeconds: 60,
    cues: [
      "Gantellarni to'g'ridan-to'g'ri yonga emas, 15-30° oldinga yo'naltirib ko'taring.",
      "Tirsaklar biroz bukilgan bo'lsin, yelka balandligigacha ko'taring.",
      "Harakatni tanani siltamasdan, sof yelka kuchi bilan bajaring."
    ],
    mistakes: [
      "Og'ir tosh olib, butun gavda bilan siltanish.",
      "Trapetsiyani ko'tarib yelkani qisib olish."
    ],
    youtubeQuery: 'Jeff Nippard The Most Effective Way To Lateral Raise',
    youtubeId: '3VcKaXpzqRo',
    shortsQuery: 'Jeff Nippard lateral raises form shorts #shorts'
  },
  {
    id: 'seated-calf-raises',
    name: 'Seated Calf Raises',
    nameUz: 'Seated Calf Raises (O‘tirib boldir ko‘tarish)',
    muscleGroup: 'legs',
    difficulty: 'light',
    restSeconds: 45,
    cues: [
      "Oyoq uchlarini platformaga qo'ying, tovonni imkon qadar pastga tushirib to'liq cho'zing.",
      "Oyoq uchi bilan kuchli itarib, yuqorida 1-2 soniya to'xtab turing.",
      "Harakatni sakratmasdan (bounce qilmasdan) silliq bajaring."
    ],
    mistakes: [
      "Pastda va yuqorida to'xtamasdan sakrab tez-tez qilish.",
      "Yarim amplituda bilan ishlash."
    ],
    youtubeQuery: 'Jeff Nippard How To Grow Calves Science',
    youtubeId: 'gwLzMX30VU0',
    shortsQuery: 'Jeff Nippard calf raise form shorts #shorts'
  },
  {
    id: 'planks',
    name: 'Planks',
    nameUz: 'Planks (Planka mashqi)',
    muscleGroup: 'core',
    difficulty: 'light',
    restSeconds: 45,
    cues: [
      "Tirsaklar to'g'ri yelkalar ostida bo'lsin.",
      "Qorin va dumbani qattiq qisib, tanani to'g'ri chiziqda (hollow body) ushlang.",
      "Bir maromda nafas oling, nafasni ushlab qolmang."
    ],
    mistakes: [
      "Belni pastga osiltirish yoki dumbani haddan tashqari ko'tarish.",
      "Boshni pastga osiltirib bo'yinni toliqtirish."
    ],
    youtubeQuery: 'Jeff Nippard The Best Way To Train Abs Core',
    youtubeId: 'ASdvN_XEl_c',
    shortsQuery: 'Jeff Nippard plank form shorts #shorts'
  },
  {
    id: 'dumbbell-shrugs',
    name: 'Dumbbell Shrugs',
    nameUz: 'Dumbbell Shrugs (Gantel bilan trapetsiya)',
    muscleGroup: 'back',
    difficulty: 'light',
    restSeconds: 60,
    cues: [
      "Gantellarni ikki yonda ushlang, yelkalarni to'g'ridan-to'g'ri quloqlar tomon ko'taring.",
      "Tepada 1-2 soniya qattiq qisib turing.",
      "Sekin pastga tushirib, trapetsiyani to'liq cho'zing."
    ],
    mistakes: [
      "Yelkalarni aylanma harakatlantirish (rotatsiya bo'g'im uchun zararli).",
      "Boshni oldinga cho'zib olish."
    ],
    youtubeQuery: 'Jeff Nippard Shrugs proper form',
    youtubeId: 'b_b9b7H1qE0',
    shortsQuery: 'Jeff Nippard dumbbell shrugs form shorts #shorts'
  },

  // DAY 2 EXERCISES
  {
    id: 'deadlifts',
    name: 'Barbell Deadlift',
    nameUz: 'Deadlifts (Stanovaya tyaga)',
    muscleGroup: 'back',
    difficulty: 'heavy',
    restSeconds: 120,
    cues: [
      "Shtanga to'g'ridan-to'g'ri oyoq o'rtasida bo'lsin, boldir shtangaga deyarli tegib turadi.",
      "Belni qat'iy tekis ushlang, ko'krakni oching, kuraklarni orqaga bosing.",
      "Harakatni oyoqlar bilan yerni itarish orqali boshlang (press the floor away)."
    ],
    mistakes: [
      "Dumaloq bel (umurtqa uchun juda xavfli!).",
      "Shtangani tanadan uzoqlashtirib ko'tarish."
    ],
    youtubeQuery: 'Jeff Nippard How To Deadlift With Perfect Technique',
    youtubeId: 'op9kVnSso6Q',
    shortsQuery: 'Jeff Nippard deadlift form shorts #shorts'
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    nameUz: 'Lat Pulldowns (Blokni ko‘krakka tortish)',
    muscleGroup: 'back',
    difficulty: 'medium',
    restSeconds: 90,
    cues: [
      "Dastakni yelka kengligidan 1.5 baravar kengroq ushlang.",
      "Gavdani 10-15° orqaga egib, tirsaklarni pastga va orqaga yo'naltiring.",
      "Tortish paytida ko'krakni dastak sari oching."
    ],
    mistakes: [
      "Haddan tashqari orqaga yotib tanani silkitish.",
      "Dastakni qorin tomon juda pastga tortish."
    ],
    youtubeQuery: 'Jeff Nippard The Smartest Way To Lat Pulldown',
    youtubeId: 'CAwf7n6Luuc',
    shortsQuery: 'Jeff Nippard lat pulldown form shorts #shorts'
  },
  {
    id: 'incline-press',
    name: 'Incline Dumbbell / Barbell Press',
    nameUz: 'Incline Press (Qiya skameykada ko‘tarish)',
    muscleGroup: 'chest',
    difficulty: 'heavy',
    restSeconds: 105,
    cues: [
      "Skameyka qiyaligi 30 daraja atrofida bo'lishi maqbul.",
      "Pastga tushirganda ko'krak yuqori qismini yaxshilab cho'zing.",
      "Tirsaklarni 45-60 gradusda ushlang."
    ],
    mistakes: [
      "Skameykanni 60 gradusdan ortiq tik qilib qo'yish.",
      "Og'irlikni nazoratsiz tez tashlab yuborish."
    ],
    youtubeQuery: 'Jeff Nippard Incline Dumbbell Press technique',
    youtubeId: '8iPEnn-ltC8',
    shortsQuery: 'Jeff Nippard incline press form shorts #shorts'
  },
  {
    id: 'biceps-curls',
    name: 'Barbell / Dumbbell Biceps Curls',
    nameUz: 'Biceps Curls (Bicepsga ko‘tarish)',
    muscleGroup: 'arms',
    difficulty: 'medium',
    restSeconds: 60,
    cues: [
      "Tirsaklar tananing ikki yoniga mahkamlansin va harakatlanmasin.",
      "Faqat tirsak bo'g'imini buking, tepada 1 soniya qattiq siqing.",
      "Pastga tushish 2-3 soniya davom etsin."
    ],
    mistakes: [
      "Bel orqali chayqalib inersiya bilan ko'tarish.",
      "Tirsaklarni oldinga ko'tarib yelkaga yukni o'tkazish."
    ],
    youtubeQuery: 'Jeff Nippard The Smartest Way To Build Bigger Biceps',
    youtubeId: 'ykJmrZ5v0Oo',
    shortsQuery: 'Jeff Nippard bicep curl form shorts #shorts'
  },
  {
    id: 'hammer-curls',
    name: 'Dumbbell Hammer Curls',
    nameUz: 'Hammer Curls (Bolg‘a mashqi)',
    muscleGroup: 'arms',
    difficulty: 'medium',
    restSeconds: 60,
    cues: [
      "Gantellarni kaftlar bir-biriga qaragan holda (neytral) ushlang.",
      "Bu mashq brachialis va bilak mushaklarini kuchli rivojlantiradi.",
      "Gavdani qimirlatmasdan, nazorat bilan ko'taring."
    ],
    mistakes: [
      "Tirsaklarni harakat davomida oldinga siltash.",
      "Haddan tashqari tez tushirish."
    ],
    youtubeQuery: 'Jeff Nippard Hammer Curls technique',
    youtubeId: 'TwD-YGVP4Bk',
    shortsQuery: 'Jeff Nippard hammer curls form shorts #shorts'
  },
  {
    id: 'reverse-fly',
    name: 'Dumbbell / Cable Reverse Fly',
    nameUz: 'Reverse Fly (Orqa deltalarga yoyish)',
    muscleGroup: 'shoulders',
    difficulty: 'light',
    restSeconds: 60,
    cues: [
      "Oldinga egiling yoki ko'krak bilan skameykaga yoting.",
      "Tirsaklar biroz bukilgan holda gantellarni yonga va orqaga yoying.",
      "Harakatni orqa deltalarni his qilgan holda bajaring."
    ],
    mistakes: [
      "Trapetsiya bilan orqa kuraklarni qattiq qisib deltalardan yukni olib qochish.",
      "Og'ir tosh olib siltanib ko'tarish."
    ],
    youtubeQuery: 'Jeff Nippard Rear Delt Fly technique',
    youtubeId: 'PzsMitRj_gE',
    shortsQuery: 'Jeff Nippard rear delt fly shorts #shorts'
  },
  {
    id: 'standing-calf-raises',
    name: 'Standing Calf Raises',
    nameUz: 'Standing Calf Raises (Tik turib boldir)',
    muscleGroup: 'legs',
    difficulty: 'light',
    restSeconds: 45,
    cues: [
      "Tik turgan holda tizzalarni to'g'ri (lekin blokirovka qilmasdan) tuting.",
      "Oyoq uchi bilan maksimal yuqoriga ko'tarilib, 1-2 soniya to'xtang.",
      "Pastga to'liq tushib boldirni cho'zing."
    ],
    mistakes: [
      "Tizzalarni bukib oyoq bilan sakrash.",
      "Pastki cho'zilishni o'tkazib yuborish."
    ],
    youtubeQuery: 'Jeff Nippard Calf training science',
    youtubeId: 'gwLzMX30VU0',
    shortsQuery: 'Jeff Nippard standing calf raises shorts #shorts'
  },
  {
    id: 'neck-isometrics',
    name: 'Neck Isometric Holds',
    nameUz: 'Neck Isometrics (Bo‘yin mashqi)',
    muscleGroup: 'neck',
    difficulty: 'light',
    restSeconds: 30,
    cues: [
      "Kaftingizni peshonangizga yoki boshning yon tomoniga qo'ying.",
      "Boshingiz bilan qo'lingizni itaring, lekin bosh qimirlamasin (izometrik qarshilik).",
      "10-15 soniya davomida bir maromda kuch bilan ushlab turing."
    ],
    mistakes: [
      "Keskin kuch bilan bo'yinni qisib siltash.",
      "Nafasni to'xtatib turish."
    ],
    youtubeQuery: 'Jeff Nippard Neck training science isometric',
    youtubeId: 'ASdvN_XEl_c',
    shortsQuery: 'Jeff Nippard neck workout isometric form shorts #shorts'
  },

  // DAY 3 EXERCISES
  {
    id: 'leg-press',
    name: 'Leg Press',
    nameUz: 'Leg Press (Oyoqda platforma itarish)',
    muscleGroup: 'legs',
    difficulty: 'heavy',
    restSeconds: 120,
    cues: [
      "Bel va dumbani o'rindiqqa mahkam yopishtiring.",
      "Platformani tizzalar 90 gradus bo'lguncha nazorat bilan tushiring.",
      "Tepadagi harakatda tizzalarni to'liq blokirovka qilib to'g'rilamang!"
    ],
    mistakes: [
      "Tizzalarni oxirigacha qotirib bo'g'imni teskari bukish xavfi.",
      "Dumbaning o'rindiqdan ko'tarilishi."
    ],
    youtubeQuery: 'Jeff Nippard Leg Press mistakes science',
    youtubeId: 'sPt_b1g_2Hw',
    shortsQuery: 'Jeff Nippard leg press form shorts #shorts'
  },
  {
    id: 't-bar-rows',
    name: 'T-Bar Rows',
    nameUz: 'T-Bar Rows (T-grif orqaga tortish)',
    muscleGroup: 'back',
    difficulty: 'heavy',
    restSeconds: 105,
    cues: [
      "Tizzalarni biroz buking, korpusni 45 gradusda ushlang, bel mutlaqo to'g'ri bo'lsin.",
      "Dastakni ko'krak/qorin sohasi tomon torting.",
      "Tepada orqa mushaklarini kuchli qisib, sekin pastga cho'zing."
    ],
    mistakes: [
      "Dumaloq bukri bel bilan tortish.",
      "Gavdani vertikal qilib faqat qo'l bilan tortish."
    ],
    youtubeQuery: 'Jeff Nippard T-Bar Row proper form',
    youtubeId: 'FWJR5Ve8gkQ',
    shortsQuery: 'Jeff Nippard t bar row form shorts #shorts'
  },
  {
    id: 'chest-fly',
    name: 'Dumbbell / Cable Chest Fly',
    nameUz: 'Chest Fly (Ko‘krakni gantel/blokda yoyish)',
    muscleGroup: 'chest',
    difficulty: 'medium',
    restSeconds: 75,
    cues: [
      "Tirsaklar harakat davomida biroz bukilgan holatda qotirilgan bo'lsin.",
      "Qo'llarni ikki yonga yoyib ko'krak mushagini to'liq cho'zing.",
      "Qaytishda ko'krakni qisib, quchoqlash harakatini bajaring."
    ],
    mistakes: [
      "Tirsaklarni harakat davomida bukib jim/pressga aylantirib yuborish.",
      "Haddan tashqari chuqur tushib yelka bo'g'imini zo'riqtirish."
    ],
    youtubeQuery: 'Jeff Nippard Chest Fly proper form',
    youtubeId: '8iPEnn-ltC8',
    shortsQuery: 'Jeff Nippard chest fly form shorts #shorts'
  },
  {
    id: 'triceps-extensions',
    name: 'Overhead Triceps Extensions',
    nameUz: 'Triceps Extensions (Bosh ortidan triceps)',
    muscleGroup: 'arms',
    difficulty: 'medium',
    restSeconds: 60,
    cues: [
      "Gantel yoki arqonni bosh ortidan tushirib tricepsni to'liq cho'zing.",
      "Tirsaklar yuqoriga qaragan holatda bir joyda mustahkam tursin.",
      "Faqat bilak bo'g'imini yozib tepaga ko'taring."
    ],
    mistakes: [
      "Tirsaklarni ikki tomonga juda keng yoyib yuborish.",
      "Belni qavariq qilib orqaga haddan ortiq egilish."
    ],
    youtubeQuery: 'Jeff Nippard Overhead Tricep Extension',
    youtubeId: '2-LAMcpzODU',
    shortsQuery: 'Jeff Nippard tricep extension form shorts #shorts'
  },
  {
    id: 'cable-lateral-raises',
    name: 'Cable Lateral Raises',
    nameUz: 'Cable Lateral Raises (Blokda yelka yonga)',
    muscleGroup: 'shoulders',
    difficulty: 'light',
    restSeconds: 60,
    cues: [
      "Blok dastagini pastdan oling, gavdani biroz qiya ushlang.",
      "Kabel butun harakat davomida yelkada doimiy kuchlanish (tension) beradi.",
      "Yelka balandligigacha ko'taring va sekin qaytaring."
    ],
    mistakes: [
      "Gavda bilan siltanib ko'tarish.",
      "Dastakni juda baland ko'tarib trapetsiyaga yuk o'tkazish."
    ],
    youtubeQuery: 'Jeff Nippard Cable Lateral Raise proper form',
    youtubeId: '3VcKaXpzqRo',
    shortsQuery: 'Jeff Nippard cable lateral raise shorts #shorts'
  },
  {
    id: 'decline-crunches',
    name: 'Decline Crunches',
    nameUz: 'Decline Crunches (Qiya skameykada press)',
    muscleGroup: 'core',
    difficulty: 'light',
    restSeconds: 45,
    cues: [
      "Oyoqlarni qiya skameykaga mahkamlang.",
      "Gavdani to'liq emas, faqat qorin mushaklarini siqib umurtqani bukish orqali ko'taring.",
      "Tepada pressni 1 soniya qisib turing."
    ],
    mistakes: [
      "Bo'yinni qo'l bilan oldinga tortish.",
      "Bel orqali to'liq ko'tarilib son mushaklariga yukni topshirish."
    ],
    youtubeQuery: 'Jeff Nippard Decline Crunch Abs',
    youtubeId: 'hdng3Nm1x_E',
    shortsQuery: 'Jeff Nippard decline crunches form shorts #shorts'
  },
  {
    id: 'face-pulls',
    name: 'Cable Face Pulls',
    nameUz: 'Face Pulls (Arqonni yuzga tortish)',
    muscleGroup: 'shoulders',
    difficulty: 'light',
    restSeconds: 45,
    cues: [
      "Arqonni ko'z balandligiga o'rnating, kaftlar pastga yoki bir-biriga qarasin.",
      "Arqonni peshona tomon torting, tirsaklar balandda orqaga ketsin.",
      "Yelka salomatligi va orqa deltalarni rivojlantirish uchun eng zo'r mashq."
    ],
    mistakes: [
      "Arqonni bo'yin yoki ko'krak tomon juda pastga tortish.",
      "Og'ir tosh bilan gavdani tebratish."
    ],
    youtubeQuery: 'Jeff Nippard Face Pulls proper technique',
    youtubeId: 'rep-qVOkqgk',
    shortsQuery: 'Jeff Nippard face pulls form shorts #shorts'
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    nameUz: 'Otjimaniya (Push-ups)',
    muscleGroup: 'chest',
    difficulty: 'medium',
    restSeconds: 75,
    cues: [
      "Qo'llarni yelkadan biroz kengroq qo'ying va tirsaklarni tanaga nisbatan 45-60 gradusda ushlang.",
      "Tana boshdan tovongacha to'g'ri taxtadek (tekis) bo'lishi shart, dumba va qorinni qattiq qising.",
      "Ko'krak qafasini yerga yaqinlashtirib, ko'krak mushagini to'liq cho'zing va kuch bilan ko'tariling."
    ],
    mistakes: [
      "Tirsaklarni 90 gradusga yoyib yuborish.",
      "Belni pastga osiltirish."
    ],
    youtubeQuery: 'Jeff Nippard push ups proper form technique',
    youtubeId: 'hxmd2G_qH1g',
    shortsQuery: 'Jeff Nippard push ups proper form shorts #shorts'
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    nameUz: 'Turnikda tortilish (Pull-ups)',
    muscleGroup: 'back',
    difficulty: 'heavy',
    restSeconds: 105,
    cues: [
      "Turnikni yelka kengligidan biroz kengroq ushlang, boshlanishida kuraklarni pastga torting.",
      "Iyak turnik darajasidan oshguncha ko'krakni turnik sari torting.",
      "Pastga tushganda sekin, to'liq cho'zilib tushing."
    ],
    mistakes: [
      "Oyoqlar bilan silkinib sakrash (kipping).",
      "Pastda to'liq cho'zilmaslik."
    ],
    youtubeQuery: 'Jeff Nippard How To Pull Up Perfect Technique',
    youtubeId: 'eGo4IYlbE5g',
    shortsQuery: 'Jeff Nippard pull ups form shorts #shorts'
  }
];
