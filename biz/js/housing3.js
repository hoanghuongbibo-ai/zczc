/* "Why Americans Can't Buy a House Until 40" — part 3: CHAPTER 3 (The Golden Handcuffs) + CHAPTER 4 (Who's Sitting in
 * the Big Houses). Voice: assets/audio/housing-03-ch3-4.mp3; shot times are the narration's word times. */
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
  function cuffs(ctx, x, y, s, rot = 0, col = '#f6c945') { // golden handcuffs
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    for (const dx of [-60, 60]) { ctx.beginPath(); ctx.arc(dx, 0, 44, 0, 7); ctx.arc(dx, 0, 28, 0, 7, true); ctx.fillStyle = col; ctx.fill('evenodd'); ctx.lineWidth = 4.5; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(dx, 0, 44, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(dx, 0, 28, 0, 7); ctx.stroke(); sh(ctx, c => c.roundRect(dx - 12, -58, 24, 20, 5), col, 3.5); }
    for (let i = 0; i < 3; i++) sh(ctx, c => c.ellipse(-22 + i * 22, -50, 12, 7, 0, 0, 7), null, 4);
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.arc(-72, -14, 6, 0, 7); ctx.arc(48, -14, 6, 0, 7); ctx.fill();
    ctx.restore();
  }
  function rateTag(ctx, x, y, text, col, lt) { popAt(ctx, x, y, lt, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-.06); sh(ctx, c => { c.moveTo(-70, -36); c.lineTo(60, -36); c.lineTo(90, 0); c.lineTo(60, 36); c.lineTo(-70, 36); c.closePath(); }, col, 4.5); txt(ctx, text, -6, 2, HAND(700, 50), '#fff'); ctx.restore(); }); }

  // ================= CHAPTER 3: THE GOLDEN HANDCUFFS =================
  function d1(ctx, lt, dur, t) { // pandemic: rates slid to the lowest ever recorded — a playground slide down to 2.65% (Jan 2021, Freddie Mac)
    if (lt < 1.7) { K.chapterCard(ctx, lt, 3, 'The Golden Handcuffs', '#c9962b'); if (lt > .5) cuffs(ctx, 640, 545, .9 * back((lt - .5) / .4), -.08); return; }
    K.bg.sky(ctx); ground(ctx, '#7ccf55', 620); const at = s => lt - s;
    txt(ctx, '30-year mortgage rate', 640, 60, HAND(700, 44), INK, 'center', clamp(at(1.8) / .3));
    // the slide
    sh(ctx, c => c.rect(150, 200, 18, 420), '#9aa0a6', 3); sh(ctx, c => c.rect(250, 200, 18, 420), '#9aa0a6', 3); for (let y = 240; y < 620; y += 50) Tn.line(ctx, [[160, y], [258, y]], 5, '#9aa0a6');
    sh(ctx, c => { c.moveTo(250, 200); c.bezierCurveTo(500, 220, 560, 560, 820, 590); c.lineTo(820, 620); c.bezierCurveTo(540, 600, 480, 260, 250, 236); c.closePath(); }, P.yellow, 5);
    // you, sliding down
    const k = clamp(at(2.0) / 2.6), e = k * k, sx = lerp(250, 800, e), sy = (() => { const u = e; return Math.pow(1 - u, 3) * 200 + 3 * Math.pow(1 - u, 2) * u * 220 + 3 * (1 - u) * u * u * 560 + u * u * u * 590; })();
    bean(ctx, sx, sy + 10, .45, t, Object.assign({ face: { mouth: 'grin', brows: 'up' }, armR: [2.5, .1], armL: [2.5, .1], lean: -.3 * (1 - e) }, YOU));
    txt(ctx, 'wheee…', sx + 60, sy - 140, HAND(700, 36), P.green, 'center', k > .05 && k < 1 ? 1 : 0);
    K.stamp(ctx, 'LOWEST EVER RECORDED', 560, 150, at(2.6), { color: P.green, size: 44, rot: .05 });
    popAt(ctx, 1040, 450, at(4.7), () => { K.card(ctx, 880, 360, 320, 190, '#fff', 22); txt(ctx, 'January 2021', 1040, 400, HAND(700, 40)); });
    if (at(9.23) > 0) Ch.counter(ctx, { x: 1040, y: 485, value: 2.65, decimals: 2, suffix: '%', lt: at(9.23), dur: .9, size: 96, color: P.green });
    K.logo(ctx, 'freddie', 1040, 620, 260, at(7.0), { crop: [85, 90, 425, 110], pad: 8 });
    K.source(ctx, 'Source: Freddie Mac, Jan 7, 2021', at(7.2));
  }
  function d2(ctx, lt, dur, t) { // by early 2022 about a quarter of mortgages were below 3% — congratulations, you won the lottery
    const T0 = 11.5, at = s => lt - (s - T0);
    if (at(18.64) < 0) {
      K.bg.cream(ctx);
      popAt(ctx, 640, 70, at(11.6), () => { K.card(ctx, 500, 32, 280, 76, P.yellow, 16); txt(ctx, 'Early 2022', 640, 70, HAND(700, 46)); });
      for (let i = 0; i < 100; i++) { const cx = 330 + (i % 10) * 62, cy = 150 + Math.floor(i / 10) * 50, k = clamp((at(13.43) - i * .006) / .25); if (k <= 0) continue; const hot = (i % 4 === 0) && at(15.98) > 0;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(back(k) * .19, back(k) * .19); K.house(ctx, 0, 110, 1, { wall: hot ? P.yellow : '#e6eaf0', roof: hot ? P.orange : '#c4c8ce', doorColor: hot ? P.blue : '#b9c0c9' }); ctx.restore(); }
      if (at(15.98) > 0) popAt(ctx, 1110, 360, at(15.98), () => { K.card(ctx, 990, 270, 240, 180, '#fff', 20); txt(ctx, '≈ 1 in 4', 1110, 330, HAND(700, 54), P.orange); txt(ctx, 'below 3%', 1110, 392, HAND(700, 40)); });
      if (at(16.4) > 0) txt(ctx, '24.6% of mortgages, Q1 2022', 1110, 480, PRINT(20), '#6b717a', 'center', clamp(at(16.4) / .3));
      K.source(ctx, 'Source: FHFA National Mortgage Database via Wolf Street', at(14)); return;
    }
    K.bg.color(ctx, '#ffe58a'); const k = at(18.64);
    for (let i = 0; i < 40; i++) { const r = Tn.rng(i * 31 + 7), x = r() * W * .5 + W * .25 + (r() - .5) * 900, y = -20 + ((k * (180 + r() * 220) + r() * 500) % 780); ctx.save(); ctx.translate(x, y); ctx.rotate(k * 4 + i); ctx.fillStyle = [P.red, P.blue, P.green, P.purple, P.orange][i % 5]; ctx.fillRect(-8, -4, 16, 8); ctx.restore(); }
    popAt(ctx, 640, 330, k, () => { ctx.save(); ctx.translate(640, 330); ctx.rotate(-.05); sh(ctx, c => c.roundRect(-330, -150, 660, 300, 20), '#fff7d6', 6); ctx.setLineDash([12, 10]); sh(ctx, c => c.roundRect(-300, -120, 600, 240, 14), null, 3); ctx.setLineDash([]);
      txt(ctx, 'YOU WON', 0, -50, HAND(700, 96), P.red); txt(ctx, 'a mortgage under 3%', 0, 50, HAND(700, 52)); ctx.restore(); });
  }
  function rocket(ctx, x, y, s, rot, flame, t) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    if (flame) { for (let i = 0; i < 3; i++) sh(ctx, c => c.ellipse(-90 - i * 30, 0, 40 - i * 8 + Math.sin(t * 30 + i) * 6, 20 - i * 4, 0, 0, 7), i % 2 ? P.yellow : P.orange, 0); txt(ctx, 'inflation', -150, 50, HAND(700, 26), P.red); }
    sh(ctx, c => { c.moveTo(80, 0); c.quadraticCurveTo(40, -40, -60, -34); c.lineTo(-60, 34); c.quadraticCurveTo(40, 40, 80, 0); c.closePath(); }, '#fff', 5);
    sh(ctx, c => c.arc(10, 0, 14, 0, 7), '#bfe6ff', 4); sh(ctx, c => { c.moveTo(-50, -30); c.lineTo(-80, -60); c.lineTo(-30, -32); c.closePath(); }, P.red, 4); sh(ctx, c => { c.moveTo(-50, 30); c.lineTo(-80, 60); c.lineTo(-30, 32); c.closePath(); }, P.red, 4);
    txt(ctx, 'RATES', -20, 22, PRINT(14), INK); ctx.restore(); }
  function d3(ctx, lt, dur, t) { // inflation hit and rates rocketed from 2.65% to today's 7.28% — nearly triple
    K.bg.color(ctx, '#20264a'); const T0 = 20.87, at = s => lt - (s - T0);
    for (let i = 0; i < 40; i++) { const r = Tn.rng(i * 17 + 3); ctx.fillStyle = 'rgba(255,255,255,' + (.3 + .5 * Math.abs(Math.sin(t + i))) + ')'; ctx.beginPath(); ctx.arc(r() * W, r() * H, 1.5 + r() * 2, 0, 7); ctx.fill(); }
    const x0 = 230, y0 = 600, x1 = 1000, Y = v => y0 - v * 62;
    Tn.line(ctx, [[x0 - 40, y0], [x1 + 100, y0]], 4, '#fff');
    sh(ctx, c => c.arc(x0, Y(2.65), 12, 0, 7), P.green, 4); txt(ctx, '2.65%', x0, Y(2.65) + 50, HAND(700, 46), '#9df07a'); txt(ctx, 'Jan 2021', x0, y0 + 32, PRINT(26), '#fff');
    popAt(ctx, 440, 110, at(21.07), () => { K.card(ctx, 320, 72, 240, 76, P.red, 16); txt(ctx, 'inflation hits', 440, 110, HAND(700, 44), '#fff'); });
    const k = clamp(at(22.9) / 1.4), e = inout(k), px = f => lerp(x0, x1, f), py = f => lerp(Y(2.65), Y(7.28), f) - Math.sin(f * Math.PI) * 40;
    if (k > 0) { ctx.save(); ctx.setLineDash([10, 10]); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const f = e * i / 40; i ? ctx.lineTo(px(f), py(f)) : ctx.moveTo(px(f), py(f)); } ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.stroke(); ctx.restore();
      const f2 = Math.min(1, e + .01), ang = Math.atan2(py(f2) - py(e), px(f2) - px(e)); rocket(ctx, px(e), py(e), .8, ang, k < 1, t); }
    if (at(24.29) > 0) { popAt(ctx, x1, Y(7.28) - 90, at(24.29), () => { K.card(ctx, x1 - 90, Y(7.28) - 128, 180, 76, P.red, 16); txt(ctx, '7.28%', x1, Y(7.28) - 90, HAND(700, 52), '#fff'); }); txt(ctx, 'Oct 1, 2026', x1, y0 + 32, PRINT(26), '#fff'); }
    if (at(26.36) > 0) popAt(ctx, 640, 660, at(26.36), () => { K.card(ctx, 440, 625, 400, 70, P.yellow, 16); txt(ctx, 'nearly triple (2.75×)', 640, 660, HAND(700, 42)); });
    K.source(ctx, 'Source: Freddie Mac PMMS', at(24.4));
  }
  const FAM = [['short', '#5a3b26', P.blue, 1], ['bob', '#3a2a1e', P.pink, 1], ['short', '#5a3b26', P.yellow, .6], ['bun', '#3a2a1e', P.green, .55]];
  function family(ctx, x, y, s, t, n, face) { for (let i = 0; i < n; i++) { const [hair, hc, body, sc] = FAM[i]; bean(ctx, x + (i - (n - 1) / 2) * 70 * s, y, s * sc, t + i, { skin: 'white', hair, hairColor: hc, body, face }); } }
  function d4(ctx, lt, dur, t) { // the homeowner's side: family outgrows the house — 3% now vs 7% new — moving means a way bigger rate on a way bigger loan — so you stay. Everybody stays.
    const T0 = 28.8, at = s => lt - (s - T0);
    K.bg.sky(ctx); ground(ctx);
    if (at(38.91) < 0) {
      K.house(ctx, 360, 600, 1.2);
      const n = at(32.25) > 0 ? 4 : 2; family(ctx, 360, 640, .55, t, n, { mouth: n > 2 ? 'o' : 'smile', brows: n > 2 ? 'worried' : 'calm' });
      if (at(32.25) > 0) popAt(ctx, 360, 230, at(32.4), () => { K.card(ctx, 240, 190, 240, 76, '#fff', 14); txt(ctx, 'outgrown!', 360, 228, HAND(700, 44), P.red); });
      if (at(33.62) > 0) popAt(ctx, 560, 560, at(33.62), () => { ctx.save(); ctx.translate(560, 600); Tn.line(ctx, [[0, 0], [0, -90]], 6, '#8a5a36'); sh(ctx, c => c.roundRect(-70, -140, 140, 56, 8), '#fff', 4); txt(ctx, 'FOR SALE?', 0, -112, PRINT(26), P.red); ctx.restore(); });
      rateTag(ctx, 360, 120, '3%', P.green, at(35.86));
      popAt(ctx, 960, 600, at(37.06), () => K.house(ctx, 960, 600, 1.6, { wall: '#c8ecff', roof: P.blue }));
      rateTag(ctx, 960, 120, '7%', P.red, at(37.62));
      return;
    }
    if (at(43.44) < 0) { // bigger house, way bigger loan
      K.house(ctx, 340, 600, 1.6, { wall: '#c8ecff', roof: P.blue });
      txt(ctx, 'bigger house', 340, 140, HAND(700, 46), INK, 'center', clamp(at(39.86) / .3));
      const g = clamp(at(41.24) / 1.6); K.doc(ctx, 900, 360, lerp(220, 420, out(g)), lerp(260, 470, out(g)), 'LOAN', ['rate: 7%', 'amount: way bigger', '—', '—'], at(40.9), { titleSize: 50, lineSize: lerp(24, 34, g) });
      return;
    }
    // so you stay. everybody stays.
    const all = at(45.64) > 0;
    for (let i = 0; i < (all ? 5 : 1); i++) { const x = all ? 140 + i * 250 : 640, s = all ? .75 : 1.5; popAt(ctx, x, 560, all ? at(45.7 + i * .1) : 1, () => { K.house(ctx, x, 600, s, { wall: ['#ffcf7a', '#c8ecff', '#ffd3e0', '#d7f0c6', '#ffe1a8'][i], roof: [P.red, P.blue, P.purple, P.green, P.orange][i] }); cuffs(ctx, x, 600 - 75 * s, .32 * s / .75 * (all ? 1 : .7), .1); }); }
    if (at(44.59) > 0) popAt(ctx, 640, 110, at(44.59), () => { K.card(ctx, 420, 66, 440, 90, '#1f1c1a', 18, 0); txt(ctx, all ? 'everybody stays' : 'you stay', 640, 112, HAND(700, 60), '#fff'); });
  }
  function d5(ctx, lt, dur, t) { // the lock-in effect: FHFA measured it — every point the market rate sits above yours adds a lock; the chance you sell drops 18.1%
    K.bg.cream(ctx); const T0 = 47.01, at = s => lt - (s - T0);
    popAt(ctx, 640, 70, at(47.2), () => { K.card(ctx, 380, 28, 520, 84, P.yellow, 18); txt(ctx, 'the LOCK-IN effect', 640, 70, HAND(700, 60)); });
    K.logo(ctx, 'fhfa', 1150, 90, 130, at(49.5), { crop: [135, 28, 370, 370], pad: 6, round: 65 });
    // the front door with locks piling up
    sh(ctx, c => c.rect(170, 180, 340, 460), '#ffcf7a', 5); sh(ctx, c => c.roundRect(250, 260, 180, 380, [14, 14, 0, 0]), '#4a7bd0', 5); ctx.fillStyle = P.yellow; ctx.beginPath(); ctx.arc(405, 460, 8, 0, 7); ctx.fill();
    const locks = at(54.37) > 0 ? Math.min(3, 1 + Math.floor(at(54.37) / 1.4)) : 0;
    for (let i = 0; i < locks; i++) { const ly = 330 + i * 90; popAt(ctx, 340, ly, at(54.37 + i * 1.4), () => { sh(ctx, c => c.arc(340, ly - 14, 20, Math.PI, 0), null, 7, '#5d6166'); sh(ctx, c => c.roundRect(310, ly - 14, 60, 50, 8), P.yellow, 4); sh(ctx, c => c.arc(340, ly + 8, 6, 0, 7), INK, 0); }); }
    if (at(53.05) > 0) K.doc(ctx, 640, 470, 240, 230, 'FHFA Working Paper 24-03', ['—', 'lock-in effect', 'Mar 2024'], at(53.05), { rot: -.05, titleSize: 28 });
    popAt(ctx, 640, 230, at(54.37), () => { K.card(ctx, 530, 190, 220, 80, '#c8ecff', 16); txt(ctx, '+1 point gap', 640, 230, HAND(700, 40), P.blue); });
    // the "chance you sell" thermometer
    sh(ctx, c => c.roundRect(980, 200, 80, 380, 40), '#fff', 5); const lvl = at(58.44) > 0 ? lerp(1, .819, out(clamp(at(58.44) / 1.2))) : 1;
    ctx.save(); ctx.beginPath(); ctx.roundRect(984, 204, 72, 372, 36); ctx.clip(); ctx.fillStyle = P.green; ctx.fillRect(984, 576 - 372 * lvl * .9, 72, 372); ctx.restore();
    txt(ctx, 'chance', 1020, 610, PRINT(24)); txt(ctx, 'you sell', 1020, 636, PRINT(24));
    if (at(60.24) > 0) popAt(ctx, 880, 300, at(60.24), () => { K.card(ctx, 780, 255, 200, 90, P.red, 16); txt(ctx, '−18.1%', 880, 300, HAND(700, 56), '#fff'); });
    K.source(ctx, 'Source: FHFA Working Paper 24-03, Mar 18, 2024 (per percentage point of rate gap)', at(53.2));
  }
  const popAtK = lt => lt <= 0 ? 0 : back(lt / .35);
  function d6(ctx, lt, dur, t) { // across the country: lock-in prevented about 1.33 million sales, mid-2022 to late 2023
    K.bg.cream(ctx); const T0 = 62.15, at = s => lt - (s - T0);
    for (let i = 0; i < 30; i++) { const cx = 150 + (i % 10) * 110, cy = 220 + Math.floor(i / 10) * 120, k = clamp((at(62.75) - i * .02) / .25); if (k <= 0) continue;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(back(k) * .3, back(k) * .3); K.house(ctx, 0, 110, 1, { wall: '#fff', roof: '#c4c8ce' }); ctx.restore();
      if (at(65.38) > i * .03) K.cross(ctx, cx, cy + 6, 46, clamp((at(65.38) - i * .03) / .3)); }
    if (at(66.04) > 0) { popAt(ctx, 640, 640, at(66.04), () => K.card(ctx, 340, 595, 600, 96, '#fff', 20)); Ch.counter(ctx, { x: 560, y: 642, value: 1.33, decimals: 2, suffix: 'M', lt: at(66.04), dur: 1.0, size: 70, color: P.red }); txt(ctx, 'sales prevented', 800, 645, HAND(700, 40), INK, 'center', clamp(at(67.7) / .3)); }
    popAt(ctx, 640, 90, at(68.28), () => { K.card(ctx, 390, 50, 500, 80, P.yellow, 16); txt(ctx, 'mid-2022 → late 2023', 640, 90, HAND(700, 46)); });
    K.source(ctx, 'Source: FHFA Working Paper 24-03', at(64.5));
  }
  function d7(ctx, lt, dur, t) { // the twist: higher rates should make houses cheaper — FHFA: a tug-of-war on the price — rates pull it down 3.3%, shrinking supply pulls it up 5.7% — backfired
    const T0 = 72.64, at = s => lt - (s - T0);
    if (at(81.96) < 0) {
      K.bg.studio(ctx, '#d9ccff', '#f5f1ff');
      host(ctx, 300, 700, 1.1, t, [[T0, 'pointUp'], [75.4, 'present'], [78.9, 'count']], { mouth: 'flat', brows: 'up', look: [.5, 0] });
      popAt(ctx, 860, 140, at(72.8), () => { K.card(ctx, 640, 90, 440, 100, '#1f1c1a', 18, 0); txt(ctx, 'the twist', 860, 140, HAND(700, 62), P.yellow); });
      popAt(ctx, 860, 300, at(75.42), () => { K.card(ctx, 620, 250, 480, 100, '#fff', 18); txt(ctx, 'higher rates → cheaper?', 860, 300, HAND(700, 46)); });
      popAt(ctx, 740, 470, at(78.96), () => { K.card(ctx, 620, 410, 240, 120, '#fff', 18); I.draw(ctx, 'arrowDown', 690, 470, 60, 1); txt(ctx, 'buyers', 790, 470, HAND(700, 40)); });
      popAt(ctx, 1000, 470, at(80.24), () => { K.card(ctx, 880, 410, 240, 120, '#fff', 18); I.draw(ctx, 'arrowDown', 950, 470, 60, 1); txt(ctx, 'prices', 1050, 470, HAND(700, 40)); });
      return;
    }
    // vertical tug-of-war: a price tag on a rope between a team pulling down and a team pulling up
    K.bg.sky(ctx); ground(ctx, '#7ccf55', 640);
    txt(ctx, 'What actually happened to prices (FHFA)', 520, 50, HAND(700, 42), INK, 'center', clamp(at(82.0) / .3));
    K.logo(ctx, 'fhfa', 1180, 70, 90, at(82.3), { crop: [135, 28, 370, 370], pad: 6, round: 45 });
    const down = at(84.92) > 0 ? out(clamp((at(85.6)) / 1.0)) * 3.3 : 0, up = at(91.11) > 0 ? out(clamp(at(91.8) / 1.2)) * 5.7 : 0, net = up - down, tagY = 360 - net * 30;
    Tn.line(ctx, [[640, 90], [640, 640]], 6, '#c9a26b');
    // the pulley at the top, and the up-team pulling a rope over it
    sh(ctx, c => c.arc(640, 100, 26, 0, 7), '#9aa0a6', 4);
    for (let y = 0; y <= 6; y += 2) { Tn.line(ctx, [[620, 360 + y * 30], [628, 360 + y * 30]], 3, '#8a8f96'); txt(ctx, (y ? '−' : '') + y + '%', 600, 360 + y * 30, PRINT(18), '#55606b', 'right'); if (y) { Tn.line(ctx, [[620, 360 - y * 30], [628, 360 - y * 30]], 3, '#8a8f96'); txt(ctx, '+' + y + '%', 600, 360 - y * 30, PRINT(18), '#55606b', 'right'); } }
    popAt(ctx, 640, tagY, at(82.5), () => { ctx.save(); ctx.translate(640, tagY); sh(ctx, c => { c.moveTo(-70, -34); c.lineTo(50, -34); c.lineTo(80, 0); c.lineTo(50, 34); c.lineTo(-70, 34); c.closePath(); }, '#fff', 5); txt(ctx, 'PRICE', -6, 2, PRINT(26)); ctx.restore(); });
    // team "higher rates" pulls down (left)
    if (at(84.92) > 0) { for (let i = 0; i < 2; i++) bean(ctx, 380 - i * 90, 680, .55, t + i, { skin: 'white', hair: ['short', 'bob'][i], hairColor: '#3a2a1e', body: P.blue, lean: -.2, face: { mouth: 'flat', brows: 'angry', look: [1, -.3] }, armR: [1.6, -.3] }); Tn.line(ctx, [[420, 520], [610, tagY + 20]], 4, '#8a5a36');
      popAt(ctx, 330, 300, at(84.92), () => { K.card(ctx, 190, 250, 280, 100, '#fff', 16); txt(ctx, 'higher rates alone', 330, 285, HAND(700, 30)); txt(ctx, '−' + down.toFixed(1) + '%', 330, 325, HAND(700, 40), P.blue); }); }
    // team "shrinking supply" pulls up (right), rope over the pulley
    if (at(91.11) > 0) { for (let i = 0; i < 3; i++) bean(ctx, 880 + i * 90, 680, .55, t + i + 3, { skin: 'white', hair: ['side', 'bun', 'short'][i], hairColor: '#3a2a1e', body: P.red, lean: .2, face: { mouth: 'flat', brows: 'angry', look: [-1, -.3] }, armL: [1.6, -.3] }); Tn.line(ctx, [[666, 100], [840, 520]], 4, '#8a5a36'); Tn.line(ctx, [[640, 74], [640, tagY - 34]], 4, '#8a5a36');
      popAt(ctx, 960, 300, at(91.18), () => { K.card(ctx, 810, 250, 300, 100, '#fff', 16); txt(ctx, 'shrinking supply (lock-in)', 960, 285, HAND(700, 28)); txt(ctx, '+' + up.toFixed(1) + '%', 960, 325, HAND(700, 40), P.red); }); }
    if (at(95.68) > 0) popAt(ctx, 960, 170, at(95.68), () => { K.card(ctx, 800, 135, 320, 70, P.yellow, 14); txt(ctx, 'more than canceled out', 960, 170, HAND(700, 32)); });
    K.stamp(ctx, 'BACKFIRED', 330, 160, at(100.04), { color: P.red, size: 56, rot: -.1 });
    K.source(ctx, 'Source: FHFA Working Paper 24-03 (two separate effects shown on one price)', at(85));
  }
  function d8(ctx, lt, dur, t) { // still in the handcuffs? end of 2025: about half of mortgages (50.6%) below 4% — nearly 1 in 5 (19.7%) below 3% — a street of 10 houses
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 560); const T0 = 101.99, at = s => lt - (s - T0);
    popAt(ctx, 520, 60, at(102.0), () => txt(ctx, 'Still in the handcuffs?', 520, 60, HAND(700, 52)));
    popAt(ctx, 1090, 60, at(107.89), () => { K.card(ctx, 960, 26, 260, 70, P.yellow, 14); txt(ctx, 'end of 2025', 1090, 61, HAND(700, 40)); });
    for (let i = 0; i < 10; i++) { const x = 100 + (i % 5) * 270, y = i < 5 ? 330 : 560, lock4 = i < 5 && at(110.0 + i * .12) > 0, lock3 = (i === 0 || i === 2) && at(116.2) > 0;
      K.house(ctx, x, y, .62, { wall: lock4 ? '#ffe1a8' : '#eef0f3', roof: lock4 ? (lock3 ? P.orange : P.yellow) : '#c4c8ce' });
      if (lock4) cuffs(ctx, x, y - 60, .3, .1, lock3 ? '#f29b38' : '#f6c945'); }
    if (at(111.98) > 0) popAt(ctx, 640, 150, at(111.98), () => { K.card(ctx, 470, 115, 340, 70, '#fff', 14); txt(ctx, 'below 4%: 50.6%', 640, 150, HAND(700, 40), '#b08a1a'); });
    if (at(116.2) > 0) popAt(ctx, 640, 400, at(116.2), () => { K.card(ctx, 470, 368, 340, 64, '#fff', 14); txt(ctx, 'below 3%: 19.7% (≈1 in 5)', 640, 400, HAND(700, 30), P.orange); });
    K.source(ctx, 'Source: FHFA National Mortgage Database via Wolf Street, Mar 27, 2026 (10 homes = 100%)', at(104.6));
  }
  function d9(ctx, lt, dur, t) { // the result: 2025 existing-home sales 4.06M, lowest since 1995 — median stay 11 years, also a record
    K.bg.cream(ctx); const T0 = 118.64, at = s => lt - (s - T0);
    if (at(130.16) < 0) {
      K.bg.color(ctx, '#f3d9a6'); ctx.fillStyle = '#e8c27e'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
      K.house(ctx, 1060, 570, .8); ctx.save(); ctx.translate(1180, 570); Tn.line(ctx, [[0, 0], [0, -80]], 5, '#8a5a36'); sh(ctx, c => c.roundRect(-70, -128, 140, 50, 6), '#fff', 3.5); txt(ctx, 'OPEN HOUSE', 0, -103, PRINT(20), P.red); ctx.restore();
      { const tw = ((lt * .25) % 1.2) - .1, tx = lerp(-80, 1360, tw), ty = 560 - Math.abs(Math.sin(lt * 4)) * 40; ctx.save(); ctx.translate(tx, ty - 30); ctx.rotate(lt * 5); ctx.strokeStyle = '#a07a3e'; ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(0, 0, 18 + i * 3, i, i + 3.5); ctx.stroke(); } ctx.restore(); }
      popAt(ctx, 640, 90, at(120.65), () => { K.card(ctx, 540, 50, 200, 80, P.yellow, 16); txt(ctx, '2025', 640, 90, HAND(700, 54)); });
      txt(ctx, 'existing homes sold', 640, 200, PRINT(40), INK, 'center', clamp(at(122.44) / .3));
      if (at(122.87) > 0) Ch.counter(ctx, { x: 640, y: 320, value: 4.06, decimals: 2, suffix: ' million', lt: at(122.87), dur: 1.2, size: 120, color: P.blue });
      K.stamp(ctx, 'LOWEST SINCE 1995', 640, 480, at(126.44), { color: P.red, size: 60, rot: -.05 });
      if (at(128.5) > 0) popAt(ctx, 640, 610, at(128.5), () => { K.card(ctx, 470, 570, 340, 80, '#fff', 16); txt(ctx, '30 years ago', 640, 610, HAND(700, 46)); });
      K.source(ctx, 'Source: Scripps News (NAR data), Jan 14, 2026', at(122.5)); return;
    }
    // 11 calendar pages pile up
    popAt(ctx, 640, 90, at(130.3), () => { K.card(ctx, 330, 50, 620, 80, '#fff', 16); txt(ctx, 'median time in a home before selling', 640, 90, HAND(700, 40)); });
    for (let i = 0; i < 11; i++) { const k = at(133.91 + i * .06); if (k <= 0) continue; const x = 300 + (i % 6) * 135, y = 290 + Math.floor(i / 6) * 170;
      popAt(ctx, x, y, k, () => { K.card(ctx, x - 55, y - 60, 110, 120, '#fff', 12, 4); sh(ctx, c => c.roundRect(x - 55, y - 60, 110, 34, [12, 12, 0, 0]), P.red, 4); txt(ctx, String(i + 1), x, y + 18, HAND(700, 52)); }); }
    if (at(134.29) > 0) popAt(ctx, 1080, 470, at(134.29), () => { K.card(ctx, 980, 410, 200, 120, P.blue, 18); txt(ctx, '11 yrs', 1080, 470, HAND(700, 64), '#fff'); });
    K.stamp(ctx, 'RECORD', 1080, 590, at(136.74), { color: P.red, size: 54, rot: .1 });
    K.source(ctx, 'Source: NAR, Nov 4, 2025', at(131));
  }

  // ================= CHAPTER 4: WHO'S SITTING IN THE BIG HOUSES =================
  function bigHouse(ctx, x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); K.house(ctx, -95, 0, 1.15, o); K.house(ctx, 110, 0, .95, o); ctx.restore(); }
  function e1(ctx, lt, dur, t) { // if nobody's selling, who's living in all the family-sized houses? Redfin: Census data on homes with 3+ bedrooms
    const T0 = 137.45, at = s => lt - (s - T0);
    if (lt < 1.7) { K.chapterCard(ctx, lt, 4, "Who's Sitting in the Big Houses", '#2bb3a6'); return; }
    K.bg.sky(ctx); ground(ctx);
    bigHouse(ctx, 640, 600, 1.3, { wall: '#ffe1a8', roof: P.purple });
    if (at(139.21) > 0) txt(ctx, '?', 640, 170, HAND(700, 150), P.purple, 'center', clamp(at(139.4) / .3));
    popAt(ctx, 220, 130, at(140.0), () => { K.card(ctx, 70, 90, 300, 80, '#fff', 16); txt(ctx, 'family-sized homes', 220, 130, HAND(700, 38)); });
    K.logo(ctx, 'redfin', 1080, 120, 200, at(142.08));
    if (at(144.56) > 0) popAt(ctx, 1080, 250, at(144.56), () => { K.card(ctx, 940, 210, 280, 80, P.yellow, 16); txt(ctx, '3+ bedrooms', 1080, 250, HAND(700, 46)); });
  }
  function e2(ctx, lt, dur, t) { // empty-nest boomers own 28.2%, millennials with kids 14.2%, Gen Z with kids 0.3% → about twice as many
    K.bg.white(ctx); const T0 = 146.56, at = s => lt - (s - T0);
    txt(ctx, 'Share of 3+ bedroom homes owned by…', 640, 60, HAND(700, 44), INK, 'center', clamp(lt / .3));
    const rows = [['Empty-nest boomers', 28.2, 150.29, P.purple, 146.56], ['Millennials with kids', 14.2, 154.17, P.blue, 152.5], ['Gen Z with kids', .3, 157.53, P.teal, 155.76]];
    rows.forEach(([label, v, s, col, s0], i) => { const y = 200 + i * 150, k = at(s), kl = at(s0);
      // owners: a little group per row
      if (kl > 0) popAt(ctx, 150, y + 60, kl, () => { if (i === 0) { bean(ctx, 115, y + 70, .38, t, { skin: 'white', hair: 'greyBun', body: P.purple }); bean(ctx, 175, y + 70, .38, t + 1, { skin: 'white', hair: 'bald', body: '#7a8088' }); }
        else { bean(ctx, 110, y + 70, .38, t, { skin: 'white', hair: i === 1 ? 'side' : 'short', hairColor: '#3a2a1e', body: col }); bean(ctx, 160, y + 70, .26, t + 2, { skin: 'white', hair: 'bun', hairColor: '#3a2a1e', body: P.yellow }); bean(ctx, 196, y + 70, .22, t + 3, { skin: 'white', hair: 'short', hairColor: '#3a2a1e', body: P.green }); } });
      txt(ctx, label, 250, y, HAND(700, 38), INK, 'left', clamp(kl / .3));
      const bw = 700 * v / 30 * (k > 0 ? out(k / 1.0) : 0); if (bw > 1) sh(ctx, c => c.roundRect(250, y + 26, Math.max(10, bw), 56, 12), col);
      if (k > 0) txt(ctx, (v * clamp(out(k / 1.0))).toFixed(1) + '%', 270 + Math.max(10, bw), y + 54, HAND(700, 50), INK, 'left'); });
    if (at(161.25) > 0) popAt(ctx, 1090, 560, at(161.25), () => { K.card(ctx, 970, 500, 240, 120, P.yellow, 18); txt(ctx, '≈ 2×', 1090, 545, HAND(700, 60), P.red); txt(ctx, 'boomers vs millennials', 1090, 592, PRINT(19)); });
    K.source(ctx, 'Source: Redfin, Jan 16, 2024 (Census ACS data as of 2022)', at(150.3));
  }
  function e3(ctx, lt, dur, t) { // before the comments turn into a generational war — let's be fair: this isn't some evil boomer plot. It's math.
    K.bg.studio(ctx, '#bfe3ff', '#eef8ff'); const T0 = 165.02, at = s => lt - (s - T0);
    host(ctx, 360, 700, 1.15, t, [[T0, 'presentBoth'], [168.3, 'chest'], [169.6, 'shrug'], [171.6, 'pointUp']], { mouth: at(171.7) > 0 ? 'smile' : 'flat', brows: at(166.57) > 0 && at(168.36) < 0 ? 'worried' : 'neutral', look: [.5, 0] });
    if (at(168.36) < 0) popAt(ctx, 900, 280, at(165.6), () => { K.card(ctx, 700, 200, 400, 160, '#fff', 20); txt(ctx, '⚔️ comments war ⚔️', 900, 280, HAND(700, 46), P.red); });
    K.stamp(ctx, 'NOT A PLOT', 900, 270, at(170.4), { color: '#7a8088', size: 60 });
    if (at(171.7) > 0) popAt(ctx, 900, 470, at(171.7), () => { K.card(ctx, 740, 410, 320, 120, P.green, 22); txt(ctx, "it's math", 900, 470, HAND(700, 66), '#fff'); });
  }
  function e4(ctx, lt, dur, t) { // 54% of boomer owners have no mortgage — PAID OFF — median monthly housing cost $612 (a bill on the fridge). For a house!
    K.bg.cream(ctx); ground(ctx, '#e8d6b8', 620); const T0 = 172.95, at = s => lt - (s - T0);
    K.logo(ctx, 'redfin', 1150, 60, 150, at(173.0), { pad: 8 });
    // a roomy kitchen: the boomer couple relaxing with coffee
    sh(ctx, c => c.rect(820, 260, 150, 360), '#e9eef2', 5); Tn.line(ctx, [[820, 400], [970, 400]], 4, INK); sh(ctx, c => c.rect(940, 300, 10, 60), '#9aa0a6', 2); sh(ctx, c => c.rect(940, 430, 10, 80), '#9aa0a6', 2);
    bean(ctx, 470, 650, .8, t, { skin: 'white', hair: 'greyBun', body: P.purple, top: 'cardigan', face: { mouth: 'smile', brows: 'calm', eyes: .3 }, armR: [1.3, -.6] });
    bean(ctx, 700, 650, .8, t + 1, { skin: 'white', hair: 'bald', glasses: true, body: '#7a8088', face: { mouth: 'smile', brows: 'calm' }, armL: [1.3, -.6] });
    for (const [x, y] of [[588, 425], [600, 425]]) { sh(ctx, c => c.roundRect(x - 12, y - 14, 24, 28, 5), '#fff', 3); } ctx.save(); ctx.globalAlpha = .5; Tn.line(ctx, [[592, 405], [596 + Math.sin(t * 3) * 6, 380]], 3, '#9aa3ad'); ctx.restore();
    // the mortgage, stamped PAID OFF
    if (at(173.88) > 0) K.doc(ctx, 230, 330, 260, 300, 'MORTGAGE', ['—', '—', '—', '—'], at(173.88), { rot: -.06, titleSize: 44 });
    K.stamp(ctx, 'PAID OFF', 230, 350, at(176.15), { color: P.green, size: 56, rot: -.15 });
    if (at(173.88) > 0) popAt(ctx, 230, 560, at(174.2), () => { K.card(ctx, 70, 525, 320, 70, P.green, 14); txt(ctx, '54% of boomer owners', 230, 560, HAND(700, 34), '#fff'); });
    // the bill on the fridge
    if (at(178.0) > 0) popAt(ctx, 895, 330, at(178.0), () => { ctx.save(); ctx.translate(895, 330); ctx.rotate(.06); sh(ctx, c => c.rect(-60, -50, 120, 100), '#fff', 3.5); sh(ctx, c => c.arc(0, -50, 8, 0, 7), P.red, 2); txt(ctx, 'housing', 0, -24, PRINT(18)); txt(ctx, 'per month', 0, 30, PRINT(16), '#6b717a'); ctx.restore(); });
    if (at(180.32) > 0) Ch.counter(ctx, { x: 895, y: 333, value: 612, prefix: '$', lt: at(180.32), dur: .8, size: 40, color: P.green });
    if (at(178.0) > 0) txt(ctx, 'median monthly cost', 895, 650, PRINT(22), '#55606b', 'center', clamp(at(178.0) / .3));
    if (at(183.32) > 0) popAt(ctx, 1110, 200, at(183.32), () => { K.card(ctx, 990, 160, 240, 80, '#1f1c1a', 16, 0); txt(ctx, 'for a house!', 1110, 200, HAND(700, 44), '#fff'); });
    K.source(ctx, 'Source: Redfin, Jan 16, 2024 (2022 data)', at(174));
  }
  function bokhari(ctx, x, y, s, t, face) { bean(ctx, x, y, s, t, { skin: '#d9a77c', hair: 'bald', glasses: true, beard: true, hairColor: '#2a2420', body: '#a9cdf0', top: 'shirt', face: Object.assign({ mouth: 'smile', brows: 'calm' }, face), armL: [.3, .4] }); }
  function e5(ctx, lt, dur, t) { // Redfin senior economist Sheharyar Bokhari: "Boomers don't have much motivation to sell…"
    K.bg.studio(ctx, '#c6ecd9', '#f1fbf5'); const T0 = 184.75, at = s => lt - (s - T0);
    popAt(ctx, 290, 650, at(185.0), () => bokhari(ctx, 290, 650, 1.15, t, {}));
    K.nameCard(ctx, 'Sheharyar Bokhari', 'Senior Economist, Redfin', 290, 110, at(185.71));
    K.bubble(ctx, '"Boomers don\'t have much motivation to sell, financially or otherwise.', 840, 250, 640, [450, 300], at(189.69), { size: 42 });
    K.bubble(ctx, 'They typically have low housing costs."', 840, 480, 600, [450, 360], at(193.65), { size: 42, fill: '#fff4d6' });
    K.source(ctx, 'Source: Redfin, Jan 16, 2024', at(189.7));
  }
  function e6(ctx, lt, dur, t) { // if you were paying $612 a month you wouldn't move either — nobody's doing anything wrong
    K.bg.studio(ctx, '#ffd76a', '#fff3c9'); const T0 = 196.05, at = s => lt - (s - T0);
    host(ctx, 400, 700, 1.15, t, [[T0, 'chest'], [198.3, 'shrug'], [199.9, 'presentBoth']], { mouth: at(199.93) > 0 ? 'smile' : 'smirk', brows: 'up', look: [.4, 0] });
    popAt(ctx, 920, 270, at(196.5), () => { K.card(ctx, 760, 200, 320, 140, '#fff', 20); txt(ctx, '$612/mo?', 920, 255, HAND(700, 58), P.green); txt(ctx, "I'd stay too", 920, 310, HAND(700, 36)); });
    if (at(199.93) > 0) popAt(ctx, 920, 480, at(199.93), () => { K.card(ctx, 700, 420, 440, 120, '#fff', 20); K.check(ctx, 760, 480, 50, clamp(at(200.2) / .4)); txt(ctx, 'nobody did anything wrong', 950, 480, HAND(700, 36)); });
  }
  function e7(ctx, lt, dur, t) { // a housing market frozen in place: owners staying put, everyone else can't get in
    const T0 = 201.57, at = s => lt - (s - T0), f = clamp(at(203.36) / 1.2);
    K.bg.color(ctx, '#dff1ff'); ground(ctx, '#f4f8fb');
    for (let i = 0; i < 3; i++) { const x = 250 + i * 390; K.house(ctx, x, 600, 1.05, { wall: ['#ffe1a8', '#c8ecff', '#ffd3e0'][i], roof: [P.purple, P.blue, P.red][i] });
      if (f > 0) { ctx.save(); ctx.globalAlpha = .45 * f; ctx.fillStyle = '#bfe6ff'; ctx.fillRect(x - 160, 330, 320, 272); ctx.restore(); for (let j = 0; j < 6; j++) { const ix = x - 130 + j * 52, l = (14 + (j % 3) * 10) * f; sh(ctx, c => { c.moveTo(ix - 8, 446); c.lineTo(ix + 8, 446); c.lineTo(ix, 446 + l); c.closePath(); }, '#e9f7ff', 2.5); } } }
    if (f > 0) txt(ctx, '❄', 640, 130, PRINT(90), '#7fb6d9', 'center', f);
    popAt(ctx, 640, 230, at(203.36), () => { K.card(ctx, 470, 190, 340, 80, '#fff', 16); txt(ctx, 'frozen in place', 640, 230, HAND(700, 46), P.blue); });
    if (at(205.06) > 0) popAt(ctx, 250, 110, at(205.06), () => { K.card(ctx, 110, 70, 280, 80, P.green, 16); txt(ctx, 'owners stay put', 250, 110, HAND(700, 38), '#fff'); });
    if (at(207.36) > 0) { popAt(ctx, 1030, 110, at(207.36), () => { K.card(ctx, 870, 70, 320, 80, P.red, 16); txt(ctx, "others can't get in", 1030, 110, HAND(700, 38), '#fff'); });
      for (let i = 0; i < 3; i++) bean(ctx, 980 + i * 70, 690, .4, t + i, { skin: 'white', hair: ['short', 'bob', 'side'][i], hairColor: '#3a2a1e', body: [P.orange, P.teal, P.pink][i], face: { mouth: 'frown', brows: 'worried', look: [-.6, -.3] } }); }
  }
  function e8(ctx, lt, dur, t) { // and for a moment, it looked like that was finally about to change
    const k = clamp(lt / 3); K.bg.color(ctx, '#dff1ff');
    ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, [[0, '#ffe7a3'], [1, '#fff6dc']]); ctx.fillRect(0, 0, W, H); ctx.restore();
    const sy = lerp(640, 330, out(k)); sh(ctx, c => c.arc(640, sy, 110, 0, 7), P.yellow, 5);
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .3; Tn.line(ctx, [[640 + Math.cos(a) * 140, sy + Math.sin(a) * 140], [640 + Math.cos(a) * (170 + 20 * k), sy + Math.sin(a) * (170 + 20 * k)]], 6, P.orange); }
    ground(ctx, '#9fd97f', 600);
    for (let i = 0; i < 3; i++) K.house(ctx, 250 + i * 390, 610, .9, { wall: ['#ffe1a8', '#c8ecff', '#ffd3e0'][i], roof: [P.purple, P.blue, P.red][i] });
    popAt(ctx, 640, 90, lt - .4, () => { K.card(ctx, 470, 52, 340, 76, '#fff', 16); txt(ctx, 'a thaw?', 640, 90, HAND(700, 52)); });
  }

  const SH = [
    [0, 11.5, d1], [11.5, 20.87, d2], [20.87, 28.8, d3], [28.8, 47.01, d4], [47.01, 62.15, d5], [62.15, 72.64, d6], [72.64, 101.99, d7], [101.99, 118.64, d8], [118.64, 137.45, d9],
    [137.45, 146.56, e1], [146.56, 165.02, e2], [165.02, 172.95, e3], [172.95, 184.75, e4], [184.75, 196.05, e5], [196.05, 201.57, e6], [201.57, 209.82, e7], [209.82, 212.98, e8],
  ];
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 })).concat([{ t: 1.7, type: 'swoosh', gain: .5 }, { t: 139.15, type: 'swoosh', gain: .5 }, { t: 38.91, type: 'swoosh', gain: .4 }, { t: 43.44, type: 'swoosh', gain: .4 }, { t: 81.96, type: 'swoosh', gain: .4 }, { t: 130.16, type: 'swoosh', gain: .4 }]);
  const pops = [4.7, 7.0, 11.6, 16.0, 21.1, 24.3, 26.4, 32.4, 33.6, 35.9, 37.1, 37.6, 40.9, 44.6, 47.2, 49.5, 53.1, 54.4, 58.4, 66.0, 68.3, 72.8, 75.4, 79.0, 80.2, 95.7, 107.9, 113.8, 116.2, 120.7, 128.5, 130.3, 134.3, 140.0, 142.1, 144.6, 161.3, 165.6, 171.7, 178.0, 183.3, 185.0, 185.7, 189.7, 193.7, 196.5, 199.9, 203.4, 205.1, 207.4]
    .map(t => ({ t, type: 'pop', gain: .5 }));
  const hits = [[0, 'whoosh'], [2.6, 'stamp'], [9.23, 'ding'], [18.64, 'cash'], [22.9, 'rise'], [45.64, 'thud'], [60.24, 'buzz'], [65.4, 'tick'], [87.3, 'tick'], [93.1, 'rise'], [100.04, 'stamp'], [110.0, 'tick'], [122.87, 'ding'], [126.44, 'stamp'], [136.74, 'stamp'], [137.45, 'whoosh'], [150.29, 'tick'], [154.17, 'tick'], [157.53, 'tick'], [170.4, 'stamp'], [180.32, 'cash'], [203.36, 'whoosh']]
    .map(([t, type]) => ({ t, type, gain: .6 }));
  G.Show = { duration: 212.98, narration: '../biz/assets/audio/housing-03-ch3-4.mp3', shots, sfx: cuts.concat(pops, hits),
    moods: [{ t: 0, mood: 'bright' }, { t: 20.87, mood: 'tense' }, { t: 47.01, mood: 'soft' }, { t: 72.64, mood: 'bright' }, { t: 101.99, mood: 'soft' }, { t: 137.45, mood: 'bright' }, { t: 172.95, mood: 'soft' }, { t: 201.57, mood: 'tense' }, { t: 209.82, mood: 'bright' }],
    images: { redfin: 'assets/housing/redfin.png', freddie: 'assets/housing/freddie-mac.jpg', fhfa: 'assets/housing/fhfa.jpg' },
    fonts: ['700 40px Caveat', '40px "Patrick Hand"'] };
})(window);
