/* "The Life of the Mona Lisa" — episode helpers.
 *   K2.phones(x0, y0, x1, y1, n, seed, o)  a modern crowd (tourists) with phones held up (crowd list for DR.shot)
 *   K2.pov(g, t, lt, o)                     first-person: your two hands holding a phone up, screen showing the scene
 *   K2.paper(g, x, y, s, o)                 a newspaper front page {mast, head, lang, k(page-turn), date} with her portrait
 *   K2.ERAS / K2.HANDS                      the era badge and the HANDS counter (drawn in final.js)
 *   K2.tl(g, items, k, o)                   a horizontal timeline with dots + labels that draws on with k */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, ML = G.ML, { W, H, clamp, lerp, rng } = T, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK;
  const K2 = G.K2 = {};
  const TOUR = ['tourist1', 'tourist2', 'tourist3', 'tourist4'];
  K2.phones = (x0, y0, x1, y1, n, seed = 1, o = {}) => DR.army(x0, y0, x1, y1, n, o.who || TOUR, o.s0 || .3, o.s1 || .42, seed, { back: o.back, spr: Object.assign({ back: o.back !== false, pose: 'pointUp', prop: 'phone' }, o.spr || {}) });
  K2.pov = (g, t, lt, o = {}) => { const up = o.up ?? 1, y = lerp(900, 560, DR.ease.out(clamp(up))), x = 640 + Math.sin(t * .7) * 8;
    g.save(); g.translate(x, y); g.rotate(Math.sin(t * .9) * .015);
    for (const sd of [-1, 1]) { g.save(); g.translate(sd * 170, 110); g.rotate(sd * -.5); G.GX.hand(g, 0, 0, .9, sd > 0 ? -PI / 2 - .25 : -PI / 2 + .25, { kind: 'open', sleeve: o.sleeve || '#3a4a6a' }); g.restore(); }
    g.fillStyle = '#15161c'; g.strokeStyle = '#000'; g.lineWidth = 6; g.beginPath(); g.roundRect(-150, -260, 300, 330, 30); g.fill(); g.stroke();
    g.save(); g.beginPath(); g.roundRect(-136, -246, 272, 302, 20); g.clip(); g.fillStyle = '#2a3440'; g.fillRect(-140, -250, 280, 310); if (o.screen) o.screen(g); else ML.mona(g, 0, -100, 150, { frame: 'gold', glass: true });
    g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 2; for (const [ax, ay] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { g.beginPath(); g.moveTo(ax * 120, ay * 100 - 100 + (ay < 0 ? 0 : 0)); g.lineTo(ax * 120, ay * 100 - 100 - ay * 26); g.moveTo(ax * 120, ay * 100 - 100); g.lineTo(ax * 120 - ax * 26, ay * 100 - 100); g.stroke(); }
    if (o.flash && o.flash > 0 && o.flash < 1) { g.fillStyle = `rgba(255,255,255,${1 - o.flash})`; g.fillRect(-140, -250, 280, 310); } g.restore();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(0, 40, 14, 0, TAU); g.fill(); g.restore(); };
  K2.paper = (g, x, y, s, o = {}) => { g.save(); g.translate(x, y); g.rotate(o.rot || 0); g.scale(s, s); const w = 420, h = 560;
    g.fillStyle = 'rgba(10,6,4,.35)'; g.fillRect(-w / 2 + 10, -h / 2 + 12, w, h); g.fillStyle = '#f2ead6'; g.fillRect(-w / 2, -h / 2, w, h); g.strokeStyle = '#3a3026'; g.lineWidth = 3; g.strokeRect(-w / 2, -h / 2, w, h);
    g.fillStyle = '#15100c'; g.font = '700 46px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillText(o.mast || 'LE PETIT PARISIEN', 0, -h / 2 + 62); g.fillRect(-w / 2 + 16, -h / 2 + 76, w - 32, 4); g.font = '400 16px Georgia, serif'; g.fillText(o.date || '23 AOÛT 1911', 0, -h / 2 + 98);
    g.font = MK(o.headSize || 40); g.fillText(o.head || 'LA JOCONDE A DISPARU!', 0, -h / 2 + 150);
    ML.mona(g, -60, 50, 260, { frame: 'plain', sepia: 1 }); g.fillStyle = 'rgba(60,50,40,.55)'; for (let i = 0; i < 12; i++) g.fillRect(50, -60 + i * 22, 140 - (i % 3) * 20, 8);
    for (let i = 0; i < 4; i++) g.fillRect(-w / 2 + 20, 210 + i * 18, w - 40 - (i % 2) * 60, 7); g.restore(); };
  K2.tl = (g, items, k, o = {}) => { const x0 = o.x0 ?? 140, x1 = o.x1 ?? 1140, y = o.y ?? 400; g.save(); g.lineCap = 'round'; g.strokeStyle = '#15100c'; g.lineWidth = 14; g.beginPath(); g.moveTo(x0, y); g.lineTo(lerp(x0, x1, k), y); g.stroke(); g.strokeStyle = o.col || '#c8a24a'; g.lineWidth = 8; g.stroke();
    items.forEach(([u, lab, sub], i) => { if (k < u) return; const x = lerp(x0, x1, u), p = G.GX.pop(k * 10, u * 10, 1.2); g.save(); g.translate(x, y); g.scale(p, p); g.fillStyle = '#c8281e'; g.strokeStyle = '#15100c'; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, 18, 0, TAU); g.fill(); g.stroke();
      g.font = MK(34); g.textAlign = 'center'; g.lineWidth = 7; g.strokeStyle = '#15100c'; g.fillStyle = '#fff'; const yy = i % 2 ? 70 : -44; g.strokeText(lab, 0, yy); g.fillText(lab, 0, yy); if (sub) { g.font = MK(24); g.lineWidth = 5; g.fillStyle = '#f2d23a'; g.strokeText(sub, 0, yy + (i % 2 ? 32 : -34)); g.fillText(sub, 0, yy + (i % 2 ? 32 : -34)); } g.restore(); }); g.restore(); };
  // the era badge (top-left): [label · year]; and the HANDS counter under it — both drawn in final.js
  K2.ERAS = [];
  K2.era = (t, label, year) => K2.ERAS.push({ t, label, year });
  K2.HANDS = [];
  K2.hands = (t, n, who) => K2.HANDS.push({ t, n, who });
})(window);
/* seated cast: P(g, 'name@sit', …) = that character with the seated twin of their outfit (feet at seat line + 50·s) */
(function (G) { const P0 = G.P; G.P = (g, who, x, y, s, t, o = {}) => { if (!who.endsWith('@sit')) return P0(g, who, x, y, s, t, o); const base = who.slice(0, -4), cw = G.CW[base] || {};
  return P0(g, base, x, y + 50 * s, s, t, Object.assign({}, o, { outfit: (o.outfit || cw.outfit || 'suit') + '@sit' })); }; })(window);
