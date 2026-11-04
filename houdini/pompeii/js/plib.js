/* Shared shot helpers for the Pompeii shows. */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, T = G.Toon;
  const { W, H, P, L, text } = PK, { clamp, lerp, ease } = T;
  const PL = G.PL = {};
  PL.who = (ctx, name, x, y, s, ex = {}) => F.person(ctx, x, y, s, F.cast(name, ex));
  PL.dim = (ctx, a, col = '#000') => { if (a <= 0) return; ctx.save(); PK.reset(ctx); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); };
  PL.day = (ctx, t, o = {}) => {             // sky, sun, clouds, hills, grass
    St.sky(ctx, o.top || '#a8d6ea', o.bot || '#f7ecd0'); if (o.sun !== false) St.sun(ctx, o.sunX || 1060, 110, 42);
    St.clouds(ctx, t, [[150, 110, .8], [620, 80, .6], [1000, 150, .7]], 5);
    if (o.vesuvius) St.vesuvius(ctx, o.vx || 960, o.gy || 520, o.vs || .7, { t, smoke: o.smoke || 0, face: o.face, col: o.col });
    St.hills(ctx, (o.gy || 520) - 10, '#a7bd78', 7, 40); St.hills(ctx, (o.gy || 520) + 10, '#9bb46a', 3, 24);
    St.ground(ctx, (o.gy || 520) + 20, o.grass || '#b5c47c'); St.tufts(ctx, 11, -100, 1380, (o.gy || 520) + 40, 700, 30);
  };
  PL.paperBg = (ctx, col = '#efe3c4') => { const c = PK.layer('paperbg' + col, W, H, g => { g.fillStyle = col; g.fillRect(0, 0, W, H); const r = T.rng(7); g.fillStyle = 'rgba(120,90,50,.06)'; for (let i = 0; i < 400; i++) g.fillRect(r() * W, r() * H, 2 + r() * 40, 2 + r() * 3); }); ctx.save(); PK.reset(ctx); PK.drawLayer(ctx, c); ctx.restore(); };
  PL.darkBg = (ctx, a = '#3a3040', b = '#1e1a24') => { ctx.save(); PK.reset(ctx); const g = ctx.createRadialGradient(W / 2, H * .45, 40, W / 2, H / 2, H); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); };
  // Pompeii street set: houses on the far side of a paved road, Vesuvius beyond
  PL.street = (ctx, t, o = {}) => {
    St.sky(ctx, o.top || '#a8d6ea', o.bot || '#f7ecd0'); if (o.sun !== false) St.sun(ctx, 1080, 100, 40);
    if (o.clouds !== false) St.clouds(ctx, t, [[150, 110, .8], [620, 80, .6]], 5);
    St.vesuvius(ctx, o.vx ?? 900, 330, .75, { t, smoke: o.smoke || 0, green: o.green, face: o.face, ash: o.ash });
    const hs = o.houses || [[-60, 170, 210], [120, 150, 250, { shop: true, awning: '#c0563c' }], [280, 200, 220, { door: true, win: [40, 160] }], [490, 160, 260, { shop: true, awning: '#5f8fb8' }], [660, 210, 230, { door: true, win: [50, 160] }], [880, 160, 250, { shop: true, awning: '#d9a441' }], [1050, 220, 220, { door: true, win: [60] }], [1280, 160, 240]];
    for (const [x, w, h, ex] of hs) St.house(ctx, x, 470, w, h, Object.assign({ graffiti: o.graffiti && o.graffiti[x] }, ex || {}));
    St.street(ctx, 470, { steps: [560] });
  };
  // a speaking line: bubble + mouth flapping on the narration envelope between anchors a..b
  PL.say = (ctx, t, a, b, s, x, y, tail, o = {}) => { const ta = PK.A(a), tb = PK.A(b); if (t < ta - .05 || t >= tb + (o.hold || 0)) return; PK.bubble(ctx, s, x, y, tail, clamp((t - ta) / .25), o); };
  PL.talk = (t, a, b) => PK.talk(t, PK.A(a), PK.A(b) - .1);
  PL.lbl = (ctx, s, x, y, k, o = {}) => { const kk = PK.pop(k); if (kk <= 0) return; PK.scaled(ctx, x, y, kk, c => { c.font = PK.FONT(700, o.px || 22); const w = c.measureText(s).width + 28; PK.paper(c, -w / 2, -20, w, 40, { fill: o.fill || '#fff8e6' }); text(c, s, 0, 1, { px: o.px || 22, w: 700, col: o.col }); }, o.rot ?? -.02); };
  PL.hut = (ctx, x, y, s = 1, col = '#c9a27a') => { PK.scaled(ctx, x, y, s, c => { P(c, col, 3, q => q.rect(-28, -36, 56, 36)); P(c, '#b08a4a', 3, q => { q.moveTo(-38, -34); q.lineTo(0, -70); q.lineTo(38, -34); q.closePath(); }); P(c, '#6b4630', 2.4, q => q.rect(-8, -22, 16, 22)); }); };
  PL.gate = (ctx, x, y, h = 260) => { St.cityWall(ctx, -400, W + 400, y, h, { gate: x, towers: [x - 260, x + 260] }); };
  PL.sign = (ctx, s, x, y, k = 1, o = {}) => { if (k <= 0) return; L(ctx, [[x, y], [x, y - (o.h || 120)]], 9); L(ctx, [[x, y], [x, y - (o.h || 120)]], 5, '#8a6240'); ctx.save(); ctx.font = PK.FONT(700, o.px || 22); const w = Math.max(80, ctx.measureText(s).width + 30); ctx.restore(); P(ctx, o.col || '#c9a27a', 3, c => c.roundRect(x - w / 2, y - (o.h || 120) - 40, w, 44, 4)); text(ctx, s, x, y - (o.h || 120) - 17, { px: o.px || 22, w: 700 }); };
  PL.ticket = (ctx, x, y, rot, k) => { PK.scaled(ctx, x, y, PK.pop(k), c => { P(c, '#f6e27a', 2.6, q => q.rect(-40, -26, 80, 52)); text(c, 'FINE', 0, -8, { font: PK.DISPLAY(20) }); L(c, [[-28, 10], [28, 10]], 2, '#9a8a70'); }, rot); };
  PL.fade = (ctx, lt, d, a = .3) => { PL.dim(ctx, 1 - clamp(lt / a)); PL.dim(ctx, clamp((lt - d + a) / a)); };
  PL.crowdRow = (n, x0, x1, y, s, seed, ex = {}) => { const out = []; for (let i = 0; i < n; i++) out.push([lerp(x0, x1, n > 1 ? i / (n - 1) : .5) + ((i * 37) % 11) - 5, y + ((i * 53) % 7), s, F.roman(seed + i, ex), i % 2 === 0, i * .7]); return out; };
})(window);
