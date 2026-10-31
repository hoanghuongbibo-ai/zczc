/* Collage art layer (user, Oct '31: "don't leave the screen blank — add real details = collage art").
 *   CL.photo(g, key, x, y, w, rot, o)   a REAL photo (Toon.IMG[key]) as a taped print: o.style 'polaroid' | 'torn' | 'tape',
 *                                        o.crop [fx, fy, fw, fh] (fractions), o.sepia 0..1, o.caption, o.k (pop scale)
 *   CL.scraps(g, t, seed, o)             paper clutter around the frame edges: torn paper, ticket stubs, stamps, doodles,
 *                                        halftone dots, a map fragment — keeps the centre clear for the action
 *   CL.pool(keys)                        photos used to dress plain backgrounds (set per era by the episode)
 * DR.sunburst / DR.blueprint are wrapped: every plain graphic background now gets scraps + 2 taped photos from the pool. */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, clamp, rng } = T, TAU = Math.PI * 2, PI = Math.PI;
  const CL = G.CL = {}; let POOL = [];
  CL.pool = keys => { POOL = keys || []; };
  const torn = (g, w, h, seed) => { const r = rng(seed); g.beginPath(); const n = 26;
    for (let i = 0; i <= n; i++) { const u = i / n; g.lineTo(-w / 2 + w * u, -h / 2 + (r() - .5) * 8); }
    for (let i = 0; i <= n; i++) { const u = i / n; g.lineTo(w / 2 + (r() - .5) * 8, -h / 2 + h * u); }
    for (let i = 0; i <= n; i++) { const u = i / n; g.lineTo(w / 2 - w * u, h / 2 + (r() - .5) * 8); }
    for (let i = 0; i <= n; i++) { const u = i / n; g.lineTo(-w / 2 + (r() - .5) * 8, h / 2 - h * u); } g.closePath(); };
  const tape = (g, x, y, a) => { g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = 'rgba(240,228,180,.78)'; g.fillRect(-34, -11, 68, 22); g.strokeStyle = 'rgba(160,140,90,.35)'; g.lineWidth = 1; g.strokeRect(-34, -11, 68, 22); g.restore(); };
  CL.photo = (g, key, x, y, w, rot = 0, o = {}) => { const im = T.IMG[key]; if (!im) return; const k = o.k ?? 1; if (k <= 0) return;
    const [fx, fy, fw, fh] = o.crop || [0, 0, 1, 1], sw = im.width * fw, shh = im.height * fh, h = w * shh / sw, st = o.style || 'polaroid', seed = key.length * 7 + Math.round(x);
    g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k);
    const pb = st === 'polaroid' ? 14 : 8, bot = st === 'polaroid' ? (o.caption ? 46 : 30) : pb;
    g.fillStyle = 'rgba(20,12,6,.38)'; if (st === 'torn') { g.save(); g.translate(7, 9); torn(g, w + pb * 2, h + pb * 2, seed); g.fill(); g.restore(); } else g.fillRect(-w / 2 - pb + 7, -h / 2 - pb + 9, w + pb * 2, h + pb + bot);
    g.fillStyle = st === 'torn' ? '#efe6d2' : '#fbf8f0'; if (st === 'torn') { torn(g, w + pb * 2, h + pb * 2, seed); g.fill(); } else g.fillRect(-w / 2 - pb, -h / 2 - pb, w + pb * 2, h + pb + bot);
    g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip(); if (o.sepia) g.filter = `sepia(${o.sepia}) contrast(1.05)`; g.drawImage(im, im.width * fx, im.height * fy, sw, shh, -w / 2, -h / 2, w, h); g.restore();
    g.strokeStyle = 'rgba(40,30,20,.35)'; g.lineWidth = 1.5; g.strokeRect(-w / 2, -h / 2, w, h);
    if (o.caption && st === 'polaroid') { g.font = `${Math.max(14, Math.min(26, w * .09))}px "Permanent Marker", "Patrick Hand"`; g.fillStyle = '#2a1e18'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(o.caption, 0, h / 2 + bot / 2 - 2); }
    if (st !== 'torn') { tape(g, -w / 2 + 10, -h / 2 - pb + 2, -.5); tape(g, w / 2 - 10, -h / 2 - pb + 2, .5); } else { g.fillStyle = 'rgba(200,40,30,.9)'; g.beginPath(); g.arc(0, -h / 2 - 2, 7, 0, TAU); g.fill(); }
    g.restore(); };
  // ---------- paper clutter ----------
  const PAPERS = ['#f2e6c8', '#e8dcc0', '#f4ead4', '#d8e4ec', '#f0d8c8', '#e4e8d0'];
  CL.scraps = (g, t, seed = 1, o = {}) => { const r = rng(seed), n = o.n ?? 9; g.save();
    for (let i = 0; i < n; i++) { const side = i % 4, u = r(), x = side === 0 ? u * W : side === 1 ? W - 40 - r() * 120 : side === 2 ? u * W : 40 + r() * 120, y = side === 0 ? 30 + r() * 90 : side === 1 ? u * H : side === 2 ? H - 30 - r() * 90 : u * H;
      const w = 90 + r() * 160, h = 50 + r() * 90, a = (r() - .5) * .6, kind = Math.floor(r() * 6); g.save(); g.translate(x, y + Math.sin(t * .6 + i) * 2); g.rotate(a); g.globalAlpha = o.a ?? .9;
      if (kind === 0 || kind === 1) { g.fillStyle = 'rgba(20,12,6,.25)'; g.save(); g.translate(5, 6); torn(g, w, h, seed * 31 + i); g.fill(); g.restore(); g.fillStyle = PAPERS[i % PAPERS.length]; torn(g, w, h, seed * 31 + i); g.fill();
        g.fillStyle = 'rgba(60,50,40,.28)'; for (let l = 0; l < 4; l++) g.fillRect(-w / 2 + 12, -h / 2 + 12 + l * 11, w * (.5 + r() * .4), 4); }
      else if (kind === 2) { g.fillStyle = '#e8c86a'; g.fillRect(-60, -24, 120, 48); g.fillStyle = 'rgba(120,80,20,.5)'; for (let d = -54; d < 60; d += 10) { g.beginPath(); g.arc(d, -24, 3, 0, TAU); g.arc(d, 24, 3, 0, TAU); g.fill(); } g.font = '700 16px Georgia, serif'; g.fillStyle = '#5a3a10'; g.textAlign = 'center'; g.fillText(['ADMIT ONE', 'BILLET', 'TICKET', 'ENTRÉE'][i % 4], 0, 6); }
      else if (kind === 3) { g.fillStyle = '#f6efe0'; g.fillRect(-36, -44, 72, 88); g.strokeStyle = '#c8281e'; g.setLineDash([4, 4]); g.lineWidth = 3; g.strokeRect(-32, -40, 64, 80); g.setLineDash([]); g.fillStyle = ['#c8281e', '#2a5a9a', '#2a8a4a'][i % 3]; g.beginPath(); g.arc(0, -4, 20, 0, TAU); g.fill(); g.font = '700 14px Georgia, serif'; g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText(['50c', '1F', '25c'][i % 3], 0, 34); }
      else if (kind === 4) { g.fillStyle = 'rgba(40,30,20,.18)'; for (let yy = -h / 2; yy < h / 2; yy += 10) for (let xx = -w / 2; xx < w / 2; xx += 10) { g.beginPath(); g.arc(xx, yy, 2.5 * (1 - Math.abs(yy) / h), 0, TAU); g.fill(); } }
      else { g.fillStyle = '#e8d8a8'; torn(g, w, h, seed * 13 + i); g.fill(); g.strokeStyle = 'rgba(90,70,40,.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-w / 2 + 10, 0); g.bezierCurveTo(-w / 4, -h / 3, w / 4, h / 3, w / 2 - 10, -h / 4); g.stroke(); g.setLineDash([5, 5]); g.strokeStyle = 'rgba(200,40,30,.6)'; g.beginPath(); g.moveTo(-w / 3, h / 4); g.lineTo(w / 3, -h / 5); g.stroke(); g.setLineDash([]); }
      g.restore(); }
    // little doodle stars + sparkles
    for (let i = 0; i < 6; i++) { const x = r() * W, y = r() < .5 ? 20 + r() * 80 : H - 20 - r() * 80, s = 8 + r() * 10, tw = .6 + .4 * Math.sin(t * 3 + i); g.save(); g.translate(x, y); g.rotate(t * .3 + i); g.strokeStyle = `rgba(255,255,255,${.7 * tw})`; g.lineWidth = 3; g.beginPath(); for (let k = 0; k < 4; k++) { g.moveTo(0, 0); g.lineTo(Math.cos(k * PI / 2) * s, Math.sin(k * PI / 2) * s); } g.stroke(); g.restore(); }
    g.restore(); };
  // dress any plain graphic background: scraps + up to 2 era photos in the side margins (centre stays clear)
  CL.dress = (g, t, seed = 1) => { CL.scraps(g, t, seed, { n: 8, a: .85 }); if (!POOL.length) return; const r = rng(seed * 3 + 1);
    const a = POOL[Math.floor(r() * POOL.length)], b = POOL[Math.floor(r() * POOL.length)];
    CL.photo(g, a[0], 120, 520, 170, -.12, { crop: a[1], sepia: a[2], style: r() < .5 ? 'polaroid' : 'torn' });
    if (b !== a) CL.photo(g, b[0], 1160, 200, 160, .1, { crop: b[1], sepia: b[2], style: r() < .5 ? 'torn' : 'polaroid' }); };
  const DR = G.DR; if (DR) { let sb = 0;
    const s0 = DR.sunburst; DR.sunburst = function (g, t, ...a) { s0.call(this, g, t, ...a); CL.dress(g, t, 11 + (G.SHOTSEED || 0)); };
    const b0 = DR.blueprint; DR.blueprint = function (g, ...a) { b0.call(this, g, ...a); CL.scraps(g, (G.EP && G.EP.frame) || 0, 5 + (G.SHOTSEED || 0), { n: 6, a: .55 }); }; }
})(window);
