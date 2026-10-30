/* The Life of the Mona Lisa — BEAT 4 + 6: the king, the Revolution, the emperor; famous but only in certain rooms
 * (L86–142, 4:55–8:44). */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MS = G.MS, ML = G.ML, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, FA = G.Fauna, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  Object.assign(G.CW, { jestaz: { outfit: 'suitBrown', look: { skin: '#f0d0b4', hairCol: '#9a9a9a', glasses: true } }, grognard: { outfit: 'napoleon', hat: 'kepi', look: { skin: '#ecc8a6', hairCol: '#3a2a1a', beard: 'moustache', beardCol: '#3a2a1a' } },
    poet: { outfit: 'frockBlack', look: { skin: '#f2d6c0', hairCol: '#3a2a1a', hair: 'curly' } }, farmer: { outfit: 'plumber', hat: 'slouch', look: { skin: '#eecaa8', hairCol: '#8a5a2a' } },
    worker: { outfit: 'hivis', hat: 'none', look: { skin: '#e8c4a0', hairCol: '#15100c' } }, kidBA: { outfit: 'hoodie', look: { skin: '#d8a880', hairCol: '#15100c', width: .85 } } });
  const label = (g, s, x, y, size = 30, col = '#15100c') => { g.font = MK(size); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const card = (g, x, y, w, h, fill = '#f6efe0') => { g.fillStyle = 'rgba(10,6,4,.35)'; g.beginPath(); g.roundRect(x - w / 2 + 6, y - h / 2 + 8, w, h, 14); g.fill(); g.fillStyle = fill; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 14); g.fill(); g.lineWidth = 5; g.strokeStyle = '#15100c'; g.stroke(); };

  // ---------------- L86–93 the king buys her ----------------
  mood(86, 'warm'); K2.era(t0(86, 0), 'FRANCE', '1518'); K2.hands(t0(86, 8), 2, 'KING FRANCIS I'); SFX(86, 7, 'tada', .5); SFX(86, 4, 'whoosh', .5);
  C(86, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 390, 1.12]], bg: (g, t) => MS.versailles(g, t, { mona: false }), act: (g, t) => { const k = clamp((lt - .1) / .6); GX.hand(g, lerp(1500, 860, ease.out(k)), 430, .7, 0, { kind: 'open', sleeve: '#e8dcc0' }); P(g, 'francis', 640, 750, .72, t, { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => DR.write(c, 'KING FRANCIS I', 640, 640, 60, lt, R(86, 7) - .2) })), 'whip');
  mood(87, 'comic'); SFX(87, 9, 'truck', .5, 1.4); SFX(87, 9, 'whoosh', .6);
  C(87, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8281e', '#e8382e'), act: (g, t) => { const car = clamp((lt - R(87, 9) + .3) / .6);
      if (car > 0) { g.save(); g.translate(lerp(1500, 760, ease.out(car)), 560); sh(g, '#f2c43a', 5, c => { c.moveTo(-200, 0); c.lineTo(-160, -60); c.lineTo(60, -70); c.lineTo(200, -20); c.lineTo(200, 20); c.lineTo(-200, 20); c.closePath(); }); for (const x of [-120, 120]) sh(g, '#15100c', 4, c => c.arc(x, 26, 36, 0, TAU)); g.save(); g.translate(-30, -150); ML.mona(g, 0, 0, 120, {}); g.restore(); g.restore(); GX.speed(g, 900, 540, -1, 5, 200); }
      P(g, 'francis', 320, 760, .7, t, { pose: car > 0 ? 'cheer' : 'present', turn: .5, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'LOVES ITALIAN ART…', 640, 100, 52, lt, .2); if (lt > R(87, 8)) DR.write(c, 'LIKE SPORTS CARS', 640, 180, 52, lt, R(87, 8), { col: '#f2d23a' }); } })), 'whip');
  mood(88, 'warm'); SFX(88, 6, 'card', .6); SFX(88, 9, 'paper', .5);
  C(88, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.amboise(g, t), act: (g, t) => { P(g, 'salai', 520, 750, .66, t, { pose: 'present', turn: .5, face: { mouth: 'smirk', brows: 'sly' } }); ML.mona(g, 780, 520, 160, { frame: false }); },
    ui: c => { DR.write(c, 'SALAÌ', 520, 120, 62, lt, R(88, 6) - .2); DR.write(c, "(LEONARDO'S ASSISTANT)", 520, 190, 30, lt, R(88, 6), { col: '#f2d23a' }); if (lt > R(88, 7)) DR.callout(c, 'HANDLED THE SALE', 980, 260, lt, R(88, 7)); } })), 'whip');
  SFX(89, 7, 'pop', .5); SFX(89, 9, 'sting', .4); SFX(89, 11, 'paper', .6);
  C(89, null, S((lt, R, t) => ({ cam: [[640, 400, 1.12], [640, 390, 1.18]], bg: (g, t) => MS.studio(g, t, { easel: false }), act: (g, t) => { P(g, 'jestaz', 420, 760, .66, t, { pose: lt > R(89, 9) ? 'pointUp' : 'magnify', prop: 'magnifier', turn: .5, face: { mouth: lt > R(89, 9) ? 'o' : 'flat', eyes: lt > R(89, 9) ? 'wide' : 'open' } });
      const k = GX.pop(lt, R(89, 10), .3); if (k > 0) { g.save(); g.translate(860, 360); g.scale(k, k); g.rotate(.04); card(g, 0, 0, 340, 420, '#f2e6c4'); g.font = 'italic 22px Georgia, serif'; g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; ['Salaì … to the King', 'divers tableaux', '…', 'livres tournois'].forEach((l, i) => g.fillText(l, 0, -120 + i * 40)); label(g, '1518', 0, 120, 50, '#c8281e'); g.restore(); } },
    ui: c => { DR.write(c, 'BERTRAND JESTAZ', 420, 110, 46, lt, R(89, 7) - .2); DR.yearTag(c, 'FOUND IN 1999', lt, .2); } })), 'whip');
  SFX(90, 4, 'pop', .6);
  C(90, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2a4a', '#4a3a5a'), act: (g, t) => { [[260, 3], [480, 6], [800, 7], [1020, 9]].forEach(([x, s], i) => { const k = GX.pop(lt, .1 + i * .12, .3); if (k > 0) { g.save(); g.translate(x, 360); g.scale(k, k); ML.painting(g, -80, -110, 160, 220, s); g.restore(); } }); const k = GX.pop(lt, R(90, 4), .35); if (k > 0) { g.save(); g.translate(640, 360); g.scale(k, k); ML.mona(g, 0, 0, 240, {}); g.restore(); } },
    ui: c => { DR.write(c, 'A BATCH OF PAINTINGS…', 640, 90, 50, lt, .1); if (lt > R(90, 6)) DR.callout(c, 'PROBABLY HER TOO', 640, 640, lt, R(90, 6)); } })), 'whip');
  SFX(91, 6, 'coins', .7); SFX(91, 10, 'clink', .5);
  C(91, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a6a1e', '#b8902e'), act: (g, t) => { const sp = lt * 4; g.save(); g.translate(640, 330); g.scale(Math.abs(Math.cos(sp)), 1); sh(g, '#f2c43a', 8, c => c.arc(0, 0, 150, 0, TAU)); sh(g, '#e8b42a', 4, c => c.arc(0, 0, 120, 0, TAU)); label(g, 'ÉCU', 0, -20, 56, '#8a5a10'); label(g, '⚜', 0, 46, 60, '#8a5a10'); g.restore(); },
    ui: c => { DR.write(c, '4,000 ÉCUS', 640, 580, 80, lt, R(91, 6) - .3, { col: '#f2d23a' }); DR.write(c, '(A LATER ACCOUNT)', 640, 660, 30, lt, R(91, 8)); } })), 'whip');
  SFX(92, 6, 'boing', .5);
  C(92, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { label(g, '4,000 ÉCUS', 330, 360, 54, '#f2d23a'); label(g, '=', 640, 360, 80, '#fff'); const r = rng(Math.floor(lt * 8)); label(g, '$' + Math.floor(r() * 900 + 100) + (r() < .5 ? ' MILLION' : ' THOUSAND?'), 950, 360, 50, '#fff'); },
    ui: c => { DR.write(c, "TODAY'S DOLLARS?", 640, 100, 54, lt, .1); if (lt > R(92, 6)) DR.sign(c, 'GUESSWORK', 640, 560, lt, R(92, 6), { size: 50 }); } })), 'whip');
  SFX(93, 3, 'cash', .7); SFX(93, 3, 'coins', .7);
  C(93, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { const r = rng(5), h = ease.out(clamp(lt / 1.2)); for (let i = 0; i < 160 * h; i++) { const x = 640 + (r() - .5) * 1100 * (1 - (i / 160) * .6), y = 720 - (i / 160) * 560 * h - r() * 40; sh(g, r() < .5 ? '#f2c43a' : '#e8b42a', 2.5, c => c.ellipse(x, y, 30, 12, r(), 0, TAU)); } },
    ui: c => DR.write(c, 'CALL IT A FORTUNE.', 640, 110, 66, lt, .2) })), 'flash');

  // ---------------- L94–97 the bath suite ----------------
  mood(94, 'comic'); SFX(94, 4, 'thud', .5); AMB(95, 'kitchen', 12, .3);
  C(94, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a5a7a', '#3a6a8a'), act: (g, t) => { ML.mona(g, 640, 360, 300, {}); const k = GX.pop(lt, .4, .3); if (k > 0) { g.save(); g.translate(950, 220); g.scale(k, k); label(g, '?', 0, 0, 140, '#f2d23a'); g.restore(); } },
    ui: c => { DR.write(c, 'SOMEWHERE YOU WOULDN\'T EXPECT', 640, 640, 46, lt, R(94, 6)); DR.callout(c, 'REPORTEDLY', 260, 140, lt, R(94, 1), null, null, { fill: '#fff3c8' }); } })), 'whip');
  SFX(95, 2, 'splash', .7);
  C(95, null, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 380, 1.1]], bg: (g, t) => MS.bath(g, t, {}), ui: c => { DR.write(c, 'THE ROYAL BATH SUITE', 640, 600, 54, lt, R(95, 1)); DR.yearTag(c, 'FONTAINEBLEAU', lt, R(95, 4)); } })), 'whip');
  SFX(96, 6, 'salthiss', .5, 2); SFX(96, 11, 'chime', .4);
  C(96, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [500, 380, 1.25]], bg: (g, t) => MS.bath(g, t, {}), act: (g, t) => { for (let i = 0; i < 3; i++) P(g, 'salai', 240 + i * 360, 620, .38, t + i, { pose: 'idle', turn: .3, outfit: 'renTunic', face: { mouth: 'smile', eyes: 'happy' } }); },
    ui: c => { DR.callout(c, 'STEAM BATHS', 300, 200, lt, R(96, 6)); DR.callout(c, 'A GALLERY', 980, 200, lt, R(96, 10)); if (lt > R(96, 11)) DR.sign(c, 'MORE SPA THAN BATHROOM', 640, 640, lt, R(96, 11), { size: 40 }); } })), 'whip');
  SFX(97, 7, 'splash', .7); SFX(97, 13, 'boing', .5);
  C(97, null, S((lt, R, t) => ({ cam: [[640, 360, 1.1], [640, 340, 1.18]], bg: (g, t) => MS.bath(g, t, { mona: { look: Math.sin(lt * 2) * .8 } }), act: (g, t) => { const up = ease.out(clamp((lt - R(97, 10)) / .8)); g.save(); g.beginPath(); g.rect(0, 0, 1280, 640); g.clip(); P(g, 'francis', 640, lerp(900, 760, up), .72, t, { outfit: 'renTunic', hat: 'none', pose: up > .5 ? 'cheer' : 'idle', face: { mouth: 'grin', eyes: 'happy' } }); g.restore();
      sh(g, '#7ac0d8', 0, c => c.ellipse(640, 660, 360, 50, 0, 0, TAU)); for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,255,255,.8)'; g.beginPath(); g.arc(520 + i * 50, 650 + Math.sin(lt * 6 + i) * 6, 12, 0, TAU); g.fill(); } },
    ui: c => { GX.bubble(c, '…', 820, 160, lt, R(97, 9), 700, 220, { size: 40 }); DR.write(c, 'WATCHING A KING GET OUT OF THE TUB', 640, 650, 40, lt, R(97, 7)); } })), 'whip');

  // ---------------- L98–105 royal property → the nation's collection ----------------
  mood(98, 'warm'); K2.era(t0(98, 0), 'ROYAL PROPERTY', '1518–1789');
  C(98, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#3a4a9a'), act: (g, t) => { K2.tl(g, [[.05, '1518', 'FRANCIS I'], [.35, '1600s', 'LOUIS XIII'], [.65, '1680s', 'LOUIS XIV'], [.95, '1789', '…']], clamp(lt / 2.6), { y: 400 }); },
    ui: c => DR.write(c, '2½ CENTURIES OF ROYAL PROPERTY', 640, 110, 48, lt, .1) })), 'whip');
  SFX(99, 3, 'whoosh', .5); SFX(99, 6, 'tada', .5);
  C(99, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 390, 1.1]], bg: (g, t) => MS.versailles(g, t, {}), act: (g, t) => P(g, 'louis14', 640, 760, .7, t, { pose: 'presentBoth', face: { mouth: 'smirk', eyes: 'half', brows: 'sly' } }),
    ui: c => { DR.write(c, 'LOUIS XIV', 640, 640, 60, lt, .1); DR.yearTag(c, 'VERSAILLES', lt, R(99, 6) - .2); } })), 'whip');
  SFX(100, 1, 'chime', .4);
  C(100, null, S((lt, R, t) => ({ cam: [[640, 360, 1.25], [640, 360, 1.32]], bg: (g, t) => MS.versailles(g, t, {}), act: (g, t) => { P(g, 'louis14', 420, 760, .6, t, { pose: 'present', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }); P(g, 'francis', 860, 760, .58, t, { outfit: 'georgian', hat: 'periwig', pose: 'crossed', turn: -.5, face: { mouth: 'smile' } }); },
    ui: c => { if (lt > R(100, 4)) DR.tally(c, 'AUDIENCE', g => { g.fillStyle = '#c8281e'; g.beginPath(); g.arc(0, -6, 7, 0, TAU); g.fill(); g.fillRect(-7, 2, 14, 12); }, 640, 620, lt, R(100, 4), { n: 3, label: 'AUDIENCE:' }); } })), 'whip');
  mood(101, 'busy'); SFX(101, 2, 'drum', .7); SFX(101, 4, 'crowd', .6, 2);
  C(101, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.05]], shake: lt > R(101, 2) ? .2 : 0, bg: (g, t) => MS.street(g, t), crowd: DR.army(-60, 560, 1340, 712, 36, ['citizen2', 'citizen1', 'citizen2', 'citizen3'], .3, .42, 101, { spr: { pose: 'cheer', face: { mouth: 'grin', brows: 'angry' } } }),
    act: (g, t) => { const k = clamp((lt - R(101, 3)) / .5); g.save(); g.translate(640, lerp(200, 900, k * k)); g.rotate(k * 3); sh(g, '#e3b440', 5, c => { c.moveTo(-70, 30); c.lineTo(-80, -40); c.lineTo(-30, -10); c.lineTo(0, -60); c.lineTo(30, -10); c.lineTo(80, -40); c.lineTo(70, 30); c.closePath(); }); g.restore(); for (const x of [200, 1080]) { ln(g, [[x, 700], [x, 250]], 8, '#5a3a22'); sh(g, '#2a4ab8', 0, c => c.rect(x, 250, 50, 80)); sh(g, '#fff', 0, c => c.rect(x + 50, 250, 50, 80)); sh(g, '#c8281e', 0, c => c.rect(x + 100, 250, 50, 80)); } },
    ui: c => { DR.write(c, 'FRANCE OVERTHROWS ITS KINGS', 640, 100, 50, lt, .1); DR.yearTag(c, '1789', lt, .2); } })), 'whip');
  K2.hands(t0(102, 7), 3, 'THE NATION'); K2.era(t0(102, 0), 'REVOLUTION', '1789–1797'); SFX(102, 4, 'stamp', .7); SFX(102, 7, 'stamp', .8);
  C(102, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#c8281e'), act: (g, t) => { card(g, 640, 380, 620, 380, '#f4ead4'); label(g, lt > R(102, 7) ? "THE NATION'S" : 'THE ROYAL', 640, 300, 60, lt > R(102, 7) ? '#2a3a8a' : '#8a5a10'); label(g, 'COLLECTION', 640, 380, 60); if (lt > R(102, 7)) { const k = clamp((lt - R(102, 7)) / .3); g.strokeStyle = '#c8281e'; g.lineWidth = 10; g.beginPath(); g.moveTo(420, 300); g.lineTo(420 + 440 * k, 300); g.stroke(); } } })), 'whip');
  SFX(103, 9, 'chime', .5); SFX(103, 19, 'crowd', .6, 3); K2.era(t0(103, 0), 'THE LOUVRE', '1797');
  C(103, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 370, 1.08]], bg: (g, t) => MS.gallery1797(g, t, { mx: 260, my: 330, mh: 130 }), crowd: DR.army(80, 580, 1200, 712, 22, ['citizen1', 'citizen2', 'citizen3'], .3, .42, 103, { walk: true, spr: { turn: -.4 } }),
    ui: c => { DR.yearTag(c, '1797', lt, .1); DR.write(c, 'THE LOUVRE: A PUBLIC MUSEUM', 640, 100, 48, lt, R(103, 17)); DR.callout(c, 'ON DISPLAY', 300, 160, lt, R(103, 9), 260, 300, { screen: true }); } })), 'dissolve');
  SFX(104, 6, 'footsteps', .6, 2.5);
  C(104, null, S((lt, R, t) => ({ cam: [[640, 380, 1.15], [600, 380, 1.22]], bg: (g, t) => MS.gallery1797(g, t, { mx: 640, my: 300, mh: 170 }), crowd: (t2, l2) => DR.army(220, 600, 1060, 712, 12, ['citizen1', 'citizen2', 'citizen3'], .4, .5, 104, { spr: { back: true } }),
    ui: c => DR.write(c, 'ANYBODY CAN WALK IN', 640, 100, 54, lt, R(104, 4) - .2) })), 'whip');
  mood(105, 'comic'); SFX(105, 6, 'swish', .6); SFX(105, 9, 'tada', .5);
  C(105, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a6a5a', '#3a7a6a'), act: (g, t) => { const k = ease.inOut(clamp((lt - R(105, 6)) / .8)); g.save(); g.translate(lerp(380, 900, k), 380 - Math.sin(k * PI) * 160); ML.mona(g, 0, 0, 200, {}); g.restore(); P(g, 'louis14', 300, 760, .55, t, { pose: k > .5 ? 'shrug' : 'present', turn: .5, face: { mouth: k > .5 ? 'shock' : 'smirk' } }); P(g, 'citizen2', 1000, 760, .55, t, { pose: k > .9 ? 'cheer' : 'idle', turn: -.5, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, "THE KING'S STUFF", 380, 120, 50, lt, R(105, 4) - .3); if (lt > R(105, 7)) DR.write(c, '→ YOUR STUFF', 900, 120, 50, lt, R(105, 7), { col: '#f2d23a' }); } })), 'whip');

  // ---------------- L106–115 the emperor ----------------
  mood(106, 'danger'); K2.era(t0(106, 0), 'NAPOLEON', 'c. 1800'); K2.hands(t0(106, 4), 4, 'NAPOLEON'); SFX(106, 4, 'sting', .5);
  C(106, null, S((lt, R, t) => ({ bg: (g, t) => GX.evil(g, t, lt, { eyes: .5, bg: '#1a1e2e' }), act: (g, t) => { g.save(); g.translate(640, 330); g.fillStyle = '#05050a'; g.beginPath(); g.moveTo(-260, -260); g.quadraticCurveTo(0, -460, 260, -260); g.quadraticCurveTo(0, -300, -260, -260); g.fill(); g.restore(); },
    ui: c => DR.write(c, "DIDN'T CARE MUCH FOR SHARING", 640, 640, 50, lt, R(106, 5)) })), 'flash');
  SFX(107, 3, 'drum', .6); SFX(107, 12, 'tada', .4); SFX(107, 17, 'whoosh', .6); SFX(107, 23, 'thud', .5);
  C(107, 2, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 390, 1.1]], bg: (g, t) => MS.gallery1797(g, t, { mona: false }), act: (g, t) => P(g, 'napoleon', 640, 760, .72, t, { pose: 'hips', face: { mouth: 'smirk', brows: 'sly' } }),
    ui: c => { DR.write(c, 'NAPOLEON BONAPARTE', 640, 640, 58, lt, R(107, 3) - .2); if (lt > R(107, 11)) DR.callout(c, 'SOON: EMPEROR', 1000, 200, lt, R(107, 11)); } })), 'whip');
  C(107, 15, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MS.tuileries(g, t, { mona: false }), act: (g, t) => { const k = clamp((lt - .3) / 1.2); g.save(); g.translate(lerp(-200, 340, ease.out(k)), lerp(500, 210, ease.out(k))); ML.mona(g, 0, 0, 170, {}); g.restore(); if (k < 1) GX.hand(g, lerp(-200, 340, ease.out(k)) - 120, lerp(500, 210, ease.out(k)), .45, PI, { kind: 'fist', sleeve: '#1e2a4a' }); },
    ui: c => DR.write(c, 'THE TUILERIES PALACE', 640, 640, 50, lt, R(107, 30) - .2) })), 'whip');
  SFX(108, 4, 'creak', .4); SFX(108, 11, 'chime', .4);
  C(108, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [760, 400, 1.12]], bg: (g, t) => MS.tuileries(g, t, {}), act: (g, t) => { if (lt > R(108, 10)) P(g, 'josephine', 960, 760, .6, t, { pose: 'present', turn: -.4, face: { mouth: 'smile', eyes: 'happy' } }); },
    ui: c => { DR.callout(c, 'HIS BEDROOM?', 980, 160, lt, R(108, 3) - .1); if (lt > R(108, 6)) DR.callout(c, "OR JOSÉPHINE'S ROOMS?", 960, 260, lt, R(108, 6), null, null, { fill: '#fff3c8' }); } })), 'whip');
  mood(109, 'comic'); SFX(109, 2, 'card', .5); SFX(109, 13, 'pop', .5);
  C(109, null, S((lt, R, t) => ({ cam: [[640, 380, 1.2], [600, 380, 1.26]], bg: (g, t) => MS.tuileries(g, t, {}), act: (g, t) => { P(g, 'napoleon', 900, 760, .66, t, { pose: 'crossed', turn: -.4, face: { mouth: 'smirk', eyes: 'happy' } }); const k = GX.pop(lt, R(109, 12), .3); if (k > 0) { g.save(); g.translate(340, 340); g.scale(k, k); g.rotate(-.2); sh(g, '#fff', 4, c => c.roundRect(60, -20, 150, 46, 6)); label(g, 'DÉCOR', 135, 4, 26, '#c8281e'); g.restore(); } },
    ui: c => DR.tally(c, '4 YEARS', g => { g.fillStyle = '#2a3a8a'; g.fillRect(-10, -12, 20, 24); }, 640, 620, lt, R(109, 2), { n: 4, label: '≈ 4 YEARS' }) })), 'whip');
  mood(110, 'curious'); SFX(110, 3, 'tick', .6);
  C(110, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { label(g, '⏸', 640, 340, 200, '#f2d23a'); }, ui: c => DR.write(c, 'WORTH PAUSING ON…', 640, 600, 54, lt, .1) })), 'dip');
  SFX(111, 3, 'truck', .5, 2); SFX(111, 10, 'gallop', .5, 2);
  C(111, null, S((lt, R, t) => { const v = M.view(9, 45, 60); return { bg: g => DR.map(g, t, v), act: (g, t) => { for (let i = 0; i < 4; i++) { const k = clamp((lt - .3 - i * .35) / 2); if (k > 0) { M.route(g, v, [[11.2 + i * .6, 43.5 - i * .5], [7, 45.2], [2.35, 48.86]], k, { w: 6, col: '#2a3a8a' }); const [x, y] = M.pt(v, lerp(11.2 + i * .6, 2.35, k), lerp(43.5 - i * .5, 48.86, k)); g.save(); g.translate(x, y); ML.painting(g, -26, -36, 52, 40, i + 2, {}); g.restore(); } } },
    ui: c => { DR.mapWrite(c, v, 12, 43, 'ITALY', lt, .1, { dy: 0, size: 50 }); DR.mapWrite(c, v, 2.35, 48.86, 'PARIS', lt, .1, { dy: -50, size: 40 }); } }; }), 'whip');
  SFX(112, 2, 'stamp', .7);
  C(112, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#3a4a9a'), ui: c => DR.sign(c, 'WELL DOCUMENTED ✓', 640, 360, lt, .1, { size: 64, fill: '#2a8a4a' }) })), 'flash');
  SFX(113, 2, 'boing', .5);
  C(113, null, S((lt, R, t) => ({ cam: [[640, 360, 1.4], [640, 360, 1.5]], bg: (g, t) => MS.tuileries(g, t, {}), act: g => { GX.hand(g, 520, 260, .4, PI * .9, { kind: 'point', sleeve: '#1e2a4a' }); }, ui: c => DR.write(c, 'BUT NOT THIS ONE.', 640, 640, 60, lt, .1) })), 'whip');
  SFX(114, 4, 'stamp', .7); SFX(114, 9, 'stamp', .6);
  C(114, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#c8281e'), act: (g, t) => { K2.tl(g, [[.05, '1503', 'PAINTED IN FLORENCE'], [.4, '1518', 'BOUGHT BY A FRENCH KING'], [.95, '1800', 'NAPOLEON']], clamp(lt / 2.6), { y: 420 }); ML.mona(g, 640, 210, 150, {}); },
    ui: c => { if (lt > R(114, 4)) DR.sign(c, 'ALREADY FRENCH', 640, 620, lt, R(114, 4), { size: 46, fill: '#2a3a8a' }); } })), 'whip');
  SFX(115, 0, 'ding', .7); SFX(115, 0, 'marker', .5);
  C(115, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#f4ead4'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.translate(640, 340); g.rotate(-.04); sh(g, '#fff19a', 4, c => c.rect(-260, -150, 520, 300)); sh(g, 'rgba(240,200,90,.8)', 0, c => c.rect(-70, -170, 140, 40)); g.font = MK(46); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText('NAPOLEON DID NOT', 0, -30); g.fillText('TAKE HER FROM ITALY', 0, 40); g.restore(); },
    ui: c => DR.write(c, 'REMEMBER THAT.', 640, 620, 60, lt, .2, { col: '#c8281e' }) })), 'flash');

  // ---------------- L116–119 1900: not yet ----------------
  mood(116, 'curious'); K2.era(t0(116, 0), 'PARIS', '1900');
  C(116, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 370, 1.06]], bg: (g, t) => MS.salon(g, t, { sepia: .4 }), crowd: DR.army(120, 600, 1160, 712, 8, ['paris1911a', 'paris1911b'], .4, .5, 116, { walk: true, spr: { turn: .7 } }),
    ui: c => { DR.yearTag(c, '1900', lt, .2); DR.write(c, 'A PARIS MUSEUM', 640, 640, 54, lt, R(116, 7)); } })), 'dissolve');
  SFX(117, 12, 'tada', .4);
  C(117, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { ML.mona(g, 640, 340, 280, {}); const k = GX.pop(lt, R(117, 11), .3); if (k > 0) { g.save(); g.translate(640, 150); g.scale(k, k); sh(g, '#f2c43a', 5, c => { c.moveTo(-90, 40); c.lineTo(-100, -40); c.lineTo(-40, 0); c.lineTo(0, -60); c.lineTo(40, 0); c.lineTo(100, -40); c.lineTo(90, 40); c.closePath(); }); g.restore(); } },
    ui: c => DR.write(c, 'MOST FAMOUS PAINTING ON EARTH?', 640, 620, 48, lt, R(117, 8)) })), 'whip');
  SFX(118, 1, 'drop', .7); SFX(118, 1, 'stamp', .6);
  C(118, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { ML.mona(g, 640, 340, 280, {}); const k = clamp(lt / .5); g.save(); g.translate(640, lerp(150, 900, k * k)); g.rotate(k * 2); sh(g, '#f2c43a', 5, c => { c.moveTo(-90, 40); c.lineTo(-100, -40); c.lineTo(-40, 0); c.lineTo(0, -60); c.lineTo(40, 0); c.lineTo(100, -40); c.lineTo(90, 40); c.closePath(); }); g.restore(); },
    ui: c => DR.sign(c, "SHE ISN'T.", 640, 600, lt, .1, { size: 60 }) })), 'whip');
  SFX(119, 1, 'sting', .5);
  C(119, null, S((lt, R, t) => ({ cam: [[640, 360, 1.6], [640, 360, 1.7]], bg: (g, t) => MS.salon(g, t, {}), ui: c => DR.write(c, 'NOT YET.', 640, 620, 80, lt, .1, { col: '#f2d23a' }) })), 'zoom');

  // ---------------- L120–135 the myth + Vasari's eyebrows ----------------
  mood(120, 'curious'); K2.era(t0(120, 0), 'MYTH CHECK', 'BEFORE 1911'); SFX(120, 4, 'card', .6);
  EP.ticket('NOBODY CARED UNTIL SHE WAS STOLEN?', t0(121, 0), t0(124, 0), t0(122, 2), false);
  C(120, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), ui: c => DR.banner(c, 'MYTH CHECK', 640, 360, lt, .1, { size: 70 }) })), 'flash');
  SFX(121, 4, 'crowd', .3, 1.5);
  C(121, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 380, 1.15]], bg: (g, t) => MS.salon(g, t, {}), crowd: DR.army(140, 600, 1140, 712, 10, ['paris1911a', 'paris1911b', 'poet'], .4, .5, 121, { spr: { pose: 'crossed', face: { mouth: 'flat', eyes: 'half' } } }),
    ui: c => { GX.bubble(c, 'MEH.', 300, 200, lt, .5, 360, 400, { size: 36 }); GX.bubble(c, 'ZZZ', 980, 220, lt, 1.1, 900, 400, { size: 36 }); } })), 'whip');
  SFX(122, 2, 'buzz', .6);
  C(122, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), ui: c => DR.sign(c, 'NOT QUITE TRUE', 640, 360, lt, .1, { size: 70, fill: '#e8862a' }) })), 'flash');
  SFX(123, 5, 'sparkle', .5);
  C(123, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MS.salon(g, t, {}), crowd: DR.army(100, 600, 1180, 712, 12, ['poet', 'beroud', 'poet', 'paris1911b'], .4, .5, 123, { spr: { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy' } } }),
    act: (g, t) => { for (let i = 0; i < 8; i++) { const k = (lt * .6 + i / 8) % 1; g.fillStyle = `rgba(232,64,96,${1 - k})`; g.font = MK(40); g.fillText('♥', 300 + (i * 137) % 700, 600 - k * 400); } },
    ui: c => DR.write(c, 'ARTISTS + WRITERS: OBSESSED', 640, 100, 50, lt, .1) })), 'whip');
  SFX(124, 1, 'pencil', .6, 2);
  C(124, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.14]], bg: (g, t) => MS.house(g, t), act: (g, t) => { sh(g, '#5a3a22', 4, c => c.rect(160, 580, 460, 26)); P(g, 'vasari@sit', 380, 580, .6, t, { pose: 'present', turn: .2, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'VASARI, 1550', 900, 140, 52, lt, .1); DR.callout(c, 'SO MUCH DETAIL', 900, 300, lt, R(124, 8), 420, 470, { screen: true }); } })), 'whip');
  mood(125, 'comic');
  SFX(126, 4, 'sparkle', .6); SFX(126, 8, 'pencil', .5, 1.2);
  C(126, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8b860', '#f6d898'), act: (g, t) => { ML.mona(g, 860, 360, 440, { brows: true, frame: 'plain' }); P(g, 'vasari', 300, 760, .66, t, { pose: 'pointSide', turn: .6, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'THE FUNNY PART', 640, 90, 50, lt, -1); DR.callout(c, '"EACH HAIR GROWS OUT OF THE SKIN"', 860, 640, lt, R(126, 5), 860, 260, { screen: true, size: 28 }); } })), 'whip');
  SFX(127, 0, 'whoosh', .6); SFX(128, 3, 'buzz', .7);
  C(127, null, S((lt, R, t) => ({ cam: [[640, 230, 1.0], [640, 220, 3.4], 'inOut'], bg: g => { g.fillStyle = '#2a2420'; g.fillRect(-300, -300, 1900, 1400); ML.mona(g, 640, 360, 560, { frame: 'gold' }); }, ui: c => DR.write(c, 'LOOK AT THE PAINTING.', 640, 640, 56, lt, .1) })), 'zoom');
  C(128, null, S((lt, R, t) => ({ cam: [[640, 220, 3.4], [640, 218, 3.5]], bg: g => { g.fillStyle = '#2a2420'; g.fillRect(-300, -300, 1900, 1400); ML.mona(g, 640, 360, 560, { frame: 'gold' }); },
    ui: c => { const [x1, y1] = DR.toScreen(612, 168), [x2, y2] = DR.toScreen(668, 168); DR.circle(c, x1, y1, 60, 40, lt, .3, { col: '#c8281e' }); DR.circle(c, x2, y2, 60, 40, lt, .5, { col: '#c8281e' }); if (lt > R(128, 4) - .2) DR.sign(c, 'NO EYEBROWS', 640, 620, lt, R(128, 4) - .2, { size: 60 }); } })), 'whip');
  SFX(129, 3, 'stamp', .6);
  C(129, null, S((lt, R, t) => { const v = M.view(6.5, 46, 60); return { bg: g => DR.map(g, t, v), act: (g, t) => { const [fx, fy] = M.pt(v, 11.25, 43.77), [px, py] = M.pt(v, 1, 47.4); ML.mona(g, px, py - 60, 90, {}); P(g, 'vasari', fx, fy + 20, .2, t, { pose: 'shrug', face: { mouth: 'flat' } }); g.setLineDash([12, 10]); g.strokeStyle = '#c8281e'; g.lineWidth = 5; g.beginPath(); g.moveTo(fx, fy - 60); g.lineTo(lerp(fx, px, clamp(lt / 1)), lerp(fy - 60, py - 60, clamp(lt / 1))); g.stroke(); g.setLineDash([]); },
    ui: c => { if (lt > R(129, 3)) DR.sign(c, 'NEVER SAW HER', 640, 620, lt, R(129, 3), { size: 50 }); } }; }), 'whip');
  for (let i = 0; i < 3; i++) SFX(130, 9 + i, 'pop', .4);
  C(130, 4, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a6a5a', '#3a7a6a'), act: (g, t) => { P(g, 'vasari', 1000, 760, .6, t, { pose: 'think', turn: -.6, face: { mouth: 'flat', eyes: 'half' } }); [['salai', 200], ['musician', 420], ['francesco', 640]].forEach(([w, x], i) => P(g, w, x, 760, .5, t + i, { pose: 'pointSide', turn: .6, face: { mouth: 'open' } })); },
    ui: c => { GX.bubble(c, 'SHE HAS BROWS!', 200, 250, lt, .3, 200, 380, { size: 26 }); GX.bubble(c, 'LOVELY HAIR!', 440, 180, lt, .7, 420, 380, { size: 26 }); GX.bubble(c, 'A SMILE!', 660, 250, lt, 1.1, 640, 380, { size: 26 }); } })), 'whip');
  SFX(131, 11, 'sparkle', .5); SFX(131, 17, 'boing', .4);
  C(131, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const side = lt > R(131, 13) ? 1 : 0; ML.mona(g, 400, 360, 380, { brows: true, frame: false }); if (lt > R(131, 10)) { g.save(); g.globalAlpha = clamp((lt - R(131, 10)) / .8); ML.mona(g, 400, 360, 380, { frame: false }); g.restore(); } ML.mona(g, 900, 360, 380, { frame: false }); if (side) { g.save(); g.globalAlpha = .6; label(g, '?', 900, 200, 120, '#f2d23a'); g.restore(); } },
    ui: c => { DR.write(c, 'PAINTED + CLEANED AWAY?', 400, 650, 34, lt, R(131, 5)); if (lt > R(131, 14)) DR.write(c, 'OR ONLY HEARD ABOUT?', 900, 650, 34, lt, R(131, 14), { col: '#f2d23a' }); DR.write(c, 'HISTORIANS STILL ARGUE', 640, 90, 44, lt, .1); } })), 'whip');
  mood(132, 'renaissance'); SFX(132, 9, 'chime', .5); SFX(132, 11, 'boing', .5); AMB(132, 'court', 8, .3);
  C(132, null, S((lt, R, t) => ({ cam: [[640, 400, 1.02], [640, 400, 1.08]], bg: (g, t) => MS.studio(g, t, { easel: {}, ex: 900 }), act: (g, t) => { sh(g, '#6a4a2a', 4, c => c.rect(440, 600, 140, 22)); P(g, 'lisa@sit', 510, 600, .5, t, { pose: 'idle', turn: .3, face: { mouth: lt > R(132, 18) ? 'grin' : 'smile', eyes: 'happy' } });
      if (lt > R(132, 8)) P(g, 'musician', 200, 750, .5, t, { pose: 'present', turn: .5, face: { mouth: 'grin' } }); if (lt > R(132, 10)) { const j = Math.abs(Math.sin(lt * 6)) * 30; P(g, 'jester', 330, 750 - j, .46, t, { pose: 'cheer', turn: .4, face: { mouth: 'grin', eyes: 'happy' } }); }
      P(g, 'leonardo', 720, 760, .55, t, { pose: 'pointSide', turn: .6, face: { mouth: 'smile' } }); for (let i = 0; i < 4; i++) { const k = (lt * .7 + i / 4) % 1; g.fillStyle = `rgba(255,255,255,${1 - k})`; g.font = MK(40); g.fillText('♪', 200 + i * 20, 460 - k * 160); } },
    ui: c => DR.callout(c, 'REPORTEDLY — VASARI, 1550', 640, 100, lt, .3, null, null, { fill: '#fff3c8' }) })), 'whip');
  SFX(133, 0, 'chime', .4);
  C(133, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 400, 1.26]], bg: (g, t) => MS.studio(g, t, { easel: {}, ex: 900 }), act: (g, t) => { P(g, 'lisa@sit', 510, 600, .5, t, { pose: 'idle', turn: .3, face: { mouth: 'grin', eyes: 'happy' } }); }, atm: { warm: .3, glare: [1000, 200, 300] }, ui: c => DR.write(c, 'LOVELY IMAGE.', 640, 640, 56, lt, .1) })), 'dissolve');
  SFX(134, 1, 'card', .5); SFX(134, 4, 'pop', .4);
  C(134, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { K2.tl(g, [[.08, '1503', 'THE SITTINGS'], [.92, '1550', "VASARI'S BOOK"]], clamp(lt / 1.4), { y: 380 }); },
    ui: c => { DR.write(c, 'ONE SOURCE', 640, 110, 60, lt, .1); if (lt > R(134, 3)) DR.write(c, '~50 YEARS LATER', 640, 560, 50, lt, R(134, 3), { col: '#f2d23a' }); } })), 'whip');
  SFX(135, 2, 'stamp', .9);
  C(135, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 400, 1.26]], bg: (g, t) => MS.studio(g, t, { easel: {}, ex: 900 }), act: (g, t) => P(g, 'jester', 330, 750, .46, t, { pose: 'cheer', turn: .4, face: { mouth: 'grin' } }), atm: { dark: .2 }, ui: c => DR.sign(c, 'REPORTEDLY', 640, 330, lt, R(135, 2) - .1, { size: 80, rot: -.1, fill: '#e8862a' }) })), 'flash');

  // ---------------- L136–142 famous among people who already cared ----------------
  mood(136, 'jazz'); K2.era(t0(136, 0), 'THE 1800s', 'FAN CLUB'); SFX(136, 8, 'pencil', .5, 2); SFX(136, 10, 'gasp', .4);
  C(136, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.14]], bg: (g, t) => MS.salon(g, t, {}), act: (g, t) => { P(g, 'poet', 380, 760, .62, t, { pose: 'presentBoth', turn: .5, headTilt: Math.sin(lt * 3) * .15, face: { mouth: 'open', eyes: 'happy', brows: 'up' } }); P(g, 'beroud', 880, 760, .6, t, { pose: 'facepalm', turn: -.4, face: { mouth: 'smile', eyes: 'closed' } }); for (let i = 0; i < 6; i++) { const k = (lt * .5 + i / 6) % 1; g.save(); g.translate(380 + Math.sin(i * 2) * 140, 500 - k * 400); g.rotate(i); sh(g, '#fff', 3, c => c.rect(-30, -20, 60, 40)); g.restore(); } },
    ui: c => { DR.write(c, 'SWOONING ESSAYS', 640, 100, 52, lt, R(136, 8)); DR.callout(c, 'SLIGHTLY UNHINGED', 1000, 220, lt, R(136, 10), null, null, { fill: '#ffe0f0' }); } })), 'whip');
  SFX(137, 4, 'ding', .5);
  C(137, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => ML.mona(g, 640, 340, 300, {}), ui: c => DR.write(c, 'SO YES, SHE WAS FAMOUS…', 640, 620, 50, lt, .1) })), 'whip');
  SFX(138, 8, 'drum', .4);
  C(138, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#1e1a28'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.translate(640, 360); g.rotate(lt * 2); sh(g, '#15100c', 5, c => c.arc(0, 0, 230, 0, TAU)); g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 2; for (let r = 100; r < 225; r += 10) { g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke(); } g.beginPath(); g.arc(0, 0, 90, 0, TAU); g.clip(); ML.mona(g, 0, 0, 200, { frame: false }); g.restore(); },
    ui: c => DR.write(c, 'LIKE A GREAT JAZZ RECORD', 640, 640, 50, lt, R(138, 6) - .3) })), 'whip');
  SFX(139, 3, 'crowd', .3, 1.5);
  C(139, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: g => { g.fillStyle = '#2a2030'; g.fillRect(-300, -300, 1900, 1400); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 300, 400, 'rgba(255,200,120,.2)'); g.restore(); }, crowd: DR.army(300, 600, 980, 712, 9, ['poet', 'beroud', 'paris1911b'], .44, .5, 139, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }),
    ui: c => DR.write(c, 'AMONG PEOPLE WHO ALREADY CARED', 640, 110, 46, lt, .1) })), 'whip');
  mood(140, 'adventure'); SFX(140, 9, 'pop', .5); SFX(140, 14, 'pop', .5); SFX(140, 19, 'pop', .5);
  C(140, null, S((lt, R, t) => { const v = M.view(-40, 15, 3.3); return { bg: g => DR.map(g, t, v), act: (g, t) => { [[-98, 38.5, 'farmer', R(140, 7), 'KANSAS'], [135.5, 34.7, 'worker', R(140, 12), 'OSAKA'], [-58.4, -34.6, 'kidBA', R(140, 17), 'BUENOS AIRES']].forEach(([lo, la, w, tk]) => { if (lt < tk - .2) return; const [x, y] = M.pt(v, lo, la); P(g, w, x, y + 20, .28, t, { pose: 'shrug', face: { mouth: 'flat', eyes: 'half', brows: 'up' } }); }); },
    ui: c => { [[-98, 38.5, R(140, 9), 'KANSAS'], [135.5, 34.7, R(140, 14), 'OSAKA'], [-58.4, -34.6, R(140, 19), 'BUENOS AIRES']].forEach(([lo, la, tk, nm]) => { if (lt > tk - .2) { const [x, y] = M.pt(v, lo, la); GX.bubble(c, 'WHO?', x, y - 200, lt, tk - .1, x, y - 120, { size: 28 }); } }); } }; }), 'whip');
  mood(141, 'heist'); SFX(141, 4, 'sting', .6);
  C(141, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), act: (g, t) => ML.mona(g, 640, 340, 300, {}), ui: c => DR.write(c, 'THAT WAS ABOUT TO CHANGE', 640, 620, 52, lt, .1) })), 'whip');
  SFX(142, 6, 'drum', .6); SFX(142, 10, 'sting', .5);
  C(142, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 360, 1.15]], bg: (g, t) => GX.evil(g, t, lt, { eyes: 9, bg: '#14141c' }), act: (g, t) => { g.save(); g.filter = 'brightness(0.05)'; P(g, 'peruggia', 640, 760, .85, t, { pose: 'hips' }); g.restore(); if (lt > R(142, 9)) { g.save(); g.globalCompositeOperation = 'lighter'; for (const sd of [-1, 1]) T.glow(g, 640 + sd * 26, 368, 16, 'rgba(255,40,30,.9)'); g.restore(); } },
    ui: c => DR.write(c, 'ONE MAN. ONE VERY SIMPLE PLAN.', 640, 110, 48, lt, R(142, 5)) })), 'flash');
})(window);
