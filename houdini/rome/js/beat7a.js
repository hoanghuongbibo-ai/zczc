/* Rome — Beat 7a, "Near-death #2" (narration-beat7a.mp3 = narration-full.mp3 684.0–774.7 s + pad).
 * The 800-year streak ends: Alaric, a Goth who had fought for Rome, wants land for his people and a top Roman rank; the emperor in
 * Ravenna keeps saying no; two sieges bought off; talks break down; 24 August 410 the Salarian Gate is opened from inside; three days
 * of sack — killed, captured, sold, the emperor's sister taken — yet "surprisingly restrained", the great churches spared. The real
 * damage was to minds: Jerome in Bethlehem. Rome should have died here. It didn't: the Vandals in 455, Romulus Augustulus deposed in 476
 * — the textbook date — but people kept living; the Senate met, the baths ran, because the aqueducts ran. For now. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer, K = G.RK;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const { person, CIVIL, SOLDIER, GOTH } = K;
  const OFF = 684.0;
  const A0 = { remember: 684.36, streak: 685.49, ends: 686.95, alaric: 688.09, goth: 690.07, fought: 691.36, promised: 693.36, land: 694.38, rank: 697.09, emperor: 699.03, ravenna: 700.9, no: 702.31,
    besieged: 704.14, twice: 705.61, paid: 706.3, deal: 707.59, talks: 708.93, night: 710.89, aug: 711.21, y410: 712.68, someone: 713.41, inside: 715.33, nobody: 716.48, three: 718.18, sacked: 719.67,
    howbad: 721.45, killed: 723.12, sold: 724.47, sister: 726.35, hostage: 727.3, standards: 728.91, writers: 730.62, restrained: 732.54, spared: 734.65, churches: 735.38, real: 736.88, minds: 738.37,
    bethlehem: 739.67, scholar: 740.54, wrote: 741.4, city: 743.45, world: 745.06, taken: 746.5, died: 748.63, here: 749.38, didnt: 750.65, vandals: 751.56, y455: 753.05, y476: 754.72, last: 756.03,
    teenager: 757.64, romulus: 758.5, pushed: 760.19, throne: 760.92, textbook: 762.47, thing: 764.11, people: 765.1, living: 767.69, senate: 768.89, baths: 770.26, aqueducts: 772.14, fornow: 773.86 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 91.2;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };
  const ALARIC = { kind: 'tunic', cloth: '#3a5a7a', legs: '#7a3a2a', hair: '#c8a050', hairStyle: 'long', beard: true, beardCol: '#c8a050', cap: '#b8893a', seed: 220 };
  const HONORIUS = { kind: 'toga', trim: '#7a2a62', hair: '#3a2416', hairStyle: 'short', seed: 221 };
  const GALLA = { kind: 'stola', cloth: '#7a2a62', cloth2: '#efe0c0', hairStyle: 'bun', hair: '#2a1a14', seed: 222 };
  const JEROME = { kind: 'monk', beard: true, beardCol: '#c8c8c0', seed: 223 };
  const TEEN = { kind: 'toga', trim: '#7a2a62', hair: '#8a5a30', hairStyle: 'curly', seed: 224 };
  const goldChest = (ctx, x, y, s = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => c.rect(-40, -40, 80, 40), '#8a5a34', { shade: '#5a3a20', dx: 8, dy: 0, lw: 3 }); for (let i = 0; i < 5; i++) cel(ctx, c => c.arc(-28 + i * 14, -44 + (i % 2) * 4, 9, 0, 7), '#e8b830', { shade: '#b08018', dx: 2, dy: 2, lw: 1.5 }); ctx.restore(); };
  const tent = (ctx, x, y, s, col) => { cel(ctx, c => { c.moveTo(x - 80 * s, y); c.lineTo(x, y - 100 * s); c.lineTo(x + 80 * s, y); c.closePath(); }, col, { shade: mix(col, '#3a2414', .3), dx: 26 * s, dy: 0, lw: 3 }); ctx.fillStyle = '#2a1a10'; ctx.beginPath(); ctx.moveTo(x - 18 * s, y); ctx.lineTo(x, y - 54 * s); ctx.lineTo(x + 18 * s, y); ctx.closePath(); ctx.fill(); };
  const campfire = (ctx, x, y, s, t) => { for (let i = 0; i < 3; i++) ink(ctx, '#5a3a20', c => c.rect(x - 24 * s + i * 4, y - 6 * s, 48 * s, 7 * s), 1.5); K.flames(ctx, x, y - 4, .3 * s, t, { smoke: false }); };

  // 1. remember the 800-year streak? here's where it ends: the wax tablet from the Gauls' beat, its count running up and cracking
  function sStreak(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.12 }), yr = Math.round(lerp(390, 410, clamp((t - A.streak) / 1.4))), cr = clamp((t - A.ends) / .3);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 470, seed: 1101, clouds: 4 })); L(ctx, c, .3, () => C.mounds(ctx, { y: 480, n: 5, seed: 1102, col: '#6a7a58', far: .4, sunX: 900, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, 1, () => { C.meadow(ctx, 500, 800, t, { col: '#6a8a3a', n: 120 }); for (const px of [440, 830]) cel(ctx, cc => cc.rect(px - 10, 500, 20, 140), '#6a4428', { shade: '#4a2e18', dx: 5, dy: 0, lw: 3 }); ctx.save(); ctx.translate(640, 400); ctx.rotate(-.04); cel(ctx, cc => cc.rect(-260, -150, 520, 300), '#8a5a30', { shade: '#5a3a20', dx: 0, dy: 10, lw: 5 }); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(-236, -126, 472, 252);
      ctx.font = '700 64px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#e8d8b0'; ctx.fillText('800 YEARS', 0, -30); ctx.font = '700 30px "Liberation Serif", serif'; ctx.fillText('no enemy inside the walls', 0, 20); ctx.fillText(`390 BC → AD ${yr > 390 ? yr : '…'}`, 0, 80);
      if (cr > 0) { ctx.strokeStyle = '#1a1410'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, -150); ctx.lineTo(-10, -60); ctx.lineTo(-50, 10); ctx.lineTo(10, 80 * cr); ctx.lineTo(-20, 150 * cr); ctx.stroke(); } ctx.restore(); });
    C.finish(ctx, t, 'storm', { leak: false, vig: .55 }); cap(ctx, 'remember the 800-year streak?', t, 'remember', { size: 26, y: 60 }); cap(ctx, 'here\'s where it ends', t, 'ends', { size: 28, y: 686 }); }
  // 2. Alaric: a Goth commander who had fought for Rome; he wanted land for his people and a top rank in the Roman army
  function sAlaric(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.08, x: 30 }), rk = clamp((t - A.rank + .2) / .6);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 430, sun: [1060, 260], sunR: 40, seed: 1111 })); L(ctx, c, .25, () => C.mounds(ctx, { y: 440, n: 5, seed: 1112, col: '#8aa070', far: .4, sunX: 1060, t, w: 560, h: 90, copses: 3 }));
    L(ctx, c, .55, () => { C.meadow(ctx, 470, 800, t, { col: '#8aa244', n: 100, flowers: 10 }); // the Gothic families camped with their wagons
      for (let i = 0; i < 4; i++) tent(ctx, 760 + i * 150, 540 + (i % 2) * 14, .8, ['#c8b090', '#a8906a', '#b8a080'][i % 3]);
      for (let i = 0; i < 2; i++) { const wx = 900 + i * 260, wy = 600; cel(ctx, cc => cc.rect(wx - 80, wy - 70, 160, 50), '#8a6040', { shade: '#5a3a20', dx: 0, dy: 6, lw: 3 }); cel(ctx, cc => cc.arc(wx, wy - 70, 80, Math.PI, 0), '#d8ccb0', { shade: '#a89a78', dx: 14, dy: 0, lw: 3 }); for (const d of [-50, 50]) ink(ctx, '#5a3a20', cc => cc.arc(wx + d, wy - 10, 22, 0, 7), 4); }
      campfire(ctx, 820, 640, 1, t); for (let i = 0; i < 4; i++) person(ctx, 740 + i * 140, 680 + (i % 2) * 12, .36, t, [K.MED(1), GOTH(i), K.MED(3), GOTH(i + 2)][i], { pose: since(t, 'land') > 0 && i === 1 ? 'point' : 'stand', face: -1 }); });
    L(ctx, c, 1, () => { person(ctx, 380, 720, .7, t, ALARIC, { pose: rk > 0 ? 'hold' : 'talk', talk: rk <= 0, face: 1, prop: rk > 0 ? (cc, x, y) => { cc.strokeStyle = INK; cc.lineWidth = 6; cc.beginPath(); cc.moveTo(x, y + 60); cc.lineTo(x, y - 120); cc.stroke(); cel(cc, c2 => { c2.moveTo(x - 30, y - 130); c2.quadraticCurveTo(x, y - 170, x + 30, y - 130); c2.lineTo(x, y - 120); c2.closePath(); }, '#e8b830', { shade: '#b08018', dx: 4, dy: 0, lw: 2.5 }); } : K.spear });
      cel(ctx, cc => { cc.moveTo(330, 470); cc.quadraticCurveTo(300, 600, 320, 700); cc.lineTo(280, 700); cc.quadraticCurveTo(270, 580, 300, 480); cc.closePath(); }, '#a8322a', { shade: '#7a2420', dx: 6, dy: 0, lw: 3 }); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'Alaric: a Goth commander who had fought for Rome', t, 'alaric', { size: 24, y: 60 }); cap(ctx, 'he wanted what he\'d been promised: land for his people', t, 'promised', { size: 22, y: 660 }); cap(ctx, 'and a top rank in the Roman army', t, 'rank', { size: 22, y: 696 }); }
  // 3. the emperor, safe behind the marshes in Ravenna, kept saying no
  function sNo(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 }), shake = since(t, 'no') > 0 ? Math.sin(t * 14) * .5 : 0;
    L(ctx, c, .8, () => { ctx.fillStyle = '#e8dcc4'; ctx.fillRect(-200, -200, 1700, 900); for (let i = 0; i < 6; i++) { cel(ctx, cc => cc.rect(40 + i * 210, 60, 150, 240), '#2a5a7a', { shade: '#1a3a5a', dx: 8, dy: 8, lw: 2 }); for (let k = 0; k < 6; k++) { ctx.fillStyle = '#e8c040'; ctx.fillRect(56 + i * 210 + (k % 3) * 44, 90 + Math.floor(k / 3) * 100, 20, 20); } }
      // a window onto the marsh: water and reeds all round
      ctx.save(); ctx.beginPath(); ctx.rect(980, 330, 220, 230); ctx.clip(); C.sky(ctx, 'golden', t, { horizon: 470, sun: [1150, 400], sunR: 24, clouds: 1, seed: 1121 }); C.water(ctx, 960, 470, 1220, 580, t, {}); for (let i = 0; i < 4; i++) P.reeds(ctx, 1000 + i * 60, 570, .5, t, 5); ctx.restore(); ink(ctx, null, cc => cc.rect(980, 330, 220, 230), 10, '#8a6040');
      for (let i = 0; i < 6; i++) P.column(ctx, -20 + i * 250, 600, 30, 560, { col: '#efe6d2' }); ctx.fillStyle = '#b8a07a'; ctx.fillRect(-200, 600, 1700, 300); });
    L(ctx, c, 1, () => { cel(ctx, cc => cc.rect(470, 520, 260, 80), '#efe6d2', { shade: '#c0b8a8', dx: 0, dy: 8, lw: 3 }); cel(ctx, cc => { cc.moveTo(520, 520); cc.lineTo(520, 330); cc.quadraticCurveTo(600, 290, 680, 330); cc.lineTo(680, 520); cc.closePath(); }, '#d8b048', { shade: '#a88028', dx: 18, dy: 0, lw: 4 });
      person(ctx, 600, 560, .56, t, HONORIUS, { pose: since(t, 'no') > 0 ? 'crossed' : 'stand', face: 1, mouth: 'frown', brow: 'angry' });
      person(ctx, 900, 700, .5, t, GOTH(3), { pose: 'hold', face: -1, prop: (cc, x, y) => K.scroll(cc, x, y - 10, 60, 30, 1) }); for (let i = 0; i < 2; i++) person(ctx, 300 - i * 120, 700, .5, t, SOLDIER(i), { pose: 'hold', face: 1, prop: K.spear }); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .5 }); cap(ctx, 'the emperor, safe behind the marshes in Ravenna…', t, 'emperor', { size: 24 }); cap(ctx, '…kept saying no', t, 'no', { size: 28, y: 686 }); }
  // 4. so Alaric besieged Rome; twice he was paid to leave or got a deal: Gothic camps ring the wall, a cart of treasure goes out
  function sSiege(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: 40 }, { z: 1.08, x: -20 }), pk = clamp((t - A.paid) / 2.4);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 420, seed: 1131, clouds: 4 })); L(ctx, c, .2, () => { C.mounds(ctx, { y: 380, n: 5, seed: 1132, col: '#7a8070', far: .5, sunX: 900, t, w: 560, h: 80, copses: 2 }); for (let i = 0; i < 6; i++) P.temple(ctx, 300 + i * 160, 380, .22, { roof: '#d8b048' }); });
    L(ctx, c, .55, () => { ctx.fillStyle = '#8a8a60'; ctx.fillRect(-300, 480, 1900, 400); K.aurelianWall(ctx, 480, -300, 1600, 640, .7, t, { open: pk > 0 && pk < 1 ? 1 : 0 }); for (let i = 0; i < 8; i++) person(ctx, -100 + i * 230, 340, .16, t, SOLDIER(i), { pose: 'hold', face: 1, prop: K.spear }); });
    L(ctx, c, 1, () => { C.meadow(ctx, 560, 800, t, { col: '#7a9a3a', n: 100 }); for (let i = 0; i < 7; i++) tent(ctx, -60 + i * 230, 610 + (i % 2) * 30, .8, ['#c8b090', '#a8906a', '#b8a080'][i % 3]); for (let i = 0; i < 4; i++) campfire(ctx, 80 + i * 360, 690, 1, t + i);
      for (let i = 0; i < 6; i++) person(ctx, -20 + i * 250, 740, .4, t, GOTH(i), { pose: i % 2 ? 'hold' : 'stand', face: -1, prop: i % 2 ? K.spear : null });
      if (pk > 0) { const x = lerp(640, 1200, pk), y = lerp(500, 700, pk); cel(ctx, cc => cc.rect(x - 70, y - 50, 140, 40), '#8a6040', { shade: '#5a3a20', dx: 0, dy: 6, lw: 3 }); for (const d of [-40, 40]) ink(ctx, '#5a3a20', cc => cc.arc(x + d, y - 6, 18, 0, 7), 4); goldChest(ctx, x - 30, y - 50, .8); goldChest(ctx, x + 30, y - 50, .8); } });
    C.finish(ctx, t, 'storm', { leak: false, vig: .5 }); cap(ctx, 'so Alaric besieged Rome', t, 'besieged', { size: 26 }); cap(ctx, 'twice he was paid to leave, or got a deal', t, 'twice', { size: 24, y: 686 }); }
  // 5. then talks broke down: the treaty scroll torn on the table
  function sTalks(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.12 }), tr = clamp((t - A.talks - .3) / .5);
    L(ctx, c, .8, () => { ctx.fillStyle = '#c8b090'; ctx.fillRect(-200, -200, 1700, 900); for (let i = 0; i < 9; i++) ink(ctx, '#a8906a', cc => cc.rect(i * 160 - 60, -100, 20, 900), 0); ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-200, 600, 1700, 300); });
    L(ctx, c, 1, () => { cel(ctx, cc => cc.rect(300, 480, 680, 40), '#7a5232', { shade: '#5a3a20', dx: 0, dy: 8, lw: 4 }); for (const lx of [330, 940]) ink(ctx, '#5a3a20', cc => cc.rect(lx, 520, 16, 100), 2.5);
      for (const d of [-1, 1]) { ctx.save(); ctx.translate(640 + d * tr * 70, 470); ctx.rotate(d * tr * .25); ink(ctx, '#efe0bc', cc => cc.rect(d < 0 ? -110 : 0, -24, 110, 48), 3); ctx.strokeStyle = 'rgba(90,60,30,.6)'; ctx.lineWidth = 2; for (let r = 0; r < 4; r++) { ctx.beginPath(); ctx.moveTo(d < 0 ? -100 : 8, -14 + r * 10); ctx.lineTo(d < 0 ? -8 : 100, -14 + r * 10); ctx.stroke(); } ctx.restore(); }
      person(ctx, 220, 700, .6, t, ALARIC, { pose: tr > 0 ? 'point' : 'talk', talk: true, face: 1, brow: 'angry', mouth: 'frown' }); person(ctx, 1060, 700, .6, t, CIVIL[0], { pose: tr > 0 ? 'crossed' : 'talk', talk: tr <= 0, face: -1, brow: 'angry', mouth: 'frown' }); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .5 }); cap(ctx, 'then talks broke down', t, 'talks', { size: 28 }); }
  // 6. the night of 24 August 410: someone opened the Salarian Gate from the inside — nobody's sure who
  function sGate(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 10 }), op = ease.inOut(clamp((t - A.inside + .6) / 1.6));
    L(ctx, c, .04, () => { C.sky(ctx, 'night', t, { horizon: 520, seed: 1141, clouds: 2 }); ctx.fillStyle = '#f4ecd0'; ctx.beginPath(); ctx.arc(1080, 110, 26, 0, 7); ctx.fill(); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#3a3440'; ctx.fillRect(-300, 640, 1900, 300); K.aurelianWall(ctx, 640, -300, 1600, 640, 1.2, t, { open: op, brick: '#6a4a48' });
      // the torches of the Goths waiting outside, seen through the opening gate
      if (op > 0) { ctx.save(); ctx.beginPath(); ctx.rect(568, 400, 144, 240); ctx.clip(); for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(255,170,70,${.7 * op})`; ctx.beginPath(); ctx.arc(590 + i * 34, 520 + (i % 2) * 20, 8, 0, 7); ctx.fill(); } ctx.restore(); }
      // the hooded figure at the bar — a question mark over him
      person(ctx, 520, 700, .5, t, { kind: 'monk', seed: 230, cloth: '#2a2a34' }, { pose: op > 0 ? 'haul' : 'pry', face: 1, eyes: 'closed' }); if (since(t, 'nobody') > -.2) P.caption(ctx, '?', k01(t, 'nobody'), { size: 80, x: 520, y: 360, align: 'center' });
      ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(640, 540, 4, 640, 540, 300); g.addColorStop(0, `rgba(255,150,60,${.4 * op})`); g.addColorStop(1, 'rgba(255,150,60,0)'); ctx.fillStyle = g; ctx.fillRect(300, 240, 680, 600); ctx.restore(); });
    C.finish(ctx, t, 'night', { leak: false, vig: .6 }); cap(ctx, 'the night of 24 August, AD 410', t, 'night', { size: 28 }); cap(ctx, 'someone opened the Salarian Gate from the inside — nobody\'s sure who', t, 'someone', { size: 22, y: 686 }); }
  // 7. and for three days the Goths sacked Rome
  function sSack(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: 30 }, { z: 1.08, x: -30 }), dn = clamp((t - A.three) / 1.6);
    L(ctx, c, .04, () => K.fireSky(ctx, t, .7)); L(ctx, c, .3, () => { K.cityscape(ctx, t, { dusk: true }); const R = C.rng(41); for (let i = 0; i < 8; i++) K.flames(ctx, R() * 1500 - 100, 480 + R() * 160, .5, t + i, { smoke: i % 2 === 0 }); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#4a3a34'; ctx.fillRect(-300, 640, 1900, 300); for (let i = 0; i < 5; i++) { const x = ((i * 300 + lt * 60) % 1700) - 200; person(ctx, x, 720 + (i % 2) * 14, .44, t, GOTH(i), { pose: 'carry', walk: true, face: 1, prop: i % 2 ? (cc, x2, y2) => goldChest(cc, x2, y2 + 20, .7) : K.bundle }); } });
    P.grade(ctx, '#ff7030', .1, 'screen'); C.finish(ctx, t, 'blood', { leak: false, vig: .55 });
    if (since(t, 'three') > -.2) { ctx.save(); ctx.globalAlpha = k01(t, 'three', .3); ink(ctx, 'rgba(30,20,20,.75)', cc => cc.rect(1040, 40, 200, 90), 3, '#ffb060'); ctx.font = '700 46px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffd090'; ctx.fillText('DAY ' + (1 + Math.floor(dn * 2.99)), 1140, 100); ctx.restore(); }
    cap(ctx, 'and for three days the Goths sacked Rome', t, 'three', { size: 26, y: 686 }); }
  // 8. how bad was it? people killed or captured and sold; the emperor's own sister taken hostage (shown through the captives, not the killing)
  function sCost(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.06, x: 30 }), gl = clamp((t - A.sister + .3) / 1);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 430, seed: 1151, clouds: 4 })); L(ctx, c, .3, () => { C.mounds(ctx, { y: 440, n: 5, seed: 1152, col: '#6a6a58', far: .4, sunX: 900, t, w: 560, h: 80, copses: 2 }); C.smoke(ctx, 300, 430, 2, t, { col: '70,60,60', a: .4, h: 300 }); });
    L(ctx, c, 1, () => { C.meadow(ctx, 470, 800, t, { col: '#7a8a4a', n: 80 }); // a line of captives roped together, led out along the road
      const go = lt * 30; ctx.strokeStyle = '#8a6a40'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(140 - go, 620); ctx.lineTo(900 - go, 620); ctx.stroke(); for (let i = 0; i < 6; i++) person(ctx, 200 + i * 120 - go, 700, .42, t, CIVIL[(i + 2) % 10], { pose: 'walk', walk: true, face: -1, eyes: 'half', brow: 'sad' }); person(ctx, 60 - go, 700, .46, t, GOTH(5), { pose: 'haul', walk: true, face: -1 });
      if (gl > 0) { const x = lerp(1400, 1060, ease.out(gl)); person(ctx, x, 700, .48, t, GALLA, { pose: 'walk', walk: gl < 1, face: -1, brow: 'sad', wreath: false }); for (const d of [-80, 90]) person(ctx, x + d, 706, .48, t, GOTH(d > 0 ? 1 : 2), { pose: 'hold', walk: gl < 1, face: -1, prop: K.spear }); } });
    C.finish(ctx, t, 'storm', { leak: false, vig: .55 }); cap(ctx, 'how bad was it? people were killed, or captured and sold', t, 'howbad', { size: 24 }); cap(ctx, 'the emperor\'s own sister was taken hostage', t, 'sister', { size: 24, y: 686 }); }
  // 9. by the standards of the age, ancient writers call it surprisingly restrained: the Goths reportedly spared the great churches
  function sRestraint(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06 });
    L(ctx, c, .04, () => C.sky(ctx, 'dawn', t, { horizon: 520, sun: [1100, 360], sunR: 40, seed: 1161 }));
    L(ctx, c, .6, () => { ctx.fillStyle = '#b8a888'; ctx.fillRect(-300, 600, 1900, 300); K.basilica(ctx, 640, 600, 1, t, { glow: true }); });
    L(ctx, c, 1, () => { for (let i = 0; i < 4; i++) person(ctx, 560 + i * 50, 600, .2, t, CIVIL[i + 3], { pose: 'stand', face: i % 2 ? 1 : -1 }); for (let i = 0; i < 3; i++) person(ctx, 140 + i * 110, 720, .5, t, GOTH(i), { pose: i === 1 ? 'shrug' : 'hold', face: 1, prop: i !== 1 ? K.spear : null });
      person(ctx, 1080, 720, .5, t, { kind: 'monk', seed: 231 }, { pose: 'wave', face: -1 }); });
    C.finish(ctx, t, 'dawn'); cap(ctx, 'by the standards of the age, ancient writers call it surprisingly restrained', t, 'standards', { size: 22 }); cap(ctx, 'the Goths reportedly spared the great churches', t, 'spared', { size: 24, y: 686 }); }
  // 10. the real damage was to people's minds: in Bethlehem the scholar Jerome writes "the city which had taken the whole world was itself taken"
  function sJerome(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.08, x: 20 }), q = clamp((t - A.city + .3) / .6);
    L(ctx, c, .8, () => { ctx.fillStyle = '#c8a878'; ctx.fillRect(-200, -200, 1700, 900); ctx.strokeStyle = 'rgba(120,90,50,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.moveTo((i * 97) % 1400 - 60, (i * 53) % 600); ctx.lineTo((i * 97) % 1400 - 20, (i * 53) % 600 + 30); ctx.stroke(); }
      ctx.save(); ctx.beginPath(); ctx.moveTo(900, 520); ctx.lineTo(900, 260); ctx.arc(990, 260, 90, Math.PI, 0); ctx.lineTo(1080, 520); ctx.closePath(); ctx.clip(); C.sky(ctx, 'sunset', t, { horizon: 460, sun: [1000, 420], sunR: 30, clouds: 1, seed: 1171 }); C.mounds(ctx, { y: 470, n: 3, seed: 1172, col: '#a89070', far: .3, sunX: 1000, t, w: 300, h: 60, copses: 1 }); ctx.restore(); ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(900, 520); ctx.lineTo(900, 260); ctx.arc(990, 260, 90, Math.PI, 0); ctx.lineTo(1080, 520); ctx.stroke();
      K.shelfJars(ctx, 120, 260); ctx.fillStyle = '#8a6a48'; ctx.fillRect(-200, 600, 1700, 300); });
    L(ctx, c, 1, () => { K.romanDesk(ctx, 640, 560, t); person(ctx, 480, 690, .62, t, JEROME, { pose: 'hold', face: 1, eyes: 'half', brow: 'sad', prop: (cc, x, y) => { cc.strokeStyle = INK; cc.lineWidth = 3; cc.beginPath(); cc.moveTo(x, y); cc.lineTo(x + 6, y - 40); cc.stroke(); } }); K.lamp(ctx, 800, 560); });
    C.finish(ctx, t, 'sunset', { leak: false, vig: .5 }); cap(ctx, 'the real damage was to people\'s minds', t, 'real', { size: 26, y: 60 }); cap(ctx, 'in Bethlehem, the scholar Jerome wrote:', t, 'bethlehem', { size: 22, y: 104 });
    if (q > 0) { ctx.save(); ctx.globalAlpha = q; ctx.font = 'italic 700 30px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(40,24,14,.85)'; const s1 = '"The city which had taken the whole world'; const s2 = 'was itself taken."'; ctx.strokeText(s1, 640, 640); ctx.strokeText(s2, 640, 684); ctx.fillStyle = '#f6e2b0'; ctx.fillText(s1, 640, 640); if (since(t, 'taken') > -.3) ctx.fillText(s2, 640, 684); ctx.restore(); } }
  // 11. Rome should have died right here. It didn't. (the burnt city at dusk; then the sun comes up over it)
  function sDied(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 }), up = ease.inOut(clamp((t - A.didnt + .2) / 1.4));
    L(ctx, c, .04, () => { C.sky(ctx, 'storm', t, { horizon: 430, seed: 1181, clouds: 4 }); ctx.save(); ctx.globalAlpha = up; C.sky(ctx, 'dawn', t, { horizon: 430, sun: [640, lerp(520, 330, up)], sunR: 50, seed: 1182 }); ctx.restore(); });
    L(ctx, c, .4, () => K.cityscape(ctx, t)); P.grade(ctx, '#3a3a4a', .45 * (1 - up), 'multiply'); C.finish(ctx, t, up > .5 ? 'dawn' : 'storm', { vig: .5 });
    cap(ctx, 'Rome should have died right here', t, 'died', { size: 34, y: 120 }); cap(ctx, 'it didn\'t', t, 'didnt', { size: 40, y: 686 }); }
  // 12. the Vandals sacked it again in 455; in 476 the last western emperor, a teenager named Romulus Augustulus, was pushed off the throne
  function sLater(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06 }), ph = since(t, 'y476') > -.3, fall = clamp((t - A.pushed) / .8);
    L(ctx, c, .04, () => ph ? (ctx.fillStyle = '#e8dcc4', ctx.fillRect(-200, -200, 1700, 1200)) : C.sky(ctx, 'storm', t, { horizon: 460, seed: 1191, clouds: 3 }));
    L(ctx, c, 1, () => { if (!ph) { C.water(ctx, -300, 460, 1600, 800, t, { pal: 'storm' }); cel(ctx, cc => { cc.moveTo(980, 800); cc.lineTo(1020, 520); cc.quadraticCurveTo(1200, 470, 1600, 480); cc.lineTo(1600, 800); cc.closePath(); }, '#a89a70', { shade: '#7a6a48', dx: 0, dy: 0, lw: 3.5 }); for (let i = 0; i < 6; i++) K.house(ctx, 1060 + i * 70, 520 + i * 6, .26, i);  for (let i = 0; i < 4; i++) K.ship(ctx, 120 + i * 230, 560 + (i % 2) * 70, .45, t, { flip: true }); P.caption(ctx, 'AD 455 — the Vandals', k01(t, 'y455'), { size: 34, x: 640, y: 160, align: 'center' }); return; }
      for (let i = 0; i < 6; i++) P.column(ctx, -20 + i * 260, 600, 30, 560, { col: '#efe6d2' }); ctx.fillStyle = '#b8a07a'; ctx.fillRect(-200, 600, 1700, 300);
      cel(ctx, cc => cc.rect(470, 540, 300, 60), '#efe6d2', { shade: '#c0b8a8', dx: 0, dy: 8, lw: 3 }); cel(ctx, cc => { cc.moveTo(540, 540); cc.lineTo(540, 360); cc.quadraticCurveTo(620, 320, 700, 360); cc.lineTo(700, 540); cc.closePath(); }, '#d8b048', { shade: '#a88028', dx: 18, dy: 0, lw: 4 });
      person(ctx, lerp(620, 380, ease.out(fall)), lerp(570, 700, ease.in ? ease.in(fall) : fall), .44, t, TEEN, { pose: fall > 0 ? 'shrug' : 'stand', face: 1, eyes: fall > 0 ? 'wide' : 'open', mouth: fall > 0 ? 'o' : 'flat' }); K.crown(ctx, lerp(620, 520, fall), lerp(330, 690, fall * fall), .5);
      person(ctx, 880, 700, .56, t, GOTH(2), { pose: fall > 0 ? 'point' : 'stand', face: -1 }); P.caption(ctx, 'AD 476', 1, { size: 34, x: 640, y: 120, align: 'center' }); });
    C.finish(ctx, t, ph ? 'golden' : 'storm', { leak: false, vig: .45 }); if (!ph) cap(ctx, 'the Vandals sacked it again in 455', t, 'vandals', { size: 24, y: 686 }); if (ph) { cap(ctx, 'the last western emperor, a teenager named Romulus Augustulus, was pushed off the throne', t, 'last', { size: 20, y: 660 }); cap(ctx, 'that\'s the big date in textbooks', t, 'textbook', { size: 24, y: 700 }); } }
  // 13. but the people of Rome mostly just kept living: the Senate still met, the baths still ran — because the aqueducts still ran. For now.
  function sLiving(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -40 }, { z: 1.08, x: 40 }), fn = clamp((t - A.fornow + .2) / .8);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 400, sun: [1100, 250], sunR: 40, seed: 1201 })); L(ctx, c, .2, () => { C.mounds(ctx, { y: 410, n: 5, seed: 1202, col: '#8aa070', far: .4, sunX: 1100, t, w: 560, h: 90, copses: 2 }); K.aqueduct(ctx, -200, 1500, 330, () => 430, t, { bay: 70, far: .3 }); });
    L(ctx, c, .6, () => { ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-300, 560, 1900, 300); K.curia(ctx, 300, 560, .7); K.baths(ctx, 980, 560, .7, t); for (let i = 0; i < 3; i++) person(ctx, 240 + i * 50, 556, .22, t, K.CIVIL[i % 2], { pose: 'walk', walk: true, face: 1 }); });
    L(ctx, c, 1, () => { for (let i = 0; i < 6; i++) { const d = i % 2 ? 1 : -1; person(ctx, ((100 + i * 230 + lt * 30 * d) % 1500 + 1500) % 1500 - 100, 700 + (i % 3) * 14, .42, t, K.CIVIL[(i + 3) % 10], { pose: i % 3 === 0 ? 'talk' : 'walk', walk: true, talk: i % 3 === 0, face: d }); } K.fountain(ctx, 640, 720, .6, t); });
    if (fn > 0) { ctx.save(); ctx.globalAlpha = .5 * fn; ctx.fillStyle = '#2a2a3a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    C.finish(ctx, t, 'golden'); cap(ctx, 'but the people of Rome mostly just kept living', t, 'people', { size: 24, y: 60 }); cap(ctx, 'the Senate still met · the baths still ran · because the aqueducts still ran', t, 'senate', { size: 21, y: 660 }); cap(ctx, 'for now', t, 'fornow', { size: 30, y: 704 }); }

  const cut = [[0, sStreak, 0], [A.alaric - .4, sAlaric, .5], [A.emperor - .3, sNo, .5], [A.besieged - .4, sSiege, .5], [A.talks - .3, sTalks, .4], [A.night - .3, sGate, .5], [A.three - .4, sSack, .5],
    [A.howbad - .3, sCost, .5], [A.standards - .3, sRestraint, .5], [A.real - .3, sJerome, .5], [A.died - .3, sDied, .5], [A.vandals - .3, sLater, .5], [A.thing - .4, sLiving, .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: A.ends, type: 'hit', gain: .4 }, { t: A.rank, type: 'clang', gain: .3 }, { t: A.no, type: 'thud', gain: .35 }, { t: A.paid, type: 'rattle', gain: .3 }, { t: A.talks + .3, type: 'paper', gain: .45 },
    { t: A.inside, type: 'creak', gain: .45 }, { t: A.sacked, type: 'boom', gain: .45 }, { t: A.sister, type: 'swell', gain: .25 }, { t: A.spared, type: 'swell', gain: .3 }, { t: A.wrote, type: 'scratch', gain: .3 },
    { t: A.died, type: 'boom', gain: .35 }, { t: A.didnt, type: 'swell', gain: .4 }, { t: A.y455, type: 'splash', gain: .3 }, { t: A.pushed, type: 'thud', gain: .35 }, { t: A.fornow, type: 'boom', gain: .3 }];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.real - .3, mood: 'mystery' }, { t: A.didnt, mood: 'still' }, { t: A.vandals - .3, mood: 'tense' }, { t: A.thing - .4, mood: 'still' }, { t: A.fornow, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat7a.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
