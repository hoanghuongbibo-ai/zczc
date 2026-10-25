/* Canada — YouTube thumbnails in the channel's cinematic close-up style: big expressive busts, one strong light source,
 * warm/teal grade, a short punchy title. ?v=1 "7 DEALS" (the deal table), ?v=2 "CANADA INVADES?!" (Buster, 1921), ?v=3 "NEVER ABSORBED" (the border). */
(function (G) {
  'use strict';
  const C = G.Cine, P = G.Paint, Col = G.Col, TK = G.ThumbKit, { INK, ink, cel, mix } = P, t = 2.3;
  const Q = [], title = (...a) => Q.push(() => TK.title(...a)), stamp = (...a) => Q.push(() => TK.stamp(...a));
  // ---- props for the busts (head: top y -214, ears at x ±156) ----
  function stetson(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const hc = '#8a6a3c', hs = '#5a4424', hl = '#b08a54';
    cel(ctx, c => c.ellipse(0, -150, 270, 48, 0, 0, 7), hc, { shade: hs, light: hl, dx: 0, dy: 10, lw: 6 });
    cel(ctx, c => { c.moveTo(-120, -156); c.lineTo(-100, -272); c.quadraticCurveTo(-50, -300, -24, -322); c.lineTo(0, -300); c.lineTo(24, -322); c.quadraticCurveTo(50, -300, 100, -272); c.lineTo(120, -156); c.quadraticCurveTo(0, -140, -120, -156); c.closePath(); }, hc, { shade: hs, light: hl, dx: 26, dy: 0, lw: 6 });
    ink(ctx, '#3a2414', c => { c.moveTo(-118, -170); c.quadraticCurveTo(0, -156, 118, -170); c.lineTo(116, -196); c.quadraticCurveTo(0, -182, -116, -196); c.closePath(); }, 5); ctx.restore(); }
  function peakedCap(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const hc = '#5a6040';
    cel(ctx, c => { c.moveTo(-178, -150); c.quadraticCurveTo(-210, -262, 0, -272); c.quadraticCurveTo(210, -262, 178, -150); c.closePath(); }, hc, { shade: mix(hc, '#000', .35), light: mix(hc, '#fff', .2), dx: 26, dy: 0, lw: 6 });
    ink(ctx, '#3a3c28', c => c.rect(-172, -158, 344, 44), 5); cel(ctx, c => { c.moveTo(-168, -114); c.quadraticCurveTo(0, -40, 168, -114); c.quadraticCurveTo(0, -84, -168, -114); c.closePath(); }, '#2a1c14', { shade: '#140c08', dx: 0, dy: 6, lw: 5 });
    cel(ctx, c => c.ellipse(0, -194, 34, 28, 0, 0, 7), '#e8c040', { shade: '#a88020', light: '#fff0a0', dx: 6, dy: 0, lw: 4 }); ctx.restore(); }
  function bowler(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => c.ellipse(0, -150, 210, 34, -.04, 0, 7), '#2a2420', { shade: '#141010', dx: 0, dy: 6, lw: 6 });
    cel(ctx, c => { c.moveTo(-140, -154); c.quadraticCurveTo(-150, -330, 0, -330); c.quadraticCurveTo(150, -330, 140, -154); c.closePath(); }, '#2a2420', { shade: '#141010', light: '#4a4038', dx: 26, dy: 0, lw: 6 }); ink(ctx, '#5a1a1a', c => c.rect(-140, -184, 280, 26), 4); ctx.restore(); }
  function mustache(ctx, x, y, s, col = '#3a2416') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => { c.moveTo(0, 30); c.quadraticCurveTo(-50, 14, -96, 50); c.quadraticCurveTo(-60, 46, 0, 44); c.quadraticCurveTo(60, 46, 96, 50); c.quadraticCurveTo(50, 14, 0, 30); c.closePath(); }, col, { shade: mix(col, '#000', .3), dx: 6, dy: 0, lw: 5 }); ctx.restore(); }
  // brass buttons and a belt over the red serge; stars on a general's shoulders
  function serge(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#e8c040'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(0, 180 + i * 50, 11, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); }
    ink(ctx, '#3a2414', c => { c.moveTo(-120, 130); c.lineTo(160, 330); c.lineTo(126, 340); c.lineTo(-150, 150); c.closePath(); }, 4); ctx.restore(); }
  function stars(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) for (let k = 0; k < 2; k++) { ctx.save(); ctx.translate(d * (150 + k * 34), 160 - k * 6); ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 7 : 17; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fillStyle = '#ffe060'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } ctx.restore(); }
  function binoculars(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) { cel(ctx, c => c.rect(d * 60 - 44, -50, 88, 110), '#2a2a2e', { shade: '#141416', light: '#4a4a52', dx: 10, dy: 0, lw: 6 }); cel(ctx, c => c.ellipse(d * 60, 66, 44, 18, 0, 0, 7), '#5a8ab8', { shade: '#2a4a6a', light: '#d0f0ff', dx: 4, dy: 0, lw: 5 }); } ink(ctx, '#1a1a1e', c => c.rect(-18, -20, 36, 50), 5); ctx.restore(); }
  const glow = (ctx, x, y, r, col, a) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); };
  function grade(ctx, warm = 1) { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const g = ctx.createLinearGradient(0, 0, 1280, 0); g.addColorStop(0, `rgba(255,150,60,${.35 * warm})`); g.addColorStop(1, 'rgba(40,110,150,.35)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720); ctx.restore();
    const v = ctx.createRadialGradient(640, 360, 300, 640, 360, 820); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = v; ctx.fillRect(0, 0, 1280, 720); }
  function smoke(ctx, seed, col = '40,30,30', a = .5) { const R = C.rng(seed); for (let i = 0; i < 14; i++) { const x = R() * 1280, y = 200 + R() * 400, r = 80 + R() * 160; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a * R()})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); } }

  // ---- v1: the deal table — a smug Mountie slides the stamped DEAL to a panicking American general ----
  function v1(ctx) { const bg = ctx.createLinearGradient(0, 0, 0, 720); bg.addColorStop(0, '#2a1a16'); bg.addColorStop(1, '#0e0808'); ctx.fillStyle = bg; ctx.fillRect(0, 0, 1280, 720);
    ctx.save(); ctx.globalAlpha = .9; Col.flagCA(ctx, 40, 40, 360, 180); Col.flagUS(ctx, 880, 30, 380, 200); ctx.restore(); ctx.fillStyle = 'rgba(14,8,8,.55)'; ctx.fillRect(0, 0, 1280, 720);
    // the lamp cone
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const lg = ctx.createLinearGradient(0, 0, 0, 640); lg.addColorStop(0, 'rgba(255,210,140,.55)'); lg.addColorStop(1, 'rgba(255,190,110,.08)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(590, -10); ctx.lineTo(690, -10); ctx.lineTo(1000, 640); ctx.lineTo(280, 640); ctx.closePath(); ctx.fill(); ctx.restore();
    smoke(ctx, 7, '200,170,140', .12);
    // the American general: panic, hands on the head, lit from the lamp
    TK.bust(ctx, 1020, 470, 1.0, { kind: 'tunic', cloth: '#5a6040', skin: '#f0c8a0', hair: '#8a7a6a', face: 'panic', hands: 'cheeks', shock: true, look: -18 }); peakedCap(ctx, 1020, 470, 1.0); stars(ctx, 1020, 470, 1.0);
    // the Mountie: smug, red serge, stetson
    TK.bust(ctx, 270, 490, 1.0, { kind: 'tunic', cloth: '#c8221a', skin: '#f2c9a2', hair: '#3a2416', face: 'smug', hands: 'thumb', look: 22 }); serge(ctx, 270, 490, 1.0); stetson(ctx, 270, 490, 1.0);
    // the table, the document, the stamp
    cel(ctx, c => { c.moveTo(-20, 640); c.lineTo(1300, 640); c.lineTo(1300, 740); c.lineTo(-20, 740); c.closePath(); }, '#5a3418', { shade: '#3a2010', light: '#8a5a30', dx: 0, dy: 14, lw: 6 });
    ctx.save(); ctx.translate(650, 650); ctx.rotate(-.06); cel(ctx, c => c.rect(-170, -70, 340, 150), '#f6ecd4', { shade: '#d8c8a4', dx: 8, dy: 8, lw: 5 }); ctx.globalAlpha = .45; ctx.fillStyle = INK; for (let i = 0; i < 4; i++) ctx.fillRect(-140, -40 + i * 22, 280 - (i % 2) * 60, 6); ctx.globalAlpha = 1; ctx.restore();
    stamp(ctx, 'DEAL', 660, 660, 70, -.12);
    grade(ctx); title(ctx, '7 DEALS', 640, 170, 160, ['#fff6c0', '#ffc020'], { rot: -.03 }); }

  // ---- v2: Buster, 1921 — Canada's secret plan to invade the US ----
  function v2(ctx) { const pr = Col.map(ctx, { lon: -92, lat: 45.5, s: 1250, x: 760, y: 360 }, { prov: true, fill: n => n === 'Canada' ? '#c8584a' : n === 'United States of America' ? '#7aa0c8' : null, alpha: .8 });
    [[[-123, 49.5], [-122.3, 47.6]], [[-111, 49.5], [-111.3, 47.5]], [[-97, 49.5], [-93.3, 45]], [[-82.5, 43], [-83, 42.3]], [[-74, 45.5], [-73.8, 42.7]]].forEach(([f, to]) => Col.mapArrow(ctx, pr, f, to, 1, '#d8241a', 22, .15));
    ctx.fillStyle = 'rgba(10,14,30,.45)'; ctx.fillRect(0, 0, 1280, 720); glow(ctx, 330, 420, 520, 'rgba(255,200,120,A)', .45);
    TK.bust(ctx, 330, 610, 1.08, { kind: 'tunic', suit: true, cloth: '#5a5a48', skin: '#f2c9a2', hair: '#3a2416', face: 'grin', look: 24 }); mustache(ctx, 330, 610 + 6 * 1.08, 1.08); bowler(ctx, 330, 610, 1.08);
    binoculars(ctx, 520, 470, .9); cel(ctx, c => { c.moveTo(500, 720); c.quadraticCurveTo(520, 600, 480, 520); c.lineTo(540, 510); c.quadraticCurveTo(600, 620, 600, 720); c.closePath(); }, '#5a5a48', { shade: '#3a3a2e', dx: 10, dy: 0, lw: 6 });
    grade(ctx, .8); title(ctx, 'CANADA', 860, 140, 120, ['#ffffff', '#f0f0f0'], { rot: -.03 }); title(ctx, 'INVADES?!', 900, 260, 132, ['#ff4a3a', '#d80a00'], { rot: -.03 }); stamp(ctx, 'TOP SECRET · 1921', 940, 640, 44, .05); }

  // ---- v3: the border at sunset — a tiny Mountie holds up the deal to a towering American ----
  function v3(ctx) { C.sky(ctx, 'sunset', t, { horizon: 520, sun: [300, 470], sunR: 70, seed: 81, clouds: 5 }); TK.rays(ctx, 300, 470, '#ffd090', .2);
    C.mounds(ctx, { y: 520, n: 5, seed: 82, col: '#5a6a48', far: .4, sunX: 300, t, w: 560, h: 70, copses: 2, haze: '#e89060' }); cel(ctx, c => c.rect(-20, 600, 1320, 140), '#4a5a38', { shade: '#34402a', dx: 0, dy: 0, lw: 0 });
    // the border line and its posts
    ctx.setLineDash([26, 18]); ctx.strokeStyle = '#fff4d8'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(640, 720); ctx.lineTo(640, 520); ctx.stroke(); ctx.setLineDash([]);
    // the giant: an American general, a looming close-up, shocked
    TK.bust(ctx, 1010, 640, 1.55, { kind: 'tunic', cloth: '#5a6040', skin: '#f0c8a0', hair: '#8a7a6a', face: 'surprise', shock: true, look: -26 }); peakedCap(ctx, 1010, 640, 1.55); stars(ctx, 1010, 640, 1.55);
    glow(ctx, 1010, 400, 500, 'rgba(255,150,80,A)', .18);
    // the tiny Mountie on his side of the line, the deal held high
    G.Paint.person(ctx, 470, 690, .62, t, { kind: 'coat', front: true, cloth: '#c8221a', legs: '#1e2a4a', hat: 'stetson', hatCol: '#8a6a3c', hair: '#3a2416', skin: '#f2c9a2', pose: 'up', mouth: 'grin', eyes: 'happy', seed: 4, epaulette: '#e8c040' });
    ctx.save(); ctx.translate(470, 330); ctx.rotate(-.06); cel(ctx, c => c.rect(-90, -60, 180, 110), '#f6ecd4', { shade: '#d8c8a4', dx: 6, dy: 6, lw: 5 }); ctx.restore(); stamp(ctx, 'DEAL?', 470, 340, 46, -.08);
    Col.flagCA(ctx, 120, 360, 150, 76); P.ink(ctx, '#3a3a3a', c => c.rect(114, 360, 8, 260), 0);
    grade(ctx); title(ctx, 'NEVER', 330, 140, 118, ['#ffffff', '#f0f0f0'], { rot: -.03 }); title(ctx, 'ABSORBED', 420, 250, 118, ['#ffe040', '#ff8a00'], { rot: -.03 }); }

  G.drawThumbCA = (ctx, v) => { ctx.clearRect(0, 0, 1280, 720); Q.length = 0; ({ 1: v1, 2: v2, 3: v3 })[v](ctx); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); Q.forEach(f => f()); ctx.restore(); };
})(window);
