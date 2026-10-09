/* "The War That Put $4.36 Gas in Your Tank" — part 4: CH. 5 THE DEAL, AND THE DROP THAT DIDN'T COME, CH. 6 THE SECOND SHOCK (voice: assets/audio/gas-4.mp3).
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

  const BONNER = { skin: '#f6d2b5', hair: 'bob', hairColor: '#a8643a', body: '#1f2a44', top: 'suit' };
  const BORENSTEIN = { skin: '#f0c4a0', hair: 'short', hairColor: '#9b958c', beard: true, body: '#26355c', top: 'suit', tie: '#e07b39' };
  const CAMERON = { skin: '#f0c4a0', hair: 'side', hairColor: '#6e4a2c', beard: true, glasses: true, body: '#5a5f6a', top: 'shirt' };
  const GILBERT = { skin: '#f0c4a0', hair: 'side', hairColor: '#e8e6e2', body: '#2b3550', top: 'shirt' };
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

  // ================= CHAPTER 5 =================
  function p1(ctx, lt, dur, t) { // mid-June, the turning point: the U.S. and Iran announced a deal to end the war and reopen the strait
    const T0 = 0, at = s => lt - (s - T0);
    gulfMap(ctx);
    // the strait's chain drops away on "reopen"
    const op = clamp(at(5.53) / .8); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = 1 - op; sh(ctx, c => c.ellipse(912 + i * 9, 360 + i * 12 + op * 80, 8, 6, .5, 0, 7), null, 5, '#5a5f6a'); ctx.restore(); }
    if (op > 0) for (let i = 0; i < 4; i++) tanker(ctx, lerp(820 - i * 80, 1240 - i * 80, out(op)), lerp(370 - i * 16, 540 - i * 16, out(op)), .55, .35);
    popAt(ctx, 220, 110, at(.62), () => { K.card(ctx, 80, 72, 280, 76, P.yellow, 16); txt(ctx, 'mid-June 2026', 220, 110, HAND(700, 38)); });
    if (at(4.31) > 0) popAt(ctx, 640, 650, at(4.31), () => { K.card(ctx, 290, 612, 700, 76, P.green, 16); txt(ctx, 'a deal: end the war, reopen the strait', 640, 650, HAND(700, 34), '#fff'); });
    chapterTab(ctx, 5, "The deal, and the drop that didn't come", lt, 4.0);
    K.source(ctx, 'Source: NPR (Jun 15, 2026)', at(3));
  }
  function p2(ctx, lt, dur, t) { // the President celebrated: "Ships of the World, start your engines. Let the oil flow!"
    const T0 = 7.26, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff');
    postCard(ctx, 400, 300, 600, ['"Ships of the World, start', 'your engines. Let the oil', 'flow!"'], at(9.98), { hl: [2] });
    // a race start: chequered flag drops, tankers set off
    const go = at(12.46) > 0; ctx.save(); ctx.translate(900, 160); ctx.rotate(go ? .5 : -.2); Tn.line(ctx, [[0, 0], [0, 140]], 6, INK); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { ctx.fillStyle = (r + c) % 2 ? '#fff' : INK; ctx.fillRect(4 + c * 22, r * 18, 22, 18); } ctx.restore();
    ctx.fillStyle = '#7fc4f0'; ctx.fillRect(0, 560, W, 160); for (let i = 0; i < 3; i++) tanker(ctx, go ? lerp(760, 1500, clamp(at(12.46) / 3) * (1 + i * .2)) : 760, 600 + i * 40, .8, 0);
    K.source(ctx, "Trump on social media, via NPR (Jun 15, 2026)", at(10));
  }
  function p3(ctx, lt, dur, t) { // and oil did fall: by late June, international crude was back to roughly where it was before the war
    const T0 = 14.39, at = s => lt - (s - T0);
    K.bg.white(ctx);
    Tn.line(ctx, [[200, 120], [200, 620], [1100, 620]], 5, INK);
    [[70, 'pre-war ~$70'], [120, '~$120']].forEach(([v, l]) => { const y = 620 - (v - 40) * 5.5; ctx.setLineDash([8, 8]); Tn.line(ctx, [[200, y], [1100, y]], 2, '#c9ced6'); ctx.setLineDash([]); txt(ctx, l, 150, y, PRINT(20), '#6a7380'); });
    const y70 = 620 - 30 * 5.5, y120 = 620 - 80 * 5.5, k = clamp(at(15.17) / 2.2);
    Tn.line(ctx, [[260, y70], [380, y120]], 6, '#e9a39a'); txt(ctx, 'March', 380, y120 - 30, PRINT(20), '#6a7380');
    if (k > 0) { Tn.line(ctx, [[380, y120], [lerp(380, 940, out(k)), lerp(y120, y70 + 6, out(k))]], 7, P.green); sh(ctx, c => c.arc(lerp(380, 940, out(k)), lerp(y120, y70 + 6, out(k)), 12, 0, 7), P.green, 4); }
    if (at(18.82) > 0) popAt(ctx, 940, y70 - 210, at(18.82), () => { K.card(ctx, 760, y70 - 250, 360, 80, P.green, 16); txt(ctx, 'back near pre-war', 940, y70 - 210, HAND(700, 36), '#fff'); });
    txt(ctx, 'shape only — points from NPR & Fortune', 1240, 700, PRINT(16), '#8a93a0', 'right');
    K.source(ctx, 'Source: Fortune (Jun 25, 2026)', at(17));
  }
  function p4(ctx, lt, dur, t) { // so did your gas fall back to $2.98? No. On June 24, gas still averaged $3.91
    const T0 = 21.43, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#8c929c'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    priceBoard(ctx, 360, 600, .9, at(26.96) > 0 ? '$3.91' : '$2.98?', { date: at(24.95) > 0 ? 'Jun 24, 2026' : '', glow: at(26.96) > 0 ? '#ff6b5e' : '#ffd166' });
    bean(ctx, 820, 700, 1.0, t, Object.assign({}, YOU, { face: { mouth: at(23.52) > 0 ? 'frown' : 'smile', brows: at(23.52) > 0 ? 'angry' : 'up', look: [-.6, -.3] } }));
    if (at(23.52) > 0) K.slam(ctx, 'NO.', 1060, 260, at(23.52), 120, P.red);
    K.source(ctx, 'Source: AAA, via Fortune (Jun 25, 2026)', at(25));
  }
  function p5(ctx, lt, dur, t) { // the person who got angriest about it was the President himself
    const T0 = 28.53, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd9cf', '#fff3ee');
    bean(ctx, 640, 700, 1.15, t, Object.assign({}, TRUMP, { armL: [2.0, .5], armR: [2.0, .5], face: { mouth: 'frown', brows: 'angry', look: [0, 0] } }));
    if (at(31.69) > 0) for (let i = 0; i < 4; i++) { const k = (t * .9 + i * .25) % 1; ctx.save(); ctx.globalAlpha = 1 - k; ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.arc(600 + (i % 2) * 80 + Math.sin(k * 5) * 10, 230 - k * 120, 16 + k * 18, 0, 7); ctx.fill(); ctx.restore(); }
    popAt(ctx, 640, 90, at(29.56), () => { K.card(ctx, 420, 52, 440, 76, P.yellow, 16); txt(ctx, 'the twist', 640, 90, HAND(700, 40)); });
  }
  function p6(ctx, lt, dur, t) { // Truth Social: "…customers are being 'gouged.'" — he told the Justice Department to investigate
    const T0 = 34.73, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f3f0ff');
    postCard(ctx, 560, 330, 900, ['"The big Oil Companies are not dropping their price', 'at the pump commensurate with the sharply lower', 'prices they are paying for Oil. In other words,', "customers are being 'gouged.'\""], at(36.06), { hl: at(45.94) > 0 ? [3] : [] });
    if (at(47.85) > 0) popAt(ctx, 1110, 600, at(47.85), () => { K.card(ctx, 960, 550, 300, 100, '#fff', 16); txt(ctx, 'asked the DOJ', 1110, 585, HAND(700, 32)); txt(ctx, 'to investigate', 1110, 620, PRINT(22)); });
    popAt(ctx, 220, 630, at(36.06), () => { K.card(ctx, 70, 600, 300, 60, P.yellow, 12); txt(ctx, 'his accusation', 220, 630, HAND(700, 30)); });
    K.source(ctx, 'Source: Fortune (Jun 25, 2026); Reuters', at(37));
  }
  function p7(ctx, lt, dur, t) { // API: "don't move in lockstep with crude oil"; Chevron's CFO: "doing everything we can… it's going to take time"
    const T0 = 50.47, at = s => lt - (s - T0), chev = at(57.71) > 0;
    K.bg.white(ctx);
    popAt(ctx, 640, 70, at(50.63), () => { K.card(ctx, 450, 32, 380, 76, P.blue, 16); txt(ctx, 'the industry pushed back', 640, 70, HAND(700, 34), '#fff'); });
    if (!chev) { K.logo(ctx, 'api', 300, 330, 220, at(52.39), { pad: 6 }); quoteCard(ctx, 820, 340, 640, ['"Gasoline prices don\'t move', 'in lockstep with crude oil."'], at(54.57), { size: 40, lh: 56 }); txt(ctx, 'American Petroleum Institute', 300, 480, PRINT(24), INK, 'center', clamp(at(52.51) / .3)); K.source(ctx, 'API, via Fortune (Jun 25, 2026)', at(53)); return; }
    bean(ctx, 260, 700, 1.05, t, Object.assign({}, BONNER, { armR: [1.7, .5], face: { mouth: Math.sin(t * 7) > 0 ? 'o' : 'flat', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Eimear Bonner', 'Chevron CFO', 260, 180, at(58.19));
    K.logo(ctx, 'chevron', 1130, 180, 110, at(57.71), { pad: 8 });
    quoteCard(ctx, 760, 300, 560, ['"doing everything we can"'], at(59.58), { size: 42 });
    quoteCard(ctx, 760, 470, 560, ['"it\'s going to take time"'], at(62.49), { size: 42, red: [0] });
    K.source(ctx, 'Chevron CFO, via Fortune (Jun 25, 2026)', at(58));
  }
  function capitolSmall(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-80, -60, 160, 60), '#eef0f4', 4); sh(ctx, c => c.ellipse(0, -60, 40, 46, 0, Math.PI, 0), '#eef0f4', 4); ctx.restore(); }
  function p8(ctx, lt, dur, t) { // since then, the DOJ and FTC urged state attorneys general to look into gas pricing — no charges or findings so far
    const T0 = 64.18, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    K.doc(ctx, 260, 330, 300, 360, 'DOJ + FTC letter', ['to: state', 'attorneys general', '"look into', 'gas pricing"'], at(64.8), { lineSize: 24, titleSize: 30 });
    for (let i = 0; i < 4; i++) { const k = clamp((at(68.2) - i * .2) / .9); const x = 560 + i * 170; capitolSmall(ctx, x, 470, 1); txt(ctx, 'state AG', x, 500, PRINT(18)); if (k > 0 && k < 1) K.envelope(ctx, lerp(400, x, k), lerp(330, 380, k) - Math.sin(k * Math.PI) * 80, .6, 0, { stampC: P.blue }); }
    if (at(71.64) > 0) K.stamp(ctx, 'NO CHARGES · NO FINDINGS (SO FAR)', 820, 620, at(71.64), { color: P.blue, size: 34, rot: -.04 });
    K.source(ctx, 'Source: Washington Examiner; The Hill (Jul 2026)', at(66));
  }
  function p9(ctx, lt, dur, t) { // so who's right? economists call it "rockets and feathers" — up like a rocket, down like a feather
    const T0 = 74.02, at = s => lt - (s - T0);
    K.bg.sky(ctx);
    popAt(ctx, 640, 90, at(74.26), () => { K.card(ctx, 500, 52, 280, 76, '#fff', 16); txt(ctx, "who's right?", 640, 90, HAND(700, 40)); });
    if (at(77.72) > 0) popAt(ctx, 640, 200, at(77.72), () => { K.card(ctx, 380, 160, 520, 80, P.yellow, 16); txt(ctx, '"rockets and feathers"', 640, 200, HAND(700, 40)); });
    if (at(80.03) > 0) rocket(ctx, 380, lerp(640, 300, out(clamp(at(80.03) / .5))), 1.1);
    if (at(80.93) > 0) feather(ctx, 900 + Math.sin(t * 2) * 50, lerp(300, 620, clamp(at(80.93) / 6)), 1.1, Math.sin(t * 2) * .5);
    txt(ctx, 'prices up', 380, 690, HAND(700, 32), P.red, 'center', clamp(at(80.03) / .3)); txt(ctx, 'prices down', 900, 690, HAND(700, 32), P.blue, 'center', clamp(at(80.93) / .3));
  }
  function p10(ctx, lt, dur, t) { // the classic research: Borenstein, Cameron and Gilbert, Quarterly Journal of Economics, 1997
    const T0 = 82.73, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#e3ecf7', '#f5f8fc');
    [[300, BORENSTEIN, 'Severin Borenstein', 85.37], [640, CAMERON, 'Colin Cameron', 86.72], [980, GILBERT, 'Richard Gilbert', 87.98]].forEach(([x, o, n, s], i) => { if (at(s) <= 0) return; popAt(ctx, x, 700, at(s), () => bean(ctx, x, 700, .85, t, Object.assign({}, o, { face: { mouth: 'smile', brows: 'up', look: [0, 0] } }))); K.nameCard(ctx, n, 'economist', x, 210 + (i % 2) * 70, at(s) + .05); });
    if (at(89.29) > 0) popAt(ctx, 640, 80, at(89.29), () => { K.card(ctx, 370, 40, 540, 80, P.yellow, 16); txt(ctx, 'Quarterly Journal of Economics, 1997', 640, 80, HAND(700, 30)); });
  }
  function p11(ctx, lt, dur, t) { // crude up → nearly all of it at the pump within ~4 weeks; crude down → ~8 weeks
    const T0 = 93.29, at = s => lt - (s - T0);
    K.bg.white(ctx);
    const row = (y, l, weeks, col, s, icon) => { const k = clamp(at(s) / 1.2); txt(ctx, l, 200, y - 85, HAND(700, 34), col, 'left'); for (let w = 0; w < 8; w++) sh(ctx, c => c.roundRect(200 + w * 110, y, 100, 50, 8), w < weeks * k ? col : '#eef1f4', 3); txt(ctx, '~' + weeks + ' weeks', 200 + 8 * 110 + 40, y + 25, HAND(700, 34), col, 'left'); if (icon === 'r') rocket(ctx, 200 + weeks * 110 * k, y - 26, .4, Math.PI / 2); else feather(ctx, 200 + weeks * 110 * k, y - 26, .5, Math.PI / 2 + Math.sin(t * 2) * .3); };
    row(240, 'crude goes UP → reaches the pump in', 4, P.red, 97.4, 'r');
    if (at(99.34) > 0) row(480, 'crude goes DOWN → takes', 8, P.blue, 100.95, 'f');
    K.source(ctx, 'Borenstein, Cameron & Gilbert, QJE (1997) · 1980s data', at(94));
  }
  function p12(ctx, lt, dur, t) { // wholesale tracked oil evenly; the biggest lag was between wholesale and the sign at your gas station — likely short-run retail market power
    const T0 = 103.31, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 640, 70, at(103.81), () => { K.card(ctx, 400, 32, 480, 76, P.yellow, 16); txt(ctx, 'the detail most people miss', 640, 70, HAND(700, 32)); });
    const st = [[220, 'crude oil', '#2b2b2b'], [640, 'wholesale', P.blue], [1060, 'pump sign', P.red]];
    st.forEach(([x, l, col]) => { K.card(ctx, x - 130, 240, 260, 140, '#fff', 18); txt(ctx, l, x, 310, HAND(700, 40), col); });
    if (at(108.25) > 0) { K.arrow(ctx, [350, 310], [505, 310], clamp(at(108.25) / .4), P.green, 8); txt(ctx, 'tracks evenly', 430, 270, PRINT(20), P.green, 'center', clamp(at(109.24) / .3)); }
    if (at(110.57) > 0) { const k = clamp(at(110.57) / 4); K.arrow(ctx, [770, 310], [lerp(780, 925, k), 310], 1, P.red, 8); snailMini(ctx, lerp(780, 925, k), 350); popAt(ctx, 850, 430, at(110.57), () => { K.card(ctx, 720, 400, 260, 60, P.red, 12); txt(ctx, 'the biggest lag', 850, 430, HAND(700, 30), '#fff'); }); }
    if (at(116.45) > 0) popAt(ctx, 640, 580, at(116.45), () => { K.card(ctx, 300, 540, 680, 80, '#fff', 16); txt(ctx, 'likely: short-run market power among retail sellers', 640, 580, HAND(700, 28)); });
    K.source(ctx, 'Borenstein, Cameron & Gilbert, QJE (1997)', at(106));
  }
  function snailMini(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.scale(.35, .35); sh(ctx, c => c.ellipse(0, 0, 90, 24, 0, 0, 7), '#b8d98a', 4); sh(ctx, c => c.arc(-10, -50, 50, 0, 7), '#d9a66b', 5); ctx.restore(); }
  function p13(ctx, lt, dur, t) { // decades-old research, not this war — "gouging" and "it takes time" can both be partly true; the delay's cost lands on you
    const T0 = 120.45, at = s => lt - (s - T0), both = at(130.82) > 0;
    K.bg.studio(ctx, '#e6dcff', '#f7f3ff');
    host(ctx, 260, 700, 1.05, t, [[T0, 'present'], [123.2, 'shrug'], [126.6, 'presentBoth'], [132.6, 'pointSide']], { mouth: 'flat', brows: 'up', look: [.6, 0] });
    if (!both) { popAt(ctx, 820, 250, at(121.84), () => { K.card(ctx, 600, 200, 440, 100, '#fff', 16); txt(ctx, 'research: decades ago', 820, 250, HAND(700, 34)); }); popAt(ctx, 820, 400, at(123.38), () => { K.card(ctx, 560, 350, 520, 100, '#fff', 16); txt(ctx, 'no study of this exact war yet', 820, 400, HAND(700, 30)); }); }
    else {
      [['"big oil is gouging you"', 640, 128.34 - 2], ['"it just takes time"', 1020, 129.7 - 1]].forEach(([l, x, s]) => popAt(ctx, x, 230, at(s), () => { K.card(ctx, x - 170, 180, 340, 100, '#fff', 16); txt(ctx, l, x, 230, HAND(700, 28)); K.check(ctx, x + 140, 190, 36, clamp(at(131.2) / .4)); }));
      if (at(131.2) > 0) txt(ctx, 'both partly true?', 830, 330, HAND(700, 36), P.purple, 'center', clamp(at(131.2) / .3));
      if (at(134.17) > 0) { const k = clamp(at(134.17) / .8); sh(ctx, c => c.roundRect(lerp(780, 830, k) - 50, lerp(360, 520, k) - 26, 100, 52, 10), '#7fcf7a', 4); txt(ctx, 'the delay $', lerp(780, 830, k), lerp(360, 520, k), PRINT(18), '#1f5c2a'); bean(ctx, 920, 700, .65, t, Object.assign({}, YOU, { face: { mouth: 'frown', brows: 'worried', look: [-.6, -.6] } })); }
    }
  }
  function p14(ctx, lt, dur, t) { // CTA 2: first time someone explained it? subscribe — it's free — and it gets worse from here
    const T0 = 136.54, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 360, 700, 1.1, t, [[T0, 'present'], [141.06, 'pointSide'], [143.24, 'thumbsUp'], [147.15, 'think']], { mouth: 'smile', brows: 'up', look: [.6, 0] });
    const click = at(141.91); popAt(ctx, 880, 360, at(141.2), () => { const pressed = click > 0 && click < .25; sh(ctx, c => c.roundRect(740, 320 + (pressed ? 6 : 0), 280, 80, 40), click > 0 ? '#9aa3ad' : P.red, 5); txt(ctx, click > 0 ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 880, 360 + (pressed ? 6 : 0), PRINT(32), '#fff'); });
    if (at(143.43) > 0) popAt(ctx, 880, 480, at(143.43), () => { K.card(ctx, 800, 450, 160, 60, P.green, 14); txt(ctx, "it's free", 880, 480, HAND(700, 32), '#fff'); });
    if (at(147.82) > 0) popAt(ctx, 880, 180, at(147.82), () => { K.card(ctx, 640, 140, 480, 80, '#1f1c1a', 16, 0); txt(ctx, 'it gets worse from here…', 880, 180, HAND(700, 36), P.yellow); });
  }

  // ================= CHAPTER 6 =================
  function q1(ctx, lt, dur, t) { // the peace fell apart: late June – early July, ships hit by drones and projectiles, incl. a Qatari gas tanker and a Saudi supertanker
    const T0 = 149.54, at = s => lt - (s - T0);
    gulfMap(ctx);
    [[720, 380, 155.17, 'Qatari gas tanker', P.purple], [880, 360, 158.62, 'Saudi supertanker', P.green]].forEach(([x, y, s, l, col]) => { tanker(ctx, x, y, .9, .3, { hull: col }); const k = at(s); if (k <= 0) return; const f = Math.exp(-k * 1.5); ctx.fillStyle = `rgba(255,170,60,${.8 * f})`; ctx.beginPath(); ctx.arc(x + 20, y - 10, 20 + 40 * (1 - f), 0, 7); ctx.fill(); for (let j = 0; j < 3; j++) { ctx.fillStyle = `rgba(90,90,100,${Math.min(.6, k * .5)})`; ctx.beginPath(); ctx.arc(x + 20 + j * 8, y - 40 - j * 26 - k * 10, 16 + j * 6, 0, 7); ctx.fill(); } popAt(ctx, x, y + 60, k, () => { ctx.font = PRINT(20); const w = ctx.measureText(l).width + 24; K.card(ctx, x - w / 2, y + 42, w, 36, '#fff', 8); txt(ctx, l, x, y + 60, PRINT(20)); }); });
    for (let i = 0; i < 2; i++) { const k = ((lt * .35 + i * .5) % 1); ctx.save(); ctx.translate(lerp(300, 900, k), 150 + i * 40); sh(ctx, c => { c.moveTo(18, 0); c.lineTo(-12, -10); c.lineTo(-6, 0); c.lineTo(-12, 10); c.closePath(); }, '#4a4e56', 3); ctx.restore(); }
    popAt(ctx, 640, 650, at(149.88), () => { K.card(ctx, 380, 612, 520, 76, P.red, 16); txt(ctx, 'the peace fell apart', 640, 650, HAND(700, 38), '#fff'); });
    txt(ctx, 'illustration', 1240, 700, PRINT(16), '#6a5a48', 'right');
    chapterTab(ctx, 6, 'The second shock', lt, 4.0);
    K.source(ctx, 'Source: Al Jazeera (Jul 9, 2026)', at(153));
  }
  function q2(ctx, lt, dur, t) { // July 8: the President said the truce was "over"; the U.S. resumed strikes
    const T0 = 160.3, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#cfdcf0', '#f2f6fc');
    bean(ctx, 320, 700, 1.05, t, Object.assign({}, TRUMP, { armR: [2.0, .4], face: { mouth: 'frown', brows: 'angry', look: [.6, 0] } }));
    popAt(ctx, 320, 110, at(160.46), () => { K.card(ctx, 190, 72, 260, 76, P.yellow, 16); txt(ctx, 'July 8, 2026', 320, 110, HAND(700, 38)); });
    const flip = clamp(at(162.53) / .4); ctx.save(); ctx.translate(860, 330); ctx.scale(1, Math.abs(Math.cos(flip * Math.PI))); sh(ctx, c => c.roundRect(-220, -110, 440, 220, 20), flip < .5 ? P.green : P.red, 6); txt(ctx, 'TRUCE', 0, -30, HAND(700, 56), '#fff'); txt(ctx, flip < .5 ? 'on' : '"over"', 0, 40, HAND(700, 56), '#fff'); ctx.restore();
    if (at(164.2) > 0) popAt(ctx, 860, 560, at(164.2), () => { K.card(ctx, 680, 526, 360, 68, '#1f1c1a', 14, 0); txt(ctx, 'U.S. strikes resume', 860, 560, HAND(700, 34), '#fff'); });
    K.source(ctx, 'Source: Al Jazeera (Jul 9, 2026)', at(161));
  }
  function q3(ctx, lt, dur, t) { // mid-August: the 60-day ceasefire expired with no deal; oil back above $90, then around $100
    const T0 = 165.27, at = s => lt - (s - T0);
    K.bg.white(ctx);
    const left = Math.max(0, 60 - Math.floor(clamp(at(165.76) / 1.6) * 60)); Pr.calendar(ctx, 250, 520, .9, 'CEASEFIRE', String(left), { bigSize: 110, head: P.red }); txt(ctx, 'days left', 250, 560, PRINT(24));
    if (at(168.48) > 0) K.stamp(ctx, 'NO DEAL', 250, 160, at(168.48), { color: P.red, size: 50, rot: -.06 });
    Tn.line(ctx, [[520, 140], [520, 600], [1180, 600]], 5, INK);
    const yv = v => 600 - (v - 60) * 9; [[70, '$70'], [90, '$90'], [100, '$100']].forEach(([v, l]) => { ctx.setLineDash([8, 8]); Tn.line(ctx, [[520, yv(v)], [1180, yv(v)]], 2, '#c9ced6'); ctx.setLineDash([]); txt(ctx, l, 480, yv(v), PRINT(20), '#6a7380'); });
    const k1 = clamp(at(170.68) / .8), k2 = clamp(at(172.56) / .8);
    if (k1 > 0) Tn.line(ctx, [[580, yv(72)], [lerp(580, 820, k1), lerp(yv(72), yv(92), k1)]], 7, P.red);
    if (k2 > 0) Tn.line(ctx, [[820, yv(92)], [lerp(820, 1080, k2), lerp(yv(92), yv(100), k2)]], 7, P.red);
    if (k1 >= 1) txt(ctx, 'above $90 (Sep 1)', 820, yv(92) - 30, PRINT(20), P.red);
    if (k2 >= 1) txt(ctx, '~$100 (mid-Sep)', 1080, yv(100) - 30, PRINT(20), P.red);
    K.source(ctx, 'Sources: Al Jazeera (Sep 1, 2026); AAA (Sep 17, 2026)', at(167));
  }
  function q4(ctx, lt, dur, t) { // September got worse: AAA said Labor Day travelers faced "the highest gas prices ever for this time of year"
    const T0 = 174.11, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 540, W, 180); ctx.fillStyle = '#6c717b'; ctx.fillRect(0, 580, W, 100); for (let x = (lt * 200) % 80 - 80; x < W; x += 80) { ctx.fillStyle = '#fff'; ctx.fillRect(W - x, 626, 40, 6); }
    car(ctx, 640, 690, 1.1, P.blue); for (let i = 0; i < 3; i++) sh(ctx, c => c.roundRect(560 + i * 50, 520, 44, 30, 6), [P.yellow, P.red, P.green][i], 3);
    if (IMG.aaa) K.logo(ctx, 'aaa', 200, 140, 110, at(177.26), { pad: 6 });
    quoteCard(ctx, 760, 220, 700, ['"the highest gas prices ever', 'for this time of year"'], at(179.61), { size: 40, lh: 52, red: [0] });
    popAt(ctx, 200, 300, at(177.92), () => { K.card(ctx, 90, 266, 220, 68, P.yellow, 14); txt(ctx, 'Labor Day', 200, 300, HAND(700, 36)); });
    K.source(ctx, 'Source: AAA (Sep 3, 2026)', at(178));
  }
  function truck(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-260, -200, 340, 170), '#fff', 5); txt(ctx, 'GROCERIES', -90, -130, HAND(700, 44), P.green); for (let i = 0; i < 4; i++) sh(ctx, c => c.arc(-200 + i * 50, -70, 16, 0, 7), [P.red, P.yellow, P.green, P.orange][i], 3);
    sh(ctx, c => { c.moveTo(80, -30); c.lineTo(80, -150); c.lineTo(170, -150); c.lineTo(220, -90); c.lineTo(220, -30); c.closePath(); }, P.blue, 5); sh(ctx, c => c.rect(110, -135, 60, 40), '#bfe6ff', 3);
    for (const wx of [-200, -100, 170]) { sh(ctx, c => c.arc(wx, -26, 30, 0, 7), INK, 0); sh(ctx, c => c.arc(wx, -26, 12, 0, 7), '#c9ced6', 3); } ctx.restore(); }
  function q5(ctx, lt, dur, t) { // Sep 22: diesel $6.53, an all-time national record, beating the post-Ukraine-invasion peak; diesel moves trucks, trains, farm equipment
    const T0 = 183.22, at = s => lt - (s - T0), uses = at(192.96) > 0;
    K.bg.white(ctx);
    if (!uses) {
      Tn.line(ctx, [[220, 140], [220, 600], [1100, 600]], 5, INK);
      const yv = v => 600 - (v - 3) * 120; [[3.67, 'pre-war $3.67'], [6.53, '$6.53']].forEach(([v, l]) => { ctx.setLineDash([8, 8]); Tn.line(ctx, [[220, yv(v)], [1100, yv(v)]], 2, '#c9ced6'); ctx.setLineDash([]); txt(ctx, l, 210, yv(v), PRINT(20), '#6a7380', 'right'); });
      // the 2022 record line (shown without a number), then 2026 bursts through it
      const y22 = yv(5.82); ctx.setLineDash([14, 8]); Tn.line(ctx, [[220, y22], [1100, y22]], 4, P.orange); ctx.setLineDash([]); txt(ctx, 'old record (2022, after Russia invaded Ukraine)', 500, y22 + 24, PRINT(20), P.orange);
      const k = clamp(at(185.5) / 1.4); if (k > 0) { sh(ctx, c => c.rect(840, lerp(600, yv(6.53), out(k)), 160, 600 - lerp(600, yv(6.53), out(k))), P.red, 5); if (k >= 1) { K.slam(ctx, '$6.53', 920, yv(6.53) - 40, at(186.9), 60, P.red); } }
      if (at(188.02) > 0) K.stamp(ctx, 'ALL-TIME RECORD', 540, 400, at(188.02), { color: P.red, size: 40, rot: -.06 });
      popAt(ctx, 920, 640, at(183.38), () => txt(ctx, 'Sep 22, 2026 · diesel', 920, 640, PRINT(22)));
      K.source(ctx, 'Sources: AAA (Oct 6, 2026); Al Jazeera (Sep 4, 2026); pre-war: Al Jazeera (Sep 7)', at(184));
      return;
    }
    K.bg.sky(ctx); ctx.fillStyle = '#d9b36a'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    truck(ctx, 330, 640, .8);
    if (at(194.3) > 0) popAt(ctx, 760, 560, at(194.3), () => { sh(ctx, c => c.rect(640, 470, 240, 110), '#3b7dd8', 5); for (let i = 0; i < 4; i++) sh(ctx, c => c.rect(660 + i * 52, 490, 36, 30), '#bfe6ff', 3); for (const wx of [680, 840]) sh(ctx, c => c.arc(wx, 590, 18, 0, 7), INK, 0); });
    if (at(195.43) > 0) popAt(ctx, 1060, 560, at(195.43), () => { sh(ctx, c => c.rect(980, 470, 140, 90), P.green, 5); sh(ctx, c => c.rect(1040, 430, 60, 50), '#bfe6ff', 4); sh(ctx, c => c.arc(1000, 580, 36, 0, 7), INK, 0); sh(ctx, c => c.arc(1110, 590, 22, 0, 7), INK, 0); });
    if (at(196.8) > 0) popAt(ctx, 640, 150, at(196.8), () => { K.card(ctx, 330, 110, 620, 80, P.yellow, 16); txt(ctx, 'shows up on almost everything you buy', 640, 150, HAND(700, 32)); });
  }
  function q6(ctx, lt, dur, t) { // September averaged $4.33 — the most expensive September on record, ~50¢ above the old record
    const T0 = 199.86, at = s => lt - (s - T0);
    K.bg.white(ctx);
    const col = (x, v, l, c0, s) => { const k = clamp(at(s) / 1.0), hgt = (v - 2) * 160 * out(k); sh(ctx, c => c.rect(x - 90, 600 - hgt, 180, hgt), c0, 5); if (k > .9) txt(ctx, '$' + v.toFixed(2), x, 600 - hgt - 34, HAND(700, 50), c0 === P.red ? P.red : INK); txt(ctx, l, x, 640, PRINT(24)); };
    col(460, 3.83, 'old record (Sept 2023)', '#9aa3ad', 199.93); col(820, 4.33, 'Sept 2026 average', P.red, 200.89);
    if (at(205.89) > 0) popAt(ctx, 1080, 260, at(205.89), () => { K.card(ctx, 960, 220, 240, 80, P.yellow, 16); txt(ctx, '+50¢', 1080, 260, HAND(700, 50)); });
    if (at(203.58) > 0) K.stamp(ctx, 'MOST EXPENSIVE SEPTEMBER', 640, 110, at(203.58), { color: P.red, size: 36, rot: -.04 });
    K.source(ctx, 'Source: AAA (Oct 6, 2026)', at(201));
  }
  function q7(ctx, lt, dur, t) { // Houthi forces attacked Saudi Arabia's East-West pipeline — a route around the strait — and it temporarily shut down
    const T0 = 208.18, at = s => lt - (s - T0);
    ctx.fillStyle = '#7fc4f0'; ctx.fillRect(0, 0, W, H);
    sh(ctx, c => { c.moveTo(180, 80); c.lineTo(1120, 60); c.lineTo(1160, 300); c.lineTo(1100, 560); c.lineTo(820, 680); c.lineTo(420, 660); c.lineTo(240, 420); c.closePath(); }, '#e8d9b5', 5);
    txt(ctx, 'SAUDI ARABIA', 680, 420, HAND(700, 50), '#8a6a3a'); txt(ctx, 'RED SEA', 110, 400, PRINT(24), '#1f4f7a'); txt(ctx, 'GULF', 1210, 200, PRINT(24), '#1f4f7a');
    const k = clamp(at(212.18) / 1.0); Tn.line(ctx, [[1080, 220], [lerp(1080, 300, k), lerp(220, 330, k)]], 12, '#4a4e56'); Tn.line(ctx, [[1080, 220], [lerp(1080, 300, k), lerp(220, 330, k)]], 6, '#9aa3ad');
    if (k >= 1) { txt(ctx, 'East-West pipeline', 690, 230, PRINT(26), INK); popAt(ctx, 1080, 220, 1, () => sh(ctx, c => c.arc(1080, 220, 12, 0, 7), INK, 0)); popAt(ctx, 300, 330, 1, () => sh(ctx, c => c.arc(300, 330, 12, 0, 7), INK, 0)); }
    if (at(210.8) > 0) { const f = Math.exp(-at(210.8) * 1.2); ctx.fillStyle = `rgba(255,170,60,${.8 * f + .1})`; ctx.beginPath(); ctx.arc(560, 290, 30 + 30 * (1 - f), 0, 7); ctx.fill(); }
    if (at(216.75) > 0) { sh(ctx, c => c.roundRect(620, 260, 60, 60, 10), P.red, 4); Tn.line(ctx, [[630, 290], [670, 290]], 8, '#fff'); K.stamp(ctx, 'SHUT (TEMPORARILY)', 640, 560, at(216.75), { color: P.red, size: 40, rot: -.05 }); }
    if (at(213.62) > 0) txt(ctx, 'a main route around the strait', 640, 140, HAND(700, 34), INK, 'center', clamp(at(213.62) / .3));
    txt(ctx, 'schematic', 1240, 700, PRINT(16), '#1f4f7a', 'right');
    K.source(ctx, 'Source: ABC News (Oct 8, 2026)', at(211));
  }
  function q8(ctx, lt, dur, t) { // Sep 16: the Fed raised rates for the first time since 2023, to 3.75%–4% — the war showed up twice: at the pump and on your card and mortgage
    const T0 = 218.32, at = s => lt - (s - T0), twice = at(229.49) > 0;
    K.bg.color(ctx, '#eef3ff');
    if (!twice) {
      K.logo(ctx, 'fed', 260, 300, 220, at(221.59), { card: false });
      popAt(ctx, 260, 110, at(220.09), () => { K.card(ctx, 120, 72, 280, 76, P.yellow, 16); txt(ctx, 'Sep 16, 2026', 260, 110, HAND(700, 38)); });
      sh(ctx, c => c.arc(840, 420, 200, Math.PI, 0), '#fff', 6); for (let j = 0; j <= 8; j++) { const a = Math.PI + j / 8 * Math.PI; Tn.line(ctx, [[840 + Math.cos(a) * 170, 420 + Math.sin(a) * 170], [840 + Math.cos(a) * 196, 420 + Math.sin(a) * 196]], 4, INK); }
      const a = Math.PI * (1.35 + .3 * out(clamp(at(222.36) / .8))); Tn.line(ctx, [[840, 420], [840 + Math.cos(a) * 160, 420 + Math.sin(a) * 160]], 10, P.red); sh(ctx, c => c.arc(840, 420, 16, 0, 7), INK, 0);
      txt(ctx, 'interest rates', 840, 470, PRINT(28));
      if (at(225.96) > 0) popAt(ctx, 840, 560, at(225.96), () => { K.card(ctx, 660, 520, 360, 80, P.red, 16); txt(ctx, '3.75%–4.00%', 840, 560, HAND(700, 44), '#fff'); });
      if (at(223.39) > 0) txt(ctx, 'first hike since 2023', 840, 170, HAND(700, 36), INK, 'center', clamp(at(223.39) / .3));
      K.source(ctx, 'Source: Central Banking (Sep 16, 2026)', at(222));
      return;
    }
    popAt(ctx, 640, 80, at(229.49), () => { K.card(ctx, 400, 42, 480, 76, P.yellow, 16); txt(ctx, 'the war showed up twice', 640, 80, HAND(700, 36)); });
    popAt(ctx, 360, 380, at(231.44), () => { pump(ctx, 360, 520, 1.0, '$4.36'); txt(ctx, 'once at the pump', 360, 580, HAND(700, 32)); });
    popAt(ctx, 920, 380, at(232.71), () => { sh(ctx, c => c.roundRect(760, 260, 220, 140, 16), P.blue, 5); sh(ctx, c => c.rect(760, 290, 220, 26), INK, 0); K.house(ctx, 1080, 400, .5); Pr.tag(ctx, 1080, 220, .7, '% ↑', 1, { color: '#ffd6d0' }); txt(ctx, 'again on your card & mortgage', 920, 470, HAND(700, 30)); });
  }

  const SH = [[0, 7.26, p1], [7.26, 14.39, p2], [14.39, 21.43, p3], [21.43, 28.53, p4], [28.53, 34.73, p5], [34.73, 50.47, p6], [50.47, 64.18, p7], [64.18, 74.02, p8], [74.02, 82.73, p9], [82.73, 93.29, p10], [93.29, 103.31, p11], [103.31, 120.45, p12], [120.45, 136.54, p13], [136.54, 149.54, p14],
    [149.54, 160.3, q1], [160.3, 165.27, q2], [165.27, 174.11, q3], [174.11, 183.22, q4], [183.22, 199.86, q5], [199.86, 208.18, q6], [208.18, 218.32, q7], [218.32, 235.0, q8]];
  const DUR = 235.0;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [.62, 4.31, 9.98, 18.82, 29.56, 36.06, 47.85, 50.63, 52.39, 54.57, 57.71, 58.19, 59.58, 62.49, 64.8, 74.26, 77.72, 85.37, 86.72, 87.98, 89.29, 103.81, 110.57, 116.45, 121.84, 123.38, 126.34, 128.6, 141.2, 143.43, 147.82,
    149.88, 155.6, 159.0, 160.46, 164.2, 177.26, 177.92, 179.61, 183.38, 194.3, 195.43, 196.8, 205.89, 220.09, 225.96, 229.49, 231.44, 232.71].map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[5.53, 'click'], [12.46, 'whoosh'], [15.17, 'swoosh'], [23.52, 'buzz'], [26.96, 'thud'], [31.69, 'buzz'], [45.94, 'stamp'], [71.64, 'stamp'], [80.03, 'rise'], [80.93, 'swoosh'], [97.4, 'tick'], [100.95, 'tick'], [108.25, 'swoosh'], [131.2, 'ding'], [141.91, 'click'],
    [149.54, 'scratch'], [149.7, 'thud'], [155.17, 'thud'], [158.62, 'thud'], [162.53, 'stamp'], [168.48, 'stamp'], [170.68, 'rise'], [185.5, 'rise'], [188.02, 'stamp'], [203.58, 'stamp'], [210.8, 'thud'], [216.75, 'stamp'], [222.36, 'tick'], [231.44, 'cash'], [232.71, 'cash']]
    .map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/gas-4.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofiUp' }, { t: 21.43, mood: 'lofi' }, { t: 28.53, mood: 'lofiDark' }, { t: 74.02, mood: 'lofi' }, { t: 136.54, mood: 'lofiUp' }, { t: 149.54, mood: 'lofiDark', fade: 1 }],
    images: { aaa: 'assets/gas/american-automobile-association.png', reuters: 'assets/gas/reuters.png', api: 'assets/gas/american-petroleum-institute-api.png', chevron: 'assets/gas/chevron.png', fed: 'assets/gas/federal-reserve-seal.png' },
    fonts: G.BizFont.load };
})(window);
