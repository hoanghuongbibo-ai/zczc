/* G.Globe — a spherical Earth for map shots (user rule: every map starts on a 3D globe, rotates to the region and zooms in).
 * Data: Natural Earth 1:50m land / lakes / rivers (public domain), loaded from assets/geo/world.js as window.GEO.
 * The world is painted once into an equirectangular texture (ocean depth by distance from the coast, biome colours by
 * latitude + dry belts, ice, lakes, rivers, paper grain), then each frame is rendered as a lit orthographic sphere by
 * inverse projection at half resolution (fast), with an atmosphere halo and a starfield behind.
 *   Globe.draw(ctx, t, v)            v = { lon, lat, R }  (R = sphere radius in screen px; centre = frame centre, or v.cx/cy)
 *   Globe.project(lon, lat, v)       → [x, y, visible]
 *   Globe.fly(lt, keys)              keys = [[t, lon, lat, R], …] → eased view (R interpolated in log space)
 *   Globe.pin(ctx, lon, lat, v, label, k, o)  red map pin + parchment label at a place (hidden on the far side) */
(function (G) {
  'use strict';
  const W = 1280, H = 720, TW = 2048, TH = 1024, D2R = Math.PI / 180;
  let tex = null, texData = null;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), lerp = (a, b, k) => a + (b - a) * k;
  const tx = lon => (lon + 180) / 360 * TW, ty = lat => (90 - lat) / 180 * TH;
  function ringPath(g, r) { g.moveTo(tx(r[0]), ty(r[1])); for (let i = 2; i < r.length; i += 2) g.lineTo(tx(r[i]), ty(r[i + 1])); g.closePath(); }
  function build() {
    const GEO = G.GEO; const c = document.createElement('canvas'); c.width = TW; c.height = TH; const g = c.getContext('2d');
    // ocean: deep blue, lighter turquoise shelves near coasts (blurred land halo)
    g.fillStyle = '#1d4f86'; g.fillRect(0, 0, TW, TH);
    const land = new Path2D(); for (const r of GEO.land) { const p = new Path2D(); ringPath(p, r); land.addPath(p); }
    // soft blur by drawing a small copy back up (canvas filters are far too slow on big canvases in headless chrome)
    const soft = (draw, f) => { const sm = document.createElement('canvas'); sm.width = TW / f; sm.height = TH / f; const q = sm.getContext('2d'); q.scale(1 / f, 1 / f); draw(q); return sm; };
    const halo1 = soft(q => { q.strokeStyle = '#3d9ab8'; q.lineWidth = 34; q.lineJoin = 'round'; q.stroke(land); q.fillStyle = '#3d9ab8'; q.fill(land); }, 16);
    g.save(); g.imageSmoothingQuality = 'high'; g.globalAlpha = .9; g.drawImage(halo1, 0, 0, TW, TH);
    const halo2 = soft(q => { q.strokeStyle = '#7fd0d8'; q.lineWidth = 12; q.stroke(land); }, 4); g.globalAlpha = .7; g.drawImage(halo2, 0, 0, TW, TH); g.restore();
    // land: biome colours by latitude band, dry belts (Sahara/Arabia/Thar/Australia/SW USA), polar ice
    g.save(); g.clip(land);
    const lg = g.createLinearGradient(0, 0, 0, TH);
    [[0, '#eef2f4'], [.1, '#dfe6e2'], [.17, '#7e9a5c'], [.25, '#5e8c44'], [.33, '#6f9a48'], [.4, '#b9a86a'], [.45, '#7aa04a'], [.5, '#3f7c34'], [.55, '#4c8a3a'], [.62, '#a99a62'], [.7, '#7a9a52'], [.8, '#8aa070'], [.88, '#e8eef0'], [1, '#f4f8fa']].forEach(([k, col]) => lg.addColorStop(k, col));
    g.fillStyle = lg; g.fillRect(0, 0, TW, TH);
    const dry = [[-15, 35, 16, 33, '#dcc08a'], [35, 60, 13, 32, '#d8b884'], [60, 75, 24, 31, '#d2b080'], [114, 140, -31, -19, '#d49a62'], [-118, -104, 28, 37, '#cfae80'], [75, 110, 36, 46, '#ccb48a'], [-75, -68, -28, -15, '#c8aa7c']];
    g.drawImage(soft(q => { for (const [a, b, c1, d, col] of dry) { q.fillStyle = col; q.beginPath(); q.ellipse((tx(a) + tx(b)) / 2, (ty(c1) + ty(d)) / 2, (tx(b) - tx(a)) / 2 * 1.1, (ty(c1) - ty(d)) / 2 * 1.2, 0, 0, Math.PI * 2); q.fill(); } }, 32), 0, 0, TW, TH);
    // painterly mottling
    let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    g.save(); for (let i = 0; i < 1300; i++) { g.fillStyle = rnd() < .5 ? 'rgba(40,60,20,.10)' : 'rgba(255,240,200,.10)'; g.beginPath(); g.ellipse(rnd() * TW, rnd() * TH, 5 + rnd() * 20, 3 + rnd() * 10, rnd() * 3, 0, Math.PI * 2); g.fill(); } g.restore();
    g.restore();
    g.lineWidth = 1.4; g.strokeStyle = 'rgba(40,40,30,.55)'; g.stroke(land);
    for (const r of GEO.lakes) { g.beginPath(); ringPath(g, r); g.fillStyle = '#3f86b4'; g.fill(); }
    g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#3f86b4'; g.lineWidth = 1.5;
    for (const l of GEO.rivers) { g.beginPath(); g.moveTo(tx(l[0]), ty(l[1])); for (let i = 2; i < l.length; i += 2) { if (Math.abs(l[i] - l[i - 2]) > 180) g.moveTo(tx(l[i]), ty(l[i + 1])); else g.lineTo(tx(l[i]), ty(l[i + 1])); } g.stroke(); }
    tex = c; texData = g.getImageData(0, 0, TW, TH).data;
  }
  const half = document.createElement('canvas'); half.width = W / 2; half.height = H / 2; const hg = half.getContext('2d'); const img = hg.createImageData(W / 2, H / 2);
  const stars = (() => { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); const bg = g.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 900); bg.addColorStop(0, '#13204a'); bg.addColorStop(1, '#050812'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    let s = 3; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let i = 0; i < 700; i++) { const b = r(); g.fillStyle = `rgba(255,250,235,${.2 + b * .8})`; g.beginPath(); g.arc(r() * W, r() * H, b > .95 ? 1.8 : .9, 0, Math.PI * 2); g.fill(); } return c; })();
  function draw(ctx, t, v) {
    if (!tex) build(); const cx = v.cx ?? W / 2, cy = v.cy ?? H / 2, R = v.R;
    ctx.drawImage(stars, 0, 0);
    // atmosphere halo
    const ag = ctx.createRadialGradient(cx, cy, R * .98, cx, cy, R * 1.12); ag.addColorStop(0, 'rgba(140,200,255,.55)'); ag.addColorStop(1, 'rgba(140,200,255,0)'); ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2); ctx.fill();
    const lam0 = v.lon * D2R, ph0 = v.lat * D2R, sp0 = Math.sin(ph0), cp0 = Math.cos(ph0), d = img.data, hw = W / 2, hh = H / 2, r2 = R / 2;
    const Lx = -.45, Ly = .55, Lz = .7;   // light direction (upper left, toward the viewer)
    for (let j = 0; j < hh; j++) { const y = (cy / 2 - j) / r2; for (let i = 0; i < hw; i++) { const x = (i - cx / 2) / r2, rr = x * x + y * y, o = (j * hw + i) * 4;
      if (rr > 1) { d[o + 3] = 0; continue; }
      const z = Math.sqrt(1 - rr), lat = Math.asin(z * sp0 + y * cp0), lon = lam0 + Math.atan2(x, z * cp0 - y * sp0);
      let u = ((lon / D2R + 180) % 360 + 360) % 360 / 360 * TW | 0, w = (90 - lat / D2R) / 180 * TH | 0; if (w >= TH) w = TH - 1; const p = (w * TW + u) * 4;
      const sh = clamp(.35 + .75 * (x * Lx + y * Ly + z * Lz)), rim = Math.pow(1 - z, 3) * .5;
      d[o] = texData[p] * sh + 120 * rim; d[o + 1] = texData[p + 1] * sh + 170 * rim; d[o + 2] = texData[p + 2] * sh + 230 * rim; d[o + 3] = 255; } }
    hg.putImageData(img, 0, 0); ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(half, 0, 0, W, H); ctx.restore();
  }
  function project(lon, lat, v) { const cx = v.cx ?? W / 2, cy = v.cy ?? H / 2, l = (lon - v.lon) * D2R, p = lat * D2R, p0 = v.lat * D2R;
    const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
    return [cx + v.R * Math.cos(p) * Math.sin(l), cy - v.R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), cosc > 0]; }
  const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  function fly(lt, keys) { let a = keys[0], b = keys[0]; for (let i = 1; i < keys.length; i++) if (lt >= keys[i - 1][0]) { a = keys[i - 1]; b = keys[i]; }
    const k = ease(clamp((lt - a[0]) / Math.max(.001, b[0] - a[0]))); let dl = b[1] - a[1]; if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
    return { lon: a[1] + dl * k, lat: lerp(a[2], b[2], k), R: Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), k)) }; }
  function pin(ctx, lon, lat, v, label, k = 1, o = {}) { if (k <= 0) return; const [x, y, vis] = project(lon, lat, v); if (!vis) return; const s = G.FX ? G.FX.settle(clamp(k)) : k;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 4; ctx.strokeStyle = '#2a1a10'; ctx.fillStyle = o.col || '#d8402a';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-26, -34, -18, -58, 0, -58); ctx.bezierCurveTo(18, -58, 26, -34, 0, 0); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -40, 7, 0, Math.PI * 2); ctx.fill();
    ctx.restore(); if (label && G.UI) G.UI.tag(ctx, label, x, y - 90, o.size || 26, { fill: '#fffaf0' }); }
  G.Globe = { draw, project, fly, pin, build, texture: () => (tex || build(), tex) };
})(window);
