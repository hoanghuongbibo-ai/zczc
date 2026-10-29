/* Painted-look sets for the Revolution video: night river with drifting ice + Durham boats, snowy bank, sleet,
 * winter camp with a fire, grey winter road, sea horizon with a fleet. All in a 1280×720 world (camera applied by
 * the caller); deterministic in t. */
(function (G) {
  'use strict';
  const T = G.Toon, K = G.Kit, C = G.Cast, W = T.W, H = T.H, INK = K.INK;
  const sh = K.sh;

  // ---------- sky ----------
  function nightSky(ctx, top = 0, bottom = 360, t = 0) {
    const g = ctx.createLinearGradient(0, top, 0, bottom); g.addColorStop(0, '#0b1229'); g.addColorStop(.7, '#1d2a4a'); g.addColorStop(1, '#33476b');
    ctx.fillStyle = g; ctx.fillRect(-400, top, W + 800, bottom - top);
    const r = T.rng(4);
    for (let i = 0; i < 9; i++) {                                         // heavy low clouds drifting
      const y = top + (bottom - top) * (.08 + r() * .7), w = 260 + r() * 360, x = ((r() * (W + 900) + t * (6 + r() * 6)) % (W + 900)) - 450;
      ctx.save(); ctx.globalAlpha = .55 + r() * .3;
      sh(ctx, c => { c.ellipse(x, y, w / 2, 34 + r() * 20, 0, 0, 7); c.ellipse(x - w * .22, y - 22, w * .24, 30, 0, 0, 7); c.ellipse(x + w * .18, y - 16, w * .22, 26, 0, 0, 7); }, '#2a3656', 0);
      sh(ctx, c => c.ellipse(x - w * .1, y - 30, w * .2, 10, 0, 0, 7), 'rgba(110,130,170,.25)', 0);
      ctx.restore();
    }
  }
  function greySky(ctx, top = 0, bottom = 380) {
    const g = ctx.createLinearGradient(0, top, 0, bottom); g.addColorStop(0, '#8d97a3'); g.addColorStop(1, '#c4c9cd');
    ctx.fillStyle = g; ctx.fillRect(-400, top, W + 800, bottom - top);
    const r = T.rng(12);
    for (let i = 0; i < 7; i++) { const x = r() * W, y = top + 40 + r() * (bottom - top - 140), w = 300 + r() * 300;
      sh(ctx, c => { c.ellipse(x, y, w / 2, 30, 0, 0, 7); c.ellipse(x - w * .2, y - 18, w * .22, 26, 0, 0, 7); }, 'rgba(150,158,168,.7)', 0); }
  }

  // ---------- sleet ----------
  function sleet(ctx, t, amount = 1, wind = .35, o = {}) {
    const r = T.rng(o.seed || 21), n = Math.round(160 * amount);
    ctx.save(); ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) {
      const sp = 520 + r() * 380, len = 10 + r() * 18, x0 = r() * (W + 400) - 200, ph = r();
      const y = ((ph * (H + 200) + t * sp) % (H + 200)) - 100, x = x0 + (y + 100) * wind;
      ctx.strokeStyle = `rgba(215,228,240,${.25 + r() * .45})`; ctx.lineWidth = 1 + r() * 1.6;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - len * wind, y - len); ctx.stroke();
    }
    ctx.restore();
  }

  // ---------- ice ----------
  function slabShape(seed, w) {
    const r = T.rng(seed), n = 7, pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = .75 + r() * .3; pts.push([Math.cos(a) * w / 2 * rr, Math.sin(a) * w * .16 * rr]); }
    return pts;
  }
  function slab(ctx, x, y, w, seed, o = {}) {
    const pts = slabShape(seed, w), th = Math.max(5, w * .05);
    ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot);
    sh(ctx, T.poly(pts.map(([a, b]) => [a, b + th])), '#7f9db5', 3);       // thickness
    sh(ctx, T.poly(pts), o.fill || '#cfe0ea', 3);
    sh(ctx, T.poly(pts.map(([a, b]) => [a * .6 - w * .06, b * .5 - w * .02])), 'rgba(255,255,255,.55)', 0);
    T.line(ctx, [[-w * .2, 0], [w * .05, w * .03], [w * .18, -w * .02]], 1.6, 'rgba(90,120,150,.6)');
    ctx.restore();
  }
  // Ice drifting across a band of water (y0..y1), slabs scale with depth. dir = -1 drifts left.
  function iceField(ctx, t, y0, y1, o = {}) {
    const r = T.rng(o.seed || 33), n = o.n || 26, dir = o.dir ?? -1;
    const items = [];
    for (let i = 0; i < n; i++) { const d = r(), y = y0 + d * (y1 - y0), w = (o.minW || 40) + d * (o.maxW || 170) * (.6 + r() * .6), sp = (8 + d * 30) * (o.speed || 1), x0 = r() * (W + 600);
      items.push({ y, w, x: ((x0 + dir * t * sp) % (W + 600) + (W + 600)) % (W + 600) - 300, seed: 100 + i, rot: (r() - .5) * .08 }); }
    items.sort((a, b) => a.y - b.y).forEach(s => slab(ctx, s.x, s.y, s.w, s.seed, { rot: s.rot }));
  }
  function water(ctx, y0, y1, t, o = {}) {
    const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, o.c0 || '#22324f'); g.addColorStop(1, o.c1 || '#14203a');
    ctx.fillStyle = g; ctx.fillRect(-400, y0, W + 800, y1 - y0);
    const r = T.rng(5);
    for (let i = 0; i < 40; i++) { const y = y0 + r() * (y1 - y0), x = ((r() * (W + 400) - t * (10 + r() * 20)) % (W + 400) + W + 400) % (W + 400) - 200, w = 30 + r() * 80;
      T.line(ctx, [[x, y], [x + w, y]], 2, `rgba(140,170,210,${.12 + r() * .15})`); }
  }

  // ---------- Durham boat (long, dark, pointed both ends) with men standing in it ----------
  function boat(ctx, x, y, s, t, o = {}) {
    const bob = Math.sin(t * 1.6 + x * .01) * 2.5;
    ctx.save(); ctx.translate(x, y + bob); ctx.scale(s, s);
    if (o.men) for (let i = 0; i < o.men; i++) { const mx = -150 + i * (300 / Math.max(1, o.men - 1)); C.silhouette(ctx, mx, -6, .42, { hat: i % 3 === 1 ? 'none' : 'tricorne', musket: i % 2 === 0, color: '#141b2e', face: false }); }
    if (o.pole) { T.line(ctx, [[150, -150], [200, 40]], 6, '#141b2e'); }
    sh(ctx, T.poly([[-230, -30], [230, -30], [190, 18], [-190, 18]]), '#3a2a1f', 4);
    T.line(ctx, [[-215, -18], [215, -18]], 2.5, 'rgba(255,255,255,.12)');
    ctx.restore();
  }

  // ---------- banks ----------
  function farBank(ctx, y, t, o = {}) {
    const r = T.rng(9), col = o.color || '#151d33';
    sh(ctx, c => { c.moveTo(-400, y + 10); for (let x = -400; x <= W + 400; x += 80) c.lineTo(x, y - 18 - r() * 26); c.lineTo(W + 400, y + 10); c.closePath(); }, col, 0);
    for (let i = 0; i < 46; i++) { const x = -380 + i * 37 + r() * 20, h = 40 + r() * 70, yy = y - 20;
      T.line(ctx, [[x, yy], [x + (r() - .5) * 8, yy - h]], 2.5, col);
      for (let b = 0; b < 3; b++) { const by = yy - h * (.45 + b * .18), d = (r() - .5) * 2; T.line(ctx, [[x, by], [x + d * 22, by - 18]], 1.6, col); } }
  }
  function snowBank(ctx, y, o = {}) {
    sh(ctx, c => { c.moveTo(-400, H + 300); c.lineTo(-400, y + 20); c.quadraticCurveTo(W * .3, y - 16, W * .55, y + 6); c.quadraticCurveTo(W * .8, y + 22, W + 400, y - 4); c.lineTo(W + 400, H + 300); c.closePath(); }, o.color || '#c9d6e3', 4);
    const g = ctx.createLinearGradient(0, y, 0, H); g.addColorStop(0, 'rgba(70,90,130,.0)'); g.addColorStop(1, 'rgba(40,55,90,.45)');
    ctx.fillStyle = g; ctx.fillRect(-400, y, W + 800, H - y + 300);
    const r = T.rng(17);
    for (let i = 0; i < 14; i++) { const x = r() * W, yy = y + 30 + r() * 140; T.line(ctx, [[x, yy], [x + 4, yy - 14]], 2, '#56614f'); T.line(ctx, [[x + 6, yy], [x + 12, yy - 10]], 2, '#56614f'); }
    for (let i = 0; i < 6; i++) { const x = r() * W, yy = y + 40 + r() * 120; sh(ctx, T.ellipse(x, yy, 20 + r() * 20, 9 + r() * 6), '#7f8a99', 3); sh(ctx, T.ellipse(x - 4, yy - 5, 14, 4), '#e3ebf2', 0); }
  }
  // lantern glow on a post
  function lantern(ctx, x, y, t) {
    T.line(ctx, [[x, y], [x, y - 90]], 5, '#1b1714');
    sh(ctx, T.rect(x - 10, y - 112, 20, 26, 4), '#e9b24f', 3);
    T.glow(ctx, x, y - 99, 120 + Math.sin(t * 9) * 4, 'rgba(255,170,80,.45)');
  }

  // ---------- the full wide river shot (world 1280×720, sky extends up to skyTop) ----------
  function nightRiver(ctx, t, o = {}) {
    nightSky(ctx, o.skyTop ?? 0, 330, t);
    farBank(ctx, 330, t);
    water(ctx, 322, 600, t);
    ctx.save(); ctx.globalAlpha = .9; iceField(ctx, t, 340, 590, { n: 30, seed: 41, maxW: 150 }); ctx.restore();
    if (o.boats !== false) { boat(ctx, 330, 470, .55, t, { men: 5, pole: true }); boat(ctx, 860, 430, .42, t, { men: 4 }); boat(ctx, 1150, 500, .5, t, { men: 5, pole: true }); }
    snowBank(ctx, 600);
  }

  // ---------- winter camp at night (tents, fire, crowd) ----------
  function fire(ctx, x, y, t, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 4; i++) T.line(ctx, [[-34 + i * 8, 6], [30 - i * 6, -8 + i * 3]], 9, '#4a3322');
    const f = k => Math.sin(t * (9 + k) + k * 2) * 6;
    sh(ctx, T.smooth([[-30, 0], [-22, -40 + f(1)], [-6, -26], [0, -70 + f(2)], [10, -30], [22, -48 + f(3)], [30, 0]]), '#f08a2c', 3);
    sh(ctx, T.smooth([[-16, 0], [-8, -26 + f(4)], [0, -44 + f(5)], [8, -24], [16, 0]]), '#ffd25a', 0);
    ctx.restore();
    T.glow(ctx, x, y - 30 * s, 260 * s + Math.sin(t * 13) * 8, 'rgba(255,150,60,.5)');
  }
  function tent(ctx, x, y, s, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, T.poly([[-90, 0], [0, -110], [90, 0]]), o.color || '#8f8a7a', 4);
    sh(ctx, T.poly([[0, -110], [90, 0], [20, 0]]), 'rgba(0,0,0,.18)', 0);
    sh(ctx, T.poly([[-20, 0], [0, -58], [20, 0]]), '#1c1a1d', 3);
    if (o.snow) sh(ctx, T.poly([[-60, -36], [0, -110], [60, -36], [0, -96]]), '#e2eaf1', 0);
    ctx.restore();
  }
  function campGround(ctx, t, o = {}) {
    nightSky(ctx, -100, 340, t);
    farBank(ctx, 360, t, { color: '#18213a' });
    sh(ctx, T.rect(-400, 350, W + 800, H), '#7e8fa8', 0);
    const g = ctx.createLinearGradient(0, 350, 0, H); g.addColorStop(0, '#5f7190'); g.addColorStop(1, '#2b3550'); ctx.fillStyle = g; ctx.fillRect(-400, 350, W + 800, H);
  }

  // ---------- grey winter road ----------
  function winterRoad(ctx, t) {
    greySky(ctx, -100, 400);
    const r = T.rng(19);
    for (let i = 0; i < 22; i++) { const x = r() * W, h = 80 + r() * 90; T.line(ctx, [[x, 400], [x, 400 - h]], 3, '#6c727a'); for (let b = 0; b < 3; b++) T.line(ctx, [[x, 400 - h * (.4 + b * .2)], [x + (r() - .5) * 50, 400 - h * (.55 + b * .2)]], 2, '#6c727a'); }
    sh(ctx, T.rect(-400, 395, W + 800, H), '#d8dee4', 0);
    sh(ctx, T.poly([[-400, 560], [W + 400, 520], [W + 400, 600], [-400, 650]]), '#9c9183', 0);
    for (let i = 0; i < 30; i++) { const x = r() * W; T.line(ctx, [[x, 560 + r() * 60], [x + 30, 556 + r() * 60]], 2, 'rgba(70,60,50,.35)'); }
  }

  // ---------- sea horizon with fleet (daylight, stormy) ----------
  function fleet(ctx, t, o = {}) {
    const g = ctx.createLinearGradient(0, 0, 0, 380); g.addColorStop(0, '#6f7f95'); g.addColorStop(1, '#b9c2cb'); ctx.fillStyle = g; ctx.fillRect(-400, -200, W + 800, 600);
    sh(ctx, T.rect(-400, 360, W + 800, 400), '#506a82', 0);
    const r = T.rng(77);
    for (let i = 0; i < (o.ships || 16); i++) {
      const d = r(), x = r() * W, y = 330 + d * 50, s = .35 + d * .5, bob = Math.sin(t * 1.4 + i) * 2;
      ctx.save(); ctx.translate(x, y + bob); ctx.scale(s, s);
      sh(ctx, T.poly([[-90, 0], [90, 0], [70, 30], [-70, 30]]), '#3b2b20', 3.5);
      for (const mx of [-45, 0, 45]) { T.line(ctx, [[mx, 0], [mx, -150]], 4, '#3b2b20'); for (let k = 0; k < 3; k++) sh(ctx, T.rect(mx - 26 + k * 2, -140 + k * 44, 52 - k * 4, 38, 6), '#efe7d4', 3); }
      G.Atlas.unionFlag(ctx, 45, -150, .5, t * 3 + i);
      ctx.restore();
    }
  }

  G.Sets = { nightSky, greySky, sleet, slab, iceField, water, boat, farBank, snowBank, lantern, nightRiver, fire, tent, campGround, winterRoad, fleet };
})(window);
