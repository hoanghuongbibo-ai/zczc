/* The channel host — vector rebuild of the user's host sheets (biz/assets/host/): round face with the skin shade on
 * one side, messy brown hair, light stubble beard, white collared shirt, olive tie, black mitten hands, black stick legs.
 * He is never a static cut-out: he breathes, blinks, glances, and his mouth follows the narration loudness
 * (Host.talk(t) reads the envelope written by tools/envelope.py), while gesture poses blend from one to the next.
 *
 * Host.draw(ctx, x, y, s, o)   feet at (x, y); s = 1 → ~430 px tall.
 *   o.pose: preset name or blend {from, to, k}; o.face: { eyes:'open'|'happy'|'closed'|'wink'|'side', brows:'neutral'|'up'|'worried'|'angry'|'skeptic',
 *           mouth:'flat'|'smile'|'open'|'laugh'|'o'|'frown'|'scared'|'smirk', look:[x,y] }, o.talk (0..1 mouth opening),
 *   o.t (time, for idle breathing / blinking), o.walk (phase, legs stride), o.lean, o.headTilt
 * Host.pose(t, keys)  keys = [[time, 'present'], [time2, 'pointUp'], ...] → blended pose (0.35 s ease between keys). */
(function (G) {
  'use strict';
  const INK = '#1f1c1a', LW = 5;
  const C = { skin: '#f7cba3', skinShade: '#e9ab7e', hair: '#b67f4c', hairDark: '#8a5a32', hairHi: '#cf9a66', beard: 'rgba(170,110,60,.4)', shirt: '#ffffff', shirtShade: '#e6e6e6', tie: '#5f6650', tieDark: '#4a503e', mitt: '#1d1b1a', leg: '#1d1b1a' };
  const lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;

  function path(ctx, fn, fill, lw = LW, stroke = INK) { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
  const seg = (ctx, pts, w, col = INK) => { ctx.beginPath(); ctx.moveTo(...pts[0]); for (const p of pts.slice(1)) ctx.lineTo(...p); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); };

  // ---------- poses: absolute hand targets in figure space (feet at 0,0; shirt top ≈ -360; +x = screen right) ----------
  const POSES = {
    idle:        { L: [-84, -160], R: [84, -160], hL: 'fist', hR: 'fist' },
    present:     { L: [-84, -170], R: [235, -300], hL: 'fist', hR: 'palm' },
    presentL:    { L: [-235, -300], R: [84, -170], hL: 'palm', hR: 'fist' },
    presentBoth: { L: [-225, -290], R: [225, -290], hL: 'palm', hR: 'palm' },
    pointUp:     { L: [-84, -170], R: [140, -480], hL: 'fist', hR: 'pointUp' },
    pointSide:   { L: [-84, -170], R: [265, -330], hL: 'fist', hR: 'pointSide' },
    pointSideL:  { L: [-265, -330], R: [84, -170], hL: 'pointSide', hR: 'fist' },
    crossed:     { L: [-84, -170], R: [84, -170], hL: 'fist', hR: 'fist', cross: true },
    hips:        { L: [-104, -205], R: [104, -205], hL: 'fist', hR: 'fist', out: true },
    think:       { L: [36, -232], R: [14, -372], hL: 'fist', hR: 'fist', chin: true },
    cheer:       { L: [-175, -560], R: [175, -560], hL: 'fist', hR: 'fist' },
    wave:        { L: [-84, -170], R: [200, -505], hL: 'fist', hR: 'wave' },
    shrug:       { L: [-205, -285], R: [205, -285], hL: 'palm', hR: 'palm', shrug: true },
    chest:       { L: [-84, -170], R: [-14, -300], hL: 'fist', hR: 'palm' },
    ok:          { L: [-84, -170], R: [160, -475], hL: 'fist', hR: 'ok' },
    thumbsUp:    { L: [-84, -170], R: [180, -420], hL: 'fist', hR: 'thumbsUp' },
    count:       { L: [-160, -300], R: [140, -480], hL: 'palm', hR: 'pointUp' },
  };
  function blendPose(a, b, k) {
    const A = POSES[a] || POSES.idle, B = POSES[b] || POSES.idle, pick = key => k < .5 ? A[key] : B[key];
    return { L: [lerp(A.L[0], B.L[0], k), lerp(A.L[1], B.L[1], k)], R: [lerp(A.R[0], B.R[0], k), lerp(A.R[1], B.R[1], k)],
      hL: pick('hL'), hR: pick('hR'), cross: lerp(A.cross ? 1 : 0, B.cross ? 1 : 0, k), out: pick('out'), chin: pick('chin'), shrug: lerp(A.shrug ? 1 : 0, B.shrug ? 1 : 0, k) };
  }
  function pose(t, keys, dur = .35) {
    let from = keys[0][1], to = keys[0][1], k = 1;
    for (let i = 0; i < keys.length; i++) if (t >= keys[i][0]) { from = i ? keys[i - 1][1] : keys[i][1]; to = keys[i][1]; k = ease(clamp((t - keys[i][0]) / dur)); }
    return blendPose(from, to, k);
  }

  // ---------- hands ----------
  function hand(ctx, x, y, kind, dir, mirror) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(dir); if (mirror) ctx.scale(1, -1);
    const M = C.mitt, lw = 3.5; ctx.scale(1.25, 1.25);
    if (kind === 'palm') { path(ctx, c => c.ellipse(14, 0, 22, 14, 0, 0, Math.PI * 2), M, lw); path(ctx, c => c.ellipse(4, -15, 7, 11, -.6, 0, Math.PI * 2), M, lw); }
    else if (kind === 'pointUp' || kind === 'pointSide') { path(ctx, c => c.ellipse(8, 0, 15, 15, 0, 0, Math.PI * 2), M, lw); path(ctx, c => c.roundRect(14, -6, 30, 12, 6), M, lw); }
    else if (kind === 'thumbsUp') { path(ctx, c => c.ellipse(8, 0, 16, 15, 0, 0, Math.PI * 2), M, lw); path(ctx, c => c.roundRect(-4, -34, 12, 28, 6), M, lw); }
    else if (kind === 'wave') { path(ctx, c => c.ellipse(12, 0, 18, 16, 0, 0, Math.PI * 2), M, lw); for (const a of [-.55, -.2, .15, .5]) path(ctx, c => { c.save(); c.translate(22, 0); c.rotate(a); c.roundRect(0, -5, 22, 10, 5); c.restore(); }, M, lw); path(ctx, c => c.ellipse(4, -16, 6, 11, -.8, 0, Math.PI * 2), M, lw); }
    else if (kind === 'ok') { path(ctx, c => c.ellipse(10, 0, 15, 15, 0, 0, Math.PI * 2), M, lw); path(ctx, c => { c.arc(28, -8, 10, 0, Math.PI * 2); c.arc(28, -8, 4, 0, Math.PI * 2, true); }, M, lw); for (const a of [.35, .7]) path(ctx, c => { c.save(); c.translate(18, 4); c.rotate(a); c.roundRect(0, -5, 22, 10, 5); c.restore(); }, M, lw); }
    else path(ctx, c => c.ellipse(6, 0, 17, 16, 0, 0, Math.PI * 2), M, lw);           // fist / mitten
    ctx.restore();
  }
  // two-bone arm (sleeve = white tube with black outline); the elbow hangs low, or pushes outward (hands on hips)
  function arm(ctx, sh, target, side, out) {
    const L1 = 90, L2 = 86, dx = target[0] - sh[0], dy = target[1] - sh[1], d = Math.min(Math.hypot(dx, dy), L1 + L2 - 1), th = Math.atan2(dy, dx);
    const a = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const e1 = [sh[0] + Math.cos(th + a) * L1, sh[1] + Math.sin(th + a) * L1], e2 = [sh[0] + Math.cos(th - a) * L1, sh[1] + Math.sin(th - a) * L1];
    const el = out ? (e1[0] * side > e2[0] * side ? e1 : e2) : (e1[1] + e1[0] * side * .15 > e2[1] + e2[0] * side * .15 ? e1 : e2);
    const wr = [sh[0] + Math.cos(th) * d, sh[1] + Math.sin(th) * d];
    seg(ctx, [sh, el, wr], 20); seg(ctx, [sh, el, wr], 12, C.shirt);
    return { wr, dir: Math.atan2(wr[1] - el[1], wr[0] - el[0]) };
  }

  // ---------- head ----------
  function head(ctx, f, talk, t) {
    const R = 100;
    // hair back mass
    path(ctx, c => { c.moveTo(-104, 10); c.quadraticCurveTo(-118, -70, -62, -108); c.quadraticCurveTo(0, -136, 70, -110); c.quadraticCurveTo(122, -78, 112, 20); c.lineTo(96, 40); c.lineTo(-96, 40); c.closePath(); }, C.hair);
    // face disc with the skin shade on the left
    path(ctx, c => c.arc(0, 8, R, 0, Math.PI * 2), C.skin);
    ctx.save(); ctx.beginPath(); ctx.arc(0, 8, R - 2.5, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = C.skinShade; ctx.beginPath(); ctx.ellipse(-150, 0, 95, 140, 0, 0, Math.PI * 2); ctx.fill();
    // stubble beard: jaw band + moustache + goatee as one soft brown patch over the lower face
    ctx.fillStyle = C.beard; ctx.beginPath(); ctx.moveTo(97, 28); ctx.arc(0, 8, R, Math.asin(20 / R), Math.PI - Math.asin(20 / R));
    ctx.quadraticCurveTo(-78, 58, -40, 58); ctx.quadraticCurveTo(-34, 44, -16, 42); ctx.quadraticCurveTo(0, 38, 16, 42); ctx.quadraticCurveTo(34, 44, 40, 58); ctx.quadraticCurveTo(78, 58, 97, 28); ctx.fill();
    ctx.restore();
    path(ctx, c => c.arc(0, 8, R, 0, Math.PI * 2), null);
    // hair top: messy fringe with flicks, sideburn on the left
    path(ctx, c => { c.moveTo(-104, 22); c.quadraticCurveTo(-112, -40, -88, -78); c.lineTo(-110, -86); c.lineTo(-78, -98); c.quadraticCurveTo(-60, -128, -10, -126); c.lineTo(-22, -142); c.lineTo(20, -128); c.quadraticCurveTo(70, -134, 96, -100); c.lineTo(122, -104); c.lineTo(104, -82); c.quadraticCurveTo(122, -46, 112, 6); c.lineTo(96, 22);
      c.quadraticCurveTo(90, -30, 62, -48); c.lineTo(52, -26); c.quadraticCurveTo(34, -50, 0, -50); c.lineTo(-10, -34); c.quadraticCurveTo(-34, -50, -60, -44); c.quadraticCurveTo(-84, -30, -88, 0); c.lineTo(-96, 30); c.closePath(); }, C.hair);
    for (const s of [[[-70, -90], [-20, -112], [30, -112]], [[-40, -74], [10, -92], [60, -84]], [[40, -110], [80, -96], [96, -64]]]) { ctx.beginPath(); ctx.moveTo(...s[0]); ctx.quadraticCurveTo(...s[1], ...s[2]); ctx.lineWidth = 3; ctx.strokeStyle = C.hairDark; ctx.lineCap = 'round'; ctx.stroke(); }
    // eyes
    const lk = f.look || [0, 0], ex = 34, ey = 6 + lk[1] * 4, e = f.eyes || 'open';
    const blink = t != null && (t % 3.7 < .12 || (t + 1.3) % 6.1 < .12);
    for (const s of [-1, 1]) {
      const x = s * ex + lk[0] * 8;
      const shut = e === 'closed' || (blink && e !== 'happy') || (e === 'wink' && s > 0);
      if (e === 'happy') { ctx.beginPath(); ctx.moveTo(x - 11, ey + 4); ctx.quadraticCurveTo(x, ey - 10, x + 11, ey + 4); ctx.lineWidth = 4.5; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); }
      else if (shut) seg(ctx, [[x - 10, ey + 2], [x + 10, ey + 2]], 4.5);
      else { ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(x + (e === 'side' ? 6 : 0), ey, 8.5, 11.5, 0, 0, Math.PI * 2); ctx.fill(); }
      // brows
      const b = f.brows || 'neutral', by = -22;
      let inner = 0, outer = 0, lift = 0;
      if (b === 'up') lift = -9; if (b === 'worried') { inner = -9; outer = 3; } if (b === 'angry') { inner = 8; outer = -4; }
      if (b === 'skeptic') { if (s > 0) { inner = -6; outer = -10; } else { inner = 4; outer = 4; } }
      seg(ctx, [[x - 14, by + lift + (s < 0 ? outer : inner)], [x + 14, by + lift + (s < 0 ? inner : outer)]], 4);   // the inner end (toward the nose) moves for worry/anger
    }
    // mouth: talk opens it; base shape from the expression
    const m = f.mouth || 'flat', o = clamp(talk || 0);
    const my = 66;
    if (m === 'laugh' || (m === 'open') || o > .08 || m === 'scared' || m === 'o') {
      const w = m === 'o' ? 11 : m === 'laugh' ? 30 : m === 'scared' ? 24 : lerp(18, 27, o), h = m === 'o' ? 14 : m === 'laugh' ? 24 : m === 'scared' ? 13 : lerp(7, 17, Math.max(o, m === 'open' ? .6 : 0));
      path(ctx, c => { if (m === 'o') c.ellipse(0, my, w, h, 0, 0, Math.PI * 2); else if (m === 'scared') { c.moveTo(-w, my + 4); c.quadraticCurveTo(0, my - h, w, my + 4); c.quadraticCurveTo(0, my + h, -w, my + 4); } else { c.moveTo(-w, my - 4); c.quadraticCurveTo(0, my - 8, w, my - 4); c.quadraticCurveTo(0, my + h * 1.6, -w, my - 4); } }, '#5a1f1f', 3.5);
      if (m !== 'o') { ctx.save(); ctx.beginPath(); if (m === 'scared') { ctx.moveTo(-w, my + 4); ctx.quadraticCurveTo(0, my - h, w, my + 4); ctx.quadraticCurveTo(0, my + h, -w, my + 4); } else { ctx.moveTo(-w, my - 4); ctx.quadraticCurveTo(0, my - 8, w, my - 4); ctx.quadraticCurveTo(0, my + h * 1.6, -w, my - 4); } ctx.clip(); ctx.fillStyle = '#fff'; ctx.fillRect(-w, my - 12, w * 2, 8 + (m === 'scared' ? 4 : 0));
        if (m === 'laugh' || o > .5) { ctx.fillStyle = '#e06a6a'; ctx.beginPath(); ctx.ellipse(0, my + h * 1.1, w * .55, h * .5, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
    } else if (m === 'smile' || m === 'smirk') { ctx.beginPath(); ctx.moveTo(-16, my - 2); ctx.quadraticCurveTo(m === 'smirk' ? 4 : 0, my + 10, 16, m === 'smirk' ? my - 8 : my - 2); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); }
    else if (m === 'frown') { ctx.beginPath(); ctx.moveTo(-14, my + 6); ctx.quadraticCurveTo(0, my - 6, 14, my + 6); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); }
    else seg(ctx, [[-12, my], [12, my]], 4);
  }

  // ---------- whole figure ----------
  const HS = .8;                                                   // head scale against the body (matches the sheets)
  function draw(ctx, x, y, s = 1, o = {}) {
    const t = o.t ?? 0, P = typeof o.pose === 'object' && o.pose.L ? o.pose : blendPose(o.pose || 'idle', o.pose || 'idle', 1);
    const breathe = Math.sin(t * 2.1) * 2.2, talk = o.talk || 0, bob = -talk * 3 + breathe * .4;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.mirror ? -1 : 1), s); ctx.rotate(o.lean || 0);
    // legs (thick black sticks) + shoes; walking swings them
    const wk = o.walk, st = wk == null ? 0 : Math.sin(wk);
    for (const sd of [-1, 1]) { const sw = sd * st * 30; seg(ctx, [[sd * 24, -160], [sd * 24 + sw, -14]], 13, C.leg); path(ctx, c => c.ellipse(sd * 24 + sw + sd * 12, -8, 26, 10, 0, 0, Math.PI * 2), C.leg, 2); }
    const top = -360 + breathe - (P.shrug || 0) * 10, sh = { L: [-60, top + 26], R: [60, top + 26] };
    // torso: white shirt, gently rounded, a little narrower at the hem
    path(ctx, c => { c.moveTo(-66, top + 22); c.quadraticCurveTo(-70, top, -44, top - 4); c.lineTo(44, top - 4); c.quadraticCurveTo(70, top, 66, top + 22); c.quadraticCurveTo(70, -200, 62, -160); c.quadraticCurveTo(0, -148, -62, -160); c.quadraticCurveTo(-70, -200, -66, top + 22); c.closePath(); }, C.shirt);
    // collar + tie
    path(ctx, c => { c.moveTo(-26, top - 4); c.lineTo(0, top + 20); c.lineTo(-6, top + 28); c.lineTo(-32, top + 10); c.closePath(); }, '#fff', 3.5);
    path(ctx, c => { c.moveTo(26, top - 4); c.lineTo(0, top + 20); c.lineTo(6, top + 28); c.lineTo(32, top + 10); c.closePath(); }, '#fff', 3.5);
    path(ctx, c => { c.moveTo(-8, top + 18); c.lineTo(8, top + 18); c.lineTo(7, top + 32); c.lineTo(-7, top + 32); c.closePath(); }, C.tieDark, 3);
    path(ctx, c => { c.moveTo(-7, top + 32); c.lineTo(7, top + 32); c.lineTo(15, top + 140); c.lineTo(0, top + 158); c.lineTo(-15, top + 140); c.closePath(); }, C.tie, 3.5);
    // arms in front of the shirt, like the sheets
    const handOf = (side, a) => { const sd = side === 'L' ? -1 : 1, k = P['h' + side]; hand(ctx, a.wr[0], a.wr[1], k, a.dir, sd < 0 && k !== 'pointUp' && k !== 'thumbsUp'); };
    if ((P.cross || 0) > .5) { // arms folded: upper arms down the sides, forearms stacked across the chest, fists tucked at the sides
      const yA = top + 104, yB = top + 122;
      seg(ctx, [sh.L, [-74, yA], [70, yA]], 20); seg(ctx, [sh.L, [-74, yA], [70, yA]], 12, C.shirt); hand(ctx, 76, yA, 'fist', 0);
      seg(ctx, [sh.R, [74, yB], [-70, yB]], 20); seg(ctx, [sh.R, [74, yB], [-70, yB]], 12, C.shirt); hand(ctx, -76, yB, 'fist', Math.PI, true);
    } else for (const side of ['L', 'R']) { const sd = side === 'L' ? -1 : 1; handOf(side, arm(ctx, sh[side], P[side], sd, P.out)); }
    // head on top (tilt + nod with the voice)
    ctx.save(); ctx.translate(0, top - 100 * HS + 6 + bob); ctx.scale(HS, HS); ctx.rotate((o.headTilt || 0) + Math.sin(t * 1.3) * .015 + talk * .02 * Math.sin(t * 9));
    head(ctx, o.face || {}, talk, t);
    ctx.restore();
    ctx.restore();
  }

  // narration loudness → mouth opening (tools/envelope.py writes window.ENV = { fps, v: [...] })
  function talk(t, env = G.ENV, from = -1e9, to = 1e9) {
    if (!env || t < from || t > to) return 0;
    const i = t * env.fps, a = env.v[Math.floor(i)] || 0, b = env.v[Math.floor(i) + 1] || 0, v = a + (b - a) * (i % 1);
    return clamp((v - .12) * 1.6);
  }
  G.Host = { draw, pose, blendPose, talk, POSES, C };
})(window);
