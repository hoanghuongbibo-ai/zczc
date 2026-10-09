/* "Why Americans Can't Buy a House Until 40" — part 4: CHAPTER 5 (The Thaw That Didn't Happen) + CHAPTER 6 (Washington's
 * Fixes). Voice: assets/audio/housing-04-ch5-6.mp3; shot times are the narration's word times. */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Ch = G.Charts, I = G.Icons, Tn = G.Toon;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host, money = v => '$' + Math.round(v).toLocaleString('en-US');
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const YOU = { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', body: P.teal };
  const ground = (ctx, c = '#7ccf55', y = 590) => { ctx.fillStyle = c; ctx.fillRect(0, y, W, H - y); Tn.line(ctx, [[0, y], [W, y]], 4, INK); };
  const quoteShot = (ctx, at, who, role, t0, draw, lines, src) => { // portrait left, name card, quote bubbles right
    draw(); K.nameCard(ctx, who, role, 290, 110, at(t0));
    lines.forEach(([s, t1, y, fill], i) => K.bubble(ctx, s, 840, y, 640, [450, 300 + i * 60], at(t1), { size: 42, fill }));
    if (src) K.source(ctx, src, at(lines[0][1]));
  };
  // real people as house-style cartoons (from the user's photos)
  const warsh = (ctx, x, y, s, t, face) => bean(ctx, x, y, s, t, { skin: '#f2c9a5', hair: 'side', hairColor: '#2a2420', body: '#2f3b52', top: 'suit', tie: '#3b6fb6', face: Object.assign({ mouth: 'flat', brows: 'calm' }, face), armR: [.3, .6] });
  const yun = (ctx, x, y, s, t, face) => bean(ctx, x, y, s, t, { skin: '#f0cfa8', hair: 'side', hairColor: '#1d1b1a', glasses: true, body: '#2e2f36', top: 'suit', tie: '#a3333a', face: Object.assign({ mouth: 'smile', brows: 'calm' }, face), armL: [.3, .5] });
  const trump = (ctx, x, y, s, t, face, o = {}) => bean(ctx, x, y, s, t, Object.assign({ skin: '#f3b98c', hair: 'side', hairColor: '#f0cf86', body: '#1f2c4d', top: 'suit', tie: '#d23a3a', face: Object.assign({ mouth: 'flat', brows: 'calm' }, face) }, o));
  const pulte = (ctx, x, y, s, t, face, o = {}) => bean(ctx, x, y, s, t, Object.assign({ skin: '#f6cfae', hair: 'short', hairColor: '#2a2420', body: '#1f2c4d', top: 'suit', tie: '#4d86d6', face: Object.assign({ mouth: 'grin', brows: 'calm' }, face) }, o));
  const berner = (ctx, x, y, s, t, face) => bean(ctx, x, y, s, t, { skin: '#f6d2b5', hair: 'short', hairColor: '#7a4f2c', body: '#5d6670', top: 'suit', tie: '#2e3a4f', face: Object.assign({ mouth: 'smile', brows: 'calm' }, face), armR: [.3, .5] });
  function rateLine(ctx, pts, lt, o = {}) { // pts = [[label, value, appearAt(lt)]], categorical x
    const x0 = o.x0 ?? 180, x1 = o.x1 ?? 1080, y0 = o.y0 ?? 580, lo = o.lo ?? 5.5, hi = o.hi ?? 7.6, hgt = o.h ?? 360, X = i => lerp(x0, x1, i / (pts.length - 1)), Y = v => y0 - hgt * (v - lo) / (hi - lo);
    ctx.save(); ctx.globalAlpha = clamp(lt / .4) * .6; ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); for (const v of o.grid || [6, 6.5, 7, 7.5]) { ctx.beginPath(); ctx.moveTo(x0 - 30, Y(v)); ctx.lineTo(x1 + 30, Y(v)); ctx.stroke(); txt(ctx, v.toFixed(1) + '%', x0 - 50, Y(v), PRINT(22), '#8a8f96', 'right'); } ctx.restore();
    Tn.line(ctx, [[x0 - 40, y0], [x1 + 40, y0]], 5, INK);
    pts.forEach(([label, v, a], i) => { const k = a; if (k <= 0) { return; } txt(ctx, label, X(i), y0 + 30, PRINT(24), INK, 'center', clamp(k / .3));
      if (i > 0 && pts[i - 1][2] > 0) { const e = inout(clamp(k / .6)); Tn.line(ctx, [[X(i - 1), Y(pts[i - 1][1])], [lerp(X(i - 1), X(i), e), lerp(Y(pts[i - 1][1]), Y(v), e)]], 7, o.color || P.red); }
      sh(ctx, c => c.arc(X(i), Y(v), 10 * back(k / .3), 0, 7), '#fff', 4);
      popAt(ctx, X(i), Y(v) - 48, k - .2, () => { const hot = o.hot && o.hot.includes(i); K.card(ctx, X(i) - 66, Y(v) - 80, 132, 58, hot ? P.red : '#1f1c1a', 12, 0); txt(ctx, v.toFixed(2) + '%', X(i), Y(v) - 50, HAND(700, 40), '#fff'); }); });
  }

  // ================= CHAPTER 5: THE THAW THAT DIDN'T HAPPEN =================
  function f1(ctx, lt, dur, t) { // late 2025 rates eased: a skier glides down from 6.34% to ~6.1% in Jan 2026, near the lowest in 3+ years (Freddie Mac)
    if (lt < 1.7) { K.chapterCard(ctx, lt, 5, "The Thaw That Didn't Happen", '#3a9fd8'); return; }
    K.bg.sky(ctx); const at = s => lt - s;
    txt(ctx, '30-year mortgage rate (Freddie Mac)', 640, 50, HAND(700, 42), INK, 'center', clamp(at(1.8) / .3));
    // snowy slope from 6.34% down to 6.10%
    const A = [140, 300], Bp = [900, 420];
    sh(ctx, c => { c.moveTo(0, A[1]); c.lineTo(A[0], A[1]); c.lineTo(Bp[0], Bp[1]); c.lineTo(W, Bp[1] + 10); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); }, '#ffffff', 5);
    for (let i = 0; i < 6; i++) { const x = 980 + i * 50, y = Bp[1] - 10; sh(ctx, c => { c.moveTo(x, y - 60); c.lineTo(x - 22, y); c.lineTo(x + 22, y); c.closePath(); }, '#2e8b57', 3); }
    popAt(ctx, A[0], A[1] - 60, at(2.0), () => { K.card(ctx, A[0] - 70, A[1] - 92, 140, 60, '#1f1c1a', 12, 0); txt(ctx, '6.34%', A[0], A[1] - 62, HAND(700, 40), '#fff'); });
    txt(ctx, 'Oct 2025', A[0], A[1] + 34, PRINT(24), INK);
    const k = clamp(at(2.6) / 6.2), e = inout(k), sx = lerp(A[0], Bp[0], e), sy = lerp(A[1], Bp[1], e);
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(Math.atan2(Bp[1] - A[1], Bp[0] - A[0])); Tn.line(ctx, [[-50, 4], [50, 4]], 6, P.red); ctx.restore();
    bean(ctx, sx, sy, .42, t, Object.assign({ face: { mouth: 'grin', brows: 'up' }, armR: [1.2, -.4], armL: [1.2, -.4], lean: .25 }, YOU));
    if (at(9.11) > 0) { popAt(ctx, Bp[0], Bp[1] - 140, at(9.11), () => { K.card(ctx, Bp[0] - 70, Bp[1] - 172, 140, 60, P.green, 12); txt(ctx, '6.10%', Bp[0], Bp[1] - 142, HAND(700, 40), '#fff'); }); txt(ctx, 'Jan 2026', Bp[0], Bp[1] + 34, PRINT(24), INK); }
    if (at(10.92) > 0) popAt(ctx, 520, 150, at(10.92), () => { K.card(ctx, 380, 110, 280, 80, P.yellow, 16); txt(ctx, 'lowest in 3+ years', 520, 150, HAND(700, 36)); });
    K.logo(ctx, 'freddie', 1060, 600, 260, at(14.28), { crop: [85, 90, 425, 110], pad: 8 });
    K.source(ctx, 'Source: Freddie Mac PMMS; AP, Jan 2026', at(13.9));
  }
  function f2(ctx, lt, dur, t) { // buyers came back: Dec 2025 sales pace 4.35M, fastest in nearly 3 years; Redfin's gap shrinking — a thaw
    const T0 = 15.7, at = s => lt - (s - T0);
    if (at(29.71) < 0) {
      K.bg.cream(ctx);
      for (let i = 0; i < 7; i++) { const k = at(15.9 + i * .12); if (k <= 0) continue; const x = lerp(-80, 120 + i * 90, out(k / .8)); bean(ctx, x, 690, .42, t + i, { skin: 'white', hair: ['short', 'bob', 'side', 'bun', 'short', 'long', 'side'][i], hairColor: '#3a2a1e', body: [P.blue, P.pink, P.teal, P.orange, P.purple, P.green, P.red][i], face: { mouth: 'smile' }, walk: t * 8 + i }); }
      popAt(ctx, 640, 90, at(17.76), () => { K.card(ctx, 500, 50, 280, 80, P.yellow, 16); txt(ctx, 'December 2025', 640, 90, HAND(700, 44)); });
      txt(ctx, 'existing-home sales (annual pace)', 640, 200, PRINT(34), INK, 'center', clamp(at(19.35) / .3));
      if (at(21.51) > 0) Ch.counter(ctx, { x: 640, y: 300, value: 4.35, decimals: 2, suffix: 'M', lt: at(21.51), dur: 1.0, size: 120, color: P.green });
      K.stamp(ctx, 'FASTEST IN ~3 YEARS', 640, 430, at(23.38), { color: P.green, size: 48, rot: -.04 });
      if (at(26.13) > 0) popAt(ctx, 1080, 560, at(26.13), () => { K.card(ctx, 940, 500, 280, 120, '#fff', 18); txt(ctx, 'Redfin: gap', 1080, 540, HAND(700, 36)); txt(ctx, 'shrinking ↓', 1080, 585, HAND(700, 40), P.green); });
      K.source(ctx, 'Source: Scripps News (NAR data), Jan 14, 2026', at(21.5)); return;
    }
    // the thaw: ice melting
    const k = at(29.71); K.bg.sky(ctx); ground(ctx, '#9fd97f');
    for (let i = 0; i < 3; i++) K.house(ctx, 250 + i * 390, 600, 1.0, { wall: ['#ffe1a8', '#c8ecff', '#ffd3e0'][i], roof: [P.purple, P.blue, P.red][i] });
    for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) { const ix = 250 + i * 390 - 125 + j * 50, l = Math.max(0, (24 + (j % 3) * 10) * (1 - k / 2.5)); if (l > 0) sh(ctx, c => { c.moveTo(ix - 7, 452); c.lineTo(ix + 7, 452); c.lineTo(ix, 452 + l); c.closePath(); }, '#e9f7ff', 2.5); const dy = ((k * 2 + j * .3) % 1) * 120; ctx.fillStyle = '#7fb6d9'; ctx.beginPath(); ctx.ellipse(ix, 470 + dy, 4, 7, 0, 0, 7); ctx.fill(); }
    sh(ctx, c => c.arc(1120, 120, 70, 0, 7), P.yellow, 5);
    popAt(ctx, 600, 120, k, () => { K.card(ctx, 380, 76, 440, 90, '#fff', 18); txt(ctx, 'finally thawing?', 600, 121, HAND(700, 56), P.blue); });
  }
  function f3(ctx, lt, dur, t) { // but there was a problem → Sep 16, 2026: the Fed pulls the rate lever up a quarter point to 3.75–4.00% — first hike since 2023 — unanimous (hands up)
    const T0 = 33.5, at = s => lt - (s - T0);
    if (at(35.76) < 0) { K.bg.studio(ctx, '#ffb3a3', '#ffece6'); host(ctx, 640, 700, 1.2, t, [[T0, 'pointUp']], { mouth: 'flat', brows: 'worried', look: [0, 0] }); return; }
    K.bg.color(ctx, '#e8edf4'); ground(ctx, '#cfd6e0', 620);
    K.logo(ctx, 'fed', 140, 130, 150, at(38.12), { round: 75, pad: 6 });
    popAt(ctx, 140, 330, at(35.89), () => { K.card(ctx, 40, 270, 200, 130, '#fff', 14); sh(ctx, c => c.roundRect(40, 270, 200, 42, [14, 14, 0, 0]), P.red, 4.5); txt(ctx, 'SEPTEMBER', 140, 291, PRINT(24), '#fff'); txt(ctx, '16, 2026', 140, 352, HAND(700, 46)); });
    // the control panel and the big lever
    sh(ctx, c => c.roundRect(360, 300, 560, 320, 20), '#5d6670', 5); sh(ctx, c => c.roundRect(390, 330, 500, 120, 12), '#1f2a36', 4);
    txt(ctx, 'FED FUNDS RATE', 640, 365, PRINT(28), '#9fe07a');
    const pulled = at(41.92) > 0 ? out(clamp(at(41.92) / .6)) : 0;
    txt(ctx, pulled > .5 ? '3.75% – 4.00%' : '3.50% – 3.75%', 640, 415, HAND(700, 46), pulled > .5 ? '#ff9d4d' : '#9fe07a');
    const la = lerp(.7, -.7, pulled); ctx.save(); ctx.translate(640, 580); ctx.rotate(la); sh(ctx, c => c.roundRect(-10, -100, 20, 100, 8), '#c9ced6', 4); sh(ctx, c => c.arc(0, -108, 22, 0, 7), P.red, 4); ctx.restore();
    sh(ctx, c => c.roundRect(560, 540, 160, 50, 10), '#3a434d', 4);
    if (at(44.12) > 0) popAt(ctx, 860, 520, at(44.12), () => { K.card(ctx, 780, 480, 160, 80, P.red, 14); txt(ctx, '+0.25', 860, 520, HAND(700, 50), '#fff'); });
    if (at(39.96) > 0) popAt(ctx, 640, 90, at(39.96), () => { K.card(ctx, 400, 50, 480, 80, P.yellow, 16); txt(ctx, 'first hike since 2023', 640, 90, HAND(700, 46)); });
    // the vote: every hand goes up
    if (at(48.63) > 0) { for (let i = 0; i < 5; i++) bean(ctx, 1000 + (i % 3) * 90 + (i > 2 ? 45 : 0), 640 - (i > 2 ? 0 : 0), .4, t + i, { skin: 'white', hair: ['side', 'bob', 'short', 'bun', 'side'][i], hairColor: '#3a2a1e', body: '#2f3b52', top: 'suit', face: { mouth: 'flat' }, armR: at(49.17) > i * .08 ? [2.8, 0] : [.2, 0] });
      popAt(ctx, 1110, 300, at(49.17), () => { K.card(ctx, 1000, 260, 220, 80, P.green, 16); txt(ctx, 'unanimous', 1110, 300, HAND(700, 44), '#fff'); }); }
    K.source(ctx, 'Source: Federal Reserve, Sep 16, 2026; Central Banking', at(38.2));
  }
  function f3b(ctx, lt, dur, t) { // Fed Chair Kevin Warsh: "removed a dose of accommodation" … "geopolitical landscape of shocks and uncertainty"
    K.bg.studio(ctx, '#d6e2f2', '#f4f8fd'); const T0 = 50.6, at = s => lt - (s - T0);
    quoteShot(ctx, at, 'Kevin Warsh', 'Fed Chair', 50.89, () => popAt(ctx, 290, 650, at(50.7), () => warsh(ctx, 290, 650, 1.15, t, at(54.76) > 0 ? { brows: 'worried' } : {})),
      [['the Fed "removed a dose of accommodation"', 52.23, 250], ['"…geopolitical landscape of shocks and uncertainty"', 55.23, 480, '#fff4d6']], 'Source: Central Banking (partial transcript), Sep 2026');
  }
  function f4(ctx, lt, dur, t) { // mortgage rates kept climbing: 7.03% (Sep 24) → 7.28% (Oct 1); a year earlier 6.34%
    K.bg.white(ctx); const T0 = 59.42, at = s => lt - (s - T0);
    txt(ctx, '30-year fixed rate (Freddie Mac)', 640, 60, HAND(700, 44), INK, 'center', clamp(lt / .3));
    rateLine(ctx, [['Jan 2026', 6.1, at(59.5)], ['Sep 24, 2026', 7.03, at(64.76)], ['Oct 1, 2026', 7.28, at(69.55)]], 1, { x0: 380, x1: 1060, hot: [2] });
    if (at(72.16) > 0) { const x = 180, y = 580 - 360 * (6.34 - 5.5) / 2.1; ctx.save(); ctx.globalAlpha = clamp(at(72.16) / .3); sh(ctx, c => c.arc(x, y, 10, 0, 7), '#d5dbe3', 4); txt(ctx, 'a year earlier', x, y - 70, HAND(700, 32), '#6b717a'); txt(ctx, '6.34%', x, y - 36, HAND(700, 40), '#6b717a'); ctx.restore(); }
    K.logo(ctx, 'freddie', 1130, 140, 200, at(61.64), { crop: [85, 90, 425, 110], pad: 8 });
    { const pts = [[380, 6.1, 59.5], [720, 7.03, 64.76], [1060, 7.28, 69.55]], Y = v => 580 - 360 * (v - 5.5) / 2.1; let hx = null, hy = null;
      for (let i = 1; i < 3; i++) { const k = at(pts[i][2]); if (k > 0) { const e = inout(clamp(k / .6)); hx = lerp(pts[i - 1][0], pts[i][0], e); hy = lerp(Y(pts[i - 1][1]), Y(pts[i][1]), e); } }
      if (hx != null) { bean(ctx, hx - 30, hy + 80, .32, t, Object.assign({ face: { mouth: 'o', brows: 'worried', look: [.6, -.8] }, armR: [2.6, -.2], armL: [2.4, -.2], lean: .3 }, YOU)); Tn.line(ctx, [[hx - 18, hy + 10], [hx, hy]], 3, '#8a5a36'); } }
    K.source(ctx, 'Source: Freddie Mac PMMS, Oct 1, 2026', at(62));
  }
  function f5(ctx, lt, dur, t) { // back to our household and the $429,100 house: 10% down (NAR median for first-time buyers) = $42,910 cash
    K.bg.sky(ctx); ground(ctx); const T0 = 73.88, at = s => lt - (s - T0);
    K.house(ctx, 420, 600, 1.5);
    popAt(ctx, 420, 120, at(75.91), () => { K.card(ctx, 280, 80, 280, 80, '#fff', 16); txt(ctx, '$429,100', 420, 120, HAND(700, 54), P.red); });
    bean(ctx, 780, 650, .9, t, { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', body: P.teal, face: { mouth: at(84.88) > 0 ? 'o' : 'flat', brows: at(84.88) > 0 ? 'worried' : 'calm', look: [-.6, -.2] }, armR: [1.0, -.4] });
    if (at(79.4) > 0) popAt(ctx, 1050, 260, at(79.4), () => { K.card(ctx, 920, 190, 260, 140, P.yellow, 20); txt(ctx, '10% down', 1050, 245, HAND(700, 52)); txt(ctx, 'median, first-timers (NAR)', 1050, 295, PRINT(18)); });
    if (at(84.88) > 0) { for (let i = 0; i < 8; i++) { const k = at(85.0 + i * .08); if (k > 0) { ctx.save(); ctx.translate(1050 + (i % 4) * 26 - 40, 470 - Math.floor(i / 4) * 16 - Math.max(0, .4 - k) * 200); sh(ctx, c => c.roundRect(-60, -16, 120, 32, 4), '#7cc46a', 3); txt(ctx, '$', 0, 0, HAND(700, 24), '#1d5a2a'); ctx.restore(); } }
      popAt(ctx, 1050, 560, at(84.88), () => { K.card(ctx, 900, 515, 300, 90, '#1f1c1a', 18, 0); txt(ctx, '$42,910 cash', 1050, 560, HAND(700, 50), '#fff'); }); }
    if (at(87.62) > 0) K.arrow(ctx, [880, 560], [560, 520], clamp(at(87.62) / .5), INK, 5);
    K.source(ctx, 'Source: NAR (10% median down payment), Nov 2025', at(80.5));
  }
  function bill(ctx, x, y, s, amount, col, fat) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-130, -170 - fat * 20, 260, 340 + fat * 40), '#fff', 5); sh(ctx, c => c.rect(-130, -170 - fat * 20, 260, 56), col, 5); txt(ctx, 'MORTGAGE BILL', 0, -142 - fat * 20, PRINT(24), '#fff');
    ctx.fillStyle = '#d5dbe3'; for (let i = 0; i < 3; i++) ctx.fillRect(-100, -80 + i * 22, 200, 8); txt(ctx, 'due monthly', 0, 20, PRINT(22), '#6b717a'); txt(ctx, amount, 0, 90, HAND(700, 64), col); ctx.restore(); }
  function f6(ctx, lt, dur, t) { // January 6.1% → bill ~$2,340/mo; today 7.28% → a fatter bill ~$2,642 → ~$300 more a month flies off, ~$3,600 a year, same house — before taxes & insurance
    K.bg.cream(ctx); const T0 = 89.22, at = s => lt - (s - T0);
    if (at(89.4) > 0) popAt(ctx, 330, 360, at(89.4), () => { bill(ctx, 330, 380, .9, at(94.17) > 0 ? '$2,340' : '…', P.green, 0); txt(ctx, 'at 6.1% (January)', 330, 150, HAND(700, 38), P.green); });
    if (at(96.1) > 0) popAt(ctx, 950, 360, at(96.1), () => { bill(ctx, 950, 380, .9, at(98.79) > 0 ? '$2,642' : '…', P.red, clamp(at(98.79) / .5)); txt(ctx, 'at 7.28% (now)', 950, 130, HAND(700, 38), P.red); });
    // the extra $300 a month flies out of your wallet; then twelve of them stack into a year
    if (at(100.71) > 0) { const k = clamp(at(100.71) / 1.2); for (let i = 0; i < 3; i++) { const kk = clamp(k * 1.5 - i * .2); ctx.save(); ctx.translate(lerp(640, 640 + (i - 1) * 60, kk), lerp(420, 240, kk)); ctx.scale(.55, .55); I.draw(ctx, 'moneyBag', 0, 0, 100, 1); ctx.restore(); }
      popAt(ctx, 640, 520, at(100.9), () => { K.card(ctx, 540, 480, 200, 80, P.red, 16); txt(ctx, '+$300/mo', 640, 520, HAND(700, 40), '#fff'); }); }
    if (at(103.4) > 0) { for (let i = 0; i < 12; i++) { const k = at(103.4 + i * .06); if (k <= 0) continue; ctx.save(); ctx.translate(490 + (i % 6) * 60, 640 - Math.floor(i / 6) * 34); ctx.scale(.3, .3); I.draw(ctx, 'moneyBag', 0, 0, 100, 1); ctx.restore(); }
      popAt(ctx, 640, 690, at(103.6), () => txt(ctx, '≈ $3,600 a year', 640, 692, HAND(700, 34), P.red)); }
    K.stamp(ctx, 'SAME HOUSE', 640, 90, at(106.48), { color: P.blue, size: 44, rot: -.05 });
    if (at(108.08) > 0) popAt(ctx, 1150, 640, at(108.08), () => { K.card(ctx, 1040, 605, 220, 70, P.yellow, 14); txt(ctx, '+ taxes + insurance', 1150, 640, HAND(700, 28)); });
    K.logo(ctx, 'jchs', 1220, 540, 60, at(110.64), { pad: 6 });
    if (at(91.0) > 0) txt(ctx, 'Our math: $386,190 loan, 30-yr fixed, principal + interest only', 260, 700, PRINT(18), '#55606b', 'center', clamp(at(91.0) / .4));
  }
  function f7(ctx, lt, dur, t) { // the 3% owners: their rate is an anchor at 3%; the market-rate balloon climbs to 7.28% — the gap gets bigger → even less likely to sell
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 620); const T0 = 113.21, at = s => lt - (s - T0);
    const base = 620, sc = 60, Y = v => base - v * sc, m = at(116.2) > 0 ? lerp(6.1, 7.28, out(clamp(at(116.2) / 1.6))) : 6.1;
    for (let v = 1; v <= 7; v++) { Tn.line(ctx, [[120, Y(v)], [140, Y(v)]], 3, '#2e3a4f'); txt(ctx, v + '%', 110, Y(v), PRINT(20), '#2e3a4f', 'right'); }
    Tn.line(ctx, [[130, base], [130, Y(7.6)]], 4, '#2e3a4f');
    // the 3% anchor + the homeowner in golden cuffs, holding the balloon string
    sh(ctx, c => c.roundRect(340, Y(3) - 40, 200, 80, 14), P.green, 5); txt(ctx, 'their rate: 3%', 440, Y(3), HAND(700, 34), '#fff');
    Tn.line(ctx, [[440, Y(3) + 40], [440, base]], 6, '#5d6166');
    bean(ctx, 640, base, .62, t, { skin: 'white', hair: 'side', hairColor: '#3a2a1e', body: P.blue, face: { mouth: 'frown', brows: 'worried', look: [.4, -1] }, armR: [2.6, .1] });
    cuffs(ctx, 600, base - 150, .3, .1);
    const bx = 900, by = Y(m) + Math.sin(t * 1.5) * 6;
    Tn.line(ctx, [[680, base - 210], [bx, by + 80]], 3, INK);
    sh(ctx, c => c.ellipse(bx, by, 80, 90, 0, 0, 7), P.red, 5); txt(ctx, m.toFixed(2) + '%', bx, by, HAND(700, 40), '#fff'); txt(ctx, 'market rate', bx, by - 115, PRINT(22));
    // the gap bracket
    K.arrow(ctx, [1060, Y(3)], [1060, Y(m) + 6], 1, P.purple, 5); K.arrow(ctx, [1060, Y(m)], [1060, Y(3) - 6], 1, P.purple, 5);
    txt(ctx, 'gap', 1110, (Y(3) + Y(m)) / 2, HAND(700, 40), P.purple, 'left'); if (at(118.1) > 0) txt(ctx, 'bigger', 1110, (Y(3) + Y(m)) / 2 + 40, HAND(700, 34), P.red, 'left', clamp(at(118.1) / .3));
    if (at(122.02) > 0) popAt(ctx, 640, 120, at(122.02), () => { K.card(ctx, 470, 80, 340, 80, P.yellow, 16); txt(ctx, 'even less likely to sell', 640, 120, HAND(700, 36)); });
    K.source(ctx, 'FHFA: −18.1% chance of selling per point of gap', at(120.2));
  }
  function cuffs(ctx, x, y, s, rot = 0, col = '#f6c945') {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    for (const dx of [-60, 60]) { ctx.beginPath(); ctx.arc(dx, 0, 44, 0, 7); ctx.arc(dx, 0, 28, 0, 7, true); ctx.fillStyle = col; ctx.fill('evenodd'); ctx.lineWidth = 4.5; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(dx, 0, 44, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(dx, 0, 28, 0, 7); ctx.stroke(); }
    for (let i = 0; i < 3; i++) sh(ctx, c => c.ellipse(-22 + i * 22, -50, 12, 7, 0, 0, 7), null, 4); ctx.restore();
  }
  function seesaw2(ctx, cx, cy, tilt, t) { ctx.save(); ctx.translate(cx, cy); sh(ctx, c => { c.moveTo(-50, 100); c.lineTo(0, 0); c.lineTo(50, 100); c.closePath(); }, '#9aa0a6', 4); ctx.rotate(tilt); sh(ctx, c => c.roundRect(-400, -14, 800, 28, 12), '#c98d4f', 4); ctx.restore(); }
  function f8(ctx, lt, dur, t) { // sales slipping: August pace 3.98M — Yun: "rates and sales move in opposite directions" (a seesaw) — the thaw is on ice again
    const T0 = 124.55, at = s => lt - (s - T0);
    if (at(140.57) < 0) {
      K.bg.sky(ctx); ground(ctx, '#9fd97f', 620);
      const tilt = -.22 * out(clamp(at(128.0) / 1.2)), cx = 640, cy = 470, L = (s) => [cx + Math.cos(tilt) * 360 * s, cy + Math.sin(tilt) * 360 * s - 14];
      seesaw2(ctx, cx, cy, tilt, t);
      const [rx, ry] = L(1), [sx, sy] = L(-1);
      sh(ctx, c => c.roundRect(rx - 80, ry - 90, 160, 80, 14), P.red, 5); txt(ctx, 'RATES', rx, ry - 70, PRINT(22), '#fff'); txt(ctx, '7.28%', rx, ry - 36, HAND(700, 36), '#fff');
      sh(ctx, c => c.roundRect(sx - 90, sy - 90, 180, 80, 14), P.blue, 5); txt(ctx, 'SALES', sx, sy - 70, PRINT(22), '#fff'); txt(ctx, at(130.11) > 0 ? '3.98M' : '…', sx, sy - 36, HAND(700, 36), '#fff');
      popAt(ctx, 640, 90, at(126.75), () => { K.card(ctx, 520, 50, 240, 80, P.yellow, 16); txt(ctx, 'August 2026', 640, 90, HAND(700, 44)); });
      if (at(130.5) > 0) txt(ctx, 'annual pace — down from 4.35M in Dec', 640, 190, HAND(700, 34), '#2e3a4f', 'center', clamp(at(130.5) / .3));
      if (at(132.39) > 0) { popAt(ctx, 160, 560, at(132.5), () => yun(ctx, 160, 660, .8, t, {})); K.nameCard(ctx, 'Lawrence Yun', 'Chief Economist, NAR', 200, 300, at(132.94));
        K.bubble(ctx, '"Mortgage rates and home sales move in opposite directions, so it\'s not surprising to see a mild dip."', 900, 300, 600, [300, 420], at(135.32), { size: 34 }); }
      K.source(ctx, 'Source: NAR, Sep 10, 2026', at(130)); return;
    }
    K.bg.color(ctx, '#dff1ff'); const k = at(140.57);
    popAt(ctx, 640, 340, k, () => { ctx.save(); ctx.translate(640, 340); ctx.rotate(-.06); sh(ctx, c => c.roundRect(-230, -170, 460, 340, 40), 'rgba(190,230,255,.85)', 6); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(-190, -140, 60, 16); ctx.fillRect(-190, -110, 30, 12); K.house(ctx, 0, 110, .9); ctx.restore(); });
    if (k > .6) popAt(ctx, 640, 610, k - .6, () => { K.card(ctx, 420, 570, 440, 84, '#1f1c1a', 18, 0); txt(ctx, 'the thaw: on ice', 640, 612, HAND(700, 52), '#fff'); });
  }

  // ================= CHAPTER 6: WASHINGTON'S FIXES =================
  function g1(ctx, lt, dur, t) { // what's the government doing about it? Two big ideas from the White House — more complicated than the headlines
    if (lt < 1.7) { K.chapterCard(ctx, lt, 6, "Washington's Fixes", '#3d4f8f'); return; }
    K.bg.studio(ctx, '#d9ccff', '#f5f1ff'); const T0 = 143.12, at = s => lt - (s - T0);
    host(ctx, 330, 700, 1.1, t, [[T0, 'think'], [145.7, 'presentL'], [149.0, 'shrug']], { mouth: 'flat', brows: 'skeptic', look: [.6, -.1] });
    K.logo(ctx, 'whitehouse', 860, 200, 260, at(147.05), { pad: 8, round: 20 });
    popAt(ctx, 760, 440, at(145.95), () => { K.card(ctx, 680, 390, 160, 110, P.yellow, 20); txt(ctx, 'idea 1', 760, 445, HAND(700, 44)); });
    popAt(ctx, 960, 440, at(146.2), () => { K.card(ctx, 880, 390, 160, 110, P.yellow, 20); txt(ctx, 'idea 2', 960, 445, HAND(700, 44)); });
    if (at(149.95) > 0) popAt(ctx, 860, 590, at(149.95), () => { K.card(ctx, 640, 550, 440, 80, '#fff', 16); txt(ctx, 'more complicated than the headlines', 860, 590, HAND(700, 32)); });
  }
  function eoDoc(ctx, x, y, lt, rot = -.03) { K.doc(ctx, x, y, 400, 300, 'Executive Order', ['Stopping Wall Street from', 'Competing with Main Street', 'Homebuyers', '—', 'Jan 20, 2026'], lt, { rot, titleSize: 40, lineSize: 26 }); }
  function g2(ctx, lt, dur, t) { // idea #1: blame Wall Street — Jan 20, 2026, Trump signs the executive order
    const T0 = 152.14, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 640, 80, at(152.2), () => { K.card(ctx, 360, 40, 560, 80, '#1f1c1a', 18, 0); txt(ctx, 'Idea #1: blame Wall Street', 640, 81, HAND(700, 50), '#fff'); });
    if (at(153.6) > 0 && at(155.09) < 0) { I.draw(ctx, 'barsUp', 640, 360, 200, 1); txt(ctx, 'WALL ST', 640, 500, PRINT(40), P.red); }
    if (at(155.09) > 0) {
      popAt(ctx, 1080, 200, at(155.29), () => { K.card(ctx, 960, 150, 240, 100, P.yellow, 16); txt(ctx, 'Jan 20, 2026', 1080, 200, HAND(700, 44)); });
      popAt(ctx, 300, 650, at(157.31), () => trump(ctx, 300, 650, 1.1, t, { mouth: 'flat' }, { armR: [1.2, -.6] }));
      K.nameCard(ctx, 'President Trump', null, 300, 200, at(157.5));
      eoDoc(ctx, 800, 440, at(158.42));
      if (at(158.0) > 0) { const k = clamp(at(158.0) / 1.0); ctx.save(); ctx.beginPath(); ctx.moveTo(660, 545); for (let i = 0; i <= 20 * k; i++) ctx.lineTo(660 + i * 9, 545 - Math.sin(i * 1.3) * 10); ctx.lineWidth = 4; ctx.strokeStyle = '#1d3a8a'; ctx.stroke(); ctx.restore(); }
      K.logo(ctx, 'whitehouse', 1120, 560, 150, at(159.3), { pad: 6, round: 10 });
    }
  }
  function banker(ctx, x, y, s, t, face, o = {}) { bean(ctx, x, y, s, t, Object.assign({ skin: 'white', hair: 'none', body: '#2e2f36', top: 'suit', tie: P.yellow, face: Object.assign({ mouth: 'smirk', brows: 'calm' }, face) }, o));
    const hy = y - (230 + 2 * 70 - 18) * s; sh(ctx, c => c.rect(x - 46 * s, hy - 60 * s, 92 * s, 64 * s), '#1f1c1a', 3); sh(ctx, c => c.rect(x - 70 * s, hy, 140 * s, 12 * s), '#1f1c1a', 3); }
  function g3(ctx, lt, dur, t) { // the headlines said "banned" — not exactly. Cooley: no outright ban, no forced sales; agencies write new rules restricting sales of single-family homes to big investors; built-to-rent exempt
    const T0 = 163.53, at = s => lt - (s - T0);
    if (at(169.94) < 0) {
      K.bg.white(ctx);
      K.headline(ctx, 560, 300, 700, 'the headlines', 'Trump "bans" big investors from buying homes', at(164.0), { rot: -.03, size: 46 });
      K.stamp(ctx, 'NOT EXACTLY', 860, 500, at(168.27), { color: P.blue, size: 60, rot: .08 }); return;
    }
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 610);
    K.logo(ctx, 'cooley', 150, 70, 170, at(169.94), { pad: 6 });
    bean(ctx, 150, 660, .7, t, { skin: B.SKIN, hair: 'bob', hairColor: '#3a2a1e', glasses: true, body: '#3d4f8f', top: 'suit', face: { mouth: 'smile', brows: 'up', look: [.8, 0] }, armR: [1.5, -.6] });
    sh(ctx, c => c.roundRect(185, 470, 60, 76, 6), '#fff', 3); txt(ctx, 'E.O.', 215, 508, PRINT(18));
    if (at(175.2) < 0) { // no ban, no forced sales: the investor keeps standing with his houses
      for (let i = 0; i < 3; i++) K.house(ctx, 760 + i * 170, 600, .55, { wall: '#ffe1a8', roof: P.purple });
      banker(ctx, 560, 660, .75, t, { look: [.6, 0], mouth: 'smirk' });
      popAt(ctx, 560, 220, at(172.37), () => { K.card(ctx, 420, 180, 280, 80, '#fff', 14); txt(ctx, '"BANNED"', 560, 220, HAND(700, 44), P.red); }); if (at(172.6) > 0) K.cross(ctx, 560, 220, 120, clamp(at(172.6) / .4));
      if (at(173.39) > 0) { popAt(ctx, 940, 260, at(173.39), () => { K.card(ctx, 790, 220, 300, 80, '#fff', 14); txt(ctx, 'no forced sales', 940, 260, HAND(700, 38)); }); ctx.save(); ctx.translate(1100, 600); Tn.line(ctx, [[0, 0], [0, -70]], 5, '#8a5a36'); sh(ctx, c => c.roundRect(-55, -110, 110, 44, 6), '#fff', 3.5); txt(ctx, 'FOR SALE', 0, -88, PRINT(20), P.red); ctx.restore(); K.cross(ctx, 1100, 512, 70, clamp(at(173.6) / .4)); }
      return; }
    if (at(178.44) < 0) { // agencies write new guidance and rules
      sh(ctx, c => { c.moveTo(560, 250); c.lineTo(860, 160); c.lineTo(1160, 250); c.closePath(); }, '#eef0f3', 5); sh(ctx, c => c.rect(580, 250, 560, 360), '#f6f2ea', 5); for (let i = 0; i < 6; i++) sh(ctx, c => c.rect(610 + i * 90, 270, 30, 340), '#fff', 3);
      txt(ctx, 'FEDERAL AGENCIES', 860, 225, PRINT(24));
      for (let i = 0; i < 2; i++) { bean(ctx, 700 + i * 320, 660, .62, t + i, { skin: 'white', hair: ['side', 'bun'][i], hairColor: '#3a2a1e', body: '#5d6670', top: 'suit', face: { mouth: 'flat', brows: 'calm', look: [.2, .8] }, armR: [1.3, -.4] }); }
      K.doc(ctx, 860, 470, 220, 200, 'NEW RULES', ['—', '—', '— ' + '…'.repeat(Math.floor(lt * 3) % 4)], at(175.2), { titleSize: 34 });
      popAt(ctx, 860, 120, at(175.3), () => { K.card(ctx, 640, 82, 440, 76, P.yellow, 14); txt(ctx, 'write guidance & rules', 860, 120, HAND(700, 38)); }); return; }
    // restrict sales of single-family homes to large investors — but built-to-rent is exempt
    for (let i = 0; i < 3; i++) K.house(ctx, 560 + i * 150, 600, .5, { wall: '#ffcf7a' });
    sh(ctx, c => c.rect(470, 540, 14, 70), '#9aa0a6', 3); ctx.save(); ctx.translate(477, 560); ctx.rotate(at(178.6) > 0 ? 0 : -1.2); for (let i = 0; i < 6; i++) sh(ctx, c => c.rect(i * 60, -14, 60, 28), i % 2 ? '#fff' : P.red, 3); ctx.restore();
    banker(ctx, 380, 660, .62, t, { look: [.6, 0], mouth: at(183.29) > 0 ? 'grin' : 'frown', brows: at(183.29) > 0 ? 'up' : 'worried' });
    popAt(ctx, 700, 250, at(178.44), () => { K.card(ctx, 520, 210, 360, 80, P.red, 14); txt(ctx, 'single-family: restricted', 700, 250, HAND(700, 34), '#fff'); });
    if (at(183.29) > 0) { sh(ctx, c => c.rect(1010, 330, 240, 280), '#c8ecff', 5); for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 3; c2++) sh(ctx, c => c.rect(1030 + c2 * 74, 350 + r * 80, 50, 50), '#fff', 3); txt(ctx, 'BUILT TO RENT', 1130, 312, PRINT(22));
      popAt(ctx, 1130, 250, at(183.4), () => { K.card(ctx, 1010, 214, 240, 70, P.green, 14); txt(ctx, 'exempt ✓', 1130, 249, HAND(700, 38), '#fff'); }); }
    K.source(ctx, 'Source: Cooley, Jan 2026', at(170));
  }
  function houseGrid(ctx, x0, y0, cols, rows, dx, dy, s, hot, kAppear, t) { let n = 0; for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++, n++) { const k = clamp(kAppear * 2 - n / (rows * cols)); if (k <= 0) continue; const x = x0 + c2 * dx, y = y0 + r * dy, h = hot(n);
    ctx.save(); ctx.translate(x, y); ctx.scale(s * back(k), s * back(k)); K.house(ctx, 0, 0, 1, { wall: h ? '#d7d0ff' : '#fff', roof: h ? '#1f1c1a' : '#c4c8ce', doorColor: h ? '#1f1c1a' : '#b9c0c9' }); if (h) { sh(ctx, c => c.rect(-46, -330, 92, 70), '#1f1c1a', 3); sh(ctx, c => c.rect(-70, -266, 140, 14), '#1f1c1a', 3); } ctx.restore(); } }
  function g4(ctx, lt, dur, t) { // how big are investors? nationally ~3–3.8% of single-family RENTALS wear the top hat; in their top 20 metros 12.4%; and they buy <2% of all homes (a shopping cart)
    const T0 = 186.42, at = s => lt - (s - T0);
    if (at(201.19) < 0) { K.bg.sky(ctx); ground(ctx, '#9fd97f', 640);
      popAt(ctx, 520, 50, at(186.67), () => txt(ctx, 'How big are these investors, really?', 520, 50, HAND(700, 44)));
      K.logo(ctx, 'econofact', 1130, 60, 170, at(189.92), { pad: 6 });
      const hot = n => at(193.74) > 0 && (n === 23 || n === 61 || n === 87 || (at(195.14) > 0 && n === 44));
      houseGrid(ctx, 150, 170, 20, 5, 52, 96, .14, hot, clamp(at(191.08) / 1.5), t);
      popAt(ctx, 640, 120, at(193.74), () => { K.card(ctx, 330, 86, 620, 66, '#fff', 14); txt(ctx, '≈ 3–3.8 in 100 single-family RENTALS', 640, 119, HAND(700, 34), '#3d2f7a'); });
      K.source(ctx, 'Source: EconoFact, Sep 19, 2025 (Brookings · Urban Institute)', at(190)); return; }
    if (at(206.05) < 0) { K.bg.color(ctx, '#ffe7c7'); // zoom into their top 20 metros: a skyline, 12 in 100
      for (let i = 0; i < 12; i++) sh(ctx, c => c.rect(40 + i * 105, 120 + (i % 3) * 40, 80, 200 - (i % 3) * 40), '#c9d5e6', 3);
      ground(ctx, '#e8d6b8', 330);
      const hot = n => at(204.15) > 0 && [3, 11, 18, 26, 34, 41, 47, 55, 63, 70, 82, 91].includes(n);
      houseGrid(ctx, 150, 400, 20, 5, 52, 70, .12, hot, clamp(at(201.4) / 1.0), t);
      popAt(ctx, 640, 70, at(201.48), () => { K.card(ctx, 420, 34, 440, 74, '#1f1c1a', 14, 0); txt(ctx, 'their top 20 metros', 640, 71, HAND(700, 40), '#fff'); });
      if (at(204.32) > 0) popAt(ctx, 1110, 200, at(204.32), () => { K.card(ctx, 990, 160, 240, 80, P.red, 14); txt(ctx, '12.4%', 1110, 200, HAND(700, 52), '#fff'); });
      return; }
    // buying fewer than 2 of every 100 homes: a parade of purchases, the investor's cart holds 2
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 600);
    for (let i = 0; i < 14; i++) { const x = ((lt * 80 + i * 100) % 1500) - 120; K.house(ctx, x, 470, .3, { wall: ['#ffcf7a', '#c8ecff', '#ffd3e0', '#d7f0c6'][i % 4] }); }
    txt(ctx, 'all home purchases →', 1080, 330, HAND(700, 34), INK, 'center', clamp(at(206.3) / .3));
    banker(ctx, 300, 660, .7, t, { look: [.8, 0], mouth: 'smirk' }, { armR: [1.6, -.4] });
    sh(ctx, c => { c.moveTo(390, 540); c.lineTo(600, 540); c.lineTo(580, 620); c.lineTo(410, 620); c.closePath(); }, '#c9ced6', 4); for (const wx of [430, 560]) sh(ctx, c => c.arc(wx, 640, 14, 0, 7), INK, 0);
    K.house(ctx, 460, 560, .22, { wall: '#d7d0ff', roof: '#1f1c1a' }); K.house(ctx, 530, 560, .22, { wall: '#d7d0ff', roof: '#1f1c1a' });
    popAt(ctx, 500, 180, at(207.02), () => { K.card(ctx, 330, 140, 340, 80, P.green, 16); txt(ctx, '< 2 in 100 purchases', 500, 180, HAND(700, 38), '#fff'); });
    if (at(209.29) > 0) K.nameCard(ctx, 'John Burns Research & Consulting', null, 900, 650, at(209.29));
  }
  function g5(ctx, lt, dur, t) { // in certain cities they matter; nationally a small slice — supporters vs critics (AEI on a Senate proposal) — both have a point; fight isn't over
    const T0 = 211.53, at = s => lt - (s - T0);
    if (at(217.72) < 0) {
      K.bg.cream(ctx);
      popAt(ctx, 340, 360, at(212.14), () => { K.card(ctx, 140, 160, 400, 400, '#fff', 22); txt(ctx, 'certain cities', 340, 210, HAND(700, 44)); for (let i = 0; i < 6; i++) K.house(ctx, 230 + (i % 3) * 110, 340 + Math.floor(i / 3) * 140, .32, { wall: i < 2 ? '#ffd2cc' : '#fff', roof: i < 2 ? P.red : '#c4c8ce' }); txt(ctx, 'can matter a lot', 340, 520, HAND(700, 36), P.red); });
      popAt(ctx, 940, 360, at(215.14), () => { K.card(ctx, 740, 160, 400, 400, '#fff', 22); txt(ctx, 'nationally', 940, 210, HAND(700, 44)); });
      if (at(215.3) > 0) Ch.donut(ctx, { x: 940, y: 370, r: 110, lt: at(215.3), thickness: 50, slices: [{ value: 3.8, color: P.red, pop: true }, { value: 96.2, color: '#e3e7ec' }] });
      if (at(216.21) > 0) txt(ctx, 'a small slice', 940, 520, HAND(700, 36), P.blue, 'center', clamp(at(216.21) / .3));
      return;
    }
    K.bg.white(ctx);
    // a balance: supporters left, critics right
    const tilt = Math.sin(lt * 1.3) * .05; ctx.save(); ctx.translate(640, 300); sh(ctx, c => { c.moveTo(-30, 260); c.lineTo(0, 0); c.lineTo(30, 260); c.closePath(); }, '#9aa0a6'); ctx.rotate(tilt); sh(ctx, c => c.roundRect(-420, -10, 840, 20, 10), '#8a5a36'); ctx.restore();
    const sideY = s => 300 + Math.sin(tilt) * s * 400;
    popAt(ctx, 300, sideY(-1) + 120, at(217.72), () => { K.card(ctx, 110, sideY(-1) + 30, 380, 200, '#e4f6e6', 20); txt(ctx, 'Supporters', 300, sideY(-1) + 75, HAND(700, 44), P.green); K.wrap(ctx, "big investors shouldn't compete with first-time families", PRINT(24), 330).forEach((l, i) => txt(ctx, l, 300, sideY(-1) + 125 + i * 30, PRINT(24))); });
    popAt(ctx, 980, sideY(1) + 120, at(222.33), () => { K.card(ctx, 790, sideY(1) + 30, 380, 200, '#fde6e2', 20); txt(ctx, 'Critics (AEI)', 980, sideY(1) + 75, HAND(700, 44), P.red); K.wrap(ctx, 'could cut rental supply and hurt lower-income families', PRINT(24), 330).forEach((l, i) => txt(ctx, l, 980, sideY(1) + 125 + i * 30, PRINT(24))); });
    if (at(224.0) > 0) txt(ctx, 'writing about a similar Senate proposal', 980, sideY(1) + 260, PRINT(19), '#6b717a', 'center', clamp(at(225.3) / .3));
    if (at(233.61) > 0) popAt(ctx, 640, 640, at(233.61), () => { K.card(ctx, 380, 600, 520, 80, P.yellow, 16); txt(ctx, 'both sides have a point', 640, 640, HAND(700, 44)); });
    if (at(235.3) > 0) popAt(ctx, 640, 120, at(235.3), () => { K.card(ctx, 450, 80, 380, 80, '#1f1c1a', 16, 0); txt(ctx, 'fight not over', 640, 120, HAND(700, 46), '#fff'); });
    K.source(ctx, 'Source: AEI, Apr 2026', at(222.5));
  }
  function g6(ctx, lt, dur, t) { // idea #2: make the mortgage longer — Nov 2025, Trump and FHFA director Bill Pulte floated a 50-year mortgage
    K.bg.sky(ctx); const T0 = 237.08, at = s => lt - (s - T0);
    popAt(ctx, 640, 80, at(237.1), () => { K.card(ctx, 330, 40, 620, 80, '#1f1c1a', 18, 0); txt(ctx, 'Idea #2: make the mortgage longer', 640, 81, HAND(700, 46), '#fff'); });
    popAt(ctx, 1080, 200, at(240.68), () => { K.card(ctx, 960, 160, 240, 80, P.yellow, 16); txt(ctx, 'Nov 2025', 1080, 200, HAND(700, 46)); });
    popAt(ctx, 300, 660, at(242.47), () => trump(ctx, 300, 660, .95, t, { mouth: 'grin' }, { armR: [2.3, .2] }));
    popAt(ctx, 520, 660, at(244.93), () => pulte(ctx, 520, 660, .95, t, {}, { armL: [2.3, .2] }));
    K.nameCard(ctx, 'Bill Pulte', 'FHFA Director', 560, 220, at(245.33));
    // the floated idea: a balloon
    if (at(246.42) > 0) { const k = at(246.42), by = lerp(560, 330, out(k / 1.5)) + Math.sin(lt * 2) * 8; Tn.line(ctx, [[410, 420], [900, by + 110]], 3, INK); popAt(ctx, 900, by, k, () => { sh(ctx, c => c.ellipse(900, by, 150, 120, 0, 0, 7), P.red, 5); txt(ctx, '50-year', 900, by - 20, HAND(700, 56), '#fff'); txt(ctx, 'mortgage', 900, by + 30, HAND(700, 44), '#fff'); }); }
  }
  function g7(ctx, lt, dur, t) { // the pitch: stretch the loan like taffy (30 → 50 years) and the monthly bill gets thinner — $2,642 → ~$2,407, save ~$235 a month
    K.bg.cream(ctx); ground(ctx, '#e8d6b8', 620); const T0 = 249.1, at = s => lt - (s - T0);
    popAt(ctx, 640, 60, at(249.2), () => txt(ctx, 'The pitch: stretch the loan', 640, 60, HAND(700, 50)));
    const k = clamp(at(250.51) / 1.6), half = lerp(230, 430, inout(k)), wob = Math.sin(t * 6) * 6 * (1 - k);
    // two characters pull a taffy loan
    trump(ctx, 640 - half - 70, 660, .7, t, { mouth: 'grin' }, { lean: -.15, armR: [1.6, -.2] }); pulte(ctx, 640 + half + 70, 660, .7, t, {}, { lean: .15, armL: [1.6, -.2] });
    sh(ctx, c => { c.moveTo(640 - half, 400); c.quadraticCurveTo(640, 400 + 40 * k + wob, 640 + half, 400); c.lineTo(640 + half, 470); c.quadraticCurveTo(640, 470 - 30 * k + wob, 640 - half, 470); c.closePath(); }, P.pink, 5);
    txt(ctx, Math.round(lerp(30, 50, inout(k))) + '-year loan', 640, 436 + 5 * k, HAND(700, 42), '#7a2440');
    if (at(252.9) > 0) txt(ctx, 'monthly payment goes down ✓', 640, 150, HAND(700, 40), P.green, 'center', clamp(at(252.9) / .3));
    // the monthly bill above shrinks
    if (at(256.34) > 0) { const sk = at(259.93) > 0 ? out(clamp(at(259.93) / .8)) : 0, amt = at(261.71) > 0 ? '$2,407' : '$2,642';
      popAt(ctx, 640, 260, at(256.34), () => { ctx.save(); ctx.translate(640, 270); ctx.scale(lerp(1, .9, sk), 1); sh(ctx, c => c.roundRect(-140, -70, 280, 140, 14), '#fff', 5); txt(ctx, 'monthly bill', 0, -38, PRINT(22)); txt(ctx, amt, 0, 20, HAND(700, 64), at(261.71) > 0 ? P.green : P.red); ctx.restore(); }); }
    if (at(265.66) > 0) popAt(ctx, 1080, 260, at(265.66), () => { K.card(ctx, 940, 220, 280, 80, P.green, 16); txt(ctx, 'save ≈ $235/mo', 1080, 260, HAND(700, 40), '#fff'); });
    if (at(257) > 0) txt(ctx, 'Our math: $386,190 loan at 7.28%, principal + interest', 640, 700, PRINT(18), '#55606b', 'center', clamp(at(257) / .4));
  }
  function g8(ctx, lt, dur, t) { // total interest: the lender's piles — 30-year ~$565,000 vs 50-year ~$1.06 million — Joel Berner: "almost double…"
    const T0 = 267.97, at = s => lt - (s - T0);
    if (at(281.39) < 0) {
      K.bg.cream(ctx); ground(ctx, '#e8d6b8', 620);
      popAt(ctx, 640, 60, at(268.12), () => txt(ctx, 'Total interest you pay the lender', 640, 60, HAND(700, 48)));
      const pile = (x, v, lbl, a, col) => { const k = a > 0 ? out(clamp(a / 1.2)) : 0, h = 440 * v / 1.1e6 * k; for (let i = 0; i < h / 14; i++) sh(ctx, c => c.roundRect(x - 90, 620 - (i + 1) * 14, 180, 14, 3), i % 2 ? '#7cc46a' : '#6ab45a', 2.5);
        txt(ctx, lbl, x, 655, PRINT(26), INK, 'center', clamp((a + 1.2) / .3)); if (a > 0) popAt(ctx, x, 620 - h - 40, a, () => { K.card(ctx, x - 110, 620 - h - 72, 220, 64, col, 14); txt(ctx, v >= 1e6 ? '≈ $' + (v / 1e6 * k).toFixed(2) + 'M' : '≈ $' + Math.round(v * k / 1000) + 'K', x, 620 - h - 40, HAND(700, 42), '#fff'); }); };
      pile(400, 565059, '30-year loan', at(271.74), P.blue); pile(820, 1057871, '50-year loan', at(278.66), P.red);
      banker(ctx, 1100, 660, .7, t, { mouth: at(278.66) > 0 ? 'grin' : 'smirk', brows: at(278.66) > 0 ? 'up' : 'calm', look: [-.8, -.2] }, { armL: at(278.66) > 0 ? [2.5, .1] : [.3, .2] });
      if (at(278.66) > 0) popAt(ctx, 1100, 250, at(279.0), () => { K.card(ctx, 1000, 215, 200, 70, '#fff', 14); txt(ctx, 'the lender', 1100, 250, HAND(700, 36)); });
      txt(ctx, 'Our math: $386,190 at 7.28%', 640, 700, PRINT(18), '#55606b', 'center', clamp(at(272) / .4)); return;
    }
    K.bg.studio(ctx, '#c6ecd9', '#f1fbf5');
    quoteShot(ctx, at, 'Joel Berner', 'Senior Economist, Realtor.com', 282.17, () => popAt(ctx, 290, 650, at(281.5), () => berner(ctx, 290, 650, 1.15, t, {})),
      [['"A 50-year mortgage results in almost double the interest payments of a 30-year mortgage…', 286.03, 250], ['…and a longer path to meaningful home equity."', 290.71, 480, '#fff4d6']], 'Source: FOX 5 NY, Nov 11, 2025');
    K.logo(ctx, 'realtor', 560, 650, 170, at(283.0), { pad: 6 });
  }
  function g9(ctx, lt, dur, t) { // the bigger problem: if everyone can afford a bigger payment, sellers raise prices — same house, higher price, debt till you're 80
    K.bg.sky(ctx); ground(ctx); const T0 = 293.82, at = s => lt - (s - T0);
    K.house(ctx, 640, 600, 1.4);
    const up = at(300.17) > 0;
    popAt(ctx, 640, 150, at(294.0), () => { K.card(ctx, 440, 100, 400, 100, '#fff', 18); txt(ctx, up ? '$429,100 + ?' : '$429,100', 640, 150, HAND(700, 60), up ? P.red : INK); });
    if (at(300.17) > 0) I.draw(ctx, 'arrowUp', 850, 150, 70, 1);
    if (at(296.47) > 0 && at(304.69) < 0) popAt(ctx, 190, 300, at(296.47), () => { K.card(ctx, 60, 240, 260, 120, '#fff', 18); txt(ctx, 'bigger monthly', 190, 285, HAND(700, 36)); txt(ctx, 'budget', 190, 325, HAND(700, 36)); });
    if (at(299.52) > 0) popAt(ctx, 1090, 300, at(299.52), () => { bean(ctx, 1090, 640, .8, t, { skin: 'white', hair: 'side', hairColor: '#3a2a1e', body: P.purple, top: 'suit', tie: P.yellow, face: { mouth: 'grin', brows: 'up' }, armR: [2.4, .2] }); });
    if (at(304.69) > 0) popAt(ctx, 280, 600, at(304.69), () => { bean(ctx, 260, 640, .8, t, { skin: 'white', hair: 'bald', body: P.teal, face: { mouth: 'frown', brows: 'sad', look: [.6, -.2] }, glasses: true, lean: .06, armR: [.4, .1] }); Tn.line(ctx, [[322, 560], [330, 640]], 6, '#8a5a36'); K.card(ctx, 160, 330, 200, 70, P.red, 14); txt(ctx, 'paying till 80', 260, 365, HAND(700, 34), '#fff'); });
    K.stamp(ctx, 'SAME HOUSE', 640, 400, at(302.45), { color: P.blue, size: 50 });
      }
  function g10(ctx, lt, dur, t) { // the real question: if the age barely changed — early 30s — who exactly is getting through the door?
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6'); const T0 = 307.57, at = s => lt - (s - T0);
    host(ctx, 300, 700, 1.1, t, [[T0, 'presentBoth'], [309.9, 'count'], [315.4, 'pointSide']], { mouth: 'flat', brows: at(315.5) > 0 ? 'up' : 'neutral', look: [.6, 0] });
    popAt(ctx, 860, 160, at(310.0), () => { K.card(ctx, 640, 110, 440, 100, '#fff', 20); txt(ctx, 'age: barely changed', 860, 160, HAND(700, 46), P.green); });
    popAt(ctx, 860, 290, at(314.19), () => { K.card(ctx, 680, 245, 360, 90, '#fff', 18); txt(ctx, 'still early 30s', 860, 290, HAND(700, 44)); });
    if (at(315.5) > 0) { popAt(ctx, 900, 520, at(315.5), () => { sh(ctx, c => c.roundRect(820, 380, 160, 250, [14, 14, 0, 0]), '#4a7bd0', 5); ctx.fillStyle = P.yellow; ctx.beginPath(); ctx.arc(955, 510, 8, 0, 7); ctx.fill(); txt(ctx, '?', 900, 500, HAND(700, 120), '#fff'); }); }
  }

  const SH = [
    [0, 15.7, f1], [15.7, 33.5, f2], [33.5, 50.6, f3], [50.6, 59.42, f3b], [59.42, 73.88, f4], [73.88, 89.22, f5], [89.22, 113.21, f6], [113.21, 124.55, f7], [124.55, 143.12, f8],
    [143.12, 152.14, g1], [152.14, 163.53, g2], [163.53, 186.42, g3], [186.42, 211.53, g4], [211.53, 237.08, g5], [237.08, 249.1, g6], [249.1, 267.97, g7], [267.97, 293.82, g8], [293.82, 307.57, g9], [307.57, 317.57, g10],
  ];
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 })).concat([1.7, 29.71, 35.76, 132.39, 140.57, 144.82, 169.94, 217.72, 281.39].map(t => ({ t, type: 'swoosh', gain: .4 })));
  const pops = [9.2, 10.9, 14.3, 17.8, 26.1, 38.1, 35.9, 40.0, 41.9, 45.4, 49.2, 50.9, 52.2, 55.2, 61.6, 64.8, 69.6, 72.2, 75.9, 79.4, 84.9, 89.4, 96.1, 100.7, 103.4, 108.1, 122.0, 126.8, 132.9, 135.3, 145.9, 146.2, 147.1, 149.9, 152.2, 155.3, 157.3, 158.4, 164.0, 172.4, 173.4, 175.2, 178.4, 183.3, 189.9, 191.7, 196.0, 201.4, 206.1, 209.3, 212.1, 215.1, 222.3, 233.6, 235.3, 237.1, 240.7, 242.5, 244.9, 249.2, 256.3, 259.9, 265.7, 268.1, 282.2, 286.0, 290.7, 294.0, 296.5, 299.5, 304.7, 310.0, 314.2, 315.5]
    .map(t => ({ t, type: 'pop', gain: .5 }));
  const hits = [[0, 'whoosh'], [9.11, 'ding'], [21.51, 'ding'], [23.38, 'stamp'], [41.92, 'thud'], [44.12, 'buzz'], [69.55, 'thud'], [85.0, 'cash'], [94.17, 'tick'], [98.79, 'buzz'], [106.48, 'stamp'], [130.11, 'thud'], [143.12, 'whoosh'], [158.0, 'type'], [168.27, 'stamp'], [193.74, 'tick'], [204.32, 'tick'], [207.02, 'tick'], [246.42, 'rise'], [250.51, 'boing'], [262.0, 'ding'], [278.66, 'thud'], [300.17, 'rise'], [302.45, 'stamp']]
    .map(([t, type]) => ({ t, type, gain: .6 }));
  G.Show = { duration: 317.57, narration: '../biz/assets/audio/housing-04-ch5-6.mp3', shots, sfx: cuts.concat(pops, hits),
    moods: [{ t: 0, mood: 'soft' }, { t: 15.7, mood: 'bright' }, { t: 33.5, mood: 'tense' }, { t: 73.88, mood: 'soft' }, { t: 124.55, mood: 'tense' }, { t: 143.12, mood: 'bright' }, { t: 163.53, mood: 'soft' }, { t: 237.08, mood: 'bright' }, { t: 267.97, mood: 'soft' }, { t: 293.82, mood: 'tense' }],
    images: { freddie: 'assets/housing/freddie-mac.jpg', fed: 'assets/housing/federal-reserve-seal.webp', jchs: 'assets/housing/harvard-jchs.webp', whitehouse: 'assets/housing/white-house.webp', cooley: 'assets/housing/cooley.jpg', econofact: 'assets/housing/econofact.png', realtor: 'assets/housing/realtor.png' },
    fonts: ['700 40px Caveat', '40px "Patrick Hand"'] };
})(window);
