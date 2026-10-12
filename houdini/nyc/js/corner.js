/* New York — the fixed camera: Wall Street at Broad Street, looking EAST down Wall Street toward the East River.
 * One-point perspective, vanishing point (640, 330). Federal Hall's portico and Washington's statue on the left,
 * the New York Stock Exchange on the right, older stone banks and newer glass towers beyond, and a slot of sky and
 * East River at the far end with Brooklyn across it. The same frame morphs to 1609 (wooded rise on the left, the
 * Broad Street creek and salt marsh on the right, open water ahead). Reused in every era of the NYC series.
 * corner(ctx, t, o): o.m (0 today → 1 1609), o.freeze (time to freeze people/cars at), o.light (0 day .. 1 golden),
 *                    o.crowd (0..1), o.grey (0..1 desaturate, 1975), o.empty (no people), o.sky(ctx) extra sky layer */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, lerp, ease, clamp, glow } = T;
  const INK = FX.INK, VX = 640, VY = 330, END = .12;
  // perspective: s = depth scale (1 near plane … END far end); Y = height in near-plane pixels (ground = 760)
  const LX = s => VX - 740 * s, RX = s => VX + 740 * s, PY = (Y, s) => VY + (Y - VY) * s;
  const X = side => side < 0 ? LX : RX;
  // a quad on a receding facade between depths sa..sb and heights Y0..Y1 (near-plane units)
  const fq = (side, sa, sb, Y0, Y1) => poly([[X(side)(sa), PY(Y0, sa)], [X(side)(sb), PY(Y0, sb)], [X(side)(sb), PY(Y1, sb)], [X(side)(sa), PY(Y1, sa)]]);
  // a quad lying on the ground between depth sa..sb, offset from the street centre by u0..u1 (near-plane px, + = right)
  const gq = (sa, sb, u0, u1) => poly([[VX + u0 * sa, PY(760, sa)], [VX + u1 * sa, PY(760, sa)], [VX + u1 * sb, PY(760, sb)], [VX + u0 * sb, PY(760, sb)]]);
  const txt = (ctx, s, x, y, px, col = '#fff', w = 700) => { ctx.save(); ctx.font = `${w} ${px}px Fredoka`; ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };

  const SKIN = ['#f0c8a0', '#d8a07a', '#a8704a', '#7a4a2a', '#e8b890', '#c08a5a'], HAIR = ['#2a1a10', '#5a3a1a', '#1d1a17', '#a86a2a', '#d8c08a', '#8a8a8a'];
  function person(ctx, x, y, s, col, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const v = o.v || 0, sw = o.step || 0, skin = o.skin || SKIN[v % 6], hair = HAIR[(v * 7) % 6];
    if (o.shadow) shape(ctx, 'rgba(40,40,60,.18)', 0, ellipse(0, 6, 26, 7));
    line(ctx, [[-6, -2], [-6 - sw * 6, -30]], 9, v % 3 ? '#2a2a34' : '#3a4a6a'); line(ctx, [[6, -2], [6 + sw * 6, -30]], 9, v % 3 ? '#2a2a34' : '#3a4a6a');
    shape(ctx, '#1d1a17', 0, ellipse(-7 - sw * 6, -1, 7, 4)); shape(ctx, '#1d1a17', 0, ellipse(7 + sw * 6, -1, 7, 4));
    if (v % 4 === 1) shape(ctx, col, 3, c => { c.moveTo(-19, -24); c.lineTo(-15, -72); c.quadraticCurveTo(0, -82, 15, -72); c.lineTo(19, -24); c.closePath(); }); // long coat
    else shape(ctx, col, 3, c => { c.moveTo(-17, -28); c.lineTo(-15, -70); c.quadraticCurveTo(0, -82, 15, -70); c.lineTo(17, -28); c.closePath(); });
    if (v % 3 === 0) line(ctx, [[-4, -74], [0, -50], [4, -74]], 3, v % 2 ? '#c8322a' : '#2f5a8a');                    // a tie or scarf
    shape(ctx, skin, 3, circle(0, -92, 13));
    if (v % 5 === 2) shape(ctx, '#3a3a40', 3, c => { c.ellipse(0, -102, 16, 6, 0, 0, 7); c.rect(-10, -116, 20, 14); });   // a hat
    else shape(ctx, hair, 0, c => { c.moveTo(-13, -92); c.quadraticCurveTo(-14, -108, 0, -107); c.quadraticCurveTo(14, -108, 13, -92); c.quadraticCurveTo(0, -100, -13, -92); c.closePath(); });
    if (o.bag) shape(ctx, '#3a2a20', 2.5, rect(14, -50, 16, 20, 3)); if (o.cup) { shape(ctx, '#f4efe2', 2.5, rect(-26, -64, 10, 14, 2)); shape(ctx, '#2f7a46', 0, rect(-26, -60, 10, 4)); }
    if (o.phone) { shape(ctx, '#2a2a30', 2, rect(-4, -78, 8, 12, 2)); glow(ctx, 0, -76, 14, 'rgba(160,210,255,.5)'); }
    ctx.restore(); }

  // ---------------- the 1609 landscape (always drawn underneath; the city covers it today) ----------------
  function oak(ctx, x, y, s, t, i) { const sw = Math.sin(t * .9 + i) * 3 * s;
    shape(ctx, '#5a3a20', 3, poly([[x - 7 * s, y], [x - 4 * s, y - 60 * s], [x + 4 * s, y - 60 * s], [x + 7 * s, y]])); line(ctx, [[x, y - 40 * s], [x - 16 * s, y - 62 * s]], 4 * s, '#5a3a20');
    for (const [dx, dy, r, c] of [[-22, -70, 30, '#3f7f3a'], [20, -72, 32, '#3a7434'], [0, -96, 36, i % 3 ? '#4f9a44' : '#5aa04a'], [-12, -82, 24, '#4f9a44']]) shape(ctx, c, 3, circle(x + dx * s + sw, y + dy * s, r * s));
    shape(ctx, 'rgba(255,255,255,.16)', 0, ellipse(x - 10 * s + sw, y - 110 * s, 12 * s, 9 * s)); }
  function land1609(ctx, t, o) {
    // far shore (Brooklyn: wooded hills, a thread of smoke from a hearth) and the open water at the end of the street
    T.blurred(ctx, 1.2, () => { shape(ctx, '#86b47e', 0, c => { c.moveTo(-100, 330); for (let x = -100; x <= 1400; x += 110) c.quadraticCurveTo(x + 55, 296 - (x * 7 % 26), x + 110, 330); c.lineTo(1400, 345); c.lineTo(-100, 345); c.closePath(); });
      for (let i = 0; i < 26; i++) shape(ctx, i % 2 ? '#5f9a58' : '#6fa864', 0, circle(-60 + i * 58, 318 - (i * 37) % 14, 14 + (i % 3) * 4)); });
    for (let k = 0; k < 4; k++) { const p = (t * .08 + k / 4) % 1; ctx.save(); ctx.globalAlpha = .35 * (1 - p); shape(ctx, '#e8e4dc', 0, circle(980 + p * 30 + Math.sin(p * 6) * 6, 300 - p * 70, 6 + p * 10)); ctx.restore(); }
    shape(ctx, grad(ctx, 0, 335, 0, 420, [[0, '#5fb6cc'], [1, '#3e94b4']]), 0, rect(-100, 335, 1500, 90));
    for (let i = 0; i < 12; i++) { const x = ((i * 130 + t * 12) % 1500) - 100; line(ctx, [[x, 346 + (i % 4) * 14], [x + 34, 346 + (i % 4) * 14]], 3, 'rgba(255,255,255,.55)'); }
    // a dugout canoe crossing the river (two paddlers, simple silhouettes)
    { const cx = 380 + ((t * 14) % 700), cy = 362; shape(ctx, '#6a4a2a', 3, c => { c.moveTo(cx - 54, cy - 6); c.quadraticCurveTo(cx, cy + 10, cx + 54, cy - 6); c.lineTo(cx + 46, cy + 2); c.quadraticCurveTo(cx, cy + 14, cx - 46, cy + 2); c.closePath(); });
      for (const dx of [-22, 18]) { shape(ctx, '#7a4a2a', 2, c => { c.moveTo(dx + cx - 7, cy - 6); c.lineTo(dx + cx - 5, cy - 26); c.lineTo(dx + cx + 5, cy - 26); c.lineTo(dx + cx + 7, cy - 6); c.closePath(); }); shape(ctx, '#7a4a2a', 2, circle(dx + cx, cy - 32, 6)); line(ctx, [[dx + cx + 4, cy - 22], [dx + cx + 16 + Math.sin(t * 3 + dx) * 6, cy + 6]], 3, '#5a3a20'); } }
    // the left: a wooded low rise climbing away to the north, with grey Manhattan schist breaking through
    shape(ctx, grad(ctx, 0, 140, 0, 760, [[0, '#7dbb5c'], [1, '#4f8a3a']]), 4, c => { c.moveTo(-100, 120); c.quadraticCurveTo(250, 170, 520, 360); c.quadraticCurveTo(560, 420, 600, 760); c.lineTo(-100, 760); c.closePath(); });
    for (const [x, y, w] of [[90, 600, 120], [340, 520, 80], [200, 700, 160]]) { shape(ctx, '#9a9aa0', 3.5, c => { c.moveTo(x - w / 2, y); c.lineTo(x - w * .35, y - w * .3); c.lineTo(x + w * .1, y - w * .38); c.lineTo(x + w / 2, y - w * .12); c.lineTo(x + w / 2, y); c.closePath(); }); line(ctx, [[x - w * .3, y - w * .2], [x + w * .3, y - w * .1]], 2, 'rgba(255,255,255,.4)'); }
    const trees = []; for (let i = 0; i < 30; i++) { const x = -60 + (i * 97) % 560, y = 190 + (i * 53) % 360; if (y < 150 + x * .38 || x > 600 - (760 - y) * .1) continue; trees.push([x, y, .5 + (y - 190) / 380, i]); }
    trees.sort((a, b) => a[1] - b[1]).forEach(([x, y, s, i]) => oak(ctx, x, y, s, t, i));
    for (let i = 0; i < 16; i++) { const x = 20 + (i * 71) % 520, y = 560 + (i * 43) % 190; shape(ctx, i % 2 ? '#e05a5a' : '#f6c945', 0, circle(x, y, 4)); shape(ctx, '#3f7f3a', 0, ellipse(x + 8, y + 6, 10, 5)); }
    // the ground where you stand: grass and a deer path
    shape(ctx, grad(ctx, 0, 380, 0, 760, [[0, '#c0b878'], [1, '#9a7a4a']]), 0, poly([[520, 370], [900, 370], [1400, 760], [480, 760]]));
    shape(ctx, 'rgba(120,90,50,.35)', 0, c => { c.moveTo(560, 760); c.quadraticCurveTo(700, 520, 690, 372); c.lineTo(700, 372); c.quadraticCurveTo(740, 520, 760, 760); c.closePath(); });
    for (let i = 0; i < 26; i++) { const x = 520 + (i * 53) % 420, y = 420 + (i * 71) % 330, sw = Math.sin(t * 1.4 + i) * 3; line(ctx, [[x, y], [x - 4 + sw, y - 18 * (y / 600)]], 3, '#7f9a42'); }
    // the right: salt marsh and the creek (today's Broad Street) winding down to the water; oyster beds at its mouth
    shape(ctx, grad(ctx, 0, 360, 0, 760, [[0, '#a8b878'], [1, '#7f9a52']]), 0, poly([[760, 355], [1400, 340], [1400, 760], [1000, 760]]));
    shape(ctx, grad(ctx, 0, 360, 0, 760, [[0, '#6fc0d0'], [1, '#3e9ab8']]), 3.5, c => { c.moveTo(800, 352); c.quadraticCurveTo(900, 420, 960, 470); c.quadraticCurveTo(1080, 560, 1100, 760); c.lineTo(1300, 760); c.quadraticCurveTo(1200, 560, 1050, 460); c.quadraticCurveTo(960, 400, 850, 350); c.closePath(); });
    for (let i = 0; i < 5; i++) { const y = 420 + i * 70, x = 930 + i * 52 + Math.sin(t + i) * 6; line(ctx, [[x, y], [x + 26, y]], 3, 'rgba(255,255,255,.6)'); }
    for (let i = 0; i < 9; i++) shape(ctx, '#b8b0a4', 2, ellipse(820 + i * 16, 358 + (i % 2) * 5, 8, 4));
    for (let i = 0; i < 46; i++) { const x = 760 + (i * 61) % 640, y = 380 + (i * 37) % 380, h = (26 + (i * 17) % 60) * (y / 520), sw = Math.sin(t * 1.3 + i) * 4; if (Math.abs(x - (900 + (y - 360) * .7)) < 80) continue;
      line(ctx, [[x, y], [x + sw, y - h]], 4, i % 2 ? '#6f7f34' : '#5a6a2a'); if (i % 4 === 0) shape(ctx, '#8a5a34', 2, ellipse(x + sw, y - h - 8, 4, 10)); }
    // a heron standing in the shallows, ducks on the creek
    { const hx = 1180, hy = 640; line(ctx, [[hx - 6, hy], [hx - 4, hy - 50]], 3, '#5a5a5a'); line(ctx, [[hx + 6, hy], [hx + 4, hy - 50]], 3, '#5a5a5a'); shape(ctx, '#b8c4cc', 3, ellipse(hx, hy - 64, 26, 16, -.3)); line(ctx, [[hx + 16, hy - 74], [hx + 22, hy - 104], [hx + 30, hy - 112]], 6, '#b8c4cc'); shape(ctx, '#e8a83a', 2, poly([[hx + 30, hy - 116], [hx + 50, hy - 110], [hx + 30, hy - 108]])); }
    for (const [dx, dy] of [[0, 0], [40, 14]]) { const x = 1000 + dx + Math.sin(t * .6) * 10, y = 520 + dy; shape(ctx, '#8a7a6a', 2.5, ellipse(x, y, 14, 7)); shape(ctx, '#2f6a4a', 2.5, circle(x + 12, y - 9, 6)); }
  }

  // ---------------- today's city ----------------
  // [s0, s1, top (near-plane Y), colour, kind]  kind: fed | nyse | stone | glass | deco
  const LEFT = [[1.3, .97, -1200, '#c8bca8', 'stone'], [.97, .6, -1400, '#d8cbb0', 'fed'], [.6, .5, -900, '#cfc6b8', 'deco'], [.5, .38, -1500, '#9fc0dc', 'glass'], [.38, .27, -700, '#d8c0a0', 'stone'], [.27, .19, -1300, '#a9b6c4', 'deco'], [.19, END, -900, '#c8bca8', 'stone']];
  const RIGHT = [[1.0, .74, -700, '#e6dcc8', 'nyse'], [.74, .52, -1600, '#b4bec8', 'deco'], [.52, .36, -1100, '#d4c4a8', 'stone'], [.36, .25, -1700, '#8fb4d4', 'glass'], [.25, END, -1000, '#cdbfa8', 'stone']];
  const SHOPS = [['DELI', '#c8322a'], ['CAFE', '#2f7a46'], ['BANK', '#2f4a7a'], ['PHARMACY', '#2f8a9a'], ['BOOKS', '#8a5a34'], ['SHOES', '#7a3a8a'], ['PIZZA', '#d8642a']];
  function facade(ctx, side, s0, s1, top, col, kind, o, idx) {
    const Xs = X(side), gy = 760;
    shape(ctx, col, 4, fq(side, s0, s1, top, gy));
    ctx.save(); ctx.beginPath(); fq(side, s0, s1, top, gy)(ctx); ctx.clip();
    const n = Math.max(2, Math.round((s0 - s1) * 22));
    if (kind === 'glass') { // a modern glass tower: blue curtain wall with mullions and a sky reflection
      shape(ctx, grad(ctx, Xs(s0), 0, Xs(s1), 0, [[0, '#7fb4dc'], [.5, '#bfe0f4'], [1, '#6a9cc8']]), 0, fq(side, s0, s1, top, gy - 150));
      for (let k = 0; k <= n * 2; k++) { const sa = lerp(s0, s1, k / (n * 2)); line(ctx, [[Xs(sa), PY(top, sa)], [Xs(sa), PY(gy - 150, sa)]], 2, 'rgba(40,70,100,.45)'); }
      for (let Y = gy - 190; Y > top; Y -= 70) line(ctx, [[Xs(s0), PY(Y, s0)], [Xs(s1), PY(Y, s1)]], 2, 'rgba(40,70,100,.45)');
      shape(ctx, 'rgba(255,255,255,.35)', 0, poly([[Xs(lerp(s0, s1, .2)), PY(top, lerp(s0, s1, .2))], [Xs(lerp(s0, s1, .35)), PY(top, lerp(s0, s1, .35))], [Xs(lerp(s0, s1, .55)), PY(gy - 150, lerp(s0, s1, .55))], [Xs(lerp(s0, s1, .4)), PY(gy - 150, lerp(s0, s1, .4))]]));
    } else if (kind !== 'fed') {
      const fl = Math.floor((gy - 200 - top) / 110);
      for (let f = 0; f < fl; f++) { const Y = gy - 200 - f * 110; line(ctx, [[Xs(s0), PY(Y, s0)], [Xs(s1), PY(Y, s1)]], f % 3 === 0 ? 5 : 2, f % 3 === 0 ? 'rgba(90,70,50,.35)' : 'rgba(40,50,60,.22)'); }
      for (let k = 0; k < n; k++) { const sa = lerp(s0, s1, (k + .22) / n), sb = lerp(s0, s1, (k + .7) / n);
        if (kind === 'deco' && k % 2 === 0) shape(ctx, 'rgba(255,255,255,.18)', 0, fq(side, lerp(s0, s1, k / n), lerp(s0, s1, (k + .15) / n), top, gy - 150));   // art-deco piers
        for (let f = 0; f < fl; f++) { const Y0 = gy - 270 - f * 110, Y1 = Y0 + 66, lit = o.lit ? (k + f) % 5 === 0 : (k * 3 + f) % 7 === 0;
          shape(ctx, lit ? '#ffd27a' : (k + f) % 4 ? '#5a7894' : '#86acc8', 0, fq(side, sa, sb, Y0, Y1));
          if (kind === 'stone') { shape(ctx, 'rgba(255,255,255,.35)', 0, fq(side, sa - .004, sb + .004, Y1, Y1 + 6)); if (f % 2) shape(ctx, 'rgba(90,70,50,.3)', 0, fq(side, sa, sb, Y0 - 12, Y0)); }
          shape(ctx, 'rgba(255,255,255,.25)', 0, fq(side, sa, lerp(sa, sb, .3), Y0, Y1)); } }
      // the cornice line at the top and a darker stone base
      shape(ctx, 'rgba(60,40,30,.35)', 0, fq(side, s0, s1, top, top + 26));
    }
    // ground floor: shopfronts with awnings and signs (all but the landmarks)
    if (kind !== 'fed' && kind !== 'nyse') { const sh = SHOPS[(idx * 3 + (side > 0 ? 2 : 0)) % SHOPS.length];
      shape(ctx, 'rgba(60,50,40,.35)', 0, fq(side, s0, s1, gy - 160, gy));
      for (let k = 0; k < Math.max(1, Math.round(n / 2)); k++) { const m2 = Math.max(1, Math.round(n / 2)), sa = lerp(s0, s1, (k + .1) / m2), sb = lerp(s0, s1, (k + .85) / m2);
        shape(ctx, '#3a5a7a', 2.5, fq(side, sa, sb, gy - 130, gy - 10)); shape(ctx, 'rgba(255,230,170,.35)', 0, fq(side, sa, lerp(sa, sb, .5), gy - 120, gy - 20));
        shape(ctx, k % 2 ? sh[1] : '#f4efe2', 2.5, fq(side, sa, sb, gy - 162, gy - 134)); }
      const sm = (s0 + s1) / 2; ctx.save(); ctx.translate(Xs(sm), PY(gy - 186, sm)); const sc = sm * 1.1; ctx.scale(sc, sc); shape(ctx, sh[1], 3, rect(-60, -16, 120, 30, 4)); txt(ctx, sh[0], 0, 0, 18); ctx.restore(); }
    ctx.restore();
    if (kind === 'fed') federalHall(ctx, o);
    if (kind === 'nyse') nyse(ctx, s0, s1, o);
  }
  function federalHall(ctx, o) { // the portico on the left: pediment, frieze, eight Doric columns, steps, banners, Washington's statue
    const s0 = .94, s1 = .63, Xs = LX;
    shape(ctx, '#3a3028', 0, fq(-1, s0, s1, 240, 640));                                                          // the shadowed wall behind the columns
    for (let k = 0; k < 3; k++) { const sa = lerp(s0, s1, .2 + k * .3); shape(ctx, '#5a3a2a', 2.5, fq(-1, sa, sa - .05, 430, 640)); }   // doors
    shape(ctx, '#e8dcc4', 4, fq(-1, s0, s1, 160, 240)); for (let k = 0; k < 22; k++) { const sa = lerp(s0, s1, k / 22); shape(ctx, '#cfc2a6', 0, fq(-1, sa, sa - .006, 170, 186)); }   // frieze with dentils
    shape(ctx, '#d8cbb0', 3.5, fq(-1, s0, s1, 120, 160));
    shape(ctx, '#e8dcc4', 4, poly([[Xs(s0), PY(120, s0)], [Xs(s1), PY(120, s1)], [Xs((s0 + s1) / 2), PY(10, (s0 + s1) / 2)]]));                // pediment
    shape(ctx, '#d8cbb0', 0, poly([[Xs(s0) + 20, PY(112, s0)], [Xs(s1) - 6, PY(114, s1)], [Xs((s0 + s1) / 2), PY(36, (s0 + s1) / 2)]]));
    for (let k = 0; k < 8; k++) { const sa = lerp(s0, s1, k / 7.4); const w = 46 * sa;
      shape(ctx, '#f2e8d4', 3.5, poly([[Xs(sa) - w / 2, PY(240, sa)], [Xs(sa) + w / 2, PY(240, sa)], [Xs(sa) + w / 2, PY(640, sa)], [Xs(sa) - w / 2, PY(640, sa)]]));
      shape(ctx, '#e0d4bc', 3, rect(Xs(sa) - w * .65, PY(240, sa) - 4, w * 1.3, 12 * sa));
      for (const f of [-.25, 0, .25]) line(ctx, [[Xs(sa) + f * w, PY(256, sa)], [Xs(sa) + f * w, PY(630, sa)]], 1.5, 'rgba(120,100,70,.35)');
      shape(ctx, 'rgba(255,255,255,.25)', 0, rect(Xs(sa) - w * .4, PY(250, sa), w * .18, PY(630, sa) - PY(250, sa))); }
    // star-spangled bunting between the columns
    for (let k = 0; k < 7; k++) { const sa = lerp(s0, s1, (k + .5) / 7.4), w = 46 * sa * 2.2; shape(ctx, '#c8322a', 0, c => { c.moveTo(Xs(sa) - w / 2, PY(250, sa)); c.quadraticCurveTo(Xs(sa), PY(310, sa), Xs(sa) + w / 2, PY(250, sa)); c.closePath(); });
      shape(ctx, '#fff', 0, c => { c.moveTo(Xs(sa) - w / 2, PY(250, sa)); c.quadraticCurveTo(Xs(sa), PY(292, sa), Xs(sa) + w / 2, PY(250, sa)); c.closePath(); }); shape(ctx, '#2a3a7a', 0, c => { c.moveTo(Xs(sa) - w / 2, PY(250, sa)); c.quadraticCurveTo(Xs(sa), PY(274, sa), Xs(sa) + w / 2, PY(250, sa)); c.closePath(); }); }
    for (let k = 0; k < 5; k++) shape(ctx, k % 2 ? '#d8cbb0' : '#e6dac2', 3, poly([[Xs(s0) + k * 20, PY(640 + k * 24, s0)], [Xs(s1) + k * 4, PY(640 + k * 24, s1)], [Xs(s1) + k * 4, PY(664 + k * 24, s1)], [Xs(s0) + k * 20, PY(664 + k * 24, s0)]]));
    // tourists sitting on the steps
    for (const [sa, c, v] of [[.8, '#c8322a', 1], [.72, '#2f8a9a', 4], [.67, '#e8c14a', 2]]) person(ctx, Xs(sa) + 40 * sa, PY(700, sa), sa * 1.1, c, { v });
    // George Washington's statue (J. Q. A. Ward, 1883) on its granite pedestal in front of the steps
    const sx = 250, sy = 700; shape(ctx, '#c8bca4', 4, rect(sx - 46, sy - 120, 92, 120)); shape(ctx, '#e6dac2', 3.5, rect(sx - 54, sy - 134, 108, 18)); shape(ctx, '#e6dac2', 3.5, rect(sx - 52, sy - 10, 104, 14));
    shape(ctx, '#b8a888', 2, rect(sx - 26, sy - 86, 52, 30, 3)); for (let i = 0; i < 3; i++) line(ctx, [[sx - 18, sy - 78 + i * 8], [sx + 18, sy - 78 + i * 8]], 2, 'rgba(60,50,40,.4)');
    const BR = '#4f7a66';
    shape(ctx, BR, 4, c => { c.moveTo(sx - 34, sy - 134); c.lineTo(sx - 38, sy - 200); c.quadraticCurveTo(sx - 30, sy - 238, sx, sy - 244); c.quadraticCurveTo(sx + 30, sy - 238, sx + 34, sy - 200); c.lineTo(sx + 30, sy - 134); c.closePath(); });   // cloak
    shape(ctx, '#5e8a74', 3, c => { c.moveTo(sx - 14, sy - 134); c.lineTo(sx - 16, sy - 226); c.lineTo(sx + 16, sy - 226); c.lineTo(sx + 14, sy - 134); c.closePath(); });
    line(ctx, [[sx + 22, sy - 220], [sx + 54, sy - 196], [sx + 70, sy - 202]], 10, BR);                                       // the outstretched right hand
    shape(ctx, BR, 4, circle(sx, sy - 262, 20)); shape(ctx, '#3f6a56', 0, c => { c.moveTo(sx - 20, sy - 266); c.quadraticCurveTo(sx - 18, sy - 284, sx, sy - 284); c.quadraticCurveTo(sx + 18, sy - 284, sx + 20, sy - 266); c.closePath(); });
    shape(ctx, 'rgba(255,255,255,.22)', 0, ellipse(sx - 14, sy - 200, 6, 34)); glow(ctx, sx, sy - 230, 70, 'rgba(255,240,200,.2)');
  }
  function nyse(ctx, s0, s1, o) { // the Stock Exchange's Wall Street side: columns, a giant hanging flag, the name over the door
    const Xs = RX;
    shape(ctx, '#d8ccb6', 0, fq(1, s0, s1, 600, 760));
    for (let k = 0; k < 6; k++) { const sa = lerp(s0 - .02, s1 + .02, k / 5), w = 40 * sa; shape(ctx, '#f2e8d4', 3, poly([[Xs(sa) - w / 2, PY(110, sa)], [Xs(sa) + w / 2, PY(110, sa)], [Xs(sa) + w / 2, PY(600, sa)], [Xs(sa) - w / 2, PY(600, sa)]])); }
    shape(ctx, '#e8dcc4', 4, fq(1, s0, s1, 40, 110)); shape(ctx, '#cfc2a6', 3, fq(1, s0, s1, -30, 40));
    // the big flag hangs between the columns
    const fa = s0 - .05, fb = s1 + .07, wv = Math.sin((o.tf || 0) * 1.6) * .006;
    for (let r = 0; r < 13; r++) shape(ctx, r % 2 ? '#fff' : '#c8322a', 0, fq(1, fa + wv, fb + wv, 130 + r * 26, 156 + r * 26));
    shape(ctx, '#2a3a7a', 0, fq(1, fa + wv, lerp(fa, fb, .42) + wv, 130, 312)); for (let i = 0; i < 12; i++) { const sa = lerp(fa, lerp(fa, fb, .42), (i % 4 + .5) / 4) + wv; shape(ctx, '#fff', 0, circle(Xs(sa), PY(160 + Math.floor(i / 4) * 52, sa), 4 * sa)); }
    ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.beginPath(); fq(1, fa + wv, fb + wv, 130, 468)(ctx); ctx.stroke(); ctx.restore();
        shape(ctx, '#3a3028', 2.5, fq(1, lerp(s0, s1, .35), lerp(s0, s1, .6), 640, 760));
  }
  function streetSign(ctx, x, a) { ctx.save(); ctx.globalAlpha = a; line(ctx, [[x, 760], [x, 140]], 12, '#2f3a34'); line(ctx, [[x, 760], [x, 140]], 3, INK);
    shape(ctx, '#2f7a46', 3.5, rect(x - 120, 160, 150, 40, 4)); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(x - 116, 164, 142, 32); txt(ctx, 'WALL ST', x - 45, 181, 22);
    shape(ctx, '#2f7a46', 3.5, rect(x - 20, 212, 150, 40, 4)); ctx.strokeRect(x - 16, 216, 142, 32); txt(ctx, 'BROAD ST', x + 55, 233, 22);
    shape(ctx, '#2a2a30', 3.5, rect(x - 18, 290, 36, 100, 6)); for (let i = 0; i < 3; i++) { shape(ctx, ['#e04a3a', '#3a3a30', '#3a3a30'][i], 2, circle(x, 310 + i * 30, 10)); } glow(ctx, x, 310, 30, 'rgba(255,90,60,.4)');
    shape(ctx, '#2a2a30', 3, rect(x + 16, 420, 60, 46, 4)); shape(ctx, '#f4efe2', 0, circle(x + 34, 432, 6)); line(ctx, [[x + 30, 442], [x + 38, 456], [x + 30, 462]], 4, '#f4efe2'); txt(ctx, 'WALK', x + 58, 444, 11, '#f4efe2');
    ctx.restore(); }
  function taxi(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.2)', 0, ellipse(0, 4, 66, 8)); shape(ctx, '#f2c232', 3.5, rect(-60, -40, 120, 34, 8)); shape(ctx, '#f2c232', 3.5, rect(-36, -64, 72, 28, 8));
    shape(ctx, '#9ac8e0', 2.5, rect(-28, -58, 56, 18, 4)); shape(ctx, '#f4efe2', 2, rect(-14, -76, 28, 12, 3)); txt(ctx, 'TAXI', 0, -70, 8, '#1d1a17'); line(ctx, [[-56, -24], [56, -24]], 3, '#1d1a17'); shape(ctx, '#ffe9a8', 2, circle(-50, -30, 5)); shape(ctx, '#ffe9a8', 2, circle(50, -30, 5));
    shape(ctx, '#2a2a30', 3, circle(-36, -6, 12)); shape(ctx, '#2a2a30', 3, circle(36, -6, 12)); ctx.restore(); }
  function truck(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#f4efe2', 3.5, rect(-70, -110, 110, 100, 4)); shape(ctx, '#2f7a8a', 3.5, rect(40, -70, 42, 60, 6)); shape(ctx, '#9ac8e0', 2, rect(48, -64, 26, 22, 3));
    shape(ctx, '#2f7a8a', 0, rect(-64, -60, 98, 14)); shape(ctx, '#2a2a30', 3, circle(-40, -6, 13)); shape(ctx, '#2a2a30', 3, circle(56, -6, 13)); ctx.restore(); }
  function lampPost(ctx, x, y, s, side) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, [[0, 0], [0, -300]], 10, '#2a3a34'); line(ctx, [[0, -300], [0, -330], [side * -40, -340]], 7, '#2a3a34'); shape(ctx, '#2a3a34', 2, rect(-12, -12, 24, 12, 3));
    shape(ctx, '#f4efe2', 3, poly([[side * -52, -340], [side * -28, -340], [side * -32, -318], [side * -48, -318]])); ctx.restore(); }
  function subwayEntrance(ctx, s, side) { const x = X(side)(s) - side * 330 * s, y = PY(760, s); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#3a3a40', 0, rect(-110, -6, 220, 16)); line(ctx, [[-110, -70], [110, -70]], 7, '#2f5a3a'); for (const d of [-110, 110]) { line(ctx, [[d, 0], [d, -70]], 7, '#2f5a3a'); line(ctx, [[d, -70], [d, -150]], 6, '#2f5a3a'); shape(ctx, '#7adca0', 3, circle(d, -164, 16)); glow(ctx, d, -164, 30, 'rgba(140,240,170,.45)'); }
    for (let i = 0; i < 9; i++) line(ctx, [[-110 + i * 27, -66], [-110 + i * 27, -6]], 2.5, '#2f5a3a'); shape(ctx, '#1d1a17', 2, rect(-60, -110, 120, 26, 4)); txt(ctx, 'SUBWAY', 0, -97, 15, '#fff');
    for (let i = 0; i < 4; i++) shape(ctx, ['#e04a3a', '#2f6aa8', '#f2a03a', '#2f8a46'][i], 1.5, circle(-36 + i * 24, -126, 9)); ctx.restore(); }
  function cart(ctx, s, side, t) { const x = X(side)(s) - side * 360 * s, y = PY(760, s); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#d8dce0', 3.5, rect(-80, -120, 160, 100, 6)); shape(ctx, '#c8322a', 0, rect(-80, -86, 160, 18)); txt(ctx, 'COFFEE · BAGELS', 0, -104, 13, '#2a2a30'); shape(ctx, '#2a2a30', 3, circle(-50, -14, 14)); shape(ctx, '#2a2a30', 3, circle(50, -14, 14));
    line(ctx, [[0, -120], [0, -190]], 5, '#5a5a60'); shape(ctx, '#f2c232', 3.5, c => { c.moveTo(-100, -186); c.quadraticCurveTo(0, -250, 100, -186); c.closePath(); }); for (let i = -2; i <= 2; i++) line(ctx, [[0, -230], [i * 50, -186]], 2, 'rgba(120,80,0,.4)');
    for (let k = 0; k < 3; k++) { const p = (t * .5 + k / 3) % 1; ctx.save(); ctx.globalAlpha = .4 * (1 - p); shape(ctx, '#fff', 0, circle(-30 + k * 20, -130 - p * 60, 8 + p * 10)); ctx.restore(); } ctx.restore(); }
  function steam(ctx, s, u, t) { const x = VX + u * s, y = PY(760, s); shape(ctx, '#5a5a60', 2, ellipse(x, y, 34 * s, 10 * s)); shape(ctx, '#e8642a', 2, rect(x - 8 * s, y - 120 * s, 16 * s, 120 * s, 4)); for (let i = 0; i < 4; i++) shape(ctx, i % 2 ? '#fff' : '#e8642a', 0, rect(x - 8 * s, y - (110 - i * 26) * s, 16 * s, 10 * s));
    for (let k = 0; k < 5; k++) { const p = (t * .35 + k / 5) % 1; ctx.save(); ctx.globalAlpha = .45 * (1 - p); shape(ctx, '#f4f4f8', 0, circle(x + Math.sin(p * 5 + k) * 20 * s, y - (130 + p * 260) * s, (18 + p * 40) * s)); ctx.restore(); } }
  function bollards(ctx, side) { for (let k = 0; k < 14; k++) { const s = lerp(.95, .2, k / 13), x = VX + side * 455 * s, y = PY(760, s); shape(ctx, '#3a3a40', 2.5, rect(x - 9 * s, y - 60 * s, 18 * s, 60 * s, 4 * s)); shape(ctx, '#c8b060', 0, rect(x - 9 * s, y - 50 * s, 18 * s, 6 * s)); } }
  function farEnd(ctx, t, tf) { // the slot at the end of the street: East River, a ferry and a tug, Brooklyn's waterfront, a plane
    const yL = PY(760, END), xa = LX(END) - 20, xb = RX(END) + 20;
    shape(ctx, '#7aa0a8', 0, rect(xa, yL - 46, xb - xa, 20)); for (let i = 0; i < 9; i++) shape(ctx, ['#c8a888', '#a8b8c8', '#d8c0a0'][i % 3], 0, rect(xa + i * 22, yL - 46 - 10 - (i * 13) % 26, 18, 10 + (i * 13) % 26));
    shape(ctx, grad(ctx, 0, yL - 28, 0, yL, [[0, '#4fa8c8'], [1, '#2f86a8']]), 0, rect(xa, yL - 28, xb - xa, 28)); for (let i = 0; i < 5; i++) line(ctx, [[xa + ((i * 40 + tf * 8) % (xb - xa)), yL - 18 + (i % 2) * 8], [xa + ((i * 40 + tf * 8) % (xb - xa)) + 10, yL - 18 + (i % 2) * 8]], 1.5, 'rgba(255,255,255,.6)');
    const fx = xa + ((tf * 6) % (xb - xa + 60)) - 30; shape(ctx, '#f4efe2', 1.5, rect(fx - 16, yL - 26, 32, 8, 2)); shape(ctx, '#2f6aa8', 0, rect(fx - 16, yL - 20, 32, 3)); shape(ctx, '#f4efe2', 1, rect(fx - 8, yL - 32, 16, 6, 2));
    const gx = xb - ((tf * 4) % (xb - xa + 40)); shape(ctx, '#c8322a', 1.5, rect(gx - 8, yL - 16, 16, 6, 2)); shape(ctx, '#f4efe2', 1, rect(gx - 3, yL - 22, 6, 6));
    const px = ((tf * 30) % 900) - 100; if (px > xa && px < xb) { line(ctx, [[px - 10, 230], [px + 10, 226]], 3, '#5a5a60'); line(ctx, [[px - 2, 222], [px + 2, 234]], 2, '#5a5a60'); }
  }

  function corner(ctx, t, o = {}) {
    const m = o.m || 0, cityA = 1 - ease.inOut(clamp(m * 1.25)), sink = ease.in(clamp(m)) * 700, tf = o.freeze != null ? Math.min(t, o.freeze) : t;
    const light = o.light || 0; o.tf = tf;
    // the sky, whole (most of it hidden by towers today); the morning sun rises over the East River, straight down the street
    shape(ctx, grad(ctx, 0, -100, 0, 380, [[0, light ? '#f0a86a' : '#5fb2e8'], [.7, light ? '#ffd9a0' : '#b8e2f4'], [1, '#ffeec8']]), 0, rect(-200, -200, 1700, 600));
    glow(ctx, VX, 300, 360, 'rgba(255,240,200,.55)');
    for (let i = 0; i < 3; i++) { const x = ((i * 260 + t * 6) % 900) + 180; shape(ctx, '#fff8ee', 2.5, smooth([[x - 50, 150 + i * 30], [x - 20, 130 + i * 30], [x + 20, 126 + i * 30], [x + 50, 146 + i * 30], [x, 158 + i * 30]])); }
    if (o.sky) o.sky(ctx);
    land1609(ctx, t, o);
    if (cityA > 0) { ctx.save(); ctx.globalAlpha = cityA; ctx.translate(0, sink);
      farEnd(ctx, t, tf);
      // the street: asphalt, lane lines, a crosswalk, manholes; the sidewalks with curbs
      shape(ctx, grad(ctx, 0, PY(760, END), 0, 760, [[0, '#9a9ea6'], [1, '#7a7e86']]), 0, gq(END, 1, -455, 455));
      for (let i = 0; i < 40; i++) { const s = lerp(.2, 1, (i * 37 % 40) / 40), u = ((i * 71) % 800) - 400; shape(ctx, 'rgba(60,60,70,.25)', 0, ellipse(VX + u * s, PY(760, s), 10 * s, 3 * s)); }
      shape(ctx, grad(ctx, 0, PY(760, END), 0, 760, [[0, '#e0dacc'], [1, '#cfc8ba']]), 3, gq(END, 1.05, -740, -455)); shape(ctx, grad(ctx, 0, PY(760, END), 0, 760, [[0, '#e0dacc'], [1, '#cfc8ba']]), 3, gq(END, 1.05, 455, 740));
      for (let k = 1; k < 16; k++) { const s = lerp(1, END, Math.pow(k / 16, .6)); line(ctx, [[LX(s), PY(760, s)], [VX - 455 * s, PY(760, s)]], 1.5, 'rgba(120,110,95,.4)'); line(ctx, [[RX(s), PY(760, s)], [VX + 455 * s, PY(760, s)]], 1.5, 'rgba(120,110,95,.4)'); }
      shape(ctx, '#b8b0a2', 0, gq(END, 1.05, -470, -455)); shape(ctx, '#b8b0a2', 0, gq(END, 1.05, 455, 470));
      for (let k = 0; k < 9; k++) { const s0 = lerp(.95, .18, k / 8), s1 = s0 - .04; shape(ctx, '#f4f0e0', 0, gq(s1, s0, -6, 6)); }
      for (let k = 0; k < 7; k++) shape(ctx, '#f4f0e6', 0, gq(.93, .99, -330 + k * 100, -270 + k * 100));
      for (const [s, u] of [[.7, -150], [.42, 180]]) { shape(ctx, '#5a5a60', 2.5, ellipse(VX + u * s, PY(760, s), 40 * s, 12 * s)); line(ctx, [[VX + (u - 24) * s, PY(760, s)], [VX + (u + 24) * s, PY(760, s)]], 1.5, 'rgba(255,255,255,.3)'); }
      // morning light down the street
      ctx.save(); ctx.globalAlpha = .22; shape(ctx, '#fff2c8', 0, poly([[VX - 60, PY(760, END)], [VX + 60, PY(760, END)], [VX + 420, 760], [VX - 420, 760]])); ctx.restore();
      RIGHT.slice(1).forEach((b, i) => facade(ctx, 1, ...b, o, i + 1)); LEFT.slice(2).forEach((b, i) => facade(ctx, -1, ...b, o, i + 2)); facade(ctx, -1, ...LEFT[0], o, 0); facade(ctx, -1, ...LEFT[1], o, 1); facade(ctx, 1, ...RIGHT[0], o, 0);
      bollards(ctx, -1); bollards(ctx, 1);
      for (const s of [.8, .5, .32, .22]) { lampPost(ctx, VX - 475 * s, PY(760, s), s, -1); lampPost(ctx, VX + 475 * s, PY(760, s), s, 1); }
      steam(ctx, .55, 60, tf);
      subwayEntrance(ctx, .42, -1); cart(ctx, .5, 1, tf);
      // traffic: yellow cabs and a delivery truck coming and going, a bike courier
      if (!o.empty) { for (let i = 0; i < 4; i++) { const p = ((tf * .1 + i / 4) % 1), s = lerp(.16, .78, i % 2 ? p : 1 - p); taxi(ctx, VX + (i % 2 ? -1 : 1) * 200 * s, PY(760, s) - 4 * s, s); }
        { const p = (tf * .05) % 1, s = lerp(.2, .62, p); truck(ctx, VX - 230 * s, PY(760, s), s); }
        { const p = (tf * .09 + .4) % 1, s = lerp(.85, .2, p), bx = VX + 90 * s, by = PY(760, s); ctx.save(); ctx.translate(bx, by); ctx.scale(s, s); for (const d of [-26, 26]) { ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(d, -18, 18, 0, 7); ctx.stroke(); }
          line(ctx, [[-26, -18], [0, -40], [26, -18]], 4, '#c8322a'); person(ctx, 0, -34, .9, '#e8642a', { v: 3, step: Math.sin(tf * 9) }); shape(ctx, '#2f7a46', 2.5, rect(-24, -96, 30, 26, 4)); ctx.restore(); } }
      // commuters on both sidewalks, with long morning shadows
      if (!o.empty) { const cr = o.crowd ?? 1, cols = ['#3a4a6a', '#6a3a3a', '#2f2f3a', '#7a6a4a', '#4a6a5a', '#8a8a94', '#c8642a', '#2f6a8a', '#8a3a5a'], ppl = [];
        for (let i = 0; i < Math.round(34 * cr); i++) { const side = i % 2 ? -1 : 1, dir = i % 3 ? 1 : -1, p = ((tf * (.045 + (i % 4) * .012) * dir + i * .137) % 1 + 1) % 1, s = lerp(.2, 1.05, p);
          const x = VX + side * (520 + (i % 3) * 60 + (i % 5) * 14) * s; if (side < 0 && s > .78) continue; ppl.push([s, x, i, side]); }
        ppl.sort((a, b) => a[0] - b[0]).forEach(([s, x, i]) => person(ctx, x, PY(760, s) - 12 * s, s * 1.5, cols[i % cols.length], { v: i, step: Math.sin(tf * 7 + i), bag: i % 4 === 0, cup: i % 5 === 1, phone: i % 7 === 3, shadow: true })); }
      ctx.restore(); }
    if (o.grey) { ctx.save(); ctx.globalAlpha = o.grey * .5; shape(ctx, '#8a8a90', 0, rect(0, 0, W, H)); ctx.restore(); }
    if (cityA > 0) streetSign(ctx, 1150, cityA);
  }

  // where you are: a small map of the southern tip of Manhattan with Wall St, Broad St and a pin at the corner
  function whereMap(ctx, x, y, k, t) { if (k <= 0) return; const s = FX.settle(clamp(k / .4)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(.03);
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-124, -104, 256, 216, 8)); shape(ctx, '#fbf6ea', 4.5, rect(-130, -110, 256, 216, 8)); ctx.save(); ctx.beginPath(); ctx.rect(-118, -98, 232, 168); ctx.clip();
    shape(ctx, '#7cc0dc', 0, rect(-118, -98, 232, 168));
    const L = ([lon, lat]) => [(lon + 74.0095) * 9000, -(lat - 40.7065) * 11500];
    shape(ctx, '#efe6cc', 3, poly([[-74.03, 40.72], [-74.0165, 40.7165], [-74.0158, 40.7085], [-74.0175, 40.7045], [-74.016, 40.7012], [-74.0128, 40.7003], [-74.0085, 40.7022], [-74.0035, 40.7052], [-73.9985, 40.7088], [-73.995, 40.712], [-73.99, 40.72]].map(L)));
    for (const seg of [[[-74.0118, 40.7077], [-74.0057, 40.7046]], [[-74.0108, 40.7069], [-74.0118, 40.7028]], [[-74.0135, 40.7125], [-74.0138, 40.7045]]]) line(ctx, seg.map(L), 4, '#c8b898');
    line(ctx, [[-74.0118, 40.7077], [-74.0057, 40.7046]].map(L), 5, '#d8a83a');
    const [px, py] = L([-74.0109, 40.7069]); glow(ctx, px, py, 26 + Math.sin(t * 4) * 4, 'rgba(255,80,60,.5)'); shape(ctx, '#c8322a', 3, c => { c.moveTo(px, py); c.bezierCurveTo(px - 12, py - 16, px - 10, py - 30, px, py - 30); c.bezierCurveTo(px + 10, py - 30, px + 12, py - 16, px, py); c.closePath(); });
    ctx.restore(); txt(ctx, 'YOU ARE HERE', -2, 88, 18, '#c8322a', 800); txt(ctx, 'WALL ST', 50, -40, 12, '#5a4a38'); txt(ctx, 'EAST RIVER', 70, 40, 11, '#2f5a7a'); txt(ctx, 'HUDSON', -94, 40, 11, '#2f5a7a'); ctx.restore(); }

  // the Harbor — the one character who never leaves (a cousin of the Venice lagoon, in New York harbor green-blue)
  function harbor(ctx, x, y, w, t, o = {}) { ctx.save(); ctx.filter = 'hue-rotate(-14deg) saturate(1.15)'; G.Venice.lagoon(ctx, x, y, w, t, o); ctx.restore(); }

  G.NYC = Object.assign(G.NYC || {}, { corner, land1609, person, taxi, harbor, whereMap, VX, VY, LX, RX, PY });
})(window);
