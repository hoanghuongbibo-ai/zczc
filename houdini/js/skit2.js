/* SKIT v2 (~27 s) — the user's painted look (their repaint of the skit frames): peach skin, brown hair, warm brown ink,
 * sunset skies with pink clouds, leafy trees, colourful flower bushes, a detailed Colosseum and a big crowd — and it
 * must feel ALIVE: wind-swayed trees/grass/cattails, drifting clouds, birds, sun rays + motes, a bustling crowd,
 * parallax camera moves, mouths that flap on every line, bouncy walks and gestures.
 * Same story as skitdemo.js (Rome AD 80, the "vomitorium" myth). Silent track until the voices arrive. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, CAST = G.Cast, { W, H, clamp, lerp, ease, grad, rng } = T;
  Gd.setTheme('warm');
  const OUT = '#3d2a1f', TAU = Math.PI * 2;
  const sh = (g, fill, lw, fn) => { g.beginPath(); fn(g); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { g.lineWidth = lw; g.strokeStyle = OUT; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); } };
  const ln = (g, pts, w, col = OUT) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = w; g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
  const circ = (x, y, r) => c => c.arc(x, y, r, 0, TAU);
  const PAD = 220, cache = {};
  function layer(key, fn, blur = 0, w = W + PAD * 2, h = H) {
    if (cache[key]) return cache[key];
    const raw = document.createElement('canvas'); raw.width = w; raw.height = h; const r = raw.getContext('2d'); r.translate(PAD, 0); fn(r);
    if (!blur) return (cache[key] = raw);
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.filter = `blur(${blur}px)`; g.drawImage(raw, 0, 0); return (cache[key] = c);
  }
  const put = (ctx, c, pan, depth) => ctx.drawImage(c, -PAD - pan * depth, 0);

  // ================= painter kit (rich) =================
  function sky(g, sun) {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#5f9bd0'], [.32, '#a9c3e2'], [.55, '#f4cfae'], [.72, '#ffcf86'], [1, '#ffb768']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    const r = g.createRadialGradient(sun[0], sun[1], 8, sun[0], sun[1], 520); r.addColorStop(0, 'rgba(255,252,225,1)'); r.addColorStop(.12, 'rgba(255,240,180,.85)'); r.addColorStop(.45, 'rgba(255,205,140,.35)'); r.addColorStop(1, 'rgba(255,190,120,0)');
    g.fillStyle = r; g.fillRect(-PAD, 0, W + PAD * 2, H);
  }
  function rays(ctx, sun, t, a = .16) {   // slowly turning god rays from the sun
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 14; i++) { const ang = i / 14 * TAU + t * .03, w = .07 + (i % 3) * .03;
      const gr = ctx.createRadialGradient(sun[0], sun[1], 0, sun[0], sun[1], 900); gr.addColorStop(0, `rgba(255,240,190,${a})`); gr.addColorStop(1, 'rgba(255,240,190,0)'); ctx.fillStyle = gr;
      ctx.beginPath(); ctx.moveTo(sun[0], sun[1]); ctx.arc(sun[0], sun[1], 900, ang - w, ang + w); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  }
  const cloudCanvas = (seed, w) => layer('cloud' + seed + w, g => {
    g.translate(-PAD, 0); const r = rng(seed), B = []; for (let i = 0; i < 9; i++) B.push([60 + i * (w - 120) / 8 + (r() - .5) * 20, 90 - Math.sin(i / 8 * Math.PI) * (30 + r() * 25), 30 + Math.sin(i / 8 * Math.PI) * 26 + r() * 10]);
    for (const [x, y, rr] of B) sh(g, null, 5, circ(x, y, rr)); g.globalAlpha = 1;
    g.save(); g.globalCompositeOperation = 'source-over'; for (const [x, y, rr] of B) sh(g, '#c98cb2', 0, circ(x, y + 6, rr)); for (const [x, y, rr] of B) sh(g, '#f3bfcd', 0, circ(x - 4, y - 6, rr * .86)); for (const [x, y, rr] of B) sh(g, '#ffe6d8', 0, circ(x - 10, y - 14, rr * .45)); g.restore();
    g.fillStyle = '#b97ea6'; g.fillRect(40, 108, w - 80, 14);
  }, 0, w, 160);
  function clouds(ctx, t, pan, list) { for (const [x, y, s, seed, sp] of list) { const c = cloudCanvas(seed, 360); ctx.save(); ctx.globalAlpha = .96; ctx.drawImage(c, x + t * sp - pan * .08, y, 360 * s, 160 * s); ctx.restore(); } }
  function hills(g, base, pts, top, bot, lw = 2.5, hiCol) {   // smooth ridgeline with vertical gradient + lit ridge
    const sil = c => { c.moveTo(pts[0][0], base); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(pts[pts.length - 1][0], base); c.closePath(); };
    const ymin = Math.min(...pts.map(p => p[1]));
    g.fillStyle = grad(g, 0, ymin, 0, base, [[0, top], [1, bot]]); g.beginPath(); sil(g); g.fill();
    if (hiCol) { g.save(); g.beginPath(); sil(g); g.clip(); g.strokeStyle = hiCol; g.lineWidth = 10; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0] - 6, p[1] + 7) : g.moveTo(p[0] - 6, p[1] + 7)); g.stroke(); g.restore(); }
    g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = lw; g.strokeStyle = OUT; g.stroke();
  }
  const smoothPts = (x0, x1, base, amp, seed, n = 12) => { const r = rng(seed), P = []; for (let i = 0; i <= n; i++) P.push([lerp(x0, x1, i / n), base - amp * (.4 + .6 * Math.abs(Math.sin(i * .9 + r() * 2))) ]); return P; };
  function leafMass(g, cx, cy, rx, ry, seed, tones = ['#365f2a', '#4f8034', '#78a845', '#a8cc5c']) {   // a tree crown / bush: layered leaf clumps
    const r = rng(seed), C = []; for (let i = 0; i < 46; i++) { const a = r() * TAU, d = Math.sqrt(r()); C.push([cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, (rx + ry) * (.11 + r() * .07)]); }
    for (const [x, y, rr] of C) { g.beginPath(); g.arc(x, y, rr, 0, TAU); g.lineWidth = 7; g.strokeStyle = OUT; g.stroke(); }
    tones.forEach((col, k) => { g.fillStyle = col; for (const [x, y, rr] of C) { const dy = (y - cy) / ry, dx = (x - cx) / rx; if (k === 0 || dy - dx * .4 < .9 - k * .55) { g.beginPath(); g.arc(x - k * rr * .14, y - k * rr * .16, rr * (1 - k * .18), 0, TAU); g.fill(); } } });
    g.strokeStyle = 'rgba(40,60,20,.55)'; g.lineWidth = 2; for (let i = 0; i < 40; i++) { const [x, y, rr] = C[i]; g.beginPath(); g.arc(x, y + rr * .2, rr * .55, .3, 1.3); g.stroke(); }
  }
  const treeCanvas = (seed, s = 1) => layer('tree' + seed + s, g => {
    g.translate(-PAD, 0); const bx = 260, by = 640;
    g.save(); g.scale(s, s); g.translate((1 - s) * bx / s, (1 - s) * by / s);
    sh(g, '#7a4f33', 5, c => { c.moveTo(bx - 26, by); c.quadraticCurveTo(bx - 14, by - 160, bx - 30, by - 300); c.lineTo(bx + 4, by - 300); c.quadraticCurveTo(bx + 16, by - 150, bx + 28, by); c.closePath(); });
    for (const [a, b] of [[[bx - 20, by - 250], [bx - 110, by - 330]], [[bx, by - 270], [bx + 100, by - 350]]]) { ln(g, [a, b], 22); ln(g, [a, b], 13, '#7a4f33'); }
    for (let i = 0; i < 5; i++) ln(g, [[bx - 14 + i * 7, by - 20], [bx - 18 + i * 8, by - 230]], 2, 'rgba(50,25,10,.4)');
    leafMass(g, bx, by - 380, 210, 150, seed);
    g.restore();
  }, 0, 520 + PAD * 2, H);
  function tree(ctx, x, y, t, seed, s = 1, pan = 0, depth = 1) {   // sways in the wind around its base
    const c = treeCanvas(seed, s), sw = Math.sin(t * 1.1 + seed) * .012 + Math.sin(t * 2.3 + seed) * .005;
    ctx.save(); ctx.translate(x - pan * depth, y); ctx.transform(1, 0, sw, 1, 0, 0); ctx.drawImage(c, -PAD - 260, -640); ctx.restore();
  }
  const FLOWERS = ['#f27ca0', '#f6a04d', '#a77bd8', '#f7d64a', '#fff6ea', '#e85d5d'];
  const bushCanvas = (seed, w, h) => layer('bush' + seed + w, g => {
    g.translate(-PAD, 0); const cx = w / 2 + 20, cy = h + 20;
    leafMass(g, cx, cy - h * .45, w * .46, h * .5, seed, ['#2f5a2a', '#477c34', '#6ea447', '#9cc95a']);
    const r = rng(seed + 9); for (let i = 0; i < 26; i++) { const a = Math.PI + r() * Math.PI, d = Math.sqrt(r()), fx = cx + Math.cos(a) * w * .42 * d, fy = cy - h * .45 + Math.sin(a) * h * .48 * d, col = FLOWERS[Math.floor(r() * FLOWERS.length)], fr = 5 + r() * 4;
      g.fillStyle = OUT; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(fx + Math.cos(k / 5 * TAU) * fr, fy + Math.sin(k / 5 * TAU) * fr, fr * .85, 0, TAU); g.fill(); }
      g.fillStyle = col; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(fx + Math.cos(k / 5 * TAU) * fr, fy + Math.sin(k / 5 * TAU) * fr, fr * .62, 0, TAU); g.fill(); } g.fillStyle = '#f6c13a'; g.beginPath(); g.arc(fx, fy, fr * .45, 0, TAU); g.fill(); }
  }, 0, w + 40 + PAD * 2, h + 40);
  function bush(ctx, x, y, w, h, t, seed, pan = 0, depth = 1, blur = 0) {
    const c = bushCanvas(seed, w, h), sw = Math.sin(t * 1.6 + seed) * .02;
    ctx.save(); if (blur) ctx.filter = `blur(${blur}px)`; ctx.translate(x - pan * depth, y); ctx.transform(1, 0, sw, 1, 0, 0); ctx.drawImage(c, -PAD - w / 2 - 20, -h - 40); ctx.restore();
  }
  function blades(ctx, x, y, n, h, t, seed, pan = 0, depth = 1, cattails = 0) {   // grass + cattails swaying, drawn live
    const r = rng(seed); ctx.save(); ctx.translate(-pan * depth, 0);
    for (let i = 0; i < n; i++) { const bx = x + (r() - .5) * n * 10, hh = h * (.55 + r() * .55), lean = (r() - .5) * .8 + Math.sin(t * 1.8 + bx * .02) * .14, col = ['#2f5a2a', '#4f8034', '#6f9f40'][i % 3];
      ctx.beginPath(); ctx.moveTo(bx - 6, y); ctx.quadraticCurveTo(bx + lean * hh * .3, y - hh * .6, bx + lean * hh * .7, y - hh); ctx.quadraticCurveTo(bx + lean * hh * .25 + 5, y - hh * .5, bx + 6, y); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = OUT; ctx.stroke(); }
    for (let i = 0; i < cattails; i++) { const bx = x + (r() - .5) * n * 9, hh = h * (1.3 + r() * .5), sw = Math.sin(t * 1.5 + i) * 12, top = [bx + sw, y - hh];
      ln(ctx, [[bx, y], [bx + sw * .4, y - hh * .5], top], 6); ln(ctx, [[bx, y], [bx + sw * .4, y - hh * .5], top], 3, '#5f7a3a');
      ctx.save(); ctx.translate(top[0], top[1] + 24); ctx.rotate(sw * .012); sh(ctx, '#7a4a2a', 3.5, c => c.roundRect(-9, -30, 18, 60, 9)); ctx.fillStyle = 'rgba(255,220,180,.35)'; ctx.fillRect(-5, -24, 4, 46); ln(ctx, [[0, -30], [0, -46]], 3); ctx.restore(); }
    ctx.restore();
  }
  function birds(ctx, t, list) { for (const [x0, y0, sp, ph] of list) { const x = ((x0 + t * sp) % (W + 300)) - 150, y = y0 + Math.sin(t * .8 + ph) * 14, f = Math.sin(t * 9 + ph) * 8;
    ctx.beginPath(); ctx.moveTo(x - 14, y - f); ctx.quadraticCurveTo(x - 6, y - 4 - f * .3, x, y); ctx.quadraticCurveTo(x + 6, y - 4 - f * .3, x + 14, y - f); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(70,40,40,.8)'; ctx.stroke(); } }
  function motes(ctx, t, n0 = 40, seed = 3, box = [0, 0, W, H]) { const r = rng(seed), n = Math.round(n0 * .6); ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < n; i++) { const x = box[0] + ((r() * box[2] + t * (8 + r() * 14)) % box[2]), y = box[1] + ((r() * box[3] - t * (5 + r() * 9) + box[3] * 10) % box[3]), a = .12 + .3 * Math.abs(Math.sin(t * (.7 + r()) + i));
      const gr = ctx.createRadialGradient(x, y, 0, x, y, 6); gr.addColorStop(0, `rgba(255,226,160,${a})`); gr.addColorStop(1, 'rgba(255,226,160,0)'); ctx.fillStyle = gr; ctx.fillRect(x - 6, y - 6, 12, 12); }
    ctx.restore(); }

  // ================= sets =================
  const SUN1 = [650, 400];
  const terraceFar = layer('t-far', g => {
    sky(g, SUN1);
    hills(g, 520, smoothPts(-PAD, W + PAD, 440, 150, 3, 10), '#e9b58c', '#f3c99c', 2, 'rgba(255,230,190,.6)');
    hills(g, 520, smoothPts(-PAD, W + PAD, 470, 110, 8, 9), '#c98f5f', '#e3ae7c', 2.5, 'rgba(255,215,160,.6)');
    hills(g, 540, smoothPts(-PAD, W + PAD, 495, 70, 12, 14), '#7f9a4e', '#a8b862', 3, 'rgba(230,240,150,.5)');
    for (const x of [180, 230, 960, 1000, 1040]) { sh(g, '#3f6b2e', 2.5, c => c.ellipse(x, 455, 13, 48, 0, 0, TAU)); sh(g, '#5f8f3a', 0, c => c.ellipse(x - 4, 450, 7, 38, 0, 0, TAU)); }
  });
  const terraceMid = layer('t-mid', g => {
    // stone floor with perspective tiles + balustrade
    g.fillStyle = grad(g, 0, 540, 0, H, [[0, '#f0d9b8'], [1, '#c9a585']]); g.fillRect(-PAD, 540, W + PAD * 2, 200);
    for (let i = 1; i < 8; i++) { const y = 540 + Math.pow(i / 7, 1.7) * 190; ln(g, [[-PAD, y], [W + PAD, y]], 2, 'rgba(120,80,50,.3)'); }
    for (let k = -12; k <= 12; k++) ln(g, [[640 + k * 60, 540], [640 + k * 200, 740]], 2, 'rgba(120,80,50,.25)');
    const pool = g.createRadialGradient(650, 600, 10, 650, 600, 420); pool.addColorStop(0, 'rgba(255,240,200,.55)'); pool.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = pool; g.fillRect(-PAD, 540, W + PAD * 2, 200);
    sh(g, '#eedcbc', 4, c => c.rect(-PAD, 470, W + PAD * 2, 24)); g.fillStyle = 'rgba(255,250,235,.7)'; g.fillRect(-PAD, 473, W + PAD * 2, 6);
    for (let x = -PAD + 20; x < W + PAD; x += 40) { sh(g, '#e6cfac', 3, c => { c.moveTo(x - 9, 494); c.bezierCurveTo(x - 22, 505, x - 6, 520, x - 12, 530); c.lineTo(x + 12, 530); c.bezierCurveTo(x + 6, 520, x + 22, 505, x + 9, 494); c.closePath(); }); g.fillStyle = 'rgba(150,100,60,.25)'; g.fillRect(x + 2, 496, 7, 34); }
    sh(g, '#dcc29e', 4, c => c.rect(-PAD, 528, W + PAD * 2, 16));
  });
  function terrace(ctx, t, pan, opts = {}) {
    put(ctx, terraceFar, pan, .12); rays(ctx, [SUN1[0] - pan * .12, SUN1[1]], t);
    clouds(ctx, t, pan, [[-60, 70, 1.1, 1, 5], [520, 30, .8, 2, 3], [900, 120, .9, 3, 4], [220, 170, .55, 4, 6]]);
    birds(ctx, t, [[100, 150, 40, 0], [140, 170, 40, 1.4], [700, 110, 32, 2.2]]);
    put(ctx, terraceMid, pan, .6);
    tree(ctx, 120, 560, t, 11, 1, pan, .6); tree(ctx, 1170, 560, t, 17, 1.05, pan, .6);
    bush(ctx, 60, 560, 300, 140, t, 21, pan, .6); bush(ctx, 1230, 570, 280, 130, t, 22, pan, .6);
  }
  const SUN2 = [900, -40];
  const colonnadeBack = layer('c-back', g => {
    g.fillStyle = grad(g, 0, 0, 0, 600, [[0, '#cfae8f'], [1, '#e2c4a2']]); g.fillRect(-PAD, 0, W + PAD * 2, 600);
    const r = rng(41); for (let y = 0, row = 0; y < 560; y += 58, row++) for (let x = -PAD + (row % 2) * 70; x < W + PAD; x += 140) { g.fillStyle = `rgba(${150 + r() * 40},${110 + r() * 30},${80 + r() * 20},${.18 + r() * .12})`; g.fillRect(x + 3, y + 3, 134, 52); g.strokeStyle = 'rgba(110,70,45,.45)'; g.lineWidth = 3; g.strokeRect(x + 2, y + 2, 136, 54); }
    // door: molded frame, dark interior, doors ajar
    sh(g, '#b89474', 5, c => c.rect(450, 70, 380, 450)); sh(g, '#d9bb98', 4, c => c.rect(470, 90, 340, 430)); sh(g, '#2c1d16', 4, c => c.rect(500, 120, 280, 400));
    g.fillStyle = grad(g, 0, 120, 0, 520, [[0, 'rgba(0,0,0,.4)'], [1, 'rgba(255,200,140,.15)']]); g.fillRect(500, 120, 280, 400);
    sh(g, '#6b4630', 4, c => { c.moveTo(500, 120); c.lineTo(560, 140); c.lineTo(560, 500); c.lineTo(500, 520); c.closePath(); }); sh(g, '#6b4630', 4, c => { c.moveTo(780, 120); c.lineTo(728, 140); c.lineTo(728, 500); c.lineTo(780, 520); c.closePath(); });
    for (const x of [300, 980]) { // fluted columns
      sh(g, '#e9d2b0', 5, c => c.rect(x - 60, 40, 120, 470)); g.save(); g.beginPath(); g.rect(x - 60, 40, 120, 470); g.clip(); g.fillStyle = grad(g, x - 60, 0, x + 60, 0, [[0, 'rgba(255,248,230,.85)'], [.4, 'rgba(255,240,210,0)'], [1, 'rgba(120,70,40,.5)']]); g.fillRect(x - 60, 40, 120, 470);
      for (let i = 1; i < 7; i++) ln(g, [[x - 60 + i * 17, 46], [x - 60 + i * 17, 504]], 3, 'rgba(120,80,50,.35)'); g.restore();
      sh(g, '#dfc29f', 5, c => c.rect(x - 78, 0, 156, 44)); sh(g, '#dfc29f', 5, c => c.rect(x - 80, 500, 160, 34)); }
    for (let s = 0; s < 3; s++) sh(g, s % 2 ? '#d8bd9a' : '#e4caa6', 4, c => c.rect(380 - s * 30, 520 + s * 16, 520 + s * 60, 18));
    g.fillStyle = grad(g, 0, 568, 0, H, [[0, '#d2b190'], [1, '#a98868']]); g.fillRect(-PAD, 568, W + PAD * 2, 160);
    for (let i = 0; i < 5; i++) ln(g, [[-PAD, 590 + i * i * 6], [W + PAD, 590 + i * i * 6]], 2, 'rgba(110,70,45,.25)');
  });
  function beam(ctx, pts, a) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.filter = 'blur(10px)'; ctx.fillStyle = `rgba(255,225,160,${a})`; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function colonnade(ctx, t, pan, blur = 0) {
    ctx.save(); if (blur) ctx.filter = `blur(${blur}px)`; put(ctx, colonnadeBack, pan, .7); ctx.restore();
    beam(ctx, [[-100 - pan * .7, 0], [260 - pan * .7, 0], [700, 740], [260, 740]], .22 + Math.sin(t * .7) * .03);
    beam(ctx, [[760 - pan * .7, 0], [920 - pan * .7, 0], [1240, 740], [960, 740]], .16);
    motes(ctx, t, 30, 8, [0, 0, 760, 720]);
  }
  const arenaBack = layer('a-back', g => {
    sky(g, [1080, 330]);
    const top = x => 108 + Math.pow((x - 640) / 760, 2) * 150, Y = (x, k) => lerp(top(x), 560, k);
    const wall = c => { c.moveTo(-PAD, top(-PAD)); for (let x = -PAD; x <= W + PAD; x += 16) c.lineTo(x, top(x)); c.lineTo(W + PAD, 560); c.lineTo(-PAD, 560); c.closePath(); };
    g.beginPath(); wall(g); g.fillStyle = grad(g, -PAD, 0, W + PAD, 0, [[0, '#d9b083'], [.55, '#e9c79a'], [1, '#c39368']]); g.fill();
    g.save(); g.beginPath(); wall(g); g.clip();
    const tiers = [[.0, .1], [.12, .38], [.4, .66], [.68, .96]];
    tiers.forEach(([a, b], ti) => {
      for (let x = -PAD - 40; x < W + PAD; x += 86) { const w = 50 * (1 - Math.abs(x - 640) / 1700), y0 = Y(x, a), y1 = Y(x, b);
        if (ti === 0) { g.fillStyle = 'rgba(120,80,50,.35)'; g.fillRect(x - 10, y0 + 6, 20, (y1 - y0) * .6); continue; }
        sh(g, '#5a3a28', 3, c => { c.moveTo(x - w / 2, y1); c.lineTo(x - w / 2, y0 + w * .55); c.arc(x, y0 + w * .55, w / 2, Math.PI, 0); c.lineTo(x + w / 2, y1); c.closePath(); });
        g.fillStyle = 'rgba(255,190,120,.18)'; g.fillRect(x + w * .1, y0 + w * .55, w * .38, y1 - y0 - w * .55);
        sh(g, '#f0d3a8', 2.5, c => c.rect(x + 43 - 7, y0 + 4, 14, y1 - y0 - 4)); g.fillStyle = 'rgba(255,250,235,.5)'; g.fillRect(x + 37, y0 + 4, 4, y1 - y0 - 4);
        sh(g, '#e4c193', 2, c => { c.moveTo(x - 5, y0 + 2); c.lineTo(x + 5, y0 + 2); c.lineTo(x + 3, y0 + 12); c.lineTo(x - 3, y0 + 12); c.closePath(); }); }
      g.beginPath(); for (let x = -PAD; x <= W + PAD; x += 16) g.lineTo(x, Y(x, b) + 4); g.lineWidth = 10; g.strokeStyle = '#e9cba0'; g.stroke(); g.lineWidth = 2.5; g.strokeStyle = OUT; g.stroke();
    });
    const r = rng(77); for (let i = 0; i < 400; i++) { g.fillStyle = `rgba(120,80,50,${.06 + r() * .08})`; g.fillRect(-PAD + r() * (W + PAD * 2), r() * 560, 10 + r() * 30, 4 + r() * 6); }
    g.restore(); g.beginPath(); for (let x = -PAD; x <= W + PAD; x += 16) g.lineTo(x, top(x)); g.lineWidth = 5; g.strokeStyle = OUT; g.stroke();
    g.fillStyle = grad(g, 0, 556, 0, H, [[0, '#e6c79a'], [1, '#c79f72']]); g.fillRect(-PAD, 556, W + PAD * 2, 170); ln(g, [[-PAD, 558], [W + PAD, 558]], 4);
  });
  // a lively crowd: people stream out of the ground arches and mill about (sorted by depth)
  const SKINS = ['#fcd8bd', '#f2c09a', '#d9a077', '#b97d58', '#8c5a3c'], HAIRS = ['#3d2416', '#1f1712', '#6b4226', '#b98a4e', '#8a8a8a'], CLOTH = ['#3c5a86', '#b2342f', '#6f7a52', '#c99a3c', '#efe6d2', '#8a4f9a', '#d97a3a'];
  function crowd(ctx, t, pan) {
    const r = rng(5), P = [];
    for (let i = 0; i < 230; i++) { const gate = -PAD + 3 + Math.floor(r() * 18) * 86, sp = .05 + r() * .06, ph = r(), u = (t * sp + ph) % 1, ang = (r() - .5) * 2.2, d = u * 240;
      P.push({ x: gate + Math.sin(ang) * d * 1.4 + (r() - .5) * 40, y: 572 + d * .62 + r() * 16, s: .55 + (u * .62), skin: SKINS[Math.floor(r() * 5)], hair: HAIRS[Math.floor(r() * 5)], cl: CLOTH[Math.floor(r() * 7)], ph: r() * 6, wave: r() < .08 }); }
    P.sort((a, b) => a.y - b.y);
    ctx.save(); ctx.translate(-pan * .9, 0);
    for (const p of P) { const bob = Math.abs(Math.sin(t * 6 + p.ph)) * 3; ctx.save(); ctx.translate(p.x, p.y - bob); ctx.scale(p.s, p.s);
      sh(ctx, p.cl, 2.5, c => { c.moveTo(-11, 0); c.quadraticCurveTo(-13, -26, 0, -30); c.quadraticCurveTo(13, -26, 11, 0); c.closePath(); });
      sh(ctx, p.skin, 2.5, circ(0, -40, 10)); sh(ctx, p.hair, 0, c => c.arc(0, -43, 10, Math.PI * 1.05, Math.PI * 1.95));
      if (p.wave) { const a = Math.sin(t * 8 + p.ph) * .5; ln(ctx, [[8, -24], [16 + a * 6, -46]], 4); }
      ctx.restore(); }
    ctx.restore();
  }

  // ================= subtitles + talking =================
  const NAMES = { Theo: '#d8433a', Marcus: '#6b3a8e' };
  function sub(ctx, who, text, lt, t0, t1) {
    if (lt < t0 || lt > t1) return;
    const k = clamp((lt - t0) / .18), out = clamp((t1 - lt) / .15), n = Math.min(text.length, Math.floor((lt - t0) * 45) + 1);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = Math.min(k, out);
    ctx.font = '600 27px Fredoka, sans-serif'; const w = ctx.measureText(text).width + 48, x = W / 2 - w / 2, y = H - 92 + (1 - ease.out(k)) * 14;
    ctx.fillStyle = 'rgba(40,20,10,.3)'; ctx.fillRect(x + 5, y + 6, w, 48);
    sh(ctx, '#f8efdc', 3.5, c => c.roundRect(x, y, w, 48, 7)); ctx.fillStyle = OUT; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text.slice(0, n), x + 24, y + 26);
    ctx.font = '700 20px Fredoka, sans-serif'; const nw = ctx.measureText(who).width + 26; sh(ctx, NAMES[who], 3, c => c.roundRect(x + 14, y - 22, nw, 30, 15)); ctx.fillStyle = '#fff'; ctx.fillText(who, x + 27, y - 6);
    ctx.restore();
  }
  // mouth flaps while the line types on (syllable-like rhythm, deterministic), then rests
  const talking = (lt, t0, text) => { const t1 = t0 + text.length / 45 + .25; if (lt < t0 || lt > t1) return 0; const u = lt - t0; return clamp(.55 + .45 * Math.sin(u * 17) * Math.sin(u * 5.3 + 1)) * clamp((t1 - lt) / .15); };
  const fig = (ctx, x, y, s, o, blur = 0) => { ctx.save(); if (blur) ctx.filter = `blur(${blur}px)`; Gd.draw(ctx, x, y, s, o); ctx.restore(); };
  const SUN = { x: .5, y: -.8, rim: '#ffe2a8', rimA: .75, shade: '#5a2a3a', shadeA: .3, cast: .2 };
  const theo = o => Object.assign({ outfit: 'roman', light: SUN }, o), marcus = o => Object.assign({}, CAST.marcus, { light: SUN }, o);
  const L = {
    s1: 'Ah, Rome! Now… where is the famous vomitorium?', s2a: 'The what?', s2b: 'You know… the room where you throw up so you can keep feasting?',
    s3: '…It’s a hallway.', s5: 'See? It spews out people. Not lunch.', s6: '…I knew that.', s7: 'Mm-hm.' };

  // ================= shots =================
  function s1(ctx, lt, dur, t) {   // wide terrace at sunset: Theo bounces in, hops to a stop, looks around, talks
    const pan = lerp(-60, 40, ease.sine(clamp(lt / dur)));
    ctx.save(); T.cam(ctx, lerp(1.0, 1.05, ease.sine(lt / dur)), 640, 360);
    terrace(ctx, t, pan);
    const k = clamp(lt / 2.0), x = lerp(-60, 600, ease.out(k)) - pan * .9, walking = k < .98, hop = walking ? Math.abs(Math.sin(lt * 7.5)) * 10 : FX.dropBounce(lt - 2.0, 26, .3);
    const tk = talking(lt, 2.6, L.s1);
    const turn = walking ? .8 : lt < 2.4 ? lerp(.8, -.5, ease.inOut(clamp((lt - 2.0) / .35))) : lerp(-.5, .15, ease.inOut(clamp((lt - 2.9) / .4)));
    fig(ctx, x, 662 - hop, .82, theo({ t, walk: walking ? lt * 7.5 : null, turn, talk: tk, pose: Gd.pose(lt, [[0, 'idle'], [2.1, 'hips'], [3.3, 'presentBoth']]), hair: Gd.hairRing(lt - 2.05, .5),
      face: lt < 2.1 ? { mouth: 'smile', look: [.6, 0] } : lt < 2.9 ? { mouth: 'o', brows: 'up', eyes: 'wide', look: [-.8, -.2] } : { mouth: 'grin', brows: 'up', eyes: lt > 3.3 ? 'happy' : 'open', look: [.3, -.1] } }));
    bush(ctx, 30, 760, 420, 210, t, 31, pan, 1.4, 4); bush(ctx, 1260, 770, 380, 190, t, 32, pan, 1.4, 4);
    blades(ctx, 1080, 735, 14, 90, t, 7, pan, 1.4, 3);
    motes(ctx, t, 36, 4);
    ctx.restore(); FX.dateTag(ctx, 'ROME · AD 80');
    sub(ctx, 'Theo', L.s1, lt, 2.6, 4.95);
  }
  function s2(ctx, lt, dur, t) {   // colonnade two-shot: Marcus turns slowly; Theo explains, a little too excited
    const pan = lerp(30, -20, ease.sine(clamp(lt / dur)));
    ctx.save(); T.cam(ctx, lerp(1.0, 1.04, ease.sine(lt / dur)), 640, 360);
    colonnade(ctx, t, pan);
    const mt = lt < .8 ? null : lerp(-1, -.5, ease.inOut(clamp((lt - .8) / 1.3)));
    fig(ctx, 880 - pan * .9, 668, .78, marcus({ t, back: mt === null, turn: mt ?? 0, talk: talking(lt, 1.6, L.s2a), pose: 'idle', face: { eyes: 'half', mouth: 'flat', look: [-.6, 0] }, headTilt: lt > 1.6 && lt < 2.4 ? -.05 : 0 }));
    const bounce = lt > 2.6 ? Math.abs(Math.sin((lt - 2.6) * 5)) * 6 * clamp((4.6 - lt)) : 0;
    fig(ctx, 410 - pan * .9, 668 - bounce, .74, theo({ t, turn: .5, talk: talking(lt, 2.6, L.s2b), pose: Gd.pose(lt, [[0, 'idle'], [2.6, 'present'], [3.6, 'presentBoth']]), hair: Gd.hairRing(lt - 2.6, .35),
      face: lt < 2.6 ? { mouth: 'smile', brows: 'up' } : { mouth: 'grin', brows: 'up', eyes: lt > 3.6 ? 'happy' : 'open' } }));
    blades(ctx, 70, 740, 20, 120, t, 3, pan, 1.5, 4); blades(ctx, 1220, 740, 20, 120, t, 4, pan, 1.5, 4);
    bush(ctx, 120, 790, 300, 140, t, 33, pan, 1.5, 5);
    ctx.restore();
    sub(ctx, 'Marcus', L.s2a, lt, 1.6, 2.5); sub(ctx, 'Theo', L.s2b, lt, 2.6, 4.75);
  }
  function s3(ctx, lt, dur, t) {   // over the shoulder: blurred Theo in front, Marcus deadpan … long beat … one blink
    ctx.save(); T.cam(ctx, lerp(1.06, 1.12, lt / dur), 640, 380);
    colonnade(ctx, t, 0, 3);
    fig(ctx, 840, 800, 1.1, marcus({ t, turn: -.45, talk: talking(lt, 2.0, L.s3), pose: 'idle', noBlink: true, face: { eyes: (lt > 1.35 && lt < 1.6) ? 'closed' : 'half', mouth: 'flat', look: [-.5, 0] } }));
    fig(ctx, 250, 1270, 1.9, theo({ t, back: true, pose: 'idle', hair: Math.sin(t * 2) * .05, light: Object.assign({}, SUN, { cast: 0 }) }), 9);
    ctx.restore();
    sub(ctx, 'Marcus', L.s3, lt, 2.0, 3.35);
  }
  function s4(ctx, lt, dur, t) {   // the MYTH CARD on a warm desk, sunlight through a window, dust in the beam
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#7a4e33'], [1, '#4f3121']]); ctx.fillRect(0, 0, W, H);
    const r = rng(21); for (let i = 0; i < 46; i++) { const y = r() * H; ctx.strokeStyle = 'rgba(40,18,8,.25)'; ctx.lineWidth = 2 + r() * 3; ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(400, y + (r() - .5) * 40, 900, y + (r() - .5) * 40, W, y + (r() - .5) * 20); ctx.stroke(); }
    beam(ctx, [[180, 0], [560, 0], [980, 720], [420, 720]], .2); motes(ctx, t, 40, 9, [150, 0, 800, 720]);
    const k = FX.settle(clamp(lt / .5)), cx = 560, cy = 340 + (1 - k) * 420;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.025 * k);
    ctx.fillStyle = 'rgba(30,12,4,.45)'; ctx.fillRect(-390, -220, 800, 460);
    sh(ctx, '#f7eedb', 4, c => c.roundRect(-400, -230, 800, 460, 8));
    ctx.fillStyle = '#d8433a'; ctx.font = '46px "Luckiest Guy"'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('MYTH', -370, -180);
    ctx.fillStyle = OUT; ctx.font = '700 28px Fredoka'; ctx.fillText('Romans had “vomit rooms” for feasts', -240, -178); ln(ctx, [[-370, -148], [370, -148]], 2.5, 'rgba(60,30,10,.25)');
    ctx.save(); ctx.translate(-210, 40);
    sh(ctx, '#e3c79e', 3.5, c => { c.moveTo(-170, 120); c.lineTo(-170, 100); for (let i = 0; i < 6; i++) { c.lineTo(-170 + i * 50, 100 - i * 30); c.lineTo(-120 + i * 50, 100 - i * 30); } c.lineTo(150, -90); c.lineTo(150, 120); c.closePath(); });
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) { const px = -160 + i * 50 + j * 15, py = 92 - i * 30; sh(ctx, CLOTH[(i + j) % 7], 2, c => c.ellipse(px, py - 6, 5, 7, 0, 0, TAU)); sh(ctx, SKINS[(i * 3 + j) % 5], 2, circ(px, py - 17, 5)); }
    sh(ctx, '#4a2e22', 3.5, c => { c.moveTo(-60, 120); c.lineTo(-60, 70); c.quadraticCurveTo(0, 30, 60, 70); c.lineTo(60, 120); c.closePath(); }); ln(ctx, [[-180, 120], [170, 120]], 4);
    const flow = clamp((lt - .9) / 1.6);
    ctx.save(); ctx.setLineDash([12, 10]); ctx.lineDashOffset = -lt * 40; ln(ctx, [[-150, 60], [-20, 96], [130, 100], [200, 100]], 5, '#d8433a'); ctx.restore();
    sh(ctx, '#d8433a', 3, c => { c.moveTo(200, 86); c.lineTo(226, 100); c.lineTo(200, 114); c.closePath(); });
    for (let i = 0; i < 9; i++) { const u = ((lt * .45 + i / 9) % 1); if (u > flow) continue; const px = lerp(-150, 200, u), py = u < .37 ? lerp(60, 96, u / .37) : lerp(96, 100, (u - .37) / .63), b = Math.abs(Math.sin(lt * 10 + i)) * 3;
      sh(ctx, CLOTH[i % 7], 2.5, c => c.ellipse(px, py + 6 - b, 8, 11, 0, 0, TAU)); sh(ctx, SKINS[i % 5], 2.5, circ(px, py - 10 - b, 7)); }
    ctx.fillStyle = OUT; ctx.font = '700 18px Fredoka'; ctx.textAlign = 'center'; ctx.fillText('vomitorium', 0, 150);
    ctx.restore();
    [['VOMITORIUM =', '700 26px Fredoka', 1.4], ['a passage that lets the crowd', '600 24px Fredoka', 1.7], ['“spew out” of the amphitheatre', '600 24px Fredoka', 1.9], ['Latin vomere: “to spew forth”', '600 22px Fredoka', 2.3], ['Not a room for throwing up!', '700 24px Fredoka', 2.7]]
      .forEach(([s, f, at], i) => { const a = clamp((lt - at) / .3); if (a <= 0) return; ctx.globalAlpha = a; ctx.font = f; ctx.fillStyle = i === 4 ? '#b2342f' : OUT; ctx.textAlign = 'left'; ctx.fillText(s, 20, -96 + i * 44 + (1 - a) * 8); ctx.globalAlpha = 1; });
    FX.stamp(ctx, 'BUSTED', 250, 150, lt - 3.2, { color: '#c8322a', size: 46, rot: -.16 });
    ctx.restore();
    const hop = lt > 3.3 ? FX.dropBounce(lt - 3.3 - .01, 0, .3) + Math.max(0, Math.sin((lt - 3.3) * 8) * 18 * Math.exp(-(lt - 3.3) * 3)) : 0;
    fig(ctx, 1110, 690 - hop, .64, theo({ t, turn: -.4, talk: lt > .9 && lt < 3.1 ? clamp(.5 + .5 * Math.sin(lt * 15) * Math.sin(lt * 4.7)) : 0, pose: Gd.pose(lt, [[0, 'idle'], [.8, 'pointSideL'], [3.3, 'cheer']]), hair: Gd.hairRing(lt - 3.3, .5),
      face: lt < 3.3 ? { mouth: 'open', brows: 'up', look: [-.7, 0] } : { mouth: 'grin', eyes: 'happy', brows: 'up' }, light: { x: -.6, y: -.8, rim: '#ffe2a8', cast: 0 } }));
    FX.caption(ctx, 'MYTH CARD', lt, .4, W - 40, 30);
  }
  function s5(ctx, lt, dur, t) {   // the Colosseum: crowd pours out; Marcus presents it, smug; Theo gawks
    const pan = lerp(-50, 40, ease.sine(clamp(lt / dur)));
    ctx.save(); T.cam(ctx, lerp(1.0, 1.05, ease.sine(lt / dur)), 640, 360);
    put(ctx, arenaBack, pan, .3); rays(ctx, [1080 - pan * .3, 330], t, .1);
    clouds(ctx, t, pan, [[-40, 20, .9, 5, 6], [720, -10, .8, 6, 4]]);
    birds(ctx, t, [[200, 70, 50, 0], [240, 90, 50, 1.3], [270, 64, 50, 2.1], [900, 40, 36, 3]]);
    crowd(ctx, t, pan);
    tree(ctx, -20, 700, t, 19, .95, pan, 1.2);
    fig(ctx, 460 - pan * 1.1, 720, .82, marcus({ t, turn: .3, talk: talking(lt, .5, L.s5), pose: Gd.pose(lt, [[0, 'idle'], [.4, 'present']]), face: { eyes: 'half', mouth: 'smirk', brows: 'sly', look: [.6, 0] } }));
    fig(ctx, 160 - pan * 1.1, 736, .76, theo({ t, turn: .55, pose: Gd.pose(lt, [[0, 'idle'], [1.2, 'hips']]), face: { mouth: 'o', brows: 'up', eyes: 'wide', look: [.8, -.3] }, hair: Gd.hairRing(lt - 1.2, .3) }));
    motes(ctx, t, 28, 11);
    ctx.restore();
    sub(ctx, 'Marcus', L.s5, lt, .5, 3.45);
  }
  function cu(who) {   // close-ups over the blurred sunset terrace (background drifts the other way: parallax)
    return (ctx, lt, dur, t) => {
      const pan = lerp(0, 30, lt / dur);
      ctx.save(); T.cam(ctx, lerp(1.02, 1.07, lt / dur), 640, 360);
      ctx.save(); ctx.filter = 'blur(6px)'; terrace(ctx, t, pan); ctx.restore();
      motes(ctx, t, 26, 13);
      if (who === 'theo') fig(ctx, 600, 1140, 1.95, theo({ t, turn: .15, talk: talking(lt, .5, L.s6) * .7, pose: 'idle', face: { mouth: 'grin', brows: 'worried', blush: true, sweat: true, look: [.3 + Math.sin(lt * 3) * .3, 0] }, headTilt: Math.sin(lt * 2.4) * .03, light: Object.assign({}, SUN, { cast: 0 }) }));
      else fig(ctx, 690, 1140, 1.95, marcus({ t, turn: -.2, talk: talking(lt, 1.2, L.s7), pose: 'idle', noBlink: true, face: { eyes: (lt > .6 && lt < .95) ? 'closed' : 'half', brows: lt > 1.2 ? 'skeptic' : 'neutral', mouth: lt > 1.6 ? 'smirk' : 'flat', look: [-.4, 0] }, light: Object.assign({}, SUN, { cast: 0 }) }));
      ctx.restore();
      if (who === 'theo') sub(ctx, 'Theo', L.s6, lt, .5, 2.1); else sub(ctx, 'Marcus', L.s7, lt, 1.2, 2.5);
    };
  }
  const shots = [[0, 5.0, s1], [5.0, 9.8, s2], [9.8, 13.2, s3], [13.2, 18.2, s4], [18.2, 21.8, s5], [21.8, 24.0, cu('theo')], [24.0, 26.8, cu('marcus')]].map(([start, end, draw]) => ({ start, end, draw }));
  G.TOON_FINISH = { grain: .025, vignette: .45 };
  G.Show = { duration: 26.8, narration: 'assets/audio/silence.mp3', shots,
    sfx: [{ t: 0, type: 'wind', gain: .3 }, { t: 2.0, type: 'click', gain: .35 }, { t: 13.2, type: 'paper', gain: .6 }, { t: 13.35, type: 'slide', gain: .4 }, { t: 16.4, type: 'thud', gain: .9 }, { t: 16.42, type: 'press', gain: .5 }, { t: 16.5, type: 'swell', gain: .35 }, { t: 18.2, type: 'wind', gain: .35 }, { t: 21.8, type: 'click', gain: .3 }],
    moods: [{ t: 0, mood: 'still' }, { t: 9.8, mood: 'silence' }, { t: 13.2, mood: 'under' }, { t: 18.2, mood: 'still' }, { t: 21.8, mood: 'silence' }], images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '700 20px Fredoka', '46px "Luckiest Guy"'] };
})(window);
