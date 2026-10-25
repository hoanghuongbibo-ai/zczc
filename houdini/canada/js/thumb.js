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


  // ---- the user's three concepts ----
  // a 1920s officer's kit over a bust: peaked cap with a red band, red collar tabs, a Sam Browne belt, brass buttons
  function officer(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) ink(ctx, '#c8221a', c => { c.moveTo(d * 48, 124); c.lineTo(d * 96, 136); c.lineTo(d * 80, 168); c.closePath(); }, 4);
    ink(ctx, '#5a3a20', c => { c.moveTo(-150, 150); c.lineTo(170, 330); c.lineTo(130, 340); c.lineTo(-170, 176); c.closePath(); }, 4); ctx.fillStyle = '#e8c040'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(0, 190 + i * 48, 10, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); }
    const hc = '#6a6a44'; cel(ctx, c => { c.moveTo(-178, -150); c.quadraticCurveTo(-210, -262, 0, -272); c.quadraticCurveTo(210, -262, 178, -150); c.closePath(); }, hc, { shade: mix(hc, '#000', .35), light: mix(hc, '#fff', .2), dx: 26, dy: 0, lw: 6 });
    ink(ctx, '#c8221a', c => c.rect(-172, -158, 344, 44), 5); cel(ctx, c => { c.moveTo(-168, -114); c.quadraticCurveTo(0, -40, 168, -114); c.quadraticCurveTo(0, -84, -168, -114); c.closePath(); }, '#2a1c14', { shade: '#140c08', dx: 0, dy: 6, lw: 5 });
    cel(ctx, c => c.ellipse(0, -194, 30, 26, 0, 0, 7), '#e8c040', { shade: '#a88020', light: '#fff0a0', dx: 6, dy: 0, lw: 4 }); ctx.restore(); }
  // a vintage military map: the continent in sepia, a grid, typed city names, dotted invasion arrows
  function warMap(ctx, v, cities, k = 1) { const pr = Col.map(ctx, v, { prov: true, fill: n => n === 'Canada' ? '#b84a3a' : null, alpha: .5 });
    ctx.save(); ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#a07a40'; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#e8d8b0'; ctx.fillRect(0, 0, 1280, 720); ctx.restore();
    ctx.strokeStyle = 'rgba(60,40,20,.25)'; ctx.lineWidth = 1.5; for (let x = 0; x < 1280; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 720); ctx.stroke(); } for (let y = 0; y < 720; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke(); }
    for (const [f, to, n] of cities) { const [x0, y0] = pr(...f), [x1, y1] = pr(...to), mx = (x0 + x1) / 2 + (y1 - y0) * .25, my = (y0 + y1) / 2 - (x1 - x0) * .25; ctx.save(); ctx.strokeStyle = '#c8180e'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.setLineDash([2, 18]); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(mx, my, x1, y1); ctx.stroke(); ctx.restore();
      const a = Math.atan2(y1 - my, x1 - mx); ctx.save(); ctx.translate(x1, y1); ctx.rotate(a); ctx.fillStyle = '#c8180e'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-20, -16); ctx.lineTo(-20, 16); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x1, y1, 7, 0, 7); ctx.fill(); ctx.font = '700 24px "Special Elite"'; ctx.textAlign = 'center'; ctx.lineWidth = 6; ctx.strokeStyle = '#f0e2c0'; ctx.strokeText(n.toUpperCase(), x1, y1 + 34); ctx.fillText(n.toUpperCase(), x1, y1 + 34); }
    return pr; }
  const CITIES = [[[-123, 49.2], [-122.3, 47.6], 'Seattle'], [[-97, 49.2], [-93.3, 45], 'Minneapolis'], [[-74, 45.2], [-73.8, 42.7], 'Albany']];
  // option 1: Buster in uniform over the vintage map
  function v4(ctx) { warMap(ctx, { lon: -96, lat: 45.5, s: 1050, x: 900, y: 420 }, CITIES); const vg = ctx.createLinearGradient(0, 0, 640, 0); vg.addColorStop(0, 'rgba(20,12,8,.85)'); vg.addColorStop(1, 'rgba(20,12,8,0)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, 700, 720); glow(ctx, 300, 430, 420, 'rgba(255,190,110,A)', .35);
    TK.bust(ctx, 270, 560, 1.0, { kind: 'tunic', cloth: '#6a6a44', skin: '#f2c9a2', hair: '#3a2416', face: 'smug', look: 26 }); mustache(ctx, 270, 560 + 6, 1.0); officer(ctx, 270, 560, 1.0);
    grade(ctx, .9); title(ctx, "CANADA'S SECRET", 820, 110, 86, ['#ffffff', '#f0f0f0'], { rot: -.02 }); title(ctx, 'U.S. INVASION PLAN!', 830, 210, 92, ['#ff4a3a', '#d80a00'], { rot: -.02 }); stamp(ctx, 'DEFENCE SCHEME No. 1', 930, 660, 40, .04); }
  // a burning White House: portico, columns, pediment, flames and smoke
  function whiteHouse(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const W2 = '#efeae0', SH = '#c8c0b0';
    cel(ctx, c => c.rect(-300, -200, 600, 200), W2, { shade: SH, light: '#ffffff', dx: 30, dy: 0, lw: 5 }); cel(ctx, c => c.rect(-310, -214, 620, 18), W2, { shade: SH, dx: 0, dy: 4, lw: 4 }); for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) if (i < 3 || i > 4) ink(ctx, '#3a2a28', c => c.rect(-276 + i * 70, -176 + r * 90, 34, 50), 3);
    cel(ctx, c => { c.moveTo(-110, -214); c.lineTo(0, -284); c.lineTo(110, -214); c.closePath(); }, W2, { shade: SH, dx: 10, dy: 0, lw: 5 }); for (let i = 0; i < 4; i++) cel(ctx, c => c.rect(-96 + i * 60, -210, 22, 210), '#f8f4ec', { shade: SH, dx: 6, dy: 0, lw: 3.5 });
    ctx.restore(); const R = C.rng(5); for (let i = 0; i < 4; i++) G.RK.flames(ctx, x + (-250 + i * 160 + R() * 40) * s, y - 214 * s, (.55 + R() * .25) * s, t + i, { smoke: true }); for (let i = 0; i < 3; i++) G.RK.flames(ctx, x + (-230 + i * 230) * s, y - 120 * s, .35 * s, t + 5 + i, { smoke: false }); }
  // option 2: split screen — the US side with the White House burning, the Canadian side; TOP SECRET across; Buster scouting in an inset
  function v5(ctx) { const R = C.rng(9);
    // left half: US flag and the fire
    ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(700, 0); ctx.lineTo(560, 720); ctx.lineTo(0, 720); ctx.closePath(); ctx.clip(); G.RK.fireSky(ctx, t, 1); ctx.globalAlpha = .55; Col.flagUS(ctx, -40, -20, 800, 420); ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(30,10,8,.35)'; ctx.fillRect(0, 0, 800, 720); whiteHouse(ctx, 300, 620, .95, t); cel(ctx, c => c.rect(-20, 600, 800, 140), '#3a2a20', { shade: '#2a1c14', dx: 0, dy: 0, lw: 0 }); for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,${160 + R() * 80 | 0},60,${.5 + R() * .5})`; ctx.beginPath(); ctx.arc(R() * 700, R() * 600, 2 + R() * 4, 0, 7); ctx.fill(); } ctx.restore();
    // right half: the Canadian flag
    ctx.save(); ctx.beginPath(); ctx.moveTo(700, 0); ctx.lineTo(1300, 0); ctx.lineTo(1300, 720); ctx.lineTo(560, 720); ctx.closePath(); ctx.clip(); ctx.fillStyle = '#d8222a'; ctx.fillRect(500, 0, 800, 720); ctx.fillStyle = '#f8f4ec'; ctx.fillRect(760, 0, 420, 720); Col.mapleLeaf(ctx, 970, 380, 190, '#d8222a'); ctx.fillStyle = 'rgba(20,10,10,.25)'; ctx.fillRect(500, 0, 800, 720); ctx.restore();
    ctx.strokeStyle = '#fbf8f0'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(700, -10); ctx.lineTo(560, 730); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
    // inset: Buster in civilian clothes scouting a road and a bridge
    ctx.save(); ctx.translate(1010, 470); ctx.rotate(.05); C.shadow ? 0 : 0; ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-190, -170, 380, 380); ctx.save(); ctx.beginPath(); ctx.rect(-170, -150, 340, 290); ctx.clip(); C.sky(ctx, 'golden', t, { horizon: 40, sun: [100, -40], sunR: 30, seed: 3, clouds: 2 }); cel(ctx, c => c.rect(-200, 40, 400, 120), '#7a9a58', { dx: 0, dy: 0, lw: 0 }); cel(ctx, c => { c.moveTo(-20, 40); c.lineTo(20, 40); c.lineTo(120, 150); c.lineTo(-120, 150); c.closePath(); }, '#9a8a74', { dx: 0, dy: 0, lw: 3 });
      ctx.strokeStyle = '#5a5a60'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(40 + i * 30, 30); ctx.lineTo(55 + i * 30, 6); ctx.lineTo(70 + i * 30, 30); ctx.stroke(); } ink(ctx, '#7a7a80', c => c.rect(36, 28, 130, 8), 3);
      TK.bust(ctx, -60, 118, .5, { kind: 'tunic', suit: true, cloth: '#5a5a48', skin: '#f2c9a2', hair: '#3a2416', face: 'grin', look: 20 }); mustache(ctx, -60, 118 + 3, .5); bowler(ctx, -60, 118, .5); binoculars(ctx, 30, 70, .42); ctx.restore();
      ctx.fillStyle = INK; ctx.font = '700 22px "Special Elite"'; ctx.textAlign = 'center'; ctx.fillText('Buster Brown, scouting · 1921', 0, 186); ctx.restore(); C.shadow;
    grade(ctx, .9); title(ctx, 'WHEN CANADA PLANNED', 640, 100, 80, ['#ffffff', '#f0f0f0'], { rot: -.02 }); title(ctx, 'TO INVADE AMERICA', 640, 196, 92, ['#ffe040', '#ff8a00'], { rot: -.02 }); stamp(ctx, 'TOP SECRET', 300, 660, 66, -.08); }
  function mapleBg(ctx, seed) { const g = ctx.createRadialGradient(640, 300, 80, 640, 360, 900); g.addColorStop(0, '#3a1a18'); g.addColorStop(1, '#0c0606'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720); const R = C.rng(seed); ctx.save(); for (let i = 0; i < 26; i++) { ctx.globalAlpha = .08 + R() * .14; ctx.save(); ctx.translate(R() * 1280, R() * 720); ctx.rotate(R() * 6); Col.mapleLeaf(ctx, 0, 0, 30 + R() * 70, '#c8322a'); ctx.restore(); } ctx.restore(); }
  // option 3: Louis Riel, the last spike behind him, maple leaves in the dark
  function v6(ctx) { mapleBg(ctx, 13);
    // the last spike: mountains, the rails, a crowd of top hats and the hammer raised
    ctx.save(); ctx.beginPath(); ctx.rect(560, 250, 720, 470); ctx.clip(); ctx.globalAlpha = .95; C.sky(ctx, 'sunset', t, { horizon: 560, sun: [1000, 470], sunR: 60, seed: 31, clouds: 3 }); const R = C.rng(4);
      for (let L = 0; L < 2; L++) { const col = ['#6a6a8a', '#4a4a5a'][L]; cel(ctx, c => { c.moveTo(500, 760); let x = 500; c.lineTo(500, 520); while (x < 1320) { const w = 160 + R() * 120; c.lineTo(x + w * .5, 380 + L * 60 - R() * 90); c.lineTo(x + w, 540); x += w * .8; } c.lineTo(1320, 760); c.closePath(); }, col, { shade: mix(col, '#000', .3), dx: 16, dy: 0, lw: 0 }); }
      cel(ctx, c => c.rect(500, 600, 820, 140), '#4a3a2a', { dx: 0, dy: 0, lw: 0 }); ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = 7; for (const y of [628, 660]) { ctx.beginPath(); ctx.moveTo(500, y); ctx.lineTo(1300, y - 20); ctx.stroke(); } ctx.fillStyle = '#5a3a24'; for (let x = 520; x < 1300; x += 40) ctx.fillRect(x, 622 - (x - 500) * .025, 18, 46);
      G.Paint.person(ctx, 900, 640, .62, t, { kind: 'coat', front: true, cloth: '#2a2a30', hat: 'top', beard: true, beardCol: '#e8e4dc', hair: '#e8e4dc', pose: 'strike', seed: 8, prop: cc => { ink(cc, '#6a4428', c2 => c2.rect(-4, -80, 8, 96), 2); cel(cc, c2 => c2.rect(-26, -96, 52, 22), '#3a3a40', { dx: 0, dy: 0, lw: 2 }); } });
      for (let i = 0; i < 4; i++) G.Paint.person(ctx, 1040 + i * 70, 650, .5, t + i, { kind: 'coat', front: true, cloth: ['#3a3a44', '#4a3a2a', '#2a2a30', '#5a4a3a'][i], hat: i % 2 ? 'bowler' : 'top', pose: i === 1 ? 'up' : 'stand', mouth: 'grin', seed: 20 + i });
      ctx.restore(); ctx.strokeStyle = '#e8c040'; ctx.lineWidth = 8; ctx.strokeRect(560, 250, 720, 470); C.label ? 0 : 0;
    glow(ctx, 300, 380, 460, 'rgba(255,170,90,A)', .3);
    TK.bust(ctx, 300, 500, 1.05, { kind: 'tunic', suit: true, cloth: '#2a2a30', skin: '#d8a880', hair: '#2a1e18', hairStyle: 'curly', face: 'angry', look: 10 }); mustache(ctx, 300, 500 + 6 * 1.05, 1.05, '#2a1e18');
    ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(300 - 40, 500 + 88); ctx.quadraticCurveTo(300, 500 + 80, 300 + 40, 500 + 88); ctx.stroke();
    grade(ctx, .9); title(ctx, 'HOW CANADA', 860, 116, 104, ['#ffffff', '#f0f0f0'], { rot: -.02 }); title(ctx, 'SURVIVED', 880, 226, 112, ['#ffe040', '#ff8a00'], { rot: -.02 });
    Q.push(() => { ctx.save(); ctx.font = '700 26px "Special Elite"'; ctx.fillStyle = '#f4e8c8'; ctx.textAlign = 'center'; ctx.fillText('LOUIS RIEL', 300, 250); ctx.fillText('THE LAST SPIKE · 7 NOV 1885', 920, 290); ctx.restore(); }); }
  G.drawThumbCA = (ctx, v) => { ctx.clearRect(0, 0, 1280, 720); Q.length = 0; ({ 1: v1, 2: v2, 3: v3, 4: v4, 5: v5, 6: v6 })[v](ctx); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); Q.forEach(f => f()); ctx.restore(); };
})(window);
