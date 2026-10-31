/* The Pig War — sets. The anchor set is Cutlar's claim on the south end of San Juan Island, June 1859: a dawn fog bank over Haro Strait,
 * Vancouver Island and the snowy Olympics on the horizon, Douglas firs and western red cedars at the edges, a Garry oak and a madrone,
 * the log cabin with a shake roof and a stick chimney, a zigzag split-rail ("worm") fence round the potato rows, a dead snag with a bald
 * eagle, sheep of the Belle Vue farm grazing beyond. Option layers grow the same hillside into American Camp (tents, earthworks, guns,
 * a flagstaff) and fill Griffin Bay with warships, so the story keeps returning to one place. */
(function (G) {
  'use strict';
  const S = G.Sets2, W = G.World, L = G.Life, PW = G.PW, { shape, mix, clamp, lerp, rng, INK } = G.Rig, sh = shape, PS = {};
  // a western red cedar: drooping, layered sprays, reddish trunk
  PS.cedar = (ctx, x, y, s, t, seed = 1, o = {}) => { const col = o.col || '#2e6a42', R = rng(seed); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, k => { k.moveTo(-16, 0); k.quadraticCurveTo(-8, -40, -6, -80); k.lineTo(6, -80); k.quadraticCurveTo(8, -40, 18, 0); k.closePath(); }, '#9a4a2a', { lw: 3, shade: '#6a3418', dx: 5 });
    // a narrow cone of drooping, layered sprays (bottom tiers widest), a leader nodding at the top
    for (let i = 0; i < 8; i++) { const y0 = -60 - i * 36, w = 110 - i * 12, sw = Math.sin(t * 1.1 + i + seed) * 2; sh(ctx, k => { k.moveTo(-w, y0 + 26 + sw); k.quadraticCurveTo(-w * .7, y0 - 18, 0, y0 - 30); k.quadraticCurveTo(w * .7, y0 - 18, w, y0 + 26 - sw); for (let j = 6; j >= 0; j--) { const xx = lerp(-w, w, j / 6); k.quadraticCurveTo(xx + w / 6, y0 + 40, xx, y0 + 22 + (j % 2) * 6); } k.closePath(); }, i % 2 ? col : mix(col, '#ffffff', .08), { lw: 2.5, shade: mix(col, '#000000', .2), dx: 10 }); ctx.strokeStyle = mix(col, '#000000', .3); ctx.lineWidth = 1.5; for (let j = 0; j < 5; j++) { const xx = -w * .7 + j * w * .35; ctx.beginPath(); ctx.moveTo(xx, y0); ctx.quadraticCurveTo(xx + 6, y0 + 10, xx + 2, y0 + 22); ctx.stroke(); } }
    ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -330); ctx.quadraticCurveTo(4, -360, 18 + Math.sin(t) * 3, -368); ctx.stroke(); ctx.restore(); };
  // a Pacific madrone: twisting red-orange trunk, glossy leaf clumps
  PS.madrone = (ctx, x, y, s, t, seed = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = 22; const tr = c => { c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-20, -60, 30, -110, 10, -170); c.moveTo(14, -110); c.quadraticCurveTo(60, -140, 80, -190); c.stroke(); }; tr(ctx); ctx.strokeStyle = '#c8602a'; ctx.lineWidth = 15; tr(ctx);
    for (const [bx, by, r] of [[10, -200, 50], [70, -210, 44], [-30, -180, 40], [40, -240, 40]]) sh(ctx, k => k.arc(bx, by, r, 0, 7), '#3a7a3a', { lw: 3, shade: '#2a5a2a', dx: 8 }); ctx.restore(); };
  // a dead snag (with an eagle on it)
  PS.snag = (ctx, x, y, s, t, eagle = true) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = 20; const tr = c => { c.beginPath(); c.moveTo(0, 0); c.lineTo(4, -280); c.moveTo(2, -180); c.lineTo(-40, -220); c.moveTo(4, -240); c.lineTo(36, -268); c.stroke(); }; tr(ctx); ctx.strokeStyle = '#9a8a78'; ctx.lineWidth = 13; tr(ctx); if (eagle) PW.eagle(ctx, 36, -270, 1.1, t, { perch: true }); ctx.restore(); };
  // a log cabin: notched logs, shake roof, stick-and-clay chimney, one window, a door ajar
  PS.cabin = (ctx, x, y, s, t, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let r = 0; r < 7; r++) sh(ctx, k => k.roundRect(-150 - (r % 2) * 8, -22 - r * 20, 300 + (r % 2) * 16, 20, 9), r % 2 ? '#7a5434' : '#8a6040', { lw: 2.5, shade: '#5a3a20', dx: 0, dy: 4 });
    sh(ctx, k => { k.moveTo(-170, -150); k.lineTo(0, -230); k.lineTo(170, -150); k.closePath(); }, '#7a6a5a', { lw: 4, shade: '#5a4a3a', dx: 0, dy: -8 }); ctx.strokeStyle = '#5a4a3a'; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-150 + i * 12, -160 - i * 12); ctx.lineTo(150 - i * 12, -160 - i * 12); ctx.stroke(); }
    sh(ctx, k => k.rect(110, -250, 34, 110), '#9a7a5a', { lw: 3 }); S.smoke(ctx, 127, -256, t, .9, 'rgba(220,224,230,.55)', 5); sh(ctx, k => k.rect(-30, -110, 56, 110), '#4a3018', { lw: 3 }); sh(ctx, k => k.rect(-30, -110, 22, 110), '#6a4a2a', { lw: 2 });
    sh(ctx, k => k.rect(60, -104, 50, 40), o.lit ? '#ffd880' : '#8ab0c8', { lw: 3 }); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(85, -104); ctx.lineTo(85, -64); ctx.stroke(); L.woodpile(ctx, -120, 0, .8); sh(ctx, k => k.roundRect(-96, -24, 30, 24, 4), '#8a8e96', { lw: 2.5 }); ctx.restore(); };
  // the worm fence: zigzag split rails
  PS.wormFence = (ctx, x0, x1, y, s = 1) => { const step = 70 * s; for (let x = x0, i = 0; x < x1; x += step, i++) { const z = (i % 2 ? -8 : 8) * s; for (let r = 0; r < 3; r++) { ctx.save(); ctx.translate(x, y - 18 * s - r * 16 * s); ctx.rotate(z * .012); sh(ctx, k => k.roundRect(-4, -5 * s, step + 8, 9 * s, 4), r % 2 ? '#9a7a54' : '#8a6a44', { lw: 2.5 }); ctx.restore(); } } };
  // the whole place; o: { fog, camp (0..1 American Camp grows), ships (0..5), pig: {x, y, root, dead}, rows, eagle, sheep }
  PS.island = (ctx, t, o = {}) => { const fog = o.fog ?? .3; S.sky(ctx, t, o.sky || 'dawn', { horizon: 360, sun: o.sun === false ? undefined : [1020, 300, 46], seed: 11 });
    // far shore: the Olympic Mountains (snow-capped) to the south-west, Vancouver Island's low wooded hills to the west
    const peaks = [[-300, 230, 150], [-150, 210, 170], [0, 240, 140], [120, 260, 110], [-60, 250, 120]]; for (const [px, py, w] of peaks) { sh(ctx, k => { k.moveTo(px - w, 352); k.lineTo(px - w * .2, py + 8); k.lineTo(px, py); k.lineTo(px + w * .25, py + 12); k.lineTo(px + w, 352); k.closePath(); }, '#8a98b8', { lw: 2, shade: '#7a88a8', dx: 14 }); ctx.fillStyle = '#f4f6fa'; ctx.beginPath(); ctx.moveTo(px - w * .32, py + 34); ctx.lineTo(px - w * .2, py + 8); ctx.lineTo(px, py); ctx.lineTo(px + w * .25, py + 12); ctx.lineTo(px + w * .36, py + 36); ctx.lineTo(px + w * .12, py + 26); ctx.lineTo(px - w * .05, py + 40); ctx.lineTo(px - w * .18, py + 28); ctx.closePath(); ctx.fill(); }
    sh(ctx, k => { k.moveTo(260, 352); k.bezierCurveTo(500, 318, 700, 324, 900, 330); k.bezierCurveTo(1100, 320, 1400, 326, 1700, 334); k.lineTo(1700, 352); k.closePath(); }, '#6a7a98', { lw: 2 }); for (let i = 0; i < 34; i++) { ctx.fillStyle = '#5a6a88'; const tx = 300 + i * 40, ty = 334 - Math.sin(i * .7) * 4; ctx.beginPath(); ctx.moveTo(tx - 6, ty + 8); ctx.lineTo(tx, ty - 9); ctx.lineTo(tx + 6, ty + 8); ctx.fill(); }
    S.sea(ctx, 350, t, { col: o.water || '#6a8aa8', n: 40, life: o.waterLife !== false });
    // Griffin Bay ships (the bay is below the hill, so they sit on the water band)
    for (let i = 0; i < (o.ships || 0); i++) { const k = clamp((o.shipK ?? 1) * 5 - i); if (k <= 0) continue; S.ship(ctx, lerp(1700, 360 + i * 210, k), 410 + (i % 2) * 22, .22 + (i % 2) * .03, t, 'uk', { flip: true }); }
    // the hillside
    sh(ctx, k => { k.moveTo(-400, 470); k.quadraticCurveTo(200, 430, 640, 446); k.quadraticCurveTo(1100, 460, 1700, 440); k.lineTo(1700, 1100); k.lineTo(-400, 1100); k.closePath(); }, '#8aa85a', { lw: 4, shade: '#7a984a', dx: 0, dy: -10 }); S.meadow(ctx, 470, 560, t, 13, { n: 30 });
    if (o.sheep !== false) for (let i = 0; i < 4; i++) S.sheep(ctx, 1080 + i * 70 + Math.sin(t * .2 + i) * 10, 488 + (i % 2) * 10, .5, t, i);
    if (o.camp) { const c = o.camp; for (let i = 0; i < 9; i++) { const k = clamp(c * 9 - i); if (k <= 0) continue; ctx.save(); ctx.globalAlpha = k; S.tent(ctx, 120 + i * 120, 470 + (i % 2) * 14, .42, { col: '#f0e8d4' }); ctx.restore(); } if (c > .4) { S.earthwork(ctx, 520, 200, 1100, '#8a7a50', { gabions: false }); for (let i = 0; i < 3; i++) S.cannon(ctx, 320 + i * 300, 500, .5, t, { flip: true }); } if (c > .2) S.flagPole(ctx, 640, 480, 180, 'us1859', t, .7); }
    // edges: firs and cedars, a madrone, a Garry oak, the snag
    W.pine(ctx, -150, 700, 2.1, '#1e3a2a'); PS.cedar(ctx, 20, 760, 1.4, t, 3); PS.madrone(ctx, 230, 600, .8, t, 4); S.tree(ctx, 1240, 620, 1.1, t, 5, { kind: 'oak', season: 'summer' }); PS.snag(ctx, 1400, 640, 1.1, t, o.eagle !== false); PS.cedar(ctx, 1520, 780, 1.5, t, 6);
    PS.cabin(ctx, 930, 600, .8, t, o); PS.wormFence(ctx, 160, 860, 620, 1);
    const rows = o.rows ?? 1; for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const x = 230 + i * 90 + (r % 2) * 40, y = 650 + r * 34; const dug = o.dug && Math.abs(x - (o.pig ? o.pig.x : -999)) < 120 && r < 2 ? 1 : 0; PW.potato(ctx, x, y, .8 * rows, t, i + r * 7, dug); }
    if (o.pig) PW.pig(ctx, o.pig.x, o.pig.y, o.pig.s || .7, t, o.pig);
    if (fog > 0) S.fog(ctx, t, fog, 420);
  };
  // a hand-drawn map of the Salish Sea: Vancouver Island (west), the mainland (east), the San Juans between Haro and Rosario straits
  PS.salish = (ctx, t, o = {}) => { W.parchment(ctx); ctx.fillStyle = '#b8d0d0'; ctx.fillRect(-400, -400, 2100, 1600); const land = fn => sh(ctx, fn, '#e2cf98', { lw: 4, shade: '#c8b47e', dx: 0, dy: -8 });
    land(k => { k.moveTo(-400, -400); k.lineTo(330, -400); k.quadraticCurveTo(300, -100, 360, 120); k.quadraticCurveTo(400, 300, 300, 470); k.quadraticCurveTo(200, 600, -50, 640); k.lineTo(-400, 680); k.closePath(); });
    land(k => { k.moveTo(1700, -400); k.lineTo(980, -400); k.quadraticCurveTo(1000, -60, 960, 120); k.quadraticCurveTo(900, 260, 1000, 400); k.quadraticCurveTo(1060, 560, 980, 760); k.lineTo(1100, 1100); k.lineTo(1700, 1100); k.closePath(); });
    land(k => { k.moveTo(-400, 900); k.quadraticCurveTo(300, 780, 800, 820); k.quadraticCurveTo(900, 840, 960, 900); k.lineTo(960, 1100); k.lineTo(-400, 1100); k.closePath(); });
    const isl = [[560, 360, 90, 140, -.3, 'SAN JUAN'], [740, 230, 110, 80, .2, 'ORCAS'], [760, 470, 60, 120, .1, 'LOPEZ'], [640, 150, 40, 30, 0, ''], [860, 320, 34, 24, 0, ''], [690, 600, 30, 22, 0, ''], [480, 210, 26, 18, 0, '']];
    for (const [x, y, w, h, r, n] of isl) { sh(ctx, k => k.ellipse(x, y, w, h, r, 0, 7), o.islandCol || '#e2cf98', { lw: 3.5, shade: '#c8b47e', dx: 0, dy: -6 }); if (n) G.SUI.hand(ctx, n, x, y + 6, 18, 1, { col: '#ffffff' }); }
    G.SUI.hand(ctx, 'VANCOUVER ISLAND', 70, 160, 24, 1); G.SUI.hand(ctx, 'MAINLAND', 1200, 200, 26, 1); G.SUI.hand(ctx, 'VICTORIA', 250, 520, 20, 1, { col: '#ffd8cc' }); };
  G.PS = PS;
})(window);
