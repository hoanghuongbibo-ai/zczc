/* Canada — the film's type, after the reference channel: chunky rounded letters with a thick dark outline and a soft drop shadow.
 *  - Luckiest Guy for titles, headlines and the slanted date badge; Fredoka 700 for captions, facts and labels (easy to read at length).
 *  - Long lines shrink to fit and wrap to two lines rather than run off screen.
 * Loaded after collage.js / scenes.js; replaces Paint.caption, Col.label, Col.headline, Col.scrawl, Scenes.date, Scenes.fact. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, P = G.Paint, INK = '#1e1612', clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ROUND = s => `700 ${s}px Fredoka, "Luckiest Guy", sans-serif`, CHUNK = s => `${s}px "Luckiest Guy", Fredoka, sans-serif`;
  // outlined text: shadow, thick dark stroke, then the fill
  function outlined(ctx, text, x, y, size, fill = '#ffffff', o = {}) { ctx.lineJoin = 'round'; ctx.miterLimit = 2;
    if (o.shadow !== false) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = size * (o.stroke ?? .26); ctx.strokeText(text, x + size * .06, y + size * .09); ctx.fillText(text, x + size * .06, y + size * .09); ctx.restore(); }
    ctx.lineWidth = size * (o.stroke ?? .26); ctx.strokeStyle = o.outline || INK; ctx.strokeText(text, x, y);
    if (Array.isArray(fill)) { const g = ctx.createLinearGradient(0, y - size * .7, 0, y + size * .2); g.addColorStop(0, fill[0]); g.addColorStop(1, fill[1]); ctx.fillStyle = g; } else ctx.fillStyle = fill; ctx.fillText(text, x, y); }
  // split into at most two lines that fit maxW, shrinking the size if needed
  function fitLines(ctx, text, size, maxW, font) { let s = size; for (let n = 0; n < 12; n++) { ctx.font = font(s); if (ctx.measureText(text).width <= maxW) return [[text], s];
      const words = text.split(' '); if (words.length > 3) { let best = null; for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), w = Math.max(ctx.measureText(a).width, ctx.measureText(b).width); if (!best || w < best[0]) best = [w, a, b]; } if (best[0] <= maxW) return [[best[1], best[2]], s]; }
      s *= .92; } ctx.font = font(s); return [[text], s]; }
  // ---- captions (screen space) ----
  P.caption = function (ctx, text, k = 1, o = {}) { if (k <= 0 || !text) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const a = clamp(k / .3) * (o.a ?? 1); ctx.globalAlpha = a;
    const size = (o.size || 30) * 1.05, align = o.align || 'left', x = o.x ?? 60, y = o.y ?? 640, maxW = align === 'center' ? 1180 : 1240 - x; const [lines, s] = fitLines(ctx, text, size, maxW, ROUND);
    ctx.font = ROUND(s); ctx.textAlign = align; ctx.textBaseline = 'middle'; const pop = 1 + (1 - clamp(k / .25)) * .12, lh = s * 1.12, y0 = y - (lines.length - 1) * lh / 2;
    ctx.translate(x, y); ctx.scale(pop, pop); ctx.translate(-x, -y); lines.forEach((l, i) => outlined(ctx, l, x, y0 + i * lh, s, o.col && o.col !== '#fbf0d8' ? o.col : '#ffffff'));
    if (o.sub) { ctx.font = ROUND(o.subSize || 18); outlined(ctx, o.sub, x, y + s * .9 + 10, o.subSize || 18, '#ffe8b0'); } ctx.restore(); };
  // ---- date badge: a slanted white plate with a black edge, top-left ----
  S.date = (ctx, text, k = 1) => { if (k <= 0 || !text) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const u = clamp(k / .3), size = 30; ctx.font = CHUNK(size); const w = ctx.measureText(text).width + 46, h = 50, x = 26 - (1 - u) * (w + 60), y = 24;
    ctx.globalAlpha = u; ctx.fillStyle = 'rgba(0,0,0,.4)'; const plate = (dx, dy) => { ctx.beginPath(); ctx.moveTo(x + 14 + dx, y + dy); ctx.lineTo(x + w + dx, y + dy); ctx.lineTo(x + w - 14 + dx, y + h + dy); ctx.lineTo(x + dx, y + h + dy); ctx.closePath(); };
    plate(4, 5); ctx.fill(); plate(0, 0); ctx.fillStyle = '#fbf8f0'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text.toUpperCase(), x + w / 2, y + h / 2 + 3); ctx.restore(); };
  // ---- fact strip: big rounded outlined text at the bottom, two lines at most ----
  S.fact = (ctx, text, k = 1, o = {}) => { if (k <= 0) return; P.caption(ctx, text, k, { size: (o.size || 26) * 1.12, x: o.x ?? 640, y: o.y ?? 668, align: o.align || 'center' }); };
  // ---- labels: a clean white pill with a dark edge (o.bg tints it) ----
  C.label = function (ctx, text, x, y, size = 22, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const s = size * 1.02; ctx.font = ROUND(s); const w = ctx.measureText(text).width + s * 1.1, h = s * 1.55;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 3, -h / 2 + 4, w, h, h / 2.6); ctx.fill(); ctx.fillStyle = o.bg || '#ffffff'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2.6); ctx.fill(); ctx.lineWidth = Math.max(2.5, s * .13); ctx.strokeStyle = INK; ctx.stroke();
    ctx.fillStyle = o.col || INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, s * .06); ctx.restore(); };
  // ---- headlines: chunky outlined letters; with a background colour they sit on a bold rounded plate ----
  C.headline = function (ctx, text, x, y, size, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const lines = String(text).split('\n'), s = size * .92; ctx.font = CHUNK(s); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + s * .8, lh = s * 1.08, h = lines.length * lh + s * .45;
    if (o.bg !== false && o.bg !== undefined) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 5, -h / 2 + 7, w, h, s * .22); ctx.fill(); ctx.fillStyle = o.bg; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, s * .22); ctx.fill(); ctx.lineWidth = Math.max(3, s * .09); ctx.strokeStyle = INK; ctx.stroke();
      ctx.fillStyle = o.col || INK; lines.forEach((l, i) => ctx.fillText(l, 0, (i - (lines.length - 1) / 2) * lh + s * .08)); }
    else lines.forEach((l, i) => outlined(ctx, l, 0, (i - (lines.length - 1) / 2) * lh + s * .08, s, o.col && o.col !== INK ? o.col : '#ffffff'));
    ctx.restore(); };
  // ---- handwriting: keep the marker letters, add a white keyline so they read on any background ----
  C.scrawl = function (ctx, text, x, y, size, col = '#c23a2c', rot = -.04, align = 'center') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = `${size}px "Permanent Marker", "Luckiest Guy", sans-serif`; ctx.textAlign = align; ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round'; ctx.lineWidth = size * .22; ctx.strokeStyle = '#fffaf0'; ctx.strokeText(text, 0, 0); ctx.fillStyle = col; ctx.fillText(text, 0, 0); ctx.restore(); };
  G.Type = { outlined, fitLines };
})(window);
