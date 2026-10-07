/* Shared explainer-style elements + small, deterministic physics helpers.
 * Everything is a pure function of time so any frame can be rendered directly. */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, shape, poly, rect, circle, line, grad, glow, prog, lerp, ease, clamp, rng } = T;
  const INK = T.LINE;
  const FONT = (w, px) => `${w} ${px}px Fredoka, "DejaVu Sans", sans-serif`;
  const DISPLAY = px => `${px}px "Luckiest Guy", Fredoka, sans-serif`;

  // ---------- physics (closed form) ----------
  // Overshoot-and-settle for things that snap into place (0..1 → 0..1).
  const settle = k => { k = clamp(k); const c = 1.7; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
  // Damped oscillation: value starts at amp and rings down. f in Hz, z = decay per second.
  const ring = (t, amp, f, z) => t < 0 ? amp : amp * Math.exp(-z * t) * Math.cos(2 * Math.PI * f * t);
  // Pendulum angle of a weight on a string of length L (px), released at angle a0, with damping.
  const pendulum = (t, a0, L, z = .35) => { const w = Math.sqrt(980 / Math.max(L, 1)); return t < 0 ? a0 : a0 * Math.exp(-z * t) * Math.cos(w * t); };
  // Drop from height h (px) under gravity with bounces (restitution e). Returns height above floor (0 = resting).
  function dropBounce(t, h, e = .35, g = 2400) {
    if (t < 0) return h;
    let v = Math.sqrt(2 * g * h), tt = Math.sqrt(2 * h / g);
    if (t < tt) return h - .5 * g * t * t;
    t -= tt;
    for (let i = 0; i < 4; i++) { v *= e; const span = 2 * v / g; if (t < span) return v * t - .5 * g * t * t; t -= span; }
    return 0;
  }
  // Critically-damped approach from a to b starting at t0 with time constant tau.
  const approach = (t, t0, a, b, tau = .12) => t < t0 ? a : b + (a - b) * (1 + (t - t0) / tau) * Math.exp(-(t - t0) / tau);
  const push = (lt, dur, a = 1, b = 1.07) => lerp(a, b, ease.sine(clamp(lt / dur)));

  // ---------- explainer furniture ----------
  function dateTag(ctx, text) {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.font = FONT(600, 26); const w = ctx.measureText(text).width + 34;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(56, 35, w, 46);
    shape(ctx, '#f1ead8', 3, rect(52, 30, w, 46, 3));
    ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, 69, 54);
    ctx.restore();
  }
  function caption(ctx, text, lt, at = .4, x = W - 60, y = H - 58) {
    const k = clamp((lt - at) / .3); if (k <= 0) return;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = k;
    ctx.font = FONT(700, 20); const w = ctx.measureText(text).width + 30, xx = x - w + (1 - ease.out(k)) * 40;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(xx + 4, y + 4, w, 38);
    shape(ctx, '#f1ead8', 3, rect(xx, y, w, 38, 2)); ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, xx + 15, y + 20);
    ctx.restore();
  }
  function vignette(ctx, cx = W / 2, cy = H * .42, a = .55) {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createRadialGradient(cx, cy, H * .25, cx, cy, H * 1.05); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  }
  function darkBg(ctx, tone = '#2f2a26') { // the reference's graphic-beat background: dark, centre glow
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = tone; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * .45, 30, W / 2, H * .45, H * .9); g.addColorStop(0, 'rgba(255,240,220,.16)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  }
  const shade = (hex, k) => { const p = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16)); return `rgb(${p.map(v => Math.round(clamp(v * k, 0, 255))).join(',')})`; };
  function plankWall(ctx, x0, x1, top, bottom, base, seed = 1) {
    const r = rng(seed);
    for (let x = x0; x < x1; x += 56) { ctx.fillStyle = shade(base, 1 + (r() - .5) * .08); ctx.fillRect(x, top, 56, bottom - top); line(ctx, [[x, top], [x, bottom]], 2.5, 'rgba(0,0,0,.22)'); }
  }
  function lamp(ctx, x, y, a = 1) {
    line(ctx, [[x, -300], [x, y]], 3);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .14 * a; ctx.fillStyle = grad(ctx, 0, y, 0, y + 420, [[0, '#ffe9b8'], [1, 'rgba(0,0,0,0)']]);
    ctx.beginPath(); ctx.moveTo(x - 30, y + 20); ctx.lineTo(x + 30, y + 20); ctx.lineTo(x + 230, y + 440); ctx.lineTo(x - 230, y + 440); ctx.closePath(); ctx.fill(); ctx.restore();
    glow(ctx, x, y + 24, 120, `rgba(255,230,170,${.35 * a})`);
    shape(ctx, '#c9a35a', 3.5, poly([[x - 16, y], [x + 16, y], [x + 34, y + 24], [x - 34, y + 24]]));
  }
  function wallClock(ctx, x, y, r) {
    shape(ctx, '#6b4f39', 3.5, circle(x, y, r + 6)); shape(ctx, '#f1ead8', 3, circle(x, y, r));
    const hA = (1 + 26 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 26 / 60 * Math.PI * 2 - Math.PI / 2;
    line(ctx, [[x, y], [x + Math.cos(hA) * r * .45, y + Math.sin(hA) * r * .45]], 4); line(ctx, [[x, y], [x + Math.cos(mA) * r * .7, y + Math.sin(mA) * r * .7]], 3);
  }
  // A paper document: title + grey lines for text (the reference's convention).
  function paperDoc(ctx, x, y, w, h, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 8, w, h);
    shape(ctx, o.fill || '#f2ecd9', 3, rect(-w / 2, -h / 2, w, h, 2));
    let yy = -h / 2 + 30;
    if (o.title) { ctx.fillStyle = INK; ctx.font = FONT(700, o.titleSize || 26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.title, 0, yy + 6); yy += 44; }
    if (o.sub) { ctx.fillStyle = '#4a443d'; ctx.font = FONT(600, 14); ctx.textAlign = 'center'; ctx.fillText(o.sub, 0, yy - 8); yy += 24; }
    const r = rng(o.seed || 3);
    for (let i = 0; i < (o.lines ?? 9); i++, yy += o.lineGap || 22) { if (yy > h / 2 - 24) break; line(ctx, [[-w / 2 + 34, yy], [-w / 2 + 34 + (w - 68) * (.55 + r() * .45), yy]], 4, 'rgba(70,64,58,.45)'); }
    if (o.draw) o.draw(ctx);
    ctx.restore();
  }
  // Rubber stamp slamming down: big + faint → lands with a small settle. k from 0.
  function stamp(ctx, text, x, y, k, o = {}) {
    if (k <= 0) return;
    const sc = k < .12 ? lerp(1.9, .94, k / .12) : lerp(.94, 1, clamp((k - .12) / .1)), a = clamp(k / .1);
    const color = o.color || '#2f7a46', size = o.size || 40;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.12); ctx.scale(sc, sc); ctx.globalAlpha = .9 * a;
    ctx.font = DISPLAY(size); const w = ctx.measureText(text).width + size * .9, h = size * 1.55;
    ctx.lineWidth = 6; ctx.strokeStyle = color; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 2.5; ctx.strokeRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16);
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, size * .08);
    ctx.globalCompositeOperation = 'destination-out'; const r = rng(9); // worn rubber
    for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc((r() - .5) * w, (r() - .5) * h, r() * 2.4, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  // Big outlined number/heading like the reference's counters.
  function bigText(ctx, text, x, y, px, o = {}) {
    ctx.save(); ctx.font = DISPLAY(px); ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round'; ctx.lineWidth = px * .16; ctx.strokeStyle = INK; ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.fillText(text, x + 4, y + 6); ctx.strokeText(text, x, y); ctx.fillStyle = o.color || '#f6c945'; ctx.fillText(text, x, y);
    ctx.restore();
  }
  const black = () => {};
  // Draw a posable character (feet at x,y). o: { mirror, rot, tint (silhouette colour), filter (css) }
  const figBuf = document.createElement('canvas');
  function fig(ctx, x, y, s, pose, o = {}) {
    if (o.tint || o.filter) {
      const w = Math.ceil(1400 * s), h = Math.ceil(1700 * s); figBuf.width = w; figBuf.height = h;
      const g = figBuf.getContext('2d'); g.translate(w / 2, h - 40 * s); g.scale(s * (o.mirror ? -1 : 1), s); G.Chars.figure(g, pose);
      if (o.tint) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = o.tint; g.fillRect(0, 0, w, h); }
      ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.filter) ctx.filter = o.filter; ctx.drawImage(figBuf, -w / 2, -(h - 40 * s)); ctx.restore();
      return;
    }
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.mirror ? -1 : 1), s); G.Chars.figure(ctx, pose); ctx.restore();
  }

  G.FX = { fig, INK, FONT, DISPLAY, settle, ring, pendulum, dropBounce, approach, push, dateTag, caption, vignette, darkBg, shade, plankWall, lamp, wallClock, paperDoc, stamp, bigText, black };
})(window);
