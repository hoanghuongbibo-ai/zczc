/* Medieval peasants — BEAT 5b–6 (L176–230, 8:57–12:43): the afternoon on Hugh's own strips, the open fields run by the
 * village, the children's work, Hanawalt's coroners' inquests (grief), dusk and the "second sleep" (uncertain), then
 * where the 150-day number came from: Schor, Kenyon, paid work vs all work, Humphries & Weisdorf — after 1350. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MD = G.MD, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, F = G.FARM, FA = G.Fauna, CL = G.CL, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  const { label, card, talk, parchment, eggRow } = G.MH, WK = F.WORK, PH = G.MED_PHOTOS;
  const since = (n, k, base) => t0(n, k || 0) - t0(base, 0);
  const lying = (g, who, x, y, s, t, face) => { g.save(); g.translate(x, y); g.rotate(-PI / 2); G.P(g, who, 0, 0, s, t, { pose: 'idle', face: face || { eyes: 'closed', mouth: 'flat' } }); g.restore(); };
  const pallet = (g, x, y, w) => { sh(g, '#d8b860', 4, c => c.roundRect(x - w / 2, y - 26, w, 52, 20)); for (let i = 0; i < 14; i++) ln(g, [[x - w / 2 + 10 + i * w / 15, y - 20], [x - w / 2 + 20 + i * w / 15, y + 18]], 2, '#a8883a'); sh(g, '#7a5a8a', 4, c => c.roundRect(x - w / 2 + 40, y - 34, w - 70, 40, 16)); };
  const moonSky = (g, t, k) => { g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = `rgba(40,40,100,${.62 * k})`; g.fillRect(-300, -300, 1900, 1400); g.restore(); };

  // ---------------- L176–182 back to Hugh: the afternoon on his own land ----------------
  mood(176, 'pipe'); K2.era(t0(176, 0), "HUGH'S WEEK", '1279'); SFX(176, 0, 'whoosh', .6); SFX(177, 0, 'boing', .4);
  C(176, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 400, 1.26]], bg: g => DR.sunburst(g, t, '#2a5a8a', '#3a6a9a'), act: (g, t) => G.P(g, 'hugh', 640, 760, .7, t, { pose: lt > since(177, 0, 176) ? 'pointUp' : 'think', face: { mouth: lt > since(177, 0, 176) ? 'grin' : 'flat', eyes: 'half' } }), ui: c => DR.write(c, 'NOW, WHERE WERE WE?', 640, 100, 56, lt, .1) })), 'whip');
  SFX(178, 2, 'stamp', .6); SFX(179, 3, 'pop', .5); SFX(179, 4, 'cash', .5); SFX(179, 7, 'pop', .6);
  C(178, null, S((lt, R, t) => { const b = since(179, 0, 178); return { bg: g => DR.blueprint(g), act: (g, t) => { ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].forEach((d, i) => { const ab = i < 3, k = GX.pop(lt, i * .1, .25); if (k <= 0) return; g.save(); g.translate(160 + i * 160, 300); g.scale(k, k); card(g, 0, 0, 140, 150, ab ? '#2a2630' : '#f6efe0'); label(g, d, 0, -40, 28, ab ? '#f2d23a' : '#15100c'); if (ab) label(g, 'ABBOT', 0, 20, 24, '#fff'); g.restore(); });
      if (lt > b) [[3, 'LABOR', 300], [4, 'FEES', 640], [7, 'EGGS', 980]].forEach(([k, s, x]) => { const kk = GX.pop(lt, b + R(179, k) - R(179, 0) - .1, .3); if (kk <= 0) return; g.save(); g.translate(x, 540); g.scale(kk, kk); card(g, 0, 0, 260, 110, '#fff'); if (s === 'EGGS') eggRow(g, -60, 0, 3, .45, 9); label(g, s, s === 'EGGS' ? 50 : 0, 4, 40, '#c8281e'); g.restore(); }); },
    ui: c => DR.write(c, '3 DAYS A WEEK FOR THE ABBOT', 640, 90, 50, lt, .1) }; }), 'whip');
  SFX(180, 3, 'pop', .5); SFX(180, 17, 'cheer', .3, 1.2);
  C(180, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MD.strips(g, t), act: (g, t) => { const n = lt > R(180, 15) ? 5 : 1; [['hugh', 'hoe'], ['agnes', 'sickle'], ['kidBoy', 'scare'], ['kidGirl', 'sickle'], ['hughH', 'hoe']].slice(0, n).forEach(([w, k], i) => G.P(g, w, 300 + i * 190, 600 + (i % 2) * 40, w.startsWith('kid') ? .3 : .4, t + i, { ...WK(k, t + i * .7), turn: .4, face: { mouth: 'grit', eyes: 'half' } })); },
    ui: c => { DR.write(c, 'THE FARM THAT FEEDS THE FAMILY', 640, 90, 46, lt, .1); if (lt > R(180, 13)) DR.callout(c, "…RUNS ON THE TIME THAT'S LEFT", 640, 170, lt, R(180, 11)); if (lt > R(180, 17)) DR.callout(c, 'THE WHOLE FAMILY AT ONCE', 900, 680, lt, R(180, 17), null, null, { fill: '#e0f2ff' }); } })), 'whip');
  mood(181, 'medieval'); SFX(181, 5, 'chime', .4); SFX(181, 10, 'buzz', .4); SFX(182, 1, 'dig', .6);
  C(181, null, S((lt, R, t, dur) => { const sun = clamp(lt / dur); return { cam: [[640, 400, 1.15], [640, 420, 1.05]], bg: (g, t) => MD.strips(g, t), act: (g, t) => { G.P(g, 'hugh', 640, 700, .55, t, { ...WK('hoe', t), turn: .5, face: { mouth: 'grit', eyes: 'half', sweat: true } }); g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = `rgba(255,200,140,${.15 + sun * .2})`; g.fillRect(-300, -300, 1900, 1400); g.restore(); },
    ui: c => { DR.yearTag(c, 'THE AFTERNOON', lt, .2); if (lt > R(181, 9)) DR.callout(c, 'UNPAID', 640, 120, lt, R(181, 9), null, null, { fill: '#ffe0e0' }); if (lt > since(182, 0, 181)) DR.write(c, 'HIS OWN LAND', 640, 640, 60, lt, since(182, 0, 181)); } }; }), 'whip');

  // ---------------- L183–186 open fields, strips, the village decides ----------------
  PH.push([183, 186, 'laxton', 1100, 210, 210, .05, 'LAXTON: OPEN FIELDS TODAY']);
  SFX(183, 4, 'buzz', .4); [1, 2, 3, 4].forEach(k => SFX(184, k, 'swish', .4)); SFX(184, 9, 'pop', .5);
  C(183, null, S((lt, R, t) => { const b = since(184, 0, 183); return { bg: g => { g.fillStyle = '#9ab070'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { if (lt < b) { sh(g, '#c8b070', 5, c => c.rect(440, 200, 400, 300)); g.save(); g.translate(640, 350); g.strokeStyle = '#c8281e'; g.lineWidth = 16; const k = clamp((lt - .5) / .4); g.beginPath(); g.moveTo(-200, -150); g.lineTo(-200 + 400 * k, -150 + 300 * k); g.stroke(); g.restore(); }
      else { const k = clamp((lt - b) / 1.6), r = rng(184); for (let f = 0; f < 3; f++) { const x0 = 40 + f * 410, w = 390; sh(g, ['#b8a060', '#8aa060', '#c8a870'][f], 4, c => c.rect(x0, 150, w, 520)); for (let i = 0; i < 16; i++) { const mine = (i * 7 + f * 3) % 11 === 2; g.fillStyle = mine ? '#f2c43a' : (i % 2 ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.08)'); if (mine && k < (f + 1) / 3) continue; g.fillRect(x0 + 4, 154 + i * 32, w - 8, 30); } }
        if (lt > b + R(184, 9) - R(184, 0)) { const r2 = rng(5); for (let i = 0; i < 10; i++) G.P(g, ['vill1', 'vill2', 'vill3', 'vill4', 'vill5', 'vill6'][i % 6], 80 + r2() * 1120, 300 + r2() * 360, .2, t + i, { ...WK(i % 2 ? 'hoe' : 'sickle', t + i) }); } } },
    ui: c => { if (lt < b) DR.write(c, 'NOT ONE NEAT FARM', 640, 640, 56, lt, .1); else { DR.write(c, "LONG, THIN STRIPS — HUGH'S IN YELLOW", 640, 80, 42, lt, b); if (lt > b + R(184, 9) - R(184, 0)) DR.callout(c, 'HUGE OPEN FIELDS · SHARED', 640, 690, lt, b + R(184, 9) - R(184, 0)); } } }; }), 'whip');
  const VOTE = [[6, 'WHEN TO PLOUGH?'], [9, 'WHAT TO PLANT?'], [12, 'WHEN CAN ANIMALS GRAZE?']];
  VOTE.forEach(([k]) => SFX(185, k, 'gavel', .5)); SFX(185, 14, 'baa', .6); SFX(186, 9, 'tick', .6);
  C(185, null, S((lt, R, t) => { const b = since(186, 0, 185); return { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => { const r = rng(9); for (let i = 0; i < 9; i++) { const vote = VOTE.some(([k]) => lt > R(185, k) - .1 && lt < R(185, k) + .6); G.P(g, ['vill1', 'vill2', 'vill3', 'vill4', 'hugh', 'vill5', 'vill6', 'agnes', 'reeve'][i], 160 + i * 120, 690 + (i % 2) * 30, .36, t + i, { pose: vote && i % 3 !== 1 ? 'pointUp' : 'idle', turn: (i - 4) * -.1, face: { mouth: vote ? 'open' : 'flat' } }); }
      if (lt > R(185, 14)) for (let i = 0; i < 3; i++) FA.sheep(g, 900 + i * 90 + Math.sin(t + i) * 10, 560 + i * 10, .3, t + i, { dir: -1 }); },
    ui: c => { DR.write(c, 'THE VILLAGE DECIDES TOGETHER', 640, 80, 46, lt, .1); VOTE.forEach(([k, s], i) => { if (lt > R(185, k) - .1) DR.callout(c, s, 260 + i * 380, 170, lt, R(185, k) - .1, null, null, { size: 24 }); }); if (lt > b) DR.sign(c, "SOMEONE ELSE'S SCHEDULE", 640, 360, lt, b + R(186, 8) - R(186, 0), { size: 46 }); } }; }), 'whip');

  // ---------------- L187–189 the children work ----------------
  mood(187, 'tender'); AMB(187, 'farm', 11, .5);
  const KIDJ = [[4, 'MINDING ANIMALS'], [6, 'SCARING BIRDS'], [11, 'GATHERING'], [12, 'FETCHING']];
  KIDJ.forEach(([k]) => SFX(188, k, 'pop', .5)); SFX(188, 6, 'caw', .6);
  C(187, null, S((lt, R, t) => { const b = since(188, 0, 187); return { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MD.strips(g, t), act: (g, t) => {
      const on = k => lt > b + R(188, k) - R(188, 0) - .1; G.P(g, 'hugh', 200, 640, .38, t, { ...WK('hoe', t), turn: .4 }); G.P(g, 'agnes', 360, 650, .38, t, { ...WK('sickle', t + 1), turn: .4 });
      if (on(4)) { FA.sheep(g, 560, 640, .35, t, { dir: 1 }); FA.sheep(g, 640, 660, .32, t + 1, { dir: 1 }); G.P(g, 'kidBoy', 500, 680, .3, t, { ...WK('goad', t), turn: .6 }); }
      if (on(6)) { G.P(g, 'kidGirl', 820, 660, .3, t, { ...WK('scare', t * 1.6), face: { mouth: 'open', eyes: 'wide' } }); for (let i = 0; i < 5; i++) { const k2 = clamp((lt - b - R(188, 6) + R(188, 0)) / 1.5), a = i * 1.2; const x = 820 + Math.cos(a) * 60 + k2 * (200 + i * 40) * Math.cos(a), y = 520 - k2 * 300 - i * 20, f = Math.sin(t * 20 + i) * 8; g.strokeStyle = '#15100c'; g.lineWidth = 5; g.beginPath(); g.moveTo(x - 16, y - f); g.lineTo(x, y); g.lineTo(x + 16, y - f); g.stroke(); } }
      if (on(11)) G.P(g, 'kidBoy', 1000, 660, .28, t, { pose: 'presentBoth', walk: t * 6, face: { mouth: 'smile' } }); if (on(12)) G.P(g, 'kidGirl', 1150 - ((lt * 80) % 200), 670, .28, t, { ...WK('bucket', t), walk: t * 6, turn: -.6 }); },
    ui: c => { DR.write(c, 'EVERYONE WORKS', 640, 80, 56, lt, .1); KIDJ.forEach(([k, s], i) => { if (lt > b + R(188, k) - R(188, 0) - .1) DR.callout(c, s, 260 + i * 270, 170 + (i % 2) * 50, lt, b + R(188, k) - R(188, 0) - .1, null, null, { size: 24 }); }); } }; }), 'whip');
  SFX(189, 3, 'chime', .4); SFX(189, 9, 'tick', .4);
  C(189, null, S((lt, R, t) => ({ cam: [[640, 420, 1.15], [640, 420, 1.2]], bg: (g, t) => MD.house(g, t, {}), act: (g, t) => { G.P(g, 'agnes@sit', 520, 720, .5, t, { ...WK('spin', t), turn: .5, face: { mouth: 'smile', eyes: 'half' } }); G.P(g, 'kidGirl@sit', 760, 720, .36, t + 1, { ...WK('spin', t + .4), turn: -.5, face: { mouth: 'smile', eyes: 'half' } }); },
    ui: c => { DR.write(c, 'GIRLS WORK BESIDE THEIR MOTHERS', 640, 90, 46, lt, .1); if (lt > R(189, 6)) DR.callout(c, 'BEFORE THEIR TEENS', 640, 620, lt, R(189, 6)); } })), 'whip');

  // ---------------- L190–195 the coroners' rolls: danger and grief ----------------
  mood(190, 'somber'); G.GRIM.push([t0(191, 0), t0(195, 0)]); SFX(190, 5, 'sting', .3);
  C(190, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: (g, t) => { MD.village(g, t, { v: 'dusk' }); }, act: (g, t) => {}, ui: c => DR.write(c, 'WHERE THE RECORDS TURN HARD', 640, 640, 50, lt, .2) })), 'dissolve');
  SFX(191, 1, 'paper', .5); SFX(191, 11, 'tick', .4);
  C(191, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.05]], bg: (g, t) => MD.table(g, t), act: (g, t) => { const n = Math.floor(clamp((lt - R(191, 10)) / 1.4) * 30); for (let i = 0; i < n; i++) { const r = rng(i + 3); g.save(); g.translate(260 + r() * 760, 300 + r() * 260); g.rotate((r() - .5) * .5); sh(g, '#e8dcb8', 3, c => c.rect(-60, -40, 120, 80)); g.fillStyle = 'rgba(60,40,20,.5)'; for (let l = 0; l < 4; l++) g.fillRect(-48, -26 + l * 14, 96, 4); g.restore(); } },
    ui: c => { DR.write(c, "CORONERS' INQUESTS", 640, 80, 56, lt, R(191, 1)); if (lt > R(191, 7)) DR.callout(c, 'BARBARA HANAWALT', 640, 160, lt, R(191, 7)); if (lt > R(191, 11)) DR.write(c, '3,000+ CASES', 640, 640, 60, lt, R(191, 11)); } })), 'dissolve');
  SFX(192, 14, 'chime', .3);
  C(192, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.03]], bg: (g, t) => MD.houseExt(g, t, {}), act: (g, t) => { G.P(g, 'kidBoy', 900, 712, .32, t, { pose: 'idle', turn: -.6, face: { mouth: 'flat' } }); sh(g, '#7a7a80', 5, c => c.rect(980, 600, 120, 110)); ln(g, [[1000, 600], [1000, 520]], 6, '#6a4a2a'); ln(g, [[1080, 600], [1080, 520]], 6, '#6a4a2a'); F.ox(g, 320, 712, .55, t, { dir: 1 }); },
    ui: c => { DR.callout(c, 'WELLS · ANIMALS · FIRE · WATER', 640, 110, lt, .3); if (lt > R(192, 14)) DR.write(c, 'MANY INVOLVE CHILDREN', 640, 640, 52, lt, R(192, 14)); } })), 'dissolve');
  C(193, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: (g, t) => MD.strips(g, t), act: (g, t) => G.P(g, 'kidGirl', 640, 700, .4, t, { ...WK('goad', t * .3), face: { mouth: 'flat', eyes: 'half' } }), ui: c => DR.write(c, 'A DANGEROUS PLACE TO GROW UP', 640, 100, 50, lt, .2) })), 'dissolve');
  SFX(194, 8, 'footsteps', .4, 2);
  C(194, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [760, 400, 1.1]], bg: (g, t) => { MD.village(g, t, { v: 'dusk' }); }, act: (g, t) => { const k = clamp((lt - R(194, 7)) / 3); G.P(g, 'hughH', lerp(300, 700, k), 712, .5, t, { walk: k > 0 && k < 1 ? t * 6 : null, pose: 'present', ...WK('candle', t), turn: .7, face: { mouth: 'frown', brows: 'worried' } }); G.P(g, 'agnes', lerp(180, 560, k), 712, .48, t, { walk: k > 0 && k < 1 ? t * 6 : null, pose: 'presentBoth', turn: .7, face: { mouth: 'open', brows: 'worried' } });
      if (lt > R(194, 13)) G.P(g, 'agnes@sit', 960, 712, .46, t, { pose: 'facepalm', face: { mouth: 'frown', eyes: 'closed', brows: 'worried' } }); },
    ui: c => { [['SEARCHED', 8, 260], ['GRIEVED', 10, 640], ['DEVASTATED', 14, 1020]].forEach(([s, k, x]) => { if (lt > R(194, k) - .1) DR.write(c, s, x, 110, 46, lt, R(194, k) - .1); }); } })), 'dissolve');
  mood(195, 'tender'); EP.ticket("PARENTS DIDN'T LOVE THEIR KIDS?", t0(195, 0), t0(196, 0) + .4, t0(195, 9), false);
  C(195, null, S((lt, R, t) => ({ cam: [[640, 420, 1.2], [640, 420, 1.26]], bg: (g, t) => MD.house(g, t, { night: true }), act: (g, t) => { G.P(g, 'agnes@sit', 560, 720, .55, t, { pose: 'presentBoth', turn: .4, face: { mouth: 'smile', eyes: 'half' } }); G.P(g, 'kidGirl@sit', 700, 720, .34, t, { pose: 'idle', headTilt: -.3, turn: -.4, face: { eyes: 'closed', mouth: 'smile' } }); G.P(g, 'hughH@sit', 380, 720, .55, t, { pose: 'idle', turn: .5, face: { mouth: 'smile', eyes: 'half' } }); },
    ui: c => { if (lt > R(195, 9)) DR.write(c, "DOESN'T SURVIVE THE EVIDENCE", 640, 100, 48, lt, R(195, 9)); } })), 'dissolve');

  // ---------------- L196–207 dusk, candles, sleep (twice?) ----------------
  mood(196, 'quiet'); K2.era(t0(196, 0), 'NIGHTFALL', 'c. 1280'); AMB(196, 'night', 20, .5); SFX(196, 4, 'whoosh', .3);
  C(196, null, S((lt, R, t, dur) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => { MD.village(g, t, { v: 'dusk' }); moonSky(g, t, clamp(lt / dur)); }, act: (g, t) => { const k = clamp(lt / 2.5); G.P(g, 'hugh', lerp(1100, 700, k), 712, .48, t, { walk: k < 1 ? t * 6 : null, ...WK('hoe', 0), propAng: -1.2, turn: -.7, face: { mouth: 'flat', eyes: 'half' } }); },
    ui: c => DR.write(c, 'THE SUN GOES DOWN…', 640, 100, 54, lt, .1) })), 'dissolve');
  SFX(197, 1, 'coins', .6); SFX(198, 3, 'snore', .5, 1.6);
  C(197, null, S((lt, R, t) => { const b = since(198, 0, 197); return { cam: [[640, 420, 1.2], [640, 440, 1.3]], bg: (g, t) => MD.house(g, t, { night: true }), act: (g, t) => { if (lt < b) { G.P(g, 'hughH', 640, 760, .6, t, { ...WK('candle', t), face: { mouth: 'flat', brows: 'worried' } }); sh(g, '#f2c43a', 4, c => c.ellipse(820, 520, 30, 12, 0, 0, TAU)); label(g, '£', 820, 470, 50, '#f2c43a'); }
      else { pallet(g, 640, 640, 640); lying(g, 'hughH', 420, 630, .4, t); lying(g, 'agnes', 560, 640, .38, t); lying(g, 'kidBoy', 700, 640, .28, t); lying(g, 'kidGirl', 800, 640, .28, t); label(g, 'z z z', 700 + Math.sin(t) * 10, 520 - (lt * 30) % 40, 46, '#fff'); } },
    ui: c => DR.write(c, lt < b ? 'CANDLES COST MONEY' : 'SO YOU SLEEP EARLY', 640, 100, 54, lt, lt < b ? .1 : b) }; }), 'dissolve');
  mood(199, 'curious'); EP.ticket('PEOPLE SLEPT TWICE?', t0(199, 0), t0(206, 0), t0(205, 6), 'UNCERTAIN'); SFX(199, 6, 'ding', .5);
  C(199, null, S((lt, R, t) => { const b = since(200, 0, 199); return { cam: [[640, 420, 1.15], [640, 420, 1.2]], bg: (g, t) => MD.house(g, t, { night: true }),
    act: (g, t) => { pallet(g, 640, 640, 640); const aw = lt > b + R(200, 5) - R(200, 0) && lt < b + R(200, 15) - R(200, 0); if (aw) { G.P(g, 'hughH@sit', 440, 640, .45, t, { pose: 'think', face: { mouth: 'flat', eyes: 'open' } }); G.P(g, 'agnes@sit', 600, 640, .43, t, { ...WK('spin', t), face: { mouth: 'smile', eyes: 'open' } }); } else { lying(g, 'hughH', 420, 630, .4, t); lying(g, 'agnes', 560, 640, .38, t); }
      lying(g, 'kidBoy', 700, 640, .28, t); lying(g, 'kidGirl', 800, 640, .28, t); },
    ui: c => { if (lt < b) DR.write(c, 'SLEEP… TWICE?', 640, 100, 60, lt, R(199, 6)); else { const ph = lt < b + R(200, 5) - R(200, 0) ? 0 : lt < b + R(200, 15) - R(200, 0) ? 1 : 2; DR.write(c, ['1ST SLEEP', 'AWAKE ~1 HOUR', '2ND SLEEP'][ph], 640, 100, 60, lt, b + [0, R(200, 5), R(200, 15)][ph] - (ph ? R(200, 0) : 0)); } } }; }), 'dissolve');
  PH.push([201, 202, 'ekirch', 1090, 360, 220, .05, 'A. ROGER EKIRCH']);
  [19, 20, 23].forEach(k => SFX(201, k, 'paper', .5)); SFX(202, 3, 'ding', .5);
  C(201, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const r = rng(201); [[19, 'DIARIES', '#7a3a1a'], [20, 'COURT RECORDS', '#2a3a5a'], [23, 'BOOKS', '#3a5a2a']].forEach(([k, s, col], i) => { const n = Math.floor(clamp((lt - R(201, k) + .2) / 1.2) * 6); for (let j = 0; j < n; j++) { g.save(); g.translate(180 + i * 220 + (r() - .5) * 30, 600 - j * 46); sh(g, col, 4, c => c.rect(-80, -20, 160, 40)); g.restore(); } if (n) label(g, s, 180 + i * 220, 650, 22, '#fff'); }); },
    ui: c => { DR.write(c, 'HISTORIAN ROGER EKIRCH', 520, 80, 48, lt, R(201, 5) - .2); if (lt > since(202, 0, 201)) DR.sign(c, 'A REAL BODY OF EVIDENCE', 500, 200, lt, since(202, 0, 201), { size: 40, fill: '#2a8a4a' }); } })), 'whip');
  SFX(203, 7, 'gavel', .5); SFX(203, 20, 'paper', .6);
  C(203, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { const p = Math.sin(lt * 4) * 8; G.P(g, 'clerk', 360 + p, 760, .6, t, { pose: 'pointSide', turn: .6, face: { mouth: 'open', brows: 'angry' } }); G.P(g, 'viewer2', 920 - p, 760, .6, t, { pose: 'pointSideL', turn: -.6, outfit: 'tunicBlue', face: { mouth: 'grit', brows: 'angry' } }); },
    ui: c => { DR.write(c, 'OTHER HISTORIANS + SLEEP SCIENTISTS PUSH BACK', 640, 80, 38, lt, R(203, 5)); if (lt > R(203, 20)) DR.callout(c, 'STILL ARGUING IN THE JOURNALS', 640, 640, lt, R(203, 20)); } })), 'whip');
  SFX(204, 3, 'sting', .4); SFX(204, 13, 'tick', .5); SFX(204, 17, 'tick', .5);
  C(204, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const x = y => 100 + (y - 1200) / 700 * 1080; ln(g, [[100, 420], [1180, 420]], 6, '#fff'); [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900].forEach(y => { ln(g, [[x(y), 410], [x(y), 430]], 4, '#fff'); label(g, String(y), x(y), 460, 22, '#fff'); });
      const k = clamp((lt - R(204, 13) + .2) / 1.4); if (k > 0) { g.fillStyle = 'rgba(122,232,160,.5)'; g.fillRect(x(1500), 340, (x(1800) - x(1500)) * k, 70); label(g, "EKIRCH'S EVIDENCE", x(1650), 300, 26, '#7ae8a0'); }
      if (lt > R(204, 3)) { const [hx] = [x(1300)]; G.P(g, 'hugh', hx, 400, .2, t, { pose: 'shrug', face: { mouth: 'flat' } }); label(g, 'HUGH', hx, 520, 24, '#f2d23a'); } },
    ui: c => DR.write(c, "HERE'S THE CATCH", 640, 80, 54, lt, R(204, 3)) })), 'whip');
  SFX(205, 7, 'boing', .4);
  C(205, null, S((lt, R, t) => ({ cam: [[640, 300, 1.8], [640, 300, 1.9]], dof: 5, bg: (g, t) => MD.house(g, t, { night: true }), act: (g, t) => head(g, 'hugh', 640, 280, 1, t, { face: { mouth: 'flat', eyes: 'half', brows: 'up' } }), ui: c => { DR.yearTag(c, '1300', lt, .1); DR.write(c, 'WE HONESTLY DON’T KNOW', 640, 620, 56, lt, R(205, 6)); } })), 'whip');
  mood(206, 'quiet'); SFX(206, 1, 'snore', .6, 2.4); SFX(207, 5, 'rooster', .3);
  C(206, null, S((lt, R, t) => { const b = since(207, 0, 206); return { cam: [[640, 420, 1.1], [640, 600, 1.0], 'inOut'], bg: (g, t) => { MD.houseExt(g, t, {}); moonSky(g, t, 1); }, act: (g, t) => { g.fillStyle = '#fff8d8'; g.beginPath(); g.arc(1080, 120, 40, 0, TAU); g.fill(); const r = rng(3); for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(255,255,255,${.5 + .5 * Math.sin(t * 2 + i)})`; g.beginPath(); g.arc(r() * 1280, r() * 300, 2, 0, TAU); g.fill(); } },
    ui: c => { DR.write(c, 'GOODNIGHT, HUGH.', 640, 100, 60, lt, .1); if (lt > b) DR.callout(c, 'TOMORROW: THE ABBOT’S DAY', 640, 640, lt, b); } }; }), 'dissolve');

  // ---------------- L208–220 where "150 days" came from ----------------
  mood(208, 'heist'); K2.era(t0(208, 0), 'THE 150-DAY NUMBER', '1991'); SFX(208, 0, 'whoosh', .6); SFX(209, 3, 'sting', .5);
  C(208, null, S((lt, R, t) => ({ cam: [[640, 380, 1.2], [640, 380, 1.0]], bg: (g, t) => GX.evil ? DR.sunburst(g, t, '#20202c', '#2a2a3a') : null, act: (g, t) => { const k = GX.pop(lt, .3, .4); g.save(); g.translate(640, 360); g.scale(k, k); card(g, 0, 0, 540, 240, '#fff3c8'); label(g, '150 DAYS', 0, 0, 100, '#c8281e'); g.restore(); },
    ui: c => DR.write(c, 'THE PART NOBODY TELLS YOU', 640, 620, 50, lt, since(209, 0, 208)) })), 'zoom');
  PH.push([210, 213, 'schor', 1110, 380, 200, .05, 'JULIET SCHOR']);
  SFX(210, 11, 'card', .7); SFX(210, 22, 'tick', .5);
  C(210, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.05]], bg: g => DR.sunburst(g, t, '#c8281e', '#d8382a'), act: (g, t) => { const k = GX.pop(lt, R(210, 10) - .2, .35); if (k > 0) { g.save(); g.translate(560, 380); g.scale(k, k); g.rotate(-.05); sh(g, '#15100c', 0, c => c.rect(-150, -210, 320, 440)); sh(g, '#f2f0e8', 6, c => c.rect(-160, -220, 320, 440)); sh(g, '#c8281e', 0, c => c.rect(-160, -120, 320, 120)); label(g, 'THE', 0, -170, 30, '#15100c'); label(g, 'OVERWORKED', 0, -80, 40, '#fff'); label(g, 'AMERICAN', 0, -36, 40, '#fff'); label(g, 'Juliet B. Schor', 0, 120, 28, '#15100c'); label(g, 'BESTSELLER', 0, 180, 22, '#c8281e'); g.restore(); } },
    ui: c => { DR.write(c, 'ONE BESTSELLING BOOK', 560, 70, 50, lt, R(210, 7)); if (lt > R(210, 22)) DR.yearTag(c, '1991', lt, R(210, 22)); } })), 'whip');
  SFX(211, 4, 'pop', .5); SFX(212, 2, 'impact', .7);
  C(211, null, S((lt, R, t) => { const b = since(212, 0, 211); return { bg: g => DR.blueprint(g), act: (g, t) => { const a = ease.out(clamp((lt - .3) / .8)); g.fillStyle = '#7ae8a0'; g.fillRect(260, 520 - 300 * a, 260, 300 * a); g.fillStyle = '#e8707a'; g.fillRect(760, 520 - 140 * a, 260, 140 * a); ln(g, [[180, 520], [1100, 520]], 6, '#fff'); label(g, 'MIDDLE AGES', 390, 560, 28, '#fff'); label(g, 'MODERN', 890, 560, 28, '#fff'); label(g, 'FREE TIME', 640, 150, 34, '#fff');
      if (lt > b) { const k = clamp((lt - b) / .4); GX.impact(g, 390, 260, k, .9); g.save(); g.translate(390, 240); g.rotate(.3 * k); g.strokeStyle = '#ff3a2a'; g.lineWidth = 14; g.beginPath(); g.moveTo(-130, -60); g.lineTo(130, 60); g.stroke(); g.restore(); } },
    ui: c => { if (lt > b) DR.sign(c, 'CRITICS PUSHED BACK', 640, 360, lt, b, { size: 50 }); } }; }), 'whip');
  SFX(213, 7, 'pencil', .5, 1);
  C(213, null, S((lt, R, t) => ({ bg: (g, t) => MD.table(g, t), act: (g, t) => { parchment(g, 400, 360, 380, 460, 1, { title: 'the sources', lines: 14 }); card(g, 900, 360, 360, 260, '#fff'); label(g, 'THE SUMMARY', 900, 290, 32, '#c8281e'); label(g, '150 DAYS!', 900, 380, 60, '#15100c'); const k = clamp((lt - R(213, 7)) / .6); g.strokeStyle = '#2a8a4a'; g.lineWidth = 10; g.beginPath(); g.ellipse(400, 360, 220 * k, 260 * k, 0, 0, TAU); g.stroke(); },
    ui: c => DR.callout(c, 'MORE CAREFUL THAN THE SUMMARY', 400, 660, lt, R(213, 7)) })), 'whip');
  SFX(214, 11, 'card', .6); SFX(214, 19, 'pop', .6); SFX(215, 12, 'pop', .7); SFX(215, 14, 'tada', .4);
  C(214, null, S((lt, R, t) => { const b = since(215, 0, 214); return { bg: g => DR.blueprint(g), act: (g, t) => { const k = GX.pop(lt, R(214, 10) - .3, .35); if (k > 0) { g.save(); g.translate(250, 360); g.scale(k, k); card(g, 0, 0, 340, 260, '#f4ead4'); label(g, 'NORA KENYON', 0, -80, 30, '#7a1e10'); label(g, 'a 1930s study', 0, -36, 24); g.fillStyle = 'rgba(60,40,20,.5)'; for (let i = 0; i < 4; i++) g.fillRect(-130, 0 + i * 26, 260 - (i % 2) * 50, 7); g.restore(); }
      const a = ease.out(clamp((lt - R(214, 19) + .3) / .8)), c2 = ease.out(clamp((lt - b - R(215, 12) + R(215, 0) + .3) / .8)); ln(g, [[500, 600], [1180, 600]], 6, '#fff'); g.fillStyle = '#e8c870'; g.fillRect(560, 600 - 120 * a * 1.3, 240, 120 * a * 1.3); g.fillStyle = '#7ae8a0'; g.fillRect(900, 600 - 308 * c2 * 1.3, 240, 308 * c2 * 1.3);
      if (a > 0) label(g, '120', 680, 570 - 156 * a, 48, '#fff'); label(g, 'DAY LABORERS', 680, 640, 22, '#fff'); if (c2 > 0) { label(g, '308', 1020, 570 - 400 * c2, 48, '#fff'); label(g, 'A NORMAL YEAR', 1020, 640, 22, '#fff'); } },
    ui: c => {} }; }), 'whip');
  mood(216, 'curious'); SFX(216, 3, 'sting', .4); SFX(217, 3, 'coins', .6); SFX(217, 9, 'buzz', .4);
  C(216, null, S((lt, R, t) => { const b = since(217, 0, 216); return { bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { if (lt > b) { [['PAID WORK', '#f2c43a', 330, 3], ['ALL WORK', '#7ae8a0', 950, 9]].forEach(([s, col, x, k]) => { const kk = GX.pop(lt, b + R(217, k) - R(217, 0) - .2, .3); if (kk <= 0) return; g.save(); g.translate(x, 380); g.scale(kk, kk); card(g, 0, 0, 380, 200, col); label(g, s, 0, 4, 54, '#15100c'); g.restore(); }); label(g, '≠', 640, 380, 140, '#fff'); } },
    ui: c => DR.write(c, 'THE BIGGER PROBLEM', 640, 90, 56, lt, .1) }; }), 'whip');
  SFX(218, 5, 'paper', .5); [4, 7, 10].forEach(k => SFX(219, k, 'pop', .5)); SFX(219, 11, 'baa', .5); SFX(220, 5, 'moo', .5);
  C(218, null, S((lt, R, t) => { const b = since(219, 0, 218), c2 = since(220, 0, 218); return { bg: g => { g.fillStyle = '#f2e6c8'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { g.save(); g.translate(640, 380); g.fillStyle = '#efe0bc'; g.fillRect(-560, -260, 1120, 520); g.strokeStyle = '#8a6a3a'; g.lineWidth = 6; g.strokeRect(-560, -260, 1120, 520); g.restore();
      const rows = [[0, "HUGH: 3 DAYS FOR THE ABBOT", true, null], [b + R(219, 4) - R(219, 0), 'HUGH: HIS OWN STRIPS', false, 'hoe'], [b + R(219, 7) - R(219, 0), "AGNES: BREWING", false, 'stir'], [b + R(219, 10) - R(219, 0), 'KIDS: HERDING SHEEP', false, 'goad'], [c2, 'MILKING ON A HOLIDAY', false, 'milk']];
      rows.forEach(([a, s, rec, wk], i) => { if (lt < a) return; const y = 180 + i * 96, k = clamp((lt - a) / .3); g.globalAlpha = k; label(g, s, 520, y, 32, '#3a2614'); if (wk) { g.save(); g.translate(170, y + 36); g.scale(.13, .13); G.P(g, i === 2 ? 'agnes' : i === 3 ? 'kidBoy' : i === 4 ? 'agnes' : 'hugh', 0, 0, 1, t + i, { ...WK(wk, t + i) }); g.restore(); } g.globalAlpha = 1;
        g.save(); g.translate(1010, y); g.rotate(-.1); g.strokeStyle = rec ? '#2a8a4a' : '#c8281e'; g.lineWidth = 6; g.strokeRect(-110, -26, 220, 52); label(g, rec ? 'RECORDED' : 'NOT COUNTED', 0, 2, 22, rec ? '#2a8a4a' : '#c8281e'); g.restore(); }); },
    ui: c => {} }; }), 'whip');

  // ---------------- L221–230 the twist on the twist: after 1350 ----------------
  mood(221, 'rising'); SFX(221, 3, 'whoosh', .6); SFX(221, 8, 'whoosh', .6);
  C(221, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#7a3aa8', '#8a4ab8'), act: (g, t) => { g.save(); g.translate(640, 380); g.rotate(lt * 2.5); label(g, '↻', 0, 0, 260, '#fff'); g.restore(); }, ui: c => DR.write(c, 'PLOT TWIST ON THE PLOT TWIST', 640, 100, 50, lt, .1) })), 'whip');
  PH.push([222, 224, 'weisdorf', 1100, 380, 200, -.04, 'JACOB WEISDORF']);
  SFX(222, 2, 'card', .6); SFX(222, 11, 'typewriter', .5, 1.4);
  C(222, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp((lt - R(222, 10)) / 1.6); for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) { const on = (i * 6 + j) / 54 < k; if (!on) continue; g.fillStyle = (i + j) % 3 ? 'rgba(122,232,160,.6)' : 'rgba(255,255,255,.5)'; g.fillRect(180 + j * 110, 230 + i * 44, 100, 36); } },
    ui: c => { DR.write(c, 'HUMPHRIES & WEISDORF', 560, 80, 52, lt, R(222, 2) - .2); if (lt > R(222, 11)) DR.callout(c, 'ANNUAL WAGE RECORDS · ARCHIVES', 520, 660, lt, R(222, 11)); } })), 'whip');
  SFX(223, 8, 'tada', .6); SFX(224, 1, 'buzz', .5); SFX(225, 4, 'stamp', .7);
  C(223, null, S((lt, R, t) => { const b = since(224, 0, 223), c2 = since(225, 0, 223), x = y => 120 + (y - 1250) / 300 * 1040; return { bg: g => DR.blueprint(g), act: (g, t) => { ln(g, [[100, 520], [1180, 520]], 6, '#fff'); [1250, 1300, 1350, 1400, 1450, 1500, 1550].forEach(y => { ln(g, [[x(y), 510], [x(y), 530]], 4, '#fff'); label(g, String(y), x(y), 560, 24, '#fff'); });
      const k = ease.out(clamp((lt - R(223, 8) + .2) / 1.4)); g.strokeStyle = '#f2d23a'; g.lineWidth = 8; g.beginPath(); for (let i = 0; i <= 60 * k; i++) { const yr = 1250 + i * 5, v = yr < 1350 ? 300 : 300 - 150 * clamp((yr - 1350) / 40); g.lineTo(x(yr), 520 - (v - 100) * 1.1); } g.stroke(); label(g, 'DAYS OF WAGE WORK', 300, 200, 26, '#f2d23a');
      if (lt > b) { G.P(g, 'hugh', x(1280), 500, .22, t, { pose: 'shrug', face: { mouth: 'frown' } }); label(g, 'HUGH', x(1280), 300, 26, '#fff'); } if (lt > c2) { g.fillStyle = 'rgba(122,232,160,.25)'; g.fillRect(x(1350), 150, x(1550) - x(1350), 370); } },
    ui: c => { DR.write(c, '~150 DAYS FOR SOME WORKERS', 640, 70, 48, lt, R(223, 8)); if (lt > c2) DR.callout(c, 'AFTER 1350', 900, 620, lt, c2 + R(225, 4) - R(225, 0)); } }; }), 'whip');
  SFX(226, 10, 'bell', .6); SFX(226, 12, 'buzz', .5); SFX(227, 4, 'cash', .8); SFX(227, 15, 'tada', .5);
  C(226, null, S((lt, R, t) => { const b = since(227, 0, 226); return { cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => lt < b ? MD.church(g, t) : DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'),
    act: (g, t) => { if (lt < b) { G.P(g, 'monk', 640, 740, .62, t, { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy' } }); const k = GX.pop(lt, R(226, 12) - .1, .3); if (k > 0) { g.save(); g.translate(640, 330); g.scale(k, k); g.strokeStyle = '#c8281e'; g.lineWidth = 20; g.beginPath(); g.moveTo(-200, -200); g.lineTo(200, 200); g.moveTo(200, -200); g.lineTo(-200, 200); g.stroke(); g.restore(); } }
      else { G.P(g, 'vill2', 640, 760, .62, t, { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } }); for (let i = 0; i < 10; i++) { const k = ((lt - b) * .7 + i / 10) % 1; sh(g, '#f2c43a', 3, c => c.ellipse(200 + i * 100, -40 + k * 800, 22, 9, 0, 0, TAU)); } } },
    ui: c => { if (lt < b) DR.write(c, 'NOT HOLIDAYS FROM THE CHURCH…', 640, 90, 46, lt, .1); else { DR.write(c, 'WORK SUDDENLY PAID SO WELL', 640, 90, 50, lt, b); if (lt > b + R(227, 13) - R(227, 0)) DR.callout(c, 'ENOUGH IN FEWER DAYS', 640, 640, lt, b + R(227, 13) - R(227, 0)); } } }; }), 'whip');
  mood(228, 'somber'); SFX(228, 4, 'tick', .6); SFX(229, 10, 'sting', .4);
  C(228, null, S((lt, R, t) => { const b = since(229, 0, 228); return { bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { label(g, '1350', 640, 330, 200, '#f2d23a'); label(g, '?', 900, 250, 120, 'rgba(255,255,255,.5)'); if (lt > b) { const k = clamp((lt - b) / 1.5); g.fillStyle = '#7ae8a0'; g.fillRect(340, 500, 600 * .5 * k, 40); g.strokeStyle = '#fff'; g.lineWidth = 4; g.strokeRect(340, 500, 600, 40); label(g, 'HALF THE YEAR OFF?', 640, 600, 36, '#fff'); } },
    ui: c => DR.write(c, 'WHAT HAPPENED?', 640, 100, 56, lt, .1) }; }), 'whip');
  SFX(230, 7, 'rumble', .5, 3); AMB(230, 'wind', 6, .5);
  C(230, null, S((lt, R, t, dur) => ({ cam: [[640, 360, 1.3], [640, 380, 1.0], 'inOut'], bg: (g, t) => MD.strips(g, t), atm: { warm: .2 }, act: (g, t) => { const k = clamp(lt / dur); g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = `rgba(90,100,120,${k * .5})`; g.fillRect(-300, -300, 1900, 1400); g.restore(); },
    ui: c => { DR.yearTag(c, 'SUMMER 1315', lt, R(230, 10)); DR.write(c, 'BACK TO 1315', 640, 640, 60, lt, R(230, 10)); } })), 'dissolve');
})(window);
