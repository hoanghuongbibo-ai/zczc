/* Cowboy episode animals, painted look:
 *   Beasts.longhorn(ctx, x, y, s, t, o)   side view facing right (o.dir -1 = left), feet at (x, y); s = 1 → ~250 px body.
 *       o.mode 'stand'|'walk'|'run'|'graze'|'lie', o.ph (phase), o.coat (index or [base, patch]), o.horn (span scale), o.lift (stampede rear-up 0..1)
 *   Beasts.face(ctx, x, y, s, t, o)       front portrait (the "this guy" / unimpressed stare): o.mood 'meh'|'alarm'|'sleepy', o.chew
 *   Beasts.steed(ctx, x, y, s, t, o)      horse with gait 'stand'|'walk'|'trot'|'gallop'|'swim', saddle, o.rider = cast preset (Guide figure on top)
 *   Beasts.mini(ctx, x, y, s, t, o)       small rider silhouette for distant crews (shirt, hat, horse coat)
 *   Beasts.herd(ctx, t, o)                many longhorns in a depth band, sorted, wrapping, optional dust
 *   Beasts.tumbleweed(ctx, x, y, r, t)    rolling twig ball
 */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, { sh, ln, circ, OUT } = P, { clamp, lerp, rng } = T, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k);
  const COATS = [['#c98a4e', null], ['#f0e6d6', '#a8522e'], ['#33261f', '#efe6d6'], ['#8a5a3a', '#d6b48a'], ['#dcc8a4', '#6b4a32'], ['#b0593a', null], ['#5e4c44', null], ['#e8dcc8', '#33261f'], ['#a8683e', '#f0e4d0']];
  const limb = (ctx, pts, w, col) => { ln(ctx, pts, w + 5); ln(ctx, pts, w, col); };

  // ---------------- longhorn (side) ----------------
  function horns(ctx, span, col = '#efe2c4') {   // the famous handlebar: one horn toward the viewer-left, one to the right, tips curling up
    const g = ctx.createLinearGradient(-span, 0, span, 0); g.addColorStop(0, '#5a4a3a'); g.addColorStop(.18, col); g.addColorStop(.5, '#f6ecd6'); g.addColorStop(.82, col); g.addColorStop(1, '#5a4a3a');
    const shape = c => { c.moveTo(-6, -4); c.bezierCurveTo(-span * .45, -2, -span * .8, 4, -span * .98, -26); c.quadraticCurveTo(-span * 1.02, -40, -span * .94, -46); c.quadraticCurveTo(-span * .86, -16, -span * .5, -12); c.quadraticCurveTo(-span * .2, -14, -4, -16);
      c.lineTo(4, -16); c.quadraticCurveTo(span * .2, -14, span * .5, -12); c.quadraticCurveTo(span * .86, -16, span * .94, -46); c.quadraticCurveTo(span * 1.02, -40, span * .98, -26); c.bezierCurveTo(span * .8, 4, span * .45, -2, 6, -4); c.closePath(); };
    sh(ctx, g, 3.5, shape);
    ctx.save(); ctx.beginPath(); shape(ctx); ctx.clip(); ctx.strokeStyle = 'rgba(90,70,40,.35)'; ctx.lineWidth = 1.5; for (let k = 1; k < 7; k++) { const x = span * k / 7; ctx.beginPath(); ctx.moveTo(x, -18); ctx.lineTo(x + 4, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-x, -18); ctx.lineTo(-x - 4, 0); ctx.stroke(); } ctx.restore();
  }
  function longhorn(ctx, x, y, s, t, o = {}) {
    const coat = Array.isArray(o.coat) ? o.coat : COATS[(o.coat ?? 0) % COATS.length], base = coat[0], patch = coat[1], ph = o.ph || 0, mode = o.mode || 'stand';
    const walk = mode === 'walk', run = mode === 'run', lie = mode === 'lie', graze = mode === 'graze';
    const f = run ? 2.6 : walk ? .9 : 0, cyc = t * f * TAU + ph * 7, bob = run ? Math.abs(Math.sin(cyc)) * -10 : walk ? Math.sin(cyc * 2) * 1.5 : Math.sin(t * 1.3 + ph) * 1.2;
    const lift = o.lift || 0, low = lie ? 58 : 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s); ctx.rotate(-lift * .35 + (run ? Math.sin(cyc) * .03 : 0));
    // legs (far pair darker)
    const legSet = (near) => { const col = near ? base : mul(base, .72), dk = near ? 0 : 1;
      for (const [hx, off] of [[66 - dk * 10, 0], [-66 - dk * 10, PI]]) {
        if (lie) { ln(ctx, [[hx, -46], [hx + 22, -14], [hx - 6, -8]], 14, OUT); ln(ctx, [[hx, -46], [hx + 22, -14], [hx - 6, -8]], 9, col); continue; }
        const a = (walk || run ? Math.sin(cyc + off + (near ? 0 : PI * .5)) : 0) * (run ? .6 : .32), kneeB = (walk || run) ? Math.max(0, Math.sin(cyc + off + (near ? 0 : PI * .5) + 1.2)) * (run ? .9 : .5) : 0;
        const top = [hx, -86 + bob], knee = [hx + Math.sin(a) * 44, -86 + bob + Math.cos(a) * 44], foot = [knee[0] + Math.sin(a + kneeB * (hx > 0 ? -1 : 1)) * 40, knee[1] + Math.cos(a + kneeB) * 40];
        limb(ctx, [top, knee, foot], near ? 11 : 10, col); sh(ctx, '#2a1c14', 2, c => c.ellipse(foot[0] + 2, foot[1] - 2, 8, 5, 0, 0, TAU)); } };
    legSet(false);
    // tail
    { const sw = Math.sin(t * 2.4 + ph * 3) * .35 + (run ? .9 : 0); ctx.save(); ctx.translate(-104, -140 + bob + low); ctx.rotate(.25 + sw); ln(ctx, [[0, 0], [-6, 40], [-2, 74]], 5); ln(ctx, [[0, 0], [-6, 40], [-2, 74]], 2.5, mul(base, .8)); sh(ctx, '#3a2a20', 2, c => c.ellipse(-2, 84, 7, 14, 0, 0, TAU)); ctx.restore(); }
    // body
    const by = bob + low, body = c => { c.moveTo(-104, -128 + by); c.quadraticCurveTo(-108, -164 + by, -76, -166 + by); c.quadraticCurveTo(-10, -158 + by, 40, -168 + by); c.quadraticCurveTo(64, -178 + by, 88, -160 + by); c.quadraticCurveTo(110, -128 + by, 100, -92 + by); c.quadraticCurveTo(90, -62 + by, 54, -70 + by); c.quadraticCurveTo(0, -58 + by, -60, -74 + by); c.quadraticCurveTo(-100, -86 + by, -104, -128 + by); c.closePath(); };
    sh(ctx, base, 4, body);
    ctx.save(); ctx.beginPath(); body(ctx); ctx.clip();
    if (patch) { const r = rng(Math.floor(ph * 1000) + 7); ctx.fillStyle = patch; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-80 + r() * 160, -150 + r() * 70 + by, 18 + r() * 30, 12 + r() * 20, r() * 3, 0, TAU); ctx.fill(); } }
    ctx.fillStyle = 'rgba(255,240,215,.22)'; ctx.fillRect(-110, -180 + by, 220, 30); ctx.fillStyle = 'rgba(30,15,5,.22)'; ctx.fillRect(-110, -96 + by, 220, 40);
    ctx.strokeStyle = 'rgba(40,20,10,.3)'; ctx.lineWidth = 2; for (const xx of [-30, -10, 10]) { ctx.beginPath(); ctx.moveTo(xx, -150 + by); ctx.quadraticCurveTo(xx + 6, -120 + by, xx, -96 + by); ctx.stroke(); }
    ctx.restore();
    // head + horns (lowered when grazing / running)
    const hd = graze ? (Math.sin(t * .6 + ph * 2) * .5 + .5) * .9 + .3 : run ? .35 : lie ? .05 : Math.sin(t * .5 + ph) * .06;
    ctx.save(); ctx.translate(92, -150 + by); ctx.rotate(hd);
    sh(ctx, base, 4, c => { c.moveTo(-14, -16); c.quadraticCurveTo(14, -24, 26, -10); c.lineTo(30, 22); c.quadraticCurveTo(0, 36, -20, 26); c.closePath(); });   // neck
    ctx.save(); ctx.translate(26, 0); ctx.rotate(.55);
    const head = c => { c.moveTo(-8, -22); c.quadraticCurveTo(22, -26, 58, -6); c.quadraticCurveTo(70, 6, 60, 16); c.quadraticCurveTo(26, 22, -6, 14); c.closePath(); };
    sh(ctx, base, 4, head); if (patch) { ctx.save(); ctx.beginPath(); head(ctx); ctx.clip(); ctx.fillStyle = patch; ctx.beginPath(); ctx.ellipse(20, -6, 22, 10, .1, 0, TAU); ctx.fill(); ctx.restore(); }
    sh(ctx, '#d89a8a', 3, c => c.ellipse(60, 6, 9, 9, 0, 0, TAU)); sh(ctx, OUT, 0, circ(62, 6, 2.4));
    const blink = (t + ph * 3) % 4.3 < .12; if (blink) ln(ctx, [[14, -8], [24, -8]], 3); else { sh(ctx, OUT, 0, circ(19, -8, 4.2)); sh(ctx, '#fff', 0, circ(20.5, -9.5, 1.4)); }
    sh(ctx, mul(base, .85), 3, c => { c.moveTo(-4, -14); c.quadraticCurveTo(-24, -26, -26, -10); c.quadraticCurveTo(-14, -6, -2, -6); c.closePath(); });   // ear
    ctx.save(); ctx.translate(2, -18); ctx.rotate(-.55 + hd * -.3); ctx.scale(1, 1.35); horns(ctx, 112 * (o.horn || 1)); ctx.restore();
    ctx.restore(); ctx.restore();
    legSet(true);
    ctx.restore();
  }

  // ---------------- longhorn portrait (front) ----------------
  function face(ctx, x, y, s, t, o = {}) {
    const mood = o.mood || 'meh', coat = Array.isArray(o.coat) ? o.coat : COATS[o.coat ?? 1], base = coat[0], patch = coat[1], chew = o.chew ? Math.sin(t * 5) * 4 : 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, mul(base, .9), 4, c => { c.moveTo(-150, 220); c.quadraticCurveTo(-130, 60, -70, 20); c.lineTo(70, 20); c.quadraticCurveTo(130, 60, 150, 220); c.closePath(); });   // neck/shoulders
    ctx.save(); ctx.translate(0, -110); ctx.scale(1.9, 2.1); horns(ctx, 300 * (o.horn || 1) / 1.9); ctx.restore();
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 92, -84); ctx.rotate(sd * (.5 + Math.sin(t * 1.7 + sd) * .06)); sh(ctx, base, 4, c => c.ellipse(sd * 30, 0, 44, 20, 0, 0, TAU)); sh(ctx, '#e8b0a0', 0, c => c.ellipse(sd * 32, 0, 28, 10, 0, 0, TAU)); ctx.restore(); }
    const skull = c => { c.moveTo(-90, -120); c.quadraticCurveTo(0, -150, 90, -120); c.quadraticCurveTo(100, -10, 62, 80); c.quadraticCurveTo(0, 120 + chew, -62, 80); c.quadraticCurveTo(-100, -10, -90, -120); c.closePath(); };
    sh(ctx, base, 5, skull); ctx.save(); ctx.beginPath(); skull(ctx); ctx.clip(); if (patch) { ctx.fillStyle = patch; ctx.beginPath(); ctx.ellipse(-60, -40, 50, 80, .2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -90, 40, 40, 0, 0, TAU); ctx.fill(); } ctx.fillStyle = 'rgba(255,240,215,.25)'; ctx.fillRect(-100, -150, 70, 260); ctx.restore();
    for (let k = 0; k < 7; k++) ln(ctx, [[-40 + k * 13, -132], [-46 + k * 13 + Math.sin(t + k) * 3, -100]], 5, mul(base, .7));   // forelock
    sh(ctx, '#e3a796', 4.5, c => c.ellipse(0, 76 + chew * .5, 70, 46, 0, 0, TAU)); for (const sd of [-1, 1]) sh(ctx, '#5a2a22', 0, c => c.ellipse(sd * 28, 76 + chew * .5, 10, 14, sd * .3, 0, TAU));
    ln(ctx, [[-24, 108 + chew], [0, 112 + chew], [24, 108 + chew]], 3.5);
    for (const sd of [-1, 1]) { const ex = sd * 50, ey = -30;
      sh(ctx, '#fff', 4, c => c.ellipse(ex, ey, 22, 24, 0, 0, TAU)); const pr = mood === 'alarm' ? 9 : 13; sh(ctx, '#1b1917', 0, circ(ex + (o.look || 0) * 6, ey + 4, pr)); sh(ctx, '#fff', 0, circ(ex + 4, ey - 2, 4));
      const lid = mood === 'meh' ? .55 : mood === 'sleepy' ? .75 : 0, bl = (t % 4.1) < .14 ? 1 : lid;
      if (bl > 0) { ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, 22, 24, 0, 0, TAU); ctx.clip(); ctx.fillStyle = mul(base, .9); ctx.fillRect(ex - 30, ey - 30, 60, 54 * bl); ctx.restore(); ln(ctx, [[ex - 24, ey - 24 + 48 * bl], [ex + 24, ey - 24 + 48 * bl]], 4.5); }
      if (mood === 'meh') ln(ctx, [[ex - 26 * sd * -1 - 2 * sd, ey - 36], [ex + 22 * sd, ey - 32]], 5); }
    ctx.restore();
  }

  // ---------------- horse with gaits + rider ----------------
  function steed(ctx, x, y, s, t, o = {}) {
    const coat = o.coat || '#8a5a36', mane = o.mane || '#3a2418', ph = o.ph || 0, gait = o.gait || 'stand', dir = o.dir || 1;
    const F = { stand: 0, walk: 1.1, trot: 1.9, gallop: 2.6, swim: .9 }[gait] || 0, cyc = t * F * TAU + ph * 5;
    const bob = gait === 'gallop' ? -Math.abs(Math.sin(cyc)) * 12 : gait === 'trot' ? -Math.abs(Math.sin(cyc)) * 5 : gait === 'walk' ? Math.sin(cyc * 2) * 1.6 : Math.sin(t * 1.6 + ph) * 1.2;
    const pitch = gait === 'gallop' ? Math.sin(cyc) * .05 : 0, stumble = o.stumble || 0;
    const L = (k, near) => { const amp = { stand: 0, walk: .35, trot: .5, gallop: .75, swim: .6 }[gait] || 0; return Math.sin(cyc + k) * amp; };
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.rotate(pitch + stumble * .25); if (stumble) ctx.translate(0, stumble * 30);
    const legs = near => { const col = near ? coat : mul(coat, .72), off = near ? 0 : PI * .5;
      for (const [hx, k0, front] of [[74, 0, 1], [-76, PI, 0]]) { const a = L(k0 + off, near) - (front && stumble ? stumble * .9 : 0), top = [hx - (near ? 0 : 12), -74 + bob], knee = [top[0] + Math.sin(a) * 40, top[1] + Math.cos(a) * 38],
        bend = gait === 'stand' ? 0 : Math.max(0, Math.sin(cyc + k0 + off + 1.4)) * (front ? -.9 : .9), foot = [knee[0] + Math.sin(a + bend) * 36, knee[1] + Math.cos(a + bend) * 36];
        limb(ctx, [top, knee, foot], near ? 12 : 11, col); sh(ctx, '#2a1c14', 2.5, c => c.roundRect(foot[0] - 8, foot[1] - 8, 16, 9, 3)); } };
    legs(false);
    ctx.save(); ctx.translate(-92, -112 + bob); ctx.rotate(.5 + Math.sin(t * 2.2 + ph) * .2 + (gait === 'gallop' ? .5 : 0)); sh(ctx, mane, 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-18, 40, -6, 86); c.quadraticCurveTo(6, 56, 12, 4); c.closePath(); }); ctx.restore();
    const body = c => { c.moveTo(-96, -116 + bob); c.quadraticCurveTo(-104, -76 + bob, -72, -66 + bob); c.quadraticCurveTo(0, -56 + bob, 74, -68 + bob); c.quadraticCurveTo(104, -80 + bob, 94, -118 + bob); c.quadraticCurveTo(40, -140 + bob, -40, -136 + bob); c.quadraticCurveTo(-90, -134 + bob, -96, -116 + bob); c.closePath(); };
    sh(ctx, coat, 4.5, body); ctx.save(); ctx.beginPath(); body(ctx); ctx.clip(); ctx.fillStyle = 'rgba(255,240,210,.2)'; ctx.fillRect(-100, -150 + bob, 200, 30); ctx.fillStyle = 'rgba(40,20,10,.2)'; ctx.fillRect(-100, -84 + bob, 200, 30); if (o.paint) { ctx.fillStyle = '#f2ead8'; ctx.beginPath(); ctx.ellipse(-30, -96 + bob, 40, 26, .3, 0, TAU); ctx.fill(); } ctx.restore();
    const head = gait === 'gallop' ? .25 : gait === 'swim' ? -.35 : 0;
    ctx.save(); ctx.translate(72, -118 + bob); ctx.rotate(-.25 + head + (o.graze ? 1.1 : 0) + stumble * .4);
    sh(ctx, coat, 4.5, c => { c.moveTo(-14, 10); c.quadraticCurveTo(10, -50, 30, -82); c.lineTo(58, -70); c.quadraticCurveTo(40, -30, 34, 24); c.closePath(); });
    sh(ctx, mane, 3, c => { c.moveTo(-12, 4); c.quadraticCurveTo(6, -50, 28, -84); c.lineTo(18, -88); c.quadraticCurveTo(-6, -50, -24, 2); c.closePath(); });
    ctx.save(); ctx.translate(44, -78); ctx.rotate(.45);
    sh(ctx, coat, 4.5, c => { c.moveTo(-14, -10); c.quadraticCurveTo(10, -22, 46, -8); c.quadraticCurveTo(60, 0, 54, 14); c.quadraticCurveTo(30, 20, -10, 14); c.closePath(); });
    if (o.blaze) sh(ctx, '#f2ead8', 0, c => c.ellipse(26, -6, 18, 5, 0, 0, TAU));
    sh(ctx, mul(coat, .8), 0, c => c.ellipse(46, 6, 10, 8, 0, 0, TAU)); sh(ctx, OUT, 0, circ(48, 2, 2.5));
    sh(ctx, coat, 3.5, c => { c.moveTo(-6, -12); c.lineTo(-2, -32); c.lineTo(8, -14); c.closePath(); }); sh(ctx, OUT, 0, circ(10, -4, 3.4)); sh(ctx, '#fff', 0, circ(11, -5, 1.2));
    if (o.saddle !== false) { ln(ctx, [[-4, -8], [44, 4]], 2.5, '#3a2418'); ln(ctx, [[44, 4], [44, 12]], 2.5, '#3a2418'); }
    ctx.restore(); ctx.restore();
    if (o.saddle !== false) {   // blanket + saddle (rider sits at about (-8, -140))
      sh(ctx, o.blanket || '#b2342f', 3, c => c.roundRect(-46, -138 + bob, 70, 44, 6)); ctx.strokeStyle = 'rgba(255,240,200,.6)'; ctx.lineWidth = 3; for (const yy of [-128, -110]) { ctx.beginPath(); ctx.moveTo(-44, yy + bob); ctx.lineTo(22, yy + bob); ctx.stroke(); }
      sh(ctx, '#6b4026', 3.5, c => { c.moveTo(-40, -132 + bob); c.quadraticCurveTo(-30, -150 + bob, -10, -140 + bob); c.quadraticCurveTo(10, -138 + bob, 18, -156 + bob); c.lineTo(24, -150 + bob); c.quadraticCurveTo(22, -126 + bob, 10, -122 + bob); c.lineTo(-36, -120 + bob); c.closePath(); });
      sh(ctx, '#5a3420', 2.5, circ(21, -158 + bob, 5)); }
    legs(true);
    ctx.restore();
    if (o.rider) {   // the rider: a Guide figure from the hips up, a near leg in the stirrup, reins to the bit
      const R = s * .4, sx = x + dir * (-8) * s, sy = y + (-140 + bob) * s, OF = G.Guide.OUTFITS[o.rider.outfit] || {}, lc = (OF.legs && OF.legs.c) || '#4a5a78';
      const rb = gait === 'gallop' ? Math.sin(cyc * 2) * 3 * s : 0;
      G.Guide.draw(ctx, sx, sy + 150 * R + rb, R, Object.assign({ t, pose: 'idle', turn: .55, light: { cast: 0, contact: 0 } }, o.rider, { outfit: o.rider.outfit + '@ride', mirror: dir < 0 }, o.riderOpts || {}));
      ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
      const hip = [-2, -138 + bob], knee = [22, -110 + bob], ank = [12, -82 + bob];
      ln(ctx, [hip, knee, ank], 16); ln(ctx, [hip, knee, ank], 11, lc); if (OF.legs && OF.legs.kind === 'chaps') ln(ctx, [[hip[0] + 4, hip[1] + 4], [knee[0], knee[1] + 2], [ank[0] + 2, ank[1] - 6]], 6, OF.legs.chap || '#8a5432');
      sh(ctx, OF.boot || '#5a3420', 3, c => { c.moveTo(ank[0] - 7, ank[1] - 8); c.lineTo(ank[0] + 7, ank[1] - 8); c.lineTo(ank[0] + 8, ank[1] + 4); c.lineTo(ank[0] + 18, ank[1] + 8); c.lineTo(ank[0] - 8, ank[1] + 8); c.closePath(); });
      ln(ctx, [[ank[0] - 10, ank[1] + 10], [ank[0] + 14, ank[1] + 10]], 3, '#5a5048');
      ln(ctx, [[22, -130 + bob], [118 + (gait === 'gallop' ? 6 : 0), -176 + bob]], 1.8, '#3a2418');
      ctx.restore();
    }
  }

  // ---------------- small distant rider ----------------
  function mini(ctx, x, y, s, t, o = {}) {
    const dir = o.dir || 1, coat = o.coat || '#7a4a2e', F = o.gait === 'gallop' ? 2.6 : o.gait === 'stand' ? 0 : 1.1, cyc = t * F * TAU + (o.ph || 0) * 5, amp = F ? (F > 2 ? .7 : .35) : 0, bob = F > 2 ? -Math.abs(Math.sin(cyc)) * 6 : 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
    for (const [hx, k] of [[34, 0], [-36, PI], [26, PI * .5], [-44, PI * 1.5]]) { const a = Math.sin(cyc + k) * amp; ln(ctx, [[hx, -40 + bob], [hx + Math.sin(a) * 40, -40 + bob + Math.cos(a) * 40]], 9, OUT); ln(ctx, [[hx, -40 + bob], [hx + Math.sin(a) * 40, -40 + bob + Math.cos(a) * 40]], 5, k > 1 && k < 5 ? mul(coat, .75) : coat); }
    sh(ctx, coat, 3, c => c.ellipse(-4, -58 + bob, 52, 22, 0, 0, TAU)); sh(ctx, coat, 3, c => { c.moveTo(30, -72 + bob); c.quadraticCurveTo(42, -98 + bob, 54, -108 + bob); c.lineTo(62, -98 + bob); c.quadraticCurveTo(54, -78 + bob, 50, -58 + bob); c.closePath(); }); sh(ctx, coat, 3, c => c.ellipse(66, -100 + bob, 16, 8, .55, 0, TAU)); sh(ctx, coat, 2, c => { c.moveTo(52, -108 + bob); c.lineTo(54, -120 + bob); c.lineTo(60, -108 + bob); c.closePath(); });
    sh(ctx, o.mane || '#2a1a12', 0, c => { c.moveTo(32, -74 + bob); c.quadraticCurveTo(42, -96 + bob, 52, -108 + bob); c.lineTo(46, -108 + bob); c.quadraticCurveTo(36, -94 + bob, 26, -74 + bob); c.closePath(); }); ln(ctx, [[-52, -64 + bob], [-62, -36 + bob]], 6, o.mane || '#2a1a12');
    if (o.rider !== false) { sh(ctx, o.shirt || '#b9573e', 3, c => c.roundRect(-14, -112 + bob, 24, 40, 6)); sh(ctx, o.skin || '#f0c4a0', 3, circ(-2, -122 + bob, 11));
      sh(ctx, o.hat || '#7a5a3a', 2.5, c => c.ellipse(-2, -128 + bob, 22, 5, 0, 0, TAU)); sh(ctx, o.hat || '#7a5a3a', 2.5, c => c.roundRect(-11, -146 + bob, 18, 18, 4)); ln(ctx, [[-2, -74 + bob], [8, -54 + bob]], 6, o.jeans || '#4a5a78'); }
    ctx.restore();
  }

  // ---------------- herd ----------------
  const herdCache = {};
  function herd(ctx, t, o = {}) {
    const key = [o.seed || 1, o.n || 40].join(':'); let H = herdCache[key];
    if (!H) { const r = rng(o.seed || 1); H = herdCache[key] = []; for (let i = 0; i < (o.n || 40); i++) H.push({ u: r(), v: r(), coat: Math.floor(r() * COATS.length), ph: r(), horn: .75 + r() * .45, sp: .85 + r() * .3, mode: r() }); }
    const [x0, x1] = o.x || [-200, 1480], [y0, y1] = o.y || [520, 680], [s0, s1] = o.s || [.18, .42], span = x1 - x0, dir = o.dir || 1, sp = o.speed ?? (o.mode === 'run' ? 260 : o.mode === 'walk' ? 26 : 0), pan = o.pan || 0, depth = o.depth ?? 1;
    const list = H.map(c => { const s = lerp(s0, s1, c.v), y = lerp(y0, y1, c.v), base = x0 + c.u * span + dir * sp * c.sp * t * lerp(.5, 1, c.v); let x = ((base - x0) % span + span) % span + x0; return { c, s, y, x: x - pan * depth * lerp(.6, 1, c.v) }; }).sort((a, b) => a.y - b.y);
    for (const { c, s, y, x } of list) { if (x < -260 || x > W_ + 260) continue; const mode = o.mode === 'mix' ? (c.mode < .45 ? 'graze' : c.mode < .8 ? 'stand' : 'walk') : o.mode || 'stand';
      longhorn(ctx, x, y, s, t * (mode === 'run' ? 1 : c.sp), { dir: (o.mode === 'mix' && c.mode > .9) ? -dir : dir, mode, coat: c.coat, ph: c.ph, horn: c.horn, lift: o.lift ? clamp(o.lift(c)) : 0 });
      if (o.each) o.each(ctx, x, y, s, c); }
    if (o.dust) { ctx.save(); ctx.globalCompositeOperation = 'source-over'; const r = rng(3); for (let i = 0; i < (o.dustN || 14); i++) { const k = (t * (o.mode === 'run' ? .5 : .12) + r()) % 1, dx = (r() * span + dir * t * sp * .6) % span + x0, dy = lerp(y0, y1, r()) - k * 60; const gr = ctx.createRadialGradient(dx, dy, 0, dx, dy, 120 * (1 + k)); gr.addColorStop(0, `rgba(214,186,140,${o.dust * (1 - k) * .55})`); gr.addColorStop(1, 'rgba(214,186,140,0)'); ctx.fillStyle = gr; ctx.fillRect(dx - 260, dy - 260, 520, 520); } ctx.restore(); }
  }
  const W_ = 1280;

  // ---------------- tumbleweed ----------------
  let twCanvas = null;
  function tumbleweed(ctx, x, y, r, t, spin = 1) {
    if (!twCanvas) { twCanvas = document.createElement('canvas'); twCanvas.width = twCanvas.height = 240; const g = twCanvas.getContext('2d'), rr = rng(42); g.translate(120, 120); g.lineCap = 'round';
      for (let i = 0; i < 70; i++) { const a = rr() * TAU, b = a + (rr() - .5) * 3, d0 = rr() * 90, d1 = 40 + rr() * 60; g.strokeStyle = ['#8a6a3e', '#a8844e', '#6b4e2c', '#c4a066'][i % 4]; g.lineWidth = 2 + rr() * 2.5; g.beginPath(); g.moveTo(Math.cos(a) * d0, Math.sin(a) * d0); g.quadraticCurveTo(Math.cos((a + b) / 2) * 110, Math.sin((a + b) / 2) * 110, Math.cos(b) * d1, Math.sin(b) * d1); g.stroke(); }
      g.strokeStyle = 'rgba(60,40,20,.8)'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, 100, 0, TAU); g.setLineDash([12, 18]); g.stroke(); }
    ctx.save(); ctx.fillStyle = 'rgba(60,40,20,.2)'; ctx.beginPath(); ctx.ellipse(x, y + r * .95, r * .9, r * .18, 0, 0, TAU); ctx.fill();
    ctx.translate(x, y); ctx.rotate(t * spin); ctx.drawImage(twCanvas, -r * 1.2, -r * 1.2, r * 2.4, r * 2.4); ctx.restore();
  }

  G.Beasts = { COATS, longhorn, face, steed, mini, herd, tumbleweed, horns };
})(window);
