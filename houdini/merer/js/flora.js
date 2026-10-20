/* Merer's Diary — lush painted flora, fauna + props in the style of the user's repainted frames (merer/ref/user-*.jpg).
 * G.EF: palm, acacia, bushMass, papyrus, lilies, ibis, egret, flowers, felucca, flock, sparkles, tent, camel, brazier,
 *       standard, basket, jar, ropeCoil, bollard, bundle, scaffold, cart, rock, tuft */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, { W, H, clamp, lerp, grad, rng } = T, { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k);
  const LW = 2.4;

  // a painted date palm: ringed trunk, two layers of glossy fronds (dark under, lit over), hanging date clusters
  function palm(g, x, y, s, seed = 1, o = {}) {
    const r = rng(seed), h = (o.h || 190) * s * (.85 + r() * .3), lean = (o.lean ?? (r() - .5) * .5), sway = o.sway || 0, top = [x + lean * h * .55 + sway, y - h], dk = o.dark || 1;
    g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + lean * h * .1, y - h * .55, top[0], top[1]); g.lineWidth = 15 * s + 3; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 15 * s; g.strokeStyle = mul('#8a6440', dk); g.stroke();
    g.lineWidth = 5 * s; g.strokeStyle = mul('#a88058', dk); g.beginPath(); g.moveTo(x - 3 * s, y); g.quadraticCurveTo(x + lean * h * .1 - 3 * s, y - h * .55, top[0] - 3 * s, top[1]); g.stroke();
    g.strokeStyle = mul('#5a3e24', dk); g.lineWidth = 1.6; for (let i = 1; i < 14; i++) { const u = i / 14, px = lerp(x, top[0], u * u * .3 + u * .7), py = lerp(y, top[1], u); g.beginPath(); g.moveTo(px - 7 * s, py + 2); g.quadraticCurveTo(px, py - 3, px + 7 * s, py + 2); g.stroke(); }
    const frond = (a, L, col, hi) => { const ex = top[0] + Math.cos(a) * L, ey = top[1] + Math.sin(a) * L * .5 + L * .42, cx = top[0] + Math.cos(a) * L * .5, cy = top[1] - L * .22;
      g.beginPath(); g.moveTo(top[0], top[1]); g.quadraticCurveTo(cx, cy, ex, ey); g.lineWidth = 4.5 * s + 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 4 * s; g.strokeStyle = col; g.stroke();
      for (let k = 1; k <= 9; k++) { const u = k / 10, qx = (1 - u) * (1 - u) * top[0] + 2 * (1 - u) * u * cx + u * u * ex, qy = (1 - u) * (1 - u) * top[1] + 2 * (1 - u) * u * cy + u * u * ey, ll = (1 - u * .6) * 26 * s;
        for (const sd of [-1, 1]) { const na = Math.atan2(ey - top[1], ex - top[0]) + sd * 1.1 + .5; g.beginPath(); g.moveTo(qx, qy); g.lineTo(qx + Math.cos(na) * ll, qy + Math.sin(na) * ll); g.lineWidth = 4.2 * s; g.strokeStyle = sd > 0 ? hi : col; g.stroke(); } } };
    const n = o.fronds || 9; for (let i = 0; i < n; i++) { const a = -PI - .25 + i / (n - 1) * (PI + .5) + (r() - .5) * .2; frond(a, (70 + r() * 30) * s, mul('#2e6a2c', dk), mul('#4a8a34', dk)); }
    for (let i = 0; i < n - 2; i++) { const a = -PI + .1 + i / (n - 3) * (PI - .2) + (r() - .5) * .2; frond(a, (58 + r() * 26) * s, mul('#4a8e36', dk), mul('#7ab448', dk)); }
    if (o.dates !== false) for (const dx of [-12, 10]) { for (let k = 0; k < 7; k++) sh(g, mul(k % 2 ? '#a8582a' : '#c87a34', dk), 1.2, circ(top[0] + dx * s + (k % 3 - 1) * 5 * s, top[1] + 12 * s + Math.floor(k / 3) * 6 * s, 5 * s)); }
  }
  // flat-topped acacia (umbrella crown of leaf clumps)
  function acacia(g, x, y, s, seed = 2, dk = 1) { const r = rng(seed); ln(g, [[x, y], [x + 4 * s, y - 60 * s], [x - 20 * s, y - 100 * s]], 9 * s + 3); ln(g, [[x, y], [x + 4 * s, y - 60 * s], [x - 20 * s, y - 100 * s]], 9 * s, mul('#6a4a30', dk)); ln(g, [[x + 4 * s, y - 60 * s], [x + 30 * s, y - 96 * s]], 6 * s, mul('#6a4a30', dk));
    for (let i = 0; i < 9; i++) { const cx = x - 60 * s + i * 15 * s + r() * 6, cy = y - 104 * s - Math.sin(i / 8 * PI) * 14 * s; sh(g, mul('#3e7a34', dk), LW, c => c.ellipse(cx, cy, 24 * s, 12 * s, 0, 0, TAU)); }
    for (let i = 0; i < 7; i++) { const cx = x - 50 * s + i * 15 * s, cy = y - 110 * s - Math.sin(i / 6 * PI) * 12 * s; sh(g, mul('#5a9a40', dk), 0, c => c.ellipse(cx, cy, 16 * s, 7 * s, 0, 0, TAU)); } }
  // a rounded mass of shrubs with lit tops (riverbank greenery)
  function bushMass(g, x, y, w, h, seed = 3, dk = 1, cols) {   // leafy shrub mass: scalloped leaf-clump edge, 4 tones, lit from upper left
    const r = rng(seed), C = cols || ['#2a5a26', '#3e7a32', '#5e9e40', '#8cc056'];
    const n = Math.max(4, Math.round(w / 30)); const B = []; for (let i = 0; i < n; i++) B.push([x + (i + .5) * w / n + (r() - .5) * 14, y - h * (.4 + r() * .45) * Math.sin((i + .5) / n * PI) - 6, (14 + r() * 14) * (h / 70)]);
    const leafy = (bx, by, rr, col, lw) => { g.beginPath(); for (let k = 0; k < 11; k++) { const a = k / 11 * TAU, lr = rr * .34; g.moveTo(bx + Math.cos(a) * rr * .78 + lr, by + Math.sin(a) * rr * .78); g.arc(bx + Math.cos(a) * rr * .78, by + Math.sin(a) * rr * .78, lr, 0, TAU); } g.moveTo(bx + rr * .8, by); g.arc(bx, by, rr * .8, 0, TAU);
      if (lw) { g.lineWidth = lw; g.strokeStyle = OUT; g.stroke(); } if (col) { g.fillStyle = col; g.fill(); } };
    for (const [bx, by, rr] of B) leafy(bx, by, rr, null, 4); for (const [bx, by, rr] of B) leafy(bx, by, rr, mul(C[0], dk)); g.fillStyle = mul(C[0], dk); g.fillRect(x, y - 10, w, 10);
    for (const [bx, by, rr] of B) leafy(bx - rr * .14, by - rr * .2, rr * .74, mul(C[1], dk)); for (const [bx, by, rr] of B) leafy(bx - rr * .3, by - rr * .38, rr * .44, mul(C[2], dk));
    for (const [bx, by, rr] of B) { g.fillStyle = mul(C[3], dk); for (let k = 0; k < 5; k++) { g.beginPath(); g.ellipse(bx - rr * .5 + r() * rr * .5, by - rr * .6 + r() * rr * .4, rr * .1, rr * .06, -.6, 0, TAU); g.fill(); } } }
  // papyrus clump: tall stems with umbrella heads; sways (t) when drawn live
  function papyrus(g, x, y, n, h, seed = 4, t = 0, dk = 1) { const r = rng(seed);
    for (let i = 0; i < n; i++) { const xx = x + (r() - .5) * n * 7, hh = h * (.55 + r() * .5), sw = Math.sin(t * 1.2 + i * .9 + seed) * 5 * (hh / 120), tx = xx + sw + (r() - .5) * 18, ty = y - hh;
      g.beginPath(); g.moveTo(xx, y); g.quadraticCurveTo(xx + sw * .3, y - hh * .5, tx, ty); g.lineWidth = 4.2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 2.4; g.strokeStyle = mul(i % 3 ? '#4e8a36' : '#6aa040', dk); g.stroke();
      for (let k = -6; k <= 6; k++) { const a = -PI / 2 + k * .2; g.beginPath(); g.moveTo(tx, ty); g.quadraticCurveTo(tx + Math.cos(a) * 10, ty + Math.sin(a) * 10 - 4, tx + Math.cos(a) * 20, ty + Math.sin(a) * 16 + 6); g.lineWidth = 1.8; g.strokeStyle = mul(k % 2 ? '#6aa848' : '#8cc458', dk); g.stroke(); } }
    for (let i = 0; i < n * 2; i++) { const xx = x + (r() - .5) * n * 9, hh = 24 + r() * 30; g.beginPath(); g.moveTo(xx, y); g.quadraticCurveTo(xx + (r() - .5) * 10, y - hh * .6, xx + (r() - .5) * 20, y - hh); g.lineWidth = 3; g.strokeStyle = mul(i % 2 ? '#3e7a2e' : '#5a9a3a', dk); g.stroke(); } }
  // lily pads + lotus flowers floating (pinks / whites), gently bobbing
  function lilies(g, x, y, w, n, seed = 5, t = 0, dk = 1) { const r = rng(seed); for (let i = 0; i < n; i++) { const px = x + r() * w, py = y + r() * 30, rr = 10 + r() * 10, b = Math.sin(t * 1.4 + i) * 1.2;
      sh(g, mul(i % 2 ? '#4a8a3a' : '#5e9e44', dk), 1.6, c => { c.ellipse(px, py + b, rr, rr * .38, 0, .3, TAU - .1); c.lineTo(px, py + b); c.closePath(); });
      if (r() < .4) { const fx = px + (r() - .5) * 10, fy = py - 4 + b, pk = r() < .6; for (let k = -2; k <= 2; k++) sh(g, mul(pk ? '#f2a0b8' : '#fbf2f0', dk), 1.2, c => c.ellipse(fx + k * 3.4, fy - 4 + Math.abs(k) * 1.6, 3.4, 7, k * .35, 0, TAU)); sh(g, '#f6d050', 0, circ(fx, fy - 2, 2)); } } }
  // wading ibis (white, black head + curved beak) / egret (all white, yellow beak)
  function ibis(g, x, y, s, t = 0, o = {}) { const peck = o.peck ? Math.max(0, Math.sin(t * 1.3 + (o.ph || 0))) : 0, egret = o.egret, dir = o.dir || 1; g.save(); g.translate(x, y); g.scale(s * dir, s);
    ln(g, [[-4, -10], [-6, 14]], 2.4, '#3a2a20'); ln(g, [[4, -10], [6, 14]], 2.4, '#3a2a20');
    sh(g, '#f6f2ea', 2, c => { c.moveTo(-26, -20); c.quadraticCurveTo(-10, -34, 12, -28); c.quadraticCurveTo(20, -18, 8, -10); c.quadraticCurveTo(-14, -6, -26, -20); c.closePath(); });
    if (!egret) sh(g, '#2a2420', 0, c => { c.moveTo(-26, -20); c.lineTo(-36, -14); c.lineTo(-22, -12); c.closePath(); });
    const hx = 18 + peck * 6, hy = -46 + peck * 30; ctx2(g, [[10, -26], [16, -38], [hx, hy]], 4.4, egret ? '#f6f2ea' : '#2a2420'); sh(g, egret ? '#f6f2ea' : '#2a2420', 1.6, circ(hx, hy, 4.6));
    g.beginPath(); g.moveTo(hx + 3, hy); g.quadraticCurveTo(hx + 16, hy + 2 + peck * 4, hx + 22, hy + 10 + peck * 8); g.lineWidth = 2.6; g.strokeStyle = egret ? '#e0b030' : '#2a2420'; g.stroke(); g.restore(); }
  const ctx2 = (g, pts, w, col) => { ln(g, pts, w + 2.4); ln(g, pts, w, col); };
  // flowers in the foreground: red poppies + blue lotus, swaying
  function flowers(g, x, y, w, n, seed = 6, t = 0) { const r = rng(seed); for (let i = 0; i < n; i++) { const fx = x + r() * w, h = 20 + r() * 40, sw = Math.sin(t * 1.5 + i) * 3, kind = r(), fy = y - h;
      ln(g, [[fx, y], [fx + sw, fy]], 2.2, '#3e7a2e');
      if (kind < .45) { sh(g, '#d8382a', 1.6, c => { for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; c.moveTo(fx + sw, fy); c.ellipse(fx + sw + Math.cos(a) * 5, fy + Math.sin(a) * 5, 6, 4.5, a, 0, TAU); } }); sh(g, '#2a1a10', 0, circ(fx + sw, fy, 2.4)); }
      else if (kind < .8) { for (let k = -2; k <= 2; k++) sh(g, k % 2 ? '#5a7ad8' : '#7a96e8', 1.3, c => c.ellipse(fx + sw + k * 3.6, fy - 5 + Math.abs(k) * 2, 3.4, 9, k * .3, 0, TAU)); }
      else sh(g, '#f6d050', 1.3, circ(fx + sw, fy, 4)); } }
  // felucca with a triangular sail (distant, on the water)
  function felucca(g, x, y, s, t = 0) { const b = Math.sin(t * 1.2 + x) * 1.5; g.save(); g.translate(x, y + b); g.scale(s, s);
    sh(g, '#6a4a30', 2, c => { c.moveTo(-26, 0); c.quadraticCurveTo(0, 8, 26, 0); c.lineTo(20, -4); c.lineTo(-22, -4); c.closePath(); }); ln(g, [[0, -4], [0, -50]], 2.2, '#4a3220');
    sh(g, '#f8f2e4', 1.8, c => { c.moveTo(2, -52); c.quadraticCurveTo(24, -26, 22, -6); c.lineTo(2, -6); c.closePath(); }); g.restore(); }
  // a V of ibises / geese flapping across the sky
  function flock(g, t, x0, y0, n = 7, s = 1, sp = 20) { for (let i = 0; i < n; i++) { const row = Math.ceil(i / 2), sd = i % 2 ? 1 : -1, x = ((x0 + t * sp - row * 26 * s) % (W + 400)) - 200, y = y0 + sd * row * 14 * s + Math.sin(t * .7 + i) * 3, f = Math.sin(t * 7 + i * 1.3);
      g.save(); g.translate(x, y); g.scale(s, s); g.beginPath(); g.moveTo(-14, -f * 7); g.quadraticCurveTo(-6, -3, 0, 0); g.quadraticCurveTo(6, -3, 14, -f * 7); g.lineWidth = 2.6; g.strokeStyle = 'rgba(70,46,40,.85)'; g.stroke(); g.restore(); } }
  // twinkling 4-point sparkles on water (sun glints)
  function sparkles(g, t, x, y, w, h, n = 40, seed = 7, col = '255,248,220') { const r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const px = x + r() * w, py = y + r() * h, k = Math.max(0, Math.sin(t * (1.5 + r() * 2) + i * 2.1)), s = (2 + r() * 5) * k; if (s < .3) continue;
      g.fillStyle = `rgba(${col},${.5 + k * .5})`; g.beginPath(); g.moveTo(px, py - s * 2.2); g.lineTo(px + s * .4, py - s * .4); g.lineTo(px + s * 2.2, py); g.lineTo(px + s * .4, py + s * .4); g.lineTo(px, py + s * 2.2); g.lineTo(px - s * .4, py + s * .4); g.lineTo(px - s * 2.2, py); g.lineTo(px - s * .4, py - s * .4); g.closePath(); g.fill(); } g.restore(); }
  // work-camp tent (linen over poles), optional lamp glow inside
  function tent(g, x, y, s, o = {}) { const col = o.col || '#e8dcc0'; g.save(); g.translate(x, y); g.scale(s, s);
    sh(g, mul(col, .82), LW, c => { c.moveTo(-50, 0); c.lineTo(0, -56); c.lineTo(20, -50); c.lineTo(66, 0); c.closePath(); }); sh(g, col, LW, c => { c.moveTo(-50, 0); c.lineTo(0, -56); c.lineTo(30, 0); c.closePath(); });
    if (o.glow) { g.fillStyle = 'rgba(255,190,90,.9)'; g.beginPath(); g.moveTo(-8, 0); g.lineTo(0, -30); g.lineTo(10, 0); g.closePath(); g.fill(); } else sh(g, '#5a4430', 0, c => { c.moveTo(-6, 0); c.lineTo(0, -26); c.lineTo(8, 0); c.closePath(); });
    if (o.stripes) { g.strokeStyle = 'rgba(160,60,40,.6)'; g.lineWidth = 3; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(-50 + k * 12, -k * 13); g.lineTo(30 - k * 7, -k * 13); g.stroke(); } }
    ln(g, [[0, -56], [0, -70]], 2.4, '#6a4a2a'); g.restore(); }
  function camel(g, x, y, s, t = 0, o = {}) { const lie = o.lie, b = Math.sin(t * 1.1 + x) * 1.2; g.save(); g.translate(x, y); g.scale(s * (o.dir || 1), s); const C = '#c89a62';
    if (!lie) for (const lx of [-20, -10, 16, 24]) ln(g, [[lx, -24], [lx, 0]], 6, OUT), ln(g, [[lx, -24], [lx, 0]], 3.6, C);
    const by = lie ? -16 : -34; sh(g, C, LW, c => { c.moveTo(-34, by + 8); c.quadraticCurveTo(-30, by - 16, -14, by - 22); c.quadraticCurveTo(-4, by - 10, 6, by - 18); c.quadraticCurveTo(22, by - 20, 26, by + 6); c.quadraticCurveTo(0, by + 18, -34, by + 8); c.closePath(); });
    if (o.saddle) sh(g, '#b8402a', 1.6, c => c.roundRect(-16, by - 20, 26, 12, 4));
    sh(g, C, LW, c => { c.moveTo(22, by - 4); c.quadraticCurveTo(40, by - 10, 38, by - 34 + b); c.lineTo(52, by - 34 + b); c.quadraticCurveTo(54, by - 26 + b, 44, by - 22 + b); c.quadraticCurveTo(46, by, 28, by + 6); c.closePath(); }); sh(g, OUT, 0, circ(44, by - 31 + b, 1.6)); g.restore(); }
  function brazier(g, x, y, s, t = 0) { g.save(); g.translate(x, y); g.scale(s, s); ln(g, [[-14, 0], [0, -40], [14, 0]], 4, '#8a6a3a'); sh(g, '#c8a040', LW, c => { c.moveTo(-22, -50); c.lineTo(22, -50); c.lineTo(14, -36); c.lineTo(-14, -36); c.closePath(); });
    const f = 1 + Math.sin(t * 9) * .1; sh(g, '#ffb040', 0, c => { c.moveTo(-14, -50); c.quadraticCurveTo(-6, -70 * f, 0, -84 * f); c.quadraticCurveTo(8, -66 * f, 14, -50); c.closePath(); }); sh(g, '#fff0a0', 0, c => c.ellipse(0, -58, 5, 9 * f, 0, 0, TAU));
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 0, -60, 70, 'rgba(255,170,70,.35)'); g.restore(); G.VK.smoke(g, t, 0, -90, .3); g.restore(); }
  function standard(g, x, y, s, t = 0, col = '#c8642a') { g.save(); g.translate(x, y); g.scale(s, s); ln(g, [[0, 0], [0, -150]], 5, '#6a4a2a'); sh(g, '#d8b040', 1.6, c => { c.moveTo(-6, -150); c.lineTo(0, -164); c.lineTo(6, -150); c.closePath(); });
    const w = Math.sin(t * 2) * 3; sh(g, col, LW, c => { c.moveTo(2, -142); c.lineTo(42, -142 + w * .3); c.lineTo(42, -70 + w); c.lineTo(22, -82 + w); c.lineTo(2, -70); c.closePath(); }); sh(g, '#e8c870', 1.2, c => c.ellipse(22, -112, 9, 13, 0, 0, TAU)); g.restore(); }
  function basket(g, x, y, s, kind = 'fruit') { g.save(); g.translate(x, y); g.scale(s, s); const r = rng(Math.round(x));
    for (let i = 0; i < 9; i++) sh(g, kind === 'grain' ? '#d8b448' : ['#d8382a', '#e88a2a', '#8ab840', '#c8a040'][i % 4], 1, circ(-20 + (i % 5) * 10 + (i > 4 ? 5 : 0), -26 - (i > 4 ? 8 : 0), 7));
    sh(g, '#b88a4a', LW, c => { c.moveTo(-30, -24); c.lineTo(30, -24); c.lineTo(22, 0); c.lineTo(-22, 0); c.closePath(); }); g.strokeStyle = 'rgba(90,60,30,.5)'; g.lineWidth = 1.5; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(-28 + k * 2, -18 + k * 6); g.lineTo(28 - k * 2, -18 + k * 6); g.stroke(); } g.restore(); }
  function jar(g, x, y, s, col = '#b8653a') { g.save(); g.translate(x, y); g.scale(s, s); sh(g, col, LW, c => { c.moveTo(-10, -50); c.quadraticCurveTo(-30, -20, -14, 0); c.lineTo(14, 0); c.quadraticCurveTo(30, -20, 10, -50); c.closePath(); }); sh(g, mul(col, .8), 1.6, c => c.ellipse(0, -50, 12, 4, 0, 0, TAU));
    g.strokeStyle = 'rgba(40,30,40,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-16, -26); g.quadraticCurveTo(0, -20, 16, -26); g.stroke(); g.fillStyle = 'rgba(255,230,190,.3)'; g.beginPath(); g.ellipse(-8, -30, 4, 10, 0, 0, TAU); g.fill(); g.restore(); }
  function ropeCoil(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(0, -k * 7, 34 - k * 3, 12, 0, 0, TAU); g.lineWidth = 9; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 6; g.strokeStyle = '#c8a46a'; g.stroke(); } g.restore(); }
  function bollard(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#8a6440', LW, c => c.roundRect(-16, -70, 32, 70, 4)); sh(g, '#a07a50', LW, c => c.ellipse(0, -70, 16, 6, 0, 0, TAU)); for (let k = 0; k < 4; k++) { ln(g, [[-18, -52 + k * 7], [18, -48 + k * 7]], 6, OUT); ln(g, [[-18, -52 + k * 7], [18, -48 + k * 7]], 3.4, '#c8a46a'); } g.restore(); }
  function bundle(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); for (let i = 0; i < 14; i++) { const a = -.4 + i * .06; ln(g, [[-40, 0], [40 + Math.cos(a) * 30, -10 - i * 2]], 4, i % 2 ? '#6a9a3a' : '#5a8a32'); } ln(g, [[-10, -14], [-6, 4]], 5, '#c8a46a'); ln(g, [[16, -18], [20, 2]], 5, '#c8a46a'); g.restore(); }
  function scaffold(g, x, y, w, h) { for (let i = 0; i <= 2; i++) { const xx = x + i * w / 2; ln(g, [[xx, y], [xx, y - h]], 6); ln(g, [[xx, y], [xx, y - h]], 3.4, '#8a6a44'); } for (let k = 1; k < 4; k++) { const yy = y - k * h / 4; ln(g, [[x, yy], [x + w, yy]], 6); ln(g, [[x, yy], [x + w, yy]], 3.4, '#8a6a44'); } ln(g, [[x, y], [x + w / 2, y - h / 2]], 2.4, '#6a4a2a'); }
  function cart(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#9a6a3e', LW, c => c.rect(-40, -34, 80, 18)); for (const bx of [-20, 6]) sh(g, '#e8dcc4', 1.8, c => c.rect(bx, -54, 22, 20)); for (const wx of [-24, 24]) { sh(g, '#7a5232', LW, circ(wx, -12, 12)); ln(g, [[wx - 10, -12], [wx + 10, -12]], 2); } ln(g, [[40, -26], [70, -18]], 4, '#6a4a2a'); g.restore(); }
  function rock(g, x, y, w, h, seed = 1, col = '#b8946a') { const r = rng(seed); sh(g, col, LW, c => { c.moveTo(x - w / 2, y); c.quadraticCurveTo(x - w / 2 - 4, y - h * .7, x - w * .1, y - h); c.quadraticCurveTo(x + w * .4, y - h * 1.02, x + w / 2, y - h * .2); c.lineTo(x + w / 2, y); c.closePath(); });
    g.fillStyle = 'rgba(255,240,210,.35)'; g.beginPath(); g.ellipse(x - w * .15, y - h * .7, w * .22, h * .14, -.3, 0, TAU); g.fill(); g.fillStyle = 'rgba(60,40,20,.2)'; g.fillRect(x + w * .1, y - h * .6, w * .38, h * .6); }
  function tuft(g, x, y, s = 1, col = '#7a9a4a', t = 0) { for (let i = -3; i <= 3; i++) { const sw = Math.sin(t * 1.6 + x + i) * 2; g.beginPath(); g.moveTo(x + i * 2 * s, y); g.quadraticCurveTo(x + i * 4 * s, y - 12 * s, x + i * 6 * s + sw, y - (18 + (3 - Math.abs(i)) * 5) * s); g.lineWidth = 2 * s; g.strokeStyle = col; g.stroke(); } }

  // soft god-ray beams fanning down from the sun (a few wide, very faint shafts — never a cartoon sunburst)
  function beams(g, sun, t, a = .08) { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 7; i++) { const ang = PI * .25 + i * .2 + Math.sin(t * .05 + i) * .03, w = .05 + (i % 3) * .025, L = 1400;
      const x2 = sun[0] + Math.cos(ang) * L, y2 = sun[1] + Math.sin(ang) * L, gr = g.createLinearGradient(sun[0], sun[1], x2, y2); gr.addColorStop(0, `rgba(255,240,200,${a * (i % 2 ? 1 : .6)})`); gr.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = gr;
      g.beginPath(); g.moveTo(sun[0], sun[1]); g.lineTo(sun[0] + Math.cos(ang - w) * L, sun[1] + Math.sin(ang - w) * L); g.lineTo(sun[0] + Math.cos(ang + w) * L, sun[1] + Math.sin(ang + w) * L); g.closePath(); g.fill();
      const ang2 = PI - ang; g.beginPath(); g.moveTo(sun[0], sun[1]); g.lineTo(sun[0] + Math.cos(ang2 - w) * L, sun[1] + Math.sin(ang2 - w) * L); g.lineTo(sun[0] + Math.cos(ang2 + w) * L, sun[1] + Math.sin(ang2 + w) * L); g.closePath(); g.fill(); } g.restore(); }
  G.EF = { beams, palm, acacia, bushMass, papyrus, lilies, ibis, flowers, felucca, flock, sparkles, tent, camel, brazier, standard, basket, jar, ropeCoil, bollard, bundle, scaffold, cart, rock, tuft };
})(window);
