/* "It's About Salt" remake — BEAT 3 (lines 66–89: Han China, Emperor Wu, the merchants, the skit, the monopoly · counter 2)
 * + BEAT 4a (90–112: the side effect, the 81 BC debate, Huan Kuan, who won, Sang's fall, 2,000 years) + BEAT 4b (113–121: the Via Salaria). */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, K = G.VK, { W, H, clamp, lerp, rng } = T;
  const { sh, ln, circ } = G.Paint, TAU = Math.PI * 2, PI = Math.PI;
  const { C, P, head, SFX, AMB, say } = G, L = G.L, mood = EP.mood;
  const HAN = [[98, 41], [106, 41.5], [114, 41], [120, 40.5], [123, 39], [121, 36.5], [122, 32], [121, 28], [118, 24], [111, 21.5], [108, 22.5], [103, 24], [101, 28], [100, 33], [97, 36], [96, 39]];
  const XN = [[92, 50], [104, 51], [116, 49], [122, 45], [118, 42.5], [108, 42.2], [100, 42.5], [92, 44]];
  const nomad = { outfit: 'briton', hat: 'furCap', look: { skin: '#d8a27c', hairCol: '#2a1e16', beard: 'moustache', beardCol: '#2a1e16' } };
  G.CW.nomad = nomad; G.CW.cousin = { outfit: 'hanRed', hat: 'guan', look: { skin: '#eec49c', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410', width: 1.1 } };
  G.CW.uncle = { outfit: 'suit', hat: 'none', look: { skin: '#f0c8a8', hair: 'bald', hairCol: '#8a7a6a', beard: 'moustache', beardCol: '#8a7a6a', width: 1.25 } };
  // ---------- props ----------
  const ingot = (g, x, y, s = 1) => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#6a6e78', 4, c => { c.moveTo(-60, 0); c.lineTo(60, 0); c.lineTo(44, -34); c.lineTo(-44, -34); c.closePath(); }); g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(-36, -30, 50, 6); g.restore(); };
  const chest = (g, x, y, s, open, t) => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#6a3a22', 5, c => c.rect(-120, -110, 240, 110)); sh(g, '#d8a83a', 3, c => c.rect(-124, -62, 248, 14)); if (open) { sh(g, '#1e1208', 4, c => c.rect(-110, -104, 220, 30)); sh(g, '#7a4428', 5, c => { c.moveTo(-120, -110); c.lineTo(120, -110); c.lineTo(110, -230); c.lineTo(-110, -230); c.closePath(); }); } else sh(g, '#7a4428', 5, c => c.roundRect(-126, -150, 252, 46, 18)); g.restore(); };
  const moth = (g, x, y, t) => { g.save(); g.translate(x, y); const f = Math.sin(t * 30) * .6; for (const sd of [-1, 1]) { g.save(); g.scale(sd, 1); g.rotate(f); sh(g, '#c8b89a', 2.5, c => c.ellipse(16, -6, 18, 12, -.3, 0, TAU)); g.restore(); } sh(g, '#7a6a5a', 2, c => c.ellipse(0, 0, 5, 12, 0, 0, TAU)); g.restore(); };
  const jar = (g, x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#a8603a', 4.5, c => { c.moveTo(-30, -60); c.quadraticCurveTo(-70, 0, -40, 50); c.lineTo(40, 50); c.quadraticCurveTo(70, 0, 30, -60); c.closePath(); }); sh(g, '#7a4428', 3.5, c => c.rect(-24, -76, 48, 18)); g.font = '700 26px serif'; g.fillStyle = '#f2e6cc'; g.textAlign = 'center'; g.fillText('酒', 0, 10); g.restore(); };
  const shards = (g, x, y, k) => { const r = rng(9); for (let i = 0; i < 9; i++) { const a = r() * PI, d = k * (60 + r() * 120); g.save(); g.translate(x + Math.cos(a) * d * (r() < .5 ? -1 : 1), y - Math.sin(a) * d * .3); g.rotate(r() * 6); sh(g, '#a8603a', 3, c => { c.moveTo(-14, -10); c.lineTo(16, -6); c.lineTo(4, 14); c.closePath(); }); g.restore(); } g.fillStyle = 'rgba(160,40,60,.5)'; g.beginPath(); g.ellipse(x, y + 4, 90 * k, 16 * k, 0, 0, TAU); g.fill(); };
  function split(ctx, lt, dur, t, A, B) { for (const [side, spec] of [[0, A], [1, B]]) { ctx.save(); ctx.beginPath(); ctx.rect(side * 640, 0, 640, 720); ctx.clip(); ctx.translate(side ? 320 : -320, 0); DR.shot(ctx, lt, dur, t, spec); ctx.restore(); }
    ctx.save(); ctx.fillStyle = '#1e1612'; ctx.fillRect(634, 0, 12, 720); ctx.restore(); }
  function screen(g, t, sil) {   // a lamp-lit paper screen (shoji) with silhouettes acted out behind it
    g.fillStyle = '#3a2416'; g.fillRect(-200, -200, 1700, 1100); g.fillStyle = '#f2c27a'; g.fillRect(80, 40, 1120, 560); const gr = g.createRadialGradient(640, 300, 50, 640, 300, 700); gr.addColorStop(0, 'rgba(255,240,200,.6)'); gr.addColorStop(1, 'rgba(120,60,20,.5)'); g.fillStyle = gr; g.fillRect(80, 40, 1120, 560);
    g.save(); g.beginPath(); g.rect(80, 40, 1120, 560); g.clip(); g.filter = 'blur(3px)'; g.fillStyle = 'rgba(60,30,14,.85)'; sil(g, t); g.filter = 'none'; g.restore();
    g.strokeStyle = '#3a2416'; g.lineWidth = 10; for (let x = 80; x <= 1200; x += 140) { g.beginPath(); g.moveTo(x, 40); g.lineTo(x, 600); g.stroke(); } for (let y = 40; y <= 600; y += 140) { g.beginPath(); g.moveTo(80, y); g.lineTo(1200, y); g.stroke(); }
    g.fillStyle = '#5a3a22'; g.fillRect(-200, 600, 1700, 400); }
  const silFig = (g, x, y, s, o = {}) => { g.save(); g.translate(x, y); g.scale(s, s); g.beginPath(); g.arc(0, -560, 70, 0, TAU); g.fill(); if (o.cap) { g.fillRect(-46, -660, 92, 40); g.fillRect(-6, -700, 12, 50); } g.beginPath(); g.moveTo(-90, -480); g.lineTo(90, -480); g.lineTo(120, 0); g.lineTo(-120, 0); g.closePath(); g.fill(); if (o.spear) { g.fillRect(110, -760, 10, 760); g.beginPath(); g.moveTo(100, -760); g.lineTo(115, -820); g.lineTo(130, -760); g.fill(); } g.restore(); };
  function turkey(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#f4f4f0', 4, c => c.ellipse(0, 10, 160, 30, 0, 0, TAU)); sh(g, '#c8783a', 5, c => c.ellipse(0, -40, 110, 70, 0, 0, TAU)); for (const sd of [-1, 1]) { sh(g, '#b8682a', 4, c => c.ellipse(sd * 90, -30, 40, 24, sd * .5, 0, TAU)); sh(g, '#fbf8ee', 3, c => c.ellipse(sd * 130, -44, 14, 10, 0, 0, TAU)); } g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(-30, -70, 40, 16, -.3, 0, TAU); g.fill(); g.restore(); }
  const nomadArmy = (seed, n, x0, x1, y0, y1, flip) => DR.army(x0, y0, x1, y1, n, ['nomad'], .26, .38, seed, { walk: true, flip, spr: { turn: flip ? -.7 : .7, pose: 'cheer' } });

  // ===================== BEAT 3 — Han China =====================
  mood(66, 'adventure'); SFX(66, null, 'whoosh', .6); SFX(66, null, 'paper', .5);
  C(66, null, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, 112, 36, 8], [2.4, 110, 35, 13]]); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, HAN, '#c8281e', .35 * clamp((lt - 1) / .6)); }, act: () => DR.mapPin(ctx, v, 108.9, 34.3, lt, .8),
    ui: c => DR.mapWrite(c, v, 108.9, 34.3, 'HAN CHINA', lt, .9, { dy: 70, date: 'c. 100 BC' }) }); }, 'ink');
  AMB(66, 'court', 10, .6); SFX(66, 9, 'gong', .5);
  C(66, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 400, 1.08]], bg: (g, t) => TS.hanCourt(g, t, { guards: false }), crowd: DR.army(120, 560, 1160, 700, 30, ['hanAdv', 'scholar', 'huan', 'sang'], .26, .36, 11, { spr: { pose: 'bow' } }), atm: { warm: .2, dust: 30 },
    ui: c => DR.banner(c, 'THE HAN DYNASTY', 640, 130, lt, .1) }));
  C(67, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.2], [640, 330, 1.5]], dof: 2, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), crowd: DR.army(100, 640, 1180, 700, 16, ['hanAdv', 'scholar'], .34, .4, 12, { spr: { pose: 'bow' } }),
    act: (g, t) => P(g, 'wudi', 640, 470, .62, t, { pose: 'hips', face: { mouth: 'smirk', brows: 'sly', eyes: 'half' } }), atm: { glare: [640, 120, 300], warm: .2 } }));
  SFX(67, 5, 'sting', .5);
  C(67, 5, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.3], [640, 290, 2.45]], dof: 7, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => head(g, 'wudi', 640, 270, 1.0, t, { face: { mouth: 'smirk', brows: 'sly', eyes: 'half', look: [.3, 0] } }), atm: { warm: .2 },
    ui: c => { DR.write(c, 'EMPEROR WU', 300, 200, 56, lt, .1, { col: '#fff', halo: '#1e1612' }); DR.write(c, 'HAN WUDI', 300, 270, 40, lt, .5, { col: '#f2d23a', halo: '#1e1612' }); } }));
  SFX(68, null, 'card', .7);
  C(68, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[520, 380, 1.4], [520, 380, 1.5]], dof: 3, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => P(g, 'wudi', 420, 760, .85, t, { pose: 'thumbsUp', face: { mouth: 'grin', eyes: 'happy' } }),
    ui: c => DR.statCard(c, { name: 'EMPEROR WU', cls: 'RULED 54 YEARS', who: 'wudi', stats: [['AMBITION', 5], ['WARS', 5], ['PATIENCE', 1]] }, 940, 360, lt, .1) }));
  SFX(68, 5, 'pencil', .5, 1.4);
  C(68, 5, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { DR.bpDraw(g, [[180, 380, 1100, 380], [180, 340, 180, 420], [1100, 340, 1100, 420]], clamp(lt / 1.4), { w: 6 }); for (let i = 0; i < 9; i++) { const k = clamp(lt * 2 - i * .15); if (k > 0) ln(g, [[180 + i * 115, 370], [180 + i * 115, 390]], 4, '#f2d23a'); } },
    ui: c => { DR.write(c, '141 BC', 220, 300, 46, lt, .1, { col: '#fff', halo: false }); DR.write(c, '87 BC', 1060, 300, 46, lt, .9, { col: '#fff', halo: false }); DR.write(c, '54 YEARS', 640, 470, 70, lt, 1.2, { col: '#f2d23a', halo: false }); } }), 'flash');
  mood(69, 'danger'); AMB(69, 'battle', 7, .8); SFX(69, 6, 'drum', .7);
  C(69, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.1]], shake: .5, bg: (g, t) => { G.ES.skyFor(g, 'gold'); G.Paint.hills(g, 360, [[-220, 330], [300, 290], [700, 320], [1100, 280], [1500, 320]], '#c8a870', '#a88850', 2); g.fillStyle = '#c8b078'; g.fillRect(-220, 360, 1720, 400); },
    crowd: (t2, l2) => [...DR.army(-40 + l2 * 40, 470, 560 + l2 * 40, 700, 34, ['hanAdv', 'sang', 'hanAdv'], .26, .4, 3, { walk: true, spr: { turn: .7, outfit: 'hanRed', prop: 'none' } }), ...nomadArmy(4, 30, 740 - l2 * 40, 1340 - l2 * 40, 500, 700, true),
      ...[0, 1, 2, 3, 4].map(i => [DR.rider('nomad', { dir: -1, coat: ['#5a4a3a', '#8a6a4a', '#3a2a1e'][i % 3], blanket: '#3a6a4a' }), 800 + i * 120 - l2 * 50, 462 + (i % 2) * 16, .2, {}])], atm: { dust: 90, haze: .25, warm: .25 }, fg: { kind: 'spears', n: 5, blur: 4, seed: 6, drift: 40 } }), 'whip');
  SFX(70, null, 'march', .6, 4);
  C(70, null, (ctx, lt, dur, t, R) => { const v = M.view(108, 41, 11); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, HAN, '#c8281e', .3); M.zone(g, v, XN, '#3a6a8a', .35 * clamp(lt / .5), { hatch: true }); },
    act: (g, t) => { for (let i = 0; i < 4; i++) { const k = clamp((lt - .5 - i * .3) / 1.6); if (k > 0) M.route(g, v, [[100 + i * 6, 47], [101 + i * 6, 44], [102 + i * 6, 41]], k, { w: 7, col: '#2a4a6a' }); DR.mapArmy(g, v, 100 + i * 6, 47 - 4 * k, ['nomad'], 4, lt, .3 + i * .2, { s: .1, walk: true }); } },
    ui: c => { DR.mapWrite(c, v, 106, 47.5, 'XIONGNU', lt, .2, { dy: -70, size: 50 }); DR.mapWrite(c, v, 110, 33, 'HAN', lt, .1, { dy: 0, size: 44 }); if (lt > R(70, 3)) DR.callout(c, 'RAIDING THE BORDER', 1000, 600, lt, R(70, 3)); } }); });
  mood(71, 'comic'); SFX(71, null, 'creak', .6); SFX(71, 2, 'fly', .4, 1.5);
  C(71, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 520, 2.0], [640, 500, 2.2]], dof: 6, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => { chest(g, 640, 640, 1, lt > .3, t); if (lt > .5) moth(g, 640 + Math.sin(t * 3) * 60, 480 - (lt - .5) * 80, t); },
    ui: c => DR.write(c, 'WARS ARE EXPENSIVE', 640, 140, 60, lt, .1, { col: '#fff', halo: '#1e1612' }) }));
  SFX(72, 4, 'ding', .6);
  C(72, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.5]], dof: 7, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => head(g, 'wudi', 640, 270, 1.0, t, { pose: 'think', face: { mouth: 'flat', eyes: 'half', brows: 'sly', look: [.7, -.1] } }), atm: { dark: clamp((lt - .6) / .6) * .35 },
    ui: c => DR.exclaim(c, 830, 150, lt, R(72, 4)) }));
  mood(73, 'curious'); SFX(73, null, 'whoosh', .4);
  C(73, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: (g, t) => TS.hanCourt(g, t, { guards: false }), crowd: DR.army(140, 600, 1140, 700, 14, ['cousin', 'sang', 'cousin'], .4, .46, 5, { spr: { pose: 'hips', face: { mouth: 'smirk', eyes: 'half' } } }),
    ui: c => { DR.callout(c, 'THE RICHEST?', 640, 130, lt, .2); DR.callout(c, 'NOBLES', 300, 260, lt, R(73, 9) - .6, 400, 420); if (lt > R(73, 9)) { c.save(); c.strokeStyle = '#e0261c'; c.lineWidth = 16; c.lineCap = 'round'; const k = clamp((lt - R(73, 9)) / .3); c.beginPath(); c.moveTo(200, 300); c.lineTo(200 + 900 * k, 300 + 300 * k); c.stroke(); c.restore(); } } }), 'whip');
  SFX(74, null, 'tada', .7); SFX(74, null, 'coins', .6);
  C(74, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.05]], bg: (g, t) => { DR.sunburst(g, t, '#d8a840', '#f6d88a'); sh(g, '#8a7a5a', 5, c => c.ellipse(640, 680, 300, 50, 0, 0, TAU)); }, act: (g, t) => { TS.saltHeap(g, 480, 680, 200, 90); for (let i = 0; i < 4; i++) ingot(g, 800 + (i % 2) * 70, 680 - Math.floor(i / 2) * 34, .9); P(g, 'merchant', 640, 690, .62, t, { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy', brows: 'up' } });
      for (let i = 0; i < 14; i++) { const u = (lt * .8 + i / 14) % 1; sh(g, '#e8c45a', 2.5, c => c.ellipse(120 + (i * 83) % 1040, -40 + u * 760, 14, 6, u * 6, 0, TAU)); } }, ui: c => DR.banner(c, 'SALT & IRON MERCHANTS', 640, 120, lt, .1, { size: 38 }) }), 'flash');
  SFX(75, 4, 'clink', .6);
  C(75, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => TS.hanEstate(g, t), dof: 4, act: (g, t) => { const tilt = Math.sin(lt * 3) * .12 * Math.exp(-lt); g.save(); g.translate(640, 640); sh(g, '#8a6a3a', 4, c => c.rect(-80, 0, 160, 26)); ln(g, [[0, 0], [0, -280]], 12, '#6a4a2a'); g.translate(0, -280); g.rotate(tilt);
      ln(g, [[-260, 0], [260, 0]], 10, '#6a4a2a'); for (const sd of [-1, 1]) { g.save(); g.translate(sd * 250, 0); g.rotate(-tilt); ln(g, [[0, 0], [-70, 140]], 3, '#3a2a1a'); ln(g, [[0, 0], [70, 140]], 3, '#3a2a1a'); sh(g, '#c8a060', 4, c => c.ellipse(0, 142, 90, 18, 0, 0, TAU)); for (let i = 0; i < 12; i++) sh(g, '#e8c45a', 2.5, c => c.ellipse(-40 + (i % 4) * 26, 132 - Math.floor(i / 4) * 10, 18, 6, 0, 0, TAU)); g.restore(); } g.restore(); },
    ui: c => { DR.callout(c, 'MERCHANTS', 300, 200, lt, .2, 390, 470); DR.callout(c, "COURT'S TAX", 980, 200, lt, .5, 890, 470); if (lt > R(75, 4)) DR.callout(c, '(REPORTEDLY)', 640, 640, lt, R(75, 4), null, null, { fill: '#fff3c8', size: 26 }); } }));
  AMB(76, 'factory', 4, .6);
  C(76, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[300, 450, 1.0], [980, 450, 1.0]], bg: (g, t) => TS.hanEstate(g, t), crowd: DR.army(-100, 585, 1400, 705, 56, ['hanAdv', 'scholar', 'hanAdv'], .24, .32, 21, { walk: true, spr: { outfit: 'hanScholar', hat: 'none', turn: .5, look: { width: 1 } } }), atm: { dust: 40 },
    ui: c => DR.tally(c, '1,000+', g => { g.fillStyle = '#5a3a22'; g.beginPath(); g.arc(0, -6, 6, 0, TAU); g.fill(); g.fillRect(-6, 0, 12, 12); }, 575, 620, lt, R(76, 6), { n: 14, label: '1,000+ workers' }) }), 'whip');
  // ---------- the skit: Emperor Wu + his advisor ----------
  mood(77, 'comic'); AMB(77, 'court', 15, .5);
  const twoShot = (wuTalk, advTalk, wuFace, advFace, wuPose, advPose) => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.25], [640, 400, 1.32]], dof: 2, bg: (g, t) => TS.hanCourt(g, t, { guards: false }),
    act: (g, t) => { P(g, 'wudi', 430, 760, .85, t, { pose: wuPose || 'present', turn: .35, vis: wuTalk ? say(t) : null, face: wuFace }); P(g, 'hanAdv', 860, 760, .85, t, { pose: advPose || 'idle', turn: -.35, vis: advTalk ? say(t) : null, face: advFace }); } });
  const closeUp = (who, face, o = {}) => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[o.x || 640, 300, 2.3], [o.x || 640, 296, 2.4]], dof: 7, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => head(g, who, o.x || 640, 270, 1.0, t, { vis: say(t), turn: o.turn || 0, face, pose: o.pose }), atm: o.atm, ui: o.ui });
  C(77, null, twoShot(true, false, { mouth: 'smirk', brows: 'sly', look: [.7, 0] }, { mouth: 'flat', eyes: 'half', look: [-.6, 0] }));
  C(78, null, closeUp('hanAdv', { mouth: 'flat', eyes: 'half', brows: 'neutral', look: [-.4, 0] }, { turn: -.3 }));
  C(79, null, closeUp('wudi', { mouth: 'grin', eyes: 'wide', brows: 'up', look: [.4, 0] }, { turn: .3 }));
  SFX(80, null, 'crowd', .5, 1.6);
  C(80, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => TS.village(g, t, .6), crowd: DR.army(100, 560, 1180, 700, 26, ['peasant', 'neo1', 'neo2'], .3, .44, 31, { spr: { pose: 'shrug', outfit: 'hanScholar', hat: 'none', look: { width: 1 } } }), ui: c => DR.callout(c, 'PEASANTS', 640, 130, lt, .05) }), 'whip');
  C(80, 1, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.05]], bg: (g, t) => TS.hanEstate(g, t), crowd: DR.army(80, 540, 1200, 700, 30, ['hanAdv'], .3, .42, 33, { spr: { outfit: 'hanRed', prop: 'none', pose: 'hips' } }), ui: c => DR.callout(c, 'SOLDIERS', 640, 130, lt, .05) }), 'whip');
  SFX(81, 3, 'sting', .4);
  C(81, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[300, 420, 1.6], [300, 410, 1.75]], dof: 3, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => P(g, 'cousin', 280, 760, .85, t, { pose: 'crossed', turn: .4, face: { mouth: 'frown', brows: 'angry', eyes: 'squint', look: [.8, 0] } }), atm: { dark: .2 },
    ui: c => DR.callout(c, 'COUSIN (HATES WU)', 860, 140, lt, .3, 280, 300) }), 'whip');
  C(82, null, closeUp('hanAdv', { mouth: 'flat', eyes: 'half', brows: 'neutral', look: [-.4, .1] }, { turn: -.3 }));
  SFX(83, 3, 'sting', .7);
  C(83, null, closeUp('wudi', { mouth: 'smirk', eyes: 'half', brows: 'sly', look: [.5, .1] }, { turn: .2, atm: { dark: .4 }, ui: (c, t, lt) => DR.exclaim(c, 860, 140, lt, .8) }));
  mood(84, 'busy'); SFX(84, 2, 'stamp', .9); SFX(84, 2, 'boom', .4);
  C(84, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.1], [640, 420, 1.16]], shake: lt > R(84, 2) ? .6 : 0, bg: (g, t) => TS.hanEstate(g, t), act: (g, t) => { P(g, 'merchant', 380, 760, .8, t, { pose: 'shrug', face: { mouth: 'o', eyes: 'wide', brows: 'up', sweat: true } }); P(g, 'sang', 880, 760, .8, t, { pose: 'pointSide', turn: -.3, face: { mouth: 'grin', brows: 'sly' } }); },
    ui: c => { if (lt > R(84, 2) - .1) G.UI.sign(c, 'STATE PROPERTY', 640, 260, 52, { k: G.FX.settle(clamp((lt - R(84, 2) + .1) / .25)), rot: -.08 }); } }), 'whip');
  SFX(85, null, 'tada', .5);
  C(85, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => { DR.sunburst(g, t, '#c84a3a', '#f08a6a'); sh(g, '#7a6a5a', 5, c => c.ellipse(640, 640, 340, 54, 0, 0, TAU)); }, act: (g, t) => { TS.saltHeap(g, 520, 640, 240, 110); for (let i = 0; i < 6; i++) ingot(g, 760 + (i % 3) * 60, 640 - Math.floor(i / 3) * 34, .8); }, ui: c => DR.banner(c, 'GOVERNMENT MONOPOLY', 640, 140, lt, .1) }), 'flash');
  C(86, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 440, 1.12]], bg: (g, t) => { TS.hanEstate(g, t); }, crowd: (t2, l2) => DR.army(-60, 600, 520 + Math.min(1, l2 / 4) * 300, 700, Math.round(6 + Math.min(1, l2 / 4) * 24), ['peasant', 'neo1', 'neo2'], .34, .42, 41, { spr: { turn: .7, outfit: 'hanScholar', hat: 'none', look: { width: 1 } } }),
    act: (g, t) => { sh(g, '#c8281e', 4, c => c.rect(860, 380, 300, 60)); g.font = DR.MK(34); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('STATE STORE', 1010, 422); }, ui: c => DR.callout(c, 'THE ONLY STORE IN TOWN', 640, 120, lt, .4, 1010, 410) }), 'whip');
  SFX(86, 13, 'pop', .5);
  C(86, 13, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 500, 1.8], [640, 500, 1.9]], dof: 5, bg: (g, t) => TS.hanEstate(g, t), act: (g, t) => { TS.saltHeap(g, 520, 620, 180, 90); for (let i = 0; i < 4; i++) ingot(g, 740 + (i % 2) * 70, 620 - Math.floor(i / 2) * 34, .8); },
    ui: c => { DR.callout(c, 'SALT', 360, 200, lt, .1, 520, 560); DR.callout(c, 'IRON', 920, 200, lt, .4, 770, 580); if (lt > R(86, 18)) DR.write(c, 'CANNOT LIVE WITHOUT', 640, 640, 46, lt, R(86, 18), { col: '#c8281e' }); } }));
  SFX(87, null, 'coins', .6); SFX(87, 3, 'march', .6, 2);
  C(87, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 430, 1.0], [700, 430, 1.04]], bg: (g, t) => { G.ES.skyFor(g, 'gold'); G.Paint.hills(g, 360, [[-220, 330], [300, 290], [700, 320], [1100, 280], [1500, 320]], '#c8a870', '#a88850', 2); g.fillStyle = '#c8b078'; g.fillRect(-220, 360, 1720, 400); },
    crowd: (t2, l2) => DR.army(-200 + l2 * 60, 470, 1100 + l2 * 60, 700, 60, ['hanAdv'], .24, .38, 51, { walk: true, spr: { outfit: 'hanRed', prop: 'none', turn: .7 } }), act: (g, t) => { for (let i = 0; i < 10; i++) { const u = (lt * .9 + i / 10) % 1; sh(g, '#e8c45a', 2.5, c => c.ellipse(lerp(-60, 700, u), 160 + Math.sin(u * PI) * -60 + i * 6, 14, 6, 0, 0, TAU)); } }, atm: { dust: 60, warm: .25 },
    ui: c => DR.callout(c, 'MONOPOLY MONEY → WARS', 640, 130, lt, .2) }), 'whip');
  mood(88, 'busy'); EP.count(2, 88, .2);
  C(88, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 410, 1.05]], bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => { P(g, 'wudi', 250, 760, .85, t, { pose: 'thumbsUp', turn: .3, face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'hanAdv', 1040, 760, .85, t, { pose: 'shrug', turn: -.3, face: { mouth: 'flat', eyes: 'half' } }); },
    ui: c => EP.refrainSalt(c, lt, .1, { y: 120, gap: R(89) - .1 }) }));

  // ===================== BEAT 4a — the side effect + the 81 BC debate =====================
  mood(90, 'curious'); SFX(90, 3, 'clink', .5);
  C(90, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.7], [640, 360, 1.8]], dof: 4, bg: (g, t) => TS.hanEstate(g, t), act: (g, t) => { P(g, 'peasant', 520, 760, .85, t, { pose: 'present', prop: 'coins', outfit: 'hanScholar', hat: 'none', face: { mouth: 'grit', brows: 'worried', sweat: true } }); sh(g, '#c8a060', 4, c => c.ellipse(820, 520, 60, 14, 0, 0, TAU)); sh(g, '#fbfbf8', 2, c => c.ellipse(820, 512, 14, 6, 0, 0, TAU)); },
    ui: c => DR.callout(c, 'A SIDE EFFECT', 960, 140, lt, .3) }), 'whip');
  SFX(91, null, 'coins', .5); SFX(91, 6, 'buzz', .4);
  C(91, null, (ctx, lt, dur, t, R) => split(ctx, lt, dur, t, { cam: [[640, 380, 1.4], [640, 380, 1.45]], dof: 3, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => { P(g, 'sang', 640, 760, .85, t, { pose: 'cheer', prop: 'coins', face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); }, atm: { warm: .2 } },
    { cam: [[640, 380, 1.4], [640, 380, 1.45]], dof: 3, bg: (g, t) => TS.village(g, t, .4), act: (g, t) => { P(g, 'peasant', 640, 760, .85, t, { pose: 'shrug', outfit: 'hanScholar', hat: 'none', face: { mouth: 'frown', brows: 'worried', eyes: 'closed', sweat: true } }); }, atm: { cold: .25 } }) ||
    G.UI.sign(ctx, 'GOVERNMENT: GREAT', 320, 120, 34, { k: 1, fill: '#2a8a52' }) || (lt > R(91, 6) && G.UI.sign(ctx, 'BUYER: TERRIBLE', 960, 120, 34, { k: G.FX.settle(clamp((lt - R(91, 6)) / .3)) })));
  mood(92, 'quiet'); SFX(92, null, 'bell', .5);
  C(92, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.3], [640, 380, 1.45]], bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => { for (const x of [520, 760]) { ln(g, [[x, 420], [x, 340]], 8, '#e8dcc0'); G.Paint2.fire(g, x, 340, .25, t + x); } }, atm: { night: .35, embers: 0 },
    ui: c => { DR.write(c, 'EMPEROR WU DIES', 640, 140, 50, lt, .2, { col: '#fff', halo: '#1e1612' }); DR.write(c, '87 BC', 640, 210, 40, lt, .6, { col: '#f2d23a', halo: '#1e1612' }); } }), 'dip');
  SFX(92, 5, 'whoosh', .5);
  C(92, 5, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: g => DR.sunburst(g, t, '#7a4ac8', '#a88ae8'), ui: c => { DR.write(c, '81 BC', 640, 300, 140, lt, .05, { col: '#fff', halo: '#1e1612', underline: '#f2d23a' }); if (lt > R(92, 9)) DR.callout(c, 'SOMETHING WILD', 640, 520, lt, R(92, 9)); } }));
  mood(93, 'busy'); AMB(93, 'crowd', 4, .7); SFX(93, null, 'drum', .5);
  C(93, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.08]], bg: (g, t) => TS.debate(g, t, { score: [0, 0] }), crowd: [...DR.army(-80, 610, 1360, 720, 34, ['hanAdv', 'scholar', 'huan', 'peasant'], .4, .5, 61, { spr: { turn: 0, face: { look: [0, -.4] }, outfit: undefined } })],
    act: (g, t) => { P(g, 'sang', 300, 560, .55, t, { pose: 'hips', turn: .4 }); P(g, 'scholar', 980, 560, .55, t, { pose: 'crossed', turn: -.4 }); }, ui: c => DR.banner(c, 'THE GREAT SALT DEBATE', 640, 650, lt, .3, { size: 36 }) }), 'ink');
  C(94, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[420, 380, 1.6], [400, 380, 1.7]], dof: 4, bg: (g, t) => TS.debate(g, t, { score: [0, 0] }), act: (g, t) => P(g, 'sang', 400, 760, .85, t, { pose: 'hips', turn: .3, face: { mouth: 'smirk', brows: 'sly' } }), ui: c => DR.callout(c, 'SANG HONGYANG', 900, 160, lt, .1, 400, 300) }));
  SFX(95, null, 'card', .7);
  C(95, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[420, 380, 1.6], [420, 380, 1.65]], dof: 6, bg: (g, t) => TS.debate(g, t, { score: [0, 0] }), act: (g, t) => P(g, 'sang', 330, 760, .85, t, { pose: 'present', turn: .3, prop: 'coins', face: { mouth: 'grin', brows: 'up' } }),
    ui: c => DR.statCard(c, { name: 'SANG HONGYANG', cls: 'CLASS: MONEY GUY', who: 'sang', stats: [['MATHS', 5], ['MONOPOLIES', 5], ['CHARM', 1]] }, 900, 370, lt, .1) }));
  C(96, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[860, 400, 1.5], [880, 400, 1.6]], dof: 3, bg: (g, t) => TS.debate(g, t, { score: [0, 0] }), crowd: [['scholar', 700, 720, .7, { spr: { pose: 'crossed', turn: -.3 } }], ['scholar', 1060, 720, .7, { spr: { pose: 'think', turn: -.4 } }]], act: (g, t) => P(g, 'scholar', 880, 760, .85, t, { pose: 'pointSideL', turn: -.3, face: { mouth: 'grit', brows: 'worried' } }),
    ui: c => DR.callout(c, 'CONFUCIAN SCHOLARS', 400, 140, lt, .2, 880, 300) }));
  C(97, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.village(g, t, .3), act: (g, t) => head(g, 'peasant', 640, 270, 1.0, t, { outfit: 'hanScholar', hat: 'none', face: { mouth: 'frown', brows: 'worried', eyes: 'open', sweat: true } }), atm: { cold: .2 },
    ui: c => DR.callout(c, 'POORER', 980, 160, lt, R(97, 6) - .3) }), 'whip');
  SFX(97, 10, 'footsteps', .5, 2);
  C(97, 10, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [700, 420, 1.0]], bg: (g, t) => TS.village(g, t, .4), crowd: (t2, l2) => DR.army(300 + l2 * 90, 600, 700 + l2 * 90, 690, 8, ['peasant', 'neo1', 'neo2'], .3, .38, 71, { walk: true, flip: false, spr: { turn: .8, outfit: 'hanScholar', hat: 'none', look: { width: 1 } } }),
    act: (g, t) => { for (let i = 0; i < 3; i++) { g.save(); g.translate(200 + i * 120, 640); g.rotate(-.3); ln(g, [[0, 0], [90, -40]], 8, '#6a4a2a'); g.restore(); } }, ui: c => DR.callout(c, 'FARMERS LEAVE THEIR LAND', 640, 130, lt, .2) }));
  mood(98, 'warm'); SFX(98, null, 'pencil', .5, 2);
  C(98, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.3], [640, 440, 1.4]], dof: 3, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), act: (g, t) => { sh(g, '#6a3a22', 4, c => c.rect(420, 600, 440, 30)); sh(g, '#e8d8b0', 3, c => c.rect(520, 580, 240, 24)); P(g, 'huan', 640, 760, .7, t, { pose: { L: [-80, -200], R: [60, -260], hL: 'rest', hR: 'hold' }, prop: 'none', face: { mouth: 'smile', eyes: 'half', look: [.2, .6] } }); ln(g, [[700, 560], [740, 600]], 4, '#2a1a10'); G.Paint2.fire(g, 900, 590, .2, t); },
    atm: { night: .3 }, ui: c => DR.callout(c, 'HUAN KUAN', 300, 160, lt, .3, 640, 330) }), 'dissolve');
  SFX(99, null, 'paper', .7);
  C(99, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.05]], bg: g => { g.fillStyle = '#4a2a18'; g.fillRect(-200, -200, 1700, 1100); }, act: (g, t) => { const k = ease(clamp(lt / .8)), w = 700 * k; sh(g, '#e8d8b0', 4, c => c.rect(640 - w / 2, 220, w, 320)); for (const sd of [-1, 1]) sh(g, '#8a5a2e', 4, c => c.roundRect(640 + sd * w / 2 - 20, 200, 40, 360, 14)); if (k > .9) { g.font = '700 40px serif'; g.fillStyle = '#2a1a10'; g.textAlign = 'center'; g.fillText('鹽 鐵 論', 640, 300); } },
    ui: c => { if (lt > .8) { DR.write(c, 'DISCOURSES ON', 640, 380, 44, lt, .8); DR.write(c, 'SALT AND IRON', 640, 450, 54, lt, 1.2, { col: '#c8281e' }); } } }));
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  C(100, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 420, 1.1]], bg: g => { g.fillStyle = '#3a2416'; g.fillRect(-200, -200, 1700, 1100); for (let i = 0; i < 12; i++) { const x = 300 + (i % 4) * 180, y = 600 - Math.floor(i / 4) * 70; sh(g, '#d8c8a0', 3, c => c.rect(x - 80, y - 60, 160, 60)); sh(g, '#7a4a2a', 3, c => c.roundRect(x - 90, y - 66, 18, 72, 6)); sh(g, '#7a4a2a', 3, c => c.roundRect(x + 72, y - 66, 18, 72, 6)); } },
    atm: { dust: 50, warm: .2 }, ui: c => DR.banner(c, 'ONE OF THE OLDEST ARGUMENTS', 640, 140, lt, .2, { size: 34 }) }));
  SFX(100, 13, 'crowd', .4, 2.5); SFX(100, 15, 'boing', .4);
  C(100, 13, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.1], [640, 420, 1.16]], shake: .3, bg: (g, t) => TS.kitchen(g, t, { shaker: false }), act: (g, t) => { sh(g, '#a86a3a', 5, c => c.rect(200, 540, 880, 40)); turkey(g, 640, 540, .9); P(g, 'uncle', 420, 760, .8, t, { pose: 'pointSide', turn: .3, vis: Math.abs(Math.sin(t * 11)) * .8 > .4 ? say(t) : say(t), face: { mouth: 'grit', brows: 'angry', eyes: 'squint', sweat: true } }); P(g, 'viewer', 900, 760, .8, t, { pose: 'facepalm', turn: -.3, prop: 'none', face: { mouth: 'flat', eyes: 'closed' } }); },
    atm: { warm: .25 }, ui: c => DR.callout(c, 'YOUR UNCLE · THANKSGIVING', 640, 120, lt, .2, 420, 300) }), 'whip');
  SFX(101, null, 'creak', .4);
  C(101, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: (g, t) => TS.village(g, t, .2), act: (g, t) => { ln(g, [[640, 720], [640, 220]], 16, '#5a3a22'); for (const [sd, y, txt] of [[-1, 280, 'GOVERNMENT RUNS IT'], [1, 400, 'GET OUT OF THE WAY']]) { g.save(); g.translate(640, y); g.scale(sd, 1); sh(g, '#a8784a', 4, c => { c.moveTo(0, -40); c.lineTo(380, -40); c.lineTo(430, 0); c.lineTo(380, 40); c.lineTo(0, 40); c.closePath(); }); g.restore(); g.font = DR.MK(30); g.fillStyle = '#2a1a10'; g.textAlign = 'center'; g.fillText(txt, 640 + sd * 210, y + 10); } } }));
  mood(102, 'busy'); SFX(102, null, 'drum', .5);
  C(102, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 90, 2.4], [640, 90, 2.6]], dof: 0, bg: (g, t) => TS.debate(g, t, { score: [0, 0] }), ui: c => DR.callout(c, 'WHO WON?', 640, 600, lt, .05) }));
  SFX(103, null, 'tada', .5);
  C(103, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.06]], bg: (g, t) => TS.debate(g, t, { score: [1, 0] }), act: (g, t) => { P(g, 'sang', 300, 760, .82, t, { pose: 'cheer', turn: .4, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); P(g, 'scholar', 980, 760, .82, t, { pose: 'crossed', turn: -.4, face: { mouth: 'frown', brows: 'worried' } }); }, ui: c => DR.callout(c, 'BASICALLY THE GOVERNMENT', 640, 650, lt, .1) }));
  SFX(104, 3, 'crunch', .8); SFX(104, 3, 'splash', .4);
  C(104, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 480, 1.6], [640, 480, 1.65]], dof: 4, bg: (g, t) => TS.debate(g, t, { score: [1, 0] }), act: (g, t) => { const f = clamp((lt - .3) / .4); if (f < 1) jar(g, 640, lerp(380, 560, f * f), 1.2); else shards(g, 640, 600, clamp((lt - .7) / .3)); }, ui: c => DR.callout(c, 'LIQUOR MONOPOLY: DROPPED', 640, 150, lt, .6) }));
  SFX(105, 2, 'stamp', .7);
  C(105, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 480, 1.0], [640, 480, 1.04]], bg: (g, t) => { DR.sunburst(g, t, '#4a8a52', '#8ac88a'); sh(g, '#7a6a5a', 5, c => c.ellipse(640, 640, 340, 54, 0, 0, TAU)); }, act: (g, t) => { TS.saltHeap(g, 500, 640, 220, 100); for (let i = 0; i < 6; i++) ingot(g, 760 + (i % 3) * 60, 640 - Math.floor(i / 3) * 34, .8); },
    ui: c => { if (lt > R(105, 2)) G.UI.sign(c, 'STAYED ✓', 640, 220, 60, { k: G.FX.settle(clamp((lt - R(105, 2)) / .25)), fill: '#2a8a52' }); } }), 'flash');
  mood(106, 'quiet');
  C(106, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.2], [640, 300, 2.3]], dof: 7, bg: (g, t) => TS.debate(g, t, { score: [1, 0] }), act: (g, t) => head(g, 'sang', 640, 270, 1.0, t, { face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }), ui: c => DR.callout(c, 'SANG HONGYANG?', 980, 160, lt, .2) }));
  SFX(107, 3, 'drum', .6);
  C(107, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 360, 1.05]], bg: (g, t) => screen(g, t, g2 => { const k = clamp((lt - .6) / 2); silFig(g2, 600 - k * 300, 600, .55, { cap: true }); silFig(g2, 420 - k * 300, 600, .58, { spear: true }); silFig(g2, 800 - k * 300, 600, .58, { spear: true }); }),
    ui: c => DR.write(c, '80 BC', 1020, 660, 54, lt, R(107, 6), { col: '#fff', halo: '#1e1612' }) }), 'dip');
  SFX(108, null, 'gasp', .4);
  C(108, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.2], [600, 420, 1.3]], dof: 2, bg: (g, t) => TS.hanCourt(g, t, { guards: false }), crowd: [['cousin', 380, 720, .7, { spr: { pose: 'think', turn: .4 } }], ['hanAdv', 560, 730, .72, { spr: { pose: 'pointSide', turn: .4 } }], ['cousin', 860, 720, .7, { spr: { pose: 'crossed', turn: -.4 } }]], atm: { dark: .35 },
    ui: c => DR.callout(c, 'TREASON · A COURT POWER STRUGGLE', 640, 130, lt, .1, null, null, { size: 28 }) }));
  C(109, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 90, 2.4], [640, 90, 2.5]], bg: (g, t) => TS.debate(g, t, { score: [1, 0] }), atm: { dark: .3 }, ui: c => DR.sign(c, 'NOT ABOUT\nTHE DEBATE', 640, 520, lt, .2) }));
  mood(110, 'warm'); SFX(110, null, 'chime', .5);
  C(110, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 410, 1.08]], bg: (g, t) => TS.hanEstate(g, t), act: (g, t) => { sh(g, '#c8281e', 4, c => c.rect(860, 380, 300, 60)); g.font = DR.MK(34); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('STATE STORE', 1010, 422); }, atm: { glare: [1100, 120, 340], warm: .25 },
    ui: c => DR.write(c, 'THE MONOPOLY OUTLIVED HIM', 560, 140, 50, lt, .2, { col: '#fff', halo: '#1e1612' }) }), 'dissolve');
  SFX(112, null, 'whoosh', .4);
  C(111, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.03]], bg: g => { g.fillStyle = '#e8d8b0'; g.fillRect(-200, -200, 1700, 1100); G.Paint2.grain(g, -200, -200, 1700, 1100, .3, 5, 'multiply', 1.3); },
    act: (g, t) => { const k = clamp((lt - .6) / 4); ln(g, [[120, 400], [120 + 1040 * k, 400]], 12, '#3a2618'); const D = [['HAN', .02], ['TANG', .25], ['SONG', .42], ['YUAN', .56], ['MING', .7], ['QING', .88]];
      D.forEach(([n, at], i) => { const kk = clamp((k - at) / .08); if (kk <= 0) return; const x = 120 + 1040 * at + 30; g.save(); g.translate(x, 400); g.scale(kk, kk); sh(g, '#c8281e', 4, c => c.rect(-60, -110, 120, 70)); g.font = DR.MK(26); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(n, 0, -66); TS.saltHeap(g, 0, 60, 70, 34); g.restore(); }); },
    ui: c => { if (lt > 2) DR.banner(c, '≈ 2,000 YEARS OF SALT MONOPOLIES', 640, 640, lt, 2, { size: 32 }); } }), 'flash');

  // ===================== BEAT 4b — Rome: a road named after salt =====================
  mood(113, 'warm'); SFX(113, null, 'whoosh', .6); SFX(113, null, 'paper', .4);
  C(113, null, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, 12.5, 41.6, 14], [1.6, 12.9, 42.1, 60]]); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), ui: c => DR.mapWrite(c, v, 12.9, 42.2, 'ITALY', lt, .5, { dy: -10, size: 70 }) }); }, 'whip');
  C(114, null, (ctx, lt, dur, t, R) => { const v = M.view(13.1, 42.3, 120); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { DR.mapPin(g, v, 12.48, 41.9, lt, .1); M.route(g, v, [[12.5, 41.9], [12.7, 42.25], [13.0, 42.45], [13.4, 42.6], [13.6, 42.85], [13.9, 42.95]], clamp((lt - .5) / 2.2), { w: 9 }); },
    ui: c => { DR.mapWrite(c, v, 12.48, 41.9, 'ROME', lt, .2, { dy: 60, size: 50 }); if (lt > R(114, 8)) DR.mapWrite(c, v, 13.3, 42.6, 'VIA SALARIA', lt, R(114, 8), { dy: -90, size: 54, date: '"SALT ROAD"' }); } }); });
  SFX(115, 2, 'stamp', .5);
  C(115, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[860, 460, 2.6], [860, 460, 2.75]], dof: 0, bg: (g, t) => TS.via(g, t, { cart: .2 }), ui: c => DR.banner(c, 'VIA SALARIA = SALT ROAD', 640, 620, lt, R(115, 2), { size: 38 }) }));
  SFX(116, null, 'gallop', .5, 1.5);
  C(116, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 500, 1.4], [760, 520, 1.5]], dof: 1, bg: (g, t) => TS.via(g, t, { cart: .35 + lt * .12 }), ui: c => DR.callout(c, 'SALT → ROME', 360, 150, lt, .05) }), 'whip');
  SFX(117, null, 'coins', .6);
  C(117, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: (g, t) => TS.via(g, t, { cart: .9 }), act: (g, t) => { for (let i = 0; i < 16; i++) { const u = (lt * .9 + i / 16) % 1; sh(g, '#e8c45a', 2.5, c => c.ellipse(lerp(300, 1100, u), lerp(300, 650, u) - Math.sin(u * PI * 3) * 30, 14, 6, 0, 0, TAU)); } }, ui: c => DR.callout(c, 'MONEY OUT', 980, 150, lt, .05, null, null, { fill: '#fff3c8' }) }));
  SFX(118, 4, 'dig', .6); SFX(118, 6, 'dig', .6);
  C(118, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 480, 1.2], [700, 480, 1.25]], bg: (g, t) => TS.via(g, t, { cart: 0 }), crowd: (t2) => DR.army(300, 520, 1100, 700, 18, ['legion', 'legion', 'peasant'], .3, .44, 81, { spr: { pose: 'cheer', turn: .4 } }),
    ui: c => DR.callout(c, 'BUILD A ROAD', 640, 130, lt, .3) }), 'whip');
  mood(119, 'curious'); SFX(119, 6, 'sparkle', .5);
  C(119, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: g => DR.sunburst(g, t, '#d8a840', '#f6d88a'), act: (g, t) => P(g, 'legion', 640, 720, .75, t, { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }),
    ui: c => { if (lt > R(119, 7)) DR.banner(c, 'THE MOST FAMOUS SALT FACT', 640, 130, lt, R(119, 7), { size: 34 }); } }), 'flash');
  SFX(120, null, 'paper', .6); SFX(120, 1, 'stamp', .4);
  C(120, { off: -1.0 }, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 340, 1.12]], bg: g => { g.fillStyle = '#b8864a'; g.fillRect(-200, -200, 1700, 1100); const r = rng(7); for (let i = 0; i < 200; i++) { g.fillStyle = `rgba(80,50,20,${r() * .3})`; g.beginPath(); g.arc(r() * 1280, r() * 720, 2 + r() * 4, 0, TAW()); g.fill(); } },
    ui: c => { EP.quote(c, lt, .1, 'Roman soldiers were paid in salt\n→ that’s where “salary” comes from!', 640, 330, { size: 30, w: 600 }); if (lt > 1.2) G.UI.sign(c, 'HOLD THAT THOUGHT', 640, 560, 44, { k: G.FX.settle(clamp((lt - 1.2) / .3)), rot: -.06 }); } }), 'whip');
  const TAW = () => TAU;
  SFX(121, 3, 'swish', .5); SFX(121, 4, 'thud', .5);
  C(121, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.03]], bg: g => { g.fillStyle = '#5a3a22'; g.fillRect(-200, -200, 1700, 1100); sh(g, '#7a5232', 5, c => c.rect(340, 380, 600, 300)); sh(g, '#8a6038', 4, c => c.rect(360, 400, 560, 120)); sh(g, '#d8a84a', 3, c => c.roundRect(600, 450, 80, 20, 8)); },
    act: (g, t) => { const k = clamp(lt / 1.0), y = lerp(200, 470, k * k), sc = lerp(1, .5, k); if (k < 1) { g.save(); g.translate(640, y); g.scale(sc, sc); sh(g, '#fff19a', 4, c => c.rect(-200, -60, 400, 120)); g.restore(); } },
    ui: c => { if (lt > .2) DR.callout(c, 'DRAWER: LATER', 640, 300, lt, 1.0, 640, 470); DR.write(c, "WE'RE COMING BACK TO IT", 640, 140, 48, lt, .1, { col: '#fff', halo: '#1e1612' }); } }));
})(window);
