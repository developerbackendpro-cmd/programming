/* ============================================================
   scenes-3.js — 06..09 infografika posterlari
   ============================================================ */
(() => {
const { C, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene, card, boxRow, pill, branch, title } = K;
const li = (x, y, t, c = '#9fb0d0', ic = '▸', gap = 22, i = 0) =>
  `${label(x, y + i * gap, ic, c, 11, 'start')}${label(x + 16, y + i * gap, t, '#9fb0d0', 12.5, 'start')}`;
const list = (x, y, items, c) => items.map((t, i) => li(x, y, t, c, '▸', 23, i)).join('');

/* ============================================================
   06 — PAKETLAR · npm · pip
   ============================================================ */
App.demo('packages', m => {
  const dep = (x, y) => `
    ${pill(x, y, 'express', C.a, 92)}
    ${branch(x + 92, y + 13, [y + 13 - 40, y + 13 - 13, y + 13 + 14, y + 13 + 41], 30)}
    ${['accepts', 'cookie', 'send', 'qs'].map((d, i) => pill(x + 152, y - 40 + i * 27, d, C.n, 86, 22, 10.5)).join('')}
    ${branch(x + 238, y + 13, [y - 22, y + 48], 26)}
    ${['mime', 'depd', 'ms', 'etag'].map((d, i) => pill(x + 290, y - 34 + i * 27, d, '#4b5b78', 74, 22, 10)).join('')}`;

  scene(m, {
    vb: '0 0 1000 640',
    svg: `
      ${card({ x: 25, y: 20, w: 285, h: 128, n: '1', t: 'npm', sub: 'JavaScript ombori', c: C.a, tip: 'npm', body: `
        ${label(20, 18, '📦 2 500 000+ paket', '#9fb0d0', 13, 'start')}
        ${mono(20, 42, 'npm install express', C.a, 12, 'start')}
        ${mono(20, 62, 'ro\'yxat: package.json', '#6d7f9f', 11, 'start')}` })}

      ${card({ x: 690, y: 20, w: 285, h: 128, n: '2', t: 'pip', sub: 'Python ombori (PyPI)', c: C.c, tip: 'pip', body: `
        ${label(20, 18, '🐍 500 000+ paket', '#9fb0d0', 13, 'start')}
        ${mono(20, 42, 'pip install fastapi', C.c, 12, 'start')}
        ${mono(20, 62, 'ro\'yxat: requirements.txt', '#6d7f9f', 11, 'start')}` })}

      ${node({ x: 375, y: 44, w: 250, h: 82, t: '💼 Loyihangiz', s: 'siz yozgan kod', c: C.v, tip: 'proj' })}
      ${link('M312,84 L370,84', { c: C.a, dur: 1.8 })}
      ${link('M688,84 L630,84', { c: C.c, dur: 1.8 })}

      ${card({ x: 25, y: 175, w: 300, h: 200, n: '3', t: 'NEGA KERAK?', c: C.g, tip: 'why', body: `
        ${list(18, 20, ['Noldan yozish — oylab vaqt', 'Tayyor paket — 1 daqiqa', 'Millionlab odam sinagan', 'Xavfsizlik yangilanishlari keladi', 'Hujjat va misollari bor'], C.g)}` })}

      ${card({ x: 345, y: 175, w: 630, h: 200, n: '4', t: 'BOG\'LIQLIKLAR DARAXTI', sub: 'bitta paket boshqalarni ergashtirib keladi', c: C.o, tip: 'tree', body: `
        ${dep(20, 60)}
        ${mono(20, 128, '1 paket → 4 bog\'liqlik → 12 kichik bog\'liqlik …', C.o, 11.5, 'start')}` })}

      ${card({ x: 25, y: 400, w: 465, h: 215, n: '5', t: 'VERSIYA NIMANI ANGLATADI?', c: C.v, tip: 'ver', body: `
        ${[['4', 'MAJOR', 'katta o\'zgarish — eski kod buzilishi mumkin', C.r],
           ['18', 'MINOR', 'yangi imkoniyat qo\'shildi', C.a],
           ['2', 'PATCH', 'xato tuzatildi', C.g]].map(([v, n, d, c], i) => `
          <g transform="translate(20,${18 + i * 46})">
            ${pill(0, 0, v, c, 44)} ${label(58, 12, n, c, 12.5, 'start', 700)}
            ${label(58, 28, d, '#8fa2c4', 11, 'start')}</g>`).join('')}
        ${mono(20, 168, 'express@4.18.2 — jamoadagi hamma aynan shu nusxani oladi', '#6d7f9f', 11, 'start')}` })}

      ${card({ x: 510, y: 400, w: 465, h: 215, n: '6', t: '⚠️ EHTIYOT BO\'LING', c: C.r, tip: 'warn', body: `
        ${list(18, 20, ['Har bir paket — birovning kodi', 'Bitta paket 100 ta bog\'liqlik olib keladi', 'Tashlab ketilgan paket — xavfsizlik teshigi', '2 qatorlik ish uchun paket olmang', 'Yangilashdan oldin o\'zgarishlarni o\'qing'], C.r)}` })}`,
    caption: '👆 Kartochkalarni bosing — har biri haqida qisqa izoh chiqadi.',
    tips: {
      npm: '<b>npm</b> — JavaScript dunyosining paket ombori. Buyruq berasiz, u paketni <b>va uning barcha bog\'liqliklarini</b> yuklab, versiyasini <span class="mono">package.json</span> ga yozib qo\'yadi.',
      pip: '<b>pip</b> — Python uchun aynan shu vazifani bajaradi. Ro\'yxat <span class="mono">requirements.txt</span> faylida saqlanadi va boshqa kompyuterda bitta buyruq bilan tiklanadi.',
      proj: '<b>Loyihangiz</b> — aslida ozgina o\'z kodingiz + ko\'p tayyor paketlar. Zamonaviy ilovaning 80–90% i shunday quriladi.',
      why: '<b>Nega paket?</b> Sana formatlash, rasm kesish, to\'lov tizimi — bularning har biri oylab ish. Paket bu ishni <b>bir daqiqaga</b> qisqartiradi.',
      tree: '<b>Bog\'liqlik</b> — paketning o\'zi ishlashi uchun kerak bo\'lgan boshqa paket. Shuning uchun 1 ta paket o\'rnatsangiz, papkada yuzlab papka paydo bo\'ladi.',
      ver: '<b>Versiya</b> uch qismdan iborat. Faqat birinchi raqam o\'zgarsa — ehtiyot bo\'ling, eski kodingiz ishlamay qolishi mumkin.',
      warn: '<b>Xavf:</b> paket bilan birga siz o\'qimagan kod loyihangizga kiradi. Shuning uchun mashhur, faol qo\'llab-quvvatlanadigan paketlarni tanlang.'
    }
  });
});

/* ============================================================
   07 — SERVER NIMA?
   ============================================================ */
App.demo('server', m => {
  const client = (x, y, ic, t) => `<g><rect x="${x}" y="${y}" width="112" height="50" rx="12" fill="url(#pn)" stroke="${C.v}" stroke-width="1.3"/>
    <text x="${x + 16}" y="${y + 32}" font-size="17">${ic}</text>${label(x + 74, y + 30, t, '#9fb0d0', 11)}</g>`;

  scene(m, {
    vb: '0 0 1000 756',
    svg: `
      ${zone(20, 48, 970, 282, 'SERVER — DOIM YOQIQ MASHINA + PORTNI TINGLAYOTGAN DASTUR', C.c)}

      <rect x="38" y="76" width="132" height="200" rx="16" fill="rgba(139,92,246,.06)" stroke="${C.v}" stroke-width="1.2" stroke-dasharray="6 6"/>
      ${[['📱', 'telefon'], ['💻', 'noutbuk'], ['🖥️', 'kompyuter']].map((c2, i) => client(48, 90 + i * 62, c2[0], c2[1])).join('')}
      ${label(104, 296, 'MIJOZLAR (minglab)', C.v, 11.5, 'middle', 700)}

      ${link('M176,140 L392,140', { c: C.v, dur: 2 })}
      ${mono(284, 128, 'so\'rov  ·  HTTPS :443', C.v, 10.5)}
      ${link('M392,222 L176,222', { c: C.g, dur: 2 })}
      ${mono(284, 244, 'javob  ·  200 OK + JSON', C.g, 10.5)}

      <g data-tip="srv">${rack(400, 106, 170, 150, C.c)}</g>
      ${label(485, 284, '⚙️ Server dasturi', C.c, 12, 'middle', 700)}
      ${mono(485, 302, 'so\'rov kut → javob ber → kut', '#6d7f9f', 10.5)}

      ${link('M574,140 L748,140', { c: C.a, dur: 1.8 })}
      ${mono(661, 128, 'SQL so\'rov  ·  :5432', C.a, 10.5)}
      ${link('M748,222 L574,222', { c: C.g, dur: 1.8 })}
      ${mono(661, 244, 'javob  ·  qatorlar', C.g, 10.5)}

      <g data-tip="db">${cyl(756, 108, 170, 146, 'Baza', C.a, 'ma\'lumot saqlanadi')}</g>
      ${mono(841, 284, 'PostgreSQL · MySQL', C.a, 11)}
      ${mono(841, 302, 'ko\'pincha alohida mashinada', '#6d7f9f', 10)}

      ${label(500, 364, '⚡ 24/7 — hech qachon o\'chmaydi   ·   91.203.11.7 : 443', C.c, 12, 'middle', 700)}

      ${card({ x: 20, y: 388, w: 310, h: 150, n: '1', t: 'SERVER = 2 NARSA', c: C.v, tip: 'what', body: `
        ${list(18, 18, ['🖥️ Mashina — o\'chmaydigan kompyuter', '⚙️ Dastur — so\'rov kutuvchi kod', '📡 Doimiy IP va tez internet', '🔁 Sikl: kut → javob ber → kut'], C.v)}` })}

      ${card({ x: 345, y: 388, w: 310, h: 150, n: '2', t: 'SERVER TURLARI', c: C.g, tip: 'types', body: `
        ${list(18, 18, ['🌐 Veb server — sahifa/API (Nginx)', '🗄️ Baza serveri — ma\'lumot', '🖼️ Fayl serveri — rasm, video', '✉️ Pochta, o\'yin, cache serverlari'], C.g)}` })}

      ${card({ x: 670, y: 388, w: 310, h: 150, n: '3', t: 'QAYERDAN OLASIZ?', c: C.a, tip: 'host', body: `
        ${list(18, 18, ['🏢 Shared — arzon, qo\'shni bilan', '🧩 VPS — o\'z bo\'lagingiz', '🖥️ Dedicated — butun mashina', '☁️ Bulut — 2 daqiqada, kengayadi'], C.a)}` })}

      ${card({ x: 20, y: 558, w: 960, h: 178, n: '4', t: '', c: C.p, tip: 'vs', body: `
        <line x1="490" y1="0" x2="490" y2="120" stroke="rgba(120,150,220,.22)"/>

        ${label(28, 18, '💻  Ish kompyuteri — bizniki', '#e8eefc', 13.5, 'start', 700)}
        ${[['Kerak bo\'lganda yoqamiz, ish tugagach o\'chiramiz'],
           ['Faqat bitta odamga — sizga xizmat qiladi'],
           ['Manzili o\'zgarib turadi, tashqaridan topib bo\'lmaydi'],
           ['O\'chirsangiz — faqat siz noqulaylik ko\'rasiz']]
          .map((r, i) => `${label(28, 44 + i * 22, '▸', C.n, 11, 'start')}${label(44, 44 + i * 22, r[0], '#9fb0d0', 11.5, 'start')}`).join('')}
        ${label(518, 18, '🖥️  Server kompyuteri', C.c, 13.5, 'start', 700)}
        ${[['Hech qachon o\'chirilmaydi — 365 kun, 24 soat'],
           ['Bir vaqtda minglab odamga xizmat qiladi'],
           ['Doimiy IP va domen — dunyoning har yeridan topiladi'],
           ['O\'chsa — butun sayt va ilova ishlamay qoladi']]
          .map((r, i) => `${label(518, 44 + i * 22, '▸', C.c, 11, 'start')}${label(534, 44 + i * 22, r[0], '#9fb0d0', 11.5, 'start')}`).join('')}` })}`,
    noCap: true,
    tips: {
      db: '<b>Baza</b> — serverning yonidagi ikkinchi dastur (ko\'pincha alohida mashinada). Server unga <b>5432-port</b> orqali ulanadi. Mijoz bazaga hech qachon to\'g\'ridan-to\'g\'ri kira olmaydi.',
      srv: '<b>Server dasturi</b> ishga tushgach cheksiz siklga kiradi: <b>so\'rov kut → javob ber → yana kut</b>. O\'chirsangiz — sayt shu zahoti ochilmay qoladi.',
      what: '<b>Server</b> — sehrli quti emas. Bu oddiy kompyuter, faqat u <b>doim yoqiq</b> va ustida so\'rov kutayotgan dastur turadi.',
      types: 'Bitta jismoniy mashinada bir nechta <b>server-dastur</b> yashashi mumkin: veb server, baza va cache — hammasi bir joyda.',
      host: 'Kichik loyiha uchun <b>VPS</b> yetadi. Yuklama o\'sib borsa, <b>bulut</b> bir necha daqiqada yangi serverlar qo\'shib beradi.',
      vs: 'Ikkalasi ham oddiy kompyuter. Farq shundaki, <b>ish kompyuteri kerak bo\'lganda yoqiladi va ish tugagach o\'chiriladi</b>, server esa <b>hech qachon o\'chirilmaydi</b> — chunki uning ishi boshqalarga xizmat qilish.'
    }
  });
});

/* ============================================================
   08 — DOMEN VA DNS
   ============================================================ */
App.demo('domain', m => {
  scene(m, {
    vb: '0 0 1000 730',
    svg: `
      ${title(500, 34, 'dokon.uz  →  91.203.11.7', '#e8eefc', 21)}
      ${mono(500, 56, 'domen — IP manzilning insonga tushunarli nomi', '#6d7f9f', 11.5)}

      ${node({ x: 20, y: 120, w: 175, h: 72, t: '🌐 Brauzer', s: 'siz', c: C.v, step: 1 })}
      <g data-step="2">${link('M198,156 L274,156', { c: C.v, dur: 1.6 })}
        ${mono(236, 140, 'IP si nima?', C.v, 10)}</g>
      ${node({ x: 278, y: 120, w: 190, h: 72, t: '📖 DNS server', s: 'telefon kitobi', c: C.c, step: 2 })}

      <g data-step="3">${link('M471,144 C520,144 530,108 576,108', { c: C.c, dur: 1.8 })}</g>
      ${node({ x: 580, y: 78, w: 225, h: 60, t: 'Root  (.)', s: 'kim .uz ni biladi?', c: C.n, step: 3 })}
      <g data-step="4">${link('M471,156 L576,186', { c: C.c, dur: 1.8 })}</g>
      ${node({ x: 580, y: 158, w: 225, h: 60, t: 'TLD  (.uz)', s: 'kim dokon.uz ni biladi?', c: C.n, step: 4 })}
      <g data-step="5">${link('M471,168 C520,168 530,266 576,266', { c: C.c, dur: 1.8 })}</g>
      ${node({ x: 580, y: 238, w: 225, h: 60, t: 'Asosiy server', s: 'javob: 91.203.11.7', c: C.g, step: 5 })}

      <g data-step="6">${link('M373,196 L373,244', { c: C.g, dur: 1.4 })}</g>
      ${node({ x: 278, y: 248, w: 190, h: 66, t: '💾 Cache', s: 'IP saqlab qolindi', c: C.g, step: 6 })}
      <g data-step="6">${link('M276,278 C215,278 175,240 130,198', { c: C.g, dur: 1.6 })}
        ${mono(196, 246, 'IP qaytdi', C.g, 10)}</g>

      ${node({ x: 830, y: 158, w: 150, h: 60, t: '🖥️ Server', s: '91.203.11.7', c: C.g, step: 7 })}
      <g data-step="7">${link('M107,196 C107,442 800,506 902,232', { c: C.p, dur: 2.8 })}</g>

      ${card({ x: 20, y: 448, w: 310, h: 270, n: '1', t: 'DOMEN TUZILISHI', c: C.v, tip: 'parts', body: `
        ${pill(18, 10, 'blog', C.p, 70)}${label(96, 28, '.', '#6d7f9f', 16, 'start')}
        ${pill(106, 10, 'dokon', C.v, 84)}${label(198, 28, '.', '#6d7f9f', 16, 'start')}
        ${pill(208, 10, 'uz', C.c, 52)}
        ${[['blog', 'subdomen — bo\'lim: mail, api, admin', C.p],
           ['dokon', 'nom — siz tanlaysiz', C.v],
           ['uz', 'TLD — yuqori zona: .com .uz .io', C.c]].map((r, i) => `
          ${label(18, 76 + i * 44, r[0], r[2], 12.5, 'start', 700)}
          ${label(18, 94 + i * 44, r[1], '#8fa2c4', 11, 'start')}`).join('')}
        ${mono(18, 205, 'domen sotib olinmaydi — yillik ijaraga olinadi', '#6d7f9f', 10.5, 'start')}` })}

      ${card({ x: 345, y: 448, w: 310, h: 270, n: '2', t: 'DNS YOZUVLARI', c: C.c, tip: 'rec', body: `
        ${[['A', 'domen → IPv4 manzil'], ['AAAA', 'domen → IPv6 manzil'], ['CNAME', 'domen → boshqa domen'], ['MX', 'pochta qayerga borsin'], ['TXT', 'tekshiruv uchun matn'], ['NS', 'zonani kim boshqaradi']]
          .map((r, i) => `${pill(18, 8 + i * 33, r[0], C.c, 62, 24, 11)}${label(90, 25 + i * 33, r[1], '#8fa2c4', 11.5, 'start')}`).join('')}` })}

      ${card({ x: 670, y: 448, w: 310, h: 270, n: '3', t: 'NEGA DOMEN KERAK?', c: C.g, tip: 'why', body: `
        ${list(18, 20, ['91.203.11.7 ni hech kim eslamaydi', 'Server almashsa — IP o\'zgaradi,', '   domen esa o\'sha-o\'sha qoladi', 'Bir domen ostida ko\'p bo\'lim:', '   api. · admin. · blog.', 'Brend va ishonch: nom = kompaniya'], C.g)}
        ${mono(18, 190, '⏱️ DNS javobi TTL muddatiga cachelanadi —', '#6d7f9f', 10.5, 'start')}
        ${mono(18, 206, 'shuning uchun yangi domen bir necha soatda tarqaladi.', '#6d7f9f', 10.5, 'start')}` })}`,
    steps: [
      { t: 'Manzil', d: '<b>1.</b> Siz brauzerga <span class="mono">dokon.uz</span> deb yozdingiz. Lekin kompyuterlar nom bilan emas, <b>raqam (IP)</b> bilan topishadi.' },
      { t: 'DNS', d: '<b>2.</b> Brauzer DNS serveridan so\'raydi: "shu nomning IP manzili nima?"' },
      { t: 'Root', d: '<b>3.</b> Root server: "men aniq bilmayman, lekin <b>.uz</b> zonasini falon server biladi".' },
      { t: 'TLD', d: '<b>4.</b> <b>.uz</b> zonasi: "dokon.uz ni o\'z nom serveri biladi, mana manzili".' },
      { t: 'IP', d: '<b>5.</b> Asosiy (authoritative) server javob beradi: <span class="mono">dokon.uz → 91.203.11.7</span>.' },
      { t: 'Cache', d: '<b>6.</b> Javob <b>cachega saqlanadi</b>. Keyingi safar bu uzun yo\'l umuman bosilmaydi — sayt bir zumda ochiladi.' },
      { t: 'Ulanish', d: '<b>7.</b> Endi brauzer o\'sha IP ga <b>to\'g\'ridan-to\'g\'ri</b> ulanadi va sahifani so\'raydi. DNS ishi shu bilan tugadi.' }
    ],
    tips: {
      parts: '<b>Domen tuzilishi</b> — o\'ngdan chapga o\'qiladi: avval zona (.uz), keyin nom, keyin bo\'lim.',
      rec: '<b>DNS yozuvlari</b> — domen "sozlamalari". Eng ko\'p ishlatiladigani <b>A yozuvi</b>: domenni serverning IP manziliga bog\'laydi.',
      why: 'Domen — <b>barqaror nom</b>. Server, hosting yoki hatto mamlakat almashsa ham, foydalanuvchi uchun manzil o\'zgarmaydi.'
    }
  });
});

/* ============================================================
   09 — PROTOKOLLAR: HTTP · HTTPS · TCP · UDP
   ============================================================ */
const PP = (t, vb, inner, note = '') => `
  <div class="scene-box" style="margin-bottom:14px">
    ${t ? `<div class="panel-t" style="position:relative;z-index:2;margin-bottom:4px">${t}</div>` : ''}
    <svg class="scene" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${K.DEFS}${inner}</svg>
    ${note ? `<div class="small muted" style="text-align:center;margin-top:4px;position:relative;z-index:2">${note}</div>` : ''}
  </div>`;

/* ketma-ketlik diagrammasi uchun yordamchilar */
const LX = 130, RX = 870;
const lifelines = (y1, y2) => `
  <line x1="${LX}" y1="${y1}" x2="${LX}" y2="${y2}" stroke="${C.v}" stroke-width="1.4" stroke-opacity=".35" stroke-dasharray="5 6"/>
  <line x1="${RX}" y1="${y1}" x2="${RX}" y2="${y2}" stroke="${C.g}" stroke-width="1.4" stroke-opacity=".35" stroke-dasharray="5 6"/>`;
const actor = (x, y, t, s2, c) => K.node({ x: x - 85, y, w: 170, h: 54, t, s: s2, c });
const msg = (y, dir, txt, c, opt = {}) => {
  const { lost = false, dur = 1.8, note = '' } = opt;
  const x1 = dir > 0 ? LX + 4 : RX - 4;
  const x2 = lost ? (dir > 0 ? 520 : 480) : (dir > 0 ? RX - 6 : LX + 6);
  return `<g>
    ${K.link(`M${x1},${y} L${x2},${y}`, { c: lost ? C.r : c, dur, r: 4.5 })}
    ${K.mono((x1 + x2) / 2, y - 9, txt, lost ? C.r : c, 10.5)}
    ${lost ? `${K.label(x2 + 20, y + 4, '✕ yo\'lda yo\'qoldi', C.r, 11, 'start', 700)}` : ''}
    ${note ? K.mono(x2 + (dir > 0 ? -6 : 6), y + 16, note, '#6d7f9f', 9.5, dir > 0 ? 'end' : 'start') : ''}</g>`;
};

App.demo('protocols', m => {
  /* ---------- TCP ---------- */
  const tcp = `
    ${actor(LX, 26, '💻 Mijoz', 'brauzer', C.v)}
    ${actor(RX, 26, '🖥️ Server', 'sayt', C.g)}
    ${lifelines(84, 560)}

    ${zone(40, 96, 920, 118, '① ULANISH — 3 qadamli qo\'l berish (handshake)', C.c)}
    ${msg(134, 1, 'SYN — “salom, ulanamizmi?”', C.c)}
    ${msg(168, -1, 'SYN-ACK — “mayli, men tayyorman”', C.c)}
    ${msg(200, 1, 'ACK — “kelishdik”', C.c)}

    ${zone(40, 236, 920, 208, '② MA\'LUMOT — har bo\'lak alohida tasdiqlanadi', C.a)}
    ${msg(274, 1, '1-bo\'lak', C.a)}
    ${msg(306, -1, 'ACK 1 — “keldi”', C.g)}
    ${msg(338, 1, '2-bo\'lak', C.a, { lost: true })}
    ${K.mono(300, 366, '⏳ tasdiq kelmadi — kutish vaqti tugadi', C.r, 10.5)}
    ${msg(396, 1, '2-bo\'lak — QAYTA yuborildi', C.o)}
    ${msg(428, -1, 'ACK 2 — “keldi”', C.g)}

    ${zone(40, 464, 920, 86, '③ YOPILISH', C.n)}
    ${msg(500, 1, 'FIN — “men tugatdim”', C.n)}
    ${msg(532, -1, 'FIN-ACK — “men ham”', C.n)}`;

  /* ---------- UDP ---------- */
  const udp = `
    ${actor(LX, 20, '📹 Yuboruvchi', 'video oqimi', C.o)}
    ${actor(RX, 20, '📺 Qabul qiluvchi', 'ekran', C.g)}
    ${lifelines(78, 300)}
    ${K.mono(500, 100, '✕ qo\'l berish YO\'Q — darrov yuboraveradi', C.o, 11.5)}
    ${[1, 2, 3, 4, 5].map((n, i) => msg(126 + i * 34, 1, n + '-kadr', C.o, { lost: [1, 3].includes(i), dur: 1.1 })).join('')}
    ${K.mono(500, 306, 'tasdiq so\'ralmaydi  ·  qayta yuborilmaydi  ·  tartib kafolatlanmaydi', '#6d7f9f', 10.5)}
    <rect x="620" y="316" width="330" height="52" rx="12" fill="rgba(52,211,153,.08)" stroke="${C.g}" stroke-width="1.2"/>
    ${K.label(785, 338, 'Ekranda: 1 · 3 · 5 kadr ko\'rindi', C.g, 12, 'middle', 600)}
    ${K.mono(785, 356, '2 va 4 tushib qoldi — efir davom etaveradi', '#6d7f9f', 9.5)}`;

  /* ---------- HTTPS / TLS ---------- */
  const tls = `
    ${actor(LX, 20, '💻 Mijoz', 'brauzer', C.v)}
    ${actor(RX, 20, '🖥️ Server', 'sayt', C.g)}
    ${lifelines(78, 330)}
    ${msg(112, 1, '① “Salom, qaysi shifrni ishlatamiz?”', C.c)}
    ${msg(150, -1, '② “Mana sertifikatim 📜 — CA imzolagan”', C.c)}
    ${K.mono(500, 178, '🔍 brauzer sertifikatni tekshiradi: haqiqiy va muddati o\'tmaganmi?', '#6d7f9f', 10)}
    ${msg(208, 1, '③ maxfiy kalit — server kaliti bilan shifrlab yuboriladi', C.g)}
    ${msg(246, -1, '④ “Tayyor — endi hammasi shifrlanadi”', C.g)}
    <rect x="150" y="268" width="700" height="46" rx="12" fill="rgba(52,211,153,.10)" stroke="${C.g}" stroke-width="1.3"/>
    ${K.label(500, 290, '🔒 SHIFRLANGAN KANAL — endi HTTP so\'rovlari shu tunnel ichida yuradi', C.g, 12.5, 'middle', 700)}
    ${K.mono(500, 306, 'oradagi Wi-Fi, provayder yoki xaker faqat tushunarsiz belgilarni ko\'radi', '#6d7f9f', 9.5)}`;

  /* ---------- qatlamlar: konvert ichida konvert ---------- */
  const LAY = [
    ['IP', 'kimdan — kimga: manzil va marshrut', C.a, 25, 30, 950, 262],
    ['TCP / UDP', 'bo\'laklarga bo\'lish, port, tartib', C.c, 112, 64, 776, 194],
    ['TLS', 'shifrlash — faqat HTTPS da', C.g, 199, 98, 602, 126],
    ['HTTP', 'nima so\'ralyapti', C.v, 286, 132, 428, 58]
  ];
  const layers = `
    ${LAY.map(([n, d, c, x, y, w, h]) => `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${c}0d" stroke="${c}" stroke-width="1.5"/>
      ${K.label(x + 12, 166, n, c, 11.5, 'start', 800)}`).join('')}
    <rect x="304" y="146" width="392" height="32" rx="9" fill="#05080f" stroke="${C.v}" stroke-width="1.2"/>
    ${K.mono(500, 167, 'GET /mahsulotlar', '#e8eefc', 12.5)}
    ${K.mono(500, 210, 'asl xabar eng ichida', '#6d7f9f', 10)}

    ${LAY.map(([n, d, c], i) => `
      <g transform="translate(${28 + i * 244},312)">
        <rect width="228" height="46" rx="12" fill="${c}12" stroke="${c}" stroke-width="1.2"/>
        ${K.label(14, 20, n, c, 11.5, 'start', 700)}
        ${K.mono(14, 36, d, '#8fa2c4', 9, 'start')}</g>`).join('')}
    ${K.mono(500, 384, 'Har bir qatlam o\'z konvertini qo\'shadi — serverda esa teskari tartibda ochiladi.', '#6d7f9f', 11)}`;

  m.innerHTML =
    PP('① TCP — ishonchli yetkazish (sayt, fayl, to\'lov)', '0 0 1000 575', tcp,
      'TCP har bo\'lak uchun <b>tasdiq</b> kutadi. Tasdiq kelmasa — o\'sha bo\'lakni <b>qayta yuboradi</b>. Shuning uchun sekinroq, lekin hech narsa yo\'qolmaydi.') +
    PP('② UDP — tez yetkazish (video, o\'yin, jonli efir)', '0 0 1000 385', udp,
      'UDP hech narsa so\'ramaydi va kutmaydi. Yo\'qolgan kadr <b>butunlay yo\'qoladi</b> — lekin oqim to\'xtamaydi. Video qo\'ng\'iroqda aynan shu kerak.') +
    PP('③ HTTPS — TLS qanday himoya qiladi', '0 0 1000 345', tls,
      'HTTPS = HTTP + TLS. Avval shifrlangan tunnel quriladi, keyin oddiy HTTP so\'rovlari <b>shu tunnel ichida</b> yuboriladi.') +
    PP('④ Qatlamlar — konvert ichida konvert', '0 0 1000 400', layers) +
    PP('', '0 0 1000 210', `
      ${zone(20, 20, 470, 170, 'TCP — ishonchlilik muhim', C.c)}
      ${['🌐 Sayt ochish', '📄 Fayl yuklash', '💬 Xabar almashish', '💳 To\'lov'].map((t, i) =>
        K.pill(40 + (i % 2) * 220, 56 + Math.floor(i / 2) * 46, t, C.c, 200, 32, 12)).join('')}
      ${K.mono(255, 168, 'bitta harf ham yo\'qolmasligi kerak', '#6d7f9f', 10.5)}
      ${zone(510, 20, 470, 170, 'UDP — tezlik muhim', C.o)}
      ${['📹 Video qo\'ng\'iroq', '🎮 Onlayn o\'yin', '📺 Jonli efir', '🔊 Ovozli aloqa'].map((t, i) =>
        K.pill(530 + (i % 2) * 220, 56 + Math.floor(i / 2) * 46, t, C.o, 200, 32, 12)).join('')}
      ${K.mono(745, 168, 'kechikkandan ko\'ra yo\'qolgani yaxshiroq', '#6d7f9f', 10.5)}`);
});

})();
