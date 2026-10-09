/* "The War That Put $4.36 Gas in Your Tank" — part 1: COLD OPEN + SETUP (voice: assets/audio/gas-1.mp3).
 * Shot plan: biz/PLAN-gas-1.md. Times are the narration's word times (pocketsphinx transcript). */
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

  // ================= COLD OPEN =================
  function a1(ctx, lt, dur, t) { // On February 26th, the average gallon of gas in America cost $2.98
    const T0 = 0, at = s => lt - (s - T0);
    ctx.save(); camZoom(ctx, drift(lt, dur, 1, 1.06), 640, 400);
    stationScene(ctx, lt, t, { pumpPrice: at(3.56) > 0 ? '$2.98' : null });
    // You at the pump: the nozzle hose runs from the pump to the car's fuel door
    // the hose runs from the pump into the car's fuel door; You waits beside the car
    Tn.line(ctx, [[860, 470], [880, 560], [846, 622]], 6, INK); sh(ctx, c => c.roundRect(832, 612, 34, 16, 5), '#2b2b2b', 3);
    bean(ctx, 1010, 690, .95, t, Object.assign({}, YOU, { armL: [.6, 1.2], face: { mouth: 'smile', brows: 'up', look: [-.6, .3] } }));
    ctx.restore();
    // the price board slides in from the left and flips to $2.98 on the word
    const bx = lerp(-200, 170, out(clamp(lt / .7)));
    const flip = at(3.56), digits = flip > 0 ? '$2.98' : ['$•.••', '$-.--'][Math.floor(t * 8) % 2];
    priceBoard(ctx, bx, 420, .95, digits, { date: at(.17) > 0 ? 'Feb 26, 2026' : '' });
    if (flip > 0 && flip < .4) { ctx.save(); ctx.globalAlpha = 1 - flip / .4; ctx.fillStyle = '#fff'; ctx.fillRect(bx - 140, 220, 280, 120); ctx.restore(); }
    K.source(ctx, 'Source: AAA national average (Feb 26, 2026)', at(2.3));
  }
  function tv(ctx, x, y, w, h, screen) { sh(ctx, c => c.roundRect(x - w / 2 - 16, y - h / 2 - 16, w + 32, h + 32, 16), '#24272e', 5); ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip(); ctx.translate(x - w / 2, y - h / 2); screen(ctx, w, h); ctx.restore(); Tn.line(ctx, [[x - 40, y + h / 2 + 16], [x - 70, y + h / 2 + 60]], 6, INK); Tn.line(ctx, [[x + 40, y + h / 2 + 16], [x + 70, y + h / 2 + 60]], 6, INK); }
  function a2(ctx, lt, dur, t) { // two days later, the United States and Israel launched strikes on Iran
    const T0 = 4.84, at = s => lt - (s - T0);
    ctx.fillStyle = '#e9e2d6'; ctx.fillRect(0, 0, W, H);
    // the station shop wall: a calendar flips 26 → 28, a TV breaks the news
    Pr.calendar(ctx, 220, 620, 1.0, 'FEB 2026', at(5.04) > .25 ? '28' : '26', { flip: clamp(at(5.04) / .5) < 1 ? clamp(at(5.04) / .5) : null, prevTop: 'FEB 2026', prevBig: '26', bigSize: 110 });
    if (at(5.32) > 0) popAt(ctx, 220, 200, at(5.32), () => { K.card(ctx, 80, 160, 280, 76, P.yellow, 16); txt(ctx, 'two days later', 220, 198, HAND(700, 40)); });
    tv(ctx, 800, 320, 720, 400, (c, w, h) => {
      // the war as a news illustration: night skyline, distant blasts and smoke, jets overhead; no people shown
      const tt = lt;
      c.fillStyle = Tn.grad(c, 0, 0, 0, h, [[0, '#0f1630'], [1, '#3a2a3a']]); c.fillRect(0, 0, w, h);
      for (let i = 0; i < 14; i++) { c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect((i * 97) % w, (i * 41) % 90 + 10, 2, 2); }
      const blasts = [[150, 1.2], [330, 2.0], [470, 2.8], [250, 3.6]];
      blasts.forEach(([bx, bt]) => { const k = tt - bt; if (k < 0) return; const f = Math.exp(-k * 1.6);
        c.fillStyle = `rgba(255,170,60,${.85 * f})`; c.beginPath(); c.arc(bx, 130, 34 + k * 30, 0, 7); c.fill(); c.fillStyle = `rgba(255,240,180,${f})`; c.beginPath(); c.arc(bx, 130, 14 + k * 8, 0, 7); c.fill();
        for (let j = 0; j < 4; j++) { const sy = 118 - k * 20 - j * 20; c.fillStyle = `rgba(90,90,100,${Math.min(.75, k * .6) * (1 - j * .15)})`; c.beginPath(); c.arc(bx + Math.sin(j + k) * 10 + j * 6, sy, 16 + j * 6 + k * 3, 0, 7); c.fill(); } });
      // city skyline silhouette (generic)
      c.fillStyle = '#0b0e1a'; [[0, 60], [40, 90], [90, 70], [130, 120], [170, 80], [220, 100], [260, 140], [300, 85], [350, 110], [400, 70], [450, 95], [500, 130], [550, 80], [600, 100]].forEach(([x, hh]) => c.fillRect(x, h - 104 - hh, 46, hh));
      c.beginPath(); c.arc(380, h - 174, 26, Math.PI, 0); c.fill(); c.fillRect(470, h - 230, 8, 100);
      // jets crossing the sky
      [[0, 60, .0], [1, 95, .9], [2, 50, 1.9]].forEach(([i, jy, jt]) => { const k = ((tt - jt) * .35) % 1.2; if (tt < jt || k > 1) return; const jx = lerp(-60, w + 60, k);
        c.save(); c.translate(jx, jy + i * 6); c.fillStyle = '#d6dbe3'; c.beginPath(); c.moveTo(22, 0); c.lineTo(-14, -5); c.lineTo(-20, -14); c.lineTo(-24, -14); c.lineTo(-20, 0); c.lineTo(-24, 14); c.lineTo(-20, 14); c.lineTo(-14, 5); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-24, 0); c.lineTo(-120, 0); c.stroke(); c.restore(); });
      // map inset with strike markers
      c.fillStyle = 'rgba(15,22,48,.85)'; c.fillRect(w - 170, 50, 150, 110); c.strokeStyle = '#9ad1ff'; c.lineWidth = 2; c.strokeRect(w - 170, 50, 150, 110);
      c.fillStyle = '#3a5a8f'; c.beginPath(); c.ellipse(w - 95, 100, 58, 36, -.2, 0, 7); c.fill(); txt(c, 'IRAN', w - 95, 96, PRINT(16), '#fff');
      [[-118, 88], [-80, 112], [-70, 86]].forEach(([dx, dy], i) => { if (tt < 1 + i * .8) return; c.fillStyle = P.red; c.beginPath(); c.arc(w + dx, dy, 5 + Math.sin(tt * 6 + i) * 1.5, 0, 7); c.fill(); });
      const live = at(6.12) > 0; c.fillStyle = P.red; c.fillRect(0, h - 104, w, 44); txt(c, 'BREAKING NEWS', 20, h - 82, PRINT(26), '#fff', 'left');
      c.fillStyle = '#fff'; c.fillRect(0, h - 60, w, 60);
      if (live) { const k = clamp(at(6.12) / .5); c.save(); c.beginPath(); c.rect(0, h - 60, w * k, 60); c.clip(); txt(c, 'U.S. and Israel launch strikes on Iran', 20, h - 30, PRINT(28), INK, 'left'); c.restore(); }
      txt(c, 'FEB 28, 2026', w - 20, 30, PRINT(22), '#9ad1ff', 'right'); txt(c, 'illustration', w - 20, h - 116, PRINT(14), 'rgba(255,255,255,.6)', 'right');
      if (Math.floor(t * 2) % 2) { c.fillStyle = P.red; c.beginPath(); c.arc(24, 30, 8, 0, 7); c.fill(); } txt(c, 'LIVE', 40, 30, PRINT(20), '#fff', 'left');
    });
    // You turns to watch, worried
    bean(ctx, 1180, 700, .75, t, Object.assign({}, YOU, { face: { mouth: at(7.11) > 0 ? 'o' : 'flat', brows: 'worried', look: [-.9, -.3] } }));
    K.source(ctx, 'Source: Encyclopaedia Britannica; NPR', at(6.2));
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

  function a3(ctx, lt, dur, t) { // five days later, a Reuters reporter asked the President about the price at the pump — "If they rise, they rise."
    const T0 = 9.86, at = s => lt - (s - T0), q = at(16.29) > 0;
    K.bg.studio(ctx, '#cfdcf0', '#f2f6fc');
    popAt(ctx, 200, 90, at(9.86), () => { K.card(ctx, 70, 52, 260, 76, P.yellow, 16); txt(ctx, 'Mar 5, 2026', 200, 90, HAND(700, 40)); });
    bean(ctx, 820, 700, 1.15, t, Object.assign({}, TRUMP, { armR: [q ? 1.6 : .3, .4], face: { mouth: q ? 'smile' : (Math.sin(t * 7) > 0 ? 'o' : 'flat'), brows: 'calm', look: [-.6, 0] } }));
    K.nameCard(ctx, 'President Donald Trump', null, 820, 110, at(12.34));
    // the reporter's mic with a Reuters flag
    const rep = bean(ctx, 250, 720, .9, t, Object.assign(Pr.extra(2), { armR: [2.0, .3], face: { mouth: 'flat', brows: 'up', look: [.8, -.2] } }));
    const mx = rep.hands.R[0] + 40, my = rep.hands.R[1] - 30; Tn.line(ctx, [[rep.hands.R[0], rep.hands.R[1]], [mx, my]], 8, INK); sh(ctx, c => c.ellipse(mx + 8, my - 10, 18, 24, .6, 0, 7), '#3a3e46', 4);
    if (IMG.reuters) { K.card(ctx, mx - 70, my + 6, 120, 40, '#fff', 6); ctx.drawImage(IMG.reuters, mx - 64, my + 10, 108, 31); }
    if (at(13.77) > 0 && !q) K.bubble(ctx, 'Gas prices?', 300, 260, 220, [330, 330], at(13.77), { size: 36 });
    if (q) K.bubble(ctx, '"If they rise, they rise."', 560, 220, 460, [700, 300], at(16.29), { size: 46 });
    K.source(ctx, 'Source: Reuters (Mar 5, 2026)', at(11.2));
  }
  function a4(ctx, lt, dur, t) { // they rose — by late May, gas was above $4 in every single state
    const T0 = 18.19, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f6efe4');
    const k = clamp(at(18.35) / 1.6), price = 2.98 + (4.56 - 2.98) * inout(k);
    gasSign(ctx, 200, 640, .8, '$' + price.toFixed(2), { date: k < 1 ? '' : 'May 21, 2026', glow: price > 4 ? '#ff6b5e' : '#ffd166' });
    tileMap(ctx, 470, 150, 64, clamp(at(20.61) / 2.2));
    if (at(22.37) > 0) popAt(ctx, 820, 90, at(22.37), () => { K.card(ctx, 560, 52, 520, 76, P.red, 16); txt(ctx, 'above $4 in every state', 820, 90, HAND(700, 40), '#fff'); });
    K.source(ctx, 'Source: AAA, via GoodCarBadCar (May 21, 2026)', at(20));
  }
  function truck(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-260, -200, 340, 170), '#fff', 5); txt(ctx, 'GROCERIES', -90, -130, HAND(700, 44), P.green); for (let i = 0; i < 4; i++) sh(ctx, c => c.arc(-200 + i * 50, -70, 16, 0, 7), [P.red, P.yellow, P.green, P.orange][i], 3);
    sh(ctx, c => { c.moveTo(80, -30); c.lineTo(80, -150); c.lineTo(170, -150); c.lineTo(220, -90); c.lineTo(220, -30); c.closePath(); }, P.blue, 5); sh(ctx, c => c.rect(110, -135, 60, 40), '#bfe6ff', 3);
    for (const wx of [-200, -100, 170]) { sh(ctx, c => c.arc(wx, -26, 30, 0, 7), INK, 0); sh(ctx, c => c.arc(wx, -26, 12, 0, 7), '#c9ced6', 3); } ctx.restore(); }
  function a5(ctx, lt, dur, t) { // diesel, the fuel that moves your groceries, later hit an all-time record
    const T0 = 23.91, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#8c929c'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    truck(ctx, lerp(-300, 520, out(clamp(lt / 1.2))), 640, 1.0);
    pump(ctx, 860, 600, 1.2, 'DIESEL'); 
    if (at(27.39) > 0) { const k = clamp(at(27.39) / .4); popAt(ctx, 1040, 300, at(27.39), () => { K.card(ctx, 940, 240, 220, 120, '#1f2630', 14, 0); txt(ctx, 'ALL-TIME', 1050, 280, PRINT(26), '#ffd166'); txt(ctx, 'RECORD', 1050, 322, HAND(700, 44), '#ff6b5e'); });
      ctx.save(); ctx.translate(1050, 410); ctx.rotate(-.05); sh(ctx, c => c.rect(-220 * k, -12, 440 * k, 24), P.yellow, 3); for (let i = -200; i < 200 * k; i += 40) sh(ctx, c => c.rect(i, -12, 20, 24), INK, 0); ctx.restore(); }
    K.source(ctx, 'Source: AAA (diesel record, Sep 2026)', at(27));
  }
  function a6(ctx, lt, dur, t) { // by the end of September, Gulf oil exports were back above pre-war (tanker tracking)
    const T0 = 29.18, at = s => lt - (s - T0);
    ctx.save(); camZoom(ctx, 1.0); gulfMap(ctx);
    const flow = at(34.96);
    for (let i = 0; i < 9; i++) { const k = flow > 0 ? ((flow * .12 + i / 9) % 1) : 0; if (flow <= 0 && i > 0) continue; const path = [[420, 260], [700, 360], [920, 395], [1080, 470], [1240, 560]];
      const u = k * (path.length - 1), j = Math.min(path.length - 2, Math.floor(u)), f = u - j, x = lerp(path[j][0], path[j + 1][0], f), y = lerp(path[j][1], path[j + 1][1], f);
      tanker(ctx, x, y, .55, Math.atan2(path[j + 1][1] - path[j][1], path[j + 1][0] - path[j][0])); }
    ctx.restore();
    if (at(29.4) > 0 && at(31.59) < 0) popAt(ctx, 640, 640, at(29.4), () => { K.card(ctx, 380, 600, 520, 80, '#fff', 16); txt(ctx, "the part that doesn't make sense", 640, 640, HAND(700, 34)); });
    if (at(36.96) > 0) popAt(ctx, 640, 650, at(36.96), () => { K.card(ctx, 330, 612, 620, 80, P.green, 16); txt(ctx, 'Gulf exports: back above pre-war', 640, 650, HAND(700, 38), '#fff'); });
    if (at(32.08) > 0) popAt(ctx, 1100, 90, at(32.08), () => { K.card(ctx, 960, 54, 280, 72, P.yellow, 16); txt(ctx, 'end of Sept 2026', 1100, 90, HAND(700, 34)); });
    K.source(ctx, 'Source: Kpler, via Reuters (Oct 5, 2026) · above pre-war on 14 days in Sept', at(33.4));
  }
  function a7(ctx, lt, dur, t) { // and you're still paying $4.36 a gallon — 46% more than before the first missile
    const T0 = 40.7, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff'); Tn.line(ctx, [[640, 0], [640, H]], 6, INK);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 638, H); ctx.clip(); ctx.translate(-120, 60); ctx.scale(.75, .75); gulfMap(ctx, { labels: false }); for (let i = 0; i < 4; i++) tanker(ctx, 700 + i * 120, 360 + i * 40, .8, .35); ctx.restore();
    popAt(ctx, 320, 640, at(40.7), () => { K.card(ctx, 110, 600, 420, 76, P.green, 16); txt(ctx, 'oil: flowing again ✓', 320, 638, HAND(700, 36), '#fff'); });
    gasSign(ctx, 960, 470, .8, '$4.36', { date: 'Oct 8, 2026', glow: '#ff6b5e' });
    bean(ctx, 1170, 700, .7, t, Object.assign({}, YOU, { face: { mouth: 'frown', brows: 'worried', look: [-.6, -.4] } }));
    K.slam(ctx, '+46%', 800, 560, at(43.82), 90, P.red);
    if (at(44.74) > 0) txt(ctx, 'vs. before the first missile', 800, 640, PRINT(24), INK, 'center', clamp(at(44.74) / .3));
    K.source(ctx, 'Source: AAA, via ABC News (Oct 8, 2026)', at(41.7));
  }
  function a8(ctx, lt, dur, t) { // where did the money go? who decided? why up in days but down in months?
    const T0 = 46.25, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    const Q = [[220, 46.42, 'where did the money go?'], [640, 48.17, 'who decided?'], [1060, 51.86, 'up fast, down slow?']];
    Q.forEach(([x, s, l], i) => { const k = at(s); if (k <= 0) return;
      popAt(ctx, x, 120, k, () => { K.card(ctx, x - 190, 80, 380, 80, i === 2 ? P.yellow : '#fff', 16); txt(ctx, l, x, 120, HAND(700, 32)); });
      if (i === 0) for (let j = 0; j < 6; j++) { const kk = ((k * .5 + j / 6) % 1); ctx.save(); ctx.translate(x - 100 + j * 40 + Math.sin(kk * 6 + j) * 20, 600 - kk * 380); ctx.rotate(kk * 4 + j); sh(ctx, c => c.roundRect(-30, -16, 60, 32, 5), '#7fcf7a', 3); txt(ctx, '$', 0, 1, HAND(700, 24), '#1f5c2a'); ctx.restore(); }
      if (i === 1) { sh(ctx, c => c.arc(x, 400, 120, Math.PI, 0), '#fff', 6); for (let j = 0; j <= 6; j++) { const a = Math.PI + j / 6 * Math.PI; Tn.line(ctx, [[x + Math.cos(a) * 100, 400 + Math.sin(a) * 100], [x + Math.cos(a) * 116, 400 + Math.sin(a) * 116]], 4, INK); } const a = Math.PI * (1.2 + .6 * inout(clamp(k / 2))); Tn.line(ctx, [[x, 400], [x + Math.cos(a) * 96, 400 + Math.sin(a) * 96]], 8, P.red); txt(ctx, 'YOUR PRICE', x, 440, PRINT(24)); const hx = x + Math.cos(a) * 70 + 30, hy = 400 + Math.sin(a) * 70 - 30; Tn.line(ctx, [[x + 260, 180], [hx, hy]], 22, INK); Tn.line(ctx, [[x + 260, 180], [hx, hy]], 15, '#3a3550'); sh(ctx, c => c.ellipse(hx, hy, 18, 14, 0, 0, 7), '#fff', 4); }
      if (i === 2) { rocket(ctx, x - 90, lerp(620, 260, out(clamp(k / .8))), .9); if (at(53.87) > 0) feather(ctx, x + 90 + Math.sin(t * 2) * 30, lerp(220, 560, clamp(at(53.87) / 4)), .9, Math.sin(t * 2) * .5); } });
  }
  function a9(ctx, lt, dur, t) { // that's what this video is about — title card
    K.bg.color(ctx, '#ffd76a'); ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let i = -4; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 90 + lt * 30, 0); ctx.lineTo(i * 90 + 300 + lt * 30, H); ctx.lineTo(i * 90 + 340 + lt * 30, H); ctx.lineTo(i * 90 + 40 + lt * 30, 0); ctx.fill(); }
    popAt(ctx, 640, 260, lt, () => { K.slam(ctx, 'THE WAR THAT PUT', 640, 200, 1, 72, INK, { stroke: '#fff' }); K.slam(ctx, '$4.36 GAS', 640, 300, 1, 110, P.red, { stroke: '#fff' }); K.slam(ctx, 'IN YOUR TANK', 640, 400, 1, 72, INK, { stroke: '#fff' }); });
    pump(ctx, 1120, 690, 1.0, '$4.36');
  }
  function a10(ctx, lt, dur, t) { // CTA 1: subscribe; a three-part series on who's winning this money war — this is part one
    const T0 = 57.56, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 300, 700, 1.1, t, [[T0, 'wave'], [59.8, 'present'], [66.5, 'pointSide'], [69.2, 'count']], { mouth: 'smile', brows: 'up', look: [.5, 0] });
    if (at(59.94) > 0) popAt(ctx, 860, 200, at(59.94), () => { K.card(ctx, 600, 150, 520, 100, '#fff', 18); txt(ctx, 'the money & power behind', 860, 185, PRINT(26)); txt(ctx, 'the headlines in your wallet', 860, 222, PRINT(26)); });
    // the small lower-third subscribe button (clicked on "subscribe")
    const click = at(66.67); popAt(ctx, 1080, 640, at(65.1), () => { const pressed = click > 0 && click < .25; sh(ctx, c => c.roundRect(960, 610 + (pressed ? 4 : 0), 240, 60, 30), click > 0 ? '#9aa3ad' : P.red, 4); txt(ctx, click > 0 ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 1080, 640 + (pressed ? 4 : 0), PRINT(26), '#fff'); });
    if (click > .1) { const cx = lerp(1260, 1110, out(clamp(click / .2))); sh(ctx, c => { c.moveTo(cx, 650); c.lineTo(cx, 690); c.lineTo(cx + 10, 680); c.lineTo(cx + 20, 696); c.lineTo(cx + 26, 692); c.lineTo(cx + 16, 677); c.lineTo(cx + 28, 676); c.closePath(); }, '#fff', 3); }
    [['PART 1', 'gas & the war', 1], ['PART 2', '?', 0], ['PART 3', '?', 0]].forEach(([a, b, on], i) => popAt(ctx, 640 + i * 200, 410, at(69.67) + i * .15, () => { K.card(ctx, 560 + i * 200, 340, 160, 140, on ? P.yellow : '#fff', 16); txt(ctx, a, 640 + i * 200, 380, PRINT(26)); txt(ctx, b, 640 + i * 200, 430, HAND(700, on ? 28 : 50), on ? INK : '#9aa3ad'); }));
    if (at(72.94) > 0) K.stamp(ctx, 'THIS ONE', 640, 520, at(72.94), { color: P.red, size: 34, rot: -.08 });
  }

  // ================= SETUP =================
  function b1(ctx, lt, dur, t) { // to understand your gas bill, you have to understand one narrow stretch of water
    const T0 = 74.82, at = s => lt - (s - T0), z = lerp(.45, 1.6, inout(clamp(at(76.89) / 2.4)));
    ctx.save(); camZoom(ctx, z, lerp(640, 930, inout(clamp(at(76.89) / 2.4))), lerp(360, 400, inout(clamp(at(76.89) / 2.4)))); gulfMap(ctx); ctx.restore();
    if (at(77.74) > 0) { popAt(ctx, 640, 120, at(77.74), () => { K.card(ctx, 400, 80, 480, 80, '#fff', 16); txt(ctx, 'one narrow stretch of water', 640, 120, HAND(700, 38)); }); }
    gasSign(ctx, 150, 700, .5, '$4.36', { glow: '#ff6b5e' });
  }
  function b2(ctx, lt, dur, t) { // the Strait of Hormuz, between Iran and Oman; the only sea route out of the Gulf; ~1/5 of the world's oil
    const T0 = 79.69, at = s => lt - (s - T0);
    gulfMap(ctx);
    if (at(80.29) > 0) { K.scribbleCircle(ctx, 935, 395, 70, 50, clamp(at(80.29) / .6), P.red, 6); popAt(ctx, 1080, 300, at(80.29), () => { K.card(ctx, 960, 262, 240, 76, P.red, 14); txt(ctx, 'Strait of Hormuz', 1080, 300, HAND(700, 30), '#fff'); }); }
    if (at(83.55) > 0) { K.arrow(ctx, [600, 330], [900, 395], clamp(at(83.55) / .6), INK, 6); txt(ctx, 'only sea route out', 600, 300, HAND(700, 30), INK, 'center', clamp(at(83.78) / .3)); }
    if (at(87.24) > 0) popAt(ctx, 240, 380, at(87.24), () => { K.card(ctx, 70, 300, 340, 160, '#fff', 18); txt(ctx, '~1/5', 240, 360, HAND(700, 70), P.red); txt(ctx, "of the world's oil", 240, 420, PRINT(24)); });
    K.source(ctx, 'Source: NPR (Mar 11 & Jun 15, 2026)', at(87));
  }
  function b3(ctx, lt, dur, t) { // Saudi, Iraqi, Kuwaiti, Emirati oil, Qatari gas — all through this one channel
    const T0 = 89.83, at = s => lt - (s - T0);
    gulfMap(ctx, { labels: false });
    const T = [['Saudi oil', 89.83, P.green], ['Iraqi oil', 90.96, '#b23a2e'], ['Kuwaiti oil', 92.08, '#3c6e8f'], ['Emirati oil', 93.3, '#6c757d'], ['Qatari gas', 94.62, P.purple]];
    T.forEach(([l, s, col], i) => { const k = at(s); if (k <= 0) return; const q = clamp((at(96.58) - i * .2) / 3), x = lerp(260 + i * 120, 860 + i * 25, inout(q)), y = lerp(230 + i * 50 + (i % 2) * 20, 370 + i * 6, inout(q));
      tanker(ctx, x, y, .8, .3, { hull: col }); popAt(ctx, x, y - 50, k, () => { ctx.font = PRINT(20); const w = ctx.measureText(l).width + 20; K.card(ctx, x - w / 2, y - 70, w, 34, '#fff', 8); txt(ctx, l, x, y - 53, PRINT(20)); }); });
    if (at(96.58) > 0) popAt(ctx, 640, 650, at(96.58), () => { K.card(ctx, 380, 612, 520, 76, P.yellow, 16); txt(ctx, 'all through this one channel', 640, 650, HAND(700, 36)); });
  }
  function pumpjack(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => { c.moveTo(-90, 0); c.lineTo(-10, -170); c.lineTo(70, 0); }, null, 8, INK); sh(ctx, c => c.rect(-130, -10, 280, 20), '#6b6f78', 4);
    const a = Math.sin(t * 2) * .25; ctx.save(); ctx.translate(-10, -170); ctx.rotate(a); sh(ctx, c => c.roundRect(-150, -14, 280, 28, 8), P.orange, 5); sh(ctx, c => { c.moveTo(-150, -40); c.quadraticCurveTo(-200, 0, -150, 40); c.closePath(); }, P.orange, 5); ctx.restore();
    Tn.line(ctx, [[-10 - Math.cos(a) * 165, -170 - Math.sin(a) * 165], [-175, -10]], 4, INK); ctx.restore(); }
  function b4(ctx, lt, dur, t) { // wait, doesn't America produce its own oil? We do — more than anyone
    const T0 = 99.38, at = s => lt - (s - T0), yes = at(103.49) > 0;
    if (!yes) { K.bg.studio(ctx, '#cfe6ff', '#f2f8ff'); host(ctx, 400, 700, 1.15, t, [[T0, 'think'], [101.3, 'shrug']], { mouth: 'flat', brows: 'skeptic', look: [.5, -.2] }); K.bubble(ctx, "doesn't America make its own oil?", 900, 230, 440, [600, 300], at(100.3), { size: 34 }); return; }
    K.bg.sky(ctx); ctx.fillStyle = '#d9b36a'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    pumpjack(ctx, 640, 600, 1.4, t);
    if (at(105.21) > 0) popAt(ctx, 960, 220, at(105.21), () => { sh(ctx, c => c.arc(960, 200, 80, 0, 7), P.yellow, 6); txt(ctx, '#1', 960, 200, HAND(700, 70)); sh(ctx, c => { c.moveTo(920, 270); c.lineTo(900, 360); c.lineTo(940, 330); c.closePath(); }, P.red, 4); sh(ctx, c => { c.moveTo(1000, 270); c.lineTo(1020, 360); c.lineTo(980, 330); c.closePath(); }, P.red, 4); });
    popAt(ctx, 300, 120, at(103.49), () => { K.card(ctx, 160, 80, 280, 80, '#fff', 16); txt(ctx, 'We do.', 300, 120, HAND(700, 50)); });
  }
  function barrels(ctx, x, base, v, col, lt) { const n = Math.round(v), h = 34; for (let i = 0; i < n * clamp(lt / 1.0); i++) { const y = base - i * h; sh(ctx, c => c.roundRect(x - 50, y - h, 100, h - 2, 6), col, 3); Tn.line(ctx, [[x - 50, y - h / 2], [x + 50, y - h / 2]], 2, 'rgba(0,0,0,.25)'); } return base - n * h * clamp(lt / 1.0); }
  function b5(ctx, lt, dur, t) { // 2025: 13.6M b/d, a record, ~40% more than Russia or Saudi Arabia
    const T0 = 107.0, at = s => lt - (s - T0);
    K.bg.white(ctx);
    popAt(ctx, 640, 70, at(107.1), () => { K.card(ctx, 380, 32, 520, 76, '#fff', 16); txt(ctx, 'crude oil output, million barrels a day', 640, 70, PRINT(24)); });
    const B3 = [[400, 13.6, 'U.S. (2025)', P.blue, 109.58], [640, 9.9, 'Russia (2024)*', '#9aa3ad', 114.14], [880, 9.6, 'Saudi Arabia (2025)', '#9aa3ad', 114.82]];
    B3.forEach(([x, v, l, col, s]) => { const k = at(s); if (k <= 0) return; const top = barrels(ctx, x, 640, v, col, k); txt(ctx, l, x, 670, PRINT(22)); if (k > 1) txt(ctx, v.toFixed(1), x, top - 26, HAND(700, 44), col === P.blue ? P.blue : INK); });
    if (at(111.98) > 0) K.stamp(ctx, 'RECORD', 230, 300, at(111.98), { color: P.red, size: 40, rot: -.08 });
    if (at(113.11) > 0) popAt(ctx, 1110, 300, at(113.11), () => { K.card(ctx, 990, 250, 240, 100, P.yellow, 16); txt(ctx, '~40% more', 1110, 300, HAND(700, 40)); });
    txt(ctx, '*Russia: 2024 figure, "largely unchanged" in 2025', 1240, 700, PRINT(18), '#6a7380', 'right');
    K.source(ctx, 'Source: U.S. EIA (Jul 9, 2026)', at(108));
  }
  function b6(ctx, lt, dur, t) { // the catch: oil sells on a global market at a global price — Tokyo or Berlin will pay more
    const T0 = 116.33, at = s => lt - (s - T0), auction = at(119.76) > 0;
    if (!auction) { K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
      for (const px of [560, 720]) Tn.line(ctx, [[px, 600], [px, 380]], 8, '#7a5233'); sh(ctx, c => c.roundRect(420, 200, 440, 200, 16), '#fff', 6); txt(ctx, 'WE MAKE OUR', 640, 260, HAND(700, 50), P.blue); txt(ctx, 'OWN OIL!', 640, 330, HAND(700, 64), P.red);
      popAt(ctx, 640, 100, at(116.84), () => { K.card(ctx, 420, 60, 440, 80, P.yellow, 16); txt(ctx, 'the catch on the sign…', 640, 100, HAND(700, 38)); }); return; }
    K.bg.color(ctx, '#f3ead8'); sh(ctx, c => c.rect(0, 560, W, 160), '#b07a48', 5);
    // a Texas barrel on the auction block
    sh(ctx, c => c.rect(520, 440, 240, 120), '#8a5a36', 5); sh(ctx, c => c.roundRect(570, 300, 140, 150, 16), '#2b2b2b', 5); for (const yy of [340, 410]) Tn.line(ctx, [[570, yy], [710, yy]], 4, '#555'); txt(ctx, 'TEXAS', 640, 375, PRINT(26), '#fff');
    const bid = at(125.89) > 0 ? lerp(70, 115, clamp(at(125.89) / 4.5)) : 70; Pr.tag(ctx, 640, 240, 1.1, '$' + Math.round(bid), 1, { color: bid > 90 ? '#ffd6d0' : '#fff' });
    [['Tokyo', 230, 128.79], ['Berlin', 1050, 129.86]].forEach(([l, x, s], i) => { const up = at(s) > 0; const p = bean(ctx, x, 700, .9, t, Object.assign(Pr.extra(i + 3), { top: 'suit', body: i ? '#2f3a55' : '#5a3fb0', armR: up && !i ? [2.6, 0] : [.2, .2], armL: up && i ? [2.6, 0] : [.2, .2], face: { mouth: up ? 'o' : 'flat', brows: 'up', look: [i ? -.8 : .8, -.2] } }));
      popAt(ctx, x, 280, at(s - .5), () => { K.card(ctx, x - 90, 250, 180, 56, '#fff', 12); txt(ctx, 'buyer: ' + l, x, 278, PRINT(22)); });
      if (up) { const hx = i ? p.hands.L[0] : p.hands.R[0], hy = i ? p.hands.L[1] : p.hands.R[1]; sh(ctx, c => c.roundRect(hx - 30, hy - 60, 60, 46, 6), '#fff', 3); txt(ctx, 'MORE!', hx, hy - 37, PRINT(16), P.red); } });
    popAt(ctx, 640, 70, at(119.76), () => { K.card(ctx, 360, 32, 560, 76, P.yellow, 16); txt(ctx, 'a global market, a global price', 640, 70, HAND(700, 36)); });
    txt(ctx, 'illustration', 1240, 700, PRINT(18), '#8a7a66', 'right');
  }
  function b7(ctx, lt, dur, t) { // producing your own oil isn't the same as controlling its price — keep that in mind
    const T0 = 132.38, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 360, 700, 1.15, t, [[T0, 'present'], [135.09, 'pointUp'], [136.7, 'presentBoth']], { mouth: 'flat', brows: 'up', look: [.5, 0] });
    popAt(ctx, 880, 330, at(132.6), () => { ctx.save(); ctx.translate(880, 330); ctx.rotate(.04); sh(ctx, c => c.rect(-220, -150, 440, 300), P.yellow, 5); sh(ctx, c => c.rect(-60, -165, 120, 34), 'rgba(255,255,255,.7)', 0); txt(ctx, 'PRODUCE', 0, -70, HAND(700, 56)); txt(ctx, '≠', 0, -5, HAND(700, 70), P.red); txt(ctx, 'CONTROL THE PRICE', 0, 70, HAND(700, 40)); ctx.restore(); });
    if (at(135.38) > 0) txt(ctx, 'keep that in mind…', 880, 560, HAND(700, 38), INK, 'center', clamp(at(135.38) / .3));
  }

  const SH = [[0, 4.84, a1], [4.84, 9.86, a2], [9.86, 18.19, a3], [18.19, 23.91, a4], [23.91, 29.18, a5], [29.18, 40.7, a6], [40.7, 46.25, a7], [46.25, 55.62, a8], [55.62, 57.56, a9], [57.56, 74.82, a10],
    [74.82, 79.69, b1], [79.69, 89.83, b2], [89.83, 99.38, b3], [99.38, 107.0, b4], [107.0, 116.33, b5], [116.33, 132.38, b6], [132.38, 139.31, b7]];
  const DUR = 139.31;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [.17, 5.32, 9.86, 12.34, 13.77, 22.37, 29.4, 32.08, 36.96, 40.7, 46.42, 48.17, 51.86, 59.94, 65.1, 69.67, 69.82, 69.97, 77.74, 80.29, 87.24, 89.83, 90.96, 92.08, 93.3, 94.62, 96.58, 103.49, 105.21, 107.1, 113.11, 116.84, 119.76, 128.3, 129.36, 132.6]
    .map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[3.56, 'ding'], [5.04, 'paper'], [6.12, 'buzz'], [7.75, 'thud'], [16.29, 'thud'], [18.35, 'rise'], [20.61, 'type'], [27.39, 'stamp'], [34.96, 'whoosh'], [43.82, 'thud'], [52.92, 'rise'], [54.3, 'swoosh'], [55.62, 'thud'], [66.67, 'click'], [72.94, 'stamp'],
    [76.89, 'whoosh'], [80.29, 'ding'], [96.58, 'swoosh'], [105.21, 'ding'], [109.58, 'tick'], [111.98, 'stamp'], [114.14, 'tick'], [114.82, 'tick'], [125.89, 'cash'], [128.79, 'ding'], [129.86, 'ding'], [134.14, 'buzz']].map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/gas-1.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofi' }, { t: 4.84, mood: 'lofiDark', fade: 2 }, { t: 57.56, mood: 'lofiUp' }, { t: 74.82, mood: 'lofi' }],
    images: { aaa: 'assets/gas/american-automobile-association.png', reuters: 'assets/gas/reuters.png' },
    fonts: G.BizFont.load };
})(window);
