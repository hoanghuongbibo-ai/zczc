/* "Why Americans Can't Buy a House Until 40" — part 1: COLD OPEN + SETUP (voice: assets/audio/housing-01-open-setup.mp3).
 * Shot times are the narration's word times (pocketsphinx transcript, checked by ear against the script). */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Ch = G.Charts, I = G.Icons, Tn = G.Toon;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popK, popAt, tween } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const ground = (ctx, c = '#7ccf55', y = 590) => { ctx.fillStyle = c; ctx.fillRect(0, y, W, H - y); Tn.line(ctx, [[0, y], [W, y]], 4, INK); };
  const mixHex = (a, b, k) => { const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16)); return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(k))).toString(16).padStart(2, '0')).join(''); };
  const drift = (lt, dur, z0 = 1, z1 = 1.05) => lerp(z0, z1, inout(clamp(lt / dur)));
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  // white-faced extra / skin-toned lead, a little alive (bob + blink-free)
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));

  // ================= COLD OPEN =================
  function phone(ctx, x, y, s, lt) { // phone with a feed; hearts and shares fly off it
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.roundRect(-150, -270, 300, 540, 40), '#23262d', 5);
    sh(ctx, c => c.roundRect(-132, -240, 264, 480, 22), '#fff', 3);
    sh(ctx, c => c.roundRect(-40, -258, 80, 10, 5), '#444', 0);
    for (let i = 0; i < 3; i++) { const yy = -200 + i * 150 - (lt * 40) % 150; if (yy < -230 || yy > 150) continue; sh(ctx, c => c.roundRect(-116, yy, 232, 128, 12), i === 1 ? '#ffe9b8' : '#eef3fa', 2.5); ctx.fillStyle = '#c9d2de'; ctx.fillRect(-100, yy + 18, 140, 12); ctx.fillRect(-100, yy + 40, 190, 10); ctx.fillRect(-100, yy + 58, 160, 10); }
    ctx.restore();
  }
  function c1(ctx, lt, dur, t) { // last November, a number went viral
    K.bg.sky(ctx); ctx.save(); camZoom(ctx, drift(lt, dur, 1, 1.06));
    phone(ctx, 640, 380, 1, lt);
    const icons = [['heart', -1], ['share', 1], ['heart', 1], ['fire', -1], ['share', -1], ['heart', 1], ['fire', 1], ['heart', -1]];
    icons.forEach(([kind, side], i) => { const t0 = .3 + i * .28, k = (lt - t0) / 1.4; if (k <= 0 || k > 1) return; const x = 640 + side * (170 + k * 260 + (i % 3) * 30), y = 420 - k * 300 - (i % 2) * 60, s = back(k * 4) * (1 - k * .3);
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = 1 - Math.max(0, k - .75) * 4;
      if (kind === 'heart') sh(ctx, c => { c.moveTo(0, 16); c.bezierCurveTo(-34, -6, -18, -34, 0, -16); c.bezierCurveTo(18, -34, 34, -6, 0, 16); }, P.red, 3.5);
      else if (kind === 'share') { sh(ctx, c => c.arc(0, 0, 26, 0, 7), P.blue, 3.5); K.arrow(ctx, [-10, 8], [10, -10], 1, '#fff', 4); }
      else { sh(ctx, c => { c.moveTo(0, -30); c.quadraticCurveTo(26, -4, 16, 18); c.quadraticCurveTo(0, 30, -16, 18); c.quadraticCurveTo(-26, -4, 0, -30); }, P.orange, 3.5); sh(ctx, c => { c.moveTo(0, -8); c.quadraticCurveTo(12, 6, 6, 16); c.quadraticCurveTo(0, 20, -6, 16); c.quadraticCurveTo(-12, 6, 0, -8); }, P.yellow, 0); }
      ctx.restore(); });
    ctx.restore();
    popAt(ctx, 1040, 120, lt - .2, () => { K.card(ctx, 940, 88, 200, 64, P.yellow, 14); txt(ctx, 'Nov 2025', 1040, 121, HAND(700, 40)); });
    K.stamp(ctx, 'VIRAL', 330, 150, lt - 1.6, { color: P.red, rot: -.15, size: 60 });
  }
  function c2(ctx, lt, dur, t) { // the headlines → "Forty." → "That's a record."
    K.bg.white(ctx); ctx.save(); camZoom(ctx, drift(lt, dur, 1.02, 1.08), 640, 380);
    K.headline(ctx, 470, 250, 640, 'KATV · Nov 2025', 'The big four-oh: Typical age of first-time homebuyers hits record high', lt - .1, { rot: -.035, size: 38 });
    K.headline(ctx, 820, 470, 620, 'NAR press release · Nov 4, 2025', 'First-time home buyer share falls to historic low of 21%, median age rises to 40', lt - 1.3, { rot: .03, size: 34, bar: P.blue });
    ctx.restore();
    const f = 7.26 - 2.9;                                            // "Forty."
    if (lt > f) { ctx.fillStyle = `rgba(255,253,248,${.75 * clamp((lt - f) / .2)})`; ctx.fillRect(0, 0, W, H); }
    K.slam(ctx, '40', 640, 350, lt - f, 300, P.red);
    txt(ctx, 'median first-time buyer age (NAR)', 640, 545, HAND(700, 44), INK, 'center', clamp((lt - f - .3) / .3));
    K.stamp(ctx, 'RECORD', 930, 220, lt - (8.31 - 2.9), { color: P.blue, rot: .14, size: 62 });
    K.source(ctx, 'Source: NAR 2025 Profile of Home Buyers and Sellers', lt - f);
  }
  function c3(ctx, lt, dur, t) { // 1991: 28 → one generation → 40, after your first grey hair
    K.bg.cream(ctx);
    const T0 = 9.33, at = s => lt - (s - T0);
    // timeline arrow
    Tn.line(ctx, [[160, 610], [lerp(160, 1120, out(at(12.38) / 1.2)), 610]], 6, INK);
    if (at(12.38) > 1) K.arrow(ctx, [1080, 610], [1130, 610], 1, INK, 6);
    txt(ctx, 'one generation', 640, 650, HAND(700, 38), '#7a4b2a', 'center', clamp(at(12.69) / .4));
    // 1991 buyer (young)
    popAt(ctx, 330, 560, at(9.4), () => { bean(ctx, 330, 560, 1.05, t, { skin: B.SKIN, hair: 'short', hairColor: '#4a2f1d', body: P.blue, top: 'plain', face: { mouth: 'grin', brows: 'up' }, armR: [.9, -.6], armL: [.2, 0] }); });
    popAt(ctx, 330, 120, at(9.45), () => { K.card(ctx, 230, 80, 200, 80, '#fff', 14); txt(ctx, '1991', 330, 120, HAND(700, 52)); });
    K.slam(ctx, '28', 470, 300, at(11.3), 130, P.green);
    if (at(15.87) > 0) K.bubble(ctx, 'in your 20s', 150, 330, 200, [250, 330], at(15.87), { size: 34 });
    // 2025 buyer: the same person, older; the grey hair arrives on "gray hair"
    const g = clamp(at(17.6) / .8);
    popAt(ctx, 950, 560, at(12.6), () => { bean(ctx, 950, 560, 1.05, t, { skin: B.SKIN, hair: 'side', hairColor: mixHex('#4a2f1d', '#a9a6a1', g * .85), body: '#6c757d', top: 'shirt', glasses: true, face: { mouth: g > .5 ? 'frown' : 'flat', brows: g > .5 ? 'worried' : 'calm' }, armR: [.15, 0], armL: [.15, 0] }); });
    if (g > 0) for (let i = 0; i < 4; i++) { const k = clamp(g * 1.5 - i * .15); if (k <= 0) continue; const a = -2.2 + i * .45; Tn.line(ctx, [[950 + Math.cos(a) * 60, 255 + Math.sin(a) * 50], [950 + Math.cos(a) * (60 + 26 * k), 255 + Math.sin(a) * (50 + 26 * k)]], 4, '#fff'); }
    popAt(ctx, 950, 120, at(12.7), () => { K.card(ctx, 850, 80, 200, 80, '#fff', 14); txt(ctx, '2025', 950, 120, HAND(700, 52)); });
    K.slam(ctx, '40', 1110, 300, at(16.6), 130, P.red);
    if (at(17.95) > 0) K.bubble(ctx, 'first grey hair', 760, 210, 250, [900, 250], at(17.95), { size: 34 });
  }
  function avatar(ctx, x, y, r, hair, col) { B.head(ctx, x, y, r, { skin: 'white', hair, hairColor: col, face: { mouth: 'flat' } }); }
  function comment(ctx, x, y, w, text, lt, o) {
    popAt(ctx, x + 40, y, lt, () => {
      sh(ctx, c => c.roundRect(x + 6, y - 50 + 8, w, 100, 18), 'rgba(0,0,0,.1)', 0);
      K.card(ctx, x, y - 50, w, 100, '#fff', 18, 4);
      avatar(ctx, x + 56, y, 30, o.hair, o.hairColor);
      txt(ctx, text, x + 108, y - 12, HAND(700, 40), INK, 'left');
      // like / reply row
      sh(ctx, c => { c.roundRect(x + 108, y + 18, 18, 14, 3); c.roundRect(x + 112, y + 8, 10, 12, 3); }, '#9aa3ad', 0);
      ctx.fillStyle = '#9aa3ad'; ctx.fillRect(x + 140, y + 21, 80, 8); ctx.fillRect(x + 236, y + 21, 50, 8);
    });
  }
  function c4(ctx, lt, dur, t) { // the comments section
    K.bg.color(ctx, '#e9eef5'); const T0 = 19.4, at = s => lt - (s - T0);
    popAt(ctx, 640, 70, lt, () => { K.card(ctx, 330, 34, 620, 70, '#fff', 14); txt(ctx, 'Comments', 380, 69, PRINT(36), INK, 'left'); txt(ctx, '💬', 900, 69, PRINT(30), INK, 'center'); });
    const scroll = tween(lt, [[0, 0], [at(26.4) + lt - 0.0001, 0]]);
    comment(ctx, 190, 200 - scroll, 900, 'Millennials spend too much on avocado toast.', at(21.95), { hair: 'short', hairColor: '#8a5a32' });
    comment(ctx, 190, 340 - scroll, 900, "Gen Z doesn't want to work.", at(24.53), { hair: 'bald' });
    comment(ctx, 190, 480 - scroll, 900, 'Boomers pulled up the ladder.', at(26.66), { hair: 'bob', hairColor: '#e0b354' });
    // a little toast, a lazy zzz, a ladder — doodles beside each comment
    popAt(ctx, 1150, 200, at(22.4), () => { sh(ctx, c => { c.roundRect(1110, 160, 80, 76, [30, 30, 8, 8]); }, '#e2a95b', 4); sh(ctx, c => c.ellipse(1150, 205, 26, 18, 0, 0, 7), '#7cbf4a', 3); });
    popAt(ctx, 1150, 340, at(25.1), () => txt(ctx, 'zzz', 1150, 340, HAND(700, 52), P.blue));
    popAt(ctx, 1150, 480, at(27.2), () => { for (const x of [1128, 1172]) Tn.line(ctx, [[x, 425], [x, 535]], 5, '#8a5a36'); for (let y = 440; y < 535; y += 22) Tn.line(ctx, [[1128, y], [1172, y]], 4, '#8a5a36'); K.arrow(ctx, [1205, 520], [1205, 430], clamp(at(27.4) / .4), P.red, 5); });
  }
  function c5(ctx, lt, dur, t) { // host: what nobody in those comments noticed → that number is probably wrong
    K.bg.studio(ctx, '#ffd76a', '#fff3c9'); const T0 = 28.68, at = s => lt - (s - T0);
    const wrong = at(31.24) > 0;
    host(ctx, 360, 700, 1.15, t, [[T0 - .2, 'idle'], [28.8, 'pointSideL'], [29.8, 'present'], [31.2, 'pointSide']], { mouth: 'flat', brows: wrong ? 'skeptic' : 'up', look: [.5, 0], eyes: wrong ? 'side' : 'open' });
    popAt(ctx, 900, 320, at(29.2), () => { K.card(ctx, 760, 190, 280, 260, '#fff', 20); txt(ctx, '40', 900, 310, HAND(700, 190), P.red); txt(ctx, 'the viral number', 900, 420, PRINT(28)); });
    K.stamp(ctx, 'PROBABLY WRONG', 900, 520, at(32.1), { color: P.red, rot: -.08, size: 52 });
    if (wrong) txt(ctx, '?', 1075, 220, HAND(700, 120), P.blue, 'center', clamp(at(31.6) / .3));
  }
  function docChar(ctx, x, y, s, label, col, face, t, o = {}) { // a document with a face and little legs
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
    for (const lx of [-26, 26]) { Tn.line(ctx, [[lx, 0], [lx + (o.walk ? Math.sin(o.walk + lx) * 10 : 0), 50]], 7, INK); sh(ctx, c => c.ellipse(lx + 6 + (o.walk ? Math.sin(o.walk + lx) * 10 : 0), 52, 14, 7, 0, 0, 7), INK, 0); }
    sh(ctx, c => { c.moveTo(-80, -220); c.lineTo(50, -220); c.lineTo(80, -190); c.lineTo(80, 0); c.lineTo(-80, 0); c.closePath(); }, '#fff', 5);
    sh(ctx, c => c.rect(-80, -220, 160, 46), col, 5); txt(ctx, label, 0, -197, PRINT(22), '#fff');
    ctx.fillStyle = '#d5dbe3'; for (let i = 0; i < 3; i++) ctx.fillRect(-56, -60 + i * 18, 112, 7);
    const lk = face.look || 0; ctx.fillStyle = INK; for (const ex of [-26, 26]) { ctx.beginPath(); ctx.ellipse(ex + lk * 6, -130, 7, 10, 0, 0, 7); ctx.fill(); }
    if (face.mouth === 'smile') { ctx.beginPath(); ctx.moveTo(-18, -100); ctx.quadraticCurveTo(0, -86, 18, -100); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); } else Tn.line(ctx, [[-14, -96], [14, -96]], 4, INK);
    if (o.sign) { Tn.line(ctx, [[70, -40], [110, -150]], 6, '#8a5a36'); ctx.save(); ctx.translate(110, -190); ctx.rotate(.08); sh(ctx, c => c.roundRect(-70, -36, 140, 72, 10), P.green, 4); txt(ctx, o.sign, 0, 2, HAND(700, 38), '#fff'); ctx.restore(); }
    ctx.restore();
  }
  function c6(ctx, lt, dur, t) { // mortgage records, credit-bureau data, Census numbers walk in as characters — they shake their heads at the "40" balloon — and hold up "30s" signs
    K.bg.sky(ctx); ground(ctx); const T0 = 32.92, at = s => lt - (s - T0);
    txt(ctx, 'When you line up the actual data…', 640, 60, HAND(700, 46), INK, 'center', clamp(lt / .4));
    // the viral "40" balloon, until it pops
    const pop = at(38.4);
    if (pop < 0) { const by = 210 + Math.sin(t * 2) * 10; Tn.line(ctx, [[640, by + 95], [640, 420]], 3, INK); sh(ctx, c => c.ellipse(640, by, 90, 100, 0, 0, 7), P.red, 5); txt(ctx, '40', 640, by, HAND(700, 90), '#fff'); }
    else if (pop < .5) { for (let i = 0; i < 10; i++) { const a = i / 10 * 7; ctx.save(); ctx.globalAlpha = 1 - pop * 2; ctx.fillStyle = P.red; ctx.fillRect(640 + Math.cos(a) * pop * 300, 210 + Math.sin(a) * pop * 240, 18, 10); ctx.restore(); } txt(ctx, 'POP!', 640, 210, HAND(700, 80), INK, 'center', 1 - pop * 2); }
    const docs = [['Mortgage records', P.blue, 34.25, 300, 'early 30s'], ['Credit-bureau data', P.purple, 35.11, 640, 'mid 30s'], ['Census numbers', P.teal, 36.47, 980, 'early 30s']];
    docs.forEach(([label, col, s, x], i) => { const k = at(s); if (k <= 0) return; const wx = lerp(1400, x, out(clamp(k / 1.0))), shake = at(37.65) > 0 && at(39.5) < 0 ? Math.sin(t * 14) * .12 : 0;
      docChar(ctx, wx, 620, 1.15, label, col, { mouth: at(39.5) > 0 ? 'smile' : 'flat', look: shake ? Math.sin(t * 14) : -.5 }, t, { rot: shake, walk: k < 1 ? t * 12 : 0, sign: at(39.5 + i * .12) > 0 ? docs[i][4] : null }); });
    if (at(37.65) > 0 && at(39.5) < 0) popAt(ctx, 640, 470, at(37.65), () => { K.card(ctx, 470, 435, 340, 70, '#fff', 14); txt(ctx, 'almost none say 40', 640, 470, HAND(700, 38), P.red); });
    if (at(39.9) > 0) popAt(ctx, 640, 150, at(39.9), () => { K.card(ctx, 380, 105, 520, 90, P.green, 20); txt(ctx, 'early-to-mid 30s', 640, 151, HAND(700, 56), '#fff'); });
  }
  function c7(ctx, lt, dur, t) { // so, case closed? everyone's fine? — No.
    K.bg.studio(ctx, '#bfe3ff', '#eef8ff'); const T0 = 41.45, at = s => lt - (s - T0), no = at(44.04) > 0;
    host(ctx, 420, 700, 1.15, t, [[T0, 'presentBoth'], [42.7, 'thumbsUp'], [44.0, 'crossed']], no ? { mouth: 'flat', brows: 'angry', look: [0, 0] } : { mouth: 'smile', brows: 'up', eyes: at(42.77) > 0 ? 'happy' : 'open', look: [.4, 0] });
    if (!no) popAt(ctx, 960, 300, at(41.6), () => { ctx.save(); ctx.translate(960, 300); ctx.rotate(.04); sh(ctx, c => { c.moveTo(-170, -110); c.lineTo(-60, -110); c.lineTo(-40, -90); c.lineTo(170, -90); c.lineTo(170, 120); c.lineTo(-170, 120); c.closePath(); }, '#f2c76b', 4.5); txt(ctx, 'THE "40" FILE', 0, -40, PRINT(36), '#6b4a1d'); ctx.restore(); K.stamp(ctx, 'CASE CLOSED?', 960, 500, at(41.94), { color: P.green, rot: -.1, size: 52 }); });
    if (no) { K.bg.color(ctx, 'rgba(255,255,255,0)'); K.slam(ctx, 'NO.', 900, 330, at(44.04), 220, P.red); }
  }
  function magnifier(ctx, x, y, r, rot = -.6) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); sh(ctx, c => c.roundRect(r - 4, -12, r * 1.3, 24, 10), '#8a5a36', 4); sh(ctx, c => c.arc(0, 0, r, 0, 7), 'rgba(191,230,255,.45)', 7); ctx.restore(); }
  function c8(ctx, lt, dur, t) { // once I figured out why it went viral, and what the real data says… something way worse than "you'll buy at 40"
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6'); const T0 = 44.96, at = s => lt - (s - T0);
    host(ctx, 330, 700, 1.1, t, [[T0, 'chest'], [45.6, 'think'], [47.8, 'pointSide'], [50.0, 'presentBoth'], [52.0, 'shrug']], { mouth: 'flat', brows: at(50.04) > 0 ? 'worried' : 'neutral', look: [.6, -.1] });
    popAt(ctx, 880, 300, at(45.4), () => { K.card(ctx, 740, 170, 280, 240, '#fff', 20); txt(ctx, '40', 880, 280, HAND(700, 170), P.red); txt(ctx, 'went viral', 880, 375, PRINT(28)); });
    if (at(45.58) > 0) { const k = at(45.58), mx = 880 + Math.sin(k * 1.6) * 60, my = 290 + Math.cos(k * 1.2) * 30; magnifier(ctx, mx, my, 70); }
    if (at(47.94) > 0) popAt(ctx, 1150, 250, at(47.94), () => { I.draw(ctx, 'barsUp', 1150, 230, 110, clamp(at(47.94) / .8)); txt(ctx, 'the real data', 1150, 305, HAND(700, 32)); });
    K.bubble(ctx, ['Way worse than', '"you\'ll buy at 40"'], 900, 560, 440, [560, 330], at(50.41), { size: 44 });
  }
  function c9(ctx, lt, dur, t) { // who gets to buy at all — and the door got even narrower
    K.bg.sky(ctx); const T0 = 53.56, at = s => lt - (s - T0);
    ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    const narrow = clamp(at(57.86) / 1.2), door = lerp(1, .32, out(narrow));
    ctx.save(); camZoom(ctx, lerp(1, 1.18, inout(clamp(at(57.0) / 2.6))), 840, 470);
    K.house(ctx, 860, 570, 1.7, { door });
    // the line of hopeful buyers
    const crowd = [[120, '#f29b38', 'short'], [210, '#8e6bd8', 'bob'], [300, '#2bb3a6', 'side'], [390, '#e04b3a', 'bun'], [480, '#3b7dd8', 'short'], [570, '#f5a9b8', 'long']];
    crowd.forEach(([x, col, hair], i) => { const tilt = at(57.86) > 0 ? -.04 : 0; popAt(ctx, x, 600, at(53.7 + i * .12), () => bean(ctx, x, 600, .62, t + i, { skin: 'white', hair, hairColor: '#5a3b26', body: col, lean: tilt, face: { mouth: at(57.86) > 0 ? 'o' : 'flat', brows: at(57.86) > 0 ? 'worried' : 'calm', look: [1, -.2] } })); });
    ctx.restore();
    popAt(ctx, 640, 90, at(54.5), () => { K.card(ctx, 390, 50, 500, 80, '#fff', 18); txt(ctx, 'Who gets to buy at all?', 640, 90, HAND(700, 50)); });
    if (at(56.73) > 0) popAt(ctx, 1110, 170, at(56.73), () => { K.card(ctx, 990, 120, 240, 100, P.yellow, 16); txt(ctx, '3 weeks ago', 1110, 155, HAND(700, 40)); txt(ctx, 'the door narrowed', 1110, 195, PRINT(22)); });
  }

  // ================= SETUP: WHERE THE "40" CAME FROM =================
  function agent(ctx, x, y, s, t, col, lt) { popAt(ctx, x, y - 100, lt, () => { bean(ctx, x, y, s, t, { skin: 'white', hair: 'side', hairColor: '#3a2a1e', body: col, top: 'suit', tie: P.red, armR: [1.2, -.3], face: { mouth: 'grin' } });
    ctx.save(); ctx.translate(x + 70 * s, y - 250 * s); ctx.rotate(.08); sh(ctx, c => c.rect(-4, 0, 8, 120 * s), '#8a5a36', 2.5); sh(ctx, c => c.roundRect(-60 * s, -50 * s, 120 * s, 56 * s, 6), P.red, 3.5); txt(ctx, 'SOLD', 0, -22 * s, PRINT(30 * s), '#fff'); ctx.restore(); }); }
  function s1(ctx, lt, dur, t) { // the 40 comes from the National Association of Realtors — the trade group for real estate agents
    K.bg.white(ctx); const T0 = 60.03, at = s => lt - (s - T0);
    K.logo(ctx, 'nar', 640, 250, 520, at(60.91));
    txt(ctx, 'National Association of Realtors', 640, 400, HAND(700, 46), INK, 'center', clamp(at(61.5) / .4));
    if (at(63.4) > 0) { popAt(ctx, 640, 470, at(63.4), () => { K.card(ctx, 420, 440, 440, 64, P.yellow, 16); txt(ctx, 'the realtors\' trade group', 640, 472, HAND(700, 38)); }); }
    [[170, P.blue, 63.6], [330, P.teal, 63.9], [950, P.orange, 64.2], [1110, P.purple, 64.5]].forEach(([x, col, s]) => agent(ctx, x, 700, .6, t + x, col, at(s)));
    K.source(ctx, 'nar.realtor', at(61.2));
  }
  function reportCover(ctx, x, y, s, lt, o = {}) {
    popAt(ctx, x, y, lt, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || -.03);
      sh(ctx, c => c.rect(-170 + 10, -220 + 12, 340, 440), 'rgba(0,0,0,.14)', 0);
      sh(ctx, c => c.rect(-170, -220, 340, 440), '#1f4f9a', 5);
      sh(ctx, c => c.rect(-170, 60, 340, 160), '#fff', 4);
      txt(ctx, '2025', 0, -160, HAND(700, 56), P.yellow);
      txt(ctx, 'Profile of', 0, -90, PRINT(38), '#fff'); txt(ctx, 'Home Buyers', 0, -45, PRINT(38), '#fff'); txt(ctx, 'and Sellers', 0, 0, PRINT(38), '#fff');
      K.house(ctx, -80, 190, .45, { wall: '#ffcf7a' }); K.house(ctx, 70, 190, .45, { wall: '#bfe6ff', roof: P.blue });
      ctx.restore(); });
  }
  function s2(ctx, lt, dur, t) { // every year they publish the Profile of Home Buyers and Sellers
    K.bg.cream(ctx); const T0 = 65.79, at = s => lt - (s - T0);
    // a stack of past editions, then the 2025 one lands on top
    for (let i = 0; i < 4; i++) popAt(ctx, 640 + (i - 2) * 14, 380 - i * 4, at(66.0 + i * .12), () => { ctx.save(); ctx.globalAlpha = .55; reportCover(ctx, 640 + (i - 2) * 22, 380 + (3 - i) * 6, .9, 1, { rot: -.08 + i * .03 }); ctx.restore(); });
    reportCover(ctx, 640, 370, 1, at(67.36), { rot: .02 });
    popAt(ctx, 1030, 160, at(66.1), () => { K.card(ctx, 900, 120, 260, 80, '#fff', 16); txt(ctx, 'every year', 1030, 160, HAND(700, 44)); });
    K.logo(ctx, 'nar', 250, 160, 220, at(66.3));
  }
  function s3(ctx, lt, dur, t) { // Nov 2025: the median first-time buyer turns 40 (birthday party) — and first-timers get only a 21% slice of the market pie — both records
    K.bg.cream(ctx); ground(ctx, '#f0dcb8', 620); const T0 = 69.96, at = s => lt - (s - T0);
    popAt(ctx, 640, 60, at(70.1), () => { K.card(ctx, 480, 26, 320, 68, P.yellow, 16); txt(ctx, 'November 2025', 640, 60, HAND(700, 44)); });
    Tn.line(ctx, [[640, 110], [640, 620]], 4, '#d8c4a0');
    // left: a 40th birthday
    const party = at(73.98) > 0;
    popAt(ctx, 320, 500, at(72.37), () => {
      bean(ctx, 290, 640, .95, t, { skin: B.SKIN, hair: 'side', hairColor: '#7a6a5a', body: P.blue, face: { mouth: party ? 'o' : 'flat', brows: party ? 'up' : 'calm', look: [.3, -.2] }, armR: party ? [2.4, .2] : [.3, .2] });
      if (party) { sh(ctx, c => { c.moveTo(250, 285); c.lineTo(290, 195); c.lineTo(330, 285); c.closePath(); }, P.pink, 4); sh(ctx, c => c.arc(290, 192, 9, 0, 7), P.yellow, 3); } });
    txt(ctx, 'median first-time buyer', 320, 150, HAND(700, 38), INK, 'center', clamp(at(72.37) / .3));
    if (party) { for (const [dx, d, col] of [[-30, '4', P.red], [40, '0', P.red]]) { const by = 260 + Math.sin(t * 2 + dx) * 8; Tn.line(ctx, [[480 + dx, by + 60], [380, 430]], 2.5, INK); popAt(ctx, 480 + dx, by, at(73.98), () => txt(ctx, d, 480 + dx, by, HAND(700, 130), col)); }
      for (let i = 0; i < 24; i++) { const r = Tn.rng(i * 7 + 3), x = 40 + r() * 580, y = 120 + ((at(73.98) * (100 + r() * 120) + r() * 300) % 500); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 3 + i); ctx.fillStyle = [P.red, P.yellow, P.green, P.blue][i % 4]; ctx.fillRect(-6, -3, 12, 6); ctx.restore(); } }
    // right: the market as a pie; first-time buyers get the 21% slice
    txt(ctx, 'the home-buying market', 960, 150, HAND(700, 38), INK, 'center', clamp(at(74.93) / .3));
    if (at(75.0) > 0) { sh(ctx, c => c.ellipse(960, 470, 230, 60, 0, 0, 7), '#fff', 4);
      const cut = at(76.49) > 0 ? out(clamp(at(76.49) / .8)) : 0, a0 = -Math.PI / 2, a1 = a0 + .21 * Math.PI * 2;
      ctx.save(); ctx.translate(960, 400); ctx.scale(1, .55);
      sh(ctx, c => { c.moveTo(0, 0); c.arc(0, 0, 190, a1, a0 + Math.PI * 2); c.closePath(); }, '#e9b467', 5);
      ctx.translate(Math.cos((a0 + a1) / 2) * 90 * cut, Math.sin((a0 + a1) / 2) * 90 * cut - 40 * cut);
      sh(ctx, c => { c.moveTo(0, 0); c.arc(0, 0, 190, a0, a1); c.closePath(); }, P.yellow, 5); ctx.restore();
      if (cut > .5) { popAt(ctx, 1110, 250, at(77.0), () => { K.card(ctx, 1010, 215, 200, 70, P.blue, 14); txt(ctx, '21%', 1060, 250, HAND(700, 44), '#fff'); txt(ctx, 'first-timers', 1150, 250, PRINT(18), '#fff'); }); }
      bean(ctx, 1170, 640, .6, t, { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', body: P.teal, face: { mouth: cut > .5 ? 'smile' : 'o', brows: 'up', look: [-.8, -.3] }, armL: [1.4, -.3] });
      txt(ctx, 'of the market', 960, 560, HAND(700, 34), INK, 'center', clamp(at(77.4) / .3)); }
    K.stamp(ctx, 'RECORD', 470, 480, at(78.8), { color: P.red, rot: -.12, size: 48 });
    K.stamp(ctx, 'RECORD', 790, 230, at(79.1), { color: P.red, rot: .1, size: 48 });
    K.source(ctx, 'Source: NAR, Nov 4, 2025', at(72));
  }
  function lautz(ctx, x, y, s, t, face) { bean(ctx, x, y, s, t, { skin: '#ffd9bf', hair: 'bob', hairColor: '#f0cf86', glasses: true, body: '#e7795f', top: 'cardigan', face: Object.assign({ mouth: 'grin', brows: 'calm', blush: true }, face), armR: [.35, .5], armL: [.2, .2] }); }
  function s4(ctx, lt, dur, t) { // NAR's deputy chief economist Jessica Lautz: "10 years of lost housing wealth gains…"
    K.bg.studio(ctx, '#c6ecd9', '#f1fbf5'); const T0 = 80.56, at = s => lt - (s - T0);
    popAt(ctx, 300, 640, at(81.0), () => lautz(ctx, 300, 640, 1.15, t, at(85.15) > 0 ? { mouth: 'o', brows: 'worried' } : {}));
    K.nameCard(ctx, 'Jessica Lautz', 'Deputy Chief Economist, NAR', 300, 120, at(82.46));
    K.bubble(ctx, '"It means 10 years of lost housing wealth gains for first-time homebuyers."', 850, 330, 600, [450, 330], at(85.15), { size: 44 });
    if (at(85.58) > 0) { const k = clamp(at(85.58) / .5); popAt(ctx, 850, 580, at(85.58), () => { K.card(ctx, 700, 540, 300, 80, P.red, 16); txt(ctx, '10 years', 850, 580, HAND(700, 52), '#fff'); }); }
    K.source(ctx, 'Quote via KATV / Sinclair, Nov 2025', at(85.4));
  }
  function s5(ctx, lt, dur, t) { // heavy stuff — every news outlet in the country ran it
    K.bg.color(ctx, '#ffe7b0'); const T0 = 89.51, at = s => lt - (s - T0);
    // newspapers raining in
    for (let i = 0; i < 14; i++) { const k = at(90.75 + i * .1); if (k <= 0) continue; const r = Tn.rng(i * 7919 + 13), x = 120 + ((i * .618) % 1) * 1040, rot = (r() - .5) * .5, yy = lerp(-200, 120 + r() * 420, out(k / .5));
      ctx.save(); ctx.translate(x, yy); ctx.rotate(rot); sh(ctx, c => c.rect(-110, -70, 220, 140), '#fff', 4); txt(ctx, 'FIRST-TIME', 0, -38, PRINT(22)); txt(ctx, 'BUYERS: 40', 0, -10, PRINT(26), P.red); ctx.fillStyle = '#c9d2de'; ctx.fillRect(-90, 14, 180, 8); ctx.fillRect(-90, 32, 140, 8); ctx.fillRect(-90, 50, 160, 8); ctx.restore(); }
    // the heavy "40" weight lands
    const k = at(89.6), wy = lerp(-150, 340, clamp(k / .35) ** 2);
    if (k > 0) { ctx.save(); ctx.translate(640, wy); sh(ctx, c => { c.moveTo(-120, 100); c.lineTo(-80, -60); c.lineTo(80, -60); c.lineTo(120, 100); c.closePath(); }, '#4a4f57', 5); sh(ctx, c => c.arc(0, -80, 34, Math.PI, 0), null, 10); txt(ctx, '40', 0, 30, HAND(700, 110), '#fff'); ctx.restore(); }
    if (at(89.95) > 0) popAt(ctx, 640, 540, at(89.95), () => { K.card(ctx, 470, 495, 340, 90, P.yellow, 18); txt(ctx, 'heavy stuff', 640, 540, HAND(700, 60)); });
  }
  function s6(ctx, lt, dur, t) { // but how did they get that number?
    K.bg.studio(ctx, '#d9ccff', '#f5f1ff'); const T0 = 93.03;
    host(ctx, 520, 700, 1.15, t, [[T0, 'think']], { mouth: 'flat', brows: 'skeptic', look: [.4, -.3], eyes: 'side' });
    txt(ctx, '?', 800, 200, HAND(700, 160), P.purple, 'center', clamp(lt / .3));
    popAt(ctx, 900, 380, lt - .3, () => { K.card(ctx, 790, 300, 220, 160, '#fff', 20); txt(ctx, '40', 900, 380, HAND(700, 120), P.red); });
  }
  function mailbox(ctx, x, y, s, flag) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-8, 0, 16, 150), '#8a5a36', 4); sh(ctx, c => { c.moveTo(-70, 0); c.lineTo(-70, -70); c.quadraticCurveTo(-70, -110, 0, -110); c.quadraticCurveTo(70, -110, 70, -70); c.lineTo(70, 0); c.closePath(); }, P.blue, 5); sh(ctx, c => c.rect(70, -95, 10, 60 * flag), P.red, 3); ctx.restore(); }
  function s7(ctx, lt, dur, t) { // NAR tells you in its own release: mailed surveys → 6,103 back → 3.5% response rate
    K.bg.white(ctx); const T0 = 94.74, at = s => lt - (s - T0);
    const phase2 = at(101.4);
    if (phase2 < 0) {
      K.doc(ctx, 240, 300, 300, 380, 'NAR press release', ['—', '—', 'survey mailed…', '6,103 responses', 'response rate 3.5%', '—'], at(95.0), { rot: -.04, titleSize: 34 });
      mailbox(ctx, 640, 520, 1.1, 1);
      // envelopes flying out
      for (let i = 0; i < 22; i++) { const k = (at(97.7) - i * .07) / 1.1; if (k <= 0 || k > 1) continue; const r = Tn.rng(i + 9), tx = 760 + r() * 520, ty = 80 + r() * 380; K.envelope(ctx, lerp(640, tx, out(k)), lerp(440, ty, out(k)) - Math.sin(k * Math.PI) * 60, .8, (r() - .5) * .6, { stampC: P.red }); }
      // a few come back
      for (let i = 0; i < 3; i++) { const k = (at(99.1) - i * .25) / .7; if (k <= 0) continue; K.envelope(ctx, lerp(1150 - i * 100, 470 + i * 26, out(k)), lerp(150 + i * 90, 600, out(k)), .8, .1 * i, { fill: '#fff6d5', stampC: P.green }); }
      if (at(99.49) > 0) { popAt(ctx, 1000, 600, at(99.49), () => K.card(ctx, 830, 550, 340, 100, P.yellow, 18)); Ch.counter(ctx, { x: 1000, y: 590, value: 6103, lt: at(99.6), dur: .8, size: 70, color: INK }); txt(ctx, 'surveys back', 1000, 632, PRINT(24), INK, 'center', clamp(at(100) / .3)); }
    } else {
      // 200 envelopes: 7 of them (3.5%) came back
      txt(ctx, 'Response rate', 640, 70, HAND(700, 50), INK, 'center', clamp(phase2 / .3));
      const back7 = new Set([23, 58, 91, 104, 137, 166, 188]);
      for (let i = 0; i < 200; i++) { const cx = 175 + (i % 20) * 49, cy = 150 + Math.floor(i / 20) * 40, k = clamp((phase2 - i * .004) / .25); if (k <= 0) continue; const hit = back7.has(i) && phase2 > 1.2;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(back(k) * .36, back(k) * .36); K.envelope(ctx, 0, 0, 1, 0, { fill: hit ? P.green : '#e6eaf0' }); ctx.restore(); }
      if (phase2 > 1.0) Ch.counter(ctx, { x: 640, y: 610, value: 3.5, decimals: 1, suffix: '%', lt: phase2 - 1.0, dur: .7, size: 110, color: P.green });
      K.source(ctx, 'Source: NAR press release, Nov 4, 2025', phase2);
    }
  }
  function boxes(ctx, x, y, n) { for (let i = 0; i < n; i++) { const bx = x + [0, 90, 40, -60, 130][i], by = y - [0, 0, 76, 10, 70][i]; sh(ctx, c => c.rect(bx - 45, by - 76, 90, 76), '#d9a15e', 4); Tn.line(ctx, [[bx - 45, by - 50], [bx + 45, by - 50]], 3, '#a86f35'); } }
  function s8(ctx, lt, dur, t) { // who fills out a long paper survey? the 29-year-old in moving boxes, or the 45-year-old who opens their mail?
    const T0 = 104.23, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f3f6fb');
    const L = at(108.34), R = at(113.6);
    // left panel
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 640, H); ctx.clip(); K.bg.color(ctx, L > 0 && R < 0 ? '#ffe2cc' : '#f3e9df');
    if (L > -.5) { boxes(ctx, 360, 600, 5); bean(ctx, 200, 620, .95, t, { skin: 'white', hair: 'short', hairColor: '#3a2a1e', body: P.teal, face: { mouth: 'o', brows: 'worried', look: [.6, .3] }, armR: [.9, .8], armL: [.6, .6] });
      popAt(ctx, 320, 110, L, () => { K.card(ctx, 160, 70, 320, 80, '#fff', 16); txt(ctx, '29, just bought a condo', 320, 110, HAND(700, 36)); });
      if (L > 2) K.envelope(ctx, 480, 360 + Math.sin(t * 3) * 6, 1, .2, { stampC: P.red }); if (L > 2.2) K.cross(ctx, 480, 360, 70, clamp((L - 2.2) / .5)); }
    if (R < 0 && L > 0) {}
    ctx.restore();
    // right panel
    ctx.save(); ctx.beginPath(); ctx.rect(640, 0, 640, H); ctx.clip(); K.bg.color(ctx, R > 0 ? '#dff5e3' : '#e9efe9');
    if (R > -.5) { sh(ctx, c => c.rect(760, 470, 380, 24), '#b07a46', 4); sh(ctx, c => c.rect(790, 494, 16, 140), '#b07a46', 3); sh(ctx, c => c.rect(1094, 494, 16, 140), '#b07a46', 3);
      bean(ctx, 1170, 640, .95, t, { skin: 'white', hair: 'side', hairColor: '#7b7670', glasses: true, body: P.purple, top: 'cardigan', face: { mouth: 'smile', brows: 'up', look: [-.7, .3] }, armL: [1.1, .4] });
      K.doc(ctx, 940, 400, 160, 120, 'Survey', ['☑ ☑ ☑'], R - .3, { titleSize: 30, lineSize: 26 });
      popAt(ctx, 960, 110, R, () => { K.card(ctx, 780, 70, 360, 80, '#fff', 16); txt(ctx, '45, opens the mail', 960, 110, HAND(700, 36)); });
      if (R > 1.4) K.check(ctx, 1070, 260, 90, clamp((R - 1.4) / .5)); }
    else if (L > 0) txt(ctx, '?', 960, 360, HAND(700, 200), '#b8c4b8', 'center', clamp(L / .4));
    ctx.restore();
    Tn.line(ctx, [[640, 0], [640, H]], 5, INK);
    // the survey envelope arriving in the middle first
    if (L < 0) popAt(ctx, 640, 340, lt, () => { K.envelope(ctx, 640, 340, 2.2, -.05, { stampC: P.red }); txt(ctx, 'a long paper survey', 640, 480, HAND(700, 44)); });
  }
  function s9(ctx, lt, dur, t) { // that's not just me being a smartass
    K.bg.studio(ctx, '#ffd76a', '#fff3c9'); const T0 = 117.51;
    host(ctx, 640, 700, 1.2, t, [[T0, 'hips']], { mouth: 'smirk', brows: 'skeptic', eyes: lt > 1.2 ? 'wink' : 'open', look: [0, 0] });
  }
  function s10(ctx, lt, dur, t) { // AEI Housing Center: NY Fed credit data — a lottery drum of credit reports picks a random sample → out rolls "34"
    K.bg.cream(ctx); ground(ctx, '#f0dcb8', 620); const T0 = 119.9, at = s => lt - (s - T0);
    K.nameCard(ctx, 'American Enterprise Institute', 'Housing Center', 640, 70, at(120.0));
    // the lottery drum
    const spin = at(124.0) > 0 ? lt * 2.4 : 0, cx = 470, cy = 360, R = 170;
    sh(ctx, c => { c.moveTo(cx - 120, 600); c.lineTo(cx, cy); c.lineTo(cx + 120, 600); }, null, 8);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip(); ctx.fillStyle = 'rgba(207,233,255,.6)'; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    for (let i = 0; i < 22; i++) { const a = spin * (1 + (i % 3) * .2) + i * 1.7, rr = 40 + (i * 37) % 110; const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr; sh(ctx, c => c.roundRect(x - 16, y - 20, 32, 40, 4), '#fff', 2.5); ctx.fillStyle = '#c9d2de'; ctx.fillRect(x - 10, y - 10, 20, 4); ctx.fillRect(x - 10, y, 16, 4); }
    ctx.restore(); sh(ctx, c => c.arc(cx, cy, R, 0, 7), null, 7);
    for (let i = 0; i < 8; i++) { const a = spin + i / 8 * Math.PI * 2; Tn.line(ctx, [[cx, cy], [cx + Math.cos(a) * R, cy + Math.sin(a) * R]], 3, '#8a8f96'); }
    sh(ctx, c => c.arc(cx, cy, 16, 0, 7), P.red, 3);
    popAt(ctx, cx, 140, at(122.67), () => { K.card(ctx, cx - 150, 108, 300, 64, '#fff', 14); txt(ctx, 'credit reports', cx, 140, HAND(700, 38)); });
    popAt(ctx, cx + 230, 220, at(124.96), () => { K.card(ctx, cx + 120, 190, 220, 60, P.blue, 12); txt(ctx, 'New York Fed', cx + 230, 220, HAND(700, 34), '#fff'); });
    // the random sample drops into a tray
    sh(ctx, c => c.roundRect(700, 560, 360, 40, 10), '#b07a46', 4);
    for (let i = 0; i < 6; i++) { const k = at(127.04 + i * .25); if (k <= 0) continue; const e = clamp(k / .6), x = lerp(cx + R, 740 + i * 56, e), y = lerp(cy, 540, e) - Math.sin(e * Math.PI) * 80; sh(ctx, c => c.roundRect(x - 18, y - 22, 36, 44, 4), P.yellow, 3); }
    if (at(127.04) > 0) popAt(ctx, 880, 500, at(127.4), () => { K.card(ctx, 760, 470, 240, 56, P.yellow, 12); txt(ctx, 'random sample', 880, 498, HAND(700, 34)); });
    // the answer rolls out as a big ball
    if (at(129.07) > 0) popAt(ctx, 1080, 300, at(129.07), () => { K.card(ctx, 960, 170, 240, 80, '#fff', 14); txt(ctx, 'median age, 2025', 1080, 210, PRINT(24)); });
    if (at(133.6) > 0) { const k = clamp(at(133.6) / .7), bx = lerp(cx + R, 1080, out(k)), by = lerp(cy, 360, out(k)) - Math.sin(k * Math.PI) * 120; sh(ctx, c => c.arc(bx, by, 80, 0, 7), P.green, 5); txt(ctx, '34', bx, by + 2, HAND(700, 90), '#fff'); }
    K.source(ctx, 'Source: AEI Housing Center, Feb 19, 2026', at(129.1));
  }
  // the MBA comparison, one bar per source as the narration names it
  const AGES = [
    { label: 'Mortgage', sub: 'records (NMDB)', v: 32, name: 141.02, val: 142.68 },
    { label: 'Cotality', sub: '', v: 32, name: 143.78, val: 145.58 },
    { label: 'Census AHS', sub: '(2023)', v: 33, name: 146.76, val: 149.37 },
    { label: 'Credit data', sub: 'AEI · NY Fed', v: 34, name: 150.39, val: 151.82 },
    { label: 'Redfin', sub: 'Census CPS', v: 35, name: 153.0, val: 155.87 },
    { label: 'NAR', sub: 'mail survey', v: 40, name: 156.8, val: 157.53, hot: true },
  ];
  function ageChart(ctx, lt, T0) {
    const at = s => lt - (s - T0), x = 140, y = 590, w = 1000, h = 340, max = 45, gw = w / AGES.length, bw = gw * .56;
    // gridlines + axis
    ctx.save(); ctx.globalAlpha = clamp(lt / .4) * .6; ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]);
    for (const v of [10, 20, 30, 40]) { const yy = y - h * v / max; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w * clamp(lt / .6), yy); ctx.stroke(); txt(ctx, String(v), x - 22, yy, PRINT(22), '#8a8f96', 'right'); }
    ctx.restore(); Tn.line(ctx, [[x - 6, y], [x + (w + 12) * out(lt / .4), y]], 5, INK);
    AGES.forEach((d, i) => { const bx = x + gw * i + (gw - bw) / 2, kn = at(d.name), kv = at(d.val);
      txt(ctx, d.label, bx + bw / 2, y + 30, PRINT(26), INK, 'center', clamp(kn / .3)); if (d.sub) txt(ctx, d.sub, bx + bw / 2, y + 58, PRINT(20), '#6b717a', 'center', clamp(kn / .3));
      const k = kv > 0 ? back(kv / .55) : 0, bh = h * d.v / max * k, dim = at(157.6) > 0 && !d.hot;
      if (bh > 1) sh(ctx, c => c.roundRect(bx, y - bh, bw, bh, [10, 10, 0, 0]), d.hot ? P.red : dim ? '#9fbbe6' : P.blue);
      if (kv > 0) txt(ctx, String(Math.round(d.v * clamp(out(kv / .55)))), bx + bw * .3, y - bh - 28, HAND(700, 46), d.hot ? P.red : INK, 'center', clamp(kv / .3));
      if (kv > .4) { const bxm = bx + bw * .8; B.person(ctx, bxm, y - bh, .22, { skin: d.hot ? B.SKIN : 'white', hair: d.hot ? 'side' : ['short', 'bob', 'side', 'bun', 'short'][i % 5], hairColor: d.hot ? '#8d8a85' : '#3a2a1e', body: d.hot ? P.red : '#9fbbe6', face: { mouth: d.hot ? 'o' : 'smile' }, armR: d.hot ? [2.5, .1] : [.3, .2] }); } });
  }
  function s11(ctx, lt, dur, t) { // the MBA lined up basically every data source that exists → bars, NAR way out on its own
    K.bg.white(ctx); const T0 = 134.93, at = s => lt - (s - T0);
    K.nameCard(ctx, 'Mortgage Bankers Association', 'July 2026', 640, 80, at(135.0));
    if (at(137.6) > 0) ageChart(ctx, at(137.6), 137.6);
    if (at(158.48) > 0) K.callout(ctx, { x: 560, y: 215, tx: 1030, ty: 196, text: 'way out on its own', lt: at(158.48), color: P.yellow });
    if (at(141.0) > 0) txt(ctx, 'Median first-time buyer age, by source', 640, 150, HAND(700, 38), '#555b63', 'center', clamp(at(141.0) / .3));
    K.source(ctx, 'Source: MBA NewsLink, Chart of the Week, Jul 20, 2026', at(141));
  }
  // small helper: a Charts-style callout without the import (Charts.callout draws the box at x,y and points to tx,ty)
  K.callout = (ctx, o) => Ch.callout(ctx, o);
  function s12(ctx, lt, dur, t) { // the verdict: a judge (the MBA) reads it out — "likely not much older than one a decade ago" — gavel
    K.bg.color(ctx, '#e9dcc6'); const T0 = 160.57, at = s => lt - (s - T0);
    for (let i = 0; i < 6; i++) sh(ctx, c => c.rect(80 + i * 200, 60, 30, 380), '#d8c4a0', 0);
    bean(ctx, 320, 500, .85, t, { skin: B.SKIN, hair: 'side', hairColor: '#c9c4bc', glasses: true, body: '#1f1c1a', face: { mouth: 'flat', brows: 'calm', look: [.6, 0] } });
    sh(ctx, c => c.roundRect(100, 440, 440, 280, 16), '#8a5a36', 6); sh(ctx, c => c.roundRect(220, 470, 200, 56, 10), '#d9b98a', 4); txt(ctx, 'MBA', 320, 498, PRINT(34), '#5a3b26');
    const bang = at(165.35), ga = bang > 0 && bang < .25 ? -.2 + bang * 4 : -1.0;
    ctx.save(); ctx.translate(500, 440); ctx.rotate(ga); sh(ctx, c => c.roundRect(-6, -110, 12, 110, 5), '#6b3e2a', 3); sh(ctx, c => c.roundRect(-36, -140, 72, 40, 8), '#6b3e2a', 4); ctx.restore();
    if (bang > 0 && bang < .5) for (let i = 0; i < 6; i++) { const a = -Math.PI + i * .5; Tn.line(ctx, [[560 + Math.cos(a) * 40, 440 + Math.sin(a) * 40], [560 + Math.cos(a) * 70, 440 + Math.sin(a) * 70]], 4, INK); }
    K.nameCard(ctx, "The MBA's verdict", null, 900, 110, at(160.6));
    popAt(ctx, 900, 340, at(161.4), () => { sh(ctx, c => c.roundRect(600, 200, 600, 280, 20), '#fff7d6', 5);
      txt(ctx, '"The typical first-time', 900, 270, HAND(700, 48)); txt(ctx, 'buyer is likely not much', 900, 335, HAND(700, 48)); txt(ctx, 'older than one a decade ago."', 900, 400, HAND(700, 44)); });
    if (bang > 0) { ctx.save(); ctx.globalAlpha = .45; ctx.fillStyle = P.yellow; ctx.fillRect(640, 312, 520 * out(bang / .5), 110); ctx.restore(); txt(ctx, 'buyer is likely not much', 900, 335, HAND(700, 48)); txt(ctx, 'older than one a decade ago."', 900, 400, HAND(700, 44)); }
    K.source(ctx, 'Source: MBA NewsLink, Jul 20, 2026', at(161.4));
  }
  function s13(ctx, lt, dur, t) { // so, fake news, right? everybody can calm down?
    K.bg.studio(ctx, '#bfe3ff', '#eef8ff'); const T0 = 167.61, at = s => lt - (s - T0);
    host(ctx, 420, 700, 1.15, t, [[T0, 'shrug'], [169.2, 'presentBoth']], { mouth: at(169.28) > 0 ? 'smile' : 'open', brows: 'up', eyes: at(169.28) > 0 ? 'happy' : 'open', look: [.4, 0] });
    K.stamp(ctx, 'FAKE NEWS?', 920, 260, at(167.82), { color: '#7a8088', rot: -.1, size: 64 });
    if (at(169.6) > 0) popAt(ctx, 920, 480, at(169.6), () => { K.card(ctx, 760, 430, 320, 100, P.green, 20); txt(ctx, 'calm down?', 920, 480, HAND(700, 56), '#fff'); });
  }
  function ladder(ctx, x0, y0, x1, y1, k) { const n = 9, dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), nx = -dy / len * 34, ny = dx / len * 34, e = out(k);
    Tn.line(ctx, [[x0 - nx, y0 - ny], [lerp(x0, x1, e) - nx, lerp(y0, y1, e) - ny]], 7, '#8a5a36'); Tn.line(ctx, [[x0 + nx, y0 + ny], [lerp(x0, x1, e) + nx, lerp(y0, y1, e) + ny]], 7, '#8a5a36');
    for (let i = 1; i < n * e; i++) { const f = i / n; Tn.line(ctx, [[x0 + dx * f - nx, y0 + dy * f - ny], [x0 + dx * f + nx, y0 + dy * f + ny]], 5, '#8a5a36'); } }
  function s14(ctx, lt, dur, t) { // here's the problem: if the age didn't change much, something else did — the feeling it's impossible is in every dataset
    const T0 = 171.18, at = s => lt - (s - T0);
    if (at(176.0) < 0) {
      K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
      host(ctx, 330, 700, 1.15, t, [[T0, 'pointUp'], [172.5, 'presentL'], [174.4, 'pointSide']], { mouth: 'flat', brows: 'neutral', look: [.5, 0] });
      popAt(ctx, 880, 250, at(172.6), () => { K.card(ctx, 700, 170, 360, 160, '#fff', 20); txt(ctx, 'the age', 880, 215, PRINT(30)); txt(ctx, 'barely changed', 880, 275, HAND(700, 50), P.green); });
      popAt(ctx, 880, 480, at(174.53), () => { K.card(ctx, 700, 400, 360, 160, P.yellow, 20); txt(ctx, 'something else', 880, 445, PRINT(30)); txt(ctx, 'did', 880, 500, HAND(700, 64), P.red); });
      return;
    }
    // a house perched up a steep ladder; datasets tick, one after another
    const k = at(176.0); K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    sh(ctx, c => { c.moveTo(560, 600); c.lineTo(820, 170); c.lineTo(1280, 170); c.lineTo(1280, 600); c.closePath(); }, '#b9a27f', 5);
    K.house(ctx, 1010, 172, .9);
    ladder(ctx, 330, 600, 760, 210, clamp(k / 1.2));
    bean(ctx, 300, 610, .7, t, { skin: 'white', hair: 'short', hairColor: '#3a2a1e', body: P.blue, face: { mouth: 'frown', brows: 'worried', look: [.8, -.6] } });
    if (at(180.35) > 0) popAt(ctx, 360, 120, at(180.35), () => { K.card(ctx, 130, 80, 460, 80, '#fff', 18); txt(ctx, 'buying a house: impossible?', 360, 120, HAND(700, 40)); });
    const sets = ['barsUp', 'lineUp', 'doc', 'clipboard', 'books', 'magnifier'];
    sets.forEach((n, i) => { const lt2 = at(181.8 + i * .22); if (lt2 <= 0) return; const x = 120 + i * 100; popAt(ctx, x, 680, lt2, () => { sh(ctx, c => c.roundRect(x - 42, 640, 84, 72, 14), '#fff', 3.5); I.draw(ctx, n, x, 672, 56, 1); }); K.check(ctx, x + 30, 640, 40, clamp((lt2 - .2) / .3)); });
  }

  const SH = [
    [0, 2.9, c1], [2.9, 9.33, c2], [9.33, 19.4, c3], [19.4, 28.68, c4], [28.68, 32.92, c5], [32.92, 41.45, c6], [41.45, 44.96, c7], [44.96, 53.56, c8], [53.56, 60.03, c9],
    [60.03, 65.79, s1], [65.79, 69.96, s2], [69.96, 80.56, s3], [80.56, 89.51, s4], [89.51, 93.03, s5], [93.03, 94.74, s6], [94.74, 104.23, s7], [104.23, 117.51, s8],
    [117.51, 119.9, s9], [119.9, 134.93, s10], [134.93, 160.57, s11], [160.57, 167.61, s12], [167.61, 171.18, s13], [171.18, 184.53, s14],
  ];
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [1.0, 3.0, 4.2, 9.4, 12.6, 15.9, 18.0, 21.95, 24.53, 26.66, 29.2, 34.25, 35.11, 36.47, 39.6, 45.4, 50.4, 54.5, 56.73, 61.0, 63.4, 66.3, 67.4, 72.4, 74.9, 82.5, 85.2, 95.0, 99.5, 108.4, 113.6, 120.0, 124.8, 129.1, 135.0, 141.0, 143.8, 146.8, 150.4, 153.0, 156.8, 158.5, 160.6, 161.4, 169.6, 172.6, 174.5, 180.4]
    .map(t => ({ t, type: 'pop', gain: .5 }));
  const hits = [[7.26, 'thud'], [8.31, 'stamp'], [11.3, 'ding'], [16.6, 'ding'], [32.1, 'stamp'], [37.9, 'buzz'], [41.94, 'stamp'], [44.04, 'buzz'], [57.86, 'whoosh'], [78.8, 'stamp'], [79.1, 'stamp'], [89.95, 'thud'], [90.75, 'paper'], [97.7, 'mail'], [99.1, 'mail'], [102.5, 'ding'], [110.5, 'buzz'], [115.0, 'ding'], [133.6, 'ding'], [142.68, 'tick'], [145.58, 'tick'], [149.37, 'tick'], [151.82, 'tick'], [155.87, 'tick'], [157.53, 'thud'], [167.82, 'stamp'], [176.0, 'rise'], [181.8, 'ding']]
    .map(([t, type]) => ({ t, type, gain: .6 }));
  G.Show = { duration: 184.53, narration: '../biz/assets/audio/housing-01-open-setup.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .3,
    moods: [{ t: 0, mood: 'bright' }, { t: 28.68, mood: 'soft' }, { t: 44.04, mood: 'tense' }, { t: 60.03, mood: 'soft' }, { t: 89.51, mood: 'bright' }, { t: 93.03, mood: 'soft' }, { t: 171.18, mood: 'tense' }],
    images: { nar: 'assets/housing/nar.png' },
    fonts: G.BizFont.load };
})(window);
