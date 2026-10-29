/* "The American Revolution" — COLD OPEN preview (0:00–1:01 of assets/revolution/voice-full.mp3).
 * Shot times are word times from the pocketsphinx transcript (see PLAN-revolution.md). Immersive tone: the
 * reference style's look + HUD, light gags only on harmless beats. */
(function (G) {
  'use strict';
  const T = G.Toon, K = G.Kit, C = G.Cast, S = G.Sets, M = G.Atlas, W = T.W, H = T.H;
  const { clamp, lerp, out, inout, popK } = K;
  G.TOON_FINISH = { grain: .03, vignette: .55 };
  const night = (ctx, a = .5) => T.grade(ctx, '#7d8fb8', a, 'multiply');
  const camAt = (ctx, z, fx, fy) => T.cam(ctx, z, fx, fy);
  const you = (ctx, x, y, s, t, o = {}) => C.person(ctx, x, y, s, Object.assign({ costume: 'you', t, snow: .6 }, o));

  // ---------- A  "It's Christmas night, 1776" — tilt down from the sleet sky to the river ----------
  function A(ctx, lt, dur, t) {
    const y = lerp(-640, 0, inout(lt / 2.6));
    ctx.save(); ctx.translate(0, -y); S.nightRiver(ctx, t, { skyTop: -720 }); ctx.restore();
    night(ctx, .35); S.sleet(ctx, t, 1, .32);
    K.fadeIn(ctx, lt, .6);
  }
  // ---------- B  "and you're sixteen years old" — meet YOU ----------
  function B(ctx, lt, dur, t) {
    T.blurred(ctx, 5, () => { ctx.save(); camAt(ctx, 1.3, 640, 420); S.nightRiver(ctx, t); ctx.restore(); });
    night(ctx, .4);
    ctx.save(); camAt(ctx, lerp(1, 1.05, lt / dur), 640, 400);
    you(ctx, 640, 860, 2.3, t, { face: { eyes: lt < 1.1 ? 'tired' : 'dot', brows: 'worried', mouth: 'flat', look: [lt < 1.1 ? .4 : 0, 0] }, musket: 'shoulder', armL: 'hug' });
    ctx.restore();
    T.grade(ctx, '#9db0d6', .25, 'multiply');
    S.sleet(ctx, t, .8, .32, { seed: 5 });
    K.label(ctx, 'YOU', 980, 250, lt - .2, { size: 54, color: '#fff', stroke: 8 });
    K.arrow(ctx, [930, 280], [800, 340], lt - .35, { color: '#fff', halo: K.INK, bend: -30 });
    K.label(ctx, 'AGE 16', 1000, 316, lt - .7, { size: 34, color: '#ffd25a', stroke: 7 });
  }
  // ---------- C  "standing on the Pennsylvania bank of the Delaware River" ----------
  function C_(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1.08, 1, inout(lt / dur)), 640, 380); S.nightRiver(ctx, t); S.lantern(ctx, 300, 650, t);
    you(ctx, 200, 690, .62, t, { face: { eyes: 'dot', brows: 'worried', mouth: 'flat', look: [.6, 0] }, musket: 'shoulder', armL: 'hug' });
    ctx.restore(); night(ctx, .35); S.sleet(ctx, t, .8, .32);
    K.label(ctx, 'PENNSYLVANIA', 380, 668, lt - .72, { size: 34, color: '#fff', stroke: 7 });
    K.label(ctx, 'DELAWARE RIVER', 700, 540, lt - 1.87, { size: 36, color: '#cfe6ff', stroke: 7 });
    K.label(ctx, 'NEW JERSEY', 940, 285, lt - 2.37, { size: 30, color: '#fff', stroke: 7 });
    K.arrow(ctx, [1060, 300], [1110, 330], lt - 2.5, { color: '#fff', halo: K.INK, bend: 14 });
  }
  // ---------- D  "the river is moving ice. Big slabs of it." ----------
  function D(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1, 1.06, lt / dur), 640, 360);
    S.water(ctx, -100, 820, t, { c0: '#253655', c1: '#111a30' });
    S.iceField(ctx, t, 40, 700, { n: 22, seed: 52, minW: 120, maxW: 360, speed: 2.2 });
    const k = out((lt - 2.87) / .9);                                      // "slabs": the big one slides in
    if (lt > 2.87) S.slab(ctx, lerp(1700, 700, k), 560, 760, 7, { rot: -.04 });
    ctx.restore(); night(ctx, .3); S.sleet(ctx, t, .6, .32, { seed: 9 });
  }
  // ---------- E  "grinding against the sides of the boats like someone dragging furniture across a floor" ----------
  function hull(ctx, t) {
    K.sh(ctx, T.poly([[-100, 420], [W + 100, 380], [W + 100, H + 50], [-100, H + 50]]), '#3b2a1e', 5);
    for (let i = 1; i < 6; i++) T.line(ctx, [[-100, 420 + i * 55], [W + 100, 382 + i * 58]], 3, 'rgba(15,8,4,.55)');
    for (let i = 0; i < 12; i++) K.sh(ctx, T.circle(60 + i * 110, 445 + i * -3.3, 5), '#1c140e', 0);
  }
  function E(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1, 1.04, lt / dur), 640, 360);
    S.water(ctx, -100, 460, t, { c0: '#2a3c5d', c1: '#1b2944' });
    S.iceField(ctx, t, 60, 300, { n: 10, seed: 61, minW: 80, maxW: 200, speed: 1.4 });
    const sx = lerp(1250, 420, lt / dur), sy = 390 + Math.sin(lt * 9) * 3;
    S.slab(ctx, sx, sy, 520, 3, { rot: .03 });
    hull(ctx, t);
    const r = T.rng(Math.floor(lt * 14));                                 // ice chips and scrape marks at the contact line
    for (let i = 0; i < 8; i++) { const cx = sx - 240 + r() * 120, cy = 404 + r() * 16; K.sh(ctx, T.poly([[cx, cy], [cx + 7, cy - 5], [cx + 11, cy + 3]]), '#e4f0f7', 2); }
    for (let i = 0; i < 4; i++) T.line(ctx, [[sx - 260 - i * 30, 412 + i * 2], [sx - 180 - i * 30, 404 + i * 2]], 2.5, 'rgba(255,255,255,.7)');
    ctx.restore(); night(ctx, .3);
    // inset: "like someone dragging furniture across a floor"
    const ik = lt - 2.37;
    if (ik > 0) {
      const k = popK(ik, .35), cx = 1000, cy = 220, R = 170;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
      K.sh(ctx, T.circle(0, 0, R + 10), '#fff', 5);
      ctx.save(); ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.clip();
      ctx.fillStyle = '#e8d3a8'; ctx.fillRect(-R, -R, 2 * R, 2 * R);
      ctx.fillStyle = '#a2703f'; ctx.fillRect(-R, 30, 2 * R, R);
      for (let i = 0; i < 6; i++) T.line(ctx, [[-R, 30 + i * 26], [R, 30 + i * 26]], 2, '#7a5230');
      const ch = lerp(60, -40, clamp(ik / 2.2));                          // armchair dragged left by a hand
      ctx.save(); ctx.translate(ch, 40); ctx.rotate(-.05);
      K.sh(ctx, T.rect(-60, -90, 110, 70, 14), '#8b3a3a', 4); K.sh(ctx, T.rect(-72, -40, 134, 40, 10), '#a24545', 4);
      K.sh(ctx, T.rect(-80, -60, 24, 56, 8), '#8b3a3a', 4); K.sh(ctx, T.rect(46, -60, 24, 56, 8), '#8b3a3a', 4);
      for (const lx of [-66, 52]) K.sh(ctx, T.rect(lx, 0, 10, 16, 2), '#4a2c1a', 3);
      ctx.restore();
      ctx.save(); ctx.translate(ch - 92, 4); K.sh(ctx, T.circle(0, 0, 14), '#fbfaf7', 3.5); T.line(ctx, [[-14, 0], [-120, -10]], 22, K.INK); T.line(ctx, [[-14, 0], [-120, -10]], 15, '#7d5b3d'); ctx.restore();
      for (let i = 0; i < 3; i++) T.line(ctx, [[ch + 70 + i * 16, 42], [ch + 80 + i * 16, 54], [ch + 70 + i * 16, 66]], 3, K.INK);
      ctx.restore();
      K.txt(ctx, 'SCRRRRAPE', 0, 128, K.MARKER(26), K.RED, 'center', 1, { rot: -.06 });
      ctx.restore();
    }
  }
  // ---------- F  "It's sleeting." ----------
  function F(ctx, lt, dur, t) {
    T.blurred(ctx, 4, () => { ctx.save(); camAt(ctx, 1.25, 640, 420); S.nightRiver(ctx, t); ctx.restore(); });
    night(ctx, .45);
    ctx.save(); camAt(ctx, 1.02, 640, 400);
    const hunch = out(lt / .5);
    you(ctx, 640, 860 + hunch * 20, 2.3, t, { face: { eyes: 'squint', brows: 'worried', mouth: 'grit' }, armR: 'hug', armL: 'hug', shiver: true, snow: .9, headTilt: -.05 * hunch });
    ctx.restore();
    T.grade(ctx, '#9db0d6', .25, 'multiply');
    S.sleet(ctx, t, 2.4, .45, { seed: 3 }); S.sleet(ctx, t * 1.3, 1, .5, { seed: 8 });
  }
  // ---------- G  "Your shoes gave out weeks ago, so your feet are wrapped in rags." ----------
  function G_(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1.02, 1.08, lt / dur), 640, 470);
    T.blurred(ctx, 3, () => S.nightRiver(ctx, t));
    K.sh(ctx, T.rect(-200, 520, W + 400, 400), '#c9d6e3', 0);
    const g = ctx.createLinearGradient(0, 520, 0, 720); g.addColorStop(0, '#b4c4d6'); g.addColorStop(1, '#8094ad'); ctx.fillStyle = g; ctx.fillRect(-200, 520, W + 400, 400);
    // the old shoe, sole flapping open on "gave out"
    const fk = out((lt - .44) / .35);
    ctx.save(); ctx.translate(320, 640); ctx.rotate(-.1);
    ctx.save(); ctx.translate(70, 0); ctx.rotate(fk * .5); K.sh(ctx, T.rect(-150, -4, 154, 14, 6), '#3a2a20', 4); ctx.restore();   // sole peels from the toe
    K.sh(ctx, T.smooth([[-80, 0], [-80, -40], [-40, -58], [20, -52], [78, -18], [74, 0]]), '#7a5336', 4.5);
    K.sh(ctx, T.ellipse(-46, -48, 26, 9), '#2a1d16', 3);
    K.sh(ctx, T.rect(-8, -50, 26, 18, 3), '#c9b16a', 3.5);
    for (let i = 0; i < 3; i++) T.line(ctx, [[30 + i * 12, -30], [36 + i * 12, -22]], 2.5, '#3a2a20');
    ctx.restore();
    you(ctx, 760, 660, 3.1, t, { face: { eyes: 'dot' }, armL: 'hug', armR: 'hug' });
    // loose rag ends flapping in the wind
    for (const fx of [760 - 65, 760 + 65]) { const fl = Math.sin(t * 12 + fx) * 8; K.sh(ctx, T.poly([[fx - 6, 610], [fx - 50, 590 + fl], [fx - 44, 602 + fl], [fx - 2, 620]]), '#a99c88', 3); }
    ctx.restore(); night(ctx, .35); S.sleet(ctx, t, .9, .35);
    K.label(ctx, 'WEEKS AGO', 320, 540, lt - .44, { size: 30, color: '#fff', stroke: 7 });
    K.label(ctx, 'RAGS', 1060, 470, lt - 2.28, { size: 46, color: '#fff', stroke: 8 });
    K.arrow(ctx, [1040, 500], [930, 590], lt - 2.4, { color: '#fff', halo: K.INK, bend: -25 });
  }
  // ---------- H  "every time you shift your weight, you can feel the cold come up through them" ----------
  function H_(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1, 1.06, lt / dur), 640, 400); S.nightRiver(ctx, t); ctx.restore(); night(ctx, .45);
    const sk = clamp((lt - .71) / .5), lean = Math.sin(sk * Math.PI * 2) * .05, frost = clamp((lt - 2.42) / 1.6);
    you(ctx, 640, 700, 1.75, t, { lean, step: Math.sin(sk * Math.PI * 2), frost: frost * .95, frostFace: frost * .3, face: { eyes: frost > .3 ? 'squint' : 'dot', brows: 'worried', mouth: frost > .3 ? 'grit' : 'flat' }, armL: 'hug', armR: 'hug', shiver: frost > .2, shiverMarks: frost > .5 });
    T.grade(ctx, '#9db0d6', .2, 'multiply');
    S.sleet(ctx, t, 1, .35);
    if (frost > 0) K.label(ctx, 'COLD', 880, 560, lt - 2.5, { size: 40, color: '#bfe6ff', stroke: 8 });
    if (frost > 0) K.arrow(ctx, [860, 590], [730, 650], lt - 2.65, { color: '#bfe6ff', halo: K.INK, bend: 20 });
  }

  // ---------- I/J  map: "running for four months" → "You lost New York. You lost New Jersey." ----------
  const RETREAT = [[-73.99, 40.69], [-73.97, 40.78], [-73.93, 40.85], [-73.76, 41.03], [-73.97, 40.85], [-74.04, 40.89], [-74.17, 40.73], [-74.45, 40.49], [-74.66, 40.35], [-74.76, 40.22], [-74.87, 40.25]];
  const V0 = { lon: -74.4, lat: 40.6, k: 520 }, V1 = { lon: -74.45, lat: 40.56, k: 560 };
  function mapIJ(ctx, lt, dur, t, part) {
    const gt = part === 'I' ? lt : lt + 3.78;                            // continuous across the two shots
    const v = M.lerpView(V0, V1, inout(gt / 6.6));
    M.base(ctx, v);
    M.fill(ctx, v, ['PA'], 'rgba(90,130,190,.28)', 1);
    // British-held: New York City area (Sept–Nov 1776) and New Jersey garrisons (Dec 1776)
    if (part === 'J' || gt > 3.9) { M.blob(ctx, v, -73.95, 40.72, .32, 'rgba(195,50,44,.75)', 1, out((gt - 4.18) / .5)); }
    if (gt > 5.5) M.flood(ctx, v, ['NJ'], 'rgba(195,50,44,.55)', clamp((gt - 5.52) / .9), [-74.0, 40.75]);
    M.route(ctx, v, RETREAT, clamp((gt - 1.7) / 2.0), { color: '#2f4c7d' });
    M.dot(ctx, v, -73.99, 40.69, gt - 1.4, { label: 'BROOKLYN · AUG', dx: 30, dy: 36, size: 20, color: '#2f4c7d' });
    M.dot(ctx, v, -74.87, 40.25, gt - 3.7, { label: 'DEC', dx: -10, dy: -26, size: 22, color: '#2f4c7d' });
    K.label(ctx, '4 MONTHS', 640, 150, gt - 2.28, { size: 46, color: '#2f4c7d', stroke: 8, strokeColor: '#f3e7c8' });
    const p = M.proj(v), nyc = p([-73.97, 40.75]), nj = p([-74.55, 40.25]);
    if (gt > 4.18) { K.stamp(ctx, 'LOST', nyc[0] + 40, nyc[1] - 70, gt - 4.25, { size: 40, rot: -.15 }); M.unionFlag(ctx, nyc[0] + 6, nyc[1] + 6, .8 * popK(gt - 4.2, .3), t * 3); }
    if (gt > 5.52) {
      K.stamp(ctx, 'LOST', nj[0] - 20, nj[1] + 40, gt - 5.6, { size: 40, rot: .1 });
      for (const [i, [lo, la]] of [[-74.45, 40.49], [-74.66, 40.35], [-74.76, 40.22], [-74.27, 40.51]].entries()) { const q = p([lo, la]); M.unionFlag(ctx, q[0], q[1], .55 * popK(gt - 5.7 - i * .12, .3), t * 3 + i); }
    }
    K.label(ctx, 'NEW YORK', nyc[0] + 200, nyc[1] - 20, gt - 4.0, { size: 26, stroke: 6, strokeColor: '#f3e7c8' });
    K.label(ctx, 'NEW JERSEY', nj[0] + 30, nj[1] - 40, gt - 5.4, { size: 26, stroke: 6, strokeColor: '#f3e7c8' });
    K.label(ctx, 'PENNSYLVANIA', p([-75.6, 40.45])[0], p([-75.6, 40.45])[1], gt - .3, { size: 26, color: '#2f4c7d', stroke: 6, strokeColor: '#f3e7c8' });
  }

  // ---------- K  "Thousands of men you marched with have been captured, killed, or have just gone home." ----------
  const LINE = [[110, 'home', 0], [250, 'killed', 0], [390, 'home', 1], [890, 'killed', 1], [1030, 'capt', 0], [1170, 'capt', 1]];
  function K_(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1.04, 1, inout(lt / dur)), 640, 380); S.winterRoad(ctx, t);
    const tc = 1.89, tk = 2.74, th = 3.9;                                // captured / killed / gone home (shot-relative)
    for (const [x, fate, i] of LINE) {
      let px = x, a = 1, flip = false, step = 0, fc = { eyes: 'tired', brows: 'sad', mouth: 'flat' };
      if (fate === 'capt' && lt > tc + i * .15) { const k = clamp((lt - tc - .3 - i * .15) / .8); px = x + K.back(k) * 0 + k * k * 700; fc = { eyes: 'shock', brows: 'up', mouth: 'o' }; }
      if (fate === 'killed' && lt > tk) a = 1 - clamp((lt - tk - i * .2) / .8);
      if (fate === 'home' && lt > th) { const k = clamp((lt - th - i * .2) / 1.4); px = x - k * 420; flip = true; step = Math.sin(lt * 10); a = 1 - clamp((k - .7) / .3); }
      if (a <= 0 || px > W + 200) continue;
      if (fate === 'killed' && lt > tk) { ctx.save(); ctx.globalAlpha = a; C.person(ctx, px, 640, 1, { costume: 'continental', t, musket: 'shoulder', colors: { coat: '#8d9097', coat2: '#7c7f86', facing: '#b9b9b9' }, face: fc }); ctx.restore(); }
      else C.person(ctx, px, 640, 1, { costume: i ? 'militia' : 'continental', t, musket: 'shoulder', flip, step, alpha: a, face: fc });
      if (fate === 'capt' && lt > tc + i * .15) { const q = clamp((lt - tc - i * .15) / .3); T.line(ctx, [[px, 500], [px + 30, 490], [W + 50, 460 - q * 10]], 4, '#8a6a43'); }
      if (fate === 'home' && lt > th) K.sh(ctx, T.circle(px + (flip ? 50 : -50), 520, 26), '#b79a6a', 3);   // bundle
    }
    you(ctx, 640, 650, 1.05, t, { snow: .2, musket: 'shoulder', face: { eyes: 'dot', brows: 'worried', mouth: 'frown', look: [lt > th + .8 ? -.8 : lt > tc ? .8 : 0, 0] } });
    ctx.restore();
    K.label(ctx, 'CAPTURED', 1000, 250, lt - tc, { size: 30, color: K.INK, stroke: 6, strokeColor: '#eee' });
    K.label(ctx, 'KILLED', 560, 200, lt - tk, { size: 30, color: K.INK, stroke: 6, strokeColor: '#eee' });
    K.label(ctx, 'WENT HOME', 250, 250, lt - th, { size: 30, color: K.INK, stroke: 6, strokeColor: '#eee' });
    S.sleet(ctx, t, .25, .2, { seed: 13 });
  }

  // ---------- L  "your enlistment ... everyone standing in the dark around you ... runs out in six days" ----------
  const CROWD = [[150, 560, .78], [300, 590, .9], [470, 575, .82], [820, 575, .84], [990, 590, .9], [1140, 560, .78], [230, 470, .6], [400, 455, .58], [880, 455, .58], [1060, 470, .6]];
  function enlistPaper(ctx, x, y, s, lt, big) {
    if (lt <= 0) return; const k = popK(lt, .3);
    ctx.save(); ctx.translate(x, y); ctx.scale(k * s, k * s); ctx.rotate(-.05);
    K.sh(ctx, T.rect(-90, -60, 180, 120, 4), '#f1e6c8', 4);
    K.txt(ctx, 'ENLISTED UNTIL', 0, -30, K.ROUND(18, 700), '#3a2c20');
    K.txt(ctx, 'DEC 31, 1776', 0, 6, K.DISPLAY(26), '#8e1f1b');
    for (let i = 0; i < 2; i++) T.line(ctx, [[-60, 34 + i * 12], [60, 34 + i * 12]], 2, 'rgba(60,40,20,.4)');
    ctx.restore();
  }
  function L_(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1, 1.05, lt / dur), 640, 400);
    S.campGround(ctx, t); S.tent(ctx, 160, 420, .9, { snow: true }); S.tent(ctx, 1120, 420, .9, { snow: true });
    for (const [x, y, s] of CROWD.slice(6)) C.silhouette(ctx, x, y, s, { musket: true });
    S.fire(ctx, 640, 650, t, .8);
    for (const [x, y, s] of CROWD.slice(0, 6)) C.silhouette(ctx, x, y, s, { musket: x % 2 === 0, rimSide: x < 640 ? 1 : -1 });
    you(ctx, 640, 640, 1.05, t, { musket: 'shoulder', armL: 'hug', face: { eyes: 'dot', brows: 'worried', mouth: 'flat', look: [lt > 2.4 && lt < 4 ? (Math.sin(lt * 2) > 0 ? .7 : -.7) : 0, 0] } });
    ctx.restore(); night(ctx, .3);
    T.glow(ctx, 640, 600, 380, 'rgba(255,140,60,.18)');
    enlistPaper(ctx, 900, 330, 1.1, lt - .36, true);
    CROWD.slice(0, 6).forEach(([x, y, s], i) => { if (i === 3 || i === 4) return; const q = lt - 2.4 - i * .12; if (q > 0) { const k = popK(q, .25); ctx.save(); ctx.translate(x, y - 300 * s); ctx.scale(k * .55, k * .55); K.sh(ctx, T.rect(-50, -30, 100, 60, 4), '#f1e6c8', 3.5); K.txt(ctx, 'DEC 31', 0, 2, K.DISPLAY(24), '#8e1f1b'); ctx.restore(); } });
    K.sign(ctx, 640, 70, ['ENLISTMENTS', 'END IN:'], '6', lt - 4.6, { unit: 'DAYS' });
    S.sleet(ctx, t, .5, .3);
  }
  // ---------- M  "On New Year's Day, this army basically stops existing." ----------
  const CAMP = [[90, 600, .7], [210, 640, .78], [330, 610, .72], [450, 650, .8], [820, 650, .8], [940, 610, .72], [1060, 640, .78], [1190, 600, .7], [160, 480, .5], [280, 470, .5], [420, 480, .52], [860, 480, .52], [990, 470, .5], [1120, 480, .5]];
  const KEEP = new Set([3, 9]);
  function M_(ctx, lt, dur, t) {
    ctx.save(); camAt(ctx, lerp(1.04, 1, inout(lt / dur)), 640, 400);
    S.campGround(ctx, t);
    for (const [x, s] of [[120, .7], [330, .62], [960, .62], [1170, .7], [560, .5], [740, .5]]) S.tent(ctx, x, 420, s, { snow: true });
    S.fire(ctx, 640, 640, t, .7 * (1 - clamp((lt - 3.2) / 1.2) * .5));
    const order = [0, 13, 5, 8, 11, 2, 7, 12, 1, 10, 6, 4];
    CAMP.forEach(([x, y, s], i) => {
      if (KEEP.has(i)) { C.silhouette(ctx, x, y, s, { musket: true }); return; }
      const ti = 1.3 + order.indexOf(i) * .18, a = 1 - clamp((lt - ti) / .25);
      if (a > 0) C.silhouette(ctx, x, y, s, { musket: i % 2 === 0, alpha: a });
      if (lt > ti && lt < ti + .5) { const k = (lt - ti) / .5; ctx.save(); ctx.globalAlpha = 1 - k; K.sh(ctx, T.circle(x, y - 120 * s, 40 * s + k * 50 * s), 'rgba(200,210,225,.8)', 0); ctx.restore(); }
    });
    you(ctx, 640, 700, .9, t, { musket: 'shoulder', armL: 'hug', face: { eyes: lt > 2.2 ? 'shock' : 'dot', brows: 'worried', mouth: lt > 2.2 ? 'o' : 'flat' } });
    ctx.restore(); night(ctx, .35);
    const pages = [['DEC', '26', '1776'], ['DEC', '27', '1776'], ['DEC', '28', '1776'], ['DEC', '29', '1776'], ['DEC', '30', '1776'], ['DEC', '31', '1776'], ['JAN', '1', '1777', '#2b5a9e']];
    const flips = [.05, .14, .23, .32, .41, .55];
    K.calendar(ctx, 170, 220, .9, pages, lt, flips);
    // the sign (already hanging since L) counts 6 → 0 with the calendar pages
    K.sign(ctx, 1010, 70, ['ENLISTMENTS', 'END IN:'], '6', lt + 1, { unit: 'DAYS', w: 360, flips: flips.map((ft, i) => [ft + 1, String(5 - i)]) });
    S.sleet(ctx, t, .5, .3);
  }

  // ---------- N1  "So how does an army like this — loses, and loses, and loses" ----------
  function N1(ctx, lt, dur, t) {
    ctx.fillStyle = '#3a2a1f'; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 9; i++) K.sh(ctx, T.rect(i * 150 - 20, 0, 146, H, 2), i % 2 ? '#47331f' : '#4f3a24', 3);
    ctx.save(); camAt(ctx, lerp(1, 1.04, lt / dur), 600, 360);
    K.sh(ctx, T.rect(200, 70, 760, 560, 8), '#efe2c0', 6);
    K.txt(ctx, '1776 RECORD', 580, 130, K.DISPLAY(48), K.INK);
    T.line(ctx, [[240, 170], [920, 170]], 3, K.INK);
    const rows = [['LONG ISLAND', 'AUG 27'], ['WHITE PLAINS', 'OCT 28'], ['FORT WASHINGTON', 'NOV 16']], hits = [2.44, 3.3, 4.16];
    rows.forEach(([n, d], i) => { const y = 240 + i * 120; K.txt(ctx, n, 250, y, K.MARKER(40), K.INK, 'left'); K.txt(ctx, d, 250, y + 40, K.ROUND(20, 700), '#6b5a48', 'left'); T.line(ctx, [[240, y + 66], [920, y + 66]], 1.5, 'rgba(60,40,20,.3)'); K.stamp(ctx, 'LOSS', 800, y + 10, lt - hits[i], { size: 44, rot: -.12 + i * .08 }); });
    ctx.restore();
    const peek = out((lt - .4) / .5);
    you(ctx, lerp(1400, 1130, peek), 760, 1.25, t, { musket: 'shoulder', face: { eyes: lt > 4.3 ? 'shock' : 'dot', brows: 'worried', mouth: lt > 4.3 ? 'wobble' : 'flat', look: [-.8, 0], sweat: lt > 2.5 } });
  }
  // ---------- N2  "end up beating the most powerful empire on Earth?" ----------
  function N2(ctx, lt, dur, t) {
    const z = lerp(2.4, 1, inout((lt - .3) / 2.4)), fx = lerp(170, 640, inout((lt - .3) / 2.4)), fy = lerp(640, 360, inout((lt - .3) / 2.4));
    ctx.save(); camAt(ctx, z, fx, fy);
    S.fleet(ctx, t, { ships: 18 });
    K.sh(ctx, T.rect(-400, 540, W + 800, 400), '#8c8f6a', 0);
    for (let i = 0; i < 8; i++) C.person(ctx, 380 + i * 125, 760, 1.7, { costume: 'grenadier', t: t + i, musket: 'shoulder', bayonet: true, face: { eyes: 'dot', brows: 'angry', mouth: 'flat' } });
    you(ctx, 170, 690, .4, t, { musket: 'shoulder', face: { eyes: 'shock', brows: 'up', mouth: 'o', look: [.6, -.6], sweat: true } });
    ctx.restore();
    K.label(ctx, 'YOU', 150, 520, lt - 2.6, { size: 30, color: '#fff', stroke: 7 });
    K.arrow(ctx, [150, 545], [168, 600], lt - 2.7, { color: '#fff', halo: K.INK, bend: 10, d: .2 });
  }
  // ---------- O  title: "Over the next twenty minutes, you're going to find out." ----------
  function O(ctx, lt, dur, t) {
    K.sunburst(ctx, t, '#c8433a', '#a8312b');
    T.grade(ctx, '#1f3d7a', .15);
    K.title(ctx, 'THE AMERICAN', 640, 300, lt - .12, { size: 92 });
    K.title(ctx, 'REVOLUTION', 640, 400, lt - .3, { size: 112, fill: '#fff6dc' });
    K.label(ctx, '1775 – 1783', 640, 490, lt - .8, { size: 38, color: '#fff', stroke: 7 });
    K.flashIn(ctx, lt, .2);
  }

  // ---------- HUD overlay (global time) ----------
  const ASK = 49.89;
  function hud(ctx, _lt, _d, t) {
    if (t < 58.47) K.dateTag(ctx, 'DEC 25, 1776', t - 1.2, { hold: 3.6 });
    if (t >= 26.3 && t < 33) K.dateTag(ctx, 'AUG → DEC 1776', t - 26.5, { hold: 6.2 });
    if (t >= 4.93 && t < 58.47) K.badge(ctx, { label: 'NOW', title: 'DELAWARE RIVER', year: 'DEC 1776', icon: (c, x, y) => M.mini(c, x, y, 150, 66, [[['PA'], '#7e9cc8'], [['NJ'], '#d9b97c']], [-74.87, 40.29]) }, t - 4.95);
    K.qcard(ctx, [['HOW DOES A ', '#fff'], ['LOSING', '#ffd25a'], [' ARMY WIN?', '#fff']], t - ASK, { size: 20 });
  }

  // ---------- timeline ----------
  const cuts = [[0, A], [2.91, B], [4.93, C_], [8.04, D], [12.02, E], [16.87, F], [18.14, G_], [21.81, H_],
    [26.3, (c, l, d, t) => mapIJ(c, l, d, t, 'I')], [30.08, (c, l, d, t) => mapIJ(c, l, d, t, 'J')], [32.91, K_], [38.06, L_], [45.16, M_], [49.75, N1], [55.16, N2], [58.47, O]];
  const END = 61.4;
  const shots = cuts.map(([s, f], i) => ({ start: s, end: i + 1 < cuts.length ? cuts[i + 1][0] : END, draw: f }));
  shots.push({ start: 0, end: END, draw: hud });
  const sfx = [
    ...cuts.slice(1).map(([s]) => ({ t: s - .05, type: 'swoosh', gain: .5 })),
    { t: .2, type: 'gust', gain: .7 }, { t: 1.25, type: 'pop', gain: .5 }, { t: 3.15, type: 'pop' }, { t: 5.0, type: 'whoosh', gain: .5 },
    { t: 5.7, type: 'pop', gain: .6 }, { t: 6.85, type: 'pop', gain: .6 }, { t: 7.35, type: 'pop', gain: .6 },
    { t: 8.6, type: 'ice', gain: .9 }, { t: 10.9, type: 'thud', gain: .9 }, { t: 11.0, type: 'crack' },
    { t: 12.2, type: 'ice', gain: 1 }, { t: 14.4, type: 'pop' }, { t: 14.6, type: 'scrape', gain: .9 },
    { t: 16.9, type: 'gust', gain: 1 }, { t: 18.6, type: 'flip', gain: .7 }, { t: 20.45, type: 'pop' },
    { t: 22.5, type: 'step', gain: .8 }, { t: 22.8, type: 'step', gain: .8 }, { t: 24.2, type: 'rise', gain: .5 },
    { t: 27.7, type: 'pop' }, { t: 28.6, type: 'pop' }, { t: 30.45, type: 'stamp' }, { t: 31.8, type: 'stamp' },
    { t: 34.8, type: 'rope', gain: .8 }, { t: 35.7, type: 'poof', gain: .4 }, { t: 36.85, type: 'step', gain: .6 }, { t: 37.1, type: 'step', gain: .6 },
    { t: 38.42, type: 'paper' }, { t: 40.5, type: 'paper', gain: .6 }, { t: 42.7, type: 'creak' }, { t: 43.1, type: 'thud', gain: .6 },
    ...[.05, .14, .23, .32, .41, .55].map(f => ({ t: 45.16 + f, type: 'flip', gain: .6 })), ...[0, 1, 2, 3].map(i => ({ t: 46.5 + i * .5, type: 'poof', gain: .3 })),
    { t: 49.9, type: 'ding', gain: .7 }, { t: 52.19, type: 'stamp' }, { t: 53.05, type: 'stamp' }, { t: 53.91, type: 'stamp' },
    { t: 55.4, type: 'whoosh', gain: .7 }, { t: 58.5, type: 'boom', gain: .9 }, { t: 58.5, type: 'rise', gain: .4 },
  ];
  G.Show = { duration: END, narration: 'assets/revolution/voice-full.mp3', images: {},
    fonts: ['30px "Luckiest Guy"', '30px "Permanent Marker"', '700 20px Fredoka', '600 20px Fredoka'],
    shots, sfx, moods: [{ t: 0, mood: 'cold' }, { t: 49.75, mood: 'tense' }, { t: 58.47, mood: 'none' }], musicGain: .32, sfxGain: .4 };   // read by sound.js via G.Show
})(window);
