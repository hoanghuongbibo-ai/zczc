/* G.UI — the crisp text layer (user rule: text must never overlap, never look blurry or faded).
 * Every label/card/stamp is DEFERRED: shots queue it with the transform they are in, and toon.js calls G.TOON_UI after
 * the colour grade + grain + vignette, so text is drawn last, sharp and at full contrast.
 * Layout pass per frame: faces registered this frame (UI.face, auto-filled from VK.fig by an episode wrapper) and
 * already-placed labels are obstacles; each new label is clamped into the safe area (30 px margin) and nudged to the
 * nearest free spot. Styles: tag (dark ink on cream, thick outline), sign (white on solid red), any custom draw with a box.
 *   UI.tag(ctx, text, x, y, size, o)          o.fill, o.ink, o.rot, o.k (pop scale), o.free (skip layout)
 *   UI.sign(ctx, text, x, y, size, o)         solid red sign (replaces faded rubber stamps for important words)
 *   UI.box(ctx, x, y, w, h, draw, o)          defer any drawing centred at x,y with a w×h layout box
 *   UI.face(ctx, x0, y0, x1, y1)              register an obstacle (in current transform coords) */
(function (G) {
  'use strict';
  const W = 1280, H = 720, M = 30, Q = [], FACES = []; let frame = -1, UI = null;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const fresh = () => { const f = G.EP ? G.EP.frame : 0; if (f !== frame) { frame = f; Q.length = 0; FACES.length = 0; } };
  function screenBox(m, x, y, w, h) { const pts = [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x - w / 2, y + h / 2], [x + w / 2, y + h / 2]].map(([a, b]) => m.transformPoint(new DOMPoint(a, b)));
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; }
  function face(ctx, x0, y0, x1, y1) { fresh(); const m = ctx.getTransform(); const b = screenBox(m, (x0 + x1) / 2, (y0 + y1) / 2, x1 - x0, y1 - y0); FACES.push(b); }
  function box(ctx, x, y, w, h, draw, o = {}) { fresh(); const m = ctx.getTransform(); Q.push({ m, a: ctx.globalAlpha, x, y, w, h, draw, free: o.free, pri: o.pri || 0 }); }
  const ov = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  function flush(ctx) { if (G.EP && G.EP.frame !== frame) { Q.length = 0; FACES.length = 0; return; }
    const placed = []; UI.flushing = true;
    for (const it of Q) { const b = screenBox(it.m, it.x, it.y, it.w, it.h); let dx = 0, dy = 0;
      // keep inside the safe area
      if (b[0] < M) dx = M - b[0]; if (b[2] + dx > W - M) dx = W - M - b[2]; if (b[1] < M) dy = M - b[1]; if (b[3] + dy > H - M) dy = H - M - b[3];
      if (!it.free) { const obs = placed.concat(FACES.map(f => [f[0] + 8, f[1] + 8, f[2] - 8, f[3] - 8])), at = (ddx, ddy) => obs.reduce((s, o) => s + ov([b[0] + ddx, b[1] + ddy, b[2] + ddx, b[3] + ddy], o), 0);
        if (at(dx, dy) > 0) { let best = null; for (let r = 1; r <= 14; r++) for (const [ux, uy] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]]) { const cx = dx + ux * r * 22, cy = dy + uy * r * 16, nb = [b[0] + cx, b[1] + cy, b[2] + cx, b[3] + cy];
            if (nb[0] < M || nb[2] > W - M || nb[1] < M || nb[3] > H - M) continue; const s = at(cx, cy) * 1000 + Math.hypot(cx - dx, cy - dy); if (!best || s < best[0]) best = [s, cx, cy]; if (s < 1000 && at(cx, cy) === 0) break; }
          if (best) { dx = best[1]; dy = best[2]; } } }
      placed.push([b[0] + dx, b[1] + dy, b[2] + dx, b[3] + dy]);
      ctx.save(); ctx.setTransform(new DOMMatrix().translate(dx, dy).multiply(it.m)); ctx.globalAlpha = it.a; it.draw(ctx); ctx.restore(); }
    Q.length = 0; UI.flushing = false; }
  const FONT = (s) => `700 ${s}px Fredoka, sans-serif`;
  function tag(ctx, text, x, y, size = 26, o = {}) { const k = o.k ?? 1; if (k <= 0) return; const m0 = ctx.getTransform(); size = Math.max(size, 24 / Math.hypot(m0.a, m0.b)); ctx.save(); ctx.font = FONT(size); const w = ctx.measureText(text).width + size * 1.2, h = size * 1.7; ctx.restore();
    box(ctx, x, y, (w + 10) * k, (h + 10) * k, c => { c.translate(x, y); c.rotate(o.rot || 0); c.scale(k, k);
      c.fillStyle = 'rgba(30,18,10,.45)'; c.beginPath(); c.roundRect(-w / 2 + 4, -h / 2 + 5, w, h, h * .32); c.fill();
      c.fillStyle = o.fill || '#fffaf0'; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, h * .32); c.fill(); c.lineWidth = 4; c.strokeStyle = o.ink || '#2a1a10'; c.stroke();
      c.font = FONT(size); c.fillStyle = o.ink || '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, 2); }, o); }
  function sign(ctx, text, x, y, size = 40, o = {}) { const k = o.k ?? 1; if (k <= 0) return; const m0 = ctx.getTransform(); size = Math.max(size, 32 / Math.hypot(m0.a, m0.b)); ctx.save(); ctx.font = `${size}px "Luckiest Guy"`; const w = ctx.measureText(text).width + size * 1.1, h = size * 1.45; ctx.restore();
    box(ctx, x, y, (w + 16) * k, (h + 16) * k, c => { c.translate(x, y); c.rotate(o.rot ?? -.05); c.scale(k, k);
      c.fillStyle = 'rgba(30,10,5,.5)'; c.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); c.fillStyle = o.fill || '#d23a2a'; c.fillRect(-w / 2, -h / 2, w, h); c.lineWidth = 5; c.strokeStyle = '#2a1008'; c.strokeRect(-w / 2, -h / 2, w, h);
      c.strokeStyle = 'rgba(255,255,255,.65)'; c.lineWidth = 3; c.strokeRect(-w / 2 + 7, -h / 2 + 7, w - 14, h - 14);
      c.font = `${size}px "Luckiest Guy"`; c.fillStyle = o.ink || '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, size * .06); }, o); }
  UI = G.UI = { tag, sign, box, face, flush, flushing: false };
  G.TOON_UI = ctx => { ctx.setTransform(1, 0, 0, 1, 0, 0); flush(ctx); };
})(window);
