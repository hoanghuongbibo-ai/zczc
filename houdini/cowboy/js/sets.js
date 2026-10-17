/* Cowboy episode sets (painted v4 look: textured skies, brush meadows, grained wood, glow + motes).
 *   CS.prairie(ctx, t, pan, o)   o.v 'day'|'noon'|'dawn'|'dusk'|'night'|'storm'|'snow', o.flowers, o.grass (foreground blades)
 *   CS.movieSet(ctx, t, pan, o)  Technicolor western main street at high noon; o.crew shows the film crew in front
 *   CS.studio(ctx, t, pan, o)    Theo's western studio
 *   CS.camp(ctx, t, pan, o)      trail camp with the chuck wagon and fire; o.v 'night'|'dawn'
 *   CS.wagon(ctx, x, y, s, t, o) chuck wagon (o.open shows the chuck box)
 *   CS.river(ctx, t, pan, o)     a wide brown river crossing (draw swimmers between back() and front())
 *   CS.cowtown(ctx, t, pan, o)   Dodge City Front Street (o.v 'night'|'day')
 *   CS.saloon(ctx, t, pan, o)    saloon interior with a poker table
 *   CS.ranch(ctx, t, pan, o)     1860s Texas ranch
 *   CS.cemetery(ctx, t, pan, o) + CS.stone(ctx, x, y, s, reveal)   Weatherford, Ikard's marker
 *   CS.rodeo, CS.city, CS.grave, CS.fence(ctx, x0, x1, y, o) (o.barbed)
 *   CS.map(ctx, t, view) + CS.toS(lon, lat, view) + CS.route(ctx, pts, view, k, o) + CS.pin(...)  trail-drive maps */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, K = G.VK, B = G.Beasts, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, rays, hills, smoothPts, tree, bush, blades, birds, motes, leafMass, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const FONT = (w, s) => `${w} ${s}px Fredoka`, DISP = s => `${s}px "Luckiest Guy"`;
  const txt = (g, s, x, y, font, col = OUT, align = 'center') => { g.font = font; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const mul = (h, k) => G.Guide.hexMul(h, k);

  // ================= skies =================
  const SKY = {
    day: [[0, '#1e66c8'], [.4, '#4f9ae0'], [.68, '#a8d4ee'], [1, '#e8eed6']], noon: [[0, '#1f63c4'], [.45, '#4f97e2'], [.75, '#a9d4f2'], [1, '#f6e2b0']],
    dawn: [[0, '#3c4a7c'], [.4, '#a9739a'], [.66, '#f2a274'], [1, '#ffd49a']], dusk: [[0, '#3a2f7a'], [.3, '#8a4a9a'], [.55, '#e8705a'], [.75, '#ffa45a'], [1, '#ffd890']],
    night: [[0, '#0b1230'], [.55, '#1c2a55'], [1, '#3a4570']], storm: [[0, '#2a3036'], [.4, '#4a535a'], [.7, '#6a6e62'], [1, '#8a8670']], snow: [[0, '#8e98a6'], [.5, '#c4cad0'], [1, '#e6e8ea']] };
  function skyFor(g, v) {
    if (v === 'storm' || v === 'snow') { P2.overcast(g, SKY[v], v === 'storm' ? 81 : 82, v === 'storm' ? [900, 330] : [640, 260]); if (v === 'storm') { g.fillStyle = grad(g, 0, 0, 0, 420, [[0, 'rgba(20,24,30,.45)'], [1, 'rgba(20,24,30,0)']]); g.fillRect(-PAD, 0, W + PAD * 2, 420); } return; }
    P.sky(g, v === 'dawn' ? [980, 420] : v === 'dusk' ? [300, 430] : v === 'noon' ? [640, -40] : [980, 160], SKY[v], v === 'night' ? 0 : v === 'noon' ? .9 : .75);
    if (v === 'night') { const r = rng(11); for (let i = 0; i < 560; i++) { const x = -PAD + r() * (W + PAD * 2), y = r() * 460, b = r(); g.fillStyle = `rgba(255,250,235,${.25 + b * .75})`; g.beginPath(); g.arc(x, y, b > .93 ? 2.2 : 1.1, 0, TAU); g.fill(); }
      g.save(); g.filter = 'blur(26px)'; g.fillStyle = 'rgba(160,170,230,.16)'; g.beginPath(); g.ellipse(640, 160, 900, 70, -.35, 0, TAU); g.fill(); g.restore();
      const m = g.createRadialGradient(1030, 110, 10, 1030, 110, 160); m.addColorStop(0, 'rgba(255,248,220,.5)'); m.addColorStop(1, 'rgba(255,248,220,0)'); g.fillStyle = m; g.fillRect(860, -60, 340, 340); sh(g, '#f8f4e4', 0, circ(1030, 110, 50)); sh(g, 'rgba(210,200,180,.35)', 0, circ(1012, 98, 12)); sh(g, 'rgba(210,200,180,.3)', 0, circ(1046, 124, 9)); sh(g, 'rgba(210,200,180,.25)', 0, circ(1040, 94, 6)); sh(g, 'rgba(200,190,160,.5)', 0, circ(1020, 100, 8)); sh(g, 'rgba(200,190,160,.4)', 0, circ(1044, 120, 6)); }
    P2.grain(g, -PAD, 0, W + PAD * 2, 460, .18, 7, 'soft-light', 1.5);
  }
  const GRASS = { day: ['#c4d266', '#3e7e2c'], noon: ['#e2c272', '#a2a85a'], dawn: ['#c9a46a', '#7a8a4a'], dusk: ['#f2a446', '#5e5a26'], night: ['#3a4a4a', '#22302e'], storm: ['#7a7a52', '#4a5236'], snow: ['#f2f2f2', '#d6dbe0'] };
  const GTONES = { day: ['#4e7e30', '#6e9e3a', '#9cc04e', '#c4d468', '#e0d07a'], noon: ['#8a8a3e', '#a8a850', '#d2b860', '#e6cc80', '#bca256'], dawn: ['#6a6a3a', '#8a7a46', '#b08a52', '#c9a46a', '#9a7a4a'], dusk: ['#5e6a2a', '#9a6a26', '#d08236', '#f4a648', '#ffc868'],
    night: ['#1e2a2a', '#2a3838', '#34464a', '#425454', '#2a3434'], storm: ['#3e4630', '#525a3a', '#6a6e48', '#7e7e56', '#5a5e40'], snow: ['#e6eaee', '#f4f6f8', '#ffffff', '#d4dade', '#c8ced4'] };

  // ================= open prairie =================
  const prairieLayer = (v, seed = 1) => layer(`prairie3-${v}-${seed}`, g => {
    skyFor(g, v); const night = v === 'night', snow = v === 'snow';
    P2.mistyHills(g, 470, smoothPts(-PAD, W + PAD, 420, 34, 11 + seed, 8), mul(night ? '#3a4660' : snow ? '#b8c0c8' : '#a8a88a', 1), mul(night ? '#2e3a52' : snow ? '#cdd3d8' : '#b8b494', 1), { seed: 3 + seed, blur: 2.4, line: false, shadows: 4 });
    if (!night) P2.haze(g, 380, 500, v === 'dusk' || v === 'dawn' ? 'rgba(255,200,160,' : snow ? 'rgba(240,242,246,' : 'rgba(250,240,220,', .5);
    if (!snow && !night) { const r = rng(4 + seed), off = document.createElement('canvas'); off.width = W + PAD * 2; off.height = H; const o2 = off.getContext('2d'); o2.translate(PAD, 0); for (let i = 0; i < 9; i++) { const x = -PAD + r() * (W + PAD * 2); leafMass(o2, x, 440 + r() * 10, 30 + r() * 30, 16 + r() * 8, i + seed * 7, v === 'dusk' ? ['#4a4232', '#5a5038', '#6a5a3e', '#7a6a46'] : ['#5a6a3a', '#6e7e44', '#8a9450', '#a2a85e']); } g.save(); g.filter = 'blur(1.4px)'; g.drawImage(off, -PAD, 0); g.restore(); }
    if (v === 'dusk' || v === 'dawn') { const off = document.createElement('canvas'); off.width = W + PAD * 2; off.height = H; const o2 = off.getContext('2d'); o2.translate(PAD, 0);
      for (const [x, y, rx, ry, sd] of [[-160, 430, 150, 70, 1], [-20, 440, 110, 50, 2], [110, 448, 70, 30, 7], [330, 452, 80, 26, 5], [470, 454, 60, 20, 8], [960, 450, 70, 24, 6], [1150, 436, 130, 64, 3], [1340, 430, 150, 72, 4]]) leafMass(o2, x, y, rx, ry, sd + 70, ['#2a2c38', '#383a40', '#4a4a44', '#5e5a4a']);
      g.save(); g.filter = 'blur(1px)'; g.drawImage(off, -PAD, 0); g.restore(); }
    P2.meadow(g, 440, 720, { seed: 20 + seed, top: GRASS[v][0], bot: GRASS[v][1], tones: GTONES[v], n: 7000, maxL: 30, edge: x => 452 + Math.sin(x * .004 + seed) * 8 + Math.sin(x * .013) * 3 });
    if (v === 'dusk' || v === 'dawn') { g.save(); g.globalCompositeOperation = 'screen'; const hg = g.createRadialGradient(640, 450, 20, 640, 450, 700); hg.addColorStop(0, 'rgba(255,200,120,.55)'); hg.addColorStop(1, 'rgba(255,160,80,0)'); g.fillStyle = hg; g.fillRect(-PAD, 300, W + PAD * 2, 420); g.restore(); }
    if (v === 'day') { const r = rng(31 + seed); for (let i = 0; i < 260; i++) { const y = 470 + Math.pow(r(), .7) * 250, x = -PAD + r() * (W + PAD * 2), s2 = lerp(1.2, 5, (y - 470) / 250); g.fillStyle = ['#f2d24a', '#f6f2e6', '#e8604a', '#a07ad8', '#4a62c8'][i % 5]; g.beginPath(); g.arc(x, y, s2, 0, TAU); g.fill(); } }
    if (v === 'day' || v === 'noon' || v === 'dawn') { const r = rng(9 + seed); for (let i = 0; i < 160; i++) { const y = 470 + Math.pow(r(), .7) * 250, x = -PAD + r() * (W + PAD * 2), s = lerp(1, 4.5, (y - 470) / 250); g.fillStyle = r() < .6 ? ['#4a62c8', '#5f78d8', '#3e54b0'][i % 3] : ['#e2622a', '#f08a3a', '#f2d24a'][i % 3]; g.beginPath(); g.ellipse(x, y, s, s * 1.5, 0, 0, TAU); g.fill(); } }
  });
  function prairie(ctx, t, pan, o = {}) {
    const v = o.v || 'day'; put(ctx, prairieLayer(v, o.seed || 1), pan, .6);
    if (v === 'day' || v === 'noon') P2.clouds2(ctx, t, pan, o.clouds || [[-80, 30, .9, 101, 5], [520, 70, .7, 102, 4], [960, 20, .85, 103, 6]], 'day');
    else if (v === 'dawn' || v === 'dusk') P2.clouds2(ctx, t, pan, [[-40, 60, .8, 104, 4], [800, 40, .7, 105, 3]], 'dusk');
    if (v === 'day' || v === 'noon') { birds(ctx, t, [[100, 140, 30, 0], [140, 156, 30, 1]]); ctx.save(); ctx.globalCompositeOperation = 'screen'; const sg = ctx.createRadialGradient(1180, -40, 20, 1180, -40, 900); sg.addColorStop(0, 'rgba(255,236,160,.75)'); sg.addColorStop(.4, 'rgba(255,220,130,.25)'); sg.addColorStop(1, 'rgba(255,220,130,0)'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H); ctx.restore(); rays(ctx, [1180 - pan * .3, -60], t, .12); }
    if (v === 'night') { ctx.save(); const r = rng(9); for (let i = 0; i < 9; i++) { const x = ((r() * (W + 600) + t * (8 + r() * 6)) % (W + 600)) - 300, y = 450 + r() * 130; const gr = ctx.createRadialGradient(x, y, 0, x, y, 340); gr.addColorStop(0, 'rgba(195,210,240,.5)'); gr.addColorStop(1, 'rgba(190,205,235,0)'); ctx.fillStyle = gr; ctx.save(); ctx.translate(x, y); ctx.scale(1, .22); ctx.translate(-x, -y); ctx.fillRect(x - 340, y - 340, 680, 680); ctx.restore(); } ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 1030, 110, 340, 'rgba(220,230,255,.42)'); ctx.restore(); }
    if (v === 'storm' && o.flash) { const k = o.flash; ctx.save(); ctx.globalAlpha = k * .55; ctx.fillStyle = '#e8eef8'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    if (v === 'snow') { const r = rng(5); ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.85)'; for (let i = 0; i < 260; i++) { const sp = 80 + r() * 160, x = ((r() * W * 1.5 + t * sp * (o.wind ?? 1.4)) % (W + 200)) - 100, y = (r() * H + t * sp) % H, rr = 1 + r() * 3; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill(); } ctx.restore(); }
  }
  function foreground(ctx, t, pan, o = {}) { const v = o.v || 'day', col = v === 'night' ? '#1e2a26' : v === 'snow' ? '#c8ced2' : null; ctx.save(); if (col) ctx.filter = v === 'night' ? 'brightness(.35) saturate(.6)' : 'brightness(1.4) saturate(.2)'; blades(ctx, 60, 728, 18, 120, t, 31, pan, 1.3, 0); blades(ctx, 1220, 728, 16, 110, t, 32, pan, 1.3, 0); ctx.restore(); }

  // ================= fences =================
  function fence(ctx, x0, x1, y, o = {}) { const h = o.h || 70, gap = o.gap || 110, col = o.col || '#8a6a46';
    for (let x = x0; x <= x1; x += gap) { ln(ctx, [[x, y], [x + (o.lean || 0), y - h]], 11); ln(ctx, [[x, y], [x + (o.lean || 0), y - h]], 7, col); }
    if (o.barbed) for (const k of [.3, .58, .86]) { const yy = y - h * k; ctx.strokeStyle = '#4a4a4e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, yy); for (let x = x0; x <= x1; x += 20) ctx.lineTo(x, yy + Math.sin(x * .05) * 1.5); ctx.stroke(); for (let x = x0 + 12; x < x1; x += 34) { ln(ctx, [[x - 4, yy - 5], [x + 4, yy + 5]], 1.6, '#3a3a3e'); ln(ctx, [[x + 4, yy - 5], [x - 4, yy + 5]], 1.6, '#3a3a3e'); } }
    else for (const k of [.35, .75]) { ln(ctx, [[x0, y - h * k], [x1, y - h * k]], 10); ln(ctx, [[x0, y - h * k], [x1, y - h * k]], 6, col); } }

  // ================= the movie set: Technicolor main street =================
  function facade(g, x, w, h, col, sign, o = {}) {
    const y0 = 520; P2.planks(g, x, y0 - h, w, h, { vertical: true, size: 30, base: col, seed: Math.abs(x) + 3 }); g.lineWidth = 4; g.strokeStyle = OUT; g.strokeRect(x, y0 - h, w, h);
    sh(g, mul(col, .75), 4, c => c.rect(x - 8, y0 - h - 14, w + 16, 18));
    if (sign) { const sw = Math.min(w - 30, sign.length * 22 + 40); sh(g, o.signCol || '#f2e2b6', 4, c => c.roundRect(x + w / 2 - sw / 2, y0 - h + 22, sw, 46, 6)); txt(g, sign, x + w / 2, y0 - h + 47, DISP(30), o.signInk || '#7a2a1e'); }
    const wy = y0 - h + 96; if (h > 200) for (const wx of [x + 26, x + w - 76]) { sh(g, '#2c2836', 3.5, c => c.rect(wx, wy, 50, 62)); g.fillStyle = 'rgba(160,200,240,.35)'; g.fillRect(wx + 4, wy + 4, 42, 54); ln(g, [[wx + 25, wy], [wx + 25, wy + 62]], 3, mul(col, .6)); ln(g, [[wx, wy + 31], [wx + 50, wy + 31]], 3, mul(col, .6)); }
    // porch roof + posts
    sh(g, mul(col, .8), 4, c => { c.moveTo(x - 10, y0 - 120); c.lineTo(x + w + 10, y0 - 120); c.lineTo(x + w + 22, y0 - 100); c.lineTo(x - 22, y0 - 100); c.closePath(); });
    for (const px of [x - 6, x + w + 2]) { ln(g, [[px, y0 - 100], [px, y0 + 6]], 10); ln(g, [[px, y0 - 100], [px, y0 + 6]], 6, mul(col, .7)); }
    if (o.door === 'saloon') { sh(g, '#2a1e18', 3.5, c => c.rect(x + w / 2 - 34, y0 - 92, 68, 92)); for (const sd of [-1, 1]) sh(g, '#c08a4a', 3, c => c.rect(x + w / 2 + (sd < 0 ? -32 : 2), y0 - 70, 30, 42)); }
    else { sh(g, '#4a2e1e', 3.5, c => c.rect(x + w / 2 - 24, y0 - 86, 48, 86)); sh(g, '#d8b85a', 1.5, circ(x + w / 2 + 14, y0 - 42, 3)); }
  }
  const movieLayer = () => layer('movie4', g => {
    P.sky(g, [655, 455], [[0, '#1f3f8a'], [.3, '#4a72c0'], [.55, '#9fb2d8'], [.72, '#f6c27a'], [.86, '#ffcf80'], [1, '#ffe2a8']], 1.1); P2.grain(g, -PAD, 0, W + PAD * 2, 420, .18, 4, 'soft-light', 1.5);
    { const sg = g.createRadialGradient(655, 455, 10, 655, 455, 380); sg.addColorStop(0, 'rgba(255,250,220,1)'); sg.addColorStop(.08, 'rgba(255,226,150,.9)'); sg.addColorStop(.35, 'rgba(255,170,80,.28)'); sg.addColorStop(1, 'rgba(255,150,60,0)'); g.fillStyle = sg; g.fillRect(-PAD, 0, W + PAD * 2, H); }
    // painted desert buttes (it's a Hollywood set: Monument Valley in Kansas!)
    for (const [x, w, h, col] of [[-160, 260, 150, '#9a5a5a'], [180, 180, 210, '#a8605a'], [880, 300, 170, '#9a5056'], [1180, 220, 120, '#a86458']]) { g.save(); g.filter = 'blur(1.2px)'; sh(g, col, 0, c => { c.moveTo(x - 30, 430); c.lineTo(x + 10, 430 - h); c.lineTo(x + w - 10, 430 - h); c.lineTo(x + w + 30, 430); c.closePath(); }); g.fillStyle = 'rgba(255,220,180,.25)'; g.fillRect(x + 10, 430 - h, 40, h); g.fillStyle = 'rgba(80,20,10,.2)'; for (let k = 0; k < 4; k++) g.fillRect(x, 430 - h + 20 + k * h / 4, w, 4); g.restore(); }
    P2.haze(g, 360, 470, 'rgba(255,214,150,', .28);
    g.fillStyle = grad(g, 0, 420, 0, H, [[0, '#e0a060'], [.4, '#c07a44'], [1, '#7a4626']]); g.fillRect(-PAD, 420, W + PAD * 2, 320); P2.grain(g, -PAD, 420, W + PAD * 2, 320, .4, 12, 'overlay', .8);
    facade(g, -200, 230, 250, '#a8784a', 'BANK'); facade(g, 40, 300, 300, '#c0563a', 'SALOON', { door: 'saloon', signCol: '#f6d77a' }); facade(g, 350, 220, 230, '#7a8a5a', 'SHERIFF');
    // water tower + gap view
    sh(g, '#6a4a30', 4, c => c.rect(600, 250, 110, 90)); for (let i = 0; i < 4; i++) ln(g, [[600, 262 + i * 22], [710, 262 + i * 22]], 3, '#3a2418'); for (const lx of [610, 700]) ln(g, [[lx, 340], [lx + (lx < 650 ? -10 : 10), 520]], 8, '#5a3a22'); sh(g, '#5a3a22', 4, c => { c.moveTo(590, 252); c.lineTo(655, 214); c.lineTo(720, 252); c.closePath(); });
    facade(g, 740, 260, 270, '#d8a85a', 'HOTEL', { signCol: '#f2e8d0' }); facade(g, 1010, 240, 240, '#8a5a8a', 'GENERAL STORE', { signCol: '#f6e2b6' }); facade(g, 1260, 200, 220, '#5a7a9a', 'BARBER');
    P2.planks(g, -PAD, 520, W + PAD * 2, 26, { size: 13, base: '#8a6a46', seed: 4, joints: true }); ln(g, [[-PAD, 520], [W + PAD, 520]], 4); ln(g, [[-PAD, 546], [W + PAD, 546]], 4);
    for (const x of [280, 980]) { ln(g, [[x, 546], [x, 500]], 8); ln(g, [[x + 120, 546], [x + 120, 500]], 8); ln(g, [[x - 6, 506], [x + 126, 506]], 9); ln(g, [[x - 6, 506], [x + 126, 506]], 5, '#8a6040'); }
    G.Props.barrel(g, 590, 548, .6); G.Props.barrel(g, 630, 552, .55); G.Props.trough(g, 1150, 560, .7);
    // wheel ruts
    g.strokeStyle = 'rgba(120,80,40,.25)'; g.lineWidth = 8; for (const yy of [600, 660]) { g.beginPath(); g.moveTo(-PAD, yy); g.quadraticCurveTo(640, yy - 10, W + PAD, yy + 4); g.stroke(); }
    P2.pebbles(g, -PAD, 560, W + PAD * 2, 160, 50, 3, { min: 3, var: 5, cols: ['#c9a874', '#b08a5a', '#d8bc8a', '#a07a4a'] });
    // backlit street: facades fall into warm shade toward the ground, a sunlit path runs down the middle of the street
    g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = grad(g, 0, 200, 0, 560, [[0, 'rgba(255,246,235,1)'], [.6, 'rgba(225,200,185,1)'], [1, 'rgba(150,115,105,1)']]); g.fillRect(-PAD, 180, 600 + PAD, 380); g.fillRect(720, 180, 560 + PAD, 380); g.restore();
    g.save(); g.globalCompositeOperation = 'screen'; const lp = g.createRadialGradient(655, 540, 10, 655, 600, 420); lp.addColorStop(0, 'rgba(255,214,140,.32)'); lp.addColorStop(1, 'rgba(255,190,110,0)'); g.fillStyle = lp; g.beginPath(); g.moveTo(600, 520); g.lineTo(720, 520); g.lineTo(1100, 720); g.lineTo(200, 720); g.closePath(); g.fill(); g.restore();
    g.save(); g.strokeStyle = 'rgba(255,214,150,.55)'; g.lineWidth = 3; for (const [x0, x1, y] of [[-200, 30, 270], [40, 340, 220], [350, 570, 290], [740, 1000, 250], [1010, 1250, 280]]) { g.beginPath(); g.moveTo(x0, y - 14); g.lineTo(x1, y - 14); g.stroke(); } g.restore();
    { const r = rng(17); for (let i = 0; i < 30; i++) { const x = -PAD + r() * (W + PAD * 2), y = 560 + r() * 150; g.strokeStyle = ['#8a6a3a', '#a8844e', '#6b5a2e'][i % 3]; g.lineWidth = 2; for (let k = 0; k < 7; k++) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + (k - 3) * 4, y - 10 - r() * 14); g.stroke(); } } }
  });
  function longShadow(ctx, x, y, w, len = 300, sun = [655, 455], a = .5) { const dx = x - sun[0], dy = Math.max(60, y - sun[1]), L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    ctx.save(); ctx.filter = 'blur(6px)'; ctx.fillStyle = `rgba(70,30,10,${a})`; ctx.beginPath(); ctx.moveTo(x - w, y); ctx.lineTo(x + w, y); ctx.lineTo(x + ux * len + w * 1.6, y + uy * len * .45); ctx.lineTo(x + ux * len - w * 1.6, y + uy * len * .45); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function crew(ctx, t) {   // the film crew framing the shot: camera on a tripod, a light, a boom mic, the director's chair
    ctx.save(); ctx.translate(120, 720);
    for (const a of [-.25, 0, .25]) ln(ctx, [[0, -150], [Math.sin(a) * 120, 0]], 7, '#2a2a2e');
    sh(ctx, '#2c2c32', 4, c => c.roundRect(-70, -230, 150, 90, 10)); for (const dx of [-40, 30]) { sh(ctx, '#3a3a42', 4, circ(dx, -270, 40)); sh(ctx, '#55555e', 3, circ(dx, -270, 14)); }
    sh(ctx, '#1a1a1e', 4, c => c.roundRect(76, -210, 60, 50, 8)); sh(ctx, 'rgba(160,200,255,.5)', 3, c => c.ellipse(136, -185, 10, 22, 0, 0, TAU)); ctx.restore();
    ctx.save(); ctx.translate(1180, 720); ln(ctx, [[0, 0], [0, -320]], 8, '#2a2a2e'); for (const a of [-.4, .4]) ln(ctx, [[0, -40], [Math.sin(a) * 90, 0]], 7, '#2a2a2e');
    ctx.save(); ctx.translate(0, -340); ctx.rotate(-.5); sh(ctx, '#3a3a42', 4, c => c.roundRect(-60, -46, 120, 92, 12)); sh(ctx, '#fff6d8', 3, c => c.roundRect(-48, -36, 96, 72, 8)); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, -80, -320, 260, 'rgba(255,240,200,.25)'); ctx.restore(); ctx.restore();
    ln(ctx, [[1280, 40], [760, 120]], 9, '#2a2a2e'); sh(ctx, '#55555e', 3.5, c => c.roundRect(700, 104, 80, 34, 16)); ctx.save(); ctx.strokeStyle = 'rgba(200,200,210,.5)'; ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(706 + i * 12, 106); ctx.lineTo(706 + i * 12, 136); ctx.stroke(); } ctx.restore();
  }
  function movieSet(ctx, t, pan, o = {}) {
    put(ctx, movieLayer(), pan, .5); P2.clouds2(ctx, t, pan, [[-40, 10, .8, 111, 4], [900, 30, .7, 112, 3], [560, 150, .45, 113, 2]], 'warm');
    rays(ctx, [655 - pan * .5, 455], t, .045); P.motes(ctx, t, 34, 61, [300, 200, 700, 480]);
    if (o.tumble !== false) { const u = ((t * .11 + (o.tph || 0)) % 1), x = lerp(-120, 1400, u), y = 640 - Math.abs(Math.sin(u * 22)) * 40; B.tumbleweed(ctx, x, y, 34, t * 6); }
    if (o.crew) crew(ctx, t);
    if (o.grade !== false) { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .14; ctx.fillStyle = '#ff9a40'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  }

  // ================= Theo's western studio =================
  const studioLayer = () => layer('wstudio3', g => {
    P2.plaster(g, -PAD, 0, W + PAD * 2, 420, '#ead2a8', 91, { chips: 3, cracks: 3 });
    P2.planks(g, -PAD, 400, W + PAD * 2, 170, { vertical: true, size: 40, base: '#7e4e2c', seed: 9 }); sh(g, '#6b4628', 4, c => c.rect(-PAD, 392, W + PAD * 2, 16));
    P2.planks(g, -PAD, 566, W + PAD * 2, 170, { size: 30, base: '#8e5e36', seed: 12 }); g.fillStyle = grad(g, 0, 566, 0, 640, [[0, 'rgba(50,20,5,.35)'], [1, 'rgba(0,0,0,0)']]); g.fillRect(-PAD, 566, W + PAD * 2, 70);
    // wanted posters, a horseshoe, a coiled lariat, a lantern bracket, a framed trail map
    const poster = (x, y, r, head) => { g.save(); g.translate(x, y); g.rotate(r); sh(g, '#efe0be', 3.5, c => c.rect(-56, -74, 112, 148)); txt(g, head, 0, -50, DISP(24), '#5a2a1a'); sh(g, '#e2d2a8', 2.5, c => c.rect(-34, -32, 68, 56)); sh(g, '#f2e2c0', 2, circ(0, -4, 16)); sh(g, '#6a4a30', 2, c => c.ellipse(0, -20, 26, 6, 0, 0, TAU)); sh(g, '#6a4a30', 2, c => c.roundRect(-12, -36, 24, 16, 4)); g.fillStyle = OUT; g.fillRect(-6, -6, 3, 3); g.fillRect(4, -6, 3, 3); ln(g, [[-5, 4], [5, 4]], 2); for (let i = 0; i < 3; i++) ln(g, [[-36, 38 + i * 12], [36, 38 + i * 12]], 2.5, 'rgba(60,40,20,.5)'); g.restore(); };
    poster(110, 200, -.06, 'WANTED'); poster(1170, 190, .05, 'REWARD');
    ctx_horseshoe(g, 300, 120);
    g.save(); g.translate(990, 150); for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(0, 10 + k * 3, 48 - k * 3, 58 - k * 3, .1, 0, TAU); g.lineWidth = 9; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 5; g.strokeStyle = '#c9a868'; g.stroke(); } g.restore(); sh(g, '#5a3a22', 2, circ(990, 92, 5));
    sh(g, '#6b4628', 4, c => c.rect(500, 70, 280, 190)); sh(g, '#e8d4a8', 3, c => c.rect(512, 82, 256, 166)); g.strokeStyle = '#b8322a'; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(560, 230); g.quadraticCurveTo(620, 150, 700, 110); g.stroke(); g.setLineDash([]); txt(g, 'TEXAS → KANSAS', 640, 236, FONT(700, 14), '#5a3a22');
    sh(g, '#3d6a3a', 3, c => c.roundRect(1080, 480, 40, 86, 18)); for (const sd of [-1, 1]) sh(g, '#3d6a3a', 3, c => c.roundRect(1100 + sd * 26 - 9, 500 - 30, 18, 46, 9)); sh(g, '#b8673e', 3, c => { c.moveTo(1066, 566); c.lineTo(1074, 530); c.lineTo(1126, 530); c.lineTo(1134, 566); c.closePath(); });
    G.Props.barrel(g, 150, 568, .8); G.Props.crate(g, 220, 570, .6);
    for (let i = 0; i < 7; i++) { sh(g, '#d8a838', 2.5, c => c.ellipse(1210 + (i % 2) * 3, 568 - i * 7, 26, 8, 0, 0, TAU)); g.fillStyle = 'rgba(255,240,170,.6)'; g.fillRect(1192 + (i % 2) * 3, 563 - i * 7, 14, 2); } for (let i = 0; i < 4; i++) sh(g, '#d8a838', 2.5, c => c.ellipse(1260 + (i % 2) * 3, 568 - i * 7, 22, 7, 0, 0, TAU));
  });
  function ctx_horseshoe(g, x, y) { g.save(); g.translate(x, y); g.beginPath(); g.arc(0, 0, 30, PI * .15, PI * .85, true); g.lineWidth = 22; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 14; g.strokeStyle = '#9aa0a8'; g.stroke(); for (let k = 0; k < 6; k++) { const a = PI * (.25 + k * .1) * -1 + PI; } g.restore(); sh(g, '#3a2a20', 2, circ(x, y - 40, 4)); }
  function studio(ctx, t, pan, o = {}) { put(ctx, studioLayer(), pan, .3);
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .22; ctx.fillStyle = '#d88a40'; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const lx of [380, 900]) { const fl = 1 + Math.sin(t * 9 + lx) * .03; T.glow(ctx, lx - pan * .3, 220, 360 * fl, 'rgba(255,170,70,.3)'); } ctx.restore();
    T.glow(ctx, 640, 330, 460, 'rgba(255,230,170,.22)'); P2.lantern(ctx, 380 - pan * .3, 210, t, .9); P2.lantern(ctx, 900 - pan * .3, 210, t + 1, .9); motes(ctx, t, 30, 21);
    { const vg = ctx.createRadialGradient(640, 380, 320, 640, 380, 860); vg.addColorStop(0, 'rgba(60,25,8,0)'); vg.addColorStop(1, 'rgba(50,20,6,.6)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H); } }

  // ================= chuck wagon + camp =================
  function wagon(ctx, x, y, s, t, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s);
    const wheel = (wx, r) => { sh(ctx, '#5a3a22', 5, circ(wx, -r, r)); sh(ctx, '#7a5233', 0, circ(wx, -r, r - 9)); for (let k = 0; k < 12; k++) { const a = k / 12 * TAU + (o.roll || 0); ln(ctx, [[wx, -r], [wx + Math.cos(a) * (r - 8), -r + Math.sin(a) * (r - 8)]], 4, '#4a2e1a'); } sh(ctx, '#3a2418', 3, circ(wx, -r, 10)); ctx.lineWidth = 5; ctx.strokeStyle = '#3a3a3e'; ctx.beginPath(); ctx.arc(wx, -r, r - 2, 0, TAU); ctx.stroke(); };
    wheel(-170, 70); wheel(150, 58);
    P2.planks(ctx, -240, -200, 440, 80, { size: 20, base: '#8a5a36', seed: 5, joints: false }); ctx.lineWidth = 4; ctx.strokeStyle = OUT; ctx.strokeRect(-240, -200, 440, 80);
    const cover = c => { c.moveTo(-230, -200); c.quadraticCurveTo(-240, -330, -150, -350); c.lineTo(130, -350); c.quadraticCurveTo(210, -330, 196, -200); c.closePath(); };
    sh(ctx, '#ece2cc', 4, cover); ctx.save(); ctx.beginPath(); cover(ctx); ctx.clip(); for (const bx of [-150, -60, 30, 120]) { ctx.fillStyle = 'rgba(120,100,70,.18)'; ctx.fillRect(bx - 4, -360, 8, 170); } ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-240, -350, 440, 20); P2.grain(ctx, -240, -360, 440, 170, .35, 6, 'overlay', .5); ctx.restore();
    // chuck box at the back (screen-left) with its fold-down lid table
    sh(ctx, '#9a6a3e', 4, c => c.rect(-300, -300, 70, 180)); for (let i = 0; i < 4; i++) { sh(ctx, '#7a5233', 2.5, c => c.rect(-294, -290 + i * 42, 58, 36)); sh(ctx, '#d8b85a', 1.5, circ(-265, -272 + i * 42, 3)); }
    if (o.open) { sh(ctx, '#8a5a36', 4, c => c.rect(-430, -140, 132, 14)); ln(ctx, [[-424, -126], [-424, 0]], 6); for (const [px, col] of [[-400, '#9aa0a8'], [-360, '#4a6a8a'], [-330, '#c9b48a']]) sh(ctx, col, 3, c => c.roundRect(px - 12, -170, 24, 30, 4)); }
    G.Props.barrel(ctx, 210, -130, .5); ln(ctx, [[200, -140], [330, -110]], 8, '#5a3a22');
    if (o.labels) { const k = o.labels; [['kitchen', -350, -330], ['pantry', -60, -390], ['closet', 120, -390]].forEach(([l, lx, ly], i) => K.tag(ctx, l, lx, ly, k, i * .5, { size: 30 })); }
    ctx.restore();
  }
  const campLayer = v => layer('camp-' + v, g => {
    skyFor(g, v === 'night' ? 'night' : 'dawn'); const night = v === 'night';
    P2.mistyHills(g, 470, smoothPts(-PAD, W + PAD, 430, 30, 7, 8), night ? '#2a3450' : '#6a5a6a', night ? '#222c44' : '#7a6a6a', { seed: 7, blur: 2, line: false });
    P2.meadow(g, 440, 720, { seed: 61, top: night ? '#2a3434' : '#7a6a4a', bot: night ? '#1a2222' : '#4a4232', tones: night ? GTONES.night : GTONES.dawn, n: 4000, edge: x => 456 + Math.sin(x * .005) * 6 });
    for (const [x, y, c] of [[220, 640, '#8a3a2a'], [420, 670, '#3a5a7a'], [960, 650, '#6a5a3a']]) { sh(g, c, 3.5, cc => cc.roundRect(x - 70, y - 18, 140, 36, 16)); sh(g, '#d8ccb0', 3, cc => cc.roundRect(x + 40, y - 22, 40, 30, 12)); }
    for (const [x, y] of [[1120, 610], [80, 600]]) { sh(g, '#6b4026', 3.5, c => { c.moveTo(x - 40, y); c.quadraticCurveTo(x - 30, y - 34, x, y - 30); c.quadraticCurveTo(x + 20, y - 30, x + 34, y - 50); c.lineTo(x + 42, y - 44); c.quadraticCurveTo(x + 40, y - 6, x + 30, y); c.closePath(); }); }
  });
  function camp(ctx, t, pan, o = {}) { const v = o.v || 'dawn'; put(ctx, campLayer(v), pan, .5);
    if (o.wagon !== false) wagon(ctx, 980 - pan * .7, 600, .75, t, { open: o.open, labels: o.labels });
    P2.fire(ctx, 620 - pan * .8, 640, .55, t); ln(ctx, [[560 - pan * .8, 640], [600 - pan * .8, 560], [680 - pan * .8, 560], [700 - pan * .8, 640]], 4, '#3a3a3e'); sh(ctx, '#4a4a52', 3, c => c.roundRect(620 - pan * .8 - 16, 560, 32, 36, 6));
    if (v === 'night') { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(40,50,90,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore(); T.glow(ctx, 620 - pan * .8, 600, 420, 'rgba(255,160,80,.22)'); }
    else T.glow(ctx, 620 - pan * .8, 600, 300, 'rgba(255,170,90,.18)'); }

  // ================= river crossing =================
  const riverLayer = () => layer('river', g => { skyFor(g, 'day'); P2.mistyHills(g, 430, smoothPts(-PAD, W + PAD, 380, 40, 9, 8), '#9aa284', '#aeb08e', { seed: 9, blur: 2, line: false }); P2.haze(g, 340, 460, 'rgba(250,240,220,', .45);
    P2.meadow(g, 400, 470, { seed: 71, top: '#b4ac6a', bot: '#8a8a4e', tones: GTONES.day, n: 1600, maxL: 12, edge: x => 410 + Math.sin(x * .006) * 5 });
    { const r = rng(5); for (let i = 0; i < 7; i++) { const x = -PAD + r() * (W + PAD * 2); leafMass(g, x, 390, 46 + r() * 30, 40, i + 30, ['#4a6a3a', '#5e7e44', '#7a9450', '#98aa5e']); ln(g, [[x, 470], [x + 4, 400]], 10, '#6a5040'); } }
    sh(g, '#8a6a46', 0, c => c.rect(-PAD, 462, W + PAD * 2, 16)); });
  function river(ctx, t, pan, o = {}) { put(ctx, riverLayer(), pan, .5);
    ctx.fillStyle = grad(ctx, 0, 470, 0, H, [[0, '#9a8a62'], [.4, '#7f6e4c'], [1, '#5e5038']]); ctx.fillRect(0, 470, W, 250);
    const r = rng(8); ctx.lineCap = 'round'; for (let i = 0; i < 70; i++) { const y = 480 + r() * 240, x = ((r() * (W + 300) + t * (40 + r() * 30) * (o.flow ?? 1)) % (W + 300)) - 150, L = 30 + r() * 80; ctx.strokeStyle = `rgba(230,220,190,${.15 + .25 * Math.abs(Math.sin(t + i))})`; ctx.lineWidth = 2 + r() * 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + L / 2, y - 3, x + L, y); ctx.stroke(); } }
  function waterline(ctx, x, y, w, t) { ctx.save(); ctx.strokeStyle = 'rgba(240,235,215,.85)'; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const xx = x - w / 2 + k * w / 10, yy = y + Math.sin(t * 6 + k) * 3; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }

  // ================= cow town: Dodge City, Front Street =================
  const townLayer = v => layer('town-' + v, g => {
    const night = v === 'night'; skyFor(g, night ? 'night' : 'day');
    const bldg = [[-200, 210, 230, '#7a5a3e', 'DRY GOODS'], [20, 300, 290, '#8a3e2e', 'LONG BRANCH SALOON'], [330, 200, 220, '#5a6a7a', 'BARBER'], [540, 260, 260, '#9a7a4a', 'ALAMO SALOON'], [810, 220, 230, '#6a4a6a', 'HOTEL'], [1040, 240, 250, '#7a5a3a', 'SALOON'], [1290, 200, 210, '#5a6a4a', 'GUNS']];
    for (const [x, w, h, col, s] of bldg) { facade(g, x, w, h, night ? mul(col, .55) : col, s, { door: s.includes('SALOON') ? 'saloon' : null, signCol: night ? '#c8b080' : '#f2e2b6' });
      if (night) { const wy = 520 - h + 96; for (const wx of [x + 26, x + w - 76]) if (h > 200) { g.fillStyle = 'rgba(255,190,90,.85)'; g.fillRect(wx + 4, wy + 4, 42, 54); } g.fillStyle = 'rgba(255,190,90,.7)'; g.fillRect(x + w / 2 - 30, 520 - 88, 60, 86); } }
    g.fillStyle = grad(g, 0, 546, 0, H, [[0, night ? '#4a3e3a' : '#c8a070'], [1, night ? '#2a2420' : '#a07a4c']]); g.fillRect(-PAD, 546, W + PAD * 2, 200); P2.grain(g, -PAD, 546, W + PAD * 2, 200, .35, 31, 'overlay', .8);
    P2.planks(g, -PAD, 520, W + PAD * 2, 26, { size: 13, base: night ? '#4a3a2e' : '#8a6a46', seed: 8 }); ln(g, [[-PAD, 546], [W + PAD, 546]], 4);
    for (const yy of [660, 700]) { ln(g, [[-PAD, yy], [W + PAD, yy]], 9, '#2a2a2e'); ln(g, [[-PAD, yy], [W + PAD, yy]], 4, night ? '#6a6a72' : '#9a9aa2'); } for (let x = -PAD; x < W + PAD; x += 34) sh(g, night ? '#3a2a20' : '#6a4a30', 2, c => c.rect(x, 652, 14, 60));
  });
  function cowtown(ctx, t, pan, o = {}) { const v = o.v || 'night'; put(ctx, townLayer(v), pan, .5);
    if (v === 'night') { for (const x of [130, 670, 1150]) { P2.lantern(ctx, x - pan * .5, 400, t + x, .7); } ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const x of [170, 670, 1160]) T.glow(ctx, x - pan * .5, 480, 240, 'rgba(255,170,80,.18)'); ctx.restore(); }
    else motes(ctx, t, 14, 3); }

  // ================= saloon interior =================
  const saloonLayer = () => layer('saloon', g => {
    P2.planks(g, -PAD, 0, W + PAD * 2, 470, { vertical: true, size: 46, base: '#6a3e26', seed: 41 }); sh(g, '#3a2214', 0, c => c.rect(-PAD, 0, W + PAD * 2, 60));
    // back bar: mirror, shelves of bottles
    sh(g, '#4a2a18', 4, c => c.rect(700, 90, 560, 250)); sh(g, 'rgba(200,220,230,.35)', 3, c => c.roundRect(760, 110, 440, 120, 40)); for (let row = 0; row < 2; row++) { ln(g, [[720, 250 + row * 50], [1240, 250 + row * 50]], 6, '#2a180e'); const r = rng(row + 3); for (let x = 730; x < 1230; x += 26) { const col = ['#3a6a3a', '#7a2a1e', '#c99a3c', '#3a4a6a', '#e8dcc0'][Math.floor(r() * 5)]; sh(g, col, 2, c => c.roundRect(x, 250 + row * 50 - 34, 14, 34, 4)); sh(g, col, 1.5, c => c.rect(x + 4, 250 + row * 50 - 44, 6, 12)); } }
    P2.planks(g, 660, 360, 640, 120, { vertical: true, size: 30, base: '#7a4428', seed: 3 }); sh(g, '#4a2a18', 4, c => c.rect(640, 346, 680, 22)); ln(g, [[660, 470], [1300, 470]], 8, '#c9a648');
    sh(g, '#2a1a12', 4, c => c.rect(40, 230, 220, 170)); for (let i = 0; i < 8; i++) sh(g, i % 2 ? '#f2ead8' : '#1e1612', 1.5, c => c.rect(56 + i * 25, 360, 22, 36)); sh(g, '#3a2418', 4, c => c.rect(30, 220, 240, 18));
    P2.planks(g, -PAD, 470, W + PAD * 2, 260, { size: 34, base: '#5a3420', seed: 44 });
    for (const x of [140, 980]) { ln(g, [[x, 0], [x, 50]], 3); sh(g, '#c9a648', 3, c => c.ellipse(x, 60, 70, 14, 0, 0, TAU)); }
  });
  function saloon(ctx, t, pan, o = {}) { put(ctx, saloonLayer(), pan, .4); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const x of [140, 980]) T.glow(ctx, x - pan * .4, 80, 300, 'rgba(255,190,100,.28)'); ctx.restore();
    if (o.table !== false) { const x = 520 - pan * .6; ctx.save(); ctx.filter = 'blur(6px)'; sh(ctx, 'rgba(0,0,0,.4)', 0, c => c.ellipse(x, 690, 300, 30, 0, 0, TAU)); ctx.restore(); ln(ctx, [[x, 600], [x, 690]], 22); ln(ctx, [[x, 600], [x, 690]], 14, '#4a2a18'); sh(ctx, '#2e6a3e', 5, c => c.ellipse(x, 600, 300, 60, 0, 0, TAU)); sh(ctx, '#3a7a48', 0, c => c.ellipse(x, 594, 270, 46, 0, 0, TAU)); ctx.lineWidth = 8; ctx.strokeStyle = '#5a3420'; ctx.beginPath(); ctx.ellipse(x, 600, 296, 58, 0, 0, TAU); ctx.stroke(); }
    motes(ctx, t, 18, 41); }

  // ================= 1860s Texas ranch =================
  const ranchLayer = () => layer('ranch', g => { skyFor(g, 'day'); P2.mistyHills(g, 470, smoothPts(-PAD, W + PAD, 420, 40, 21, 8), '#a8a88a', '#b8b494', { seed: 21, blur: 2, line: false }); P2.haze(g, 380, 500, 'rgba(250,240,220,', .45);
    P2.meadow(g, 440, 720, { seed: 81, top: '#c4b06a', bot: '#8a9450', tones: GTONES.day, n: 5000, edge: x => 450 + Math.sin(x * .004) * 8 });
    for (const [x, sc] of [[120, .9], [1150, 1.1]]) { ln(g, [[x, 470], [x + 6, 380]], 18); ln(g, [[x, 470], [x + 6, 380]], 12, '#5a4a3a'); leafMass(g, x, 350, 120 * sc, 60 * sc, x, ['#3e5a2e', '#506e36', '#6a8a44', '#86a050']); }
    // the house: limestone, gallery porch, chimney
    const hx = 520, hy = 470; sh(g, '#d8cbb0', 4, c => c.rect(hx, hy - 120, 300, 120)); { const r = rng(4); for (let i = 0; i < 40; i++) { g.strokeStyle = 'rgba(120,100,70,.35)'; g.lineWidth = 1.5; g.strokeRect(hx + r() * 280, hy - 120 + r() * 110, 20 + r() * 20, 10 + r() * 6); } }
    sh(g, '#7a5a42', 4, c => { c.moveTo(hx - 20, hy - 118); c.lineTo(hx + 150, hy - 190); c.lineTo(hx + 320, hy - 118); c.closePath(); }); sh(g, '#b8a68a', 4, c => c.rect(hx + 230, hy - 210, 30, 70));
    sh(g, '#8a6a4a', 4, c => c.rect(hx - 10, hy - 74, 320, 12)); for (const px of [hx, hx + 100, hx + 200, hx + 300]) ln(g, [[px, hy - 62], [px, hy]], 6, '#6a4a30'); sh(g, '#4a2e1e', 3.5, c => c.rect(hx + 130, hy - 60, 40, 60));
    fence(g, 860, 1240, 520, { h: 56, gap: 76 }); fence(g, -PAD, 440, 520, { h: 56, gap: 76 });
  });
  function ranch(ctx, t, pan, o = {}) { put(ctx, ranchLayer(), pan, .5); P2.clouds2(ctx, t, pan, [[60, 40, .8, 121, 4], [820, 20, .7, 122, 3]], 'day'); birds(ctx, t, [[300, 130, 30, 0], [330, 150, 30, 1]]); }

  // ================= cemetery + Ikard's marker =================
  const cemLayer = () => layer('cem', g => { skyFor(g, 'day'); P2.mistyHills(g, 470, smoothPts(-PAD, W + PAD, 420, 30, 31, 8), '#a2a88e', '#b4b49a', { seed: 31, blur: 2, line: false });
    P2.meadow(g, 440, 720, { seed: 91, top: '#8aa45a', bot: '#5a7a3e', n: 5000, edge: x => 452 + Math.sin(x * .004) * 6 });
    for (const [x, sc] of [[-60, 1.2], [1200, 1]]) { ln(g, [[x, 520], [x + 8, 330]], 24); ln(g, [[x, 520], [x + 8, 330]], 16, '#5a4a3a'); leafMass(g, x, 290, 170 * sc, 110 * sc, x + 5, ['#3e5a2e', '#506e36', '#6a8a44', '#86a050']); }
    const r = rng(6); for (let i = 0; i < 12; i++) { const x = -100 + r() * 1480, y = 470 + r() * 50, s = .5 + (y - 470) / 100; sh(g, ['#b8b4ac', '#a8a49c', '#c8c4ba'][i % 3], 3, c => c.roundRect(x - 16 * s, y - 50 * s, 32 * s, 50 * s, [14 * s, 14 * s, 2, 2])); }
  });
  function cemetery(ctx, t, pan, o = {}) { put(ctx, cemLayer(), pan, .5); P2.clouds2(ctx, t, pan, [[100, 40, .7, 131, 3], [900, 60, .6, 132, 2]], 'day'); birds(ctx, t, [[0, 120, 25, 0]]); motes(ctx, t, 10, 9); }
  function stone(ctx, x, y, s, reveal = 1, o = {}) {   // granite upright with the inscription Goodnight wrote
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.save(); ctx.filter = 'blur(8px)'; sh(ctx, 'rgba(0,0,0,.35)', 0, c => c.ellipse(20, 6, 260, 26, 0, 0, TAU)); ctx.restore();
    sh(ctx, '#7a7a7e', 5, c => c.rect(-250, -40, 500, 44));
    const face = c => { c.moveTo(-210, -40); c.lineTo(-210, -500); c.quadraticCurveTo(0, -560, 210, -500); c.lineTo(210, -40); c.closePath(); };
    sh(ctx, '#8e8e94', 5, face); ctx.save(); ctx.beginPath(); face(ctx); ctx.clip(); ctx.fillStyle = grad(ctx, -210, 0, 210, 0, [[0, 'rgba(255,255,255,.22)'], [.5, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,0,.2)']]); ctx.fillRect(-220, -560, 440, 520);
    { const r = rng(5); for (let i = 0; i < 900; i++) { ctx.fillStyle = r() < .5 ? 'rgba(40,40,46,.35)' : 'rgba(230,230,236,.35)'; ctx.fillRect(-210 + r() * 420, -560 + r() * 520, 2, 2); } }
    ctx.restore();
    const L = ['BOSE IKARD', '', 'Served with me four years on the', 'Goodnight-Loving Trail, never shirked', 'a duty or disobeyed an order,', 'rode with me in many stampedes,', 'participated in three engagements', 'with Comanches.', 'Splendid behavior.', '', 'C. GOODNIGHT'];
    L.forEach((l, i) => { const k = clamp(reveal * L.length - i); if (k <= 0 || !l) return; ctx.save(); ctx.globalAlpha = k; const big = i === 0 || i === 10, hi = i === 8 && o.hi; txt(ctx, l, 1, -452 + i * 36 + 1, big ? DISP(38) : FONT(700, 22), 'rgba(255,255,255,.35)'); txt(ctx, l, 0, -452 + i * 36, big ? DISP(38) : FONT(700, 22), hi ? '#e8c25a' : '#2e2e34'); ctx.restore(); });
    ctx.restore();
  }

  // ================= trailside grave =================
  function grave(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, '#6a5038', 4, c => c.ellipse(0, 0, 120, 24, 0, PI, TAU)); const r = rng(3); for (let i = 0; i < 12; i++) sh(ctx, ['#9a948a', '#8a847a', '#aaa49a'][i % 3], 2.5, c => c.ellipse(-100 + i * 18, -6 - r() * 10, 12, 8, 0, 0, TAU));
    ln(ctx, [[0, -10], [0, -190]], 16); ln(ctx, [[0, -10], [0, -190]], 10, '#8a6a46'); ln(ctx, [[-56, -140], [56, -140]], 16); ln(ctx, [[-56, -140], [56, -140]], 10, '#8a6a46'); ctx.save(); ctx.translate(0, -186); ctx.scale(.42, .42); G.Guide.HATS.battered.behind(ctx, { hx: 0, yaw: 0 }); G.Guide.HATS.battered.draw(ctx, { hx: 0, yaw: 0 }); ctx.restore(); ctx.restore(); }

  // ================= rodeo arena + modern parade street =================
  const rodeoLayer = () => layer('rodeo', g => { skyFor(g, 'day'); for (let row = 0; row < 5; row++) { const y = 300 + row * 34; sh(g, '#7a6a5a', 3, c => c.rect(-PAD, y, W + PAD * 2, 30)); const r = rng(row + 1); for (let x = -PAD; x < W + PAD; x += 22) { sh(g, ['#c0392b', '#3a6a9a', '#e8c25a', '#f2ead8', '#5a7a3a'][Math.floor(r() * 5)], 0, c => c.roundRect(x, y + 4, 14, 22, 6)); sh(g, ['#f0c4a0', '#7a4e34', '#c88a5e', '#e2aa82'][Math.floor(r() * 4)], 0, circ(x + 7, y - 2, 6)); } }
    for (let x = -PAD; x < W + PAD; x += 60) { sh(g, ['#c0392b', '#f2ead8', '#3a6a9a'][(x / 60 | 0 + 9) % 3], 2, c => { c.moveTo(x, 280); c.lineTo(x + 60, 280); c.lineTo(x + 30, 300); c.closePath(); }); }
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#c89a62'], [1, '#a07040']]); g.fillRect(-PAD, 470, W + PAD * 2, 260); P2.grain(g, -PAD, 470, W + PAD * 2, 260, .45, 3, 'overlay', .8); fence(g, -PAD, W + PAD, 490, { h: 60, gap: 90, col: '#f2ead8' }); });
  function rodeo(ctx, t, pan, o = {}) { put(ctx, rodeoLayer(), pan, .5); motes(ctx, t, 12, 5); }
  const cityLayer = () => layer('city', g => { skyFor(g, 'day'); const r = rng(8); for (let i = 0; i < 18; i++) { const x = -PAD + i * 100 + r() * 30, h = 160 + r() * 240, w = 70 + r() * 50; sh(g, ['#9aa8b8', '#b8b0a4', '#8a98a8', '#c8bca8'][i % 4], 3, c => c.rect(x, 470 - h, w, h)); for (let yy = 470 - h + 14; yy < 460; yy += 22) for (let xx = x + 8; xx < x + w - 10; xx += 16) { g.fillStyle = 'rgba(60,80,110,.45)'; g.fillRect(xx, yy, 9, 12); } }
    P2.haze(g, 280, 480, 'rgba(250,244,236,', .4);
    sh(g, '#9a9a9e', 4, c => c.rect(-PAD, 470, W + PAD * 2, 60)); g.fillStyle = grad(g, 0, 530, 0, H, [[0, '#5a5a62'], [1, '#3e3e44']]); g.fillRect(-PAD, 530, W + PAD * 2, 200); for (let x = -PAD; x < W + PAD; x += 120) sh(g, '#e8e0c8', 0, c => c.rect(x, 640, 60, 8));
    for (let i = 0; i < 40; i++) { const x = -PAD + i * 42 + r() * 10; sh(g, ['#c0392b', '#3a6a9a', '#e8c25a', '#5a7a3a', '#f2ead8', '#8a4a8a'][i % 6], 2.5, c => c.roundRect(x, 480, 22, 40, 8)); sh(g, ['#5e3c28', '#f0c4a0', '#7a4e34', '#c88a5e', '#3e2a1e'][i % 5], 2.5, circ(x + 11, 472, 10)); } });
  function city(ctx, t, pan, o = {}) { put(ctx, cityLayer(), pan, .4); P2.clouds2(ctx, t, pan, [[100, 30, .7, 141, 4], [800, 50, .6, 142, 3]], 'day');
    if (o.banner) { const x = 640 - pan * .4; ln(ctx, [[x - 300, 220], [x - 300, 470]], 8); ln(ctx, [[x + 300, 220], [x + 300, 470]], 8); sh(ctx, '#b8322a', 4, c => c.rect(x - 290, 220, 580, 70)); txt(ctx, o.banner, x, 256, DISP(36), '#f6e2b6'); } }

  // ================= trail-drive maps =================
  const MS = 70, LON0 = -114, LAT1 = 46, LON1 = -84, LAT0 = 24, MW = (LON1 - LON0) * MS * .82, MH = (LAT1 - LAT0) * MS;
  const px = (lon, lat) => [(lon - LON0) * MS * .82, (LAT1 - lat) * MS];
  const STATES = {
    TX: [[-106.6, 32.0], [-103.06, 32.0], [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-98.0, 34.0], [-96.0, 33.8], [-94.04, 33.6], [-94.04, 31.0], [-93.8, 29.7], [-94.7, 29.3], [-96.8, 28.3], [-97.4, 27.4], [-97.2, 25.95], [-99.1, 26.4], [-100.3, 28.2], [-101.4, 29.8], [-102.4, 29.8], [-103.2, 29.0], [-104.5, 29.6], [-106.6, 31.8]],
    IT: [[-103.0, 37.0], [-94.6, 37.0], [-94.43, 35.4], [-94.48, 33.6], [-96.0, 33.8], [-98.0, 34.0], [-100.0, 34.56], [-100.0, 36.5], [-103.0, 36.5]],
    KS: [[-102.05, 40.0], [-95.3, 40.0], [-94.6, 39.1], [-94.6, 37.0], [-102.04, 37.0]],
    CO: [[-109.05, 41.0], [-102.05, 41.0], [-102.04, 37.0], [-109.05, 37.0]],
    NM: [[-109.05, 37], [-103.0, 37], [-103.06, 32], [-106.6, 32], [-108.2, 31.33], [-109.05, 31.33]],
    MO: [[-95.77, 40.58], [-91.4, 40.4], [-90.1, 38.8], [-89.1, 36.9], [-89.7, 36.0], [-90.4, 36.5], [-94.6, 36.5], [-94.6, 39.1], [-95.3, 40.0]],
    NE: [[-104.05, 43], [-98.5, 43], [-96.5, 42.5], [-95.3, 40], [-102.05, 40], [-102.05, 41], [-104.05, 41]],
    AR: [[-94.6, 36.5], [-90.1, 36.5], [-91.2, 33], [-94.04, 33.0], [-94.48, 33.6]],
    LA: [[-94.04, 33.0], [-91.2, 33.0], [-91.1, 31.0], [-89.7, 31.0], [-89.2, 29.3], [-91.3, 29.3], [-93.8, 29.7], [-94.04, 31.0]],
    IA: [[-96.6, 43.5], [-91.2, 43.5], [-90.2, 42.0], [-91.4, 40.4], [-95.77, 40.58], [-96.5, 42.5]],
    IL: [[-91.4, 40.4], [-90.2, 42.0], [-90.6, 42.5], [-87.8, 42.5], [-87.5, 41.7], [-87.5, 38.0], [-88.1, 37.5], [-89.1, 36.9], [-90.1, 38.8]],
    OK2: [], };
  const NAMES = { TX: ['TEXAS', -99.3, 31.3, 40], IT: ['INDIAN TERRITORY', -97.6, 35.4, 22], KS: ['KANSAS', -98.4, 38.5, 30], CO: ['COLORADO', -105.6, 39.1, 24], NM: ['NEW MEXICO', -106.0, 34.5, 20], MO: ['MISSOURI', -92.5, 38.4, 20], NE: ['NEBRASKA', -99.8, 41.6, 20], AR: ['ARKANSAS', -92.4, 34.9, 16], LA: ['LOUISIANA', -92.4, 31.2, 16], IA: ['IOWA', -93.5, 42.0, 16], IL: ['ILLINOIS', -89.2, 40.0, 16] };
  const RIVERS = [[[-106.6, 31.8], [-104.5, 29.6], [-103.2, 29.0], [-102.4, 29.8], [-101.4, 29.8], [-100.3, 28.2], [-99.1, 26.4], [-97.2, 25.95]],
    [[-103.0, 34.9], [-100.0, 34.56], [-98.0, 34.0], [-96.0, 33.8], [-94.04, 33.6], [-92.5, 31.2]],
    [[-104.0, 35.8], [-101.0, 35.6], [-98.0, 35.4], [-95.5, 35.4]],
    [[-105.9, 38.5], [-102.0, 38.0], [-99.6, 37.8], [-98.0, 38.2], [-97.3, 37.7], [-96.0, 36.4], [-95.5, 35.6]],
    [[-104.4, 35.6], [-104.2, 34.4], [-103.5, 32.4], [-102.4, 31.2], [-101.5, 29.8]],
    [[-101.0, 33.4], [-98.4, 32.8], [-97.0, 31.6], [-96.0, 30.0], [-95.3, 28.9]],
    [[-95.3, 40.0], [-94.6, 39.1], [-92.0, 38.8], [-90.2, 38.8]],
    [[-91.2, 43.5], [-90.6, 42.5], [-91.4, 40.4], [-90.2, 38.8], [-89.1, 36.9], [-91.2, 33.0], [-91.1, 31.0], [-89.5, 29.4]]];
  let mapCanvas = null;
  function mapCv() {
    if (mapCanvas) return mapCanvas; const c = document.createElement('canvas'); c.width = Math.ceil(MW); c.height = Math.ceil(MH); const g = c.getContext('2d');
    g.fillStyle = grad(g, 0, 0, 0, MH, [[0, '#d8c8a2'], [1, '#c9b48a']]); g.fillRect(0, 0, MW, MH);   // "unclaimed" parchment
    const poly = (pts, fill, lw = 0, col = '#6a5236', dash) => { g.beginPath(); pts.forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { g.lineWidth = lw; g.strokeStyle = col; g.setLineDash(dash || []); g.stroke(); g.setLineDash([]); } };
    // the Gulf
    g.fillStyle = '#9fb8b8'; g.beginPath(); [[-100, 24], [-97.2, 25.95], [-97.4, 27.4], [-96.8, 28.3], [-94.7, 29.3], [-93.8, 29.7], [-91.3, 29.3], [-89.2, 29.3], [-88.5, 30.4], [-86, 30.4], [-84, 30], [-84, 24]].forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.fill();
    const tint = { TX: '#ecdcb2', IT: '#e4d6b0', KS: '#e8dab6', CO: '#e0d2ae', NM: '#e2d4ae', MO: '#e6d8b4', NE: '#e2d6b2', AR: '#e4d6b2', LA: '#e4d6b2', IA: '#e2d6b2', IL: '#e4d8b6' };
    for (const k in tint) poly(STATES[k], tint[k]);
    P2.grain(g, 0, 0, MW, MH, .35, 5, 'multiply', 1.5);
    for (const k in tint) poly(STATES[k], null, 3, 'rgba(106,82,54,.75)', [10, 6]);
    poly(STATES.TX, null, 5, '#5a4026');
    g.strokeStyle = '#6f9bb0'; g.lineCap = 'round'; for (const r of RIVERS) { g.lineWidth = 4; g.beginPath(); r.forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); }
    for (const k in NAMES) { const [n, lo, la, sz] = NAMES[k], [x, y] = px(lo, la); g.save(); g.font = DISP(sz); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgba(90,64,38,.55)'; g.letterSpacing = '4px'; g.fillText(n, x, y); g.restore(); }
    { const [x, y] = px(-101.5, 27.0); txt(g, 'MEXICO', x, y, DISP(22), 'rgba(90,64,38,.45)'); const [gx, gy] = px(-91.5, 27.2); txt(g, 'GULF OF MEXICO', gx, gy, FONT(700, 18), 'rgba(40,70,80,.55)'); }
    // compass rose
    { const [x, y] = px(-112, 27); g.save(); g.translate(x, y); sh(g, '#e8d8b0', 3, circ(0, 0, 46)); for (let k = 0; k < 4; k++) { g.rotate(PI / 2); sh(g, k % 2 ? '#6a5236' : '#b8322a', 2, c => { c.moveTo(0, -42); c.lineTo(8, 0); c.lineTo(-8, 0); c.closePath(); }); } txt(g, 'N', 0, -58, DISP(18), '#5a4026'); g.restore(); }
    return (mapCanvas = c);
  }
  const PLACES = { 'San Antonio': [-98.5, 29.42], Austin: [-97.74, 30.27], 'Fort Worth': [-97.33, 32.75], Houston: [-95.37, 29.76], Abilene: [-97.21, 38.92], Ellsworth: [-98.23, 38.73], Wichita: [-97.34, 37.69], 'Dodge City': [-100.02, 37.75], Caldwell: [-97.61, 37.03], 'Kansas City': [-94.58, 39.1], Denver: [-104.99, 39.74], 'Fort Sumner': [-104.24, 34.47], Weatherford: [-97.8, 32.76], Pueblo: [-104.6, 38.25], Chicago: [-87.63, 41.88], 'St. Louis': [-90.2, 38.63], 'Fort Belknap': [-98.73, 33.15], Mississippi: [-89.6, 32.6] };
  const TRAILS = {
    chisholm: [[-98.5, 29.42], [-97.74, 30.27], [-97.33, 32.75], [-97.55, 33.85], [-97.96, 34.5], [-97.93, 35.86], [-97.61, 37.03], [-97.34, 37.69], [-97.21, 38.92]],
    western: [[-98.5, 29.42], [-99.14, 30.05], [-99.23, 32.93], [-99.27, 34.65], [-99.57, 36.57], [-100.02, 37.75]],
    goodnight: [[-98.73, 33.15], [-100.6, 32.0], [-102.45, 31.23], [-103.6, 32.6], [-104.24, 34.47], [-104.7, 36.2], [-104.6, 38.25], [-104.99, 39.74]],
    rail: [[-87.63, 41.88], [-90.2, 38.63], [-94.58, 39.1], [-95.68, 39.05], [-96.83, 39.03], [-97.21, 38.92]],
    railLate: [[-97.21, 38.92], [-98.23, 38.73], [-100.02, 37.75]],
    railTX: [[-94.58, 39.1], [-95.4, 37.0], [-96.0, 33.8], [-96.8, 32.8], [-97.33, 32.75]] };
  // view = { lon, lat, z } → screen
  function toS(lon, lat, v) { const [x, y] = px(lon, lat), [fx, fy] = px(v.lon, v.lat); return [640 + (x - fx) * v.z, 360 + (y - fy) * v.z]; }
  function map(ctx, t, v) { const c = mapCv(), [fx, fy] = px(v.lon, v.lat); ctx.save(); ctx.fillStyle = '#c9b48a'; ctx.fillRect(0, 0, W, H); ctx.drawImage(c, 640 - fx * v.z, 360 - fy * v.z, MW * v.z, MH * v.z); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; const vg = ctx.createRadialGradient(640, 360, 300, 640, 360, 820); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(120,90,50,.35)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function route(ctx, pts, v, k, o = {}) { if (k <= 0) return; const S = pts.map(p => toS(p[0], p[1], v)); let L = 0; const segs = []; for (let i = 1; i < S.length; i++) { const d = Math.hypot(S[i][0] - S[i - 1][0], S[i][1] - S[i - 1][1]); segs.push(d); L += d; }
    let rem = L * clamp(k); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const draw = (w, col, dash) => { let r2 = rem; ctx.beginPath(); ctx.moveTo(...S[0]); for (let i = 1; i < S.length && r2 > 0; i++) { const f = Math.min(1, r2 / segs[i - 1]); ctx.lineTo(lerp(S[i - 1][0], S[i][0], f), lerp(S[i - 1][1], S[i][1], f)); r2 -= segs[i - 1]; } ctx.lineWidth = w; ctx.strokeStyle = col; ctx.setLineDash(dash || []); ctx.stroke(); };
    if (o.rail) { draw(10, OUT); draw(6, '#e8e0cc'); draw(6, '#3a3a3e', [6, 10]); } else { draw((o.w || 7) + 5, 'rgba(255,250,235,.85)'); draw(o.w || 7, o.col || '#b8322a', o.dash ? [14, 10] : null); }
    ctx.restore(); if (o.label && k > .5) K.tag(ctx, o.label, ...(o.labelAt ? toS(o.labelAt[0], o.labelAt[1], v) : S[Math.floor(S.length / 2)]), k * 2, .5, { size: o.size || 20, fill: o.labelFill }); }
  function pin(ctx, place, v, lt, t0, o = {}) { const k = K.pop(lt, t0); if (k <= 0) return; const [x, y] = toS(...(Array.isArray(place) ? place : PLACES[place]), v); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); sh(ctx, o.col || '#b8322a', 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-16, -22, -14, -34); c.arc(0, -34, 14, PI, 0); c.quadraticCurveTo(16, -22, 0, 0); c.closePath(); }); sh(ctx, '#fff', 0, circ(0, -34, 5)); ctx.restore();
    if (o.label !== false) K.tag(ctx, o.label || place, x + (o.dx ?? 0), y + (o.dy ?? -66), lt, t0 + .1, { size: o.size || 20 }); }
  function cattleIcon(ctx, x, y, s, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); sh(ctx, '#7a4a2e', 2.5, c => c.ellipse(0, 0, 16, 9, 0, 0, TAU)); sh(ctx, '#7a4a2e', 2, c => c.ellipse(15, -5, 7, 6, 0, 0, TAU)); ctx.strokeStyle = OUT; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(4, -10); ctx.quadraticCurveTo(15, -6, 28, -16); ctx.stroke(); ctx.strokeStyle = '#f2e6c8'; ctx.lineWidth = 1.6; ctx.stroke(); for (const lx of [-10, 10]) ln(ctx, [[lx, 6], [lx, 16]], 3); ctx.restore(); }

  G.CS = { longShadow, SKY, prairie, foreground, fence, movieSet, studio, camp, wagon, river, waterline, cowtown, saloon, ranch, cemetery, stone, grave, rodeo, city, map, toS, route, pin, PLACES, TRAILS, cattleIcon, txt, FONT, DISP };
})(window);
