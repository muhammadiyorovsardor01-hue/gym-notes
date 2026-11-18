# GymNotes 🏋️‍♂️💪
> Sport va zal (gym) uchun maxsus ishlab chiqilgan, zamonaviy va tezkor mashg'ulotlar kundaligi.

GymNotes — fitness va bodibilding bilan shug'ullanuvchilar uchun mashg'ulotlarni qulay va tartibli qayd etib borish imkonini beruvchi PWA Web ilova.

---

## 🚀 Asosiy imkoniyatlar (Features)

1. **Mashqlar va yondashuvlar (Sets) nazorati:**
   - Toshning vazni (kg) va takrorlashlar soni (reps)ni qulay kiritish va `+ / -` tugmalari bilan tezkor boshqarish.
   - Har bir set tugagach `[✓]` belgilash.
   - Oldingi rekordlarni (PR) ko'rsatib turish.

2. **Mashq texnikasi va YouTube integratsiyasi:**
   - Har bir mashq uchun **to'g'ri bajarish qoidalari** (Cues) va **saqlanish kerak bo'lgan xatolar**.
   - **Bir marta bosish orqali YouTube'dagi eng sara video qo'llanmalarga o'tish**.
   - Ilova ichida to'g'ridan-to'g'ri videoni tomosha qilish imkoniyati.

3. **Avtomatik Dam Olish Taymeri (Rest Timer):**
   - Set bajarilganda avtomatik dam olish hisoblagichi ishga tushadi (60s, 90s va h.k.).
   - Web Audio API orqali ovozli signal (chime) va tebranish (vibration).
   - `+30s`, pauza va qayta boshlash tugmalari.

4. **Shaxsiy Rekordlar (PR) va Mashg'ulotlar Tarixi:**
   - Har bir mashqda ko'tarilgan maksimal vaznlar (PR - Personal Records) alohida kubok 🏆 bo'limida saqlanadi.
   - Barcha o'tgan mashg'ulotlar arxivi, umumiy ko'tarilgan tonnaj (kg) va vaqt hisobi.

5. **100% Offline va Tezkor (PWA):**
   - `localStorage` orqali zalning yerto'lalarida ham internet talab qilmasdan to'liq ishlaydi.
   - Telefonga "Bosh ekranga qo'shish" (Add to Home screen) orqali to'laqonli ilova sifatida o'rnatiladi.

---

## 🛠 Texnologiyalar (Tech Stack)

- **Frontend:** React 19, TypeScript, Vite
- **Stillar:** Tailwind CSS v4
- **Ikonkalar:** Lucide React
- **Animatsiyalar & Audio:** Canvas Confetti, Web Audio API
- **Platforma:** Mobile-First Responsive PWA

---

## 💻 Mahalliy ishga tushirish (Local Development)

```bash
# 1. Loyihani yuklab oling yoki papkaga kiring
cd gym-notes

# 2. Bog'liqliklarni o'rnating
npm install

# 3. Dasturchi rejimida ishga tushiring
npm run dev
```

Brauzerda `http://localhost:5173` manzilida ochiladi.

---

## 📦 Production uchun yig'ish (Build)

```bash
npm run build
```
Natija `dist/` papkasiga saqlanadi. Vercel, Netlify yoki GitHub Pages orqali bir necha soniyada bepul joylashtirish mumkin.
