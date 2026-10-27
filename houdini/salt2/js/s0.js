/* "It's About Salt" remake — COLD OPEN (lines 1–24) + BEAT 2 (lines 25–65: why you can't quit salt · Hallstatt · counter 1).
 * Pace: a new shot every ~1.5–2.5 s, wide → medium → close-up → insert, depth of field, crowds, foley on every action. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, K = G.VK, { W, H, clamp, lerp, rng } = T;
  const { sh, ln, circ } = G.Paint, TAU = Math.PI * 2, PI = Math.PI;
  const { C, P, head, SFX, AMB, say } = G, L = G.L, mood = EP.mood;
  // ---------- small props for this file ----------
  function hand(g, x, y, s, rot = 0, col = '#a8724a', o = {}) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);   // a big cartoon hand (palm down, reaching)
    sh(g, col, 5, c => { c.moveTo(-60, 120); c.lineTo(-50, 10); c.quadraticCurveTo(-46, -30, -20, -34); c.lineTo(-18, -110); c.quadraticCurveTo(-4, -126, 8, -108); c.lineTo(10, -40); c.lineTo(16, -124); c.quadraticCurveTo(30, -138, 42, -120); c.lineTo(40, -40); c.lineTo(52, -112); c.quadraticCurveTo(66, -122, 74, -104); c.lineTo(66, -24); c.quadraticCurveTo(96, -60, 108, -40); c.quadraticCurveTo(90, 20, 60, 60); c.lineTo(50, 120); c.closePath(); });
    if (o.cuff) sh(g, o.cuff, 5, c => c.rect(-70, 110, 136, 80)); g.restore(); }
  function lattice(g, cx, cy, s, k) { const P3 = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let l = 0; l < 3; l++) P3.push([i, j, l]);   // NaCl cube in oblique projection
    const pr = ([i, j, l]) => [cx + (i - 1) * 110 * s + (l - 1) * 50 * s, cy + (j - 1) * 110 * s - (l - 1) * 40 * s]; const n = Math.floor(P3.length * clamp(k));
    g.save(); g.strokeStyle = 'rgba(240,248,255,.7)'; g.lineWidth = 3; for (const p of P3) for (const d of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) { const q = [p[0] + d[0], p[1] + d[1], p[2] + d[2]]; if (q.some(v => v > 2)) continue; const a = pr(p), b = pr(q); g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
    P3.sort((a, b) => b[2] - a[2]).slice(0, n).forEach(p => { const [x, y] = pr(p), na = (p[0] + p[1] + p[2]) % 2 === 0; g.fillStyle = na ? '#8a6ad8' : '#3ad87a'; g.strokeStyle = '#fff'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, (na ? 22 : 30) * s, 0, TAU); g.fill(); g.stroke(); }); g.restore(); }
  function balance(g, x, y, s, tilt, left, right) { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#8a6a3a', 4, c => c.rect(-80, 0, 160, 26)); ln(g, [[0, 0], [0, -260]], 12, '#6a4a2a'); g.save(); g.translate(0, -260); g.rotate(tilt);
    ln(g, [[-220, 0], [220, 0]], 10, '#6a4a2a'); for (const [sd, fn] of [[-1, left], [1, right]]) { g.save(); g.translate(sd * 210, 0); g.rotate(-tilt); ln(g, [[0, 0], [-60, 130]], 3, '#3a2a1a'); ln(g, [[0, 0], [60, 130]], 3, '#3a2a1a'); sh(g, '#c8a060', 4, c => c.ellipse(0, 132, 80, 18, 0, 0, TAU)); if (fn) fn(g); g.restore(); } g.restore(); g.restore(); }
  const coins = (g, n) => { for (let i = 0; i < n; i++) sh(g, '#e8c45a', 2.5, c => c.ellipse(-30 + (i % 4) * 20, 124 - Math.floor(i / 4) * 9, 16, 6, 0, 0, TAU)); };
  const pinch = g => { sh(g, '#fbfbf8', 2.5, c => { c.moveTo(-26, 126); c.quadraticCurveTo(0, 100, 26, 126); c.closePath(); }); };
  function sacks(g, x, y, n, k, t) { for (let i = 0; i < n; i++) { const road = i < 4, slide = road ? clamp(k * 2 - i * .2) : 0; TS.sack(g, x + i * 92 - (n - 1) * 46, y + slide * 120, 1, road && slide > .5 ? '#d8d0c0' : '#e8dcbc', road ? 'ROAD' : 'SALT'); } }
  const kitchenCam = (o) => (g, t) => TS.kitchen(g, t, o);
  // ===================== COLD OPEN =====================
  mood(1, 'curious'); AMB(1, 'wind', 12, .8); SFX(1, null, 'truck', .7, 11);
  C(1, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 1.0], [660, 380, 1.12]], bg: (g, t) => TS.highway(g, t, { drive: .55 }), atm: { snow: 140, cold: .1 } ,
    ui: (c) => DR.write(c, 'RIGHT NOW', 640, 120, 60, lt, .2, { col: '#fff', halo: 'rgba(20,30,60,.8)' }) }));
  C(2, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 470, 1.6], [700, 450, 1.75]], bg: (g, t) => TS.highway(g, t, { drive: .42 }), atm: { snow: 160 }, fg: { kind: 'posts', n: 2, blur: 5, col: '#3a3e48', drift: -260, seed: 4 },
    ui: c => DR.callout(c, 'SOMEWHERE IN AMERICA', 360, 140, lt, .3) }), 'whip');
  SFX(3, null, 'salthiss', .8, 3);
  C(3, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 600, 3.2], [700, 590, 3.5]], dof: 0, bg: (g, t) => TS.highway(g, t, { drive: .25 }), atm: { snow: 90 } }));
  C(3, 6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 560, 2.6], [600, 560, 2.8]], dof: 6, bg: (g, t) => TS.highway(g, t, { drive: .5 }),
    act: (g, t) => { const r = rng(4); for (let i = 0; i < 60; i++) { const x = 400 + r() * 480, y = 560 + r() * 140, b = Math.abs(Math.sin(t * 6 + i)) * 10; g.fillStyle = '#fbfbff'; g.save(); g.translate(x, y - b); g.rotate(r() * PI); g.fillRect(-4, -4, 8, 8); g.restore(); } }, atm: { snow: 60 },
    ui: c => DR.callout(c, 'ROCK SALT', 980, 170, lt, .3, 640, 600) }));
  C(4, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 400, 1.08]], bg: (g, t) => { g.fillStyle = '#9aa8c4'; g.fillRect(-400, -400, 2200, 1600); TS.highway(g, t, { drive: .9, spray: 0 }); TS.saltHeap(g, 640, 640, 1100, 360); },
    act: (g, t) => { for (const x of [300, 980]) TS.truck(g, x, 690, .42, t, { spray: 0 }); }, atm: { snow: 80 }, ui: c => DR.write(c, '2024', 640, 140, 96, lt, .1, { col: '#c8281e', underline: '#c8281e' }) }), 'whip');
  SFX(5, 3, 'pop', .5); SFX(5, 6, 'swish', .5);
  C(5, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.15], [640, 400, 1.05]], bg: (g, t) => { TS.highway(g, t, { drive: .9, spray: 0 }); }, act: (g, t) => sacks(g, 640, 560, 10, clamp((lt - (R(5, 3) - .2)) / 2.5), t), atm: { snow: 70 },
    ui: c => { DR.tally(c, '4/10', g => { g.fillStyle = '#5a5e66'; g.fillRect(-10, -10, 20, 20); }, 640, 120, lt, R(5, 3), { n: 10, w: 520, label: '4 in 10' }); if (lt > R(5, 9)) DR.callout(c, 'ROADS', 300, 360, lt, R(5, 9), 330, 680); } }));
  mood(6, 'comic'); SFX(6, null, 'whoosh', .7); AMB(6, 'kitchen', 33, .5);
  C(6, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [620, 400, 1.15]], bg: kitchenCam({ sh: { turn: .3, face: 'smug' } }), atm: { warm: .15 } }), 'whip');
  SFX(7, null, 'pop', .5);
  C(7, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 360, 2.2], [610, 370, 2.4]], dof: 5, bg: kitchenCam({ shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: clamp(.3 + lt * 1.2), face: 'smug' }) }));
  SFX(8, null, 'pencil', .6, 1.6);
  C(8, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.05]], bg: g => DR.blueprint(g), act: (g, t) => lattice(g, 640, 380, 1.1, clamp(lt / 1.4)),
    ui: c => { DR.write(c, 'NaCl', 330, 200, 72, lt, .2, { col: '#fff', halo: false }); DR.write(c, 'SODIUM CHLORIDE', 330, 270, 32, lt, .6, { col: '#f2d23a', halo: false }); DR.callout(c, 'Na', 1040, 220, lt, 1.0, 640 - 160, 380 - 70, { size: 26 }); DR.callout(c, 'Cl', 1040, 560, lt, 1.2, 640 + 110 - 50 + 50, 380, { size: 26 }); } }), 'flash');
  SFX(9, 3, 'ding', .5);
  C(9, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.3], [640, 380, 1.2]], bg: kitchenCam({ shaker: false }), act: (g, t) => { EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'happy' }); const sw = Math.sin(t * 3) * .12; g.save(); g.translate(640, 300); g.rotate(sw); ln(g, [[0, 0], [30, 50]], 2, '#3a2a1a'); sh(g, '#f4e6c8', 3, c => c.roundRect(10, 50, 120, 60, 8)); g.font = DR.MK(26); g.fillStyle = '#c8281e'; g.textAlign = 'center'; g.fillText('CHEAP!', 70, 92); g.restore(); },
    ui: c => DR.callout(c, 'THE CHEAPEST THING HERE', 900, 160, lt, R(9, 3), 620, 330) }));
  mood(10, 'curious'); SFX(10, null, 'whoosh', .6);
  C(10, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 380, 1.12]], bg: (g, t) => TS.hanCourt(g, t, { guards: false }),
    crowd: DR.army(140, 560, 1140, 700, 26, ['hanAdv', 'scholar', 'huan'], .26, .36, 3), act: (g, t) => { sh(g, '#d8a83a', 4, c => c.roundRect(570, 380, 140, 30, 8)); TS.saltHeap(g, 640, 382, 90, 34); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 360, 160, 'rgba(255,240,200,.5)'); g.restore(); }, atm: { warm: .25, dust: 30 } }), 'ink');
  SFX(11, null, 'gasp', .7); SFX(11, 2, 'clink', .7);
  C(11, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.5], [640, 420, 1.6]], bg: (g, t) => TS.hanEstate(g, t), dof: 5,
    act: (g, t) => balance(g, 640, 640, 1, -.18 * clamp(lt / .8), g2 => coins(g2, 16), pinch), ui: c => DR.callout(c, 'NOT CHEAP', 980, 150, lt, .4) }));
  mood(12, 'adventure'); SFX(12, null, 'gong', .6); AMB(12, 'court', 3, .5);
  C(12, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 420, 1.2]], bg: (g, t) => TS.hanCourt(g, t, { guards: false }), crowd: DR.army(80, 600, 1200, 700, 20, ['hanAdv', 'hanAdv', 'scholar'], .3, .36, 7, { spr: { pose: 'bow' } }),
    act: (g, t) => P(g, 'wudi', 640, 470, .62, t, { pose: 'present', face: { mouth: 'smirk', brows: 'sly' } }), atm: { warm: .2 }, ui: c => DR.callout(c, 'EMPERORS', 980, 130, lt, .3, 640, 200) }), 'whip');
  SFX(13, 1, 'stamp', .7); SFX(13, 7, 'cloth', .6);
  C(13, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.2], [600, 420, 1.3]], bg: (g, t) => TS.grenier(g, t), crowd: DR.army(100, 620, 520, 720, 9, ['peasant', 'peasant', 'smuggler'], .5, .6, 9, { spr: { turn: .7 } }),
    act: (g, t) => P(g, 'taxman', 760, 600, .62, t, { pose: 'present', face: { mouth: 'grin', brows: 'sly' } }), ui: c => DR.callout(c, 'KINGS', 900, 140, lt, .2, 760, 300) }), 'whip');
  C(13, 6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 310, 2.4]], dof: 7, bg: (g, t) => TS.border(g, t), bgAct: (g, t) => P(g, 'taxman', 300, 640, .7, t, { turn: .6 }),
    act: (g, t) => { head(g, 'smuggler', 640, 250, .95, t, { prop: 'none', turn: -.2, face: { mouth: 'grit', eyes: 'squint', brows: 'worried', sweat: true, look: [-.6, 0] } }); TS.sack(g, 650, 520, .9, '#e8dcbc', 'SEL'); }, atm: { night: .25 } }));
  SFX(14, null, 'march', .7, 4); AMB(14, 'crowd', 2, .3);
  C(14, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[500, 470, 1.0], [780, 470, 1.0]], bg: (g, t) => TS.saltville(g, t, { v: 'day' }), crowd: (t2, l2) => DR.army(-200 + l2 * 120, 560, 600 + l2 * 120, 700, 40, ['uscav', 'uscav2', 'burbridge'], .26, .34, 5, { walk: true, spr: { turn: .8 } }), atm: { dust: 50, haze: .15 } }), 'whip');
  SFX(14, 6, 'fire', .8, 3); SFX(14, 6, 'boom', .7);
  C(14, 6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 1.25], [640, 470, 1.35]], shake: 1, bg: (g, t) => TS.saltville(g, t, { v: 'wrecked' }), atm: { embers: 60, warm: .3, dark: .1 } }));
  mood(15, 'rising'); SFX(15, null, 'whoosh', .6);
  C(15, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.06]], bg: g => { const v = M.view(72.7, 22.6, 70); DR.map(g, t, v); }, act: (g, t) => { const v = M.view(72.7, 22.6, 70); DR.mapPin(g, v, 72.58, 23.06, lt, .3); },
    ui: c => { const v = M.view(72.7, 22.6, 70); DR.mapWrite(c, v, 72.58, 23.06, 'INDIA', lt, .2, { date: '1930', dx: 120, dy: -40 }); } }), 'whip');
  C(16, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.marchRoad(g, t), act: (g, t) => head(g, 'gandhi', 640, 280, 1.0, t, { face: { mouth: 'smile', look: [.4, 0] } }),
    ui: c => DR.statCard(c, { name: 'GANDHI', cls: 'AGE: 60', who: 'gandhi', stats: [['WALKING', 5], ['PATIENCE', 5], ['SALT', 0]] }, 980, 380, lt, .3) }));
  SFX(16, 6, 'footsteps', .6, 3);
  C(16, 6, (ctx, lt, dur, t, R) => { const v = M.view(72.65, 22.3, 150); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { const k = clamp(lt / 2.6), pts = [[72.58, 23.06], [72.8, 22.7], [72.95, 22.35], [72.9, 21.9], [72.8, 21.1]];
      G.MAP.route(g, v, pts, k, { w: 7, dash: [16, 10] }); const [x, y] = G.MAP.pt(v, ...pts[Math.min(4, Math.floor(k * 4.999))]); P(g, 'gandhi', x, y, .14, t, { walk: t * 7, turn: .3 }); },
      ui: c => { DR.tally(c, '240', g => { g.fillStyle = '#7a5a3a'; g.beginPath(); g.ellipse(0, 0, 8, 12, .4, 0, TAU); g.fill(); }, 900, 620, lt, .3, { n: 12, w: 520, label: '240 mi' }); DR.mapWrite(c, v, 72.8, 21.1, 'THE OCEAN', lt, 1.6, { dx: -170, dy: 10, size: 40 }); } }); });
  SFX(17, 4, 'crunch', .7); SFX(17, 6, 'sparkle', .5);
  C(17, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 560, 2.6], [640, 540, 2.8]], dof: 6, bg: (g, t) => TS.dandi(g, t), act: (g, t) => { const up = clamp((lt - .8) / .6); sh(g, '#fbfbf8', 3, c => c.ellipse(650, 600 - up * 70, 26, 16, 0, 0, TAU)); hand(g, 690, 520 - up * 70, .55, .2); },
    ui: c => { if (lt > 1.2) DR.callout(c, 'THE CRIME', 980, 150, lt, 1.2, 650, 530); } }));
  mood(18, 'comic'); SFX(18, null, 'whoosh', .6);
  C(18, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 380, 1.9], [610, 380, 2.0]], dof: 4, bg: kitchenCam({ shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: 1, face: lt > 1.5 ? 'shock' : 'smug' }),
    ui: c => { if (lt > .3) DR.callout(c, 'BORING?', 300, 180, lt, .3, 560, 300); } }), 'whip');
  SFX(18, 9, 'boom', .6); AMB(18, 'crowd', 2, .4);
  C(18, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.12]], bg: (g, t) => TS.carthage(g, t), crowd: [...DR.army(80, 560, 520, 700, 18, ['legion'], .3, .4, 3, { spr: { turn: .7, pose: 'cheer' } }), ...DR.army(760, 560, 1200, 700, 18, ['uscav', 'confed'], .3, .4, 4, { spr: { turn: -.7, pose: 'pointSide' } })], atm: { dust: 70, haze: .2, warm: .2 },
    ui: c => DR.banner(c, 'WARS', 640, 140, lt, .2) }), 'whip');
  SFX(19, null, 'splash', .5);
  C(19, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 1.25], [700, 470, 1.25]], bg: (g, t) => TS.canal(g, t, { boat: .3 + lt * .05, dig: true }), ui: c => DR.banner(c, 'CANALS', 640, 140, lt, .1, { col: '#2a5aa8' }) }), 'whip');
  SFX(19, 3, 'rumble', .8, 2);
  C(19, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.1], [640, 380, 1.15]], shake: 2.5, bg: (g, t) => TS.hanCourt(g, t), atm: { dust: 80, dark: .15 }, ui: c => DR.banner(c, 'AN EMPIRE', 640, 140, lt, .1, { col: '#7a3a8a' }) }), 'whip');
  mood(20, 'comic');
  C(20, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 380, 2.0], [610, 360, 2.4]], dof: 5, bg: kitchenCam({ shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'smug', talk: Math.abs(Math.sin(t * 9)) * .5 }) }), 'whip');
  SFX(21, null, 'tada', .7);
  C(21, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 420, 1.06]], bg: (g, t) => { DR.sunburst(g, t, '#f2b840', '#f8d888'); sh(g, '#9a948a', 5, c => c.ellipse(640, 600, 260, 60, 0, 0, TAU)); }, act: (g, t) => EP.shaker(g, 640, 600, 1.3, t, { turn: 1, face: 'smug' }),
    atm: { dust: 20 }, ui: c => { DR.banner(c, 'NEVER ABOUT FLAVOR', 640, 640, lt, .3); } }), 'flash');
  mood(22, 'busy'); SFX(22, 4, 'boom', .7); SFX(22, 4, 'whoosh', .5);
  C(22, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.15], [640, 380, 1.0]], bg: (g, t) => { DR.sunburst(g, t, '#d84a2a', '#f08a4a'); TS.saltHeap(g, 640, 640, 900, 260); }, act: (g, t) => { EP.shaker(g, 640, 600, 1.0, t, { turn: 1, face: 'happy' }); },
    crowd: (t2) => [...DR.army(80, 640, 380, 700, 6, ['wudi', 'peasant', 'gandhi'], .34, .4, 2, { spr: { pose: 'cheer' } }), ...DR.army(900, 640, 1200, 700, 6, ['legion', 'taxman', 'uscav'], .34, .4, 6, { spr: { pose: 'cheer' } })],
    ui: c => { DR.write(c, 'THE ENTIRE HISTORY OF', 640, 140, 48, lt, R(22, 3), { col: '#fff', halo: 'rgba(60,20,10,.8)' }); DR.write(c, 'SALT', 640, 240, 130, lt, R(22, 6), { col: '#fff', halo: '#1e1612' }); } }), 'ink');
  SFX(23, 3, 'card', .6); SFX(23, 4, 'card', .6); SFX(23, 5, 'card', .6);
  C(23, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.04]], bg: g => { g.fillStyle = '#2a2a48'; g.fillRect(-200, -200, 1700, 1100); const r = rng(2); for (let i = 0; i < 60; i++) { g.fillStyle = 'rgba(255,255,255,.06)'; g.beginPath(); g.arc(r() * 1280, r() * 720, 40 + r() * 80, 0, TAU); g.fill(); } },
    ui: c => DR.mystery(c, Array.from({ length: 7 }, () => ({})), 640, 360, lt, .1, [], { w: 150 }) }), 'dissolve');
  C(24, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 370, 2.3], [610, 380, 2.1]], dof: 5, bg: kitchenCam({ shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'smug' }) }));
  EP.count(0, 24, .5);

  // ===================== BEAT 2 — why you can't quit salt =====================
  mood(25, 'comic'); SFX(25, null, 'whoosh', .6);
  C(25, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 380, 1.08]], bg: (g, t) => TS.village(g, t, .5), atm: { glare: [1000, 90, 300] }, ui: c => DR.write(c, 'FIRST…', 640, 140, 70, lt, .05, { col: '#fff', halo: '#1e1612', d: .3 }) }), 'flash');
  C(26, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.3], [640, 300, 2.4]], dof: 6, bg: (g, t) => TS.village(g, t, .5), act: (g, t) => head(g, 'peasant', 640, 280, 1.0, t, { pose: 'shrug', face: { mouth: 'o', brows: 'up', look: [0, -.2] } }),
    ui: c => DR.exclaim(c, 820, 150, lt, .3, { ch: '?', col: '#2a5aa8' }) }));
  SFX(27, null, 'pencil', .5, 1.5);
  C(27, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp(lt / 1.6); g.save(); g.globalAlpha = .95; P(g, 'viewer', 640, 700, .9, t, { prop: 'none', light: { x: 0, y: 0, rim: '#fff', rimA: .2, shade: '#123', shadeA: .2, cast: 0 } }); g.restore();
      DR.bpDraw(g, [[640, 230, 640, 520], [640, 330, 520, 450], [640, 330, 760, 450], [640, 520, 560, 690], [640, 520, 720, 690]], k, { col: '#f2d23a', w: 6 }); },
    ui: c => { DR.write(c, 'SODIUM (Na)', 300, 150, 44, lt, .2, { col: '#fff', halo: false }); } }), 'flash');
  SFX(28, null, 'zap', .6); SFX(29, null, 'zap', .6);
  C(28, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.4], [640, 360, 1.5]], bg: g => DR.blueprint(g), act: (g, t) => { for (let i = 0; i < 5; i++) { const k = clamp(lt * 1.8 - i * .2); DR.bpDraw(g, [[300 + i * 30, 300 + i * 30, 980, 300 + i * 30]], k, { col: '#f2d23a', w: 5, pencil: false }); g.fillStyle = '#fff'; g.beginPath(); g.arc(lerp(300, 980, k), 300 + i * 30, 9, 0, TAU); g.fill(); } },
    ui: c => { DR.write(c, 'NERVES FIRE', 640, 150, 52, lt, .1, { col: '#fff', halo: false }); if (lt > R(29)) DR.write(c, 'MUSCLES CONTRACT', 640, 560, 52, lt, R(29), { col: '#fff', halo: false }); } }));
  SFX(30, 3, 'cramp', .7);
  C(30, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 330, 1.6], [640, 320, 1.8]], dof: 4, bg: (g, t) => TS.village(g, t, .5), act: (g, t) => P(g, 'peasant', 640, 760, .85, t, { pose: lt > 1 ? 'facepalm' : 'shrug', prop: 'none', face: { mouth: 'grit', eyes: 'squint', brows: 'worried', sweat: true } }),
    ui: c => { [['CRAMPS', 300, 160, .2], ['CONFUSION', 980, 160, R(30, 5)], ['WORSE', 640, 600, R(30, 7)]].forEach(([s, x, y, a]) => { if (lt > a) DR.callout(c, s, x, y, lt, a); }); } }));
  SFX(31, null, 'stamp', .6);
  C(31, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.04]], bg: g => DR.blueprint(g), act: (g, t) => { g.save(); g.globalAlpha = .9; P(g, 'viewer', 640, 700, .9, t, { prop: 'none' }); g.restore(); }, ui: c => DR.banner(c, 'A BODY PROBLEM', 640, 600, lt, .2) }));
  mood(32, 'curious'); SFX(32, null, 'whoosh', .5);
  C(32, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [700, 420, 1.1]], bg: (g, t) => TS.larder(g, t), atm: { warm: .25, dust: 30 }, ui: c => DR.callout(c, 'THE BIGGER PROBLEM', 360, 140, lt, .5) }), 'whip');
  SFX(33, null, 'buzz', .5);
  C(33, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 400, 1.4], [700, 400, 1.5]], bg: (g, t) => TS.larder(g, t), act: (g, t) => { const k = clamp(lt / .3); g.save(); g.globalAlpha = 1 - clamp((lt - .9) / .3); g.translate(900, 470); sh(g, '#f4f6f8', 5, c => c.roundRect(-90, -240, 180, 280, 18)); ln(g, [[-90, -150], [90, -150]], 5); g.restore(); },
    ui: c => { if (lt > .7) DR.callout(c, 'NO FRIDGE', 900, 140, lt, .7, 900, 360); } }));
  SFX(34, 3, 'oink', .8);
  C(34, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 1.3], [620, 470, 1.4]], bg: (g, t) => TS.village(g, t, .7), act: (g, t) => { P(g, 'peasant', 520, 700, .7, t, { pose: 'present', face: { mouth: 'grin' } }); pig(g, 760, 700, 1.1, t); },
    atm: { cold: .15 }, ui: c => DR.write(c, 'NOVEMBER', 1000, 140, 50, lt, .2, { col: '#c8281e', underline: '#c8281e' }) }), 'whip');
  function pig(g, x, y, s, t) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = 'rgba(30,20,10,.25)'; g.beginPath(); g.ellipse(0, 4, 90, 14, 0, 0, TAU); g.fill(); for (const lx of [-60, -30, 30, 60]) sh(g, '#e89aa0', 4, c => c.rect(lx - 9, -40, 18, 42)); sh(g, '#f4b0b4', 5, c => c.ellipse(0, -80, 100, 60, 0, 0, TAU));
    sh(g, '#f4b0b4', 5, c => c.ellipse(90, -100, 44, 40, 0, 0, TAU)); sh(g, '#e88a90', 4, c => c.ellipse(124, -94, 18, 14, 0, 0, TAU)); for (const d of [-5, 5]) { g.fillStyle = '#7a3a3a'; g.beginPath(); g.arc(124 + d, -94, 3, 0, TAU); g.fill(); } g.fillStyle = '#1e1612'; g.beginPath(); g.arc(98, -112, 5, 0, TAU); g.fill();
    sh(g, '#e88a90', 4, c => { c.moveTo(70, -134); c.lineTo(82, -160); c.lineTo(96, -136); c.closePath(); }); g.strokeStyle = '#e88a90'; g.lineWidth = 5; g.beginPath(); g.arc(-108, -96, 12, 0, TAU * .8 + Math.sin(t * 6) * .3); g.stroke(); g.restore(); }
  G.pig = pig;
  SFX(35, null, 'fly', .5, 3);
  C(35, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 2.0], [640, 470, 2.2]], dof: 5, bg: (g, t) => TS.larder(g, t), act: (g, t) => { for (let i = 0; i < 3; i++) { sh(g, '#b8907a', 3.5, c => c.roundRect(540 + i * 80, 446, 70, 24, 8)); }
      const r = rng(3); for (let i = 0; i < 6; i++) { const a = t * 3 + i, x = 640 + Math.cos(a) * 90 + Math.sin(a * 2.3) * 30, y = 400 + Math.sin(a * 1.4) * 40; g.fillStyle = '#1e1612'; g.beginPath(); g.ellipse(x, y, 5, 4, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(255,255,255,.7)'; g.beginPath(); g.ellipse(x - 4, y - 4, 4, 2, .5, 0, TAU); g.fill(); }
      g.save(); g.globalAlpha = .5; for (let i = 0; i < 4; i++) { g.strokeStyle = '#7aaa4a'; g.lineWidth = 4; g.beginPath(); const x = 560 + i * 60, y = 430 - ((t * 20 + i * 15) % 60); g.moveTo(x, y); g.quadraticCurveTo(x + 10, y - 10, x, y - 20); g.stroke(); } g.restore(); },
    ui: c => { const day = Math.min(4, 1 + Math.floor(lt / .9)); DR.callout(c, 'DAY ' + day, 640, 150, lt, .1); if (lt > R(35, 6)) DR.callout(c, 'BIOLOGY EXPERIMENT', 640, 600, lt, R(35, 6), 640, 440, { fill: '#e8f4d8' }); } }));
  SFX(36, null, 'salthiss', .6, 2);
  C(36, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[600, 440, 2.4], [600, 440, 2.6]], dof: 6, bg: (g, t) => TS.larder(g, t), act: (g, t) => { const k = clamp(lt / 2); for (let i = 0; i < 3; i++) { sh(g, '#e8a090', 3.5, c => c.roundRect(540 + i * 80, 446, 70, 24, 8)); }
      const r = rng(5); for (let i = 0; i < 40; i++) { const u = clamp(k * 1.5 - r() * .5); g.fillStyle = '#fff'; g.fillRect(540 + r() * 230, 380 + u * 70, 4, 4); } for (let i = 0; i < 6; i++) { const u = (lt * .8 + i / 6) % 1; g.fillStyle = `rgba(80,150,220,${.9 * (1 - u)})`; g.beginPath(); g.ellipse(560 + i * 40, 474 + u * 50, 5, 8, 0, 0, TAU); g.fill(); } },
    ui: c => DR.callout(c, 'WATER OUT', 960, 160, lt, .3, 640, 480) }));
  SFX(37, null, 'pop', .5);
  C(37, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { for (let i = 0; i < 7; i++) { const a = i * TAU / 7 + t * .3, x = 640 + Math.cos(a) * 150, y = 380 + Math.sin(a) * 110; g.save(); g.translate(x, y); g.rotate(a); sh(g, '#7ad85a', 3, c => c.ellipse(0, 0, 34, 16, 0, 0, TAU)); g.restore(); } },
    ui: c => { DR.write(c, 'BACTERIA', 640, 150, 52, lt, .1, { col: '#fff', halo: false }); if (lt > .5) DR.circle(c, 640, 380, 240, 180, lt, .5, { col: '#e0261c', w: 10 }); if (lt > .8) { c.save(); c.strokeStyle = '#e0261c'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(470, 250); c.lineTo(810, 510); c.stroke(); c.restore(); } } }), 'flash');
  AMB(38, 'wind', 4, .6);
  C(38, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.06]], bg: (g, t) => TS.larder(g, t), atm: { snow: 0, cold: .1 }, act: (g, t) => { for (let i = 0; i < 3; i++) PR.barrel(g, 420 + i * 120, 700, 1.3); }, ui: c => DR.callout(c, 'LASTS ALL WINTER ✓', 640, 140, lt, .3, 540, 560, { fill: '#e2f4d8' }) }));
  SFX(39, 7, 'sack', .7);
  C(39, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => { DR.sunburst(g, t, '#8ac0e0', '#c8e6f4'); sh(g, '#9a948a', 5, c => c.ellipse(640, 640, 240, 50, 0, 0, TAU)); }, act: (g, t) => { TS.sack(g, 640, 640, 2.2, '#e8dcbc', 'SALT'); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 500, 200, 'rgba(200,240,255,.4)'); g.restore(); },
    atm: { dust: 20 }, ui: c => DR.banner(c, 'A FRIDGE IN A SACK', 640, 140, lt, R(39, 3), { col: '#2a7ac8' }) }), 'flash');
  mood(40, 'curious'); SFX(40, null, 'whoosh', .5); AMB(40, 'wind', 6, .5);
  C(40, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 400, 1.1]], bg: (g, t) => TS.village(g, t, .8), atm: { snow: 90, cold: .2 }, crowd: DR.army(300, 620, 980, 700, 10, ['peasant', 'neo1', 'neo2'], .4, .5, 4, { spr: { pose: 'cheer' } }),
    ui: c => { DR.write(c, 'FEBRUARY', 640, 130, 60, lt, .2, { col: '#2a5aa8' }); if (lt > R(40, 5)) DR.callout(c, 'SURVIVED ✓', 640, 230, lt, R(40, 5), 640, 500, { fill: '#e2f4d8' }); } }), 'whip');
  C(41, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 6, bg: (g, t) => TS.village(g, t, .2), act: (g, t) => head(g, 'neo2', 640, 270, 1.0, t, { face: { mouth: 'grit', eyes: 'wide', brows: 'worried', sweat: true } }), atm: { snow: 70, cold: .25 } }));
  SFX(42, 2, 'coins', .6);
  C(42, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.4], [640, 420, 1.5]], dof: 3, bg: (g, t) => TS.village(g, t, .6), act: (g, t) => { P(g, 'neo2', 480, 760, .9, t, { pose: 'present', prop: 'coins', turn: .4, face: { mouth: 'frown', brows: 'worried' } }); P(g, 'merchant', 820, 760, .9, t, { pose: 'hips', turn: -.4, prop: 'saltSack', face: { mouth: 'grin', brows: 'sly', eyes: 'happy' } }); }, atm: { snow: 40 } }));
  mood(43, 'danger'); SFX(43, null, 'sting', .8);
  C(43, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.6], [640, 360, 1.9]], dof: 3, bg: (g, t) => TS.village(g, t, .6), act: (g, t) => { P(g, 'merchant', 640, 760, .9, t, { pose: 'hips', prop: 'saltSack', face: { mouth: 'smirk', brows: 'sly', eyes: 'half' } }); }, atm: { dark: clamp(lt / .6) * .5 },
    ui: c => DR.exclaim(c, 760, 150, lt, .5) }));
  // ---------- Hallstatt ----------
  mood(44, 'warm'); SFX(44, null, 'whoosh', .6); SFX(44, null, 'paper', .5);
  C(44, { off: -1.0 }, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, 13.65, 47.4, 22], [1.4, 13.65, 47.56, 80]]); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: () => DR.mapPin(ctx, v, 13.65, 47.56, lt, 1.0),
    ui: c => DR.mapWrite(c, v, 13.65, 47.56, 'HALLSTATT', lt, 1.1, { dx: 0, dy: 70, size: 58, date: 'AUSTRIA' }) }); }, 'whip');
  AMB(45, 'birds', 9, .6); AMB(45, 'lake', 9, .4);
  C(45, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[480, 330, 1.25], [820, 330, 1.25]], bg: (g, t) => TS.hallstatt(g, t), atm: { glare: [1100, 60, 300] } }), 'dissolve');
  C(46, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[900, 300, 1.4], [1000, 190, 2.6]], bg: (g, t) => TS.hallstatt(g, t), ui: c => { if (lt > 1.6) DR.callout(c, 'SALT MINE', 900, 130, lt, 1.6, 1000, 178); } }));
  C(46, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.2], [640, 380, 1.3]], bg: (g, t) => TS.mine(g, t), ui: c => DR.banner(c, 'ONE OF THE OLDEST ON EARTH', 640, 620, lt, .1, { size: 34 }) }), 'dip');
  SFX(47, null, 'tick', .4);
  C(47, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.3], [640, 370, 1.4]], dof: 3, bg: (g, t) => TS.hallstatt(g, t, { pan: 40 }), act: (g, t) => { P(g, 'cowie', 420, 760, .8, t, { pose: 'magnify', outfit: 'explorer', hat: 'pith', prop: 'none', face: { mouth: 'o', brows: 'up' } }); P(g, 'miner2', 860, 760, .8, t, { pose: 'present', outfit: 'miner', prop: 'none', face: { mouth: 'smile' } }); },
    ui: c => { if (lt > R(47, 13)) DR.tally(c, '7,000', g => { g.fillStyle = '#c8a060'; g.fillRect(-9, -11, 18, 22); }, 640, 120, lt, R(47, 13), { n: 14, w: 560, label: '7,000?' }); } }));
  SFX(48, 7, 'dig', .6);
  C(48, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp(lt / 1.6); DR.bpDraw(g, [[300, 520, 860, 420], [860, 420, 990, 240], [700, 455, 760, 300], [990, 240, 1030, 210]], k, { w: 9 }); },
    ui: c => { DR.write(c, 'ANTLER PICK', 400, 160, 56, lt, .3, { col: '#fff', halo: false }); DR.write(c, 'FOUND 1838', 400, 230, 40, lt, .8, { col: '#f2d23a', halo: false }); if (lt > R(49)) DR.circle(c, 760, 380, 320, 180, lt, R(49)); } }), 'flash');
  SFX(50, 6, 'boing', .5);
  C(50, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.0], [640, 300, 2.1]], dof: 6, bg: (g, t) => TS.hallstatt(g, t), act: (g, t) => head(g, 'cowie', 640, 280, .95, t, { outfit: 'explorer', hat: 'pith', face: { mouth: 'smirk', brows: 'skeptic', eyes: 'half' } }),
    ui: c => DR.callout(c, 'A GOOD GUESS', 980, 160, lt, R(50, 6)) }));
  mood(51, 'adventure'); SFX(51, null, 'whoosh', .6); AMB(51, 'cave', 26, .7);
  C(51, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.08]], bg: (g, t) => TS.mine(g, t), crowd: (t2, l2) => [['miner', 300, 560, .5, { spr: { pose: 'cheer' } }], ['miner2', 980, 700, .55, { spr: { prop: 'torch' } }], ['miner', 760, 600, .45, { walk: true, spr: { turn: .7 } }]],
    atm: { dust: 40, warm: .2 }, ui: c => DR.banner(c, 'THE BRONZE AGE', 640, 130, lt, R(51, 6), { col: '#a8682a' }) }), 'ink');
  C(52, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.3], [640, 400, 1.4]], bg: (g, t) => TS.mine(g, t), act: (g, t) => { P(g, 'cowie', 440, 760, .85, t, { outfit: 'explorer', hat: 'pith', pose: 'magnify', prop: 'none', face: { mouth: 'o', brows: 'up', eyes: 'wide' } }); P(g, 'excavator', 860, 760, .85, t, { pose: 'present', face: { mouth: 'grin', brows: 'up' } }); },
    ui: c => DR.callout(c, 'NATURAL HISTORY MUSEUM VIENNA', 640, 120, lt, R(52, 3), null, null, { size: 26 }) }));
  SFX(52, 9, 'boom', .5);
  C(52, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.05]], bg: g => { DR.sunburst(g, t, '#c88a3a', '#e8b866'); }, crowd: DR.army(100, 420, 1180, 700, 34, ['miner', 'miner2'], .28, .42, 9, { walk: true, spr: { pose: 'cheer' } }), ui: c => DR.banner(c, 'INDUSTRIAL SCALE', 640, 130, lt, .1) }), 'whip');
  SFX(53, null, 'drop', .6);
  C(53, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 200, 1.0], [640, 520, 1.0], 'inOut'], bg: g => { g.fillStyle = '#2a2018'; g.fillRect(-200, -200, 1700, 1300); for (let y = -100; y < 900; y += 26) { g.fillStyle = y % 52 ? '#4a3a2a' : '#5a4632'; g.fillRect(-200, y, 1700, 26); } sh(g, '#140e0a', 4, c => c.rect(560, -200, 160, 1300)); for (let y = -100; y < 900; y += 90) ln(g, [[560, y], [720, y]], 8, '#6a4a2a'); },
    act: (g, t) => { const y = lerp(150, 620, clamp(lt / 1.8)); ln(g, [[640, -200], [640, y - 80]], 4, '#a88a5a'); P(g, 'miner', 640, y, .35, t, { pose: 'cheer', face: { mouth: 'o', eyes: 'wide' } }); },
    ui: c => { DR.tally(c, '100 m+', g => { g.fillStyle = '#7a5a3a'; g.fillRect(-4, -12, 8, 24); }, 980, 600, lt, .2, { n: 10, w: 480, label: '300 ft+' }); } }), 'whip');
  SFX(53, 4, 'pop', .5); SFX(54, null, 'pop', .5); SFX(55, null, 'pop', .5);
  C(53, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.03]], bg: g => { g.fillStyle = '#e8d8b0'; g.fillRect(-200, -200, 1700, 1100); G.Paint2.grain(g, -200, -200, 1700, 1100, .3, 3, 'multiply', 1.3); },
    act: (g, t) => { const k1 = clamp(lt / .4), k2 = clamp((lt - R(54)) / .4), k3 = clamp((lt - R(55)) / .4);   // the finds laid out on museum paper
      if (k1 > 0) { g.save(); g.translate(330, 380); g.scale(k1, k1); hand(g, 0, 0, 1.0, -.2, '#8a5a34', { cuff: '#6a4224' }); g.restore(); }
      if (k2 > 0) { g.save(); g.translate(660, 380); g.scale(k2, k2); for (let i = 0; i < 4; i++) { g.strokeStyle = '#2a1a10'; g.lineWidth = 34; g.beginPath(); g.ellipse(0, i * 30 - 45, 140, 40, 0, 0, TAU); g.stroke(); g.strokeStyle = '#b8945a'; g.lineWidth = 24; g.stroke(); } g.restore(); }
      if (k3 > 0) { g.save(); g.translate(980, 380); g.scale(k3, k3); for (let i = 0; i < 9; i++) { g.save(); g.rotate(-.6 + i * .15); ln(g, [[0, 120], [0, -120]], 16, '#2a1a10'); ln(g, [[0, 120], [0, -120]], 9, '#a8783e'); g.fillStyle = '#1e1612'; g.beginPath(); g.ellipse(0, -122, 9, 18, 0, 0, TAU); g.fill(); g.restore(); } g.restore(); } },
    ui: c => { DR.write(c, 'LEATHER GLOVE', 330, 600, 32, lt, .1); if (lt > R(54)) DR.write(c, 'ROPE · THICK AS A FIST', 660, 600, 30, lt, R(54)); if (lt > R(55)) DR.write(c, 'MILLIONS OF TORCHES', 980, 600, 30, lt, R(55)); } }), 'flash');
  SFX(56, null, 'creak', .7); SFX(56, 5, 'sparkle', .5);
  C(56, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 430, 1.0], [720, 440, 1.5]], bg: (g, t) => TS.mine(g, t, { stair: clamp(lt / 1.5) }), atm: { dust: 40, warm: .2 } }), 'dissolve');
  C(56, 6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp(lt / 1.4), s = []; for (let i = 0; i < 9; i++) { const x = 400 + i * 50, y = 260 + i * 40; s.push([x, y, x + 46, y], [x + 46, y, x + 46, y + 40]); } s.push([380, 250, 860, 640], [380, 290, 860, 680]); DR.bpDraw(g, s, k, { w: 5 }); },
    ui: c => { DR.write(c, 'TREE-RING DATED', 960, 170, 40, lt, .2, { col: '#fff', halo: false }); DR.write(c, '≈ 3,300 YEARS OLD', 960, 240, 44, lt, .7, { col: '#f2d23a', halo: false }); } }), 'flash');
  SFX(57, 5, 'tada', .6);
  C(57, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 430, 1.05]], bg: (g, t) => { DR.sunburst(g, t, '#c88a3a', '#f0c070'); sh(g, '#7a6a5a', 5, c => c.ellipse(640, 640, 300, 50, 0, 0, TAU)); }, act: (g, t) => { g.save(); g.translate(640, 640); g.scale(.7, .7); g.translate(-700, -620); const s = []; for (let i = 0; i < 9; i++) { const x = 520 + i * 42, y = 300 + i * 34; sh(g, '#b8884a', 3, c => c.rect(x, y, 46, 16)); } for (const dy of [0, 26]) { ln(g, [[500, 296 + dy], [900, 610 + dy]], 22, '#2a1a0e'); ln(g, [[500, 296 + dy], [900, 610 + dy]], 14, '#a8783e'); } g.restore(); },
    atm: { dust: 20 }, ui: c => DR.banner(c, "EUROPE'S OLDEST WOODEN STAIRCASE", 640, 130, lt, .2, { size: 32 }) }));
  SFX(58, null, 'pop', .4);
  C(58, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 450, 2.2], [700, 460, 2.4]], dof: 3, bg: (g, t) => TS.mine(g, t, { stair: 1 }), ui: c => { DR.callout(c, 'SALT PRESERVES WOOD', 640, 140, lt, .2); if (lt > R(59)) DR.callout(c, '"USED LAST TUESDAY"', 640, 600, lt, R(59) + .5, null, null, { fill: '#fff3c8' }); } }));
  mood(60, 'warm'); SFX(60, 6, 'sparkle', .5);
  C(60, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 440, 1.1]], bg: (g, t) => { TS.hallstatt(g, t, { v: 'dusk' }); }, act: (g, t) => { for (const [x, y] of [[300, 640], [470, 660], [820, 650], [1000, 640]]) { sh(g, '#7a7468', 3, c => { c.moveTo(x - 26, y); c.lineTo(x - 26, y - 50); c.quadraticCurveTo(x, y - 76, x + 26, y - 50); c.lineTo(x + 26, y); c.closePath(); }); } }, atm: { warm: .3 },
    ui: c => DR.callout(c, 'THE GRAVEYARD', 640, 140, lt, .3, 640, 600) }), 'dissolve');
  C(60, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.08]], bg: g => { g.fillStyle = '#3a2a1e'; g.fillRect(-200, -200, 1700, 1100); g.fillStyle = '#5a4430'; g.fillRect(200, 200, 880, 360); },
    act: (g, t) => { g.strokeStyle = '#1e1612'; g.lineWidth = 16; g.lineCap = 'round'; for (const sx of [-1, 1]) { g.beginPath(); for (let a = 0; a < 14; a += .1) { const r = 6 + a * 6; g.lineTo(560 + sx * 90 + Math.cos(a) * r * sx, 380 + Math.sin(a) * r); } g.stroke(); }
      g.strokeStyle = '#d8a84a'; g.lineWidth = 9; for (const sx of [-1, 1]) { g.beginPath(); for (let a = 0; a < 14; a += .1) { const r = 6 + a * 6; g.lineTo(560 + sx * 90 + Math.cos(a) * r * sx, 380 + Math.sin(a) * r); } g.stroke(); }
      g.lineWidth = 18; g.strokeStyle = '#1e1612'; g.beginPath(); g.ellipse(880, 390, 90, 64, 0, 0, TAU); g.stroke(); g.lineWidth = 10; g.strokeStyle = '#e8b85a'; g.stroke(); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 700, 380, 300, 'rgba(255,200,100,.25)'); g.restore(); },
    atm: { dust: 30 }, ui: c => DR.callout(c, 'EXPENSIVE BRONZE', 640, 600, lt, .3, 700, 420) }), 'flash');
  SFX(61, 6, 'cash', .7);
  C(61, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 380, 1.1]], bg: (g, t) => TS.hallstatt(g, t), crowd: DR.army(200, 620, 1100, 700, 12, ['miner', 'miner2'], .34, .44, 3, { spr: { pose: 'cheer' } }), act: (g, t) => { for (let i = 0; i < 18; i++) { const u = (lt * .7 + i / 18) % 1; sh(g, '#e8c45a', 2.5, c => c.ellipse(100 + (i * 71) % 1080, -40 + u * 760, 14, 6, u * 6, 0, TAU)); } },
    ui: c => DR.banner(c, 'HALLSTATT GOT RICH', 640, 130, lt, R(61, 6) - .3, { col: '#2a8a52' }) }));
  SFX(62, null, 'machine', .6, 2);
  C(62, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: g => DR.sunburst(g, t, '#e8b040', '#f6d888'), act: (g, t) => { g.save(); g.translate(640, 440); sh(g, '#8a6a4a', 6, c => c.roundRect(-170, -130, 340, 230, 22)); sh(g, '#c8a060', 4, c => c.roundRect(-120, -95, 240, 70, 12)); g.font = DR.MK(40); g.fillStyle = '#3a2618'; g.textAlign = 'center'; g.fillText('SALT → $', 0, -45);
      for (const gx of [-90, 90]) { g.save(); g.translate(gx, 40); g.rotate(t * 3 * (gx > 0 ? 1 : -1)); for (let i = 0; i < 8; i++) { g.rotate(TAU / 8); g.fillStyle = '#5a4a3a'; g.fillRect(-6, 26, 12, 14); } sh(g, '#7a6a5a', 3, c => c.arc(0, 0, 30, 0, TAU)); g.restore(); }
      for (let i = 0; i < 8; i++) { const u = (t * 1.2 + i / 8) % 1; sh(g, '#fbfbf8', 2, c => c.rect(-330 + u * 160, -40 + Math.sin(i) * 30, 14, 14)); sh(g, '#e8c45a', 3, c => c.ellipse(180 + u * 160, 40 + u * 60 - Math.sin(u * PI) * 90, 18, 8, 0, 0, TAU)); } g.restore(); },
    ui: c => { DR.callout(c, 'SALT IN', 230, 200, lt, .1, 360, 400); if (lt > R(63)) DR.callout(c, 'MONEY OUT', 1050, 200, lt, R(63), 900, 470, { fill: '#fff3c8' }); } }), 'flash');
  mood(64, 'busy'); EP.count(1, 64, .2);
  C(64, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 420, 1.06]], bg: (g, t) => TS.mine(g, t), act: (g, t) => { P(g, 'miner', 230, 760, .82, t, { pose: 'cheer', prop: 'none', face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); P(g, 'miner2', 1050, 760, .82, t + 1, { pose: 'thumbsUp', prop: 'none', face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => EP.refrainSalt(c, lt, .1, { y: 120, gap: R(65) - .1 }) }));
})(window);
