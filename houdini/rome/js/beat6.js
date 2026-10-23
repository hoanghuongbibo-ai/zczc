/* Rome — Beat 6, "The twist" (narration-beat6.mp3 = narration-full.mp3 638.3–684.0 s + pad).
 * What history class skips: "the fall of Rome" pictures barbarians storming the capital — but Rome wasn't the capital any more.
 * By the 200s the empire was too big and pressed to run from one city; emperors went where the armies were: Milan (286), then
 * Ravenna (402), safe in its marshes. Rome became something strange: famous, huge, rich — no emperor, no army. A symbol; a target. */
(function (G) {
  'use strict';
  const C = G.Cine, L = C.layer, K = G.RK;
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, mix } = P;
  const { person, CIVIL, SOLDIER, GOTH, TOURIST } = K;
  const OFF = 638.3;
  const A0 = { here: 638.58, skipped: 640.53, fall: 642.5, barbarian: 644.27, capital: 645.67, butby: 647.57, wasnt: 649.46, anymore: 650.66, by200: 651.64, big: 654.04, pressure: 655.31, onecity: 656.38,
    emperors: 657.53, armies: 658.83, in286: 660.09, western: 661.38, milan: 663.07, in402: 664.08, court: 665.26, ravenna: 666.12, marshes: 667.85, defend: 669.49, so: 670.57, strange: 672.15, famous: 673.67, huge: 675.47, rich: 676.42,
    noemp: 677.4, noarmy: 678.6, symbol: 680.47, targets: 683.24 };
  const A = Object.fromEntries(Object.entries(A0).map(([k, v]) => [k, v - OFF])); A.end = 46.2;
  const since = (t, k) => t - A[k], k01 = (t, k, d = .4) => clamp(since(t, k) / d);
  const cap = (ctx, text, t, key, o = {}) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };
  const EMPEROR = { kind: 'toga', trim: '#7a2a62', cloth: '#7a2a62', hair: '#3a2416', hairStyle: 'short', beard: true, seed: 210 };
  const TEACHER = { kind: 'tourist', cloth: '#5a6a8a', cloth2: '#3a3a42', hair: '#8a5a30', hairStyle: 'bun', fem: true, glasses: true, pack: false, seed: 211 };

  // 1. here's something your history class probably skipped: a classroom, "THE FALL OF ROME" chalked on the board
  function sClass(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.08, x: 20 });
    L(ctx, c, .8, () => { ctx.fillStyle = '#d8d0b8'; ctx.fillRect(-200, -200, 1700, 1200); ctx.fillStyle = '#a89a78'; ctx.fillRect(-200, 470, 1700, 160);
      cel(ctx, cc => cc.rect(300, 90, 680, 320), '#2e4a3a', { shade: '#1e3a2a', dx: 0, dy: 0, lw: 6 }); ink(ctx, null, cc => cc.rect(300, 90, 680, 320), 12, '#8a6040'); ctx.save(); ctx.font = '700 46px "Liberation Serif", serif'; ctx.fillStyle = 'rgba(240,240,230,.9)'; ctx.textAlign = 'center'; ctx.fillText('THE FALL OF ROME', 640, 190); ctx.font = '700 36px "Liberation Serif", serif'; ctx.fillText('AD 476', 640, 250);
      ctx.strokeStyle = 'rgba(240,240,230,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(420, 300); ctx.lineTo(560, 300); ctx.lineTo(600, 340); ctx.moveTo(700, 320); ctx.quadraticCurveTo(760, 280, 860, 330); ctx.stroke(); ctx.restore();
      ink(ctx, '#8a6040', cc => cc.rect(300, 410, 680, 14), 3); for (let i = 0; i < 3; i++) ink(ctx, '#f4f0e8', cc => cc.rect(340 + i * 30, 400, 22, 8), 1.5);
      // a world map and a clock on the wall, a window
      ctx.save(); ctx.beginPath(); ctx.rect(1040, 100, 180, 230); ctx.clip(); C.sky(ctx, 'golden', t, { horizon: 300, sun: [1180, 160], sunR: 18, clouds: 1, seed: 1001 }); ctx.restore(); ink(ctx, null, cc => cc.rect(1040, 100, 180, 230), 10, '#f4f0e8');
      ink(ctx, '#f4f0e8', cc => cc.arc(160, 160, 46, 0, 7), 5); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(160, 160); ctx.lineTo(160, 128); ctx.moveTo(160, 160); ctx.lineTo(184, 168); ctx.stroke();
      ctx.fillStyle = '#9a7a52'; ctx.fillRect(-200, 630, 1700, 300); });
    L(ctx, c, 1, () => { person(ctx, 1080, 640, .62, t, TEACHER, { pose: 'point', face: -1, talk: since(t, 'fall') > 0 });
      // students at their desks, seen from behind
      for (let i = 0; i < 4; i++) { const x = 180 + i * 240, y = 760; person(ctx, x, y + 40, .5, t, TOURIST(i), { pose: 'stand', face: 1 }); cel(ctx, cc => cc.rect(x - 90, y - 70, 180, 20), '#a87a4a', { shade: '#7a5432', dx: 0, dy: 5, lw: 3 }); } });
    C.finish(ctx, t, 'golden', { leak: false, vig: .4 }); cap(ctx, 'here\'s something your history class probably skipped', t, 'here', { size: 26, y: 60 }); }
  // 2. "the fall of Rome": what we picture — barbarians storming the capital (drawn as a sepia picture in the head)
  function sImagined(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 10 }), k = clamp((t - A.fall) / 2.4);
    L(ctx, c, .04, () => C.sky(ctx, 'storm', t, { horizon: 420, seed: 1011, clouds: 4 })); L(ctx, c, .3, () => { C.mounds(ctx, { y: 430, n: 5, seed: 1012, col: '#7a7860', far: .4, sunX: 700, t, w: 560, h: 80, copses: 2 }); for (let i = 0; i < 6; i++) P.temple(ctx, 300 + i * 150, 380, .22, { roof: '#d8b048' }); });
    L(ctx, c, 1, () => { ctx.fillStyle = '#8a8060'; ctx.fillRect(-300, 560, 1900, 400); K.aurelianWall(ctx, 560, -300, 1600, 640, 1, t, { open: k });
      for (let i = 0; i < 7; i++) { const x = lerp(1400 + i * 90, 760 + i * 70, ease.out(k)), y = 700 + (i % 3) * 18; person(ctx, x, y, .44, t, GOTH(i), { pose: i % 2 ? 'strike' : 'walk', walk: true, face: -1, mouth: 'grin', brow: 'angry', prop: K.spear }); } });
    P.grade(ctx, '#a07a50', .5, 'saturation'); P.grade(ctx, '#d8b080', .25, 'multiply'); C.finish(ctx, t, 'storm', { leak: false, vig: .6 });
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.strokeStyle = 'rgba(255,240,210,.7)'; ctx.lineWidth = 4; ctx.setLineDash([16, 12]); ctx.strokeRect(40, 40, 1200, 640); ctx.restore();
    cap(ctx, 'when people say "the fall of Rome"…', t, 'fall', { size: 26, y: 100 }); cap(ctx, 'they picture barbarians storming the capital of the empire', t, 'barbarian', { size: 24, y: 660 }); }
  // 3. but by then Rome wasn't really the capital any more: the palace throne room on the Palatine, the throne empty
  function sThrone(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.12 }, { z: 1.0 });
    L(ctx, c, .8, () => { ctx.fillStyle = '#e8dcc4'; ctx.fillRect(-200, -200, 1700, 900); for (let i = 0; i < 6; i++) { const px = 40 + i * 210, base = ['#8a3a4a', '#5a7a6a', '#a87a4a'][i % 3]; cel(ctx, cc => cc.rect(px + 14, 60, 142, 220), base, { shade: mix(base, '#000', .3), dx: 10, dy: 10, lw: 2 }); ink(ctx, null, cc => cc.rect(px + 30, 76, 110, 188), 3, '#d8a040'); }
      for (let i = 0; i < 7; i++) P.column(ctx, -20 + i * 220, 600, 34, 560, { col: '#efe6d2' }); ctx.fillStyle = '#b8a07a'; ctx.fillRect(-200, 600, 1700, 300); for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) { ctx.fillStyle = (i + r) % 2 ? '#7a2a2a' : '#d8ccb0'; ctx.beginPath(); const y = 610 + r * 30, x = i * 90 - r * 20; ctx.moveTo(x, y + 14); ctx.lineTo(x + 45, y); ctx.lineTo(x + 90, y + 14); ctx.lineTo(x + 45, y + 28); ctx.closePath(); ctx.fill(); }
      // light shafts through high windows, dust in them
      ctx.save(); ctx.globalCompositeOperation = 'screen'; for (const lx of [380, 820]) { const g = ctx.createLinearGradient(lx, 0, lx - 200, 700); g.addColorStop(0, 'rgba(255,230,170,.35)'); g.addColorStop(1, 'rgba(255,230,170,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(lx, -40); ctx.lineTo(lx + 90, -40); ctx.lineTo(lx - 110, 720); ctx.lineTo(lx - 260, 720); ctx.closePath(); ctx.fill(); } ctx.restore(); });
    L(ctx, c, 1, () => { // the dais and the empty throne, a cobweb in its arm, one servant sweeping
      for (let i = 0; i < 3; i++) cel(ctx, cc => cc.rect(440 + i * 30, 600 - (i + 1) * 26, 400 - i * 60, 26), '#efe6d2', { shade: '#c0b8a8', dx: 0, dy: 6, lw: 3 }); const ty = 522;
      cel(ctx, cc => { cc.moveTo(560, ty); cc.lineTo(560, ty - 220); cc.quadraticCurveTo(640, ty - 270, 720, ty - 220); cc.lineTo(720, ty); cc.closePath(); }, '#d8b048', { shade: '#a88028', light: '#f0d070', dx: 20, dy: 0, lw: 4 }); cel(ctx, cc => cc.rect(580, ty - 200, 120, 150), '#7a2a62', { shade: '#5a1a42', dx: 10, dy: 0, lw: 3 }); cel(ctx, cc => cc.rect(550, ty - 60, 180, 30), '#d8b048', { shade: '#a88028', dx: 0, dy: 6, lw: 3 });
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.2; for (let r = 10; r < 50; r += 10) { ctx.beginPath(); ctx.arc(720, ty - 220, r, Math.PI * .5, Math.PI); ctx.stroke(); } for (let a = 0; a < 5; a++) { ctx.beginPath(); ctx.moveTo(720, ty - 220); ctx.lineTo(720 - Math.cos(a * .39) * 50, ty - 220 + Math.sin(a * .39) * 50); ctx.stroke(); }
      person(ctx, 1040, 700, .5, t, CIVIL[2], { pose: 'pry', face: -1, eyes: 'half', prop: (cc, x, y) => { cc.strokeStyle = INK; cc.lineWidth = 5; cc.beginPath(); cc.moveTo(x, y); cc.lineTo(x - 40, y + 120); cc.stroke(); ink(cc, '#c8a050', c2 => c2.ellipse(x - 44, y + 126, 26, 8, 0, 0, 7), 2); } }); });
    C.motes(ctx, t, 40); C.finish(ctx, t, 'golden', { leak: false, vig: .5 }); cap(ctx, 'but by the time that happened…', t, 'butby', { size: 26 }); cap(ctx, 'Rome wasn\'t really the capital any more', t, 'wasnt', { size: 26, y: 686 }); }
  // 4. by the 200s the empire was too big, under too much pressure, to run from one city: frontiers pressed from outside
  function sPressure(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.04 }, { z: 1.0 }), k = clamp((t - A.big + .3) / 1.2);
    L(ctx, c, 1, () => { K.medMap(ctx, t, { red: cc => { cc.fillStyle = 'rgba(184,48,40,.5)'; cc.beginPath(); cc.ellipse(640, 360, 760, 330, 0, 0, 7); cc.fill(); } , isleCol: '#cf9a74' });
      const [rx, ry] = K.PJ([12.5, 41.9]); K.cityDot(ctx, 12.5, 41.9, 'ROMA', 1, { align: 'right', dx: -14 });
      // pressure arrows on every frontier: the Rhine and Danube, the east, the desert
      const AR = [[[7, 48.6], [8, 46.4], 0], [[17, 48.8], [17, 46.8], .2], [[27, 48.6], [27, 46.2], .4], [[41, 38.5], [38.5, 37.6], .6], [[25, 27.6], [25, 30.4], .8], [[3, 28], [3, 31.4], 1]];
      for (const [a, b, d] of AR) { const kk = clamp(k * 2 - d), pul = Math.sin(t * 5 + d * 6) * 6; if (kk <= 0) continue; const [x0, y0] = K.PJ(a), [x1, y1] = K.PJ(b), ang = Math.atan2(y1 - y0, x1 - x0), ex = lerp(x0, x1, kk) + Math.cos(ang) * pul, ey = lerp(y0, y1, kk) + Math.sin(ang) * pul;
        ctx.strokeStyle = INK; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = '#3a3a48'; ctx.lineWidth = 10; ctx.stroke();
        ink(ctx, '#3a3a48', cc => { cc.moveTo(ex + Math.cos(ang) * 26, ey + Math.sin(ang) * 26); cc.lineTo(ex + Math.cos(ang + 2.2) * 22, ey + Math.sin(ang + 2.2) * 22); cc.lineTo(ex + Math.cos(ang - 2.2) * 22, ey + Math.sin(ang - 2.2) * 22); cc.closePath(); }, 3); }
      if (since(t, 'onecity') > -.2) { const a = k01(t, 'onecity', .4); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#f4e2b0'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + Math.cos(an) * 520, ry + Math.sin(an) * 280); ctx.stroke(); } ctx.restore(); } });
    C.finish(ctx, t, 'dawn', { leak: false, vig: .4 }); cap(ctx, 'by the 200s the empire was too big and under too much pressure…', t, 'by200', { size: 24, y: 60 }); cap(ctx, '…to run from one city', t, 'onecity', { size: 26, y: 686 }); }
  // 5. emperors moved to where the armies were: the emperor rides north with a column of legionaries
  function sMarch(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: 40 }, { z: 1.06, x: -40 }), go = lt * 26;
    L(ctx, c, .04, () => C.sky(ctx, 'dawn', t, { horizon: 430, sun: [1100, 300], sunR: 40, seed: 1021 })); L(ctx, c, .2, () => C.mounds(ctx, { y: 450, n: 5, seed: 1022, col: '#8aa070', far: .4, sunX: 1100, t, w: 560, h: 110, copses: 3 }));
    L(ctx, c, .5, () => { C.meadow(ctx, 470, 620, t, { col: '#8aa244', n: 80, flowers: 10 }); for (let i = 0; i < 6; i++) C.tree(ctx, -60 + i * 280, 520, .55, t, { kind: i % 2 ? 'cypress' : 'umbrella', seed: i + 11 }); });
    L(ctx, c, 1, () => { // a paved road across the frame, the column marching right to left
      ctx.fillStyle = '#b8a888'; ctx.fillRect(-300, 620, 1900, 90); ctx.strokeStyle = 'rgba(90,70,40,.4)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.moveTo(i * 50 - 300, 620); ctx.lineTo(i * 50 - 290, 710); ctx.stroke(); } ink(ctx, null, cc => { cc.moveTo(-300, 620); cc.lineTo(1600, 620); cc.moveTo(-300, 710); cc.lineTo(1600, 710); }, 3); C.meadow(ctx, 710, 800, t, { col: '#7a9a3a', n: 60 });
      for (let i = 0; i < 8; i++) { const x = 700 + i * 110 - go; person(ctx, x, 690 - (i % 2) * 20, .36, t, SOLDIER(i), { pose: 'walk', walk: true, face: -1, prop: K.spear }); }
      const hx = 480 - go; P.horse(ctx, hx, 700, .5, t, { walk: true, col: '#f0ece0', mane: '#c8c0b0', rider: cc => person(cc, -10, -112, .8, t, EMPEROR, { pose: 'point', face: -1, legs: '#7a2a62' }) });
      cel(ctx, cc => cc.rect(hx + 200, 380, 70, 90), '#a8322a', { shade: '#7a2420', dx: 10, dy: 0, lw: 3 }); ink(ctx, '#d8a040', cc => cc.rect(hx + 196, 372, 78, 10), 2); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(hx + 235, 360); ctx.lineTo(hx + 235, 680); ctx.stroke(); K.crown(ctx, hx + 235, 350, .6); });
    C.finish(ctx, t, 'dawn'); cap(ctx, 'emperors moved to where the armies were', t, 'emperors', { size: 26 }); }
  // 6. 286: the western emperor makes Milan his base; 402: the court moves to Ravenna (the crown travels on a map of Italy)
  function sMoves(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 2.4, x: 0, y: 0 }, { z: 2.6 }), [rx, ry] = K.PJ([12.5, 41.9]), [mx, my] = K.PJ([9.2, 45.5]), [vx, vy] = K.PJ([12.2, 44.4]);
    const k1 = ease.inOut(clamp((t - A.western + .2) / 1.4)), k2 = ease.inOut(clamp((t - A.court + .2) / 1.4));
    ctx.save(); ctx.translate(640, 360); ctx.scale(c.z, c.z); ctx.translate(-(rx + mx) / 2, -(ry + my) / 2 - 10); K.medMap(ctx, t);
    K.cityDot(ctx, 12.5, 41.9, 'Rome', 1, { size: 9, r: 4, dx: 6, dy: -4, local: true, lw: 1.5 }); K.cityDot(ctx, 9.2, 45.5, 'Milan', clamp(k1 * 3), { size: 9, r: 4, dx: 6, dy: -4, local: true, lw: 1.5 }); K.cityDot(ctx, 12.2, 44.4, 'Ravenna', clamp(k2 * 3), { size: 9, r: 4, dx: 6, dy: -4, local: true, lw: 1.5 });
    ctx.strokeStyle = 'rgba(168,50,42,.8)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); if (k1 > 0) { ctx.beginPath(); ctx.moveTo(rx, ry); ctx.quadraticCurveTo((rx + mx) / 2 - 20, (ry + my) / 2, lerp(rx, mx, k1), lerp(ry, my, k1)); ctx.stroke(); } if (k2 > 0) { ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(lerp(mx, vx, k2), lerp(my, vy, k2)); ctx.stroke(); } ctx.setLineDash([]);
    const qx = k2 > 0 ? lerp(mx, vx, k2) : lerp(rx, mx, k1), qy = k2 > 0 ? lerp(my, vy, k2) : lerp(ry, my, k1); K.crown(ctx, qx, qy - 14, .3); ctx.restore();
    C.finish(ctx, t, 'dawn', { leak: false, vig: .4 }); cap(ctx, 'AD 286: the western emperor makes his base at Milan', t, 'in286', { size: 24 }); cap(ctx, 'AD 402: the court moves to Ravenna', t, 'in402', { size: 24, y: 686 }); }
  // 7. Ravenna: a city surrounded by marshes, much easier to defend — walls on dry ground, a causeway, channels, reeds
  function sRavenna(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.08, x: 30 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 400, sun: [1060, 260], sunR: 40, seed: 1031 })); L(ctx, c, .15, () => C.mounds(ctx, { y: 410, n: 4, seed: 1032, col: '#98a888', far: .55, sunX: 1060, t, w: 600, h: 50, copses: 1 }));
    L(ctx, c, .5, () => { C.water(ctx, -400, 420, 1700, 760, t, { sunX: 1060 }); // the lagoon, the town on its island of dry ground
      cel(ctx, cc => { cc.moveTo(300, 560); cc.quadraticCurveTo(320, 470, 640, 462); cc.quadraticCurveTo(960, 470, 1000, 560); cc.closePath(); }, '#b8a878', { shade: '#8a7a50', dx: 0, dy: 8, lw: 3.5 });
      for (let i = 0; i < 8; i++) K.house(ctx, 380 + i * 80, 500 + (i % 2) * 6, .24, i, { marble: i % 3 === 0 }); P.temple(ctx, 640, 492, .3, { roof: '#d8b048' }); K.aurelianWall(ctx, 556, 330, 980, 480, .32, t, { open: 1 });
      cel(ctx, cc => { cc.moveTo(420, 556); cc.lineTo(470, 556); cc.lineTo(120, 740); cc.lineTo(20, 740); cc.closePath(); }, '#a89870', { shade: '#7a6a48', dx: 0, dy: 4, lw: 3 });
      for (let i = 0; i < 3; i++) person(ctx, lerp(80, 400, ((lt * .05 + i * .15) % 1)), lerp(728, 566, ((lt * .05 + i * .15) % 1)), lerp(.3, .12, ((lt * .05 + i * .15) % 1)), t, i ? SOLDIER(i) : EMPEROR, { pose: 'walk', walk: true, face: 1 });
      for (let i = 0; i < 2; i++) K.ship(ctx, 1080 + i * 160, 520 + i * 40, .22 + i * .05, t, { flip: true }); });
    L(ctx, c, 1.3, () => { for (let i = 0; i < 12; i++) P.reeds(ctx, -40 + i * 120 + (i % 2) * 40, 760, .9 + (i % 3) * .2, t, 6); });
    C.finish(ctx, t, 'golden'); cap(ctx, 'Ravenna: a city surrounded by marshes', t, 'ravenna', { size: 26 }); cap(ctx, 'much easier to defend', t, 'defend', { size: 26, y: 686 }); }
  // 8. so Rome became something strange: the most famous city on earth, still huge, still rich
  function sStrange(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0, x: -40 }, { z: 1.08, x: 40 });
    L(ctx, c, .04, () => C.sky(ctx, 'golden', t, { horizon: 400, sun: [1000, 250], sunR: 46, seed: 1041 })); L(ctx, c, .15, () => C.mounds(ctx, { y: 420, n: 5, seed: 1042, col: '#8a9a78', far: .5, sunX: 1000, t, w: 560, h: 90, copses: 2 }));
    L(ctx, c, .4, () => { K.colosseum(ctx, 900, 400, 190, 46, 120); const r = C.mound(ctx, 330, 470, 640, 150, { col: '#7e9a48', sunX: 1000, t, copses: 1, seed: 1043 }); for (const [x, s] of [[260, .42], [450, .34]]) { const y = C.site(ctx, x, 240 * s / .42, r, t, { podium: 14, steps: false, bushes: true, seed: x }); P.temple(ctx, x, y, s, { roof: '#d8b048' }); } });
    L(ctx, c, 1, () => K.cityscape(ctx, t)); C.rays(ctx, 1000, 250, t, .1); C.motes(ctx, t); C.finish(ctx, t, 'golden');
    cap(ctx, 'so Rome became something strange', t, 'so', { size: 26 }); cap(ctx, 'the most famous city on earth · still huge · still rich', t, 'famous', { size: 24, y: 686 }); }
  // 9. with no emperor and no army to protect it: an unmanned gate, the throne-room banner gone, leaves blowing through
  function sNoArmy(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.06 }, { z: 1.0 });
    L(ctx, c, .04, () => C.sky(ctx, 'dawn', t, { horizon: 520, sun: [300, 300], sunR: 40, seed: 1051 }));
    L(ctx, c, 1, () => { ctx.fillStyle = '#a89a78'; ctx.fillRect(-300, 600, 1900, 300); K.aurelianWall(ctx, 600, -300, 1600, 640, 1.1, t, { open: .2 });
      for (let i = 0; i < 9; i++) { const ph = (t * .25 + i * .11) % 1; ctx.save(); ctx.translate(lerp(-60, 1340, ph), 640 + Math.sin(ph * 12 + i) * 40 + i * 6); ctx.rotate(ph * 12); ink(ctx, ['#c8a040', '#a8642a', '#8a9a3a'][i % 3], cc => cc.ellipse(0, 0, 10, 5, 0, 0, 7), 1.5); ctx.restore(); }
      P.goat ? P.goat(ctx, 300, 700, .5, t, { seed: 4 }) : 0; });
    C.finish(ctx, t, 'dawn', { leak: false }); cap(ctx, 'no emperor', t, 'noemp', { size: 28 }); cap(ctx, 'and no army to protect it', t, 'noarmy', { size: 28, y: 686 }); }
  // 10. a symbol — and symbols make great targets: Gothic horsemen on a ridge watch the city glow at dusk
  function sTarget(ctx, lt, dur, t) { const c = C.cam(lt, dur, { z: 1.0 }, { z: 1.12, x: 60 });
    L(ctx, c, .04, () => C.sky(ctx, 'sunset', t, { horizon: 430, sun: [880, 400], sunR: 50, seed: 1061 })); L(ctx, c, .25, () => { K.cityscape(ctx, t, { dusk: true }); K.colosseum(ctx, 900, 410, 150, 36, 90); });
    L(ctx, c, 1, () => { cel(ctx, cc => { cc.moveTo(-300, 900); cc.lineTo(-300, 600); cc.quadraticCurveTo(200, 520, 600, 600); cc.quadraticCurveTo(700, 620, 760, 900); cc.closePath(); }, '#2a2024', { dx: 0, dy: 0, lw: 4 });
      for (let i = 0; i < 3; i++) P.horse(ctx, 120 + i * 170, 590 + i * 10, .42, t, { flip: true, col: '#2a2024', mane: '#1a1418', saddle: '#2a2024', seed: i, rider: cc => person(cc, -10, -112, .8, t, GOTH(i), { pose: i === 1 ? 'point' : 'stand', face: 1 }) }); });
    C.finish(ctx, t, 'sunset', { leakX: 880, vig: .55 }); cap(ctx, 'a symbol', t, 'symbol', { size: 30 }); cap(ctx, 'and symbols make great targets', t, 'targets', { size: 28, y: 686 }); }

  const cut = [[0, sClass, 0], [A.fall - .4, sImagined, .5], [A.butby - .3, sThrone, .5], [A.by200 - .3, sPressure, .5], [A.emperors - .3, sMarch, .5], [A.in286 - .3, sMoves, .5], [A.ravenna - .1, sRavenna, .5],
    [A.so - .3, sStrange, .5], [A.noemp - .3, sNoArmy, .5], [A.symbol - .3, sTarget, .5]];
  const shots = P.cutList(cut, A.end);
  const sfx = [{ t: A.skipped, type: 'scratch', gain: .3 }, { t: A.barbarian, type: 'boom', gain: .35 }, { t: A.wasnt, type: 'wind', gain: .3 }, { t: A.pressure, type: 'press', gain: .3 }, { t: A.emperors, type: 'hit', gain: .25 },
    { t: A.milan, type: 'click', gain: .3 }, { t: A.ravenna, type: 'click', gain: .3 }, { t: A.marshes, type: 'splash', gain: .25 }, { t: A.famous, type: 'swell', gain: .3 }, { t: A.noarmy, type: 'wind', gain: .3 }, { t: A.targets, type: 'boom', gain: .4 }];
  const moods = [{ t: 0, mood: 'still' }, { t: A.fall - .4, mood: 'tense' }, { t: A.butby - .3, mood: 'mystery' }, { t: A.so - .3, mood: 'still' }, { t: A.symbol - .3, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-beat6.mp3', shots, sfx, moods, images: {}, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
