/* Rome — Beat 2, "The world before" (narration-beat2.mp3 = narration-full.mp3 93.4–221.05 s + pad).
 * Same drawn style and cast as the cold open (paint.js, monk.js, animals.js): the river, the crossing, the hills, the swamp;
 * the legend as a storybook; Varro, Livy; what archaeology shows; Carandini's wall; "a lot of farmers on a lot of hills". */
(function (G) {
  'use strict';
  const C = G.Cine;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const OFF = 93.4; // anchors below are narration-full.mp3 seconds; the page clock runs from OFF
  const A0 = { understand: 93.74, marble: 95.33, picture: 96.8, river: 97.37, tiber: 98.5, winds: 99.72, fifteen: 101.01, sea: 102.14, right: 103.14, island: 105.04,
    easiest: 107.54, cross: 108.47, crossing: 110.97, cluster: 111.85, hills: 112.85, top: 114.45, trouble: 115.88, bottom: 117.63, well: 118.42, wet: 119.29,
    valley: 120.25, swamp: 122.3, floods: 123.05, now: 124.42, origin: 126.45, knowit: 129.25, twin: 130.11, romulus: 131.06, thrown: 132.44, rescued: 133.76,
    wolf: 134.7, shepherd: 135.77, grow: 136.79, build: 137.97, argue: 139.03, killed: 141.01, name: 143.32, writers: 144.43, date: 145.5, seven: 146.24,
    worked: 148.73, varro: 151.49, legend: 153.63, livy: 154.75, seven2: 156.99, founding: 158.53, unsure: 159.57, says: 161.31, poetry: 164.74, record: 166.11,
    archaeology: 167.24, dramatic: 169.67, interesting: 171.37, huts: 173.24, before: 174.75, time: 177.1, communities: 178.49, one: 180.6, historians: 182.28,
    fight: 184.02, italian: 185.06, carandini: 187.55, palatine: 188.34, wall: 189.91, seven3: 191.02, argues: 193.35, king: 195.35, named: 196.57, ceremony: 199.07,
    most: 200.3, toomuch: 202.37, wallis: 204.12, somebody: 204.91, prove: 206.8, romulus2: 208.51, honest: 210.17, farmers: 213.62, hills2: 214.87, long: 215.8,
    first: 217.38, problem: 217.9, enemy: 218.83, swamp2: 220.0 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 128.85;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };

  // ---------- cast (same construction as the cold open) ----------
  const VILL = [{ kind: 'tunic', cloth: '#9a7a54', hair: '#2a1a14', hairStyle: 'curly', beard: true, seed: 1 }, { kind: 'woman', cloth: '#a88a6a', scarf: '#d8c8a8', hair: '#3a2416', seed: 2 },
    { kind: 'tunic', cloth: '#7a6a4a', hair: '#4a3020', hairStyle: 'short', seed: 3 }, { kind: 'woman', cloth: '#8a7a5a', scarf: '#c8a878', hair: '#2a1a14', seed: 4 }, { kind: 'tunic', cloth: '#a8845a', hair: '#1a1410', hairStyle: 'short', beard: true, seed: 5 }];
  const ROMULUS = { kind: 'tunic', cloth: '#b84a3a', hair: '#3a2416', hairStyle: 'curly', seed: 11 }, REMUS = { kind: 'tunic', cloth: '#4a6a9a', hair: '#3a2416', hairStyle: 'curly', seed: 12 };
  const SHEPHERD = { kind: 'tunic', cloth: '#8a7a5a', hair: '#8a8a84', hairStyle: 'short', beard: true, beardCol: '#9a9a94', seed: 13 };
  const VARRO = { kind: 'toga', hair: '#9a9a94', hairStyle: 'bald', seed: 14 }, LIVY = { kind: 'toga', hair: '#4a3020', hairStyle: 'short', seed: 15, trim: '#7a2a62' };
  const CARANDINI = { kind: 'tourist', cloth: '#d8c8a0', cloth2: '#6a5a44', hair: '#e8e4dc', hairStyle: 'short', glasses: true, pack: false, seed: 16 };
  const PROF_A = { kind: 'tourist', cloth: '#3a4a6a', cloth2: '#4a4a52', hair: '#5a3a24', hairStyle: 'short', beard: true, glasses: true, pack: false, seed: 17 };
  const PROF_B = { kind: 'tourist', cloth: '#8a3a3a', cloth2: '#3a3a42', hair: '#2a1a14', hairStyle: 'bun', fem: true, pack: false, seed: 18 };
  const person = (ctx, x, y, s, t, base, o) => P.person(ctx, x, y, s, t, Object.assign({}, base, o || {}));
  const sword = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6, y - 90); ctx.stroke(); ctx.strokeStyle = '#c8ccd4'; ctx.lineWidth = 5; ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 14, y - 6); ctx.lineTo(x + 14, y - 4); ctx.stroke(); ctx.restore(); };
  const staff = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 6, y + 150); ctx.quadraticCurveTo(x, y - 40, x + 14, y - 90); ctx.quadraticCurveTo(x + 30, y - 110, x + 18, y - 120); ctx.stroke(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 4.5; ctx.stroke(); ctx.restore(); };
  const stylus = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 18, y + 22); ctx.stroke(); ctx.restore(); };
  const trowel = (ctx, x, y) => { ink(ctx, '#8a6a44', c => c.rect(x - 4, y - 4, 8, 22), 3); ink(ctx, '#b8bcc4', c => { c.moveTo(x - 12, y + 18); c.lineTo(x + 12, y + 18); c.lineTo(x, y + 46); c.closePath(); }, 3); };
  const papers = (ctx, x, y) => { ink(ctx, '#f6f2e8', c => c.rect(x - 22, y - 30, 40, 50), 3); ctx.strokeStyle = 'rgba(60,60,70,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 16, y - 20 + i * 10); ctx.lineTo(x + 12, y - 20 + i * 10); ctx.stroke(); } };
  const jug = (ctx, x, y) => cel(ctx, c => c.ellipse(x, y - 24, 16, 22, 0, 0, 7), '#b8784a', { shade: '#7a4a2a', dx: 4, dy: 3, lw: 3 });

  // ---------- new props and creatures ----------
  // an Iron Age round hut: wattle-and-daub wall, steep thatch, a low door, a thread of smoke
  function roundHut(ctx, x, y, s, t, seed = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(10, 2, 120, 14, 0, 0, 7); ctx.fill();
    cel(ctx, c => { c.moveTo(-90, 0); c.lineTo(-86, -80); c.quadraticCurveTo(0, -92, 86, -80); c.lineTo(90, 0); c.quadraticCurveTo(0, 12, -90, 0); c.closePath(); }, '#b89468', { shade: '#8a6a44', light: '#d0ac7c', dx: 22, dy: 0, lw: 4.5 });
    ctx.strokeStyle = 'rgba(90,60,30,.45)'; ctx.lineWidth = 2.5; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 24, -84 + Math.abs(i) * 2); ctx.lineTo(i * 25, -4); ctx.stroke(); }
    ink(ctx, '#3a2414', c => { c.moveTo(-22, 0); c.lineTo(-22, -52); c.quadraticCurveTo(0, -64, 22, -52); c.lineTo(22, 0); c.closePath(); }, 4);
    cel(ctx, c => { c.moveTo(-112, -70); c.quadraticCurveTo(-40, -210, 0, -230); c.quadraticCurveTo(40, -210, 112, -70); c.quadraticCurveTo(0, -58, -112, -70); c.closePath(); }, '#c8a050', { shade: '#987434', light: '#e4c070', dx: 26, dy: 0, lw: 5 });
    ctx.strokeStyle = 'rgba(110,80,30,.55)'; ctx.lineWidth = 2.5; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * 4, -222); ctx.quadraticCurveTo(i * 12, -150, i * 21, -66); ctx.stroke(); }
    ctx.fillStyle = 'rgba(235,230,220,.45)'; for (let k = 0; k < 4; k++) { const ph = (t * .35 + k * .25 + seed * .13) % 1; ctx.beginPath(); ctx.arc(6 + Math.sin(ph * 6 + seed) * 10, -236 - ph * 120, 10 + ph * 18, 0, 7); ctx.fill(); }
    ctx.restore(); }
  // the she-wolf: grey-brown, long muzzle, upright ears, bushy tail; lying down (nursing) or standing
  function wolf(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); const F = '#8a7a6a', SH = '#5e5248', LI = '#b8a894', BE = '#d8ccb8', br = Math.sin(t * 2) * 2;
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(10, 2, 190, 16, 0, 0, 7); ctx.fill();
    if (o.lie) { cel(ctx, c => { c.moveTo(160, -40); c.quadraticCurveTo(230, -60, 250, -20); c.quadraticCurveTo(220, -30, 170, -12); c.closePath(); }, F, { shade: SH, dx: 6, dy: 4, lw: 4 });
      cel(ctx, c => { c.moveTo(-120, -70 - br); c.quadraticCurveTo(20, -110 - br, 160, -66); c.quadraticCurveTo(190, -30, 150, 0); c.lineTo(-110, 0); c.quadraticCurveTo(-150, -30, -120, -70 - br); c.closePath(); }, F, { shade: SH, light: LI, dx: 0, dy: 14, lw: 5 });
      ink(ctx, BE, c => { c.moveTo(-90, -6); c.quadraticCurveTo(10, -34, 120, -8); c.lineTo(110, 0); c.lineTo(-80, 0); c.closePath(); }, 0);
      for (const lx of [-150, -110]) cel(ctx, c => c.rect(lx - 50, -18, 70, 18), F, { shade: SH, dx: 0, dy: 4, lw: 4 }); }
    else { for (const [lx, d] of [[-90, 1], [100, 1], [-60, 0], [130, 0]]) cel(ctx, c => { c.moveTo(lx - 11, -100); c.lineTo(lx - 8, 0); c.lineTo(lx + 10, 0); c.lineTo(lx + 11, -100); c.closePath(); }, d ? SH : F, { shade: SH, dx: 4, dy: 0, lw: 4 });
      cel(ctx, c => { c.moveTo(150, -150); c.quadraticCurveTo(240, -150 + Math.sin(t * 3) * 10, 250, -90); c.quadraticCurveTo(220, -110, 170, -116); c.closePath(); }, F, { shade: SH, dx: 6, dy: 4, lw: 4 });
      cel(ctx, c => { c.moveTo(-110, -160); c.quadraticCurveTo(20, -176, 160, -150); c.quadraticCurveTo(190, -120, 150, -96); c.quadraticCurveTo(20, -84, -100, -96); c.quadraticCurveTo(-140, -120, -110, -160); c.closePath(); }, F, { shade: SH, light: LI, dx: 0, dy: 12, lw: 5 }); }
    // head: long muzzle to the left, ears up
    const hy = o.lie ? -78 : -168, hx = o.lie ? -150 : -130; ctx.save(); ctx.translate(hx, hy); ctx.rotate(o.lie ? .12 : -.05 + Math.sin(t * 1.2) * .03);
    for (const [ex, c] of [[16, SH], [36, F]]) cel(ctx, cc => { cc.moveTo(ex - 14, -26); cc.lineTo(ex - 2, -70); cc.lineTo(ex + 12, -24); cc.closePath(); }, c, { shade: SH, dx: 3, dy: 3, lw: 4 });
    cel(ctx, c => { c.moveTo(40, -36); c.quadraticCurveTo(0, -46, -30, -24); c.lineTo(-86, -6); c.quadraticCurveTo(-92, 8, -80, 12); c.lineTo(-30, 18); c.quadraticCurveTo(20, 34, 50, 14); c.quadraticCurveTo(64, -10, 40, -36); c.closePath(); }, F, { shade: SH, light: LI, dx: 10, dy: 6, lw: 4.5 });
    ink(ctx, BE, c => { c.moveTo(-80, 10); c.lineTo(-30, 16); c.quadraticCurveTo(0, 26, 20, 22); c.lineTo(-20, 6); c.closePath(); }, 0);
    ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-86, 0, 7, 6, 0, 0, 7); ctx.fill(); ink(ctx, '#f0e0a0', c => c.ellipse(-14, -16, 7, 5, -.2, 0, 7), 2.5); ctx.beginPath(); ctx.fillStyle = INK; ctx.arc(-16, -16, 3, 0, 7); ctx.fill();
    ctx.restore(); ctx.restore(); }
  // two swaddled babies
  function twins(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (const [bx, sw, ph] of [[-26, '#efe6d2', 0], [26, '#e6d8bc', 1.7]]) { ctx.save(); ctx.translate(bx, 0); ctx.rotate(Math.sin(t * 2 + ph) * .05);
      cel(ctx, c => c.ellipse(0, -20, 26, 34, 0, 0, 7), sw, { shade: mix(sw, '#8a7050', .3), dx: 5, dy: 3, lw: 3.5 });
      cel(ctx, c => c.arc(0, -62, 20, 0, 7), '#f4d0b0', { shade: '#dca88a', dx: 4, dy: 3, lw: 3.5 }); ctx.fillStyle = INK; const bl = ((t + ph) % 2.6) < .15;
      for (const ex of [-7, 7]) { ctx.beginPath(); if (bl) ctx.fillRect(ex - 3, -64, 6, 2); else ctx.arc(ex, -63, 2.5, 0, 7); ctx.fill(); } ctx.strokeStyle = '#a0604a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -55, 5, .2, Math.PI - .2); ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  function basket(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    twins(ctx, 0, -10, .7, t);
    cel(ctx, c => { c.moveTo(-80, -40); c.quadraticCurveTo(-74, 10, 0, 14); c.quadraticCurveTo(74, 10, 80, -40); c.closePath(); }, '#b8884e', { shade: '#86602e', light: '#d4a46a', dx: 0, dy: 8, lw: 4.5 });
    ctx.strokeStyle = 'rgba(100,66,30,.6)'; ctx.lineWidth = 2.5; for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(i * 12, -38); ctx.lineTo(i * 10, 8); ctx.stroke(); } for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.moveTo(-76, -28 + r * 14); ctx.quadraticCurveTo(0, -18 + r * 16, 76, -28 + r * 14); ctx.stroke(); }
    ctx.restore(); }
  function figTree(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    cel(ctx, c => { c.moveTo(-26, 0); c.quadraticCurveTo(-10, -120, -60, -220); c.lineTo(-30, -226); c.quadraticCurveTo(10, -150, 18, -200); c.lineTo(40, -196); c.quadraticCurveTo(20, -100, 30, 0); c.closePath(); }, '#7a5a3e', { shade: '#5a3e28', dx: 10, dy: 0, lw: 4.5 });
    for (const [bx, by, r] of [[-90, -250, 90], [30, -280, 100], [130, -230, 80], [-20, -320, 80]]) P.bush(ctx, bx, by + r * .6, r, { col: '#6a8a3a', seed: bx + 7 });
    ctx.restore(); }
  function water(ctx, x0, y0, x1, y1, t, col = '#5a9ac0') { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, mix(col, '#ffffff', .25)); g.addColorStop(1, mix(col, '#1a3a5a', .3)); ctx.fillStyle = g; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineCap = 'round'; for (let i = 0; i < 40; i++) { const yy = y0 + 8 + ((i * 37) % Math.max(10, (y1 - y0 - 12))), xx = ((i * 157 + t * (18 + i % 4 * 6)) % (x1 - x0 + 200)) + x0 - 100, w = 20 + (i % 5) * 9; ctx.lineWidth = 2 + (yy - y0) / (y1 - y0) * 2; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + w / 2, yy - 4, xx + w, yy); ctx.stroke(); } ctx.restore(); }
  function scroll(ctx, x, y, w, h, k = 1) { const hw = w / 2 * k; ctx.save(); ctx.translate(x, y);
    cel(ctx, c => c.rect(-hw, -h / 2, hw * 2, h), '#efe0bc', { shade: '#cdb88c', light: '#fbf0d8', dx: 0, dy: 8, lw: 4 });
    for (const d of [-1, 1]) cel(ctx, c => c.ellipse(d * hw, 0, 16, h / 2 + 14, 0, 0, 7), '#d8c49a', { shade: '#a88e62', dx: 4, dy: 0, lw: 4 }); ctx.restore(); }
  function ground(ctx, y, col = '#8aa04e', col2 = '#6a8038') { const g = ctx.createLinearGradient(0, y, 0, 760); g.addColorStop(0, col); g.addColorStop(1, col2); ctx.fillStyle = g; ctx.fillRect(-300, y, 1900, 800); }
  function steepHill(ctx, x, y, w, h, col = '#8fa45a', seed = 1) { cel(ctx, c => { c.moveTo(x - w / 2, y); c.quadraticCurveTo(x - w * .42, y - h * .9, x - w * .18, y - h); c.quadraticCurveTo(x, y - h * 1.05, x + w * .2, y - h * .98); c.quadraticCurveTo(x + w * .44, y - h * .85, x + w / 2, y); c.closePath(); }, col, { shade: mix(col, '#2a3a20', .35), light: mix(col, '#f6f0a0', .3), dx: w * .12, dy: 0, lw: 4.5 });
    ctx.save(); ctx.strokeStyle = 'rgba(80,60,40,.35)'; ctx.lineWidth = 2.5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - w * .3 + i * w * .14, y - h * .78 + i * 8); ctx.lineTo(x - w * .34 + i * w * .16, y - h * .4); ctx.stroke(); } ctx.restore();
    for (let i = 0; i < 4; i++) P.bush(ctx, x - w * .36 + i * w * .24 + ((seed * 31 + i * 17) % 20), y - 10 - (i % 2) * 18, 28 + (i % 3) * 8, { col: '#6a8a3a', seed: seed * 10 + i }); }
  // a window with daylight falling into a study
  function study(ctx, t, lampX = 1040) { const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#6a5440'); g.addColorStop(1, '#4a3828'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1500, 1000);
    ctx.strokeStyle = 'rgba(40,26,16,.45)'; ctx.lineWidth = 3; for (let r = 0; r < 9; r++) for (let i = -1; i < 14; i++) { const x = i * 110 + (r % 2) * 55, y = r * 64; ctx.strokeRect(x, y, 110, 64); }
    for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(${i % 2 ? '255,230,190' : '30,20,12'},.06)`; ctx.beginPath(); ctx.ellipse((i * 211) % 1300, (i * 97) % 560, 60, 22, i, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#5a3e28'; ctx.fillRect(-100, 600, 1500, 200); ctx.strokeStyle = 'rgba(30,18,10,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(i * 90 - 40, 600); ctx.lineTo(i * 110 - 200, 760); ctx.stroke(); }
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const lg = ctx.createRadialGradient(lampX, 360, 10, lampX, 360, 520); lg.addColorStop(0, `rgba(255,190,110,${.42 + Math.sin(t * 9) * .03})`); lg.addColorStop(1, 'rgba(255,190,110,0)'); ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H); ctx.restore();
    cel(ctx, c => c.rect(lampX - 10, 380, 20, 220), '#7a5a3a', { shade: '#5a3e28', dx: 4, dy: 0, lw: 3.5 }); cel(ctx, c => c.ellipse(lampX, 376, 34, 12, 0, 0, 7), '#b8884e', { shade: '#86602e', dx: 3, dy: 3, lw: 3.5 });
    ctx.fillStyle = '#ffd890'; ctx.beginPath(); ctx.ellipse(lampX - 22, 356 + Math.sin(t * 11) * 1.5, 7, 14, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff4d0'; ctx.beginPath(); ctx.ellipse(lampX - 22, 360, 3, 7, 0, 0, 7); ctx.fill(); }
  function window(ctx, x, y, t) { cel(ctx, c => c.rect(x, y, 200, 240), '#f6e2b0', { shade: '#e0c48a', dx: 0, dy: 0, lw: 5 }); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + 100, y); ctx.lineTo(x + 100, y + 240); ctx.moveTo(x, y + 120); ctx.lineTo(x + 200, y + 120); ctx.stroke();
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(x, y, x + 200, y + 600); g.addColorStop(0, 'rgba(255,220,150,.35)'); g.addColorStop(1, 'rgba(255,220,150,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y + 240); ctx.lineTo(x + 200, y + 240); ctx.lineTo(x + 420, y + 640); ctx.lineTo(x + 120, y + 640); ctx.closePath(); ctx.fill(); ctx.restore(); }
  const label = (ctx, text, x, y, size, col = '#3a2416') => { ctx.save(); ctx.font = `700 ${size}px "Liberation Serif", serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(text, x, y); ctx.restore(); };
  function sea(ctx, t, x0, x1, y, h) { water(ctx, x0, y, x1, y + h, t, '#3a8ab8'); }


  // ---------- the user's enhanced plates (assets/img/plates/b2, AI mark reversed) ----------
  function plateShot(key, o = {}) { return function plate(ctx, lt, dur, t) { const im = T.IMG[key]; ctx.save();
      // camera push, clamped so the plate always covers the frame (no black edges whatever the focus point)
      const k = ease.inOut(clamp(lt / dur)), z = lerp(o.z0 ?? 1.0, o.z1 ?? 1.06, k), sc = im ? Math.max(W / im.width, H / im.height) * (o.cover ?? 1.1) : 1, iw = im ? im.width * sc : W, ih = im ? im.height * sc : H;
      const fx = clamp(lerp(o.fx ?? 640, o.fx1 ?? o.fx ?? 640, k) + (o.pan || 0) * (k - .5), 640 - iw / 2 + 640 / z, 640 + iw / 2 - 640 / z), fy = clamp(o.fy ?? 360, 360 - ih / 2 + 360 / z, 360 + ih / 2 - 360 / z);
      ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-fx, -fy);
      if (im) ctx.drawImage(im, 640 - iw / 2, 360 - ih / 2, iw, ih);
      if (o.inside) o.inside(ctx, lt, dur, t); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 24; i++) { const x = (i * 157 + Math.sin(t * .4 + i) * 30) % W, y = ((i * 97 - t * (8 + i % 5)) % H + H) % H, a = .25 + .25 * Math.sin(t * 1.7 + i); ctx.fillStyle = `rgba(255,236,190,${a})`; ctx.beginPath(); ctx.arc(x, y, 1.4 + (i % 3), 0, 7); ctx.fill(); } ctx.restore();
      if (o.extra) o.extra(ctx, lt, dur, t); }; }
  // a painted background behind drawn foregrounds: the plate scaled to the frame width and shifted up by dy
  function bgPlate(ctx, key, dy = 0, sc = 1.0) { const im = T.IMG[key]; if (!im) return; const w = W * sc, h = im.height * w / im.width; ctx.drawImage(im, 640 - w / 2, dy, w, h); }
  // ---------- shots ----------
  // 1. forget the marble: the AD 100 marble fades off the hills, leaving grass and the river
  function sMarble(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.05, 1.0, 640, 380);
    P.sky(ctx, 'gold', t, { sun: [1000, 260], y1: 480 }); P.rimClouds(ctx, t, { y: 110 }); P.hills(ctx, 420, '#7a8a6a', '#f6e4b4', .55, 2);
    steepHill(ctx, 230, 560, 520, 180, '#8fa45a', 2); steepHill(ctx, 1060, 560, 560, 200, '#86a052', 5); ground(ctx, 540); water(ctx, -100, 600, 1400, 680, t); ground(ctx, 676, '#7a944a', '#5e7634');
    const k = 1 - ease.inOut(clamp((t - A.marble + .2) / 1.4)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; P.temple(ctx, 230, 384, .5, { roof: '#d8b048' }); P.temple(ctx, 1060, 364, .55, { roof: '#d8b048' }); for (let i = 0; i < 5; i++) P.column(ctx, 520 + i * 60, 560, 34, 170); ctx.restore(); }
    for (let i = 0; i < 6; i++) P.reeds(ctx, 60 + i * 230, 690, .8, t, 6); P.grassFG(ctx, t, -40, 1320, 740, 70, '#4f6a2a'); ctx.restore();
    cap(ctx, 'forget the marble', t, 'marble', { size: 28 }); }
  // 2. picture a river: a painted map; the Tiber draws itself down to the sea
  const RIVER = [[1360, 120], [1180, 170], [1060, 120], [930, 190], [860, 330], [700, 360], [640, 300], [560, 330], [520, 440], [380, 470], [250, 420], [120, 500], [-60, 560]];
  function riverPath(ctx, upto) { const n = Math.max(2, Math.floor(upto * (RIVER.length - 1)) + 1); ctx.beginPath(); ctx.moveTo(...RIVER[0]); for (let i = 1; i < n - 1; i++) { const m = [(RIVER[i][0] + RIVER[i + 1][0]) / 2, (RIVER[i][1] + RIVER[i + 1][1]) / 2]; ctx.quadraticCurveTo(...RIVER[i], ...m); } ctx.lineTo(...RIVER[n - 1]); }
  function sMap(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.08, 600, 360);
    ctx.fillStyle = '#e8dcb8'; ctx.fillRect(-100, -100, 1500, 1000); // parchment land
    const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#a8bc78'); g.addColorStop(1, '#8aa060'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1500, 1000);
    // the sea on the left, with a shoreline
    ctx.save(); ctx.beginPath(); ctx.moveTo(-100, -100); ctx.lineTo(90, -100); ctx.quadraticCurveTo(40, 200, 110, 380); ctx.quadraticCurveTo(160, 560, 60, 820); ctx.lineTo(-100, 820); ctx.closePath(); ctx.clip(); sea(ctx, t, -100, 200, -100, 920); ctx.restore();
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(90, -100); ctx.quadraticCurveTo(40, 200, 110, 380); ctx.quadraticCurveTo(160, 560, 60, 820); ctx.stroke(); ctx.strokeStyle = '#efe2c0'; ctx.lineWidth = 8; ctx.globalAlpha = .6; ctx.stroke(); ctx.globalAlpha = 1;
    // hills (Apennine foothills) and woods as map symbols
    for (let i = 0; i < 26; i++) { const x = 300 + (i * 173) % 1050, y = 60 + (i * 97) % 600; if (Math.abs(y - 330) < 60 && x > 500 && x < 900) continue; ink(ctx, '#8a9a5a', c => { c.moveTo(x - 30, y); c.quadraticCurveTo(x, y - 34, x + 30, y); c.closePath(); }, 3); }
    for (let i = 0; i < 18; i++) { const x = 260 + (i * 211) % 1000, y = 120 + (i * 131) % 520; P.bush(ctx, x, y, 14, { col: '#5a7a34', seed: i }); }
    const k = ease.inOut(clamp((t - A.river + .3) / 3.6)); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; riverPath(ctx, k); ctx.strokeStyle = INK; ctx.lineWidth = 26; ctx.stroke(); ctx.strokeStyle = '#5a9ac8'; ctx.lineWidth = 18; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 3; ctx.setLineDash([10, 18]); ctx.lineDashOffset = -t * 30; ctx.stroke(); ctx.restore();
    // the bend with its island, and the seven hills beside it
    if (k > .55) { const a = clamp((k - .55) / .2); ctx.save(); ctx.globalAlpha = a; cel(ctx, c => c.ellipse(640, 312, 18, 8, -.4, 0, 7), '#c8b47a', { shade: '#9a8650', dx: 2, dy: 2, lw: 3 }); for (const [hx, hy] of [[700, 268], [740, 300], [760, 250], [690, 225], [800, 280], [720, 340], [640, 250]]) ink(ctx, '#b8a060', c => { c.moveTo(hx - 16, hy); c.quadraticCurveTo(hx, hy - 22, hx + 16, hy); c.closePath(); }, 3); ctx.restore(); }
    ctx.restore();
    cap(ctx, 'the Tiber', t, 'tiber', { size: 30, x: 1100, y: 70, align: 'center' }); cap(ctx, '~15 miles (25 km) to the sea', t, 'fifteen', { size: 24, x: 300, y: 640, align: 'center' });
    if (since(t, 'sea') > 0) { ctx.save(); ctx.globalAlpha = k01(t, 'sea', .5); ctx.strokeStyle = 'rgba(40,30,20,.7)'; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(620, 330); ctx.lineTo(130, 520); ctx.stroke(); ctx.restore(); } }
  // 3. the bend, the island, the easiest crossing for miles: villagers wade across by the island
  function sCrossing(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 400);
    P.sky(ctx, 'dawn', t, { sun: [1050, 220], y1: 420 }); P.rimClouds(ctx, t, { y: 100 }); P.hills(ctx, 380, '#7a8a6a', '#efdcae', .55, 1);
    steepHill(ctx, 980, 470, 420, 170, '#86a052', 3); steepHill(ctx, 1240, 470, 360, 210, '#8fa45a', 4); ground(ctx, 440, '#9aae5e', '#7a9448');
    water(ctx, -100, 480, 1400, 640, t);
    // the island, mid-stream
    cel(ctx, c => { c.moveTo(420, 560); c.quadraticCurveTo(470, 520, 620, 522); c.quadraticCurveTo(760, 524, 820, 560); c.quadraticCurveTo(640, 584, 420, 560); c.closePath(); }, '#a8b468', { shade: '#7a8848', dx: 0, dy: 6, lw: 4 }); for (const [bx, r] of [[520, 26], [600, 34], [700, 24]]) P.bush(ctx, bx, 548, r, { col: '#6a8a3a', seed: bx });
    ground(ctx, 640, '#9aae5e', '#6a8038'); for (let i = 0; i < 6; i++) P.reeds(ctx, 40 + i * 250, 650, .7, t, 6);
    // the ford: people and a cow wading across (walking the way they face), water to the knee
    const k = clamp((t - A.easiest + .6) / 6); for (let i = 0; i < 4; i++) { const x = lerp(260, 1060, (k + i * .12) % 1), y = 610 - i % 2 * 30, ss = .2 - (i % 2) * .02;
      person(ctx, x, y, ss, t, VILL[i], { pose: i === 1 ? 'carry' : 'walk', face: 1, prop: i === 1 ? jug : null }); ctx.save(); ctx.fillStyle = 'rgba(90,154,192,.85)'; ctx.beginPath(); ctx.ellipse(x, y - 4, 34, 14, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, y - 12, 26 + Math.sin(t * 3 + i) * 3, 5, 0, 0, 7); ctx.stroke(); ctx.restore(); }
    { const x = lerp(160, 960, k); P.cow(ctx, x, 606, .22, t, { flip: true, walk: true }); }
    P.grassFG(ctx, t, -40, 1320, 740, 70, '#4f6a2a'); ctx.restore();
    cap(ctx, 'a bend in the river · an island', t, 'island', { size: 26 }); cap(ctx, 'the easiest crossing for miles', t, 'cross', { size: 24, y: 686 }); }
  // 4. a cluster of steep hills right next to the crossing
  const HILLS = [['Capitoline', 170, 300, 200], ['Palatine', 470, 380, 230], ['Aventine', 780, 330, 210], ['Caelian', 1060, 300, 180], ['Esquiline', 1300, 340, 160]];
  function sHills(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.06, 1.0, 640, 380);
    P.sky(ctx, 'gold', t, { sun: [640, 220], y1: 460 }); P.rimClouds(ctx, t, { y: 90 }); P.hills(ctx, 420, '#7a8a6a', '#f6e4b4', .55, 4);
    for (let i = 0; i < HILLS.length; i++) { const [, x, w, h] = HILLS[i]; const rise = ease.out(clamp((t - A.cluster + .5 - i * .12) / .8)); steepHill(ctx, x, 600, w, h * (.3 + .7 * rise), ['#8fa45a', '#86a052', '#94a85e', '#8a9e54', '#90a258'][i], i + 1); }
    ground(ctx, 590, '#7a944a', '#5e7634'); water(ctx, -100, 640, 1400, 700, t); ground(ctx, 696, '#7a944a', '#5e7634'); P.grassFG(ctx, t, -40, 1320, 740, 60, '#4f6a2a'); ctx.restore();
    for (let i = 0; i < HILLS.length; i++) { const [n, x, , h] = HILLS[i]; if (since(t, 'hills') > i * .15) P.caption(ctx, n, since(t, 'hills') - i * .15, { size: 20, x: (x - 640) / 1.03 + 640, y: 600 - h - 26, align: 'center' }); } }
  // 5. on top: you can see trouble coming
  function sTop(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 400, 420);
    P.sky(ctx, 'gold', t, { sun: [1100, 260], y1: 520 }); P.rimClouds(ctx, t, { y: 90 }); P.hills(ctx, 520, '#7a8a6a', '#f6e4b4', .55, 6); ground(ctx, 560, '#a0b066', '#8aa050');
    // raiders far off on the plain, spears up
    const rk = clamp((t - A.trouble + .6) / 2); for (let i = 0; i < 6; i++) person(ctx, lerp(1300, 1080, rk) + i * 24, 566 + (i % 2) * 4, .05, t, { kind: 'tunic', cloth: '#5a3a2a', hair: '#1a1410', seed: 30 + i }, { pose: 'walk', face: -1, prop: (c, x, y) => { c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y + 30); c.lineTo(x + 6, y - 90); c.stroke(); } });
    cel(ctx, c => { c.moveTo(-100, 760); c.lineTo(-100, 470); c.quadraticCurveTo(200, 420, 560, 460); c.quadraticCurveTo(700, 520, 760, 760); c.closePath(); }, '#8fa45a', { shade: '#6a7e40', light: '#b0c070', dx: 30, dy: 0, lw: 5 });
    roundHut(ctx, 140, 500, .7, t, 1); person(ctx, 420, 488, .42, t, VILL[0], { pose: 'shade', eyes: since(t, 'trouble') > 0 ? 'wide' : 'open', brow: since(t, 'trouble') > 0 ? 'sad' : '', face: 1 });
    P.grassFG(ctx, t, -40, 760, 760, 60, '#5a7a34'); ctx.restore(); cap(ctx, 'live on top: see trouble coming', t, 'top', { size: 24 }); }
  // 6. at the bottom… you get wet
  function sBottom(ctx, lt, dur, t) { const w = ease.inOut(clamp((t - A.well) / 1.0)), splash = clamp((t - A.wet + .1) / .5);
    ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.04, 640, 420);
    P.sky(ctx, 'storm', t, { y1: 420 }); P.hills(ctx, 400, '#6a7a6a', '#c8ccc0', .5, 2); steepHill(ctx, 1120, 560, 500, 300, '#86a052', 7); ground(ctx, 540, '#8a9a5a', '#6a7a40');
    roundHut(ctx, 480, 600, .9, t, 2); person(ctx, 720, 640, .5, t, VILL[2], { pose: since(t, 'wet') > 0 ? 'shrug' : 'stand', eyes: since(t, 'wet') > 0 ? 'half' : 'open', mouth: since(t, 'wet') > 0 ? 'frown' : 'flat', face: -1 });
    const lvl = 760 - w * 150; ctx.save(); ctx.globalAlpha = .82; water(ctx, -100, lvl, 1400, 800, t, '#6a8ab0'); ctx.restore(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 4; ctx.beginPath(); for (let x = -100; x <= 1400; x += 40) ctx.lineTo(x, lvl + Math.sin(x * .05 + t * 4) * 4); ctx.stroke();
    if (splash > 0 && splash < 1) for (let i = 0; i < 14; i++) { const a = -Math.PI * (i / 13), r = splash * 140; ctx.fillStyle = `rgba(200,225,245,${1 - splash})`; ctx.beginPath(); ctx.arc(720 + Math.cos(a) * r, lvl - 10 + Math.sin(a) * r * .9, 10 - i % 3 * 2, 0, 7); ctx.fill(); }
    for (let i = 0; i < 40; i++) { const x = (i * 97 + t * 60) % 1400 - 60, y = (i * 53 + t * 700) % 760; ctx.strokeStyle = 'rgba(200,215,235,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 22); ctx.stroke(); }
    ctx.restore(); cap(ctx, 'live at the bottom…', t, 'bottom', { size: 24 }); cap(ctx, '…you get wet', t, 'wet', { size: 30, y: 690 }); }
  // 7. the valley between the hills: a swamp that floods (the future Forum)
  function sSwamp(ctx, lt, dur, t, o = {}) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 420);
    P.sky(ctx, o.dusk ? 'dusk' : 'dawn', t, { sun: [640, 300], y1: 460 }); P.rimClouds(ctx, t, { y: 100 }); steepHill(ctx, 150, 560, 520, 280, '#86a052', 2); steepHill(ctx, 1130, 560, 540, 300, '#8fa45a', 3);
    ground(ctx, 520, '#7a8a4a', '#5a6a34'); const lvl = 560 - (o.rise ? ease.inOut(clamp((t - A.floods) / 1.2)) * 40 : 0); ctx.save(); ctx.globalAlpha = .9; water(ctx, 200, lvl, 1080, 700, t, '#6a8a7a'); ctx.restore();
    for (let i = 0; i < 12; i++) P.reeds(ctx, 220 + i * 76, 600 + (i % 3) * 30, .8 + (i % 2) * .2, t, 6); for (let i = 0; i < 6; i++) P.rock(ctx, 260 + i * 150, 690 - (i % 2) * 20, 16, '#8a8a7a');
    // frogs and a cloud of mosquitoes
    for (const [fx, fy] of [[420, 640], [880, 660]]) { cel(ctx, c => c.ellipse(fx, fy, 20, 12, 0, 0, 7), '#6a9a3a', { shade: '#4a7a2a', dx: 3, dy: 3, lw: 3 }); for (const d of [-8, 8]) { ink(ctx, '#fff', c => c.arc(fx + d - 6, fy - 12, 5, 0, 7), 2); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(fx + d - 6, fy - 12, 2, 0, 7); ctx.fill(); } }
    ctx.fillStyle = '#2a2a2a'; for (let i = 0; i < 26; i++) { const x = 640 + Math.sin(t * 3 + i * 1.7) * 120 + Math.cos(t * 1.3 + i) * 40, y = 470 + Math.cos(t * 2.4 + i * 2.1) * 50; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); }
    if (o.people) { for (let i = 0; i < 3; i++) person(ctx, 300 + i * 90, 670, .3, t, VILL[i], { pose: i === 1 ? 'shrug' : 'stand', face: 1, eyes: 'half', mouth: 'frown' }); }
    P.grassFG(ctx, t, -40, 1320, 740, 70, '#4f6a2a'); ctx.restore(); if (o.cap !== false) { cap(ctx, 'the valley: a swamp that floods', t, 'swamp', { size: 26 }); cap(ctx, '(the future Forum)', t, 'floods', { size: 22, y: 686 }); } }
  // 8. the Romans' better story: the storybook opens
  function sStory(ctx, lt, dur, t) { const k = ease.inOut(clamp((t - A.now + .2) / 1.4));
    ctx.fillStyle = '#3a2618'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 9; i++) { ctx.fillStyle = `rgba(90,60,36,${.25 + (i % 2) * .15})`; ctx.fillRect(0, i * 80, W, 40); }
    ctx.save(); ctx.translate(640, 380); ctx.scale(lerp(.9, 1, k), lerp(.9, 1, k)); scroll(ctx, 0, 0, 760, 420, Math.max(.05, k)); ctx.restore();
    if (k > .6) { const a = clamp((k - .6) / .3); ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.fillStyle = '#5a2a1a'; ctx.font = '700 64px "Liberation Serif", serif'; ctx.fillText('The Legend', 640, 330); ctx.font = 'italic 700 28px "Liberation Serif", serif'; ctx.fillText('of Romulus and Remus', 640, 390);
      ctx.strokeStyle = '#8a5a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(440, 430); ctx.lineTo(840, 430); ctx.stroke(); wolf(ctx, 640, 520, .32, t, { lie: true }); ctx.restore(); }
    const g = ctx.createRadialGradient(640, 380, 100, 640, 380, 760); g.addColorStop(0, 'rgba(255,200,120,.12)'); g.addColorStop(1, 'rgba(0,0,0,.35)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    cap(ctx, 'a much better origin story', t, 'origin', { size: 24, y: 660, x: 640, align: 'center' }); }
  // storybook frame for the legend shots: a painted page with a deckled edge
  function page(ctx, draw) { ctx.fillStyle = '#3a2618'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.beginPath(); ctx.rect(40, 30, 1200, 660); ctx.clip(); draw(); ctx.restore(); ctx.strokeStyle = '#efe0bc'; ctx.lineWidth = 10; ctx.strokeRect(40, 30, 1200, 660); ctx.strokeStyle = '#a88e62'; ctx.lineWidth = 3; ctx.strokeRect(52, 42, 1176, 636); }
  // 9. the twins in a basket on the river
  function sTwins(ctx, lt, dur, t) { page(ctx, () => { P.sky(ctx, 'dusk', t, { sun: [1000, 300], y1: 420 }); P.rimClouds(ctx, t, { y: 110, col: '#f0c8a8', shade: '#c08a7a' }); P.hills(ctx, 400, '#6a7a6a', '#e8c0a0', .5, 3);
    ground(ctx, 420, '#7a8a50', '#5a6a38'); for (let i = 0; i < 5; i++) P.cypress(ctx, 100 + i * 260, 440, .6, t); water(ctx, -100, 460, 1400, 760, t, '#4a7aa0');
    const x = lerp(1000, 520, ease.inOut(clamp(lt / dur))), bob = Math.sin(t * 2) * 6; ctx.save(); ctx.translate(x, 590 + bob); ctx.rotate(Math.sin(t * 1.6) * .05); basket(ctx, 0, 0, 1.1, t); ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(x + 30, 606 + bob, 110 + i * 30, 12 + i * 4, 0, 0, Math.PI); ctx.stroke(); }
    for (let i = 0; i < 6; i++) P.reeds(ctx, 60 + i * 240, 720, .9, t, 6); });
    cap(ctx, 'Romulus and Remus', t, 'romulus', { size: 30, x: 80, y: 90 }); cap(ctx, 'thrown into the river', t, 'thrown', { size: 22, x: 80, y: 130 }); }
  // 10. rescued by a she-wolf, raised by a shepherd
  function sWolf(ctx, lt, dur, t) { page(ctx, () => { P.sky(ctx, 'gold', t, { sun: [1050, 240], y1: 460 }); P.rimClouds(ctx, t, { y: 100 }); P.hills(ctx, 440, '#7a8a6a', '#f6e4b4', .5, 2); ground(ctx, 470, '#8a9e54', '#6a8038');
    water(ctx, -100, 470, 1400, 520, t); ground(ctx, 516, '#8a9e54', '#6a8038'); figTree(ctx, 360, 600, .9, t); P.rock(ctx, 120, 640, 50, '#a89a80');
    wolf(ctx, 620, 670, .62, t, { flip: false }); twins(ctx, 610, 700, .75, t); basket(ctx, 860, 700, .7, t);
    const sk = clamp((t - A.shepherd + .8) / 1.4); if (sk > 0) person(ctx, lerp(1340, 1060, ease.out(sk)), 690, .5, t, SHEPHERD, { pose: sk < 1 ? 'walk' : 'hold', face: -1, eyes: 'wide', mouth: 'o', prop: staff });
    P.grassFG(ctx, t, 40, 1240, 700, 60, '#4f6a2a'); });
    cap(ctx, 'rescued by a she-wolf', t, 'wolf', { size: 26, x: 80, y: 90 }); cap(ctx, 'raised by a shepherd', t, 'shepherd', { size: 24, x: 80, y: 130 }); }
  // 11. grown up: they argue about where to build
  function sArgue(ctx, lt, dur, t) { page(ctx, () => { P.sky(ctx, 'gold', t, { sun: [640, 240], y1: 460 }); P.rimClouds(ctx, t, { y: 100 }); steepHill(ctx, 220, 520, 420, 220, '#8fa45a', 1); steepHill(ctx, 1060, 520, 440, 200, '#86a052', 2); ground(ctx, 510, '#9aae5e', '#7a9448');
    const turn = Math.floor((t - A.grow) / 1.3) % 2, argue = since(t, 'argue') > 0;
    person(ctx, 520, 690, .55, t, ROMULUS, { pose: argue && turn === 0 ? 'point' : 'talk', talk: !argue || turn === 0, face: -1, brow: argue ? 'angry' : '', mouth: argue && turn ? 'frown' : undefined });
    person(ctx, 760, 690, .55, t, REMUS, { pose: argue && turn === 1 ? 'point' : 'crossed', talk: argue && turn === 1, face: 1, brow: argue ? 'angry' : '', mouth: argue && !turn ? 'frown' : undefined });
    if (argue) { P.caption(ctx, 'Palatine!', 1, { size: 22, x: 330, y: 250, align: 'center', a: turn === 0 ? 1 : .4 }); P.caption(ctx, 'Aventine!', 1, { size: 22, x: 950, y: 270, align: 'center', a: turn === 1 ? 1 : .4 }); }
    P.grassFG(ctx, t, 40, 1240, 700, 60, '#4f6a2a'); });
    cap(ctx, 'they grow up · decide to build a city', t, 'grow', { size: 24, x: 80, y: 90 }); }
  // 12. Romulus kills his brother: told in silhouette against a red sky
  function sKill(ctx, lt, dur, t) { page(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#5a1a1a'); g.addColorStop(.6, '#c8502e'); g.addColorStop(1, '#f0a050'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#f6d090'; ctx.beginPath(); ctx.arc(640, 470, 130, 0, 7); ctx.fill(); ctx.fillStyle = '#2a1410'; ctx.fillRect(0, 560, W, 200);
    for (let i = 0; i < 9; i++) cel(ctx, c => c.rect(200 + i * 100, 470, 96, 90), '#2a1410', { lw: 0, dx: 0, dy: 0 });
    const f = ease.in(clamp((t - A.killed + .1) / .7)); ctx.save(); ctx.filter = 'brightness(0)'; person(ctx, 520, 570, .5, t, ROMULUS, { pose: 'strike', face: 1, prop: sword });
    ctx.save(); ctx.translate(780, 570); ctx.rotate(f * 1.3); person(ctx, 0, 0, .5, t, REMUS, { pose: 'stand', face: -1 }); ctx.restore(); ctx.restore(); });
    cap(ctx, 'Romulus kills his brother', t, 'killed', { size: 26, x: 80, y: 90 }); }
  // 13. the city gets his name
  function sName(ctx, lt, dur, t) { page(ctx, () => { P.sky(ctx, 'gold', t, { sun: [1000, 220], y1: 460 }); P.rimClouds(ctx, t, { y: 90 }); steepHill(ctx, 640, 620, 900, 240, '#8fa45a', 3);
    for (let i = 0; i < 4; i++) roundHut(ctx, 380 + i * 170, 420 - (i % 2) * 10, .45, t, i); person(ctx, 640, 470, .4, t, ROMULUS, { pose: 'up', eyes: 'happy', mouth: 'grin', face: 1 });
    const k = ease.out(clamp((t - A.name + .5) / .8)); ctx.save(); ctx.globalAlpha = k; ctx.translate(640, 200); ctx.scale(.8 + .2 * k, .8 + .2 * k); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 110px "Liberation Serif", serif'; ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.strokeStyle = '#3a2416'; ctx.strokeText('ROMA', 0, 0); ctx.fillStyle = '#f6d890'; ctx.fillText('ROMA', 0, 0); ctx.restore(); });
    cap(ctx, 'the city gets his name', t, 'name', { size: 24, x: 80, y: 640 }); }
  // 14. a date: 753 BC
  function sDate(ctx, lt, dur, t) { ctx.fillStyle = '#3a2618'; ctx.fillRect(0, 0, W, H); scroll(ctx, 640, 360, 820, 400, 1);
    ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = '#5a2a1a'; ctx.font = 'italic 700 30px "Liberation Serif", serif'; ctx.globalAlpha = k01(t, 'writers', .5); ctx.fillText('Roman writers dated the founding to', 640, 270);
    const k = ease.out(clamp((t - A.seven + .2) / .7)); ctx.globalAlpha = k; ctx.font = '700 150px "Liberation Serif", serif'; ctx.fillStyle = '#8a2a1a'; ctx.fillText('753 BC', 640, 420 + (1 - k) * 20); ctx.restore(); }
  // 15. Varro works it out, centuries later
  function sVarro(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 400);
    study(ctx, t, 1180);
    for (let i = 0; i < 3; i++) { ink(ctx, '#7a5a3e', c => c.rect(860 + i * 0, 140 + i * 110, 360, 16), 3); for (let k = 0; k < 7; k++) cel(ctx, c => c.ellipse(880 + k * 46, 120 + i * 110, 18, 22, 0, 0, 7), '#e8d8b0', { shade: '#b8a07a', dx: 3, dy: 0, lw: 3 }); }
    window(ctx, 200, 90, t);
    person(ctx, 480, 690, .62, t, VARRO, { pose: 'hold', face: 1, prop: stylus, eyes: 'half', brow: 'sad' });
    cel(ctx, c => c.rect(520, 470, 420, 30), '#8a6040', { shade: '#5a3e28', dx: 0, dy: 8, lw: 4 }); ink(ctx, '#6a4a30', c => c.rect(540, 500, 22, 200), 3.5); ink(ctx, '#6a4a30', c => c.rect(900, 500, 22, 200), 3.5);
    ink(ctx, '#efe0bc', c => c.rect(600, 420, 220, 52), 3); ctx.fillStyle = '#5a2a1a'; ctx.font = '700 16px "Liberation Serif", serif'; const kings = ['Romulus 37', 'Numa 43', 'Tullus 32', 'Ancus 24', '…']; for (let i = 0; i < kings.length; i++) if (lt > .4 + i * .4) ctx.fillText(kings[i], 612 + (i % 3) * 70, 440 + Math.floor(i / 3) * 20);
    ctx.restore(); cap(ctx, 'worked out centuries later', t, 'worked', { size: 24 }); cap(ctx, 'by the Roman scholar Varro (1st century BC)', t, 'varro', { size: 22, y: 686 }); }
  // 16. that story is legend
  function sLegend(ctx, lt, dur, t) { sDate(ctx, lt + 10, dur, t); const k = clamp((t - A.legend + .15) / .25);
    if (k > 0) { ctx.save(); ctx.translate(640, 360); ctx.rotate(-.18); ctx.scale(1 + (1 - k) * .8, 1 + (1 - k) * .8); ctx.globalAlpha = k * .9; ctx.strokeStyle = '#b8282a'; ctx.lineWidth = 10; ctx.strokeRect(-250, -70, 500, 140); ctx.fillStyle = '#b8282a'; ctx.font = '700 96px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('LEGEND', 0, 6); ctx.restore(); } }
  // 17. Livy: writing more than 700 years after the founding
  function sLivyLine(ctx, lt, dur, t) { ctx.fillStyle = '#efe4c8'; ctx.fillRect(0, 0, W, H); const k = ease.inOut(clamp((t - A.seven2 + .4) / 1.6));
    ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(140, 470); ctx.lineTo(140 + 1000 * k, 470); ctx.stroke();
    ink(ctx, '#b8282a', c => c.arc(140, 470, 14, 0, 7), 4); label(ctx, '753 BC', 140, 520, 28); label(ctx, 'the founding (legend)', 140, 554, 18);
    if (k > .98) { ink(ctx, '#3a6aa8', c => c.arc(1140, 470, 14, 0, 7), 4); label(ctx, 'c. 27 BC', 1140, 520, 28); label(ctx, 'Livy starts writing', 1140, 554, 18); }
    if (since(t, 'seven2') > 0) { ctx.save(); ctx.globalAlpha = k01(t, 'seven2', .6); label(ctx, '700+ years', 640, 430, 40, '#8a2a1a'); ctx.restore(); }
    person(ctx, 1140, 456, .28, t, LIVY, { pose: 'hold', prop: stylus, face: -1, eyes: since(t, 'unsure') > 0 ? 'side' : 'open', brow: since(t, 'unsure') > 0 ? 'sad' : '' });
    ctx.save(); ctx.textAlign = 'left'; ctx.fillStyle = '#3a2416'; ctx.font = '700 32px "Liberation Serif", serif'; ctx.globalAlpha = k01(t, 'livy', .4); ctx.fillText('the Roman historian Livy', 80, 100); if (since(t, 'unsure') > 0) { ctx.globalAlpha = k01(t, 'unsure', .4); ctx.font = 'italic 700 26px "Liberation Serif", serif'; ctx.fillText('…wasn\'t sure about it either', 80, 146); } ctx.restore(); }
  // 18. Livy: "more poetry than reliable record"
  function sLivy(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 400);
    study(ctx, t, 300); window(ctx, 820, 90, t);
    person(ctx, 420, 700, .62, t, LIVY, { pose: since(t, 'poetry') > 0 ? 'shrug' : 'hold', prop: since(t, 'poetry') > 0 ? null : stylus, face: 1, eyes: since(t, 'poetry') > 0 ? 'half' : 'open', mouth: since(t, 'poetry') > 0 ? 'smile' : 'flat' });
    cel(ctx, c => c.rect(480, 480, 380, 28), '#8a6040', { shade: '#5a3e28', dx: 0, dy: 8, lw: 4 }); ink(ctx, '#6a4a30', c => c.rect(500, 508, 20, 200), 3.5); ink(ctx, '#6a4a30', c => c.rect(820, 508, 20, 200), 3.5); scroll(ctx, 680, 456, 220, 40, 1);
    ctx.restore();
    if (since(t, 'says') > -.2) { const k = k01(t, 'says', .5); ctx.save(); ctx.globalAlpha = k; ink(ctx, 'rgba(250,244,230,.94)', c => c.rect(700, 120, 520, 210), 4); ctx.fillStyle = '#3a2416'; ctx.font = 'italic 700 28px "Liberation Serif", serif'; ctx.fillText('"…more suited to the tales', 730, 180); ctx.fillText(' of poets than to a reliable', 730, 220); ctx.fillText(' record…"', 730, 260); ctx.font = '700 18px "Liberation Serif", serif'; ctx.fillText('— Livy, preface to his History of Rome', 730, 302); ctx.restore(); } }
  // 19. what archaeology actually shows: a trench through the layers
  function sDig(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 420);
    landBehind(ctx, t, 300); ground(ctx, 300, '#8aa64a', '#7a9440');
    const L = ['#8a6a44', '#a07a50', '#6a5034', '#b8905e', '#7a5a3a', '#5a4028']; for (let i = 0; i < L.length; i++) { ctx.fillStyle = L[i]; ctx.beginPath(); ctx.moveTo(-100, 300 + i * 70); for (let x = -100; x <= 1400; x += 100) ctx.lineTo(x, 300 + i * 70 + Math.sin(x * .01 + i) * 8); ctx.lineTo(1400, 1000); ctx.lineTo(-100, 1000); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = INK; ctx.lineWidth = 4; for (let i = 0; i < L.length; i++) { ctx.beginPath(); ctx.moveTo(-100, 300 + i * 70); for (let x = -100; x <= 1400; x += 100) ctx.lineTo(x, 300 + i * 70 + Math.sin(x * .01 + i) * 8); ctx.stroke(); }
    // finds in the layers: pottery sherds, post-holes of a hut, a hearth
    const fi = [[300, 420, 'pot'], [520, 560, 'post'], [600, 560, 'post'], [680, 560, 'post'], [900, 470, 'pot'], [1040, 640, 'hearth']]; fi.forEach(([x, y, k2], i) => { if (lt < .5 + i * .45) return; if (k2 === 'pot') cel(ctx, c => { c.moveTo(x - 20, y); c.quadraticCurveTo(x, y - 24, x + 22, y - 2); c.lineTo(x + 14, y + 8); c.closePath(); }, '#c8784a', { shade: '#8a4a2a', dx: 3, dy: 3, lw: 3 }); else if (k2 === 'post') ink(ctx, '#3a2414', c => c.ellipse(x, y, 14, 30, 0, 0, 7), 3); else { ink(ctx, '#4a3a30', c => c.ellipse(x, y, 50, 14, 0, 0, 7), 3); ctx.fillStyle = '#2a2020'; ctx.beginPath(); ctx.ellipse(x, y, 30, 8, 0, 0, 7); ctx.fill(); } });
    person(ctx, 200, 300, .4, t, CARANDINI, { pose: 'hold', prop: trowel, face: 1, hair: '#5a3a24', glasses: false, cloth: '#c8a878' });
    ctx.restore(); cap(ctx, 'what archaeology actually shows', t, 'archaeology', { size: 26, y: 690 }); cap(ctx, 'less dramatic · more interesting', t, 'dramatic', { size: 22, x: 1220, y: 90, align: 'right' }); }
  // 20. huts on the hills, well before 753
  function sHuts(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 420);
    P.sky(ctx, 'gold', t, { sun: [1050, 230], y1: 440 }); P.rimClouds(ctx, t, { y: 100 }); P.hills(ctx, 400, '#7a8a6a', '#f6e4b4', .5, 2);
    cel(ctx, c => { c.moveTo(-100, 760); c.lineTo(-100, 470); c.quadraticCurveTo(640, 400, 1400, 470); c.lineTo(1400, 760); c.closePath(); }, '#9aae5e', { shade: '#7a9448', light: '#b8c878', dx: 0, dy: 20, lw: 5 });
    for (const [x, y, s] of [[200, 520, .55], [430, 500, .62], [700, 506, .6], [960, 520, .55], [1180, 540, .5]]) roundHut(ctx, x, y, s, t, x);
    person(ctx, 330, 600, .36, t, VILL[1], { pose: 'carry', prop: jug, face: 1, walk: true }); person(ctx, 820, 610, .36, t, VILL[0], { pose: 'talk', talk: true, face: -1 }); person(ctx, 700, 612, .34, t, VILL[3], { pose: 'stand', face: 1, mouth: 'smile' });
    P.goat(ctx, 1040, 640, .5, t); P.goat(ctx, 1110, 650, .45, t, { flip: true }); P.cow(ctx, 520, 650, .3, t, { graze: true });
    P.grassFG(ctx, t, -40, 1320, 760, 60, '#4f6a2a'); ctx.restore(); cap(ctx, 'huts on these hills', t, 'huts', { size: 26 }); cap(ctx, 'well before 753 BC', t, 'before', { size: 22, y: 686 }); }
  // 21. separate little communities on separate hills grow into one
  function sMerge(ctx, lt, dur, t) { sMap2(ctx, t); }
  function sMap2(ctx, t) { ctx.fillStyle = '#e8dcb8'; ctx.fillRect(0, 0, W, H); const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#b0c080'); g.addColorStop(1, '#94a868'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, 120); ctx.quadraticCurveTo(200, 300, 160, 500); ctx.quadraticCurveTo(140, 640, 260, 780); ctx.strokeStyle = INK; ctx.lineWidth = 40; ctx.stroke(); ctx.strokeStyle = '#5a9ac8'; ctx.lineWidth = 32; ctx.stroke(); ctx.restore();
    const V = [[420, 260, 'Capitoline'], [560, 420, 'Palatine'], [820, 300, 'Quirinal'], [880, 470, 'Esquiline'], [640, 600, 'Aventine'], [760, 160, 'Viminal']];
    const m = ease.inOut(clamp((t - A.one + .9) / 1.4)), sep = clamp((t - A.communities + .6) / 1);
    if (m > 0) { ctx.save(); ctx.globalAlpha = m; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 5; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.ellipse(660, 400, 340 - m * 20, 280 - m * 10, 0, 0, 7); ctx.stroke(); ctx.restore(); }
    V.forEach(([x, y, n], i) => { ink(ctx, '#b8a060', c => c.ellipse(x, y + 20, 90, 50, 0, 0, 7), 3); ctx.save(); ctx.globalAlpha = 1 - m * .6; ctx.strokeStyle = '#3a2416'; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.arc(x, y + 6, 70 * sep, 0, 7); ctx.stroke(); ctx.restore(); for (let k = 0; k < 3; k++) roundHut(ctx, x - 30 + k * 30, y + 26 - (k % 2) * 10, .16, t, i * 3 + k); P.caption(ctx, n, 1, { size: 18, x, y: y + 78, align: 'center' }); });
    if (m > .5) P.caption(ctx, 'one Rome', clamp((m - .5) * 2), { size: 34, x: 660, y: 70, align: 'center' });
    P.caption(ctx, 'separate little communities…', clamp((t - A.time) / .5), { size: 24, x: 60, y: 690 }); P.caption(ctx, '…grow into one', k01(t, 'one'), { size: 24, x: 1220, y: 690, align: 'right' }); }
  // 22. historians get into an actual fight
  function sFight(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.04, 640, 400);
    study(ctx, t, 1160); for (let i = 0; i < 6; i++) ink(ctx, '#8a6440', c => c.rect(80 + i * 200, 80, 160, 220), 3); for (let i = 0; i < 6; i++) for (let k = 0; k < 8; k++) ink(ctx, ['#8a3a3a', '#3a5a8a', '#5a7a3a', '#c8a04a'][k % 4], c => c.rect(92 + i * 200 + k * 18, 96 + (k % 2) * 4, 14, 90), 2);
    cel(ctx, c => c.rect(500, 548, 280, 26), '#8a6040', { shade: '#5a3e28', dx: 0, dy: 8, lw: 4 }); for (const lx of [516, 744]) ink(ctx, '#6a4a30', c => c.rect(lx, 574, 18, 120), 3.5); papers(ctx, 600, 546); papers(ctx, 680, 540);
    const turn = Math.floor(t / .9) % 2; person(ctx, 400, 700, .58, t, PROF_A, { pose: turn ? 'point' : 'talk', talk: turn === 1, face: 1, brow: 'angry', prop: turn ? null : papers }); person(ctx, 880, 700, .58, t, PROF_B, { pose: turn ? 'crossed' : 'point', talk: turn === 0, face: -1, brow: 'angry' });
    for (let i = 0; i < 5; i++) { const ph = (t * .6 + i * .2) % 1; ctx.save(); ctx.translate(640 + Math.sin(i * 2) * 200 * ph, 480 - ph * 300); ctx.rotate(ph * 6 + i); papers(ctx, 0, 0); ctx.restore(); }
    ctx.restore(); cap(ctx, 'historians get into an actual fight', t, 'historians', { size: 26 }); }
  // 23. Carandini on the Palatine finds a wall he dates to the 700s BC
  function sWall(ctx, lt, dur, t, o = {}) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 420);
    landBehind(ctx, t, 360); ground(ctx, 352, '#8aa64a', '#7a9440');
    cel(ctx, c => c.rect(180, 400, 920, 300), '#8a6a44', { shade: '#6a5034', dx: 0, dy: 0, lw: 4 }); ctx.fillStyle = '#7a5a3a'; ctx.fillRect(180, 600, 920, 100);
    const rev = clamp((t - A.wall + .8) / 1.4); for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const bx = 240 + i * 92 + (r % 2) * 46, by = 610 - r * 48; if (r * 9 + i > rev * 36) continue; cel(ctx, c => c.rect(bx, by, 88, 44), '#c8b490', { shade: '#9a8662', light: '#e0d0a8', dx: 6, dy: 6, lw: 3.5 }); }
    for (let i = 0; i < 6; i++) P.weeds(ctx, 200 + i * 170, 400, .6, t);
    if (!o.noMan) { person(ctx, 1150, 560, .5, t, CARANDINI, { pose: since(t, 'wall') > 0 ? 'point' : 'hold', prop: since(t, 'wall') > 0 ? null : trowel, face: -1, speak: false, mouth: since(t, 'wall') > 0 ? 'grin' : 'flat', eyes: since(t, 'wall') > 0 ? 'wide' : 'open' }); }
    ctx.restore();
    if (!o.noCap) { cap(ctx, 'archaeologist Andrea Carandini', t, 'carandini', { size: 26 }); cap(ctx, 'the Palatine · a wall he dates to the 700s BC', t, 'wall', { size: 22, y: 686 }); } }
  // 24. his argument: a real king, maybe named Romulus, founded Rome in one ceremony (ploughing the boundary furrow)
  function sCeremony(ctx, lt, dur, t) { sWall(ctx, lt, dur, t, { noCap: true }); const k = ease.out(clamp((t - A.argues + .3) / .7));
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; for (const [bx, by, r] of [[1040, 380, 10], [1000, 330, 16]]) { ink(ctx, '#fbf6ee', c => c.arc(bx, by, r, 0, 7), 3); }
      ctx.save(); ctx.beginPath(); ctx.ellipse(620, 200, 400 * k, 170 * k, 0, 0, 7); ctx.fillStyle = '#fbf6ee'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ctx.clip();
      P.sky(ctx, 'gold', t, { sun: [800, 120], y1: 260 }); ground(ctx, 230, '#9aae5e', '#7a9448'); ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(240, 330); ctx.quadraticCurveTo(500, 250, 820, 290); ctx.stroke();
      const px = lerp(420, 760, (t * .08) % 1); P.cow(ctx, px - 120, 300, .2, t, { flip: true, walk: true, col: '#cfc6b4', plain: true }); P.cow(ctx, px - 60, 296, .2, t, { flip: true, walk: true, col: '#d8d0c0', plain: true }); person(ctx, px - 230, 306, .2, t, ROMULUS, { pose: 'walk', face: 1, wreath: true });
      ctx.restore(); ctx.restore(); }
    cap(ctx, 'he argues: a real king…', t, 'argues', { size: 24, x: 60, y: 640 }); cap(ctx, '…maybe even named Romulus · one founding ceremony', t, 'named', { size: 22, x: 60, y: 686 }); }
  // 25. most historians: that's reading way too much into a wall
  function sDoubt(ctx, lt, dur, t) { sFightBg(ctx, t); const sh = Math.sin(t * 6) * .08;
    person(ctx, 420, 700, .58, t, PROF_A, { pose: 'crossed', face: 1, tilt: sh, eyes: 'half', mouth: 'frown' }); person(ctx, 860, 700, .58, t, PROF_B, { pose: 'shrug', face: -1, tilt: -sh, eyes: 'half', brow: 'sad' });
    cap(ctx, 'most historians: reading way too much into a wall', t, 'most', { size: 24 }); }
  function sFightBg(ctx, t) { study(ctx, t, 1160); for (let i = 0; i < 6; i++) ink(ctx, '#8a6440', c => c.rect(80 + i * 200, 80, 160, 220), 3); for (let i = 0; i < 6; i++) for (let k = 0; k < 8; k++) ink(ctx, ['#8a3a3a', '#3a5a8a', '#5a7a3a', '#c8a04a'][k % 4], c => c.rect(92 + i * 200 + k * 18, 96 + (k % 2) * 4, 14, 90), 2); }
  // 26. a wall is a wall
  function sJustWall(ctx, lt, dur, t) { sWall(ctx, lt + 20, dur, t, { noMan: true, noCap: true }); cap(ctx, 'a wall is a wall', t, 'wallis', { size: 30 }); cap(ctx, 'it doesn\'t prove who built it · or that his name was Romulus', t, 'prove', { size: 22, y: 686 }); }
  // 27. the honest answer: a lot of farmers, a lot of hills, a long time
  function sFarmers(ctx, lt, dur, t) { const day = clamp(lt / dur); ctx.save(); P.camPush(ctx, lt, dur, 1.08, 1.0, 640, 400);
    P.sky(ctx, day < .5 ? 'dawn' : 'gold', t, { sun: [lerp(300, 1100, day), lerp(320, 220, day)], y1: 460 }); P.rimClouds(ctx, t * 6, { y: 100 }); P.hills(ctx, 420, '#7a8a6a', '#f6e4b4', .5, 2);
    for (let i = 0; i < 5; i++) { const x = 140 + i * 260, h = 160 + (i % 2) * 60; steepHill(ctx, x, 600, 300, h, ['#8fa45a', '#86a052', '#94a85e', '#8a9e54', '#90a258'][i], i + 11); for (let k = 0; k < 2; k++) roundHut(ctx, x - 40 + k * 70, 600 - h + 30 + k * 10, .28, t, i * 2 + k); }
    ground(ctx, 590, '#9aae5e', '#7a9448'); for (let i = 0; i < 6; i++) person(ctx, 120 + i * 210, 690 - (i % 2) * 14, .26, t, VILL[i % 5], { pose: i % 3 === 0 ? 'walk' : i % 3 === 1 ? 'carry' : 'stand', face: i % 2 ? -1 : 1, prop: i % 3 === 1 ? jug : null });
    P.goat(ctx, 300, 700, .35, t); P.cow(ctx, 980, 700, .25, t, { graze: true }); P.grassFG(ctx, t, -40, 1320, 760, 60, '#4f6a2a'); ctx.restore();
    cap(ctx, 'who founded Rome? the honest answer:', t, 'honest', { size: 24 }); cap(ctx, 'a lot of farmers · a lot of hills · a long time', t, 'farmers', { size: 24, y: 686 }); }
  // 28. their first big problem: not an enemy — the swamp
  function sProblem(ctx, lt, dur, t) { sSwamp(ctx, lt, dur, t, { people: true, cap: false, dusk: true }); cap(ctx, 'the first big problem: not an enemy', t, 'problem', { size: 26 }); cap(ctx, 'the swamp', t, 'swamp2', { size: 34, y: 680 }); }


  // ---------- shots built on the user's plates ----------
  const pMarble = plateShot('b2marble', { z0: 1.06, z1: 1.0, inside: (ctx, lt, dur, t) => { const k = ease.inOut(clamp((t - A.marble + .2) / 1.4)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; const im = T.IMG.b2hills; if (im) { const sc = Math.max(W / im.width, H / im.height) * 1.1; ctx.drawImage(im, 640 - im.width * sc / 2, 360 - im.height * sc / 2, im.width * sc, im.height * sc); } ctx.restore(); } },
    extra: (ctx, lt, dur, t) => cap(ctx, 'forget the marble', t, 'marble', { size: 28 }) });
  const pMap = plateShot('b2map', { z0: 1.0, z1: 1.1, fx: 560, fy: 380, extra: (ctx, lt, dur, t) => { cap(ctx, 'the Tiber', t, 'tiber', { size: 30, x: 900, y: 80, align: 'center' }); cap(ctx, '~15 miles (25 km) to the sea', t, 'fifteen', { size: 24, x: 70, y: 660 }); } });
  const pCrossing = plateShot('b2crossing', { z0: 1.0, z1: 1.06, fx: 560, fy: 420, extra: (ctx, lt, dur, t) => { cap(ctx, 'a bend in the river · an island', t, 'island', { size: 26 }); cap(ctx, 'the easiest crossing for miles', t, 'cross', { size: 24, y: 686 }); } });
  const HILLNAMES = [['Capitoline', 190, 250], ['Palatine', 470, 340], ['Aventine', 830, 300], ['Caelian', 1110, 300]];
  const pHills = plateShot('b2hills', { z0: 1.0, z1: 1.04, extra: (ctx, lt, dur, t) => { HILLNAMES.forEach(([n, x, y], i) => { if (since(t, 'hills') > i * .2) P.caption(ctx, n, since(t, 'hills') - i * .2, { size: 22, x, y, align: 'center' }); }); cap(ctx, 'a cluster of steep hills, right by the crossing', t, 'cluster', { size: 24, y: 686 }); } });
  const pTop = plateShot('b2top', { z0: 1.0, z1: 1.07, fx: 520, fy: 400, inside: (ctx, lt, dur, t) => { const rk = clamp((t - A.trouble + .6) / 2);
      for (let i = 0; i < 6; i++) person(ctx, lerp(1240, 1080, rk) + i * 20, 560 + (i % 2) * 4, .045, t, { kind: 'tunic', cloth: '#5a3a2a', hair: '#1a1410', seed: 30 + i }, { pose: 'walk', face: -1, prop: (c, x, y) => { c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y + 30); c.lineTo(x + 6, y - 90); c.stroke(); } }); },
    extra: (ctx, lt, dur, t) => { cap(ctx, 'live on top: see trouble coming', t, 'top', { size: 24 }); if (since(t, 'trouble') > 0) { ctx.save(); ctx.globalAlpha = k01(t, 'trouble', .4); ctx.strokeStyle = 'rgba(255,240,210,.9)'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.ellipse(1150, 545, 110, 34, 0, 0, 7); ctx.stroke(); ctx.restore(); } } });
  const pBottom = plateShot('b2bottom', { z0: 1.0, z1: 1.05, fx: 600, fy: 420, inside: (ctx, lt, dur, t) => { const w = ease.inOut(clamp((t - A.well) / 1.0)), splash = clamp((t - A.wet + .1) / .5), lvl = 760 - w * 120;
      ctx.save(); ctx.globalAlpha = .55; water(ctx, -100, lvl, 1400, 800, t, '#5a7a98'); ctx.restore(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = -100; x <= 1400; x += 40) ctx.lineTo(x, lvl + Math.sin(x * .05 + t * 4) * 4); ctx.stroke();
      if (splash > 0 && splash < 1) for (let i = 0; i < 14; i++) { const a = -Math.PI * (i / 13), r = splash * 130; ctx.fillStyle = `rgba(210,230,245,${1 - splash})`; ctx.beginPath(); ctx.arc(720 + Math.cos(a) * r, 600 + Math.sin(a) * r * .9, 10 - i % 3 * 2, 0, 7); ctx.fill(); } },
    extra: (ctx, lt, dur, t) => { cap(ctx, 'live at the bottom…', t, 'bottom', { size: 24 }); cap(ctx, '…you get wet', t, 'wet', { size: 30, y: 690 }); } });
  const pSwamp = plateShot('b2swamp', { z0: 1.0, z1: 1.06, extra: (ctx, lt, dur, t) => { cap(ctx, 'the valley: a swamp that floods', t, 'swamp', { size: 26 }); cap(ctx, '(the future Forum)', t, 'floods', { size: 22, y: 686 }); } });
  const pLegend = plateShot('b2legend', { z0: 1.08, z1: 1.0, extra: (ctx, lt, dur, t) => cap(ctx, 'a much better origin story', t, 'origin', { size: 24, y: 690, x: 640, align: 'center' }) });
  const pTwins = plateShot('b2twins', { z0: 1.0, z1: 1.06, extra: (ctx, lt, dur, t) => { cap(ctx, 'Romulus and Remus', t, 'romulus', { size: 30, x: 80, y: 90 }); cap(ctx, 'thrown into the river', t, 'thrown', { size: 22, x: 80, y: 130 }); } });
  const pWolf = plateShot('b2wolf', { z0: 1.0, z1: 1.06, extra: (ctx, lt, dur, t) => { cap(ctx, 'rescued by a she-wolf', t, 'wolf', { size: 26, x: 80, y: 90 }); cap(ctx, 'raised by a shepherd', t, 'shepherd', { size: 24, x: 80, y: 130 }); } });
  const pArgue = plateShot('b2argue', { z0: 1.0, z1: 1.06, extra: (ctx, lt, dur, t) => { cap(ctx, 'they grow up · decide to build a city', t, 'grow', { size: 24, x: 80, y: 90 }); if (since(t, 'argue') > 0) { const turn = Math.floor((t - A.argue) / 1.1) % 2; P.caption(ctx, 'Palatine!', 1, { size: 24, x: 300, y: 300, align: 'center', a: turn === 0 ? 1 : .45 }); P.caption(ctx, 'Aventine!', 1, { size: 24, x: 980, y: 300, align: 'center', a: turn === 1 ? 1 : .45 }); } } });
  const pKill = plateShot('b2kill', { z0: 1.0, z1: 1.05, extra: (ctx, lt, dur, t) => cap(ctx, 'Romulus kills his brother', t, 'killed', { size: 26, x: 80, y: 90 }) });
  const pRoma = plateShot('b2roma', { z0: 1.04, z1: 1.0, fx: 640, fy: 300, extra: (ctx, lt, dur, t) => { const k = ease.out(clamp((t - A.name + .5) / .8)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.translate(640, 168); ctx.scale(.8 + .2 * k, .8 + .2 * k); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 120px "Liberation Serif", serif'; ctx.lineJoin = 'round';
      ctx.lineWidth = 16; ctx.strokeStyle = '#4a2a16'; ctx.strokeText('ROMA', 0, 0); const g = ctx.createLinearGradient(0, -50, 0, 50); g.addColorStop(0, '#fbe2a0'); g.addColorStop(.55, '#e8a850'); g.addColorStop(1, '#b8702e'); ctx.fillStyle = g; ctx.fillText('ROMA', 0, 0); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,248,220,.7)'; ctx.strokeText('ROMA', 0, -2); ctx.restore(); }
      cap(ctx, 'the city gets his name', t, 'name', { size: 24, x: 80, y: 650 }); } });
  const pDate = plateShot('b2date', { z0: 1.0, z1: 1.04 });
  const pLegendStamp = plateShot('b2date', { z0: 1.04, z1: 1.06, extra: (ctx, lt, dur, t) => { const k = clamp((t - A.legend + .15) / .25); if (k > 0) { ctx.save(); ctx.translate(640, 380); ctx.rotate(-.16); ctx.scale(1 + (1 - k) * .8, 1 + (1 - k) * .8); ctx.globalAlpha = k * .92; ctx.strokeStyle = '#b8282a'; ctx.lineWidth = 12; ctx.strokeRect(-270, -76, 540, 152); ctx.fillStyle = '#b8282a'; ctx.font = '700 104px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('LEGEND', 0, 8); ctx.restore(); } } });
  // drawn foregrounds over the painted plates
  const pHuts = plateShot('b2hills', { z0: 1.0, z1: 1.05, inside: (ctx, lt, dur, t) => { cel(ctx, c => { c.moveTo(-100, 760); c.lineTo(-100, 560); c.quadraticCurveTo(640, 500, 1400, 560); c.lineTo(1400, 760); c.closePath(); }, '#8aa64e', { shade: '#6a8a3a', light: '#a8c060', dx: 0, dy: 16, lw: 4 });
      for (const [x, y, s2] of [[180, 600, .5], [420, 580, .56], [700, 584, .54], [960, 596, .5], [1170, 612, .46]]) roundHut(ctx, x, y, s2, t, x);
      person(ctx, 320, 676, .32, t, VILL[1], { pose: 'carry', prop: jug, face: 1, walk: true }); person(ctx, 830, 684, .32, t, VILL[0], { pose: 'talk', talk: true, face: -1 }); person(ctx, 720, 686, .3, t, VILL[3], { pose: 'stand', face: 1, mouth: 'smile' });
      P.goat(ctx, 1040, 700, .45, t); P.goat(ctx, 1110, 708, .4, t, { flip: true }); P.cow(ctx, 540, 704, .26, t, { graze: true }); P.grassFG(ctx, t, -40, 1320, 760, 50, '#4f6a2a'); },
    extra: (ctx, lt, dur, t) => { cap(ctx, 'huts on these hills', t, 'huts', { size: 26 }); cap(ctx, 'well before 753 BC', t, 'before', { size: 22, y: 690 }); } });
  const pMerge = plateShot('b2map', { cover: 1.1, z0: 1.04, z1: 1.04, inside: (ctx, lt, dur, t) => { ctx.fillStyle = 'rgba(240,230,200,.35)'; ctx.fillRect(0, 0, W, H);
      const V = [[640, 330, 'Capitoline'], [760, 420, 'Palatine'], [900, 330, 'Quirinal'], [960, 460, 'Esquiline'], [800, 530, 'Aventine'], [820, 250, 'Viminal']];
      const m = ease.inOut(clamp((t - A.one + .9) / 1.4)), sep = clamp((t - A.communities + .6) / 1);
      if (m > 0) { ctx.save(); ctx.globalAlpha = m; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 6; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.ellipse(800, 395, 250 - m * 10, 210 - m * 6, 0, 0, 7); ctx.stroke(); ctx.restore(); }
      V.forEach(([x, y, n], i) => { ctx.save(); ctx.globalAlpha = 1 - m * .6; ctx.strokeStyle = '#3a2416'; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.arc(x, y, 54 * sep, 0, 7); ctx.stroke(); ctx.restore(); for (let k = 0; k < 3; k++) roundHut(ctx, x - 24 + k * 24, y + 14 - (k % 2) * 8, .12, t, i * 3 + k); P.caption(ctx, n, 1, { size: 17, x, y: y + 52, align: 'center' }); }); },
    extra: (ctx, lt, dur, t) => { const m = ease.inOut(clamp((t - A.one + .9) / 1.4)); if (m > .5) P.caption(ctx, 'one Rome', clamp((m - .5) * 2), { size: 34, x: 800, y: 110, align: 'center' }); P.caption(ctx, 'separate little communities…', clamp((t - A.time) / .5), { size: 24, x: 60, y: 690 }); P.caption(ctx, '…grow into one', k01(t, 'one'), { size: 24, x: 1220, y: 690, align: 'right' }); } });
  const pFarmers = plateShot('b2hills', { z0: 1.08, z1: 1.0, inside: (ctx, lt, dur, t) => { for (const [x, y, s2] of [[150, 352, .2], [210, 360, .18], [520, 410, .2], [880, 420, .22], [940, 428, .2], [1150, 380, .18]]) roundHut(ctx, x, y, s2, t, x);
      for (let i = 0; i < 6; i++) person(ctx, 140 + i * 200, 650 - (i % 2) * 12, .22, t, VILL[i % 5], { pose: i % 3 === 0 ? 'walk' : i % 3 === 1 ? 'carry' : 'stand', face: i % 2 ? -1 : 1, prop: i % 3 === 1 ? jug : null });
      P.goat(ctx, 300, 664, .3, t); P.cow(ctx, 990, 668, .22, t, { graze: true }); },
    extra: (ctx, lt, dur, t) => { cap(ctx, 'who founded Rome? the honest answer:', t, 'honest', { size: 24 }); cap(ctx, 'a lot of farmers · a lot of hills · a long time', t, 'farmers', { size: 24, y: 690 }); } });
  const pProblem = plateShot('b2swamp', { z0: 1.0, z1: 1.06, inside: (ctx, lt, dur, t) => { for (let i = 0; i < 3; i++) person(ctx, 360 + i * 90, 720, .3, t, VILL[i], { pose: i === 1 ? 'shrug' : 'stand', face: 1, eyes: 'half', mouth: 'frown' }); },
    extra: (ctx, lt, dur, t) => { cap(ctx, 'the first big problem: not an enemy', t, 'problem', { size: 26 }); cap(ctx, 'the swamp', t, 'swamp2', { size: 34, y: 680 }); } });

  // ================= cinematic drawn shots (G.Cine), after the user's reference paintings =================
  const L = C.layer, SUNG = [760, 330];
  function goldenLand(ctx, c, t, o = {}) { const sun = o.sun || SUNG, hz = o.horizon ?? 400, pal = o.pal || 'golden', hazeC = C.PAL[pal].haze;
    L(ctx, c, .04, () => C.sky(ctx, pal, t, { horizon: hz, sun, sunR: o.sunR ?? 48, seed: o.seed ?? 4, clouds: o.clouds ?? 6 }));
    L(ctx, c, .15, () => C.mounds(ctx, { y: hz + 10, n: 5, seed: (o.seed ?? 4) + 1, col: '#7e9a5a', far: .32, sunX: sun[0], t, w: 620, h: 110, copses: 2, haze: hazeC }));
    L(ctx, c, .3, () => C.mounds(ctx, { y: hz + 80, n: 4, seed: (o.seed ?? 4) + 2, col: '#6e9440', far: .1, sunX: sun[0], t, w: 560, h: 160, copses: 2, haze: hazeC })); }
  // 1. forget the marble: a river valley with marble temples on two hills; the marble fades away
  function cMarble(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08, y: -10 }, { z: 1.0 }), k = 1 - ease.inOut(clamp((t - A.marble + .2) / 1.4));
    goldenLand(ctx, c, t, { sun: [640, 300], seed: 12 });
    L(ctx, c, .6, () => { C.mound(ctx, 230, 560, 640, 230, { col: '#6e9440', sunX: 640, t, copses: 1, seed: 3 }); C.mound(ctx, 1060, 560, 660, 250, { col: '#6e9440', sunX: 640, t, copses: 1, seed: 4 });
      if (k > 0) { ctx.save(); ctx.globalAlpha = k; P.temple(ctx, 230, 360, .52, { roof: '#e0c070' }); P.temple(ctx, 1060, 340, .56, { roof: '#e0c070' }); for (let i = 0; i < 5; i++) P.column(ctx, 520 + i * 60, 572, 34, 180); ctx.restore(); }
      C.water(ctx, -300, 572, 1600, 650, t, { sunX: 640 }); });
    L(ctx, c, 1, () => C.meadow(ctx, 646, 760, t, { col: '#7a9a36', n: 360 })); L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true }));
    C.rays(ctx, 640, 300, t, .1); C.motes(ctx, t); C.finish(ctx, t, 'golden', { leakX: 640 }); cap(ctx, 'forget the marble', t, 'marble', { size: 28 }); }
  // 2. picture a river: a hand-painted map; the camera glides along the Tiber as it draws itself to the sea
  function mapBase(ctx, t, o = {}) { const R = C.rng(21); const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#9cc46a'); g.addColorStop(1, '#7eaa52'); ctx.fillStyle = g; ctx.fillRect(-400, -400, 2100, 1500);
    for (let i = 0; i < 60; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,250,190,.12)' : 'rgba(40,70,20,.08)'; ctx.beginPath(); ctx.ellipse(-200 + R() * 1700, -200 + R() * 1100, 80 + R() * 160, 40 + R() * 70, R() * 3, 0, 7); ctx.fill(); }
    // the sea, with a sandy shore and little boats
    ctx.save(); ctx.beginPath(); ctx.moveTo(-400, -400); ctx.lineTo(70, -400); ctx.quadraticCurveTo(20, 200, 90, 380); ctx.quadraticCurveTo(140, 560, 40, 1100); ctx.lineTo(-400, 1100); ctx.closePath(); ctx.clip(); const sg = ctx.createLinearGradient(-400, 0, 120, 0); sg.addColorStop(0, '#2a78b8'); sg.addColorStop(1, '#5ab0d8'); ctx.fillStyle = sg; ctx.fillRect(-400, -400, 600, 1500);
    ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2.5; for (let i = 0; i < 30; i++) { const x = -380 + R() * 420, y = -380 + ((R() * 1400 + t * 12) % 1400); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 10, y - 4, x + 22, y); ctx.stroke(); } ctx.restore();
    ctx.strokeStyle = '#e8d8a0'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(70, -400); ctx.quadraticCurveTo(20, 200, 90, 380); ctx.quadraticCurveTo(140, 560, 40, 1100); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
    for (const [bx, by] of [[-20, 200], [20, 520], [-60, 760]]) { ink(ctx, '#8a5a34', c2 => { c2.moveTo(bx - 16, by); c2.lineTo(bx + 16, by); c2.lineTo(bx + 10, by + 8); c2.lineTo(bx - 10, by + 8); c2.closePath(); }, 2); ink(ctx, '#f6f0e0', c2 => { c2.moveTo(bx, by - 26); c2.lineTo(bx + 14, by - 2); c2.lineTo(bx, by - 2); c2.closePath(); }, 2); }
    // mountains, forests and villages as map symbols (painted, inked)
    for (let i = 0; i < 16; i++) { const x = 360 + R() * 1050, y = -120 + R() * 900; if (y > 220 && y < 470 && x > 480 && x < 980) continue; cel(ctx, c2 => { c2.moveTo(x - 46, y); c2.lineTo(x - 8, y - 56); c2.lineTo(x + 8, y - 40); c2.lineTo(x + 22, y - 62); c2.lineTo(x + 56, y); c2.closePath(); }, '#c8a070', { shade: '#9a7048', light: '#e8c890', dx: 12, dy: 0, lw: 3 }); }
    for (let i = 0; i < 14; i++) { const x = 300 + R() * 1150, y = -150 + R() * 950; if (y > 230 && y < 460 && x > 480 && x < 980) continue; for (let k = 0; k < 9; k++) C.tree(ctx, x + (k % 3) * 26 - 26, y + Math.floor(k / 3) * 18, .22, t, { kind: k % 4 === 0 ? 'cypress' : 'oak', seed: i * 9 + k, low: true }); } }
  const RIV = [[1500, 60], [1300, 120], [1120, 90], [980, 170], [860, 300], [720, 340], [640, 300], [560, 330], [500, 430], [360, 470], [230, 410], [120, 470], [40, 520]];
  function riverDraw(ctx, k, t) { const n = Math.max(2, Math.floor(k * (RIV.length - 1)) + 1); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...RIV[0]); for (let i = 1; i < n - 1; i++) ctx.quadraticCurveTo(...RIV[i], (RIV[i][0] + RIV[i + 1][0]) / 2, (RIV[i][1] + RIV[i + 1][1]) / 2); ctx.lineTo(...RIV[n - 1]);
    ctx.strokeStyle = INK; ctx.lineWidth = 34; ctx.stroke(); ctx.strokeStyle = '#4a98d0'; ctx.lineWidth = 26; ctx.stroke(); ctx.strokeStyle = '#8ad0f0'; ctx.lineWidth = 8; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2.5; ctx.setLineDash([10, 22]); ctx.lineDashOffset = -t * 40; ctx.stroke(); ctx.restore(); }
  function hillVillage(ctx, x, y, s, t, seed) { cel(ctx, c2 => c2.ellipse(x, y, 60 * s, 30 * s, 0, 0, 7), '#b8a868', { shade: '#8a7a48', light: '#d8c888', dx: 8, dy: 6, lw: 3 }); for (let k = 0; k < 3; k++) roundHut(ctx, x - 24 * s + k * 24 * s, y - 2 * s - (k % 2) * 6 * s, .14 * s, t, seed * 3 + k); }
  function cMap(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: 260, y: -40, z: 1.25 }, { x: -120, y: 60, z: 1.12 }), k = ease.inOut(clamp((t - A.river + .3) / 4));
    L(ctx, c, 1, () => { mapBase(ctx, t); riverDraw(ctx, k, t); if (k > .6) { const a = clamp((k - .6) / .25); ctx.save(); ctx.globalAlpha = a; cel(ctx, c2 => c2.ellipse(640, 312, 20, 9, -.4, 0, 7), '#d8c890', { shade: '#a89a60', dx: 2, dy: 2, lw: 3 }); for (const [hx, hy] of [[700, 250], [760, 290], [790, 236], [700, 200], [830, 270], [740, 360], [650, 236]]) hillVillage(ctx, hx, hy, .5, t, hx); ctx.restore(); } });
    C.finish(ctx, t, 'dawn', { leak: false, vig: .4 });
    cap(ctx, 'the Tiber', t, 'tiber', { size: 30, x: 1000, y: 90, align: 'center' }); cap(ctx, '~15 miles (25 km) to the sea', t, 'fifteen', { size: 24, x: 70, y: 660 }); }
  // 3. the bend, the island and the easiest crossing: a raft poled across, a cow led through the shallows
  function raft(ctx, x, y, t) { const bob = Math.sin(t * 2) * 3; ctx.save(); ctx.translate(x, y + bob);
    for (let i = 0; i < 7; i++) cel(ctx, c2 => c2.rect(-150, -18 + i * 0, 300, 18), '#9a7048', { shade: '#6a4a2c', dx: 0, dy: 6, lw: 3 }); ctx.strokeStyle = 'rgba(50,30,16,.6)'; ctx.lineWidth = 2; for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(i * 24, -18); ctx.lineTo(i * 24, 0); ctx.stroke(); }
    for (const bx of [-40, 20]) { cel(ctx, c2 => c2.rect(bx - 26, -60, 52, 42), '#b88a50', { shade: '#86602e', dx: 6, dy: 0, lw: 3 }); for (let k = 0; k < 5; k++) cel(ctx, c2 => c2.arc(bx - 18 + k * 9, -64 - (k % 2) * 5, 9, 0, 7), '#6a9a3a', { shade: '#4a7a2a', dx: 2, dy: 2, lw: 2 }); }
    ctx.restore(); }
  function cCrossing(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: -60, z: 1.04 }, { x: 60, z: 1.1 });
    L(ctx, c, .04, () => C.sky(ctx, 'dawn', t, { horizon: 380, sun: [980, 250], sunR: 40, seed: 31 }));
    L(ctx, c, .15, () => C.mounds(ctx, { y: 390, n: 5, seed: 32, col: '#8a9a78', far: .6, sunX: 980, t, w: 620, h: 120, copses: 2, haze: '#e8ecdc' }));
    L(ctx, c, .3, () => { C.mounds(ctx, { y: 440, n: 4, seed: 33, col: '#7e9a50', far: .35, sunX: 980, t, w: 560, h: 150, copses: 3, haze: '#e8ecdc' }); C.haze(ctx, 430, 40, '#f4f0e4', .25); });
    L(ctx, c, .7, () => { C.water(ctx, -400, 450, 1700, 700, t, { pal: 'dawn', sunX: 980 }); cel(ctx, c2 => { c2.moveTo(420, 520); c2.quadraticCurveTo(470, 488, 620, 490); c2.quadraticCurveTo(760, 492, 820, 520); c2.quadraticCurveTo(640, 540, 420, 520); c2.closePath(); }, '#9aac5a', { shade: '#6a7c3a', dx: 0, dy: 6, lw: 3 }); C.copse(ctx, 620, 506, .3, t, { n: 6, seed: 4 }); });
    const k = clamp((t - A.right) / 7);
    L(ctx, c, 1, () => { raft(ctx, lerp(380, 860, k), 650, t); person(ctx, lerp(380, 860, k) - 100, 632, .3, t, VILL[0], { pose: 'hold', face: 1, prop: (cc, x, y) => { cc.strokeStyle = INK; cc.lineWidth = 5; cc.beginPath(); cc.moveTo(x - 30, y + 140); cc.lineTo(x + 40, y - 120); cc.stroke(); } }); person(ctx, lerp(380, 860, k) + 110, 632, .28, t, VILL[1], { pose: 'stand', face: 1, mouth: 'smile' });
      const cx = lerp(120, 640, k); P.cow(ctx, cx, 690, .3, t, { flip: true, walk: true, seed: 3 }); person(ctx, cx + 70, 690, .3, t, VILL[2], { pose: 'walk', face: 1 }); ctx.fillStyle = 'rgba(90,140,180,.7)'; ctx.beginPath(); ctx.ellipse(cx + 40, 680, 160, 18, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(cx + 40, 674, 150 + Math.sin(t * 3) * 6, 10, 0, 0, 7); ctx.stroke(); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true, flowers: 10 })); C.motes(ctx, t, 20); C.finish(ctx, t, 'dawn', { leakX: 980 });
    cap(ctx, 'a bend in the river · an island', t, 'island', { size: 26 }); cap(ctx, 'the easiest crossing for miles', t, 'cross', { size: 24, y: 686 }); }
  // 4. a cluster of steep hills right by the crossing: crane up over the river as the hills are named
  function cHills(ctx, lt, dur, t) { const c = C.cam(lt, dur, { y: 80, z: 1.12 }, { y: -10, z: 1.0 });
    goldenLand(ctx, c, t, { sun: [700, 300], seed: 41 });
    L(ctx, c, .55, () => { [[170, 560, 420, 240], [470, 590, 440, 290], [800, 570, 460, 260], [1100, 580, 420, 230]].forEach(([x, y, w2, h2], i) => C.mound(ctx, x, y, w2, h2, { col: '#6e9440', sunX: 700, t, copses: 2, seed: 50 + i })); });
    L(ctx, c, .8, () => { C.water(ctx, -400, 600, 1700, 670, t, { sunX: 700 }); C.copse(ctx, 100, 610, .4, t, { n: 7 }); C.copse(ctx, 1100, 614, .36, t, { n: 6 }); });
    L(ctx, c, 1, () => C.meadow(ctx, 664, 780, t, { col: '#7a9a36', n: 300 })); L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true }));
    C.rays(ctx, 700, 300, t, .1); C.motes(ctx, t); C.finish(ctx, t, 'golden', { leakX: 700 });
    [['Capitoline', 170, 300], ['Palatine', 470, 280], ['Aventine', 800, 290], ['Caelian', 1110, 330]].forEach(([n, x, y], i) => { if (since(t, 'hills') > i * .2) P.caption(ctx, n, since(t, 'hills') - i * .2, { size: 22, x, y, align: 'center' }); });
    cap(ctx, 'a cluster of steep hills, right by the crossing', t, 'cluster', { size: 24, y: 690 }); }
  // 5. on top you can see trouble coming: lookout by his hut, the valley and its river far below; raiders on the plain
  function cTop(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: -40, z: 1.0 }, { x: 50, z: 1.12 }), rk = clamp((t - A.trouble + .6) / 2);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 430, sun: [1060, 300], sunR: 44, seed: 51 }));
    L(ctx, c, .15, () => C.mounds(ctx, { y: 440, n: 6, seed: 52, col: '#8aa070', far: .55, sunX: 1060, t, w: 520, h: 90, copses: 2 }));
    L(ctx, c, .3, () => { C.mounds(ctx, { y: 500, n: 5, seed: 53, col: '#7e9c48', far: .3, sunX: 1060, t, w: 480, h: 110, copses: 3 }); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#8ac0e0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(700, 560); ctx.quadraticCurveTo(900, 520, 820, 480); ctx.quadraticCurveTo(760, 450, 980, 440); ctx.stroke(); ctx.restore();
      for (let i = 0; i < 7; i++) person(ctx, lerp(1300, 1090, rk) + i * 18, 530 + (i % 2) * 3, .04, t, { kind: 'tunic', cloth: '#4a2a1a', hair: '#1a1410', seed: 30 + i }, { pose: 'walk', face: -1, prop: (cc, x, y) => { cc.strokeStyle = INK; cc.lineWidth = 5; cc.beginPath(); cc.moveTo(x, y + 30); cc.lineTo(x + 6, y - 100); cc.stroke(); } }); });
    L(ctx, c, .85, () => { C.mound(ctx, 260, 820, 1300, 360, { col: '#7a9a3a', sunX: 1060, t, copses: 0, seed: 54 }); C.meadow(ctx, 600, 900, t, { col: '#86a43e', n: 200, flowers: 60 }); ctx.save(); ctx.fillStyle = '#b8945e'; ctx.beginPath(); ctx.moveTo(-100, 760); ctx.quadraticCurveTo(200, 640, 340, 600); ctx.lineTo(380, 606); ctx.quadraticCurveTo(260, 660, 60, 780); ctx.closePath(); ctx.fill(); ctx.restore();
      roundHut(ctx, 240, 600, .8, t, 1); person(ctx, 560, 600, .5, t, VILL[0], { pose: 'shade', face: 1, eyes: since(t, 'trouble') > 0 ? 'wide' : 'open', brow: since(t, 'trouble') > 0 ? 'sad' : '' }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 18 })); C.rays(ctx, 1060, 300, t, .08); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'live on top: see trouble coming', t, 'top', { size: 24 }); }
  // 6. at the bottom… you get wet: storm, rain, the hut's fire glowing in the doorway, water rising
  function cBottom(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08, y: 10 }), w = ease.inOut(clamp((t - A.well) / 1.0)), splash = clamp((t - A.wet + .1) / .5);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 420, seed: 61, clouds: 8 }));
    L(ctx, c, .2, () => { C.mounds(ctx, { y: 430, n: 5, seed: 62, col: '#5a6a5a', far: .55, sunX: 640, t, w: 600, h: 100, copses: 2, haze: '#8a94a0' }); C.haze(ctx, 430, 70, '#9aa4ae', .6); });
    L(ctx, c, .5, () => C.mound(ctx, 1120, 560, 640, 300, { col: '#4e6a3a', sunX: 300, t, copses: 3, seed: 63, haze: '#8a94a0' }));
    L(ctx, c, 1, () => { C.meadow(ctx, 540, 760, t, { col: '#5a7038', n: 260, flowers: 0, haze: '#8a94a0' }); roundHut(ctx, 470, 610, 1.0, t, 2); ctx.save(); ctx.globalCompositeOperation = 'screen'; const fg = ctx.createRadialGradient(470, 580, 4, 470, 580, 90); fg.addColorStop(0, `rgba(255,170,70,${.7 + Math.sin(t * 13) * .1})`); fg.addColorStop(1, 'rgba(255,170,70,0)'); ctx.fillStyle = fg; ctx.fillRect(370, 480, 200, 200); ctx.restore();
      person(ctx, 720, 650, .55, t, VILL[2], { pose: since(t, 'wet') > 0 ? 'shrug' : 'hold', prop: since(t, 'wet') > 0 ? null : staff, eyes: since(t, 'wet') > 0 ? 'half' : 'open', mouth: since(t, 'wet') > 0 ? 'frown' : 'flat', face: -1 });
      const lvl = 780 - w * 130; ctx.save(); ctx.globalAlpha = .8; C.water(ctx, -400, lvl, 1700, 900, t, { pal: 'storm', glint: false }); ctx.restore();
      if (splash > 0 && splash < 1) for (let i = 0; i < 16; i++) { const a = -Math.PI * (i / 15), r = splash * 150; ctx.fillStyle = `rgba(210,230,245,${1 - splash})`; ctx.beginPath(); ctx.arc(720 + Math.cos(a) * r, lvl - 6 + Math.sin(a) * r * .9, 11 - i % 3 * 2, 0, 7); ctx.fill(); } });
    ctx.save(); ctx.strokeStyle = 'rgba(210,222,236,.55)'; ctx.lineWidth = 2; for (let i = 0; i < 110; i++) { const x = (i * 97 + t * 90) % 1500 - 100, y = (i * 53 + t * 900) % 800 - 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 26); ctx.stroke(); } ctx.restore();
    C.finish(ctx, t, 'storm', { leak: false, vig: .5 }); cap(ctx, 'live at the bottom…', t, 'bottom', { size: 24 }); cap(ctx, '…you get wet', t, 'wet', { size: 30, y: 690 }); }
  // 7. the valley between the hills: a swamp that floods (sunset, fireflies, frogs)
  function swampScene(ctx, c, t, o = {}) { L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 420, sun: [640, 330], sunR: 56, seed: 71 }));
    L(ctx, c, .2, () => C.mounds(ctx, { y: 430, n: 5, seed: 72, col: '#8a9a70', far: .55, sunX: 640, t, w: 520, h: 80, copses: 2, haze: '#f0b890' }));
    L(ctx, c, .5, () => { C.mound(ctx, 120, 600, 560, 380, { col: '#6a9040', sunX: 640, t, copses: 2, seed: 73, haze: '#f0b890' }); C.mound(ctx, 1160, 600, 600, 400, { col: '#6a9040', sunX: 640, t, copses: 2, seed: 74, haze: '#f0b890' }); });
    L(ctx, c, .8, () => { C.meadow(ctx, 520, 780, t, { col: '#6e8a38', n: 200, haze: '#f0b890' }); const lvl = 560 - (o.rise ? ease.inOut(clamp((t - A.floods) / 1.2)) * 30 : 0); ctx.save(); ctx.beginPath(); ctx.ellipse(640, 620, 470, 90 + (560 - lvl), 0, 0, 7); ctx.clip(); C.water(ctx, 100, 520, 1180, 720, t, { pal: 'sunset', sunX: 640 }); ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(640, 620, 470, 90 + (560 - lvl), 0, 0, 7); ctx.stroke();
      for (let i = 0; i < 26; i++) P.reeds(ctx, 210 + i * 34, 600 + (i % 3) * 22, .55 + (i % 3) * .12, t, 4); for (const [lx, ly] of [[400, 650], [560, 680], [820, 660], [950, 640]]) { cel(ctx, c2 => c2.ellipse(lx, ly, 22, 8, 0, .3, 6.1), '#5a8a3a', { shade: '#3a6a2a', dx: 2, dy: 2, lw: 2 }); }
      for (const [fx, fy] of [[470, 660], [880, 676]]) { cel(ctx, c2 => c2.ellipse(fx, fy, 18, 11, 0, 0, 7), '#6a9a3a', { shade: '#4a7a2a', dx: 3, dy: 3, lw: 2.5 }); for (const d of [-7, 7]) { ink(ctx, '#fff', c2 => c2.arc(fx + d - 4, fy - 11, 4.5, 0, 7), 2); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(fx + d - 4, fy - 11, 2, 0, 7); ctx.fill(); } }
      if (o.people) for (let i = 0; i < 3; i++) person(ctx, 380 + i * 110, 700, .34, t, VILL[i], { pose: i === 1 ? 'shrug' : 'stand', face: 1, eyes: 'half', mouth: 'frown' }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true, flowers: 12 }));
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 24; i++) { const x = 300 + ((i * 113 + Math.sin(t + i) * 40) % 700), y = 520 + ((i * 47 + Math.cos(t * .8 + i) * 30) % 160), a = .5 + .5 * Math.sin(t * 3 + i * 2); ctx.fillStyle = `rgba(255,240,140,${a})`; ctx.beginPath(); ctx.arc(x, y, 2.5, 0, 7); ctx.fill(); } ctx.restore();
    P.birds(ctx, t, 6, 200, 300, 30); C.rays(ctx, 640, 330, t, .1); C.finish(ctx, t, 'sunset', { leakX: 640 }); }
  function cSwamp(ctx, lt, dur, t) { swampScene(ctx, C.cam(lt, dur, { z: 1.0, y: -20 }, { z: 1.1, y: 20 }), t, { rise: true }); cap(ctx, 'the valley: a swamp that floods', t, 'swamp', { size: 26 }); cap(ctx, '(the future Forum)', t, 'floods', { size: 22, y: 690 }); }
  function cProblem(ctx, lt, dur, t) { swampScene(ctx, C.cam(lt, dur, { z: 1.12 }, { z: 1.02 }), t, { people: true }); cap(ctx, 'the first big problem: not an enemy', t, 'problem', { size: 26 }); cap(ctx, 'the swamp', t, 'swamp2', { size: 34, y: 680 }); }
  // 8 & 14. scrolls on a dark wood table by firelight
  function darkRoom(ctx, t) { const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#2a1a12'); g.addColorStop(1, '#1a100a'); ctx.fillStyle = g; ctx.fillRect(-200, -200, 1700, 1200);
    ctx.strokeStyle = 'rgba(90,60,36,.35)'; ctx.lineWidth = 3; for (let r = 0; r < 6; r++) for (let i = -1; i < 12; i++) ctx.strokeRect(i * 130 + (r % 2) * 65, r * 80 - 20, 130, 80);
    ctx.fillStyle = '#4a2e1a'; ctx.fillRect(-200, 560, 1700, 400); ctx.strokeStyle = 'rgba(20,10,4,.6)'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(-200, 580 + i * 22); ctx.lineTo(1500, 580 + i * 22); ctx.stroke(); }
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const fg = ctx.createRadialGradient(1180, 420, 10, 1180, 420, 520); fg.addColorStop(0, `rgba(255,150,60,${.55 + Math.sin(t * 9) * .05})`); fg.addColorStop(1, 'rgba(255,150,60,0)'); ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 14; i++) { const ph = (t * .7 + i * .13) % 1; ctx.fillStyle = `rgba(255,${180 - ph * 80},80,${1 - ph})`; ctx.beginPath(); ctx.arc(1180 + Math.sin(i * 3 + t) * 40, 480 - ph * 360, 2.5, 0, 7); ctx.fill(); } ctx.restore(); }
  function bigScroll(ctx, x, y, w, h, k) { const hw = w / 2 * k; ctx.save(); ctx.translate(x, y);
    cel(ctx, c2 => c2.rect(-hw, -h / 2, hw * 2, h), '#efe0bc', { shade: '#cdb88c', light: '#fbf0d8', dx: 0, dy: 10, lw: 4 });
    ctx.save(); ctx.beginPath(); ctx.rect(-hw, -h / 2, hw * 2, h); ctx.clip(); for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(150,110,60,${.05 + (i % 3) * .02})`; ctx.beginPath(); ctx.ellipse(-hw + (i * 97) % (hw * 2), -h / 2 + (i * 53) % h, 60, 30, i, 0, 7); ctx.fill(); }
      ctx.strokeStyle = '#a8322a'; ctx.lineWidth = 3; for (const yy of [-h / 2 + 24, h / 2 - 24]) { ctx.beginPath(); for (let xx = -hw + 30; xx < hw - 30; xx += 24) { ctx.moveTo(xx, yy - 6); ctx.lineTo(xx, yy + 6); ctx.lineTo(xx + 12, yy + 6); ctx.lineTo(xx + 12, yy - 2); ctx.lineTo(xx + 6, yy - 2); } ctx.stroke(); } ctx.restore();
    for (const d of [-1, 1]) { cel(ctx, c2 => c2.rect(d * hw - 22, -h / 2 - 10, 44, h + 20), '#e2cf9e', { shade: '#b09868', dx: 8, dy: 0, lw: 4 }); for (const e of [-1, 1]) cel(ctx, c2 => c2.ellipse(d * hw, e * (h / 2 + 26), 16, 20, 0, 0, 7), '#8a5a34', { shade: '#5a3a20', light: '#b07a48', dx: 4, dy: 4, lw: 3.5 }); } ctx.restore(); }
  function cLegend(ctx, lt, dur, t) { const k = ease.inOut(clamp((t - A.now + .2) / 1.4)), c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08 });
    L(ctx, c, .5, () => darkRoom(ctx, t)); L(ctx, c, 1, () => { bigScroll(ctx, 640, 360, 800, 420, Math.max(.06, k));
      if (k > .6) { const a = clamp((k - .6) / .3); ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.fillStyle = '#6a2a1a'; ctx.font = '700 70px "Liberation Serif", serif'; ctx.fillText('The Legend', 640, 330); ctx.font = 'italic 700 30px "Liberation Serif", serif'; ctx.fillText('of Romulus and Remus', 640, 384); ctx.strokeStyle = '#8a5a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(430, 420); ctx.lineTo(850, 420); ctx.stroke(); wolf(ctx, 640, 520, .3, t, { lie: true }); ctx.restore(); } });
    C.finish(ctx, t, 'golden', { leakX: 1180, vig: .55 }); cap(ctx, 'a much better origin story', t, 'origin', { size: 24, y: 690, x: 640, align: 'center' }); }
  function dateScroll(ctx, lt, dur, t, stamp) { const c = C.cam(lt, dur, { z: 1.02 }, { z: 1.08 });
    L(ctx, c, .5, () => darkRoom(ctx, t)); L(ctx, c, 1, () => { bigScroll(ctx, 640, 370, 860, 440, 1); ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = '#6a2a1a'; ctx.font = 'italic 700 30px "Liberation Serif", serif'; ctx.globalAlpha = stamp ? 1 : k01(t, 'writers', .5); ctx.fillText('Roman writers dated the founding to', 640, 270);
      const k = stamp ? 1 : ease.out(clamp((t - A.seven + .2) / .7)); ctx.globalAlpha = k; ctx.font = '700 150px "Liberation Serif", serif'; ctx.fillStyle = '#8a2a1a'; ctx.fillText('753 BC', 640, 430 + (1 - k) * 20); ctx.restore();
      ctx.save(); ctx.strokeStyle = '#c8a050'; ctx.lineWidth = 4; for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(640, 400, 150, Math.PI / 2 + d * .4, Math.PI / 2 + d * 1.3, d < 0); ctx.stroke(); } ctx.restore();
      if (stamp) { const s2 = clamp((t - A.legend + .15) / .25); if (s2 > 0) { ctx.save(); ctx.translate(640, 380); ctx.rotate(-.16); ctx.scale(1 + (1 - s2) * .8, 1 + (1 - s2) * .8); ctx.globalAlpha = s2 * .92; ctx.strokeStyle = '#b8282a'; ctx.lineWidth = 12; ctx.strokeRect(-270, -76, 540, 152); ctx.fillStyle = '#b8282a'; ctx.font = '700 104px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('LEGEND', 0, 8); ctx.restore(); } } });
    C.finish(ctx, t, 'golden', { leakX: 1180, vig: .55 }); }
  const cDate = (ctx, lt, dur, t) => dateScroll(ctx, lt, dur, t, false), cLegendStamp = (ctx, lt, dur, t) => dateScroll(ctx, lt, dur, t, true);
  // 9. the twins in a basket, drifting down the river at sunset
  function cTwins(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: 80, z: 1.0 }, { x: -60, z: 1.12 });
    L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 400, sun: [900, 320], sunR: 50, seed: 91 }));
    L(ctx, c, .2, () => C.mounds(ctx, { y: 410, n: 5, seed: 92, col: '#8a9a78', far: .55, sunX: 900, t, w: 560, h: 70, copses: 1, haze: '#f0b890' }));
    L(ctx, c, .4, () => { C.meadow(ctx, 408, 470, t, { col: '#7a9040', n: 80, flowers: 20, haze: '#f0b890' }); for (let i = 0; i < 8; i++) C.tree(ctx, 60 + i * 170 + (i % 2) * 40, 452, .5 + (i % 3) * .1, t, { kind: 'cypress', seed: 90 + i, haze: '#f0b890', far: .25 }); });
    L(ctx, c, .7, () => C.water(ctx, -400, 466, 1700, 760, t, { pal: 'sunset', sunX: 900 }));
    L(ctx, c, 1, () => { const x = lerp(920, 520, ease.inOut(clamp(lt / dur))), bob = Math.sin(t * 2) * 6; ctx.save(); ctx.translate(x, 610 + bob); ctx.rotate(Math.sin(t * 1.6) * .05); basket(ctx, 0, 0, 1.25, t); ctx.restore(); ctx.strokeStyle = 'rgba(255,240,220,.7)'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(x + 30 + i * 30, 630 + bob, 120 + i * 34, 12 + i * 4, 0, 0, Math.PI); ctx.stroke(); } });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true, flowers: 6 })); C.rays(ctx, 900, 320, t, .1); C.finish(ctx, t, 'sunset', { leakX: 900 });
    cap(ctx, 'Romulus and Remus', t, 'romulus', { size: 30, x: 80, y: 90 }); cap(ctx, 'thrown into the river', t, 'thrown', { size: 22, x: 80, y: 130 }); }
  // 10. rescued by a she-wolf under a fig tree by the river; the shepherd finds them
  function cWolf(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: 60, z: 1.0 }, { x: -20, z: 1.1 }), sk = clamp((t - A.shepherd + .8) / 1.4);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 420, sun: [1000, 320], sunR: 44, seed: 101 }));
    L(ctx, c, .2, () => C.mounds(ctx, { y: 430, n: 5, seed: 102, col: '#8aa070', far: .5, sunX: 1000, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, .45, () => C.water(ctx, -400, 470, 1700, 540, t, { sunX: 1000 }));
    L(ctx, c, 1, () => { C.meadow(ctx, 530, 780, t, { col: '#7a9a36', n: 300 }); C.tree(ctx, 300, 660, 1.5, t, { kind: 'oak', seed: 7, big: true }); P.rock(ctx, 110, 680, 46, '#a89a80');
      wolf(ctx, 620, 670, .66, t, {}); twins(ctx, 600, 700, .8, t); basket(ctx, 880, 700, .7, t);
      if (sk > 0) person(ctx, lerp(1360, 1080, ease.out(sk)), 700, .55, t, SHEPHERD, { pose: sk < 1 ? 'walk' : 'hold', face: -1, eyes: 'wide', mouth: 'o', prop: staff }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 20 })); C.rays(ctx, 1000, 320, t, .09); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'rescued by a she-wolf', t, 'wolf', { size: 26, x: 80, y: 90 }); cap(ctx, 'raised by a shepherd', t, 'shepherd', { size: 24, x: 80, y: 130 }); }
  // 11. grown up, between two hills at sunset: where to build? (medium two-shot, then they point)
  function cArgue(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.14, y: 30 }), turn = Math.floor((t - A.grow) / 1.2) % 2, argue = since(t, 'argue') > 0;
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 430, sun: [640, 340], sunR: 52, seed: 111 }));
    L(ctx, c, .2, () => C.mounds(ctx, { y: 440, n: 5, seed: 112, col: '#8aa070', far: .5, sunX: 640, t, w: 520, h: 80, copses: 2 }));
    L(ctx, c, .45, () => { C.mound(ctx, 150, 560, 560, 300, { col: '#6e9440', sunX: 640, t, copses: 2, seed: 113 }); C.mound(ctx, 1130, 560, 580, 320, { col: '#6e9440', sunX: 640, t, copses: 2, seed: 114 }); });
    L(ctx, c, 1, () => { C.meadow(ctx, 520, 780, t, { col: '#7a9a36', n: 320 });
      person(ctx, 520, 720, .72, t, ROMULUS, { pose: argue && turn === 0 ? 'point' : 'talk', talk: !argue || turn === 0, face: -1, brow: argue ? 'angry' : '', mouth: argue && turn ? 'frown' : undefined });
      person(ctx, 770, 720, .72, t, REMUS, { pose: argue && turn === 1 ? 'point' : 'crossed', talk: argue && turn === 1, face: 1, brow: argue ? 'angry' : '', mouth: argue && !turn ? 'frown' : undefined }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 14 })); C.rays(ctx, 640, 340, t, .1); C.motes(ctx, t); C.finish(ctx, t, 'golden', { leakX: 640 });
    cap(ctx, 'they grow up · decide to build a city', t, 'grow', { size: 24, x: 80, y: 90 }); if (argue) { P.caption(ctx, 'Palatine!', 1, { size: 26, x: 200, y: 300, align: 'center', a: turn === 0 ? 1 : .4 }); P.caption(ctx, 'Aventine!', 1, { size: 26, x: 1080, y: 300, align: 'center', a: turn === 1 ? 1 : .4 }); } }
  // 12. Romulus kills his brother — silhouettes on the wall against a blood-red sunset, embers in the air
  function cKill(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06 }, { z: 1.0 }), f = ease.in(clamp((t - A.killed + .1) / .7));
    L(ctx, c, .04, () => C.sky(ctx, 'blood', t, { horizon: 500, sun: [700, 420], sunR: 120, seed: 121, clouds: 4 }));
    L(ctx, c, .25, () => C.mounds(ctx, { y: 510, n: 5, seed: 122, col: '#6a2a20', far: .3, sunX: 700, t, w: 520, h: 90, copses: 2, haze: '#e88a50' }));
    L(ctx, c, 1, () => { ctx.fillStyle = '#1e0e0a'; ctx.fillRect(-200, 560, 1700, 400); for (let i = 0; i < 12; i++) ctx.fillRect(-60 + i * 120, 500, 80, 64); for (const tx of [40, 1180]) ctx.fillRect(tx - 60, 340, 120, 230);
      ctx.save(); ctx.filter = 'brightness(0)'; person(ctx, 500, 560, .55, t, ROMULUS, { pose: 'strike', face: 1, prop: sword }); ctx.save(); ctx.translate(780, 560); ctx.rotate(f * 1.3); person(ctx, 0, 0, .55, t, REMUS, { pose: 'stand', face: -1 }); ctx.restore(); ctx.restore(); });
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 30; i++) { const ph = (t * .4 + i * .07) % 1; ctx.fillStyle = `rgba(255,${150 + (i % 3) * 30},70,${(1 - ph) * .8})`; ctx.beginPath(); ctx.arc((i * 137) % 1280 + Math.sin(t + i) * 20, 720 - ph * 700, 2 + (i % 2), 0, 7); ctx.fill(); } ctx.restore();
    C.finish(ctx, t, 'blood', { leakX: 700, vig: .55 }); cap(ctx, 'Romulus kills his brother', t, 'killed', { size: 26, x: 80, y: 90 }); }
  // 13. the city gets his name: huts on the Palatine, smoke rising, ROMA
  function cRoma(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.1, y: 30 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 470, sun: [980, 360], sunR: 46, seed: 131 }));
    L(ctx, c, .2, () => C.mounds(ctx, { y: 480, n: 5, seed: 132, col: '#8aa070', far: .5, sunX: 980, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, .8, () => { C.mound(ctx, 640, 800, 1300, 360, { col: '#6e9440', sunX: 980, t, copses: 0, seed: 133 }); C.meadow(ctx, 680, 900, t, { col: '#7a9a36', n: 120 }); for (let i = 0; i < 4; i++) roundHut(ctx, 330 + i * 200 + (i > 1 ? 60 : 0), 500 - (i % 2) * 8, .55, t, i); person(ctx, 640, 540, .4, t, ROMULUS, { pose: 'up', eyes: 'happy', mouth: 'grin', face: 1 }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 16 })); C.rays(ctx, 980, 360, t, .1); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    const k = ease.out(clamp((t - A.name + .5) / .8)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.translate(640, 170); ctx.scale(.8 + .2 * k, .8 + .2 * k); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 120px "Liberation Serif", serif'; ctx.lineJoin = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = '#4a2a16'; ctx.strokeText('ROMA', 0, 0); const g = ctx.createLinearGradient(0, -50, 0, 50); g.addColorStop(0, '#fbe2a0'); g.addColorStop(.55, '#e8a850'); g.addColorStop(1, '#b8702e'); ctx.fillStyle = g; ctx.fillText('ROMA', 0, 0); ctx.restore(); }
    cap(ctx, 'the city gets his name', t, 'name', { size: 24, x: 80, y: 650 }); }
  // landscapes reused by the archaeology shots: painted sky and hills behind a drawn foreground
  function landBehind(ctx, t, y0 = 300) { const c = { x: 0, y: 0, z: 1 }; ctx.save(); ctx.translate(0, y0 - 420); goldenLand(ctx, c, t, { sun: [900, 320], seed: 150 }); ctx.restore(); }
  function cHuts(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: -40, z: 1.0 }, { x: 40, z: 1.08 });
    goldenLand(ctx, c, t, { sun: [1000, 320], seed: 160 });
    L(ctx, c, .9, () => { C.mound(ctx, 640, 900, 1700, 400, { col: '#76963e', sunX: 1000, t, copses: 0, seed: 161 }); C.meadow(ctx, 560, 900, t, { col: '#7e9c3c', n: 260 });
      for (const [x, y, s2] of [[160, 610, .52], [400, 590, .58], [680, 596, .56], [940, 606, .52], [1160, 622, .48]]) roundHut(ctx, x, y, s2, t, x);
      person(ctx, 300, 690, .36, t, VILL[1], { pose: 'carry', prop: jug, face: 1, walk: true }); person(ctx, 830, 700, .36, t, VILL[0], { pose: 'talk', talk: true, face: -1 }); person(ctx, 720, 702, .34, t, VILL[3], { pose: 'stand', face: 1, mouth: 'smile' });
      P.goat(ctx, 1040, 712, .48, t, { seed: 1 }); P.goat(ctx, 1110, 718, .42, t, { flip: true, seed: 2 }); P.cow(ctx, 540, 716, .28, t, { graze: true, seed: 5 }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 14 })); C.rays(ctx, 1000, 320, t, .08); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'huts on these hills', t, 'huts', { size: 26 }); cap(ctx, 'well before 753 BC', t, 'before', { size: 22, y: 690 }); }
  function cMerge(ctx, lt, dur, t) { const c = C.cam(lt, dur, { x: 150, y: 40, z: 1.6 }, { x: 120, y: 30, z: 1.75 });
    L(ctx, c, 1, () => { mapBase(ctx, t); riverDraw(ctx, 1, t);
      const V = [[690, 210, 'Capitoline'], [760, 300, 'Palatine'], [850, 220, 'Quirinal'], [880, 320, 'Esquiline'], [790, 390, 'Aventine'], [800, 150, 'Viminal']], m = ease.inOut(clamp((t - A.one + .9) / 1.4)), sep = clamp((t - A.communities + .6) / 1);
      if (m > 0) { ctx.save(); ctx.globalAlpha = m; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 4; ctx.setLineDash([10, 7]); ctx.beginPath(); ctx.ellipse(790, 270, 150, 150, 0, 0, 7); ctx.stroke(); ctx.restore(); }
      V.forEach(([x, y, n], i) => { hillVillage(ctx, x, y, .5, t, i); ctx.save(); ctx.globalAlpha = 1 - m * .7; ctx.strokeStyle = '#3a2416'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(x, y, 38 * sep, 0, 7); ctx.stroke(); ctx.restore(); }); });
    C.finish(ctx, t, 'dawn', { leak: false, vig: .4 });
    const m = ease.inOut(clamp((t - A.one + .9) / 1.4)); if (m > .5) P.caption(ctx, 'one Rome', clamp((m - .5) * 2), { size: 34, x: 640, y: 90, align: 'center' }); P.caption(ctx, 'separate little communities…', clamp((t - A.time) / .5), { size: 24, x: 60, y: 690 }); P.caption(ctx, '…grow into one', k01(t, 'one'), { size: 24, x: 1220, y: 690, align: 'right' }); }
  function cFarmers(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.12, y: 20 }, { z: 1.0 }), day = clamp(lt / dur), sun = [lerp(400, 1000, day), lerp(360, 300, day)];
    goldenLand(ctx, c, t, { sun, seed: 170 });
    L(ctx, c, .55, () => { [[160, 560, 420, 220], [470, 590, 460, 260], [820, 570, 460, 250], [1130, 580, 420, 220]].forEach(([x, y, w2, h2], i) => { C.mound(ctx, x, y, w2, h2, { col: '#6e9440', sunX: sun[0], t, copses: 1, seed: 171 + i }); for (let k = 0; k < 2; k++) roundHut(ctx, x - 40 + k * 70, y - h2 * .8 + 26 + k * 8, .26, t, i * 2 + k); }); });
    L(ctx, c, 1, () => { C.meadow(ctx, 600, 800, t, { col: '#7a9a36', n: 300 }); for (let i = 0; i < 6; i++) person(ctx, 120 + i * 210, 700 - (i % 2) * 14, .28, t, VILL[i % 5], { pose: i % 3 === 0 ? 'walk' : i % 3 === 1 ? 'carry' : 'stand', face: i % 2 ? -1 : 1, prop: i % 3 === 1 ? jug : null }); P.goat(ctx, 300, 714, .36, t, { seed: 3 }); P.cow(ctx, 990, 716, .26, t, { graze: true, seed: 9 }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 16 })); C.rays(ctx, sun[0], sun[1], t, .09); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'who founded Rome? the honest answer:', t, 'honest', { size: 24 }); cap(ctx, 'a lot of farmers · a lot of hills · a long time', t, 'farmers', { size: 24, y: 690 }); }
  // finish: same light touch as the cold open (no haze, no blur)
  const fin = draw => (ctx, lt, dur, t) => { draw(ctx, lt, dur, t); if (!/^c[A-Z]/.test(draw.name)) C.finish(ctx, t, 'golden', { leak: false, vig: .4 }); };
  const cut = [[0, fin(cMarble), 0], [A.picture - .2, fin(cMap), .6], [A.right - .2, fin(cCrossing), .5], [A.crossing - .4, fin(cHills), .5], [A.top - .6, fin(cTop), .4],
    [A.bottom - .5, fin(cBottom), .4], [A.valley - .2, fin(cSwamp), .5], [A.now - .2, fin(cLegend), .6], [A.twin - .3, fin(cTwins), .5], [A.rescued - .2, fin(cWolf), .4],
    [A.grow - .2, fin(cArgue), .4], [A.killed - .5, fin(cKill), .3], [A.name - .9, fin(cRoma), .4], [A.writers - .3, fin(cDate), .5], [A.worked - .3, fin(sVarro), .5],
    [A.legend - .3, fin(cLegendStamp), .3], [A.livy - .2, fin(sLivyLine), .5], [A.says - .3, fin(sLivy), .5], [A.archaeology - .2, fin(sDig), .5], [A.huts - .5, fin(cHuts), .5],
    [A.time - .4, fin(cMerge), .5], [A.historians - .4, fin(sFight), .4], [A.italian - .2, fin(sWall), .5], [A.argues - .3, fin(sCeremony), .3], [A.most - .2, fin(sDoubt), .4],
    [A.wallis - .2, fin(sJustWall), .4], [A.honest - .4, fin(cFarmers), .5], [A.first - .4, fin(cProblem), .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: .2, type: 'wind', gain: .3 }, { t: A.river, type: 'bubbles', gain: .3 }, { t: A.island, type: 'splash', gain: .25 }, { t: A.hills, type: 'thud', gain: .25 }, { t: A.trouble, type: 'clang', gain: .2 },
    { t: A.wet, type: 'splash', gain: .5 }, { t: A.floods, type: 'bubbles', gain: .35 }, { t: A.now, type: 'paper', gain: .4 }, { t: A.thrown, type: 'splash', gain: .35 }, { t: A.killed, type: 'hit', gain: .35 },
    { t: A.name, type: 'swell', gain: .4 }, { t: A.seven, type: 'press', gain: .4 }, { t: A.legend, type: 'thud', gain: .55 }, { t: A.seven2, type: 'slide', gain: .3 }, { t: A.archaeology, type: 'scratch', gain: .3 },
    { t: A.fight, type: 'rattle', gain: .35 }, { t: A.wall, type: 'thud', gain: .35 }, { t: A.argues, type: 'swell', gain: .3 }, { t: A.wallis, type: 'thud', gain: .3 }, { t: A.swamp2, type: 'bubbles', gain: .4 }];
  const moods = [{ t: 0, mood: 'still' }, { t: A.now - .3, mood: 'mystery' }, { t: A.legend, mood: 'still' }, { t: A.historians - .3, mood: 'tense' }, { t: A.most - .3, mood: 'still' }, { t: A.first - .4, mood: 'under' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat2.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
