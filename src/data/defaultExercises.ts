import type { ExerciseItem, MuscleGroup } from '../types';

export const MUSCLE_GROUPS: { key: MuscleGroup; labelUz: string; icon: string }[] = [
  { key: 'chest', labelUz: "Ko'krak (Chest)", icon: '💪' },
  { key: 'back', labelUz: "Orqa (Back)", icon: '🦅' },
  { key: 'legs', labelUz: "Oyoq (Legs)", icon: '🦵' },
  { key: 'shoulders', labelUz: "Yelka (Shoulders)", icon: '🛡️' },
  { key: 'arms', labelUz: "Qo'l / Qo'llar (Arms)", icon: '⚡' },
  { key: 'core', labelUz: "Qorin / Press (Core)", icon: '🔥' },
  { key: 'cardio', labelUz: "Kardio (Cardio)", icon: '🏃' },
];

export const DEFAULT_EXERCISES: ExerciseItem[] = [
  // CHEST
  {
    id: 'push-ups',
    name: 'Push-ups',
    nameUz: 'Otjimaniya (Push-ups)',
    muscleGroup: 'chest',
    cues: [
      "Qo'llar yelka kengligidan bir oz kengroq joylashtiriladi.",
      "Tirsaklarni yon tomonga yoyib yubormang, tanaga nisbatan taxminan 45-60 gradus burchakda tushiring.",
      "Tana boshdan tovongacha to'g'ri taxtadek (tekis) bo'lishi shart, qorin va dumbani qisib turing.",
      "Ko'krak deyarli polga tegguncha tushib, so'ng kuch bilan ko'tariling."
    ],
    mistakes: [
      "Belni pastga osiltirib yuborish (orqa egilishi).",
      "Boshni haddan tashqari oldinga yoki pastga osiltirish.",
      "Harakatni to'liq bajarmaslik (yarim tushish)."
    ],
    youtubeQuery: 'push ups proper form',
    youtubeId: 'IODxDxX7oi4'
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    nameUz: 'Shtanga yotib ko‘tarish (Bench Press)',
    muscleGroup: 'chest',
    cues: [
      "Skameykaga yotganda yelka kuraklarini (lopatkalarni) orqaga qisib, skameykaga bosing.",
      "Oyoqlarni erga mahkam tirang (leg drive).",
      "Shtangani ko'krak o'rtasi (ko'krak uchi) sohasiga nazorat bilan tushiring.",
      "Tirsaklar 75 gradus atrofida harakatlanishi kerak, 90 gradus qilib yoymang."
    ],
    mistakes: [
      "Shtangani ko'krakka urib sakratish (bouncing).",
      "Dumbani skameykadan uzib ko'tarish.",
      "Tirsaklarni to'liq qotirib (hyper-extend) bo'g'imga og'irlik tushirish."
    ],
    youtubeQuery: 'bench press proper form tutorial',
    youtubeId: 'rT7DgCr-3pg'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    nameUz: 'Qiya skameykada gantel ko‘tarish (Incline)',
    muscleGroup: 'chest',
    cues: [
      "Skameyka qiyaligi 30-45 gradus atrofida bo'lishi maqbul.",
      "Gantellarni pastga tushirganda ko'krak yuqori qismini yaxshilab cho'zing.",
      "Tepada gantellarni bir-biriga urishtirmang, mushakda zo'riqishni saqlang."
    ],
    mistakes: [
      "Skameykanni 60 gradusdan ortiq tik qilib qo'yish (bunda ko'krak o'rniga yelka ishlaydi).",
      "Gantellarni shoshilib tez tashlab yuborish."
    ],
    youtubeQuery: 'incline dumbbell press proper form',
    youtubeId: '8iPEnn-ltC8'
  },
  {
    id: 'chest-dips',
    name: 'Chest Dips',
    nameUz: 'Brusda tushib-chiqish (Dips)',
    muscleGroup: 'chest',
    cues: [
      "Ko'krakka ko'proq yuk tushishi uchun korpusni bir oz oldinga eging.",
      "Tirsaklarni taxminan 90 gradusgacha sekin tushiring.",
      "Ko'tarilayotganda ko'krak mushaklarini qisishga e'tibor bering."
    ],
    mistakes: [
      "Tik turib bajarish (bu asosan tricepsga o'tib ketadi).",
      "Haddan tashqari chuqur tushib yelka bo'g'imini jarohatlash."
    ],
    youtubeQuery: 'chest dips form guide',
    youtubeId: '2z8JmcrW-As'
  },

  // BACK
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    nameUz: 'Turnikda tortilish (Pull-ups)',
    muscleGroup: 'back',
    cues: [
      "Turnikni yelka kengligidan biroz kengroq ushlang (kaftlar oldinga qaragan).",
      "Harakatni yelka kuraklarini pastga va orqaga tortishdan boshlang.",
      "Iyak turnik darajasiga yoki undan balandroqqa yetguncha tortiling.",
      "Pastga tushganda nazorat bilan, to'liq tushib cho'ziling."
    ],
    mistakes: [
      "Oyoqlar bilan kuchli silkinish (kipping).",
      "Yarim tortilish, to'liq cho'zilmaslik."
    ],
    youtubeQuery: 'pull ups proper form tutorial',
    youtubeId: 'eGo4IYlbE5g'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    nameUz: 'Blokni ko‘krakka tortish (Lat Pulldown)',
    muscleGroup: 'back',
    cues: [
      "Dastakni keng ushlang va ko'krak qafasini biroz yuqoriga chiqaring.",
      "Tirsaklarni to'g'ri pastga va orqaga yo'naltirib ko'krak yuqorisiga torting.",
      "Tortish paytida nafas chiqaring, tepaga qaytganda nafas oling."
    ],
    mistakes: [
      "Haddan tashqari orqaga yotib olish (tanani silkitish).",
      "Dastakni qorin tomon juda pastga tortish."
    ],
    youtubeQuery: 'lat pulldown proper form',
    youtubeId: 'CAwf7n6Luuc'
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    nameUz: 'Shtangani belga tortish (Barbell Row)',
    muscleGroup: 'back',
    cues: [
      "Tizzalarni biroz buking, korpusni 45 gradus atrofida oldinga eging.",
      "Orqa va bel mutlaqo to'g'ri, ko'krak oldinda bo'lsin.",
      "Shtangani kindik yoki qorin pastiga qarab torting, tirsaklar tanaga yaqin yursin."
    ],
    mistakes: [
      "Belni g'oz qilib (bukrib) olish - bu umurtqa uchun juda xavfli!",
      "Og'ir vaznda tanani keskin siltab harakatlantirish."
    ],
    youtubeQuery: 'barbell row how to do proper form',
    youtubeId: 'FWJR5Ve8gkQ'
  },
  {
    id: 'deadlift',
    name: 'Barbell Deadlift',
    nameUz: 'Stanovaya tyaga (Deadlift)',
    muscleGroup: 'back',
    cues: [
      "Shtanga oyoq boldirlariga juda yaqin (tegib) turishi kerak.",
      "Belni qat'iy tekis ushlang, ko'krakni oching, kuraklarni orqaga bosing.",
      "Ko'tarishni oyoqlar bilan yerni itarish orqali boshlang.",
      "Tepada to'liq to'g'rilaning, lekin orqaga keraksiz haddan ortiq egilmang."
    ],
    mistakes: [
      "Dumaloq bel (kattakon xato va churra xavfi!).",
      "Shtangani tanadan uzoqlashtirib ko'tarish."
    ],
    youtubeQuery: 'deadlift proper form tutorial',
    youtubeId: 'op9kVnSso6Q'
  },

  // LEGS
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    nameUz: 'Shtanga bilan o‘tirib-turish (Squats)',
    muscleGroup: 'legs',
    cues: [
      "Oyoqlarni yelka kengligida qo'ying, barmoq uchlari 15-30 gradus tashqariga qarasin.",
      "O'tirish paytida tizzalar oyoq uchi yo'nalishida ketsin, tovon yerga mixlangan bo'lsin.",
      "Sonlar parallel yoki paralleldan bir oz pastroq darajagacha tushing.",
      "Belni to'g'ri, qorinni qattiq tuting."
    ],
    mistakes: [
      "Tizzalarning ichkariga qarab qulashi (valgus).",
      "Tovonlarning yerdan uzilishi.",
      "Oldinga ortiqcha egilib ketish."
    ],
    youtubeQuery: 'how to squat properly form',
    youtubeId: 'gcNh17Ckjgg'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    nameUz: 'Oyoqda platforma itarish (Leg Press)',
    muscleGroup: 'legs',
    cues: [
      "Bel va dumbani o'rindiqqa mahkam yopishtiring.",
      "Platformani tizzalar taxminan 90 gradus bo'lguncha nazorat bilan tushiring.",
      "Itarish paytida tizzalarni oxirigacha blokirovka qilib to'g'rilamang!"
    ],
    mistakes: [
      "Tepadagi eng xavfli xato: tizzalarni to'liq qotirib, teskariga qayrilish xavfini tug'dirish.",
      "Dumbaning o'rindiqdan ko'tarilib ketishi."
    ],
    youtubeQuery: 'leg press common mistakes form',
    youtubeId: 'sPt_b1g_2Hw'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    nameUz: 'Rumincha tyaga (Son orqasi / RDL)',
    muscleGroup: 'legs',
    cues: [
      "Tizzalar birozgina bukilgan, lekin qimirlamaydi (qotirilgan).",
      "Harakat dumbani orqaga cho'zish orqali amalga oshiriladi (hip hinge).",
      "Shtanga oyoq bo'ylab sirg'anib tushadi, son orqa mushagi cho'zilguncha tushiriladi."
    ],
    mistakes: [
      "Prisedaniyaga aylantirib tizzalarni ko'p bukish.",
      "Belni egib shtangani yerga tekkizishga harakat qilish."
    ],
    youtubeQuery: 'romanian deadlift form rdl',
    youtubeId: 'JCXUYuzwNrM'
  },

  // SHOULDERS
  {
    id: 'overhead-press',
    name: 'Overhead Press (OHP)',
    nameUz: 'Shtangani tepaga ko‘tarish (Armeyskiy Jim)',
    muscleGroup: 'shoulders',
    cues: [
      "Tik turing, qorin va dumbani qattiq siqing (orqa egilmasligi uchun).",
      "Shtangani to'g'ri vertikal chiziqda bosh ustiga ko'taring.",
      "Shtanga boshdan o'tgach, boshni biroz oldinga keltirib to'liq yozing."
    ],
    mistakes: [
      "Orqani qavariq qilib orqaga haddan tashqari egilish.",
      "Tizzalar orqali siltab sakrash (agar push-press bo'lmasa)."
    ],
    youtubeQuery: 'overhead press form military press',
    youtubeId: '2yjwXTZQDDI'
  },
  {
    id: 'lateral-raises',
    name: 'Dumbbell Lateral Raises',
    nameUz: 'Gantellarni yonga ko‘tarish (Mahi)',
    muscleGroup: 'shoulders',
    cues: [
      "Tirsaklar birozgina bukilgan bo'lsin.",
      "Gantellarni yelka balandligigacha ko'taring, tirsaklar qo'l kaftidan pastda qolmasin.",
      "Harakatni yelkaning o'rta qismi bilan his qilib bajaring."
    ],
    mistakes: [
      "Og'ir tosh olib, butun tana bilan chayqalish.",
      "Trapetsiyani ko'tarib yelkani qisib olish."
    ],
    youtubeQuery: 'dumbbell lateral raises proper form',
    youtubeId: '3VcKaXpzqRo'
  },

  // ARMS
  {
    id: 'bicep-curl',
    name: 'Barbell / EZ-Bar Curl',
    nameUz: 'Shtanga bilan bicep ko‘tarish',
    muscleGroup: 'arms',
    cues: [
      "Tirsaklar tananing ikki yoniga mahkamlangan va oldinga-orqaga harakatlanmasin.",
      "Faqat tirsak bo'g'imi harakatlanadi, gavda tik turadi.",
      "Tepada bicepni 1 soniya qattiq qising, pastga tushish esa sekin bo'lsin (2-3 soniya)."
    ],
    mistakes: [
      "Bel orqali orqaga chayqalib inersiya bilan ko'tarish.",
      "Tirsaklarni oldinga ko'tarib yuborish (bu yelkaga yukni o'tkazadi)."
    ],
    youtubeQuery: 'bicep curl form barbell',
    youtubeId: 'ykJmrZ5v0Oo'
  },
  {
    id: 'tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    nameUz: 'Blokda tricepsni pastga yozish',
    muscleGroup: 'arms',
    cues: [
      "Tirsaklar qovurg'alarga mahkam tiralsin.",
      "Dastakni yoki arqonni pastga to'liq yozing va tricepsni qising.",
      "Qo'l 90 gradusga qaytguncha sekin qaytaring."
    ],
    mistakes: [
      "Tirsaklarni qanot kabi ochib yuborish.",
      "Gavda og'irligi bilan blok ustiga yotib olish."
    ],
    youtubeQuery: 'tricep rope pushdown form',
    youtubeId: '2-LAMcpzODU'
  },

  // CORE / ABS
  {
    id: 'plank',
    name: 'Plank',
    nameUz: 'Planka (Plank)',
    muscleGroup: 'core',
    cues: [
      "Tirsaklar to'g'ridan-to'g'ri yelkalar ostida bo'lsin.",
      "Qorinni ichga tortib, press mushaklarini qattiq qising.",
      "Dumba ko'tarilib ketmasin va pastga cho'kmasin — to'g'ri chiziq hosil qiling."
    ],
    mistakes: [
      "Belni osiltirib qo'yish (orqa og'rig'iga olib keladi).",
      "Nafasni ushlab qolish — bir maromda nafas oling."
    ],
    youtubeQuery: 'how to plank properly',
    youtubeId: 'ASdvN_XEl_c'
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise',
    nameUz: 'Turnikda oyoq/tizza ko‘tarish',
    muscleGroup: 'core',
    cues: [
      "Turnikda osilib turganda yelkalarni bo'sh qo'ymang, kuraklarni ozgina torting.",
      "Tizzalarni yoki to'g'ri oyoqlarni qorin kuchi bilan ko'krakka torting.",
      "Pastga tushganda tebranmaslikka harakat qiling."
    ],
    mistakes: [
      "Tanani chayqatib mayatnik kabi inersiya bilan ko'tarish.",
      "Faqat son mushaklari orqali ko'tarish."
    ],
    youtubeQuery: 'hanging leg raises form',
    youtubeId: 'hdng3Nm1x_E'
  }
];
