/* Rome series: "storybook myth" look (after the user's reference — My Favorite Greek Myths).
 * Painted light + warm brown ink: cel-shaded shapes with one shadow tone and one light tone, golden-hour skies with
 * soft cloud bands, atmospheric distance, dark foreground framing (grass, leaves), light shafts, paper grain.
 * Characters (G.Paint.chibi): big pure-white round heads, tiny line eyes with lids, small mouths, big dark hair,
 * small bodies in tunics/togas — they ACT (blink, sigh, glance, tilt) more than they move.
 * Editing: few shots, long holds with a slow push or drift, cross-dissolves (dissolve()), reaction close-ups. */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, lerp, clamp, ease } = T;
  const INK = '#2b1d16', LW = 5;
  const mix = (a, b, k) => { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(k)).toString(16).padStart(2, '0')).join(''); };
  const path = (ctx, fn) => { ctx.beginPath(); fn(ctx); };
  // fill + brown ink outline
  function ink(ctx, fill, fn, lw = LW, stroke = INK) { path(ctx, fn); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke(); } }
  // cel shading: base, a shadow crescent away from the light (dx,dy), an optional light rim toward it, then the ink line
  function cel(ctx, fn, base, o = {}) { const sh = o.shade || mix(base, '#3a2030', .38), li = o.light, dx = o.dx ?? 10, dy = o.dy ?? 8;
    path(ctx, fn); ctx.fillStyle = base; ctx.fill();
    ctx.save(); path(ctx, fn); ctx.clip();
    // shadow = the shape minus itself shifted toward the light
    ctx.fillStyle = sh; ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 8000); ctx.save(); ctx.translate(-dx, -dy); fn(ctx); ctx.restore(); ctx.fill('evenodd');
    if (li) { ctx.fillStyle = li; ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 8000); ctx.save(); ctx.translate(dx * .7, dy * .7); fn(ctx); ctx.restore(); ctx.globalAlpha = .9; ctx.fill('evenodd'); }
    ctx.restore();
    if (o.lw !== 0) { path(ctx, fn); ctx.lineJoin = 'round'; ctx.lineWidth = o.lw || LW; ctx.strokeStyle = INK; ctx.stroke(); } }
  const blob = (pts) => c => { c.moveTo((pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2); for (let i = 1; i <= pts.length; i++) { const p = pts[i % pts.length], q = pts[(i + 1) % pts.length]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } c.closePath(); };
  // lumpy edge (bushes, hair, clouds): n bumps around an ellipse
  const lumps = (cx, cy, rx, ry, n, amp = .18, seed = 0) => c => { for (let i = 0; i <= n; i++) { const a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, am = (a0 + a1) / 2, k = 1 + amp * (.7 + .3 * Math.sin(i * 2.3 + seed));
      const x0 = cx + Math.cos(a0) * rx, y0 = cy + Math.sin(a0) * ry; if (i === 0) c.moveTo(x0, y0); if (i < n) c.quadraticCurveTo(cx + Math.cos(am) * rx * k * 1.12, cy + Math.sin(am) * ry * k * 1.12, cx + Math.cos(a1) * rx, cy + Math.sin(a1) * ry); } c.closePath(); };

  // ---------- light & atmosphere ----------
  const SKIES = {
    dawn: [[0, '#5f93c4'], [.35, '#a9c3d4'], [.62, '#f3d79c'], [.85, '#f8c978'], [1, '#fbe2a8']],
    gold: [[0, '#6aa0cc'], [.38, '#b9d0d8'], [.64, '#f6dc98'], [.86, '#f9cd78'], [1, '#fbe6b0']],
    noon: [[0, '#5fa2d8'], [.55, '#a9d2ec'], [1, '#e8f1ea']],
    dusk: [[0, '#4a5a8a'], [.45, '#c88a8a'], [.75, '#f0a868'], [1, '#f8d090']],
    night: [[0, '#0e1a33'], [.6, '#1f3352'], [1, '#2c4560']],
    storm: [[0, '#4c5868'], [.6, '#7a8494'], [1, '#9aa2ac']],
  };
  function sky(ctx, kind, t, o = {}) { const y1 = o.y1 ?? 520; const g = ctx.createLinearGradient(0, o.y0 ?? -200, 0, y1); for (const [k, c] of SKIES[kind]) g.addColorStop(k, c); ctx.fillStyle = g; ctx.fillRect(-800, -600, 2880, 2000);
    if (o.sun) { const [sx, sy] = o.sun; const r = ctx.createRadialGradient(sx, sy, 0, sx, sy, 520); r.addColorStop(0, 'rgba(255,248,215,.95)'); r.addColorStop(.25, 'rgba(255,236,170,.45)'); r.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = r; ctx.fillRect(-800, -600, 2880, 2000); }
    if (kind === 'night') for (let i = 0; i < 70; i++) { const x = (i * 197) % 1500 - 100, y = (i * 83) % 380 - 40, a = .4 + .4 * Math.sin(t * 1.5 + i); ctx.fillStyle = `rgba(230,240,255,${a})`; ctx.fillRect(x, y, 2, 2); }
    // soft cloud bands, drifting
    ctx.save(); ctx.filter = 'blur(6px)'; const cc = o.cloud || (kind === 'night' ? 'rgba(60,80,120,.55)' : kind === 'storm' ? 'rgba(70,76,90,.8)' : 'rgba(255,250,236,.7)');
    for (let i = 0; i < (o.clouds ?? 5); i++) { const x = ((i * 371 + t * (4 + i)) % 1900) - 300, y = 60 + (i % 3) * 70 + (o.cy || 0), w = 260 + (i % 4) * 90; ctx.fillStyle = cc; ctx.beginPath(); ctx.ellipse(x, y, w, 22 + (i % 2) * 10, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + w * .3, y - 16, w * .45, 18, 0, 0, 7); ctx.fill(); }
    ctx.restore();
    // billowy cumulus banks near the horizon: lit tops, shaded bellies (soft edged)
    if (kind !== 'night' && o.cumulus !== false) { ctx.save(); ctx.filter = 'blur(1.2px)'; const base = kind === 'storm' ? '#8a92a0' : kind === 'dusk' ? '#f0c0a8' : '#fbf3e2', shd = kind === 'storm' ? '#5a6270' : kind === 'dusk' ? '#b08098' : '#d9c8b8';
      for (let i = 0; i < 4; i++) { const x = ((i * 430 + t * 3) % 1900) - 300, y = (o.cy || 0) + 150 + (i % 2) * 60, r = 70 + (i % 3) * 26; ctx.globalAlpha = .85;
        cel(ctx, lumps(x, y, r * 1.9, r * .62, 9, .35, i), base, { shade: shd, light: '#ffffff', dx: -10, dy: -10, lw: 0 }); }
      ctx.restore(); } }
  // a far silhouette band (hills / distant city) faded into the sky colour
  function far(ctx, y, col, haze, fn, a = .55) { ctx.save(); ctx.fillStyle = mix(col, haze, a); ctx.beginPath(); fn(ctx, y); ctx.fill(); ctx.restore(); }
  function treeLine(ctx, y, haze, a = .45, seed = 0, x0 = -100, x1 = 1400) { ctx.save(); ctx.globalAlpha = 1; ctx.fillStyle = mix('#4a6a3a', haze, a); for (let x = x0; x < x1; x += 34 + ((x * 7 + seed) % 23)) { const h = 26 + ((x * 13 + seed) % 22), yy = y - 6 * Math.sin(x * .007 + seed); if ((x + seed) % 5 === 0) { ctx.beginPath(); ctx.ellipse(x, yy - h * .9, 7, h * .9, 0, 0, 7); ctx.fill(); } else { ctx.beginPath(); ctx.ellipse(x, yy - h * .45, h * .6, h * .45, 0, 0, 7); ctx.fill(); } } ctx.restore(); }
  function hills(ctx, y, col, haze, a = .5, seed = 0) { const hy = x => y - 40 * Math.max(0, Math.sin(x * .0055 + seed)) - 18 * Math.sin(x * .013 + seed * 2) - 6;
    far(ctx, y, col, haze, (c, yy) => { c.moveTo(-800, yy + 260); c.lineTo(-800, hy(-800)); for (let x = -800; x <= 2100; x += 40) c.lineTo(x, hy(x)); c.lineTo(2100, yy + 260); c.closePath(); }, a);
    // meadow bands and flora, fading with distance
    let sd = Math.abs(Math.round(seed * 97 + y)) % 2147483646 + 1; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    ctx.save(); ctx.globalAlpha = 1 - a * .3;
    for (let i = 0; i < 9; i++) { const x = -200 + r() * 1700, w = 80 + r() * 160; ctx.fillStyle = mix(r() < .5 ? '#a8b860' : '#7a9a48', haze, a * .8); ctx.beginPath(); ctx.ellipse(x, hy(x) + 26 + r() * 30, w, 10 + r() * 8, 0, 0, 7); ctx.fill(); }
    for (let i = 0; i < 70; i++) { const x = -200 + r() * 1700, top = hy(x), yy = top + 6 + Math.pow(r(), 1.6) * 60, s2 = .9 + r() * .8;
      if (r() < .22) { ctx.fillStyle = mix('#3f6a34', haze, a * .45); ctx.beginPath(); ctx.ellipse(x, yy - 12 * s2, 4 * s2, 13 * s2, 0, 0, 7); ctx.fill(); }
      else { const g = mix(r() < .5 ? '#5f8a3a' : '#7a9a44', haze, a * .45); ctx.fillStyle = g; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x + (k - 1) * 6 * s2, yy - 6 * s2 - (k === 1 ? 4 * s2 : 0), 7 * s2, 0, 7); ctx.fill(); } ctx.fillStyle = mix('#c8d888', haze, a * .7); ctx.beginPath(); ctx.arc(x - 2 * s2, yy - 10 * s2, 3 * s2, 0, 7); ctx.fill(); } }
    for (let i = 0; i < 40; i++) { const x = -200 + r() * 1700, yy = hy(x) + 10 + r() * 50; ctx.fillStyle = mix(['#f0e080', '#f8f4f0', '#e8a0b0', '#c8a0e0'][i % 4], haze, a * .7); ctx.fillRect(x, yy, 2.5, 2.5); }
    ctx.restore(); }
  function slopeFlora(ctx, fn, pts, t) { ctx.save(); ctx.beginPath(); fn(ctx); ctx.clip();
    for (const [x, y, k, sz] of pts) { if (k === 'c') cypress(ctx, x, y, sz, t); else if (k === 't') tree(ctx, x, y, sz, t, { col: '#86a046' }); else if (k === 'b') bush(ctx, x, y, 22 * sz, { col: '#7f9a46', inner: 2 }); else for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#f0e070', '#fbf6f0', '#e890a8', '#b890e0'][i % 4]; ctx.beginPath(); ctx.arc(x + (i % 5) * 9 - 18, y + Math.floor(i / 5) * 6, 2.6, 0, 7); ctx.fill(); } }
    ctx.restore(); }
  // a loose flock of birds crossing the sky
  function birds(ctx, t, n = 5, y0 = 160, x0 = 0, sp = 30) { ctx.save(); ctx.strokeStyle = '#4a3a34'; ctx.lineCap = 'round'; ctx.lineWidth = 2.5; for (let i = 0; i < n; i++) { const x = ((x0 + i * 46 + t * sp) % 1600) - 160, y = y0 + (i % 3) * 18 + Math.sin(t * .9 + i) * 8, f = Math.sin(t * 9 + i * 1.7) * 6; ctx.beginPath(); ctx.moveTo(x - 9, y - f); ctx.quadraticCurveTo(x - 4, y - 4, x, y); ctx.quadraticCurveTo(x + 4, y - 4, x + 9, y - f); ctx.stroke(); } ctx.restore(); }
  function shafts(ctx, x, y, a = .18, n = 4, ang = .5) { ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { const g = ctx.createLinearGradient(x, y, x - 600, y + 900); g.addColorStop(0, `rgba(255,236,180,${a})`); g.addColorStop(1, 'rgba(255,236,180,0)'); ctx.fillStyle = g; ctx.beginPath(); const o = i * 150 - 200; ctx.moveTo(x + o, y); ctx.lineTo(x + o + 60, y); ctx.lineTo(x + o - 700 * ang + 160, y + 900); ctx.lineTo(x + o - 700 * ang, y + 900); ctx.fill(); } ctx.restore(); }
  // warm or cool grade over the whole frame (keeps darkness/light consistent across the frame)
  function grade(ctx, col, a, mode = 'multiply') { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = mode; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  let GRAIN = null;
  function grain(ctx, t, a = .06) { if (!GRAIN) { GRAIN = document.createElement('canvas'); GRAIN.width = 256; GRAIN.height = 256; const g = GRAIN.getContext('2d'), d = g.createImageData(256, 256); let s = 7; for (let i = 0; i < d.data.length; i += 4) { s = (s * 16807) % 2147483647; const v = 110 + (s % 90); d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } g.putImageData(d, 0, 0); }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay'; const ox = Math.floor(t * 30) % 4 * 61, oy = Math.floor(t * 30) % 3 * 47; ctx.translate(-ox, -oy); ctx.fillStyle = ctx.createPattern(GRAIN, 'repeat'); ctx.fillRect(0, 0, W + 256, H + 256); ctx.restore(); }
  function vignette(ctx, a = .35) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createRadialGradient(640, 380, 300, 640, 380, 860); g.addColorStop(0, 'rgba(30,15,10,0)'); g.addColorStop(1, `rgba(30,15,10,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }

  // ---------- nature ----------
  // foliage: overlapping lumps, each cel-shaded, with leaf flecks and light dots (painted density)
  function bush(ctx, x, y, r, o = {}) { const base = o.col || '#8aa04a', seed = o.seed || x, sh = mix(base, '#2a3a20', .45), li = mix(base, '#f6f0a0', .4);
    cel(ctx, lumps(x, y, r, r * .78, o.n || 10, .24, seed), base, { shade: sh, light: li, dx: 14, dy: 12 });
    for (let k = 0; k < 4; k++) { const a = seed * .7 + k * 1.6, rx = x + Math.cos(a) * r * .4, ry = y - r * .15 + Math.sin(a) * r * .3; cel(ctx, lumps(rx, ry, r * .42, r * .34, 7, .3, seed + k), mix(base, '#c8d070', .12 + k * .05), { shade: sh, light: li, dx: 8, dy: 7, lw: 2.5 }); }
    ctx.save(); ctx.beginPath(); lumps(x, y, r, r * .78, o.n || 10, .24, seed)(ctx); ctx.clip(); ctx.lineCap = 'round';
    for (let k = 0; k < Math.round(r * .5); k++) { const a = (k * 2.39 + seed) % 6.28, d = ((k * 37) % 100) / 100 * r * .9, px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * .75;
      ctx.strokeStyle = py < y - r * .2 ? 'rgba(255,250,200,.45)' : 'rgba(30,50,20,.35)'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 4, py - 5, px + 8, py - 2); ctx.stroke(); }
    ctx.restore(); }
  function tree(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sw = Math.sin(t * .8 + x) * 3, col = o.col || '#93a84e';
    ctx.fillStyle = 'rgba(40,30,20,.18)'; ctx.beginPath(); ctx.ellipse(10, 2, 110, 18, 0, 0, 7); ctx.fill();
    cel(ctx, c => { c.moveTo(-16, 0); c.quadraticCurveTo(-10, -80, -40, -160); c.lineTo(-24, -168); c.quadraticCurveTo(-4, -120, 2, -150); c.quadraticCurveTo(12, -110, 40, -176); c.lineTo(54, -168); c.quadraticCurveTo(18, -90, 18, 0); c.closePath(); }, '#8a5e3c', { shade: '#5a3a24', light: '#b88a5a', dx: 6, dy: 0, lw: 4.5 });
    for (const [bx, by, r, k] of [[-80, -190, 80, 0], [70, -200, 86, 1], [-10, -270, 104, 2], [-60, -260, 70, 3], [60, -280, 70, 4], [0, -190, 74, 5]]) bush(ctx, bx + sw * (k % 2 ? 1 : -.5), by, r, { col: mix(col, k % 2 ? '#7a9a3a' : '#b0c060', .2), seed: x + k * 5 });
    ctx.restore(); }
  // Roman umbrella pine and Italian cypress
  function pine(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sw = Math.sin(t * .6 + x) * 2;
    cel(ctx, c => { c.moveTo(-8, 0); c.quadraticCurveTo(-4, -120, -30, -230); c.lineTo(-18, -236); c.quadraticCurveTo(6, -150, 10, -200); c.lineTo(22, -196); c.quadraticCurveTo(10, -100, 10, 0); c.closePath(); }, '#7a4e34', { shade: '#4a2e1c', dx: 5, dy: 0, lw: 4 });
    cel(ctx, lumps(sw - 10, -250, 140, 46, 13, .25, x), '#5f7f3a', { shade: '#3a5428', light: '#9ab45a', dx: 10, dy: 14 }); cel(ctx, lumps(sw + 30, -276, 90, 30, 9, .3, x + 3), '#6f8f42', { shade: '#3a5428', light: '#a8c060', dx: 8, dy: 10, lw: 3 }); ctx.restore(); }
  function cypress(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sw = Math.sin(t * .9 + x) * 3;
    cel(ctx, c => { c.moveTo(-26, 0); c.quadraticCurveTo(-34, -110, sw * .3 - 10, -210); c.quadraticCurveTo(sw, -250, sw + 6, -262); c.quadraticCurveTo(sw + 12, -240, sw + 18, -210); c.quadraticCurveTo(38, -110, 26, 0); c.closePath(); }, '#3f6a34', { shade: '#264a24', light: '#6a9a4a', dx: 8, dy: 4 });
    ctx.save(); ctx.strokeStyle = 'rgba(20,40,20,.45)'; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const yy = -20 - i * 24; ctx.beginPath(); ctx.moveTo(-18 + i, yy); ctx.quadraticCurveTo(0, yy - 8, 16 - i, yy); ctx.stroke(); } ctx.restore(); ctx.restore(); }
  // a field of short painted grass strokes over a ground band
  function grassField(ctx, t, x0, x1, y0, y1, o = {}) { const n = o.n || 260; ctx.save(); ctx.lineCap = 'round'; let sd = Math.abs(Math.round(o.seed || 3)) % 2147483646 + 1; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < n; i++) { const x = x0 + r() * (x1 - x0), y = y0 + Math.pow(r(), .8) * (y1 - y0), k = (y - y0) / (y1 - y0), h = 4 + k * 16, sw = Math.sin(t * 1.5 + i) * k * 2;
      ctx.strokeStyle = r() < .5 ? (o.dark || 'rgba(70,90,40,.55)') : (o.light || 'rgba(190,200,110,.5)'); ctx.lineWidth = 1 + k * 1.8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + sw + (r() - .5) * 4, y - h); ctx.stroke(); } ctx.restore(); }
  // weathering on stone: stains running down, cracks, moss at the foot
  function weather(ctx, x, y, w, h, seed = 1) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); let sd = Math.abs(Math.round(seed)) % 2147483646 + 1; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < Math.max(2, w / 40); i++) { const sx = x + r() * w, g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, 'rgba(90,70,50,.18)'); g.addColorStop(1, 'rgba(90,70,50,0)'); ctx.fillStyle = g; ctx.fillRect(sx, y + r() * h * .3, 4 + r() * 10, h * (.3 + r() * .6)); }
    ctx.strokeStyle = 'rgba(60,40,30,.5)'; ctx.lineWidth = 1.8; for (let i = 0; i < Math.max(1, w / 60); i++) { let cx = x + r() * w, cy = y + r() * h * .6; ctx.beginPath(); ctx.moveTo(cx, cy); for (let k = 0; k < 4; k++) { cx += (r() - .5) * 18; cy += 6 + r() * 12; ctx.lineTo(cx, cy); } ctx.stroke(); }
    ctx.fillStyle = 'rgba(110,140,60,.5)'; for (let i = 0; i < w / 14; i++) { ctx.beginPath(); ctx.ellipse(x + r() * w, y + h - r() * 8, 6 + r() * 8, 3 + r() * 3, 0, 0, 7); ctx.fill(); } ctx.restore(); }
  // foreground grass blades (dark, framing the bottom edge); dir = which side they lean
  function grassFG(ctx, t, x0, x1, y, h = 160, col = '#4f6a2a', o = {}) { const n = Math.round((x1 - x0) / 26); ctx.save(); if (o.blur) ctx.filter = `blur(${o.blur}px)`;
    for (let i = 0; i < n; i++) { const x = x0 + i * 26 + (i * 13) % 11, hh = h * (.55 + ((i * 37) % 10) / 22), sw = Math.sin(t * 1.4 + i * .7) * 8, lean = ((i * 29) % 9 - 4) * 6;
      ink(ctx, i % 3 ? col : mix(col, '#203010', .3), c => { c.moveTo(x - 9, y + 20); c.quadraticCurveTo(x + lean * .4, y - hh * .6, x + lean + sw, y - hh); c.quadraticCurveTo(x + lean * .3 + 4, y - hh * .5, x + 9, y + 20); c.closePath(); }, 3); }
    ctx.restore(); }
  function weeds(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 7; i++) { const a = -1.2 + i * .4, sw = Math.sin(t * 2 + i) * .05; ctx.save(); ctx.rotate(a * .5 + sw); ink(ctx, i % 2 ? '#7a9a3a' : '#6a8a30', c => { c.moveTo(-4, 0); c.quadraticCurveTo(-2, -30, 0, -60 - (i % 3) * 14); c.quadraticCurveTo(3, -30, 4, 0); c.closePath(); }, 2.5); ctx.restore(); } ctx.restore(); }

  // ---------- ruins & architecture ----------
  const MARBLE = '#e9e1d0', MARBLE_SH = '#b8a993';
  function column(ctx, x, y, w, h, o = {}) { const col = o.col || MARBLE, sh = mix(col, '#5a4030', .35), top = y - h;
    ink(ctx, col, c => c.rect(x - w / 2, top, w, h)); ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, top, w, h); ctx.clip(); ctx.fillStyle = sh; ctx.fillRect(x + w * .18, top, w, h); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - w * .38, top, w * .12, h);
      ctx.strokeStyle = 'rgba(80,60,40,.45)'; ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { const fx = x - w / 2 + i * w / 5; ctx.beginPath(); ctx.moveTo(fx, top); ctx.lineTo(fx, y); ctx.stroke(); } ctx.restore(); ink(ctx, null, c => c.rect(x - w / 2, top, w, h));
    if (o.broken) ink(ctx, col, c => { c.moveTo(x - w / 2 - 2, top + 2); c.lineTo(x - w * .2, top - 22); c.lineTo(x, top - 6); c.lineTo(x + w * .25, top - 30); c.lineTo(x + w / 2 + 2, top + 2); c.closePath(); });
    else { ink(ctx, col, c => c.rect(x - w * .7, top - 16, w * 1.4, 18)); ink(ctx, col, c => c.rect(x - w * .62, top - 30, w * 1.24, 14)); }
    if (o.base !== false) ink(ctx, col, c => c.rect(x - w * .66, y - 14, w * 1.32, 16));
    weather(ctx, x - w / 2, top, w, h, Math.round(x * 7 + h)); }
  function arch(ctx, x, y, w, h, o = {}) { const col = o.col || '#d8c8a8', sh = mix(col, '#4a3020', .4), r = w * .32;
    ink(ctx, col, c => { c.moveTo(x - w / 2, y); c.lineTo(x - w / 2, y - h); c.lineTo(x + w / 2, y - h); c.lineTo(x + w / 2, y); c.lineTo(x + r, y); c.lineTo(x + r, y - h * .55); c.arc(x, y - h * .55, r, 0, Math.PI, true); c.lineTo(x - r, y); c.closePath(); });
    ctx.save(); ctx.fillStyle = sh; ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + r, y - h * .55); ctx.arc(x, y - h * .55, r, 0, Math.PI, true); ctx.lineTo(x - r, y); ctx.lineTo(x - r + 26, y); ctx.lineTo(x - r + 26, y - h * .55); ctx.arc(x, y - h * .55, r - 26, Math.PI, 0); ctx.lineTo(x + r - 26, y); ctx.closePath(); ctx.globalAlpha = .55; ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(80,60,40,.35)'; ctx.lineWidth = 2; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2, y - h + i * h / 6); ctx.lineTo(x - r - 4, y - h + i * h / 6); ctx.moveTo(x + r + 4, y - h + i * h / 6); ctx.lineTo(x + w / 2, y - h + i * h / 6); ctx.stroke(); } ctx.restore();
    for (let i = 0; i < 7; i++) { const a = Math.PI + i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, y - h * .55 + Math.sin(a) * r); ctx.lineTo(x + Math.cos(a) * (r + 26), y - h * .55 + Math.sin(a) * (r + 26)); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); } }
  function archW(ctx, x, y, w, h, o = {}) { sideFace(ctx, x - w / 2, y - h, y, w * .05, mix(o.col || '#d8c8a8', '#3a2418', .25)); arch(ctx, x, y, w, h, o); weather(ctx, x - w / 2, y - h, w, h, Math.round(x + h)); }
  function temple(ctx, x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const col = o.col || MARBLE, roof = o.roof || '#c9a24a', n = o.n || 6;
    ink(ctx, mix(col, '#7a6040', .15), c => c.rect(-260, -40, 520, 40)); ink(ctx, col, c => c.rect(-240, -60, 480, 22));
    for (let i = 0; i < n; i++) column(ctx, -200 + i * 400 / (n - 1), -60, 34, 230, { col });
    ink(ctx, col, c => c.rect(-250, -330, 500, 44)); cel(ctx, c => { c.moveTo(-270, -330); c.lineTo(0, -420); c.lineTo(270, -330); c.closePath(); }, roof, { light: mix(roof, '#fff6c0', .5), dx: -8, dy: 10 });
    ink(ctx, col, c => { c.moveTo(-210, -340); c.lineTo(0, -404); c.lineTo(210, -340); c.closePath(); }, 3);
    ctx.restore(); }

  // ---------- characters ----------
  const SKIN = '#fbf8f3', SKIN_SH = '#ddd2c8';
  // expressions: eyes 'open' | 'half' | 'closed' | 'happy' | 'wide' | 'side' ; mouth 'flat' | 'frown' | 'smile' | 'o' | 'grin'
  function face(ctx, o, blink) { const e = blink ? 'closed' : (o.eyes || 'open'), m = o.mouth || 'flat', ex = 26, ey = -4 + (o.look ? 0 : 0), lk = o.look || 0;
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.fillStyle = INK;
    for (const d of [-1, 1]) { const x = d * ex + lk * 6;
      if (e === 'open') { ctx.beginPath(); ctx.ellipse(x, ey, 4.5, 7.5, 0, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 9, ey - 12); ctx.quadraticCurveTo(x, ey - 16, x + 9, ey - 12); ctx.stroke(); }
      if (e === 'half') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 11, ey - 1); ctx.quadraticCurveTo(x, ey - 5, x + 11, ey - 1); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + lk * 2, ey + 3, 4, 3.5, 0, 0, Math.PI); ctx.fill(); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + d * 11, ey - 1); ctx.lineTo(x + d * 15, ey - 4); ctx.stroke(); }
      if (e === 'closed') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 10, ey); ctx.quadraticCurveTo(x, ey + 5, x + 10, ey); ctx.stroke(); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + d * 10, ey); ctx.lineTo(x + d * 14, ey - 3); ctx.stroke(); }
      if (e === 'happy') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 10, ey + 3); ctx.quadraticCurveTo(x, ey - 8, x + 10, ey + 3); ctx.stroke(); }
      if (e === 'wide') { ctx.fillStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, ey, 10, 12, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + lk * 3, ey + 1, 3, 0, 7); ctx.fill(); }
      if (e === 'side') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 10, ey - 2); ctx.lineTo(x + 10, ey - 2); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 6 * (lk || 1), ey + 2, 4, 0, Math.PI); ctx.fill(); }
      if (o.brow) { ctx.lineWidth = 3.5; ctx.beginPath(); const b = o.brow; ctx.moveTo(x - 10, ey - 16 + (b === 'sad' ? d * -4 : b === 'angry' ? d * 4 : 0)); ctx.lineTo(x + 10, ey - 16 + (b === 'sad' ? d * 4 : b === 'angry' ? d * -4 : 0)); ctx.stroke(); } }
    const my = 30, mx = lk * 5; ctx.lineWidth = 3.5;
    if (m === 'flat') { ctx.beginPath(); ctx.moveTo(mx - 9, my); ctx.lineTo(mx + 9, my); ctx.stroke(); }
    if (m === 'frown') { ctx.beginPath(); ctx.moveTo(mx - 10, my + 3); ctx.quadraticCurveTo(mx, my - 5, mx + 10, my + 3); ctx.stroke(); }
    if (m === 'smile') { ctx.beginPath(); ctx.moveTo(mx - 10, my - 2); ctx.quadraticCurveTo(mx, my + 7, mx + 10, my - 2); ctx.stroke(); }
    if (m === 'o') { ctx.beginPath(); ctx.ellipse(mx, my + 2, 5, 7, 0, 0, 7); ctx.fill(); }
    if (m === 'grin') { ctx.fillStyle = '#5a2a2a'; ctx.beginPath(); ctx.moveTo(mx - 13, my - 3); ctx.quadraticCurveTo(mx, my + 14, mx + 13, my - 3); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    if (o.blush) { ctx.fillStyle = 'rgba(240,120,130,.45)'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 38 + mx, 16, 12, 6, 0, 0, 7); ctx.fill(); } }
    ctx.restore(); }
  // hair: 'curly' 'short' 'bald' 'long' 'bun' ; beard: true
  function hairBack(ctx, o, r) { const col = o.hair || '#3a2a20'; if (o.hairStyle === 'long' || o.hairStyle === 'curly') cel(ctx, lumps(0, 10, r * 1.18, r * 1.12, 11, .14, 2), col, { shade: mix(col, '#000000', .35), light: mix(col, '#a08060', .35), dx: 8, dy: 6, lw: 4.5 }); }
  function hairFront(ctx, o, r) { const col = o.hair || '#3a2a20', st = o.hairStyle || 'short', li = mix(col, '#b09070', .4);
    if (st === 'bald') return;
    const cap = c => { c.moveTo(-r * 1.02, -r * .05); c.bezierCurveTo(-r * 1.1, -r * 1.25, r * 1.1, -r * 1.25, r * 1.02, -r * .05); c.quadraticCurveTo(r * .55, -r * .62, r * .1, -r * .45); c.quadraticCurveTo(-r * .4, -r * .7, -r * 1.02, -r * .05); c.closePath(); };
    if (st === 'curly' || st === 'short' || st === 'long') { cel(ctx, cap, col, { shade: mix(col, '#000000', .3), light: li, dx: 6, dy: 8, lw: 4.5 });
      if (st === 'curly') { ctx.save(); ctx.strokeStyle = li; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const a = Math.PI * (1.15 + i * .14); ctx.beginPath(); ctx.arc(Math.cos(a) * r * .72, Math.sin(a) * r * .72, r * .17, a - .8, a + 1.2); ctx.stroke(); } ctx.restore(); } }
    if (st === 'bun') { cel(ctx, cap, col, { shade: mix(col, '#000000', .3), light: li, lw: 4.5 }); cel(ctx, c => c.arc(0, -r * 1.12, r * .34, 0, 7), col, { shade: mix(col, '#000000', .3), lw: 4.5 }); }
    if (o.wreath) { ctx.save(); for (let i = 0; i < 9; i++) { const a = Math.PI * (1.08 + i * .1); ink(ctx, '#6f9a3a', c => c.ellipse(Math.cos(a) * r * .98, Math.sin(a) * r * .98, 10, 5, a + 1.3, 0, 7), 2.5); } ctx.restore(); }
    if (o.band) ink(ctx, o.band, c => { c.moveTo(-r * .98, -r * .3); c.quadraticCurveTo(0, -r * .62, r * .98, -r * .3); c.lineTo(r * .96, -r * .18); c.quadraticCurveTo(0, -r * .5, -r * .96, -r * .18); c.closePath(); }, 3.5);
    if (o.hood) cel(ctx, c => { c.moveTo(-r * 1.15, r * .4); c.bezierCurveTo(-r * 1.3, -r * 1.5, r * 1.3, -r * 1.5, r * 1.15, r * .4); c.quadraticCurveTo(r * .9, -r * .7, 0, -r * .75); c.quadraticCurveTo(-r * .9, -r * .7, -r * 1.15, r * .4); c.closePath(); }, o.hood, { dx: 8, dy: 6 });
    if (o.helmet) { cel(ctx, c => { c.moveTo(-r * 1.04, -r * .12); c.bezierCurveTo(-r * 1.1, -r * 1.3, r * 1.1, -r * 1.3, r * 1.04, -r * .12); c.closePath(); }, o.helmet, { light: '#f0e0b0', dx: 8, dy: 8 }); if (o.crest) cel(ctx, c => { c.moveTo(-r * .8, -r * .9); c.quadraticCurveTo(0, -r * 1.8, r * .9, -r * .95); c.quadraticCurveTo(0, -r * 1.25, -r * .8, -r * .9); c.closePath(); }, o.crest, { dx: 4, dy: 6 }); }
  }
  function beard(ctx, o, r) { if (!o.beard) return; const col = o.hair || '#3a2a20'; cel(ctx, c => { c.moveTo(-r * .92, -r * .05); c.quadraticCurveTo(-r * .9, r * 1.0, 0, r * 1.18); c.quadraticCurveTo(r * .9, r * 1.0, r * .92, -r * .05); c.quadraticCurveTo(r * .6, r * .55, 0, r * .52); c.quadraticCurveTo(-r * .6, r * .55, -r * .92, -r * .05); c.closePath(); }, col, { shade: mix(col, '#000', .3), light: mix(col, '#a08060', .35), dx: 6, dy: 6, lw: 4.5 }); }
  /* chibi(ctx, x, y, s, t, o): feet at (x,y). o: { robe, robe2, trim, hair, hairStyle, beard, wreath, band, hood, helmet, crest,
     eyes, mouth, brow, blush, look, tilt, arms: 'down'|'crossed'|'hips'|'wave'|'point'|'up'|'hold', walk, dir (1|-1 for walking side-on), prop } */
  function chibi(ctx, x, y, s, t, o = {}) { const ph = (o.seed || x) * .37, br = Math.sin(t * 2 + ph) * 1.5, blink = !o.noBlink && ((t + ph) % 3.7) < .12;
    const walk = o.walk ? Math.sin(t * 7 + ph) : 0, bob = o.walk ? -Math.abs(Math.cos(t * 7 + ph)) * 6 : 0, dir = o.dir || 0;
    const robe = o.robe || '#efe7d6', robeSh = o.robeSh || mix(robe, '#6a4a40', .35), r = 74;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, bob);
    ctx.fillStyle = 'rgba(40,20,10,.22)'; ctx.beginPath(); ctx.ellipse(0, 4, 70, 14, 0, 0, 7); ctx.fill();
    // legs
    for (const d of [-1, 1]) { const lift = Math.max(0, d * walk) * 10, sw = dir ? d * walk * 18 : 0; cel(ctx, c => { c.moveTo(d * 18 - 12 + sw, -70); c.lineTo(d * 18 - 13 + sw * 1.4, -6 - lift); c.quadraticCurveTo(d * 18 + sw * 1.4 + (dir || d) * 18, -2 - lift, d * 18 + 14 + sw * 1.4, -8 - lift); c.lineTo(d * 18 + 12 + sw, -70); c.closePath(); }, o.legs || SKIN, { shade: SKIN_SH, dx: 4, dy: 0, lw: 4.5 }); }
    // body / robe
    const bw = 62, by = -76; const body = c => { c.moveTo(-bw * .62, by - 118); c.quadraticCurveTo(-bw * 1.02, by - 40, -bw * 1.04, by + 6); c.quadraticCurveTo(0, by + 18, bw * 1.04, by + 6); c.quadraticCurveTo(bw * 1.02, by - 40, bw * .62, by - 118); c.quadraticCurveTo(0, by - 132, -bw * .62, by - 118); c.closePath(); };
    const arm = (d, kind) => { const sx = d * bw * .66, sy = by - 104; let pts;
      if (kind === 'crossed') pts = [[sx, sy], [d * 30, by - 64], [-d * 26, by - 72]];
      else if (kind === 'hips') pts = [[sx, sy], [d * bw * 1.22, by - 62], [d * bw * .92, by - 40]];
      else if (kind === 'wave' && d > 0) pts = [[sx, sy], [bw * 1.2, sy - 30], [bw * 1.1 + Math.sin(t * 9) * 10, sy - 92]];
      else if (kind === 'point' && d > 0) pts = [[sx, sy], [bw * 1.3, sy - 10], [bw * 1.9, sy - 26]];
      else if (kind === 'up') pts = [[sx, sy], [d * bw * 1.25, sy - 40], [d * bw * 1.05, sy - 110]];
      else if (kind === 'hold') pts = [[sx, sy], [d * bw * 1.0, by - 60], [d * 34, by - 54]];
      else if (kind === 'chin' && d > 0) pts = [[sx, sy], [bw * .9, by - 70], [20, by - 130]];
      else { const sw = walk * d * -16; pts = [[sx, sy], [d * bw * 1.02 + sw * .5, by - 60], [d * bw * .96 + sw, by - 24]]; }
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(...pts[0]); ctx.quadraticCurveTo(...pts[1], ...pts[2]); ctx.stroke();
      ctx.strokeStyle = o.sleeve || robe; ctx.lineWidth = 21; ctx.stroke(); ink(ctx, SKIN, c => c.arc(pts[2][0], pts[2][1], 12, 0, 7), 4); return pts[2]; };
    const arms = o.arms || 'down';
    if (arms !== 'crossed') arm(-1, arms);
    cel(ctx, body, robe, { shade: robeSh, light: mix(robe, '#ffffff', .4), dx: dir ? -dir * 10 : 12, dy: 6 });
    // toga drape + folds
    if (o.toga) { ink(ctx, o.toga, c => { c.moveTo(-bw * .6, by - 116); c.quadraticCurveTo(bw * .3, by - 70, bw * .95, by - 4); c.lineTo(bw * .55, by + 8); c.quadraticCurveTo(0, by - 60, -bw * .66, by - 96); c.closePath(); }, 4); }
    ctx.save(); ctx.strokeStyle = mix(robe, '#4a3020', .4); ctx.lineWidth = 2.5; for (const fx of [-24, 2, 26]) { ctx.beginPath(); ctx.moveTo(fx, by - 60); ctx.quadraticCurveTo(fx + 6, by - 30, fx + 2, by + 8); ctx.stroke(); } ctx.restore();
    if (o.trim) { ctx.save(); body(ctx); ctx.clip(); ctx.fillStyle = o.trim; ctx.fillRect(-120, by - 4, 240, 12); ctx.restore(); }
    if (o.belt) ink(ctx, o.belt, c => c.rect(-bw * .98, by - 70, bw * 1.96, 12), 3.5);
    if (arms === 'crossed') { arm(-1, 'crossed'); arm(1, 'crossed'); } else { const hp = arm(1, arms); if (o.prop) o.prop(ctx, hp[0], hp[1], t); }
    // head
    ctx.save(); ctx.translate(dir * 6, by - 150 + br); ctx.rotate((o.tilt || 0) + (o.sway ? Math.sin(t * 1.3 + ph) * .04 : 0));
    hairBack(ctx, o, r);
    cel(ctx, c => c.arc(0, 0, r, 0, 7), SKIN, { shade: SKIN_SH, dx: dir ? -dir * 12 : 12, dy: 10 });
    beard(ctx, o, r);
    ctx.save(); ctx.translate(dir * 18, 0); face(ctx, Object.assign({}, o, o.talk ? { mouth: Math.sin(t * 13 + ph) > -.2 ? 'o' : 'flat' } : {}, { mouth: o.talk ? (Math.sin(t * 13 + ph) > -.2 ? 'o' : 'flat') : o.beard ? (o.mouth === 'o' || o.mouth === 'grin' ? o.mouth : 'none') : o.mouth }), blink); ctx.restore();
    hairFront(ctx, o, r);
    ctx.restore();
    ctx.restore(); }

  // ---------- animals ----------
  // a big soft cow in the reference's bull manner: heavy rounded body, a large head with a pink muzzle, sleepy lids
  function cow(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); const ph = x * .1, blink = ((t + ph) % 4.1) < .14, chew = Math.sin(t * 5 + ph);
    const body = o.col || '#f7f1e6', sh = mix(body, '#7a5a48', .32), li = '#fffdf6', spot = o.spot || '#8a5a3a';
    ctx.fillStyle = 'rgba(40,20,10,.22)'; ctx.beginPath(); ctx.ellipse(0, 6, 190, 22, 0, 0, 7); ctx.fill();
    for (const [lx, d] of [[-110, 1], [90, 1], [-70, 0], [124, 0]]) cel(ctx, c => { c.moveTo(lx - 16, -86); c.lineTo(lx - 14, -10); c.quadraticCurveTo(lx, 2, lx + 16, -10); c.lineTo(lx + 16, -86); c.closePath(); }, d ? sh : body, { shade: mix(sh, '#3a2a20', .3), dx: 6, dy: 0, lw: 4.5 });
    const torso = c => { c.moveTo(-150, -170); c.bezierCurveTo(-190, -120, -170, -60, -120, -56); c.lineTo(120, -56); c.bezierCurveTo(176, -60, 190, -130, 150, -176); c.bezierCurveTo(90, -214, -60, -216, -150, -170); c.closePath(); };
    cel(ctx, torso, body, { shade: sh, light: li, dx: 16, dy: 18 });
    ctx.save(); torso(ctx); ctx.clip(); for (const [px, py, rx, ry] of o.spots || [[-40, -150, 52, 30], [80, -110, 40, 26]]) { ctx.fillStyle = spot; ctx.beginPath(); ctx.ellipse(px, py, rx, ry, .3, 0, 7); ctx.fill(); } ctx.restore(); ink(ctx, null, torso, 5);
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(156, -160); ctx.quadraticCurveTo(196, -120 + Math.sin(t * 2 + ph) * 10, 184, -70); ctx.stroke(); ctx.restore(); ink(ctx, spot, lumps(184, -64, 9, 13, 5, .4, 2), 3);
    // head (grazing: lowered to the grass)
    const hx = -170, hy = o.graze ? -40 : -170; ctx.save(); ctx.translate(hx, hy); ctx.rotate(o.graze ? .35 : -.05);
    for (const d of [-1, 1]) cel(ctx, c => { c.moveTo(d * 30, -54); c.quadraticCurveTo(d * 78, -70, d * 72, -116); c.quadraticCurveTo(d * 58, -84, d * 18, -66); c.closePath(); }, '#e9dcbc', { shade: '#b8a07a', dx: 4, dy: 4, lw: 4.5 });
    for (const d of [-1, 1]) cel(ctx, c => c.ellipse(d * 70, -30, 34, 15, d * .35, 0, 7), body, { shade: sh, lw: 4.5 });
    const head = c => { c.moveTo(-54, -60); c.quadraticCurveTo(0, -84, 54, -60); c.quadraticCurveTo(70, 0, 50, 56); c.quadraticCurveTo(0, 80, -50, 56); c.quadraticCurveTo(-70, 0, -54, -60); c.closePath(); };
    cel(ctx, head, body, { shade: sh, light: li, dx: 10, dy: 12 });
    cel(ctx, c => c.ellipse(0, 50 + chew * 2, 50, 30, 0, 0, 7), '#f2c6b8', { shade: '#d89a8c', dx: 5, dy: 6, lw: 4.5 }); ctx.fillStyle = INK; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 16, 46, 5, 8, d * .2, 0, 7); ctx.fill(); }
    ctx.save(); ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(-14, 70 + chew * 2); ctx.quadraticCurveTo(0, 74 + chew * 2, 14, 70 + chew * 2); ctx.stroke();
    for (const d of [-1, 1]) { const ex = d * 28, ey = -10; ctx.beginPath(); if (blink) { ctx.moveTo(ex - 12, ey); ctx.quadraticCurveTo(ex, ey + 6, ex + 12, ey); ctx.stroke(); }
      else if (o.unimpressed) { ctx.moveTo(ex - 13, ey - 2); ctx.lineTo(ex + 13, ey - 2); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(ex + (o.look || 0) * 4, ey + 3, 5, 0, Math.PI); ctx.fill(); }
      else { ctx.fillStyle = INK; ctx.ellipse(ex, ey, 5.5, 8, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + 2, ey - 3, 2, 0, 7); ctx.fill(); } } ctx.restore();
    ink(ctx, '#ead9a8', lumps(0, -66, 30, 12, 7, .5, 1), 3.5);
    ctx.restore(); ctx.restore(); }
  function goat(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); const nib = Math.max(0, Math.sin(t * 2.5 + x)) * 10, col = o.col || '#e2d8c6', sh = mix(col, '#5a4030', .33);
    ctx.fillStyle = 'rgba(40,20,10,.2)'; ctx.beginPath(); ctx.ellipse(0, 4, 70, 10, 0, 0, 7); ctx.fill();
    for (const lx of [-38, -18, 30, 48]) cel(ctx, c => c.rect(lx - 6, -46, 12, 46), lx === -18 || lx === 48 ? sh : col, { shade: sh, dx: 3, dy: 0, lw: 3.5 });
    cel(ctx, lumps(4, -66, 62, 30, 9, .12, 3), col, { shade: sh, light: '#fbf6ec', dx: 8, dy: 9 });
    ink(ctx, col, c => { c.moveTo(62, -82); c.lineTo(80, -102); c.lineTo(72, -76); c.closePath(); }, 3);
    ctx.save(); ctx.translate(-58, -82 + nib); ctx.rotate(.35 + nib * .02);
    for (const d of [-1, 1]) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(d * 6, -22); ctx.quadraticCurveTo(d * 4 + 26, -56, 34, -30); ctx.stroke(); ctx.strokeStyle = '#a8987a'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
    cel(ctx, c => c.ellipse(-26, -6, 18, 8, -.5, 0, 7), col, { shade: sh, lw: 3.5 });
    cel(ctx, c => { c.moveTo(-20, -22); c.quadraticCurveTo(4, -34, 20, -16); c.quadraticCurveTo(14, 18, -4, 34); c.quadraticCurveTo(-24, 22, -20, -22); c.closePath(); }, col, { shade: sh, light: '#fbf6ec', dx: 5, dy: 5, lw: 4 });
    ink(ctx, mix(col, '#7a6a5a', .3), c => { c.moveTo(-8, 30); c.lineTo(-4, 48); c.lineTo(4, 30); c.closePath(); }, 3);
    ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(4, -4, 3, 4.5, 0, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-2, -12); ctx.lineTo(10, -10); ctx.stroke();
    ctx.restore(); ctx.restore(); }
  // long soft cast shadow on the ground (low sun from the right by default)
  function castShadow(ctx, x, y, w, len, ang = -2.6, a = .28) { ctx.save(); ctx.fillStyle = `rgba(50,30,40,${a})`; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2 + Math.cos(ang) * len, y + Math.sin(ang) * len * -.25); ctx.lineTo(x - w / 2 + Math.cos(ang) * len, y + Math.sin(ang) * len * -.25); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function rock(ctx, x, y, r, col = '#cfc2a8') { cel(ctx, blob([[x - r, y], [x - r * .8, y - r * .7], [x - r * .1, y - r * .95], [x + r * .7, y - r * .6], [x + r, y]]), col, { shade: mix(col, '#4a3a30', .35), light: '#f6eedc', dx: 6, dy: 6, lw: 3.5 }); }
  // ---------- editing ----------
  const OFF = {};
  // cross-dissolve: draw a shot to an offscreen layer and blend it in over `fade` seconds at its start (and out at its end if fadeOut)
  function dissolve(draw, fade = .5, fadeOut = 0) { return (ctx, lt, dur, t) => {
    const a = Math.min(fade ? clamp(lt / fade) : 1, fadeOut ? clamp((dur - lt) / fadeOut) : 1);
    if (a >= 1) return draw(ctx, lt, dur, t);
    const k = (draw.name || 'x') + fade; let c = OFF[k]; if (!c) { c = OFF[k] = document.createElement('canvas'); c.width = W; c.height = H; }
    const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); g.save(); draw(g, lt, dur, t); g.restore();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = ease.inOut(a); ctx.drawImage(c, 0, 0); ctx.restore(); }; }
  // build overlapping shots from [start, draw] cuts: each shot dissolves in over `fade` (cut: fade 0)
  function cutList(list, end) { return list.map(([s, draw, fade = .5], i) => ({ start: Math.max(0, s - (fade || 0)), end: i + 1 < list.length ? list[i + 1][0] : end, draw: dissolve(draw, fade) })); }
  // slow camera: push from z0 to z1 toward (fx,fy) across the shot
  function camPush(ctx, lt, dur, z0, z1, fx = 640, fy = 360, pan = 0) { const k = ease.inOut(clamp(lt / dur)), z = lerp(z0, z1, k); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-fx - pan * (k - .5), -fy); }
  // small dialogue subtitle (teal name tag + white line), like the reference
  function subtitle(ctx, name, line, k = 1) { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(k / .2); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '700 17px Nunito, Fredoka, sans-serif'; const nw = ctx.measureText(name).width + 14; ctx.fillStyle = 'rgba(30,110,110,.9)'; ctx.fillRect(640 - nw / 2, 628, nw, 22); ctx.fillStyle = '#e8fff8'; ctx.fillText(name, 640, 640);
    ctx.font = '700 20px Nunito, Fredoka, sans-serif'; const lw = ctx.measureText(line).width + 18; ctx.fillStyle = 'rgba(20,20,24,.72)'; ctx.fillRect(640 - lw / 2, 652, lw, 28); ctx.fillStyle = '#fff'; ctx.fillText(line, 640, 667); ctx.restore(); }
  // a quiet caption for facts/dates (lower third, no big stickers in this style)
  function caption(ctx, text, k = 1, o = {}) { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(k / .35) * (o.a ?? 1); ctx.font = `700 ${o.size || 30}px "Liberation Serif", serif`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = 'middle';
    const x = o.x ?? 60, y = o.y ?? 640; ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(30,15,10,.8)'; ctx.strokeText(text, x, y); ctx.fillStyle = o.col || '#fbf0d8'; ctx.fillText(text, x, y);
    if (o.sub) { ctx.font = `700 ${o.subSize || 18}px Nunito, sans-serif`; ctx.lineWidth = 5; ctx.strokeText(o.sub, x, y + 34); ctx.fillStyle = '#f0dcb8'; ctx.fillText(o.sub, x, y + 34); } ctx.restore(); }
  // a hand-lettered stamp for LEGEND / MYTH / DEBATED / NEAR-DEATH (painted, not sticker-like)
  function seal(ctx, text, x, y, k, col = '#a8322a', rot = -.08) { if (k <= 0) return; const s = k < .12 ? lerp(1.6, 1, k / .12) : 1; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha = Math.min(1, k / .12) * .92;
    ctx.font = '700 44px "Liberation Serif", serif'; const w = ctx.measureText(text).width + 50; ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.strokeRect(-w / 2, -36, w, 72); ctx.lineWidth = 2.5; ctx.strokeRect(-w / 2 + 8, -28, w - 16, 56); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3); ctx.restore(); }

  // ---------- the "enhanced" finish (matched to the user's repainted plates) ----------
  let BL = null, TX = null;
  // sun-ray burst from the sun, slowly turning, screen-blended
  function rays(ctx, sx, sy, t, a = .16) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.translate(sx, sy); ctx.rotate(t * .01);
    for (let i = 0; i < 18; i++) { const an = i / 18 * Math.PI * 2, w = .05 + (i % 3) * .025, g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1500); g.addColorStop(0, `rgba(255,236,180,${a * (1 + (i % 2))})`); g.addColorStop(.6, `rgba(255,226,160,${a * .4})`); g.addColorStop(1, 'rgba(255,226,160,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 1500, an, an + w); ctx.closePath(); ctx.fill(); }
    const c = ctx.createRadialGradient(0, 0, 0, 0, 0, 260); c.addColorStop(0, 'rgba(255,250,225,.75)'); c.addColorStop(.35, 'rgba(255,236,170,.3)'); c.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(0, 0, 260, 0, 7); ctx.fill(); ctx.restore(); }
  // glow: a blurred, brightened copy of the frame screened back on top
  function bloom(ctx, a = .28) { if (!BL) { BL = document.createElement('canvas'); BL.width = 320; BL.height = 180; } const g = BL.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 320, 180); g.filter = 'blur(4px) brightness(1.15)'; g.drawImage(ctx.canvas, 0, 0, 320, 180); g.filter = 'none';
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = a; ctx.drawImage(BL, 0, 0, W, H); ctx.restore(); }
  // painted texture: soft blotches + fine tooth, multiplied
  function texture(ctx, a = .10) { if (!TX) { TX = document.createElement('canvas'); TX.width = 640; TX.height = 360; const g = TX.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 640, 360); let sd = 11; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
      g.filter = 'blur(10px)'; for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(${150 + r() * 60},${120 + r() * 50},${90 + r() * 40},${.25 + r() * .3})`; g.beginPath(); g.ellipse(r() * 640, r() * 360, 20 + r() * 60, 10 + r() * 30, r() * 3, 0, 7); g.fill(); }
      g.filter = 'none'; for (let i = 0; i < 4000; i++) { g.fillStyle = `rgba(90,70,50,${r() * .18})`; g.fillRect(r() * 640, r() * 360, 1, 1 + r() * 2); } }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a; ctx.drawImage(TX, 0, 0, W, H); ctx.restore(); }
  // low mist over the horizon and ground
  function mist(ctx, t, y = 470, a = .22) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(22px)'; ctx.globalAlpha = a; ctx.fillStyle = '#fff3da'; for (let i = 0; i < 7; i++) { const x = ((i * 260 + t * 10) % 1800) - 260; ctx.beginPath(); ctx.ellipse(x, y + (i % 3) * 26, 300, 26, 0, 0, 7); ctx.fill(); } ctx.restore(); }
  function enhance(ctx, t, o = {}) { if (o.sun) rays(ctx, o.sun[0], o.sun[1], t, o.rays ?? .07); mist(ctx, t, o.mistY ?? 470, o.mist ?? .2); texture(ctx, o.tex ?? .1); bloom(ctx, o.bloom ?? .26); }
  // reeds and cattails at the marsh edge
  function reeds(ctx, x, y, s, t, n = 7) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < n; i++) { const dx = (i - n / 2) * 14, h = 110 + (i * 37) % 70, sw = Math.sin(t * 1.3 + i + x) * 5;
      ink(ctx, i % 2 ? '#6a7a34' : '#7a8a3c', c => { c.moveTo(dx - 3, 0); c.quadraticCurveTo(dx + sw * .4, -h * .5, dx + sw, -h); c.quadraticCurveTo(dx + sw * .4 + 3, -h * .5, dx + 3, 0); c.closePath(); }, 2.5);
      if (i % 3 === 0) ink(ctx, '#7a4a2a', c => c.ellipse(dx + sw, -h + 6, 5, 16, 0, 0, 7), 2.5); } ctx.restore(); }
  // a cloud with the warm glowing rim of the repaints
  function rimClouds(ctx, t, o = {}) { ctx.save(); for (let i = 0; i < (o.n || 3); i++) { const x = ((i * 520 + t * 4 + (o.x0 || 0)) % 1900) - 300, y = (o.y || 110) + (i % 2) * 50, r = 90 + (i % 3) * 30, fn = lumps(x, y, r * 2.1, r * .6, 11, .3, i + 3);
      ctx.save(); ctx.filter = 'blur(6px)'; ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(255,236,190,.55)'; path(ctx, fn); ctx.stroke(); ctx.restore();
      cel(ctx, fn, o.col || '#f2e2cc', { shade: o.shade || '#d6bfa8', light: '#fff6e6', dx: 8, dy: -12, lw: 0 }); ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(160,120,90,.5)'; path(ctx, fn); ctx.stroke(); ctx.restore(); } ctx.restore(); }
  // ---------- grounding: what ties objects to the ground ----------
  // soft ambient-occlusion pool under an object
  function contact(ctx, x, y, w, a = .45, h) { ctx.save(); ctx.filter = 'blur(8px)'; const g = ctx.createRadialGradient(x, y, 0, x, y, w * .6); g.addColorStop(0, `rgba(40,24,14,${a})`); g.addColorStop(1, 'rgba(40,24,14,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, w * .62, h || w * .12, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // the foot of a structure: an earth skirt, rubble, pebbles and grass tufts along the base line
  function footing(ctx, x, y, w, t, o = {}) { let sd = Math.abs(Math.round(x * 13 + w)) % 2147483646 + 1; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    contact(ctx, x, y + 4, w * 1.25, o.ao ?? .5);
    ctx.save(); ctx.filter = 'blur(2px)'; ctx.fillStyle = o.earth || 'rgba(110,84,52,.75)'; ctx.beginPath(); ctx.moveTo(x - w * .7, y + 10); for (let i = 0; i <= 10; i++) { const u = i / 10; ctx.lineTo(x - w * .7 + u * w * 1.4, y - 4 - Math.sin(u * Math.PI) * (6 + r() * 6)); } ctx.lineTo(x + w * .7, y + 12); ctx.closePath(); ctx.fill(); ctx.restore();
    for (let i = 0; i < Math.max(3, w / 22); i++) { const px = x - w * .62 + r() * w * 1.24, py = y + 2 + r() * 8, rr = 3 + r() * 7; cel(ctx, c => c.ellipse(px, py, rr * 1.3, rr * .8, 0, 0, 7), o.stone || '#d8cbb0', { shade: '#9a8a70', dx: 2, dy: 2, lw: 2 }); }
    ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < Math.max(4, w / 10); i++) { const px = x - w * .7 + r() * w * 1.4, h = 6 + r() * 14, sw = Math.sin(t * 1.5 + i) * 1.5; ctx.strokeStyle = r() < .5 ? '#5f7a34' : '#86a046'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y + 6); ctx.lineTo(px + sw + (r() - .5) * 5, y + 6 - h); ctx.stroke(); } ctx.restore(); }
  // a block's shaded side face (gives a flat front some depth); the sun is to the right, so the side is on the left
  function sideFace(ctx, x, yTop, yBot, d, col) { ink(ctx, mix(col, '#3a2418', .38), c => { c.moveTo(x, yBot); c.lineTo(x, yTop); c.lineTo(x - d, yTop - d * .45); c.lineTo(x - d, yBot - d * .45); c.closePath(); }, 3.5); }
  // soft painted ground: blended colour patches (no hard edges), worn tracks, fine grain
  function softPatches(ctx, x0, x1, y0, y1, cols, n = 18, seed = 4) { let sd = seed; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647; ctx.save(); ctx.filter = 'blur(14px)'; for (let i = 0; i < n; i++) { const y = y0 + Math.pow(r(), .8) * (y1 - y0), k = (y - y0) / (y1 - y0), w = 60 + r() * 160 * (.5 + k); ctx.fillStyle = cols[i % cols.length]; ctx.globalAlpha = .55; ctx.beginPath(); ctx.ellipse(x0 + r() * (x1 - x0), y, w, w * (.12 + k * .1), 0, 0, 7); ctx.fill(); } ctx.restore(); }
  function track(ctx, pts, w0, w1, col = 'rgba(150,120,80,.55)') { ctx.save(); ctx.filter = 'blur(3px)'; ctx.fillStyle = col; ctx.beginPath(); const n = pts.length; for (let i = 0; i < n; i++) { const [x, y] = pts[i], w = lerp(w0, w1, i / (n - 1)); i ? ctx.lineTo(x - w, y) : ctx.moveTo(x - w, y); } for (let i = n - 1; i >= 0; i--) { const [x, y] = pts[i], w = lerp(w0, w1, i / (n - 1)); ctx.lineTo(x + w, y); } ctx.closePath(); ctx.fill(); ctx.restore(); }
  G.Paint = { slopeFlora, birds, contact, footing, sideFace, softPatches, track, pine, cypress, grassField, weather, treeLine, archW, rays, bloom, texture, mist, enhance, reeds, rimClouds, INK, LW, mix, ink, cel, blob, lumps, castShadow, rock, sky, far, hills, shafts, grade, grain, vignette, bush, tree, grassFG, weeds, column, arch, temple, MARBLE, chibi, face, cow, goat, dissolve, cutList, camPush, subtitle, caption, seal, SKIN };
})(window);
