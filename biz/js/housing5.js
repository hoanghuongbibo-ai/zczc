/* "Why Americans Can't Buy a House Until 40" — part 5: CHAPTER 7 (Who Actually Gets In) + ENDING + disclaimer.
 * Voice: assets/audio/housing-05-ch7-end.mp3; shot times are the narration's word times. */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Ch = G.Charts, I = G.Icons, Tn = G.Toon;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const ground = (ctx, c = '#7ccf55', y = 590) => { ctx.fillStyle = c; ctx.fillRect(0, y, W, H - y); Tn.line(ctx, [[0, y], [W, y]], 4, INK); };
  const YOU = { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', body: P.teal };
  const PARENT = (i) => ({ skin: 'white', hair: i ? 'greyBun' : 'bald', body: i ? P.pink : '#7a8088', glasses: !i });
  function moneyBag(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); I.draw(ctx, 'moneyBag', 0, 0, 100, 1); ctx.restore(); }
  function cuffs(ctx, x, y, s, rot = 0, col = '#f6c945') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    for (const dx of [-60, 60]) { ctx.beginPath(); ctx.arc(dx, 0, 44, 0, 7); ctx.arc(dx, 0, 28, 0, 7, true); ctx.fillStyle = col; ctx.fill('evenodd'); ctx.lineWidth = 4.5; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(dx, 0, 44, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(dx, 0, 28, 0, 7); ctx.stroke(); }
    for (let i = 0; i < 3; i++) sh(ctx, c => c.ellipse(-22 + i * 22, -50, 12, 7, 0, 0, 7), null, 4); ctx.restore(); }

  // ================= CHAPTER 7: WHO ACTUALLY GETS IN =================
  function h1(ctx, lt, dur, t) { // here's what I think is the most important number in this whole video
    if (lt < 1.7) { K.chapterCard(ctx, lt, 7, 'Who Actually Gets In', '#8e6bd8'); return; }
    K.bg.studio(ctx, '#ffd76a', '#fff3c9');
    host(ctx, 640, 700, 1.2, t, [[0, 'pointUp'], [2.0, 'presentBoth']], { mouth: 'flat', brows: 'up', look: [0, 0] });
  }
  function briefcase(ctx, x, y, s, open, t) { // a valise of cash; open (0..1) swings the lid and lets bills fly
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 9 && open > .3; i++) { const k = ((t * .9 + i * .23) % 1), bx = (i - 4) * 18 + Math.sin(i * 2.1) * 40 * k, by = -40 - k * 190, r = Math.sin(t * 3 + i) * .6;
      ctx.save(); ctx.globalAlpha = 1 - k * .8; ctx.translate(bx, by); ctx.rotate(r); sh(ctx, c => c.roundRect(-26, -13, 52, 26, 4), '#86cf6f', 2.5); txt(ctx, '$', 0, 1, HAND(700, 22), '#1d5a2a'); ctx.restore(); }
    sh(ctx, c => c.roundRect(-110, -70, 220, 140, 16), '#8a5a36', 5);
    sh(ctx, c => c.roundRect(-34, -96, 68, 30, [12, 12, 0, 0]), null, 8);
    if (open > .05) { ctx.save(); ctx.translate(0, -70); ctx.scale(1, 1 - open * 1.6); sh(ctx, c => c.roundRect(-110, -60, 220, 60, [16, 16, 0, 0]), '#a06b42', 5); ctx.restore(); for (let i = 0; i < 4; i++) sh(ctx, c => c.roundRect(-90 + i * 46, -84, 40, 22, 3), '#86cf6f', 2.5); }
    for (const dx of [-70, 70]) sh(ctx, c => c.roundRect(dx - 10, -6, 20, 14, 3), P.yellow, 3);
    ctx.restore();
  }
  function giftBox(ctx, x, y, s, open) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.rect(-60, -50, 120, 100), P.pink, 4.5); sh(ctx, c => c.rect(-12, -50, 24, 100), P.yellow, 3);
    ctx.save(); ctx.translate(0, -50 - open * 60); ctx.rotate(-open * .5); sh(ctx, c => c.rect(-68, -24, 136, 24), '#f7c0cc', 4.5); sh(ctx, c => c.rect(-12, -24, 24, 24), P.yellow, 3);
    sh(ctx, c => c.ellipse(-22, -32, 22, 12, -.4, 0, 7), P.yellow, 3); sh(ctx, c => c.ellipse(22, -32, 22, 12, .4, 0, 7), P.yellow, 3); ctx.restore();
    if (open > .5) for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-30 + i * 30, -70 - open * 30); ctx.rotate(-.3 + i * .3); sh(ctx, c => c.roundRect(-24, -12, 48, 24, 4), '#86cf6f', 2.5); txt(ctx, '$', 0, 1, HAND(700, 20), '#1d5a2a'); ctx.restore(); }
    ctx.restore(); }
  function willScroll(ctx, x, y, s, k) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const h = 40 + 130 * out(k);
    sh(ctx, c => c.rect(-70, -h / 2, 140, h), '#fff3d1', 4); for (const yy of [-h / 2, h / 2]) sh(ctx, c => c.roundRect(-82, yy - 12, 164, 24, 12), '#e6c98d', 4);
    if (k > .6) { txt(ctx, 'Last Will', 0, -h / 2 + 32, HAND(700, 28), '#6b4a1d'); ctx.fillStyle = '#d9c9a0'; for (let i = 0; i < 3; i++) ctx.fillRect(-50, -h / 2 + 52 + i * 18, 100, 6); sh(ctx, c => c.arc(36, h / 2 - 34, 14, 0, 7), P.red, 3); }
    ctx.restore(); }
  function h2(ctx, lt, dur, t) { // skit: Gen Z + millennial buyers vs a $429,100 house — parents roll in a valise of cash (24% used family money), a gift box (21% cash gifts), a will (11% inheritance)
    const T0 = 3.48, at = s => lt - (s - T0);
    K.bg.sky(ctx); ground(ctx);
    K.house(ctx, 1040, 600, 1.25);
    popAt(ctx, 1040, 230, at(4.0), () => { ctx.save(); ctx.translate(1040, 230); ctx.rotate(.05); sh(ctx, c => c.roundRect(-110, -36, 220, 72, 10), '#fff', 4.5); txt(ctx, '$429,100', 0, 2, HAND(700, 46), P.red); ctx.restore(); });
    // the two buyers walk in, then stare at the price
    const walk = clamp(at(5.5) / 1.6), stare = at(9.0) > 0 && at(9.68) < 0;
    const gx = lerp(-120, 560, out(walk)), mx = lerp(-260, 700, out(walk));
    const happy = at(10.2) > 0;
    bean(ctx, gx, 650, .85, t, { skin: B.SKIN, hair: 'side', hairColor: '#7a3fbf', body: P.yellow, face: { mouth: happy ? 'grin' : stare ? 'o' : 'flat', brows: happy ? 'up' : stare ? 'worried' : 'calm', look: [.8, -.2] }, walk: walk < 1 ? t * 9 : undefined, armR: happy ? [2.6, 0] : undefined });
    bean(ctx, mx, 650, .9, t + 1, { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', glasses: true, body: P.teal, top: 'shirt', face: { mouth: happy ? 'grin' : stare ? 'o' : 'flat', brows: happy ? 'up' : stare ? 'worried' : 'calm', look: [.8, -.2] }, walk: walk < 1 ? t * 9 + 1 : undefined, armL: happy ? [2.6, 0] : undefined });
    if (at(7.37) > 0) popAt(ctx, gx, 300, at(7.37), () => { K.card(ctx, gx - 60, 272, 120, 56, '#1f1c1a', 12, 0); txt(ctx, 'Gen Z', gx, 300, HAND(700, 34), '#fff'); });
    if (at(8.16) > 0) popAt(ctx, mx, 300, at(8.16), () => { K.card(ctx, mx - 80, 272, 160, 56, '#1f1c1a', 12, 0); txt(ctx, 'Millennial', mx, 300, HAND(700, 34), '#fff'); });
    if (stare) txt(ctx, '😰', 630, 230, PRINT(56), INK, 'center', clamp(at(9.0) / .2));
    // Mom & Dad roll in with the valise of cash
    const pk = clamp(at(9.5) / 1.0), px = lerp(-200, 260, out(pk));
    if (pk > 0) { bean(ctx, px - 70, 660, .8, t, Object.assign({ face: { mouth: 'grin', brows: 'up', look: [.8, 0] }, walk: pk < 1 ? t * 9 : undefined }, PARENT(0))); bean(ctx, px + 50, 660, .76, t + 2, Object.assign({ face: { mouth: 'grin', brows: 'up', look: [.8, 0] }, walk: pk < 1 ? t * 9 + 2 : undefined }, PARENT(1)));
      briefcase(ctx, px + 150, 600, .7, clamp(at(10.6) / .5), t); }
    // the stat lands as a big tag on the scene
    if (at(6.43) > 0) popAt(ctx, 330, 130, at(6.43), () => { ctx.save(); ctx.translate(330, 130); ctx.rotate(-.04); sh(ctx, c => c.roundRect(-250, -80, 500, 160, 22), '#fff', 5); ctx.restore(); });
    if (at(6.43) > 0) Ch.counter(ctx, { x: 190, y: 125, value: 24, suffix: '%', lt: at(6.6), dur: 1.0, size: 110, color: P.purple });
    if (at(9.68) > 0) { txt(ctx, 'used family money', 450, 105, HAND(700, 36), INK, 'center', clamp(at(9.68) / .3)); txt(ctx, 'for the down payment', 450, 150, HAND(700, 32), INK, 'center', clamp(at(10.9) / .3)); }
    // 21% cash gifts: a gift box drops on Gen Z
    if (at(12.56) > 0) { const k = clamp(at(12.56) / .5), gy = lerp(-80, 560, k * k); giftBox(ctx, 830, gy, .75, clamp(at(13.6) / .4)); }
    if (at(13.0) > 0) popAt(ctx, 830, 440, at(13.0), () => { K.card(ctx, 730, 412, 200, 56, P.blue, 12); txt(ctx, '21% cash gifts', 830, 440, HAND(700, 30), '#fff'); });
    // 11% inheritance: a will unrolls beside the millennial
    if (at(15.47) > 0) { willScroll(ctx, 650, 195, .6, clamp(at(15.6) / .6)); popAt(ctx, 790, 195, at(15.8), () => { K.card(ctx, 690, 167, 200, 56, P.orange, 12); txt(ctx, '11% inheritance', 790, 195, HAND(700, 30), '#fff'); }); }
    K.logo(ctx, 'redfin', 1150, 70, 150, at(3.7), { pad: 8 });
    popAt(ctx, 1150, 150, at(4.4), () => { K.card(ctx, 1060, 126, 180, 50, P.yellow, 12); txt(ctx, '2025 survey', 1150, 151, HAND(700, 30)); });
    K.source(ctx, 'Source: Redfin survey via FOX 9, Jul 14, 2025', at(6.5));
  }
  function h3(ctx, lt, dur, t) { // still buying in their early thirties — but with help from Mom and Dad → "nepo-homebuyers"
    const T0 = 17.56, at = s => lt - (s - T0);
    K.bg.sky(ctx); ground(ctx);
    if (at(23.61) < 0) {
      K.house(ctx, 1000, 600, 1.4);
      bean(ctx, 520, 650, 1.0, t, Object.assign({ face: { mouth: 'grin', brows: 'up', look: [.6, -.1] }, armR: [.6, .2] }, YOU));
      popAt(ctx, 520, 130, at(18.65), () => { K.card(ctx, 400, 92, 240, 76, '#fff', 14); txt(ctx, 'early 30s', 520, 130, HAND(700, 44)); });
      if (at(21.9) > 0) { popAt(ctx, 240, 640, at(21.9), () => { bean(ctx, 200, 650, .9, t, Object.assign({ face: { mouth: 'smile', brows: 'calm', look: [.8, 0] }, armR: [1.3, -.2] }, PARENT(0))); bean(ctx, 320, 650, .85, t + 1, Object.assign({ face: { mouth: 'smile', brows: 'calm', look: [.8, 0] }, armR: [1.3, -.2] }, PARENT(1))); });
        const k = clamp(at(22.3) / .8); moneyBag(ctx, lerp(360, 470, out(k)), lerp(420, 440, out(k)) - Math.sin(k * Math.PI) * 50, .8);
        popAt(ctx, 270, 250, at(22.3), () => { K.card(ctx, 150, 210, 240, 76, P.yellow, 14); txt(ctx, 'Mom & Dad', 270, 248, HAND(700, 44)); }); }
      return;
    }
    K.bg.cream(ctx);
    K.headline(ctx, 640, 340, 760, 'FOX 9 · Jul 2025', '"Nepo-homebuyers?" Young Americans use family money to buy', at(23.84), { rot: -.03, size: 46, bar: P.purple });
    if (at(25.4) > 0) K.stamp(ctx, 'NEPO-HOMEBUYERS', 640, 590, at(25.6), { color: P.purple, size: 56, rot: .05 });
  }
  function h4(ctx, lt, dur, t) { // to be fair: 57% saved from their own paychecks — people are grinding — but about 1 in 4 needed family money
    K.bg.white(ctx); const T0 = 27.28, at = s => lt - (s - T0);
    if (at(36.18) < 0) {
      txt(ctx, 'How young buyers paid', 640, 80, HAND(700, 50), INK, 'center', clamp(at(28.8) / .3));
      Ch.progress(ctx, { x: 240, y: 260, w: 800, h: 70, value: .57, label: 'saved from their own paychecks', color: P.green, lt: at(32.6) });
      if (at(34.87) > 0) popAt(ctx, 640, 500, at(34.87), () => { bean(ctx, 560, 620, .7, t * 3, Object.assign({ face: { mouth: 'flat', brows: 'angry' }, armR: [1.6 + Math.sin(t * 12) * .3, -.4], armL: [1.6 + Math.cos(t * 12) * .3, -.4] }, YOU)); K.card(ctx, 660, 450, 260, 80, '#fff', 16); txt(ctx, 'people are grinding', 790, 490, HAND(700, 34)); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#7fb6d9'; ctx.beginPath(); ctx.ellipse(510 + i * 30, 400 + ((t * 2 + i * .3) % 1) * 40, 5, 8, 0, 0, 7); ctx.fill(); } });
      K.source(ctx, 'Source: Redfin survey via FOX 9, Jul 2025', at(32.8)); return;
    }
    txt(ctx, 'about 1 in 4 needed family money', 640, 100, HAND(700, 52), INK, 'center', clamp(at(36.4) / .3));
    for (let i = 0; i < 4; i++) { const x = 250 + i * 260, hit = i === 2 && at(37.82) > 0; popAt(ctx, x, 560, at(36.5 + i * .15), () => { bean(ctx, x, 620, 1.0, t + i, { skin: hit ? B.SKIN : 'white', hair: ['short', 'bob', 'side', 'bun'][i], hairColor: '#3a2a1e', body: hit ? P.purple : '#c4c8ce', face: { mouth: hit ? 'grin' : 'flat' } }); if (hit) { moneyBag(ctx, x + 90, 470, .7); } }); }
  }
  function h5(ctx, lt, dur, t) { // the question isn't "how old will you be when you buy a house?" — it's "does your family already own one?"
    K.bg.studio(ctx, '#d9ccff', '#f5f1ff'); const T0 = 40.49, at = s => lt - (s - T0);
    host(ctx, 300, 700, 1.1, t, [[T0, 'presentL'], [44.5, 'pointSide']], { mouth: 'flat', brows: at(44.57) > 0 ? 'up' : 'neutral', look: [.6, 0] });
    popAt(ctx, 860, 230, at(42.16), () => { K.card(ctx, 600, 170, 520, 120, '#fff', 20); txt(ctx, '"How old will you be', 860, 210, HAND(700, 42)); txt(ctx, 'when you buy a house?"', 860, 255, HAND(700, 42)); });
    if (at(44.57) > 0) K.strike(ctx, 620, 230, 1100, 230, clamp(at(44.57) / .4), P.red, 9);
    popAt(ctx, 860, 450, at(45.11), () => { K.card(ctx, 600, 380, 520, 140, P.yellow, 20); txt(ctx, '"Does your family', 860, 430, HAND(700, 50)); txt(ctx, 'already own one?"', 860, 480, HAND(700, 50)); });
  }
  function h6(ctx, lt, dur, t) { // those without help disappear from the data: Census — under-35 homeownership 35.2% in Q2 2026, down 1.2 pts, steepest drop of any age group
    const T0 = 47.18, at = s => lt - (s - T0);
    if (at(51.84) < 0) { K.bg.cream(ctx);
      for (let i = 0; i < 6; i++) { const a = clamp(1 - Math.max(0, at(50.03) - i * .2) / .8); ctx.save(); ctx.globalAlpha = a; bean(ctx, 190 + i * 180, 620, .8, t + i, { skin: 'white', hair: ['short', 'bob', 'side', 'bun', 'long', 'short'][i], hairColor: '#3a2a1e', body: [P.blue, P.pink, P.teal, P.orange, P.purple, P.green][i], face: { mouth: 'frown', brows: 'worried' } }); ctx.restore(); }
      popAt(ctx, 640, 120, at(47.4), () => { K.card(ctx, 420, 80, 440, 80, '#fff', 16); txt(ctx, 'no family help', 640, 120, HAND(700, 48)); }); return; }
    K.bg.white(ctx);
    K.nameCard(ctx, 'U.S. Census Bureau', 'homeownership, households under 35', 640, 90, at(51.9));
    popAt(ctx, 640, 200, at(58.53), () => { K.card(ctx, 540, 170, 200, 60, P.yellow, 14); txt(ctx, 'Q2 2026', 640, 200, HAND(700, 40)); });
    if (at(56.64) > 0) Ch.counter(ctx, { x: 640, y: 340, value: 35.2, decimals: 1, suffix: '%', lt: at(56.64), dur: 1.0, size: 150, color: P.blue });
    if (at(61.16) > 0) popAt(ctx, 640, 480, at(61.16), () => { K.card(ctx, 470, 440, 340, 80, P.red, 16); I.draw(ctx, 'arrowDown', 520, 480, 50, 1); txt(ctx, '1.2 pts in a year', 660, 480, HAND(700, 42), '#fff'); });
    K.stamp(ctx, 'STEEPEST DROP OF ANY AGE GROUP', 640, 610, at(63.73), { color: P.red, size: 44, rot: -.03 });
    K.source(ctx, 'Source: NAHB Eye on Housing (Census HVS), Aug 2026', at(56.7));
  }
  function stack(ctx, x, y, n, k) { for (let i = 0; i < n * k; i++) { const yy = y - i * 13; sh(ctx, c => c.roundRect(x - 80, yy - 13, 160, 14, 3), i % 2 ? '#7cc46a' : '#6ab45a', 2.5); } }
  function h7(ctx, lt, dur, t) { // wealth: SCF 2022 — median homeowner ~$396,000 net worth vs renter $10,400 — ~38× — the house is the biggest piece
    K.bg.white(ctx); const T0 = 65.79, at = s => lt - (s - T0);
    if (at(69.93) < 0) { K.bg.studio(ctx, '#c6ecd9', '#f1fbf5'); host(ctx, 640, 700, 1.2, t, [[T0, 'presentBoth']], { mouth: 'flat', brows: 'up' }); popAt(ctx, 1050, 300, at(67.27), () => { K.card(ctx, 900, 230, 300, 140, '#fff', 20); txt(ctx, 'houses', 1050, 280, HAND(700, 40), '#8a8f96'); txt(ctx, '→ wealth', 1050, 330, HAND(700, 52), P.green); }); K.strike(ctx, 960, 280, 1140, 280, clamp(at(68.0) / .4), P.red, 6); return; }
    K.nameCard(ctx, 'Federal Reserve', 'Survey of Consumer Finances, 2022', 900, 90, at(70.0));
    Tn.line(ctx, [[180, 620], [1100, 620]], 5, INK);
    const k1 = at(76.58) > 0 ? out(at(76.58) / 1.4) : 0, k2 = at(80.26) > 0 ? out(at(80.26) / .5) : 0;
    stack(ctx, 400, 620, 30, k1); txt(ctx, 'median homeowner', 400, 655, PRINT(28), INK, 'center', clamp(at(74.86) / .3));
    if (k1 > 0) txt(ctx, '≈ $' + Math.round(396 * k1) + ',000', 400, 620 - 30 * 13 * k1 - 40, HAND(700, 56), P.green);
    stack(ctx, 880, 620, 1, k2); txt(ctx, 'median renter', 880, 655, PRINT(28), INK, 'center', clamp(at(78.92) / .3));
    if (k2 > 0) txt(ctx, '$10,400', 880, 560, HAND(700, 56), P.red);
    if (at(81.95) > 0) popAt(ctx, 880, 300, at(81.95), () => { K.card(ctx, 760, 240, 240, 120, P.yellow, 20); txt(ctx, '≈ 38×', 880, 300, HAND(700, 70), P.red); });
    if (at(84.32) > 0) popAt(ctx, 400, 420, at(84.32), () => { sh(ctx, c => c.roundRect(310, 340, 180, 150, 16), 'rgba(255,255,255,.9)', 4); K.house(ctx, 400, 480, .55); txt(ctx, 'the house = biggest piece', 400, 322, HAND(700, 30), P.green); });
    K.source(ctx, 'Source: NAHB Eye on Housing (Fed SCF 2022), Mar 2024', at(76.6));
  }
  function h8(ctx, lt, dur, t) { // Harvard: nearly half of renter households in 2024 were cost-burdened (>30% of income) → the loop
    const T0 = 88.44, at = s => lt - (s - T0);
    if (at(97.79) < 0) { K.bg.white(ctx);
      K.logo(ctx, 'jchs', 1150, 90, 110, at(89.74), { pad: 6 });
      txt(ctx, 'renter households, 2024', 600, 90, HAND(700, 48), INK, 'center', clamp(at(90.0) / .3));
      for (let i = 0; i < 10; i++) { const x = 160 + i * 106, hit = i < 5 && at(93.44) > i * .1; popAt(ctx, x, 380, at(90.43 + i * .06), () => bean(ctx, x, 470, .55, t + i, { skin: 'white', hair: ['short', 'bob', 'side', 'bun', 'long'][i % 5], hairColor: '#3a2a1e', body: hit ? P.red : '#c4c8ce', face: { mouth: hit ? 'frown' : 'flat', brows: hit ? 'worried' : 'calm' } })); }
      if (at(90.43) > 0) popAt(ctx, 400, 560, at(90.75), () => { K.card(ctx, 250, 520, 300, 80, P.red, 16); txt(ctx, 'nearly half', 400, 560, HAND(700, 46), '#fff'); });
      if (at(94.84) > 0) popAt(ctx, 900, 560, at(94.84), () => { K.card(ctx, 680, 520, 440, 80, '#fff', 16); txt(ctx, '> 30% of income on housing', 900, 560, HAND(700, 38)); });
      K.source(ctx, "Source: Harvard JCHS, State of the Nation's Housing 2026", at(90)); return; }
    // the loop
    K.bg.cream(ctx); const cx = 640, cy = 380, R = 200;
    const nodes = [['rent eats the paycheck', -Math.PI / 2, 98.21, P.red], ['hard to save a down payment', Math.PI / 6, 102.98, P.orange], ['keep renting', 5 * Math.PI / 6, 105.03, P.purple]];
    const spin = at(105.6) > 0 ? (at(105.6) * .8) : 0;
    for (let i = 0; i < 3; i++) { const a0 = nodes[i][1] + .35, a1 = nodes[(i + 1) % 3][1] - .35 + (i === 2 ? Math.PI * 2 : 0), k = clamp((at(nodes[(i + 1) % 3][2]) + .1) / .6); if (i === 2) { if (at(105.5) <= 0) continue; }
      if (k > 0 || i === 2) { const kk = i === 2 ? clamp(at(105.5) / .6) : k; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, a0 + spin, a0 + spin + (a1 - a0) * kk); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); if (kk >= 1) { const ea = a1 + spin, ex = cx + Math.cos(ea) * R, ey = cy + Math.sin(ea) * R; K.arrow(ctx, [ex - Math.cos(ea + Math.PI / 2) * 20, ey - Math.sin(ea + Math.PI / 2) * 20], [ex, ey], 1, INK, 6); } } }
    nodes.forEach(([label, a, s, col]) => { const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; popAt(ctx, x, y, at(s), () => { K.card(ctx, x - 150, y - 45, 300, 90, col, 18); K.wrap(ctx, label, HAND(700, 34), 270).forEach((l, j, arr) => txt(ctx, l, x, y + (j - (arr.length - 1) / 2) * 34, HAND(700, 34), '#fff')); }); });
    if (at(106.75) > 0) popAt(ctx, cx, cy, at(106.75), () => txt(ctx, 'the loop', cx, cy, HAND(700, 60), INK));
  }

  // ================= ENDING: WHY IT MATTERS =================
  function k1(ctx, lt, dur, t) { // back to the viral number: is the typical first-time buyer 40? Probably not — early-to-mid 30s, not that different from a decade ago
    K.bg.white(ctx); const T0 = 108.07, at = s => lt - (s - T0);
    popAt(ctx, 640, 260, at(108.2), () => { K.card(ctx, 470, 120, 340, 280, '#fff', 24); txt(ctx, '40?', 640, 250, HAND(700, 170), P.red); txt(ctx, 'the viral number', 640, 360, PRINT(28)); });
    K.stamp(ctx, 'PROBABLY NOT', 900, 180, at(113.14), { color: P.blue, size: 56, rot: .1 });
    if (at(114.4) > 0) popAt(ctx, 640, 520, at(114.4), () => { K.card(ctx, 380, 470, 520, 100, P.green, 20); txt(ctx, 'early-to-mid 30s', 640, 520, HAND(700, 60), '#fff'); });
    if (at(117.57) > 0) txt(ctx, '≈ the same as a decade ago', 640, 630, HAND(700, 42), '#55606b', 'center', clamp(at(117.57) / .3));
  }
  function k2(ctx, lt, dur, t) { // why it went viral anyway: it felt true — the honest answer isn't 40, it's "I don't know if I ever will"
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6'); const T0 = 120.2, at = s => lt - (s - T0);
    if (at(124.77) < 0) { host(ctx, 640, 700, 1.2, t, [[T0, 'chest'], [123.3, 'presentBoth']], { mouth: 'flat', brows: 'up', look: [0, 0] }); if (at(123.49) > 0) popAt(ctx, 1020, 220, at(123.49), () => { K.card(ctx, 880, 170, 280, 100, '#fff', 20); txt(ctx, 'it felt true', 1020, 220, HAND(700, 52), P.red); }); return; }
    bean(ctx, 360, 660, 1.2, t, Object.assign({ face: { mouth: at(131.44) > 0 ? 'frown' : 'flat', brows: 'worried', look: [.5, -.3] } }, YOU));
    popAt(ctx, 860, 200, at(127.57), () => { K.card(ctx, 620, 150, 480, 100, '#fff', 20); txt(ctx, '"When will you buy a house?"', 860, 200, HAND(700, 42)); });
    if (at(129.41) > 0) popAt(ctx, 760, 360, at(129.41), () => { txt(ctx, '40', 760, 360, HAND(700, 100), '#9aa3ad'); K.cross(ctx, 760, 360, 100, clamp(at(129.6) / .4)); });
    K.bubble(ctx, '"I don\'t know if I ever will."', 880, 520, 520, [480, 380], at(131.44), { size: 50 });
  }
  function k3(ctx, lt, dur, t) { // what changed: the price of the ticket (3× → 5×), a decade of underbuilding, half of mortgages locked under 4%, rates back up just as it thawed
    K.bg.white(ctx); const T0 = 133.76, at = s => lt - (s - T0);
    popAt(ctx, 640, 70, at(136.17), () => { K.card(ctx, 420, 32, 440, 76, '#1f1c1a', 16, 0); txt(ctx, 'the price of the ticket', 640, 70, HAND(700, 46), '#fff'); });
    const panel = (x, y, s, draw) => popAt(ctx, x + 270, y + 130, at(s), () => { K.card(ctx, x, y, 540, 260, '#fff', 20); draw(x + 270, y + 130); });
    panel(80, 130, 138.26, (cx, cy) => { txt(ctx, 'home price ÷ income', cx, cy - 80, PRINT(26)); txt(ctx, '3×', cx - 120, cy + 10, HAND(700, 90), P.green); K.arrow(ctx, [cx - 50, cy + 10], [cx + 50, cy + 10], 1, INK, 6); txt(ctx, '5×', cx + 120, cy + 10, HAND(700, 90), P.red); });
    panel(660, 130, 141.76, (cx, cy) => { txt(ctx, 'a decade of', cx, cy - 80, PRINT(26)); ctx.save(); ctx.translate(cx - 80, cy + 90); for (let i = 0; i <= 5; i++) Tn.line(ctx, [[-60 + i * 24, 0], [-60 + i * 24, -110]], 6, '#c98d4f'); ctx.restore(); txt(ctx, 'not building', cx + 90, cy + 10, HAND(700, 50), P.red); });
    panel(80, 410, 144.64, (cx, cy) => { cuffs(ctx, cx - 140, cy + 10, .7, -.1); txt(ctx, 'half of mortgages', cx + 80, cy - 20, HAND(700, 40)); txt(ctx, 'locked under 4%', cx + 80, cy + 30, HAND(700, 40), P.orange); });
    panel(660, 410, 148.58, (cx, cy) => { txt(ctx, 'just as it thawed…', cx, cy - 70, PRINT(26)); txt(ctx, '6.1%', cx - 120, cy + 20, HAND(700, 70), P.green); K.arrow(ctx, [cx - 40, cy + 20], [cx + 40, cy + 20], 1, INK, 6); txt(ctx, '7.28%', cx + 130, cy + 20, HAND(700, 70), P.red); });
  }
  function ladder(ctx, x0, y0, x1, y1) { const n = 12, dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), nx = -dy / len * 34, ny = dx / len * 34;
    Tn.line(ctx, [[x0 - nx, y0 - ny], [x1 - nx, y1 - ny]], 7, '#8a5a36'); Tn.line(ctx, [[x0 + nx, y0 + ny], [x1 + nx, y1 + ny]], 7, '#8a5a36');
    for (let i = 1; i < n; i++) { const f = i / n; Tn.line(ctx, [[x0 + dx * f - nx, y0 + dy * f - ny], [x0 + dx * f + nx, y0 + dy * f + ny]], 5, '#8a5a36'); } }
  function k4(ctx, lt, dur, t) { // the ladder didn't disappear — it got steeper — and more climbers get a boost from someone already at the top
    K.bg.sky(ctx); ground(ctx); const T0 = 151.69, at = s => lt - (s - T0);
    const st = clamp(at(153.85) / 1.2), topX = lerp(900, 760, inout(st)), topY = lerp(300, 200, inout(st));
    sh(ctx, c => { c.moveTo(topX - 60, 600); c.lineTo(topX - 40, topY); c.lineTo(1280, topY); c.lineTo(1280, 600); c.closePath(); }, '#b9a27f', 5);
    K.house(ctx, 1060, topY + 2, .8);
    ladder(ctx, 300, 600, topX - 60, topY + 10);
    popAt(ctx, 300, 110, at(151.9), () => { K.card(ctx, 150, 70, 300, 80, '#fff', 16); txt(ctx, st > .5 ? 'a lot steeper' : 'still there', 300, 110, HAND(700, 44), st > .5 ? P.red : INK); });
    // a climber halfway, and one pulled up by a parent at the top
    const f = .45, cx = lerp(300, topX - 60, f), cy = lerp(600, topY + 10, f);
    bean(ctx, cx, cy + 60, .5, t, { skin: 'white', hair: 'short', hairColor: '#3a2a1e', body: P.blue, face: { mouth: 'frown', brows: 'worried', look: [.6, -.6] }, armR: [2.6, 0], armL: [2.4, 0] });
    if (at(156.95) > 0) { const k = clamp(at(157.25) / 1.6), g = lerp(.55, .9, inout(k)), px = lerp(300, topX - 60, g), py = lerp(600, topY + 10, g);
      bean(ctx, topX + 30, topY + 2, .45, t, Object.assign({ face: { mouth: 'smile', look: [-.7, .4] }, armL: [2.2, .3] }, { skin: 'white', hair: 'greyBun', body: P.pink }));
      bean(ctx, px, py + 60, .5, t + 1, Object.assign({ face: { mouth: 'grin', brows: 'up', look: [.6, -.6] }, armR: [2.6, 0] }, YOU));
      Tn.line(ctx, [[topX + 5, topY - 80], [px + 30, py - 40]], 4, P.yellow);
      popAt(ctx, 1040, 420, at(157.25), () => { K.card(ctx, 900, 380, 280, 80, P.yellow, 16); txt(ctx, 'a boost from the top', 1040, 420, HAND(700, 36)); }); }
  }
  function k5(ctx, lt, dur, t) { // when building wealth depends on who your parents are — not just a housing problem — the American Dream quietly turning into an inheritance
    K.bg.cream(ctx); const T0 = 159.96, at = s => lt - (s - T0);
    if (at(164.54) < 0) {
      txt(ctx, 'how regular Americans build wealth', 640, 120, HAND(700, 46), INK, 'center', clamp(lt / .3));
      K.house(ctx, 640, 470, 1.1);
      if (at(162.55) > 0) { popAt(ctx, 640, 590, at(162.55), () => { K.card(ctx, 400, 550, 480, 84, P.purple, 18); txt(ctx, 'depends on your parents?', 640, 592, HAND(700, 44), '#fff'); }); }
      return;
    }
    const m = clamp(at(167.99) / 1.0);
    popAt(ctx, 640, 340, at(164.6), () => { ctx.save(); ctx.translate(640, 340); ctx.rotate(lerp(-.03, .03, m));
      sh(ctx, c => c.roundRect(-330, -150, 660, 300, 24), lerp(0, 1, m) > .5 ? '#fff7d6' : '#fff', 6);
      if (m < 1) { ctx.globalAlpha = 1 - m; txt(ctx, 'THE AMERICAN', 0, -50, PRINT(54), P.blue); txt(ctx, 'DREAM', 0, 30, HAND(700, 110), P.red); ctx.globalAlpha = 1; }
      if (m > 0) { ctx.globalAlpha = m; txt(ctx, 'LAST WILL & TESTAMENT', 0, -70, PRINT(30), '#6b4a1d'); txt(ctx, 'an inheritance', 0, 20, HAND(700, 96), P.purple); ctx.fillStyle = '#d9c9a0'; ctx.fillRect(-200, 90, 400, 6); ctx.globalAlpha = 1; }
      ctx.restore(); });
    if (at(165.27) > 0 && at(166.36) < 0) txt(ctx, 'not just a housing problem', 640, 600, HAND(700, 44), P.red, 'center', clamp(at(165.27) / .3));
    if (at(167.49) > 0) txt(ctx, 'quietly…', 640, 600, HAND(700, 44), '#6b717a', 'center', clamp(at(167.49) / .3));
  }
  function k6(ctx, lt, dur, t) { // disclaimer: education only, not financial advice, nobody knows where rates or prices go — now you know where to look
    K.bg.studio(ctx, '#bfe3ff', '#eef8ff'); const T0 = 170.15, at = s => lt - (s - T0);
    host(ctx, 330, 700, 1.1, t, [[T0, 'chest'], [173.6, 'shrug'], [178.1, 'pointSide'], [181.3, 'wave']], { mouth: at(178.13) > 0 ? 'smile' : 'flat', brows: 'neutral', look: [.5, 0], eyes: at(181.8) > 0 ? 'happy' : 'open' });
    popAt(ctx, 880, 260, at(170.4), () => { K.card(ctx, 620, 140, 520, 250, '#fff', 22); txt(ctx, 'Quick note', 880, 200, HAND(700, 50), P.red);
      txt(ctx, 'For education only.', 880, 260, PRINT(30)); txt(ctx, 'Not financial advice.', 880, 300, PRINT(30)); txt(ctx, 'Nobody knows where rates', 880, 340, PRINT(22), '#6b717a'); txt(ctx, 'or home prices go next.', 880, 366, PRINT(22), '#6b717a'); });
    if (at(178.99) > 0) popAt(ctx, 880, 500, at(178.99), () => { K.card(ctx, 640, 450, 480, 100, P.yellow, 20); txt(ctx, 'now you know where to look', 880, 500, HAND(700, 40)); });
  }

  const SH = [
    [0, 3.48, h1], [3.48, 17.56, h2], [17.56, 27.28, h3], [27.28, 40.49, h4], [40.49, 47.18, h5], [47.18, 65.79, h6], [65.79, 88.44, h7], [88.44, 108.07, h8],
    [108.07, 120.2, k1], [120.2, 133.76, k2], [133.76, 151.69, k3], [151.69, 159.96, k4], [159.96, 170.15, k5], [170.15, 182.73, k6],
  ];
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 })).concat([1.7, 23.61, 36.18, 51.84, 69.93, 97.79, 124.77, 164.54].map(t => ({ t, type: 'swoosh', gain: .4 })));
  const pops = [3.7, 4.4, 7.4, 8.2, 13.0, 15.8, 18.7, 21.9, 22.3, 23.8, 34.9, 36.5, 42.2, 45.1, 47.4, 51.9, 58.5, 61.2, 67.3, 70.0, 82.0, 84.3, 89.7, 90.8, 94.8, 98.2, 103.0, 105.0, 106.8, 108.2, 114.4, 123.5, 127.6, 129.4, 131.4, 136.2, 138.3, 141.8, 144.6, 148.6, 151.9, 157.3, 162.6, 164.6, 170.4, 179.0]
    .map(t => ({ t, type: 'pop', gain: .5 }));
  const hits = [[0, 'whoosh'], [6.6, 'ding'], [9.5, 'whoosh'], [10.6, 'cash'], [12.9, 'thud'], [13.6, 'ding'], [15.6, 'paper'], [22.3, 'cash'], [25.6, 'stamp'], [37.82, 'cash'], [44.57, 'buzz'], [56.64, 'tick'], [63.73, 'stamp'], [76.58, 'cash'], [80.26, 'thud'], [113.14, 'stamp'], [129.6, 'buzz'], [153.85, 'rise'], [167.99, 'paper'], [182.0, 'ding']]
    .map(([t, type]) => ({ t, type, gain: .6 }));
  G.Show = { duration: 182.73, narration: '../biz/assets/audio/housing-05-ch7-end.mp3', shots, sfx: cuts.concat(pops, hits),
    moods: [{ t: 0, mood: 'bright' }, { t: 27.28, mood: 'soft' }, { t: 47.18, mood: 'tense' }, { t: 65.79, mood: 'soft' }, { t: 108.07, mood: 'soft' }, { t: 151.69, mood: 'tense' }, { t: 170.15, mood: 'bright' }],
    images: { redfin: 'assets/housing/redfin.png', jchs: 'assets/housing/harvard-jchs.webp' },
    fonts: ['700 40px Caveat', '40px "Patrick Hand"'] };
})(window);
