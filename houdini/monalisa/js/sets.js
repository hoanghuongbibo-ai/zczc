/* "The Life of the Mona Lisa" — sets (static parts cached as layers; living parts drawn per frame).
 *   MS.louvre(g, t, o)      Salle des États today: dark display wall, the painting behind armoured glass, curved wooden
 *                           barrier, red side walls with big Venetian canvases, skylight. o.mona (opts for the painting)
 *   MS.salon(g, t, o)       Salon Carré 1911: crimson walls hung floor-to-ceiling, skylight; o.missing → four iron pegs
 *   MS.florence(g, t)       a Florence street, 1503: palazzi, shop awnings with bolts of silk, the Duomo beyond
 *   MS.house(g, t)          the Giocondo house: a rich room, window onto the city, chest, red hangings
 *   MS.studio(g, t, o)      Leonardo's studio: easel (o.easel = painting opts | 'blank'), drawings pinned up, flying-machine model
 *   MS.amboise(g, t)        Clos Lucé near Amboise: pink-brick manor, the Loire, a cherry tree in bloom
 *   MS.bath(g, t, o)        Fontainebleau bath suite: tiled pool with steam, arcades, a painting on the wall
 *   MS.versailles(g, t, o)  a gilded room of mirrors (the painting small on the wall)
 *   MS.gallery1797(g, t, o) the Louvre's Grande Galerie, public at last (long perspective, skylights)
 *   MS.tuileries(g, t, o)   Napoleon's candle-lit bedroom with a canopy bed; the painting over the fireplace
 *   MS.stair(g, t)          a quiet Louvre service stairwell (1911), early light;  MS.street(g, t) the Paris quay outside
 *   MS.room(g, t, o)        Peruggia's boarding-house room: iron bed, the wooden trunk, window on the roofs, wall calendar
 *   MS.hotel(g, t)          a small Florence hotel room;  MS.court(g, t) a 1914 Florence courtroom
 *   MS.galleryEmpty(g, t)   1939: the Grande Galerie with empty frames and crates;  MS.chambord(g, t) the château at dusk
 *   MS.abbey(g, t)  MS.montauban(g, t)  MS.farm(g, t)    the wartime hiding places
 *   MS.liner(g, t, o)       the SS France at sea (o.v 'sea' | 'harbor' with the Manhattan skyline)
 *   MS.nga(g, t, o)         National Gallery, Washington: rotunda columns, the painting on a red velvet wall, Marines
 *   MS.queue(g, t)          the snowy January line outside the NGA;  MS.tokyo(g, t) Tokyo National Museum crowd
 *   MS.apollo(g, t)         Galerie d'Apollon (gold ceiling, display cases);  MS.pyramid(g, t) the Louvre courtyard + pyramid
 *   MS.newRoom(g, t)        the planned private room (2031): a sleek vaulted space, the painting alone */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, TS = G.TS, PR = G.Props, ML = G.ML, { W, H, clamp, lerp, grad, rng } = T;
  const { sh, ln, circ, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI, mul = (h, k) => G.Guide.hexMul(h, k);
  const MS = G.MS = {};
  const shadow = (g, x, y, rx, a = .3, ry = rx * .2) => { g.save(); g.fillStyle = `rgba(20,15,10,${a})`; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, TAU); g.fill(); g.restore(); };
  const parquet = (g, y0, col = '#a8784a') => { g.fillStyle = grad(g, 0, y0, 0, H, [[0, mul(col, .8)], [1, col]]); g.fillRect(-PAD, y0, W + PAD * 2, H - y0);
    g.strokeStyle = 'rgba(60,35,15,.3)'; g.lineWidth = 2; for (let i = 0; i < 14; i++) { const y = y0 + Math.pow(i / 14, 1.6) * (H - y0); g.beginPath(); g.moveTo(-PAD, y); g.lineTo(W + PAD, y); g.stroke(); }
    for (let i = -10; i <= 10; i++) { g.beginPath(); g.moveTo(640 + i * 60, y0); g.lineTo(640 + i * 200, H); g.stroke(); } };
  const skylight = (g, y = 0, h = 110, col = '#e8eef4') => { g.fillStyle = '#5a4a3a'; g.fillRect(-PAD, y, W + PAD * 2, h); for (let i = 0; i < 9; i++) { g.fillStyle = col; g.fillRect(-PAD + 30 + i * 180, y + 18, 150, h - 36); g.strokeStyle = 'rgba(80,90,100,.4)'; g.lineWidth = 3; g.strokeRect(-PAD + 30 + i * 180, y + 18, 150, h - 36); } };
  const sky = (g, top, bot, y1 = 420) => { g.fillStyle = grad(g, 0, 0, 0, y1, [[0, top], [1, bot]]); g.fillRect(-PAD, 0, W + PAD * 2, y1); };

  // ============ the Louvre today ============
  const louvreL = () => layer('ml-louvre', g => {
    g.fillStyle = '#7a2e26'; g.fillRect(-PAD, 0, W + PAD * 2, H); skylight(g, 0, 90, '#f2f2ee');
    for (const [x, w, s] of [[-180, 360, 3], [1100, 360, 7]]) ML.painting(g, x, 170, w, 250, s);
    g.fillStyle = '#2a3440'; g.fillRect(330, 110, 620, 470); g.fillStyle = 'rgba(255,255,255,.04)'; g.fillRect(330, 110, 620, 20);   // the display wall
    sh(g, '#c8b8a0', 3, c => c.rect(560, 250, 160, 220)); g.fillStyle = 'rgba(200,225,240,.15)'; g.fillRect(560, 250, 160, 220);   // glass vitrine
    parquet(g, 560, '#b88a56');
    // curved wooden barrier
    g.lineCap = 'round'; for (const [w, c] of [[30, '#15100c'], [22, '#a8784a']]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(190, 640); g.quadraticCurveTo(640, 560, 1090, 640); g.stroke(); }
    for (let i = 0; i < 7; i++) { const x = 230 + i * 137, y = 628 - Math.sin(i / 6 * PI) * 46; ln(g, [[x, y], [x, y + 50]], 10, '#6a4a2a'); }
  });
  MS.louvre = (g, t, o = {}) => { put(g, louvreL(), 0, .2); ML.mona(g, 640, 360, 150, Object.assign({ glass: true, frame: 'gold' }, o.mona || {}));
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 360, 260, 'rgba(255,230,180,.16)'); g.restore(); };
  // ============ Salon Carré, 1911 ============
  const salonL = () => layer('ml-salon', g => {
    g.fillStyle = '#6a2a24'; g.fillRect(-PAD, 0, W + PAD * 2, H); skylight(g, 0, 80, '#e8e4d4');
    const r = rng(4); const slots = [[-160, 110, 220, 160], [100, 100, 170, 220], [300, 110, 150, 120], [800, 100, 170, 220], [1000, 110, 230, 160], [1270, 110, 200, 200], [-160, 300, 220, 230], [100, 360, 170, 160], [880, 360, 170, 160], [1080, 300, 220, 230], [1300, 340, 170, 180], [300, 260, 150, 100]];
    slots.forEach(([x, y, w, h], i) => ML.painting(g, x, y, w, h, i + 3));
    g.fillStyle = '#4a2a20'; g.fillRect(-PAD, 540, W + PAD * 2, 30); parquet(g, 570, '#a07040');
    sh(g, '#3a2a20', 3, c => c.rect(380, 470, 520, 18)); ln(g, [[380, 488], [380, 560]], 6, '#5a4030'); ln(g, [[900, 488], [900, 560]], 6, '#5a4030');   // a low rail
  });
  MS.salon = (g, t, o = {}) => { put(g, salonL(), 0, .2); if (o.missing) ML.pegs(g, 640, 300, 210); else ML.mona(g, 640, 300, 210, Object.assign({ sepia: o.sepia ?? 0 }, o.mona || {})); };
  // ============ Florence 1503 ============
  const florL = () => layer('ml-florence', g => { sky(g, '#9cc8e8', '#f2e2c0', 420);
    g.fillStyle = '#c87a4a'; g.beginPath(); g.ellipse(980, 240, 120, 110, 0, PI, TAU); g.fill(); g.strokeStyle = '#f2e8d8'; g.lineWidth = 5; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(980 + i * 30, 240); g.quadraticCurveTo(980 + i * 22, 160, 980, 130); g.stroke(); }
    sh(g, '#f2e8d8', 3, c => c.rect(950, 100, 60, 34)); sh(g, '#e8dcc8', 3, c => c.rect(860, 240, 240, 80)); sh(g, '#d8c8b0', 3, c => c.rect(760, 150, 46, 170));   // Duomo + bell tower
    const cols = ['#e8c890', '#d8a878', '#f0d8a8', '#c89068', '#e0b888'];
    for (let i = 0; i < 7; i++) { const x = -200 + i * 240, w = 230, h = 260 + (i % 3) * 40, y = 560 - h; sh(g, cols[i % 5], 4, c => c.rect(x, y, w, h)); sh(g, '#a85a3a', 3, c => c.rect(x - 10, y - 16, w + 20, 18));
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const wx = x + 30 + k * 70, wy = y + 40 + r * 70; if (wy > 500) continue; sh(g, '#3a2a1e', 3, c => { c.rect(wx, wy + 10, 36, 40); c.arc(wx + 18, wy + 10, 18, PI, TAU); }); }
      if (i % 2 === 0) { sh(g, ['#c8281e', '#2a5a9a', '#3a8a4a'][i % 3], 3, c => { c.moveTo(x + 10, 470); c.lineTo(x + w - 10, 470); c.lineTo(x + w + 10, 520); c.lineTo(x - 10, 520); c.closePath(); }); for (let b = 0; b < 4; b++) sh(g, ['#e8c84a', '#c8281e', '#7a3aa8', '#2a8a8a'][b], 3, c => c.roundRect(x + 30 + b * 44, 520, 34, 40, 6)); } }
    g.fillStyle = grad(g, 0, 560, 0, H, [[0, '#c8b090'], [1, '#e0cca8']]); g.fillRect(-PAD, 560, W + PAD * 2, H - 560); g.strokeStyle = 'rgba(100,80,60,.25)'; g.lineWidth = 2; for (let i = 0; i < 30; i++) { g.strokeRect(-PAD + (i % 10) * 180 + (Math.floor(i / 10) % 2) * 90, 580 + Math.floor(i / 10) * 46, 170, 40); } });
  MS.florence = (g, t) => { put(g, florL(), 0, .25); P.birds && P.birds(g, t, [[300, 120, 26, 0], [900, 80, 22, 1.4]]); };
  // ============ the Giocondo house ============
  const houseL = () => layer('ml-house', g => { g.fillStyle = '#e8d8b8'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let x = -PAD; x < W + PAD; x += 120) { g.fillStyle = 'rgba(150,110,60,.12)'; g.fillRect(x, 0, 60, 540); }
    sh(g, '#8a2a24', 4, c => c.rect(-PAD, 0, 260, 540)); sh(g, '#8a2a24', 4, c => c.rect(1100, 0, 400, 540));
    sh(g, '#6a4a2a', 5, c => c.rect(500, 120, 280, 260)); g.fillStyle = grad(g, 0, 130, 0, 370, [[0, '#a8d0e8'], [1, '#f2e0c0']]); g.fillRect(515, 135, 250, 230); g.fillStyle = '#c87a4a'; g.beginPath(); g.ellipse(640, 330, 60, 50, 0, PI, TAU); g.fill(); ln(g, [[640, 135], [640, 365]], 6, '#6a4a2a'); ln(g, [[515, 250], [765, 250]], 6, '#6a4a2a');
    g.fillStyle = '#7a5032'; g.fillRect(-PAD, 540, W + PAD * 2, H - 540); g.fillStyle = 'rgba(40,20,10,.25)'; for (let i = 0; i < 14; i++) g.fillRect(-PAD + i * 120, 540, 4, 180);
    sh(g, '#5a3a22', 4, c => c.rect(860, 440, 220, 120)); sh(g, '#c8a24a', 3, c => c.rect(870, 470, 200, 12)); });
  MS.house = (g, t) => put(g, houseL(), 0, .2);
  // ============ Leonardo's studio ============
  const studioL = () => layer('ml-studio', g => { g.fillStyle = '#d8c4a0'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let i = 0; i < 9; i++) { const x = -150 + i * 170, y = 70 + (i % 2) * 70; sh(g, '#f2e6c8', 2, c => c.rect(x, y, 120, 90)); g.strokeStyle = '#6a4a2a'; g.lineWidth = 2; g.beginPath(); g.arc(x + 60, y + 45, 26, 0, TAU); g.moveTo(x + 20, y + 70); g.lineTo(x + 100, y + 20); g.stroke(); }
    sh(g, '#6a4a2a', 5, c => c.rect(1060, 120, 200, 300)); g.fillStyle = grad(g, 0, 130, 0, 410, [[0, '#bcd8e8'], [1, '#f4e4c4']]); g.fillRect(1075, 135, 170, 270);
    g.fillStyle = '#8a6a44'; g.fillRect(-PAD, 560, W + PAD * 2, H - 560); sh(g, '#6a4a2a', 4, c => c.rect(40, 470, 300, 22)); for (const x of [60, 320]) ln(g, [[x, 492], [x, 560]], 10, '#5a3a22');
    for (let i = 0; i < 5; i++) sh(g, ['#c8281e', '#2a5a9a', '#e8c84a', '#3a8a4a', '#f2f2f2'][i], 3, c => c.roundRect(70 + i * 50, 430, 32, 40, 6));
    g.save(); g.translate(200, 230); g.strokeStyle = '#6a4a2a'; g.lineWidth = 4; g.beginPath(); g.moveTo(-120, 0); g.quadraticCurveTo(-60, -60, 0, 0); g.quadraticCurveTo(60, -60, 120, 0); g.stroke(); for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(i * 50, -20); g.lineTo(i * 30, 30); g.stroke(); } g.restore(); });
  MS.studio = (g, t, o = {}) => { put(g, studioL(), 0, .2); const ex = o.ex ?? 760; ln(g, [[ex - 120, 640], [ex - 40, 160]], 12, '#6a4a2a'); ln(g, [[ex + 120, 640], [ex + 40, 160]], 12, '#6a4a2a'); ln(g, [[ex, 640], [ex, 200]], 10, '#5a3a22'); sh(g, '#6a4a2a', 4, c => c.rect(ex - 140, 520, 280, 20));
    if (o.easel !== false) ML.mona(g, ex, 370, 280, Object.assign({ frame: false, blank: o.easel === 'blank' }, typeof o.easel === 'object' ? o.easel : {}));
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 1160, 260, 420, 'rgba(255,230,180,.18)'); g.restore(); };
  // ============ Amboise ============
  const ambL = () => layer('ml-amboise', g => { sky(g, '#a8d0f0', '#f4e8d0', 430); P.hills(g, 430, [[-PAD, 400], [300, 370], [700, 390], [1000, 360], [W + PAD, 380]], '#8ab070', '#6a9058', 2);
    sh(g, '#7ab0d8', 3, c => c.rect(-PAD, 430, W + PAD * 2, 40)); sh(g, '#d07a6a', 5, c => c.rect(600, 220, 420, 240)); for (let i = 0; i < 4; i++) for (let r = 0; r < 2; r++) sh(g, '#f2ece0', 3, c => c.rect(640 + i * 95, 260 + r * 90, 50, 64));
    sh(g, '#4a4a5a', 4, c => { c.moveTo(580, 222); c.lineTo(810, 120); c.lineTo(1040, 222); c.closePath(); }); sh(g, '#d07a6a', 4, c => c.rect(990, 160, 80, 300)); sh(g, '#4a4a5a', 4, c => { c.moveTo(980, 162); c.lineTo(1030, 90); c.lineTo(1080, 162); c.closePath(); });
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#7aa85a'], [1, '#a8c878']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470); P2.meadow && P2.meadow(g, 470, H, { seed: 3 }); });
  MS.amboise = (g, t) => { put(g, ambL(), 0, .25); P.tree(g, 160 + P.PAD, 560, t, 7, .9); };
  // ============ Fontainebleau bath suite ============
  const bathL = () => layer('ml-bath', g => { g.fillStyle = '#e8dcc4'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    for (let i = 0; i < 6; i++) { const x = -150 + i * 300; sh(g, '#d8c8a8', 4, c => { c.rect(x, 80, 60, 440); }); sh(g, '#f2e6cc', 4, c => { c.moveTo(x + 60, 520); c.lineTo(x + 60, 200); c.arc(x + 150, 200, 90, PI, TAU); c.lineTo(x + 240, 520); }); }
    g.fillStyle = '#c8a24a'; g.fillRect(-PAD, 60, W + PAD * 2, 24); ML.painting(g, 520, 120, 240, 160, 6, {});
    g.fillStyle = '#d8d0c0'; g.fillRect(-PAD, 520, W + PAD * 2, H - 520); for (let x = -PAD; x < W + PAD; x += 60) for (let y = 520; y < H; y += 40) { g.fillStyle = ((x / 60 + y / 40) % 2) ? '#c8b898' : '#e8dcc0'; g.fillRect(x, y, 58, 38); }
    sh(g, '#7ac0d8', 5, c => c.ellipse(640, 640, 420, 70, 0, 0, TAU)); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(560, 630, 200, 18, 0, 0, TAU); g.fill(); });
  MS.bath = (g, t, o = {}) => { put(g, bathL(), 0, .2); if (o.mona !== false) ML.mona(g, 640, 200, 150, Object.assign({}, o.mona || {}));
    for (let i = 0; i < 10; i++) { const k = (t * .12 + i / 10) % 1; g.fillStyle = `rgba(255,255,255,${.35 * Math.sin(k * PI)})`; g.beginPath(); g.ellipse(300 + i * 70 + Math.sin(t + i) * 30, 620 - k * 420, 80 + k * 80, 40 + k * 30, 0, 0, TAU); g.fill(); } };
  // ============ Versailles ============
  const versL = () => layer('ml-versailles', g => { g.fillStyle = '#f2e2b8'; g.fillRect(-PAD, 0, W + PAD * 2, H); g.fillStyle = '#c8a24a'; for (let x = -PAD; x < W + PAD; x += 160) { g.fillRect(x, 0, 16, 540); }
    for (let i = 0; i < 8; i++) { const x = -120 + i * 200; sh(g, '#c8a24a', 5, c => c.rect(x, 150, 120, 300)); g.fillStyle = grad(g, x, 150, x + 120, 450, [[0, '#d8e8f2'], [1, '#9ab8d0']]); g.fillRect(x + 10, 160, 100, 280); }
    for (let i = 0; i < 3; i++) { const x = 300 + i * 340; g.strokeStyle = '#c8a24a'; g.lineWidth = 4; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 60); g.stroke(); for (let k = 0; k < 8; k++) { g.fillStyle = 'rgba(255,240,200,.9)'; g.beginPath(); g.arc(x + Math.cos(k / 8 * TAU) * 50, 80 + Math.sin(k / 8 * TAU) * 14, 8, 0, TAU); g.fill(); } }
    parquet(g, 540, '#b88a56'); });
  MS.versailles = (g, t, o = {}) => { put(g, versL(), 0, .2); if (o.mona !== false) ML.mona(g, 640, 300, 140, o.mona || {}); };
  // ============ the Grande Galerie 1797 ============
  const galL = (empty) => layer(empty ? 'ml-gal-empty' : 'ml-gal', g => { g.fillStyle = '#5a3a2a'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    const VX = 640, VY = 300; g.fillStyle = '#f2ece0'; g.beginPath(); g.moveTo(-PAD, 0); g.lineTo(W + PAD, 0); g.lineTo(VX + 60, VY - 40); g.lineTo(VX - 60, VY - 40); g.closePath(); g.fill();
    for (let i = 0; i < 12; i++) { const k = Math.pow(i / 12, 1.4); g.fillStyle = 'rgba(200,210,220,.6)'; const y = lerp(0, VY - 40, k), w = lerp(700, 60, k); g.fillRect(VX - w / 2, y, w, lerp(30, 3, k)); }
    for (const sd of [-1, 1]) { g.fillStyle = '#7a3a2e'; g.beginPath(); g.moveTo(VX + sd * (W / 2 + PAD), 0); g.lineTo(VX + sd * 60, VY - 40); g.lineTo(VX + sd * 60, VY + 40); g.lineTo(VX + sd * (W / 2 + PAD), H); g.closePath(); g.fill();
      for (let i = 0; i < 9; i++) { const k = i / 9, k2 = (i + .7) / 9, x0 = lerp(VX + sd * 700, VX + sd * 70, Math.pow(k, .6)), x1 = lerp(VX + sd * 700, VX + sd * 70, Math.pow(k2, .6)), h0 = lerp(300, 30, Math.pow(k, .6)), h1 = lerp(300, 30, Math.pow(k2, .6));
        g.fillStyle = empty ? 'rgba(30,20,15,.7)' : ['#6a4a2a', '#3a4a5a', '#7a5a3a', '#4a3a2a'][i % 4]; g.beginPath(); g.moveTo(x0, VY - h0 * .9); g.lineTo(x1, VY - h1 * .9); g.lineTo(x1, VY + h1 * .3); g.lineTo(x0, VY + h0 * .3); g.closePath(); g.fill(); g.strokeStyle = '#c8a24a'; g.lineWidth = lerp(8, 1, k); g.stroke(); } }
    g.fillStyle = grad(g, 0, VY + 40, 0, H, [[0, '#8a6038'], [1, '#c8945a']]); g.beginPath(); g.moveTo(VX - 60, VY + 40); g.lineTo(VX + 60, VY + 40); g.lineTo(W + PAD, H); g.lineTo(-PAD, H); g.closePath(); g.fill();
    if (empty) for (let i = 0; i < 8; i++) { const k = i / 8, y = lerp(H - 40, VY + 70, Math.pow(k, .5)), s = lerp(1, .15, Math.pow(k, .5)); for (const sd of [-1, 1]) sh(g, '#a87a4a', 3, c => c.rect(VX + sd * lerp(380, 40, Math.pow(k, .5)) - 70 * s, y - 90 * s, 140 * s, 90 * s)); } });
  MS.gallery1797 = (g, t, o = {}) => { put(g, galL(false), 0, .15); if (o.mona !== false) ML.mona(g, o.mx ?? 300, o.my ?? 330, o.mh ?? 150, o.mona || {}); };
  MS.galleryEmpty = (g, t) => put(g, galL(true), 0, .15);
  // ============ the Tuileries bedroom ============
  const tuiL = () => layer('ml-tui', g => { g.fillStyle = '#2a3a5a'; g.fillRect(-PAD, 0, W + PAD * 2, H); g.fillStyle = 'rgba(200,170,90,.25)'; for (let x = -PAD; x < W + PAD; x += 90) for (let y = 30; y < 520; y += 90) { g.beginPath(); g.arc(x + ((y / 90) % 2) * 45, y, 8, 0, TAU); g.fill(); }
    sh(g, '#8a2a2e', 5, c => { c.moveTo(780, 60); c.lineTo(1220, 60); c.lineTo(1260, 180); c.lineTo(740, 180); c.closePath(); }); for (const x of [760, 1240]) sh(g, '#8a2a2e', 4, c => c.rect(x - 30, 170, 60, 420));
    sh(g, '#f2ece0', 5, c => c.roundRect(760, 430, 480, 150, 20)); sh(g, '#8a2a2e', 4, c => c.rect(760, 470, 480, 110)); sh(g, '#f6f2ea', 3, c => c.roundRect(790, 400, 140, 60, 20));
    sh(g, '#e8dcc0', 5, c => c.rect(150, 330, 380, 240)); sh(g, '#2a1a12', 4, c => c.rect(230, 420, 220, 150)); g.fillStyle = '#7a5a3a'; g.fillRect(-PAD, 580, W + PAD * 2, H - 580); });
  MS.tuileries = (g, t, o = {}) => { put(g, tuiL(), 0, .2); if (o.mona !== false) ML.mona(g, 340, 210, 170, o.mona || {}); for (const x of [180, 500]) { ln(g, [[x, 330], [x, 290]], 8, '#f2ece0'); P2.fire(g, x, 290, .18, t + x); }
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 340, 300, 380, 'rgba(255,190,110,.2)'); g.restore(); };
  // ============ 1911 Louvre: stairwell, street, Peruggia's room, Florence hotel, court ============
  const stairL = () => layer('ml-stair', g => { g.fillStyle = '#d8ccb8'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let i = 0; i < 12; i++) { const y = 700 - i * 50, x = 200 + i * 60; sh(g, '#c0b098', 3, c => c.rect(x, y, 900, 50)); }
    sh(g, '#8a7a6a', 4, c => c.rect(980, 80, 220, 380)); g.fillStyle = grad(g, 0, 90, 0, 450, [[0, '#f8f0d8'], [1, '#e8d8b0']]); g.fillRect(995, 95, 190, 350); ln(g, [[150, 720], [900, 120]], 10, '#5a4a3a'); });
  MS.stair = (g, t) => { put(g, stairL(), 0, .2); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 1090, 270, 420, 'rgba(255,240,200,.25)'); g.restore(); };
  const streetL = () => layer('ml-street', g => { sky(g, '#c8d8e8', '#f2e8d8', 430); for (let i = 0; i < 9; i++) { const x = -200 + i * 190, h = 220 + (i % 3) * 40; sh(g, ['#e8dcc4', '#d8ccb4', '#f0e4cc'][i % 3], 4, c => c.rect(x, 430 - h, 180, h)); sh(g, '#5a6a7a', 3, c => { c.moveTo(x - 6, 430 - h); c.lineTo(x + 90, 430 - h - 60); c.lineTo(x + 186, 430 - h); c.closePath(); }); for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) sh(g, '#3a4a5a', 2, c => c.rect(x + 20 + k * 54, 430 - h + 30 + r * 60, 30, 40)); }
    sh(g, '#8aa8c0', 3, c => c.rect(-PAD, 430, W + PAD * 2, 60)); g.fillStyle = '#c8bca8'; g.fillRect(-PAD, 490, W + PAD * 2, H - 490); for (let i = 0; i < 40; i++) { g.strokeStyle = 'rgba(90,80,70,.25)'; g.lineWidth = 2; g.strokeRect(-PAD + (i % 12) * 150 + (Math.floor(i / 12) % 2) * 75, 510 + Math.floor(i / 12) * 60, 140, 52); } });
  MS.street = (g, t) => put(g, streetL(), 0, .25);
  const roomL = () => layer('ml-room', g => { g.fillStyle = '#c8b898'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let x = -PAD; x < W + PAD; x += 50) { g.fillStyle = 'rgba(120,90,60,.12)'; g.fillRect(x, 0, 25, 560); }
    sh(g, '#6a5a4a', 5, c => c.rect(840, 110, 260, 260)); g.fillStyle = grad(g, 0, 120, 0, 360, [[0, '#a8b8c8'], [1, '#e8dcc8']]); g.fillRect(855, 125, 230, 230); g.fillStyle = '#6a7080'; for (let i = 0; i < 5; i++) g.fillRect(860 + i * 46, 260 - (i % 2) * 30, 40, 100); ln(g, [[970, 125], [970, 355]], 6, '#6a5a4a');
    g.fillStyle = '#8a6a4a'; g.fillRect(-PAD, 560, W + PAD * 2, H - 560); for (let i = 0; i < 16; i++) { g.fillStyle = 'rgba(40,25,10,.25)'; g.fillRect(-PAD + i * 110, 560, 4, 200); }
    for (const x of [60, 420]) ln(g, [[x, 600], [x, 420]], 8, '#3a3a40'); sh(g, '#f2ece0', 4, c => c.rect(60, 520, 360, 70)); sh(g, '#7a8aa0', 3, c => c.rect(60, 560, 360, 30)); ln(g, [[60, 440], [420, 440]], 6, '#3a3a40'); });
  MS.room = (g, t, o = {}) => { put(g, roomL(), 0, .2); if (o.trunk !== false) trunk(g, 640, 640, 1, o.open || 0, o.glow); if (o.cal) { sh(g, '#fff', 3, c => c.rect(520, 160, 150, 170)); g.fillStyle = '#c8281e'; g.fillRect(520, 160, 150, 44); g.font = G.DR.MK(28); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(o.calTop || '1911', 595, 192); g.font = G.DR.MK(70); g.fillStyle = '#15100c'; g.fillText(o.cal, 595, 290); } };
  function trunk(g, x, y, s, open = 0, glow) { g.save(); g.translate(x, y); g.scale(s, s); shadow(g, 0, 4, 190, .35); sh(g, '#6a4a2a', 5, c => c.roundRect(-170, -150, 340, 150, 10)); for (const xx of [-120, 0, 120]) sh(g, '#3a2a1a', 3, c => c.rect(xx - 10, -150, 20, 150)); sh(g, '#c8a24a', 3, c => c.rect(-20, -110, 40, 30));
    if (open > 0) { if (glow) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 0, -160, 220 * open, 'rgba(255,220,140,.6)'); g.restore(); } g.save(); g.translate(0, -150); g.scale(1, Math.cos(open * PI * .6)); sh(g, '#7a5a3a', 5, c => c.roundRect(-170, -90, 340, 90, 10)); g.restore(); }
    else sh(g, '#7a5a3a', 5, c => c.roundRect(-176, -190, 352, 50, 14)); g.restore(); }
  MS.trunk = trunk;
  const hotelL = () => layer('ml-hotel', g => { g.fillStyle = '#e0d0a8'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let x = -PAD; x < W + PAD; x += 80) for (let y = 0; y < 560; y += 80) { g.fillStyle = 'rgba(160,100,60,.15)'; g.beginPath(); g.arc(x + ((y / 80) % 2) * 40, y, 10, 0, TAU); g.fill(); }
    sh(g, '#5a4030', 5, c => c.rect(120, 140, 200, 300)); g.fillStyle = grad(g, 0, 150, 0, 430, [[0, '#f2c890'], [1, '#e8a868']]); g.fillRect(135, 155, 170, 270); g.fillStyle = '#c87a4a'; g.beginPath(); g.ellipse(220, 410, 50, 40, 0, PI, TAU); g.fill();
    g.fillStyle = '#9a6a3a'; g.fillRect(-PAD, 560, W + PAD * 2, H - 560); sh(g, '#f2ece0', 4, c => c.rect(900, 470, 380, 120)); sh(g, '#5a4030', 4, c => c.rect(880, 380, 30, 210)); });
  MS.hotel = (g, t) => put(g, hotelL(), 0, .2);
  const courtL = () => layer('ml-court', g => { g.fillStyle = '#8a6a4a'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let x = -PAD; x < W + PAD; x += 100) { g.fillStyle = 'rgba(40,25,10,.2)'; g.fillRect(x, 0, 8, 560); }
    sh(g, '#f2ece0', 4, c => c.rect(520, 200, 240, 100)); g.font = '700 34px serif'; g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText('LA LEGGE', 640, 245); g.font = '700 18px serif'; g.fillText('È UGUALE PER TUTTI', 640, 280);
    sh(g, '#5a3a22', 5, c => c.rect(300, 330, 680, 200)); sh(g, '#6a4a2a', 4, c => c.rect(280, 310, 720, 30)); g.fillStyle = '#7a5a3a'; g.fillRect(-PAD, 560, W + PAD * 2, H - 560); });
  MS.court = (g, t) => put(g, courtL(), 0, .2);
  // ============ wartime ============
  const chamL = () => layer('ml-chambord', g => { sky(g, '#3a3a6a', '#e8906a', 440); g.fillStyle = '#e8e0d0';
    sh(g, '#e8e0d0', 4, c => c.rect(260, 260, 760, 200)); for (let i = 0; i < 4; i++) { const x = 260 + i * 250; sh(g, '#e8e0d0', 4, c => c.rect(x - 50, 200, 100, 260)); sh(g, '#4a4a5a', 4, c => { c.moveTo(x - 60, 202); c.lineTo(x, 110); c.lineTo(x + 60, 202); c.closePath(); }); }
    for (let i = 0; i < 9; i++) { const x = 340 + i * 75; sh(g, '#4a4a5a', 3, c => { c.moveTo(x - 14, 262); c.lineTo(x, 200 - (i % 3) * 30); c.lineTo(x + 14, 262); c.closePath(); }); sh(g, '#e8e0d0', 3, c => c.rect(x - 6, 220 - (i % 3) * 30, 12, 42)); }
    for (let r = 0; r < 2; r++) for (let i = 0; i < 10; i++) sh(g, '#3a3a50', 2, c => c.rect(300 + i * 70, 300 + r * 70, 34, 46));
    g.fillStyle = grad(g, 0, 460, 0, H, [[0, '#4a6a3a'], [1, '#6a8a4a']]); g.fillRect(-PAD, 460, W + PAD * 2, H - 460); });
  MS.chambord = (g, t) => put(g, chamL(), 0, .25);
  const abbeyL = () => layer('ml-abbey', g => { sky(g, '#8aa0b8', '#dce4ea', 460); P.hills(g, 460, [[-PAD, 420], [400, 380], [900, 410], [W + PAD, 390]], '#7a9a6a', '#5a7a4a', 2); sh(g, '#cfc4b0', 5, c => c.rect(380, 240, 520, 220)); sh(g, '#7a6a5a', 4, c => { c.moveTo(360, 242); c.lineTo(640, 150); c.lineTo(920, 242); c.closePath(); });
    sh(g, '#cfc4b0', 4, c => c.rect(820, 120, 90, 340)); sh(g, '#7a6a5a', 4, c => { c.moveTo(810, 122); c.lineTo(865, 60); c.lineTo(920, 122); c.closePath(); }); for (let i = 0; i < 5; i++) sh(g, '#3a3a44', 3, c => { c.rect(420 + i * 80, 320, 34, 70); c.arc(437 + i * 80, 320, 17, PI, TAU); });
    g.fillStyle = grad(g, 0, 460, 0, H, [[0, '#6a8a4a'], [1, '#8aa86a']]); g.fillRect(-PAD, 460, W + PAD * 2, H - 460); });
  MS.abbey = (g, t) => put(g, abbeyL(), 0, .25);
  const montL = () => layer('ml-montauban', g => { sky(g, '#9ac0e0', '#f2e2c8', 460); sh(g, '#c8704a', 5, c => c.rect(200, 220, 880, 240)); for (let i = 0; i < 9; i++) sh(g, '#e8d8c0', 3, c => { c.rect(240 + i * 92, 300, 40, 80); c.arc(260 + i * 92, 300, 20, PI, TAU); });
    sh(g, '#9a4a32', 4, c => { c.moveTo(180, 222); c.lineTo(1100, 222); c.lineTo(1060, 180); c.lineTo(220, 180); c.closePath(); }); sh(g, '#8ab0d8', 3, c => c.rect(-PAD, 460, W + PAD * 2, 50)); g.fillStyle = '#c8b090'; g.fillRect(-PAD, 510, W + PAD * 2, H - 510); });
  MS.montauban = (g, t) => put(g, montL(), 0, .25);
  const farmL = () => layer('ml-farm', g => { sky(g, '#2a3a5a', '#6a7a9a', 470); P.hills(g, 470, [[-PAD, 440], [500, 400], [W + PAD, 430]], '#3a4a3a', '#2a3a2a', 2); sh(g, '#8a7a6a', 4, c => c.rect(700, 300, 360, 170)); sh(g, '#5a4a3a', 4, c => { c.moveTo(680, 302); c.lineTo(880, 220); c.lineTo(1080, 302); c.closePath(); }); sh(g, '#f2c870', 2, c => c.rect(780, 360, 40, 50));
    g.fillStyle = '#2a3a2a'; g.fillRect(-PAD, 470, W + PAD * 2, H - 470); });
  MS.farm = (g, t) => put(g, farmL(), 0, .25);
  // ============ 1963 ============
  const linerL = (v) => layer('ml-liner-' + v, g => { sky(g, v === 'harbor' ? '#c8d4e4' : '#7a98c0', v === 'harbor' ? '#f2e8d8' : '#c8d4e0', 430);
    if (v === 'harbor') { for (let i = 0; i < 16; i++) { const x = 600 + i * 50, h = 80 + ((i * 37) % 7) * 30; sh(g, ['#8a96a8', '#a8b0c0', '#7a8698'][i % 3], 2, c => c.rect(x, 430 - h, 46, h)); } sh(g, '#8a9a8a', 3, c => c.rect(180, 330, 14, 100)); sh(g, '#7aa898', 3, c => { c.moveTo(170, 330); c.lineTo(187, 250); c.lineTo(204, 330); c.closePath(); }); }
    g.fillStyle = grad(g, 0, 430, 0, H, [[0, '#4a6a8a'], [1, '#2a4a6a']]); g.fillRect(-PAD, 430, W + PAD * 2, H - 430); });
  MS.liner = (g, t, o = {}) => { put(g, linerL(o.v || 'sea'), 0, .25); const x = o.x ?? 640, y = 520; g.save(); g.translate(x, y + Math.sin(t * 1.2) * 4); g.scale(o.s || 1, o.s || 1);
    sh(g, '#15161c', 5, c => { c.moveTo(-480, -40); c.lineTo(440, -40); c.quadraticCurveTo(520, -40, 500, 10); c.lineTo(-440, 40); c.quadraticCurveTo(-470, 0, -480, -40); c.closePath(); }); sh(g, '#c8281e', 3, c => c.rect(-440, 30, 900, 12));
    sh(g, '#f6f4ee', 4, c => c.rect(-380, -100, 700, 62)); sh(g, '#f6f4ee', 4, c => c.rect(-250, -150, 440, 52)); for (let i = 0; i < 30; i++) { g.fillStyle = '#3a4a5a'; g.fillRect(-370 + i * 23, -86, 12, 12); }
    for (const fx of [-90, 80]) { sh(g, '#c8281e', 4, c => c.roundRect(fx - 26, -240, 52, 92, 8)); sh(g, '#15161c', 3, c => c.rect(fx - 26, -240, 52, 20)); for (let s = 0; s < 3; s++) { const k = (t * .4 + s / 3) % 1; g.fillStyle = `rgba(240,240,240,${.6 * (1 - k)})`; g.beginPath(); g.arc(fx - k * 160, -250 - k * 70, 24 + k * 30, 0, TAU); g.fill(); } }
    g.font = G.DR.MK(26); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('FRANCE', -300, -6); g.restore();
    for (let i = 0; i < 8; i++) { g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 3; const xx = (x + 500 - ((t * 120 + i * 90) % 1100)); g.beginPath(); g.moveTo(xx, 562 + (i % 3) * 14); g.lineTo(xx + 60, 560 + (i % 3) * 14); g.stroke(); } };
  const ngaL = () => layer('ml-nga', g => { g.fillStyle = '#e8e0d0'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let i = 0; i < 7; i++) { const x = -100 + i * 230; sh(g, '#d8ccb8', 4, c => c.rect(x, 60, 70, 500)); sh(g, '#c8bca8', 3, c => c.rect(x - 14, 40, 98, 30)); sh(g, '#c8bca8', 3, c => c.rect(x - 14, 540, 98, 24)); }
    sh(g, '#7a1e22', 5, c => c.rect(420, 140, 440, 400)); g.fillStyle = '#8a7a6a'; g.fillRect(-PAD, 560, W + PAD * 2, H - 560); for (let i = 0; i < 12; i++) { g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(-PAD + i * 150, 560, 70, 200); }
    ln(g, [[300, 600], [980, 600]], 8, '#c8a24a'); for (const x of [300, 980]) ln(g, [[x, 560], [x, 620]], 10, '#c8a24a'); });
  MS.nga = (g, t, o = {}) => { put(g, ngaL(), 0, .2); ML.mona(g, 640, 330, 200, Object.assign({ glass: true }, o.mona || {})); };
  const queueL = () => layer('ml-queue', g => { sky(g, '#a8b8c8', '#e8ecf0', 400); sh(g, '#e8e0d0', 4, c => c.rect(360, 140, 560, 260)); for (let i = 0; i < 8; i++) sh(g, '#f2ece0', 3, c => c.rect(380 + i * 70, 200, 30, 200)); sh(g, '#e8e0d0', 4, c => { c.moveTo(340, 142); c.lineTo(640, 70); c.lineTo(940, 142); c.closePath(); });
    sh(g, '#d8ccb8', 3, c => c.rect(320, 400, 640, 40)); g.fillStyle = '#f2f4f6'; g.fillRect(-PAD, 440, W + PAD * 2, H - 440); g.fillStyle = '#c8ccd2'; g.fillRect(-PAD, 520, W + PAD * 2, 70); });
  MS.queue = (g, t) => { put(g, queueL(), 0, .2); };
  const tokL = () => layer('ml-tokyo', g => { sky(g, '#a8d0f0', '#f4ead8', 400); sh(g, '#d8ccb8', 4, c => c.rect(260, 220, 760, 180)); sh(g, '#4a5a5a', 5, c => { c.moveTo(220, 224); c.lineTo(400, 140); c.lineTo(880, 140); c.lineTo(1060, 224); c.closePath(); });
    for (let i = 0; i < 9; i++) sh(g, '#6a5a4a', 3, c => c.rect(300 + i * 80, 260, 40, 100)); for (let i = 0; i < 5; i++) { g.fillStyle = '#f4c8d8'; g.beginPath(); g.arc(80 + i * 60, 300, 60, 0, TAU); g.fill(); g.beginPath(); g.arc(1120 + i * 50, 290, 56, 0, TAU); g.fill(); }
    g.fillStyle = '#c8bca8'; g.fillRect(-PAD, 400, W + PAD * 2, H - 400); });
  MS.tokyo = (g, t) => put(g, tokL(), 0, .2);
  // ============ today: Apollo gallery, the pyramid, the new room ============
  const apoL = () => layer('ml-apollo', g => { g.fillStyle = '#3a2a1a'; g.fillRect(-PAD, 0, W + PAD * 2, H); g.fillStyle = '#c8a24a'; g.beginPath(); g.moveTo(-PAD, 0); g.lineTo(W + PAD, 0); g.lineTo(820, 260); g.lineTo(460, 260); g.closePath(); g.fill();
    for (let i = 0; i < 6; i++) { const k = i / 6; g.fillStyle = ['#7a5a9a', '#5a7aa8', '#9a5a4a'][i % 3]; const y = lerp(10, 220, k), w = lerp(900, 340, k); g.fillRect(640 - w / 2 + 40, y, w - 80, lerp(30, 10, k)); }
    for (const sd of [-1, 1]) { g.fillStyle = '#5a3a22'; g.beginPath(); g.moveTo(640 + sd * (W / 2 + PAD), 0); g.lineTo(640 + sd * 180, 260); g.lineTo(640 + sd * 180, 420); g.lineTo(640 + sd * (W / 2 + PAD), H); g.closePath(); g.fill(); for (let i = 0; i < 5; i++) { const x = 640 + sd * lerp(800, 220, i / 5); g.fillStyle = '#c8a24a'; g.fillRect(x - 8, lerp(0, 250, i / 5), 16, lerp(720, 180, i / 5)); } }
    g.fillStyle = grad(g, 0, 420, 0, H, [[0, '#6a4a2a'], [1, '#a87a4a']]); g.beginPath(); g.moveTo(460, 420); g.lineTo(820, 420); g.lineTo(W + PAD, H); g.lineTo(-PAD, H); g.closePath(); g.fill();
    for (const [x, y, s] of [[640, 520, 1], [380, 600, .9], [900, 600, .9]]) { sh(g, '#2a2a30', 4, c => c.rect(x - 60 * s, y - 30 * s, 120 * s, 90 * s)); g.fillStyle = 'rgba(200,230,255,.3)'; g.fillRect(x - 60 * s, y - 120 * s, 120 * s, 90 * s); g.strokeStyle = 'rgba(200,230,255,.7)'; g.lineWidth = 3; g.strokeRect(x - 60 * s, y - 120 * s, 120 * s, 90 * s); } });
  MS.apollo = (g, t) => put(g, apoL(), 0, .2);
  const pyrL = () => layer('ml-pyramid', g => { sky(g, '#8ab8e0', '#f2e8d8', 440); sh(g, '#e8dcc4', 4, c => c.rect(-PAD, 180, W + PAD * 2, 260)); for (let i = 0; i < 20; i++) sh(g, '#6a7a8a', 2, c => c.rect(-PAD + 20 + i * 90, 240, 34, 60)); for (let i = 0; i < 20; i++) sh(g, '#6a7a8a', 2, c => c.rect(-PAD + 20 + i * 90, 330, 34, 60)); sh(g, '#5a6a7a', 4, c => c.rect(-PAD, 160, W + PAD * 2, 24));
    sh(g, 'rgba(160,200,230,.8)', 5, c => { c.moveTo(380, 500); c.lineTo(640, 250); c.lineTo(900, 500); c.closePath(); }); g.strokeStyle = 'rgba(80,100,120,.5)'; g.lineWidth = 2; for (let i = 1; i < 10; i++) { g.beginPath(); g.moveTo(380 + i * 26, 500); g.lineTo(640, 250); g.stroke(); g.beginPath(); g.moveTo(640 - (250 * i / 10) * 1.04, 250 + 250 * i / 10); g.lineTo(640 + (250 * i / 10) * 1.04, 250 + 250 * i / 10); g.stroke(); }
    g.fillStyle = '#d8ccb8'; g.fillRect(-PAD, 500, W + PAD * 2, H - 500); });
  MS.pyramid = (g, t) => put(g, pyrL(), 0, .2);
  const newL = () => layer('ml-newroom', g => { g.fillStyle = '#1e2026'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let i = 0; i < 8; i++) { g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 30; g.beginPath(); g.arc(640, 700, 300 + i * 90, PI, TAU); g.stroke(); }
    g.fillStyle = '#2a2e36'; g.fillRect(-PAD, 560, W + PAD * 2, H - 560); g.fillStyle = 'rgba(255,255,255,.06)'; g.beginPath(); g.ellipse(640, 600, 520, 60, 0, 0, TAU); g.fill(); });
  MS.newRoom = (g, t, o = {}) => { put(g, newL(), 0, .2); ML.mona(g, 640, 320, 230, Object.assign({ glass: true }, o.mona || {})); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 320, 420, 'rgba(255,230,190,.25)'); g.restore(); };
})(window);
