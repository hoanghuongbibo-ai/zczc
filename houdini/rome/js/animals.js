// Real-looking cows and goats, after the ones the user circled in the cow-field clip (ink outline, flat shading):
// cow: white with chocolate patches, straight back, hip bones, thin legs and dark hooves, pink udder and muzzle, small horns, tufted tail;
// goat: lean white body, swept-back horns, beard, upright tail.
// Same calls as before: cow(ctx, x, y, s, t, { graze, flip, unimpressed, look, col }), goat(ctx, x, y, s, t, { flip, col, graze }); both face left.
(function (G) {
  const P = G.Paint, { ink, cel, mix } = P, INK = P.INK;
  // soft ground shadow without a blur filter (blur per figure is slow on crowded frames)
  const shadow = (ctx, w, a) => { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w * .55); g.addColorStop(0, `rgba(40,24,14,${a})`); g.addColorStop(1, 'rgba(40,24,14,0)'); ctx.save(); ctx.scale(1, .16); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, w * .55, 0, 7); ctx.fill(); ctx.restore(); };
  const rnd = seed => { let s = Math.abs(Math.round(seed)) % 2147483646 + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
  function leg(ctx, x0, y0, x1, kneeX, col, w, hoof) { // a jointed leg from the body down to a dark hoof
    const ky = y0 * .42, kw = w * .62, fw = w * .5;
    cel(ctx, c => { c.moveTo(x0 - w, y0); c.quadraticCurveTo(x0 - w, ky - 20, kneeX - kw, ky); c.lineTo(x1 - fw, -12); c.lineTo(x1 + fw, -12); c.lineTo(kneeX + kw, ky); c.quadraticCurveTo(x0 + w, ky - 20, x0 + w, y0); c.closePath(); }, col, { shade: mix(col, '#5a4a40', .3), dx: w * .35, dy: 0, lw: 4 });
    ink(ctx, hoof, c => { c.moveTo(x1 - fw - 1, -13); c.lineTo(x1 + fw + 1, -13); c.lineTo(x1 + fw + 3, 0); c.lineTo(x1 - fw - 4, 0); c.closePath(); }, 3.5); }
  function cow(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    const ph = (o.seed ?? y) * .13, r = rnd(o.seed ?? Math.round(y * 7 + s * 997 + 11)), // patches seeded by the cow, not its x: walking must not reshuffle them
      W = o.col || '#f6f2ea', SH = mix(W, '#7a6a64', .3), SP = o.spot || '#5e3a26', step = o.walk ? Math.sin(t * 4 + ph) * 12 : 0;
    const chew = Math.sin(t * 5 + ph), blink = ((t + ph) % 4.3) < .13, tailSw = Math.sin(t * 1.7 + ph) * 12;
    shadow(ctx, 420, .4);
    // far legs (darker)
    leg(ctx, -96, -122, -94 - step, -90, SH, 15, '#2a2020'); leg(ctx, 130, -126, 132 + step, 148, SH, 16, '#2a2020');
    // tail with its dark tuft
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(168, -222); ctx.quadraticCurveTo(186 + tailSw * .3, -170, 180 + tailSw, -96); ctx.stroke(); ctx.strokeStyle = W; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    ink(ctx, '#3a2a20', c => c.ellipse(180 + tailSw, -88, 9, 18, tailSw * .01, 0, 7), 3);
    // neck (behind the barrel's front edge)
    const g = !!o.graze, hx = g ? -196 : -206, hy = g ? -104 : -238, ang = g ? .38 + Math.sin(t * 1.4 + ph) * .04 : .12;
    cel(ctx, c => { c.moveTo(-110, -238); c.quadraticCurveTo(hx + 30, g ? -200 : -256, hx + 22, hy - 14); c.lineTo(hx - 6, hy + 40); c.quadraticCurveTo(-170, g ? -110 : -160, -150, -130); c.closePath(); }, W, { shade: SH, dx: 8, dy: 10, lw: 5 });
    leg(ctx, -122, -124, -126 + step, -118, W, 16, '#2a2020'); leg(ctx, 110, -130, 112 - step, 132, W, 18, '#2a2020');
    // the barrel: straight back, hip bone, rump, deep belly, brisket
    const body = c => { c.moveTo(-132, -236); c.quadraticCurveTo(-10, -244, 96, -240); c.quadraticCurveTo(112, -258, 128, -244); c.quadraticCurveTo(170, -236, 172, -196); c.quadraticCurveTo(176, -150, 150, -120); c.quadraticCurveTo(120, -104, 60, -104); c.quadraticCurveTo(-30, -92, -112, -112); c.quadraticCurveTo(-158, -126, -164, -170); c.quadraticCurveTo(-162, -222, -132, -236); c.closePath(); };
    cel(ctx, body, W, { shade: SH, light: '#ffffff', dx: 0, dy: 16 });
    ctx.save(); body(ctx); ctx.clip(); ctx.fillStyle = o.plain ? 'rgba(0,0,0,0)' : SP;
    for (let i = 0; i < 5; i++) { const px = -120 + r() * 280, py = -230 + r() * 110, rx = 26 + r() * 34, ry = 18 + r() * 24, pts = []; for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283, m = .75 + r() * .45; pts.push([px + Math.cos(a) * rx * m, py + Math.sin(a) * ry * m]); }
      ctx.beginPath(); const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; let q = mid(pts[8], pts[0]); ctx.moveTo(...q); for (let k = 0; k < 9; k++) { const n = mid(pts[k], pts[(k + 1) % 9]); ctx.quadraticCurveTo(...pts[k], ...n); } ctx.fill(); }
    ctx.restore(); ink(ctx, null, body, 5);
    ctx.strokeStyle = 'rgba(80,60,50,.45)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(110, -236); ctx.quadraticCurveTo(118, -200, 104, -160); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-110, -200); ctx.quadraticCurveTo(-100, -160, -104, -122); ctx.stroke();
    // udder
    cel(ctx, c => { c.moveTo(48, -108); c.quadraticCurveTo(50, -76, 72, -74); c.quadraticCurveTo(96, -74, 98, -108); c.closePath(); }, '#f0a8a8', { shade: '#c87a80', dx: 4, dy: 3, lw: 3.5 });
    for (const tx of [58, 72, 86]) ink(ctx, '#e8908e', c => c.rect(tx - 3, -78, 6, 10), 2);
    // near legs
    // neck and head (grazing: lowered to the grass)
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang);
    // head pointing down-left: poll at the top, muzzle at the bottom
    for (const d of [-1, 1]) cel(ctx, c => c.ellipse(16 + d * 4, -12, 26, 11, d > 0 ? -.4 : .3, 0, 7), d > 0 ? SH : W, { shade: SH, lw: 3.5 });
    ink(ctx, '#e8dcc0', c => { c.moveTo(-4, -22); c.quadraticCurveTo(-6, -46, 6, -48); c.quadraticCurveTo(2, -38, 6, -22); c.closePath(); }, 3);
    const head = c => { c.moveTo(-26, -18); c.quadraticCurveTo(-4, -34, 26, -20); c.quadraticCurveTo(30, 30, 22, 70); c.quadraticCurveTo(0, 84, -26, 70); c.quadraticCurveTo(-34, 30, -26, -18); c.closePath(); };
    cel(ctx, head, W, { shade: SH, light: '#ffffff', dx: 8, dy: 6 });
    ctx.save(); head(ctx); ctx.clip(); ctx.fillStyle = o.plain ? 'rgba(0,0,0,0)' : SP; ctx.beginPath(); ctx.ellipse(-4, 6, 26, 24, .2, 0, 7); ctx.fill(); ctx.restore(); ink(ctx, null, head, 4.5);
    cel(ctx, c => c.ellipse(-2, 72 + chew, 24, 16, 0, 0, 7), '#f0b0a8', { shade: '#c8807a', dx: 3, dy: 3, lw: 3.5 });
    ctx.fillStyle = INK; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-2 + d * 9, 74 + chew, 3, 4.5, 0, 0, 7); ctx.fill(); }
    // eye (half-lidded when unimpressed)
    const ex = -14, ey = 10; if (blink) { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - 7, ey); ctx.lineTo(ex + 7, ey); ctx.stroke(); }
    else { ink(ctx, '#fffaf0', c => c.ellipse(ex, ey, 7, 8, 0, 0, 7), 2.5); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(ex + (o.look || 0) * 2, ey + 1, 4, 0, 7); ctx.fill();
      if (o.unimpressed) { ink(ctx, SP, c => { c.moveTo(ex - 9, ey - 9); c.lineTo(ex + 9, ey - 9); c.lineTo(ex + 9, ey); c.lineTo(ex - 9, ey); c.closePath(); }, 0); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - 9, ey); ctx.lineTo(ex + 9, ey); ctx.stroke(); } }
    ctx.restore(); ctx.restore(); }
  function goat(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    const ph = (o.seed ?? y) * .21, W = o.col || '#f2eee6', SH = mix(W, '#7a6a5a', .3), nib = o.graze === false ? 0 : Math.max(0, Math.sin(t * 2.2 + ph)), g = o.graze !== false && (o.graze || (Math.floor(o.seed ?? y) % 3 !== 0));
    shadow(ctx, 170, .38);
    const lg = (x0, x1, col) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(x0, -64); ctx.quadraticCurveTo(x0 + (x1 - x0) * .5 + 3, -30, x1, -6); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 9.5; ctx.stroke(); ctx.restore(); ink(ctx, '#3a3030', c => c.rect(x1 - 6, -8, 12, 8), 2.5); };
    lg(-40, -44, SH); lg(48, 54, SH);
    // short upright tail
    ink(ctx, W, c => { c.moveTo(64, -100); c.quadraticCurveTo(76, -126, 82, -124); c.quadraticCurveTo(80, -110, 70, -94); c.closePath(); }, 3.5);
    const hx = -58, hy = g ? -40 + nib * 6 : -126, ang = g ? -.35 : .15;
    cel(ctx, c => { c.moveTo(-36, -102); c.quadraticCurveTo(-62, g ? -96 : -118, hx + 4, hy - 4); c.lineTo(hx + 18, hy + 18); c.quadraticCurveTo(-48, -70, -46, -62); c.closePath(); }, W, { shade: SH, dx: 5, dy: 6, lw: 4 });
    lg(-52, -50, W); lg(38, 42, W);
    const body = c => { c.moveTo(-48, -108); c.quadraticCurveTo(4, -100, 60, -110); c.quadraticCurveTo(82, -100, 74, -72); c.quadraticCurveTo(66, -56, 40, -60); c.quadraticCurveTo(0, -62, -34, -52); c.quadraticCurveTo(-62, -56, -62, -84); c.closePath(); };
    cel(ctx, body, W, { shade: SH, light: '#ffffff', dx: 0, dy: 10, lw: 4.5 });
    // neck and head: grazing goats dip and nibble, the others hold their head up
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang);
    for (const d of [0, 1]) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(4 + d * 6, -22); ctx.quadraticCurveTo(20 + d * 6, -50, 44 + d * 4, -40); ctx.stroke(); ctx.strokeStyle = d ? '#8a7a64' : '#b8a888'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
    cel(ctx, c => c.ellipse(24, -10, 16, 6, .4, 0, 7), SH, { shade: SH, lw: 3 });
    const head = c => { c.moveTo(-6, -24); c.quadraticCurveTo(16, -28, 20, -10); c.quadraticCurveTo(12, 14, -16, 30); c.quadraticCurveTo(-30, 30, -28, 18); c.quadraticCurveTo(-18, 0, -6, -24); c.closePath(); };
    cel(ctx, head, W, { shade: SH, light: '#fff', dx: 5, dy: 4, lw: 4 });
    ink(ctx, mix(W, '#a89a84', .5), c => { c.moveTo(-16, 26); c.lineTo(-12, 46); c.lineTo(-4, 24); c.closePath(); }, 2.5);
    ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-2, -8, 3, 4, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(-24, 22, 2, 0, 7); ctx.fill();
    ctx.restore(); ctx.restore(); }
  P.cow = cow; P.goat = goat;
})(window);
