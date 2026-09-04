/* ============================================================
   scenes-5.js — 14..17 posterlari
   ============================================================ */
(() => {
const { C, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene, card, boxRow, pill, branch, title } = K;
const list = (x, y, items, c, gap = 23) => items.map((t, i) =>
  `${label(x, y + i * gap, '▸', c, 11, 'start')}${label(x + 16, y + i * gap, t, '#9fb0d0', 12.5, 'start')}`).join('');

/* ============================================================
   14 — BACKEND API
   ============================================================ */
App.demo('api', m => {
  scene(m, {
    vb: '0 0 1000 685',
    svg: `
      ${node({ x: 40, y: 25, w: 220, h: 86, t: '🌐 Veb-sayt', s: 'brauzer · React', c: C.v, tip: 'web', step: 1 })}
      ${node({ x: 390, y: 25, w: 220, h: 86, t: '💻 Desktop', s: 'Windows · macOS', c: C.v, tip: 'desk', step: 1 })}
      ${node({ x: 740, y: 25, w: 220, h: 86, t: '📱 Mobil ilova', s: 'Android · iOS', c: C.v, tip: 'mob', step: 1 })}

      ${link('M150,115 C150,160 420,150 460,185', { c: C.v, dur: 2.2, step: 2 })}
      ${link('M500,115 L500,185', { c: C.v, dur: 2.2, step: 2, delay: .3 })}
      ${link('M850,115 C850,160 580,150 540,185', { c: C.v, dur: 2.2, step: 2, delay: .6 })}

      ${card({ x: 300, y: 190, w: 400, h: 110, t: '⚙️  BACKEND API', sub: 'barcha mantiq va xavfsizlik shu yerda', c: C.c, tip: 'api', step: 2, body: `
        ${['tekshirish', 'hisoblash', 'ruxsat', 'saqlash'].map((t, i) => pill(20 + i * 92, 4, t, C.c, 84, 24, 10.5)).join('')}` })}

      ${link('M500,305 L500,375', { c: C.g, dur: 1.8, step: 3 })}
      <g data-step="3">${cyl(425, 380, 150, 90, 'Baza', C.a, 'ma\'lumot')}</g>
      ${mono(640, 415, 'API — mijoz va baza orasidagi yagona rasmiy eshik', '#6d7f9f', 11.5, 'start')}
      ${mono(640, 437, 'brauzer bazaga to\'g\'ridan-to\'g\'ri ulanmaydi', C.r, 11.5, 'start')}

      ${card({ x: 20, y: 490, w: 310, h: 178, n: '1', t: 'ENDPOINTLAR', sub: 'API ning "eshiklari"', c: C.g, tip: 'ep', body: `
        ${[['GET', '/mahsulotlar', C.g], ['POST', '/buyurtmalar', C.c], ['PUT', '/profil', C.a], ['DELETE', '/savat/7', C.r]]
          .map((r, i) => `${pill(16, 6 + i * 26, r[0], r[2], 66, 22, 10)}${mono(92, 21 + i * 26, r[1], '#9fb0d0', 11.5, 'start')}`).join('')}` })}

      ${card({ x: 345, y: 490, w: 310, h: 178, n: '2', t: 'NEGA BITTA API?', c: C.v, tip: 'why', body: `
        ${list(16, 18, ['Mantiq bir joyda — 3 marta yozilmaydi', 'Qoida o\'zgarsa, faqat backend yangilanadi', 'Xavfsizlik mijozga bog\'liq emas', 'Yangi platforma qo\'shish oson'], C.v, 22)}` })}

      ${card({ x: 670, y: 490, w: 310, h: 178, n: '3', t: 'JSON — UMUMIY TIL', c: C.a, tip: 'json', body: `
        ${mono(16, 16, '{ "id": 42, "nom": "Noutbuk",', C.a, 11, 'start')}
        ${mono(16, 32, '  "narx": 9800000 }', C.a, 11, 'start')}
        ${label(16, 58, 'Veb — kartochka qilib chizadi', '#8fa2c4', 11.5, 'start')}
        ${label(16, 78, 'Desktop — jadvalga soladi', '#8fa2c4', 11.5, 'start')}
        ${label(16, 98, 'Mobil — ro\'yxat qilib ko\'rsatadi', '#8fa2c4', 11.5, 'start')}
        ${mono(16, 120, 'ma\'lumot bitta — ko\'rinish har xil', C.a, 10.5, 'start')}` })}`,
    steps: [
      { t: 'Mijozlar', d: '<b>1.</b> Uch xil qurilma — bir xil ehtiyoj: "menga mahsulotlar ro\'yxatini ber".' },
      { t: 'API', d: '<b>2.</b> Hammasi <b>bitta API</b> ga murojaat qiladi. Tekshiruv, hisob va qoidalar shu yerda — bir marta yozilgan.' },
      { t: 'Baza', d: '<b>3.</b> API bazadan oladi va hammaga <b>bir xil JSON</b> qaytaradi. Har bir qurilma uni o\'z uslubida chizadi.' }
    ],
    tips: {
      web: '<b>Veb-sayt</b> — brauzerda ishlaydi. Ma\'lumotni API dan oladi va HTML/CSS bilan chizadi.',
      desk: '<b>Desktop ilova</b> — o\'rnatiladigan dastur, lekin ma\'lumotni baribir o\'sha API dan oladi.',
      mob: '<b>Mobil ilova</b> — Flutter yoki React Native bilan yozilgan bo\'lishi mumkin; API uchun farqi yo\'q.',
      api: '<b>API</b> — kelishilgan qoidalar to\'plami: "shu manzilga shunday so\'rov yuborsang, shunday javob olasan".',
      ep: '<b>Endpoint</b> — API ning bitta eshigi: manzil + metod. Har biri aniq bitta vazifani bajaradi.',
      why: 'Agar mantiq har bir ilovada alohida yozilsa — narx qoidasi o\'zgarganda <b>uch joyda</b> tuzatish kerak bo\'ladi va biri albatta unutiladi.',
      json: '<b>JSON</b> — sodda matn formati. Uni Python ham, Swift ham, JavaScript ham bir xil tushunadi.'
    }
  });
});

/* ============================================================
   15 — AUTHENTICATION vs AUTHORIZATION
   ============================================================ */
App.demo('auth', m => {
  const ok = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="rgba(52,211,153,.18)" stroke="${C.g}" stroke-width="1.2"/>${label(x, y + 4, '✓', C.g, 12, 'middle', 700)}`;
  const no = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="rgba(248,113,113,.14)" stroke="${C.r}" stroke-width="1.2"/>${label(x, y + 4, '✕', C.r, 12, 'middle', 700)}`;

  scene(m, {
    vb: '0 0 1000 685',
    svg: `
      ${card({ x: 20, y: 15, w: 470, h: 270, n: '1', t: 'AUTHENTICATION', sub: '“SEN KIMSAN?” — pasport nazorati', c: C.c, tip: 'authn', body: `
        ${['🔑 Login va parol', '📱 SMS yoki ilova kodi', '👆 Barmoq izi / Face ID'].map((t, i) =>
          `${label(20, 20 + i * 32, t, '#9fb0d0', 12.5, 'start')}`).join('')}
        ${link('M300,45 L370,45', { c: C.c, dur: 1.6 })}
        ${node({ x: 250, y: 100, w: 200, h: 66, t: '🎟️ Token beriladi', s: 'vaqtinchalik propusk', c: C.c })}
        ${label(20, 130, 'Natija:', C.c, 12.5, 'start', 700)}
        ${label(20, 152, 'server endi kim ekaningizni', '#8fa2c4', 11.5, 'start')}
        ${label(20, 170, 'biladi — har safar parol so\'ramaydi', '#8fa2c4', 11.5, 'start')}` })}

      ${card({ x: 510, y: 15, w: 470, h: 270, n: '2', t: 'AUTHORIZATION', sub: '“SENGA RUXSATMI?” — qaysi xonaga kirasiz', c: C.v, tip: 'authz', body: `
        ${['Bosh sahifa', 'Profilim', 'Admin panel'].map((t, i) => label(150 + i * 105, 14, t, '#8fa2c4', 10.5)).join('')}
        ${[['👤 Mehmon', [1, 0, 0]], ['🙋 Foydalanuvchi', [1, 1, 0]], ['👨‍💼 Admin', [1, 1, 1]]]
          .map((r, i) => `${label(20, 52 + i * 46, r[0], '#e8eefc', 12.5, 'start', 600)}
            ${r[1].map((v, j) => v ? ok(150 + j * 105, 47 + i * 46) : no(150 + j * 105, 47 + i * 46)).join('')}`).join('')}
        ${mono(20, 192, 'bir xil token — har eshikda alohida tekshiriladi', '#6d7f9f', 11, 'start')}` })}

      ${card({ x: 20, y: 305, w: 310, h: 192, n: '3', t: '401  Unauthorized', c: C.a, tip: 'c401', body: `
        ${label(18, 20, '“Kim ekaningizni bilmayapmiz”', C.a, 12.5, 'start', 600)}
        ${list(18, 48, ['Token yo\'q', 'Token muddati o\'tgan', 'Token soxta'], C.a, 22)}
        ${pill(18, 118, 'Yechim: qaytadan kiring', C.a, 250, 26, 11)}` })}

      ${card({ x: 345, y: 305, w: 310, h: 192, n: '4', t: '403  Forbidden', c: C.r, tip: 'c403', body: `
        ${label(18, 20, '“Kimligingizni bilamiz, ruxsat yo\'q”', C.r, 12.5, 'start', 600)}
        ${list(18, 48, ['Rol yetarli emas', 'Boshqaning ma\'lumoti', 'Tarif rejasi cheklaydi'], C.r, 22)}
        ${pill(18, 118, 'Qayta kirish yordam bermaydi', C.r, 250, 26, 11)}` })}

      ${card({ x: 670, y: 305, w: 310, h: 192, n: '5', t: 'AMALDA QANDAY?', c: C.g, tip: 'flow', body: `
        ${list(18, 20, ['1. Login → token olasiz', '2. Token qurilmada saqlanadi', '3. Har so\'rovda avtomatik yuboriladi', '4. Server har safar tekshiradi'], C.g, 24)}` })}

      ${card({ x: 20, y: 517, w: 960, h: 152, n: '6', t: '⚠️ ENG KO\'P UCHRAYDIGAN XATO', c: C.p, tip: 'mistake', body: `
        ${label(24, 22, '“Admin tugmasini yashirdim — endi oddiy foydalanuvchi kira olmaydi.”', C.r, 13.5, 'start', 600)}
        ${label(24, 48, 'Yo\'q. Tugmani yashirish — bu bezak. Foydalanuvchi so\'rovni to\'g\'ridan-to\'g\'ri yuborishi mumkin.', '#9fb0d0', 12.5, 'start')}
        ${label(24, 72, 'Tekshiruv DOIM serverda bo\'lishi kerak — frontend faqat qulaylik uchun yashiradi.', C.g, 12.5, 'start', 600)}
        ${mono(24, 100, 'frontend: yashiradi  ·  backend: haqiqatan taqiqlaydi', '#6d7f9f', 11.5, 'start')}` })}`,
    caption: '👆 Kartochkalarni bosing — farqi bir jumlada tushuntiriladi.',
    tips: {
      authn: '<b>Authentication</b> bir marta bo\'ladi — kirishda. Natijasi: sizga <b>token</b> beriladi.',
      authz: '<b>Authorization</b> esa <b>har safar</b> tekshiriladi: bu odam aynan shu amalga haqlimi?',
      c401: '<b>401</b> — “sen kimsan?” savoliga javob yo\'q. Ya\'ni siz hali tizimga kirmagansiz yoki tokeningiz eskirgan.',
      c403: '<b>403</b> — kim ekaningiz aniq, lekin bu eshik siz uchun emas. Boshqa rol kerak.',
      flow: 'Token — vaqtinchalik propusk. U qurilmada saqlanadi va har bir so\'rov bilan birga yuboriladi.',
      mistake: 'Xavfsizlik <b>ko\'rinmaydigan tomonda</b> qilinadi. Frontenddagi tekshiruv — faqat foydalanuvchiga qulaylik.'
    }
  });
});

/* ============================================================
   16 — JWT TOKEN
   ============================================================ */
App.demo('jwt', m => {
  const seg = (x, w, c, t, sub) => `<g>
    <rect x="${x}" y="0" width="${w}" height="54" rx="12" fill="${c}20" stroke="${c}" stroke-width="1.4"/>
    ${label(x + w / 2, 24, t, c, 13, 'middle', 700)}${mono(x + w / 2, 42, sub, '#8fa2c4', 10.5)}</g>`;

  scene(m, {
    vb: '0 0 1000 680',
    svg: `
      ${label(500, 24, 'JWT — imzolangan bilet. Uch qismdan iborat, nuqta bilan ajratiladi.', '#9fb0d0', 13)}
      <g transform="translate(30,40)">
        ${seg(0, 270, C.r, 'HEADER', 'qaysi algoritm')}
        ${label(280, 32, '.', '#6d7f9f', 22)}
        ${seg(295, 320, C.v, 'PAYLOAD', 'kim ekaningiz')}
        ${label(625, 32, '.', '#6d7f9f', 22)}
        ${seg(640, 300, C.c, 'SIGNATURE', 'imzo — muhr')}
      </g>
      ${mono(500, 118, 'eyJhbGciOiJIUzI1NiJ9  .  eyJzdWIiOjQyLCJyb2wiOiJ1c2VyIn0  .  4f9a2c…', '#4b5b78', 11.5)}

      ${card({ x: 20, y: 140, w: 310, h: 175, n: '1', t: 'HEADER', c: C.r, tip: 'h', body: `
        ${mono(18, 18, 'alg: HS256', C.r, 12, 'start')}${mono(18, 38, 'typ: JWT', C.r, 12, 'start')}
        ${label(18, 68, 'Qaysi algoritm bilan', '#8fa2c4', 11.5, 'start')}
        ${label(18, 86, 'imzolanganini aytadi.', '#8fa2c4', 11.5, 'start')}
        ${pill(18, 100, 'ochiq o\'qiladi', C.n, 130, 24, 10.5)}` })}

      ${card({ x: 345, y: 140, w: 310, h: 175, n: '2', t: 'PAYLOAD', c: C.v, tip: 'p', body: `
        ${mono(18, 18, 'sub: 42', C.v, 12, 'start')}${mono(18, 38, 'ism: "Aziza"', C.v, 12, 'start')}
        ${mono(18, 58, 'rol: "user"', C.v, 12, 'start')}${mono(18, 78, 'exp: 14:02', C.v, 12, 'start')}
        ${label(18, 104, 'Ma\'lumot SHIFRLANMAGAN —', C.a, 11.5, 'start', 600)}
        ${label(18, 120, 'har kim o\'qiy oladi!', C.a, 11.5, 'start', 600)}` })}

      ${card({ x: 670, y: 140, w: 310, h: 175, n: '3', t: 'SIGNATURE', c: C.c, tip: 's', body: `
        ${mono(18, 18, 'header + payload', C.c, 11.5, 'start')}
        ${mono(18, 36, '+ 🔐 maxfiy kalit', C.c, 11.5, 'start')}
        ${mono(18, 54, '= 4f9a2c8b…', C.c, 11.5, 'start')}
        ${label(18, 84, 'Kalit faqat serverda.', '#8fa2c4', 11.5, 'start')}
        ${label(18, 102, 'Shuning uchun imzoni', '#8fa2c4', 11.5, 'start')}
        ${label(18, 120, 'hech kim qalbakilashtira olmaydi.', '#8fa2c4', 11.5, 'start')}` })}

      ${card({ x: 20, y: 335, w: 960, h: 165, n: '4', t: 'TOKEN QANDAY ISHLAYDI?', c: C.g, tip: 'flow', body: `
        ${[['🔑', 'Login', 'parol to\'g\'ri'], ['✍️', 'Server imzolaydi', 'token beriladi'], ['📱', 'Mijozda saqlanadi', 'har so\'rovda yuboriladi'], ['🔍', 'Server tekshiradi', 'imzoni qayta hisoblaydi'], ['✅', 'Ruxsat', 'yoki 401']]
          .map((r, i) => `${node({ x: 20 + i * 192, y: 8, w: 172, h: 74, t: r[0] + ' ' + r[1], s: r[2], c: C.g })}
            ${i < 4 ? link(`M${196 + i * 192},45 L${208 + i * 192},45`, { c: C.g, dur: 1.4, dot: false }) : ''}`).join('')}` })}

      ${card({ x: 20, y: 520, w: 465, h: 150, n: '5', t: '😈 PAYLOADNI O\'ZGARTIRSAM-CHI?', c: C.r, tip: 'hack', body: `
        ${label(20, 20, 'rol: "user"  →  rol: "admin"', C.a, 12.5, 'start', 600)}
        ${label(20, 46, 'Server imzoni qayta hisoblaydi va solishtiradi:', '#9fb0d0', 12, 'start')}
        ${mono(20, 70, 'kutilgan: 4f9a2c…   ·   kelgan: 4f9a2c… ✕ mos emas', C.r, 11.5, 'start')}
        ${pill(20, 84, '401 — token soxta, kirish rad etildi', C.r, 320, 26, 11)}` })}

      ${card({ x: 510, y: 520, w: 470, h: 150, n: '6', t: 'MUHIM QOIDALAR', c: C.a, tip: 'rules', body: `
        ${list(18, 18, ['Ichiga parol yoki karta raqami YOZILMAYDI', 'Access token — qisqa umr (5–15 daqiqa)', 'Refresh token — uzoq umr, yangisini oladi', 'Token o\'g\'irlansa — HTTPS shart'], C.a, 22)}` })}`,
    caption: '👆 Uch qism va oqim kartochkalarini bosing.',
    tips: {
      h: '<b>Header</b> — texnik qism: qaysi algoritm bilan imzo qo\'yilgan.',
      p: '<b>Payload</b> — asosiy ma\'lumot: kim, qaysi rol, qachongacha amal qiladi. <b>Shifrlanmagan</b> — faqat kodlangan.',
      s: '<b>Signature</b> — muhr. Header va payloaddan <b>maxfiy kalit</b> bilan hisoblanadi. Kalitsiz uni qayta yaratib bo\'lmaydi.',
      flow: 'Server tokenni <b>saqlab o\'tirmaydi</b> — u har safar imzoni qayta hisoblab tekshiradi. Shuning uchun JWT millionlab foydalanuvchida ham yengil.',
      hack: 'Payloadni o\'zgartirish oson, lekin <b>yangi to\'g\'ri imzo yasash</b> mumkin emas — maxfiy kalit sizda yo\'q.',
      rules: 'JWT ichidagi hamma narsani begona ham o\'qiy oladi. Shuning uchun u yerga <b>faqat kimligingiz</b> yoziladi.'
    }
  });
});

/* ============================================================
   17 — BACKUP
   ============================================================ */
App.demo('backup', m => {
  scene(m, {
    vb: '0 0 1000 665',
    svg: `
      ${zone(20, 30, 960, 170, 'VAQT O\'QI — kunlik backup va halokat', C.c)}
      <line x1="60" y1="130" x2="940" y2="130" stroke="rgba(120,150,220,.35)" stroke-width="2"/>
      ${[['Dush', 120], ['Sesh', 260], ['Chor', 400], ['Pay', 540]].map(([d, x]) => `
        <g><circle cx="${x}" cy="130" r="9" fill="${C.g}" filter="url(#gl2)"/>
        ${label(x, 108, '📸', '#e8eefc', 15)}${mono(x, 152, d, '#8fa2c4', 11)}</g>`).join('')}
      <g><circle cx="700" cy="130" r="13" fill="${C.r}" filter="url(#gl)"/>
        ${label(700, 104, '💥', '#e8eefc', 18)}${mono(700, 156, 'server buzildi', C.r, 11)}</g>
      ${link('M700,130 C700,70 620,70 545,110', { c: C.g, dur: 2, arrow: true })}
      ${mono(620, 62, '↩ oxirgi nusxadan tiklash', C.g, 11)}
      <rect x="545" y="118" width="155" height="24" rx="8" fill="rgba(251,191,36,.14)" stroke="${C.a}" stroke-width="1.1" stroke-dasharray="4 3"/>
      ${mono(622, 134, 'yo\'qolgan oyna', C.a, 10.5)}
      ${label(870, 130, 'RPO', C.a, 14, 'middle', 700)}
      ${mono(870, 150, 'qancha ma\'lumot yo\'qoladi', '#6d7f9f', 10)}

      ${card({ x: 20, y: 225, w: 310, h: 210, n: '1', t: 'BACKUP NIMADAN QUTQARADI?', c: C.g, tip: 'what', body: `
        ${list(18, 20, ['🗑️ Xato bilan o\'chirilgan ma\'lumot', '💽 Disk yoki server buzilishi', '🦠 Ransomware — shifrlab tovlash', '🚀 Yomon yangilanish (deploy)', '🔥 Yong\'in, suv, o\'g\'irlik'], C.g, 26)}` })}

      ${card({ x: 345, y: 225, w: 310, h: 210, n: '2', t: '3–2–1 QOIDASI', c: C.c, tip: 'rule', body: `
        ${[['3', 'nusxa: asl + 2 backup', C.c], ['2', 'xil turdagi joyda', C.a], ['1', 'nusxa boshqa manzilda / bulutda', C.g]]
          .map((r, i) => `${pill(18, 12 + i * 46, r[0], r[2], 40, 34, 15)}${label(70, 34 + i * 46, r[1], '#9fb0d0', 12, 'start')}`).join('')}
        ${mono(18, 158, 'bir joyda turgan 3 nusxa — bitta yong\'inda yo\'q bo\'ladi', '#6d7f9f', 10.5, 'start')}` })}

      ${card({ x: 670, y: 225, w: 310, h: 210, n: '3', t: 'IKKI MUHIM RAQAM', c: C.v, tip: 'rpo', body: `
        ${label(18, 20, 'RPO', C.a, 13, 'start', 700)}
        ${label(60, 20, '— qancha ma\'lumot yo\'qolishi mumkin', '#9fb0d0', 11.5, 'start')}
        ${mono(18, 40, 'kunlik backup → 24 soatlik ma\'lumot', '#6d7f9f', 10.5, 'start')}
        ${label(18, 78, 'RTO', C.g, 13, 'start', 700)}
        ${label(60, 78, '— qancha vaqtda tiklanadi', '#9fb0d0', 11.5, 'start')}
        ${mono(18, 98, 'tiklash 2 soat → 2 soat sayt ishlamaydi', '#6d7f9f', 10.5, 'start')}
        ${pill(18, 118, 'ikkisi ham pul bilan o\'lchanadi', C.v, 250, 26, 10.5)}` })}

      ${card({ x: 20, y: 455, w: 465, h: 195, n: '4', t: 'BACKUP TURLARI', c: C.o, tip: 'types', body: `
        ${[['To\'liq', 'hammasi nusxalanadi — sekin, ishonchli'],
           ['Farqli', 'oxirgi to\'liqdan keyingi o\'zgarishlar'],
           ['Qo\'shimcha', 'faqat kechagidan keyingi o\'zgarishlar'],
           ['Snapshot', 'bir zumda "surat" — bulutda mashhur']]
          .map((r, i) => `${label(18, 20 + i * 32, r[0], C.o, 12.5, 'start', 700)}${label(110, 20 + i * 32, r[1], '#8fa2c4', 11.5, 'start')}`).join('')}` })}

      ${card({ x: 510, y: 455, w: 470, h: 195, n: '5', t: '⚠️ ENG KATTA XATO', c: C.r, tip: 'mistake', body: `
        ${label(20, 24, 'Backup olinadi — lekin hech qachon tiklab ko\'rilmaydi.', C.r, 13, 'start', 600)}
        ${label(20, 52, 'Halokat kunida “arxiv buzuq ekan” degani —', '#9fb0d0', 12, 'start')}
        ${label(20, 72, 'backup umuman yo\'q degani.', '#9fb0d0', 12, 'start')}
        ${pill(20, 92, '✓ Har oyda bir marta tiklashni sinab ko\'ring', C.g, 400, 28, 11.5)}
        ${mono(20, 148, 'Va backupni asl server bilan bitta joyda saqlamang.', '#6d7f9f', 11, 'start')}` })}`,
    caption: '👆 Kartochkalarni bosing. Backup — “kerak bo\'lmasa yaxshi, kerak bo\'lganda hayot qutqaradi”.',
    tips: {
      what: 'Ma\'lumot yo\'qolishining eng ko\'p sababi — <b>xaker emas, oddiy inson xatosi</b>.',
      rule: '<b>3-2-1</b> — sanoatning oltin qoidasi. Bitta joydagi nusxalar bitta hodisada birga yo\'qoladi.',
      rpo: '<b>RPO</b> — qancha yo\'qotishga tayyorsiz. <b>RTO</b> — qancha vaqt to\'xtab turishga tayyorsiz. Ikkisi qanchalik kichik bo\'lsa, shuncha qimmat.',
      types: 'Amalda aralash ishlatiladi: haftada bir <b>to\'liq</b>, har kuni <b>qo\'shimcha</b> backup.',
      mistake: '<b>Tekshirilmagan backup — backup emas.</b> Uni tiklab ko\'rmaguningizcha, u shunchaki fayl.'
    }
  });
});

})();
