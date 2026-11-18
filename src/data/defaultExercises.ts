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
      "Jeff Nippard tavsiyasi: Qo'llarni yelkadan biroz kengroq qo'ying va tirsaklarni tanaga nisbatan 45-60 gradusda ushlang.",
      "Tana boshdan tovongacha to'g'ri taxtadek (tekis) bo'lishi shart, dumba va qorinni qattiq qising.",
      "Ko'krak qafasini yerga yaqinlashtirib, ko'krak mushagini to'liq cho'zing va kuch bilan ko'tariling."
    ],
    mistakes: [
      "Tirsaklarni 90 gradusga yoyib yuborish (bu yelkaga jarohat keltiradi).",
      "Belni pastga osiltirish yoki dumbani haddan tashqari ko'tarib olish.",
      "Yarim harakat qilish — to'liq pastga tushib, to'liq ko'tarilish muhim."
    ],
    youtubeQuery: 'Jeff Nippard push ups proper form technique',
    youtubeId: 'hxmd2G_qH1g'
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    nameUz: 'Shtanga yotib ko‘tarish (Bench Press)',
    muscleGroup: 'chest',
    cues: [
      "Jeff Nippard tavsiyasi: Skameykada yotganda yelka kuraklarini (scapula) orqaga va pastga qisib oling (retraction).",
      "Oyoqlarni polga mahkam tirab 'leg drive' hosil qiling.",
      "Shtangani to'g'ri chiziqda emas, pastga tushganda ko'krak uchi sohasiga, ko'tarilayotganda esa yelka tomon biroz qiya (J-curve) yo'nalishda ko'taring."
    ],
    mistakes: [
      "Shtangani ko'krakka urib sakratish (bouncing).",
      "Dumbani skameykadan uzib ko'tarish.",
      "Tirsaklarni to'liq qotirib bo'g'imga keraksiz yuk tushirish."
    ],
    youtubeQuery: 'Jeff Nippard How To Bench Press with Perfect Technique',
    youtubeId: 'vcBig73ojpE'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    nameUz: 'Qiya skameykada gantel ko‘tarish (Incline)',
    muscleGroup: 'chest',
    cues: [
      "Jeff Nippard tavsiyasi: Skameyka burchagini 30 gradus atrofida ushlang (eng yuqori ko'krak aktivatsiyasi uchun).",
      "Gantellarni pastga tushirganda tirsaklar 45-60 gradusda bo'lsin.",
      "Tepada gantellarni bir-biriga urishtirmang, zo'riqishni saqlang."
    ],
    mistakes: [
      "Skameykanni 60 gradusdan ortiq tik qilib qo'yish (yelkaga o'tib ketadi).",
      "Gantellarni shoshilib tez tashlab yuborish."
    ],
    youtubeQuery: 'Jeff Nippard Incline Dumbbell Press technique',
    youtubeId: '8iPEnn-ltC8'
  },
  {
    id: 'chest-dips',
    name: 'Chest Dips',
    nameUz: 'Brusda tushib-chiqish (Dips)',
    muscleGroup: 'chest',
    cues: [
      "Jeff Nippard tavsiyasi: Ko'krakka ko'proq yuk tushishi uchun gavdani 15-30 gradus oldinga egib bajaring.",
      "Tirsaklarni taxminan 90 gradusgacha sekin tushiring.",
      "Ko'tarilayotganda ko'krak mushaklarini kuchli qisib siqing."
    ],
    mistakes: [
      "Tik turib bajarish (bunda ko'krak emas, faqat triceps ishlaydi).",
      "Haddan tashqari chuqur tushib yelka bo'g'imini zo'riqtirish."
    ],
    youtubeQuery: 'Jeff Nippard Chest Dips proper technique tutorial',
    youtubeId: '2z8JmcrW-As'
  },

  // BACK
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    nameUz: 'Turnikda tortilish (Pull-ups)',
    muscleGroup: 'back',
    cues: [
      "Jeff Nippard tavsiyasi: Turnikni yelka kengligidan biroz kengroq ushlang, boshlanishida kuraklarni pastga torting.",
      "Iyak turnik darajasidan oshguncha ko'krakni turnik sari torting.",
      "Pastga tushganda sekin, to'liq cho'zilib tushing."
    ],
    mistakes: [
      "Oyoqlar bilan silkinib sakrash (kipping).",
      "Yarim tortilish, pastda to'liq yozilmaslik."
    ],
    youtubeQuery: 'Jeff Nippard How To Pull Up Perfect Technique',
    youtubeId: 'eGo4IYlbE5g'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    nameUz: 'Blokni ko‘krakka tortish (Lat Pulldown)',
    muscleGroup: 'back',
    cues: [
      "Jeff Nippard tavsiyasi: Dastakni yelka kengligidan 1.5 baravar kengroq ushlang.",
      "Gavdani 10-15 gradus orqaga egib, tirsaklarni to'g'ri pastga va orqaga yo'naltiring.",
      "Harakatni orqa qanot (lat) mushaklaridan boshlang."
    ],
    mistakes: [
      "Orqaga haddan tashqari yotib, butun gavda bilan chayqalish.",
      "Dastakni qoringa qadar juda pastga tushirish."
    ],
    youtubeQuery: 'Jeff Nippard The Smartest Way To Lat Pulldown',
    youtubeId: 'CAwf7n6Luuc'
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    nameUz: 'Shtangani belga tortish (Barbell Row)',
    muscleGroup: 'back',
    cues: [
      "Jeff Nippard tavsiyasi: Korpusni taxminan 45 gradusda ushlang, bel mutlaqo to'g'ri va qattiq bo'lsin.",
      "Shtangani kindik sohasi tomon tirsaklar orqali torting.",
      "Tepada kuraklarni 1 soniya qisib turing."
    ],
    mistakes: [
      "Belni g'oz qilib (bukrib) olish — umurtqa uchun jiddiy xavf!",
      "Oyoq va gavda bilan siltanib ko'tarish."
    ],
    youtubeQuery: 'Jeff Nippard The Most Effective Way To Barbell Row',
    youtubeId: 'FWJR5Ve8gkQ'
  },
  {
    id: 'deadlift',
    name: 'Barbell Deadlift',
    nameUz: 'Stanovaya tyaga (Deadlift)',
    muscleGroup: 'back',
    cues: [
      "Jeff Nippardning 5 qoidasi: Shtanga to'g'ridan-to'g'ri oyoq o'rtasida bo'lsin, boldir shtangadan 2-3 sm masofada turadi.",
      "Harakatni oyoqlar bilan yerni itarish orqali boshlang (press the floor away).",
      "Shtanga butun yo'l davomida boldir va songa yopishib harakatlanishi shart."
    ],
    mistakes: [
      "Dumaloq bel bilan ko'tarish.",
      "Shtangani tanadan uzoqlashtirish."
    ],
    youtubeQuery: 'Jeff Nippard How To Deadlift With Perfect Technique',
    youtubeId: 'op9kVnSso6Q'
  },

  // LEGS
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    nameUz: 'Shtanga bilan o‘tirib-turish (Squats)',
    muscleGroup: 'legs',
    cues: [
      "Jeff Nippard tavsiyasi: Oyoqlarni yelka kengligida qo'ying, oyoq barmoqlari 15-30 gradus tashqariga qarasin.",
      "O'tirishda tizzalar oyoq uchi yo'nalishida ketsin, tovonlar erga mahkamlansin.",
      "Chuqurlik: kamida sonlar polga parallel bo'lguncha tushing."
    ],
    mistakes: [
      "Tizzalarning ichkariga qulashi (valgus).",
      "Tovonning yerdan uzilib qolishi.",
      "Oldinga haddan tashqari egilib ketish."
    ],
    youtubeQuery: 'Jeff Nippard How To Get A Huge Squat With Perfect Technique',
    youtubeId: 'zoW1Wlq67nE'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    nameUz: 'Oyoqda platforma itarish (Leg Press)',
    muscleGroup: 'legs',
    cues: [
      "Jeff Nippard tavsiyasi: Oyoqlarni platforma o'rtasiga qo'ying, dumbani o'rindiqqa mahkam bosing.",
      "Platformani tizzalar 90 gradus burchak hosil qilguncha nazorat bilan tushiring.",
      "Itarganda tizzalarni oxirigacha blokirovka qilib to'g'rilamang!"
    ],
    mistakes: [
      "Tepadagi eng xavfli xato: tizzani to'liq qotirib, teskariga sinish xavfini keltirib chiqarish.",
      "Dumbaning o'rindiqdan ko'tarilib ketishi."
    ],
    youtubeQuery: 'Jeff Nippard Leg Press mistakes science',
    youtubeId: 'sPt_b1g_2Hw'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    nameUz: 'Rumincha tyaga (Son orqasi / RDL)',
    muscleGroup: 'legs',
    cues: [
      "Jeff Nippard tavsiyasi: Tizzalarni biroz bukilgan holatda mahkamlang (qimirlatmasdan).",
      "Harakat dumbani orqaga cho'zish orqali bajariladi (hip hinge).",
      "Shtanga oyoq bo'ylab sirg'anib tushadi, son orqasi to'liq cho'zilguncha tushiriladi."
    ],
    mistakes: [
      "Prisedaniyaga o'xshatib tizzani ko'p bukish.",
      "Belni egib shtangani yerga tekkizishga urinish."
    ],
    youtubeQuery: 'Jeff Nippard Romanian Deadlift technique RDL',
    youtubeId: 'JCXUYuzwNrM'
  },

  // SHOULDERS
  {
    id: 'overhead-press',
    name: 'Overhead Press (OHP)',
    nameUz: 'Shtangani tepaga ko‘tarish (Military Press)',
    muscleGroup: 'shoulders',
    cues: [
      "Jeff Nippard tavsiyasi: Tik turing, dumba va qorinni qattiq siqib tanani mustahkamlang.",
      "Shtanga to'g'ri vertikal chiziqda bosh ustiga ko'tarilsin.",
      "Shtanga peshonadan o'tgach, boshni biroz oldinga keltirib to'liq yozing."
    ],
    mistakes: [
      "Orqani qavariq qilib orqaga egilish (bel og'rig'iga olib keladi).",
      "Tizzalar bilan siltab sakrash."
    ],
    youtubeQuery: 'Jeff Nippard How To Overhead Press Military Press',
    youtubeId: '2yjwXTZQDDI'
  },
  {
    id: 'lateral-raises',
    name: 'Dumbbell Lateral Raises',
    nameUz: 'Gantellarni yonga ko‘tarish (Mahi)',
    muscleGroup: 'shoulders',
    cues: [
      "Jeff Nippard tavsiyasi: Gantellarni to'g'ridan-to'g'ri yonga emas, 15-30 gradus oldinga (scapular plane) ko'taring.",
      "Tirsaklar yengil bukilgan bo'lsin, tirsak qo'l kaftidan pastda qolmasin.",
      "Yelka balandligigacha ko'taring va 1 soniya ushlab turing."
    ],
    mistakes: [
      "Og'ir tosh olib butun gavda bilan chayqalish.",
      "Trapetsiya mushagini ko'tarib yelkani qisib olish."
    ],
    youtubeQuery: 'Jeff Nippard The Most Effective Way To Lateral Raise',
    youtubeId: '3VcKaXpzqRo'
  },

  // ARMS
  {
    id: 'bicep-curl',
    name: 'Barbell / EZ-Bar Curl',
    nameUz: 'Shtanga bilan bicep ko‘tarish',
    muscleGroup: 'arms',
    cues: [
      "Jeff Nippard tavsiyasi: Tirsaklarni tanaga mahkam yopishtirib, oldinga-orqaga tebranishdan saqlaning.",
      "Ko'tarishda faqat bicep qisqarsin, tepada 1 soniya qattiq siqing.",
      "Pastga tushish 2-3 soniya davom etsin (eccentric fazani nazorat qiling)."
    ],
    mistakes: [
      "Bel orqali chayqalib inersiya bilan ko'tarish.",
      "Tirsaklarni oldinga ko'tarib yukni yelkaga o'tkazish."
    ],
    youtubeQuery: 'Jeff Nippard The Smartest Way To Build Bigger Biceps',
    youtubeId: 'ykJmrZ5v0Oo'
  },
  {
    id: 'tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    nameUz: 'Blokda tricepsni pastga yozish',
    muscleGroup: 'arms',
    cues: [
      "Jeff Nippard tavsiyasi: Tirsaklarni qovurg'alarga mahkam tirang va pastga to'liq yozing.",
      "Arqon bilan bajarganda, pastda ikki chetga ochib tricepsni maksimal qising.",
      "Qo'l 90 gradusga yetguncha sekin qaytaring."
    ],
    mistakes: [
      "Tirsaklarni harakat davomida qanot kabi ochib yuborish.",
      "Gavda og'irligi bilan blok ustiga yotib olish."
    ],
    youtubeQuery: 'Jeff Nippard The Best Way To Build Bigger Triceps',
    youtubeId: '2-LAMcpzODU'
  },

  // CORE / ABS
  {
    id: 'plank',
    name: 'Plank',
    nameUz: 'Planka (Plank)',
    muscleGroup: 'core',
    cues: [
      "Jeff Nippard tavsiyasi: Faqat turish emas, qorin va dumbani faol tarzda qattiq siqib 'hollow body' pozitsiyasini oling.",
      "Tirsaklar to'g'ri yelkalar ostida bo'lsin.",
      "Nafasni ushlab qolmang, bir maromda chuqur nafas oling."
    ],
    mistakes: [
      "Belni pastga osiltirib yuborish.",
      "Boshni haddan tashqari ko'tarish yoki osiltirish."
    ],
    youtubeQuery: 'Jeff Nippard The Best Way To Train Abs Core',
    youtubeId: 'ASdvN_XEl_c'
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise',
    nameUz: 'Turnikda oyoq/tizza ko‘tarish',
    muscleGroup: 'core',
    cues: [
      "Jeff Nippard tavsiyasi: Turnikda osilganda tebranmaslik uchun har bir takror oldidan to'liq to'xtang.",
      "Tizzalarni yoki tekis oyoqlarni ko'tarayotganda tos suyagini (pelvis) yuqoriga buking.",
      "Faqat oyoqni emas, qorin mushagini siqishga diqqat qarating."
    ],
    mistakes: [
      "Inersiya bilan siltanib tebranish.",
      "Tos suyagini bukmasdan faqat son mushagi orqali ko'tarish."
    ],
    youtubeQuery: 'Jeff Nippard Hanging Leg Raises Abs Form',
    youtubeId: 'hdng3Nm1x_E'
  }
];
