/* Modern chart motion for the channel — in the cartoon style (thick outline, rounded shapes, bright fills,
 * handwritten labels) but moving like modern data-viz: staggered entrances with a soft overshoot, values counting
 * up with their bars, gridlines and axes fading in first, a travelling value tag on lines, sweeping donuts,
 * highlight + dim on the bar that matters, and callouts that point at the takeaway.
 *
 * Every function takes the shot-local time `lt` (seconds since the chart started) and is deterministic.
 *   Charts.bars(ctx, o)      vertical bars            o = { x, y, w, h, data:[{label, value, color}], max, fmt, highlight, title, lt, stagger }
 *   Charts.compare(ctx, o)   grouped pairs (A vs B)   o = { x, y, w, h, groups:[{label, a, b}], names:[A, B], colors:[cA, cB], fmt, lt }
 *   Charts.hbars(ctx, o)     horizontal bars / ranked o = { x, y, w, rowH, data:[{label, value, color}], max, fmt, lt }
 *   Charts.line(ctx, o)      line + area, draws on    o = { x, y, w, h, points:[[label, value]], min, max, fmt, color, lt, dur, projectFrom }
 *   Charts.donut(ctx, o)     donut / pie sweep         o = { x, y, r, slices:[{value, color, label}], centre, lt, thickness }
 *   Charts.counter(ctx, o)   big number counting up    o = { x, y, value, prefix, suffix, decimals, size, color, lt, dur }
 *   Charts.progress(ctx, o)  bar filling to a share    o = { x, y, w, h, value (0..1), label, color, lt }
 *   Charts.callout(ctx, o)   pointer + note            o = { x, y, tx, ty, text, lt, color }  (arrow from text box at x,y to target tx,ty) */
(function (G) {
  'use strict';
  const INK = '#1f1c1a', HAND = (w, px) => `${w} ${px}px Caveat, "Patrick Hand", cursive`, PRINT = px => `${px}px "Patrick Hand", Caveat, cursive`;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const back = k => { k = clamp(k); const c = 1.4; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
  const out = k => 1 - Math.pow(1 - clamp(k), 3), inout = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  const fmtDef = v => Math.round(v).toLocaleString('en-US');
  function txt(ctx, s, x, y, font, color = INK, align = 'center', a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(a); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); }
  function shape(ctx, fn, fill, lw = 4.5) { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke(); } }
  function grid(ctx, x, y, w, h, n, lt) { const a = clamp(lt / .4) * .5; if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); for (let i = 1; i <= n; i++) { const yy = y - h * i / n; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w * clamp(lt / .6), yy); ctx.stroke(); } ctx.restore(); }
  function axis(ctx, x, y, w, lt) { const k = out(lt / .4); ctx.beginPath(); ctx.moveTo(x - 6, y); ctx.lineTo(x + (w + 12) * k, y); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); }
  function title(ctx, o) { if (o.title) txt(ctx, o.title, o.x + o.w / 2, o.y - o.h - 46, HAND(700, 40), INK, 'center', clamp(o.lt / .3)); }

  function bars(ctx, o) {
    const { x, y, w, h, data, lt = 0 } = o, n = data.length, max = o.max ?? Math.max(...data.map(d => d.value)) * 1.12, fmt = o.fmt || fmtDef, st = o.stagger ?? .12;
    title(ctx, o); grid(ctx, x, y, w, h, 4, lt); axis(ctx, x, y, w, lt);
    const bw = w / n * .62, gap = w / n;
    data.forEach((d, i) => {
      const k = back((lt - .25 - i * st) / .7), v = d.value * clamp(out((lt - .25 - i * st) / .7)), bh = h * d.value / max * k, bx = x + gap * i + (gap - bw) / 2;
      const hi = o.highlight != null, me = o.highlight === i, col = hi && !me && lt > (o.highlightAt ?? 0) ? '#c4c8ce' : (d.color || '#3b7dd8');
      if (bh > 1) shape(ctx, c => c.roundRect(bx, y - bh, bw, bh, [10, 10, 0, 0]), col);
      if (k > .05) txt(ctx, fmt(v), bx + bw / 2, y - bh - 26, HAND(700, 38), me || !hi ? INK : '#8a8f96', 'center', clamp((lt - .35 - i * st) / .3));
      txt(ctx, d.label, bx + bw / 2, y + 30, PRINT(26), INK, 'center', clamp((lt - .1 - i * st) / .3));
    });
  }
  function compare(ctx, o) {
    const { x, y, w, h, groups, lt = 0 } = o, cols = o.colors || ['#d64535', '#3b7dd8'], names = o.names || ['A', 'B'], fmt = o.fmt || fmtDef;
    const max = o.max ?? Math.max(...groups.flatMap(g => [g.a, g.b])) * 1.15, gw = w / groups.length, bw = gw * .3;
    title(ctx, o); grid(ctx, x, y, w, h, 4, lt); axis(ctx, x, y, w, lt);
    groups.forEach((g, i) => {
      [[g.a, 0], [g.b, 1]].forEach(([val, j]) => {
        const t0 = .3 + i * .28 + j * .12, k = back((lt - t0) / .65), bh = h * val / max * k, bx = x + gw * i + gw * .18 + j * (bw + 8);
        if (bh > 1) shape(ctx, c => c.roundRect(bx, y - bh, bw, bh, [9, 9, 0, 0]), cols[j]);
        txt(ctx, fmt(val * clamp(out((lt - t0) / .65))), bx + bw / 2, y - bh - 22, HAND(700, 30), INK, 'center', clamp((lt - t0 - .1) / .3));
      });
      txt(ctx, g.label, x + gw * i + gw * .18 + bw + 4, y + 30, PRINT(24), INK, 'center', clamp((lt - .2 - i * .28) / .3));
    });
    // legend
    names.forEach((nm, j) => { const lx = x + 12 + j * 200, ly = y - h - 4, a = clamp((lt - .2) / .3); if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; shape(ctx, c => c.roundRect(lx, ly - 11, 22, 22, 5), cols[j], 3); ctx.restore(); txt(ctx, nm, lx + 32, ly, PRINT(24), INK, 'left', a); });
  }
  function hbars(ctx, o) {
    const { x, y, w, data, lt = 0 } = o, rowH = o.rowH || 58, max = o.max ?? Math.max(...data.map(d => d.value)) * 1.05, fmt = o.fmt || fmtDef, lw = o.labelW ?? 230;
    data.forEach((d, i) => {
      const t0 = .15 + i * .15, k = out((lt - t0) / .7), yy = y + i * rowH, bw = (w - lw - 110) * d.value / max * k;
      txt(ctx, d.label, x + lw - 16, yy + rowH * .4, PRINT(26), INK, 'right', clamp((lt - t0 + .1) / .3));
      if (bw > 2) shape(ctx, c => c.roundRect(x + lw, yy + 4, bw, rowH * .72, 9), d.color || '#3b7dd8');
      txt(ctx, fmt(d.value * k), x + lw + bw + 14, yy + rowH * .4, HAND(700, 34), INK, 'left', clamp((lt - t0) / .3));
    });
  }
  function line(ctx, o) {
    const { x, y, w, h, points, lt = 0 } = o, dur = o.dur ?? 1.6, vals = points.map(p => p[1]), min = o.min ?? 0, max = o.max ?? Math.max(...vals) * 1.15, fmt = o.fmt || fmtDef, col = o.color || '#3a9b4f';
    title(ctx, o); grid(ctx, x, y, w, h, 4, lt); axis(ctx, x, y, w, lt);
    const P = points.map((p, i) => [x + w * (points.length === 1 ? .5 : i / (points.length - 1)), y - h * (p[1] - min) / (max - min)]);
    const k = inout((lt - .3) / dur), u = k * (P.length - 1), i0 = Math.min(P.length - 2, Math.floor(u)), f = u - i0, head = [lerp(P[i0][0], P[i0 + 1][0], f), lerp(P[i0][1], P[i0 + 1][1], f)];
    // area under the drawn part
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(P[0][0], y); for (let i = 0; i <= i0; i++) ctx.lineTo(...P[i]); ctx.lineTo(...head); ctx.lineTo(head[0], y); ctx.closePath(); ctx.fill(); ctx.restore();
    // the line (dashed after projectFrom)
    for (let i = 0; i <= i0; i++) { const a = P[i], b = i < i0 ? P[i + 1] : head, proj = o.projectFrom != null && i >= o.projectFrom; ctx.save(); if (proj) ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineWidth = 7; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
    P.forEach((p, i) => { if (u + .001 >= i) { const s = back((u - i) * 2.5); shape(ctx, c => c.arc(p[0], p[1], 8 * s, 0, 7), '#fff', 3.5); } txt(ctx, points[i][0], p[0], y + 30, PRINT(24), INK, 'center', clamp((lt - .1 - i * .05) / .3)); });
    // travelling value tag at the head of the line
    if (lt > .3) { const v = lerp(points[i0][1], points[i0 + 1][1], f), s = fmt(v); ctx.save(); ctx.font = HAND(700, 34); const tw = ctx.measureText(s).width + 26; ctx.restore();
      shape(ctx, c => c.roundRect(head[0] - tw / 2, head[1] - 62, tw, 40, 10), col, 3.5); txt(ctx, s, head[0], head[1] - 42, HAND(700, 34), '#fff'); }
  }
  function donut(ctx, o) {
    const { x, y, r, slices, lt = 0 } = o, th = o.thickness ?? r * .42, total = slices.reduce((a, s) => a + s.value, 0), k = inout((lt - .2) / 1.1);
    shape(ctx, c => { c.arc(x, y, r, 0, 7); c.arc(x, y, r - th, 0, 7, true); }, '#eef0f3', 4);
    let a = -Math.PI / 2;
    slices.forEach((s, i) => { const span = s.value / total * Math.PI * 2, end = Math.min(a + span, -Math.PI / 2 + k * Math.PI * 2);
      if (end > a) { const pop = s.pop ? out((lt - 1.3) / .4) * 12 : 0, mid = a + span / 2; ctx.save(); ctx.translate(Math.cos(mid) * pop, Math.sin(mid) * pop); shape(ctx, c => { c.arc(x, y, r, a, end); c.arc(x, y, r - th, end, a, true); c.closePath(); }, s.color, 4); ctx.restore();
        if (s.label) { const lr = r + 26, lx = x + Math.cos(mid) * lr, ly = y + Math.sin(mid) * lr; txt(ctx, s.label, lx, ly, HAND(700, 32), INK, Math.cos(mid) > .2 ? 'left' : Math.cos(mid) < -.2 ? 'right' : 'center', clamp((lt - 1.2 - i * .15) / .3)); } }
      a += span; });
    if (o.centre) counter(ctx, Object.assign({ x, y, size: r * .62, lt: lt - .2, dur: 1.1 }, o.centre));
  }
  function counter(ctx, o) {
    const { x, y, value, lt = 0 } = o, dur = o.dur ?? 1, k = out(lt / dur), v = value * k, d = o.decimals ?? 0;
    const s = (o.prefix || '') + (d ? v.toFixed(d) : Math.round(v).toLocaleString('en-US')) + (o.suffix || ''), pop = lt > dur ? back((lt - dur) / .25 + .5) : 1;
    if (lt <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(pop, pop); txt(ctx, s, 0, 0, HAND(700, o.size || 96), o.color || '#d64535'); ctx.restore();
  }
  function progress(ctx, o) {
    const { x, y, w, h = 44, lt = 0 } = o, k = out((lt - .2) / 1), v = clamp(o.value) * k;
    shape(ctx, c => c.roundRect(x, y, w, h, h / 2), '#eef0f3');
    if (v > .01) shape(ctx, c => c.roundRect(x, y, Math.max(h, w * v), h, h / 2), o.color || '#3a9b4f');
    if (o.label) txt(ctx, o.label, x, y - 30, PRINT(28), INK, 'left', clamp(lt / .3));
    txt(ctx, Math.round(v * 100) + '%', x + Math.max(h, w * v) + 16, y + h / 2, HAND(700, 36), INK, 'left', clamp((lt - .2) / .3));
  }
  function callout(ctx, o) {
    const { x, y, tx, ty, text, lt = 0 } = o, k = out(lt / .45); if (k <= 0) return;
    ctx.save(); ctx.font = HAND(700, 34); const tw = ctx.measureText(text).width + 30; ctx.restore();
    const ex = lerp(x, tx, k), ey = lerp(y, ty, k);
    ctx.save(); ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo((x + ex) / 2, Math.min(y, ey) - 40, ex, ey); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore();
    const s = back(lt / .35); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, c => c.roundRect(-tw / 2, -26, tw, 52, 12), o.color || '#f4c93c', 4); txt(ctx, text, 0, 2, HAND(700, 34)); ctx.restore();
  }
  G.Charts = { bars, compare, hbars, line, donut, counter, progress, callout, back, out, inout };
})(window);
