/* Merer's Diary — sets (painted v4 look). G.ES:
 *   nile(ctx, t, pan, o)      wide brown flood river; o.v 'dawn'|'day'|'noon'|'gold'|'dusk'|'night', o.mist, o.cliff ('far'|'near'), o.giza (pyramid on the far bank)
 *   boat(ctx, x, y, s, t, o)  Old Kingdom cargo boat (o.blocks, o.sail 0..1, o.rowers, o.sleepers, o.dir, o.cobra)
 *   ew(ctx, x, y, s, t, o)    small Egyptian worker for crowds (o.pose 'stand'|'walk'|'pull'|'push'|'carry'|'chisel'|'row'|'sleep'|'pour', o.dir)
 *   cliff(ctx, t, pan, o)     the Tura limestone quarry face (fresh chisel marks, quarried steps, blocks at the foot)
 *   pyramid(ctx, x, y, w, o)  o.k (0..1 built), o.casing, o.ramp, o.glow
 *   giza(ctx, t, pan, o)      the plateau with the harbor basin in front (o.v, o.k build level, o.boats)
 *   sphinx(ctx, x, y, s)
 *   town(ctx, t, pan, o)      Heit el-Ghurab: galleries, bakeries with smoke, cattle pens, the Wall of the Crow
 *   cemetery(ctx, t, pan, o)  builders' tombs (mud brick, small pyramids), dusk
 *   jarf(ctx, t, pan, o)      Wadi al-Jarf: Red Sea shore, rock galleries sealed with blocks
 *   museum(ctx, t, o), lab(ctx, t, o), hatnub(ctx, t, pan, o), chamber(ctx, t, o), desertRamp(ctx, t, pan, o)
 *   map(ctx, t, view) + toS(lon, lat, view) + route(ctx, pts, view, k, o) + pin(ctx, place, view, lt, t0, o)  Egypt maps */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, K = G.VK, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, rays, hills, smoothPts, birds, motes, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const FONT = (w, s) => `${w} ${s}px Fredoka`, DISP = s => `${s}px "Luckiest Guy"`;
  const txt = (g, s, x, y, font, col = OUT, align = 'center') => { g.font = font; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const mul = (h, k) => G.Guide.hexMul(h, k), pc = col => ({ cols: [col, mul(col, .9), mul(col, .96), mul(col, .82)] });

  // ================= skies =================
  const SKY = {
    dawn: [[0, '#4a5a8c'], [.38, '#b48aa6'], [.62, '#f2b086'], [1, '#ffdcae']], day: [[0, '#2a72c8'], [.45, '#62a6e0'], [.75, '#b4daf0'], [1, '#f2ead0']],
    noon: [[0, '#2a6cc4'], [.45, '#5ea2e2'], [.78, '#b2d8f2'], [1, '#fbe6b4']], gold: [[0, '#3e6ab0'], [.38, '#8fb0d6'], [.6, '#f2c890'], [.8, '#ffb86a'], [1, '#ffd890']],
    dusk: [[0, '#2e2a6e'], [.3, '#7a4a94'], [.55, '#e0705a'], [.75, '#ff9e56'], [1, '#ffd48a']], night: [[0, '#0a1230'], [.55, '#1c2a55'], [1, '#34406a']] };
  const SUN = { dawn: [1040, 330], day: [980, 120], noon: [640, -60], gold: [300, 300], dusk: [960, 340], night: [1030, 110] };
  function skyFor(g, v) {
    P.sky(g, SUN[v] || SUN.day, SKY[v] || SKY.day, v === 'night' ? 0 : v === 'noon' ? .9 : .8);
    if (v === 'night') { const r = rng(11); for (let i = 0; i < 520; i++) { const x = -PAD + r() * (W + PAD * 2), y = r() * 420, b = r(); g.fillStyle = `rgba(255,250,235,${.25 + b * .75})`; g.beginPath(); g.arc(x, y, b > .93 ? 2.1 : 1.1, 0, TAU); g.fill(); }
      const m = g.createRadialGradient(1030, 110, 10, 1030, 110, 160); m.addColorStop(0, 'rgba(255,248,220,.5)'); m.addColorStop(1, 'rgba(255,248,220,0)'); g.fillStyle = m; g.fillRect(860, -60, 340, 340); sh(g, '#f8f4e4', 0, circ(1030, 110, 46)); }
    P2.grain(g, -PAD, 0, W + PAD * 2, 460, .16, 7, 'soft-light', 1.5);
  }
  const CLOUDS = [[60, 40, .9, 3, 4], [520, 80, .7, 5, 3], [900, 30, 1.0, 7, 5], [1300, 70, .8, 9, 4]];
  const cloudTone = v => v === 'dusk' || v === 'gold' ? 'dusk' : v === 'dawn' ? 'warm' : 'day';

  // ================= shared painters =================
  function palm(g, x, y, s, seed = 1, sway = 0) {   // date palm: ringed curved trunk + drooping fronds + date clusters
    const r = rng(seed), lean = (r() - .5) * .5, h = 150 * s, top = [x + lean * h * .6 + sway, y - h];
    g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + lean * h * .2, y - h * .5, top[0], top[1]); g.lineWidth = 15 * s; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 9 * s; g.strokeStyle = '#8a6a44'; g.stroke();
    g.strokeStyle = 'rgba(60,40,20,.5)'; g.lineWidth = 1.5; for (let i = 1; i < 10; i++) { const u = i / 10, px = lerp(x, top[0], u) + Math.sin(u * PI) * lean * h * .1, py = lerp(y, top[1], u); g.beginPath(); g.moveTo(px - 5 * s, py); g.lineTo(px + 5 * s, py - 2); g.stroke(); }
    for (let i = 0; i < 9; i++) { const a = -PI + i / 8 * PI + (r() - .5) * .3, L = (60 + r() * 30) * s, ex = top[0] + Math.cos(a) * L, ey = top[1] + Math.sin(a) * L * .55 + L * .45;
      g.beginPath(); g.moveTo(top[0], top[1]); g.quadraticCurveTo(top[0] + Math.cos(a) * L * .6, top[1] - 20 * s, ex, ey); g.lineWidth = 9 * s; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 6 * s; g.strokeStyle = i % 2 ? '#3e7a34' : '#4e8e3a'; g.stroke();
      for (let k = 1; k < 7; k++) { const u = k / 7, qx = lerp(top[0], ex, u), qy = lerp(top[1], ey, u) - Math.sin(u * PI) * 14 * s; g.beginPath(); g.moveTo(qx, qy); g.lineTo(qx + 6 * s, qy + 12 * s); g.lineWidth = 2.4 * s; g.strokeStyle = '#2e6a2a'; g.stroke(); } }
    sh(g, '#b8742e', 1.5, circ(top[0] - 4 * s, top[1] + 10 * s, 6 * s)); sh(g, '#a8642a', 1.5, circ(top[0] + 6 * s, top[1] + 12 * s, 5 * s));
  }
  function reeds(ctx, x, y, n, h, t, seed, o = {}) {   // papyrus stems with umbrella heads + reeds, swaying
    const r = rng(seed); for (let i = 0; i < n; i++) { const xx = x + r() * (o.w || 200), hh = h * (.6 + r() * .5), sw = Math.sin(t * 1.3 + i * .7 + seed) * 6, top = [xx + sw, y - hh];
      ctx.beginPath(); ctx.moveTo(xx, y); ctx.quadraticCurveTo(xx + sw * .3, y - hh * .5, top[0], top[1]); ctx.lineWidth = 3.5; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = i % 3 ? '#5a8a3a' : '#7a9a44'; ctx.stroke();
      if (r() < .55) { for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(top[0] + k * 4.5, top[1] - 14 + Math.abs(k) * 1.5); ctx.lineWidth = 1.6; ctx.strokeStyle = '#7aa24a'; ctx.stroke(); } } }
  }
  const strataBands = (g, x0, x1, y0, y1, seed, base = '#e8e0cc') => {   // horizontal limestone beds with soft shading
    const r = rng(seed); let y = y0; while (y < y1) { const h = 14 + r() * 26; g.fillStyle = mul(base, .9 + r() * .12); g.fillRect(x0, y, x1 - x0, h); g.strokeStyle = 'rgba(120,100,70,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, y + h); for (let x = x0; x <= x1; x += 40) g.lineTo(x, y + h + Math.sin(x * .05 + seed) * 2); g.stroke(); y += h; } };

  // ================= the Nile =================
  const farBank = (v, o) => layer(`nfar-${v}-${o.cliff || ''}-${o.giza ? 1 : 0}-${o.h || 330}`, g => {
    skyFor(g, v); const hz = o.h || 330, dark = v === 'night' ? .4 : v === 'dusk' ? .7 : 1;
    // desert hills far away + a line of palms and fields on the far bank
    P.hills(g, hz, [[-PAD, hz - 30], [200, hz - 54], [520, hz - 34], [820, hz - 62], [1100, hz - 40], [W + PAD, hz - 52]], mul('#e6c896', dark), mul('#d4ae78', dark), 0);
    if (o.giza) { const gx = o.gizaX || 900; [[gx, 150], [gx - 150, 120], [gx - 260, 70]].forEach(([x, w]) => { g.fillStyle = mul('#e8d4a6', dark); g.beginPath(); g.moveTo(x - w / 2, hz - 26); g.lineTo(x, hz - 26 - w * .64); g.lineTo(x + w / 2, hz - 26); g.closePath(); g.fill(); g.fillStyle = 'rgba(120,80,40,.2)'; g.beginPath(); g.moveTo(x, hz - 26 - w * .64); g.lineTo(x + w / 2, hz - 26); g.lineTo(x + w * .08, hz - 26); g.closePath(); g.fill(); }); }
    if (o.cliff === 'far') { g.fillStyle = mul('#efe6d2', dark); g.beginPath(); g.moveTo(-PAD, hz); g.lineTo(-PAD, hz - 150); g.lineTo(300, hz - 160); g.lineTo(420, hz - 120); g.lineTo(520, hz - 20); g.lineTo(520, hz); g.closePath(); g.fill(); strataBands(g, -PAD, 520, hz - 150, hz, 4, mul('#efe6d2', dark)); }
    g.fillStyle = mul('#5e7a3a', dark); g.fillRect(-PAD, hz - 14, W + PAD * 2, 16);
    const r = rng(3); for (let x = -PAD; x < W + PAD; x += 26 + r() * 40) if (!(o.cliff === 'far' && x < 520)) palm(g, x, hz - 4, .32 + r() * .18, Math.floor(r() * 99));
    P2.haze(g, hz - 60, hz + 10, v === 'dusk' ? 'rgba(255,190,140,' : 'rgba(240,226,200,', .45);
  });
  const nearBank = (v, o) => layer(`nnear2-${v}-${o.cliff || ''}-${o.bankY || 600}`, g => {
    const y0 = o.bankY || 600, dark = v === 'night' ? .4 : v === 'dusk' ? .72 : 1;
    if (o.cliff === 'near') { const CL = [[-PAD, 40], [20, 26], [120, 20], [170, 54], [236, 70], [250, 150], [292, 172], [300, 268], [338, 292], [352, y0 - 120], [372, y0 - 60], [420, H]]; g.fillStyle = mul('#ece4d0', dark); g.beginPath(); g.moveTo(-PAD, H); CL.forEach(p => g.lineTo(p[0], p[1])); g.closePath(); g.fill(); strataBands(g, -PAD, 420, 20, H, 9, mul('#ece4d0', dark));
      g.save(); g.beginPath(); g.moveTo(-PAD, H); CL.forEach(p => g.lineTo(p[0], p[1])); g.closePath(); g.clip(); for (const [a, b] of [[CL[3], CL[5]], [CL[5], CL[7]], [CL[7], CL[9]]]) { g.fillStyle = 'rgba(255,250,236,.6)'; g.fillRect(a[0] - 120, b[1] - 6, 120 + (b[0] - a[0]), 8); }
      const r = rng(5); g.strokeStyle = 'rgba(110,90,60,.45)'; g.lineWidth = 2; for (let i = 0; i < 220; i++) { const x = -PAD + r() * 640, y = 30 + r() * 660; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 6, y + 9); g.stroke(); }
      g.fillStyle = 'rgba(80,60,40,.18)'; g.fillRect(200, 0, 400, H); g.restore();
      g.beginPath(); CL.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke(); }
    g.fillStyle = grad(g, 0, y0, 0, H, [[0, mul('#8a6a44', dark)], [1, mul('#5a4228', dark)]]); g.beginPath(); g.moveTo(-PAD, y0 + 10); for (let x = -PAD; x <= W + PAD; x += 60) g.lineTo(x, y0 + Math.sin(x * .013) * 10); g.lineTo(W + PAD, H); g.lineTo(-PAD, H); g.closePath(); g.fill();
    g.beginPath(); for (let x = -PAD; x <= W + PAD; x += 60) x === -PAD ? g.moveTo(x, y0 + Math.sin(x * .013) * 10) : g.lineTo(x, y0 + Math.sin(x * .013) * 10); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke();
    P2.grain(g, -PAD, y0, W + PAD * 2, H - y0, .4, 13, 'overlay', .8); P2.pebbles(g, -PAD, y0 + 20, W + PAD * 2, H - y0 - 20, 60, 4, pc(mul('#a8885e', dark)));
  });
  function water(ctx, t, top, bot, v, o = {}) {   // flood-brown water: sky reflection near the far bank, current streaks, sun glints
    const dark = v === 'night' ? .35 : v === 'dusk' ? .75 : 1;
    ctx.fillStyle = grad(ctx, 0, top, 0, bot, [[0, v === 'dusk' ? '#c0806a' : v === 'dawn' ? '#b89a8a' : mul('#a89070', dark)], [.25, mul('#8e7450', dark)], [1, mul('#6a5236', dark)]]); ctx.fillRect(0, top, W, bot - top);
    const r = rng(8); ctx.lineCap = 'round'; for (let i = 0; i < 90; i++) { const u = r(), y = lerp(top + 6, bot - 4, u * u), L = (20 + r() * 70) * (.4 + u), x = ((r() * (W + 400) + t * (20 + r() * 26) * (o.flow ?? 1) * (.4 + u)) % (W + 400)) - 200;
      ctx.strokeStyle = `rgba(240,226,196,${(.1 + .22 * Math.abs(Math.sin(t * .7 + i))) * (v === 'night' ? .4 : 1)})`; ctx.lineWidth = 1.2 + u * 2.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y); ctx.stroke(); }
    const sun = SUN[v] || SUN.day; if (v !== 'night' && sun[1] > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 26; i++) { const y = top + 8 + i * (bot - top) / 28, w = 30 + i * 6, x = sun[0] + Math.sin(t * 2 + i * 1.7) * 16; ctx.fillStyle = `rgba(255,236,190,${.28 - i * .008})`; ctx.fillRect(x - w / 2, y, w, 2.5); } ctx.restore(); }
  }
  function nile(ctx, t, pan, o = {}) {
    const v = o.v || 'day', hz = o.h || 330; put(ctx, farBank(v, o), pan, .2);
    P2.clouds2(ctx, t, pan, CLOUDS.map(c => [c[0], c[1] * (hz / 330), c[2] * .8, c[3], c[4]]), cloudTone(v));
    if (o.birds !== false) birds(ctx, t, [[100, 120, 22, 0], [400, 90, 18, 2], [700, 150, 26, 4]]);
    water(ctx, t, hz, o.bankY || 600, v, o);
    if (o.near !== false) put(ctx, nearBank(v, o), pan, 1);
    if (o.mist) { ctx.save(); for (let i = 0; i < 6; i++) { const x = ((i * 300 + t * 12) % (W + 600)) - 300; ctx.globalAlpha = .28 * o.mist; ctx.fillStyle = grad(ctx, 0, hz - 40, 0, hz + 140, [[0, 'rgba(255,244,232,0)'], [.5, 'rgba(255,244,232,1)'], [1, 'rgba(255,244,232,0)']]); ctx.beginPath(); ctx.ellipse(x, hz + 40, 360, 70, 0, 0, TAU); ctx.fill(); } ctx.restore(); }
    if (o.reeds !== false && o.near !== false) { reeds(ctx, -40 - pan, (o.bankY || 600) + 6, 26, 90, t, 3, { w: 260 }); reeds(ctx, 1040 - pan, (o.bankY || 600) + 6, 22, 80, t, 7, { w: 280 }); }
  }

  // ================= small Egyptian workers (crowds) =================
  const SK = ['#a8683e', '#8a5434', '#c08458', '#9a5e38', '#b5724a', '#7a4a2e'];
  function ew(ctx, x, y, s, t, o = {}) {
    const r = rng(o.seed || 1), skin = o.skin || SK[(o.seed || 1) % SK.length], dir = o.dir || 1, pose = o.pose || 'stand', ph = (o.seed || 1) * 1.3;
    const cyc = t * (o.speed || 6) + ph, walk = pose === 'walk' || pose === 'pull' || pose === 'push' || pose === 'carry' ? 1 : 0, sw = Math.sin(cyc) * walk, bob = Math.abs(Math.sin(cyc)) * 2 * walk;
    const lean = pose === 'pull' ? .42 : pose === 'push' ? .3 : pose === 'chisel' ? .15 : 0;
    ctx.save(); ctx.translate(x, y - bob); ctx.scale(s * dir, s);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(0, 2, 18, 4, 0, 0, TAU); ctx.fill(); ctx.restore();
    if (pose === 'sleep') {   // curled on his side under a linen sheet: shoulder + hip bumps, folds, feet poking out, head on an arm
      const br = Math.sin(t * 1.3 + ph) * .8; sh(ctx, skin, 2, c => c.ellipse(34, -4, 6, 4, 0, 0, TAU));
      sh(ctx, '#efe6d2', 2.6, c => { c.moveTo(-26, 0); c.quadraticCurveTo(-30, -18 - br, -12, -20 - br); c.quadraticCurveTo(4, -14, 14, -18 - br * .5); c.quadraticCurveTo(32, -18, 34, 0); c.closePath(); });
      ctx.strokeStyle = 'rgba(120,100,70,.45)'; ctx.lineWidth = 1.3; for (const fx of [-10, 4, 20]) { ctx.beginPath(); ctx.moveTo(fx, -16); ctx.quadraticCurveTo(fx + 4, -8, fx + 2, 0); ctx.stroke(); }
      sh(ctx, skin, 2, c => c.ellipse(-36, -5, 10, 5, 0, 0, TAU)); sh(ctx, skin, 2.2, circ(-32, -14, 8.5)); sh(ctx, '#1e1814', 0, c => c.arc(-33, -16, 8.5, PI * .8, PI * 2.05)); ln(ctx, [[-29, -13], [-25, -13]], 1.4);
      ctx.restore(); return; }
    const legs = [[-5, sw * 7], [5, -sw * 7]]; for (const [lx, d] of legs) { ln(ctx, [[lx * .8, -24], [lx + d, -2]], 7.5); ln(ctx, [[lx * .8, -24], [lx + d, -2]], 4.5, skin); }
    ctx.save(); ctx.translate(0, -26); ctx.rotate(lean);
    const armA = pose === 'pull' ? [[16, -14], [26, -12]] : pose === 'push' ? [[18, -18], [22, -20]] : pose === 'carry' ? [[10, -46], [-10, -46]] : pose === 'chisel' ? [[18, -16 + Math.sin(t * 8 + ph) * 8], [16, -10]] : pose === 'row' ? [[16 + Math.sin(t * 2 + ph) * 8, -10], [12 + Math.sin(t * 2 + ph) * 8, -8]] : pose === 'pour' ? [[18, -20], [14, -24]] : [[-10, -2 + sw * 4], [10, -2 - sw * 4]];
    ln(ctx, [[-6, -22], armA[1]], 7); ln(ctx, [[-6, -22], armA[1]], 4.2, skin);
    sh(ctx, skin, 2.4, c => { c.moveTo(-10, 0); c.quadraticCurveTo(-13, -22, 0, -26); c.quadraticCurveTo(13, -22, 10, 0); c.closePath(); });
    sh(ctx, o.kilt || '#f2ead6', 2.2, c => { c.moveTo(-11, -4); c.lineTo(11, -4); c.lineTo(13, 12); c.quadraticCurveTo(0, 15, -13, 12); c.closePath(); });
    ln(ctx, [[6, -22], armA[0]], 7); ln(ctx, [[6, -22], armA[0]], 4.2, skin);
    if (pose === 'carry') sh(ctx, '#e8dcc0', 2.2, c => c.roundRect(-14, -66, 28, 18, 3));
    if (pose === 'chisel') { ln(ctx, [[armA[0][0], armA[0][1]], [armA[0][0] + 4, armA[0][1] - 16]], 3, '#8a5a32'); sh(ctx, '#a06a3a', 1.5, c => c.roundRect(armA[0][0] - 2, armA[0][1] - 24, 12, 10, 3)); }
    if (pose === 'row') ln(ctx, [[armA[0][0], armA[0][1]], [armA[0][0] + 26, armA[0][1] + 40]], 3.2, '#8a6a44');
    if (pose === 'pour') { sh(ctx, '#b8653a', 2, c => c.ellipse(24, -26, 7, 10, -1, 0, TAU)); ctx.strokeStyle = 'rgba(160,200,220,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(30, -28); ctx.quadraticCurveTo(40, -10, 38, 26); ctx.stroke(); }
    const hy = -36; sh(ctx, skin, 0, c => c.rect(-3, -30, 6, 6)); sh(ctx, skin, 2.4, circ(0, hy, 10));
    if (o.cap || r() < .35) sh(ctx, '#f2ead6', 2, c => { c.arc(0, hy - 1, 11, PI, TAU); c.closePath(); }); else sh(ctx, '#1e1814', 0, c => { c.arc(0, hy - 2, 10.5, PI * .95, PI * 2.05); c.closePath(); });
    sh(ctx, OUT, 0, circ(4, hy, 1.5));
    ctx.restore(); ctx.restore();
  }

  // ================= the boat =================
  function boat(ctx, x, y, s, t, o = {}) {
    const dir = o.dir || 1, bob = Math.sin(t * 1.1 + (o.ph || 0)) * 3 * (o.bob ?? 1), roll = Math.sin(t * .9 + (o.ph || 0)) * .01 * (o.bob ?? 1);
    ctx.save(); ctx.translate(x, y + bob); ctx.rotate(roll); ctx.scale(s * dir, s);
    // reflection + wake
    ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#3a2a1a'; ctx.beginPath(); ctx.ellipse(0, 18, 380, 22, 0, 0, TAU); ctx.fill(); ctx.restore();
    // mast + sail (behind the hull top)
    const sail = o.sail ?? 0;
    if (o.mast !== false) { ln(ctx, [[-30, -10], [-6, -250]], 10); ln(ctx, [[-30, -10], [-6, -250]], 6, '#8a6a44'); ln(ctx, [[18, -10], [-6, -250]], 10); ln(ctx, [[18, -10], [-6, -250]], 6, '#8a6a44');
      if (sail > 0) { const top = -246, bot = lerp(-236, -40, sail), bil = (14 + Math.sin(t * 1.5) * 6) * sail, mid = (top + bot) / 2;   // tall linen sail bellying in the wind, seams, shading
        const sp = c => { c.moveTo(-70, top); c.lineTo(60, top); c.quadraticCurveTo(66 + bil, mid, 60, bot); c.lineTo(-70, bot); c.quadraticCurveTo(-64 + bil, mid, -70, top); c.closePath(); };
        ctx.save(); ctx.beginPath(); sp(ctx); ctx.fillStyle = grad(ctx, -70, 0, 70, 0, [[0, '#d8c8a4'], [.45, '#f2e6c8'], [1, '#c8b48a']]); ctx.fill(); ctx.clip(); ctx.strokeStyle = 'rgba(120,96,56,.35)'; ctx.lineWidth = 2; for (let k = 1; k < 6; k++) { const yy = lerp(top, bot, k / 6); ctx.beginPath(); ctx.moveTo(-70, yy); ctx.quadraticCurveTo(0 + bil * .6, yy + 4, 70, yy); ctx.stroke(); } for (const xx of [-30, 10]) { ctx.beginPath(); ctx.moveTo(xx, top); ctx.quadraticCurveTo(xx + bil, mid, xx, bot); ctx.stroke(); } ctx.restore();
        ctx.beginPath(); sp(ctx); ctx.lineWidth = 3.5; ctx.strokeStyle = OUT; ctx.stroke();
        ln(ctx, [[-76, top], [66, top]], 7, '#6a4a2a'); ln(ctx, [[-76, bot], [66, bot]], 6, '#6a4a2a'); }
      else { ln(ctx, [[-76, -240], [66, -240]], 7, '#6a4a2a'); sh(ctx, '#ece2c8', 2.5, c => c.roundRect(-74, -250, 140, 16, 8)); }
      ln(ctx, [[-6, -250], [-300, -30]], 2, 'rgba(60,40,20,.7)'); ln(ctx, [[-6, -250], [300, -40]], 2, 'rgba(60,40,20,.7)'); }
    // hull: long and shallow, ends sweeping up; plank lines; hogging truss on posts
    const hull = c => { c.moveTo(-330, -60); c.quadraticCurveTo(-300, 8, -170, 14); c.lineTo(170, 14); c.quadraticCurveTo(300, 8, 340, -74); c.quadraticCurveTo(300, -14, 200, -14); c.lineTo(-200, -14); c.quadraticCurveTo(-290, -10, -330, -60); c.closePath(); };
    sh(ctx, '#9a6a3e', 4.5, hull); ctx.save(); ctx.beginPath(); hull(ctx); ctx.clip(); ctx.strokeStyle = 'rgba(60,36,16,.4)'; ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-330, -20 + k * 8); ctx.quadraticCurveTo(0, -4 + k * 6, 340, -30 + k * 8); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,220,160,.18)'; ctx.fillRect(-340, -16, 680, 6); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-340, 4, 680, 14); ctx.restore();
    for (const px of [-200, 0, 200]) ln(ctx, [[px, -14], [px, -44]], 5, '#6a4a2a'); ctx.beginPath(); ctx.moveTo(-300, -40); ctx.quadraticCurveTo(-100, -56, 0, -46); ctx.quadraticCurveTo(100, -56, 310, -50); ctx.lineWidth = 3; ctx.strokeStyle = '#c8aa70'; ctx.stroke();
    // prow ornament: the royal cobra (uraeus) rearing up
    if (o.cobra !== false) { ctx.save(); ctx.translate(336, -76); sh(ctx, '#e0b440', 3, c => { c.moveTo(0, 0); c.quadraticCurveTo(14, -10, 6, -30); c.quadraticCurveTo(-4, -44, 8, -52); c.quadraticCurveTo(22, -48, 18, -36); c.quadraticCurveTo(16, -20, 10, -6); c.closePath(); }); sh(ctx, '#e0b440', 2.5, c => c.ellipse(14, -44, 10, 13, 0, 0, TAU)); sh(ctx, OUT, 0, circ(18, -48, 2)); ctx.restore(); }
    // steering oars at the stern
    ln(ctx, [[-290, -54], [-370, 30]], 8); ln(ctx, [[-290, -54], [-370, 30]], 4.5, '#8a6a44'); sh(ctx, '#8a6a44', 2.5, c => c.ellipse(-372, 30, 9, 20, .5, 0, TAU));
    // cargo: limestone blocks on the deck
    const nb = o.blocks ?? 3; for (let i = 0; i < nb; i++) { const bx = -150 + i * (300 / Math.max(1, nb)) + 10, bw = 74, bh = 48; sh(ctx, '#ece4d0', 3.5, c => c.rect(bx, -14 - bh, bw, bh)); ctx.fillStyle = 'rgba(120,100,70,.22)'; ctx.fillRect(bx + bw * .62, -14 - bh, bw * .38, bh); ctx.strokeStyle = 'rgba(110,90,60,.4)'; ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(bx + 8 + k * 16, -14 - bh + 6); ctx.lineTo(bx + 14 + k * 16, -14 - bh + 14); ctx.stroke(); } }
    // crew
    const nr = o.rowers || 0; for (let i = 0; i < nr; i++) ew(ctx, -240 + i * (480 / Math.max(1, nr)), -14, 1.15, t, { pose: 'row', seed: i + 3, dir: -1 });
    const ns = o.sleepers || 0; for (let i = 0; i < ns; i++) ew(ctx, -250 + (i % 6) * 80 + (i > 5 ? 40 : 0), -14 - (i > 5 ? 6 : 0), 1.1, t, { pose: 'sleep', seed: i + 1 });
    ctx.restore();
  }

  // ================= the Tura cliff / quarry =================
  const cliffLayer = v => layer('tura2-' + v, g => {
    skyFor(g, v); const dark = v === 'dusk' ? .8 : 1, r = rng(21);
    const edge = [[-PAD, 70], [60, 58], [200, 50], [330, 72], [520, 64], [640, 48], [760, 40], [900, 62], [1040, 70], [1160, 52], [W + PAD, 54]];
    const top = c => { c.moveTo(-PAD, 480); edge.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(W + PAD, 480); c.closePath(); };
    g.save(); g.beginPath(); top(g); g.clip();
    g.fillStyle = grad(g, 0, 40, 0, 480, [[0, mul('#f4ecd8', dark)], [.6, mul('#e6dac0', dark)], [1, mul('#d2c29e', dark)]]); g.fillRect(-PAD, 0, W + PAD * 2, 480);
    strataBands(g, -PAD, W + PAD, 40, 480, 17, mul('#efe6d0', dark)); P2.grain(g, -PAD, 40, W + PAD * 2, 440, .35, 27, 'overlay', 1);
    // vertical joints + weathering streaks
    for (let i = 0; i < 14; i++) { const x = -PAD + r() * (W + PAD * 2); g.strokeStyle = 'rgba(110,90,60,.35)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(x, 40); for (let y = 40; y < 480; y += 30) g.lineTo(x + (r() - .5) * 10, y); g.stroke(); g.fillStyle = 'rgba(150,120,80,.12)'; g.fillRect(x, 40, 18, 440); }
    // quarried terraces: each a step back into the cliff — lit top face, shaded riser, cut channels around half-freed blocks
    for (const [x, y, w, h] of [[120, 290, 300, 190], [460, 330, 220, 150], [740, 250, 330, 230], [1110, 320, 260, 160]]) {
      g.fillStyle = mul('#cdbc98', dark); g.fillRect(x, y, w, h); g.fillStyle = mul('#f8f2e4', dark); g.fillRect(x, y, w, 16); g.fillStyle = 'rgba(80,60,40,.28)'; g.fillRect(x, y + 16, 14, h - 16);
      for (let b = 0; b < Math.floor(w / 92); b++) { const bx = x + 26 + b * 92, by = y + h - 70; g.fillStyle = 'rgba(70,50,30,.45)'; g.fillRect(bx - 6, by - 6, 6, 76); g.fillRect(bx - 6, by - 6, 86, 6); g.fillStyle = mul('#ece2ca', dark); g.fillRect(bx, by, 74, 70); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(bx, by, 74, 6); }
      g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y); g.lineTo(x + w, y); g.stroke(); }
    g.strokeStyle = 'rgba(110,88,60,.5)'; g.lineWidth = 2; for (let i = 0; i < 520; i++) { const x = -PAD + r() * (W + PAD * 2), y = 60 + r() * 420, a = r() < .5 ? 1 : -1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 5 * a, y + 9); g.stroke(); }
    g.restore(); g.beginPath(); edge.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke();
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, mul('#e6dcc4', dark)], [1, mul('#c8b48e', dark)]]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470); P2.grain(g, -PAD, 470, W + PAD * 2, 250, .4, 23, 'overlay', .8); P2.pebbles(g, -PAD, 480, W + PAD * 2, 230, 140, 6, pc('#f2ead8'));
    ln(g, [[-PAD, 470], [W + PAD, 470]], 4);
  });
  function block(ctx, x, y, w, h, o = {}) { sh(ctx, o.col || '#ece4d0', 3.5, c => c.rect(x - w / 2, y - h, w, h)); ctx.fillStyle = 'rgba(120,100,70,.24)'; ctx.fillRect(x + w * .14, y - h, w * .36, h); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - w / 2 + 3, y - h + 3, w - 6, 5);
    ctx.strokeStyle = 'rgba(110,90,60,.4)'; ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 8 + k * w / 6, y - h + 8); ctx.lineTo(x - w / 2 + 14 + k * w / 6, y - h + 18); ctx.stroke(); } }
  function cliff(ctx, t, pan, o = {}) { const v = o.v || 'day'; put(ctx, cliffLayer(v), pan, .5);
    if (o.dust !== false) motes(ctx, t, 18, 5); }

  // ================= pyramids + Giza =================
  function pyramid(ctx, x, y, w, o = {}) {   // stepped core courses, white casing from the bottom up, a construction ramp
    const k = o.k ?? 1, hFull = w * .64, h = hFull * k, top = y - h, half = w / 2, halfTop = half * (1 - k);
    const col = o.col || '#e4d2a8', shade = 'rgba(120,80,40,.24)';
    ctx.save(); sh(ctx, col, 3.5, c => { c.moveTo(x - half, y); c.lineTo(x - halfTop, top); c.lineTo(x + halfTop, top); c.lineTo(x + half, y); c.closePath(); });
    ctx.beginPath(); ctx.moveTo(x - half, y); ctx.lineTo(x - halfTop, top); ctx.lineTo(x + halfTop, top); ctx.lineTo(x + half, y); ctx.closePath(); ctx.clip();
    ctx.fillStyle = shade; ctx.beginPath(); ctx.moveTo(x + w * .06, y); ctx.lineTo(x + half * (1 - k) * .2 + w * .02, top); ctx.lineTo(x + halfTop + 1, top); ctx.lineTo(x + half, y); ctx.closePath(); ctx.fill();
    const courses = Math.max(4, Math.round(w / 9)); ctx.strokeStyle = 'rgba(110,80,50,.3)'; ctx.lineWidth = Math.max(.8, w / 400); for (let i = 1; i < courses; i++) { const yy = y - i * hFull / courses; if (yy < top) break; ctx.beginPath(); ctx.moveTo(x - half, yy); ctx.lineTo(x + half, yy); ctx.stroke(); }
    if (o.casing) { const ch = h * o.casing; ctx.fillStyle = 'rgba(250,246,236,.85)'; ctx.fillRect(x - half, y - ch, w, ch); }
    ctx.restore();
    if (o.ramp && k < 1) { ctx.save(); sh(ctx, '#c8a878', 3, c => { c.moveTo(x - half - w * .35, y); c.lineTo(x - halfTop, top + 2); c.lineTo(x - halfTop + w * .06, top + 2); c.lineTo(x - half - w * .2, y); c.closePath(); }); ctx.restore(); }
    if (o.glow) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, x - half * .3, y - h * .5, w * .7, `rgba(255,200,120,${o.glow})`); ctx.restore(); }
  }
  function sphinx(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#d6b680', 3.5, c => { c.moveTo(-160, 0); c.lineTo(-150, -50); c.quadraticCurveTo(-60, -70, 40, -60); c.lineTo(40, 0); c.closePath(); }); sh(ctx, '#d6b680', 3.5, c => c.rect(40, -40, 80, 40));
    sh(ctx, '#ccb07a', 3.5, c => { c.moveTo(20, -50); c.lineTo(30, -130); c.lineTo(110, -130); c.lineTo(110, -50); c.closePath(); }); sh(ctx, '#d6b680', 3, c => c.roundRect(40, -150, 56, 70, 18));
    ctx.fillStyle = 'rgba(90,60,30,.25)'; for (let i = 0; i < 6; i++) ctx.fillRect(30, -126 + i * 13, 80, 5); sh(ctx, OUT, 0, circ(80, -122, 3)); ctx.restore(); }
  const gizaLayer = (v, k) => layer(`giza-${v}-${k}`, g => {
    skyFor(g, v); const dark = v === 'night' ? .45 : v === 'dusk' ? .78 : 1;
    P.hills(g, 470, [[-PAD, 440], [300, 420], [700, 430], [1000, 410], [W + PAD, 430]], mul('#e8c890', dark), mul('#d0a868', dark), 0);
    pyramid(g, 980, 450, 380, { k: 1, col: mul('#e2cc9c', dark) }); pyramid(g, 650, 456, 440, { k, ramp: true, col: mul('#e8d4a6', dark) });
    g.fillStyle = grad(g, 0, 450, 0, H, [[0, mul('#e2c48e', dark)], [1, mul('#c49a62', dark)]]); g.fillRect(-PAD, 452, W + PAD * 2, H - 452); P2.grain(g, -PAD, 452, W + PAD * 2, 270, .35, 41, 'overlay', .8);
    P2.haze(g, 400, 470, v === 'dusk' ? 'rgba(255,190,140,' : 'rgba(250,236,210,', .35);
  });
  function giza(ctx, t, pan, o = {}) { const v = o.v || 'day', k = o.k ?? .85; put(ctx, gizaLayer(v, k), pan, .3);
    P2.clouds2(ctx, t, pan, CLOUDS.slice(0, 3).map(c => [c[0], c[1], c[2] * .7, c[3], c[4]]), cloudTone(v));
    if (o.basin) { const top = o.basinY || 560; water(ctx, t, top, H, v, { flow: .3 }); ln(ctx, [[0, top], [W, top]], 4); P2.pebbles(ctx, 0, top - 30, W, 26, 30, 9, pc('#d8b880')); }
    if (o.workers) { const r = rng(4); for (let i = 0; i < o.workers; i++) ew(ctx, 420 + r() * 420 - pan * .3, 452 - 160 * r() * .2, .35, t, { pose: 'walk', seed: i, dir: r() < .5 ? -1 : 1 }); }
    motes(ctx, t, 12, 7);
  }

  // ================= Heit el-Ghurab: the workers' town =================
  const townLayer = v => layer('town-' + v, g => {
    skyFor(g, v); const dark = v === 'dusk' ? .82 : v === 'night' ? .5 : 1;
    pyramid(g, 980, 340, 300, { k: 1, col: mul('#e2cc9c', dark) }); pyramid(g, 700, 346, 340, { k: 1, col: mul('#e8d4a6', dark) });
    g.fillStyle = grad(g, 0, 330, 0, H, [[0, mul('#d8b880', dark)], [1, mul('#b48a5a', dark)]]); g.fillRect(-PAD, 340, W + PAD * 2, H - 340);
    // the Wall of the Crow on the left
    sh(g, mul('#c8b090', dark), 4, c => { c.moveTo(-PAD, 470); c.lineTo(-PAD, 230); c.lineTo(250, 260); c.lineTo(250, 470); c.closePath(); }); g.strokeStyle = 'rgba(90,70,50,.35)'; g.lineWidth = 2; for (let y = 250; y < 470; y += 22) { g.beginPath(); g.moveTo(-PAD, y - 6); g.lineTo(250, y + 8); g.stroke(); }
    sh(g, mul('#b8a080', dark), 3, c => { c.moveTo(80, 300); c.lineTo(160, 304); c.lineTo(160, 470); c.lineTo(80, 470); c.closePath(); }); sh(g, '#2a1e16', 0, c => c.rect(98, 330, 44, 140));
    // long galleries (barracks) in rows, mud brick with flat roofs and doorways
    for (let row = 0; row < 3; row++) { const y = 380 + row * 70, hh = 40 + row * 10; for (let i = 0; i < 5; i++) { const x = 300 + i * 190 - row * 40, w = 160 + row * 10;
      sh(g, mul(row % 2 ? '#c49a68' : '#b88a5a', dark), 3, c => c.rect(x, y - hh, w, hh)); g.fillStyle = mul('#d6b080', dark); g.fillRect(x, y - hh, w, 6); g.fillStyle = 'rgba(60,40,20,.55)'; for (let d = 0; d < 4; d++) g.fillRect(x + 14 + d * w / 4, y - hh * .62, 10, hh * .62); P2.grain(g, x, y - hh, w, hh, .3, 50 + i + row * 7, 'overlay', .6); } }
    // cattle pen
    for (let i = 0; i < 9; i++) ln(g, [[900 + i * 30, 640], [900 + i * 30, 600]], 4, '#6a4a2a'); ln(g, [[900, 610], [1140, 610]], 3, '#6a4a2a'); ln(g, [[900, 628], [1140, 628]], 3, '#6a4a2a');
    P2.grain(g, -PAD, 340, W + PAD * 2, 380, .3, 61, 'overlay', .8);
  });
  function cow(ctx, x, y, s, t, ph) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const b = Math.sin(t * 1.5 + ph) * 2;
    sh(ctx, '#a0663a', 2.5, c => c.ellipse(0, -20, 26, 13, 0, 0, TAU)); sh(ctx, '#a0663a', 2.5, c => c.ellipse(26, -26 + b, 9, 8, 0, 0, TAU)); ln(ctx, [[22, -34 + b], [16, -44 + b]], 3, '#f0e2c0'); ln(ctx, [[30, -34 + b], [38, -44 + b]], 3, '#f0e2c0');
    for (const lx of [-16, -6, 8, 18]) ln(ctx, [[lx, -10], [lx, 2]], 3.5); sh(ctx, '#f2e6cc', 0, c => c.ellipse(-6, -24, 7, 5, 0, 0, TAU)); ctx.restore(); }
  function town(ctx, t, pan, o = {}) { const v = o.v || 'dusk'; put(ctx, townLayer(v), pan, .4);
    for (const [x, y] of [[380, 330], [640, 316], [900, 300], [520, 380]]) K.smoke(ctx, t, x - pan * .4, y, .42);
    for (let i = 0; i < 5; i++) cow(ctx, 920 + i * 44 - pan * .4, 640, .9, t, i);
    if (o.people !== false) { const r = rng(9); for (let i = 0; i < 14; i++) ew(ctx, ((200 + r() * 900 + t * 18 * (i % 2 ? 1 : -1)) % 1100) + 100 - pan * .4, 480 + r() * 150, .45 + r() * .2, t, { pose: i % 5 === 0 ? 'carry' : 'walk', seed: i + 2, dir: i % 2 ? 1 : -1 }); }
    if (v === 'dusk' || v === 'night') { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const x of [340, 560, 780]) T.glow(ctx, x - pan * .4, 420, 120, 'rgba(255,160,70,.18)'); ctx.restore(); }
    motes(ctx, t, 16, 9); }

  // ================= the builders' cemetery =================
  const cemLayer = v => layer('cem-' + v, g => {
    skyFor(g, v); const dark = v === 'dusk' ? .8 : v === 'night' ? .5 : 1;
    pyramid(g, 860, 360, 520, { k: 1, col: mul('#e4cc98', dark) });
    g.fillStyle = grad(g, 0, 350, 0, H, [[0, mul('#d4b07a', dark)], [1, mul('#a8804e', dark)]]); g.fillRect(-PAD, 356, W + PAD * 2, H - 356); P2.grain(g, -PAD, 356, W + PAD * 2, 370, .35, 71, 'overlay', .8);
    const r = rng(12); const tombs = []; for (let i = 0; i < 26; i++) tombs.push([-120 + r() * 1500, 400 + r() * 300, r()]); tombs.sort((a, b) => a[1] - b[1]);
    for (const [x, y, k] of tombs) { const s = .5 + (y - 400) / 300 * .9; if (k < .3) { const w = 60 * s; g.fillStyle = mul('#c8a878', dark); g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x, y - w * .8); g.lineTo(x + w / 2, y); g.closePath(); g.fill(); g.lineWidth = 3; g.strokeStyle = OUT; g.stroke(); g.fillStyle = 'rgba(80,50,20,.25)'; g.beginPath(); g.moveTo(x, y - w * .8); g.lineTo(x + w / 2, y); g.lineTo(x + w * .1, y); g.closePath(); g.fill(); }
      else { const w = (70 + k * 60) * s, h = 34 * s; sh(g, mul(k > .65 ? '#b8865a' : '#cdb48a', dark), 3, c => { c.moveTo(x - w / 2, y); c.lineTo(x - w / 2 + 6 * s, y - h); c.lineTo(x + w / 2 - 6 * s, y - h); c.lineTo(x + w / 2, y); c.closePath(); }); g.strokeStyle = 'rgba(80,50,30,.35)'; g.lineWidth = 1.5; for (let yy = y - h + 7 * s; yy < y; yy += 7 * s) { g.beginPath(); g.moveTo(x - w / 2 + 4, yy); g.lineTo(x + w / 2 - 4, yy); g.stroke(); } sh(g, '#3a2a1e', 0, c => c.rect(x - 6 * s, y - h * .8, 12 * s, h * .8)); } }
  });
  function cemetery(ctx, t, pan, o = {}) { put(ctx, cemLayer(o.v || 'dusk'), pan, .4); motes(ctx, t, 10, 11); }

  // ================= Wadi al-Jarf =================
  const GAL = [[-70, 96, 120], [70, 80, 104], [196, 104, 126], [336, 86, 110], [460, 92, 116]];
  const jarfLayer = v => layer('jarf2-' + v, g => {
    skyFor(g, v); const dark = v === 'dusk' ? .82 : 1, r = rng(31);
    g.fillStyle = grad(g, 0, 330, 0, 430, [[0, '#4a9ac0'], [1, '#2a6a96']]); g.fillRect(-PAD, 330, W + PAD * 2, 100);
    g.fillStyle = 'rgba(255,255,255,.45)'; for (let i = 0; i < 46; i++) g.fillRect(-PAD + r() * (W + PAD * 2), 336 + r() * 80, 18 + r() * 30, 2);
    P.hills(g, 334, [[560, 334], [700, 300], [860, 318], [1000, 290], [1180, 312], [W + PAD, 300]], mul('#c8a070', dark), mul('#b08858', dark), 2);
    const hill = [[-PAD, 230], [-60, 170], [60, 150], [180, 176], [300, 140], [420, 172], [540, 210], [640, 300], [700, 420], [720, 480]];
    const sil = c => { c.moveTo(-PAD, H); hill.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(720, H); c.closePath(); };
    g.save(); g.beginPath(); sil(g); g.clip(); g.fillStyle = grad(g, 0, 140, 0, 480, [[0, mul('#d49a5e', dark)], [1, mul('#a8703e', dark)]]); g.fillRect(-PAD, 0, 960, H);
    strataBands(g, -PAD, 740, 150, 480, 33, mul('#c88c52', dark)); P2.grain(g, -PAD, 140, 960, 580, .4, 35, 'overlay', 1);
    for (let i = 0; i < 40; i++) { const x = -PAD + r() * 940, y = 160 + r() * 300; g.fillStyle = 'rgba(90,50,20,.22)'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 30 + r() * 40, y + 6); g.lineTo(x + 10, y + 26 + r() * 30); g.closePath(); g.fill(); }
    g.restore(); g.beginPath(); hill.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke();
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, mul('#e2c28e', dark)], [1, mul('#c8a06a', dark)]]); g.fillRect(-PAD, 476, W + PAD * 2, H - 476); P2.grain(g, -PAD, 476, W + PAD * 2, 250, .35, 81, 'overlay', .8); P2.pebbles(g, -PAD, 490, W + PAD * 2, 220, 60, 8, pc('#c8a070')); ln(g, [[-PAD, 476], [W + PAD, 476]], 3.5);
    for (const [x, w, h] of GAL) { sh(g, '#1e140e', 3.5, c => { c.moveTo(x, 478); c.lineTo(x, 478 - h); c.quadraticCurveTo(x + w / 2, 478 - h - 12, x + w, 478 - h); c.lineTo(x + w, 478); c.closePath(); }); g.fillStyle = 'rgba(255,200,140,.12)'; g.fillRect(x + 4, 478 - h + 4, 8, h - 4); }
  });
  function jarf(ctx, t, pan, o = {}) { put(ctx, jarfLayer(o.v || 'day'), pan, .4);
    for (let i = 0; i < 5; i++) { const x = -60 + i * 130 - pan * .4, y = 480, k = o.sealed ?? 1; if (k > 0) for (let j = 0; j < 3; j++) block(ctx, x + 45, y - j * 36, 86, 36, pc('#d8b07a')); }
    if (o.scrolls) { const k = o.scrolls; for (let i = 0; i < 4; i++) { const x = 130 + i * 56 - pan * .4, y = 506 - (i % 2) * 8; ctx.save(); ctx.globalAlpha = clamp(k * 4 - i); sh(ctx, '#e6d29e', 3, c => c.roundRect(x - 22, y - 10, 44, 18, 9)); sh(ctx, '#d8c08a', 2, c => c.ellipse(x - 22, y - 1, 5, 9, 0, 0, TAU)); ctx.restore(); } }
    motes(ctx, t, 10, 13); }

  // ================= interiors =================
  function museum(ctx, t, o = {}) {
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#1e1a22'], [1, '#2e2830']]); ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const sp = ctx.createRadialGradient(640, 300, 20, 640, 340, 520); sp.addColorStop(0, 'rgba(255,230,180,.35)'); sp.addColorStop(1, 'rgba(255,230,180,0)'); ctx.fillStyle = sp; ctx.fillRect(0, 0, W, H); ctx.restore();
    sh(ctx, '#3a3238', 4, c => c.rect(280, 520, 720, 200)); sh(ctx, '#4a4048', 0, c => c.rect(280, 520, 720, 14));
    sh(ctx, '#e6d29e', 3.5, c => c.rect(330, 200, 620, 300)); ctx.save(); ctx.beginPath(); ctx.rect(330, 200, 620, 300); ctx.clip(); ctx.strokeStyle = 'rgba(120,90,40,.22)'; ctx.lineWidth = 2; for (let x = 330; x < 960; x += 10) { ctx.beginPath(); ctx.moveTo(x, 200); ctx.lineTo(x + 3, 500); ctx.stroke(); }
    const r = rng(4); for (let row = 0; row < 7; row++) { ctx.beginPath(); let x = 360; ctx.moveTo(x, 240 + row * 36); while (x < 920) { const w = 6 + r() * 14; ctx.quadraticCurveTo(x + w / 2, 230 + row * 36 + r() * 18, x + w, 240 + row * 36); x += w + (r() < .15 ? 14 : 2); } ctx.lineWidth = 3; ctx.strokeStyle = row === 2 ? '#a83226' : '#2a2018'; ctx.stroke(); }
    ctx.fillStyle = '#1e1a22'; for (const [x, y, w, h] of [[330, 200, 80, 60], [880, 420, 70, 80], [600, 470, 120, 30]]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y + h * .2); ctx.lineTo(x + w * .6, y + h); ctx.lineTo(x, y + h * .7); ctx.closePath(); ctx.fill(); } ctx.restore();
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#cfe6f2'; ctx.fillRect(300, 170, 680, 360); ctx.restore(); ctx.strokeStyle = 'rgba(220,240,250,.55)'; ctx.lineWidth = 3; ctx.strokeRect(300, 170, 680, 360);
    ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(330, 170); ctx.lineTo(420, 170); ctx.lineTo(320, 530); ctx.lineTo(300, 530); ctx.closePath(); ctx.fill(); ctx.restore();
    K.tag(ctx, o.label || 'Papyrus Jarf A · Egyptian Museum, Cairo', 640, 580, 1, 0, { size: 22 });
  }
  function lab(ctx, t, o = {}) {
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#dfe8ee'], [1, '#c4d2dc']]); ctx.fillRect(0, 0, W, H);
    for (let x = 80; x < W; x += 260) { sh(ctx, '#9fc6e2', 4, c => c.rect(x, 70, 180, 200)); ln(ctx, [[x + 90, 70], [x + 90, 270]], 4); ln(ctx, [[x, 170], [x + 180, 170]], 4); ctx.save(); ctx.globalAlpha = .4; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x + 10, 80); ctx.lineTo(x + 60, 80); ctx.lineTo(x + 10, 160); ctx.closePath(); ctx.fill(); ctx.restore(); }
    sh(ctx, '#e8ecf0', 4, c => c.rect(0, 430, W, 30)); sh(ctx, '#7a8a9a', 4, c => c.rect(0, 460, W, 260)); ctx.fillStyle = 'rgba(0,0,0,.15)'; for (let x = 0; x < W; x += 160) ctx.fillRect(x, 470, 4, 250);
    for (const [x, h, col] of [[1000, 70, '#7ac0e0'], [1060, 50, '#e0a060'], [1110, 90, '#a0d080']]) { sh(ctx, 'rgba(220,240,250,.6)', 3, c => c.rect(x, 430 - h, 40, h)); ctx.fillStyle = col; ctx.fillRect(x + 3, 430 - h * .5, 34, h * .5 - 2); }
    K.tag(ctx, o.label || 'University of Amsterdam · 2014', 230, 640, 1, 0, { size: 22 });
  }
  const hatnubLayer = () => layer('hatnub', g => {
    skyFor(g, 'day');
    sh(g, '#d8c0a0', 4, c => { c.moveTo(-PAD, H); c.lineTo(-PAD, 120); c.lineTo(W + PAD, 120); c.lineTo(W + PAD, H); c.closePath(); }); strataBands(g, -PAD, W + PAD, 130, 300, 91, '#e6d6bc');
    g.fillStyle = grad(g, 0, 300, 0, H, [[0, '#e8d8be'], [1, '#c8b08a']]); g.fillRect(-PAD, 300, W + PAD * 2, H - 300);
    // the steep ramp (~20 % grade, perspective) with a staircase on each side and post holes
    const R = c => { c.moveTo(520, 140); c.lineTo(760, 140); c.lineTo(900, H); c.lineTo(380, H); c.closePath(); }; sh(g, '#cdb490', 4, R);
    for (const sd of [-1, 1]) for (let i = 0; i < 18; i++) { const u = i / 18, y = lerp(150, H, u * u * .2 + u * .8), xL = sd < 0 ? lerp(470, 300, u) : lerp(810, 980, u), w = lerp(46, 80, u); sh(g, '#e2ccaa', 2, c => c.rect(xL - w / 2, y, w, 10 + u * 18)); }
    for (let i = 0; i < 8; i++) { const u = i / 8, y = lerp(170, 680, u), x0 = lerp(520, 380, u), x1 = lerp(760, 900, u); for (const x of [x0 + 20, x1 - 20]) sh(g, '#2a1e16', 0, c => c.ellipse(x, y, 6 + u * 8, 4 + u * 5, 0, 0, TAU)); }
    P2.grain(g, -PAD, 120, W + PAD * 2, 600, .3, 93, 'overlay', .8);
  });
  function hatnub(ctx, t, pan, o = {}) { put(ctx, hatnubLayer(), pan, .4); motes(ctx, t, 10, 17); }
  function chamber(ctx, t, o = {}) {   // a relieving chamber: rough granite/limestone blocks lit by a lamp; red graffiti appears (o.k)
    ctx.fillStyle = '#2a2420'; ctx.fillRect(0, 0, W, H);
    const r = rng(5); for (let row = 0; row < 6; row++) for (let i = 0; i < 6; i++) { const x = i * 230 - (row % 2) * 110, y = row * 124, w = 226, h = 120; ctx.fillStyle = mul('#8a7a6a', .8 + r() * .3); ctx.fillRect(x, y, w, h); ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 5; ctx.strokeRect(x, y, w, h); }
    P2.grain(ctx, 0, 0, W, H, .45, 101, 'overlay', 1.2);
    const lx = o.lampX ?? 640 + Math.sin(t * .4) * 60, ly = 380; ctx.save(); ctx.globalCompositeOperation = 'multiply'; const vg = ctx.createRadialGradient(lx, ly, 60, lx, ly, 640); vg.addColorStop(0, 'rgba(255,220,170,1)'); vg.addColorStop(1, 'rgba(20,14,10,1)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, lx, ly, 260, 'rgba(255,170,80,.12)'); ctx.restore();
  }
  const rampLayer = v => layer('dramp-' + v, g => {
    skyFor(g, v); pyramid(g, 900, 300, 640, { k: .55, col: '#e8d4a6' });
    g.fillStyle = grad(g, 0, 300, 0, H, [[0, '#e2c48e'], [1, '#c49a62']]); g.fillRect(-PAD, 300, W + PAD * 2, H - 300); P2.grain(g, -PAD, 300, W + PAD * 2, 420, .35, 111, 'overlay', .8);
    sh(g, '#d6b47e', 3.5, c => { c.moveTo(-PAD, 640); c.lineTo(W + PAD, 360); c.lineTo(W + PAD, 420); c.lineTo(-PAD, 720); c.closePath(); });
  });
  function desertRamp(ctx, t, pan, o = {}) { put(ctx, rampLayer(o.v || 'day'), pan, .5); motes(ctx, t, 12, 19); }

  // ================= sledge =================
  function sledge(ctx, x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
    sh(ctx, '#8a6a44', 3.5, c => { c.moveTo(-100, 0); c.lineTo(110, 0); c.quadraticCurveTo(140, -2, 136, -20); c.lineTo(-100, -16); c.closePath(); }); for (const bx of [-70, 0, 70]) sh(ctx, '#7a5a38', 2.5, c => c.rect(bx - 8, -26, 16, 10));
    block(ctx, 0, -26, 150, 96); if (o.rope !== false) { ln(ctx, [[-60, -70], [60, -70]], 3, '#b8945a'); ln(ctx, [[136, -12], [o.ropeTo ?? 600, o.ropeY ?? -10]], 4, '#b8945a'); }
    ctx.restore(); }

  // ================= maps of Egypt =================
  const MW = 2700, MH = 2500, LON0 = 23.5, LAT0 = 33.6, SC = 230;
  const px = (lon, lat) => [(lon - LON0) * SC * Math.cos(28 * PI / 180), (LAT0 - lat) * SC];
  const NILE = [[32.9, 23.9], [32.93, 24.45], [32.87, 24.98], [32.55, 25.29], [32.64, 25.69], [32.72, 26.16], [32.24, 26.05], [31.69, 26.56], [31.18, 27.18], [30.75, 28.1], [30.95, 28.7], [31.1, 29.07], [31.24, 30.04], [31.15, 30.4]];
  const ROSETTA = [[31.15, 30.4], [30.85, 30.8], [30.6, 31.2], [30.37, 31.46]], DAMIETTA = [[31.15, 30.4], [31.35, 30.9], [31.6, 31.2], [31.81, 31.42]];
  const COAST = [[25.0, 31.6], [27.2, 31.4], [29.0, 30.95], [29.9, 31.2], [30.37, 31.48], [30.9, 31.58], [31.4, 31.55], [31.81, 31.5], [32.3, 31.27], [33.0, 31.12], [34.2, 31.32], [35.0, 32.6]];
  const SUEZ = [[32.55, 29.97], [32.6, 29.6], [32.75, 29.1], [33.1, 28.6], [33.55, 27.9], [33.8, 27.4], [34.2, 26.6], [34.9, 25.4], [35.6, 24.0]];
  const SINAI = [[32.55, 29.97], [32.6, 29.6], [32.75, 29.1], [33.1, 28.6], [33.55, 27.9], [34.3, 27.75], [34.6, 28.2], [34.9, 29.5], [34.9, 31.32], [34.2, 31.32], [33.0, 31.12], [32.3, 31.27], [32.35, 30.6]];
  let mapCanvas = null;
  function mapCv() {
    if (mapCanvas) return mapCanvas; const c = document.createElement('canvas'); c.width = MW; c.height = MH; const g = c.getContext('2d');
    g.fillStyle = '#8fb6c2'; g.fillRect(0, 0, MW, MH);   // seas
    const poly = (pts, fill, lw = 0, col = '#6a5236') => { g.beginPath(); pts.forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { g.lineWidth = lw; g.strokeStyle = col; g.stroke(); } };
    // land = everything below the Med coast and west of the Gulf of Suez / Red Sea
    poly([[20, 40], ...COAST.slice(0, 9), [32.3, 31.27], [32.35, 30.6], ...SUEZ, [35.6, 20], [20, 20]], '#e6d2a4', 4, '#6a5236');
    poly(SINAI, '#e0caa0', 4, '#6a5236'); poly([[34.95, 29.5], [35.0, 32.6], [40, 32.6], [40, 20], [39.2, 21.4], [38.3, 23.6], [37.4, 25.0], [36.6, 26.2], [35.8, 27.3], [35.15, 28.05], [34.98, 29.3]], '#e4d0a4', 4, '#6a5236');
    P2.grain(g, 0, 0, MW, MH, .35, 5, 'multiply', 1.5);
    // green valley + delta
    const band = (pts, w, col) => { g.beginPath(); pts.forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.lineWidth = w; g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
    band(NILE, 40, 'rgba(120,150,70,.55)'); g.fillStyle = 'rgba(120,150,70,.5)'; g.beginPath(); [[31.15, 30.4], [30.37, 31.46], [31.0, 31.6], [31.81, 31.42]].forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.fill();
    for (const r of [NILE, ROSETTA, DAMIETTA]) { band(r, 9, '#4f86a0'); band(r, 4, '#8fc0d6'); }
    const lab = (s, lon, lat, sz, col = 'rgba(90,64,38,.55)') => { const [x, y] = px(lon, lat); g.save(); g.font = DISP(sz); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col; g.letterSpacing = '4px'; g.fillText(s, x, y); g.restore(); };
    lab('EGYPT', 29.0, 27.2, 46); lab('SINAI', 33.9, 29.2, 26); lab('MEDITERRANEAN SEA', 28.5, 32.2, 26, 'rgba(30,70,90,.5)'); lab('RED SEA', 35.4, 26.6, 26, 'rgba(30,70,90,.5)'); lab('EASTERN DESERT', 33.0, 26.8, 18, 'rgba(90,64,38,.4)'); lab('WESTERN DESERT', 28.0, 25.6, 18, 'rgba(90,64,38,.4)');
    { const [x, y] = px(27.0, 24.8); g.save(); g.translate(x, y); sh(g, '#e8d8b0', 3, circ(0, 0, 46)); for (let k = 0; k < 4; k++) { g.rotate(PI / 2); sh(g, k % 2 ? '#6a5236' : '#b8322a', 2, c => { c.moveTo(0, -42); c.lineTo(8, 0); c.lineTo(-8, 0); c.closePath(); }); } txt(g, 'N', 0, -58, DISP(18), '#5a4026'); g.restore(); }
    return (mapCanvas = c);
  }
  const PLACES = { Giza: [31.13, 29.98], Tura: [31.29, 29.93], Aswan: [32.9, 24.09], Cairo: [31.24, 30.05], Memphis: [31.25, 29.85], 'Wadi al-Jarf': [32.64, 29.08], Suez: [32.55, 29.97], Sinai: [33.9, 28.9], Hatnub: [30.98, 27.56], 'Deir el-Bersha': [30.9, 27.75] };
  function toS(lon, lat, v) { const [x, y] = px(lon, lat), [fx, fy] = px(v.lon, v.lat); return [640 + (x - fx) * v.z, 360 + (y - fy) * v.z]; }
  function map(ctx, t, v) { const c = mapCv(), [fx, fy] = px(v.lon, v.lat); ctx.save(); ctx.fillStyle = '#ddc898'; ctx.fillRect(0, 0, W, H); ctx.drawImage(c, 640 - fx * v.z, 360 - fy * v.z, MW * v.z, MH * v.z); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; const vg = ctx.createRadialGradient(640, 360, 300, 640, 360, 820); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(120,90,50,.35)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function route(ctx, pts, v, k, o = {}) { if (k <= 0) return; const S = pts.map(p => toS(p[0], p[1], v)); let L = 0; const segs = []; for (let i = 1; i < S.length; i++) { const d = Math.hypot(S[i][0] - S[i - 1][0], S[i][1] - S[i - 1][1]); segs.push(d); L += d; }
    let rem = L * clamp(k); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const draw = (w, col, dash) => { let r2 = rem; ctx.beginPath(); ctx.moveTo(...S[0]); for (let i = 1; i < S.length && r2 > 0; i++) { const f = Math.min(1, r2 / segs[i - 1]); ctx.lineTo(lerp(S[i - 1][0], S[i][0], f), lerp(S[i - 1][1], S[i][1], f)); r2 -= segs[i - 1]; } ctx.lineWidth = w; ctx.strokeStyle = col; ctx.setLineDash(dash || []); ctx.stroke(); };
    draw((o.w || 7) + 5, 'rgba(255,250,235,.85)'); draw(o.w || 7, o.col || '#b8322a', o.dash ? [14, 10] : null); ctx.restore(); }
  function pin(ctx, place, v, lt, t0, o = {}) { const k = K.pop(lt, t0); if (k <= 0) return; const [x, y] = toS(...(Array.isArray(place) ? place : PLACES[place]), v); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); sh(ctx, o.col || '#b8322a', 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-16, -22, -14, -34); c.arc(0, -34, 14, PI, 0); c.quadraticCurveTo(16, -22, 0, 0); c.closePath(); }); sh(ctx, '#fff', 0, circ(0, -34, 5)); ctx.restore();
    if (o.label !== false) K.tag(ctx, o.label || place, x + (o.dx ?? 0), y + (o.dy ?? -66), lt, t0 + .1, { size: o.size || 20 }); }

  G.ES = { SKY, skyFor, palm, reeds, nile, water, ew, boat, cliff, block, pyramid, sphinx, giza, cow, town, cemetery, jarf, museum, lab, hatnub, chamber, desertRamp, sledge, map, toS, route, pin, PLACES, NILE, txt, FONT, DISP };
})(window);
