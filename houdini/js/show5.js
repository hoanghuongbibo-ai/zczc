/* Part 5 (final) — "The Prophecy and the Code", "Was Houdini Murdered?", "The Answer", and the bridge to
 * the next story. Every shot is keyed to a word anchor in window.T5 (seconds into narration-part5.mp3),
 * written by tools/align-part5.py. Shared set pieces come from js/show3.js (G.Part3A.lib) and the opening
 * (death record, cemetery, grave). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Ch = G.Chars, L3 = G.Part3A.lib;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const A = G.T5, INK = FX.INK, fig = FX.fig;
  const at = k => A[k], since = (t, k) => t - A[k];
  const { chapter, frame, label, parlour, newspaper, slam, bubble, cross, tick, ring, scribble, houdini, cast, breathe, blink, ghostIcon, RED, PAPER } = L3;
  const GOLD = '#f6c945';
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  const chapterFor = (ctx, text, lt, hold = 2.4) => { if (lt < hold) chapter(ctx, text, lt); else if (lt < hold + .3) { ctx.save(); ctx.globalAlpha = 1 - (lt - hold) / .3; chapter(ctx, text, lt); ctx.restore(); } };
  const bess = (o = {}) => cast('bess', 'bessDress', o);
  const candle = (ctx, x, y, t, lit = 1, s = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#efe6d0', 3.5, rect(-12, -60, 24, 60, 3));
    if (lit > 0) { const fl = 1 + Math.sin(t * 13) * .08; ctx.globalAlpha = lit; glow(ctx, 0, -76, 90 * fl, 'rgba(255,190,110,.5)'); shape(ctx, '#ffd27a', 2, smooth([[0, -60], [-8, -74], [0, -96], [8, -74]])); } ctx.restore(); };
  const photo = (ctx, x, y, s, filter = 'sepia(.8)') => frame(ctx, x, y, 150 * s, 190 * s, '#cdbb98', () => G.Rig.drawSuit(ctx, x - 533 * .26 * s / 2, y - 95 * s + 4, .26 * s, { filter }));
  function stageSet(ctx) {
    shape(ctx, '#7a2621', 0, rect(-600, -500, 2500, 1140));
    for (let x = -600; x < 1900; x += 78) { shape(ctx, '#5f1b17', 0, rect(x + 22, -500, 22, 1140)); shape(ctx, '#943229', 0, rect(x + 52, -500, 8, 1140)); }
    shape(ctx, '#5a4231', 0, rect(-600, 640, 2500, 400)); line(ctx, [[-600, 640], [1900, 640]], 4, 'rgba(0,0,0,.45)');
    glow(ctx, 640, 420, 420, 'rgba(255,220,160,.28)');
  }
  // the Houdinis' mind-reading code: words → digits → letters
  const CODE = [['ANSWER', '2', 'B'], ['TELL', '5', 'E'], ['PRAY-ANSWER', '1-2', 'L'], ['LOOK', '9', 'I'], ['TELL', '5', 'E'], ['ANSWER-ANSWER', '2-2', 'V'], ['TELL', '5', 'E']];
  const TABLE = [['PRAY', 1], ['ANSWER', 2], ['SAY', 3], ['NOW', 4], ['TELL', 5], ['PLEASE', 6], ['SPEAK', 7], ['QUICKLY', 8], ['LOOK', 9], ['BE QUICK', 0]];
  const believe = (ctx, x, y, px, a = 1) => { ctx.save(); ctx.globalAlpha = a; glow(ctx, x, y, px * 3, `rgba(255,220,140,${.35 * a})`); FX.bigText(ctx, 'BELIEVE', x, y, px, { color: GOLD }); ctx.restore(); };

  // ================= THE PROPHECY AND THE CODE =================
  function e1(ctx, lt, dur, t) { // a tragic, ordinary death
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    G.Part2.desk(ctx); G.Part2.record(ctx, 1, 1, 1);
    FX.stamp(ctx, 'ORDINARY?', 700, 420, since(t, 'ordinary1') + .3, { color: RED, size: 48 });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'NOV 1926');
    chapterFor(ctx, 'THE PROPHECY AND THE CODE', lt, 2.6);
  }
  function e2(ctx, lt, dur, t) { // four years making sure his death could not be ordinary
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    const n = Math.min(4, Math.floor(lt / ((dur - .6) / 5)));                       // calendar flips 1922 → 1926
    for (let i = 0; i <= n; i++) { const k = lt - i * (dur - .6) / 5; ctx.save(); ctx.translate(380 + i * 6, 380 - i * 4); ctx.rotate(-.04 + i * .015); ctx.scale(slam(k + .2), slam(k + .2));
      shape(ctx, '#f4efe2', 4, rect(-150, -170, 300, 340, 3)); shape(ctx, RED, 0, rect(-150, -170, 300, 60)); txt(ctx, 'YEAR', 0, -140, FX.FONT(700, 22), '#fff'); txt(ctx, String(1922 + i), 0, 30, FX.DISPLAY(90)); ctx.restore(); }
    ctx.restore();
    const posters = [['SÉANCES EXPOSED', 860, 230, -.05], ['FRAUD!', 1040, 330, .04], ['HOUDINI vs. THE MEDIUMS', 880, 470, .03]];
    posters.forEach(([s, x, y, r], i) => { const k = lt - .4 - i * .5; if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(slam(k), slam(k)); FX.paperDoc(ctx, 0, 0, 340, 90, { lines: 0, draw: c => txt(c, s, 0, 4, FX.DISPLAY(30), RED) }); ctx.restore(); });
    FX.caption(ctx, 'HIS DEATH COULD NOT BE ORDINARY', lt, .6);
    FX.dateTag(ctx, '1922 – 1926');
  }
  function e3(ctx, lt, dur, t) { // for believers: died on Halloween, as the spirit voice foretold
    const h = since(t, 'halloween'), f = since(t, 'foretold');
    FX.darkBg(ctx, '#221a20');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    glow(ctx, 640, 380, 500, 'rgba(255,140,60,.12)');
    [['THE DAILY GAZETTE', ['HOUDINI DIES', 'ON HALLOWEEN'], 400, 380, -.06, lt - .3], ['THE EVENING HERALD', ['THE MAN WHO', 'MOCKED SPIRITS'], 650, 400, .04, at('mocked') - at('believers') < lt ? lt - (at('mocked') - at('believers')) : -1], ['BOSTON EVENING BUGLE', ["'WALTER'S'", 'PROPHECY COMES TRUE'], 900, 370, -.03, f]]
      .forEach(([m, hd, x, y, r, k], i) => { if (k > 0) newspaper(ctx, x, y, 380, 480, { mast: m, date: 'NOV 1926', head: hd, hs: 34, rot: r, scale: slam(k), seed: 140 + i }); });
    ctx.restore();
    if (h > 0) for (const [x, y] of [[90, 640], [1190, 640]]) { const k = FX.settle(clamp(h / .3)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); shape(ctx, '#e07a2a', 4.5, ellipse(0, 0, 60, 48)); shape(ctx, '#5a7a3a', 3.5, rect(-6, -60, 14, 20, 4)); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-26, -10); ctx.lineTo(-12, -24); ctx.lineTo(-12, -6); ctx.moveTo(26, -10); ctx.lineTo(12, -24); ctx.lineTo(12, -6); ctx.fill(); glow(ctx, 0, 0, 100, 'rgba(255,170,80,.35)'); ctx.restore(); }
    FX.caption(ctx, 'FOR BELIEVERS, THE PATTERN WAS IRRESISTIBLE', lt, .3, W - 60, 30);
    FX.vignette(ctx, 640, 380, .6);
  }
  function e4(ctx, lt, dur, t) { // for skeptics: a vague prediction, remembered because it landed
    const fi = since(t, 'fifties'), ld = since(t, 'land');
    FX.darkBg(ctx, '#23303a');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    FX.paperDoc(ctx, 360, 360, 460, 360, { lines: 0, rot: -.02, draw: c => {
      txt(c, 'THE PREDICTION', 0, -130, FX.DISPLAY(34));
      [['VAGUE', lt - .4], ['A MAN IN HIS FIFTIES', fi], ['DOING DANGEROUS STUNTS', fi + .7]].forEach(([s, k], i) => { if (k > 0) { txt(c, s, -170, -60 + i * 60, FX.FONT(700, 24), INK, 'left'); tick(c, 190, -60 + i * 60, 18, k); } }); } });
    // the dartboard: lots of misses nobody remembers, one hit everyone does
    const bx = 940, by = 360; for (const [r, col] of [[170, '#2a2a2e'], [130, '#e9dcb8'], [90, '#2a2a2e'], [50, '#e9dcb8'], [16, RED]]) shape(ctx, col, 4, circle(bx, by, r));
    const r = rng(6); for (let i = 0; i < 9; i++) { const a = r() * 6.28, d = 100 + r() * 140; ctx.save(); ctx.globalAlpha = ld > 0 ? .25 : .8; line(ctx, [[bx + Math.cos(a) * d, by + Math.sin(a) * d], [bx + Math.cos(a) * d + 24, by + Math.sin(a) * d - 24]], 5, '#6a6a6a'); ctx.restore(); }
    if (ld > 0) { const k = clamp(ld / .2); line(ctx, [[bx + 2, by - 2], [bx + 2 + 60 * k, by - 2 - 60 * k]], 7, GOLD); glow(ctx, bx, by, 80, 'rgba(255,220,120,.5)'); }
    ctx.restore();
    FX.caption(ctx, ld > 0 ? 'REMEMBERED BECAUSE IT HAPPENED TO LAND' : 'FOR SKEPTICS', lt, .2);
    FX.vignette(ctx, 640, 380, .5);
  }
  function e5(ctx, lt, dur, t) { // buried Nov 4 at Machpelah, in the bronze casket from his buried-alive act
    G.Part3.shotCemetery(ctx, lt, dur, t);
    FX.dateTag(ctx, 'NOV 4, 1926');
    const b = since(t, 'bronze');
    if (b > 0) { const k = ease.out(clamp(b / .4)); ctx.save(); ctx.translate(lerp(W + 300, 960, k), 200); ctx.rotate(.03);
      shape(ctx, PAPER, 4, rect(-210, -90, 420, 180, 4));
      shape(ctx, grad(ctx, 0, -30, 0, 30, [[0, '#d8a85a'], [1, '#8a6a30']]), 4, c => c.roundRect(-170, -40, 340, 60, 10)); line(ctx, [[-170, -20], [170, -20]], 3);
      txt(ctx, 'THE BRONZE CASKET', 0, 50, FX.FONT(700, 20)); txt(ctx, 'built for his buried-alive act', 0, 74, FX.FONT(600, 15), '#5a5048'); ctx.restore(); }
  }
  function e6(ctx, lt, dur, t) { // one more test: a sealed message
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 380);
    const k = FX.settle(clamp((lt - .2) / .4)); ctx.save(); ctx.translate(640, 380); ctx.scale(k, k); ctx.rotate(-.03);
    shape(ctx, '#e9dcb8', 4, rect(-220, -140, 440, 280, 4)); line(ctx, [[-220, -140], [0, 20], [220, -140]], 3); shape(ctx, RED, 3, circle(0, 20, 30)); txt(ctx, 'H', 0, 22, FX.DISPLAY(32), '#f1c0b0');
    txt(ctx, 'ONE MORE TEST', 0, 100, FX.DISPLAY(32)); ctx.restore();
    ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, 'ARRANGED BEFORE 1926');
  }
  function e7(ctx, lt, dur, t) { // he and Bess agreed on a secret message; a medium who delivered it word for word would prove it
    const r = since(t, 'reach'), m = since(t, 'medium');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 560, 360);
    parlour(ctx, '#3e3448');
    frame(ctx, 470, 330, 270, 350, '#cdbb98', () => fig(ctx, 470, 940, .56, bess({ face: { mouth: 'smile', brows: 'calm', look: [.3, 0], eyes: blink(t, at('bess') + 1.5, at('bess') + 5) }, breathe: breathe(t) })), true);
    ctx.restore();
    label(ctx, [['BESS HOUDINI', FX.DISPLAY(34)], ['his wife and stage partner', FX.FONT(600, 20)]], 940, 170, (lt - .2) / .35, .03, 380);
    if (r > 0) { // a dotted path from "the other side" to her
      const k = clamp(r / 1.2); ctx.save(); ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(1240, 420); ctx.quadraticCurveTo(900, 300, lerp(1240, 640, k), lerp(420, 360, k)); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(220,230,255,.8)'; ctx.stroke(); ctx.restore();
      ghostIcon(ctx, 1200, 430, 1.1, .8); txt(ctx, 'THE OTHER SIDE', 1150, 520, FX.FONT(700, 18), '#cfe0ff'); }
    if (m > 0) { ctx.save(); ctx.translate(940, 620); ctx.scale(slam(m), slam(m)); FX.paperDoc(ctx, 0, 0, 420, 90, { lines: 0, draw: c => txt(c, 'WORD FOR WORD = PROOF', 0, 4, FX.DISPLAY(30), RED) }); ctx.restore(); }
    FX.vignette(ctx, 640, 360, .55);
    FX.dateTag(ctx, 'A SECRET MESSAGE');
  }
  function codeTable(ctx, x, y, s, hl = -1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    FX.paperDoc(ctx, 0, 0, 300, 420, { lines: 0, draw: c => { txt(c, 'THE CODE', 0, -180, FX.DISPLAY(28));
      TABLE.forEach(([w, d], i) => { const yy = -136 + i * 32; if (i === hl) { c.save(); c.globalAlpha = .4; c.fillStyle = '#f6e04a'; c.fillRect(-130, yy - 14, 260, 28); c.restore(); } txt(c, w, -110, yy, FX.FONT(700, 18), INK, 'left'); txt(c, String(d), 110, yy, FX.DISPLAY(22), RED, 'right'); }); } });
    ctx.restore();
  }
  function e8(ctx, lt, dur, t) { // the code came from their mind-reading act: words for numbers, numbers for letters
    const w = since(t, 'words');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    stageSet(ctx);
    fig(ctx, 420, 650, .36, bess({ hands: { L: [-120, -480], R: [120, -480] }, face: { eyes: 0, brows: 'calm', mouth: 'flat' }, breathe: breathe(t) }));
    shape(ctx, '#1f1a18', 3, c => c.roundRect(420 - 70 * .36 - 10, 650 - 1300 * .36 + 4, 80 * .36 + 20, 16, 6));               // blindfold
    const ask = Math.max(0, Math.sin(lt * 2.4));
    fig(ctx, 800, 650, .36, houdini({ hands: { L: [-120, -480], R: [lerp(140, 300, ask), lerp(-600, -900, ask)] }, face: { brows: 'up', mouth: ask > .5 ? 'o' : 'smirk', look: [.6, -.1] }, breathe: breathe(t) }), { mirror: true });
    ctx.restore();
    bubble(ctx, 860, 150, 300, 90, 820, 280, lt - .4, { text: '"PRAY… TELL…"', font: FX.DISPLAY(32) });
    if (w > 0) codeTable(ctx, lerp(W + 200, 1100, ease.out(clamp(w / .5))), 420, .8, Math.floor(w * 3) % 10);
    FX.caption(ctx, 'THEIR OLD MIND-READING ACT', lt, .3);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'THE HOUDINIS ON STAGE');
  }
  function e9(ctx, lt, dur, t) { // "Rosabelle": the song Bess sang when they met, engraved inside her ring
    const s = since(t, 'song'), r = since(t, 'ring');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    FX.bigText(ctx, '"ROSABELLE"', 640, 140, 80, { color: GOLD });
    if (s > 0) { ctx.save(); ctx.translate(lerp(-300, 380, ease.out(clamp(s / .5))), 420); ctx.rotate(-.04); FX.paperDoc(ctx, 0, 0, 320, 400, { lines: 0, fill: '#efe0c0', draw: c => {
      txt(c, 'ROSABELLE', 0, -140, `700 34px Georgia, serif`); txt(c, 'a popular song', 0, -104, FX.FONT(600, 16), '#5a5048');
      for (let i = 0; i < 5; i++) line(c, [[-130, -40 + i * 14], [130, -40 + i * 14]], 2); for (let i = 0; i < 7; i++) { c.fillStyle = INK; c.beginPath(); c.ellipse(-110 + i * 36, -36 + (i % 3) * 10, 8, 6, -.3, 0, 7); c.fill(); line(c, [[-102 + i * 36, -36 + (i % 3) * 10], [-102 + i * 36, -76 + (i % 3) * 10]], 2.5); }
      txt(c, 'the song Bess sang', 0, 90, FX.FONT(700, 20)); txt(c, 'when they first met', 0, 118, FX.FONT(700, 20)); } }); ctx.restore(); }
    if (r > 0) { const k = FX.settle(clamp(r / .4)), spin = Math.sin(lt * 1.2) * .3; ctx.save(); ctx.translate(900, 420); ctx.scale(k, k); glow(ctx, 0, 0, 200, 'rgba(255,220,140,.3)');
      ctx.save(); ctx.scale(1, .55 + spin * .2); shape(ctx, '#d8a85a', 6, c => { c.arc(0, 0, 130, 0, Math.PI * 2); c.arc(0, 0, 100, 0, Math.PI * 2, true); }); ctx.restore();
      txt(ctx, 'ROSABELLE', 0, 0, `italic 700 28px Georgia, serif`, '#6a4a1a'); ctx.restore(); txt(ctx, 'ENGRAVED INSIDE HER WEDDING RING', 900, 600, FX.FONT(700, 20), PAPER); }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
  }
  function e10(ctx, lt, dur, t) { // the rest decodes, word by word, to B-E-L-I-E-V-E
    FX.darkBg(ctx, '#23303a');
    codeTable(ctx, 160, 380, .78, -1);
    const keys = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'], x0 = 360, dx = 132;
    keys.forEach((k, i) => {
      const s = since(t, k); if (s <= 0) return;
      const x = x0 + i * dx, k1 = FX.settle(clamp(s / .25)), k2 = clamp((s - .25) / .25), k3 = FX.settle(clamp((s - .45) / .25));
      ctx.save(); ctx.translate(x, 230); ctx.scale(k1, k1); shape(ctx, PAPER, 3.5, rect(-60, -30, 120, 60, 4)); txt(ctx, CODE[i][0], 0, 2, FX.FONT(700, CODE[i][0].length > 8 ? 12 : 17)); ctx.restore();
      if (k2 > 0) { ctx.save(); ctx.globalAlpha = k2; line(ctx, [[x, 266], [x, 296]], 3, PAPER); txt(ctx, CODE[i][1], x, 330, FX.DISPLAY(36), RED); line(ctx, [[x, 360], [x, 390]], 3, PAPER); ctx.restore(); }
      if (k3 > 0) { ctx.save(); ctx.translate(x, 450); ctx.scale(k3, k3); FX.bigText(ctx, CODE[i][2], 0, 0, 80, { color: GOLD }); ctx.restore(); }
    });
    const sp = since(t, 'spelled'); if (sp > 0) txt(ctx, 'numbers → letters: 1 = A, 2 = B … 12 = L, 22 = V', 760, 560, FX.FONT(700, 20), '#cfe0ff');
    FX.caption(ctx, 'EACH CODE WORD BECOMES A LETTER', lt, .3, W - 60, 40);
  }
  function e11(ctx, lt, dur, t) { // Believe.
    shape(ctx, '#120e10', 0, rect(0, 0, W, H));
    const k = ease.out(clamp(lt / .5)); believe(ctx, 640, 360, lerp(90, 120, k), k);
  }
  function e12(ctx, lt, dur, t) { // Bess held séances on the anniversary of his death
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    shape(ctx, '#1a1416', 0, rect(-400, -300, 2100, 1300)); glow(ctx, 640, 470, 480, 'rgba(255,170,110,.22)');
    fig(ctx, 640, 900, .44, bess({ hands: { L: [-170, -700], R: [170, -700] }, face: { brows: 'worried', mouth: 'flat', look: [0, -.4], eyes: blink(t, at('seances') + 1.4) }, breathe: breathe(t) * .5 }));
    shape(ctx, '#3a221c', 5, ellipse(640, 580, 420, 80)); shape(ctx, '#2e1a15', 5, rect(260, 580, 760, 160));
    candle(ctx, 640, 566, t); photo(ctx, 860, 470, .7);
    ctx.restore();
    ['OCT 31, 1927', 'OCT 31, 1928'].forEach((s, i) => { const k = lt - .5 - i * .6; if (k > 0) { ctx.save(); ctx.translate(150 + i * 40, 160 + i * 70); ctx.rotate(-.05 + i * .06); ctx.scale(slam(k), slam(k)); FX.paperDoc(ctx, 0, 0, 240, 70, { lines: 0, draw: c => txt(c, s, 0, 4, FX.DISPLAY(26), RED) }); ctx.restore(); } });
    FX.caption(ctx, 'SÉANCES ON THE ANNIVERSARY OF HIS DEATH', lt, .3);
    FX.vignette(ctx, 640, 400, .65);
  }
  function e13(ctx, lt, dur, t) { // January 1929: Arthur Ford delivers the code; Bess signs; the papers say he came through
    const f = since(t, 'ford'), sg = since(t, 'signed'), np = since(t, 'newspapers');
    if (np > 0) { FX.darkBg(ctx, '#2a2420'); newspaper(ctx, 640, 380, 640, 520, { mast: 'THE DAILY GAZETTE', date: 'JANUARY 1929', head: ['HOUDINI', 'COMES THROUGH!'], hs: 64, rot: -.03, scale: slam(np), seed: 150 }); FX.vignette(ctx, 640, 380, .55); FX.dateTag(ctx, 'JAN 1929'); return; }
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, '#1a1416', 0, rect(-400, -300, 2100, 1300)); glow(ctx, 640, 470, 520, 'rgba(255,170,110,.2)');
    fig(ctx, 420, 900, .44, cast('ford', 'greySuit', { hands: { L: [-170, -700], R: [170, -700] }, face: { eyes: 0, brows: 'calm', mouth: f > 0 ? 'o' : 'flat' } }));
    fig(ctx, 880, 900, .44, bess({ hands: { L: [-170, -700], R: [170, -700] }, face: { brows: f > 0 ? 'up' : 'worried', mouth: f > .6 ? 'o' : 'flat', look: [-.7, 0], eyes: blink(t, at('jan1929') + 1.2) } }), { mirror: true });
    shape(ctx, '#3a221c', 5, ellipse(640, 580, 420, 80)); shape(ctx, '#2e1a15', 5, rect(260, 580, 760, 160)); candle(ctx, 640, 566, t);
    ctx.restore();
    label(ctx, [['ARTHUR FORD', FX.DISPLAY(30)], ['a medium', FX.FONT(600, 18)]], 250, 140, (f + .2) / .35, -.03, 300);
    if (f > .4) bubble(ctx, 700, 130, 400, 100, 460, 290, f - .4, { draw: c => { txt(c, '"ROSABELLE…', 0, -16, FX.DISPLAY(28)); txt(c, 'BELIEVE."', 0, 18, FX.DISPLAY(28), GOLD); } });
    if (sg > 0) { ctx.save(); ctx.translate(lerp(W + 200, 1020, ease.out(clamp(sg / .4))), 240); ctx.rotate(.04); FX.paperDoc(ctx, 0, 0, 340, 220, { lines: 0, draw: c => { txt(c, 'STATEMENT', 0, -70, FX.FONT(700, 22)); txt(c, 'The message is correct.', 0, -26, `italic 20px Georgia, serif`); scribble(c, -90, 40, 180, 1, clamp((sg - .4) / 1), 3, '#1a2a5a'); txt(c, 'Beatrice Houdini', 0, 76, FX.FONT(600, 14), '#5a5048'); } }); ctx.restore(); }
    FX.vignette(ctx, 640, 400, .65);
    FX.dateTag(ctx, 'JAN 1929');
  }
  function e14(ctx, lt, dur, t) { // the secret wasn't secret: published in Kellock's 1928 biography
    const k = since(t, 'kellock');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    const open = ease.inOut(clamp((lt - .6) / .8));
    ctx.save(); ctx.translate(640, 390);
    shape(ctx, '#4a2a2a', 5, rect(-260 * open - 10, -190, 270 * open + 280, 380, 6));
    if (open < .5) { shape(ctx, '#6a2a2a', 5, rect(-10, -190, 280, 380, 6)); txt(ctx, 'HOUDINI', 130, -100, FX.DISPLAY(40), GOLD); txt(ctx, 'HIS LIFE STORY', 130, -50, FX.FONT(700, 20), PAPER); txt(ctx, 'HAROLD KELLOCK · 1928', 130, 140, FX.FONT(700, 16), PAPER); }
    else { shape(ctx, '#f6f2ea', 3, rect(-250, -176, 250, 352, 2)); shape(ctx, '#f6f2ea', 3, rect(0, -176, 250, 352, 2));
      for (let i = 0; i < 10; i++) { line(ctx, [[-230, -150 + i * 30], [-20, -150 + i * 30]], 3, 'rgba(70,64,58,.35)'); line(ctx, [[20, -150 + i * 30], [230, -150 + i * 30]], 3, 'rgba(70,64,58,.35)'); }
      ctx.save(); ctx.globalAlpha = .4; ctx.fillStyle = '#f6e04a'; ctx.fillRect(20, -60, 210 * clamp((lt - 1.6) / .6), 30); ctx.fillRect(20, -30, 210 * clamp((lt - 2) / .6), 30); ctx.restore();
      txt(ctx, 'ROSABELLE…', 125, -46, `italic 700 20px Georgia, serif`); txt(ctx, '…BELIEVE', 125, -16, `italic 700 20px Georgia, serif`); }
    ctx.restore(); ctx.restore();
    FX.stamp(ctx, 'PUBLISHED 1928', 1030, 180, k + .5, { color: RED, size: 40 });
    FX.caption(ctx, "THE SECRET WASN'T SECRET", lt, .2);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1928');
  }
  function e15(ctx, lt, dur, t) { // Ford could have learned it the ordinary way; Bess later repudiated his claim
    const rp = since(t, 'repudiated');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    parlour(ctx, '#3a3a44');
    fig(ctx, 440, 720, .4, cast('ford', 'greySuit', { hands: { L: [-90, -760], R: [90, -760] }, face: { brows: 'smug', mouth: 'flat', look: [0, .7] } }));
    ctx.save(); ctx.translate(440, 720 - 760 * .4); shape(ctx, '#6a2a2a', 4, rect(-80, -54, 160, 100, 4)); line(ctx, [[0, -54], [0, 46]], 3); ctx.restore();
    ctx.restore();
    if (rp > 0) { ctx.save(); ctx.translate(950, 360); ctx.rotate(.03); FX.paperDoc(ctx, 0, 0, 360, 260, { lines: 6, title: "BESS'S STATEMENT", titleSize: 24 }); ctx.restore(); FX.stamp(ctx, 'REPUDIATED', 950, 380, rp - .3, { color: RED, size: 46 }); }
    FX.caption(ctx, rp > 0 ? 'BESS LATER REPUDIATED HIS CLAIM' : 'HE COULD HAVE LEARNED IT THE ORDINARY WAY', lt, .2);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, '1929');
  }
  function e16(ctx, lt, dur, t) { // Halloween 1936: the Final Houdini Séance, Knickerbocker Hotel roof
    const nt = since(t, 'notthrough');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 380);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#0e1422'], [1, '#2a3048']]); ctx.fillRect(-400, -300, 2100, 1000);
    const r = rng(9); for (let i = 0; i < 50; i++) shape(ctx, 'rgba(255,255,255,.6)', 0, circle(r() * 1600 - 150, r() * 260, 1.4));
    for (let i = 0; i < 12; i++) { const x = -200 + i * 140, h = 80 + (i * 37) % 120; shape(ctx, '#1a2030', 0, rect(x, 380 - h, 110, h + 40)); }
    shape(ctx, '#3a3440', 0, rect(-400, 400, 2100, 400));
    shape(ctx, '#e9dcb8', 4, rect(380, 110, 520, 80, 4)); txt(ctx, 'FINAL HOUDINI SÉANCE', 640, 150, FX.DISPLAY(38), RED);
    // the crowd (about 300): rows of heads
    for (let row = 0; row < 3; row++) for (let i = 0; i < 16; i++) { const x = -60 + i * 90 + row * 30, y = 700 + row * 30; shape(ctx, ['#2a2220', '#3a2c26', '#1f1a18', '#4a3a2a'][(i + row) % 4], 3, circle(x, y - 40, 32)); shape(ctx, '#1a1416', 3, ellipse(x, y + 20, 56, 40)); }
    fig(ctx, 640, 640, .32, bess({ hands: { L: [-170, -700], R: [170, -700] }, face: { brows: 'worried', mouth: 'flat', look: [0, -.4], eyes: blink(t, at('final') + 1.6) } }));
    shape(ctx, '#3a221c', 5, rect(480, 500, 320, 30, 4)); candle(ctx, 560, 500, t); photo(ctx, 720, 450, .55);
    ctx.restore();
    if (nt > 0) { const w = Math.floor(lt * 2) % 4; txt(ctx, '.'.repeat(w), 640, 300, FX.DISPLAY(60), PAPER); }
    FX.caption(ctx, nt > 0 ? 'HOUDINI DID NOT COME THROUGH' : 'A CROWD OF ABOUT THREE HUNDRED', lt, .4);
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, 'HALLOWEEN 1936');
  }
  function e17(ctx, lt, dur, t) { // she put out the candle that had burned beside his photograph for ten years
    const out = clamp((lt - 2.6) / .25);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.1, 1.2), 640, 360);
    shape(ctx, '#120e10', 0, rect(-400, -300, 2100, 1300));
    shape(ctx, '#3a221c', 5, rect(200, 520, 880, 60, 4));
    photo(ctx, 760, 360, 1.3); candle(ctx, 480, 520, t, 1 - out, 1.6);
    if (out > 0) for (let i = 0; i < 6; i++) { const u = clamp((lt - 2.6 - i * .15) / 1.6); if (u <= 0) continue; ctx.save(); ctx.globalAlpha = (1 - u) * .7; shape(ctx, '#bfc2c6', 0, circle(480 + Math.sin(u * 6 + i) * 20, 360 - u * 220, 10 + u * 20)); ctx.restore(); }
    // Bess's hand comes in with a snuffer
    const h = ease.inOut(clamp((lt - 1.6) / 1)); ctx.save(); ctx.translate(lerp(-200, 470, h), lerp(200, 330, h)); line(ctx, [[0, 0], [-260, -80]], 8, '#9aa3a8'); shape(ctx, '#9aa3a8', 4, c => { c.moveTo(-30, 0); c.lineTo(30, 0); c.lineTo(14, -40); c.lineTo(-14, -40); c.closePath(); }); ctx.restore();
    ctx.restore();
    if (lt > .5) FX.bigText(ctx, '10 YEARS', 1000, 140, 56, { color: GOLD });
    FX.caption(ctx, 'THE CANDLE THAT BURNED BESIDE HIS PHOTOGRAPH', lt, .3);
    FX.vignette(ctx, 640, 360, .7);
    FX.dateTag(ctx, 'HALLOWEEN 1936');
  }

  // ================= WAS HOUDINI MURDERED? =================
  function m1(ctx, lt, dur, t) { // the theories didn't stop with Bess
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    photo(ctx, 640, 420, 1.5);
    const q = FX.dropBounce(lt - 1.2, 400, .3); FX.bigText(ctx, '?', 900, 380 - q, 220, { color: RED });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    chapterFor(ctx, 'WAS HOUDINI MURDERED?', lt, 2.2);
  }
  function m2(ctx, lt, dur, t) { // 2006: The Secret Life of Houdini
    const b = since(t, 'book');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    if (b > -2.5) { const k = b + 2.5; ctx.save(); ctx.translate(560, 380); ctx.rotate(-.04); ctx.scale(slam(k), slam(k));
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-184, -244, 380, 500); shape(ctx, '#1f2a3a', 5, rect(-190, -250, 380, 500, 6));
      txt(ctx, 'THE SECRET', 0, -160, FX.DISPLAY(44), PAPER); txt(ctx, 'LIFE OF', 0, -110, FX.FONT(700, 26), PAPER); txt(ctx, 'HOUDINI', 0, -50, FX.DISPLAY(60), GOLD);
      ctx.save(); ctx.beginPath(); ctx.rect(-110, 0, 220, 170); ctx.clip(); G.Rig.drawSuit(ctx, -533 * .3 / 2, 4, .3, { tint: '#3a4a5a' }); ctx.restore();
      txt(ctx, 'KALUSH & SLOMAN', 0, 212, FX.FONT(700, 18), PAPER); ctx.restore(); }
    ctx.restore();
    label(ctx, [['WILLIAM KALUSH', FX.FONT(700, 22)], ['LARRY SLOMAN', FX.FONT(700, 22)], ['biographers', FX.FONT(600, 18)]], 1000, 300, (lt - .6) / .35, .03, 320);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '2006');
  }
  function m3(ctx, lt, dur, t) { // a second look; no autopsy had been performed
    const a = since(t, 'autopsy');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 380);
    G.Part2.desk(ctx); G.Part2.record(ctx, 1, 1, 1);
    const sw = Math.sin(lt * 1.5); ctx.save(); ctx.translate(700 + sw * 120, 360 + Math.cos(lt * 1.2) * 60); shape(ctx, 'rgba(200,230,240,.3)', 7, circle(0, 0, 80)); shape(ctx, '#6b4f39', 4, rect(54, 54, 26, 120, 8)); ctx.restore();
    ctx.restore();
    if (a > 0) FX.stamp(ctx, 'AUTOPSY: NONE', 640, 560, a, { color: RED, size: 50 });
    FX.caption(ctx, 'HIS DEATH DESERVED A SECOND LOOK, THEY ARGUED', lt, .2);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '2006');
  }
  function m4(ctx, lt, dur, t) { // threats from Spiritualist opponents
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    [['YOU WILL PAY', 420, 330, -.1], ['STOP — OR ELSE', 640, 400, .06], ['THE SPIRITS ARE WATCHING', 860, 320, -.04], ['BEWARE, HOUDINI', 560, 520, .08], ['YOUR DAYS ARE NUMBERED', 780, 540, -.06]].forEach(([s, x, y, r], i) => {
      const k = lt - .2 - i * .35; if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(slam(k), slam(k)); FX.paperDoc(ctx, 0, 0, 340, 150, { lines: 0, fill: '#ede4cc', draw: c => { txt(c, s, 0, -10, `italic 700 24px Georgia, serif`, '#5a1a1a'); scribble(c, -120, 36, 240, 1, 1, i + 2, '#3a3a3a'); } }); ctx.restore(); });
    ctx.restore();
    FX.caption(ctx, 'THREATS FROM SPIRITUALIST OPPONENTS', lt, .3);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1920s');
  }
  function m5(ctx, lt, dur, t) { // the 1924 Doyle letter: "just desserts"
    const d = since(t, 'desserts');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 600, 380);
    FX.paperDoc(ctx, 560, 380, 520, 560, { lines: 0, fill: '#f4ecd8', rot: -.02, draw: c => {
      txt(c, '1924', 180, -240, `italic 20px Georgia, serif`, '#3a3a5a'); scribble(c, -210, -180, 420, 5, 1, 41, '#2a3a6a', 40);
      txt(c, '…Houdini will get his', -210, 50, `italic 700 30px Georgia, serif`, '#2a3a6a', 'left'); txt(c, '"just desserts"…', -210, 92, `italic 700 34px Georgia, serif`, '#2a3a6a', 'left');
      scribble(c, -210, 150, 420, 2, 1, 42, '#2a3a6a', 40); txt(c, 'A. Conan Doyle', 200, 240, `italic 22px Georgia, serif`, '#2a3a6a', 'right');
      if (d > 0) ring(c, -40, 92, 170, 34, d / .6); } });
    ctx.restore();
    ctx.save(); const k = ease.out(clamp((lt - .3) / .4)); ctx.translate(lerp(W + 200, 1080, k), 300); frame(ctx, 0, 0, 160, 200, '#c9b48e', () => fig(ctx, 0, 380, .36, cast('doyle', 'tweed', { face: { brows: 'calm', mouth: 'flat' } }), { filter: 'sepia(.7)' })); ctx.restore();
    FX.caption(ctx, 'A LETTER FROM CONAN DOYLE, CITED BY THE BIOGRAPHERS', lt, .3);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1924');
  }
  function m6(ctx, lt, dur, t) { // an experimental serum in hospital — and poison?
    const p = since(t, 'poison');
    FX.darkBg(ctx, '#23303a');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    ctx.save(); ctx.translate(440, 380); ctx.rotate(-.5); shape(ctx, 'rgba(220,235,240,.8)', 4, rect(-150, -26, 260, 52, 6)); shape(ctx, '#8ac0a0', 0, rect(-140, -18, 160, 36)); shape(ctx, '#9aa3a8', 4, rect(110, -10, 60, 20, 3)); line(ctx, [[-150, 0], [-230, 0]], 4, '#9aa3a8'); shape(ctx, '#9aa3a8', 4, rect(170, -34, 16, 68, 3)); ctx.restore();
    txt(ctx, 'EXPERIMENTAL SERUM', 440, 560, FX.FONT(700, 24), PAPER);
    if (p > 0) { const k = FX.settle(clamp(p / .35)); ctx.save(); ctx.translate(880, 380); ctx.scale(k, k);
      shape(ctx, '#3a5a3a', 5, c => { c.moveTo(-50, -60); c.lineTo(50, -60); c.lineTo(70, 0); c.lineTo(70, 120); c.lineTo(-70, 120); c.lineTo(-70, 0); c.closePath(); }); shape(ctx, '#6a4a2a', 4, rect(-24, -100, 48, 40, 4));
      shape(ctx, PAPER, 3, rect(-50, 10, 100, 90, 4)); shape(ctx, PAPER, 3, circle(0, 42, 22)); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-8, 40, 5, 0, 7); ctx.arc(8, 40, 5, 0, 7); ctx.fill(); line(ctx, [[-30, 76], [30, 88]], 4); line(ctx, [[30, 76], [-30, 88]], 4); ctx.restore();
      FX.bigText(ctx, 'POISON?', 880, 600, 56, { color: RED }); }
    ctx.restore();
    FX.caption(ctx, 'QUESTIONS RAISED ABOUT HIS HOSPITAL TREATMENT', lt, .3, W - 60, 40);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'OCT 1926');
  }
  function m7(ctx, lt, dur, t) { // 2007: George Hardeen backs an exhumation to test for poison
    const ex = since(t, 'exhumation');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    shape(ctx, '#2a3a5a', 0, rect(-400, -300, 2100, 1000)); for (let x = -400; x < 1700; x += 120) shape(ctx, '#33456a', 0, rect(x, -300, 60, 1000));
    shape(ctx, '#3a3a44', 0, rect(-400, 620, 2100, 300));
    fig(ctx, 640, 700, .38, cast('hardeen', 'greySuit', { hands: { L: [-120, -560], R: ex > 0 ? [260, -900] : [140, -600] }, handShape: { R: 'open' }, face: { brows: 'calm', mouth: ex > 0 ? 'o' : 'flat', look: [0, .1], eyes: blink(t, at('y2007') + 1.3) }, breathe: breathe(t) }));
    shape(ctx, '#5a3a28', 5, poly([[530, 520], [750, 520], [730, 700], [550, 700]])); for (const dx of [-40, 0, 40]) { line(ctx, [[640 + dx, 520], [640 + dx * 1.5, 470]], 5); shape(ctx, '#2a2a2e', 3, c => c.roundRect(640 + dx * 1.5 - 9, 446, 18, 30, 8)); }
    // camera flashes
    for (let i = 0; i < 3; i++) { const f = ((lt + i * .7) % 2.1); if (f < .12) { glow(ctx, 160 + i * 460, 600, 160, 'rgba(255,255,255,.6)'); } }
    ctx.restore();
    label(ctx, [['GEORGE HARDEEN', FX.DISPLAY(30)], ["Houdini's grandnephew", FX.FONT(600, 18)]], 1000, 160, (since(t, 'hardeen') + .1) / .35, .03, 360);
    if (ex > 0) FX.stamp(ctx, 'EXHUME? TEST FOR POISON', 380, 160, ex, { color: GOLD, size: 32, rot: -.05 });
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, '2007');
  }
  function m8(ctx, lt, dur, t) { // Bess's side objected; the plan stalled; the paperwork was never filed
    const st = since(t, 'stalled'), pw = since(t, 'paperwork');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    [['WE OBJECT', 330, 260, -.06], ['LET HIM REST', 380, 470, .05]].forEach(([s, x, y, r], i) => { const k = lt - .2 - i * .5; if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(slam(k), slam(k)); FX.paperDoc(ctx, 0, 0, 340, 150, { lines: 0, draw: c => { txt(c, s, 0, -14, FX.DISPLAY(34), RED); txt(c, "— relatives on Bess's side", 0, 34, FX.FONT(600, 16), '#5a5048'); } }); ctx.restore(); });
    if (st > -.3) { ctx.save(); ctx.translate(880, 380); ctx.rotate(.03); FX.paperDoc(ctx, 0, 0, 380, 480, { title: 'PETITION TO EXHUME', titleSize: 26, sub: 'RE: HARRY HOUDINI (1874–1926)', lines: 12, seed: 171 }); ctx.restore(); }
    FX.stamp(ctx, 'NEVER FILED', 880, 400, pw, { color: RED, size: 50 });
    ctx.restore();
    FX.caption(ctx, pw > 0 ? 'ACCORDING TO LATER REPORTING' : 'THE PLAN STALLED', st > 0 ? lt : -1, 0);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '2007');
  }
  function m9(ctx, lt, dur, t) { // Houdini remains where he was buried in 1926
    G.Part3.shotGrave(ctx, lt, dur, t);
    FX.dateTag(ctx, 'MACHPELAH CEMETERY');
    FX.caption(ctx, 'HE REMAINS WHERE HE WAS BURIED IN 1926', lt, .3);
  }
  function m10(ctx, lt, dur, t) { // weigh it the way Houdini would have
    const one = since(t, 'oneside'), oth = since(t, 'other');
    const L = [['ILLNESS CONFIRMED IN SURGERY', 'surgery'], ['104°F FEVER — STILL PERFORMING', 'fever'], ['NO ANTIBIOTICS', 'antibiotics']], R = [['HOSTILITY', 'hostility', 0], ['THREATS', 'hostility', .6], ['SUSPICION', 'hostility', 1.2], ['EVIDENCE OF POISON: NONE', 'noevidence', 0]];
    const wl = L.filter(([, k]) => since(t, k) > 0).length, wr = R.filter(([, k, d]) => since(t, k) - d > 0).length;
    const tilt = FX.approach(t, at('oneside'), 0, 0, .3) + (one > 0 ? lerp(0, .14, clamp(wl / 3)) - (oth > 0 ? lerp(0, .02, clamp(wr / 4)) : 0) : 0);
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#c9a14a', 5, rect(626, 160, 28, 440, 6)); shape(ctx, '#c9a14a', 5, rect(540, 590, 200, 30, 6));
    ctx.save(); ctx.translate(640, 170); ctx.rotate(-tilt); shape(ctx, '#d8b05a', 5, rect(-420, -10, 840, 20, 6)); ctx.restore();
    const pan = (s, items, list) => { const x = 640 + s * 420 * Math.cos(tilt), y = 170 - s * 420 * Math.sin(tilt); const py = y + 200;
      line(ctx, [[x, y], [x - 130, py]], 3); line(ctx, [[x, y], [x + 130, py]], 3); shape(ctx, '#b88a3a', 5, c => { c.moveTo(x - 160, py); c.lineTo(x + 160, py); c.quadraticCurveTo(x, py + 60, x - 160, py); c.closePath(); });
      list.forEach(([n], i) => { if (i >= items) return; ctx.save(); ctx.translate(x, py - 28 - i * 46); ctx.scale(slam(.3), slam(.3)); FX.paperDoc(ctx, 0, 0, 300, 40, { lines: 0, draw: c => txt(c, n, 0, 2, FX.FONT(700, n.length > 22 ? 14 : 18), n.includes('NONE') ? RED : INK) }); ctx.restore(); }); };
    pan(-1, wl, L); pan(1, wr, R);
    ctx.restore();
    FX.caption(ctx, 'WEIGH IT THE WAY HOUDINI WOULD HAVE', lt, .2, W - 60, 40);
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'THE EVIDENCE');
  }
  function m11(ctx, lt, dur, t) { // murder isn't impossible. It just isn't supported.
    const s = since(t, 'supported');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); ctx.translate(640, 300); ctx.scale(slam(lt), slam(lt)); FX.paperDoc(ctx, 0, 0, 640, 150, { lines: 0, draw: c => txt(c, "MURDER ISN'T IMPOSSIBLE.", 0, 4, FX.DISPLAY(44)) }); ctx.restore();
    FX.stamp(ctx, 'NOT SUPPORTED', 640, 500, s, { color: RED, size: 60 });
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'VERDICT');
  }

  // ================= THE ANSWER =================
  function a1(ctx, lt, dur, t) { // so what killed Harry Houdini?
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 360);
    parlour(ctx, '#3a3434');
    frame(ctx, 640, 340, 300, 400, '#cdbb98', () => G.Rig.drawSuit(ctx, 640 - 533 * .52 / 2, 150, .52, { breathe: breathe(t) }));
    ctx.restore();
    FX.vignette(ctx, 640, 360, .6);
    FX.caption(ctx, 'SO WHAT KILLED HARRY HOUDINI?', lt, .8);
    chapterFor(ctx, 'THE ANSWER', lt, 2.0);
  }
  function a2(ctx, lt, dur, t) { // an ordinary illness, hidden behind a punch, in a body that survived almost anything
    const hd = since(t, 'hidden'), bd = since(t, 'body');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    stageSet(ctx);
    const S = .4, X = 640, Y = 670, belly = [X, Y - 640 * S];
    if (bd > 0) for (let i = 0; i < 3; i++) { const k = bd - i * .3; if (k <= 0) continue; const f = Math.max(0, k - .4); ctx.save(); ctx.globalAlpha = clamp(1 - (f - .5) / .4); ctx.translate(X + (i - 1) * 120 + (i - 1) * f * 120, 380 + 900 * f * f); ctx.rotate((i - 1) * f * 3); if (i === 1) { shape(ctx, null, 9, c => c.arc(0, -26, 24, Math.PI, 0)); shape(ctx, '#c9a14a', 4, rect(-32, -26, 64, 56, 8)); } else G.Props.handcuffPair(ctx, 0, 0, .35); ctx.restore(); }
    fig(ctx, X, Y, S, houdini({ hands: bd > .4 ? { L: [-330, -1150], R: [330, -1150] } : { L: [-40, -660], R: [60, -640] }, handShape: { L: 'open', R: 'open' }, face: { brows: bd > .4 ? 'smug' : 'worried', mouth: bd > .4 ? 'smile' : 'flat', look: [.3, 0] }, breathe: breathe(t) }));
    const p = (Math.sin(lt * 4) + 1) / 2; glow(ctx, belly[0], belly[1], 80 + p * 20, `rgba(255,80,60,${.3 + .2 * p})`);
    if (hd > 0) { const k = FX.settle(clamp(hd / .3)); ctx.save(); ctx.translate(belly[0] + 10, belly[1]); ctx.scale(k * 1.6, k * 1.6); Ch.hand(ctx, [0, 0], Math.PI, 'fist', '#f1b58c', 1); ctx.restore(); txt(ctx, 'THE PUNCH', belly[0] + 200, belly[1] - 40, FX.FONT(700, 22), GOLD, 'left'); }
    txt(ctx, 'AN ORDINARY ILLNESS', belly[0] - 200, belly[1] + 40, FX.FONT(700, 22), '#ff9a80', 'right');
    ctx.restore();
    if (bd > .4) FX.caption(ctx, 'A BODY HE SPENT HIS LIFE PROVING COULD SURVIVE ALMOST ANYTHING', bd, .4);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, 'THE MOST LIKELY ANSWER');
  }
  function a3(ctx, lt, dur, t) { // why never ordinary? He'd made it part of the argument
    const ar = since(t, 'argument');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    stageSet(ctx);
    const up = FX.settle(clamp(ar / .4));
    fig(ctx, 640, 680, .34, houdini({ hands: { L: [-130, -480], R: ar > 0 ? [lerp(140, 380, up), lerp(-480, -1180, up)] : [140, -480] }, handShape: { R: ar > 0 ? 'point' : 'open' }, face: { brows: 'smug', mouth: ar > 0 ? 'grit' : 'flat', look: [.3, -.1] }, breathe: breathe(t) }));
    shape(ctx, '#6b4f39', 5, poly([[560, 520], [720, 520], [700, 690], [580, 690]]));
    ctx.restore();
    ctx.save(); ctx.translate(640, 110); FX.paperDoc(ctx, 0, 0, 760, 90, { lines: 0, draw: c => txt(c, 'WHY WAS HIS DEATH NEVER ORDINARY?', 0, 4, FX.DISPLAY(36)) }); ctx.restore();
    if (ar > 0) FX.caption(ctx, 'HE HAD MADE IT PART OF THE ARGUMENT', ar, .2);
    FX.vignette(ctx, 640, 400, .55);
  }
  function a4(ctx, lt, dur, t) { // grief makes people see what they want to see
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    parlour(ctx, '#3a4a44');
    shape(ctx, '#2a3a30', 6, rect(480, 120, 680, 340, 6)); shape(ctx, '#6b4f39', 5, rect(470, 456, 700, 18, 4));
    const msg = 'GRIEF MAKES PEOPLE SEE WHAT THEY WANT TO SEE', n = Math.floor(msg.length * clamp((lt - .3) / 3));
    const words = msg.slice(0, n).split(' '); let row = '', y = 200; ctx.save(); ctx.font = FX.DISPLAY(40); ctx.fillStyle = '#e8eee8'; ctx.textAlign = 'center';
    for (const w of words) { if (ctx.measureText(row + w).width > 600) { ctx.fillText(row, 820, y); y += 60; row = ''; } row += w + ' '; } ctx.fillText(row, 820, y); ctx.restore();
    fig(ctx, 300, 720, .4, houdini({ hands: { L: [-120, -480], R: [400, -1000] }, handShape: { R: 'point' }, face: { brows: 'up', mouth: 'flat', look: [.6, -.2], eyes: blink(t, at('warning') + 2) }, breathe: breathe(t) }), { mirror: true });
    ctx.restore();
    FX.caption(ctx, 'HIS WARNING, IN HIS LAST YEARS', lt, .3);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, '1924 – 1926');
  }
  function a5(ctx, lt, dur, t) { // he died on the one night built for ghosts — and people saw what they wanted
    const sw = since(t, 'saw');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#0e1022'], [1, '#2a2040']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#f1ead8', 0, circle(640, 180, 90)); glow(ctx, 640, 180, 300, 'rgba(240,235,210,.3)');
    shape(ctx, '#1a1426', 0, rect(-400, 520, 2100, 400));
    for (const x of [200, 1080]) { shape(ctx, '#e07a2a', 4.5, ellipse(x, 500, 60, 48)); glow(ctx, x, 500, 110, 'rgba(255,170,80,.4)'); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x - 26, 490); ctx.lineTo(x - 12, 476); ctx.lineTo(x - 12, 494); ctx.moveTo(x + 26, 490); ctx.lineTo(x + 12, 476); ctx.lineTo(x + 12, 494); ctx.fill(); }
    [['cloche', 'dress20s', 420], ['bowler', 'overcoat', 640], ['mediumScarf', 'shawl', 860]].forEach(([h, o, x], i) => fig(ctx, x, 760, .36, cast(h, o, { face: { brows: sw > 0 ? 'up' : 'calm', mouth: sw > 0 ? 'o' : 'flat', look: [0, -.8], eyes: 1 } })));
    if (sw > 0) for (let i = 0; i < 5; i++) { const k = clamp((sw - i * .2) / .5); const x = 260 + i * 190 + Math.sin(lt + i) * 20, y = 300 + Math.sin(lt * 1.3 + i) * 20; ghostIcon(ctx, x, y, .9, .7 * k); }
    ctx.restore();
    FX.caption(ctx, sw > 0 ? 'PEOPLE SAW EXACTLY WHAT THEY WANTED' : 'THE ONE NIGHT OF THE YEAR BUILT FOR GHOSTS', lt, .2);
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, 'OCT 31, 1926');
  }
  function a6(ctx, lt, dur, t) { // his final act wasn't an escape: a single word, left with Bess
    const wd = since(t, 'word'), lf = since(t, 'left');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    stageSet(ctx);
    G.Props.handcuffPair(ctx, 640, 600, .5);                                          // the empty, open cuffs: no escape this time
    if (lf > 0) fig(ctx, 860, 660, .36, bess({ hands: { L: [-90, -760], R: [90, -760] }, face: { brows: 'worried', mouth: 'smile', look: [-.4, .6], eyes: blink(t, at('left') + 1.4) }, breathe: breathe(t) }), { mirror: true });
    if (wd > 0) { const holdX = lf > 0 ? 860 : 640, holdY = lf > 0 ? 660 - 760 * .36 : 360; const k = ease.inOut(clamp(lf / .8)); ctx.save(); ctx.translate(lerp(640, holdX, k), lerp(360, holdY, k)); ctx.scale(FX.settle(clamp(wd / .3)), FX.settle(clamp(wd / .3))); FX.paperDoc(ctx, 0, 0, 160, 70, { lines: 0, draw: c => txt(c, '· · · · · · ·', 0, 4, FX.DISPLAY(26)) }); ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, lf > 0 ? 'LEFT WITH THE ONE PERSON WHO KNEW HIM BEST' : "HIS FINAL ACT WASN'T AN ESCAPE", lt, .2);
    FX.vignette(ctx, 640, 400, .55);
  }
  function a7(ctx, lt, dur, t) { // Believe. And for ten years, Bess kept his test honest.
    const kp = since(t, 'kept');
    shape(ctx, '#120e10', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 360);
    if (kp > 0) { ctx.save(); ctx.globalAlpha = clamp(kp / .6); shape(ctx, '#3a221c', 5, rect(340, 560, 600, 30, 4)); candle(ctx, 520, 560, t); photo(ctx, 760, 470, .7); fig(ctx, 640, 960, .44, bess({ hands: { L: [-170, -760], R: [170, -760] }, face: { brows: 'calm', mouth: 'smile', eyes: .6, look: [.4, -.2] } })); ctx.restore(); }
    ctx.restore();
    believe(ctx, 640, kp > 0 ? 160 : 340, kp > 0 ? 80 : 120, 1);
    if (kp > 0) FX.caption(ctx, 'FOR TEN YEARS, BESS KEPT HIS TEST HONEST', kp, .3);
    T.fill(ctx, '#000', ease.in(prog(lt, dur - .7, dur)));
  }

  // ================= BRIDGE =================
  function b1(ctx, lt, dur, t) { // December 1926: a car abandoned at the edge of a chalk pit, headlights on
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 380);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#0c1018'], [1, '#22283a']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#2a3a2a', 0, smooth([[-400, 420], [200, 380], [600, 400], [800, 420], [1700, 400], [1700, 900], [-400, 900]]));
    shape(ctx, '#e8e8e0', 4, poly([[780, 470], [1700, 440], [1700, 900], [700, 900]])); for (let i = 0; i < 5; i++) line(ctx, [[820 + i * 140, 480 - i * 6], [760 + i * 160, 900]], 3, 'rgba(120,120,110,.35)');   // chalk pit face
    // the car, nose at the edge, headlights cutting the fog
    ctx.save(); ctx.translate(620, 480); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .18; ctx.fillStyle = '#fff6d0'; ctx.beginPath(); ctx.moveTo(150, -20); ctx.lineTo(700, -140); ctx.lineTo(700, 120); ctx.closePath(); ctx.fill(); ctx.restore();
    G.Props.car(ctx, 560, 500, 1.6, '#3a3a40');
    glow(ctx, 760, 470, 70, 'rgba(255,246,200,.6)');
    ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#c8ccd0'; for (let i = 0; i < 5; i++) { const x = ((i * 380 + t * 20) % 2200) - 500; ctx.beginPath(); ctx.ellipse(x, 470 + Math.sin(i) * 20, 320, 40, 0, 0, 7); ctx.fill(); } ctx.restore();
    ctx.restore();
    FX.vignette(ctx, 640, 380, .7);
    FX.dateTag(ctx, 'DECEMBER 1926');
  }
  function b2(ctx, lt, dur, t) { // the most famous mystery writer in Britain vanishes
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    ctx.save(); ctx.translate(640, 380); ctx.rotate(-.02); ctx.scale(slam(lt - .2), slam(lt - .2));
    FX.paperDoc(ctx, 0, 0, 440, 560, { lines: 0, fill: '#efe6cc', draw: c => {
      txt(c, 'MISSING', 0, -220, FX.DISPLAY(70), RED); shape(c, '#cfc4aa', 3, rect(-130, -160, 260, 260));
      c.save(); c.beginPath(); c.rect(-128, -158, 256, 256); c.clip(); fig(c, 0, 330, .34, cast('cloche', 'dress20s', {}), { tint: '#3a3430' }); c.restore(); txt(c, '?', 0, -40, FX.DISPLAY(90), '#efe6cc');
      txt(c, 'BRITAIN\'S MOST FAMOUS', 0, 150, FX.FONT(700, 20)); txt(c, 'MYSTERY WRITER', 0, 180, FX.DISPLAY(32)); } });
    ctx.restore(); ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'DECEMBER 1926');
  }
  function b3(ctx, lt, dur, t) { // eleven days; a nation searches; Conan Doyle joins the hunt
    const d = since(t, 'doyle'), ch = since(t, 'christie');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#121a2c'], [1, '#2a3248']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#1e2a20', 0, rect(-400, 540, 2100, 400));
    for (let i = 0; i < 6; i++) { const x = 140 + i * 200 + Math.sin(lt * .8 + i) * 20, sw = Math.sin(lt * 3 + i) * .2; fig(ctx, x, 700, .24, cast(['bowler', 'student', 'assistant', 'editor', 'young', 'professor'][i], ['overcoat', 'sweater', 'assistantVest', 'greySuit', 'sweater', 'greySuit'][i], { hands: { L: [-120, -480], R: [200, -760] }, face: { brows: 'worried', mouth: 'flat', look: [Math.sin(lt + i) * .8, 0] } }), { tint: '#141a24' }); ctx.save(); ctx.translate(x + 200 * .24 * (1), 700 - 760 * .24); ctx.rotate(sw); line(ctx, [[0, 0], [0, 24]], 2, '#6a6a6a'); glow(ctx, 0, 34, 50, 'rgba(255,220,140,.6)'); shape(ctx, '#ffd27a', 2, circle(0, 34, 7)); ctx.restore(); }
    if (d > 0) { const k = ease.out(clamp(d / .6)); fig(ctx, lerp(1400, 1060, k), 720, .34, cast('doyle', 'tweed', { hands: { L: [-120, -480], R: [200, -900] }, handShape: { R: 'fist' }, face: { brows: 'up', mouth: 'flat', look: [-.6, .1] } }), { mirror: false }); ctx.save(); ctx.translate(lerp(1400, 1060, k) - 200 * .34, 720 - 900 * .34); shape(ctx, 'rgba(200,230,240,.35)', 5, circle(-10, -30, 26)); ctx.restore(); }
    ctx.restore();
    const n = Math.max(1, Math.min(11, Math.floor(1 + lt * 3)));
    FX.bigText(ctx, `${n} DAY${n > 1 ? 'S' : ''}`, 640, 130, 70, { color: GOLD });
    if (ch > 0) FX.caption(ctx, 'A NATION SEARCHED FOR AGATHA CHRISTIE', ch, .1);
    if (d > 0) label(ctx, [['ARTHUR CONAN DOYLE', FX.DISPLAY(26)], ['joins the hunt', FX.FONT(600, 18)]], 1050, 230, d / .35, .03, 340);
    FX.vignette(ctx, 640, 400, .6);
    FX.dateTag(ctx, 'DECEMBER 1926');
    if (lt > dur - 2.4) { ctx.save(); ctx.globalAlpha = clamp((lt - (dur - 2.4)) / .4); FX.bigText(ctx, 'TO BE CONTINUED…', 640, 420, 64, { color: PAPER }); ctx.restore(); }
    T.fill(ctx, '#000', ease.in(prog(lt, dur - .6, dur)));
  }

  // ---------- timeline ----------
  A.murdered = A.theories - 1.6; A.answer = A.what - 1.2;
  const cut = [
    ['e1', e1], ['fouryears', e2], ['believers', e3], ['skeptics', e4], ['buried', e5], ['test', e6], ['bess', e7], ['code', e8], ['began', e9], ['rest', e10], ['believe', e11],
    ['seances', e12], ['jan1929', e13], ['secret', e14], ['could', e15], ['h1936', e16], ['candle', e17],
    ['murdered', m1], ['y2006', m2], ['argued', m3], ['threats', m4], ['letter', m5], ['serum', m6], ['y2007', m7], ['objected', m8], ['remains', m9], ['weigh', m10], ['murder', m11],
    ['answer', a1], ['illness', a2], ['why', a3], ['warning', a4], ['ghosts', a5], ['escape', a6], ['believe2', a7],
    ['bridge', b1], ['vanished', b2], ['eleven', b3],
  ];
  const DURATION = A.end + 1.5;
  const shots = cut.map(([k, draw], i) => ({ start: i ? A[k] - .15 : 0, end: i + 1 < cut.length ? A[cut[i + 1][0]] - .15 : DURATION, draw }));
  const sfx = [
    { t: A.ordinary1 + .3, type: 'thud', gain: .7 }, ...[0, 1, 2, 3, 4].map(i => ({ t: A.fouryears + i * (A.believers - A.fouryears - .6) / 5, type: 'paper', gain: .5 })),
    { t: A.believers + .3, type: 'paper' }, { t: A.mocked, type: 'paper' }, { t: A.foretold, type: 'paper' }, { t: A.halloween, type: 'swell', gain: .5 },
    { t: A.land, type: 'thud', gain: .7 }, { t: A.bronze, type: 'slide', gain: .5 }, { t: A.test + .2, type: 'thud', gain: .5 },
    { t: A.medium, type: 'thud', gain: .5 }, { t: A.words, type: 'slide', gain: .5 }, { t: A.ring, type: 'clang', gain: .3 },
    ...['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'].map(k => ({ t: A[k] + .45, type: 'click', gain: .7 })), { t: A.believe, type: 'swell', gain: .8 },
    { t: A.seances + .5, type: 'paper', gain: .5 }, { t: A.ford + .4, type: 'swell', gain: .5 }, { t: A.signed + .4, type: 'scratch', gain: .6 }, { t: A.newspapers, type: 'thud' },
    { t: A.kellock, type: 'thud', gain: .6 }, { t: A.repudiated, type: 'thud' }, { t: A.final, type: 'wind', gain: .3 }, { t: A.candle + 2.6, type: 'whoosh', gain: .4 },
    { t: A.murdered + .5, type: 'clang', gain: .5 }, { t: A.murdered + 1.2, type: 'thud', gain: .6 }, { t: A.book - 2.5, type: 'thud' }, { t: A.autopsy, type: 'thud' },
    ...[0, 1, 2, 3, 4].map(i => ({ t: A.threats + .2 + i * .35, type: 'paper', gain: .6 })), { t: A.desserts, type: 'scratch', gain: .5 }, { t: A.poison, type: 'hit', gain: .5 },
    { t: A.exhumation, type: 'thud', gain: .6 }, { t: A.paperwork, type: 'thud' }, { t: A.surgery, type: 'click', gain: .5 }, { t: A.fever, type: 'click', gain: .5 }, { t: A.antibiotics, type: 'click', gain: .5 },
    { t: A.hostility, type: 'click', gain: .4 }, { t: A.noevidence, type: 'click', gain: .4 }, { t: A.supported, type: 'thud' },
    { t: A.answer + .5, type: 'clang', gain: .5 }, { t: A.hidden, type: 'hit', gain: .5 }, { t: A.body + .4, type: 'rattle', gain: .4 }, { t: A.argument, type: 'whoosh', gain: .4 },
    { t: A.saw, type: 'swell', gain: .5 }, { t: A.word, type: 'click', gain: .5 }, { t: A.believe2, type: 'swell', gain: .7 },
    { t: A.bridge + .3, type: 'wind', gain: .4 }, { t: A.vanished + .2, type: 'thud' }, { t: A.doyle, type: 'whoosh', gain: .4 },
  ];
  const moods = [
    { t: 0, mood: 'still' }, { t: A.believers, mood: 'mystery' }, { t: A.test, mood: 'still' }, { t: A.seances, mood: 'mystery' }, { t: A.secret, mood: 'tense' },
    { t: A.h1936, mood: 'mystery' }, { t: A.candle, mood: 'silence' }, { t: A.murdered, mood: 'tense' }, { t: A.weigh, mood: 'still' }, { t: A.answer, mood: 'still' },
    { t: A.believe2, mood: 'silence' }, { t: A.bridge, mood: 'mystery' },
  ];
  G.Show = {
    duration: DURATION, narration: 'assets/audio/narration-part5.mp3', shots, sfx, moods,
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png', suitEyeL: 'assets/img/rig/suit-eye-l.png', suitEyeR: 'assets/img/rig/suit-eye-r.png', bedEyeL: 'assets/img/rig/bed-eye-l.png', bedEyeR: 'assets/img/rig/bed-eye-r.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
