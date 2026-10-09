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

  const SH = [[0, 2.82, c1], [2.82, 5.81, c2], [5.81, 7.99, c3], [7.99, 11.16, c4]];
  const DUR = 11.16;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [0.6, 3.5, 6.58, 9.53].map(t => ({ t, type: 'pop', gain: .5 }));
  const hits = [[0.25, 'paper'], [1.5, 'click'], [3.16, 'thud'], [8.94, 'boing'], [9.2, 'ding']].map(([t, type]) => ({ t, type, gain: .6 }));
  const tiles = Array.from({ length: 10 }, (_, i) => ({ t: 3.0 + i * .15, type: 'tick', gain: .35 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/pricing-1.mp3', shots,
    sfx: cuts.concat(pops, hits, tiles), musicGain: .3,
    moods: [{ t: 0, mood: 'investigate' }],
    images: { instacart: 'assets/pricing/instacart.png', safeway: 'assets/pricing/safeway.png', lucerne: 'assets/pricing/lucerne.png' },
    fonts: G.BizFont.load };
})(window);
