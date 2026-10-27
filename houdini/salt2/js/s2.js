/* "It's About Salt" remake — BEAT 4c (122–156: France, the gabelle, the skit, smugglers, 1789–90 · counter 3)
 * + BEAT 4d (157–180: Onondaga, the Erie Canal, the Salt City · counter 4) + BEAT 5 bridge (181–187)
 * + BEAT 6 (188–221: the "salary" myth · MYTH #1 BUSTED · salted Carthage · MYTH #2 BUSTED). */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, K = G.VK, { W, H, clamp, lerp, rng } = T;
  const { sh, ln, circ } = G.Paint, TAU = Math.PI * 2, PI = Math.PI;
  const { C, P, head, SFX, AMB, say } = G, L = G.L, mood = EP.mood;
  const GRANDE = [[-1.5, 50.5], [2.5, 51.2], [4.5, 50.2], [5.2, 48.6], [4.6, 46.8], [3.2, 46.2], [1.4, 46.1], [0, 46.6], [-1.2, 47.2], [-1.6, 48.4], [-1.8, 49.6]];
  const PETITE = [[4.6, 46.8], [6.2, 46.2], [7.6, 44.2], [6.6, 43.1], [4.6, 43.3], [3.2, 43.2], [2.4, 44.2], [3.2, 46.2]];
  const BRIT = [[-4.8, 48.6], [-3.2, 48.9], [-1.6, 48.4], [-1.2, 47.2], [-2.6, 47.2], [-4.4, 47.8]];
  G.CW.duke = { outfit: 'georgian', hat: 'periwig', look: { skin: '#f6dcc4', hairCol: '#e9e6de', width: 1.3 } };
  G.CW.priest = { outfit: 'frockBlack', hat: 'none', look: { skin: '#f2cfae', hair: 'bald', hairCol: '#8a7a6a' } };
  G.CW.digger = { outfit: 'peasantFR', hat: 'flatCap', look: { skin: '#eec4a2', hairCol: '#5a3a22', beard: 'stubble', beardCol: '#5a3a22' } };
  const fr = (g, t) => TS.grenier(g, t);
  function galley(g, x, y, s, t) { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#5a3a22', 5, c => { c.moveTo(-300, -40); c.lineTo(300, -40); c.quadraticCurveTo(340, -40, 360, -90); c.lineTo(320, 30); c.lineTo(-300, 30); c.closePath(); });
    for (let i = 0; i < 9; i++) { const a = Math.sin(t * 3 + i * .2) * .4; g.save(); g.translate(-240 + i * 60, 0); g.rotate(.5 + a); ln(g, [[0, 0], [0, 160]], 6, '#8a6a3a'); g.restore(); } ln(g, [[0, -40], [0, -330]], 10, '#5a3a22'); sh(g, '#e8dcc0', 4, c => { c.moveTo(-160, -320); c.lineTo(160, -320); c.lineTo(140, -120); c.lineTo(-140, -120); c.closePath(); }); g.restore(); }
  function cahier(g, x, y, s, k) { g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-.03); sh(g, '#f2e8d0', 4, c => c.rect(-210, -270, 420, 540)); g.font = DR.MK(30); g.fillStyle = '#2a1a10'; g.textAlign = 'center'; g.fillText('CAHIER DE DOLÉANCES', 0, -220); g.font = '700 18px serif'; g.fillText('— 1789 —', 0, -190);
    for (let i = 0; i < 9; i++) { g.fillStyle = 'rgba(40,30,20,.45)'; g.fillRect(-170, -150 + i * 40, 300 + (i % 3) * 20, 6); } if (k > 0) { g.font = DR.MK(36); g.fillStyle = '#8a1e18'; g.fillText('la GABELLE !', 0, 30); } g.restore(); }
  function books(g, rows) { g.fillStyle = '#4a3020'; g.fillRect(-200, -200, 1700, 1100); const r = rng(rows * 7); const COL = ['#7a3a2a', '#2a4a6a', '#5a6a3a', '#8a6a2a', '#5a2a4a', '#3a5a5a', '#9a4a2a'];
    for (let row = 0; row < rows; row++) { const y0 = 40 + row * 170; sh(g, '#6a4428', 4, c => c.rect(-60, y0 + 150, 1400, 20)); let x = -40; while (x < 1320) { const w = 22 + r() * 22, h = 110 + r() * 36, lean = r() < .08 ? .2 : 0; g.save(); g.translate(x, y0 + 150); g.rotate(lean); sh(g, COL[Math.floor(r() * COL.length)], 2.5, c => c.rect(0, -h, w, h)); g.fillStyle = 'rgba(232,200,120,.7)'; g.fillRect(4, -h + 16, w - 8, 4); g.fillRect(4, -26, w - 8, 4); g.restore(); x += w + 2 + (lean ? 20 : 0); } } }
  function saltCity(g, t) { for (let i = 0; i < 9; i++) { const x = 60 + i * 140, h = 80 + (i * 37) % 70; sh(g, ['#a87a4a', '#9a5a3a', '#b88a5a'][i % 3], 3.5, c => c.rect(x, 600 - h, 120, h)); sh(g, '#5a4a3a', 3, c => { c.moveTo(x - 8, 600 - h); c.lineTo(x + 60, 560 - h); c.lineTo(x + 128, 600 - h); c.closePath(); }); sh(g, '#8a7a6a', 3, c => c.rect(x + 90, 520 - h, 18, 50)); TS.steam(g, t + i, x + 99, 520 - h, 30, .5); }
    TS.saltHeap(g, 640, 640, 760, 120); }
  function wagon(g, x, y, s, t) { PR.cart(g, x, y, s, 'sacks'); }
  const nyMap = () => M.view(-75.9, 42.95, 110);
  const canalPts = [[-73.75, 42.65], [-74.4, 42.95], [-75.2, 43.1], [-76.15, 43.05], [-77.0, 43.08], [-77.6, 43.15], [-78.3, 43.1], [-78.88, 42.9]];

  // ===================== BEAT 4c — France =====================
  mood(122, 'busy'); SFX(122, null, 'whoosh', .6); SFX(122, null, 'paper', .4);
  C(122, null, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, 6, 47, 14], [1.4, 2.4, 46.6, 40]]); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), ui: c => DR.mapWrite(c, v, 2.4, 46.8, 'FRANCE', lt, .4, { dy: 0, size: 72 }) }); }, 'whip');
  SFX(123, 3, 'stamp', .7); AMB(123, 'court', 4, .5);
  C(123, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => { TS.court(g, t); }, crowd: DR.army(100, 620, 1180, 710, 14, ['duke', 'noble', 'priest'], .4, .48, 91, { spr: { pose: 'bow' } }), act: (g, t) => P(g, 'taxman', 640, 560, .45, t, { pose: 'present' }),
    ui: c => { DR.write(c, '1360', 640, 130, 80, lt, .1, { col: '#c8281e', underline: '#c8281e' }); if (lt > R(123, 9)) DR.callout(c, 'LA GABELLE: PERMANENT', 640, 640, lt, R(123, 9), null, null, { size: 30 }); } }), 'whip');
  SFX(124, 3, 'pop', .5);
  C(124, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: g => DR.sunburst(g, t, '#2a3e8a', '#5a7ac8'), act: (g, t) => { TS.sack(g, 640, 600, 2.4, '#e8dcbc', 'SEL'); },
    ui: c => { DR.write(c, '1400s', 640, 120, 60, lt, .05, { col: '#fff', halo: '#1e1612' }); DR.banner(c, 'GABELLE = THE SALT TAX', 640, 660, lt, R(125) - .4, { size: 40 }); } }), 'flash');
  mood(126, 'comic');
  SFX(126, null, 'sting', .5);
  C(126, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.35]], dof: 7, bg: fr, act: (g, t) => head(g, 'taxman', 640, 270, 1.0, t, { face: { mouth: 'grin', brows: 'sly', eyes: 'half' } }), atm: { dark: .3 }, ui: c => DR.callout(c, "HERE'S HOW BAD IT GOT", 980, 160, lt, .2) }));
  C(127, null, (ctx, lt, dur, t, R) => { const v = M.view(1.6, 46.8, 78); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, GRANDE, '#8a2a22', .5 * clamp(lt / .5)); }, ui: c => DR.mapWrite(c, v, 2.2, 48.2, 'THE BIG GABELLE', lt, .3, { dy: 0, size: 48, col: '#fff' }) }); });
  SFX(128, 6, 'coins', .6); AMB(128, 'crowd', 6, .5);
  C(128, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.05], [600, 430, 1.12]], bg: fr, crowd: DR.army(60, 600, 540, 720, 14, ['peasant', 'digger', 'smuggler'], .44, .56, 101, { spr: { turn: .7, face: { mouth: 'frown', brows: 'worried' } } }),
    act: (g, t) => P(g, 'taxman', 760, 600, .6, t, { pose: 'present', face: { mouth: 'grin', brows: 'sly' } }), ui: c => DR.sign(c, 'BUY YOUR SALT\n(A SET AMOUNT)', 980, 170, lt, .3) }), 'whip');
  SFX(129, 3, 'buzz', .4);
  C(129, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.35]], dof: 7, bg: fr, act: (g, t) => head(g, 'peasant', 640, 270, 1.0, t, { prop: 'saltSack', face: { mouth: 'frown', brows: 'worried', eyes: 'half' } }), ui: c => DR.callout(c, 'NEED IT OR NOT', 980, 160, lt, .2) }));
  C(130, null, (ctx, lt, dur, t, R) => { const v = M.view(1.6, 46.8, 78); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, GRANDE, '#8a2a22', .5); M.zone(g, v, PETITE, '#d88a3a', .45 * clamp(lt / .4)); M.zone(g, v, BRIT, '#f4f2ea', .8 * clamp(lt / .4)); },
    ui: c => DR.callout(c, 'WILDLY DIFFERENT RATES', 640, 640, lt, .3) }); });
  SFX(131, 2, 'ding', .4);
  C(131, null, (ctx, lt, dur, t, R) => { const v = M.view(-2.6, 48.1, 160); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, BRIT, '#e8f4d8', .9); }, act: () => DR.mapPin(ctx, v, -2.8, 48.1, lt, .1), ui: c => { DR.mapWrite(c, v, -2.8, 48.1, 'BRITTANY', lt, .1, { dy: 70, size: 54 }); DR.callout(c, 'PAID ≈ NOTHING', 980, 600, lt, .7, null, null, { fill: '#e2f4d8' }); } }); }, 'whip');
  SFX(132, 2, 'cash', .5);
  C(132, null, (ctx, lt, dur, t, R) => { const v = M.view(2.35, 48.86, 160); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, GRANDE, '#8a2a22', .55); }, act: () => DR.mapPin(ctx, v, 2.35, 48.86, lt, .1), ui: c => { DR.mapWrite(c, v, 2.35, 48.86, 'PARIS', lt, .1, { dy: 70, size: 54, col: '#fff' }); DR.callout(c, 'PAID A FORTUNE', 980, 600, lt, .6, null, null, { fill: '#ffd8d0' }); } }); }, 'whip');
  SFX(133, null, 'whoosh', .4);
  C(133, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[900, 420, 1.3], [940, 420, 1.4]], dof: 2, bg: fr, crowd: (t2, l2) => [['duke', lerp(1300, 1080, clamp(l2 / 1.5)), 610, .55, { walk: l2 < 1.5, spr: { turn: -.7, face: { mouth: 'smirk', eyes: 'half' } } }], ['priest', lerp(1380, 1170, clamp(l2 / 1.5)), 620, .55, { walk: l2 < 1.5, spr: { turn: -.7, face: { mouth: 'smirk', eyes: 'half' } } }]],
    ui: c => DR.callout(c, 'NOBILITY + CLERGY', 600, 150, lt, .3) }));
  SFX(134, null, 'tada', .5);
  C(134, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[1110, 380, 2.0], [1110, 380, 2.1]], dof: 5, bg: fr, act: (g, t) => { P(g, 'duke', 1080, 760, .8, t, { pose: 'thumbsUp', turn: -.2, face: { mouth: 'grin', eyes: 'happy' } }); }, ui: c => { G.UI.sign(c, 'EXEMPT', 640, 200, 70, { k: G.FX.settle(clamp(lt / .25)), fill: '#2a8a52', rot: -.08 }); } }), 'flash');
  // ---------- the skit: peasant + tax collector ----------
  mood(135, 'comic'); AMB(135, 'street', 13, .4);
  const two = (pTalk, pFace, tcFace, pPose, tcPose) => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.25], [640, 400, 1.3]], dof: 2, bg: fr,
    act: (g, t) => { P(g, 'peasant', 420, 760, .85, t, { pose: pPose || 'present', turn: .35, vis: pTalk ? say(t) : null, face: pFace }); P(g, 'taxman', 860, 760, .85, t, { pose: tcPose || 'hips', turn: -.35, vis: !pTalk ? say(t) : null, face: tcFace }); } });
  const cu = (who, face, talk = true, o = {}) => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.3], [640, 296, 2.4]], dof: 7, bg: fr, act: (g, t) => head(g, who, 640, 270, 1.0, t, { vis: talk ? say(t) : null, turn: o.turn || 0, face }), atm: o.atm, ui: o.ui });
  C(135, null, two(true, { mouth: 'grit', brows: 'worried', look: [.7, 0] }, { mouth: 'grin', brows: 'sly', eyes: 'happy', look: [-.6, 0] }));
  C(136, null, cu('taxman', { mouth: 'grin', eyes: 'happy', brows: 'sly' }, true, { turn: -.3 }));
  C(137, null, cu('peasant', { mouth: 'grit', brows: 'worried', eyes: 'open', sweat: true }, true, { turn: .3 }));
  SFX(137, 3, 'clink', .4);
  C(137, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[1080, 380, 1.8], [1080, 380, 1.9]], dof: 4, bg: fr, act: (g, t) => P(g, 'duke', 1080, 760, .8, t, { pose: 'crossed', turn: -.3, face: { mouth: 'smirk', eyes: 'half' } }), ui: c => DR.callout(c, 'THE DUKE', 600, 160, lt, .05, 1080, 300) }), 'whip');
  C(138, null, cu('taxman', { mouth: 'flat', eyes: 'half', brows: 'neutral' }, true, { turn: -.3, ui: c => DR.callout(c, '"VERY BUSY"', 980, 160, 1, 0) }));
  C(139, null, two(true, { mouth: 'grit', brows: 'angry', look: [.7, 0] }, { mouth: 'smirk', brows: 'sly', eyes: 'half', look: [-.6, 0] }, 'presentBoth'));
  SFX(141, null, 'stamp', .7);
  C(141, null, cu('peasant', { mouth: 'o', eyes: 'wide', brows: 'worried', sweat: true }, true, { turn: .3, atm: { dark: .3 } }));
  SFX(142, 2, 'tada', .5);
  C(142, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[860, 380, 2.0], [860, 380, 2.1]], dof: 5, bg: fr, act: (g, t) => P(g, 'taxman', 860, 760, .85, t, { pose: 'thumbsUp', turn: -.3, vis: say(t), face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }), ui: c => DR.exclaim(c, 1000, 150, 1, 0, { ch: '★', col: '#e8a830' }) }));
  // ---------- smuggling ----------
  mood(143, 'danger'); AMB(143, 'night', 12, .7);
  C(143, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 480, 1.0], [720, 480, 1.05]], bg: (g, t) => TS.border(g, t), crowd: (t2, l2) => DR.army(200 + l2 * 80, 540, 760 + l2 * 80, 640, 9, ['smuggler'], .36, .46, 111, { walk: true, spr: { turn: .8 } }), atm: { night: .2 },
    ui: c => DR.banner(c, 'SMUGGLING EXPLODED', 640, 130, lt, R(143, 2) - .2, { col: '#3a3a5a' }) }), 'ink');
  SFX(144, null, 'footsteps', .6, 2.5);
  C(144, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 560, 2.4], [700, 560, 2.5]], dof: 4, bg: (g, t) => TS.border(g, t), act: (g, t) => { for (let i = 0; i < 3; i++) { const x = 480 + i * 90 + lt * 60; P(g, 'smuggler', x, 640, .35, t + i, { walk: t * 7, turn: .8, prop: 'saltSack' }); } }, atm: { night: .25 },
    ui: c => DR.callout(c, 'ACROSS PROVINCIAL BORDERS', 640, 140, lt, .2, 760, 540) }));
  SFX(145, 4, 'gallop', .7, 3); SFX(145, 4, 'sting', .5);
  C(145, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 1.0], [600, 470, 1.04]], bg: (g, t) => TS.border(g, t), crowd: (t2, l2) => DR.army(-200 + l2 * 160, 560, 300 + l2 * 160, 680, 10, ['taxman'], .36, .46, 121, { walk: true, spr: { turn: .8, face: { mouth: 'grit', brows: 'angry' } } }),
    bgAct: (g, t) => { for (let i = 0; i < 4; i++) FA.horse(g, -100 + lt * 200 + i * 110, 600 + (i % 2) * 30, .5, t + i, { dir: 1, coat: '#3a2a1e' }); }, atm: { night: .2 },
    ui: c => { if (lt > R(145, 7)) DR.callout(c, 'THE SALT POLICE', 900, 150, lt, R(145, 7)); } }), 'whip');
  SFX(146, 3, 'drum', .5); SFX(146, 9, 'sting', .5);
  C(146, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => { g.fillStyle = '#6a9ab8'; g.fillRect(-200, -200, 1700, 1100); g.fillStyle = '#4a7a9a'; g.fillRect(-200, 470, 1700, 400); }, act: (g, t) => galley(g, 640, 480 + Math.sin(t * 1.4) * 6, 1.1, t),
    ui: c => { DR.callout(c, 'CONVICTED → THE GALLEYS', 640, 120, lt, .2); if (lt > R(146, 9)) G.UI.sign(c, 'REPEAT → EXECUTED', 640, 620, 44, { k: G.FX.settle(clamp((lt - R(146, 9)) / .3)) }); } }), 'whip');
  mood(147, 'rising'); SFX(147, null, 'paper', .6);
  C(147, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => TS.court(g, t), crowd: DR.army(80, 580, 1200, 700, 30, ['peasant', 'digger', 'duke', 'priest'], .34, .44, 131, { spr: { pose: 'pointUp' } }), atm: { warm: .2 },
    ui: c => { DR.write(c, '1789', 640, 120, 90, lt, .1, { col: '#c8281e', underline: '#c8281e' }); if (lt > R(147, 9)) DR.callout(c, 'THE ESTATES-GENERAL', 640, 230, lt, R(147, 9)); } }), 'ink');
  SFX(148, 2, 'marker', .6);
  C(148, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 400, 1.12]], bg: g => { g.fillStyle = '#5a3a22'; g.fillRect(-200, -200, 1700, 1100); }, act: (g, t) => cahier(g, 640, 380, 1.0, lt > .3 ? 1 : 0), ui: c => { if (lt > .5) DR.circle(c, 640, 410, 170, 50, lt, .5, { col: '#e0261c' }); } }));
  SFX(149, 3, 'gong', .5); SFX(150, 7, 'stamp', .8);
  C(149, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: fr, crowd: DR.army(60, 560, 1220, 720, 30, ['peasant', 'digger', 'smuggler'], .4, .54, 141, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }), act: (g, t) => { if (lt > R(150, 7)) { const k = clamp((lt - R(150, 7)) / .4); g.save(); g.translate(640, 470); g.rotate(-k * .4); g.globalAlpha = 1 - k; TS.sack(g, 0, 120, 1.4, '#e8dcbc', 'GABELLE'); g.restore(); } },
    ui: c => { DR.write(c, 'MARCH 1790', 640, 120, 60, lt, .1, { col: '#fff', halo: '#1e1612' }); if (lt > R(150, 7)) G.UI.sign(c, 'ABOLISHED', 640, 260, 76, { k: G.FX.settle(clamp((lt - R(150, 7)) / .25)), fill: '#2a8a52' }); } }), 'whip');
  mood(151, 'curious');
  C(151, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.2], [640, 400, 1.26]], dof: 2, bg: (g, t) => TS.court(g, t), act: (g, t) => { P(g, 'cowie', 420, 760, .82, t, { outfit: 'frockBrown', hat: 'none', pose: 'pointUp', face: { mouth: 'grit', brows: 'angry' } }); P(g, 'pliny', 860, 760, .82, t, { outfit: 'frockGrey', hat: 'none', pose: 'crossed', turn: -.3, face: { mouth: 'frown', brows: 'skeptic' } }); },
    ui: c => DR.callout(c, 'HISTORIANS ARGUE', 640, 130, lt, .2) }), 'whip');
  SFX(152, null, 'card', .5); SFX(152, 3, 'card', .5); SFX(153, null, 'card', .5); SFX(154, null, 'card', .6);
  C(152, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.03]], bg: g => { g.fillStyle = '#2a2a48'; g.fillRect(-200, -200, 1700, 1100); },
    ui: c => DR.mystery(c, [{ who: 'peasant', name: 'BREAD PRICES' }, { who: 'duke', name: 'DEBT' }, { who: 'noble', name: 'STUCK MONARCHY' }, { who: 'taxman', name: 'THE SALT TAX' }], 640, 360, lt, .05, [.4, R(152, 3), R(153) + .4, R(154) + .3], { w: 210 }) }));
  C(154, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[600, 430, 1.4], [600, 430, 1.5]], dof: 3, bg: (g, t) => TS.larder(g, t), act: (g, t) => { P(g, 'peasant', 520, 760, .85, t, { pose: 'shrug', prop: 'none', face: { mouth: 'frown', brows: 'worried' } }); EP.shaker(g, 760, 472, .55, t, { turn: 1, face: 'smug' }); }, atm: { warm: .2 }, ui: c => DR.callout(c, 'FELT AT THE DINNER TABLE', 640, 130, lt, .1) }));
  mood(155, 'busy'); EP.count(3, 155, .2);
  C(155, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.05]], bg: fr, act: (g, t) => { P(g, 'peasant', 240, 760, .85, t, { pose: 'cheer', turn: .3, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); P(g, 'taxman', 1040, 760, .85, t, { pose: 'shrug', turn: -.3, face: { mouth: 'frown', brows: 'worried', sweat: true } }); },
    ui: c => EP.refrainSalt(c, lt, .1, { y: 120, gap: R(156) - .1 }) }));

  // ===================== BEAT 4d — America: the ditch that salt built =====================
  mood(157, 'rising'); SFX(157, null, 'whoosh', .6);
  C(157, null, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, -82, 41, 14], [2.0, -76.2, 43.05, 60]]); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), ui: c => DR.mapWrite(c, v, -75.2, 43.4, 'NEW YORK', lt, .6, { dy: -20, size: 64, date: 'THE STORY FLIPS' }) }); }, 'ink');
  C(158, null, (ctx, lt, dur, t, R) => { const v = M.view(-76.6, 43.3, 160); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v, { extraLakes: [[-76.2, 43.09, .06, .025]] }), act: () => DR.mapPin(ctx, v, -76.2, 43.08, lt, .2),
    ui: c => { DR.mapWrite(c, v, -76.2, 43.08, 'ONONDAGA LAKE', lt, R(158, 6), { dy: 80, size: 46 }); if (lt > R(158, 14)) DR.callout(c, 'HOMELAND OF THE ONONDAGA NATION', 640, 640, lt, R(158, 14), null, null, { size: 26 }); } }); });
  SFX(159, null, 'splash', .4); AMB(159, 'lake', 7, .5);
  C(159, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: -1 }), act: (g, t) => { for (let i = 0; i < 5; i++) { const x = 300 + i * 160; sh(g, '#6aa6cc', 3, c => c.ellipse(x, 620, 60, 14, 0, 0, TAU)); TS.steam(g, t + i, x, 610, 60, .5); } },
    ui: c => { DR.callout(c, 'SALT SPRINGS', 640, 140, lt, .1, 620, 610); if (lt > R(160)) DR.callout(c, 'STATE SALT RESERVATION', 640, 230, lt, R(160)); } }), 'whip');
  SFX(160, 9, 'coins', .5);
  C(160, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.3], [640, 420, 1.36]], dof: 3, bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: -1 }), act: (g, t) => { P(g, 'jefferson', 460, 760, .82, t, { outfit: 'frockBrown', pose: 'present', prop: 'scroll', face: { mouth: 'smile' } }); P(g, 'digger', 840, 760, .82, t, { pose: 'present', prop: 'coins', turn: -.3, face: { mouth: 'grin' } }); }, ui: c => DR.callout(c, 'LEASED OUT', 640, 140, lt, .1) }));
  SFX(161, 3, 'ding', .5);
  C(161, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.1], [640, 300, 2.25]], dof: 7, bg: (g, t) => TS.canal(g, t, { v: 'canal', boat: -1 }), act: (g, t) => head(g, 'digger', 640, 270, 1.0, t, { outfit: 'frockGrey', hat: 'topHat', face: { mouth: 'grin', eyes: 'wide', brows: 'up' } }), ui: c => DR.exclaim(c, 840, 140, 1, 0, { ch: '!' }) }));
  SFX(162, null, 'pencil', .6, 2.5);
  C(162, null, (ctx, lt, dur, t, R) => { const v = nyMap(); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { M.route(g, v, canalPts, clamp((lt - .2) / 2.6), { w: 10, dash: [22, 12], col: '#2a5aa8' }); DR.mapPin(g, v, -73.75, 42.65, lt, .1); if (lt > 2.7) DR.mapPin(g, v, -78.88, 42.9, lt, 2.7); },
    ui: c => { DR.mapWrite(c, v, -73.75, 42.65, 'HUDSON', lt, .2, { dy: 60, size: 40 }); if (lt > 2.6) DR.mapWrite(c, v, -78.88, 42.9, 'LAKE ERIE', lt, 2.6, { dy: 60, size: 40 }); DR.tally(c, '363', g => { g.fillStyle = '#2a5aa8'; g.fillRect(-8, -3, 16, 6); }, 640, 120, lt, .6, { n: 12, label: '363 miles' }); } }); });
  SFX(163, null, 'tada', .6);
  C(163, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.05]], bg: (g, t) => TS.canal(g, t, { dig: true, boat: -1 }), crowd: DR.army(100, 640, 1180, 720, 16, ['digger', 'peasant'], .5, .6, 151, { spr: { pose: 'cheer' } }), ui: c => DR.banner(c, 'THE ERIE CANAL', 640, 130, lt, .1, { col: '#2a5aa8' }) }), 'flash');
  SFX(164, 4, 'boing', .4);
  C(164, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.court(g, t), act: (g, t) => head(g, 'jefferson', 640, 270, 1.0, t, { pose: 'shrug', face: { mouth: 'smirk', brows: 'skeptic', eyes: 'half' } }),
    ui: c => { DR.callout(c, 'THOMAS JEFFERSON', 300, 160, lt, .1); if (lt > R(164, 5)) G.UI.sign(c, 'RIDICULOUS', 960, 420, 54, { k: G.FX.settle(clamp((lt - R(164, 5)) / .3)) }); } }), 'whip');
  C(165, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 520, 2.0], [640, 520, 2.2]], dof: 5, bg: (g, t) => TS.canal(g, t, { boat: -1 }), act: (g, t) => { const r = rng(2); for (let i = 0; i < 3; i++) sh(g, '#e8c45a', 2.5, c => c.ellipse(600 + i * 30, 600, 16, 6, 0, 0, TAU)); P(g, 'digger', 640, 860, .9, t, { outfit: 'frockGrey', hat: 'topHat', pose: 'shrug', face: { mouth: 'frown', brows: 'worried' } }); },
    ui: c => DR.callout(c, 'HOW TO PAY FOR IT?', 640, 140, lt, .1) }));
  SFX(166, 9, 'cash', .5);
  C(166, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.1], [640, 420, 1.16]], bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: -1 }), act: (g, t) => { for (let i = 0; i < 6; i++) PR.barrel(g, 330 + i * 110, 690, 1.2); for (let i = 0; i < 6; i++) { const u = (lt * .8 + i / 6) % 1; if (lt > R(166, 9)) sh(g, '#e8c45a', 2.5, c => c.ellipse(lerp(600, 1100, u), 560 - Math.sin(u * PI) * 120, 16, 7, 0, 0, TAU)); } },
    ui: c => { DR.write(c, '1816', 640, 120, 80, lt, .2, { col: '#c8281e', underline: '#c8281e' }); if (lt > R(166, 9)) DR.callout(c, 'A DUTY ON EVERY BUSHEL', 400, 260, lt, R(166, 9), 440, 640); if (lt > R(166, 16)) DR.callout(c, '→ CANAL FUND', 1020, 300, lt, R(166, 16), null, null, { fill: '#fff3c8' }); } }));
  SFX(167, null, 'swish', .4);
  C(167, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: -1 }), act: (g, t) => head(g, 'digger', 640, 270, 1.0, t, { face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }), ui: c => DR.callout(c, 'SALT MAKERS: FINE WITH IT', 640, 600, lt, R(168) - .2, null, null, { fill: '#e2f4d8' }) }));
  SFX(169, 4, 'tada', .5); AMB(169, 'birds', 6, .5);
  C(169, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[300, 480, 1.25], [980, 480, 1.25]], bg: (g, t) => TS.canal(g, t, { boat: .2 + lt * .07 }), crowd: DR.army(-100, 620, 1400, 720, 14, ['digger', 'peasant'], .5, .6, 161, { spr: { pose: 'cheer' } }), ui: c => DR.write(c, 'OPENED 1825', 640, 130, 60, lt, R(169, 4), { col: '#fff', halo: '#1e1612' }) }), 'whip');
  C(170, null, (ctx, lt, dur, t, R) => { const v = M.view(-86, 40, 14); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { for (const [lo, la] of [[-87.6, 41.9], [-90.2, 38.6], [-83, 42.3], [-84.5, 39.1], [-80, 40.4], [-93.3, 45]]) M.route(g, v, [[-76.15, 43.05], [-78.88, 42.9], [lo, la]], clamp((lt - .2) / 1.6), { w: 5, col: '#c8281e' }); DR.mapPin(g, v, -76.15, 43.05, lt, .05); },
    ui: c => DR.callout(c, 'SHIP SALT CHEAP', 640, 120, lt, .4) }); });
  SFX(171, null, 'whoosh', .4); AMB(171, 'factory', 6, .5);
  C(171, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 380, 1.08]], bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: .5 }), crowd: DR.army(100, 640, 1180, 720, 12, ['digger'], .5, .6, 171, { walk: true, spr: { prop: 'saltSack', turn: .7 } }), atm: { haze: .15 } }));
  SFX(172, null, 'tada', .6);
  C(172, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => { DR.sunburst(g, t, '#2a5aa8', '#6a9ad8'); saltCity(g, t); }, crowd: DR.army(60, 640, 1220, 720, 22, ['digger', 'peasant', 'jefferson'], .44, .54, 232, { spr: { pose: 'cheer', outfit: 'peasantFR' } }), ui: c => DR.banner(c, 'THE SALT CITY', 640, 130, lt, .05, { col: '#2a5aa8', size: 48 }) }), 'flash');
  SFX(173, 4, 'pop', .5);
  C(173, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => { DR.sunburst(g, t, '#2a5aa8', '#6a9ad8'); saltCity(g, t); }, crowd: DR.army(60, 640, 1220, 720, 22, ['digger', 'peasant', 'jefferson'], .44, .54, 233, { spr: { pose: 'cheer', outfit: 'peasantFR' } }), ui: c => { DR.banner(c, 'THE SALT CITY', 640, 130, 9, 0, { col: '#2a5aa8', size: 48 }); DR.write(c, '= SYRACUSE, NY', 640, 260, 70, lt, .3, { col: '#fff', halo: '#1e1612' }); } }));
  C(174, null, (ctx, lt, dur, t, R) => { const v = M.view(-96, 39, 9.5); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); }, act: () => DR.mapPin(ctx, v, -76.15, 43.05, lt, .1),
    ui: c => { DR.write(c, 'BY THE 1870s', 640, 110, 56, lt, .1, { col: '#c8281e' }); if (lt > R(175, 4)) DR.tally(c, '≈ 90%', g => { g.fillStyle = '#fff'; g.strokeStyle = '#1e1612'; g.lineWidth = 2; g.fillRect(-9, -9, 18, 18); g.strokeRect(-9, -9, 18, 18); }, 640, 600, lt, R(175, 4), { n: 9, label: '≈ 90% of US salt' }); } }); }, 'whip');
  mood(176, 'rising');
  C(176, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 480, 1.0], [700, 480, 1.04]], bg: (g, t) => TS.canal(g, t, { boat: .3 + lt * .05, dig: true }), ui: c => { DR.callout(c, 'NOT JUST TAXED…', 640, 130, lt, .2); if (lt > R(177)) DR.callout(c, 'IT BUILT THE DITCH', 640, 220, lt, R(177), null, null, { fill: '#fff3c8' }); } }));
  SFX(178, 3, 'cash', .5);
  C(178, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: .6 }), crowd: DR.army(100, 620, 1180, 720, 16, ['digger', 'jefferson'], .5, .6, 181, { spr: { pose: 'cheer', outfit: 'frockBrown' } }), act: (g, t) => { for (let i = 0; i < 16; i++) { const u = (lt * .7 + i / 16) % 1; sh(g, '#e8c45a', 2.5, c => c.ellipse(80 + (i * 77) % 1120, -40 + u * 760, 14, 6, u * 6, 0, TAU)); } },
    ui: c => DR.banner(c, 'NEW YORK GOT RICH', 640, 130, lt, .1, { col: '#2a8a52' }) }));
  mood(179, 'busy'); EP.count(4, 179, .2);
  C(179, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.05]], bg: (g, t) => TS.canal(g, t, { v: 'salt', boat: .5 }), act: (g, t) => { P(g, 'digger', 250, 760, .85, t, { pose: 'cheer', turn: .3, face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'jefferson', 1040, 760, .85, t, { pose: 'shrug', turn: -.3, face: { mouth: 'smirk', brows: 'skeptic' } }); },
    ui: c => EP.refrainSalt(c, lt, .1, { y: 120, gap: R(180) - .1 }) }));

  // ===================== BEAT 5 — the bridge =====================
  mood(181, 'comic'); SFX(181, null, 'whoosh', .5);
  C(181, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 380, 2.0], [610, 380, 2.1]], dof: 5, bg: (g, t) => TS.kitchen(g, t, { shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'happy', talk: Math.abs(Math.sin(t * 9)) * .5 }), ui: c => DR.callout(c, 'NOW, WHERE WERE WE?', 980, 140, lt, .1) }), 'ink');
  SFX(183, null, 'card', .6); SFX(184, null, 'card', .6); SFX(185, null, 'card', .6);
  C(183, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#2a2a48'; g.fillRect(-200, -200, 1700, 1100); },
    ui: c => DR.mystery(c, [{ who: 'wudi', name: 'CHINA → WAR' }, { who: 'peasant', name: 'FRANCE → REVOLT' }, { who: 'digger', name: 'NY → A CANAL' }], 640, 370, lt, .05, [.25, R(184), R(185)], { w: 230 }) }));
  mood(186, 'danger'); SFX(186, null, 'march', .6, 3); SFX(187, null, 'sting', .7);
  C(186, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 450, 1.0], [640, 450, 1.08]], bg: (g, t) => TS.saltville(g, t, { v: 'dusk' }), crowd: (t2, l2) => DR.army(-100 + l2 * 50, 560, 1200 + l2 * 50, 700, 50, ['confed', 'confed', 'uscav'], .26, .36, 191, { walk: true, spr: { turn: .7 } }), atm: { dust: 50, warm: .2 } }), 'whip');
  C(187, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 450, 1.3], [640, 450, 1.6]], bg: (g, t) => TS.saltville(g, t, { v: 'dusk' }), act: (g, t) => { const k = clamp(lt / .8); g.save(); g.globalAlpha = 1 - k; TS.saltHeap(g, 640, 640, 300, 120); g.restore(); }, atm: { dark: clamp(lt / .8) * .45 },
    ui: c => DR.write(c, 'WHAT IF YOU TAKE IT AWAY?', 640, 140, 54, lt, .1, { col: '#fff', halo: '#1e1612' }) }));

  // ===================== BEAT 6 — the twist: that "salary" thing =====================
  mood(188, 'curious'); SFX(188, null, 'creak', .4); SFX(188, 2, 'paper', .6);
  C(188, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 380, 1.1]], bg: g => { g.fillStyle = '#5a3a22'; g.fillRect(-200, -200, 1700, 1100); sh(g, '#7a5232', 5, c => c.rect(340, 380, 600, 300)); sh(g, '#8a6038', 4, c => c.rect(360, 400, 560, 120)); },
    act: (g, t) => { const k = clamp((lt - .4) / .8), y = lerp(470, 280, k), sc = lerp(.5, 1, k); g.save(); g.translate(640, y); g.scale(sc, sc); sh(g, '#fff19a', 4, c => c.rect(-260, -80, 520, 160)); g.font = '700 26px Fredoka'; g.fillStyle = '#2a1a10'; g.textAlign = 'center'; g.fillText('Roman soldiers were paid in salt', 0, -14); g.fillText('→ that’s where “salary” comes from!', 0, 26); g.restore(); },
    ui: c => DR.callout(c, 'A PROMISE I MADE', 640, 620, lt, .2) }), 'ink');
  C(190, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => TS.camp(g, t), crowd: DR.army(80, 560, 1200, 720, 24, ['legion'], .34, .48, 201, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }),
    ui: c => { DR.callout(c, '"PAID IN SALT!"', 640, 130, lt, .2); if (lt > R(192)) DR.callout(c, '"SALARY!"', 640, 220, lt, R(192)); } }), 'whip');
  SFX(193, 2, 'buzz', .3);
  C(193, null, (ctx, lt, dur, t, R) => split(ctx, lt, dur, t, { cam: [640, 380, 1.0], bg: g => DR.blueprint(g) }, { cam: [640, 380, 1.0], bg: g => { g.fillStyle = '#8a2a22'; g.fillRect(-200, -200, 1700, 1100); } }) || (G.UI.sign(ctx, 'HALF TRUE', 640, 140, 54, { k: G.FX.settle(clamp(lt / .3)) }), DR.write(ctx, 'THE WORD', 320, 400, 54, lt, .3, { col: '#fff', halo: false }), DR.write(ctx, 'THE PAY', 960, 400, 54, lt, .5, { col: '#fff', halo: false })));
  function split(ctx, lt, dur, t, A, B) { for (const [side, spec] of [[0, A], [1, B]]) { ctx.save(); ctx.beginPath(); ctx.rect(side * 640, 0, 640, 720); ctx.clip(); ctx.translate(side ? 320 : -320, 0); DR.shot(ctx, lt, dur, t, spec); ctx.restore(); } ctx.save(); ctx.fillStyle = '#1e1612'; ctx.fillRect(634, 0, 12, 720); ctx.restore(); }
  SFX(195, null, 'pencil', .6, 2);
  C(194, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), ui: c => { DR.write(c, 'THE WORD IS REAL', 640, 120, 50, lt, .1, { col: '#f2d23a', halo: false }); if (lt > R(195)) { DR.write(c, 'SAL', 380, 340, 110, lt, R(195), { col: '#fff', halo: false }); DR.write(c, '→', 640, 340, 80, lt, R(195) + .4, { col: '#f2d23a', halo: false }); DR.write(c, 'SALARIUM', 920, 340, 90, lt, R(195) + .6, { col: '#fff', halo: false }); DR.write(c, 'SALT', 380, 450, 40, lt, R(195) + .8, { col: '#f2d23a', halo: false }); } } }), 'flash');
  SFX(196, null, 'paper', .5);
  C(196, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.3], [640, 420, 1.36]], dof: 3, bg: (g, t) => TS.camp(g, t), act: (g, t) => P(g, 'pliny', 520, 760, .85, t, { pose: 'present', prop: 'scroll', face: { mouth: 'smile', brows: 'up' } }),
    ui: c => { DR.statCard(c, { name: 'PLINY THE ELDER', cls: 'NATURAL HISTORY · 1st C. AD', who: 'pliny', stats: [['WRITING', 5], ['FOOTNOTES', 4], ['SALT FACTS', 3]] }, 960, 360, lt, .3); } }));
  C(197, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.camp(g, t), act: (g, t) => head(g, 'pliny', 640, 270, 1.0, t, { face: { mouth: 'smile', eyes: 'half', brows: 'up' } }), ui: c => { DR.callout(c, 'SALARIUM ↔ SALT', 300, 160, lt, .1); DR.callout(c, 'OLD MILITARY HONOURS', 980, 600, lt, R(197, 5)); } }));
  mood(198, 'comic'); SFX(198, 6, 'buzz', .5);
  C(198, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.2], [640, 420, 1.26]], bg: (g, t) => TS.camp(g, t), act: (g, t) => { P(g, 'legion', 520, 760, .85, t, { pose: 'presentBoth', face: { mouth: 'o', eyes: 'wide', brows: 'up' } }); TS.sack(g, 820, 720, 1.1, '#e8dcbc', 'SAL'); },
    ui: c => { if (lt > R(198, 6)) { c.save(); c.strokeStyle = '#e0261c'; c.lineWidth = 18; c.lineCap = 'round'; const k = clamp((lt - R(198, 6)) / .3); c.beginPath(); c.moveTo(720, 560); c.lineTo(720 + 200 * k, 560 + 200 * k); c.moveTo(920, 560); c.lineTo(920 - 200 * k, 560 + 200 * k); c.stroke(); c.restore(); } DR.callout(c, 'BAGS OF SALT ON PAYDAY?', 640, 130, lt, .2); } }));
  SFX(199, null, 'coins', .7); SFX(200, null, 'paper', .5);
  C(199, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 430, 1.06]], bg: (g, t) => TS.camp(g, t), crowd: DR.army(700, 600, 1200, 700, 10, ['legion'], .4, .46, 211, { spr: { turn: -.6 } }), act: (g, t) => { P(g, 'pliny', 400, 640, .55, t, { pose: 'present', prop: 'coins', outfit: 'toga' }); for (let i = 0; i < 8; i++) sh(g, '#e8c45a', 2.5, c => c.ellipse(560 + (i % 4) * 22, 498 - Math.floor(i / 4) * 8, 16, 6, 0, 0, TAU)); },
    ui: c => { DR.callout(c, 'PAID IN COINS', 640, 130, lt, .1); if (lt > R(200)) DR.callout(c, 'PAY RECORDS SURVIVE', 640, 620, lt, R(200), 740, 486); } }));
  C(201, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), ui: c => { DR.write(c, 'SALARIUM', 640, 160, 80, lt, .1, { col: '#fff', halo: false }); if (lt > R(202)) DR.write(c, '= A GENERAL ALLOWANCE', 640, 300, 50, lt, R(202), { col: '#f2d23a', halo: false }); if (lt > R(203)) DR.write(c, 'LONG BEFORE "PAYCHECK"', 640, 420, 44, lt, R(203), { col: '#fff', halo: false }); } }), 'flash');
  mood(204, 'busy'); SFX(205, 6, 'stamp', 1); SFX(205, 6, 'boom', .5);
  C(204, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#e8d8b0'; g.fillRect(-200, -200, 1700, 1100); G.Paint2.grain(g, -200, -200, 1700, 1100, .3, 5, 'multiply', 1.3); },
    ui: c => { DR.callout(c, '"SALARY" ← SALT  ✓ (THE WORD)', 640, 220, lt, .1, null, null, { fill: '#e2f4d8', size: 32 }); if (lt > R(205)) DR.callout(c, '"PAID IN SALT"  ✗ MYTH', 640, 380, lt, R(205), null, null, { fill: '#ffd8d0', size: 32 }); if (lt > R(205, 6)) G.UI.sign(c, 'MYTH #1 — BUSTED', 640, 560, 64, { k: G.FX.settle(clamp((lt - R(205, 6)) / .25)), rot: -.06 }); } }));
  // ---------- Carthage ----------
  mood(206, 'curious'); SFX(206, null, 'whoosh', .5);
  C(206, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => TS.camp(g, t), act: (g, t) => P(g, 'legion', 640, 720, .8, t, { pose: 'pointUp', face: { mouth: 'grin', brows: 'up' } }), ui: c => DR.callout(c, 'ANOTHER ROMAN ONE', 640, 130, lt, .2) }), 'whip');
  C(207, null, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, 10.3, 36.85, 30], [1.6, 10.3, 36.85, 70]]); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: () => DR.mapPin(ctx, v, 10.32, 36.85, lt, .6), ui: c => DR.mapWrite(c, v, 10.32, 36.85, 'CARTHAGE', lt, .7, { dy: 70, size: 56, date: '146 BC' }) }); });
  SFX(208, null, 'dig', .6); SFX(208, 4, 'salthiss', .5, 2.5);
  C(208, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 480, 1.1], [600, 480, 1.16]], bg: (g, t) => TS.carthage(g, t), act: (g, t) => { const u = clamp(lt / 4); for (let i = 0; i < 2; i++) { const x = lerp(200, 800, u) + i * 220; FA.horse(g, x + 140, 600 + i * 40, .55, t, { dir: 1, coat: '#7a6a5a' }); ln(g, [[x, 610 + i * 40], [x + 90, 560 + i * 40]], 6, '#5a3a22'); P(g, 'legion', x - 60, 640 + i * 40, .45, t, { walk: t * 6, turn: .7, prop: 'saltSack' }); for (let j = 0; j < 14; j++) { const xx = x - 80 - j * 22; if (xx > 60) { g.fillStyle = 'rgba(255,255,255,.9)'; g.fillRect(xx, 660 + i * 40 + (j % 3) * 8, 5, 5); } } } },
    atm: { warm: .2 }, ui: c => DR.callout(c, 'SUPPOSEDLY: SALTED THE FIELDS', 640, 130, lt, R(208, 4)) }));
  mood(209, 'busy'); SFX(209, null, 'buzz', .5);
  C(209, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.04]], bg: (g, t) => TS.carthage(g, t), ui: c => { G.UI.sign(c, "THEY DIDN'T", 640, 200, 70, { k: G.FX.settle(clamp(lt / .25)) }); if (lt > R(210)) DR.callout(c, 'NO ANCIENT WRITER SAYS SO', 640, 380, lt, R(210)); } }), 'flash');
  SFX(211, 8, 'paper', .6);
  C(211, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.3], [640, 420, 1.36]], dof: 3, bg: g => books(g, 4),
    act: (g, t) => { P(g, 'cowie', 520, 760, .85, t, { outfit: 'frockBrown', hat: 'none', pose: 'magnify', face: { mouth: 'o', brows: 'up' } }); sh(g, '#7a3a2a', 4, c => c.rect(760, 520, 200, 140)); sh(g, '#e8d8b0', 3, c => c.rect(776, 540, 168, 40)); },
    ui: c => { DR.callout(c, 'R. T. RIDLEY · 1986', 640, 130, lt, R(211, 3)); if (lt > R(212)) G.UI.sign(c, 'NOTHING', 980, 420, 48, { k: G.FX.settle(clamp((lt - R(212)) / .3)) }); } }));
  mood(213, 'somber'); AMB(213, 'battle', 6, .5); SFX(214, null, 'fire', .7, 3);
  C(213, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.1]], bg: (g, t) => { TS.carthage(g, t); for (const x of [580, 1040, 180, 330]) G.Paint2.fire(g, x, 380, .7, t + x); }, atm: { embers: 60, dark: .2, warm: .3 }, ui: c => DR.write(c, 'THE DESTRUCTION WAS REAL', 640, 130, 50, lt, .1, { col: '#fff', halo: '#1e1612' }) }), 'dip');
  C(215, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.04]], bg: (g, t) => screen(g, t, g2 => { for (let i = 0; i < 6; i++) silFig(g2, 260 + i * 160 + lt * 30, 600, .45 + (i % 2) * .05, { spear: i % 3 === 0 }); }), ui: c => DR.write(c, 'SURVIVORS KILLED OR ENSLAVED', 640, 660, 40, lt, .2, { col: '#fff', halo: '#1e1612' }) }));
  function screen(g, t, sil) { g.fillStyle = '#3a2416'; g.fillRect(-200, -200, 1700, 1100); g.fillStyle = '#e0a060'; g.fillRect(80, 40, 1120, 560); const gr = g.createRadialGradient(640, 300, 50, 640, 300, 700); gr.addColorStop(0, 'rgba(255,200,120,.6)'); gr.addColorStop(1, 'rgba(120,40,10,.6)'); g.fillStyle = gr; g.fillRect(80, 40, 1120, 560);
    g.save(); g.beginPath(); g.rect(80, 40, 1120, 560); g.clip(); g.filter = 'blur(3px)'; g.fillStyle = 'rgba(60,24,10,.85)'; sil(g); g.filter = 'none'; g.restore(); g.strokeStyle = '#3a2416'; g.lineWidth = 10; for (let x = 80; x <= 1200; x += 140) { g.beginPath(); g.moveTo(x, 40); g.lineTo(x, 600); g.stroke(); } g.fillStyle = '#5a3a22'; g.fillRect(-200, 600, 1700, 400); }
  function silFig(g, x, y, s, o = {}) { g.save(); g.translate(x, y); g.scale(s, s); g.beginPath(); g.arc(0, -560, 70, 0, TAU); g.fill(); g.beginPath(); g.moveTo(-90, -480); g.lineTo(90, -480); g.lineTo(120, 0); g.lineTo(-120, 0); g.closePath(); g.fill(); if (o.spear) g.fillRect(110, -760, 10, 760); g.restore(); }
  mood(216, 'curious'); SFX(216, null, 'paper', .5); SFX(217, 3, 'card', .5); SFX(218, 5, 'card', .5); SFX(219, 4, 'card', .5);
  C(216, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.03]], bg: g => books(g, 3),
    ui: c => { DR.callout(c, 'THE SALT DETAIL: MODERN BOOKS', 640, 380, lt, .1); [['1930 · CAMBRIDGE HISTORY', R(217, 3)], ['1800s VERSIONS', R(218, 5)], ["A MEDIEVAL POPE'S BOAST", R(219, 4)]].forEach(([s, a], i) => { if (lt > a) DR.callout(c, s, 640, 480 + i * 70, lt, a, null, null, { size: 26, fill: i === 0 ? '#fff3c8' : undefined }); }); } }));
  mood(220, 'warm'); SFX(221, 6, 'boing', .5); SFX(221, 9, 'stamp', 1);
  C(220, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => TS.carthage(g, t, { v: 'colony' }), crowd: DR.army(100, 600, 1180, 720, 12, ['legion', 'peasant'], .4, .5, 221, { spr: { outfit: 'toga', hat: 'none', pose: 'cheer' } }), ui: c => DR.write(c, 'A NEW ROMAN COLONY — RIGHT THERE', 640, 130, 44, lt, .2, { col: '#fff', halo: '#1e1612' }) }), 'dissolve');
  C(221, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.carthage(g, t, { v: 'colony' }), act: (g, t) => head(g, 'legion', 640, 270, 1.0, t, { outfit: 'toga', hat: 'none', face: { mouth: 'smirk', brows: 'skeptic', eyes: 'half' } }),
    ui: c => { DR.callout(c, 'SALT YOUR OWN FARMLAND?', 640, 600, lt, .3); if (lt > R(221, 9)) G.UI.sign(c, 'MYTH #2 — BUSTED', 640, 160, 64, { k: G.FX.settle(clamp((lt - R(221, 9)) / .25)), rot: -.06 }); } }));
})(window);
