/* Cinematic inserts layered over the finished film (learned from the reference clips):
 *  1. Reaction close-ups: the face fills the frame (head ~ a third of the screen), in front of a BLURRED copy of the very scene we cut
 *     away from (shallow depth of field), with a sweat drop / glint / squint where the line calls for it; the scene resumes after.
 *  2. A top-down battle map for Bocachica (rows of tiny ships and soldiers, forts, the sunken-ship barrier, smoke) like a model table.
 *  3. A blueprint of San Felipe's wall vs the British scaling ladders, drawn in by a pencil (the "ladders too short" account, marked as
 *     a report). Every insert is keyed to a spoken word and lasts only as long as the beat. */
(function (G) {
  'use strict';
  const F2 = G.F2, at = F2.at, U = G.SUI, S = G.Sets2, CK = G.CK, JS = G.JS, JE = G.JE, P = G.JEP, K = G.KJ, LJ = G.LJ, k01 = U.k01, ease = U.ease, shp = G.Cast2.shp, INK = G.Cast2.INK, lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const A = (ph, f) => at(ph, f - 8);
  const cuts = () => F2.chapters.flatMap(c => c.cut).filter(c => c[1]).sort((a, b) => a[0] - b[0]);
  const activeAt = (t, list) => { let i = -1; for (let k = 0; k < list.length; k++) if (list[k][0] <= t) i = k; return i; };
  // the background plate: the active base shot rendered off-screen (no UI), then drawn blurred and slightly enlarged
  const OFF = document.createElement('canvas'); OFF.width = 1280; OFF.height = 720; const oc = OFF.getContext('2d');
  const plate = (ctx, base, t, blur = 7, z = 1.08, dx = 0) => { oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, 1280, 720); G.__noUI = true; const cv = G.__cov; G.__cov = null; try { base.fn(oc, t - base.t0, base.d, t); } finally { G.__noUI = false; G.__cov = cv; }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = `blur(${blur}px) saturate(1.05)`; const w = 1280 * z, h = 720 * z; ctx.drawImage(OFF, (1280 - w) / 2 + dx, (720 - h) / 2, w, h); ctx.filter = 'none'; ctx.restore(); };
  const sweat = (ctx, x, y, s, t) => { const k = ((t * .8) % 1); ctx.save(); ctx.translate(x, y + k * 30 * s); ctx.scale(s, s); shp(ctx, c => { c.moveTo(0, -18); c.quadraticCurveTo(12, 0, 0, 10); c.quadraticCurveTo(-12, 0, 0, -18); c.closePath(); }, '#9ad0f0', { lw: 2.4 }); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-3, 0, 2.4, 0, 7); ctx.fill(); ctx.restore(); };
  const shake = (ctx, t, a) => { if (a) ctx.translate(Math.sin(t * 40) * a, Math.cos(t * 33) * a * .6); };
  // a close-up: fig (Figure), side 'L'|'R', face/arms timeline [[t, {face, arms, look, mouth}]...], extras: sweat, flash, lines
  const close = (spec) => { const base = { fn: null, t0: 0, d: 1 }; const f = F2.shot({ noCov: true, cam: [[1.0, 640, 360], [1.05, 640, 360]], drift: .2, vig: .45, world: (ctx, t, lt) => {
      plate(ctx, base, t, spec.blur ?? 7, 1.1, spec.side === 'L' ? 60 : -60);
      const x = spec.side === 'L' ? 400 : 880, sc = spec.s ?? 3.3, y = spec.y ?? 880; let st = spec.beats[0][1]; for (const [bt, o] of spec.beats) if (t >= bt) st = Object.assign({}, st, o);
      ctx.save(); shake(ctx, t, st.shake); const pop = 1 + (1 - k01(lt, 0, .25)) * .06; ctx.translate(x, y); ctx.scale(pop, pop); ctx.translate(-x, -y); spec.fig.draw(ctx, x, y, sc, t, Object.assign({ noShadow: true, flip: spec.side === 'R' }, st)); if (spec.after) spec.after(ctx, t, x, y, sc); ctx.restore();
      if (st.sweat) sweat(ctx, x + (spec.side === 'L' ? 150 : -150), y - 640 * sc / 3.3, 1.6, t);
      if (st.lines) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const a = -2.2 + i * .35, cx = x + (spec.side === 'L' ? 70 : -70), cy = y - 720 * sc / 3.3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 190, cy + Math.sin(a) * 190); ctx.lineTo(cx + Math.cos(a) * 230, cy + Math.sin(a) * 230); ctx.stroke(); } ctx.restore(); }
    }, ui: spec.ui }); f.base = base; f.close = true; return f; };
  // ---------------------------------------------------------------- the close-ups (time windows on spoken words)
  const MP = P.mp(5001), MP2 = P.mp(5002), JEN = P.jenkins(2001, false), SAIL = P.sailor(5003), WAL = P.walpole(), MER = P.merchant(5004), DIR = P.director(5005), LON = P.londoner(5006), VER = P.vernon(), YOU = P.youVA(), LEZ = P.lezo(), SPA = P.spanish(5007), FAN = P.fandino(), OGL = P.oglethorpe(), PHIL = P.philip();
  const CU = [
    // [from phrase, approx time, duration, spec]
    ['inside the jar is his ear', 21, 2.6, { fig: MP, side: 'L', beats: [[0, { face: 'shock', arms: 'side', look: .6, sweat: true, lines: true }]] }],
    ['and youre going nowhere', 256, 2.8, { fig: SAIL, side: 'R', beats: [[0, { face: 'tired', arms: 'side', look: -.2, sweat: true }]] }],
    ['then you see the boat', 265, 2.4, { fig: JEN, side: 'L', beats: [[0, { face: 'neutral', arms: 'side', look: .7 }], [1.0, { face: 'shock', lines: true }]] }],
    ['who looks ready to faint', 409, 2.2, { fig: WAL, side: 'R', beats: [[0, { face: 'shock', arms: 'up', look: 0, sweat: true, lines: true }]] }],
    ['merchants feel cheated', 471, 2.4, { fig: MER, side: 'L', beats: [[0, { face: 'angry', arms: 'fist', look: .4, shake: 1.5 }]] }],
    ['it refuses to pay', 479, 2.6, { fig: DIR, side: 'R', beats: [[0, { face: 'sly', arms: 'cross', look: -.3 }]] }],
    ['soon theyll be wringing their hands', 519, 2.8, { fig: WAL, side: 'L', beats: [[0, { face: 'sad', arms: 'pray', look: .4, sweat: true }]] }],
    ['with six ships', 591, 2.4, { fig: VER, side: 'R', beats: [[0, { face: 'win', arms: 'hip', look: -.2 }]] }],
    ['this is going to be easy', 658, 2.6, { fig: MP2, side: 'L', beats: [[0, { face: 'win', arms: 'up', look: .3 }]] }],
    ['the heat is unbelievable', 811, 3.2, { fig: YOU, side: 'R', beats: [[0, { face: 'tired', arms: 'side', look: -.4, sweat: true }]], blur: 9 }],
    ['waiting for you behind those walls', 815, 2.6, { fig: LEZ, side: 'L', beats: [[0, { face: 'stern', arms: 'side', look: .5 }]] }],
    ['you start to notice that men around you are sick', 900, 3, { fig: YOU, side: 'L', beats: [[0, { face: 'worried', arms: 'side', look: .6, sweat: true }]] }],
    ['own report counts seven dead', 1112, 2.6, { fig: SPA, side: 'R', beats: [[0, { face: 'tired', arms: 'shrug', look: -.2 }]] }],
    ['captures him at sea', 1138, 2.4, { fig: FAN, side: 'L', beats: [[0, { face: 'shock', arms: 'up', look: .4, sweat: true, lines: true }]] }],
    ['oglethorpe retreats to georgia', 1071, 2.4, { fig: OGL, side: 'R', beats: [[0, { face: 'sad', arms: 'side', look: -.3, sweat: true }]] }],
    ['he suspends the asiento', 489, 2.4, { fig: PHIL, side: 'L', beats: [[0, { face: 'angry', arms: 'cross', look: .5, lines: true }]] }],
  ];
  const plan = [];
  for (const [ph, approx, dur, spec] of CU) { const t0 = A(ph, approx); if (!isFinite(t0)) continue; plan.push({ t0: t0 - .15, t1: t0 - .15 + dur, shot: close(spec), kind: 'close' }); }
  // ---------------------------------------------------------------- top-down Bocachica (a model-table battle map)
  const sTop = F2.shot({ noCov: true, cam: [[1.0, 640, 360], [1.18, 700, 420]], world: (ctx, t, lt) => { ctx.fillStyle = '#2a7aa8'; ctx.fillRect(-900, -600, 3100, 1500); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2; for (let i = 0; i < 60; i++) { const x = (i * 97) % 1400 - 60, y = (i * 61) % 760; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 10, y - 3, x + 20, y); ctx.stroke(); }
      const land = fn => shp(ctx, fn, '#d8c890', { lw: 4, shade: '#b8a870', dx: 0, dy: -8 }); land(c => { c.moveTo(-900, -600); c.lineTo(560, -600); c.lineTo(560, 300); c.quadraticCurveTo(520, 360, 470, 400); c.lineTo(-900, 420); c.closePath(); }); land(c => { c.moveTo(1800, -600); c.lineTo(720, -600); c.lineTo(720, 300); c.quadraticCurveTo(760, 360, 820, 400); c.lineTo(1800, 420); c.closePath(); });
      for (const [x0, x1] of [[-900, 470], [820, 1800]]) { const R = (i => () => ((i = (i * 9301 + 49297) % 233280) / 233280))(x0 + 999); for (let i = 0; i < 40; i++) { const x = lerp(x0, x1, R()), y = -500 + R() * 860; ctx.fillStyle = R() > .5 ? '#5a8a4a' : '#4a7a3a'; ctx.beginPath(); ctx.arc(x, y, 10 + R() * 12, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 1.6; ctx.stroke(); } }
      // forts (star-shaped bastions from above) with Spanish soldiers as dots on the walls
      for (const [fx, fy] of [[470, 270], [820, 260]]) { ctx.save(); ctx.translate(fx, fy); shp(ctx, c => { for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, r = i % 2 ? 46 : 74; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); }, '#e8dcc0', { lw: 3 }); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.fillStyle = '#f4f0e8'; ctx.beginPath(); ctx.arc(Math.cos(a) * 54, Math.sin(a) * 54, 4, 0, 7); ctx.fill(); ctx.strokeStyle = '#2a3a7a'; ctx.lineWidth = 1.4; ctx.stroke(); } ctx.restore(); }
      // Lezo's sunken ships across the channel (hulls tilted, masts awash)
      const sunk = k01(t, at('lezo sinks his own ships', 852), 1.5); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(590 + i * 40, 300 + (i % 2) * 14); ctx.rotate(.3 + i * .2); ctx.globalAlpha = 1 - sunk * .45; shp(ctx, c => c.ellipse(0, 0, 30, 9, 0, 0, 7), '#5a3a24', { lw: 2 }); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke(); ctx.restore(); }
      // the British line: ship icons (hull + sail from above), advancing in formation; muzzle flashes and smoke drifting
      const adv = ease.inOut(k01(lt, 0, 7)); for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { const x = 640 + (i - 2.5) * 70 + (r % 2) * 35, y = lerp(760, 470, adv) + r * 70; ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); shp(ctx, c => { c.moveTo(-26, 0); c.quadraticCurveTo(-20, -9, 18, -7); c.lineTo(28, 0); c.lineTo(18, 7); c.quadraticCurveTo(-20, 9, -26, 0); c.closePath(); }, '#3a2a1e', { lw: 1.8 }); shp(ctx, c => c.rect(-14, -12, 6, 24), '#f2ead8', { lw: 1.2 }); shp(ctx, c => c.rect(2, -14, 6, 28), '#f2ead8', { lw: 1.2 }); ctx.restore(); if (((t * 3 + i + r) % 2) < .15) { ctx.fillStyle = 'rgba(255,220,120,.9)'; ctx.beginPath(); ctx.arc(x - 18, y - 10, 6, 0, 7); ctx.fill(); } }
      for (let i = 0; i < 10; i++) { const u = (t * .08 + i * .1) % 1; ctx.fillStyle = `rgba(240,240,245,${.55 * (1 - u)})`; ctx.beginPath(); ctx.arc(520 + i * 30 + u * 80, 300 + Math.sin(i) * 20 - u * 40, 14 + u * 30, 0, 7); ctx.fill(); }
      // boats of soldiers landing on the left shore (tiny red dots)
      for (let b = 0; b < 4; b++) { const k = clamp(k01(lt, 1 + b * .6, 4)); const x = lerp(560, 380 - b * 30, k), y = lerp(560, 420 + b * 8, k); ctx.save(); ctx.translate(x, y); shp(ctx, c => c.ellipse(0, 0, 18, 7, -.5, 0, 7), '#8a5a3a', { lw: 1.6 }); for (let s = 0; s < 4; s++) { ctx.fillStyle = '#c8302a'; ctx.beginPath(); ctx.arc(-9 + s * 6, -1, 2.6, 0, 7); ctx.fill(); } ctx.restore(); } },
    ui: (ctx, t) => { U.tag(ctx, 640, 70, 'BOCACHICA · FROM ABOVE', k01(t, at('batter their way', 850), .3), 1.5); U.tag(ctx, 640, 690, 'SUNKEN SPANISH SHIPS BLOCK THE CHANNEL', k01(t, at('lezo sinks his own ships', 852), .3), 1.2); } });
  plan.push({ t0: A('batter their way through the forts', 856) - .2, t1: A('the british push through anyway', 863) - .2, shot: sTop, kind: 'insert' });
  // ---------------------------------------------------------------- blueprint: San Felipe's wall vs the ladders (drawn in by a pencil)
  const sPrint = F2.shot({ noCov: true, cam: [[1.0, 640, 360], [1.08, 640, 380]], world: (ctx, t, lt) => { ctx.fillStyle = '#1e4a8a'; ctx.fillRect(-900, -600, 3100, 1500); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1; for (let x = -900; x < 2200; x += 32) { ctx.beginPath(); ctx.moveTo(x, -600); ctx.lineTo(x, 900); ctx.stroke(); } for (let y = -600; y < 900; y += 32) { ctx.beginPath(); ctx.moveTo(-900, y); ctx.lineTo(2200, y); ctx.stroke(); }
      const draw = k01(lt, 0, 2.2); ctx.save(); ctx.strokeStyle = '#eaf2ff'; ctx.lineWidth = 4; ctx.setLineDash([2400 * draw, 2400]); ctx.beginPath(); ctx.moveTo(100, 600); ctx.lineTo(700, 600); ctx.lineTo(760, 180); ctx.lineTo(900, 180); ctx.lineTo(900, 600); ctx.lineTo(1200, 600); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      ctx.save(); ctx.strokeStyle = 'rgba(234,242,255,.5)'; ctx.lineWidth = 1.5; for (let y = 200; y < 600; y += 24) { ctx.beginPath(); ctx.moveTo(lerp(760, 700, (y - 180) / 420), y); ctx.lineTo(900, y); ctx.stroke(); } ctx.restore();
      const lad = k01(lt, 2.4, 1); if (lad > 0) { ctx.save(); ctx.globalAlpha = lad; ctx.translate(560, 600); ctx.rotate(-.42); ctx.strokeStyle = '#ffe14a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-14, -300); ctx.moveTo(14, 0); ctx.lineTo(14, -300); for (let r = 0; r < 10; r++) { ctx.moveTo(-14, -20 - r * 30); ctx.lineTo(14, -20 - r * 30); } ctx.stroke(); ctx.restore(); }
      const gap = k01(lt, 3.6, .6); if (gap > 0) { ctx.save(); ctx.globalAlpha = gap; ctx.strokeStyle = '#ff8a6a'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(700, 330); ctx.lineTo(760, 180); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.ellipse(730, 255, 70, 90, -.3, 0, 7); ctx.stroke(); ctx.restore(); }
      for (let i = 0; i < 5; i++) { const x = 300 + i * 70; ctx.strokeStyle = '#eaf2ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, 548, 12, 0, 7); ctx.moveTo(x, 560); ctx.lineTo(x, 600); ctx.stroke(); }
      const px = lt < 2.2 ? lerp(100, 1200, draw) : (lt < 3.4 ? 560 : 730), py = lt < 2.2 ? 600 - Math.sin(draw * Math.PI) * 300 : (lt < 3.4 ? 380 : 255); ctx.save(); ctx.translate(px, py - 10); ctx.rotate(.4); shp(ctx, c => c.rect(-14, -170, 28, 150), '#f0c030', { lw: 3 }); shp(ctx, c => { c.moveTo(-14, -20); c.lineTo(14, -20); c.lineTo(0, 10); c.closePath(); }, '#e8c8a0', { lw: 2.4 }); ctx.restore(); },
    ui: (ctx, t, lt) => { U.hand(ctx, 'SAN FELIPE: THE WALL', 640, 70, 36, k01(lt, .2, .4), { col: '#ffe14a' }); U.tag(ctx, 380, 680, 'BRITISH LADDERS (ACCOUNTS SAY: TOO SHORT)', k01(lt, 2.6, .3), 1.2); U.tag(ctx, 1000, 140, 'THE WALL', k01(lt, 1.6, .3), 1.3); } });
  plan.push({ t0: A('they fight their way to the foot of its walls', 933) - .1, t1: A('after about two months', 937) - .2, shot: sPrint, kind: 'insert' });
  // ---------------------------------------------------------------- splice into the cut list: insert [t0, shot] and resume the base shot at t1
  const base = cuts(); const add = [];
  for (const p of plan) { const i = activeAt(p.t0, base); if (i < 0) continue; const b = base[i], next = base[i + 1] ? base[i + 1][0] : 1329; if (p.shot.close) { p.shot.base.fn = b[1]; p.shot.base.t0 = b[0]; p.shot.base.d = next - b[0]; }
    add.push([p.t0, p.shot, .12]); const ib = activeAt(p.t1, base), rb = base[ib]; if (p.t1 < (base[ib + 1] ? base[ib + 1][0] : 1329) - .4) add.push([p.t1, ((fn, t0) => { const g = function (ctx, lt, d, t) { return fn(ctx, t - t0, (base[ib + 1] ? base[ib + 1][0] : 1329) - t0, t); }; g.spec = fn.spec; return g; })(rb[1], rb[0]), .12]); }
  F2.chapter({ cut: add, sfx: plan.map(p => ({ t: p.t0, type: p.kind === 'close' ? 'swish' : 'paper', gain: .25 })) });
})(window);
