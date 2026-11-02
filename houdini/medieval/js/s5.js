/* Medieval peasants — BEAT 9–10 (L299–332, 16:39–18:52): poll taxes and the Peasants' Revolt of 1381 — the rebels burn
 * the manor records (the egg counter catches fire), the revolt crushed but the system cracking (Crowland), serfdom fading
 * without a law; the verdict, "who owned your time", and the close back in the bedroom with the alarm and the PTO meter. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MD = G.MD, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, F = G.FARM, FA = G.Fauna, CL = G.CL, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  const { label, card, talk, parchment, eggRow } = G.MH, WK = F.WORK, PH = G.MED_PHOTOS, EGGS = G.EGGS, PTO = G.PTO;
  const since = (n, k, base) => t0(n, k || 0) - t0(base, 0);
  const flames = (g, x, y, s, t) => { for (let i = 0; i < 14; i++) { const k = (t * 1.6 + i / 14) % 1, xx = x + Math.sin(i * 2.3 + t * 3) * 40 * s; g.fillStyle = `rgba(255,${100 + (1 - k) * 140},${30 + (1 - k) * 40},${(1 - k) * .85})`; g.beginPath(); g.arc(xx, y - k * 200 * s, (30 - k * 22) * s, 0, TAU); g.fill(); } };
  const embers = (g, t, n = 40) => { const r = rng(17); for (let i = 0; i < n; i++) { const k = (t * (.15 + r() * .2) + r()) % 1; g.fillStyle = `rgba(255,${140 + r() * 100},60,${1 - k})`; g.beginPath(); g.arc(r() * 1280 + Math.sin(t + i) * 20, 720 - k * 760, 2 + r() * 3, 0, TAU); g.fill(); } };

  // ---------------- L299–306 poll taxes, the revolt, the bonfire of records ----------------
  mood(299, 'danger'); K2.era(t0(299, 0), "PEASANTS' REVOLT", '1381'); SFX(299, 4, 'sting', .4);
  C(299, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MD.abbotHall(g, t), act: (g, t) => G.P(g, 'abbot@sit', 640, 560, .72, t, { pose: 'crossed', face: { mouth: 'flat', brows: 'angry' } }), ui: c => DR.write(c, "THE LORDS DIDN'T GIVE UP", 640, 100, 54, lt, .1) })), 'whip');
  SFX(300, 6, 'coins', .6); SFX(300, 10, 'rumble', .5, 2);
  C(300, null, S((lt, R, t, dur) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp((lt - R(300, 9)) / (dur - R(300, 9) + .01)); g.save(); g.translate(640, 420); sh(g, '#e8e0d0', 5, c => c.rect(-90, -260, 180, 340)); g.fillStyle = `rgb(${200 + 55 * k},${80 - 40 * k},40)`; g.fillRect(-80, 70 - 320 * k, 160, 320 * k); for (let i = 0; i < 6; i++) ln(g, [[-90, -200 + i * 50], [-60, -200 + i * 50]], 4, '#15100c'); g.restore(); label(g, 'ANGER', 640, 560, 40, '#fff');
      ['LABOR LAWS', 'POLL TAX 1377', 'POLL TAX 1379', 'POLL TAX 1380'].forEach((s, i) => { const kk = GX.pop(lt, .2 + i * .5, .3); if (kk <= 0) return; g.save(); g.translate(i % 2 ? 1000 : 280, 220 + Math.floor(i / 2) * 180); g.scale(kk, kk); card(g, 0, 0, 280, 80, '#fff'); label(g, s, 0, 4, 28); g.restore(); }); },
    ui: c => DR.write(c, 'DECADES OF ANGER', 640, 80, 54, lt, R(300, 10)) })), 'whip');
  PH.push([301, 303, 'froissart', 1100, 380, 240, .04, 'THE REVOLT, IN FROISSART']);
  AMB(301, 'crowd', 18, .6); SFX(301, 5, 'boom', .8); SFX(301, 7, 'cheer', .6, 2);
  C(301, null, S((lt, R, t) => ({ cam: [[640, 400, 1.12], [640, 400, 1.0]], shake: lt > R(301, 5) && lt < R(301, 5) + .5 ? .4 : 0, bg: (g, t) => MD.revolt(g, t), crowd: (t2, l2) => { const L = [], r = rng(81); for (let i = 0; i < 14; i++) L.push([['rebel', 'rebel2', 'vill1', 'vill2', 'vill4', 'vill6'][i % 6], 100 + i * 70 + (r() - .5) * 30, 640 + r() * 80, .34 + r() * .06, { spr: { pose: i % 3 ? 'cheer' : 'pointUp', face: { mouth: 'open', brows: 'angry' } } }]); return L; },
    ui: c => { DR.yearTag(c, '1381', lt, .1); if (lt > R(301, 5)) DR.write(c, "THE PEASANTS' REVOLT", 640, 100, 64, lt, R(301, 5)); } })), 'whip');
  SFX(302, 6, 'sting', .5); SFX(303, 1, 'fire', .9, 4); egg(t0(303, 1), 5, true);
  function egg(t, n, fire) { EGGS.push({ t, n, fire }); }
  C(302, null, S((lt, R, t) => { const b = since(303, 0, 302); return { cam: [[640, 400, 1.0], [640, 460, 1.15], 'inOut'], bg: (g, t) => MD.revolt(g, t),
    act: (g, t) => { G.P(g, 'rebel', 360, 740, .6, t, { pose: lt > b ? 'presentBoth' : 'pointSide', turn: .5, face: { mouth: 'grit', brows: 'angry' } }); if (lt > b) { const k = clamp((lt - b) / 1.2); for (let i = 0; i < 3; i++) { const fl = clamp(k * 3 - i); if (fl <= 0) continue; parchment(g, lerp(500, 820, fl) - i * 20, lerp(420, 640, fl), 160, 110, 1, { lines: 5, rot: fl * (i - 1) * 1.6 }); } flames(g, 800, 690, 1.5, t); embers(g, t, 50); } },
    ui: c => { DR.write(c, 'A VERY SPECIFIC TARGET', 640, 90, 52, lt, .1); if (lt > b) DR.sign(c, 'THEY BURNED THE MANOR RECORDS', 640, 200, lt, b + R(303, 1) - R(303, 0), { size: 44 }); } }; }), 'whip');
  SFX(304, 6, 'paper', .6); SFX(304, 10, 'fire', .5, 1.5);
  C(304, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.08]], bg: g => { g.fillStyle = '#2a1410'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { parchment(g, 640, 380, 640, 420, 1, { title: 'Who is a villein · What they owe', lines: 10, seal: true }); const k = clamp((lt - .4) / 3); g.save(); g.globalCompositeOperation = 'source-atop'; g.restore(); g.fillStyle = 'rgba(30,14,8,.9)'; g.beginPath(); g.moveTo(320, 590); for (let i = 0; i <= 20; i++) g.lineTo(320 + i * 32, 590 - k * 420 + Math.sin(i * 1.7 + t * 4) * 18); g.lineTo(960, 590); g.closePath(); g.fill(); flames(g, 640, 600 - k * 420, 1.3, t); embers(g, t, 30); },
    ui: c => { if (lt > R(304, 6)) DR.callout(c, 'WHO WAS A VILLEIN', 300, 120, lt, R(304, 6)); if (lt > R(304, 10)) DR.callout(c, 'WHAT THEY OWED', 980, 120, lt, R(304, 10)); } })), 'whip');
  mood(305, 'tender'); SFX(305, 1, 'chime', .4); SFX(306, 10, 'pop', .6);
  C(305, null, S((lt, R, t) => { const b = since(306, 0, 305); return { cam: [[640, 380, 1.0], [640, 380, 1.12]], bg: g => DR.sunburst(g, t, '#8a5a1e', '#a86a2e'), act: (g, t) => { parchment(g, 640, 360, 640, 420, 1, { title: 'Alwalton · Rotuli Hundredorum', lines: 11, seal: true }); if (lt > b) { eggRow(g, 640, 400, 5, 1.1, lt - b - R(306, 10) + R(306, 0)); flames(g, 640, 640, .8, t); } },
    ui: c => { DR.write(c, 'THINK ABOUT THAT.', 640, 80, 54, lt, .05); if (lt > b) DR.callout(c, 'THE DOCUMENT THAT GAVE US HUGH', 640, 660, lt, b); } }; }), 'zoom');

  // ---------------- L307–313 crushed — but the system cracks ----------------
  mood(307, 'somber'); SFX(307, 3, 'sword', .6); SFX(308, 3, 'gong', .4); egg(t0(307, 0), 5, false);
  C(307, null, S((lt, R, t) => { const b = since(308, 0, 307); return { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MD.village(g, t, { v: 'dusk' }), act: (g, t) => { for (let i = 0; i < 4; i++) G.P(g, 'edward1', 300 + i * 220, 712, .42, t + i, { pose: 'hips', outfit: 'tunicRed', hat: 'cavHelmet', face: { mouth: 'flat', brows: 'angry' } }); },
    ui: c => { DR.write(c, lt < b ? 'THE REVOLT WAS CRUSHED' : 'ITS LEADERS WERE KILLED', 640, 100, 54, lt, lt < b ? .05 : b); } }; }), 'dissolve');
  SFX(309, 5, 'crunch', .7); SFX(309, 5, 'creak', .5);
  C(309, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { const k = clamp((lt - R(309, 5) + .2) / 1.2); g.save(); g.translate(640, 380); sh(g, '#8a8a92', 6, c => c.rect(-240, -200, 480, 400)); label(g, 'SERFDOM', 0, 0, 64, '#15100c'); g.strokeStyle = '#15100c'; g.lineWidth = 6; g.beginPath(); g.moveTo(-40, -200); for (let i = 1; i <= 8 * k; i++) g.lineTo(-40 + Math.sin(i * 2.1) * 50, -200 + i * 50); g.stroke(); g.restore(); },
    ui: c => DR.write(c, 'BUT IT KEPT CRACKING', 640, 640, 56, lt, R(309, 5)) })), 'whip');
  SFX(310, 4, 'pop', .5); SFX(310, 9, 'stamp', .7); SFX(310, 17, 'gavel', .5);
  C(310, null, S((lt, R, t) => { const v = M.view(-.1, 52.5, 90); return { bg: g => DR.map(g, t, v), act: (g, t) => { DR.mapPin(g, v, .12, 52.2, lt, R(310, 3)); DR.mapPin(g, v, -.17, 52.68, lt, R(310, 5)); const k = GX.pop(lt, R(310, 9) - .1, .35); if (k > 0) { g.save(); g.translate(330, 420); g.scale(k, k); card(g, 0, 0, 340, 200, '#f4ead4'); label(g, 'HARVEST WORK DAYS', 0, -60, 26, '#7a1e10'); label(g, '− 2', 0, 20, 80, '#2a8a4a'); g.restore(); } },
    ui: c => { DR.mapWrite(c, v, .12, 52.2, 'CAMBRIDGE', lt, R(310, 4), { dy: 40, size: 28 }); DR.mapWrite(c, v, -.17, 52.68, 'CROWLAND ABBEY', lt, R(310, 5), { dy: -40, size: 30 }); DR.yearTag(c, '1381', lt, .1); if (lt > R(310, 17)) DR.callout(c, 'AFTER TROUBLE WITH ITS TENANTS', 640, 660, lt, R(310, 17)); } }; }), 'whip');
  for (let i = 0; i < 5; i++) egg(t0(311, 4) + i * .5, 4 - i, false);
  SFX(311, 6, 'whoosh', .4); SFX(311, 12, 'chime', .5);
  C(311, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const x = y => 120 + (y - 1380) / 120 * 1040; ln(g, [[100, 520], [1180, 520]], 6, '#fff'); [1380, 1400, 1420, 1440, 1460, 1480, 1500].forEach(y => { ln(g, [[x(y), 510], [x(y), 530]], 4, '#fff'); label(g, String(y), x(y), 560, 24, '#fff'); });
      const k = ease.out(clamp((lt - .5) / 3)); g.strokeStyle = '#ff7a5a'; g.lineWidth = 10; g.beginPath(); for (let i = 0; i <= 40 * k; i++) { const yr = 1380 + i * 3; g.lineTo(x(yr), 520 - 320 * (1 - (yr - 1380) / 120) ** 1.4); } g.stroke(); label(g, 'LABOR SERVICES', 320, 180, 28, '#ff7a5a'); },
    ui: c => { DR.write(c, 'SERFDOM SLOWLY DIED OUT', 640, 80, 50, lt, R(311, 8)); } })), 'whip');
  SFX(312, 5, 'buzz', .4); SFX(313, 6, 'boing', .4);
  C(312, null, S((lt, R, t) => { const b = since(313, 0, 312); return { cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: (g, t) => lt < b ? MD.palace(g, t) : MD.abbotHall(g, t), act: (g, t) => { if (lt < b) { parchment(g, 640, 380, 400, 300, 1, { title: 'A law freeing everyone', lines: 6 }); g.strokeStyle = '#c8281e'; g.lineWidth = 16; const k = clamp((lt - .4) / .3); g.beginPath(); g.moveTo(440, 230); g.lineTo(440 + 400 * k, 230 + 300 * k); g.stroke(); }
      else G.P(g, 'abbot@sit', 640, 560, .72, t, { pose: 'shrug', face: { mouth: 'frown', brows: 'worried' } }); },
    ui: c => DR.write(c, lt < b ? 'NOT WITH A LAW' : "LORDS REALIZED IT DIDN'T WORK", 640, 100, 52, lt, lt < b ? .05 : b) }; }), 'whip');

  // ---------------- L314–321 the verdict ----------------
  mood(314, 'curious'); K2.era(t0(314, 0), 'THE VERDICT', '1279 vs TODAY'); EP.ticket('DID THEY WORK LESS THAN YOU?', t0(314, 0), t0(322, 0), t0(316, 0), 'NOT HUGH');
  SFX(314, 4, 'drum', .5); SFX(316, 0, 'gavel', .9);
  C(314, null, S((lt, R, t) => { const b = since(316, 0, 314); return { bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { G.P(g, 'hugh', 380, 740, .62, t, { pose: lt > b ? 'shrug' : 'crossed', turn: .5, face: { mouth: lt > b ? 'frown' : 'flat', brows: 'skeptic' } }); G.P(g, 'viewer2', 900, 740, .62, t, { pose: 'crossed', turn: -.5, face: { mouth: 'flat', brows: 'skeptic' } }); label(g, 'VS', 640, 470, 90, '#f2d23a'); },
    ui: c => { DR.write(c, 'SO — DID THEY WORK LESS?', 640, 90, 54, lt, .1); if (lt > since(315, 0, 314)) DR.callout(c, 'HUGH, 1279?', 380, 200, lt, since(315, 0, 314)); if (lt > b) DR.sign(c, 'PROBABLY NOT', 640, 360, lt, b, { size: 60 }); } }; }), 'whip');
  const SUM = [[0, '3 DAYS A WEEK FOR HIS LORD'], [7, 'A FARM OF HIS OWN'], [12, 'A FAMILY WORKING FROM CHILDHOOD'], [19, 'A COURT THAT FINED LATENESS']];
  SUM.forEach(([k]) => SFX(317, k, 'stamp', .6)); SFX(318, 9, 'moo', .6);
  C(317, null, S((lt, R, t) => { const b = since(318, 0, 317); return { bg: g => DR.blueprint(g), act: (g, t) => { SUM.forEach(([k, s], i) => { const kk = GX.pop(lt, R(317, k) - .1, .3); if (kk <= 0) return; g.save(); g.translate(640, 170 + i * 100); g.scale(kk, kk); card(g, 0, 0, 760, 80, '#f6efe0'); label(g, '✓ ' + s, 0, 4, 34); g.restore(); });
      if (lt > b) { g.save(); g.translate(1110, 580); const k = GX.pop(lt, b, .3); g.scale(k, k); card(g, 0, 0, 200, 220, '#fff3c8'); label(g, 'HOLIDAY', 0, -70, 26, '#c8281e'); F.cow(g, 0, 90, .3, t, { dir: 1 }); g.restore(); } },
    ui: c => { if (lt > b) DR.callout(c, 'EVERY DAY OFF STILL HAD COWS IN IT', 520, 640, lt, b, null, null, { size: 28 }); } }; }), 'whip');
  mood(319, 'rising'); SFX(319, 3, 'whoosh', .5); SFX(320, 7, 'coins', .6); SFX(321, 7, 'tada', .6);
  C(319, null, S((lt, R, t) => { const b = since(320, 0, 319), c2 = since(321, 0, 319); return { cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => { G.P(g, 'hugh', 240, 712, .4, t, { pose: 'present', turn: .6, face: { mouth: 'smile' } }); for (let i = 0; i < 3; i++) G.P(g, ['vill2', 'kidGirl', 'vill4'][i], 560 + i * 200, 712, i === 1 ? .34 : .44, t + i, { pose: lt > b ? 'cheer' : 'idle', face: { mouth: 'grin', eyes: 'happy' } }); if (lt > c2) for (let i = 0; i < 8; i++) { const k = ((lt - c2) * .6 + i / 8) % 1; sh(g, '#f2c43a', 3, c => c.ellipse(500 + i * 90, -20 + k * 760, 20, 8, 0, 0, TAU)); } },
    ui: c => { DR.write(c, 'HIS GREAT-GRANDCHILDREN?', 640, 80, 50, lt, .1); if (lt > b) DR.callout(c, 'SOME: FEWER DAYS FOR WAGES', 760, 170, lt, b); if (lt > c2) DR.write(c, 'THEIR TIME WAS WORTH MORE', 640, 640, 52, lt, c2 + R(321, 7) - R(321, 0), { col: '#f2d23a' }); } }; }), 'whip');

  // ---------------- L322–327 who owned your time ----------------
  mood(322, 'tender'); SFX(322, 5, 'buzz', .3); SFX(323, 4, 'tick', .6); SFX(323, 6, 'tick', .6);
  C(322, null, S((lt, R, t) => { const b = since(323, 0, 322); return { bg: g => { g.fillStyle = '#1e1a22'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.translate(640, 360); sh(g, '#f6efe0', 8, c => c.arc(0, 0, 200, 0, TAU)); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; ln(g, [[Math.cos(a) * 170, Math.sin(a) * 170], [Math.cos(a) * 186, Math.sin(a) * 186]], 6, '#15100c'); } g.rotate(t * .8); ln(g, [[0, 0], [0, -150]], 10, '#15100c'); g.rotate(-t * .8 + t * .07); ln(g, [[0, 0], [100, 0]], 12, '#c8281e'); g.restore(); },
    ui: c => { DR.write(c, lt < b ? 'NEVER ABOUT HOLIDAYS' : 'WHO OWNED YOUR TIME?', 640, 640, 60, lt, lt < b ? .1 : b, { col: lt < b ? '#fff' : '#f2d23a' }); } }; }), 'zoom');
  SFX(324, 7, 'gavel', .6); SFX(324, 11, 'pencil', .6, 1.4); SFX(324, 18, 'pop', .6);
  C(324, null, S((lt, R, t) => ({ cam: [[640, 400, 1.04], [640, 400, 1.1]], bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { G.P(g, 'abbot@sit', 380, 480, .62, t, { pose: { L: [-68, -158], R: [160 + Math.sin(t * 7) * 12, -210], hL: 'rest', hR: 'fist' }, turn: .5, face: { mouth: 'smirk', eyes: 'half' } }); parchment(g, 820, 400, 400, 420, clamp((lt - R(324, 11)) / 2), { title: "Hugh's time", lines: 9 }); if (lt > R(324, 18)) eggRow(g, 820, 560, 5, .5, lt - R(324, 18)); },
    ui: c => { DR.write(c, 'BY LAW · WRITTEN DOWN', 640, 80, 50, lt, R(324, 7)); if (lt > R(324, 18)) DR.callout(c, 'RIGHT DOWN TO THE EGGS', 820, 660, lt, R(324, 18)); } })), 'whip');
  const COST = [[4, 'FAMINE', '#6a7480'], [6, 'PLAGUE', '#3a3a40'], [8, 'FAILED WAGE FREEZE', '#7a3aa8'], [13, 'REVOLT', '#c8281e']];
  COST.forEach(([k]) => SFX(325, k, 'thud', .6));
  C(325, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a2a3a', '#3a3a4a'), act: (g, t) => { COST.forEach(([k, s, col], i) => { const kk = GX.pop(lt, R(325, k) - .1, .3); if (kk <= 0) return; g.save(); g.translate(640, 560 - i * 110); g.scale(kk, kk); g.rotate((i % 2 ? 1 : -1) * .03); card(g, 0, 0, 560, 96, col); label(g, s, 0, 4, 44, '#fff'); g.restore(); }); },
    ui: c => { if (lt > R(325, 16)) DR.write(c, '…BEFORE IT STARTED TO CHANGE', 640, 80, 46, lt, R(325, 16)); } })), 'whip');
  mood(326, 'warm'); [[11, 'YOUR TIME IS YOURS'], [15, 'SELL IT TO WHOEVER PAYS MORE'], [25, 'YOU CAN QUIT']].forEach(([k]) => SFX(326, k, 'ding', .6));
  C(326, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MD.bedroom(g, t, {}), act: (g, t) => { G.P(g, 'viewer2', 640, 740, .62, t, { pose: lt > R(326, 25) ? 'cheer' : 'present', face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { [[11, 'YOUR TIME IS YOURS'], [15, 'SELL IT TO WHOEVER PAYS MORE'], [25, 'YOU CAN QUIT']].forEach(([k, s], i) => { if (lt > R(326, k) - .1) DR.callout(c, '✓ ' + s, 640, 110 + i * 70, lt, R(326, k) - .1, null, null, { size: 30, fill: '#e0ffe8' }); }); } })), 'whip');
  SFX(327, 4, 'tada', .7); SFX(327, 4, 'cheer', .4, 2);
  C(327, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#d8a840', '#f2c860'), act: (g, t) => { G.P(g, 'hugh', 400, 760, .62, t, { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } }); G.P(g, 'rebel', 880, 760, .6, t, { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => DR.write(c, 'THAT HAD TO BE WON.', 640, 120, 70, lt, R(327, 3)) })), 'flash');

  // ---------------- L328–332 the close: back in the bedroom ----------------
  mood(328, 'modern'); K2.era(t0(328, 0), 'YOU', 'TOMORROW'); PTO.push({ a: t0(328, 13), b: t0(330, 0), v0: .4, v1: .13 });
  SFX(328, 6, 'buzz', .8, 1.6); SFX(328, 14, 'tick', .5); SFX(328, 20, 'boing', .4);
  C(328, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [760, 420, 1.3], 'inOut'], bg: (g, t) => MD.bedroom(g, t, { ring: lt > R(328, 5) && lt < R(328, 11) ? 1 : 0 }), act: (g, t) => { G.P(g, 'viewer2@sit', 300, 470, .5, t, { pose: lt > R(328, 11) ? 'facepalm' : 'idle', turn: .3, face: lt > R(328, 18) ? { mouth: 'flat', eyes: 'half' } : { mouth: 'grit', eyes: 'half' } }); },
    ui: c => { DR.write(c, 'TOMORROW MORNING…', 640, 90, 50, lt, .1); if (lt > R(328, 18)) DR.callout(c, "IT'S NOT GREAT.", 640, 620, lt, R(328, 20)); } })), 'whip');
  egg(t0(329, 6), 5, false); egg(t0(329, 7) + .6, 0, false); SFX(329, 6, 'pop', .6); SFX(329, 7, 'rooster', .6);
  C(329, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8c060', '#f8e098'), act: (g, t) => { const k = clamp((lt - R(329, 7)) / .6); eggRow(g, 640, 360, 5, 1.6, lt - R(329, 5)); if (k > 0) { g.strokeStyle = '#c8281e'; g.lineWidth = 22; g.beginPath(); g.moveTo(300, 240); g.lineTo(300 + 680 * k, 240 + 240 * k); g.stroke(); } F.rooster(g, 1100, 650, .55, t, { dir: -1, crow: lt > R(329, 7) }); },
    ui: c => DR.write(c, 'NOBODY WANTS YOUR 5 EGGS', 640, 620, 58, lt, R(329, 4)) })), 'whip');
  mood(330, 'pipe'); SFX(330, 4, 'ding', .8); SFX(330, 4, 'pop', .6);
  C(330, null, S((lt, R, t) => ({ cam: [[640, 400, 1.04], [640, 400, 1.1]], bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { G.P(g, 'monk@sit', 340, 470, .6, t, { pose: 'thumbsUp', turn: .5, face: { mouth: 'grin', eyes: 'happy' } }); const k = GX.pop(lt, R(330, 4) - .3, .35); if (k > 0) { g.save(); g.translate(860, 360); g.scale(k, k); sh(g, '#c8281e', 6, c => c.roundRect(-200, -56, 400, 112, 22)); label(g, 'SUBSCRIBE', 0, 4, 60, '#fff'); g.restore(); } },
    ui: c => {} })), 'whip');
  const FEES = [[13, 'THE DEATH TAX', 'HERIOT', 'cow'], [16, 'THE MARRIAGE FEE', 'MERCHET', 'ring'], [19, 'RENT IN POULTRY', '3 HENS + A ROOSTER', 'hen']];
  FEES.forEach(([k]) => SFX(331, k, 'card', .7));
  C(331, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a5a8a', '#3a6a9a'), act: (g, t) => { FEES.forEach(([k, s, sub, ic], i) => { const kk = GX.pop(lt, R(331, k) - .15, .35); if (kk <= 0) return; const x = 260 + i * 380; g.save(); g.translate(x, 400); g.scale(kk, kk); card(g, 0, 0, 320, 380, '#f6efe0'); if (ic === 'cow') F.cow(g, 0, 20, .4, t, { dir: 1 }); else if (ic === 'ring') { g.strokeStyle = '#e8c86a'; g.lineWidth = 14; g.beginPath(); g.arc(0, -40, 44, 0, TAU); g.stroke(); } else { FA.chicken(g, -50, 10, .45, t, { dir: 1 }); F.rooster(g, 50, 10, .45, t, { dir: -1 }); } label(g, s, 0, 100, 28, '#7a1e10'); label(g, sub, 0, 140, 20, '#5a4a3a'); label(g, i + 1 + '', -130, -160, 40, '#c8281e'); g.restore(); }); },
    ui: c => DR.write(c, 'COMMENT: WHICH FEE WOULD YOU HATE MOST?', 640, 70, 40, lt, R(331, 3)) })), 'whip');
  mood(332, 'warm'); SFX(332, 0, 'chime', .6); SFX(332, 2, 'rooster', .5);
  C(332, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 380, 1.08]], bg: (g, t) => MD.village(g, t, { v: 'dusk' }), act: (g, t) => { G.P(g, 'hugh', 520, 712, .5, t, { pose: 'wave', face: { mouth: 'grin', eyes: 'happy' } }); G.P(g, 'agnes', 680, 712, .48, t, { pose: 'wave', face: { mouth: 'smile', eyes: 'happy' } }); G.P(g, 'kidBoy', 800, 712, .32, t, { pose: 'cheer', face: { mouth: 'grin' } }); F.rooster(g, 400, 712, .4, t, { dir: 1, crow: lt > R(332, 2) && lt < R(332, 2) + 1.2 }); },
    ui: c => DR.write(c, 'THANKS FOR WATCHING', 640, 110, 60, lt, .1) })), 'dissolve');
})(window);
