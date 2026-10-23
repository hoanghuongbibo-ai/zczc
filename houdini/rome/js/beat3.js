/* Rome — Beat 3, "The spark" (narration-beat3.mp3 = narration-full.mp3 221.05–274.6 s + pad).
 * The swamp in the valley → the drainage channel → the vaulted Cloaca Maxima (kings, rebuilt, Agrippa's boat, still in use today)
 * → "not a battle, plumbing" → the city grows → the kings thrown out (509 BC) → the Republic: voting, the Senate → growing cities
 * attract attention. Same cast and cinematic kit as Beat 2 (monk.js person(), animals.js, cine.js); every object on real ground. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const OFF = 221.05;
  const A0 = { remember: 221.21, valley: 222.12, forum: 224.64, heart: 225.96, first: 228.0, water: 229.66, early: 231.37, channel: 232.82, river: 234.59,
    later: 235.56, covered: 236.21, sewer: 238.19, cloaca: 239.0, tradition: 241.1, kings: 242.28, five: 242.85, rebuilt: 245.08, again: 246.08, agrippa: 248.55,
    thirty: 249.95, parts: 251.61, still: 252.23, today: 254.01, think: 254.92, firstthing: 256.27, battle: 258.66, plumbing: 259.86, grew: 261.8, kingsout: 262.84,
    kicked: 263.35, nine: 265.48, republic: 267.61, elected: 268.96, senate: 270.15, families: 270.95, growing: 272.24, attention: 273.54 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 54.6;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };

  // ---------- cast ----------
  const VILL = [{ kind: 'tunic', cloth: '#9a7a54', hair: '#2a1a14', hairStyle: 'curly', beard: true, seed: 1 }, { kind: 'woman', cloth: '#a88a6a', scarf: '#d8c8a8', hair: '#3a2416', seed: 2 },
    { kind: 'tunic', cloth: '#7a6a4a', hair: '#4a3020', hairStyle: 'short', seed: 3 }, { kind: 'woman', cloth: '#8a7a5a', scarf: '#c8a878', hair: '#2a1a14', seed: 4 }, { kind: 'tunic', cloth: '#a8845a', hair: '#1a1410', hairStyle: 'short', beard: true, seed: 5 },
    { kind: 'tunic', cloth: '#6a7a8a', hair: '#3a2a1a', hairStyle: 'curly', seed: 6 }];
  const CITIZENS = [{ kind: 'toga', hair: '#3a2416', hairStyle: 'short', seed: 21 }, { kind: 'toga', hair: '#8a8a84', hairStyle: 'bald', seed: 22 }, { kind: 'tunic', cloth: '#b86a4a', hair: '#2a1a14', hairStyle: 'curly', seed: 23 },
    { kind: 'toga', hair: '#5a3a24', hairStyle: 'curly', beard: true, seed: 24 }, { kind: 'tunic', cloth: '#5a7a9a', hair: '#1a1410', hairStyle: 'short', seed: 25 }, { kind: 'stola', cloth: '#c86a5a', cloth2: '#efe0c0', hairStyle: 'bun', hair: '#1a1410', seed: 26 }];
  const KING = { kind: 'toga', cloth: '#6a2a6a', cloth2: '#8a3a8a', hair: '#4a3020', hairStyle: 'curly', beard: true, wreath: true, seed: 31 };
  const QUEEN = { kind: 'stola', cloth: '#7a3a6a', cloth2: '#e8c870', hairStyle: 'bun', hair: '#2a1a14', seed: 32 };
  const AGRIPPA = { kind: 'toga', hair: '#3a2416', hairStyle: 'short', trim: '#7a2a62', seed: 33 };
  const SENATOR = s => ({ kind: 'toga', trim: '#7a2a62', hair: ['#8a8a84', '#3a2416', '#5a3a24', '#9a9a94'][s % 4], hairStyle: ['bald', 'short', 'curly', 'short'][s % 4], beard: s % 3 === 0, seed: 40 + s });
  const LICTOR = { kind: 'tunic', cloth: '#a8322a', hair: '#2a1a14', hairStyle: 'short', seed: 50 };
  const TOURIST = [{ kind: 'tourist', cloth: '#3a6ab8', hair: '#d8b878', hairStyle: 'short', cap: '#e84a3a', seed: 61 }, { kind: 'tourist', cloth: '#f6c945', cloth2: '#3a4a6a', hairStyle: 'long', hair: '#2a1a14', fem: true, seed: 62 }];
  const person = (ctx, x, y, s, t, base, o) => P.person(ctx, x, y, s, t, Object.assign({}, base, o || {}));

  // ---------- props ----------
  const spade = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30, y + 150); ctx.stroke(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 4.5; ctx.stroke(); ctx.restore(); ink(ctx, '#7a5a3a', c => { c.moveTo(x - 46, y + 146); c.lineTo(x - 14, y + 146); c.lineTo(x - 22, y + 186); c.lineTo(x - 42, y + 186); c.closePath(); }, 3); };
  const basket = (ctx, x, y) => { cel(ctx, c => { c.moveTo(x - 30, y - 34); c.lineTo(x + 30, y - 34); c.lineTo(x + 22, y + 4); c.lineTo(x - 22, y + 4); c.closePath(); }, '#b8884e', { shade: '#86602e', dx: 5, dy: 0, lw: 3 }); cel(ctx, c => c.ellipse(x, y - 36, 30, 10, 0, Math.PI, 0), '#7a5a3a', { shade: '#5a3e28', dx: 2, dy: 2, lw: 2.5 }); };
  const hammer = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 4, y - 60); ctx.stroke(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); ink(ctx, '#6a6a72', c => c.rect(x - 14, y - 76, 36, 18), 3); };
  const lamp = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 50); ctx.stroke(); ctx.restore(); cel(ctx, c => c.ellipse(x, y - 54, 16, 6, 0, 0, 7), '#b88a40', { shade: '#86602e', dx: 2, dy: 2, lw: 2.5 }); ctx.fillStyle = '#ffd890'; ctx.beginPath(); ctx.ellipse(x + 10, y - 66, 5, 10, .2, 0, 7); ctx.fill(); };
  const fasces = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + 100); ctx.lineTo(x, y - 90); ctx.stroke(); ctx.strokeStyle = '#a8784a'; ctx.lineWidth = 11; ctx.stroke(); ctx.strokeStyle = '#a8322a'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 6, y - 70 + i * 30); ctx.lineTo(x + 6, y - 58 + i * 30); ctx.stroke(); } ctx.restore(); ink(ctx, '#c8ccd4', c => { c.moveTo(x, y - 88); c.quadraticCurveTo(x + 30, y - 96, x + 26, y - 70); c.lineTo(x, y - 74); c.closePath(); }, 2.5); };
  const tablet = (ctx, x, y) => ink(ctx, '#e8d8b0', c => c.rect(x - 10, y - 14, 20, 26), 2.5);
  const spear = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + 60); ctx.lineTo(x + 8, y - 150); ctx.stroke(); ctx.restore(); ink(ctx, '#2a2420', c => { c.moveTo(x + 8, y - 170); c.lineTo(x + 16, y - 146); c.lineTo(x, y - 146); c.closePath(); }, 2); };

  // ---------- set pieces ----------
  function roundHut(ctx, x, y, s, t, seed = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(10, 2, 120, 14, 0, 0, 7); ctx.fill();
    cel(ctx, c => { c.moveTo(-90, 0); c.lineTo(-86, -80); c.quadraticCurveTo(0, -92, 86, -80); c.lineTo(90, 0); c.quadraticCurveTo(0, 12, -90, 0); c.closePath(); }, '#b89468', { shade: '#8a6a44', light: '#d0ac7c', dx: 22, dy: 0, lw: 4.5 });
    ink(ctx, '#3a2414', c => { c.moveTo(-22, 0); c.lineTo(-22, -52); c.quadraticCurveTo(0, -64, 22, -52); c.lineTo(22, 0); c.closePath(); }, 4);
    cel(ctx, c => { c.moveTo(-112, -70); c.quadraticCurveTo(-40, -210, 0, -230); c.quadraticCurveTo(40, -210, 112, -70); c.quadraticCurveTo(0, -58, -112, -70); c.closePath(); }, '#c8a050', { shade: '#987434', light: '#e4c070', dx: 26, dy: 0, lw: 5 });
    ctx.strokeStyle = 'rgba(110,80,30,.55)'; ctx.lineWidth = 2.5; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * 4, -222); ctx.quadraticCurveTo(i * 12, -150, i * 21, -66); ctx.stroke(); }
    ctx.fillStyle = 'rgba(235,230,220,.45)'; for (let k = 0; k < 4; k++) { const ph = (t * .35 + k * .25 + seed * .13) % 1; ctx.beginPath(); ctx.arc(6 + Math.sin(ph * 6 + seed) * 10, -236 - ph * 120, 10 + ph * 18, 0, 7); ctx.fill(); }
    ctx.restore(); }
  // an early Roman house: tufa walls, tiled roof, a doorway and a small window
  function house(ctx, x, y, s, seed = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = C.rng(seed + 1), w = 150 + R() * 60, h = 90 + R() * 40, wall = ['#e8d0a8', '#dcc094', '#efdcbc'][seed % 3];
    ctx.fillStyle = 'rgba(40,24,14,.25)'; ctx.beginPath(); ctx.ellipse(12, 2, w * .62, 12, 0, 0, 7); ctx.fill();
    cel(ctx, c => c.rect(-w / 2, -h, w, h), wall, { shade: mix(wall, '#6a4a30', .3), light: mix(wall, '#ffffff', .25), dx: w * .2, dy: 0, lw: 4 });
    cel(ctx, c => { c.moveTo(-w / 2 - 14, -h); c.lineTo(-w * .2, -h - 44); c.lineTo(w * .2, -h - 44); c.lineTo(w / 2 + 14, -h); c.closePath(); }, '#c0643a', { shade: '#8a4024', light: '#d8805a', dx: 10, dy: 0, lw: 4 });
    ctx.strokeStyle = 'rgba(90,30,10,.5)'; ctx.lineWidth = 2; for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(-w / 2 - 14 + k * (w + 28) / 6, -h); ctx.lineTo(-w * .2 + k * w * .4 / 6, -h - 44); ctx.stroke(); }
    ink(ctx, '#3a2414', c => c.rect(-18, -58, 36, 58), 3); ink(ctx, '#3a2414', c => c.rect(w * .2, -h + 22, 22, 18), 2.5);
    ctx.restore(); }
  function stall(ctx, x, y, s, t, seed = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const awn = ['#c8423a', '#3a6a9a', '#d8a030'][seed % 3];
    for (const d of [-1, 1]) ink(ctx, '#7a5434', c => c.rect(d * 90 - 5, -170, 10, 170), 3); cel(ctx, c => c.rect(-110, -76, 220, 22), '#a8784e', { shade: '#7a5434', dx: 0, dy: 6, lw: 3.5 }); ink(ctx, '#9a6a44', c => c.rect(-100, -54, 200, 54), 3.5);
    for (let i = 0; i < 3; i++) { const bx = -66 + i * 66; ink(ctx, '#b8884a', c => c.ellipse(bx, -78, 26, 9, 0, 0, 7), 2.5); for (let k = 0; k < 5; k++) cel(ctx, c => c.arc(bx - 12 + k * 6, -86 - (k % 2) * 5, 7, 0, 7), ['#e8423a', '#f6a828', '#8ab040'][(i + seed) % 3], { dx: 2, dy: 2, lw: 1.5 }); }
    for (let i = 0; i < 6; i++) cel(ctx, c => { c.moveTo(-120 + i * 40, -170); c.lineTo(-80 + i * 40, -170); c.lineTo(-80 + i * 40, -146 + Math.sin(t * 2 + i) * 2); c.quadraticCurveTo(-100 + i * 40, -136, -120 + i * 40, -146); c.closePath(); }, i % 2 ? '#f4efe2' : awn, { dx: 0, dy: 4, lw: 2.5 });
    ctx.restore(); }
  // the valley between the Capitoline (left) and the Palatine (right), the Tiber across the front; o.dry 0 (swamp) → 1 (drained)
  function valley(ctx, c, t, o = {}) { const pal = o.pal || 'golden', sun = o.sun || [640, 300], dry = o.dry ?? 0, hz = C.PAL[pal].haze;
    L(ctx, c, .04, () => C.sky(ctx, pal, t, { horizon: 410, sun, sunR: 46, seed: o.seed ?? 301 }));
    L(ctx, c, .14, () => C.mounds(ctx, { y: 420, n: 5, seed: 302, col: '#8a9a70', far: .45, sunX: sun[0], t, w: 560, h: 80, copses: 2, haze: hz }));
    const r = {}; L(ctx, c, .5, () => { C.meadow(ctx, 470, 640, t, { col: dry > .5 ? '#8aa244' : '#7a8a3e', n: 160, flowers: dry > .5 ? 40 : 10, haze: hz });
      r.L = C.mound(ctx, 140, 620, 560, 340, { col: '#6a9040', sunX: sun[0], t, copses: 2, seed: 303, haze: hz }); r.R = C.mound(ctx, 1150, 620, 580, 360, { col: '#6a9040', sunX: sun[0], t, copses: 2, seed: 304, haze: hz });
      if (o.huts !== false) { for (const hx of [70, 190]) roundHut(ctx, hx, r.L(hx) + 12, .3, t, hx); for (const hx of [1090, 1210]) roundHut(ctx, hx, r.R(hx) + 12, .3, t, hx); }
      // the marsh on the valley floor, shrinking as it drains
      const wet = 1 - dry; if (wet > .02) { ctx.save(); ctx.globalAlpha = Math.min(1, wet * 1.6); ctx.beginPath(); ctx.ellipse(640, 560, 300 * (.4 + .6 * wet), 50 * (.4 + .6 * wet), 0, 0, 7); ctx.save(); ctx.clip(); C.water(ctx, 300, 500, 980, 620, t, { pal, sunX: sun[0], glint: wet > .5 }); ctx.restore(); ctx.beginPath(); ctx.ellipse(640, 560, 300 * (.4 + .6 * wet), 50 * (.4 + .6 * wet), 0, 0, 7); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke();
        for (let i = 0; i < Math.round(14 * wet); i++) { const rx = 400 + ((i * 197) % 480); P.reeds(ctx, rx, 548 + ((i * 7) % 4) * 12, .32 + (i % 4) * .07, t, 3); } ctx.restore(); }
      if (o.inside) o.inside(ctx, r); });
    L(ctx, c, .8, () => { C.meadow(ctx, 628, 700, t, { col: '#7e9a3a', n: 120, flowers: 30, haze: hz }); C.water(ctx, -400, 690, 1700, 760, t, { pal, sunX: sun[0] }); });
    return r; }

  // ---------- shots ----------
  // 1–2. the marshy valley; the future Forum sketched over it (marble on podiums on the valley floor, a ghost of what is to come)
  function sSwamp(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, y: 0 }, { z: 1.08, y: 20 });
    valley(ctx, c, t, { pal: 'sunset', sun: [640, 340] }); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 20; i++) { const x = 400 + ((i * 113 + Math.sin(t + i) * 40) % 500), y = 500 + ((i * 47) % 80); ctx.fillStyle = `rgba(255,240,140,${.4 + .4 * Math.sin(t * 3 + i * 2)})`; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 7); ctx.fill(); } ctx.restore();
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true, flowers: 8 })); P.birds(ctx, t, 5, 190, 300, 30); C.rays(ctx, 640, 340, t, .1); C.finish(ctx, t, 'sunset', { leakX: 640 });
    cap(ctx, 'remember that marshy valley between the hills?', t, 'remember', { size: 24 }); }
  function sForumGhost(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08, y: 20 }, { z: 1.14, y: 30 }), k = ease.inOut(clamp((t - A.forum + .2) / 1.4));
    valley(ctx, c, t, { pal: 'sunset', sun: [640, 340], inside: ctx2 => { if (k <= 0) return; ctx2.save(); ctx2.globalAlpha = .55 * k;
      // a pale architect's sketch on the valley floor: paved square, two temples, a basilica colonnade
      ctx2.strokeStyle = '#fff6e0'; ctx2.lineWidth = 3; ctx2.setLineDash([10, 6]); ctx2.beginPath(); ctx2.moveTo(380, 600); ctx2.lineTo(900, 600); ctx2.lineTo(960, 640); ctx2.lineTo(320, 640); ctx2.closePath(); ctx2.stroke(); ctx2.setLineDash([]);
      ctx2.filter = 'grayscale(1) brightness(1.6)'; const y1 = C.site(ctx2, 470, 170, 600, t, { podium: 14, steps: false, bushes: false, seed: 5 }); P.temple(ctx2, 470, y1, .3); const y2 = C.site(ctx2, 820, 190, 600, t, { podium: 14, steps: false, bushes: false, seed: 6 }); P.temple(ctx2, 820, y2, .33);
      for (let i = 0; i < 6; i++) P.column(ctx2, 580 + i * 28, 600, 12, 70); ctx2.filter = 'none'; ctx2.restore(); } });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true, flowers: 8 })); C.rays(ctx, 640, 340, t, .1); C.finish(ctx, t, 'sunset', { leakX: 640 });
    cap(ctx, 'that\'s where the Roman Forum will be', t, 'forum', { size: 26 }); cap(ctx, 'the heart of the whole city', t, 'heart', { size: 24, y: 686 }); }
  // 3. but first, somebody has to get the water out: two farmers at the edge of the marsh, mosquitoes, flooded hut
  function sFirst(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.08, x: 20 });
    L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 400, sun: [980, 330], sunR: 44, seed: 311 }));
    L(ctx, c, .2, () => C.mounds(ctx, { y: 410, n: 5, seed: 312, col: '#8a9a70', far: .45, sunX: 980, t, w: 560, h: 90, copses: 2, haze: '#f0b890' }));
    L(ctx, c, .55, () => { C.meadow(ctx, 430, 470, t, { col: '#7a8a3e', n: 80, haze: '#f0b890' }); C.water(ctx, -400, 466, 1700, 640, t, { pal: 'sunset', sunX: 980 }); for (let i = 0; i < 30; i++) P.reeds(ctx, -40 + i * 48, 520 + (i % 4) * 26, .6 + (i % 3) * .1, t, 4);
      // a hut standing in the flood: water lapping round its walls
      roundHut(ctx, 300, 560, .55, t, 2); ctx.save(); ctx.globalAlpha = .8; ctx.fillStyle = '#7a8aa8'; ctx.beginPath(); ctx.ellipse(300, 556, 80, 10, 0, 0, 7); ctx.fill(); ctx.restore(); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#7e8a3a'; ctx.beginPath(); ctx.moveTo(-300, 900); ctx.lineTo(-300, 650); ctx.quadraticCurveTo(640, 620, 1600, 660); ctx.lineTo(1600, 900); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); C.meadow(ctx, 650, 800, t, { col: '#7e8a3a', n: 160, flowers: 10 });
      person(ctx, 560, 704, .5, t, VILL[0], { pose: 'hold', prop: spade, face: 1, brow: 'sad', mouth: 'frown' }); person(ctx, 760, 704, .48, t, VILL[1], { pose: 'shrug', face: -1, eyes: 'half', mouth: 'frown' });
      ctx.fillStyle = '#2a2a2a'; for (let i = 0; i < 24; i++) { const x = 660 + Math.sin(t * 3 + i * 1.7) * 110, y = 420 + Math.cos(t * 2.4 + i * 2.1) * 50; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); } });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { reeds: true, flowers: 6 })); C.finish(ctx, t, 'sunset', { leakX: 980 });
    cap(ctx, 'but first, somebody has to get the water out', t, 'first', { size: 26 }); }
  // 4. early Romans dig a drainage channel through the valley down to the river
  function sChannel(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, y: -10 }, { z: 1.06, y: 10 }), dug = ease.inOut(clamp((t - A.early + .4) / 3.2));
    valley(ctx, c, t, { pal: 'golden', sun: [960, 300], dry: .25 + dug * .45, inside: ctx2 => {
      // the channel: from the marsh (centre, back) down across the valley floor to the Tiber in front, widening toward camera
      const y0 = 560, y1 = 694, yk = lerp(y0, y1, dug); ctx2.fillStyle = '#6a4a2e'; ctx2.beginPath(); ctx2.moveTo(626, y0); ctx2.lineTo(654, y0); ctx2.lineTo(lerp(654, 720, (yk - y0) / (y1 - y0)), yk); ctx2.lineTo(lerp(626, 560, (yk - y0) / (y1 - y0)), yk); ctx2.closePath(); ctx2.fill(); ctx2.strokeStyle = INK; ctx2.lineWidth = 3; ctx2.stroke();
      ctx2.save(); ctx2.clip(); C.water(ctx2, 540, y0, 740, y1, t, { sunX: 960, n: 30 }); ctx2.restore();
      // spoil banks along both sides, and the diggers working downhill
      for (const s of [-1, 1]) { ctx2.fillStyle = '#8a6a44'; ctx2.beginPath(); ctx2.moveTo(640 + s * 18, y0); ctx2.lineTo(lerp(640 + s * 90, 640 + s * 110, 1) , yk); ctx2.lineTo(640 + s * 60, yk); ctx2.closePath(); ctx2.globalAlpha = .7; ctx2.fill(); ctx2.globalAlpha = 1; } } });
    L(ctx, c, 1, () => { const yk = lerp(560, 694, dug); const W2 = (y => lerp(14, 80, (y - 560) / 134));
      [[.15, -1, 'pry'], [.3, 1, 'carry'], [.5, -1, 'carry'], [.68, 1, 'pry'], [.9, -1, 'pry'], [.95, 1, 'carry']].forEach(([u, s, pose], i) => { const y = lerp(560, yk, u) + 6; if (y > yk) return; const sc = lerp(.12, .3, (y - 560) / 134);
        person(ctx, 640 + s * (W2(y) + 26 * sc / .3), y, sc, t, VILL[i % 6], { pose, face: -s, prop: pose === 'pry' ? spade : basket, brow: 'angry' }); }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 10 })); C.rays(ctx, 960, 300, t, .08); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'early Romans dug a drainage channel', t, 'early', { size: 26 }); cap(ctx, 'through the valley, down to the river', t, 'channel', { size: 24, y: 686 }); }
  // the Cloaca Maxima in section: earth cut away; a stone-vaulted tunnel with water running; paving and people on top
  function section(ctx, t, o = {}) { const top = 300, fl = 600, cx = 640, R0 = 150, k = o.build ?? 1;
    // sky and a sliver of street life on the surface
    const sg = ctx.createLinearGradient(0, 0, 0, top); sg.addColorStop(0, '#8cb0cc'); sg.addColorStop(1, '#f2d8a8'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, top);
    if (o.surface) o.surface(ctx, top);
    // the earth: strata with stones and roots
    const LY = ['#9a7a50', '#8a6a44', '#7a5a3a', '#6a4a30', '#5a4028']; for (let i = 0; i < LY.length; i++) { ctx.fillStyle = LY[i]; ctx.fillRect(0, top + i * 90, W, 90); } ctx.strokeStyle = 'rgba(40,24,12,.4)'; ctx.lineWidth = 2; for (let i = 1; i < LY.length; i++) { ctx.beginPath(); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, top + i * 90 + Math.sin(x * .02 + i) * 5); ctx.stroke(); }
    const SR = C.rng(9); for (let i = 0; i < 30; i++) P.rock(ctx, SR() * W, top + 40 + SR() * 380, 8 + SR() * 12, '#a8987a');
    ctx.strokeStyle = 'rgba(70,46,24,.8)'; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const x = 60 + i * 160; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, top); ctx.quadraticCurveTo(x + 14, top + 30, x - 6, top + 60); ctx.stroke(); }
    // paving on top (once the vault is covered)
    if (k >= 1 && o.paving !== false) { for (let i = 0; i < 18; i++) cel(ctx, c => c.rect(i * 74 - 20, top - 16, 72, 18), '#d8ccb0', { shade: '#a89a78', dx: 0, dy: 5, lw: 2.5 }); }
    // the tunnel: dark interior, floor channel of water, then the vault's voussoirs and side walls of squared tufa blocks
    ctx.fillStyle = '#1e1610'; ctx.beginPath(); ctx.moveTo(cx - R0, fl); ctx.lineTo(cx - R0, fl - 120); ctx.arc(cx, fl - 120, R0, Math.PI, 0); ctx.lineTo(cx + R0, fl); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.rect(cx - R0, fl - 70, R0 * 2, 70); ctx.clip(); C.water(ctx, cx - R0, fl - 70, cx + R0, fl, t, { pal: 'golden', glint: false, n: 30 }); ctx.restore();
    for (const s of [-1, 1]) for (let r = 0; r < 4; r++) cel(ctx, c => c.rect(cx + s * R0 + (s < 0 ? -60 : 0), fl - 30 - r * 30, 60, 30), '#c8a878', { shade: '#9a7a50', dx: 4, dy: 4, lw: 2.5 });
    const n = 15; for (let i = 0; i < n; i++) { if (i / n > k) break; const a0 = Math.PI + i * Math.PI / n, a1 = a0 + Math.PI / n; cel(ctx, c => { c.arc(cx, fl - 120, R0 + 46, a0, a1); c.arc(cx, fl - 120, R0, a1, a0, true); c.closePath(); }, '#d0b080', { shade: '#a08050', light: '#e8cc9a', dx: 3, dy: 3, lw: 2.5 }); }
    // the river end on the right: the channel spills out into the Tiber
    ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 10; i++) { const x = ((t * 80 + i * 40) % (R0 * 2)) + cx - R0; ctx.fillRect(x, fl - 40 + (i % 3) * 10, 20, 2); }
    if (o.boat) o.boat(ctx, cx, fl); }
  // 5. later it was covered over: the vault rises stone by stone, then the Forum paving goes on top
  function sCovered(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.04 }), k = clamp((t - A.later + .2) / 2.4);
    L(ctx, c, 1, () => section(ctx, t, { build: k, surface: (ctx2, top) => { if (k < 1) return; for (let i = 0; i < 6; i++) person(ctx2, 120 + ((i * 210 + t * 30 * (i % 2 ? 1 : -1)) % 1100 + 1100) % 1100, top - 16, .2, t, CITIZENS[i], { pose: 'walk', face: i % 2 ? 1 : -1 }); stall(ctx2, 1100, top - 16, .4, t, 1); } }));
    C.finish(ctx, t, 'golden', { leak: false, vig: .45 });
    cap(ctx, 'later, it was covered over…', t, 'later', { size: 26 }); if (since(t, 'cloaca') > -.3) P.caption(ctx, 'the Cloaca Maxima', since(t, 'cloaca') + .3, { size: 34, sub: '"the greatest sewer"', subSize: 22, y: 660 }); }
  // 6. tradition credits the kings of the 500s BC: the king watches masons close the vault over a timber centring
  function sKings(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06, x: 30 }, { z: 1.0, x: -20 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 400, sun: [1060, 290], sunR: 44, seed: 321 }));
    L(ctx, c, .2, () => { C.mounds(ctx, { y: 410, n: 5, seed: 322, col: '#8aa070', far: .4, sunX: 1060, t, w: 560, h: 90, copses: 2 }); const r = C.mound(ctx, 1180, 470, 520, 220, { col: '#7e9a48', sunX: 1060, t, copses: 1, seed: 323 }); for (const hx of [1080, 1200]) house(ctx, hx, r(hx) + 10, .3, hx); });
    L(ctx, c, 1, () => { C.meadow(ctx, 450, 800, t, { col: '#8aa244', n: 200, flowers: 30 }); const GY = 500;
      // the open trench with the half-built vault and its wooden centring frame
      { const tg = ctx.createLinearGradient(0, GY, 0, GY + 170); tg.addColorStop(0, '#6a4a2e'); tg.addColorStop(1, '#2a1a10'); ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(180, GY); ctx.lineTo(880, GY); ctx.lineTo(870, 760); ctx.lineTo(190, 760); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = '#8a6a44'; ctx.fillRect(180, GY, 700, 12); ctx.fillStyle = '#5a8a3a'; ctx.fillRect(160, GY - 6, 740, 8); }
      ctx.strokeStyle = '#8a6040'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(530, GY + 170, 120, Math.PI, 0); ctx.stroke(); for (let i = 0; i < 7; i++) { const a = Math.PI + i * Math.PI / 6; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(530, GY + 170); ctx.lineTo(530 + Math.cos(a) * 120, GY + 170 + Math.sin(a) * 120); ctx.stroke(); }
      const kk = clamp((t - A.tradition + .5) / 3); for (let i = 0; i < 13; i++) { if (i / 13 > .35 + kk * .6) break; const a0 = Math.PI + i * Math.PI / 13, a1 = a0 + Math.PI / 13; cel(ctx, cc => { cc.arc(530, GY + 170, 164, a0, a1); cc.arc(530, GY + 170, 122, a1, a0, true); cc.closePath(); }, '#d0b080', { shade: '#a08050', dx: 3, dy: 3, lw: 2.5 }); }
      // stacked stones and masons
      for (let i = 0; i < 6; i++) cel(ctx, cc => cc.rect(900 + (i % 3) * 46, GY - 20 - Math.floor(i / 3) * 30, 44, 30), '#d0b080', { shade: '#a08050', dx: 4, dy: 4, lw: 2.5 });
      person(ctx, 470, GY + 8, .3, t, VILL[2], { pose: 'strike', prop: hammer, face: 1 }); person(ctx, 940, GY + 2, .34, t, VILL[4], { pose: 'carry', prop: basket, face: -1 }); person(ctx, 120, GY + 2, .34, t, VILL[5], { pose: 'pry', prop: spade, face: 1 });
      // the king on a low stone dais with a lictor
      cel(ctx, cc => cc.rect(1040, 600, 200, 30), '#d8ccb0', { shade: '#a89a78', dx: 0, dy: 6, lw: 3 }); person(ctx, 1150, 602, .5, t, KING, { pose: 'point', face: -1, brow: 'angry' }); person(ctx, 1240, 606, .44, t, LICTOR, { pose: 'hold', face: -1, prop: fasces }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 12 })); C.rays(ctx, 1060, 290, t, .08); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'Roman tradition credits it to the kings', t, 'tradition', { size: 26 }); cap(ctx, 'of the 500s BC', t, 'five', { size: 24, y: 686 }); }
  // the outlet in the Tiber embankment: three rings of stone voussoirs, the water pouring out into the river
  function outlet(ctx, t, o = {}) { const ax = 560, ay = 600, r = 110;
    // embankment wall of big squared blocks
    const wy = o.modern ? 180 : 330; cel(ctx, c => c.rect(-200, wy, 1700, 700 - wy), o.modern ? '#d8ccb0' : '#c8a878', { shade: o.modern ? '#a89a80' : '#9a7a50', dx: 0, dy: 0, lw: 4 });
    ctx.strokeStyle = 'rgba(80,60,40,.45)'; ctx.lineWidth = 2; for (let r2 = 0; r2 < 14; r2++) { const y = wy + r2 * 36; ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(1500, y); ctx.stroke(); for (let k = 0; k < 24; k++) { const x = -200 + k * 80 + (r2 % 2) * 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 36); ctx.stroke(); } }
    if (o.modern) { // a road and balustrade on top, plane trees, a street lamp, traffic
      ctx.fillStyle = '#7a7a80'; ctx.fillRect(-200, wy - 40, 1700, 40); for (let i = 0; i < 34; i++) ink(ctx, '#efe8da', c => c.rect(-180 + i * 50, wy - 80, 14, 40), 2); ink(ctx, '#efe8da', c => c.rect(-200, wy - 90, 1700, 12), 2.5);
      for (const tx of [120, 900, 1240]) C.tree(ctx, tx, wy - 44, .8, t, { kind: 'oak', seed: tx, col: '#6a8a3a' }); ink(ctx, '#3a3a40', c => c.rect(680, wy - 220, 8, 180), 2); ink(ctx, '#f8f0d0', c => c.ellipse(684, wy - 226, 14, 10, 0, 0, 7), 2.5);
      const cx = ((t * 160) % 1700) - 200; cel(ctx, c => { c.moveTo(cx, wy - 46); c.lineTo(cx + 110, wy - 46); c.lineTo(cx + 104, wy - 76); c.lineTo(cx + 74, wy - 96); c.lineTo(cx + 30, wy - 96); c.lineTo(cx + 10, wy - 76); c.closePath(); }, '#c8322a', { shade: '#8a2a20', dx: 0, dy: 6, lw: 3 }); for (const wx of [cx + 26, cx + 86]) ink(ctx, '#222', c => c.arc(wx, wy - 44, 11, 0, 7), 2);
      person(ctx, 330, wy - 46, .3, t, TOURIST[0], { pose: 'photo', face: 1, prop: (cc, x, y) => { ink(cc, '#2a2a30', c2 => c2.rect(x - 8, y - 30, 16, 26), 3); } }); person(ctx, 400, wy - 46, .3, t, TOURIST[1], { pose: 'point', face: 1 }); }
    // the triple ring of voussoirs and the dark mouth
    ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.moveTo(ax - r, 720); ctx.lineTo(ax - r, ay); ctx.arc(ax, ay, r, Math.PI, 0); ctx.lineTo(ax + r, 720); ctx.closePath(); ctx.fill();
    for (let ring = 0; ring < 3; ring++) { const r0 = r + ring * 34, n = 13 + ring * 2; for (let i = 0; i < n; i++) { const a0 = Math.PI + i * Math.PI / n, a1 = a0 + Math.PI / n; cel(ctx, c => { c.arc(ax, ay, r0 + 32, a0, a1); c.arc(ax, ay, r0, a1, a0, true); c.closePath(); }, ['#b8a07a', '#c8b088', '#a8906a'][ring], { shade: '#7a6448', dx: 3, dy: 3, lw: 2.5 }); } }
    if (o.modern) { ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 4; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(ax + i * 24, ay - Math.sqrt(Math.max(0, r * r - (i * 24) ** 2))); ctx.lineTo(ax + i * 24, 720); ctx.stroke(); } }
    // water pouring out into the river; the river in front
    ctx.save(); ctx.globalAlpha = o.modern ? .5 : .85; for (let i = 0; i < 18; i++) { const x = ax - r + 20 + i * ((2 * r - 40) / 17), ph = (t * 1.6 + i * .3) % 1; ctx.strokeStyle = `rgba(200,225,240,${.8 - ph * .5})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 640); ctx.quadraticCurveTo(x + 10, 660, x + 6, 690 + ph * 20); ctx.stroke(); } ctx.restore();
    C.water(ctx, -400, 690, 1700, 800, t, { pal: o.modern ? 'dawn' : 'golden', sunX: 900 }); }
  // 7. rebuilt again and again: masons on scaffolding repair the outlet as the seasons and centuries turn
  function sRebuilt(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.06, x: 20 }), era = Math.floor(lt / .7) % 4;
    L(ctx, c, .1, () => { C.sky(ctx, ['golden', 'dawn', 'sunset', 'golden'][era], t, { horizon: 330, sun: [1000, 220], sunR: 36, clouds: 4, seed: 330 + era }); C.mounds(ctx, { y: 330, n: 5, seed: 331, col: '#8aa070', far: .4, sunX: 1000, t, w: 560, h: 70, copses: 2 }); });
    L(ctx, c, 1, () => { outlet(ctx, t); // timber scaffolding with masons, its planks resting on the embankment
      ctx.strokeStyle = INK; ctx.lineWidth = 9; for (const sx of [400, 720]) { ctx.beginPath(); ctx.moveTo(sx, 700); ctx.lineTo(sx, 400); ctx.stroke(); } ctx.strokeStyle = '#8a6040'; ctx.lineWidth = 6; for (const sx of [400, 720]) { ctx.beginPath(); ctx.moveTo(sx, 700); ctx.lineTo(sx, 400); ctx.stroke(); }
      cel(ctx, cc => cc.rect(380, 440, 360, 14), '#a87a4a', { shade: '#7a5432', dx: 0, dy: 4, lw: 3 }); person(ctx, 470, 440, .32, t, VILL[era % 6], { pose: 'strike', prop: hammer, face: 1 }); person(ctx, 650, 440, .32, t, VILL[(era + 2) % 6], { pose: 'carry', prop: basket, face: -1 }); });
    P.grade(ctx, ['#ffb060', '#a8c8e8', '#ff8a60', '#e0c080'][era], .12, 'soft-light'); C.finish(ctx, t, 'golden');
    cap(ctx, 'rebuilt again and again', t, 'rebuilt', { size: 28 }); P.caption(ctx, ['6th c. BC', '4th c. BC', '2nd c. BC', '1st c. BC'][era], 1, { size: 22, x: 1220, y: 90, align: 'right' }); }
  // 8. Agrippa, Augustus's right-hand man, renovated it c. 33 BC — and, Pliny says, sailed through it in a boat
  function sAgrippa(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.12 }), vp = [640, 330];
    ctx.fillStyle = '#100c08'; ctx.fillRect(0, 0, W, H);
    L(ctx, c, 1, () => { // the tunnel receding in one-point perspective: arch rings of stone, the water floor
      for (let i = 14; i >= 0; i--) { const s = Math.pow(.82, i), w = 640 * s, h = 420 * s, x = vp[0], yb = vp[1] + 330 * s, rr = w * .5; const lit = clamp(1 - i / 9);
        cel(ctx, cc => { cc.moveTo(x - w * .7, yb + 60 * s); cc.lineTo(x - w * .7, yb - h * .4); cc.arc(x, yb - h * .4, w * .7, Math.PI, 0); cc.lineTo(x + w * .7, yb + 60 * s); cc.lineTo(x + w * .5, yb + 60 * s); cc.lineTo(x + w * .5, yb - h * .4); cc.arc(x, yb - h * .4, w * .5, 0, Math.PI, true); cc.lineTo(x - w * .5, yb + 60 * s); cc.closePath(); }, mix('#2a2018', '#c8a878', lit * .9), { shade: mix('#1a1410', '#8a6a44', lit * .8), dx: 0, dy: 0, lw: Math.max(1, 3 * s) });
        ctx.save(); ctx.globalAlpha = .7 * lit; ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = Math.max(1, 2 * s); for (let k = 1; k < 9; k++) { const a = Math.PI + k * Math.PI / 9; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * w * .5, yb - h * .4 + Math.sin(a) * w * .5); ctx.lineTo(x + Math.cos(a) * w * .7, yb - h * .4 + Math.sin(a) * w * .7); ctx.stroke(); } ctx.restore(); }
      ctx.fillStyle = '#2a3a3a'; ctx.beginPath(); ctx.moveTo(vp[0] - 20, vp[1] + 40); ctx.lineTo(vp[0] + 20, vp[1] + 40); ctx.lineTo(1000, 760); ctx.lineTo(280, 760); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(200,180,120,.5)'; ctx.lineCap = 'round'; for (let i = 0; i < 26; i++) { const ph = ((t * .3 + i * .07) % 1), y = lerp(vp[1] + 44, 760, ph * ph), w2 = lerp(4, 60, ph); ctx.lineWidth = 1 + ph * 2.5; ctx.beginPath(); ctx.moveTo(vp[0] + ((i * 37) % 50 - 25) * ph * 8 - w2 / 2, y); ctx.lineTo(vp[0] + ((i * 37) % 50 - 25) * ph * 8 + w2 / 2, y); ctx.stroke(); }
      // the boat: Agrippa standing with a lamp, a boatman poling at the stern
      const bob = Math.sin(t * 1.8) * 4; ctx.save(); ctx.translate(640, 700 + bob); cel(ctx, cc => { cc.moveTo(-230, -40); cc.lineTo(230, -40); cc.quadraticCurveTo(220, 10, 170, 20); cc.lineTo(-170, 20); cc.quadraticCurveTo(-220, 10, -230, -40); cc.closePath(); }, '#7a5232', { shade: '#4a3220', light: '#9a6a42', dx: 0, dy: 10, lw: 4 }); ctx.restore();
      person(ctx, 560, 660 + bob, .46, t, AGRIPPA, { pose: 'hold', prop: lamp, face: 1, eyes: 'wide' }); person(ctx, 780, 660 + bob, .42, t, VILL[4], { pose: 'hold', face: -1, prop: (cc, x, y) => { cc.strokeStyle = INK; cc.lineWidth = 6; cc.beginPath(); cc.moveTo(x + 40, y + 180); cc.lineTo(x - 40, y - 160); cc.stroke(); } });
      ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(610, 470 + bob, 10, 610, 470 + bob, 520); g.addColorStop(0, `rgba(255,190,100,${.55 + Math.sin(t * 9) * .04})`); g.addColorStop(1, 'rgba(255,190,100,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .6 });
    cap(ctx, 'Agrippa, Augustus\'s right-hand man', t, 'agrippa', { size: 26 }); cap(ctx, 'renovated it c. 33 BC · Pliny says he sailed through it by boat', t, 'thirty', { size: 22, y: 686 }); }
  // 9. still connected to Rome's drains today: the same outlet in the modern embankment under the road
  function sToday(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 });
    L(ctx, c, .1, () => C.sky(ctx, 'dawn', t, { horizon: 140, sun: [1100, 90], sunR: 30, clouds: 4, seed: 340 })); L(ctx, c, 1, () => outlet(ctx, t, { modern: true }));
    C.finish(ctx, t, 'dawn', { leakX: 1100 }); cap(ctx, 'parts of it are still connected to Rome\'s drains', t, 'parts', { size: 26, y: 640 }); cap(ctx, 'today', t, 'today', { size: 30, x: 1220, y: 640, align: 'right' }); }
  // 10. the first thing that made Rome possible wasn't a battle (a battle line, drained of colour)
  function sBattle(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06 });
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 430, seed: 351, clouds: 6 })); L(ctx, c, .25, () => C.mounds(ctx, { y: 440, n: 5, seed: 352, col: '#6a7060', far: .4, sunX: 640, t, w: 560, h: 90, copses: 1, haze: '#8a94a0' }));
    L(ctx, c, 1, () => { C.meadow(ctx, 470, 800, t, { col: '#6a7448', n: 180, flowers: 0, haze: '#8a94a0' }); for (let side = 0; side < 2; side++) for (let i = 0; i < 6; i++) { const x = side ? 760 + i * 70 : 140 + i * 70, y = 640 + (i % 2) * 20, f = side ? -1 : 1; person(ctx, x, y, .3, t, { kind: 'tunic', cloth: side ? '#6a4a3a' : '#8a3a2a', hair: '#2a1a14', seed: 70 + i + side * 7 }, { pose: i % 2 ? 'strike' : 'hold', face: f, prop: i % 2 ? (cc, x2, y2) => { cc.save(); cc.lineCap = 'round'; cc.strokeStyle = INK; cc.lineWidth = 7; cc.beginPath(); cc.moveTo(x2, y2); cc.lineTo(x2 + 6, y2 - 80); cc.stroke(); cc.restore(); } : spear, brow: 'angry' }); }
      ctx.fillStyle = 'rgba(200,190,170,.35)'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(640 + Math.sin(t + i) * 60, 640 - i * 10, 80 + i * 10, 20, 0, 0, 7); ctx.fill(); } });
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = `rgba(128,128,128,${.85})`; ctx.fillRect(0, 0, W, H); ctx.restore(); C.finish(ctx, t, 'storm', { leak: false, vig: .55, sat: 1 });
    cap(ctx, 'the first thing that made Rome possible…', t, 'firstthing', { size: 26 }); cap(ctx, '…wasn\'t a battle', t, 'battle', { size: 30, y: 686 }); }
  // 11. it was plumbing: the vault in section, bright, the water flowing out from under the Forum
  function sPlumbing(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 }); L(ctx, c, 1, () => section(ctx, t, { surface: (ctx2, top) => { for (let i = 0; i < 5; i++) person(ctx2, 160 + i * 220, top - 16, .2, t, CITIZENS[i], { pose: 'walk', face: i % 2 ? 1 : -1 }); } }));
    C.rays(ctx, 1100, 0, t, .12); C.finish(ctx, t, 'golden', { leak: true, leakX: 640 }); cap(ctx, 'it was plumbing', t, 'plumbing', { size: 36, x: 640, y: 660, align: 'center' }); }
  // 12. and the city grew: the drained valley becomes a market square; houses climb the hills
  function sGrew(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.1, y: 20 }, { z: 1.0 }), g = clamp(lt / dur);
    valley(ctx, c, t, { pal: 'golden', sun: [960, 300], dry: 1, huts: false, inside: (ctx2, r) => {
      ctx2.fillStyle = '#d8ccb0'; ctx2.beginPath(); ctx2.moveTo(400, 580); ctx2.lineTo(880, 580); ctx2.lineTo(940, 640); ctx2.lineTo(340, 640); ctx2.closePath(); ctx2.fill(); ctx2.strokeStyle = INK; ctx2.lineWidth = 2.5; ctx2.stroke(); ctx2.strokeStyle = 'rgba(120,100,70,.4)'; ctx2.lineWidth = 1.5; for (let i = 1; i < 9; i++) { ctx2.beginPath(); ctx2.moveTo(400 + i * 53, 580); ctx2.lineTo(340 + i * 67, 640); ctx2.stroke(); }
      const y1 = C.site(ctx2, 640, 160, 580, t, { podium: 16, steps: false, bushes: false, seed: 9 }); P.temple(ctx2, 640, y1, .3, { roof: '#c87a4a' });
      for (const [sx, i] of [[460, 0], [800, 1]]) stall(ctx2, sx, 628, .32, t, i); for (let i = 0; i < 7; i++) person(ctx2, 420 + i * 70, 636 - (i % 2) * 8, .14, t, CITIZENS[i % 6], { pose: i % 3 ? 'walk' : 'talk', face: i % 2 ? 1 : -1 });
      const n = Math.round(lerp(2, 12, g)); const spots = [[40, r.L], [100, r.L], [160, r.L], [220, r.L], [280, r.L], [1040, r.R], [1100, r.R], [1160, r.R], [1220, r.R], [1270, r.R], [1000, r.R], [330, r.L]];
      for (let i = 0; i < n; i++) { const [hx, rf] = spots[i]; house(ctx2, hx, rf(hx) + 30, .3, i); } } });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 12 })); C.rays(ctx, 960, 300, t, .08); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'and the city grew', t, 'grew', { size: 28 }); }
  // 13. the kings got kicked out, by tradition c. 509 BC: the last king leaves through the city gate, the crowd behind him
  function sKingsOut(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: 30 }, { z: 1.08, x: -30 }), w = clamp(lt / dur);
    L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 380, sun: [200, 300], sunR: 44, seed: 361 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 390, n: 5, seed: 362, col: '#8a9a70', far: .45, sunX: 200, t, w: 560, h: 90, copses: 2, haze: '#f0b890' }));
    L(ctx, c, 1, () => { C.meadow(ctx, 420, 800, t, { col: '#8a9a44', n: 160, flowers: 20, haze: '#f0b890' }); const GY = 640;
      // the city wall of tufa blocks with its gate; houses and a temple roof behind it
      for (const hx of [780, 900, 1180]) house(ctx, hx, 380, .34, hx); const ty = C.site(ctx, 1040, 120, 380, t, { podium: 10, steps: false, bushes: false, seed: 3 }); P.temple(ctx, 1040, ty, .22, { roof: '#c87a4a' });
      cel(ctx, cc => cc.rect(640, 360, 760, 290), '#c8a878', { shade: '#9a7a50', dx: 0, dy: 0, lw: 4 }); ctx.strokeStyle = 'rgba(80,60,40,.45)'; ctx.lineWidth = 2; for (let r = 0; r < 8; r++) { const y = 360 + r * 36; ctx.beginPath(); ctx.moveTo(640, y); ctx.lineTo(1400, y); ctx.stroke(); for (let k = 0; k < 10; k++) { const x = 640 + k * 80 + (r % 2) * 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 36); ctx.stroke(); } }
      ctx.fillStyle = '#2a1e14'; ctx.beginPath(); ctx.moveTo(720, GY + 10); ctx.lineTo(720, 500); ctx.arc(800, 500, 80, Math.PI, 0); ctx.lineTo(880, GY + 10); ctx.closePath(); ctx.fill(); for (let i = 0; i < 11; i++) { const a0 = Math.PI + i * Math.PI / 11, a1 = a0 + Math.PI / 11; cel(ctx, cc => { cc.arc(800, 500, 112, a0, a1); cc.arc(800, 500, 80, a1, a0, true); cc.closePath(); }, '#d8bc8a', { shade: '#a08050', dx: 2, dy: 2, lw: 2.5 }); }
      // the crowd in the gateway, shaking fists; the king, queen and a servant walking away to the left
      for (let i = 0; i < 6; i++) person(ctx, 740 + i * 26, GY + 4 - (i % 2) * 6, .3, t, CITIZENS[i], { pose: i % 2 ? 'up' : 'point', face: -1, brow: 'angry', mouth: 'o' });
      const kx = lerp(560, 260, w); person(ctx, kx, GY + 30, .46, t, KING, { pose: 'walk', face: -1, brow: 'angry', mouth: 'frown' }); person(ctx, kx + 120, GY + 30, .42, t, QUEEN, { pose: 'walk', face: -1, eyes: 'half' }); person(ctx, kx + 220, GY + 30, .38, t, VILL[2], { pose: 'carry', prop: basket, face: -1, walk: true }); });
    L(ctx, c, 1.3, () => C.foreground(ctx, t, { flowers: 8 })); C.finish(ctx, t, 'sunset', { leakX: 200 });
    cap(ctx, 'the kings got kicked out', t, 'kicked', { size: 28 }); cap(ctx, 'by tradition, around 509 BC', t, 'nine', { size: 24, y: 686 }); }
  // 14. Rome became a republic, run by elected officials: citizens cross the voting bridges and drop their tablets in the urn
  function sVote(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.06, x: 20 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 400, sun: [1060, 260], sunR: 40, seed: 371 })); L(ctx, c, .2, () => { C.mounds(ctx, { y: 410, n: 5, seed: 372, col: '#8aa070', far: .4, sunX: 1060, t, w: 560, h: 90, copses: 2 }); for (const hx of [120, 260, 1100, 1220]) house(ctx, hx, 450, .32, hx); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-300, 470, 1900, 400); ctx.strokeStyle = 'rgba(120,100,70,.4)'; ctx.lineWidth = 1.5; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 90 - 200, 470); ctx.lineTo(i * 110 - 400, 760); ctx.stroke(); }
      // the wooden gangway (pons) up to the urn; officials watching at the top
      cel(ctx, cc => { cc.moveTo(160, 680); cc.lineTo(700, 560); cc.lineTo(700, 580); cc.lineTo(160, 700); cc.closePath(); }, '#a87a4a', { shade: '#7a5432', dx: 0, dy: 6, lw: 3 }); for (let i = 0; i < 6; i++) ink(ctx, '#7a5432', cc => cc.rect(200 + i * 90, 680 - i * 20, 10, 80), 2.5);
      cel(ctx, cc => cc.rect(700, 560, 260, 20), '#a87a4a', { shade: '#7a5432', dx: 0, dy: 6, lw: 3 }); for (const lx of [710, 940]) ink(ctx, '#7a5432', cc => cc.rect(lx, 580, 12, 140), 2.5);
      cel(ctx, cc => { cc.moveTo(800, 520); cc.lineTo(860, 520); cc.lineTo(852, 560); cc.lineTo(808, 560); cc.closePath(); }, '#b8884e', { shade: '#86602e', dx: 5, dy: 0, lw: 3 });
      for (let i = 0; i < 5; i++) { const u = ((t * .08 + i * .2) % 1), x = lerp(180, 760, u), y = lerp(690, 566, u); person(ctx, x, y, .26, t, CITIZENS[i], { pose: u > .9 ? 'hold' : 'walk', face: 1, prop: tablet }); }
      person(ctx, 900, 562, .3, t, CITIZENS[1], { pose: 'chin', face: -1 }); cel(ctx, cc => cc.rect(1040, 640, 160, 26), '#efe8da', { shade: '#c0b8a8', dx: 0, dy: 6, lw: 3 }); person(ctx, 1110, 642, .44, t, Object.assign({}, CITIZENS[3], { trim: '#7a2a62' }), { pose: 'talk', talk: true, face: -1 }); for (const lx of [1010, 1230]) person(ctx, lx, 660, .38, t, LICTOR, { pose: 'hold', face: -1, prop: fasces }); });
    C.motes(ctx, t); C.finish(ctx, t, 'golden'); cap(ctx, 'Rome became a republic', t, 'republic', { size: 28 }); cap(ctx, 'run by elected officials', t, 'elected', { size: 24, y: 686 }); }
  // 15. and the Senate of rich families: the Curia, senators in purple-striped togas on tiered benches, one speaking
  function sSenate(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06 }, { z: 1.0 });
    L(ctx, c, .8, () => { ctx.fillStyle = '#e8dcc4'; ctx.fillRect(-100, -100, 1500, 1000); ctx.fillStyle = '#7a2a20'; ctx.fillRect(-100, -100, 1500, 70); ctx.strokeStyle = '#d8a040'; ctx.lineWidth = 3; for (let x = -80; x < 1400; x += 40) { ctx.beginPath(); ctx.moveTo(x, -20); ctx.lineTo(x + 20, -42); ctx.lineTo(x + 40, -20); ctx.stroke(); }
      for (let i = 0; i < 6; i++) { const px = 40 + i * 210, base = ['#b8806a', '#7a9a8a', '#d8b890', '#8a6a8a'][i % 4]; ink(ctx, '#e8dcc4', cc => cc.rect(px, 40, 170, 240), 3); cel(ctx, cc => cc.rect(px + 14, 54, 142, 212), base, { shade: mix(base, '#2a1a10', .3), light: mix(base, '#ffffff', .3), dx: 10, dy: 10, lw: 2 }); const MR = C.rng(i + 3); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.5; for (let v = 0; v < 6; v++) { ctx.beginPath(); let x = px + 14 + MR() * 142, y = 54; ctx.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (MR() - .5) * 40; y += 36; ctx.lineTo(Math.max(px + 16, Math.min(px + 154, x)), y); } ctx.stroke(); } ink(ctx, null, cc => cc.rect(px + 30, 72, 110, 176), 3, '#d8a040'); }
      for (let i = 0; i < 7; i++) P.column(ctx, -20 + i * 220, 330, 34, 290, { col: '#efe6d2' });
      // the statue of Victory on her plinth at the far end
      cel(ctx, cc => cc.rect(600, 250, 80, 80), '#d8ccb0', { shade: '#a89a78', dx: 6, dy: 0, lw: 3 }); for (const d of [-1, 1]) cel(ctx, cc => { cc.moveTo(640 + d * 8, 168); cc.quadraticCurveTo(640 + d * 80, 110, 640 + d * 74, 200); cc.quadraticCurveTo(640 + d * 40, 190, 640 + d * 10, 200); cc.closePath(); }, '#e8c050', { shade: '#a87a28', light: '#f8e090', dx: 4, dy: 3, lw: 2.5 });
      ctx.save(); ctx.filter = 'sepia(1) saturate(3.5) brightness(1.05)'; person(ctx, 640, 252, .26, t, { kind: 'stola', cloth: '#e8e0c8', cloth2: '#f4ecd8', hairStyle: 'bun', hair: '#d8c8a0', skin: '#f0e6d0', seed: 99 }, { pose: 'wave', face: 1 }); ctx.restore();
      // opus sectile floor
      ctx.fillStyle = '#b8a07a'; ctx.fillRect(-100, 600, 1500, 200); for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) { ctx.fillStyle = (i + r) % 2 ? '#8a3a2a' : '#d8ccb0'; ctx.beginPath(); const y = 610 + r * 30, x = i * 90 - r * 20; ctx.moveTo(x, y + 14); ctx.lineTo(x + 45, y); ctx.lineTo(x + 90, y + 14); ctx.lineTo(x + 45, y + 28); ctx.closePath(); ctx.fill(); } });
    L(ctx, c, 1, () => { // stepped benches on both sides with senators; the consul speaking from the floor
      for (const s of [-1, 1]) for (let tier = 0; tier < 3; tier++) { const y = 470 + tier * 60, x0 = s < 0 ? -40 + tier * 30 : 900 - tier * 30, w = 420 - tier * 30; cel(ctx, cc => cc.rect(x0, y, w, 60), '#d8ccb0', { shade: '#a89a78', dx: 0, dy: 8, lw: 3 }); for (let i = 0; i < 4; i++) person(ctx, x0 + 50 + i * (w - 80) / 3, y, .2 + tier * .03, t, SENATOR(tier * 4 + i + (s > 0 ? 20 : 0)), { pose: (i + tier) % 4 === 0 ? 'chin' : (i + tier) % 4 === 1 ? 'crossed' : 'stand', face: s < 0 ? 1 : -1, eyes: (i + tier) % 3 ? 'open' : 'half' }); }
      person(ctx, 640, 690, .5, t, Object.assign(SENATOR(3), { trim: '#7a2a62' }), { pose: 'talk', talk: true, face: 1 }); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .5 }); cap(ctx, 'and the Senate', t, 'senate', { size: 28 }); cap(ctx, 'of rich families', t, 'families', { size: 24, y: 686 }); }
  // 16. growing cities attract attention: the town on its hills at dusk, warriors on a dark ridge watching it
  function sAttention(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: 40 }, { z: 1.1, x: -20 });
    L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 420, sun: [880, 380], sunR: 54, seed: 381 }));
    L(ctx, c, .3, () => { C.mounds(ctx, { y: 430, n: 5, seed: 382, col: '#6a7a5a', far: .35, sunX: 880, t, w: 520, h: 120, copses: 1, haze: '#f0b890' }); C.meadow(ctx, 470, 900, t, { col: '#5a7038', n: 120, flowers: 10, haze: '#f0b890' }); const r = C.mound(ctx, 760, 520, 900, 200, { col: '#5a7a40', sunX: 880, t, copses: 0, seed: 383, haze: '#f0b890' });
      for (let i = 0; i < 12; i++) { const hx = 380 + i * 64; house(ctx, hx, r(hx) + 20, .2, i); ctx.fillStyle = `rgba(255,200,110,${.6 + .3 * Math.sin(t * 2 + i)})`; ctx.fillRect(hx - 4, r(hx) + 6, 7, 6); } });
    L(ctx, c, 1, () => { ctx.fillStyle = '#1a1210'; ctx.beginPath(); ctx.moveTo(-300, 900); ctx.lineTo(-300, 610); ctx.quadraticCurveTo(300, 560, 560, 640); ctx.quadraticCurveTo(700, 690, 760, 900); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.filter = 'brightness(0)'; for (const [x, i, pose] of [[120, 0, 'point'], [230, 1, 'hold'], [330, 2, 'hold']]) person(ctx, x, 600 + (i === 2 ? 14 : 0), .5, t, { kind: 'tunic', hair: '#000', hairStyle: 'long', beard: true, seed: 90 + i }, { pose, face: 1, prop: pose === 'hold' ? spear : null });
      for (const [x, y] of [[200, 520], [300, 530]]) { ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(x, y, 34, 40, 0, 0, 7); ctx.fill(); } ctx.restore(); });
    C.finish(ctx, t, 'sunset', { leakX: 880, vig: .55 }); cap(ctx, 'but growing cities attract attention', t, 'growing', { size: 28, x: 1220, y: 90, align: 'right' }); }

  const fin = draw => (ctx, lt, dur, t) => { draw(ctx, lt, dur, t); };
  const cut = [[0, fin(sSwamp), 0], [A.forum - .5, fin(sForumGhost), .8], [A.first - .1, fin(sFirst), .4], [A.early - .5, fin(sChannel), .5], [A.later - .2, fin(sCovered), .5],
    [A.tradition - .3, fin(sKings), .4], [A.rebuilt - .3, fin(sRebuilt), .4], [A.agrippa - .7, fin(sAgrippa), .4], [A.parts - .2, fin(sToday), .5], [A.think - .1, fin(sBattle), .5],
    [A.plumbing - .2, fin(sPlumbing), .25], [A.grew - .5, fin(sGrew), .5], [A.kingsout - .2, fin(sKingsOut), .4], [A.republic - .5, fin(sVote), .4], [A.elected + 1.0, fin(sSenate), .4],
    [A.growing - .2, fin(sAttention), .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: .2, type: 'wind', gain: .3 }, { t: A.first, type: 'bubbles', gain: .3 }, { t: A.early, type: 'scratch', gain: .35 }, { t: A.channel + .5, type: 'splash', gain: .3 }, { t: A.later + .4, type: 'thud', gain: .3 },
    { t: A.cloaca, type: 'swell', gain: .4 }, { t: A.tradition, type: 'clang', gain: .2 }, { t: A.rebuilt, type: 'thud', gain: .3 }, { t: A.agrippa - .4, type: 'splash', gain: .25 }, { t: A.parts, type: 'whoosh', gain: .3 },
    { t: A.battle, type: 'clang', gain: .35 }, { t: A.plumbing, type: 'bubbles', gain: .45 }, { t: A.grew, type: 'swell', gain: .35 }, { t: A.kicked, type: 'rattle', gain: .35 }, { t: A.republic, type: 'paper', gain: .3 },
    { t: A.senate, type: 'press', gain: .25 }, { t: A.attention, type: 'boom', gain: .35 }];
  const moods = [{ t: 0, mood: 'still' }, { t: A.think - .2, mood: 'mystery' }, { t: A.grew - .5, mood: 'still' }, { t: A.growing - .3, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat3.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
