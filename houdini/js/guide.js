/* THEO — the history channel's guide / myth-buster. An original design from the user's brief sheets (round white face,
 * thick short black hair, ink look) with his own identity: a full rounded mop of hair with a few springy tufts at the
 * crown, glossy oval eyes, thick acting brows, pink cheeks, white one-outline hands, and a WARDROBE that follows the
 * script: every era gets its outfit and headwear (js/wardrobe.js adds them to Guide.OUTFITS / Guide.HATS).
 *
 * Guide.draw(ctx, x, y, s, o)   feet at (x, y); s = 1 → ~560 px tall (head ≈ 1/3 of the height).
 *   o.t        time (idle breathing, auto blinks, hair sway)
 *   o.outfit   'suit' (default) | 'roman' | 'medieval' | 'edo' | 'victorian' | 'egypt' | 'explorer' | … (see wardrobe.js)
 *   o.hat      override the outfit's headwear: a Guide.HATS key, or 'none'
 *   o.pose     preset name, or the blend from Guide.pose(t, [[t0,'idle'], [t1,'wave'], …])
 *   o.turn     -1 … 1  (0 = facing camera, +1 = three-quarter facing screen-right), o.back = true for the back view
 *   o.face     { eyes: 'open'|'wide'|'happy'|'closed'|'squint'|'wink'|'half' (deadpan lids), blush, sweat,  brows: 'neutral'|'up'|'worried'|'angry'|'skeptic'|'sly',
 *                mouth: 'grin'|'smile'|'open'|'o'|'shock'|'flat'|'frown'|'smirk'|'grit', look: [x, y] (-1…1) }
 *   o.talk     0…1 mouth opening (Guide.talk(t) reads window.ENV from biz/tools/envelope.py)
 *   o.walk     stride phase (radians), o.lean, o.headTilt, o.hair (extra tuft angle, e.g. Guide.hairRing(t - t0)),
 *   o.look     cast variant: { hair: 'mop'|'bald'|'curly', hairCol, nose: 'big', width (body), chin, brow, browCol }
 *   o.prop     'magnifier' (held in the right hand by the 'magnify' pose), o.mirror, o.noBlink
 *   o.light    depth pass (on by default — the "4D" look): { x, y } direction TO the light (default upper-left),
 *              rim (colour), rimA, shadeA, cast (floor shadow strength, 0 = off), contact (0..1). o.light = false → flat.
 * Poses: idle, present, presentL, presentBoth, pointUp, pointSide, pointSideL, wave, think, shrug, cheer,
 *        thumbsUp, hips, crossed, magnify, facepalm, bow. */
(function (G) {
  'use strict';
  let INK = '#1b1917'; const LW = 5;
  const C = { face: '#ffffff', faceHi: '#ffffff', faceMid: '#fdfcfe', faceEdge: '#dcd8e4', noseFill: '#fbf8fb', hair: '#18181b', hairHi: '#4b4e59', hairRim: '#2c2d33', suit: '#34363d', suitShade: '#26272d', suitHi: '#50535c',
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
    hips:        { L: [-90, -206], R: [90, -206], hL: 'fist', hR: 'fist' },
    crossed:     { L: [-68, -158], R: [68, -158], hL: 'fist', hR: 'fist', cross: true },
    magnify:     { L: [-68, -158], R: [128, -380], hL: 'rest', hR: 'hold', prop: 'magnifier' },
    facepalm:    { L: [-68, -158], R: [24, -376], hL: 'rest', hR: 'palmIn' },
    bow:         { L: [-40, -150], R: [40, -150], hL: 'rest', hR: 'rest', bow: true },
    // talking gestures: both hands, elbows bent, hands at chest/waist height (used while a character speaks)
    // (user's reference: upper arm out and down from the shoulder, elbow OUT to the side, forearm up, hand beside the body; never across the chest)
    behind:      { L: [-40, -196], R: [40, -196], hL: 'fist', hR: 'fist', behind: true },
    talkA:       { L: [-148, -258], R: [148, -258], hL: 'palm', hR: 'palm' },
    talkB:       { L: [-140, -244], R: [156, -274], hL: 'palm', hR: 'palm' },
    talkC:       { L: [-156, -274], R: [140, -244], hL: 'palm', hR: 'palm' },
    talkD:       { L: [-160, -286], R: [160, -286], hL: 'palm', hR: 'palm' },
    talkE:       { L: [-80, -160], R: [156, -266], hL: 'rest', hR: 'palm' },
    talkF:       { L: [-156, -266], R: [80, -160], hL: 'palm', hR: 'rest' },
  };
  function blendPose(a, b, k) {
    const A = POSES[a] || POSES.idle, B = POSES[b] || POSES.idle, pick = key => k < .5 ? A[key] : B[key];
    return { L: [lerp(A.L[0], B.L[0], k), lerp(A.L[1], B.L[1], k)], R: [lerp(A.R[0], B.R[0], k), lerp(A.R[1], B.R[1], k)],
      hL: pick('hL'), hR: pick('hR'), cross: lerp(A.cross ? 1 : 0, B.cross ? 1 : 0, k), out: pick('out'), prop: pick('prop'), behind: pick('behind'), keepR: pick('keepR'),
      shrug: lerp(A.shrug ? 1 : 0, B.shrug ? 1 : 0, k), bow: lerp(A.bow ? 1 : 0, B.bow ? 1 : 0, k) };
  }
  // keys = [[time, 'pose'], …]; each change eases over `dur` s with a little overshoot (anticipation → settle)
  function pose(t, keys, dur = .38) {
    let from = keys[0][1], to = keys[0][1], k = 1;
    for (let i = 0; i < keys.length; i++) if (t >= keys[i][0]) { from = i ? keys[i - 1][1] : keys[i][1]; to = keys[i][1]; k = clamp((t - keys[i][0]) / dur); }
    const s = k >= 1 ? 1 : 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2);   // back-out: overshoots ~6 % then settles
    return blendPose(from, to, s);
  }
  // the hair tufts' spring: kick them at the moment of a move (turn, jump, slam) → damped wobble angle
  const hairRing = (dt, amp = .35) => dt < 0 ? 0 : amp * Math.exp(-4.2 * dt) * Math.sin(2 * Math.PI * 2.6 * dt);

  // ---------- hands (white, one outline; local +x = along the forearm) ----------
  function hand(ctx, x, y, kind, dir, flip) {
    ctx.save(); ctx.translate(x, y);
    if (kind === 'wave' || kind === 'thumbsUp') dir = -Math.PI / 2;     // fingers / thumb always point up
    ctx.rotate(dir); if (flip) ctx.scale(1, -1);
    const W = C.face, P = [];
    const finger = (ox, oy, a, len, r = 6) => c => { c.save(); c.translate(ox, oy); c.rotate(a); c.roundRect(-r, -r, len + r, r * 2, r); c.restore(); };
    if (kind === 'palm') {   // open palm-up talking hand (the user's chosen look): fingers together, curling up, thumb raised, palm crease
      ctx.scale(1.12, 1.12);
      P.push(c => c.ellipse(12, 1, 16, 13.5, -.08, 0, Math.PI * 2));
      for (const [by, a, len] of [[-8.5, -.42, 19], [-3, -.2, 22], [2.5, -.02, 21], [7.5, .14, 17]]) {
        P.push(finger(23, by, a, len * .62, 4.6)); const tx = 23 + Math.cos(a) * len * .62, ty = by + Math.sin(a) * len * .62; P.push(finger(tx, ty, a - .45, len * .45, 4.4));
      }
      P.push(finger(9, -10, -1.25, 15, 5.4));
    } else if (kind === 'wave' || kind === 'palmIn') {
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
    if (kind === 'palm') { ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(5, 4); ctx.quadraticCurveTo(14, -2, 22, 2); ctx.stroke(); }   // palm crease
    if (kind === 'rest') for (const yy of [-4, 4]) { ctx.beginPath(); ctx.moveTo(18, yy); ctx.lineTo(26, yy); ctx.stroke(); }
    ctx.restore();
  }
  // two-bone arm. A = the outfit's arm look: { sleeve, w, short, bare, roll, rollC, cuff, bracer, armlet, band, wide }
  function arm(ctx, sh, target, side, out, A = {}) {
    const L1 = 82, L2 = 76, dx = target[0] - sh[0], dy = target[1] - sh[1], d = Math.min(Math.hypot(dx, dy), L1 + L2 - 1), th = Math.atan2(dy, dx);
    const a = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const e1 = [sh[0] + Math.cos(th + a) * L1, sh[1] + Math.sin(th + a) * L1], e2 = [sh[0] + Math.cos(th - a) * L1, sh[1] + Math.sin(th - a) * L1];
    const el = out ? (e1[0] * side > e2[0] * side ? e1 : e2) : (e1[1] + e1[0] * side * .15 > e2[1] + e2[0] * side * .15 ? e1 : e2);
    const wr = [sh[0] + Math.cos(th) * d, sh[1] + Math.sin(th) * d], dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]);
    const at = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)], back9 = [wr[0] - Math.cos(dir) * 9, wr[1] - Math.sin(dir) * 9];
    const sw = A.w || 26, col = A.sleeve || C.suit;
    if (A.wide) { // kimono sleeve: a deep bag hanging under the forearm
      const m = at(el, wr, .55);
      path(ctx, c => { c.moveTo(el[0] - side * 4, el[1] - 10); c.lineTo(m[0], m[1] - 6); c.quadraticCurveTo(m[0] + side * 10, m[1] + 56, m[0] - side * 10, m[1] + 64); c.quadraticCurveTo(el[0] - side * 26, el[1] + 72, el[0] - side * 18, el[1] + 8); c.closePath(); }, col, 4.5);
      ctx.save(); ctx.globalAlpha = .18; path(ctx, c => { c.moveTo(m[0] - side * 4, m[1] + 30); c.quadraticCurveTo(m[0] - side * 8, m[1] + 56, m[0] - side * 12, m[1] + 60); c.lineTo(el[0] - side * 14, el[1] + 54); c.closePath(); }, '#000', 0); ctx.restore();
    }
    if (A.bare || A.short || A.roll) { seg(ctx, [sh, el, back9], 31); seg(ctx, [sh, el, back9], 21, C.face); }
    if (A.short) { const p2 = at(sh, el, .64); seg(ctx, [sh, p2], sw + 10); seg(ctx, [sh, p2], sw, col); if (A.band) seg(ctx, [at(sh, el, .5), p2], sw - 2, A.band); }
    else if (A.roll) { const p2 = at(el, wr, .2); seg(ctx, [sh, el, p2], sw + 10); seg(ctx, [sh, el, p2], sw, col); seg(ctx, [at(el, wr, .08), at(el, wr, .26)], sw + 12); seg(ctx, [at(el, wr, .1), at(el, wr, .24)], sw + 3, A.rollC || col); }
    else if (!A.bare) { seg(ctx, [sh, el, back9], sw + 10); seg(ctx, [sh, el, back9], sw, col); }
    if (A.cuff) { const e = [wr[0] - Math.cos(dir) * 2, wr[1] - Math.sin(dir) * 2]; seg(ctx, [back9, e], sw - 1); seg(ctx, [back9, e], sw - 9, A.cuff); }
    if (A.bracer) { const b1 = at(el, wr, .42), b2 = at(el, wr, .9); seg(ctx, [b1, b2], 33); seg(ctx, [b1, b2], 24, A.bracer); for (const k of [.58, .76]) { const q = at(el, wr, k); seg(ctx, [[q[0] - Math.sin(dir) * 10, q[1] + Math.cos(dir) * 10], [q[0] + Math.sin(dir) * 10, q[1] - Math.cos(dir) * 10]], 2.5, 'rgba(0,0,0,.45)'); } }
    if (A.armlet) { const q1 = at(sh, el, .5), q2 = at(sh, el, .64); seg(ctx, [q1, q2], 30); seg(ctx, [q1, q2], 21, A.armlet); }
    return { wr, dir, el };
  }
  function magnifier(ctx, wr) {
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
  // the crown tufts: little pointed flicks that spring after every move (pivot at the root)
  function tuft(ctx, x, y, ang, len, w) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    path(ctx, c => { c.moveTo(-w, 8); c.quadraticCurveTo(-w * .6, -len * .6, w * .5, -len); c.quadraticCurveTo(w * .2, -len * .45, w, 8); c.closePath(); }, C.hair, 4.5);
    ctx.restore();
  }
  function head(ctx, H) {
    const { f, talk, t, yaw, back, hairAng, noBlink, hat, shadeSide } = H, LK = H.look || {};
    const hairKind = LK.hair || 'mop', hairCol = LK.hairCol || C.hair, bald = hairKind === 'bald';
    const sx = phi => R * Math.sin(clamp(phi + yaw, -Math.PI / 2, Math.PI / 2)), vis = phi => Math.cos(phi + yaw);
    const hx = -Math.sin(yaw) * 12;                                   // more hair shows at the back of the head when he turns
    const HAT = hat && HATS[hat], HC = { yaw, hx, back, t, sx, R, RY };
    if (HAT && HAT.behind) HAT.behind(ctx, HC);
    // ears: they sit on the silhouette; the far one tucks away as he turns
    for (const s of [-1, 1]) {
      const k = back ? 1 : clamp(1 + Math.cos(s * Math.PI / 2 + yaw) * 2.6); if (k <= .02) continue;
      const ex = s * (R - 2);
      path(ctx, c => c.ellipse(ex, 14, 17 * k, 22, 0, 0, Math.PI * 2), C.face, 4.5);
      if (!back) curve(ctx, [ex + s * 2 * k, 4], [ex + s * 9 * k, 14], [ex + s * 2 * k, 26], 3);
      if (LK.earrings) { seg(ctx, [[ex, 34], [ex, 44]], 2.5, '#c99a3c'); path(ctx, c => c.arc(ex, 50, 6, 0, Math.PI * 2), '#e7bf55', 2.5); }
    }
    // crown tufts (hidden under most hats)
    const tufts = !(HAT && HAT.hideTufts) && hairKind === 'mop';
    if (tufts) {
      const bx = back ? 0 : hx * 2.2;
      tuft(ctx, bx + 38, -96, .55 + hairAng, 30, 13); tuft(ctx, bx + 66, -76, 1.05 + hairAng * 1.3, 24, 11); tuft(ctx, bx - 8, -104, .1 + hairAng * .8, 22, 11);
    }
    if (hairKind === 'updo') { path(ctx, c => c.ellipse(hx * 2.4 - 6, -96, 46, 38, 0, 0, Math.PI * 2), hairCol, 4.5); curve(ctx, [hx * 2.4 - 34, -100], [hx * 2.4 - 6, -124], [hx * 2.4 + 26, -104], 3, 'rgba(255,255,255,.2)'); }
    if (hairKind === 'long' && !back) path(ctx, c => { c.moveTo(-R - 6 + hx, -30); c.quadraticCurveTo(-R - 22 + hx, 60, -R + 4 + hx, 118); c.lineTo(R - 4 + hx, 118); c.quadraticCurveTo(R + 22 + hx, 60, R + 6 + hx, -30); c.closePath(); }, hairCol, 4.5);
    // curly cast: a full head of curls (bumps all round the dome), never a single stray curl
    if (hairKind === 'curly') for (let a = 2.7; a <= 6.75; a += .3) path(ctx, c => c.arc(Math.cos(a) * 100 + hx, Math.sin(a) * 92 - 8, 30, 0, Math.PI * 2), hairCol, 4.5);
    // the hair mass: a full, rounded mop that covers the top and the sides down to the ears
    if (back && bald) {
      path(ctx, c => c.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2), C.face, LW);
      path(ctx, c => { c.moveTo(-R + 1, 6); c.quadraticCurveTo(-R + 12, 74, 0, 80); c.quadraticCurveTo(R - 12, 74, R - 1, 6); c.quadraticCurveTo(R - 16, 50, 0, 54); c.quadraticCurveTo(-R + 16, 50, -R + 1, 6); c.closePath(); }, hairCol, 4);
      if (HAT) HAT.draw(ctx, HC);
      return;
    }
    if (back) {
      path(ctx, c => { c.ellipse(0, -6, R + 8, RY + 6, 0, Math.PI * .94, Math.PI * 2.06); c.quadraticCurveTo(R + 4, 52, 70, 66); for (let i = 0; i <= 6; i++) c.lineTo(70 - i * 140 / 6, i % 2 ? 76 : 64); c.quadraticCurveTo(-R - 4, 52, -R - 8, 6); c.closePath(); }, hairCol, LW);
      curve(ctx, [-40, -60], [0, -84], [40, -64], 4, C.hairHi); curve(ctx, [-60, -10], [-30, -30], [0, -26], 4, C.hairHi);
      if (HAT) HAT.draw(ctx, HC);
      return;
    }
    if (!bald) path(ctx, c => { c.ellipse(hx, -8, 108, 102, 0, Math.PI * .96, Math.PI * 2.04); c.closePath(); }, hairCol, LW);
    // face: the head disc below a full, rounded fringe; the fringe points live on the sphere, so they turn with him
    const fr = [[-1.6, 14], [-1.42, 4], [-1.2, -22], [-.98, -40], [-.7, -38], [-.5, -46], [-.22, -40], [0, -50], [.26, -44], [.5, -54], [.78, -46], [1.02, -52], [1.22, -28], [1.42, 2], [1.6, 14]]
      .map(([p, y]) => [sx(p) * 1.02, y]);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2); ctx.clip();
    const facePath = bald ? (c => c.rect(-300, -300, 600, 600)) : c => { through(c, fr); c.lineTo(fr[fr.length - 1][0] + 300, fr[fr.length - 1][1]); c.lineTo(400, 300); c.lineTo(-400, 300); c.lineTo(fr[0][0] - 300, fr[0][1]); c.closePath(); };
    // face fill with real volume: a soft radial falloff toward the shade side
    const gr = ctx.createRadialGradient(-shadeSide * 34 + sx(0) * .4, -20, 10, -shadeSide * 10, 0, 150);
    gr.addColorStop(0, C.faceHi); gr.addColorStop(.55, C.faceMid); gr.addColorStop(1, C.faceEdge);
    ctx.beginPath(); facePath(ctx); ctx.fillStyle = gr; ctx.fill();
    // the fringe casts a thin shadow on the forehead
    if (!bald) { ctx.save(); ctx.translate(shadeSide * 3, 8); ctx.beginPath(); through(ctx, fr); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(60,50,80,.13)'; ctx.stroke(); ctx.restore();
      ctx.beginPath(); through(ctx, fr); ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.stroke(); }
    else { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.ellipse(-30 + hx, -62, 26, 12, -.4, 0, Math.PI * 2); ctx.fill();   // scalp shine
      for (const dy of [-46, -34]) curve(ctx, [sx(-.35), dy], [sx(0), dy - 5], [sx(.35), dy], 2.5, 'rgba(60,50,40,.45)'); }
    ctx.restore();
    if (bald) path(ctx, c => c.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2), null, LW);
    else { ctx.save(); ctx.beginPath(); ctx.rect(-200, -10, 400, 300); ctx.clip(); path(ctx, c => c.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2), null, LW); ctx.restore(); }
    if (bald) for (const s of [-1, 1]) { const k = clamp(1 + Math.cos(s * Math.PI / 2 + yaw) * 2.2); if (k < .05) continue;   // grey fringe over the ears
      path(ctx, c => { c.moveTo(s * (R - 6), -38); c.quadraticCurveTo(s * (R + 9), -24, s * (R + 4), -6); c.quadraticCurveTo(s * (R + 10), 12, s * (R + 1), 24); c.quadraticCurveTo(s * (R + 4), 40, s * (R - 10), 48); c.quadraticCurveTo(s * (R - 26 * k), 22, s * (R - 20 * k), -32); c.closePath(); }, hairCol, 4); }
    if (LK.chin) curve(ctx, [sx(-.3), 84], [sx(0), 96], [sx(.3), 84], 3.5, 'rgba(0,0,0,.55)');
    // hair shine: two soft highlight strands following the dome
    if (!bald) for (const [a, b, c2] of [[[-62, -76], [-34, -96], [0, -96]], [[22, -92], [46, -90], [64, -76]]]) curve(ctx, [a[0] + hx, a[1]], [b[0] + hx, b[1]], [c2[0] + hx, c2[1]], 4.5, C.hairHi);
    if (hairKind === 'updo' && !back) for (let row = 0; row < 2; row++) for (let i = 0; i < 9 - row; i++) {   // the Flavian crown of curls above the brow
      const a = Math.PI * (1.12 + (i + row * .5) / 8 * .76), cx2 = hx + Math.cos(a) * (84 - row * 12), cy2 = -24 + Math.sin(a) * (78 - row * 8) - row * 16;
      path(ctx, c => c.arc(cx2, cy2, 17 - row * 2, 0, Math.PI * 2), hairCol, 3.5); curve(ctx, [cx2 - 7, cy2 + 2], [cx2, cy2 - 8], [cx2 + 6, cy2 + 1], 2.5, 'rgba(255,255,255,.22)'); }
    if (HAT && HAT.under) HAT.draw(ctx, HC);   // hoods / headcloths sit around the face, under the features

    // ----- face features -----
    const lk = f.look || [0, 0], e = f.eyes || 'open', ey = 8 + lk[1] * 5;
    const blink = !noBlink && t != null && (t % 3.9 < .11 || (t + 1.7) % 6.3 < .11);
    if (LK.beard) {   // stubble / full beard / moustache, all in the hair colour
      const mx0 = sx(0) * .72, bc = LK.beardCol || hairCol;
      if (LK.beard === 'stubble' || LK.beard === 'full') { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R - 1, RY - 1, 0, 0, Math.PI * 2); ctx.clip(); ctx.globalAlpha = LK.beard === 'full' ? 1 : .22; ctx.fillStyle = bc;
        ctx.beginPath(); ctx.moveTo(-R, 6); ctx.quadraticCurveTo(-R + 10, 46, mx0 - 34, 40); ctx.quadraticCurveTo(mx0, 30, mx0 + 34, 40); ctx.quadraticCurveTo(R - 10, 46, R, 6); ctx.lineTo(R, 140); ctx.lineTo(-R, 140); ctx.closePath(); ctx.fill(); ctx.restore();
        if (LK.beard === 'full') { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R - 1, RY - 1, 0, 0, Math.PI * 2); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 2.5; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(mx0 + i * 18, 60); ctx.quadraticCurveTo(mx0 + i * 20, 76, mx0 + i * 16, 88); ctx.stroke(); } ctx.restore(); path(ctx, c => c.ellipse(0, 0, R, RY, 0, 0, Math.PI * 2), null, LW); } }
      if (LK.beard === 'moustache' || LK.beard === 'walrus' || LK.beard === 'full') { const w = LK.beard === 'walrus' ? 34 : 24, dr = LK.beard === 'walrus' ? 22 : 8;
        path(ctx, c => { c.moveTo(mx0, 40); c.quadraticCurveTo(mx0 - w * .6, 34, mx0 - w, 48 + dr); c.quadraticCurveTo(mx0 - w * .4, 46, mx0, 50); c.quadraticCurveTo(mx0 + w * .4, 46, mx0 + w, 48 + dr); c.quadraticCurveTo(mx0 + w * .6, 34, mx0, 40); c.closePath(); }, bc, 3.5); }
    }
    if (LK.dirt && !back) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R - 2, RY - 2, 0, 0, Math.PI * 2); ctx.clip(); for (const [dx, dy, rx, ry, a] of [[-.55, .35, 22, 12, .3], [.6, .5, 18, 9, .26], [.15, -.45, 26, 10, .2], [-.2, .72, 14, 8, .24]]) { ctx.fillStyle = `rgba(120,85,50,${a * LK.dirt})`; ctx.beginPath(); ctx.ellipse(sx(dx), dy * RY, rx, ry, .3, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
    for (const s of [-1, 1]) { const v = vis(s * .78); if (v <= .4) continue; ctx.fillStyle = C.cheek; ctx.beginPath(); ctx.ellipse(sx(s * .78), 40, 15 * v, 9, 0, 0, Math.PI * 2); ctx.fill(); }
    for (const s of [-1, 1]) {
      const v = vis(s * .4); if (v < .12) continue;
      const fx = clamp(v, .35, 1), x = sx(s * .4) + lk[0] * 7;
      const shut = e === 'closed' || (blink && e !== 'happy') || (e === 'wink' && s > 0);
      if (e === 'half' && !shut) {   // heavy-lidded deadpan: the lid covers the top half of the eye
        ctx.save(); ctx.beginPath(); ctx.rect(x - 30, ey + 1, 60, 40); ctx.clip(); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(x, ey + 3, 11.5 * fx, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 3 * fx, ey + 6, 2.4, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        curve(ctx, [x - 15 * fx, ey + 2], [x, ey - 3], [x + 15 * fx, ey + 2], 5.5);
      } else if (e === 'happy') curve(ctx, [x - 12 * fx, ey + 5], [x, ey - 12], [x + 12 * fx, ey + 5], 5.5);
      else if (shut) curve(ctx, [x - 12 * fx, ey + 2], [x, ey + 7], [x + 12 * fx, ey + 2], 5);
      else {
        const big = e === 'wide' ? 1.22 : 1, ry = (e === 'squint' ? 9 : 17) * big;
        const eyy = ey + (e === 'squint' ? 4 : 0);
        if (C.eyeBot) { const eg = ctx.createLinearGradient(0, eyy - ry, 0, eyy + ry); eg.addColorStop(0, C.eyeTop); eg.addColorStop(.55, C.eyeTop); eg.addColorStop(1, LK.eye || C.eyeBot); ctx.fillStyle = eg; } else ctx.fillStyle = INK;
        ctx.beginPath(); ctx.ellipse(x, eyy, 11.5 * fx * big, ry, 0, 0, Math.PI * 2); ctx.fill();
        if (C.eyeBot) { ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke(); }
        if (LK.lashes) { const lx = x + s * 10 * fx, ly = eyy - ry * .7; seg(ctx, [[lx, ly], [lx + s * 7, ly - 6]], 3); seg(ctx, [[lx - s * 3, ly - 4], [lx + s * 2, ly - 11]], 3); }
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 3.5 * fx, ey - (e === 'squint' ? 1 : 7 * big), (e === 'squint' ? 2.4 : 3.8) * big, 0, Math.PI * 2); ctx.fill();
        if (e !== 'squint') { ctx.beginPath(); ctx.arc(x - 3 * fx, ey + 6 * big, 1.6 * big, 0, Math.PI * 2); ctx.fill(); }
      }
      const b = f.brows || 'neutral', by = -24 - (e === 'wide' ? 6 : 0) + (e === 'half' ? 6 : 0);
      let inner = 0, outer = 0, lift = 0, arch = -5;
      if (b === 'up') { lift = -11; arch = -7; } if (b === 'worried') { inner = -11; outer = 4; arch = 2; } if (b === 'angry') { inner = 9; outer = -5; arch = 0; }
      if (b === 'skeptic') { if (s > 0) { lift = -12; arch = -8; } else { inner = 4; outer = 3; arch = 0; } }
      if (b === 'sly') { inner = 5; outer = -3; arch = -2; }
      const xi = x - s * 14 * fx, xo = x + s * 15 * fx, yi = by + lift + inner, yo = by + lift + outer;
      curve(ctx, [xi, yi], [(xi + xo) / 2, (yi + yo) / 2 + arch], [xo, yo], LK.brow || 7.5, LK.browCol || INK);
    }
    const nd = yaw < -.05 ? -1 : 1, nx = sx(0) * .86 + Math.sin(yaw) * 8;
    if (LK.nose === 'big') path(ctx, c => c.ellipse(nx + nd * 6, 26, 15, 13, 0, 0, Math.PI * 2), C.noseFill, 4);
    else { ctx.beginPath(); ctx.moveTo(nx + nd * 1, 16); ctx.quadraticCurveTo(nx + nd * 12, 28, nx - nd * 1, 33); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); }
    if (f.blush) for (const s of [-1, 1]) { const v = vis(s * .7); if (v < .3) continue; const bx = sx(s * .7); ctx.fillStyle = 'rgba(235,90,95,.35)'; ctx.beginPath(); ctx.ellipse(bx, 40, 20 * v, 11, 0, 0, Math.PI * 2); ctx.fill(); for (const dx of [-8, 0, 8]) seg(ctx, [[bx + dx * v + 4, 34], [bx + dx * v - 3, 46]], 2.5, '#d9545a'); }
    if (f.sweat) { const sx2 = sx(.85), sy = -12 + ((t * .5) % 1) * 22; path(ctx, c => { c.moveTo(sx2, sy - 28); c.quadraticCurveTo(sx2 + 17, sy + 2, sx2, sy + 9); c.quadraticCurveTo(sx2 - 17, sy + 2, sx2, sy - 28); c.closePath(); }, '#bfe3f7', 4); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(sx2 - 4, sy - 4, 3, 6, -.3, 0, Math.PI * 2); ctx.fill(); }
    const m = f.mouth || 'smile', o = clamp(talk || 0), mx = sx(0) * .72, my = 56, wk = clamp(Math.cos(yaw) * .55 + .45);
    const openShape = (w, h, flatTop) => c => { c.moveTo(mx - w, my - 4); c.quadraticCurveTo(mx, my + (flatTop ? 2 : -6), mx + w, my - 4); c.quadraticCurveTo(mx + w * .8, my + h * 1.5, mx, my + h * 1.5); c.quadraticCurveTo(mx - w * .8, my + h * 1.5, mx - w, my - 4); c.closePath(); };
    const filled = (shp, teeth = true, tongue = true) => {
      path(ctx, shp, C.mouth, 4.5);
      ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip();
      if (teeth) { ctx.fillStyle = '#fff'; ctx.fillRect(mx - 60, my - 14, 120, 16); }
      if (tongue) { ctx.fillStyle = C.tongue; ctx.beginPath(); ctx.ellipse(mx + 3, my + 30, 18 * wk, 12, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore(); path(ctx, shp, null, 4.5);
    };
    const VS = H.vis;   // lip-sync: a viseme from the voice (Guide.say) replaces the static mouth while the character speaks
    if (VS && VS.k !== 'X' && !back) {
      const vo = clamp(VS.o), happy = m === 'grin' || m === 'smile', sad = m === 'frown', lipW = LK.lips ? 10 : 0;
      const corner = (s2, up) => curve(ctx, [mx + s2 * 20 * wk, my - 2], [mx + s2 * 27 * wk, my - 6 * up], [mx + s2 * 30 * wk, my - 12 * up], 4.5);
      const lip = shp => { if (LK.lips) path(ctx, shp, null, 0), (ctx.lineWidth = lipW, ctx.strokeStyle = LK.lips, ctx.beginPath(), shp(ctx), ctx.stroke()); };
      if (VS.k === 'A') { const shp = openShape(lerp(18, 23, vo) * wk, lerp(7, 17, vo), false); lip(shp); filled(shp, true, true); }
      else if (VS.k === 'E') { const shp = openShape(lerp(24, 29, vo) * wk, lerp(3.5, 8, vo), true); lip(shp); filled(shp, true, false); }
      else if (VS.k === 'O') { const w = lerp(10, 14, vo) * wk, h = lerp(10, 17, vo), shp = c => c.ellipse(mx, my + 6, w, h, 0, 0, Math.PI * 2); lip(shp); path(ctx, shp, C.mouth, 4.5); ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip(); ctx.fillStyle = C.tongue; ctx.beginPath(); ctx.ellipse(mx, my + 6 + h * .8, w, h * .5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); path(ctx, shp, null, 4.5); }
      else if (VS.k === 'S') { const w = 20 * wk, shp = c => c.roundRect(mx - w, my - 5, w * 2, 13, 6); lip(shp); path(ctx, shp, '#fff', 4.5); seg(ctx, [[mx - w + 4, my + 1.5], [mx + w - 4, my + 1.5]], 2, 'rgba(0,0,0,.35)'); }
      else { const w = 15 * wk; if (LK.lips) curve(ctx, [mx - w, my + 1], [mx, my + 6], [mx + w, my + 1], 10, LK.lips); curve(ctx, [mx - w, my + 1], [mx, my + 5], [mx + w, my + 1], 6); }
      if (happy && VS.k !== 'O') { corner(-1, 1); corner(1, 1); } else if (sad) { corner(-1, -1); corner(1, -1); }
      if (HAT && !HAT.under) HAT.draw(ctx, HC);
      return;
    }
    if (m === 'o' || m === 'shock') { const w = (m === 'o' ? 11 : 17) * wk, h = m === 'o' ? 14 : 22; path(ctx, c => c.ellipse(mx, my + 8, w, h, 0, 0, Math.PI * 2), C.mouth, 4.5); if (m === 'shock') { ctx.save(); ctx.beginPath(); ctx.ellipse(mx, my + 8, w, h, 0, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = C.tongue; ctx.beginPath(); ctx.ellipse(mx, my + 28, w, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
    else if (m === 'grin' || m === 'open' || o > .08) {
      const w = (m === 'grin' ? 30 : lerp(17, 25, o)) * wk, h = m === 'grin' ? 17 : lerp(5, 15, Math.max(o, m === 'open' ? .6 : 0));
      filled(openShape(w, h, m === 'grin'), true, h > 8);
    } else if (m === 'grit') { const w = 24 * wk; path(ctx, c => c.roundRect(mx - w, my - 6, w * 2, 18, 7), '#fff', 4.5); seg(ctx, [[mx - w + 3, my + 3], [mx + w - 3, my + 3]], 2.5); }
    else if (m === 'smile' || m === 'smirk') { const w = 20 * wk; if (LK.lips) curve(ctx, [mx - w, my - 4 + (m === 'smirk' ? 4 : 0)], [mx + (m === 'smirk' ? 6 : 0), my + 12], [mx + w, m === 'smirk' ? my - 10 : my - 4], 9, LK.lips); curve(ctx, [mx - w, my - 4 + (m === 'smirk' ? 4 : 0)], [mx + (m === 'smirk' ? 6 : 0), my + 12], [mx + w, m === 'smirk' ? my - 10 : my - 4], 5); }
    else if (m === 'frown') curve(ctx, [mx - 16 * wk, my + 9], [mx, my - 5], [mx + 16 * wk, my + 9], 5);
    else seg(ctx, [[mx - 13 * wk, my + 2], [mx + 13 * wk, my + 2]], 5);
    if (HAT && !HAT.under) HAT.draw(ctx, HC);
  }

  // ---------- the wardrobe registry (outfits + hats live in js/wardrobe.js) ----------
  const OUTFITS = {}, HATS = {};
  // body silhouette for any garment: shoulders → hem (hem y, flare at the hem, shoulder width)
  function bodyPath(B, hem = -142, flare = 1, shoulder = 1) {
    const { top, nar, vx } = B;
    return c => { c.moveTo(-28 * nar + vx * .2, top - 6); c.quadraticCurveTo(-60 * nar * shoulder, top - 4, -66 * nar * shoulder, top + 20); c.quadraticCurveTo(-72 * nar, hem - 68, -66 * nar * flare, hem);
      c.quadraticCurveTo(0, hem + 14, 66 * nar * flare, hem); c.quadraticCurveTo(72 * nar, hem - 68, 66 * nar * shoulder, top + 20); c.quadraticCurveTo(60 * nar * shoulder, top - 4, 28 * nar + vx * .2, top - 6); c.closePath(); };
  }
  // fill a garment, shade its far side (cloth volume), optional pattern (drawn inside a clip), then outline
  function garment(ctx, B, shp, fill, shade, pattern) {
    path(ctx, shp, fill, 0);
    ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip();
    if (pattern) pattern(ctx);
    ctx.fillStyle = shade || 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(B.shadeSide * 112, -230, 72, 190, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    path(ctx, shp, null, LW);
  }
  // default suit (the other outfits are in wardrobe.js)
  OUTFITS.suit = {
    hat: null, arm: { sleeve: C.suit, w: 26, cuff: C.shirt }, legs: { kind: 'trousers', c: C.suit }, feet: 'shoes',
    torso(ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B), C.suit, C.suitShade);
      if (B.back) { seg(ctx, [[0, top + 30], [0, -142]], 3, C.suitShade); seg(ctx, [[0, -175], [0, -142]], 3.5); return; }
      const V = [[vx - 26, top - 4], [vx + 26, top - 4], [vx, top + 112]];
      path(ctx, c => { c.moveTo(...V[0]); c.lineTo(...V[1]); c.lineTo(...V[2]); c.closePath(); }, C.shirt, 3.5);
      path(ctx, c => { c.moveTo(vx - 6, top + 54); c.lineTo(vx + 6, top + 54); c.lineTo(vx + 10, top + 98); c.lineTo(vx, top + 110); c.lineTo(vx - 10, top + 98); c.closePath(); }, C.tie, 3.5);
      path(ctx, c => { c.moveTo(vx - 8, top + 10); c.lineTo(vx + 8, top + 10); c.lineTo(vx + 9, top + 22); c.lineTo(vx + 13, top + 56); c.lineTo(vx, top + 62); c.lineTo(vx - 13, top + 56); c.lineTo(vx - 9, top + 22); c.closePath(); }, C.tie, 3.5);
      path(ctx, c => { c.moveTo(vx - 9, top + 8); c.lineTo(vx + 9, top + 8); c.lineTo(vx + 7, top + 22); c.lineTo(vx - 7, top + 22); c.closePath(); }, C.tieDark, 3);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 6, top - 6); c.lineTo(vx + sd * 28, top - 8); c.lineTo(vx + sd * 22, top + 16); c.closePath(); }, '#fff', 3.5);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 27, top - 2); c.lineTo(vx + sd * 46, top + 40); c.lineTo(vx + sd * 32, top + 46); c.lineTo(vx + sd * 2, top + 116); c.lineTo(vx + sd * 6, top + 98); c.lineTo(vx + sd * 22, top + 46); c.lineTo(vx + sd * 30, top + 38); c.closePath(); }, C.suitHi, 3.5);
      path(ctx, c => c.arc(vx, top + 134, 5.5, 0, Math.PI * 2), C.suitHi, 3);
      seg(ctx, [[vx, top + 142], [vx - 12, -140]], 3.5); seg(ctx, [[vx, top + 142], [vx + 12, -140]], 3.5);
      const px = vx + 40 * nar;
      path(ctx, c => { c.moveTo(px - 10, top + 62); c.lineTo(px - 4, top + 50); c.lineTo(px + 4, top + 58); c.lineTo(px + 10, top + 48); c.lineTo(px + 15, top + 62); c.closePath(); }, C.tie, 3);
      seg(ctx, [[px - 14, top + 62], [px + 18, top + 62]], 4);
    },
  };
  // legs + feet, by kind (each outfit picks)
  const LEGS = {
    none() {},
    trousers(ctx, g, L) { seg(ctx, [g.hip, g.ank], 44); seg(ctx, [g.hip, g.ank], 34, L.c); seg(ctx, [[g.hip[0] + g.sd * 4, g.hip[1] + 20], [g.ank[0] + g.sd * 4, g.ank[1] - 10]], 2.5, 'rgba(0,0,0,.25)'); },
    bare(ctx, g) { seg(ctx, [g.hip, g.ank], 31); seg(ctx, [g.hip, g.ank], 21, C.face); },
  };
  const FEET = {
    none() {},
    slippers(ctx, g, OF) { const fx = g.ank[0] + g.toe + g.sd * 8, fy = -10 - g.lift; path(ctx, c => c.ellipse(fx, fy, 22, 10, 0, 0, Math.PI * 2), OF.shoe || '#8a5a3a', 3.5); },
    shoes(ctx, g) { const fx = g.ank[0] + g.toe + g.sd * 5, fy = -13 - g.lift; path(ctx, c => c.ellipse(fx, fy, 30, 15, 0, 0, Math.PI * 2), C.shoe, 4); curve(ctx, [fx - 14, fy - 7], [fx, fy - 11], [fx + 12, fy - 7], 3, '#3d3e44'); },
  };

  // ---------- whole figure (raw vector drawing; feet at 0,0 in the current transform) ----------
  const hexMul = (hex, k) => { const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(k > 1 ? v + (255 - v) * (k - 1) : v * k)))); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); };
  function drawRaw(ctx, o) {
    const LK0 = o.look || {}; if (!LK0.skin) return drawBody(ctx, o);
    const keep = { face: C.face, faceHi: C.faceHi, faceMid: C.faceMid, faceEdge: C.faceEdge, noseFill: C.noseFill };
    Object.assign(C, { face: LK0.skin, faceHi: hexMul(LK0.skin, 1.12), faceMid: LK0.skin, faceEdge: hexMul(LK0.skin, .8), noseFill: hexMul(LK0.skin, .97) });
    try { drawBody(ctx, o); } finally { Object.assign(C, keep); }
  }
  const PROPS = {};
  function drawBody(ctx, o) {
    const t = o.t ?? 0, P0 = typeof o.pose === 'object' && o.pose.L ? o.pose : blendPose(o.pose || 'idle', o.pose || 'idle', 1);
    const bt = o.vis ? Math.max(o.vis.beat, o.vis.beat2) : 0, P = bt > .02 && !P0.cross && !P0.out && !P0.behind ? Object.assign({}, P0, { L: [P0.L[0] - bt * 6, P0.L[1] - bt * 14], R: o.prop ? P0.R : [P0.R[0] + bt * 4, P0.R[1] - bt * 9] }) : P0;   // speech beats lift both hands a little
    const LK = o.look || {}, wk2 = LK.width || 1, OF = OUTFITS[o.outfit] || OUTFITS.suit, hat = o.hat === 'none' ? null : (o.hat || OF.hat);
    const back = !!o.back, turn = back ? 0 : clamp(o.turn || 0, -1, 1), yaw = turn * .7;
    const SA = o.vis || null;   // speech acting (from Guide.say): nod on syllable onsets, brows up on emphasis, hand beats, head tilt
    const breathe = Math.sin(t * 2.1) * 2.4, talk = SA ? clamp(SA.o) : (o.talk || 0), bob = -talk * 3 + breathe * .4 - (SA ? SA.nod * 12 * (SA.fade ?? 1) : 0);
    const bowK = P.bow || 0;
    const nar = 1 - Math.abs(turn) * .12, vx = Math.sin(yaw) * 34;
    const top = -330 + breathe - (P.shrug || 0) * 12, sh = { L: [(-58 * nar + turn * 4) * wk2, top + 22], R: [(58 * nar + turn * 4) * wk2, top + 22] };
    const shadeSide = (o.light && o.light.x > 0) ? -1 : 1;
    const B = { top, nar, vx, back, turn, yaw, t, P, sh, shadeSide };
    const far = turn > .25 ? 'L' : turn < -.25 ? 'R' : null;
    const handOf = (side, a) => { const sd = side === 'L' ? -1 : 1, k = P['h' + side]; hand(ctx, a.wr[0], a.wr[1], k, a.dir, sd < 0); };
    const doArm = side => {
      const sd = side === 'L' ? -1 : 1, a = arm(ctx, sh[side], [P[side][0] * wk2, P[side][1]], sd, P.out, OF.arm);
      if (P.behind && !(P.keepR && side === 'R')) return;   // hands clasped behind the back: only the upper arms show, the hands stay hidden behind the body
      const pr = o.prop && PROPS[o.prop];
      if (side === 'R' && P.prop === 'magnifier' && !back) { magnifier(ctx, a.wr); hand(ctx, a.wr[0], a.wr[1], 'hold', -Math.PI / 2 + .25, false); }
      else if (pr && side === (pr.side || 'R')) { if (pr.under) pr.under(ctx, a, sd, o); if (P['h' + side] !== 'palmIn') hand(ctx, a.wr[0], a.wr[1], pr.hand || 'hold', pr.handDir != null ? pr.handDir * sd : a.dir, sd < 0); if (pr.over) pr.over(ctx, a, sd, o); }
      else if (P['h' + side] !== 'palmIn' || back) handOf(side, a);
    };
    ctx.save(); ctx.scale(wk2, 1);
    if (OF.behind) OF.behind(ctx, B);
    ctx.restore();
    // arms drawn BEHIND the body (user: the torso sits in front of the arms, nothing reaches across the front)
    const armsBack = ((o.armsBack ?? G.Guide.armsBack) || P.behind) && !(P.cross > .5);
    if (armsBack) { for (const side of ['L', 'R']) doArm(side); }
    else if (far && !(P.cross > .5)) doArm(far);
    // legs + feet (toes follow the turn; walking swings and lifts them)
    ctx.save(); ctx.scale(wk2, 1);
    const wk = o.walk, st = wk == null ? 0 : Math.sin(wk), toe = back ? 0 : Math.sin(yaw) * 14;
    for (const sd of [-1, 1]) {
      const sw = sd * st * 26, lift = wk == null ? 0 : Math.max(0, sd * Math.cos(wk)) * 12, fx = sd * 25 * nar + sw;
      const g = { sd, hip: [sd * 25 * nar, -150], ank: [fx, -24 - lift], lift, toe, nar, back };
      (LEGS[OF.legs.kind] || LEGS.trousers)(ctx, g, OF.legs, B);
      (FEET[OF.feet] || FEET.shoes)(ctx, g, OF, B);
    }
    if (OF.legsOver) OF.legsOver(ctx, B);
    OF.torso(ctx, B);
    ctx.restore();
    // a soft shadow under the chin (the head sits in front of the collar)
    if (!back) { ctx.save(); ctx.fillStyle = 'rgba(20,16,30,.22)'; ctx.beginPath(); ctx.ellipse(vx * .45, top + 2, 46, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    if ((P.cross || 0) > .5) {
      const yA = top + 98, yB = top + 116, sc = OF.arm.sleeve || C.suit, sw = OF.arm.w || 26;
      seg(ctx, [sh.L, [-72, yA], [64, yA]], sw + 10); seg(ctx, [sh.L, [-72, yA], [64, yA]], sw, sc); hand(ctx, 70, yA, 'fist', 0);
      seg(ctx, [sh.R, [72, yB], [-64, yB]], sw + 10); seg(ctx, [sh.R, [72, yB], [-64, yB]], sw, sc); hand(ctx, -70, yB, 'fist', Math.PI, true);
    } else if (!armsBack) for (const side of ['L', 'R']) if (side !== far && !(side === 'R' && P.hR === 'palmIn' && !back)) doArm(side);
    if (OF.front) { ctx.save(); ctx.scale(wk2, 1); OF.front(ctx, B); ctx.restore(); }
    ctx.save(); ctx.translate(vx * .45, top - 84 + bob + bowK * 30); ctx.rotate((o.headTilt || 0) + Math.sin(t * 1.3) * .015 + talk * .02 * Math.sin(t * 9) + (SA ? SA.tilt : 0));
    const F0 = o.face || {}, F1 = SA && SA.brow > .5 && (!F0.brows || F0.brows === 'neutral') ? Object.assign({}, F0, { brows: 'up' }) : F0;
    head(ctx, { f: F1, talk, t, yaw, back, hairAng: (o.hair || 0) + Math.sin(t * 1.7) * .03, noBlink: o.noBlink, hat, shadeSide, look: LK, vis: SA });
    ctx.restore();
    if (P.hR === 'palmIn' && !back) { const a = arm(ctx, sh.R, [vx * .45 + 34, top - 52], 1, true, OF.arm); ctx.save(); ctx.translate(a.wr[0], a.wr[1]); ctx.scale(1.3, 1.3); hand(ctx, 0, 0, 'palm', -Math.PI / 2 - .35, false); ctx.restore(); }
  }

  // ---------- the depth pass: rim light, form shadow, floor shadow (the "4D" look) ----------
  const bufs = {};
  function buf(k, w, h) {
    let c = bufs[k]; if (!c) c = bufs[k] = document.createElement('canvas');
    if (c.width < w || c.height < h) { c.width = Math.max(c.width, w); c.height = Math.max(c.height, h); }
    const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none'; g.clearRect(0, 0, c.width, c.height);
    return [c, g];
  }
  const LIGHT = { x: -.62, y: -.78, rim: '#fff4dc', rimA: .45, shadeA: .32, shade: '#1a1430', cast: .16, contact: .35 };
  function draw(ctx, x, y, s = 1, o = {}) {
    o = act(o);
    if (o.light === false) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.mirror ? -1 : 1), s); ctx.rotate(o.lean || 0); drawRaw(ctx, o); ctx.restore(); return; }
    const L = Object.assign({}, LIGHT, o.light || {}), ln = Math.hypot(L.x, L.y) || 1, lx = L.x / ln, ly = L.y / ln;
    const m = ctx.getTransform(), z = Math.max(.2, Math.hypot(m.a, m.b)), S = s * z;
    const bw = Math.ceil(700 * S), bh = Math.ceil(900 * S), ox = bw / 2, oy = bh - 60 * S;
    const [A, ga] = buf('A', bw, bh);
    ga.translate(ox, oy); ga.scale(S * (o.mirror ? -1 : 1), S); ga.rotate(o.lean || 0); drawRaw(ga, o); ga.setTransform(1, 0, 0, 1, 0, 0);
    const [sil, gs] = buf('sil', bw, bh); gs.drawImage(A, 0, 0); gs.globalCompositeOperation = 'source-in'; gs.fillStyle = '#000'; gs.fillRect(0, 0, bw, bh);
    const band = (dx, dy, k1, k2, col) => { const [cb, gb] = buf('band', bw, bh); gb.drawImage(sil, -dx * k1, -dy * k1); gb.globalCompositeOperation = 'destination-out'; gb.drawImage(sil, -dx * k2, -dy * k2); gb.globalCompositeOperation = 'source-in'; gb.fillStyle = col; gb.fillRect(0, 0, bw, bh); return cb; };
    const ink = 5.5 * S;
    // form shadow: a wide soft band on the side away from the light
    const sb = band(-lx, -ly, ink, ink + 34 * S, L.shade);
    ga.globalCompositeOperation = 'source-atop'; ga.globalAlpha = L.shadeA; ga.filter = `blur(${(7 * S).toFixed(1)}px)`; ga.drawImage(sb, 0, 0); ga.filter = 'none';
    // rim light: a crisp thin band just inside the outline on the lit side
    const rb = band(lx, ly, ink, ink + 7 * S, L.rim);
    ga.globalAlpha = L.rimA; ga.drawImage(rb, 0, 0); ga.globalAlpha = 1; ga.globalCompositeOperation = 'source-over';
    ctx.save();
    // contact shadow + long floor shadow away from the light
    if (L.contact) { ctx.save(); ctx.filter = `blur(${(6 * z).toFixed(1)}px)`; ctx.globalAlpha = L.contact; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(x, y - 4 * s, 82 * s, 13 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    if (L.cast) { ctx.save(); ctx.translate(x, y); ctx.transform(1, 0, lx * .55, .17, 0, 0); ctx.globalAlpha = L.cast; ctx.filter = `blur(${(4 * z).toFixed(1)}px)`; ctx.drawImage(sil, 0, 0, bw, bh, -ox / z, -oy / z, bw / z, bh / z); ctx.restore(); }
    ctx.drawImage(A, 0, 0, bw, bh, x - ox / z, y - oy / z, bw / z, bh / z);
    ctx.restore();
  }

  // colour themes: 'ink' = the original black-and-white sheet; 'warm' = the user's painted look (peach skin, brown hair, brown ink)
  const THEMES = {
    ink: { ink: '#1b1917', eyeTop: null, eyeBot: null, face: '#ffffff', faceHi: '#ffffff', faceMid: '#fdfcfe', faceEdge: '#dcd8e4', noseFill: '#fbf8fb', hair: '#18181b', hairHi: '#4b4e59', cheek: 'rgba(240,128,118,.32)' },
    warm: { ink: '#3a2519', eyeTop: '#1a0f08', eyeBot: '#7a4a2c', face: '#fcd8bd', faceHi: '#fee6d3', faceMid: '#fbd4b6', faceEdge: '#e7a585', noseFill: '#f9cdb0', hair: '#3d2416', hairHi: '#7d5034', cheek: 'rgba(238,104,96,.42)' },
  };
  function setTheme(name) { const th = THEMES[name] || THEMES.ink; INK = th.ink; for (const k of Object.keys(th)) if (k !== 'ink') C[k] = th[k]; }
  // lip-sync + speech acting from window.VIS (tools/visemes.py): { k viseme, o opening, nod, brow, beat, beat2, tilt } or null outside [from, to]
  function say(t, from = -1e9, to = 1e9, V = G.VIS) {
    if (!V || t < from - .35 || t > to + .55) return null;
    const fade = t < from ? clamp((t - from + .35) / .35) : t > to ? clamp(1 - (t - to) / .55) : 1;
    if (t < from || t > to) return { k: 'X', o: 0, nod: 0, brow: 0, beat: 0, beat2: 0, tilt: 0, t, fade };
    const i = Math.max(0, Math.floor(t * V.fps)), O = V.o, at = j => O[Math.min(O.length - 1, Math.max(0, j))] || 0;
    const o = at(i), k = V.k[i] || 'X'; let prev = 0; for (let j = 1; j <= 4; j++) prev += at(i - j) / 4;
    let mean = 0; for (let j = -15; j <= 15; j++) mean += at(i + j) / 31;
    let brow = 0; for (let j = 0; j < 10; j++) { const v = at(i - j); if (v > .7 && v > mean * 1.3) brow = Math.max(brow, 1 - j / 10); }
    let beat = 0, beat2 = 0; for (let j = 0; j < 12; j++) { const on = Math.max(0, at(i - j) - at(i - j - 3)); beat += on * Math.sin(Math.PI * (1 - j / 12)) * .5; beat2 += Math.max(0, at(i - j - 5) - at(i - j - 8)) * Math.sin(Math.PI * (1 - j / 12)) * .4; }
    return { k, o, nod: clamp((o - prev) * 2.4), brow, beat: clamp(beat * 2.4), beat2: clamp(beat2 * 2.2), tilt: Math.sin(t * .8 + Math.floor(t / 3.7)) * .05 * clamp(mean * 2), t, fade };
  }
  // ---------- ACTING: idle life for everyone + phrase-driven gestures while speaking + listening nods ----------
  const LOCK = new Set(['behind', 'crossed', 'facepalm', 'magnify', 'think', 'cheer', 'wave', 'thumbsUp', 'bow', 'pointUp', 'hips']);
  const TALK = ['talkA', 'talkB', 'talkD', 'talkC', 'talkE', 'talkA', 'talkF', 'talkB'];
  const GSETS = { idle: TALK, present: TALK, presentL: TALK, presentBoth: TALK, pointSide: TALK, pointSideL: TALK, shrug: TALK };
  let PHR = null;
  function phrases() { if (PHR) return PHR; const V = G.VIS; PHR = []; if (!V) return PHR; let quiet = 99; for (let i = 0; i < V.o.length; i++) { if (V.o[i] < .12) quiet++; else { if (quiet >= 7) PHR.push(i / V.fps); quiet = 0; } } return PHR; }
  function phraseAt(t) { const P = phrases(); let lo = 0, hi = P.length - 1, idx = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (P[m] <= t) { idx = m; lo = m + 1; } else hi = m - 1; } return { i: idx, t0: idx >= 0 ? P[idx] : 0 }; }
  const num = v => v === true ? 1 : v || 0;
  function lerpPose(A, B, k) { return { L: [lerp(A.L[0], B.L[0], k), lerp(A.L[1], B.L[1], k)], R: [lerp(A.R[0], B.R[0], k), lerp(A.R[1], B.R[1], k)], hL: k < .5 ? A.hL : B.hL, hR: k < .5 ? A.hR : B.hR,
    cross: lerp(num(A.cross), num(B.cross), k), out: k < .5 ? A.out : B.out, behind: k < .5 ? A.behind : B.behind, keepR: k < .5 ? A.keepR : B.keepR, prop: k < .5 ? A.prop : B.prop, shrug: lerp(num(A.shrug), num(B.shrug), k), bow: lerp(num(A.bow), num(B.bow), k) }; }
  const toPose = p => (typeof p === 'object' && p && p.L) ? p : blendPose(p || 'idle', p || 'idle', 1);
  const hashS = str => { let h = 7; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0; return Math.abs(h); };
  const backOut = k => k >= 1 ? 1 : 1 + 2.4 * Math.pow(k - 1, 3) + 1.4 * Math.pow(k - 1, 2);
  // user (cowboy v7): stand up straight with the hands clasped behind the back — never held out in front.
  // Only a few deliberate reactions keep their own arms; riders keep the reins; a hand holding a prop keeps holding it.
  const KEEP_ARMS = new Set(['cheer', 'wave', 'facepalm', 'magnify', 'bow', 'thumbsUp', 'pointUp']);   // (hips + think removed: user saw them as arms in front)
  function handsBehind(o) {
    if (!G.Guide.handsBehind || (o.outfit || '').includes('@ride') || (typeof o.pose === 'string' && KEEP_ARMS.has(o.pose))) return o;
    const r = Object.assign({}, o, { pose: 'behind' });
    if (o.prop) r.pose = Object.assign({}, POSES.behind, { R: [118, -212], hR: 'hold', keepR: true });
    return r;
  }
  function act(o) {
    o = handsBehind(o);
    if (o.still) return o;
    const t = o.t ?? 0, V = o.vis, Ls = o.listen, seed = hashS((o.outfit || 'suit') + ((o.look && o.look.skin) || '') + (o.hat || '')) % 997 / 97, r = Object.assign({}, o);
    const isStr = typeof o.pose === 'string' || !o.pose, home = toPose(o.pose);
    let P = home;
    if (V && o.gest !== false && !home.behind && !(isStr && LOCK.has(o.pose || 'idle'))) {
      const set = o.gestSet || GSETS[isStr ? (o.pose || 'idle') : 'idle'] || GSETS.idle, n = set.length, ph = phraseAt(V.t), s0 = Math.floor(seed * 3);
      const cur = set[((ph.i + s0) % n + n) % n], prev = set[((ph.i - 1 + s0) % n + n) % n], k = ease(clamp((V.t - ph.t0) / .6));
      P = lerpPose(home, lerpPose(toPose(prev), toPose(cur), k), (V.fade ?? 1) * (isStr ? 1 : (o.gestMix ?? .62)));
      if (home.prop) { P.R = home.R; P.hR = home.hR; P.prop = home.prop; }   // a hand holding a prop keeps holding it
      // user: arms stay at the sides, never reaching across the front of the body — keep each talking hand outside the torso
      if (!P.cross && !home.prop) { P = Object.assign({}, P, { L: [Math.min(P.L[0], -138), P.L[1]], R: [Math.max(P.R[0], 138), P.R[1]] }); if (P.hL === 'rest') P.L = [-80, -160]; if (P.hR === 'rest') P.R = [80, -160]; }
      // both hands drift gently, out of phase, so the gesture keeps breathing between phrases
      const fd = V.fade ?? 1, d1 = Math.sin(t * 2.1 + seed) * 7 * fd, d2 = Math.sin(t * 1.7 + seed * 1.6 + 1.3) * 7 * fd;
      P = Object.assign({}, P, { L: [P.L[0] - d2 * .5, P.L[1] + d1], R: [P.R[0] + d1 * .5, P.R[1] + d2] });
    }
    r.pose = P;
    const fs = (o.turn || 0) >= 0 ? 1 : -1, fv = V ? (V.fade ?? 1) : 0;
    r.lean = G.Guide.straight ? 0 : (o.lean || 0) + Math.sin(t * .55 + seed) * .016 + Math.sin(t * 1.3 + seed * 2) * .004 + (V ? (V.nod * .04 + V.brow * .025) * fs * fv : 0) + (Ls ? Ls.nod * .012 * fs : 0);
    r.headTilt = (o.headTilt || 0) + Math.sin(t * .43 + seed * 3) * .035 + (Ls ? Ls.nod * .07 : 0);
    const f = Object.assign({}, o.face || {});
    if (!f.look) { const st = Math.floor(t / 1.9 + seed), rr = x => Math.abs(Math.sin(x * 12.9898) * 43758.5453) % 1; f.look = [(rr(st) - .5) * .7 + Math.sin(t * .3 + seed) * .1, (rr(st + 7) - .5) * .3]; }
    if (Ls && Ls.brow > .5 && (!f.brows || f.brows === 'neutral')) f.brows = 'up';
    r.face = f; return r;
  }
  function talk(t, env = G.ENV, from = -1e9, to = 1e9) {
    if (!env || t < from || t > to) return 0;
    const i = t * env.fps, a = env.v[Math.floor(i)] || 0, b = env.v[Math.floor(i) + 1] || 0, v = a + (b - a) * (i % 1);
    return clamp((v - .12) * 1.6);
  }
  G.Guide = { draw, drawRaw, PROPS, hexMul, pose, blendPose, lerpPose, phraseAt, talk, say, act, hairRing, curlRing: hairRing, POSES, C, OUTFITS, HATS, LEGS, FEET, LIGHT,
    kit: { path, seg, curve, through, union, bodyPath, garment, lerp, clamp, get INK() { return INK; }, LW }, setTheme, THEMES, name: 'Theo' };
})(window);
