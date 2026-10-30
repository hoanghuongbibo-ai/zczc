/* The horse, rebuilt (replaces World.horse): a proper side-view horse in the cast style — a deep barrel with chest and rump, a neck that
 * rises from the withers and arches into a long head (forelock, pricked ears, eye, nostril, a white blaze), a flowing mane and tail,
 * and four jointed legs: forelegs bend at the knee, hind legs at the hock, each with fetlock and hoof. Gaits: stand (weight shifts, tail
 * swish, head nods), walk, and a four-beat gallop with the body rocking and the neck stretched. Optional saddle and bridle are separate
 * tack drawn on top. Facing +x; feet at y = 0; withers ≈ 150 px high at s = 1. Pure function of t. */
(function (G) {
  'use strict';
  const W = G.World, { shape, mix, clamp, lerp, rng, INK } = G.Rig, sh = shape;
  const seg = (ctx, x0, y0, x1, y1, w0, w1, col) => { const a = Math.atan2(y1 - y0, x1 - x0) + Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
    sh(ctx, k => { k.moveTo(x0 + c * w0, y0 + s * w0); k.lineTo(x1 + c * w1, y1 + s * w1); k.arc(x1, y1, w1, a, a + Math.PI); k.lineTo(x0 - c * w0, y0 - s * w0); k.arc(x0, y0, w0, a + Math.PI, a); k.closePath(); }, col, { lw: 3.5 }); };
  // one leg: hip/shoulder at (x, y); angles a (upper) and b (lower, relative); hind legs bend the other way (hock)
  const leg = (ctx, x, y, a, b, hind, col, dark, sock) => { const L1 = hind ? 50 : 46, L2 = hind ? 48 : 46; const kx = x + Math.sin(a) * L1, ky = y + Math.cos(a) * L1, ab = a + (hind ? -b : b), fx = kx + Math.sin(ab) * L2, fy = ky + Math.cos(ab) * L2;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const up = hind ? 30 : 24; ctx.strokeStyle = INK; ctx.lineWidth = up + 7; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(kx, ky); ctx.stroke(); ctx.lineWidth = 19; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(fx, fy); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = up; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(kx, ky); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(fx, fy); ctx.stroke(); if (sock) { ctx.strokeStyle = '#f2eee6'; ctx.beginPath(); ctx.moveTo(lerp(kx, fx, .55), lerp(ky, fy, .55)); ctx.lineTo(fx, fy); ctx.stroke(); }
    ctx.fillStyle = mix(col, '#000000', .25); ctx.beginPath(); ctx.arc(kx, ky, 7, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(ab * .5); sh(ctx, k => { k.moveTo(-9, -4); k.lineTo(10, -4); k.lineTo(13, 8); k.lineTo(-9, 8); k.closePath(); }, '#2a2420', { lw: 3 }); ctx.restore(); };
  W.horse = (ctx, x, y, s, t, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); const col = o.col || '#7a4a2a', dark = mix(col, '#000000', .35), light = mix(col, '#ffffff', .2), hair = o.hair || mix(col, '#000000', .6), gal = !!o.gallop, walk = !!o.walk;
    const w = gal ? t * 11 : t * 6.5, bob = gal ? Math.sin(w * 2) * 5 : walk ? Math.sin(w * 2) * 2 : 0, pitch = gal ? Math.sin(w) * .05 : 0;
    // gait angles: [upper, lower-bend] for FL, FR, HL, HR
    const g = (ph, amp, bend) => { const p = w + ph; return [Math.sin(p) * amp, Math.max(0, Math.sin(p + 1.2)) * bend]; };
    const L = gal ? [g(0, .6, .9), g(.6, .6, .9), g(2.4, .5, .6), g(3.0, .5, .6)] : walk ? [g(0, .35, .8), g(Math.PI, .35, .8), g(Math.PI / 2, .3, .6), g(Math.PI * 1.5, .3, .6)] : [[.04, .02], [-.03 + Math.sin(t * .5) * .02, .02], [-.05, .05], [.03, .25 + Math.sin(t * .4) * .1]];
    ctx.fillStyle = 'rgba(20,16,10,.18)'; ctx.beginPath(); ctx.ellipse(0, 0, 100, 10, 0, 0, 7); ctx.fill();
    ctx.save(); ctx.translate(0, -bob); ctx.rotate(pitch);
    // far legs (darker), then the tail
    leg(ctx, 52, -88, L[1][0], L[1][1], false, dark, dark); leg(ctx, -62, -92, L[3][0], L[3][1], true, dark, dark);
    const tsw = Math.sin(t * (gal ? 6 : 1.7)) * (gal ? .25 : .18); ctx.save(); ctx.translate(-92, -122); ctx.rotate(.5 + tsw + (gal ? -.5 : 0)); sh(ctx, k => { k.moveTo(-6, 0); k.quadraticCurveTo(-22, 40, -10, 92); k.quadraticCurveTo(4, 100, 12, 88); k.quadraticCurveTo(14, 40, 8, 0); k.closePath(); }, hair, { lw: 3.5 }); ctx.strokeStyle = mix(hair, '#ffffff', .25); ctx.lineWidth = 1.6; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-2 + i * 2, 8); ctx.quadraticCurveTo(-12 + i * 3, 50, -4 + i * 4, 88); ctx.stroke(); } ctx.restore();
    // near legs, tucked under the barrel so they grow out of the body
    leg(ctx, 60, -90, L[0][0], L[0][1], false, col, dark, o.socks); leg(ctx, -68, -94, L[2][0], L[2][1], true, col, dark, o.socks);
    // barrel: chest, belly, rump
    const body = k => { k.moveTo(70, -150); k.bezierCurveTo(98, -140, 104, -100, 82, -82); k.bezierCurveTo(40, -66, -40, -68, -76, -82); k.bezierCurveTo(-104, -92, -110, -140, -86, -152); k.bezierCurveTo(-50, -164, 20, -156, 70, -150); k.closePath(); };
    sh(ctx, body, col, { lw: 4, shade: dark, dx: 0, dy: -12 }); W.fur(ctx, body, light, dark, 50, 11, 0, 8); ctx.save(); ctx.beginPath(); body(ctx); ctx.clip(); ctx.fillStyle = 'rgba(255,240,220,.18)'; ctx.beginPath(); ctx.ellipse(-10, -146, 80, 10, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(-70, -110, 30, -1.2, 1.4); ctx.moveTo(60, -140); ctx.quadraticCurveTo(48, -110, 56, -86); ctx.stroke(); ctx.restore();
    // neck + head
    const nod = gal ? Math.sin(w * 2) * .06 : walk ? Math.sin(w * 2) * .04 : Math.sin(t * 1.1) * .03 + (o.graze ? .9 : 0), reach = gal ? .25 : 0; ctx.save(); ctx.translate(62, -140); ctx.rotate(-.05 + nod + reach);
    const neck = k => { k.moveTo(-18, 6); k.bezierCurveTo(-8, -30, 12, -56, 36, -70); k.lineTo(58, -56); k.bezierCurveTo(44, -40, 34, -20, 32, 14); k.closePath(); }; sh(ctx, neck, col, { lw: 4, shade: dark, dx: -6 }); W.fur(ctx, neck, light, dark, 16, 12, -.6, 7);
    ctx.save(); ctx.translate(46, -66); ctx.rotate(.95 - reach * .6); const head = k => { k.moveTo(-18, -16); k.bezierCurveTo(10, -24, 46, -18, 66, -10); k.bezierCurveTo(78, -6, 80, 10, 70, 16); k.bezierCurveTo(50, 22, 20, 22, -6, 20); k.bezierCurveTo(-24, 16, -28, -8, -18, -16); k.closePath(); };
    sh(ctx, head, col, { lw: 4, shade: dark, dx: 0, dy: -6 }); if (o.blaze !== false) { ctx.fillStyle = '#f2eee6'; ctx.beginPath(); ctx.moveTo(4, -18); ctx.quadraticCurveTo(40, -18, 70, -8); ctx.lineTo(66, -3); ctx.quadraticCurveTo(40, -12, 6, -12); ctx.fill(); }
    ctx.fillStyle = mix(col, '#000000', .25); ctx.beginPath(); ctx.ellipse(70, 6, 9, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(70, 2, 3, 4, .3, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(56, 16); ctx.quadraticCurveTo(66, 20, 74, 14); ctx.stroke();
    const blink = ((t + 2.3) % 4.1) < .12; ctx.fillStyle = INK; if (blink) { ctx.fillRect(4, -6, 12, 3); } else { ctx.beginPath(); ctx.ellipse(10, -5, 5, 6, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(12, -7, 1.6, 0, 7); ctx.fill(); }
    for (const [ex, ea] of [[-10, -.5], [-2, -.25]]) { ctx.save(); ctx.translate(ex, -16); ctx.rotate(ea + Math.sin(t * 2.3 + ex) * .08); sh(ctx, k => { k.moveTo(-6, 0); k.quadraticCurveTo(-4, -26, 2, -30); k.quadraticCurveTo(8, -24, 7, 0); k.closePath(); }, col, { lw: 3 }); ctx.restore(); }
    ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-14, -18); ctx.quadraticCurveTo(4, -22, 10, -10); ctx.quadraticCurveTo(-2, -12, -14, -6); ctx.fill();
    if (o.saddle || o.bridle) { ctx.strokeStyle = '#3a2416'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(-10, -14); ctx.lineTo(-6, 18); ctx.moveTo(30, -18); ctx.lineTo(30, 20); ctx.moveTo(-8, 4); ctx.lineTo(62, 4); ctx.stroke(); sh(ctx, k => k.arc(60, 12, 4, 0, 7), '#c8ccd4', { lw: 2 }); }
    ctx.restore();
    // mane along the crest
    ctx.fillStyle = hair; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, 2); for (let i = 0; i <= 8; i++) { const u = i / 8, mx = lerp(-14, 40, u) - 6 + Math.sin(t * (gal ? 9 : 2) + i) * 2, my = lerp(2, -70, u); ctx.quadraticCurveTo(mx - 16, my + 4, mx - 4, my - 4); } ctx.lineTo(40, -68); ctx.bezierCurveTo(14, -54, -6, -30, -8, 8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    // tack: saddle blanket, saddle, girth, stirrup
    if (o.saddle) { sh(ctx, k => k.roundRect(-40, -160, 76, 44, 8), o.blanket || '#2a4a8a', { lw: 3 }); ctx.strokeStyle = '#e8c048'; ctx.lineWidth = 2.5; ctx.strokeRect(-36, -156, 68, 36); sh(ctx, k => { k.moveTo(-34, -160); k.quadraticCurveTo(-36, -178, -22, -176); k.quadraticCurveTo(0, -166, 18, -172); k.quadraticCurveTo(30, -178, 30, -160); k.closePath(); }, '#5a3420', { lw: 3 });
      ctx.strokeStyle = '#3a2416'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(4, -78); ctx.stroke(); if (!o.rider) { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-6, -150); ctx.lineTo(-8, -104); ctx.stroke(); sh(ctx, k => k.roundRect(-16, -106, 18, 8, 3), '#c8ccd4', { lw: 2 }); } }
    if (o.breath && !gal) { const ph = (t * .45) % 1; if (ph < .5) { const k = ph / .5; ctx.fillStyle = `rgba(230,236,246,${.35 * (1 - k)})`; ctx.beginPath(); ctx.arc(176 + k * 30, -128 + k * 10, 8 + k * 14, 0, 7); ctx.fill(); } }
    ctx.restore(); ctx.restore(); };
  // the saddle point (where a rider sits), in the horse's local space × s
  W.horseSeat = { x: -4, y: -172 };
})(window);
