/* The channel's icon set — vector rebuild of the user's icon sheet (thick dark outline, flat bright fills).
 * Icons.draw(ctx, name, x, y, size, k = 1)  centred at (x, y), `size` px wide; k (0..1) plays the icon's own
 * entrance (bars grow, lines draw, pie sweeps, coins drop, check draws, bulb lights, warning pulses…).
 * Icons.pop(ctx, name, x, y, size, lt)       the standard entrance: overshoot scale-in over ~0.35 s, then k runs. */
(function (G) {
  'use strict';
  const INK = '#1f1c1a', LW = 5;
  const P = { blue: '#3b7dd8', green: '#3a9b4f', red: '#d64535', yellow: '#f4c93c', pink: '#f5a9b8', brown: '#8a5a36', tan: '#d9b98a', grey: '#5d6166', light: '#e9edf1', paper: '#fbf8f0', orange: '#f29b38', sky: '#cfe6f7' };
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const back = k => { k = clamp(k); const c = 1.7; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
  const out = k => 1 - Math.pow(1 - clamp(k), 3);
  function sh(ctx, fn, fill, lw = LW) { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
  const ln = (ctx, pts, w = LW, c = INK) => { ctx.beginPath(); ctx.moveTo(...pts[0]); for (const p of pts.slice(1)) ctx.lineTo(...p); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); };
  const partial = (pts, k) => { const segs = pts.length - 1, u = clamp(k) * segs, i = Math.min(segs - 1, Math.floor(u)), f = u - i; return [...pts.slice(0, i + 1), [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]]; };
  function arrowHead(ctx, a, b, col, s = 14) { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]); sh(ctx, c => { c.moveTo(b[0] + Math.cos(ang) * s, b[1] + Math.sin(ang) * s); c.lineTo(b[0] + Math.cos(ang + 2.3) * s, b[1] + Math.sin(ang + 2.3) * s); c.lineTo(b[0] + Math.cos(ang - 2.3) * s, b[1] + Math.sin(ang - 2.3) * s); c.closePath(); }, col, 3); }

  // every icon is drawn in a 100 × 100 box centred on 0,0
  const ICONS = {
    barsUp(ctx, k) { [26, 40, 56, 76].forEach((h, i) => { const g = out((k - i * .12) / .5) * h; sh(ctx, c => c.rect(-44 + i * 22, 40 - g, 16, g), P.blue, 4); }); ln(ctx, [[-50, 42], [50, 42]], 5);
      const a = partial([[-46, 8], [-10, -10], [20, -26], [44, -44]], (k - .4) / .6); if (k > .4) { ln(ctx, a, 6, P.green); arrowHead(ctx, a[a.length - 2], a[a.length - 1], P.green); } },
    barsDown(ctx, k) { [74, 54, 40, 24].forEach((h, i) => { const g = out((k - i * .12) / .5) * h; sh(ctx, c => c.rect(-44 + i * 22, 40 - g, 16, g), P.red, 4); }); ln(ctx, [[-50, 42], [50, 42]], 5);
      const a = partial([[-44, -46], [-10, -32], [20, -20], [44, -4]], (k - .4) / .6); if (k > .4) { ln(ctx, a, 6, P.red); arrowHead(ctx, a[a.length - 2], a[a.length - 1], P.red); } },
    lineUp(ctx, k) { ln(ctx, [[-44, -46], [-44, 42], [48, 42]], 5); const pts = [[-34, 26], [-12, 4], [6, 18], [24, -10], [42, -36]], a = partial(pts, k); ln(ctx, a, 5, P.green); pts.slice(0, 4).forEach((p, i) => { if (k * 4 > i) sh(ctx, c => c.arc(...p, 6, 0, 7), P.green, 3); }); if (k > .9) arrowHead(ctx, pts[3], pts[4], P.green); },
    lineDown(ctx, k) { ln(ctx, [[-44, -46], [-44, 42], [48, 42]], 5); const pts = [[-34, -30], [-14, -8], [6, -16], [24, 8], [42, 30]], a = partial(pts, k); ln(ctx, a, 5, P.red); pts.slice(0, 4).forEach((p, i) => { if (k * 4 > i) sh(ctx, c => c.arc(...p, 6, 0, 7), P.red, 3); }); if (k > .9) arrowHead(ctx, pts[3], pts[4], P.red); },
    pie(ctx, k) { const s = clamp(k) * Math.PI * 2, a0 = -Math.PI / 2; sh(ctx, c => c.arc(0, 0, 46, 0, 7), P.blue); const parts = [[.16, P.yellow], [.22, P.green]]; let a = a0;
      for (const [f, col] of parts) { const e = Math.min(a + f * Math.PI * 2, a0 + s); if (e > a) sh(ctx, c => { c.moveTo(0, 0); c.arc(0, 0, 46, a, e); c.closePath(); }, col, 4); a += f * Math.PI * 2; } },
    calculator(ctx) { sh(ctx, c => c.roundRect(-36, -46, 72, 92, 10), '#3c3f44'); sh(ctx, c => c.roundRect(-26, -36, 52, 18, 3), '#dde3e8', 3); for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) sh(ctx, c => c.roundRect(-26 + q * 19, -10 + r * 18, 14, 13, 3), q === 2 && r > 0 ? P.orange : '#9aa0a6', 2.5); },
    laptop(ctx) { sh(ctx, c => c.roundRect(-40, -38, 80, 56, 6), '#4a4e54'); sh(ctx, c => c.rect(-32, -30, 64, 40), '#2b2e33', 2); sh(ctx, c => { c.moveTo(-52, 18); c.lineTo(52, 18); c.lineTo(46, 30); c.lineTo(-46, 30); c.closePath(); }, '#9aa0a6'); },
    phone(ctx, k) { sh(ctx, c => c.roundRect(-26, -48, 52, 96, 10), '#4a4e54'); sh(ctx, c => c.rect(-19, -36, 38, 66), '#fff', 2.5); [10, 18, 26].forEach((h, i) => { const g = out((k - i * .15) / .5) * h; sh(ctx, c => c.rect(-14 + i * 11, 24 - g, 8, g), '#2f4a8a', 2); }); },
    doc(ctx, k) { sh(ctx, c => { c.moveTo(-32, -46); c.lineTo(18, -46); c.lineTo(34, -30); c.lineTo(34, 46); c.lineTo(-32, 46); c.closePath(); }, P.paper); sh(ctx, c => { c.moveTo(18, -46); c.lineTo(18, -30); c.lineTo(34, -30); }, null, 4); for (let i = 0; i < 5; i++) { const w = 46 * out((k - i * .1) / .4); if (w > 0) ln(ctx, [[-20, -22 + i * 14], [-20 + w, -22 + i * 14]], 4); } },
    clipboard(ctx, k) { sh(ctx, c => c.roundRect(-36, -40, 72, 88, 8), P.brown); sh(ctx, c => c.rect(-26, -28, 52, 68), P.paper, 3); sh(ctx, c => c.roundRect(-14, -48, 28, 16, 5), '#9aa0a6', 3); for (let i = 0; i < 4; i++) { const w = 34 * out((k - i * .12) / .4); if (w > 0) ln(ctx, [[-16, -12 + i * 14], [-16 + w, -12 + i * 14]], 3.5); } },
    books(ctx) { [[P.red, 26], [P.green, 8], [P.blue, -10]].forEach(([col, y], i) => { sh(ctx, c => { c.moveTo(-46, y); c.lineTo(36, y - 4); c.lineTo(46, y + 4); c.lineTo(46, y + 18); c.lineTo(-40, y + 22); c.lineTo(-46, y + 16); c.closePath(); }, col, 4); ln(ctx, [[-32, y + 8], [40, y + 6]], 2, '#fff'); }); },
    moneyBag(ctx, k) { sh(ctx, c => { c.moveTo(-14, -30); c.quadraticCurveTo(-48, -6, -42, 26); c.quadraticCurveTo(-36, 46, 0, 46); c.quadraticCurveTo(36, 46, 42, 26); c.quadraticCurveTo(48, -6, 14, -30); c.closePath(); }, P.tan); sh(ctx, c => { c.moveTo(-16, -30); c.lineTo(-24, -46); c.lineTo(0, -40); c.lineTo(24, -46); c.lineTo(16, -30); c.closePath(); }, P.tan, 4); ln(ctx, [[-18, -30], [18, -30]], 6, P.brown);
      ctx.save(); ctx.font = `900 ${42 * back(k)}px "Patrick Hand", sans-serif`; ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', 0, 12); ctx.restore(); },
    coins(ctx, k) { for (let i = 0; i < 4; i++) { const d = (1 - out((k - i * .12) / .4)) * -80; sh(ctx, c => c.ellipse(-12, 32 - i * 16 + d, 30, 11, 0, 0, 7), P.yellow, 4); } const d2 = (1 - out((k - .5) / .4)) * -80; sh(ctx, c => c.ellipse(24, 22 + d2, 18, 24, -.3, 0, 7), P.yellow, 4); },
    piggy(ctx) { sh(ctx, c => c.ellipse(0, 6, 44, 32, 0, 0, 7), P.pink); sh(ctx, c => c.ellipse(-42, 4, 10, 12, 0, 0, 7), P.pink, 4); for (const x of [-22, 18]) sh(ctx, c => c.rect(x, 30, 12, 14), P.pink, 4); sh(ctx, c => { c.moveTo(-18, -22); c.lineTo(-8, -40); c.lineTo(0, -22); }, P.pink, 4); ln(ctx, [[-6, -14], [10, -14]], 4); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-24, -4, 3.5, 0, 7); ctx.fill(); },
    wallet(ctx) { sh(ctx, c => c.roundRect(-46, -30, 92, 66, 10), P.brown); sh(ctx, c => c.roundRect(10, -10, 40, 26, 6), '#6e4528', 4); sh(ctx, c => c.arc(26, 3, 6, 0, 7), P.yellow, 3); },
    magnifier(ctx, k) { ctx.save(); ctx.rotate(Math.sin(k * Math.PI * 2) * .15); sh(ctx, c => c.arc(-8, -8, 30, 0, 7), P.sky, 7); ln(ctx, [[14, 14], [42, 42]], 14, '#4a4e54'); ctx.restore(); },
    bulb(ctx, k) { const on = clamp(k); if (on > .3) for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * .55; ln(ctx, [[Math.cos(a) * 44, -10 + Math.sin(a) * 44], [Math.cos(a) * (44 + 10 * on), -10 + Math.sin(a) * (44 + 10 * on)]], 4); }
      sh(ctx, c => { c.arc(0, -12, 28, Math.PI * .8, Math.PI * 2.2); c.lineTo(10, 28); c.lineTo(-10, 28); c.closePath(); }, on > .3 ? P.yellow : '#eee'); sh(ctx, c => c.rect(-12, 28, 24, 14), '#9aa0a6', 4); },
    question(ctx) { ctx.save(); ctx.font = '900 104px "Patrick Hand", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.strokeText('?', 0, 4); ctx.fillStyle = P.blue; ctx.fillText('?', 0, 4); ctx.restore(); },
    exclaim(ctx) { sh(ctx, c => c.roundRect(-10, -46, 20, 64, 9), P.red); sh(ctx, c => c.arc(0, 36, 10, 0, 7), P.red); },
    arrowUp(ctx) { sh(ctx, c => { c.moveTo(0, -46); c.lineTo(40, 0); c.lineTo(16, 0); c.lineTo(16, 44); c.lineTo(-16, 44); c.lineTo(-16, 0); c.lineTo(-40, 0); c.closePath(); }, P.green); },
    arrowDown(ctx) { sh(ctx, c => { c.moveTo(0, 46); c.lineTo(40, 0); c.lineTo(16, 0); c.lineTo(16, -44); c.lineTo(-16, -44); c.lineTo(-16, 0); c.lineTo(-40, 0); c.closePath(); }, P.red); },
    check(ctx, k) { const a = partial([[-40, 0], [-12, 28], [42, -30]], k); ln(ctx, a, 22); ln(ctx, a, 12, P.green); },
    cross(ctx, k) { const a = partial([[-34, -34], [34, 34]], k * 2), b = partial([[34, -34], [-34, 34]], k * 2 - 1); ln(ctx, a, 22); ln(ctx, a, 12, P.red); if (k > .5) { ln(ctx, b, 22); ln(ctx, b, 12, P.red); } },
    warning(ctx, k) { const p = 1 + Math.sin(k * Math.PI * 4) * .04; ctx.scale(p, p); sh(ctx, c => { c.moveTo(0, -44); c.lineTo(48, 40); c.lineTo(-48, 40); c.closePath(); }, P.yellow); sh(ctx, c => c.roundRect(-5, -16, 10, 34, 5), INK, 0); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 28, 6, 0, 7); ctx.fill(); },
    coin(ctx, k) { ctx.save(); ctx.scale(Math.cos(clamp(k) * Math.PI * 2) * .3 + .7 + .3 * clamp(k), 1); sh(ctx, c => c.arc(0, 0, 44, 0, 7), P.yellow); sh(ctx, c => c.arc(0, 0, 34, 0, 7), null, 3); ctx.font = '900 54px "Patrick Hand", sans-serif'; ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', 0, 4); ctx.restore(); },
  };
  function draw(ctx, name, x, y, size = 100, k = 1) { const f = ICONS[name]; if (!f) return; ctx.save(); ctx.translate(x, y); ctx.scale(size / 100, size / 100); f(ctx, clamp(k)); ctx.restore(); }
  function pop(ctx, name, x, y, size, lt, playFor = .8) { if (lt <= 0) return; const s = back(lt / .35); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); draw(ctx, name, 0, 0, size, (lt - .15) / playFor); ctx.restore(); }
  G.Icons = { draw, pop, ICONS, P, back, out };
})(window);
