/* Rome — Beat 4a, "Near-death #1: the Gauls" (narration-beat4a.mp3 = narration-full.mp3 274.6–338.38 s + pad).
 * c. 390/387 BC: the Gauls come south, smash a Roman army, walk in and burn the city; the Capitoline holds; the night climb and
 * Juno's geese; the gold; "Rome should have died here — it didn't"; the great stone wall; 800 years with no foreign army inside.
 * Same cast and cinematic kit as Beats 2–3; everything on real ground; audited per shot before rendering. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const OFF = 274.6;
  const A0 = { around: 274.68, later: 277.76, sources: 278.86, many: 280.25, three87: 281.78, war: 283.53, gauls: 284.2, north: 284.8, smashed: 285.27, walked: 286.84,
    looted: 288.66, burned: 289.5, romans: 291.11, held: 292.28, capitoline: 292.89, story: 295.19, famous: 295.82, legend: 297.01, sneak: 298.52, cliff: 299.15, night: 299.54,
    geese: 300.92, juno: 301.91, honking: 302.69, woke: 303.49, really: 305.13, goes: 307.34, documented: 308.59, ending: 309.93, paid: 312.01, gold: 313.13, away: 313.98,
    died: 315.84, didnt: 317.75, learned: 319.15, never: 321.44, again: 323.16, built: 324.71, wall: 326.11, decades: 327.55, eight: 329.18, army: 331.44, inside: 332.01,
    streak: 334.42, later2: 335.75, pocket: 337.17 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 64.8;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };

  // ---------- cast ----------
  const ROMANS = [{ kind: 'tunic', cloth: '#a8322a', hair: '#2a1a14', hairStyle: 'short', cap: '#b8893a', seed: 1 }, { kind: 'tunic', cloth: '#8a2a24', hair: '#3a2416', hairStyle: 'curly', cap: '#c09040', beard: true, seed: 2 },
    { kind: 'tunic', cloth: '#b83a2e', hair: '#1a1410', hairStyle: 'short', cap: '#a88030', seed: 3 }];
  const GAUL = i => ({ kind: 'tunic', cloth: ['#3a6a4a', '#6a4a8a', '#8a6a2a', '#2a5a7a'][i % 4], legs: ['#a8322a', '#3a5a3a', '#5a4a7a', '#8a6a3a'][(i + 1) % 4], hair: ['#c8a050', '#a85a28', '#e0c070', '#7a4a20'][i % 4], hairStyle: 'long', beard: true, beardCol: ['#c8a050', '#a85a28', '#e0c070', '#7a4a20'][i % 4], belt: '#3a2414', seed: 60 + i });
  const BRENNUS = Object.assign(GAUL(1), { cloth: '#7a2a2a', legs: '#2a3a5a', hair: '#d8b060', beardCol: '#d8b060', wreath: false, seed: 70 });
  const CIVIL = [{ kind: 'toga', hair: '#3a2416', hairStyle: 'short', seed: 21 }, { kind: 'toga', hair: '#8a8a84', hairStyle: 'bald', seed: 22 }, { kind: 'tunic', cloth: '#b86a4a', hair: '#2a1a14', hairStyle: 'curly', seed: 23 },
    { kind: 'stola', cloth: '#c86a5a', cloth2: '#efe0c0', hairStyle: 'bun', hair: '#1a1410', seed: 26 }, { kind: 'tunic', cloth: '#5a7a9a', hair: '#1a1410', hairStyle: 'short', seed: 25 }, { kind: 'woman', cloth: '#a88a6a', scarf: '#d8c8a8', hair: '#3a2416', seed: 27 }];
  const TRIBUNE = { kind: 'toga', trim: '#7a2a62', hair: '#5a3a24', hairStyle: 'short', beard: true, seed: 30 };
  const person = (ctx, x, y, s, t, base, o) => P.person(ctx, x, y, s, t, Object.assign({}, base, o || {}));

  // ---------- props ----------
  const longsword = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 8, y - 120); ctx.stroke(); ctx.strokeStyle = '#c8ccd4'; ctx.lineWidth = 5; ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 14, y - 4); ctx.lineTo(x + 14, y - 2); ctx.stroke(); ctx.restore(); };
  const spear = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + 60); ctx.lineTo(x + 8, y - 150); ctx.stroke(); ctx.restore(); ink(ctx, '#c8ccd4', c => { c.moveTo(x + 8, y - 176); c.lineTo(x + 17, y - 146); c.lineTo(x - 1, y - 146); c.closePath(); }, 2.5); };
  const torch = (ctx, x, y, t) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y + 20); ctx.lineTo(x + 4, y - 60); ctx.stroke(); ctx.restore(); const f = Math.sin(t * 14 + x) * 3; ctx.fillStyle = '#ffb040'; ctx.beginPath(); ctx.ellipse(x + 4, y - 74 + f, 11, 20, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff0b0'; ctx.beginPath(); ctx.ellipse(x + 4, y - 68, 5, 9, 0, 0, 7); ctx.fill(); };
  const sack = (ctx, x, y) => cel(ctx, c => { c.moveTo(x - 24, y - 50); c.quadraticCurveTo(x - 34, y, x - 10, y + 6); c.lineTo(x + 18, y + 6); c.quadraticCurveTo(x + 34, y - 10, x + 20, y - 50); c.closePath(); }, '#b8945e', { shade: '#86602e', dx: 5, dy: 0, lw: 3 });
  const amph = (ctx, x, y) => cel(ctx, c => { c.moveTo(x - 8, y - 70); c.quadraticCurveTo(x - 30, y - 30, x - 4, y + 10); c.lineTo(x + 4, y + 10); c.quadraticCurveTo(x + 30, y - 30, x + 8, y - 70); c.closePath(); }, '#c8784a', { shade: '#8a4a2a', dx: 5, dy: 3, lw: 3 });
  const chisel = (ctx, x, y) => { ink(ctx, '#6a6a72', c => c.rect(x - 3, y, 6, 40), 2); };
  // an oval Celtic shield with a central boss, and a round Roman shield, drawn at a person's front hand
  function gShield(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => c.ellipse(0, 0, 34, 70, 0, 0, 7), col, { shade: mix(col, '#000', .3), light: mix(col, '#fff', .2), dx: 8, dy: 0, lw: 4 }); ink(ctx, '#7a5a30', c => c.rect(-5, -64, 10, 128), 2); cel(ctx, c => c.arc(0, 0, 12, 0, 7), '#c8a050', { shade: '#8a6a28', dx: 3, dy: 3, lw: 3 }); ctx.restore(); }
  function rShield(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => c.arc(0, 0, 52, 0, 7), '#c8963a', { shade: '#8a6420', light: '#e8c070', dx: 8, dy: 6, lw: 4 }); ctx.strokeStyle = '#8a6420'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.stroke(); cel(ctx, c => c.arc(0, 0, 10, 0, 7), '#e8c070', { dx: 2, dy: 2, lw: 2 }); ctx.restore(); }
  function goose(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); const honk = o.honk ? Math.max(0, Math.sin(t * 9 + x)) : 0, neck = o.honk ? -.25 : 0;
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(0, 2, 60, 9, 0, 0, 7); ctx.fill();
    for (const lx of [-8, 12]) { ctx.strokeStyle = '#e8902a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(lx, -30); ctx.lineTo(lx, -2); ctx.stroke(); ink(ctx, '#e8902a', c => { c.moveTo(lx - 10, 0); c.lineTo(lx + 8, 0); c.lineTo(lx, -6); c.closePath(); }, 2); }
    cel(ctx, c => { c.moveTo(-50, -40); c.quadraticCurveTo(-40, -80, 10, -78); c.quadraticCurveTo(56, -76, 64, -50); c.lineTo(78, -66); c.lineTo(70, -40); c.quadraticCurveTo(40, -20, -10, -24); c.quadraticCurveTo(-46, -26, -50, -40); c.closePath(); }, '#f6f2ea', { shade: '#c8c0b4', light: '#ffffff', dx: 0, dy: 8, lw: 3.5 });
    ctx.strokeStyle = 'rgba(120,110,100,.6)'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0 + i * 12, -64); ctx.quadraticCurveTo(20 + i * 12, -56, 30 + i * 10, -44); ctx.stroke(); }
    ctx.save(); ctx.translate(-40, -50); ctx.rotate(neck); cel(ctx, c => { c.moveTo(0, 0); c.quadraticCurveTo(-14, -40, -6, -80); c.lineTo(10, -80); c.quadraticCurveTo(4, -40, 16, 4); c.closePath(); }, '#f6f2ea', { shade: '#c8c0b4', dx: 4, dy: 0, lw: 3 });
    cel(ctx, c => c.ellipse(0, -88, 15, 13, 0, 0, 7), '#f6f2ea', { shade: '#c8c0b4', dx: 3, dy: 3, lw: 3 }); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-4, -92, 2.6, 0, 7); ctx.fill();
    ink(ctx, '#e8902a', c => { c.moveTo(-12, -90); c.lineTo(-34, -88 - honk * 4); c.lineTo(-12, -84); c.closePath(); }, 2); ink(ctx, '#d8801a', c => { c.moveTo(-12, -84); c.lineTo(-32, -82 + honk * 8); c.lineTo(-12, -80); c.closePath(); }, 2); ctx.restore();
    if (o.honk && honk > .5) { ctx.strokeStyle = INK; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-90, -140, 12 + i * 10, -.6, .6); ctx.stroke(); } }
    ctx.restore(); }
  // ---------- buildings ----------
  function house(ctx, x, y, s, seed = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = C.rng(seed + 1), w = 150 + R() * 60, h = 90 + R() * 40, wall = o.burnt ? '#5a4a3a' : ['#e8d0a8', '#dcc094', '#efdcbc'][seed % 3];
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(12, 2, w * .62, 12, 0, 0, 7); ctx.fill();
    cel(ctx, c => c.rect(-w / 2, -h, w, h), wall, { shade: mix(wall, '#3a2a1a', .3), light: mix(wall, '#ffffff', .2), dx: w * .2, dy: 0, lw: 4 });
    if (!o.burnt) { cel(ctx, c => { c.moveTo(-w / 2 - 14, -h); c.lineTo(-w * .2, -h - 44); c.lineTo(w * .2, -h - 44); c.lineTo(w / 2 + 14, -h); c.closePath(); }, '#c0643a', { shade: '#8a4024', light: '#d8805a', dx: 10, dy: 0, lw: 4 }); }
    else { ctx.strokeStyle = '#2a1a10'; ctx.lineWidth = 7; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-w / 2 + k * w / 3, -h); ctx.lineTo(-w / 2 + k * w / 3 + 20, -h - 30 + (k % 2) * 20); ctx.stroke(); } }
    ink(ctx, o.lit ? '#ffb050' : '#3a2414', c => c.rect(-18, -58, 36, 58), 3); ink(ctx, o.lit ? '#ffc870' : '#3a2414', c => c.rect(w * .2, -h + 22, 22, 18), 2.5);
    ctx.restore(); }
  function flames(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 6; i++) { const ph = t * 6 + i * 1.3 + x, h = 70 + Math.sin(ph) * 20 + i * 6, dx = (i - 2.5) * 16; ctx.fillStyle = ['#ff6a20', '#ffa030', '#ffd060'][i % 3]; ctx.beginPath(); ctx.moveTo(dx - 16, 0); ctx.quadraticCurveTo(dx - 18, -h * .6, dx + Math.sin(ph) * 6, -h); ctx.quadraticCurveTo(dx + 18, -h * .5, dx + 16, 0); ctx.closePath(); ctx.fill(); } ctx.restore(); C.smoke(ctx, x, y - 70 * s, s * 1.2, t, { h: 300, a: .6 }); }
  // the Capitoline: a steep cliff of tufa (the Tarpeian rock) crowned by a wall and the temple
  function capitol(ctx, t, o = {}) { const cliff = c => { c.moveTo(o.x0 ?? 300, 760); c.lineTo(o.x0 ?? 300, 420); c.quadraticCurveTo(340, 300, 420, 250); c.lineTo(980, 240); c.quadraticCurveTo(1060, 300, 1080, 420); c.lineTo(1100, 760); c.closePath(); };
    ctx.beginPath(); cliff(ctx); const g = ctx.createLinearGradient(0, 240, 0, 760); g.addColorStop(0, o.night ? '#6a6070' : '#c8a070'); g.addColorStop(1, o.night ? '#2a2430' : '#8a6040'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
    ctx.save(); ctx.beginPath(); cliff(ctx); ctx.clip(); ctx.strokeStyle = o.night ? 'rgba(20,16,24,.5)' : 'rgba(80,50,24,.4)'; ctx.lineWidth = 3; const R = C.rng(5); for (let i = 0; i < 26; i++) { const x = 320 + R() * 760, y = 280 + R() * 460; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (R() - .5) * 40, y + 30 + R() * 50); ctx.lineTo(x + (R() - .5) * 60, y + 80 + R() * 40); ctx.stroke(); }
      for (let i = 0; i < 12; i++) P.bush(ctx, 330 + R() * 740, 300 + R() * 440, 14 + R() * 12, { col: o.night ? '#2a3a2a' : '#5a7a34', seed: i + 3 }); ctx.restore();
    // the citadel wall along the top, then the Temple of Jupiter on its podium
    ctx.fillStyle = o.night ? '#5a5462' : '#d8c09a'; ctx.fillRect(420, 206, 560, 40); for (let i = 0; i < 14; i++) ctx.fillRect(420 + i * 40, 192, 24, 16); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(420, 206, 560, 40);
    ctx.save(); if (o.night) ctx.filter = 'brightness(.55) saturate(.6)'; const y = C.site(ctx, 700, 280, 206, t, { podium: 16, steps: false, bushes: false, seed: 7 }); P.temple(ctx, 700, y, .5, { roof: '#c87a4a' }); ctx.restore(); }

  // ---------- shots ----------
  // 1. c. 390 BC (or a few years later): a painted map of Italy, the Gauls' route south from the Po valley to Rome
  const ITALY = [[330, 170], [420, 120], [560, 110], [700, 125], [820, 112], [880, 150], [850, 196], [800, 206], [770, 246], [830, 306], [890, 366], [970, 424], [1050, 470], [1090, 500], [1066, 524], [1004, 506], [984, 546], [1014, 604], [994, 664], [954, 694], [934, 644], [904, 566], [864, 524], [804, 484], [724, 424], [646, 364], [586, 306], [526, 266], [470, 236], [404, 216], [352, 196]];
  function sMap(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.12, x: 30, y: 20 }), k = ease.inOut(clamp((t - A.war + 4) / 3.4));
    L(ctx, c, 1, () => { const sg = ctx.createLinearGradient(0, 0, 1280, 720); sg.addColorStop(0, '#5ab0d8'); sg.addColorStop(1, '#2a78b8'); ctx.fillStyle = sg; ctx.fillRect(-200, -200, 1700, 1200);
      ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 2; const R = C.rng(3); for (let i = 0; i < 60; i++) { const x = R() * 1400 - 60, y = R() * 800 - 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 10, y - 4, x + 22, y); ctx.stroke(); }
      const land = (pts, col) => { ctx.beginPath(); const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; ctx.moveTo(...m(pts[pts.length - 1], pts[0])); for (let i = 0; i < pts.length; i++) ctx.quadraticCurveTo(...pts[i], ...m(pts[i], pts[(i + 1) % pts.length])); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = '#e8d8a0'; ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.stroke(); };
      ctx.fillStyle = '#9cc46a'; ctx.fillRect(-200, -200, 1700, 330); ctx.strokeStyle = '#e8d8a0'; ctx.lineWidth = 10; land(ITALY, '#9cc46a'); ctx.fillStyle = '#9cc46a'; ctx.fillRect(-200, -200, 1700, 330);
      land([[880, 700], [980, 690], [1010, 730], [900, 740]], '#9cc46a'); land([[470, 380], [500, 370], [510, 470], [480, 500], [460, 440]], '#9cc46a'); land([[478, 300], [496, 296], [500, 350], [482, 354]], '#9cc46a');
      // the Alps along the top, the Apennines down the spine, woods
      for (let i = 0; i < 16; i++) { const x = 300 + i * 46, y = 120 + Math.sin(i) * 10; cel(ctx, cc => { cc.moveTo(x - 30, y); cc.lineTo(x, y - 46); cc.lineTo(x + 30, y); cc.closePath(); }, '#d8d0c8', { shade: '#a8a098', light: '#ffffff', dx: 10, dy: 0, lw: 2.5 }); }
      for (let i = 0; i < 12; i++) { const u = i / 11, x = lerp(560, 1000, u), y = lerp(250, 560, u) + Math.sin(i * 1.7) * 10; cel(ctx, cc => { cc.moveTo(x - 22, y); cc.lineTo(x, y - 30); cc.lineTo(x + 22, y); cc.closePath(); }, '#c8a070', { shade: '#9a7048', dx: 8, dy: 0, lw: 2.5 }); }
      // the Po and the Tiber; Rome
      ctx.lineCap = 'round'; ctx.strokeStyle = '#4a98d0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(380, 190); ctx.quadraticCurveTo(560, 170, 790, 200); ctx.stroke(); ctx.beginPath(); ctx.moveTo(740, 280); ctx.quadraticCurveTo(700, 330, 668, 378); ctx.stroke();
      ink(ctx, '#a8322a', cc => cc.arc(682, 380, 10, 0, 7), 3); P.caption(ctx, 'Rome', 1, { size: 24, x: 600, y: 396, align: 'center' }); P.caption(ctx, 'Gauls', 1, { size: 24, x: 520, y: 160, align: 'center' });
      // the war band's route: a dashed red arrow drawn from the north down to Rome, with marching figures along it
      if (k > 0) { const pts = [[520, 190], [600, 240], [650, 300], [676, 360]], n = 60; ctx.save(); ctx.strokeStyle = '#c8322a'; ctx.lineWidth = 7; ctx.setLineDash([16, 10]); ctx.beginPath(); for (let i = 0; i <= n * k; i++) { const u = i / n, j = Math.min(2, Math.floor(u * 3)), f = u * 3 - j, x = lerp(pts[j][0], pts[j + 1][0], f), y = lerp(pts[j][1], pts[j + 1][1], f); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); } });
    C.finish(ctx, t, 'dawn', { leak: false, vig: .4 }); cap(ctx, 'around 390 BC', t, 'around', { size: 30, y: 590 }); cap(ctx, '…or a few years later: ancient sources disagree', t, 'later', { size: 22, y: 640 }); cap(ctx, 'many historians prefer c. 387 BC', t, 'many', { size: 22, y: 686 }); }
  // 2. a war band of Gauls from the north smashes a Roman army (by the Allia stream)
  function sBattle(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.08, x: 30 }), push = ease.inOut(clamp(lt / dur));
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 400, seed: 401, clouds: 6 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 410, n: 5, seed: 402, col: '#7a8a5a', far: .4, sunX: 640, t, w: 560, h: 90, copses: 2, haze: '#a4aeb6' }));
    L(ctx, c, .6, () => { C.meadow(ctx, 450, 800, t, { col: '#7a8a44', n: 200, flowers: 0, haze: '#a4aeb6' }); C.water(ctx, -400, 500, 1700, 530, t, { pal: 'storm', glint: false, n: 20 }); for (let i = 0; i < 10; i++) P.reeds(ctx, -40 + i * 150, 532, .45, t, 3); });
    L(ctx, c, 1, () => { // Gauls charging in from the left, swords up; Romans breaking and running to the right
      for (let i = 0; i < 7; i++) { const x = lerp(-60, 380, push) + (i % 4) * 90 - Math.floor(i / 4) * 50, y = 600 + (i % 3) * 40; person(ctx, x, y, .4, t, GAUL(i), { pose: i % 2 ? 'strike' : 'walk', speed: 1.6, face: 1, prop: longsword, brow: 'angry', mouth: 'o' }); if (i % 2 === 0) gShield(ctx, x + 16, y - 100, .45, ['#3a6a9a', '#a8322a', '#c8a050', '#3a6a4a'][i % 4]); }
      for (let i = 0; i < 6; i++) { const x = lerp(700, 1220, push) + (i % 3) * 110, y = 610 + (i % 2) * 44; person(ctx, x, y, .4, t, ROMANS[i % 3], { pose: 'walk', speed: 1.8, face: 1, eyes: 'wide', mouth: 'o', brow: 'sad' }); if (i % 2) rShield(ctx, x - 26, y - 90, .5); }
      for (const [sx, sy] of [[640, 720], [560, 690], [760, 700]]) { ctx.save(); ctx.translate(sx, sy); ctx.rotate(.8); rShield(ctx, 0, 0, .4); ctx.restore(); } });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 0, col: '#4a5a24' })); ctx.save(); ctx.fillStyle = 'rgba(200,190,170,.25)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(400 + i * 120 + Math.sin(t + i) * 30, 640, 120, 30, 0, 0, 7); ctx.fill(); } ctx.restore();
    C.finish(ctx, t, 'storm', { leak: false, vig: .5 }); cap(ctx, 'a war band of Gauls from the north', t, 'war', { size: 26 }); cap(ctx, 'smashed a Roman army', t, 'smashed', { size: 24, y: 686 }); }
  // 3. …and walked into the city: through the open gate, past empty streets
  function sGate(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.12, x: 20 }), w = clamp(lt / dur);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 380, seed: 411, clouds: 5 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 390, n: 5, seed: 412, col: '#7a8a5a', far: .4, sunX: 640, t, w: 560, h: 90, copses: 2, haze: '#a4aeb6' }));
    L(ctx, c, 1, () => { C.meadow(ctx, 420, 800, t, { col: '#7a8a44', n: 140, flowers: 0, haze: '#a4aeb6' }); for (const hx of [760, 900, 1180]) house(ctx, hx, 380, .34, hx);
      cel(ctx, cc => cc.rect(560, 360, 900, 290), '#c8a878', { shade: '#9a7a50', dx: 0, dy: 0, lw: 4 }); ctx.strokeStyle = 'rgba(80,60,40,.45)'; ctx.lineWidth = 2; for (let r = 0; r < 8; r++) { const y = 360 + r * 36; ctx.beginPath(); ctx.moveTo(560, y); ctx.lineTo(1460, y); ctx.stroke(); for (let k = 0; k < 12; k++) { const x = 560 + k * 80 + (r % 2) * 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 36); ctx.stroke(); } }
      ctx.fillStyle = '#4a3e30'; ctx.beginPath(); ctx.moveTo(660, 650); ctx.lineTo(660, 500); ctx.arc(740, 500, 80, Math.PI, 0); ctx.lineTo(820, 650); ctx.closePath(); ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = '#d8c8a8'; ctx.fillRect(660, 560, 160, 90); for (const hx of [700, 790]) house(ctx, hx, 600, .22, hx); ctx.restore(); for (let i = 0; i < 11; i++) { const a0 = Math.PI + i * Math.PI / 11, a1 = a0 + Math.PI / 11; cel(ctx, cc => { cc.arc(740, 500, 112, a0, a1); cc.arc(740, 500, 80, a1, a0, true); cc.closePath(); }, '#d8bc8a', { shade: '#a08050', dx: 2, dy: 2, lw: 2.5 }); }
      // a broken gate leaf lying on the ground
      ctx.save(); ctx.translate(560, 660); ctx.rotate(-.15); cel(ctx, cc => cc.rect(-80, -26, 160, 26), '#7a5232', { shade: '#5a3a20', dx: 0, dy: 6, lw: 3 }); ctx.restore();
      for (let i = 0; i < 6; i++) { const u = clamp(w * 1.3 - i * .12), x = lerp(60, 720, u), y = lerp(700, 650, u), sc = lerp(.42, .26, u); if (u >= 1) continue; person(ctx, x, y, sc, t, GAUL(i), { pose: 'walk', face: 1, prop: i % 2 ? spear : longsword }); if (i % 2 === 0) gShield(ctx, x + 14 * sc / .4, y - 100 * sc / .4, .45 * sc / .4, ['#3a6a9a', '#a8322a', '#c8a050'][i % 3]); } });
    C.finish(ctx, t, 'storm', { leak: false, vig: .5 }); cap(ctx, '…and walked into the city', t, 'walked', { size: 28 }); }
  // 4. they looted and burned much of it: night, the streets on fire, Gauls carrying off loot
  function sBurn(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'blood', t, { horizon: 420, sun: [640, 470], sunR: 0, sunDisc: false, seed: 421, clouds: 4 }));
    L(ctx, c, .3, () => { const r = C.mound(ctx, 640, 520, 1500, 160, { col: '#4a3a2a', sunX: 640, t, copses: 0, seed: 422, haze: '#e88a50' }); for (let i = 0; i < 14; i++) { const hx = -40 + i * 100; house(ctx, hx, C.footY(r, hx, 60) + 18, .26, i, { burnt: i % 3 === 0, lit: i % 3 !== 0 }); if (i % 3 === 0) flames(ctx, hx, C.footY(r, hx, 60) - 10, .5, t); } });
    L(ctx, c, 1, () => { ctx.fillStyle = '#3a2a20'; ctx.fillRect(-300, 560, 1900, 400); ctx.strokeStyle = 'rgba(255,140,60,.25)'; ctx.lineWidth = 2; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(i * 90 - 100, 560); ctx.lineTo(i * 110 - 300, 760); ctx.stroke(); }
      house(ctx, 160, 600, .6, 4, { burnt: true }); flames(ctx, 160, 520, 1.2, t); house(ctx, 1120, 600, .6, 5, { burnt: true }); flames(ctx, 1120, 520, 1.1, t);
      const props = [sack, amph, sack, torch]; for (let i = 0; i < 4; i++) { const x = 380 + i * 160, f = i % 2 ? -1 : 1; person(ctx, x + Math.sin(t * .5 + i) * 30 * f, 690, .44, t, GAUL(i + 1), { pose: i === 3 ? 'hold' : 'carry', face: f, prop: i === 3 ? (cc, x2, y2) => torch(cc, x2, y2, t) : props[i], mouth: 'grin' }); } });
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const ph = (t * .4 + i * .05) % 1; ctx.fillStyle = `rgba(255,${140 + (i % 3) * 40},60,${(1 - ph) * .9})`; ctx.beginPath(); ctx.arc((i * 137) % 1280 + Math.sin(t + i) * 20, 720 - ph * 700, 2 + (i % 2), 0, 7); ctx.fill(); } ctx.restore();
    C.finish(ctx, t, 'blood', { leakX: 640, vig: .55 }); cap(ctx, 'they looted and burned much of it', t, 'looted', { size: 28 }); }
  // 5. the Romans who could held out on the Capitoline: defenders on the citadel wall, smoke rising from the city below
  function sCapitol(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, y: 30 }, { z: 1.06, y: 0 });
    L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 520, sun: [1100, 300], sunR: 40, seed: 431, clouds: 4 }));
    L(ctx, c, .3, () => { C.mounds(ctx, { y: 540, n: 5, seed: 432, col: '#6a6a50', far: .4, sunX: 1100, t, w: 560, h: 90, copses: 1, haze: '#f0b890' }); for (const [sx, s] of [[120, 1.1], [1180, 1.3], [220, .9]]) C.smoke(ctx, sx, 560, s, t, { h: 360, a: .5 }); });
    L(ctx, c, 1, () => { capitol(ctx, t); for (let i = 0; i < 7; i++) { const x = 450 + i * 70; person(ctx, x, 206, .22, t, ROMANS[i % 3], { pose: i % 3 === 0 ? 'point' : 'hold', face: i < 4 ? -1 : 1, prop: spear }); } });
    C.finish(ctx, t, 'sunset', { leakX: 1100 }); cap(ctx, 'the Romans who could held out', t, 'romans', { size: 26 }); cap(ctx, 'on the Capitoline Hill', t, 'capitoline', { size: 24, y: 686 }); }
  // 6. legend: the Gauls tried to sneak up the cliff at night
  function sClimb(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, y: 40 }, { z: 1.1, y: -20 }), k = clamp(lt / dur);
    L(ctx, c, .04, () => { C.sky(ctx, 'night', t, { horizon: 520, sunDisc: false, seed: 441, clouds: 3 }); ctx.fillStyle = '#f4f0dc'; ctx.beginPath(); ctx.arc(1120, 120, 44, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(244,240,220,.12)'; ctx.beginPath(); ctx.arc(1120, 120, 120, 0, 7); ctx.fill(); for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(255,255,240,${.4 + .4 * Math.sin(t * 2 + i)})`; ctx.fillRect((i * 211) % 1280, (i * 97) % 400, 2, 2); } });
    L(ctx, c, 1, () => { capitol(ctx, t, { night: true }); for (let i = 0; i < 5; i++) { const u = clamp(k * 1.1 - i * .12), x = 340 + i * 26 + u * 40, y = lerp(740, 300, u) + i * 30; person(ctx, x, y, .2, t, GAUL(i), { pose: 'up', face: 1, filter: true }); }
      ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(420, 250); ctx.quadraticCurveTo(380, 500, 360, 760); ctx.stroke(); for (let i = 0; i < 4; i++) person(ctx, 520 + i * 120, 206, .18, t, ROMANS[i % 3], { pose: 'stand', face: 1, eyes: 'closed', prop: spear }); });
    P.grade(ctx, '#1a2a5a', .35); C.finish(ctx, t, 'storm', { leak: false, vig: .6, sat: 1.1 }); cap(ctx, 'legend says the Gauls tried to sneak up the cliff at night', t, 'legend', { size: 24 }); }
  // 7. …but the sacred geese of Juno started honking and woke the defenders
  function sGeese(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08, y: 20 });
    L(ctx, c, .1, () => { C.sky(ctx, 'night', t, { horizon: 400, sunDisc: false, seed: 451, clouds: 3 }); ctx.fillStyle = '#f4f0dc'; ctx.beginPath(); ctx.arc(180, 110, 36, 0, 7); ctx.fill(); });
    L(ctx, c, 1, () => { // the temple of Juno's porch: columns, a torch bracket, the paved court with the sacred geese
      ctx.fillStyle = '#5a5262'; ctx.fillRect(-200, 520, 1700, 400); ctx.strokeStyle = 'rgba(20,16,24,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(i * 90 - 100, 520); ctx.lineTo(i * 110 - 300, 760); ctx.stroke(); }
      const y = C.site(ctx, 900, 560, 520, t, { podium: 30, steps: false, bushes: false, stone: '#8a8294', seed: 8 }); ctx.save(); ctx.filter = 'brightness(.55)'; P.temple(ctx, 900, y, .7, { roof: '#8a5a4a' }); ctx.restore();
      torch(ctx, 600, 470, t); ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(604, 396, 10, 604, 396, 420); g.addColorStop(0, 'rgba(255,170,80,.55)'); g.addColorStop(1, 'rgba(255,170,80,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (const [gx, gy, s, f] of [[330, 640, .9, false], [470, 680, 1.0, true], [620, 650, .85, false], [180, 690, 1.05, true]]) goose(ctx, gx, gy, s, t, { honk: since(t, 'honking') > -.3, flip: f });
      const wake = clamp((t - A.woke + .2) / .5); person(ctx, 1060, 700, .5, t, ROMANS[1], { pose: wake > 0 ? 'point' : 'stand', face: -1, eyes: wake > 0 ? 'wide' : 'closed', mouth: wake > 0 ? 'o' : 'flat', prop: wake > 0 ? null : spear }); });
    P.grade(ctx, '#1a2a5a', .25); C.finish(ctx, t, 'storm', { leak: false, vig: .55 }); cap(ctx, 'the sacred geese of Juno started honking', t, 'geese', { size: 26 }); cap(ctx, 'and woke the defenders', t, 'woke', { size: 24, y: 686 }); }
  // 8. did that really happen? who can say. That's how the story goes. (a goose looks at us)
  function sReally(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.1 });
    L(ctx, c, .5, () => { const g = ctx.createRadialGradient(640, 360, 50, 640, 360, 800); g.addColorStop(0, '#3a3a5a'); g.addColorStop(1, '#14141e'); ctx.fillStyle = g; ctx.fillRect(-200, -200, 1700, 1200); ctx.fillStyle = '#4a4458'; ctx.fillRect(-200, 560, 1700, 400); });
    L(ctx, c, 1, () => goose(ctx, 640, 640, 3.2, t, { honk: Math.floor(t * 1.2) % 3 === 0 }));
    C.finish(ctx, t, 'storm', { leak: false, vig: .6 }); cap(ctx, 'did that really happen?', t, 'really', { size: 30 }); cap(ctx, '…that\'s how the story goes', t, 'goes', { size: 24, y: 686 }); }
  // 9. better documented: the Romans paid the Gauls off in gold to go away
  function sGold(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.08, x: 20 }), fill = clamp((t - A.paid + .4) / 2.5);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 420, sun: [980, 300], sunR: 44, seed: 461 })); L(ctx, c, .25, () => { C.mounds(ctx, { y: 430, n: 5, seed: 462, col: '#7a8a5a', far: .4, sunX: 980, t, w: 560, h: 90, copses: 1 }); for (let i = 0; i < 6; i++) { house(ctx, 80 + i * 220, 470, .26, i, { burnt: i % 2 === 0 }); } });
    L(ctx, c, 1, () => { C.meadow(ctx, 480, 800, t, { col: '#8a9a44', n: 160, flowers: 10 });
      // the great balance: a post, a beam tipping as the gold piles up, two pans on chains; gold bars stacked in the left pan
      const tilt = (fill - .5) * .12; ink(ctx, '#6a4a2c', cc => cc.rect(630, 360, 20, 340), 3); cel(ctx, cc => cc.rect(600, 690, 80, 20), '#7a5232', { shade: '#5a3a20', dx: 0, dy: 5, lw: 3 });
      ctx.save(); ctx.translate(640, 370); ctx.rotate(tilt); ink(ctx, '#8a6a3a', cc => cc.rect(-240, -8, 480, 16), 3); for (const d of [-1, 1]) { const px = d * 230; ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 3; for (const e of [-50, 50]) { ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px + e, 150); ctx.stroke(); } ctx.save(); ctx.translate(px, 150); ctx.rotate(-tilt);
        cel(ctx, cc => { cc.moveTo(-70, 0); cc.lineTo(70, 0); cc.quadraticCurveTo(50, 30, 0, 32); cc.quadraticCurveTo(-50, 30, -70, 0); cc.closePath(); }, '#b8893a', { shade: '#86602e', light: '#e0b860', dx: 0, dy: 6, lw: 3 });
        if (d < 0) { const n = Math.round(fill * 9); for (let i = 0; i < n; i++) cel(ctx, cc => cc.rect(-54 + (i % 3) * 36, -16 - Math.floor(i / 3) * 14, 34, 14), '#f0c040', { shade: '#b8892a', light: '#fff0a0', dx: 3, dy: 3, lw: 2 }); } else { for (let i = 0; i < 3; i++) cel(ctx, cc => cc.rect(-40 + i * 28, -18, 26, 18), '#8a8a92', { shade: '#5a5a62', dx: 3, dy: 3, lw: 2 }); } ctx.restore(); } ctx.restore();
      // the Roman tribune paying out of a chest; the Gaulish chief watching with his sword; warriors behind
      cel(ctx, cc => cc.rect(240, 640, 120, 70), '#7a5232', { shade: '#5a3a20', light: '#9a6a42', dx: 10, dy: 0, lw: 3 }); for (let i = 0; i < 5; i++) cel(ctx, cc => cc.rect(250 + i * 20, 628, 18, 12), '#f0c040', { shade: '#b8892a', dx: 2, dy: 2, lw: 1.5 });
      person(ctx, 180, 710, .52, t, TRIBUNE, { pose: 'hold', face: 1, prop: (cc, x, y) => cel(cc, c2 => c2.rect(x - 14, y - 8, 28, 12), '#f0c040', { shade: '#b8892a', dx: 2, dy: 2, lw: 1.5 }), brow: 'sad', mouth: 'frown' });
      person(ctx, 1040, 710, .56, t, BRENNUS, { pose: 'hold', face: -1, prop: longsword, mouth: 'grin', brow: 'angry' }); gShield(ctx, 1110, 610, .5, '#a8322a'); for (let i = 0; i < 3; i++) person(ctx, 1150 + i * 50, 690 - i * 10, .4, t, GAUL(i + 2), { pose: 'hold', face: -1, prop: spear }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 8 })); C.rays(ctx, 980, 300, t, .08); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'better documented: the ending', t, 'documented', { size: 24 }); cap(ctx, 'the Romans reportedly paid the Gauls off in gold to go away', t, 'paid', { size: 22, y: 686 }); }
  // 10–11. Rome should have died right here… it didn't: the burnt city at dawn; then people come back and start rebuilding
  function ruins(ctx, lt, dur, t, rebuild) { const c = C.cam(lt, dur, rebuild ? { z: 1.04 } : { z: 1.1, y: 10 }, rebuild ? { z: 1.0 } : { z: 1.04 }), dawn = rebuild ? clamp(lt / dur) : 0;
    L(ctx, c, .04, () => C.sky(ctx, rebuild ? 'golden' : 'storm', t, { horizon: 420, sun: [640, 380 - dawn * 80], sunR: rebuild ? 50 : 0, sunDisc: rebuild, seed: 471, clouds: 5 }));
    L(ctx, c, .3, () => { const r = C.mound(ctx, 640, 520, 1500, 150, { col: rebuild ? '#6a7a40' : '#4a4a3a', sunX: 640, t, copses: 0, seed: 472 }); for (let i = 0; i < 12; i++) { const hx = -20 + i * 116; house(ctx, hx, C.footY(r, hx, 60) + 18, .26, i, { burnt: !rebuild || i % 2 === 0 }); } });
    L(ctx, c, 1, () => { ctx.fillStyle = rebuild ? '#8a7a5a' : '#4a3e32'; ctx.fillRect(-300, 560, 1900, 400); for (let i = 0; i < 18; i++) P.rock(ctx, (i * 173) % 1300, 600 + (i * 61) % 140, 10 + (i % 4) * 6, rebuild ? '#a89a80' : '#6a6058');
      house(ctx, 220, 620, .7, 3, { burnt: true }); house(ctx, 1060, 620, .7, 6, { burnt: !rebuild });
      if (!rebuild) { C.smoke(ctx, 220, 540, 1.3, t, { h: 360, a: .5, col: '80,74,74' }); person(ctx, 640, 690, .5, t, CIVIL[0], { pose: 'chin', face: 1, eyes: 'half', brow: 'sad', mouth: 'frown' }); }
      else { // a timber frame going up where the house burned; people carrying beams and tiles
        ctx.strokeStyle = INK; ctx.lineWidth = 9; for (const x of [140, 300]) { ctx.beginPath(); ctx.moveTo(x, 620); ctx.lineTo(x, 470); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(120, 470); ctx.lineTo(320, 470); ctx.stroke(); ctx.strokeStyle = '#a87a4a'; ctx.lineWidth = 5; for (const x of [140, 300]) { ctx.beginPath(); ctx.moveTo(x, 620); ctx.lineTo(x, 470); ctx.stroke(); }
        person(ctx, 520, 690, .46, t, CIVIL[2], { pose: 'carry', face: 1, walk: true, prop: (cc, x, y) => ink(cc, '#a87a4a', c2 => c2.rect(x - 60, y - 6, 140, 12), 2.5) }); person(ctx, 700, 700, .46, t, CIVIL[4], { pose: 'strike', face: -1, prop: (cc, x, y) => { ink(cc, '#6a6a72', c2 => c2.rect(x - 12, y - 70, 30, 16), 2.5); cc.strokeStyle = INK; cc.lineWidth = 5; cc.beginPath(); cc.moveTo(x, y); cc.lineTo(x + 2, y - 56); cc.stroke(); } }); person(ctx, 860, 690, .44, t, CIVIL[3], { pose: 'carry', face: -1, prop: (cc, x, y) => { for (let i = 0; i < 3; i++) ink(cc, '#c0643a', c2 => c2.rect(x - 20, y - 10 - i * 8, 40, 8), 1.5); } }); person(ctx, 380, 700, .4, t, CIVIL[0], { pose: 'point', face: 1 }); } });
    if (rebuild) { C.rays(ctx, 640, 300, t, .1); C.finish(ctx, t, 'golden', { leakX: 640 }); } else { P.grade(ctx, '#6a6a7a', .25, 'saturation'); C.finish(ctx, t, 'storm', { leak: false, vig: .6, sat: .8 }); } }
  const sDied = (ctx, lt, dur, t) => { ruins(ctx, lt, dur, t, false); cap(ctx, 'Rome should have died right here', t, 'died', { size: 30 }); };
  const sDidnt = (ctx, lt, dur, t) => { ruins(ctx, lt, dur, t, true); cap(ctx, 'it didn\'t', t, 'didnt', { size: 36, x: 640, y: 120, align: 'center' }); };
  // 12. it learned a lesson it never forgot: quarrying great blocks of tufa
  function sQuarry(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.08, x: 30 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 300, sun: [1100, 200], sunR: 40, seed: 481, clouds: 4 }));
    L(ctx, c, 1, () => { // the quarry face: stepped cuts in yellow tufa, blocks being split off and levered onto rollers
      cel(ctx, cc => { cc.moveTo(-200, 300); cc.lineTo(1500, 300); cc.lineTo(1500, 800); cc.lineTo(-200, 800); cc.closePath(); }, '#d8b06a', { shade: '#a8803a', dx: 0, dy: 0, lw: 0 }); for (let s = 0; s < 4; s++) { const y = 340 + s * 90, x0 = 100 + s * 120; cel(ctx, cc => cc.rect(x0, y, 1400, 90), ['#d8b06a', '#cca460', '#c09656', '#b48a4c'][s], { shade: '#8a6a34', light: '#e8c47e', dx: 0, dy: 12, lw: 3.5 }); ctx.strokeStyle = 'rgba(110,80,40,.5)'; ctx.lineWidth = 2; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.moveTo(x0 + k * 100 + (s % 2) * 50, y); ctx.lineTo(x0 + k * 100 + (s % 2) * 50, y + 90); ctx.stroke(); } }
      for (let i = 0; i < 4; i++) cel(ctx, cc => cc.rect(780 + i * 110, 640 - (i % 2) * 6, 100, 60), '#e0b870', { shade: '#a8803a', light: '#f0d090', dx: 8, dy: 6, lw: 3 }); for (let i = 0; i < 3; i++) ink(ctx, '#8a6040', cc => cc.ellipse(800 + i * 140, 704, 40, 8, 0, 0, 7), 2.5);
      person(ctx, 380, 520, .38, t, CIVIL[4], { pose: 'strike', face: 1, prop: (cc, x, y) => { ink(cc, '#6a6a72', c2 => c2.rect(x - 12, y - 70, 30, 16), 2.5); cc.strokeStyle = INK; cc.lineWidth = 5; cc.beginPath(); cc.moveTo(x, y); cc.lineTo(x + 2, y - 56); cc.stroke(); } }); chisel(ctx, 430, 500);
      person(ctx, 640, 700, .46, t, CIVIL[2], { pose: 'pry', face: 1 }); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(680, 620); ctx.lineTo(780, 660); ctx.stroke(); person(ctx, 1220, 700, .44, t, CIVIL[0], { pose: 'point', face: -1 }); });
    C.motes(ctx, t, 30, '255,230,170'); C.finish(ctx, t, 'golden'); cap(ctx, 'Rome learned a lesson it never forgot', t, 'learned', { size: 26 }); cap(ctx, 'never let anyone walk in again', t, 'never', { size: 26, y: 686 }); }
  // 13. a massive stone wall around the city in the following decades (the so-called Servian Wall)
  function cityWall(ctx, t, k, o = {}) { const r = C.mound(ctx, 640, 600, 1600, 240, { col: '#6e9440', sunX: 1000, t, copses: 0, seed: 491 });
    for (let i = 0; i < 16; i++) { const hx = 40 + i * 78; house(ctx, hx, C.footY(r, hx, 60) + 20, .24, i); } const ty = C.site(ctx, 640, 170, x => r(x) + 10, t, { podium: 14, steps: false, bushes: false, seed: 4 }); P.temple(ctx, 640, ty, .3, { roof: '#c87a4a' });
    // the wall follows the slope below the houses, built course by course from left to right
    const wy = x => r(x) + 120; ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, 200 + 1480 * k, 800); ctx.clip();
    ctx.beginPath(); ctx.moveTo(-100, wy(-100) - 90); for (let x = -100; x <= 1400; x += 20) ctx.lineTo(x, wy(x) - 90); for (let x = 1400; x >= -100; x -= 20) ctx.lineTo(x, wy(x)); ctx.closePath(); ctx.fillStyle = '#d8bc8a'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
    ctx.strokeStyle = 'rgba(90,64,34,.55)'; ctx.lineWidth = 2; for (let row = 1; row < 5; row++) { ctx.beginPath(); for (let x = -100; x <= 1400; x += 20) ctx.lineTo(x, wy(x) - row * 18); ctx.stroke(); } for (let x = -100; x <= 1400; x += 44) for (let row = 0; row < 5; row++) { const xx = x + (row % 2) * 22; ctx.beginPath(); ctx.moveTo(xx, wy(xx) - row * 18); ctx.lineTo(xx, wy(xx) - row * 18 - 18); ctx.stroke(); }
    for (const tx of [120, 520, 920, 1260]) { cel(ctx, cc => cc.rect(tx - 40, wy(tx) - 150, 80, 150), '#ccb080', { shade: '#9a7a50', light: '#e8d0a0', dx: 12, dy: 0, lw: 3.5 }); for (let m = 0; m < 3; m++) ctx.fillStyle = '#ccb080', ctx.fillRect(tx - 40 + m * 30, wy(tx) - 166, 20, 16); }
    ctx.restore(); return wy; }
  function sWall(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06, y: 10 }), k = clamp((t - A.built + .3) / 3);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 420, sun: [1000, 280], sunR: 44, seed: 492 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 430, n: 5, seed: 493, col: '#8aa070', far: .45, sunX: 1000, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, 1, () => { cityWall(ctx, t, k); C.meadow(ctx, 680, 800, t, { col: '#8aa244', n: 120, flowers: 30 }); for (let i = 0; i < 3; i++) person(ctx, 140 + i * 90 + k * 900, 714, .3, t, CIVIL[i + 1], { pose: i === 1 ? 'carry' : 'walk', face: 1, prop: i === 1 ? (cc, x, y) => cel(cc, c2 => c2.rect(x - 24, y - 20, 48, 26), '#d8bc8a', { shade: '#a08050', dx: 3, dy: 3, lw: 2 }) : null }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 10 })); C.rays(ctx, 1000, 280, t, .08); C.finish(ctx, t, 'golden');
    cap(ctx, 'a massive stone wall around the city', t, 'wall', { size: 26 }); cap(ctx, 'in the following decades · 4th century BC', t, 'decades', { size: 22, y: 686 }); }
  // 14. for the next 800 years, no foreign army got inside Rome: a counter runs while war bands come and turn away from the wall
  function sStreak(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06 }, { z: 1.0 }), k = clamp((t - A.eight + .2) / 3.2);
    L(ctx, c, .04, () => C.sky(ctx, ['golden', 'dawn', 'sunset', 'golden'][Math.floor(lt / .9) % 4], t, { horizon: 420, sun: [1000, 280], sunR: 44, seed: 501 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 430, n: 5, seed: 502, col: '#8aa070', far: .45, sunX: 1000, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, 1, () => { const wy = cityWall(ctx, t, 1); C.meadow(ctx, 680, 800, t, { col: '#8aa244', n: 120, flowers: 20 }); const ph = (lt * .45) % 1; for (let i = 0; i < 6; i++) { const x = ph < .5 ? lerp(-60, 420, ph * 2) - i * 46 : lerp(420, -60, (ph - .5) * 2) - i * 46; person(ctx, x, 720 - (i % 2) * 8, .26, t, GAUL(i), { pose: 'walk', face: ph < .5 ? 1 : -1, prop: spear }); } });
    C.finish(ctx, t, 'golden'); const yr = Math.round(lerp(-390, 410, k)); ctx.save(); ctx.font = '700 64px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(40,24,14,.85)'; ctx.lineJoin = 'round'; const txt = yr < 0 ? `${-yr} BC` : `AD ${Math.max(1, yr)}`; ctx.strokeText(txt, 640, 120); ctx.fillStyle = '#f6e2b0'; ctx.fillText(txt, 640, 120); ctx.restore();
    cap(ctx, 'for the next 800 years', t, 'eight', { size: 26, y: 640 }); cap(ctx, 'no foreign army got inside Rome', t, 'army', { size: 26, y: 686 }); }
  // 15. that 800-year streak will matter later — keep it in your pocket
  function sPocket(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 20 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 460, sun: [1000, 300], sunR: 40, seed: 511 })); L(ctx, c, .3, () => { C.mounds(ctx, { y: 470, n: 5, seed: 512, col: '#8aa070', far: .4, sunX: 1000, t, w: 560, h: 90, copses: 2 }); });
    L(ctx, c, 1, () => { C.meadow(ctx, 500, 800, t, { col: '#8aa244', n: 160, flowers: 30 }); const k = clamp((t - A.pocket + .8) / 1);
      person(ctx, 640, 720, .9, t, CIVIL[2], { pose: 'hold', face: 1, eyes: k > .9 ? 'happy' : 'open', mouth: 'smile', prop: (cc, x, y) => { if (k < .9) { cc.save(); cc.translate(x, y - 20); cc.scale(-1, 1); cc.rotate(-.3); ink(cc, '#efe0bc', c2 => c2.rect(-30, -12, 60, 24), 2.5); cc.fillStyle = '#6a2a1a'; cc.font = '700 13px "Liberation Serif", serif'; cc.textAlign = 'center'; cc.fillText('800 yrs', 0, 5); cc.restore(); } } });
      cel(ctx, cc => cc.ellipse(612, 520, 36, 30, 0, 0, 7), '#8a6a44', { shade: '#5a3e28', dx: 4, dy: 4, lw: 3 }); });
    C.motes(ctx, t); C.finish(ctx, t, 'golden'); cap(ctx, 'that 800-year streak is going to matter later', t, 'streak', { size: 26 }); cap(ctx, 'keep it in your pocket', t, 'pocket', { size: 28, y: 686 }); }

  const cut = [[0, sMap, 0], [A.war - .3, sBattle, .4], [A.walked - .2, sGate, .4], [A.looted - .3, sBurn, .4], [A.romans - .2, sCapitol, .5], [A.legend - .5, sClimb, .5],
    [A.geese - .6, sGeese, .4], [A.really - .2, sReally, .4], [A.documented - .3, sGold, .5], [A.died - .6, sDied, .5], [A.didnt - .3, sDidnt, .4], [A.learned - .4, sQuarry, .5],
    [A.built - .5, sWall, .5], [A.eight - .4, sStreak, .5], [A.streak - .6, sPocket, .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: .2, type: 'wind', gain: .3 }, { t: A.war, type: 'boom', gain: .35 }, { t: A.smashed, type: 'clang', gain: .4 }, { t: A.smashed + .4, type: 'hit', gain: .35 }, { t: A.walked, type: 'thud', gain: .3 },
    { t: A.burned, type: 'rattle', gain: .35 }, { t: A.capitoline, type: 'swell', gain: .3 }, { t: A.sneak, type: 'scratch', gain: .3 }, { t: A.honking, type: 'click', gain: .4 }, { t: A.honking + .3, type: 'click', gain: .35 },
    { t: A.woke, type: 'clang', gain: .3 }, { t: A.gold, type: 'clang', gain: .25 }, { t: A.died, type: 'boom', gain: .35 }, { t: A.didnt, type: 'swell', gain: .45 }, { t: A.learned + .5, type: 'hit', gain: .3 },
    { t: A.wall, type: 'thud', gain: .4 }, { t: A.eight, type: 'whoosh', gain: .3 }, { t: A.pocket, type: 'paper', gain: .35 }];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.legend - .5, mood: 'mystery' }, { t: A.documented - .3, mood: 'tense' }, { t: A.didnt - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat4a.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
