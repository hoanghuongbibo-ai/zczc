/* "Your Price Isn't My Price" — part 1: COLD OPEN + SETUP (voice: assets/audio/pricing-1.mp3).
 * Shot plan: biz/PLAN-pricing-1.md. Shot times are the narration's word times (pocketsphinx transcript). */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Ch = G.Charts, I = G.Icons, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popK, popAt, tween } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const drift = (lt, dur, z0 = 1, z1 = 1.05) => lerp(z0, z1, inout(clamp(lt / dur)));
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const INSTA = [18, 18, 1164, 592];                                   // crop of the supplied Instacart card

  // ================= COLD OPEN =================
  function laptop(ctx, x, y, s, open, screen) { // base centre (x, y); open 0..1 lifts the lid
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-210, 0); c.lineTo(210, 0); c.lineTo(190, -22); c.lineTo(-190, -22); c.closePath(); }, '#b9bec6', 4.5);
    const lh = 250 * Math.max(.04, open);
    sh(ctx, c => c.roundRect(-185, -22 - lh, 370, lh, 12), '#3a3e46', 4.5);
    if (open > .3) { ctx.save(); ctx.beginPath(); ctx.rect(-170, -22 - lh + 12, 340, lh - 24); ctx.clip(); ctx.globalAlpha = clamp((open - .3) / .4);
      ctx.fillStyle = '#eaf3ff'; ctx.fillRect(-170, -22 - lh + 12, 340, lh - 24); if (screen) { ctx.translate(-170, -22 - lh + 12); screen(ctx, 340, lh - 24); } ctx.restore(); }
    ctx.restore();
  }
  // the video-call grid (8 × 5 = 40 tiles + a "+" tile row marker); n = tiles shown, phones 0..1 lifts a phone in every tile
  const TILE_BG = ['#ffd7a8', '#cfe9ff', '#d8f2c9', '#f8d3e1', '#e6dcff', '#fff0b3', '#c9f0ea', '#ffe0cc'];
  function callGrid(ctx, x0, y0, w, h, n, t, o = {}) {
    const cols = 8, rows = 5, g = 8, tw = (w - g * (cols + 1)) / cols, th = (h - g * (rows + 1)) / rows;
    ctx.fillStyle = '#2a2d35'; ctx.fillRect(x0, y0, w, h);
    for (let i = 0; i < cols * rows; i++) {
      const cx = x0 + g + (i % cols) * (tw + g), cy = y0 + g + Math.floor(i / cols) * (th + g), k = clamp(n - i);
      if (k <= 0) continue;
      ctx.save(); ctx.translate(cx + tw / 2, cy + th / 2); const sc = back(k); ctx.scale(sc, sc); ctx.translate(-tw / 2, -th / 2);
      ctx.beginPath(); ctx.roundRect(0, 0, tw, th, 8); ctx.fillStyle = TILE_BG[(i * 3) % 8]; ctx.fill(); ctx.save(); ctx.clip();
      const r = th * .3, lean = (o.lean || 0) * th * .06, bob = Math.sin(t * 1.7 + i) * 1.5, ex = Pr.extra(i);
      sh(ctx, c => c.ellipse(tw / 2, th + r * .35, r * 1.35, r * 1.1, 0, Math.PI, 0), ex.body, 3);
      B.head(ctx, tw / 2, th * .5 + bob + lean, r, Object.assign({}, ex, { face: { mouth: o.mouth || 'flat', look: o.look || [0, 0], brows: o.brows || 'calm' } }));
      if (o.phones > 0) { const pk = clamp(o.phones * 1.6 - (i % 7) * .08), py = lerp(th + 30, th * .56, out(pk));
        sh(ctx, c => c.roundRect(tw / 2 - r * .5, py, r, r * 1.3, 5), '#23262d', 2.5); sh(ctx, c => c.roundRect(tw / 2 - r * .38, py + r * .12, r * .76, r * 1.0, 3), '#0b7a3e', 0);
        sh(ctx, c => c.arc(tw / 2 - r * .45, py + r * .55, r * .14, 0, 7), ex.skin === 'white' ? '#fff' : ex.skin, 2); sh(ctx, c => c.arc(tw / 2 + r * .45, py + r * .55, r * .14, 0, 7), '#fff', 2); }
      ctx.restore(); sh(ctx, c => c.roundRect(0, 0, tw, th, 8), null, 2.5, '#15171c');
      ctx.restore();
    }
  }
  function callWindow(ctx, n, t, o = {}) { // full-frame app window around the grid
    K.bg.color(ctx, '#1b1d23');
    sh(ctx, c => c.roundRect(40, 24, 1200, 56, 14), '#2f333c', 0);
    for (const [i, col] of [[0, '#ff5f57'], [1, '#febc2e'], [2, '#28c840']]) sh(ctx, c => c.arc(72 + i * 26, 52, 8, 0, 7), col, 0);
    txt(ctx, 'Video call', 170, 53, PRINT(26), '#e8eaf0', 'left');
    const cnt = Math.min(40, Math.floor(n)); txt(ctx, (cnt >= 40 ? '40+' : cnt) + ' participants', 1210, 53, PRINT(26), '#9ad1ff', 'right');
    callGrid(ctx, 40, 92, 1200, 548, n, t, o);
    sh(ctx, c => c.roundRect(470, 652, 340, 54, 27), '#2f333c', 0);
    [[540, '#3d4250'], [610, '#3d4250'], [680, '#e5484d'], [750, '#3d4250']].forEach(([x, col]) => sh(ctx, c => c.arc(x, 679, 18, 0, 7), col, 0));
  }
  function c1(ctx, lt, dur, t) { // On a Thursday in September 2025 — the desk calendar, a laptop opens
    const T0 = 0, at = s => lt - (s - T0);
    ctx.save(); camZoom(ctx, drift(lt, dur, 1, 1.06), 700, 420);
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, [[0, '#ffe2bf'], [1, '#fff4e4']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    // window with a dusk sky
    sh(ctx, c => c.roundRect(90, 70, 330, 300, 10), Tn.grad(ctx, 0, 70, 0, 370, [[0, '#6b7fd7'], [1, '#ffb27a']]), 6);
    Tn.line(ctx, [[255, 70], [255, 370]], 5, INK); Tn.line(ctx, [[90, 220], [420, 220]], 5, INK);
    ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.arc(350, 130, 26, 0, 7); ctx.fill();
    Pr.table(ctx, 540);
    Pr.calendar(ctx, 330, 560, 1.05, 'SEP 2025', 'THU', { flip: clamp(at(.25) / .5), prevTop: 'AUG 2025', prevBig: '' });
    if (at(.92) > 0) K.scribbleCircle(ctx, 330, 440, 110, 60, clamp(at(.92) / .5), P.red, 6);
    laptop(ctx, 820, 560, 1.15, inout(clamp(at(1.5) / 1.0)), (c, w, h) => { c.fillStyle = '#2a2d35'; c.fillRect(0, 0, w, h); for (let i = 0; i < 12; i++) { const k = clamp(at(2.0) * 6 - i); if (k > 0) { c.fillStyle = TILE_BG[i % 8]; c.fillRect(8 + (i % 4) * 82, 8 + Math.floor(i / 4) * 62, 76 * k, 56); } } });
    // a mug, steaming
    sh(ctx, c => c.roundRect(1060, 470, 70, 76, 10), P.blue, 4.5); sh(ctx, c => c.arc(1134, 505, 18, -1.3, 1.3), null, 5);
    for (let i = 0; i < 2; i++) { const yy = 450 - ((lt * 30 + i * 20) % 40); Tn.line(ctx, [[1085 + i * 22, yy], [1090 + i * 22, yy - 20]], 4, 'rgba(120,120,120,.5)'); }
    ctx.restore();
    K.source(ctx, 'Source: AP (Dec 11, 2025)', at(.6));
  }
  function c2(ctx, lt, dur, t) { // more than 40 strangers got on the same video call
    const T0 = 2.82, at = s => lt - (s - T0), z = lerp(.42, 1, inout(clamp(lt / .5)));
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
    callWindow(ctx, clamp(at(3.0) / 1.5) * 40, t, { mouth: 'flat' });
    ctx.restore();
    popAt(ctx, 1080, 560, at(3.16), () => { sh(ctx, c => c.roundRect(940 + 8, 480 + 10, 280, 160, 24), 'rgba(0,0,0,.3)', 0); K.card(ctx, 940, 480, 280, 160, P.yellow, 24);
      txt(ctx, '40+', 1080, 540, HAND(700, 100), INK); txt(ctx, 'strangers', 1080, 608, HAND(700, 38), INK, 'center', clamp(at(3.5) / .3)); });
  }
  function c3(ctx, lt, dur, t) { // they all opened the Instacart app
    const T0 = 5.81, at = s => lt - (s - T0), zk = clamp(at(6.35) / .5);
    if (zk < 1) {
      ctx.save(); camZoom(ctx, lerp(1, 4.2, inout(zk)), lerp(640, 417, inout(zk)), lerp(360, 258, inout(zk)));
      callWindow(ctx, 40, t, { phones: clamp(at(5.95) / .6), look: [0, .8], brows: 'up' });
      ctx.restore(); if (zk > .6) { ctx.fillStyle = `rgba(255,255,255,${(zk - .6) / .4})`; ctx.fillRect(0, 0, W, H); }
      return;
    }
    // close-up: a white-faced volunteer's hands on the phone, the Instacart app opening
    K.bg.color(ctx, '#d8f2c9');
    const k2 = at(6.58);
    Pr.phone(ctx, 640, 380, 1.05, (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      const s2 = k2 > 0 ? back(clamp(k2 / .35)) : 0;
      if (s2 > 0 && IMG.instacart) { c.save(); c.translate(w / 2, h / 2 - 20); c.scale(s2, s2); const lw = 240, lh = lw * INSTA[3] / INSTA[2]; c.beginPath(); c.roundRect(-lw / 2, -lh / 2, lw, lh, 18); c.clip(); c.drawImage(IMG.instacart, ...INSTA, -lw / 2, -lh / 2, lw, lh); c.restore(); }
      if (k2 > .5) { c.globalAlpha = clamp((k2 - .5) / .3); c.fillStyle = '#eef1f4'; c.beginPath(); c.roundRect(24, h - 120, w - 48, 44, 22); c.fill(); txt(c, 'Search stores…', 50, h - 98, PRINT(22), '#7c8591', 'left'); c.globalAlpha = 1; }
    });
    for (const sx of [-1, 1]) { const hx = 640 + sx * 150, hy = 500;                // sleeves from the bottom of frame, white mitten hands gripping the sides
      Tn.line(ctx, [[640 + sx * 330, H + 40], [hx + sx * 30, hy + 40]], 46, INK); Tn.line(ctx, [[640 + sx * 330, H + 40], [hx + sx * 30, hy + 40]], 38, P.purple);
      sh(ctx, c => c.ellipse(hx, hy, 30, 40, sx * .3, 0, 7), '#fff', 4.5); sh(ctx, c => c.ellipse(hx - sx * 14, hy - 34, 12, 20, -sx * .5, 0, 7), '#fff', 3.5); }
    K.source(ctx, 'Logo: Instacart', k2);
  }
  function capitol(ctx, x, y, s) { // simple Capitol-dome silhouette (background)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#b7c7e4';
    ctx.fillRect(-170, -60, 340, 60); ctx.fillRect(-90, -100, 180, 40); ctx.beginPath(); ctx.ellipse(0, -100, 70, 80, 0, Math.PI, 0); ctx.fill();
    ctx.fillRect(-10, -205, 20, 30); ctx.beginPath(); ctx.arc(0, -210, 9, 0, 7); ctx.fill(); ctx.restore();
  }
  function c4(ctx, lt, dur, t) { // they all picked the same Safeway in Washington, D.C.
    const T0 = 7.99, at = s => lt - (s - T0);
    K.bg.sky(ctx);
    ctx.save(); camZoom(ctx, drift(lt, dur, 1, 1.04), 760, 420);
    capitol(ctx, 1160, 560, 1.15);
    for (const [x, s] of [[160, 1], [1230, .9]]) { Tn.line(ctx, [[x, 560], [x, 470]], 8, '#7a5233'); sh(ctx, c => c.arc(x, 440, 60 * s, 0, 7), '#5fbf4a', 4.5); }
    ctx.fillStyle = '#7ccf55'; ctx.fillRect(-100, 560, W + 200, 200); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(-100, 560, W + 200, 40); Tn.line(ctx, [[-100, 560], [W + 100, 560]], 4, INK); Tn.line(ctx, [[-100, 600], [W + 100, 600]], 4, INK);
    Pr.store(ctx, 760, 562, 1, 'safeway', { crop: [0, 0, 1069, 1200], trim: '#e1251b', awning: '#e1251b', w: 480, h: 340, logoH: 96 });
    Pr.pin(ctx, 760, 214, 1.1, at(8.94));
    ctx.restore();
    if (at(9.53) > 0) popAt(ctx, 1040, 120, at(9.53), () => { K.card(ctx, 860, 82, 360, 76, '#fff', 16); txt(ctx, 'Washington, D.C.', 1040, 121, HAND(700, 44)); });
    // the phone on the left: the store list, the Safeway row ticked
    Pr.phone(ctx, 230, 400, .78, (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#0b7a3e'; c.fillRect(0, 0, w, 70); txt(c, 'Choose a store', w / 2, 40, PRINT(26), '#fff');
      ['Safeway', '·····', '·····', '·····'].forEach((n, i) => { const y = 100 + i * 96, sel = i === 0 && at(8.94) > 0;
        c.fillStyle = sel ? '#e3f6e8' : '#f3f5f7'; c.beginPath(); c.roundRect(14, y, w - 28, 80, 14); c.fill(); if (sel) { c.lineWidth = 4; c.strokeStyle = '#0b7a3e'; c.stroke(); }
        if (i === 0) { txt(c, 'Safeway', 30, y + 28, PRINT(26), INK, 'left'); txt(c, 'Washington, D.C.', 30, y + 56, PRINT(18), '#6a7380', 'left'); }
        else { c.fillStyle = '#d6dbe1'; c.fillRect(30, y + 22, 120, 14); c.fillRect(30, y + 48, 80, 10); } });
    });
    K.check(ctx, 296, 305, 44, clamp(at(9.2) / .4));
    K.source(ctx, 'Logo: Safeway', at(8.6));
  }

  function toggle(ctx, x, y, on, labels = ['Delivery', 'Pickup']) { // segmented switch inside a phone screen
    sh(ctx, c => c.roundRect(x, y, 220, 48, 24), '#eef1f4', 2.5); const kx = lerp(x + 4, x + 112, out(on));
    sh(ctx, c => c.roundRect(kx, y + 4, 104, 40, 20), on > .5 ? '#0b7a3e' : '#fff', 2.5);
    txt(ctx, labels[0], x + 56, y + 25, PRINT(18), on > .5 ? '#6a7380' : INK); txt(ctx, labels[1], x + 164, y + 25, PRINT(18), on > .5 ? '#fff' : '#6a7380');
  }
  function c5(ctx, lt, dur, t) { // the same carton of eggs, a dozen Lucerne; they all chose pickup
    const T0 = 11.16, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e5f4ff');
    // counter on the right with the carton; it hops into the phone's cart on "same carton"
    Pr.table(ctx, 560, '#e8c79e');
    const fly = clamp(at(12.3) / .7), fx = lerp(900, 330, inout(fly)), fy = lerp(560, 330, inout(fly)) - Math.sin(fly * Math.PI) * 160, fs = lerp(1.25, .45, inout(fly));
    if (at(11.79) > 0 && fly < 1) popAt(ctx, 900, 500, at(11.79), () => Pr.eggs(ctx, fx, fy, fs));
    if (at(13.2) > 0) popAt(ctx, 900, 230, at(13.2), () => { K.card(ctx, 730, 180, 340, 100, '#fff', 18); txt(ctx, 'a dozen', 900, 212, PRINT(28), '#6a7380'); txt(ctx, 'Lucerne', 900, 250, HAND(700, 52), '#1d4f91'); });
    Pr.phone(ctx, 330, 380, 1.05, (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#0b7a3e'; c.fillRect(0, 0, w, 64); txt(c, 'Safeway · Washington, D.C.', w / 2, 36, PRINT(19), '#fff');
      c.fillStyle = '#f6f2ea'; c.fillRect(20, 84, w - 40, 210);
      if (fly >= 1) Pr.eggs(c, w / 2, 250, .82);
      txt(c, 'Lucerne Large Eggs, 12 ct', 24, 320, PRINT(19), INK, 'left');
      const add = at(12.6) > 0; sh(c, cc => cc.roundRect(24, 346, w - 48, 52, 26), add ? '#0b7a3e' : '#2bb35b', 0); txt(c, add ? '✓ In cart' : 'Add to cart', w / 2, 373, PRINT(22), '#fff');
      toggle(c, 22, 424, clamp(at(14.9) / .3));
    });
    if (at(14.9) > 0) { popAt(ctx, 560, 470, at(14.9), () => { K.card(ctx, 470, 430, 180, 76, P.green, 16); txt(ctx, 'PICKUP', 560, 469, HAND(700, 42), '#fff'); }); }
    K.source(ctx, 'Source: AP (Dec 11, 2025) · drawn carton', at(12.2));
  }
  function wallClock(ctx, x, y, r, sec, lt) { popAt(ctx, x, y, lt, () => { sh(ctx, c => c.arc(x, y, r, 0, 7), '#fff', 6); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; Tn.line(ctx, [[x + Math.sin(a) * r * .8, y - Math.cos(a) * r * .8], [x + Math.sin(a) * r * .92, y - Math.cos(a) * r * .92]], 4, INK); }
    const a = sec / 60 * Math.PI * 2; Tn.line(ctx, [[x, y], [x + Math.sin(a) * r * .78, y - Math.cos(a) * r * .78]], 5, P.red); sh(ctx, c => c.arc(x, y, 7, 0, 7), INK, 0); }); }
  function c6(ctx, lt, dur, t) { // and at the same moment, they all looked at the price
    const T0 = 15.83, at = s => lt - (s - T0);
    callWindow(ctx, 40, t, { phones: 1, look: [0, .9], brows: at(16.9) > 0 ? 'up' : 'calm', mouth: at(17.1) > 0 ? 'o' : 'flat' });
    ctx.fillStyle = 'rgba(20,22,28,.35)'; if (at(16.41) > 0) ctx.fillRect(0, 0, W, H);
    const sec = Math.min(60, 40 + Math.floor(at(15.9) * 8)); wallClock(ctx, 640, 340, 150, sec, at(16.1));
    if (at(16.41) > 0) popAt(ctx, 640, 560, at(16.41), () => { K.card(ctx, 450, 520, 380, 80, P.yellow, 18); txt(ctx, 'same moment', 640, 560, HAND(700, 52)); });
  }
  function c7(ctx, lt, dur, t) { // the five prices, as the narration names them
    const T0 = 18.3, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff4e0');
    ctx.fillStyle = '#ffe3b8'; ctx.fillRect(0, 0, W, 120); txt(ctx, 'Same Lucerne dozen · same Safeway · same moment', 640, 50, HAND(700, 40), '#8a5a36', 'center', clamp(lt / .4)); txt(ctx, 'Prices: "Same Cart, Different Price" (Dec 9, 2025)', 640, 96, PRINT(20), '#8a7a66', 'center', clamp(lt / .4));
    const S = [[150, 19.13, '$3.99', 'grin', 'up'], [395, 21.23, '$4.28', 'smile', 'calm'], [640, 21.75, '$4.59', 'flat', 'calm'], [885, 22.85, '$4.69', 'frown', 'worried'], [1130, 24.87, '$4.79', 'frown', 'angry']];
    S.forEach(([x, s, p, m, br], i) => { const on = at(s) > 0;
      bean(ctx, x, 740, 1.1, t, Object.assign(Pr.extra(i + 3), { face: { mouth: on ? m : 'flat', brows: on ? br : 'calm', look: [0, .6] } })); });
    sh(ctx, c => c.rect(-10, 590, W + 20, 160), '#f4f1ea', 5); sh(ctx, c => c.rect(-10, 590, W + 20, 30), '#d9d4c8', 5);
    S.forEach(([x, s, p], i) => { Pr.eggs(ctx, x, 592, .7); Pr.tag(ctx, x, 650, .95, p, at(s), { color: i === 0 ? '#d8f5d0' : i === 4 ? '#ffd6d0' : '#fff', rot: (i - 2) * .03 }); });
    if (at(19.3) > 0) popAt(ctx, 150, 200, at(19.3), () => { K.card(ctx, 70, 172, 160, 56, '#fff', 14); txt(ctx, 'a couple', 150, 200, HAND(700, 30), P.green); });
    if (at(20.6) > 0) popAt(ctx, 640, 200, at(20.6), () => { K.card(ctx, 570, 172, 140, 56, '#fff', 14); txt(ctx, 'others', 640, 200, HAND(700, 30)); });
    if (at(25.2) > 0) popAt(ctx, 1130, 200, at(25.2), () => { K.card(ctx, 1060, 172, 140, 56, '#fff', 14); txt(ctx, 'a few', 1130, 200, HAND(700, 30), P.red); });
  }
  function c8(ctx, lt, dur, t) { // same eggs, same store, same minute — five different prices
    const T0 = 26.05, at = s => lt - (s - T0), five = at(28.87) > 0;
    K.bg.color(ctx, '#fff8ec');
    // aisle: shelves behind, a hanging store banner
    for (const sx of [0, 1]) { sh(ctx, c => c.rect(sx ? 820 : -20, 160, 480, 420), '#f1ece2', 4); for (let r = 0; r < 4; r++) { Tn.line(ctx, [[sx ? 820 : -20, 230 + r * 100], [sx ? 1300 : 460, 230 + r * 100]], 5, '#b9ae9a'); for (let j = 0; j < 7; j++) sh(ctx, c => c.roundRect((sx ? 840 : 0) + j * 64, 186 + r * 100, 44, 44, 6), ['#f6c945', '#e04b3a', '#3b7dd8', '#3a9b4f'][(j + r + sx) % 4], 3); } }
    ctx.fillStyle = '#d9d2c4'; ctx.fillRect(-20, 580, W + 40, 160); Tn.line(ctx, [[-20, 580], [W + 20, 580]], 4, INK);
    Tn.line(ctx, [[560, 0], [560, 70]], 3, INK); Tn.line(ctx, [[720, 0], [720, 70]], 3, INK);
    K.card(ctx, 500, 70, 280, 90, '#fff', 14); if (IMG.safeway) ctx.drawImage(IMG.safeway, 0, 0, 1069, 1200, 600, 76, 70, 79);
    wallClock(ctx, 1150, 100, 56, 15, at(26.05));
    const you = bean(ctx, 420, 690, 1.0, t, Object.assign({}, Pr.YOU, { armR: [.9, 1.3], face: { mouth: five ? 'smile' : 'flat', brows: five ? 'up' : 'calm', look: five ? [.8, 0] : [0, .6] } }));
    const nb = bean(ctx, 860, 690, 1.0, t, Object.assign({}, Pr.NEIGHBOUR, { armL: [.9, 1.3], face: { mouth: five ? 'o' : 'flat', brows: five ? 'angry' : 'calm', look: five ? [-.8, 0] : [0, .6] } }));
    Pr.eggs(ctx, you.hands.R[0] + 40, you.hands.R[1] + 20, .45); Pr.eggs(ctx, nb.hands.L[0] - 40, nb.hands.L[1] + 20, .45);
    // the three "same" ticks
    [[26.36, 'same eggs'], [27.28, 'same store'], [28.24, 'same minute']].forEach(([s, l], i) => popAt(ctx, 640, 220 + i * 70, at(s), () => { K.card(ctx, 520, 192 + i * 70, 240, 56, '#fff', 14); txt(ctx, l, 655, 221 + i * 70, HAND(700, 34)); K.check(ctx, 548, 220 + i * 70, 30, clamp(at(s) / .3)); }));
    if (five) { K.bubble(ctx, '$3.99', 250, 230, 170, [360, 310], at(28.87), { size: 46, fill: '#d8f5d0' }); K.bubble(ctx, '$4.79', 1030, 230, 170, [920, 310], at(29.1), { size: 46, fill: '#ffd6d0' });
      popAt(ctx, 640, 470, at(29.47), () => { K.card(ctx, 470, 430, 340, 80, P.red, 18); txt(ctx, '5 different prices', 640, 470, HAND(700, 42), '#fff'); }); }
  }
  function c9(ctx, lt, dur, t) { // nobody did anything different — so who decided one person pays 80 cents more for breakfast?
    const T0 = 30.19, at = s => lt - (s - T0);
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, [[0, '#ffe9c7'], [1, '#fff6e6']]); ctx.fillRect(0, 0, W, H);
    // a doorway on the right; the shadowy price-setter appears on "who decided"
    sh(ctx, c => c.rect(1010, 120, 220, 420), '#3a3550', 6);
    if (at(32.41) > 0) { ctx.save(); ctx.globalAlpha = clamp(at(32.41) / .5); B.person(ctx, 1120, 560, .95, { skin: '#2b2838', hair: 'none', body: '#2b2838', legs: '#2b2838', face: { eyes: 0, mouth: 'flat' } }); txt(ctx, '?', 1120, 230, HAND(700, 110), P.yellow); ctx.restore(); }
    bean(ctx, 460, 640, 1.05, t, Object.assign({}, Pr.YOU, { face: { mouth: at(33.6) > 0 ? 'frown' : 'smile', brows: at(33.6) > 0 ? 'worried' : 'calm', look: at(32.5) > 0 ? [.9, 0] : [0, .5] } }));
    Pr.table(ctx, 540, '#d79a5e');
    sh(ctx, c => c.ellipse(460, 560, 120, 26, 0, 0, 7), '#fff', 4.5); for (const ex of [420, 500]) { sh(ctx, c => c.ellipse(ex, 552, 40, 16, 0, 0, 7), '#fff', 3); sh(ctx, c => c.arc(ex, 550, 12, 0, 7), P.yellow, 3); }
    if (at(30.6) > 0) popAt(ctx, 300, 200, at(30.6), () => { K.card(ctx, 60, 160, 480, 80, '#fff', 16); txt(ctx, 'nobody did anything different', 300, 200, HAND(700, 30)); });
    // 80¢ slides along the table toward the doorway
    const k = clamp(at(33.95) / 1.4);
    for (let i = 0; i < 4; i++) { const cx = lerp(600 + i * 30, 1060 + i * 18, inout(clamp(k * 1.2 - i * .06))); if (at(33.6) > 0) { sh(ctx, c => c.ellipse(cx, 572, 24, 10, 0, 0, 7), '#d9a62e', 3); sh(ctx, c => c.ellipse(cx, 566, 24, 10, 0, 0, 7), P.yellow, 3); } }
    K.slam(ctx, '+80¢', 760, 370, at(34.16), 120, P.red);
    if (at(34.5) > 0) txt(ctx, '$4.79 − $3.99 = 80¢', 760, 460, PRINT(30), '#6a5a48', 'center', clamp(at(34.5) / .3));
  }
  function c10(ctx, lt, dur, t) { // part of an investigation into one of the biggest grocery apps in America
    const T0 = 36.17, at = s => lt - (s - T0);
    K.bg.color(ctx, '#e6f0ff');
    ctx.save(); camZoom(ctx, drift(lt, dur, 1, 1.05));
    Pr.phone(ctx, 700, 360, .95, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); if (IMG.instacart) { const lw = 220, lh = lw * INSTA[3] / INSTA[2]; c.save(); c.beginPath(); c.roundRect(w / 2 - lw / 2, 150, lw, lh, 16); c.clip(); c.drawImage(IMG.instacart, ...INSTA, w / 2 - lw / 2, 150, lw, lh); c.restore(); } for (let i = 0; i < 3; i++) { c.fillStyle = '#eef1f4'; c.beginPath(); c.roundRect(24, 300 + i * 66, w - 48, 52, 12); c.fill(); } });
    const det = bean(ctx, 270, 690, 1.0, t, Object.assign(Pr.extra(2), { armR: [2.2, .5], face: { mouth: 'flat', brows: 'angry', look: [.9, -.2] } }));
    const hx = det.hands.R[0], hy = det.hands.R[1], sw = Math.sin(t * 1.6) * 40;
    sh(ctx, c => { c.moveTo(hx - 8, hy + 6); c.lineTo(hx + 8, hy - 6); c.lineTo(hx + 90 + sw, hy - 90); c.lineTo(hx + 76 + sw, hy - 104); c.closePath(); }, '#8a5a36', 4);
    sh(ctx, c => c.arc(hx + 140 + sw, hy - 150, 72, 0, 7), 'rgba(191,230,255,.4)', 8);
    bean(ctx, 1080, 690, .9, t, Object.assign(Pr.extra(5), { armL: [.6, 1.4], face: { mouth: 'flat', brows: 'up', look: [-.9, 0] } }));
    sh(ctx, c => c.roundRect(940, 400, 90, 120, 8), '#fff', 4); for (let i = 0; i < 4; i++) Tn.line(ctx, [[955, 430 + i * 22], [1015, 430 + i * 22]], 3, '#9aa3ad');
    ctx.restore();
    K.stamp(ctx, 'INVESTIGATION', 640, 110, at(37.38), { color: P.blue, rot: -.05, size: 56 });
    if (at(38.62) > 0) popAt(ctx, 1000, 220, at(38.62), () => { K.card(ctx, 820, 170, 360, 100, '#fff', 18); txt(ctx, 'one of the biggest', 1000, 202, PRINT(26)); txt(ctx, 'grocery apps in the U.S.', 1000, 240, HAND(700, 34)); });
  }
  function c11(ctx, lt, dur, t) { // about a week later, federal regulators started asking questions
    const T0 = 41.43, at = s => lt - (s - T0), flip = clamp(at(41.9) / .5);
    K.bg.color(ctx, '#eef6ff'); ctx.fillStyle = '#cfd6df'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    Pr.calendar(ctx, 220, 600, 1.0, 'DEC 2025', flip < .5 ? '9' : '17', { flip: flip < 1 ? flip : null, prevTop: 'DEC 2025', prevBig: '9', bigSize: 110 });
    if (at(41.72) > 0) popAt(ctx, 220, 170, at(41.72), () => { K.card(ctx, 90, 135, 260, 70, P.yellow, 16); txt(ctx, '~1 week later', 220, 170, HAND(700, 38)); });
    // the Instacart door
    sh(ctx, c => c.rect(760, 140, 420, 460), '#f7f3ea', 5); sh(ctx, c => c.rect(880, 300, 170, 300), '#8a5a36', 5); sh(ctx, c => c.arc(1025, 460, 8, 0, 7), P.yellow, 3);
    if (IMG.instacart) { K.card(ctx, 840, 170, 250, 110, '#fff', 12); ctx.save(); ctx.beginPath(); ctx.roundRect(852, 182, 226, 86, 10); ctx.clip(); ctx.drawImage(IMG.instacart, ...INSTA, 852, 182, 226, 118); ctx.restore(); }
    // the FTC clerk walks up and knocks
    const wk = clamp(at(43.14) / 1.0), cx = lerp(420, 760, out(wk)), knock = at(44.38) > 0 && at(44.38) < 1 ? Math.abs(Math.sin(at(44.38) * 12)) : 0;
    const clerk = bean(ctx, cx, 690, 1.0, t, Object.assign(Pr.extra(6), { body: '#2f3a55', top: 'suit', tie: P.red, armR: [1.9 - knock * .4, .6], armL: [.5, 1.6], face: { mouth: 'flat', brows: 'calm', look: [.9, 0] } }));
    if (IMG.ftc) { ctx.save(); ctx.beginPath(); ctx.arc(cx - 26, 690 - 190, 18, 0, 7); ctx.clip(); ctx.drawImage(IMG.ftc, cx - 44, 690 - 208, 36, 36); ctx.restore(); }
    sh(ctx, c => c.roundRect(clerk.hands.L[0] - 10, clerk.hands.L[1] - 70, 70, 92, 8), '#fff', 4); txt(ctx, '?', clerk.hands.L[0] + 25, clerk.hands.L[1] - 25, HAND(700, 50), P.blue);
    if (knock > 0) for (let i = 0; i < 3; i++) Tn.line(ctx, [[870, 420 + i * 30], [850 - i * 4, 410 + i * 34]], 4, INK);
    if (at(45.0) > 0) K.bubble(ctx, 'A few questions…', 560, 230, 330, [cx, 330], at(45.0), { size: 38 });
    if (at(43.52) > 0) popAt(ctx, 640, 660, at(43.52), () => { K.card(ctx, 380, 632, 520, 56, '#fff', 14); txt(ctx, 'FTC request for information — not a finding', 640, 660, PRINT(24), '#4a4f57'); });
    K.source(ctx, 'Source: Reuters via TechCrunch (Dec 17, 2025)', at(43.2));
  }
  function c12(ctx, lt, dur, t) { // within two weeks, the company shut down the program behind it
    const T0 = 46.46, at = s => lt - (s - T0), off = at(47.73) > 0;
    K.bg.color(ctx, off ? '#d9dde6' : '#fff4d6');
    sh(ctx, c => c.roundRect(470, 150, 340, 420, 26), '#fff', 6); txt(ctx, 'PRICE TESTS', 640, 200, PRINT(36));
    txt(ctx, 'ON', 640, 270, HAND(700, 44), off ? '#b6bcc5' : P.green); txt(ctx, 'OFF', 640, 520, HAND(700, 44), off ? P.red : '#b6bcc5');
    sh(ctx, c => c.roundRect(590, 300, 100, 190, 20), '#e9edf1', 5);
    const ly = lerp(320, 400, out(clamp(at(47.73) / .2)));
    sh(ctx, c => c.roundRect(600, ly, 80, 76, 14), off ? P.red : P.green, 5);
    // a mitten hand pushes the lever down
    const hy = lerp(140, ly - 10, out(clamp(at(47.4) / .35))); Tn.line(ctx, [[900, -40], [690, hy]], 40, INK); Tn.line(ctx, [[900, -40], [690, hy]], 32, '#2f3a55'); sh(ctx, c => c.ellipse(670, hy + 6, 30, 22, .2, 0, 7), '#fff', 4.5);
    if (at(46.75) > 0) popAt(ctx, 1040, 260, at(46.75), () => { K.card(ctx, 900, 210, 280, 100, P.yellow, 18); txt(ctx, 'within', 1040, 240, PRINT(26)); txt(ctx, '2 weeks', 1040, 280, HAND(700, 44)); });
    if (at(48.25) > 0) popAt(ctx, 220, 360, at(48.25), () => { K.card(ctx, 70, 300, 300, 120, '#fff', 18); txt(ctx, 'Dec 9 report →', 220, 335, PRINT(24), '#6a7380'); txt(ctx, 'Dec 22, 2025', 220, 380, HAND(700, 42), P.red); });
    if (off) K.stamp(ctx, 'SHUT DOWN', 640, 620, at(47.9), { color: P.red, size: 54, rot: -.06 });
    K.source(ctx, 'Source: Consumer Reports; Instacart (Dec 22, 2025)', at(48.0));
  }
  function haloEgg(ctx, x, y, s, t, lt) { popAt(ctx, x, y, lt, () => { ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 6); ctx.scale(s, s);
    sh(ctx, c => c.ellipse(0, -150, 54, 14, 0, 0, 7), null, 6, P.yellow); sh(ctx, c => c.ellipse(0, -40, 70, 92, 0, 0, 7), '#fffaf0', 5);
    ctx.fillStyle = INK; for (const ex of [-22, 22]) { ctx.beginPath(); ctx.ellipse(ex, -54, 6, 9, 0, 0, 7); ctx.fill(); } B.curve(ctx, [-16, -22], [0, -8], [16, -22], 4); ctx.fillStyle = 'rgba(240,130,120,.35)'; for (const ex of [-38, 38]) { ctx.beginPath(); ctx.ellipse(ex, -30, 12, 6, 0, 0, 7); ctx.fill(); }
    ctx.restore(); }); }
  function c13(ctx, lt, dur, t) { // Instacart is only where this story starts… the eggs were the innocent version
    const T0 = 49.88, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#bfe3ff', '#eef8ff');
    host(ctx, 420, 700, 1.15, t, [[T0, 'present'], [52.8, 'think'], [54.6, 'pointSide'], [56.0, 'present']], { mouth: at(55.6) > 0 ? 'smirk' : 'flat', brows: at(54.6) > 0 ? 'skeptic' : 'up', look: [.6, 0] });
    if (at(50.38) > 0 && at(54.6) < 0) popAt(ctx, 920, 330, at(50.38), () => { Tn.line(ctx, [[920, 360], [920, 600]], 10, '#8a5a36'); ctx.save(); ctx.translate(920, 300); ctx.rotate(-.04); sh(ctx, c => { c.moveTo(-170, -60); c.lineTo(140, -60); c.lineTo(190, 0); c.lineTo(140, 60); c.lineTo(-170, 60); c.closePath(); }, P.green, 5); txt(ctx, 'STORY STARTS', -10, -18, PRINT(28), '#fff'); txt(ctx, 'here: Instacart', -10, 22, HAND(700, 36), '#fff'); ctx.restore(); });
    if (at(54.6) > 0) { haloEgg(ctx, 900, 470, 1.4, t, at(55.32)); if (at(55.78) > 0) popAt(ctx, 900, 560, at(55.78), () => { K.card(ctx, 760, 530, 280, 64, '#fff', 16); txt(ctx, 'the innocent version', 900, 562, HAND(700, 32)); }); }
  }
  function printer(ctx, x, y, s, k) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.roundRect(-110, -90, 220, 150, 18), '#6c7a8f', 5); sh(ctx, c => c.roundRect(-80, -70, 120, 30, 6), '#b8ffcf', 3); sh(ctx, c => c.rect(-70, 54, 140, 14), INK, 0); for (let i = 0; i < 3; i++) sh(ctx, c => c.arc(70, -55 + i * 26, 7, 0, 7), [P.red, P.yellow, P.green][i], 2); ctx.restore(); }
  function c14(ctx, lt, dur, t) { // the technology to charge you, specifically you, a different price than me already exists
    const T0 = 57.31, at = s => lt - (s - T0);
    K.bg.color(ctx, '#2c3150');
    const sx = at(58.46) > 0 ? 430 : 640 + Math.sin(lt * 3) * 380;
    ctx.save(); ctx.globalAlpha = .9; ctx.fillStyle = 'rgba(255,240,180,.35)'; ctx.beginPath(); ctx.moveTo(sx - 20, -10); ctx.lineTo(sx + 20, -10); ctx.lineTo(sx + 170, 700); ctx.lineTo(sx - 170, 700); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.fillStyle = 'rgba(255,240,180,.5)'; ctx.beginPath(); ctx.ellipse(sx, 690, 170, 26, 0, 0, 7); ctx.fill();
    const you = bean(ctx, 430, 690, 1.05, t, Object.assign({}, Pr.YOU, { armR: [.5, 1.2], face: { mouth: at(59.35) > 0 ? 'o' : 'flat', brows: 'up', look: [.5, -.3] } }));
    if (at(59.35) > 0) popAt(ctx, 430, 150, at(59.35), () => { K.card(ctx, 360, 112, 140, 76, P.yellow, 16); txt(ctx, 'YOU', 430, 151, HAND(700, 50)); });
    printer(ctx, 760, 420, 1, 0);
    const pk = clamp(at(60.1) / .6); if (pk > 0) { ctx.save(); ctx.beginPath(); ctx.rect(600, 480, 300, 200); ctx.clip(); Pr.tag(ctx, 760, 470 + pk * 70, 1, '$$$', 1, { color: '#ffd6d0' }); ctx.restore(); }
    if (at(61.0) > 0) { host(ctx, 1090, 700, .95, t, [[61.0, 'idle'], [61.2, 'chest']], { mouth: 'flat', brows: 'up', look: [-.6, 0] }); Pr.tag(ctx, 1090, 180, .9, '$$', at(61.0), { color: '#d8f5d0' }); txt(ctx, 'me', 1090, 130, HAND(700, 34), '#fff'); }
    K.stamp(ctx, 'ALREADY EXISTS', 640, 90, at(61.63), { color: P.yellow, size: 50, rot: -.05 });
    txt(ctx, 'illustration', 1240, 700, PRINT(18), 'rgba(255,255,255,.6)', 'right');
  }
  function c15(ctx, lt, dur, t) { // some apps are already legally required to admit they're using your personal data to set prices
    const T0 = 63.19, at = s => lt - (s - T0), ban = at(65.94) > 0;
    K.bg.color(ctx, '#e9f6ef');
    bean(ctx, 300, 700, 1.1, t, Object.assign({}, Pr.YOU, { armR: [1.2, .9], face: { mouth: ban ? 'o' : 'flat', brows: ban ? 'up' : 'calm', look: [.9, -.2] } }));
    Pr.phone(ctx, 720, 370, 1.05, (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#e04b3a'; c.fillRect(0, 0, w, 64); txt(c, 'Food delivery app', w / 2, 36, PRINT(20), '#fff');
      for (let i = 0; i < 3; i++) { c.fillStyle = '#f3f5f7'; c.beginPath(); c.roundRect(20, 90 + i * 64, w - 40, 50, 10); c.fill(); }
      txt(c, 'Total', 30, 320, PRINT(24), INK, 'left'); txt(c, '$ • • •', w - 30, 320, PRINT(24), INK, 'right');
      if (ban) { const k = back(clamp(at(65.94) / .35)); c.save(); c.translate(w / 2, 400); c.scale(k, k); c.fillStyle = '#1f1c1a'; c.beginPath(); c.roundRect(-118, -78, 236, 156, 14); c.fill();
        ['THIS PRICE WAS SET', 'BY AN ALGORITHM', 'USING YOUR', 'PERSONAL DATA.'].forEach((l, i) => txt(c, l, 0, -52 + i * 34, PRINT(19), i === 3 ? P.yellow : '#fff')); c.restore(); }
    });
    if (at(64.22) > 0) popAt(ctx, 1080, 200, at(64.22), () => { K.card(ctx, 960, 140, 240, 120, '#fff', 18); txt(ctx, 'required by', 1080, 180, PRINT(24), '#6a7380'); txt(ctx, 'N.Y. law', 1080, 222, HAND(700, 44), P.blue); });
    popAt(ctx, 1080, 620, at(63.5), () => { K.card(ctx, 960, 594, 240, 52, P.yellow, 12); txt(ctx, 'RECREATION', 1080, 620, PRINT(24)); });
  }
  function c16(ctx, lt, dur, t) { // as of October 1, in one state, a version of this became illegal
    const T0 = 68.46, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    ctx.fillStyle = '#8c929c'; ctx.beginPath(); ctx.moveTo(560, 560); ctx.lineTo(720, 560); ctx.lineTo(1000, 720); ctx.lineTo(280, 720); ctx.closePath(); ctx.fill();
    popAt(ctx, 360, 560, at(70.64), () => { for (const px of [270, 450]) Tn.line(ctx, [[px, 560], [px, 330]], 10, '#7a5233'); sh(ctx, c => c.roundRect(170, 190, 380, 170, 18), '#2f6fbf', 6); txt(ctx, 'WELCOME TO', 360, 235, PRINT(30), '#fff'); txt(ctx, 'MARYLAND', 360, 295, HAND(700, 62), '#fff'); });
    Pr.calendar(ctx, 1100, 300, .75, 'OCT 2026', '1', { bigSize: 100, head: P.blue });
    // the no-surveillance-pricing sign drops in and plants into the ground
    const dk = clamp(at(72.46) / .35), sy = lerp(-200, 560, dk * dk);
    if (at(72.46) > 0) { Tn.line(ctx, [[800, sy], [800, sy - 230]], 9, '#7a5233'); ctx.save(); ctx.translate(800, sy - 320); sh(ctx, c => c.arc(0, 0, 100, 0, 7), '#fff', 6); Pr.tag(ctx, 0, -10, .8, '$', 1, {}); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-4, 34, 26, 14, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-4, 34, 7, 0, 7); ctx.fill(); sh(ctx, c => c.arc(0, 0, 92, 0, 7), null, 16, P.red); Tn.line(ctx, [[-64, -64], [64, 64]], 16, P.red); ctx.restore(); }
    if (dk >= 1) K.stamp(ctx, 'ILLEGAL*', 800, 600, at(72.96), { color: P.red, size: 54, rot: -.08 });
    if (at(73.2) > 0) txt(ctx, '*surveillance pricing on food at big grocery stores and delivery apps', 640, 690, PRINT(22), INK, 'center', clamp(at(73.2) / .3));
  }
  function c17(ctx, lt, dur, t) { // so let's figure out who's setting your price, and how much they know about you
    const T0 = 74.07, at = s => lt - (s - T0);
    K.bg.color(ctx, '#ffd76a'); ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let i = -4; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 90 + lt * 30, 0); ctx.lineTo(i * 90 + 300 + lt * 30, H); ctx.lineTo(i * 90 + 340 + lt * 30, H); ctx.lineTo(i * 90 + 40 + lt * 30, 0); ctx.fill(); }
    popAt(ctx, 640, 150, at(74.2), () => { K.slam(ctx, "YOUR PRICE", 640, 110, 1, 92, INK, { stroke: '#fff' }); K.slam(ctx, "ISN'T MY PRICE", 640, 205, 1, 92, P.red, { stroke: '#fff' }); });
    const y = bean(ctx, 300, 700, 1.0, t, Object.assign({}, Pr.YOU, { armR: [2.4, .3], face: { mouth: 'smile', brows: 'up', look: [.8, -.2] } }));
    const n = bean(ctx, 980, 700, 1.0, t, Object.assign({}, Pr.NEIGHBOUR, { armL: [2.4, .3], face: { mouth: 'frown', brows: 'angry', look: [-.8, -.2] } }));
    Pr.tag(ctx, y.hands.R[0] + 10, y.hands.R[1] + 10, .9, '$3.99', at(75.45), { color: '#d8f5d0' });
    Pr.tag(ctx, n.hands.L[0] - 10, n.hands.L[1] + 10, .9, '$4.79', at(75.6), { color: '#ffd6d0' });
    if (at(76.74) > 0) popAt(ctx, 640, 470, at(76.74), () => { sh(ctx, c => { c.moveTo(520, 470); c.quadraticCurveTo(640, 370, 760, 470); c.quadraticCurveTo(640, 570, 520, 470); }, '#fff', 6); sh(ctx, c => c.arc(640 + Math.sin(t * 2) * 30, 470, 40, 0, 7), P.blue, 5); sh(ctx, c => c.arc(640 + Math.sin(t * 2) * 30, 470, 16, 0, 7), INK, 0);
      txt(ctx, 'how much do they know?', 640, 600, HAND(700, 40), INK); });
  }
  // ================= SETUP =================
  const CR_CROP = [80, 280, 1030, 250];
  function desk(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-150, -20, 300, 26), '#b67f4c', 5); for (const lx of [-130, 130]) Tn.line(ctx, [[lx, 6], [lx, 120]], 10, '#7a5233'); ctx.restore(); }
  function s1(ctx, lt, dur, t) { // three groups: Consumer Reports, Groundwork Collaborative, More Perfect Union
    const T0 = 79.18, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff'); ctx.fillStyle = '#d4dbe8'; ctx.fillRect(0, 560, W, 160); Tn.line(ctx, [[0, 560], [W, 560]], 4, INK);
    popAt(ctx, 640, 60, at(79.3), () => { K.card(ctx, 420, 24, 440, 72, P.yellow, 16); txt(ctx, 'the investigation: 3 groups', 640, 60, HAND(700, 40)); });
    const G3 = [[230, 81.58, 'cr'], [640, 83.14, 'gw'], [1050, 89.3, 'mpu']];
    G3.forEach(([x, s, key], i) => { if (at(s - .3) <= 0) return;
      bean(ctx, x, 600, .8, t, Object.assign(Pr.extra(i * 3 + 1), { armL: [.4, 1.5], armR: [.4, 1.5], face: { mouth: 'flat', brows: 'angry', look: [0, .7] } }));
      desk(ctx, x, 560, 1); sh(ctx, c => c.roundRect(x - 60, 520, 120, 22, 4), '#fff', 3);
      if (key === 'cr') K.logo(ctx, 'cr', x, 170, 300, at(s), { crop: CR_CROP, h: 73, pad: 14 });
      else K.logo(ctx, key, x, 165, 120, at(s), { pad: 8 }); });
    if (at(85.3) > 0) popAt(ctx, 640, 268, at(85.3), () => { K.card(ctx, 500, 244, 280, 50, '#fff', 12); txt(ctx, 'progressive economic', 640, 261, PRINT(20), '#4a4f57'); txt(ctx, 'policy group', 640, 281, PRINT(20), '#4a4f57'); });
    if (at(87.72) > 0) popAt(ctx, 1050, 268, at(87.72), () => { K.card(ctx, 920, 244, 260, 50, '#fff', 12); txt(ctx, 'progressive', 1050, 261, PRINT(20), '#4a4f57'); txt(ctx, 'media outlet', 1050, 281, PRINT(20), '#4a4f57'); });
  }
  function s2(ctx, lt, dur, t) { // published December 9, 2025, "Same Cart, Different Price"
    const T0 = 90.99, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff1dc'); Pr.table(ctx, 600, '#c98f5a');
    for (let i = 0; i < 3; i++) sh(ctx, c => c.rect(820 + i * 8, 560 - i * 12, 320, 40), '#f4f1ea', 3);
    const dk = clamp(at(91.11) / .5), y = lerp(-300, 330, out(dk));
    ctx.save(); ctx.translate(480, y); ctx.rotate(lerp(-.3, -.03, dk)); sh(ctx, c => c.rect(-215 + 10, -215 + 12, 430, 430), 'rgba(0,0,0,.18)', 0); if (IMG.report) ctx.drawImage(IMG.report, -215, -215, 430, 430); sh(ctx, c => c.rect(-215, -215, 430, 430), null, 5); ctx.restore();
    K.stamp(ctx, 'DEC 9, 2025', 960, 230, at(91.83), { color: P.blue, size: 56, rot: .08 });
    if (at(94.85) > 0) { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = P.yellow; ctx.fillRect(280, 140 + (y - 330), 400 * out(clamp(at(94.85) / .5)), 80); ctx.restore(); }
    if (at(94.85) > 0) popAt(ctx, 990, 420, at(94.85), () => { K.card(ctx, 790, 370, 400, 100, '#fff', 18); txt(ctx, '"Same Cart,', 990, 402, HAND(700, 40)); txt(ctx, 'Different Price"', 990, 442, HAND(700, 40), P.red); });
    K.source(ctx, 'Groundwork Collaborative · Consumer Reports · More Perfect Union', at(91.5));
  }
  // rough outline of the lower 48 (lon, lat) for the city map
  const US = [[-124.7, 48.4], [-124.1, 46.2], [-124.4, 42.8], [-124.2, 40.4], [-122.4, 37.8], [-120.6, 34.6], [-117.1, 32.5], [-114.7, 32.7], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-104.5, 29.6], [-103, 29], [-101.4, 29.8], [-99.5, 27.5], [-97.4, 25.9],
    [-97.4, 27.8], [-95, 29.3], [-93.8, 29.7], [-91, 29.2], [-89.4, 29], [-89.6, 30.2], [-88, 30.7], [-85.3, 29.7], [-84, 30], [-82.8, 27.9], [-81.7, 25.9], [-80.4, 25.2], [-80.1, 26.7], [-80.6, 28.6], [-81.4, 30.5], [-81, 31.8], [-79, 33.6], [-76.5, 34.7], [-75.5, 35.6], [-76, 37], [-75.3, 38.4],
    [-74.1, 39.8], [-73.9, 40.6], [-71.9, 41.1], [-70, 41.7], [-70.7, 42.8], [-70.2, 43.7], [-67, 44.8], [-67.8, 47.1], [-69.2, 47.4], [-70.9, 45.3], [-74.9, 45], [-76.3, 44.2], [-79.1, 43.3], [-79, 42.8], [-82.5, 41.7], [-83.1, 42.1], [-82.4, 43], [-82.4, 45.2], [-84.5, 46.5], [-88, 48], [-89.6, 48], [-94.8, 49.3], [-95.2, 49], [-123, 49], [-122.8, 48.3]];
  const proj = (lon, lat) => [150 + (lon + 125) * 17.4, 90 + (50 - lat) * 22];
  function usMap(ctx, fill = '#bfe3a6') { sh(ctx, c => { US.forEach(([lo, la], i) => { const [x, y] = proj(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); }, fill, 5); }
  function s3(ctx, lt, dur, t) { // volunteers in four cities
    const T0 = 97.02, at = s => lt - (s - T0);
    K.bg.color(ctx, '#cfe9ff'); usMap(ctx);
    popAt(ctx, 700, 655, at(98.62), () => { K.card(ctx, 510, 619, 380, 72, '#fff', 16); txt(ctx, 'volunteers in 4 cities', 700, 655, HAND(700, 40)); });
    const C4 = [[-81.4, 40.88, 101.01, 'North Canton, OH', [0, 70]], [-93.1, 44.95, 102.82, 'Saint Paul, MN', [-40, 70]], [-122.3, 47.6, 104.23, 'Seattle, WA', [40, 70]], [-77.0, 38.9, 105.29, 'Washington, D.C.', [60, 120]]];
    C4.forEach(([lo, la, s, name, off], i) => { const [x, y] = proj(lo, la), k = at(s); if (k <= 0) return;
      for (let j = 0; j < 3; j++) popAt(ctx, x - 40 + j * 40, y + 6, k - .25 - j * .08, () => B.person(ctx, x - 40 + j * 40, y + 6, .2, Object.assign(Pr.extra(i * 3 + j), { face: { mouth: 'smile' } })));
      Pr.pin(ctx, x, y - 70, .7, k, [P.red, P.blue, P.purple, P.orange][i]);
      popAt(ctx, x + off[0], y + off[1], k - .15, () => { ctx.font = HAND(700, 30); const w = ctx.measureText(name).width + 30; K.card(ctx, x + off[0] - w / 2, y + off[1] - 24, w, 48, '#fff', 12); txt(ctx, name, x + off[0], y + off[1], HAND(700, 30)); }); });
    K.source(ctx, 'Source: "Same Cart, Different Price" (Dec 9, 2025)', at(101));
  }
  const TGT_CROP = [365, 100, 200, 235];
  function s4(ctx, lt, dur, t) { // same 20 grocery items, same store, same time, mostly at Safeway and Target
    const T0 = 107.03, at = s => lt - (s - T0);
    K.bg.sky(ctx); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(0, 590, W, 40); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 630, W, 90); Tn.line(ctx, [[0, 590], [W, 590]], 4, INK);
    Pr.store(ctx, 330, 592, .85, 'safeway', { crop: [0, 0, 1069, 1200], trim: '#e1251b', awning: '#e1251b', w: 480, h: 360, logoH: 96 });
    Pr.store(ctx, 950, 592, .85, 'target', { crop: TGT_CROP, trim: '#cc0000', awning: '#cc0000', w: 480, h: 360, logoH: 96 });
    for (let i = 0; i < 4; i++) { const x = 170 + i * 310 + (i > 1 ? 0 : 0); const p = bean(ctx, x, 700, .55, t, Object.assign(Pr.extra(i + 8), { armR: [.7, 1.4], face: { mouth: 'flat', look: [0, .7] } }));
      popAt(ctx, p.hands.R[0] + 24, p.hands.R[1] - 20, at(108.59) - i * .08, () => { sh(ctx, c => c.roundRect(p.hands.R[0], p.hands.R[1] - 60, 54, 72, 6), '#fff', 3.5); for (let j = 0; j < 4; j++) Tn.line(ctx, [[p.hands.R[0] + 8, p.hands.R[1] - 46 + j * 14], [p.hands.R[0] + 46, p.hands.R[1] - 46 + j * 14]], 2.5, '#9aa3ad'); }); }
    if (at(108.59) > 0) popAt(ctx, 640, 80, at(108.59), () => { K.card(ctx, 440, 40, 400, 80, '#fff', 16); txt(ctx, 'the same 20 items', 640, 80, HAND(700, 44)); });
    wallClock(ctx, 640, 250, 70, 0, at(111.19));
    if (at(111.48) > 0) txt(ctx, 'same time', 640, 350, HAND(700, 36), INK, 'center', clamp(at(111.48) / .3));
    K.source(ctx, 'Logos: Safeway, Target', at(112.7));
  }
  function pie(ctx, x, y, r, frac, lt) { // a bakery pie; frac of it glazed red = "items with different prices"
    sh(ctx, c => c.ellipse(x, y + 18, r * 1.08, r * .42, 0, 0, 7), '#c88a4a', 5);
    sh(ctx, c => c.ellipse(x, y, r, r * .38, 0, 0, 7), '#f2c47c', 5);
    const e = frac * out(clamp(lt / 1.0)); if (e > 0) sh(ctx, c => { c.moveTo(x, y); c.ellipse(x, y, r * .9, r * .34, 0, -Math.PI / 2, -Math.PI / 2 + e * Math.PI * 2); c.closePath(); }, P.red, 4);
  }
  function s5(ctx, lt, dur, t) { // nearly three-quarters of the items showed different prices to different shoppers
    const T0 = 113.95, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    if (at(114.52) > 0) popAt(ctx, 640, 70, at(114.52), () => { K.card(ctx, 440, 34, 400, 72, '#fff', 16); txt(ctx, "here's what they found", 640, 70, HAND(700, 40)); });
    bean(ctx, 640, 520, .8, t, Object.assign(Pr.extra(4), { top: 'shirt', body: '#fff', face: { mouth: 'smile', look: [0, .6] } }));
    sh(ctx, c => c.roundRect(260, 400, 760, 300, 18), 'rgba(220,240,255,.75)', 6); sh(ctx, c => c.rect(260, 560, 760, 20), '#d9d4c8', 4);
    pie(ctx, 640, 500, 260, .72, at(115.72));
    if (at(115.98) > 0) popAt(ctx, 1080, 300, at(115.98), () => { K.card(ctx, 960, 230, 240, 140, P.red, 18); txt(ctx, 'nearly ¾', 1080, 280, HAND(700, 50), '#fff'); txt(ctx, 'of items', 1080, 330, PRINT(24), '#fff'); });
    if (at(117.96) > 0) popAt(ctx, 640, 650, at(117.96), () => { K.card(ctx, 330, 620, 620, 60, '#fff', 14); txt(ctx, 'different prices for different shoppers', 640, 650, PRINT(28)); });
  }
  function cereal(ctx, x, y, s, label = 'CEREAL', col = P.orange) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => c.rect(-80, -230, 160, 230), col, 5); sh(ctx, c => c.ellipse(0, -110, 56, 40, 0, 0, 7), '#fff', 3.5); for (let i = 0; i < 6; i++) sh(ctx, c => c.arc(-24 + (i % 3) * 24, -118 + Math.floor(i / 3) * 18, 9, 0, 7), '#e8b04a', 2.5); txt(ctx, label, 0, -190, HAND(700, 34), '#fff'); ctx.restore(); }
  function s6(ctx, lt, dur, t) { // some items had up to five different prices at the same time
    const T0 = 120.29, at = s => lt - (s - T0);
    K.bg.color(ctx, '#f3ecff');
    cereal(ctx, 640, 560, 1.4);
    const n = Math.min(5, Math.floor(clamp(at(121.2) / .9) * 5 + (at(121.2) > 0 ? 1 : 0)));
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i - 2) * .55, x = 640 + Math.cos(a) * 360, y = 420 + Math.sin(a) * 300 + 80; Pr.tag(ctx, x, y, 1, 'price ' + (i + 1), at(121.2) - i * .18, { color: ['#d8f5d0', '#fff', '#fff3c4', '#ffe1c8', '#ffd6d0'][i], size: 30 }); }
    if (at(121.57) > 0) popAt(ctx, 640, 660, at(121.57), () => { K.card(ctx, 380, 626, 520, 68, P.purple, 16); txt(ctx, 'up to 5 prices at once', 640, 660, HAND(700, 40), '#fff'); });
  }
  function coinStack(ctx, x, base, h, col = P.yellow) { const n = Math.floor(h / 18); for (let i = 0; i < n; i++) { sh(ctx, c => c.ellipse(x, base - i * 18, 70, 18, 0, 0, 7), '#d9a62e', 3); sh(ctx, c => c.ellipse(x, base - i * 18 - 6, 70, 18, 0, 0, 7), col, 3); } return base - n * 18; }
  function s7(ctx, lt, dur, t) { // basics like cereal, pasta, peanut butter: highest up to 23% above the lowest
    const T0 = 123.78, at = s => lt - (s - T0);
    K.bg.white(ctx);
    [[230, 124.5, 'cereal'], [380, 124.97, 'pasta'], [530, 125.66, 'peanut butter']].forEach(([x, s, l], i) => popAt(ctx, x, 180, at(s), () => {
      if (i === 0) cereal(ctx, x, 210, .45); else if (i === 1) { sh(ctx, c => c.roundRect(x - 40, 110, 80, 100, 8), '#3b7dd8', 4); for (let j = 0; j < 5; j++) Tn.line(ctx, [[x - 20 + j * 10, 120], [x - 20 + j * 10, 160]], 3, '#f6d27a'); }
      else { sh(ctx, c => c.roundRect(x - 38, 120, 76, 90, 14), '#c98b4a', 4); sh(ctx, c => c.roundRect(x - 42, 108, 84, 22, 6), P.red, 4); }
      txt(ctx, l, x, 245, PRINT(24)); }));
    const g = out(clamp(at(126.77) / 1.0)), lo = 260 * g, hi = 260 * 1.23 * g;
    const tLo = coinStack(ctx, 820, 640, lo), tHi = coinStack(ctx, 1060, 640, hi, '#ffd86b');
    if (g > .9) { txt(ctx, 'lowest', 820, 680, HAND(700, 34)); txt(ctx, 'highest', 1060, 680, HAND(700, 34), P.red);
      Tn.line(ctx, [[760, tLo - 6], [1140, tLo - 6]], 3, '#9aa3ad'); K.arrow(ctx, [1160, tLo - 6], [1160, tHi - 8], clamp(at(127.92) / .4), P.red, 5); }
    K.slam(ctx, '+23%', 1060, tHi - 70, at(128.22), 90, P.red);
    if (at(127.72) > 0) txt(ctx, 'up to', 940, tHi - 130, HAND(700, 34), INK, 'center', clamp(at(127.72) / .3));
    bean(ctx, 600, 690, .8, t, Object.assign({}, Pr.YOU, { face: { mouth: at(128.4) > 0 ? 'o' : 'flat', brows: 'up', look: [.8, -.6] } }));
  }
  // one long aisle, three stations; the camera pans from one to the next
  const STATIONS = [
    { x: 640, item: 'skippy', sign: 'Target · Ohio', logo: 'target', crop: TGT_CROP, lo: '$2.99', hi: '$3.59', tLo: 132.94, tHi: 134.53, tIn: 130.24 },
    { x: 1920, item: 'wheat', sign: 'Safeway · Seattle', logo: 'safeway', crop: [0, 0, 1069, 1200], lo: '$3.99', hi: '$4.89', tLo: 140.0, tHi: 140.85, tIn: 136.92, needle: true },
    { x: 3200, item: 'cheerios', sign: 'Target · St. Paul', logo: 'target', crop: TGT_CROP, lo: '$3.99', hi: '$4.59', tLo: 145.06, tHi: 145.93, tIn: 142.39 },
  ];
  function product(ctx, key, x, y) { // product on the shelf, base at y
    if (key === 'cheerios') { sh(ctx, c => c.rect(x - 70, y - 200, 140, 200), '#f6c945', 5); sh(ctx, c => c.ellipse(x, y - 90, 48, 36, 0, 0, 7), '#fff', 3); for (let i = 0; i < 5; i++) sh(ctx, c => c.arc(x - 24 + (i % 3) * 24, y - 98 + Math.floor(i / 3) * 18, 8, 0, 7), '#e3a93c', 2.5); txt(ctx, 'Cheerios', x, y - 165, HAND(700, 32), '#1d4f91'); return; }
    const im = IMG[key]; if (!im) return; const h = key === 'skippy' ? 200 : 220, w = h * im.width / im.height;
    if (key === 'wheat') { ctx.drawImage(im, 180, 40, 840, 1120, x - 82, y - 220, 164, 220); return; }
    ctx.drawImage(im, x - w / 2, y - h, w, h);
  }
  function aisle(ctx, lt, dur, t) { // s8–s10: Skippy (Target, Ohio) → Wheat Thins (Safeway, Seattle) → Cheerios (Target, St. Paul)
    const T = lt + 130.24, cam = tween(T, [[130.24, 640], [136.6, 640], [137.4, 1920], [142.0, 1920], [142.8, 3200]]);
    K.bg.color(ctx, '#fff8ec');
    ctx.save(); ctx.translate(640 - cam, 0);
    sh(ctx, c => c.rect(-200, 150, 3800, 420), '#f1ece2', 4); for (let r = 0; r < 3; r++) Tn.line(ctx, [[-200, 260 + r * 110], [3600, 260 + r * 110]], 5, '#b9ae9a');
    ctx.fillStyle = '#d9d2c4'; ctx.fillRect(-200, 570, 3800, 200); Tn.line(ctx, [[-200, 570], [3600, 570]], 4, INK);
    STATIONS.forEach((S, i) => { const at = s => T - s;
      if (S.needle) { sh(ctx, c => c.rect(S.x + 260, 170, 170, 200), '#bfe6ff', 5); ctx.fillStyle = '#7b8aa8'; ctx.fillRect(S.x + 340, 220, 8, 150); ctx.beginPath(); ctx.ellipse(S.x + 344, 225, 34, 10, 0, 0, 7); ctx.fill(); Tn.line(ctx, [[S.x + 344, 215], [S.x + 344, 180]], 3, '#7b8aa8'); }
      Tn.line(ctx, [[S.x - 120, 0], [S.x - 120, 40]], 3, INK); Tn.line(ctx, [[S.x + 120, 0], [S.x + 120, 40]], 3, INK);
      K.card(ctx, S.x - 190, 40, 380, 84, '#fff', 14); if (IMG[S.logo]) ctx.drawImage(IMG[S.logo], ...S.crop, S.x - 176, 48, S.crop[2] * 68 / S.crop[3], 68); txt(ctx, S.sign, S.x + 36, 82, HAND(700, 34));
      sh(ctx, c => c.rect(S.x - 130, 340, 260, 26), '#d9d4c8', 4); product(ctx, S.item, S.x, 340);
      const a = bean(ctx, S.x - 260, 700, .95, t, Object.assign({}, i === 1 ? Pr.extra(2) : Pr.YOU, { face: { mouth: at(S.tLo) > 0 ? 'smile' : 'flat', brows: 'up', look: [.6, -.3] } }));
      const b = bean(ctx, S.x + 260, 700, .95, t, Object.assign({}, i === 1 ? Pr.extra(5) : Pr.NEIGHBOUR, { face: { mouth: at(S.tHi) > 0 ? 'frown' : 'flat', brows: at(S.tHi) > 0 ? 'angry' : 'calm', look: [-.6, -.3] } }));
      K.bubble(ctx, S.lo, S.x - 260, 230, 170, [S.x - 260, 300], at(S.tLo), { size: 48, fill: '#d8f5d0' });
      K.bubble(ctx, S.hi, S.x + 260, 230, 170, [S.x + 260, 300], at(S.tHi), { size: 48, fill: '#ffd6d0' }); });
    ctx.restore();
    K.source(ctx, 'Prices: AP (Dec 11, 2025) · Cheerios box drawn', lt);
  }
  function s11(ctx, lt, dur, t) { // the sale price stayed the same, but the "original" price changed — the discount looked bigger
    const T0 = 147.45, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eaf7ff');
    const grow = out(clamp(at(151.48) / .8));
    [[380, .0], [900, 1]].forEach(([x, big], i) => {
      const was = 120 + big * 170 * grow;
      popAt(ctx, x, 250, at(147.6 + i * .15), () => { K.card(ctx, x - 200, 150, 400, 220, '#fff', 20);
        txt(ctx, 'WAS', x - 160, 210, PRINT(28), '#6a7380', 'left'); sh(ctx, c => c.roundRect(x - 90, 194, was, 32, 8), '#c9ced6', 0); K.strike(ctx, x - 96, 210, x - 84 + was, 210, 1, P.red, 6);
        txt(ctx, 'NOW', x - 160, 300, PRINT(28), P.green, 'left'); sh(ctx, c => c.roundRect(x - 90, 280, 150, 40, 10), P.green, 0); txt(ctx, 'same', x - 15, 300, HAND(700, 30), '#fff'); });
      if (at(153.5) > 0) K.stamp(ctx, big ? 'BIG SAVINGS!' : 'save', x + 110, 120, at(153.5 + i * .2), { color: big ? P.red : '#7a8088', size: big ? 50 : 32, rot: big ? .12 : -.08 });
    });
    if (at(149.99) > 0) txt(ctx, 'sale price: the same for both', 640, 410, HAND(700, 34), P.green, 'center', clamp(at(149.99) / .3));
    bean(ctx, 300, 720, .75, t, Object.assign({}, Pr.YOU, { face: { mouth: 'flat', look: [.6, -.4] } }));
    bean(ctx, 980, 720, .75, t, Object.assign({}, Pr.NEIGHBOUR, { face: { mouth: at(154.1) > 0 ? 'grin' : 'flat', brows: 'up', blush: at(154.1) > 0, look: [-.4, -.4] } }));
    if (at(156.38) > 0) popAt(ctx, 640, 600, at(156.38), () => { K.card(ctx, 470, 555, 340, 90, '#fff', 18); txt(ctx, '=', 640, 585, HAND(700, 60), P.blue); txt(ctx, 'they pay the same', 640, 625, PRINT(24)); });
    txt(ctx, 'illustration', 1240, 700, PRINT(18), '#8a93a0', 'right');
  }
  function till(ctx, x, y, len) { // checkout till with a receipt curling out, len px long
    sh(ctx, c => c.roundRect(x - 90, y - 120, 180, 120, 14), '#6c7a8f', 5); sh(ctx, c => c.roundRect(x - 60, y - 105, 120, 36, 6), '#b8ffcf', 3);
    sh(ctx, c => c.rect(x - 50, y - 120 - len, 100, len), '#fff', 3.5); for (let yy = y - 110 - len + 18; yy < y - 128; yy += 18) Tn.line(ctx, [[x - 36, yy], [x + 36, yy]], 2.5, '#c9ced6');
  }
  function cart(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, c => { c.moveTo(-90, -110); c.lineTo(90, -110); c.lineTo(70, -30); c.lineTo(-70, -30); c.closePath(); }, '#e9edf1', 5); for (let i = 0; i < 4; i++) sh(ctx, c => c.roundRect(-70 + i * 36, -150, 30, 44, 5), [P.yellow, P.red, P.blue, P.green][i], 3); Tn.line(ctx, [[90, -110], [120, -150]], 6, INK); for (const wx of [-56, 56]) sh(ctx, c => c.arc(wx, -10, 14, 0, 7), INK, 0); ctx.restore(); }
  function s12(ctx, lt, dur, t) { // the exact same cart, same store, same time: the total varied by about 7% on average
    const T0 = 158.63, at = s => lt - (s - T0);
    K.bg.color(ctx, '#fff4e0'); ctx.fillStyle = '#d9d2c4'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    const g = out(clamp(at(164.44) / 1.0)), L = 300 * g;
    till(ctx, 380, 600, L); till(ctx, 900, 600, L * 1.07);
    cart(ctx, 160, 600, .9); cart(ctx, 680, 600, .9);
    [[160.99, 'same cart'], [162.19, 'same store'], [163.28, 'same time']].forEach(([s, l], i) => popAt(ctx, 150, 80 + i * 70, at(s), () => { K.card(ctx, 40, 52 + i * 70, 220, 56, '#fff', 14); txt(ctx, l, 165, 81 + i * 70, HAND(700, 30)); K.check(ctx, 66, 80 + i * 70, 28, clamp(at(s) / .3)); }));
    if (g > .95) { const y1 = 600 - 120 - L, y2 = 600 - 120 - L * 1.07; Tn.line(ctx, [[330, y1], [1010, y1]], 3, '#9aa3ad'); Tn.line(ctx, [[960, y1], [1010, y1]], 4, P.red); Tn.line(ctx, [[960, y2], [1010, y2]], 4, P.red); Tn.line(ctx, [[1000, y1], [1000, y2]], 4, P.red);
      popAt(ctx, 1090, y2 + 10, at(165.13), () => { K.card(ctx, 1020, y2 - 30, 220, 80, P.red, 16); txt(ctx, '≈7%', 1130, y2 + 10, HAND(700, 50), '#fff'); }); }
    if (at(165.83) > 0) txt(ctx, 'on average', 1130, 600 - 120 - L * 1.07 + 80, HAND(700, 34), P.red, 'center', clamp(at(165.83) / .3));
  }
  function s13(ctx, lt, dur, t) { // applied to a family of four's grocery spend: a swing of about $1,200 a year
    const T0 = 166.9, at = s => lt - (s - T0);
    K.bg.cream(ctx);
    [[150, Pr.extra(1), 1], [260, Pr.extra(4), 1], [350, Pr.extra(7), .65], [430, Pr.extra(2), .6]].forEach(([x, o, s], i) => bean(ctx, x, 690, s, t, Object.assign(o, { face: { mouth: at(174.28) > 0 ? 'o' : 'smile', brows: at(174.28) > 0 ? 'up' : 'calm', look: [.8, -.2] } })));
    if (at(169.79) > 0) popAt(ctx, 290, 120, at(169.79), () => { K.card(ctx, 150, 80, 280, 80, '#fff', 16); txt(ctx, 'family of four', 290, 120, HAND(700, 40)); });
    const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], bag = [1060, 560];
    M.forEach((m, i) => { const cx = 600 + (i % 4) * 110, cy = 230 + Math.floor(i / 4) * 110; popAt(ctx, cx, cy, at(171.39) - i * .03, () => { K.card(ctx, cx - 46, cy - 46, 92, 92, '#fff', 10); sh(ctx, c => c.rect(cx - 46, cy - 46, 92, 22), P.red, 0); txt(ctx, m, cx, cy - 35, PRINT(18), '#fff'); });
      const fk = clamp((at(172.47) - i * .12) / .6); if (fk > 0 && fk < 1) { const fx = lerp(cx, bag[0], inout(fk)), fy = lerp(cy, bag[1] - 80, inout(fk)) - Math.sin(fk * Math.PI) * 120; ctx.save(); ctx.translate(fx, fy); ctx.rotate(fk * 6); sh(ctx, c => c.roundRect(-34, -18, 68, 36, 5), '#7fcf7a', 3); txt(ctx, '$', 0, 1, HAND(700, 28), '#1f5c2a'); ctx.restore(); } });
    popAt(ctx, bag[0], bag[1], at(172.3), () => { sh(ctx, c => { c.moveTo(bag[0] - 40, bag[1] - 150); c.quadraticCurveTo(bag[0] - 140, bag[1] - 40, bag[0] - 110, bag[1] + 40); c.lineTo(bag[0] + 110, bag[1] + 40); c.quadraticCurveTo(bag[0] + 140, bag[1] - 40, bag[0] + 40, bag[1] - 150); c.closePath(); }, '#d9b98a', 5); txt(ctx, '$', bag[0], bag[1] - 20, HAND(700, 90), '#6b4a1d'); });
    const v = Math.round(1200 * out(clamp((at(172.47)) / 2.2)) / 10) * 10;
    if (at(172.47) > 0) popAt(ctx, 1060, 300, at(172.47), () => { K.card(ctx, 920, 230, 280, 130, '#fff', 18); txt(ctx, '~$' + v.toLocaleString('en-US'), 1060, 280, HAND(700, 60), P.red); txt(ctx, 'a year', 1060, 335, PRINT(26)); });
    if (at(172.47) > 0) K.stamp(ctx, 'ESTIMATE', 1060, 170, at(172.6), { color: P.blue, size: 38, rot: .06 });
    if (at(175.14) > 0) txt(ctx, '≈ $100 a month (our math)', 860, 690, PRINT(24), '#6a5a48', 'center', clamp(at(175.14) / .3));
    K.source(ctx, 'Researchers\' estimate: ~7% × a family of four\'s grocery spend', at(167.9));
  }
  function s14(ctx, lt, dur, t) { // before we go further, I need to be really clear about one thing
    const T0 = 176.49, at = s => lt - (s - T0);
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6');
    host(ctx, 420, 700, 1.15, t, [[T0, 'presentBoth'], [178.8, 'pointUp'], [180.4, 'present']], { mouth: 'flat', brows: 'neutral', look: [.4, 0] });
    popAt(ctx, 900, 330, at(177.3), () => { ctx.save(); ctx.translate(900, 330); ctx.rotate(.05); sh(ctx, c => c.rect(-170, -150, 340, 300), P.yellow, 5); sh(ctx, c => c.rect(-60, -165, 120, 34), 'rgba(255,255,255,.7)', 0); txt(ctx, 'IMPORTANT', 0, -60, HAND(700, 60), P.red); txt(ctx, 'one thing,', 0, 20, HAND(700, 44)); txt(ctx, 'really clear', 0, 80, HAND(700, 44)); ctx.restore(); });
    if (at(179.1) > 0) K.scribbleCircle(ctx, 900, 410, 150, 50, clamp(at(179.1) / .6), P.red, 6);
  }
  function s15(ctx, lt, dur, t) { // no evidence Instacart set prices by your income, ZIP code, or shopping history
    const T0 = 183.03, at = s => lt - (s - T0);
    K.bg.color(ctx, '#eef3ff'); ctx.fillStyle = '#d4dbe8'; ctx.fillRect(0, 620, W, 100); Tn.line(ctx, [[0, 620], [W, 620]], 4, INK);
    popAt(ctx, 640, 64, at(183.3), () => { K.card(ctx, 250, 28, 780, 72, '#fff', 16); txt(ctx, 'Researchers found NO evidence Instacart priced by…', 640, 64, HAND(700, 34)); });
    sh(ctx, c => c.rect(560, 150, 330, 470), '#9aa6b8', 5);
    [[187.35, 'INCOME'], [188.34, 'ZIP CODE'], [189.75, 'SHOPPING HISTORY']].forEach(([s, l], i) => { const y = 180 + i * 145, o = out(clamp(at(s) / .35)) * 120;
      sh(ctx, c => c.rect(578 - o * .2, y, 294, 120), '#c8d1de', 4); if (o > 0) sh(ctx, c => c.rect(578 - o, y + 10, 120, 100), '#e9edf1', 4);
      txt(ctx, l, 725 - o * .2, y + 40, PRINT(26)); sh(ctx, c => c.roundRect(690 - o * .2, y + 70, 70, 16, 8), '#6c7a8f', 0);
      K.stamp(ctx, 'NO EVIDENCE', 1080, y + 60, at(s + .3), { color: P.green, size: 40, rot: -.06 }); });
    const r = bean(ctx, 300, 690, 1.0, t, Object.assign(Pr.extra(2), { armR: [1.6, .4], face: { mouth: 'flat', brows: 'up', look: [.9, 0] } }));
    sh(ctx, c => c.arc(r.hands.R[0] + 50, r.hands.R[1] - 30, 40, 0, 7), 'rgba(191,230,255,.4)', 7); Tn.line(ctx, [[r.hands.R[0], r.hands.R[1]], [r.hands.R[0] + 22, r.hands.R[1] - 12]], 9, '#8a5a36');
    K.source(ctx, 'Source: "Same Cart, Different Price"; AP (Dec 2025)', at(184));
  }
  function dice(ctx, x, y, s, rot, n) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sh(ctx, c => c.roundRect(-40, -40, 80, 80, 14), '#fff', 5); const D = { 1: [[0, 0]], 3: [[-20, -20], [0, 0], [20, 20]], 5: [[-20, -20], [20, -20], [0, 0], [-20, 20], [20, 20]], 6: [[-20, -22], [-20, 0], [-20, 22], [20, -22], [20, 0], [20, 22]] }; ctx.fillStyle = INK; for (const [a, b] of D[n] || D[5]) { ctx.beginPath(); ctx.arc(a, b, 7, 0, 7); ctx.fill(); } ctx.restore(); }
  function s16(ctx, lt, dur, t) { // Instacart: never based on personal or behavioral characteristics; randomized, short-term, run by the stores
    const T0 = 191.19, at = s => lt - (s - T0), part2 = at(196.47) > 0;
    K.bg.color(ctx, '#e9f6ef');
    K.logo(ctx, 'instacart', 200, 110, 220, at(191.3), { crop: INSTA, pad: 0, card: false, round: 14 });
    if (!part2) {
      popAt(ctx, 700, 330, at(191.9), () => { K.card(ctx, 270, 200, 860, 260, '#fff', 24); B.curve(ctx, [700, 460], [720, 500], [660, 520], 5);
        txt(ctx, 'Instacart said its tests were', 700, 250, PRINT(28), '#6a7380'); txt(ctx, '"never based on personal', 700, 320, HAND(700, 54)); txt(ctx, 'or behavioral characteristics."', 700, 390, HAND(700, 54)); });
      if (at(193.56) > 0) { ctx.save(); ctx.globalAlpha = .3; ctx.fillStyle = P.yellow; ctx.fillRect(320, 285, 760 * out(clamp(at(193.56) / .8)), 140); ctx.restore(); }
    } else {
      const R = [[300, 197.34, 'randomized'], [640, 198.11, 'short-term'], [980, 199.29, 'run by the stores']];
      R.forEach(([x, s, l], i) => { const k = at(s); if (k <= 0) return; popAt(ctx, x, 330, k, () => { K.card(ctx, x - 150, 190, 300, 300, '#fff', 22); txt(ctx, l, x, 450, HAND(700, 38));
        if (i === 0) { dice(ctx, x - 45, 320, 1, Math.sin(k * 8) * Math.exp(-k * 2) * 2, 5); dice(ctx, x + 50, 300, .9, -Math.sin(k * 7) * Math.exp(-k * 2) * 2, 3); }
        else if (i === 1) { sh(ctx, c => c.arc(x, 320, 80, 0, 7), '#fff', 6); sh(ctx, c => c.rect(x - 14, 220, 28, 22), INK, 0); const a = k * 4; Tn.line(ctx, [[x, 320], [x + Math.sin(a) * 64, 320 - Math.cos(a) * 64]], 6, P.red); }
        else { B.person(ctx, x - 40, 420, .5, Object.assign(Pr.extra(6), { body: P.red, armR: [1.4, .3], face: { mouth: 'smile', look: [.9, 0] } })); sh(ctx, c => c.roundRect(x + 10, 270, 70, 40, 8), P.orange, 4); Tn.line(ctx, [[x + 30, 310], [x + 22, 350]], 10, INK); Pr.tag(ctx, x + 100, 300, .6, '$', at(200.49), { color: '#fff' }); } }); });
      if (at(200.49) > 0) popAt(ctx, 980, 560, at(200.49), () => { K.card(ctx, 840, 528, 280, 64, P.green, 14); txt(ctx, 'stores set prices', 980, 560, HAND(700, 34), '#fff'); });
    }
    K.source(ctx, 'Source: Instacart statements via AP (Dec 11, 2025)', at(191.6));
  }
  function s17(ctx, lt, dur, t) { // so this wasn't Instacart reading your mind — it was something else, and still pretty wild
    const T0 = 202.14, at = s => lt - (s - T0), flask = at(205.81) > 0;
    K.bg.studio(ctx, '#d9ccff', '#f4efff');
    host(ctx, 400, 700, 1.15, t, [[T0, 'pointSide'], [204.6, 'shrug'], [205.8, 'present']], { mouth: flask ? 'smirk' : 'flat', brows: flask ? 'up' : 'skeptic', eyes: flask ? 'open' : 'open', look: [.6, 0] });
    if (!flask) { popAt(ctx, 880, 380, at(202.69), () => { sh(ctx, c => c.roundRect(800, 470, 160, 50, 10), '#8a5a36', 5); sh(ctx, c => c.arc(880, 380, 110, 0, 7), 'rgba(190,160,255,.6)', 6); sh(ctx, c => { c.moveTo(820, 380); c.quadraticCurveTo(880, 330, 940, 380); c.quadraticCurveTo(880, 430, 820, 380); }, '#fff', 4); sh(ctx, c => c.arc(880, 380, 18, 0, 7), INK, 0); });
      txt(ctx, 'mind-reading', 880, 560, HAND(700, 38), INK, 'center', clamp(at(203.33) / .3)); K.cross(ctx, 880, 380, 220, clamp(at(203.7) / .4)); }
    else { const hx = 400 + 235 * 1.15, hy = 700 - 300 * 1.15;
      ctx.save(); ctx.translate(hx, hy - 6); sh(ctx, c => { c.moveTo(-20, -150); c.lineTo(20, -150); c.lineTo(20, -90); c.lineTo(70, 0); c.lineTo(-70, 0); c.lineTo(-20, -90); c.closePath(); }, 'rgba(230,240,255,.8)', 5);
      sh(ctx, c => { c.moveTo(-44, -50); c.lineTo(44, -50); c.lineTo(68, -2); c.lineTo(-68, -2); c.closePath(); }, P.green, 0);
      for (let i = 0; i < 4; i++) { const k = (t * .8 + i * .25) % 1; ctx.fillStyle = 'rgba(80,200,120,.8)'; ctx.beginPath(); ctx.arc(Math.sin(i * 2) * 12, -150 - k * 90, 8 + i * 2, 0, 7); ctx.globalAlpha = 1 - k; ctx.fill(); ctx.globalAlpha = 1; }
      ctx.restore();
      popAt(ctx, 1000, 260, at(205.95), () => { K.card(ctx, 830, 200, 340, 120, '#fff', 18); txt(ctx, 'something else…', 1000, 240, HAND(700, 40)); txt(ctx, 'still pretty wild', 1000, 290, HAND(700, 36), P.red); }); }
  }
  const SH = [[0, 2.82, c1], [2.82, 5.81, c2], [5.81, 7.99, c3], [7.99, 11.16, c4], [11.16, 15.83, c5], [15.83, 18.3, c6], [18.3, 26.05, c7], [26.05, 30.19, c8],
    [30.19, 36.17, c9], [36.17, 41.43, c10], [41.43, 46.46, c11], [46.46, 49.88, c12], [49.88, 57.31, c13], [57.31, 63.19, c14], [63.19, 68.46, c15], [68.46, 74.07, c16], [74.07, 79.18, c17],
    [79.18, 90.99, s1], [90.99, 97.02, s2], [97.02, 107.03, s3], [107.03, 113.95, s4], [113.95, 120.29, s5], [120.29, 123.78, s6], [123.78, 130.24, s7], [130.24, 147.45, aisle],
    [147.45, 158.63, s11], [158.63, 166.9, s12], [166.9, 176.49, s13], [176.49, 183.03, s14], [183.03, 191.19, s15], [191.19, 202.14, s16], [202.14, 209.21, s17]];
  const DUR = 209.21;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 })).concat([136.9, 142.1].map(t => ({ t, type: 'whoosh', gain: .5 })));
  const pops = [0.6, 3.5, 6.58, 9.53, 11.79, 13.2, 16.41, 26.36, 27.28, 28.24, 28.87, 29.47, 30.6, 38.62, 41.72, 43.52, 45.0, 46.75, 48.25, 50.38, 55.32, 59.35, 64.22, 70.64, 74.2, 76.74,
    79.3, 81.58, 83.14, 85.3, 87.72, 89.3, 94.85, 98.62, 108.59, 114.52, 115.98, 117.96, 121.57, 124.5, 124.97, 125.66, 149.99, 156.38, 160.99, 162.19, 163.28, 169.79, 177.3, 183.3, 191.9, 197.34, 198.11, 199.29, 200.49, 205.95]
    .map(t => ({ t, type: 'pop', gain: .45 }));
  const hits = [[0.25, 'paper'], [1.5, 'click'], [3.16, 'thud'], [8.94, 'boing'], [9.2, 'ding'], [12.6, 'click'], [14.9, 'click'], [19.13, 'tick'], [21.23, 'tick'], [21.75, 'tick'], [22.85, 'tick'], [24.87, 'buzz'],
    [33.95, 'cash'], [34.16, 'thud'], [37.38, 'stamp'], [44.4, 'tick'], [44.6, 'tick'], [44.8, 'tick'], [47.73, 'thud'], [47.9, 'stamp'], [55.78, 'ding'], [60.1, 'type'], [61.63, 'stamp'], [65.94, 'buzz'], [72.6, 'thud'], [72.96, 'stamp'],
    [91.4, 'paper'], [91.83, 'stamp'], [101.01, 'boing'], [102.82, 'boing'], [104.23, 'boing'], [105.29, 'boing'], [111.19, 'tick'], [115.72, 'swoosh'], [121.2, 'ding'], [126.8, 'rise'], [128.22, 'thud'],
    [132.94, 'ding'], [134.53, 'buzz'], [140.0, 'ding'], [140.85, 'buzz'], [145.06, 'ding'], [145.93, 'buzz'], [151.48, 'rise'], [153.5, 'stamp'], [164.44, 'type'], [165.13, 'ding'], [172.47, 'cash'], [174.28, 'cash'], [172.6, 'stamp'],
    [179.1, 'swoosh'], [187.65, 'stamp'], [188.64, 'stamp'], [190.05, 'stamp'], [197.34, 'boing'], [198.11, 'tick'], [200.49, 'click'], [203.7, 'buzz'], [205.95, 'ding']].map(([t, type]) => ({ t, type, gain: .55 }));
  const tiles = Array.from({ length: 10 }, (_, i) => ({ t: 3.0 + i * .15, type: 'tick', gain: .35 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/pricing-1.mp3', shots,
    sfx: cuts.concat(pops, hits, tiles), musicGain: .3,
    moods: [{ t: 0, mood: 'investigate' }, { t: 49.88, mood: 'tense' }, { t: 74.07, mood: 'bright' }, { t: 147.45, mood: 'investigate' }, { t: 166.9, mood: 'bright' }, { t: 176.49, mood: 'soft' }, { t: 204.6, mood: 'investigate' }],
    images: { instacart: 'assets/pricing/instacart.png', safeway: 'assets/pricing/safeway.png', ftc: 'assets/pricing/ftc-seal.png', cr: 'assets/pricing/consumer-reports.png', gw: 'assets/pricing/groundwork-collaborative.png',
      mpu: 'assets/pricing/more-perfect-union.png', report: 'assets/pricing/same-cart-different-price.png', target: 'assets/pricing/target.png', skippy: 'assets/pricing/skippy.png', wheat: 'assets/pricing/wheat-thins.png' },
    fonts: G.BizFont.load };
})(window);
