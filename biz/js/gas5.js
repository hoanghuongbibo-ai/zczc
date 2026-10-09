/* "The War That Put $4.36 Gas in Your Tank" — part 5 (final): CH. 7 WHO WON, WHO PAID, WHERE THINGS STAND, OUR TAKE, end tease, CTAs 3–4, disclaimer
 * (voice: assets/audio/gas-5.mp3). Times are the narration's word times (pocketsphinx transcript). */
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

  function chapterTab(ctx, num, title, lt, dur = 4.5) {
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190, x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, 'CHAPTER ' + num, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  function quoteCard(ctx, x, y, w, lines, lt, o = {}) { popAt(ctx, x, y, lt, () => { const h = lines.length * (o.lh || 50) + 50; K.card(ctx, x - w / 2, y - h / 2, w, h, o.fill || '#fff', 22); lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 46 + i * (o.lh || 50), HAND(700, o.size || 40), (o.red || []).includes(i) ? P.red : INK)); }); }
  function postCard(ctx, x, y, w, lines, lt, o = {}) { // a social-post card, labelled as a recreation
    popAt(ctx, x, y, lt, () => { const h = 120 + lines.length * 44; K.card(ctx, x - w / 2, y - h / 2, w, h, '#fff', 18); sh(ctx, c => c.arc(x - w / 2 + 50, y - h / 2 + 50, 26, 0, 7), '#5a3fb0', 3); txt(ctx, 'Donald J. Trump', x - w / 2 + 90, y - h / 2 + 40, PRINT(24), INK, 'left'); txt(ctx, '@realDonaldTrump · Truth Social', x - w / 2 + 90, y - h / 2 + 66, PRINT(18), '#6a7380', 'left');
      lines.forEach((l, i) => { const hl = (o.hl || []).includes(i); if (hl) { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = P.yellow; ctx.fillRect(x - w / 2 + 30, y - h / 2 + 100 + i * 44, w - 60, 36); ctx.restore(); } txt(ctx, l, x - w / 2 + 34, y - h / 2 + 118 + i * 44, HAND(700, 32), INK, 'left'); });
      txt(ctx, 'recreation', x + w / 2 - 20, y + h / 2 - 18, PRINT(16), '#8a93a0', 'right'); }); }
  function capitolSmall(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-80, -60, 160, 60), '#eef0f4', 4); sh(ctx, c => c.ellipse(0, -60, 40, 46, 0, Math.PI, 0), '#eef0f4', 4); ctx.restore(); }

  // ---------- props for part 5 ----------
  const ZANDI = { skin: '#f0c4a0', hair: 'side', hairColor: '#c9c4bc', glasses: true, body: '#2b3550', top: 'suit', tie: '#7a2e3a' };
  const RISCH = { skin: '#f2c8a4', hair: 'short', hairColor: '#e8e6e2', body: '#23262e', top: 'suit', tie: P.red };
  function sectionTab(ctx, chip, title, lt, dur = 4.5) { // same look as the chapter tab, for the non-chapter sections
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190, x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, chip, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  function takeHeader(ctx, n, line, lt) { // "Our Take" point header: number disc + statement
    popAt(ctx, 640, 78, lt, () => { ctx.font = HAND(700, 38); const w = ctx.measureText(line).width + 130; K.card(ctx, 640 - w / 2, 42, w, 72, '#1f1c1a', 18, 0);
      sh(ctx, c => c.arc(640 - w / 2 + 44, 78, 26, 0, 7), P.yellow, 0); txt(ctx, String(n), 640 - w / 2 + 44, 79, HAND(700, 36)); txt(ctx, line, 640 - w / 2 + 86, 79, HAND(700, 38), '#fff', 'left'); });
  }
  function tagCard(ctx, x, y, label, lt, o = {}) { popAt(ctx, x, y, lt, () => { ctx.font = HAND(700, o.size || 34); const w = ctx.measureText(label).width + 56, h = (o.size || 34) + 40; K.card(ctx, x - w / 2, y - h / 2, w, h, o.fill || P.yellow, 16); txt(ctx, label, x, y + 1, HAND(700, o.size || 34), o.color || INK); }); }
  function receipt(ctx, x, y, w, h, lines, o = {}) { // paper receipt, top centre at (x, y), zigzag bottom
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    sh(ctx, c => { c.moveTo(-w / 2, 0); c.lineTo(w / 2, 0); c.lineTo(w / 2, h); for (let i = 0; i <= 10; i++) c.lineTo(w / 2 - i * w / 10, h + (i % 2 ? -12 : 0)); c.closePath(); }, '#fff', 4);
    lines.forEach((l, i) => { txt(ctx, l[0], -w / 2 + 18, 36 + i * 34, PRINT(20), INK, 'left'); if (l[1]) txt(ctx, l[1], w / 2 - 18, 36 + i * 34, PRINT(20), l[2] || INK, 'right'); });
    ctx.restore();
  }
  function coin(ctx, x, y, r = 14) { sh(ctx, c => c.arc(x, y, r, 0, 7), P.yellow, 3); txt(ctx, '$', x, y + 1, PRINT(r * 1.2), '#8a6a1a'); }
  function barrel(ctx, x, y, s = 1, col = '#3a3f4a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-40, -110, 80, 110, 10), col, 5); for (const yy of [-80, -30]) Tn.line(ctx, [[-40, yy], [40, yy]], 4, INK); ctx.restore(); }
  function moneyBag(ctx, x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => { c.moveTo(-26, -110); c.lineTo(26, -110); c.lineTo(14, -84); c.quadraticCurveTo(80, -60, 70, -10); c.quadraticCurveTo(64, 0, 0, 0); c.quadraticCurveTo(-64, 0, -70, -10); c.quadraticCurveTo(-80, -60, -14, -84); c.closePath(); }, '#d9b36a', 5); txt(ctx, '$', 0, -42, HAND(700, 60), '#5a4214'); ctx.restore(); }
  function globe(ctx, x, y, r, t) { sh(ctx, c => c.arc(x, y, r, 0, 7), '#7fc4f0', 5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
    for (let i = 0; i < 3; i++) { const ox = ((t * 30 + i * 140) % 420) - 210; sh(ctx, c => c.ellipse(x + ox, y - 30 + i * 40, 60, 34, .3, 0, 7), '#8fd18a', 3); }
    for (const k of [-.5, 0, .5]) Tn.line(ctx, [[x - r, y + k * r], [x + r, y + k * r]], 2, 'rgba(31,28,26,.35)'); ctx.restore(); sh(ctx, c => c.arc(x, y, r, 0, 7), null, 5); }
  function shield(ctx, x, y, s, crack) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(0, -150); c.lineTo(120, -110); c.lineTo(110, 20); c.quadraticCurveTo(80, 110, 0, 150); c.quadraticCurveTo(-80, 110, -110, 20); c.lineTo(-120, -110); c.closePath(); }, '#cfd8e6', 6);
    txt(ctx, 'energy', 0, -40, HAND(700, 34)); txt(ctx, 'independence', 0, 0, HAND(700, 34));
    if (crack > 0) Tn.line(ctx, [[0, -150], [-20, -90], [18, -40], [-14, 20], [10, 80], [0, 150]].slice(0, 1 + Math.ceil(crack * 5)), 6, INK);
    ctx.restore(); }
  function podium(ctx, x, y, label, col) { sh(ctx, c => { c.moveTo(x - 90, y); c.lineTo(x + 90, y); c.lineTo(x + 70, y - 150); c.lineTo(x - 70, y - 150); c.closePath(); }, '#8a6a4a', 5); sh(ctx, c => c.rect(x - 100, y - 170, 200, 26), '#6b4f36', 4); txt(ctx, label, x, y - 70, HAND(700, 36), '#fff'); }
  function ballot(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-70, -110, 140, 110), '#fff', 5); sh(ctx, c => c.rect(-40, -116, 80, 12), INK, 0); txt(ctx, 'VOTE', 0, -50, PRINT(28), P.blue); ctx.restore(); }
  function bulb(ctx, x, y, k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; Tn.line(ctx, [[x + Math.cos(a) * 46, y + Math.sin(a) * 46], [x + Math.cos(a) * 62, y + Math.sin(a) * 62]], 4, P.orange); }
    sh(ctx, c => c.arc(x, y - 6, 30, 0, 7), '#ffe27a', 4); sh(ctx, c => c.rect(x - 14, y + 22, 28, 18), '#9aa3ad', 3); ctx.restore(); }
  function waffle(ctx, x, y, n, lit, k, sz = 54) { // n day-cells (10 per row); the first `lit` light up green as k → 1 (a count, not dates)
    for (let i = 0; i < n; i++) { const cx = x + (i % 10) * (sz + 8), cy = y + Math.floor(i / 10) * (sz + 8), on = i < lit && k * lit > i;
      sh(ctx, c => c.roundRect(cx, cy, sz, sz, 8), on ? P.green : '#e6e9ee', 3); }
  }
  function burst(ctx, x, y, lt) { if (lt <= 0 || lt > 1.4) return; const k = clamp(lt / .25), a = clamp((1.4 - lt) / .5); ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(out(k), out(k));
    sh(ctx, c => { for (let i = 0; i < 16; i++) { const r = i % 2 ? 16 : 34, an = i / 16 * Math.PI * 2; i ? c.lineTo(Math.cos(an) * r, Math.sin(an) * r) : c.moveTo(r, 0); } c.closePath(); }, P.orange, 3); ctx.restore(); }

  // ================= CHAPTER 7 =================
  function r1(ctx, lt, dur, t) { // so let's add it up — who paid
    const T0 = 0, at = s => lt - (s - T0);
    ctx.fillStyle = '#fff1dc'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#e6efff'; ctx.fillRect(W / 2, 0, W / 2, H); Tn.line(ctx, [[W / 2, 120], [W / 2, 720]], 4, INK);
    const dim = at(1.39) > 0;
    bean(ctx, 230, 690, .8, t, Object.assign({}, YOU, { armR: [1.0, .5], face: { mouth: 'frown', brows: 'worried', look: [.5, 0] } }));
    receipt(ctx, 410, 250 + 6 * Math.sin(t * 2), 190, 330, [['gas', '+', P.red], ['diesel', '+', P.red], ['groceries', '+', P.red], ['flights', '+', P.red], ['', ''], ['TOTAL', '???', P.red]], { rot: .04 });
    ctx.save(); ctx.globalAlpha = dim ? .45 : 1;
    sh(ctx, c => c.rect(820, 380, 300, 300), '#fff', 5); txt(ctx, 'Q2 EARNINGS', 970, 420, PRINT(28)); [[860, 600, 40], [920, 600, 80], [980, 600, 130], [1040, 600, 190]].forEach(([bx, by, h]) => sh(ctx, c => c.rect(bx, by - h, 40, h), P.blue, 3));
    ctx.restore();
    chapterTab(ctx, 7, 'WHO WON, WHO PAID', lt, 2.6);
    if (dim) tagCard(ctx, 320, 160, 'who paid?', at(1.39));
  }
  function r2(ctx, lt, dur, t) { // Brown University tracker: actual fuel prices vs a no-war estimate → $100B+ extra by Labor Day, $750+ per household
    const T0 = 2.81, at = s => lt - (s - T0);
    K.bg.white(ctx);
    K.nameCard(ctx, 'Brown University', 'a war-cost tracker', 330, 92, at(3.52));
    const X0 = 140, X1 = 900, Y0 = 600, pts = 40;
    Tn.line(ctx, [[X0, 170], [X0, Y0], [X1, Y0]], 5, INK); [['Feb', X0 + 20], ['Labor Day', 820]].forEach(([l, x]) => txt(ctx, l, x, Y0 + 26, PRINT(20), '#6a7380'));
    const est = i => Y0 - 140 - 8 * Math.sin(i / 6), act = i => { const u = i / (pts - 1); return Y0 - 140 - (u < .08 ? 0 : 230 * Math.min(1, (u - .08) * 4) - 60 * Math.max(0, u - .45) + 50 * Math.max(0, u - .75)); };
    const kA = clamp(at(5.65) / 1.6), kE = clamp(at(7.88) / 1.2), kG = clamp(at(13.17) / 1.2);
    const xi = i => lerp(X0 + 10, 840, i / (pts - 1));
    if (kG > 0) { ctx.save(); ctx.globalAlpha = .35 * kG; ctx.fillStyle = P.red; ctx.beginPath(); for (let i = 0; i < pts; i++) ctx.lineTo(xi(i), act(i)); for (let i = pts - 1; i >= 0; i--) ctx.lineTo(xi(i), est(i)); ctx.fill(); ctx.restore(); }
    if (kE > 0) { ctx.setLineDash([12, 10]); Tn.line(ctx, Array.from({ length: Math.max(2, Math.ceil(pts * kE)) }, (_, i) => [xi(i), est(i)]), 4, '#8a93a0'); ctx.setLineDash([]); txt(ctx, 'estimate with no war', 560, est(30) + 34, PRINT(22), '#6a7380', 'center', kE); }
    if (kA > 0) { Tn.line(ctx, Array.from({ length: Math.max(2, Math.ceil(pts * kA)) }, (_, i) => [xi(i), act(i)]), 6, P.red); txt(ctx, 'actual prices', 360, 190, HAND(700, 30), P.red, 'center', kA); }
    if (at(10.57) > 0) { const k = clamp(at(10.57) / .5); ctx.setLineDash([6, 8]); Tn.line(ctx, [[820, Y0], [820, lerp(Y0, 160, out(k))]], 3, INK); ctx.setLineDash([]); }
    if (at(14.71) > 0) { K.slam(ctx, '$100B+', 1090, 250, at(14.71), 76, P.red); if (at(15.51) > 0) txt(ctx, 'extra on gas & diesel', 1090, 320, HAND(700, 26), INK, 'center', clamp(at(15.51) / .3)); }
    if (at(18.05) > 0) popAt(ctx, 1090, 450, at(18.05), () => { K.card(ctx, 960, 390, 260, 120, P.yellow, 16); txt(ctx, '$750+', 1090, 432, HAND(700, 50)); txt(ctx, 'per household', 1090, 482, PRINT(22)); });
    txt(ctx, 'model-based estimate · shape only', 1240, 700, PRINT(16), '#8a93a0', 'right');
    K.source(ctx, 'Source: Brown University Climate Solutions Lab (Sep 8, 2026)', at(4));
  }
  function r3(ctx, lt, dur, t) { // Mark Zandi (Moody's): a slightly different method incl. jet fuel → ~$115B, ~$860 per household
    const T0 = 20.8, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#d9e8ff', '#f3f8ff');
    bean(ctx, 300, 700, 1.0, t, Object.assign({}, ZANDI, { armR: [at(27) > 0 ? 1.7 : .3, .5], face: { mouth: Math.sin(t * 8) > 0 ? 'o' : 'flat', brows: 'calm', look: [.6, 0] } }));
    K.nameCard(ctx, 'Mark Zandi', "Moody's chief economist", 300, 230, at(20.9));
    tagCard(ctx, 840, 160, 'a slightly different method', at(24.22), { fill: '#fff', size: 30 });
    tagCard(ctx, 840, 250, '+ jet fuel', at(25.43), { fill: '#e6efff', size: 30 });
    if (at(29.02) > 0) K.slam(ctx, '≈ $115B', 840, 380, at(29.02), 80, P.red);
    if (at(30.64) > 0) popAt(ctx, 840, 520, at(30.64), () => { K.card(ctx, 700, 460, 280, 120, P.yellow, 16); txt(ctx, '≈ $860', 840, 502, HAND(700, 50)); txt(ctx, 'per household', 840, 552, PRINT(22)); });
    K.source(ctx, 'Source: Fox Business (Sep 10, 2026)', at(21));
  }
  function r4(ctx, lt, dur, t) { // that's an estimate, not a receipt — but it's like a surprise bill for every family in America
    const T0 = 33.48, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 640, 190, at(33.6), () => { K.card(ctx, 330, 110, 620, 160, '#fff', 22); txt(ctx, '$750 – $860', 640, 172, HAND(700, 72), P.red); txt(ctx, 'per household', 640, 232, PRINT(26)); });
    if (at(33.75) > 0) K.stamp(ctx, 'ESTIMATE', 1060, 170, at(33.75), { color: P.blue, size: 40, rot: .08 });
    if (at(36.44) > 0) { txt(ctx, 'a surprise bill for every family', 640, 340, HAND(700, 40), INK, 'center', clamp(at(36.44) / .3));
      for (let i = 0; i < 5; i++) { const x = 180 + i * 230; K.house(ctx, x, 650, .55); const k = clamp((at(36.94) - i * .18) / .5); if (k > 0) K.envelope(ctx, x, lerp(380, 520, out(k)), .5, Math.sin(t * 3 + i) * .08, {}); } }
    K.source(ctx, "Sources: Brown University (Sep 8); Moody's via Fox Business (Sep 10, 2026)", at(33.6));
  }
  function barGrow(ctx, x, base, w, h, k, col, top, under, topK) { if (k > 0) sh(ctx, c => c.rect(x - w / 2, base - h * out(k), w, h * out(k)), col, 5); txt(ctx, under, x, base + 28, PRINT(22)); if (topK > 0) txt(ctx, top, x, base - h - 30, HAND(700, 44), INK, 'center', clamp(topK / .3)); }
  function r5(ctx, lt, dur, t) { // who earned: Jul 31 results — Chevron $12.1B in Q2, up from $2.5B a year earlier
    const T0 = 39.74, at = s => lt - (s - T0);
    K.bg.white(ctx);
    tagCard(ctx, 640, 80, 'who earned?', at(39.97));
    if (at(41.13) > 0) tagCard(ctx, 640, 170, 'Jul 31, 2026 · spring-quarter results', at(41.13), { fill: '#fff', size: 28 });
    if (IMG.chevron) K.logo(ctx, 'chevron', 260, 400, 170, at(46.44), { pad: 10 });
    Tn.line(ctx, [[480, 620], [1060, 620]], 5, INK);
    barGrow(ctx, 860, 620, 150, 12.1 * 28, clamp(at(47.27) / .9), P.blue, '$12.1B', 'Q2 2026', at(48.07));
    barGrow(ctx, 640, 620, 150, 2.5 * 28, clamp(at(50.0) / .6), '#9aa3ad', '$2.5B', 'Q2 2025', at(50.82));
    if (at(51.93) > 0) tagCard(ctx, 1120, 360, '≈ 5×', at(51.93), { fill: '#e6efff' });
    K.source(ctx, 'Source: Chevron Q2 2026 earnings release (Jul 31, 2026)', at(46.5));
  }
  function r6(ctx, lt, dur, t) { // ExxonMobil $14.5B, more than triple Q1; ≈ $160M a day
    const T0 = 53.55, at = s => lt - (s - T0);
    K.bg.white(ctx);
    if (IMG.exxon) K.logo(ctx, 'exxon', 240, 300, 220, at(53.6), { pad: 10 });
    Tn.line(ctx, [[440, 620], [940, 620]], 5, INK);
    barGrow(ctx, 760, 620, 150, 14.5 * 26, clamp(at(54.42) / .9), P.blue, '$14.5B', 'Q2 2026', at(55.52));
    barGrow(ctx, 560, 620, 150, 4.18 * 26, clamp(at(57.27) / .6), '#9aa3ad', '$4.2B', 'Q1 2026', at(57.84));
    if (at(58.2) > 0) tagCard(ctx, 560, 380, 'more than 3×', at(58.2), { fill: '#e6efff', size: 30 });
    if (at(59.15) > 0) popAt(ctx, 1110, 330, at(59.15), () => { Pr.calendar(ctx, 1110, 330, .8, 'PER DAY', '', {}); });
    if (at(60.77) > 0) popAt(ctx, 1110, 520, at(60.77), () => { K.card(ctx, 990, 470, 240, 100, P.yellow, 16); txt(ctx, '≈ $160M', 1110, 506, HAND(700, 44)); txt(ctx, 'a day', 1110, 548, PRINT(22)); });
    if (at(60.77) > 0) txt(ctx, '$14.5B ÷ 91 days', 1110, 600, PRINT(18), '#6a7380', 'center', clamp(at(61.5) / .3));
    K.source(ctx, 'Source: Oil & Gas Journal (Jul 31, 2026)', at(54));
  }
  function r7(ctx, lt, dur, t) { // back to shareholders: Exxon returned $9.4B incl. $5.1B buybacks; Chevron about $6.6B
    const T0 = 64.87, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    tagCard(ctx, 640, 80, 'where did a lot of it go?', at(64.95), { fill: '#fff', size: 32 });
    if (IMG.exxon) K.logo(ctx, 'exxon', 200, 260, 170, at(65.1), { pad: 8 });
    if (IMG.chevron) K.logo(ctx, 'chevron', 200, 500, 120, at(65.3), { pad: 8 });
    const sx = [930, 1050, 1170]; if (at(67.2) > 0) { sx.forEach((x, i) => popAt(ctx, x, 600, at(67.2) - i * .12, () => bean(ctx, x, 700, .55, t, Object.assign(Pr.extra(i + 1), { face: { mouth: 'smile', brows: 'up', look: [-.6, 0] } })))); txt(ctx, 'shareholders', 1050, 380, HAND(700, 34), P.green, 'center', clamp(at(67.3) / .3)); }
    const flow = (a, b, s0, lbl, y) => { const k = clamp(at(s0) / .8); if (k <= 0) return; K.arrow(ctx, a, b, k, P.green, 6); for (let i = 0; i < 4; i++) { const u = ((t * .5 + i / 4) % 1) * k; coin(ctx, lerp(a[0], b[0], u), lerp(a[1], b[1], u) - 18, 12); } };
    flow([310, 260], [860, 470], 68.75, '', 0); flow([290, 500], [860, 540], 75.26, '', 0);
    if (at(69.12) > 0) popAt(ctx, 560, 230, at(69.12), () => { K.card(ctx, 420, 196, 280, 68, '#fff', 14); txt(ctx, '$9.4B returned', 560, 230, HAND(700, 34)); });
    if (at(72.31) > 0) txt(ctx, 'incl. $5.1B in buybacks', 560, 290, PRINT(24), '#3a4250', 'center', clamp(at(72.31) / .3));
    if (at(75.65) > 0) popAt(ctx, 560, 600, at(75.65), () => { K.card(ctx, 410, 566, 300, 68, '#fff', 14); txt(ctx, '≈ $6.6B returned', 560, 600, HAND(700, 34)); });
    if (at(67.3) > 0) txt(ctx, 'returned = dividends + buybacks', 1050, 412, PRINT(16), '#6a7380');
    K.source(ctx, 'Sources: ExxonMobil & Chevron Q2 2026 results (Jul 31, 2026)', at(65));
  }
  function r8(ctx, lt, dur, t) { // to be fair: they don't set the global price, they lose money in crashes; profits are a result of the war, not proof; but it shows who sits on which side
    const T0 = 78.93, at = s => lt - (s - T0), see = at(89.28) > 0;
    K.bg.studio(ctx, '#d6f0dc', '#f2fbf4');
    host(ctx, 250, 700, 1.0, t, [[T0, 'presentBoth'], [80.2, 'present'], [85.2, 'count'], [89.3, 'pointSide']], { mouth: 'flat', brows: 'up', look: [.6, 0] });
    if (!see) {
      tagCard(ctx, 820, 100, 'to be fair', at(78.93));
      [['they don\'t set the global oil price', 220, 80.26], ['they lose money when prices crash', 330, 82.89]].forEach(([l, y, s]) => popAt(ctx, 820, y, at(s), () => { K.card(ctx, 540, y - 40, 560, 80, '#fff', 16); txt(ctx, l, 820, y, HAND(700, 30)); }));
      popAt(ctx, 820, 490, at(85.27), () => { K.card(ctx, 540, 420, 560, 140, '#fff8d6', 16); txt(ctx, 'profits = a result of the war,', 820, 470, HAND(700, 32)); txt(ctx, 'not proof they caused it', 820, 515, HAND(700, 32), P.green); });
      return;
    }
    tagCard(ctx, 820, 110, 'who sits on which side of a price shock', at(89.28), { fill: '#fff', size: 30 });
    const tilt = .22 * out(clamp(at(90.6) / .8));
    sh(ctx, c => { c.moveTo(900, 560); c.lineTo(940, 640); c.lineTo(860, 640); c.closePath(); }, '#9aa3ad', 5);
    ctx.save(); ctx.translate(900, 556); ctx.rotate(tilt); sh(ctx, c => c.rect(-290, -14, 580, 22), '#c9a46a', 5);
    ctx.restore();
    const L = [900 - 240 * Math.cos(tilt), 556 - 240 * Math.sin(tilt)], R = [900 + 240 * Math.cos(tilt), 556 + 240 * Math.sin(tilt)];
    // left end goes up (producers' prices), right end goes down (drivers' costs)
    barrel(ctx, L[0], L[1] - 16 + 0, .7); txt(ctx, 'oil producers', L[0], L[1] - 120, HAND(700, 28), P.green);
    bean(ctx, R[0], R[1] - 14, .45, t, Object.assign({}, YOU, { face: { mouth: 'frown', brows: 'worried' } })); txt(ctx, 'drivers', R[0], R[1] - 200, HAND(700, 28), P.red);
  }
  function r9(ctx, lt, dur, t) { // who decides: Congress has voted 20 times on war powers; the House passed them; Sep 24 the Senate failed 50–49
    const T0 = 92.96, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#9fd18a'; ctx.fillRect(0, 620, W, 100); Tn.line(ctx, [[0, 620], [W, 620]], 4, INK);
    tagCard(ctx, 640, 80, 'who decides?', at(93.1));
    capitolSmall(ctx, 300, 620, 2.6);
    if (at(94.78) > 0 && at(98.28) < 0) tagCard(ctx, 300, 200, 'this surprised me', at(94.78), { fill: '#fff', size: 30 });
    if (at(98.28) > 0) { const n = Math.min(20, Math.floor(clamp(at(99.15) / 1.4) * 20 + (at(99.15) > 0 ? 1 : 0)));
      txt(ctx, 'war powers votes since the war began', 960, 170, PRINT(22), '#3a4250');
      for (let i = 0; i < 20; i++) { const x = 760 + (i % 10) * 42, y = 200 + Math.floor(i / 10) * 52; sh(ctx, c => c.roundRect(x, y, 34, 42, 6), i < n ? P.blue : '#fff', 3); }
      if (n >= 20) txt(ctx, '20', 1210, 252, HAND(700, 48), P.blue); }
    if (at(102.15) > 0) tagCard(ctx, 960, 370, 'House: passed ✓', at(102.15), { fill: '#dff3e2', size: 30 });
    if (at(103.97) > 0) popAt(ctx, 960, 520, at(103.97), () => { K.card(ctx, 760, 450, 400, 140, '#1f1c1a', 18, 0); txt(ctx, 'Senate · Sep 24', 960, 482, PRINT(22), '#f6c945'); txt(ctx, at(106.74) > 0 ? '49 yes · 50 no' : '…', 960, 540, HAND(700, 52), '#fff'); });
    if (at(107.7) > 0) K.stamp(ctx, 'FAILED BY 1', 960, 655, at(107.7), { color: P.red, size: 36, rot: -.08 });
    K.source(ctx, 'Source: AP (Sep 25, 2026)', at(98.5));
  }
  function r10(ctx, lt, dur, t) { // supporters: Congress, not the President, should decide — 7+ months; opponents (Risch): a limited operation, "not a forever war"
    const T0 = 109.94, at = s => lt - (s - T0);
    ctx.fillStyle = '#e3f3e6'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#fdece6'; ctx.fillRect(W / 2, 0, W / 2, H); Tn.line(ctx, [[W / 2, 0], [W / 2, H]], 4, INK);
    txt(ctx, 'SUPPORTERS SAY', 320, 70, PRINT(28), P.green);
    popAt(ctx, 320, 190, at(110.66), () => { K.card(ctx, 70, 120, 500, 140, '#fff', 18); txt(ctx, 'Congress, not the President,', 320, 170, HAND(700, 32)); txt(ctx, 'should decide on war', 320, 214, HAND(700, 32)); });
    if (at(116.64) > 0) popAt(ctx, 320, 450, at(116.64), () => { Pr.calendar(ctx, 320, 450, .55, 'WAR', '7+ mo', {}); });
    capitolSmall(ctx, 320, 690, 1.2);
    if (at(118.23) > 0) {
      txt(ctx, 'OPPONENTS SAY', 960, 70, PRINT(28), P.red, 'center', clamp(at(118.23) / .3));
      popAt(ctx, 1110, 520, at(118.3), () => bean(ctx, 1110, 700, .8, t, Object.assign({}, RISCH, { face: { mouth: at(125.57) > 0 && Math.sin(t * 8) > 0 ? 'o' : 'flat', brows: 'calm', look: [-.6, 0] } })));
      K.nameCard(ctx, 'Sen. Jim Risch (R)', 'Senate Foreign Relations chair', 900, 160, at(119.14));
      tagCard(ctx, 820, 290, 'a limited operation', at(122.51), { fill: '#fff', size: 30 });
      if (at(125.57) > 0) { K.bubble(ctx, ['"This is not a forever war,', 'indeed not even close to it."'], 790, 440, 440, [990, 470], at(125.57), { size: 28 });
        txt(ctx, 'said early in the war', 790, 525, PRINT(18), '#6a7380', 'center', clamp(at(126.2) / .3)); }
    }
    K.source(ctx, 'Sources: AP (Sep 25, 2026); Reuters (Mar 4, 2026)', at(118.5));
  }
  function r11(ctx, lt, dur, t) { // wherever you stand on that, the war is now part of your monthly budget
    const T0 = 128.72, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 640, 380, at(128.8), () => { sh(ctx, c => c.rect(420, 120, 440, 520), '#fffdf5', 5); for (let i = 0; i < 7; i++) Tn.line(ctx, [[440, 230 + i * 56], [840, 230 + i * 56]], 2, '#c9d6ea'); Tn.line(ctx, [[480, 120], [480, 640]], 2, '#f0a9a0');
      txt(ctx, 'MONTHLY BUDGET', 660, 170, HAND(700, 38));
      ['rent', 'groceries', 'phone', 'gas'].forEach((l, i) => txt(ctx, l, 500, 258 + i * 56, HAND(700, 32), INK, 'left')); });
    if (at(130.4) > 0) { const k = clamp(at(130.4) / .4); txt(ctx, '+ the war', 500, 482, HAND(700, 34), P.red, 'left', k); K.scribbleCircle(ctx, 580, 482, 110, 32, clamp(at(130.7) / .5)); }
  }
  function r12(ctx, lt, dur, t) { // CTA 3: how much more are you paying vs February? number + state in the comments; I read them and pin the most eye-opening ones
    const T0 = 131.88, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffe3a6', '#fff6df');
    host(ctx, 260, 700, 1.05, t, [[T0, 'present'], [133.3, 'pointSide'], [139.8, 'thumbsUp'], [141.3, 'present']], { mouth: 'smile', brows: 'up', look: [.6, 0] });
    popAt(ctx, 840, 380, at(132.0), () => { K.card(ctx, 520, 120, 640, 470, '#fff', 20); txt(ctx, 'Comments', 560, 160, PRINT(26), INK, 'left'); Tn.line(ctx, [[540, 190], [1140, 190]], 2, '#dfe3e8');
      if (at(133.35) > 0) { txt(ctx, 'How much more are you paying', 840, 240, HAND(700, 32), INK, 'center', clamp(at(133.35) / .3)); txt(ctx, 'to fill up vs. February?', 840, 282, HAND(700, 32), INK, 'center', clamp(at(133.35) / .3)); }
      if (at(136.64) > 0) { const s = 'my number: $___ more · my state: ___', n = Math.floor(clamp(at(136.64) / 1.6) * s.length);
        sh(ctx, c => c.arc(580, 370, 24, 0, 7), P.teal, 3); sh(ctx, c => c.roundRect(620, 340, 510, 60, 14), '#f1f3f6', 2); txt(ctx, s.slice(0, n), 640, 371, PRINT(22), INK, 'left'); }
      if (at(141.04) > 0) { const k = out(clamp(at(141.04) / .4)); sh(ctx, c => c.roundRect(560, 440, 570, 110, 16), '#fff8d6', 3); txt(ctx, 'PINNED', 600, 470, PRINT(20), P.red, 'left', k); txt(ctx, 'the most eye-opening ones', 600, 515, HAND(700, 30), INK, 'left', k); Pr.pin(ctx, 1090, 480, .6, at(141.04), P.red); }
    });
  }

  // ================= WHERE THINGS STAND =================
  function s1(ctx, lt, dur, t) { // as of this week: per Kpler, Gulf crude exports above pre-war on 14 days in September — oil is flowing again
    const T0 = 142.99, at = s => lt - (s - T0);
    K.bg.white(ctx);
    sectionTab(ctx, 'NOW', 'WHERE THINGS STAND', lt, 3.6);
    if (IMG.kpler) K.logo(ctx, 'kpler', 1040, 180, 260, at(147.22), { pad: 10 });
    if (at(149.29) > 0) { txt(ctx, 'Gulf crude exports · September (30 days)', 140, 190, PRINT(24), '#3a4250', 'left', clamp(at(149.29) / .3));
      waffle(ctx, 140, 230, 30, 14, clamp(at(151.74) / 1.2));
      if (at(152.39) > 0) popAt(ctx, 450, 500, at(152.39), () => { K.card(ctx, 230, 460, 440, 80, P.green, 16); txt(ctx, '14 days above pre-war', 450, 500, HAND(700, 36), '#fff'); }); }
    if (at(154.28) > 0) { const k = clamp(at(154.28) / 2); ctx.fillStyle = '#7fc4f0'; ctx.fillRect(760, 470, 520, 150); Tn.line(ctx, [[760, 470], [1280, 470]], 4, INK); tanker(ctx, lerp(780, 1120, out(k)), 540, .9, 0, {}); txt(ctx, 'oil is flowing again', 1020, 420, HAND(700, 32), P.green, 'center', clamp(at(154.28) / .3)); }
    txt(ctx, 'count of days, not which days', 140, 440, PRINT(16), '#8a93a0', 'left');
    K.source(ctx, 'Source: Kpler, via Reuters/gCaptain (Oct 5, 2026)', at(147.3));
  }
  function s2(ctx, lt, dur, t) { // but the shooting hasn't stopped: ≥1 attack a day since Oct 2; U.S. oil ~$92, 40%+ above pre-war; gas $4.36
    const T0 = 156.13, at = s => lt - (s - T0), stats = at(163.96) > 0;
    if (!stats) {
      gulfMap(ctx);
      [[700, 380, 157.0], [960, 400, 158.6], [820, 350, 160.1], [1060, 470, 161.6], [600, 330, 163.0]].forEach(([x, y, s]) => { tanker(ctx, x, y, .55, .35, {}); burst(ctx, x + 10, y - 20, at(s)); });
      if (IMG.ukmto) K.logo(ctx, 'ukmto', 170, 140, 200, at(157.95), { pad: 8 });
      if (at(159.83) > 0) popAt(ctx, 640, 640, at(159.83), () => { K.card(ctx, 320, 600, 640, 80, P.red, 16); txt(ctx, '≥ 1 attack a day on ships since Oct 2', 640, 640, HAND(700, 32), '#fff'); });
      txt(ctx, 'illustration', 1250, 700, PRINT(16), '#6a5a3a', 'right');
      K.source(ctx, 'Source: UKMTO via Reuters/gCaptain (Oct 5, 2026)', at(158));
      return;
    }
    K.bg.white(ctx);
    popAt(ctx, 260, 330, at(164.3), () => { K.card(ctx, 100, 240, 320, 180, '#fff', 18); txt(ctx, 'U.S. oil', 260, 280, PRINT(24), '#6a7380'); txt(ctx, '≈ $92', 260, 340, HAND(700, 64)); txt(ctx, 'a barrel', 260, 392, PRINT(22), '#6a7380'); });
    popAt(ctx, 600, 330, at(167.46), () => { K.card(ctx, 460, 250, 280, 160, '#ffe7e3', 18); txt(ctx, '+40%', 600, 316, HAND(700, 64), P.red); txt(ctx, 'above pre-war', 600, 370, PRINT(22)); });
    if (at(169.92) > 0) popAt(ctx, 1000, 400, at(169.92), () => priceBoard(ctx, 1000, 420, .9, '$4.36', { date: 'this week' }));
    K.source(ctx, 'Source: ABC News (Oct 8, 2026)', at(164.5));
  }
  function s3(ctx, lt, dur, t) { // you're paying for the risk, not just the oil: detours, danger pay, insurance → passed down the line to the pump
    const T0 = 172.17, at = s => lt - (s - T0);
    K.bg.sky(ctx);
    tagCard(ctx, 640, 90, "you're paying for the risk, not just the oil", at(172.4), { fill: '#fff', size: 32 });
    Tn.line(ctx, [[120, 560], [1180, 560]], 6, '#8a93a0');
    popAt(ctx, 220, 420, at(175.78), () => { ctx.fillStyle = '#7fc4f0'; sh(ctx, c => c.roundRect(110, 340, 220, 140, 18), '#7fc4f0', 4); tanker(ctx, 220, 420, .8, 0, {}); ctx.setLineDash([8, 8]); Tn.line(ctx, [[150, 380], [220, 330], [300, 380]], 4, INK); ctx.setLineDash([]); txt(ctx, 'detours', 220, 520, HAND(700, 30)); });
    popAt(ctx, 500, 420, at(177.1), () => { bean(ctx, 500, 500, .4, t, Object.assign(Pr.extra(5), { face: { mouth: 'flat', brows: 'worried' } })); tagCard(ctx, 560, 330, '+ danger pay', 1, { fill: P.yellow, size: 24 }); txt(ctx, 'crew', 500, 520, HAND(700, 30)); });
    popAt(ctx, 780, 420, at(178.65), () => { sh(ctx, c => c.roundRect(710, 330, 140, 160, 10), '#fff', 4); txt(ctx, 'INSURANCE', 780, 360, PRINT(18)); for (let i = 0; i < 3; i++) Tn.line(ctx, [[730, 395 + i * 26], [830, 395 + i * 26]], 3, '#c9ced6'); txt(ctx, 'insurance', 780, 520, HAND(700, 30)); });
    if (at(179.5) > 0) { pump(ctx, 1080, 560, 1.0, '$4.36'); const k = clamp(at(179.5) / 1.8); for (let i = 0; i < 3; i++) { const u = clamp(k * 1.4 - i * .2); if (u > 0) coin(ctx, lerp([220, 500, 780][i], 1060, out(u)), 560 - 22, 14); } }
    if (at(180.73) > 0) txt(ctx, 'all the way to the pump', 1000, 620, HAND(700, 30), P.red, 'center', clamp(at(180.73) / .3));
    K.source(ctx, 'Source: ABC News (Oct 8, 2026)', at(173));
  }

  // ================= OUR TAKE =================
  function o1(ctx, lt, dur, t) { // our view — interpretation, not fact; you're free to disagree
    const T0 = 182.35, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#dcd6f7', '#f6f4ff');
    host(ctx, 300, 700, 1.1, t, [[T0, 'present'], [185.2, 'chest'], [189.3, 'shrug']], { mouth: 'flat', brows: 'calm', look: [.6, 0] });
    popAt(ctx, 840, 190, at(182.55), () => { K.card(ctx, 620, 120, 440, 140, '#1f1c1a', 22, 0); txt(ctx, 'OUR TAKE', 840, 192, HAND(700, 72), P.yellow); });
    tagCard(ctx, 840, 340, 'our interpretation, not a fact', at(186.38), { fill: '#fff', size: 32 });
    tagCard(ctx, 840, 450, "you're free to disagree", at(189.54), { fill: '#e6efff', size: 32 });
  }
  function o2(ctx, lt, dur, t) { // 1: "energy independence" is a slogan, not a shield; a war anywhere is a tax everywhere; "we make our own" doesn't protect prices
    const T0 = 191.32, at = s => lt - (s - T0), ph = at(205.36) > 0 ? 2 : at(199.89) > 0 ? 1 : 0;
    K.bg.cream(ctx);
    takeHeader(ctx, 1, '"energy independence" is a slogan, not a shield', at(192.24));
    if (ph === 0) {
      shield(ctx, 380, 420, 1.2, clamp(at(198.27) / .5));
      if (at(195.71) > 0) popAt(ctx, 900, 330, at(195.71), () => { K.card(ctx, 700, 250, 400, 160, '#fff', 18); txt(ctx, '#1 oil producer', 900, 310, HAND(700, 44), P.blue); txt(ctx, 'on Earth: the U.S.', 900, 362, PRINT(24)); });
      if (at(198.51) > 0) tagCard(ctx, 900, 500, "...and it didn't protect you", at(198.51), { fill: '#ffe7e3', size: 32 });
      K.source(ctx, 'Source: U.S. EIA (Jul 9, 2026)', at(195.8));
      return;
    }
    if (ph === 1) {
      globe(ctx, 400, 400, 170, t); txt(ctx, 'one world oil market', 400, 620, HAND(700, 34), P.blue);
      if (at(202.48) > 0) popAt(ctx, 900, 400, at(202.48), () => { K.card(ctx, 680, 300, 440, 200, '#1f1c1a', 22, 0); txt(ctx, 'a war anywhere', 900, 360, HAND(700, 44), '#fff'); txt(ctx, 'is a tax everywhere', 900, 430, HAND(700, 44), P.yellow); });
      return;
    }
    bean(ctx, 300, 700, .8, t, Object.assign(Pr.extra(1), { top: 'suit', body: '#2f3a55', tie: P.blue, armR: [1.6, .3], face: { mouth: 'grin', brows: 'up' } }));
    bean(ctx, 560, 700, .8, t, Object.assign(Pr.extra(3), { top: 'suit', body: '#2f3a55', tie: P.red, armR: [1.6, .3], face: { mouth: 'grin', brows: 'up' } }));
    txt(ctx, 'politicians on either side', 430, 260, PRINT(22), '#6a7380');
    K.bubble(ctx, ['"Cheap gas!', 'We make our own!"'], 430, 340, 380, [430, 420], at(207.42), { size: 32 });
    if (at(209.97) > 0) tagCard(ctx, 930, 360, 'this year: not how it works', at(209.97), { fill: '#ffe7e3', size: 32 });
  }
  function o3(ctx, lt, dur, t) { // 2: the cost of a war shows up long before anyone votes on it; $750–$860 per household belongs in the debate, either way; rarely mentioned
    const T0 = 213.03, at = s => lt - (s - T0), deb = at(228.94) > 0;
    K.bg.cream(ctx);
    takeHeader(ctx, 2, 'the cost shows up before anyone votes', at(213.97));
    if (!deb) {
      Tn.line(ctx, [[140, 560], [1140, 560]], 5, INK);
      const k = clamp(at(214.3) / 1.2); sh(ctx, c => c.arc(180, 560, 14, 0, 7), P.red, 3); txt(ctx, 'war begins', 180, 600, PRINT(22));
      if (at(219.19) > 0) { popAt(ctx, 470, 470, at(219.19), () => pump(ctx, 470, 540, .6, '$$$')); txt(ctx, 'bill at the pump: within days', 470, 600, PRINT(22), P.red, 'center', clamp(at(220.2) / .3)); }
      if (k > 0) { ballot(ctx, 1060, 540, .8); txt(ctx, 'a vote?', 1060, 600, PRINT(22), '#6a7380'); txt(ctx, '?', 1060, 400, HAND(700, 60), '#6a7380'); }
      if (at(224.22) > 0) popAt(ctx, 700, 280, at(224.22), () => { K.card(ctx, 450, 190, 500, 170, '#fff', 20); txt(ctx, '$750 – $860', 700, 260, HAND(700, 64), P.red); txt(ctx, 'per household (estimates)', 700, 316, PRINT(24)); });
      K.source(ctx, "Sources: Brown University (Sep 8); Moody's via Fox Business (Sep 10, 2026)", at(224.3));
      return;
    }
    tagCard(ctx, 640, 210, 'this number belongs in the debate', at(229.4), { fill: '#fff', size: 34 });
    [[360, 'support', P.green, 231.48], [920, 'oppose', P.red, 232.55]].forEach(([x, l, col, s]) => { podium(ctx, x, 660, l, col); if (at(s) > 0) popAt(ctx, x, 380, at(s), () => { K.card(ctx, x - 140, 340, 280, 80, P.yellow, 16); txt(ctx, '$750–$860', x, 380, HAND(700, 40)); }); });
    if (at(233.48) > 0) txt(ctx, "it's rarely mentioned", 640, 300, HAND(700, 30), '#6a7380', 'center', clamp(at(233.48) / .3));
  }
  function o4(ctx, lt, dur, t) { // 3: rockets and feathers is a choice, not a law of physics; the slow drop happens mostly at retail; competition + transparency; compare prices
    const T0 = 235.38, at = s => lt - (s - T0);
    K.bg.white(ctx);
    takeHeader(ctx, 3, 'rockets & feathers: a choice, not physics', at(236.14));
    if (at(239.85) < 0) {
      rocket(ctx, 460, 400, .9, 0); feather(ctx, 820, 400 + Math.sin(t * 2) * 10, .9, Math.sin(t * 1.5) * .3);
      if (at(237.99) > 0) { tagCard(ctx, 640, 600, 'a law of physics?', at(237.99), { fill: '#fff', size: 34 }); K.cross(ctx, 640, 600, 90, clamp(at(238.55) / .4)); }
      return;
    }
    [['crude oil', 200], ['wholesale', 520], ['pump sign', 840]].forEach(([l, x], i) => { K.card(ctx, x - 120, 190, 240, 100, '#fff', 16); txt(ctx, l, x, 240, HAND(700, 34), i === 2 ? P.red : INK); if (i < 2) K.arrow(ctx, [x + 128, 240], [x + 190, 240], 1, '#8a93a0', 5); });
    K.scribbleCircle(ctx, 840, 240, 170, 80, clamp(at(242.27) / .6));
    if (at(243.49) > 0) txt(ctx, 'the slow drop: mostly here', 1060, 340, HAND(700, 28), P.red, 'center', clamp(at(243.49) / .3));
    tagCard(ctx, 330, 430, 'more competition', at(245.97), { fill: '#dff3e2', size: 32 });
    tagCard(ctx, 330, 530, 'price transparency', at(246.76), { fill: '#e6efff', size: 32 });
    if (at(250.01) > 0) popAt(ctx, 980, 520, at(250.01), () => Pr.phone(ctx, 980, 520, .5, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); txt(c, 'Gas nearby', w / 2, 50, PRINT(28)); [['Station A', '$4.41'], ['Station B', '$4.29'], ['Station C', '$4.35']].forEach(([a, b], i) => { c.fillStyle = i === 1 ? '#dff3e2' : '#f1f3f6'; c.beginPath(); c.roundRect(20, 100 + i * 120, w - 40, 96, 14); c.fill(); txt(c, a, 44, 148 + i * 120, PRINT(26), INK, 'left'); txt(c, b, w - 44, 148 + i * 120, HAND(700, 34), i === 1 ? P.green : INK, 'right'); }); }));
    if (at(250.78) > 0) txt(ctx, 'compare before you fill up', 980, 700, HAND(700, 26), P.green, 'center', clamp(at(250.78) / .3));
    if (at(250.01) > 0) txt(ctx, 'illustration', 1250, 690, PRINT(14), '#8a93a0', 'right');
    K.source(ctx, 'Borenstein, Cameron & Gilbert, QJE (1997)', at(240));
  }
  function o5(ctx, lt, dur, t) { // what we'll be watching: do Gulf exports hold, do attacks stop, do investigations produce anything — next spike, you know how the money moves
    const T0 = 253.25, at = s => lt - (s - T0), fin = at(262.3) > 0;
    K.bg.color(ctx, '#eef3ff');
    if (!fin) {
      tagCard(ctx, 640, 90, "what we'll be watching", at(253.87), { fill: P.yellow });
      [['do Gulf exports hold?', 255.03], ['do the attacks stop?', 257.03], ['do the investigations produce anything?', 258.65]].forEach(([l, s], i) => popAt(ctx, 640, 240 + i * 130, at(s), () => { K.card(ctx, 240, 190 + i * 130, 800, 100, '#fff', 16); sh(ctx, c => c.roundRect(270, 215 + i * 130, 50, 50, 8), '#fff', 4); txt(ctx, '?', 295, 241 + i * 130, HAND(700, 36), '#8a93a0'); txt(ctx, l, 350, 240 + i * 130, HAND(700, 34), INK, 'left'); }));
      return;
    }
    tagCard(ctx, 640, 160, 'next time oil spikes…', at(262.3), { fill: '#fff', size: 36 });
    const xs = [220, 520, 820, 1100], labels = ['crude', 'wholesale', 'pump sign', 'your wallet'];
    xs.forEach((x, i) => popAt(ctx, x, 420, at(263.17) - i * .15, () => { K.card(ctx, x - 110, 370, 220, 100, i === 3 ? P.yellow : '#fff', 16); txt(ctx, labels[i], x, 420, HAND(700, 32)); }));
    if (at(264.28) > 0) { for (let i = 0; i < 3; i++) K.arrow(ctx, [xs[i] + 116, 420], [xs[i + 1] - 116, 420], clamp(at(264.28) / .6), P.green, 5); for (let i = 0; i < 4; i++) { const u = (t * .35 + i / 4) % 1; coin(ctx, lerp(220, 1100, u), 340, 13); } }
    if (at(264.77) > 0) txt(ctx, 'now you know how the money moves', 640, 580, HAND(700, 40), P.green, 'center', clamp(at(264.77) / .3));
  }

  // ================= END TEASE + CTA 4 =================
  function e1(ctx, lt, dur, t) { // one more thing: somebody else made a fortune off this war — not an American company; its oil price roughly tripled (one estimate); one of America's biggest rivals; next video
    const T0 = 266.9, at = s => lt - (s - T0);
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, [[0, '#1d2333'], [1, '#2e3650']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    if (at(267.0) > 0 && at(268.26) < 0) txt(ctx, 'one more thing…', 640, 360, HAND(700, 56), '#fff', 'center', clamp(at(267.0) / .3));
    if (at(268.26) < 0) return;
    // silhouette: a shadowed figure with a growing money bag
    const sk = clamp(at(268.26) / .6); ctx.save(); ctx.globalAlpha = sk; bean(ctx, 960, 680, 1.0, t, { skin: '#0e1220', hair: 'none', body: '#0e1220', top: 'plain', legs: '#0e1220', face: { eyes: 0, mouth: 'flat', brows: 'calm' } }); txt(ctx, '?', 960, 300, HAND(700, 120), '#f6c945'); ctx.restore();
    moneyBag(ctx, 1130, 690, lerp(.5, 1.3, out(clamp(at(278.32) / 1.0))) * sk);
    tagCard(ctx, 380, 170, 'made a fortune off this war', at(268.96), { fill: '#fff', size: 32 });
    tagCard(ctx, 380, 270, 'not an American company', at(270.48), { fill: '#ffe7e3', size: 32 });
    if (at(273.31) > 0) { for (let i = 0; i < 3; i++) popAt(ctx, 240 + i * 100, 450, at(273.31) + .0 - i * .2, () => barrel(ctx, 240 + i * 100, 470, .8, '#4a5266')); if (at(273.98) > 0) K.slam(ctx, '×3', 600, 420, at(273.98), 80, P.yellow); }
    if (at(274.76) > 0) txt(ctx, 'its oil price · by one estimate this spring', 380, 520, PRINT(22), '#c9d1e6', 'center', clamp(at(274.76) / .3));
    tagCard(ctx, 380, 600, "one of America's biggest rivals", at(276.93), { fill: '#1f1c1a', color: '#fff', size: 30 });
    if (at(280.66) > 0) { ctx.fillStyle = `rgba(14,18,32,${.7 * clamp(at(280.66) / .3)})`; ctx.fillRect(0, 0, W, H); }
    if (at(280.66) > 0) popAt(ctx, 640, 360, at(280.66), () => { K.card(ctx, 400, 290, 480, 140, P.yellow, 22); txt(ctx, 'NEXT VIDEO', 640, 362, HAND(700, 64)); });
    K.source(ctx, 'Source: Chatham House (Apr 2026), citing Bloomberg calculations', at(273.5));
  }
  function e2(ctx, lt, dur, t) { // CTA 4: part two of this series, then the AI-bubble video; subscribe + notifications; share with one person who complains about gas prices
    const T0 = 282.39, at = s => lt - (s - T0), share = at(300.33) > 0;
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 260, 700, 1.05, t, [[T0, 'present'], [284.0, 'count'], [296.6, 'pointSide'], [300.3, 'presentBoth'], [301.9, 'pointSide'], [305.3, 'thumbsUp']], { mouth: 'smile', brows: 'up', look: [.6, 0] });
    if (!share) {
      const items = [['this video', '✓', 282.39], ['next: the rival who cashed in', '', 282.82], ['then: an AI bubble?', '', 284.39]];
      items.forEach(([l, m, s], i) => popAt(ctx, 840, 140 + i * 100, at(s), () => { K.card(ctx, 560, 100 + i * 100, 560, 80, i ? '#fff' : '#dff3e2', 16); txt(ctx, 'PART ' + (i + 1), 590, 140 + i * 100, PRINT(20), '#6a7380', 'left'); txt(ctx, l, 680, 140 + i * 100, HAND(700, 30), INK, 'left'); if (m) txt(ctx, m, 1090, 140 + i * 100, HAND(700, 34), P.green); }));
      if (at(287.75) > 0) txt(ctx, 'AI spending · more of it borrowed money', 840, 440, PRINT(22), '#6a7380', 'center', clamp(at(287.75) / .3));
      const click = at(297.0); if (at(296.7) > 0) popAt(ctx, 840, 540, at(296.7), () => { const pressed = click > 0 && click < .25; sh(ctx, c => c.roundRect(700, 500 + (pressed ? 6 : 0), 280, 80, 40), click > 0 ? '#9aa3ad' : P.red, 5); txt(ctx, click > 0 ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 840, 540 + (pressed ? 6 : 0), PRINT(32), '#fff'); });
      if (at(297.77) > 0) popAt(ctx, 1050, 540, at(297.77), () => { const w = Math.sin(t * 18) * .25 * clamp(1 - at(297.77) / 1.2); ctx.save(); ctx.translate(1050, 520); ctx.rotate(w); sh(ctx, c => { c.moveTo(-26, 20); c.quadraticCurveTo(-26, -30, 0, -32); c.quadraticCurveTo(26, -30, 26, 20); c.closePath(); }, P.yellow, 4); sh(ctx, c => c.arc(0, 28, 8, 0, 7), P.yellow, 3); ctx.restore(); });
      return;
    }
    const k = clamp(at(301.96) / .8);
    if (k > 0) { K.arrow(ctx, [560, 360], [820, 360], k, P.blue, 6); txt(ctx, 'share', 690, 320, HAND(700, 30), P.blue, 'center', k); }
    bean(ctx, 1010, 700, .9, t, Object.assign(Pr.extra(4), { face: { mouth: at(305.52) > 0 ? 'o' : 'frown', brows: at(305.52) > 0 ? 'up' : 'angry', look: [-.4, -.2] } }));
    if (at(303.35) > 0 && at(305.52) < 0) K.bubble(ctx, ['"Ugh, gas prices!"'], 1010, 220, 340, [1010, 330], at(303.35), { size: 30 });
    bulb(ctx, 1010, 230, clamp(at(305.52) / .3));
    if (at(305.52) > 0) txt(ctx, 'now they know why', 1010, 120, HAND(700, 32), P.green, 'center', clamp(at(305.52) / .3));
  }
  function e3(ctx, lt, dur, t) { // disclaimer + thanks, on a clean background
    const T0 = 306.97, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fffaf0');
    const a = clamp(lt / .4);
    txt(ctx, 'This video is for educational purposes only', 640, 300, HAND(700, 40), INK, 'center', a);
    txt(ctx, "and isn't financial advice.", 640, 356, HAND(700, 40), INK, 'center', a);
    if (at(311.06) > 0) txt(ctx, 'Thanks for watching!', 640, 470, HAND(700, 52), P.red, 'center', clamp(at(311.06) / .3));
  }

  const SH = [[0, 2.81, r1], [2.81, 20.8, r2], [20.8, 33.48, r3], [33.48, 39.74, r4], [39.74, 53.55, r5], [53.55, 64.87, r6], [64.87, 78.93, r7], [78.93, 92.96, r8], [92.96, 109.94, r9], [109.94, 128.72, r10], [128.72, 131.88, r11], [131.88, 142.99, r12],
    [142.99, 156.13, s1], [156.13, 172.17, s2], [172.17, 182.35, s3],
    [182.35, 191.32, o1], [191.32, 213.03, o2], [213.03, 235.38, o3], [235.38, 253.25, o4], [253.25, 266.9, o5],
    [266.9, 282.39, e1], [282.39, 306.97, e2], [306.97, 312.19, e3]];
  const DUR = 312.19;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [1.39, 3.52, 18.05, 20.9, 24.22, 25.43, 30.64, 33.6, 39.97, 41.13, 46.44, 51.93, 53.6, 58.2, 59.15, 60.77, 64.95, 67.2, 69.12, 75.65, 78.93, 80.26, 82.89, 85.27, 89.28, 93.1, 94.78, 102.15, 103.97, 110.66, 116.64, 118.3, 119.14, 122.51, 125.57,
    128.8, 132.0, 147.22, 152.39, 157.95, 159.83, 164.3, 167.46, 169.92, 172.4, 175.78, 177.1, 178.65, 182.55, 186.38, 189.54, 192.24, 195.71, 198.51, 202.48, 207.42, 209.97, 213.97, 219.19, 224.22, 229.4, 231.48, 232.55,
    236.14, 237.99, 245.97, 246.76, 250.01, 253.87, 255.03, 257.03, 258.65, 262.3, 268.96, 270.48, 276.93, 282.39, 282.82, 284.39, 296.7, 303.35].map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[5.65, 'rise'], [10.57, 'tick'], [14.71, 'thud'], [29.02, 'thud'], [33.75, 'stamp'], [36.94, 'mail'], [47.27, 'rise'], [50.0, 'tick'], [54.42, 'rise'], [57.27, 'tick'], [68.75, 'cash'], [75.26, 'cash'], [90.6, 'boing'],
    [99.15, 'type'], [107.7, 'stamp'], [130.4, 'paper'], [136.64, 'type'], [141.04, 'ding'], [151.74, 'tick'], [154.28, 'whoosh'], [157.0, 'thud'], [158.6, 'thud'], [160.1, 'thud'], [179.5, 'cash'], [198.27, 'thud'], [238.55, 'buzz'],
    [242.27, 'scratch'], [264.28, 'cash'], [273.98, 'thud'], [278.32, 'cash'], [280.66, 'rise'], [297.0, 'click'], [297.77, 'ding'], [305.52, 'ding']].map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/gas-5.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofi' }, { t: 131.88, mood: 'lofiUp' }, { t: 142.99, mood: 'lofiDark' }, { t: 182.35, mood: 'lofiKeys' }, { t: 266.9, mood: 'lofiDark' }, { t: 282.39, mood: 'lofiUp' }, { t: 306.97, mood: 'lofiKeys' }],
    images: { aaa: 'assets/gas/american-automobile-association.png', chevron: 'assets/gas/chevron.png', exxon: 'assets/gas/exxonmobil.png', kpler: 'assets/gas/kpler.png', ukmto: 'assets/gas/ukmto.png' },
    fonts: G.BizFont.load };
})(window);
