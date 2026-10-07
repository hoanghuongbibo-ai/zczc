/* Flat cartoon toolkit matched to the supplied character art: clean black
 * outlines, flat muted fills, soft shading. Canvas 2D only, no dependencies. */
(function (G) {
  'use strict';
  const W = 1280, H = 720, LINE = '#1d1a17';

  // ---------- math ----------
  function rng(seed) { let s = (seed >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = {
    inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
    out: k => 1 - Math.pow(1 - k, 3),
    in: k => k * k * k,
    sine: k => -(Math.cos(Math.PI * k) - 1) / 2,
  };

  // ---------- images (the supplied character art) ----------
  const IMG = {};
  function loadImages(map) {
    return Promise.all(Object.entries(map).map(([k, src]) => new Promise((res, rej) => {
      const im = new Image(); im.onload = () => { IMG[k] = im; res(); }; im.onerror = rej; im.src = src;
    })));
  }

  // ---------- outlined flat shapes ----------
  // shape(ctx, fill, lw, path) — path(ctx) builds the path; fill then stroke.
  function shape(ctx, fill, lw, path) {
    ctx.beginPath(); path(ctx);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = LINE; ctx.lineJoin = ctx.lineCap = 'round'; ctx.stroke(); }
  }
  const poly = (pts, close = true) => c => { c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); if (close) c.closePath(); };
  const rect = (x, y, w, h, r = 0) => c => r ? c.roundRect(x, y, w, h, r) : c.rect(x, y, w, h);
  const circle = (x, y, r) => c => c.arc(x, y, r, 0, Math.PI * 2);
  const ellipse = (x, y, rx, ry, rot = 0) => c => c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
  // Smooth closed curve through points (Catmull-Rom).
  const smooth = (pts, closed = true) => c => {
    const n = pts.length, P = i => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
    c.moveTo(pts[0][0], pts[0][1]);
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      c.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
    }
    if (closed) c.closePath();
  };
  function line(ctx, pts, lw = 3, color = LINE) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineCap = ctx.lineJoin = 'round'; ctx.stroke();
  }
  function grad(ctx, x0, y0, x1, y1, stops) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([k, c]) => g.addColorStop(k, c)); return g;
  }

  // ---------- camera ----------
  // Zoom around a focus point: cam(ctx, zoom, fx, fy) maps (fx,fy) to screen centre.
  function cam(ctx, zoom, fx, fy, rot = 0) {
    ctx.translate(W / 2, H / 2); if (rot) ctx.rotate(rot); ctx.scale(zoom, zoom); ctx.translate(-fx, -fy);
  }

  // ---------- finishing: soft grain + vignette (keeps the clean look) ----------
  let grains = null, vign = null;
  function finish(ctx, t, o = {}) {
    if (!grains) {
      grains = [0, 1, 2].map(i => {
        const c = document.createElement('canvas'); c.width = 640; c.height = 360;
        const g = c.getContext('2d'), r = rng(9 + i), img = g.createImageData(640, 360);
        for (let k = 0; k < img.data.length; k += 4) { const v = 128 + (r() - .5) * 90; img.data[k] = img.data[k + 1] = img.data[k + 2] = v; img.data[k + 3] = 255; }
        g.putImageData(img, 0, 0); return c;
      });
      vign = document.createElement('canvas'); vign.width = W; vign.height = H;
      const v = vign.getContext('2d'), gr = v.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, H * 1.05);
      gr.addColorStop(0, 'rgba(10,8,6,0)'); gr.addColorStop(1, 'rgba(10,8,6,0.55)'); v.fillStyle = gr; v.fillRect(0, 0, W, H);
    }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = o.grain ?? .08; ctx.drawImage(grains[Math.floor(t * 12) % 3], 0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = o.vignette ?? 1; ctx.drawImage(vign, 0, 0);
    ctx.restore();
  }
  function fill(ctx, color, a = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.fillStyle = color; ctx.fillRect(0, 0, W, H); ctx.restore(); }

  // ---------- timeline ----------
  const E = { t: 0 };
  function renderFrame(ctx, shots, t) {
    E.t = t; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    for (const s of shots) if (t >= s.start && t < s.end) { ctx.save(); s.draw(ctx, t - s.start, s.end - s.start, t); ctx.restore(); }
    finish(ctx, t);
  }

  G.Toon = { W, H, LINE, E, rng, clamp, prog, lerp, ease, IMG, loadImages, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, finish, fill, renderFrame };
})(window);
