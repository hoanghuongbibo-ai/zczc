/* "It's About Salt" — painted sets, part 1 (adds to G.TS; everything stands on a ground plane — see the skill's ground checklist)
 *   highway(ctx,t,o)    night interstate in a snowstorm: lamp posts, snowbanks, a plough truck throwing a white fan of salt
 *   kitchen(ctx,t,o)    a home kitchen counter at night: tiled splashback, window with falling snow, the SALT SHAKER's spot
 *   hallstatt(ctx,t,o)  Hallstatt on its lake under the Salzberg: steep wooded mountains, houses on the shore, church spire,
 *                       the salt-mine mouth high on the mountain, boats + swans on the lake, villagers on the lakeside path
 *   conifer(g,x,y,s)    a spruce with a trunk, standing on the ground */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, TS = G.TS, FA = G.Fauna, PR = G.Props, EF = G.EF, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k);
  const shadow = (g, x, y, rx, a = .3, ry = rx * .2) => { g.save(); g.fillStyle = `rgba(20,15,10,${a})`; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, TAU); g.fill(); g.restore(); };
  const fig = (ctx, who, x, y, s, t, o = {}) => G.VK.fig(ctx, x, y, s, G.EP.cast(who, Object.assign({ t }, o)));
  function conifer(g, x, y, s, col = '#2e5a3a', snow = 0) { shadow(g, x + 8 * s, y + 2, 46 * s, .25); ln(g, [[x, y], [x, y - 40 * s]], 10 * s + 2, '#5a3a22');
    for (let i = 0; i < 4; i++) { const yy = y - 30 * s - i * 46 * s, w = (70 - i * 14) * s; sh(g, mul(col, 1 + i * .06), 3, c => { c.moveTo(x - w, yy); c.lineTo(x, yy - 86 * s); c.lineTo(x + w, yy); c.quadraticCurveTo(x, yy + 10 * s, x - w, yy); c.closePath(); });
      if (snow) { g.fillStyle = 'rgba(250,252,255,.9)'; g.beginPath(); g.moveTo(x - w * .5, yy - 40 * s); g.lineTo(x, yy - 86 * s); g.lineTo(x + w * .5, yy - 40 * s); g.quadraticCurveTo(x, yy - 50 * s, x - w * .5, yy - 40 * s); g.fill(); } } }
  TS.conifer = conifer;
  function snowfall(ctx, t, n = 140, a = .9, wind = 40) { const r = rng(91); ctx.save(); for (let i = 0; i < n; i++) { const sp = 40 + r() * 80, x0 = r() * (W + 200), sz = 1.5 + r() * 3.5, y = ((r() * H + t * sp) % (H + 40)) - 20, x = ((x0 + t * wind * (sz / 3) + Math.sin(t + i) * 10) % (W + 200)) - 100;
    ctx.fillStyle = `rgba(255,255,255,${a * (.5 + sz / 8)})`; ctx.beginPath(); ctx.arc(x, y, sz, 0, TAU); ctx.fill(); } ctx.restore(); }
  TS.snowfall = snowfall;

  // =================== night highway + plough truck ===================
  const HZ = 330, VX = 640;
  const highwayL = () => layer('s-highway', g => {
    g.fillStyle = grad(g, 0, 0, 0, HZ, [[0, '#0e1630'], [.7, '#24304e'], [1, '#3a4664']]); g.fillRect(-PAD, 0, W + PAD * 2, HZ);
    P.hills(g, HZ + 4, [[-PAD, 300], [200, 280], [520, 296], [820, 274], [1100, 292], [W + PAD, 282]], '#3e4a66', '#2e3a56', 2);
    for (const [x, s] of [[60, .5], [150, .62], [250, .44], [980, .5], [1080, .66], [1190, .48], [1260, .58]]) conifer(g, x, HZ + 8, s, '#1e3a34', 1);
    // snowy ground either side, the road in perspective
    g.fillStyle = grad(g, 0, HZ, 0, H, [[0, '#9aa8c4'], [1, '#d8e0ee']]); g.fillRect(-PAD, HZ, W + PAD * 2, H - HZ);
    const RX = y => lerp(30, 640, (y - HZ) / (H - HZ));
    sh(g, '#2e3038', 3, c => { c.moveTo(VX - RX(HZ), HZ); c.lineTo(VX + RX(HZ), HZ); c.lineTo(VX + RX(H), H); c.lineTo(VX - RX(H), H); c.closePath(); });
    g.fillStyle = 'rgba(220,228,240,.35)'; for (const f of [-1, 1]) { g.beginPath(); g.moveTo(VX + f * RX(HZ) * .9, HZ); g.lineTo(VX + f * RX(HZ), HZ); g.lineTo(VX + f * RX(H), H); g.lineTo(VX + f * RX(H) * .86, H); g.closePath(); g.fill(); }   // slush at the edges
    for (let i = 0; i < 9; i++) { const y0 = HZ + Math.pow(i / 9, 1.7) * (H - HZ), y1 = HZ + Math.pow((i + .5) / 9, 1.7) * (H - HZ); g.fillStyle = '#e8c23a'; g.beginPath(); g.moveTo(VX - 2 - (y0 - HZ) * .012, y0); g.lineTo(VX + 2 + (y0 - HZ) * .012, y0); g.lineTo(VX + 2 + (y1 - HZ) * .012, y1); g.lineTo(VX - 2 - (y1 - HZ) * .012, y1); g.fill(); }
    for (const f of [-1, 1]) sh(g, '#eef2f8', 3, c => { c.moveTo(VX + f * RX(HZ) * 1.05, HZ); c.lineTo(VX + f * RX(HZ) * 1.6, HZ); c.lineTo(VX + f * (RX(H) + 260), H); c.lineTo(VX + f * RX(H) * 1.02, H); c.closePath(); });   // ploughed snowbanks
    // lamp posts along the road (standing in the banks)
    for (const k of [.12, .3, .55, .9]) for (const f of [-1, 1]) { const y = HZ + k * (H - HZ), x = VX + f * (RX(y) + 30 + k * 60), h = lerp(60, 380, k); ln(g, [[x, y], [x, y - h]], 3 + k * 6, '#4a4e58'); ln(g, [[x, y - h], [x - f * h * .18, y - h - 6]], 2 + k * 5, '#4a4e58'); }
  });
  function lampGlow(ctx) { const RX = y => lerp(30, 640, (y - HZ) / (H - HZ)); ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const k of [.12, .3, .55, .9]) for (const f of [-1, 1]) { const y = HZ + k * (H - HZ), x = VX + f * (RX(y) + 30 + k * 60), h = lerp(60, 380, k), lx = x - f * h * .18, ly = y - h;
      T.glow(ctx, lx, ly, 30 + k * 120, 'rgba(255,190,110,.35)'); ctx.fillStyle = 'rgba(255,200,130,.12)'; ctx.beginPath(); ctx.moveTo(lx - 6, ly); ctx.lineTo(lx + 6, ly); ctx.lineTo(lx + f * 20 + k * 140, y); ctx.lineTo(lx - f * 20 - k * 140, y); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  function truck(ctx, x, y, s, t, o = {}) { const sp = o.spray ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);   // 3/4 rear view, driving away from us
    shadow(ctx, 0, 6, 240, .4, 26);
    if (sp > 0) { const r = rng(5); for (let i = 0; i < 320; i++) { const a = PI * .5 + (r() - .5) * 2.6, d = ((r() * 340 + t * 420) % 340), px = Math.cos(a) * d * 1.6, py = -50 + Math.sin(a) * d * .3 + d * .06;   // the white fan of salt
        ctx.fillStyle = `rgba(250,250,255,${sp * (1 - d / 340)})`; ctx.fillRect(px - 3, py - 3, 7, 7); } ctx.fillStyle = `rgba(240,244,255,${.25 * sp})`; ctx.beginPath(); ctx.moveTo(-20, -40); ctx.lineTo(-320, 30); ctx.quadraticCurveTo(0, 90, 320, 30); ctx.closePath(); ctx.fill(); }
    for (const sd of [-1, 1]) sh(ctx, '#1a1a1e', 4, c => c.roundRect(sd * 150 - 34, -70, 68, 76, 14));   // rear wheels
    sh(ctx, '#e88a1e', 5, c => c.roundRect(-190, -300, 380, 230, 14)); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 5; i++) ctx.fillRect(-180 + i * 76, -290, 6, 210);   // the dump body with salt heaped on top
    sh(ctx, '#f4f6fa', 4, c => { c.moveTo(-180, -300); c.quadraticCurveTo(0, -370, 180, -300); c.closePath(); });
    sh(ctx, '#5a5e66', 4, c => c.rect(-60, -80, 120, 40)); ctx.fillStyle = '#2a2a2e'; ctx.fillRect(-46, -74, 92, 26);   // spinner box
    for (const sd of [-1, 1]) { sh(ctx, '#c8281e', 3, c => c.rect(sd * 160 - 20, -130, 40, 22)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, sd * 160, -120, 70, 'rgba(255,60,40,.5)'); ctx.restore(); }
    const bl = (Math.sin(t * 8) + 1) / 2; sh(ctx, '#ff9a1e', 3, c => c.roundRect(-30, -334, 60, 22, 8)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 0, -324, 120 + bl * 80, `rgba(255,150,40,${.3 + bl * .4})`); ctx.restore();
    for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#1e1e22' : '#f4d23a'; ctx.fillRect(-190 + i * 95, -98, 95, 14); }
    ctx.restore(); }
  function highway(ctx, t, o = {}) { put(ctx, highwayL(), o.pan || 0, .2); lampGlow(ctx);
    const k = o.drive ?? ((t * .05) % 1); truck(ctx, VX + 60, lerp(640, 470, k), lerp(.95, .45, k), t, o);
    for (const [ph, side] of [[0, -1], [.5, 1]]) { const u = (t * .06 + ph) % 1, y = lerp(HZ + 6, H + 40, u * u), x = VX - 160 * side * (y - HZ) / (H - HZ) - 40 * side;   // oncoming headlights
      if (side > 0) continue; ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const d of [-1, 1]) T.glow(ctx, x + d * 30 * (y - HZ) / 300, y, 20 + (y - HZ) * .15, 'rgba(255,250,220,.6)'); ctx.restore(); }
    snowfall(ctx, t, 160, .85, 30); }

  // =================== the kitchen counter ===================
  const kitchenL = () => layer('s-kitchen', g => {
    g.fillStyle = '#e8dcc6'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    for (let y = 120; y < 470; y += 40) for (let x = -PAD + ((y / 40) % 2) * 30; x < W + PAD; x += 60) sh(g, (x + y) % 120 ? '#f4efe4' : '#eae2d2', 1.5, c => c.rect(x, y, 58, 38));   // splashback tiles
    sh(g, '#7a5a3e', 4, c => c.rect(-PAD, 0, W + PAD * 2, 110)); for (let x = -PAD + 40; x < W + PAD; x += 230) { sh(g, '#8a6a4a', 3, c => c.rect(x, 10, 210, 92)); sh(g, '#c8a060', 2, c => c.roundRect(x + 96, 76, 18, 8, 3)); }   // wall cupboards
    // the window over the sink: night, snow, a lit house across the street
    sh(g, '#f4f1ea', 5, c => c.rect(820, 150, 300, 240)); g.fillStyle = grad(g, 0, 160, 0, 380, [[0, '#18223e'], [1, '#3a4668']]); g.fillRect(834, 164, 272, 212);
    sh(g, '#d8e0ee', 0, c => c.rect(834, 330, 272, 46)); sh(g, '#4a3a3a', 2, c => { c.moveTo(960, 330); c.lineTo(960, 270); c.lineTo(1010, 236); c.lineTo(1060, 270); c.lineTo(1060, 330); c.closePath(); }); sh(g, '#f6c86a', 2, c => c.rect(1000, 284, 26, 26));
    ln(g, [[970, 164], [970, 376]], 6, '#f4f1ea'); ln(g, [[834, 270], [1106, 270]], 6, '#f4f1ea');
    // shelf with jars + a hanging pan, the counter top and the cabinet fronts
    sh(g, '#8a6a4a', 3, c => c.rect(120, 250, 380, 18)); for (const [x, h, col] of [[150, 70, '#e2a24a'], [220, 90, '#c85a3a'], [300, 60, '#6a9a4a'], [370, 80, '#d8c070'], [440, 64, '#7a8ab0']]) { sh(g, 'rgba(230,240,245,.9)', 3, c => c.roundRect(x - 26, 250 - h, 52, h, 8)); sh(g, col, 0, c => c.rect(x - 22, 250 - h * .7, 44, h * .7 - 4)); sh(g, '#5a4a3a', 2.5, c => c.rect(x - 22, 250 - h - 8, 44, 12)); }
    sh(g, '#d8d4cc', 4, c => c.rect(-PAD, 470, W + PAD * 2, 34)); g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(-PAD, 474, W + PAD * 2, 6);
    sh(g, '#6a8aa0', 4, c => c.rect(-PAD, 504, W + PAD * 2, H - 504)); for (let x = -PAD + 20; x < W + PAD; x += 250) { sh(g, '#7a9ab0', 3, c => c.rect(x, 520, 230, 200)); sh(g, '#c8ccd2', 2, c => c.roundRect(x + 90, 540, 50, 10, 4)); }
    // sink + tap under the window
    sh(g, '#b8bec6', 4, c => c.rect(850, 462, 240, 14)); sh(g, '#c8ced6', 4, c => { c.moveTo(960, 462); c.lineTo(960, 400); c.quadraticCurveTo(960, 380, 990, 380); c.lineTo(1010, 380); c.lineTo(1010, 396); c.lineTo(990, 396); c.lineTo(980, 400); c.lineTo(980, 462); c.closePath(); });
  });
  function kitchen(ctx, t, o = {}) { put(ctx, kitchenL(), o.pan || 0, .2);
    ctx.save(); ctx.beginPath(); ctx.rect(834, 164, 272, 166); ctx.clip(); snowfall(ctx, t, 50, .8, 20); ctx.restore();
    // counter props: cutting board + bread, a pepper mill (the shaker's neighbour), a mug, a potted herb
    sh(ctx, '#c89a5a', 4, c => c.roundRect(130, 446, 260, 26, 8)); sh(ctx, '#d8a058', 4, c => { c.moveTo(170, 448); c.quadraticCurveTo(250, 380, 330, 448); c.closePath(); });
    sh(ctx, '#3a2a22', 4, c => c.roundRect(470, 340, 44, 132, 14)); sh(ctx, '#5a4030', 3, c => c.roundRect(478, 320, 28, 26, 8));
    sh(ctx, '#c8463a', 4, c => c.roundRect(1150, 404, 70, 70, 10)); sh(ctx, null, 6, c => c.arc(1226, 438, 18, -PI / 2, PI / 2));
    if (TS.pottedPlant) TS.pottedPlant(ctx, 760, 474, .6, 5, t, '#c8703e');
    if (o.shaker !== false) G.shaker(ctx, o.sx ?? 610, 474, o.ss ?? 1, Object.assign({ t }, o.sh)); }

  // =================== Hallstatt under the Salzberg ===================
  const LAKE = [430, 560];
  const RIDGE = [[640, 420], [760, 280], [900, 150], [1020, 90], [1120, 70], [1200, 110], [1500, 150]];
  const ridge = x => { for (let i = 1; i < RIDGE.length; i++) if (x <= RIDGE[i][0]) return lerp(RIDGE[i - 1][1], RIDGE[i][1], (x - RIDGE[i - 1][0]) / (RIDGE[i][0] - RIDGE[i - 1][0])); return 150; };
  const hallL = v => layer('s-hall-' + v, g => {
    G.ES.skyFor(g, v === 'dusk' ? 'gold' : 'day');
    // steep mountains on both sides, snow on the far peaks, the Salzberg high on the right with the mine mouth
    P.hills(g, LAKE[0], [[-PAD, 160], [80, 60], [200, 120], [320, 200], [460, 300], [560, 420]], '#7a8a9a', '#4e6a5a', 2.5);
    g.fillStyle = 'rgba(250,252,255,.9)'; g.beginPath(); g.moveTo(40, 92); g.lineTo(80, 60); g.lineTo(130, 90); g.quadraticCurveTo(84, 82, 40, 92); g.fill();
    P.hills(g, LAKE[0], [[640, 420], [760, 280], [900, 150], [1020, 90], [1120, 70], [1200, 110], [W + PAD, 150]], '#6e8a6a', '#3e5a42', 2.5);
    g.fillStyle = 'rgba(250,252,255,.9)'; g.beginPath(); g.moveTo(1060, 82); g.lineTo(1120, 70); g.lineTo(1180, 96); g.quadraticCurveTo(1120, 88, 1060, 82); g.fill();
    const T1 = [], r1 = rng(33); r1(); for (let i = 0; i < 90; i++) { const r = r1, x = 620 + r() * 700, top = ridge(x); T1.push([x, top + 50 + r() * (LAKE[0] - top - 50), .3 + r() * .2, r() < .5 ? '#1e4a2c' : '#2e6a3a']); }
    T1.sort((a, b) => a[1] - b[1]).forEach(([x, y, sc, col]) => conifer(g, x, y, sc, col));
    const T2 = [], r2 = rng(77); r2(); for (let i = 0; i < 60; i++) { const r = r2, x = -PAD + r() * (560 + PAD), top = lerp(160, 420, clamp((x + PAD) / (560 + PAD))); T2.push([x, top + 40 + r() * Math.max(10, LAKE[0] - top - 40), .28 + r() * .18, r() < .5 ? '#1e4a2c' : '#2e6a3a']); }
    T2.sort((a, b) => a[1] - b[1]).forEach(([x, y, sc, col]) => conifer(g, x, y, sc, col));
    // the salt-mine mouth: a timbered portal and spoil heap on a ledge of the Salzberg, with its path zigzagging down
    sh(g, '#8a7a5a', 3, c => { c.moveTo(940, 196); c.lineTo(1060, 196); c.lineTo(1040, 214); c.lineTo(960, 214); c.closePath(); }); sh(g, '#1a1410', 3, c => { c.moveTo(980, 196); c.lineTo(980, 160); c.quadraticCurveTo(1000, 146, 1020, 160); c.lineTo(1020, 196); c.closePath(); });
    for (const x of [976, 1022]) ln(g, [[x, 196], [x, 156]], 5, '#6a4a2a'); ln(g, [[972, 156], [1028, 156]], 6, '#6a4a2a');
    g.strokeStyle = 'rgba(200,180,140,.8)'; g.lineWidth = 3; g.beginPath(); g.moveTo(1000, 214); g.lineTo(900, 260); g.lineTo(1000, 300); g.lineTo(880, 350); g.lineTo(960, 400); g.lineTo(860, 432); g.stroke();
    // the lake with reflections
    g.fillStyle = grad(g, 0, LAKE[0], 0, LAKE[1], [[0, '#4e8aa6'], [1, '#2e6a86']]); g.fillRect(-PAD, LAKE[0], W + PAD * 2, LAKE[1] - LAKE[0]);
    g.fillStyle = 'rgba(30,60,50,.35)'; g.fillRect(-PAD, LAKE[0], 820, 40); g.fillRect(620, LAKE[0], W, 50);
    const r = rng(8); for (let i = 0; i < 60; i++) { g.strokeStyle = `rgba(255,255,255,${.2 + r() * .3})`; g.lineWidth = 2; const x = -PAD + r() * (W + PAD * 2), y = LAKE[0] + 10 + r() * (LAKE[1] - LAKE[0] - 14); g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20 + r() * 30, y); g.stroke(); }
    // the village on its shore shelf (right): stone embankment, houses with steep roofs, the church spire
    sh(g, '#9a9282', 3, c => { c.moveTo(560, LAKE[0] + 6); c.lineTo(W + PAD, LAKE[0] - 4); c.lineTo(W + PAD, LAKE[0] + 30); c.lineTo(560, LAKE[0] + 30); c.closePath(); });
    const houses = [[600, 70, '#f2e2c4', '#7a3a2a'], [670, 90, '#e8d2b0', '#5a3a2a'], [750, 80, '#f4ead6', '#8a4a2a'], [830, 100, '#e2c8a0', '#6a3a2a'], [1000, 86, '#f0e0c4', '#7a3a2a'], [1080, 96, '#e8d6b8', '#5a3a2a'], [1160, 80, '#f4e6cc', '#8a4a2a'], [1230, 92, '#e6cfaa', '#6a3a2a']];
    for (const [x, h, wall, roof] of houses) { const by = LAKE[0] + 6; sh(g, wall, 3, c => c.rect(x - 34, by - h, 68, h)); sh(g, roof, 3, c => { c.moveTo(x - 44, by - h + 4); c.lineTo(x, by - h - 46); c.lineTo(x + 44, by - h + 4); c.closePath(); });
      for (let j = 0; j < Math.floor(h / 30); j++) for (const sd of [-1, 1]) sh(g, '#3a4a5a', 2, c => c.rect(x + sd * 16 - 7, by - h + 14 + j * 28, 14, 16)); sh(g, mul(wall, .7), 2, c => c.rect(x - 8, by - 26, 16, 26)); }
    { const x = 920, by = LAKE[0] + 6; sh(g, '#f4ead6', 3, c => c.rect(x - 40, by - 140, 80, 140)); sh(g, '#f4ead6', 3, c => c.rect(x - 22, by - 220, 44, 90)); sh(g, '#3a4a5a', 3, c => { c.moveTo(x - 28, by - 220); c.lineTo(x, by - 300); c.lineTo(x + 28, by - 220); c.closePath(); }); sh(g, '#e8dcc0', 2, circ(x, by - 190, 10)); sh(g, '#7a3a2a', 3, c => { c.moveTo(x - 50, by - 136); c.lineTo(x, by - 176); c.lineTo(x + 50, by - 136); c.closePath(); }); }
    // the near lakeside path + meadow where people walk
    sh(g, '#7aa25a', 3, c => { c.moveTo(-PAD, LAKE[1] - 4); c.quadraticCurveTo(640, LAKE[1] - 14, W + PAD, LAKE[1] - 2); c.lineTo(W + PAD, H); c.lineTo(-PAD, H); c.closePath(); }); P2.meadow(g, LAKE[1], H, { seed: 23 });
    sh(g, '#c8b48a', 2.5, c => { c.moveTo(-PAD, 610); c.quadraticCurveTo(640, 596, W + PAD, 612); c.lineTo(W + PAD, 646); c.quadraticCurveTo(640, 630, -PAD, 644); c.closePath(); });
    for (const x of [-40, 300, 980]) { ln(g, [[x, LAKE[1] + 2], [x + 160, LAKE[1] + 2]], 4, '#6a4a2a'); for (let k = 0; k <= 4; k++) ln(g, [[x + k * 40, LAKE[1] + 4], [x + k * 40, LAKE[1] - 22]], 4, '#6a4a2a'); }
  });
  function hallstatt(ctx, t, o = {}) { const v = o.v || 'day'; put(ctx, hallL(v), o.pan || 0, .25); P.clouds(ctx, t, 0, [[100, 30, .7, 3, 4], [700, 50, .6, 5, 3]]);
    for (const [ph, y, s] of [[0, 470, .3], [600, 520, .4]]) TS.boat && TS.boat(ctx, ((t * 8 + ph) % (W + 300)) - 150, y, s, t, 'dugout', ph);
    for (const [x, y] of [[300, 500], [360, 512]]) FA.duck(ctx, x + Math.sin(t * .3 + x) * 30, y, .5, t, { dir: 1, ph: x, col: '#fbfbf8' });
    P.birds(ctx, t, [[200, 140, 26, 0], [800, 120, 30, 2]]);
    const L = []; for (const [sp, ph, who] of [[.04, 0, 'miner'], [.03, .5, 'miner2']]) { const u = (t * sp + ph) % 1, x = lerp(-60, W + 60, u); L.push([624, () => fig(ctx, who, x, 624, .2, t, { walk: t * 7, turn: .8 })]); }
    L.push([660, () => FA.sheep(ctx, 200, 660, .5, t, { dir: 1 })]); L.push([690, () => FA.sheep(ctx, 1080, 690, .55, t + 2, { dir: -1 })]);
    L.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f());
    for (const [x, y] of [[80, 700], [560, 700], [900, 706], [1200, 700]]) EF.flowers(ctx, x, y, 110, 7, x, t); }

  Object.assign(TS, { highway, kitchen, hallstatt, truck });
})(window);
