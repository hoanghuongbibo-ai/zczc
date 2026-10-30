/* The Life of the Mona Lisa — BEAT 7: the theft (L143–221, 8:44–13:31). Monday, the smock, the walk out; the empty wall
 * becomes the attraction; the poet + Picasso; two years in a trunk; Florence 1913; the trial; the Valfierno legend. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MS = G.MS, ML = G.ML, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  Object.assign(G.CW, { police: { outfit: 'gardien', hat: 'kepi', look: { skin: '#f0d0b4', hairCol: '#2a2420', beard: 'moustache', beardCol: '#2a2420' } }, pieret: { outfit: 'suitGrey', look: { skin: '#f2d6c0', hairCol: '#c8a070' } },
    charney: { outfit: 'suitNavy', look: { skin: '#f2d6c0', hairCol: '#5a3a22', glasses: true } } });
  const label = (g, s, x, y, size = 30, col = '#15100c') => { g.font = MK(size); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const card = (g, x, y, w, h, fill = '#f6efe0') => { g.fillStyle = 'rgba(10,6,4,.35)'; g.beginPath(); g.roundRect(x - w / 2 + 6, y - h / 2 + 8, w, h, 14); g.fill(); g.fillStyle = fill; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 14); g.fill(); g.lineWidth = 5; g.strokeStyle = '#15100c'; g.stroke(); };
  // Peruggia with the panel hidden under his smock (a flat bulge + a wooden corner peeking out)
  const smuggle = (g, x, y, s, t, o = {}) => { P(g, 'peruggia', x, y, s, t, Object.assign({ pose: 'crossed', turn: o.turn ?? .4, face: o.face || { mouth: 'flat', eyes: 'half' } }, o.p || {})); g.save(); g.translate(x, y - 300 * s); g.rotate(-.05); sh(g, 'rgba(240,238,230,.95)', 4, c => c.roundRect(-58 * s * 2, -90 * s * 2, 116 * s * 2, 160 * s * 2, 14)); sh(g, '#c8a070', 3, c => c.rect(40 * s * 2, 60 * s * 2, 26 * s * 2, 18 * s * 2)); g.restore(); };
  const stoneHead = (g, x, y, s, seed = 1) => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#b8a888', 5, c => { c.moveTo(-50, 60); c.quadraticCurveTo(-60, -60, 0, -70); c.quadraticCurveTo(60, -60, 50, 60); c.closePath(); }); g.strokeStyle = 'rgba(80,60,40,.6)'; g.lineWidth = 4; g.beginPath(); g.moveTo(-24, -10); g.lineTo(-8, -10); g.moveTo(8, -10); g.lineTo(24, -10); g.moveTo(0, -4); g.lineTo(-4, 18); g.lineTo(4, 18); g.moveTo(-14, 34); g.lineTo(14, 34); g.stroke(); sh(g, '#8a7a5a', 4, c => c.rect(-60, 60, 120, 24)); g.restore(); };

  // ---------------- L143–149 Monday, 21 August 1911 ----------------
  mood(143, 'heist'); K2.era(t0(143, 0), 'THE THEFT', '21 AUG 1911'); AMB(143, 'night', 12, .4); SFX(143, 2, 'bell', .4);
  C(143, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 380, 1.0]], bg: (g, t) => MS.street(g, t), atm: { dark: .35, glare: [1180, 80, 260] }, ui: c => { DR.write(c, 'EARLY MONDAY MORNING', 640, 110, 54, lt, .2); DR.yearTag(c, 'AUG 21, 1911', lt, R(143, 4)); } })), 'dip');
  SFX(144, 6, 'stamp', .8);
  C(144, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.08]], bg: (g, t) => MS.street(g, t), act: (g, t) => { const k = clamp((lt - R(144, 6) + .3) / .3); g.save(); g.translate(640, lerp(-200, 330, ease.out(k))); g.rotate(-.05); sh(g, '#c8281e', 5, c => c.rect(-220, -60, 440, 120)); label(g, 'FERMÉ', 0, -12, 60, '#fff'); label(g, 'CLOSED · MONDAY', 0, 36, 26, '#fff'); g.restore(); GX.impact(g, 640, 390, clamp((lt - R(144, 6)) / .4), 1); }, atm: { dark: .2 } })), 'whip');
  SFX(145, 0, 'footsteps', .5, 3); SFX(145, 1, 'clink', .4);
  C(145, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: (g, t) => MS.salon(g, t, {}), crowd: (t2, l2) => DR.army(-100 + l2 * 120, 590, 1300 + l2 * 120, 712, 7, ['worker1911'], .44, .5, 145, { walk: true, spr: { turn: .8 } }), atm: { dark: .2 },
    act: (g, t) => { const x = 300 + lt * 60; ln(g, [[x, 700], [x + 40, 560]], 6, '#8a6a3a'); sh(g, '#d8c8a0', 3, c => c.ellipse(x + 50, 545, 34, 14, .3, 0, TAU)); }, ui: c => DR.write(c, 'CLEANERS + MAINTENANCE MEN', 640, 100, 48, lt, .1) })), 'whip');
  SFX(146, 4, 'sting', .6); SFX(146, 4, 'card', .6);
  C(146, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 380, 1.3]], bg: (g, t) => MS.salon(g, t, {}), act: (g, t) => P(g, 'peruggia', 640, 760, .74, t, { pose: 'idle', face: { mouth: 'flat', eyes: 'half', brows: 'sly' } }), atm: { dark: .25 },
    ui: c => { DR.write(c, 'VINCENZO PERUGGIA', 640, 640, 62, lt, R(146, 4) - .2); } })), 'whip');
  SFX(147, 2, 'pop', .4); SFX(147, 7, 'pop', .4); SFX(147, 10, 'pop', .4); SFX(147, 14, 'card', .5);
  C(147, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.salon(g, t, {}), act: (g, t) => P(g, 'peruggia', 330, 760, .7, t, { pose: 'present', turn: .5, face: { mouth: 'smile' } }),
    ui: c => DR.statCard(c, { name: 'VINCENZO PERUGGIA', cls: 'ITALIAN IMMIGRANT · HOUSE PAINTER', who: 'peruggia', stats: [['HANDYMAN', 4], ['KNOWS THE LOUVRE', 5], ['SUSPICIOUS?', 0]] }, 880, 340, lt, R(147, 1)) })), 'whip');
  SFX(148, 1, 'pencil', .5, 1.2);
  C(148, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { DR.bpDraw(g, [[200, 600, 1080, 600], [200, 600, 200, 260], [1080, 600, 1080, 260], [200, 260, 1080, 260], [500, 260, 500, 600], [780, 260, 780, 600], [360, 600, 360, 520], [940, 600, 940, 520]], clamp(lt / 1.2), { w: 5 }); },
    ui: c => { DR.write(c, 'HE KNOWS THE BUILDING', 640, 110, 54, lt, .1); DR.callout(c, 'SALON CARRÉ', 640, 430, lt, .9, null, null, { size: 26 }); } })), 'whip');
  SFX(149, 7, 'boing', .4);
  C(149, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.14]], bg: (g, t) => MS.salon(g, t, {}), act: (g, t) => { P(g, 'gardien', 400, 760, .62, t, { pose: 'pointSide', turn: .6, face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'peruggia', 860, 760, .62, t, { pose: 'present', turn: -.6, face: { mouth: 'smile' } }); },
    ui: c => { GX.bubble(c, 'BONJOUR, VINCENZO!', 400, 230, lt, R(149, 6) - .2, 400, 340, { size: 30 }); DR.write(c, 'THEY KNOW HIS FACE', 640, 100, 50, lt, .1); } })), 'whip');

  // ---------------- L150–160 the theft ----------------
  SFX(150, 3, 'paper', .5);
  C(150, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#2a2a30'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { card(g, 640, 360, 640, 420, '#f4ead4'); label(g, 'STATEMENT · PERUGGIA', 640, 200, 40, '#7a1e18'); g.fillStyle = 'rgba(60,50,40,.6)'; for (let i = 0; i < 8; i++) g.fillRect(380, 260 + i * 34, 520 * clamp(lt * 1.6 - i * .15), 9); },
    ui: c => DR.write(c, 'HOW HE TOLD IT', 640, 640, 56, lt, .1) })), 'whip');
  SFX(151, 1, 'footsteps', .5, 3); SFX(151, 9, 'cloth', .5);
  C(151, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MS.stair(g, t), crowd: (t2, l2) => DR.army(100 + l2 * 120, 600, 900 + l2 * 120, 712, 6, ['worker1911'], .44, .5, 151, { walk: true, spr: { turn: .8 } }), act: (g, t) => P(g, 'peruggia', 200 + lt * 120, 712, .5, t, { walk: t * 7, turn: .8 }),
    ui: c => { if (lt > R(151, 9) - .2) DR.callout(c, 'SAME WHITE SMOCK', 900, 200, lt, R(151, 9) - .2, 260 + lt * 120, 520, { screen: true }); } })), 'whip');
  SFX(152, 4, 'creak', .4); SFX(152, 13, 'pop', .5);
  C(152, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.14]], bg: (g, t) => MS.stair(g, t), atm: { night: .45 }, act: (g, t) => { sh(g, '#3a3a40', 4, c => c.rect(820, 300, 200, 300)); g.save(); g.globalAlpha = .9; P(g, 'peruggia', 920, 640, .5, t, { pose: 'crossed', face: { mouth: 'flat', eyes: 'half' } }); g.restore();
      if (lt > R(152, 12)) for (const x of [380, 520]) { g.save(); g.filter = 'brightness(0.1)'; P(g, 'worker1911', x, 712, .5, t, { pose: 'idle' }); g.restore(); label(g, '?', x, 340, 80, '#f2d23a'); } },
    ui: c => { DR.callout(c, 'HID OVERNIGHT?', 920, 180, lt, R(152, 4), null, null, { fill: '#fff3c8' }); if (lt > R(152, 13)) DR.callout(c, 'TWO HELPERS?', 450, 180, lt, R(152, 13), null, null, { fill: '#fff3c8' }); } })), 'whip');
  SFX(153, 4, 'buzz', .5);
  C(153, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), ui: c => DR.sign(c, 'STILL ARGUED OVER', 640, 360, lt, .1, { size: 60, fill: '#e8862a' }) })), 'flash');
  SFX(154, 6, 'drum', .6);
  C(154, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#1e2a4a', '#2a3a5a'), ui: c => DR.sign(c, 'NOT IN DOUBT:', 640, 360, lt, .1, { size: 60, fill: '#2a8a4a' }) })), 'flash');
  // L155: walk up → lift → frame + glass off → panel under the smock (four actions on four phrases)
  SFX(155, 1, 'footsteps', .6, 1.5); SFX(155, 7, 'creak', .7); SFX(155, 12, 'thud', .6); SFX(155, 21, 'clink', .6); SFX(155, 24, 'cloth', .7);
  C(155, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 360, 1.3]], bg: (g, t) => MS.salon(g, t, { missing: lt > R(155, 7) }), atm: { dark: .2 }, act: (g, t) => { const wk = clamp(lt / R(155, 6)); P(g, 'peruggia', lerp(200, 520, wk), 760, .64, t, { walk: wk < 1 ? t * 7 : 0, turn: .7, pose: wk >= 1 ? 'pointUp' : 'idle', face: { mouth: 'flat', eyes: 'half' } }); },
    ui: c => DR.write(c, 'HE WALKS UP…', 640, 640, 54, lt, .1) })), 'whip');
  C(155, 7, S((lt, R, t) => ({ cam: [[640, 300, 1.7], [640, 310, 1.8]], bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { const up = ease.out(clamp(lt / .7)); ML.mona(g, 640, 300 - up * 40, 210, {}); for (const sd of [-1, 1]) GX.hand(g, 640 + sd * 110, 330 - up * 40, .45, sd > 0 ? 0 : PI, { kind: 'fist', sleeve: '#f6f4ee' }); },
    ui: c => DR.write(c, 'LIFTS HER OFF THE WALL', 640, 600, 54, lt, .1) })), 'zoom');
  C(155, 12, S((lt, R, t) => ({ cam: [[640, 380, 1.4], [640, 380, 1.45]], bg: (g, t) => MS.stair(g, t), atm: { dark: .25 }, act: (g, t) => { const f = clamp((lt - .2) / .5), gl = clamp((lt - R(155, 20)) / .5); g.save(); g.translate(lerp(640, 300, f), lerp(400, 640, f)); g.rotate(-f * .4); ML.frameGold(g, -72, -105, 144, 210); g.restore();
      g.save(); g.translate(lerp(640, 1000, gl), lerp(400, 640, gl)); g.rotate(gl * .4); g.fillStyle = 'rgba(200,230,255,.5)'; g.fillRect(-90, -120, 180, 240); g.strokeStyle = '#9ab8d0'; g.lineWidth = 6; g.strokeRect(-90, -120, 180, 240); g.restore(); if (gl < .2) ML.mona(g, 640, 400, 210, { frame: false }); else ML.mona(g, 640, 400, 210, { frame: false }); },
    ui: c => { DR.callout(c, 'HEAVY FRAME', 260, 200, lt, .4); if (lt > R(155, 20)) DR.callout(c, 'GLASS CASE', 1020, 200, lt, R(155, 20)); } })), 'whip');
  C(155, 24, S((lt, R, t) => ({ cam: [[640, 400, 1.3], [640, 380, 1.4]], bg: (g, t) => MS.stair(g, t), atm: { dark: .25 }, act: (g, t) => { const k = clamp(lt / .8); if (k < 1) { P(g, 'peruggia', 640, 760, .66, t, { pose: 'presentBoth', face: { mouth: 'flat', eyes: 'half' } }); ML.mona(g, 640, lerp(330, 470, k), 210 * (1 - k * .2), { frame: false }); } else smuggle(g, 640, 760, .66, t); },
    ui: c => { DR.callout(c, 'POSTER-BOARD SIZE', 1000, 200, lt, R(155, 28), 690, 450, { screen: true }); DR.write(c, '…UNDER HIS SMOCK', 640, 100, 52, lt, R(155, 35)); } })), 'whip');
  mood(156, 'comic'); SFX(156, 3, 'footsteps', .7, 2.5); SFX(156, 4, 'creak', .5);
  C(156, null, S((lt, R, t) => ({ cam: [[640, 420, 1.0], [700, 420, 1.06]], bg: (g, t) => MS.street(g, t), act: (g, t) => { const k = clamp(lt / 2.6); smuggle(g, lerp(300, 1100, k), 712, .5, t, { turn: .8, p: { walk: t * 6 }, face: { mouth: 'smile', eyes: 'happy' } }); }, atm: { glare: [1150, 80, 280] }, ui: c => DR.write(c, 'AND THEN HE WALKS OUT.', 640, 100, 56, lt, .1) })), 'whip');
  SFX(157, 1, 'ding', .5);
  C(157, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), ui: c => DR.write(c, "THAT'S IT.", 640, 360, 110, lt, .05) })), 'flash');
  SFX(158, 1, 'whoosh', .5); SFX(158, 2, 'buzz', .6);
  C(158, null, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 360, 1.04]], bg: g => { g.fillStyle = '#1a1e2a'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const y = lerp(-400, 300, ease.out(clamp(lt / .6))); ln(g, [[600, -400], [600, y]], 8, '#c8a060'); ln(g, [[680, -400], [680, y]], 8, '#c8a060'); for (let i = 0; i < 12; i++) if (-400 + i * 60 < y) ln(g, [[600, -400 + i * 60], [680, -400 + i * 60]], 6, '#c8a060'); },
    ui: c => { DR.write(c, 'NO ROPE LADDERS', 640, 600, 60, lt, .1); if (lt > .5) { const [x, y] = [640, 360]; c.save(); c.strokeStyle = '#c8281e'; c.lineWidth = 18; c.lineCap = 'round'; const k = clamp((lt - .5) / .3); c.beginPath(); c.moveTo(x - 160, y - 160); c.lineTo(x - 160 + 320 * k, y - 160 + 320 * k); c.stroke(); c.restore(); } } })), 'whip');
  SFX(159, 1, 'zap', .6); SFX(159, 1, 'buzz', .5);
  C(159, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#0e1018'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(255,40,40,.8)'; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 120 + i * 90); g.lineTo(1280, 200 + i * 70 + Math.sin(t * 2 + i) * 40); g.stroke(); } g.restore(); },
    ui: c => { DR.write(c, 'NO LASERS', 640, 360, 80, lt, .05); if (lt > .4) { c.save(); c.strokeStyle = '#c8281e'; c.lineWidth = 18; c.lineCap = 'round'; const k = clamp((lt - .4) / .3); c.beginPath(); c.moveTo(380, 250); c.lineTo(380 + 520 * k, 250 + 220 * k); c.stroke(); c.restore(); } } })), 'whip');
  mood(160, 'heist'); SFX(160, 5, 'cloth', .5); SFX(160, 12, 'tick', .5);
  C(160, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: (g, t) => MS.street(g, t), act: (g, t) => smuggle(g, 640, 760, .66, t, { turn: 0, face: { mouth: 'smirk', eyes: 'half', brows: 'sly' } }), atm: { glare: [1150, 80, 280] },
    ui: c => { DR.write(c, 'A MAN IN WORK CLOTHES', 640, 100, 50, lt, .1); if (lt > R(160, 11)) DR.write(c, '…ON A DAY NOBODY WAS LOOKING', 640, 640, 46, lt, R(160, 11), { col: '#f2d23a' }); } })), 'whip');

  // ---------------- L161–171 she's gone → front pages → crowds at the empty wall ----------------
  SFX(161, 5, 'tick', .5); SFX(161, 12, 'gasp', .6);
  C(161, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), ui: c => GX.hangSign(c, 'TIME TO\nNOTICE:', '?', '26 HRS', lt, 0, R(161, 4), { y: 330, col: '#c8281e' }) })), 'whip');
  mood(162, 'danger'); SFX(162, 5, 'thud', .9); SFX(162, 6, 'thud', .7, null, .2); AMB(162, 'street', 4, .4);
  C(162, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], shake: lt > R(162, 5) && lt < R(162, 5) + .4 ? .8 : 0, bg: (g, t) => MS.street(g, t), act: (g, t) => { const k = clamp((lt - R(162, 5) + .2) / .3); for (const sd of [-1, 1]) sh(g, '#5a3a22', 5, c => c.rect(640 + sd * 300 * (1 - k) - (sd > 0 ? 0 : 300), 200, 300, 400)); },
    ui: c => { DR.write(c, 'THE LOUVRE SHUTS', 640, 100, 56, lt, .1); if (lt > R(162, 8)) DR.sign(c, 'CLOSED FOR A WEEK', 640, 640, lt, R(162, 8), { size: 46 }); } })), 'whip');
  SFX(163, 0, 'whistle', .6); SFX(163, 1, 'footsteps', .7, 2);
  C(163, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MS.salon(g, t, { missing: true }), crowd: (t2, l2) => DR.army(-100 + Math.sin(l2 * 3) * 80, 600, 1380, 712, 10, ['police', 'gardien'], .42, .5, 163, { walk: true, spr: { turn: .8, face: { mouth: 'shock', eyes: 'wide' } } }),
    act: (g, t) => { const r = rng(2); for (let i = 0; i < 6; i++) { const x = 100 + i * 200, k = (lt * 2 + i * .3) % 1; g.save(); g.translate(x, 360 - Math.sin(k * PI) * 160); g.rotate(k * 4); ML.painting(g, -40, -50, 80, 100, i + 3, {}); g.restore(); } },
    ui: c => DR.write(c, 'POLICE SEARCH EVERYWHERE', 640, 100, 52, lt, .1) })), 'whip');
  for (let i = 0; i < 5; i++) G.SFXat(C.t(164, 0) + .1 + i * .55, 'paper', .5);
  C(164, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a2a30', '#3a3a40'), act: (g, t) => { const P1 = [['LE PETIT PARISIEN', 'LA JOCONDE A DISPARU!', -.08], ['THE NEW YORK TIMES', 'MONA LISA STOLEN!', .06], ['CORRIERE DELLA SERA', 'RUBATA LA GIOCONDA!', -.04], ['BERLINER TAGEBLATT', 'MONA LISA GESTOHLEN!', .1], ['THE TIMES', 'THEFT AT THE LOUVRE', -.1]];
      P1.forEach(([m, h, r], i) => { const k = ease.out(clamp((lt - i * .55) / .35)); if (k <= 0) return; g.save(); g.translate(640 + (i - 2) * 120, 380 + (i % 2) * 20); g.rotate(r + (1 - k) * 2); g.scale(.7 + (1 - k) * 1.2, .7 + (1 - k) * 1.2); K2.paper(g, 0, 0, 1, { mast: m, head: h, headSize: 30, date: 'AUGUST 1911' }); g.restore(); }); },
    ui: c => DR.write(c, 'FRONT PAGE, AROUND THE WORLD', 640, 660, 46, lt, .1) })), 'whip');
  mood(165, 'curious'); SFX(165, 4, 'whoosh', .4);
  C(165, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp(lt / 1.6); ln(g, [[100, 400], [100 + 1080 * k, 400 - 200 * k * k]], 10, '#f2d23a'); label(g, 'FAME', 100 + 1080 * k, 360 - 200 * k * k - 20, 40, '#f2d23a'); }, ui: c => DR.write(c, 'HERE\'S WHERE IT KICKS IN', 640, 100, 52, lt, .1) })), 'whip');
  SFX(166, 5, 'boing', .3);
  C(166, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MS.street(g, t), act: (g, t) => { [['farmer', 260], ['paris1911a', 520], ['worker', 780], ['paris1911b', 1040]].forEach(([w, x], i) => { P(g, w, x, 740, .54, t + i, { pose: 'present', turn: 0, face: { mouth: 'o', eyes: 'wide' } }); K2.paper(g, x + 10, 470, .26, { head: 'MONA LISA?', headSize: 40 }); }); },
    ui: c => DR.write(c, 'MOST HAD NEVER SEEN IT', 640, 100, 52, lt, .1) })), 'whip');
  SFX(167, 4, 'pop', .4); SFX(167, 4, 'pop', .4, null, .2); SFX(167, 4, 'pop', .4, null, .4);
  C(167, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { for (let i = 0; i < 24; i++) { const k = GX.pop(lt, i * .06, .2); if (k <= 0) continue; g.save(); g.translate(100 + (i % 8) * 155, 160 + Math.floor(i / 8) * 200); g.scale(k * .9, k * .9); g.rotate((i % 3 - 1) * .1); ML.mona(g, 0, 0, 150, { frame: 'plain', sepia: i % 2 ? 1 : 0 }); g.restore(); } },
    ui: c => DR.write(c, "NOW THEY COULDN'T STOP SEEING IT", 640, 660, 44, lt, .2) })), 'whip');
  mood(168, 'somber'); SFX(168, 3, 'crowd', .6, 3);
  C(168, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: (g, t) => MS.street(g, t), crowd: DR.army(-200, 560, 1400, 712, 40, ['paris1911a', 'paris1911b', 'farmer', 'poet'], .3, .44, 168, { spr: { turn: .8 } }),
    ui: c => { DR.write(c, 'THE LOUVRE REOPENS', 640, 100, 52, lt, .1); DR.tally(c, 'THOUSANDS', g => { g.fillStyle = '#15100c'; g.beginPath(); g.arc(0, -6, 7, 0, TAU); g.fill(); g.fillRect(-7, 2, 14, 12); }, 640, 620, lt, R(168, 4), { n: 14, label: 'THOUSANDS' }); } })), 'dissolve');
  SFX(169, 0, 'buzz', .4);
  C(169, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { ML.mona(g, 640, 340, 280, {}); g.strokeStyle = '#c8281e'; g.lineWidth = 20; g.lineCap = 'round'; const k = clamp((lt - .3) / .3); g.beginPath(); g.moveTo(480, 160); g.lineTo(480 + 320 * k, 160 + 360 * k); g.stroke(); }, ui: c => DR.write(c, 'NOT TO SEE HER…', 640, 640, 56, lt, .1) })), 'whip');
  SFX(170, 2, 'chime', .4);
  C(170, null, S((lt, R, t) => ({ cam: [[640, 300, 1.8], [640, 300, 1.7]], bg: (g, t) => MS.salon(g, t, { missing: true }), ui: c => DR.write(c, '…BUT WHERE SHE USED TO BE', 640, 620, 52, lt, .1) })), 'zoom');
  AMB(171, 'crowd', 4, .25);
  C(171, null, S((lt, R, t) => ({ cam: [[640, 380, 1.05], [640, 380, 1.12]], bg: (g, t) => MS.salon(g, t, { missing: true }), crowd: DR.army(80, 600, 1200, 712, 16, ['paris1911a', 'paris1911b', 'poet', 'farmer'], .44, .52, 171, { spr: { back: true, pose: 'idle' } }), atm: { dark: .25 },
    act: (g, t) => { for (let i = 0; i < 4; i++) { ln(g, [[400 + i * 160, 620], [400 + i * 160, 560]], 8, '#f4f0e8'); G.Paint2.fire(g, 400 + i * 160, 556, .14, t + i); } },
    ui: c => DR.write(c, 'MOURNERS AT A WAKE', 640, 100, 54, lt, R(171, 8) - .3) })), 'dissolve');

  // ---------------- L172–183 the poet, Picasso and the Iberian heads ----------------
  mood(172, 'comic'); SFX(172, 3, 'whistle', .7); SFX(172, 4, 'clink', .7);
  C(172, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.street(g, t), act: (g, t) => { P(g, 'police', 400, 760, .64, t, { pose: 'pointSide', turn: .6, face: { mouth: 'grit', brows: 'angry' } }); P(g, 'apollinaire', 800, 760, .64, t, { pose: 'shrug', turn: -.5, face: { mouth: 'shock', eyes: 'wide', sweat: true } }); },
    ui: c => DR.write(c, 'THE POLICE ARREST A POET', 640, 100, 52, lt, .1) })), 'whip');
  SFX(173, 6, 'thud', .7); SFX(173, 7, 'card', .6);
  C(173, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: g => { g.fillStyle = '#5a5a62'; g.fillRect(-300, -300, 1900, 1400); g.fillStyle = '#4a4a52'; g.fillRect(-300, 560, 1900, 400); },
    act: (g, t) => { P(g, 'apollinaire', 640, 760, .7, t, { pose: 'crossed', face: { mouth: 'frown', eyes: 'half', brows: 'worried' } }); const k = clamp((lt - R(173, 6) + .2) / .3); g.save(); g.translate(0, (1 - ease.out(k)) * -720); for (let i = 0; i < 10; i++) ln(g, [[340 + i * 66, 0], [340 + i * 66, 720]], 14, '#2a2a30'); g.restore(); },
    ui: c => { DR.write(c, 'GUILLAUME APOLLINAIRE', 640, 640, 54, lt, R(173, 7) - .2); DR.yearTag(c, 'SEPT 7, 1911', lt, .2); DR.callout(c, 'BIG NAME, AVANT-GARDE', 1020, 140, lt, R(173, 12)); } })), 'whip');
  SFX(174, 1, 'paper', .5); SFX(174, 8, 'sting', .6);
  C(174, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: g => { g.fillStyle = '#5a5a62'; g.fillRect(-300, -300, 1900, 1400); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 120, 400, 'rgba(255,240,180,.5)'); g.restore(); },
    act: (g, t) => { ln(g, [[640, 0], [640, 160]], 4, '#2a2a30'); sh(g, '#f2e6a0', 3, c => c.arc(640, 170, 26, 0, TAU)); sh(g, '#6a4a2a', 4, c => c.rect(420, 580, 440, 26)); P(g, 'picasso', 400, 760, .66, t, { pose: 'crossed', turn: .4, face: { mouth: 'frown', eyes: 'wide', sweat: true } }); P(g, 'police', 880, 760, .66, t, { pose: 'pointSideL', turn: -.5, face: { mouth: 'open', brows: 'angry' } }); },
    ui: c => DR.write(c, 'PABLO PICASSO', 400, 120, 58, lt, R(174, 8) - .2) })), 'whip');
  SFX(175, 3, 'buzz', .5);
  C(175, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { head(g, 'apollinaire', 420, 300, .8, t, { face: { mouth: 'smile', eyes: 'happy' } }); head(g, 'picasso', 860, 300, .8, t, { face: { mouth: 'smile', eyes: 'happy' } }); }, ui: c => DR.sign(c, 'NOT GUILTY (OF THIS)', 640, 600, lt, .2, { size: 50, fill: '#2a8a4a' }) })), 'whip');
  mood(176, 'curious'); SFX(176, 3, 'whoosh', .6); SFX(176, 6, 'whoosh', .6);
  C(176, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); g.save(); g.translate(640, 360); g.rotate(lt * 3); for (let i = 0; i < 20; i++) { g.rotate(TAU / 20); g.fillStyle = i % 2 ? '#3a3a5a' : '#2a2a4a'; g.beginPath(); g.moveTo(0, 0); g.lineTo(1000, -80); g.lineTo(1000, 80); g.closePath(); g.fill(); } g.restore(); }, ui: c => DR.write(c, 'A TWIST INSIDE THE TWIST', 640, 360, 70, lt, .1, { col: '#f2d23a' }) })), 'zoom');
  SFX(177, 2, 'gasp', .6);
  C(177, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), act: (g, t) => { const sh2 = Math.sin(lt * 40) * 4; head(g, 'apollinaire', 420 + sh2, 300, .8, t, { face: { mouth: 'shock', eyes: 'wide', sweat: true } }); head(g, 'picasso', 860 - sh2, 300, .8, t, { face: { mouth: 'grit', eyes: 'wide', sweat: true } }); }, ui: c => DR.write(c, 'SCARED FOR A REASON', 640, 640, 54, lt, .2) })), 'whip');
  SFX(178, 6, 'sting', .5); SFX(178, 10, 'thud', .5); SFX(178, 22, 'pop', .5);
  C(178, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.12]], bg: (g, t) => MS.salon(g, t, {}), atm: { dark: .3 }, act: (g, t) => { const k = clamp((lt - R(178, 6)) / 1.5); stoneHead(g, 900, 560, .9, 1); stoneHead(g, 1040, 560, .8, 2); P(g, 'pieret', lerp(1200, 500, k), 760, .62, t, { walk: k < 1 ? t * 7 : 0, turn: -.8, face: { mouth: 'smirk', eyes: 'half', brows: 'sly' } }); if (k > .3) { stoneHead(g, lerp(1200, 500, k) - 60, 500, .6, 3); } },
    ui: c => { DR.write(c, "APOLLINAIRE'S FORMER SECRETARY", 640, 100, 46, lt, R(178, 1)); DR.callout(c, 'ANCIENT IBERIAN STONE HEADS', 960, 300, lt, R(178, 8), 960, 480, { screen: true, size: 26 }); } })), 'whip');
  C(178, 19, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.studio(g, t, { easel: 'blank' }), act: (g, t) => { stoneHead(g, 760, 500, .9, 1); stoneHead(g, 920, 500, .8, 2); P(g, 'picasso', 450, 760, .66, t, { pose: 'present', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }); },
    ui: c => DR.callout(c, 'TWO ENDED UP WITH PICASSO', 840, 180, lt, R(178, 22) - R(178, 19), 840, 420, { screen: true }) })), 'whip');
  SFX(179, 3, 'card', .5); SFX(179, 9, 'ding', .5);
  C(179, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.studio(g, t, { easel: false }), act: (g, t) => { P(g, 'charney', 380, 760, .66, t, { pose: 'pointUp', turn: .5, face: { mouth: 'open', brows: 'up' } }); const k = GX.pop(lt, R(179, 8), .3); if (k > 0) { g.save(); g.translate(880, 380); g.scale(k, k); card(g, 0, 0, 380, 220, '#fff'); label(g, 'ORDER', 0, -60, 40, '#c8281e'); label(g, '2 × IBERIAN HEADS', 0, 0, 28); label(g, '— P.', 80, 60, 30); g.restore(); } },
    ui: c => { DR.write(c, 'ART HISTORIAN NOAH CHARNEY', 640, 100, 44, lt, .1); if (lt > R(179, 6)) DR.callout(c, 'MAYBE EVEN ORDERED THEM', 880, 600, lt, R(179, 6), null, null, { fill: '#fff3c8' }); } })), 'whip');
  SFX(180, 3, 'footsteps', .4, 1.5); SFX(180, 4, 'thud', .5);
  C(180, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MS.street(g, t), atm: { night: .5 }, act: (g, t) => { const k = clamp(lt / 2); P(g, 'apollinaire', lerp(200, 600, k), 740, .6, t, { walk: k < 1 ? t * 7 : 0, turn: .8, face: { mouth: 'flat', eyes: 'half', sweat: true } }); P(g, 'picasso', lerp(80, 480, k), 740, .58, t, { walk: k < 1 ? t * 7 : 0, turn: .8, face: { mouth: 'flat', eyes: 'half', sweat: true } }); sh(g, '#8a6a4a', 4, c => c.rect(lerp(200, 600, k) + 60, 520, 120, 90)); for (let i = 0; i < 3; i++) label(g, ['S', 'H', '!'][i], 1000 + i * 40, 280, 40, 'rgba(255,255,255,.7)'); },
    ui: c => DR.write(c, 'QUIETLY RETURNED', 640, 100, 54, lt, R(180, 3)) })), 'whip');
  SFX(181, 2, 'creak', .6);
  C(181, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#5a5a62'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const k = clamp((lt - .3) / .8); P(g, 'apollinaire', lerp(640, 1000, k), 760, .64, t, { walk: k > 0 && k < 1 ? t * 7 : 0, turn: .7, pose: k >= 1 ? 'cheer' : 'idle', face: { mouth: 'grin', eyes: 'happy' } }); g.save(); g.translate(0, -k * 720); for (let i = 0; i < 10; i++) ln(g, [[340 + i * 66, 0], [340 + i * 66, 720]], 14, '#2a2a30'); g.restore(); },
    ui: c => DR.write(c, 'RELEASED · ~5 DAYS LATER', 640, 100, 50, lt, .2) })), 'whip');
  SFX(182, 2, 'stamp', .7);
  C(182, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { P(g, 'apollinaire', 460, 760, .6, t, { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'picasso', 820, 760, .6, t, { pose: 'thumbsUp', face: { mouth: 'grin', eyes: 'happy' } }); }, ui: c => DR.sign(c, 'CLEARED', 640, 200, lt, R(182, 2), { size: 70, fill: '#2a8a4a' }) })), 'flash');
  SFX(183, 15, 'ding', .5); SFX(183, 23, 'buzz', .5);
  C(183, 5, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { head(g, 'picasso', 640, 250, .7, t, { face: { mouth: 'smirk', eyes: 'half' } }); },
    ui: c => { if (lt > R(183, 15) - .2) DR.sign(c, 'INNOCENT: THE BIG CRIME', 360, 560, lt, R(183, 15) - .2, { size: 34, fill: '#2a8a4a' }); if (lt > R(183, 23) - .2) DR.sign(c, 'GUILTY: A SMALL ONE', 920, 560, lt, R(183, 23) - .2, { size: 34 }); } })), 'whip');

  // ---------------- L184–198 two years in a trunk → Florence 1913 ----------------
  mood(184, 'heist'); SFX(184, 21, 'creak', .6); AMB(184, 'night', 10, .35);
  C(184, null, S((lt, R, t) => ({ cam: [[640, 420, 1.0], [640, 440, 1.25]], bg: (g, t) => MS.room(g, t, { open: clamp((lt - R(184, 20)) / .8), glow: true }), atm: { dark: .3 },
    ui: c => { DR.write(c, 'MEANWHILE, A FEW MILES AWAY…', 640, 100, 50, lt, .1); if (lt > R(184, 20)) DR.callout(c, 'A WOODEN TRUNK', 1000, 300, lt, R(184, 20), 760, 520, { screen: true }); } })), 'whip');
  for (let i = 0; i < 12; i++) G.SFXat(C.t(185, 0) + .1 + i * .2, 'paper', .25);
  C(185, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => { const m = Math.floor(clamp(lt / 2.6) * 27); MS.room(g, t, { cal: ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'][m % 12], calTop: String(1911 + Math.floor((m + 7) / 12)) }); },
    ui: c => DR.write(c, 'FOR MORE THAN TWO YEARS', 640, 100, 52, lt, .1) })), 'whip');
  mood(186, 'curious'); K2.era(t0(186, 0), 'FLORENCE', 'NOV 1913'); SFX(186, 14, 'paper', .6);
  C(186, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MS.florence(g, t), act: (g, t) => { P(g, 'geri', 640, 760, .7, t, { pose: 'present', face: { mouth: 'o', eyes: 'wide' } }); },
    ui: c => { DR.write(c, 'ALFREDO GERI', 640, 640, 58, lt, R(186, 10) - .2); DR.callout(c, 'ANTIQUES DEALER', 1000, 160, lt, R(186, 5)); DR.yearTag(c, 'NOV 1913', lt, .2); } })), 'whip');
  SFX(187, 8, 'chime', .5);
  C(187, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#3a2618'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { card(g, 640, 360, 640, 480, '#f4ead4'); g.font = 'italic 30px Georgia, serif'; g.fillStyle = '#2a1a10'; g.textAlign = 'left'; const L = ['Dear Signor Geri,', 'I can bring the Gioconda', 'HOME to Italy…']; const n = Math.floor(clamp((lt - .2) / 2) * 40); let left = n; L.forEach((l, i) => { g.fillText(l.slice(0, Math.max(0, left)), 360, 220 + i * 60); left -= l.length; }); } })), 'whip');
  SFX(188, 3, 'sparkle', .6); SFX(188, 3, 'boing', .4);
  C(188, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#3a2618'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { card(g, 640, 360, 640, 480, '#f4ead4'); g.font = 'italic 30px Georgia, serif'; g.fillStyle = '#2a1a10'; g.textAlign = 'left'; ['Dear Signor Geri,', 'I can bring the Gioconda', 'HOME to Italy…'].forEach((l, i) => g.fillText(l, 360, 220 + i * 60)); const k = clamp((lt - .1) / .8); g.font = 'italic 54px Georgia, serif'; g.fillStyle = '#7a1e18'; g.fillText('Leonardo'.slice(0, Math.ceil(8 * k)), 600, 520); },
    ui: c => DR.write(c, 'SIGNED: "LEONARDO"', 640, 660, 50, lt, .5) })), 'zoom');
  SFX(189, 1, 'pop', .5);
  C(189, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.1]], dof: 6, bg: (g, t) => MS.florence(g, t), act: (g, t) => head(g, 'geri', 640, 280, 1, t, { face: { mouth: 'smirk', eyes: 'half', brows: 'sly', look: [.6, 0] } }), ui: c => DR.write(c, 'GERI PLAYS ALONG', 640, 640, 56, lt, .1) })), 'whip');
  SFX(190, 4, 'footsteps', .5, 2); SFX(190, 8, 'bell', .5);
  C(190, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MS.florence(g, t), act: (g, t) => { const k = clamp(lt / 3); P(g, 'peruggiaS', lerp(-100, 700, k), 740, .58, t, { walk: k < 1 ? t * 7 : 0, turn: .8, face: { mouth: 'smile' } }); MS.trunk(g, lerp(-100, 700, k) + 120, 740, .35, 0); sh(g, '#e8dcc0', 4, c => c.rect(860, 280, 300, 300)); sh(g, '#c8281e', 4, c => c.rect(880, 300, 260, 60)); label(g, 'HOTEL', 1010, 330, 40, '#fff'); },
    ui: c => { DR.yearTag(c, 'DEC 10, 1913', lt, .1); DR.callout(c, 'NEAR THE STATION', 1010, 640, lt, R(190, 12)); } })), 'whip');
  SFX(191, 3, 'creak', .5); SFX(191, 11, 'card', .6);
  C(191, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.13]], bg: (g, t) => MS.hotel(g, t), act: (g, t) => { P(g, 'geri', 360, 760, .64, t, { pose: 'present', turn: .5, face: { mouth: 'smile' } }); P(g, 'poggi', 560, 760, .64, t, { pose: 'crossed', turn: .5, face: { mouth: 'flat', eyes: 'half' } }); },
    ui: c => { DR.write(c, 'GIOVANNI POGGI', 640, 640, 56, lt, R(191, 11) - .2); DR.callout(c, 'DIRECTOR, UFFIZI GALLERY', 1000, 160, lt, R(191, 5)); } })), 'whip');
  SFX(192, 2, 'creak', .7); SFX(192, 4, 'cloth', .6); SFX(192, 9, 'sparkle', .7);
  C(192, null, S((lt, R, t) => ({ cam: [[640, 420, 1.15], [640, 400, 1.3]], bg: (g, t) => MS.hotel(g, t), act: (g, t) => { const op = clamp((lt - R(192, 2)) / .6), up = clamp((lt - R(192, 9)) / .8); MS.trunk(g, 640, 700, .9, op, true); if (op > .5) { const r = rng(4); for (let i = 0; i < 6; i++) { const k = clamp((lt - R(192, 4) - i * .12) / .5); g.save(); g.translate(640 + (r() - .5) * 200 + (r() - .5) * 600 * k, 540 - Math.sin(k * PI) * 200 + k * 160); g.rotate(k * 4); sh(g, ['#e8dcc0', '#7a8aa0', '#c8a070'][i % 3], 3, c => c.rect(-40, -20, 80, 40)); g.restore(); } }
      if (up > 0) ML.mona(g, 640, lerp(620, 380, ease.out(up)), 200, { frame: false }); P(g, 'peruggiaS', 380, 760, .6, t, { pose: up > 0 ? 'presentBoth' : 'idle', turn: .5, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { if (lt > R(192, 9)) DR.write(c, 'A WOODEN PANEL', 640, 100, 56, lt, R(192, 9)); } })), 'whip');
  SFX(193, 1, 'tick', .4); SFX(193, 6, 'tick', .4);
  C(193, null, S((lt, R, t) => ({ cam: [[640, 380, 1.3], [640, 360, 1.4]], bg: (g, t) => MS.hotel(g, t), act: (g, t) => { ML.mona(g, 640, 360, 220, { frame: false }); P(g, 'poggi', 360, 760, .6, t, { pose: 'magnify', prop: 'magnifier', turn: .6, face: { mouth: 'flat', eyes: 'squint' } }); },
    ui: c => { DR.callout(c, 'LOUVRE STAMP ON THE BACK?', 980, 200, lt, .6, null, null, { size: 26 }); DR.callout(c, 'MATCHES THE RECORDS?', 980, 280, lt, 1.6, null, null, { size: 26 }); } })), 'whip');
  mood(194, 'tender'); SFX(194, 1, 'tada', .7);
  C(194, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { const k = GX.pop(lt, 0, .4); g.save(); g.translate(640, 340); g.scale(k, k); ML.mona(g, 0, 0, 340, {}); g.restore(); }, ui: c => DR.write(c, "IT'S HER.", 640, 640, 80, lt, .2) })), 'flash');
  mood(195, 'comic'); SFX(195, 1, 'chime', .4);
  C(195, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.12]], bg: (g, t) => MS.hotel(g, t), act: (g, t) => { P(g, 'geri', 360, 760, .62, t, { pose: 'present', turn: .5, face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'poggi', 560, 760, .62, t, { pose: 'presentBoth', turn: .5, face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'peruggiaS', 940, 760, .62, t, { pose: 'thumbsUp', turn: -.5, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => GX.bubble(c, 'JUST TO AUTHENTICATE IT…', 460, 220, lt, .3, 460, 330, { size: 30 }) })), 'whip');
  mood(196, 'danger'); SFX(196, 2, 'whistle', .8); SFX(196, 2, 'impact', .7);
  C(196, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.0]], shake: lt > R(196, 2) ? .5 : 0, bg: (g, t) => MS.hotel(g, t), act: (g, t) => { const k = clamp((lt - R(196, 1)) / .4); P(g, 'peruggiaS', 640, 760, .62, t, { pose: k > 0 ? 'shrug' : 'idle', face: k > 0 ? { mouth: 'shock', eyes: 'wide', sweat: true } : { mouth: 'smile' } }); for (const [x0, x1] of [[-200, 380], [1500, 900]]) P(g, 'police', lerp(x0, x1, ease.out(k)), 760, .62, t, { pose: 'pointSide', turn: x0 < 0 ? .6 : -.6, face: { mouth: 'grit', brows: 'angry' } }); },
    ui: c => DR.write(c, 'THEN THE POLICE ARRIVE', 640, 100, 56, lt, .1) })), 'whip');
  mood(197, 'rising'); SFX(197, 1, 'cheer', .8, 2.5);
  C(197, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MS.florence(g, t), crowd: DR.army(-60, 580, 1340, 712, 34, ['paris1911a', 'paris1911b', 'geri', 'poggi'], .32, .44, 197, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }), act: (g, t) => { const r = rng(9); for (let i = 0; i < 40; i++) { g.fillStyle = ['#2a8a4a', '#fff', '#c8281e'][i % 3]; g.fillRect(r() * W + Math.sin(lt * 3 + i) * 10, ((lt * 160 + r() * 720) % 760) - 20, 10, 10); } },
    ui: c => DR.write(c, 'ITALY GOES WILD', 640, 110, 70, lt, .1, { col: '#fff' }) })), 'flash');
  SFX(198, 7, 'crowd', .6, 2); SFX(198, 16, 'tada', .5);
  C(198, null, S((lt, R, t) => { const v = M.view(7, 45.3, 70); return { bg: g => DR.map(g, t, v), act: (g, t) => { M.route(g, v, [[11.25, 43.77], [12.5, 41.9], [9.19, 45.46], [2.35, 48.86]], clamp((lt - .3) / 3.5), { w: 7, col: '#c8281e' }); },
    ui: c => { DR.mapWrite(c, v, 11.25, 43.77, 'FLORENCE', lt, .1, { dy: 40, size: 34 }); DR.mapWrite(c, v, 12.5, 41.9, 'ROME', lt, 1, { dy: 40, size: 34 }); DR.mapWrite(c, v, 9.19, 45.46, 'MILAN', lt, 2, { dy: -40, size: 34 }); DR.mapWrite(c, v, 2.35, 48.86, 'PARIS', lt, R(198, 16), { dy: -40, size: 40 }); if (lt > R(198, 12)) DR.yearTag(c, 'JAN 4, 1914', lt, R(198, 12)); } }; }), 'whip');

  // ---------------- L199–208 the trial + the Napoleon callback ----------------
  mood(199, 'curious'); K2.era(t0(199, 0), 'THE TRIAL', '1914'); EP.ticket('NAPOLEON STOLE HER?', t0(200, 12), t0(206, 0), t0(202, 2), false);
  SFX(199, 5, 'boing', .4);
  C(199, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.08]], dof: 6, bg: (g, t) => MS.court(g, t), act: (g, t) => head(g, 'peruggiaS', 640, 280, 1, t, { face: { mouth: 'flat', eyes: 'half', look: [.5, 0] } }), ui: c => DR.write(c, 'SO WHY DID HE DO IT?', 640, 640, 56, lt, .1) })), 'whip');
  SFX(200, 1, 'stamp', .6);
  C(200, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MS.court(g, t), act: (g, t) => { P(g, 'judgeIT', 640, 520, .5, t, { pose: 'crossed', face: { mouth: 'flat', eyes: 'half' } }); P(g, 'peruggiaS', 380, 760, .64, t, { pose: 'presentBoth', turn: .5, face: { mouth: 'open', brows: 'up' } }); },
    ui: c => { GX.bubble(c, 'I BROUGHT HER HOME TO ITALY!', 420, 240, lt, R(200, 5), 400, 380, { size: 28 }); if (lt > R(200, 12)) GX.bubble(c, 'NAPOLEON STOLE HER!', 860, 300, lt, R(200, 12), 460, 400, { size: 28, fill: '#ffe0e0' }); } })), 'whip');
  SFX(201, 4, 'whoosh', .6); SFX(201, 4, 'zap', .3);
  C(201, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.08]], bg: (g, t) => MS.tuileries(g, t, {}), act: (g, t) => P(g, 'napoleon', 900, 760, .66, t, { pose: 'crossed', turn: -.4, face: { mouth: 'smirk', eyes: 'happy' } }), atm: { warm: .3 },
    ui: c => { DR.write(c, "REMEMBER NAPOLEON'S BEDROOM?", 640, 100, 50, lt, .2); c.save(); c.globalAlpha = .25; c.fillStyle = '#fff'; for (let y = 0; y < 720; y += 6) c.fillRect(0, y, 1280, 2); c.restore(); } })), 'whip');
  SFX(202, 2, 'buzz', .8); SFX(202, 2, 'stamp', .7);
  C(202, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), act: (g, t) => P(g, 'napoleon', 640, 760, .7, t, { pose: 'shrug', face: { mouth: 'o', eyes: 'wide', brows: 'up' } }), ui: c => DR.sign(c, "DIDN'T STEAL HER", 640, 200, lt, R(202, 1), { size: 64 }) })), 'flash');
  SFX(203, 1, 'gallop', .5, 1.5);
  C(203, null, S((lt, R, t) => { const v = M.view(6.6, 44.6, 82); return { bg: g => DR.map(g, t, v), act: (g, t) => { M.route(g, v, [[11.25, 43.77], [9.19, 45.46], [7, 45.5], [.98, 47.41]], clamp(lt / 2), { w: 7, col: '#c8281e' }); const k = clamp(lt / 2), [x, y] = M.pt(v, lerp(11.25, .98, k), lerp(43.77, 47.41, k)); P(g, 'leonardo', x, y + 30, .22, t, { walk: t * 6, turn: -.8 }); },
    ui: c => DR.write(c, 'LEONARDO CARRIED HER TO FRANCE', 640, 640, 48, lt, .1) }; }), 'whip');
  SFX(204, 3, 'coins', .6);
  C(204, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.14]], bg: (g, t) => MS.versailles(g, t, { mona: false }), act: (g, t) => { P(g, 'francis', 420, 760, .62, t, { pose: 'present', turn: .5, face: { mouth: 'grin' } }); ML.mona(g, 860, 420, 220, {}); }, ui: c => DR.write(c, 'A FRENCH KING PAID FOR HER', 640, 100, 50, lt, .1) })), 'whip');
  SFX(205, 10, 'stamp', .8);
  C(205, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.court(g, t), act: (g, t) => P(g, 'peruggiaS', 640, 760, .7, t, { pose: 'facepalm', face: { mouth: 'frown', eyes: 'closed' } }), ui: c => { DR.write(c, 'RISKED PRISON FOR…', 640, 100, 52, lt, .1); if (lt > R(205, 9)) DR.sign(c, 'A PAINTING ITALY NEVER LOST', 640, 600, lt, R(205, 9), { size: 40 }); } })), 'whip');
  SFX(206, 4, 'gavel', .7);
  C(206, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.08]], bg: (g, t) => MS.court(g, t), act: (g, t) => { P(g, 'judgeIT', 640, 520, .5, t, { pose: 'thumbsUp', face: { mouth: 'smile', eyes: 'happy' } }); P(g, 'peruggiaS', 380, 760, .62, t, { pose: 'idle', turn: .5, face: { mouth: 'smile' } }); },
    ui: c => DR.write(c, 'THE COURT WENT EASY', 640, 100, 52, lt, .1) })), 'whip');
  SFX(207, 3, 'card', .5); SFX(207, 9, 'drop', .5);
  C(207, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const w1 = 900 * ease.out(clamp((lt - R(207, 4)) / .6)), w2 = 900 * lerp(1, .6, ease.out(clamp((lt - R(207, 9)) / .5))) * (lt > R(207, 9) ? 1 : 0); sh(g, '#e8707a', 4, c => c.rect(190, 280, w1, 70)); label(g, 'SENTENCE ≈ 1 YEAR', 640, 250, 32, '#fff'); if (w2 > 0) { sh(g, '#7ae8a0', 4, c => c.rect(190, 420, w2, 70)); label(g, 'SERVED: LESS', 640, 390, 32, '#fff'); } },
    ui: c => { if (lt > R(207, 9) + .4) DR.callout(c, 'HOW LONG? SOURCES DISAGREE', 640, 600, lt, R(207, 9) + .4); } })), 'whip');
  SFX(208, 1, 'buzz', .4);
  C(208, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: g => DR.sunburst(g, t, '#e8c890', '#f4e0b0'), act: (g, t) => { const p = Math.sin(lt * 4) * 14; P(g, 'charney', 400 + p, 750, .6, t, { pose: 'pointSide', turn: .6, face: { mouth: 'open', brows: 'angry' } }); P(g, 'jestaz', 880 - p, 750, .6, t, { pose: 'pointSideL', turn: -.6, face: { mouth: 'grit', brows: 'angry' } }); },
    ui: c => { GX.bubble(c, '7 MONTHS!', 330, 230, lt, .2, 400, 330, { size: 30 }); GX.bubble(c, 'NO, 8!', 960, 230, lt, .7, 880, 330, { size: 30 }); } })), 'whip');

  // ---------------- L209–221 the Valfierno legend → the truth → a celebrity ----------------
  mood(209, 'curious'); K2.era(t0(209, 0), 'LEGEND CHECK', '1932'); EP.ticket('SIX FAKE MONA LISAS?', t0(211, 0), t0(217, 0), t0(215, 2), false);
  SFX(209, 3, 'card', .6);
  C(209, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), ui: c => DR.banner(c, 'ONE MORE MYTH', 640, 360, lt, .1, { size: 64 }) })), 'flash');
  SFX(210, 7, 'paper', .7); SFX(210, 18, 'card', .5);
  C(210, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { const k = GX.pop(lt, .2, .4); g.save(); g.translate(460, 360); g.scale(k, k); g.rotate(-.05); K2.paper(g, 0, 0, .9, { mast: 'THE SATURDAY EVENING POST', head: 'WHY AND HOW THE MONA LISA WAS STOLEN', headSize: 22, date: '1932' }); g.restore(); if (lt > R(210, 17)) P(g, 'decker', 980, 760, .62, t, { pose: 'present', turn: -.5, face: { mouth: 'grin', brows: 'sly' } }); },
    ui: c => { DR.yearTag(c, '1932', lt, .1); if (lt > R(210, 17)) DR.write(c, 'KARL DECKER', 980, 140, 50, lt, R(210, 17)); } })), 'whip');
  SFX(211, 5, 'sting', .6); SFX(211, 17, 'pop', .4);
  C(211, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: g => { g.fillStyle = '#1a1a22'; g.fillRect(-300, -300, 1900, 1400); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 300, 500, 'rgba(255,220,160,.2)'); g.restore(); },
    act: (g, t) => { g.save(); g.filter = 'brightness(0.06)'; P(g, 'decker', 640, 740, .7, t, { pose: 'hips', hat: 'topHat' }); g.restore(); g.save(); g.globalCompositeOperation = 'lighter'; for (const sd of [-1, 1]) T.glow(g, 640 + sd * 24, 335, 14, 'rgba(255,220,80,.9)'); g.restore();
      for (let i = 0; i < 6; i++) { const k = GX.pop(lt, R(211, 16) + i * .12, .25); if (k <= 0) continue; const x = 140 + i * 200 - (i > 2 ? -40 : 40); g.save(); g.translate(x, 260 + (i % 2) * 40); g.scale(k * .6, k * .6); ML.mona(g, 0, 0, 220, { smile: .2 + i * .15, look: (i - 2.5) / 3 }); g.restore(); } },
    ui: c => { DR.write(c, 'THE "MARQUÉS DE VALFIERNO"', 640, 620, 46, lt, R(211, 11)); if (lt > R(211, 17)) DR.callout(c, '6 FAKES → RICH AMERICANS', 640, 90, lt, R(211, 17)); } })), 'whip');
  SFX(212, 3, 'tada', .4);
  C(212, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), ui: c => DR.write(c, 'A GREAT STORY.', 640, 360, 90, lt, .05) })), 'whip');
  SFX(213, 5, 'pop', .5);
  C(213, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#15100c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { for (let i = 0; i < 6; i++) { const k = GX.pop(lt, .1 + i * .15, .25); if (k <= 0) continue; g.save(); g.translate(170 + (i % 3) * 470, 220 + Math.floor(i / 3) * 290); g.scale(k, k); sh(g, '#2a2a30', 4, c => c.rect(-110, -130, 220, 260)); ML.mona(g, 0, -20, 130, { frame: false }); label(g, ['THE HEIST', 'STOLEN SMILE', 'MONA MISSING', 'THE FORGER', 'GIOCONDA', 'SIX COPIES'][i], 0, 100, 22, '#f2d23a'); g.restore(); } },
    ui: c => DR.write(c, 'HALF A DOZEN MOVIES', 640, 660, 52, lt, .2) })), 'whip');
  SFX(214, 3, 'drum', .5);
  C(214, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.14]], bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => P(g, 'decker', 640, 760, .7, t, { pose: 'shrug', face: { mouth: 'grin', eyes: 'happy', sweat: true } }), ui: c => DR.callout(c, 'ONLY SOURCE: KARL DECKER', 640, 120, lt, .2) })), 'whip');
  SFX(215, 4, 'pop', .6);
  C(215, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#1a1a22'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const k = clamp((lt - R(215, 4)) / .8); if (k < .2) { g.save(); g.filter = 'brightness(0.06)'; P(g, 'decker', 640, 740, .7, t, { pose: 'hips', hat: 'topHat' }); g.restore(); } GX.poof(g, 640, 450, k, 1.6); }, ui: c => DR.write(c, 'NEVER PROVED TO EXIST', 640, 640, 56, lt, .3) })), 'whip');
  SFX(216, 3, 'stamp', 1);
  C(216, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => K2.paper(g, 640, 360, .9, { mast: 'THE SATURDAY EVENING POST', head: 'HOW THE MONA LISA WAS STOLEN', headSize: 24, date: '1932' }), ui: c => DR.sign(c, 'UNVERIFIED LEGEND', 640, 360, lt, R(216, 3) - .1, { size: 64, rot: -.15 }) })), 'flash');
  mood(217, 'tender');
  C(217, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a6a5a', '#3a7a6a'), ui: c => { DR.write(c, 'THE TRUTH IS STRANGER…', 640, 300, 60, lt, .1); DR.write(c, "…BECAUSE IT'S SIMPLER", 640, 420, 60, lt, R(217, 4), { col: '#f2d23a' }); } })), 'whip');
  SFX(218, 1, 'stamp', .7); SFX(218, 3, 'stamp', .7); SFX(218, 5, 'stamp', .7);
  C(218, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { const a = GX.pop(lt, R(218, 1) - .2, .3), b = GX.pop(lt, R(218, 3) - .2, .3), cc = GX.pop(lt, R(218, 5) - .2, .3);
      if (a > 0) { g.save(); g.translate(260, 400); g.scale(a, a); P(g, 'peruggia', 0, 200, .4, t, { pose: 'idle', face: { mouth: 'smile' } }); g.restore(); } if (b > 0) { g.save(); g.translate(640, 400); g.scale(b, b); sh(g, '#f6f4ee', 5, c => c.roundRect(-90, -120, 180, 220, 20)); for (let i = 0; i < 3; i++) sh(g, '#d8d4c8', 2, c => c.arc(0, -70 + i * 50, 7, 0, TAU)); g.restore(); }
      if (cc > 0) { g.save(); g.translate(1020, 400); g.scale(cc, cc); sh(g, '#fff', 5, c => c.roundRect(-110, -110, 220, 200, 14)); sh(g, '#c8281e', 0, c => c.roundRect(-110, -110, 220, 60, 14)); label(g, 'MONDAY', 0, -80, 30, '#fff'); label(g, '21', 0, 10, 80); g.restore(); } },
    ui: c => { DR.write(c, 'ONE HANDYMAN', 260, 640, 36, lt, R(218, 1)); DR.write(c, 'ONE SMOCK', 640, 640, 36, lt, R(218, 3)); DR.write(c, 'ONE MONDAY', 1020, 640, 36, lt, R(218, 5)); } })), 'whip');
  mood(219, 'rising'); SFX(219, 3, 'cheer', .5, 2);
  C(219, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 370, 1.0]], bg: (g, t) => MS.salon(g, t, {}), crowd: DR.army(60, 600, 1220, 712, 20, ['paris1911a', 'paris1911b', 'poet', 'farmer'], .4, .5, 219, { spr: { pose: 'cheer', back: true } }), act: (g, t) => { for (let i = 0; i < 8; i++) { if (((t * 1.6 + i * .37) % 2) < .12) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 140 + i * 140, 300 + (i % 3) * 40, 70, 'rgba(255,255,255,.9)'); g.restore(); } } },
    ui: c => { DR.yearTag(c, 'JAN 1914', lt, .1); DR.write(c, 'SHE CAME BACK…', 640, 100, 54, lt, .2); } })), 'dissolve');
  SFX(220, 3, 'tada', .7); SFX(220, 3, 'sparkle', .6);
  C(220, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#1a1a22'; g.fillRect(-300, -300, 1900, 1400); for (let i = 0; i < 9; i++) { g.save(); g.globalCompositeOperation = 'lighter'; g.translate(640, 720); g.rotate(-PI / 2 + (i - 4) * .18 + Math.sin(t + i) * .05); g.fillStyle = 'rgba(255,240,200,.08)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(900, -60); g.lineTo(900, 60); g.closePath(); g.fill(); g.restore(); } },
    act: (g, t) => { ML.mona(g, 640, 330, 300, { glass: true }); for (let i = 0; i < 12; i++) { const k = (t * .5 + i / 12) % 1; g.save(); g.globalAlpha = 1 - k; g.fillStyle = '#f2d23a'; g.font = MK(30); g.fillText('★', 640 + Math.cos(i) * 260 * k, 330 + Math.sin(i * 2) * 200 * k); g.restore(); } },
    ui: c => DR.sign(c, 'A CELEBRITY', 640, 610, lt, R(220, 3) - .1, { size: 60, fill: '#c8a24a' }) })), 'flash');
  mood(221, 'adventure'); for (let i = 0; i < 6; i++) G.SFXat(C.t(221, 0) + .1 + i * .3, 'whoosh', .35);
  C(221, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a2a3a', '#3a3a4a'), act: (g, t) => { ML.mona(g, 640, 360, 300, {}); const sl = ['#5a5e66', '#6a6040', '#e86a9a', '#1e2a4a', '#3a8ae8', '#c8281e']; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + .8, k = ease.out(clamp((lt - i * .25) / .5)), d = lerp(900, 330, k); GX.hand(g, 640 + Math.cos(a) * d, 360 + Math.sin(a) * d, .5, a, { kind: 'open', sleeve: sl[i] }); } },
    ui: c => DR.write(c, 'AND THE HANDS KEPT COMING', 640, 650, 54, lt, .2) })), 'whip');
})(window);
