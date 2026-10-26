/* "Where Does It Go?" — sets, part 3: grounded rebuilds (user notes 2026-10-26, round 2).
 * Rules applied: background stays background and ground stays ground (no bushes straddling the horizon), every tree has a
 * trunk standing on the ground with a shadow, buildings stand on a ground plane (never on sky or water), distance has life
 * (boats on the sea, people on the road), nothing hides the subject (the farm pen is in the clear).
 *   village(ctx,t,k,o)   Neolithic farming village: sea + boats far off, a straight dirt road with walkers, fields, a sheep pen
 *   orkney(ctx,t,pan,o)  Skara Brae from outside: turf-roofed stone houses half sunk in the ground, linked by a covered passage,
 *                        a path to the door, skin boats on the bay
 *   rome(ctx,t,o)        Rome: temples on podiums and the aqueduct on its piers, all on the ground; a paved road; umbrella pines
 *                        and cypresses; the stone quay with the Cloaca Maxima outlet into the Tiber
 *   boat(ctx,x,y,s,t,kind)  'skin' | 'dugout' | 'roman' — small boats with paddlers / a sail, bobbing */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, ES = G.ES, EF = G.EF, TS = G.TS, FA = G.Fauna, PR = G.Props, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k), { slab, stoneCourses } = TS;
  const shadow = (g, x, y, rx, a = .3, ry = rx * .2) => { g.save(); g.fillStyle = `rgba(40,30,15,${a})`; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, TAU); g.fill(); g.restore(); };
  const tree = (g, x, y, s, seed, t = 0) => { shadow(g, x + 8 * s / .3, y + 2, 120 * s, .28); P.tree(g, x + PAD, y, t, seed, s); };   // P.tree places the trunk PAD px left of x, so compensate
  const fig = (ctx, who, x, y, s, t, o = {}) => G.VK.fig(ctx, x, y, s, G.EP.cast(who, Object.assign({ t }, o)));

  // ---------- boats ----------
  function boat(ctx, x, y, s, t, kind = 'skin', ph = 0) { const b = Math.sin(t * 1.4 + ph) * 2, r = Math.sin(t * 1.1 + ph) * .03; ctx.save(); ctx.translate(x, y + b); ctx.rotate(r); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-80, 8, 160, 3);
    if (kind === 'roman') { ln(ctx, [[0, -2], [0, -120]], 5); sh(ctx, '#f2e6cc', 3, c => { c.moveTo(-50, -112); c.lineTo(50, -112); c.quadraticCurveTo(58, -60, 50, -24); c.lineTo(-50, -24); c.quadraticCurveTo(-42, -60, -50, -112); c.closePath(); }); ln(ctx, [[-56, -114], [56, -114]], 4); }
    sh(ctx, kind === 'skin' ? '#8a6a48' : kind === 'roman' ? '#7a4a2a' : '#5a3a22', 3.5, c => { c.moveTo(-80, -14); c.quadraticCurveTo(0, 6, 80, -14); c.quadraticCurveTo(70, 12, 0, 12); c.quadraticCurveTo(-70, 12, -80, -14); c.closePath(); });
    if (kind !== 'roman') for (const [px, ph2] of [[-28, 0], [26, 1.6]]) { const a = Math.sin(t * 3 + ph + ph2) * .5;   // paddlers
      sh(ctx, '#6a4a30', 3, c => c.roundRect(px - 9, -40, 18, 30, 7)); sh(ctx, '#e8b890', 3, circ(px, -48, 10)); ln(ctx, [[px + Math.cos(a) * 30, -36 + Math.sin(a) * 10], [px - Math.cos(a) * 30, 14 - Math.sin(a) * 6]], 4, '#5a3a22'); }
    ctx.restore(); }
  TS.boat = boat;
  const seaBand = (g, y0, y1, c0, c1, seed) => { g.fillStyle = grad(g, 0, y0, 0, y1, [[0, c0], [1, c1]]); g.fillRect(-PAD, y0, W + PAD * 2, y1 - y0);
    const r = rng(seed); for (let i = 0; i < 70; i++) { const x = -PAD + r() * (W + PAD * 2), y = y0 + 3 + r() * (y1 - y0 - 6), w = 10 + r() * 34 * (y - y0 + 10) / (y1 - y0); g.strokeStyle = `rgba(255,255,255,${.25 + r() * .35})`; g.lineWidth = 1.6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y); g.stroke(); } };

  // =================== the farming village ===================
  const HZ = 360, RX = y => lerp(12, 150, clamp((y - HZ) / (H - HZ))), RC = 640;   // road half-width + centre
  function field(g, pts, col, row) { sh(g, col, 2.5, c => { pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); });
    g.save(); g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.clip(); g.strokeStyle = row; g.lineWidth = 2;
    const ys = pts.map(p => p[1]); for (let y = Math.min(...ys) + 4; y < Math.max(...ys); y += 6) { g.beginPath(); g.moveTo(-PAD, y); g.lineTo(W + PAD, y); g.stroke(); } g.restore(); }
  const villageL = () => layer('t-village2', g => { ES.skyFor(g, 'day');
    P.hills(g, 330, [[-PAD, 296], [150, 262], [380, 284], [620, 252], [900, 280], [1120, 258], [W + PAD, 286]], '#a9c49e', '#8aa884', 2);
    seaBand(g, 318, 352, '#86bcd4', '#4e8eb2', 5);
    sh(g, '#e4d29e', 2.5, c => { c.moveTo(-PAD, 351); c.quadraticCurveTo(400, 346, 700, 352); c.quadraticCurveTo(1000, 357, W + PAD, 350); c.lineTo(W + PAD, 364); c.lineTo(-PAD, 364); c.closePath(); });
    sh(g, '#8ab25e', 3, c => { c.moveTo(-PAD, HZ); c.quadraticCurveTo(640, 354, W + PAD, HZ); c.lineTo(W + PAD, H); c.lineTo(-PAD, H); c.closePath(); }); P2.meadow(g, HZ + 2, H, { seed: 3 });
    g.fillStyle = grad(g, 0, HZ, 0, H, [[0, 'rgba(255,255,230,.18)'], [1, 'rgba(30,50,20,.22)']]); g.fillRect(-PAD, HZ, W + PAD * 2, H - HZ);
    // fields (barley + young green crop) left and right of the road, in the middle distance
    field(g, [[30, 372], [330, 372], [310, 420], [-10, 420]], '#d8c070', 'rgba(150,120,40,.45)'); field(g, [[330, 374], [520, 374], [505, 410], [318, 410]], '#9cc46a', 'rgba(60,100,30,.4)');
    field(g, [[780, 374], [1000, 374], [1030, 416], [790, 416]], '#d8c070', 'rgba(150,120,40,.45)'); field(g, [[1000, 372], [1290, 372], [1330, 424], [1030, 424]], '#a8cc70', 'rgba(60,100,30,.4)');
    // the straight dirt road running from the shore to us
    sh(g, '#cfae7a', 3, c => { c.moveTo(RC - RX(HZ), HZ); c.lineTo(RC + RX(HZ), HZ); c.lineTo(RC + RX(H) + 10, H); c.lineTo(RC - RX(H) - 10, H); c.closePath(); });
    g.strokeStyle = 'rgba(120,90,50,.35)'; g.lineWidth = 3; for (const f of [-.45, .45]) { g.beginPath(); g.moveTo(RC + f * RX(HZ), HZ); g.lineTo(RC + f * RX(H), H); g.stroke(); }
    const r = rng(17); for (let i = 0; i < 90; i++) { const y = HZ + 6 + Math.pow(r(), .7) * (H - HZ - 6), x = RC + (r() - .5) * 1.8 * RX(y), s = 1 + (y - HZ) / 60; g.fillStyle = r() < .5 ? 'rgba(150,120,80,.6)' : 'rgba(235,215,170,.7)'; g.beginPath(); g.ellipse(x, y, s * 1.6, s, 0, 0, TAU); g.fill(); }
    for (let y = HZ + 6; y < H; y += 26) { EF.tuft(g, RC - RX(y) - 6, y, .4 + (y - HZ) / 300, '#5e8a3e'); EF.tuft(g, RC + RX(y) + 6, y + 12, .4 + (y - HZ) / 300, '#5e8a3e'); }
    // trees with trunks on the far shore (small = far), and two near ones framing the edges
    // the sheep pen (left, in the clear) — back rail, side rails; the front rail is drawn live in front of the sheep
    PR.fence(g, 150, 350, 498, 34, '#8a6a44'); ln(g, [[150, 498], [130, 566]], 5, '#6a4a2a'); ln(g, [[350, 498], [370, 566]], 5, '#6a4a2a');
    g.fillStyle = 'rgba(120,100,50,.25)'; g.beginPath(); g.moveTo(150, 498); g.lineTo(350, 498); g.lineTo(370, 566); g.lineTo(130, 566); g.closePath(); g.fill();
  });
  const HUTS = [[470, 520], [830, 560], [960, 450], [330, 450], [1090, 620], [520, 430], [760, 430], [180, 650], [1070, 485], [880, 690], [420, 700], [100, 440]];
  function hut(ctx, x, y, s, seed) { const r = rng(seed); shadow(ctx, x + 6, y + 2, 110 * s, .3); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#b49a74', 4, c => c.rect(-70, -70, 140, 70)); for (let i = 0; i < 5; i++) ln(ctx, [[-60 + i * 30, -66], [-60 + i * 30, -4]], 2, 'rgba(90,60,30,.3)');
    sh(ctx, mul('#c8a24a', .9 + r() * .15), 4, c => { c.moveTo(-96, -60); c.quadraticCurveTo(0, -190, 96, -60); c.closePath(); });
    ctx.strokeStyle = 'rgba(120,90,30,.4)'; ctx.lineWidth = 2; for (let i = -80; i < 90; i += 14) { ctx.beginPath(); ctx.moveTo(i * .4, -150); ctx.lineTo(i, -64); ctx.stroke(); }
    sh(ctx, '#3a2a1a', 3, c => c.roundRect(-18, -54, 36, 54, 10)); ctx.restore(); }
  function village(ctx, t, k = 0, o = {}) { put(ctx, villageL(), o.pan || 0, .3); P.clouds(ctx, t, 0, [[100, 40, .8, 3, 6], [700, 70, .7, 5, 4]]);
    for (const [ph, y, s, kd] of [[0, 334, .22, 'dugout'], [500, 342, .26, 'skin'], [1100, 330, .2, 'dugout']]) boat(ctx, ((t * 9 + ph) % (W + 300)) - 150, y, s, t, kd, ph);
    // the far trees stand on the shore line, in front of the sea and its boats
    for (const [x, s, sd] of [[40, .15, 1], [120, .18, 2], [200, .14, 3], [560, .13, 4], [740, .13, 5], [1080, .16, 6], [1170, .19, 7], [1250, .15, 8]]) tree(ctx, x, HZ + 8, s, 40 + sd);
    // everything standing on the ground is drawn back-to-front by where it touches the ground (nearer covers further)
    const L = [];
    L.push([568, () => { for (const [x, y, s, d] of [[200, 540, .42, 1], [270, 552, .45, -1], [330, 528, .38, -1]]) FA.sheep(ctx, x, y, s, t + x, { dir: d, ph: x }); PR.fence(ctx, 130, 370, 568, 38, '#8a6a44'); }]);
    const n = Math.round(lerp(3, HUTS.length, clamp(k))); HUTS.slice(0, n).forEach(([x, y], i) => L.push([y, () => { hut(ctx, x, y, .55 + (y - 430) / 560, 10 + i); if (i === 1 && n > 3) G.VK.smoke(ctx, t, x, y - 130, .25); }]));
    L.push([560, () => tree(ctx, 60, 560, .5, 52, t)]); L.push([600, () => tree(ctx, 1250, 600, .55, 53, t)]);
    for (const [x, y] of [[560, 590], [600, 604], [900, 600]]) L.push([y, () => FA.chicken(ctx, x, y, .38 + (y - 560) / 500, t, { dir: x > 640 ? -1 : 1, ph: x })]);
    for (const [sp, ph, who, side] of [[.05, 0, 'neo1', -1], [.04, .5, 'neo2', 1]]) { const u = (t * sp + ph) % 1, toward = side < 0, y = toward ? lerp(HZ + 20, 700, u) : lerp(700, HZ + 20, u), s = lerp(.06, .34, (y - HZ) / (H - HZ));
      L.push([y, () => fig(ctx, who, RC + side * RX(y) * .4, y, s, t, { walk: t * 7, turn: toward ? 0 : .9, back: !toward })]); }
    L.push([660, () => FA.dog(ctx, RC + 40, 660, .5, t, { dir: -1, coat: '#7a5a3a' })]);
    L.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f()); }
  TS.village = village;

  // =================== Orkney: Skara Brae from outside ===================
  const orkL = v => layer('t-ork2-' + v, g => {
    P2.overcast(g, v === 'storm' ? [[0, '#5e6a78'], [.5, '#8a96a2'], [1, '#c6c8c2']] : [[0, '#7d8ea2'], [.45, '#b2bcc4'], [.75, '#d8d6cc'], [1, '#e6dfc8']], 3, [980, 220]);
    seaBand(g, 300, 470, '#8ea4aa', '#4e6e78', 8);
    P.hills(g, 330, [[-PAD, 318], [120, 300], [300, 290], [420, 312], [560, 330]], '#7c8c74', '#6a7a62', 2);
    sh(g, '#7aa25a', 3, c => { c.moveTo(-PAD, H); c.lineTo(-PAD, 430); c.quadraticCurveTo(300, 410, 640, 440); c.quadraticCurveTo(980, 470, W + PAD, 452); c.lineTo(W + PAD, H); c.closePath(); });
    P2.meadow(g, 440, H, { seed: 12 }); g.fillStyle = grad(g, 0, 430, 0, H, [[0, 'rgba(255,255,230,.15)'], [1, 'rgba(30,50,20,.25)']]); g.fillRect(-PAD, 430, W + PAD * 2, H - 430);
    // the village: stone-walled houses dug into the ground, roofed with turf, joined by a low covered passage
    const dome = (c, cx, by, rw, rh) => { c.moveTo(cx - rw, by); c.bezierCurveTo(cx - rw * .95, by - rh * 1.25, cx + rw * .95, by - rh * 1.25, cx + rw, by); c.closePath(); };
    const mound = (cx, by, rw, rh, seed, door = true) => { shadow(g, cx, by + 2, rw * 1.1, .35, rw * .14);
      g.save(); g.beginPath(); dome(g, cx, by, rw, rh); g.fillStyle = grad(g, 0, by - rh, 0, by, [[0, '#93be6a'], [1, '#5c8a3e']]); g.fill(); g.clip();
      stoneCourses(g, cx - rw, by - rh * .42, rw * 2, rh * .42, '#a89c84', seed);
      g.strokeStyle = '#5e8a40'; g.lineWidth = 2.5; const r = rng(seed); for (let x = cx - rw; x < cx + rw; x += 6) { const y0 = by - rh * .42; g.beginPath(); g.moveTo(x, y0 - 4); g.lineTo(x + (r() - .5) * 4, y0 + 4 + r() * 8); g.stroke(); }
      g.strokeStyle = 'rgba(60,90,40,.45)'; g.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = cx + (r() - .5) * rw * 1.6, y = by - rh * .5 - r() * rh * .4; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 3, y - 7); g.stroke(); }
      g.restore(); g.beginPath(); dome(g, cx, by, rw, rh); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke();
      if (door) { sh(g, '#1c1812', 3, c => c.rect(cx - 15, by - 44, 30, 44)); slab(g, cx - 30, by - 56, 60, 14, '#b4a88e', seed + 3); }
      sh(g, '#3a3226', 2, c => c.ellipse(cx, by - rh * .93, 15, 5, 0, 0, TAU)); };
    mound(530, 598, 150, 34, 11, false); mound(870, 598, 140, 32, 12, false);   // the covered passages (low turf tunnels)
    mound(330, 590, 150, 100, 21); mound(1040, 588, 140, 94, 41); mound(700, 612, 175, 116, 31);
    // a trodden path to the main door, and loose stones by the walls
    sh(g, '#b8a27a', 2.5, c => { c.moveTo(684, 612); c.lineTo(716, 612); c.quadraticCurveTo(760, 660, 800, H); c.lineTo(660, H); c.quadraticCurveTo(670, 660, 684, 612); c.closePath(); });
    const r = rng(9); for (let i = 0; i < 26; i++) { const y = 616 + r() * 104, x = lerp(700, 730, (y - 612) / 108) + (r() - .5) * 90 * (y - 600) / 120; g.fillStyle = 'rgba(120,100,70,.5)'; g.beginPath(); g.ellipse(x, y, 4, 2.4, 0, 0, TAU); g.fill(); }
    for (const [x, y] of [[180, 600], [470, 618], [880, 630], [1160, 600]]) slab(g, x, y, 34, 14, '#9a8e76', x);
    for (const [x, y] of [[180, 520], [1180, 520], [80, 640], [1220, 660]]) EF.tuft(g, x, y, 1.6, '#5e8a3e');
  });
  const ROOFS = [[330, 497], [700, 504], [1040, 500]];
  function orkney(ctx, t, pan = 0, o = {}) { put(ctx, orkL(o.v || 'grey'), pan, .4); const p = -pan * .4;
    for (const [ph, y, s] of [[0, 360, .3], [700, 400, .36], [1200, 336, .24]]) boat(ctx, ((t * 7 + ph) % (W + 300)) - 150 + p * .5, y, s, t, 'skin', ph);
    P.birds(ctx, t, [[100, 160, 30, 0], [400, 120, 26, 1.4], [700, 180, 34, 2.1]]);
    for (const [x, y] of ROOFS) G.VK.smoke(ctx, t, x + p, y, .28);
    for (const [x, y, s, d] of [[150, 650, .55, 1], [1190, 660, .58, -1], [960, 700, .6, 1], [470, 680, .5, -1]]) FA.sheep(ctx, x + p, y, s, t + x, { dir: d, ph: x });
    for (const [x, y] of [[90, 700], [380, 710], [1000, 712], [1180, 706]]) EF.flowers(ctx, x + p, y, 110, 7, x, t);
    const ph = t * .25, u = .5 - .5 * Math.cos(ph), y = lerp(712, 660, u), away = Math.sin(ph) > 0; fig(ctx, 'neo1', lerp(752, 728, u) + p, y, lerp(.3, .25, u), t, { walk: t * 7, turn: .1, back: away });
    FA.dog(ctx, 600 + p, 690, .5, t, { dir: 1, coat: '#3a3028' });
    P.blades(ctx, 40 - pan, 720, 26, 90, t * 1.8, 7); P.blades(ctx, 980 - pan, 720, 22, 80, t * 1.8, 9); if (o.mist !== false) P.motes(ctx, t, 18, 3); }
  TS.orkney = orkney;

  // =================== Rome ===================
  function column(g, x, y, h, w = 30, col = '#efe6d2') { sh(g, col, 3.5, c => c.rect(x - w / 2, y - h, w, h)); g.strokeStyle = 'rgba(120,100,70,.3)'; g.lineWidth = 2; for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(x + i * w / 4, y - h + 18); g.lineTo(x + i * w / 4, y - 10); g.stroke(); }
    sh(g, col, 3, c => c.rect(x - w / 2 - 8, y - h - 12, w + 16, 14)); sh(g, col, 3, c => c.rect(x - w / 2 - 6, y - 10, w + 12, 10)); }
  function temple(g, x, y, w, h, col = '#efe6d2') {   // y = ground; podium with steps, columns, pediment
    shadow(g, x + w / 2 + 14, y + 4, w * .62, .32, 14);
    sh(g, mul(col, .86), 3.5, c => c.rect(x - 16, y - 34, w + 32, 34)); for (let i = 0; i < 4; i++) sh(g, mul(col, .94 - i * .02), 2.5, c => c.rect(x + w * .3 - i * 10, y - 34 + i * 8.5, w * .4 + i * 20, 8.5));
    const yb = y - 34, n = 6; for (let i = 0; i < n; i++) column(g, x + 20 + i * (w - 40) / (n - 1), yb, h, 30, col);
    sh(g, col, 3.5, c => c.rect(x, yb - h - 40, w, 28)); sh(g, col, 3.5, c => { c.moveTo(x - 10, yb - h - 40); c.lineTo(x + w / 2, yb - h - 100); c.lineTo(x + w + 10, yb - h - 40); c.closePath(); });
    sh(g, mul(col, .88), 2.5, c => { c.moveTo(x + 30, yb - h - 46); c.lineTo(x + w / 2, yb - h - 88); c.lineTo(x + w - 30, yb - h - 46); c.closePath(); }); }
  function pine(g, x, y, s) { shadow(g, x + 10 * s, y + 2, 70 * s, .28); ln(g, [[x, y], [x - 6 * s, y - 120 * s], [x + 4 * s, y - 200 * s]], 14 * s + 4); ln(g, [[x, y], [x - 6 * s, y - 120 * s], [x + 4 * s, y - 200 * s]], 9 * s + 2, '#7a4f33');
    P.leafMass(g, x + 4 * s, y - 220 * s, 110 * s, 34 * s, Math.round(x), ['#2e4f26', '#3f6a2e', '#5a8a3c', '#7aa84a']); }
  function cypress(g, x, y, s) { shadow(g, x + 6 * s, y + 2, 30 * s, .28); ln(g, [[x, y], [x, y - 20 * s]], 8 * s + 2, '#6a4a2e');
    sh(g, '#2e5a2e', 3, c => { c.moveTo(x, y - 14 * s); c.quadraticCurveTo(x - 30 * s, y - 120 * s, x, y - 230 * s); c.quadraticCurveTo(x + 30 * s, y - 120 * s, x, y - 14 * s); });
    g.strokeStyle = 'rgba(120,170,90,.45)'; g.lineWidth = 2; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(x - 8 * s, y - i * 26 * s); g.quadraticCurveTo(x, y - i * 26 * s - 8, x + 6 * s, y - i * 26 * s - 2); g.stroke(); } }
  const GY = 432, QY = 440;   // ground line in front (paved road) + top of the river quay
  const romeL = () => layer('t-rome2', g => { ES.skyFor(g, 'day');
    P.hills(g, 330, [[-PAD, 300], [200, 262], [500, 286], [800, 256], [1100, 288], [W + PAD, 276]], '#9ab07a', '#7a9460', 2);
    for (const [x, s] of [[30, .1], [150, .12], [330, .1], [620, .11], [760, .1], [1180, .12], [1260, .1]]) tree(g, x, 300 + (x % 7), s, 70 + x % 9);
    // the ground of the city: an earth + grass plain from the hills down to the quay
    sh(g, '#b8b07c', 3, c => { c.moveTo(-PAD, 306); c.quadraticCurveTo(640, 296, W + PAD, 306); c.lineTo(W + PAD, QY); c.lineTo(-PAD, QY); c.closePath(); });
    g.fillStyle = grad(g, 0, 300, 0, QY, [[0, 'rgba(120,150,70,.55)'], [.6, 'rgba(160,150,90,.2)'], [1, 'rgba(120,100,60,.25)']]); g.fillRect(-PAD, 300, W + PAD * 2, QY - 300);
    const r = rng(31); for (let i = 0; i < 160; i++) { const x = -PAD + r() * (W + PAD * 2), y = 312 + r() * 80; g.strokeStyle = 'rgba(70,100,40,.4)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 2, y - 5); g.stroke(); }
    // the aqueduct striding over the plain on its piers (arches are real openings: the hills show through)
    const AY = 372; shadow(g, 640, AY + 3, 300, .22, 10);
    for (let x = 360; x < 920; x += 64) for (const [y0, ah] of [[AY, 96], [AY - 96, 72]]) { g.beginPath(); g.rect(x, y0 - ah, 64, ah); g.moveTo(x + 11, y0); g.lineTo(x + 11, y0 - ah + 34); g.quadraticCurveTo(x + 32, y0 - ah + 6, x + 53, y0 - ah + 34); g.lineTo(x + 53, y0); g.closePath();
      g.fillStyle = '#dcc49c'; g.fill('evenodd'); g.lineWidth = 3; g.strokeStyle = OUT; g.stroke(); g.fillStyle = 'rgba(120,90,50,.18)'; g.fillRect(x + 4, y0 - 10, 7, 10); }
    sh(g, '#cdb48e', 3, c => c.rect(354, AY - 96 - 72 - 22, 572, 22));
    // temples on their podiums, cypresses and umbrella pines, all standing on the plain
    pine(g, 90, 360, .75); cypress(g, 320, 392, .7); cypress(g, 950, 380, .75); pine(g, 1230, 372, .8);
    temple(g, 110, 400, 300, 150); temple(g, 930, 392, 260, 130, '#f4ecd8');
    // the paved road (via) in front, its kerb, and the stone quay down to the river
    sh(g, '#a89a80', 3, c => c.rect(-PAD, 404, W + PAD * 2, QY - 404)); const rr = rng(5); for (let x = -PAD; x < W + PAD; x += 46) for (let row = 0; row < 2; row++) slab(g, x + (row ? 23 : 0) + rr() * 4, 406 + row * 16, 42, 14, mul('#b8aa8e', .92 + rr() * .12), x + row);
    g.fillStyle = grad(g, 0, QY + 50, 0, H, [[0, '#8aa6a0'], [1, '#5a7a74']]); g.fillRect(-PAD, QY + 50, W + PAD * 2, H - QY - 50);
    sh(g, '#bfa47a', 3, c => c.rect(-PAD, QY, W + PAD * 2, 62)); stoneCourses(g, -PAD, QY + 4, W + PAD * 2, 54, '#c8b08a', 9);
    g.fillStyle = 'rgba(40,60,50,.35)'; g.fillRect(-PAD, QY + 58, W + PAD * 2, 8);
    // the great sewer's arch in the quay wall
    sh(g, '#2a2420', 4, c => { c.moveTo(380, QY + 62); c.lineTo(380, QY + 30); c.quadraticCurveTo(450, QY - 34, 520, QY + 30); c.lineTo(520, QY + 62); c.closePath(); });
    for (let i = 0; i < 9; i++) { const a = PI + i * PI / 8; slab(g, 450 + Math.cos(a) * 82 - 12, QY + 30 + Math.sin(a) * 82 - 8, 24, 16, '#b8a07a', i); }
  });
  function rome(ctx, t, o = {}) { put(ctx, romeL(), o.pan || 0, .3); P.clouds(ctx, t, 0, [[60, 40, .8, 3, 5], [760, 60, .7, 7, 4]]);
    for (let i = 0; i < 10; i++) { const k = ((t * .5 + i / 10) % 1); ctx.fillStyle = `rgba(150,140,110,${.6 * (1 - k)})`; ctx.beginPath(); ctx.ellipse(450 + k * 40, QY + 64 + k * 60, 40 + k * 60, 10 + k * 8, 0, 0, TAU); ctx.fill(); }
    for (let i = 0; i < 9; i++) { const x = 360 + ((t * 40 + i * 62) % 560); ctx.fillStyle = 'rgba(200,230,250,.85)'; ctx.fillRect(x, 186, 20, 4); }
    P.motes(ctx, t, 16, 6); }
  TS.rome = rome; TS.ROME_Y = { ground: GY, quay: QY };
})(window);
