/* New York — the fixed camera: Wall Street at Broad Street, looking EAST down Wall Street toward the East River.
 * One-point perspective, vanishing point (640, 330). Federal Hall's portico on the left, stone towers on both sides,
 * a slot of sky and harbor water at the far end. The same frame morphs to 1609 (hill on the left, the Broad Street
 * creek and marsh on the right, open water ahead). Reused in every era of the NYC series.
 * corner(ctx, t, o): o.m (0 today → 1 1609), o.freeze (time to freeze people/cars at), o.light (0 day .. 1 golden),
 *                    o.crowd (0..1), o.grey (0..1 desaturate, 1975), o.empty (no people)              */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, lerp, ease, clamp, glow } = T;
  const INK = FX.INK, VX = 640, VY = 330, END = .12;
  // perspective: s = depth scale (1 near plane … END far end); Y = height in near-plane pixels (ground = 760)
  const LX = s => VX - 740 * s, RX = s => VX + 740 * s, PY = (Y, s) => VY + (Y - VY) * s;
  const sOfL = x => (VX - x) / 740, sOfR = x => (x - VX) / 740;

  function person(ctx, x, y, s, col, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sw = o.step || 0; line(ctx, [[-6, -2], [-6 - sw * 6, -30]], 9, '#2a2a34'); line(ctx, [[6, -2], [6 + sw * 6, -30]], 9, '#2a2a34');
    shape(ctx, col, 3, c => { c.moveTo(-17, -28); c.lineTo(-15, -70); c.quadraticCurveTo(0, -82, 15, -70); c.lineTo(17, -28); c.closePath(); });
    shape(ctx, o.skin || '#f0c8a0', 3, circle(0, -92, 13)); if (o.bag) shape(ctx, '#3a2a20', 2.5, rect(14, -50, 16, 20, 3)); if (o.cup) shape(ctx, '#f4efe2', 2.5, rect(-26, -64, 10, 14, 2));
    ctx.restore(); }

  // ---------------- the 1609 landscape (always drawn underneath; the city covers it today) ----------------
  function land1609(ctx, t, o) {
    // far shore (Brooklyn, wooded) and the open water of the East River at the end of the street
    T.blurred(ctx, 1.2, () => { shape(ctx, '#7fae7a', 0, c => { c.moveTo(-100, 330); for (let x = -100; x <= 1400; x += 110) c.quadraticCurveTo(x + 55, 300 - (x * 7 % 22), x + 110, 330); c.lineTo(1400, 345); c.lineTo(-100, 345); c.closePath(); }); });
    shape(ctx, grad(ctx, 0, 335, 0, 420, [[0, '#5fb6cc'], [1, '#3e94b4']]), 0, rect(-100, 335, 1500, 90));
    for (let i = 0; i < 9; i++) { const x = ((i * 170 + t * 12) % 1500) - 100; line(ctx, [[x, 350 + (i % 3) * 18], [x + 40, 350 + (i % 3) * 18]], 3, 'rgba(255,255,255,.55)'); }
    // the left: a wooded low rise climbing away to the north
    shape(ctx, grad(ctx, 0, 140, 0, 760, [[0, '#7dbb5c'], [1, '#4f8a3a']]), 4, c => { c.moveTo(-100, 120); c.quadraticCurveTo(250, 170, 520, 360); c.quadraticCurveTo(560, 420, 600, 760); c.lineTo(-100, 760); c.closePath(); });
    for (let i = 0; i < 24; i++) { const x = -60 + (i * 97) % 560, y = 200 + (i * 53) % 330, s = .55 + (y - 200) / 420, sw = Math.sin(t * .9 + i) * 3;
      if (y < 150 + x * .38) continue; shape(ctx, '#6a4a2a', 3, rect(x - 6 * s, y - 10 * s, 12 * s, 60 * s)); shape(ctx, i % 3 ? '#3f7f3a' : '#4f9a44', 3.5, c => { c.ellipse(x + sw, y - 40 * s, 46 * s, 58 * s, 0, 0, 7); }); shape(ctx, 'rgba(255,255,255,.15)', 0, ellipse(x - 14 * s + sw, y - 60 * s, 14 * s, 20 * s)); }
    // the ground where you stand: grass and dirt
    shape(ctx, grad(ctx, 0, 380, 0, 760, [[0, '#b8b070'], [1, '#9a7a4a']]), 0, poly([[520, 370], [900, 370], [1400, 760], [480, 760]]));
    // the right: salt marsh and the creek (today's Broad Street) winding down to the water
    shape(ctx, grad(ctx, 0, 360, 0, 760, [[0, '#a8b878'], [1, '#7f9a52']]), 0, poly([[760, 355], [1400, 340], [1400, 760], [1000, 760]]));
    shape(ctx, grad(ctx, 0, 360, 0, 760, [[0, '#6fc0d0'], [1, '#3e9ab8']]), 3.5, c => { c.moveTo(800, 352); c.quadraticCurveTo(900, 420, 960, 470); c.quadraticCurveTo(1080, 560, 1100, 760); c.lineTo(1300, 760); c.quadraticCurveTo(1200, 560, 1050, 460); c.quadraticCurveTo(960, 400, 850, 350); c.closePath(); });
    for (let i = 0; i < 30; i++) { const x = 780 + (i * 61) % 600, y = 400 + (i * 37) % 340, h = 30 + (i * 17) % 60 * (y / 500), sw = Math.sin(t * 1.3 + i) * 4; if (Math.abs(x - (900 + (y - 360) * .7)) < 70) continue; line(ctx, [[x, y], [x + sw, y - h]], 4, i % 2 ? '#6f7f34' : '#5a6a2a'); }
  }

  // ---------------- today's city ----------------
  const LEFT = [[.97, .6, -1400, '#d8cbb0', 'fed'], [.6, .5, -900, '#cfc6b8'], [1.3, .97, -1200, '#c8bca8', null], [.58, .4, -1500, '#b9c2cc'], [.4, .27, -700, '#d8c0a0'], [.27, .19, -1300, '#a9b6c4'], [.19, END, -900, '#c8bca8']];
  const RIGHT = [[1.0, .72, -500, '#e2d6c0', 'morgan'], [.72, .5, -1600, '#b4bec8'], [.5, .34, -1100, '#d4c4a8'], [.34, .24, -1700, '#9fb0c0'], [.24, END, -1000, '#cdbfa8']];
  function facade(ctx, side, s0, s1, top, col, kind, o) {
    const X = side < 0 ? LX : RX, gy = 760;
    const q = [[X(s0), PY(top, s0)], [X(s1), PY(top, s1)], [X(s1), PY(gy, s1)], [X(s0), PY(gy, s0)]];
    shape(ctx, col, 4, poly(q));
    // floors and window columns, receding
    const fl = kind === 'fed' ? 0 : Math.floor((gy - 160 - top) / 110);
    ctx.save(); ctx.beginPath(); poly(q)(ctx); ctx.clip();
    for (let f = 0; f < fl; f++) { const Y = gy - 200 - f * 110; line(ctx, [[X(s0), PY(Y, s0)], [X(s1), PY(Y, s1)]], 2, 'rgba(40,50,60,.25)'); }
    const n = Math.max(2, Math.round((s0 - s1) * 22));
    for (let k = 0; k < n; k++) { const sa = lerp(s0, s1, (k + .25) / n), sb = lerp(s0, s1, (k + .65) / n);
      for (let f = 0; f < fl; f++) { const Y0 = gy - 260 - f * 110, Y1 = Y0 + 60;
        shape(ctx, o.lit ? (k + f) % 5 ? '#26324a' : '#ffd27a' : (k + f) % 4 ? '#5a7894' : '#7aa0bc', 0, poly([[X(sa), PY(Y0, sa)], [X(sb), PY(Y0, sb)], [X(sb), PY(Y1, sb)], [X(sa), PY(Y1, sa)]])); } }
    ctx.restore();
    if (kind === 'fed') federalHall(ctx, o, t0 => 0);
    if (kind === 'morgan') { for (let k = 0; k < 4; k++) { const sa = lerp(s0, s1, .15 + k * .2); shape(ctx, '#f0e6d2', 2.5, poly([[X(sa), PY(300, sa)], [X(sa + .02), PY(300, sa + .02)], [X(sa + .02), PY(700, sa + .02)], [X(sa), PY(700, sa)]])); } }
  }
  function federalHall(ctx, o) { // the portico on the left near plane: steps, eight Doric columns, entablature, and Washington's statue
    const s0 = .94, s1 = .63, X = LX;
    shape(ctx, '#e8dcc4', 4, poly([[X(s0), PY(120, s0)], [X(s1), PY(120, s1)], [X(s1), PY(240, s1)], [X(s0), PY(240, s0)]]));
    shape(ctx, '#d8cbb0', 3.5, poly([[X(s0), PY(70, s0)], [X(s1), PY(70, s1)], [X(s1), PY(120, s1)], [X(s0), PY(120, s0)]]));
    for (let k = 0; k < 8; k++) { const sa = lerp(s0, s1, k / 7.4); const w = 46 * sa;
      shape(ctx, '#f2e8d4', 3.5, poly([[X(sa) - w / 2, PY(240, sa)], [X(sa) + w / 2, PY(240, sa)], [X(sa) + w / 2, PY(640, sa)], [X(sa) - w / 2, PY(640, sa)]]));
      line(ctx, [[X(sa), PY(250, sa)], [X(sa), PY(630, sa)]], 2, 'rgba(120,100,70,.35)'); }
    for (let k = 0; k < 4; k++) shape(ctx, k % 2 ? '#d8cbb0' : '#e6dac2', 3, poly([[X(s0) + k * 24, PY(640 + k * 30, s0)], [X(s1), PY(640 + k * 30, s1)], [X(s1), PY(670 + k * 30, s1)], [X(s0) + k * 24, PY(670 + k * 30, s0)]]));
    // George Washington's statue on its pedestal in front of the steps
    const sx = 250, sy = 700; shape(ctx, '#d8cbb0', 4, rect(sx - 40, sy - 120, 80, 120)); shape(ctx, '#e6dac2', 3.5, rect(sx - 48, sy - 132, 96, 16));
    shape(ctx, '#5e7a6a', 4, c => { c.moveTo(sx - 26, sy - 132); c.lineTo(sx - 30, sy - 230); c.quadraticCurveTo(sx, sy - 250, sx + 30, sy - 230); c.lineTo(sx + 26, sy - 132); c.closePath(); });
    shape(ctx, '#5e7a6a', 4, circle(sx, sy - 264, 20)); line(ctx, [[sx + 24, sy - 222], [sx + 44, sy - 196]], 9, '#5e7a6a'); shape(ctx, 'rgba(255,255,255,.2)', 0, ellipse(sx - 10, sy - 200, 6, 30));
  }
  function streetSign(ctx, x, a) { ctx.save(); ctx.globalAlpha = a; line(ctx, [[x, 760], [x, 150]], 12, '#2f3a34'); line(ctx, [[x, 760], [x, 150]], 3, INK);
    shape(ctx, '#2f7a46', 3.5, rect(x - 120, 160, 150, 40, 4)); T.txt ? 0 : 0; ctx.font = '700 22px Fredoka'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('WALL ST', x - 45, 181);
    shape(ctx, '#2f7a46', 3.5, rect(x - 20, 212, 150, 40, 4)); ctx.fillStyle = '#fff'; ctx.fillText('BROAD ST', x + 55, 233);
    shape(ctx, '#2a2a30', 3.5, rect(x - 18, 300, 36, 96, 6)); for (let i = 0; i < 3; i++) shape(ctx, ['#c03a2a', '#d8a83a', '#3aa05a'][i], 2, circle(x, 318 + i * 30, 10)); ctx.restore(); }
  function taxi(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#f2c232', 3.5, rect(-60, -40, 120, 34, 8)); shape(ctx, '#f2c232', 3.5, rect(-36, -64, 72, 28, 8)); shape(ctx, '#9ac8e0', 2.5, rect(-28, -58, 56, 18, 4)); shape(ctx, '#2a2a30', 3, circle(-36, -6, 12)); shape(ctx, '#2a2a30', 3, circle(36, -6, 12)); ctx.restore(); }

  function corner(ctx, t, o = {}) {
    const m = o.m || 0, cityA = 1 - ease.inOut(clamp(m * 1.25)), sink = ease.in(clamp(m)) * 700, tf = o.freeze != null ? Math.min(t, o.freeze) : t;
    const light = o.light || 0;
    // the sky, whole (most of it hidden by towers today)
    shape(ctx, grad(ctx, 0, -100, 0, 380, [[0, light ? '#f0a86a' : '#5fb2e8'], [.7, light ? '#ffd9a0' : '#b8e2f4'], [1, '#ffeec8']]), 0, rect(-200, -200, 1700, 600));
    glow(ctx, VX, 300, 360, 'rgba(255,240,200,.55)');
    if (o.sky) o.sky(ctx);
    land1609(ctx, t, o);
    if (cityA > 0) { ctx.save(); ctx.globalAlpha = cityA; ctx.translate(0, sink);
      // the far end: the street meets the water (FDR / East River) — the same water as 1609
      shape(ctx, '#8a8f98', 0, poly([[LX(END), PY(760, END)], [RX(END), PY(760, END)], [RX(1), 760], [LX(1), 760]]));
      shape(ctx, '#d8d2c6', 3, poly([[LX(END), PY(760, END)], [LX(END) + 14, PY(760, END)], [LX(1) + 420, 760], [LX(1), 760]]));
      shape(ctx, '#d8d2c6', 3, poly([[RX(END) - 14, PY(760, END)], [RX(END), PY(760, END)], [RX(1), 760], [RX(1) - 420, 760]]));
      for (let k = 0; k < 7; k++) { const s = lerp(.95, .2, k / 6); line(ctx, [[VX - 12 * s, PY(760, s)], [VX + 12 * s, PY(760, s) - 0]], 4 * s + 1, '#f4f0e0'); }
      for (let k = 0; k < 6; k++) { const xa = lerp(440, 840, k / 5); shape(ctx, '#f4f0e6', 0, poly([[xa, 700], [xa + 46, 700], [xa + 40, 742], [xa - 6, 742]])); }
      RIGHT.forEach(([s0, s1, top, col, kind]) => facade(ctx, 1, s0, s1, top, col, kind, o)); LEFT.slice(1).filter(b => b[0] < 1).forEach(([s0, s1, top, col, kind]) => facade(ctx, -1, s0, s1, top, col, kind, o));
      // a big flag on the right (New York Stock Exchange side of the street)
      { const s = .6, x = RX(s), y = PY(-200, s); line(ctx, [[x, y], [x - 70, y - 30]], 4, '#5a5a60'); for (let r = 0; r < 7; r++) shape(ctx, r % 2 ? '#fff' : '#c8322a', 0, poly([[x - 70, y - 30 + r * 14], [x - 70, y - 16 + r * 14], [x - 20 + Math.sin(tf * 3 + r) * 4, y + 6 + r * 14], [x - 20 + Math.sin(tf * 3 + r) * 4, y - 8 + r * 14]])); shape(ctx, '#2a3a7a', 0, rect(x - 70, y - 30, 26, 40)); }
      // traffic: yellow cabs coming and going
      if (!o.empty) for (let i = 0; i < 3; i++) { const p = ((tf * .12 + i / 3) % 1), s = lerp(.18, .7, i % 2 ? p : 1 - p); taxi(ctx, VX + (i % 2 ? -1 : 1) * 70 * s, PY(760, s) - 6 * s, s); }
      // commuters on both sidewalks
      if (!o.empty) { const cr = o.crowd ?? 1; for (let i = 0; i < Math.round(22 * cr); i++) { const side = i % 2 ? -1 : 1, dir = i % 3 ? 1 : -1, p = ((tf * (.05 + (i % 4) * .012) * dir + i * .137) % 1 + 1) % 1, s = lerp(.22, 1.05, p);
        const x = side < 0 ? LX(s) + 300 * s + (i % 3) * 40 * s : RX(s) - 300 * s - (i % 3) * 40 * s; person(ctx, x, PY(760, s) - 20 * s, s * 1.5, ['#3a4a6a', '#6a3a3a', '#2f2f3a', '#7a6a4a', '#4a6a5a', '#8a8a94'][i % 6], { step: Math.sin(tf * 7 + i), bag: i % 4 === 0, cup: i % 5 === 1 }); } }
      facade(ctx, -1, ...LEFT[2], o); facade(ctx, -1, ...LEFT[0], o);
      ctx.restore(); }
    if (o.grey) { ctx.save(); ctx.globalAlpha = o.grey * .5; shape(ctx, '#8a8a90', 0, rect(0, 0, W, H)); ctx.restore(); }
    if (cityA > 0) streetSign(ctx, 1150, cityA);
  }

  // the Harbor — the one character who never leaves (a cousin of the Venice lagoon, in New York harbor green-blue)
  function harbor(ctx, x, y, w, t, o = {}) { ctx.save(); ctx.filter = 'hue-rotate(-14deg) saturate(1.15)'; G.Venice.lagoon(ctx, x, y, w, t, o); ctx.restore(); }

  G.NYC = Object.assign(G.NYC || {}, { corner, land1609, person, taxi, harbor, VX, VY, LX, RX, PY });
})(window);
