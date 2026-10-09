/* "Your Price Isn't My Price" — part 3: CH. 4 IT'S ALREADY ON YOUR SCREEN, CH. 5 THE WEEK INSTACART FOLDED
 * (voice: assets/audio/pricing-3.mp3). Shot plan + music map: biz/PLAN-pricing-3.md. Times are the narration's word times. */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt, tween } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const drift = (lt, dur, z0 = 1, z1 = 1.05) => lerp(z0, z1, inout(clamp(lt / dur)));
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const INSTA = [18, 18, 1164, 592], WAL = [95, 110, 510, 140], KRO = [165, 135, 430, 120], CR_CROP = [80, 280, 1030, 250];
  // real people, drawn in the house style from the supplied photos
  const RAKOFF = { skin: '#f3c9a6', hair: 'bald', hairColor: '#e8e6e2', beard: true, glasses: true, body: '#1f1c1a', top: 'plain' };
  const HAUEN = { skin: '#f0c4a0', hair: 'side', hairColor: '#8c8a86', body: '#2b3550', top: 'suit', tie: '#8a8f7a' };
  const GALLEGO = { skin: '#d9a77e', hair: 'short', hairColor: '#4a3020', beard: true, body: '#26355c', top: 'suit', tie: '#3b6fbf' };
  const BLUMENTHAL = { skin: '#f2c8a4', hair: 'side', hairColor: '#9b958c', body: '#23262e', top: 'suit', tie: '#a3263a' };
  const WARNER = { skin: '#f2c3a0', hair: 'side', hairColor: '#b3aea6', body: '#2a2d36', top: 'suit', tie: '#3a4a7a' };
  const SHANAHAN = { skin: '#f0c4a0', hair: 'side', hairColor: '#6e5f50', body: '#5c636e', top: 'suit', tie: '#2f3a55' };
  const WARREN = { skin: '#f6d2b5', hair: 'bob', hairColor: '#d8c39a', glasses: true, body: '#5a3fb0', top: 'plain' };
  const CASEY = { skin: '#f2c8a4', hair: 'side', hairColor: '#b9b6b0', body: '#2b2f3a', top: 'suit', tie: '#3b8fd8' };
  const RADFORD = { skin: '#f0c4a0', hair: 'bald', hairColor: '#8a7a6a', beard: true, glasses: true, body: '#34495e', top: 'suit' };

  function chapterTab(ctx, num, title, lt, dur = 4.5) {
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190, x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, 'CHAPTER ' + num, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  const logo = (ctx, key, x, y, w, lt, o = {}) => K.logo(ctx, key, x, y, w, lt, o);
  const banner = (c, w, y, size = 19) => { const k = c; k.fillStyle = '#1f1c1a'; k.beginPath(); k.roundRect(14, y, w - 28, 150, 14); k.fill(); ['THIS PRICE WAS SET', 'BY AN ALGORITHM', 'USING YOUR', 'PERSONAL DATA.'].forEach((l, i) => txt(k, l, w / 2, y + 30 + i * 30, PRINT(size), i === 3 ? P.yellow : '#fff')); };
  function stampOK(ctx, x, y, lt, text = 'DENIED', col = P.blue) { K.stamp(ctx, text, x, y, lt, { color: col, size: 46, rot: -.08 }); }
  function quoteCard(ctx, x, y, w, lines, lt, o = {}) { popAt(ctx, x, y, lt, () => { const h = lines.length * (o.lh || 50) + 50; K.card(ctx, x - w / 2, y - h / 2, w, h, o.fill || '#fff', 22); lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 46 + i * (o.lh || 50), HAND(700, o.size || 40), (o.red || []).includes(i) ? P.red : INK)); }); }

  // ================= CHAPTER 4 =================
  function capitol(ctx, x, y, s, col = '#eef0f4') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-220, -80, 440, 80), col, 5); sh(ctx, c => c.rect(-110, -130, 220, 50), col, 5); sh(ctx, c => c.ellipse(0, -130, 90, 100, 0, Math.PI, 0), col, 5); sh(ctx, c => c.rect(-12, -260, 24, 36), col, 4); for (let i = 0; i < 7; i++) Tn.line(ctx, [[-190 + i * 63, -72], [-190 + i * 63, -8]], 4, '#c9ced6'); ctx.restore(); }
  function skyline(ctx, x0, y, col = '#5a6a8f') { [[0, 220, 90], [100, 320, 70], [180, 260, 100], [290, 420, 60], [360, 300, 90], [460, 360, 70], [540, 240, 110]].forEach(([dx, h, w]) => { sh(ctx, c => c.rect(x0 + dx, y - h, w, h), col, 4); for (let r = y - h + 20; r < y - 20; r += 34) for (let cx = x0 + dx + 14; cx < x0 + dx + w - 14; cx += 24) { ctx.fillStyle = '#ffe9a8'; ctx.fillRect(cx, r, 10, 14); } }); sh(ctx, c => { c.moveTo(x0 + 320, y - 420); c.lineTo(x0 + 320, y - 470); }, null, 5); }
  function g1(ctx, lt, dur, t) { // while Washington was fighting about it, New York did something different
    const T0 = 0, at = s => lt - (s - T0), pan = inout(clamp(at(2.0) / 1.2));
    K.bg.sky(ctx); ctx.save(); ctx.translate(-pan * 900, 0);
    ctx.fillStyle = '#7ccf55'; ctx.fillRect(-100, 600, 2400, 120); Tn.line(ctx, [[-100, 600], [2300, 600]], 4, INK);
    capitol(ctx, 640, 600, 1.2);
    // the tug-of-war on the lawn
    const pull = Math.sin(t * 3) * 14; Tn.line(ctx, [[330 + pull, 560], [950 + pull, 560]], 6, '#a9773f');
    for (let i = 0; i < 2; i++) bean(ctx, 300 + i * 70 + pull, 690, .5, t, Object.assign(Pr.extra(i), { body: P.blue, top: 'suit', armR: [1.6, .2], lean: -.15, face: { mouth: 'frown', brows: 'angry', look: [.9, 0] } }));
    for (let i = 0; i < 2; i++) bean(ctx, 910 + i * 70 + pull, 690, .5, t, Object.assign(Pr.extra(i + 3), { body: P.red, top: 'suit', armL: [1.6, .2], lean: .15, face: { mouth: 'frown', brows: 'angry', look: [-.9, 0] } }));
    popAt(ctx, 640, 150, at(.33), () => { K.card(ctx, 470, 112, 340, 76, '#fff', 16); txt(ctx, 'Washington', 640, 150, HAND(700, 44)); });
    skyline(ctx, 1500, 600);
    popAt(ctx, 1540, 150, at(2.13), () => { K.card(ctx, 1380, 112, 320, 76, P.yellow, 16); txt(ctx, 'New York', 1540, 150, HAND(700, 44)); });
    ctx.restore();
    chapterTab(ctx, 4, "It's already on your screen", lt);
  }
  function scroll(ctx, x, y, w, h, title) { sh(ctx, c => c.rect(x - w / 2, y - h / 2, w, h), '#fff7e2', 5); for (const yy of [y - h / 2, y + h / 2]) sh(ctx, c => c.roundRect(x - w / 2 - 20, yy - 16, w + 40, 32, 16), '#e6cf9c', 5); txt(ctx, title, x, y - h / 2 + 50, HAND(700, 40), '#6b4a1d'); }
  function g2(ctx, lt, dur, t) { // it passed a law that doesn't ban anything — it just makes companies tell you
    const T0 = 4.27, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 420, 370, at(4.45), () => scroll(ctx, 420, 370, 420, 440, 'New York law'));
    if (at(5.67) > 0) { popAt(ctx, 420, 330, at(5.67), () => txt(ctx, 'BAN', 420, 330, HAND(700, 80), '#9aa3ad')); K.cross(ctx, 420, 330, 150, clamp(at(5.96) / .4)); }
    if (at(7.12) > 0) popAt(ctx, 420, 470, at(7.12), () => { txt(ctx, 'TELL YOU', 420, 470, HAND(700, 64), P.green); K.check(ctx, 600, 460, 50, clamp(at(7.76) / .4)); });
    // a company character with a megaphone
    const c1 = bean(ctx, 920, 690, 1.0, t, Object.assign(Pr.extra(6), { top: 'suit', body: '#2f3a55', armR: [1.7, .4], face: { mouth: at(7.76) > 0 ? 'o' : 'flat', brows: 'up', look: [.6, 0] } }));
    if (at(6.95) > 0) { const hx = c1.hands.R[0], hy = c1.hands.R[1]; sh(ctx, c => { c.moveTo(hx, hy - 12); c.lineTo(hx + 90, hy - 50); c.lineTo(hx + 90, hy + 40); c.lineTo(hx, hy + 12); c.closePath(); }, P.orange, 4.5); for (let i = 0; i < 3; i++) B.curve(ctx, [hx + 110 + i * 20, hy - 40 - i * 10], [hx + 130 + i * 24, hy], [hx + 110 + i * 20, hy + 40 + i * 10], 4); }
  }
  function gear(ctx, x, y, r, rot, col = '#9aa6b8') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); sh(ctx, c => { for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, a2 = a + Math.PI / 10; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); c.lineTo(Math.cos(a2) * r * .8, Math.sin(a2) * r * .8); } c.closePath(); }, col, 4.5); sh(ctx, c => c.arc(0, 0, r * .3, 0, 7), '#fff', 4); ctx.restore(); }
  function g3(ctx, lt, dur, t) { // the Algorithmic Pricing Disclosure Act: data → algorithm → price, and it must show you this sentence
    const T0 = 8.76, at = s => lt - (s - T0);
    K.bg.white(ctx);
    popAt(ctx, 640, 80, at(8.88), () => { K.card(ctx, 280, 40, 720, 80, P.blue, 18); txt(ctx, 'Algorithmic Pricing Disclosure Act', 640, 80, HAND(700, 40), '#fff'); });
    popAt(ctx, 240, 360, at(12.53), () => { sh(ctx, c => c.roundRect(150, 280, 180, 160, 18), '#fff', 5); B.head(ctx, 240, 345, 40, Object.assign({}, Pr.YOU, { face: { mouth: 'flat' } })); txt(ctx, 'your data', 240, 415, PRINT(24)); });
    if (at(14.32) > 0) { K.arrow(ctx, [350, 360], [500, 360], clamp(at(14.32) / .4), INK, 6); popAt(ctx, 620, 360, at(14.32), () => { gear(ctx, 600, 340, 70, t); gear(ctx, 690, 410, 44, -t * 1.6, '#c9ced6'); txt(ctx, 'algorithm', 630, 480, PRINT(24)); }); }
    if (at(14.6) > 0) { K.arrow(ctx, [760, 360], [900, 360], clamp((at(14.6)) / .4), INK, 6); Pr.tag(ctx, 1010, 330, 1.2, '$?', at(14.8), { color: '#fff3c4' }); }
    if (at(15.86) > 0) popAt(ctx, 640, 600, at(15.86), () => { K.card(ctx, 380, 560, 520, 80, P.yellow, 18); txt(ctx, 'must show you this sentence:', 640, 600, HAND(700, 38)); });
    K.source(ctx, 'N.Y. Gen. Bus. Law § 349-a (via Benesch)', at(9.5));
  }
  function g4(ctx, lt, dur, t) { // "THIS PRICE WAS SET BY AN ALGORITHM USING YOUR PERSONAL DATA."
    const T0 = 18.38, at = s => lt - (s - T0);
    K.bg.color(ctx, '#1f1c1a');
    const WORDS = [['THIS', 18.38], ['PRICE', 18.57], ['WAS', 18.86], ['SET', 18.99], ['BY', 19.31], ['AN', 19.53], ['ALGORITHM', 19.63], ['USING', 20.22], ['YOUR', 20.62], ['PERSONAL', 20.73], ['DATA.', 21.19]];
    const lines = [[0, 4], [4, 7], [7, 11]];
    lines.forEach(([a, b], li) => { ctx.font = HAND(700, 84); const ws = WORDS.slice(a, b), tw = ws.reduce((s, [w]) => s + ctx.measureText(w + ' ').width, 0); let x = 640 - tw / 2;
      ws.forEach(([w, s]) => { const wd = ctx.measureText(w + ' ').width; K.slam(ctx, w, x + wd / 2 - 10, 220 + li * 130, at(s), 84, li === 2 ? P.yellow : '#fff', { stroke: '#1f1c1a' }); x += wd; }); });
  }
  function judgeBench(ctx) { sh(ctx, c => c.rect(760, 380, 460, 260), '#8a5a36', 6); sh(ctx, c => c.rect(740, 360, 500, 40), '#a8703f', 6); if (IMG.ftc) {} }
  function g5(ctx, lt, dur, t) { // retailers sued to block it — they lost: Oct 8, 2025, Judge Jed Rakoff dismissed the lawsuit
    const T0 = 22.3, at = s => lt - (s - T0), lost = at(24.48) > 0, bang = at(31.15);
    K.bg.color(ctx, '#e9dcc6'); for (let i = 0; i < 6; i++) sh(ctx, c => c.rect(80 + i * 220, 60, 30, 340), '#d8c4a0', 0); ctx.fillStyle = '#c9b089'; ctx.fillRect(0, 600, W, 120);
    bean(ctx, 990, 400, .85, t, Object.assign({}, RAKOFF, { armR: [2.2, .6], face: { mouth: bang > 0 ? 'flat' : 'smile', brows: 'calm', look: [-.6, .2] } }));
    judgeBench(ctx);
    const ga = bang > 0 && bang < .25 ? -.2 + bang * 4 : -1.0; ctx.save(); ctx.translate(1140, 360); ctx.rotate(ga); sh(ctx, c => c.roundRect(-6, -110, 12, 110, 5), '#6b3e2a', 3); sh(ctx, c => c.roundRect(-36, -140, 72, 40, 8), '#6b3e2a', 4); ctx.restore();
    for (let i = 0; i < 3; i++) bean(ctx, 180 + i * 130, 690, .7, t, Object.assign(Pr.extra(i + 2), { top: 'suit', body: '#2f3a55', armR: i === 1 && !lost ? [2.4, .2] : [.2, .2], face: { mouth: lost ? 'frown' : 'flat', brows: lost ? 'worried' : 'angry', look: [.8, -.2] } }));
    popAt(ctx, 310, 160, at(22.3), () => { K.card(ctx, 160, 120, 300, 80, '#fff', 16); txt(ctx, 'retailers sued', 310, 160, HAND(700, 40)); });
    if (lost) K.stamp(ctx, 'LOST', 310, 260, at(24.48), { color: P.red, size: 60, rot: -.1 });
    K.nameCard(ctx, 'Judge Jed Rakoff', 'federal court, Manhattan', 990, 120, at(28.23));
    if (at(25.95) > 0) popAt(ctx, 640, 470, at(25.95), () => { K.card(ctx, 500, 430, 280, 76, P.yellow, 16); txt(ctx, 'Oct 8, 2025', 640, 469, HAND(700, 42)); });
    if (bang > 0) K.stamp(ctx, 'DISMISSED', 990, 520, bang, { color: P.red, size: 60, rot: -.06 });
    K.source(ctx, 'Source: Benesch (Oct 2025)', at(26));
  }
  function g6(ctx, lt, dur, t) { // November 2025, per Business Insider: that sentence started showing up on phones in New York
    const T0 = 32.77, at = s => lt - (s - T0);
    K.bg.sky(ctx); skyline(ctx, 40, 600, '#7d8db0'); skyline(ctx, 640, 600, '#6a7aa0'); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    for (let i = 0; i < 5; i++) { const x = 160 + i * 240, p = bean(ctx, x, 700, .6, t, Object.assign(Pr.extra(i + 1), { armR: [.9, 1.5], face: { mouth: at(37.11 + i * .25) > 0 ? 'o' : 'flat', brows: 'up', look: [.4, .6] } }));
      sh(ctx, c => c.roundRect(p.hands.R[0] - 6, p.hands.R[1] - 54, 34, 58, 6), '#24272e', 2.5);
      const k = at(37.11 + i * .25); if (k > 0) popAt(ctx, x + 10, 380, k, () => { K.card(ctx, x - 100, 340, 220, 80, '#1f1c1a', 12, 0); txt(ctx, 'THIS PRICE WAS SET BY', x + 10, 365, PRINT(14), '#fff'); txt(ctx, 'AN ALGORITHM USING YOUR', x + 10, 383, PRINT(14), '#fff'); txt(ctx, 'PERSONAL DATA.', x + 10, 401, PRINT(14), P.yellow); Tn.line(ctx, [[x + 10, 420], [x + 10, p.hands.R[1] - 54]], 2, 'rgba(0,0,0,.3)'); }); }
    popAt(ctx, 640, 110, at(33.03), () => { K.card(ctx, 470, 70, 340, 80, P.yellow, 16); txt(ctx, 'Nov 2025 · New York', 640, 110, HAND(700, 38)); });
    K.source(ctx, 'Source: Business Insider (Nov 2025)', at(34.7));
  }
  function g7(ctx, lt, dur, t) { // DoorDash showed it as a pop-up; Uber Eats showed it before checkout
    const T0 = 40.11, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f3f0ff');
    logo(ctx, 'doordash', 360, 90, 200, at(40.2), { pad: 10 });
    Pr.phone(ctx, 360, 420, .85, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) { c.fillStyle = '#f3f5f7'; c.beginPath(); c.roundRect(16, 20 + i * 70, w - 32, 56, 10); c.fill(); }
      if (at(41.18) > 0) { c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, 0, w, h); const k = back(clamp(at(41.18) / .35)); c.save(); c.translate(w / 2, h / 2); c.scale(k, k); c.translate(-w / 2, -h / 2); banner(c, w, h / 2 - 75); c.fillStyle = '#ff3008'; c.beginPath(); c.roundRect(60, h / 2 + 90, w - 120, 40, 20); c.fill(); txt(c, 'OK', w / 2, h / 2 + 110, PRINT(20), '#fff'); c.restore(); } });
    logo(ctx, 'ubereats', 920, 90, 110, at(42.46), { pad: 6 });
    Pr.phone(ctx, 920, 420, .85, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); txt(c, 'Your order', 20, 40, PRINT(24), INK, 'left'); for (let i = 0; i < 3; i++) { c.fillStyle = '#f3f5f7'; c.fillRect(16, 70 + i * 50, w - 32, 38); }
      if (at(42.6) > 0) { c.globalAlpha = clamp(at(42.6) / .4); banner(c, w, 240, 17); c.globalAlpha = 1; }
      c.fillStyle = '#06c167'; c.beginPath(); c.roundRect(20, h - 80, w - 40, 54, 27); c.fill(); txt(c, 'Checkout', w / 2, h - 53, PRINT(22), '#fff'); });
    txt(ctx, 'pop-up', 360, 690, HAND(700, 34), INK, 'center', clamp(at(41.18) / .3)); txt(ctx, 'before checkout', 920, 690, HAND(700, 34), INK, 'center', clamp(at(43.28) / .3));
    popAt(ctx, 640, 620, at(40.3), () => { K.card(ctx, 560, 596, 160, 48, P.yellow, 10); txt(ctx, 'RECREATION', 640, 620, PRINT(20)); });
  }
  function g8(ctx, lt, dur, t) { // DoorDash: delivery address + past orders → fees and personalized promotions
    const T0 = 44.72, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 640, 70, at(45.17), () => { K.card(ctx, 380, 30, 520, 80, '#fff', 16); txt(ctx, 'what did they say they use?', 640, 70, HAND(700, 38)); });
    logo(ctx, 'doordash', 640, 170, 170, at(47.72), { pad: 8 });
    popAt(ctx, 220, 420, at(49.61), () => { K.house(ctx, 220, 500, .8); Pr.pin(ctx, 220, 290, .7, 1); txt(ctx, 'delivery address', 220, 560, PRINT(24)); });
    popAt(ctx, 500, 420, at(50.54), () => { for (let i = 0; i < 4; i++) sh(ctx, c => c.rect(440 + i * 10, 330 - i * 14, 110, 150), '#fff', 3.5); for (let j = 0; j < 5; j++) Tn.line(ctx, [[480, 300 + j * 22 - 42], [570, 300 + j * 22 - 42]], 3, '#c9ced6'); txt(ctx, 'past orders', 510, 560, PRINT(24)); });
    if (at(51.56) > 0) { K.arrow(ctx, [620, 420], [760, 420], clamp(at(51.56) / .4), INK, 6); Pr.tag(ctx, 880, 340, 1, 'fees', at(51.92), { color: '#ffd6d0', size: 36 }); }
    if (at(52.53) > 0) popAt(ctx, 1080, 430, at(52.84), () => { ctx.save(); ctx.translate(1080, 430); ctx.rotate(-.06); sh(ctx, c => c.rect(-120, -60, 240, 120), P.green, 5); ctx.setLineDash([10, 8]); sh(ctx, c => c.rect(-106, -46, 212, 92), null, 3, '#fff'); ctx.setLineDash([]); txt(ctx, 'personalized', 0, -14, PRINT(22), '#fff'); txt(ctx, 'PROMO', 0, 22, HAND(700, 40), '#fff'); ctx.restore(); });
    K.source(ctx, "DoorDash's disclosure, via Business Insider", at(48));
  }
  function streetMap(ctx) { ctx.fillStyle = '#e8f1e4'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = '#fff'; ctx.lineWidth = 26; for (let x = 100; x < W; x += 260) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 120; y < H; y += 220) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.fillStyle = '#cfe5c4'; for (let x = 130; x < W; x += 260) for (let y = 145; y < H; y += 220) ctx.fillRect(x, y, 200, 170); }
  function g9(ctx, lt, dur, t) { // Uber Eats: "Your location is used to help us calculate fees and savings."
    const T0 = 54.74, at = s => lt - (s - T0);
    streetMap(ctx);
    const pulse = (t * 1.2) % 1; ctx.save(); ctx.strokeStyle = `rgba(59,125,216,${1 - pulse})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(360, 460, 30 + pulse * 120, 0, 7); ctx.stroke(); ctx.restore(); sh(ctx, c => c.arc(360, 460, 22, 0, 7), P.blue, 5);
    logo(ctx, 'ubereats', 1080, 150, 110, at(54.88), { pad: 6 });
    quoteCard(ctx, 820, 420, 620, ['"Your location is used to', 'help us calculate fees', 'and savings."'], at(56.19), { red: [2] });
    K.source(ctx, "Uber Eats' disclosure, via Business Insider", at(55));
  }
  function scooter(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const wx of [-50, 50]) sh(ctx, c => c.arc(wx, 0, 20, 0, 7), INK, 0); sh(ctx, c => { c.moveTo(-60, -20); c.lineTo(40, -20); c.lineTo(60, -70); }, null, 8, '#06c167'); sh(ctx, c => c.rect(-70, -70, 50, 44), '#06c167', 4); B.head(ctx, 20, -110, 26, Object.assign(Pr.extra(4), { face: { mouth: 'smile' } })); ctx.restore(); }
  function g10(ctx, lt, dur, t) { // so it might be pretty ordinary stuff, like how far away you live
    const T0 = 59.64, at = s => lt - (s - T0);
    streetMap(ctx);
    K.house(ctx, 230, 520, .6); sh(ctx, c => c.rect(980, 260, 180, 140), '#fff', 5); sh(ctx, c => c.rect(970, 240, 200, 30), P.red, 5); txt(ctx, 'RESTAURANT', 1070, 330, PRINT(22));
    const k = clamp(at(61.46) / 1.2); ctx.save(); ctx.setLineDash([16, 12]); Tn.line(ctx, [[300, 470], [lerp(300, 970, k), lerp(470, 330, k)]], 6, P.red); ctx.restore();
    scooter(ctx, lerp(980, 330, clamp(lt / dur)), lerp(410, 520, clamp(lt / dur)), .8);
    if (at(61.61) > 0) popAt(ctx, 640, 150, at(61.61), () => { K.card(ctx, 420, 110, 440, 80, P.yellow, 16); txt(ctx, 'how far away you live', 640, 150, HAND(700, 40)); });
    if (at(60.32) > 0) txt(ctx, 'pretty ordinary stuff?', 640, 660, HAND(700, 40), INK, 'center', clamp(at(60.32) / .3));
  }
  function g11(ctx, lt, dur, t) { // here's the catch: the law makes them say it — not explain how much it changed your price
    const T0 = 63.13, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 330, 700, 1.1, t, [[T0, 'pointUp'], [64.7, 'present'], [66.9, 'shrug']], { mouth: 'flat', brows: at(66.87) > 0 ? 'skeptic' : 'up', look: [.6, 0] });
    popAt(ctx, 860, 100, at(63.43), () => { K.card(ctx, 700, 60, 320, 80, P.red, 16); txt(ctx, "here's the catch", 860, 100, HAND(700, 40), '#fff'); });
    popAt(ctx, 860, 270, at(65.44), () => { K.card(ctx, 640, 210, 440, 120, '#fff', 18); txt(ctx, 'they say they do it', 860, 270, HAND(700, 38)); K.check(ctx, 1040, 266, 40, clamp(at(65.44) / .4)); });
    popAt(ctx, 860, 460, at(67.49), () => { K.card(ctx, 640, 380, 440, 160, '#fff', 18); txt(ctx, 'how much it changed', 860, 425, HAND(700, 38)); txt(ctx, 'your price?', 860, 475, HAND(700, 38)); K.cross(ctx, 1040, 450, 50, clamp(at(68.31) / .4)); });
    if (at(68.31) > 0) txt(ctx, '?', 1150, 600, HAND(700, 120), P.blue, 'center', clamp(at(68.31) / .3));
  }
  function plane(ctx, x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
    sh(ctx, c => c.ellipse(0, 0, 200, 40, 0, 0, 7), '#fff', 5); sh(ctx, c => { c.moveTo(-40, 0); c.lineTo(40, 0); c.lineTo(-20, 120); c.lineTo(-70, 120); c.closePath(); }, '#e9edf1', 5); sh(ctx, c => { c.moveTo(-150, -10); c.lineTo(-200, -90); c.lineTo(-170, -90); c.lineTo(-120, -20); c.closePath(); }, o.tail || '#c8102e', 5);
    for (let i = 0; i < 6; i++) sh(ctx, c => c.arc(60 - i * 34, -8, 7, 0, 7), '#9ad1ff', 2.5); sh(ctx, c => c.ellipse(170, -6, 22, 14, 0, 0, 7), '#9ad1ff', 3); ctx.restore(); }
  function g12(ctx, lt, dur, t) { // and it's not just food apps — airlines
    const T0 = 69.69, at = s => lt - (s - T0), k = clamp(lt / 1.2);
    K.bg.sky(ctx);
    [['doordash', 300], ['ubereats', 560]].forEach(([key, x], i) => logo(ctx, key, x - k * 900, 330, key === 'ubereats' ? 110 : 180, 1, { pad: 8 }));
    plane(ctx, lerp(1500, 760, out(clamp(at(70.33) / 1.0))), 360, .9);
    if (at(71.22) > 0) popAt(ctx, 760, 140, at(71.22), () => { K.card(ctx, 620, 100, 280, 80, P.yellow, 16); txt(ctx, 'AIRLINES', 760, 140, HAND(700, 48)); });
  }
  function g13(ctx, lt, dur, t) { // July 2025: Fetcherr set prices on ~3% of Delta's domestic network; goal 20% by the end of the year
    const T0 = 71.22, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eaf3ff');
    logo(ctx, 'delta', 230, 80, 300, at(74.29), { pad: 12 }); logo(ctx, 'fetcherr', 230, 300, 120, at(76.96), { pad: 6 });
    if (at(76.96) > 0) txt(ctx, 'AI pricing company', 230, 400, PRINT(24), INK, 'center', clamp(at(76.96) / .3));
    popAt(ctx, 230, 520, at(72.72), () => { K.card(ctx, 110, 480, 240, 76, P.yellow, 16); txt(ctx, 'July 2025', 230, 519, HAND(700, 42)); });
    // the domestic network as 100 route dots: 3 lit, then a dashed goal to 20
    txt(ctx, 'Delta domestic network', 820, 110, HAND(700, 40));
    for (let i = 0; i < 100; i++) { const x = 560 + (i % 20) * 27, y = 170 + Math.floor(i / 20) * 70; const lit = at(79.06) > 0 && i < 3, goal = at(82.09) > 0 && i < 20;
      sh(ctx, c => c.arc(x, y, 10, 0, 7), lit ? P.red : '#fff', 3, goal && !lit ? P.purple : INK); if (goal && !lit) { ctx.save(); ctx.setLineDash([4, 4]); sh(ctx, c => c.arc(x, y, 15, 0, 7), null, 2.5, P.purple); ctx.restore(); } }
    if (at(79.06) > 0) popAt(ctx, 720, 560, at(79.29), () => { K.card(ctx, 600, 520, 240, 80, P.red, 16); txt(ctx, '~3% now', 720, 560, HAND(700, 44), '#fff'); });
    if (at(82.09) > 0) popAt(ctx, 1020, 560, at(82.39), () => { K.card(ctx, 870, 520, 300, 80, P.purple, 16); txt(ctx, 'goal: 20%', 1020, 560, HAND(700, 44), '#fff'); });
    if (at(83.12) > 0) txt(ctx, 'by the end of the year', 1020, 630, PRINT(22), '#4a4f57', 'center', clamp(at(83.12) / .3));
    K.source(ctx, 'Source: AP (Jul 24, 2025)', at(74.6));
  }
  function g14(ctx, lt, dur, t) { // Glen Hauenstein: "We like what we see. We like it a lot."
    const T0 = 84.69, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#cfe6ff', '#f2f8ff');
    bean(ctx, 320, 700, 1.15, t, Object.assign({}, HAUEN, { armR: [2.3, .3], face: { mouth: at(87.63) > 0 ? 'grin' : 'smile', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Glen Hauenstein', 'Delta president', 320, 110, at(85.57));
    quoteCard(ctx, 860, 330, 520, ['"We like what we see.', 'We like it a lot."'], at(87.63), { size: 50, lh: 64, red: [1] });
    logo(ctx, 'delta', 860, 560, 260, at(86), { pad: 10 });
  }
  function letter(ctx, x, y, s, lt, title) { popAt(ctx, x, y, lt, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.04); sh(ctx, c => c.rect(-140, -180, 280, 360), '#fff', 5); txt(ctx, title, 0, -140, HAND(700, 30)); for (let i = 0; i < 7; i++) Tn.line(ctx, [[-110, -90 + i * 30], [110 - (i % 3) * 30, -90 + i * 30]], 3, '#c9ced6'); txt(ctx, '— 3 senators', 50, 150, PRINT(18), '#6a7380'); ctx.restore(); }); }
  function g15(ctx, lt, dur, t) { // three senators — Gallego, Blumenthal, Warner — wrote to Delta warning about fares rising to each customer's "pain point"
    const T0 = 90.84, at = s => lt - (s - T0), pain = at(96.39) > 0;
    K.bg.color(ctx, '#f6efe4');
    const S = [[150, GALLEGO, 'Ruben Gallego', 92.17], [330, BLUMENTHAL, 'Richard Blumenthal', 93.57], [510, WARNER, 'Mark Warner', 95.03]];
    S.forEach(([x, o, n, s], i) => { if (at(s) <= 0) return; popAt(ctx, x, 690, at(s), () => bean(ctx, x, 690, .75, t, Object.assign({}, o, { face: { mouth: 'frown', brows: 'worried', look: [.5, 0] } }))); K.nameCard(ctx, n, 'U.S. senator', x, 200 + (i % 2) * 90, at(s) + .05); });
    if (pain) { letter(ctx, 790, 340, .9, at(96.39), 'Dear Delta,'); }
    if (at(97.38) > 0) { const lvl = clamp(at(97.77) / 2.4); ctx.save(); ctx.translate(1110, 360); sh(ctx, c => c.roundRect(-30, -220, 60, 400, 30), '#fff', 5); sh(ctx, c => c.arc(0, 200, 48, 0, 7), P.red, 5); sh(ctx, c => c.rect(-16, 180 - 380 * lvl, 32, 380 * lvl), P.red, 0); txt(ctx, 'pain point', 0, -250, HAND(700, 32), P.red); ctx.restore(); }
    if (at(99.9) > 0) popAt(ctx, 790, 620, at(99.9), () => { K.card(ctx, 560, 580, 460, 80, '#fff', 16); txt(ctx, "each customer's 'pain point'", 790, 620, HAND(700, 34), P.red); });
    K.source(ctx, "Senators' letter, via AP (Jul 24, 2025)", at(96.5));
  }
  function g16(ctx, lt, dur, t) { // Delta pushed back hard: route demand and fuel prices; no fare product that "targets customers with individualized offers"
    const T0 = 101.46, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eaf3ff');
    logo(ctx, 'delta', 640, 80, 300, at(101.46), { pad: 12 });
    stampOK(ctx, 1070, 110, at(102.34), 'PUSHED BACK');
    popAt(ctx, 300, 330, at(105.06), () => { K.card(ctx, 140, 230, 320, 200, '#fff', 20); plane(ctx, 300, 300, .35); for (let i = 0; i < 3; i++) K.arrow(ctx, [210 + i * 60, 390], [230 + i * 60, 350], 1, P.blue, 4); txt(ctx, 'route demand', 300, 400, HAND(700, 34)); });
    popAt(ctx, 640, 330, at(105.98), () => { K.card(ctx, 480, 230, 320, 200, '#fff', 20); sh(ctx, c => c.roundRect(600, 260, 70, 110, 10), P.red, 4); sh(ctx, c => c.rect(612, 274, 46, 30), '#fff', 3); Tn.line(ctx, [[670, 300], [700, 320], [700, 360]], 5, INK); txt(ctx, 'fuel prices', 640, 400, HAND(700, 34)); });
    quoteCard(ctx, 980, 560, 560, ['no fare product that', '"targets customers with', 'individualized offers"'], at(107.69), { size: 34, lh: 44, red: [2] });
    K.source(ctx, "Delta's statement, via AP (Jul 24, 2025)", at(103.3));
  }
  function g17(ctx, lt, dur, t) { // Fetcherr said its technology doesn't use personally identifiable information
    const T0 = 112.69, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e8fbf6');
    logo(ctx, 'fetcherr', 300, 300, 220, at(112.69), { pad: 8 });
    popAt(ctx, 860, 330, at(114.59), () => { sh(ctx, c => c.roundRect(680, 220, 360, 220, 18), '#fff', 5); B.head(ctx, 760, 320, 50, { skin: 'white', hair: 'short', hairColor: '#999', face: { mouth: 'flat' } }); for (let i = 0; i < 4; i++) Tn.line(ctx, [[840, 280 + i * 30], [1000, 280 + i * 30]], 4, '#c9ced6'); txt(ctx, 'personal ID info', 860, 470, PRINT(26)); });
    if (at(114.08) > 0) K.cross(ctx, 860, 330, 300, clamp(at(114.4) / .4));
    stampOK(ctx, 300, 560, at(115.2), 'SAYS IT DOESN\'T USE IT');
    K.source(ctx, "Fetcherr's statement, via AP (Jul 24, 2025)", at(113));
  }
  function digitalTag(ctx, x, y, s, k, text, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-70, -36, 140, 72, 8), k > .5 ? '#1f2630' : '#fff', 4); if (k > .5) { ctx.fillStyle = o.glow || '#7dffb0'; ctx.font = PRINT(30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 2); } else txt(ctx, '$_.__', 0, 2, HAND(700, 32)); ctx.restore(); }
  function g18(ctx, lt, dur, t) { // Walmart: digital price tags in all its U.S. stores by the end of 2026 (CNBC)
    const T0 = 117.34, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff8ec');
    if (at(117.34) > 0) popAt(ctx, 640, 70, at(117.34), () => { K.card(ctx, 470, 30, 340, 80, P.yellow, 16); txt(ctx, 'GROCERY STORES', 640, 70, HAND(700, 40)); });
    logo(ctx, 'walmart', 640, 180, 300, at(119.01), { crop: WAL, h: 82, pad: 0, round: 12 });
    sh(ctx, c => c.rect(80, 290, 1120, 300), '#f1ece2', 5); for (let r = 0; r < 2; r++) Tn.line(ctx, [[80, 430 + r * 140], [1200, 430 + r * 140]], 6, '#b9ae9a');
    for (let i = 0; i < 12; i++) { const x = 150 + (i % 6) * 196, y = 460 + Math.floor(i / 6) * 140, k = clamp((at(120.08) - i * .12) / .3); for (let j = 0; j < 3; j++) sh(ctx, c => c.roundRect(x - 50 + j * 36, y - 110, 30, 80, 5), [P.red, P.blue, P.green][(i + j) % 3], 3); digitalTag(ctx, x, y + 2, .7, k, '$', {}); }
    if (at(121.19) > 0) popAt(ctx, 760, 632, at(121.19), () => { K.card(ctx, 450, 600, 620, 64, '#fff', 16); txt(ctx, 'all U.S. stores by the end of 2026', 760, 632, HAND(700, 34)); });
    K.source(ctx, 'Source: CNBC, via Modern Retail (Jun 9, 2026)', at(124.6));
  }
  function g19(ctx, lt, dur, t) { // digital tags can change prices instantly — which made a lot of people nervous
    const T0 = 126.68, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    const fl = at(127.56) > 0 ? Math.floor(t * 9) : 0, digits = ['$•.••', '$••.•', '$•.•', '$•••'][fl % 4];
    digitalTag(ctx, 640, 260, 2.6, 1, digits, { glow: fl % 2 ? '#ffd166' : '#7dffb0' });
    if (at(128.4) > 0) txt(ctx, 'instantly', 640, 400, HAND(700, 48), P.red, 'center', clamp(at(128.4) / .3));
    for (let i = 0; i < 4; i++) { const x = 200 + i * 290; bean(ctx, x, 720, .6, t, Object.assign(Pr.extra(i + 2), { face: { mouth: at(130.18) > 0 ? 'frown' : 'flat', brows: at(129.8) > 0 ? 'worried' : 'calm', look: [(640 - x) / 600, -.5], tears: at(130.53) > 0 && i % 2 ? t * .7 : 0 } })); if (at(130.53) > 0) { ctx.fillStyle = '#7fb6d9'; ctx.beginPath(); ctx.ellipse(x + 36, 530 + ((t * 60 + i * 20) % 40), 6, 10, 0, 0, 7); ctx.fill(); } }
    if (at(130.53) > 0) popAt(ctx, 640, 462, at(130.53), () => { K.card(ctx, 520, 430, 240, 64, P.yellow, 14); txt(ctx, 'nervous', 640, 462, HAND(700, 40)); });
  }
  function g20(ctx, lt, dur, t) { // Kieran Shanahan: surge pricing is "not our approach"; labels "absolutely not collecting people's personal information"
    const T0 = 131.81, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#cfe0ff', '#f2f6ff');
    bean(ctx, 300, 700, 1.15, t, Object.assign({}, SHANAHAN, { armR: [1.9, .5], face: { mouth: 'smile', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Kieran Shanahan', 'Walmart U.S. COO', 300, 110, at(134.52));
    logo(ctx, 'walmart', 900, 90, 240, at(131.9), { crop: WAL, h: 66, pad: 0, round: 10 });
    quoteCard(ctx, 860, 290, 560, ['surge pricing is', '"not our approach"'], at(136.03), { size: 44, lh: 56, red: [1] });
    quoteCard(ctx, 860, 520, 600, ['labels are "absolutely not', "collecting people's", 'personal information"'], at(139.51), { size: 36, lh: 46, red: [0] });
    K.source(ctx, 'Source: Modern Retail (Jun 9, 2026)', at(136));
  }
  function g21(ctx, lt, dur, t) { // 2024: Warren and Casey went after Kroger over a Microsoft partnership — cameras in aisles, deals by age and gender
    const T0 = 143.28, at = s => lt - (s - T0), aisle = at(150.72) > 0;
    K.bg.color(ctx, '#f6efe4');
    if (!aisle) {
      popAt(ctx, 640, 70, at(143.54), () => { K.card(ctx, 560, 34, 160, 72, P.yellow, 14); txt(ctx, '2024', 640, 70, HAND(700, 46)); });
      bean(ctx, 200, 700, .9, t, Object.assign({}, WARREN, { armR: [2.0, .4], face: { mouth: 'frown', brows: 'angry', look: [.6, 0] } })); K.nameCard(ctx, 'Elizabeth Warren', 'U.S. senator', 200, 220, at(145.74));
      bean(ctx, 430, 700, .9, t, Object.assign({}, CASEY, { face: { mouth: 'frown', brows: 'angry', look: [.6, 0] } })); K.nameCard(ctx, 'Bob Casey', 'U.S. senator (then)', 430, 330, at(146.81));
      logo(ctx, 'kroger', 900, 280, 300, at(148.36), { crop: KRO, h: 84, pad: 0, round: 12 });
      if (at(149.66) > 0) { txt(ctx, '+', 900, 380, HAND(700, 70), INK); logo(ctx, 'microsoft', 900, 470, 260, at(149.66), { pad: 10 }); }
      return;
    }
    // the aisle with a camera and personalized-deal screens
    sh(ctx, c => c.rect(60, 180, 1160, 420), '#f1ece2', 5); for (let r = 0; r < 3; r++) Tn.line(ctx, [[60, 300 + r * 110], [1220, 300 + r * 110]], 5, '#b9ae9a');
    Tn.line(ctx, [[640, 0], [640, 70]], 6, INK); sh(ctx, c => c.roundRect(590, 70, 100, 50, 10), '#4a4e56', 4); sh(ctx, c => c.arc(640, 122, 14, 0, 7), '#9ad1ff', 3);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = P.yellow; ctx.beginPath(); ctx.moveTo(620, 130); ctx.lineTo(660, 130); ctx.lineTo(900, 690); ctx.lineTo(380, 690); ctx.closePath(); ctx.fill(); ctx.restore();
    bean(ctx, 640, 700, .8, t, Object.assign(Pr.extra(3), { face: { mouth: 'o', brows: 'up', look: [0, -.8] } }));
    if (at(152.24) > 0) { popAt(ctx, 300, 380, at(152.24), () => { K.card(ctx, 180, 320, 240, 120, '#1f2630', 12, 0); txt(ctx, 'DEAL FOR YOU', 300, 360, PRINT(22), '#7dffb0'); txt(ctx, 'personalized', 300, 400, PRINT(20), '#fff'); }); }
    if (at(153.98) > 0) popAt(ctx, 1000, 330, at(153.98), () => { K.card(ctx, 880, 270, 240, 120, '#fff', 14); txt(ctx, 'age?', 1000, 310, HAND(700, 38)); txt(ctx, 'gender?', 1000, 355, HAND(700, 38), P.red); });
    popAt(ctx, 640, 640, at(150.72), () => { K.card(ctx, 470, 610, 340, 60, '#fff', 14); txt(ctx, 'cameras in aisles', 640, 640, HAND(700, 34)); });
    K.source(ctx, 'Source: Modern Retail (Jun 9, 2026) · Kroger logo from your photo', at(151));
  }
  function g22(ctx, lt, dur, t) { // Kroger told the AP its labels aren't linked to facial recognition and don't surge prices on demand
    const T0 = 155.5, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef4ff');
    logo(ctx, 'kroger', 640, 90, 300, at(155.5), { crop: KRO, h: 84, pad: 0, round: 12 });
    digitalTag(ctx, 640, 340, 2.0, 1, '$•.••');
    popAt(ctx, 260, 380, at(158.67), () => { K.card(ctx, 120, 280, 280, 200, '#fff', 18); sh(ctx, c => c.roundRect(200, 310, 120, 100, 20), null, 5); B.head(ctx, 260, 360, 30, { skin: 'white', hair: 'none', face: { mouth: 'flat' } }); txt(ctx, 'face recognition', 260, 450, PRINT(22)); });
    if (at(158.9) > 0) K.cross(ctx, 260, 360, 110, clamp(at(158.9) / .4));
    popAt(ctx, 1020, 380, at(160.25), () => { K.card(ctx, 880, 280, 280, 200, '#fff', 18); K.arrow(ctx, [960, 420], [1080, 310], 1, P.red, 8); txt(ctx, 'surge on demand', 1020, 450, PRINT(22)); });
    if (at(160.6) > 0) K.cross(ctx, 1020, 360, 110, clamp(at(160.6) / .4));
    stampOK(ctx, 640, 600, at(157.02), 'KROGER: NOT US');
    K.source(ctx, "Kroger's statement, via AP", at(156));
  }
  function g23(ctx, lt, dur, t) { // every company says the same thing — we're not doing it; maybe they're not; but the tools all exist
    const T0 = 162.22, at = s => lt - (s - T0), tools = at(168.3) > 0;
    K.bg.studio(ctx, '#e6dcff', '#f7f3ff');
    host(ctx, 230, 700, 1.0, t, [[T0, 'presentBoth'], [165.5, 'shrug'], [166.8, 'pointSide']], { mouth: 'flat', brows: tools ? 'skeptic' : 'up', look: [.6, 0] });
    if (!tools) { [['delta', 520, 200, 220, null], ['fetcherr', 900, 200, 90, null], ['walmart', 520, 470, 220, WAL], ['kroger', 900, 470, 220, KRO]].forEach(([k, x, y, w, cr], i) => { logo(ctx, k, x, y, w, at(162.58 + i * .2), cr ? { crop: cr, h: w * cr[3] / cr[2], pad: 0, round: 10 } : { pad: 8 }); if (at(164.28 + i * .12) > 0) K.bubble(ctx, "we're not", x + 120, y - 80, 180, [x + 60, y - 30], at(164.28 + i * .12), { size: 28 }); }); return; }
    // the open toolbox
    sh(ctx, c => c.roundRect(560, 430, 560, 200, 18), P.red, 6); sh(ctx, c => c.roundRect(760, 390, 160, 50, 14), null, 10, INK);
    const items = [[620, 'algorithm'], [760, 'digital tags'], [900, 'cameras'], [1040, 'your data']];
    items.forEach(([x, l], i) => { const k = clamp((at(168.41) - i * .15) / .4), y = lerp(500, 330, out(k)); if (k <= 0) return; popAt(ctx, x, y, at(168.41) - i * .15, () => { K.card(ctx, x - 64, y - 40, 128, 80, '#fff', 12); txt(ctx, l, x, y, PRINT(20)); }); });
    K.slam(ctx, 'THE TOOLS ALL EXIST', 840, 150, at(168.86), 56, P.red);
  }
  const TILE_BG = ['#ffd7a8', '#cfe9ff', '#d8f2c9', '#f8d3e1', '#e6dcff', '#fff0b3', '#c9f0ea', '#ffe0cc'];
  function g24(ctx, lt, dur, t) { // one of the clearest looks came from volunteers on a video call, checking the price of eggs
    const T0 = 170.04, at = s => lt - (s - T0);
    K.bg.color(ctx, '#1b1d23');
    const z = lerp(1.25, 1, inout(clamp(lt / 3)));
    ctx.save(); camZoom(ctx, z);
    for (let i = 0; i < 40; i++) { const tw = 141, th = 100, x = 48 + (i % 8) * 149, y = 100 + Math.floor(i / 8) * 108; sh(ctx, c => c.roundRect(x, y, tw, th, 8), TILE_BG[(i * 3) % 8], 2.5, '#15171c');
      B.head(ctx, x + tw / 2, y + th * .5 + Math.sin(t * 1.7 + i) * 1.5, 30, Object.assign(Pr.extra(i), { face: { mouth: at(174.77) > 0 ? 'o' : 'flat', look: [0, .8] } }));
      if (at(174.77) > 0) { const k = clamp((at(174.77) - (i % 7) * .05) / .3); if (k > 0) { ctx.save(); ctx.translate(x + tw - 30, y + th - 4); ctx.scale(.18 * k, .18 * k); Pr.eggs(ctx, 0, 0, 1); ctx.restore(); } } }
    ctx.restore();
    if (at(170.46) > 0) popAt(ctx, 640, 50, at(170.46), () => { K.card(ctx, 380, 16, 520, 68, P.yellow, 16); txt(ctx, 'one of the clearest looks', 640, 50, HAND(700, 38)); });
  }

  // ================= CHAPTER 5 =================
  function stormCloud(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => { c.arc(-80, 0, 60, Math.PI * .5, Math.PI * 1.5); c.arc(0, -40, 80, Math.PI, 0); c.arc(90, 0, 60, Math.PI * 1.5, Math.PI * .5); c.closePath(); }, '#7b8496', 5);
    for (let i = 0; i < 6; i++) { const k = (t * 1.4 + i * .17) % 1; Tn.line(ctx, [[-90 + i * 36, 70 + k * 120], [-96 + i * 36, 92 + k * 120]], 4, '#7fb6d9'); }
    if (Math.sin(t * 3) > .93) sh(ctx, c => { c.moveTo(0, 60); c.lineTo(-24, 130); c.lineTo(4, 130); c.lineTo(-20, 210); c.lineTo(40, 110); c.lineTo(12, 110); c.lineTo(30, 60); c.closePath(); }, P.yellow, 4); ctx.restore(); }
  function decCal(ctx, x, y, s, marks, lt) { // a December 2025 month grid (Dec 1, 2025 is a Monday); marks = [[day, colour, t]]
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-260, -230, 520, 460, 18), '#fff', 5); sh(ctx, c => c.roundRect(-260, -230, 520, 70, [18, 18, 0, 0]), P.red, 5); txt(ctx, 'DECEMBER 2025', 0, -195, PRINT(32), '#fff');
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => txt(ctx, d, -210 + i * 70, -135, PRINT(20), '#6a7380'));
    for (let d = 1; d <= 31; d++) { const i = d - 1, cx = -210 + (i % 7) * 70, cy = -90 + Math.floor(i / 7) * 62; txt(ctx, String(d), cx, cy, HAND(700, 28), INK);
      for (const [md, col, mt] of marks) if (md === d && lt >= mt) K.scribbleCircle(ctx, cx, cy, 28, 24, clamp((lt - mt) / .5), col, 5); }
    ctx.restore(); }
  function h1(ctx, lt, dur, t) { // let's go back to Instacart — December 2025 was a brutal month for them
    const T0 = 176.88, at = s => lt - (s - T0);
    K.bg.color(ctx, '#dfe4ec');
    decCal(ctx, 760, 420, .9, [], lt);
    stormCloud(ctx, 760, 110, .8, t);
    logo(ctx, 'instacart', 250, 380, 300, at(177.5), { crop: INSTA, pad: 0, card: false, round: 14 });
    if (at(180.02) > 0) popAt(ctx, 250, 540, at(180.02), () => { K.card(ctx, 110, 500, 280, 80, P.red, 16); txt(ctx, 'a brutal month', 250, 540, HAND(700, 40), '#fff'); });
    chapterTab(ctx, 5, 'The week Instacart folded', lt);
  }
  function h2(ctx, lt, dur, t) { // December 9: the Consumer Reports and Groundwork investigation comes out
    const T0 = 181.87, at = s => lt - (s - T0);
    K.bg.color(ctx, '#dfe4ec');
    decCal(ctx, 330, 400, .8, [[9, P.red, 182.3 - T0]], lt);
    const dk = clamp(at(183.08) / .45), y = lerp(-300, 380, out(dk));
    if (at(183.08) > 0) { ctx.save(); ctx.translate(920, y); ctx.rotate(.04); sh(ctx, c => c.rect(-200 + 10, -200 + 12, 400, 400), 'rgba(0,0,0,.18)', 0); if (IMG.report) ctx.drawImage(IMG.report, -200, -200, 400, 400); sh(ctx, c => c.rect(-200, -200, 400, 400), null, 5); ctx.restore(); }
    if (at(185.37) > 0) K.stamp(ctx, 'PUBLISHED', 920, 620, at(185.37), { color: P.blue, size: 46, rot: -.06 });
  }
  function h3(ctx, lt, dur, t) { // Dec 17: Reuters reported the FTC — the agency that looked like it had given up — sent a civil investigative demand
    const T0 = 186.62, at = s => lt - (s - T0), part2 = at(195.06) > 0;
    K.bg.color(ctx, '#dfe4ec');
    if (!part2) {
      decCal(ctx, 330, 400, .8, [[9, '#9aa3ad', -9], [17, P.red, 187.18 - T0]], lt);
      // the "basically dead" monitor blipping back to life
      sh(ctx, c => c.roundRect(700, 180, 480, 300, 24), '#1f2630', 6);
      ctx.save(); ctx.beginPath(); ctx.rect(716, 196, 448, 268); ctx.clip(); ctx.beginPath(); ctx.strokeStyle = '#4ef08a'; ctx.lineWidth = 5;
      for (let x = 0; x <= 448; x += 4) { const tt = lt * 160 - x, beat = Math.max(0, Math.sin(tt / 20)) ** 10 * 110; x ? ctx.lineTo(716 + x, 330 - beat) : ctx.moveTo(716, 330 - beat); } ctx.stroke(); ctx.restore();
      if (IMG.ftc) ctx.drawImage(IMG.ftc, 900, 410, 80, 80);
      if (at(190.55) > 0) popAt(ctx, 940, 580, at(190.55), () => { K.card(ctx, 720, 540, 440, 80, '#fff', 16); txt(ctx, '"given up"? not quite', 940, 580, HAND(700, 38)); });
      K.source(ctx, 'Source: Reuters, via TechCrunch (Dec 17, 2025)', at(188.3));
      return;
    }
    // the demand gets delivered + a plain-English definition
    sh(ctx, c => c.rect(60, 140, 360, 460), '#f7f3ea', 5); sh(ctx, c => c.rect(150, 300, 170, 300), '#8a5a36', 5);
    if (IMG.instacart) { K.card(ctx, 110, 170, 260, 100, '#fff', 12); ctx.save(); ctx.beginPath(); ctx.roundRect(120, 180, 240, 80, 10); ctx.clip(); ctx.drawImage(IMG.instacart, ...INSTA, 120, 180, 240, 124); ctx.restore(); }
    const ek = clamp(at(195.3) / .7); K.envelope(ctx, lerp(900, 330, out(ek)), lerp(200, 420, out(ek)), 2.0, 0, { stampC: P.blue });
    if (IMG.ftc) ctx.drawImage(IMG.ftc, lerp(900, 330, out(ek)) - 20, lerp(200, 420, out(ek)) - 10, 40, 40);
    popAt(ctx, 850, 280, at(195.28), () => { K.card(ctx, 600, 210, 500, 140, '#fff', 18); txt(ctx, 'civil investigative', 850, 255, HAND(700, 40)); txt(ctx, 'demand', 850, 305, HAND(700, 40), P.blue); });
    popAt(ctx, 850, 470, at(197.83), () => { K.card(ctx, 600, 400, 500, 140, P.yellow, 18); txt(ctx, '= a legal order to', 850, 445, HAND(700, 36)); txt(ctx, 'hand over information', 850, 490, HAND(700, 36)); });
    if (at(201.4) > 0) popAt(ctx, 850, 600, at(201.4), () => { K.card(ctx, 620, 570, 460, 60, '#fff', 14); txt(ctx, 'about its pricing · not a finding', 850, 600, PRINT(24)); });
  }
  function h4(ctx, lt, dur, t) { // separately: $60M in refunds to settle an FTC lawsuit — "free delivery", service fees, refunds hard to get; Instacart flatly denies
    const T0 = 202.85, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f6f0e6');
    sh(ctx, c => c.rect(0, 0, W, 64), '#7a8088', 0); txt(ctx, 'A SEPARATE CASE', 640, 33, PRINT(30), '#fff', 'center', clamp(at(204.44) / .3));
    if (at(206.68) > 0) popAt(ctx, 230, 210, at(206.68), () => { K.card(ctx, 70, 110, 320, 200, '#fff', 20); txt(ctx, '$60M', 230, 180, HAND(700, 80), P.green); txt(ctx, 'in refunds', 230, 240, PRINT(24)); txt(ctx, 'agreed (approval pending)', 230, 280, PRINT(18), '#6a7380'); });
    txt(ctx, 'The FTC alleged:', 760, 120, HAND(700, 40), INK, 'center', clamp(at(213.25) / .3));
    popAt(ctx, 560, 300, at(214.98), () => { ctx.save(); ctx.translate(560, 300); ctx.rotate(-.04); sh(ctx, c => c.rect(-140, -70, 280, 140), P.green, 5); txt(ctx, 'FREE', 0, -22, HAND(700, 50), '#fff'); txt(ctx, 'DELIVERY*', 0, 30, HAND(700, 40), '#fff'); ctx.restore(); });
    if (at(216.71) > 0) Pr.tag(ctx, 830, 250, 1.1, '+ service fee', at(216.71), { color: '#ffd6d0', size: 30 });
    if (at(217.81) > 0) popAt(ctx, 1080, 300, at(217.81), () => { K.card(ctx, 960, 200, 240, 200, '#fff', 16); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.strokeRect(1000 + i * 16, 230 + i * 14, 160 - i * 32, 130 - i * 28); } ctx.restore(); txt(ctx, 'refunds: a maze', 1080, 380, PRINT(22)); });
    if (at(220.06) > 0) { logo(ctx, 'instacart', 420, 560, 220, at(220.06), { crop: INSTA, pad: 0, card: false, round: 12 }); K.stamp(ctx, 'FLATLY DENIES', 800, 570, at(221.06), { color: P.blue, size: 54, rot: -.06 }); }
    K.source(ctx, 'Source: KTVU/FOX (Dec 20, 2025); FTC case page (checked Oct 9, 2026)', at(207));
  }
  function plug(ctx, x, y, out2, label) { sh(ctx, c => c.roundRect(x - 70, y - 90, 140, 180, 16), '#f4f1ea', 5); for (const dx of [-22, 22]) sh(ctx, c => c.roundRect(x + dx - 6, y - 20, 12, 40, 4), INK, 0);
    const px = x + 120 + out2 * 260; Tn.line(ctx, [[px + 70, y], [px + 300, y + 60], [W + 40, y + 40]], 12, INK); sh(ctx, c => c.roundRect(px, y - 46, 110, 92, 14), '#3a3e46', 5); for (const dy of [-22, 22]) sh(ctx, c => c.rect(px - 40 + 40 * clamp(1 - out2 * 3), y + dy - 6, 40, 12), '#c9ced6', 3); txt(ctx, label, px + 55, y - 76, PRINT(22)); }
  function h5(ctx, lt, dur, t) { // Dec 22: Instacart pulled the plug — ended the Eversight price tests; retailers lose access to the tool
    const T0 = 223.64, at = s => lt - (s - T0), pulled = clamp(at(226.92) / .4);
    K.bg.color(ctx, pulled > 0 ? '#eef0f4' : '#fff4d6');
    decCal(ctx, 230, 320, .55, [[22, P.green, 224.33 - T0]], lt);
    plug(ctx, 560, 300, out(pulled), 'Eversight price tests');
    if (pulled > .2) for (let i = 0; i < 5; i++) { const a = -1 + i * .5; Tn.line(ctx, [[560 + Math.cos(a) * 110, 300 + Math.sin(a) * 110], [560 + Math.cos(a) * 140, 300 + Math.sin(a) * 140]], 4, P.yellow); }
    if (pulled >= 1) K.stamp(ctx, 'ENDED', 560, 470, at(229.24), { color: P.red, size: 56, rot: -.06 });
    if (at(231.65) > 0) popAt(ctx, 1020, 560, at(231.65), () => { K.card(ctx, 860, 470, 320, 170, '#fff', 18); if (IMG.eversight) ctx.drawImage(IMG.eversight, 40, 70, 520, 175, 900, 490, 240, 81); sh(ctx, c => c.roundRect(990, 590, 60, 46, 8), P.yellow, 4); sh(ctx, c => c.arc(1020, 590, 20, Math.PI, 0), null, 6); txt(ctx, 'no access for retailers', 1020, 662, PRINT(20)); });
    K.source(ctx, 'Source: Instacart / Consumer Reports / SiliconANGLE (Dec 22, 2025)', at(225));
  }
  function h6(ctx, lt, dur, t) { // the blog post: "That's not okay – especially for a company built on trust…"; rejects "price surveillance"; no personal data
    const T0 = 234.83, at = s => lt - (s - T0), p2 = at(242.9) > 0;
    K.bg.color(ctx, '#e9f6ef');
    logo(ctx, 'instacart', 200, 80, 220, at(234.9), { crop: INSTA, pad: 0, card: false, round: 12 });
    txt(ctx, 'Instacart blog post, Dec 22, 2025', 560, 82, PRINT(24), '#4a5560', 'left', clamp(at(235.3) / .3));
    if (!p2) {
      popAt(ctx, 640, 360, at(236.26), () => { K.card(ctx, 170, 180, 940, 360, '#fff', 24);
        txt(ctx, '"We understand that the tests we ran with a small number', 640, 230, PRINT(24), '#6a7380'); txt(ctx, 'of retail partners … That\'s not okay –', 640, 264, PRINT(24), '#6a7380');
        txt(ctx, '"That\'s not okay', 640, 340, HAND(700, 60), P.red); txt(ctx, '– especially for a company built on', 640, 410, HAND(700, 42)); txt(ctx, 'trust, transparency, and affordability."', 640, 466, HAND(700, 42)); });
      if (at(239.83) > 0) { ctx.save(); ctx.globalAlpha = .3; ctx.fillStyle = P.yellow; ctx.fillRect(240, 440, 800 * out(clamp(at(239.83) / 1.4)), 52); ctx.restore(); }
      K.source(ctx, 'Quoted with its lead-in · via SiliconANGLE (Dec 22, 2025)', at(237));
      return;
    }
    popAt(ctx, 360, 350, at(243.3), () => { K.card(ctx, 120, 220, 480, 260, '#fff', 22); txt(ctx, 'rejected the label', 360, 280, PRINT(28), '#6a7380'); txt(ctx, '"price surveillance"', 360, 350, HAND(700, 46)); K.strike(ctx, 170, 350, 550, 350, clamp(at(244.97) / .4), P.red, 7); });
    popAt(ctx, 920, 350, at(246.31), () => { K.card(ctx, 680, 220, 480, 260, '#fff', 22); txt(ctx, 'repeated:', 920, 280, PRINT(28), '#6a7380'); txt(ctx, 'tests never used', 920, 345, HAND(700, 44)); txt(ctx, 'personal data', 920, 400, HAND(700, 44), P.green); });
  }
  function h7(ctx, lt, dur, t) { // Phil Radford welcomed the decision to "end its secret, AI-driven pricing experiments on unsuspecting shoppers"
    const T0 = 249.65, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#d7f0d0', '#f3fbf0');
    bean(ctx, 300, 700, 1.15, t, Object.assign({}, RADFORD, { armR: [2.3, .3], face: { mouth: 'grin', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Phil Radford', 'Consumer Reports CEO', 300, 110, at(251.32));
    logo(ctx, 'cr', 900, 90, 280, at(249.7), { crop: CR_CROP, h: 68, pad: 12 });
    quoteCard(ctx, 860, 380, 640, ['welcomed the decision to "end', 'its secret, AI-driven pricing', 'experiments on unsuspecting', 'shoppers"'], at(252.33), { size: 38, lh: 50, red: [1] });
  }
  function h8(ctx, lt, dur, t) { // so that's a win, right? story over?
    const T0 = 258.62, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffe08a', '#fff6d6');
    for (let i = 0; i < 40; i++) { const x = (i * 97) % W, y = ((t * 120 + i * 53) % (H + 40)) - 20; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 3 + i); ctx.fillStyle = [P.red, P.blue, P.green, P.purple][i % 4]; ctx.fillRect(-7, -4, 14, 8); ctx.restore(); }
    bean(ctx, 420, 700, 1.0, t, Object.assign({}, Pr.YOU, { armL: [2.7, 0], armR: [2.7, 0], face: { mouth: 'grin', brows: 'up', look: [.3, -.3] } }));
    bean(ctx, 860, 700, 1.0, t, Object.assign({}, Pr.NEIGHBOUR, { armL: [2.7, 0], armR: [2.7, 0], face: { mouth: 'grin', brows: 'up', look: [-.3, -.3] } }));
    popAt(ctx, 640, 130, at(259.0), () => { K.card(ctx, 470, 90, 340, 80, '#fff', 16); txt(ctx, 'a win, right?', 640, 130, HAND(700, 44)); });
    if (at(260.07) > 0) popAt(ctx, 640, 260, at(260.07), () => { K.card(ctx, 520, 220, 240, 80, P.yellow, 16); txt(ctx, 'THE END?', 640, 260, HAND(700, 46)); });
  }
  function usOutline(ctx, glow) { const US = [[-124.7, 48.4], [-124.4, 42.8], [-122.4, 37.8], [-117.1, 32.5], [-111, 31.3], [-106.5, 31.8], [-103, 29], [-97.4, 25.9], [-95, 29.3], [-89.4, 29], [-85.3, 29.7], [-82.8, 27.9], [-80.4, 25.2], [-81.4, 30.5], [-76.5, 34.7], [-76, 37], [-74.1, 39.8], [-70, 41.7], [-70.2, 43.7], [-67, 44.8], [-69.2, 47.4], [-74.9, 45], [-79, 42.8], [-82.5, 41.7], [-84.5, 46.5], [-89.6, 48], [-95.2, 49], [-123, 49]];
    const pj = (lo, la) => [250 + (lo + 125) * 13.4, 150 + (50 - la) * 17]; sh(ctx, c => { US.forEach(([lo, la], i) => { const [x, y] = pj(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); }, '#bfe3a6', 5);
    [[-76.7, 39.0], [-72.7, 41.6], [-74.5, 40.1], [-75.5, 42.9]].forEach(([lo, la], i) => { const [x, y] = pj(lo, la), k = clamp(glow - i * .25); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k * (.6 + .4 * Math.sin(glow * 10 + i)); ctx.fillStyle = P.yellow; ctx.beginPath(); ctx.arc(x, y, 18, 0, 7); ctx.fill(); ctx.restore(); sh(ctx, c => c.arc(x, y, 8, 0, 7), P.red, 3); }); }
  function h9(ctx, lt, dur, t) { // not even close: stopping didn't make the technology go away — that's when the states started moving
    const T0 = 261.27, at = s => lt - (s - T0), map = at(266.14) > 0;
    if (!map) {
      K.bg.studio(ctx, '#cfd4de', '#eef0f4');
      host(ctx, 330, 700, 1.1, t, [[T0, 'crossed'], [262.6, 'pointSide']], { mouth: 'flat', brows: 'angry', look: [.6, 0] });
      K.slam(ctx, 'NOT EVEN CLOSE.', 820, 150, at(261.27), 64, P.red);
      sh(ctx, c => c.roundRect(620, 380, 420, 160, 18), P.red, 6); sh(ctx, c => c.roundRect(760, 340, 140, 50, 14), null, 10, INK); txt(ctx, 'THE TOOLS', 830, 440, HAND(700, 46), '#fff'); txt(ctx, 'still here', 830, 495, PRINT(26), '#fff');
      if (at(264.52) > 0) K.stamp(ctx, "DIDN'T GO AWAY", 830, 620, at(265.06), { color: INK, size: 40, rot: -.05 });
      return;
    }
    K.bg.color(ctx, '#cfe9ff'); usOutline(ctx, clamp(at(266.69) / 1.2));
    popAt(ctx, 640, 70, at(266.14), () => { K.card(ctx, 400, 30, 480, 80, P.yellow, 16); txt(ctx, 'the states start moving…', 640, 70, HAND(700, 40)); });
  }

  const SH = [[0, 4.27, g1], [4.27, 8.76, g2], [8.76, 18.38, g3], [18.38, 22.3, g4], [22.3, 32.77, g5], [32.77, 40.11, g6], [40.11, 44.72, g7], [44.72, 54.74, g8], [54.74, 59.64, g9], [59.64, 63.13, g10], [63.13, 69.69, g11], [69.69, 71.22, g12],
    [71.22, 84.69, g13], [84.69, 90.84, g14], [90.84, 101.46, g15], [101.46, 112.69, g16], [112.69, 117.34, g17], [117.34, 126.68, g18], [126.68, 131.81, g19], [131.81, 143.28, g20], [143.28, 155.5, g21], [155.5, 162.22, g22], [162.22, 170.04, g23], [170.04, 176.88, g24],
    [176.88, 181.87, h1], [181.87, 186.62, h2], [186.62, 202.85, h3], [202.85, 223.64, h4], [223.64, 234.83, h5], [234.83, 249.65, h6], [249.65, 258.62, h7], [258.62, 261.27, h8], [261.27, 268.2, h9]];
  const DUR = 268.2;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [.33, 2.13, 4.45, 5.67, 7.12, 8.88, 12.53, 14.32, 15.86, 22.3, 25.95, 28.23, 33.03, 37.11, 37.36, 37.61, 37.86, 38.11, 45.17, 47.72, 49.61, 50.54, 52.84, 56.19, 61.61, 63.43, 65.44, 67.49, 71.22, 72.72, 79.29, 82.39, 85.57, 87.63,
    92.17, 93.57, 95.03, 96.39, 99.9, 105.06, 105.98, 107.69, 114.59, 117.34, 121.19, 130.53, 134.52, 136.03, 139.51, 143.54, 145.74, 146.81, 148.36, 149.66, 152.24, 153.98, 158.67, 160.25, 162.58, 162.78, 162.98, 163.18, 164.28, 170.46,
    180.02, 190.55, 195.28, 197.83, 201.4, 206.68, 214.98, 217.81, 220.06, 231.65, 236.26, 243.3, 246.31, 251.32, 252.33, 259.0, 260.07, 266.14].map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[5.96, 'buzz'], [7.76, 'ding'], [18.38, 'thud'], [18.99, 'thud'], [19.63, 'thud'], [21.19, 'stamp'], [24.48, 'stamp'], [31.15, 'thud'], [31.3, 'stamp'], [41.18, 'pop'], [42.6, 'ding'], [51.92, 'cash'], [68.31, 'buzz'], [70.4, 'whoosh'], [79.06, 'ding'], [82.09, 'rise'],
    [97.77, 'rise'], [102.34, 'stamp'], [114.4, 'buzz'], [115.2, 'stamp'], [120.08, 'type'], [127.56, 'tick'], [127.86, 'tick'], [128.16, 'tick'], [128.46, 'tick'], [157.02, 'stamp'], [158.9, 'buzz'], [160.6, 'buzz'], [168.41, 'paper'], [168.86, 'thud'], [174.77, 'ding'],
    [182.3, 'tick'], [183.08, 'paper'], [185.37, 'stamp'], [187.18, 'tick'], [188.6, 'ding'], [195.3, 'mail'], [216.71, 'cash'], [221.06, 'stamp'], [224.33, 'tick'], [226.92, 'thud'], [229.24, 'stamp'], [233.13, 'click'], [244.97, 'buzz'], [258.8, 'ding'], [259.4, 'cash'],
    [261.27, 'scratch'], [261.4, 'thud'], [265.06, 'stamp'], [266.69, 'rise']].map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/pricing-3.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofi' }, { t: 63.13, mood: 'lofiDark' }, { t: 162.22, mood: 'lofiKeys' }, { t: 170.04, mood: 'lofi' }, { t: 176.88, mood: 'lofiDark' }, { t: 223.64, mood: 'lofiUp' }, { t: 261.27, mood: 'lofiDark', fade: 1 }],
    images: { instacart: 'assets/pricing/instacart.png', eversight: 'assets/pricing/eversight.png', ftc: 'assets/pricing/ftc-seal.png', cr: 'assets/pricing/consumer-reports.png', report: 'assets/pricing/same-cart-different-price.png',
      doordash: 'assets/pricing/doordash.png', ubereats: 'assets/pricing/uber-eats.png', delta: 'assets/pricing/delta.png', fetcherr: 'assets/pricing/fetcherr.png', walmart: 'assets/pricing/walmart.png', kroger: 'assets/pricing/kroger.png', microsoft: 'assets/pricing/microsoft.png' },
    fonts: G.BizFont.load };
})(window);
