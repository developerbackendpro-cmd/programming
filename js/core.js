/* ============================================================
   core.js — navigatsiya, yordamchi funksiyalar, demo registri
   ============================================================ */
const App = (() => {
  const demos = {};
  let slides = [], cur = 0, inited = new Set();

  /* ---------- yordamchilar ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  /* terminal-loglarga qator qo'shish */
  function log(box, text, cls = '') {
    const s = document.createElement('span');
    s.className = 'l ' + cls;
    s.innerHTML = text;
    box.appendChild(s);
    box.scrollTop = box.scrollHeight;
    return s;
  }
  function clearLog(box) { box.innerHTML = ''; }

  /* SVG bo'ylab harakatlanuvchi "paket" */
  function sendPacket(svg, path, opts = {}) {
    const { dur = 900, color = '#22d3ee', label = '', r = 9, onDone } = opts;
    const NS = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(NS, 'g');
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', r); c.setAttribute('fill', color);
    c.setAttribute('filter', 'url(#glow)');
    g.appendChild(c);
    if (label) {
      const t = document.createElementNS(NS, 'text');
      t.textContent = label;
      t.setAttribute('y', -15); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', color); t.setAttribute('font-size', '11');
      t.setAttribute('font-family', 'JetBrains Mono, monospace');
      g.appendChild(t);
    }
    svg.appendChild(g);
    const len = path.getTotalLength();
    const t0 = performance.now();
    (function step(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const pt = path.getPointAtLength(e * len);
      g.setAttribute('transform', `translate(${pt.x},${pt.y})`);
      if (p < 1) requestAnimationFrame(step);
      else { g.remove(); onDone && onDone(); }
    })(t0);
  }

  /* SVG uchun umumiy filtr/defs */
  const DEFS = `<defs>
      <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="gv" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6366f1"/>
      </linearGradient>
      <linearGradient id="gc" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#0ea5e9"/>
      </linearGradient>
      <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#34d399"/><stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>`;

  /* SVG quti (node) yaratish uchun qisqa yordamchi */
  function box(x, y, w, h, title, sub, color = '#8b5cf6', id = '') {
    return `<g class="node-box" ${id ? `id="${id}"` : ''}>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"
        fill="rgba(18,26,45,.95)" stroke="${color}" stroke-width="1.6"/>
      <text x="${x + w / 2}" y="${y + h / 2 - (sub ? 6 : -5)}" text-anchor="middle" fill="#e8eefc"
        font-size="14" font-weight="600" font-family="Inter,sans-serif">${title}</text>
      ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 14}" text-anchor="middle" fill="#8fa2c4"
        font-size="11" font-family="JetBrains Mono,monospace">${sub}</text>` : ''}
    </g>`;
  }

  /* ---------- navigatsiya ---------- */
  function buildNav() {
    const nav = $('#nav'), dots = $('#dots');
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'nav-item';
      b.innerHTML = `<span class="ni-num">${i === 0 ? '•' : String(i).padStart(2, '0')}</span>
                     <span class="ni-ic">${s.dataset.icon || ''}</span>
                     <span>${s.dataset.title}</span>`;
      b.onclick = () => go(i);
      nav.appendChild(b);

      const d = document.createElement('button');
      d.className = 'dot'; d.title = s.dataset.title;
      d.onclick = () => go(i);
      dots.appendChild(d);
    });
  }

  function go(i) {
    cur = clamp(i, 0, slides.length - 1);
    slides.forEach((s, k) => s.classList.toggle('active', k === cur));
    $$('.nav-item').forEach((b, k) => b.classList.toggle('active', k === cur));
    $$('.dot').forEach((b, k) => b.classList.toggle('active', k === cur));
    document.title = slides[cur].dataset.title + ' — Dasturlash olami';
    $('#prevBtn').disabled = cur === 0;
    $('#nextBtn').disabled = cur === slides.length - 1;
    location.hash = 's' + cur;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
    initDemo(slides[cur]);
    const active = $$('.nav-item')[cur];
    active && active.scrollIntoView({ block: 'nearest' });
  }

  function initDemo(slide) {
    const mount = $('[data-demo]', slide);
    if (!mount) return;
    const name = mount.dataset.demo;
    if (inited.has(name)) return;
    if (typeof demos[name] === 'function') {
      inited.add(name);
      try { demos[name](mount); }
      catch (e) { console.error('demo xato:', name, e); mount.innerHTML = '<div class="panel">Demo yuklanmadi.</div>'; }
    }
  }

  const openSidebar  = () => { $('#sidebar').classList.add('open'); $('#scrim').classList.add('on'); };
  const closeSidebar = () => { $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('on'); };

  /* ---------- kirish slaydi kartalari ---------- */
  const INTRO = [
    ['🧠', 'Tillar', 'Qaysi til qaysi ish uchun'],
    ['🎭', 'Front &amp; Back', 'Ko\'rinish va mantiq'],
    ['🗄️', 'Ma\'lumot', 'Baza, cache, backup'],
    ['🔐', 'Xavfsizlik', 'Auth, JWT, rate limit'],
    ['🔌', 'API', 'Request va response'],
    ['🐳', 'Muhit', 'Docker va mobil']
  ];

  function init() {
    slides = $$('.slide');
    buildNav();

    $('#introCards').innerHTML = INTRO.map(([i, t, d]) =>
      `<div class="intro-card"><div class="ic">${i}</div><div class="it">${t}</div><div class="id">${d}</div></div>`
    ).join('');

    $('#nextBtn').onclick = () => go(cur + 1);
    $('#prevBtn').onclick = () => go(cur - 1);
    $('#menuBtn').onclick = openSidebar;
    $('#scrim').onclick = closeSidebar;
    $$('[data-goto]').forEach(b => b.onclick = () => go(+b.dataset.goto));

    document.addEventListener('keydown', e => {
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(cur + 1);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(cur - 1);
      if (e.key === 'Home') go(0);
      if (e.key === 'End') go(slides.length - 1);
    });

    /* mobil uchun swipe */
    let x0 = null, y0 = null;
    document.addEventListener('touchstart', e => {
      if (e.target.closest && e.target.closest('.scene-box')) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2) go(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });

    const h = parseInt((location.hash || '').replace('#s', ''), 10);
    go(Number.isFinite(h) ? h : 0);
  }

  return { init, go, $, $$, log, clearLog, sendPacket, wait, rnd, clamp, box, DEFS,
           demo: (n, f) => demos[n] = f };
})();
