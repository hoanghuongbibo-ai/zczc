/* Native high-resolution rendering for the 1280×720 engine (load FIRST, before toon.js; enable with ?k=1.5 → 1920×1080).
 * Every canvas keeps its LOGICAL size for the episode code (canvas.width/height read 1280×720 etc.), but its bitmap is k×
 * bigger and every 2D context carries a hidden k× scale, so lines, text and paint are drawn at full resolution:
 *   setTransform/resetTransform/getTransform work in logical units · drawImage(canvas, x, y) and source rectangles use the
 *   source's logical size · get/putImageData go through a logical-size copy · blur filters and shadows scale by k.
 * The stage's toDataURL() therefore yields 1920×1080 frames. k = 1 (no query) changes nothing. */
(function () {
  'use strict';
  const k = +(new URLSearchParams(location.search).get('k') || 1); if (!(k > 0) || k === 1) return; window.HIRES = k;
  const CP = HTMLCanvasElement.prototype, X = CanvasRenderingContext2D.prototype;
  const wD = Object.getOwnPropertyDescriptor(CP, 'width'), hD = Object.getOwnPropertyDescriptor(CP, 'height');
  const O = { setTransform: X.setTransform, getTransform: X.getTransform, drawImage: X.drawImage, getImageData: X.getImageData, putImageData: X.putImageData };
  const hi = c => c && c.__lw != null && !c.__raw;
  const rescale = c => { if (c.__ctx && !c.__raw) O.setTransform.call(c.__ctx, k, 0, 0, k, 0, 0); };
  Object.defineProperty(CP, 'width', { configurable: true, get() { return this.__lw ?? wD.get.call(this); },
    set(v) { if (this.__raw) return wD.set.call(this, v); this.__lw = v; wD.set.call(this, Math.round(v * k)); rescale(this); } });
  Object.defineProperty(CP, 'height', { configurable: true, get() { return this.__lh ?? hD.get.call(this); },
    set(v) { if (this.__raw) return hD.set.call(this, v); this.__lh = v; hD.set.call(this, Math.round(v * k)); rescale(this); } });
  const gc = CP.getContext; CP.getContext = function (type, o) {
    if (type === '2d' && !this.__raw && this.__lw == null) { const w = wD.get.call(this), h = hD.get.call(this); this.width = w; this.height = h; }   // HTML-sized canvases
    const ctx = gc.call(this, type, o); if (type === '2d' && !this.__ctx) { this.__ctx = ctx; rescale(this); } return ctx; };
  const raw = (w, h) => { const c = document.createElement('canvas'); c.__raw = true; wD.set.call(c, w); hD.set.call(c, h); return c; };
  X.setTransform = function (a, b, c, d, e, f) { if (!hi(this.canvas)) return O.setTransform.apply(this, arguments);
    const m = typeof a === 'object' ? new DOMMatrix([a.a, a.b, a.c, a.d, a.e, a.f]) : new DOMMatrix([a, b, c, d, e, f]);
    return O.setTransform.call(this, new DOMMatrix([k, 0, 0, k, 0, 0]).multiply(m)); };
  X.resetTransform = function () { return this.setTransform(1, 0, 0, 1, 0, 0); };
  X.getTransform = function () { const m = O.getTransform.call(this); return hi(this.canvas) ? new DOMMatrix([1 / k, 0, 0, 1 / k, 0, 0]).multiply(m) : m; };
  X.drawImage = function (img, ...a) { if (hi(img)) {
      if (a.length === 2) return O.drawImage.call(this, img, a[0], a[1], img.__lw, img.__lh);
      if (a.length === 8) return O.drawImage.call(this, img, a[0] * k, a[1] * k, a[2] * k, a[3] * k, a[4], a[5], a[6], a[7]); }
    return O.drawImage.call(this, img, ...a); };
  X.getImageData = function (x, y, w, h, s) { if (!hi(this.canvas)) return O.getImageData.call(this, x, y, w, h, s);
    const t = raw(w, h), g = t.getContext('2d'); O.drawImage.call(g, this.canvas, x * k, y * k, w * k, h * k, 0, 0, w, h); return O.getImageData.call(g, 0, 0, w, h); };
  X.putImageData = function (img, x, y) { if (!hi(this.canvas)) return O.putImageData.apply(this, arguments);
    const t = raw(img.width, img.height); O.putImageData.call(t.getContext('2d'), img, 0, 0);
    const m = O.getTransform.call(this); O.setTransform.call(this, k, 0, 0, k, 0, 0); const op = this.globalCompositeOperation, ga = this.globalAlpha, f = this.filter;
    this.globalCompositeOperation = 'copy'; this.globalAlpha = 1; this.filter = 'none';
    this.save(); this.beginPath(); this.rect(x, y, img.width, img.height); this.clip(); O.drawImage.call(this, t, x, y, img.width, img.height); this.restore();
    this.globalCompositeOperation = op; this.globalAlpha = ga; this.filter = f; O.setTransform.call(this, m); };
  // pixel-unit properties that the transform does not scale
  const fD = Object.getOwnPropertyDescriptor(X, 'filter');
  Object.defineProperty(X, 'filter', { configurable: true, get() { return fD.get.call(this); },
    set(v) { fD.set.call(this, hi(this.canvas) && typeof v === 'string' ? v.replace(/blur\(\s*([\d.]+)px\s*\)/g, (_, n) => `blur(${n * k}px)`) : v); } });
  for (const p of ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY']) { const D = Object.getOwnPropertyDescriptor(X, p);
    Object.defineProperty(X, p, { configurable: true, get() { const v = D.get.call(this); return hi(this.canvas) ? v / k : v; }, set(v) { D.set.call(this, hi(this.canvas) ? v * k : v); } }); }
})();
