/* "Where Does It Go?" — painted sets, part 2 (adds to G.TS):
 *   rome(ctx,t,o)        aqueduct on arches + the Cloaca Maxima arch spilling into the Tiber, Roman temples behind
 *   forica(ctx,t,o)      public latrine: marble bench with keyhole seats, water channel at the feet, frescoed wall
 *   castle(ctx,t,o)      castle wall with a garderobe chute over a murky green moat
 *   medieval(ctx,t,o)    timber street: a chamber pot emptied from an upper window, privy, cesspit hatch
 *   court(ctx,t,o)       Elizabethan presence chamber: throne under a canopy, tapestries, chequer floor
 *   kelston(ctx,t,o)     Harington's Tudor manor near Bath (exterior)
 *   showroom(ctx,t,o)    Victorian bathroom showroom c. 1870, toilets on plinths, gas lamps
 *   thames(ctx,t,o)      1800s Thames: outfall pipes, wharves, St Paul's in the smog, people dipping buckets
 *   soho(ctx,t,o)        Broad Street 1854 at dusk: terraces, the pump, gas lamp — still and dark
 *   sohoMap(ctx,t,k)     Snow's map: street grid, the pump, black bars of deaths (k = how many shown)
 *   parliament(ctx,t,o)  the Palace of Westminster across a green, stinking Thames; o.inside = the chamber
 *   sewer(ctx,t,o)       Bazalgette's intercepting sewer under construction: giant brick tube, scaffold, lamps
 *   londonMap(ctx,t,k)   the Thames with the north + south interceptors running east to the outfalls */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, ES = G.ES, EF = G.EF, TS = G.TS, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k), { bricks, tiles, slab, stoneCourses, txt, FONT, DISP } = TS;

  // ---------- shared bits ----------
  function column(g, x, y, h, w = 44, col = '#efe6d2') { sh(g, col, 3.5, c => c.rect(x - w / 2, y - h, w, h)); g.strokeStyle = 'rgba(120,100,70,.3)'; g.lineWidth = 2; for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(x + i * w / 4, y - h + 18); g.lineTo(x + i * w / 4, y - 10); g.stroke(); }
    sh(g, col, 3, c => c.rect(x - w / 2 - 10, y - h - 14, w + 20, 16)); sh(g, col, 3, c => c.rect(x - w / 2 - 8, y - 12, w + 16, 12)); }
  function temple(g, x, y, w, h, col = '#efe6d2') { const n = 6; for (let i = 0; i < n; i++) column(g, x + 20 + i * (w - 40) / (n - 1), y, h, 30, col);
    sh(g, col, 3.5, c => c.rect(x, y - h - 40, w, 26)); sh(g, col, 3.5, c => { c.moveTo(x - 10, y - h - 40); c.lineTo(x + w / 2, y - h - 100); c.lineTo(x + w + 10, y - h - 40); c.closePath(); }); sh(g, mul(col, .9), 3, c => c.rect(x - 10, y, w + 20, 16)); }
  function gothicWindow(g, x, y, w, h, col) { sh(g, col, 3, c => { c.moveTo(x, y + h); c.lineTo(x, y + w / 2); c.quadraticCurveTo(x + w / 2, y - w * .3, x + w, y + w / 2); c.lineTo(x + w, y + h); c.closePath(); }); }

  // =================== Rome: aqueduct + Cloaca Maxima into the Tiber ===================
  const romeL = () => layer('t-rome', g => { ES.skyFor(g, 'day');
    P.hills(g, 330, [[-PAD, 320], [200, 280], [500, 300], [800, 270], [1100, 300], [W + PAD, 290]], '#9ab07a', '#7a9460', 2);
    for (let i = 0; i < 9; i++) EF.palm && EF.bushMass(g, -PAD + i * 170, 330, 120, 40, 60 + i, .85);
    temple(g, 120, 360, 300, 150); temple(g, 900, 350, 260, 130, '#f4ecd8');
    // aqueduct: two tiers of arches across the hills
    for (let tier = 0; tier < 2; tier++) { const y0 = 300 - tier * 70, ah = 70; for (let x = 380; x < 900; x += 60) { sh(g, '#d8c09a', 3, c => { c.rect(x, y0 - ah, 60, ah); }); sh(g, '#9ab8d0', 0, c => { c.moveTo(x + 10, y0); c.lineTo(x + 10, y0 - ah + 30); c.quadraticCurveTo(x + 30, y0 - ah + 6, x + 50, y0 - ah + 30); c.lineTo(x + 50, y0); c.closePath(); }); } }
    sh(g, '#cdb48e', 3, c => c.rect(380, 150, 520, 20));
    // the river Tiber with the great sewer's arch at the bank
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#8aa6a0'], [1, '#5a7a74']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470);
    sh(g, '#bfa47a', 3, c => c.rect(-PAD, 420, 760 + PAD, 70)); stoneCourses(g, -PAD, 424, 760 + PAD, 62, '#c8b08a', 9);
    sh(g, '#2a2420', 4, c => { c.moveTo(380, 490); c.lineTo(380, 450); c.quadraticCurveTo(450, 380, 520, 450); c.lineTo(520, 490); c.closePath(); });
    for (let i = 0; i < 9; i++) { const a = PI + i * PI / 8; slab(g, 450 + Math.cos(a) * 82 - 12, 452 + Math.sin(a) * 82 - 8, 24, 16, '#b8a07a', i); }
  });
  function rome(ctx, t, o = {}) { put(ctx, romeL(), o.pan || 0, .3); P.clouds(ctx, t, 0, [[60, 40, .8, 3, 5], [760, 60, .7, 7, 4]]);
    // water flowing out of the Cloaca Maxima into the river
    for (let i = 0; i < 10; i++) { const k = ((t * .5 + i / 10) % 1); ctx.fillStyle = `rgba(150,140,110,${.6 * (1 - k)})`; ctx.beginPath(); ctx.ellipse(450 + k * 40, 490 + k * 60, 40 + k * 60, 10 + k * 8, 0, 0, TAU); ctx.fill(); }
    // flowing water in the aqueduct channel
    for (let i = 0; i < 9; i++) { const x = 380 + ((t * 40 + i * 60) % 520); ctx.fillStyle = 'rgba(200,230,250,.8)'; ctx.fillRect(x, 154, 20, 4); }
    P.motes(ctx, t, 16, 6); }

  // =================== the forica (public latrine) ===================
  const foricaL = () => layer('t-forica', g => { g.fillStyle = '#c8644a'; g.fillRect(-PAD, 0, W + PAD * 2, H);   // Pompeian red wall
    for (let i = 0; i < 5; i++) { const x = -PAD + 60 + i * 300; sh(g, '#e8c890', 3, c => c.rect(x, 80, 240, 260)); sh(g, '#7a3a2a', 0, c => c.rect(x + 14, 94, 212, 232));
      EF.flowers ? null : null; g.strokeStyle = '#e8c890'; g.lineWidth = 3; g.beginPath(); g.moveTo(x + 40, 300); g.quadraticCurveTo(x + 120, 160, x + 200, 300); g.stroke(); sh(g, '#5a9a5a', 2, circ(x + 120, 200, 16)); }
    sh(g, '#e8dcc4', 3, c => c.rect(-PAD, 0, W + PAD * 2, 50)); for (let x = -PAD; x < W + PAD; x += 40) sh(g, '#d0c2a8', 2, c => c.rect(x, 50, 30, 16));
    // the long marble bench with keyhole openings
    sh(g, '#f2ece0', 4, c => c.rect(-PAD, 430, W + PAD * 2, 50)); sh(g, '#e2dacc', 4, c => c.rect(-PAD, 480, W + PAD * 2, 110));
    for (let x = 80; x < W; x += 230) { sh(g, '#2a2420', 3, c => { c.ellipse(x, 448, 26, 12, 0, 0, TAU); }); sh(g, '#2a2420', 3, c => c.rect(x - 9, 452, 18, 40)); sh(g, '#2a2420', 0, c => c.rect(x - 8, 480, 16, 110)); }
    // floor + the little water channel at the feet (for rinsing the sponge)
    g.fillStyle = grad(g, 0, 590, 0, H, [[0, '#d8ccb4'], [1, '#b8aa90']]); g.fillRect(-PAD, 590, W + PAD * 2, H - 590);
    sh(g, '#9a8e76', 3, c => c.rect(-PAD, 610, W + PAD * 2, 34)); g.fillStyle = '#6aa0b8'; g.fillRect(-PAD, 616, W + PAD * 2, 22);
  });
  function forica(ctx, t, o = {}) { put(ctx, foricaL(), o.pan || 0, .3); for (let i = 0; i < 14; i++) { const x = ((t * 40 + i * 100) % (W + 60)) - 30; ctx.fillStyle = 'rgba(230,245,250,.7)'; ctx.fillRect(x, 624, 22, 3); } P.motes(ctx, t, 14, 8); }

  // =================== castle + garderobe over the moat ===================
  const castleL = () => layer('t-castle', g => { ES.skyFor(g, 'day'); P.hills(g, 340, [[-PAD, 330], [300, 300], [700, 320], [W + PAD, 300]], '#8aa86a', '#6a8a4e', 2);
    // a big stone curtain wall + tower, with a garderobe (little room on corbels) jutting out
    sh(g, '#a89a84', 4, c => c.rect(200, 60, 760, 420)); stoneCourses(g, 200, 60, 760, 420, '#b4a88e', 31); sh(g, null, 4, c => c.rect(200, 60, 760, 420));
    for (let x = 200; x < 960; x += 60) sh(g, '#b4a88e', 3.5, c => c.rect(x, 30, 36, 34));
    sh(g, '#9a8c76', 4, c => c.rect(860, 10, 200, 470)); stoneCourses(g, 860, 10, 200, 470, '#a89c84', 41); for (let x = 860; x < 1060; x += 50) sh(g, '#a89c84', 3.5, c => c.rect(x, -20, 30, 34));
    for (const [x, y] of [[320, 180], [520, 180], [940, 140]]) sh(g, '#1e1a16', 3, c => c.roundRect(x, y, 26, 60, 12));
    // the garderobe: wooden-roofed box on stone corbels, with an open chute below
    sh(g, '#9a8c76', 4, c => c.rect(560, 200, 130, 110)); stoneCourses(g, 560, 200, 130, 110, '#a89c84', 51); sh(g, '#6a4a2e', 4, c => { c.moveTo(548, 204); c.lineTo(625, 150); c.lineTo(702, 204); c.closePath(); });
    for (let i = 0; i < 3; i++) slab(g, 566 + i * 40, 310, 34, 24 + i * 4, '#8a7c66', 60 + i); sh(g, '#1e1a16', 3, c => c.rect(604, 306, 42, 30));
    g.fillStyle = 'rgba(80,90,40,.45)'; g.beginPath(); g.moveTo(600, 336); g.lineTo(650, 336); g.lineTo(700, 470); g.lineTo(560, 470); g.closePath(); g.fill();   // streak down the wall
    // the moat: murky, scummy green
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#6a7a3a'], [1, '#3e4a22']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470);
    const r = rng(4); for (let i = 0; i < 60; i++) { g.fillStyle = `rgba(150,170,70,${.2 + r() * .3})`; g.beginPath(); g.ellipse(-PAD + r() * (W + PAD * 2), 490 + r() * 220, 10 + r() * 40, 3 + r() * 6, 0, 0, TAU); g.fill(); }
  });
  function castle(ctx, t, o = {}) { put(ctx, castleL(), o.pan || 0, .3); P.clouds(ctx, t, 0, [[60, 40, .8, 3, 5], [760, 60, .7, 7, 4]]);
    for (let i = 0; i < 3; i++) { const k = (t * .4 + i / 3) % 1; ctx.strokeStyle = `rgba(150,170,60,${.6 * (1 - k)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(625, 520, 30 + k * 120, 8 + k * 24, 0, 0, TAU); ctx.stroke(); }
    if (o.stink) stink(ctx, t, 620, 470, o.stink); }
  // wavy green stink lines rising (k = strength)
  function stink(ctx, t, x, y, k = 1, n = 3) { ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < n; i++) { const ph = (t * .6 + i / n) % 1, xx = x + (i - (n - 1) / 2) * 60, yy = y - ph * 160;
      ctx.globalAlpha = k * Math.sin(ph * PI); ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(30,40,10,.5)'; const draw = () => { ctx.beginPath(); for (let j = 0; j <= 12; j++) { const u = j / 12; ctx.lineTo(xx + Math.sin(u * 7 + t * 3 + i) * 14, yy - u * 90); } ctx.stroke(); }; draw(); ctx.lineWidth = 5; ctx.strokeStyle = '#9ac83a'; draw(); } ctx.restore(); }

  // =================== medieval street: chamber pots + privies ===================
  const medL = () => layer('t-med', g => { ES.skyFor(g, 'day');
    for (const [x, w, h, col, seed] of [[-PAD, 340, 420, '#e8dcc0', 1], [330, 300, 470, '#f0e4c6', 2], [640, 320, 430, '#e2d4b4', 3], [970, 380, 460, '#ecdfc2', 4]]) {
      sh(g, col, 4, c => c.rect(x, 520 - h, w, h)); g.strokeStyle = '#5a3a22'; g.lineWidth = 12; g.beginPath(); for (const xx of [x + 20, x + w / 2, x + w - 20]) { g.moveTo(xx, 520 - h); g.lineTo(xx, 520); } g.moveTo(x, 520 - h * .5); g.lineTo(x + w, 520 - h * .5); g.moveTo(x + 20, 520 - h * .5); g.lineTo(x + w / 2, 520 - h); g.stroke();
      sh(g, '#7a4a2e', 4, c => { c.moveTo(x - 20, 520 - h); c.lineTo(x + w / 2, 520 - h - 120); c.lineTo(x + w + 20, 520 - h); c.closePath(); });
      sh(g, '#3a2a1a', 3, c => c.rect(x + w / 2 - 50, 520 - h * .5 - 140, 70, 80)); sh(g, '#4a3220', 3, c => c.roundRect(x + w / 2 + 40, 400, 60, 120, 6)); }
    g.fillStyle = grad(g, 0, 520, 0, H, [[0, '#8a7a5e'], [1, '#5e523e']]); g.fillRect(-PAD, 520, W + PAD * 2, H - 520);
    const r = rng(11); for (let i = 0; i < 40; i++) slab(g, -PAD + r() * (W + PAD * 2), 540 + r() * 160, 40 + r() * 40, 14 + r() * 8, '#7a6e58', i);
    g.fillStyle = 'rgba(90,100,50,.5)'; g.beginPath(); g.ellipse(640, 640, 220, 26, 0, 0, TAU); g.fill();   // the gutter puddle
    // a privy (little wooden hut) and a cesspit hatch
    sh(g, '#8a6a44', 4, c => c.rect(1120, 420, 120, 140)); for (let i = 0; i < 5; i++) ln(g, [[1130 + i * 24, 424], [1130 + i * 24, 556]], 2, 'rgba(60,40,20,.4)'); sh(g, '#6a4a2e', 4, c => { c.moveTo(1110, 424); c.lineTo(1180, 380); c.lineTo(1250, 424); c.closePath(); });
    sh(g, '#5a4a36', 4, c => c.rect(200, 600, 140, 50)); ln(g, [[210, 625], [330, 625]], 3);
  });
  function medieval(ctx, t, o = {}) { put(ctx, medL(), o.pan || 0, .3); if (o.pour) { const k = clamp(o.pour);   // a pot tipped out of an upper window
      ctx.save(); ctx.translate(520, 250); ctx.rotate(-k * 1.6); sh(ctx, '#c47a48', 3.5, c => { c.moveTo(-30, -20); c.quadraticCurveTo(-40, 24, -20, 30); c.lineTo(20, 30); c.quadraticCurveTo(40, 24, 30, -20); c.closePath(); }); ctx.restore();
      if (k > .5) for (let i = 0; i < 12; i++) { const u = ((t * 1.4 + i / 12) % 1); ctx.fillStyle = 'rgba(120,130,60,.7)'; ctx.beginPath(); ctx.ellipse(520 + u * 20, 260 + u * 360, 8, 14, 0, 0, TAU); ctx.fill(); } }
    if (o.stink) stink(ctx, t, 640, 620, o.stink); }

  // =================== Elizabethan court ===================
  const courtL = () => layer('t-court', g => { g.fillStyle = '#4a2a22'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    // oak panelling + tapestries + a big window
    for (let x = -PAD; x < W + PAD; x += 120) { sh(g, '#6a4228', 3, c => c.rect(x, 200, 120, 300)); sh(g, '#7a4e30', 2, c => c.rect(x + 14, 220, 92, 120)); sh(g, '#7a4e30', 2, c => c.rect(x + 14, 360, 92, 120)); }
    for (const x of [60, 980]) { sh(g, '#7a2a2a', 4, c => c.rect(x, 40, 240, 300)); g.save(); g.beginPath(); g.rect(x + 10, 50, 220, 280); g.clip(); g.fillStyle = '#4a6a3a'; g.fillRect(x + 10, 50, 220, 280);
      for (let i = 0; i < 6; i++) EF.bushMass(g, x + 10 + i * 40, 330, 60, 80, 70 + i, .8); sh(g, '#e8d4a0', 3, circ(x + 120, 120, 30)); g.restore(); sh(g, null, 4, c => c.rect(x, 40, 240, 300)); }
    // the canopy of estate + throne
    sh(g, '#9a1e28', 4, c => { c.moveTo(470, 20); c.lineTo(810, 20); c.lineTo(790, 380); c.lineTo(490, 380); c.closePath(); }); g.strokeStyle = '#e2b84a'; g.lineWidth = 6; g.strokeRect(500, 40, 280, 320);
    sh(g, '#c9a24a', 4, c => c.rect(450, 10, 380, 40)); for (let x = 460; x < 820; x += 30) sh(g, '#e2b84a', 2, c => c.rect(x, 50, 16, 26));
    sh(g, '#c9a24a', 4, c => { c.moveTo(560, 470); c.lineTo(560, 220); c.quadraticCurveTo(640, 160, 720, 220); c.lineTo(720, 470); c.closePath(); }); sh(g, '#9a1e28', 3, c => c.rect(578, 240, 124, 220));
    // chequered floor in perspective
    g.fillStyle = '#e8dcc4'; g.fillRect(-PAD, 500, W + PAD * 2, H - 500); for (let row = 0; row < 6; row++) { const y0 = 500 + row * row * 6 + row * 20, y1 = 500 + (row + 1) * (row + 1) * 6 + (row + 1) * 20;
      for (let i = -12; i < 12; i++) if ((i + row) % 2) { const f = x => 640 + (x - 640) * (1 + row * .25); g.fillStyle = '#2a2420'; g.beginPath(); g.moveTo(640 + i * 100 * (1 + row * .25), y0); g.lineTo(640 + (i + 1) * 100 * (1 + row * .25), y0); g.lineTo(640 + (i + 1) * 100 * (1 + (row + 1) * .25), y1); g.lineTo(640 + i * 100 * (1 + (row + 1) * .25), y1); g.closePath(); g.fill(); } }
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, 'rgba(0,0,0,.25)'], [.5, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.2)']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
  });
  function court(ctx, t, o = {}) { put(ctx, courtL(), o.pan || 0, .3); for (const x of [140, 1140]) { P2.lantern ? P2.fire(ctx, x, 470, .5, t) : 0; }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 640, 260, 380, 'rgba(255,200,120,.12)'); ctx.restore(); P.motes(ctx, t, 18, 3); }

  // =================== Kelston manor near Bath ===================
  const kelL = () => layer('t-kel', g => { ES.skyFor(g, 'day'); P.hills(g, 380, [[-PAD, 360], [300, 320], [700, 350], [1000, 310], [W + PAD, 340]], '#8ab06a', '#6a9050', 2);
    sh(g, '#7aa25a', 3, c => c.rect(-PAD, 470, W + PAD * 2, H - 470)); P2.meadow(g, 470, H, { seed: 5 });
    // Tudor manor in honey-coloured Bath stone, mullioned windows, tall chimneys, gables
    sh(g, '#e2c48a', 4, c => c.rect(300, 220, 680, 260)); stoneCourses(g, 300, 220, 680, 260, '#e6c992', 77); sh(g, null, 4, c => c.rect(300, 220, 680, 260));
    for (const x of [300, 520, 760]) sh(g, '#d8b880', 4, c => { c.moveTo(x, 222); c.lineTo(x + 110, 120); c.lineTo(x + 220, 222); c.closePath(); });
    for (const x of [360, 600, 840]) { sh(g, '#e8d6a8', 3, c => c.rect(x, 290, 90, 70)); for (let i = 1; i < 3; i++) ln(g, [[x + i * 30, 290], [x + i * 30, 360]], 3); sh(g, '#8ab0c8', 0, c => c.rect(x + 4, 294, 82, 62)); }
    for (const x of [410, 870]) { sh(g, '#c8a070', 4, c => c.rect(x, 60, 40, 120)); }
    sh(g, '#5a3a22', 4, c => c.roundRect(610, 390, 60, 90, 24));
    for (let i = 0; i < 7; i++) EF.bushMass(g, 200 + i * 140, 480, 120, 50, 80 + i, .9);
  });
  function kelston(ctx, t, o = {}) { put(ctx, kelL(), o.pan || 0, .3); P.clouds(ctx, t, 0, [[100, 30, .8, 3, 5], [800, 50, .7, 7, 4]]); for (const x of [430, 890]) G.VK.smoke(ctx, t, x, 50, .35); }

  // =================== Victorian showroom c. 1870 ===================
  const showL = () => layer('t-show', g => { g.fillStyle = '#5a2a2e'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    const r = rng(3); for (let y = 0; y < 470; y += 60) for (let x = -PAD; x < W + PAD; x += 60) { g.fillStyle = 'rgba(230,190,120,.2)'; g.beginPath(); g.moveTo(x + 30, y + 6); g.lineTo(x + 50, y + 30); g.lineTo(x + 30, y + 54); g.lineTo(x + 10, y + 30); g.closePath(); g.fill(); }   // damask wallpaper
    sh(g, '#3a2418', 4, c => c.rect(-PAD, 380, W + PAD * 2, 90)); for (let x = -PAD; x < W + PAD; x += 110) sh(g, '#4a3020', 2, c => c.rect(x + 10, 392, 90, 66));   // dado panelling
    sh(g, '#2a1a12', 4, c => c.rect(260, 40, 760, 74)); txt(g, 'T. CRAPPER & Co.', 640, 78, DISP(46), '#e8c870'); txt(g, 'SANITARY ENGINEERS · CHELSEA', 640, 128, FONT(700, 20), '#e8c870');
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#8a5a3a'], [1, '#5a3a24']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470); for (let y = 480; y < H; y += 30) ln(g, [[-PAD, y], [W + PAD, y]], 1.5, 'rgba(0,0,0,.2)');
    for (const x of [-30, 1220]) { sh(g, '#e8dcc0', 3, c => c.rect(x, 140, 90, 240)); }
  });
  function showroom(ctx, t, o = {}) { put(ctx, showL(), o.pan || 0, .3);
    for (const [x, y, s] of [[300, 500, .52], [560, 500, .52], [820, 500, .52], [1080, 500, .52]]) { sh(ctx, '#3a2418', 3, c => c.rect(x - 90, y - 10, 180, 30)); TS.toilet(ctx, x, y - 10, s); }
    for (const x of [200, 640, 1080]) { ln(ctx, [[x, 0], [x, 150]], 4, '#2a2420'); P2.lantern(ctx, x, 190, t, .8); }
    P.motes(ctx, t, 18, 5); }

  // =================== the 1800s Thames ===================
  const RIV = [372, 600];   // river surface: far-bank wall foot → near quay edge
  function bollard(g, x, y, s = 1) { g.fillStyle = 'rgba(30,25,15,.35)'; g.beginPath(); g.ellipse(x + 4, y + 2, 18 * s, 4 * s, 0, 0, TAU); g.fill(); sh(g, '#2e2c2a', 3, c => { c.moveTo(x - 10 * s, y); c.lineTo(x - 8 * s, y - 26 * s); c.quadraticCurveTo(x, y - 36 * s, x + 8 * s, y - 26 * s); c.lineTo(x + 10 * s, y); c.closePath(); }); }
  function quay(g, y0, col = '#9a8c74', seed = 3) {   // the near bank seen from on top: kerb edge, paving, bollards + a lamp
    sh(g, '#6a5e4c', 3, c => c.rect(-PAD, y0 - 6, W + PAD * 2, 16)); sh(g, col, 3, c => c.rect(-PAD, y0 + 10, W + PAD * 2, H - y0 - 10));
    const r = rng(seed); for (let y = y0 + 14; y < H; y += 22) for (let x = -PAD + (y % 44 ? 0 : 30); x < W + PAD; x += 62) slab(g, x + r() * 4, y, 58, 19, mul(col, .92 + r() * .14), x * 7 + y);
    g.fillStyle = grad(g, 0, y0, 0, y0 + 60, [[0, 'rgba(30,25,15,.35)'], [1, 'rgba(30,25,15,0)']]); g.fillRect(-PAD, y0 + 10, W + PAD * 2, 60);
    for (const x of [90, 470, 830, 1210]) bollard(g, x, y0 + 22, 1.1); }
  const thamesL = v => layer('t-thames2-' + v, g => { P2.overcast(g, [[0, '#7a7a6e'], [.5, '#a8a090'], [1, '#c8bca0']], 5, [900, 200]);
    // St Paul's dome + spires in the smog, then the far-bank warehouses standing on the river wall
    g.fillStyle = 'rgba(110,104,92,.7)'; g.beginPath(); g.ellipse(840, 236, 70, 64, 0, PI, TAU); g.fill(); g.fillRect(780, 236, 120, 60); g.fillRect(830, 146, 20, 40); for (const x of [300, 460, 1080]) { g.beginPath(); g.moveTo(x - 14, 296); g.lineTo(x, 176); g.lineTo(x + 14, 296); g.fill(); }
    P2.haze(g, 200, 320, 'rgba(200,190,160,', .5);
    const r = rng(4); for (let x = -PAD; x < W + PAD; x += 96) { const h = 60 + r() * 50, w = 88, col = mul('#8a6a4e', .85 + r() * .25); sh(g, col, 3, c => c.rect(x, 340 - h, w, h)); sh(g, mul(col, .8), 3, c => { c.moveTo(x - 4, 340 - h); c.lineTo(x + w / 2, 340 - h - 26); c.lineTo(x + w + 4, 340 - h); c.closePath(); });
      for (let i = 0; i < 2; i++) for (let j = 0; j < Math.floor(h / 34); j++) sh(g, '#3a3028', 2, c => c.rect(x + 14 + i * 40, 340 - h + 12 + j * 30, 20, 18)); sh(g, '#3a2a1e', 2, c => c.rect(x + 30, 316, 28, 24)); }
    ln(g, [[180, 340], [180, 230], [260, 250]], 6, '#3a2e24'); ln(g, [[260, 250], [260, 300]], 2, '#3a2e24');   // a wharf crane
    sh(g, '#6a5a44', 3, c => c.rect(-PAD, 338, W + PAD * 2, RIV[0] - 338)); stoneCourses(g, -PAD, 340, W + PAD * 2, RIV[0] - 342, '#7a6a52', 17);
    for (const x of [240, 700, 1080]) { sh(g, '#2a221c', 3, c => c.ellipse(x, 356, 16, 11, 0, 0, TAU)); }   // outfall mouths in the far wall
    g.fillStyle = grad(g, 0, RIV[0], 0, RIV[1], [[0, v === 'stink' ? '#6e7e44' : '#7e7e62'], [1, v === 'stink' ? '#4a5a2a' : '#56563e']]); g.fillRect(-PAD, RIV[0], W + PAD * 2, RIV[1] - RIV[0]);
    g.fillStyle = 'rgba(60,50,30,.25)'; for (let x = -PAD; x < W + PAD; x += 96) g.fillRect(x + 10, RIV[0] + 2, 70, 30);   // reflections of the warehouses
    quay(g, RIV[1], '#9a8c74', 3);
  });
  function thames(ctx, t, o = {}) { const v = o.v || 'grey'; put(ctx, thamesL(v), o.pan || 0, .3);
    for (const x of [240, 700, 1080]) { ctx.fillStyle = 'rgba(100,90,50,.75)'; ctx.fillRect(x - 6, 356, 12, 18); for (let i = 0; i < 6; i++) { const k = (t * .5 + i / 6) % 1; ctx.fillStyle = `rgba(100,90,50,${.6 * (1 - k)})`; ctx.beginPath(); ctx.ellipse(x + k * 30, 378 + k * 40, 16 + k * 70, 4 + k * 8, 0, 0, TAU); ctx.fill(); } }
    for (let i = 0; i < 18; i++) { const x = ((i * 97 + t * 14) % (W + 80)) - 40, y = RIV[0] + 30 + (i * 53) % (RIV[1] - RIV[0] - 50); ctx.strokeStyle = 'rgba(210,210,170,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 30 + (y - 372) / 6, y); ctx.stroke(); }
    if (o.stink) for (const x of [180, 520, 860, 1160]) stink(ctx, t + x, x, 520, o.stink); }
  TS.RIV = RIV; TS.quay = quay;

  // =================== Soho, Broad Street, 1854 (still, dark, no jokes) ===================
  const sohoL = () => layer('t-soho', g => { g.fillStyle = grad(g, 0, 0, 0, 420, [[0, '#2a2e3a'], [1, '#4a4a52']]); g.fillRect(-PAD, 0, W + PAD * 2, 420);
    for (const [x, w, h, col] of [[-PAD, 330 + PAD, 400, '#5a4a40'], [330, 320, 440, '#4e423a'], [650, 340, 420, '#5a4c42'], [990, 360, 400, '#504238']]) { bricks(g, x, 470 - h, w, h, { c: col, mortar: '#3a322c', bw: 34, bh: 14, seed: x });
      for (let row = 0; row < 3; row++) for (let i = 0; i < 3; i++) { const wx = x + 40 + i * (w - 80) / 3, wy = 470 - h + 40 + row * 110; sh(g, '#1e1c22', 3, c => c.rect(wx, wy, 50, 76)); if ((row + i + x) % 4 === 0) { g.fillStyle = 'rgba(255,190,110,.35)'; g.fillRect(wx + 4, wy + 4, 42, 68); } } }
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#4a4640'], [1, '#2a2824']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470); const r = rng(5); for (let i = 0; i < 60; i++) slab(g, -PAD + r() * (W + PAD * 2), 480 + r() * 220, 50 + r() * 50, 12, '#3e3a34', i);
    // the Broad Street pump: cast-iron column with a handle and spout
    sh(g, '#2a2c30', 4, c => c.roundRect(610, 330, 60, 240, 8)); sh(g, '#2a2c30', 4, c => c.ellipse(640, 330, 40, 16, 0, 0, TAU)); sh(g, '#2a2c30', 4, c => c.rect(600, 560, 80, 20));
    sh(g, '#2a2c30', 4, c => c.rect(670, 430, 50, 16));
  });
  function soho(ctx, t, o = {}) { put(ctx, sohoL(), o.pan || 0, .25);
    if (o.handle !== false) { ctx.save(); ctx.translate(624, 380); ctx.rotate(-.5 + Math.sin(t * .3) * .02); sh(ctx, '#2a2c30', 4, c => c.roundRect(-110, -8, 120, 16, 8)); ctx.restore(); }
    ln(ctx, [[260, 470], [260, 250]], 8, '#1e1e22'); P2.lantern(ctx, 260, 240, t, .8);
    ctx.save(); ctx.fillStyle = 'rgba(20,24,40,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function sohoMap(ctx, t, k = 1, o = {}) { ctx.fillStyle = '#efe4c8'; ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .3, 21, 'multiply', 1.4);
    // a simplified street grid (Broad St across the middle), the pump, and stacked bars for deaths per house
    ctx.strokeStyle = '#8a7a5e'; ctx.lineWidth = 34; ctx.lineCap = 'butt';
    for (const [a, b] of [[[60, 360], [1220, 340]], [[60, 160], [1220, 180]], [[60, 560], [1220, 570]], [[260, 60], [240, 700]], [[560, 60], [580, 700]], [[880, 60], [900, 700]], [[1120, 60], [1100, 700]]]) { ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }
    ctx.strokeStyle = '#f6efdc'; ctx.lineWidth = 26; for (const [a, b] of [[[60, 360], [1220, 340]], [[60, 160], [1220, 180]], [[60, 560], [1220, 570]], [[260, 60], [240, 700]], [[560, 60], [580, 700]], [[880, 60], [900, 700]], [[1120, 60], [1100, 700]]]) { ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }
    txt(ctx, 'BROAD STREET', 400, 352, FONT(700, 18), '#6a5a42');
    const r = rng(54), houses = []; for (let i = 0; i < 70; i++) { const ang = r() * TAU, d = 30 + Math.pow(r(), 1.6) * 420, x = 640 + Math.cos(ang) * d * 1.3, y = 350 + Math.sin(ang) * d * .8; houses.push([x, y, Math.max(1, Math.round(6 * (1 - d / 450) * (.5 + r())))]); }
    const shown = Math.floor(houses.length * clamp(k)); houses.slice(0, shown).forEach(([x, y, n]) => { for (let j = 0; j < n; j++) { ctx.fillStyle = '#141414'; ctx.fillRect(x - 9, y - j * 7, 18, 5); } });
    sh(ctx, '#c0281e', 3, circ(640, 352, 14)); txt(ctx, 'PUMP', 640, 384, FONT(700, 18), '#c0281e'); }

  // =================== Parliament + the Great Stink ===================
  const parlL = () => layer('t-parl2', g => { P2.overcast(g, [[0, '#8a8a6a'], [.5, '#b8b08a'], [1, '#d0c494']], 7, [400, 200]);
    // the Palace of Westminster standing on its river terrace wall; the clock tower; Victoria Tower at the far end
    const BY = 380; sh(g, '#cdb88c', 4, c => c.rect(120, 220, 900, BY - 220)); for (let x = 140; x < 1000; x += 46) gothicWindow(g, x, 260, 26, 80, '#8a7a5e');
    for (let x = 140; x < 1000; x += 46) gothicWindow(g, x, 352, 26, 22, '#8a7a5e'); for (let x = 120; x < 1020; x += 46) sh(g, '#cdb88c', 3, c => { c.moveTo(x, 222); c.lineTo(x + 8, 196); c.lineTo(x + 16, 222); c.closePath(); });
    for (let x = 120; x <= 1020; x += 92) sh(g, '#bfa87c', 3, c => c.rect(x - 6, 200, 12, BY - 200));
    sh(g, '#c4ae82', 4, c => c.rect(980, 50, 110, BY - 50)); sh(g, '#e8dcb8', 3, circ(1035, 120, 34)); ln(g, [[1035, 120], [1035, 100]], 4); ln(g, [[1035, 120], [1050, 128]], 4); sh(g, '#b8a276', 4, c => { c.moveTo(970, 50); c.lineTo(1035, -50); c.lineTo(1100, 50); c.closePath(); });
    sh(g, '#c4ae82', 4, c => c.rect(40, 110, 140, BY - 110)); sh(g, '#b8a276', 4, c => c.rect(30, 100, 160, 22)); for (let x = 36; x < 186; x += 22) sh(g, '#c4ae82', 2, c => c.rect(x, 82, 12, 20));
    // the river terrace: a stone wall the whole palace stands on, going down into the water
    sh(g, '#a8987a', 4, c => c.rect(-PAD, BY, W + PAD * 2, 34)); stoneCourses(g, -PAD, BY + 2, W + PAD * 2, 30, '#b4a486', 29); sh(g, '#8a7c62', 3, c => c.rect(-PAD, BY - 8, W + PAD * 2, 10));
    for (let x = -PAD + 10; x < W + PAD; x += 26) sh(g, '#bfae8a', 2, c => c.rect(x, BY - 22, 8, 14));   // balustrade
    // the stinking river
    const RY = BY + 34, QY = 610; g.fillStyle = grad(g, 0, RY, 0, QY, [[0, '#7a8a4a'], [1, '#4a5a2a']]); g.fillRect(-PAD, RY, W + PAD * 2, QY - RY);
    g.fillStyle = 'rgba(205,190,140,.25)'; g.fillRect(120, RY + 2, 900, 40);   // the palace's reflection
    const r = rng(9); for (let i = 0; i < 60; i++) { g.fillStyle = `rgba(140,160,60,${.2 + r() * .3})`; g.beginPath(); g.ellipse(-PAD + r() * (W + PAD * 2), RY + 20 + r() * (QY - RY - 30), 10 + r() * 50, 3 + r() * 6, 0, 0, TAU); g.fill(); }
    quay(g, QY, '#9a8c74', 23);
    for (const x of [300, 980]) { ln(g, [[x, QY + 40], [x, QY - 150]], 8, '#2a2a2a'); sh(g, '#2a2a2a', 3, c => c.rect(x - 14, QY + 30, 28, 14)); sh(g, '#f2d88a', 3, c => c.roundRect(x - 14, QY - 186, 28, 36, 6)); sh(g, '#2a2a2a', 3, c => { c.moveTo(x - 18, QY - 186); c.lineTo(x, QY - 200); c.lineTo(x + 18, QY - 186); c.closePath(); }); }
  });
  const chamberL = () => layer('t-commons2', g => { g.fillStyle = '#3e2a1a'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    // upper wall: tall traceried windows; lower wall: carved oak panelling
    for (let x = -PAD; x < W + PAD; x += 110) { sh(g, '#5e4228', 3, c => c.rect(x, 20, 110, 260)); gothicWindow(g, x + 22, 46, 66, 210, '#e8dca8'); g.strokeStyle = 'rgba(90,70,40,.8)'; g.lineWidth = 3; g.beginPath(); g.moveTo(x + 55, 70); g.lineTo(x + 55, 256); g.moveTo(x + 22, 160); g.lineTo(x + 88, 160); g.stroke(); }
    sh(g, '#6a4a2e', 4, c => c.rect(-PAD, 280, W + PAD * 2, 22)); for (let x = -PAD; x < W + PAD; x += 46) { sh(g, '#5a3e24', 2.5, c => c.rect(x + 4, 306, 38, 100)); sh(g, '#6a4a2e', 2, c => { c.moveTo(x + 12, 320); c.lineTo(x + 23, 308); c.lineTo(x + 34, 320); c.closePath(); }); }
    // the Speaker's canopied chair at the head of the chamber
    sh(g, '#4a3018', 4, c => c.rect(580, 170, 120, 250)); sh(g, '#6a4422', 4, c => { c.moveTo(570, 180); c.lineTo(640, 100); c.lineTo(710, 180); c.closePath(); }); sh(g, '#2e5a32', 3, c => c.rect(600, 300, 80, 70)); sh(g, '#c8a040', 2, circ(640, 150, 12));
    // the soaked curtains hung over the windows (story beat)
    for (const x of [130, 1150]) { sh(g, '#e6e8cc', 4, c => c.rect(x - 70, 30, 140, 250)); g.strokeStyle = 'rgba(150,170,120,.6)'; g.lineWidth = 3; for (let i = -50; i <= 50; i += 25) { g.beginPath(); g.moveTo(x + i, 34); g.quadraticCurveTo(x + i + 8, 150, x + i, 276); g.stroke(); } g.fillStyle = 'rgba(200,220,160,.35)'; g.fillRect(x - 66, 34, 132, 242); }
    // floor: green carpet, the clerks' table with the mace
    g.fillStyle = '#2e4a30'; g.fillRect(-PAD, 410, W + PAD * 2, H - 410); sh(g, '#6a4422', 4, c => c.rect(540, 430, 200, 40)); sh(g, '#d8b04a', 3, c => c.roundRect(560, 422, 160, 10, 5)); sh(g, '#d8b04a', 3, circ(722, 427, 10));
  });
  const BENCH = [450, 545, 640];
  function parliament(ctx, t, o = {}) { if (o.inside) { put(ctx, chamberL(), o.pan || 0, .3);
      BENCH.forEach((y, row) => { const r = rng(row + 3); for (let x = 30 + row * 20; x < W; x += 72 + row * 10) { if (Math.abs(x - 640) < 130 && row === 0) continue; const s = .2 + row * .05, who = r() < .5 ? 'mp1' : 'mp2';
          G.VK.fig(ctx, x + r() * 20, y + 10, s, G.EP.cast(who, { t: t + x, turn: (x < 640 ? .4 : -.4), pose: r() < .3 ? 'think' : undefined, prop: r() < .4 ? 'hanky' : undefined })); }
        sh(ctx, '#2e6a3a', 3.5, c => c.roundRect(-10, y - 30, W + 20, 30, 8)); for (let x = 20; x < W; x += 30) sh(ctx, 'rgba(20,50,25,.6)', 0, circ(x, y - 16, 2.5)); sh(ctx, '#5a3a22', 3.5, c => c.rect(-10, y, W + 20, 40 + row * 6)); });
      stinkHaze(ctx, t, o.stink ?? .6); return; }
    put(ctx, parlL(), o.pan || 0, .3); for (const x of [200, 480, 760, 1040]) stink(ctx, t + x * .01, x, 560, o.stink ?? 1); stinkHaze(ctx, t, (o.stink ?? 1) * .6); }
  function stinkHaze(ctx, t, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a * .35; ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, 'rgba(160,190,60,0)'], [1, 'rgba(150,180,50,1)']]); ctx.fillRect(0, 0, W, H); ctx.restore(); }

  // =================== Bazalgette's sewer under construction ===================
  const sewerL = () => layer('t-sewer', g => { g.fillStyle = '#2a201a'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    // street + houses above (cutaway line), the trench, and the giant brick tube in perspective
    g.fillStyle = '#5a4e40'; g.fillRect(-PAD, 0, W + PAD * 2, 120); for (let x = -PAD; x < W + PAD; x += 160) { bricks(g, x, -40, 150, 120, { c: '#7a5a46', bw: 30, bh: 12, seed: x }); }
    sh(g, '#7a6a54', 3, c => c.rect(-PAD, 110, W + PAD * 2, 30)); txt(g, 'LONDON · 1860s', 640, 126, FONT(700, 18), '#efe0c0');
    g.fillStyle = grad(g, 0, 140, 0, H, [[0, '#6a5440'], [1, '#3a2c20']]); g.fillRect(-PAD, 140, W + PAD * 2, H - 140);
    for (let i = 7; i >= 0; i--) { const s = 1 - i * .1, rr = 300 * s; g.save(); g.translate(640, 440); g.scale(s, s); g.beginPath(); g.arc(0, 0, 300, 0, TAU); g.lineWidth = 60; g.strokeStyle = mul('#a85a36', .55 + (8 - i) * .06); g.stroke();
      g.strokeStyle = 'rgba(40,20,10,.5)'; g.lineWidth = 2; for (let a = 0; a < TAU; a += .13) { g.beginPath(); g.moveTo(Math.cos(a) * 270, Math.sin(a) * 270); g.lineTo(Math.cos(a) * 330, Math.sin(a) * 330); g.stroke(); } g.restore(); }
    g.fillStyle = '#140e0a'; g.beginPath(); g.arc(640, 440, 200, 0, TAU); g.fill();
    g.fillStyle = 'rgba(120,140,140,.6)'; g.beginPath(); g.ellipse(640, 600, 150, 26, 0, 0, TAU); g.fill();
    // scaffold timbers
    for (const x of [140, 1140]) { ln(g, [[x, 140], [x, H]], 14, '#5a3a22'); ln(g, [[x - 60, 300], [x + 60, 300]], 10, '#5a3a22'); ln(g, [[x - 60, 500], [x + 60, 500]], 10, '#5a3a22'); }
  });
  function sewer(ctx, t, o = {}) { put(ctx, sewerL(), o.pan || 0, .25); for (const x of [140, 1140]) P2.lantern(ctx, x, 260, t, .9);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 640, 440, 400, 'rgba(255,170,90,.1)'); ctx.restore(); P.motes(ctx, t, 20, 9); }
  function londonMap(ctx, t, k = 1, o = {}) { ctx.fillStyle = '#e6dcc0'; ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .3, 31, 'multiply', 1.4);
    const river = u => [80 + u * 1120, 360 + Math.sin(u * 7) * 70 + Math.sin(u * 2) * 40];
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (const [w, c] of [[70, '#6a8aa0'], [56, '#8ab0c4']]) { ctx.beginPath(); for (let i = 0; i <= 60; i++) ctx.lineTo(...river(i / 60)); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.stroke(); }
    txt(ctx, 'RIVER THAMES', 360, 440, DISP(22), '#2a5a7a');
    const lines = [[-110, '#a8402a'], [-170, '#a8402a'], [-230, '#a8402a'], [120, '#7a2a6a'], [180, '#7a2a6a']], kk = clamp(k);
    lines.forEach(([dy, col], j) => { ctx.beginPath(); const n = Math.floor(60 * clamp(kk * 1.2 - j * .05)); for (let i = 0; i <= n; i++) { const [x, y] = river(i / 60); ctx.lineTo(x, y + dy * (.7 + .3 * Math.sin(i / 60 * 3))); } ctx.lineWidth = 9; ctx.strokeStyle = col; ctx.stroke(); });
    if (kk > .9) { for (const [x, y, s] of [[1180, 160, 'BECKTON'], [1180, 560, 'CROSSNESS']]) { sh(ctx, '#2a2420', 3, circ(x, y, 14)); txt(ctx, s, x - 30, y + (y < 300 ? -30 : 34), FONT(700, 20), '#2a2420', 'right'); } }
    txt(ctx, 'intercepting sewers', 640, 60, DISP(30), '#5a2a1a'); }

  Object.assign(TS, { rome, forica, castle, medieval, court, kelston, showroom, thames, soho, sohoMap, parliament, sewer, londonMap, stink, stinkHaze, column, temple });
})(window);
