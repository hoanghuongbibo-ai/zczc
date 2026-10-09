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
  // ---- props for the scenes ----
  function piggy(ctx, x, y, s, fill, t) { // a big piggy bank with a window that fills up
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (const lx of [-70, -30, 30, 70]) sh(ctx, c => c.roundRect(lx - 14, 70, 28, 46, 8), '#f59ab0', 4);
    sh(ctx, c => c.ellipse(0, 0, 150, 110, 0, 0, 7), '#f8b4c4', 5);
    sh(ctx, c => { c.moveTo(-90, -80); c.lineTo(-60, -130); c.lineTo(-40, -90); c.closePath(); }, '#f59ab0', 4);
    sh(ctx, c => c.ellipse(145, 10, 34, 40, 0, 0, 7), '#f59ab0', 4); ctx.fillStyle = INK; for (const dy of [-6, 22]) { ctx.beginPath(); ctx.ellipse(152, dy, 5, 8, 0, 0, 7); ctx.fill(); }
    ctx.beginPath(); ctx.arc(95, -30, 7, 0, 7); ctx.fill();
    sh(ctx, c => c.roundRect(-30, -112, 60, 12, 6), INK, 0);                       // coin slot
    // the window
    sh(ctx, c => c.roundRect(-90, -50, 160, 100, 14), '#fff', 4);
    ctx.save(); ctx.beginPath(); ctx.roundRect(-88, -48, 156, 96, 12); ctx.clip(); ctx.fillStyle = '#f6c945'; ctx.fillRect(-88, 48 - 96 * fill, 156, 96 * fill);
    ctx.fillStyle = '#e0ad2b'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(-70 + i * 20, 48 - 96 * fill + 4, 9, 4, 0, 0, 7); ctx.fill(); } ctx.restore();
    txt(ctx, Math.round(fill * 100) + '%', -10, 0, HAND(700, 56), INK);
    ctx.restore();
  }
  function coin(ctx, x, y, r = 16) { sh(ctx, c => c.arc(x, y, r, 0, 7), '#f6c945', 3.5); txt(ctx, '$', x, y + 1, HAND(700, r * 1.3), '#a8781a'); }
  function poof(ctx, x, y, k) { if (k <= 0 || k >= 1) return; const r = Tn.rng(7); for (let i = 0; i < 12; i++) { const a = i / 12 * 7 + r(), d = 40 + 140 * out(k), rr = (40 + r() * 30) * (1 - k * .6); ctx.save(); ctx.globalAlpha = 1 - k; sh(ctx, c => c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * .7, rr, 0, 7), '#fff', 3); ctx.restore(); }
    for (let i = 0; i < 8; i++) { const a = i / 8 * 7, d = 60 + 220 * k; ctx.save(); ctx.globalAlpha = 1 - k; txt(ctx, '✦', x + Math.cos(a) * d, y + Math.sin(a) * d * .7, PRINT(36), P.yellow); ctx.restore(); } }
  function cake(ctx, x, y, s, lit, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.roundRect(-80, -60, 160, 60, 10), '#f8d1dc', 4); sh(ctx, c => c.roundRect(-80, -60, 160, 16, 8), '#fff', 3);
    txt(ctx, '40', 0, -26, HAND(700, 36), P.red);
    for (const cx of [-40, 0, 40]) { sh(ctx, c => c.rect(cx - 5, -100, 10, 40), P.blue, 2.5); if (lit) sh(ctx, c => c.ellipse(cx, -110 + Math.sin(t * 9 + cx) * 2, 6, 10, 0, 0, 7), P.orange, 2); else { ctx.save(); ctx.globalAlpha = .5; Tn.line(ctx, [[cx, -104], [cx + Math.sin(t * 3 + cx) * 8, -140]], 3, '#9aa3ad'); ctx.restore(); } }
    ctx.restore(); }
  function wheel(ctx, x, y, r, spin) { ctx.save(); ctx.translate(x, y);
    sh(ctx, c => { c.moveTo(-r * .6, r + 40); c.lineTo(0, 0); c.lineTo(r * .6, r + 40); }, null, 8);
    sh(ctx, c => c.arc(0, 0, r, 0, 7), null, 10); sh(ctx, c => c.arc(0, 0, r - 26, 0, 7), null, 4);
    for (let i = 0; i < 16; i++) { const a = spin + i / 16 * Math.PI * 2; Tn.line(ctx, [[Math.cos(a) * (r - 26), Math.sin(a) * (r - 26)], [Math.cos(a) * r, Math.sin(a) * r]], 4, INK); }
    sh(ctx, c => c.arc(0, 0, 12, 0, 7), '#5d6166', 3); ctx.restore(); }
  function backpack(ctx, x, y, s, label) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-60, -80, 120, 140, 22), '#8a5a36', 4.5); sh(ctx, c => c.roundRect(-44, -20, 88, 50, 10), '#a06b42', 3.5); txt(ctx, label, 0, 5, PRINT(26), '#fff'); ctx.restore(); }

  function h4(ctx, lt, dur, t) { // to be fair: 57% saved from their own paychecks — people are grinding — but about 1 in 4 needed family money
    const T0 = 27.28, at = s => lt - (s - T0);
    if (at(36.18) < 0) {
      K.bg.cream(ctx); ground(ctx, '#e8d6b8', 610);
      // the grind: a desk, a laptop, a coffee, an "overtime" clock, coins going into the piggy bank
      const grind = at(34.87) > 0, sp = grind ? 2.2 : 1;
      sh(ctx, c => c.rect(130, 470, 330, 20), '#b07a46', 4); sh(ctx, c => c.rect(150, 490, 16, 120), '#b07a46', 3); sh(ctx, c => c.rect(424, 490, 16, 120), '#b07a46', 3);
      I.draw(ctx, 'laptop', 300, 430, 120, 1); sh(ctx, c => c.roundRect(390, 425, 34, 44, 6), '#fff', 3.5); if (grind) for (let i = 0; i < 2; i++) { ctx.save(); ctx.globalAlpha = .6; Tn.line(ctx, [[400 + i * 14, 420], [404 + i * 14 + Math.sin(t * 4 + i) * 6, 395]], 3, '#9aa3ad'); ctx.restore(); }
      bean(ctx, 200, 640, .85, t * sp, Object.assign({ face: { mouth: grind ? 'flat' : 'smile', brows: grind ? 'angry' : 'calm', look: [.7, .2] }, armR: [1.5 + Math.sin(t * 14 * sp) * .2, -.6], armL: [1.4 + Math.cos(t * 14 * sp) * .2, -.5] }, YOU));
      if (grind) { for (let i = 0; i < 3; i++) { ctx.fillStyle = '#7fb6d9'; ctx.beginPath(); ctx.ellipse(130 + i * 26, 330 + ((t * 2 + i * .3) % 1) * 50, 5, 8, 0, 0, 7); ctx.fill(); } popAt(ctx, 200, 150, at(34.87), () => { K.card(ctx, 60, 112, 280, 76, '#fff', 14); txt(ctx, 'people are grinding', 200, 150, HAND(700, 36)); }); }
      // coins arc from the paycheck to the piggy
      const fill = .57 * (at(29.88) > 0 ? out(clamp(at(29.88) / 3.4)) : 0);
      for (let i = 0; i < 5; i++) { const k = ((lt * .9 * sp + i * .2) % 1); if (at(29.9) <= 0) break; coin(ctx, lerp(300, 840, k), lerp(380, 300, k) - Math.sin(k * Math.PI) * 150, 15); }
      piggy(ctx, 880, 470, 1.2, fill, t);
      popAt(ctx, 880, 175, at(30.84), () => { K.card(ctx, 700, 135, 360, 80, P.yellow, 16); txt(ctx, 'saved from paychecks', 880, 175, HAND(700, 38)); });
      if (at(32.82) > 0) popAt(ctx, 880, 650, at(32.82), () => { K.card(ctx, 740, 615, 280, 70, P.green, 14); txt(ctx, '57% did that', 880, 650, HAND(700, 40), '#fff'); });
      K.source(ctx, 'Source: Redfin survey via FOX 9, Jul 2025', at(32.8)); return;
    }
    // the race to the house: four runners, one gets a family-powered rocket skateboard
    K.bg.sky(ctx); ground(ctx); const k = at(36.18);
    K.house(ctx, 1150, 600, .9); sh(ctx, c => c.rect(1040, 380, 6, 220), '#fff', 2); txt(ctx, 'FINISH', 1043, 365, PRINT(24), P.red);
    ctx.save(); ctx.setLineDash([16, 12]); Tn.line(ctx, [[0, 655], [W, 655]], 3, '#fff'); ctx.restore();
    for (let i = 0; i < 4; i++) { const boost = i === 2 && at(37.48) > 0, bk = boost ? out(clamp((at(37.48)) / 2.2)) : 0;
      const x = 110 + i * 70 + Math.min(k, 4) * 30 + bk * 640 + Math.sin(t * 6 + i) * 3, y = 600 + i * 30;
      if (boost) { sh(ctx, c => c.roundRect(x - 50, y + 4, 100, 14, 7), P.red, 3); for (const wx of [-30, 30]) sh(ctx, c => c.arc(x + wx, y + 22, 8, 0, 7), INK, 0);
        for (let j = 0; j < 4; j++) { ctx.save(); ctx.globalAlpha = .7; sh(ctx, c => c.ellipse(x - 70 - j * 26, y + 10, 16 - j * 2, 9, 0, 0, 7), j % 2 ? P.yellow : P.orange, 0); ctx.restore(); }
        moneyBag(ctx, x - 70, y - 120, .6); }
      bean(ctx, x, y, .55, t + i, { skin: boost ? B.SKIN : 'white', hair: ['short', 'bob', 'side', 'bun'][i], hairColor: '#3a2a1e', body: boost ? P.purple : ['#9aa0a6', '#b8bcc2', '#9aa0a6', '#b8bcc2'][i], face: { mouth: boost ? 'grin' : 'flat', brows: boost ? 'up' : 'worried' }, walk: boost ? undefined : t * 10 + i }); }
    popAt(ctx, 520, 110, at(36.4), () => { K.card(ctx, 250, 70, 540, 80, '#fff', 16); txt(ctx, 'the race to a first home', 520, 110, HAND(700, 44)); });
    if (at(37.82) > 0) popAt(ctx, 1000, 220, at(37.82), () => { K.card(ctx, 830, 180, 340, 80, P.purple, 16); txt(ctx, '≈ 1 in 4: family money', 1000, 220, HAND(700, 38), '#fff'); });
  }
  function h5(ctx, lt, dur, t) { // quiz show: "How old will you be when you buy a house?" — BZZT — the real question: "Does your family already own one?"
    const T0 = 40.49, at = s => lt - (s - T0), real = at(44.57) > 0;
    K.bg.color(ctx, '#2c2457');
    for (let i = 0; i < 14; i++) { ctx.save(); ctx.globalAlpha = .12 + .08 * Math.sin(t * 3 + i); ctx.fillStyle = i % 2 ? P.yellow : P.pink; ctx.beginPath(); ctx.moveTo(640, -50); ctx.lineTo(i * 100 - 50, 720); ctx.lineTo(i * 100 + 10, 720); ctx.fill(); ctx.restore(); }
    for (let i = 0; i < 20; i++) { ctx.fillStyle = (Math.floor(t * 6) + i) % 2 ? P.yellow : '#fff'; ctx.beginPath(); ctx.arc(40 + i * 63, 30, 7, 0, 7); ctx.fill(); }
    // podium + host
    host(ctx, 230, 720, 1.0, t, [[T0, 'presentL'], [44.5, 'cheer'], [45.4, 'pointSide']], { mouth: real ? 'laugh' : 'smile', brows: 'up', look: [.6, 0] });
    sh(ctx, c => c.roundRect(110, 560, 240, 160, 12), P.red, 5); txt(ctx, 'HOST', 230, 620, PRINT(34), '#fff');
    // the big screen
    sh(ctx, c => c.roundRect(470, 120, 700, 380, 24), '#141a3a', 6);
    const flip = clamp(at(44.57) / .4), sx = Math.abs(Math.cos(flip * Math.PI));
    ctx.save(); ctx.translate(820, 310); ctx.scale(sx, 1);
    if (flip < .5) { popAt(ctx, 0, 0, at(41.0), () => { txt(ctx, 'QUESTION', 0, -110, PRINT(30), P.yellow); txt(ctx, '"How old will you be', 0, -20, HAND(700, 50), '#fff'); txt(ctx, 'when you buy a house?"', 0, 40, HAND(700, 50), '#fff'); }); }
    else { txt(ctx, 'THE REAL QUESTION', 0, -110, PRINT(30), P.green); txt(ctx, '"Does your family', 0, -20, HAND(700, 58), P.yellow); txt(ctx, 'already own one?"', 0, 45, HAND(700, 58), P.yellow); }
    ctx.restore();
    if (at(44.2) > 0 && at(44.9) < 0) { K.cross(ctx, 820, 310, 260, clamp(at(44.2) / .3), P.red); }
    if (real) for (let i = 0; i < 30; i++) { const r = Tn.rng(i * 13 + 5), x = 470 + r() * 700, y = 80 + ((at(44.9) * (120 + r() * 160) + r() * 200) % 560); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 4 + i); ctx.fillStyle = [P.red, P.yellow, P.green, P.blue][i % 4]; ctx.fillRect(-7, -3, 14, 6); ctx.restore(); }
  }
  function h6(ctx, lt, dur, t) { // the ones without help disappear from the data → Census elevator: under-35 homeownership 35.2% (Q2 2026), down 1.2 pts, steepest drop
    const T0 = 47.18, at = s => lt - (s - T0);
    if (at(51.84) < 0) { // a group photo where people fade out
      K.bg.cream(ctx);
      sh(ctx, c => c.roundRect(150, 120, 980, 520, 10), '#8a5a36', 6); sh(ctx, c => c.rect(180, 150, 920, 460), '#cfe9ff', 4); ctx.fillStyle = '#9fd97f'; ctx.fillRect(182, 470, 916, 138);
      txt(ctx, 'young would-be buyers', 640, 100, HAND(700, 44), INK, 'center', clamp(lt / .3));
      for (let i = 0; i < 6; i++) { const help = i === 1 || i === 4, a = help ? 1 : clamp(1 - Math.max(0, at(50.03) - i * .15) / .9); ctx.save(); ctx.globalAlpha = a; bean(ctx, 260 + i * 150, 590, .7, t + i, { skin: help ? B.SKIN : 'white', hair: ['short', 'bob', 'side', 'bun', 'long', 'short'][i], hairColor: '#3a2a1e', body: [P.blue, P.pink, P.teal, P.orange, P.purple, P.green][i], face: { mouth: help ? 'smile' : 'frown', brows: help ? 'calm' : 'worried' } }); ctx.restore();
        if (help && at(48.31) > 0) moneyBag(ctx, 330 + i * 150, 520, .45); }
      if (at(50.03) > 0) popAt(ctx, 640, 680, at(50.03), () => { K.card(ctx, 440, 645, 400, 70, '#fff', 14); txt(ctx, 'no family help → gone', 640, 680, HAND(700, 38), P.red); });
      return; }
    // the homeownership elevator
    K.bg.color(ctx, '#e9edf3');
    sh(ctx, c => c.rect(380, 90, 520, 620), '#c9ced6', 5);
    const drop = at(61.16) > 0 ? out(clamp(at(61.16) / 1.4)) : 0, ey = 200 + drop * 120;
    ctx.save(); ctx.beginPath(); ctx.rect(400, 150, 480, 560); ctx.clip();
    sh(ctx, c => c.rect(420, ey, 440, 400), '#f3e2c4', 5);
    for (let i = 0; i < 3; i++) bean(ctx, 520 + i * 120, ey + 380, .6, t + i, { skin: 'white', hair: ['short', 'bob', 'side'][i], hairColor: '#3a2a1e', body: [P.blue, P.pink, P.teal][i], face: { mouth: drop > .1 ? 'o' : 'flat', brows: drop > .1 ? 'worried' : 'calm', look: [0, -1] } });
    ctx.restore();
    for (let i = 0; i < 6; i++) Tn.line(ctx, [[640, 150], [640, ey]], 3, '#5d6166');
    // display panel
    sh(ctx, c => c.roundRect(470, 60, 340, 110, 14), '#1f1c1a', 5);
    if (at(56.64) > 0) Ch.counter(ctx, { x: 620, y: 116, value: 35.2, decimals: 1, suffix: '%', lt: at(56.64), dur: .9, size: 70, color: '#ff9d4d' });
    if (at(61.16) > 0) { sh(ctx, c => { c.moveTo(740, 96); c.lineTo(790, 96); c.lineTo(765, 140); c.closePath(); }, P.red, 0); }
    K.nameCard(ctx, 'U.S. Census Bureau', 'homeownership, households under 35', 1090, 120, at(51.9));
    popAt(ctx, 1090, 260, at(58.53), () => { K.card(ctx, 990, 225, 200, 70, P.yellow, 14); txt(ctx, 'Q2 2026', 1090, 260, HAND(700, 40)); });
    if (at(61.16) > 0) popAt(ctx, 1090, 400, at(61.16), () => { K.card(ctx, 960, 350, 260, 100, P.red, 16); txt(ctx, '▼ 1.2 pts', 1090, 385, HAND(700, 46), '#fff'); txt(ctx, 'vs a year earlier', 1090, 425, PRINT(20), '#fff'); });
    K.stamp(ctx, 'STEEPEST DROP OF ANY AGE GROUP', 640, 640, at(63.73), { color: P.red, size: 40, rot: -.04 });
    K.source(ctx, 'Source: NAHB Eye on Housing (Census HVS), Aug 2026', at(56.7));
  }
  function moneyTower(ctx, x, base, h, w) { const n = Math.floor(h / 14); for (let i = 0; i < n; i++) sh(ctx, c => c.roundRect(x - w / 2, base - (i + 1) * 14, w, 14, 3), i % 2 ? '#7cc46a' : '#6ab45a', 2.5); }
  function h7(ctx, lt, dur, t) { // houses → wealth. SCF 2022: owner ~$396,000 (on a money tower, the house the biggest piece) vs renter $10,400 (with binoculars) — ~38×
    const T0 = 65.79, at = s => lt - (s - T0);
    if (at(69.93) < 0) { K.bg.studio(ctx, '#c6ecd9', '#f1fbf5'); host(ctx, 640, 700, 1.2, t, [[T0, 'presentBoth']], { mouth: 'flat', brows: 'up' }); popAt(ctx, 1050, 300, at(67.27), () => { K.card(ctx, 900, 230, 300, 140, '#fff', 20); txt(ctx, 'houses', 1050, 280, HAND(700, 40), '#8a8f96'); txt(ctx, '→ wealth', 1050, 330, HAND(700, 52), P.green); }); K.strike(ctx, 960, 280, 1140, 280, clamp(at(68.0) / .4), P.red, 6); return; }
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 640);
    K.nameCard(ctx, 'Federal Reserve', 'Survey of Consumer Finances, 2022', 1010, 70, at(70.0));
    // the owner's tower grows, lifting them up; the biggest block is the house itself
    const k1 = at(76.58) > 0 ? out(clamp(at(76.58) / 1.6)) : 0, th = 440 * k1, top = 640 - th;
    if (k1 > 0) { moneyTower(ctx, 380, 640, th * .45, 170); const hy = 640 - th * .45; sh(ctx, c => c.rect(295, hy - th * .4, 170, th * .4), '#ffcf7a', 4); if (th * .4 > 60) { K.house(ctx, 380, hy - 6, Math.min(.55, th * .4 / 300), { wall: '#ffcf7a' }); }
      moneyTower(ctx, 380, hy - th * .4, th * .15, 170); }
    bean(ctx, 380, top, .5, t, { skin: 'white', hair: 'side', hairColor: '#3a2a1e', body: P.green, top: 'shirt', face: { mouth: 'grin', brows: 'up' }, armR: [2.5, .1], armL: [2.5, .1] });
    txt(ctx, 'median homeowner', 380, 680, PRINT(26), INK, 'center', clamp(at(74.86) / .3));
    if (k1 > 0) popAt(ctx, 560, top + 10, at(77.0), () => { K.card(ctx, 470, top - 20, 200, 60, '#fff', 12); txt(ctx, '≈ $' + Math.round(396 * k1) + ',000', 570, top + 10, HAND(700, 36), P.green); });
    if (at(84.32) > 0) popAt(ctx, 180, 640 - th * .65, at(84.32), () => { K.card(ctx, 60, 640 - th * .65 - 30, 210, 60, P.yellow, 12); txt(ctx, 'the house: biggest piece', 165, 640 - th * .65, PRINT(19)); });
    // the renter with a tiny stack and binoculars
    const k2 = at(80.26) > 0 ? 1 : 0;
    moneyTower(ctx, 900, 640, 14 * k2, 120);
    bean(ctx, 990, 660, .75, t + 1, { skin: 'white', hair: 'bob', hairColor: '#3a2a1e', body: P.orange, face: { mouth: 'o', brows: 'up', look: [-.6, -1] }, armL: [2.3, .7], armR: [2.3, .7] });
    if (at(81.6) > 0) { sh(ctx, c => { c.roundRect(952, 432, 34, 26, 8); c.roundRect(990, 432, 34, 26, 8); }, '#2e2f36', 3); }
    txt(ctx, 'median renter', 950, 690, PRINT(26), INK, 'center', clamp(at(78.92) / .3));
    if (k2) popAt(ctx, 900, 580, at(80.26), () => { K.card(ctx, 820, 550, 160, 56, '#fff', 12); txt(ctx, '$10,400', 900, 578, HAND(700, 36), P.red); });
    if (at(82.29) > 0) popAt(ctx, 760, 380, at(82.29), () => { K.card(ctx, 650, 320, 220, 110, P.yellow, 18); txt(ctx, '≈ 38×', 760, 375, HAND(700, 66), P.red); });
    K.source(ctx, 'Source: NAHB Eye on Housing (Fed SCF 2022), Mar 2024', at(76.6));
  }
  function h8(ctx, lt, dur, t) { // nearly half of renter households (2024) cost-burdened: a rent backpack that crushes — then the loop as a hamster wheel
    const T0 = 88.44, at = s => lt - (s - T0);
    if (at(97.79) < 0) { K.bg.cream(ctx); ground(ctx, '#e8d6b8', 620);
      K.logo(ctx, 'jchs', 1170, 80, 100, at(89.74), { pad: 6 });
      txt(ctx, 'renter households, 2024', 600, 80, HAND(700, 46), INK, 'center', clamp(at(90.0) / .3));
      for (let i = 0; i < 8; i++) { const x = 140 + i * 135, heavy = i % 2 === 0 && at(93.44) > i * .08, sq = heavy ? .12 + Math.sin(t * 5 + i) * .02 : 0;
        popAt(ctx, x, 500, at(90.43 + i * .06), () => { if (heavy) backpack(ctx, x - 52, 540 + sq * 100, .75 + .2 * clamp(at(93.44) / .6), 'RENT'); bean(ctx, x, 640, .58, t + i, { skin: 'white', hair: ['short', 'bob', 'side', 'bun'][i % 4], hairColor: '#3a2a1e', body: heavy ? P.red : '#c4c8ce', lean: heavy ? .08 : 0, face: { mouth: heavy ? 'frown' : 'flat', brows: heavy ? 'worried' : 'calm' } }); }); }
      if (at(90.75) > 0) popAt(ctx, 320, 180, at(90.75), () => { K.card(ctx, 180, 140, 280, 80, P.red, 16); txt(ctx, 'nearly half', 320, 180, HAND(700, 46), '#fff'); });
      if (at(94.84) > 0) popAt(ctx, 860, 180, at(94.84), () => { K.card(ctx, 640, 140, 440, 80, '#fff', 16); txt(ctx, '> 30% of income on housing', 860, 180, HAND(700, 38)); });
      K.source(ctx, "Source: Harvard JCHS, State of the Nation's Housing 2026", at(90)); return; }
    // the loop = a hamster wheel
    K.bg.cream(ctx); const sp = at(105.6) > 0 ? 6 : 3;
    wheel(ctx, 640, 380, 220, -lt * sp * .5);
    bean(ctx, 640, 560, .6, t * (sp / 3), Object.assign({ face: { mouth: 'frown', brows: 'worried', look: [.8, 0] }, walk: t * 4 * sp }, YOU));
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#7fb6d9'; ctx.beginPath(); ctx.ellipse(590 - i * 20, 410 + ((t * 2 + i * .3) % 1) * 40, 4, 7, 0, 0, 7); ctx.fill(); }
    const lab = [['rent eats the paycheck', 230, 200, 98.21, P.red], ['hard to save a down payment', 1050, 200, 102.98, P.orange], ['so: keep renting', 1050, 560, 105.03, P.purple]];
    lab.forEach(([s, x, y, a, col]) => popAt(ctx, x, y, at(a), () => { K.card(ctx, x - 170, y - 45, 340, 90, col, 18); K.wrap(ctx, s, HAND(700, 34), 300).forEach((l, j, arr) => txt(ctx, l, x, y + (j - (arr.length - 1) / 2) * 34, HAND(700, 34), '#fff')); }));
    if (at(106.75) > 0) popAt(ctx, 230, 560, at(106.75), () => { K.card(ctx, 90, 515, 280, 90, '#1f1c1a', 18, 0); txt(ctx, "that's the loop", 230, 560, HAND(700, 44), '#fff'); });
  }

  // ================= ENDING: WHY IT MATTERS =================
  function k1(ctx, lt, dur, t) { // the viral 40-year-old buyer (birthday cake, grey temples) → poof → his real early-to-mid-30s self; a decade-ago photo looks about the same
    K.bg.studio(ctx, '#ffe1b3', '#fff6e8'); const T0 = 108.07, at = s => lt - (s - T0);
    const morph = clamp(at(114.2) / .25), young = morph >= .5;
    popAt(ctx, 640, 90, at(108.2), () => { K.card(ctx, 380, 50, 520, 80, '#fff', 16); txt(ctx, young ? 'the real typical buyer' : 'the "viral" first-time buyer', 640, 90, HAND(700, 42)); });
    const face = young ? { mouth: 'grin', brows: 'up', look: [.3, 0] } : { mouth: 'flat', brows: 'worried', look: [.2, .2] };
    const who = young ? { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', body: P.blue, top: 'plain' } : { skin: B.SKIN, hair: 'side', hairColor: '#8d8a85', body: '#7a8088', top: 'cardigan', glasses: true };
    const x = at(117.57) > 0 ? lerp(640, 470, out(clamp(at(117.57) / .6))) : 640;
    bean(ctx, x, 660, 1.2, t, Object.assign({ face, armR: young ? [2.5, .2] : [.3, .2], scaleHead: 1 }, who));
    if (!young) { cake(ctx, x + 230, 600, 1.2, at(112.0) < 0, t); popAt(ctx, x - 230, 260, at(110.5), () => { K.card(ctx, x - 330, 220, 200, 80, P.red, 14); txt(ctx, 'age 40?', x - 230, 260, HAND(700, 46), '#fff'); }); }
    poof(ctx, 640, 420, at(113.9) / .8);
    K.stamp(ctx, 'PROBABLY NOT', 990, 200, at(113.14), { color: P.blue, size: 50, rot: .1 });
    if (young) popAt(ctx, x, 230, at(114.4), () => { K.card(ctx, x - 170, 190, 340, 80, P.green, 16); txt(ctx, 'early-to-mid 30s', x, 230, HAND(700, 44), '#fff'); });
    // "a decade ago": a framed photo of a buyer the same age
    if (at(117.57) > 0) popAt(ctx, 930, 470, at(117.8), () => { ctx.save(); ctx.translate(930, 470); ctx.rotate(.05); sh(ctx, c => c.rect(-150, -190, 300, 330), '#fff', 5); sh(ctx, c => c.rect(-130, -170, 260, 250), '#e9d9b8', 3); ctx.restore();
      ctx.save(); ctx.filter = 'sepia(.6)'; bean(ctx, 930, 545, .55, t, { skin: B.SKIN, hair: 'bob', hairColor: '#6b4a2c', body: P.orange }); ctx.restore(); txt(ctx, 'a decade ago: about the same', 930, 668, HAND(700, 30), '#6b4a1d'); });
  }
  function k2(ctx, lt, dur, t) { // why it went viral: it felt true — the honest answer isn't 40, it's "I don't know if I ever will" (the dream house floats away)
    const T0 = 120.2, at = s => lt - (s - T0);
    if (at(124.77) < 0) { K.bg.studio(ctx, '#ffd9a8', '#fff4e6'); host(ctx, 640, 700, 1.2, t, [[T0, 'chest'], [123.3, 'presentBoth']], { mouth: 'flat', brows: 'up', look: [0, 0] }); if (at(123.49) > 0) popAt(ctx, 1020, 220, at(123.49), () => { K.card(ctx, 880, 170, 280, 100, '#fff', 20); txt(ctx, 'it felt true', 1020, 220, HAND(700, 52), P.red); }); return; }
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 620);
    const away = at(131.44) > 0 ? clamp(at(131.44) / 2.4) : 0;
    // rain cloud arrives with "I don't know if I ever will"
    if (away > 0) { ctx.save(); ctx.globalAlpha = clamp(away * 3); ctx.fillStyle = '#7f8a99'; for (const [dx, dy, r] of [[0, 0, 50], [55, -18, 60], [110, 0, 48], [56, 16, 50]]) { ctx.beginPath(); ctx.arc(300 + dx, 150 + dy, r, 0, 7); ctx.fill(); } ctx.fillStyle = '#7fb6d9'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(290 + i * 18, 210 + ((t * 2 + i * .37) % 1) * 220, 3, 8, 0, 0, 7); ctx.fill(); } ctx.restore(); }
    bean(ctx, 360, 660, 1.1, t, Object.assign({ face: { mouth: away > 0 ? 'frown' : 'smile', brows: away > 0 ? 'sad' : 'up', look: [.6, -.6] } }, YOU));
    // the dream house in a thought bubble, tied like a balloon; it drifts off
    const bx = lerp(760, 1180, away * away), by = lerp(300, -120, away * away);
    for (let i = 0; i < 3; i++) sh(ctx, c => c.arc(lerp(440, bx - 120, (i + 1) / 4), lerp(330, by + 60, (i + 1) / 4), 10 + i * 6, 0, 7), '#fff', 3);
    popAt(ctx, bx, by, at(125.2), () => { sh(ctx, c => c.ellipse(bx, by, 190, 140, 0, 0, 7), '#fff', 4.5); K.house(ctx, bx, by + 80, .6); });
    popAt(ctx, 900, 560, at(127.57), () => { K.card(ctx, 660, 520, 480, 80, '#fff', 16); txt(ctx, '"When will you buy a house?"', 900, 560, HAND(700, 40)); });
    if (at(129.41) > 0 && away === 0) { txt(ctx, '40?', 600, 380, HAND(700, 80), '#9aa3ad'); K.cross(ctx, 600, 380, 90, clamp(at(129.6) / .4)); }
    if (away > 0) popAt(ctx, 900, 650, at(131.44), () => { K.card(ctx, 640, 615, 520, 70, '#1f1c1a', 16, 0); txt(ctx, '"I don\'t know if I ever will."', 900, 650, HAND(700, 38), '#fff'); });
  }
  function k3(ctx, lt, dur, t) { // the price of the ticket: a theme-park ticket booth for a first home — 3×→5× income, under construction for a decade, riders locked in, rates spike just as it thawed
    K.bg.sky(ctx); ground(ctx, '#9fd97f', 600); const T0 = 133.76, at = s => lt - (s - T0);
    // the park gate
    sh(ctx, c => c.roundRect(330, 120, 620, 90, 20), P.purple, 5); txt(ctx, 'FIRST-HOME PARK', 640, 166, PRINT(52), '#fff');
    for (const x of [360, 920]) sh(ctx, c => c.rect(x - 18, 200, 36, 400), '#f3e2c4', 5);
    // booth
    sh(ctx, c => c.roundRect(500, 300, 280, 300, 12), P.red, 5); sh(ctx, c => c.roundRect(530, 340, 220, 120, 10), '#cfe9ff', 4);
    popAt(ctx, 640, 400, at(136.17), () => { txt(ctx, 'TICKET', 640, 380, PRINT(30)); txt(ctx, at(138.9) > 0 ? '5× income' : '3× income', 640, 425, HAND(700, 46), at(138.9) > 0 ? P.red : P.green); });
    if (at(138.9) > 0 && at(139.4) < 0) { K.strike(ctx, 560, 425, 720, 425, clamp(at(138.9) / .3), P.red, 6); }
    // the queue
    for (let i = 0; i < 4; i++) bean(ctx, 420 - i * 80, 650, .45, t + i, { skin: i === 0 ? B.SKIN : 'white', hair: ['short', 'bob', 'side', 'bun'][i], hairColor: '#3a2a1e', body: i === 0 ? P.teal : '#c4c8ce', face: { mouth: at(138.9) > 0 ? 'o' : 'flat', brows: at(138.9) > 0 ? 'worried' : 'calm', look: [1, -.3] } });
    // signs pop up: under construction (a decade), locked riders, the rate spike
    popAt(ctx, 1110, 300, at(141.76), () => { ctx.save(); ctx.translate(1110, 300); ctx.rotate(.05); sh(ctx, c => { c.moveTo(-120, 70); c.lineTo(0, -80); c.lineTo(120, 70); c.closePath(); }, P.orange, 5); txt(ctx, 'UNDER', 0, 0, PRINT(28)); txt(ctx, 'CONSTRUCTION', 0, 30, PRINT(20)); ctx.restore(); txt(ctx, 'a decade of not building', 1110, 410, HAND(700, 28), INK); });
    popAt(ctx, 160, 300, at(144.64), () => { K.card(ctx, 40, 230, 240, 150, '#fff', 18); cuffs(ctx, 160, 290, .5, -.1); txt(ctx, 'half of mortgages', 160, 340, PRINT(20)); txt(ctx, 'locked under 4%', 160, 362, PRINT(20), P.orange); });
    if (at(148.58) > 0) popAt(ctx, 1110, 520, at(148.58), () => { K.card(ctx, 990, 470, 240, 110, '#fff', 18); txt(ctx, 'just as it thawed…', 1110, 500, PRINT(20)); txt(ctx, '6.1% → 7.28%', 1110, 545, HAND(700, 38), P.red); });
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
