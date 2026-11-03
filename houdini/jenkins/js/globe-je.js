/* The War of Jenkins' Ear — the globe: a whole Earth hanging in space (stars, a blue atmosphere, sunlit oceans, land coloured by
 * climate, drifting clouds, a soft night side), drawn from the full Natural Earth country set. World-scale map shots
 * (K.mapShot with a radius under ~700 px) use it automatically; zoomed-in maps stay paper maps. */
(function (G) {
  'use strict';
  const K = G.KJ, F2 = G.F2, U = G.SUI, C2 = G.Cast2, mix = C2.mix, ease = U.ease, WORLD = G.WORLD, GEO = G.GEO;
  const lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), R = Math.PI / 180;
  const rng = s => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const DESERT = ['Algeria', 'Libya', 'Egypt', 'Mali', 'Niger', 'Chad', 'Mauritania', 'Western Sahara', 'Sudan', 'Saudi Arabia', 'Yemen', 'Oman', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Iraq', 'Jordan', 'Iran', 'Afghanistan', 'Pakistan', 'Turkmenistan', 'Uzbekistan', 'Kazakhstan', 'Mongolia', 'Namibia', 'Botswana', 'Australia', 'Somalia', 'Djibouti', 'Eritrea', 'Syria', 'Israel', 'Palestine', 'Tunisia', 'Morocco', 'Bahrain'];
  const ICE = ['Greenland', 'Antarctica', 'French Southern and Antarctic Lands', 'Heard Island and McDonald Islands', 'South Georgia and the Islands'];
  const BOREAL = ['Canada', 'Russia', 'Norway', 'Sweden', 'Finland', 'Iceland', 'Estonia', 'Latvia'];
  const hash = s => { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 1000; return h / 1000; };
  const biome = (nm, w) => { const k = w.k, sr = w.sr, j = (hash(nm) - .5) * .14; let c;
    if (ICE.includes(nm)) c = '#eef3f6'; else if (DESERT.includes(nm)) c = '#d9bf86'; else if (BOREAL.includes(nm)) c = '#6f9a5c';
    else if (k === 'South America' || sr === 'Central America' || sr === 'Caribbean' || sr === 'Middle Africa' || sr === 'South-Eastern Asia' || sr === 'Western Africa') c = '#4f9a4a';
    else if (k === 'Africa' || sr === 'Southern Asia') c = '#a6b25c'; else c = '#86b25e';
    return j > 0 ? mix(c, '#ffffff', j) : mix(c, '#203018', -j); };
  const COL = {}; for (const nm in WORLD) COL[nm] = biome(nm, WORLD[nm]);
  const STARS = (() => { const r = rng(77), a = []; for (let i = 0; i < 420; i++) a.push([r() * 1900 - 300, r() * 1200 - 240, r() < .08 ? 2.2 : r() * 1.3 + .4, r() * 6.28, r()]); return a; })();
  const CLOUDS = (() => { const r = rng(5), a = []; for (let i = 0; i < 46; i++) { const la = (r() - .5) * 140, lo = r() * 360 - 180, n = 3 + (r() * 4 | 0), b = []; for (let j = 0; j < n; j++) b.push([lo + (r() - .5) * 14, la + (r() - .5) * 6, 2.5 + r() * 4]); a.push(b); } return a; })();
  const proj = v => { const l0 = v.lon * R, p0 = v.lat * R, c0 = Math.cos(p0), s0 = Math.sin(p0);
    return (lon, lat) => { const l = lon * R, p = lat * R, cp = Math.cos(p), dl = l - l0, vis = s0 * Math.sin(p) + c0 * cp * Math.cos(dl);
      let x = v.s * cp * Math.sin(dl), y = -v.s * (c0 * Math.sin(p) - s0 * cp * Math.cos(dl)); if (vis < 0) { const L = Math.hypot(x, y) || 1; x = x / L * v.s; y = y / L * v.s; } return [v.x + x, v.y + y, vis]; }; };
  const ring = (ctx, pr, r) => { const P = r.map(([lo, la]) => pr(lo, la)); if (!P.some(p => p[2] > 0)) return false; P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); return true; };
  // the space behind: deep blue-black, a faint band of the Milky Way, twinkling stars
  K.space = (ctx, t) => { const g = ctx.createRadialGradient(640, 360, 60, 640, 360, 1100); g.addColorStop(0, '#0d1838'); g.addColorStop(.6, '#060b1e'); g.addColorStop(1, '#02040c'); ctx.fillStyle = g; ctx.fillRect(-400, -300, 2100, 1400);
    ctx.save(); ctx.translate(640, 360); ctx.rotate(-.5); const b = ctx.createLinearGradient(0, -260, 0, 260); b.addColorStop(0, 'rgba(120,140,220,0)'); b.addColorStop(.5, 'rgba(140,150,230,.10)'); b.addColorStop(1, 'rgba(120,140,220,0)'); ctx.fillStyle = b; ctx.fillRect(-1300, -260, 2600, 520); ctx.restore();
    for (const [x, y, r, ph, c] of STARS) { ctx.globalAlpha = .45 + .55 * Math.abs(Math.sin(t * (.6 + c) + ph)); ctx.fillStyle = c < .15 ? '#ffe6c0' : c < .3 ? '#c8dcff' : '#ffffff'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } ctx.globalAlpha = 1; };
  // the Earth. v = {lon, lat, s (radius px), x, y}; o.fill(name) → story colour washed over a country; returns the projector
  K.globe = (ctx, v, t, o = {}) => { const pr = proj(v), r = v.s, cx = v.x, cy = v.y;
    // atmosphere glow behind the disc
    let g = ctx.createRadialGradient(cx, cy, r * .96, cx, cy, r * 1.22); g.addColorStop(0, 'rgba(110,180,255,.75)'); g.addColorStop(.3, 'rgba(70,130,240,.28)'); g.addColorStop(1, 'rgba(40,80,200,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.22, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
    // ocean: sunlit from the upper left
    g = ctx.createRadialGradient(cx - r * .35, cy - r * .4, r * .05, cx, cy, r * 1.05); g.addColorStop(0, '#4aa2e0'); g.addColorStop(.5, '#2a6eb8'); g.addColorStop(1, '#123a78'); ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    // graticule
    ctx.strokeStyle = 'rgba(255,255,255,.09)'; ctx.lineWidth = 1; for (let lo = -180; lo < 180; lo += 15) { ctx.beginPath(); let f = true; for (let la = -90; la <= 90; la += 3) { const [x, y, vi] = pr(lo, la); if (vi < 0) { f = true; continue; } f ? ctx.moveTo(x, y) : ctx.lineTo(x, y); f = false; } ctx.stroke(); }
    for (let la = -75; la <= 75; la += 15) { ctx.beginPath(); let f = true; for (let lo = -180; lo <= 180; lo += 3) { const [x, y, vi] = pr(lo, la); if (vi < 0) { f = true; continue; } f ? ctx.moveTo(x, y) : ctx.lineTo(x, y); f = false; } ctx.stroke(); }
    // shallow-water halo around the coasts, then land by climate, then the story colours
    ctx.beginPath(); for (const nm in WORLD) for (const rr of WORLD[nm].r) ring(ctx, pr, rr); ctx.strokeStyle = 'rgba(120,200,230,.35)'; ctx.lineWidth = Math.max(3, r / 60); ctx.lineJoin = 'round'; ctx.stroke();
    const fillOf = o.fill || (() => null);
    for (const nm in WORLD) { ctx.beginPath(); let any = false; for (const rr of WORLD[nm].r) any = ring(ctx, pr, rr) || any; if (!any) continue; ctx.fillStyle = COL[nm]; ctx.fill(); const c = fillOf(nm); if (c) { ctx.globalAlpha = o.alpha ?? .8; ctx.fillStyle = c; ctx.fill(); ctx.globalAlpha = 1; } }
    if (o.provFill && GEO && GEO.provinces) for (const nm in GEO.provinces) { const c = o.provFill(nm); if (!c) continue; ctx.beginPath(); let any = false; for (const rr of GEO.provinces[nm]) any = ring(ctx, pr, rr) || any; if (!any) continue; ctx.globalAlpha = o.alpha ?? .8; ctx.fillStyle = c; ctx.fill(); ctx.globalAlpha = 1; }
    if (GEO && GEO.lakes) { ctx.fillStyle = '#3a82c4'; for (const nm in GEO.lakes) { ctx.beginPath(); for (const rr of GEO.lakes[nm]) ring(ctx, pr, rr); ctx.fill(); } }
    ctx.beginPath(); for (const nm in WORLD) for (const rr of WORLD[nm].r) ring(ctx, pr, rr); ctx.strokeStyle = 'rgba(36,28,26,.75)'; ctx.lineWidth = Math.max(1, r / 300); ctx.stroke();
    if (o.extra) o.extra(ctx, pr);
    // clouds drifting eastward
    if (o.clouds !== false) for (const cl of CLOUDS) for (const [lo, la, s] of cl) { const [x, y, vi] = pr(lo + t * 1.2, la); if (vi < .05) continue; const rad = s * R * r * Math.sqrt(vi) * 1.05; ctx.globalAlpha = .4 * clamp(vi * 4); const cg = ctx.createRadialGradient(x, y, 0, x, y, rad); cg.addColorStop(0, 'rgba(255,255,255,.95)'); cg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = cg; ctx.beginPath(); ctx.ellipse(x, y, rad, rad * (.55 + .45 * vi), Math.atan2(y - cy, x - cx), 0, 7); ctx.fill(); } ctx.globalAlpha = 1;
    // light and shade: a bright sunlit side, the night side falling away to the lower right, the rim
    g = ctx.createRadialGradient(cx - r * .45, cy - r * .5, r * .1, cx - r * .1, cy - r * .1, r * 1.45); g.addColorStop(0, 'rgba(255,250,230,.18)'); g.addColorStop(.42, 'rgba(0,0,0,0)'); g.addColorStop(.78, 'rgba(4,10,40,.38)'); g.addColorStop(1, 'rgba(2,4,20,.82)'); ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    g = ctx.createRadialGradient(cx, cy, r * .82, cx, cy, r); g.addColorStop(0, 'rgba(140,200,255,0)'); g.addColorStop(1, 'rgba(150,210,255,.45)'); ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.restore(); ctx.strokeStyle = 'rgba(190,225,255,.85)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    return pr; };
  const lerpV = (a, b, k) => ({ lon: lerp(a.lon, b.lon, k), lat: lerp(a.lat, b.lat, k), s: Math.exp(lerp(Math.log(a.s), Math.log(b.s), k)), x: lerp(a.x ?? 640, b.x ?? 640, k), y: lerp(a.y ?? 360, b.y ?? 360, k) });
  K.globeShot = (v0, v1, o, draw, ui) => F2.shot({ noCov: true, cam: [[1, 640, 360], [1, 640, 360]], drift: .25, vig: .25, world: (ctx, t, lt, d) => { const v = lerpV(v0, v1 || v0, ease.inOut(clamp(lt / d))); v.lon -= lt * .5; K.space(ctx, t); const pr = K.globe(ctx, v, t, { fill: n => (o.fill || K.empireFill)(n), provFill: o.prov !== false ? K.provFill : null, alpha: .72 }); if (draw) draw(ctx, pr, t, lt, d); }, ui });
  const flat = K.mapShot; K.mapShot = (v0, v1, o, draw, ui) => Math.max(v0.s, (v1 || v0).s) <= 700 ? K.globeShot(v0, v1, o, draw, ui) : flat(v0, v1, o, draw, ui);
})(window);
