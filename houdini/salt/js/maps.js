/* Crisp vector maps from Natural Earth (window.GEO: land / lakes / rivers, public domain) — the hand-off target of the 3D
 * globe intro (user rule: every map starts on a spherical Earth, rotates + zooms in, then becomes the detailed map).
 *   M.view(lon, lat, k)            view = centre + k px per degree of latitude (globe radius R ↔ k = R·π/180)
 *   M.draw(ctx, t, v, o)           painted map: sea, land (parchment + soft relief tint), lakes, rivers, grain
 *   M.pt(v, lon, lat)              → [x, y] screen point
 *   M.route(ctx, v, pts, k, o)     animated route (pts = [[lon,lat]…], k = 0..1 drawn), dashed or solid, with an arrow head
 *   M.zone(ctx, v, ring, col, a)   a filled region (lon/lat ring), clipped to land
 *   M.pin(ctx, v, lon, lat, label, k)  red pin + crisp label (UI layer)
 *   M.fly(lt, keys)                keys [[t, lon, lat, k]…] → eased view (k interpolated in log space)
 *   M.intro(ctx, t, lt, lon, lat, k1, D)  globe → map: draws the globe flying in over the first D s, then fades it out */
(function (G) {
  'use strict';
  const { W, H, clamp, lerp, ease, grad } = G.Toon, TAU = Math.PI * 2, D2R = Math.PI / 180, OUT = '#3a2a1a';
  let RINGS = null;
  const prep = () => { if (RINGS) return; const bb = r => { let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (let i = 0; i < r.length; i += 2) { a = Math.min(a, r[i]); b = Math.max(b, r[i]); c = Math.min(c, r[i + 1]); d = Math.max(d, r[i + 1]); } return [a, b, c, d]; };
    RINGS = { land: G.GEO.land.map(r => [r, bb(r)]), lakes: G.GEO.lakes.map(r => [r, bb(r)]), rivers: G.GEO.rivers.map(r => [r, bb(r)]) }; };
  const view = (lon, lat, k, cx = W / 2, cy = H / 2) => ({ lon, lat, k, cx, cy, cl: Math.cos(lat * D2R) });
  const pt = (v, lon, lat) => [v.cx + (lon - v.lon) * v.k * v.cl, v.cy - (lat - v.lat) * v.k];
  const vis = (v, b) => { const x0 = v.lon - (v.cx + 80) / (v.k * v.cl), x1 = v.lon + (W - v.cx + 80) / (v.k * v.cl), y0 = v.lat - (H - v.cy + 80) / v.k, y1 = v.lat + (v.cy + 80) / v.k; return !(b[1] < x0 || b[0] > x1 || b[3] < y0 || b[2] > y1); };
  function trace(c, v, r, close = true) { const [x, y] = pt(v, r[0], r[1]); c.moveTo(x, y); const step = v.k < 6 ? 6 : v.k < 20 ? 2 : 2; for (let i = 2; i < r.length; i += step) { const [a, b] = pt(v, r[i], r[i + 1]); c.lineTo(a, b); } if (close) c.closePath(); }
  function landPath(v) { prep(); const p = new Path2D(); for (const [r, b] of RINGS.land) if (vis(v, b)) trace(p, v, r); return p; }
  function draw(ctx, t, v, o = {}) { prep(); ctx.save();
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#4f8cc0'], [1, '#3a76ac']]); ctx.fillRect(0, 0, W, H);
    const land = landPath(v);
    ctx.save(); ctx.strokeStyle = 'rgba(160,215,235,.55)'; ctx.lineWidth = 16; ctx.lineJoin = 'round'; ctx.stroke(land); ctx.strokeStyle = 'rgba(190,230,240,.6)'; ctx.lineWidth = 7; ctx.stroke(land); ctx.restore();   // shallow coastal water
    ctx.fillStyle = '#ece0bc'; ctx.fill(land);
    ctx.save(); ctx.clip(land);   // soft relief tint + paper grain on land
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, 'rgba(140,170,110,.28)'], [.6, 'rgba(170,180,120,.18)'], [1, 'rgba(200,170,110,.2)']]); ctx.fillRect(0, 0, W, H);
    if (o.relief) for (const [lon, lat, rx, ry, col] of o.relief) { const [x, y] = pt(v, lon, lat); const gr = ctx.createRadialGradient(x, y, 4, x, y, rx * v.k); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gr; ctx.save(); ctx.translate(x, y); ctx.scale(1, ry / rx); ctx.translate(-x, -y); ctx.fillRect(x - rx * v.k, y - rx * v.k, rx * v.k * 2, rx * v.k * 2); ctx.restore(); }
    if (G.Paint2) G.Paint2.grain(ctx, 0, 0, W, H, .25, 13, 'multiply', 1.3);
    ctx.restore();
    ctx.lineWidth = 2.6; ctx.strokeStyle = OUT; ctx.lineJoin = 'round'; ctx.stroke(land);
    ctx.fillStyle = '#6aa6cc'; ctx.strokeStyle = 'rgba(40,70,100,.7)'; ctx.lineWidth = 1.5; for (const [r, b] of RINGS.lakes) if (vis(v, b)) { const p = new Path2D(); trace(p, v, r); ctx.fill(p); ctx.stroke(p); }
    ctx.strokeStyle = '#5a9ac4'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = Math.min(4, 1.2 + v.k / 40); for (const [r, b] of RINGS.rivers) if (vis(v, b)) { ctx.beginPath(); trace(ctx, v, r, false); ctx.stroke(); }
    ctx.restore(); }
  function route(ctx, v, pts, k, o = {}) { if (k <= 0) return; const P = pts.map(([a, b]) => pt(v, a, b)); let L = 0; const seg = []; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(d); L += d; }
    let rem = L * clamp(k); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const path = new Path2D(); path.moveTo(...P[0]); let end = P[0], dir = 0;
    for (let i = 1; i < P.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i - 1]); end = [lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)]; dir = Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0]); path.lineTo(...end); rem -= seg[i - 1]; }
    const w = o.w || 9; ctx.strokeStyle = '#fff8e8'; ctx.lineWidth = w + 7; ctx.stroke(path); if (o.dash) ctx.setLineDash(o.dash); ctx.strokeStyle = o.col || '#c8322a'; ctx.lineWidth = w; ctx.stroke(path); ctx.setLineDash([]);
    if (o.head !== false && k > .02) { ctx.translate(...end); ctx.rotate(dir); ctx.fillStyle = o.col || '#c8322a'; ctx.strokeStyle = '#fff8e8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(w * 1.8, 0); ctx.lineTo(-w * 1.2, -w * 1.4); ctx.lineTo(-w * 1.2, w * 1.4); ctx.closePath(); ctx.stroke(); ctx.fill(); }
    ctx.restore(); return end; }
  function zone(ctx, v, ring, col, a = .45, o = {}) { if (a <= 0) return; ctx.save(); ctx.clip(landPath(v)); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ring.forEach(([lon, lat], i) => { const [x, y] = pt(v, lon, lat); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill();
    if (o.hatch) { ctx.clip(); ctx.globalAlpha = a * .8; ctx.strokeStyle = 'rgba(40,20,10,.5)'; ctx.lineWidth = 2; for (let x = -H; x < W; x += 16) { ctx.beginPath(); ctx.moveTo(x, H); ctx.lineTo(x + H, 0); ctx.stroke(); } }
    ctx.globalAlpha = Math.min(1, a * 1.8); ctx.strokeStyle = G.Guide.hexMul(col, .6); ctx.lineWidth = 3; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.restore(); }
  function pin(ctx, v, lon, lat, label, k = 1, o = {}) { if (k <= 0) return; const [x, y] = pt(v, lon, lat), s = G.FX ? G.FX.settle(clamp(k)) : k;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 4; ctx.strokeStyle = '#2a1a10'; ctx.fillStyle = o.col || '#d8402a';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-24, -32, -17, -54, 0, -54); ctx.bezierCurveTo(17, -54, 24, -32, 0, 0); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -37, 7, 0, TAU); ctx.fill(); ctx.restore();
    if (label && G.UI) G.UI.tag(ctx, label, x + (o.dx || 0), y - 84 + (o.dy || 0), o.size || 26, { k: clamp(k) }); }
  function label(ctx, v, lon, lat, text, o = {}) { const [x, y] = pt(v, lon, lat); ctx.save(); ctx.font = `${o.size || 22}px "Luckiest Guy"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = o.a ?? .8;
    ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,250,235,.9)'; ctx.lineJoin = 'round'; ctx.strokeText(text, x, y); ctx.fillStyle = o.col || '#5a4632'; ctx.fillText(text, x, y); ctx.restore(); }
  function fly(lt, keys) { let a = keys[0], b = keys[0]; for (let i = 1; i < keys.length; i++) if (lt >= keys[i - 1][0]) { a = keys[i - 1]; b = keys[i]; }
    const k = ease.inOut(clamp((lt - a[0]) / Math.max(.001, b[0] - a[0]))); return view(lerp(a[1], b[1], k), lerp(a[2], b[2], k), Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), k))); }
  function intro(ctx, t, lt, lon, lat, k1, D = 2.6) { if (lt >= D) return; const Gl = G.Globe, R1 = k1 / D2R, a = 1 - clamp((lt - D * .72) / (D * .28)); if (a <= 0) return;
    const gv = Gl.fly(lt, [[0, lon - 70, lat * .4 + 8, 250], [D * .3, lon - 18, lat, 330], [D * .82, lon, lat, R1]]); ctx.save(); ctx.globalAlpha = a; Gl.draw(ctx, t, gv); ctx.restore(); }
  G.MAP = { view, pt, draw, route, zone, pin, label, fly, intro, landPath };
})(window);
