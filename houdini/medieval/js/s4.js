/* Medieval peasants — BEAT 7–8 (L231–298, 12:43–16:39): the Great Famine 1315–17 (rain, Slavin's harvest numbers,
 * the king without bread, disease and murrain), the Black Death 1348–50 (serious, desaturated), then the turn: labour
 * becomes valuable, the Ordinance of Labourers (skit 3: Edward III outlaws pay rises), the law fails, Dyer's harvest
 * meals 200 years on, the real source of the 150 days. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MD = G.MD, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, F = G.FARM, FA = G.Fauna, CL = G.CL, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  const { label, card, talk, parchment, eggRow, skitCard } = G.MH, WK = F.WORK, PH = G.MED_PHOTOS;
  const since = (n, k, base) => t0(n, k || 0) - t0(base, 0);
  const rain = (g, t, a = .55, n = 200) => { g.strokeStyle = `rgba(200,210,230,${a})`; g.lineWidth = 2; const r = rng(4); for (let i = 0; i < n; i++) { const x = (r() * 1480 + t * 120) % 1480 - 100, y = (r() * 720 + t * 1100 * (.8 + r() * .4)) % 720; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 8, y + 30); g.stroke(); } };
  const grey = (g, a) => { g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = `rgba(110,115,130,${a})`; g.fillRect(-300, -300, 1900, 1400); g.restore(); };
  const people = (g, n, gone, x0, y0, cols, t, o = {}) => { for (let i = 0; i < n; i++) { const x = x0 + (i % cols) * (o.dx || 70), y = y0 + Math.floor(i / cols) * (o.dy || 90), off = gone(i); g.save(); g.translate(x, y); g.globalAlpha = off ? .18 : 1; g.fillStyle = off ? '#8a8a90' : (o.col || '#f2e6c8'); g.beginPath(); g.arc(0, -30, 16, 0, TAU); g.fill(); g.beginPath(); g.roundRect(-18, -12, 36, 46, 10); g.fill(); g.restore(); } };

  // ---------------- L231–237 the setup: full land, no margin ----------------
  mood(231, 'somber'); K2.era(t0(231, 0), 'THE GREAT FAMINE', '1315'); G.GRIM.push([t0(231, 0), t0(266, 0)]); SFX(231, 4, 'rumble', .4, 2);
  C(231, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: (g, t) => MD.village(g, t, { v: 'rain' }), act: (g, t) => { G.P(g, 'hugh', 640, 712, .5, t, { pose: 'idle', face: { mouth: 'flat', eyes: 'half' } }); }, ui: c => DR.write(c, 'NOT A FUNNY STORY', 640, 110, 54, lt, .2) })), 'dissolve');
  SFX(232, 6, 'pop', .4); SFX(233, 2, 'tick', .5);
  C(232, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const n = Math.floor(clamp((lt - .3) / 2) * 60); people(g, 60, i => i >= n, 220, 220, 15, t, { dx: 60, dy: 100 }); },
    ui: c => { DR.yearTag(c, 'c. 1300', lt, .1); if (lt > since(233, 0, 232)) DR.write(c, '~5 MILLION. MAYBE MORE.', 640, 640, 54, lt, since(233, 0, 232)); if (lt > since(234, 0, 232)) DR.callout(c, 'WAY MORE THAN 200 YEARS EARLIER', 640, 100, lt, since(234, 0, 232)); } })), 'whip');
  SFX(235, 1, 'dig', .5); SFX(236, 6, 'sting', .3);
  C(235, null, S((lt, R, t) => { const b = since(236, 0, 235); return { cam: [[640, 380, 1.0], [640, 380, 1.08]], bg: (g, t) => MD.strips(g, t), act: (g, t) => { if (lt > b) { g.save(); g.translate(640, 400); card(g, 0, 0, 420, 140, '#fff'); g.strokeStyle = '#15100c'; g.lineWidth = 4; g.strokeRect(-170, -20, 340, 40); g.fillStyle = '#c8281e'; g.fillRect(-170, -20, 340 * (.97 + Math.sin(t * 6) * .01), 40); label(g, 'MARGIN: ~0', 0, 50, 26, '#c8281e'); g.restore(); } },
    ui: c => { DR.write(c, 'EVERY ACRE FARMED', 640, 90, 56, lt, .1); } }; }), 'whip');
  SFX(237, 2, 'buzz', .4); SFX(237, 7, 'sack', .6);
  C(237, null, S((lt, R, t) => ({ cam: [[640, 420, 1.15], [640, 420, 1.2]], bg: (g, t) => MD.house(g, t, {}), act: (g, t) => { G.P(g, 'agnes', 460, 760, .58, t, { pose: 'presentBoth', turn: .4, face: { mouth: 'frown', brows: 'worried' } }); sh(g, '#c8a870', 5, c => c.roundRect(700, 560, 160, 180, 30)); label(g, 'SEED', 780, 650, 32, '#5a3a1a'); const k = clamp((lt - R(237, 6)) / 1.5); g.fillStyle = '#d8b050'; for (let i = 0; i < 10 * k; i++) { g.beginPath(); g.arc(700 - i * 14, 600 + Math.sin(i) * 20, 6, 0, TAU); g.fill(); } },
    ui: c => { DR.write(c, 'ONE BAD HARVEST…', 640, 90, 56, lt, .1); if (lt > R(237, 4)) DR.callout(c, 'YOU EAT NEXT YEAR’S SEED', 640, 170, lt, R(237, 4), null, null, { fill: '#ffe0e0' }); } })), 'whip');

  // ---------------- L238–243 the rain that didn't stop ----------------
  AMB(238, 'storm', 14, .7); SFX(238, 9, 'thunder', .6);
  C(238, null, S((lt, R, t) => { const v = M.view(5, 53, 30); return { bg: g => { DR.map(g, t, v); grey(g, .3); }, act: (g, t) => { const k = clamp((lt - R(238, 8)) / 2); for (let i = 0; i < 14; i++) { const r = rng(i + 9), [x, y] = M.pt(v, -5 + r() * 25, 47 + r() * 10); g.save(); g.globalAlpha = k; sh(g, '#5a6070', 3, c => c.ellipse(x, y - 20, 60, 30, 0, 0, TAU)); g.restore(); } if (k > 0) rain(g, t, .5 * k, 140); },
    ui: c => { DR.yearTag(c, 'SPRING 1315', lt, .2); DR.mapWrite(c, v, 6, 54, 'NORTHERN EUROPE', lt, R(238, 10), { dy: 0, size: 40 }); } }; }), 'dissolve');
  SFX(239, 2, 'thunder', .6); SFX(240, 1, 'splash', .7); SFX(241, 1, 'crunch', .5);
  C(239, null, S((lt, R, t) => { const b = since(240, 0, 239), c2 = since(241, 0, 239); return { cam: [[640, 400, 1.0], [640, 420, 1.1]], bg: (g, t) => lt < b ? MD.village(g, t, { v: 'rain' }) : MD.flood(g, t), act: (g, t) => { if (lt < b) { G.P(g, 'hugh', 640, 712, .5, t, { pose: 'facepalm', face: { mouth: 'frown', brows: 'worried' } }); rain(g, t, .6); }
      if (lt > c2) { for (let i = 0; i < 9; i++) { const x = 160 + i * 120, k = clamp((lt - c2) / 1.2); g.save(); g.translate(x, 640); g.rotate(k * (i % 2 ? .9 : -.9)); ln(g, [[0, 0], [0, -120]], 6, lerp(0, 1, k) > .5 ? '#5a4a2a' : '#8a9a4a'); sh(g, k > .5 ? '#4a3a22' : '#c8b060', 3, c => c.ellipse(0, -130, 12, 26, 0, 0, TAU)); g.restore(); } } },
    ui: c => { DR.write(c, lt < b ? 'AND IT KEPT RAINING' : lt < c2 ? 'FIELDS FLOODED' : 'CROPS ROTTED', 640, 100, 60, lt, lt < b ? .05 : lt < c2 ? b : c2, { col: lt > c2 ? '#c8b060' : '#fff' }); } }; }), 'whip');
  [10, 18, 27].forEach(k => SFX(242, k, 'thud', .6)); SFX(242, 3, 'card', .5);
  C(242, null, S((lt, R, t) => ({ bg: g => { DR.blueprint(g); grey(g, .25); }, act: (g, t) => { ln(g, [[180, 200], [1120, 200]], 4, 'rgba(255,255,255,.6)'); g.setLineDash([12, 8]); ln(g, [[180, 200], [1120, 200]], 4, '#fff'); g.setLineDash([]); label(g, 'NORMAL', 1160, 180, 22, '#fff');
      [[1315, .6, 10], [1316, .4, 18], [1317, .82, 27]].forEach(([y, v, k], i) => { const a = ease.out(clamp((lt - R(242, k) + .3) / .8)), x = 300 + i * 300, h = 400 * v * a; g.fillStyle = '#e8c870'; g.fillRect(x - 90, 600 - h, 180, h); if (a > .9) { g.fillStyle = 'rgba(200,40,30,.35)'; g.fillRect(x - 90, 200, 180, 400 - h); } label(g, String(y), x, 640, 32, '#fff'); if (a > .5) label(g, ['−40%', '−60%', 'STILL SHORT'][i], x, 560 - h, i === 2 ? 26 : 40, '#fff'); }); },
    ui: c => DR.write(c, "PHILIP SLAVIN'S HARVEST ESTIMATES", 640, 80, 44, lt, R(242, 3)) })), 'whip');
  SFX(243, 0, 'stamp', .8); SFX(243, 1, 'stamp', .7); SFX(243, 2, 'stamp', .6);
  C(243, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#2a2a30'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { for (let i = 0; i < 3; i++) { const k = GX.pop(lt, i * .25, .25); if (k <= 0) continue; g.save(); g.translate(300 + i * 340, 360); g.scale(k, k); g.rotate((i - 1) * .08); card(g, 0, 0, 280, 280, '#d8ccb0'); label(g, String(1315 + i), 0, -60, 50, '#15100c'); g.strokeStyle = '#c8281e'; g.lineWidth = 16; g.beginPath(); g.moveTo(-90, -10); g.lineTo(90, 110); g.moveTo(90, -10); g.lineTo(-90, 110); g.stroke(); g.restore(); } },
    ui: c => DR.write(c, 'THREE BAD HARVESTS IN A ROW', 640, 640, 50, lt, .3) })), 'whip');

  // ---------------- L244–250 the king without bread; then everyone ----------------
  PH.push([244, 246, 'edward_ii', 1110, 360, 190, .05, 'EDWARD II']); SFX(244, 2, 'horn', .4);
  C(244, null, S((lt, R, t) => { const b = since(245, 0, 244); return { cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: (g, t) => MD.palace(g, t), act: (g, t) => { G.P(g, 'edward2', 520, 760, .7, t, { pose: lt > b + R(245, 9) - R(245, 0) ? 'shrug' : 'present', face: { mouth: lt > b ? 'frown' : 'flat', brows: 'worried' } }); if (lt > b) { sh(g, '#c8a060', 5, c => c.ellipse(820, 600, 120, 26, 0, 0, TAU)); for (let i = 0; i < 3; i++) { g.fillStyle = '#8a6a3a'; g.beginPath(); g.arc(780 + i * 30, 590, 4, 0, TAU); g.fill(); } } },
    ui: c => { DR.write(c, 'EVEN THE KING FELT IT', 640, 90, 52, lt, .1); if (lt > b) DR.yearTag(c, 'AUGUST 1315', lt, b); if (lt > b + R(245, 7) - R(245, 0)) DR.callout(c, 'REPORTEDLY: NO BREAD TO BUY', 640, 180, lt, b + R(245, 7) - R(245, 0), null, null, { fill: '#fff3c8' }); } }; }), 'whip');
  SFX(246, 6, 'sting', .3);
  C(246, null, S((lt, R, t) => ({ cam: [[640, 420, 1.12], [640, 420, 1.2]], bg: (g, t) => MD.house(g, t, { night: true }), act: (g, t) => { G.P(g, 'hughH@sit', 420, 720, .5, t, { pose: 'idle', face: { mouth: 'frown', eyes: 'half', brows: 'worried' } }); G.P(g, 'agnes@sit', 620, 720, .48, t, { pose: 'presentBoth', face: { mouth: 'frown', brows: 'worried' } }); G.P(g, 'kidBoy@sit', 780, 720, .32, t, { pose: 'idle', face: { mouth: 'frown', eyes: 'half' } }); G.P(g, 'kidGirl@sit', 880, 720, .32, t, { pose: 'idle', headTilt: .3, face: { mouth: 'frown', eyes: 'half' } }); },
    ui: c => DR.write(c, "NOW THINK ABOUT HUGH'S FAMILY", 640, 90, 48, lt, R(246, 6) - .2) })), 'dissolve');
  SFX(247, 1, 'boing', .3); SFX(248, 1, 'coins', .5); SFX(248, 2, 'ox', .5);
  C(247, null, S((lt, R, t) => { const b = since(248, 0, 247); return { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => lt < b ? DR.blueprint(g) : MD.market(g, t),
    act: (g, t) => { if (lt < b) { ln(g, [[200, 600], [1100, 600]], 5, '#fff'); ln(g, [[200, 600], [200, 150]], 5, '#fff'); const k = clamp(lt / 1.2); g.strokeStyle = '#ff5a3a'; g.lineWidth = 10; g.beginPath(); g.moveTo(200, 560); for (let i = 0; i <= 40 * k; i++) g.lineTo(200 + i * 22, 560 - Math.pow(i / 40, 2.4) * 420); g.stroke(); label(g, 'PRICE OF GRAIN', 640, 650, 28, '#fff'); }
      else { const k = clamp((lt - b) / 2.4); G.P(g, 'hugh', 400, 740, .55, t, { pose: 'presentL', turn: .5, face: { mouth: 'frown', brows: 'worried' } }); F.ox(g, lerp(620, 1100, k), 730, .5, t, { dir: 1, walk: t * 4 }); G.P(g, 'steward', lerp(760, 1240, k), 740, .5, t, { walk: t * 6, turn: .7, face: { mouth: 'smirk' } }); } },
    ui: c => DR.write(c, lt < b ? 'PRICES SHOT UP' : 'SELLING THE PLOUGH OX', 640, 90, 54, lt, lt < b ? .05 : b) }; }), 'whip');
  SFX(249, 1, 'gasp', .3); SFX(250, 5, 'moo', .4); SFX(250, 7, 'baa', .3);
  C(249, null, S((lt, R, t) => { const b = since(250, 0, 249); return { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MD.village(g, t, { v: 'rain' }), act: (g, t) => { if (lt < b) { G.P(g, 'vill3@sit', 500, 712, .5, t, { pose: 'idle', headTilt: .3, face: { mouth: 'frown', eyes: 'half' } }); G.P(g, 'agnes', 720, 712, .5, t, { pose: 'presentL', turn: -.4, face: { mouth: 'frown', brows: 'worried' } }); }
      else { F.cow(g, 420, 712, .55, t, { dir: 1 }); FA.sheep(g, 820, 712, .5, t, { dir: -1 }); const k = clamp((lt - b) / 2); g.save(); g.globalAlpha = .7 * k; g.fillStyle = '#4a4a50'; g.fillRect(-300, -300, 1900, 1400); g.restore(); } },
    ui: c => { DR.write(c, lt < b ? 'THEN DISEASE FOLLOWED HUNGER' : 'CATTLE + SHEEP PLAGUE TOO', 640, 100, 50, lt, lt < b ? .05 : b); } }; }), 'dissolve');

  // ---------------- L251–256 how many died? ----------------
  SFX(251, 3, 'tick', .5); SFX(252, 4, 'buzz', .3);
  C(251, null, S((lt, R, t) => { const b = since(252, 0, 251), c2 = since(253, 0, 251); return { bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { parchment(g, 640, 380, 520, 420, lt > c2 ? .05 : 0, { title: 'Deaths, 1315–17', lines: 10 }); if (lt > b) label(g, '?', 640, 410, 200, 'rgba(120,80,40,.5)'); },
    ui: c => { DR.write(c, 'HOW MANY DIED?', 640, 90, 56, lt, .1); if (lt > c2) DR.callout(c, 'NOBODY WAS COUNTING', 640, 660, lt, c2); } }; }), 'whip');
  SFX(254, 5, 'pop', .5); SFX(255, 7, 'pop', .6); SFX(256, 9, 'thud', .6);
  C(254, null, S((lt, R, t) => { const b = since(255, 0, 254), c2 = since(256, 0, 254); return { bg: g => { DR.blueprint(g); grey(g, .25); }, act: (g, t) => { const gone = lt > c2 + R(256, 9) - R(256, 0) - .2; people(g, 10, i => gone && i === 6, 300, 420, 10, t, { dx: 76 }); },
    ui: c => { DR.callout(c, 'OLDER ESTIMATES: 10–15%', 640, 140, lt, R(254, 5)); if (lt > b) DR.callout(c, 'SLAVIN: ~15%, MAYBE MORE', 640, 220, lt, b + R(255, 7) - R(255, 0), null, null, { fill: '#ffe0e0' }); if (lt > c2) DR.write(c, 'AT LEAST 1 IN EVERY 10', 640, 620, 56, lt, c2 + R(256, 9) - R(256, 0)); } }; }), 'whip');

  // ---------------- L257–265 the Black Death ----------------
  mood(257, 'danger'); K2.era(t0(258, 0), 'THE BLACK DEATH', '1348'); SFX(257, 7, 'boom', .6); SFX(258, 5, 'bell', .7); AMB(258, 'wind', 18, .5);
  C(257, null, S((lt, R, t) => { const b = since(258, 0, 257); return { bg: g => { g.fillStyle = '#121216'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const y = Math.round(lerp(1318, 1348, ease.inOut(clamp(lt / 1.6)))); label(g, String(y), 640, 330, 180, lt > b ? '#c8281e' : '#e8e0d0'); },
    ui: c => { DR.write(c, '30 YEARS LATER: SOMETHING WORSE', 640, 120, 46, lt, .1); if (lt > b) DR.write(c, 'THE BLACK DEATH REACHES ENGLAND', 640, 600, 50, lt, b + R(258, 5) - R(258, 0)); } }; }), 'flash');
  PH.push([258, 262, 'tournai', 1020, 380, 260, .03, 'TOURNAI, 1349: BURYING THE DEAD']);
  SFX(259, 10, 'thud', .5); SFX(259, 13, 'thud', .6); SFX(260, 3, 'paper', .4);
  C(259, null, S((lt, R, t) => { const b = since(260, 0, 259); return { bg: g => { DR.blueprint(g); grey(g, .45); }, act: (g, t) => { const k3 = lt > R(259, 10) - .2, k2 = lt > R(259, 13) - .2; people(g, 30, i => (k2 && i % 2 === 0) || (k3 && i % 3 === 0), 150, 280, 10, t, { dx: 64, dy: 120 }); },
    ui: c => { DR.yearTag(c, '1348–1350', lt, .1); if (lt > R(259, 10)) DR.write(c, 'A THIRD…', 400, 100, 56, lt, R(259, 10)); if (lt > R(259, 13)) DR.write(c, '…TO A HALF', 760, 100, 56, lt, R(259, 13)); if (lt > b) DR.callout(c, 'THE EXACT NUMBER: STILL ARGUED', 420, 660, lt, b, null, null, { size: 26 }); } }; }), 'whip');
  SFX(261, 5, 'creak', .5); SFX(262, 1, 'caw', .5);
  C(261, null, S((lt, R, t) => { const b = since(262, 0, 261); return { cam: [[640, 400, 1.12], [640, 400, 1.0]], bg: (g, t) => MD.village(g, t, { v: 'empty' }), act: (g, t) => { const r = rng(3); for (let i = 0; i < 5; i++) { g.save(); g.translate(160 + i * 220, 712); sh(g, '#6a5a4a', 3, c => c.rect(-4, -60, 8, 60)); sh(g, '#6a5a4a', 3, c => c.rect(-22, -46, 44, 8)); g.restore(); } for (let i = 0; i < 8; i++) { const k = (t * .2 + i / 8) % 1; g.strokeStyle = `rgba(200,200,190,${.3 * (1 - k)})`; g.lineWidth = 3; g.beginPath(); g.moveTo(r() * 1280 + k * 200, 600); g.quadraticCurveTo(r() * 1280, 500, r() * 1280 + k * 300, 400); g.stroke(); } },
    ui: c => DR.write(c, lt < b ? 'WHOLE HOUSEHOLDS DISAPPEARED' : 'WHOLE VILLAGES EMPTIED', 640, 100, 52, lt, lt < b ? .1 : b) }; }), 'dissolve');
  mood(263, 'tender'); SFX(263, 6, 'chime', .3);
  C(263, null, S((lt, R, t) => { const b = since(264, 0, 263); return { bg: g => { g.fillStyle = '#efe0bc'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { parchment(g, 640, 380, 780, 460, 1, { title: 'Alwalton · 1279', lines: 11, seal: true }); const k = clamp((lt - .3) / 1); g.fillStyle = `rgba(255,220,60,${.45 * k})`; g.fillRect(272, 236, 720, 40);
      [[6, 'HUGH'], [9, 'HIS CHILDREN'], [12, 'GRANDCHILDREN']].forEach(([w, s], i) => { if (lt > R(263, w) - .1) { g.save(); g.globalAlpha = clamp((lt - R(263, w)) / .4); label(g, s + ' — ?', 640, 330 + i * 60, 40, '#5a3a22'); g.restore(); } }); },
    ui: c => { DR.write(c, "WE DON'T KNOW WHAT HAPPENED", 640, 80, 48, lt, .1); if (lt > b) DR.callout(c, 'JUST A NAME IN AN OLD SURVEY', 640, 670, lt, b); } }; }), 'dissolve');
  SFX(265, 9, 'thud', .5); SFX(265, 16, 'bell', .6);
  C(265, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MD.village(g, t, { v: 'dusk' }), act: (g, t) => { const r = R(265, 9), r2 = R(265, 14); for (let i = 0; i < 6; i++) { const gone = (lt > r && i % 3 === 1) || (lt > r2 && i % 2 === 0); g.save(); g.globalAlpha = gone ? clamp(1 - (lt - (i % 3 === 1 ? r : r2)) / .8) * .9 + .1 : 1; G.P(g, ['vill1', 'vill2', 'vill3', 'vill4', 'vill5', 'vill6'][i], 200 + i * 176, 712, .42, t + i, { pose: 'idle', face: { mouth: 'flat', eyes: 'half' } }); g.restore(); } },
    ui: c => { if (lt > R(265, 9)) DR.write(c, '1 IN 3 …MAYBE 1 IN 2', 640, 100, 56, lt, R(265, 9)); if (lt > R(265, 16)) DR.callout(c, 'GONE', 640, 600, lt, R(265, 16), null, null, { size: 40 }); } })), 'dissolve');

  // ---------------- L266–275 the turn: labour becomes precious ----------------
  mood(266, 'rising'); K2.era(t0(266, 0), 'AFTER THE PLAGUE', '1349'); SFX(266, 6, 'whoosh', .5);
  C(266, null, S((lt, R, t, dur) => ({ cam: [[640, 400, 1.0], [640, 380, 1.08]], bg: (g, t) => MD.village(g, t, { v: 'dawn' }), atm: { warm: .2 * clamp(lt / dur) }, act: (g, t) => G.P(g, 'vill2', 640, 712, .5, t, { pose: 'idle', face: { mouth: 'flat', eyes: 'open' } }), ui: c => DR.write(c, 'THE STORY TURNS', 640, 100, 56, lt, R(266, 6)) })), 'dissolve');
  AMB(267, 'birds', 7, .4); SFX(268, 3, 'dig', .5); SFX(269, 7, 'pop', .4);
  C(267, null, S((lt, R, t) => { const b = since(269, 0, 267); return { cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: (g, t) => MD.strips(g, t), act: (g, t) => { const n = lt > b ? 2 : 8; for (let i = 0; i < n; i++) G.P(g, ['vill1', 'vill2', 'vill3', 'vill4', 'vill5', 'vill6', 'hugh', 'walter'][i], 200 + i * 125, 640 + (i % 2) * 40, .32, t + i, { ...WK('hoe', t + i), face: { mouth: lt > b ? 'grit' : 'flat', sweat: lt > b } }); },
    ui: c => { DR.write(c, lt < since(268, 0, 267) ? 'THE LAND: STILL THERE' : lt < b ? 'FIELDS: STILL NEED PLOUGHING' : 'HANDS: FAR FEWER', 640, 90, 54, lt, lt < since(268, 0, 267) ? .1 : lt < b ? since(268, 0, 267) : b); } }; }), 'whip');
  SFX(270, 9, 'tada', .5); SFX(271, 1, 'gong', .5); SFX(272, 1, 'boing', .3);
  C(270, null, S((lt, R, t) => { const b = since(271, 0, 270), c2 = since(272, 0, 270); return { bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { G.P(g, 'vill2', 400, 760, .66, t, { pose: lt > c2 ? 'hips' : 'presentBoth', turn: .4, face: { mouth: lt > c2 ? 'smirk' : 'smile', brows: lt > c2 ? 'sly' : 'up' } }); G.P(g, 'steward', 920, 760, .62, t, { pose: 'presentL', turn: -.4, face: { mouth: 'o', brows: 'worried', sweat: true } }); if (lt > b) { const k = GX.pop(lt, b, .3); g.save(); g.translate(660, 360); g.scale(k, k); sh(g, '#f2c43a', 6, c => c.arc(0, 0, 90, 0, TAU)); GX.hand(g, 0, 40, .5, -PI / 2, { kind: 'open', sleeve: '#a86a3a' }); g.restore(); } },
    ui: c => { DR.write(c, 'SOMETHING LORDS NEEDED BADLY', 640, 80, 46, lt, R(270, 8)); if (lt > b) DR.write(c, 'THEIR LABOR', 640, 600, 64, lt, b, { col: '#f2d23a' }); if (lt > c2) DR.callout(c, 'AND THEY KNEW IT', 400, 220, lt, c2); } }; }), 'whip');
  SFX(273, 3, 'crowd', .5, 2); SFX(274, 1, 'footsteps', .6, 2.5); SFX(274, 10, 'coins', .6);
  C(273, null, S((lt, R, t) => { const b = since(274, 0, 273); return { cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => { if (lt < b) { for (let i = 0; i < 4; i++) G.P(g, ['vill1', 'vill2', 'vill4', 'walter'][i], 300 + i * 200, 712, .48, t + i, { pose: i % 2 ? 'cheer' : 'pointUp', face: { mouth: 'open', brows: 'angry' } }); }
      else { const k = clamp((lt - b) / 3); for (let i = 0; i < 3; i++) G.P(g, ['vill1', 'vill4', 'walter'][i], lerp(100 + i * 110, 820 + i * 110, k), 712, .46, t + i, { walk: t * 7, turn: .8, ...WK('goad', 0), propAng: -1.3, face: { mouth: 'grin' } }); sh(g, '#6a4a2a', 4, c => c.rect(1160, 500, 14, 220)); sh(g, '#e8d8b0', 4, c => c.rect(1060, 440, 220, 90)); label(g, 'GOOD PAY', 1170, 474, 28, '#2a8a4a'); label(g, 'NO QUESTIONS', 1170, 508, 20, '#15100c'); } },
    ui: c => DR.write(c, lt < b ? 'HIGHER WAGES!' : 'VILLEINS WALKED OFF', 640, 100, 56, lt, lt < b ? .05 : b) }; }), 'whip');
  SFX(275, 5, 'buzz', .8);
  C(275, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: (g, t) => MD.palace(g, t), act: (g, t) => G.P(g, 'advisor', 640, 760, .68, t, { pose: 'crossed', face: { mouth: 'flat', brows: 'angry' } }), ui: c => { DR.write(c, "THE GOVERNMENT'S RESPONSE:", 640, 90, 46, lt, .1); if (lt > R(275, 5) - .2) DR.sign(c, 'ABSOLUTELY NOT', 640, 210, lt, R(275, 5) - .2, { size: 70, rot: -.06 }); } })), 'whip');

  // ---------------- L276–278 the Ordinance of Labourers ----------------
  mood(276, 'heist'); K2.era(t0(276, 0), 'ORDINANCE OF LABOURERS', '1349'); SFX(276, 12, 'horn', .6); SFX(276, 18, 'paper', .7);
  PH.push([276, 278, 'edward_iii', 1110, 360, 180, .05, 'EDWARD III']);
  C(276, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: (g, t) => MD.palace(g, t), act: (g, t) => { G.P(g, 'edward3', 460, 760, .7, t, { pose: lt > R(276, 16) ? 'presentL' : 'idle', turn: .3, face: { mouth: 'smirk', brows: 'sly' } }); if (lt > R(276, 16)) parchment(g, 780, 420, 300, 360, clamp((lt - R(276, 16)) / 1.6), { title: 'Ordinance', lines: 8, seal: true }); },
    ui: c => { DR.yearTag(c, '18 JUNE 1349', lt, R(276, 1)); if (lt > R(276, 6)) DR.callout(c, 'PLAGUE STILL RAGING', 640, 100, lt, R(276, 6), null, null, { size: 26, fill: '#ffe0e0' }); if (lt > R(276, 18)) DR.write(c, 'THE ORDINANCE OF LABOURERS', 640, 660, 46, lt, R(276, 18)); } })), 'whip');
  SFX(277, 4, 'stamp', .6); SFX(277, 8, 'stamp', .6); SFX(277, 23, 'stamp', .9);
  C(277, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#3a2618'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.translate(640, 380); g.fillStyle = '#efe0bc'; g.fillRect(-460, -280, 920, 560); g.strokeStyle = '#8a6a3a'; g.lineWidth = 6; g.strokeRect(-440, -260, 880, 520); g.restore();
      [[4, 'UNDER 60 & ABLE-BODIED?'], [8, '→ YOU MUST TAKE WORK'], [17, '→ AT THE OLD WAGES'], [23, '(THE WAGES OF 1346)']].forEach(([k, s], i) => { if (lt < R(277, k) - .2) return; const kk = clamp((lt - R(277, k) + .2) / .4); g.save(); g.beginPath(); g.rect(220, 180 + i * 100, 840 * kk, 100); g.clip(); label(g, s, 640, 230 + i * 100, i === 3 ? 34 : 44, i === 3 ? '#7a1e10' : '#3a2614'); g.restore(); }); },
    ui: c => {} })), 'whip');
  SFX(278, 5, 'gavel', .8); SFX(278, 6, 'stamp', .8);
  C(278, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MD.court(g, t), act: (g, t) => { for (let i = 0; i < 5; i++) G.P(g, i === 2 ? 'edward3' : 'advisor', 240 + i * 200, 740, .45, t + i, { pose: lt > R(278, 5) ? 'crossed' : 'idle', face: { mouth: 'flat', brows: 'angry' } }); },
    ui: c => { DR.yearTag(c, '1351', lt, .1); if (lt > R(278, 5)) DR.sign(c, 'STATUTE OF LABOURERS', 640, 200, lt, R(278, 5), { size: 52 }); } })), 'whip');
  PH.push([278, 279, 'statute', 1110, 420, 170, .05, 'STATUTE OF LABOURERS (1908 STUDY)']);

  // ---------------- L279–284 skit 3: the king solves the labour shortage ----------------
  mood(279, 'comic'); AMB(279, 'court', 14, .3);
  const kingSkit = (who, bub, o = {}) => S((lt, R, t, dur) => ({ cam: o.cam || [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MD.palace(g, t),
    act: (g, t) => { G.P(g, 'edward3', 420, 760, .74, t, { pose: o.kp || (who === 'k' ? 'presentBoth' : 'idle'), turn: .4, talk: who === 'k' ? talk(lt, 0, dur - .2) : 0, face: o.kf || { mouth: 'grin', eyes: 'happy' } }); G.P(g, 'advisor', 900, 760, .7, t, { pose: o.ap || 'idle', turn: -.4, talk: who === 'a' ? talk(lt, 0, dur - .2) : 0, face: o.af || { mouth: 'flat', eyes: 'open' } }); if (o.act) o.act(g, t, lt); },
    ui: c => { skitCard(c, lt); GX.bubble(c, bub, who === 'k' ? 420 : 900, 150, lt, .05, who === 'k' ? 440 : 880, 260, { size: 34 }); } }));
  SFX(279, 0, 'tada', .7); SFX(280, 2, 'sparkle', .5); SFX(282, 3, 'stamp', .7); SFX(284, 4, 'stamp', .9); SFX(284, 5, 'boing', .4);
  C(279, null, kingSkit('k', 'GOOD NEWS!', { kp: 'cheer' }), 'whip');
  C(280, null, kingSkit('k', "I'VE SOLVED THE\nLABOR SHORTAGE.", { kp: 'thumbsUp' }), 'whip');
  C(281, null, kingSkit('a', 'HOW, YOUR\nMAJESTY?', { ap: 'bow', af: { mouth: 'o', brows: 'up' } }), 'whip');
  C(282, null, kingSkit('k', "I'VE MADE IT ILLEGAL\nFOR WAGES TO GO UP.", { kp: 'pointUp', kf: { mouth: 'grin', eyes: 'happy', brows: 'sly' }, af: { mouth: 'o', eyes: 'wide' }, act: (g, t, lt) => { const k = GX.pop(lt, .8, .3); if (k > 0) { g.save(); g.translate(660, 300); g.scale(k, k); g.rotate(-.1); card(g, 0, 0, 200, 90, '#fff'); label(g, 'WAGES ↑', 0, 2, 34); g.strokeStyle = '#c8281e'; g.lineWidth = 10; g.beginPath(); g.arc(0, 0, 70, 0, TAU); g.moveTo(-50, -50); g.lineTo(50, 50); g.stroke(); g.restore(); } } }), 'whip');
  C(283, null, kingSkit('a', "AND IF THERE STILL\nAREN'T ENOUGH WORKERS?", { ap: 'shrug', af: { mouth: 'frown', brows: 'worried', sweat: true } }), 'whip');
  C(284, null, kingSkit('k', "THEN I'LL MAKE THAT\nILLEGAL TOO.", { cam: [[500, 360, 1.25], [500, 360, 1.32]], kp: 'hips', kf: { mouth: 'grin', eyes: 'happy' }, af: { mouth: 'shock', eyes: 'wide' } }), 'zoom');

  // ---------------- L285–288 the law fails ----------------
  mood(285, 'curious'); SFX(285, 10, 'card', .6); SFX(286, 4, 'boing', .5);
  C(285, null, S((lt, R, t) => { const b = since(286, 0, 285); return { bg: g => DR.blueprint(g), act: (g, t) => { const k = GX.pop(lt, .2, .3); g.save(); g.translate(640, 360); g.scale(k, k); g.rotate(lt > b + R(286, 4) - R(286, 0) ? .2 * clamp((lt - b - .8) / .4) : 0); card(g, 0, 0, 520, 260, '#f4ead4'); label(g, 'THE BEGINNING OF', 0, -60, 34); label(g, 'ENGLISH LABOR LAW', 0, 0, 44, '#7a1e10'); label(g, '1349', 0, 70, 40, '#c8281e'); g.restore(); },
    ui: c => { if (lt > b) DR.sign(c, 'MOSTLY A FAILURE', 640, 600, lt, b + R(286, 4) - R(286, 0) - .1, { size: 54 }); } }; }), 'whip');
  SFX(287, 2, 'buzz', .4); SFX(287, 12, 'cash', .7); SFX(287, 19, 'scythe', .6);
  C(287, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MD.demesne(g, t, { v: 'harvest' }), act: (g, t) => { const pay = lt > R(287, 11); G.P(g, 'steward', 400, 740, .6, t, { pose: pay ? 'presentL' : 'idle', turn: .4, face: { mouth: 'smirk', eyes: 'half' } }); G.P(g, 'vill4', 700, 740, .6, t, { ...WK(pay ? 'sickle' : 'scare', t), turn: -.3, face: { mouth: 'grin', eyes: 'happy' } }); if (pay) { const k = clamp((lt - R(287, 11)) / .6); sh(g, '#f2c43a', 4, c => c.ellipse(lerp(480, 640, k), 480 - Math.sin(k * PI) * 60, 22, 9, 0, 0, TAU)); } },
    ui: c => { DR.callout(c, 'NO POLICE', 300, 120, lt, R(287, 1)); if (lt > R(287, 6)) DR.callout(c, 'DESPERATE FOR WORKERS', 700, 120, lt, R(287, 6)); if (lt > R(287, 11)) DR.write(c, 'LORDS BROKE THEIR OWN RULES', 640, 640, 48, lt, R(287, 11)); } })), 'whip');
  SFX(288, 13, 'pencil', .5, 1);
  C(288, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp(lt / 2.8); g.strokeStyle = '#7ae8a0'; g.lineWidth = 10; g.beginPath(); for (let i = 0; i <= 50 * k; i++) g.lineTo(200 + i * 18, 560 - Math.pow(i / 50, 1.2) * 340 + Math.sin(i) * 8); g.stroke(); ln(g, [[180, 580], [1120, 580]], 5, '#fff'); label(g, '1350', 220, 620, 24, '#fff'); label(g, '1450', 1080, 620, 24, '#fff'); },
    ui: c => DR.write(c, 'LIVES CHANGED — MEASURABLY', 640, 90, 50, lt, .2) })), 'whip');

  // ---------------- L289–298 Dyer's meals, 200 years on: the real 150 days ----------------
  mood(289, 'warm'); K2.era(t0(289, 0), 'HARVEST MEALS', '1250s → 1400s');
  const meal = (g, t, lt, swap) => { g.save(); g.translate(640, 440); sh(g, '#e8dcc0', 6, c => c.ellipse(0, 0, 380, 160, 0, 0, TAU)); sh(g, '#d8ccb0', 3, c => c.ellipse(0, 0, 320, 130, 0, 0, TAU));
    const items = swap ? [[-140, -20, .8, '#e8c890', 'bread'], [60, -40, 1.3, '#a83a2a', 'beef'], [200, 10, 1.1, '#c8902a', 'ale'], [-20, 60, .7, '#e89a8a', 'bacon']] : [[-120, -30, 1.3, '#b8803a', 'bread'], [60, -50, 1.0, '#d8b060', 'b'], [180, 0, .9, '#8a5a2a', 'r'], [-40, 60, .55, '#f2d060', 'cheese']];
    items.forEach(([x, y, s, col, kind]) => { g.save(); g.translate(x, y); g.scale(s, s); if (kind === 'ale') { sh(g, '#8a6a4a', 5, c => c.rect(-40, -70, 80, 100)); sh(g, '#f2e0b0', 4, c => c.ellipse(0, -70, 40, 12, 0, 0, TAU)); } else sh(g, col, 5, c => c.ellipse(0, 0, 90, 56, 0, 0, TAU)); g.restore(); }); g.restore(); };
  SFX(289, 2, 'pop', .5);
  C(289, null, S((lt, R, t) => ({ bg: (g, t) => MD.table(g, t), act: (g, t) => meal(g, t, lt, false), ui: c => DR.write(c, "REMEMBER DYER'S HARVEST MEALS?", 640, 90, 48, lt, .1) })), 'whip');
  SFX(290, 10, 'whoosh', .6);
  C(290, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const k = ease.inOut(clamp((lt - .4) / 2)); ln(g, [[200, 400], [1080, 400]], 6, '#fff'); label(g, '1250s', 200, 450, 30, '#fff'); label(g, '1400s', 1080, 450, 30, '#fff'); g.save(); g.translate(lerp(200, 1080, k), 340); sh(g, '#e8dcc0', 4, c => c.ellipse(0, 0, 70, 30, 0, 0, TAU)); g.restore(); },
    ui: c => DR.write(c, 'TRACKED FORWARD ~200 YEARS', 640, 120, 50, lt, R(290, 8)) })), 'whip');
  SFX(291, 4, 'boing', .4); SFX(292, 5, 'sizzle', .5); SFX(292, 7, 'pour', .5, 1); SFX(293, 7, 'sparkle', .5); SFX(294, 4, 'moo', .5);
  C(291, null, S((lt, R, t) => { const b = since(292, 0, 291), c2 = since(293, 0, 291), d2 = since(294, 0, 291); return { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => MD.table(g, t), act: (g, t) => meal(g, t, lt, lt > b),
    ui: c => { DR.yearTag(c, '1400s HARVEST MEAL', lt, b); DR.write(c, lt < b ? 'BREAD MATTERED MUCH LESS' : 'HEAVY ON MEAT + ALE', 640, 90, 52, lt, lt < b ? .1 : b); if (lt > c2) DR.callout(c, 'BARLEY + RYE → WHEAT BREAD', 360, 640, lt, c2 + R(293, 7) - R(293, 0), null, null, { size: 26 }); if (lt > d2) DR.callout(c, 'BACON → BEEF', 960, 640, lt, d2 + R(294, 4) - R(294, 0), null, null, { size: 30, fill: '#ffe0e0' }); } }; }), 'whip');
  SFX(295, 12, 'pop', .5); SFX(296, 6, 'tada', .6);
  C(295, null, S((lt, R, t) => { const b = since(296, 0, 295); return { bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { G.P(g, 'vill2', 400, 760, .6, t, { pose: 'thumbsUp', turn: .4, face: { mouth: 'grin', eyes: 'happy' } }); ['MON', 'TUE', 'WED'].forEach((d, i) => { g.save(); g.translate(720 + i * 150, 360); card(g, 0, 0, 130, 160, '#fff3c8'); label(g, d, 0, -40, 28); label(g, 'PAID', 0, 30, 24, '#2a8a4a'); g.restore(); }); },
    ui: c => { DR.write(c, 'FEWER DAYS OF PAID WORK', 640, 80, 50, lt, .1); if (lt > b) DR.sign(c, 'THE REAL SOURCE OF THE 150 DAYS', 640, 620, lt, b, { size: 44 }); } }; }), 'whip');
  SFX(297, 1, 'buzz', .6); SFX(298, 1, 'boom', .5); SFX(298, 9, 'cash', .7);
  C(297, null, S((lt, R, t) => { const b = since(298, 0, 297); return { bg: g => lt < b ? DR.sunburst(g, t, '#3a3a4a', '#4a4a5a') : DR.sunburst(g, t, '#6a1e1a', '#8a2a22'),
    act: (g, t) => { if (lt < b) { G.P(g, 'monk', 640, 760, .66, t, { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy' } }); g.strokeStyle = '#c8281e'; g.lineWidth = 20; const k = clamp((lt - .3) / .3); g.beginPath(); g.moveTo(400, 150); g.lineTo(400 + 480 * k, 150 + 560 * k); g.stroke(); }
      else { for (let i = 0; i < 2; i++) { const k = GX.pop(lt, b + R(298, 8) - R(298, 0) - .2 + i * .1, .3); g.save(); g.translate(500 + i * 280, 400); g.scale(k * 1.4, k * 1.4); g.rotate(i ? .2 : -.2); GX.hand(g, 0, 60, .8, -PI / 2, { kind: 'open', sleeve: i ? '#5a7a44' : '#a86a3a' }); g.restore(); } label(g, '£££', 640, 640, 60, '#f2c43a'); } },
    ui: c => { if (lt < b) DR.write(c, 'NOT A GENEROUS CHURCH', 640, 90, 54, lt, .05); else { DR.write(c, 'A CATASTROPHE', 640, 90, 60, lt, b); if (lt > b + R(298, 9) - R(298, 0)) DR.callout(c, 'EVERY PAIR OF HANDS: EXPENSIVE', 640, 180, lt, b + R(298, 9) - R(298, 0)); } } }; }), 'whip');
})(window);
