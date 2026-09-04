/* ============================================================
   scenes-1.js — 01..04 chizmalari
   ============================================================ */
(() => {
const { C, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene, card, pill, branch, title } = K;
const { $, $$ } = App;

/* umumiy panel shabloni */
const P = (t, vb, inner, note = '', legend = '') => `
  <div class="scene-box" style="margin-bottom:14px">
    ${t ? `<div class="panel-t" style="position:relative;z-index:2;margin-bottom:6px">${t}</div>` : ''}
    <svg class="scene" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${K.DEFS}${inner}</svg>
    ${legend ? `<div class="legend">${legend}</div>` : ''}
    ${note ? `<div class="small muted" style="text-align:center;margin-top:6px;position:relative;z-index:2">${note}</div>` : ''}
  </div>`;
const lg = (...items) => items.map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`).join('');

/* ============================================================
   01 — QAYSI TIL, QAYSI LOYIHA  (interaktiv xarita + frameworklar)
   ============================================================ */
const CATS = [
  { id:'web',  ic:'🌐', n:'Veb',       s:'sayt, admin panel, API', c:C.v },
  { id:'mob',  ic:'📱', n:'Mobil',     s:'iOS va Android ilova',   c:C.p },
  { id:'ai',   ic:'🤖', n:'AI',        s:'sun\'iy intellekt, ML',  c:C.c },
  { id:'game', ic:'🎮', n:'O\'yin',    s:'3D motorlar, grafika',   c:C.i },
  { id:'sys',  ic:'🖥️', n:'Tizim',     s:'OS, drayver, IoT',       c:C.o },
  { id:'db',   ic:'🗄️', n:'Database',  s:'ma\'lumot saqlash',      c:C.a }
];

const LANGS = [
  { id:'js', n:'JavaScript', c:'#fbbf24', y:'1995', t:'Dynamic · JIT', cats:['web','mob'],
    fw:['React','Vue','Angular','Next.js','Node.js','Express'],
    use:'Brauzerdagi hamma narsa. Node.js bilan server tomonini ham yozadi, React Native bilan mobil ilova ham.',
    big:'YouTube, Netflix, Facebook interfeysi', db:'MongoDB, PostgreSQL (Prisma, Sequelize)' },
  { id:'py', n:'Python', c:'#22d3ee', y:'1991', t:'Dynamic · Interpretatsiya', cats:['web','ai'],
    fw:['Django','FastAPI','Flask','PyTorch','TensorFlow','pandas'],
    use:'Sun\'iy intellekt va ma\'lumot tahlilining asosiy tili; veb backend uchun ham juda qulay.',
    big:'Instagram backend, AI modellarini o\'qitish', db:'PostgreSQL, MySQL (SQLAlchemy, Django ORM)' },
  { id:'go', n:'Go', c:'#67e8f9', y:'2009', t:'Static · Kompilyatsiya', cats:['web'],
    fw:['Gin','Echo','Fiber','gRPC'],
    use:'Yuqori yuklamali veb-xizmatlar va mikroservislar. Sodda sintaksis, juda tez ishlaydi.',
    big:'Docker, Kubernetes', db:'PostgreSQL, Redis (GORM)' },
  { id:'cpp', n:'C++', c:'#60a5fa', y:'1985', t:'Static · Kompilyatsiya', cats:['web','ai','game','sys'],
    fw:['Unreal Engine','Qt','Boost'],
    use:'Eng tez til: o\'yin motorlari, operatsion tizim, brauzer, AI kutubxonalarining ichki qismi.',
    big:'Chrome, Unreal Engine, MySQL dvigateli', db:'Baza dvigatellarining O\'ZI shu tilda yozilgan' },
  { id:'cs', n:'C#', c:'#a78bfa', y:'2000', t:'Static · Kompilyatsiya', cats:['web','game'],
    fw:['.NET','ASP.NET','Unity','MAUI'],
    use:'Unity o\'yinlari va korporativ veb-tizimlar. Microsoft olamining asosiy tili.',
    big:'Unity o\'yinlari, Microsoft xizmatlari', db:'SQL Server, PostgreSQL (Entity Framework)' },
  { id:'rust', n:'Rust', c:'#fb923c', y:'2010', t:'Static · Kompilyatsiya', cats:['web','sys'],
    fw:['Actix','Axum','Tokio'],
    use:'Tizim dasturlash: C++ tezligi + xotira xavfsizligi. Tez veb-xizmatlar uchun ham.',
    big:'Firefox qismlari, Discord serverlari', db:'PostgreSQL (SQLx, Diesel)' },
  { id:'java', n:'Java', c:'#f87171', y:'1995', t:'Static · JVM', cats:['web','mob'],
    fw:['Spring Boot','Hibernate','Android SDK'],
    use:'Bank va yirik korporativ tizimlar; Android ilovalari ham shu tilda yozilgan.',
    big:'Bank tizimlari, Android ilovalar', db:'Oracle, PostgreSQL (Hibernate JPA)' },
  { id:'php', n:'PHP', c:'#818cf8', y:'1995', t:'Dynamic', cats:['web'],
    fw:['Laravel','Symfony','WordPress'],
    use:'Klassik veb-saytlar va kontent tizimlari. Internetdagi saytlarning katta qismi shunda.',
    big:'WordPress, Wikipedia', db:'MySQL, MariaDB (Eloquent ORM)' },
  { id:'swift', n:'Swift', c:'#f472b6', y:'2014', t:'Static · Kompilyatsiya', cats:['mob'],
    fw:['SwiftUI','UIKit','Vapor'],
    use:'Apple olami: iPhone, iPad va Mac ilovalari uchun rasmiy til.',
    big:'Apple\'ning o\'z ilovalari', db:'Core Data, SQLite' },
  { id:'flutter', n:'Flutter', c:'#5eead4', y:'2017', t:'Dart tili · AOT', cats:['mob'],
    fw:['Flutter SDK','Bloc','Riverpod','GetX'],
    use:'Bitta koddan iOS va Android ilova. Interfeysni o\'zi chizadi — ikkalasida bir xil ko\'rinadi.',
    big:'Google Pay, ko\'plab startap ilovalari', db:'Firebase, SQLite (Drift)' },
  { id:'sql', n:'SQL', c:'#34d399', y:'1974', t:'So\'rov tili', cats:['web','db'],
    fw:['SELECT','JOIN','INDEX','TRANSACTION'],
    use:'Bazadan ma\'lumot so\'rash tili. Unda dastur yozilmaydi — ma\'lumot olinadi, qo\'shiladi, o\'zgartiriladi.',
    big:'Deyarli har bir jiddiy ilova ichida', db:'PostgreSQL, MySQL, SQLite, SQL Server' },
  { id:'mysql', n:'MySQL', c:'#38bdf8', y:'1995', t:'Baza tizimi', cats:['db'],
    fw:['MariaDB','Workbench','phpMyAdmin'],
    use:'Eng mashhur ochiq bazalardan biri. Veb-saytlar va WordPress bilan juda ko\'p ishlatiladi.',
    big:'WordPress saytlari, veb-loyihalar', db:'SQL tilida so\'rov qabul qiladi' },
  { id:'pg', n:'PostgreSQL', c:'#a5b4fc', y:'1996', t:'Baza tizimi', cats:['db'],
    fw:['pgAdmin','PostGIS','TimescaleDB','Supabase'],
    use:'Kuchli va ishonchli baza: murakkab so\'rovlar, JSON, geografik ma\'lumotlar bilan ishlaydi.',
    big:'Zamonaviy startaplar, bank tizimlari', db:'SQL tilida so\'rov qabul qiladi' }
];

App.demo('langMap', m => {
  const ly = i => 10 + i * 54, cy = i => 26 + i * 112;
  const links = [];
  CATS.forEach((cat, ci) => LANGS.forEach((l, li) => {
    if (!l.cats.includes(cat.id)) return;
    const a = cy(ci) + 31, b = ly(li) + 22;
    links.push(`<g class="lk" data-cat="${cat.id}" data-lang="${l.id}">${
      link(`M240,${a} C430,${a} 560,${b} 748,${b}`, { c: cat.c, dur: 2.2 + (li % 5) * .25, r: 4, dash: false, arrow: false, delay: (ci + li) * .1 })}</g>`);
  }));

  m.innerHTML = `
    <div class="scene-box">
      <svg class="scene" viewBox="0 0 1000 720" preserveAspectRatio="xMidYMid meet">${K.DEFS}
        ${links.join('')}
        ${CATS.map((c, i) => node({ x: 20, y: cy(i), w: 220, h: 62, t: c.n, s: c.s, ic: c.ic, c: c.c, id: 'cat-' + c.id })).join('')}
        ${LANGS.map((l, i) => `<g class="lang" data-lang="${l.id}">${node({ x: 748, y: ly(i), w: 232, h: 44, t: l.n, s: l.t, c: l.c })}</g>`).join('')}
      </svg>
    </div>

     <br>
    <div class="fw-grid" id="lmFw"></div>

    `;

  const fw = $('#lmFw', m);
  const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));

  fw.innerHTML = LANGS.map((l, i) => `
    <div class="fw-card" data-lang="${l.id}" style="--c:${l.c};animation-delay:${i * 45}ms">
      <div class="fw-h"><span class="fw-dot"></span><b>${l.n}</b><span class="fw-y">${l.y}</span></div>
      <div class="fw-p">${l.fw.map(f => `<span>${f}</span>`).join('')}</div>
    </div>`).join('');

  function showLang(id) {
    $$('[id^="cat-"]', m).forEach(g => g.classList.remove('picked'));
    $$('.lang', m).forEach(g => g.classList.remove('dim'));
    $$('.fw-card', m).forEach(c => c.classList.remove('dim'));
    $$('.fw-card', m).forEach(c => c.classList.toggle('on', c.dataset.lang === id));
    $$('.lang', m).forEach(g => g.classList.toggle('on', g.dataset.lang === id));
    $$('.lk', m).forEach(g => g.classList.toggle('off', g.dataset.lang !== id));
  }

  function showCat(id) {
    $$('.lang', m).forEach(g => g.classList.remove('on'));
    $$('.fw-card', m).forEach(c => c.classList.remove('on'));
    $$('[id^="cat-"]', m).forEach(g => g.classList.remove('picked'));
    if (id === 'all') {
      $$('.lk', m).forEach(g => g.classList.remove('off'));
      $$('.lang', m).forEach(g => g.classList.remove('dim'));
      $$('.fw-card', m).forEach(c => c.classList.remove('dim'));
      return;
    }
    $$('.lk', m).forEach(g => g.classList.toggle('off', g.dataset.cat !== id));
    const langs = LANGS.filter(l => l.cats.includes(id));
    $$('.lang', m).forEach(g => g.classList.toggle('dim', !langs.some(l => l.id === g.dataset.lang)));
    $$('.fw-card', m).forEach(el => el.classList.toggle('dim', !langs.some(l => l.id === el.dataset.lang)));
  }

  $$('.lang', m).forEach(g => { g.style.cursor = 'pointer'; g.onclick = () => showLang(g.dataset.lang); });
  $$('.fw-card', m).forEach(c => { c.onclick = () => showLang(c.dataset.lang); });
  $$('[id^="cat-"]', m).forEach(g => {
    g.style.cursor = 'pointer';
    const id = g.id.replace('cat-', '');
    g.onclick = () => { const was = g.classList.contains('picked'); showCat(was ? 'all' : id); g.classList.toggle('picked', !was); };
  });
  showCat('all');
});

})();
