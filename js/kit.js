/* ============================================================
   kit.js — SVG chizma "konstruktori": bloklar, strelkalar,
   oqim nuqtalari, qurilma ramkalari va sahna boshqaruvi
   ============================================================ */
const K = (() => {
  const C = {
    v:'#8b5cf6', c:'#22d3ee', g:'#34d399', a:'#fbbf24',
    r:'#f87171', p:'#f472b6', o:'#fb923c', n:'#6d7f9f', i:'#818cf8'
  };
  const key = col => Object.keys(C).find(k => C[k] === col) || 'n';

  const DEFS = `<defs>
    <filter id="gl" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gl2" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="pn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#151d33"/><stop offset="100%" stop-color="#0d1424"/></linearGradient>
    ${Object.entries(C).map(([k, v]) => `
      <marker id="ar-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="${v}"/></marker>
      <linearGradient id="lg-${k}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${v}" stop-opacity=".30"/><stop offset="100%" stop-color="${v}" stop-opacity=".06"/></linearGradient>`).join('')}
  </defs>`;

  let uid = 0;
  const nid = p => `${p}${++uid}`;

  /* ---------- asosiy blok ---------- */
  function node(o) {
    const { x, y, w = 180, h = 78, t = '', s = '', ic = '', c = C.v, tip = '', step = 0, id = '', cls = '' } = o;
    const tx = ic ? 52 : w / 2, an = ic ? 'start' : 'middle';
    return `<g class="n ${cls}" ${id ? `id="${id}"` : ''} ${tip ? `data-tip="${tip}"` : ''} ${step ? `data-step="${step}"` : ''} transform="translate(${x},${y})">
      <rect width="${w}" height="${h}" rx="16" fill="url(#pn)" stroke="${c}" stroke-width="1.6"/>
      <rect width="${w}" height="${h}" rx="16" fill="url(#lg-${key(c)})"/>
      ${ic ? `<text x="22" y="${h / 2 + 8}" font-size="23">${ic}</text>` : ''}
      <text x="${tx}" y="${h / 2 + (s ? -3 : 6)}" text-anchor="${an}" fill="#e8eefc" font-size="15" font-weight="600">${t}</text>
      ${s ? `<text x="${tx}" y="${h / 2 + 16}" text-anchor="${an}" fill="#8fa2c4" font-size="11.5" font-family="JetBrains Mono,monospace">${s}</text>` : ''}
    </g>`;
  }

  /* ---------- kichik yorliq ---------- */
  const label = (x, y, t, c = '#8fa2c4', size = 12, anchor = 'middle', weight = 400) =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${c}" font-size="${size}" font-weight="${weight}" font-family="Inter,sans-serif">${t}</text>`;
  const mono = (x, y, t, c = '#6d7f9f', size = 11, anchor = 'middle') =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${c}" font-size="${size}" font-family="JetBrains Mono,monospace">${t}</text>`;

  /* ---------- sarlavha (zona nomi) ---------- */
  const zone = (x, y, w, h, t, c, dash = true) =>
    `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${c}0d" stroke="${c}44" stroke-width="1.4" ${dash ? 'stroke-dasharray="7 7"' : ''}/>
     ${label(x + w / 2, y - 10, t, c, 12.5, 'middle', 700)}</g>`;

  /* ---------- bog'lovchi chiziq + oqim nuqtasi ---------- */
  function link(d, o = {}) {
    const { c = C.n, dot = true, dur = 2.6, rev = false, label: lb = '', lx = 0, ly = 0, step = 0, arrow = true, w = 2, dash = true, r = 5, delay = 0 } = o;
    const id = nid('pt');
    return `<g ${step ? `data-step="${step}"` : ''}>
      <path id="${id}" d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-opacity=".55"
        ${dash ? 'class="ln"' : ''} ${arrow ? `marker-end="url(#ar-${key(c)})"` : ''}/>
      ${dot ? `<circle r="${r}" fill="${c}" filter="url(#gl)">
        <animateMotion dur="${dur}s" begin="${delay}s" repeatCount="indefinite" ${rev ? 'keyPoints="1;0" keyTimes="0;1" calcMode="linear"' : ''}>
        <mpath href="#${id}"/></animateMotion></circle>` : ''}
      ${lb ? mono(lx, ly, lb, c) : ''}</g>`;
  }

  /* ---------- ma'lumotlar bazasi silindri ---------- */
  const cyl = (x, y, w, h, t, c = C.g, s = '') => {
    const ry = 13;
    return `<g class="n" transform="translate(${x},${y})">
      <path d="M0,${ry} a${w / 2},${ry} 0 0 1 ${w},0 v${h - 2 * ry} a${w / 2},${ry} 0 0 1 -${w},0 z" fill="url(#pn)" stroke="${c}" stroke-width="1.6"/>
      <path d="M0,${ry} a${w / 2},${ry} 0 0 1 ${w},0 v${h - 2 * ry} a${w / 2},${ry} 0 0 1 -${w},0 z" fill="${c}" fill-opacity=".14"/>
      <path d="M0,${ry} a${w / 2},${ry} 0 0 1 ${w},0 a${w / 2},${ry} 0 0 1 -${w},0" fill="${c}" fill-opacity=".38" stroke="${c}" stroke-width="1.6"/>
      <line x1="6" y1="${ry + 20}" x2="${w - 6}" y2="${ry + 20}" stroke="${c}" stroke-opacity=".45"/>
      <line x1="6" y1="${ry + 38}" x2="${w - 6}" y2="${ry + 38}" stroke="${c}" stroke-opacity=".45"/>
      ${label(w / 2, h / 2 + 6, t, '#e8eefc', 13.5, 'middle', 600)}
      ${s ? mono(w / 2, h / 2 + 22, s) : ''}</g>`;
  };

  /* ---------- brauzer oynasi ---------- */
  const browser = (x, y, w, h, inner = '', url = '', c = C.v) =>
    `<g transform="translate(${x},${y})">
      <rect width="${w}" height="${h}" rx="14" fill="url(#pn)" stroke="${c}" stroke-width="1.6"/>
      <path d="M0,30 h${w}" stroke="${c}" stroke-opacity=".4"/>
      <circle cx="16" cy="15" r="4" fill="#f87171"/><circle cx="30" cy="15" r="4" fill="#fbbf24"/><circle cx="44" cy="15" r="4" fill="#34d399"/>
      <rect x="58" y="7" width="${w - 74}" height="16" rx="8" fill="#05080f"/>
      ${mono(66, 19, url, '#6d7f9f', 10, 'start')}
      <g transform="translate(0,30)">${inner}</g></g>`;

  /* ---------- telefon ramkasi ---------- */
  const phone = (x, y, w, h, inner = '', c = C.p) =>
    `<g transform="translate(${x},${y})">
      <rect width="${w}" height="${h}" rx="20" fill="url(#pn)" stroke="${c}" stroke-width="1.6"/>
      <rect x="${w / 2 - 22}" y="8" width="44" height="7" rx="3.5" fill="${c}55"/>
      <g transform="translate(0,26)">${inner}</g></g>`;

  /* ---------- server javoni ---------- */
  const rack = (x, y, w, h, c = C.c, t = '') => {
    const u = (h - 22) / 4;
    return `<g transform="translate(${x},${y})">
      <rect width="${w}" height="${h}" rx="14" fill="url(#pn)" stroke="${c}" stroke-width="1.6"/>
      ${[0, 1, 2, 3].map(i => `<g transform="translate(10,${12 + i * u})">
        <rect width="${w - 20}" height="${u - 8}" rx="6" fill="#05080f" stroke="${c}" stroke-opacity=".35"/>
        <circle class="led" cx="14" cy="${(u - 8) / 2}" r="3.2" fill="${i % 2 ? '#34d399' : '#22d3ee'}" style="animation-delay:${i * .4}s"/>
        <rect x="26" y="${(u - 8) / 2 - 2.5}" width="${w - 60}" height="5" rx="2.5" fill="${c}22"/></g>`).join('')}
      ${t ? label(w / 2, h + 20, t, '#8fa2c4', 12) : ''}</g>`;
  };

  /* ---------- ustunli diagramma (SVG) ---------- */
  const bars = (x, y, w, h, data, c) => {
    const bw = w / data.length, mx = 100;
    return `<g transform="translate(${x},${y})">
      ${data.map(([n, v], i) => {
        const bh = (v / mx) * h, cc = Array.isArray(c) ? c[i] : c;
        return `<g transform="translate(${i * bw},0)">
          <rect x="${bw * .18}" y="0" width="${bw * .64}" height="${h}" rx="7" fill="rgba(120,150,220,.09)"/>
          <rect class="gbar" x="${bw * .18}" y="${h - bh}" width="${bw * .64}" height="${bh}" rx="7" fill="${cc}" style="--bh:${bh}px;animation-delay:${i * .12}s"/>
          ${mono(bw / 2, h - bh - 9, v, cc, 11)}
          ${label(bw / 2, h + 17, n, '#8fa2c4', 10.5)}</g>`;
      }).join('')}</g>`;
  };


  /* ---------- infografika kartochkasi ---------- */
  function card(o) {
    const { x, y, w, h, n = '', t = '', c = C.v, body = '', tip = '', step = 0, sub = '' } = o;
    return `<g class="n" ${tip ? `data-tip="${tip}"` : ''} ${step ? `data-step="${step}"` : ''} transform="translate(${x},${y})">
      <rect width="${w}" height="${h}" rx="16" fill="rgba(9,14,26,.85)" stroke="${c}" stroke-width="1.5" stroke-opacity=".55"/>
      <rect width="${w}" height="${h}" rx="16" fill="url(#lg-${key(c)})" opacity=".5"/>
      ${n ? `<rect x="14" y="13" width="26" height="26" rx="9" fill="${c}" opacity=".22"/>
             ${label(27, 31, n, c, 13, 'middle', 800)}` : ''}
      ${label(n ? 50 : 16, 31, t, c, 14.5, 'start', 800)}
      ${sub ? mono(n ? 50 : 16, 47, sub, '#6d7f9f', 10.5, 'start') : ''}
      <g transform="translate(0,${sub ? 56 : 44})">${body}</g></g>`;
  }

  /* ---------- massiv/quti qatori (mini-sxema) ---------- */
  const boxRow = (x, y, vals, c = C.c, bw = 34, hi = []) =>
    `<g transform="translate(${x},${y})">${vals.map((v, i) => `
      <g><rect x="${i * (bw + 6)}" y="0" width="${bw}" height="${bw}" rx="8"
        fill="${hi.includes(i) ? c + '33' : 'rgba(120,150,220,.07)'}" stroke="${hi.includes(i) ? c : 'rgba(120,150,220,.28)'}" stroke-width="1.3"/>
      ${label(i * (bw + 6) + bw / 2, bw / 2 + 5, v, hi.includes(i) ? c : '#9fb0d0', 12.5, 'middle', 600)}</g>`).join('')}</g>`;

  /* ---------- yorliq-tabletka ---------- */
  const pill = (x, y, t, c = C.v, w = 0, h = 26, fs = 12) => {
    const ww = w || (String(t).length * 7.6 + 22);
    return `<g transform="translate(${x},${y})"><rect width="${ww}" height="${h}" rx="${h / 2}" fill="${c}1f" stroke="${c}" stroke-width="1.2" stroke-opacity=".65"/>
      ${label(ww / 2, h / 2 + 4.5, t, c, fs, 'middle', 600)}</g>`;
  };

  /* ---------- shoxlanuvchi daraxt bog'lovchisi ---------- */
  const branch = (x, y, toYs, len = 34, c = '#4b5b78') =>
    `<g stroke="${c}" stroke-width="1.6" fill="none" stroke-opacity=".7">
      <path d="M${x},${y} h${len / 2}"/>
      <path d="M${x + len / 2},${Math.min(...toYs)} V${Math.max(...toYs)}"/>
      ${toYs.map(ty => `<path d="M${x + len / 2},${ty} h${len / 2}"/>`).join('')}</g>`;

  /* ---------- sarlavha (poster uslubi) ---------- */
  const title = (x, y, t, c = '#e8eefc', size = 26) =>
    `<text x="${x}" y="${y}" text-anchor="middle" fill="${c}" font-size="${size}" font-weight="800" letter-spacing="-.5">${t}</text>`;

  /* ---------- sahnani o'rnatish ---------- */
  function scene(mount, cfg) {
    const { svg, caption = '', tips = {}, steps = null, legend = '', height = '', noCap = false } = cfg;
    mount.innerHTML = `
      <div class="scene-box">
        ${steps ? `<div class="stepbar" data-steps></div>` : ''}
        <svg class="scene" viewBox="${cfg.vb}" preserveAspectRatio="xMidYMid meet" ${height ? `style="max-height:${height}"` : ''}>${DEFS}${svg}</svg>
        ${legend ? `<div class="legend">${legend}</div>` : ''}
      </div>
      ${cfg.after || ''}`;

    const cap = mount.querySelector('[data-cap]');
    mount.querySelectorAll('[data-tip]').forEach(el => {
      el.classList.add('hit');
      el.addEventListener('click', () => {
        mount.querySelectorAll('[data-tip]').forEach(x => x.classList.remove('on'));
        el.classList.add('on');
        if (cap) { cap.innerHTML = tips[el.dataset.tip] || ''; cap.classList.remove('pop'); void cap.offsetWidth; cap.classList.add('pop'); }
      });
    });

    if (steps) {
      const bar = mount.querySelector('[data-steps]');
      bar.innerHTML = steps.map((s, i) => `<button class="stepchip" data-i="${i + 1}"><b>${i + 1}</b> ${s.t}</button>`).join('')
        + `<button class="stepchip play" data-play>▶ Ketma-ket</button>`;
      const all = [...mount.querySelectorAll('[data-step]')];
      const show = n => {
        all.forEach(el => el.classList.toggle('off', +el.dataset.step > n));
        all.forEach(el => el.classList.toggle('now', +el.dataset.step === n));
        bar.querySelectorAll('.stepchip[data-i]').forEach(b => b.classList.toggle('on', +b.dataset.i === n));
        if (cap) { cap.innerHTML = steps[n - 1].d; cap.classList.remove('pop'); void cap.offsetWidth; cap.classList.add('pop'); }
      };
      bar.querySelectorAll('[data-i]').forEach(b => b.onclick = () => show(+b.dataset.i));
      let timer = null;
      bar.querySelector('[data-play]').onclick = e => {
        clearInterval(timer); let n = 0;
        e.target.textContent = '▶ Ketma-ket';
        timer = setInterval(() => { n++; if (n > steps.length) { clearInterval(timer); return; } show(n); }, 2000);
        show(++n);
      };
      show(steps.length);
    }
    return mount;
  }

  return { C, DEFS, node, label, mono, zone, link, cyl, browser, phone, rack, bars, scene, nid, card, boxRow, pill, branch, title };
})();
