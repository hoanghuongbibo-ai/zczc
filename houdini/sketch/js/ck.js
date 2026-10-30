/* Chapter kit: small helpers the chapter files share — walking, riding, rows of people, screen grades, map shots on parchment,
 * the "STILL HERE" stamp, and the picture lookup. */
(function (G) {
  'use strict';
  const U = G.SUI, S = G.Sets2, W = G.World, F2 = G.F2, { clamp, lerp, rng } = G.Rig, ease = U.ease, k01 = U.k01, CK = {};
  CK.k01 = k01; CK.ease = ease; CK.clamp = clamp; CK.lerp = lerp; CK.rng = rng;
  CK.IMG = k => G.Toon.IMG[k];
  // walking: feet lift alternately, the body bobs; dir moves nothing by itself (callers move x)
  CK.walk = (f, ctx, x, y, s, t, o = {}) => { const ph = t * (o.rate || 7) + f.seed; f.draw(ctx, x, y - Math.abs(Math.sin(ph)) * 4 * s, s, t, Object.assign({ step: Math.sin(ph) }, o)); };
  // a rider: the horse (galloping or standing), the rider's upper body on the saddle, one booted leg down the horse's side
  const RIDE = ['coat', 'shawl', 'arms', 'prop', 'musket', 'hands', 'head', 'hat'];
  CK.rider = (ctx, f, x, y, s, t, o = {}) => { W.horse(ctx, x, y, s, t, { gallop: o.gallop, flip: o.flip, col: o.horse || '#6a3e22', breath: o.breath }); const dir = o.flip ? -1 : 1, fs = .56 * s, bob = o.gallop ? -Math.abs(Math.sin(t * 13)) * 7 * s : 0, sy = y - 104 * s + bob;
    const legCol = f.c.legs; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = G.Cast2.INK; ctx.lineWidth = 22 * fs; ctx.beginPath(); ctx.moveTo(x - 10 * s * dir, sy - 4 * s); ctx.lineTo(x - 4 * s * dir, sy + 36 * s); ctx.stroke(); ctx.strokeStyle = legCol; ctx.lineWidth = 15 * fs; ctx.stroke(); ctx.fillStyle = '#1a1414'; ctx.beginPath(); ctx.ellipse(x - 2 * s * dir, sy + 42 * s, 14 * fs, 9 * fs, 0, 0, 7); ctx.fill(); ctx.restore();
    f.draw(ctx, x - 10 * s * dir, sy + 22 * fs, fs, t, Object.assign({ only: RIDE, noShadow: true }, o.fig || {})); };
  // a row of figures between x0 and x1 (each its own instance); oFn(i) → draw options; walking if o.walk
  CK.row = (ctx, figs, x0, x1, y, s, t, oFn = () => ({}), o = {}) => figs.forEach((f, i) => { const x = figs.length > 1 ? lerp(x0, x1, i / (figs.length - 1)) : x0, yy = y + (o.stagger ? (i % 2) * o.stagger : 0), op = oFn(i) || {}; if (op.skip) return; (o.walk ? CK.walk : (ff, c, xx, y2, ss, tt, oo) => ff.draw(c, xx, y2, ss, tt, oo))(f, ctx, x + (op.dx || 0), yy + (op.dy || 0), s * (op.s || 1), t, op); });
  // screen-space grades
  CK.tint = (ctx, col) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = col; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); };
  CK.night = (ctx, a = .45) => CK.tint(ctx, `rgba(10,16,40,${a})`);
  CK.grey = (ctx, k) => { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = `rgba(128,128,128,${k})`; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); };
  CK.sepia = (ctx, k) => { if (k <= 0) return; CK.grey(ctx, k * .9); CK.tint(ctx, `rgba(140,100,50,${k * .22})`); };
  CK.spot = (ctx, x, y, r, a = .7) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createRadialGradient(x, y, r * .6, x, y, r * 1.6); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); };
  // map shot: the view eases from v0 to v1 over the shot; draw(ctx, pr, t, lt, d) adds routes, pins and labels
  const lerpV = (a, b, k) => ({ lon: lerp(a.lon, b.lon, k), lat: lerp(a.lat, b.lat, k), s: Math.exp(lerp(Math.log(a.s), Math.log(b.s), k)), x: lerp(a.x ?? 640, b.x ?? 640, k), y: lerp(a.y ?? 380, b.y ?? 380, k) });
  CK.mapShot = (v0, v1, opts, draw, ui) => F2.shot({ cam: [[1, 640, 360], [1, 640, 360]], drift: .4, vig: .35, world: (ctx, t, lt, d) => { const v = lerpV(v0, v1 || v0, ease.inOut(clamp(lt / d))); const pr = S.map(ctx, v, opts || {}); if (draw) draw(ctx, pr, t, lt, d); }, ui });
  // the recurring stamp
  CK.stillHere = (ctx, x, y, k, rot = -.08) => { if (k <= 0) return; G.Col.stamp(ctx, 'STILL HERE', x, y, 64, rot, k, '#2a8a3a'); };
  CK.stamp = (ctx, text, x, y, size, k, rot = -.08, col) => { if (k <= 0) return; G.Col.stamp(ctx, text, x, y, size, rot, k, col); };
  // a falling-into-place pop (for props that land)
  CK.drop = (k) => lerp(-500, 0, ease.back(clamp(k)));
  // snow on the ground strip
  CK.snowGround = (ctx, y, t, seed = 1) => { const g = ctx.createLinearGradient(0, y, 0, y + 500); g.addColorStop(0, '#e8eef6'); g.addColorStop(1, '#c4cede'); ctx.fillStyle = g; ctx.fillRect(-1000, y, 3300, 1600); ctx.strokeStyle = 'rgba(150,170,200,.5)'; ctx.lineWidth = 2; const R = rng(seed); for (let i = 0; i < 30; i++) { const x = R() * 1900 - 300, yy = y + 20 + R() * 300; ctx.beginPath(); ctx.ellipse(x, yy, 30 + R() * 40, 4, 0, 0, Math.PI); ctx.stroke(); } };
  G.CK = CK;
})(window);
