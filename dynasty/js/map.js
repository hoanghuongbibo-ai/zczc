/* Parchment maps in the reference style: aged tan land with mottled texture, pale sea, brown coastline with a soft
 * offset band, colonies/regions as flat colour fills, marker-caps labels, routes that draw themselves on.
 * Data: window.Geo (dynasty/js/geo-colonies.js) — lon/lat rings. A view is { lon, lat, k } (k = px per degree of
 * latitude, centre of the frame = lon/lat). Keyframe views with M.lerpView for camera moves. */
(function (G) {
  'use strict';
  const T = G.Toon, K = G.Kit, W = T.W, H = T.H, Geo = G.Geo;
  const SEA = '#e6dcc0', LAND = '#d9b97c', COAST = '#7a5232';
  const lerpView = (a, b, k) => ({ lon: T.lerp(a.lon, b.lon, k), lat: T.lerp(a.lat, b.lat, k), k: a.k * Math.pow(b.k / a.k, k) });
  function proj(v) { const c = Math.cos(v.lat * Math.PI / 180); return ([lon, lat]) => [W / 2 + (lon - v.lon) * v.k * c, H / 2 - (lat - v.lat) * v.k]; }
  const ringPath = (p, rings) => c => { for (const r of rings) { const a = p(r[0]); c.moveTo(a[0], a[1]); for (let i = 1; i < r.length; i++) { const q = p(r[i]); c.lineTo(q[0], q[1]); } c.closePath(); } };

  // ---------- textures (built once) ----------
  let tex = null;
  function textures() {
    if (tex) return tex;
    const mk = (base, blot, seed, n) => {
      const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d'), r = T.rng(seed);
      g.fillStyle = base; g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < n; i++) { const x = r() * 512, y = r() * 512, rad = 20 + r() * 90, gr = g.createRadialGradient(x, y, 0, x, y, rad);
        gr.addColorStop(0, blot.replace('A', (.05 + r() * .09).toFixed(3))); gr.addColorStop(1, blot.replace('A', '0')); g.fillStyle = gr;
        for (const dx of [-512, 0, 512]) for (const dy of [-512, 0, 512]) { g.save(); g.translate(dx, dy); g.fillRect(x - rad, y - rad, rad * 2, rad * 2); g.restore(); } }
      const img = g.getImageData(0, 0, 512, 512);
      for (let k = 0; k < img.data.length; k += 4) { const v = (r() - .5) * 14; img.data[k] += v; img.data[k + 1] += v; img.data[k + 2] += v; }
      g.putImageData(img, 0, 0); return c;
    };
    const land = mk(LAND, 'rgba(120,80,30,A)', 7, 70), sea = mk(SEA, 'rgba(150,130,90,A)', 8, 50);
    const vg = document.createElement('canvas'); vg.width = W; vg.height = H; const v = vg.getContext('2d');
    const gr = v.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .95); gr.addColorStop(0, 'rgba(90,55,20,0)'); gr.addColorStop(1, 'rgba(90,55,20,.35)');
    v.fillStyle = gr; v.fillRect(0, 0, W, H);
    tex = { land, sea, vg }; return tex;
  }

  // ---------- base map ----------
  // base(ctx, view, { states: true, dimStates: [...], west: false }) — sea, land, coast, colony borders.
  function base(ctx, v, o = {}) {
    const tx = textures(), p = proj(v);
    ctx.save(); ctx.fillStyle = ctx.createPattern(tx.sea, 'repeat'); ctx.fillRect(0, 0, W, H); ctx.restore();
    const land = ringPath(p, Geo.land);
    // coastal band on the sea side (darker outline offset) + coast stroke
    ctx.save(); ctx.beginPath(); land(ctx); ctx.lineJoin = 'round';
    ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(150,120,80,.22)'; ctx.stroke();
    ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(150,120,80,.25)'; ctx.stroke();
    ctx.fillStyle = ctx.createPattern(tx.land, 'repeat'); ctx.fill();
    ctx.lineWidth = 2.6; ctx.strokeStyle = COAST; ctx.stroke(); ctx.restore();
    if (o.states !== false) {
      ctx.save(); ctx.beginPath(); land(ctx); ctx.clip();
      for (const [code, rings] of Object.entries(Geo.states)) {
        if (o.only && !o.only.includes(code)) continue;
        ctx.beginPath(); ringPath(p, rings)(ctx); ctx.lineWidth = 1.4; ctx.strokeStyle = 'rgba(110,75,40,.55)'; ctx.setLineDash([]); ctx.stroke();
      }
      ctx.restore();
    }
    if (o.vignette !== false) ctx.drawImage(tx.vg, 0, 0);
  }

  // Fill one or more colonies (codes) in a colour, clipped to land. a = alpha; o.hatch for "occupied" stripes.
  function fill(ctx, v, codes, color, a = 1, o = {}) {
    if (a <= 0) return;
    const p = proj(v);
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ringPath(p, Geo.land)(ctx); ctx.clip();
    ctx.beginPath(); for (const c of codes) ringPath(p, Geo.states[c] || [])(ctx);
    if (o.clip) { ctx.save(); ctx.clip(); o.clip(ctx, p); ctx.restore(); }
    else { ctx.fillStyle = color; ctx.fill(); ctx.lineWidth = 2.2; ctx.strokeStyle = o.edge || 'rgba(60,30,15,.55)'; ctx.stroke(); }
    ctx.restore();
  }
  // Fill a region given by a circle around a point (lon, lat, radius in degrees) clipped to land — e.g. "the NYC area".
  function blob(ctx, v, lon, lat, rDeg, color, a = 1, grow = 1) {
    if (a <= 0 || grow <= 0) return;
    const p = proj(v), c = p([lon, lat]), r = rDeg * v.k * grow;
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ringPath(p, Geo.land)(ctx); ctx.clip();
    ctx.beginPath(); ctx.arc(c[0], c[1], r, 0, 7); ctx.fillStyle = color; ctx.fill(); ctx.restore();
  }
  // Colour flood that wipes across a set of colonies from a point (conquest look). k = 0..1.
  function flood(ctx, v, codes, color, k, from, a = .85) {
    if (k <= 0) return;
    const p = proj(v), c = p(from);
    fill(ctx, v, codes, color, a, { clip: (cx) => { cx.beginPath(); cx.arc(c[0], c[1], K.out(k) * 900, 0, 7); cx.fillStyle = color; cx.fill(); } });
    if (k >= 1) fill(ctx, v, codes, 'rgba(0,0,0,0)', 1, { edge: 'rgba(60,20,10,.7)' });
  }
  // Route (dashed, draws on with k) through lon/lat points, arrowhead at the tip.
  function route(ctx, v, pts, k, o = {}) {
    if (k <= 0) return;
    const p = proj(v), sp = pts.map(p), seg = [], L = [0];
    for (let i = 1; i < sp.length; i++) L.push(L[i - 1] + Math.hypot(sp[i][0] - sp[i - 1][0], sp[i][1] - sp[i - 1][1]));
    const want = L[L.length - 1] * K.clamp(k);
    seg.push(sp[0]);
    for (let i = 1; i < sp.length; i++) { if (L[i] <= want) seg.push(sp[i]); else { const u = (want - L[i - 1]) / (L[i] - L[i - 1]); seg.push([T.lerp(sp[i - 1][0], sp[i][0], u), T.lerp(sp[i - 1][1], sp[i][1], u)]); break; } }
    ctx.save(); ctx.setLineDash(o.dash || [14, 9]);
    T.line(ctx, seg, (o.lw || 6) + 4, 'rgba(255,248,230,.8)'); T.line(ctx, seg, o.lw || 6, o.color || '#2f4c7d'); ctx.restore();
    if (seg.length > 1 && o.head !== false) {
      const a = seg[seg.length - 1], b = seg[seg.length - 2], ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
      ctx.save(); ctx.translate(a[0], a[1]); ctx.rotate(ang); K.sh(ctx, T.poly([[10, 0], [-10, -11], [-10, 11]]), o.color || '#2f4c7d', 3); ctx.restore();
    }
  }
  // Pin / dot at a place, with optional marker label.
  function dot(ctx, v, lon, lat, lt, o = {}) {
    if (lt <= 0) return;
    const q = proj(v)([lon, lat]), k = K.popK(lt, .25);
    ctx.save(); ctx.translate(q[0], q[1]); ctx.scale(k, k); K.sh(ctx, T.circle(0, 0, o.r || 8), o.color || '#c3322c', 3); ctx.restore();
    if (o.label) K.label(ctx, o.label, q[0] + (o.dx ?? 0), q[1] + (o.dy ?? -26), lt - .05, { size: o.size || 24, stroke: 6, strokeColor: 'rgba(245,236,212,.9)', align: o.align });
  }
  // Small British Union flag (1707–1801: St George + St Andrew, no St Patrick saltire) on a pin.
  function unionFlag(ctx, x, y, s, wave = 0) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    T.line(ctx, [[0, 0], [0, -60]], 4, '#3a2a1c');
    ctx.save(); ctx.translate(0, -60); ctx.transform(1, Math.sin(wave) * .06, 0, 1, 0, 0);
    const w = 50, h = 30; ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    ctx.fillStyle = '#1f3d7a'; ctx.fillRect(0, 0, w, h);
    T.line(ctx, [[0, 0], [w, h]], 7, '#fff'); T.line(ctx, [[w, 0], [0, h]], 7, '#fff');
    ctx.fillStyle = '#fff'; ctx.fillRect(w / 2 - 7, 0, 14, h); ctx.fillRect(0, h / 2 - 7, w, 14);
    ctx.fillStyle = '#c8202d'; ctx.fillRect(w / 2 - 4, 0, 8, h); ctx.fillRect(0, h / 2 - 4, w, 8);
    ctx.restore(); ctx.lineWidth = 3; ctx.strokeStyle = K.INK; ctx.strokeRect(0, -60, 50, 30);
    ctx.restore();
  }
  // Mini map for the HUD badge: layers = [[codes, color], ...] fitted together into ~w×h around (cx, cy).
  function mini(ctx, cx, cy, w, h, layers, mark) {
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (const [codes] of layers) for (const c of codes) for (const r of Geo.states[c]) for (const [x, y] of r) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const lat = (y0 + y1) / 2, cl = Math.cos(lat * Math.PI / 180), k = Math.min(w / ((x1 - x0) * cl), h / (y1 - y0)), lon = (x0 + x1) / 2;
    const p = ([lo, la]) => [cx + (lo - lon) * k * cl, cy - (la - lat) * k];
    ctx.save();
    for (const [codes, color] of layers) { ctx.beginPath(); for (const c of codes) ringPath(p, Geo.states[c])(ctx); ctx.fillStyle = color; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(30,20,10,.8)'; ctx.stroke(); }
    if (mark) { const q = p(mark); K.sh(ctx, T.circle(q[0], q[1], 4.5), '#e3262b', 2); }
    ctx.restore();
  }

  G.Atlas = { proj, lerpView, base, fill, blob, flood, route, dot, unionFlag, mini, SEA, LAND };
})(window);
