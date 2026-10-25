/* Canada — YouTube thumbnails in the channel's cinematic close-up style: big expressive busts, one strong light source,
 * warm/teal grade, a short punchy title. ?v=1 "7 DEALS" (the deal table), ?v=2 "CANADA INVADES?!" (Buster, 1921), ?v=3 "NEVER ABSORBED" (the border). */
(function (G) {
  'use strict';
  const C = G.Cine, Cn2 = G.Cine, P = G.Paint, Col = G.Col, TK = G.ThumbKit, { INK, ink, cel, mix } = P, t = 2.3;
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

  // ---- the reference set: a short 2-3 word title, figures in a struggle over the map ----
  // a thick sleeve from shoulder to hand, with a gripping hand at the end
  function sleeve(ctx, x0, y0, x1, y1, w, cloth, skin, cuff) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = w + 10; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.strokeStyle = cloth; ctx.lineWidth = w; ctx.stroke();
    if (cuff) { const a = Math.atan2(y1 - y0, x1 - x0); ctx.strokeStyle = INK; ctx.lineWidth = w * .5 + 8; ctx.beginPath(); ctx.moveTo(x1 - Math.cos(a) * 26, y1 - Math.sin(a) * 26); ctx.lineTo(x1 - Math.cos(a) * 8, y1 - Math.sin(a) * 8); ctx.stroke(); ctx.strokeStyle = cuff; ctx.lineWidth = w * .5; ctx.stroke(); }
    ctx.restore(); cel(ctx, c => c.ellipse(x1, y1, w * .62, w * .56, 0, 0, 7), skin, { shade: mix(skin, '#8a4a3a', .25), dx: 6, dy: 0, lw: 5 }); ctx.strokeStyle = 'rgba(90,50,40,.6)'; ctx.lineWidth = 3; for (const d of [-.25, .05, .35]) { ctx.beginPath(); ctx.moveTo(x1 - w * .4, y1 + d * w); ctx.lineTo(x1 + w * .3, y1 + d * w); ctx.stroke(); } }
  function samHat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.save(); ctx.beginPath(); ctx.moveTo(-124, -170); ctx.lineTo(-140, -470); ctx.lineTo(140, -470); ctx.lineTo(124, -170); ctx.closePath(); ctx.fillStyle = '#f8f4ec'; ctx.fill(); ctx.clip(); ctx.fillStyle = '#d8222a'; for (let i = -3; i <= 3; i++) ctx.fillRect(i * 40 - 10, -480, 22, 320); ctx.fillStyle = '#2a4a9a'; ctx.fillRect(-150, -270, 300, 70); ctx.restore();
    ink(ctx, null, c => { c.moveTo(-124, -170); c.lineTo(-140, -470); c.lineTo(140, -470); c.lineTo(124, -170); c.closePath(); }, 6); for (let i = -1; i <= 1; i++) { ctx.save(); ctx.translate(i * 70, -236); ctx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 9 : 22; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    cel(ctx, c => c.ellipse(0, -168, 220, 40, 0, 0, 7), '#f8f4ec', { shade: '#c8c0b0', dx: 0, dy: 8, lw: 6 }); ctx.restore(); }
  function goatee(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => { c.moveTo(-50, 96); c.quadraticCurveTo(-30, 180, 0, 250); c.quadraticCurveTo(30, 180, 50, 96); c.quadraticCurveTo(0, 120, -50, 96); c.closePath(); }, '#f4f2ea', { shade: '#c8c4b8', dx: 8, dy: 0, lw: 5 }); ctx.restore(); }
  function shortTitle(ctx, a, b, y = 106, sz = 104) { Q.push(() => { ctx.save(); ctx.font = sz + 'px "Luckiest Guy"'; const wa = ctx.measureText(a + ' ').width, wb = ctx.measureText(b).width, x0 = 640 - (wa + wb) / 2; ctx.restore(); TK.title(ctx, a, x0, y, sz, ['#ffffff', '#f0f0f0'], { align: 'left', rot: -.02 }); TK.title(ctx, b, x0 + wa, y, sz, ['#ffe040', '#ffb000'], { align: 'left', rot: -.02 }); }); }
  // a parchment map of Canada, slightly skewed as if pulled from both sides
  function pulledMap(ctx, x, y, w, h, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const edge = c => { c.moveTo(-w / 2, -h / 2 + 10); c.quadraticCurveTo(0, -h / 2 - 16, w / 2, -h / 2); c.lineTo(w / 2 + 6, h / 2 - 8); c.quadraticCurveTo(0, h / 2 + 18, -w / 2 - 4, h / 2); c.closePath(); };
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 10; ctx.fillStyle = '#efe2c0'; ctx.beginPath(); edge(ctx); ctx.fill(); ctx.restore(); ctx.save(); ctx.beginPath(); edge(ctx); ctx.clip();
    ctx.translate(-640, -360); Col.map(ctx, { lon: -97, lat: 60, s: w * 1.25, x: 640, y: 380 }, { prov: true, fill: n => n === 'Canada' ? '#e89a5a' : n === 'United States of America' ? '#c8c0a8' : null, alpha: .85 }); ctx.restore(); ctx.save(); ctx.beginPath(); edge(ctx); ctx.clip(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#e8d8b0'; ctx.fillRect(-w, -h, w * 2, h * 2); ctx.restore();
    ink(ctx, null, edge, 6); ctx.font = `900 ${w * .13}px Anton`; ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = '#f6ecd4'; ctx.strokeText('CANADA', 0, h * .1); ctx.fillStyle = INK; ctx.fillText('CANADA', 0, h * .1); for (const d of [-1, 1]) { ctx.strokeStyle = 'rgba(90,60,30,.5)'; ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(d * w / 2, -h * .3 + k * h * .15); ctx.quadraticCurveTo(d * w * .38, -h * .28 + k * h * .15, d * w * .3, -h * .25 + k * h * .15); ctx.stroke(); } } ctx.restore(); }
  function burningShip(ctx, x, y, s) { Col.ship(ctx, x, y, s, t, { flag: '#c23a2c', sail: '#d8c8a8' }); G.RK.flames(ctx, x - 10 * s, y - 60 * s, .5 * s * 2, t, { smoke: true }); }
  // v7: Macdonald and Uncle Sam in a tug-of-war over the map; the ground cracks along the border
  function v7(ctx) { C.sky(ctx, 'sunset', t, { horizon: 430, sun: [640, 400], sunR: 40, seed: 71, clouds: 5 }); for (const [px, py] of [[130, 380], [880, 300], [1180, 330]]) C.smoke(ctx, px, py, 1.6, t, { h: 420, a: .6, col: '50,40,44' });
    Cn2.water(ctx, -20, 400, 560, 470, t, { pal: 'sunset' }); burningShip(ctx, 90, 440, .5); Col.ship(ctx, 220, 450, .4, t, { flag: '#c23a2c', sail: '#e8d8b8' });
    cel(ctx, c => { c.moveTo(-20, 430); c.lineTo(1300, 410); c.lineTo(1300, 740); c.lineTo(-20, 740); c.closePath(); }, '#a88a60', { shade: '#7a6040', dx: 0, dy: 0, lw: 0 }); C.mounds(ctx, { y: 470, n: 4, seed: 72, col: '#9a7c54', far: .3, sunX: 640, t, w: 600, h: 40, copses: 0, haze: '#d89060' });
    for (let i = 0; i < 6; i++) G.Paint.person(ctx, 30 + i * 46, 560 + (i % 2) * 8, .22, t + i, { kind: 'coat', front: true, cloth: '#c8221a', legs: '#efe6d2', hat: 'tricorne', seed: 30 + i });
    for (let i = 0; i < 5; i++) G.Paint.person(ctx, 1080 + i * 44, 520 + (i % 2) * 8, .2, t + i, { kind: 'coat', front: true, cloth: '#2a3a6a', legs: '#c8c0b0', hat: 'kepi', hatCol: '#1e2a4a', seed: 40 + i });
    // the crack along the border, the wire
    cel(ctx, c => { c.moveTo(600, 740); c.lineTo(624, 640); c.lineTo(606, 600); c.lineTo(640, 540); c.lineTo(662, 600); c.lineTo(650, 650); c.lineTo(690, 740); c.closePath(); }, '#3a2a1c', { shade: '#1a120c', dx: 0, dy: 0, lw: 4 });
    for (const x of [520, 760]) P.ink(ctx, '#5a3a24', c => c.rect(x, 560, 10, 80), 3); ctx.strokeStyle = '#3a3030'; ctx.lineWidth = 2; for (let x = 440; x < 860; x += 7) { ctx.beginPath(); ctx.arc(x, 580 + Math.sin(x * .3) * 3, 5, 0, 7); ctx.stroke(); }
    Col.flagRedEnsign(ctx, 40, 470, 120, 66); P.ink(ctx, '#3a3a3a', c => c.rect(34, 470, 7, 200), 0); Col.flagUS(ctx, 1150, 420, 120, 70); P.ink(ctx, '#3a3a3a', c => c.rect(1144, 420, 7, 220), 0);
    // the map, pulled
    pulledMap(ctx, 640, 420, 460, 300, -.04);
    // Macdonald (left): leaning back, gritted teeth
    ctx.save(); ctx.translate(230, 600); ctx.rotate(-.14); ctx.translate(-290, -560);
    cel(ctx, c => { c.moveTo(110, 760); c.quadraticCurveTo(90, 560, 200, 470); c.lineTo(350, 470); c.quadraticCurveTo(430, 560, 440, 760); c.closePath(); }, '#9a1a1a', { shade: '#6a1010', dx: 14, dy: 0, lw: 6 });
    TK.bust(ctx, 290, 470, .78, { kind: 'tunic', suit: true, cloth: '#2a2420', skin: '#f2c9a2', hair: '#4a3a2e', hairStyle: 'curly', face: 'grin', look: 22 }); ctx.restore();
    sleeve(ctx, 330, 560, 414, 330, 50, '#2a2420', '#f2c9a2', '#f4f0e6'); sleeve(ctx, 350, 620, 414, 500, 50, '#2a2420', '#f2c9a2', '#f4f0e6');
    Col.beaver(ctx, 150, 700, .9, t, {}); peakedCap(ctx, 150, 610, .2);
    ctx.save(); ctx.translate(300, 700); ctx.rotate(-.25); cel(ctx, c => c.rect(-40, -50, 80, 100), '#f6ecd4', { shade: '#d8c8a4', dx: 4, dy: 4, lw: 4 }); ctx.fillStyle = INK; ctx.font = '900 22px Anton'; ctx.textAlign = 'center'; ctx.fillText('DEAL', 0, -18); ctx.restore();
    // Uncle Sam (right): shouting
    ctx.save(); ctx.translate(1050, 600); ctx.rotate(.14); ctx.translate(-990, -560);
    cel(ctx, c => { c.moveTo(860, 760); c.quadraticCurveTo(850, 560, 930, 470); c.lineTo(1060, 470); c.quadraticCurveTo(1150, 560, 1160, 760); c.closePath(); }, '#2a4a9a', { shade: '#1a2e6a', dx: 14, dy: 0, lw: 6 });
    TK.bust(ctx, 990, 470, .78, { kind: 'tunic', suit: true, cloth: '#2a4a9a', skin: '#f2c9a2', hair: '#e8e4dc', face: 'panic', look: -22 }); goatee(ctx, 990, 470 + 60 * .78, .78); samHat(ctx, 990, 470, .78); ctx.restore();
    sleeve(ctx, 950, 560, 866, 330, 50, '#2a4a9a', '#f2c9a2', '#f4f0e6'); sleeve(ctx, 930, 620, 866, 500, 50, '#2a4a9a', '#f2c9a2', '#f4f0e6');
    grade(ctx); shortTitle(ctx, 'WHO GETS', 'CANADA?'); }
  // v8: the 1921 war room — Buster slams the red arrow onto the map; an American officer drops his coffee
  function v8(ctx) { const bg = ctx.createRadialGradient(640, 420, 60, 640, 420, 800); bg.addColorStop(0, '#4a3a2c'); bg.addColorStop(1, '#120c0a'); ctx.fillStyle = bg; ctx.fillRect(0, 0, 1280, 720);
    ctx.save(); ctx.globalAlpha = .55; Col.flagRedEnsign(ctx, -20, 140, 230, 400); Col.flagUS(ctx, 1080, 140, 230, 400); ctx.restore(); ctx.fillStyle = 'rgba(10,8,6,.35)'; ctx.fillRect(0, 0, 1280, 720);
    // the table and the map in perspective
    cel(ctx, c => { c.moveTo(120, 500); c.lineTo(1160, 500); c.lineTo(1300, 740); c.lineTo(-20, 740); c.closePath(); }, '#6a4428', { shade: '#4a2e18', light: '#8a5a34', dx: 0, dy: 0, lw: 5 });
    ctx.save(); ctx.beginPath(); ctx.moveTo(300, 520); ctx.lineTo(980, 520); ctx.lineTo(1090, 720); ctx.lineTo(190, 720); ctx.closePath(); ctx.clip(); ctx.translate(640, 620); ctx.scale(1, .55); ctx.translate(-640, -620); Col.map(ctx, { lon: -96, lat: 46, s: 1000, x: 640, y: 560 }, { prov: true, fill: n => n === 'Canada' ? '#c86a5a' : n === 'United States of America' ? '#8ab0d8' : null, alpha: .8 });
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#e0cfa0'; ctx.fillRect(0, 0, 1280, 1400); ctx.restore(); ctx.restore(); ink(ctx, null, c => { c.moveTo(300, 520); c.lineTo(980, 520); c.lineTo(1090, 720); c.lineTo(190, 720); c.closePath(); }, 5);
    for (const [x0, x1] of [[520, 500], [640, 640], [760, 800]]) Col.marker ? 0 : 0; for (const [x0, y0, x1, y1] of [[540, 560, 520, 640], [650, 560, 660, 650], [780, 560, 830, 640]]) { ctx.strokeStyle = '#d8241a'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.save(); ctx.translate(x1, y1); ctx.rotate(Math.atan2(y1 - y0, x1 - x0)); ctx.fillStyle = '#d8241a'; ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-14, -16); ctx.lineTo(-14, 16); ctx.closePath(); ctx.fill(); ctx.restore(); }
    // the lantern
    glow(ctx, 760, 430, 360, 'rgba(255,200,110,A)', .55); cel(ctx, c => c.rect(740, 420, 40, 60), '#f8d070', { shade: '#d8a040', light: '#fff4c0', dx: 0, dy: 0, lw: 4 }); ink(ctx, '#3a2a1c', c => { c.rect(734, 410, 52, 12); c.rect(734, 478, 52, 12); }, 3);
    // Buster: angry grin, slamming the arrow; folder under his arm
    TK.bust(ctx, 300, 420, .86, { kind: 'tunic', cloth: '#6a6a44', skin: '#f2c9a2', hair: '#3a2416', face: 'grin', look: 20 }); mustache(ctx, 300, 420 + 5, .86); officer(ctx, 300, 420, .86);
    sleeve(ctx, 430, 560, 560, 580, 56, '#6a6a44', '#f2c9a2'); ctx.save(); ctx.translate(560, 600); ctx.rotate(.5); cel(ctx, c => { c.moveTo(-14, -60); c.lineTo(14, -60); c.lineTo(14, 10); c.lineTo(34, 10); c.lineTo(0, 60); c.lineTo(-34, 10); c.lineTo(-14, 10); c.closePath(); }, '#d8241a', { shade: '#a01410', dx: 4, dy: 0, lw: 4 }); ctx.restore();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; for (const a of [-.4, 0, .4]) { ctx.beginPath(); ctx.moveTo(540 + Math.cos(a - 1.6) * 90, 560 + Math.sin(a - 1.6) * 90); ctx.lineTo(540 + Math.cos(a - 1.6) * 130, 560 + Math.sin(a - 1.6) * 130); ctx.stroke(); }
    ctx.save(); ctx.translate(140, 640); ctx.rotate(-.1); cel(ctx, c => c.rect(-70, -90, 140, 180), '#d8b878', { shade: '#a88850', dx: 6, dy: 0, lw: 5 }); ctx.fillStyle = INK; ctx.font = '900 22px Anton'; ctx.textAlign = 'center'; ctx.fillText('DEFENCE', 0, -30); ctx.fillText('SCHEME', 0, 0); ctx.fillText('No. 1', 0, 30); ctx.restore();
    // the American officer: panic, hands up, coffee flying
    TK.bust(ctx, 1010, 440, .82, { kind: 'tunic', cloth: '#7a6a44', skin: '#f0c8a0', hair: '#8a7a6a', face: 'panic', hands: 'up', shock: true, look: -20 }); peakedCap(ctx, 1010, 440, .82);
    cel(ctx, c => c.rect(860, 560, 44, 52), '#f4f0e8', { shade: '#c8c0b0', dx: 4, dy: 0, lw: 4 }); for (let i = 0; i < 5; i++) cel(ctx, c => c.ellipse(840 - i * 16, 540 - i * 14 + i * i * 3, 9 - i, 7 - i * .8, 0, 0, 7), '#6a3a1a', { dx: 0, dy: 0, lw: 2 });
    grade(ctx, .9); title(ctx, 'CANADA', 640, 130, 120, ['#ffffff', '#f0f0f0'], { rot: -.02 }); title(ctx, 'INVADES?!', 660, 250, 128, ['#ffe040', '#ff9a00'], { rot: -.02 }); }
  // v9: the birth of Canada — Macdonald signs THE DEAL 1867; a redcoat points; the map on the globe; a train and burning ships
  function v9(ctx) { C.sky(ctx, 'sunset', t, { horizon: 520, sun: [640, 470], sunR: 60, seed: 91, clouds: 4 });
    // left: snowy mountains and a steam train; right: smoke and burning ships
    for (let i = 0; i < 3; i++) cel(ctx, c => { c.moveTo(-40 + i * 120, 470); c.lineTo(60 + i * 120, 230 + i * 30); c.lineTo(170 + i * 120, 470); c.closePath(); }, '#7a8aa0', { shade: '#5a6a80', light: '#e8eef4', dx: 20, dy: 0, lw: 4 }); for (let i = 0; i < 6; i++) Col.pine(ctx, 20 + i * 60, 500, .6, '#2f4a3a');
    Col.train(ctx, 230, 520, .7, t, { flip: true }); C.smoke(ctx, 1100, 360, 1.8, t, { h: 420, a: .7, col: '40,32,32' }); Cn2.water(ctx, 900, 430, 1300, 520, t, { pal: 'sunset' }); burningShip(ctx, 1060, 470, .55); burningShip(ctx, 1200, 480, .45);
    // the globe with the map of Canada
    ctx.save(); ctx.beginPath(); ctx.arc(640, 760, 470, 0, 7); ctx.clip(); Col.map(ctx, { lon: -96, lat: 52, s: 640, x: 640, y: 520 }, { prov: true, fill: n => n === 'Canada' ? '#f0d8b8' : null, alpha: .9 }); ctx.restore(); ink(ctx, null, c => c.arc(640, 760, 470, 0, 7), 6);
    // the desk and Macdonald signing
    cel(ctx, c => { c.moveTo(-20, 600); c.lineTo(640, 600); c.lineTo(680, 740); c.lineTo(-20, 740); c.closePath(); }, '#6a4428', { shade: '#4a2e18', light: '#8a5a34', dx: 0, dy: 10, lw: 6 });
    TK.bust(ctx, 250, 470, .82, { kind: 'tunic', suit: true, cloth: '#2a2420', skin: '#f2c9a2', hair: '#4a3a2e', hairStyle: 'curly', face: 'smug', look: 20 });
    sleeve(ctx, 380, 580, 610, 672, 50, '#2a2420', '#f2c9a2', '#f4f0e6'); cel(ctx, c => { c.moveTo(610, 672); c.quadraticCurveTo(640, 592, 690, 552); c.quadraticCurveTo(660, 612, 620, 678); c.closePath(); }, '#f8f4ec', { shade: '#c8c0b0', dx: 4, dy: 0, lw: 3 });
    ctx.save(); ctx.translate(420, 660); ctx.rotate(.08); cel(ctx, c => c.rect(-150, -50, 300, 100), '#f6ecd4', { shade: '#d8c8a4', dx: 6, dy: 6, lw: 5 }); for (const d of [-1, 1]) cel(ctx, c => c.ellipse(d * 152, 0, 14, 52, 0, 0, 7), '#e8dcc0', { dx: 0, dy: 0, lw: 4 }); ctx.fillStyle = INK; ctx.font = '900 34px Anton'; ctx.textAlign = 'center'; ctx.fillText('THE DEAL 1867', 0, 12); cel(ctx, c => c.arc(110, 26, 18, 0, 7), '#b8221a', { shade: '#7a1410', dx: 3, dy: 0, lw: 3 }); ctx.restore();
    Col.beaver(ctx, 700, 680, .9, t, {}); stetson(ctx, 700, 600, .2);
    // the redcoat: angry, pointing at the map
    TK.bust(ctx, 1060, 520, .82, { kind: 'tunic', cloth: '#c8221a', skin: '#f2c9a2', hair: '#6a4a2a', face: 'grin', beard: true, look: -22 }); ink(ctx, '#efe6d2', c => { c.moveTo(1060 - 150, 520 + 120); c.lineTo(1060 + 180, 520 + 270); c.lineTo(1060 + 150, 520 + 290); c.lineTo(1060 - 170, 520 + 140); c.closePath(); }, 4);
    ctx.save(); ctx.translate(1060, 520); ctx.scale(.82, .82); cel(ctx, c => { c.moveTo(-130, -150); c.lineTo(-120, -330); c.lineTo(120, -330); c.lineTo(130, -150); c.closePath(); }, '#1e1a20', { shade: '#0e0a10', light: '#3a3640', dx: 20, dy: 0, lw: 6 }); cel(ctx, c => c.ellipse(0, -150, 160, 26, 0, 0, 7), '#1e1a20', { dx: 0, dy: 4, lw: 5 }); cel(ctx, c => c.ellipse(0, -250, 40, 46, 0, 0, 7), '#e8c040', { shade: '#a88020', dx: 6, dy: 0, lw: 4 }); ctx.restore();
    sleeve(ctx, 940, 600, 800, 560, 52, '#c8221a', '#f2c9a2', '#efe6d2');
    grade(ctx); title(ctx, 'BIRTH OF', 640, 120, 100, ['#ffe040', '#ffb000'], { rot: -.02 }); title(ctx, 'CANADA', 640, 250, 150, ['#ffffff', '#f0f0f0'], { rot: -.02 }); Q.push(() => { Col.mapleLeaf(ctx, 300, 200, 40, '#d8222a'); Col.mapleLeaf(ctx, 980, 200, 40, '#d8222a'); }); }
  G.drawThumbCA = (ctx, v) => { ctx.clearRect(0, 0, 1280, 720); Q.length = 0; ({ 1: v1, 2: v2, 3: v3, 4: v4, 5: v5, 6: v6, 7: v7, 8: v8, 9: v9 })[v](ctx); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); Q.forEach(f => f()); ctx.restore(); };
})(window);
