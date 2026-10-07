/* Part 3 — "The Séance in Atlantic City" + "The Medium Who Nearly Won".
 * Every shot is keyed to a word anchor in window.T3 (seconds into narration-part3.mp3),
 * written by tools/align-part3.py from the narration transcript. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Ch = G.Chars;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const A = G.T3, INK = FX.INK;
  const at = k => A[k];
  const since = (t, k) => t - A[k];
  const breathe = t => (Math.sin(t * 1.6) + 1) / 2;
  const blink = (t, ...ts) => 1 - G.Rig.blinkAt(t, ts);
  const fig = FX.fig;
  const houdini = (o = {}) => Object.assign({ hands: { L: [-120, -470], R: [120, -470] }, feet: { L: [-70, -40], R: [70, -40] } }, o);
  const cast = (head, outfit, o = {}) => Object.assign({ head, outfit, hands: { L: [-120, -470], R: [120, -470] }, feet: { L: [-70, -40], R: [70, -40] } }, o);
  const doyle = (o = {}) => cast('doyle', 'tweed', Object.assign({ feet: { L: [-80, -40], R: [80, -40] } }, o));
  const jean = (o = {}) => cast('jean', 'teaGown', o);
  const margery = (o = {}) => cast('margery', 'flapper', o);
  const RED = '#a8322a', PAPER = '#f1ead8';

  // ---------- shared sets ----------
  function chapter(ctx, text, lt) {
    const k = FX.settle(clamp(lt / .35));
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2, lerp(-60, 130, k)); ctx.rotate(-.02);
    ctx.font = FX.DISPLAY(54); const w = ctx.measureText(text).width + 70;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -40, w, 86);
    shape(ctx, PAPER, 4, rect(-w / 2, -46, w, 86, 3)); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  function frame(ctx, x, y, w, h, fill, drawInside, oval) {
    T.shadow(ctx, x + 10, y + h / 2 + 16, w * .5, 14, .35, 8);
    const path = (pad) => oval ? ellipse(x, y, w / 2 + pad, h / 2 + pad) : rect(x - w / 2 - pad, y - h / 2 - pad, w + pad * 2, h + pad * 2, 6);
    shape(ctx, '#7a5a30', 5, path(22)); shape(ctx, '#c9a14a', 3, path(10)); shape(ctx, fill, 3, path(0));
    ctx.save(); ctx.beginPath(); path(0)(ctx); ctx.clip(); drawInside(); ctx.restore();
  }
  const label = (ctx, lines, x, y, k, rot = .03, w = 380) => { // paper label card sliding in from the right
    if (k <= 0) return;
    ctx.save(); ctx.translate(lerp(W + 260, x, ease.out(clamp(k))), y); ctx.rotate(rot);
    FX.paperDoc(ctx, 0, 0, w, 40 + lines.length * 42, { lines: 0, draw: c => {
      c.textAlign = 'center'; c.textBaseline = 'middle';
      lines.forEach(([txt, font], i) => { c.font = font; c.fillStyle = INK; c.fillText(txt, 0, (i - (lines.length - 1) / 2) * 42); });
    } });
    ctx.restore();
  };
  const parlour = (ctx, wall = '#4a3a3e') => {
    shape(ctx, wall, 0, rect(-400, -300, 2100, 1000));
    ctx.save(); ctx.globalAlpha = .12; for (let x = -400; x < 1700; x += 70) for (let y = -300; y < 700; y += 70) { ctx.fillStyle = '#e8d8b8'; ctx.beginPath(); ctx.arc(x + ((y / 70) % 2) * 35, y, 6, 0, 7); ctx.fill(); } ctx.restore();
    shape(ctx, '#3a2c26', 0, rect(-400, 600, 2100, 400)); line(ctx, [[-400, 600], [1700, 600]], 4, 'rgba(0,0,0,.4)');
  };
  function suite(ctx) { // the hotel suite: striped wallpaper, a tall window onto the sea, a writing table
    shape(ctx, '#d9c7a4', 0, rect(-400, -300, 2100, 1000));
    for (let x = -400; x < 1700; x += 64) shape(ctx, '#cdb994', 0, rect(x, -300, 26, 1000));
    shape(ctx, '#f1ead8', 5, rect(860, 80, 280, 380, 4)); ctx.fillStyle = grad(ctx, 0, 90, 0, 450, [[0, '#a9cfe0'], [.62, '#cfe6ee'], [.63, '#6aa0b8'], [1, '#5a90a8']]); ctx.fillRect(874, 94, 252, 352);
    line(ctx, [[1000, 94], [1000, 446]], 6, '#f1ead8'); line(ctx, [[874, 260], [1126, 260]], 6, '#f1ead8');
    shape(ctx, '#8a3a34', 4, poly([[830, 60], [900, 60], [880, 480], [820, 480]])); shape(ctx, '#8a3a34', 4, poly([[1100, 60], [1170, 60], [1180, 480], [1120, 480]]));
    shape(ctx, '#6a5040', 0, rect(-400, 600, 2100, 400)); line(ctx, [[-400, 600], [1700, 600]], 4, 'rgba(0,0,0,.35)');
    ctx.save(); ctx.globalAlpha = .18; for (let x = -400; x < 1700; x += 90) line(ctx, [[x, 600], [x - 80, 720]], 3, '#000'); ctx.restore();
  }
  function writingTable(ctx, x, y, w = 420) {
    shape(ctx, '#7a4a30', 5, rect(x - w / 2, y, w, 26, 4));
    for (const dx of [-w / 2 + 30, w / 2 - 30]) shape(ctx, '#6a3e28', 4, rect(x + dx - 9, y + 26, 18, 150));
  }
  function seanceRoom(ctx, t, o = {}) {
    shape(ctx, '#1a1416', 0, rect(-400, -300, 2100, 1300));
    const fl = 1 + Math.sin(t * 13) * .06;
    glow(ctx, 640, 470, 520 * (o.light ?? 1), `rgba(255,170,110,${.2 * (o.light ?? 1)})`);
    if (o.people) o.people();
    const jolt = o.jolt || 0;
    shape(ctx, '#3a221c', 5, ellipse(640, 580 + jolt, 420, 80)); shape(ctx, '#2e1a15', 5, rect(260, 580 + jolt, 760, 160));
    if (o.candle !== false) { shape(ctx, '#efe6d0', 3.5, rect(626, 500 + jolt, 28, 66, 3)); glow(ctx, 640, 486 + jolt, 160 * fl, `rgba(255,190,110,${.45 * fl})`); shape(ctx, '#ffd27a', 2, smooth([[640, 500 + jolt], [631, 486 + jolt], [640, 464 + jolt], [649, 486 + jolt]])); }
  }
  // a newspaper sheet: masthead, headline, columns (made-up paper names)
  function newspaper(ctx, x, y, w, h, o) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.scale) ctx.scale(o.scale, o.scale);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 10, w, h);
    shape(ctx, '#ebe4d0', 3, rect(-w / 2, -h / 2, w, h, 2));
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `700 ${Math.round(w * .055)}px Georgia, serif`; ctx.fillText(o.mast, 0, -h / 2 + 34);
    line(ctx, [[-w / 2 + 20, -h / 2 + 60], [w / 2 - 20, -h / 2 + 60]], 3); ctx.font = FX.FONT(600, 13); ctx.fillText(o.date || '', 0, -h / 2 + 74); line(ctx, [[-w / 2 + 20, -h / 2 + 86], [w / 2 - 20, -h / 2 + 86]], 2);
    let yy = -h / 2 + 128;
    for (const hl of o.head) { ctx.font = FX.DISPLAY(o.hs || 44); ctx.fillText(hl, 0, yy); yy += (o.hs || 44) * 1.05; }
    const r = rng(o.seed || 5), cols = 3, cw = (w - 60) / cols;
    for (let c = 0; c < cols; c++) for (let yy2 = yy + 6; yy2 < h / 2 - 24; yy2 += 16) line(ctx, [[-w / 2 + 30 + c * cw, yy2], [-w / 2 + 30 + c * cw + (cw - 18) * (.6 + r() * .4), yy2]], 3, 'rgba(70,64,58,.4)');
    if (o.draw) o.draw(ctx);
    ctx.restore();
  }
  const slam = (k, d = .09) => k < d ? lerp(1.3, 1, ease.in(k / d)) : 1 + FX.ring(k - d, -.02, 4, 14);
  // speech / thought bubble with a tail toward (tx, ty)
  function bubble(ctx, x, y, w, h, tx, ty, k, o = {}) {
    if (k <= 0) return;
    const s = FX.settle(clamp(k / .3));
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fill = o.fill || '#fbf6ea';
    if (o.thought) { for (let i = 1; i <= 3; i++) shape(ctx, fill, 3.5, circle((tx - x) * i / 4, (ty - y) * i / 4 + h * .3 * (1 - i / 4), 6 + (3 - i) * 5)); }
    else shape(ctx, fill, 4, poly([[-20, h / 2 - 8], [20, h / 2 - 8], [tx - x, ty - y]]));
    shape(ctx, fill, 4, o.thought ? smooth([[-w / 2, 0], [-w * .35, -h / 2], [0, -h / 2 - 8], [w * .35, -h / 2], [w / 2, 0], [w * .35, h / 2], [0, h / 2 + 8], [-w * .35, h / 2]]) : rect(-w / 2, -h / 2, w, h, 26));
    if (o.draw) o.draw(ctx);
    if (o.text) { ctx.fillStyle = o.color || INK; ctx.font = o.font || FX.DISPLAY(34); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.text, 0, 3); }
    ctx.restore();
  }
  const ghostIcon = (ctx, x, y, s = 1, a = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
    shape(ctx, '#eef3f8', 4, c => { c.moveTo(-34, 40); c.lineTo(-34, -6); c.arc(0, -6, 34, Math.PI, 0); c.lineTo(34, 40); for (let i = 0; i < 4; i++) c.quadraticCurveTo(34 - i * 17 - 8, 30, 34 - (i + 1) * 17, 40); c.closePath(); });
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-12, -8, 5, 0, 7); ctx.arc(12, -8, 5, 0, 7); ctx.fill();
    ctx.restore();
  };
  const cross = (ctx, x, y, s, k, color = RED) => { if (k <= 0) return; const e = clamp(k / .25) * s; line(ctx, [[x - e, y - e], [x + e, y + e]], 12, color); if (k > .12) { const e2 = clamp((k - .12) / .25) * s; line(ctx, [[x + s, y - s], [x + s - 2 * e2, y - s + 2 * e2]], 12, color); } };
  const tick = (ctx, x, y, s, k, color = '#2f7a46') => { if (k <= 0) return; const e = clamp(k / .3); line(ctx, [[x - s, y], [x - s * .3, y + s * .7], ...(e > .4 ? [[lerp(x - s * .3, x + s, (e - .4) / .6), lerp(y + s * .7, y - s, (e - .4) / .6)]] : [])], 12, color); };
  // a red marker circle drawn on over time
  const ring = (ctx, x, y, rx, ry, k, color = RED) => { if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -.05, -1.7, -1.7 + Math.PI * 2.1 * ease.out(clamp(k))); ctx.lineWidth = 7; ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); };
  // cursive "handwriting" scribble, revealed left→right
  function scribble(ctx, x, y, w, rows, k, seed = 1, color = '#2a3a6a', gap = 30) {
    const r = rng(seed); ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round';
    const total = rows * w; let budget = total * clamp(k);
    for (let i = 0; i < rows && budget > 0; i++) {
      const len = Math.min(budget, w * (i === rows - 1 ? .6 : 1)); budget -= w;
      ctx.beginPath(); ctx.moveTo(x, y + i * gap);
      for (let u = 0; u < len; u += 4) ctx.lineTo(x + u, y + i * gap - Math.abs(Math.sin(u * .19 + i)) * 9 - (r() < .08 ? 8 : 0));
      ctx.stroke();
    }
    ctx.restore();
  }

  // ================= THE SÉANCE IN ATLANTIC CITY =================
  function s1(ctx, lt, dur, t) { // Doyle's portrait: creator of Sherlock Holmes, leading Spiritualist
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 380);
    parlour(ctx, '#3e4a44');
    frame(ctx, 470, 360, 300, 380, '#c9b48e', () => fig(ctx, 470, 980, .62, doyle({ face: { brows: 'calm', mouth: 'flat', look: [.2, 0], eyes: blink(t, 1.6, 3.9) }, breathe: breathe(t) })));
    ctx.restore();
    const d = since(t, 'detective');
    label(ctx, [['SIR ARTHUR CONAN DOYLE', FX.FONT(700, 24)], ['creator of', FX.FONT(600, 20)], ['SHERLOCK HOLMES', FX.DISPLAY(36)]], 930, 300, (d + .1) / .35, .03, 420);
    if (d > .3) { // a magnifying glass swings in beside the label
      const a = FX.pendulum(d - .3, .5, 260); ctx.save(); ctx.translate(1110, 430); ctx.rotate(a - .6);
      shape(ctx, '#6b4f39', 4, rect(-10, 40, 20, 90, 6)); shape(ctx, 'rgba(200,230,240,.5)', 6, circle(0, 0, 46)); shape(ctx, null, 8, circle(0, 0, 46)); ctx.restore();
    }
    label(ctx, [['LEADING SPIRITUALIST', FX.DISPLAY(30)]], 930, 520, (lt - (dur - 1.6)) / .3, -.03, 380);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'c. 1920');
    if (lt < 2.3) chapter(ctx, 'THE SÉANCE IN ATLANTIC CITY', lt); else if (lt < 2.6) { ctx.save(); ctx.globalAlpha = 1 - (lt - 2.3) / .3; chapter(ctx, 'THE SÉANCE IN ATLANTIC CITY', lt); ctx.restore(); }
  }
  function s2(ctx, lt, dur, t) { // one of Spiritualism's most famous champions: Doyle on a lecture platform
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    shape(ctx, '#5a2a2a', 0, rect(-400, -300, 2100, 1000));
    for (let x = -400; x < 1700; x += 90) shape(ctx, '#4a2222', 0, rect(x, -300, 40, 1000));
    // banner
    const bk = FX.settle(clamp((lt - .2) / .4));
    ctx.save(); ctx.translate(640, 76); ctx.scale(1, bk); shape(ctx, '#e9dcb8', 4, poly([[-330, -50], [330, -50], [330, 50], [300, 70], [-300, 70], [-330, 50]])); ctx.fillStyle = INK; ctx.font = FX.DISPLAY(56); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('SPIRITUALISM', 0, 8); ctx.restore();
    shape(ctx, '#3a2a20', 0, rect(-400, 560, 2100, 400));
    glow(ctx, 640, 380, 380, 'rgba(255,220,160,.25)');
    // Doyle at the lectern: arm rising on each emphatic beat
    const beat = Math.max(0, Math.sin(lt * 2.4)) * ease.out(clamp(lt / .6));
    fig(ctx, 600, 620, .33, doyle({ hands: { L: [-140, -620], R: [lerp(160, 330, beat), lerp(-640, -1180, beat)] }, handShape: { R: beat > .5 ? 'point' : 'open' }, face: { brows: beat > .5 ? 'up' : 'calm', mouth: beat > .3 ? 'o' : 'smile', look: [-.2, -.2] }, breathe: breathe(t) }));
    shape(ctx, '#6b4f39', 5, poly([[530, 480], [730, 480], [710, 610], [550, 610]])); shape(ctx, '#7a5a40', 4, rect(510, 460, 240, 30, 4));
    // audience in the foreground (backs of heads), clapping on the beats
    for (let i = 0; i < 9; i++) {
      const x = 80 + i * 140, y = 720 + (i % 2) * 20, clap = Math.abs(Math.sin(lt * 7 + i)) * 10;
      shape(ctx, ['#2a2220', '#3a2c26', '#1f1a18'][i % 3], 4, ellipse(x, y - 60, 120, 70)); shape(ctx, ['#4a3a2a', '#2a2420', '#6a5a4a'][i % 3], 4, circle(x, y - 150, 44));
      if (i % 3 === 1) { shape(ctx, '#e7b08a', 3.5, circle(x - 30 + clap, y - 110, 13)); shape(ctx, '#e7b08a', 3.5, circle(x + 30 - clap, y - 110, 13)); }
    }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.caption(ctx, "ONE OF SPIRITUALISM'S MOST FAMOUS CHAMPIONS", lt, .5);
    FX.dateTag(ctx, '1920s');
  }
  function s3(ctx, lt, dur, t) { // 1916: he publicly embraces the movement
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    const k = lt - .25;
    if (k > 0) newspaper(ctx, 640, 380, 640, 520, { mast: 'THE LONDON COURIER', date: 'NOVEMBER 1916', head: ['CONAN DOYLE:', '"I BELIEVE"'], hs: 58, rot: -.03, scale: slam(k), seed: 11,
      draw: c => { ctx.save(); c.beginPath(); c.rect(-120, 60, 240, 160); c.clip(); shape(c, '#cfc4aa', 3, rect(-120, 60, 240, 160)); fig(c, 0, 470, .3, doyle({ face: { mouth: 'smile', look: [0, 0] } }), { filter: 'grayscale(1) contrast(.9)' }); ctx.restore(); shape(c, null, 3, rect(-120, 60, 240, 160)); } });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1916');
  }
  function s4(ctx, lt, dur, t) { // he believed he'd reached family lost in the war, including his son Kingsley
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 700, 360);
    parlour(ctx, '#3e3a44');
    // mantel with Kingsley's photograph, black ribbon, and a faint glow Doyle believes in
    shape(ctx, '#6b4f39', 5, rect(700, 420, 460, 30, 4)); shape(ctx, '#5a4030', 5, rect(730, 450, 400, 150)); shape(ctx, '#1d1612', 4, rect(840, 480, 180, 120, 60));
    const fire = 1 + Math.sin(t * 9) * .1; glow(ctx, 930, 560, 160 * fire, 'rgba(255,150,70,.45)'); shape(ctx, '#f0a040', 3, smooth([[880, 600], [900, 540], [930, 570], [950, 520], [980, 600]]));
    frame(ctx, 930, 300, 150, 190, '#c9b48e', () => fig(ctx, 930, 640, .34, cast('kingsley', 'uniform', { face: { mouth: 'flat' } }), { filter: 'sepia(.8)' }));
    ctx.save(); ctx.translate(1010, 210); ctx.rotate(.7); shape(ctx, '#151517', 3, rect(-50, -10, 100, 20)); ctx.restore();
    const g = .5 + .5 * Math.sin(lt * 1.6); glow(ctx, 930, 300, 200, `rgba(200,220,255,${.12 + .1 * g})`);
    for (let i = 0; i < 3; i++) { const u = ((lt * .25 + i / 3) % 1); ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI) * .5; ctx.fillStyle = '#dfe8ff'; ctx.beginPath(); ctx.arc(860 + i * 70 + Math.sin(u * 6 + i) * 10, 330 - u * 160, 5, 0, 7); ctx.fill(); ctx.restore(); }
    // Doyle, turned toward it, hand on heart
    fig(ctx, 470, 700, .4, doyle({ hands: { L: [-130, -480], R: [-20, -860] }, headTilt: -.05, face: { brows: 'worried', mouth: 'smile', look: [-.7, -.3], eyes: blink(t, at('believed') + 2.2) }, breathe: breathe(t) * .6 }), { mirror: true });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    FX.caption(ctx, 'FAMILY LOST IN THE WAR', lt, .6, W - 60, 40);
    if (since(t, 'kingsley') > 0) label(ctx, [['KINGSLEY DOYLE', FX.DISPLAY(32)], ['his son · died 1918', FX.FONT(600, 20)]], 300, 170, since(t, 'kingsley') / .35, -.03, 340);
    FX.dateTag(ctx, '1916 – 1920');
  }
  function s5(ctx, lt, dur, t) { // Houdini and Doyle meet in England, 1920, and become real friends
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, '#b8c8cc', 0, rect(-400, -300, 2100, 1000));
    // a rainy English garden: grey clouds, hedge, a brick house
    for (const [x, y, r] of [[200, 90, 70], [280, 70, 90], [370, 100, 70], [900, 110, 80], [1000, 80, 100], [1100, 110, 70]]) shape(ctx, '#e3e8ea', 0, circle(x, y, r));
    shape(ctx, '#9a5a44', 4, rect(840, 200, 420, 400)); shape(ctx, '#5a3a30', 4, poly([[820, 210], [1050, 90], [1280, 210]]));
    for (const [x, y] of [[900, 270], [1080, 270], [900, 420], [1080, 420]]) { shape(ctx, '#f1ead8', 4, rect(x, y, 90, 110, 2)); shape(ctx, '#6a8a9a', 0, rect(x + 8, y + 8, 74, 94)); }
    shape(ctx, '#4a6a3a', 4, smooth([[-400, 560], [-300, 470], [-100, 480], [100, 450], [300, 480], [500, 460], [700, 490], [860, 470], [1700, 520], [1700, 600], [-400, 600]]));
    shape(ctx, '#8a9a6a', 0, rect(-400, 600, 2100, 400)); line(ctx, [[-400, 600], [1700, 600]], 4, 'rgba(0,0,0,.25)');
    // they walk in from either side and meet in the middle; the clasp pumps twice
    const walk = clamp(lt / 1.1), e = ease.out(walk), ph = lt * 7, step = walk < 1 ? Math.sin(ph) : 0;
    const hx = lerp(260, 540, e), dx = lerp(1020, 760, e), meet = (hx + dx) / 2, reach = clamp((lt - .9) / .35), pump = lt > 1.25 ? Math.sin((lt - 1.25) * 12) * 12 * Math.exp(-(lt - 1.25) * 1.6) : 0;
    const S = .36, hy = 700 - 1460 * S * .47;
    const hHand = [(meet - hx) / S, (hy + pump - 700) / S], dHand = [(dx - meet) / S, (hy + pump - 700) / S];
    fig(ctx, hx, 700 - Math.abs(step) * 6, S, houdini({ feet: { L: [-50, -40 - Math.max(0, step) * 40], R: [50, -40 - Math.max(0, -step) * 40] }, hands: { R: [120, -470], L: reach > 0 ? [lerp(-140, -hHand[0], reach), lerp(-480, hHand[1], reach)] : [-140, -480] }, handShape: { L: reach > .9 ? 'none' : 'open' }, bendL: -1,
      face: { brows: 'up', mouth: 'smile', look: [-.6, 0], eyes: blink(t, at('met') + 2.6) } }), { mirror: true });
    fig(ctx, dx, 700 - Math.abs(step) * 6, S * 1.04, doyle({ feet: { L: [-60, -40 - Math.max(0, -step) * 40], R: [60, -40 - Math.max(0, step) * 40] }, hands: { L: [-130, -470], R: reach > 0 ? [lerp(140, dHand[0] / 1.04, reach), lerp(-480, dHand[1] / 1.04, reach)] : [140, -480] }, handShape: { R: reach > .9 ? 'none' : 'open' }, bendR: 1,
      face: { brows: 'calm', mouth: 'smile', look: [.6, 0], eyes: blink(t, at('met') + 3.3) } }), { mirror: true });
    if (reach > .9) Ch.handshake(ctx, meet, hy + pump, .3, { reach: 0, skinB: '#eda882', cuffA: '#fbf0db', cuffB: '#f4efe2' });
    // rain
    ctx.save(); const r = rng(4); for (let i = 0; i < 60; i++) { const x = r() * 1500 - 100, y = (r() * 800 + t * 500) % 800 - 60; line(ctx, [[x, y], [x - 5, y + 18]], 2, 'rgba(90,110,130,.35)'); } ctx.restore();
    ctx.restore();
    FX.stamp(ctx, 'REAL FRIENDS', 640, 100, since(t, 'friends'), { color: RED, size: 54 });
    FX.vignette(ctx, 640, 400, .45);
    FX.dateTag(ctx, 'ENGLAND, 1920');
  }
  function s6(ctx, lt, dur, t) { // they disagreed about the spirits, but kept it civil (over tea)
    const civ = clamp(since(t, 'civil') / .4), cup = FX.settle(civ);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    parlour(ctx, '#46504a');
    const lift = (x0, y0) => [lerp(x0, 150, cup), lerp(y0, -1010, cup)];
    fig(ctx, 400, 720, .38, houdini({ hands: { L: [-120, -470], R: civ > 0 ? lift(200, -640) : [200, -640] }, face: { brows: civ > 0 ? 'calm' : 'smug', mouth: civ > 0 ? 'smile' : 'flat', look: [-.5, -.1], eyes: blink(t, at('disagreed') + 1.4) }, breathe: breathe(t) }), { mirror: true });
    fig(ctx, 880, 720, .4, doyle({ hands: { L: [-130, -470], R: civ > 0 ? lift(200, -640) : [200, -640] }, face: { brows: civ > 0 ? 'calm' : 'up', mouth: 'smile', look: [.5, -.1], eyes: blink(t, at('disagreed') + 2.3) }, breathe: breathe(t + 1) }), { mirror: true });
    // tea table between them, and the cups in their hands
    shape(ctx, '#7a4a30', 5, ellipse(640, 540, 170, 34)); shape(ctx, '#6a3e28', 4, rect(630, 560, 20, 150)); shape(ctx, '#6a3e28', 4, ellipse(640, 712, 70, 14));
    shape(ctx, '#f6f2ea', 4, c => { c.moveTo(600, 500); c.lineTo(680, 500); c.quadraticCurveTo(680, 530, 640, 532); c.quadraticCurveTo(600, 530, 600, 500); c.closePath(); }); shape(ctx, '#f6f2ea', 3.5, rect(626, 486, 28, 16, 4));
    const cupAt = (x, y) => { shape(ctx, '#f6f2ea', 3.5, c => { c.moveTo(x - 18, y - 16); c.lineTo(x + 18, y - 16); c.quadraticCurveTo(x + 16, y + 10, x, y + 10); c.quadraticCurveTo(x - 16, y + 10, x - 18, y - 16); c.closePath(); }); shape(ctx, null, 3.5, c => c.arc(x + 20, y - 4, 8, -1.4, 1.4)); };
    for (const [fx, s] of [[400, .38], [880, .4]]) { const h = civ > 0 ? lift(200, -640) : [200, -640]; cupAt(fx - h[0] * s, 720 + h[1] * s - 14); }
    // the disagreement, in thought bubbles
    const b = lt - .3;
    bubble(ctx, 900, 112, 190, 110, 880, 205, b, { thought: true, draw: c => ghostIcon(c, 0, 0, 1) });
    bubble(ctx, 380, 112, 190, 110, 400, 205, b - .5, { thought: true, draw: c => { ghostIcon(c, 0, 0, 1, .7); cross(c, 0, 0, 40, b - .7); } });
    ctx.restore();
    if (civ > 0) FX.bigText(ctx, 'CIVIL.', 640, 640, 70, { color: PAPER });
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, '1920 – 1922');
  }
  function s7(ctx, lt, dur, t) { // June 1922: the Ambassador Hotel, Atlantic City
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 360);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 500, [[0, '#8fc0d8'], [1, '#e8f0ea']]); ctx.fillRect(-400, -300, 2100, 1000);
    shape(ctx, '#ffe9a8', 0, circle(1120, 110, 50)); glow(ctx, 1120, 110, 160, 'rgba(255,240,180,.4)');
    shape(ctx, '#5a98b4', 0, rect(-400, 470, 2100, 200));
    for (let i = 0; i < 12; i++) { const x = ((i * 160 + lt * 30) % 1900) - 300; line(ctx, [[x, 520 + (i % 3) * 30], [x + 50, 520 + (i % 3) * 30]], 3, 'rgba(255,255,255,.5)'); }
    // the hotel: a tall block with towers and rows of windows
    shape(ctx, '#e8dcc0', 5, rect(240, 130, 620, 380)); shape(ctx, '#d8c8a8', 5, rect(180, 210, 100, 300)); shape(ctx, '#d8c8a8', 5, rect(820, 210, 100, 300));
    for (const x of [230, 870]) shape(ctx, '#b0503c', 4, poly([[x - 56, 210], [x, 150], [x + 56, 210]]));
    for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) shape(ctx, (r * 9 + c) % 7 === 3 ? '#ffe9a8' : '#6a8a9a', 2.5, rect(270 + c * 64, 160 + r * 52, 30, 32, 2));
    // the sign lights up on "Ambassador"
    const on = clamp(since(t, 'ambassador') / .3), flick = on > 0 && on < 1 ? (Math.sin(lt * 60) > 0 ? 1 : .3) : on;
    shape(ctx, '#2a2a2e', 4, rect(330, 70, 440, 64, 4)); ctx.save(); ctx.fillStyle = flick > .5 ? '#ffe08a' : '#7a6a4a'; ctx.font = FX.DISPLAY(40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; if (flick > .5) { ctx.shadowColor = '#ffd060'; ctx.shadowBlur = 20; } ctx.fillText('AMBASSADOR HOTEL', 550, 106); ctx.restore();
    line(ctx, [[400, 134], [400, 140]], 4); line(ctx, [[700, 134], [700, 140]], 4);
    // the boardwalk + a little open car rolling up
    shape(ctx, '#a07a54', 4, rect(-400, 510, 2100, 40)); for (let x = -400; x < 1700; x += 40) line(ctx, [[x, 510], [x, 550]], 2, 'rgba(60,40,20,.4)');
    const cx2 = FX.approach(lt, .2, -300, 560, .5);
    ctx.save(); ctx.translate(cx2, 500); shape(ctx, '#2a3a4a', 4, poly([[-90, -10], [80, -10], [96, -36], [40, -40], [20, -60], [-40, -60], [-60, -36], [-96, -30]])); for (const wx of [-60, 56]) { shape(ctx, '#1d1a17', 3, circle(wx, -6, 18)); shape(ctx, '#c9c4bc', 2, circle(wx, -6, 7)); } ctx.restore();
    ctx.restore();
    FX.vignette(ctx, 640, 360, .4);
    FX.caption(ctx, 'THE HOUDINIS JOIN THE DOYLES · ATLANTIC CITY', lt, .6);
    FX.dateTag(ctx, 'JUNE 1922');
  }
  function s8(ctx, lt, dur, t) { // Jean, Lady Doyle: automatic writing
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 360);
    parlour(ctx, '#4a3e4c');
    frame(ctx, 470, 340, 280, 360, '#cdbb98', () => fig(ctx, 470, 960, .6, jean({ face: { mouth: 'smile', look: [.2, 0], eyes: blink(t, at('jean') + 1.8) }, breathe: breathe(t) })), true);
    ctx.restore();
    label(ctx, [['JEAN, LADY DOYLE', FX.DISPLAY(34)], ["Doyle's wife", FX.FONT(600, 20)]], 930, 250, (lt - .3) / .35, .03, 380);
    const a = since(t, 'automatic');
    if (a > 0) { ctx.save(); ctx.translate(930, 470 - FX.dropBounce(a, 300, .25)); ctx.rotate(-.04); FX.paperDoc(ctx, 0, 0, 400, 170, { lines: 0, draw: c => { c.font = FX.DISPLAY(40); c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('AUTOMATIC', 0, -30); c.fillText('WRITING', 0, 20); scribble(c, -120, 62, 240, 1, a / .8, 4); } }); ctx.restore(); }
    FX.vignette(ctx, 640, 360, .55);
    FX.dateTag(ctx, 'JUNE 1922');
  }
  // a big close-up hand holding a pencil (local: pencil tip at 0,0)
  function pencilHand(ctx, x, y, s, skin, sleeve, cuff) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#e8b84a', 3.5, poly([[0, 0], [8, -18], [168, -160], [156, -174], [-6, -24]]));                         // pencil body
    shape(ctx, '#f0d6a8', 3, poly([[0, 0], [8, -18], [-6, -24]])); shape(ctx, INK, 0, poly([[0, 0], [4, -7], [-3, -9]])); // sharpened tip
    Ch.part(ctx, Ch.limb([330, -40], [150, -52], 112, 100), sleeve); if (cuff) Ch.part(ctx, Ch.limb([160, -52], [140, -52], 102, 102), cuff, 4);
    // fist gripping the pencil: palm, three curled fingers underneath, index finger laid along the pencil
    Ch.union(ctx, [c => c.ellipse(96, -46, 58, 44, .35, 0, Math.PI * 2), c => c.arc(50, -12, 15, 0, Math.PI * 2), c => c.arc(70, 0, 15, 0, Math.PI * 2), c => c.arc(92, 6, 15, 0, Math.PI * 2), Ch.limb([96, -92], [34, -36], 24, 20)], skin);
    Ch.stroke(ctx, [[60, -6], [62, -20]], 3, 'rgba(29,26,23,.5)'); Ch.stroke(ctx, [[81, 4], [82, -10]], 3, 'rgba(29,26,23,.5)');
    Ch.part(ctx, Ch.limb([112, -24], [52, -40], 24, 20), skin, 4.5);                                                     // thumb across the near side
    ctx.restore();
  }
  const ghostBuf = document.createElement('canvas'); ghostBuf.width = W; ghostBuf.height = H;
  function s9(ctx, lt, dur, t) { // a medium holds a pencil, and a spirit is said to guide the hand
    shape(ctx, '#2a2a3a', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    ctx.save(); ctx.translate(560, 400); ctx.rotate(-.06); shape(ctx, '#f4efe2', 4, rect(-320, -200, 640, 400, 3)); for (let i = 0; i < 9; i++) line(ctx, [[-290, -150 + i * 38], [290, -150 + i * 38]], 2, 'rgba(120,140,190,.35)'); ctx.restore();
    const sp = since(t, 'spirit'), move = clamp((sp - .6) / 2.6), wx = lerp(-200, 220, move), wy = Math.sin(move * 40) * 6;
    scribble(ctx, 360, 330, 440, 1, move, 7);
    pencilHand(ctx, 560 + wx, 330 + wy, 1.5, '#f4c6a4', '#8a7a9a', '#efe9dc');
    if (sp > 0) { // a pale, translucent hand settles over hers
      const k = ease.out(clamp(sp / .8)), g2 = ghostBuf.getContext('2d');                       // drawn whole off-screen, then faded in as one sheet
      g2.setTransform(1, 0, 0, 1, 0, 0); g2.clearRect(0, 0, W, H); g2.setTransform(ctx.getTransform()); g2.translate(0, (1 - k) * -120);
      pencilHand(g2, 554 + wx, 322 + wy, 1.56, '#e8f0ff', '#d8e4ff');
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = .3 * k; ctx.drawImage(ghostBuf, 0, 0); ctx.restore(); glow(ctx, 640 + wx, 260 + wy, 260, `rgba(190,210,255,${.25 * k})`);
    }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.caption(ctx, 'A MEDIUM HOLDS THE PENCIL…', lt, .2, W - 60, 40);
    if (sp > 0) FX.caption(ctx, '…A SPIRIT IS SAID TO GUIDE THE HAND', sp, .2);
  }
  function s10(ctx, lt, dur, t) { // she offered to try to reach Houdini's mother
    const m = since(t, 'mother');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    suite(ctx);
    const g = ease.inOut(clamp((lt - .2) / .5));
    fig(ctx, 420, 720, .38, jean({ hands: { L: [-120, -470], R: [lerp(140, 300, g), lerp(-480, -660, g)] }, bendR: 1, face: { mouth: 'smile', brows: 'calm', look: [-.6, 0], eyes: blink(t, at('offered') + 1.6) }, breathe: breathe(t) }), { mirror: true });
    fig(ctx, 830, 720, .38, houdini({ hands: { L: [-110, -470], R: [110, -470] }, face: { brows: m > 0 ? 'worried' : 'calm', mouth: 'flat', look: m > 0 ? [.1, -.6] : [.6, 0], eyes: blink(t, at('offered') + .8) }, breathe: breathe(t) }));
    bubble(ctx, 1050, 150, 210, 170, 900, 250, m, { thought: true, draw: c => { shape(c, '#c9a14a', 4, rect(-56, -70, 112, 140, 6)); shape(c, '#cdbb98', 3, rect(-46, -60, 92, 120)); c.save(); c.beginPath(); c.rect(-46, -60, 92, 120); c.clip(); fig(c, 0, 230, .23, cast('cecilia', 'dress1900', { face: { mouth: 'smile' } }), { filter: 'sepia(.7)' }); c.restore(); } });
    ctx.restore();
    FX.vignette(ctx, 640, 400, .5);
    FX.caption(ctx, "TO REACH HOUDINI'S MOTHER", m + .3, 0);
    FX.dateTag(ctx, 'AMBASSADOR HOTEL');
  }
  function s11(ctx, lt, dur, t) { // Houdini agreed: one nod, then the pencil hovers over the pad
    ctx.save(); cam(ctx, 1.25, 700, 300);
    suite(ctx);
    const nod = Math.sin(clamp(lt / .7) * Math.PI) * .14;
    fig(ctx, 760, 760, .4, houdini({ headTilt: nod, hands: { L: [-110, -470], R: [110, -470] }, face: { brows: 'calm', mouth: 'flat', look: [.2, .3], eyes: lt < .5 ? .5 : 1 } }));
    ctx.restore();
    FX.caption(ctx, 'HOUDINI AGREED', lt, .1);
    FX.dateTag(ctx, 'AMBASSADOR HOTEL');
  }
  function s12(ctx, lt, dur, t) { // the trance: page after page, about fifteen in all
    const pg = since(t, 'page'), n = Math.max(0, Math.min(15, Math.floor(1 + Math.max(0, t - at('trance') - 1) * 15 / (at('fifteen') + .9 - at('trance') - 1))));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    suite(ctx);
    // Houdini watches from the side
    fig(ctx, 1010, 720, .36, houdini({ hands: { L: [110, -760], R: [-110, -740] }, face: { brows: 'calm', mouth: 'flat', look: [.7, .4], eyes: blink(t, at('trance') + 2, at('trance') + 5.5) }, breathe: breathe(t) }));
    // Jean behind the writing table, eyes closed in trance, hand racing across the pad
    const w = (lt * 1.4) % 1, wx = lerp(-80, 80, w), wy = Math.floor(lt * 1.4) % 3 * 16;
    fig(ctx, 500, 760, .38, jean({ trance: true, headTilt: .06, hands: { L: [-100, -560], R: [220 + wx / .38 * .5, -600 + wy] }, handShape: { R: 'fist' }, face: { eyes: 0, brows: 'calm', mouth: 'flat' }, breathe: breathe(t) }), { mirror: true });
    writingTable(ctx, 520, 540, 480);
    shape(ctx, '#f6f2ea', 3.5, poly([[380, 540], [560, 540], [570, 528], [390, 528]]));
    line(ctx, [[420 + wx * .6, 528], [438 + wx * .6, 470]], 6, '#e8b84a');
    // finished pages fly off onto a pile on the floor
    if (n > 1) { const hgt = (n - 1) * 3; shape(ctx, '#f6f2ea', 3, rect(650, 708 - hgt, 120, hgt + 4, 2)); for (let i = 1; i < n; i++) line(ctx, [[654, 708 - i * 3], [766, 708 - i * 3]], 1, 'rgba(70,64,58,.35)'); shape(ctx, '#f6f2ea', 3, rect(646, 698 - hgt, 124, 12, 2)); }
    if (n > 0 && n < 15) { const f = (t - at('trance')) * 15 / (at('fifteen') + .9 - at('trance') - 1) % 1; ctx.save(); ctx.translate(lerp(480, 700, f), 520 + 180 * f * f - 80 * f); ctx.rotate(f * 3); shape(ctx, '#f6f2ea', 3, rect(-50, -34, 100, 68, 2)); ctx.restore(); }
    ctx.restore();
    if (n > 0) FX.bigText(ctx, `PAGE ${n}`, 220, 160, 60, { color: n === 15 ? '#f6c945' : PAPER });
    FX.caption(ctx, 'IN A TRANCE', lt, .4, W - 60, 40);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, 'JUNE 1922');
  }
  function s13(ctx, lt, dur, t) { // pages full of loving words, presented as his mother's
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    FX.paperDoc(ctx, 560, 380, 520, 600, { lines: 0, rot: -.03, fill: '#f6f2ea', draw: c => {
      c.font = 'italic 34px Georgia, serif'; c.fillStyle = '#2a3a6a'; c.textAlign = 'left';
      const txt = ['Oh my darling,', 'thank God, thank God,', 'at last I\'m through —', 'my own beloved boy…'];
      let left = lt * 26; txt.forEach((s, i) => { const n = Math.max(0, Math.min(s.length, Math.floor(left))); left -= s.length; c.fillText(s.slice(0, n), -220, -180 + i * 56); });
      scribble(c, -220, 70, 440, 4, (lt - 2.2) / 2, 9, '#2a3a6a', 40);
    } });
    for (let i = 0; i < 6; i++) { const u = ((lt * .35 + i / 6) % 1); ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI); ctx.translate(860 + Math.sin(u * 5 + i) * 30 + (i % 3) * 60, 560 - u * 420); ctx.scale(.8 + (i % 2) * .4, .8 + (i % 2) * .4);
      shape(ctx, '#d0485a', 3, c => { c.moveTo(0, 14); c.bezierCurveTo(-30, -6, -16, -30, 0, -14); c.bezierCurveTo(16, -30, 30, -6, 0, 14); c.closePath(); }); ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, "PRESENTED AS HIS MOTHER'S WORDS", lt, .6);
    FX.vignette(ctx, 640, 380, .55);
  }
  function s14(ctx, lt, dur, t) { // Houdini read them. The message didn't hold.
    const h = since(t, 'hold'), cr = clamp(h / .25);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.02, 1.1), 640, 330);
    suite(ctx);
    const S = .44, x = 600, page = [190, -800];
    fig(ctx, x, 800, S, houdini({ hands: { L: [page[0] - 90, page[1] + 60], R: [page[0] + 90, page[1] + 60] }, face: { brows: h > 0 ? 'worried' : 'calm', mouth: h > 0 ? 'frown' : 'flat', look: [.6, .5], eyes: blink(t, at('read') + .9) }, breathe: breathe(t) }), { mirror: true });
    // the page he's holding (in front of his hands); it cracks down the middle on "didn't hold"
    const px = x - page[0] * S, py = 800 + page[1] * S;
    for (const s of cr > 0 ? [-1, 1] : [0]) { ctx.save(); ctx.translate(px + s * cr * 14, py + s * cr * 4); ctx.rotate(s * cr * .06 - .04);
      ctx.beginPath(); if (s) { const xs = [0, -8, 6, -6, 4, 0], ys = [-80, -40, -10, 20, 50, 80]; ctx.moveTo(s * 70, -80); xs.forEach((xx, i) => ctx.lineTo(xx, ys[i])); ctx.lineTo(s * 70, 80); ctx.closePath(); ctx.clip(); }
      shape(ctx, '#f6f2ea', 3.5, rect(-70, -80, 140, 160, 2)); scribble(ctx, -54, -50, 108, 5, 1, 3, '#2a3a6a', 24); ctx.restore(); }
    ctx.restore();
    if (h > 0) FX.bigText(ctx, "IT DIDN'T HOLD.", 640, 120, 70, { color: PAPER });
    FX.vignette(ctx, 640, 360, .55);
    FX.dateTag(ctx, 'JUNE 1922');
  }
  // the first page of the automatic writing: a cross at the top, fluent English below
  function firstPage(ctx, x, y, s, rot = -.02) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    FX.paperDoc(ctx, 0, 0, 440, 580, { lines: 0, fill: '#f6f2ea', draw: c => {
      line(c, [[0, -250], [0, -190]], 6, '#2a3a6a'); line(c, [[-22, -232], [22, -232]], 6, '#2a3a6a');           // the cross
      c.font = 'italic 26px Georgia, serif'; c.fillStyle = '#2a3a6a'; c.textAlign = 'left';
      ['Oh my darling, thank God,', 'thank God, at last I\'m', 'through. I\'ve tried, oh', 'so often — now I am', 'happy. Why, of course, I', 'want to talk to my boy…'].forEach((s2, i) => c.fillText(s2, -190, -140 + i * 44));
      scribble(c, -190, 140, 380, 3, 1, 12, '#2a3a6a', 40);
    } });
    ctx.restore();
  }
  function s15(ctx, lt, dur, t) { // fluent English — but his mother spoke little English
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    firstPage(ctx, 420, 380, .95);
    ctx.restore();
    const card = (y, title, val, k, ok) => { if (k <= 0) return; ctx.save(); ctx.translate(lerp(W + 300, 960, ease.out(clamp(k / .35))), y); ctx.rotate(.02);
      FX.paperDoc(ctx, 0, 0, 440, 130, { lines: 0, draw: c => { c.textAlign = 'left'; c.font = FX.FONT(600, 20); c.fillStyle = '#5a5048'; c.fillText(title, -190, -24); c.font = FX.DISPLAY(36); c.fillStyle = INK; c.fillText(val, -190, 24); } });
      ctx.restore(); };
    card(240, 'THE MESSAGE IS WRITTEN IN', 'FLUENT ENGLISH', lt - .3);
    ring(ctx, 420, 330, 230, 180, (lt - .5) / .8, '#f6c945');
    card(420, 'HIS MOTHER SPOKE', 'LITTLE ENGLISH', since(t, 'little') + .1);
    cross(ctx, 1218, 420, 28, since(t, 'little') - .9);
    FX.dateTag(ctx, 'THE FIRST PAGE');
  }
  function s16(ctx, lt, dur, t) { // the page was marked with a cross — his mother was a devout Jewish woman, a rabbi's wife
    const d = since(t, 'devout');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, lerp(1, 1.5, ease.inOut(clamp(lt / 1.2))) - (d > 0 ? lerp(0, .45, ease.inOut(clamp(d / .8))) : 0), 420, 200);
    firstPage(ctx, 420, 380, .95);
    ring(ctx, 420, 157, 70, 60, (lt - 1.1) / .7);
    cross(ctx, 420, 157, 46, d - 1.6);
    ctx.restore();
    if (d > 0) {
      const k = ease.out(clamp(d / .5));
      ctx.save(); ctx.translate(lerp(W + 200, 960, k), 330); ctx.rotate(.03);
      frame(ctx, 0, -40, 200, 250, '#cdbb98', () => fig(ctx, 0, 380, .4, cast('cecilia', 'dress1900', { face: { mouth: 'smile' } }), { filter: 'sepia(.7)' }));
      ctx.restore();
      label(ctx, [['CECILIA WEISZ', FX.DISPLAY(30)], ['devout Jewish woman', FX.FONT(600, 20)], ["a rabbi's wife", FX.FONT(600, 20)]], 960, 560, (d - .3) / .35, -.02, 360);
    }
    FX.caption(ctx, 'MARKED WITH A CROSS', lt, .9, W - 60, 40);
    FX.dateTag(ctx, 'THE FIRST PAGE');
  }
  function s17(ctx, lt, dur, t) { // around her birthday — and the message never mentioned it
    const b = since(t, 'bday'), nv = since(t, 'never');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    // the June 1922 calendar
    ctx.save(); ctx.translate(380, 380); ctx.rotate(-.03);
    shape(ctx, '#f4efe2', 4, rect(-230, -230, 460, 470, 3)); shape(ctx, RED, 0, rect(-230, -230, 460, 70));
    ctx.fillStyle = '#fff'; ctx.font = FX.DISPLAY(40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('JUNE 1922', 0, -194);
    ctx.font = FX.FONT(700, 22); ctx.fillStyle = INK;
    for (let d = 1; d <= 30; d++) { const i = d + 2, cx = -195 + (i % 7) * 65, cy = -120 + Math.floor(i / 7) * 66; ctx.fillText(String(d), cx, cy); }
    ring(ctx, -195 + (19 % 7) * 65, -120 + Math.floor(19 / 7) * 66, 30, 26, b / .5);
    if (b > .3) { const k = FX.settle(clamp((b - .3) / .3)); ctx.save(); ctx.translate(-195 + (19 % 7) * 65 + 60, -120 + Math.floor(19 / 7) * 66 - 54); ctx.scale(k, k);
      shape(ctx, '#f3d6e0', 3.5, rect(-30, -10, 60, 34, 4)); shape(ctx, '#f6f2ea', 3, rect(-30, -16, 60, 10, 3)); shape(ctx, '#efe6d0', 2.5, rect(-4, -36, 8, 20)); shape(ctx, '#ffd27a', 2, smooth([[0, -38], [-5, -46], [0, -56], [5, -46]])); ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, 'ON OR AROUND HER BIRTHDAY', b + .4, 0, W - 60, 40);
    ctx.restore();
    // the pages: a magnifying glass sweeps for the word, finds nothing
    if (nv > -1.2) {
      const k = ease.out(clamp((nv + 1.2) / .5));
      firstPage(ctx, lerp(W + 300, 940, k), 390, .72, .03);
      const sw = clamp((nv + .4) / 1.6), mx = 940 + Math.sin(sw * Math.PI * 3) * 110, my = 300 + sw * 200;
      ctx.save(); ctx.translate(mx, my); shape(ctx, 'rgba(200,230,240,.35)', 6, circle(0, 0, 54)); shape(ctx, '#6b4f39', 4, rect(36, 36, 22, 90, 6)); ctx.restore();
      FX.stamp(ctx, 'NOT MENTIONED', 940, 470, nv - 1.2, { color: RED, size: 46 });
    }
    FX.dateTag(ctx, 'JUNE 17, 1922');
  }
  function s18(ctx, lt, dur, t) { // not cheating — sincere
    const s = since(t, 'sincere');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    parlour(ctx);
    fig(ctx, 860, 720, .4, houdini({ hands: { L: [-60, -1010], R: [110, -760] }, handShape: { L: 'fist' }, headTilt: -.06, face: { brows: s > 0 ? 'worried' : 'calm', mouth: 'flat', look: [-.4, -.5], eyes: blink(t, at('cheating') + 1.7, at('cheating') + 4.3) }, breathe: breathe(t) }));
    const card = (x, y, title, k, rot) => { if (k <= 0) return; ctx.save(); ctx.translate(x, y - FX.dropBounce(k, 260, .25)); ctx.rotate(rot); FX.paperDoc(ctx, 0, 0, 300, 150, { lines: 0, draw: c => { c.font = FX.DISPLAY(44); c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(title, 0, 4); } }); ctx.restore(); };
    card(330, 260, 'CHEATING?', lt - .2, -.04); cross(ctx, 330, 260, 60, lt - .9);
    card(330, 470, 'SINCERE', s, .03); tick(ctx, 480, 450, 34, s - .5);
    ctx.restore();
    FX.vignette(ctx, 640, 400, .55);
    FX.caption(ctx, 'WHAT HOUDINI SEEMS TO HAVE BELIEVED', lt, .3, W - 60, 40);
  }
  function s19(ctx, lt, dur, t) { // that was what troubled him: close on his face, rain on the glass
    ctx.save(); cam(ctx, 1.7 + lt * .03, 640, 230);
    suite(ctx);
    fig(ctx, 640, 760, .42, houdini({ headTilt: .1, hands: { L: [-110, -470], R: [110, -470] }, face: { brows: 'worried', mouth: 'frown', look: [.5, .3], eyes: blink(t, at('troubled') + 1.2) }, breathe: breathe(t) }));
    ctx.restore();
    ctx.save(); const r = rng(8); for (let i = 0; i < 50; i++) { const x = r() * W, y = (r() * 800 + t * 380) % 800 - 40; line(ctx, [[x, y], [x - 3, y + 16]], 2, 'rgba(200,215,230,.25)'); } ctx.restore();
    FX.vignette(ctx, 640, 300, .65);
    FX.caption(ctx, 'THAT WAS WHAT TROUBLED HIM', lt, .2);
  }
  function s20(ctx, lt, dur, t) { // honest, loving people + grief → a false message → "evidence"
    const g = since(t, 'grief');
    FX.darkBg(ctx, '#23303a');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    // input: two honest, loving people
    fig(ctx, 150, 560, .2, doyle({ face: { mouth: 'smile', brows: 'calm', look: [-.6, 0] } }), { mirror: true });
    fig(ctx, 260, 560, .2, jean({ face: { mouth: 'smile', brows: 'calm', look: [-.6, 0] } }), { mirror: true });
    ctx.save(); ctx.font = FX.FONT(700, 20); ctx.fillStyle = '#d8e2ea'; ctx.textAlign = 'center'; ctx.fillText('HONEST, LOVING PEOPLE', 205, 600); ctx.restore();
    // the machine
    const run = lt * 3;
    shape(ctx, '#7a8a96', 5, rect(430, 220, 420, 300, 14)); shape(ctx, '#5a6a76', 4, rect(470, 260, 340, 120, 8));
    for (const [gx, gy, r, d] of [[540, 320, 44, 1], [640, 320, 34, -1.3], [740, 320, 44, 1]]) { ctx.save(); ctx.translate(gx, gy); ctx.rotate(run * d); shape(ctx, '#c9a14a', 3.5, c => { for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, rr = i % 2 ? r : r * .78; i ? c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : c.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.closePath(); }); shape(ctx, '#7a5a20', 3, circle(0, 0, r * .3)); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const u = (lt * .6 + i / 3) % 1; ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI) * .6; shape(ctx, '#d8dde0', 0, circle(800 + u * 30, 200 - u * 120, 14 + u * 20)); ctx.restore(); }
    ctx.font = FX.DISPLAY(44); ctx.fillStyle = g > 0 ? '#f6c945' : '#3a4650'; ctx.textAlign = 'center'; ctx.fillText(g > 0 ? 'GRIEF' : '· · ·', 640, 470);
    line(ctx, [[330, 450], [430, 450]], 6, '#d8e2ea'); shape(ctx, '#d8e2ea', 0, poly([[430, 436], [452, 450], [430, 464]]));
    // a heart slides in along the input chute
    const hk = (lt * .7) % 1; ctx.save(); ctx.translate(lerp(320, 440, hk), 400); shape(ctx, '#d0485a', 3, c => { c.moveTo(0, 14); c.bezierCurveTo(-30, -6, -16, -30, 0, -14); c.bezierCurveTo(16, -30, 30, -6, 0, 14); c.closePath(); }); ctx.restore();
    // output: a message from the dead, stamped — on "grief" it becomes EVIDENCE
    const out = ease.out(clamp((lt - 1.2) / .8));
    ctx.save(); ctx.translate(lerp(760, 1040, out), 400); ctx.rotate(.04 * out);
    FX.paperDoc(ctx, 0, 0, 260, 320, { lines: 0, fill: '#f6f2ea', draw: c => { c.font = FX.FONT(700, 20); c.fillStyle = INK; c.textAlign = 'center'; c.fillText('A MESSAGE', 0, -120); c.fillText('FROM THE DEAD', 0, -94); scribble(c, -100, -50, 200, 5, 1, 21, '#2a3a6a', 28); } });
    ctx.restore();
    FX.stamp(ctx, 'FALSE', 1040, 390, lt - 2.4, { color: RED, size: 42 });
    FX.stamp(ctx, 'EVIDENCE?', 1040, 500, g + .6, { color: '#f6c945', size: 40, rot: .08 });
    ctx.restore();
    FX.caption(ctx, 'GRIEF ALONE COULD MANUFACTURE EVIDENCE', g, .3);
    FX.dateTag(ctx, "HOUDINI'S WORRY");
  }
  function s21(ctx, lt, dur, t) { // his doubts go public; Doyle defends his wife
    const d = since(t, 'defended');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    if (lt > .2) newspaper(ctx, 470, 380, 560, 460, { mast: 'THE EVENING HERALD', date: '1922 – 1923', head: ['HOUDINI DOUBTS', 'THE DOYLE SEANCE'], hs: 44, rot: -.05, scale: slam(lt - .2), seed: 21 });
    if (d > 0) newspaper(ctx, 830, 400, 540, 440, { mast: 'THE MORNING STAR', date: '1923', head: ['DOYLE DEFENDS', 'HIS WIFE'], hs: 48, rot: .05, scale: slam(d), seed: 22,
      draw: c => { c.save(); c.beginPath(); c.rect(-90, 70, 180, 130); c.clip(); shape(c, '#cfc4aa', 3, rect(-90, 70, 180, 130)); fig(c, 0, 420, .24, doyle({ face: { brows: 'worried', mouth: 'frown' } }), { filter: 'grayscale(1)' }); c.restore(); } });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1922 – 1923');
  }
  function s22(ctx, lt, dur, t) { // the friendship never recovered: their photo tears in two
    const tear = clamp((lt - .5) / .5), fall = Math.max(0, lt - 1);
    FX.darkBg(ctx, '#2a2420');
    for (const s of [-1, 1]) {
      ctx.save(); ctx.translate(640 + s * (tear * 30 + fall * 40), 380 + fall * fall * 120); ctx.rotate(s * (tear * .05 + fall * .12));
      ctx.beginPath(); const xs = [0, 12, -10, 8, -6, 10, 0], ys = [-210, -140, -70, 0, 70, 140, 210]; ctx.moveTo(s * 300, -210); xs.forEach((x, i) => ctx.lineTo(x, ys[i])); ctx.lineTo(s * 300, 210); ctx.closePath(); ctx.clip();
      shape(ctx, '#f4efe2', 0, rect(-270, -200, 540, 400)); shape(ctx, '#bfae8c', 0, rect(-246, -176, 492, 352));
      fig(ctx, -110, 230, .32, houdini({ face: { mouth: 'smile', brows: 'calm', look: [-.4, 0] } }), { mirror: true, filter: 'sepia(.9)' });
      fig(ctx, 110, 230, .33, doyle({ face: { mouth: 'smile', brows: 'calm', look: [.4, 0] } }), { mirror: true, filter: 'sepia(.9)' });
      ctx.restore();
    }
    FX.caption(ctx, 'THE FRIENDSHIP NEVER RECOVERED', lt, .4);
    FX.vignette(ctx, 640, 380, .6);
  }
  function s23(ctx, lt, dur, t) { // from doubter to the movement's most visible opponent
    const o = since(t, 'opponent'), flip = clamp(o / .35);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    shape(ctx, '#7a2621', 0, rect(-600, -500, 2500, 1140));
    for (let x = -600; x < 1900; x += 78) { shape(ctx, '#5f1b17', 0, rect(x + 22, -500, 22, 1140)); shape(ctx, '#943229', 0, rect(x + 52, -500, 8, 1140)); }
    shape(ctx, '#5a4231', 0, rect(-600, 640, 2500, 400)); glow(ctx, 640, 420, 420, 'rgba(255,220,160,.28)');
    // the sign above him flips
    ctx.save(); ctx.translate(640, 104); ctx.scale(1, Math.abs(Math.cos(flip * Math.PI)) || .02);
    shape(ctx, flip < .5 ? '#e9dcb8' : '#f6c945', 4, rect(-260, -56, 520, 112, 6)); ctx.fillStyle = INK; ctx.font = FX.DISPLAY(64); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(flip < .5 ? 'DOUBTER' : 'OPPONENT', 0, 6); ctx.restore();
    const up = FX.settle(flip);
    fig(ctx, 640, 680, .32, houdini({ hands: { L: [-130, -470], R: [lerp(150, 380, up), lerp(-480, -1220, up)] }, handShape: { R: o > 0 ? 'point' : 'open' }, face: { brows: o > 0 ? 'smug' : 'calm', mouth: o > 0 ? 'grit' : 'flat', look: [.3, -.1], eyes: blink(t, at('doubter') + 1.2) }, breathe: breathe(t) }));
    ctx.restore();
    FX.caption(ctx, "THE MOVEMENT'S MOST VISIBLE OPPONENT", o, .2);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, '1923 – 1924');
  }

  G.Part3A = { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23,
    lib: { chapter, frame, label, parlour, suite, seanceRoom, newspaper, slam, bubble, ghostIcon, cross, tick, ring, scribble, houdini, cast, doyle, jean, margery, breathe, blink, RED, PAPER } };
})(window);
