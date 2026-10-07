/* Props and supporting figures for the Houdini opening, drawn to match the
 * supplied art (black outlines, flat fills) but with real lighting: gradients,
 * highlights, rim light and cast shadows. All original drawings. */
(function (G) {
  'use strict';
  const T = G.Toon, { shape, poly, rect, circle, ellipse, smooth, line, grad, rng, lerp, clamp } = T;
  const LINE = T.LINE;

  const PAL = {
    skin: '#e8a676', skinShade: '#c98458', gown: '#d4cec2', sheet: '#e9e2d2', blanket: '#97a6a2',
    steel: '#a9b1b6', steelHi: '#eef3f5', steelLo: '#5d656b', gold: '#c9a14a', goldHi: '#f4dc8e', goldLo: '#7d5f22',
    wood: '#7a5a40', woodHi: '#9a7656', woodLo: '#4e3828', brick: '#8c5b4a',
  };

  // ---------- metal ----------
  // Shaded metal stroke along the current path: outline, base, low edge, highlight.
  function metalStroke(ctx, path, w, base = PAL.steel, hi = PAL.steelHi, lo = PAL.steelLo) {
    const s = (lw, c, dx = 0, dy = 0) => { ctx.save(); ctx.translate(dx, dy); ctx.beginPath(); path(ctx); ctx.lineWidth = lw; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); };
    s(w + 6, LINE); s(w, base); s(w * .45, lo, w * .18, w * .22); s(w * .3, hi, -w * .15, -w * .2);
  }
  // A handcuff band wrapped around a wrist: only the near half is drawn, so
  // the band reads as going around the arm. axis = forearm direction (rad).
  function cuffBand(ctx, x, y, rx, axis, opts = {}) {
    const ry = rx * .36, rot = axis + Math.PI / 2;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    T.shadow(ctx, 0, ry * 1.4, rx * 1.05, ry * .9, .35, 5);
    const open = opts.open || 0;
    if (open > 0) { // swing arm opening around the hinge at +rx
      metalStroke(ctx, c => c.ellipse(0, 0, rx, ry, 0, 0, Math.PI), 9);
      ctx.save(); ctx.translate(rx, 0); ctx.rotate(-open * 1.6); ctx.translate(-rx, 0);
      metalStroke(ctx, c => c.ellipse(0, 0, rx, ry, 0, Math.PI, Math.PI * 1.9), 9);
      ctx.restore();
    } else {
      metalStroke(ctx, c => c.ellipse(0, 0, rx, ry, 0, -.15, Math.PI + .15), 10);
    }
    // lock box with keyhole
    ctx.save(); ctx.translate(-rx * .15, ry * .95);
    shape(ctx, grad(ctx, 0, -12, 0, 12, [[0, PAL.steelHi], [.5, PAL.steel], [1, PAL.steelLo]]), 3, rect(-18, -12, 36, 24, 4));
    ctx.fillStyle = LINE; ctx.beginPath(); ctx.arc(0, -2, 3.2, 0, 7); ctx.fill(); ctx.fillRect(-1.2, -1, 2.4, 7);
    ctx.restore();
    ctx.restore();
  }
  // Chain from a to b sagging by `sag`, swinging with `swing` (px). Links alternate face-on / edge-on.
  function chain(ctx, a, b, sag, swing = 0, size = 9) {
    const n = Math.max(3, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / (size * 1.5)));
    const pts = [];
    for (let i = 0; i <= n; i++) { const f = i / n, bow = Math.sin(Math.PI * f); pts.push([lerp(a[0], b[0], f) + swing * bow, lerp(a[1], b[1], f) + sag * bow]); }
    for (let i = 0; i < n; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], ang = Math.atan2(y1 - y0, x1 - x0), mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
      ctx.save(); ctx.translate(mx, my); ctx.rotate(ang);
      if (i % 2) shape(ctx, PAL.steelLo, 2.5, rect(-size, -2.2, size * 2, 4.4, 2));
      else { metalStroke(ctx, c => c.ellipse(0, 0, size, size * .55, 0, 0, 7), 3.2); }
      ctx.restore();
    }
    return pts;
  }
  // Hanging chain end (free end swinging like a pendulum).
  function hangingChain(ctx, a, len, t, phase = 0, size = 9) {
    const sw = Math.sin(t * 2.1 + phase) * len * .12;
    return chain(ctx, a, [a[0] + sw, a[1] + len], len * .05, sw * .4, size);
  }

  // ---------- bedside objects ----------
  function waterGlass(ctx, x, y, h = 260, t = 0) {
    const w = h * .5, top = y - h, rx = w / 2, ry = rx * .22;
    T.shadow(ctx, x - 50, y + 4, rx * 1.6, ry * 1.4, .35, 10);
    ctx.save();
    // back rim + body
    ctx.beginPath(); ctx.moveTo(x - rx, top); ctx.lineTo(x - rx * .86, y); ctx.ellipse(x, y, rx * .86, ry * .86, 0, Math.PI, 0, true); ctx.lineTo(x + rx, top); ctx.ellipse(x, top, rx, ry, 0, 0, Math.PI, true); ctx.closePath();
    ctx.fillStyle = 'rgba(205,220,226,0.22)'; ctx.fill();
    // water with meniscus and refraction bands
    const wl = top + h * .38, wobble = Math.sin(t * 2) * 1.5;
    ctx.beginPath(); ctx.moveTo(x - rx * .95, wl); ctx.lineTo(x - rx * .86, y); ctx.ellipse(x, y, rx * .86, ry * .86, 0, Math.PI, 0, true); ctx.lineTo(x + rx * .95, wl); ctx.ellipse(x, wl + wobble, rx * .95, ry * .95, 0, 0, Math.PI, true); ctx.closePath();
    ctx.fillStyle = grad(ctx, x - rx, 0, x + rx, 0, [[0, 'rgba(120,150,160,0.55)'], [.55, 'rgba(170,195,200,0.35)'], [1, 'rgba(90,120,130,0.6)']]); ctx.fill();
    ctx.restore();
    shape(ctx, 'rgba(225,238,240,0.35)', 2.5, ellipse(x, wl + wobble, rx * .95, ry * .95));
    // outlines and highlights
    line(ctx, [[x - rx, top], [x - rx * .86, y]], 3.5); line(ctx, [[x + rx, top], [x + rx * .86, y]], 3.5);
    ctx.beginPath(); ctx.ellipse(x, y, rx * .86, ry * .86, 0, 0, Math.PI); ctx.lineWidth = 3.5; ctx.strokeStyle = LINE; ctx.stroke();
    shape(ctx, null, 3.5, ellipse(x, top, rx, ry));
    line(ctx, [[x + rx * .55, top + 16], [x + rx * .48, y - 20]], 7, 'rgba(255,255,255,0.75)');
    line(ctx, [[x + rx * .32, top + 30], [x + rx * .28, top + 90]], 3, 'rgba(255,255,255,0.5)');
  }
  function pocketWatch(ctx, x, y, r = 105, t = 0) {
    T.shadow(ctx, x - 40, y + r * .95, r * 1.25, r * .28, .4, 10);
    // chain trailing off to the right
    let px = x + r * .7, py = y + r * .55;
    for (let i = 0; i < 16; i++) {
      const nx = px + 22, ny = py + Math.sin(i * .7) * 9 + 3;
      ctx.save(); ctx.translate((px + nx) / 2, (py + ny) / 2); ctx.rotate(Math.atan2(ny - py, nx - px));
      if (i % 2) shape(ctx, PAL.goldLo, 2, rect(-10, -2, 20, 4, 2)); else metalStroke(ctx, c => c.ellipse(0, 0, 10, 6, 0, 0, 7), 3, PAL.gold, PAL.goldHi, PAL.goldLo);
      ctx.restore(); px = nx; py = ny;
    }
    // bow + crown
    metalStroke(ctx, c => c.arc(x, y - r - 30, 18, 0, 7), 6, PAL.gold, PAL.goldHi, PAL.goldLo);
    shape(ctx, grad(ctx, x - 16, 0, x + 16, 0, [[0, PAL.goldLo], [.5, PAL.goldHi], [1, PAL.goldLo]]), 3, rect(x - 15, y - r - 18, 30, 24, 5));
    // case with bevel
    shape(ctx, grad(ctx, x - r, y - r, x + r, y + r, [[0, PAL.goldHi], [.45, PAL.gold], [1, PAL.goldLo]]), 4.5, circle(x, y, r));
    shape(ctx, grad(ctx, x + r, y + r, x - r, y - r, [[0, PAL.goldHi], [1, PAL.goldLo]]), 2.5, circle(x, y, r * .9));
    shape(ctx, '#f3ebd8', 3, circle(x, y, r * .8));
    ctx.save(); ctx.fillStyle = LINE; ctx.font = `bold ${Math.round(r * .15)}px "DejaVu Serif"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const RN = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    RN.forEach((s, i) => { const a = i / 12 * Math.PI * 2 - Math.PI / 2; ctx.fillText(s, x + Math.cos(a) * r * .62, y + Math.sin(a) * r * .62); });
    ctx.restore();
    // 1:26 — the hour on the record
    const hA = (1 + 26 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 26 / 60 * Math.PI * 2 - Math.PI / 2;
    line(ctx, [[x, y], [x + Math.cos(hA) * r * .38, y + Math.sin(hA) * r * .38]], 6);
    line(ctx, [[x, y], [x + Math.cos(mA) * r * .58, y + Math.sin(mA) * r * .58]], 4);
    shape(ctx, PAL.gold, 2, circle(x, y, 6));
    // crystal reflection
    ctx.save(); ctx.globalAlpha = .35; ctx.beginPath(); ctx.ellipse(x - r * .3, y - r * .35, r * .35, r * .14, -.7, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
  }
  function handcuffPair(ctx, x, y, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    T.shadow(ctx, -30, 46, 210, 26, .4, 10);
    const ring = (cx, rot) => {
      ctx.save(); ctx.translate(cx, 0); ctx.rotate(rot);
      metalStroke(ctx, c => c.ellipse(0, 0, 78, 44, 0, 0, Math.PI * 2), 13);
      ctx.save(); ctx.globalAlpha = .9; for (let k = 0; k < 9; k++) { const a = Math.PI * 1.15 + k * .1; line(ctx, [[Math.cos(a) * 70, Math.sin(a) * 37], [Math.cos(a) * 62, Math.sin(a) * 31]], 2.5); } ctx.restore(); // ratchet teeth
      shape(ctx, grad(ctx, 0, -18, 0, 18, [[0, PAL.steelHi], [.5, PAL.steel], [1, PAL.steelLo]]), 3.5, rect(56, -20, 46, 40, 6));
      ctx.fillStyle = LINE; ctx.beginPath(); ctx.arc(79, -4, 4.5, 0, 7); ctx.fill(); ctx.fillRect(77, -2, 4, 10);
      ctx.restore();
    };
    ring(-130, -.12); ring(130, Math.PI + .12);
    chain(ctx, [-30, 2], [30, 2], 14, 0, 10);
    ctx.restore();
  }

  // ---------- the hand hanging beside the bed ----------
  function hangingHand(ctx, x, y, t) { // side of the hospital bed, flat style, the arm hanging limp
    const hem = (y0, amp, seed) => { const r = rng(seed), pts = []; for (let k = 0; k <= 16; k++) pts.push([x + 560 - k * 80, y0 + Math.sin(k * 1.9) * amp + r() * amp * .6]); return pts; };
    // floor and the shade under the bed
    shape(ctx, '#5d4a3b', 0, rect(x - 800, y + 120, 1500, 400));
    shape(ctx, 'rgba(0,0,0,.45)', 0, rect(x - 800, y - 160, 1500, 300));
    // bed frame: tube rail + leg (colours from the supplied bed art)
    shape(ctx, '#8a7f6a', 4, rect(x - 800, y - 176, 1440, 26, 13));
    shape(ctx, '#8a7f6a', 4, rect(x + 470, y - 176, 26, 330, 13)); shape(ctx, '#3a3632', 4, circle(x + 483, y + 170, 22));
    // mattress side + sheet, then the blanket draped over with a soft hem
    shape(ctx, '#ebe4d4', 4, poly([[x - 800, y - 600], [x + 560, y - 600], ...hem(y - 196, 9, 4), [x - 800, y - 196]]));
    for (const k of [-520, -330, -140, 210, 400]) line(ctx, [[x + k, y - 300], [x + k + 10, y - 205]], 2.5, 'rgba(29,26,23,.22)');
    shape(ctx, '#8ea2a6', 4, poly([[x - 800, y - 600], [x + 560, y - 600], ...hem(y - 330, 11, 8), [x - 800, y - 330]]));
    for (const k of [-560, -360, -170, 260, 450]) line(ctx, [[x + k, y - 560], [x + k + 18, y - 345]], 2.5, 'rgba(29,26,23,.22)');
    ctx.save(); ctx.translate(x, y - 330); ctx.rotate(Math.sin(t * .7) * .015); ctx.translate(-x, -(y - 330));
    // forearm
    shape(ctx, PAL.skin, 4.5, smooth([[x - 30, y - 330], [x + 30, y - 334], [x + 28, y - 150], [x + 26, y - 50], [x - 22, y - 46], [x - 26, y - 150]]));
    line(ctx, [[x + 10, y - 300], [x + 14, y - 80]], 6, 'rgba(201,132,88,.45)');
    // limp hand: palm, four slightly curled fingers, thumb
    shape(ctx, PAL.skin, 4.5, smooth([[x - 26, y - 60], [x + 30, y - 62], [x + 40, y - 10], [x + 30, y + 30], [x - 22, y + 30], [x - 32, y - 10]]));
    const fingers = [[-20, 30, 70], [-4, 32, 84], [12, 31, 80], [27, 26, 64]];
    for (const [fx, fy, len] of fingers) shape(ctx, PAL.skin, 4, smooth([[x + fx - 8, y + fy - 6], [x + fx + 8, y + fy - 6], [x + fx + 9, y + fy + len * .6], [x + fx + 4, y + fy + len], [x + fx - 6, y + fy + len - 4], [x + fx - 9, y + fy + len * .55]]));
    shape(ctx, PAL.skin, 4, smooth([[x + 30, y - 40], [x + 48, y - 20], [x + 56, y + 20], [x + 48, y + 42], [x + 36, y + 30], [x + 30, y]]));
    line(ctx, [[x - 18, y - 52], [x + 26, y - 54]], 2.5, 'rgba(29,26,23,.35)');               // wrist crease
    // gown sleeve over the blanket edge
    shape(ctx, PAL.gown, 4.5, smooth([[x - 92, y - 420], [x + 56, y - 430], [x + 70, y - 316], [x - 6, y - 290], [x - 78, y - 316]]));
    line(ctx, [[x - 40, y - 400], [x - 30, y - 320]], 2.5, 'rgba(29,26,23,.25)');
    ctx.restore();
  }

  // ---------- 1920s car ----------
  function car(ctx, x, y, s, color) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    T.shadow(ctx, 0, 22, 120, 12, .45, 6);
    const body = grad(ctx, 0, -100, 0, 0, [[0, shade(color, 1.25)], [.6, color], [1, shade(color, .7)]]);
    shape(ctx, body, 3, poly([[-70, -34], [-66, -98], [28, -98], [36, -34]]));
    for (const [wx, ww] of [[-58, 36], [-14, 36]]) shape(ctx, grad(ctx, 0, -90, 0, -54, [[0, '#9fb1b8'], [1, '#3b4448']]), 2.5, rect(wx, -90, ww, 34, 3));
    shape(ctx, body, 3, poly([[32, -56], [94, -52], [98, -26], [32, -24]]));
    shape(ctx, '#2a2a28', 3, rect(94, -58, 10, 34, 2));
    shape(ctx, '#2a2a28', 3, rect(-86, -22, 190, 8, 3));
    for (const wx of [-56, 66]) {
      shape(ctx, '#2a2a28', 3, c => { c.moveTo(wx - 38, -10); c.quadraticCurveTo(wx, -60, wx + 38, -10); c.closePath(); });
      shape(ctx, '#1d1d1c', 3, circle(wx, 0, 25)); shape(ctx, '#cfc7b2', 2, circle(wx, 0, 17));
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; line(ctx, [[wx, 0], [wx + Math.cos(a) * 16, Math.sin(a) * 16]], 1.8); }
      shape(ctx, '#222', 2, circle(wx, 0, 4.5));
    }
    shape(ctx, '#e9dcae', 2.5, circle(103, -62, 7));
    line(ctx, [[-66, -98], [28, -98]], 4, shade(color, 1.5));
    ctx.restore();
  }
  function shade(hex, k) {
    const p = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16));
    return `rgb(${p.map(v => Math.round(clamp(v * k, 0, 255))).join(',')})`;
  }

  // ---------- back-lit supporting figures (original designs) ----------
  // Proportions follow the supplied character: tall, narrow, large head.
  function doctor(ctx, x, y, s, rimX, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const breathe = Math.sin(t * 1.4) * 1.5, dark = '#262c2d', rim = 'rgba(214,222,214,0.85)';
    T.shadow(ctx, 0, 0, 70, 12, .5, 8);
    T.rimmed(ctx, smooth([[-30, 0], [-26, -120], [-14, -120], [-10, -8], [10, -8], [14, -120], [26, -120], [30, 0]]), dark, rim, rimX - x, 1, 3);  // legs
    T.rimmed(ctx, smooth([[-56, -118], [-50, -250], [-46, -330 - breathe], [-20, -352 - breathe], [20, -352 - breathe], [46, -330 - breathe], [50, -250], [56, -118], [0, -108]]), dark, rim, rimX - x, 1, 3); // coat
    line(ctx, [[0, -350], [-6, -230], [0, -120]], 2.5, 'rgba(120,130,128,.6)');
    T.rimmed(ctx, smooth([[42, -320], [62, -250], [40, -196], [22, -200], [36, -250], [28, -300]]), dark, rim, rimX - x, 1, 3); // arm holding chart
    shape(ctx, '#3d4644', 3, rect(-6, -262, 56, 70, 4));                                   // clipboard
    line(ctx, [[4, -246], [40, -246]], 2, 'rgba(200,205,195,.35)'); line(ctx, [[4, -232], [40, -232]], 2, 'rgba(200,205,195,.35)');
    T.rimmed(ctx, smooth([[-14, -352], [14, -352], [12, -372], [-12, -372]]), dark, rim, rimX - x, 1, 3);    // neck
    ctx.save(); ctx.translate(6, -412); ctx.rotate(.22);                                    // head bowed to the chart
    T.rimmed(ctx, ellipse(0, 0, 32, 44), dark, rim, rimX - x - 6, 1, 3);
    T.rimmed(ctx, smooth([[-34, -8], [-30, -38], [0, -50], [30, -40], [34, -10], [20, -26], [-10, -28]]), '#1b1f20', rim, rimX - x - 6, 1, 3); // hair
    ctx.restore();
    ctx.restore();
  }
  function nurse(ctx, x, y, s, rimX, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const breathe = Math.sin(t * 1.2 + 1) * 1.2, dark = '#262c2d', rim = 'rgba(232,236,226,0.95)';
    T.shadow(ctx, 0, 0, 60, 10, .5, 8);
    T.rimmed(ctx, smooth([[-46, 0], [-40, -150], [-44, -250 - breathe], [-22, -288 - breathe], [22, -288 - breathe], [44, -250 - breathe], [40, -150], [46, 0]]), dark, rim, rimX - x, 1, 3); // dress
    T.rimmed(ctx, smooth([[-50, -256], [-24, -292], [24, -292], [50, -256], [34, -214], [-34, -214]]), '#30383a', rim, rimX - x, 1, 3);      // cape
    T.rimmed(ctx, ellipse(0, -182, 22, 12), '#30383a', rim, rimX - x, 1, 2.5);                                                               // hands folded
    T.rimmed(ctx, smooth([[-11, -288], [11, -288], [10, -304], [-10, -304]]), dark, rim, rimX - x, 1, 3);
    T.rimmed(ctx, ellipse(-2, -336, 28, 38), dark, rim, rimX - x, 1, 3);                                                                     // head (back to camera)
    T.rimmed(ctx, smooth([[-30, -350], [-26, -380], [24, -384], [30, -352], [10, -364], [-12, -364]]), '#1b1f20', rim, rimX - x, 1, 3);   // hair bun line
    T.rimmed(ctx, poly([[-30, -364], [26, -370], [20, -396], [-24, -392]]), '#cfd3cb', rim, rimX - x, 1, 3);                                  // white cap catches light
    ctx.restore();
  }

  G.Props = { PAL, metalStroke, cuffBand, chain, hangingChain, waterGlass, pocketWatch, handcuffPair, hangingHand, car, doctor, nurse, shade };
})(window);
