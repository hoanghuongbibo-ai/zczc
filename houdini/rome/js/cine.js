/* Rome series — cinematic scenery kit (G.Cine), drawn after the user's enhanced reference paintings:
 * painted golden-hour skies with lit cumulus, layered hills that fade into haze, full-canopy trees, textured meadows with
 * flowers, reflective water, and a depth-layered camera (parallax) so shots move like a real camera through the scene.
 * Everything keeps the series' warm-brown ink line, but softer and thinner on distant layers. No blur filters (slow). */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, mix } = P;
  const rng = seed => { let s = Math.abs(Math.round(seed * 9301 + 49297)) % 2147483646 + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
  const PAL = {
    golden: { top: '#8cb0cc', mid: '#efd8a8', low: '#f8c47a', hor: '#fde2a8', sun: '#fff1c8', cloud: '#f6e2c4', cloudSh: '#c89a8a', haze: '#f4d6a6', grade: '#ffb060' },
    sunset: { top: '#5a6a9a', mid: '#e89a88', low: '#f8b070', hor: '#fdd290', sun: '#fff0c0', cloud: '#f8c8b0', cloudSh: '#b07a8a', haze: '#f0b890', grade: '#ff8a50' },
    dawn: { top: '#8ab4d8', mid: '#dfe4d8', low: '#f6dcb0', hor: '#fbe8c4', sun: '#fffbe8', cloud: '#fbf4ea', cloudSh: '#b8c0d0', haze: '#e8ecdc', grade: '#ffd8a0' },
    storm: { top: '#3e4a5a', mid: '#6a7686', low: '#8a96a2', hor: '#a4aeb6', sun: null, cloud: '#7a8494', cloudSh: '#4a5462', haze: '#8a94a0', grade: '#5a7088' },
    blood: { top: '#3a1418', mid: '#8a2a20', low: '#d8602e', hor: '#f8a050', sun: '#ffd890', cloud: '#c8604a', cloudSh: '#6a2420', haze: '#e88a50', grade: '#ff6a30' },
  };
  // ---------- camera with depth layers ----------
  // cam: { x, y, z } world offset & zoom; layer depth d: 0 = infinitely far (sky), 1 = the focal plane, >1 = foreground
  function cam(lt, dur, a, b, e = ease.inOut) { const k = e(clamp(lt / dur)); return { x: lerp(a.x || 0, b.x || 0, k), y: lerp(a.y || 0, b.y || 0, k), z: lerp(a.z || 1, b.z || 1, k) }; }
  function layer(ctx, c, d, draw) { ctx.save(); const z = 1 + (c.z - 1) * d; ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-640 - c.x * d, -360 - c.y * d); draw(); ctx.restore(); }
  // ---------- sky ----------
  function sky(ctx, pal, t, o = {}) { const p = PAL[pal] || pal, hy = o.horizon ?? 460, sun = o.sun || [900, hy - 120];
    const g = ctx.createLinearGradient(0, -60, 0, hy + 40); g.addColorStop(0, p.top); g.addColorStop(.5, p.mid); g.addColorStop(.85, p.low); g.addColorStop(1, p.hor); ctx.fillStyle = g; ctx.fillRect(-900, -900, 3100, hy + 1300);
    if (p.sun && o.sunDisc !== false) { const r = o.sunR || 70, sg = ctx.createRadialGradient(sun[0], sun[1], r * .6, sun[0], sun[1], r * 6); sg.addColorStop(0, 'rgba(255,246,220,.9)'); sg.addColorStop(.25, 'rgba(255,224,160,.45)'); sg.addColorStop(1, 'rgba(255,210,140,0)'); ctx.fillStyle = sg; ctx.fillRect(sun[0] - r * 6, sun[1] - r * 6, r * 12, r * 12);
      ctx.fillStyle = p.sun; ctx.beginPath(); ctx.arc(sun[0], sun[1], r, 0, 7); ctx.fill(); }
    // cloud banks, far (small, hazy) to near (big, lit), drifting
    const R = rng(o.seed ?? 3), n = o.clouds ?? 6; for (let i = 0; i < n; i++) { const far = 1 - i / Math.max(1, n - 1), x = ((R() * 1800 + t * (2 + (1 - far) * 6)) % 2200) - 450, y = (o.cloudY ?? 50) + (hy - 120 - (o.cloudY ?? 50)) * far * (.75 + R() * .25), s = .45 + (1 - far) * .75 + R() * .2;
      cloud(ctx, x, y, s, p, sun, R() * 1000, 1 - far * .35); } }
  function cloud(ctx, x, y, s, p, sun, seed, a = 1) { const R = rng(seed), w = (260 + R() * 260) * s, h = (26 + R() * 30) * s, n = 6 + Math.floor(R() * 5);
    // outline: flat base, a row of soft bumps along the top (bigger toward the middle), tapered ends
    const top = []; for (let i = 0; i <= n; i++) { const u = i / n, bump = Math.sin(u * Math.PI); top.push([x - w / 2 + u * w, y - h * (.4 + bump * (1.2 + R() * .9))]); }
    const shape = c => { c.moveTo(x - w / 2 - 20 * s, y); c.quadraticCurveTo(x - w / 2, y - h * .3, top[0][0], top[0][1]); for (let i = 1; i < top.length; i++) { const [px, py] = top[i - 1], [qx, qy] = top[i]; c.quadraticCurveTo((px + qx) / 2, Math.min(py, qy) - h * (.5 + R() * .4), qx, qy); } c.quadraticCurveTo(x + w / 2 + 10 * s, y - h * .2, x + w / 2 + 40 * s, y); c.quadraticCurveTo(x, y + h * .25, x - w / 2 - 20 * s, y); c.closePath(); };
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); shape(ctx);
    const g = ctx.createLinearGradient(0, y - h * 2.4, 0, y + h * .3); g.addColorStop(0, mix(p.cloud, '#fff8ec', .55)); g.addColorStop(.55, p.cloud); g.addColorStop(1, p.cloudSh); ctx.fillStyle = g; ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = mix(p.cloud, '#fffaf0', .8); ctx.globalAlpha = a * .75; ctx.lineWidth = 10 * s; ctx.beginPath(); shape(ctx); ctx.stroke(); ctx.lineWidth = 22 * s; ctx.globalAlpha = a * .25; ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = a * .55; ctx.strokeStyle = '#8a5a4a'; ctx.lineWidth = 2; ctx.beginPath(); shape(ctx); ctx.stroke(); ctx.restore(); }
  // ---------- hills ----------
  // a ridge layer: rolling silhouette with a lit-top gradient, haze by distance, tree clumps and copses along it
  function hills(ctx, o) { const { y, amp = 60, seed = 1, col = '#7a9a4a', haze = '#f4d6a6', far = .5, trees = 10, t = 0, x0 = -500, x1 = 1800 } = o, R = rng(seed);
    const ph = [R() * 6, R() * 6, R() * 6], ridge = x => y - amp * (.55 * Math.sin(x * .004 + ph[0]) + .3 * Math.sin(x * .011 + ph[1]) + .15 * Math.sin(x * .027 + ph[2]) + .45) - (o.peak ? o.peak(x) : 0);
    const c = mix(col, haze, far), cs = mix(mix(col, '#2a3a20', .3), haze, far * .9), cl = mix(mix(col, '#f8f0a0', .35), haze, far * .8);
    ctx.beginPath(); ctx.moveTo(x0, 1100); for (let x = x0; x <= x1; x += 16) ctx.lineTo(x, ridge(x)); ctx.lineTo(x1, 1100); ctx.closePath();
    const g = ctx.createLinearGradient(0, y - amp, 0, y + 260); g.addColorStop(0, cl); g.addColorStop(.35, c); g.addColorStop(1, cs); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = `rgba(60,40,24,${.55 * (1 - far)})`; ctx.lineWidth = 3.5 * (1 - far * .6); ctx.beginPath(); for (let x = x0; x <= x1; x += 16) x === x0 ? ctx.moveTo(x, ridge(x)) : ctx.lineTo(x, ridge(x)); ctx.stroke();
    // soft fold shading on the slopes
    ctx.save(); ctx.beginPath(); ctx.moveTo(x0, 1100); for (let x = x0; x <= x1; x += 16) ctx.lineTo(x, ridge(x)); ctx.lineTo(x1, 1100); ctx.closePath(); ctx.clip();
    for (let i = 0; i < 8; i++) { const fx = x0 + R() * (x1 - x0), fy = ridge(fx) + 20 + R() * 60; ctx.fillStyle = `rgba(40,50,20,${.08 * (1 - far)})`; ctx.beginPath(); ctx.ellipse(fx, fy + 40, 160 + R() * 160, 50, -.15, 0, 7); ctx.fill(); ctx.fillStyle = `rgba(255,240,170,${.1 * (1 - far)})`; ctx.beginPath(); ctx.ellipse(fx - 60, fy, 120, 26, -.1, 0, 7); ctx.fill(); }
    ctx.restore();
    // trees on the ridge and slopes
    const ts = o.treeScale ?? (.25 + (1 - far) * .5); for (let i = 0; i < trees; i++) { const tx = x0 + 200 + R() * (x1 - x0 - 400), ty = ridge(tx) + R() * 50 * (1 - far) + 6, kind = R() < (o.cypress ?? .25) ? 'cypress' : R() < (o.pines ?? .1) ? 'umbrella' : 'oak'; tree(ctx, tx, ty, ts * (.7 + R() * .6), t, { kind, haze, far, seed: seed * 100 + i }); }
    return ridge; }
  // overlapping rounded hills (mounds), each lit from the sun's side, hazier with distance; copses tucked into the folds
  function mounds(ctx, o) { const { y, n = 4, seed = 1, col = '#7a9a4a', haze = '#f4d6a6', far = .4, sunX = 900, t = 0, w = 520, h = 160, copses = 3 } = o, R = rng(seed);
    const list = []; for (let i = 0; i < n; i++) list.push([-200 + (i + R() * .6) * (1700 / n), y + R() * 40, w * (.6 + R() * .8), h * (.45 + R() * 1.0)]);
    list.sort((A, B) => A[1] - B[1]);
    for (const [mx, my, mw, mh] of list) mound(ctx, mx, my, mw, mh, { col, haze, far, sunX, t, copses, seed: seed * 7 + mx }); }
  // one rounded hill, lit from the sun side; copses tucked into its folds
  function mound(ctx, mx, my, mw, mh, o = {}) { const { col = '#7a9a4a', haze = '#f4d6a6', far = .2, sunX = 900, t = 0, copses = 3, seed = 1 } = o, R = rng(seed); const shape = c => { c.moveTo(mx - mw / 2, my + 200); c.lineTo(mx - mw / 2, my); c.bezierCurveTo(mx - mw * .38, my - mh * 1.02, mx + mw * .2, my - mh * 1.08, mx + mw * .5, my - mh * .1); c.lineTo(mx + mw / 2, my + 200); c.closePath(); };
      const lit = sunX < mx ? -1 : 1, base = mix(col, haze, far), g = ctx.createRadialGradient(mx + lit * mw * .2, my - mh * .9, 10, mx, my, mw * .75); g.addColorStop(0, mix(mix(col, '#f8e890', .55), haze, far * .7)); g.addColorStop(.5, mix(mix(col, '#c8c060', .15), haze, far)); g.addColorStop(1, mix(mix(col, '#1a2810', .5), haze, far * .65));
      ctx.beginPath(); shape(ctx); ctx.fillStyle = mix(mix(col, '#9aa83a', .2), haze, far * .85); ctx.fill();
      ctx.save(); ctx.beginPath(); shape(ctx); ctx.clip(); const lg = ctx.createLinearGradient(mx + lit * mw * .55, 0, mx - lit * mw * .45, 0); lg.addColorStop(0, `rgba(255,236,140,${.55 * (1 - far * .6)})`); lg.addColorStop(.6, 'rgba(255,236,140,0)'); ctx.fillStyle = lg; ctx.fillRect(mx - mw, my - mh * 1.2, mw * 2, mh * 2 + 200);
      const dg = ctx.createLinearGradient(0, my - mh * .5, 0, my + 60); dg.addColorStop(0, 'rgba(20,40,10,0)'); dg.addColorStop(1, `rgba(20,40,10,${.45 * (1 - far * .7)})`); ctx.fillStyle = dg; ctx.fillRect(mx - mw, my - mh, mw * 2, mh + 260);
      const sg = ctx.createLinearGradient(mx - lit * mw * .5, 0, mx + lit * mw * .1, 0); sg.addColorStop(0, `rgba(30,50,20,${.35 * (1 - far * .6)})`); sg.addColorStop(1, 'rgba(30,50,20,0)'); ctx.fillStyle = sg; ctx.fillRect(mx - mw, my - mh * 1.2, mw * 2, mh * 2 + 200); ctx.restore(); ctx.strokeStyle = `rgba(60,40,24,${.5 * (1 - far)})`; ctx.lineWidth = 2.5 * (1 - far * .5); ctx.stroke();
      ctx.save(); ctx.beginPath(); shape(ctx); ctx.clip(); ctx.strokeStyle = `rgba(50,60,24,${.18 * (1 - far)})`; ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(mx - mw * .4 + k * mw * .18, my - mh * .7 + k * 10); ctx.quadraticCurveTo(mx - mw * .3 + k * mw * .2, my - mh * .3, mx - mw * .35 + k * mw * .22, my + 10); ctx.stroke(); } ctx.restore();
      for (let c = 0; c < copses; c++) { const u = .2 + R() * .6, cx = mx - mw / 2 + u * mw, cy = my - mh * Math.sin(u * Math.PI) * (.25 + R() * .45) + 14; copse(ctx, cx, cy, (.1 + (1 - far) * .2) * (.7 + R() * .5), t, { haze, far, seed: seed * 50 + c, n: 3 + Math.floor(R() * 5) }); } }
  // a copse / hedgerow: a cluster of small overlapping bushy trees
  function copse(ctx, x, y, s, t, o = {}) { const R = rng(o.seed ?? x), n = o.n ?? 6; const pts = []; for (let i = 0; i < n; i++) pts.push([x + (i - n / 2) * 46 * s + (R() - .5) * 30 * s, y + (R() - .5) * 16 * s, s * (.7 + R() * .6), R() < (o.cypress ?? .08)]);
    pts.sort((A, B) => A[1] - B[1]); for (const [px, py, ps, cy] of pts) tree(ctx, px, py, ps, t, { kind: cy ? 'cypress' : 'oak', haze: o.haze, far: o.far, seed: px * 7 + py, low: true }); }
  // ---------- trees ----------
  function tree(ctx, x, y, s, t, o = {}) { const kind = o.kind || 'oak', far = o.far || 0, haze = o.haze || '#f4d6a6', R = rng(o.seed ?? x), sw = Math.sin(t * .8 + x * .01) * 2 * s;
    const leaf = mix(o.col || (kind === 'cypress' ? '#34522a' : kind === 'umbrella' ? '#4a6e2e' : '#4e7a2c'), haze, far), dark = mix(mix(leaf, '#1a2a10', .4), haze, far * .7), lit = mix(mix(leaf, '#e8f0a0', .45), haze, far * .7), bark = mix('#6a4a30', haze, far), inkA = .9 * (1 - far * .7), lw = Math.max(1.2, 4 * s * (1 - far * .5));
    ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (far < .5) { ctx.fillStyle = 'rgba(40,30,20,.22)'; ctx.beginPath(); ctx.ellipse(10 * s, 2, 90 * s, 12 * s, 0, 0, 7); ctx.fill(); }
    if (kind === 'cypress') { const h = 260 * s, w = 34 * s; const sh = c => { c.moveTo(0, -h); c.quadraticCurveTo(w * 1.3, -h * .55, w * .8, -10); c.quadraticCurveTo(0, 4, -w * .8, -10); c.quadraticCurveTo(-w * 1.3, -h * .55, 0, -h); c.closePath(); };
      ctx.save(); ctx.translate(sw * .5, 0); ctx.beginPath(); sh(ctx); ctx.fillStyle = leaf; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = dark; ctx.fillRect(w * .1, -h, w * 2, h); ctx.strokeStyle = lit; ctx.lineWidth = Math.max(1, 2.2 * s); for (let i = 0; i < 14; i++) { const yy = -h * (.1 + i * .06); ctx.beginPath(); ctx.moveTo(-w * .5, yy + 6 * s); ctx.quadraticCurveTo(-w * .2, yy - 4 * s, 0, yy + 2 * s); ctx.stroke(); } ctx.restore();
      ctx.strokeStyle = `rgba(43,29,22,${inkA})`; ctx.lineWidth = lw; ctx.beginPath(); sh(ctx); ctx.stroke(); ctx.restore(); ctx.restore(); return; }
    if (o.big) { const th2 = 120 * s; ctx.fillStyle = bark; ctx.strokeStyle = `rgba(43,29,22,${inkA})`; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(-34 * s, 0); ctx.quadraticCurveTo(-10 * s, -th2 * .6, -40 * s, -th2 * 1.3); ctx.lineTo(-16 * s, -th2 * 1.3); ctx.quadraticCurveTo(6 * s, -th2, 10 * s, -th2 * 1.4); ctx.lineTo(30 * s, -th2 * 1.36); ctx.quadraticCurveTo(26 * s, -th2 * .6, 40 * s, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(40,24,14,.5)'; ctx.lineWidth = 2 * s; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-20 * s + i * 8 * s, -10); ctx.quadraticCurveTo(-14 * s + i * 7 * s, -th2 * .5, -18 * s + i * 8 * s, -th2 * 1.1); ctx.stroke(); }
      const CL = [[-120, -200, 1], [-40, -250, 1.1], [60, -240, 1.05], [140, -190, .95], [-170, -130, .8], [180, -120, .8], [-60, -170, 1], [40, -160, 1], [0, -300, .9]];
      for (const [cx, cy, cs] of CL) { ctx.save(); ctx.translate(cx * s + sw, cy * s); tree(ctx, 0, 60 * s * cs, s * cs * .95, t, { kind: 'oak', haze, far, seed: (o.seed || 1) * 31 + cx, low: true, noTrunk: true }); ctx.restore(); } ctx.restore(); return; }
    // trunk with two limbs
    const th = (kind === 'umbrella' ? 170 : o.low ? 26 : 60) * s; ctx.fillStyle = bark; ctx.strokeStyle = `rgba(43,29,22,${inkA})`; ctx.lineWidth = lw;
    if (!o.noTrunk) { ctx.beginPath(); ctx.moveTo(-12 * s, 0); ctx.quadraticCurveTo(-6 * s, -th * .5, -10 * s + sw, -th); ctx.lineTo(10 * s + sw, -th); ctx.quadraticCurveTo(8 * s, -th * .5, 14 * s, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
    for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 4 * s + sw, -th * .7); ctx.quadraticCurveTo(d * 30 * s + sw, -th * .95, d * 50 * s + sw, -th * 1.05); ctx.lineWidth = 7 * s; ctx.strokeStyle = bark; ctx.stroke(); } }
    // canopy: blobs inked as one silhouette, then shaded (shadow low-right, light high-left), then leaf flecks
    const blobs = []; const n = kind === 'umbrella' ? 9 : 13, cw = (kind === 'umbrella' ? 150 : 110) * s, ch = (kind === 'umbrella' ? 40 : 78) * s, cy = -th - ch * .55;
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = .55 + R() * .45; blobs.push([Math.cos(a) * cw * .62 * rr + sw, cy + Math.sin(a) * ch * .6 * rr, (kind === 'umbrella' ? 34 : 34) * s * (.8 + R() * .5)]); } blobs.push([sw, cy, ch * .7]);
    ctx.strokeStyle = `rgba(43,29,22,${inkA})`; ctx.lineWidth = lw * 2; for (const [bx, by, br] of blobs) { ctx.beginPath(); ctx.arc(bx, by, br, 0, 7); ctx.stroke(); }
    ctx.save(); ctx.beginPath(); for (const [bx, by, br] of blobs) { ctx.moveTo(bx + br, by); ctx.arc(bx, by, br, 0, 7); } ctx.fillStyle = leaf; ctx.fill(); ctx.clip();
    ctx.fillStyle = dark; for (const [bx, by, br] of blobs) { ctx.beginPath(); ctx.arc(bx + br * .35, by + br * .45, br * .8, 0, 7); ctx.fill(); }
    ctx.fillStyle = leaf; for (const [bx, by, br] of blobs) { ctx.beginPath(); ctx.arc(bx - br * .1, by - br * .1, br * .62, 0, 7); ctx.fill(); }
    ctx.fillStyle = lit; for (const [bx, by, br] of blobs) { if (by > cy + ch * .1) continue; ctx.beginPath(); ctx.ellipse(bx - br * .3, by - br * .45, br * .42, br * .26, -.3, 0, 7); ctx.fill(); }
    if (far < .5) { ctx.fillStyle = mix(lit, '#c8d870', .3); for (let i = 0; i < 18; i++) { const [bx, by, br] = blobs[i % blobs.length]; ctx.beginPath(); ctx.ellipse(bx + (R() - .5) * br, by + (R() - .6) * br, 4 * s, 2.5 * s, R() * 3, 0, 7); ctx.fill(); } ctx.strokeStyle = `rgba(30,40,16,.35)`; ctx.lineWidth = 1.5 * s; for (let i = 0; i < 14; i++) { const [bx, by, br] = blobs[i % blobs.length]; ctx.beginPath(); ctx.arc(bx + (R() - .5) * br * .8, by + (R() - .3) * br * .6, br * .3, .3, 2.2); ctx.stroke(); } }
    ctx.restore(); ctx.restore(); }
  // ---------- meadow ----------
  function meadow(ctx, y0, y1, t, o = {}) { const R = rng(o.seed ?? 5), col = o.col || '#7a9a3a', haze = o.haze || '#f4d6a6';
    const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, mix(mix(col, '#e8e0a0', .2), haze, .12)); g.addColorStop(.4, col); g.addColorStop(1, mix(col, '#2a3a14', .35)); ctx.fillStyle = g; ctx.fillRect(-600, y0, 2500, y1 - y0 + 400);
    // patches of light and shade, then grass strokes thickening toward the camera, then flowers
    for (let i = 0; i < 14; i++) { const px = -200 + R() * 1700, py = y0 + R() * (y1 - y0), k = (py - y0) / (y1 - y0); ctx.fillStyle = i % 2 ? `rgba(255,236,150,${.1 + k * .05})` : `rgba(30,50,10,${.08 + k * .06})`; ctx.beginPath(); ctx.ellipse(px, py, 140 + k * 200, 18 + k * 30, 0, 0, 7); ctx.fill(); }
    ctx.lineCap = 'round'; const n = o.n ?? 520; for (let i = 0; i < n; i++) { const k = Math.pow(R(), .7), x = -100 + R() * 1500, y = y0 + k * (y1 - y0), h = 6 + k * 34, sw = Math.sin(t * 1.6 + x * .02) * 3 * k, c = R();
      ctx.strokeStyle = c < .33 ? mix(col, '#2a3a10', .45) : c < .66 ? mix(col, '#d8e070', .35) : mix(col, '#1a2a08', .2); ctx.lineWidth = 1 + k * 2.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sw * .4, y - h * .6, x + sw + (c - .5) * 6, y - h); ctx.stroke(); }
    if (o.flowers !== false) { const F = ['#f6d040', '#f4f0e0', '#e86a6a', '#b88ae0', '#f8a040']; for (let i = 0; i < (o.flowers ?? 120); i++) { const k = Math.pow(R(), .7), x = -100 + R() * 1500, y = y0 + k * (y1 - y0) - 4; ctx.fillStyle = F[i % 5]; ctx.beginPath(); ctx.arc(x, y, 1.5 + k * 3.5, 0, 7); ctx.fill(); } } }
  // foreground framing: dark grass blades and leaves at the bottom edge (depth, like a lens close to the ground)
  function foreground(ctx, t, o = {}) { const R = rng(o.seed ?? 9), y = o.y ?? 730, col = o.col || '#5a6a24'; ctx.lineCap = 'round';
    for (let i = 0; i < (o.n ?? 160); i++) { const x = -40 + R() * 1360, edge = (x < 320 || x > 960) ? 1 : .45, h = (30 + R() * (o.h ?? 120)) * edge, sw = Math.sin(t * 1.3 + i * .7) * 5 * edge;
      ctx.strokeStyle = mix(col, R() < .5 ? '#1a2008' : '#c8c070', R() * .45); ctx.lineWidth = 1.5 + R() * 2.5; ctx.beginPath(); ctx.moveTo(x, y + 30); ctx.quadraticCurveTo(x + sw * .5 + (R() - .5) * 20, y - h * .5, x + sw + (R() - .5) * 50, y - h); ctx.stroke(); }
    const F = [['#f6c830', '#c88a10'], ['#f8f4e8', '#c8c0a8'], ['#f0a040', '#b86a20']]; for (let i = 0; i < (o.flowers ?? 26); i++) { const x = R() < .5 ? R() * 340 : 940 + R() * 340, yy = y - 10 - R() * 70, f = F[i % 3], r = 5 + R() * 5, sw = Math.sin(t * 1.3 + i) * 3;
      ctx.strokeStyle = '#4a5a20'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 30); ctx.lineTo(x + sw, yy); ctx.stroke(); for (let k = 0; k < 5; k++) { const a = k / 5 * 6.28; ctx.fillStyle = f[0]; ctx.beginPath(); ctx.ellipse(x + sw + Math.cos(a) * r, yy + Math.sin(a) * r, r * .7, r * .45, a, 0, 7); ctx.fill(); } ctx.fillStyle = f[1]; ctx.beginPath(); ctx.arc(x + sw, yy, r * .45, 0, 7); ctx.fill(); }
    if (o.reeds) for (let i = 0; i < 7; i++) { const x = R() < .5 ? R() * 280 : 1000 + R() * 280, h = 150 + R() * 110, sw = Math.sin(t + i) * 4; ctx.strokeStyle = '#5a5a24'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + 30); ctx.quadraticCurveTo(x, y - h * .5, x + sw, y - h); ctx.stroke(); ctx.fillStyle = '#7a4a24'; ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x + sw, y - h + 14, 5, 18, 0, 0, 7); ctx.fill(); ctx.stroke(); } }
  // ---------- water ----------
  function water(ctx, x0, y0, x1, y1, t, o = {}) { const p = PAL[o.pal || 'golden'], sunX = o.sunX ?? 900;
    const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, mix(p.hor, '#8ab4c8', .35)); g.addColorStop(.35, mix(p.mid, '#5a8ab0', .55)); g.addColorStop(1, mix(p.top, '#2a4a6a', .4)); ctx.fillStyle = g; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    const R = rng(o.seed ?? 7); ctx.lineCap = 'round'; for (let i = 0; i < (o.n ?? 70); i++) { const k = R(), y = y0 + 4 + k * (y1 - y0 - 8), x = x0 + ((R() * (x1 - x0) + t * (10 + k * 30)) % (x1 - x0)), w = 14 + k * 50; ctx.strokeStyle = `rgba(255,248,230,${.25 + k * .35})`; ctx.lineWidth = 1 + k * 2.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + w / 2, y - 2 - k * 2, x + w, y); ctx.stroke(); }
    if (p.sun && o.glint !== false) for (let i = 0; i < 22; i++) { const k = i / 22, y = y0 + 6 + k * (y1 - y0 - 10), w = (20 + k * 60) * (.5 + .5 * Math.sin(t * 3 + i * 1.7)); ctx.fillStyle = `rgba(255,236,180,${.75 - k * .4})`; ctx.fillRect(sunX - w / 2 + Math.sin(t * 2 + i) * 6, y, w, 2 + k * 3); }
    ctx.strokeStyle = 'rgba(60,40,24,.55)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); }
  // ---------- light & grade ----------
  function rays(ctx, sx, sy, t, a = .12, n = 7) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { const ang = Math.PI * .5 + (i - n / 2) * .16 + Math.sin(t * .2 + i) * .02, len = 1200, w = .04 + (i % 3) * .02;
      const g = ctx.createLinearGradient(sx, sy, sx + Math.cos(ang) * len, sy + Math.sin(ang) * len); g.addColorStop(0, `rgba(255,236,190,${a})`); g.addColorStop(1, 'rgba(255,236,190,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(ang - w) * len, sy + Math.sin(ang - w) * len); ctx.lineTo(sx + Math.cos(ang + w) * len, sy + Math.sin(ang + w) * len); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  function haze(ctx, y, h, col, a = .35) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, y - h, 0, y + h); g.addColorStop(0, 'rgba(0,0,0,0)'); const c = col.replace('#', ''); const rgb = [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16)).join(','); g.addColorStop(.5, `rgba(${rgb},${a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, y - h, W, h * 2); ctx.restore(); }
  function motes(ctx, t, n = 30, col = '255,236,190') { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { const x = (i * 157 + Math.sin(t * .4 + i) * 30) % W, y = ((i * 97 - t * (8 + i % 5)) % H + H) % H; ctx.fillStyle = `rgba(${col},${.25 + .25 * Math.sin(t * 1.7 + i)})`; ctx.beginPath(); ctx.arc(x, y, 1.4 + (i % 3), 0, 7); ctx.fill(); } ctx.restore(); }
  // cinematic finish: colour grade, letterbox-free vignette, a warm light leak from the sun side
  function finish(ctx, t, pal, o = {}) { const p = PAL[pal] || PAL.golden; P.grade(ctx, p.grade, o.grade ?? .12, 'soft-light'); if (o.leak !== false && p.sun) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; const lx = o.leakX ?? 1180, g = ctx.createRadialGradient(lx, 80, 10, lx, 80, 700); g.addColorStop(0, 'rgba(255,190,110,.22)'); g.addColorStop(1, 'rgba(255,190,110,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    // colour pass: richer saturation and contrast, like the reference paintings
    const cv = ctx.canvas; if (!TMP) { TMP = document.createElement('canvas'); TMP.width = cv.width; TMP.height = cv.height; } const tg = TMP.getContext('2d'); tg.setTransform(1, 0, 0, 1, 0, 0); tg.drawImage(cv, 0, 0);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = `saturate(${o.sat ?? 1.35}) contrast(${o.con ?? 1.1})`; ctx.drawImage(TMP, 0, 0); ctx.restore();
    P.grain(ctx, t, .035); P.vignette(ctx, o.vig ?? .45); }
  let TMP = null;
  G.Cine = { PAL, cam, layer, sky, cloud, hills, mounds, mound, copse, tree, meadow, foreground, water, rays, haze, motes, finish, rng };
})(window);
