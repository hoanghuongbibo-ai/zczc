/* Pompeii series sets and props, flat cartoon style matched to the user's references:
 * soft gradient skies, rolling hills, warm plaster houses with terracotta roofs, thick dark outlines. */
(function (G) {
  'use strict';
  const PK = G.PK, T = G.Toon, F = G.Folk, { W, H, P, L, text } = PK, INK = PK.INK;
  const { clamp, lerp, ease, rng } = T;
  const shade = F.shade;

  // ---------- sky / land ----------
  function sky(ctx, top = '#9fd0e8', bot = '#f3e7c6', y0 = -300, y1 = 520) {
    const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot);
    ctx.fillStyle = g; ctx.fillRect(-800, -800, W + 1600, H + 1600);
  }
  function sun(ctx, x, y, r = 46, col = '#fff6d6') { const g = ctx.createRadialGradient(x, y, r * .3, x, y, r * 4); g.addColorStop(0, 'rgba(255,248,220,.75)'); g.addColorStop(1, 'rgba(255,248,220,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); P(ctx, col, 0, c => c.arc(x, y, r, 0, 7)); }
  function cloud(ctx, x, y, s = 1, col = '#fbf4e4') {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P(ctx, col, 3, c => { c.moveTo(-90, 10); c.quadraticCurveTo(-100, -20, -60, -22); c.quadraticCurveTo(-50, -55, -10, -45); c.quadraticCurveTo(20, -70, 50, -40); c.quadraticCurveTo(95, -42, 90, 10); c.closePath(); });
    L(ctx, [[-80, 10], [80, 10]], 3); ctx.restore();
  }
  function clouds(ctx, t, list, drift = 4) { for (const [x, y, s] of list) cloud(ctx, ((x + t * drift * s) % (W + 400)) - 100, y, s); }
  function hills(ctx, y, col, seed = 1, amp = 40, x0 = -400, x1 = W + 400, outline = true) {
    const r = rng(seed); const pts = []; for (let x = x0; x <= x1; x += 120) pts.push([x, y - r() * amp]);
    P(ctx, col, outline ? 2.6 : 0, c => { c.moveTo(x0, H + 400); c.lineTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i]; c.quadraticCurveTo(p[0] + 60, p[1] - amp * .35, q[0], q[1]); } c.lineTo(x1, H + 400); c.closePath(); });
  }
  function ground(ctx, y, col = '#b9c47a', col2) { const g = ctx.createLinearGradient(0, y, 0, H + 100); g.addColorStop(0, col); g.addColorStop(1, col2 || shade(col, .82)); ctx.fillStyle = g; ctx.fillRect(-800, y, W + 1600, H + 800 - y); L(ctx, [[-800, y], [W + 800, y]], 3); }
  function tufts(ctx, seed, x0, x1, y0, y1, n = 20, col = '#7f9a4a') {
    const r = rng(seed); for (let i = 0; i < n; i++) { const x = lerp(x0, x1, r()), y = lerp(y0, y1, r()), s = .6 + r() * .6; L(ctx, [[x - 7 * s, y - 12 * s], [x - 2 * s, y], [x, y - 16 * s], [x + 2 * s, y], [x + 8 * s, y - 11 * s]], 2.4, col); }
  }
  function cypress(ctx, x, y, h = 120, col = '#4f6d3a') { P(ctx, col, 2.6, c => { c.moveTo(x, y - h); c.quadraticCurveTo(x + h * .2, y - h * .5, x + h * .1, y); c.lineTo(x - h * .1, y); c.quadraticCurveTo(x - h * .2, y - h * .5, x, y - h); }); }
  function pine(ctx, x, y, h = 140) { L(ctx, [[x, y], [x + 4, y - h * .7]], 8); L(ctx, [[x, y], [x + 4, y - h * .7]], 4.5, '#7a5a3a'); P(ctx, '#5b7a3c', 2.6, c => c.ellipse(x + 4, y - h * .78, h * .5, h * .16, 0, 0, 7)); }

  // ---------- Vesuvius ----------
  // o: { green: true, angry: 0..1 (brows), smoke: 0..1, col (column 0..1), ash: 0..1, dark: 0..1, t, glow, face }
  function vesuvius(ctx, x, y, s = 1, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const t = o.t || 0, base = o.base || (o.green === false ? '#8a8378' : '#6f9a50'), side = shade(base, .82);
    // column behind the mountain
    if (o.col > 0) column(ctx, 18, -250, o.col, t, o);
    P(ctx, base, 3.2, c => { c.moveTo(-430, 0); c.quadraticCurveTo(-250, -120, -120, -235); c.lineTo(-70, -262); c.lineTo(-30, -238); c.lineTo(0, -255); c.lineTo(40, -262); c.lineTo(70, -240); c.quadraticCurveTo(250, -110, 430, 0); c.closePath(); });
    ctx.save(); ctx.beginPath(); ctx.moveTo(-430, 0); ctx.quadraticCurveTo(-250, -120, -120, -235); ctx.lineTo(-70, -262); ctx.lineTo(-30, -238); ctx.lineTo(0, -255); ctx.lineTo(40, -262); ctx.lineTo(70, -240); ctx.quadraticCurveTo(250, -110, 430, 0); ctx.closePath(); ctx.clip();
    P(ctx, side, 0, c => { c.moveTo(20, -258); c.quadraticCurveTo(80, -130, 220, 0); c.lineTo(440, 0); c.quadraticCurveTo(250, -110, 70, -240); c.closePath(); });
    if (o.green !== false) { const r = rng(5); for (let row = 0; row < 7; row++) { const yy = -30 - row * 26, half = 400 - row * 50; for (let xx = -half; xx < half; xx += 22) if (r() < .85) P(ctx, '#4f7a38', 0, c => c.arc(xx + (row % 2) * 11, yy + r() * 4, 4.2, 0, 7)); } }
    if (o.ash > 0) { ctx.globalAlpha = o.ash; ctx.fillStyle = '#9a948c'; ctx.fillRect(-450, -300, 900, 310); ctx.globalAlpha = 1; }
    ctx.restore();
    if (o.face) { // angry eyebrows + eyes (comedy beat)
      const a = o.face;
      ctx.fillStyle = INK; for (const sx of [-40, 40]) { ctx.beginPath(); ctx.ellipse(sx, -150, 9, 12, 0, 0, 7); ctx.fill(); L(ctx, [[sx - 26 * Math.sign(sx) * -1 * 0 - 24, -178 + (sx < 0 ? -1 : 1) * 10 * a * 0 - (sx < 0 ? 0 : 0)], [sx + 24, -178]], 7); }
      L(ctx, [[-64, -186], [-18, -172 + 6 * a]], 8); L(ctx, [[64, -186], [18, -172 + 6 * a]], 8);
      ctx.save(); ctx.fillStyle = '#e8eef0'; for (const sx of [-40, 40]) { ctx.beginPath(); ctx.arc(sx - 3, -154, 3, 0, 7); ctx.fill(); } ctx.restore();
      Q(ctx, [-26, -110], [0, -122 - 10 * a], [26, -110], 6);
    }
    if (o.smoke > 0) for (let i = 0; i < 4; i++) { const k = ((t * .25 + i * .25) % 1); ctx.globalAlpha = o.smoke * (1 - k) * .8; P(ctx, '#e9e4dc', 2, c => c.arc(10 + Math.sin(k * 6 + i) * 14, -268 - k * 120, 10 + k * 30, 0, 7)); }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  function Q(ctx, a, c, b, w = 3, col = INK) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(c[0], c[1], b[0], b[1]); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); }
  // eruption column shaped like an umbrella pine; k grows 0..1
  function column(ctx, x, y, k, t, o = {}) {
    const h = 520 * ease.out(clamp(k * 1.2)), spread = clamp((k - .4) / .6);
    const dark = !!o.darkCol, c1 = dark ? '#6e6760' : '#e2dbcf', c2 = dark ? '#57514b' : '#c9c0b2';
    if (h < 2) return;
    // trunk: a lumpy tapered column, wider at the top
    const pts = [];
    for (let i = 0; i <= 10; i++) { const f = i / 10, yy = y - h * f, w = 22 + 40 * f + Math.sin(i * 2.3 + t * 1.5) * 5; pts.push([x - w + Math.sin(i * 1.7 + t) * 4, yy]); }
    const right = []; for (let i = 10; i >= 0; i--) { const f = i / 10, yy = y - h * f, w = 22 + 40 * f + Math.sin(i * 1.9 + t * 1.3 + 2) * 5; right.push([x + w + Math.sin(i * 1.3 + t) * 4, yy]); }
    P(ctx, c2, 3, c => { c.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) c.lineTo(p[0], p[1]); for (const p of right) c.lineTo(p[0], p[1]); c.closePath(); });
    for (let i = 1; i < 10; i++) { const f = i / 10; P(ctx, c1, 0, c => c.arc(x - 8 + Math.sin(i * 2.1 + t) * 6, y - h * f, 14 + 24 * f, -Math.PI * .9, Math.PI * .4)); }
    // umbrella top: overlapping puffs spreading sideways and drooping at the ends
    if (spread > 0) {
      const sw = 70 + 300 * ease.out(spread), top = y - h;
      const puffs = []; for (let i = 0; i < 15; i++) { const f = i / 14 - .5, r = (54 - Math.abs(f) * 50) * (.55 + .45 * spread); puffs.push([x + f * sw * 2, top + Math.pow(Math.abs(f) * 2, 2) * 40 * spread + Math.sin(i * 2.7 + t) * 4, r]); }
      for (const [px, py, r] of puffs) P(ctx, c2, 3, c => c.arc(px, py, r, 0, 7));
      for (const [px, py, r] of puffs) P(ctx, c1, 0, c => c.arc(px - r * .15, py - r * .2, r * .8, 0, 7));
      P(ctx, c2, 0, c => c.ellipse(x, top + 10, sw * .9, 26 * spread, 0, 0, Math.PI));
    }
  }

  // ---------- Pompeian architecture ----------
  function roof(ctx, x, y, w, d = 34, col = '#c5653f') {
    P(ctx, col, 3, c => { c.moveTo(x - 12, y); c.lineTo(x + 18, y - d); c.lineTo(x + w - 18, y - d); c.lineTo(x + w + 12, y); c.closePath(); });
    for (let xx = x; xx < x + w; xx += 16) L(ctx, [[xx, y - 2], [xx + 14 + (xx - x - w / 2) * .02, y - d + 2]], 1.6, shade(col, .72));
    L(ctx, [[x - 12, y], [x + w + 12, y]], 4, shade(col, .65));
  }
  // facade: o = { col (plaster), dado (lower band), door, shop, win, graffiti: [{s, x, y, rot, px, col}], roof, cracked }
  function house(ctx, x, y, w, h, o = {}) {
    const plaster = o.col || '#efe1c2', dado = o.dado || '#b8473a';
    if (o.roof !== false) roof(ctx, x, y - h, w, o.roofD || 30, o.roofCol);
    P(ctx, plaster, 3, c => c.rect(x, y - h, w, h));
    P(ctx, dado, 0, c => c.rect(x, y - h * .32, w, h * .32)); L(ctx, [[x, y - h * .32], [x + w, y - h * .32]], 2.4);
    ctx.fillStyle = 'rgba(0,0,0,.06)'; ctx.fillRect(x + w * .75, y - h, w * .25, h);
    if (o.door) { const dw = Math.min(64, w * .3), dx = x + (o.doorX ?? w * .5) - dw / 2; P(ctx, '#7a4f33', 3, c => { c.moveTo(dx, y); c.lineTo(dx, y - h * .55); c.quadraticCurveTo(dx + dw / 2, y - h * .66, dx + dw, y - h * .55); c.lineTo(dx + dw, y); c.closePath(); }); L(ctx, [[dx + dw / 2, y], [dx + dw / 2, y - h * .6]], 2); }
    if (o.shop) { const sx = x + w * .12, sw = w * .76; P(ctx, '#3d2f28', 3, c => c.rect(sx, y - h * .62, sw, h * .62)); P(ctx, '#e7dccb', 3, c => c.rect(sx - 4, y - h * .3, sw + 8, h * .3)); for (let i = 0; i < 3; i++) P(ctx, '#c9a27a', 2.4, c => c.ellipse(sx + sw * (.22 + i * .28), y - h * .3, 12, 6, 0, 0, 7)); if (o.awning) P(ctx, o.awning, 3, c => { c.moveTo(sx - 14, y - h * .64); c.lineTo(sx + sw + 14, y - h * .64); c.lineTo(sx + sw + 24, y - h * .52); c.lineTo(sx - 24, y - h * .52); c.closePath(); }); }
    if (o.win) for (const wx of o.win) P(ctx, '#3d2f28', 2.6, c => c.rect(x + wx - 9, y - h * .86, 18, 22));
    if (o.cracked) { L(ctx, [[x + w * .3, y - h], [x + w * .36, y - h * .7], [x + w * .3, y - h * .55], [x + w * .38, y - h * .35]], 2.4); }
    if (o.graffiti) for (const g of o.graffiti) { ctx.save(); ctx.translate(x + g.x, y - h + g.y); ctx.rotate(g.rot || 0); ctx.globalAlpha = g.a ?? .85; text(ctx, g.s, 0, 0, { font: PK.HAND(g.px || 18), col: g.col || '#4a3a30' }); ctx.restore(); }
  }
  function street(ctx, y, o = {}) {
    P(ctx, '#d8c9a8', 3, c => c.rect(-800, y, W + 1600, 26));                      // raised pavement
    const g = ctx.createLinearGradient(0, y + 26, 0, H + 40); g.addColorStop(0, '#8d8a86'); g.addColorStop(1, '#6f6c69');
    ctx.fillStyle = g; ctx.fillRect(-800, y + 26, W + 1600, H + 800); L(ctx, [[-800, y + 26], [W + 800, y + 26]], 3);
    const r = rng(o.seed || 3);
    for (let row = 0; row < 6; row++) { const yy = y + 40 + row * 30 * (1 + row * .2); for (let x = -800 + (row % 2) * 40; x < W + 800; x += 70 + row * 8) P(ctx, null, 1.6, c => c.roundRect(x + r() * 8, yy, 60 + row * 7, 22 + row * 5, 8)); }
    if (o.steps) for (const sx of o.steps) for (let i = 0; i < 3; i++) P(ctx, '#d8c9a8', 2.6, c => c.ellipse(sx + i * 60, y + 120, 24, 12, 0, 0, 7));
  }
  function wallStones(ctx, x, y, w, h, seed = 2, col = '#d7c39a') {
    P(ctx, col, 3, c => c.rect(x, y, w, h)); const r = rng(seed);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    for (let yy = y; yy < y + h; yy += 26) for (let xx = x - ((yy / 26) % 2) * 30; xx < x + w; xx += 60) { ctx.fillStyle = shade(col, .92 + r() * .14); ctx.fillRect(xx + 2, yy + 2, 56, 22); P(ctx, null, 1.4, c => c.rect(xx + 2, yy + 2, 56, 22)); }
    ctx.restore(); P(ctx, null, 3, c => c.rect(x, y, w, h));
  }
  function cityWall(ctx, x0, x1, y, h, o = {}) {
    wallStones(ctx, x0, y - h, x1 - x0, h, o.seed || 4, o.col || '#d7c39a');
    for (let x = x0; x < x1; x += 34) P(ctx, o.col || '#d7c39a', 2.6, c => c.rect(x, y - h - 16, 20, 16));
    for (const tx of o.towers || []) { wallStones(ctx, tx - 50, y - h - 70, 100, h + 70, 7, shade(o.col || '#d7c39a', .95)); for (let x = tx - 50; x < tx + 50; x += 25) P(ctx, shade(o.col || '#d7c39a', .95), 2.6, c => c.rect(x, y - h - 86, 16, 16)); P(ctx, '#3d2f28', 2.4, c => c.rect(tx - 7, y - h - 40, 14, 26)); }
    if (o.gate) { const gx = o.gate; P(ctx, '#3d2f28', 3, c => { c.moveTo(gx - 50, y); c.lineTo(gx - 50, y - h * .55); c.arc(gx, y - h * .55, 50, Math.PI, 0); c.lineTo(gx + 50, y); c.closePath(); }); }
    if (o.dents) for (const [dx, dy, r] of o.dents) { P(ctx, 'rgba(60,40,30,.45)', 2, c => c.arc(dx, dy, r, 0, 7)); for (let i = 0; i < 5; i++) { const a = i * 1.3; L(ctx, [[dx + Math.cos(a) * r, dy + Math.sin(a) * r], [dx + Math.cos(a) * r * 1.8, dy + Math.sin(a) * r * 1.8]], 1.6); } }
  }

  // ---------- the remodel room (cold open + callbacks) ----------
  // o: { paint: 0..1 (how much of the fresco is finished), note: 0..1 (charcoal note written), modern: true (2018 look), t, door, light }
  function room(ctx, o = {}) {
    const t = o.t || 0;
    // back wall
    P(ctx, o.modern ? '#d9cbb0' : '#e8dcc0', 0, c => c.rect(-400, -200, W + 800, 620));
    // finished fresco on the left: red panels, yellow frieze, black dado
    const fx1 = 120 + 300 * (o.paint ?? 1);
    ctx.save(); ctx.beginPath(); ctx.rect(-400, -200, fx1 + 400, 620); ctx.clip();
    ctx.fillStyle = o.modern ? '#a8563f' : '#b8473a'; ctx.fillRect(-400, 60, 900, 300);
    ctx.fillStyle = '#2b2420'; ctx.fillRect(-400, 360, 900, 60);
    ctx.fillStyle = o.modern ? '#d2a94e' : '#e2b54a'; ctx.fillRect(-400, 20, 900, 40);
    for (let x = -360; x < 500; x += 170) { P(ctx, null, 2.4, c => c.rect(x, 90, 130, 240)); P(ctx, '#f0e2c6', 2, c => c.ellipse(x + 65, 210, 22, 30, 0, 0, 7)); L(ctx, [[x + 65, 180], [x + 60, 240]], 2, '#6f9a50'); }
    if (o.modern) { ctx.fillStyle = 'rgba(240,230,210,.35)'; for (let i = 0; i < 30; i++) { const r = rng(i + 3); ctx.fillRect(-300 + r() * 800, 60 + r() * 300, 20 + r() * 50, 4 + r() * 10); } }
    ctx.restore();
    // the rough plaster edge
    const rr = rng(8); P(ctx, '#d4c8b2', 0, c => { c.moveTo(fx1, -200); for (let y = -200; y <= 420; y += 30) c.lineTo(fx1 + rr() * 14 - 7, y); c.lineTo(W + 400, 420); c.lineTo(W + 400, -200); c.closePath(); });
    ctx.fillStyle = 'rgba(0,0,0,.05)'; for (let i = 0; i < 40; i++) ctx.fillRect(fx1 + 20 + rr() * 1000, -150 + rr() * 560, 30 + rr() * 60, 3);
    L(ctx, (() => { const a = []; const r2 = rng(8); for (let y = -200; y <= 420; y += 30) a.push([fx1 + r2() * 14 - 7, y]); return a; })(), 2.6);
    // door to the street on the right
    if (o.door !== false) { P(ctx, o.night ? '#5b5a7a' : '#f6e3b0', 3, c => c.rect(980, 80, 150, 340)); if (!o.night) { ctx.fillStyle = 'rgba(255,240,200,.25)'; ctx.beginPath(); ctx.moveTo(980, 420); ctx.lineTo(1130, 420); ctx.lineTo(1260, 560); ctx.lineTo(900, 560); ctx.closePath(); ctx.fill(); } P(ctx, '#7a4f33', 3, c => c.rect(960, 60, 190, 24)); }
    // floor
    P(ctx, o.modern ? '#a9987c' : '#c9a27a', 3, c => c.rect(-400, 420, W + 800, 400));
    for (let x = -400; x < W + 400; x += 90) L(ctx, [[x, 420], [x - 40, 800]], 1.6, 'rgba(0,0,0,.15)');
    // charcoal note
    if (o.note > 0) noteScrawl(ctx, 640, 200, o.note, o.noteAlpha ?? 1);
    if (!o.modern) {
      // scaffold plank + ladder + bucket
      P(ctx, '#a0764e', 3, c => c.rect(150, 300, 230, 16)); for (const lx of [165, 365]) P(ctx, '#8a6240', 3, c => c.rect(lx - 5, 316, 10, 104));
      ctx.save(); ctx.translate(860, 420); ctx.rotate(.18); for (const lx of [-30, 30]) P(ctx, '#a0764e', 3, c => c.rect(lx - 6, -330, 12, 330)); for (let ly = -30; ly > -320; ly -= 50) P(ctx, '#a0764e', 2.4, c => c.rect(-30, ly, 60, 8)); ctx.restore();
    }
  }
  function bucket(ctx, x, y, s = 1, col = '#b8473a') {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P(ctx, '#9a7a52', 3, c => { c.moveTo(-30, -56); c.lineTo(30, -56); c.lineTo(24, 0); c.lineTo(-24, 0); c.closePath(); });
    L(ctx, [[-28, -36], [28, -36]], 3, '#5a4030'); L(ctx, [[-26, -14], [26, -14]], 3, '#5a4030');
    P(ctx, col, 3, c => c.ellipse(0, -56, 30, 8, 0, 0, 7));
    ctx.restore();
  }
  // the note itself: "XVI K NOV" + a few scribbled words; k 0..1 writes it on
  function noteScrawl(ctx, x, y, k, a = 1, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; ctx.rotate(-.04);
    const parts = [['XVI K NOV', -70, 0, 46], ['in[d]ulsit', -40, 44, 30], ['pro masumis', 30, 80, 30], ['esurit[ioni]', -20, 116, 28]];
    let used = 0, tip = null;
    for (const [s0, px, py, sz] of parts) {
      const len = s0.length, n = clamp(k * 40 - used, 0, len); used += len;
      if (n <= 0) break;
      ctx.save(); ctx.font = PK.HAND(sz); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      const full = ctx.measureText(s0).width, part = ctx.measureText(s0.slice(0, Math.ceil(n))).width;
      ctx.beginPath(); ctx.rect(px - 4, py - sz, part + 4, sz * 2); ctx.clip();
      ctx.fillStyle = 'rgba(30,26,24,.88)'; ctx.fillText(s0, px, py); ctx.restore();
      void full; tip = [px + part, py + sz * .15];
    }
    const m = ctx.getTransform(); ctx.restore();
    if (!tip) return null;
    const inv = ctx.getTransform().inverse(), p = new DOMPoint(tip[0], tip[1]).matrixTransform(m).matrixTransform(inv);
    return [p.x, p.y];
  }

  // ---------- sea + ships ----------
  function sea(ctx, y, t, o = {}) {
    const g = ctx.createLinearGradient(0, y, 0, H + 100); g.addColorStop(0, o.col || '#7fb9cf'); g.addColorStop(1, o.col2 || '#4f8fae');
    ctx.fillStyle = g; ctx.fillRect(-800, y, W + 1600, H + 800); L(ctx, [[-800, y], [W + 800, y]], 2.6);
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2.4;
    for (let i = 0; i < 26; i++) { const r = rng(i + 9), wx = ((r() * (W + 400) + t * 12 * (r() > .5 ? 1 : -1)) % (W + 400)) - 200, wy = y + 20 + r() * (H - y); ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 12, wy - 6, wx + 24, wy); ctx.quadraticCurveTo(wx + 36, wy - 6, wx + 48, wy); ctx.stroke(); }
  }
  function galley(ctx, x, y, s = 1, t = 0, o = {}) {
    ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6 + x) * 3); ctx.scale(s * (o.mirror ? -1 : 1), s); ctx.rotate(Math.sin(t * 1.3 + x) * .02);
    // oars
    for (let i = 0; i < 7; i++) { const a = Math.sin(t * 3 + i * .3) * .35; L(ctx, [[-90 + i * 28, -14], [-90 + i * 28 + Math.sin(a) * 30 - 10, 34]], 3.4); }
    P(ctx, o.hull || '#8a5a34', 3, c => { c.moveTo(-150, -40); c.quadraticCurveTo(-120, 10, -60, 10); c.lineTo(110, 10); c.quadraticCurveTo(150, 0, 170, -46); c.lineTo(140, -30); c.lineTo(-130, -30); c.closePath(); });
    L(ctx, [[-130, -20], [140, -20]], 2.4, '#5a3a24');
    P(ctx, '#c9a27a', 2.4, c => c.rect(-120, -36, 250, 8));
    L(ctx, [[0, -30], [0, -170]], 6); L(ctx, [[0, -30], [0, -170]], 3, '#7a5a3a');
    if (o.sail !== false) P(ctx, o.sailCol || '#efe2c4', 3, c => { c.moveTo(-62, -160); c.quadraticCurveTo(0, -150, 62, -160); c.quadraticCurveTo(70, -110, 58, -60); c.quadraticCurveTo(0, -70, -58, -60); c.quadraticCurveTo(-70, -110, -62, -160); c.closePath(); });
    if (o.stripe) L(ctx, [[-60, -110], [60, -110]], 8, o.stripe);
    L(ctx, [[-70, -162], [70, -162]], 4);
    if (o.crew) o.crew(ctx);
    ctx.restore();
  }

  // ---------- maps ----------
  const BAY = { misenum: [178, 318], naples: [420, 262], herc: [612, 352], vesuvius: [720, 300], pompeii: [812, 448], stabiae: [770, 540], nuceria: [985, 420], capri: [470, 676], sorrento: [610, 602], sarno: [[1040, 440], [930, 452], [860, 470], [812, 482]] };
  const COAST = [[-60, 300], [120, 290], [150, 300], [178, 318], [205, 300], [240, 280], [300, 255], [360, 248], [420, 262], [480, 280], [540, 300], [590, 330], [612, 352], [650, 392], [700, 430], [760, 470], [812, 488], [800, 520], [770, 548], [740, 572], [690, 590], [640, 600], [600, 606], [560, 622], [520, 640], [480, 660], [470, 760], [-60, 760]];
  function bayMap(ctx, o = {}) {
    const c = PK.layer('bayMap' + (o.plain ? 'p' : ''), W, H, g => {
      g.fillStyle = '#e9dcb8'; g.fillRect(0, 0, W, H);
      const r = rng(3); g.fillStyle = 'rgba(120,90,50,.06)'; for (let i = 0; i < 300; i++) g.fillRect(r() * W, r() * H, 2 + r() * 30, 2 + r() * 3);
      // sea
      g.beginPath(); g.moveTo(COAST[0][0], COAST[0][1]); for (const p of COAST.slice(1)) g.lineTo(p[0], p[1]); g.closePath();
      g.fillStyle = '#a9cbd0'; g.fill(); g.lineWidth = 3; g.strokeStyle = INK; g.lineJoin = 'round'; g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = 60 + r() * 600, y = 340 + r() * 380; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 8, y - 5, x + 16, y); g.stroke(); }
      // Capri
      P(g, '#d9c99c', 3, cc => cc.ellipse(BAY.capri[0], BAY.capri[1], 50, 18, -.1, 0, 7));
      // Sarno river
      g.beginPath(); g.moveTo(...BAY.sarno[0]); for (const p of BAY.sarno.slice(1)) g.lineTo(...p); g.lineWidth = 6; g.strokeStyle = INK; g.stroke(); g.lineWidth = 3; g.strokeStyle = '#8fbcc8'; g.stroke();
      // hills
      for (const [hx, hy] of [[1080, 560], [1150, 520], [900, 600], [1000, 640], [1200, 300], [1100, 250]]) P(g, 'rgba(140,120,80,.25)', 0, cc => { cc.moveTo(hx - 50, hy); cc.quadraticCurveTo(hx, hy - 40, hx + 50, hy); cc.closePath(); });
    });
    PK.drawLayer(ctx, c);
    // Vesuvius icon
    const v = BAY.vesuvius; P(ctx, o.vcol || '#7c8a5a', 3, c => { c.moveTo(v[0] - 60, v[1] + 30); c.lineTo(v[0] - 16, v[1] - 26); c.lineTo(v[0] + 16, v[1] - 26); c.lineTo(v[0] + 60, v[1] + 30); c.closePath(); });
    if (o.erupt > 0) { ctx.globalAlpha = clamp(o.erupt); column(ctx, v[0], v[1] - 30, o.erupt * .6, o.t || 0, {}); ctx.globalAlpha = 1; }
  }
  function town(ctx, name, x, y, k = 1, o = {}) {
    if (k <= 0) return; const kk = PK.pop(k);
    PK.scaled(ctx, x, y, kk, c => { P(c, o.col || '#c0563c', 2.6, cc => cc.arc(0, 0, o.r || 8, 0, 7)); if (name) text(c, name, o.dx ?? 0, o.dy ?? -22, { px: o.px || 20, w: 700, stroke: 5, strokeCol: '#f4ecd8' }); });
  }
  function pulse(ctx, x, y, t, col = 'rgba(208,57,43,') { for (let i = 0; i < 3; i++) { const k = ((t * .8 + i / 3) % 1); ctx.strokeStyle = col + (1 - k) + ')'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 10 + k * 46, 0, 7); ctx.stroke(); } }
  function route(ctx, pts, k, o = {}) {           // dashed route drawn on, k 0..1
    if (k <= 0) return; const segs = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); tot += d; }
    let rem = tot * clamp(k); ctx.save(); ctx.setLineDash(o.dash || [14, 10]); ctx.lineWidth = o.w || 5; ctx.strokeStyle = o.col || '#c0392b'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...pts[0]);
    let end = pts[0];
    for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / segs[i - 1]); end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; ctx.lineTo(...end); rem -= segs[i - 1]; }
    ctx.stroke(); ctx.restore(); return end;
  }
  // Italy (simplified boot) for the early chapters
  const ITALY = [[372, 60], [430, 48], [500, 70], [560, 60], [610, 90], [600, 130], [570, 150], [585, 200], [620, 250], [668, 300], [720, 340], [770, 372], [830, 400], [880, 430], [930, 450], [990, 470], [1030, 500], [1000, 520], [960, 510], [930, 530], [950, 580], [930, 640], [900, 650], [880, 610], [860, 560], [830, 520], [790, 500], [740, 470], [690, 440], [640, 400], [590, 360], [545, 320], [505, 270], [470, 220], [430, 190], [400, 160], [370, 130], [340, 110]];
  const SICILY = [[790, 660], [880, 650], [900, 700], [800, 712], [760, 690]], SARD = [[300, 330], [350, 320], [360, 440], [310, 460], [290, 400]];
  const IT = { rome: [560, 300], pompeii: [705, 412], sarno: [700, 416], naples: [690, 398] };
  function italy(ctx, o = {}) {
    const c = PK.layer('italy', W, H, g => {
      g.fillStyle = '#a9cbd0'; g.fillRect(0, 0, W, H);
      const r = rng(4); g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 2; for (let i = 0; i < 60; i++) { const x = r() * W, y = r() * H; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 8, y - 5, x + 16, y); g.stroke(); }
      P(g, '#e9dcb8', 0, cc => cc.rect(0, 0, W, 70));
      for (const poly of [ITALY, SICILY, SARD]) P(g, '#e9dcb8', 3, cc => { cc.moveTo(...poly[0]); for (const p of poly.slice(1)) cc.lineTo(...p); cc.closePath(); });
      P(g, '#e9dcb8', 3, cc => { cc.moveTo(0, 70); cc.lineTo(372, 60); cc.lineTo(340, 110); cc.lineTo(250, 160); cc.lineTo(120, 150); cc.lineTo(0, 170); cc.closePath(); });
      P(g, '#e9dcb8', 3, cc => { cc.moveTo(610, 90); cc.lineTo(720, 80); cc.lineTo(900, 120); cc.lineTo(1280, 160); cc.lineTo(1280, 0); cc.lineTo(560, 0); cc.lineTo(560, 60); cc.closePath(); });
      // mountains along the spine
      for (let i = 0; i < 14; i++) { const k = i / 13, x = lerp(480, 900, k), y = lerp(150, 520, k) + Math.sin(i) * 10; P(g, 'rgba(140,120,80,.35)', 0, cc => { cc.moveTo(x - 22, y); cc.lineTo(x, y - 20); cc.lineTo(x + 22, y); cc.closePath(); }); }
    });
    PK.drawLayer(ctx, c);
  }

  // ---------- small props ----------
  function amphora(ctx, x, y, s = 1, col = '#c9814f') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(ctx, col, 2.6, c => { c.moveTo(-6, -50); c.lineTo(6, -50); c.lineTo(8, -40); c.quadraticCurveTo(22, -30, 16, -8); c.lineTo(0, 6); c.lineTo(-16, -8); c.quadraticCurveTo(-22, -30, -8, -40); c.closePath(); }); L(ctx, [[-8, -46], [-16, -36]], 2.6); L(ctx, [[8, -46], [16, -36]], 2.6); ctx.restore(); }
  function scroll(ctx, x, y, w = 60, h = 80, rot = 0, col = '#f2e6c4') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); P(ctx, col, 2.6, c => c.rect(-w / 2, -h / 2, w, h)); for (const yy of [-h / 2, h / 2]) P(ctx, '#c9a27a', 2.6, c => c.roundRect(-w / 2 - 6, yy - 5, w + 12, 10, 5)); for (let i = 0; i < 4; i++) L(ctx, [[-w / 2 + 8, -h / 2 + 14 + i * (h - 24) / 4], [w / 2 - 8 - (i % 2) * 10, -h / 2 + 14 + i * (h - 24) / 4]], 2, '#9a8a70'); ctx.restore(); }
  function charcoal(ctx, x, y, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); P(ctx, '#2f2a28', 2, c => c.roundRect(-4, -16, 8, 22, 3)); ctx.restore(); }
  function shovel(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); L(ctx, [[0, -60], [0, 40]], 8); L(ctx, [[0, -60], [0, 40]], 4.5, '#a0764e'); P(ctx, '#9aa3a8', 2.6, c => { c.moveTo(-14, 36); c.lineTo(14, 36); c.lineTo(12, 66); c.quadraticCurveTo(0, 78, -12, 66); c.closePath(); }); ctx.restore(); }
  function puff(ctx, x, y, r, k, col = '#e9e2d6') { if (k <= 0 || k >= 1) return; ctx.save(); ctx.globalAlpha = 1 - k; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; P(ctx, col, 2, c => c.arc(x + Math.cos(a) * r * k, y + Math.sin(a) * r * k * .6, r * .4 * (1 - k * .5), 0, 7)); } ctx.restore(); }
  function rubble(ctx, x, y, w, seed = 3, col = '#c9b48f') { const r = rng(seed); for (let i = 0; i < w / 6; i++) { const bx = x + (r() - .5) * w, hgt = (1 - Math.abs(bx - x) / (w / 2)) * w * .25, by = y - r() * hgt; ctx.save(); ctx.translate(bx, by); ctx.rotate(r() * 2); P(ctx, shade(col, .85 + r() * .25), 2.2, c => c.rect(-9 - r() * 6, -6, 18 + r() * 8, 12)); ctx.restore(); } }
  function pumiceRain(ctx, t, n = 80, a = 1, seed = 1, sp = 1) { const r = rng(seed); ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < n; i++) { const x = r() * (W + 200) - 100, ph = r(), sz = 2 + r() * 4, y = ((ph * (H + 200) + t * (220 + r() * 160) * sp) % (H + 200)) - 100; P(ctx, i % 3 ? '#cfc6b8' : '#9d958a', 1.2, c => c.arc(x + Math.sin(t + i) * 4, y, sz, 0, 7)); } ctx.restore(); }
  function ashFall(ctx, t, n = 160, a = .7, seed = 2) { const r = rng(seed); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#d8d2c8'; for (let i = 0; i < n; i++) { const x = (r() * (W + 200) + Math.sin(t * .7 + i) * 20) - 100, y = ((r() * (H + 100) + t * (40 + r() * 40)) % (H + 100)) - 50; ctx.fillRect(x, y, 2.4, 2.4); } ctx.restore(); }
  function rain(ctx, t, n = 140, a = .5) { const r = rng(7); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#cfe0ea'; ctx.lineWidth = 2; for (let i = 0; i < n; i++) { const x = r() * (W + 300) - 150, y = ((r() * (H + 100) + t * 900) % (H + 100)) - 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 22); ctx.stroke(); } ctx.restore(); }
  function newspaper(ctx, x, y, w, h, mast, headline, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.s || 1, o.s || 1);
    PK.paper(ctx, -w / 2, -h / 2, w, h, { fill: '#f1ece0', r: 2 });
    text(ctx, mast, 0, -h / 2 + 30, { font: '700 30px Georgia, serif', maxW: w - 30 }); L(ctx, [[-w / 2 + 14, -h / 2 + 52], [w / 2 - 14, -h / 2 + 52]], 2); L(ctx, [[-w / 2 + 14, -h / 2 + 57], [w / 2 - 14, -h / 2 + 57]], 1);
    const lines = Array.isArray(headline) ? headline : [headline]; lines.forEach((l, i) => text(ctx, l, 0, -h / 2 + 88 + i * 38, { font: PK.DISPLAY(34), maxW: w - 30 }));
    const yy = -h / 2 + 90 + lines.length * 38; if (o.pic) { P(ctx, '#d8d0c0', 2, c => c.rect(-w / 2 + 16, yy, w * .45, h / 2 - yy - 20)); o.pic(ctx, -w / 2 + 16 + w * .225, yy + (h / 2 - yy - 20) / 2); }
    for (let i = 0; i < 8; i++) { const lx = o.pic ? -w / 2 + 30 + w * .45 : -w / 2 + 16; if (yy + 10 + i * 14 < h / 2 - 16) L(ctx, [[lx, yy + 10 + i * 14], [w / 2 - 16, yy + 10 + i * 14]], 3, 'rgba(80,70,60,.35)'); }
    ctx.restore();
  }
  function calendar(ctx, x, y, top, main, sub, s = 1, o = {}) {
    PK.scaled(ctx, x, y, s, c => {
      PK.paper(c, -80, -90, 160, 180, { fill: '#fff' }); P(c, o.col || '#c0392b', 3, cc => cc.roundRect(-80, -90, 160, 50, [4, 4, 0, 0]));
      text(c, top, 0, -64, { font: PK.FONT(700, 24), col: '#fff', maxW: 140 }); text(c, main, 0, 8, { font: PK.DISPLAY(o.px || 60), maxW: 140 }); if (sub) text(c, sub, 0, 62, { font: PK.FONT(600, 18), col: '#6a5a4a', maxW: 150 });
      for (const rx of [-40, 40]) P(c, '#888', 2, cc => cc.roundRect(rx - 4, -100, 8, 22, 4));
    }, o.rot || 0);
  }
  function frame(ctx, x, y, w, h, fn, o = {}) {      // gilded picture frame around a drawing
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(x - w / 2 + 6, y - h / 2 + 8, w, h);
    P(ctx, o.frameCol || '#c99a45', 3, c => c.rect(x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28)); P(ctx, o.bg || '#e8dcc0', 3, c => c.rect(x - w / 2, y - h / 2, w, h));
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip(); ctx.translate(x, y); fn(ctx); ctx.restore();
  }
  function crowd(ctx, list, t = 0) { // list: [[x, y, s, o, mirror, bobPhase]]
    const sorted = list.slice().sort((a, b) => a[1] - b[1]);
    for (const [x, y, s, o, m, ph] of sorted) F.stamp(ctx, o, x, y + (ph != null ? -Math.abs(Math.sin(t * 3 + ph)) * 4 : 0), s, m);
  }

  G.PSet = { sky, sun, cloud, clouds, hills, ground, tufts, cypress, pine, vesuvius, column, roof, house, street, wallStones, cityWall, room, bucket, noteScrawl,
    sea, galley, BAY, bayMap, town, pulse, route, ITALY, IT, italy, amphora, scroll, charcoal, shovel, puff, rubble, pumiceRain, ashFall, rain, newspaper, calendar, frame, crowd, Q };
})(window);
