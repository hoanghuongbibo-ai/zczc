/* Painter kit v2 — the "repainted" look the user showed (Oct '26 reference frames): soft shaded clouds with a sketch line,
 * misty layered hills, brush-stroke meadows with cloud shadows, mossy dry-stone walls, stained plaster with cracks + ivy,
 * grained planks, wavy soil strata, a live stream and campfire, a bokeh room, and a whole-frame canvas texture.
 *   G.Paint2 = { noiseTex, canvasTex, pcloud, overcast, haze, meadow, drystone, stream, plaster, ivy, planks, strata, pebbles, fire, lantern, bokeh }
 * Everything static draws into cached layers (G.Paint.layer); fire / stream / lantern take t and draw live. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, { W, H, clamp, lerp, grad, rng } = T, { OUT, sh, ln, circ, layer, PAD } = P, TAU = Math.PI * 2;
  const mix = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join(''); };
  const cnv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

  // ---------- textures ----------
  const texCache = {};
  function noiseTex(seed = 1, w = 512, h = 512, scale = 1) {   // soft multi-octave value noise (grey), tileable enough for overlays
    const key = seed + ':' + w + ':' + scale; if (texCache[key]) return texCache[key];
    const c = cnv(w, h), g = c.getContext('2d'), r = rng(seed); g.fillStyle = '#808080'; g.fillRect(0, 0, w, h);
    for (const [n, rad, a] of [[90, 60 * scale, .10], [400, 18 * scale, .10], [2600, 4 * scale, .12], [9000, 1.2, .18]])
      for (let i = 0; i < n; i++) { const x = r() * w, y = r() * h, v = r() < .5 ? 0 : 255; g.fillStyle = `rgba(${v},${v},${v},${a * r()})`; g.beginPath(); g.arc(x, y, rad * (.5 + r()), 0, TAU); g.fill(); }
    return (texCache[key] = c);
  }
  function canvasTex() {   // painterly canvas: diagonal brush strokes + paper tooth (applied over the whole frame in post)
    if (texCache.canvas) return texCache.canvas;
    const c = cnv(W, H), g = c.getContext('2d'), r = rng(77); g.fillStyle = '#808080'; g.fillRect(0, 0, W, H);
    g.globalAlpha = 1; g.drawImage(noiseTex(5, 640, 360, 1.4), 0, 0, W, H);
    g.lineCap = 'round'; for (let i = 0; i < 2600; i++) { const x = r() * W, y = r() * H, L = 8 + r() * 26, a = -.6 + (r() - .5) * .5, v = r() < .5 ? 40 : 215;
      g.strokeStyle = `rgba(${v},${v},${v},${.05 + r() * .07})`; g.lineWidth = 1 + r() * 2.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke(); }
    for (let i = 0; i < 14000; i++) { const v = r() < .5 ? 0 : 255; g.fillStyle = `rgba(${v},${v},${v},${.06 + r() * .08})`; g.fillRect(r() * W, r() * H, 1.4, 1.4); }
    return (texCache.canvas = c);
  }
  // overlay a grey texture onto a region already painted (keeps hue, adds mottling)
  function grain(g, x, y, w, h, a = .35, seed = 3, mode = 'overlay', scale = 1) { g.save(); g.globalCompositeOperation = mode; g.globalAlpha = a; const tx = noiseTex(seed, 512, 512, scale); for (let yy = y; yy < y + h; yy += 512) for (let xx = x; xx < x + w; xx += 512) g.drawImage(tx, xx, yy); g.restore(); }

  // ---------- skies ----------
  // a painted cumulus: lit top, lavender-grey belly, soft inner highlights and a thin broken sketch line
  const pcloud = (seed, w = 360, h = 170, tone = 'day') => layer(`pc2${seed}-${w}-${tone}`, g => {
    g.translate(-PAD, 0); const r = rng(seed), B = [], n = 9, TONE = { day: ['#ffffff', '#f6f3f2', '#d3ccd2', '#aea4b0'], grey: ['#f1f0ee', '#d8d6d6', '#a6a4ab', '#7d7a84'], warm: ['#fffaf4', '#f8e6e0', '#dcbcc4', '#b892a6'], dusk: ['#ffd9c0', '#e9a99a', '#9a6a84', '#5d4a66'] }[tone];
    for (let i = 0; i < n; i++) { const u = i / (n - 1), bump = Math.sin(u * Math.PI); B.push([34 + u * (w - 68) + (r() - .5) * 16, h * .6 - bump * h * (.16 + r() * .14), h * (.13 + bump * .18 + r() * .05)]); }
    for (let i = 0; i < 5; i++) B.push([60 + i * (w - 120) / 4, h * .7, h * .13]);   // rounded belly
    const body = c => { for (const [x, y, rr] of B) { c.moveTo(x + rr, y); c.arc(x, y, rr, 0, TAU); } };
    const off = cnv(w, h), o = off.getContext('2d');
    o.lineWidth = 4.5; o.strokeStyle = 'rgba(96,82,104,.7)'; for (const [x, y, rr] of B) { o.beginPath(); o.arc(x, y, rr, 0, TAU); o.stroke(); }
    o.fillStyle = grad(o, 0, h * .12, 0, h * .86, [[0, TONE[0]], [.45, TONE[1]], [.78, TONE[2]], [1, TONE[3]]]); o.beginPath(); body(o); o.fill();
    o.save(); o.beginPath(); body(o); o.clip(); o.filter = 'blur(7px)'; for (const [x, y, rr] of B.slice(0, n)) { o.fillStyle = 'rgba(255,255,255,.8)'; o.beginPath(); o.arc(x - rr * .25, y - rr * .35, rr * .5, 0, TAU); o.fill(); }
      o.filter = 'none'; grain(o, 0, 0, w, h, .3, seed + 4, 'overlay', .6); o.restore();
    g.drawImage(off, 0, 0);
  }, 0, w, h);
  function clouds2(ctx, t, pan, list, tone = 'day') { for (const [x, y, s, seed, sp] of list) { const c = pcloud(seed, 360, 170, tone); ctx.drawImage(c, x + t * sp - pan * .08, y, 360 * s, 170 * s); } }
  // overcast: soft blurred banks of cloud across a grey-blue sky, a pale break of light low down
  function overcast(g, stops = [[0, '#8796a6'], [.45, '#b8c0c4'], [.75, '#dcd9cc'], [1, '#e8e0c8']], seed = 1, light = [980, 300]) {
    g.fillStyle = grad(g, 0, 0, 0, H, stops); g.fillRect(-PAD, 0, W + PAD * 2, H);
    const lr = g.createRadialGradient(light[0], light[1], 10, light[0], light[1], 520); lr.addColorStop(0, 'rgba(255,250,232,.85)'); lr.addColorStop(.4, 'rgba(255,246,225,.35)'); lr.addColorStop(1, 'rgba(255,246,225,0)'); g.fillStyle = lr; g.fillRect(-PAD, 0, W + PAD * 2, H);
    const r = rng(seed), off = cnv(W + PAD * 2, H), o = off.getContext('2d'); o.translate(PAD, 0); o.filter = 'blur(18px)';
    for (let i = 0; i < 46; i++) { const x = -PAD + r() * (W + PAD * 2), y = r() * 330, rx = 120 + r() * 220, ry = 26 + r() * 40, l = r() < .45;
      o.fillStyle = l ? `rgba(250,248,240,${.25 + r() * .3})` : `rgba(96,106,124,${.18 + r() * .22})`; o.beginPath(); o.ellipse(x, y, rx, ry, (r() - .5) * .15, 0, TAU); o.fill(); }
    g.save(); g.translate(-PAD, 0); g.drawImage(off, 0, 0); g.restore();
    grain(g, -PAD, 0, W + PAD * 2, 400, .25, seed + 2, 'soft-light', 1.5);
  }
  // atmospheric haze band (lighten distant layers)
  function haze(g, y0, y1, col = 'rgba(232,236,236,', a = .55) { g.fillStyle = grad(g, 0, y0, 0, y1, [[0, col + '0)'], [.5, col + a + ')'], [1, col + '0)']]); g.fillRect(-PAD, y0, W + PAD * 2, y1 - y0); }
  // misty hills: gradient body, cloud-shadow patches, brush texture and a soft (blurred) far edge
  function mistyHills(g, base, pts, top, bot, o = {}) {
    const off = cnv(W + PAD * 2, H), c = off.getContext('2d'); c.translate(PAD, 0);
    const sil = q => { q.beginPath(); q.moveTo(pts[0][0], base); for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; q.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } q.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]); q.lineTo(pts[pts.length - 1][0], base); q.closePath(); };
    const ymin = Math.min(...pts.map(p => p[1])); c.fillStyle = grad(c, 0, ymin, 0, base, [[0, top], [1, bot]]); sil(c); c.fill();
    c.save(); sil(c); c.clip(); const r = rng(o.seed || 3); c.filter = 'blur(14px)';
    for (let i = 0; i < (o.shadows ?? 7); i++) { c.fillStyle = 'rgba(40,60,40,.22)'; c.beginPath(); c.ellipse(-PAD + r() * (W + PAD * 2), ymin + r() * (base - ymin), 90 + r() * 160, 18 + r() * 26, 0, 0, TAU); c.fill(); }
    for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(255,255,230,.18)'; c.beginPath(); c.ellipse(-PAD + r() * (W + PAD * 2), ymin + r() * 40, 160, 20, 0, 0, TAU); c.fill(); }
    c.filter = 'none'; grain(c, -PAD, ymin, W + PAD * 2, base - ymin, .3, (o.seed || 3) + 1, 'overlay', 1); c.restore();
    if (o.line !== false) { c.save(); c.strokeStyle = o.lineCol || 'rgba(60,70,60,.45)'; c.lineWidth = 2; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; c.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } c.stroke(); c.restore(); }
    g.save(); g.translate(-PAD, 0); if (o.blur) g.filter = `blur(${o.blur}px)`; g.drawImage(off, 0, 0); g.restore();
  }
  // brush-stroke meadow: base gradient, blurred light/shadow patches, then thousands of blade strokes (longer near the camera)
  function meadow(g, y0, y1, o = {}) {
    const r = rng(o.seed || 9), tones = o.tones || ['#3f6a2e', '#55833a', '#6f9b45', '#8db757', '#a9c96a'];
    const area = c => { c.beginPath(); if (o.edge) { c.moveTo(-PAD, o.edge(-PAD)); for (let x = -PAD; x <= W + PAD; x += 16) c.lineTo(x, o.edge(x)); c.lineTo(W + PAD, y1); c.lineTo(-PAD, y1); c.closePath(); } else c.rect(-PAD, y0, W + PAD * 2, y1 - y0); };
    g.save(); area(g); g.clip(); g.fillStyle = grad(g, 0, y0, 0, y1, [[0, o.top || '#8fb560'], [1, o.bot || '#4f7a35']]); g.fillRect(-PAD, y0, W + PAD * 2, y1 - y0);
    g.filter = 'blur(16px)';
    for (let i = 0; i < 14; i++) { g.fillStyle = r() < .5 ? 'rgba(30,60,25,.22)' : 'rgba(220,240,150,.18)'; g.beginPath(); g.ellipse(-PAD + r() * (W + PAD * 2), lerp(y0, y1, r()), 120 + r() * 200, 14 + r() * 24, 0, 0, TAU); g.fill(); }
    g.filter = 'none'; g.lineCap = 'round';
    const n = o.n || 4200; for (let i = 0; i < n; i++) { const u = Math.pow(r(), .8), y = lerp(y0, y1, u), x = -PAD + r() * (W + PAD * 2), L = lerp(3, o.maxL || 22, u) * (.6 + r() * .7), lean = (r() - .5) * .7;
      g.strokeStyle = tones[Math.floor(r() * tones.length)]; g.globalAlpha = .55 + r() * .4; g.lineWidth = lerp(.8, 2.6, u); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + lean * L * .3, y - L * .6, x + lean * L, y - L); g.stroke(); }
    g.globalAlpha = 1; grain(g, -PAD, y0, W + PAD * 2, y1 - y0, .22, (o.seed || 9) + 3, 'overlay', 1); g.restore();
    if (o.edge && o.line !== false) { g.beginPath(); g.moveTo(-PAD, o.edge(-PAD)); for (let x = -PAD; x <= W + PAD; x += 16) g.lineTo(x, o.edge(x)); g.lineWidth = 2; g.strokeStyle = 'rgba(50,70,35,.4)'; g.stroke(); }
  }
  // mossy dry-stone wall: courses of rounded stones, each lit from the top-left, with moss on the caps
  function drystone(g, x0, x1, yb, h = 64, seed = 4, o = {}) {
    const r = rng(seed), rows = o.rows || 3, rh = h / (rows + .6), base = o.base || ['#9d9a8c', '#8a877b', '#a9a594', '#7c796e', '#958f7e', '#8f8a70'];
    sh(g, '#3a372e', 0, c => c.roundRect(x0, yb - h + rh * .3, x1 - x0, h - rh * .3, 6));
    const stone = (x, y, w, hh) => { const pts = []; for (let k = 0; k < 9; k++) { const a = k / 9 * TAU, rx = w / 2 * (.78 + r() * .3), ry = hh / 2 * (.74 + r() * .34); pts.push([x + Math.cos(a) * rx, y + Math.sin(a) * ry]); }
      const path = c => { c.moveTo((pts[0][0] + pts[8][0]) / 2, (pts[0][1] + pts[8][1]) / 2); for (let k = 0; k < 9; k++) { const a = pts[k], b = pts[(k + 1) % 9]; c.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } c.closePath(); };
      const col = base[Math.floor(r() * base.length)]; g.save(); g.beginPath(); path(g); g.fillStyle = grad(g, x - w / 3, y - hh / 2, x + w / 4, y + hh / 2, [[0, mix(col, '#f4f0e0', .14)], [.5, col], [1, mix(col, '#22221a', .5)]]); g.fill(); g.clip();
      if (r() < .6) { g.fillStyle = ['#6f8a3a', '#7d9a40', '#5c7a34'][Math.floor(r() * 3)]; g.globalAlpha = .75; g.beginPath(); g.ellipse(x + (r() - .5) * w * .3, y - hh * .35, w * (.25 + r() * .25), hh * .28, 0, 0, TAU); g.fill(); g.globalAlpha = 1; }
      g.fillStyle = 'rgba(40,30,20,.25)'; for (let k = 0; k < 4; k++) g.fillRect(x + (r() - .5) * w * .6, y + (r() - .5) * hh * .5, 1.5, 1.5); g.restore();
      g.beginPath(); path(g); g.lineWidth = 1.8; g.strokeStyle = 'rgba(52,44,36,.85)'; g.stroke(); };
    for (let row = 0; row < rows; row++) { const y = yb - rh * (row + .55); let x = x0 - (row % 2) * rh * .7 - r() * rh; while (x < x1) { const w = rh * (1.2 + r() * 1.1); stone(x + w / 2, y + (r() - .5) * rh * .25, w * .94, rh * (.9 + r() * .2)); x += w; } }
    let x = x0; while (x < x1) { const w = rh * (.9 + r() * .5); stone(x + w / 2, yb - h + rh * .1, w, rh * .9); x += w * .85; }   // cap stones
  }
  // live stream: banked water with drifting highlight streaks and glints
  function stream(ctx, t, top, bot, pan = 0, o = {}) {
    const path = c => { c.beginPath(); c.moveTo(-40, top(0)); for (let x = 0; x <= W + 40; x += 40) c.lineTo(x, top(x + pan)); for (let x = W + 40; x >= -40; x -= 40) c.lineTo(x, bot(x + pan)); c.closePath(); };
    ctx.save(); path(ctx); ctx.fillStyle = grad(ctx, 0, top(640), 0, bot(640), [[0, o.top || '#8aa3b4'], [.5, o.mid || '#6f8899'], [1, o.bot || '#4c6170']]); ctx.fill(); ctx.clip();
    const r = rng(14); ctx.lineCap = 'round';
    for (let i = 0; i < 46; i++) { const ux = (r() * (W + 200) + t * (24 + r() * 18)) % (W + 200) - 100, v = r(), y = lerp(top(ux + pan), bot(ux + pan), v), L = 20 + r() * 60;
      ctx.strokeStyle = `rgba(235,245,250,${.25 + .35 * Math.abs(Math.sin(t * 1.4 + i))})`; ctx.lineWidth = 1.5 + r() * 2; ctx.beginPath(); ctx.moveTo(ux, y); ctx.lineTo(ux + L, y + (r() - .5) * 2); ctx.stroke(); }
    ctx.fillStyle = 'rgba(30,40,40,.25)'; ctx.fillRect(0, 0, W, H * 0); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-40, top(0)); for (let x = 0; x <= W + 40; x += 40) ctx.lineTo(x, top(x + pan)); ctx.lineWidth = 6; ctx.strokeStyle = '#5a4430'; ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(30,22,16,.7)'; ctx.stroke(); ctx.restore();
  }
  // plaster wall: mottled base, damp rising from the ground, chipped corners showing stone, hairline cracks
  function plaster(g, x, y, w, h, base = '#e2d2b4', seed = 1, o = {}) {
    const r = rng(seed); g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    g.fillStyle = grad(g, x, y, x + w, y + h, [[0, mix(base, '#ffffff', .12)], [1, mix(base, '#5a4630', .12)]]); g.fillRect(x, y, w, h);
    g.filter = 'blur(8px)'; for (let i = 0; i < 18; i++) { g.fillStyle = r() < .5 ? 'rgba(150,120,80,.16)' : 'rgba(255,250,235,.18)'; g.beginPath(); g.ellipse(x + r() * w, y + r() * h, 20 + r() * 50, 12 + r() * 30, 0, 0, TAU); g.fill(); }
    g.fillStyle = grad(g, 0, y + h * .6, 0, y + h, [[0, 'rgba(110,90,60,0)'], [1, 'rgba(110,90,60,.35)']]); g.fillRect(x, y + h * .6, w, h * .4); g.filter = 'none';
    grain(g, x, y, w, h, .5, seed + 7, 'overlay', .8);
    for (let i = 0; i < (o.chips ?? 2); i++) { const cx = x + 10 + r() * (w - 60), cy = y + 20 + r() * (h - 60), cw = 30 + r() * 30, ch = 18 + r() * 16;
      g.fillStyle = mix(base, '#7a6a52', .45); g.beginPath(); g.ellipse(cx, cy, cw / 2, ch / 2, 0, 0, TAU); g.fill(); g.strokeStyle = 'rgba(70,55,40,.55)'; g.lineWidth = 1.2;
      for (let k = 0; k < 3; k++) { g.strokeRect(cx - cw / 2 + 4 + (k % 2) * 8, cy - ch / 2 + 3 + k * (ch / 3.2), cw * .4, ch / 3.6); } }
    g.strokeStyle = 'rgba(80,62,44,.5)'; g.lineWidth = 1.2; for (let i = 0; i < (o.cracks ?? 3); i++) { let cx = x + r() * w, cy = y + r() * h * .5; g.beginPath(); g.moveTo(cx, cy); for (let k = 0; k < 6; k++) { cx += (r() - .5) * 16; cy += 6 + r() * 10; g.lineTo(cx, cy); } g.stroke(); }
    g.restore();
  }
  function ivy(g, x, y, len, dir = 1, seed = 2, s = 1) {   // trailing ivy from a corner (dir: +1 hangs right, -1 left)
    const r = rng(seed); let px = x, py = y; g.save(); g.lineCap = 'round';
    for (let i = 0; i < len; i++) { const nx = px + dir * (4 + r() * 6) * s, ny = py + (3 + r() * 8) * s; ln(g, [[px, py], [nx, ny]], 1.6 * s, '#5a5030'); px = nx; py = ny;
      if (i % 1 === 0) for (const sd of [-1, 1]) { const lx = px + sd * 6 * s, ly = py - 2 * s, lr = (4 + r() * 3) * s; g.fillStyle = ['#4f7a34', '#6a9440', '#3d6a2c', '#86ad4e'][Math.floor(r() * 4)]; g.beginPath(); g.moveTo(lx, ly - lr); g.quadraticCurveTo(lx + lr, ly - lr * .2, lx, ly + lr); g.quadraticCurveTo(lx - lr, ly - lr * .2, lx, ly - lr); g.fill(); g.strokeStyle = 'rgba(40,50,20,.5)'; g.lineWidth = .8; g.stroke(); } }
    g.restore();
  }
  // planks with grain: vertical (walls) or horizontal (floors, beds)
  function planks(g, x, y, w, h, o = {}) {
    const r = rng(o.seed || 11), vert = !!o.vertical, size = o.size || (vert ? 64 : 36), base = o.base || '#8a6040', n = Math.ceil((vert ? w : h) / size);
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    for (let i = 0; i < n; i++) { const tone = mix(base, r() < .5 ? '#3a2414' : '#d8a878', r() * .22), px = vert ? x + i * size : x, py = vert ? y : y + i * size, pw = vert ? size : w, ph = vert ? h : size;
      g.fillStyle = vert ? grad(g, px, 0, px + pw, 0, [[0, mix(tone, '#ffffff', .08)], [1, mix(tone, '#000000', .12)]]) : grad(g, 0, py, 0, py + ph, [[0, mix(tone, '#ffffff', .08)], [1, mix(tone, '#000000', .12)]]); g.fillRect(px, py, pw, ph);
      g.strokeStyle = 'rgba(40,22,10,.28)'; g.lineWidth = 1.1;
      for (let k = 0; k < 6; k++) { const off = (k + .5) / 6 * (vert ? pw : ph), wob = r() * 6; g.beginPath(); if (vert) { g.moveTo(px + off, py); for (let yy = py; yy <= py + ph; yy += 30) g.lineTo(px + off + Math.sin(yy * .02 + k + wob) * 2.4, yy); } else { g.moveTo(px, py + off); for (let xx = px; xx <= px + pw; xx += 30) g.lineTo(xx, py + off + Math.sin(xx * .015 + k + wob) * 2); } g.stroke(); }
      for (let k = 0; k < 2; k++) if (r() < .5) { const kx = vert ? px + r() * pw : px + r() * pw, ky = vert ? py + r() * ph : py + r() * ph; g.fillStyle = 'rgba(50,28,12,.5)'; g.beginPath(); g.ellipse(kx, ky, vert ? 3 : 7, vert ? 7 : 3, 0, 0, TAU); g.fill(); g.strokeStyle = 'rgba(50,28,12,.3)'; g.beginPath(); g.ellipse(kx, ky, vert ? 6 : 12, vert ? 12 : 6, 0, 0, TAU); g.stroke(); }
      g.strokeStyle = 'rgba(25,14,8,.75)'; g.lineWidth = 2.4; g.beginPath(); if (vert) { g.moveTo(px, py); g.lineTo(px, py + ph); } else { g.moveTo(px, py); g.lineTo(px + pw, py); } g.stroke();
      g.strokeStyle = 'rgba(255,220,170,.12)'; g.lineWidth = 1.5; g.beginPath(); if (vert) { g.moveTo(px + 3, py); g.lineTo(px + 3, py + ph); } else { g.moveTo(px, py + 3); g.lineTo(px + pw, py + 3); } g.stroke();
      if (!vert && o.joints !== false) for (let xx = px + r() * 200; xx < px + pw; xx += 240 + r() * 200) ln(g, [[xx, py], [xx, py + ph]], 2, 'rgba(25,14,8,.55)'); }
    grain(g, x, y, w, h, .25, (o.seed || 11) + 5, 'overlay', .8); g.restore();
  }
  // soil strata: wavy coloured bands with speckle, pebbles and hair roots
  function strata(g, y0, y1, o = {}) {
    const r = rng(o.seed || 21), cols = o.cols || ['#6e4e34', '#5a3e2a', '#7a5a3c', '#4e3726', '#6a4a30', '#3f2e22', '#5c4430'], n = o.n || cols.length, wav = x => Math.sin(x * .006 + r() * 0) * 6;
    const ys = []; for (let i = 0; i <= n; i++) ys.push(lerp(y0, y1, i / n));
    for (let i = 0; i < n; i++) { const ph = r() * 6, amp = 4 + r() * 6, fy = x => ys[i] + Math.sin(x * .007 + ph) * amp + Math.sin(x * .021 + ph * 2) * amp * .4;
      g.beginPath(); g.moveTo(-PAD, fy(-PAD)); for (let x = -PAD; x <= W + PAD; x += 20) g.lineTo(x, fy(x)); g.lineTo(W + PAD, y1 + 40); g.lineTo(-PAD, y1 + 40); g.closePath();
      g.fillStyle = grad(g, 0, ys[i], 0, ys[i + 1], [[0, mix(cols[i % cols.length], '#ffffff', .06)], [1, mix(cols[i % cols.length], '#000000', .12)]]); g.fill();
      g.strokeStyle = 'rgba(30,18,10,.55)'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(-PAD, fy(-PAD)); for (let x = -PAD; x <= W + PAD; x += 20) g.lineTo(x, fy(x)); g.stroke();
      g.strokeStyle = 'rgba(230,200,160,.12)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-PAD, fy(-PAD) + 4); for (let x = -PAD; x <= W + PAD; x += 20) g.lineTo(x, fy(x) + 4); g.stroke(); }
    grain(g, -PAD, y0, W + PAD * 2, y1 - y0, .45, (o.seed || 21) + 1, 'overlay', .7);
    for (let i = 0; i < (o.speck ?? 1800); i++) { g.fillStyle = r() < .5 ? 'rgba(20,12,6,.35)' : 'rgba(220,190,150,.25)'; g.fillRect(-PAD + r() * (W + PAD * 2), lerp(y0, y1, r()), 1.6, 1.6); }
    pebbles(g, -PAD, y0 + 10, W + PAD * 2, y1 - y0 - 10, o.pebbles ?? 110, (o.seed || 21) + 2, { min: 2, var: 5, cols: ['#8a7e6c', '#6e6456', '#9c907c', '#5e564a'] });
    g.strokeStyle = 'rgba(40,26,14,.6)'; g.lineCap = 'round'; for (let i = 0; i < (o.roots ?? 10); i++) { let x = -PAD + r() * (W + PAD * 2), y = y0 + r() * 30; g.lineWidth = 1.2 + r() * 1.2; g.beginPath(); g.moveTo(x, y); for (let k = 0; k < 8; k++) { x += (r() - .5) * 18; y += 6 + r() * 10; g.lineTo(x, y); } g.stroke(); }
  }
  function pebbles(g, x, y, w, h, n, seed = 1, o = {}) {
    const r = rng(seed); for (let i = 0; i < n; i++) { const px = x + r() * w, py = y + r() * h, rx = (o.min || 3) + r() * (o.var || 7), ry = rx * (.55 + r() * .3), col = (o.cols || ['#a39a8c', '#8d857a', '#b5ad9c', '#7b746a'])[Math.floor(r() * 4)];
      g.fillStyle = 'rgba(20,14,8,.3)'; g.beginPath(); g.ellipse(px + 1.5, py + 2, rx, ry, 0, 0, TAU); g.fill();
      g.fillStyle = grad(g, px - rx, py - ry, px + rx, py + ry, [[0, mix(col, '#ffffff', .3)], [1, mix(col, '#2a2a22', .3)]]); g.beginPath(); g.ellipse(px, py, rx, ry, (r() - .5) * .6, 0, TAU); g.fill(); g.strokeStyle = 'rgba(40,32,24,.7)'; g.lineWidth = 1.1; g.stroke(); }
  }
  // ---------- live elements ----------
  function fire(ctx, x, y, s, t, o = {}) {   // crossed logs, layered tongues of flame, sparks, ground glow
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const gl = ctx.createRadialGradient(0, -40, 10, 0, -40, 260); gl.addColorStop(0, 'rgba(255,170,70,.45)'); gl.addColorStop(1, 'rgba(255,140,50,0)'); ctx.fillStyle = gl; ctx.fillRect(-260, -300, 520, 400); ctx.restore();
    sh(ctx, 'rgba(40,20,10,.35)', 0, c => c.ellipse(0, 6, 120, 18, 0, 0, TAU));
    for (const [a, l] of [[-.35, 120], [.35, 120], [-.05, 110], [Math.PI - .1, 100]]) { ctx.save(); ctx.rotate(a); sh(ctx, '#6a4026', 3, c => c.roundRect(-l / 2, -11, l, 22, 10)); sh(ctx, '#e8c090', 2, c => c.ellipse(l / 2 - 4, 0, 6, 10, 0, 0, TAU)); ctx.strokeStyle = 'rgba(30,15,8,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-l / 2 + 10, -3); ctx.lineTo(l / 2 - 14, -4); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate((i - 2) * 22, 0); ctx.fillStyle = ['#9a3a24', '#c24a28', '#7a2a1a'][i % 3]; ctx.beginPath(); ctx.arc(0, -4, 6, 0, TAU); ctx.fill(); ctx.restore(); }
    const tongue = (dx, hgt, wid, col, ph) => { const sw = Math.sin(t * 9 + ph) * 8 + Math.sin(t * 15 + ph * 2) * 4, hh = hgt * (1 + Math.sin(t * 11 + ph) * .12);
      ctx.beginPath(); ctx.moveTo(dx - wid, -6); ctx.bezierCurveTo(dx - wid * 1.1, -hh * .45, dx + sw * .5 - wid * .3, -hh * .7, dx + sw, -hh); ctx.bezierCurveTo(dx + sw * .4 + wid * .4, -hh * .65, dx + wid * 1.1, -hh * .4, dx + wid, -6); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
    ctx.save(); ctx.globalCompositeOperation = 'source-over';
    [[-30, 130, 30, 0], [10, 170, 36, 1.3], [40, 120, 28, 2.1], [-5, 150, 30, 3]].forEach(([dx, hg, wd, ph]) => tongue(dx, hg, wd, '#e8502a', ph));
    [[-22, 105, 22, .6], [12, 135, 26, 1.9], [34, 95, 20, 2.7]].forEach(([dx, hg, wd, ph]) => tongue(dx, hg, wd, '#f7932e', ph));
    [[-10, 75, 16, 1.1], [14, 92, 16, 2.4]].forEach(([dx, hg, wd, ph]) => tongue(dx, hg, wd, '#ffd25a', ph));
    tongue(4, 48, 10, '#fff2b0', .4); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(31); for (let i = 0; i < 16; i++) { const k = (t * (.5 + r() * .5) + r()) % 1, sx = (r() - .5) * 80 + Math.sin(t * 3 + i) * 20 * k, sy = -60 - k * 260; ctx.fillStyle = `rgba(255,${180 + r() * 60 | 0},90,${(1 - k) * .9})`; ctx.beginPath(); ctx.arc(sx, sy, 2.5 * (1 - k) + 1, 0, TAU); ctx.fill(); } ctx.restore();
    ctx.restore();
  }
  function lantern(ctx, x, y, t, s = 1) {   // hanging iron lantern with a flickering flame and warm halo
    const fl = 1 + Math.sin(t * 11) * .05 + Math.sin(t * 7.1) * .04; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ln(ctx, [[0, -200], [0, -34]], 2.5, '#3a2a20'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 0, 8, 210 * fl, 'rgba(255,180,90,.32)'); ctx.restore();
    sh(ctx, '#3a2a20', 2.5, c => { c.moveTo(-20, -24); c.lineTo(0, -38); c.lineTo(20, -24); c.closePath(); }); ln(ctx, [[0, -46], [0, -38]], 3, '#3a2a20'); sh(ctx, null, 2.5, c => c.arc(0, -50, 5, 0, TAU));
    ctx.fillStyle = grad(ctx, 0, -24, 0, 32, [[0, 'rgba(255,214,140,.85)'], [1, 'rgba(255,170,80,.8)']]); ctx.fillRect(-16, -24, 32, 48);
    sh(ctx, '#ffd25a', 0, c => { c.moveTo(0, 14); c.quadraticCurveTo(8 * fl, 0, 0, -12 * fl); c.quadraticCurveTo(-8, 0, 0, 14); c.closePath(); }); sh(ctx, '#fff4c0', 0, c => c.ellipse(0, 6, 3, 6 * fl, 0, 0, TAU));
    ctx.strokeStyle = '#3a2a20'; ctx.lineWidth = 3; ctx.strokeRect(-16, -24, 32, 48); ln(ctx, [[0, -24], [0, 24]], 2, '#3a2a20'); sh(ctx, '#3a2a20', 2, c => c.rect(-20, 24, 40, 8));
    ctx.restore();
  }
  // bokeh: soft out-of-focus light discs (rooms, lamplight)
  function bokeh(ctx, t, list, seed = 4) { const r = rng(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const [x0, y0, w, h, n, col] of list) for (let i = 0; i < n; i++) { const x = x0 + r() * w + Math.sin(t * .4 + i) * 6, y = y0 + r() * h + Math.cos(t * .3 + i) * 4, rr = 6 + r() * 22, a = .08 + r() * .16 * (0.7 + .3 * Math.sin(t * .8 + i));
      const gr = ctx.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, `rgba(${col},${a})`); gr.addColorStop(.8, `rgba(${col},${a * .7})`); gr.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill(); }
    ctx.restore(); }

  G.Paint2 = { mix, noiseTex, canvasTex, grain, pcloud, clouds2, overcast, haze, mistyHills, meadow, drystone, stream, plaster, ivy, planks, strata, pebbles, fire, lantern, bokeh };
})(window);
// the v2 clouds replace the flat pink ones wherever G.Paint.clouds is used (load paint2.js right after paint.js)
(function (G) { const P2 = G.Paint2; G.Paint.clouds = (ctx, t, pan, list, tone = 'warm') => P2.clouds2(ctx, t, pan, list, tone); })(window);
