/* THEO — the history channel's own guide / myth-buster (an original design; the user's sheet was only the brief:
 * round white face, black hair, dark suit, black-and-white ink look). His own signature, so he reads at a glance:
 *   - a springy question-mark curl on top of the hair (it bounces after every move: o.curl / Guide.curlRing),
 *   - big glossy oval eyes with a highlight and thick, very expressive brows,
 *   - a red tie + red pocket square: the only colour on him, so he pops on paper sets and dark graphics,
 *   - white gloved-style hands with one clean outline, chunky round shoes, a brass magnifying glass as his prop.
 *
 * Guide.draw(ctx, x, y, s, o)   feet at (x, y); s = 1 → ~560 px tall (head ≈ 1/3 of the height).
 *   o.t        time (idle breathing, auto blinks, curl sway)
 *   o.pose     preset name, or the blend from Guide.pose(t, [[t0,'idle'], [t1,'wave'], …])
 *   o.turn     -1 … 1  (0 = facing camera, +1 = three-quarter facing screen-right), o.back = true for the back view
 *   o.face     { eyes: 'open'|'wide'|'happy'|'closed'|'squint'|'wink',  brows: 'neutral'|'up'|'worried'|'angry'|'skeptic'|'sly',
 *                mouth: 'grin'|'smile'|'open'|'o'|'shock'|'flat'|'frown'|'smirk'|'grit', look: [x, y] (-1…1) }
 *   o.talk     0…1 mouth opening (Guide.talk(t) reads window.ENV from biz/tools/envelope.py)
 *   o.walk     stride phase (radians), o.lean, o.headTilt, o.curl (extra curl angle, e.g. Guide.curlRing(t - t0)),
 *   o.prop     'magnifier' (held in the right hand by the 'magnify' pose), o.mirror, o.noBlink
 * Poses: idle, present, presentL, presentBoth, pointUp, pointSide, pointSideL, wave, think, shrug, cheer,
 *        thumbsUp, hips, crossed, magnify, facepalm. */
(function (G) {
  'use strict';
  const INK = '#1b1917', LW = 5;
  const C = { face: '#ffffff', hair: '#18181b', hairHi: '#4a4c55', suit: '#34363d', suitShade: '#26272d', suitHi: '#50535c',
    shirt: '#ffffff', tie: '#d8433a', tieDark: '#a52f28', cheek: 'rgba(240,128,118,.32)', mouth: '#4e1a1a', tongue: '#e46f67',
    shoe: '#141416', brass: '#c9993c', glass: 'rgba(170,215,245,.38)' };
  const lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;

  function path(ctx, fn, fill, lw = LW) { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
  const seg = (ctx, pts, w, col = INK) => { ctx.beginPath(); ctx.moveTo(...pts[0]); for (const p of pts.slice(1)) ctx.lineTo(...p); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); };
  const curve = (ctx, a, b, c, w, col = INK) => { ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(...b, ...c); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); };
  // smooth open curve through points (midpoint quadratics)
  function through(c, pts, start = true) {
    if (start) c.moveTo(...pts[0]); else c.lineTo(...pts[0]);
    for (let i = 1; i < pts.length - 1; i++) c.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
    c.lineTo(...pts[pts.length - 1]);
  }
  // several pieces under ONE outline (the user's rule for hands): ink everything thick, then fill everything
  function union(ctx, pieces, fill, lw = 3.6) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const p of pieces) { ctx.beginPath(); p(ctx); ctx.lineWidth = lw * 2; ctx.strokeStyle = INK; ctx.stroke(); }
    ctx.fillStyle = fill; for (const p of pieces) { ctx.beginPath(); p(ctx); ctx.fill(); }
  }

  // ---------- poses: hand targets in figure space (feet at 0,0; shoulders ≈ y -310; +x = screen right) ----------
  const POSES = {
    idle:        { L: [-68, -158], R: [68, -158], hL: 'rest', hR: 'rest' },
    present:     { L: [-68, -158], R: [200, -292], hL: 'rest', hR: 'palm' },
    presentL:    { L: [-200, -292], R: [68, -158], hL: 'palm', hR: 'rest' },
    presentBoth: { L: [-188, -282], R: [188, -282], hL: 'palm', hR: 'palm' },
    pointUp:     { L: [-68, -158], R: [112, -462], hL: 'rest', hR: 'point' },
    pointSide:   { L: [-68, -158], R: [216, -322], hL: 'rest', hR: 'point' },
    pointSideL:  { L: [-216, -322], R: [68, -158], hL: 'point', hR: 'rest' },
    wave:        { L: [-68, -158], R: [168, -452], hL: 'rest', hR: 'wave' },
    think:       { L: [26, -232], R: [36, -334], hL: 'fist', hR: 'fist' },
    shrug:       { L: [-166, -268], R: [166, -268], hL: 'palm', hR: 'palm', shrug: true },
    cheer:       { L: [-128, -498], R: [128, -498], hL: 'fist', hR: 'fist' },
    thumbsUp:    { L: [-68, -158], R: [146, -356], hL: 'rest', hR: 'thumbsUp' },
    hips:        { L: [-90, -206], R: [90, -206], hL: 'fist', hR: 'fist', out: true },
    crossed:     { L: [-68, -158], R: [68, -158], hL: 'fist', hR: 'fist', cross: true },
    magnify:     { L: [-68, -158], R: [128, -380], hL: 'rest', hR: 'hold', prop: 'magnifier' },
    facepalm:    { L: [-68, -158], R: [24, -376], hL: 'rest', hR: 'palmIn' },
  };
  function blendPose(a, b, k) {
    const A = POSES[a] || POSES.idle, B = POSES[b] || POSES.idle, pick = key => k < .5 ? A[key] : B[key];
    return { L: [lerp(A.L[0], B.L[0], k), lerp(A.L[1], B.L[1], k)], R: [lerp(A.R[0], B.R[0], k), lerp(A.R[1], B.R[1], k)],
      hL: pick('hL'), hR: pick('hR'), cross: lerp(A.cross ? 1 : 0, B.cross ? 1 : 0, k), out: pick('out'), prop: pick('prop'),
      shrug: lerp(A.shrug ? 1 : 0, B.shrug ? 1 : 0, k) };
  }
  // keys = [[time, 'pose'], …]; each change eases over `dur` s with a little overshoot (anticipation → settle)
  function pose(t, keys, dur = .38) {
    let from = keys[0][1], to = keys[0][1], k = 1;
    for (let i = 0; i < keys.length; i++) if (t >= keys[i][0]) { from = i ? keys[i - 1][1] : keys[i][1]; to = keys[i][1]; k = clamp((t - keys[i][0]) / dur); }
    const s = k >= 1 ? 1 : 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2);   // back-out: overshoots ~6 % then settles
    return blendPose(from, to, s);
  }
  // the curl's spring: kick it at the moment of a move (turn, jump, slam) → damped wobble angle
  const curlRing = (dt, amp = .35) => dt < 0 ? 0 : amp * Math.exp(-4.2 * dt) * Math.sin(2 * Math.PI * 2.6 * dt);

  // ---------- hands (white, one outline; local +x = along the forearm) ----------
  function hand(ctx, x, y, kind, dir, flip) {
    ctx.save(); ctx.translate(x, y);
    if (kind === 'wave' || kind === 'thumbsUp') dir = -Math.PI / 2;     // fingers / thumb always point up
    ctx.rotate(dir); if (flip) ctx.scale(1, -1);
    const W = C.face, P = [];
    const finger = (ox, oy, a, len, r = 6) => c => { c.save(); c.translate(ox, oy); c.rotate(a); c.roundRect(-r, -r, len + r, r * 2, r); c.restore(); };
    if (kind === 'palm' || kind === 'wave' || kind === 'palmIn') {
      P.push(c => c.ellipse(12, 0, 17, 15, 0, 0, Math.PI * 2));
      for (const a of [-.42, -.14, .14, .42]) P.push(finger(20, a * 14, a, 20, 5.5));
      P.push(finger(8, -12, -1.15, 16, 6));
    } else if (kind === 'point') {
      P.push(c => c.ellipse(8, 0, 16, 15, 0, 0, Math.PI * 2)); P.push(finger(16, -4, 0, 30, 6)); P.push(finger(4, -12, -.9, 10, 6));
    } else if (kind === 'thumbsUp') {
      P.push(c => c.roundRect(-14, -16, 30, 32, 13)); P.push(finger(14, -9, -.1, 16, 7));   // fist, thumb sticking up (local +x is up after the -90° turn)
    } else if (kind === 'hold' || kind === 'fist') {
      P.push(c => c.ellipse(6, 0, 17, 16, 0, 0, Math.PI * 2)); P.push(c => c.ellipse(4, -12, 10, 7, -.5, 0, Math.PI * 2));
    } else { // rest: relaxed mitten, thumb along the side
      P.push(c => c.roundRect(-8, -14, 34, 28, 13)); P.push(finger(2, -12, -.55, 12, 6));
    }
    union(ctx, P, W);
    ctx.lineWidth = 2.2; ctx.strokeStyle = INK; ctx.lineCap = 'round';
    if (kind === 'fist' || kind === 'hold') for (const yy of [-2, 6]) { ctx.beginPath(); ctx.moveTo(14, yy); ctx.lineTo(21, yy); ctx.stroke(); }
    if (kind === 'rest') for (const yy of [-4, 4]) { ctx.beginPath(); ctx.moveTo(18, yy); ctx.lineTo(26, yy); ctx.stroke(); }
    ctx.restore();
  }
  // two-bone arm: a suit sleeve (outlined tube) + a white shirt cuff at the wrist
  function arm(ctx, sh, target, side, out) {
    const L1 = 82, L2 = 76, dx = target[0] - sh[0], dy = target[1] - sh[1], d = Math.min(Math.hypot(dx, dy), L1 + L2 - 1), th = Math.atan2(dy, dx);
    const a = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const e1 = [sh[0] + Math.cos(th + a) * L1, sh[1] + Math.sin(th + a) * L1], e2 = [sh[0] + Math.cos(th - a) * L1, sh[1] + Math.sin(th - a) * L1];
    const el = out ? (e1[0] * side > e2[0] * side ? e1 : e2) : (e1[1] + e1[0] * side * .15 > e2[1] + e2[0] * side * .15 ? e1 : e2);
    const wr = [sh[0] + Math.cos(th) * d, sh[1] + Math.sin(th) * d], dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]);
    const cuff = [wr[0] - Math.cos(dir) * 9, wr[1] - Math.sin(dir) * 9];
    seg(ctx, [sh, el, cuff], 36); seg(ctx, [sh, el, cuff], 26, C.suit);
    seg(ctx, [cuff, [wr[0] - Math.cos(dir) * 2, wr[1] - Math.sin(dir) * 2]], 25); seg(ctx, [cuff, [wr[0] - Math.cos(dir) * 2, wr[1] - Math.sin(dir) * 2]], 17, C.shirt);
    return { wr, dir, el };
  }
  function magnifier(ctx, wr, t) {
    const hx = wr[0] + 4, hy = wr[1] - 4, tip = [hx + 12, hy - 62], lc = [hx + 18, hy - 102];
    seg(ctx, [[hx, hy + 10], tip], 17); seg(ctx, [[hx, hy + 10], tip], 9, '#7a4a2a');
    path(ctx, c => c.arc(lc[0], lc[1], 44, 0, Math.PI * 2), C.brass, 4);
    path(ctx, c => c.arc(lc[0], lc[1], 34, 0, Math.PI * 2), '#eef7fc', 3.5);
    ctx.fillStyle = C.glass; ctx.beginPath(); ctx.arc(lc[0], lc[1], 34, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(lc[0], lc[1], 24, -2.6, -1.6); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineCap = 'round'; ctx.stroke();
    return lc;
  }

  // ---------- head (local: centre of the skull at 0,0; R ≈ 100) ----------
  const R = 100, RY = 94;
  function curlShape(ctx, ax, ay, ang) {   // the signature question-mark curl, pivoting at its root
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(ang);
    ctx.beginPath(); ctx.moveTo(-6, 8); ctx.bezierCurveTo(-16, -30, -6, -62, 22, -66); ctx.bezierCurveTo(50, -68, 58, -38, 40, -26); ctx.quadraticCurveTo(28, -18, 22, -30);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 26; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 17; ctx.strokeStyle = C.hair; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, -26); ctx.quadraticCurveTo(0, -50, 20, -56); ctx.lineWidth = 3.5; ctx.strokeStyle = C.hairHi; ctx.stroke();
    ctx.restore();
  }
  function head(ctx, f, talk, t, yaw, back, curlAng, noBlink) {
    const sx = phi => R * Math.sin(clamp(phi + yaw, -Math.PI / 2, Math.PI / 2)), vis = phi => Math.cos(phi + yaw);
    const hx = -Math.sin(yaw) * 12;                                   // more hair shows at the back of the head when he turns
    // ears: they sit on the silhouette; the far one tucks away as he turns
    for (const s of [-1, 1]) {
      const k = back ? 1 : clamp(1 + Math.cos(s * Math.PI / 2 + yaw) * 2.6); if (k <= .02) continue;
      const ex = s * (R - 2) + (back ? 0 : 0);
      path(ctx, c => c.ellipse(ex, 14, 17 * k, 22, 0, 0, Math.PI * 2), C.face, 4.5);
      if (!back) curve(ctx, [ex + s * 2 * k, 4], [ex + s * 9 * k, 14], [ex + s * 2 * k, 26], 3);
    }
    // curl behind the skull line (its root is hidden by the hair mass)
    const qa = back ? -.15 : .2 - yaw * .5, qx = back ? -R * .25 : sx(.3) * .72 + hx * .5;
    curlShape(ctx, qx, -RY + 16, (back ? -.2 : -.08) + curlAng);
    // hair mass
    const top = c => { c.ellipse(hx, -8, 106, 100, 0, Math.PI * .97, Math.PI * 2.03); c.closePath(); };
    if (back) { path(ctx, c => c.ellipse(0, 0, R + 6, RY + 4, 0, 0, Math.PI * 2), C.hair, LW);
      ctx.beginPath(); ctx.arc(10, -40, 16, 0, 5.2); ctx.lineWidth = 3.5; ctx.strokeStyle = C.hairHi; ctx.stroke();  // crown whorl
      return; }
    path(ctx, top, C.hair, LW);
    // face: the head disc below a swept, tufted fringe (fringe points live on the sphere, so they turn with him)
    const fr = [[-1.6, 12], [-1.38, 2], [-1.12, -30], [-.84, -36], [-.6, -24], [-.36, -42], [-.08, -32], [.14, -50], [.44, -40], [.7, -52], [.98, -38], [1.24, -14], [1.42, 2], [1.6, 12]]
      .map(([p, y]) => [sx(p) * 1.02, y]);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2); ctx.clip();
    const facePath = c => { through(c, fr); c.lineTo(fr[fr.length - 1][0] + 300, fr[fr.length - 1][1]); c.lineTo(400, 300); c.lineTo(-400, 300); c.lineTo(fr[0][0] - 300, fr[0][1]); c.closePath(); };
    ctx.beginPath(); facePath(ctx); ctx.fillStyle = C.face; ctx.fill();
    // soft shade on the far cheek (very light, keeps the flat look)
    ctx.save(); ctx.beginPath(); facePath(ctx); ctx.clip(); ctx.fillStyle = 'rgba(40,36,50,.07)'; ctx.beginPath(); ctx.ellipse((yaw > .05 ? 1 : -1) * 150, 30, 80, 120, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.beginPath(); through(ctx, fr); ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.stroke();
    ctx.restore();
    // jaw outline (below the fringe only)
    ctx.save(); ctx.beginPath(); ctx.rect(-200, -10, 400, 300); ctx.clip(); path(ctx, c => c.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2), null, LW); ctx.restore();
    // hair shine
    for (const [a, b, c2] of [[[-60, -78], [-30, -96], [6, -94]], [[30, -88], [52, -84], [66, -70]]]) curve(ctx, [a[0] + hx, a[1]], [b[0] + hx, b[1]], [c2[0] + hx, c2[1]], 4, C.hairHi);

    // ----- face features -----
    const lk = f.look || [0, 0], e = f.eyes || 'open', ey = 8 + lk[1] * 5;
    const blink = !noBlink && t != null && (t % 3.9 < .11 || (t + 1.7) % 6.3 < .11);
    // cheeks
    for (const s of [-1, 1]) { const v = vis(s * .78); if (v <= .4) continue; ctx.fillStyle = C.cheek; ctx.beginPath(); ctx.ellipse(sx(s * .78), 40, 15 * v, 9, 0, 0, Math.PI * 2); ctx.fill(); }
    for (const s of [-1, 1]) {
      const v = vis(s * .4); if (v < .12) continue;
      const fx = clamp(v, .35, 1), x = sx(s * .4) + lk[0] * 7;
      const shut = e === 'closed' || (blink && e !== 'happy') || (e === 'wink' && s > 0);
      if (e === 'happy') curve(ctx, [x - 12 * fx, ey + 5], [x, ey - 12], [x + 12 * fx, ey + 5], 5.5);
      else if (shut) curve(ctx, [x - 12 * fx, ey + 2], [x, ey + 7], [x + 12 * fx, ey + 2], 5);
      else {
        const big = e === 'wide' ? 1.22 : 1, ry = (e === 'squint' ? 8 : 17) * big;
        ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(x, ey + (e === 'squint' ? 4 : 0), 11.5 * fx * big, ry, 0, 0, Math.PI * 2); ctx.fill();
        if (e !== 'squint') { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 3.5 * fx, ey - 7 * big, 3.8 * big, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(x - 3 * fx, ey + 6 * big, 1.6 * big, 0, Math.PI * 2); ctx.fill(); }
      }
      // brows: thick, they carry most of the acting. inner end = toward the nose
      const b = f.brows || 'neutral', by = -24 - (e === 'wide' ? 6 : 0);
      let inner = 0, outer = 0, lift = 0, arch = -5;
      if (b === 'up') { lift = -11; arch = -7; } if (b === 'worried') { inner = -11; outer = 4; arch = 2; } if (b === 'angry') { inner = 9; outer = -5; arch = 0; }
      if (b === 'skeptic') { if (s > 0) { lift = -12; arch = -8; } else { inner = 4; outer = 3; arch = 0; } }
      if (b === 'sly') { inner = 5; outer = -3; arch = -2; }
      const xi = x - s * 14 * fx, xo = x + s * 15 * fx, yi = by + lift + inner, yo = by + lift + outer;
      curve(ctx, [xi, yi], [(xi + xo) / 2, (yi + yo) / 2 + arch], [xo, yo], 7.5);
    }
    // nose: a small hook toward the side he faces
    const nd = yaw < -.05 ? -1 : 1, nx = sx(0) * .86 + Math.sin(yaw) * 8;
    ctx.beginPath(); ctx.moveTo(nx + nd * 1, 16); ctx.quadraticCurveTo(nx + nd * 12, 28, nx - nd * 1, 33); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke();
    // mouth
    const m = f.mouth || 'smile', o = clamp(talk || 0), mx = sx(0) * .72, my = 56, wk = clamp(Math.cos(yaw) * .55 + .45);
    const openShape = (w, h, flatTop) => c => { c.moveTo(mx - w, my - 4); c.quadraticCurveTo(mx, my + (flatTop ? 2 : -6), mx + w, my - 4); c.quadraticCurveTo(mx + w * .8, my + h * 1.5, mx, my + h * 1.5); c.quadraticCurveTo(mx - w * .8, my + h * 1.5, mx - w, my - 4); c.closePath(); };
    const filled = (shp, teeth = true, tongue = true) => {
      path(ctx, shp, C.mouth, 4.5);
      ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip();
      if (teeth) { ctx.fillStyle = '#fff'; ctx.fillRect(mx - 60, my - 14, 120, 16); }
      if (tongue) { ctx.fillStyle = C.tongue; ctx.beginPath(); ctx.ellipse(mx + 3, my + 30, 18 * wk, 12, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore(); path(ctx, shp, null, 4.5);
    };
    if (m === 'o' || m === 'shock') { const w = (m === 'o' ? 11 : 17) * wk, h = m === 'o' ? 14 : 22; path(ctx, c => c.ellipse(mx, my + 8, w, h, 0, 0, Math.PI * 2), C.mouth, 4.5); if (m === 'shock') { ctx.save(); ctx.beginPath(); ctx.ellipse(mx, my + 8, w, h, 0, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = C.tongue; ctx.beginPath(); ctx.ellipse(mx, my + 28, w, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
    else if (m === 'grin' || m === 'open' || o > .08) {
      const w = (m === 'grin' ? 30 : lerp(17, 25, o)) * wk, h = m === 'grin' ? 17 : lerp(5, 15, Math.max(o, m === 'open' ? .6 : 0));
      filled(openShape(w, h, m === 'grin'), true, h > 8);
    } else if (m === 'grit') { const w = 24 * wk; path(ctx, c => c.roundRect(mx - w, my - 6, w * 2, 18, 7), '#fff', 4.5); seg(ctx, [[mx - w + 3, my + 3], [mx + w - 3, my + 3]], 2.5); }
    else if (m === 'smile' || m === 'smirk') { const w = 20 * wk; curve(ctx, [mx - w, my - 4 + (m === 'smirk' ? 4 : 0)], [mx + (m === 'smirk' ? 6 : 0), my + 12], [mx + w, m === 'smirk' ? my - 10 : my - 4], 5); }
    else if (m === 'frown') curve(ctx, [mx - 16 * wk, my + 9], [mx, my - 5], [mx + 16 * wk, my + 9], 5);
    else seg(ctx, [[mx - 13 * wk, my + 2], [mx + 13 * wk, my + 2]], 5);
  }

  // ---------- whole figure ----------
  function draw(ctx, x, y, s = 1, o = {}) {
    const t = o.t ?? 0, P = typeof o.pose === 'object' && o.pose.L ? o.pose : blendPose(o.pose || 'idle', o.pose || 'idle', 1);
    const back = !!o.back, turn = back ? 0 : clamp(o.turn || 0, -1, 1), yaw = turn * .7;
    const breathe = Math.sin(t * 2.1) * 2.4, talk = o.talk || 0, bob = -talk * 3 + breathe * .4;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.mirror ? -1 : 1), s); ctx.rotate(o.lean || 0);
    const nar = 1 - Math.abs(turn) * .12, vx = Math.sin(yaw) * 34;
    const top = -330 + breathe - (P.shrug || 0) * 12, sh = { L: [-58 * nar + turn * 4, top + 22], R: [58 * nar + turn * 4, top + 22] };
    // with the body turned, the far arm goes behind the jacket
    const far = turn > .25 ? 'L' : turn < -.25 ? 'R' : null;
    const handOf = (side, a) => { const sd = side === 'L' ? -1 : 1, k = P['h' + side]; hand(ctx, a.wr[0], a.wr[1], k, a.dir, sd < 0); };
    const doArm = side => {
      const sd = side === 'L' ? -1 : 1, a = arm(ctx, sh[side], back ? [P[side][0], P[side][1]] : P[side], sd, P.out);
      if (side === 'R' && P.prop === 'magnifier' && !back) { magnifier(ctx, a.wr, t); hand(ctx, a.wr[0], a.wr[1], 'hold', -Math.PI / 2 + .25, false); }
      else if (P['h' + side] !== 'palmIn' || back) handOf(side, a);
    };
    if (far && !(P.cross > .5)) doArm(far);
    // legs: trouser tubes + chunky round shoes (toes follow the turn); walking swings and lifts them
    const wk = o.walk, st = wk == null ? 0 : Math.sin(wk), toe = back ? 0 : Math.sin(yaw) * 14;
    for (const sd of [-1, 1]) {
      const sw = sd * st * 26, lift = wk == null ? 0 : Math.max(0, sd * Math.cos(wk)) * 12, fx = sd * 25 * nar + sw;
      seg(ctx, [[sd * 25 * nar, -150], [fx, -24 - lift]], 44); seg(ctx, [[sd * 25 * nar, -150], [fx, -24 - lift]], 34, C.suit);
      seg(ctx, [[sd * 25 * nar + sd * 4, -130], [fx + sd * 4, -34 - lift]], 2.5, C.suitShade);
      path(ctx, c => c.ellipse(fx + toe + sd * 5, -13 - lift, 30, 15, 0, 0, Math.PI * 2), C.shoe, 4);
      curve(ctx, [fx + toe + sd * 5 - 14, -20 - lift], [fx + toe + sd * 5, -24 - lift], [fx + toe + sd * 5 + 12, -20 - lift], 3, '#3d3e44');
    }
    // jacket
    const body = c => { c.moveTo(-28 * nar + vx * .2, top - 6); c.quadraticCurveTo(-60 * nar, top - 4, -66 * nar, top + 20); c.quadraticCurveTo(-72 * nar, -210, -66 * nar, -142);
      c.quadraticCurveTo(0, -128, 66 * nar, -142); c.quadraticCurveTo(72 * nar, -210, 66 * nar, top + 20); c.quadraticCurveTo(60 * nar, top - 4, 28 * nar + vx * .2, top - 6); c.closePath(); };
    path(ctx, body, C.suit, LW);
    ctx.save(); ctx.beginPath(); body(ctx); ctx.clip(); ctx.fillStyle = C.suitShade; ctx.beginPath(); ctx.ellipse((back ? 1 : -Math.sign(turn || 1)) * 110, -230, 70, 160, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    path(ctx, body, null, LW);
    if (back) {
      seg(ctx, [[0, top + 30], [0, -142]], 3, C.suitShade); seg(ctx, [[0, -175], [0, -142]], 3.5);
      path(ctx, c => { c.moveTo(-30, top - 6); c.quadraticCurveTo(0, top + 8, 30, top - 6); c.lineTo(26, top + 8); c.quadraticCurveTo(0, top + 22, -26, top + 8); c.closePath(); }, C.suitShade, 3.5);
    } else {
      // shirt V, collar, red tie, lapels, button, pocket square
      const V = [[vx - 26, top - 4], [vx + 26, top - 4], [vx, top + 112]];
      path(ctx, c => { c.moveTo(...V[0]); c.lineTo(...V[1]); c.lineTo(...V[2]); c.closePath(); }, C.shirt, 3.5);
      path(ctx, c => { c.moveTo(vx - 6, top + 54); c.lineTo(vx + 6, top + 54); c.lineTo(vx + 10, top + 98); c.lineTo(vx, top + 110); c.lineTo(vx - 10, top + 98); c.closePath(); }, C.tie, 3.5);
      path(ctx, c => { c.moveTo(vx - 8, top + 10); c.lineTo(vx + 8, top + 10); c.lineTo(vx + 9, top + 22); c.lineTo(vx + 13, top + 56); c.lineTo(vx, top + 62); c.lineTo(vx - 13, top + 56); c.lineTo(vx - 9, top + 22); c.closePath(); }, C.tie, 3.5);
      path(ctx, c => { c.moveTo(vx - 9, top + 8); c.lineTo(vx + 9, top + 8); c.lineTo(vx + 7, top + 22); c.lineTo(vx - 7, top + 22); c.closePath(); }, C.tieDark, 3);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 6, top - 6); c.lineTo(vx + sd * 28, top - 8); c.lineTo(vx + sd * 22, top + 16); c.closePath(); }, '#fff', 3.5);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 27, top - 2); c.lineTo(vx + sd * 46, top + 40); c.lineTo(vx + sd * 32, top + 46); c.lineTo(vx + sd * 2, top + 116); c.lineTo(vx + sd * 6, top + 98); c.lineTo(vx + sd * 22, top + 46); c.lineTo(vx + sd * 30, top + 38); c.closePath(); }, C.suitHi, 3.5);
      path(ctx, c => c.arc(vx, top + 134, 5.5, 0, Math.PI * 2), C.suitHi, 3);
      seg(ctx, [[vx, top + 142], [vx - 12, -140]], 3.5); seg(ctx, [[vx, top + 142], [vx + 12, -140]], 3.5);
      const px = vx + 40 * nar;   // breast pocket with the red square (his left = screen right)
      path(ctx, c => { c.moveTo(px - 10, top + 62); c.lineTo(px - 4, top + 50); c.lineTo(px + 4, top + 58); c.lineTo(px + 10, top + 48); c.lineTo(px + 15, top + 62); c.closePath(); }, C.tie, 3);
      seg(ctx, [[px - 14, top + 62], [px + 18, top + 62]], 4);
    }
    // arms in front (folded arms are their own shape)
    if ((P.cross || 0) > .5) {
      const yA = top + 98, yB = top + 116;
      seg(ctx, [sh.L, [-72, yA], [64, yA]], 36); seg(ctx, [sh.L, [-72, yA], [64, yA]], 26, C.suit); hand(ctx, 70, yA, 'fist', 0);
      seg(ctx, [sh.R, [72, yB], [-64, yB]], 36); seg(ctx, [sh.R, [72, yB], [-64, yB]], 26, C.suit); hand(ctx, -70, yB, 'fist', Math.PI, true);
    } else for (const side of ['L', 'R']) if (side !== far && !(side === 'R' && P.hR === 'palmIn' && !back)) doArm(side);
    // head (tilt + a small nod with the voice); the curl sways a touch on its own and rings after big moves
    ctx.save(); ctx.translate(vx * .45, top - 84 + bob); ctx.rotate((o.headTilt || 0) + Math.sin(t * 1.3) * .015 + talk * .02 * Math.sin(t * 9));
    head(ctx, o.face || {}, talk, t, yaw, back, (o.curl || 0) + Math.sin(t * 1.7) * .03, o.noBlink);
    ctx.restore();
    // facepalm: the palm goes over the face, so draw that hand last
    if (P.hR === 'palmIn' && !back) { const a = arm(ctx, sh.R, [vx * .45 + 34, top - 52], 1, true); ctx.save(); ctx.translate(a.wr[0], a.wr[1]); ctx.scale(1.3, 1.3); hand(ctx, 0, 0, 'palm', -Math.PI / 2 - .35, false); ctx.restore(); }
    ctx.restore();
  }

  function talk(t, env = G.ENV, from = -1e9, to = 1e9) {
    if (!env || t < from || t > to) return 0;
    const i = t * env.fps, a = env.v[Math.floor(i)] || 0, b = env.v[Math.floor(i) + 1] || 0, v = a + (b - a) * (i % 1);
    return clamp((v - .12) * 1.6);
  }
  G.Guide = { draw, pose, blendPose, talk, curlRing, POSES, C, name: 'Theo' };
})(window);
