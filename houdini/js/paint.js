/* Shared painter kit for the painted (warm) look — extracted from js/skit2.js so every episode can use it:
 *   G.Paint = { OUT, sh, ln, circ, layer, put, sky, rays, clouds, hills, smoothPts, leafMass, tree, bush, blades, birds, motes, PAD, FLOWERS }
 * Layers are cached canvases (W + 2·PAD wide) so parallax pans stay fast; everything animated takes t. */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, clamp, lerp, ease, grad, rng } = T;
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
  function sky(g, sun, stops = [[0, '#5f9bd0'], [.32, '#a9c3e2'], [.55, '#f4cfae'], [.72, '#ffcf86'], [1, '#ffb768']], glow = 1) {
    g.fillStyle = grad(g, 0, 0, 0, H, stops); g.fillRect(-PAD, 0, W + PAD * 2, H);
    const r = g.createRadialGradient(sun[0], sun[1], 8, sun[0], sun[1], 520); r.addColorStop(0, 'rgba(255,252,225,1)'); r.addColorStop(.12, 'rgba(255,240,180,.85)'); r.addColorStop(.45, 'rgba(255,205,140,.35)'); r.addColorStop(1, 'rgba(255,190,120,0)');
    g.save(); g.globalAlpha = glow; g.fillStyle = r; g.fillRect(-PAD, 0, W + PAD * 2, H); g.restore();
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

  G.Paint = { OUT, sh, ln, circ, layer, put, sky, rays, clouds, cloudCanvas, hills, smoothPts, leafMass, tree, bush, blades, birds, motes, PAD, FLOWERS };
})(window);
