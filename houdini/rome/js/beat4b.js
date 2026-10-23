/* Rome — Beat 4b, "The water bet" (narration-beat4b.mp3 = narration-full.mp3 338.4–445.35 s + pad).
 * A crowded city limited by its water → wells and the river → Appius Claudius, 312 BC: the Aqua Appia, underground → the Appian Way
 * the same year → eleven aqueducts over five centuries (the Aqua Marcia, ~56 miles; ~315 miles in all) → what it meant on the street:
 * fountains and, above all, the baths → the debated delivery estimates → "why so long on a pipe?" → the bet: life on water from far away.
 * Same cast and cinematic kit as Beats 2–4a; everything on real ground; audited per shot before rendering. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const OFF = 338.4;
  const A0 = { now: 338.48, problem: 339.8, crowded: 341.1, city: 342.3, water: 344.22, wells: 345.62, river: 346.24, so: 348.05, three12: 348.65, official: 350.28, appius: 351.14,
    caecus: 352.35, did: 356.23, nobody: 357.03, built: 359.43, channel: 359.73, spring: 360.63, hills: 361.59, ten: 362.28, straight: 363.41, called: 365.4, aqua: 366.03, almost: 367.38,
    underground: 368.51, enemy: 370.4, same: 372.1, road: 373.17, appian: 374.54, hand: 376.54, highway: 377.65, plan: 381.1, worked: 382.14, five: 385.75, eleven: 387.77, fifty: 390.91,
    longest: 392.41, marcia: 393.55, fiftysix: 394.81, together: 396.57, three15: 398.52, heres: 401.49, standing: 402.93, water2: 404.32, fountains: 406.8, corners: 407.84, above: 408.81,
    drink: 412.64, baths: 415.05, afternoon: 416.56, pocket: 417.44, estimates: 419.29, hundreds: 421.06, engineers: 424.64, exaggerated: 427.06, thinking: 429.26, pipe: 430.34, why: 431.1,
    because: 433.61, decide: 435.38, lives: 436.49, dies: 437.29, every: 438.48, betting: 440.36, life: 440.87, away: 443.43, remember: 444.36 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 107.95;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };

  // ---------- cast ----------
  const CIVIL = [{ kind: 'toga', hair: '#3a2416', hairStyle: 'short', seed: 21 }, { kind: 'toga', hair: '#8a8a84', hairStyle: 'bald', seed: 22 }, { kind: 'tunic', cloth: '#b86a4a', hair: '#2a1a14', hairStyle: 'curly', seed: 23 },
    { kind: 'stola', cloth: '#c86a5a', cloth2: '#efe0c0', hairStyle: 'bun', hair: '#1a1410', seed: 26 }, { kind: 'tunic', cloth: '#5a7a9a', hair: '#1a1410', hairStyle: 'short', seed: 25 }, { kind: 'woman', cloth: '#a88a6a', scarf: '#d8c8a8', hair: '#3a2416', seed: 27 },
    { kind: 'tunic', cloth: '#8a9a5a', hair: '#5a3a24', hairStyle: 'short', beard: true, seed: 28 }, { kind: 'stola', cloth: '#5a8aa8', cloth2: '#efe0c0', hairStyle: 'long', hair: '#3a2416', seed: 29 }];
  const WORK = i => ({ kind: 'tunic', cloth: ['#9a7a54', '#7a6a4a', '#a8845a', '#6a7a8a'][i % 4], hair: ['#2a1a14', '#4a3020', '#1a1410', '#3a2a1a'][i % 4], hairStyle: i % 2 ? 'curly' : 'short', beard: i % 3 === 0, seed: 80 + i });
  const APPIUS = { kind: 'toga', trim: '#7a2a62', hair: '#a8a8a0', hairStyle: 'bald', beard: true, beardCol: '#b8b8b0', seed: 90 };
  const person = (ctx, x, y, s, t, base, o) => P.person(ctx, x, y, s, t, Object.assign({}, base, o || {}));

  // ---------- props ----------
  const jug = (ctx, x, y) => cel(ctx, c => { c.moveTo(x - 8, y - 46); c.quadraticCurveTo(x - 26, y - 20, x - 6, y + 8); c.lineTo(x + 6, y + 8); c.quadraticCurveTo(x + 26, y - 20, x + 8, y - 46); c.closePath(); }, '#c8784a', { shade: '#8a4a2a', dx: 5, dy: 3, lw: 3 });
  const spade = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30, y + 150); ctx.stroke(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 4.5; ctx.stroke(); ctx.restore(); ink(ctx, '#7a5a3a', c => { c.moveTo(x - 46, y + 146); c.lineTo(x - 14, y + 146); c.lineTo(x - 22, y + 186); c.lineTo(x - 42, y + 186); c.closePath(); }, 3); };
  const basket = (ctx, x, y) => { cel(ctx, c => { c.moveTo(x - 30, y - 34); c.lineTo(x + 30, y - 34); c.lineTo(x + 22, y + 4); c.lineTo(x - 22, y + 4); c.closePath(); }, '#b8884e', { shade: '#86602e', dx: 5, dy: 0, lw: 3 }); };
  const hammer = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 4, y - 60); ctx.stroke(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); ink(ctx, '#6a6a72', c => c.rect(x - 14, y - 76, 36, 18), 3); };
  const plan = (ctx, x, y) => { ink(ctx, '#efe0bc', c => c.rect(x - 34, y - 26, 68, 46), 2.5); ctx.strokeStyle = '#4a98d0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 26, y - 14); ctx.quadraticCurveTo(x, y + 4, x + 26, y + 10); ctx.stroke(); };
  const coin = (ctx, x, y) => cel(ctx, c => c.arc(x, y - 6, 8, 0, 7), '#c8963a', { shade: '#8a6420', light: '#f0c870', dx: 2, dy: 2, lw: 2 });
  const spear = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + 60); ctx.lineTo(x + 8, y - 150); ctx.stroke(); ctx.restore(); ink(ctx, '#c8ccd4', c => { c.moveTo(x + 8, y - 176); c.lineTo(x + 17, y - 146); c.lineTo(x - 1, y - 146); c.closePath(); }, 2.5); };
  const GAUL = i => ({ kind: 'tunic', cloth: ['#3a6a4a', '#6a4a8a', '#8a6a2a'][i % 3], legs: ['#a8322a', '#3a5a3a', '#5a4a7a'][(i + 1) % 3], hair: ['#c8a050', '#a85a28', '#e0c070'][i % 3], hairStyle: 'long', beard: true, beardCol: ['#c8a050', '#a85a28', '#e0c070'][i % 3], seed: 60 + i });

  // ---------- buildings ----------
  function house(ctx, x, y, s, seed = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = C.rng(seed + 1), w = o.w ?? (150 + R() * 60), h = o.h ?? (90 + R() * 40), wall = ['#e8d0a8', '#dcc094', '#efdcbc', '#e4c8a0'][seed % 4];
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(12, 2, w * .62, 12, 0, 0, 7); ctx.fill();
    cel(ctx, c => c.rect(-w / 2, -h, w, h), wall, { shade: mix(wall, '#6a4a30', .3), light: mix(wall, '#ffffff', .25), dx: w * .2, dy: 0, lw: 4 });
    cel(ctx, c => { c.moveTo(-w / 2 - 14, -h); c.lineTo(-w * .2, -h - 44); c.lineTo(w * .2, -h - 44); c.lineTo(w / 2 + 14, -h); c.closePath(); }, '#c0643a', { shade: '#8a4024', light: '#d8805a', dx: 10, dy: 0, lw: 4 });
    ink(ctx, '#3a2414', c => c.rect(-18, -58, 36, 58), 3); for (let f = 1; f < Math.floor(h / 50); f++) for (const wx of [-w * .32, w * .2]) ink(ctx, '#3a2414', c => c.rect(wx, -h + 16 + (f - 1) * 50, 20, 22), 2.5);
    ctx.restore(); }
  // a multi-storey apartment block (insula) for the crowded city: shops below, balconies, washing
  function insula(ctx, x, y, s, seed = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const w = 220, h = 300, wall = ['#d8a878', '#e0b888', '#c8946a'][seed % 3];
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(12, 2, 140, 14, 0, 0, 7); ctx.fill();
    cel(ctx, c => c.rect(-w / 2, -h, w, h), wall, { shade: mix(wall, '#5a3a24', .3), light: mix(wall, '#fff', .2), dx: 30, dy: 0, lw: 4 }); cel(ctx, c => { c.moveTo(-w / 2 - 12, -h); c.lineTo(-w * .3, -h - 40); c.lineTo(w * .3, -h - 40); c.lineTo(w / 2 + 12, -h); c.closePath(); }, '#b8583a', { shade: '#8a3a24', dx: 10, dy: 0, lw: 4 });
    for (let i = 0; i < 3; i++) { ink(ctx, '#3a2414', c => c.rect(-w / 2 + 14 + i * 70, -62, 54, 62), 3); cel(ctx, c => { c.moveTo(-w / 2 + 8 + i * 70, -68); c.lineTo(-w / 2 + 74 + i * 70, -68); c.lineTo(-w / 2 + 70 + i * 70, -52); c.lineTo(-w / 2 + 12 + i * 70, -52); c.closePath(); }, ['#c8423a', '#3a6a9a', '#d8a030'][(i + seed) % 3], { dx: 0, dy: 4, lw: 2 }); }
    for (let f = 0; f < 3; f++) { for (let i = 0; i < 4; i++) ink(ctx, '#3a2414', c => c.rect(-w / 2 + 18 + i * 52, -h + 24 + f * 72, 22, 30), 2.5); ink(ctx, '#7a5232', c => c.rect(-w / 2 - 6, -h + 64 + f * 72, w + 12, 8), 2); }
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-w / 2 + 20, -h + 120); ctx.quadraticCurveTo(0, -h + 136, w / 2 - 20, -h + 120); ctx.stroke(); for (let i = 0; i < 4; i++) { const cx = -60 + i * 40, sw = Math.sin(t * 2 + i) * 3; ink(ctx, ['#f4efe2', '#c8423a', '#8ab0d0', '#e8c870'][i], c => c.rect(cx + sw, -h + 126, 22, 26), 1.5); }
    ctx.restore(); }
  // an arched aqueduct: level water channel on top, arches standing on the ground g(x) below; o.tiers 1|2
  function aqueduct(ctx, x0, x1, top, g, t, o = {}) { const bay = o.bay ?? 90, pier = bay * .22, stone = o.stone || '#d8bc8a', sh = mix(stone, '#6a4a30', .32), fade = o.far || 0, col = mix(stone, o.haze || '#f4d6a6', fade), csh = mix(sh, o.haze || '#f4d6a6', fade);
    const lw = Math.max(1.2, 3.5 * (1 - fade * .6));
    for (let x = x0; x < x1; x += bay) { const gl = g(x), gr = g(x + bay), r = bay / 2 - pier, spring = Math.min(top + 30 + r, Math.max(gl, gr) - 10);
      ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x + bay, top); ctx.lineTo(x + bay, gr + 6); ctx.lineTo(x + bay - pier, g(x + bay - pier) + 6); ctx.lineTo(x + bay - pier, spring); ctx.arc(x + bay / 2, spring, r, 0, Math.PI, true); ctx.lineTo(x + pier, g(x + pier) + 6); ctx.lineTo(x, gl + 6); ctx.closePath();
      ctx.fillStyle = col; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = csh; ctx.fillRect(x + bay - pier * .55, top, pier, 900); ctx.strokeStyle = `rgba(90,64,34,${.4 * (1 - fade)})`; ctx.lineWidth = 1.5; for (let yy = top + 14; yy < Math.max(gl, gr); yy += 16) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + bay, yy); ctx.stroke(); } ctx.restore();
      ctx.strokeStyle = `rgba(43,29,22,${1 - fade * .6})`; ctx.lineWidth = lw; ctx.stroke();
      for (let i = 0; i < 7; i++) { const a = Math.PI + i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(x + bay / 2 + Math.cos(a) * r, spring + Math.sin(a) * r); ctx.lineTo(x + bay / 2 + Math.cos(a) * (r + 12), spring + Math.sin(a) * (r + 12)); ctx.lineWidth = lw * .5; ctx.stroke(); } }
    // the covered channel (specus) along the top
    ctx.fillStyle = mix('#c8a878', o.haze || '#f4d6a6', fade); ctx.fillRect(x0 - 4, top - 22, x1 - x0 + 8, 22); ctx.strokeStyle = `rgba(43,29,22,${1 - fade * .6})`; ctx.lineWidth = lw; ctx.strokeRect(x0 - 4, top - 22, x1 - x0 + 8, 22);
    ctx.fillStyle = mix('#efe0c0', o.haze || '#f4d6a6', fade); ctx.fillRect(x0 - 8, top - 30, x1 - x0 + 16, 10); ctx.strokeRect(x0 - 8, top - 30, x1 - x0 + 16, 10); }
  // a street fountain (lacus): a stone basin fed by a spout in a carved stele, water arcing into it
  function fountain(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    cel(ctx, c => c.rect(-30, -210, 60, 150), '#d8ccb0', { shade: '#a89a78', light: '#efe6d2', dx: 10, dy: 0, lw: 3.5 }); cel(ctx, c => c.arc(0, -170, 22, 0, 7), '#c8b890', { shade: '#988a68', dx: 4, dy: 4, lw: 3 }); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -162, 5, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(160,210,240,.9)'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -162); ctx.quadraticCurveTo(40, -150, 54, -76); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.lineDashOffset = -t * 60; ctx.stroke(); ctx.setLineDash([]);
    cel(ctx, c => c.rect(-120, -80, 240, 80), '#d8ccb0', { shade: '#a89a78', light: '#efe6d2', dx: 0, dy: 10, lw: 4 }); ctx.save(); ctx.beginPath(); ctx.rect(-110, -76, 220, 18); ctx.clip(); C.water(ctx, -110, -76, 110, -58, t, { pal: 'dawn', glint: false, n: 10 }); ctx.restore();
    for (let i = 0; i < 3; i++) { const ph = (t * 1.6 + i * .33) % 1; ctx.strokeStyle = `rgba(255,255,255,${1 - ph})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(54, -70, 6 + ph * 20, 2 + ph * 5, 0, 0, 7); ctx.stroke(); } ctx.restore(); }

  // ---------- shots ----------
  // 1. Rome has a different problem: it's getting crowded (a packed street of shops and apartment blocks)
  function sCrowded(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -40 }, { z: 1.08, x: 40 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 300, sun: [1100, 200], sunR: 40, seed: 601 }));
    L(ctx, c, .3, () => { const r = C.mound(ctx, 640, 420, 1800, 160, { col: '#7e9a48', sunX: 1100, t, copses: 0, seed: 602 }); for (let i = 0; i < 18; i++) { const hx = -100 + i * 90; house(ctx, hx, C.footY(r, hx, 60) + 16, .26, i); } });
    L(ctx, c, .7, () => { for (let i = 0; i < 6; i++) insula(ctx, -60 + i * 260, 600, .9, i, t); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 600, 1900, 300); ctx.strokeStyle = 'rgba(100,80,50,.4)'; ctx.lineWidth = 2; for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.moveTo(i * 80 - 300, 600); ctx.lineTo(i * 100 - 500, 760); ctx.stroke(); }
      for (let i = 0; i < 14; i++) { const dir = i % 2 ? 1 : -1, x = ((i * 137 + t * 40 * dir) % 1600 + 1600) % 1600 - 160; person(ctx, x, 640 + (i % 4) * 26, .3 + (i % 4) * .03, t, CIVIL[i % 8], { pose: i % 5 === 0 ? 'carry' : 'walk', face: dir, prop: i % 5 === 0 ? jug : null }); } });
    C.motes(ctx, t); C.finish(ctx, t, 'golden'); cap(ctx, 'now Rome has a different problem', t, 'now', { size: 26 }); cap(ctx, 'it\'s getting crowded', t, 'crowded', { size: 28, y: 686 }); }
  // 2. the city can only grow as big as its water: the hill town seen wide, a water-level gauge beside it
  function sGauge(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 430, sun: [1000, 300], sunR: 44, seed: 611 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 440, n: 5, seed: 612, col: '#8aa070', far: .4, sunX: 1000, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, .6, () => { C.meadow(ctx, 470, 800, t, { col: '#8aa244', n: 160, flowers: 30 }); const r = C.mound(ctx, 520, 640, 1000, 220, { col: '#6e9440', sunX: 1000, t, copses: 0, seed: 613 }); for (let i = 0; i < 12; i++) { const hx = 120 + i * 68; house(ctx, hx, C.footY(r, hx, 50) + 14, .26, i); } C.water(ctx, -400, 680, 1700, 760, t, { sunX: 1000 }); });
    L(ctx, c, 1, () => { // the gauge: a tall glass-like column; the city's size rises with the water inside it
      const k = .25 + .5 * ease.inOut(clamp((t - A.city + .2) / 2)); cel(ctx, cc => cc.rect(1080, 220, 90, 400), '#efe6d2', { shade: '#c8bca8', dx: 8, dy: 0, lw: 4 }); ctx.save(); ctx.beginPath(); ctx.rect(1090, 230, 70, 380); ctx.clip(); C.water(ctx, 1090, 610 - 380 * k, 1160, 610, t, { glint: false, n: 8 }); ctx.restore();
      for (let i = 1; i < 6; i++) { ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 610 - i * 64); ctx.lineTo(1100, 610 - i * 64); ctx.stroke(); } ink(ctx, '#3a6aa8', cc => { cc.moveTo(1125, 170); cc.quadraticCurveTo(1150, 200, 1125, 215); cc.quadraticCurveTo(1100, 200, 1125, 170); cc.closePath(); }, 3); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'a city can only grow as big as its water', t, 'city', { size: 28 }); }
  // 3. wells, cisterns, the river: a woman drawing water at a well, a queue with jars; others hauling up from the muddy Tiber
  function sWells(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.06, x: 30 }), pull = Math.sin(t * 2.2);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 380, sun: [1100, 260], sunR: 40, seed: 621 })); L(ctx, c, .3, () => { for (let i = 0; i < 6; i++) insula(ctx, 60 + i * 240, 470, .6, i, t); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 470, 1900, 400);
      // the well: a stone ring, a wooden frame and pulley, the bucket going up and down
      cel(ctx, cc => cc.rect(380, 560, 160, 90), '#c8b890', { shade: '#988a68', light: '#e0d4b4', dx: 0, dy: 10, lw: 4 }); cel(ctx, cc => cc.ellipse(460, 560, 80, 18, 0, 0, 7), '#3a3028', { shade: '#1a1410', dx: 0, dy: 0, lw: 3 }); for (const px of [392, 528]) ink(ctx, '#7a5232', cc => cc.rect(px - 5, 420, 10, 140), 3); ink(ctx, '#7a5232', cc => cc.rect(380, 412, 160, 12), 3); ink(ctx, '#8a6a44', cc => cc.arc(460, 430, 14, 0, 7), 2.5);
      const by = 520 + pull * 40; ctx.strokeStyle = '#6a5a40'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(460, 444); ctx.lineTo(460, by); ctx.stroke(); cel(ctx, cc => cc.rect(446, by, 28, 24), '#8a6a44', { shade: '#5a4028', dx: 4, dy: 0, lw: 2 });
      person(ctx, 600, 650, .5, t, CIVIL[5], { pose: 'hold', face: -1 }); for (let i = 0; i < 4; i++) person(ctx, 720 + i * 110, 660 - (i % 2) * 6, .46, t, CIVIL[[3, 7, 2, 6][i]], { pose: i % 2 ? 'carry' : 'hold', face: -1, prop: jug, eyes: 'half' });
      person(ctx, 160, 660, .48, t, CIVIL[4], { pose: 'carry', face: 1, walk: true, prop: jug }); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'wells, cisterns and the river', t, 'wells', { size: 26 }); cap(ctx, 'could only carry it so far', t, 'river', { size: 24, y: 686 }); }
  // 4–5. 312 BC: the official Appius Claudius Caecus, in his study with a plan, did what nobody in Rome had done before
  function sAppius(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 }), idea = since(t, 'did') > 0;
    L(ctx, c, .8, () => { ctx.fillStyle = '#efe0c0'; ctx.fillRect(-100, -100, 1500, 500); ctx.fillStyle = '#9a2a20'; ctx.fillRect(-100, -100, 1500, 40); ctx.fillStyle = '#8a2418'; ctx.fillRect(-100, 400, 1500, 200); for (let i = 0; i < 8; i++) { const px = -60 + i * 190; ctx.strokeStyle = '#1a0a08'; ctx.lineWidth = 5; ctx.strokeRect(px, 420, 160, 160); ctx.strokeStyle = '#d8a040'; ctx.lineWidth = 2; ctx.strokeRect(px + 10, 430, 140, 140); }
      ctx.strokeStyle = '#4a7a3a'; ctx.lineWidth = 6; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(i * 200 - 40, 30); ctx.quadraticCurveTo(i * 200 + 60, 90, i * 200 + 160, 30); ctx.stroke(); for (let k = 0; k < 5; k++) { ctx.fillStyle = k % 2 ? '#c8402a' : '#e8b030'; ctx.beginPath(); ctx.arc(i * 200 - 10 + k * 40, 38 + Math.sin(k / 4 * Math.PI) * 42, 5, 0, 7); ctx.fill(); } }
      cel(ctx, cc => cc.rect(60, 150, 220, 452), '#7a5232', { shade: '#5a3a20', light: '#9a6a42', dx: 10, dy: 0, lw: 4 }); for (let i = 0; i < 5; i++) for (let k = 0; k < 3; k++) { const bx = 72 + k * 70, by = 166 + i * 84; ink(ctx, '#3a2414', cc => cc.rect(bx, by, 62, 72), 2.5); for (let q = 0; q < 3; q++) cel(ctx, cc => cc.arc(bx + 16 + (q % 2) * 26 + (q > 1 ? 6 : 0), by + 52 - (q > 1 ? 24 : 0), 11, 0, 7), '#ecdcb4', { shade: '#b8a07a', dx: 2, dy: 2, lw: 2 }); }
      ctx.save(); ctx.beginPath(); ctx.rect(760, 110, 400, 270); ctx.clip(); C.sky(ctx, 'golden', t, { horizon: 300, sun: [1060, 220], sunR: 24, clouds: 3, seed: 631 }); C.mounds(ctx, { y: 300, n: 4, seed: 632, col: '#7e9a48', far: .2, sunX: 1060, t, w: 300, h: 80, copses: 2 }); ctx.restore(); ink(ctx, null, cc => cc.rect(760, 110, 400, 270), 8, '#d8c8a8');
      ctx.fillStyle = '#e8dcc4'; ctx.fillRect(-100, 600, 1500, 200); ctx.fillStyle = '#2a2420'; for (let r = 0; r < 6; r++) for (let i = 0; i < 40; i++) if ((i + r) % 2 === 0) ctx.fillRect(-60 + i * 36 - r * 6, 604 + r * 20 + r * r * 1.4, 16 + r * 2, (10 + r * 1.6) * .45); });
    L(ctx, c, 1, () => { cel(ctx, cc => cc.rect(420, 540, 460, 26), '#8a5a34', { shade: '#5a3a20', light: '#a87a4a', dx: 0, dy: 8, lw: 4 }); for (const d of [440, 840]) ink(ctx, '#6a4428', cc => cc.rect(d, 566, 20, 120), 3);
      // the plan on the table: springs in the hills, a channel line to the city
      ink(ctx, '#efe0bc', cc => cc.rect(500, 500, 300, 46), 3); ctx.strokeStyle = '#4a98d0'; ctx.lineWidth = 4; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(520, 520); ctx.quadraticCurveTo(650, 540, 780, 520); ctx.stroke(); ctx.setLineDash([]); ink(ctx, '#a8322a', cc => cc.arc(780, 520, 6, 0, 7), 2);
      person(ctx, 330, 690, .66, t, APPIUS, { pose: idea ? 'point' : 'chin', face: 1, eyes: idea ? 'wide' : 'half', mouth: idea ? 'smile' : 'flat' }); });
    C.finish(ctx, t, 'golden', { leakX: 1000, vig: .5 }); cap(ctx, 'so in 312 BC, an official named', t, 'three12', { size: 24 }); cap(ctx, 'Appius Claudius Caecus', t, 'appius', { size: 32, y: 686 }); if (idea) P.caption(ctx, 'did something nobody in Rome had done before', since(t, 'did') + .3, { size: 22, x: 1220, y: 90, align: 'right' }); }
  // 6–8. a channel from springs in the hills ~10 miles away, straight into the city — the Aqua Appia, almost all of it underground
  function landSection(ctx, t, k, o = {}) { // left: wooded hills with the spring; right: the city; the ground cut away to show the channel beneath
    C.sky(ctx, 'golden', t, { horizon: 330, sun: [700, 220], sunR: 40, seed: 641 }); C.mounds(ctx, { y: 340, n: 5, seed: 642, col: '#8aa070', far: .45, sunX: 700, t, w: 520, h: 70, copses: 2 });
    const gy = x => 400 - Math.max(0, 260 - x) * .6; ctx.beginPath(); ctx.moveTo(-200, 900); for (let x = -200; x <= 1500; x += 20) ctx.lineTo(x, gy(x)); ctx.lineTo(1500, 900); ctx.closePath(); ctx.fillStyle = '#7e9a48'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.stroke();
    C.copse(ctx, 40, 300, .5, t, { n: 7, seed: 3 }); C.copse(ctx, 200, 360, .4, t, { n: 5, seed: 4 });
    // the earth in section below the surface
    ctx.save(); ctx.beginPath(); ctx.moveTo(-200, 900); for (let x = -200; x <= 1500; x += 20) ctx.lineTo(x, gy(x) + 18); ctx.lineTo(1500, 900); ctx.closePath(); ctx.clip(); const LY = ['#a07a50', '#8a6a44', '#7a5a3a', '#6a4a30']; for (let i = 0; i < 4; i++) { ctx.fillStyle = LY[i]; ctx.fillRect(-200, 300 + i * 110, 1700, 110); } for (let i = 0; i < 24; i++) P.rock(ctx, (i * 173) % 1400, 470 + (i * 61) % 260, 8 + (i % 3) * 5, '#a8987a');
      // the channel itself: a stone-lined conduit running gently downhill, water flowing in it (drawn up to k)
      const cx0 = 120, cx1 = 1060, cy0 = 520, cy1 = 560, xk = lerp(cx0, cx1, k); ctx.fillStyle = '#c8b090'; ctx.fillRect(cx0, cy0 - 26, xk - cx0, 44); ctx.save(); ctx.beginPath(); ctx.moveTo(cx0, cy0 - 18); ctx.lineTo(xk, lerp(cy0, cy1, (xk - cx0) / (cx1 - cx0)) - 18); ctx.lineTo(xk, lerp(cy0, cy1, (xk - cx0) / (cx1 - cx0)) + 8); ctx.lineTo(cx0, cy0 + 8); ctx.closePath(); ctx.clip(); C.water(ctx, cx0, cy0 - 26, cx1, cy1 + 10, t, { glint: false, n: 30 }); ctx.restore();
      ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx0, cy0 - 26); ctx.lineTo(xk, lerp(cy0, cy1, (xk - cx0) / (cx1 - cx0)) - 26); ctx.moveTo(cx0, cy0 + 18); ctx.lineTo(xk, lerp(cy0, cy1, (xk - cx0) / (cx1 - cx0)) + 18); ctx.stroke();
      // access shafts every so often, as the Romans dug them
      for (let x = cx0 + 120; x < xk; x += 180) { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(x - 8, gy(x) + 4, 16, lerp(cy0, cy1, (x - cx0) / (cx1 - cx0)) - 26 - gy(x) - 4); } ctx.restore();
    // the spring: water welling out of the hillside into a stone basin
    { const sy = 400 - (260 - 130) * .6; ctx.fillStyle = '#3a2a1a'; ctx.fillRect(122, sy + 6, 16, 520 - 26 - sy - 6); ctx.fillStyle = 'rgba(122,184,224,.9)'; ctx.fillRect(126, sy + 6, 8, 520 - 26 - sy - 6); cel(ctx, cc => cc.ellipse(130, sy + 4, 44, 14, 0, 0, 7), '#c8b890', { shade: '#988a68', dx: 0, dy: 4, lw: 3 }); ctx.fillStyle = '#7ab8e0'; ctx.beginPath(); ctx.ellipse(130, sy + 2, 34, 8, 0, 0, 7); ctx.fill(); P.caption(ctx, 'spring', 1, { size: 18, x: 130, y: sy - 30, align: 'center' }); }
    // the city on the right
    for (let i = 0; i < 6; i++) house(ctx, 1000 + i * 70, 402, .3, i); const ty = C.site(ctx, 1180, 150, 400, t, { podium: 12, steps: false, bushes: false, seed: 3 }); P.temple(ctx, 1180, ty, .26, { roof: '#c87a4a' });
    if (k >= 1) { fountain(ctx, 1080, 400, .3, t); }
    if (o.enemy) for (let i = 0; i < 4; i++) { const x = 480 + i * 90; person(ctx, x, gy(x) + 2, .3, t, GAUL(i), { pose: i % 2 ? 'chin' : 'shade', face: i % 2 ? 1 : -1, prop: i % 2 ? null : spear, eyes: 'side', brow: 'sad' }); } }
  function sChannel(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.04 }), k = ease.inOut(clamp((t - A.built + .2) / 4.4));
    L(ctx, c, 1, () => { landSection(ctx, t, k); if (k > .1 && k < 1) { const x = lerp(120, 1060, k); for (let i = 0; i < 2; i++) person(ctx, x - 40 - i * 70, 400 - Math.max(0, 260 - (x - 40 - i * 70)) * .6 + 2, .26, t, WORK(i), { pose: i ? 'carry' : 'pry', face: 1, prop: i ? basket : spade }); } });
    C.motes(ctx, t); C.finish(ctx, t, 'golden'); cap(ctx, 'a channel carrying spring water from the hills', t, 'channel', { size: 24 }); cap(ctx, 'about 10 miles away · straight into the city', t, 'ten', { size: 22, y: 686 }); if (since(t, 'aqua') > -.3) P.caption(ctx, 'the Aqua Appia', since(t, 'aqua') + .3, { size: 34, x: 1220, y: 90, align: 'right' }); }
  function sUnder(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.04, x: 60 }, { z: 1.12, x: -40, y: -20 }); L(ctx, c, 1, () => landSection(ctx, t, 1, { enemy: since(t, 'enemy') > -1 }));
    C.finish(ctx, t, 'golden'); cap(ctx, 'almost all of it ran underground', t, 'underground', { size: 26 }); cap(ctx, 'hard for an enemy to wreck', t, 'enemy', { size: 24, y: 686 }); }
  // 9. the same year he started a road: the Appian Way — the layered roadbed and basalt paving going down, a milestone
  function sRoad(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.06, x: 30 }), k = clamp((t - A.road + .3) / 2.4);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 380, sun: [1080, 260], sunR: 40, seed: 651 })); L(ctx, c, .2, () => { C.mounds(ctx, { y: 390, n: 5, seed: 652, col: '#8aa070', far: .4, sunX: 1080, t, w: 560, h: 80, copses: 2 }); for (const x of [200, 520, 900, 1180]) C.tree(ctx, x, 420, .55, t, { kind: x % 2 ? 'cypress' : 'umbrella', seed: x }); });
    L(ctx, c, 1, () => { C.meadow(ctx, 420, 800, t, { col: '#8aa244', n: 160, flowers: 30 });
      // the road in perspective, receding to the horizon: a finished stretch of polygonal basalt blocks, kerbs, then the open roadbed being paved
      const vp = [760, 420], road = (u, s) => [lerp(vp[0], 640 + s * 520, u), lerp(vp[1], 760, u)];
      ctx.fillStyle = '#8a7a5a'; ctx.beginPath(); ctx.moveTo(...road(0, -1)); ctx.lineTo(...road(0, 1)); ctx.lineTo(...road(1, 1)); ctx.lineTo(...road(1, -1)); ctx.closePath(); ctx.fill();
      const done = .3 + .7 * k; ctx.save(); ctx.beginPath(); ctx.moveTo(...road(0, -1)); ctx.lineTo(...road(0, 1)); ctx.lineTo(...road(done, 1)); ctx.lineTo(...road(done, -1)); ctx.closePath(); ctx.clip(); ctx.fillStyle = '#5a5a62'; ctx.fillRect(0, 0, W, H);
        const R = C.rng(4); for (let i = 0; i < 260; i++) { const u = Math.pow(R(), .7), s = R() * 2 - 1, [x, y] = road(u, s), sz = 4 + u * 26; ctx.fillStyle = ['#6a6a74', '#5a5a64', '#74747e'][i % 3]; ctx.strokeStyle = 'rgba(20,20,24,.6)'; ctx.lineWidth = 1 + u; ctx.beginPath(); for (let k2 = 0; k2 < 6; k2++) { const a = k2 / 6 * 6.28 + i; ctx.lineTo(x + Math.cos(a) * sz, y + Math.sin(a) * sz * .5); } ctx.closePath(); ctx.fill(); ctx.stroke(); } ctx.restore();
      ctx.strokeStyle = INK; ctx.lineWidth = 3; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(...road(0, s)); ctx.lineTo(...road(1, s)); ctx.stroke(); }
      for (const s of [-1.06, 1.06]) { ctx.strokeStyle = '#c8bca0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(...road(0, s)); ctx.lineTo(...road(1, s)); ctx.stroke(); }
      // workers setting stones at the paving edge; a milestone beside the road
      const [ex, ey] = road(done, 0); for (let i = 0; i < 3; i++) person(ctx, ex - 160 + i * 150, ey + 10, .3 + done * .2, t, WORK(i + 1), { pose: i === 1 ? 'strike' : 'pry', face: i === 2 ? -1 : 1, prop: i === 1 ? hammer : spade });
      cel(ctx, cc => { cc.moveTo(1120, 700); cc.lineTo(1120, 540); cc.quadraticCurveTo(1150, 520, 1180, 540); cc.lineTo(1180, 700); cc.closePath(); }, '#d8ccb0', { shade: '#a89a78', light: '#efe6d2', dx: 10, dy: 0, lw: 3.5 }); ctx.fillStyle = '#5a4a3a'; ctx.font = '700 18px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.fillText('ROMA', 1150, 590); ctx.fillText('M · P · I', 1150, 616); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 12 })); C.rays(ctx, 1080, 260, t, .08); C.finish(ctx, t, 'golden');
    cap(ctx, 'that same year he started a road', t, 'same', { size: 26 }); cap(ctx, 'the Appian Way', t, 'appian', { size: 32, y: 686 }); }
  // 10. water in one hand, a highway in the other: Rome's whole business plan (aqueduct to the left, road to the right, the city between)
  function sPlan(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 420, sun: [640, 300], sunR: 46, seed: 661 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 430, n: 5, seed: 662, col: '#8aa070', far: .4, sunX: 640, t, w: 560, h: 80, copses: 2 }));
    L(ctx, c, .7, () => { C.meadow(ctx, 450, 800, t, { col: '#8aa244', n: 140, flowers: 30 }); const g = () => 560; aqueduct(ctx, -100, 620, 400, g, t, { bay: 80 }); const r = C.mound(ctx, 640, 600, 420, 160, { col: '#6e9440', sunX: 640, t, copses: 0, seed: 663 }); for (let i = 0; i < 6; i++) { const hx = 500 + i * 56; house(ctx, hx, C.footY(r, hx, 40) + 12, .22, i); }
      ctx.fillStyle = '#5a5a62'; ctx.beginPath(); ctx.moveTo(780, 590); ctx.lineTo(820, 590); ctx.lineTo(1500, 720); ctx.lineTo(1300, 720); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); const cx = lerp(820, 1300, (t * .12) % 1), cy = lerp(590, 720, (t * .12) % 1); cel(ctx, cc => cc.rect(cx - 30, cy - 24, 60, 20), '#8a6040', { shade: '#5a3e28', dx: 0, dy: 5, lw: 2.5 }); ink(ctx, '#5a3e28', cc => cc.arc(cx - 16, cy, 8, 0, 7), 2); ink(ctx, '#5a3e28', cc => cc.arc(cx + 16, cy, 8, 0, 7), 2); });
    C.rays(ctx, 640, 300, t, .1); C.finish(ctx, t, 'golden'); cap(ctx, 'water in one hand', t, 'hand', { size: 26, x: 70, y: 120 }); cap(ctx, 'a highway in the other', t, 'highway', { size: 26, x: 1210, y: 120, align: 'right' }); cap(ctx, 'basically Rome\'s whole business plan', t, 'plan', { size: 26, y: 686 }); }
  // 11–13. eleven aqueducts over five centuries, drawn onto a map in date order; the Aqua Marcia ~56 miles; ~315 miles of channels in all
  const AQ = [['Appia', -312, [[620, 470], [760, 520], [820, 560]]], ['Anio Vetus', -272, [[620, 440], [800, 420], [1000, 360], [1180, 300]]], ['Marcia', -144, [[620, 430], [820, 380], [1040, 290], [1240, 200]]], ['Tepula', -125, [[620, 450], [800, 470], [940, 500]]],
    ['Julia', -33, [[620, 455], [790, 486], [930, 520]]], ['Virgo', -19, [[600, 420], [720, 360], [840, 320]]], ['Alsietina', -2, [[580, 460], [420, 420], [240, 330]]], ['Claudia', 52, [[625, 445], [840, 400], [1060, 320], [1250, 250]]],
    ['Anio Novus', 52, [[630, 440], [860, 390], [1080, 300], [1260, 230]]], ['Traiana', 109, [[580, 450], [420, 380], [250, 280]]], ['Alexandrina', 226, [[620, 470], [760, 500], [900, 470]]]];
  function aqMap(ctx, t, n, o = {}) { const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#b4c884'); g.addColorStop(1, '#94ac68'); ctx.fillStyle = g; ctx.fillRect(-300, -300, 1900, 1400);
    const R = C.rng(11); for (let i = 0; i < 50; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,250,190,.12)' : 'rgba(40,70,20,.08)'; ctx.beginPath(); ctx.ellipse(R() * 1400 - 60, R() * 800 - 40, 80 + R() * 120, 30 + R() * 50, R() * 3, 0, 7); ctx.fill(); }
    for (let i = 0; i < 14; i++) { const x = 950 + R() * 400, y = 150 + R() * 500; cel(ctx, cc => { cc.moveTo(x - 40, y); cc.lineTo(x - 6, y - 50); cc.lineTo(x + 8, y - 36); cc.lineTo(x + 20, y - 54); cc.lineTo(x + 50, y); cc.closePath(); }, '#c8a070', { shade: '#9a7048', light: '#e8c890', dx: 10, dy: 0, lw: 2.5 }); }
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(540, -100); ctx.quadraticCurveTo(640, 300, 580, 460); ctx.quadraticCurveTo(520, 640, 200, 820); ctx.stroke(); ctx.strokeStyle = '#4a98d0'; ctx.lineWidth = 16; ctx.stroke(); ctx.restore();
    for (let i = 0; i < Math.min(n, AQ.length); i++) { const [, , pts] = AQ[i], f = clamp(n - i); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); let len = 0; const seg = []; for (let j = 1; j < pts.length; j++) { const d = Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]); seg.push(d); len += d; }
      let left = len * f; ctx.moveTo(...pts[pts.length - 1]); for (let j = pts.length - 1; j > 0 && left > 0; j--) { const d = seg[j - 1], u = Math.min(1, left / d); ctx.lineTo(lerp(pts[j][0], pts[j - 1][0], u), lerp(pts[j][1], pts[j - 1][1], u)); left -= d; }
      ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.stroke(); ctx.strokeStyle = o.hi === i ? '#f0c040' : ['#e8f4ff', '#c8e4f8'][i % 2]; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
    // the city as a walled blob with roofs
    cel(ctx, cc => cc.ellipse(600, 450, 70, 50, 0, 0, 7), '#e8d0a8', { shade: '#b8a078', dx: 8, dy: 6, lw: 4 }); for (let i = 0; i < 9; i++) ink(ctx, '#c0643a', cc => cc.rect(560 + (i % 3) * 26, 424 + Math.floor(i / 3) * 18, 18, 10), 1.5); P.caption(ctx, 'Rome', 1, { size: 22, x: 600, y: 520, align: 'center' }); }
  function sEleven(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06, x: 40 }), n = clamp((t - A.five + .2) / 4.2) * 11;
    L(ctx, c, 1, () => aqMap(ctx, t, n)); C.finish(ctx, t, 'dawn', { leak: false, vig: .4 });
    const i = Math.min(10, Math.floor(n)); if (n > 0) { const [nm, yr] = AQ[i]; ctx.save(); ctx.font = '700 40px "Liberation Serif", serif'; ctx.textAlign = 'right'; ctx.lineJoin = 'round'; ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(40,24,14,.85)'; const yt = yr < 0 ? `${-yr} BC` : `AD ${yr}`; ctx.strokeText(yt, 1220, 80); ctx.fillStyle = '#f6e2b0'; ctx.fillText(yt, 1220, 80); ctx.font = '700 26px "Liberation Serif", serif'; ctx.strokeText('Aqua ' + nm, 1220, 120); ctx.fillText('Aqua ' + nm, 1220, 120); ctx.restore(); }
    cap(ctx, 'it worked so well that Rome kept doing it', t, 'worked', { size: 24 }); cap(ctx, 'eleven aqueducts in five centuries', t, 'eleven', { size: 26, y: 686 }); }
  // 12. some over 50 miles; the longest, the Aqua Marcia, about 56: the arches stride across the countryside toward the city
  function sMarcia(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -80 }, { z: 1.1, x: 80 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 420, sun: [1000, 280], sunR: 46, seed: 671 }));
    L(ctx, c, .15, () => { C.mounds(ctx, { y: 430, n: 5, seed: 672, col: '#8a9a78', far: .5, sunX: 1000, t, w: 560, h: 110, copses: 2 }); aqueduct(ctx, 700, 1600, 380, () => 440, t, { bay: 28, far: .6 }); });
    L(ctx, c, .45, () => { C.meadow(ctx, 440, 800, t, { col: '#8aa244', n: 120, flowers: 20 }); aqueduct(ctx, 200, 1200, 330, x => 520 + Math.sin(x * .006) * 14, t, { bay: 60, far: .2 });
      for (const x of [120, 360, 880, 1140]) C.tree(ctx, x, 540, .5, t, { kind: x % 3 ? 'umbrella' : 'cypress', seed: x }); });
    L(ctx, c, 1, () => { aqueduct(ctx, -300, 1500, 170, x => 640 + Math.sin(x * .004) * 20, t, { bay: 150 }); C.meadow(ctx, 630, 800, t, { col: '#7e9a3a', n: 160, flowers: 30 }); for (let i = 0; i < 3; i++) P.goat(ctx, 300 + i * 70, 690, .4, t, { seed: i + 1, flip: i % 2 === 0 }); person(ctx, 460, 700, .4, t, WORK(2), { pose: 'hold', face: -1, prop: spear }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 12 })); C.rays(ctx, 1000, 280, t, .1); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'some ran more than 50 miles', t, 'fifty', { size: 26 }); cap(ctx, 'the longest, the Aqua Marcia: about 56 miles', t, 'marcia', { size: 24, y: 686 }); }
  function sSystem(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08, x: 40 }, { z: 1.0 }); L(ctx, c, 1, () => aqMap(ctx, t, 11, { hi: 2 })); C.finish(ctx, t, 'dawn', { leak: false, vig: .4 });
    const k = ease.out(clamp((t - A.three15 + .4) / .8)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.font = '700 90px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(40,24,14,.85)'; ctx.strokeText('~315 miles', 640, 140); ctx.fillStyle = '#f6e2b0'; ctx.fillText('~315 miles', 640, 140); ctx.restore(); }
    cap(ctx, 'together: roughly 315 miles of channels', t, 'together', { size: 26, y: 686 }); }
  // 14–15. what it meant for you, standing in the city: water you didn't have to haul — public fountains on street corners
  function sFountain(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.1, y: 20 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'dawn', t, { horizon: 300, sun: [1100, 180], sunR: 34, seed: 681 })); L(ctx, c, .4, () => { for (let i = 0; i < 6; i++) insula(ctx, -40 + i * 270, 520, .8, i + 2, t); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 520, 1900, 400); ctx.strokeStyle = 'rgba(100,80,50,.4)'; ctx.lineWidth = 2; for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.moveTo(i * 80 - 300, 520); ctx.lineTo(i * 100 - 500, 760); ctx.stroke(); }
      fountain(ctx, 640, 640, 1.2, t); person(ctx, 520, 680, .5, t, CIVIL[7], { pose: 'hold', face: 1, prop: jug }); person(ctx, 800, 690, .5, t, CIVIL[2], { pose: 'carry', face: -1, prop: jug, mouth: 'smile' }); person(ctx, 940, 690, .46, t, CIVIL[5], { pose: 'talk', talk: true, face: -1 }); person(ctx, 380, 692, .46, t, CIVIL[4], { pose: 'walk', face: 1 });
      P.goat(ctx, 220, 700, .4, t, { seed: 4 }); });
    C.motes(ctx, t); C.finish(ctx, t, 'dawn', { leakX: 1100 }); cap(ctx, 'here\'s what that meant for you, standing in the city', t, 'heres', { size: 24 }); cap(ctx, 'water you didn\'t have to haul · public fountains on street corners', t, 'water2', { size: 22, y: 686 }); }
  // 16–17. above all, most of it wasn't for drinking: the enormous public baths — a vaulted hall, the great pool, steam, a bather paying a coin
  function sBaths(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.08, x: 30 });
    L(ctx, c, .7, () => { // coffered barrel vault, high windows with light shafts, marble walls, columns
      const g = ctx.createLinearGradient(0, -100, 0, 500); g.addColorStop(0, '#8a7a6a'); g.addColorStop(1, '#d8c8a8'); ctx.fillStyle = g; ctx.fillRect(-200, -200, 1700, 800);
      for (let r = 0; r < 3; r++) for (let i = -2; i < 16; i++) { const x = i * 100 + (r % 2) * 50, y = -30 + r * 60; ink(ctx, '#a89880', cc => cc.rect(x, y, 80, 46), 2); ink(ctx, '#c8b8a0', cc => cc.rect(x + 12, y + 10, 56, 26), 1.5); }
      for (let i = 0; i < 4; i++) { const wx = 120 + i * 320; ctx.fillStyle = '#f8ecc8'; ctx.beginPath(); ctx.moveTo(wx, 230); ctx.arc(wx + 60, 230, 60, Math.PI, 0); ctx.lineTo(wx + 120, 300); ctx.lineTo(wx, 300); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); ctx.save(); ctx.globalCompositeOperation = 'screen'; const lg = ctx.createLinearGradient(wx, 300, wx + 160, 700); lg.addColorStop(0, 'rgba(255,236,190,.35)'); lg.addColorStop(1, 'rgba(255,236,190,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(wx, 300); ctx.lineTo(wx + 120, 300); ctx.lineTo(wx + 260, 720); ctx.lineTo(wx + 100, 720); ctx.closePath(); ctx.fill(); ctx.restore(); }
      for (let i = 0; i < 8; i++) { const base = ['#b8806a', '#7a9a8a', '#d8b890'][i % 3]; cel(ctx, cc => cc.rect(-60 + i * 190, 320, 170, 200), base, { shade: mix(base, '#2a1a10', .25), light: mix(base, '#fff', .25), dx: 10, dy: 10, lw: 2.5 }); }
      for (let i = 0; i < 8; i++) P.column(ctx, -100 + i * 190, 540, 40, 260, { col: '#efe6d2' }); });
    L(ctx, c, 1, () => { // the pool: marble rim, water, bathers waist-deep (water drawn over their legs), steam
      ctx.fillStyle = '#e8dcc4'; ctx.fillRect(-300, 540, 1900, 400); cel(ctx, cc => cc.rect(-300, 560, 1900, 30), '#efe6d2', { shade: '#c0b8a8', dx: 0, dy: 8, lw: 3 });
      for (const [x, i] of [[360, 2], [560, 4], [760, 6], [960, 0]]) person(ctx, x, 720, .44, t, Object.assign({}, CIVIL[i], { kind: 'tunic', cloth: '#efe6d2' }), { pose: x === 560 ? 'talk' : 'stand', talk: x === 560, face: x < 640 ? 1 : -1, mouth: 'smile', eyes: x === 960 ? 'closed' : 'happy' });
      ctx.save(); ctx.globalAlpha = .9; C.water(ctx, 160, 600, 1180, 740, t, { pal: 'dawn', glint: false, n: 40 }); ctx.restore(); cel(ctx, cc => cc.rect(150, 590, 1040, 12), '#efe6d2', { shade: '#c0b8a8', dx: 0, dy: 4, lw: 2.5 });
      person(ctx, 1200, 600, .42, t, CIVIL[1], { pose: 'hold', face: -1, prop: coin }); person(ctx, 80, 600, .42, t, CIVIL[3], { pose: 'walk', face: 1 });
      C.smoke(ctx, 500, 600, 1.2, t, { col: '255,255,255', a: .25, h: 300, speed: .1 }); C.smoke(ctx, 900, 600, 1.2, t + 3, { col: '255,255,255', a: .25, h: 300, speed: .1 }); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .5 }); cap(ctx, 'above all, most of the water wasn\'t for drinking', t, 'above', { size: 24 }); cap(ctx, 'it went to enormous public baths', t, 'baths', { size: 26, y: 640 }); cap(ctx, 'an afternoon there cost pocket change', t, 'pocket', { size: 22, y: 686 }); }
  // 18. estimates of hundreds of gallons per person per day — though engineers argue the ancient flow figures were exaggerated
  function sEstimate(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.04 }), n = Math.round(clamp((t - A.hundreds + 1.4) / 2.2) * 30), doubt = clamp((t - A.engineers + .2) / .8);
    L(ctx, c, .8, () => { ctx.fillStyle = '#c8a878'; ctx.fillRect(-200, -200, 1700, 1200); for (let r = 0; r < 12; r++) for (let i = -2; i < 16; i++) ink(ctx, ['#c8a878', '#b89868', '#d0b080'][(r + i) % 3], cc => cc.rect(i * 100 + (r % 2) * 50, r * 56 - 40, 98, 54), 1.5); ctx.fillStyle = '#8a6a44'; ctx.fillRect(-200, 640, 1700, 300); });
    L(ctx, c, 1, () => { person(ctx, 300, 660, .62, t, CIVIL[2], { pose: doubt > 0 ? 'shrug' : 'point', face: 1, eyes: doubt > 0 ? 'half' : 'wide', mouth: doubt > 0 ? 'flat' : 'o' });
      for (let row = 0; row < 5; row++) { cel(ctx, cc => cc.rect(520, 642 - row * 64, 460, 12), '#8a5a34', { shade: '#5a3a20', dx: 0, dy: 4, lw: 2.5 }); } for (const px of [526, 966]) ink(ctx, '#6a4428', cc => cc.rect(px, 330, 14, 330), 2.5);
      for (let i = 0; i < n; i++) { const row = Math.floor(i / 6), col = i % 6; ctx.save(); ctx.globalAlpha = 1 - doubt * .5; jug(ctx, 570 + col * 70, 634 - row * 64, 0, 0); ctx.restore(); }
      if (doubt > 0) { ctx.save(); ctx.globalAlpha = doubt; ctx.font = '700 220px "Liberation Serif", serif'; ctx.fillStyle = '#a8322a'; ctx.textAlign = 'center'; ctx.fillText('?', 1100, 520); ctx.restore(); } });
    C.finish(ctx, t, 'golden', { leak: false, vig: .4 }); cap(ctx, 'some modern estimates: hundreds of gallons per person per day', t, 'estimates', { size: 22 }); cap(ctx, 'engineers argue the ancient flow figures were exaggerated', t, 'engineers', { size: 22, y: 686 }); }
  // 19. "it's a pipe — why are we spending this long on a pipe?": a citizen squints up at the arches, baffled
  function sPipe(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 30 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 460, sun: [1100, 300], sunR: 40, seed: 691 }));
    L(ctx, c, 1, () => { C.meadow(ctx, 470, 800, t, { col: '#8aa244', n: 140, flowers: 30 }); aqueduct(ctx, -300, 1600, 120, () => 660, t, { bay: 220 }); person(ctx, 640, 700, .7, t, CIVIL[6], { pose: since(t, 'why') > 0 ? 'shrug' : 'shade', face: 1, eyes: since(t, 'why') > 0 ? 'half' : 'side', brow: 'sad' }); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'I know what you\'re thinking: it\'s a pipe', t, 'thinking', { size: 26 }); cap(ctx, 'why spend this long on a pipe?', t, 'why', { size: 26, y: 686 }); }
  // 20. because this is what decides whether Rome lives or dies: the aqueduct black against a blood-red sky
  function sDecide(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'blood', t, { horizon: 480, sun: [640, 420], sunR: 110, seed: 701, clouds: 4 }));
    L(ctx, c, 1, () => { ctx.save(); ctx.filter = 'brightness(0)'; aqueduct(ctx, -300, 1600, 300, () => 620, t, { bay: 120 }); ctx.restore(); ctx.fillStyle = '#140a08'; ctx.fillRect(-300, 610, 1900, 300); });
    C.finish(ctx, t, 'blood', { leakX: 640, vig: .6 }); cap(ctx, 'because this is the thing', t, 'because', { size: 26 }); cap(ctx, 'that will decide whether Rome lives… or dies', t, 'decide', { size: 28, y: 686 }); }
  // 21. everyone who moves to Rome is betting their life on water that starts dozens of miles away
  function sBet(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -60 }, { z: 1.06, x: 60 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 430, sun: [1100, 300], sunR: 40, seed: 711 })); L(ctx, c, .15, () => C.mounds(ctx, { y: 440, n: 5, seed: 712, col: '#8a9a78', far: .5, sunX: 1100, t, w: 560, h: 120, copses: 2 }));
    L(ctx, c, .5, () => { C.meadow(ctx, 450, 800, t, { col: '#8aa244', n: 140, flowers: 20 }); aqueduct(ctx, -200, 900, 330, () => 540, t, { bay: 60, far: .1 }); const r = C.mound(ctx, 1100, 620, 600, 200, { col: '#6e9440', sunX: 1100, t, copses: 0, seed: 713 }); for (let i = 0; i < 7; i++) { const hx = 880 + i * 60; house(ctx, hx, C.footY(r, hx, 40) + 12, .24, i); } });
    L(ctx, c, 1, () => { ctx.fillStyle = '#b8a07a'; ctx.beginPath(); ctx.moveTo(-200, 760); ctx.quadraticCurveTo(400, 680, 900, 640); ctx.lineTo(940, 650); ctx.quadraticCurveTo(420, 700, -100, 800); ctx.closePath(); ctx.fill();
      const u = (t * .05) % 1, x = lerp(80, 760, u), y = lerp(720, 660, u); person(ctx, x, y, .4, t, CIVIL[6], { pose: 'carry', face: 1, walk: true, prop: (cc, x2, y2) => cel(cc, c2 => c2.ellipse(x2, y2 - 20, 34, 26, 0, 0, 7), '#b8945e', { shade: '#86602e', dx: 4, dy: 3, lw: 2.5 }) }); person(ctx, x - 70, y + 6, .36, t, CIVIL[3], { pose: 'walk', face: 1 }); person(ctx, x - 120, y + 8, .24, t, CIVIL[4], { pose: 'walk', face: 1 }); });
    C.rays(ctx, 1100, 300, t, .08); C.finish(ctx, t, 'golden'); cap(ctx, 'everyone who moves to Rome is betting their life', t, 'every', { size: 24 }); cap(ctx, 'on water that starts dozens of miles away', t, 'life', { size: 24, y: 686 }); }
  // 22. remember that: water running in the channel, close
  function sRemember(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08 });
    L(ctx, c, 1, () => { ctx.fillStyle = '#6a5a44'; ctx.fillRect(-200, -200, 1700, 1200); for (let r = 0; r < 10; r++) for (let i = -1; i < 14; i++) ink(ctx, ['#c8b090', '#b8a080', '#d0b898'][(r + i) % 3], cc => cc.rect(i * 110 + (r % 2) * 55, r * 60 - 40, 108, 58), 2); ctx.fillStyle = '#2a2018'; ctx.fillRect(-200, 380, 1700, 340); C.water(ctx, -200, 420, 1500, 720, t, { glint: true, sunX: 640, n: 90 }); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .6 }); cap(ctx, 'remember that', t, 'remember', { size: 36, x: 640, y: 200, align: 'center' }); }

  const cut = [[0, sCrowded, 0], [A.city - .2, sGauge, .4], [A.wells - .6, sWells, .4], [A.so - .2, sAppius, .5], [A.built - .4, sChannel, .5], [A.almost - .2, sUnder, .5], [A.same - .3, sRoad, .5],
    [A.hand - .5, sPlan, .5], [A.worked - .3, sEleven, .5], [A.fifty - .6, sMarcia, .5], [A.together - .3, sSystem, .5], [A.heres - .2, sFountain, .5], [A.above - .3, sBaths, .5],
    [A.estimates - .4, sEstimate, .5], [A.thinking - .5, sPipe, .5], [A.because - .2, sDecide, .4], [A.every - .2, sBet, .5], [A.remember - .3, sRemember, .4]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: .2, type: 'wind', gain: .25 }, { t: A.crowded, type: 'rattle', gain: .3 }, { t: A.wells, type: 'splash', gain: .3 }, { t: A.appius, type: 'swell', gain: .3 }, { t: A.channel, type: 'bubbles', gain: .4 },
    { t: A.aqua, type: 'swell', gain: .35 }, { t: A.road, type: 'hit', gain: .3 }, { t: A.highway, type: 'thud', gain: .3 }, { t: A.eleven, type: 'whoosh', gain: .3 }, { t: A.marcia, type: 'swell', gain: .3 },
    { t: A.three15, type: 'press', gain: .35 }, { t: A.water2, type: 'splash', gain: .35 }, { t: A.baths, type: 'bubbles', gain: .4 }, { t: A.exaggerated, type: 'click', gain: .3 }, { t: A.why, type: 'paper', gain: .3 },
    { t: A.dies, type: 'boom', gain: .4 }, { t: A.remember, type: 'bubbles', gain: .4 }];
  const moods = [{ t: 0, mood: 'still' }, { t: A.because - .3, mood: 'tense' }, { t: A.remember - .3, mood: 'mystery' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat4b.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
