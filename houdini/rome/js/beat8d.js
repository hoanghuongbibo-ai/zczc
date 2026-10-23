/* Rome — Beat 8d, "The water comes back" (narration-beat8d.mp3 = narration-full.mp3 1117.5–1147.8 s + pad).
 * How you know Rome understood its own story: when the popes rebuilt, they went after the water. The Aqua Virgo — one of the old eleven,
 * built in 19 BC to feed the baths — was restored by the popes, and today it feeds the Trevi. A coin in the Trevi goes into water running
 * along a route the Romans laid out over 2,000 years ago. The pope who wanted Rome to look holy had to make it look wet. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer, K = G.RK;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const { person, MED, TOURIST } = K;
  const OFF = 1117.5;
  const A0 = { here: 1117.93, understood: 1119.27, popes: 1121.47, water: 1123.51, remember: 1124.72, virgo: 1125.21, eleven: 1126.78, y19: 1127.74, baths: 1129.17, restored: 1130.47, today: 1131.47,
    famous: 1133.64, trevi: 1135.04, throw: 1136.33, coin: 1136.6, water2: 1138.77, route: 1140.28, thousand: 1142.07, pope: 1143.97, holy: 1145.26, wet: 1146.93 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 30.8;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };
  const POPE = { kind: 'monk', cloth: '#f4efe2', cap: '#f4efe2', beard: true, beardCol: '#8a8a84', seed: 360 };
  const ARCHITECT = { kind: 'tunic', cloth: '#3a2a4a', legs: '#2a2a3a', hair: '#5a3a24', hairStyle: 'short', beard: true, seed: 361 };
  // the Trevi: a palace front with a triumphal-arch centre, Oceanus in the niche, a slope of carved rocks, cascades into a wide basin
  function trevi(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    cel(ctx, c => c.rect(-520, -520, 1040, 420), '#efe4cc', { shade: '#c8b898', light: '#fff8e8', dx: 0, dy: 0, lw: 4 }); for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { const wx = -480 + i * 70 + (i > 2 ? 580 : 0); ink(ctx, '#5a4a3a', c => c.rect(wx, -480 + r * 120, 34, 60), 2.5); }
    cel(ctx, c => c.rect(-220, -600, 440, 500), '#f4ecd8', { shade: '#d0c4a8', light: '#fffaf0', dx: 20, dy: 0, lw: 4 }); cel(ctx, c => c.rect(-240, -640, 480, 50), '#efe4cc', { shade: '#c8b898', dx: 0, dy: 8, lw: 4 }); ctx.font = '700 22px "Liberation Serif", serif'; ctx.fillStyle = '#7a6a4a'; ctx.textAlign = 'center'; ctx.fillText('AQVA VIRGO', 0, -606);
    for (const d of [-1, 1]) for (const k of [0, 1]) P.column(ctx, d * (190 - k * 50), -100, 26, 480, { col: '#f4ecd8' }); ctx.fillStyle = '#c8bca0'; ctx.beginPath(); ctx.moveTo(-110, -100); ctx.lineTo(-110, -400); ctx.arc(0, -400, 110, Math.PI, 0); ctx.lineTo(110, -100); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
    cel(ctx, c => { c.moveTo(-40, -130); c.lineTo(-30, -330); c.quadraticCurveTo(0, -370, 30, -330); c.lineTo(40, -130); c.closePath(); }, '#ffffff', { shade: '#d8d8d0', dx: 10, dy: 0, lw: 3.5 }); cel(ctx, c => c.ellipse(0, -360, 22, 26, 0, 0, 7), '#ffffff', { shade: '#d8d8d0', dx: 5, dy: 0, lw: 3 });
    for (const d of [-1, 1]) { ctx.fillStyle = '#c8bca0'; ctx.beginPath(); ctx.moveTo(d * 150 - 30, -160); ctx.lineTo(d * 150 - 30, -300); ctx.arc(d * 150, -300, 30, Math.PI, 0); ctx.lineTo(d * 150 + 30, -160); ctx.closePath(); ctx.fill(); ctx.stroke(); cel(ctx, c => c.rect(d * 150 - 14, -290, 28, 120), '#ffffff', { shade: '#d8d8d0', dx: 6, dy: 0, lw: 2.5 }); }
    // rocks and cascades
    cel(ctx, c => { c.moveTo(-520, -40); c.quadraticCurveTo(-400, -140, -200, -110); c.quadraticCurveTo(0, -150, 200, -110); c.quadraticCurveTo(400, -140, 520, -40); c.lineTo(520, 0); c.lineTo(-520, 0); c.closePath(); }, '#d8ccb0', { shade: '#a89a78', light: '#efe6d2', dx: 0, dy: 10, lw: 4 }); for (let i = 0; i < 9; i++) P.rock(ctx, -440 + i * 110, -30 - (i % 2) * 30, 40, '#d0c4a8');
    for (const cx of [-80, 0, 80]) { ctx.strokeStyle = 'rgba(160,215,240,.9)'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(cx, -130); ctx.lineTo(cx * 1.2, 20); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 3; ctx.setLineDash([10, 12]); ctx.lineDashOffset = -t * 100; ctx.stroke(); ctx.setLineDash([]); }
    cel(ctx, c => { c.moveTo(-560, 0); c.lineTo(560, 0); c.quadraticCurveTo(600, 100, 520, 130); c.lineTo(-520, 130); c.quadraticCurveTo(-600, 100, -560, 0); c.closePath(); }, '#d8ccb0', { shade: '#a89a78', dx: 0, dy: 10, lw: 4 }); ctx.save(); ctx.beginPath(); ctx.moveTo(-540, 14); ctx.lineTo(540, 14); ctx.quadraticCurveTo(570, 90, 510, 110); ctx.lineTo(-510, 110); ctx.quadraticCurveTo(-570, 90, -540, 14); ctx.clip(); const g = ctx.createLinearGradient(0, 14, 0, 110); g.addColorStop(0, '#5ac8d8'); g.addColorStop(1, '#2a98b8'); ctx.fillStyle = g; ctx.fillRect(-600, 0, 1200, 120);
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 20; i++) { const wx = -500 + i * 52 + Math.sin(t + i) * 8; ctx.beginPath(); ctx.moveTo(wx, 40 + (i % 3) * 22); ctx.quadraticCurveTo(wx + 12, 36 + (i % 3) * 22, wx + 24, 40 + (i % 3) * 22); ctx.stroke(); } ctx.restore(); cel(ctx, c => c.rect(-560, 110, 1120, 24), '#e8dcc4', { shade: '#b8ac90', dx: 0, dy: 6, lw: 3.5 }); ctx.restore(); }

  // 1. here's how you know Rome understood its own story: when the popes rebuilt, they went after the water
  function sKnow(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08, y: 10 });
    L(ctx, c, .8, () => K.romanStudy(ctx, t)); L(ctx, c, 1, () => { // a big plan of the city with the aqueducts in blue, spread on the table
      cel(ctx, cc => cc.rect(380, 520, 520, 40), '#7a5232', { shade: '#5a3a20', dx: 0, dy: 8, lw: 4 }); for (const lx of [400, 860]) ink(ctx, '#5a3a20', cc => cc.rect(lx, 560, 18, 100), 2.5); ctx.save(); ctx.translate(640, 512); ctx.scale(1, .4); ink(ctx, '#efe0bc', cc => cc.rect(-240, -200, 480, 340), 3); ctx.strokeStyle = '#8a5a3a'; ctx.lineWidth = 6; ctx.setLineDash([12, 6]); ctx.beginPath(); ctx.ellipse(-20, -30, 170, 140, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        const wk = k01(t, 'water', .8); ctx.strokeStyle = '#3a8ac8'; ctx.lineWidth = 8; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(240, -160 + i * 70); ctx.lineTo(240 - 260 * wk, -100 + i * 40); ctx.stroke(); } ctx.restore();
      person(ctx, 460, 690, .58, t, POPE, { pose: since(t, 'water') > 0 ? 'point' : 'stand', face: 1 }); person(ctx, 860, 690, .58, t, ARCHITECT, { pose: 'talk', talk: true, face: -1 }); });
    C.finish(ctx, t, 'golden', { leak: false, vig: .5 }); cap(ctx, 'here\'s how you know Rome understood its own story:', t, 'here', { size: 24 }); cap(ctx, 'when the popes rebuilt, they went after the water', t, 'popes', { size: 24, y: 686 }); }
  // 2. remember the Aqua Virgo? one of the old eleven, built in 19 BC to feed the baths (its underground course from the springs)
  function sVirgo(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.04 }), fl = clamp((t - A.virgo) / 2.4);
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 330, sun: [1100, 200], sunR: 34, seed: 1901 }));
    L(ctx, c, 1, () => { ctx.fillStyle = '#8a6a48'; ctx.fillRect(-300, 330, 1900, 600); cel(ctx, cc => { cc.moveTo(700, 340); cc.quadraticCurveTo(1000, 160, 1600, 200); cc.lineTo(1600, 340); cc.closePath(); }, '#8aa050', { shade: '#6a8038', dx: 0, dy: 0, lw: 3 }); ctx.fillStyle = '#7a9a3a'; ctx.fillRect(-300, 320, 1010, 20);
      for (let i = 0; i < 7; i++) K.house(ctx, 40 + i * 90, 330, .26, i); K.baths(ctx, 200, 330, .4, t); // the channel: a buried line falling gently from the springs to the city
      ctx.strokeStyle = '#c8b48a'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1180, 300); ctx.quadraticCurveTo(900, 520, 260, 360); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); ctx.save(); ctx.strokeStyle = '#5ab0e0'; ctx.lineWidth = 10; ctx.setLineDash([2000]); ctx.lineDashOffset = 2000 * (1 - fl); ctx.beginPath(); ctx.moveTo(1180, 300); ctx.quadraticCurveTo(900, 520, 260, 360); ctx.stroke(); ctx.restore();
      cel(ctx, cc => cc.ellipse(1190, 300, 40, 14, 0, 0, 7), '#6ab8e0', { dx: 2, dy: 2, lw: 2 }); P.caption(ctx, 'springs', 1, { size: 20, x: 1190, y: 270, align: 'center' }); });
    C.finish(ctx, t, 'golden', { leak: false }); cap(ctx, 'remember the Aqua Virgo? one of the old eleven', t, 'remember', { size: 24 }); cap(ctx, 'built in 19 BC to feed the baths', t, 'y19', { size: 26, y: 686 }); }
  // 3. popes restored it (masons relining the channel; a papal coat of arms on the new arch)
  function sRestore(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.06, x: 20 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 430, sun: [1100, 260], sunR: 40, seed: 1911 })); L(ctx, c, .25, () => C.mounds(ctx, { y: 440, n: 5, seed: 1912, col: '#8aa070', far: .4, sunX: 1100, t, w: 560, h: 80, copses: 2 }));
    L(ctx, c, 1, () => { C.meadow(ctx, 460, 800, t, { col: '#8aa244', n: 100 }); K.aqueduct(ctx, -200, 1500, 380, () => 660, t, { bay: 150 }); K.scaffold(ctx, 520, 660, 240, 260); for (let i = 0; i < 2; i++) person(ctx, 560 + i * 130, 380, .28, t, MED(i), { pose: i ? 'carry' : 'strike', face: i ? -1 : 1, prop: i ? (cc, x, y) => cel(cc, c2 => c2.rect(x - 22, y - 16, 44, 24), '#d8bc8a', { dx: 3, dy: 3, lw: 2 }) : null });
      cel(ctx, cc => cc.ellipse(940, 470, 36, 44, 0, 0, 7), '#e8b830', { shade: '#b08018', dx: 6, dy: 0, lw: 3 }); P.caption(ctx, '✝', 1, { size: 28, x: 940, y: 482, align: 'center' }); person(ctx, 260, 720, .5, t, POPE, { pose: 'wave', face: 1, mouth: 'smile' }); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'popes restored it', t, 'restored', { size: 28 }); }
  // 4. and today it feeds Rome's most famous fountain: the Trevi
  function sTrevi(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.12, y: 40 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 300, sun: [1100, 160], sunR: 34, seed: 1921 }));
    L(ctx, c, .7, () => { for (const x of [-140, 1420]) K.insula(ctx, x, 560, 1.6, x > 0 ? 1 : 2, t); trevi(ctx, 640, 520, .85, t); ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 634, 1900, 300); });
    L(ctx, c, 1, () => { for (let i = 0; i < 8; i++) person(ctx, 80 + i * 160, 730 + (i % 2) * 14, .34, t, TOURIST(i), { pose: ['photo', 'stand', 'point', 'stand'][i % 4], face: i < 4 ? 1 : -1, prop: i % 4 === 0 ? (cc, x, y) => ink(cc, '#2a2a2e', c2 => c2.rect(x - 12, y - 20, 24, 36), 2) : null }); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'and today it feeds Rome\'s most famous fountain', t, 'today', { size: 24, y: 60 }); cap(ctx, 'the Trevi', t, 'trevi', { size: 36, y: 120 }); }
  // 5. throw a coin into the Trevi and you're throwing it into water that runs along the route the Romans laid out 2,000+ years ago
  function sCoin(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.02 }), u = clamp((t - A.coin) / .9), cut = ease.inOut(clamp((t - A.water2 + .2) / 1));
    L(ctx, c, 1, () => { ctx.save(); ctx.translate(0, -360 * cut); // top: the basin edge and a tourist tossing a coin over her shoulder; below: the channel under the street
      C.sky(ctx, 'golden', t, { horizon: 300, sun: [1100, 160], sunR: 34, seed: 1921 }); trevi(ctx, 640, 600, .9, t); ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 720, 1900, 60);
      person(ctx, 300, 760, .62, t, TOURIST(1), { pose: u > 0 ? 'up' : 'stand', face: -1, eyes: 'closed', mouth: 'smile' }); if (u > 0 && u < 1) { const x = lerp(300, 620, u), y = 380 - Math.sin(u * Math.PI) * 200 + u * 300; cel(ctx, cc => cc.ellipse(x, y, 8, 8 * Math.abs(Math.cos(t * 20)) + 1, 0, 0, 7), '#e8b830', { shade: '#b08018', dx: 2, dy: 0, lw: 2 }); }
      if (u >= 1) { const sp = clamp((t - A.coin - .9) / .6); ctx.strokeStyle = `rgba(255,255,255,${1 - sp})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(620, 680, 10 + sp * 50, 3 + sp * 10, 0, 0, 7); ctx.stroke(); }
      // under the street: earth, the old channel of the Virgo running away toward the hills
      ctx.fillStyle = '#8a6a48'; ctx.fillRect(-300, 780, 1900, 400); cel(ctx, cc => cc.rect(-300, 900, 1900, 70), '#c8b48a', { shade: '#988458', dx: 0, dy: 0, lw: 4 }); ctx.fillStyle = '#5ab0e0'; ctx.fillRect(-300, 930, 1900, 30); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3; ctx.setLineDash([16, 14]); ctx.lineDashOffset = t * 60; ctx.beginPath(); ctx.moveTo(-300, 945); ctx.lineTo(1600, 945); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#5ab0e0'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(640, 930); ctx.lineTo(640, 700); ctx.stroke(); ctx.restore();
      if (cut > .5) { P.caption(ctx, '← towards the springs, 20 km away', clamp((cut - .5) * 2), { size: 22, x: 640, y: 660, align: 'center' }); } });
    C.finish(ctx, t, 'golden', { leak: false }); cap(ctx, 'when you throw a coin into the Trevi…', t, 'throw', { size: 24, y: 60 }); cap(ctx, '…it lands in water running along the route the Romans laid out more than 2,000 years ago', t, 'water2', { size: 20, y: 104 }); }
  // 6. the pope who wanted Rome to look holy had to make it look wet
  function sWet(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 20 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 300, sun: [1100, 160], sunR: 34, seed: 1931 })); L(ctx, c, .6, () => { trevi(ctx, 640, 560, 1, t); ctx.fillStyle = '#c8b894'; ctx.fillRect(-300, 694, 1900, 200); });
    L(ctx, c, 1, () => { person(ctx, 640, 780, .6, t, POPE, { pose: since(t, 'wet') > -.2 ? 'up' : 'stand', face: 1, mouth: 'smile' }); for (let i = 0; i < 6; i++) { const ph = (t * 1.4 + i * .17) % 1; ctx.fillStyle = `rgba(160,215,240,${1 - ph})`; ctx.beginPath(); ctx.arc(640 + Math.cos(i) * 120 * ph, 560 - Math.sin(ph * Math.PI) * 120, 6, 0, 7); ctx.fill(); } });
    C.finish(ctx, t, 'golden'); cap(ctx, 'the pope who wanted Rome to look holy…', t, 'pope', { size: 26, y: 60 }); cap(ctx, '…had to make it look wet', t, 'holy', { size: 30, y: 120 }); }

  const cut = [[0, sKnow, 0], [A.remember - .3, sVirgo, .5], [A.restored - .4, sRestore, .5], [A.today - .3, sTrevi, .5], [A.throw - .3, sCoin, .5], [A.pope - .3, sWet, .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: A.water, type: 'splash', gain: .3 }, { t: A.virgo, type: 'bubbles', gain: .3 }, { t: A.restored, type: 'thud', gain: .3 }, { t: A.trevi, type: 'swell', gain: .4 }, { t: A.coin + .9, type: 'splash', gain: .4 },
    { t: A.thousand, type: 'swell', gain: .3 }, { t: A.wet, type: 'splash', gain: .35 }];
  const moods = [{ t: 0, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat8d.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
