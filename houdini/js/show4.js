/* Part 4 — "Debunking Becomes the Act", "The Last Ten Days", "Did the Punch Kill Him?".
 * Every shot is keyed to a word anchor in window.T4 (seconds into narration-part4.mp3), written by
 * tools/align-part4.py. Shared set pieces come from js/show3.js (G.Part3A.lib) and the opening
 * (water cell, casket descent, minute counter, hospital room). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Ch = G.Chars, L3 = G.Part3A.lib;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const A = G.T4, INK = FX.INK, fig = FX.fig;
  const at = k => A[k], since = (t, k) => t - A[k];
  const { chapter, frame, label, parlour, newspaper, slam, bubble, cross, tick, ring, houdini, cast, breathe, blink, RED, PAPER } = L3;
  const GOLD = '#f6c945';
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  const chapterFor = (ctx, text, lt, hold = 2.4) => { if (lt < hold) chapter(ctx, text, lt); else if (lt < hold + .3) { ctx.save(); ctx.globalAlpha = 1 - (lt - hold) / .3; chapter(ctx, text, lt); ctx.restore(); } };
  const whitehead = (o = {}) => cast('young', 'sweater', o);
  function stageSet(ctx) {
    shape(ctx, '#7a2621', 0, rect(-600, -500, 2500, 1140));
    for (let x = -600; x < 1900; x += 78) { shape(ctx, '#5f1b17', 0, rect(x + 22, -500, 22, 1140)); shape(ctx, '#943229', 0, rect(x + 52, -500, 8, 1140)); }
    shape(ctx, '#5a4231', 0, rect(-600, 640, 2500, 400)); line(ctx, [[-600, 640], [1900, 640]], 4, 'rgba(0,0,0,.45)');
    glow(ctx, 640, 420, 420, 'rgba(255,220,160,.28)');
  }
  function mapBase(ctx) { // north-east US + south-east Canada, paper map
    shape(ctx, '#9fc3cf', 0, rect(-400, -300, 2100, 1300));
    shape(ctx, '#e8dcbc', 4, smooth([[-300, -200], [1500, -200], [1500, 120], [1240, 200], [1180, 300], [1100, 340], [1000, 420], [940, 520], [860, 620], [820, 760], [-300, 760]]));
    for (const [x, y, rx, ry, r] of [[300, 330, 150, 40, -.3], [420, 240, 120, 34, .1], [200, 420, 60, 110, .2], [560, 300, 110, 26, -.1]]) shape(ctx, '#9fc3cf', 3, c => c.ellipse(x, y, rx, ry, r, 0, Math.PI * 2));
    line(ctx, [[-300, 230], [620, 260], [760, 170], [1240, 120]], 3, 'rgba(120,80,40,.45)');
    txt(ctx, 'CANADA', 300, 120, FX.FONT(700, 22), 'rgba(80,60,40,.55)'); txt(ctx, 'UNITED STATES', 560, 560, FX.FONT(700, 22), 'rgba(80,60,40,.55)');
  }
  const pin = (ctx, x, y, k, name, dx = 20, dy = 30) => { if (k <= 0) return; const d = FX.dropBounce(k, 120, .3); shape(ctx, RED, 3, circle(x, y - d, 12)); line(ctx, [[x, y - d], [x, y - d + 22]], 3); if (name && k > .2) txt(ctx, name, x + dx, y + dy, FX.FONT(700, 22), INK, 'left'); };
  const route = (ctx, pts, k, color = RED) => { // dashed route drawn progressively through pts
    const segs = pts.length - 1, u = clamp(k) * segs; ctx.save(); ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.moveTo(...pts[0]);
    for (let i = 0; i < segs && i < u; i++) { const f = Math.min(1, u - i); ctx.lineTo(lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)); }
    ctx.lineWidth = 5; ctx.strokeStyle = color; ctx.stroke(); ctx.restore(); };
  function train(ctx, x, y, s, t, face = true) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#2a2a2e', 4, rect(-70, -34, 100, 50, 6)); shape(ctx, '#7a2621', 4, rect(-160, -40, 84, 56, 6)); shape(ctx, '#f1ead8', 3, rect(-146, -30, 50, 26, 3));
    if (face) { ctx.save(); ctx.beginPath(); ctx.rect(-146, -30, 50, 26); ctx.clip(); fig(ctx, -121, 90, .09, houdini({ face: { brows: 'worried', mouth: 'flat', look: [-.6, 0] } }), { mirror: true }); ctx.restore(); }
    shape(ctx, '#2a2a2e', 3.5, rect(10, -60, 18, 28, 3)); for (const wx of [-140, -96, -50, 6]) { ctx.save(); ctx.translate(wx, 20); ctx.rotate(t * 6); shape(ctx, '#1d1a17', 3, circle(0, 0, 12)); line(ctx, [[-10, 0], [10, 0]], 2.5, '#6a6a6a'); ctx.restore(); }
    ctx.restore();
    for (let i = 0; i < 4; i++) { const u = (t * 1.5 + i / 4) % 1; ctx.save(); ctx.globalAlpha = (1 - u) * .6; shape(ctx, '#f6f6f2', 0, circle(x + (20 - u * 90) * s, y + (-90 - u * 50) * s, (12 + u * 22) * s)); ctx.restore(); }
  }
  // a reclining Houdini on the dressing-room couch (head to the left); returns the stomach point in screen space
  function couch(ctx, x, y) {
    shape(ctx, '#6a3a3a', 5, c => c.roundRect(x - 260, y - 150, 520, 120, 30)); shape(ctx, '#7a4646', 5, c => c.roundRect(x - 290, y - 50, 580, 90, 24));
    shape(ctx, '#6a3a3a', 5, c => c.roundRect(x - 300, y - 120, 60, 170, 26)); shape(ctx, '#6a3a3a', 5, c => c.roundRect(x + 240, y - 120, 60, 170, 26));
    for (const dx of [-250, 250]) shape(ctx, '#3a2420', 4, rect(x + dx - 10, y + 40, 20, 40, 4));
  }
  const RECLINE = -1.32;
  const stomachAt = (fx, fy, s, rot = RECLINE) => { const p = [0, -700]; return [fx + (p[0] * Math.cos(rot) - p[1] * Math.sin(rot)) * s, fy + (p[0] * Math.sin(rot) + p[1] * Math.cos(rot)) * s]; };
  function dressingRoom(ctx) {
    shape(ctx, '#5a4a52', 0, rect(-400, -300, 2100, 1000));
    for (let x = -400; x < 1700; x += 70) shape(ctx, '#544450', 0, rect(x, -300, 30, 1000));
    shape(ctx, '#4a3628', 0, rect(-400, 620, 2100, 400)); line(ctx, [[-400, 620], [1700, 620]], 4, 'rgba(0,0,0,.4)');
    // make-up mirror with bulbs + table
    shape(ctx, '#e3d9c4', 5, rect(860, 120, 300, 230, 6)); shape(ctx, '#9aa8b0', 0, rect(876, 136, 268, 198));
    for (let i = 0; i < 6; i++) { shape(ctx, '#fff1c4', 2.5, circle(876 + i * 53.6, 112, 11)); glow(ctx, 876 + i * 53.6, 112, 30, 'rgba(255,240,190,.35)'); }
    shape(ctx, '#6b4f39', 5, rect(840, 350, 340, 26, 4)); shape(ctx, '#5a3e2a', 4, rect(860, 376, 300, 120));
    // door (opens for the students)
    shape(ctx, '#3a2a22', 5, rect(40, 180, 200, 440, 4));
  }
  function appendixPanel(ctx, x, y, s, stage, k = 1) { // stage: 0 healthy, 1 blockage, 2 inflammation, 3 rupture, 4 peritonitis
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const peri = stage >= 4 ? k : 0;
    if (peri > 0) { ctx.save(); ctx.globalAlpha = .55 * peri; shape(ctx, '#c8463a', 0, c => c.ellipse(0, 20, 150, 130, 0, 0, Math.PI * 2)); ctx.restore(); }
    // caecum (start of the large intestine) with the appendix hanging below
    ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, -150); ctx.lineTo(-40, -10); ctx.quadraticCurveTo(-40, 40, 10, 40); ctx.quadraticCurveTo(60, 40, 60, -10); ctx.lineTo(60, -150);
    ctx.lineWidth = 92; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 80; ctx.strokeStyle = '#d99a86'; ctx.stroke();
    const sw = stage >= 2 ? (stage === 2 ? k : 1) : 0, red = sw;
    const w = 15 + sw * 10, col = `rgb(${Math.round(lerp(217, 200, red))},${Math.round(lerp(154, 70, red))},${Math.round(lerp(134, 58, red))})`;
    ctx.save(); ctx.translate(-10, 70); ctx.rotate(.25);
    shape(ctx, col, 5, c => c.roundRect(-w, 0, w * 2, 110 + sw * 14, w));
    if (stage >= 1) shape(ctx, '#6a4a2a', 3, circle(0, 22, 9 * (stage === 1 ? FX.settle(k) : 1)));              // the blockage
    if (stage >= 3) { const b = stage === 3 ? k : 1; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; line(ctx, [[Math.cos(a) * 10, 80 + Math.sin(a) * 10], [Math.cos(a) * (14 + 30 * b), 80 + Math.sin(a) * (14 + 30 * b)]], 6, '#8e2a22'); } shape(ctx, '#2a1410', 3, circle(0, 80, 9 * b)); }
    ctx.restore();
    if (stage === 2) for (let i = 0; i < 3; i++) { const u = (k * 2 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - u; ring(ctx, 10, 130, 40 + u * 40, 50 + u * 50, 1, '#e86a50'); ctx.restore(); }
    ctx.restore();
  }

  // ================= DEBUNKING BECOMES THE ACT =================
  function d1(ctx, lt, dur, t) { // the billing flips: exposing mediums becomes the main event
    const e = since(t, 'exposing'), f = ease.inOut(clamp(e / .6));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    shape(ctx, '#8a5a48', 0, rect(-400, -300, 2100, 1300));
    ctx.save(); ctx.strokeStyle = 'rgba(40,20,14,.35)'; ctx.lineWidth = 3; for (let y = -300; y < 1000; y += 34) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1700, y); ctx.stroke(); for (let x = -400 + ((y / 34) % 2) * 40; x < 1700; x += 80) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 34); ctx.stroke(); } } ctx.restore();
    ctx.save(); ctx.translate(640, 420); ctx.rotate(-.02);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-244, -264, 500, 540); shape(ctx, '#efe3c6', 4, rect(-250, -270, 500, 540, 3)); shape(ctx, RED, 0, rect(-230, -250, 460, 90));
    txt(ctx, 'HOUDINI', 0, -204, FX.DISPLAY(70), PAPER);
    txt(ctx, 'ESCAPES', 0, lerp(-90, 150, f), FX.DISPLAY(lerp(64, 28, f)));
    txt(ctx, f > .5 ? 'EXPOSES' : '+ exposing mediums', 0, lerp(180, -90, f), f > .5 ? FX.DISPLAY(lerp(30, 70, f)) : FX.FONT(700, 22), f > .5 ? RED : INK);
    if (f > .5) txt(ctx, 'FAKE MEDIUMS!', 0, -10, FX.DISPLAY(56 * f), RED);
    ctx.save(); ctx.beginPath(); ctx.rect(-90, 10, 180, 110); ctx.restore();
    ctx.restore();
    ctx.restore();
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, '1926');
    chapterFor(ctx, 'DEBUNKING BECOMES THE ACT', lt, 2.6);
  }
  function d2(ctx, lt, dur, t) { // February: Washington, D.C. — H.R. 8989
    const hr = since(t, 'hr'), b = since(t, 'bill'), dc = since(t, 'district');
    ctx.save(); cam(ctx, lerp(1, 1.15, ease.inOut(clamp(lt / 1.6))), lerp(640, 760, ease.inOut(clamp(lt / 1.6))), 440);
    mapBase(ctx);
    // Capitol dome icon at Washington
    const k = FX.settle(clamp((lt - .3) / .4)); ctx.save(); ctx.translate(800, 560); ctx.scale(k, k);
    shape(ctx, PAPER, 3.5, rect(-60, -20, 120, 40, 2)); shape(ctx, PAPER, 3.5, c => c.arc(0, -20, 34, Math.PI, 0)); shape(ctx, PAPER, 3, rect(-6, -70, 12, 18, 2)); for (let i = -2; i <= 2; i++) line(ctx, [[i * 22, -14], [i * 22, 16]], 3); ctx.restore();
    pin(ctx, 800, 620, lt - .2, 'WASHINGTON, D.C.', 30, 24);
    ctx.restore();
    if (hr > 0) { ctx.save(); ctx.translate(lerp(-300, 330, ease.out(clamp(hr / .4))), 300); ctx.rotate(-.03);
      FX.paperDoc(ctx, 0, 0, 440, 300, { lines: 0, draw: c => {
        txt(c, 'H.R. 8989', 0, -100, FX.DISPLAY(56)); txt(c, 'A BILL', 0, -50, FX.FONT(700, 20), '#5a5048');
        if (b > 0) txt(c, 'against fortune-telling', 0, 0, FX.FONT(700, 26)); if (b > .6) txt(c, 'for money', 0, 36, FX.FONT(700, 26));
        if (dc > 0) txt(c, 'in the District of Columbia', 0, 90, FX.FONT(600, 20), '#5a5048'); } });
      ctx.restore(); }
    FX.caption(ctx, 'HOUDINI TESTIFIES BEFORE A HOUSE SUBCOMMITTEE', lt, .4);
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, 'FEB 1926');
  }
  function d3(ctx, lt, dur, t) { // more hearings in May
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    ctx.save(); ctx.translate(640, 380); ctx.rotate(-.02);
    shape(ctx, '#f4efe2', 4, rect(-230, -230, 460, 470, 3)); shape(ctx, RED, 0, rect(-230, -230, 460, 70)); txt(ctx, 'MAY 1926', 0, -194, FX.DISPLAY(40), '#fff');
    for (let d = 1; d <= 31; d++) { const i = d + 5, cx = -195 + (i % 7) * 65, cy = -120 + Math.floor(i / 7) * 60; txt(ctx, String(d), cx, cy, FX.FONT(700, 22)); }
    [18, 19, 20, 21].forEach((d, j) => { const i = d + 5; ring(ctx, -195 + (i % 7) * 65, -120 + Math.floor(i / 7) * 60, 28, 24, (lt - .3 - j * .25) / .4); });
    ctx.restore(); ctx.restore();
    FX.caption(ctx, 'MORE HEARINGS FOLLOWED', lt, .3);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'MAY 1926');
  }
  function d4(ctx, lt, dur, t) { // Rose Mackenberg goes undercover to local mediums
    const r = since(t, 'rose'), walk = clamp((lt - .2) / 2.2), ph = lt * 7, step = walk < 1 && walk > 0 ? Math.sin(ph) : 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#2a3046'], [1, '#4a4a5a']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#7a5a4a', 4, rect(560, 60, 700, 560)); for (let y = 60; y < 620; y += 30) line(ctx, [[560, y], [1260, y]], 2, 'rgba(40,20,14,.3)');
    shape(ctx, '#3a2420', 5, rect(820, 300, 160, 320, 4)); shape(ctx, '#c9a14a', 3, circle(950, 470, 8));
    shape(ctx, '#e9dcb8', 4, rect(780, 200, 240, 70, 4)); txt(ctx, 'MADAME ———', 900, 222, FX.FONT(700, 20)); txt(ctx, 'SPIRIT READINGS DAILY', 900, 250, FX.FONT(600, 15));
    for (const x of [640, 1100]) { shape(ctx, '#ffe9a8', 4, rect(x, 340, 90, 110, 2)); glow(ctx, x + 45, 395, 100, 'rgba(255,220,150,.3)'); }
    shape(ctx, '#3a3a40', 0, rect(-400, 620, 2100, 300));
    const x = lerp(160, 680, ease.inOut(walk));
    fig(ctx, x, 690 - Math.abs(step) * 5, .34, cast('rose', 'plainCoat', { feet: { L: [-40, -40 - Math.max(0, step) * 40], R: [40, -40 - Math.max(0, -step) * 40] }, hands: { L: [-120, -480], R: [60, -760] }, handShape: { R: 'fist' }, face: { brows: 'calm', mouth: 'flat', look: [.7, 0], eyes: blink(t, at('before') + 1.5) } }), { mirror: true });
    ctx.save(); ctx.translate(x - 60 * .34, 690 - 760 * .34); ctx.rotate(.1); shape(ctx, '#2a2a2e', 3, rect(-18, -26, 36, 46, 3)); ctx.restore();   // her notebook
    ctx.restore();
    label(ctx, [['ROSE MACKENBERG', FX.DISPLAY(32)], ['undercover investigator', FX.FONT(600, 20)]], 300, 160, (r + .1) / .35, -.03, 360);
    FX.caption(ctx, 'SENT TO VISIT LOCAL MEDIUMS', lt, .4);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'WASHINGTON, 1926');
  }
  function d5(ctx, lt, dur, t) { // the hearing room: spiritualists come to fight him
    const fr = since(t, 'frauds'), ac = since(t, 'accused');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, '#4a3e36', 0, rect(-400, -300, 2100, 1000));
    for (let x = -400; x < 1700; x += 140) shape(ctx, '#544538', 0, rect(x, -300, 70, 1000));
    // the committee bench at the back
    [['professor', 'greySuit', 520], ['editor', 'greySuit', 700], ['doctor', 'greySuit', 880]].forEach(([h, o, x], i) =>
      fig(ctx, x, 470, .24, cast(h, o, { hands: { L: [-120, -560], R: [120, -560] }, face: { brows: fr > 0 ? 'up' : 'calm', mouth: 'flat', look: [-.4, .3], eyes: blink(t, at('hearing') + 1 + i * .8) } })));
    shape(ctx, '#5a3a28', 5, rect(420, 360, 560, 120, 4)); txt(ctx, 'HOUSE SUBCOMMITTEE', 700, 410, FX.FONT(700, 20), PAPER);
    // Houdini on his feet at the witness table, left
    const up = FX.settle(clamp(fr / .35));
    fig(ctx, 230, 690, .34, houdini({ hands: { L: [-120, -480], R: fr > 0 ? [lerp(140, 420, up), lerp(-480, -1000, up)] : [140, -560] }, handShape: { R: fr > 0 ? 'point' : 'open' }, face: { brows: fr > 0 ? 'strain' : 'calm', mouth: fr > 0 ? 'grit' : 'flat', look: [.7, .2], eyes: blink(t, at('hearing') + 2) }, breathe: breathe(t) }));
    shape(ctx, '#6b4f39', 5, rect(120, 560, 260, 24, 4));
    // the packed rows of spiritualists in the foreground
    const crowd = [['mediumScarf', 'shawl', 520], ['bowler', 'overcoat', 660], ['mediumFeather', 'beaded', 800], ['cloche', 'dress20s', 940], ['mediumCollar', 'highCollar', 1080], ['bey', 'robe', 1220]];
    const shake = ac > 0 ? Math.sin(ac * 14) : 0;
    crowd.forEach(([h, o, x], i) => fig(ctx, x, 900, .36, cast(h, o, { hands: { L: [-120, -500], R: ac > 0 ? [180, -1080 + (i % 2 ? shake : -shake) * 40] : [120, -500] }, handShape: { R: ac > 0 ? 'fist' : 'open' },
      face: { brows: fr > 0 ? 'strain' : 'calm', mouth: ac > 0 ? 'o' : (fr > 0 ? 'frown' : 'flat'), look: [-.8, -.1], eyes: 1 } }), { mirror: true }));
    ctx.restore();
    if (fr > 0) bubble(ctx, 330, 120, 260, 90, 260, 300, fr, { text: 'FRAUDS!', font: FX.DISPLAY(44), color: RED });
    if (ac > 0) bubble(ctx, 900, 160, 420, 90, 900, 330, ac, { text: 'PERSECUTION!', font: FX.DISPLAY(44) });
    FX.caption(ctx, 'THE HEARING ROOM FILLED WITH SPIRITUALISTS', lt, .3, W - 60, 30);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'MAY 1926');
  }
  function d6(ctx, lt, dur, t) { // the bill never became law
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    FX.paperDoc(ctx, 640, 380, 480, 560, { title: 'H.R. 8989', titleSize: 48, sub: 'A BILL AGAINST FORTUNE-TELLING FOR MONEY', lines: 14, rot: -.03, seed: 81 });
    FX.stamp(ctx, 'NEVER BECAME LAW', 640, 400, lt - .5, { color: RED, size: 54 });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1926');
  }
  function d7(ctx, lt, dur, t) { // front pages; more opponents, more personal
    const o = since(t, 'opponents');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    [['THE CAPITAL STAR', ['HOUDINI vs.', 'THE SPIRITS'], 380, 360, -.06], ['THE EVENING HERALD', ['MEDIUMS STORM', 'HEARING'], 660, 390, .04], ['THE DAILY GAZETTE', ['"FRAUDS!"', 'SAYS HOUDINI'], 920, 370, -.02]].forEach(([m, h, x, y, r], i) => {
      const k = lt - .2 - i * .35; if (k > 0) newspaper(ctx, x, y, 380, 480, { mast: m, date: '1926', head: h, hs: 38, rot: r, scale: slam(k), seed: 90 + i });
    });
    ctx.restore();
    if (o > 0) { // angry faces crowd in around the edges
      const pos = [[90, 620], [230, 660], [1050, 650], [1190, 610], [80, 140], [1200, 160]];
      pos.forEach(([x, y], i) => { const k = FX.settle(clamp((o - i * .15) / .3)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
        fig(ctx, 0, 380, .38, cast(['mediumScarf', 'bowler', 'mediumFeather', 'cloche', 'mediumCollar', 'bey'][i], 'shawl', { face: { brows: 'strain', mouth: 'grit', look: [x < 640 ? .6 : -.6, 0] } })); ctx.restore(); });
      FX.caption(ctx, 'MORE OPPONENTS — AND MORE PERSONAL', o, .2);
    } else FX.caption(ctx, 'HIS CAMPAIGN HITS THE FRONT PAGES', lt, .4);
    FX.vignette(ctx, 640, 380, .5);
  }
  function d8(ctx, lt, dur, t) { // escalating on stage too
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 400);
    stageSet(ctx);
    const roll = (Math.sin(lt * 6) + 1) / 2;
    fig(ctx, 560, 650, .36, houdini({ hands: { L: [lerp(-60, 40, roll), -640], R: [140, lerp(-600, -700, roll)] }, face: { brows: 'smug', mouth: 'smirk', look: [.6, -.1] }, breathe: breathe(t) }));
    const k = ease.out(clamp((lt - .3) / .8));
    ctx.save(); ctx.translate(900, 560 - k * 260); shape(ctx, GOLD, 5, poly([[-40, 0], [40, 0], [40, 120 * k], [-40, 120 * k]])); shape(ctx, GOLD, 5, poly([[-90, 0], [90, 0], [0, -110]])); ctx.restore();
    ctx.restore();
    FX.bigText(ctx, 'ESCALATING', 900, 640, 54, { color: PAPER });
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'SUMMER 1926');
  }
  // a sealed box underwater (cutaway), the occupant lying inside
  function sealedBox(ctx, x, y, w, h, occupant) {
    shape(ctx, '#6a5040', 5, rect(x - w / 2, y - h / 2, w, h, 6));
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 12, y - h / 2 + 12, w - 24, h - 24); ctx.clip(); shape(ctx, '#2a1e18', 0, rect(x - w / 2, y - h / 2, w, h)); occupant(); ctx.restore();
    shape(ctx, null, 4, rect(x - w / 2 + 12, y - h / 2 + 12, w - 24, h - 24));
  }
  function d9(ctx, lt, dur, t) { // Rahman Bey: an hour sealed underwater, "a trance"
    const b = since(t, 'box'), tr = since(t, 'trance');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    ctx.fillStyle = grad(ctx, 0, -200, 0, 720, [[0, '#4f9ab8'], [1, '#1b4a63']]); ctx.fillRect(-400, -300, 2100, 1300);
    ctx.fillStyle = 'rgba(220,245,255,.55)'; ctx.beginPath(); ctx.moveTo(-400, 60); for (let x = -400; x <= 1700; x += 40) ctx.lineTo(x, 60 + Math.sin(x * .02 + t * 2) * 5); ctx.lineTo(1700, 0); ctx.lineTo(-400, 0); ctx.closePath(); ctx.fill();
    shape(ctx, '#2c5f78', 0, rect(-400, 640, 2100, 300));
    const land = FX.approach(lt, .1, 120, 520, .35);
    for (const dx of [-200, 200]) line(ctx, [[540 + dx * 1.05, 40], [540 + dx, land - 70]], 4, '#cbbf9e');
    sealedBox(ctx, 540, land, 460, 140, () => fig(ctx, 540 + 230 - 24, land + 34, .2, cast('bey', 'robe', { hands: { L: [-40, -620], R: [40, -620] }, face: { brows: 'calm', mouth: 'flat', eyes: 0 } }), { rot: -Math.PI / 2 }));
    if (tr > 0) { for (let i = 0; i < 3; i++) { const u = ((lt * .5 + i / 3) % 1); txt(ctx, 'z', 640 + u * 60 + i * 10, land - 90 - u * 120, FX.DISPLAY(28 + u * 20), `rgba(240,248,255,${1 - u})`); } }
    ctx.restore();
    label(ctx, [['RAHMAN BEY', FX.DISPLAY(34)], ['a stage performer', FX.FONT(600, 20)]], 1020, 170, (lt - .3) / .35, .03, 340);
    if (b > 0) { const k = FX.settle(clamp(b / .35)); ctx.save(); ctx.translate(1020, 400); ctx.scale(k, k); shape(ctx, PAPER, 5, circle(0, 0, 70)); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [[Math.sin(a) * 56, -Math.cos(a) * 56], [Math.sin(a) * 64, -Math.cos(a) * 64]], 3); }
      const sw = clamp(b / 2.2) * Math.PI * 2; ctx.save(); ctx.fillStyle = 'rgba(168,50,42,.35)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 54, -Math.PI / 2, -Math.PI / 2 + sw); ctx.closePath(); ctx.fill(); ctx.restore(); line(ctx, [[0, 0], [Math.sin(sw) * 50, -Math.cos(sw) * 50]], 4, RED); ctx.restore(); txt(ctx, '1 HOUR', 1020, 500, FX.DISPLAY(34), PAPER); }
    if (tr > 0) FX.stamp(ctx, '"A TRANCE"', 1020, 580, tr, { color: GOLD, size: 40, rot: .05 });
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'SUMMER 1926');
  }
  function d10(ctx, lt, dur, t) { // Houdini's response: do it with no trance at all
    const n = since(t, 'notrance'), up = FX.settle(clamp(n / .35));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    parlour(ctx);
    fig(ctx, 760, 720, .4, houdini({ hands: { L: [-120, -480], R: n > 0 ? [lerp(140, 380, up), lerp(-480, -1180, up)] : [110, -760] }, handShape: { R: n > 0 ? 'point' : 'open' }, face: { brows: 'smug', mouth: n > 0 ? 'smile' : 'smirk', look: [-.5, -.2], eyes: blink(t, at('response') + 1.4) }, breathe: breathe(t) }));
    bubble(ctx, 360, 230, 300, 190, 620, 330, lt - .3, { thought: true, draw: c => { shape(c, '#6a5040', 4, rect(-110, -40, 220, 80, 6)); txt(c, '"TRANCE"', 0, 0, FX.DISPLAY(28), PAPER); if (n > 0) cross(c, 0, 0, 60, n); } });
    ctx.restore();
    if (n > 0) FX.stamp(ctx, 'NO TRANCE AT ALL', 640, 580, n - .2, { color: RED, size: 50 });
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'SUMMER 1926');
  }
  function d11(ctx, lt, dur, t) { // August 5, Hotel Shelton: he lies down in the metal casket and it's sealed
    const c = since(t, 'casket'), lid = ease.inOut(clamp((c - .3) / 1));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    shape(ctx, '#d9e2e0', 0, rect(-400, -300, 2100, 1000));
    ctx.save(); ctx.strokeStyle = 'rgba(80,100,100,.25)'; ctx.lineWidth = 2; for (let x = -400; x < 1700; x += 60) { ctx.beginPath(); ctx.moveTo(x, -300); ctx.lineTo(x, 520); ctx.stroke(); } for (let y = -300; y < 520; y += 60) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1700, y); ctx.stroke(); } ctx.restore();
    shape(ctx, '#bfd0d0', 0, rect(-400, 520, 2100, 400)); ctx.fillStyle = grad(ctx, 0, 600, 0, 720, [[0, '#7ab8cc'], [1, '#4a90a8']]); ctx.fillRect(-400, 610, 2100, 200); line(ctx, [[-400, 610], [1700, 610]], 4, 'rgba(0,0,0,.25)');
    shape(ctx, 'rgba(0,0,0,.2)', 0, c2 => c2.ellipse(640, 560, 360, 20, 0, 0, Math.PI * 2));
    // the casket body, him inside, the lid swinging down on its hinge (far side)
    shape(ctx, '#5a6266', 5, rect(320, 430, 640, 30, 4));                                        // the casket's far wall, inside
    ctx.save(); ctx.beginPath(); ctx.rect(330, 300, 620, 160); ctx.clip();
    fig(ctx, 920, 468, .25, houdini({ outfit: 'swim', hands: { L: [-60, -600], R: [60, -600] }, face: { brows: 'calm', mouth: 'flat', look: [0, -.6], eyes: blink(t, at('aug5') + 1.5) } }), { rot: -Math.PI / 2 });
    ctx.restore();
    shape(ctx, '#8a9296', 5, rect(320, 440, 640, 110, 8));                                        // near wall hides his body; only his profile shows over the rim
    // the assistants carry the separate lid in, lower it onto the casket, then the bolts go in
    const ly = lerp(250, 426, lid);
    for (const [x, m] of [[230, false], [1060, true]]) fig(ctx, x, 600, .3, cast('assistant', 'assistantVest', { hands: { L: [-120, -480], R: [300, (ly - 600) / .3 + 10] }, face: { brows: 'calm', mouth: 'flat', look: [m ? .6 : -.6, .2] } }), { mirror: m });
    shape(ctx, grad(ctx, 0, ly - 10, 0, ly + 14, [[0, '#a6aeb3'], [1, '#7f878c']]), 5, rect(310, ly - 8, 660, 22, 6));
    if (lid > .98) for (let i = 0; i < 6; i++) { const k = FX.settle(clamp((c - 1.4 - i * .12) / .2)); if (k > 0) shape(ctx, '#c3cbd0', 2.5, circle(370 + i * 108, 436, 7 * k)); }
    ctx.restore();
    FX.caption(ctx, 'THE POOL OF THE HOTEL SHELTON, NEW YORK', lt, .4);
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '5 AUG 1926');
  }
  const descent = (ctx, lt, dur, t) => { G.Part2.shotDescent(ctx, lt, dur, t); FX.caption(ctx, 'LOWERED INTO THE POOL', lt, .3); };
  const counter = (ctx, lt, dur, t) => G.Part2.shotCounter(ctx, lt, dur, t);
  function d13(ctx, lt, dur, t) { // inside the casket: "yellow lights" near the end
    const l = since(t, 'lights');
    shape(ctx, '#0f1418', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, 1.6 + lt * .02, 640, 320);
    shape(ctx, '#2a3036', 0, rect(-400, 160, 2100, 400));
    fig(ctx, 1080, 400, .5, houdini({ outfit: 'swim', hands: { L: [-60, -600], R: [60, -600] }, face: { brows: l > 0 ? 'strain' : 'calm', mouth: 'flat', look: [0, -.8], eyes: lt < 3 ? 1 - G.Rig.blinkAt(t, [at('yellow') + 1.2, at('yellow') + 2.4], .5) : .4 } }), { rot: -Math.PI / 2 });
    ctx.restore();
    ctx.save(); ctx.fillStyle = `rgba(0,0,0,${.35 + clamp(lt / dur) * .35})`; ctx.fillRect(0, 0, W, H); ctx.restore();
    if (l > 0) for (let i = 0; i < 9; i++) { const r = rng(i + 3), x = 380 + r() * 520, y = 180 + r() * 280, a = clamp((l - i * .15) / .3) * (.6 + .4 * Math.sin(lt * 5 + i)); glow(ctx, x, y, 40, `rgba(255,220,80,${.7 * a})`); shape(ctx, `rgba(255,230,120,${a})`, 0, circle(x, y, 6)); }
    FX.caption(ctx, 'HE LATER WROTE: "YELLOW LIGHTS" NEAR THE END', l + .2, 0);
    FX.vignette(ctx, 640, 360, .75);
    FX.dateTag(ctx, '91 MINUTES');
  }
  function d14(ctx, lt, dur, t) { // his notes go to a Bureau of Mines researcher: trapped miners, limited air
    const m = since(t, 'miners');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#6e4f39', 0, rect(-400, -300, 2100, 1300));
    FX.paperDoc(ctx, 380, 380, 380, 460, { lines: 0, rot: -.04, fill: '#f6f2ea', draw: c => { txt(c, 'MY NOTES', 0, -180, FX.FONT(700, 22)); L3.scribble(c, -150, -130, 300, 8, clamp(lt / 1.6), 31, '#2a3a6a', 34); } });
    const k = ease.out(clamp((lt - 1) / .6));
    ctx.save(); ctx.translate(lerp(W + 300, 860, k), 300); ctx.rotate(.05); shape(ctx, '#e9dcb8', 4, rect(-190, -110, 380, 220, 4)); line(ctx, [[-190, -110], [0, 10], [190, -110]], 3);
    txt(ctx, 'U.S. BUREAU OF MINES', 0, 50, FX.FONT(700, 22)); txt(ctx, 'research division', 0, 80, FX.FONT(600, 16), '#5a5048'); ctx.restore();
    ctx.restore();
    if (m > 0) { // inset: a mine tunnel, a lamp, the air running low
      const k2 = ease.out(clamp(m / .4)); ctx.save(); ctx.translate(lerp(-300, 330, k2), 560); ctx.rotate(-.03);
      shape(ctx, PAPER, 4, rect(-230, -120, 460, 240, 4)); ctx.beginPath(); ctx.rect(-218, -108, 436, 216); ctx.clip(); shape(ctx, '#2a2420', 0, rect(-230, -120, 460, 240));
      shape(ctx, '#4a3a30', 4, c => { c.moveTo(-230, 120); c.lineTo(-140, -60); c.quadraticCurveTo(0, -130, 140, -60); c.lineTo(230, 120); c.closePath(); });
      for (const x of [-120, 120]) line(ctx, [[x, 120], [x * .7, -50]], 10, '#6a4a2a'); line(ctx, [[-110, -60], [110, -60]], 10, '#6a4a2a');
      glow(ctx, 0, -40, 120, 'rgba(255,200,120,.45)'); shape(ctx, '#ffd27a', 3, circle(0, -40, 10));
      fig(ctx, -40, 120, .14, cast('bowler', 'overcoat', { face: { brows: 'worried', mouth: 'flat', look: [.4, -.3] } })); fig(ctx, 60, 120, .14, cast('student', 'sweater', { face: { brows: 'worried', mouth: 'flat', look: [-.4, -.3] } }));
      const air = 1 - clamp(m / 3); shape(ctx, PAPER, 3, rect(150, -90, 50, 140, 4)); shape(ctx, air > .3 ? '#6aa0b8' : RED, 0, rect(156, -84 + 128 * (1 - air), 38, 128 * air)); txt(ctx, 'AIR', 175, 66, FX.FONT(700, 14), PAPER);
      ctx.restore(); }
    FX.caption(ctx, 'HOW TRAPPED MINERS MIGHT SURVIVE ON LIMITED AIR', m + .3, 0);
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'AUG 1926');
  }
  function d15(ctx, lt, dur, t) { // the impossible, explained
    const i = since(t, 'impossible'), e = since(t, 'explained');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    if (i > -1.5) { ctx.save(); ctx.translate(640, 320); ctx.scale(slam(i + 1.5), slam(i + 1.5)); FX.paperDoc(ctx, 0, 0, 620, 170, { lines: 0, draw: c => FX.bigText(c, 'THE IMPOSSIBLE', 0, 4, 70, { color: GOLD }) }); ctx.restore(); }
    FX.stamp(ctx, 'EXPLAINED.', 700, 480, e, { color: '#2f7a46', size: 70, rot: -.08 });
    ctx.restore();
    FX.caption(ctx, 'THE PERFECT HOUDINI ARGUMENT', lt, .3, W - 60, 40);
    FX.vignette(ctx, 640, 380, .55);
  }
  function d16(ctx, lt, dur, t) { // his last great public test
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.1), 640, 360);
    parlour(ctx, '#3e3a3a');
    frame(ctx, 640, 340, 300, 400, '#cdbb98', () => G.Rig.drawSuit(ctx, 640 - 533 * .52 / 2, 150, .52, { filter: 'sepia(.85) contrast(.95)' }));
    ctx.restore();
    FX.caption(ctx, 'HIS LAST GREAT PUBLIC TEST', lt, .3);
    FX.vignette(ctx, 640, 360, .6);
    FX.dateTag(ctx, 'AUG 1926');
    T.fill(ctx, '#000', ease.in(prog(lt, dur - .5, dur)));
  }

  // ================= THE LAST TEN DAYS =================
  const ALB = [690, 470], MTL = [720, 250], DET = [140, 600];
  function l1(ctx, lt, dur, t) { // the tour: Albany → Montreal → Detroit
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    mapBase(ctx);
    route(ctx, [ALB, MTL, DET], (lt - 1.2) / (dur - 1.6));
    pin(ctx, ...ALB, lt - .6, 'ALBANY'); pin(ctx, ...MTL, lt - 1.6, 'MONTREAL'); pin(ctx, ...DET, lt - 2.8, 'DETROIT', -40, 34);
    ctx.restore();
    FX.caption(ctx, 'ON TOUR WITH A DEMANDING FULL-EVENING SHOW', lt, 1.2);
    FX.vignette(ctx, 640, 400, .45);
    FX.dateTag(ctx, 'OCT 1926');
    chapterFor(ctx, 'THE LAST TEN DAYS', lt, 2.2);
  }
  function l2(ctx, lt, dur, t) { // Albany: the Water Torture Cell — and the ankle fractures
    G.Part1.shotWaterCell(ctx, lt, dur, t);
    FX.dateTag(ctx, 'ALBANY, OCT 1926');
    const f = since(t, 'fractured');
    if (f > 0) { // the crack at the stocks, where the ankles are clamped
      if (f < .25) { ctx.save(); ctx.fillStyle = `rgba(255,255,255,${.5 * (1 - f / .25)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
      const k = clamp(f / .15); ctx.save(); ctx.translate(640, 112); for (const a of [-.9, -.4, .1, .6, 1.1]) line(ctx, [[Math.cos(a - Math.PI / 2) * 30, Math.sin(a - Math.PI / 2) * 30], [Math.cos(a - Math.PI / 2) * (30 + 50 * k), Math.sin(a - Math.PI / 2) * (30 + 50 * k)]], 6, RED); ctx.restore();
      FX.bigText(ctx, 'CRACK!', 900, 140, 60, { color: RED });
      FX.stamp(ctx, 'FRACTURED ANKLE', 960, 300, f - .3, { color: RED, size: 40 });
    }
  }
  function l3(ctx, lt, dur, t) { // he kept touring: next stop, Montreal
    const n = since(t, 'next');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#9ab0c0'], [1, '#d8d8cc']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#6a5a50', 4, rect(-400, 300, 2100, 320)); for (let x = -400; x < 1700; x += 120) shape(ctx, '#e9dcb8', 3, rect(x + 20, 360, 70, 90, 2));
    shape(ctx, '#2a2a30', 5, rect(330, 90, 620, 90, 6)); txt(ctx, n > 0 ? 'MONTREAL' : '· · ·', 640, 138, FX.DISPLAY(56), n > 0 ? GOLD : '#6a6a6a');
    shape(ctx, '#7a7a80', 0, rect(-400, 610, 2100, 300));
    // he steps along the platform with a cane, favouring the broken ankle
    const ph = lt * 5, limp = Math.max(0, Math.sin(ph)), x = lerp(280, 700, ease.inOut(clamp(lt / dur)));
    fig(ctx, x, 690 - limp * 8, .36, houdini({ lean: limp * .05, feet: { L: [-50, -40 - Math.max(0, Math.sin(ph)) * 34], R: [50, -40] }, hands: { L: [-120, -480], R: [220, -440] }, handShape: { R: 'fist' }, face: { brows: 'strain', mouth: 'grit', look: [-.6, .1] } }), { mirror: true });
    line(ctx, [[x - 220 * .36, 690 - 440 * .36], [x - 240 * .36, 690]], 6, '#3a2418');
    ctx.restore();
    FX.caption(ctx, 'HE KEPT TOURING', lt, .1);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'OCT 1926');
  }
  const RX = 760, RY = 560, RS = .34;                                  // Houdini reclining on the couch
  function reclining(ctx, t, face, extra = {}) {
    fig(ctx, RX + 190, RY - 40, RS, houdini(Object.assign({ hands: { L: [-80, -760], R: [100, -620] }, feet: { L: [-30, -40], R: [40, -40] }, face, breathe: breathe(t) }, extra)), { rot: RECLINE });
  }
  function l4(ctx, lt, dur, t) { // Oct 22 (some say the 20th): resting on the couch; McGill students visit
    const s = since(t, 'sources'), st = since(t, 'students'), open = ease.out(clamp(st / .5));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    dressingRoom(ctx);
    shape(ctx, '#1a1210', 0, rect(40, 180, 200, 440));                                        // doorway
    if (st > 0) [['student', 'sweater', 90], ['young', 'sweater', 170], ['editor', 'greySuit', 250]].forEach(([h, o, x], i) => {
      const k = ease.out(clamp((st - .3 - i * .25) / .7)); if (k <= 0) return;
      fig(ctx, lerp(x - 160, x + 60, k), 640, .3, cast(h, o, { hands: { L: [-120, -480], R: [120, -480] }, face: { brows: 'up', mouth: i === 1 ? 'smile' : 'flat', look: [.7, .2] } }), { mirror: true }); });
    ctx.save(); ctx.translate(40, 180); ctx.transform(1 - open * .8, -open * .15, 0, 1, 0, 0); shape(ctx, '#3a2a22', 5, rect(0, 0, 200, 440, 4)); shape(ctx, '#c9a14a', 3, circle(170, 230, 9)); ctx.restore();
    couch(ctx, RX, RY);
    reclining(ctx, t, { brows: st > 0 ? 'up' : 'calm', mouth: 'flat', look: st > 0 ? [-.8, -.2] : [.3, -.8], eyes: blink(t, at('oct22') + 2) });
    // he props the injured ankle on a cushion, bandaged
    shape(ctx, '#efe9dc', 4, c => c.roundRect(RX + 210, RY - 90, 70, 40, 12));
    ctx.restore();
    if (s > 0) { ctx.save(); ctx.translate(1080, 200); ctx.rotate(.06 - (1 - FX.settle(clamp(s / .35))) * .3); shape(ctx, '#f6e04a', 3, rect(-110, -50, 220, 100, 3)); txt(ctx, 'some sources:', 0, -16, FX.FONT(600, 18)); txt(ctx, 'OCT 20', 0, 18, FX.DISPLAY(32)); ctx.restore(); }
    FX.caption(ctx, st > 0 ? 'STUDENTS FROM McGILL UNIVERSITY' : 'RESTING OFF HIS INJURED ANKLE', lt, .4);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'MONTREAL · OCT 22, 1926');
  }
  function l5(ctx, lt, dur, t) { // J. Gordon Whitehead asks the question
    const q = since(t, 'asked');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.1, 1.18), 520, 360);
    dressingRoom(ctx);
    fig(ctx, 420, 760, .44, whitehead({ hands: { L: [-120, -480], R: q > 0 ? [200, -760] : [120, -480] }, face: { brows: q > 0 ? 'up' : 'calm', mouth: q > 0 ? 'o' : 'smile', look: [.8, .2], eyes: blink(t, at('oneof') + 1.2) }, breathe: breathe(t) }), { mirror: true });
    ctx.restore();
    label(ctx, [['J. GORDON WHITEHEAD', FX.DISPLAY(30)], ['McGill student', FX.FONT(600, 20)]], 960, 560, (since(t, 'whitehead') + .1) / .35, .03, 380);
    if (q > 0) bubble(ctx, 860, 190, 520, 150, 640, 330, q, { draw: c => { txt(c, 'IS IT TRUE YOU CAN TAKE', 0, -24, FX.DISPLAY(30)); txt(c, 'ANY PUNCH TO THE STOMACH?', 0, 18, FX.DISPLAY(30)); } });
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'MONTREAL · OCT 22, 1926');
  }
  function l6(ctx, lt, dur, t) { // accounts differ: did he agree? how many blows?
    const b = since(t, 'blows');
    FX.darkBg(ctx, '#2a2622');
    const card = (x, title, k, draw) => { if (k <= 0) return; ctx.save(); ctx.translate(x, 380); ctx.rotate(x < 640 ? -.04 : .03); ctx.scale(slam(k), slam(k)); FX.paperDoc(ctx, 0, 0, 440, 320, { lines: 0, draw: c => { txt(c, title, 0, -100, FX.DISPLAY(32)); draw(c); } }); ctx.restore(); };
    card(380, 'DID HOUDINI AGREE?', lt - .2, c => { txt(c, 'YES?', 0, -10, FX.DISPLAY(50), '#2f7a46'); txt(c, '— OR NOT CLEARLY?', 0, 60, FX.DISPLAY(32), RED); });
    card(900, 'HOW MANY BLOWS?', b, c => { const n = ['2?', '3?', '4?'][Math.floor(Math.max(0, b) * 2.5) % 3]; txt(c, n, 0, 40, FX.DISPLAY(110), RED); });
    FX.caption(ctx, 'ACCOUNTS DIFFER', lt, .3, W - 60, 40);
  }
  function l7(ctx, lt, dur, t) { // the core: hard blows to the abdomen, before he was ready, until he stopped him
    const s = since(t, 'struck'), stop = since(t, 'stopped');
    // blow timing: anticipation, then a strike every ~.55 s until "stopped"
    const n = 6, hits = [...Array(n)].map((_, i) => at('struck') + .6 + i * .58).filter(h => h < at('stopped') + .1);
    let pull = 0, ext = 0, lastHit = -9;
    for (const h of hits) { const d = t - h; if (d > -.3 && d < 0) pull = 1 + d / .3 * 0 - (1 + d / .3) * 0 + Math.sin((d + .3) / .3 * Math.PI / 2); if (d >= 0 && d < .25) { ext = 1 - d / .25 * .6; lastHit = d; } if (d >= 0) lastHit = d; }
    const frozen = stop > 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.05, 1.12), 700, 420);
    dressingRoom(ctx);
    couch(ctx, RX, RY);
    const [sx, sy] = stomachAt(RX + 190, RY - 40, RS);
    const hitNow = lastHit >= 0 && lastHit < .2 && !frozen, wince = s > .6 && lastHit < .5;
    const jolt = hitNow ? FX.ring(lastHit, 8, 9, 12) : 0;
    ctx.save(); ctx.translate(0, jolt);
    reclining(ctx, t, { brows: frozen ? 'strain' : (wince ? 'strain' : 'calm'), mouth: wince || frozen ? 'grit' : 'flat', look: [.6, -.2], eyes: hitNow ? .2 : 1 },
      frozen ? { hands: { L: [-80, -760], R: [260, -900] }, handShape: { R: 'open' } } : { hands: { L: [-80, -760], R: [60, -700] } });
    ctx.restore();
    // Whitehead standing over the couch, striking at the stomach
    const W0 = [sx + 250, 690], S2 = .4, reach = frozen ? .3 : (ext > 0 ? ext : -pull * .5);
    const fist = [lerp(-180, -(W0[0] - sx) / S2 + 40, clamp(reach)) - (reach < 0 ? -reach * 120 : 0), lerp(-760, (sy - W0[1]) / S2, clamp(reach))];
    fig(ctx, W0[0], W0[1], S2, whitehead({ lean: -.12 * clamp(reach), hands: { L: [120, -560], R: [-fist[0], fist[1]] }, handShape: { R: 'fist', L: 'fist' }, bendR: 1, face: { brows: frozen ? 'up' : 'strain', mouth: frozen ? 'o' : 'grit', look: [.8, .3] } }), { mirror: true });
    if (hitNow) { ctx.save(); ctx.translate(sx, sy); ctx.rotate(-.2); const k = 1 - lastHit / .2; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; line(ctx, [[Math.cos(a) * 30, Math.sin(a) * 30], [Math.cos(a) * (30 + 40 * k), Math.sin(a) * (30 + 40 * k)]], 6, GOLD); } ctx.restore(); }
    ctx.restore();
    if (hitNow) FX.bigText(ctx, ['POW!', 'THUD!', 'WHAM!'][hits.findIndex(h => t - h >= 0 && t - h < .2) % 3], 520, 170, 64, { color: GOLD });
    if (frozen) bubble(ctx, 380, 150, 240, 90, 520, 300, stop, { text: 'STOP!', font: FX.DISPLAY(48), color: RED });
    FX.caption(ctx, s > 0 ? 'SEVERAL HARD BLOWS — BEFORE HE WAS READY' : 'THE CORE IS CONSISTENT', lt, .2);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'MONTREAL · OCT 22, 1926');
  }
  function l8(ctx, lt, dur, t) { // he performed anyway, in pain
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    stageSet(ctx);
    const flinch = Math.max(0, Math.sin(lt * 2.2 - 1)) ** 4;
    fig(ctx, 640, 650, .36, houdini({ lean: flinch * .1, hands: { L: [lerp(-300, 20, flinch), lerp(-1180, -640, flinch)], R: [60, -660] }, handShape: { L: 'open' }, face: { brows: flinch > .3 ? 'strain' : 'worried', mouth: flinch > .3 ? 'grit' : 'smile', look: [.3, -.1] }, breathe: breathe(t) }));
    for (let i = 0; i < 3; i++) { const u = (lt * .8 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, '#bfe8ff', 2.5, c => { const x = 600 + i * 40, y = 270 + u * 40; c.moveTo(x, y - 10); c.quadraticCurveTo(x + 8, y + 4, x, y + 8); c.quadraticCurveTo(x - 8, y + 4, x, y - 10); }); ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, 'HE PERFORMED ANYWAY — IN PAIN', lt, .2);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'MONTREAL · OCT 22, 1926');
  }
  function l9(ctx, lt, dur, t) { // the overnight train to Detroit
    ctx.save(); cam(ctx, 1.02, 640, 380);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#121a2c'], [1, '#2a3248']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#f1ead8', 0, circle(1040, 130, 40)); glow(ctx, 1040, 130, 140, 'rgba(240,235,210,.25)');
    const r = rng(2); for (let i = 0; i < 40; i++) shape(ctx, 'rgba(255,255,255,.7)', 0, circle(r() * 1300, r() * 300, 1.5));
    for (let i = 0; i < 6; i++) { const x = ((i * 300 - lt * 60) % 1800 + 1800) % 1800 - 300; shape(ctx, '#1a2030', 0, poly([[x, 520], [x + 150, 380], [x + 300, 520]])); }
    shape(ctx, '#1a1a20', 0, rect(-400, 520, 2100, 300)); line(ctx, [[-400, 540], [1700, 540]], 4, '#3a3a40');
    train(ctx, lerp(200, 1000, lt / dur), 520, 1.6, t);
    ctx.restore();
    FX.caption(ctx, 'AN OVERNIGHT TRAIN TO DETROIT', lt, .3);
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, 'OCT 23, 1926');
  }
  const DAYS = [['OCT 22', 'MONTREAL'], ['OCT 24', 'DETROIT'], ['OCT 25', 'SURGERY'], ['OCT 31', '']];
  function l10(ctx, lt, dur, t) { // timeline: Oct 22 → 24 → 25 → 31
    FX.darkBg(ctx, '#2a2622');
    const x0 = 180, x1 = 1100, xs = [0, 1, 2, 3].map(d => lerp(x0, x1, d / 3)), k = ease.inOut(clamp(lt / 1));
    line(ctx, [[x0, 380], [lerp(x0, x1, k), 380]], 8, PAPER);
    DAYS.forEach(([d, l], i) => { const kk = FX.settle(clamp((lt - .2 - i * .2) / .3)); if (kk <= 0) return; shape(ctx, i === 1 ? RED : PAPER, 4, circle(xs[i], 380, 16 * kk)); txt(ctx, d, xs[i], 330, FX.DISPLAY(30), PAPER); if (l) txt(ctx, l, xs[i], 430, FX.FONT(700, 18), '#d8d2c2'); });
    const m = ease.inOut(clamp((lt - .8) / 1)); shape(ctx, GOLD, 3, poly([[lerp(xs[0], xs[1], m) - 14, 470], [lerp(xs[0], xs[1], m) + 14, 470], [lerp(xs[0], xs[1], m), 450]]));
    FX.caption(ctx, 'BY DETROIT, HE WAS SERIOUSLY ILL', lt, .5);
    FX.dateTag(ctx, 'OCT 1926');
  }
  function l11(ctx, lt, dur, t) { // a doctor diagnoses acute appendicitis: go to a hospital
    const h = since(t, 'hospital');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    L3.suite(ctx);
    fig(ctx, 420, 720, .38, cast('doctor', 'doctorCoat', { hands: { L: [-120, -480], R: h > 0 ? [-360, -900] : [140, -680] }, handShape: { R: h > 0 ? 'point' : 'open' }, face: { brows: 'worried', mouth: h > 0 ? 'o' : 'frown', look: [.7, .1], eyes: blink(t, at('doctor') + 1.3) } }), { mirror: true });
    fig(ctx, 800, 720, .38, houdini({ lean: .06, hands: { L: [-20, -660], R: [80, -640] }, face: { brows: 'strain', mouth: 'grit', look: [-.6, 0], eyes: blink(t, at('doctor') + .7) }, breathe: breathe(t) }));
    ctx.restore();
    bubble(ctx, 380, 100, 380, 100, 420, 240, lt - .3, { draw: c => { txt(c, 'ACUTE', 0, -18, FX.FONT(700, 22)); txt(c, 'APPENDICITIS', 0, 16, FX.DISPLAY(36), RED); } });
    if (h > 0) FX.caption(ctx, 'GO TO A HOSPITAL', h + .2, 0);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'DETROIT · OCT 24, 1926');
  }
  function l12(ctx, lt, dur, t) { // he went to the Garrick Theatre instead
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#2a2a3a'], [1, '#4a4050']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#6a3a30', 5, rect(560, 40, 640, 580)); shape(ctx, '#7a2621', 5, rect(600, 160, 560, 130, 8)); shape(ctx, PAPER, 4, rect(630, 186, 500, 78, 4));
    for (let i = 0; i < 26; i++) { const on = (i + Math.floor(lt * 8)) % 3 === 0; shape(ctx, on ? '#ffe9a8' : '#6a5a40', 2, circle(610 + i * 21.5, 172, 5)); shape(ctx, on ? '#ffe9a8' : '#6a5a40', 2, circle(610 + i * 21.5, 278, 5)); }
    txt(ctx, 'GARRICK THEATRE', 880, 214, FX.DISPLAY(40)); txt(ctx, 'TONIGHT: HOUDINI', 880, 248, FX.FONT(700, 20));
    shape(ctx, '#ffe9a8', 5, rect(760, 400, 240, 220, 4)); glow(ctx, 880, 500, 220, 'rgba(255,220,150,.4)');
    shape(ctx, '#3a3a40', 0, rect(-400, 620, 2100, 300));
    const ph = lt * 5, limp = Math.max(0, Math.sin(ph)), x = lerp(200, 640, ease.inOut(clamp(lt / dur)));
    fig(ctx, x, 690 - limp * 8, .34, houdini({ lean: .08, hands: { L: [-20, -660], R: [140, -480] }, feet: { L: [-50, -40 - limp * 34], R: [50, -40] }, face: { brows: 'strain', mouth: 'grit', look: [-.6, -.2] } }), { mirror: true });
    ctx.restore();
    FX.caption(ctx, 'HE WENT TO THE THEATRE INSTEAD', lt, .2);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'DETROIT · OCT 24, 1926');
  }
  function l13(ctx, lt, dur, t) { // performing with a fever of about 104°F
    const f = since(t, 'fever'), deg = lerp(98.6, 104, ease.out(clamp(f / 2)));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    stageSet(ctx);
    const sway = Math.sin(lt * 1.6) * .04;
    fig(ctx, 560, 650, .36, houdini({ lean: sway, hands: { L: [-300, -1000], R: [40, -660] }, face: { brows: 'strain', mouth: 'grit', look: [.3, 0], eyes: .7 }, breathe: breathe(t) }));
    if (f > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .12 * clamp(f / 1.5); ctx.fillStyle = '#ff6040'; ctx.fillRect(-400, -300, 2100, 1300); ctx.restore(); }
    ctx.restore();
    // the thermometer
    const tx = 1000, ty = 380, fill = clamp((deg - 95) / 12);
    shape(ctx, PAPER, 5, c => c.roundRect(tx - 26, ty - 240, 52, 440, 26)); shape(ctx, RED, 4, circle(tx, ty + 210, 44));
    shape(ctx, RED, 0, rect(tx - 12, ty + 180 - 380 * fill, 24, 380 * fill + 30));
    for (let d = 96; d <= 106; d += 2) { const y = ty + 180 - 380 * (d - 95) / 12; line(ctx, [[tx + 26, y], [tx + 46, y]], 3, PAPER); txt(ctx, String(d), tx + 76, y, FX.FONT(700, 18), PAPER); }
    if (f > 0) FX.bigText(ctx, `${deg.toFixed(1)}°F`, tx - 230, 220, 60, { color: deg > 103 ? RED : GOLD });
    FX.caption(ctx, 'A FEVER REPORTED AT ABOUT 104°F', f + .3, 0);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'GARRICK THEATRE · OCT 24');
  }
  function l14(ctx, lt, dur, t) { // hospitalized after the show
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#121a2c'], [1, '#2a3248']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#d8d0c0', 5, rect(500, 140, 760, 480)); for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) shape(ctx, (r + c) % 4 ? '#3a4050' : '#ffe9a8', 3, rect(540 + c * 120, 250 + r * 110, 60, 70, 2));
    shape(ctx, '#2a2a30', 5, rect(700, 160, 360, 60, 4)); txt(ctx, 'GRACE HOSPITAL', 880, 192, FX.DISPLAY(34), PAPER);
    shape(ctx, '#3a3a40', 0, rect(-400, 620, 2100, 300));
    // an ambulance pulls up, its lamp glowing
    const x = FX.approach(lt, 0, -300, 400, .4);
    ctx.save(); ctx.translate(x, 600); shape(ctx, '#f1ead8', 4, rect(-130, -120, 220, 110, 6)); shape(ctx, '#e8e2d0', 4, rect(90, -80, 70, 70, 6)); shape(ctx, RED, 0, rect(-40, -100, 20, 60)); shape(ctx, RED, 0, rect(-60, -80, 60, 20));
    for (const wx of [-90, 110]) shape(ctx, '#1d1a17', 3, circle(wx, -6, 22)); glow(ctx, 150, -50, 60, 'rgba(255,240,180,.5)'); ctx.restore();
    ctx.restore();
    FX.caption(ctx, 'HOSPITALIZED AFTER THE SHOW', lt, .2);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'DETROIT · OCT 24–25');
  }
  function l15(ctx, lt, dur, t) { // surgery: the appendix had already ruptured; peritonitis
    const r = since(t, 'ruptured'), p = since(t, 'peritonitis');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, '#b8c8c4', 0, rect(-400, -300, 2100, 1000)); shape(ctx, '#7a8a86', 0, rect(-400, 600, 2100, 400));
    line(ctx, [[640, -300], [640, 120]], 4); shape(ctx, '#9aa3a8', 4, poly([[560, 120], [720, 120], [680, 80], [600, 80]])); glow(ctx, 640, 330, 340, 'rgba(255,250,230,.35)');
    shape(ctx, '#e8eef0', 5, rect(380, 470, 520, 40, 4)); for (const x of [420, 860]) shape(ctx, '#7a8a90', 4, rect(x - 8, 510, 16, 110));
    shape(ctx, '#f1efe8', 4, c => c.roundRect(400, 440, 480, 40, 18));
    [['doctor', 400], ['professor', 880]].forEach(([h, x], i) => fig(ctx, x, 700, .4, cast(h, 'doctorCoat', { hands: { L: [i ? -200 : 120, -700], R: [i ? -120 : 200, -720] }, face: { brows: 'worried', mouth: 'flat', look: [i ? -.6 : .6, .6] } }), { mirror: i === 1 }));
    ctx.restore();
    if (r > 0) { const k = ease.out(clamp(r / .4)); ctx.save(); ctx.translate(lerp(W + 200, 1020, k), 260); shape(ctx, PAPER, 5, circle(0, 0, 150)); ctx.beginPath(); ctx.arc(0, 0, 144, 0, Math.PI * 2); ctx.clip(); shape(ctx, '#e7c7a8', 0, rect(-150, -150, 300, 300)); appendixPanel(ctx, 0, -10, .8, p > 0 ? 4 : 3, p > 0 ? clamp(p / .8) : clamp(r / .6)); ctx.restore(); shape(ctx, null, 5, circle(lerp(W + 200, 1020, k), 260, 150)); }
    if (r > 0) FX.stamp(ctx, 'RUPTURED', 1020, 450, r - .3, { color: RED, size: 40 });
    if (p > 0) label(ctx, [['PERITONITIS', FX.DISPLAY(34)], ['an infection of the lining of the abdomen', FX.FONT(600, 17)]], 330, 140, p / .35, -.02, 470);
    FX.caption(ctx, 'SURGEONS REMOVED HIS APPENDIX', lt, .2);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'GRACE HOSPITAL · OCT 25');
  }
  function l16(ctx, lt, dur, t) { // 1926, before antibiotics: often fatal
    const f = since(t, 'fatal');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    FX.bigText(ctx, '1926', 360, 300, 140, { color: PAPER });
    ctx.save(); ctx.translate(880, 340); shape(ctx, 'rgba(210,225,230,.8)', 4, c => c.roundRect(-60, -110, 120, 220, 16)); shape(ctx, '#e9dcb8', 3, rect(-50, -40, 100, 80)); shape(ctx, '#9aa3a8', 4, rect(-40, -140, 80, 34, 4));
    txt(ctx, 'ANTI-', 0, -14, FX.FONT(700, 18)); txt(ctx, 'BIOTICS', 0, 12, FX.FONT(700, 18)); ctx.restore();
    cross(ctx, 880, 340, 90, lt - .6);
    txt(ctx, 'not yet in use', 880, 500, FX.FONT(700, 22), '#d8d2c2');
    ctx.restore();
    FX.stamp(ctx, 'OFTEN FATAL', 640, 590, f, { color: RED, size: 56 });
    FX.dateTag(ctx, 'OCT 1926');
  }
  function l17(ctx, lt, dur, t) { // doctors operated again a few days later (the hospital room, supplied bed art)
    G.Part1.shotRoom(ctx, lt, dur, t);
    FX.dateTag(ctx, 'GRACE HOSPITAL · LATE OCT 1926');
    FX.caption(ctx, 'DOCTORS OPERATED AGAIN A FEW DAYS LATER', lt, .2);
  }
  function l18(ctx, lt, dur, t) { // October 31: he died at Grace Hospital. He was fifty-two.
    const d = since(t, 'died'), age = since(t, 'age'), off = clamp((d - .8) / .4);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 360);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#0e1422'], [1, '#22283a']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#f1ead8', 0, circle(220, 120, 38)); glow(ctx, 220, 120, 130, 'rgba(240,235,210,.22)');
    shape(ctx, '#bdb4a4', 5, rect(400, 80, 760, 540)); shape(ctx, '#2a2a30', 5, rect(620, 40, 360, 60, 4)); txt(ctx, 'GRACE HOSPITAL', 800, 72, FX.DISPLAY(34), PAPER);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const isHis = r === 1 && c === 3; const lit = isHis ? 1 - off : (r * 7 + c * 3) % 5 === 0; shape(ctx, lit ? '#ffe9a8' : '#2e3442', 3, rect(440 + c * 120, 120 + r * 120, 60, 80, 2)); if (lit && isHis) glow(ctx, 470 + c * 120, 160 + r * 120, 90, `rgba(255,220,150,${.4 * (1 - off)})`); }
    shape(ctx, '#2a2a30', 0, rect(-400, 620, 2100, 300));
    ctx.restore();
    ctx.save(); ctx.translate(200, 470); ctx.rotate(-.04); shape(ctx, '#f4efe2', 4, rect(-110, -120, 220, 230, 3)); shape(ctx, RED, 0, rect(-110, -120, 220, 50)); txt(ctx, 'OCTOBER', 0, -94, FX.FONT(700, 22), '#fff'); txt(ctx, '31', 0, 20, FX.DISPLAY(110)); ctx.restore();
    if (age > 0) { ctx.save(); ctx.globalAlpha = clamp(age / .4); FX.bigText(ctx, '1874 – 1926', 800, 330, 64, { color: PAPER }); FX.bigText(ctx, 'AGE 52', 800, 420, 54, { color: GOLD }); ctx.restore(); }
    FX.caption(ctx, 'HARRY HOUDINI DIED AT GRACE HOSPITAL, DETROIT', d + .4, 0);
    FX.vignette(ctx, 640, 360, .65);
    FX.dateTag(ctx, 'OCT 31, 1926');
  }

  // ================= DID THE PUNCH KILL HIM? =================
  function k1(ctx, lt, dur, t) { // at the time, many thought so
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, '#3a3a44', 0, rect(-400, -300, 2100, 1000)); shape(ctx, '#2a2a30', 0, rect(-400, 620, 2100, 400));
    [['bowler', 'overcoat', 300], ['cloche', 'dress20s', 520], ['student', 'sweater', 760], ['mediumCollar', 'highCollar', 980]].forEach(([h, o, x], i) =>
      fig(ctx, x, 720, .34, cast(h, o, { hands: { L: [-120, -480], R: [120, -480] }, face: { brows: 'worried', mouth: i % 2 ? 'o' : 'frown', look: [0, -.3], eyes: blink(t, at('thought') + .8 + i * .5) } })));
    ctx.restore();
    bubble(ctx, 640, 260, 360, 110, 640, 380, lt - 1.4, { text: 'THE PUNCH!', font: FX.DISPLAY(46), color: RED });
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'NOV 1926');
    chapterFor(ctx, 'DID THE PUNCH KILL HIM?', lt, 2.0);
  }
  function k2(ctx, lt, dur, t) { // The New York Times: physicians blamed one of the blows
    const b = since(t, 'blamed');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    if (lt > .2) newspaper(ctx, 640, 380, 620, 520, { mast: 'NEW YORK, NOVEMBER 1926', date: 'MORNING EDITION', head: ['HOUDINI\'S DEATH', 'BLAMED ON A BLOW'], hs: 48, rot: -.02, scale: slam(lt - .2), seed: 121 });
    if (b > 0) { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#f6e04a'; ctx.translate(640, 380); ctx.rotate(-.02); ctx.fillRect(-250, -36, 500 * ease.out(clamp(b / .5)), 52); ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, 'THE NEW YORK TIMES REPORTED', lt, .3, W - 60, 40);
    if (b > 0) FX.caption(ctx, 'HIS PHYSICIANS BLAMED ONE OF THE BLOWS', b, .1);
    FX.vignette(ctx, 640, 380, .55);
  }
  function k3(ctx, lt, dur, t) { // the insurer: accidental death; a double indemnity paid to Bess
    const bs = since(t, 'bess'), db = since(t, 'double');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    FX.paperDoc(ctx, 380, 380, 420, 540, { title: 'LIFE INSURANCE', titleSize: 34, sub: 'CLAIM: HARRY HOUDINI', lines: 12, rot: -.03, seed: 131 });
    FX.stamp(ctx, 'ACCIDENTAL', 380, 420, lt - .8, { color: RED, size: 46 });
    if (bs > -.3) { const k = ease.out(clamp((bs + .3) / .4)); ctx.save(); ctx.translate(lerp(W + 200, 880, k), 300);
      frame(ctx, 0, 0, 200, 250, '#cdbb98', () => fig(ctx, 0, 390, .4, cast('bess', 'bessDress', { face: { mouth: 'flat', brows: 'worried', look: [-.3, 0] } }), { filter: 'sepia(.5)' })); ctx.restore();
      label(ctx, [['BESS HOUDINI', FX.DISPLAY(28)], ['his widow', FX.FONT(600, 18)]], 880, 520, (bs) / .35, .02, 300); }
    ctx.restore();
    if (db > 0) { FX.bigText(ctx, '× 2', 1080, 150, 80, { color: GOLD }); FX.caption(ctx, 'DOUBLE INDEMNITY: A DOUBLED PAYOUT FOR ACCIDENTAL DEATH', db, .3); }
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1926 – 1927');
  }
  function k4(ctx, lt, dur, t) { // modern medicine: it usually starts inside — a blow from outside is extremely rare
    const u = since(t, 'usually'), bl = since(t, 'blockage'), o = since(t, 'outside'), r = since(t, 'rare');
    FX.darkBg(ctx, '#23303a');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    const torso = smooth([[440, 60], [840, 60], [920, 180], [910, 420], [880, 680], [400, 680], [370, 420], [360, 180]]);
    shape(ctx, '#e7c7a8', 5, torso);
    ctx.save(); ctx.beginPath(); torso(ctx); ctx.clip(); appendixPanel(ctx, 600, 400, .85, bl > 0 ? (o > 0 ? 2 : 1) : 0, bl > 0 ? clamp((o > 0 ? o : bl) / .8) : 1); ctx.restore();
    shape(ctx, null, 5, torso);
    if (u > 0) { ring(ctx, 596, 500, 74, 90, (u - .2) / .6, GOLD); txt(ctx, 'STARTS INSIDE', 340, 500, FX.FONT(700, 24), GOLD, 'right'); }
    if (o > 0) { // a fist outside the body, a dotted arrow — the rare route
      const k = ease.out(clamp(o / .4)); ctx.save(); ctx.translate(lerp(1300, 1080, k), 520); ctx.scale(1.4, 1.4); Ch.hand(ctx, [0, 0], Math.PI, 'fist', Ch.HCOL.skin, 1); ctx.restore();
      ctx.save(); ctx.setLineDash([10, 10]); line(ctx, [[1020, 520], [930, 540]], 5, PAPER); ctx.restore();
      txt(ctx, 'A BLOW FROM OUTSIDE', 1080, 400, FX.FONT(700, 22), PAPER); }
    ctx.restore();
    if (r > 0) FX.stamp(ctx, 'EXTREMELY RARE', 1040, 640, r, { color: RED, size: 38 });
    FX.caption(ctx, 'MODERN MEDICINE IS MORE SKEPTICAL', lt, .2, W - 60, 40);
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'TODAY');
  }
  const STAGES = ['BLOCKAGE', 'INFLAMMATION', 'RUPTURE', 'PERITONITIS'];
  function k5(ctx, lt, dur, t) { // the likelier sequence: blockage → inflammation → rupture → peritonitis
    FX.darkBg(ctx, '#23303a');
    const step = (dur - .6) / 4;
    STAGES.forEach((n, i) => {
      const k = lt - .2 - i * step; if (k <= 0) return; const x = 190 + i * 300, y = 360;
      ctx.save(); ctx.translate(x, y); const s = FX.settle(clamp(k / .3)); ctx.scale(s, s);
      shape(ctx, '#e7c7a8', 5, c => c.roundRect(-120, -150, 240, 300, 18)); ctx.beginPath(); ctx.roundRect(-120, -150, 240, 300, 18); ctx.clip();
      appendixPanel(ctx, 0, -40, .75, i + 1, clamp(k / (step * .9))); ctx.restore();
      txt(ctx, n, x, y + 190, FX.DISPLAY(28), i >= 2 ? RED : PAPER);
      if (i < 3) { const kk = clamp((k - step * .7) / .3); if (kk > 0) { line(ctx, [[x + 128, y], [x + 128 + 44 * kk, y]], 6, PAPER); if (kk > .9) shape(ctx, PAPER, 0, poly([[x + 172, y - 12], [x + 188, y], [x + 172, y + 12]])); } }
    });
    FX.caption(ctx, 'HE WAS PROBABLY ALREADY DEVELOPING APPENDICITIS', since(t, 'developing') + .2, 0);
    FX.dateTag(ctx, 'THE LIKELIER SEQUENCE');
  }
  function k6(ctx, lt, dur, t) { // the punches gave everyone an easy explanation: a bruise
    const br = since(t, 'bruise');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 380);
    dressingRoom(ctx);
    fig(ctx, 640, 740, .44, houdini({ lean: .05, hands: { L: [-40, -660], R: [60, -640] }, face: { brows: 'worried', mouth: 'grit', look: [-.4, .5], eyes: blink(t, at('punches') + 1.5) }, breathe: breathe(t) }));
    // a pulsing inner glow under his hand: the real problem, hidden
    const p = (Math.sin(lt * 4) + 1) / 2; glow(ctx, 650, 740 - 650 * .44, 90 + p * 20, `rgba(255,80,60,${.25 + .2 * p})`);
    ctx.restore();
    bubble(ctx, 960, 200, 300, 150, 760, 320, br + .2, { thought: true, draw: c => { txt(c, 'JUST A', 0, -22, FX.FONT(700, 22)); txt(c, 'BRUISE.', 0, 16, FX.DISPLAY(44), '#6a4a9a'); } });
    FX.caption(ctx, 'AN EASY EXPLANATION FOR THE PAIN', lt, .4);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'OCT 1926');
  }
  function k7(ctx, lt, dur, t) { // so he kept performing, on a broken ankle and a failing abdomen
    const an = since(t, 'ankle');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    stageSet(ctx);
    fig(ctx, 640, 650, .36, houdini({ hands: { L: [-330, -1150], R: [330, -1150] }, handShape: { L: 'open', R: 'open' }, face: { brows: 'worried', mouth: 'smile', look: [0, -.1] }, breathe: breathe(t) }));
    if (an > 0) { ring(ctx, 640 + 70 * .36, 650 - 40 * .36, 34, 30, an / .4, GOLD); const p = (Math.sin(lt * 4) + 1) / 2; glow(ctx, 640, 650 - 650 * .36, 70 + p * 16, `rgba(255,80,60,${.3 + .2 * p})`); }
    ctx.restore();
    if (an > 0) { txt(ctx, 'BROKEN ANKLE', 830, 610, FX.FONT(700, 22), GOLD, 'left'); txt(ctx, 'FAILING ABDOMEN', 800, 400, FX.FONT(700, 22), '#ff9a80', 'left'); }
    FX.caption(ctx, 'SO HE KEPT PERFORMING', lt, .2);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'OCT 1926');
  }
  function k8(ctx, lt, dur, t) { // by the time a surgeon saw it, it had burst
    FX.darkBg(ctx, '#2b2724');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 380);
    shape(ctx, PAPER, 6, circle(640, 360, 230)); ctx.save(); ctx.beginPath(); ctx.arc(640, 360, 224, 0, Math.PI * 2); ctx.clip(); shape(ctx, '#e7c7a8', 0, rect(400, 120, 480, 480));
    appendixPanel(ctx, 640, 300, 1.4, 3, clamp((lt - .6) / 1)); ctx.restore();
    ctx.restore();
    FX.stamp(ctx, 'BURST', 1000, 560, lt - 1.4, { color: RED, size: 54 });
    FX.caption(ctx, 'BY THE TIME A SURGEON SAW IT', lt, .2, W - 60, 40);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'OCT 25, 1926');
  }
  function k9(ctx, lt, dur, t) { // not the cause — the disguise
    const d = since(t, 'disguised');
    FX.darkBg(ctx, '#2a2622');
    const card = (y, title, k) => { if (k <= 0) return; ctx.save(); ctx.translate(560, y); ctx.scale(slam(k), slam(k)); FX.paperDoc(ctx, 0, 0, 640, 140, { lines: 0, draw: c => txt(c, title, 0, 4, FX.DISPLAY(46)) }); ctx.restore(); };
    card(240, 'THE PUNCH CAUSED HIS DEATH?', lt - .2); cross(ctx, 960, 240, 50, lt - 1.4);
    card(460, 'THE PUNCH DISGUISED IT.', d); tick(ctx, 960, 440, 46, d - .6);
    FX.dateTag(ctx, 'THE LIKELIER STORY');
  }
  function k10(ctx, lt, dur, t) { // Whitehead was never charged
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 360);
    parlour(ctx, '#3e3a3a');
    frame(ctx, 640, 330, 260, 340, '#cdbb98', () => fig(ctx, 640, 900, .58, whitehead({ face: { mouth: 'flat', brows: 'calm', look: [0, 0] } }), { filter: 'sepia(.7)' }));
    ctx.restore();
    label(ctx, [['J. GORDON WHITEHEAD', FX.DISPLAY(28)]], 640, 600, (lt - .2) / .35, -.02, 420);
    FX.stamp(ctx, 'NEVER CHARGED', 900, 220, lt - .6, { color: RED, size: 48, rot: .1 });
    FX.vignette(ctx, 640, 360, .6);
    T.fill(ctx, '#000', ease.in(prog(lt, dur - 1, dur)));
  }

  // ---------- timeline ----------
  A.lastTen = A.fall - .9; A.didPunch = A.thought - .5;
  const cut = [
    ['d1', d1], ['feb', d2], ['may', d3], ['before', d4], ['hearing', d5], ['never', d6], ['pages', d7], ['escalating', d8], ['summer', d9], ['response', d10],
    ['aug5', d11], ['lowered', descent], ['ninety', counter], ['yellow', d13], ['notes', d14], ['perfect', d15], ['last', d16],
    ['lastTen', l1], ['albany', l2], ['touring', l3], ['oct22', l4], ['oneof', l5], ['accounts', l6], ['core', l7], ['performed', l8], ['train', l9], ['ill', l10],
    ['doctor', l11], ['garrick', l12], ['oct24', l13], ['hospitalized', l14], ['surgeons', l15], ['antibiotics', l16], ['again', l17], ['oct31', l18],
    ['didPunch', k1], ['times', k2], ['insurer', k3], ['modern', k4], ['likelier', k5], ['punches', k6], ['kept', k7], ['burst', k8], ['caused', k9], ['charged', k10],
  ];
  const DURATION = A.end + 1.5;
  const shots = cut.map(([k, draw], i) => ({ start: i ? A[k] - .15 : 0, end: i + 1 < cut.length ? A[cut[i + 1][0]] - .15 : DURATION, draw }));
  const struckHits = [...Array(6)].map((_, i) => A.struck + .6 + i * .58).filter(h => h < A.stopped + .1);
  const sfx = [
    { t: A.exposing + .3, type: 'whoosh', gain: .5 }, { t: A.feb + .4, type: 'click', gain: .5 }, { t: A.hr, type: 'slide', gain: .6 },
    ...[0, 1, 2, 3].map(i => ({ t: A.may + .4 + i * .25, type: 'scratch', gain: .3 })), { t: A.rose, type: 'whoosh', gain: .4 },
    { t: A.frauds, type: 'hit', gain: .6 }, { t: A.accused, type: 'thud', gain: .6 }, { t: A.never + .5, type: 'thud' },
    ...[0, 1, 2].map(i => ({ t: A.pages + .2 + i * .35, type: 'paper' })), { t: A.escalating + .3, type: 'swell', gain: .5 },
    { t: A.summer + .2, type: 'splash', gain: .5 }, { t: A.box, type: 'click', gain: .5 }, { t: A.trance, type: 'thud', gain: .5 }, { t: A.notrance + .2, type: 'thud' },
    { t: A.casket + .3, type: 'creak', gain: .6 }, { t: A.casket + 1.3, type: 'clang', gain: .4 }, ...[0, 1, 2, 3, 4, 5].map(i => ({ t: A.casket + 1.4 + i * .12, type: 'click', gain: .4 })),
    { t: A.lowered, type: 'splash', gain: .8 }, { t: A.lowered + .3, type: 'bubbles', gain: .6 }, { t: A.ninety + .2, type: 'bubbles', gain: .5 },
    { t: A.lights, type: 'swell', gain: .5 }, { t: A.notes + 1, type: 'slide', gain: .5 }, { t: A.miners, type: 'wind', gain: .3 },
    { t: A.explained, type: 'thud' }, { t: A.lastTen + .4, type: 'clang', gain: .5 }, ...['albany', 'montreal'].map(k => ({ t: A[k], type: 'click', gain: .5 })),
    { t: A.albany + .3, type: 'bubbles', gain: .4 }, { t: A.fractured, type: 'hit', gain: 1 }, { t: A.fractured + .3, type: 'thud', gain: .6 },
    { t: A.sources, type: 'paper', gain: .5 }, { t: A.students, type: 'creak', gain: .5 },
    ...struckHits.map(h => ({ t: h, type: 'hit', gain: .9 })), { t: A.stopped, type: 'thud', gain: .5 },
    { t: A.train, type: 'wind', gain: .4 }, { t: A.hospital, type: 'thud', gain: .4 }, { t: A.fever, type: 'swell', gain: .5 },
    { t: A.ruptured, type: 'hit', gain: .6 }, { t: A.fatal, type: 'thud' }, { t: A.died + .8, type: 'boom', gain: .5 },
    { t: A.didPunch + .5, type: 'clang', gain: .4 }, { t: A.times + .2, type: 'paper' }, { t: A.insurer + .8, type: 'thud', gain: .7 }, { t: A.double, type: 'click', gain: .5 },
    { t: A.rare, type: 'thud', gain: .7 }, { t: A.burst + 1.4, type: 'thud' }, { t: A.caused + 1.4, type: 'hit', gain: .5 }, { t: A.disguised, type: 'thud', gain: .7 }, { t: A.charged + .6, type: 'thud' },
  ];
  const moods = [
    { t: 0, mood: 'tense' }, { t: A.summer, mood: 'mystery' }, { t: A.yellow, mood: 'silence' }, { t: A.perfect, mood: 'still' },
    { t: A.lastTen, mood: 'tense' }, { t: A.oct22, mood: 'still' }, { t: A.core, mood: 'tense' }, { t: A.oct31, mood: 'silence' },
    { t: A.didPunch, mood: 'mystery' }, { t: A.caused, mood: 'still' },
  ];
  G.Show = {
    duration: DURATION, narration: 'assets/audio/narration-part4.mp3', shots, sfx, moods,
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png', suitEyeL: 'assets/img/rig/suit-eye-l.png', suitEyeR: 'assets/img/rig/suit-eye-r.png', bedEyeL: 'assets/img/rig/bed-eye-l.png', bedEyeR: 'assets/img/rig/bed-eye-r.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
