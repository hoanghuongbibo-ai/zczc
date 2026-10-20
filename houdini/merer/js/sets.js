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
    noon: [[0, '#2a6cc4'], [.45, '#5ea2e2'], [.78, '#b2d8f2'], [1, '#fbe6b4']], gold: [[0, '#c8706a'], [.32, '#ee9a6e'], [.62, '#ffc282'], [.85, '#ffd896'], [1, '#ffe6b0']],
    dusk: [[0, '#2e2a6e'], [.3, '#7a4a94'], [.55, '#e0705a'], [.75, '#ff9e56'], [1, '#ffd48a']], night: [[0, '#0a1230'], [.55, '#1c2a55'], [1, '#34406a']] };
  const SUN = { dawn: [1040, 330], day: [980, 120], noon: [640, -60], gold: [340, 290], dusk: [960, 340], night: [1060, 110] };
  function skyFor(g, v) {
    P.sky(g, SUN[v] || SUN.day, SKY[v] || SKY.day, v === 'night' ? 0 : v === 'noon' ? .9 : .8);
    if (v === 'night') { const r = rng(11); for (let i = 0; i < 520; i++) { const x = -PAD + r() * (W + PAD * 2), y = r() * 420, b = r(); g.fillStyle = `rgba(255,250,235,${.25 + b * .75})`; g.beginPath(); g.arc(x, y, b > .93 ? 2.1 : 1.1, 0, TAU); g.fill(); }
      g.save(); g.filter = 'blur(22px)'; for (let i = 0; i < 26; i++) { const u = i / 25, x = lerp(-PAD, W + PAD, u), y = lerp(330, 20, u) + Math.sin(u * 9) * 20; g.fillStyle = i % 3 ? 'rgba(150,140,210,.09)' : 'rgba(255,230,240,.08)'; g.beginPath(); g.ellipse(x, y, 220, 90, -.3, 0, TAU); g.fill(); } g.restore();
      for (let i = 0; i < 260; i++) { const u = r(), x = lerp(-PAD, W + PAD, u) + (r() - .5) * 120, y = lerp(330, 20, u) + (r() - .5) * 90; g.fillStyle = `rgba(255,250,240,${.3 + r() * .6})`; g.fillRect(x, y, 1.4, 1.4); }
      const m = g.createRadialGradient(1060, 110, 30, 1060, 110, 240); m.addColorStop(0, 'rgba(255,250,230,.6)'); m.addColorStop(1, 'rgba(255,250,230,0)'); g.fillStyle = m; g.fillRect(800, -140, 520, 500);
      sh(g, '#fbf8ee', 0, circ(1060, 110, 66)); for (const [dx, dy, rr] of [[-20, -14, 12], [18, 10, 9], [-6, 26, 7], [26, -24, 6]]) sh(g, 'rgba(200,196,186,.45)', 0, circ(1060 + dx, 110 + dy, rr)); }
    P2.grain(g, -PAD, 0, W + PAD * 2, 460, .16, 7, 'soft-light', 1.5);
  }
  const CLOUDS = [[60, 40, .9, 3, 4], [520, 80, .7, 5, 3], [900, 30, 1.0, 7, 5], [1300, 70, .8, 9, 4]];
  const cloudTone = v => v === 'dusk' || v === 'gold' ? 'dusk' : v === 'night' ? 'grey' : 'warm';

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

  // ================= the Nile (v2: the user's repainted frames — lush banks, reflective water, lotus, birds) =================
  const EF = () => G.EF;
  const WATER = { day: ['#c4dde0', '#78aec4', '#3e7898'], noon: ['#c4dde0', '#78aec4', '#3e7898'], gold: ['#ffd8a0', '#d8a26e', '#7a5a46'], dawn: ['#ecc0b8', '#a88ab4', '#56568e'], dusk: ['#f2ae80', '#b47486', '#4a3a6a'], night: ['#56689a', '#2a3a66', '#141c3a'] };
  const farBank = (v, o) => layer(`nfar4-${v}-${o.cliff || ''}-${o.giza ? 1 : 0}-${o.h || 330}`, g => {
    skyFor(g, v); const hz = o.h || 330, dk = v === 'night' ? .38 : v === 'dusk' ? .72 : v === 'dawn' ? .82 : 1, r = rng(3);
    // distant desert hills in haze
    P.hills(g, hz, [[-PAD, hz - 36], [160, hz - 62], [480, hz - 40], [760, hz - 74], [1060, hz - 46], [W + PAD, hz - 60]], mul('#e8c89a', dk), mul('#d8b482', dk), 0);
    if (o.giza) { const gx = o.gizaX || 900; [[gx, 150], [gx - 150, 120], [gx - 260, 70]].forEach(([x, w]) => pyramid(g, x, hz - 22, w, { k: 1, col: mul('#e8d2a2', dk), fine: true })); P2.haze(g, hz - 140, hz, v === 'dusk' ? 'rgba(255,190,150,' : 'rgba(250,236,214,', .5); }
    if (o.cliff === 'far') { g.fillStyle = mul('#e6dac0', dk); g.beginPath(); g.moveTo(-PAD, hz); g.lineTo(-PAD, hz - 150); g.lineTo(300, hz - 160); g.lineTo(420, hz - 120); g.lineTo(520, hz - 20); g.lineTo(520, hz); g.closePath(); g.fill(); strataBands(g, -PAD, 520, hz - 150, hz, 4, mul('#e6dac0', dk)); }
    // far bank: a back row of small palms in haze, a band of shrubs, a front row of bigger palms + an acacia or two
    for (let x = -PAD + 10; x < W + PAD; x += 36 + r() * 30) if (!(o.cliff === 'far' && x < 520)) EF().palm(g, x, hz - 10, .34 + r() * .1, 100 + Math.floor(x), { dark: dk * .82, dates: false, fronds: 7 });
    P2.haze(g, hz - 70, hz + 4, v === 'dusk' ? 'rgba(255,180,140,' : v === 'night' ? 'rgba(60,70,110,' : 'rgba(246,232,206,', .55);
    for (let x = -PAD; x < W + PAD; x += 150) if (!(o.cliff === 'far' && x < 500)) EF().bushMass(g, x, hz + 6, 160, 44, 7 + Math.floor(x), dk * .92);
    for (let x = -PAD + 40; x < W + PAD; x += 110 + r() * 90) { if (o.cliff === 'far' && x < 540) continue; if (r() < .18) EF().acacia(g, x, hz + 4, .7, Math.floor(x), dk * .9); else EF().palm(g, x, hz + 6, .55 + r() * .35, 300 + Math.floor(x), { dark: dk * .95 }); }
    g.fillStyle = mul('#4e7a34', dk); g.fillRect(-PAD, hz + 2, W + PAD * 2, 6);
  });
  const reflLayer = (v, o) => layer(`nrefl4-${v}-${o.cliff || ''}-${o.giza ? 1 : 0}-${o.h || 330}`, g => {   // the far bank mirrored in the water (soft, squashed)
    const far = farBank(v, o), hz = o.h || 330, hgt = 170; g.translate(-PAD, 0); g.save(); g.globalAlpha = .45; g.filter = 'blur(3px)'; g.translate(0, hz * 2 + 6); g.scale(1, -.55); g.translate(0, hz * .82);
    g.drawImage(far, 0, hz - hgt, far.width, hgt, 0, hz - hgt, far.width, hgt); g.restore(); });
  const nearBank = (v, o) => layer(`nnear4-${v}-${o.cliff || ''}-${o.bankY || 600}`, g => {
    const y0 = o.bankY || 600, dk = v === 'night' ? .4 : v === 'dusk' ? .72 : v === 'dawn' ? .85 : 1, r = rng(17);
    if (o.cliff === 'near') {   // a tall weathered sandstone cliff with cracks + plants in the crevices
      const CL = [[-PAD, 30], [20, 18], [120, 12], [170, 50], [236, 62], [250, 150], [292, 170], [300, 268], [338, 292], [352, y0 - 120], [372, y0 - 60], [420, H]], sil = c => { c.moveTo(-PAD, H); CL.forEach(p => c.lineTo(p[0], p[1])); c.closePath(); };
      g.save(); g.beginPath(); sil(g); g.clip(); g.fillStyle = grad(g, 0, 0, 420, 0, [[0, mul('#c8a882', dk)], [.7, mul('#d8bc94', dk)], [1, mul('#b89870', dk)]]); g.fillRect(-PAD, 0, 700, H); strataBands(g, -PAD, 420, 10, H, 9, mul('#d0b08a', dk)); P2.grain(g, -PAD, 0, 700, H, .45, 19, 'overlay', 1);
      for (let i = 0; i < 9; i++) { const x = -PAD + 40 + i * 70, w2 = 3 + r() * 4; g.strokeStyle = 'rgba(60,40,24,.7)'; g.lineWidth = w2; g.beginPath(); g.moveTo(x, 0); for (let y = 0; y < H; y += 40) g.lineTo(x + (r() - .5) * 18, y); g.stroke(); g.strokeStyle = 'rgba(255,240,210,.35)'; g.lineWidth = 2; g.stroke(); }
      for (let i = 0; i < 6; i++) { const y = 60 + i * 90; g.fillStyle = 'rgba(70,50,30,.35)'; g.fillRect(-PAD, y, 640, 6); g.fillStyle = 'rgba(255,240,210,.35)'; g.fillRect(-PAD, y - 3, 640, 3); }
      g.restore(); g.beginPath(); CL.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke();
      for (const [x, y] of [[60, 150], [190, 70], [280, 240], [120, 330], [330, 420]]) { EF().tuft(g, x, y, 1.3, mul('#5a8a3a', dk)); EF().bushMass(g, x - 18, y + 4, 40, 22, x, dk); }
    }
    // the bank: wet mud at the water's edge, grassy top, darker earth below
    const edge = x => y0 + Math.sin(x * .013) * 9 + Math.sin(x * .041) * 4;
    g.fillStyle = grad(g, 0, y0, 0, H, [[0, mul('#7a6a3a', dk)], [.25, mul('#6a5430', dk)], [1, mul('#4a3a22', dk)]]); g.beginPath(); g.moveTo(-PAD, edge(-PAD)); for (let x = -PAD; x <= W + PAD; x += 20) g.lineTo(x, edge(x)); g.lineTo(W + PAD, H); g.lineTo(-PAD, H); g.closePath(); g.fill();
    P2.grain(g, -PAD, y0, W + PAD * 2, H - y0, .45, 13, 'overlay', .8); P2.pebbles(g, -PAD, y0 + 30, W + PAD * 2, H - y0 - 30, 70, 4, pc(mul('#a8906a', dk)));
    g.fillStyle = 'rgba(255,240,200,.18)'; g.beginPath(); for (let x = -PAD; x <= W + PAD; x += 20) g.lineTo(x, edge(x) + 4); g.lineTo(W + PAD, edge(W + PAD) + 10); g.lineTo(-PAD, edge(-PAD) + 10); g.closePath(); g.fill();
    for (let x = -PAD; x < W + PAD; x += 7) { const e = edge(x), h2 = 8 + r() * 16; g.beginPath(); g.moveTo(x, e + 6); g.quadraticCurveTo(x + 2, e - h2 * .5, x + (r() - .5) * 8, e - h2); g.lineWidth = 2.4; g.strokeStyle = mul(r() < .5 ? '#5a8a36' : '#7aa848', dk); g.stroke(); }
    g.beginPath(); for (let x = -PAD; x <= W + PAD; x += 20) x === -PAD ? g.moveTo(x, edge(x)) : g.lineTo(x, edge(x)); g.lineWidth = 3.5; g.strokeStyle = OUT; g.stroke();
    if (o.cliff !== 'near') EF().bushMass(g, -PAD + 10, y0 + 30, 240, 70, 23, dk);
    EF().bushMass(g, W + PAD - 260, y0 + 34, 250, 64, 29, dk);
    if (o.frame !== false) { if (o.cliff !== 'near') { EF().bushMass(g, -PAD, y0 + 70, 380, 150, 41, dk); EF().palm(g, -60, y0 + 40, 1.5, 51, { dark: dk, lean: .25 }); EF().palm(g, 60, y0 + 60, 1.15, 53, { dark: dk, lean: .12 }); }
      EF().bushMass(g, W + PAD - 340, y0 + 80, 340, 130, 43, dk); EF().palm(g, W + 40, y0 + 50, 1.4, 57, { dark: dk, lean: -.25 }); }
    EF().flowers(g, -PAD, H - 6, W + PAD * 2, 36, 31, 0);
  });
  function water(ctx, t, top, bot, v, o = {}) {   // reflective river: sky-tinted surface, mirrored far bank, current streaks, sun path, sparkles
    const C = WATER[v] || WATER.day; ctx.fillStyle = grad(ctx, 0, top, 0, bot, [[0, C[0]], [.35, C[1]], [1, C[2]]]); ctx.fillRect(0, top, W, bot - top);
    if (o.refl !== false && o._refl) { ctx.save(); ctx.beginPath(); ctx.rect(0, top, W, bot - top); ctx.clip(); put(ctx, o._refl, o.pan || 0, .2); ctx.restore(); }
    const r = rng(8); ctx.lineCap = 'round'; for (let i = 0; i < 110; i++) { const u = r(), y = lerp(top + 4, bot - 4, u * u), L = (16 + r() * 60) * (.4 + u), x = ((r() * (W + 400) + t * (14 + r() * 20) * (o.flow ?? 1) * (.4 + u)) % (W + 400)) - 200;
      ctx.strokeStyle = `rgba(255,252,240,${(.14 + .24 * Math.abs(Math.sin(t * .7 + i))) * (v === 'night' ? .35 : 1)})`; ctx.lineWidth = 1 + u * 2.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y); ctx.stroke();
      if (i % 3 === 0) { ctx.strokeStyle = 'rgba(20,40,60,.12)'; ctx.beginPath(); ctx.moveTo(x + 6, y + 3); ctx.lineTo(x + L * .8, y + 3); ctx.stroke(); } }
    const sun = SUN[v] || SUN.day, night = v === 'night', sx = night ? 1030 : sun[0];
    if (night || sun[1] > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 30; i++) { const y = top + 6 + i * (bot - top) / 30, w = 26 + i * 7, x = sx + Math.sin(t * 2 + i * 1.7) * 18; ctx.fillStyle = night ? `rgba(220,230,255,${.22 - i * .006})` : `rgba(255,236,190,${.32 - i * .009})`; ctx.fillRect(x - w / 2, y, w, 2.6); } ctx.restore();
      EF().sparkles(ctx, t, sx - 240, top + 4, 480, bot - top - 10, night ? 20 : 46, 7, night ? '220,230,255' : '255,248,220'); }
    if (!night) EF().sparkles(ctx, t, 0, top, W, bot - top, 26, 11);
  }
  function nile(ctx, t, pan, o = {}) {
    const v = o.v || 'day', hz = o.h || 330, by = o.bankY || 600; put(ctx, farBank(v, o), pan, .2);
    if (v !== 'night' && v !== 'noon') EF().beams(ctx, SUN[v] || SUN.day, t, v === 'day' ? .06 : .09);
    if (v === 'night') { ctx.save(); ctx.globalAlpha = .35; } P2.clouds2(ctx, t, pan, CLOUDS.map(c => [c[0], c[1] * (hz / 330), c[2] * .9, c[3], c[4]]), cloudTone(v)); if (v === 'night') ctx.restore();
    if (o.birds !== false) { EF().flock(ctx, t, 120, hz * .38, 7, .9, 22); if (v !== 'night') EF().flock(ctx, t + 40, 700, hz * .24, 5, .7, 16); }
    water(ctx, t, hz + 6, o.near === false ? H : by + 12, v, Object.assign({ _refl: reflLayer(v, o), pan }, o));
    if (o.boats !== false && v !== 'night') for (const [x0, s] of [[200, .9], [760, .7], [1100, .8]]) EF().felucca(ctx, ((x0 - pan * .25 + t * 6) % (W + 200)) - 100, hz + 22, s, t);
    if (o.near !== false) { EF().lilies(ctx, 60 - pan * .9, by - 20, 260, 9, 5, t); EF().lilies(ctx, 900 - pan * .9, by - 16, 300, 10, 9, t); }
    if (o.near !== false) put(ctx, nearBank(v, o), pan, 1);
    if (o.mist) { ctx.save(); for (let i = 0; i < 7; i++) { const x = ((i * 260 + t * 12) % (W + 600)) - 300; ctx.globalAlpha = .26 * o.mist; ctx.fillStyle = grad(ctx, 0, hz - 40, 0, hz + 140, [[0, 'rgba(255,244,236,0)'], [.5, 'rgba(255,244,236,1)'], [1, 'rgba(255,244,236,0)']]); ctx.beginPath(); ctx.ellipse(x, hz + 40, 360, 64, 0, 0, TAU); ctx.fill(); } ctx.restore(); }
    if (o.near !== false && o.reeds !== false) { const dk = v === 'night' ? .45 : v === 'dusk' ? .75 : 1;
      if (o.cliff !== 'near') EF().papyrus(ctx, 60 - pan, by + 10, 14, 150, 3, t, dk); EF().papyrus(ctx, 1180 - pan, by + 12, 16, 160, 7, t, dk);
      if (o.ibis !== false && v !== 'night') { EF().ibis(ctx, 250 - pan * .95, by - 6, 1.0, t, { peck: true }); EF().ibis(ctx, 330 - pan * .95, by, .9, t, { egret: true, dir: -1, peck: true, ph: 2 }); } }
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

  // ================= the Tura cliff / quarry (v2: warm sandstone columns, deep joints, quarry bays with lintels + dark doorways) =================
  const cliffLayer = v => layer('tura3-' + v, g => {
    skyFor(g, v); const dk = v === 'dusk' ? .8 : v === 'night' ? .55 : v === 'dawn' ? .9 : 1, r = rng(21);
    const topY = x => 34 + Math.sin(x * .011) * 10 + Math.sin(x * .037) * 6;
    // columns of rock separated by deep vertical joints
    let x = -PAD; while (x < W + PAD) { const w = 110 + r() * 120, x2 = x + w;
      const col = c => { c.moveTo(x + 6, 480); c.lineTo(x + 4, topY(x) + 8); c.quadraticCurveTo(x + w * .5, topY(x + w * .5) - 8, x2 - 4, topY(x2) + 6); c.lineTo(x2 - 6, 480); c.closePath(); };
      g.save(); g.beginPath(); col(g); g.fillStyle = grad(g, x, 0, x2, 0, [[0, mul('#c49a6c', dk)], [.25, mul('#dcb88a', dk)], [.8, mul('#cfa678', dk)], [1, mul('#a8805a', dk)]]); g.fill(); g.clip();
      let y = topY(x) + 10; while (y < 480) { const hh = 16 + r() * 34; g.strokeStyle = 'rgba(110,74,44,.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y + hh); for (let xx = x; xx <= x2; xx += 20) g.lineTo(xx, y + hh + (r() - .5) * 4); g.stroke(); g.strokeStyle = 'rgba(255,240,210,.28)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y + hh + 3); g.lineTo(x2, y + hh + 3); g.stroke(); y += hh; }
      g.strokeStyle = 'rgba(100,70,40,.5)'; g.lineWidth = 1.6; for (let i = 0; i < w / 6; i++) { const px = x + r() * w, py = 50 + r() * 420; g.beginPath(); g.moveTo(px, py); g.lineTo(px + 3, py + 8); g.stroke(); }
      P2.grain(g, x, 0, w, 480, .4, Math.floor(x) + 300, 'overlay', 1); g.restore();
      g.beginPath(); col(g); g.lineWidth = 3.5; g.strokeStyle = OUT; g.stroke(); g.fillStyle = 'rgba(50,30,16,.55)'; g.fillRect(x2 - 6, topY(x2) + 4, 10, 480 - topY(x2)); x = x2; }
    // quarry bays: a stone lintel, a rough plastered face, dark doorways cut at the bottom
    for (const [bx, by, bw, bh, n] of [[-10, 300, 400, 180, 3], [450, 340, 300, 140, 2], [820, 250, 440, 230, 3], [1300, 330, 200, 150, 1]]) {
      sh(g, mul('#b08860', dk), 3, c => c.rect(bx, by, bw, bh)); P2.grain(g, bx, by, bw, bh, .45, bx + 500, 'overlay', 1); g.fillStyle = 'rgba(255,230,190,.12)'; g.fillRect(bx, by, bw, bh * .4);
      sh(g, mul('#cfae84', dk), 3, c => c.rect(bx - 12, by - 16, bw + 24, 20)); g.fillStyle = 'rgba(255,240,210,.4)'; g.fillRect(bx - 10, by - 14, bw + 20, 5);
      for (const sx of [bx + 4, bx + bw - 20]) sh(g, mul('#c4a07a', dk), 2.5, c => c.rect(sx, by + 4, 16, bh - 4));
      const dw = (bw - 40 - (n - 1) * 14) / n; for (let i = 0; i < n; i++) { const dx = bx + 20 + i * (dw + 14); sh(g, '#2a2018', 3, c => c.rect(dx, by + bh - bh * .48, dw, bh * .48)); g.fillStyle = 'rgba(80,60,40,.5)'; g.fillRect(dx, by + bh - bh * .48, dw, 6); } }
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, mul('#d8b484', dk)], [1, mul('#b48c5e', dk)]]); g.fillRect(-PAD, 476, W + PAD * 2, H - 476); P2.grain(g, -PAD, 476, W + PAD * 2, 250, .4, 23, 'overlay', .8); P2.pebbles(g, -PAD, 490, W + PAD * 2, 220, 120, 6, pc(mul('#c8a478', dk)));
    for (const [x2, y2, w2] of [[200, 640, 110], [1150, 700, 130], [560, 690, 80]]) EF().rock(g, x2, y2, w2, w2 * .42, x2, mul('#b8946a', dk)); ln(g, [[-PAD, 476], [W + PAD, 476]], 3.5);
  });
  function block(ctx, x, y, w, h, o = {}) { sh(ctx, o.col || '#ece4d0', 3.5, c => c.rect(x - w / 2, y - h, w, h)); ctx.fillStyle = 'rgba(120,100,70,.24)'; ctx.fillRect(x + w * .14, y - h, w * .36, h); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - w / 2 + 3, y - h + 3, w - 6, 5);
    ctx.strokeStyle = 'rgba(110,90,60,.4)'; ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 8 + k * w / 6, y - h + 8); ctx.lineTo(x - w / 2 + 14 + k * w / 6, y - h + 18); ctx.stroke(); } }
  function cliff(ctx, t, pan, o = {}) { const v = o.v || 'day'; put(ctx, cliffLayer(v), pan, .5); if (o.dust !== false) { motes(ctx, t, 26, 5); EF().sparkles(ctx, t, 0, 0, W, 470, 10, 41, '255,210,140'); } }

  // ================= pyramids + Giza (v2: textured stone blocks, weathered edges, work camp, dunes, oasis) =================
  function pyramid(ctx, x, y, w, o = {}) {
    const k = o.k ?? 1, hFull = w * .64, h = hFull * k, top = y - h, half = w / 2, halfTop = half * (1 - k), col = o.col || '#e2c896', r = rng(Math.round(x * 7 + w)), rx = x + w * .07;
    const sil = c => { c.moveTo(x - half, y); c.lineTo(x - halfTop, top); c.lineTo(x + halfTop, top); c.lineTo(x + half, y); c.closePath(); };
    ctx.save(); ctx.beginPath(); sil(ctx); ctx.clip();
    ctx.fillStyle = grad(ctx, x - half, top, x, y, [[0, mul(col, 1.08)], [1, mul(col, .96)]]); ctx.fillRect(x - half - 2, top - 2, w + 4, h + 4);   // lit face
    ctx.fillStyle = grad(ctx, x, top, x + half, y, [[0, mul(col, .8)], [1, mul(col, .7)]]); ctx.beginPath(); ctx.moveTo(x + halfTop * .2, top); ctx.lineTo(x + halfTop + 2, top); ctx.lineTo(x + half + 2, y); ctx.lineTo(rx, y); ctx.closePath(); ctx.fill();   // shaded face
    if (w >= 90 && !o.fine) {   // courses of blocks with staggered joints, a few blocks lighter/darker, worn chips
      const rows = Math.round(w / 11), rh = hFull / rows; for (let i = 0; i < rows; i++) { const yy = y - i * rh; if (yy < top) break; const hw = half * (1 - i / rows), bw = Math.max(10, w / 26) * (1 - i / rows * .3);
        ctx.strokeStyle = 'rgba(100,70,40,.32)'; ctx.lineWidth = Math.max(.8, w / 420); ctx.beginPath(); ctx.moveTo(x - hw, yy); ctx.lineTo(x + hw, yy); ctx.stroke();
        for (let bx = x - hw + (i % 2) * bw * .5; bx < x + hw; bx += bw) { ctx.beginPath(); ctx.moveTo(bx, yy); ctx.lineTo(bx, yy - rh); ctx.stroke(); const q = r(); if (q < .1) { ctx.fillStyle = 'rgba(255,245,220,.25)'; ctx.fillRect(bx, yy - rh, bw, rh); } else if (q < .18) { ctx.fillStyle = 'rgba(90,60,30,.16)'; ctx.fillRect(bx, yy - rh, bw, rh); } } }
      ctx.strokeStyle = 'rgba(90,60,30,.35)'; ctx.lineWidth = 1.4; for (let i = 0; i < w / 6; i++) { const u = r(), vv = r(), px = lerp(x - half * (1 - u), x + half * (1 - u), vv), py = y - u * h; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 4, py + 3); ctx.stroke(); }
    } else if (!o.fine) { ctx.strokeStyle = 'rgba(110,80,50,.3)'; ctx.lineWidth = 1; for (let i = 1; i < 8; i++) { const yy = y - i * hFull / 8; if (yy < top) break; ctx.beginPath(); ctx.moveTo(x - half, yy); ctx.lineTo(x + half, yy); ctx.stroke(); } }
    if (o.casing) { ctx.fillStyle = 'rgba(252,248,238,.85)'; ctx.fillRect(x - half, y - h * o.casing, w, h * o.casing); }
    if (k >= 1 && !o.fine && w >= 90) { ctx.fillStyle = 'rgba(255,240,210,.3)'; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x - w * .1, top + h * .16); ctx.lineTo(x - w * .04, top + h * .14); ctx.lineTo(x + w * .02, top + h * .18); ctx.lineTo(x + w * .1, top + h * .16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    // outline with small chips along the edges (weathered), ridge line
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(2, w / 140); ctx.strokeStyle = OUT; ctx.beginPath(); ctx.moveTo(x - half, y);
    const steps = Math.max(4, Math.round(w / 24)); for (let i = 1; i <= steps; i++) { const u = i / steps; ctx.lineTo(lerp(x - half, x - halfTop, u) + (i < steps && !o.fine ? (r() - .5) * w * .012 : 0), lerp(y, top, u)); }
    ctx.lineTo(x + halfTop, top); for (let i = 1; i <= steps; i++) { const u = i / steps; ctx.lineTo(lerp(x + halfTop, x + half, u) + (i < steps && !o.fine ? (r() - .5) * w * .012 : 0), lerp(top, y, u)); } ctx.stroke();
    ctx.lineWidth = Math.max(1, w / 260); ctx.strokeStyle = 'rgba(70,46,26,.45)'; ctx.beginPath(); ctx.moveTo(x + halfTop * .2, top); ctx.lineTo(rx, y); ctx.stroke(); ctx.restore();
    if (o.ramp && k < 1) { const R = c => { c.moveTo(x - half - w * .36, y); c.lineTo(x - halfTop, top + 2); c.lineTo(x - halfTop + w * .07, top + 2); c.lineTo(x - half - w * .2, y); c.closePath(); };
      sh(ctx, '#c8a474', Math.max(2, w / 160), R); ctx.save(); ctx.beginPath(); R(ctx); ctx.clip(); ctx.strokeStyle = 'rgba(90,60,30,.3)'; ctx.lineWidth = 1.2; for (let i = 0; i < 30; i++) { const u = i / 30; ctx.beginPath(); ctx.moveTo(lerp(x - half - w * .36, x - halfTop, u) - 10, lerp(y, top, u)); ctx.lineTo(lerp(x - half - w * .2, x - halfTop + w * .07, u) + 10, lerp(y, top, u)); ctx.stroke(); } ctx.restore(); }
    if (o.glow) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, x - half * .3, y - h * .5, w * .7, `rgba(255,200,120,${o.glow})`); ctx.restore(); }
  }
  function sphinx(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#d6b680', 3.5, c => { c.moveTo(-160, 0); c.lineTo(-150, -50); c.quadraticCurveTo(-60, -70, 40, -60); c.lineTo(40, 0); c.closePath(); }); sh(ctx, '#d6b680', 3.5, c => c.rect(40, -40, 80, 40));
    sh(ctx, '#ccb07a', 3.5, c => { c.moveTo(20, -50); c.lineTo(30, -130); c.lineTo(110, -130); c.lineTo(110, -50); c.closePath(); }); sh(ctx, '#d6b680', 3, c => c.roundRect(40, -150, 56, 70, 18));
    ctx.fillStyle = 'rgba(90,60,30,.25)'; for (let i = 0; i < 6; i++) ctx.fillRect(30, -126 + i * 13, 80, 5); sh(ctx, OUT, 0, circ(80, -122, 3)); ctx.restore(); }
  const dunes = (g, y0, dk, seed) => {   // overlapping dunes: lit crest, shaded lee, wind ripples
    const r = rng(seed); g.fillStyle = grad(g, 0, y0, 0, H, [[0, mul('#ecc88c', dk)], [1, mul('#d0a062', dk)]]); g.fillRect(-PAD, y0, W + PAD * 2, H - y0);
    for (let d = 0; d < 5; d++) { const cy = y0 + 30 + d * 50, cx = -PAD + r() * (W + PAD), w = 500 + r() * 500; g.fillStyle = mul(d % 2 ? '#e2b878' : '#f2d29a', dk); g.beginPath(); g.moveTo(cx - w / 2, cy + 50); g.quadraticCurveTo(cx - w * .1, cy - 30, cx + w / 2, cy + 40); g.closePath(); g.fill();
      g.strokeStyle = mul('#c8985a', dk); g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx - w / 2, cy + 50); g.quadraticCurveTo(cx - w * .1, cy - 30, cx + w / 2, cy + 40); g.stroke(); }
    g.strokeStyle = 'rgba(160,110,60,.35)'; g.lineWidth = 1.6; for (let i = 0; i < 70; i++) { const x = -PAD + r() * (W + PAD * 2), y = y0 + 20 + r() * (H - y0 - 20), L = 30 + r() * 60; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + L / 2, y - 5, x + L, y); g.stroke(); }
    P2.grain(g, -PAD, y0, W + PAD * 2, H - y0, .3, seed + 1, 'overlay', .8); };
  const gizaLayer = (v, k) => layer(`giza4-${v}-${k}`, g => {
    skyFor(g, v); const dk = v === 'night' ? .42 : v === 'dusk' ? .78 : v === 'dawn' ? .86 : 1, night = v === 'night';
    P.hills(g, 470, [[-PAD, 446], [300, 428], [700, 438], [1000, 420], [W + PAD, 436]], mul('#e8c890', dk), mul('#d8b07a', dk), 0);
    // the river far away on the left, palms + sails
    g.fillStyle = mul('#7ab0c8', dk); g.fillRect(-PAD, 440, 620, 18); for (let x = -PAD; x < 420; x += 40) EF().palm(g, x, 446, .26, 900 + x, { dark: dk * .85, dates: false, fronds: 7 }); EF().felucca(g, 40, 456, .5); EF().felucca(g, 220, 458, .4);
    pyramid(g, 1000, 470, 390, { k: 1, col: mul('#dcc08e', dk) }); pyramid(g, 650, 476, 450, { k, ramp: k < 1, col: mul('#e6cc98', dk) });
    if (k < 1) EF().scaffold(g, 760, 476, 60, 70);
    P2.haze(g, 420, 480, v === 'dusk' ? 'rgba(255,190,140,' : night ? 'rgba(60,70,110,' : 'rgba(250,236,210,', .35);
    dunes(g, 470, dk, 41);
    // oasis pool + palm cluster on the right, rocks + tufts
    g.save(); g.beginPath(); g.ellipse(1050, 590, 150, 30, 0, 0, TAU); g.fillStyle = grad(g, 0, 560, 0, 620, [[0, mul('#9fd0e2', dk)], [1, mul('#4a90b8', dk)]]); g.fill(); g.lineWidth = 3; g.strokeStyle = OUT; g.stroke(); g.restore();
    for (const [x, s2] of [[920, .7], [1180, .85], [1250, .6], [1110, .55]]) EF().palm(g, x, 580 + (x % 3) * 6, s2, 700 + x, { dark: dk });
    EF().bushMass(g, 900, 600, 120, 36, 3, dk); EF().bushMass(g, 1130, 612, 150, 40, 9, dk);
    EF().rock(g, 90, 640, 150, 80, 3, mul('#b8946a', dk)); EF().rock(g, 1220, 690, 110, 56, 5, mul('#b8946a', dk)); EF().rock(g, 560, 660, 60, 26, 7, mul('#c8a070', dk));
    for (const x of [200, 320, 480, 760, 980, 1180]) EF().tuft(g, x, 690 - (x % 7) * 4, 1.4, mul('#7a9a4a', dk));
    // the work camp at the foot of the pyramid while it's being built
    if (k < 1) { for (const [x, y, s2, st] of [[260, 530, .8, 0], [880, 520, .7, 1], [1080, 540, .75, 0]]) EF().tent(g, x, y, s2, { stripes: st, glow: night });
      for (const [x, y] of [[160, 540], [470, 530], [960, 532]]) for (let j = 0; j < 3; j++) for (let q = 0; q < 3 - j; q++) block(g, x + q * 26 + j * 13, y - j * 18, 24, 18);
      EF().cart(g, 560, 548, .8); EF().cart(g, 350, 560, .7); }
    if (night) { for (const [x, y, s2, st] of [[140, 590, .9, 1], [330, 570, .8, 0], [500, 600, .85, 1]]) EF().tent(g, x, y, s2, { stripes: st, glow: true, col: '#c8a888' });
      EF().camel(g, 250, 640, .9, 0, { lie: true, saddle: true }); EF().camel(g, 610, 630, .8, 0, { lie: true, dir: -1 });
      for (const [x, y] of [[140, 560], [330, 540], [500, 570], [420, 610]]) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, x, y, 110, 'rgba(255,170,80,.42)'); g.restore(); } }
  });
  function giza(ctx, t, pan, o = {}) { const v = o.v || 'day', k = o.k ?? .85; put(ctx, gizaLayer(v, k), pan, .3);
    if (v !== 'night' && v !== 'noon') EF().beams(ctx, SUN[v] || SUN.day, t, .07);
    if (v === 'night') { ctx.save(); ctx.globalAlpha = .3; } P2.clouds2(ctx, t, pan, CLOUDS.slice(0, 3).map(c => [c[0], c[1], c[2] * .8, c[3], c[4]]), cloudTone(v)); if (v === 'night') ctx.restore(); else EF().flock(ctx, t, 300, 170, 9, .8, 18);
    if (v === 'night') { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const sx = ((t * 120) % 1600) - 200; ctx.strokeStyle = 'rgba(255,250,230,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, 60 + (sx % 50)); ctx.lineTo(sx - 60, 80 + (sx % 50)); ctx.stroke(); ctx.restore();
      EF().sparkles(ctx, t, 0, 300, W, 420, 40, 23, '255,220,150'); }
    if (v === 'night') { ctx.save(); ctx.translate(420 - pan * .3, 618); ctx.scale(.45, .45); P2.fire(ctx, 0, 0, 1, t); ctx.restore(); for (const x of [200, 560]) P2.lantern(ctx, x - pan * .3, 520, t, .5); }
    if (k < 1) for (const [x, y] of [[300, 548], [1000, 556]]) { ctx.save(); ctx.translate(x - pan * .3, y); ctx.scale(.35, .35); P2.fire(ctx, 0, 0, 1, t); ctx.restore(); }
    if (o.basin) { const top = o.basinY || 560; water(ctx, t, top, H, v, { flow: .3 }); ln(ctx, [[0, top], [W, top]], 4); P2.pebbles(ctx, 0, top - 30, W, 26, 30, 9, pc('#d8b880')); EF().lilies(ctx, 40, top + 30, 300, 8, 3, t); }
    if (o.workers) { const r = rng(4); for (let i = 0; i < o.workers; i++) ew(ctx, 420 + r() * 460 - pan * .3, 476 + r() * 50, .38 + r() * .1, t, { pose: i % 4 ? 'walk' : 'carry', seed: i, dir: r() < .5 ? -1 : 1 }); }
    motes(ctx, t, 14, 7);
  }

  // ================= Heit el-Ghurab: the workers' town =================
  const townLayer = v => layer('town2-' + v, g => {
    skyFor(g, v); const dark = v === 'dusk' ? .82 : v === 'night' ? .5 : 1;
    pyramid(g, 980, 340, 300, { k: 1, col: mul('#e2cc9c', dark) }); pyramid(g, 700, 346, 340, { k: 1, col: mul('#e8d4a6', dark) });
    g.fillStyle = grad(g, 0, 330, 0, H, [[0, mul('#d8b880', dark)], [1, mul('#b48a5a', dark)]]); g.fillRect(-PAD, 340, W + PAD * 2, H - 340);
    for (let x = 260; x < W + PAD; x += 46) G.EF.palm(g, x, 346, .32 + (x % 3) * .05, 600 + x, { dark: dark * .85, dates: false, fronds: 7 }); G.EF.bushMass(g, 240, 352, W + PAD - 240, 26, 61, dark * .9);
    // the Wall of the Crow on the left
    sh(g, mul('#c8b090', dark), 4, c => { c.moveTo(-PAD, 470); c.lineTo(-PAD, 230); c.lineTo(250, 260); c.lineTo(250, 470); c.closePath(); }); g.strokeStyle = 'rgba(90,70,50,.35)'; g.lineWidth = 2; for (let y = 250; y < 470; y += 22) { g.beginPath(); g.moveTo(-PAD, y - 6); g.lineTo(250, y + 8); g.stroke(); }
    sh(g, mul('#b8a080', dark), 3, c => { c.moveTo(80, 300); c.lineTo(160, 304); c.lineTo(160, 470); c.lineTo(80, 470); c.closePath(); }); sh(g, '#2a1e16', 0, c => c.rect(98, 330, 44, 140));
    // long galleries (barracks) in rows, mud brick with flat roofs and doorways
    for (let row = 0; row < 3; row++) { const y = 380 + row * 70, hh = 40 + row * 10; for (let i = 0; i < 5; i++) { const x = 300 + i * 190 - row * 40, w = 160 + row * 10;
      sh(g, mul(row % 2 ? '#c49a68' : '#b88a5a', dark), 3, c => c.rect(x, y - hh, w, hh)); g.fillStyle = mul('#d6b080', dark); g.fillRect(x, y - hh, w, 6); g.fillStyle = 'rgba(60,40,20,.55)'; for (let d = 0; d < 4; d++) g.fillRect(x + 14 + d * w / 4, y - hh * .62, 10, hh * .62); P2.grain(g, x, y - hh, w, hh, .3, 50 + i + row * 7, 'overlay', .6); } }
    // cattle pen
    for (let i = 0; i < 9; i++) ln(g, [[900 + i * 30, 640], [900 + i * 30, 600]], 4, '#6a4a2a'); ln(g, [[900, 610], [1140, 610]], 3, '#6a4a2a'); ln(g, [[900, 628], [1140, 628]], 3, '#6a4a2a');
    P2.grain(g, -PAD, 340, W + PAD * 2, 380, .3, 61, 'overlay', .8);
    G.EF.bushMass(g, W + PAD - 300, H, 300, 140, 63, dark); G.EF.palm(g, W + 30, H - 10, 1.3, 65, { dark, lean: -.2 }); G.EF.palm(g, W - 90, H, 1.0, 67, { dark, lean: -.1 });
    for (const x of [320, 560, 820]) G.EF.tuft(g, x, 690, 1.3, mul('#7a9a4a', dark)); G.EF.jar(g, 300, 640, 1.2); G.EF.jar(g, 330, 650, 1, '#a85a36'); G.EF.basket(g, 380, 660, 1, 'grain');
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
  const cemLayer = v => layer('cem2-' + v, g => {
    skyFor(g, v); const dark = v === 'dusk' ? .8 : v === 'night' ? .5 : 1;
    pyramid(g, 860, 360, 520, { k: 1, col: mul('#e4cc98', dark) });
    for (let x = -PAD; x < 560; x += 50) G.EF.palm(g, x, 362, .3 + (x % 3) * .04, 800 + x, { dark: dark * .85, dates: false, fronds: 7 });
    dunes(g, 356, dark, 71); for (const [x, y, w] of [[60, 700, 140], [1180, 690, 120]]) G.EF.rock(g, x, y, w, w * .45, x, mul('#b8946a', dark));
    const r = rng(12); const tombs = []; for (let i = 0; i < 26; i++) tombs.push([-120 + r() * 1500, 400 + r() * 300, r()]); tombs.sort((a, b) => a[1] - b[1]);
    for (const [x, y, k] of tombs) { const s = .5 + (y - 400) / 300 * .9; if (k < .3) { const w = 60 * s; g.fillStyle = mul('#c8a878', dark); g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x, y - w * .8); g.lineTo(x + w / 2, y); g.closePath(); g.fill(); g.lineWidth = 3; g.strokeStyle = OUT; g.stroke(); g.fillStyle = 'rgba(80,50,20,.25)'; g.beginPath(); g.moveTo(x, y - w * .8); g.lineTo(x + w / 2, y); g.lineTo(x + w * .1, y); g.closePath(); g.fill(); }
      else { const w = (70 + k * 60) * s, h = 34 * s; sh(g, mul(k > .65 ? '#b8865a' : '#cdb48a', dark), 3, c => { c.moveTo(x - w / 2, y); c.lineTo(x - w / 2 + 6 * s, y - h); c.lineTo(x + w / 2 - 6 * s, y - h); c.lineTo(x + w / 2, y); c.closePath(); }); g.strokeStyle = 'rgba(80,50,30,.35)'; g.lineWidth = 1.5; for (let yy = y - h + 7 * s; yy < y; yy += 7 * s) { g.beginPath(); g.moveTo(x - w / 2 + 4, yy); g.lineTo(x + w / 2 - 4, yy); g.stroke(); } sh(g, '#3a2a1e', 0, c => c.rect(x - 6 * s, y - h * .8, 12 * s, h * .8)); } }
  });
  function cemetery(ctx, t, pan, o = {}) { put(ctx, cemLayer(o.v || 'dusk'), pan, .4); motes(ctx, t, 10, 11); }

  // ================= Wadi al-Jarf (v2: layered rock hill with ledges + shrubs, framed galleries, beach with surf) =================
  const GAL = [[40, 104, 128, 0], [190, 118, 150, 1], [370, 104, 132, 0], [520, 104, 132, 0]];
  const jarfLayer = v => layer('jarf4-' + v, g => {
    skyFor(g, v === 'day' ? 'day' : v); const dk = v === 'dusk' ? .8 : v === 'night' ? .45 : 1, r = rng(31);
    P.hills(g, 352, [[600, 352], [760, 318], [900, 326], [1060, 300], [1200, 316], [W + PAD, 306]], mul('#d8b07a', dk), mul('#c09060', dk), 2);
    g.fillStyle = grad(g, 0, 350, 0, 520, [[0, mul('#5ab0d8', dk)], [.5, mul('#3a8cc0', dk)], [1, mul('#2a6aa0', dk)]]); g.fillRect(-PAD, 350, W + PAD * 2, 170);
    g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 26; i++) { const y = 356 + i * 6, w = 40 + i * 10; g.fillStyle = `rgba(255,250,230,${.3 - i * .01})`; g.fillRect(1050 - w / 2 + Math.sin(i) * 10, y, w, 2.5); } g.restore();
    const hill = [[-PAD, 210], [-60, 150], [40, 126], [160, 132], [300, 118], [420, 150], [560, 186], [660, 260], [740, 360], [790, 470], [800, 520]];
    const sil = c => { c.moveTo(-PAD, H); hill.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(800, H); c.closePath(); };
    g.save(); g.beginPath(); sil(g); g.clip(); g.fillStyle = grad(g, 0, 110, 800, 500, [[0, mul('#c48a56', dk)], [.5, mul('#b47a48', dk)], [1, mul('#946036', dk)]]); g.fillRect(-PAD, 0, 1100, H);
    for (let row = 0; row < 5; row++) { const y = 160 + row * 70 + (row % 2) * 12; g.fillStyle = 'rgba(70,40,20,.26)'; g.beginPath(); g.moveTo(-PAD, y); for (let x = -PAD; x <= 900; x += 60) g.lineTo(x, y + Math.sin(x * .02 + row) * 8); g.lineTo(900, y + 8); g.lineTo(-PAD, y + 8); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,220,170,.22)'; g.fillRect(-PAD, y - 4, 1100, 4);
      for (let i = 0; i < 4; i++) { const x = -PAD + r() * 1020; g.fillStyle = 'rgba(70,40,20,.28)'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 30, y); g.lineTo(x + 12, y + 34); g.closePath(); g.fill(); } }
    for (let i = 0; i < 6; i++) { const x = -PAD + 60 + i * 170 + r() * 40, ww = 2 + r() * 3; g.strokeStyle = 'rgba(60,34,16,.5)'; g.lineWidth = ww; g.beginPath(); g.moveTo(x, 100); for (let y = 100; y < 480; y += 40) g.lineTo(x + (r() - .5) * 16, y); g.stroke(); }
    P2.grain(g, -PAD, 100, 1100, 620, .45, 35, 'overlay', 1); g.restore(); g.beginPath(); hill.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke();
    for (const [x, y] of [[0, 150], [150, 135], [330, 125], [480, 168], [620, 236], [90, 250], [440, 260]]) { EF().bushMass(g, x - 20, y + 6, 46, 22, x, dk, ['#5a6a2a', '#7a8a3a', '#9aa848', '#c8c060']); EF().tuft(g, x + 10, y + 6, 1.2, mul('#a89a48', dk)); }
    // beach
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, mul('#ecd09a', dk)], [1, mul('#d4ac72', dk)]]); g.beginPath(); g.moveTo(-PAD, 486); g.lineTo(760, 486); g.quadraticCurveTo(980, 520, 1100, 600); g.quadraticCurveTo(1200, 680, W + PAD, 700); g.lineTo(W + PAD, H); g.lineTo(-PAD, H); g.closePath(); g.fill();
    P2.grain(g, -PAD, 486, W + PAD * 2, 240, .35, 81, 'overlay', .8); g.strokeStyle = 'rgba(170,120,70,.35)'; g.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = -PAD + r() * 1200, y = 520 + r() * 190, L = 40 + r() * 60; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + L / 2, y - 6, x + L, y); g.stroke(); }
    P2.pebbles(g, -PAD, 500, 1300, 220, 70, 8, pc(mul('#b09070', dk)));
    for (const [x, y, w] of [[440, 570, 120], [700, 520, 90], [80, 640, 140]]) EF().rock(g, x, y, w, w * .45, x, mul('#a87a52', dk));
    for (const [x, y] of [[40, 690], [560, 700], [900, 720], [240, 600], [780, 486]]) EF().bushMass(g, x, y, 90, 30, x + 5, dk, ['#9a7a2a', '#c8a03a', '#e8c050', '#f6dc80']);
    // the galleries: stone frames (one arched), dark mouths
    for (const [x, w, h, arch] of GAL) { const yb = 486;
      sh(g, '#1e140e', 3.5, c => { c.moveTo(x, yb); c.lineTo(x, yb - h + (arch ? 30 : 0)); if (arch) c.quadraticCurveTo(x + w / 2, yb - h - 30, x + w, yb - h + 30); else c.lineTo(x + w, yb - h); c.lineTo(x + w, yb); c.closePath(); });
      if (arch) for (let i = 0; i <= 8; i++) { const a = PI + i / 8 * PI, cx = x + w / 2, cy = yb - h + 30; sh(g, mul('#cfb48e', dk), 2, c => c.ellipse(cx + Math.cos(a) * (w / 2 + 8), cy + Math.sin(a) * 50, 12, 9, a, 0, TAU)); }
      for (const sx of [x - 12, x + w]) sh(g, mul('#c8ac86', dk), 2.5, c => c.rect(sx, yb - h + (arch ? 28 : 0), 12, h - (arch ? 28 : 0))); if (!arch) sh(g, mul('#cfb48e', dk), 2.5, c => c.rect(x - 14, yb - h - 12, w + 28, 14)); }
  });
  function jarf(ctx, t, pan, o = {}) { const v = o.v || 'day'; put(ctx, jarfLayer(v), pan, .4); if (v !== 'night') EF().flock(ctx, t, 900, 230, 5, .6, 14);
    // surf rolling onto the beach
    for (let i = 0; i < 4; i++) { const k = ((t * .18 + i / 4) % 1), y = lerp(470, 640, k), a = Math.sin(k * PI); ctx.save(); ctx.globalAlpha = a * .9; ctx.strokeStyle = '#fbfaf4'; ctx.lineWidth = 4 + k * 4; ctx.beginPath(); ctx.moveTo(800 + k * 260 - pan * .4, y - 40); ctx.quadraticCurveTo(1000 + k * 100 - pan * .4, y, W + 40, y + 50 * k); ctx.stroke(); ctx.restore(); }
    const k = o.sealed ?? 1; if (k > 0) for (const [x0, w, h, arch] of GAL) { const x = x0 - pan * .4, top = 486 - h + (arch ? 30 : 0); ctx.save(); ctx.globalAlpha = k;
      const sl = [[x + 3, top + 4, w * .52, (486 - top) * .55], [x + w * .54, top + 4, w * .44, (486 - top) * .4], [x + 3, top + (486 - top) * .58, w * .4, (486 - top) * .41], [x + w * .44, top + (486 - top) * .44, w * .54, (486 - top) * .55]];
      sl.forEach(([bx, by, bw, bh], q) => { sh(ctx, ['#cbc2b0', '#bdb4a2', '#c4bba8', '#b6ad9c'][q], 2.5, c => { c.moveTo(bx + 3, by); c.lineTo(bx + bw - 2, by + 2); c.lineTo(bx + bw, by + bh - 3); c.lineTo(bx + 2, by + bh); c.closePath(); }); ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(bx + 4, by + 3, bw - 8, 4); ctx.strokeStyle = 'rgba(80,70,60,.4)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(bx + bw * .3, by + 4); ctx.lineTo(bx + bw * .4, by + bh * .5); ctx.lineTo(bx + bw * .34, by + bh - 4); ctx.stroke(); });
      ctx.strokeStyle = '#4a7a2e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + w * .2, top); ctx.quadraticCurveTo(x + w * .1, top + 40, x + w * .26, top + 70); ctx.stroke(); for (let i = 0; i < 5; i++) sh(ctx, '#5a9a3a', 1.2, c => c.ellipse(x + w * .16 + (i % 2) * 10, top + 12 + i * 12, 5, 3, .5, 0, TAU)); ctx.restore(); }
    if (o.scrolls) { const sk = o.scrolls; for (let i = 0; i < 5; i++) { const x = 70 + i * 66 - pan * .4, y = 516 - (i % 2) * 6; ctx.save(); ctx.globalAlpha = clamp(sk * 5 - i); ctx.translate(x, y); ctx.rotate((i % 3 - 1) * .2);
      sh(ctx, '#d8c8a8', 2.6, c => c.roundRect(-26, -10, 52, 20, 9)); sh(ctx, '#e8dcc0', 2, c => c.ellipse(-26, 0, 6, 10, 0, 0, TAU)); ctx.strokeStyle = 'rgba(120,90,50,.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-14, -9); ctx.lineTo(-14, 9); ctx.moveTo(8, -9); ctx.lineTo(8, 9); ctx.stroke(); ctx.restore(); } }
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
    // relief-map look (user's repainted map): deep blue seas with turquoise shallows, sun-baked desert with shaded mountains + dune streaks
    g.fillStyle = grad(g, 0, 0, MW, MH, [[0, '#1e5486'], [1, '#163e6a']]); g.fillRect(0, 0, MW, MH); P2.grain(g, 0, 0, MW, MH, .25, 3, 'overlay', 2);
    const path = pts => { const p = new Path2D(); pts.forEach((q, i) => { const [x, y] = px(...q); i ? p.lineTo(x, y) : p.moveTo(x, y); }); p.closePath(); return p; };
    const EGY = path([[20, 40], ...COAST.slice(0, 9), [32.3, 31.27], [32.35, 30.6], ...SUEZ, [35.6, 20], [20, 20]]), SIN = path(SINAI), ARB = path([[34.95, 29.5], [35.0, 32.6], [40, 32.6], [40, 20], [39.2, 21.4], [38.3, 23.6], [37.4, 25.0], [36.6, 26.2], [35.8, 27.3], [35.15, 28.05], [34.98, 29.3]]);
    g.save(); g.filter = 'blur(14px)'; g.lineWidth = 46; g.strokeStyle = 'rgba(80,190,200,.6)'; for (const p of [EGY, SIN, ARB]) g.stroke(p); g.restore();
    for (const p of [EGY, SIN, ARB]) { g.fillStyle = '#e2c084'; g.fill(p); }
    g.save(); const land = new Path2D(); land.addPath(EGY); land.addPath(SIN); land.addPath(ARB); g.clip(land);
    g.fillStyle = grad(g, 0, 0, 0, MH, [[0, 'rgba(200,170,110,.25)'], [1, 'rgba(230,180,110,.25)']]); g.fillRect(0, 0, MW, MH); P2.grain(g, 0, 0, MW, MH, .55, 5, 'multiply', 2.5); P2.grain(g, 0, 0, MW, MH, .35, 9, 'overlay', 1);
    const R2 = rng(9);
    for (let i = 0; i < 5200; i++) {   // mountain ridges: Eastern Desert (east of the Nile), Sinai, Arabia — shaded SE, lit NW
      const zone = R2(), lon = zone < .55 ? 32.0 + R2() * 2.6 : zone < .8 ? 33.2 + R2() * 1.6 : 35.4 + R2() * 4, lat = zone < .55 ? 22 + R2() * 7.6 : zone < .8 ? 27.9 + R2() * 1.9 : 22 + R2() * 9, [x, y] = px(lon, lat);
      if (zone < .55 && lon < 32.9 && lat > 27.5) continue; const L = 6 + R2() * 16, a = .9 + (R2() - .5) * .8;
      g.strokeStyle = 'rgba(110,64,30,.45)'; g.lineWidth = 2.6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke();
      g.strokeStyle = 'rgba(255,236,200,.4)'; g.lineWidth = 1.8; g.beginPath(); g.moveTo(x - 2, y - 2); g.lineTo(x - 2 + Math.cos(a) * L, y - 2 + Math.sin(a) * L); g.stroke(); }
    for (let i = 0; i < 900; i++) { const [x, y] = px(24 + R2() * 6.2, 22 + R2() * 8.6), L = 30 + R2() * 70; g.strokeStyle = `rgba(170,110,50,${.12 + R2() * .12})`; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + L / 2, y - 8, x + L, y + 4); g.stroke(); }   // dune streaks
    for (let i = 0; i < 6; i++) { const [x, y] = px(26 + R2() * 4, 24 + R2() * 5); g.fillStyle = 'rgba(160,100,50,.18)'; g.beginPath(); g.ellipse(x, y, 60 + R2() * 90, 30 + R2() * 40, R2(), 0, TAU); g.fill(); }   // depressions
    g.restore(); for (const p of [EGY, SIN, ARB]) { g.lineWidth = 3; g.strokeStyle = 'rgba(70,50,30,.8)'; g.stroke(p); }
    // green valley + delta
    const band = (pts, w, col) => { g.beginPath(); pts.forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.lineWidth = w; g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
    band(NILE, 44, 'rgba(60,110,40,.75)'); band(NILE, 22, 'rgba(90,140,50,.6)'); g.fillStyle = 'rgba(60,110,40,.7)'; g.beginPath(); [[31.15, 30.4], [30.37, 31.46], [31.0, 31.6], [31.81, 31.42]].forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.fill();
    for (const r of [NILE, ROSETTA, DAMIETTA]) { band(r, 9, '#4f86a0'); band(r, 4, '#8fc0d6'); }
    const lab = (s, lon, lat, sz, col = 'rgba(90,64,38,.55)') => { const [x, y] = px(lon, lat); g.save(); g.font = DISP(sz); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col; g.letterSpacing = '4px'; g.fillText(s, x, y); g.restore(); };
    lab('EGYPT', 29.0, 27.2, 46); lab('SINAI', 33.9, 29.2, 26); lab('MEDITERRANEAN SEA', 28.5, 32.2, 26, 'rgba(200,228,248,.55)'); lab('RED SEA', 35.2, 26.2, 26, 'rgba(200,228,248,.55)'); lab('EASTERN DESERT', 33.0, 26.8, 18, 'rgba(90,64,38,.4)'); lab('WESTERN DESERT', 28.0, 25.6, 18, 'rgba(90,64,38,.4)');
    { const [x, y] = px(26.6, 24.6); g.save(); g.translate(x, y);   // brass compass rose
      sh(g, null, 6, circ(0, 0, 92)); g.lineWidth = 4; g.strokeStyle = '#b08a3a'; g.beginPath(); g.arc(0, 0, 92, 0, TAU); g.stroke(); g.lineWidth = 2; g.beginPath(); g.arc(0, 0, 78, 0, TAU); g.stroke();
      for (let k = 0; k < 8; k++) { const a = k * PI / 4, L = k % 2 ? 56 : 104; sh(g, k % 2 ? '#8a6a2a' : '#d8b050', 2, c => { c.moveTo(Math.cos(a) * L, Math.sin(a) * L); c.lineTo(Math.cos(a + .14) * 14, Math.sin(a + .14) * 14); c.lineTo(Math.cos(a - .14) * 14, Math.sin(a - .14) * 14); c.closePath(); }); }
      sh(g, '#e8c870', 2, circ(0, 0, 9)); [['N', 0, -124], ['S', 0, 124], ['E', 124, 0], ['W', -124, 0]].forEach(([l, dx, dy]) => txt(g, l, dx, dy, 'bold 26px Georgia, serif', '#4a3418')); g.restore(); }
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
    if (o.label !== false) G.EK.scroll(ctx, o.label || place, x + (o.dx ?? 0), y + (o.dy ?? -70), K.pop(lt, t0 + .1), { size: o.size || 22 }); }

  G.ES = { SKY, skyFor, palm, reeds, nile, water, ew, boat, cliff, block, pyramid, sphinx, giza, cow, town, cemetery, jarf, museum, lab, hatnub, chamber, desertRamp, sledge, map, toS, route, pin, PLACES, NILE, txt, FONT, DISP };
})(window);
