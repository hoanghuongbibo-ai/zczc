/* Rome — Beat 8c, "Near-death #5" (narration-beat8c.mp3 = narration-full.mp3 1074.8–1117.5 s + pad).
 * 6 May 1527: the unpaid, mutinous army of Charles V storms Rome. Clement VII runs for Castel Sant'Angelo; the Swiss Guard covers him
 * near St Peter's — of about 189 guards, 147 are killed; new guards are still sworn in every 6 May in their memory. Months of killing,
 * torture, ransom and looting: one of the worst things ever to happen to the city. Rome should have died here. It didn't. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer, K = G.RK;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const { person, MED } = K;
  const OFF = 1074.8;
  const A0 = { may6: 1075.8, army: 1078.15, charles: 1079.99, unpaid: 1081.47, stormed: 1084.05, clement: 1085.86, fortress: 1087.22, covering: 1089.63, swiss: 1091.26, stand: 1092.34, roughly: 1094.37,
    y147: 1096.91, killed: 1098.56, today: 1099.75, sworn: 1101.68, may6b: 1103.27, memory: 1104.24, followed: 1105.26, months: 1106.15, worst: 1111.07, died: 1114.8, didnt: 1116.8 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 43.2;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };
  const LANDS = i => ({ kind: 'tunic', cloth: ['#c8423a', '#e8b030', '#3a6aa8', '#5a8a3a'][i % 4], legs: ['#e8b030', '#c8423a', '#efe6d2', '#3a6aa8'][i % 4], hair: ['#c8a050', '#5a3a24', '#2a1a14', '#a85a28'][i % 4], hairStyle: 'short', beard: i % 2 === 0, beardCol: ['#c8a050', '#5a3a24', '#2a1a14', '#a85a28'][i % 4], cap: '#8a8a92', seed: 330 + i });
  const SWISS = i => ({ kind: 'tunic', cloth: ['#2a4aa8', '#e8b030', '#c8322a'][i % 3], legs: ['#e8b030', '#2a4aa8', '#e8b030'][i % 3], hair: '#5a3a24', hairStyle: 'short', beard: i % 3 === 1, cap: '#9a9aa2', seed: 340 + i });
  const POPE = { kind: 'monk', cloth: '#f4efe2', cap: '#f4efe2', beard: true, beardCol: '#5a3a24', seed: 350 };
  const halberd = (ctx, x, y) => { ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + 90); ctx.lineTo(x, y - 170); ctx.stroke(); ctx.strokeStyle = '#7a5232'; ctx.lineWidth = 3.5; ctx.stroke(); ink(ctx, '#c8c8d0', c => { c.moveTo(x, y - 150); c.lineTo(x + 26, y - 160); c.quadraticCurveTo(x + 30, y - 136, x, y - 128); c.closePath(); }, 2); ink(ctx, '#c8c8d0', c => { c.moveTo(x - 5, y - 170); c.lineTo(x, y - 196); c.lineTo(x + 5, y - 170); c.closePath(); }, 2); };
  const pike = (ctx, x, y) => { ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 20, y + 80); ctx.lineTo(x + 30, y - 220); ctx.stroke(); ctx.strokeStyle = '#7a5232'; ctx.lineWidth = 3.5; ctx.stroke(); };
  // Castel Sant'Angelo: a round drum on a square base by the Tiber, the bridge of arches, the raised corridor (Passetto) running in from the left
  function castel(ctx, t) { ctx.fillStyle = '#a89a78'; ctx.fillRect(-300, 596, 1900, 50); C.water(ctx, -300, 640, 1600, 780, t, { sunX: 1000 }); ink(ctx, null, c => { c.moveTo(-300, 640); c.lineTo(1600, 640); }, 3);
    // the square bastioned base, the round drum of Hadrian's tomb on it, the papal apartments and the angel on top
    cel(ctx, c => c.rect(840, 420, 420, 180), '#c8a880', { shade: '#987850', light: '#e0c098', dx: 50, dy: 0, lw: 4 }); for (const bx of [840, 1260]) cel(ctx, c => { c.moveTo(bx - 40, 600); c.lineTo(bx - 30, 400); c.lineTo(bx + 30, 400); c.lineTo(bx + 40, 600); c.closePath(); }, '#b89870', { shade: '#887048', dx: 12, dy: 0, lw: 3.5 });
    const g = ctx.createLinearGradient(900, 0, 1200, 0); g.addColorStop(0, '#f0d0a8'); g.addColorStop(.6, '#d8b88e'); g.addColorStop(1, '#9a7850'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(900, 240); ctx.lineTo(900, 420); ctx.ellipse(1050, 420, 150, 26, 0, Math.PI, 0, true); ctx.lineTo(1200, 240); ctx.ellipse(1050, 240, 150, 26, 0, 0, Math.PI, false); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
    ink(ctx, '#e8c8a0', c => c.ellipse(1050, 240, 150, 26, 0, 0, 7), 4); for (let i = 0; i < 9; i++) { const a = Math.PI * (i + .5) / 9, x = 1050 - Math.cos(a) * 150; ink(ctx, '#2a1810', c => c.rect(x - 6, 300, 12, 22), 1.5); }
    cel(ctx, c => c.rect(990, 150, 120, 90), '#e0c8a0', { shade: '#b09870', dx: 24, dy: 0, lw: 3.5 }); cel(ctx, c => { c.moveTo(980, 150); c.lineTo(1050, 120); c.lineTo(1120, 150); c.closePath(); }, '#b8583a', { shade: '#8a3a24', dx: 10, dy: 0, lw: 3 }); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1050, 120); ctx.lineTo(1050, 90); ctx.stroke(); cel(ctx, c => { c.moveTo(1050, 60); c.lineTo(1040, 90); c.lineTo(1060, 90); c.closePath(); }, '#c8c8c0', { dx: 2, dy: 0, lw: 2 }); ctx.strokeStyle = '#c8c8c0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1034, 70); ctx.lineTo(1020, 58); ctx.moveTo(1066, 70); ctx.lineTo(1080, 58); ctx.stroke();
    // the Passetto: a walled corridor on arches running in from the Vatican, standing on the bank
    cel(ctx, c => c.rect(-300, 440, 1140, 50), '#c8a880', { shade: '#987850', dx: 0, dy: 6, lw: 3.5 }); for (let x = -300; x < 840; x += 30) ink(ctx, '#c8a880', c => c.rect(x, 424, 18, 16), 2); for (let x = -260; x < 840; x += 160) cel(ctx, c => c.rect(x, 490, 40, 108), '#b89870', { shade: '#887048', dx: 8, dy: 0, lw: 3 }); }
  // 1. 6 May 1527: the army of the Holy Roman Emperor Charles V — unpaid, mutinous, out of control — storms the city
  function sStorm(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: 30 }, { z: 1.1, x: -30, y: 10 }), k = clamp((t - A.stormed + 1) / 2.4);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 420, seed: 1801, clouds: 5 })); L(ctx, c, .25, () => { C.mounds(ctx, { y: 380, n: 5, seed: 1802, col: '#7a8070', far: .5, sunX: 900, t, w: 560, h: 80, copses: 2 }); K.basilica(ctx, 980, 400, .3, t); C.smoke(ctx, 500, 400, 2, t, { col: '70,64,64', a: .45, h: 300 }); });
    L(ctx, c, .6, () => { ctx.fillStyle = '#8a8a60'; ctx.fillRect(-300, 520, 1900, 400); K.aurelianWall(ctx, 520, -300, 1600, 900, .8, t); // scaling ladders against the wall, men on them
      for (let i = 0; i < 3; i++) { const lx = 160 + i * 240; ctx.strokeStyle = '#6a4428'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(lx, 620); ctx.lineTo(lx + 40, 340); ctx.moveTo(lx + 40, 620); ctx.lineTo(lx + 80, 340); ctx.stroke(); ctx.lineWidth = 4; for (let r = 0; r < 8; r++) { const y = 600 - r * 34, f = (620 - y) / 280; ctx.beginPath(); ctx.moveTo(lx + f * 40, y); ctx.lineTo(lx + 40 + f * 40, y); ctx.stroke(); } const u = clamp(k * 1.4 - i * .2); person(ctx, lx + 20 + u * 40, lerp(600, 380, u), .28, t, LANDS(i), { pose: 'up', face: 1 }); } });
    L(ctx, c, 1, () => { C.meadow(ctx, 600, 800, t, { col: '#6a8a3a', n: 80 }); for (let i = 0; i < 6; i++) person(ctx, lerp(-200 + i * 120, 120 + i * 200, k), 720 + (i % 2) * 14, .46, t, LANDS(i), { pose: i % 2 ? 'strike' : 'walk', walk: true, face: 1, brow: 'angry', mouth: 'grin', prop: pike }); });
    C.finish(ctx, t, 'storm', { leak: false, vig: .55 }); cap(ctx, '6 May 1527: the army of the Holy Roman Emperor Charles V', t, 'may6', { size: 24, y: 60 }); cap(ctx, 'unpaid, mutinous and out of control — stormed the city', t, 'unpaid', { size: 24, y: 686 }); }
  // 2. Pope Clement VII ran for the fortress of Castel Sant'Angelo (along the raised corridor)
  function sCastel(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06, x: 30 }), u = clamp((t - A.clement) / 3);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 430, seed: 1811, clouds: 4 })); L(ctx, c, .25, () => { C.mounds(ctx, { y: 440, n: 5, seed: 1812, col: '#7a8070', far: .45, sunX: 900, t, w: 560, h: 80, copses: 2 }); C.smoke(ctx, 200, 440, 2, t, { col: '70,64,64', a: .4, h: 300 }); });
    L(ctx, c, 1, () => { castel(ctx, t); person(ctx, lerp(-60, 820, u), 440, .3, t, POPE, { pose: 'walk', walk: u < 1, face: 1, eyes: 'wide', mouth: 'o' }); for (let i = 0; i < 2; i++) person(ctx, lerp(-160, 720, u) - i * 70, 440, .28, t, SWISS(i), { pose: 'hold', walk: u < 1, face: 1, prop: halberd }); });
    C.finish(ctx, t, 'storm', { leak: false, vig: .5 }); cap(ctx, 'Pope Clement VII ran for the fortress of Castel Sant\'Angelo', t, 'clement', { size: 24 }); }
  // 3. covering his escape, the papal Swiss Guard made a stand near St Peter's
  function sStand(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08, y: 10 });
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 520, seed: 1821, clouds: 4 })); L(ctx, c, .4, () => { ctx.fillStyle = '#a89a80'; ctx.fillRect(-300, 560, 1900, 400); K.basilica(ctx, 640, 560, .9, t); C.smoke(ctx, 1100, 560, 1.6, t, { col: '70,64,64', a: .4, h: 300 }); });
    L(ctx, c, 1, () => { for (let i = 0; i < 6; i++) person(ctx, 300 + i * 120, 690, .42, t, SWISS(i), { pose: 'hold', face: 1, brow: 'angry', prop: halberd }); for (let i = 0; i < 4; i++) person(ctx, 1080 + i * 110, 700 + (i % 2) * 10, .42, t, LANDS(i), { pose: i % 2 ? 'strike' : 'walk', walk: true, face: -1, brow: 'angry', prop: pike }); });
    C.finish(ctx, t, 'storm', { leak: false, vig: .55 }); cap(ctx, 'covering his escape, the papal Swiss Guard made a stand near St Peter\'s', t, 'covering', { size: 22 }); }
  // 4. of roughly 189 guards, 147 were killed (one helmet per man)
  function sCount(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.04 }), k = clamp((t - A.y147) / 1.6);
    L(ctx, c, 1, () => { ctx.fillStyle = '#2a2430'; ctx.fillRect(-200, -200, 1700, 1200); for (let i = 0; i < 189; i++) { const col = i % 21, row = Math.floor(i / 21), x = 200 + col * 42, y = 190 + row * 46; const dead = i < 147 && k * 147 > i; ctx.save(); ctx.globalAlpha = dead ? .28 : 1; cel(ctx, cc => { cc.moveTo(x - 14, y + 8); cc.quadraticCurveTo(x - 16, y - 14, x, y - 16); cc.quadraticCurveTo(x + 16, y - 14, x + 14, y + 8); cc.closePath(); }, dead ? '#5a5a62' : '#c8c8d0', { shade: '#8a8a92', dx: 3, dy: 0, lw: 2 }); ctx.restore(); }
      P.caption(ctx, 'about 189 guards', clamp((t - A.roughly) / .4), { size: 34, x: 640, y: 120, align: 'center' }); P.caption(ctx, '147 killed', k01(t, 'y147'), { size: 40, x: 640, y: 640, align: 'center', col: '#ffb0a0' }); });
    C.finish(ctx, t, 'night', { leak: false, vig: .5 }); }
  // 5. to this day, new Swiss Guards are sworn in every year on 6 May, in their memory
  function sOath(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.06 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 400, sun: [1100, 220], sunR: 40, seed: 1831 }));
    L(ctx, c, .5, () => { ctx.fillStyle = '#efe0c0'; ctx.fillRect(-300, 200, 1900, 400); for (let i = 0; i < 10; i++) { ink(ctx, '#3a2414', cc => cc.rect(-60 + i * 160, 260, 50, 80), 2.5); ink(ctx, '#3a2414', cc => cc.rect(-60 + i * 160, 400, 50, 80), 2.5); } ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 600, 1900, 300);
      ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(640, 600); ctx.lineTo(640, 360); ctx.stroke(); const w = Math.sin(t * 2) * 6; for (let i = 0; i < 4; i++) cel(ctx, cc => cc.rect(640 + (i % 2) * 50, 360 + Math.floor(i / 2) * 50 + w * (i % 2) * .2, 50, 50), ['#e8b030', '#2a4aa8', '#c8322a', '#e8b030'][i], { dx: 2, dy: 2, lw: 2 }); ctx.strokeStyle = '#f4f0e8'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(640, 410); ctx.lineTo(740, 410); ctx.moveTo(690, 360); ctx.lineTo(690, 460); ctx.stroke(); });
    L(ctx, c, 1, () => { for (let i = 0; i < 7; i++) person(ctx, 140 + i * 160, 720, .46, t, SWISS(i), { pose: since(t, 'sworn') > 0 && i === 3 ? 'up' : 'hold', face: i < 3 ? 1 : -1, prop: i === 3 ? null : halberd }); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'to this day, new Swiss Guards are sworn in every year', t, 'today', { size: 24 }); cap(ctx, 'on 6 May — in their memory', t, 'may6b', { size: 26, y: 686 }); }
  // 6. what followed was months of killing, torture, ransom and looting — one of the worst things ever to happen to the city
  function sAfter(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.08, x: 30 });
    L(ctx, c, .04, () => K.fireSky(ctx, t, .5)); L(ctx, c, .3, () => { K.cityscape(ctx, t, { dusk: true }); const R = C.rng(51); for (let i = 0; i < 6; i++) K.flames(ctx, R() * 1500 - 100, 480 + R() * 140, .45, t + i, { smoke: true }); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#4a3a34'; ctx.fillRect(-300, 640, 1900, 300); for (let i = 0; i < 4; i++) { const x = ((i * 380 + lt * 50) % 1700) - 200; person(ctx, x, 720 + (i % 2) * 14, .44, t, LANDS(i), { pose: 'carry', walk: true, face: 1, prop: i % 2 ? K.bundle : (cc, x2, y2) => cel(cc, c2 => c2.rect(x2 - 30, y2 - 20, 60, 34), '#d8b048', { shade: '#a88028', dx: 4, dy: 3, lw: 2.5 }) }); }
      for (const [x, r] of [[300, .6], [980, -.4]]) { ctx.save(); ctx.translate(x, 700); ctx.rotate(r); cel(ctx, cc => cc.rect(-50, -14, 100, 28), '#6a4428', { shade: '#4a2e18', dx: 0, dy: 4, lw: 3 }); ctx.restore(); } });
    P.grade(ctx, '#3a2a2a', .25); C.finish(ctx, t, 'blood', { leak: false, vig: .6 }); cap(ctx, 'what followed was months of killing, torture, ransom and looting', t, 'followed', { size: 24 }); cap(ctx, 'one of the worst things that ever happened to the city', t, 'worst', { size: 24, y: 686 }); }
  // 7. Rome should have died right here. It didn't.
  function sDied(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.08 }, { z: 1.0 }), up = ease.inOut(clamp((t - A.didnt + .3) / 1.2));
    L(ctx, c, .04, () => { C.sky(ctx, 'storm', t, { horizon: 430, seed: 1841, clouds: 4 }); ctx.save(); ctx.globalAlpha = up; C.sky(ctx, 'dawn', t, { horizon: 430, sun: [640, lerp(520, 330, up)], sunR: 50, seed: 1842 }); ctx.restore(); });
    L(ctx, c, .6, () => { C.mounds(ctx, { y: 440, n: 5, seed: 1843, col: '#7a8a68', far: .3, sunX: 640, t, w: 560, h: 90, copses: 2 }); C.water(ctx, -300, 600, 1600, 720, t, { pal: up > .5 ? 'dawn' : 'storm' }); castel(ctx, t); });
    P.grade(ctx, '#3a3a4a', .45 * (1 - up)); C.finish(ctx, t, up > .5 ? 'dawn' : 'storm', { vig: .5 }); cap(ctx, 'Rome should have died right here', t, 'died', { size: 34, y: 120 }); cap(ctx, 'it didn\'t', t, 'didnt', { size: 40, y: 686 }); }

  const cut = [[0, sStorm, 0], [A.clement - .3, sCastel, .5], [A.covering - .3, sStand, .5], [A.roughly - .3, sCount, .5], [A.today - .3, sOath, .5], [A.followed - .3, sAfter, .5], [A.died - .3, sDied, .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: A.may6, type: 'boom', gain: .4 }, { t: A.stormed, type: 'clang', gain: .4 }, { t: A.fortress, type: 'whoosh', gain: .3 }, { t: A.stand, type: 'clang', gain: .4 }, { t: A.y147, type: 'boom', gain: .35 },
    { t: A.sworn, type: 'swell', gain: .35 }, { t: A.months, type: 'rattle', gain: .3 }, { t: A.died, type: 'boom', gain: .35 }, { t: A.didnt, type: 'swell', gain: .4 }];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.today - .3, mood: 'still' }, { t: A.followed - .3, mood: 'tense' }, { t: A.didnt, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat8c.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
