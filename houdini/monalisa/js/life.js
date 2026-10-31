/* "The Life of the Mona Lisa" — LIFE layer (user, Oct '31: "add more details — plants, animals, objects — make it lively").
 * Every set is wrapped: after the static set is drawn, living details are added (animals, plants, birds, props, little
 * motions). Anything that stands on the ground in front of where a director crowd stands is skipped when a crowd is on
 * screen (G.DR.crowdOn), so the depth order stays correct. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, MS = G.MS, ML = G.ML, FA = G.Fauna, PR = G.Props, TS = G.TS, EF = G.EF, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = P, TAU = Math.PI * 2, PI = Math.PI;
  const crowd = () => G.DR && G.DR.crowdOn;
  const wrap = (name, fn) => { const f = MS[name]; MS[name] = function (g, t, o = {}) { f.call(this, g, t, o); g.save(); fn(g, t || 0, o); g.restore(); }; };
  const pot = (g, x, y, s, seed, t, col) => TS.pottedPlant(g, x, y, s, seed, t, col);
  const flowers = (g, x, y, w, n, seed, t) => EF && EF.flowers ? EF.flowers(g, x, y, w, n, seed, t) : 0;
  const vase = (g, x, y, s, t, col = '#2a5a9a') => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, col, 3, c => { c.moveTo(-16, 0); c.quadraticCurveTo(-26, -30, -10, -50); c.lineTo(10, -50); c.quadraticCurveTo(26, -30, 16, 0); c.closePath(); });
    for (let i = 0; i < 7; i++) { const a = -PI / 2 + (i - 3) * .3 + Math.sin(t * 1.3 + i) * .03; ln(g, [[0, -50], [Math.cos(a) * 50, -50 + Math.sin(a) * 50]], 3, '#3a7a3a'); g.fillStyle = ['#e8506a', '#f2d23a', '#fff', '#e8862a'][i % 4]; g.beginPath(); g.arc(Math.cos(a) * 52, -50 + Math.sin(a) * 52, 8, 0, TAU); g.fill(); } g.restore(); };
  const candle = (g, x, y, s, t) => { ln(g, [[x, y], [x, y - 36 * s]], 8 * s, '#f4f0e8'); P2.fire(g, x, y - 38 * s, .1 * s, t + x); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, x, y - 44 * s, 60 * s, 'rgba(255,190,110,.25)'); g.restore(); };
  const clock = (g, x, y, r, t) => { sh(g, '#f4f0e8', 4, c => c.arc(x, y, r, 0, TAU)); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; ln(g, [[x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8], [x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92]], 2); } ln(g, [[x, y], [x + Math.cos(t * .5) * r * .7, y + Math.sin(t * .5) * r * .7]], 3); ln(g, [[x, y], [x + Math.cos(t * .04 - 1) * r * .45, y + Math.sin(t * .04 - 1) * r * .45]], 4); };
  const books = (g, x, y, n, seed) => { const r = rng(seed); let xx = x; for (let i = 0; i < n; i++) { const w = 12 + r() * 10, h = 40 + r() * 24, lean = r() < .15 ? .2 : 0; g.save(); g.translate(xx, y); g.rotate(lean); sh(g, ['#7a2a22', '#2a4a6a', '#5a5a2a', '#6a4a2a', '#3a6a5a'][i % 5], 2, c => c.rect(0, -h, w, h)); g.fillStyle = 'rgba(232,200,106,.7)'; g.fillRect(2, -h + 8, w - 4, 3); g.restore(); xx += w + 1; } };
  const pigeons = (g, t, pts) => pts.forEach(([x, y, s, ph], i) => { const hop = Math.max(0, Math.sin(t * 2 + ph)) * 6 * s, peck = Math.sin(t * 5 + ph) > .6 ? 8 * s : 0; g.save(); g.translate(x + Math.sin(t * .3 + ph) * 20, y - hop); g.scale(s * (i % 2 ? -1 : 1), s);
    sh(g, '#8a8e9a', 3, c => c.ellipse(0, -16, 22, 14, 0, 0, TAU)); sh(g, '#6a6e7a', 2, c => c.ellipse(-8, -16, 14, 9, 0, 0, TAU)); sh(g, '#7a7e8a', 3, c => c.arc(18, -28 + peck, 9, 0, TAU)); g.fillStyle = '#e8a03a'; g.beginPath(); g.moveTo(26, -28 + peck); g.lineTo(32, -26 + peck); g.lineTo(26, -24 + peck); g.fill();
    g.fillStyle = '#15100c'; g.beginPath(); g.arc(20, -30 + peck, 2, 0, TAU); g.fill(); ln(g, [[-2, -4], [-2, 0]], 2, '#c8605a'); ln(g, [[6, -4], [6, 0]], 2, '#c8605a'); g.restore(); });
  const lampPost = (g, x, y, s) => { ln(g, [[x, y], [x, y - 220 * s]], 8 * s, '#2a3a2a'); sh(g, '#2a3a2a', 3, c => c.rect(x - 16 * s, y - 250 * s, 32 * s, 34 * s)); g.fillStyle = 'rgba(255,230,160,.8)'; g.fillRect(x - 10 * s, y - 244 * s, 20 * s, 22 * s); };
  const guard = (g, x, y, s, t, who = 'gardien') => G.P(g, who, x, y, s, t, { pose: 'crossed', turn: x < 640 ? .5 : -.5, face: { mouth: 'flat', eyes: 'half' } });
  const ropePosts = (g, x0, x1, y, s = 1) => { for (const x of [x0, x1]) { ln(g, [[x, y], [x, y - 70 * s]], 8 * s, '#c8a24a'); g.fillStyle = '#c8a24a'; g.beginPath(); g.arc(x, y - 74 * s, 9 * s, 0, TAU); g.fill(); } g.strokeStyle = '#a8202a'; g.lineWidth = 9 * s; g.beginPath(); g.moveTo(x0, y - 66 * s); g.quadraticCurveTo((x0 + x1) / 2, y - 30 * s, x1, y - 66 * s); g.stroke(); };

  // ---------- the Louvre today ----------
  wrap('louvre', (g, t) => { const r = rng(2); g.fillStyle = 'rgba(40,40,46,.9)'; g.beginPath(); g.arc(1180, 96, 14, 0, TAU); g.fill(); ln(g, [[1180, 96], [1210, 86]], 6, '#2a2a30'); g.fillStyle = Math.sin(t * 4) > 0 ? '#ff3a2a' : '#5a1a1a'; g.beginPath(); g.arc(1176, 98, 4, 0, TAU); g.fill();
    sh(g, '#f4f0e8', 2, c => c.rect(870, 470, 60, 40)); for (let i = 0; i < 3; i++) g.fillRect(876, 478 + i * 9, 48, 3);
    if (!crowd()) { guard(g, 1240, 712, .5, t); guard(g, 40, 712, .5, t + 2); } });
  // ---------- Salon Carré 1911 ----------
  wrap('salon', (g, t) => { if (!crowd()) { pot(g, 80, 712, 1, 8, t, '#6a4a2a'); pot(g, 1200, 712, 1, 9, t, '#6a4a2a'); } for (const x of [300, 980]) { ln(g, [[x, 80], [x, 120]], 4, '#3a2a1a'); g.fillStyle = '#c8a24a'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(x - 30 + i * 15, 128 + Math.sin(i) * 4, 5, 0, TAU); g.fill(); } }
    P.motes(g, t, 24, 7, [200, 80, 900, 500]); });
  // ---------- Florence ----------
  wrap('florence', (g, t) => { for (const [x, y] of [[160, 300], [640, 280], [1100, 320]]) { for (let i = 0; i < 4; i++) { g.fillStyle = ['#e8506a', '#f2d23a', '#fff', '#c8281e'][i]; g.beginPath(); g.arc(x - 30 + i * 20, y + Math.sin(t + i) * 2, 9, 0, TAU); g.fill(); } sh(g, '#7a4a2a', 2, c => c.rect(x - 40, y + 6, 80, 14)); }
    ln(g, [[220, 220], [560, 230]], 2, '#5a4a3a'); for (let i = 0; i < 6; i++) { const x = 250 + i * 52, sw = Math.sin(t * 2 + i) * 3; sh(g, ['#c8281e', '#fff', '#2a5a9a', '#e8c84a'][i % 4], 2, c => c.rect(x + sw, 226, 30, 40)); }
    FA.cat(g, 870, 288, .45, t, { dir: -1, coat: '#e8a03a' }); P.birds(g, t, [[200, 90, 30, 0], [900, 120, 22, 2], [500, 60, 26, 4]]);
    if (!crowd()) { pigeons(g, t, [[300, 690, .9, 0], [360, 700, .8, 1.3], [980, 696, .9, 2.1]]); FA.dog(g, 1160, 712, .6, t, { dir: -1, coat: '#c8a070' }); PR.basket ? PR.basket(g, 120, 712, .8, 'fruit') : 0; } });
  // ---------- the Giocondo house ----------
  wrap('house', (g, t) => { pot(g, 470, 540, .9, 12, t, '#c8703e'); vase(g, 970, 440, .9, t); books(g, 880, 440, 3, 4);
    g.save(); g.translate(330, 160); ln(g, [[0, -160], [0, 0]], 3, '#8a7a5a'); sh(g, '#c8a24a', 3, c => { c.moveTo(-40, 0); c.quadraticCurveTo(0, -80, 40, 0); c.closePath(); }); g.strokeStyle = '#8a6a2a'; g.lineWidth = 2; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(i * 11, 0); g.lineTo(i * 4, -66); g.stroke(); }
    const hop = Math.abs(Math.sin(t * 3)) * 6; sh(g, '#f2d23a', 2, c => c.ellipse(0, -22 - hop, 12, 9, 0, 0, TAU)); g.fillStyle = '#e8862a'; g.beginPath(); g.moveTo(10, -24 - hop); g.lineTo(17, -22 - hop); g.lineTo(10, -20 - hop); g.fill(); g.restore();
    if (!crowd()) FA.cat(g, 1180, 712, .7, t, { dir: -1, coat: '#6a5a4a' }); });
  // ---------- Leonardo's studio ----------
  wrap('studio', (g, t) => { books(g, 60, 470, 6, 2); g.save(); g.translate(300, 444); sh(g, '#efe6d0', 3, c => { c.arc(0, 0, 18, PI, TAU); c.lineTo(14, 18); c.lineTo(-14, 18); c.closePath(); }); g.fillStyle = '#15100c'; for (const sd of [-1, 1]) { g.beginPath(); g.arc(sd * 7, -2, 4, 0, TAU); g.fill(); } g.restore();
    candle(g, 250, 470, 1, t); g.save(); g.translate(1160, 110); ln(g, [[0, 0], [0, 40]], 3, '#5a4a3a'); g.strokeStyle = '#8a6a3a'; g.lineWidth = 3; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-36 + i * 14, 40); g.lineTo(-36 + i * 14, 110); g.stroke(); } sh(g, 'rgba(0,0,0,0)', 3, c => c.rect(-40, 40, 80, 70)); const fl = Math.sin(t * 9) * 8; g.fillStyle = '#c8603a'; g.beginPath(); g.ellipse(0, 78 + fl * .2, 12, 8, 0, 0, TAU); g.fill(); g.restore();
    pot(g, 1220, 560, .9, 5, t, '#8a5a3a'); if (!crowd()) FA.cat(g, 140, 712, .6, t, { dir: 1, coat: '#3a3a40' }); P.motes(g, t, 30, 4, [900, 100, 380, 420]);
    // flying-machine model hanging from the beams
    g.save(); g.translate(640, 40 + Math.sin(t) * 6); g.rotate(Math.sin(t * .7) * .05); ln(g, [[0, -40], [0, 0]], 2, '#5a4a3a'); g.strokeStyle = '#6a4a2a'; g.lineWidth = 3; g.fillStyle = 'rgba(232,216,176,.85)'; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(sd * 70, -30, sd * 120, 10); g.quadraticCurveTo(sd * 60, 10, 0, 6); g.closePath(); g.fill(); g.stroke(); } g.restore(); });
  // ---------- Amboise ----------
  wrap('amboise', (g, t) => { flowers(g, 300, 600, 400, 18, 4, t); FA.butterfly(g, 500 + Math.sin(t * .7) * 120, 520 + Math.sin(t * 1.3) * 40, .6, t, { col: '#f2d23a' }); FA.butterfly(g, 900 + Math.cos(t * .6) * 100, 560, .5, t + 2, { col: '#fff' });
    FA.duck(g, 300 + (t * 20) % 800, 452, .4, t, { dir: 1 }); FA.duck(g, 360 + (t * 20) % 800, 456, .35, t + 1, { dir: 1 }); P.birds(g, t, [[300, 120, 26, 0], [800, 90, 30, 1.4]]);
    if (!crowd()) { FA.sheep(g, 1100, 650, .6, t, { dir: -1 }); FA.sheep(g, 1200, 680, .55, t, { dir: -1, ph: 1 }); } });
  // ---------- Fontainebleau bath ----------
  wrap('bath', (g, t) => { for (const x of [100, 1180]) { sh(g, '#e8dcc0', 4, c => c.rect(x - 40, 450, 80, 70)); P.tree(g, x + P.PAD, 452, t, 7 + x, .45); for (let i = 0; i < 5; i++) { g.fillStyle = '#f2a030'; g.beginPath(); g.arc(x - 30 + (i * 17) % 60, 300 + (i * 23) % 70, 7, 0, TAU); g.fill(); } }
    for (const x of [380, 900]) { g.save(); g.translate(x, 520); sh(g, '#e8e0d0', 3, c => c.rect(-30, -150, 60, 150)); sh(g, '#f2ece0', 3, c => c.arc(0, -170, 26, 0, TAU)); g.restore(); }
    sh(g, '#f4f0e8', 2, c => c.rect(250, 540, 90, 24)); sh(g, '#c8a24a', 3, c => { c.moveTo(1000, 560); c.quadraticCurveTo(990, 520, 1010, 510); c.lineTo(1030, 510); c.quadraticCurveTo(1050, 520, 1040, 560); c.closePath(); }); });
  // ---------- Versailles ----------
  wrap('versailles', (g, t) => { for (const x of [60, 1220]) { sh(g, '#d8dce4', 4, c => c.rect(x - 46, 470, 92, 70)); P.tree(g, x + P.PAD, 472, t, 3 + x, .5); for (let i = 0; i < 6; i++) { g.fillStyle = '#f29a20'; g.beginPath(); g.arc(x - 34 + (i * 19) % 70, 290 + (i * 29) % 90, 8, 0, TAU); g.fill(); } }
    for (const x of [330, 950]) { ln(g, [[x, 540], [x, 470]], 8, '#c8a24a'); for (const dx of [-24, 0, 24]) candle(g, x + dx, 470, .8, t); }
    if (!crowd()) FA.dog(g, 1060, 712, .45, t, { dir: -1, coat: '#f4f0e8' }); });
  // ---------- 1797 Grande Galerie ----------
  wrap('gallery1797', (g, t) => { if (!crowd()) { pot(g, 120, 712, 1, 14, t, '#6a4a2a'); pot(g, 1160, 712, 1, 15, t, '#6a4a2a'); ln(g, [[960, 712], [1000, 520]], 8, '#6a4a2a'); ln(g, [[1060, 712], [1020, 520]], 8, '#6a4a2a'); sh(g, '#f4f0e8', 3, c => c.rect(950, 480, 120, 90)); } P.motes(g, t, 20, 8, [300, 100, 680, 400]); });
  wrap('galleryEmpty', (g, t) => { P.motes(g, t, 30, 9, [200, 100, 880, 500]); for (let i = 0; i < 4; i++) { const x = 300 + i * 220; ln(g, [[x, 712], [x + 30, 600]], 3, '#5a4a3a'); } });
  // ---------- Tuileries (Joséphine's pug Fortuné on the bed!) ----------
  wrap('tuileries', (g, t) => { clock(g, 340, 345, 26, t); vase(g, 500, 330, .7, t, '#c8a24a'); candle(g, 900, 420, 1, t);
    g.save(); g.translate(1000, 410); const br = Math.sin(t * 2) * 2; sh(g, '#d8b888', 3, c => c.ellipse(0, -18 - br, 46, 26 + br, 0, 0, TAU)); sh(g, '#d8b888', 3, c => c.arc(36, -40, 22, 0, TAU)); sh(g, '#2a2420', 2, c => c.ellipse(46, -36, 11, 8, 0, 0, TAU)); for (const sd of [-1, 1]) sh(g, '#3a2a20', 2, c => c.ellipse(36 + sd * 16, -54, 7, 10, sd * .4, 0, TAU)); g.restore();
    g.globalCompositeOperation = 'lighter'; T.glow(g, 900, 380, 300, 'rgba(255,190,110,.18)'); });
  // ---------- 1911 stair / street / room / hotel / court ----------
  wrap('stair', (g, t) => { if (!crowd()) { ln(g, [[1120, 712], [1080, 520]], 6, '#8a6a3a'); sh(g, '#c8a060', 3, c => c.ellipse(1070, 512, 30, 12, .3, 0, TAU)); sh(g, '#7a8a9a', 3, c => { c.moveTo(1160, 712); c.lineTo(1150, 660); c.lineTo(1210, 660); c.lineTo(1200, 712); c.closePath(); }); } P.motes(g, t, 26, 5, [980, 100, 220, 360]); });
  wrap('street', (g, t) => { for (const x of [60, 420, 860, 1220]) { P.tree(g, x + P.PAD, 500, t, 21 + x, .55); lampPost(g, x + 150, 500, 1); }
    sh(g, '#6a7a8a', 2, c => { c.moveTo(1100, 240); c.lineTo(1130, 60); c.lineTo(1160, 240); c.closePath(); }); g.strokeStyle = '#5a6a7a'; g.lineWidth = 2; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(1110 + i * 4, 200 - i * 30); g.lineTo(1150 - i * 4, 200 - i * 30); g.stroke(); }
    const bx = (t * 30) % 1700 - 200; sh(g, '#6a4a2a', 3, c => c.rect(bx, 456, 140, 18)); sh(g, '#e8dcc0', 2, c => c.rect(bx + 30, 440, 50, 16));
    P.birds(g, t, [[200, 100, 28, 0], [700, 140, 22, 2]]); if (!crowd()) pigeons(g, t, [[200, 700, .9, 0], [260, 708, .8, 1], [1000, 704, .9, 2]]);
    g.save(); g.translate(560, 500); sh(g, '#2a5a3a', 4, c => c.rect(-40, -120, 80, 120)); sh(g, '#2a5a3a', 3, c => { c.moveTo(-50, -120); c.lineTo(0, -160); c.lineTo(50, -120); c.closePath(); }); for (let i = 0; i < 3; i++) sh(g, '#f2ead6', 2, c => c.rect(-32 + i * 22, -100, 18, 26)); g.restore(); });
  wrap('room', (g, t) => { pot(g, 880, 360, .55, 3, t, '#c8703e'); sh(g, '#f4f0e8', 3, c => c.rect(150, 300, 120, 130)); sh(g, '#9ab0c8', 2, c => c.rect(160, 310, 100, 80)); g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(170, 320, 40, 20);
    sh(g, '#6a4a2a', 3, c => c.rect(1020, 520, 160, 90)); sh(g, '#d8dce4', 3, c => c.ellipse(1100, 518, 50, 14, 0, 0, TAU)); sh(g, '#e8e4dc', 3, c => { c.moveTo(1080, 518); c.lineTo(1086, 470); c.lineTo(1114, 470); c.lineTo(1120, 518); c.closePath(); });
    for (let i = 0; i < 3; i++) { const k = (t * .4 + i / 3) % 1; g.fillStyle = `rgba(255,255,255,${.5 * (1 - k)})`; g.beginPath(); g.arc(1100 + Math.sin(t * 2 + i) * 8, 460 - k * 60, 6 + k * 8, 0, TAU); g.fill(); }
    FA.cat(g, 300, 560, .55, t, { dir: 1, coat: '#8a7a6a' }); });
  wrap('hotel', (g, t) => { vase(g, 1000, 470, .8, t, '#c8281e'); sh(g, '#7a5a3a', 3, c => c.roundRect(500, 640, 120, 70, 8)); ln(g, [[530, 640], [530, 625], [590, 625], [590, 640]], 4, '#3a2a1a'); g.save(); g.translate(760, 200); ln(g, [[0, -200], [0, 0]], 2, '#3a2a1a'); sh(g, '#e8c890', 3, c => { c.moveTo(-40, 0); c.lineTo(40, 0); c.lineTo(24, -40); c.lineTo(-24, -40); c.closePath(); }); g.globalCompositeOperation = 'lighter'; T.glow(g, 0, 10, 140, 'rgba(255,220,150,.25)'); g.restore(); });
  wrap('court', (g, t) => { for (const x of [200, 1080]) { ln(g, [[x, 560], [x, 260]], 6, '#c8a24a'); const w = Math.sin(t * 2 + x) * 6; sh(g, '#2a8a4a', 0, c => c.rect(x, 260, 40 + w, 80)); sh(g, '#fff', 0, c => c.rect(x + 40 + w, 260, 40, 80)); sh(g, '#c8281e', 0, c => c.rect(x + 80 + w, 260, 40 - w, 80)); }
    for (const x of [420, 860]) { sh(g, '#15100c', 2, c => c.rect(x - 12, 300, 24, 20)); ln(g, [[x + 4, 300], [x + 20, 270]], 2, '#f4f0e8'); } books(g, 600, 330, 5, 9); });
  // ---------- war ----------
  wrap('chambord', (g, t) => { for (const x of [60, 240, 1060, 1230]) P.tree(g, x + P.PAD, 470, t, 40 + x, .5); P.birds(g, t, [[200, 140, 30, 0], [400, 110, 24, 1], [900, 160, 28, 2]]); FA.horse ? 0 : 0;
    g.save(); g.translate(1150, 520); sh(g, '#8a5a3a', 3, c => c.ellipse(0, -30, 34, 20, 0, 0, TAU)); sh(g, '#8a5a3a', 3, c => c.ellipse(30, -56, 10, 18, .3, 0, TAU)); for (const dx of [-20, -8, 12, 22]) ln(g, [[dx, -14], [dx, 10]], 4, '#5a3a22'); g.strokeStyle = '#5a3a22'; g.lineWidth = 3; g.beginPath(); g.moveTo(34, -72); g.lineTo(26, -92); g.moveTo(34, -72); g.lineTo(44, -90); g.stroke(); g.restore(); });
  wrap('abbey', (g, t) => { FA.sheep(g, 200, 640, .6, t, { dir: 1 }); FA.sheep(g, 320, 670, .55, t, { dir: 1, ph: 2 }); FA.sheep(g, 1100, 650, .6, t, { dir: -1 }); P.tree(g, 150 + P.PAD, 470, t, 7, .5); P.tree(g, 1180 + P.PAD, 470, t, 8, .55); P.birds(g, t, [[300, 120, 26, 0]]); });
  wrap('montauban', (g, t) => { for (const x of [80, 1200]) P.tree(g, x + P.PAD, 512, t, 61 + x, .6); g.save(); g.translate(640, 470); for (let i = 0; i < 5; i++) { sh(g, '#c8704a', 3, c => { c.rect(-300 + i * 130, -10, 130, 20); }); g.fillStyle = '#8ab0d8'; g.beginPath(); g.arc(-235 + i * 130, 10, 40, PI, TAU); g.fill(); } g.restore(); P.birds(g, t, [[300, 110, 28, 0], [800, 90, 24, 1]]); });
  wrap('farm', (g, t) => { g.fillStyle = '#f4f0d8'; g.beginPath(); g.arc(1080, 110, 40, 0, TAU); g.fill(); const r = rng(3); g.fillStyle = '#fff'; for (let i = 0; i < 40; i++) { g.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * 2 + i)); g.fillRect(r() * W, r() * 300, 2, 2); } g.globalAlpha = 1;
    sh(g, '#c8a050', 3, c => { c.moveTo(1120, 470); c.quadraticCurveTo(1170, 380, 1220, 470); c.closePath(); }); FA.dog(g, 260, 712, .55, t, { dir: 1, coat: '#5a4a3a' }); FA.chicken(g, 600, 700, .4, t, { dir: -1 }); FA.chicken(g, 660, 705, .38, t, { dir: 1, ph: 2 }); });
  // ---------- 1963 ----------
  wrap('liner', (g, t, o) => { const r = rng(4); for (let i = 0; i < 6; i++) { const x = ((r() * W + t * (30 + r() * 30)) % (W + 200)) - 100, y = 120 + r() * 200, f = Math.sin(t * 8 + i) * 10; g.strokeStyle = '#f4f4f4'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - 22, y + f); g.quadraticCurveTo(x - 10, y - 8, x, y); g.quadraticCurveTo(x + 10, y - 8, x + 22, y + f); g.stroke(); }
    if ((o.v || 'sea') === 'sea') for (let i = 0; i < 3; i++) { const x = (900 + i * 70 + t * 40) % 1400 - 60, y = 600 + Math.sin(t * 2 + i) * 20; g.fillStyle = '#5a7a9a'; g.beginPath(); g.ellipse(x, y, 30, 8, -.3 + Math.sin(t * 2 + i) * .4, 0, TAU); g.fill(); } });
  wrap('nga', (g, t) => { for (const x of [120, 1160]) { pot(g, x, 712, 1.1, 30 + x, t, '#8a7a6a'); } ln(g, [[640, 0], [640, 60]], 3, '#5a4a3a'); for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,240,200,.9)'; g.beginPath(); g.arc(640 + Math.cos(i) * 60, 70 + Math.sin(i * 2) * 10, 7, 0, TAU); g.fill(); }
    if (!crowd()) for (const x of [250, 1030]) G.P(g, 'marine', x, 712, .5, t, { pose: 'idle', turn: x < 640 ? .3 : -.3, face: { mouth: 'flat' } }); });
  wrap('queue', (g, t) => { for (const x of [80, 1200]) TS.conifer(g, x, 470, .9, '#2e5a3a', 1); TS.snowfall && TS.snowfall(g, t, 70, .8, 30); pigeons(g, t, [[300, 470, .8, 0], [360, 474, .7, 1.5]]); for (const x of [180, 1100]) lampPost(g, x, 520, .9); });
  wrap('tokyo', (g, t) => { for (let i = 0; i < 20; i++) { const k = (t * .15 + i / 20) % 1; g.fillStyle = `rgba(244,200,216,${1 - k})`; g.beginPath(); g.ellipse((i * 97 + t * 30) % 1280, k * 720, 6, 4, t + i, 0, TAU); g.fill(); }
    for (let i = 0; i < 5; i++) { const x = 360 + i * 140; ln(g, [[x, 230], [x, 250]], 2, '#3a2a1a'); sh(g, '#c8281e', 3, c => c.ellipse(x, 266, 18, 22, 0, 0, TAU)); } });
  wrap('apollo', (g, t) => { for (let i = 0; i < 12; i++) { const a = .5 + .5 * Math.sin(t * 3 + i * 1.7); g.fillStyle = `rgba(255,250,220,${a})`; g.font = '22px sans-serif'; g.fillText('✦', 300 + (i * 83) % 700, 80 + (i * 37) % 200); } if (!crowd()) guard(g, 120, 712, .5, t, 'gardien'); });
  wrap('pyramid', (g, t) => { for (const x of [200, 1080]) { sh(g, '#8ab0c8', 3, c => c.ellipse(x, 600, 110, 22, 0, 0, TAU)); for (let i = 0; i < 6; i++) { const k = (t * 1.2 + i / 6) % 1; g.fillStyle = `rgba(230,245,255,${.8 * (1 - k)})`; g.beginPath(); g.arc(x + (i - 2.5) * 12, 590 - Math.sin(k * PI) * 60, 4, 0, TAU); g.fill(); } }
    P.birds(g, t, [[200, 90, 30, 0], [900, 70, 26, 2]]); if (!crowd()) pigeons(g, t, [[500, 700, .9, 0], [560, 706, .8, 1], [760, 702, .9, 2]]); });
  wrap('newRoom', (g, t) => { for (const x of [200, 1080]) { sh(g, '#3a3e46', 3, c => c.roundRect(x - 100, 600, 200, 30, 10)); } pot(g, 80, 700, 1, 77, t, '#2a2e36'); pot(g, 1200, 700, 1, 78, t, '#2a2e36'); });
})(window);
