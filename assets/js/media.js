/* =====================================================================
   MEDIA (placeholder) — neutral vehicle silhouettes drawn as SVG.
   No brand photos or official logos are used in this demo. In production every
   image below is replaced by the importer media library (DAM) URL published
   through Sales Partner: Integration point: GET /api/catalog/{model}/media
   ===================================================================== */
window.SP = window.SP || {};
(function () {
  /* side profiles: nose x/y, hood end, roof start/end, tail, rear x, wheel radius, cargo (no rear side windows) */
  const SHAPES = {
    hatch:    { x0: 92, yn: 214, xh: 282, yh: 184, xr1: 392, yr1: 112, xr2: 572, yr2: 118, xt: 690, yt: 182, x1: 712, r: 50 },
    hatchL:   { x0: 70, yn: 216, xh: 270, yh: 186, xr1: 388, yr1: 114, xr2: 590, yr2: 120, xt: 702, yt: 184, x1: 726, r: 50 },
    suv:      { x0: 80, yn: 200, xh: 268, yh: 168, xr1: 372, yr1: 96, xr2: 598, yr2: 100, xt: 700, yt: 166, x1: 722, r: 56 },
    fastback: { x0: 66, yn: 206, xh: 262, yh: 172, xr1: 380, yr1: 100, xr2: 530, yr2: 108, xt: 708, yt: 178, x1: 730, r: 56 },
    suv7:     { x0: 56, yn: 196, xh: 248, yh: 164, xr1: 346, yr1: 88, xr2: 652, yr2: 92, xt: 728, yt: 158, x1: 744, r: 57 },
    estate:   { x0: 58, yn: 220, xh: 256, yh: 188, xr1: 372, yr1: 118, xr2: 642, yr2: 122, xt: 722, yt: 176, x1: 740, r: 50 },
    mpv:      { x0: 68, yn: 206, xh: 196, yh: 170, xr1: 300, yr1: 82, xr2: 690, yr2: 82, xt: 716, yt: 112, x1: 728, r: 50 },
    bus:      { x0: 48, yn: 202, xh: 148, yh: 166, xr1: 250, yr1: 62, xr2: 730, yr2: 62, xt: 748, yt: 92, x1: 754, r: 50 },
    van:      { x0: 68, yn: 206, xh: 196, yh: 170, xr1: 300, yr1: 82, xr2: 690, yr2: 82, xt: 716, yt: 112, x1: 728, r: 50, cargo: true },
    mvan:     { x0: 48, yn: 202, xh: 148, yh: 166, xr1: 250, yr1: 62, xr2: 730, yr2: 62, xt: 748, yt: 92, x1: 754, r: 50, cargo: true },
    bigvan:   { x0: 40, yn: 196, xh: 122, yh: 160, xr1: 205, yr1: 34, xr2: 752, yr2: 34, xt: 762, yt: 48, x1: 764, r: 50, cargo: true }
  };
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const f = c => Math.max(0, Math.min(255, Math.round(k < 0 ? c * (1 + k) : c + (255 - c) * k))); return '#' + [f(r), f(g), f(b)].map(c => c.toString(16).padStart(2, '0')).join(''); };
  function car(shape, color, tx, ty) {
    const s = SHAPES[shape] || SHAPES.hatch, c = color || '#9DA3AA', L = s.x1 - s.x0, gy = 290;
    const wf = Math.round(s.x0 + L * .19), wr = Math.round(s.x1 - L * .175), wy = gy - s.r + 6;
    const body = 'M' + (s.x0 + 14) + ',' + (gy - 6) + ' L' + s.x0 + ',' + (gy - 34) + ' Q' + (s.x0 - 4) + ',' + (s.yn + 4) + ' ' + (s.x0 + 34) + ',' + s.yn +
      ' L' + s.xh + ',' + s.yh + ' Q' + (s.xr1 - 30) + ',' + (s.yr1 + 8) + ' ' + s.xr1 + ',' + s.yr1 + ' L' + s.xr2 + ',' + s.yr2 + ' Q' + (s.xt - 10) + ',' + (s.yr2 + 8) + ' ' + s.xt + ',' + s.yt +
      ' Q' + s.x1 + ',' + (s.yt + 6) + ' ' + s.x1 + ',' + (s.yt + 36) + ' L' + s.x1 + ',' + (gy - 22) + ' Q' + s.x1 + ',' + (gy - 6) + ' ' + (s.x1 - 16) + ',' + (gy - 6) + ' Z';
    const belt = s.yh - 6, beltR = Math.min(s.yt - 4, belt - 8);
    const wEnd = s.cargo ? s.xr1 + (s.xr2 - s.xr1) * .16 : s.xt - 22;
    const wEndY = s.cargo ? s.yr1 + 10 : Math.max(s.yr2 + 12, s.yt - 10);
    const win = 'M' + (s.xh + 26) + ',' + belt + ' L' + (s.xr1 + 6) + ',' + (s.yr1 + 10) + ' L' + (s.cargo ? wEnd : s.xr2 - 6) + ',' + (s.cargo ? s.yr1 + 10 : s.yr2 + 10) + ' L' + wEnd + ',' + wEndY + ' L' + wEnd + ',' + (s.cargo ? belt : beltR) + ' Z';
    const bx = s.cargo ? wEnd : Math.round((s.xr1 + s.xr2) / 2 + 10);
    const wheel = x => '<circle cx="' + x + '" cy="' + wy + '" r="' + (s.r + 6) + '" fill="' + shade(c, -.55) + '"/><circle cx="' + x + '" cy="' + wy + '" r="' + s.r + '" fill="#15171A"/><circle cx="' + x + '" cy="' + wy + '" r="' + Math.round(s.r * .62) + '" fill="#C9CDD2"/><circle cx="' + x + '" cy="' + wy + '" r="' + Math.round(s.r * .5) + '" fill="#7E848B"/>' +
      [0, 72, 144, 216, 288].map(a => { const r = a * Math.PI / 180, q = s.r * .58; return '<line x1="' + x + '" y1="' + wy + '" x2="' + (x + q * Math.cos(r)).toFixed(1) + '" y2="' + (wy + q * Math.sin(r)).toFixed(1) + '" stroke="#C9CDD2" stroke-width="7" stroke-linecap="round"/>'; }).join('') + '<circle cx="' + x + '" cy="' + wy + '" r="7" fill="#2A2D31"/>';
    const lamp = 'M' + (s.x0 + 6) + ',' + (s.yn + 14) + ' l26,-10 M' + (s.x0 + 8) + ',' + (s.yn + 22) + ' l26,-10 M' + (s.x0 + 10) + ',' + (s.yn + 30) + ' l26,-10';
    return '<g transform="translate(' + (tx || 0) + ',' + (ty || 0) + ')"><ellipse cx="' + ((s.x0 + s.x1) / 2) + '" cy="' + (gy + 2) + '" rx="' + (L * .52) + '" ry="12" fill="#000" opacity=".18"/>' +
      '<path d="' + body + '" fill="' + c + '"/><path d="' + body + '" fill="url(#sh)"/>' +
      '<path d="' + win + '" fill="#1C2026" opacity=".92"/>' + (s.cargo ? '' : '<line x1="' + bx + '" y1="' + (s.yr1 + 8) + '" x2="' + (bx - 6) + '" y2="' + (belt + 2) + '" stroke="' + c + '" stroke-width="9"/>') +
      '<line x1="' + (s.x0 + 30) + '" y1="' + (s.yh + 26) + '" x2="' + (s.x1 - 8) + '" y2="' + (s.yh + 20) + '" stroke="' + shade(c, -.25) + '" stroke-width="2" opacity=".7"/>' +
      '<path d="' + lamp + '" stroke="#F4F6F8" stroke-width="4" stroke-linecap="round"/><rect x="' + (s.x1 - 8) + '" y="' + (s.yt + 10) + '" width="8" height="22" rx="2" fill="#C8102E"/>' +
      wheel(wf) + wheel(wr) + '</g>';
  }
  const defs = '<defs><linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient></defs>';
  const uri = svg => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  /* transparent cut-out (cards, mega menu, configurator) */
  SP.carCut = (shape, color) => uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 330">' + defs + car(shape, color) + '</svg>');
  /* scene with background (hero, gallery, stock photos) */
  const BG = { studio: ['#F2F3F5', '#D9DCE0'], night: ['#2B2F35', '#0E1013'], dusk: ['#8F98A3', '#3B424B'], sand: ['#EDE6DC', '#C9BFB2'] };
  SP.carScene = (shape, color, bg, label) => {
    const g = BG[bg] || BG.studio, dark = bg === 'night' || bg === 'dusk';
    return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">' + defs.replace('</defs>', '<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + g[0] + '"/><stop offset="1" stop-color="' + g[1] + '"/></linearGradient></defs>') +
      '<rect width="1600" height="900" fill="url(#bg)"/><rect y="640" width="1600" height="260" fill="#000" opacity="' + (dark ? '.25' : '.05') + '"/>' +
      '<g transform="translate(120,110) scale(1.7)">' + car(shape, color) + '</g>' +
      '<text x="1560" y="868" text-anchor="end" font-family="Arial,sans-serif" font-size="20" letter-spacing="2" fill="' + (dark ? '#fff' : '#000') + '" opacity=".45">' + (label || 'PLACEHOLDER · IMAGINE IMPORTATOR') + '</text></svg>');
  };
  /* location / service / generic placeholder (building) */
  SP.placeImg = (kind, label) => {
    const k = { showroom: ['#E9EBEE', '#BFC5CC'], service: ['#DDE1E6', '#9AA3AD'], news: ['#2B2F35', '#4A525C'] }[kind] || ['#E9EBEE', '#BFC5CC'];
    return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + k[0] + '"/><stop offset="1" stop-color="' + k[1] + '"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/>' +
      (kind === 'news' ? '' : '<rect x="120" y="300" width="960" height="380" fill="#fff" opacity=".55"/><rect x="120" y="270" width="960" height="40" fill="#15171A"/><g fill="#15171A" opacity=".12">' + [0, 1, 2, 3, 4, 5].map(i => '<rect x="' + (150 + i * 155) + '" y="340" width="130" height="' + (kind === 'service' ? 300 : 220) + '"/>').join('') + '</g>') +
      '<text x="600" y="' + (kind === 'news' ? 420 : 210) + '" text-anchor="middle" font-family="Arial,sans-serif" font-size="' + (kind === 'news' ? 54 : 40) + '" font-weight="700" letter-spacing="6" fill="' + (kind === 'news' ? '#fff' : '#15171A') + '" opacity=".8">' + (label || '').toUpperCase() + '</text>' +
      '<text x="1170" y="780" text-anchor="end" font-family="Arial,sans-serif" font-size="18" letter-spacing="2" fill="' + (kind === 'news' ? '#fff' : '#000') + '" opacity=".4">PLACEHOLDER</text></svg>');
  };
  SP.SHAPES = SHAPES;
})();
