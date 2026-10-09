/* "The War That Put $4.36 Gas in Your Tank" — part 3: CH. 3 "IF THEY RISE, THEY RISE", CH. 4 WHY TEXAS DIDN'T SAVE US (voice: assets/audio/gas-3.mp3).
 * Times are the narration's word times (pocketsphinx transcript). */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const drift = (lt, dur, z0 = 1, z1 = 1.05) => lerp(z0, z1, inout(clamp(lt / dur)));
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const YOU = Object.assign({}, Pr.YOU, { body: P.blue });   // the recurring driver for this video

  // ---------- shared gas-station set ----------
  function car(ctx, x, y, s, col = P.red) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-170, -30); c.lineTo(-160, -80); c.lineTo(-90, -86); c.lineTo(-50, -140); c.lineTo(80, -140); c.lineTo(130, -86); c.lineTo(175, -78); c.lineTo(180, -30); c.closePath(); }, col, 5);
    sh(ctx, c => { c.moveTo(-36, -128); c.lineTo(10, -128); c.lineTo(10, -88); c.lineTo(-70, -88); c.closePath(); }, '#bfe6ff', 4); sh(ctx, c => { c.moveTo(24, -128); c.lineTo(72, -128); c.lineTo(110, -88); c.lineTo(24, -88); c.closePath(); }, '#bfe6ff', 4);
    sh(ctx, c => c.rect(130, -70, 20, 16), '#2b2b2b', 3);                                // fuel door (open)
    for (const wx of [-100, 110]) { sh(ctx, c => c.arc(wx, -26, 32, 0, 7), INK, 0); sh(ctx, c => c.arc(wx, -26, 14, 0, 7), '#c9ced6', 3); }
    ctx.restore(); }
  function pump(ctx, x, y, s, price) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.roundRect(-50, -220, 100, 220, 10), '#f4f4f4', 5); sh(ctx, c => c.rect(-50, -220, 100, 36), P.red, 5);
    sh(ctx, c => c.roundRect(-36, -170, 72, 44, 6), '#1f2630', 4); txt(ctx, price || '$•.••', 0, -147, PRINT(20), '#7dffb0');
    sh(ctx, c => c.roundRect(-30, -110, 60, 40, 6), '#e9edf1', 3); ctx.restore(); }
  function canopy(ctx) { sh(ctx, c => c.rect(120, 90, 1100, 70), '#fff', 5); sh(ctx, c => c.rect(120, 140, 1100, 20), P.red, 0); Tn.line(ctx, [[120, 160], [1220, 160]], 5, INK); for (const px of [330, 1010]) sh(ctx, c => c.rect(px - 16, 160, 32, 440), '#dfe3e8', 5); }
  function priceBoard(ctx, x, y, s, price, o = {}) { // the AAA national-average sign on a pole
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.rect(-14, 0, 28, 300), '#8a8f99', 5);
    sh(ctx, c => c.roundRect(-170, -330, 340, 330, 20), '#1f3d7a', 6);
    if (IMG.aaa) { ctx.save(); ctx.beginPath(); ctx.roundRect(-150, -312, 90, 90, 14); ctx.clip(); ctx.drawImage(IMG.aaa, -150, -312, 90, 90); ctx.restore(); }
    txt(ctx, 'NATIONAL', 40, -288, PRINT(26), '#fff'); txt(ctx, 'AVERAGE', 40, -256, PRINT(26), '#fff');
    sh(ctx, c => c.roundRect(-150, -205, 300, 130, 14), '#111418', 4);
    ctx.save(); ctx.shadowColor = o.glow || '#ffd166'; ctx.shadowBlur = 18; txt(ctx, price, 0, -140, HAND(700, 104), o.glow || '#ffd166'); ctx.restore();
    txt(ctx, o.date || '', 0, -40, PRINT(28), '#fff');
    ctx.restore(); }
  function stationScene(ctx, lt, t, o = {}) {
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, o.night ? [[0, '#3a4a7a'], [1, '#8a7aa8']] : [[0, '#ffc98a'], [1, '#ffe9c4']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    ctx.fillStyle = '#8c929c'; ctx.fillRect(-100, 600, W + 200, 220); Tn.line(ctx, [[-100, 600], [W + 100, 600]], 4, INK);
    canopy(ctx); pump(ctx, 540, 600, 1, o.pumpPrice); pump(ctx, 820, 600, 1, o.pumpPrice);
    car(ctx, 700, 690, 1.0, P.red);
  }

  // ---------- shared props for this video ----------
  const TRUMP = { skin: '#f2c19a', hair: 'side', hairColor: '#e6c27a', body: '#1f2a44', top: 'suit', tie: '#3b6fbf' };
  // the Persian Gulf, schematic (north coast = Iran, south coast = Arabian Peninsula), strait near (930, 395)
  const GULF = [[230, 120], [380, 150], [540, 215], [700, 290], [840, 330], [915, 352], [985, 382], [1110, 430], [1300, 470], [1300, 760], [1120, 650], [1010, 530], [950, 440], [930, 418], [900, 466], [800, 470], [700, 452], [640, 456], [628, 392], [606, 386], [592, 430], [520, 420], [430, 330], [330, 250], [260, 200]];
  function gulfMap(ctx, o = {}) {
    ctx.fillStyle = '#e8d9b5'; ctx.fillRect(-200, -200, W + 400, H + 400);
    sh(ctx, c => { GULF.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); }, '#7fc4f0', 5);
    if (o.labels !== false) { txt(ctx, 'IRAN', 700, 170, HAND(700, 56), '#8a6a3a'); txt(ctx, 'SAUDI ARABIA', 360, 560, HAND(700, 44), '#8a6a3a'); txt(ctx, 'IRAQ', 150, 90, PRINT(26), '#8a6a3a'); txt(ctx, 'KUWAIT', 230, 250, PRINT(22), '#8a6a3a');
      txt(ctx, 'QATAR', 610, 470, PRINT(20), '#8a6a3a'); txt(ctx, 'U.A.E.', 780, 540, PRINT(24), '#8a6a3a'); txt(ctx, 'OMAN', 1130, 600, PRINT(28), '#8a6a3a'); }
  }
  function tanker(ctx, x, y, s, rot = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-80, -14); c.lineTo(70, -14); c.lineTo(90, 0); c.lineTo(70, 14); c.lineTo(-80, 14); c.closePath(); }, o.hull || '#b23a2e', 4);
    sh(ctx, c => c.rect(-76, -10, 120, 20), '#7a8088', 0); sh(ctx, c => c.rect(-80, -16, 26, 32), '#fff', 3); ctx.restore(); }
  // US tile-grid map: [state, col, row]
  const TILES = [['AK',0,0],['ME',10,0],['VT',9,1],['NH',10,1],['WA',0,2],['ID',1,2],['MT',2,2],['ND',3,2],['MN',4,2],['IL',5,2],['WI',6,2],['MI',7,2],['NY',8,2],['RI',9,2],['MA',10,2],
    ['OR',0,3],['NV',1,3],['WY',2,3],['SD',3,3],['IA',4,3],['IN',5,3],['OH',6,3],['PA',7,3],['NJ',8,3],['CT',9,3],['CA',0,4],['UT',1,4],['CO',2,4],['NE',3,4],['MO',4,4],['KY',5,4],['WV',6,4],['VA',7,4],['MD',8,4],['DE',9,4],
    ['AZ',1,5],['NM',2,5],['KS',3,5],['AR',4,5],['TN',5,5],['NC',6,5],['SC',7,5],['OK',3,6],['LA',4,6],['MS',5,6],['AL',6,6],['GA',7,6],['HI',0,7],['TX',3,7],['FL',8,7]];
  function tileMap(ctx, x0, y0, sz, k) { TILES.forEach(([st, c, r], i) => { const v = clamp(k * 1.4 - (c / 11) * .4 - ((i * 37) % 10) / 40); const x = x0 + c * sz, y = y0 + r * sz;
    sh(ctx, cc => cc.roundRect(x, y, sz - 6, sz - 6, 8), v > .5 ? P.red : '#dfe3e8', 3); txt(ctx, st, x + (sz - 6) / 2, y + (sz - 6) / 2, PRINT(18), v > .5 ? '#fff' : '#6a7380'); }); }
  function gasSign(ctx, x, y, s, price, o = {}) { priceBoard(ctx, x, y, s, price, o); }
  function rocket(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sh(ctx, c => { c.moveTo(0, -80); c.quadraticCurveTo(34, -40, 30, 40); c.lineTo(-30, 40); c.quadraticCurveTo(-34, -40, 0, -80); c.closePath(); }, '#fff', 5); sh(ctx, c => c.arc(0, -20, 12, 0, 7), '#9ad1ff', 3);
    for (const sx of [-1, 1]) sh(ctx, c => { c.moveTo(sx * 28, 10); c.lineTo(sx * 50, 50); c.lineTo(sx * 28, 40); c.closePath(); }, P.red, 4); sh(ctx, c => { c.moveTo(-16, 42); c.lineTo(0, 80 + Math.random() * 6); c.lineTo(16, 42); c.closePath(); }, P.orange, 0); ctx.restore(); }
  function feather(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sh(ctx, c => { c.moveTo(0, -70); c.quadraticCurveTo(40, -10, 0, 70); c.quadraticCurveTo(-40, -10, 0, -70); }, '#fff', 4); Tn.line(ctx, [[0, -70], [0, 90]], 3, INK); ctx.restore(); }

  const LANCE = { skin: '#f0c4a0', hair: 'bald', hairColor: '#b9a68f', body: '#23262e', top: 'suit', tie: '#5a5f6a' };
  const COP = [245, 190, 185, 85], JPM = [135, 160, 470, 95];
  function chapterTab(ctx, num, title, lt, dur = 4.5) {
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190, x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, 'CHAPTER ' + num, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  function quoteCard(ctx, x, y, w, lines, lt, o = {}) { popAt(ctx, x, y, lt, () => { const h = lines.length * (o.lh || 50) + 50; K.card(ctx, x - w / 2, y - h / 2, w, h, o.fill || '#fff', 22); lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 46 + i * (o.lh || 50), HAND(700, o.size || 40), (o.red || []).includes(i) ? P.red : INK)); }); }
  function wallet(ctx, x, y, s, open) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-90, -60, 180, 120, 14), '#8a5a36', 5); if (open) { sh(ctx, c => c.roundRect(-80, -100, 160, 50, 10), '#a8703f', 5); } ctx.restore(); }
  function rig(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); Tn.line(ctx, [[-60, 0], [0, -300], [60, 0]], 7, '#6b6f78'); for (let i = 1; i < 6; i++) { const yy = -i * 50, w = 60 * (1 - i / 6); Tn.line(ctx, [[-w, yy], [w, yy]], 4, '#6b6f78'); Tn.line(ctx, [[-w, yy], [w * (1 - 1 / 6) * 1.0, yy - 50]], 3, '#9aa0a8'); } sh(ctx, c => c.rect(-90, -10, 180, 20), '#8a8f99', 4); ctx.restore(); }

  // ================= CHAPTER 3 =================
  function e1(ctx, lt, dur, t) { // now the shock hit your wallet
    const T0 = 0, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    bean(ctx, 420, 700, 1.1, t, Object.assign({}, YOU, { armR: [1.0, 1.2], face: { mouth: 'frown', brows: 'worried', look: [.7, .5] } }));
    wallet(ctx, 600, 470, 1.1, at(.97) > 0);
    if (at(.97) > 0) for (let i = 0; i < 3; i++) { const k = ((t * .6 + i * .33) % 1); ctx.save(); ctx.globalAlpha = 1 - k; ctx.translate(600 + Math.sin(k * 6 + i) * 40, 380 - k * 160); sh(ctx, c => { c.moveTo(0, 0); c.quadraticCurveTo(-18, -12, -26, 0); c.quadraticCurveTo(-18, 12, 0, 0); c.quadraticCurveTo(18, -12, 26, 0); c.quadraticCurveTo(18, 12, 0, 0); }, '#d9d0c0', 2); ctx.restore(); }
    pump(ctx, 900, 690, 1.2, '$$$');
    chapterTab(ctx, 3, '"If they rise, they rise"', lt, 2.08);
  }
  function e2(ctx, lt, dur, t) { // on March 5, five days into the war, gas averaged $3.25 — that's when Reuters asked the President
    const T0 = 2.08, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#8c929c'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    priceBoard(ctx, 300, 600, .9, at(5.4) > 0 ? '$3.25' : '$•.••', { date: 'Mar 5, 2026' });
    popAt(ctx, 300, 90, at(2.56), () => { K.card(ctx, 160, 54, 280, 72, P.yellow, 16); txt(ctx, 'day 5 of the war', 300, 90, HAND(700, 34)); });
    if (at(7.47) > 0) { const rep = bean(ctx, 820, 700, .9, t, Object.assign(Pr.extra(2), { armR: [2.0, .3], face: { mouth: 'o', brows: 'up', look: [.8, -.2] } })); const mx = rep.hands.R[0] + 40, my = rep.hands.R[1] - 30; Tn.line(ctx, [[rep.hands.R[0], rep.hands.R[1]], [mx, my]], 8, INK); sh(ctx, c => c.ellipse(mx + 8, my - 10, 18, 24, .6, 0, 7), '#3a3e46', 4); if (IMG.reuters) { K.card(ctx, mx - 70, my + 6, 120, 40, '#fff', 6); ctx.drawImage(IMG.reuters, mx - 64, my + 10, 108, 31); } K.bubble(ctx, 'Mr. President, gas prices?', 900, 230, 380, [880, 330], at(7.88), { size: 32 }); }
    K.source(ctx, 'Source: Reuters (Mar 5, 2026)', at(5));
  }
  function e3(ctx, lt, dur, t) { // here's his full answer, in context, because context matters
    const T0 = 9.89, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#e6dcff', '#f7f3ff');
    host(ctx, 300, 700, 1.1, t, [[T0, 'present'], [12.27, 'pointUp']], { mouth: 'flat', brows: 'up', look: [.6, 0] });
    K.doc(ctx, 860, 360, 460, 420, 'The full answer', ['—', '—', '—', '—', '—'], at(10.23), { titleSize: 40 });
    if (at(11.3) > 0) { const mx = lerp(1100, 860, out(clamp(at(11.3) / .8))); sh(ctx, c => c.arc(mx, 380, 90, 0, 7), 'rgba(191,230,255,.35)', 9); Tn.line(ctx, [[mx + 64, 444], [mx + 140, 540]], 18, '#8a5a36'); }
    K.stamp(ctx, 'IN CONTEXT', 860, 600, at(12.53), { color: P.blue, size: 48, rot: -.06 });
  }
  function e4(ctx, lt, dur, t) { // no "concern"; prices would "drop very rapidly"; "If they rise, they rise"; "far more important than… a little bit"
    const T0 = 14.63, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#cfdcf0', '#f2f6fc');
    bean(ctx, 230, 700, 1.05, t, Object.assign({}, TRUMP, { armR: [1.6, .5], face: { mouth: Math.sin(t * 7) > 0 ? 'o' : 'smile', brows: 'calm', look: [.6, 0] } }));
    K.nameCard(ctx, 'President Trump', 'to Reuters, Mar 5', 230, 110, at(14.75));
    const Q = [[15.4, 'no "concern about it"'], [17.9, 'prices will "drop very rapidly when this is over"'], [21.3, '"If they rise, they rise."'], [25.03, 'the operation is "far more important than having gasoline prices go up a little bit"']];
    Q.forEach(([s, l], i) => { const k = at(s); if (k <= 0) return; const y = 130 + i * 140; popAt(ctx, 790, y, k, () => { const lines = K.wrap(ctx, l, HAND(700, 30), 600); K.card(ctx, 460, y - 56, 660, 112, i === 2 ? P.yellow : '#fff', 18); lines.forEach((ln, j) => txt(ctx, ln, 790, y - (lines.length - 1) * 18 + j * 36, HAND(700, 30))); }); });
    if (at(27.62) > 0) K.scribbleCircle(ctx, 950, 570, 140, 30, clamp(at(27.62) / .5), P.red, 5);
    K.source(ctx, 'Source: Reuters (Mar 5, 2026)', at(15));
  }
  function e5(ctx, lt, dur, t) { // a defensible position if you believe the war was necessary; presidents make tradeoffs — but "a little bit" didn't hold up
    const T0 = 29.03, at = s => lt - (s - T0), crack = at(34.37) > 0;
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 300, 700, 1.1, t, [[T0, 'presentBoth'], [32.45, 'shrug'], [33.93, 'pointSide']], { mouth: 'flat', brows: crack ? 'skeptic' : 'up', look: [.6, 0] });
    const tilt = Math.sin(t * 1.2) * .08 + (crack ? .1 : 0); Tn.line(ctx, [[860, 260], [860, 520]], 10, '#8a6a3a'); sh(ctx, c => c.rect(780, 510, 160, 24), '#8a6a3a', 4);
    ctx.save(); ctx.translate(860, 260); ctx.rotate(tilt); Tn.line(ctx, [[-200, 0], [200, 0]], 8, '#8a6a3a');
    [[-200, 'war goals'], [200, 'gas prices']].forEach(([sx, l]) => { Tn.line(ctx, [[sx, 0], [sx - 50, 110]], 3, INK); Tn.line(ctx, [[sx, 0], [sx + 50, 110]], 3, INK); ctx.save(); ctx.translate(sx, 110); ctx.rotate(-tilt); sh(ctx, c => c.ellipse(0, 0, 70, 16, 0, 0, 7), '#e0b84e', 4); txt(ctx, l, 0, -30, PRINT(22)); ctx.restore(); }); ctx.restore();
    popAt(ctx, 860, 100, at(33.17), () => { K.card(ctx, 700, 62, 320, 76, '#fff', 16); txt(ctx, 'presidents make tradeoffs', 860, 100, HAND(700, 30)); });
    if (crack) { popAt(ctx, 1060, 600, at(34.37), () => { K.card(ctx, 920, 566, 280, 68, P.yellow, 14); txt(ctx, '"a little bit"', 1060, 600, HAND(700, 36)); }); if (at(35.16) > 0) { Tn.line(ctx, [[930, 572], [990, 600], [960, 620], [1020, 640]], 4, P.red); K.stamp(ctx, "DIDN'T HOLD UP", 1060, 520, at(35.16), { color: P.red, size: 36, rot: -.08 }); } }
  }
  function e6(ctx, lt, dur, t) { // Mar 26: $3.98, up a full dollar in a month; early May: $4.45, up 35 cents in a single week
    const T0 = 36.37, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f6efe4');
    // a staircase of price boards
    const steps = [[200, 520, '$2.98', 'Feb 26', 0], [520, 400, '$3.98', 'Mar 26', 38.72], [840, 280, '$4.45', 'early May', 43.34]];
    steps.forEach(([x, y, p, d, s], i) => { sh(ctx, c => c.rect(x - 140, y, 280, 720 - y), i ? '#e0d2b8' : '#d9cdb5', 5); if (at(s) > 0 || !i) popAt(ctx, x, y + 70, i ? at(s) : 1, () => { K.card(ctx, x - 110, y + 20, 220, 100, '#111418', 14, 0); txt(ctx, p, x, y + 60, HAND(700, 52), i ? '#ff6b5e' : '#ffd166'); txt(ctx, d, x, y + 100, PRINT(20), '#fff'); }); });
    if (at(40.19) > 0) popAt(ctx, 520, 560, at(40.19), () => { K.card(ctx, 400, 530, 240, 60, P.red, 12); txt(ctx, '+$1 in a month', 520, 560, HAND(700, 30), '#fff'); });
    if (at(44.79) > 0) popAt(ctx, 840, 480, at(44.79), () => { K.card(ctx, 710, 450, 260, 60, P.red, 12); txt(ctx, '+35¢ in a week', 840, 480, HAND(700, 30), '#fff'); });
    const step = at(43.34) > 0 ? 2 : at(38.72) > 0 ? 1 : 0, xs = [200, 520, 840], ys = [520, 400, 280];
    bean(ctx, xs[step], ys[step], .55, t, Object.assign({}, YOU, { face: { mouth: 'frown', brows: 'worried', look: [.6, -.3] } }));
    K.source(ctx, 'Sources: AAA (Mar 26, 2026); NPR (May 3, 2026)', at(38));
  }
  function e7(ctx, lt, dur, t) { // May 21, ahead of Memorial Day: $4.56 — every state above $4
    const T0 = 47.14, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f6efe4');
    priceBoard(ctx, 210, 640, .8, '$4.56', { date: 'May 21, 2026', glow: '#ff6b5e' });
    tileMap(ctx, 470, 150, 64, 1);
    popAt(ctx, 820, 90, at(48.62), () => { K.card(ctx, 600, 52, 440, 76, P.yellow, 16); txt(ctx, 'ahead of Memorial Day', 820, 90, HAND(700, 36)); });
    if (at(51.79) > 0) K.stamp(ctx, 'ALL 50 > $4', 220, 200, at(51.79), { color: P.red, size: 42, rot: -.05 });
    K.source(ctx, 'Source: AAA, via GoodCarBadCar (May 21, 2026)', at(49));
  }
  function e8(ctx, lt, dur, t) { // inflation: April CPI 3.8% (highest since 2023); May 4.2%, gasoline up 40%+
    const T0 = 54.4, at = s => lt - (s - T0);
    K.bg.white(ctx);
    // a shopping cart whose tags grow with the readings
    const cartX = 260; sh(ctx, c => { c.moveTo(cartX - 140, 360); c.lineTo(cartX + 140, 360); c.lineTo(cartX + 110, 520); c.lineTo(cartX - 110, 520); c.closePath(); }, '#e9edf1', 5); for (let i = 0; i < 5; i++) sh(ctx, c => c.roundRect(cartX - 120 + i * 50, 300, 40, 64, 6), [P.yellow, P.red, P.blue, P.green, P.orange][i], 3); for (const wx of [cartX - 80, cartX + 80]) sh(ctx, c => c.arc(wx, 550, 22, 0, 7), INK, 0); Tn.line(ctx, [[cartX + 140, 360], [cartX + 190, 300]], 8, INK);
    popAt(ctx, 640, 80, at(55.42), () => { K.card(ctx, 480, 44, 320, 72, '#fff', 16); txt(ctx, 'straight into inflation', 640, 80, HAND(700, 32)); });
    const bar = (x, v, l, s, col) => { const k = at(s); if (k <= 0) return; const hgt = v * 60 * out(clamp(k / .8)); sh(ctx, c => c.rect(x - 70, 620 - hgt, 140, hgt), col, 5); txt(ctx, v + '%', x, 620 - hgt - 30, HAND(700, 46), col); txt(ctx, l, x, 650, PRINT(22)); };
    bar(640, 3.8, 'April CPI', 58.7, P.orange); bar(860, 4.2, 'May CPI', 64.61, P.red);
    if (at(61.33) > 0) popAt(ctx, 640, 260, at(61.33), () => { K.card(ctx, 530, 230, 220, 60, '#fff', 12); txt(ctx, 'highest since 2023', 640, 260, PRINT(22)); });
    if (at(66.3) > 0) popAt(ctx, 1110, 300, at(66.3), () => { K.card(ctx, 990, 220, 240, 160, P.red, 18); txt(ctx, 'gasoline', 1110, 260, PRINT(26), '#fff'); txt(ctx, '+40%+', 1110, 320, HAND(700, 56), '#fff'); txt(ctx, 'vs a year earlier', 1110, 360, PRINT(18), '#fff'); });
    K.source(ctx, 'Sources: CNBC (May 12, 2026); Fox Business (Jun 10, 2026) · BLS CPI', at(57));
  }

  // ================= CHAPTER 4 =================
  function f1(ctx, lt, dur, t) { // America's record oil industry should ride to the rescue: higher prices → more drilling → more supply → lower prices… it didn't
    const T0 = 69.91, at = s => lt - (s - T0), no = at(80.44) > 0;
    K.bg.sky(ctx); ctx.fillStyle = '#d9b36a'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    const C = [['higher prices', 74.1, P.red], ['more drilling', 75.32, P.orange], ['more supply', 76.04, P.blue], ['lower prices', 77.27, P.green]];
    C.forEach(([l, s, col], i) => { const x = 170 + i * 310; popAt(ctx, x, 300, at(s), () => { K.card(ctx, x - 125, 250, 250, 100, col, 18); txt(ctx, l, x, 300, HAND(700, 34), '#fff'); }); if (i && at(s) > 0) K.arrow(ctx, [x - 180, 300], [x - 132, 300], clamp(at(s) / .3), INK, 6); });
    rig(ctx, 640, 600, .8);
    if (no) { K.cross(ctx, 640, 300, 900, clamp(at(80.44) / .5)); K.stamp(ctx, "IT DIDN'T", 640, 480, at(80.44), { color: P.red, size: 60, rot: -.06 }); }
    chapterTab(ctx, 4, "Why Texas didn't save us", lt, 4.0);
  }
  function snail(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.ellipse(0, 0, 90, 24, 0, 0, 7), '#b8d98a', 4); sh(ctx, c => c.arc(-10, -50, 50, 0, 7), '#d9a66b', 5); B.curve(ctx, [-10, -50], [10, -70], [20, -40], 4); sh(ctx, c => c.arc(70, -30, 16, 0, 7), '#b8d98a', 4); Tn.line(ctx, [[74, -44], [80, -76]], 3, INK); Tn.line(ctx, [[66, -44], [62, -78]], 3, INK); sh(ctx, c => c.ellipse(-10, -100, 40, 16, 0, Math.PI, 0), P.yellow, 4); ctx.restore(); }
  function f2(ctx, lt, dur, t) { // at least not fast — and the reasons say a lot about how the industry works today
    const T0 = 80.34, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#d9b36a'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    rig(ctx, 1000, 600, .9);
    snail(ctx, lerp(200, 340, clamp(lt / dur)), 600, 1.2, t);
    popAt(ctx, 640, 120, at(81.48), () => { K.card(ctx, 480, 80, 320, 80, P.yellow, 16); txt(ctx, 'not fast', 640, 120, HAND(700, 46)); });
    if (at(82.67) > 0) popAt(ctx, 640, 230, at(82.67), () => { K.card(ctx, 420, 196, 440, 68, '#fff', 14); txt(ctx, '3 reasons', 640, 230, HAND(700, 36)); });
  }
  function f3(ctx, lt, dur, t) { // first: shale companies promised Wall Street discipline — steady output, cash back to shareholders instead of drilling sprees
    const T0 = 86.14, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff');
    popAt(ctx, 160, 90, at(86.14), () => { K.card(ctx, 60, 54, 200, 72, P.yellow, 16); txt(ctx, 'reason 1', 160, 90, HAND(700, 38)); });
    // Wall Street building on the right with shareholders
    sh(ctx, c => c.rect(860, 160, 360, 460), '#e9edf1', 5); sh(ctx, c => c.rect(840, 140, 400, 40), '#c9ced6', 5); txt(ctx, 'WALL ST.', 1040, 160, PRINT(28)); for (let i = 0; i < 5; i++) Tn.line(ctx, [[890 + i * 75, 190], [890 + i * 75, 600]], 6, '#c9ced6');
    for (let i = 0; i < 3; i++) bean(ctx, 920 + i * 110, 700, .55, t, Object.assign(Pr.extra(i + 4), { top: 'suit', body: '#2f3a55', armR: at(91.54) > 0 ? [2.4, .2] : [.2, .2], face: { mouth: at(91.54) > 0 ? 'grin' : 'flat', look: [-.6, 0] } }));
    const ex = bean(ctx, 360, 700, 1.0, t, Object.assign(Pr.extra(1), { top: 'suit', body: '#3a4a3a', armR: [1.3, .5], face: { mouth: 'smile', brows: 'up', look: [.8, 0] } }));
    popAt(ctx, 360, 160, at(89.33), () => { K.card(ctx, 220, 120, 280, 76, '#fff', 16); txt(ctx, '"discipline"', 360, 158, HAND(700, 40)); });
    if (at(90.67) > 0) popAt(ctx, 360, 250, at(90.67), () => txt(ctx, 'steady output', 360, 250, PRINT(26)));
    if (at(91.54) > 0) { const k = clamp(at(91.54) / 1.2); const bx = lerp(ex.hands.R[0], 900, out(k)), by = lerp(ex.hands.R[1], 520, out(k)) - Math.sin(k * Math.PI) * 120; sh(ctx, c => c.roundRect(bx - 34, by - 30, 68, 60, 14), '#d9b98a', 4); txt(ctx, '$', bx, by, HAND(700, 34), '#6b4a1d'); }
    if (at(92.91) > 0) { rig(ctx, 620, 600, .5); K.cross(ctx, 620, 480, 160, clamp(at(93.32) / .4)); txt(ctx, 'drilling sprees', 620, 650, PRINT(22), INK, 'center', clamp(at(93.32) / .3)); }
  }
  function f4(ctx, lt, dur, t) { // Argus: the windfall more likely to go to dividends and buybacks than new wells; ConocoPhillips' CEO: no "whipsaw"
    const T0 = 94.95, at = s => lt - (s - T0), ceo = at(103.2) > 0;
    K.bg.white(ctx);
    if (!ceo) {
      K.logo(ctx, 'argus', 640, 110, 220, at(96.76), { pad: 10 });
      // the windfall splits: big arrows to dividends + buybacks, a thin one to new wells
      sh(ctx, c => c.roundRect(540, 220, 200, 120, 20), P.green, 5); txt(ctx, 'windfall', 640, 280, HAND(700, 40), '#fff');
      const k = clamp(at(98.79) / .8);
      [[300, 'dividends', 22, P.green], [640, 'buybacks', 22, P.green], [980, 'new wells', 5, '#c9ced6']].forEach(([x, l, w, col], i) => { if (k <= 0) return; K.arrow(ctx, [640, 340], [x, 480], k, col, w); popAt(ctx, x, 540, at(100.28 + (i === 2 ? 1.2 : i * .3)), () => { K.card(ctx, x - 110, 510, 220, 64, i === 2 ? '#f3f5f7' : '#fff', 14); txt(ctx, l, x, 542, HAND(700, 34), i === 2 ? '#9aa3ad' : INK); }); });
      K.source(ctx, 'Source: Argus Media (Sep 3, 2026)', at(96.8));
      return;
    }
    K.bg.studio(ctx, '#e3ecf7', '#f5f8fc');
    bean(ctx, 300, 700, 1.05, t, Object.assign({}, LANCE, { armR: [1.7, .5], face: { mouth: 'flat', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Ryan Lance', 'ConocoPhillips CEO', 300, 110, at(103.98));
    if (IMG.cop) K.logo(ctx, 'cop', 900, 110, 220, at(103.3), { crop: COP, h: 101, pad: 0, round: 10 });
    // the whipsaw: a plan board yanked up and down — which he said the company didn't want
    const yank = Math.sin(t * 8) * 60 * clamp(at(105.79) / .3) * (1 - clamp((at(107.52) - .3) / .4)); ctx.save(); ctx.translate(860, 380 + yank); sh(ctx, c => c.roundRect(-150, -70, 300, 140, 16), '#fff', 5); txt(ctx, 'drilling plans', 0, -20, HAND(700, 34)); for (const d of [-1, 1]) K.arrow(ctx, [180, 0], [180, d * 70], 1, P.red, 5); ctx.restore();
    if (at(105.79) > 0) popAt(ctx, 860, 600, at(105.79), () => { K.card(ctx, 640, 566, 440, 68, P.yellow, 14); txt(ctx, 'no "whipsaw" up or down', 860, 600, HAND(700, 34)); });
    K.source(ctx, 'Source: Argus Media (Sep 3, 2026)', at(104));
  }
  function f5(ctx, lt, dur, t) { // second: drillers didn't trust the price — today expensive, a year or two out much cheaper; the war might end next month
    const T0 = 108.69, at = s => lt - (s - T0);
    K.bg.white(ctx);
    popAt(ctx, 160, 90, at(108.69), () => { K.card(ctx, 60, 54, 200, 72, P.yellow, 16); txt(ctx, 'reason 2', 160, 90, HAND(700, 38)); });
    Tn.line(ctx, [[220, 160], [220, 600], [1100, 600]], 5, INK); txt(ctx, 'today', 300, 640, PRINT(24)); txt(ctx, '1–2 years out', 1000, 640, PRINT(24)); txt(ctx, 'oil price', 160, 140, PRINT(22), '#6a7380');
    const k = clamp(at(113.67) / 1.4); if (at(111.96) > 0) popAt(ctx, 300, 230, at(111.96), () => { sh(ctx, c => c.arc(300, 230, 14, 0, 7), P.red, 4); txt(ctx, 'expensive', 300, 190, HAND(700, 32), P.red); });
    if (k > 0) { const pts = [[300, 230], [500, 330], [700, 420], [1000, 470]]; ctx.save(); ctx.beginPath(); ctx.moveTo(300, 230); for (let i = 1; i < pts.length; i++) { const f = clamp(k * 3 - (i - 1)); if (f <= 0) break; ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); } ctx.lineWidth = 7; ctx.strokeStyle = P.blue; ctx.setLineDash([16, 10]); ctx.stroke(); ctx.restore(); if (k > .9) txt(ctx, 'much cheaper', 1000, 430, HAND(700, 32), P.blue); }
    const dr = bean(ctx, 640, 700, .55, t, Object.assign(Pr.extra(5), { body: P.orange, face: { mouth: 'flat', brows: 'skeptic', look: [-.6, -.6] } }));
    if (at(116.96) > 0) K.bubble(ctx, 'Spend billions… if the war ends next month?', 760, 120, 520, [680, 500], at(116.96), { size: 28 });
    txt(ctx, 'futures curve, shape only', 1240, 700, PRINT(16), '#8a93a0', 'right');
  }
  function f6(ctx, lt, dur, t) { // third: even when they drill, J.P. Morgan said new supply takes several months
    const T0 = 120.54, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#d9b36a'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    popAt(ctx, 160, 90, at(120.69), () => { K.card(ctx, 60, 54, 200, 72, P.yellow, 16); txt(ctx, 'reason 3', 160, 90, HAND(700, 38)); });
    if (IMG.jpm) K.logo(ctx, 'jpm', 640, 100, 300, at(123.9), { crop: JPM, h: 61, pad: 8, round: 8 });
    // a rig assembling piece by piece while calendar months flip
    const build = clamp(lt / dur); ctx.save(); ctx.beginPath(); ctx.rect(300, 600 - 300 * build - 20, 400, 300 * build + 20); ctx.clip(); rig(ctx, 500, 600, 1.0); ctx.restore();
    const months = ['MAR', 'APR', 'MAY', 'JUN', 'JUL'], m = Math.min(4, Math.floor(clamp(at(126.22) / 1.0) * 5)); Pr.calendar(ctx, 980, 560, .8, months[m] + ' 2026', '…', { bigSize: 80, head: P.blue });
    if (at(126.22) > 0) popAt(ctx, 980, 220, at(126.22), () => { K.card(ctx, 830, 180, 300, 80, '#fff', 16); txt(ctx, 'several months', 980, 220, HAND(700, 38)); });
    K.source(ctx, 'J.P. Morgan analysts, via Argus (Sep 3, 2026)', at(124));
  }
  function f7(ctx, lt, dur, t) { // to be fair: rational decisions — past drill-crazy booms often went bankrupt when prices crashed
    const T0 = 128.1, at = s => lt - (s - T0), bust = at(135.53) > 0;
    K.bg.cream(ctx);
    popAt(ctx, 640, 80, at(128.41), () => { K.card(ctx, 460, 44, 360, 72, '#fff', 16); txt(ctx, "let's be fair", 640, 80, HAND(700, 40)); });
    popAt(ctx, 640, 170, at(130.24), () => { K.card(ctx, 430, 138, 420, 64, P.green, 14); txt(ctx, 'rational business decisions', 640, 170, HAND(700, 30), '#fff'); });
    // a past boom: many rigs, then the price crashes and one topples under a BANKRUPT sign
    for (let i = 0; i < 4; i++) { const x = 220 + i * 260, fall = bust && i === 2 ? clamp(at(135.53) / .6) : 0; ctx.save(); ctx.translate(x, 600); ctx.rotate(fall * 1.2); rig(ctx, 0, 0, .55); ctx.restore(); }
    ctx.fillStyle = '#d9b36a'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    if (at(134.61) > 0) { K.arrow(ctx, [1100, 260], [1180, 520], clamp(at(136.19) / .5), P.red, 10); txt(ctx, 'prices crash', 1120, 230, HAND(700, 30), P.red); }
    if (bust) K.stamp(ctx, 'BANKRUPT', 740, 440, at(135.53), { color: P.red, size: 52, rot: -.1 });
    txt(ctx, 'past price spikes', 220, 660, PRINT(22), INK, 'center', clamp(at(134.03) / .3));
  }
  function f8(ctx, lt, dur, t) { // the safety net Americans think they have — "we make our own oil" — doesn't work when it matters most
    const T0 = 137.38, at = s => lt - (s - T0), fall = clamp(at(141.91) / 1.0);
    K.bg.sky(ctx);
    // a circus safety net with a hole labelled WE MAKE OUR OWN OIL; You drops through it
    for (const px of [240, 1040]) Tn.line(ctx, [[px, 720], [px, 470]], 10, '#7a5233');
    ctx.save(); ctx.beginPath(); ctx.moveTo(240, 480); ctx.quadraticCurveTo(640, 560, 1040, 480); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); for (let i = 0; i < 14; i++) { const x = 260 + i * 56; Tn.line(ctx, [[x, 486 + Math.sin(i / 13 * Math.PI) * 40], [x + 20, 530]], 2, '#6a7380'); } ctx.restore();
    sh(ctx, c => c.ellipse(640, 520, 110, 26, 0, 0, 7), '#4a90d9', 4);
    popAt(ctx, 640, 420, at(138.15), () => { K.card(ctx, 460, 390, 360, 60, P.yellow, 12); txt(ctx, '"we make our own oil"', 640, 420, HAND(700, 30)); });
    bean(ctx, 640, lerp(300, 820, fall * fall), .6, t, Object.assign({}, YOU, { armL: [2.6, 0], armR: [2.6, 0], face: { mouth: 'o', brows: 'worried', look: [0, .6] } }));
    if (at(142.53) > 0) popAt(ctx, 640, 120, at(142.53), () => { K.card(ctx, 300, 80, 680, 80, '#fff', 16); txt(ctx, "doesn't work when it matters most", 640, 120, HAND(700, 36), P.red); });
  }

  const SH = [[0, 2.08, e1], [2.08, 9.89, e2], [9.89, 14.63, e3], [14.63, 29.03, e4], [29.03, 36.37, e5], [36.37, 47.14, e6], [47.14, 54.4, e7], [54.4, 69.91, e8],
    [69.91, 80.34, f1], [80.34, 86.14, f2], [86.14, 94.95, f3], [94.95, 108.69, f4], [108.69, 120.54, f5], [120.54, 128.1, f6], [128.1, 137.38, f7], [137.38, 144.61, f8]];
  const DUR = 144.61;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [2.56, 7.88, 10.23, 14.75, 15.4, 17.9, 21.3, 25.03, 33.17, 34.37, 40.19, 44.79, 48.62, 55.42, 61.33, 66.3, 74.1, 75.32, 76.04, 77.27, 81.48, 82.67, 86.14, 89.33, 96.76, 100.28, 100.58, 101.48, 103.98, 105.79, 108.69, 111.96, 116.96, 120.69, 123.9, 126.22, 128.41, 130.24, 138.15, 142.53]
    .map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[.97, 'buzz'], [5.4, 'ding'], [12.53, 'stamp'], [21.3, 'thud'], [35.16, 'stamp'], [38.72, 'ding'], [43.34, 'ding'], [50.17, 'thud'], [51.79, 'stamp'], [58.7, 'tick'], [64.61, 'tick'], [66.3, 'buzz'], [80.44, 'stamp'], [91.54, 'cash'], [98.79, 'whoosh'], [105.79, 'boing'],
    [113.67, 'swoosh'], [126.22, 'tick'], [126.7, 'tick'], [135.53, 'thud'], [135.7, 'stamp'], [141.91, 'whoosh'], [142.9, 'thud']].map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/gas-3.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofiDark' }, { t: 29.03, mood: 'lofiKeys' }, { t: 36.37, mood: 'lofiDark' }, { t: 69.91, mood: 'lofi' }, { t: 128.1, mood: 'lofiKeys' }, { t: 137.38, mood: 'lofiDark' }],
    images: { aaa: 'assets/gas/american-automobile-association.png', reuters: 'assets/gas/reuters.png', argus: 'assets/gas/argus.png', cop: 'assets/gas/conocophillips.png', jpm: 'assets/gas/j-p-morgan.png' },
    fonts: G.BizFont.load };
})(window);
