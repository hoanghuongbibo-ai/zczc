/* "Your Price Isn't My Price" — part 2: CH. 1 YOU'RE IN AN EXPERIMENT, CH. 2 AMAZON TRIED THIS IN 2000, CH. 3 WHAT THE GOVERNMENT FOUND
 * (voice: assets/audio/pricing-2.mp3). Shot plan: biz/PLAN-pricing-2.md. Times are the narration's word times. */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, I = G.Icons, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt, tween } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const drift = (lt, dur, z0 = 1, z1 = 1.05) => lerp(z0, z1, inout(clamp(lt / dur)));
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const INSTA = [18, 18, 1164, 592];
  // real people, drawn in the house style from the supplied photos
  const SIMO = { skin: '#f6d0b0', hair: 'long', hairColor: '#1c1716', body: '#e0352b', top: 'plain' };
  const BEZOS = { skin: '#f3c9a6', hair: 'bald', body: '#2b2f3a', top: 'suit', tie: '#e8e8e8' };
  const FERGUSON = { skin: '#f2c8a4', hair: 'short', hairColor: '#7a4b2a', beard: true, body: '#23262e', top: 'suit', tie: '#e59aa8' };
  const HOLYOAK = { skin: '#f6d2b5', hair: 'long', hairColor: '#d9b46a', body: '#5a6474', top: 'suit' };

  function chapterTab(ctx, num, title, lt, dur = 4.5) { // small corner tab instead of a full chapter card (the voice starts right away)
    if (lt <= 0 || lt > dur) return; const a = clamp(lt / .3) * clamp((dur - lt) / .4);
    ctx.save(); ctx.globalAlpha = a; ctx.font = HAND(700, 40); const w = ctx.measureText(title).width + 190;
    const x = lerp(-w, 20, out(clamp(lt / .4)));
    sh(ctx, c => c.roundRect(x + 6, 26, w, 64, 16), 'rgba(0,0,0,.2)', 0); K.card(ctx, x, 20, w, 64, '#1f1c1a', 16, 0);
    sh(ctx, c => c.roundRect(x + 10, 28, 140, 48, 12), P.yellow, 0); txt(ctx, 'CHAPTER ' + num, x + 80, 53, PRINT(24)); txt(ctx, title, x + 170, 53, HAND(700, 40), '#fff', 'left');
    ctx.restore();
  }
  const logoAt = (ctx, key, x, y, w, lt, o = {}) => K.logo(ctx, key, x, y, w, lt, o);

  // ================= CHAPTER 1 =================
  function cartBig(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-230, -260); c.lineTo(230, -260); c.lineTo(190, -60); c.lineTo(-190, -60); c.closePath(); }, '#2bb35b', 6);
    for (let i = 1; i < 6; i++) Tn.line(ctx, [[-230 + i * 77, -258], [-198 + i * 64, -62]], 4, 'rgba(0,0,0,.25)');
    Tn.line(ctx, [[230, -260], [290, -330]], 10, INK); Tn.line(ctx, [[-190, -60], [-170, -20], [190, -20]], 8, INK); for (const wx of [-140, 150]) sh(ctx, c => c.arc(wx, 0, 26, 0, 7), INK, 0); ctx.restore(); }
  function d1(ctx, lt, dur, t) { // in 2022 Instacart bought a company called Eversight for $59 million
    const T0 = 0, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 620, W, 100); Tn.line(ctx, [[0, 620], [W, 620]], 4, INK);
    cartBig(ctx, 520, 600, 1);
    if (IMG.instacart) { ctx.save(); ctx.beginPath(); ctx.roundRect(400, 400, 240, 122, 12); ctx.clip(); ctx.drawImage(IMG.instacart, ...INSTA, 400, 400, 240, 122); ctx.restore(); sh(ctx, c => c.roundRect(400, 400, 240, 122, 12), null, 4); }
    // the crane lowers the Eversight box into the cart
    const dk = clamp(at(2.4) / 1.4), by = lerp(150, 330, inout(dk));
    Tn.line(ctx, [[1080, 620], [1080, 60], [500, 60]], 16, '#f2a03a'); Tn.line(ctx, [[1080, 620], [1080, 60], [500, 60]], 4, INK);
    Tn.line(ctx, [[520, 60], [520, by - 70]], 3, INK);
    if (at(2.0) > 0) popAt(ctx, 520, by, at(2.0), () => { sh(ctx, c => c.rect(400, by - 70, 240, 140), '#fff', 5); if (IMG.eversight) ctx.drawImage(IMG.eversight, 40, 70, 520, 175, 410, by - 46, 220, 74); });
    Pr.tag(ctx, 760, 200, 1.3, '$59M', at(3.42), { color: P.yellow, size: 52 });
    K.stamp(ctx, '2022', 900, 400, at(.59), { color: P.blue, size: 70, rot: .1 });
    chapterTab(ctx, 1, "You're in an experiment", lt);
    K.source(ctx, 'Source: SiliconANGLE (Dec 22, 2025) · logos: Instacart, Eversight', at(3.0));
  }
  function d2(ctx, lt, dur, t) { // Eversight makes software that lets retailers test prices
    const T0 = 5.18, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef6ff'); Pr.table(ctx, 560, '#c98f5a');
    bean(ctx, 300, 660, 1.0, t, Object.assign(Pr.extra(1), { top: 'shirt', armR: [1.2, 1.0], face: { mouth: 'smile', look: [.9, .2] } }));
    Pr.table(ctx, 560, '#c98f5a');
    // laptop with the dashboard
    sh(ctx, c => c.roundRect(470, 200, 520, 340, 16), '#3a3e46', 5); sh(ctx, c => c.rect(490, 220, 480, 300), '#fff', 0);
    sh(ctx, c => { c.moveTo(440, 560); c.lineTo(1020, 560); c.lineTo(990, 540); c.lineTo(470, 540); c.closePath(); }, '#b9bec6', 4.5);
    if (IMG.eversight) ctx.drawImage(IMG.eversight, 40, 70, 520, 175, 500, 228, 160, 54);
    ['Price A', 'Price B', 'Price C'].forEach((l, i) => { const y = 310 + i * 66, on = (Math.floor(t * 1.4) + i) % 2 === 0; popAt(ctx, 730, y + 20, at(7.66) - i * .12, () => { txt(ctx, l, 520, y + 20, PRINT(26), INK, 'left'); sh(ctx, c => c.roundRect(860, y + 4, 80, 34, 17), on ? P.green : '#c9ced6', 3); sh(ctx, c => c.arc(on ? 922 : 878, y + 21, 13, 0, 7), '#fff', 3); }); });
    [1080, 1180].forEach((x, i) => popAt(ctx, x, 470, at(7.66) + i * .1, () => { sh(ctx, c => { c.moveTo(x - 14, 400); c.lineTo(x + 14, 400); c.lineTo(x + 14, 440); c.lineTo(x + 46, 540); c.lineTo(x - 46, 540); c.lineTo(x - 14, 440); c.closePath(); }, 'rgba(230,240,255,.85)', 4.5); sh(ctx, c => { c.moveTo(x - 30, 490); c.lineTo(x + 30, 490); c.lineTo(x + 44, 536); c.lineTo(x - 44, 536); c.closePath(); }, i ? P.purple : P.green, 0); }));
    if (at(7.66) > 0) popAt(ctx, 730, 120, at(7.66), () => { K.card(ctx, 540, 80, 380, 76, P.yellow, 16); txt(ctx, 'software to test prices', 730, 118, HAND(700, 40)); });
  }
  function d3(ctx, lt, dur, t) { // show some shoppers one price, others a higher or lower price, then watch who still buys
    const T0 = 9.29, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff6e6'); ctx.fillStyle = '#e6dccb'; ctx.fillRect(0, 610, W, 110); Tn.line(ctx, [[0, 610], [W, 610]], 4, INK);
    const rows = [[200, 11.11, 'price A', '#d8f5d0'], [520, 12.64, 'price B', '#ffd6d0']];
    rows.forEach(([y0, s, l, col], r) => { const k = at(s); for (let i = 0; i < 3; i++) { const x = 120 + i * 150 + r * 40;
      bean(ctx, x, r ? 700 : 400, .5, t, Object.assign(Pr.extra(i + r * 3), { face: { mouth: 'flat', look: [.8, 0] } }));
      const v = at(14.83 + i * .25 + r * .1); if (v > 0) { const ok = (i + r) % 2 === 0; if (ok) K.check(ctx, x, (r ? 700 : 400) - 230, 44, clamp(v / .3)); else K.cross(ctx, x, (r ? 700 : 400) - 230, 40, clamp(v / .3)); } }
      if (r === 0) { sh(ctx, c => c.rect(-10, 400, 620, 14), '#cfc5b2', 3); }
      Pr.tag(ctx, 640, r ? 470 : 190, 1.0, l, k, { color: col, size: 36 }); });
    if (at(13.21) > 0) txt(ctx, 'higher or lower', 640, 590, HAND(700, 30), P.red, 'center', clamp(at(13.21) / .3));
    // the scientist watching from behind a clipboard
    const sc = bean(ctx, 1040, 640, .95, t, Object.assign(Pr.extra(6), { body: '#fff', top: 'shirt', glasses: true, armL: [.6, 1.6], face: { mouth: 'smirk', brows: 'up', look: [-.9, 0] } }));
    sh(ctx, c => c.roundRect(sc.hands.L[0] - 60, sc.hands.L[1] - 80, 90, 110, 8), '#d9b98a', 4); for (let i = 0; i < 4; i++) Tn.line(ctx, [[sc.hands.L[0] - 46, sc.hands.L[1] - 50 + i * 20], [sc.hands.L[0] + 16, sc.hands.L[1] - 50 + i * 20]], 3, '#6b4a1d');
    if (at(14.83) > 0) popAt(ctx, 1040, 120, at(14.83), () => { K.card(ctx, 870, 80, 340, 80, '#fff', 16); txt(ctx, 'who still buys?', 1040, 120, HAND(700, 42)); });
  }
  function d4(ctx, lt, dur, t) { // the same idea as testing two versions of a button — except the button is your grocery bill
    const T0 = 16.87, at = s => lt - (s - T0), m = clamp(at(20.6) / .6);
    K.bg.white(ctx);
    [[380, 'A', P.blue], [900, 'B', P.green]].forEach(([x, l, col], i) => { const k = at(18.79 + i * .2); if (k <= 0) return;
      popAt(ctx, x, 360, k, () => {
        if (m < 1) { ctx.save(); ctx.globalAlpha = 1 - m; sh(ctx, c => c.roundRect(x - 170, 300, 340, 110, 55), col, 6); txt(ctx, 'Buy now', x, 355, HAND(700, 52), '#fff'); txt(ctx, 'version ' + l, x, 450, PRINT(28), '#6a7380'); ctx.restore(); }
        if (m > 0) { ctx.save(); ctx.globalAlpha = m; sh(ctx, c => { c.moveTo(x - 140, 170); c.lineTo(x + 140, 170); c.lineTo(x + 140, 560); for (let j = 0; j < 7; j++) { c.lineTo(x + 140 - j * 40 - 20, 540); c.lineTo(x + 140 - j * 40 - 40, 560); } c.closePath(); }, '#fff', 5);
          txt(ctx, 'GROCERY BILL', x, 210, PRINT(26)); for (let j = 0; j < 6; j++) Tn.line(ctx, [[x - 110, 260 + j * 36], [x + 110 - (j % 3) * 30, 260 + j * 36]], 4, '#c9ced6');
          txt(ctx, 'version ' + l, x, 500, HAND(700, 40), col); ctx.restore(); } }); });
    if (at(17.37) > 0) popAt(ctx, 640, 90, at(17.37), () => { K.card(ctx, 380, 52, 520, 76, P.yellow, 16); txt(ctx, m > .5 ? 'A/B test… on your bill' : 'a tech-company A/B test', 640, 90, HAND(700, 38)); });
    txt(ctx, 'vs', 640, 360, HAND(700, 60), '#9aa3ad', 'center', clamp(at(19.0) / .3));
  }
  function d5(ctx, lt, dur, t) { // Fidji Simo told investors: optimize prices by how price-sensitive customers are (per AP)
    const T0 = 22.93, at = s => lt - (s - T0);
    K.bg.color(ctx, '#2f3a55');
    // the investor audience (backs of heads), the speaker on a lit stage
    ctx.fillStyle = 'rgba(255,240,180,.25)'; ctx.beginPath(); ctx.moveTo(300, -10); ctx.lineTo(420, -10); ctx.lineTo(560, 560); ctx.lineTo(160, 560); ctx.closePath(); ctx.fill();
    bean(ctx, 360, 560, 1.0, t, Object.assign({}, SIMO, { armR: [1.9, .6], face: { mouth: Math.sin(t * 9) > 0 ? 'smile' : 'o', brows: 'up', look: [.5, 0] } }));
    sh(ctx, c => { c.moveTo(250, 560); c.lineTo(470, 560); c.lineTo(440, 420); c.lineTo(280, 420); c.closePath(); }, '#6b4a2b', 5);
    for (let i = 0; i < 6; i++) { const x = 140 + i * 200, y = 690 + (i % 2) * 10; B.head(ctx, x, y, 56, Object.assign(Pr.extra(i + 2), { face: { eyes: 0, mouth: 'flat' } })); sh(ctx, c => c.ellipse(x, y + 70, 76, 40, 0, Math.PI, 0), '#3e4a66', 4); }
    K.nameCard(ctx, 'Fidji Simo', 'Instacart CEO (at the time)', 360, 120, at(25.29));
    if (at(28.13) > 0) K.bubble(ctx, ['optimize prices based on', 'how price-sensitive', 'customers are'], 880, 230, 520, [520, 320], at(28.13), { size: 36 });
    // the sensitivity meter on a shopper
    if (at(30.4) > 0) popAt(ctx, 960, 470, at(30.4), () => { sh(ctx, c => c.arc(960, 500, 110, Math.PI, 0), '#fff', 5); [[P.green, Math.PI, Math.PI * 1.33], [P.yellow, Math.PI * 1.33, Math.PI * 1.66], [P.red, Math.PI * 1.66, Math.PI * 2]].forEach(([c0, a0, a1]) => sh(ctx, c => { c.arc(960, 500, 100, a0, a1); c.arc(960, 500, 70, a1, a0, true); c.closePath(); }, c0, 0));
      const a = Math.PI * (1.2 + .6 * (.5 + .5 * Math.sin(t * 2))); Tn.line(ctx, [[960, 500], [960 + Math.cos(a) * 90, 500 + Math.sin(a) * 90]], 6, INK); txt(ctx, 'price sensitivity', 960, 540, PRINT(24), '#fff'); });
    K.source(ctx, "Associated Press's paraphrase (Dec 11, 2025)", at(32.93));
  }
  function d6(ctx, lt, dur, t) { // so the goal was to figure out the highest price people will still pay
    const T0 = 34.89, at = s => lt - (s - T0), stop = at(37.9) > 0;
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    const bar = stop ? 430 : lerp(500, 330, clamp(lt / 3.2)) - 0;
    for (const px of [520, 920]) { Tn.line(ctx, [[px, 600], [px, 220]], 8, INK); for (let y = 560; y > 230; y -= 40) Tn.line(ctx, [[px - 10, y], [px + 10, y]], 3, INK); }
    sh(ctx, c => c.rect(520, bar - 8, 400, 16), P.red, 4); Pr.tag(ctx, 720, bar + 50, 1, stop ? 'too high' : '$ ↑', 1, { color: '#fff', size: 34 });
    const jump = Math.max(0, Math.sin(lt * 2.4)) * (stop ? 0 : 160);
    bean(ctx, 400, 600 - jump, .9, t, Object.assign({}, Pr.YOU, { armL: [2.6, 0], armR: [2.6, 0], face: { mouth: stop ? 'frown' : 'grin', brows: stop ? 'worried' : 'up', look: [.6, -.4] } }));
    if (at(36.27) > 0) popAt(ctx, 640, 100, at(36.27), () => { K.card(ctx, 330, 60, 620, 80, P.yellow, 18); txt(ctx, 'the highest price you\'ll still pay', 640, 100, HAND(700, 38)); });
  }
  function browser(ctx, x, y, w, h) { sh(ctx, c => c.roundRect(x, y, w, h, 16), '#fff', 5); sh(ctx, c => c.roundRect(x, y, w, 50, [16, 16, 0, 0]), '#e9edf1', 5); [0, 1, 2].forEach(i => sh(ctx, c => c.arc(x + 26 + i * 24, y + 25, 7, 0, 7), ['#ff5f57', '#febc2e', '#28c840'][i], 0)); sh(ctx, c => c.roundRect(x + 110, y + 12, w - 140, 26, 13), '#fff', 2.5); }
  function d7(ctx, lt, dur, t) { // the line that got people angry: "End shoppers are not aware that they're in an experiment."
    const T0 = 39.11, at = s => lt - (s - T0);
    K.bg.color(ctx, '#ffe9e2');
    ctx.save(); camZoom(ctx, at(47.1) > 0 ? lerp(1, 1.12, inout(clamp(at(47.1) / 1.2))) : 1, 640, 420);
    browser(ctx, 160, 120, 960, 520); txt(ctx, 'instacart.com/company/…/eversight', 290, 145, PRINT(18), '#6a7380', 'left');
    if (IMG.instacart) { ctx.save(); ctx.beginPath(); ctx.roundRect(200, 200, 180, 92, 10); ctx.clip(); ctx.drawImage(IMG.instacart, ...INSTA, 200, 200, 180, 92); ctx.restore(); }
    txt(ctx, 'Eversight: how it works', 420, 246, HAND(700, 40), INK, 'left');
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#e3e7ec'; ctx.fillRect(200, 330 + i * 34, 860 - i * 140, 14); }
    if (at(47.1) > 0) { const k = out(clamp(at(47.1) / .9)); ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = P.yellow; ctx.fillRect(196, 452, 870 * k, 70); ctx.restore(); }
    txt(ctx, '"End shoppers are not aware that', 210, 470, HAND(700, 40), at(47.1) > 0 ? INK : '#b6bcc5', 'left'); txt(ctx, 'they\'re in an experiment."', 210, 508, HAND(700, 40), at(47.1) > 0 ? INK : '#b6bcc5', 'left');
    ctx.restore();
    if (at(41.57) > 0) { const mx = lerp(1180, 640, out(clamp(at(41.57) / 1.2))); sh(ctx, c => c.arc(mx, 480, 90, 0, 7), 'rgba(191,230,255,.3)', 9); Tn.line(ctx, [[mx + 64, 544], [mx + 140, 640]], 18, '#8a5a36'); logoAt(ctx, 'gw', 1170, 640, 90, at(41.57), { pad: 6 }); }
    // angry faces pop around the page
    [[90, 140], [1190, 200], [90, 520]].forEach(([x, y], i) => { const k = at(40.42 + i * .2); if (k <= 0) return; popAt(ctx, x, y, k, () => { B.head(ctx, x, y, 52, Object.assign(Pr.extra(i + 4), { face: { mouth: 'frown', brows: 'angry' } })); for (let j = 0; j < 3; j++) { const sk = (t * 1.2 + j * .33) % 1; ctx.fillStyle = `rgba(160,170,180,${1 - sk})`; ctx.beginPath(); ctx.arc(x - 30 + j * 30, y - 70 - sk * 40, 8 + sk * 8, 0, 7); ctx.fill(); } }); });
    K.source(ctx, "Instacart's Eversight page, via Groundwork Collaborative", at(42.0));
  }
  function couch(ctx, x, y) { sh(ctx, c => c.roundRect(x - 260, y - 180, 520, 120, 30), '#8e6bd8', 5); sh(ctx, c => c.roundRect(x - 290, y - 110, 580, 110, 30), '#a283e6', 5); for (const sx of [-1, 1]) sh(ctx, c => c.roundRect(x + sx * 270 - 40, y - 150, 80, 150, 26), '#8e6bd8', 5); }
  function d8(ctx, lt, dur, t) { // Tuesday night, ordering groceries; you see $4.79 for eggs
    const T0 = 50.5, at = s => lt - (s - T0);
    ctx.fillStyle = '#3a3f66'; ctx.fillRect(0, 0, W, H);
    sh(ctx, c => c.roundRect(880, 80, 300, 240, 10), '#1d2142', 6); ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.arc(1100, 150, 30, 0, 7); ctx.fill(); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#fff'; ctx.fillRect(900 + (i * 53) % 260, 110 + (i * 37) % 180, 3, 3); }
    ctx.fillStyle = '#5a5f8a'; ctx.fillRect(0, 600, W, 120);
    // lamp light
    ctx.fillStyle = 'rgba(255,220,140,.25)'; ctx.beginPath(); ctx.moveTo(150, 120); ctx.lineTo(260, 120); ctx.lineTo(560, 620); ctx.lineTo(-150, 620); ctx.closePath(); ctx.fill();
    couch(ctx, 420, 640);
    bean(ctx, 420, 600, 1.0, t, Object.assign({}, Pr.YOU, { armR: [.9, 1.5], armL: [.9, 1.5], face: { mouth: at(55.27) > 0 ? 'frown' : 'flat', brows: at(55.27) > 0 ? 'worried' : 'calm', look: [0, .8] } }));
    Pr.calendar(ctx, 1030, 560, .6, 'TUESDAY', 'night', { bigSize: 70, head: P.purple });
    Pr.phone(ctx, 760, 360, .8, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#0b7a3e'; c.fillRect(0, 0, w, 64); txt(c, 'Your cart', w / 2, 36, PRINT(22), '#fff'); c.fillStyle = '#f6f2ea'; c.fillRect(20, 84, w - 40, 200); Pr.eggs(c, w / 2, 250, .8); if (at(55.27) > 0) { txt(c, '$4.79', w / 2, 340, HAND(700, 64), P.red); } });
    K.source(ctx, 'example price from the egg test ($3.99–$4.79)', at(55.5));
  }
  function d9(ctx, lt, dur, t) { // you figure that's just what eggs cost now, because everything's expensive
    const T0 = 57.46, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    bean(ctx, 380, 680, 1.1, t, Object.assign({}, Pr.YOU, { armL: [1.1, -1.2], armR: [1.1, -1.2], face: { mouth: 'flat', brows: 'worried', look: [.5, -.3] } }));
    popAt(ctx, 860, 300, at(57.6), () => { for (const [x, y, r] of [[560, 380, 14], [610, 340, 22]]) sh(ctx, c => c.arc(x, y, r, 0, 7), '#fff', 4); sh(ctx, c => c.ellipse(880, 260, 340, 200, 0, 0, 7), '#fff', 5);
      const items = [['eggs', 740, 230], ['coffee', 880, 180], ['gas', 1020, 230], ['rent', 820, 320], ['groceries', 980, 320]];
      items.forEach(([l, x, y], i) => { const k = at(59.8 + i * .12); if (k <= 0) return; txt(ctx, l, x, y, HAND(700, 34)); K.arrow(ctx, [x + 50, y + 14], [x + 50, y - 26], clamp(k / .3), P.red, 5); }); });
    if (at(60.24) > 0) popAt(ctx, 880, 560, at(60.24), () => { K.card(ctx, 690, 520, 380, 76, P.yellow, 16); txt(ctx, 'everything\'s expensive', 880, 558, HAND(700, 40)); });
  }
  function d10(ctx, lt, dur, t) { // you have no way of knowing the person next to you is seeing $3.99
    const T0 = 61.4, at = s => lt - (s - T0);
    ctx.fillStyle = '#3a3f66'; ctx.fillRect(0, 0, 630, H); ctx.fillStyle = '#4b5180'; ctx.fillRect(650, 0, 630, H);
    sh(ctx, c => c.rect(620, -10, 40, H + 20), '#c9b28c', 5); for (let y = 30; y < H; y += 60) Tn.line(ctx, [[620, y], [660, y]], 3, '#a08a66');
    ctx.fillStyle = '#5a5f8a'; ctx.fillRect(0, 620, W, 100);
    bean(ctx, 320, 660, 1.0, t, Object.assign({}, Pr.YOU, { armR: [.8, 1.5], face: { mouth: 'frown', look: [.6, .6] } }));
    bean(ctx, 960, 660, 1.0, t, Object.assign({}, Pr.NEIGHBOUR, { armL: [.8, 1.5], face: { mouth: at(63.6) > 0 ? 'smile' : 'flat', look: [-.6, .6] } }));
    K.bubble(ctx, '$4.79', 330, 180, 200, [330, 260], at(61.5), { size: 56, fill: '#ffd6d0' });
    K.bubble(ctx, '$3.99', 950, 180, 200, [950, 260], at(63.6), { size: 56, fill: '#d8f5d0' });
    if (at(62.44) > 0) popAt(ctx, 640, 420, at(62.44), () => { K.card(ctx, 520, 380, 240, 80, '#fff', 16); txt(ctx, 'next door', 640, 420, HAND(700, 40)); });
  }
  function d11(ctx, lt, dur, t) { // you're not a customer in that moment — you're a data point
    const T0 = 65.05, at = s => lt - (s - T0), k = clamp(at(66.43) / .7);
    K.bg.white(ctx);
    Tn.line(ctx, [[200, 100], [200, 620], [1120, 620]], 6, INK);
    for (let i = 0; i < 40; i++) { const x = 240 + ((i * 197) % 860), y = 140 + ((i * 113) % 450); sh(ctx, c => c.arc(x, y, 9, 0, 7), '#9ad1ff', 2.5); }
    const sx = lerp(660, 700, k), sy = lerp(620, 360, k), s = lerp(1.0, 0, k);
    if (s > .05) bean(ctx, sx, sy + 40 * k, s, t, Object.assign({}, Pr.YOU, { face: { mouth: 'o', brows: 'up' } }));
    if (k > .5) { sh(ctx, c => c.arc(700, 360, 18 * back(clamp((k - .5) * 2)), 0, 7), P.red, 4); K.arrow(ctx, [880, 470], [730, 385], clamp((k - .6) * 3), P.red, 6); txt(ctx, 'you', 920, 495, HAND(700, 44), P.red); }
    popAt(ctx, 1000, 120, at(65.4), () => { K.card(ctx, 860, 82, 280, 76, '#fff', 16); txt(ctx, 'customer', 1000, 120, HAND(700, 44), '#9aa3ad'); });
    if (at(65.86) > 0) K.strike(ctx, 880, 120, 1120, 120, clamp(at(65.86) / .3), P.red, 8);
    K.stamp(ctx, 'DATA POINT', 1000, 250, at(66.62), { color: P.red, size: 52, rot: -.06 });
  }
  function d12(ctx, lt, dur, t) { // this idea isn't new at all — it's older than the iPhone
    const T0 = 67.89, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#bfe3ff', '#eef8ff');
    host(ctx, 330, 700, 1.1, t, [[T0, 'shrug'], [69.5, 'pointSide'], [71.2, 'presentBoth']], { mouth: 'smile', brows: 'up', look: [.6, 0] });
    Tn.line(ctx, [[600, 480], [lerp(600, 1200, out(clamp(at(68.99) / 1))), 480]], 6, INK);
    popAt(ctx, 680, 480, at(69.5), () => { sh(ctx, c => c.arc(680, 480, 14, 0, 7), P.red, 4); txt(ctx, '2000', 680, 530, HAND(700, 44), P.red); txt(ctx, 'price tests', 680, 420, PRINT(24)); });
    popAt(ctx, 1080, 480, at(72.0), () => { sh(ctx, c => c.arc(1080, 480, 14, 0, 7), P.blue, 4); txt(ctx, '2007', 1080, 530, HAND(700, 44), P.blue); sh(ctx, c => c.roundRect(1050, 300, 60, 110, 12), '#24272e', 4); sh(ctx, c => c.roundRect(1057, 314, 46, 80, 6), '#9ad1ff', 0); txt(ctx, 'first iPhone', 1080, 440, PRINT(22)); });
    if (at(71.61) > 0) popAt(ctx, 880, 300, at(71.61), () => { K.card(ctx, 780, 230, 200, 70, P.yellow, 16); txt(ctx, 'older!', 880, 265, HAND(700, 44)); });
  }

  // ================= CHAPTER 2 =================
  function crt(ctx, x, y, s, screen) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-200, -170, 400, 320, 24), '#e6e0cf', 6); sh(ctx, c => c.roundRect(-170, -140, 340, 250, 14), '#fff', 4); ctx.save(); ctx.beginPath(); ctx.roundRect(-170, -140, 340, 250, 14); ctx.clip(); ctx.translate(-170, -140); if (screen) screen(ctx, 340, 250); ctx.restore(); sh(ctx, c => c.rect(-60, 150, 120, 40), '#d6cfbb', 5); sh(ctx, c => c.roundRect(-150, 186, 300, 24, 8), '#e6e0cf', 5); ctx.restore(); }
  function dvd(ctx, x, y, s, label, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-34, -96, 68, 96), col, 4); sh(ctx, c => c.arc(0, -52, 22, 0, 7), 'rgba(255,255,255,.7)', 3); sh(ctx, c => c.arc(0, -52, 6, 0, 7), col, 2); if (label) txt(ctx, label, 0, -84, PRINT(14), '#fff'); ctx.restore(); }
  function e1(ctx, lt, dur, t) { // Aug 31 – Sep 5, 2000: Amazon randomly changed the prices on 68 DVDs
    const T0 = 73.37, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e8eef7'); Pr.table(ctx, 600, '#b98a5a');
    crt(ctx, 330, 410, 1.0, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#f0c14b'; c.fillRect(0, 0, w, 40); if (IMG.amazon) c.drawImage(IMG.amazon, 20, 120, 728, 260, 30, 60, 280, 100); txt(c, 'DVDs · Video', w / 2, 200, PRINT(22), '#1d4f91'); });
    popAt(ctx, 330, 80, at(73.77), () => { K.card(ctx, 130, 44, 400, 72, '#fff', 16); txt(ctx, 'Aug 31 – Sep 5, 2000', 330, 80, HAND(700, 40)); });
    // DVD shelf with tags reshuffled by a rolling die
    sh(ctx, c => c.rect(620, 250, 600, 330), '#f1ece2', 5); for (let r = 0; r < 2; r++) Tn.line(ctx, [[620, 400 + r * 170], [1220, 400 + r * 170]], 6, '#b9ae9a');
    for (let i = 0; i < 14; i++) { const x = 660 + (i % 7) * 82, y = 398 + Math.floor(i / 7) * 170; dvd(ctx, x, y, .9, null, [P.blue, P.red, P.purple, P.teal, P.orange, '#3c6e8f', P.green][i % 7]);
      if (at(77.32) > 0) { const flick = Math.floor((t * 6 + i * 3) % 4); txt(ctx, ['$', '$$', '$', '$$$'][(flick + i) % 4], x, y - 120, HAND(700, 26), [P.green, P.red][(flick + i) % 2]); } }
    if (at(77.32) > 0) { const k = at(77.32), dx = lerp(1300, 920, out(clamp(k / .8))); ctx.save(); ctx.translate(dx, 200); ctx.rotate(k * 6 * (1 - clamp(k / .8))); sh(ctx, c => c.roundRect(-40, -40, 80, 80, 14), '#fff', 5); for (const [a, b] of [[-20, -20], [20, -20], [0, 0], [-20, 20], [20, 20]]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(a, b, 7, 0, 7); ctx.fill(); } ctx.restore(); txt(ctx, 'random', 920, 270, HAND(700, 32), INK, 'center', clamp(k / .4)); }
    K.slam(ctx, '68 DVDs', 920, 640, at(78.86), 70, P.red);
    chapterTab(ctx, 2, 'Amazon tried this in 2000', lt);
    K.source(ctx, 'Source: CNN Money (Sep 28, 2000) · logo: Amazon', at(76.9));
  }
  function e2(ctx, lt, dur, t) { // same movie, different customers, different prices
    const T0 = 80.51, at = s => lt - (s - T0);
    K.bg.cream(ctx); Pr.table(ctx, 560, '#b98a5a');
    [[320, 'price A', '#d8f5d0', 82.43, 1], [960, 'price B', '#ffd6d0', 82.75, 7]].forEach(([x, l, col, s, e], i) => {
      bean(ctx, x - 170, 660, .9, t, Object.assign(Pr.extra(e), { face: { mouth: i ? 'frown' : 'smile', look: [.9, -.2] } })); Pr.table(ctx, 560, '#b98a5a');
      crt(ctx, x + 40, 420, .62, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); dvd(c, 90, 190, 1.3, 'MOVIE', P.blue); if (at(s) > 0) txt(c, l, 230, 120, HAND(700, 40), i ? P.red : P.green); }); });
    popAt(ctx, 640, 90, at(80.51), () => { K.card(ctx, 450, 52, 380, 76, P.yellow, 16); txt(ctx, 'same movie', 640, 90, HAND(700, 42)); });
  }
  function e3(ctx, lt, dur, t) { // exactly what Eversight does: figure out how price changes affect sales
    const T0 = 84.12, at = s => lt - (s - T0), tilt = Math.sin(lt * 1.6) * .22;
    K.bg.white(ctx);
    if (IMG.eversight) logoAt(ctx, 'eversight', 640, 100, 300, at(85.34), { crop: [40, 70, 520, 175], pad: 10 });
    sh(ctx, c => { c.moveTo(640, 470); c.lineTo(600, 560); c.lineTo(680, 560); c.closePath(); }, '#8a5a36', 5);
    ctx.save(); ctx.translate(640, 460); ctx.rotate(tilt); sh(ctx, c => c.roundRect(-380, -12, 760, 24, 10), '#c98f5a', 5);
    sh(ctx, c => c.roundRect(-380, -110, 180, 98, 14), P.red, 5); txt(ctx, 'PRICE', -290, -60, HAND(700, 42), '#fff');
    sh(ctx, c => c.roundRect(200, -110, 180, 98, 14), P.green, 5); txt(ctx, 'SALES', 290, -60, HAND(700, 42), '#fff'); ctx.restore();
    txt(ctx, tilt < 0 ? 'price ↑  sales ↓' : 'price ↓  sales ↑', 640, 640, HAND(700, 40), INK, 'center', clamp(at(88.02) / .4));
  }
  function e4(ctx, lt, dur, t) { // customers noticed they were paying different prices for the same DVD — not happy
    const T0 = 90.03, at = s => lt - (s - T0);
    K.bg.color(ctx, '#dfe6f0');
    sh(ctx, c => c.rect(140, 70, 1000, 520), '#fff', 5); sh(ctx, c => c.rect(140, 70, 1000, 54), '#2b4c8c', 5); txt(ctx, 'Message board · Sept 2000', 170, 98, PRINT(24), '#fff', 'left');
    const posts = ['Why did I pay more for the same DVD??', 'My friend got it cheaper. Same day!', 'Not cool, Amazon.'];
    posts.forEach((p, i) => popAt(ctx, 640, 190 + i * 120, at(90.65 + i * 1.3), () => { sh(ctx, c => c.rect(170, 140 + i * 120, 940, 100), i % 2 ? '#f3f6fa' : '#fff', 3); B.head(ctx, 230, 190 + i * 120, 34, Object.assign(Pr.extra(i + 1), { face: { mouth: 'frown', brows: 'angry' } })); txt(ctx, p, 290, 190 + i * 120, HAND(700, 38), INK, 'left'); }));
    K.stamp(ctx, 'NOT HAPPY', 960, 640, at(94.63), { color: P.red, size: 52, rot: -.06 });
    txt(ctx, 'illustration', 1240, 700, PRINT(18), '#8a93a0', 'right');
  }
  function e5(ctx, lt, dur, t) { // Amazon backed down fast: refunded about 6,900 customers an average of $3.10 each
    const T0 = 96.09, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    // the mailbox shooting out refund envelopes
    Tn.line(ctx, [[200, 600], [200, 420]], 12, '#7a5233'); sh(ctx, c => { c.moveTo(110, 420); c.lineTo(110, 330); c.arc(200, 330, 90, Math.PI, 0); c.lineTo(290, 420); c.closePath(); }, '#3b7dd8', 5);
    if (IMG.amazon) { K.card(ctx, 130, 340, 140, 56, '#fff', 8); ctx.drawImage(IMG.amazon, 20, 120, 728, 260, 138, 344, 124, 46); }
    for (let i = 0; i < 18; i++) { const k = ((at(98.39) - i * .14) % 1.6) / 1.6; if (at(98.39) - i * .14 <= 0) continue; const x = lerp(300, 1180, k), y = 330 - Math.sin(k * Math.PI) * 220 + (i % 3) * 30; Pr && K.envelope(ctx, x, y, .7, k * 3, { stampC: P.red }); }
    for (let i = 0; i < 8; i++) bean(ctx, 760 + i * 62, 690, .42, t, Object.assign(Pr.extra(i), { face: { mouth: 'smile', look: [-.6, -.3] } }));
    const n = Math.round(6900 * out(clamp(at(99.19) / 1.6)) / 10) * 10;
    if (at(99.19) > 0) popAt(ctx, 900, 140, at(99.19), () => { K.card(ctx, 740, 80, 320, 120, '#fff', 18); txt(ctx, '~' + n.toLocaleString('en-US'), 900, 125, HAND(700, 60), P.blue); txt(ctx, 'customers refunded', 900, 172, PRINT(22)); });
    if (at(101.14) > 0) popAt(ctx, 520, 200, at(101.14), () => { sh(ctx, c => c.arc(520, 200, 80, 0, 7), P.yellow, 6); sh(ctx, c => c.arc(520, 200, 64, 0, 7), null, 3, '#c9971c'); txt(ctx, '$3.10', 520, 192, HAND(700, 44)); txt(ctx, 'average', 520, 230, PRINT(18), '#6b4a1d'); });
    K.source(ctx, 'Source: CNN Money (Sep 28, 2000)', at(98));
  }
  function e6(ctx, lt, dur, t) { // "In retrospect, this random testing was a mistake, and we regret it."
    const T0 = 103.55, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    K.doc(ctx, 560, 360, 640, 520, 'Statement', [], at(103.79), { titleSize: 44 });
    if (IMG.amazon && at(103.79) > .3) ctx.drawImage(IMG.amazon, 20, 120, 728, 260, 300, 120, 160, 57);
    if (at(105.43) > 0) { txt(ctx, '"In retrospect, this random', 560, 300, HAND(700, 44)); txt(ctx, 'testing was a mistake,', 560, 360, HAND(700, 44)); }
    if (at(108.07) > 0) txt(ctx, 'and we regret it."', 560, 430, HAND(700, 44), P.red);
    // the die goes in the bin
    sh(ctx, c => { c.moveTo(1010, 470); c.lineTo(1170, 470); c.lineTo(1150, 640); c.lineTo(1030, 640); c.closePath(); }, '#9aa3ad', 5);
    const k = clamp(at(107.17) / .7), dx = lerp(1300, 1090, k), dy = lerp(200, 470, k * k);
    if (k < 1) { ctx.save(); ctx.translate(dx, dy); ctx.rotate(k * 5); sh(ctx, c => c.roundRect(-34, -34, 68, 68, 12), '#fff', 5); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 7, 0, 7); ctx.fill(); ctx.restore(); }
    else txt(ctx, 'random testing', 1090, 690, HAND(700, 30), '#6a7380');
    K.source(ctx, 'Amazon statement via CNN Money (Sep 28, 2000)', at(104));
  }
  function e7(ctx, lt, dur, t) { // Jeff Bezos: "We've never tested and we never will test prices based on customer demographics."
    const T0 = 109.6, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffe1a8', '#fff7e6');
    bean(ctx, 300, 700, 1.15, t, Object.assign({}, BEZOS, { armR: [1.1, 1.2], face: { mouth: Math.sin(t * 8) > 0 ? 'smile' : 'o', brows: 'up', look: [.6, 0] } }));
    K.nameCard(ctx, 'Jeff Bezos', 'Amazon founder & CEO (2000)', 300, 110, at(109.6));
    popAt(ctx, 840, 360, at(111.05), () => { K.card(ctx, 560, 210, 600, 300, '#fff', 22); B.curve(ctx, [560, 400], [520, 420], [500, 380], 5);
      txt(ctx, '"We\'ve never tested', 860, 270, HAND(700, 46)); txt(ctx, 'and we never will test', 860, 330, HAND(700, 46)); txt(ctx, 'prices based on customer', 860, 390, HAND(700, 46)); txt(ctx, 'demographics."', 860, 450, HAND(700, 46), P.red); });
    K.source(ctx, 'Source: CNN Money (Sep 28, 2000)', at(110));
  }
  function e8(ctx, lt, dur, t) { // the internet already had this fight more than 25 years ago — and the customers won
    const T0 = 115.61, at = s => lt - (s - T0), won = at(119.91) > 0;
    K.bg.color(ctx, '#2f3a55');
    sh(ctx, c => c.rect(120, 470, 1040, 60), '#3b7dd8', 5); for (let r = 0; r < 3; r++) Tn.line(ctx, [[150, 300 + r * 50], [1130, 300 + r * 50]], 5, r === 1 ? '#fff' : P.red);
    for (const px of [150, 1130]) Tn.line(ctx, [[px, 470], [px, 280]], 10, '#c9ced6');
    // the dice robot vs the customers
    const rb = won ? lerp(0, 1, clamp(at(119.91) / .5)) : 0;
    ctx.save(); ctx.translate(880, 470); ctx.rotate(rb * 1.4); sh(ctx, c => c.roundRect(-70, -220, 140, 140, 20), '#fff', 6); for (const [a, b] of [[-30, -180], [30, -180], [0, -150], [-30, -120], [30, -120]]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(a, b, 9, 0, 7); ctx.fill(); }
    sh(ctx, c => c.rect(-50, -80, 100, 80), '#9aa3ad', 5); ctx.restore();
    for (let i = 0; i < 3; i++) bean(ctx, 330 + i * 110, 470 - (won ? Math.abs(Math.sin(t * 6 + i)) * 30 : 0), .62, t, Object.assign(Pr.extra(i + 1), { armR: won ? [2.7, 0] : [1.4, .6], armL: won ? [2.7, 0] : [.3, 1.2], face: { mouth: won ? 'grin' : 'flat', brows: won ? 'up' : 'angry', look: [.8, 0] } }));
    if (won) popAt(ctx, 440, 170, at(120.0), () => { sh(ctx, c => { c.moveTo(400, 120); c.lineTo(480, 120); c.quadraticCurveTo(480, 200, 440, 210); c.quadraticCurveTo(400, 200, 400, 120); }, P.yellow, 5); sh(ctx, c => c.rect(425, 210, 30, 30), P.yellow, 4); K.card(ctx, 540, 140, 260, 60, P.green, 14); txt(ctx, 'customers won', 670, 170, HAND(700, 36), '#fff'); });
    popAt(ctx, 640, 70, at(117.43), () => { K.card(ctx, 420, 30, 440, 80, P.yellow, 16); txt(ctx, '25+ years ago', 640, 70, HAND(700, 46)); });
  }
  function laptop(ctx, x, y, s, label, screen) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-180, -240, 360, 230, 12), '#3a3e46', 5); ctx.save(); ctx.beginPath(); ctx.rect(-166, -226, 332, 202); ctx.clip(); ctx.fillStyle = '#fff'; ctx.fillRect(-166, -226, 332, 202); ctx.translate(-166, -226); if (screen) screen(ctx, 332, 202); ctx.restore();
    sh(ctx, c => { c.moveTo(-210, 0); c.lineTo(210, 0); c.lineTo(190, -14); c.lineTo(-190, -14); c.closePath(); }, '#b9bec6', 4.5); if (label) { K.card(ctx, -70, 14, 140, 44, '#fff', 10); txt(ctx, label, 0, 37, PRINT(24)); } ctx.restore(); }
  function hotelRow(c, y, name, stars, fancy, w) { c.fillStyle = fancy ? '#fff3c4' : '#eef3f8'; c.beginPath(); c.roundRect(10, y, w - 20, 54, 8); c.fill(); txt(c, name, 24, y + 18, PRINT(18), INK, 'left'); txt(c, '★'.repeat(stars), 24, y + 40, PRINT(16), '#e0a21b', 'left'); txt(c, fancy ? '$$$' : '$', w - 24, y + 28, HAND(700, 26), fancy ? P.red : P.green, 'right'); }
  function e9(ctx, lt, dur, t) { // 2012, WSJ: Orbitz found Mac users spend as much as 30% more a night on hotels
    const T0 = 121.69, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e6f4ff');
    logoAt(ctx, 'orbitz', 640, 90, 260, at(124.3), { crop: [0, 180, 1200, 320], pad: 8 });
    popAt(ctx, 200, 90, at(121.97), () => { K.card(ctx, 110, 54, 180, 72, P.yellow, 14); txt(ctx, '2012', 200, 90, HAND(700, 46)); });
    bean(ctx, 260, 640, .85, t, Object.assign(Pr.extra(3), { face: { mouth: 'smile', look: [.4, .6] } })); laptop(ctx, 260, 640, .5, 'Mac');
    bean(ctx, 1020, 640, .85, t, Object.assign(Pr.extra(6), { face: { mouth: 'smile', look: [-.4, .6] } })); laptop(ctx, 1020, 640, .5, 'Windows');
    const g = out(clamp(at(127.47) / 1.0));
    [[560, 1.3, P.red, 'Mac users'], [720, 1, P.blue, 'Windows users']].forEach(([x, f, col, l]) => { const h = 220 * f * g; sh(ctx, c => c.rect(x - 50, 620 - h, 100, h), col, 4); if (g > .9) txt(ctx, l, x, 650, PRINT(20)); });
    if (g > .9) K.slam(ctx, 'up to 30% more', 640, 220, at(128.05), 50, P.red);
    if (at(128.34) > 0) txt(ctx, 'spent per hotel night (not a markup)', 640, 280, PRINT(22), '#4a4f57', 'center', clamp(at(128.34) / .3));
    K.source(ctx, 'Source: WSJ (Jun 2012), via Christian Science Monitor', at(123.3));
  }
  function e10(ctx, lt, dur, t) { // so Orbitz started showing Mac users different, sometimes more expensive hotel options
    const T0 = 129.88, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e6f4ff');
    laptop(ctx, 330, 520, 1.15, 'Mac', (c, w) => { hotelRow(c, 14, 'Grand Palace Hotel', 5, true, w); hotelRow(c, 76, 'Harbor Suites', 4, true, w); hotelRow(c, 138, 'Budget Inn', 2, false, w); });
    laptop(ctx, 950, 520, 1.15, 'Windows', (c, w) => { hotelRow(c, 14, 'Budget Inn', 2, false, w); hotelRow(c, 76, 'City Motel', 2, false, w); hotelRow(c, 138, 'Grand Palace Hotel', 5, true, w); });
    if (at(131.01) > 0) K.scribbleCircle(ctx, 330, 290, 200, 46, clamp(at(131.01) / .6), P.red, 6);
    popAt(ctx, 640, 100, at(132.42), () => { K.card(ctx, 380, 60, 520, 80, '#fff', 16); txt(ctx, 'sometimes pricier options first', 640, 100, HAND(700, 38)); });
    txt(ctx, 'hotel names: illustration', 1240, 700, PRINT(18), '#8a93a0', 'right');
  }
  function e11(ctx, lt, dur, t) { // Orbitz: not different prices for the same room; changing which hotels it showed first; you could still sort by price
    const T0 = 136.99, at = s => lt - (s - T0), sorted = at(145.15) > 0;
    K.bg.color(ctx, '#eef7ee');
    logoAt(ctx, 'orbitz', 200, 80, 200, at(137.16), { crop: [0, 180, 1200, 320], pad: 8 });
    popAt(ctx, 200, 150, at(137.3), () => txt(ctx, "Orbitz's response:", 200, 150, HAND(700, 34)));
    if (at(141.27) < 0) {
      // same room, same price
      [[420, 'Mac'], [860, 'Windows']].forEach(([x, l]) => popAt(ctx, x, 380, at(139.95), () => { sh(ctx, c => c.rect(x - 130, 280, 260, 180), '#fff', 5); sh(ctx, c => c.rect(x - 100, 380, 200, 50), '#8e6bd8', 4); sh(ctx, c => c.rect(x - 100, 350, 60, 40), '#fff', 3); txt(ctx, 'same room', x, 310, PRINT(24)); Pr.tag(ctx, x, 520, .9, 'same $', 1, { size: 30 }); txt(ctx, l, x, 640, PRINT(26)); }));
      if (at(140.25) > 0) txt(ctx, '=', 640, 400, HAND(700, 90), P.green);
    } else {
      // the list reorders; "sort by price" puts the cheapest first
      const rows = [['Grand Palace Hotel', 5, true], ['Harbor Suites', 4, true], ['Budget Inn', 2, false]], k = sorted ? out(clamp(at(145.15) / .6)) : 0;
      laptop(ctx, 640, 620, 1.6, null, (c, w) => { const ord = [0, 1, 2], tgt = [1, 2, 0]; rows.forEach((r, i) => hotelRow(c, 50 + lerp(ord[i], tgt[i], k) * 50, r[0], r[1], r[2], w));
        c.fillStyle = sorted ? '#0b7a3e' : '#eef1f4'; c.beginPath(); c.roundRect(w - 140, 8, 130, 32, 16); c.fill(); txt(c, 'Sort: price ▾', w - 75, 24, PRINT(16), sorted ? '#fff' : INK); });
      if (at(141.83) > 0) popAt(ctx, 1080, 200, at(141.83), () => { K.card(ctx, 930, 150, 300, 100, '#fff', 16); txt(ctx, 'just the order', 1080, 186, HAND(700, 36)); txt(ctx, 'shown first', 1080, 224, PRINT(22)); });
    }
    K.source(ctx, "Orbitz's statement, via WSJ / Christian Science Monitor", at(137.5));
  }
  function e12(ctx, lt, dur, t) { // Amazon in 2000 was random; Orbitz in 2012 used one fact; what about a thousand facts?
    const T0 = 146.02, at = s => lt - (s - T0), many = at(154.63) > 0;
    K.bg.studio(ctx, '#d9ccff', '#f4efff');
    if (!many) {
      host(ctx, 220, 700, 1.0, t, [[T0, 'present'], [147.8, 'pointSide'], [150.2, 'pointSide']], { mouth: 'flat', brows: 'up', look: [.6, 0] });
      popAt(ctx, 640, 330, at(147.8), () => { K.card(ctx, 500, 200, 280, 260, '#fff', 20); txt(ctx, '2000', 640, 240, HAND(700, 44), P.red); sh(ctx, c => c.roundRect(600, 290, 80, 80, 14), '#fff', 5); ctx.fillStyle = INK; for (const [a, b] of [[-20, -20], [20, 20], [0, 0]]) { ctx.beginPath(); ctx.arc(640 + a, 330 + b, 7, 0, 7); ctx.fill(); } txt(ctx, 'random', 640, 410, HAND(700, 34)); });
      popAt(ctx, 1000, 330, at(150.19), () => { K.card(ctx, 860, 200, 280, 260, '#fff', 20); txt(ctx, '2012', 1000, 240, HAND(700, 44), P.blue); laptop(ctx, 1000, 380, .3); txt(ctx, '1 fact: your computer', 1000, 410, PRINT(22)); });
      return;
    }
    // a thousand facts swirl around You
    bean(ctx, 640, 640, 1.0, t, Object.assign({}, Pr.YOU, { face: { mouth: 'o', brows: 'worried', look: [Math.sin(t * 2), -.3] } }));
    const F = ['age', 'ZIP', 'phone', 'past buys', 'cart', 'location', 'clicks', 'scroll', 'income?', 'time', 'device', 'browser'];
    const n = Math.floor(clamp(at(155.96) / 1.2) * 60) + 4;
    for (let i = 0; i < n; i++) { const a = i * 2.4 + t * (.4 + (i % 5) * .08), r = 180 + (i % 7) * 40; const x = 640 + Math.cos(a) * r * 1.6, y = 360 + Math.sin(a) * r * .8;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(a) * .3); sh(ctx, c => c.roundRect(-46, -16, 92, 32, 8), '#fff', 3); txt(ctx, F[i % F.length], 0, 1, PRINT(16)); ctx.restore(); }
    popAt(ctx, 640, 70, at(155.96), () => { K.card(ctx, 380, 30, 520, 80, P.yellow, 18); txt(ctx, 'a thousand facts about you?', 640, 70, HAND(700, 40)); });
  }

  // ================= CHAPTER 3 =================
  function ftcBuilding(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-300, -330); c.lineTo(0, -430); c.lineTo(300, -330); c.closePath(); }, '#eef0f4', 5); sh(ctx, c => c.rect(-300, -330, 600, 30), '#dfe3ea', 5);
    for (let i = 0; i < 6; i++) sh(ctx, c => c.rect(-270 + i * 104, -300, 40, 270), '#f6f7f9', 4); sh(ctx, c => c.rect(-320, -30, 640, 30), '#dfe3ea', 5);
    if (IMG.ftc) ctx.drawImage(IMG.ftc, -40, -418, 80, 80); ctx.restore(); }
  function f1(ctx, lt, dur, t) { // July 2024: the FTC ordered eight companies to hand over information
    const T0 = 157.81, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    ftcBuilding(ctx, 950, 600, 1.0);
    const n = Math.min(8, Math.floor(clamp(at(160.2) / 2.4) * 8) + (at(160.2) > 0 ? 1 : 0));
    for (let i = 0; i < 8; i++) { const k = at(160.2 + i * .3); if (k <= 0) continue; const x = lerp(-60, 640 - i * 76, out(clamp(k / 1.2)));
      const p = bean(ctx, x, 690, .5, t, Object.assign(Pr.extra(i), { body: '#2f3a55', top: 'suit', armR: [.9, 1.5], armL: [.9, 1.5], face: { mouth: 'flat', look: [.9, 0] } }));
      sh(ctx, c => c.rect(p.hands.R[0] - 10, p.hands.R[1] - 46, 56, 48), '#d9b98a', 3); }
    if (at(158.29) > 0) popAt(ctx, 230, 90, at(158.29), () => { K.card(ctx, 90, 54, 280, 72, P.yellow, 16); txt(ctx, 'July 2024', 230, 90, HAND(700, 44)); });
    if (n > 0) popAt(ctx, 460, 220, at(160.78), () => { K.card(ctx, 330, 160, 260, 120, '#fff', 18); txt(ctx, n, 460, 205, HAND(700, 64), P.blue); txt(ctx, 'companies', 460, 255, PRINT(24)); });
    chapterTab(ctx, 3, 'What the government found', lt, 4.0);
    K.source(ctx, 'Source: FTC 6(b) study, via McCarter & English (Feb 2025)', at(161));
  }
  function f2(ctx, lt, dur, t) { // these weren't stores — they were the middlemen, the firms that sell pricing technology to stores
    const T0 = 163.42, at = s => lt - (s - T0);
    K.bg.cream(ctx); ctx.fillStyle = '#d9d2c4'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    Pr.store(ctx, 280, 600, .7, 'STORE', { trim: P.blue, awning: P.blue });
    if (at(163.93) > 0) K.cross(ctx, 280, 400, 260, clamp(at(163.93) / .4));
    Pr.store(ctx, 1040, 600, .7, 'STORE', { trim: P.green, awning: P.green });
    // the middleman's stall in the middle
    popAt(ctx, 660, 600, at(165.57), () => { sh(ctx, c => c.rect(520, 440, 280, 160), '#c98f5a', 5); sh(ctx, c => { c.moveTo(500, 440); c.lineTo(820, 440); c.lineTo(800, 400); c.lineTo(520, 400); c.closePath(); }, P.purple, 5);
      bean(ctx, 660, 470, .5, t, Object.assign(Pr.extra(5), { top: 'suit', body: '#2f3a55', face: { mouth: 'smile', look: [.8, 0] } })); sh(ctx, c => c.rect(520, 440, 280, 160), '#c98f5a', 5); txt(ctx, 'PRICING TECH', 660, 500, PRINT(26), '#fff'); txt(ctx, 'for sale', 660, 545, HAND(700, 30), '#fff'); K.card(ctx, 560, 250, 200, 56, '#fff', 14); txt(ctx, 'middlemen', 660, 278, HAND(700, 34)); });
    if (at(167.48) > 0) { const k = (at(167.48) % 1.5) / 1.5; ctx.save(); ctx.translate(lerp(800, 960, k), 470 - Math.sin(k * Math.PI) * 80); sh(ctx, c => c.rect(-26, -22, 52, 44), '#fff', 4); txt(ctx, '$?', 0, 0, HAND(700, 26), P.purple); ctx.restore(); K.arrow(ctx, [820, 560], [930, 560], clamp(at(167.48) / .4), P.purple, 6); }
    popAt(ctx, 280, 110, at(163.42), () => { K.card(ctx, 150, 74, 260, 72, '#fff', 16); txt(ctx, 'not stores', 280, 110, HAND(700, 40)); });
  }
  function f3(ctx, lt, dur, t) { // "surveillance pricing": "adjust the prices of goods and services for individual consumers," using data about them
    const T0 = 169.93, at = s => lt - (s - T0);
    K.bg.color(ctx, '#edf0f6'); ctx.fillStyle = '#d4dbe8'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    popAt(ctx, 640, 90, at(171.56), () => { K.card(ctx, 340, 44, 600, 92, '#1f1c1a', 18, 0); txt(ctx, 'SURVEILLANCE PRICING', 640, 90, HAND(700, 50), P.yellow); });
    if (IMG.ftc) K.logo(ctx, 'ftc', 220, 90, 80, at(170.12), { card: false });
    // a camera above the shelf; the tag changes for each shopper passing by
    Tn.line(ctx, [[640, 160], [640, 210]], 6, INK); sh(ctx, c => c.roundRect(590, 210, 100, 50, 10), '#4a4e56', 4); sh(ctx, c => c.arc(640, 262, 14, 0, 7), '#9ad1ff', 3);
    const who = Math.floor(clamp(at(175.26), 0, 99) / 1.4) % 3, cols = ['#d8f5d0', '#fff3c4', '#ffd6d0'], labels = ['$', '$$', '$$$'];
    ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = P.yellow; ctx.beginPath(); ctx.moveTo(620, 270); ctx.lineTo(660, 270); ctx.lineTo(380 + who * 260 + 100, 600); ctx.lineTo(380 + who * 260 - 100, 600); ctx.closePath(); ctx.fill(); ctx.restore();
    for (let i = 0; i < 3; i++) bean(ctx, 380 + i * 260, 690, .7, t, Object.assign(Pr.extra(i + 2), { face: { mouth: i === who ? 'o' : 'flat', look: [0, -.6] } }));
    sh(ctx, c => c.rect(860, 300, 300, 18), '#d9d4c8', 4); Pr.eggs(ctx, 1010, 300, .6);
    if (at(175.26) > 0) Pr.tag(ctx, 1010, 360, 1, labels[who], 1, { color: cols[who] });
    if (at(174.38) > 0) popAt(ctx, 330, 300, at(174.38), () => { K.card(ctx, 70, 200, 520, 200, '#fff', 18); txt(ctx, '"adjust the prices of', 330, 250, HAND(700, 36)); txt(ctx, 'goods and services for', 330, 295, HAND(700, 36)); txt(ctx, 'individual consumers"', 330, 340, HAND(700, 36), P.red); txt(ctx, '— FTC', 330, 380, PRINT(20), '#6a7380'); });
  }
  function f4(ctx, lt, dur, t) { // on January 17, 2025, the FTC released its first findings
    const T0 = 180.99, at = s => lt - (s - T0);
    K.bg.cream(ctx); Pr.table(ctx, 600, '#c98f5a');
    Pr.calendar(ctx, 280, 600, 1.0, 'JAN 2025', '17', { bigSize: 110, head: P.blue });
    const dk = clamp(at(184.68) / .5), y = lerp(-300, 340, out(dk));
    if (at(184.68) > 0) K.doc(ctx, 820, y, 520, 440, 'Surveillance Pricing 6(b) Study', ['Research summaries', 'preliminary findings', '—', '—', '—'], 1, { rot: -.03, titleSize: 40, lineSize: 28 });
    if (IMG.ftc && dk >= 1) ctx.drawImage(IMG.ftc, 1000, 140, 70, 70);
    K.stamp(ctx, 'FIRST FINDINGS', 820, 590, at(185.54), { color: P.red, size: 46, rot: -.05 });
  }
  const DATA = [['location', 193.33], ['device & browser', 194.73], ['age & gender', 196.77], ['what you bought', 198.69], ['left in your cart', 200.51], ['mouse moves', 204.2], ['how far you scroll', 205.72]];
  function f5(ctx, lt, dur, t) { // what these tools can use (via McCarter & English)
    const T0 = 186.94, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e9f0ff');
    popAt(ctx, 640, 60, at(187.52), () => { K.card(ctx, 340, 24, 600, 72, '#fff', 16); txt(ctx, 'what these tools can use', 640, 60, HAND(700, 40)); });
    // the pricing machine on the right: data goes in, a tag comes out
    sh(ctx, c => c.roundRect(940, 260, 260, 260, 26), '#6c7a8f', 6); sh(ctx, c => { c.moveTo(900, 180); c.lineTo(1000, 260); c.lineTo(1140, 260); c.lineTo(1240, 180); c.closePath(); }, '#9aa6b8', 5); txt(ctx, 'PRICING', 1070, 360, PRINT(32), '#fff'); txt(ctx, 'ENGINE', 1070, 400, PRINT(32), '#fff');
    for (let i = 0; i < 3; i++) sh(ctx, c => c.arc(1000 + i * 60, 470, 12, 0, 7), [P.red, P.yellow, P.green][(i + Math.floor(t * 3)) % 3], 3);
    const you = bean(ctx, 230, 690, 1.0, t, Object.assign({}, Pr.YOU, { armR: [.9, 1.4], face: { mouth: 'flat', brows: at(204.2) > 0 ? 'worried' : 'up', look: [.9, -.2] } }));
    // a phone in hand with a cursor + scroll bar for the micro-interactions
    sh(ctx, c => c.roundRect(you.hands.R[0] - 10, you.hands.R[1] - 90, 60, 100, 8), '#24272e', 3);
    DATA.forEach(([l, s], i) => { const k = at(s); if (k <= 0) return; const col = i % 2 ? '#fff' : '#fff7d6', fy = 150 + i * 62, fl = clamp((k - 1.2) / .9);
      const x = lerp(560, 1070, inout(fl)), y = lerp(fy, 230, inout(fl)), s2 = lerp(1, .3, fl);
      if (fl < 1) popAt(ctx, x, y, k, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s2, s2); ctx.font = HAND(700, 34); const w = ctx.measureText(l).width + 40; K.card(ctx, -w / 2, -24, w, 48, col, 14); txt(ctx, l, 0, 0, HAND(700, 34)); ctx.restore(); });
      txt(ctx, '✓ ' + l, 560, 150 + i * 62, PRINT(24), '#9aa3ad', 'center', fl); });
    if (at(203.95) > 0) { const k = at(203.95); const cx = 400 + Math.sin(k * 3) * 60, cy = 560 + Math.cos(k * 4) * 40; sh(ctx, c => { c.moveTo(cx, cy); c.lineTo(cx, cy + 34); c.lineTo(cx + 9, cy + 26); c.lineTo(cx + 18, cy + 40); c.lineTo(cx + 24, cy + 36); c.lineTo(cx + 15, cy + 23); c.lineTo(cx + 26, cy + 22); c.closePath(); }, '#fff', 3); }
    if (at(205.72) > 0) { sh(ctx, c => c.roundRect(470, 470, 16, 200, 8), '#d6dbe1', 2); sh(ctx, c => c.roundRect(470, 470 + ((at(205.72) * 80) % 150), 16, 50, 8), P.blue, 2); }
    if (at(198.0) > 0) Pr.tag(ctx, 1070, 560, .9, '$?', at(198.0), { color: '#fff3c4' });
    K.source(ctx, "FTC preliminary findings, via McCarter & English (Feb 6, 2025)", at(188));
  }
  function babyBundle(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.ellipse(0, 0, 48, 30, -.3, 0, 7), '#bfe6ff', 4); B.head(ctx, -26, -14, 22, { skin: B.SKIN, hair: 'none', face: { mouth: 'flat', eyes: .2 } }); ctx.restore(); }
  function f6(ctx, lt, dur, t) { // the FTC's hypothetical: a new parent, a sick baby, a premium-priced thermometer
    const T0 = 207.48, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff1f4');
    popAt(ctx, 640, 60, at(209.1), () => { K.card(ctx, 380, 24, 520, 72, P.purple, 16); txt(ctx, "the FTC's hypothetical", 640, 60, HAND(700, 40), '#fff'); });
    const par = bean(ctx, 300, 690, 1.05, t, Object.assign({}, Pr.YOU, { armL: [.9, 1.5], armR: [.7, 1.6], face: { mouth: at(217.09) > 0 ? 'frown' : 'smile', brows: at(217.09) > 0 ? 'worried' : 'calm', look: [.8, .2] } }));
    babyBundle(ctx, par.hands.L[0] + 40, par.hands.L[1] - 20, 1);
    if (at(217.09) > 0) { for (let i = 0; i < 3; i++) { const k = (t + i * .3) % 1; ctx.fillStyle = `rgba(230,80,60,${1 - k})`; ctx.beginPath(); ctx.arc(par.hands.L[0] + 20 + i * 14, par.hands.L[1] - 60 - k * 30, 5, 0, 7); ctx.fill(); } }
    // the cart of baby things on the left of the phone
    if (at(213.12) > 0) popAt(ctx, 560, 560, at(213.12), () => { sh(ctx, c => { c.moveTo(470, 480); c.lineTo(650, 480); c.lineTo(630, 560); c.lineTo(490, 560); c.closePath(); }, '#e9edf1', 5); sh(ctx, c => c.roundRect(490, 430, 50, 60, 6), P.pink, 3); sh(ctx, c => c.roundRect(550, 420, 30, 70, 10), '#fff', 3); sh(ctx, c => c.roundRect(590, 440, 40, 50, 6), '#bfe6ff', 3); for (const wx of [510, 610]) sh(ctx, c => c.arc(wx, 580, 12, 0, 7), INK, 0); txt(ctx, 'baby stuff', 560, 630, PRINT(24)); });
    Pr.phone(ctx, 930, 380, .95, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      if (at(215.22) > 0) { c.fillStyle = '#eef1f4'; c.beginPath(); c.roundRect(16, 20, w - 32, 50, 25); c.fill(); txt(c, '🔍 baby fever?', 36, 46, PRINT(20), INK, 'left'); for (let i = 0; i < 3; i++) { c.fillStyle = '#e3e7ec'; c.fillRect(20, 96 + i * 34, w - 60 - i * 30, 14); } }
      if (at(218.4) > 0) { const k = back(clamp(at(218.4) / .35)); c.save(); c.translate(w / 2, 330); c.scale(k, k); c.fillStyle = '#fff3c4'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(-118, -110, 236, 230, 16); c.fill(); c.stroke();
        txt(c, 'FAST DELIVERY', 0, -80, PRINT(22), P.red); c.fillStyle = '#fff'; c.beginPath(); c.roundRect(-14, -56, 28, 90, 14); c.fill(); c.stroke(); c.fillStyle = P.red; c.fillRect(-6, 0, 12, 30); txt(c, 'baby thermometer', 0, 56, PRINT(20)); txt(c, 'PREMIUM PRICE', 0, 92, HAND(700, 30), P.red); c.restore(); } });
    txt(ctx, 'a hypothetical, not a real case', 1060, 700, PRINT(18), '#8a93a0', 'center');
  }
  function f7(ctx, lt, dur, t) { // the nightmare version: a company that knows you're desperate, and prices for it
    const T0 = 221.91, at = s => lt - (s - T0);
    ctx.fillStyle = '#26203a'; ctx.fillRect(0, 0, W, H);
    const grow = out(clamp(lt / 3.0));
    ctx.save(); ctx.translate(820, 340); ctx.scale(lerp(.6, 1.15, grow), lerp(.6, 1.15, grow)); Pr.tag(ctx, 0, -40, 3, '$$$$', 1, { color: '#ffd6d0' }); ctx.restore();
    ctx.save(); ctx.translate(820, 300); sh(ctx, c => { c.moveTo(-90, 0); c.quadraticCurveTo(0, -70, 90, 0); c.quadraticCurveTo(0, 70, -90, 0); }, '#fff', 5); sh(ctx, c => c.arc(Math.sin(t) * 20 - 30, 0, 26, 0, 7), P.red, 4); ctx.restore();
    const par = bean(ctx, 300, 700, 1.0, t, Object.assign({}, Pr.YOU, { armL: [.9, 1.5], face: { mouth: 'frown', brows: 'worried', look: [.9, -.4], tears: t * .8 } }));
    babyBundle(ctx, par.hands.L[0] + 40, par.hands.L[1] - 20, 1);
    popAt(ctx, 300, 90, at(222.21), () => { K.card(ctx, 110, 54, 380, 72, P.red, 16); txt(ctx, 'the nightmare version', 300, 90, HAND(700, 38), '#fff'); });
    if (at(224.49) > 0) txt(ctx, 'knows you\'re desperate…', 820, 620, HAND(700, 44), '#fff', 'center', clamp(at(224.49) / .3));
  }
  function f8(ctx, lt, dur, t) { // to be fair: info-gathering, not an accusation; released in a 3–2 party-line vote
    const T0 = 226.65, at = s => lt - (s - T0), vote = at(233.6) > 0;
    K.bg.white(ctx);
    if (!vote) {
      popAt(ctx, 640, 90, at(226.86), () => { K.card(ctx, 470, 54, 340, 72, P.yellow, 16); txt(ctx, 'to be fair…', 640, 90, HAND(700, 42)); });
      K.doc(ctx, 640, 380, 440, 380, 'FTC study', ['purpose:', 'gather information', '—', '—'], at(228.91), { lineSize: 30 });
      K.stamp(ctx, 'NOT AN ACCUSATION', 640, 560, at(230.86), { color: P.green, size: 50, rot: -.06 });
      return;
    }
    // the vote board
    popAt(ctx, 640, 90, at(233.6), () => { K.card(ctx, 420, 54, 440, 72, '#fff', 16); txt(ctx, 'released in a 3–2 vote', 640, 90, HAND(700, 40)); });
    [[400, 3, P.blue, 'Democrats', 'YES'], [880, 2, P.red, 'Republicans', 'NO']].forEach(([x, n, col, l, v], g) => {
      for (let i = 0; i < n; i++) { const k = at(234.58 + g * .4 + i * .15); if (k <= 0) continue; const hx = x - (n - 1) * 70 + i * 140;
        bean(ctx, hx, 600, .6, t, Object.assign(Pr.extra(i + g * 3), { body: col, top: 'suit', armR: g ? [.3, .2] : [2.6, 0], face: { mouth: 'flat', look: [0, 0] } })); }
      if (at(235.5) > 0) { txt(ctx, l, x, 650, PRINT(28), col); txt(ctx, String(n), x, 230, HAND(700, 100), col); } });
    if (at(235.5) > 0) txt(ctx, 'along party lines', 640, 700, PRINT(22), '#6a7380');
  }
  function f9(ctx, lt, dur, t) { // Ferguson and Holyoak objected: the outgoing majority was "slowly dripping out information"
    const T0 = 237.42, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffe1c8', '#fff6ee');
    bean(ctx, 230, 700, 1.0, t, Object.assign({}, FERGUSON, { armR: at(241.74) > 0 ? [2.0, .3] : [.2, .2], face: { mouth: 'frown', brows: 'angry', look: [.6, 0] } }));
    bean(ctx, 520, 700, 1.0, t, Object.assign({}, HOLYOAK, { armL: at(241.74) > 0 ? [2.0, .3] : [.2, .2], face: { mouth: 'frown', brows: 'angry', look: [.6, 0] } }));
    K.nameCard(ctx, 'Andrew Ferguson', 'FTC commissioner (R)', 230, 110, at(239.24));
    K.nameCard(ctx, 'Melissa Holyoak', 'FTC commissioner (R)', 560, 230, at(240.37));
    if (at(241.74) > 0) popAt(ctx, 380, 500, at(241.74), () => { K.card(ctx, 290, 470, 180, 56, P.red, 12); txt(ctx, 'objected', 380, 498, HAND(700, 32), '#fff'); });
    // the dripping faucet of "info"
    sh(ctx, c => { c.moveTo(820, 200); c.lineTo(1040, 200); c.lineTo(1040, 250); c.lineTo(1000, 250); c.lineTo(1000, 290); c.lineTo(960, 290); c.lineTo(960, 250); c.lineTo(820, 250); c.closePath(); }, '#c9ced6', 5);
    sh(ctx, c => c.roundRect(880, 160, 40, 40, 6), '#9aa3ad', 4);
    if (at(246.98) > 0) for (let i = 0; i < 3; i++) { const k = ((at(246.98) + i * .6) % 1.8) / 1.8; ctx.save(); ctx.translate(980, 300 + k * 300); sh(ctx, c => { c.moveTo(0, -26); c.quadraticCurveTo(22, 4, 0, 18); c.quadraticCurveTo(-22, 4, 0, -26); }, '#7fc4f0', 3); txt(ctx, 'info', 0, 2, PRINT(14), '#1f4f7a'); ctx.restore(); }
    sh(ctx, c => c.ellipse(980, 640, 110, 22, 0, 0, 7), '#bfe6ff', 4);
    if (at(246.98) > 0) popAt(ctx, 980, 100, at(246.98), () => { K.card(ctx, 760, 56, 440, 88, '#fff', 16); txt(ctx, '"slowly dripping out', 980, 86, HAND(700, 34)); txt(ctx, 'information"', 980, 122, HAND(700, 34)); });
    if (at(249.08) > 0) txt(ctx, '…instead of a proper report', 980, 690, PRINT(22), '#6a5a48', 'center', clamp(at(249.08) / .3));
    K.source(ctx, 'Source: McCarter & English (Feb 6, 2025)', at(245));
  }
  function f10(ctx, lt, dur, t) { // things changed fast: days later, Ferguson became FTC chair
    const T0 = 251.51, at = s => lt - (s - T0), sit = clamp(at(254.75) / .8);
    K.bg.color(ctx, '#e6eefc'); ctx.fillStyle = '#c9d1de'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    // big chair
    sh(ctx, c => c.roundRect(700, 220, 260, 300, 30), '#7a2e2e', 6); sh(ctx, c => c.roundRect(680, 470, 300, 70, 20), '#933838', 6); for (const lx of [720, 940]) Tn.line(ctx, [[lx, 540], [lx, 600]], 10, INK);
    K.card(ctx, 760, 250, 140, 50, P.yellow, 10); txt(ctx, 'CHAIR', 830, 275, PRINT(28));
    const x = lerp(300, 830, inout(sit)), y = lerp(690, 540, inout(sit));
    bean(ctx, x, y, 1.0, t, Object.assign({}, FERGUSON, { armR: sit >= 1 ? [2.4, .3] : [.3, .3], face: { mouth: 'smile', brows: 'up', look: [-.3, 0] } }));
    if (sit >= 1) sh(ctx, c => c.roundRect(680, 470, 300, 70, 20), '#933838', 6);
    popAt(ctx, 300, 110, at(251.79), () => { K.card(ctx, 120, 74, 360, 72, P.red, 16); txt(ctx, 'things changed fast', 300, 110, HAND(700, 38), '#fff'); });
    K.nameCard(ctx, 'Andrew Ferguson', 'FTC chair', 1100, 150, at(255.16));
    if (at(253.75) > 0) txt(ctx, 'days later', 300, 190, HAND(700, 36), INK, 'center', clamp(at(253.75) / .3));
  }
  function f11(ctx, lt, dur, t) { // the public comment period — meant to stay open until April — was shut down within a week
    const T0 = 257.16, at = s => lt - (s - T0), shut = clamp(at(264.78) / .25);
    K.bg.cream(ctx);
    sh(ctx, c => c.roundRect(360, 200, 420, 400, 20), P.blue, 6); txt(ctx, 'PUBLIC COMMENTS', 570, 250, PRINT(30), '#fff'); sh(ctx, c => c.roundRect(430, 320, 280, 26, 10), INK, 0);
    for (let i = 0; i < 3; i++) { const k = ((at(259.45) + i * .5) % 1.5) / 1.5; if (at(259.45) > 0 && shut < 1) K.envelope(ctx, lerp(150, 570, k), lerp(240, 330, k), .8, 0, { stampC: P.red }); }
    if (shut > 0) { sh(ctx, c => c.rect(360, 200, 420, 400 * shut), '#9aa3ad', 6); for (let y = 230; y < 200 + 400 * shut; y += 40) Tn.line(ctx, [[370, y], [770, y]], 4, '#7a8088'); }
    Pr.calendar(ctx, 1040, 440, .9, 'OPEN UNTIL', 'Apr 17', { bigSize: 56, head: P.green });
    if (at(264.03) > 0) K.cross(ctx, 1040, 340, 130, clamp(at(264.03) / .4));
    txt(ctx, 'comment period', 1040, 480, PRINT(24), INK, 'center', clamp(at(261.7) / .3));
    if (at(257.59) > 0) popAt(ctx, 1040, 110, at(257.59), () => { K.card(ctx, 870, 74, 340, 72, P.yellow, 16); txt(ctx, 'within a week', 1040, 110, HAND(700, 40)); });
    if (shut >= 1) K.stamp(ctx, 'SHUT DOWN', 570, 400, at(264.9), { color: P.red, size: 60, rot: -.08 });
    K.headline(ctx, 220, 640, 420, 'Retail Brew · Jan 24, 2025', 'New FTC chair shuts down public comment…', at(258.6), { size: 22, rot: -.02 });
  }
  function f12(ctx, lt, dur, t) { // by early 2025 the federal investigation looked basically dead — it wasn't
    const T0 = 265.9, at = s => lt - (s - T0), alive = at(271.91) > 0;
    K.bg.color(ctx, alive ? '#e8fbe9' : '#e9ecf1');
    K.doc(ctx, 330, 380, 380, 440, 'FTC', ['surveillance', 'pricing', 'probe', '—', '—'], 1, { lineSize: 34, rot: -.03 });
    // heart monitor
    sh(ctx, c => c.roundRect(620, 200, 560, 340, 24), '#1f2630', 6);
    ctx.save(); ctx.beginPath(); ctx.rect(640, 220, 520, 300); ctx.clip(); ctx.beginPath(); ctx.strokeStyle = alive ? '#4ef08a' : '#ff6b5e'; ctx.lineWidth = 5;
    for (let x = 0; x <= 520; x += 4) { const tt = lt * 160 - x, beat = !alive ? (lt < 2 ? Math.max(0, Math.sin(tt / 24)) ** 8 * 90 : 0) : Math.max(0, Math.sin(tt / 20)) ** 10 * 120; const y = 370 - beat; x ? ctx.lineTo(640 + x, y) : ctx.moveTo(640, y); } ctx.stroke(); ctx.restore();
    if (at(271.23) > 0 && !alive) txt(ctx, 'basically dead?', 900, 600, HAND(700, 44), P.red);
    if (alive) K.slam(ctx, "It wasn't.", 900, 610, at(271.91), 76, P.green);
    popAt(ctx, 330, 90, at(266.31), () => { K.card(ctx, 170, 54, 320, 72, '#fff', 16); txt(ctx, 'early 2025', 330, 90, HAND(700, 42)); });
  }

  const SH = [[0, 5.18, d1], [5.18, 9.29, d2], [9.29, 16.87, d3], [16.87, 22.93, d4], [22.93, 34.89, d5], [34.89, 39.11, d6], [39.11, 50.5, d7], [50.5, 57.46, d8], [57.46, 61.4, d9], [61.4, 65.05, d10], [65.05, 67.89, d11], [67.89, 73.37, d12],
    [73.37, 80.51, e1], [80.51, 84.12, e2], [84.12, 90.03, e3], [90.03, 96.09, e4], [96.09, 103.55, e5], [103.55, 109.6, e6], [109.6, 115.61, e7], [115.61, 121.69, e8], [121.69, 129.88, e9], [129.88, 136.99, e10], [136.99, 146.02, e11], [146.02, 157.81, e12],
    [157.81, 163.42, f1], [163.42, 169.93, f2], [169.93, 180.99, f3], [180.99, 186.94, f4], [186.94, 207.48, f5], [207.48, 221.91, f6], [221.91, 226.65, f7], [226.65, 237.42, f8], [237.42, 251.51, f9], [251.51, 257.16, f10], [257.16, 265.9, f11], [265.9, 272.72, f12]];
  const DUR = 272.72;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [2.0, 7.66, 14.83, 17.37, 18.79, 19.0, 25.29, 28.13, 30.4, 36.27, 40.42, 40.62, 40.82, 57.6, 60.24, 62.44, 65.4, 69.5, 71.61, 72.0, 73.77, 80.51, 85.34, 90.65, 91.95, 93.25, 99.19, 101.14, 103.79, 109.6, 111.05, 117.43, 120.0, 121.97, 124.3,
    132.42, 137.16, 139.95, 141.83, 147.8, 150.19, 155.96, 158.29, 160.78, 163.42, 165.57, 171.56, 174.38, 187.52, 193.33, 194.73, 196.77, 198.69, 200.51, 204.2, 205.72, 209.1, 213.12, 218.4, 222.21, 226.86, 233.6, 239.24, 240.37, 241.74, 246.98, 251.79, 255.16, 257.59, 266.31]
    .map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[.59, 'stamp'], [3.42, 'cash'], [3.8, 'thud'], [11.11, 'ding'], [12.64, 'buzz'], [20.6, 'swoosh'], [37.9, 'buzz'], [47.1, 'ding'], [55.27, 'buzz'], [63.6, 'ding'], [66.62, 'stamp'], [77.32, 'boing'], [78.86, 'thud'], [94.63, 'stamp'], [98.39, 'mail'], [99.0, 'mail'], [107.6, 'thud'],
    [119.91, 'boing'], [120.0, 'ding'], [128.05, 'thud'], [131.01, 'swoosh'], [140.25, 'ding'], [145.15, 'click'], [160.2, 'paper'], [163.93, 'buzz'], [167.48, 'swoosh'], [175.26, 'tick'], [176.66, 'tick'], [178.06, 'tick'], [184.68, 'paper'], [185.54, 'stamp'],
    [198.0, 'ding'], [215.22, 'type'], [218.4, 'cash'], [221.91, 'rise'], [230.86, 'stamp'], [234.58, 'tick'], [234.98, 'tick'], [254.75, 'thud'], [264.03, 'buzz'], [264.78, 'thud'], [264.9, 'stamp'], [271.91, 'ding']].map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/pricing-2.mp3', shots,
    sfx: cuts.concat(pops, hits), musicGain: .25,
    moods: [{ t: 0, mood: 'pop' }, { t: 221.91, mood: 'soft' }, { t: 237.42, mood: 'pop' }],
    images: { instacart: 'assets/pricing/instacart.png', eversight: 'assets/pricing/eversight.png', gw: 'assets/pricing/groundwork-collaborative.png', amazon: 'assets/pricing/amazon.png', orbitz: 'assets/pricing/orbitz.png', ftc: 'assets/pricing/ftc-seal.png' },
    fonts: G.BizFont.load };
})(window);
