/* ============================================================
   scenes-2.js — 03..07 chizmalari
   ============================================================ */
(() => {
const { C, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene } = K;
const P = (t, vb, inner, note = '', legend = '') => `
  <div class="scene-box" style="margin-bottom:14px">
    ${t ? `<div class="panel-t" style="position:relative;z-index:2;margin-bottom: 16px">${t}</div>` : ''}
    <svg class="scene" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${K.DEFS}${inner}</svg>
    ${legend ? `<div class="legend">${legend}</div>` : ''}
    ${note ? `<div class="small muted" style="text-align:center;margin-top:6px;position:relative;z-index:2; padding-top: 10px; padding-bottom: 10px;">${note}</div>` : ''}
  </div>`;
const lgd = (...i) => i.map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`).join('');

/* ============================================================
   03 — FRONTEND vs BACKEND
   ============================================================ */
App.demo('frontBack', m => {
  const uiRow = (y, w, c = '#2a3654') => `<rect x="18" y="${y}" width="${w}" height="11" rx="5.5" fill="${c}"/>`;
  const inner = `
    ${uiRow(16, 120, '#8b5cf6')}${uiRow(38, 190)}${uiRow(56, 160)}
    <g data-step="1">${uiRow(84, 150, '#8b5cf6')}${uiRow(102, 110, '#5b46a8')}</g>
    ${uiRow(132, 200, '#1e2942')}${uiRow(150, 170, '#1e2942')}`;

  scene(m, {
    vb: '0 0 1000 430',
    svg: `
      ${zone(15, 46, 315, 340, 'FRONTEND — ko\'rinadigan qism', C.v)}
      ${zone(355, 46, 300, 340, 'BACKEND — ko\'rinmaydigan qism', C.c)}
      ${zone(690, 46, 295, 340, 'MA\'LUMOTLAR BAZASI', C.a)}

      <g data-tip="fe">${browser(40, 80, 265, 230, inner, 'dokon.uz', C.v)}</g>
      ${mono(172, 340, 'HTML · CSS · JavaScript · React', C.v, 11)}
      ${mono(172, 360, 'tugma · rang · animatsiya · joylashuv', C.n, 10.5)}

      <g data-tip="be">${rack(430, 95, 155, 175, C.c)}</g>
      ${label(507, 292, '⚙️ Server mantiqi', C.c, 13, 'middle', 700)}
      ${mono(507, 312, 'tekshir · hisobla · himoyala', C.n, 10.5)}
      ${mono(507, 332, 'Python · Node.js · Go · Java', C.c, 10.5)}
      ${mono(507, 358, 'parol, to\'lov, ruxsat — hammasi shu yerda', C.n, 10)}

      <g data-tip="db">${cyl(760, 110, 165, 150, 'Baza', C.a, 'buyurtmalar')}</g>
      ${mono(842, 300, 'SQL · jadval · yozuvlar', C.a, 11)}
      ${mono(842, 322, 'ma\'lumot doimiy saqlanadi', C.n, 10.5)}

      <g data-step="2">${link('M310,150 L425,150', { c: C.v, dur: 1.6, label: 'so\'rov (HTTPS)', lx: 367, ly: 138 })}</g>
      <g data-step="3">${link('M590,150 L755,150', { c: C.a, dur: 1.6, label: 'SQL so\'rov', lx: 672, ly: 138 })}</g>
      <g data-step="4">${link('M755,215 L595,215', { c: C.a, dur: 1.6, label: 'qatorlar', lx: 675, ly: 238 })}
        ${link('M425,255 L315,255', { c: C.g, dur: 1.6, label: '200 OK + JSON', lx: 370, ly: 278 })}</g>`,
    steps: [
      { t: 'Bosildi', d: '<b>1. Frontend:</b> foydalanuvchi ekrandagi amalni bajardi (masalan tugmani bosdi). Frontend faqat maydonlar to\'ldirilganini tekshiradi — u <b>hech narsani saqlay olmaydi</b>.' },
      { t: 'So\'rov', d: '<b>2. Frontend → Backend:</b> internet orqali so\'rov ketdi: "shu mahsulotga buyurtma qabul qil".' },
      { t: 'Mantiq', d: '<b>3. Backend:</b> foydalanuvchi haqiqiyligini, mahsulot borligini va narxni tekshiradi, so\'ng bazaga yozadi. Barcha <b>muhim qarorlar shu yerda</b>.' },
      { t: 'Javob', d: '<b>4. Javob:</b> baza qatorni qaytardi, backend JSON tayyorladi, frontend esa uni chiroyli ko\'rinishga aylantirdi.' }
    ],
    tips: {
      fe: '<b>🎨 Frontend</b> — foydalanuvchi ko\'radigan va bosadigan hamma narsa: tugma, rang, shrift, animatsiya, telefonga moslashuv. Brauzerda ishlaydi, shuning uchun <b>unga to\'liq ishonib bo\'lmaydi</b>.',
      be: '<b>⚙️ Backend</b> — ko\'rinmaydigan miya: kim nimaga haqli, narx qancha, buyurtma haqiqiymi. Serverda ishlaydi va <b>ma\'lumot bilan bevosita gaplashadi</b>.',
      db: '<b>🗄️ Baza</b> — ma\'lumotning doimiy uyi. Faqat backend orqali murojaat qilinadi; brauzer bazaga to\'g\'ridan-to\'g\'ri bog\'lanmaydi.'
    },
    noCap: true
  });
});

/* ============================================================
   04 — HTML / CSS NEGA TIL EMAS
   ============================================================ */
App.demo('htmlCss', m => {
  const mock = (x, styled, brain) => {
    const g = styled ? C.v : '#39445e', bg = styled ? 'url(#pn)' : '#0a0f1c';
    return `<g transform="translate(${x},60)">
      <rect width="290" height="250" rx="16" fill="${bg}" stroke="${styled ? C.v : '#2a3654'}" stroke-width="1.5"/>
      <rect x="20" y="22" width="${styled ? 150 : 120}" height="${styled ? 16 : 12}" rx="${styled ? 8 : 2}" fill="${g}"/>
      <rect x="20" y="52" width="240" height="9" rx="${styled ? 4.5 : 1}" fill="${styled ? '#2a3654' : '#222a3d'}"/>
      <rect x="20" y="68" width="200" height="9" rx="${styled ? 4.5 : 1}" fill="${styled ? '#2a3654' : '#222a3d'}"/>
      <rect x="20" y="100" width="120" height="32" rx="${styled ? 10 : 2}" fill="${styled ? 'url(#lg-v)' : '#161d2e'}" stroke="${styled ? C.v : '#39445e'}" stroke-width="1.2"/>
      ${label(80, 121, 'Hisobla', styled ? '#e8eefc' : '#7d8aa5', 11.5, 'middle', 600)}
      ${brain ? `
        ${link('M140,116 L188,116', { c: C.g, dur: 1.3, r: 4 })}
        <circle cx="215" cy="116" r="24" fill="url(#lg-g)" stroke="${C.g}" stroke-width="1.4"/>
        <text x="215" y="123" text-anchor="middle" font-size="19">🧠</text>
        <rect x="20" y="160" width="250" height="30" rx="9" fill="rgba(52,211,153,.12)" stroke="${C.g}" stroke-width="1.2"/>
        ${label(145, 180, '✓ 15% chegirma → 127 500 so\'m', C.g, 12, 'middle', 600)}`
        : `<rect x="20" y="160" width="250" height="30" rx="${styled ? 9 : 2}" fill="rgba(120,150,220,.05)" stroke="#2a3654" stroke-width="1.2" stroke-dasharray="5 5"/>
           ${label(145, 180, brain === false && styled ? '… hech narsa bo\'lmadi' : '', C.n, 11.5)}`}
    </g>`;
  };

  m.innerHTML =
    P('Bitta sahifa — uch qatlam', '0 0 1000 360', `
      ${['#39445e', C.c, C.g].map((c, i) => `${zone(20 + i * 330, 40, 290, 290, ['① HTML — SKELET', '② + CSS — DESIGN', '③ + JAVASCRIPT — ACTION'][i], c)}`).join('')}
      ${mock(20, false, false)}${mock(350, true, false)}${mock(680, true, true)}
      ${mono(165, 348, 'mazmun bor, bezak yo\'q', '#7d8aa5')}
      ${mono(495, 348, 'chiroyli, lekin jonsiz', C.c)}
      ${mono(825, 348, 'chiroyli va jonli', C.g)}`,
      'HTML nima borligini <b>e\'lon qiladi</b>, CSS uning <b>qanday ko\'rinishini</b> tasvirlaydi, JavaScript esa <b>nima qilishini</b> hal qiladi.')
});

/* ============================================================
   05 — TIL vs FRAMEWORK
   ============================================================ */
App.demo('framework', m => {
  const bricks = (x, y) => {
    let s = '';
    for (let r = 0; r < 6; r++) for (let c2 = 0; c2 < 8; c2++) {
      const bx = x + c2 * 32 + (r % 2 ? 16 : 0), by = y + r * 20;
      if (bx > x + 230) continue;
      s += `<rect class="bk" x="${bx}" y="${by}" width="28" height="16" rx="3" fill="rgba(251,191,36,.16)" stroke="${C.a}" stroke-width="1"
             style="transform-box:fill-box;transform-origin:center;animation-delay:${(r * 8 + c2) * 45}ms"/>`;
    }
    return s;
  };
  const bigBlocks = (x, y) => ['🔐 Login tizimi', '🧭 Sahifalar (router)', '🧩 Tayyor UI qismlar', '✅ Forma tekshiruvi']
    .map((t, i) => `<g class="bk" style="transform-box:fill-box;transform-origin:center;animation-delay:${i * 220}ms">
      <rect x="${x}" y="${y + i * 34}" width="245" height="28" rx="8" fill="url(#lg-g)" stroke="${C.g}" stroke-width="1.3"/>
      ${label(x + 122, y + 19 + i * 34, t, '#e8eefc', 12, 'middle', 600)}</g>`).join('');

  m.innerHTML =
    P('Bir xil uy — ikki xil qurilish', '0 0 1000 380', `
      ${zone(20, 30, 460, 320, 'FAQAT TIL — har g\'ishtni o\'zingiz terasiz', C.a)}
      <path d="M60,150 L245,70 L430,150" fill="none" stroke="${C.a}" stroke-width="2" class="tw"/>
      ${bricks(75, 160)}
      ${label(250, 316, '12 qism × 3 kun = 36 kun', C.a, 14, 'middle', 700)}
      ${mono(250, 336, 'to\'liq erkinlik, lekin sekin', C.n)}

      ${zone(520, 30, 460, 320, 'FRAMEWORK — tayyor bloklar', C.g)}
      <path d="M560,150 L745,70 L930,150" fill="none" stroke="${C.g}" stroke-width="2" class="tw"/>
      ${bigBlocks(622, 165)}
      ${label(750, 316, '3 kun', C.g, 14, 'middle', 700)}
      ${mono(750, 336, 'tez, lekin uning qoidalariga bo\'ysunasiz', C.n)}`) +

    P('Til · Kutubxona · Framework — farqi', '0 0 1000 230', `
      ${node({ x: 30, y: 40, w: 280, h: 90, t: '🔤 Dasturlash tili', s: 'alifbo va grammatika', c: C.v })}
      ${node({ x: 360, y: 40, w: 280, h: 90, t: '🧰 Kutubxona', s: 'bitta ish uchun anjom', c: C.c })}
      ${node({ x: 690, y: 40, w: 280, h: 90, t: '📐 Framework', s: 'tayyor qolip va qoidalar', c: C.g })}
      ${mono(170, 152, 'usiz umuman yozolmaysiz', C.v)}
      ${mono(500, 152, 'SIZ uni chaqirasiz', C.c)}
      ${mono(830, 152, 'U sizni chaqiradi', C.g)}
      ${label(500, 200, 'React · Vue — JavaScript uchun  ·  Django · FastAPI — Python uchun  ·  Laravel — PHP uchun  ·  Spring — Java uchun', C.n, 12)}`,
      "Framework ham o'z tilida yozilgan boladi. <b>Tilni bilmasangiz, framework yordam bermaydi.</b>");
});

})();
