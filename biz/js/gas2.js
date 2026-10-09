/* "The War That Put $4.36 Gas in Your Tank" — part 2: CH. 1 THE STRIKE, CH. 2 THE SHOCK (voice: assets/audio/gas-2.mp3).
 * Times are the narration's word times. Khamenei appears only as a respectful name card (no cartoon). */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const YOU = Object.assign({}, Pr.YOU, { body: P.blue });
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
  function rocket(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sh(ctx, c => { c.moveTo(0, -80); c.quadraticCurveTo(34, -40, 30, 40); c.lineTo(-30, 40); c.quadraticCurveTo(-34, -40, 0, -80); c.closePath(); }, '#fff', 5); sh(ctx, c => c.arc(0, -20, 12, 0, 7), '#9ad1ff', 3);
    for (const sx of [-1, 1]) sh(ctx, c => { c.moveTo(sx * 28, 10); c.lineTo(sx * 50, 50); c.lineTo(sx * 28, 40); c.closePath(); }, P.red, 4); sh(ctx, c => { c.moveTo(-16, 42); c.lineTo(0, 80 + Math.random() * 6); c.lineTo(16, 42); c.closePath(); }, P.orange, 0); ctx.restore(); }
  const KAINE = { skin: '#f2c8a4', hair: 'side', hairColor: '#cfcac2', body: '#23262e', top: 'suit', tie: '#d99ab8' };
  const BIROL = { skin: '#e9bf9a', hair: 'side', hairColor: '#cfcac2', body: '#23262e', top: 'suit', tie: '#2f3a55' };
  function chapterTab(ctx, num, title, lt, dur = 4.5) {
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190, x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, 'CHAPTER ' + num, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  function quoteCard(ctx, x, y, w, lines, lt, o = {}) { popAt(ctx, x, y, lt, () => { const h = lines.length * (o.lh || 50) + 50; K.card(ctx, x - w / 2, y - h / 2, w, h, o.fill || '#fff', 22); lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 46 + i * (o.lh || 50), HAND(700, o.size || 40), (o.red || []).includes(i) ? P.red : INK)); }); }
  function jet(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sh(ctx, c => { c.moveTo(60, 0); c.lineTo(-30, -12); c.lineTo(-50, -40); c.lineTo(-62, -40); c.lineTo(-52, 0); c.lineTo(-62, 40); c.lineTo(-50, 40); c.lineTo(-30, 12); c.closePath(); }, '#c9ced6', 4); ctx.restore(); }

  // ================= CHAPTER 1: THE STRIKE =================
  function c1(ctx, lt, dur, t) { // February 28, 2026: the U.S. and Israel launched a large-scale attack on Iran
    const T0 = 0, at = s => lt - (s - T0);
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, [[0, '#1a2244'], [1, '#3a2e48']]); ctx.fillRect(0, 0, W, H);
    // schematic region map at night: Iran's landmass lit, strike markers pulse in, jets cross
    sh(ctx, c => { c.moveTo(380, 120); c.lineTo(980, 110); c.lineTo(1120, 300); c.lineTo(1060, 560); c.lineTo(760, 600); c.lineTo(640, 470); c.lineTo(420, 380); c.closePath(); }, '#2f4a7a', 5, '#9ad1ff');
    txt(ctx, 'IRAN', 780, 330, HAND(700, 80), 'rgba(255,255,255,.55)');
    [[600, 260, 3.92], [820, 220, 4.4], [900, 420, 4.9], [700, 470, 5.3]].forEach(([x, y, s], i) => { const k = at(s); if (k <= 0) return; const f = Math.exp(-k * 1.2); ctx.fillStyle = `rgba(255,170,60,${.8 * f + .2})`; ctx.beginPath(); ctx.arc(x, y, 14 + 26 * (1 - f), 0, 7); ctx.fill(); sh(ctx, c => c.arc(x, y, 8, 0, 7), P.red, 3); });
    for (let i = 0; i < 3; i++) { const k = ((lt * .3 + i * .33) % 1); jet(ctx, lerp(-100, W + 100, k), 140 + i * 160 - k * 60, .6, -.2); }
    popAt(ctx, 200, 140, at(.19), () => { K.card(ctx, 60, 100, 280, 80, P.yellow, 16); txt(ctx, 'Feb 28, 2026', 200, 140, HAND(700, 40)); });
    if (at(4.23) > 0) popAt(ctx, 640, 650, at(4.23), () => { K.card(ctx, 330, 612, 620, 76, '#fff', 16); txt(ctx, 'U.S. + Israel: large-scale attack', 640, 650, HAND(700, 36)); });
    txt(ctx, 'illustration', 1240, 700, PRINT(16), 'rgba(255,255,255,.5)', 'right');
    chapterTab(ctx, 1, 'The strike', lt, 4.0);
    K.source(ctx, 'Source: Encyclopaedia Britannica (2026 Iran war)', at(2));
  }
  function c2(ctx, lt, dur, t) { // the strikes killed Iran's Supreme Leader, Ayatollah Ali Khamenei — confirmed by Iranian state TV
    const T0 = 6.65, at = s => lt - (s - T0);
    K.bg.color(ctx, '#1f1c1a');
    popAt(ctx, 640, 300, at(8.12), () => { K.card(ctx, 330, 210, 620, 180, '#2b2826', 18, 0); sh(ctx, c => c.roundRect(330, 210, 620, 180, 18), null, 3, '#6a645e');
      txt(ctx, 'Ayatollah Ali Khamenei', 640, 270, HAND(700, 52), '#fff'); txt(ctx, "Iran's Supreme Leader", 640, 330, PRINT(28), '#cfc8bf'); });
    if (at(7.27) > 0) txt(ctx, 'killed in the strikes', 640, 450, PRINT(30), '#e8e2da', 'center', clamp(at(7.27) / .5));
    if (at(11.24) > 0) popAt(ctx, 640, 560, at(11.24), () => { K.card(ctx, 450, 526, 380, 68, '#3a3633', 14, 0); txt(ctx, 'confirmed by Iranian state TV', 640, 560, PRINT(24), '#fff'); });
    K.source(ctx, 'Source: Reuters (Mar 1, 2026); Bloomberg', at(11.5));
  }
  function whiteHouse(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-260, -150, 520, 150), '#fbfaf7', 5); sh(ctx, c => { c.moveTo(-90, -150); c.lineTo(0, -210); c.lineTo(90, -150); c.closePath(); }, '#fbfaf7', 5); for (let i = 0; i < 6; i++) Tn.line(ctx, [[-75 + i * 30, -145], [-75 + i * 30, -10]], 5, '#c9ced6'); for (let i = 0; i < 8; i++) sh(ctx, c => c.rect(-240 + i * 62 + (i > 3 ? 64 : 0) - (i > 3 ? 0 : 0), -110, 26, 40), '#bfe6ff', 3); ctx.restore(); }
  function c3(ctx, lt, dur, t) { // the White House laid out its goals: missiles, "terrorist armies", never a nuclear weapon
    const T0 = 13.91, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    whiteHouse(ctx, 280, 600, .8);
    bean(ctx, 560, 700, .9, t, Object.assign({}, TRUMP, { armR: [1.9, .5], face: { mouth: Math.sin(t * 7) > 0 ? 'o' : 'flat', brows: 'calm', look: [.6, 0] } }));
    K.nameCard(ctx, 'President Trump', 'the stated goals', 560, 140, at(16.23));
    const GOALS = [[18.24, ['"destroying Iran\'s', 'missile capabilities"']], [22.87, ['regime "cannot continue to arm,', 'fund, and direct terrorist armies"']], [27.85, ['"…can never obtain', 'a nuclear weapon"']]];
    GOALS.forEach(([s, lines], i) => quoteCard(ctx, 960, 170 + i * 170, 560, lines, at(s), { size: 30, lh: 40 }));
    K.source(ctx, 'Source: The White House (Trump, Mar 2, 2026)', at(14.5));
  }
  function capitol(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-220, -80, 440, 80), '#eef0f4', 5); sh(ctx, c => c.rect(-110, -130, 220, 50), '#eef0f4', 5); sh(ctx, c => c.ellipse(0, -130, 90, 100, 0, Math.PI, 0), '#eef0f4', 5); sh(ctx, c => c.rect(-12, -260, 24, 36), '#eef0f4', 4); ctx.restore(); }
  function c4(ctx, lt, dur, t) { // critics: Sen. Tim Kaine, who led an effort to require congressional approval: "It's a war."
    const T0 = 33.93, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    capitol(ctx, 960, 600, 1.0);
    bean(ctx, 380, 700, 1.1, t, Object.assign({}, KAINE, { armR: at(42.94) > 0 ? [2.1, .4] : [.4, .4], face: { mouth: at(42.94) > 0 ? 'o' : 'flat', brows: 'worried', look: [.6, 0] } }));
    K.nameCard(ctx, 'Sen. Tim Kaine (D)', 'led the push for a vote in Congress', 380, 110, at(37.74));
    popAt(ctx, 640, 90, at(34.28), () => { K.card(ctx, 560, 56, 160, 64, '#fff', 14); txt(ctx, 'critics', 640, 88, HAND(700, 36)); });
    if (at(42.94) > 0) K.bubble(ctx, '"It\'s a war."', 760, 300, 320, [560, 360], at(42.94), { size: 54 });
    K.source(ctx, 'Source: Reuters (Mar 4, 2026)', at(37));
  }
  function c5(ctx, lt, dur, t) { // under the Constitution, only Congress can declare one
    const T0 = 44.13, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    popAt(ctx, 640, 360, at(44.33), () => { sh(ctx, c => c.rect(380, 120, 520, 480), '#f6e7c4', 5); for (const yy of [120, 600]) sh(ctx, c => c.roundRect(360, yy - 18, 560, 36, 18), '#e0c48a', 5);
      txt(ctx, 'U.S. Constitution', 640, 190, HAND(700, 50), '#6b4a1d'); txt(ctx, 'Article I, Section 8', 640, 250, PRINT(28), '#6b4a1d');
      for (let i = 0; i < 4; i++) { ctx.fillStyle = '#d8c39a'; ctx.fillRect(430, 300 + i * 34, 420, 10); }
      txt(ctx, 'Congress shall have Power…', 640, 470, HAND(700, 34), '#3d2b14'); txt(ctx, 'To declare War', 640, 520, HAND(700, 44), P.red); });
    if (at(45.65) > 0) K.scribbleCircle(ctx, 640, 520, 170, 34, clamp(at(46.23) / .6), P.red, 6);
  }
  function c6(ctx, lt, dur, t) { // we're not settling that here — both sides — but we can follow the money; you've been paying for part of it
    const T0 = 47.74, at = s => lt - (s - T0), money = at(54.29) > 0;
    K.bg.studio(ctx, '#e6dcff', '#f7f3ff');
    host(ctx, 300, 700, 1.1, t, [[T0, 'shrug'], [50.5, 'presentBoth'], [54.3, 'pointSide'], [58.4, 'present']], { mouth: 'flat', brows: 'up', look: [.6, 0] });
    if (!money) { const tilt = Math.sin(t * 1.3) * .1; Tn.line(ctx, [[860, 260], [860, 520]], 10, '#8a6a3a'); ctx.save(); ctx.translate(860, 260); ctx.rotate(tilt); Tn.line(ctx, [[-200, 0], [200, 0]], 8, '#8a6a3a'); for (const sx of [-200, 200]) { ctx.save(); ctx.translate(sx, 110); ctx.rotate(-tilt); sh(ctx, c => c.ellipse(0, 0, 70, 16, 0, 0, 7), '#e0b84e', 4); ctx.restore(); Tn.line(ctx, [[sx, 0], [sx - 50, 110]], 3, INK); Tn.line(ctx, [[sx, 0], [sx + 50, 110]], 3, INK); } ctx.restore();
      if (at(50.76) > 0) popAt(ctx, 860, 600, at(50.76), () => { K.card(ctx, 640, 566, 440, 68, '#fff', 14); txt(ctx, 'serious reasons on both sides', 860, 600, HAND(700, 32)); }); return; }
    // the money trail: dollar footprints lead from the war to your wallet
    for (let i = 0; i < 8; i++) { const k = clamp((at(55.1) - i * .15) / .3); if (k <= 0) continue; const x = 620 + i * 70, y = 300 + Math.sin(i) * 40 + i * 20; ctx.save(); ctx.globalAlpha = k; ctx.translate(x, y); ctx.rotate(.3); sh(ctx, c => c.roundRect(-24, -14, 48, 28, 5), '#7fcf7a', 3); txt(ctx, '$', 0, 1, HAND(700, 22), '#1f5c2a'); ctx.restore(); }
    popAt(ctx, 1180, 520, at(58.39), () => { sh(ctx, c => c.roundRect(1100, 470, 160, 110, 14), '#8a5a36', 5); sh(ctx, c => c.roundRect(1100, 470, 160, 40, [14, 14, 0, 0]), '#a8703f', 5); txt(ctx, 'your wallet', 1180, 610, PRINT(22)); });
    popAt(ctx, 860, 120, at(55.1), () => { K.card(ctx, 660, 80, 400, 80, P.yellow, 16); txt(ctx, 'follow the money', 860, 120, HAND(700, 44)); });
  }

  // ================= CHAPTER 2: THE SHOCK =================
  function d1(ctx, lt, dur, t) { // Iran struck back — at shipping
    const T0 = 60.52, at = s => lt - (s - T0);
    gulfMap(ctx);
    for (let i = 0; i < 5; i++) { const k = ((t * .08 + i / 5) % 1), x = lerp(420, 1240, k), y = lerp(260, 560, k); tanker(ctx, x, y, .55, .35); }
    if (at(66.07) > 0) popAt(ctx, 640, 650, at(66.07), () => { K.card(ctx, 470, 612, 340, 76, P.red, 16); txt(ctx, 'SHIPPING', 640, 650, HAND(700, 48), '#fff'); });
    if (at(63.58) > 0) popAt(ctx, 1110, 140, at(63.58), () => { sh(ctx, c => c.arc(1110, 140, 60, 0, 7), '#9ad1ff', 5); sh(ctx, c => c.ellipse(1110, 140, 25, 60, 0, 0, 7), null, 3); Tn.line(ctx, [[1050, 140], [1170, 140]], 3, INK); txt(ctx, 'world economy', 1110, 225, PRINT(22)); });
    chapterTab(ctx, 2, 'The shock', lt, 4.0);
  }
  function d2(ctx, lt, dur, t) { // Iran took effective control of the strait; shipping through it largely stopped
    const T0 = 67.26, at = s => lt - (s - T0), stop = clamp(at(72.66) / .8);
    gulfMap(ctx);
    if (at(69.7) > 0) { popAt(ctx, 935, 395, at(69.7), () => { for (let i = 0; i < 6; i++) sh(ctx, c => c.ellipse(912 + i * 9, 360 + i * 12, 8, 6, .5, 0, 7), null, 5, '#5a5f6a'); }); }
    for (let i = 0; i < 6; i++) { const x = lerp(860 - i * 70, 860 - i * 70, 0), y = 372 - i * 18; tanker(ctx, x - (1 - stop) * 40 * Math.sin(t + i), y, .55, .35, { hull: stop > .5 ? '#8a8f99' : '#b23a2e' }); }
    if (stop > 0) { ctx.save(); ctx.globalAlpha = .35 * stop; ctx.fillStyle = '#1f2630'; ctx.fillRect(0, 0, W, H); ctx.restore(); K.stamp(ctx, 'STOPPED', 930, 520, at(73.06), { color: P.red, size: 56, rot: -.06 }); }
    popAt(ctx, 260, 120, at(70.37), () => { K.card(ctx, 90, 80, 340, 80, '#fff', 16); txt(ctx, 'Iran controls the strait', 260, 120, HAND(700, 30)); });
    K.source(ctx, 'Source: NPR (Jun 15, 2026)', at(69));
  }
  function d3(ctx, lt, dur, t) { // insurers: 0.001% of a ship's value before the war → ~4% for a single 7-day policy by June
    const T0 = 74.38, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f3f6fb');
    const ag = bean(ctx, 180, 700, 1.0, t, Object.assign(Pr.extra(6), { top: 'suit', body: '#2f3a55', armR: [1.2, .9], face: { mouth: 'smirk', brows: 'up', look: [.8, 0] } }));
    sh(ctx, c => c.roundRect(ag.hands.R[0] - 10, ag.hands.R[1] - 90, 80, 110, 8), '#fff', 4); txt(ctx, 'POLICY', ag.hands.R[0] + 30, ag.hands.R[1] - 70, PRINT(16));
    popAt(ctx, 180, 110, at(74.96), () => { K.card(ctx, 60, 72, 240, 76, '#fff', 16); txt(ctx, 'the insurers', 180, 110, HAND(700, 36)); });
    // ship value = a big hull bar; the premium = a slice of it
    tanker(ctx, 760, 250, 2.6, 0);
    txt(ctx, "the ship's value", 760, 340, PRINT(24));
    const pre = at(81.35) > 0, war = at(87.5) > 0;
    if (pre) popAt(ctx, 560, 470, at(81.35), () => { K.card(ctx, 420, 400, 280, 150, '#fff', 18); txt(ctx, 'before the war', 560, 430, PRINT(22), '#6a7380'); sh(ctx, c => c.rect(554, 470, 4, 4), P.green, 0); txt(ctx, '0.001%', 560, 510, HAND(700, 44), P.green); });
    if (war) popAt(ctx, 960, 470, at(87.5), () => { K.card(ctx, 800, 400, 320, 150, '#fff', 18); txt(ctx, 'by June, per 7 days', 960, 430, PRINT(22), '#6a7380'); txt(ctx, '4%', 960, 500, HAND(700, 70), P.red); });
    if (war) { ctx.save(); ctx.fillStyle = 'rgba(224,75,58,.6)'; ctx.fillRect(760 + 2.6 * 70 - 2.6 * 150 * .04 * 8, 214, 2.6 * 150 * .04 * 8, 72); ctx.restore(); }
    K.source(ctx, 'Source: The National (Jun 3, 2026) · war-risk premium, % of hull value', at(78));
  }
  function d4(ctx, lt, dur, t) { // roughly 4,000 times more — just for the insurance to sail
    const T0 = 91.46, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff1dc');
    K.slam(ctx, '×4,000', 640, 300, at(92.09), 180, P.red);
    if (at(94.1) > 0) txt(ctx, 'just for the insurance to sail', 640, 480, HAND(700, 44), INK, 'center', clamp(at(94.1) / .3));
    txt(ctx, '4% ÷ 0.001% = 4,000', 640, 560, PRINT(24), '#6a5a48', 'center', clamp(at(92.8) / .3));
    tanker(ctx, lerp(-100, 1400, (lt * .12) % 1), 650, .7, 0);
  }
  function d5(ctx, lt, dur, t) { // oil exploded: ~\$70 before the war → nearly \$120 within about ten days
    const T0 = 96.16, at = s => lt - (s - T0);
    K.bg.white(ctx);
    Tn.line(ctx, [[200, 120], [200, 620], [1100, 620]], 5, INK);
    [[70, '$70'], [120, '$120']].forEach(([v, l]) => { const y = 620 - (v - 40) * 5.5; ctx.setLineDash([8, 8]); Tn.line(ctx, [[200, y], [1100, y]], 2, '#c9ced6'); ctx.setLineDash([]); txt(ctx, l, 160, y, PRINT(24), '#6a7380'); });
    const y70 = 620 - 30 * 5.5, y120 = 620 - 78 * 5.5;
    if (at(99.24) > 0) popAt(ctx, 330, y70, at(99.24), () => { sh(ctx, c => c.arc(330, y70, 12, 0, 7), P.blue, 4); txt(ctx, 'pre-war ~$70', 330, y70 + 40, HAND(700, 30)); });
    const k = clamp(at(100.67) / 1.6); if (k > 0) { Tn.line(ctx, [[330, y70], [lerp(330, 900, out(k)), lerp(y70, y120, out(k))]], 7, P.red); rocket(ctx, lerp(330, 900, out(k)), lerp(y70, y120, out(k)) - 40, .55, Math.atan2(y120 - y70, 570) + Math.PI / 2); }
    if (at(102.35) > 0) popAt(ctx, 900, y120 - 90, at(102.35), () => { K.card(ctx, 760, y120 - 130, 280, 80, P.red, 16); txt(ctx, 'nearly $120', 900, y120 - 90, HAND(700, 40), '#fff'); });
    if (at(100.67) > 0) txt(ctx, '~10 days', 620, 600, HAND(700, 32), INK, 'center', clamp(at(100.67) / .3));
    K.source(ctx, 'Source: NPR (Mar 11, 2026) · global benchmark', at(98));
  }
  function d6(ctx, lt, dur, t) { // ABC News: the largest oil supply shock on record
    const T0 = 104.74, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff');
    K.logo(ctx, 'abc', 640, 160, 260, at(104.74), { pad: 12 });
    quoteCard(ctx, 640, 420, 760, ['"the largest oil supply', 'shock on record"'], at(106.57), { size: 56, lh: 70, red: [1] });
    K.source(ctx, 'Source: ABC News (Oct 8, 2026)', at(105));
  }
  function reserveTank(ctx, x, y, s, open) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-90, -200, 180, 200), '#e9edf1', 5); sh(ctx, c => c.ellipse(0, -200, 90, 22, 0, 0, 7), '#fff', 5); txt(ctx, 'RESERVE', 0, -110, PRINT(22)); sh(ctx, c => c.rect(90, -40, 60, 24), '#9aa3ad', 4);
    if (open > 0) { ctx.fillStyle = '#2b2b2b'; ctx.beginPath(); ctx.moveTo(150, -36); ctx.quadraticCurveTo(190, -30, 196, 10 + 30 * open); ctx.lineTo(176, 10 + 30 * open); ctx.quadraticCurveTo(172, -16, 150, -20); ctx.fill(); } ctx.restore(); }
  function d7(ctx, lt, dur, t) { // governments panicked: Mar 11, the IEA's members agreed to release 400 million barrels
    const T0 = 109.08, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    for (let i = 0; i < 4; i++) reserveTank(ctx, 220 + i * 260, 600, .9, clamp((at(116.59) - i * .2) / .6));
    K.logo(ctx, 'iea', 640, 110, 200, at(114.22), { pad: 10 });
    popAt(ctx, 220, 110, at(112.8), () => { K.card(ctx, 90, 74, 260, 72, P.yellow, 16); txt(ctx, 'Mar 11, 2026', 220, 110, HAND(700, 36)); });
    if (at(110.33) > 0 && at(114.05) < 0) popAt(ctx, 1040, 110, at(110.33), () => { K.card(ctx, 870, 74, 340, 72, '#fff', 16); txt(ctx, 'the emergency stash', 1040, 110, HAND(700, 34)); });
    if (at(116.96) > 0) popAt(ctx, 1040, 260, at(116.96), () => { K.card(ctx, 860, 200, 360, 120, P.red, 18); txt(ctx, '400 million', 1040, 245, HAND(700, 50), '#fff'); txt(ctx, 'barrels released', 1040, 292, PRINT(24), '#fff'); });
    K.source(ctx, 'Source: Al Jazeera (Mar 11, 2026)', at(114));
  }
  function d8(ctx, lt, dur, t) { // the previous record (after Russia invaded Ukraine) was 182 million — more than double
    const T0 = 120.26, at = s => lt - (s - T0);
    K.bg.white(ctx);
    const col = (x, v, l, c0, s) => { const k = clamp(at(s) / 1.0); const hgt = v * 1.1 * out(k); sh(ctx, c => c.rect(x - 90, 620 - hgt, 180, hgt), c0, 5); if (k > .9) { txt(ctx, v + 'M', x, 620 - hgt - 34, HAND(700, 50), c0 === P.red ? P.red : INK); } txt(ctx, l, x, 660, PRINT(24)); };
    col(440, 182, 'previous record (2022)', '#9aa3ad', 122.01); col(840, 400, 'March 2026', P.red, 120.4);
    if (at(123.11) > 0) popAt(ctx, 440, 280, at(123.11), () => { K.card(ctx, 280, 250, 320, 60, '#fff', 12); txt(ctx, 'after Russia invaded Ukraine', 440, 280, PRINT(20)); });
    if (at(128.44) > 0) K.stamp(ctx, 'MORE THAN 2×', 1080, 260, at(128.44), { color: P.red, size: 44, rot: .1 });
    if (at(128.8) > 0) txt(ctx, 'the biggest release in history', 840, 120, HAND(700, 36), INK, 'center', clamp(at(128.8) / .3));
    K.source(ctx, 'Source: Al Jazeera (Mar 11, 2026)', at(121));
  }
  function d9(ctx, lt, dur, t) { // it wasn't enough — Birol: "the resumption of transit through the Strait of Hormuz"; you can't release your way out of a blocked highway
    const T0 = 130.66, at = s => lt - (s - T0), hw = at(139.13) > 0;
    if (!hw) {
      K.bg.studio(ctx, '#d7e9ff', '#f2f8ff');
      bean(ctx, 300, 700, 1.1, t, Object.assign({}, BIROL, { armR: [1.9, .4], face: { mouth: Math.sin(t * 7) > 0 ? 'o' : 'flat', brows: 'worried', look: [.6, 0] } }));
      K.nameCard(ctx, 'Fatih Birol', 'IEA executive director', 300, 110, at(133.33));
      popAt(ctx, 900, 110, at(130.73), () => { K.card(ctx, 760, 74, 280, 72, P.red, 16); txt(ctx, "it wasn't enough", 900, 110, HAND(700, 36), '#fff'); });
      quoteCard(ctx, 860, 380, 620, ['the real key: "the resumption', 'of transit through the', 'Strait of Hormuz"'], at(135.08), { size: 36, lh: 50, red: [2] });
      K.source(ctx, 'Source: NPR (Mar 11, 2026)', at(134));
      return;
    }
    // a blocked highway: trucks queue at a barrier; someone pours a little can into the jam
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 520, W, 200); ctx.fillStyle = '#6c717b'; ctx.fillRect(0, 560, W, 120); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK); Tn.line(ctx, [[0, 680], [W, 680]], 4, INK);
    for (let x = 0; x < W; x += 80) { ctx.fillStyle = '#fff'; ctx.fillRect(x, 616, 40, 6); }
    for (let i = 0; i < 4; i++) { const x = 160 + i * 220; sh(ctx, c => c.rect(x - 90, 540, 160, 90), '#e9edf1', 4); sh(ctx, c => c.rect(x + 70, 560, 50, 70), P.blue, 4); for (const wx of [x - 60, x + 90]) sh(ctx, c => c.arc(wx, 640, 18, 0, 7), INK, 0); }
    sh(ctx, c => c.rect(1060, 560, 30, 120), P.red, 4); for (let i = 0; i < 4; i++) sh(ctx, c => c.rect(1000, 580 + i * 22, 220, 14), i % 2 ? '#fff' : P.red, 3);
    popAt(ctx, 640, 120, at(139.13), () => { K.card(ctx, 330, 80, 620, 80, P.yellow, 16); txt(ctx, "can't release your way out of a blocked highway", 640, 120, HAND(700, 30)); });
  }

  const SH = [[0, 6.65, c1], [6.65, 13.91, c2], [13.91, 33.93, c3], [33.93, 44.13, c4], [44.13, 47.74, c5], [47.74, 60.52, c6],
    [60.52, 67.26, d1], [67.26, 74.38, d2], [74.38, 91.46, d3], [91.46, 96.16, d4], [96.16, 104.74, d5], [104.74, 109.08, d6], [109.08, 120.26, d7], [120.26, 130.66, d8], [130.66, 141.64, d9]];
  const DUR = 141.64;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [.19, 4.23, 8.12, 11.24, 16.23, 18.24, 22.87, 27.85, 34.28, 37.74, 42.94, 44.33, 50.76, 55.1, 58.39, 63.58, 66.07, 70.37, 74.96, 81.35, 87.5, 99.24, 102.35, 104.74, 106.57, 110.33, 112.8, 114.22, 116.96, 123.11, 130.73, 133.33, 135.08, 139.13]
    .map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[3.92, 'thud'], [4.4, 'thud'], [4.9, 'thud'], [46.23, 'ding'], [69.7, 'click'], [73.06, 'stamp'], [87.5, 'buzz'], [92.09, 'thud'], [100.67, 'rise'], [116.59, 'whoosh'], [128.44, 'stamp'], [131.07, 'buzz'], [140.41, 'thud']]
    .map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/gas-2.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofiDark' }, { t: 6.65, mood: 'lofiKeys', fade: 2 }, { t: 13.91, mood: 'lofiDark' }, { t: 47.74, mood: 'lofi' }, { t: 60.52, mood: 'lofiDark' }, { t: 109.08, mood: 'lofi' }, { t: 130.66, mood: 'lofiDark' }],
    images: { abc: 'assets/gas/abc-news.png', iea: 'assets/gas/iea.png' },
    fonts: G.BizFont.load };
})(window);
