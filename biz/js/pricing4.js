/* "Your Price Isn't My Price" — part 4: CH. 6 THE STATES FIGHT BACK + ENDING (voice: assets/audio/pricing-4.mp3).
 * Shot plan + music map: biz/PLAN-pricing-4.md. Times are the narration's word times. */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const INSTA = [18, 18, 1164, 592];
  // real people, drawn in the house style from the supplied photos
  const MOORE = { skin: '#7a4a2e', hair: 'bald', hairColor: '#2a1d14', body: '#1f2a44', top: 'suit', tie: '#b3202a' };
  const SHERRILL = { skin: '#f3cdb0', hair: 'long', hairColor: '#7a4f2e', body: '#1f2a44', top: 'suit', tie: '#d9343a' };
  const HOCHUL = { skin: '#f3cdb0', hair: 'bob', hairColor: '#6e4a2c', body: '#2a5fc7', top: 'plain' };
  const HAWLEY = { skin: '#f2c8a4', hair: 'short', hairColor: '#5a3a22', body: '#1f2a44', top: 'suit', tie: '#b3202a' };
  const BLUMENTHAL = { skin: '#f2c8a4', hair: 'side', hairColor: '#9b958c', body: '#23262e', top: 'suit', tie: '#a3263a' };
  const SIEKERKA = { skin: '#f3cdb0', hair: 'bob', hairColor: '#cfae76', body: '#23262e', top: 'plain' };
  const ZHANG = { skin: '#eac39c', hair: 'short', hairColor: '#1c1716', glasses: true, body: '#26355c', top: 'suit' };

  function chapterTab(ctx, num, title, lt, dur = 4.5) {
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190, x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, 'CHAPTER ' + num, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  const logo = (ctx, key, x, y, w, lt, o = {}) => K.logo(ctx, key, x, y, w, lt, o);
  function quoteCard(ctx, x, y, w, lines, lt, o = {}) { popAt(ctx, x, y, lt, () => { const h = lines.length * (o.lh || 50) + 50; K.card(ctx, x - w / 2, y - h / 2, w, h, o.fill || '#fff', 22); lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 46 + i * (o.lh || 50), HAND(700, o.size || 40), (o.red || []).includes(i) ? P.red : INK)); }); }

  // the lower 48 (lon, lat), and the four states the chapter names
  const US = [[-124.7, 48.4], [-124.1, 46.2], [-124.4, 42.8], [-124.2, 40.4], [-122.4, 37.8], [-120.6, 34.6], [-117.1, 32.5], [-114.7, 32.7], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-104.5, 29.6], [-103, 29], [-101.4, 29.8], [-99.5, 27.5], [-97.4, 25.9],
    [-97.4, 27.8], [-95, 29.3], [-93.8, 29.7], [-91, 29.2], [-89.4, 29], [-89.6, 30.2], [-88, 30.7], [-85.3, 29.7], [-84, 30], [-82.8, 27.9], [-81.7, 25.9], [-80.4, 25.2], [-80.1, 26.7], [-80.6, 28.6], [-81.4, 30.5], [-81, 31.8], [-79, 33.6], [-76.5, 34.7], [-75.5, 35.6], [-76, 37], [-75.3, 38.4],
    [-74.1, 39.8], [-73.9, 40.6], [-71.9, 41.1], [-70, 41.7], [-70.7, 42.8], [-70.2, 43.7], [-67, 44.8], [-67.8, 47.1], [-69.2, 47.4], [-70.9, 45.3], [-74.9, 45], [-76.3, 44.2], [-79.1, 43.3], [-79, 42.8], [-82.5, 41.7], [-83.1, 42.1], [-82.4, 43], [-82.4, 45.2], [-84.5, 46.5], [-88, 48], [-89.6, 48], [-94.8, 49.3], [-95.2, 49], [-123, 49], [-122.8, 48.3]];
  const proj = (lon, lat) => [150 + (lon + 125) * 17.4, 90 + (50 - lat) * 22];
  const STATES = { MD: [-76.7, 39.1, 'Maryland'], CT: [-72.7, 41.6, 'Connecticut'], NJ: [-74.6, 40.1, 'New Jersey'], NY: [-75.6, 42.9, 'New York'] };
  function usMap(ctx, lights, o = {}) { // lights = { MD: [k, colour], ... }
    sh(ctx, c => { US.forEach(([lo, la], i) => { const [x, y] = proj(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); }, o.fill || '#d6dde6', 5);
    for (const [st, [k, col]] of Object.entries(lights)) { if (k <= 0) continue; const [lo, la] = STATES[st], [x, y] = proj(lo, la);
      ctx.save(); ctx.globalAlpha = .35 * clamp(k); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 34 + Math.sin(k * 6) * 3, 0, 7); ctx.fill(); ctx.restore(); popAt(ctx, x, y, k, () => sh(ctx, c => c.arc(x, y, 13, 0, 7), col, 4)); }
  }
  function stateLabel(ctx, st, dx, dy, lt, extra) { const [lo, la, name] = STATES[st], [x, y] = proj(lo, la); popAt(ctx, x + dx, y + dy, lt, () => { ctx.font = HAND(700, 30); const w = ctx.measureText(name + (extra ? ' · ' + extra : '')).width + 30; K.card(ctx, x + dx - w / 2, y + dy - 24, w, 48, '#fff', 12); txt(ctx, name + (extra ? ' · ' + extra : ''), x + dx, y + dy, HAND(700, 30)); Tn.line(ctx, [[x + dx * .2, y + dy * .2], [x + dx * .75, y + dy * .75]], 3, INK); }); }

  // ================= CHAPTER 6 =================
  function i1(ctx, lt, dur, t) { // Maryland went first
    const T0 = 0, at = s => lt - (s - T0);
    K.bg.color(ctx, '#cfe9ff'); usMap(ctx, { MD: [at(.5) / .4, P.green] });
    stateLabel(ctx, 'MD', -230, 120, at(.6), 'first');
    chapterTab(ctx, 6, 'The states fight back', lt, 1.75);
  }
  function desk(ctx, x, y, w) { sh(ctx, c => c.rect(x - w / 2, y, w, 30), '#8a5a36', 5); sh(ctx, c => c.rect(x - w / 2 + 20, y + 30, w - 40, 200), '#a8703f', 5); }
  function signing(ctx, who, name, role, x, lt, t, signAt, docTitle) { // a governor signing a bill at a desk
    bean(ctx, x, 600, 1.0, t, Object.assign({}, who, { armR: [.9, 1.4], face: { mouth: 'smile', brows: 'up', look: [.4, .7] } }));
    desk(ctx, x, 560, 520); sh(ctx, c => c.rect(x - 110, 500, 220, 70), '#fff', 4); txt(ctx, docTitle, x, 524, PRINT(16)); const k = clamp((lt - signAt) / .8);
    if (k > 0) { ctx.save(); ctx.beginPath(); for (let i = 0; i <= 30 * k; i++) { const px = x - 70 + i * 4.4, py = 552 + Math.sin(i * .9) * 6; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 3; ctx.strokeStyle = '#1d4f91'; ctx.stroke(); ctx.restore(); }
    K.nameCard(ctx, name, role, x, 110, lt - (signAt - .8));
  }
  function i2(ctx, lt, dur, t) { // April 28, 2026: Governor Wes Moore signed the Protection From Predatory Pricing Act
    const T0 = 1.75, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffe1a8', '#fff7e6');
    signing(ctx, MOORE, 'Gov. Wes Moore', 'Maryland', 420, lt, t, 4.49 - T0, 'HB 895');
    popAt(ctx, 960, 200, at(1.92), () => { K.card(ctx, 820, 160, 280, 80, P.yellow, 16); txt(ctx, 'Apr 28, 2026', 960, 200, HAND(700, 40)); });
    quoteCard(ctx, 960, 400, 460, ['Protection From', 'Predatory Pricing Act'], at(4.83), { size: 40, lh: 52 });
    K.source(ctx, 'Source: Skadden (May 2026)', at(2));
  }
  function i3(ctx, lt, dur, t) { // bans grocery stores of 15,000+ sq ft, and food delivery apps, from surveillance pricing to charge individuals more for food
    const T0 = 7.58, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    Pr.store(ctx, 300, 560, .85, 'GROCERY', { trim: P.green, awning: P.green, w: 520 });
    if (at(9.29) > 0) { K.arrow(ctx, [80, 610], [520, 610], clamp(at(9.29) / .5), INK, 4); popAt(ctx, 300, 650, at(9.8), () => { K.card(ctx, 180, 622, 240, 56, P.yellow, 12); txt(ctx, '15,000+ sq ft', 300, 650, HAND(700, 32)); }); }
    if (at(11.72) > 0) Pr.phone(ctx, 700, 330, .55, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#e04b3a'; c.fillRect(0, 0, w, 70); txt(c, 'food delivery', w / 2, 38, PRINT(24), '#fff'); for (let i = 0; i < 4; i++) { c.fillStyle = '#f3f5f7'; c.fillRect(16, 90 + i * 70, w - 32, 54); } });
    // the surveillance-priced tag trying to rise — blocked
    const k = at(14.23); if (k > 0) { const lift = Math.min(1, k / .8) * 110 - (k > 1.2 ? Math.min(1, (k - 1.2) / .3) * 110 : 0);
      Pr.tag(ctx, 1040, 400 - lift, 1.1, '$ ↑', 1, { color: '#ffd6d0' }); sh(ctx, c => c.ellipse(1040 + 2, 380 - lift, 22, 12, 0, 0, 7), '#fff', 3); sh(ctx, c => c.arc(1040, 380 - lift, 6, 0, 7), INK, 0);
      if (k > 1.0) { sh(ctx, c => c.rect(920, 250, 240, 20), P.red, 4); txt(ctx, 'BANNED', 1040, 230, HAND(700, 44), P.red); } }
    if (at(15.99) > 0) popAt(ctx, 1040, 560 - 60, at(15.99), () => { K.card(ctx, 900, 470, 280, 60, '#fff', 14); txt(ctx, 'charging you more for food', 1040, 500, PRINT(22)); });
  }
  function i4(ctx, lt, dur, t) { // fines up to $10,000 per violation, and up to $25,000 for repeat offenders
    const T0 = 17.24, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    const ticket = (x, amt, label, lt2, s) => popAt(ctx, x, 360, lt2, () => { ctx.save(); ctx.translate(x, 360); ctx.rotate(-.03); ctx.scale(s, s); sh(ctx, c => c.rect(-170, -200, 340, 400), '#fff', 5); sh(ctx, c => c.rect(-170, -200, 340, 70), P.red, 5); txt(ctx, 'FINE', 0, -165, PRINT(36), '#fff'); txt(ctx, 'up to', 0, -80, PRINT(28), '#6a7380'); txt(ctx, amt, 0, -10, HAND(700, 84), P.red); txt(ctx, label, 0, 80, PRINT(26)); ctx.restore(); });
    ticket(400, '$10,000', 'per violation', at(18.01), 1);
    ticket(880, '$25,000', 'repeat offenders', at(20.29), 1.12);
    K.source(ctx, 'Source: Skadden (May 2026)', at(18));
  }
  function i5(ctx, lt, dur, t) { // it took effect on October 1, 2026
    const T0 = 23.72, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    for (const px of [270, 450]) Tn.line(ctx, [[px, 560], [px, 330]], 10, '#7a5233'); sh(ctx, c => c.roundRect(170, 190, 380, 170, 18), '#2f6fbf', 6); txt(ctx, 'WELCOME TO', 360, 235, PRINT(30), '#fff'); txt(ctx, 'MARYLAND', 360, 295, HAND(700, 62), '#fff');
    Pr.calendar(ctx, 900, 480, 1.0, 'OCT 2026', '1', { bigSize: 110, head: P.blue });
    K.stamp(ctx, 'IN EFFECT', 900, 560, at(24.02), { color: P.green, size: 56, rot: -.08 });
  }
  function i6(ctx, lt, dur, t) { // Connecticut signed a ban in June
    const T0 = 26.89, at = s => lt - (s - T0);
    K.bg.color(ctx, '#cfe9ff'); usMap(ctx, { MD: [1, P.green], CT: [at(27.35) / .4, P.green] });
    stateLabel(ctx, 'CT', -170, -170, at(27.4), 'June 2026');
    K.source(ctx, 'Source: Stateline (Aug 4, 2026)', at(27.5));
  }
  function i7(ctx, lt, dur, t) { // NJ, July 23: Gov. Mikie Sherrill signed it at a Newark grocery store — "a fair shake"
    const T0 = 28.92, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff8ec');
    sh(ctx, c => c.rect(40, 120, 1200, 400), '#f1ece2', 5); for (let r = 0; r < 3; r++) Tn.line(ctx, [[40, 220 + r * 100], [1240, 220 + r * 100]], 5, '#b9ae9a'); for (let i = 0; i < 14; i++) for (let r = 0; r < 3; r++) sh(ctx, c => c.roundRect(60 + i * 84, 160 + r * 100, 50, 56, 6), [P.red, P.yellow, P.blue, P.green][(i + r) % 4], 3);
    ctx.fillStyle = '#d9d2c4'; ctx.fillRect(0, 600, W, 120);
    sh(ctx, c => c.roundRect(870, 60, 300, 70, 12), '#fff', 4); txt(ctx, 'Newark grocery store', 1020, 95, PRINT(24));
    signing(ctx, SHERRILL, 'Gov. Mikie Sherrill', 'New Jersey', 360, lt, t, 32.48 - T0, 'A4085');
    popAt(ctx, 850, 220, at(29.94), () => { K.card(ctx, 720, 180, 260, 80, P.yellow, 16); txt(ctx, 'July 23, 2026', 850, 220, HAND(700, 38)); });
    quoteCard(ctx, 900, 420, 560, ['"Part of affordability is', 'making sure consumers', 'get a fair shake."'], at(35.4), { size: 38, lh: 50, red: [2] });
    K.source(ctx, 'Source: New Jersey Monitor (Jul 23, 2026)', at(30));
  }
  function i8(ctx, lt, dur, t) { // NJ paused new digital price tags for a year while the state studies them
    const T0 = 39.04, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    for (let i = 0; i < 4; i++) { const x = 220 + i * 170, k = clamp(at(40.3) - i * .2); ctx.save(); ctx.translate(x, 330); sh(ctx, c => c.roundRect(-70, -36, 140, 72, 8), '#1f2630', 4); ctx.fillStyle = '#7dffb0'; ctx.font = PRINT(30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = i < 2 ? 1 : .25; ctx.fillText('$•.••', 0, 2); ctx.restore(); if (i >= 2) txt(ctx, 'new', x, 400, PRINT(22), '#6a7380'); }
    popAt(ctx, 1040, 330, at(39.83), () => { sh(ctx, c => c.arc(1040, 330, 110, 0, 7), P.yellow, 6); sh(ctx, c => c.roundRect(1000, 270, 26, 120, 8), INK, 0); sh(ctx, c => c.roundRect(1054, 270, 26, 120, 8), INK, 0); });
    if (at(42.21) > 0) popAt(ctx, 1040, 520, at(42.21), () => { K.card(ctx, 920, 480, 240, 80, '#fff', 16); txt(ctx, 'for 1 year', 1040, 520, HAND(700, 42)); });
    if (at(43.67) > 0) { popAt(ctx, 470, 560, at(43.67), () => { sh(ctx, c => c.arc(470, 560, 50, 0, 7), 'rgba(191,230,255,.4)', 7); Tn.line(ctx, [[505, 595], [560, 650]], 12, '#8a5a36'); txt(ctx, 'studying them', 650, 560, HAND(700, 36), INK, 'left'); }); }
  }
  function i9(ctx, lt, dur, t) { // New York went the furthest: the One Fair Price Act would ban browsing history, location, income, ZIP
    const T0 = 45.0, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff');
    popAt(ctx, 640, 70, at(45.81), () => { K.card(ctx, 420, 32, 440, 76, P.yellow, 16); txt(ctx, 'New York: the furthest', 640, 70, HAND(700, 40)); });
    K.doc(ctx, 250, 380, 340, 400, 'One Fair Price Act', ['passed: June 2026', 'S.8623B / A.9349B', '—', '—'], at(49.4), { titleSize: 38, lineSize: 24 });
    const D = [['browsing history', 52.47], ['location', 53.24], ['income', 53.81], ['ZIP code', 54.46]];
    D.forEach(([l, s], i) => { const x = 620 + (i % 2) * 330, y = 260 + Math.floor(i / 2) * 200; popAt(ctx, x + 140, y, at(s), () => { K.card(ctx, x, y - 70, 280, 140, '#fff', 18); txt(ctx, l, x + 140, y, HAND(700, 36)); sh(ctx, c => c.arc(x + 140, y, 62, 0, 7), null, 8, P.red); Tn.line(ctx, [[x + 96, y - 44], [x + 184, y + 44]], 8, P.red); }); });
    if (at(55.45) > 0) txt(ctx, 'to set individual prices', 950, 650, PRINT(26), INK, 'center', clamp(at(55.45) / .3));
    K.source(ctx, 'Source: Wilson Sonsini; Regulatory Oversight (Jun 2026)', at(48.3));
  }
  function i10(ctx, lt, dur, t) { // as of early October, waiting on Gov. Hochul's signature or veto; business groups asked her to change it first
    const T0 = 57.34, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#dbe6ff', '#f3f6ff');
    bean(ctx, 640, 600, 1.0, t, Object.assign({}, HOCHUL, { armR: [1.0, 1.3], face: { mouth: 'flat', brows: 'up', look: [Math.sin(t * 1.2), .4] } }));
    desk(ctx, 640, 560, 600); sh(ctx, c => c.rect(560, 505, 160, 60), '#fff', 4); txt(ctx, 'One Fair Price Act', 640, 534, PRINT(16));
    K.nameCard(ctx, 'Gov. Kathy Hochul', 'New York', 640, 110, at(59.47));
    popAt(ctx, 300, 330, at(60.86), () => { K.card(ctx, 180, 280, 240, 100, P.green, 18); txt(ctx, 'SIGN?', 300, 330, HAND(700, 50), '#fff'); });
    popAt(ctx, 980, 330, at(61.63), () => { K.card(ctx, 860, 280, 240, 100, P.red, 18); txt(ctx, 'VETO?', 980, 330, HAND(700, 50), '#fff'); });
    popAt(ctx, 640, 230, at(57.63), () => { K.card(ctx, 500, 200, 280, 56, P.yellow, 14); txt(ctx, 'early Oct 2026: pending', 640, 228, PRINT(22)); });
    if (at(62.73) > 0) for (let i = 0; i < 2; i++) { const k = at(62.73 + i * .2); const x = lerp(-80, 140 + i * 120, out(clamp(k / .8))); bean(ctx, x, 700, .55, t, Object.assign(Pr.extra(i + 5), { top: 'suit', body: '#2f3a55', armR: [1.5, .5], face: { mouth: 'smile', look: [.9, 0] } })); if (k > .8) K.bubble(ctx, 'changes?', x + 60, 470 - i * 80, 160, [x + 20, 520 - i * 80], k - .8, { size: 28 }); }
    K.source(ctx, 'Source: Spokesman-Review (Oct 4, 2026); NY1 (Aug 12, 2026)', at(58));
  }
  function dais(ctx) { sh(ctx, c => c.rect(80, 420, 1120, 60), '#7a4b2a', 5); sh(ctx, c => c.rect(100, 480, 1080, 240), '#9a643a', 5); }
  function i11(ctx, lt, dur, t) { // bipartisan: Aug 4, 2026 — Senate Judiciary Subcommittee on Crime and Counterterrorism, chaired by Josh Hawley — "Your Data, Their Profit"
    const T0 = 65.75, at = s => lt - (s - T0), hearing = at(70.39) > 0;
    if (!hearing) { K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
      const cap = (x) => { sh(ctx, c => c.rect(x - 220, 520, 440, 80), '#eef0f4', 5); sh(ctx, c => c.ellipse(x, 470, 90, 100, 0, Math.PI, 0), '#eef0f4', 5); sh(ctx, c => c.rect(x - 110, 470, 220, 50), '#eef0f4', 5); }; cap(640);
      const sh2 = clamp(at(67.7) / .6); bean(ctx, lerp(300, 560, out(sh2)), 700, .7, t, { skin: B.SKIN, hair: 'short', hairColor: '#4a3020', body: P.blue, top: 'suit', armR: [1.3, .2], face: { mouth: 'grin', look: [.8, 0] } }); bean(ctx, lerp(980, 720, out(sh2)), 700, .7, t, { skin: B.SKIN, hair: 'side', hairColor: '#8a7a6a', body: P.red, top: 'suit', armL: [1.3, .2], face: { mouth: 'grin', look: [-.8, 0] } });
      popAt(ctx, 640, 120, at(67.04), () => { K.card(ctx, 420, 80, 440, 80, P.yellow, 16); txt(ctx, 'a rare agreement', 640, 120, HAND(700, 44)); }); return; }
    K.bg.color(ctx, '#e9dcc6'); sh(ctx, c => c.rect(260, 60, 760, 110), '#1f2a44', 5); txt(ctx, '"Your Data, Their Profit"', 640, 115, HAND(700, 56), '#fff', 'center', clamp(at(79.62) / .4));
    if (at(79.62) <= 0) txt(ctx, 'Senate Judiciary hearing', 640, 115, HAND(700, 44), '#fff');
    bean(ctx, 640, 520, .85, t, Object.assign({}, HAWLEY, { face: { mouth: Math.sin(t * 7) > 0 ? 'smile' : 'flat', brows: 'up', look: [0, .2] } }));
    for (const x of [300, 980]) bean(ctx, x, 520, .75, t, Object.assign(Pr.extra(x / 100 | 0), { top: 'suit', body: '#2f3a55', face: { mouth: 'flat', look: [0, .2] } }));
    dais(ctx);
    K.nameCard(ctx, 'Sen. Josh Hawley (R)', 'subcommittee chair', 640, 560, at(77.05));
    popAt(ctx, 1060, 230, at(70.53), () => { K.card(ctx, 940, 196, 240, 68, P.yellow, 14); txt(ctx, 'Aug 4, 2026', 1060, 230, HAND(700, 36)); });
    if (at(72.58) > 0) txt(ctx, 'Subcommittee on Crime and Counterterrorism', 640, 640, PRINT(24), '#fff', 'center', clamp(at(72.58) / .3));
    K.source(ctx, 'Source: Senate Judiciary; Ballard Spahr (Aug 14, 2026)', at(71));
  }
  function i12(ctx, lt, dur, t) { // Democrat Richard Blumenthal: "We need a law. We need a federal law."
    const T0 = 81.76, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e9dcc6');
    bean(ctx, 360, 520, 1.0, t, Object.assign({}, BLUMENTHAL, { armR: [2.0, .5], face: { mouth: Math.sin(t * 8) > 0 ? 'o' : 'flat', brows: 'angry', look: [.6, 0] } }));
    sh(ctx, c => c.rect(40, 440, 640, 60), '#7a4b2a', 5); sh(ctx, c => c.rect(60, 500, 600, 240), '#9a643a', 5); Tn.line(ctx, [[400, 440], [430, 360]], 5, INK); sh(ctx, c => c.ellipse(434, 352, 12, 16, -.3, 0, 7), INK, 0);
    K.nameCard(ctx, 'Sen. Richard Blumenthal (D)', 'at the hearing', 360, 110, at(82.27));
    quoteCard(ctx, 930, 300, 480, ['"We need a law.', 'We need a', 'federal law."'], at(83.83), { size: 50, lh: 64, red: [2] });
  }
  function scales(ctx, x, y, tilt) { Tn.line(ctx, [[x, y], [x, y + 260]], 10, '#8a6a3a'); sh(ctx, c => c.rect(x - 80, y + 250, 160, 24), '#8a6a3a', 4); ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); Tn.line(ctx, [[-200, 0], [200, 0]], 8, '#8a6a3a'); for (const sx of [-200, 200]) { Tn.line(ctx, [[sx, 0], [sx - 50, 110]], 3, INK); Tn.line(ctx, [[sx, 0], [sx + 50, 110]], 3, INK); ctx.save(); ctx.translate(sx, 110); ctx.rotate(-tilt); sh(ctx, c => c.ellipse(0, 0, 70, 16, 0, 0, 7), '#e0b84e', 4); ctx.restore(); } ctx.restore(); }
  function i13(ctx, lt, dur, t) { // but there is a real other side to this, and it's worth hearing out
    const T0 = 86.52, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#e6dcff', '#f7f3ff');
    host(ctx, 300, 700, 1.1, t, [[T0, 'present'], [88.5, 'presentBoth']], { mouth: 'flat', brows: 'up', look: [.6, 0] });
    scales(ctx, 860, 260, Math.sin(t * 1.4) * .12);
    popAt(ctx, 860, 120, at(87.39), () => { K.card(ctx, 680, 80, 360, 80, P.yellow, 16); txt(ctx, 'the other side', 860, 120, HAND(700, 44)); });
  }
  function i14(ctx, lt, dur, t) { // NRF: tools respond to competitors and demand, give personalized discounts; 600,000+ retailers compete
    const T0 = 90.42, at = s => lt - (s - T0), p2 = at(100.18) > 0;
    K.bg.color(ctx, '#f3f6fb');
    logo(ctx, 'nrf', 160, 120, 150, at(90.51), { pad: 6 });
    if (at(91.37) > 0) txt(ctx, 'National Retail Federation', 260, 100, HAND(700, 36), INK, 'left', clamp(at(91.37) / .3)), txt(ctx, 'the big retail trade group', 260, 145, PRINT(22), '#6a7380', 'left', clamp(at(92.06) / .3));
    if (!p2) {
      popAt(ctx, 260, 420, at(95.87), () => { K.card(ctx, 110, 300, 300, 240, '#fff', 20); Pr.store(ctx, 210, 470, .3, 'A', { trim: P.blue, awning: P.blue }); Pr.store(ctx, 320, 470, .3, 'B', { trim: P.red, awning: P.red }); K.arrow(ctx, [190, 340], [330, 340], 1, P.blue, 4); txt(ctx, 'competitors', 260, 510, HAND(700, 32)); });
      popAt(ctx, 640, 420, at(96.65), () => { K.card(ctx, 490, 300, 300, 240, '#fff', 20); for (let i = 0; i < 5; i++) sh(ctx, c => c.rect(540 + i * 44, 460 - (20 + i * 18), 30, 20 + i * 18), P.green, 3); txt(ctx, 'demand', 640, 510, HAND(700, 32)); });
      popAt(ctx, 1020, 420, at(98.35), () => { K.card(ctx, 870, 300, 300, 240, '#fff', 20); ctx.save(); ctx.translate(1020, 400); ctx.rotate(-.06); sh(ctx, c => c.rect(-100, -50, 200, 100), P.green, 4); ctx.setLineDash([8, 6]); sh(ctx, c => c.rect(-88, -38, 176, 76), null, 3, '#fff'); ctx.setLineDash([]); txt(ctx, 'FOR YOU', 0, 2, HAND(700, 34), '#fff'); ctx.restore(); txt(ctx, 'personal discounts', 1020, 510, HAND(700, 30)); });
      K.source(ctx, "NRF's written statement, via Chain Drug Review (Aug 4, 2026)", at(93.7));
      return;
    }
    // 600,000+ retailers: a sea of little store fronts
    const n = Math.floor(clamp(at(102.26) / 1.4) * 60);
    for (let i = 0; i < n; i++) { const x = 90 + (i % 12) * 98, y = 300 + Math.floor(i / 12) * 80; Pr.store(ctx, x, y, .14, '', { trim: [P.red, P.blue, P.green, P.orange, P.purple][i % 5], awning: [P.red, P.blue, P.green, P.orange, P.purple][i % 5], w: 520, h: 300 }); }
    if (at(102.26) > 0) popAt(ctx, 640, 640, at(102.26), () => { K.card(ctx, 400, 600, 480, 80, P.yellow, 16); txt(ctx, '600,000+ retailers compete', 640, 640, HAND(700, 38)); });
    if (at(105.19) > 0) popAt(ctx, 1080, 160, at(105.19), () => { K.card(ctx, 940, 120, 280, 80, '#fff', 16); txt(ctx, '→ affordable + trust', 1080, 160, HAND(700, 30)); });
    txt(ctx, "NRF's argument", 1210, 700, PRINT(18), '#8a93a0', 'right');
  }
  function i15(ctx, lt, dur, t) { // Michele Siekerka (NJBIA): could eliminate some loyalty programs, coupons, customer-specific discounts
    const T0 = 107.97, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffe1c8', '#fff6ee');
    bean(ctx, 280, 700, 1.1, t, Object.assign({}, SIEKERKA, { armR: [1.8, .5], face: { mouth: 'flat', brows: 'worried', look: [.6, 0] } }));
    K.nameCard(ctx, 'Michele Siekerka', 'President, NJ Business & Industry Assn.', 300, 110, at(108.77));
    logo(ctx, 'njbia', 1080, 90, 180, at(111.25), { pad: 8 });
    if (at(113.49) > 0) popAt(ctx, 820, 230, at(113.49), () => { K.card(ctx, 600, 190, 440, 80, '#fff', 16); txt(ctx, 'her warning: "elimination of…"', 820, 230, HAND(700, 30)); });
    [['loyalty card', 117.96, 640], ['coupons', 118.88, 860], ['customer discounts', 120.55, 1080]].forEach(([l, s, x], i) => { const k = at(s); if (k <= 0) return; const fade = clamp((k - .6) / .8);
      ctx.save(); ctx.globalAlpha = 1 - fade * .6; popAt(ctx, x, 440, k, () => { if (i === 0) { sh(ctx, c => c.roundRect(x - 90, 380, 180, 110, 12), P.blue, 4); sh(ctx, c => c.rect(x - 90, 400, 180, 20), INK, 0); } else if (i === 1) { ctx.setLineDash([8, 6]); sh(ctx, c => c.rect(x - 90, 380, 180, 110), P.yellow, 4); ctx.setLineDash([]); txt(ctx, '%', x, 435, HAND(700, 60)); } else Pr.tag(ctx, x, 400, 1, 'just for you', 1, { color: '#d8f5d0', size: 26 }); }); ctx.restore();
      txt(ctx, l, x, 540, HAND(700, 30)); if (fade > 0) K.cross(ctx, x, 440, 120, fade); });
  }
  function i16(ctx, lt, dur, t) { // Z. John Zhang: personalized pricing can help price-sensitive consumers — student discounts, senior pricing
    const T0 = 122.44, at = s => lt - (s - T0), p2 = at(132.48) > 0;
    K.bg.studio(ctx, '#d7e9ff', '#f2f8ff');
    bean(ctx, 260, 700, 1.05, t, Object.assign({}, ZHANG, { armR: [1.8, .4], face: { mouth: 'smile', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Z. John Zhang', 'Wharton marketing professor', 270, 110, at(125.36));
    if (!p2) { quoteCard(ctx, 830, 330, 600, ['personalized pricing can', 'sometimes help consumers', '— especially price-sensitive ones'], at(126.98), { size: 36, lh: 48 }); return; }
    const st = bean(ctx, 560, 700, .8, t, Object.assign(Pr.extra(1), { body: P.orange, armR: [1.3, .9], face: { mouth: 'grin', look: [.4, 0] } })); Pr.tag(ctx, st.hands.R[0] + 30, st.hands.R[1] - 40, .8, 'student price', at(132.68), { color: '#d8f5d0', size: 26 });
    const sn = bean(ctx, 1120, 700, .8, t, Object.assign(Pr.extra(5), { hair: 'bald', body: P.purple, armL: [1.3, .9], face: { mouth: 'grin', look: [-.4, 0] } })); Pr.tag(ctx, sn.hands.L[0] - 30, sn.hands.L[1] - 40, .8, 'senior price', at(133.77), { color: '#d8f5d0', size: 26 });
    if (at(135.06) > 0) popAt(ctx, 860, 140, at(135.06), () => { K.card(ctx, 600, 100, 520, 80, P.yellow, 16); txt(ctx, 'different people, different prices', 860, 140, HAND(700, 32)); });
  }
  function i17(ctx, lt, dur, t) { // exceptions: Maryland's law and NY's bill — discounts, loyalty programs, coupons; Connecticut — discounts
    const T0 = 138.54, at = s => lt - (s - T0);
    K.bg.white(ctx);
    popAt(ctx, 640, 70, at(138.83), () => { K.card(ctx, 400, 32, 480, 76, P.yellow, 16); txt(ctx, 'exceptions written in', 640, 70, HAND(700, 40)); });
    const cols = [['discounts', 144.09], ['loyalty programs', 145.04], ['coupons', 146.32]], rows = [["Maryland's law", 140.16, [1, 1, 1]], ["New York's bill", 141.32, [1, 1, 1]], ["Connecticut's law", 147.67, [1, 0, 0]]];
    cols.forEach(([l, s], j) => txt(ctx, l, 640 + j * 220, 170, HAND(700, 32), INK, 'center', clamp(at(s - 4) / .3)));
    rows.forEach(([l, s, v], i) => { const y = 270 + i * 130; if (at(s) <= 0) return; popAt(ctx, 270, y, at(s), () => { K.card(ctx, 110, y - 44, 330, 88, '#fff', 16); txt(ctx, l, 275, y, HAND(700, 36)); });
      v.forEach((on, j) => { const k = at(i === 2 ? 149.53 : cols[j][1]); if (on && k > 0) K.check(ctx, 640 + j * 220, y, 60, clamp(k / .4)); else if (!on && at(149.53) > 0) txt(ctx, '—', 640 + j * 220, y, HAND(700, 50), '#c9ced6'); }); });
    K.source(ctx, 'Sources: Skadden; Wilson Sonsini; Stateline', at(140.5));
  }
  function i18(ctx, lt, dur, t) { // the fight isn't whether people can ever pay different prices — it's whether a company can quietly raise yours because of what it knows
    const T0 = 151.3, at = s => lt - (s - T0), p2 = at(155.94) > 0;
    K.bg.cream(ctx); Tn.line(ctx, [[640, 80], [640, 680]], 4, '#d4c7b0');
    popAt(ctx, 320, 120, at(152.6), () => { K.card(ctx, 160, 84, 320, 72, '#fff', 16); txt(ctx, 'different prices?', 320, 120, HAND(700, 38)); });
    const st = bean(ctx, 320, 690, .9, t, Object.assign(Pr.extra(1), { body: P.orange, armR: [1.3, .9], face: { mouth: 'grin', look: [.3, 0] } })); Pr.tag(ctx, st.hands.R[0] + 40, st.hands.R[1] - 40, .8, 'student price', at(153.0), { color: '#d8f5d0', size: 26 });
    if (at(154.3) > 0) K.check(ctx, 320, 230, 70, clamp(at(154.3) / .4));
    if (!p2) return;
    popAt(ctx, 960, 120, at(155.94), () => { K.card(ctx, 780, 84, 360, 72, P.red, 16); txt(ctx, 'the real fight', 960, 120, HAND(700, 40), '#fff'); });
    bean(ctx, 960, 690, .9, t, Object.assign({}, Pr.YOU, { face: { mouth: 'flat', brows: 'calm', look: [0, .3] } }));
    const k = clamp(at(157.63) / 1.0); Pr.tag(ctx, 1080, 380 - k * 40, .9, k > .5 ? '$$$' : '$$', 1, { color: k > .5 ? '#ffd6d0' : '#fff' });
    // a quiet hand from off-screen nudges the tag up while an eye watches
    if (at(157.16) > 0) { Tn.line(ctx, [[1300, 230], [1130, 330 - k * 40]], 30, INK); Tn.line(ctx, [[1300, 230], [1130, 330 - k * 40]], 22, '#3a3550'); sh(ctx, c => c.ellipse(1124, 336 - k * 40, 20, 16, 0, 0, 7), '#fff', 4);
      sh(ctx, c => { c.moveTo(1120, 210); c.quadraticCurveTo(1170, 180, 1220, 210); c.quadraticCurveTo(1170, 240, 1120, 210); }, '#fff', 4); sh(ctx, c => c.arc(1165 + Math.sin(t) * 10, 210, 12, 0, 7), INK, 0); }
    if (at(159.02) > 0) { K.cross(ctx, 960, 250, 70, clamp(at(159.02) / .4)); txt(ctx, 'because of what it knows about you', 960, 560, HAND(700, 28), P.red, 'center', clamp(at(159.02) / .3)); }
  }

  // ================= ENDING =================
  function oldStore(ctx, x, y, s, label, col) { Pr.store(ctx, x, y, s, label, { trim: col, awning: col, wall: '#f6ead2' }); }
  function i19(ctx, lt, dur, t) { // for most of history a price was public — a sticker everyone saw; too high? complain, or go across the street
    const T0 = 160.43, at = s => lt - (s - T0), street = at(169.39) > 0;
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, [[0, '#ffe6c4'], [1, '#fff6ea']]); ctx.fillRect(0, 0, W, H);
    if (!street) {
      sh(ctx, c => c.rect(80, 440, 1120, 40), '#b67f4c', 5); sh(ctx, c => c.rect(100, 480, 1080, 240), '#c9955e', 5);
      sh(ctx, c => c.rect(560, 300, 160, 140), '#e04b3a', 5); txt(ctx, 'JAM', 640, 370, HAND(700, 40), '#fff');
      if (at(163.09) > 0) popAt(ctx, 690, 300, at(163.09), () => { ctx.save(); ctx.translate(690, 300); ctx.rotate(.15); sh(ctx, c => c.roundRect(-50, -26, 100, 52, 6), '#fff', 4); txt(ctx, '$•.••', 0, 2, HAND(700, 30)); ctx.restore(); });
      for (let i = 0; i < 5; i++) { const x = 140 + i * 250 - (i > 1 ? -150 : 0); if (i === 2) continue; bean(ctx, x, 720, .55, t, Object.assign(Pr.extra(i + 1), { face: { mouth: at(166.84) > 0 && i === 4 ? 'frown' : 'flat', brows: at(166.84) > 0 && i === 4 ? 'angry' : 'calm', look: [(640 - x) / 600, -.3] } })); }
      if (at(164.23) > 0) popAt(ctx, 640, 140, at(164.23), () => { K.card(ctx, 420, 100, 440, 80, '#fff', 16); txt(ctx, 'everyone saw the same number', 640, 140, HAND(700, 32)); });
      if (at(168.23) > 0) K.bubble(ctx, 'Too high!', 1100, 340, 220, [1080, 420], at(168.23), { size: 36 });
      popAt(ctx, 220, 130, at(161.91), () => { K.card(ctx, 90, 94, 260, 72, P.yellow, 16); txt(ctx, 'price = public', 220, 130, HAND(700, 36)); });
      return;
    }
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    oldStore(ctx, 250, 560, .8, 'STORE A', P.red); oldStore(ctx, 1030, 560, .8, 'STORE B', P.green);
    const k = clamp(at(169.6) / 1.2); bean(ctx, lerp(400, 880, inout(k)), 700, .7, t, Object.assign(Pr.extra(5), { face: { mouth: k > .9 ? 'smile' : 'frown', look: [.8, 0] } }));
    popAt(ctx, 640, 120, at(169.85), () => { K.card(ctx, 440, 80, 400, 80, '#fff', 16); txt(ctx, 'across the street', 640, 120, HAND(700, 40)); });
  }
  function i20(ctx, lt, dur, t) { // that's the whole reason competition works: you can only shop around against a price you can see
    const T0 = 171.53, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    oldStore(ctx, 250, 560, .8, 'STORE A', P.red); oldStore(ctx, 1030, 560, .8, 'STORE B', P.green);
    Pr.tag(ctx, 250, 140, 1.3, '$$', 1, {}); Pr.tag(ctx, 1030, 140, 1.3, '$', 1, { color: '#d8f5d0' });
    bean(ctx, 640, 700, .8, t, Object.assign({}, Pr.YOU, { face: { mouth: 'smile', look: [Math.sin(t * 1.5), -.3] } }));
    if (at(172.43) > 0) popAt(ctx, 640, 300, at(172.43), () => { K.card(ctx, 470, 260, 340, 80, P.yellow, 16); txt(ctx, 'competition works', 640, 300, HAND(700, 40)); });
    if (at(175.13) > 0) popAt(ctx, 640, 400, at(175.13), () => { K.card(ctx, 420, 370, 440, 60, '#fff', 14); txt(ctx, '…against a price you can see', 640, 400, HAND(700, 30)); });
  }
  function i21(ctx, lt, dur, t) { // the price on your phone isn't always a fact — sometimes a guess about you, a test, a number picked to see if you'll flinch
    const T0 = 176.78, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff');
    Pr.phone(ctx, 360, 380, .95, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#f6f2ea'; c.fillRect(20, 60, w - 40, 200); Pr.eggs(c, w / 2, 230, .8); txt(c, '$4.79', w / 2, 320, HAND(700, 64), P.red); });
    popAt(ctx, 820, 160, at(180.22), () => { K.card(ctx, 700, 120, 240, 80, '#fff', 16); txt(ctx, 'a fact?', 820, 160, HAND(700, 44)); });
    if (at(180.6) > 0) K.strike(ctx, 720, 160, 920, 160, clamp(at(180.6) / .3), P.red, 8);
    [['a guess about you', 182.46, 290], ['a test', 183.65, 400], ['to see if you flinch', 184.68, 510]].forEach(([l, s, y]) => popAt(ctx, 900, y, at(s), () => { K.card(ctx, 720, y - 40, 360, 80, P.yellow, 16); txt(ctx, l, 900, y, HAND(700, 36)); }));
    if (at(185.74) > 0) bean(ctx, 1170, 700, .6, t, Object.assign({}, Pr.YOU, { lean: Math.sin(at(185.74) * 30) * .06 * Math.exp(-at(185.74) * 3), face: { mouth: 'o', brows: 'worried', eyes: .6 } }));
  }
  function stopSign(ctx, x, y, s, lt, key, crop) { popAt(ctx, x, y, lt, () => { Tn.line(ctx, [[x, y + 90 * s], [x, y + 300 * s]], 10 * s, '#8a8f99'); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => { for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; c.lineTo(Math.cos(a) * 100, Math.sin(a) * 100); } c.closePath(); }, P.red, 6); txt(ctx, 'STOP', 0, -20, HAND(700, 46), '#fff'); ctx.restore(); if (IMG[key]) { K.card(ctx, x - 76 * s, y + 18 * s, 152 * s, 56 * s, '#fff', 8); ctx.drawImage(IMG[key], ...crop, x - 70 * s, y + 22 * s, 140 * s, 48 * s); } }); }
  function i22(ctx, lt, dur, t) { // Instacart stopped; Amazon stopped 25+ years ago — but the tools got better and the data got bigger
    const T0 = 186.99, at = s => lt - (s - T0), grow = at(191.56) > 0;
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    stopSign(ctx, 220, 300, 1.0, at(187.59), 'instacart', [18, 18, 1164, 592]);
    stopSign(ctx, 480, 300, 1.0, at(188.95), 'amazon', [20, 120, 728, 260]);
    if (at(189.37) > 0) txt(ctx, '2000', 480, 470, HAND(700, 34), INK, 'center', clamp(at(189.37) / .3));
    if (grow) { const g = out(clamp(at(191.75) / 1.6));
      ctx.save(); ctx.translate(840, 330); ctx.rotate(t * .6); const r = lerp(40, 110, g); sh(ctx, c => { for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, a2 = a + Math.PI / 10; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); c.lineTo(Math.cos(a2) * r * .8, Math.sin(a2) * r * .8); } c.closePath(); }, '#9aa6b8', 5); ctx.restore(); txt(ctx, 'better tools', 840, 470, HAND(700, 34));
      const d = out(clamp(at(193.9) / 1.4)); for (let i = 0; i < Math.floor(d * 30); i++) { const x = 1040 + (i % 5) * 36 - 72, y = 580 - Math.floor(i / 5) * 30; sh(ctx, c => c.roundRect(x - 16, y - 12, 32, 24, 4), '#fff', 2.5); } if (d > .1) txt(ctx, 'bigger data', 1040, 620, HAND(700, 34)); }
  }
  function i23(ctx, lt, dur, t) { // right now, whether a company can use what it knows to set your price depends mostly on your state
    const T0 = 195.85, at = s => lt - (s - T0);
    K.bg.color(ctx, '#cfe9ff');
    usMap(ctx, { MD: [1, P.green], CT: [1, P.green], NJ: [1, P.green], NY: [1, P.yellow] }, { fill: '#e3e7ec' });
    bean(ctx, 560, 430, .35, t, Object.assign({}, Pr.YOU, { face: { mouth: 'flat', look: [Math.sin(t), 0] } }));
    popAt(ctx, 640, 640, at(200.18), () => { K.card(ctx, 340, 600, 600, 80, P.yellow, 16); txt(ctx, 'it depends on which state you live in', 640, 640, HAND(700, 36)); });
    popAt(ctx, 1060, 640, at(197), () => { K.card(ctx, 960, 520, 300, 100, '#fff', 14); sh(ctx, c => c.arc(990, 548, 10, 0, 7), P.green, 3); txt(ctx, 'law signed', 1010, 548, PRINT(20), INK, 'left'); sh(ctx, c => c.arc(990, 590, 10, 0, 7), P.yellow, 3); txt(ctx, 'bill pending (NY)', 1010, 590, PRINT(20), INK, 'left'); });
  }
  function i24(ctx, lt, dur, t) { // so here's my advice — not financial advice, just common sense
    const T0 = 202.82, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd76a', '#fff3c9');
    host(ctx, 400, 700, 1.15, t, [[T0, 'pointUp'], [204.8, 'present'], [206.3, 'thumbsUp']], { mouth: 'smile', brows: 'up', eyes: at(206.6) > 0 ? 'happy' : 'open', look: [.4, 0] });
    popAt(ctx, 920, 260, at(203.69), () => { K.card(ctx, 760, 210, 320, 100, '#fff', 18); txt(ctx, 'my advice', 920, 260, HAND(700, 50)); });
    K.stamp(ctx, 'NOT FINANCIAL ADVICE', 920, 420, at(205.22), { color: P.red, size: 40, rot: -.06 });
    if (at(206.61) > 0) popAt(ctx, 920, 540, at(206.61), () => { K.card(ctx, 760, 500, 320, 80, P.green, 16); txt(ctx, 'just common sense', 920, 540, HAND(700, 38), '#fff'); });
  }
  function i25(ctx, lt, dur, t) { // feels expensive in an app? check the store, another app, ask a friend
    const T0 = 208.3, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    const you = bean(ctx, 230, 700, 1.05, t, Object.assign({}, Pr.YOU, { armR: [.9, 1.4], face: { mouth: at(209.04) > 0 ? 'frown' : 'flat', brows: 'worried', look: [.6, .3] } }));
    sh(ctx, c => c.roundRect(you.hands.R[0] - 8, you.hands.R[1] - 90, 60, 100, 8), '#24272e', 3);
    if (at(209.04) > 0) K.bubble(ctx, 'pricey?', 300, 180, 180, [250, 260], at(209.04), { size: 34 });
    popAt(ctx, 800, 90, at(210.83), () => { K.card(ctx, 560, 54, 480, 72, P.yellow, 16); txt(ctx, 'check it somewhere else', 800, 90, HAND(700, 38)); });
    [['the store', 212.4, 560], ['another app', 213.65, 820], ['a friend', 214.7, 1080]].forEach(([l, s, x], i) => popAt(ctx, x, 380, at(s), () => { K.card(ctx, x - 115, 200, 230, 300, '#fff', 20);
      if (i === 0) Pr.store(ctx, x, 380, .3, 'STORE', { trim: P.blue, awning: P.blue }); else if (i === 1) Pr.phone(ctx, x, 330, .3, (c, w, h) => { c.fillStyle = '#f1e8ff'; c.fillRect(0, 0, w, h); }); else B.head(ctx, x, 320, 54, Object.assign({}, Pr.NEIGHBOUR, { face: { mouth: 'smile' } }));
      txt(ctx, l, x, 450, HAND(700, 36)); K.check(ctx, x + 80, 230, 44, clamp(at(s + .2) / .3)); }));
  }
  const TILE_BG = ['#ffd7a8', '#cfe9ff', '#d8f2c9', '#f8d3e1', '#e6dcff', '#fff0b3', '#c9f0ea', '#ffe0cc'];
  function i26(ctx, lt, dur, t) { // a big reason any of this came out: regular people compared their screens
    const T0 = 216.16, at = s => lt - (s - T0), z = clamp(at(218.35) / 1.4);
    K.bg.color(ctx, '#1b1d23');
    if (z < 1) { ctx.save(); ctx.globalAlpha = 1; K.bg.cream(ctx);
      const a = bean(ctx, 470, 700, 1.0, t, Object.assign({}, Pr.YOU, { armR: [1.0, 1.2], face: { mouth: 'smile', look: [.6, .3] } })); const b = bean(ctx, 810, 700, 1.0, t, Object.assign({}, Pr.NEIGHBOUR, { armL: [1.0, 1.2], face: { mouth: 'o', brows: 'up', look: [-.6, .3] } }));
      K.bubble(ctx, '$4.79', 400, 220, 170, [450, 300], 1, { size: 44, fill: '#ffd6d0' }); K.bubble(ctx, '$3.99', 880, 220, 170, [830, 300], 1, { size: 44, fill: '#d8f5d0' });
      popAt(ctx, 640, 90, at(216.49), () => { K.card(ctx, 470, 54, 340, 72, P.yellow, 16); txt(ctx, 'compare screens', 640, 90, HAND(700, 40)); });
      if (z > 0) { ctx.fillStyle = `rgba(27,29,35,${z})`; ctx.fillRect(0, 0, W, H); } ctx.restore(); return; }
    for (let i = 0; i < 40; i++) { const x = 48 + (i % 8) * 149, y = 100 + Math.floor(i / 8) * 108; sh(ctx, c => c.roundRect(x, y, 141, 100, 8), TILE_BG[(i * 3) % 8], 2.5, '#15171c'); B.head(ctx, x + 70, y + 50, 30, Object.assign(Pr.extra(i), { face: { mouth: 'smile', look: [0, .4] } })); }
    popAt(ctx, 640, 50, at(219.12), () => { K.card(ctx, 380, 16, 520, 68, P.yellow, 16); txt(ctx, 'regular people, comparing screens', 640, 50, HAND(700, 34)); });
  }
  function i27(ctx, lt, dur, t) { // "Your price isn't my price. And until the law catches up, the only way you'll know is if we compare notes." + end card
    const T0 = 221.0, at = s => lt - (s - T0), end = at(226.0) > 0;
    K.bg.color(ctx, '#ffd76a'); ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let i = -4; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 90 + lt * 30, 0); ctx.lineTo(i * 90 + 300 + lt * 30, H); ctx.lineTo(i * 90 + 340 + lt * 30, H); ctx.lineTo(i * 90 + 40 + lt * 30, 0); ctx.fill(); }
    popAt(ctx, 640, 150, at(221.0), () => { K.slam(ctx, 'YOUR PRICE', 640, 110, 1, 92, INK, { stroke: '#fff' }); K.slam(ctx, "ISN'T MY PRICE", 640, 205, 1, 92, P.red, { stroke: '#fff' }); });
    const y = bean(ctx, 300, 700, 1.0, t, Object.assign({}, Pr.YOU, { armR: [2.4, .3], face: { mouth: 'smile', brows: 'up', look: [.8, -.2] } }));
    const n = bean(ctx, 980, 700, 1.0, t, Object.assign({}, Pr.NEIGHBOUR, { armL: [2.4, .3], face: { mouth: 'smile', brows: 'up', look: [-.8, -.2] } }));
    Pr.tag(ctx, y.hands.R[0] + 10, y.hands.R[1] + 10, .9, '$4.79', at(221.2), { color: '#ffd6d0' }); Pr.tag(ctx, n.hands.L[0] - 10, n.hands.L[1] + 10, .9, '$3.99', at(221.4), { color: '#d8f5d0' });
    if (at(225.12) > 0 && !end) popAt(ctx, 640, 450, at(225.12), () => { K.card(ctx, 440, 410, 400, 80, '#fff', 16); txt(ctx, 'compare notes', 640, 450, HAND(700, 46)); });
    if (end) { const k = clamp(at(226.0) / .5); ctx.fillStyle = `rgba(31,28,26,${.88 * k})`; ctx.fillRect(0, 0, W, H);
      popAt(ctx, 640, 300, at(226.2), () => { txt(ctx, 'YOUR PRICE ISN\'T MY PRICE', 640, 260, HAND(700, 64), '#fff'); txt(ctx, 'Sources in the description', 640, 340, PRINT(30), P.yellow); });
      if (at(226.6) > 0) txt(ctx, 'Educational only. Not legal or financial advice.', 640, 470, PRINT(28), '#fff', 'center', clamp(at(226.6) / .4)); }
  }

  const SH = [[0, 1.75, i1], [1.75, 7.58, i2], [7.58, 17.24, i3], [17.24, 23.72, i4], [23.72, 26.89, i5], [26.89, 28.92, i6], [28.92, 39.04, i7], [39.04, 45.0, i8], [45.0, 57.34, i9], [57.34, 65.75, i10], [65.75, 81.76, i11], [81.76, 86.52, i12],
    [86.52, 90.42, i13], [90.42, 107.97, i14], [107.97, 122.44, i15], [122.44, 138.54, i16], [138.54, 151.3, i17], [151.3, 160.43, i18],
    [160.43, 171.53, i19], [171.53, 176.78, i20], [176.78, 186.99, i21], [186.99, 195.85, i22], [195.85, 202.82, i23], [202.82, 208.3, i24], [208.3, 216.16, i25], [216.16, 221.0, i26], [221.0, 230.0, i27]];
  const DUR = 230.0;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [.6, 1.92, 4.83, 9.8, 15.99, 18.01, 20.29, 27.4, 29.94, 35.4, 39.83, 42.21, 43.67, 45.81, 49.4, 52.47, 53.24, 53.81, 54.46, 57.63, 59.47, 60.86, 61.63, 67.04, 70.53, 77.05, 82.27, 83.83, 87.39, 90.51, 95.87, 96.65, 98.35, 102.26, 105.19,
    108.77, 111.25, 113.49, 117.96, 118.88, 120.55, 125.36, 126.98, 132.68, 133.77, 135.06, 138.83, 140.16, 141.32, 147.67, 152.6, 155.94, 161.91, 163.09, 164.23, 168.23, 169.85, 172.43, 175.13, 180.22, 182.46, 183.65, 184.68,
    187.59, 188.95, 197, 200.18, 203.69, 206.61, 209.04, 210.83, 212.4, 213.65, 214.7, 216.49, 219.12, 225.12, 226.2].map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[.5, 'ding'], [4.49, 'paper'], [14.23, 'rise'], [15.2, 'buzz'], [18.01, 'stamp'], [20.29, 'stamp'], [24.02, 'stamp'], [27.35, 'ding'], [32.48, 'paper'], [39.83, 'click'], [52.47, 'buzz'], [53.24, 'buzz'], [53.81, 'buzz'], [54.46, 'buzz'], [67.7, 'ding'],
    [79.62, 'thud'], [84.12, 'thud'], [85.47, 'thud'], [102.26, 'type'], [118.0, 'buzz'], [118.9, 'buzz'], [120.6, 'buzz'], [144.09, 'ding'], [145.04, 'ding'], [146.32, 'ding'], [149.53, 'ding'], [154.3, 'ding'], [157.63, 'rise'], [159.02, 'buzz'],
    [163.09, 'click'], [168.23, 'boing'], [169.6, 'whoosh'], [180.6, 'swoosh'], [185.74, 'boing'], [187.59, 'thud'], [188.95, 'thud'], [191.75, 'rise'], [205.22, 'stamp'], [212.6, 'ding'], [213.85, 'ding'], [214.9, 'ding'], [218.35, 'whoosh'], [221.0, 'thud'], [226.0, 'swoosh']]
    .map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/pricing-4.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .14,
    moods: [{ t: 0, mood: 'lofiUp' }, { t: 86.52, mood: 'lofi' }, { t: 151.3, mood: 'lofiKeys' }, { t: 176.78, mood: 'lofi' }, { t: 216.16, mood: 'lofiUp', fade: 4 }],
    images: { instacart: 'assets/pricing/instacart.png', amazon: 'assets/pricing/amazon.png', nrf: 'assets/pricing/nrf.png', njbia: 'assets/pricing/nj-business-and-industry-association.png' },
    fonts: G.BizFont.load };
})(window);
