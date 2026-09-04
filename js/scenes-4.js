/* ============================================================
   scenes-4.js — 10..13 posterlari
   ============================================================ */
(() => {
const { C, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene, card, boxRow, pill, branch, title } = K;
const list = (x, y, items, c, gap = 23) => items.map((t, i) =>
  `${label(x, y + i * gap, '▸', c, 11, 'start')}${label(x + 16, y + i * gap, t, '#9fb0d0', 12.5, 'start')}`).join('');
const rowKV = (x, y, k, v, c, kw = 110) => `${mono(x, y, k, c, 11.5, 'start')}${label(x + kw, y, v, '#9fb0d0', 12, 'start')}`;

/* ============================================================
   10 — REQUEST & RESPONSE
   ============================================================ */
App.demo('reqres', m => {
  scene(m, {
    vb: '0 0 1000 725',
    svg: `
      ${node({ x: 25, y: 30, w: 150, h: 70, t: '👤 Mijoz', s: 'brauzer / ilova', c: C.v, step: 1 })}
      ${node({ x: 825, y: 30, w: 150, h: 70, t: '🖥️ Server', s: 'API', c: C.g, step: 2 })}
      <g data-step="2">${link('M180,52 L820,52', { c: C.v, dur: 2.2, label: '① SO\'ROV (request) — "menga shuni qil"', lx: 500, ly: 40 })}</g>
      <g data-step="4">${link('M820,86 L180,86', { c: C.g, dur: 2.2, label: '② JAVOB (response) — status + ma\'lumot', lx: 500, ly: 108 })}</g>

      ${card({ x: 25, y: 130, w: 465, h: 235, n: '1', t: 'REQUEST — yuborilgan xat', c: C.v, tip: 'req', step: 2, body: `
        ${rowKV(20, 18, 'METOD', 'GET — "ma\'lumot ber"', C.v)}
        ${rowKV(20, 48, 'MANZIL', 'api.dokon.uz/mahsulotlar/42', C.v)}
        ${rowKV(20, 78, 'SARLAVHA', 'Accept: application/json', C.v)}
        ${rowKV(20, 102, '', 'Authorization: Bearer eyJ… (token)', C.v)}
        ${rowKV(20, 132, 'TANA', 'POST/PUT uchun: yangi ma\'lumot', C.v)}
        <rect x="20" y="150" width="420" height="30" rx="8" fill="rgba(139,92,246,.10)" stroke="${C.v}" stroke-width="1"/>
        ${mono(32, 170, '{ "nom": "Telefon", "narx": 2500000 }', C.v, 11.5, 'start')}` })}

      ${card({ x: 510, y: 130, w: 465, h: 235, n: '2', t: 'RESPONSE — qaytgan javob', c: C.g, tip: 'res', step: 4, body: `
        ${rowKV(20, 18, 'STATUS', '200 OK — hammasi joyida', C.g)}
        ${rowKV(20, 48, 'SARLAVHA', 'Content-Type: application/json', C.g)}
        ${rowKV(20, 78, '', 'X-RateLimit-Remaining: 97', C.g)}
        ${rowKV(20, 108, 'TANA', 'so\'ralgan ma\'lumotning o\'zi', C.g)}
        <rect x="20" y="126" width="420" height="54" rx="8" fill="rgba(52,211,153,.10)" stroke="${C.g}" stroke-width="1"/>
        ${mono(32, 146, '{ "id": 42, "nom": "Noutbuk",', C.g, 11.5, 'start')}
        ${mono(32, 166, '  "narx": 9800000, "bor": true }', C.g, 11.5, 'start')}` })}

      ${card({ x: 25, y: 385, w: 465, h: 180, n: '3', t: 'METODLAR — nima qilmoqchisiz?', c: C.c, tip: 'met', body: `
        ${[['GET', 'olish / o\'qish', C.g], ['POST', 'yangi qo\'shish', C.c], ['PUT', 'o\'zgartirish', C.a], ['DELETE', 'o\'chirish', C.r]]
          .map((r, i) => `${pill(20, 12 + i * 30, r[0], r[2], 92, 24, 11.5)}${label(126, 29 + i * 30, r[1], '#9fb0d0', 12, 'start')}
            ${mono(250, 29 + i * 30, ['/mahsulotlar', '/buyurtmalar', '/profil', '/savat/7'][i], '#6d7f9f', 11, 'start')}`).join('')}` })}

      ${card({ x: 510, y: 385, w: 465, h: 180, n: '4', t: 'STATUS KODLAR — javobning kayfiyati', c: C.a, tip: 'code', body: `
        ${[['2xx', 'muvaffaqiyat', '200 OK · 201 yaratildi · 204 bo\'sh', C.g],
           ['3xx', 'boshqa manzilga', '301 ko\'chirildi · 304 o\'zgarmagan', C.c],
           ['4xx', 'siz xato qildingiz', '400 · 401 · 403 · 404 · 429', C.a],
           ['5xx', 'server xato qildi', '500 ichki xato · 503 band', C.r]]
          .map((r, i) => `${pill(20, 12 + i * 30, r[0], r[3], 62, 24, 11.5)}${label(96, 29 + i * 30, r[1], r[3], 12, 'start', 600)}
            ${mono(230, 29 + i * 30, r[2], '#6d7f9f', 10.5, 'start')}`).join('')}` })}

      ${card({ x: 25, y: 585, w: 950, h: 120, n: '5', t: 'ODDIY QILIB AYTGANDA', c: C.p, body: `
        ${label(24, 20, '✉️ Request — xat: "kimman, nima so\'rayapman, qaysi manzildan".', '#9fb0d0', 13, 'start')}
        ${label(24, 44, '📬 Response — javob xati: "mana natija" yoki "bo\'lmadi, sababi shu".', '#9fb0d0', 13, 'start')}
        ${mono(24, 68, 'Butun internet shu ikki qadamdan iborat — sayt, ilova, o\'yin, bank — hammasi.', C.p, 11.5, 'start')}` })}`,
    steps: [
      { t: 'Mijoz', d: '<b>1.</b> Mijoz (brauzer yoki mobil ilova) nimadir kerakligini hal qiladi.' },
      { t: 'So\'rov', d: '<b>2.</b> <b>Request</b> yuboriladi: metod + manzil + sarlavhalar (+ tana). Bu — aniq qoidalar bilan yozilgan xat.' },
      { t: 'Server', d: '<b>3.</b> Server so\'rovni tushunadi, tekshiradi va bajaradi: bazadan oladi yoki yozadi.' },
      { t: 'Javob', d: '<b>4.</b> <b>Response</b> qaytadi: avval <b>status kod</b> (200? 404? 500?), keyin ma\'lumotning o\'zi.' }
    ],
    tips: {
      req: '<b>Request</b> — 4 qismdan iborat: metod, manzil, sarlavhalar, tana. Token ham sarlavhada yuboriladi.',
      res: '<b>Response</b> ham xuddi shunday tuzilgan, faqat birinchi qatorda <b>status kod</b> turadi.',
      met: 'Metod — <b>niyatingiz</b>. Bir xil manzilga GET yuborsangiz o\'qiysiz, DELETE yuborsangiz o\'chirasiz.',
      code: 'Birinchi raqamga qarang: <b>2</b> — yaxshi, <b>4</b> — siz xato qildingiz, <b>5</b> — server aybdor.'
    },
    caption: '👆 Kartochkalarni bosing yoki yuqoridan qadamlarni kuzating.'
  });
});

/* ============================================================
   11 — CACHE
   ============================================================ */
App.demo('cache', m => {
  scene(m, {
    vb: '0 0 1000 640',
    svg: `
      ${zone(20, 30, 960, 155, 'CACHESIZ — har safar uzoq yo\'l', C.r)}
      ${node({ x: 45, y: 75, w: 150, h: 66, t: '👤 Mijoz', c: C.v })}
      ${link('M200,108 L300,108', { c: C.r, dur: 2 })}
      ${node({ x: 305, y: 75, w: 160, h: 66, t: '🖥️ Server', c: C.c })}
      ${link('M470,108 L580,108', { c: C.r, dur: 2 })}
      ${cyl(590, 68, 150, 82, 'Baza', C.a, 'qidiradi…')}
      ${label(870, 100, '⏱️ 800 ms', C.r, 20, 'middle', 800)}
      ${mono(870, 124, 'har bir so\'rovda', '#6d7f9f', 11)}

      ${zone(20, 215, 960, 155, 'CACHE BILAN — javob qo\'l ostida', C.g)}
      ${node({ x: 45, y: 260, w: 150, h: 66, t: '👤 Mijoz', c: C.v })}
      ${link('M200,293 L300,293', { c: C.g, dur: 1 })}
      ${node({ x: 305, y: 260, w: 160, h: 66, t: '⚡ Cache', s: 'tayyor javob', c: C.g })}
      <path d="M480,293 L580,293" stroke="${C.n}" stroke-width="2" stroke-dasharray="6 6" stroke-opacity=".35" fill="none"/>
      ${cyl(590, 253, 150, 82, 'Baza', C.n, 'tinch turibdi')}
      ${label(870, 285, '⏱️ 15 ms', C.g, 20, 'middle', 800)}
      ${mono(870, 309, '50× tezroq', '#6d7f9f', 11)}

      ${card({ x: 20, y: 395, w: 310, h: 230, n: '1', t: 'CACHE QAYERDA BO\'LADI?', c: C.c, tip: 'where', body: `
        ${[['🌐 Brauzerda', 'rasm, shrift, stillar'], ['🛰️ CDN da', 'foydalanuvchiga yaqin server'],
           ['⚡ Xotirada', 'Redis, Memcached'], ['🗄️ Bazada', 'tez-tez so\'raladigan natijalar']]
          .map((r, i) => `${label(18, 20 + i * 40, r[0], C.c, 12.5, 'start', 700)}${label(18, 38 + i * 40, r[1], '#8fa2c4', 11.5, 'start')}`).join('')}` })}

      ${card({ x: 345, y: 395, w: 310, h: 230, n: '2', t: 'NIMA BERADI?', c: C.g, tip: 'why', body: `
        ${list(18, 22, ['Sahifa 10–50 barobar tez ochiladi', 'Baza yuklamasi keskin kamayadi', 'Server xarajati arzonlashadi', 'Ko\'p foydalanuvchini ko\'taradi', 'Internet sekin bo\'lsa ham ishlaydi'], C.g)}` })}

      ${card({ x: 670, y: 395, w: 310, h: 230, n: '3', t: '⚠️ ASOSIY MUAMMO', c: C.a, tip: 'stale', body: `
        ${label(18, 20, 'Bazada narx o\'zgardi…', '#9fb0d0', 12.5, 'start')}
        ${label(18, 42, '…cache esa eskisini ko\'rsatyapti', C.a, 12.5, 'start')}
        ${pill(18, 58, 'stale data — eskirgan ma\'lumot', C.a, 250, 26, 11)}
        ${label(18, 116, 'Yechim:', C.g, 12.5, 'start', 700)}
        ${list(18, 138, ['TTL — yashash muddati (masalan 60 s)', 'Ma\'lumot o\'zgarganda majburan tozalash'], C.g)}` })}`,
    caption: '💡 Cache — tez-tez kerak bo\'ladigan narsani <b>qo\'l ostida</b> saqlash. Uzoq javondan olib kelish o\'rniga stoldan olasiz.',
    tips: {
      where: 'Cache bir nechta joyda bo\'lishi mumkin va ular <b>ketma-ket</b> ishlaydi: brauzer → CDN → server xotirasi → baza.',
      why: 'Cache — ilovani tezlashtirishning <b>eng arzon</b> usuli: kodni o\'zgartirmasdan katta natija beradi.',
      stale: 'Cachening butun murakkabligi shu bitta savolda: <b>bu javob hali ham to\'g\'rimi?</b> Shuning uchun muddat qo\'yiladi.'
    }
  });
});

/* ============================================================
   12 — MA'LUMOTLAR BAZALARI
   ============================================================ */
App.demo('database', m => {
  const tblMini = `<g>${[0, 1, 2].map(r => [0, 1, 2].map(c2 =>
    `<rect x="${c2 * 62}" y="${r * 24}" width="56" height="19" rx="4" fill="${r ? 'rgba(52,211,153,.10)' : 'rgba(52,211,153,.28)'}" stroke="${C.g}" stroke-opacity=".5"/>`).join('')).join('')}</g>`;
  const docMini = `<g>${mono(0, 12, '{', C.c, 12, 'start')}${mono(12, 30, '"ism": "Aziza",', C.c, 11, 'start')}
    ${mono(12, 46, '"baholar": [92, 88],', C.c, 11, 'start')}${mono(12, 62, '"tel": { … }', C.c, 11, 'start')}${mono(0, 78, '}', C.c, 12, 'start')}</g>`;
  const kvMini = `<g>${['user:42', 'sessiya:ab', 'savat:42'].map((k, i) =>
    `${pill(0, i * 28, k, C.a, 92, 24, 10.5)}${label(100, 17 + i * 28, '→', '#6d7f9f', 12, 'start')}${label(116, 17 + i * 28, ['{ism}', 'user:42', '[3 mahs.]'][i], '#8fa2c4', 11, 'start')}`).join('')}</g>`;
  const graphMini = `<g stroke="${C.v}" fill="none" stroke-width="1.4">
    <line x1="20" y1="20" x2="80" y2="50"/><line x1="80" y1="50" x2="145" y2="20"/><line x1="80" y1="50" x2="80" y2="92"/>
    ${[[20, 20], [80, 50], [145, 20], [80, 92]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="rgba(139,92,246,.25)"/>`).join('')}
    </g>${['A', 'B', 'C', 'D'].map((t, i) => label([20, 80, 145, 80][i], [25, 55, 25, 97][i], t, '#e8eefc', 10.5)).join('')}`;
  const tsMini = `<polyline points="0,80 30,50 60,62 90,28 120,44 150,14 180,34" fill="none" stroke="${C.p}" stroke-width="2.2"/>
    <line x1="0" y1="92" x2="180" y2="92" stroke="rgba(120,150,220,.3)"/>`;
  const objMini = `<g>${['📷 avatar.jpg', '🎬 dars_01.mp4', '📄 shartnoma.pdf'].map((t, i) =>
    `${label(0, 16 + i * 26, t, '#9fb0d0', 11.5, 'start')}${mono(150, 16 + i * 26, ['240KB', '380MB', '1.2MB'][i], C.o, 10.5, 'start')}`).join('')}</g>`;

  const DB = [
    ['SQL — Relatsion', 'PostgreSQL · MySQL', C.g, tblMini, 'sql'],
    ['Hujjatli (NoSQL)', 'MongoDB · Firestore', C.c, docMini, 'doc'],
    ['Kalit–qiymat', 'Redis · Memcached', C.a, kvMini, 'kv'],
    ['Graf bazasi', 'Neo4j', C.v, graphMini, 'graph'],
    ['Vaqt qatori', 'InfluxDB · Timescale', C.p, tsMini, 'ts'],
    ['Obyekt ombori', 'S3 · MinIO', C.o, objMini, 'obj']
  ];

  scene(m, {
    vb: '0 0 1000 645',
    svg: `
      ${DB.map((d, i) => card({
        x: 20 + (i % 3) * 327, y: 15 + Math.floor(i / 3) * 210, w: 306, h: 190,
        n: i + 1, t: d[0], sub: d[1], c: d[2], tip: d[4],
        body: `<g transform="translate(20,10)">${d[3]}</g>`
      })).join('')}

      ${card({ x: 20, y: 440, w: 960, h: 190, n: '7', t: 'SQL  vs  NoSQL — asosiy farq', c: C.i, tip: 'vs', body: `
        ${label(180, 18, 'SQL (jadval)', C.g, 13.5, 'middle', 700)}
        ${label(760, 18, 'NoSQL (moslashuvchan)', C.c, 13.5, 'middle', 700)}
        ${[['Tuzilma', 'oldindan qat\'iy belgilanadi', 'har yozuv har xil bo\'lishi mumkin'],
           ['Bog\'lanish', 'jadvallar bir-biriga ulanadi', 'ma\'lumot bir joyda takrorlanadi'],
           ['Kuchli tomoni', 'ishonchlilik, tranzaksiya (pul)', 'tezlik, oson kengayish'],
           ['Qachon', 'bank, do\'kon, buxgalteriya', 'kontent, log, katalog, cache']]
          .map((r, i) => `${label(24, 46 + i * 26, r[0], '#6d7f9f', 11.5, 'start')}
            ${label(180, 46 + i * 26, r[1], '#9fb0d0', 12, 'middle')}
            ${label(760, 46 + i * 26, r[2], '#9fb0d0', 12, 'middle')}`).join('')}
        <line x1="470" y1="30" x2="470" y2="140" stroke="rgba(120,150,220,.25)"/>` })}`,
    caption: '👆 Kartochkani bosing — qaysi holatda ishlatilishini o\'qing.',
    tips: {
      sql: '<b>SQL</b> — ma\'lumot qat\'iy jadvalda: ustunlar oldindan belgilangan. Pul bilan ishlaganda eng ishonchli tanlov.',
      doc: '<b>Hujjatli baza</b> — har yozuv alohida "hujjat". Maydonlari bir xil bo\'lishi shart emas, tuzilmani istalgan payt o\'zgartirasiz.',
      kv: '<b>Kalit–qiymat</b> — eng sodda va eng tez shakl. Cache va sessiya uchun ideal, murakkab qidiruv yo\'q.',
      graph: '<b>Graf bazasi</b> — asosiysi bog\'lanishlar. "Do\'stimning do\'sti nimani yoqtiradi?" degan savolga bir zumda javob beradi.',
      ts: '<b>Vaqt qatori</b> — sensor, monitoring, birja narxlari. Sekundiga minglab o\'lchov keladi va siqib saqlanadi.',
      obj: '<b>Obyekt ombori</b> — rasm va video uchun. Bazaga faylning o\'zi emas, faqat <b>havolasi</b> yoziladi.',
      vs: 'Tanlov "qaysi biri yaxshi?" emas, <b>"mening ma\'lumotim qanday shaklda?"</b> degan savoldan boshlanadi.'
    }
  });
});

/* ============================================================
   13 — CRUD VA FILTERLAR
   ============================================================ */
App.demo('crud', m => {
  const rows = (hi, mode) => [0, 1, 2].map(i => `
    <rect x="0" y="${i * 26}" width="230" height="21" rx="5"
      fill="${hi === i ? (mode === 'del' ? 'rgba(248,113,113,.18)' : mode === 'upd' ? 'rgba(251,191,36,.18)' : 'rgba(52,211,153,.18)') : 'rgba(120,150,220,.07)'}"
      stroke="${hi === i ? (mode === 'del' ? C.r : mode === 'upd' ? C.a : C.g) : 'rgba(120,150,220,.2)'}" stroke-width="1.1"
      ${mode === 'del' && hi === i ? 'stroke-dasharray="4 3"' : ''}/>
    ${mono(10, 15 + i * 26, ['Aziza · N-21 · 92', 'Bekzod · N-22 · 78', 'Dilnoza · N-21 · 85'][i], hi === i ? '#e8eefc' : '#6d7f9f', 10.5, 'start')}`).join('');

  scene(m, {
    vb: '0 0 1000 675',
    svg: `
      ${[['C', 'CREATE', 'yangi yozuv qo\'shish', 'POST /talabalar', C.g, 'add'],
         ['R', 'READ', 'o\'qish, ro\'yxat olish', 'GET /talabalar', C.c, 'read'],
         ['U', 'UPDATE', 'mavjudini o\'zgartirish', 'PUT /talabalar/2', C.a, 'upd'],
         ['D', 'DELETE', 'o\'chirish', 'DELETE /talabalar/3', C.r, 'del']]
        .map((r, i) => card({
          x: 20 + (i % 2) * 495, y: 15 + Math.floor(i / 2) * 200, w: 465, h: 180,
          n: r[0], t: r[1], sub: r[2], c: r[4], tip: r[5],
          body: `<g transform="translate(20,6)">${rows(i === 0 ? 2 : i === 1 ? -1 : i === 2 ? 1 : 2, r[5])}</g>
                 ${pill(270, 12, r[3], r[4], 175, 26, 10.5)}
                 ${label(270, 62, ['⊕ pastga yangi qator qo\'shildi', '⊜ hammasi o\'qildi', '✎ 2-qator qiymati yangilandi', '⊘ qator olib tashlandi'][i], r[4], 11.5, 'start')}
                 ${label(270, 84, ['id avtomatik beriladi', 'eng ko\'p ishlatiladigan amal', 'faqat o\'zgargan maydon', 'ko\'pincha "arxiv" qilinadi'][i], '#6d7f9f', 11, 'start')}` })).join('')}

      ${card({ x: 20, y: 420, w: 620, h: 235, n: '5', t: 'FILTER · QIDIRUV · SARALASH', sub: 'READ ning kengaytirilgan shakli', c: C.v, tip: 'filter', body: `
        ${label(24, 22, '1 000 000 yozuv', '#6d7f9f', 13, 'start')}
        <path d="M200,10 L330,10 L280,52 L280,92 L250,102 L250,52 Z" fill="rgba(139,92,246,.14)" stroke="${C.v}" stroke-width="1.4"/>
        ${label(265, 36, 'FILTER', C.v, 11.5, 'middle', 700)}
        ${label(430, 22, '25 ta natija', C.g, 13, 'start', 700)}
        ${link('M130,22 L195,22', { c: C.v, dur: 1.6, r: 4 })}
        ${link('M335,60 L420,60', { c: C.g, dur: 1.6, r: 4 })}
        ${[['🔍 qidiruv', 'ism ichida "Az"'], ['🏷️ filter', 'guruh = N-21'], ['📊 shart', 'ball ≥ 85'], ['↕️ saralash', 'ballga ko\'ra kamayish'], ['📄 sahifalash', '20 tadan ko\'rsat']]
          .map((r, i) => `${label(24, 76 + i * 24, r[0], C.v, 11.5, 'start', 600)}${mono(140, 76 + i * 24, r[1], '#8fa2c4', 11, 'start')}`).join('')}` })}

      ${card({ x: 660, y: 420, w: 320, h: 235, n: '6', t: 'NEGA MUHIM?', c: C.g, tip: 'why', body: `
        ${list(18, 20, ['Har qanday ilova aslida shu 4 ta', '   amaldan iborat', 'Instagram: post CREATE, lenta READ,', '   tahrir UPDATE, o\'chirish DELETE', 'Millionlab yozuvni ekranga sig\'dirib', '   bo\'lmaydi — shuning uchun filter', 'Filter serverda bajariladi,', '   mijozga faqat keragi yuboriladi'], C.g, 21)}` })}`,
    caption: '👆 Har bir amal kartochkasini bosing.',
    tips: {
      add: '<b>CREATE</b> — bazaga yangi qator qo\'shiladi va unga <b>id</b> beriladi. HTTP da bu <span class="mono">POST</span>.',
      read: '<b>READ</b> — eng ko\'p ishlatiladigan amal. Ilovada ko\'rgan har bir ro\'yxat — bu READ natijasi.',
      upd: '<b>UPDATE</b> — mavjud yozuvni o\'zgartirish. Odatda faqat <b>o\'zgargan maydon</b> yuboriladi.',
      del: '<b>DELETE</b> — amalda ma\'lumot ko\'pincha butunlay o\'chirilmaydi, balki "o\'chirilgan" deb belgilanadi (soft delete) — keyin tiklash mumkin bo\'lsin.',
      filter: '<b>Filter</b> serverda ishlaydi: 1 000 000 yozuvdan faqat kerakli 25 tasi tanlanadi va shugina yuboriladi. Aks holda telefon ham, internet ham ko\'tarmaydi.',
      why: 'CRUD — dasturlashning "alifbosi". Qaysi ilovani ochib qaramang, ichida shu 4 ta amal ishlab turibdi.'
    }
  });
});

})();
