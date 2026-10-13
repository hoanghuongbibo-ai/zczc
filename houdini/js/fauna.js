/* Fauna for the painted look: horse, chicken, dog, sheep, cat, butterfly, duck. All side views, warm brown ink,
 * flat fills with a light belly/back shade, and an idle loop driven by t (no random jitter):
 *   Fauna.horse(ctx, x, y, s, t, { dir, coat, mane, graze })   feet at (x, y), s = 1 → ~230 px long
 *   Fauna.chicken(ctx, x, y, s, t, { dir, ph })  Fauna.dog(ctx, x, y, s, t, { dir, coat })  Fauna.sheep(ctx, x, y, s, t, { dir, ph })
 *   Fauna.cat(ctx, x, y, s, t, { dir, coat })  Fauna.butterfly(ctx, x, y, s, t, { col, ph })  Fauna.duck(...)  */
(function (G) {
  'use strict';
  const P = G.Paint, { sh, ln, circ, OUT } = P, TAU = Math.PI * 2;
  const shade = (hex, k) => G.Guide.hexMul(hex, k);
  const leg = (ctx, x, y0, y1, w, col, bend = 0) => { ln(ctx, [[x, y0], [x + bend, (y0 + y1) / 2], [x, y1]], w + 6); ln(ctx, [[x, y0], [x + bend, (y0 + y1) / 2], [x, y1]], w, col); };
  function frame(ctx, x, y, s, dir) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (dir || 1), s); }

  function horse(ctx, x, y, s, t, o = {}) {
    const coat = o.coat || '#8a5a36', mane = o.mane || '#3a2418', ph = o.ph || 0, graze = o.graze ? (Math.sin(t * .7 + ph) * .5 + .5) : 0, tail = Math.sin(t * 2.2 + ph) * .25, br = Math.sin(t * 1.6 + ph) * 1.5;
    frame(ctx, x, y, s, o.dir);
    // far legs (darker), tail
    leg(ctx, -58, -70, 0, 11, shade(coat, .75), 4); leg(ctx, 58, -70, 0, 11, shade(coat, .75), -3);
    ctx.save(); ctx.translate(-92, -112); ctx.rotate(.5 + tail); sh(ctx, mane, 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-18, 40, -6, 86); c.quadraticCurveTo(6, 56, 12, 4); c.closePath(); }); ctx.restore();
    // body
    sh(ctx, coat, 4.5, c => { c.moveTo(-96, -116 + br); c.quadraticCurveTo(-104, -76, -72, -66); c.quadraticCurveTo(0, -56, 74, -68); c.quadraticCurveTo(104, -80, 94, -118); c.quadraticCurveTo(40, -140 + br, -40, -136 + br); c.quadraticCurveTo(-90, -134, -96, -116 + br); c.closePath(); });
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, -100, 100, 40, 0, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(255,240,210,.18)'; ctx.fillRect(-100, -150, 200, 30); ctx.fillStyle = 'rgba(40,20,10,.18)'; ctx.fillRect(-100, -82, 200, 30); ctx.restore();
    // neck + head (grazing lowers it)
    ctx.save(); ctx.translate(72, -118); ctx.rotate(-.25 + graze * 1.25);
    sh(ctx, coat, 4.5, c => { c.moveTo(-14, 10); c.quadraticCurveTo(10, -50, 30, -82); c.lineTo(58, -70); c.quadraticCurveTo(40, -30, 34, 24); c.closePath(); });
    sh(ctx, mane, 3, c => { c.moveTo(-12, 4); c.quadraticCurveTo(6, -50, 28, -84); c.lineTo(18, -88); c.quadraticCurveTo(-6, -50, -24, 2); c.closePath(); });
    ctx.save(); ctx.translate(44, -78); ctx.rotate(.45);
    sh(ctx, coat, 4.5, c => { c.moveTo(-14, -10); c.quadraticCurveTo(10, -22, 46, -8); c.quadraticCurveTo(60, 0, 54, 14); c.quadraticCurveTo(30, 20, -10, 14); c.closePath(); });
    sh(ctx, shade(coat, .8), 0, c => c.ellipse(46, 6, 10, 8, 0, 0, TAU)); sh(ctx, OUT, 0, circ(48, 2, 2.5));
    sh(ctx, coat, 3.5, c => { c.moveTo(-6, -12); c.lineTo(-2, -32); c.lineTo(8, -14); c.closePath(); }); sh(ctx, OUT, 0, circ(10, -4, 3.4)); sh(ctx, '#fff', 0, circ(11, -5, 1.2));
    ctx.restore(); ctx.restore();
    // near legs with hooves (a lazy weight shift)
    const sw = Math.sin(t * .9 + ph) * 3; leg(ctx, -76, -72, 0, 13, coat, -4 + sw); leg(ctx, 74, -72, 0, 13, coat, 3 - sw);
    for (const hx of [-76, 74]) sh(ctx, '#3a2a20', 2.5, c => c.roundRect(hx - 9, -8, 18, 10, 3));
    ctx.restore();
  }
  function chicken(ctx, x, y, s, t, o = {}) {
    const ph = o.ph || 0, cyc = (t * .6 + ph) % 1, peck = cyc > .8 ? Math.sin((cyc - .8) / .2 * Math.PI) : 0, col = o.col || '#f2e8d8';
    frame(ctx, x, y, s, o.dir);
    leg(ctx, -6, -18, 0, 3, '#e0a030'); leg(ctx, 8, -18, 0, 3, '#e0a030');
    sh(ctx, shade(col, .85), 3.5, c => { c.moveTo(-30, -40); c.quadraticCurveTo(-46, -70, -34, -76); c.quadraticCurveTo(-24, -60, -18, -46); c.closePath(); });
    sh(ctx, col, 3.5, c => { c.moveTo(-30, -36); c.quadraticCurveTo(-26, -16, 0, -14); c.quadraticCurveTo(26, -16, 26, -36); c.quadraticCurveTo(20, -52, -4, -50); c.quadraticCurveTo(-26, -50, -30, -36); c.closePath(); });
    curve(ctx, [-16, -36], [-4, -26], [12, -34], 2.5, 'rgba(0,0,0,.25)');
    ctx.save(); ctx.translate(18, -46); ctx.rotate(peck * 1.1); sh(ctx, col, 3.5, c => c.ellipse(6, -10, 12, 14, 0, 0, TAU)); sh(ctx, '#d8433a', 2.5, c => { c.moveTo(0, -22); c.quadraticCurveTo(4, -32, 8, -24); c.quadraticCurveTo(12, -32, 14, -22); c.closePath(); });
    sh(ctx, '#e8a030', 2.5, c => { c.moveTo(16, -10); c.lineTo(26, -7); c.lineTo(16, -4); c.closePath(); }); sh(ctx, '#d8433a', 0, c => c.ellipse(14, 0, 3, 5, 0, 0, TAU)); sh(ctx, OUT, 0, circ(9, -12, 2.2)); ctx.restore();
    ctx.restore();
  }
  function dog(ctx, x, y, s, t, o = {}) {
    const coat = o.coat || '#c98a4e', wag = Math.sin(t * 9 + (o.ph || 0)) * .5, pant = Math.abs(Math.sin(t * 6));
    frame(ctx, x, y, s, o.dir);
    ctx.save(); ctx.translate(-40, -36); ctx.rotate(-.9 + wag); sh(ctx, coat, 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-8, -24, 4, -40); c.quadraticCurveTo(8, -20, 8, 0); c.closePath(); }); ctx.restore();
    sh(ctx, coat, 4, c => { c.moveTo(-44, -6); c.quadraticCurveTo(-56, -50, -20, -60); c.quadraticCurveTo(14, -66, 22, -40); c.lineTo(24, 0); c.closePath(); });
    sh(ctx, shade(coat, 1.25), 0, c => c.ellipse(14, -30, 10, 22, 0, 0, TAU));
    leg(ctx, 12, -30, 0, 9, coat, 2); sh(ctx, coat, 3, c => c.ellipse(-26, -6, 22, 10, 0, 0, TAU));
    ctx.save(); ctx.translate(20, -70); sh(ctx, coat, 4, c => c.ellipse(0, 0, 24, 21, 0, 0, TAU)); sh(ctx, shade(coat, 1.2), 3, c => c.ellipse(20, 8, 14, 10, 0, 0, TAU)); sh(ctx, OUT, 0, c => c.ellipse(32, 4, 5, 4, 0, 0, TAU));
    sh(ctx, OUT, 0, circ(8, -6, 3.2)); sh(ctx, '#fff', 0, circ(9, -7, 1.2)); sh(ctx, shade(coat, .65), 3, c => { c.moveTo(-12, -14); c.quadraticCurveTo(-26, 0, -18, 18); c.quadraticCurveTo(-8, 8, -4, -12); c.closePath(); });
    if (pant > .3) sh(ctx, '#e85d6a', 2, c => c.ellipse(24, 18 + pant * 4, 5, 7, 0, 0, TAU)); ctx.restore();
    ctx.restore();
  }
  function sheep(ctx, x, y, s, t, o = {}) {
    const ph = o.ph || 0, g = (Math.sin(t * .8 + ph) * .5 + .5);
    frame(ctx, x, y, s, o.dir);
    for (const lx of [-26, -12, 14, 28]) leg(ctx, lx, -30, 0, 6, '#3a2e2a');
    const B = [[-30, -48, 22], [-10, -56, 24], [12, -54, 23], [30, -46, 20], [-20, -36, 20], [6, -34, 22], [26, -34, 18]];
    for (const [bx, by, r] of B) sh(ctx, null, 7, circ(bx, by, r)); for (const [bx, by, r] of B) sh(ctx, '#f6f1e6', 0, circ(bx, by, r)); for (const [bx, by, r] of B) sh(ctx, '#ffffff', 0, circ(bx - 4, by - 5, r * .5));
    ctx.save(); ctx.translate(44, -50); ctx.rotate(g * .8); sh(ctx, '#3a2e2a', 3, c => c.ellipse(10, 0, 14, 11, .3, 0, TAU)); sh(ctx, '#3a2e2a', 2, c => c.ellipse(-2, -10, 8, 4, -.6, 0, TAU)); sh(ctx, '#fff', 0, circ(12, -3, 2)); ctx.restore();
    ctx.restore();
  }
  function cat(ctx, x, y, s, t, o = {}) {
    const coat = o.coat || '#e09a4a', tail = Math.sin(t * 1.4 + (o.ph || 0)) * .4, blink = (t % 4.3) < .12;
    frame(ctx, x, y, s, o.dir);
    ctx.save(); ctx.translate(-22, -8); ctx.rotate(tail); sh(ctx, coat, 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-40, -6, -38, -40); c.quadraticCurveTo(-30, -14, 6, -8); c.closePath(); }); ctx.restore();
    sh(ctx, coat, 4, c => { c.moveTo(-28, 0); c.quadraticCurveTo(-34, -46, 0, -52); c.quadraticCurveTo(26, -46, 22, 0); c.closePath(); }); for (let i = 0; i < 3; i++) curve(ctx, [-20 + i * 10, -40], [-16 + i * 10, -30], [-20 + i * 10, -20], 2.5, shade(coat, .7));
    ctx.save(); ctx.translate(4, -64); sh(ctx, coat, 4, c => { c.ellipse(0, 0, 22, 19, 0, 0, TAU); }); for (const sx of [-1, 1]) sh(ctx, coat, 3.5, c => { c.moveTo(sx * 18, -8); c.lineTo(sx * 16, -28); c.lineTo(sx * 4, -16); c.closePath(); });
    for (const sx of [-1, 1]) { if (blink) ln(ctx, [[sx * 8 - 4, -2], [sx * 8 + 4, -2]], 2.5); else { sh(ctx, '#7ab040', 2, c => c.ellipse(sx * 8, -2, 4, 5, 0, 0, TAU)); ln(ctx, [[sx * 8, -5], [sx * 8, 1]], 1.6); } } sh(ctx, '#e85d6a', 0, c => c.ellipse(0, 6, 3, 2, 0, 0, TAU)); ctx.restore();
    ctx.restore();
  }
  function butterfly(ctx, x, y, s, t, o = {}) {
    const ph = o.ph || 0, f = Math.abs(Math.sin(t * 14 + ph)), col = o.col || '#f6a04d', px = x + Math.sin(t * .9 + ph) * 60, py = y + Math.sin(t * 1.7 + ph * 2) * 26;
    ctx.save(); ctx.translate(px, py); ctx.scale(s, s); ctx.rotate(Math.sin(t * .9 + ph) * .3);
    for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx * (.25 + .75 * f), 1); sh(ctx, col, 2.5, c => c.ellipse(10, -6, 11, 9, -.4, 0, TAU)); sh(ctx, shade(col, .85), 2.5, c => c.ellipse(8, 7, 7, 6, .4, 0, TAU)); sh(ctx, '#fff', 0, circ(12, -8, 2.5)); ctx.restore(); }
    ln(ctx, [[0, -10], [0, 10]], 3); ctx.restore();
  }
  function duck(ctx, x, y, s, t, o = {}) {
    const bob = Math.sin(t * 2 + (o.ph || 0)) * 2; frame(ctx, x, y + bob, s, o.dir);
    sh(ctx, '#f2e8d8', 3.5, c => { c.moveTo(-26, -6); c.quadraticCurveTo(-30, -26, -6, -24); c.quadraticCurveTo(16, -24, 22, -10); c.quadraticCurveTo(10, 4, -26, -6); c.closePath(); });
    sh(ctx, '#3f7a4a', 3.5, c => c.ellipse(16, -32, 10, 10, 0, 0, TAU)); sh(ctx, '#e8a030', 2.5, c => c.ellipse(28, -30, 7, 3.5, 0, 0, TAU)); sh(ctx, OUT, 0, circ(18, -34, 1.8)); ctx.restore();
  }
  const curve = (ctx, a, b, c, w, col) => { ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(...b, ...c); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); };
  G.Fauna = { horse, chicken, dog, sheep, cat, butterfly, duck };
})(window);
