/* "Where Does It Go?" — LIFE + GROUNDING pass (user rules: no empty frames; nothing floats).
 * Wraps every TS set so it is dressed with animals, plants, props and small background people, and so buildings sit on
 * the ground with contact shadows. Also TS.desk (a collage desk replacing the plain papyrus board): a wooden desk with a
 * kraft-paper sheet in the middle and taped "photos" around it — mini-renders of our painted sets now, real Wikimedia
 * Commons photos (assets/commons) when available — plus small desk props. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, TS = G.TS, EF = G.EF, FA = G.Fauna, PR = G.Props, K = G.VK, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mini = (ctx, who, x, y, s, t, o = {}) => G.VK.fig(ctx, x, y, s, G.EP.cast(who, Object.assign({ t, turn: o.turn || 0, walk: o.walk, pose: o.pose }, o)));   // s < .45 → not a face obstacle
  const shadowLine = (ctx, x0, x1, y, a = .28, h = 14) => { ctx.save(); ctx.fillStyle = grad(ctx, 0, y - 2, 0, y + h, [[0, `rgba(30,15,5,${a})`], [1, 'rgba(30,15,5,0)']]); ctx.fillRect(x0, y - 2, x1 - x0, h); ctx.restore(); };
  const walker = (t, speed, x0, x1, ph = 0) => { const L = x1 - x0, u = ((t * speed + ph) % (2 * L) + 2 * L) % (2 * L); return u < L ? [x0 + u, 1] : [x1 - (u - L), -1]; };
  const wrap = (name, after, before) => { const f = TS[name]; TS[name] = function (ctx, ...a) { if (before) before(ctx, ...a); f.call(this, ctx, ...a); after(ctx, ...a); }; };


  // a potted plant drawn properly: terracotta pot, soil, stems that branch from the soil, leaves on the stems
  TS.pottedPlant = (ctx, x, y, s = 1, seed = 1, t = 0, pot = '#c8703e') => { const r = rng(seed); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(40,25,10,.3)'; ctx.beginPath(); ctx.ellipse(6, 2, 60, 10, 0, 0, TAU); ctx.fill();
    const stems = []; for (let i = 0; i < 7; i++) { const a = -PI / 2 + (i - 3) * .3 + (r() - .5) * .15, L = 90 + r() * 70, sw = Math.sin(t * 1.3 + i) * .03; stems.push([a + sw, L]); }
    for (const [a, L] of stems) { const ex = Math.cos(a) * L, ey = -78 + Math.sin(a) * L; ctx.lineCap = 'round'; ln(ctx, [[0, -78], [ex * .5, -78 + (ey + 78) * .55 - 8], [ex, ey]], 7, OUT); ln(ctx, [[0, -78], [ex * .5, -78 + (ey + 78) * .55 - 8], [ex, ey]], 4, '#5a7a2e'); }
    for (const [a, L] of stems) for (let j = 1; j <= 3; j++) { const k = j / 3, lx = Math.cos(a) * L * k, ly = -78 + Math.sin(a) * L * k, side = j % 2 ? 1 : -1, la = a + side * .9;
      ctx.save(); ctx.translate(lx, ly); ctx.rotate(la); sh(ctx, j === 3 ? '#5e9a3a' : '#4a8430', 3, c => { c.moveTo(0, 0); c.quadraticCurveTo(18, -12, 40, 0); c.quadraticCurveTo(18, 12, 0, 0); c.closePath(); });
      ln(ctx, [[2, 0], [36, 0]], 1.5, 'rgba(220,240,180,.6)'); ctx.restore(); }
    sh(ctx, pot, 4, c => { c.moveTo(-40, -78); c.lineTo(40, -78); c.lineTo(30, 0); c.lineTo(-30, 0); c.closePath(); }); sh(ctx, G.Guide.hexMul(pot, 1.08), 4, c => c.rect(-46, -88, 92, 16));
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-28, -70, 10, 62); sh(ctx, '#4a3424', 2, c => c.ellipse(0, -88, 40, 5, 0, 0, TAU)); ctx.restore(); };

  // ---------- 1. bathroom: rug, floor plant, laundry basket, loo roll, a cat ----------
  wrap('bathroom', (ctx, t) => { sh(ctx, '#6aa8c8', 3, c => c.ellipse(640, 712, 230, 28, 0, 0, TAU)); ctx.fillStyle = 'rgba(255,255,255,.25)'; for (let i = -4; i <= 4; i++) ctx.fillRect(640 + i * 50 - 3, 690, 6, 40);
    TS.pottedPlant(ctx, 110, 712, .85, 21, t);
    PR.basket(ctx, 1170, 712, 1.1, 'bread'); sh(ctx, '#f8f8f4', 3, c => c.roundRect(900, 520, 54, 46, 10)); ln(ctx, [[900, 520], [960, 520]], 5, '#9aa6ae');
    FA.cat(ctx, 300, 708, .8, t, { dir: 1, coat: '#e0a050' }); });

  // ---------- 3. inside Skara Brae: furs on the beds, pots, a quern, a sleeping dog by the hearth, fish drying ----------
  wrap('skara', (ctx, t) => { for (const x of [110, 940]) { sh(ctx, '#8a6a4a', 3, c => c.roundRect(x + 20, 372, 220, 34, 14)); ctx.fillStyle = 'rgba(255,240,210,.18)'; ctx.fillRect(x + 30, 378, 200, 6); }
    PR.jug(ctx, 560, 248, 1.0); PR.bowl(ctx, 640, 248, 1.0); PR.jug(ctx, 720, 328, .9); PR.basket(ctx, 600, 408, .8, 'bread');
    PR.quern(ctx, 420, 640, 1.0); FA.dog(ctx, 830, 650, .7, t, { dir: -1, coat: '#7a5a3a' }); PR.washline(ctx, 120, 150, 420, 150, t, ['#c0b080', '#a8a090', '#c0b080']); });

  // ---------- 6. Mohenjo-daro: grounded walls, people, goats, birds, a neem tree, jars; a manhole rim in front of the worker ----------
  wrap('mohenjo', (ctx, t, o = {}) => { shadowLine(ctx, 0, W, 470, .35, 18);
    P.tree(ctx, 1210 + P.PAD, 470, t, 7, .8); for (const [x, y] of [[480, 470], [770, 470]]) { EF.jar(ctx, x, y, 1.1); }
    for (const [x, s, d] of [[200, .5, 1], [1120, .45, -1]]) FA.sheep(ctx, x, 510, s, t + x, { dir: d, ph: x });
    FA.chicken(ctx, 660, 515, .45, t, { dir: -1 }); P.birds(ctx, t, [[200, 120, 34, 0], [600, 80, 30, 1]]);
    const [wx, wd] = walker(t, 22, 700, 1150); mini(ctx, 'indus2', wx, 505, .34, t, { walk: t * 7, turn: .7 * wd });
    if (o.worker !== false) { ctx.save(); ctx.beginPath(); ctx.rect(840, 576, 120, 30); ctx.clip(); ctx.restore(); }
  });
  TS.manholeRim = (ctx, x = 900, y = 578) => { sh(ctx, '#8a5a3a', 4, c => { c.moveTo(x - 60, y); c.lineTo(x + 60, y); c.lineTo(x + 54, y + 16); c.lineTo(x - 54, y + 16); c.closePath(); }); };

  // ---------- Rome: pines + cypress, boats on the Tiber, pigeons, citizens strolling, a dog ----------
  wrap('rome', (ctx, t) => { const gy = TS.ROME_Y.ground;
    TS.boat(ctx, ((t * 14) % 1600) - 200, 610, .55, t, 'roman', 1); TS.boat(ctx, 1500 - ((t * 10 + 600) % 1700), 660, .4, t, 'dugout', 3);
    for (const [sp, x0, x1, who, s] of [[18, 40, 360, 'marcus', .2], [14, 560, 1180, 'roman2', .19]]) { const [wx, wd] = walker(t, sp, x0, x1); mini(ctx, who, wx, gy - 2, s, t, { walk: t * 7, turn: .8 * wd }); }
    FA.dog(ctx, 600, gy, .32, t, { dir: 1, coat: '#b08050' }); for (const [x, y] of [[700, gy - 2], [726, gy]]) FA.chicken(ctx, x, y, .26, t, { dir: -1, ph: x, col: '#8a8a94' }); });

  // ---------- forica: mosaic floor, a cat, a potted laurel, a sponge stick resting in the channel ----------
  wrap('forica', (ctx, t) => { ctx.save(); ctx.globalAlpha = .45; for (let x = 0; x < W; x += 40) for (let y = 650; y < H; y += 40) { ctx.fillStyle = (x / 40 + y / 40) % 2 ? '#c8b896' : '#9a8a6a'; ctx.fillRect(x, y, 38, 38); } ctx.restore();
    FA.cat(ctx, 1180, 712, .7, t, { dir: -1, coat: '#6a5a4a' }); TS.pottedPlant(ctx, 80, 712, .8, 33, t); });

  // ---------- castle: ducks on the moat, a flag on the tower, trees, crows ----------
  wrap('castle', (ctx, t) => { ln(ctx, [[1000, -20], [1000, -100]], 5); const fw = Math.sin(t * 3) * 8; sh(ctx, '#c8322a', 3, c => { c.moveTo(1000, -100); c.quadraticCurveTo(1040, -110 + fw, 1080, -96); c.lineTo(1000, -70); c.closePath(); });
    for (const [x, s] of [[60, .28], [130, .22], [1225, .25]]) { ctx.fillStyle = 'rgba(30,25,10,.25)'; ctx.beginPath(); ctx.ellipse(x + 10, 338, 40 * s / .3, 6, 0, 0, TAU); ctx.fill(); P.tree(ctx, x + P.PAD, 336, t, 21 + x, s); }
    for (const [x, d] of [[300, 1], [380, 1], [900, -1]]) FA.duck(ctx, x + Math.sin(t * .4 + x) * 30, 560 + (x % 3) * 20, .6, t, { dir: d, ph: x });
    P.birds(ctx, t, [[100, 90, 24, 0], [500, 60, 28, 2]]); });

  // ---------- medieval street: chickens, a pig-ish dog, washing line, barrels, a cart, townsfolk ----------
  wrap('medieval', (ctx, t) => { PR.washline(ctx, 120, 260, 520, 240, t); PR.barrel(ctx, 980, 560, .9); PR.crate(ctx, 1050, 566, .8); PR.cart(ctx, 860, 600, .7, 'sacks');
    for (const [x, y] of [[420, 690], [480, 700], [700, 700]]) FA.chicken(ctx, x, y, .55, t, { dir: x % 2 ? 1 : -1, ph: x }); FA.dog(ctx, 150, 700, .6, t, { dir: 1, coat: '#8a6a4a' });
    const [wx, wd] = walker(t, 26, 300, 1100); mini(ctx, 'neo2', wx, 600, .42, t, { walk: t * 7, turn: .7 * wd }); });

  // ---------- Elizabethan court: candle stands, rushes on the floor, a greyhound, courtiers in the back ----------
  wrap('court', (ctx, t) => { for (const x of [380, 900]) PR.lampStand(ctx, x, 520, 1.1, t); FA.dog(ctx, 1120, 712, .8, t, { dir: -1, coat: '#c8bca8' });
    mini(ctx, 'lady2', 960, 520, .38, t, { turn: -.4 }); mini(ctx, 'mp2', 320, 520, .38, t + 1, { turn: .4 }); });

  // ---------- Kelston: sheep in the meadow, flowers, butterflies, trees ----------
  wrap('kelston', (ctx, t) => { for (const [x, s] of [[1120, .6], [1235, .72]]) P.tree(ctx, x + P.PAD, 520, t, 31 + x, s);
    for (const [x, y, s] of [[260, 620, .6], [420, 660, .7], [980, 640, .6]]) FA.sheep(ctx, x, y, s, t + x, { dir: x > 640 ? -1 : 1, ph: x });
    for (const [x, y] of [[200, 700], [700, 700], [1100, 690]]) EF.flowers(ctx, x, y, 140, 8, x, t); FA.butterfly(ctx, 600 + Math.sin(t) * 80, 560 + Math.sin(t * 2) * 30, .6, t, { col: '#f2a040' }); });

  // ---------- showroom: aspidistra pots, customers browsing, a shop cat ----------
  wrap('showroom', (ctx, t) => { for (const x of [130, 1150]) TS.pottedPlant(ctx, x, 712, .9, x, t, '#3a6a4a');
    mini(ctx, 'lady1', 430, 495, .36, t, { turn: .3 }); mini(ctx, 'mp1', 950, 495, .36, t + 2, { turn: -.3 }); FA.cat(ctx, 760, 712, .6, t, { dir: -1, coat: '#2a2622' }); });

  // ---------- the Thames: barges with sails, gulls, people and crates on the embankment ----------
  wrap('thames', (ctx, t) => { for (const [ph, y, s] of [[0, 452, .7], [700, 540, 1.0]]) { const bx = ((t * 12 + ph) % 1600) - 200; ctx.save(); ctx.translate(bx, y); ctx.scale(s, s);
      sh(ctx, '#5a3a22', 3.5, c => { c.moveTo(-90, 0); c.lineTo(90, 0); c.lineTo(70, 26); c.lineTo(-70, 26); c.closePath(); }); ln(ctx, [[0, 0], [0, -110]], 4); sh(ctx, '#a84a2a', 3, c => { c.moveTo(4, -104); c.lineTo(60, -20); c.lineTo(4, -20); c.closePath(); }); ctx.restore(); }
    P.birds(ctx, t, [[200, 160, 30, 0], [700, 120, 26, 1.5], [1000, 180, 32, 3]]); PR.barrel(ctx, 1180, 664, .8); PR.crate(ctx, 1110, 668, .7);
    const [wx, wd] = walker(t, 20, 60, 600); mini(ctx, 'navvy', wx, 662, .26, t, { walk: t * 7, turn: .7 * wd }); });

  // ---------- Soho (serious, still): puddle reflections, a cat, a distant figure; no gags ----------
  wrap('soho', (ctx, t) => { for (const [x, y, w] of [[360, 640, 120], [900, 680, 160]]) { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#5a6478'; ctx.beginPath(); ctx.ellipse(x, y, w, 12, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    FA.cat(ctx, 1080, 600, .55, t, { dir: -1, coat: '#1e1e22' }); shadowLine(ctx, 0, W, 470, .4, 22); });

  // ---------- Parliament: boats, gulls, people with handkerchiefs on the embankment ----------
  wrap('parliament', (ctx, t, o = {}) => { if (o.inside) return; for (const [ph, y] of [[0, 470], [800, 560]]) { const bx = ((t * 10 + ph) % 1600) - 200; sh(ctx, '#4a3422', 3.5, c => { c.moveTo(bx - 60, y); c.lineTo(bx + 60, y); c.lineTo(bx + 46, y + 18); c.lineTo(bx - 46, y + 18); c.closePath(); }); }
    P.birds(ctx, t, [[300, 140, 26, 0], [900, 100, 30, 2]]); const [wx, wd] = walker(t, 18, 80, 1200); mini(ctx, 'mp1', wx, 676, .24, t, { walk: t * 7, turn: .7 * wd, prop: 'hanky' }); });

  // ---------- sewer works: brick stacks, wheelbarrows, ladders, buckets, navvies in the back ----------
  wrap('sewer', (ctx, t) => { for (const [x, y] of [[230, 712], [1060, 712]]) { for (let r = 0; r < 4; r++) for (let i = 0; i < 4 - r; i++) sh(ctx, '#a85a36', 2, c => c.rect(x - 60 + i * 34 + r * 17, y - 18 - r * 16, 32, 15)); }
    PR.wheelbarrow(ctx, 380, 712, .8); PR.bucket(ctx, 920, 712, .9); ln(ctx, [[1180, 712], [1240, 150]], 6, '#6a4a2a'); ln(ctx, [[1220, 712], [1280, 150]], 6, '#6a4a2a'); for (let i = 0; i < 9; i++) ln(ctx, [[1180 + i * 6.6, 690 - i * 62], [1220 + i * 6.6, 690 - i * 62]], 4, '#6a4a2a');
    mini(ctx, 'navvy', 520, 640, .36, t, { turn: .3 }); mini(ctx, 'navvy', 780, 640, .36, t + 2, { turn: -.3 }); });

  // =================== the collage desk (replaces the plain board) ===================
  const snapCache = {};
  // a "photo" of one of our painted sets (static snapshot, cached) — swapped for real Commons photos when present
  function snap(name, t = 2) { if (snapCache[name]) return snapCache[name]; const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    const F = { bathroom: () => { TS.bathroom(g, t); TS.toilet(g, 640, 700, .95); }, orkney: () => TS.orkney(g, t, 0), skara: () => TS.skara(g, t, { drain: 1 }), village: () => TS.village(g, t, .7), mohenjo: () => TS.mohenjo(g, t, { worker: false }), rome: () => TS.rome(g, t),
      forica: () => TS.forica(g, t), castle: () => TS.castle(g, t), medieval: () => TS.medieval(g, t), court: () => TS.court(g, t), kelston: () => TS.kelston(g, t), showroom: () => TS.showroom(g, t), thames: () => TS.thames(g, t), soho: () => TS.soho(g, t), parliament: () => TS.parliament(g, t), sewer: () => TS.sewer(g, t) }[name];
    if (F) F(); return (snapCache[name] = c); }
  TS.snap = snap;
  function polaroid(ctx, img, x, y, w, rot, caption, o = {}) { const h = w * .62; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.fillStyle = 'rgba(20,10,5,.35)'; ctx.fillRect(-w / 2 - 14 + 8, -h / 2 - 14 + 10, w + 28, h + 70); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 70);
    if (img) { ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); const iw = img.width, ih = img.height, sc = Math.max(w / iw, h / ih) * (1.06 + .04 * Math.sin((o.t || 0) * .2)), dx = Math.sin((o.t || 0) * .15) * 6; ctx.drawImage(img, -iw * sc / 2 + dx, -ih * sc / 2, iw * sc, ih * sc); ctx.restore(); }
    if (caption) { ctx.font = '700 18px Fredoka'; ctx.fillStyle = '#3a2618'; ctx.textAlign = 'center'; ctx.fillText(caption, 0, h / 2 + 34); }
    ctx.fillStyle = 'rgba(240,200,90,.7)'; ctx.save(); ctx.translate(0, -h / 2 - 16); ctx.rotate(-.06); ctx.fillRect(-46, -12, 92, 26); ctx.restore(); ctx.restore(); }
  TS.polaroid = polaroid;
  const THEMES = { prehistory: ['orkney', 'skara', 'village'], indus: ['mohenjo', 'village', 'skara'], rome: ['rome', 'forica', 'castle'], fall: ['medieval', 'castle', 'rome'], tudor: ['court', 'kelston', 'medieval'], georgian: ['kelston', 'showroom', 'bathroom'],
    victorian: ['showroom', 'thames', 'sewer'], soho: ['soho', 'thames', 'parliament'], today: ['bathroom', 'sewer', 'orkney'], recap: ['orkney', 'rome', 'sewer'] };
  TS.desk = (ctx, t, theme = 'recap', o = {}) => { const r = rng(theme.length * 7 + 3);
    ctx.drawImage(P.layer('t-desk', g => { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#6a4128'], [1, '#4a2c1a']]); g.fillRect(0, 0, W, H);
      const rr = rng(5); for (let y = 0; y < H; y += 6) { g.strokeStyle = `rgba(${rr() < .5 ? '30,15,5' : '150,100,60'},${.08 + rr() * .1})`; g.lineWidth = 2; g.beginPath(); g.moveTo(0, y); for (let x = 0; x <= W; x += 80) g.lineTo(x, y + Math.sin(x * .01 + y) * 3); g.stroke(); } }, 0, W, H), 0, 0);
    const imgs = (o.photos || []).map(p => typeof p === 'string' ? (G.COMMONS && G.COMMONS[p]) || snap(p) : p);
    const sets = imgs.length ? imgs : (THEMES[theme] || THEMES.recap).map(n => snap(n));
    const spots = [[150, 130, -.12], [1130, 140, .1], [140, 600, .08], [1140, 610, -.09]];
    sets.slice(0, o.n ?? 4).forEach((im, i) => { const [x, y, rot] = spots[i % 4]; polaroid(ctx, im, x, y, 250, rot, (o.captions || [])[i], { t: t + i * 3 }); });
    if (o.n === 0) return;
    // the kraft paper sheet where the content goes
    ctx.save(); ctx.translate(640, 370); ctx.rotate(-.008); ctx.fillStyle = 'rgba(20,10,5,.4)'; ctx.fillRect(-440 + 10, -280 + 12, 880, 560); ctx.fillStyle = '#f1e6cc'; ctx.fillRect(-440, -280, 880, 560);
    P2.grain(ctx, -440, -280, 880, 560, .25, 7, 'multiply', 1.2); ctx.strokeStyle = 'rgba(120,90,50,.25)'; ctx.lineWidth = 1.5; for (let y = -240; y < 280; y += 36) { ctx.beginPath(); ctx.moveTo(-420, y); ctx.lineTo(420, y); ctx.stroke(); } ctx.restore();
    // desk props: a pencil, paper clips, a magnifier
    ctx.save(); ctx.translate(1000, 690); ctx.rotate(-.3); sh(ctx, '#e8b440', 3, c => c.rect(-90, -8, 170, 16)); sh(ctx, '#e8c8a0', 3, c => { c.moveTo(80, -8); c.lineTo(104, 0); c.lineTo(80, 8); c.closePath(); }); ctx.restore(); };
})(window);

/* Collage boards (user rule: no empty parchment): every EK.board becomes the wooden desk with a column of taped photos
 * on the left (themed to the chapter) and the diagram sheet on the right. The sheet's content is drawn by the shot after
 * EK.board returns, so the board leaves the canvas scaled into the sheet area (the shot's own save/restore undoes it). */
(function (G) {
  const EK = G.EK, TS = G.TS, T = G.Toon, { W, H } = T, board0 = EK.board;
  const THEME = { 2: ['bathroom', 'sewer', 'thames'], 3: ['court', 'showroom', 'bathroom'], 4: ['orkney', 'skara', 'village'], 5: ['skara', 'village', 'mohenjo'], 6: ['mohenjo', 'rome', 'forica'],
    7: ['rome', 'forica', 'castle'], 8: ['forica', 'rome', 'mohenjo'], 9: ['medieval', 'castle', 'rome'], 10: ['court', 'kelston', 'castle'], 11: ['kelston', 'court', 'medieval'], 12: ['kelston', 'showroom', 'court'],
    13: ['showroom', 'thames', 'kelston'], 14: ['thames', 'parliament', 'soho'], 15: ['soho', 'thames', 'parliament'], 16: ['parliament', 'sewer', 'thames'], 17: ['sewer', 'parliament', 'soho'],
    18: ['sewer', 'thames', 'parliament'], 19: ['thames', 'sewer', 'bathroom'], 20: ['bathroom', 'sewer', 'showroom'], 21: ['orkney', 'rome', 'sewer'], 22: ['mohenjo', 'medieval', 'bathroom'], 23: ['sewer', 'bathroom', 'thames'],
    24: ['bathroom', 'thames', 'sewer'], 25: ['orkney', 'mohenjo', 'bathroom'] };
  const CAP = { bathroom: 'today', sewer: 'London sewers', thames: 'the Thames', court: 'Tudor court', showroom: 'Victorian showroom', orkney: 'Orkney', skara: 'Skara Brae', village: 'first villages', mohenjo: 'Mohenjo-daro',
    rome: 'Rome', forica: 'Roman latrine', castle: 'castle garderobe', medieval: 'medieval street', kelston: 'Kelston', parliament: 'Parliament', soho: 'Soho, 1854' };
  const SC = .78, CX = 752, CY = 362;
  EK.board = (ctx, seed = 1, o = {}) => { const t = G.EP.frame || 0;
    TS.desk(ctx, t, 'recap', { n: 0 });
    (o.photos || THEME[seed] || THEME[21]).forEach((n, i) => TS.polaroid(ctx, TS.snap(n), 118, 128 + i * 222, 166, [-.07, .05, -.04][i], CAP[n] || '', { t: t + i * 3 }));
    ctx.save(); ctx.translate(CX, CY); ctx.scale(SC, SC); ctx.translate(-W / 2, -H / 2); ctx.fillStyle = 'rgba(20,10,5,.45)'; ctx.fillRect(14, 18, W, H); ctx.restore();
    ctx.translate(CX, CY); ctx.scale(SC, SC); ctx.translate(-W / 2, -H / 2); board0(ctx, seed); };
})(window);

/* Globe intros (user rule: maps start on a spherical Earth, rotate to the place and zoom in, then dissolve into the
 * painted map). Call at the END of a map shot: TS.globeOver(ctx, t, lt, lon, lat, { D }) — covers the first D seconds. */
(function (G) {
  const TS = G.TS, Gl = G.Globe, clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  TS.globeOver = (ctx, t, lt, lon, lat, o = {}) => { const D = o.D || 2.6; if (lt >= D) return; const a = 1 - clamp((lt - D * .68) / (D * .32)); if (a <= 0) return;
    const v = Gl.fly(lt, [[0, lon - 75, lat * .4 + 8, 250], [D * .3, lon - 20, lat, 330], [D * .8, lon, lat, 2400]]);
    ctx.save(); ctx.globalAlpha = a; Gl.draw(ctx, t, v); ctx.restore(); Gl.pin(ctx, lon, lat, v, null, clamp((lt - D * .45) / .3) * a); };
})(window);
