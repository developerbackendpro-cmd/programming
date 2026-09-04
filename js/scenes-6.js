/* ============================================================
   scenes-6.js — 18..20 + xulosa
   ============================================================ */
(() => {
const { C, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene, card, boxRow, pill, branch, title } = K;
const list = (x, y, items, c, gap = 23) => items.map((t, i) =>
  `${label(x, y + i * gap, '▸', c, 11, 'start')}${label(x + 16, y + i * gap, t, '#9fb0d0', 12.5, 'start')}`).join('');

/* ============================================================
   18 — RATE LIMIT
   ============================================================ */
App.demo('rateLimit', m => {
  scene(m, {
    vb: '0 0 1000 665',
    svg: `
      ${zone(20, 30, 960, 250, 'TOKEN SAVATI — eng ko\'p ishlatiladigan usul', C.a)}
      ${[0, 1, 2, 3].map(i => `<g><rect x="45" y="${70 + i * 44}" width="120" height="34" rx="10" fill="url(#pn)" stroke="${C.v}" stroke-width="1.2"/>
        ${label(105, 92 + i * 44, '📨 so\'rov', '#9fb0d0', 11.5)}</g>
        ${link(`M170,${87 + i * 44} L285,${140}`, { c: C.v, dur: 1.8 + i * .2, r: 4, delay: i * .25 })}`).join('')}

      <path d="M290,90 h150 v130 a20,20 0 0 1 -20,20 h-110 a20,20 0 0 1 -20,-20 z" fill="rgba(251,191,36,.06)" stroke="${C.a}" stroke-width="1.6"/>
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${316 + (i % 3) * 46}" cy="${210 - Math.floor(i / 3) * 44}" r="17" fill="${C.a}30" stroke="${C.a}" stroke-width="1.3"/>
        ${label(316 + (i % 3) * 46, 215 - Math.floor(i / 3) * 44, '🎫', '#fff', 14)}`).join('')}
      ${label(365, 78, 'savat: 5 token', C.a, 12, 'middle', 700)}
      ${link('M365,45 L365,80', { c: C.g, dur: 2, label: 'har 2 s da +1 token', lx: 470, ly: 40 })}

      ${link('M445,150 L560,120', { c: C.g, dur: 1.6 })}
      ${node({ x: 565, y: 88, w: 175, h: 62, t: '✅ 200 OK', s: 'token bor edi', c: C.g })}
      ${link('M445,180 L560,215', { c: C.r, dur: 1.6 })}
      ${node({ x: 565, y: 185, w: 175, h: 62, t: '⛔ 429', s: 'savat bo\'sh — kutasiz', c: C.r })}
      ${node({ x: 790, y: 120, w: 170, h: 100, t: '🖥️ Server', s: 'himoyalangan', c: C.c })}
      ${link('M745,140 L785,155', { c: C.g, dur: 1.4 })}

      ${card({ x: 20, y: 300, w: 310, h: 195, n: '1', t: 'NEGA KERAK?', c: C.g, tip: 'why', body: `
        ${list(18, 20, ['Bitta odam serverni band qilmasin', 'Parolni brute-force qilmasin', 'Ma\'lumotni ommaviy o\'g\'irlamasin', 'Bulut xarajati portlab ketmasin', 'Hamma uchun tezlik saqlansin'], C.g, 22)}` })}

      ${card({ x: 345, y: 300, w: 310, h: 195, n: '2', t: 'NIMA BO\'YICHA CHEKLANADI?', c: C.v, tip: 'by', body: `
        ${[['IP manzil', 'anonim mehmonlar'], ['Foydalanuvchi', 'kirgan hisoblar'], ['Endpoint', 'login sahifasi qattiqroq'], ['Tarif', 'bepul 100 · pullik 10 000']]
          .map((r, i) => `${label(18, 20 + i * 32, r[0], C.v, 12.5, 'start', 700)}${label(18, 38 + i * 32, r[1], '#8fa2c4', 11.5, 'start')}`).join('')}` })}

      ${card({ x: 670, y: 300, w: 310, h: 195, n: '3', t: 'JAVOBDAGI SARLAVHALAR', c: C.c, tip: 'hdr', body: `
        ${[['X-RateLimit-Limit', '100'], ['X-RateLimit-Remaining', '3'], ['Retry-After', '12 soniya']]
          .map((r, i) => `${mono(18, 22 + i * 30, r[0], C.c, 11, 'start')}${mono(255, 22 + i * 30, r[1], '#9fb0d0', 11, 'end')}`).join('')}
        ${label(18, 118, 'Yaxshi API sizga qancha qolganini va', '#8fa2c4', 11.5, 'start')}
        ${label(18, 136, 'qachon urinishni aytib turadi.', '#8fa2c4', 11.5, 'start')}` })}

      ${card({ x: 20, y: 517, w: 960, h: 130, n: '4', t: 'HAYOTIY MISOL', c: C.p, body: `
        ${label(24, 22, '🏦 Bank ilovasi: parolni 5 marta xato kiritsangiz — hisob 15 daqiqaga bloklanadi.', '#9fb0d0', 13, 'start')}
        ${label(24, 48, '📨 SMS kod: daqiqada 1 marta so\'rash mumkin — aks holda kimdir minglab SMS yuborardi.', '#9fb0d0', 13, 'start')}
        ${mono(24, 76, 'Rate limit — “navbat qoidasi”: hamma kirsin, lekin hech kim eshikni band qilmasin.', C.p, 11.5, 'start')}` })}`,
    caption: '👆 Kartochkalarni bosing. Chapdagi so\'rovlar savatdagi tokenni oladi — savat bo\'shasa, 429 qaytadi.',
    tips: {
      why: 'Rate limit — serverning <b>o\'zini himoya qilish</b> usuli. Usiz bitta skript butun xizmatni to\'xtatib qo\'yishi mumkin.',
      by: 'Ko\'pincha bir nechta qoida birga ishlaydi: umumiy IP limiti + login uchun alohida qattiq limit.',
      hdr: 'Bu sarlavhalar tufayli ilova “limit tugayapti” deb oldindan bilib, so\'rovlarni sekinlashtira oladi.'
    }
  });
});

/* ============================================================
   19 — DOCKER
   ============================================================ */
App.demo('docker', m => {
  const srv = (x, y, t, sub, good) => `<g>
    <rect x="${x}" y="${y}" width="150" height="74" rx="13" fill="${good ? 'rgba(52,211,153,.10)' : 'rgba(248,113,113,.10)'}" stroke="${good ? C.g : C.r}" stroke-width="1.4"/>
    ${label(x + 75, y + 24, t, '#e8eefc', 12.5, 'middle', 600)}${mono(x + 75, y + 42, sub, '#8fa2c4', 10)}
    ${label(x + 75, y + 62, good ? '✅ ishlayapti' : '💥 ishlamadi', good ? C.g : C.r, 11, 'middle', 700)}</g>`;

  scene(m, {
    vb: '0 0 1000 720',
    svg: `
      ${card({ x: 20, y: 15, w: 465, h: 265, n: '✕', t: 'KONTEYNERSIZ', sub: '“mening kompyuterimda ishlayapti-ku!”', c: C.r, tip: 'no', body: `
        ${node({ x: 150, y: 4, w: 160, h: 56, t: '📦 Dastur', s: 'yolg\'iz o\'zi', c: C.n })}
        ${[0, 1, 2].map(i => link(`M230,64 L${85 + i * 160},108`, { c: C.r, dur: 1.8, r: 4, delay: i * .2 })).join('')}
        ${srv(10, 112, 'Ubuntu 22', 'Python 3.11', true)}
        ${srv(160, 112, 'CentOS 7', 'Python 3.8', false)}
        ${srv(310, 112, 'Windows', 'Python yo\'q', false)}
        ${mono(20, 208, 'Har serverda muhit boshqacha → 3 tadan 2 tasi ishlamaydi', C.r, 11, 'start')}` })}

      ${card({ x: 510, y: 15, w: 470, h: 265, n: '✓', t: 'DOCKER BILAN', sub: 'dastur + muhit bitta qutida', c: C.g, tip: 'yes', body: `
        ${node({ x: 150, y: 4, w: 165, h: 56, t: '🐳 Konteyner', s: 'hamma narsa ichida', c: C.g })}
        ${[0, 1, 2].map(i => link(`M232,64 L${90 + i * 160},108`, { c: C.g, dur: 1.8, r: 4, delay: i * .2 })).join('')}
        ${srv(15, 112, 'Ubuntu 22', 'konteyner', true)}
        ${srv(165, 112, 'CentOS 7', 'konteyner', true)}
        ${srv(315, 112, 'Windows', 'konteyner', true)}
        ${mono(20, 208, 'Muhit konteyner ichida → hamma joyda bir xil ishlaydi', C.g, 11, 'start')}` })}

      ${card({ x: 20, y: 300, w: 465, h: 235, n: '1', t: 'IMAGE — QATLAMLAR TORTI', c: C.c, tip: 'layers', body: `
        ${[['5-qatlam', 'Ishga tushirish buyrug\'i', '0 MB'], ['4-qatlam', 'Loyiha kodi', '2 MB'],
           ['3-qatlam', 'Kutubxonalar (paketlar)', '120 MB'], ['2-qatlam', 'Python 3.11', '45 MB'],
           ['1-qatlam', 'Kichik Linux tizimi', '78 MB']]
          .map((r, i) => `<g><rect x="${20 + i * 6}" y="${10 + i * 33}" width="${400 - i * 12}" height="28" rx="8" fill="${C.c}1a" stroke="${C.c}" stroke-width="1.1"/>
            ${mono(32 + i * 6, 29 + i * 33, r[1], '#9fb0d0', 11, 'start')}${mono(408 - i * 6, 29 + i * 33, r[2], C.c, 10, 'end')}</g>`).join('')}
        ${mono(20, 190, 'faqat o\'zgargan qatlam qayta yuklanadi — shuning uchun tez', '#6d7f9f', 10.5, 'start')}` })}

      ${card({ x: 510, y: 300, w: 470, h: 235, n: '2', t: '4 TA ASOSIY TUSHUNCHA', c: C.v, tip: 'terms', body: `
        ${[['📜', 'Dockerfile', 'retsept: nima o\'rnatilsin, qanday ishga tushsin'],
           ['📦', 'Image', 'tayyor, o\'zgarmas qolip (retseptdan pishirilgan)'],
           ['🐳', 'Container', 'shu qolipdan ishga tushgan tirik nusxa'],
           ['🏪', 'Registry', 'imagelar do\'koni — Docker Hub']]
          .map((r, i) => `${label(20, 22 + i * 44, r[0], '#fff', 16, 'start')}
            ${label(48, 22 + i * 44, r[1], C.v, 12.5, 'start', 700)}
            ${label(48, 40 + i * 44, r[2], '#8fa2c4', 11, 'start')}`).join('')}` })}

      ${card({ x: 20, y: 555, w: 465, h: 130, n: '3', t: 'KONTEYNER  vs  VIRTUAL MASHINA', c: C.a, tip: 'vm', body: `
        ${[['Ishga tushish', 'soniyalar', 'daqiqalar'], ['Hajm', 'MB', 'GB'], ['Tizim yadrosi', 'umumiy', 'alohida']]
          .map((r, i) => `${label(20, 20 + i * 24, r[0], '#6d7f9f', 11.5, 'start')}
            ${label(230, 20 + i * 24, r[1], C.g, 12, 'start', 600)}${label(340, 20 + i * 24, r[2], C.a, 12, 'start', 600)}`).join('')}
        ${label(230, 0, 'konteyner', C.g, 11, 'start', 700)}${label(340, 0, 'VM', C.a, 11, 'start', 700)}` })}

      ${card({ x: 510, y: 555, w: 470, h: 130, n: '4', t: 'NIMA BERADI?', c: C.g, tip: 'gives', body: `
        ${list(18, 18, ['Har joyda bir xil ishlaydi — “menda ishlayapti” tugaydi', 'Yangi dasturchi 5 daqiqada ishga kirishadi', 'Yuklama oshsa — nusxasini ko\'paytirasiz', 'Yangilanish buzsa — eski imagega qaytasiz'], C.g, 22)}` })}`,
    caption: '👆 Kartochkalarni bosing. Docker — dastur va uning butun muhitini bitta qutiga joylash.',
    tips: {
      no: 'Dastur faqat kod emas — u <b>muhit</b>ga ham bog\'liq: qaysi tizim, qaysi versiya, qaysi kutubxona. Muhit farq qilsa, dastur ishlamaydi.',
      yes: 'Konteyner dastur bilan birga <b>butun muhitni</b> olib yuradi. Shuning uchun u qayerga qo\'ysangiz ham bir xil ishlaydi.',
      layers: '<b>Image</b> qatlamlardan iborat. Faqat kodni o\'zgartirsangiz, pastki qatlamlar qayta ishlatiladi — shuning uchun qayta yig\'ish tez.',
      terms: 'Eng oson eslash yo\'li: <b>Dockerfile</b> — retsept, <b>Image</b> — pishirilgan tort, <b>Container</b> — dasturxondagi bo\'lagi.',
      vm: 'Virtual mashina butun operatsion tizimni ko\'taradi, konteyner esa <b>tizim yadrosini bo\'lishadi</b> — shuning uchun yengil.',
      gives: 'Docker asosan <b>bir xillik</b> beradi: dasturchi kompyuteri, test serveri va real server — hammasi bir xil muhitda ishlaydi.'
    }
  });
});

/* ============================================================
   20 — MOBIL: FLUTTER vs REACT NATIVE
   ============================================================ */
App.demo('mobile', m => {
  const pipe = (x, y, c, steps) => steps.map((s, i) => `
    ${node({ x, y: y + i * 66, w: 380, h: 54, t: s[0], s: s[1], c })}
    ${i < steps.length - 1 ? link(`M${x + 190},${y + 54 + i * 66} L${x + 190},${y + 66 + i * 66}`, { c, dur: 1.4, dot: false }) : ''}`).join('');

  scene(m, {
    vb: '0 0 1000 700',
    svg: `
      ${card({ x: 20, y: 15, w: 465, h: 355, n: '1', t: 'FLUTTER', sub: 'Dart tili · Google · o\'zi chizadi', c: C.c, tip: 'fl', body: `
        ${pipe(20, 6, C.c, [['Dart kodingiz', 'bitta kod'], ['Flutter dvigateli', 'Skia / Impeller'], ['Har pikselni O\'ZI chizadi', 'bo\'sh kanvasga'], ['Ekran', 'iOS va Androidda bir xil']])}
        ${mono(20, 288, 'tizim tugmasini ishlatmaydi — o\'z tugmasini chizadi', C.c, 11, 'start')}` })}

      ${card({ x: 510, y: 15, w: 470, h: 355, n: '2', t: 'REACT NATIVE', sub: 'JavaScript · Meta · tizimga buyuradi', c: C.v, tip: 'rn', body: `
        ${pipe(20, 6, C.v, [['JavaScript kodingiz', 'bitta kod'], ['JS dvigateli + JSI ko\'prigi', 'buyruq uzatadi'], ['Tizimning HAQIQIY tugmasi', 'UIKit / Android View'], ['Ekran', 'har platforma o\'z uslubida']])}
        ${mono(20, 288, 'o\'zi chizmaydi — tizimga “shu yerga tugma qo\'y” deydi', C.v, 11, 'start')}` })}

      ${card({ x: 20, y: 390, w: 620, h: 200, n: '3', t: 'KO\'RSATKICHLAR', c: C.g, tip: 'mx', body: `
        ${label(120, 12, 'Flutter', C.c, 12, 'middle', 700)}${label(330, 12, 'React Native', C.v, 12, 'middle', 700)}${label(520, 12, 'Native', C.g, 12, 'middle', 700)}
        ${[['Ishlash tezligi', 92, 78, 100], ['UI bir xilligi', 98, 66, 50], ['Native his', 70, 94, 100], ['O\'rganish osonligi', 70, 88, 55]]
          .map((r, i) => `${label(18, 44 + i * 30, r[0], '#8fa2c4', 11.5, 'start')}
            ${[[120, r[1], C.c], [330, r[2], C.v], [520, r[3], C.g]].map(([cx, v, c]) => `
              <rect x="${cx - 55}" y="${34 + i * 30}" width="110" height="12" rx="6" fill="rgba(120,150,220,.10)"/>
              <rect class="gbar" x="${cx - 55}" y="${34 + i * 30}" width="${110 * v / 100}" height="12" rx="6" fill="${c}" style="transform-origin:${cx - 55}px 0;animation-delay:${i * .1}s"/>
              ${mono(cx + 62, 44 + i * 30, v, c, 10, 'start')}`).join('')}`).join('')}` })}

      ${card({ x: 660, y: 390, w: 320, h: 200, n: '4', t: 'QACHON QAYSI BIRI?', c: C.a, tip: 'when', body: `
        ${[['Flutter', 'brend dizayni muhim, animatsiyaga boy ilova', C.c],
           ['React Native', 'jamoada JS bor, tez chiqish kerak', C.v],
           ['Native', 'o\'yin, AR, og\'ir kamera/audio ishlari', C.g]]
          .map((r, i) => `${label(18, 22 + i * 48, r[0], r[2], 12.5, 'start', 700)}
            ${label(18, 40 + i * 48, r[1], '#8fa2c4', 11, 'start')}`).join('')}` })}

      ${card({ x: 20, y: 605, w: 960, h: 98, t: 'MUHIM ESLATMA', c: C.p, body: `
        ${label(24, 16, 'Ikkalasi ham backendga BIR XIL murojaat qiladi: HTTPS orqali API\'ga so\'rov yuboradi va JSON javob oladi.', '#9fb0d0', 13, 'start')}
        ${mono(24, 40, 'Ya\'ni API, JWT, cache, rate limit — bularning hammasi mobil ilovada ham aynan shunday ishlaydi.', C.p, 11.5, 'start')}` })}`,
    caption: '👆 Ikki yondashuvni bosib solishtiring — asosiy farq ekranga chizish yo\'lida.',
    tips: {
      fl: '<b>Flutter</b> bo\'sh kanvas oladi va har bir pikselni o\'zi chizadi. Natija: ilova <b>hamma joyda bir xil</b> ko\'rinadi, animatsiyalar silliq.',
      rn: '<b>React Native</b> o\'zi chizmaydi — tizimga buyuradi. Natija: ilova <b>o\'sha platformadek</b> his beradi, lekin platformalar orasida kichik farqlar bo\'ladi.',
      mx: 'Native har doim eng tez, lekin <b>ikki barobar ish</b> talab qiladi: iOS va Android uchun alohida kod.',
      when: 'Ko\'p hollarda tanlov texnologiyaga emas, <b>jamoangiz nimani biladi</b> degan savolga bog\'liq.'
    }
  });
});

/* ============================================================
   21 — UMUMIY XULOSA (yo'l xaritasi)
   ============================================================ */
App.demo('summary', m => {
  const STEPS = [
    ['📱', 'Foydalanuvchi tugmani bosdi', 'Frontend / Mobil', 19],
    ['🌐', 'Domen DNS orqali IP ga aylandi', 'Domen va DNS', 7],
    ['🔒', 'HTTPS + TCP ulanish ochildi', 'Protokollar', 8],
    ['🖥️', 'So\'rov serverga yetib keldi', 'Server', 6],
    ['🐳', 'Docker konteyner uni qabul qildi', 'Docker', 18],
    ['🚦', 'Rate limit: limit oshmaganmi?', 'Rate limit', 17],
    ['🎟️', 'JWT token tekshirildi', 'JWT', 15],
    ['🔐', 'Rol tekshirildi: ruxsat bormi?', 'Authorization', 14],
    ['⚡', 'Cache ko\'rildi: tayyor javob bormi?', 'Cache', 10],
    ['🗄️', 'Bazadan filter bilan olindi', 'Baza / CRUD', 12],
    ['📨', '200 OK va JSON qaytdi', 'Request/Response', 9],
    ['🎨', 'Ekranga chiroyli chizildi', 'Frontend', 2],
    ['💾', 'Kechasi backup olinadi', 'Backup', 16]
  ];
  const H = 60, top = 30;
  scene(m, {
    vb: `0 0 1000 ${top + STEPS.length * H + 40}`,
    svg: `
      <path d="M62,${top + 20} V${top + STEPS.length * H - 30}" stroke="rgba(139,92,246,.35)" stroke-width="3" fill="none"/>
      <circle r="6" fill="${C.c}" filter="url(#gl)">
        <animateMotion dur="7s" repeatCount="indefinite" path="M62,${top + 20} V${top + STEPS.length * H - 30}"/></circle>
      ${STEPS.map((s, i) => {
        const y = top + i * H;
        return `<g class="n hit" data-go="${s[3]}" data-tip="s${i}">
          <circle cx="62" cy="${y + 22}" r="17" fill="#0a0f1c"/>
          <circle cx="62" cy="${y + 22}" r="17" fill="rgba(139,92,246,.20)" stroke="${C.v}" stroke-width="1.5"/>
          ${label(62, y + 28, i + 1, C.v, 13, 'middle', 800)}
          <rect x="100" y="${y}" width="640" height="44" rx="13" fill="rgba(9,14,26,.8)" stroke="${C.v}" stroke-width="1.2" stroke-opacity=".45"/>
          ${label(120, y + 28, s[0], '#fff', 17, 'start')}
          ${label(152, y + 28, s[1], '#e8eefc', 13.5, 'start', 600)}
          ${pill(760, y + 9, s[2], C.c, 215, 26, 11)}</g>`;
      }).join('')}`,
    caption: '👆 Istalgan qadamni bosing — o\'sha mavzuga qaytadi. Dasturlash — sehr emas, bir-biriga ulangan oddiy qadamlar.',
    tips: Object.fromEntries(STEPS.map((s, i) => ['s' + i, `<b>${i + 1}. ${s[1]}</b> — “${s[2]}” mavzusiga qarang.`]))
  });
  m.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => App.go(+el.dataset.go)));
});

})();
