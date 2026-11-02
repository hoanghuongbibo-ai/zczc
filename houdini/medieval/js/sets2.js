/* Medieval v2 — SETS rebuilt in depth (overrides G.MD from sets.js; same names + options, same ground lines, so every
 * existing shot keeps working). Each set = far plane (sky, clouds, misty hills, tree lines in haze) → mid plane
 * (buildings, hedges, fences, gardens, animals) → near ground (perspective scatter: soil / grass / mud / floor) →
 * a registered foreground occluder (blurred weeds, wheat, reeds, herbs, candles…) that DR.shot draws in front of the
 * actors. Detail is dense at the edges and calm where people stand (ground "keep" zones), so frames read rich but tidy. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, FA = G.Fauna, PR = G.Props, F = G.FARM, DK = G.DK, MD = G.MD, { W, H, clamp, lerp, grad, rng } = T;
  const { sh, ln, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI, INK = '#2a1c12', mul = (h, k) => G.Guide.hexMul(h, k);
  const crowd = () => G.DR && G.DR.crowdOn;
  const sky = (g, stops, y1 = H) => { g.fillStyle = grad(g, 0, 0, 0, y1, stops); g.fillRect(-PAD, 0, W + PAD * 2, y1); };
  const sun = (g, x, y, r, col = '255,244,210') => { const gr = g.createRadialGradient(x, y, 4, x, y, r); gr.addColorStop(0, `rgba(${col},1)`); gr.addColorStop(.12, `rgba(${col},.85)`); gr.addColorStop(.4, `rgba(${col},.25)`); gr.addColorStop(1, `rgba(${col},0)`); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); };
  const smoke = (g, t, x, y, s = 1, a = .4) => { for (let i = 0; i < 7; i++) { const k = (t * .22 + i / 7) % 1; g.fillStyle = `rgba(222,220,224,${a * (1 - k)})`; g.beginPath(); g.arc(x + Math.sin(t * .8 + i) * 12 * s + k * 60 * s, y - k * 170 * s, (8 + k * 30) * s, 0, TAU); g.fill(); } };
  const CL_DAY = [[-120, 40, .8, 3, 4], [380, 70, .6, 5, 3], [820, 24, .9, 7, 5], [1250, 60, .7, 9, 4]];
  const clouds = (g, t, tone = 'day', list = CL_DAY, a = 1) => { g.save(); g.globalAlpha = a; P2.clouds2(g, t, 0, list, tone); g.restore(); };

  // ---------------- buildings ----------------
  // a cruck-framed cottage: stone footing, wattle-and-daub panels in a timber frame, deep thatch with combed texture, shutters
  const cottage = (g, x, y, s, o = {}) => { const r = rng(o.seed || 3); g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = 'rgba(30,20,10,.25)'; g.beginPath(); g.ellipse(14, 4, 170, 18, 0, 0, TAU); g.fill();
    sh(g, '#9a958a', 3, c => c.rect(-130, -20, 260, 22)); for (let i = 0; i < 9; i++) sh(g, mul('#9a958a', .85 + r() * .3), 1.5, c => c.ellipse(-118 + i * 30, -10, 14, 8, 0, 0, TAU));
    sh(g, o.wall || '#e8dcbc', 3.5, c => c.rect(-124, -132, 248, 114)); g.fillStyle = 'rgba(160,120,70,.18)'; for (let i = 0; i < 10; i++) { g.beginPath(); g.ellipse(-110 + r() * 220, -120 + r() * 96, 8 + r() * 18, 4 + r() * 8, 0, 0, TAU); g.fill(); }
    const tim = o.timber || '#5a3a22'; for (const dx of [-124, -44, 44, 124]) sh(g, tim, 2, c => c.rect(dx - 6, -132, 12, 114)); sh(g, tim, 2, c => c.rect(-124, -76, 248, 10)); ln(g, [[-118, -76], [-50, -126]], 8, tim); ln(g, [[118, -76], [50, -126]], 8, tim);
    sh(g, '#5a3a22', 3, c => { c.moveTo(-26, -18); c.lineTo(-26, -88); c.quadraticCurveTo(0, -104, 26, -88); c.lineTo(26, -18); c.closePath(); }); g.strokeStyle = 'rgba(30,18,8,.5)'; g.lineWidth = 2; for (const d of [-12, 0, 12]) { g.beginPath(); g.moveTo(d, -92); g.lineTo(d, -18); g.stroke(); } sh(g, '#2a1c12', 0, c => c.arc(14, -52, 3, 0, TAU));
    if (o.open) sh(g, '#1a120c', 0, c => { c.moveTo(-22, -18); c.lineTo(-22, -86); c.quadraticCurveTo(0, -100, 22, -86); c.lineTo(22, -18); c.closePath(); });
    for (const wx of [-86, 86]) { sh(g, '#2a2018', 2.5, c => c.rect(wx - 16, -64, 32, 28)); sh(g, '#7a5a3a', 2, c => c.rect(wx - 34, -64, 16, 28)); g.fillStyle = o.lit ? 'rgba(255,190,90,.85)' : 'rgba(60,40,24,.9)'; g.fillRect(wx - 13, -61, 26, 22); }
    // thatch
    sh(g, o.roof || '#c8a050', 4, c => { c.moveTo(-160, -118); c.quadraticCurveTo(-150, -150, -70, -250); c.quadraticCurveTo(0, -278, 70, -250); c.quadraticCurveTo(150, -150, 160, -118); c.quadraticCurveTo(0, -100, -160, -118); });
    g.save(); g.beginPath(); g.moveTo(-160, -118); g.quadraticCurveTo(-150, -150, -70, -250); g.quadraticCurveTo(0, -278, 70, -250); g.quadraticCurveTo(150, -150, 160, -118); g.quadraticCurveTo(0, -100, -160, -118); g.clip();
    g.strokeStyle = 'rgba(120,80,30,.45)'; g.lineWidth = 2; for (let i = -40; i <= 40; i++) { g.beginPath(); g.moveTo(i * 4.2, -104 - Math.abs(i) * .2); g.lineTo(i * 2.2, -270); g.stroke(); } g.fillStyle = 'rgba(255,240,190,.22)'; g.beginPath(); g.ellipse(-60, -210, 70, 30, -.4, 0, TAU); g.fill();
    g.fillStyle = 'rgba(80,100,40,.35)'; for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse(-120 + r() * 240, -130 - r() * 30, 18, 6, 0, 0, TAU); g.fill(); } g.restore();
    sh(g, mul(o.roof || '#c8a050', .8), 3, c => { c.moveTo(-80, -252); c.quadraticCurveTo(0, -282, 80, -252); c.lineTo(76, -240); c.quadraticCurveTo(0, -268, -76, -240); c.closePath(); }); for (let i = 0; i < 9; i++) ln(g, [[-72 + i * 18, -248 - Math.sin(i / 8 * PI) * 12], [-66 + i * 18, -238 - Math.sin(i / 8 * PI) * 10]], 3, '#6a4a2a');
    g.restore(); };
  const church = (g, x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); DK.ashlar(g, -70, -300, 140, 300, { col: '#c8bca0', bh: 30, bw: 46, seed: 2 }); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(-70, -300, 140, 300);
    for (let i = 0; i < 7; i++) sh(g, '#c8bca0', 3, c => c.rect(-70 + i * 21, -318, 14, 20)); DK.ashlar(g, 70, -170, 260, 170, { col: '#bcb094', bh: 30, bw: 50, seed: 4 }); g.strokeRect(70, -170, 260, 170); sh(g, '#8a7a6a', 4, c => { c.moveTo(60, -168); c.lineTo(200, -250); c.lineTo(340, -168); c.closePath(); });
    for (const [xx, yy] of [[0, -230], [0, -150], [140, -110], [260, -110]]) sh(g, '#2a2a34', 3, c => { c.rect(xx - 12, yy, 24, 40); c.moveTo(xx - 12, yy); c.arc(xx, yy, 12, PI, TAU); }); sh(g, '#5a3a22', 3, c => { c.moveTo(-24, 0); c.lineTo(-24, -60); c.arc(0, -60, 24, PI, TAU); c.lineTo(24, 0); c.closePath(); }); g.restore(); };
  const abbey = (g, x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); DK.ashlar(g, -340, -400, 680, 400, { col: '#d8c49a', bh: 34, bw: 60, seed: 5, moss: true }); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(-340, -400, 680, 400);
    for (const dx of [-220, 0, 220]) { sh(g, '#c8b488', 4, c => { c.moveTo(dx - 92, 0); c.lineTo(dx - 92, -270); c.quadraticCurveTo(dx, -400, dx + 92, -270); c.lineTo(dx + 92, 0); c.closePath(); }); sh(g, '#4a4038', 3, c => { c.moveTo(dx - 46, 0); c.lineTo(dx - 46, -200); c.quadraticCurveTo(dx, -270, dx + 46, -200); c.lineTo(dx + 46, 0); c.closePath(); }); for (let k = 0; k < 4; k++) sh(g, '#b8a478', 2, c => { c.moveTo(dx - 80 + k * 8, 0); c.lineTo(dx - 80 + k * 8, -260 + k * 6); }); }
    for (const dx of [-160, 160]) { g.fillStyle = 'rgba(60,50,40,.35)'; for (let i = 0; i < 5; i++) { g.beginPath(); g.rect(dx - 60 + i * 26, -350, 14, 40); g.arc(dx - 53 + i * 26, -350, 7, PI, TAU); g.fill(); } }
    sh(g, '#c8b488', 3, c => c.arc(0, -350, 36, 0, TAU)); g.strokeStyle = '#8a7a5a'; g.lineWidth = 3; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(0, -350); g.lineTo(Math.cos(i * PI / 4) * 32, -350 + Math.sin(i * PI / 4) * 32); g.stroke(); }
    for (const dx of [-340, -110, 110, 340]) { DK.ashlar(g, dx - 20, -500, 40, 500, { col: '#d8c49a', bh: 30, bw: 40, seed: dx }); g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(dx - 20, -500, 40, 500); sh(g, '#a89870', 3, c => { c.moveTo(dx - 24, -498); c.lineTo(dx, -600); c.lineTo(dx + 24, -498); c.closePath(); }); } g.restore(); };
  // far village silhouette on the horizon (roofs + smoke + a church tower)
  const farVillage = (g, x, y, s, col = '#8a9a8a') => { const r = rng(9); g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; for (let i = 0; i < 8; i++) { const xx = -200 + i * 55 + r() * 20, hh = 26 + r() * 14; g.beginPath(); g.moveTo(xx - 26, 0); g.lineTo(xx - 26, -hh * .6); g.lineTo(xx, -hh); g.lineTo(xx + 26, -hh * .6); g.lineTo(xx + 26, 0); g.fill(); } g.fillRect(60, -90, 26, 90); g.beginPath(); g.moveTo(56, -90); g.lineTo(73, -124); g.lineTo(90, -90); g.fill(); g.restore(); };

  // ======================= VILLAGE (Alwalton on the Nene) =======================
  const VSKY = { day: [[0, '#7ab0dc'], [.5, '#bcd8ec'], [1, '#eef2e4']], dawn: [[0, '#8a9ac8'], [.35, '#f2a878'], [.6, '#f8d0a0'], [1, '#fbe8c8']], dusk: [[0, '#3a3058'], [.45, '#a8607a'], [.7, '#e8946a'], [1, '#f2c08a']], empty: [[0, '#4a4058'], [.5, '#8a6a7a'], [1, '#c8a090']], rain: [[0, '#4a5260'], [.5, '#7a8290'], [1, '#a8aeb0']] };
  const villL = v => layer('md2-vill-' + v, g => { const dark = v === 'dusk' || v === 'empty', rain = v === 'rain', HZ = rain ? '150,158,166' : v === 'dawn' ? '250,214,180' : dark ? '200,140,140' : '226,234,236';
    sky(g, VSKY[v], 480); if (v === 'day') sun(g, 1010, 90, 260); if (v === 'dawn') sun(g, 300, 380, 420, '255,220,160'); if (dark) sun(g, 1100, 400, 380, '255,170,110');
    P2.mistyHills ? P2.mistyHills(g, 400, [[-PAD, 360], [260, 320], [620, 350], [960, 300], [W + PAD, 340]], rain ? '#7a848a' : dark ? '#8a6a7a' : '#a8bcb0', rain ? '#6a7478' : dark ? '#6a5266' : '#8aa494') : null;
    DK.treeLine(g, 404, { col: rain ? '#5a6a5a' : dark ? '#5a4a5a' : '#6a8a6a', h: 26, seed: 4 }); farVillage(g, 260, 404, .5, rain ? '#7a848a' : dark ? '#6a5266' : '#93a598');
    DK.haze(g, 300, 430, HZ, .55); abbey(g, 1080, 430, .17); church(g, 420, 452, .5); DK.haze(g, 380, 460, HZ, .25);
    // the river Nene with reeds, then the meadow
    DK.ground(g, { y0: 440, kind: 'grass', seed: 21, n: 0, top: rain ? '#7a8a60' : dark ? '#7a8a5a' : '#9ab866', bot: rain ? '#4a5a34' : '#4f7a35' });
    g.fillStyle = grad(g, 0, 462, 0, 504, [[0, rain ? '#8a98a8' : dark ? '#c89a9a' : '#a8cce4'], [1, rain ? '#6a7a88' : dark ? '#7a6a8a' : '#6aa0c8']]); g.beginPath(); g.moveTo(-PAD, 470); g.quadraticCurveTo(400, 456, 800, 480); g.quadraticCurveTo(1100, 496, W + PAD, 470); g.lineTo(W + PAD, 500); g.quadraticCurveTo(1100, 526, 800, 510); g.quadraticCurveTo(400, 484, -PAD, 500); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 2; for (let i = 0; i < 18; i++) { const x = -PAD + i * 100, y = 478 + Math.sin(i) * 8; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 30, y + 1); g.stroke(); }
    const rr = rng(11); for (let i = 0; i < 60; i++) { const x = -PAD + rr() * (W + PAD * 2), y = 468 + rr() * 6 + (x > 800 ? 10 : 0); ln(g, [[x, y + 30], [x + (rr() - .5) * 6, y - 4 - rr() * 18]], 2, '#5a7a3a'); if (rr() < .2) sh(g, '#6a4a2a', 0, c => c.ellipse(x, y - 14, 2.6, 7, 0, 0, TAU)); }
    // near ground: a rutted cart track winding to the camera; scatter, calm where people stand
    g.fillStyle = rain ? 'rgba(110,84,56,.9)' : 'rgba(176,142,96,.85)'; g.beginPath(); g.moveTo(600, 506); g.quadraticCurveTo(660, 560, 560, 620); g.quadraticCurveTo(470, 690, 520, H + 10); g.lineTo(820, H + 10); g.quadraticCurveTo(720, 690, 760, 620); g.quadraticCurveTo(820, 560, 640, 506); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(80,56,32,.45)'; g.lineWidth = 3; for (const d of [-30, 30]) { g.beginPath(); g.moveTo(620 + d * .2, 510); g.quadraticCurveTo(700 + d * .6, 560, 600 + d, 620); g.quadraticCurveTo(520 + d * 1.6, 690, 640 + d * 2.6, H + 10); g.stroke(); }
    DK.ground(g, { y0: 506, kind: 'grass', seed: 22, n: 150, keep: [[320, 980, 600, 760]], scatterOnly: true, sky: rain ? '#9aa4ae' : '#bcd8ec' });
    if (rain) for (let i = 0; i < 8; i++) DK.puddle(g, 520 + (i % 4) * 70 + (i > 3 ? 40 : 0), 560 + i * 18, 26 + (i % 3) * 14, 1, '#9aa4ae');
  }, 0);
  MD.village = (g, t, o = {}) => { const v = o.v || 'day', empty = v === 'empty', dark = v === 'dusk' || empty; put(g, villL(v), 0, 0);
    if (v === 'day' || v === 'dawn') clouds(g, t, v === 'dawn' ? 'warm' : 'day', CL_DAY, .9); else clouds(g, t, v === 'rain' ? 'grey' : 'dusk', CL_DAY, .8);
    // mid plane: cottages with fences, gardens, woodpile, washing, well
    DK.wattle(g, 60, 420, 600, 50); DK.garden(g, 90, 576, 300, 2, 'cabbage', .9); cottage(g, 250, 560, .72, { seed: 1, lit: dark && !empty, open: empty });
    cottage(g, 560, 528, .42, { seed: 2, roof: '#b8964a', lit: dark && !empty }); cottage(g, 960, 574, .8, { seed: 3, wall: '#e0d0ac', roof: '#c09448', lit: dark && !empty, open: empty });
    PR.woodpile(g, 1110, 586, .55); PR.well(g, 760, 552, .45); if (!empty) { smoke(g, t, 230, 380, .7); smoke(g, t + 2, 940, 360, .8); smoke(g, t + 4, 560, 420, .5); }
    if (!empty && v !== 'rain') PR.washline(g, 360, 520, 470, 524, t); DK.skep(g, 440, 590, .55); DK.bees(g, t, 440, 560, 4, 30); DK.wheel(g, 1180, 600, .6, .3); DK.ladder(g, 1060, 590, .55, -.25);
    DK.edgeTree(g, t, 'L', { seed: 4 }); P.tree(g, 1210 + PAD, 600, t, 9, .6);
    if (!crowd() && !empty) { DK.sparrows(g, t, [[150, 652, 1, 0], [190, 660, .9, 1.4]]); FA.sheep(g, 1100, 690, .5, t, { dir: -1 }); FA.sheep(g, 1180, 702, .45, t, { dir: -1, ph: 2 }); F.rooster(g, 380, 690, .45, t, { dir: 1 }); FA.chicken(g, 440, 700, .4, t, { dir: -1 }); F.pig(g, 1030, 640, .4, t, { dir: -1 }); DK.crow(g, 420, 556, .45, t, { peck: true }); }
    if (!crowd() && empty) { DK.fox(g, 820 + Math.sin(t * .3) * 60, 690, .55, t, { dir: Math.cos(t * .3) > 0 ? 1 : -1, walk: .6, sniff: true }); DK.crow(g, 960, 590, .5, t, { dir: -1 }); DK.crow(g, 400, 600, .45, t + 1, { peck: true }); }
    FA.duck(g, 200 + (t * 15) % 600, 488, .3, t, { dir: 1 }); FA.duck(g, 250 + (t * 15) % 600, 492, .26, t + 1, { dir: 1 }); DK.flock(g, t, 700, 140, dark ? 4 : 5, .45);
    if (v === 'rain') { g.strokeStyle = 'rgba(220,230,255,.5)'; g.lineWidth = 2; const r = rng(4); for (let i = 0; i < 180; i++) { const x = (r() * (W + 200) + t * 80) % (W + 200) - 100, y = (r() * H + t * 900) % H; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 6, y + 26); g.stroke(); } }
    if (dark) { g.save(); g.globalCompositeOperation = 'lighter'; for (const [x, y] of [[250 - 62, 525], [250 + 62, 525], [960 + 69, 523], [960 - 69, 523]]) T.glow(g, x, y, 60, 'rgba(255,170,80,.35)'); g.restore(); }
    DK.fg('weeds', { side: 'LR', sc: .75, col: dark ? '#2a3424' : '#2f5a26', blur: 3.4 }); };
  MD.church = (g, t) => { MD.village(g, t, { v: 'dawn' }); g.save(); g.translate(640, 0); g.restore(); };

  // ======================= HOUSE: inside the longhouse =======================
  const houseL = () => layer('md2-house', g => { g.fillStyle = '#3a2a1c'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    DK.timberWall(g, -PAD, 60, W + PAD * 2, 500, { col: '#cbb894', wood: '#4a3020', bay: 220, seed: 6 }); g.fillStyle = 'rgba(30,20,12,.35)'; g.fillRect(-PAD, 60, W + PAD * 2, 500);
    // roof: crucks + rafters + soot
    for (const x of [100, 640, 1180]) { sh(g, '#3a2a1a', 4, c => { c.moveTo(x - 200, 560); c.quadraticCurveTo(x - 190, 120, x - 10, -10); c.lineTo(x + 20, -10); c.quadraticCurveTo(x - 150, 130, x - 170, 560); c.closePath(); }); sh(g, '#3a2a1a', 4, c => { c.moveTo(x + 200, 560); c.quadraticCurveTo(x + 190, 120, x + 10, -10); c.lineTo(x - 20, -10); c.quadraticCurveTo(x + 150, 130, x + 170, 560); c.closePath(); }); }
    sh(g, '#2a1e14', 4, c => c.rect(-PAD, 50, W + PAD * 2, 22)); g.fillStyle = grad(g, 0, 0, 0, 160, [[0, 'rgba(10,8,6,.85)'], [1, 'rgba(10,8,6,0)']]); g.fillRect(-PAD, 0, W + PAD * 2, 160);
    // floor: beaten earth + rushes
    DK.ground(g, { y0: 560, kind: 'floor', seed: 8, n: 60 });
    // left: bed + chest; wall: shelf of crocks, tools hung on pegs, cloaks + hats
    sh(g, '#d8b860', 4, c => c.roundRect(30, 548, 280, 66, 20)); for (let i = 0; i < 12; i++) ln(g, [[44 + i * 22, 556], [52 + i * 22, 606]], 2, '#a8883a'); sh(g, '#7a5a8a', 4, c => c.roundRect(60, 538, 200, 34, 14)); sh(g, '#a85a4a', 3, c => c.roundRect(150, 552, 150, 50, 14)); PR.chest(g, 380, 596, .6);
    DK.shelf(g, 320, 282, 230, 1); DK.shelf(g, 320, 182, 230, .9, ['bowl', 'loaf', 'jug', 'crock']); DK.scythe(g, 140, 520, .9, .05); DK.flail(g, 100, 520, .9, -.05); DK.pitchfork(g, 64, 520, .8, .02);
    DK.cloakPeg(g, 600, 230, .9, '#5a6a3a'); DK.cloakPeg(g, 680, 236, .85, '#7a3a2a', false); ln(g, [[560, 228], [720, 228]], 6, '#4a3020');
    // the quern, a basket of eggs, sacks of grain, a barrel
    PR.quern(g, 470, 640, .9); PR.basket(g, 560, 650, .7, 'eggs'); PR.sack(g, 880, 620, .7); PR.sack(g, 930, 630, .6, '#c8b088'); PR.barrel(g, 820, 610, .6); PR.loom(g, 1240, 560, .8);
    // byre at the right end: wattle partition + manger + hay
    DK.wattle(g, 960, 1300, 560, 120, '#7a5a38'); g.fillStyle = 'rgba(30,20,12,.4)'; g.fillRect(960, 300, 400, 140); sh(g, '#d8b860', 2, c => c.ellipse(1150, 556, 140, 18, 0, 0, TAU)); for (let i = 0; i < 30; i++) ln(g, [[1020 + i * 9, 556], [1026 + i * 9, 540 - (i % 4) * 4]], 2, '#c8a040');
    // door with daylight + a shaft of light across the room
    sh(g, '#2a1c12', 4, c => c.rect(1080, 300, 130, 260)); g.fillStyle = grad(g, 0, 300, 0, 560, [[0, '#f8e8c0'], [1, '#d8c890']]); g.fillRect(1090, 310, 110, 250); });
  MD.house = (g, t, o = {}) => { const night = !!o.night; put(g, houseL(), 0, 0); if (!night) DK.lightShaft(g, 1090, 320, 110, 700, H, 300, .14);
    DK.herbs(g, 760, 72, 1, 3, t); DK.herbs(g, 220, 72, .9, 5, t);
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; sh(g, '#7a7068', 3, c => c.ellipse(640 + Math.cos(a) * 90, 640 + Math.sin(a) * 22, 22, 12, 0, 0, TAU)); }
    P2.fire(g, 640, 630, .5, t); ln(g, [[560, 640], [600, 500]], 6, '#2a2a2a'); ln(g, [[720, 640], [680, 500]], 6, '#2a2a2a'); ln(g, [[590, 510], [690, 510]], 5, '#2a2a2a'); ln(g, [[640, 510], [640, 560]], 3, '#2a2a2a'); sh(g, '#3a3a3a', 4, c => { c.moveTo(600, 560); c.quadraticCurveTo(640, 610, 680, 560); c.closePath(); });
    for (let i = 0; i < 9; i++) { const k = (t * .16 + i / 9) % 1; g.fillStyle = `rgba(190,185,180,${.32 * (1 - k)})`; g.beginPath(); g.arc(640 + Math.sin(t + i) * 30 + k * 40, 520 - k * 460, 20 + k * 70, 0, TAU); g.fill(); }
    g.fillStyle = 'rgba(160,150,140,.16)'; g.fillRect(-PAD, 0, W + PAD * 2, 200);
    if (!crowd()) { F.cow(g, 1120, 590, .55, t, { dir: -1 }); F.pig(g, 1240, 596, .45, t, { dir: -1 }); FA.chicken(g, 1010, 588, .35, t, { dir: 1 }); FA.cat(g, 240, 560, .5, t, { dir: 1, coat: '#8a7a6a' }); DK.mouse(g, 900, 664, .8, t); }
    DK.dust(g, t, 700, 320, 1200, 720, 22); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 600, night ? 520 : 380, `rgba(255,170,90,${night ? .45 : .25})`); g.restore();
    if (night) { g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(40,40,90,.55)'; g.fillRect(-300, -300, 1900, 1400); g.restore(); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 600, 340, 'rgba(255,150,70,.4)'); g.restore(); }
    DK.fg('herbs', { corner: 'L', n: 1, blur: 4, a: .9 }); };

  // ======================= HOUSE EXTERIOR (toft + croft) =======================
  const hxL = () => layer('md2-hx', g => { sky(g, VSKY.dawn, 480); sun(g, 1100, 300, 380, '255,220,170'); P2.mistyHills ? P2.mistyHills(g, 420, [[-PAD, 380], [400, 340], [800, 370], [W + PAD, 350]], '#c8a8a0', '#a89088') : null;
    DK.treeLine(g, 430, { col: '#7a7a6a', h: 30, seed: 8 }); DK.haze(g, 330, 450, '250,214,180', .5); DK.farFields(g, 430, 500, 3, ['#b8b070', '#a8a868', '#c8b878', '#98a060']); DK.haze(g, 420, 500, '250,214,180', .3); DK.hedge(g, -PAD, W + PAD, 500, 36, 5, '#5a7a3a');
    DK.ground(g, { y0: 500, kind: 'grass', seed: 31, n: 130, keep: [[300, 1000, 640, 760]] }); g.fillStyle = 'rgba(150,118,80,.85)'; g.beginPath(); g.moveTo(560, 690); g.quadraticCurveTo(600, 640, 640, 690); g.lineTo(820, H + 10); g.lineTo(380, H + 10); g.closePath(); g.fill(); });
  MD.houseExt = (g, t, o = {}) => { put(g, hxL(), 0, 0); clouds(g, t, 'warm', CL_DAY.slice(1, 3), .8);
    DK.garden(g, 860, 640, 380, 3, 'leek'); DK.garden(g, 860, 590, 380, 2, 'cabbage'); cottage(g, 640, 690, 1.6, { seed: 5 }); smoke(g, t, 700, 330, 1.2);
    DK.wattle(g, 40, 420, 700, 90); DK.gate(g, 420, 700, .9); DK.skep(g, 1150, 600, .8); DK.skep(g, 1220, 610, .7); DK.bees(g, t, 1180, 560, 7, 50); PR.woodpile(g, 1060, 700, .8); DK.wheel(g, 980, 690, .8, .2);
    F.rooster(g, 240, 612, .7, t, { dir: 1, crow: o.crow }); if (!crowd()) { FA.chicken(g, 300, 708, .4, t, { dir: -1 }); FA.duck(g, 860, 712, .35, t, { dir: 1 }); DK.sparrows(g, t, [[1000, 712, 1, 0], [1040, 716, 1.1, 2]]); }
    DK.fg('weeds', { side: 'L', sc: .8 }); };

  // ======================= ABBEY (Peterborough) =======================
  const abL = () => layer('md2-abbey', g => { sky(g, [[0, '#6aa0d4'], [.6, '#c8dcec'], [1, '#f2ead6']], 560); sun(g, 1120, 80, 300); DK.treeLine(g, 560, { col: '#7a9a7a', h: 34, seed: 2 }); DK.haze(g, 480, 580, '226,234,236', .5);
    abbey(g, 640, 580, .95); DK.ground(g, { y0: 576, kind: 'grass', seed: 41, n: 90, keep: [[200, 1100, 640, 760]] }); g.fillStyle = 'rgba(200,184,150,.9)'; g.beginPath(); g.moveTo(480, H + 10); g.lineTo(600, 578); g.lineTo(680, 578); g.lineTo(800, H + 10); g.closePath(); g.fill();
    DK.ground(g, { y0: 580, kind: 'path', seed: 42, n: 40, keep: [[0, 1280, 600, 760]], scatterOnly: true }); });
  MD.abbey = (g, t) => { put(g, abL(), 0, 0); clouds(g, t, 'day', CL_DAY, .9); P.tree(g, 80 + PAD, 640, t, 11, .8); P.tree(g, 1200 + PAD, 640, t, 12, .8); DK.flock(g, t, 640, 90, 6, .45);
    if (!crowd()) { for (let i = 0; i < 3; i++) G.P(g, 'monk', 300 + i * 70 + (t * 20) % 200, 680, .26, t + i, { walk: t * 6, turn: .8 }); DK.crow(g, 960, 640, .5, t, { peck: true }); FA.dog(g, 1060, 700, .45, t, { dir: -1, coat: '#c8bca8' }); }
    DK.fg('weeds', { side: 'LR', sc: .7 }); };

  // ======================= ABBOT'S HALL =======================
  const ahL = () => layer('md2-ah', g => { DK.ashlar(g, -PAD, 0, W + PAD * 2, 560, { col: '#a89678', bh: 40, bw: 80, seed: 12, moss: false }); g.fillStyle = 'rgba(40,24,14,.35)'; g.fillRect(-PAD, 0, W + PAD * 2, 560);
    for (const x of [-60, 340, 940, 1340]) { sh(g, '#8a7a62', 4, c => c.rect(x - 34, 0, 68, 560)); g.fillStyle = 'rgba(255,255,255,.1)'; g.fillRect(x - 26, 0, 10, 560); }
    sh(g, '#3a2a1a', 4, c => c.rect(-PAD, 0, W + PAD * 2, 40)); for (let i = 0; i < 12; i++) ln(g, [[-PAD + i * 160, 40], [-PAD + i * 160 + 80, 0]], 12, '#3a2a1a');
    DK.window(g, 560, 70, 160, 250, { sky: '#d8e8f0', frame: '#4a3a2a' }); DK.tapestry(g, 120, 90, 170, 300, 0, '#2a3a6a', 'cross'); DK.tapestry(g, 1000, 90, 170, 300, 0, '#7a1e22', 'lion'); DK.bookshelf(g, 410, 556, 120, 300, 1, 4);
    DK.ground(g, { y0: 560, kind: 'stoneFloor', seed: 13, top: '#9a8c74', bot: '#6a5e4c' }); sh(g, '#7a2a22', 3, c => { c.moveTo(380, H + 20); c.lineTo(560, 580); c.lineTo(980, 580); c.lineTo(1160, H + 20); c.closePath(); }); g.strokeStyle = '#d8b04a'; g.lineWidth = 4; g.beginPath(); g.moveTo(410, H + 20); g.lineTo(570, 590); g.lineTo(970, 590); g.lineTo(1130, H + 20); g.stroke();
    // the abbot's carved chair (he sits at 870) + his desk with the ledger, coins, inkhorn
    DK.chair(g, 870, 566, .95, { carved: true }); sh(g, '#5a3a22', 4, c => c.rect(980, 470, 260, 26)); for (const x of [1000, 1220]) ln(g, [[x, 496], [x, 566]], 10, '#4a2a18'); sh(g, '#f2e6c8', 2, c => c.rect(1010, 452, 120, 20)); for (let i = 0; i < 6; i++) sh(g, '#e8c040', 1.5, c => c.ellipse(1170 + (i % 3) * 14, 466 - Math.floor(i / 3) * 6, 9, 4, 0, 0, TAU)); PR.chest(g, 1180, 566, .55); DK.lectern(g, 300, 566, .9); });
  MD.abbotHall = (g, t) => { put(g, ahL(), 0, 0); DK.lightShaft(g, 570, 120, 140, 560, H, 380, .16); DK.dust(g, t, 560, 120, 960, 700, 26);
    for (const x of [470, 1270]) DK.candleStand(g, x, 566, .8, t + x); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 230, 320, 'rgba(255,230,180,.2)'); g.restore();
    if (!crowd()) { FA.dog(g, 1100, 712, .5, t, { dir: -1, coat: '#c8bca8' }); DK.mouse(g, 200, 700, .9, t + 2); }
    DK.fg('candles', { side: 'L', n: 3, sc: 1, blur: 5, a: .85 }); };

  // ======================= DEMESNE (the lord's field) =======================
  const demL = v => layer('md2-dem-' + v, g => { const hv = v === 'harvest';
    sky(g, hv ? [[0, '#a8c0d8'], [.5, '#f2d8a8'], [1, '#f8e8c8']] : [[0, '#8ab8e0'], [.55, '#cfe0ec'], [1, '#eef0e0']], 430); sun(g, hv ? 300 : 1060, hv ? 300 : 90, 300, hv ? '255,224,160' : '255,248,224');
    P2.mistyHills ? P2.mistyHills(g, 390, [[-PAD, 350], [300, 320], [800, 350], [W + PAD, 320]], '#a8bcb0', '#8aa494') : null; farVillage(g, 980, 396, .4, '#8a9e94'); abbey(g, 160, 398, .1);
    DK.treeLine(g, 400, { col: '#6a8a6a', h: 24, seed: 6 }); DK.haze(g, 300, 420, hv ? '250,226,190' : '226,234,236', .5); DK.farFields(g, 400, 432, 9); DK.hedge(g, -PAD, W + PAD, 436, 28, 7, '#4a7a34'); for (const x of [120, 760, 1180]) P.tree(g, x + PAD, 436, 0, x, .35);
    if (hv) { DK.stubble(g, -PAD, W + PAD, 436, H, 4); g.fillStyle = 'rgba(216,184,96,.35)'; g.fillRect(-PAD, 436, W + PAD * 2, H - 436); DK.stubble(g, -PAD, W + PAD, 440, H, 9); DK.wheat(g, 0, -PAD, 520, 470, 50, { seed: 3, wind: 0 }); DK.wheat(g, 0, 860, W + PAD, 478, 54, { seed: 4, wind: 0 });
      for (const [x, y, s] of [[200, 520, .7], [300, 540, .8], [960, 560, .85], [1080, 530, .7], [1180, 600, 1]]) DK.stook(g, x, y, s); }
    else DK.furrows(g, { y0: 436, vx: 700, n: 34, seed: 5, items: 120 });
    DK.ground(g, { y0: 436, kind: 'soil', seed: 51, n: 50, keep: [[200, 1100, 600, 760]], scatterOnly: true }); });
  MD.demesne = (g, t, o = {}) => { const v = o.v || 'plough'; put(g, demL(v), 0, 0); clouds(g, t, v === 'harvest' ? 'warm' : 'day', CL_DAY, .85); DK.flock(g, t, 500, 120, 5, .4);
    if (v === 'plough') { DK.crow(g, 960, 560, .5, t, { peck: true }); DK.crow(g, 1010, 570, .45, t + 1, { hop: true, dir: -1 }); DK.crow(g, 880, 548, .4, t + 2, { peck: true }); DK.scarecrow(g, 1160, 500, .55, t);
      if (o.team !== false) { const x0 = 300 + (t * 25) % 300; F.ox(g, x0 + 470, 620, .8, t + .5, { dir: 1, walk: true, coat: '#6a4a2a' }); ln(g, [[x0 + 200, 560], [x0 + 560, 520]], 10, '#5a3a22'); F.ox(g, x0 + 420, 660, .85, t, { dir: 1, walk: true, coat: '#8a5a3a', yoke: true }); F.plough(g, x0 + 120, 680, 1, 1); G.P(g, 'vill3', x0 - 40, 712, .5, t, { walk: t * 4, turn: .8, pose: 'presentL' }); } }
    else { DK.sparrows(g, t, [[700, 600, .9, 0], [740, 610, 1, 1], [780, 600, .9, 2]]); if (!crowd()) for (let i = 0; i < 3; i++) G.P(g, ['vill1', 'vill4', 'vill2'][i], 400 + i * 120, 500, .16, t + i, { ...F.WORK('sickle', t + i) }); }
    DK.fg(v === 'harvest' ? 'wheat' : 'weeds', { side: 'LR', sc: .75 }); };

  // ======================= MANOR COURT (the hall) =======================
  const courtL = () => layer('md2-court', g => { DK.timberWall(g, -PAD, 0, W + PAD * 2, 560, { col: '#c4ae88', wood: '#4a3020', bay: 260, seed: 9 }); g.fillStyle = 'rgba(30,20,12,.35)'; g.fillRect(-PAD, 0, W + PAD * 2, 560);
    sh(g, '#3a2a1e', 4, c => c.rect(-PAD, 30, W + PAD * 2, 30)); for (let i = 0; i < 8; i++) ln(g, [[-PAD + i * 230, 60], [-PAD + i * 230 + 110, 0]], 14, '#3a2a1e');
    DK.tapestry(g, 500, 90, 280, 180, 0, '#a8202a', 'lion'); DK.window(g, 150, 110, 120, 200, { frame: '#4a3020' }); DK.window(g, 1010, 110, 120, 200, { frame: '#4a3020' }); PR.pegRow(g, 340, 210, .8, ['cloak', 'helmet', 'bag']); PR.spearRack(g, 900, 556, .8); PR.shieldRack(g, 1210, 556, .8);
    DK.ground(g, { y0: 560, kind: 'floor', seed: 14, n: 50 });
    sh(g, '#5a3a22', 5, c => c.rect(300, 440, 680, 40)); for (const x of [320, 960]) sh(g, '#4a2a18', 3, c => c.rect(x - 10, 480, 20, 100)); sh(g, '#e8dcc0', 2, c => c.rect(310, 430, 660, 14));
    for (let i = 0; i < 4; i++) { sh(g, '#f2e6c8', 3, c => c.roundRect(360 + i * 140, 410, 90, 30, 14)); } sh(g, INK, 2, c => c.rect(840, 418, 20, 22)); ln(g, [[850, 418], [870, 380]], 2, '#f2f2f2'); DK.bench(g, 120, 700, 220); DK.bench(g, 960, 700, 220); });
  MD.court = (g, t) => { put(g, courtL(), 0, 0); DK.lightShaft(g, 160, 140, 100, 300, H, 240, .12); DK.lightShaft(g, 1020, 140, 100, 1100, H, 240, .12); DK.dust(g, t, 100, 140, 1200, 700, 30);
    for (const x of [100, 1180]) { ln(g, [[x, 560], [x, 300]], 8, '#3a2a1a'); P2.fire(g, x, 292, .3, t + x); } g.save(); g.globalCompositeOperation = 'lighter'; for (const x of [100, 1180]) T.glow(g, x, 290, 220, 'rgba(255,170,90,.2)'); g.restore();
    if (!crowd()) { FA.dog(g, 1180, 712, .5, t, { dir: -1, coat: '#5a4a3a' }); DK.mouse(g, 640, 700, .8, t); } DK.fg('candles', { side: 'R', n: 3, blur: 5, a: .85 }); };

  // ======================= STRIPS: the open fields =======================
  // perspective view (people work in the strips) or o.aerial: a map-like bird's-eye with ridge-and-furrow
  const stripL = () => layer('md2-strips', g => { sky(g, [[0, '#8ab8e0'], [.6, '#d0e2ea'], [1, '#eef0e0']], 300); sun(g, 1000, 60, 240); P2.mistyHills ? P2.mistyHills(g, 270, [[-PAD, 240], [400, 210], [900, 236], [W + PAD, 220]], '#b0c4b8', '#94aca0') : null;
    farVillage(g, 860, 282, .6, '#8a9e94'); DK.treeLine(g, 290, { col: '#6a8a6a', h: 20, seed: 3 }); DK.haze(g, 200, 310, '226,234,236', .5);
    const cols = ['#c8a860', '#8aa858', '#a8784a', '#d8c070', '#6a8a48', '#b89858', '#9ab060'], r = rng(17), vx = 640, y0 = 292;
    g.fillStyle = '#7a9a5a'; g.fillRect(-PAD, y0, W + PAD * 2, H - y0);
    for (let i = -14; i <= 14; i++) { const a = i / 14, b = (i + 1) / 14, col = cols[Math.floor(r() * cols.length)]; g.fillStyle = col; g.beginPath(); g.moveTo(vx + a * 300, y0); g.lineTo(vx + b * 300, y0); g.lineTo(vx + b * 2600, H + 10); g.lineTo(vx + a * 2600, H + 10); g.closePath(); g.fill();
      g.strokeStyle = 'rgba(60,40,20,.18)'; g.lineWidth = 1.2; for (let k = 1; k < 5; k++) { const m = a + (b - a) * k / 5; g.beginPath(); g.moveTo(vx + m * 300, y0); g.lineTo(vx + m * 2600, H + 10); g.stroke(); }
      g.strokeStyle = '#6a8a44'; g.lineWidth = 3; g.beginPath(); g.moveTo(vx + a * 300, y0); g.lineTo(vx + a * 2600, H + 10); g.stroke(); }
    DK.haze(g, 290, 360, '226,234,236', .35); for (let i = 0; i < 40; i++) { const k = Math.pow(r(), .8), y = lerp(300, H, k), x = vx + (r() - .5) * lerp(400, 3200, k); if (r() < .5) DK.tuft(g, x, y, lerp(.3, 1.2, k), '#5a8a3a', r); else DK.stone(g, x, y, lerp(.2, .9, k), { moss: r() < .5 }); } }, 0);
  const stripAirL = () => layer('md2-strips-air', g => { g.fillStyle = '#7a9a5a'; g.fillRect(-PAD, 0, W + PAD * 2, H); const r = rng(7), cols = ['#c8a860', '#8aa858', '#a8784a', '#d8c070', '#6a8a48', '#b89858'];
    for (const [x0, y0, ww, hh, rot, n] of [[-120, 40, 640, 300, -.08, 14], [560, 20, 760, 260, .05, 16], [-100, 380, 700, 320, .04, 15], [640, 330, 700, 380, -.06, 17]]) { g.save(); g.translate(x0 + ww / 2, y0 + hh / 2); g.rotate(rot); for (let i = 0; i < n; i++) { g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fillRect(-ww / 2, -hh / 2 + i * hh / n, ww, hh / n - 3); g.strokeStyle = 'rgba(60,40,20,.25)'; g.lineWidth = 1; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(-ww / 2, -hh / 2 + i * hh / n + k * (hh / n) / 6); g.lineTo(ww / 2, -hh / 2 + i * hh / n + k * (hh / n) / 6); g.stroke(); } } g.restore(); }
    // hedgerows between the great fields, trees with cast shadows, the track and the brook
    g.strokeStyle = '#3e6a2e'; g.lineWidth = 12; for (const [a, b] of [[[-PAD, 352], [W + PAD, 344]], [[600, -10], [620, H + 10]]]) { g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
    g.strokeStyle = '#c8b080'; g.lineWidth = 14; g.beginPath(); g.moveTo(-PAD, 380); g.quadraticCurveTo(640, 350, W + PAD, 380); g.stroke(); g.strokeStyle = '#7ab0d8'; g.lineWidth = 10; g.beginPath(); g.moveTo(-PAD, 700); g.bezierCurveTo(300, 620, 700, 760, W + PAD, 660); g.stroke();
    for (let i = 0; i < 22; i++) { const x = -PAD + r() * (W + PAD * 2), y = r() * H; g.fillStyle = 'rgba(20,30,10,.3)'; g.beginPath(); g.ellipse(x + 12, y + 10, 24, 12, 0, 0, TAU); g.fill(); sh(g, '#3e6a2e', 2, c => c.arc(x, y, 18, 0, TAU)); g.fillStyle = 'rgba(160,200,100,.5)'; g.beginPath(); g.arc(x - 6, y - 6, 7, 0, TAU); g.fill(); } });
  MD.strips = (g, t, o = {}) => { if (o.aerial) { put(g, stripAirL(), 0, 0); for (let i = 0; i < 6; i++) { const x = 900 + i * 54, y = 110 + (i % 2) * 40; sh(g, '#b8944a', 2.5, c => c.rect(x - 20, y - 12, 40, 24)); ln(g, [[x - 20, y], [x + 20, y]], 2, 'rgba(90,60,20,.6)'); }
      for (let i = 0; i < 7; i++) { const x = (i * 173 + t * 8 * (i % 2 ? 1 : -1)) % 1300, y = 80 + (i * 97) % 600; g.fillStyle = ['#8a6a44', '#5a7aa0', '#a8584a'][i % 3]; g.beginPath(); g.arc(x, y, 7, 0, TAU); g.fill(); g.fillStyle = '#e8c4a0'; g.beginPath(); g.arc(x + 3, y - 4, 4, 0, TAU); g.fill(); }
      for (let i = 0; i < 6; i++) { const x = 200 + (t * 6 + i * 90) % 400, y = 560 + (i % 3) * 20; g.fillStyle = '#f4f0e8'; g.beginPath(); g.ellipse(x, y, 8, 5, 0, 0, TAU); g.fill(); } DK.flock(g, t, 640, 200, 4, .35); return; }
    put(g, stripL(), 0, 0); clouds(g, t, 'day', CL_DAY.slice(0, 3), .85); for (let i = 0; i < 5; i++) { const x = 340 + i * 160, s = .12; if (!crowd()) G.P(g, ['vill1', 'vill2', 'vill4', 'vill5', 'vill6'][i], x, 340 + (i % 2) * 14, s, t + i, { ...F.WORK(i % 2 ? 'hoe' : 'sickle', t + i) }); }
    F.ox(g, 980, 360, .14, t, { dir: -1, walk: true }); DK.flock(g, t, 400, 130, 5, .35); if (!crowd()) { DK.crow(g, 1000, 640, .55, t, { peck: true }); DK.crow(g, 1060, 660, .5, t + 1, { hop: true, dir: -1 }); DK.rabbit(g, 180, 620, .9, t); }
    DK.fg('weeds', { side: 'LR', sc: .8 }); };

  // ======================= FLOOD (1315) =======================
  const floodL = () => layer('md2-flood', g => { P2.overcast ? P2.overcast(g, [[0, '#4a5260'], [.5, '#6a7480'], [.8, '#8a929a'], [1, '#9aa0a4']], 5, [900, 340]) : sky(g, [[0, '#3a4048'], [1, '#6a7078']], 420);
    P2.mistyHills ? P2.mistyHills(g, 420, [[-PAD, 390], [500, 360], [W + PAD, 380]], '#5a6460', '#4a5450') : null; DK.treeLine(g, 424, { col: '#4a5a4a', h: 28, seed: 9 }); DK.haze(g, 340, 440, '150,158,166', .55); cottage(g, 1060, 470, .45, { wall: '#b8ac8a', roof: '#7a6a3a' });
    DK.furrows(g, { y0: 436, vx: 600, n: 30, top: '#5a4a34', bot: '#3a2e22', seed: 7, items: 60, wet: true, sky: '#8a96a0' });
    for (const [x, y, w] of [[200, 520, 300], [700, 560, 420], [400, 650, 360], [1050, 620, 280], [900, 480, 200]]) DK.puddle(g, x, y, w, 1, '#8a98a4');
    const r = rng(3); for (let i = 0; i < 160; i++) { const k = Math.pow(r(), .7), y = lerp(440, H, k), x = -PAD + r() * (W + PAD * 2), s = lerp(.4, 1.3, k); g.save(); g.translate(x, y); g.rotate((r() - .5) * 1.4); ln(g, [[0, 0], [0, -26 * s]], 3 * s, r() < .5 ? '#6a6a3a' : '#5a4a2a'); if (r() < .4) sh(g, '#4a3a22', 0, c => c.ellipse(0, -30 * s, 4 * s, 9 * s, 0, 0, TAU)); g.restore(); } });
  MD.flood = (g, t) => { put(g, floodL(), 0, 0); clouds(g, t, 'grey', [[-100, 10, 1.1, 2, 6], [400, 40, 1, 4, 5], [900, 0, 1.2, 6, 7]], .9);
    g.strokeStyle = 'rgba(200,210,230,.55)'; g.lineWidth = 2; const r = rng(4); for (let i = 0; i < 240; i++) { const x = (r() * (W + 200) + t * 120) % (W + 200) - 100, y = (r() * H + t * 1100 * (.8 + r() * .4)) % H; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 8, y + 30); g.stroke(); }
    for (let i = 0; i < 12; i++) { const k = (t * 1.5 + i / 12) % 1; g.strokeStyle = `rgba(220,230,240,${.6 * (1 - k)})`; g.lineWidth = 2; g.beginPath(); g.ellipse(150 + i * 100, 540 + (i % 4) * 40, 6 + k * 30, 2 + k * 6, 0, 0, TAU); g.stroke(); }
    DK.crow(g, 380, 640, .6, t, { peck: true }); DK.flock(g, t, 800, 150, 4, .45); DK.fg('reeds', { side: 'LR', sc: .8, col: '#3a4a2a' }); };

  // ======================= MARKET =======================
  MD.market = (g, t) => { MD.village(g, t, { v: 'day' }); for (const [x, c, ware] of [[300, '#c8281e', 'bread'], [980, '#2a5aa8', 'eggs']]) { sh(g, '#7a5a3a', 3, c2 => c2.rect(x - 100, 560, 200, 80)); for (const d of [-96, 96]) ln(g, [[x + d, 640], [x + d, 500]], 6, '#5a3a22');
      sh(g, c, 3, c2 => { c2.moveTo(x - 120, 520); c2.lineTo(x + 120, 520); c2.lineTo(x + 100, 490); c2.lineTo(x - 100, 490); c2.closePath(); }); for (let i = 0; i < 6; i++) sh(g, i % 2 ? '#fff8e8' : c, 2, c2 => { c2.moveTo(x - 120 + i * 40, 520); c2.lineTo(x - 80 + i * 40, 520); c2.lineTo(x - 100 + i * 40, 540); c2.closePath(); });
      PR.basket(g, x - 50, 562, .6, ware); PR.basket(g, x + 40, 562, .6, ware === 'bread' ? 'apples' : 'bread'); PR.jug(g, x + 80, 560, .6); }
    PR.cart(g, 1160, 660, .7, 'sacks'); PR.barrel(g, 160, 660, .7); PR.barrel(g, 210, 670, .6); PR.crate(g, 1060, 690, .7); };

  // ======================= PALACE (Edward's hall) =======================
  const palL = () => layer('md2-palace', g => { DK.ashlar(g, -PAD, 0, W + PAD * 2, 560, { col: '#8a7a6a', bh: 44, bw: 90, seed: 21 }); g.fillStyle = 'rgba(60,20,20,.35)'; g.fillRect(-PAD, 0, W + PAD * 2, 560);
    for (const x of [60, 360, 920, 1220]) { sh(g, '#7a6a5a', 4, c => c.rect(x - 40, 0, 80, 560)); g.fillStyle = 'rgba(255,255,255,.1)'; g.fillRect(x - 30, 0, 12, 560); sh(g, '#6a5a4a', 3, c => c.rect(x - 52, 520, 104, 40)); }
    for (const x of [210, 1070]) { sh(g, '#a8202a', 4, c => c.rect(x - 70, 80, 140, 300)); for (let i = 0; i < 3; i++) sh(g, '#e8c84a', 2, c => { c.moveTo(x - 40, 140 + i * 70); c.lineTo(x + 40, 140 + i * 70); c.lineTo(x + 30, 160 + i * 70); c.lineTo(x - 30, 160 + i * 70); c.closePath(); }); }
    sh(g, '#2a3a8a', 4, c => c.rect(500, 60, 280, 340)); g.fillStyle = '#e8c84a'; for (let i = 0; i < 24; i++) { const x = 524 + (i % 6) * 44, y = 96 + Math.floor(i / 6) * 76; g.beginPath(); g.moveTo(x, y - 14); g.quadraticCurveTo(x + 6, y - 2, x, y + 10); g.quadraticCurveTo(x - 6, y - 2, x, y - 14); g.fill(); g.fillRect(x - 9, y, 18, 4); }
    DK.ground(g, { y0: 560, kind: 'stoneFloor', seed: 23, top: '#8a7a68', bot: '#5a4e40' }); sh(g, '#a8202a', 3, c => { c.moveTo(540, H + 20); c.lineTo(590, 560); c.lineTo(690, 560); c.lineTo(740, H + 20); c.closePath(); }); sh(g, '#c8a24a', 5, c => { c.rect(560, 360, 160, 200); c.moveTo(560, 360); c.lineTo(640, 290); c.lineTo(720, 360); });
    PR.spearRack(g, 300, 556, .8); PR.shieldRack(g, 990, 556, .8); });
  MD.palace = (g, t) => { put(g, palL(), 0, 0); for (const x of [440, 840]) { ln(g, [[x, 560], [x, 440]], 8, '#c8a24a'); P2.fire(g, x, 436, .16, t + x); } DK.banner(g, 150, 560, 380, t); DK.banner(g, 1130, 560, 380, t + 1, '#2a3a8a', '#e8c84a');
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 300, 360, 'rgba(255,220,150,.18)'); for (const x of [440, 840]) T.glow(g, x, 430, 140, 'rgba(255,170,90,.25)'); g.restore(); if (!crowd()) FA.dog(g, 1060, 712, .55, t, { dir: -1, coat: '#c8bca8' }); DK.fg('candles', { side: 'L', n: 2, blur: 5, a: .8 }); };

  // ======================= REVOLT (1381, records burn) =======================
  MD.revolt = (g, t) => { MD.village(g, t, { v: 'dusk' }); g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(60,30,60,.5)'; g.fillRect(-300, -300, 1900, 1400); g.restore();
    for (const [x, y] of [[180, 300], [1100, 280]]) { g.fillStyle = 'rgba(40,20,20,.5)'; for (let i = 0; i < 8; i++) { const k = (t * .12 + i / 8) % 1; g.beginPath(); g.arc(x + k * 80, y - k * 260, 30 + k * 80, 0, TAU); g.fill(); } }
    const cx = 640, cy = 640; for (let i = 0; i < 18; i++) { g.save(); g.translate(cx + (i % 6 - 2.5) * 30, cy - Math.floor(i / 6) * 18); g.rotate((i % 3 - 1) * .4); sh(g, '#e8dcb8', 3, c => c.roundRect(-40, -10, 80, 20, 10)); g.restore(); }
    P2.fire(g, cx, cy - 20, 1.3, t); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, cx, cy - 80, 520, 'rgba(255,140,60,.38)'); g.restore();
    for (let i = 0; i < 30; i++) { const k = (t * .35 + i / 30) % 1; g.fillStyle = `rgba(255,${150 + (i % 4) * 25},60,${1 - k})`; g.beginPath(); g.arc(cx + Math.sin(t * 2 + i) * 80 * k + (i % 5 - 2) * 20, cy - 60 - k * 520, 3 + (i % 3), 0, TAU); g.fill(); }
    for (let i = 0; i < 6; i++) { const k = (t * .2 + i / 6) % 1; g.save(); g.translate(cx + (i - 3) * 50 + Math.sin(t + i) * 40, cy - 100 - k * 480); g.rotate(t * 2 + i); g.globalAlpha = 1 - k; sh(g, '#d8c8a0', 2, c => c.rect(-14, -10, 28, 20)); g.fillStyle = '#c8501e'; g.fillRect(-14, 6, 28, 4); g.restore(); }
    for (const x of [140, 1140]) { DK.pitchfork(g, x, 720, .9, x < 640 ? -.2 : .2); } DK.fg('weeds', { side: 'LR', sc: .7, col: '#1e1a20' }); };

  // ======================= SCRIPTORIUM (the survey clerks) =======================
  const scrL = () => layer('md2-scr', g => { DK.ashlar(g, -PAD, 0, W + PAD * 2, 560, { col: '#a89a80', bh: 38, bw: 76, seed: 31 }); g.fillStyle = 'rgba(40,26,16,.4)'; g.fillRect(-PAD, 0, W + PAD * 2, 560);
    for (let i = 0; i < 8; i++) ln(g, [[-PAD + i * 230, 40], [-PAD + i * 230 + 110, 0]], 14, '#3a2a1e'); sh(g, '#3a2a1e', 4, c => c.rect(-PAD, 30, W + PAD * 2, 24));
    DK.window(g, 1010, 110, 160, 270, { frame: '#3a2a1e' }); DK.bookshelf(g, -40, 450, 200, 380, 1, 7); DK.bookshelf(g, 820, 450, 150, 300, 1, 8); DK.shelf(g, 220, 200, 260, 1, ['book', 'jug', 'book', 'book', 'crock']);
    DK.ground(g, { y0: 560, kind: 'stoneFloor', seed: 33, top: '#8a7c66', bot: '#5e5242' });
    sh(g, '#6a4a2a', 5, c => c.rect(200, 470, 760, 30)); for (const x of [220, 940]) sh(g, '#5a3a22', 3, c => c.rect(x - 10, 500, 20, 90)); for (let i = 0; i < 6; i++) sh(g, '#e8dcb8', 3, c => c.roundRect(240 + i * 120, 448, 100, 24, 12));
    for (const x of [300, 540, 780]) { sh(g, '#3a2a1a', 2, c => c.rect(x, 440, 12, 18)); ln(g, [[x + 6, 440], [x + 30, 400]], 2, '#f2f2f2'); } DK.bench(g, 220, 600, 740); });
  MD.scriptorium = (g, t) => { put(g, scrL(), 0, 0); DK.lightShaft(g, 1020, 140, 140, 640, H, 420, .17); for (const x of [320, 760]) { ln(g, [[x, 470], [x, 430]], 9, '#f4f0e8'); P2.fire(g, x, 426, .12, t + x); }
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 1090, 260, 320, 'rgba(255,240,200,.25)'); for (const x of [320, 760]) T.glow(g, x, 420, 110, 'rgba(255,190,100,.25)'); g.restore(); DK.dust(g, t, 640, 120, 1180, 700, 30);
    if (!crowd()) { FA.cat(g, 1150, 712, .5, t, { dir: -1, coat: '#3a3a3a' }); DK.mouse(g, 1000, 700, .8, t); } DK.fg('candles', { side: 'L', n: 2, blur: 5, a: .8 }); };

  // ======================= TABLE (food close-ups) =======================
  MD.table = (g, t, o = {}) => { g.fillStyle = '#2a1e14'; g.fillRect(-300, -300, 1900, 1400); DK.timberWall(g, -300, -300, 1900, 600, { col: '#8a7458', wood: '#3a2618', bay: 300 }); g.fillStyle = 'rgba(20,12,6,.5)'; g.fillRect(-300, -300, 1900, 600);
    g.fillStyle = grad(g, 0, 300, 0, H, [[0, '#8a6038'], [1, '#6a4428']]); g.fillRect(-300, 300, 1900, 600); const r = rng(5); for (let i = 0; i < 14; i++) { const y = 312 + i * 32; g.strokeStyle = 'rgba(40,24,10,.32)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-300, y); for (let x = -300; x < 1600; x += 60) g.lineTo(x, y + Math.sin(x * .01 + i) * 3); g.stroke(); }
    for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(40,24,10,.35)'; g.lineWidth = 2; g.beginPath(); g.ellipse(100 + r() * 1100, 380 + r() * 300, 26, 8, 0, 0, TAU); g.stroke(); } ln(g, [[-300, 302], [1600, 302]], 6, '#4a2e18');
    for (let i = 0; i < 30; i++) { g.fillStyle = 'rgba(220,180,110,.6)'; g.beginPath(); g.arc(200 + r() * 900, 560 + r() * 140, 2 + r() * 2, 0, TAU); g.fill(); }
    sh(g, '#c8c0b0', 2, c => { c.moveTo(1040, 640); c.lineTo(1200, 600); c.lineTo(1204, 608); c.lineTo(1046, 650); c.closePath(); }); sh(g, '#5a3a22', 2, c => c.rect(1180, 594, 70, 14)); PR.jug(g, 160, 420, .9); PR.cup(g, 1100, 430, 1); DK.candleStand(g, 1180, 380, .6, t);
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 360, 520, 'rgba(255,200,130,.16)'); g.restore(); };
})(window);
