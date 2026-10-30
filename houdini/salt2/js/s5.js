/* "It's About Salt" remake — PASS 3 (user review, Oct '28): no more 4–12 s holds of characters standing and swaying.
 * Every former long shot is split on the narration into ACTION BEATS (a new thing happens every 1–2 s), using the
 * devices learned from the reference clips: insert hands that stamp / slam / sweep, map regions with faces and arms,
 * hanging count signs, question tickets that flip from red ✗ to green ✓, speech-bubble punchlines, evil silhouettes,
 * divine reveals, poofs, impacts and speed lines. Loaded after s4.js; C() entries are sorted by time, so each one here
 * cuts into the shot that was holding too long. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, K = G.VK, Gd = G.Guide, { W, H, clamp, lerp, rng } = T;
  const { sh, ln, circ } = G.Paint, TAU = Math.PI * 2, PI = Math.PI;
  const { C, P, head, SFX, AMB, say } = G, mood = EP.mood, MK = DR.MK, ease = DR.ease;
  const pose = (lt, keys) => Gd.pose(lt, keys), pop = (lt, t0, d = .3) => { const k = clamp((lt - t0) / d); return k <= 0 ? 0 : G.FX ? G.FX.settle(k) : k; };
  const S2 = G.SALT2X = {};
  const alias = (k, base, o = {}) => { G.CW[k] = Object.assign({}, G.CW[base], o, { look: Object.assign({}, (G.CW[base] || {}).look, o.look) }); };
  alias('sansculotte', 'peasant', { look: { beard: 'stubble' } }); alias('peasantW', 'peasant', { look: { hair: 'curly', hairCol: '#5a3a22', lashes: true, beard: null } });
  alias('louis', 'noble', { hat: 'crown' }); alias('scholar2', 'scholar', { look: { beard: 'full', beardCol: '#6a6a6a', hairCol: '#6a6a6a' } });
  alias('ridley', 'reporter', { look: { glasses: true } }); alias('indianW', 'marcher2', { look: { lashes: true } }); alias('marcherW', 'marcher2'); alias('kidG', 'kid', { look: { hair: 'curly', hairCol: '#3a2a1a', lashes: true } });

  const { hand, poof, impact, speed, face, bubble, hangSign, divine, evil, blob } = G.GX, ticket = EP.ticket; G.SALT2X = G.GX;
  const tt = (n, k) => C.t(n, k);

  // ===================== BEAT 0–1: the cold open, the mine =====================
  // L5 "roads … four out of every ten tons": a hand sorts ten sacks, four slide onto the road
  SFX(5, 3, 'sack', .6); SFX(5, 10, 'whoosh', .5);
  C(5, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#2a3a6a', '#1e2a4a'),
    act: (g, t) => { for (let i = 0; i < 10; i++) { const road = i < 4, k = road ? clamp((lt - .3 - i * .18) / .35) : 0, x = 200 + i * 98 + (road ? 0 : 0), y = 430 + (road ? ease.out(k) * 150 : 0);
        TS.sack(g, x, y, 1, road ? '#e8dcc0' : '#d8cfb8'); g.font = MK(22); g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText(road ? 'ROAD' : 'SALT', x, y - 26); if (road && k > 0 && k < 1) impact(g, x, y + 10, k, .5); }
      ln(g, [[150, 640], [560, 640]], 14, '#2a2a30'); ln(g, [[180, 640], [530, 640]], 3, '#f2d23a'); if (lt < 1.2) hand(g, 300 + lt * 100, 380, .8, -2.2, { kind: 'open' }); },
    ui: c => DR.write(c, '4 IN EVERY 10 TONS', 640, 130, 60, lt, .25, { underline: '#c8281e' }) }), 'whip');
  C(5, 10, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 1.6], [640, 470, 1.4]], bg: (g, t) => TS.highway(g, t), act: (g, t) => { TS.truck(g, 640, 600, 1.4, t, { spray: 1 }); speed(g, 640, 560, -1, 5, 120); }, atm: { snow: 90, night: .25 },
    ui: c => DR.callout(c, 'ON THE ROAD', 330, 160, lt, .3, 560, 640) }), 'zoom');

  // L47–49 the 7,000-year claim: archaeologist taps a calendar, the antler pick floats in a museum case
  SFX(47, 15, 'card', .6); SFX(47, 16, 'tada', .4);
  C(47, 10, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#e8b860', '#f6d898'),
    act: (g, t) => { const n = Math.round(lerp(0, 7000, ease.out(clamp((lt - .3) / 1.4)))); g.save(); g.translate(640, 380); g.rotate(-.04); sh(g, '#fff', 6, c => c.roundRect(-300, -150, 600, 300, 20)); sh(g, '#c8281e', 0, c => c.roundRect(-300, -150, 600, 70, 20));
        g.font = MK(40); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('YEARS OF SALT MINING', 0, -114); g.font = MK(140); g.fillStyle = '#15100c'; g.fillText(n.toLocaleString(), 0, 40); g.restore();
      P(g, 'digger', 1050, 760, .6, t, { pose: pose(lt, [[0, 'idle'], [.6, 'pointUp'], [1.6, 'thumbsUp']]), turn: -.4, face: { mouth: 'grin', eyes: 'happy' } }); } }), 'whip');
  SFX(48, 6, 'stamp', .6); SFX(48, 9, 'sparkle', .5);
  C(48, 5, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.05], [640, 370, 1.2]], bg: g => { g.fillStyle = '#1e2430'; g.fillRect(-300, -300, 1900, 1400); T.glow(g, 640, 200, 500, 'rgba(255,240,200,.35)'); sh(g, '#3a3028', 4, c => c.rect(360, 560, 560, 200)); },
    act: (g, t) => { g.save(); g.translate(640, 380 + Math.sin(t * 2) * 6); g.rotate(-.3); ln(g, [[-180, 30], [160, -10]], 26, '#d8c8a0'); ln(g, [[40, 4], [80, -90]], 18, '#d8c8a0'); ln(g, [[110, -6], [170, -80]], 16, '#d8c8a0'); g.restore();
      g.save(); g.globalAlpha = .25; g.fillStyle = '#cfe8ff'; g.fillRect(360, 200, 560, 360); g.restore(); g.strokeStyle = '#15100c'; g.lineWidth = 6; g.strokeRect(360, 200, 560, 360); if (lt > R(48, 9)) { g.font = MK(26); g.fillStyle = '#fff'; g.fillText('', 0, 0); } },
    ui: c => { DR.write(c, 'ONE ANTLER PICK', 640, 110, 58, lt, .15); DR.yearTag(c, 'FOUND 1838', lt, R(48, 9) - .2); } }), 'dissolve');

  // L54–55 Hallstatt finds: leather, rope, torches — each item SLAMS onto a museum table with a stamp label
  SFX(54, 0, 'thud', .6); SFX(54, 3, 'thud', .6); SFX(55, 0, 'thud', .7); SFX(55, 2, 'fire', .5, 1.2);
  C(54, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#e8dcbc'; g.fillRect(-300, -300, 1900, 1400); g.fillStyle = '#8a6a44'; g.fillRect(-300, 520, 1900, 400); ln(g, [[-300, 520], [1600, 520]], 6, '#3a2a1a'); },
    act: (g, t) => { const items = [[0, 330, 'LEATHER GLOVE', '#8a5a2e'], [R(54, 3), 640, 'ROPE', '#c8a060'], [R(55, 0), 950, 'TORCHES', '#5a3a1e']];
      for (const [t0, x, lab, col] of items) { const k = clamp((lt - t0) / .25); if (k <= 0) continue; const y = lerp(-200, 470, ease.out(k)); g.save(); g.translate(x, y);
        if (lab === 'ROPE') for (let i = 0; i < 4; i++) sh(g, col, 4, c => c.ellipse(0, -20 - i * 16, 110, 30, 0, 0, TAU)); else if (lab === 'TORCHES') for (let i = 0; i < 9; i++) { g.save(); g.rotate((i - 4) * .08); ln(g, [[0, 30], [0, -160]], 9, col); g.restore(); }
        else sh(g, col, 5, c => { c.roundRect(-60, -110, 120, 140, 30); c.rect(-40, 20, 80, 40); }); g.restore(); impact(g, x, 500, clamp((lt - t0 - .25) / .3), .6);
        if (lt > t0 + .3) { g.font = MK(30); g.textAlign = 'center'; g.fillStyle = '#15100c'; g.fillText(lab, x, 600); } }
      if (lt > R(55, 2)) { P2fire(g, 950, 300, t); } },
    ui: c => DR.write(c, 'LEFT BEHIND 3,000 YEARS AGO', 640, 100, 46, lt, .1) }), 'whip');
  const P2fire = (g, x, y, t) => G.Paint2.fire(g, x, y, .6, t);
  // L59 "used it last Tuesday": the 3,000-year-old staircase gets a "SALE: LIKE NEW" tag; a miner walks up it
  SFX(59, 5, 'footsteps', .6, 2); SFX(59, 8, 'boing', .4);
  C(59, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[560, 360, 1.3], [700, 300, 1.35]], bg: (g, t) => TS.mine(g, t),
    act: (g, t) => { const k = clamp(lt / 2.2); P(g, 'miner', lerp(420, 760, k), lerp(640, 440, k), .42, t, { walk: t * 7, turn: .8, prop: 'torch' }); },
    ui: c => { bubble(c, 'STILL WORKS!', 900, 160, lt, .5, 760, 300, { size: 36 }); DR.callout(c, '≈3,000 YEARS OLD', 340, 600, lt, R(59, 8) - .3, null, null, { fill: '#fff3c8' }); } }), 'whip');

  // ===================== BEAT 2: Han China =====================
  // L70 Xiongnu: the map region grows a face and an arm with a sword, swings at HAN, HAN flinches
  SFX(70, 3, 'sword', .6); SFX(70, 5, 'impact', .6); SFX(70, 6, 'gasp', .4);
  C(70, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 390, 1.08]], bg: g => { g.fillStyle = '#efd49c'; g.fillRect(-300, -300, 1900, 1400); G.Paint2.grain(g, 0, 0, W, H, .2, 13, 'multiply', 1.3); },
    act: (g, t) => { const sw = clamp((lt - R(70, 5) + .3) / .3), hit = clamp((lt - R(70, 5)) / .4);
      blob(g, 640, 180, 420, 120, '#7a9a5a', 3, t); face(g, 640, 180, 1, sw > 0 ? 'angry' : 'smug', t); g.font = MK(44); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText('XIONGNU', 640, 110);
      g.save(); g.translate(900, 220); g.rotate(lerp(-1.4, .5, ease.out(sw))); ln(g, [[0, 0], [110, 60]], 26, '#15100c'); ln(g, [[0, 0], [110, 60]], 18, '#7a9a5a'); g.translate(120, 66); ln(g, [[0, 0], [0, -150]], 10, '#9aa4b0'); ln(g, [[-24, 0], [24, 0]], 10, '#5a3a1e'); g.restore();
      const shake = hit > 0 && hit < 1 ? Math.sin(t * 70) * 10 * (1 - hit) : 0; blob(g, 640 + shake, 500, 360, 170, '#e8907a', 9, t); face(g, 640 + shake, 500, 1.2, hit > 0 ? 'scared' : 'happy', t); g.fillStyle = '#15100c'; g.fillText('HAN', 640 + shake, 630); impact(g, 840, 380, hit, .8); } }), 'whip');
  // L73 "the richest people… were not nobles": nobles inflate with gold then POOF, a merchant pops up instead
  SFX(73, 5, 'coins', .6); SFX(73, 11, 'pop', .7); SFX(73, 12, 'tada', .5);
  C(73, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#d8a840', '#f6d88a'), act: (g, t) => { const gone = R(73, 11);
      if (lt < gone) P(g, 'sang', 640, 720, .7, t, { pose: 'hips', face: { mouth: 'smirk', eyes: 'half', brows: 'sly' } }); else { poof(g, 640, 450, clamp((lt - gone) / .6), 1.6); P(g, 'merchant', 640, 720 + (1 - clamp((lt - gone - .2) / .25)) * 300, .7, t, { pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy' } }); } },
    ui: c => { if (lt < R(73, 11)) DR.write(c, 'NOBLES?', 640, 120, 70, lt, .2); else DR.write(c, 'NOPE: MERCHANTS', 640, 120, 70, lt, R(73, 11) + .1, { col: '#f2d23a' }); } }), 'whip');
  // L75 their wealth vs the court's tax: two money piles race up on a bar chart
  SFX(75, 4, 'coins', .6, null); SFX(75, 9, 'cash', .6);
  C(75, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { const k = ease.out(clamp((lt - .2) / 1.6));
      for (const [x, lab, col] of [[480, 'MERCHANTS', '#f2c43a'], [800, "COURT'S TAX", '#e8907a']]) { const h = 330 * k * (lab === 'MERCHANTS' ? 1 : .97); sh(g, col, 5, c => c.rect(x - 90, 600 - h, 180, h)); for (let i = 0; i < h / 22; i++) sh(g, '#e8c45a', 2.5, c => c.ellipse(x + Math.sin(i) * 30, 590 - i * 22, 40, 10, 0, 0, TAU)); g.font = MK(32); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(lab, x, 650); }
      ln(g, [[300, 600], [980, 600]], 6, '#fff'); },
    ui: c => { DR.write(c, 'ABOUT EQUAL!?', 640, 110, 64, lt, 1.6, { col: '#f2d23a' }); DR.callout(c, '(REPORTEDLY)', 1060, 300, lt, R(75, 4), null, null, { fill: '#fff3c8', size: 28 }); } }), 'flash');

  // L111–112 the monopoly keeps coming back: a whack-a-mole of dynasties, the monopoly sign pops up every time
  SFX(112, 0, 'pop', .6); SFX(112, 6, 'pop', .6); SFX(112, 10, 'pop', .6); SFX(112, 15, 'pop', .6); SFX(112, 8, 'boing', .4);
  C(112, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#c8e0a0'; g.fillRect(-300, -300, 1900, 1400); sh(g, '#7aa25a', 0, c => c.rect(-300, 420, 1900, 600)); },
    act: (g, t) => { const names = ['TANG', 'SONG', 'MING', 'QING']; names.forEach((nm, i) => { const x = 250 + i * 260, t0 = .2 + i * .9, k = clamp((lt - t0) / .25), dn = clamp((lt - t0 - .6) / .2), up = k * (1 - dn) + (lt > t0 + .75 ? 1 : 0) * 0;
        sh(g, '#3a2a1e', 5, c => c.ellipse(x, 560, 100, 30, 0, 0, TAU)); const y = 560 - 150 * Math.max(up, lt > t0 + .8 ? 1 : 0);
        g.save(); g.beginPath(); g.rect(x - 120, 200, 240, 360); g.clip(); sh(g, '#c8281e', 5, c => c.roundRect(x - 70, y - 120, 140, 140, 16)); g.font = MK(26); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('SALT', x, y - 70); g.fillText('MONOPOLY', x, y - 36); g.restore();
        g.font = MK(34); g.fillStyle = '#15100c'; g.fillText(nm, x, 640); if (lt > t0 && lt < t0 + .5) hand(g, x + 40, y - 170, .55, -1.9, { kind: 'fist' }); impact(g, x, y - 60, clamp((lt - t0 - .1) / .3), .5); }); },
    ui: c => DR.write(c, 'IT KEPT COMING BACK', 640, 110, 60, lt, .1) }), 'whip');

  // ===================== BEAT 4: France =====================
  // L123 "permanent": the king's quill signs a scroll, a big wax seal slams down, PERMANENT stamp
  SFX(123, 6, 'pencil', .5, 1); SFX(123, 13, 'stamp', .8); SFX(123, 14, 'impact', .5);
  C(123, 5, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.1]], bg: g => { g.fillStyle = '#5a3020'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { sh(g, '#f2e6c8', 6, c => c.roundRect(300, 120, 680, 520, 10)); g.font = MK(46); g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText('LA GABELLE', 640, 210); for (let i = 0; i < 5; i++) ln(g, [[380, 280 + i * 50], [380 + 520 * clamp((lt - .1 - i * .15) / .5), 280 + i * 50]], 5, '#7a6a5a');
      const sk = clamp((lt - R(123, 13)) / .2); if (sk > 0) { g.save(); g.translate(820, 560); g.rotate(-.15); g.scale(2 - sk, 2 - sk); g.globalAlpha = sk; sh(g, '#b8281e', 5, c => c.arc(0, 0, 70, 0, TAU)); g.font = MK(30); g.fillStyle = '#fff'; g.fillText('ROI', 0, 10); g.restore(); impact(g, 820, 560, clamp((lt - R(123, 13) - .15) / .35), .9); }
      if (lt < R(123, 13)) { const k = clamp(lt / 1.6); g.save(); g.translate(400 + k * 500, 300 + Math.sin(lt * 12) * 20); g.rotate(-.7); ln(g, [[0, 0], [0, -180]], 8, '#e8e0d0'); sh(g, '#f4f0e8', 3, c => c.ellipse(0, -140, 22, 70, 0, 0, TAU)); g.restore(); } },
    ui: c => { if (lt > R(123, 13)) DR.sign(c, 'PERMANENT', 640, 600, lt, R(123, 13), { size: 50, rot: -.08 }); } }), 'whip');
  // L124 1400s: the salt-tax sack gets bigger and bigger on the scale
  SFX(124, 3, 'creak', .5); SFX(124, 7, 'thud', .7);
  C(124, 2, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: (g, t) => TS.grenier(g, t), cam: [[740, 380, 1.4], [740, 380, 1.5]], act: (g, t) => { const g2 = 1 + ease.out(clamp((lt - .3) / 1.6)) * 1.2; g.save(); g.translate(740, 470); g.scale(g2, g2); TS.sack(g, 0, 0, 1.2, '#e8dcc0'); g.font = MK(24); g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText('SEL', 0, -24); g.restore(); },
    ui: c => { DR.yearTag(c, '1400s', lt, .1); DR.write(c, 'THE SALT TAX', 640, 120, 64, lt, R(124, 7), { col: '#fff', underline: '#c8281e' }); } }), 'dissolve');

  // L145 the salt police: evil silhouette + glint; L146 galleys: a smuggler gets dragged to an oar, red tint, EXECUTED
  SFX(145, 7, 'sting', .6); SFX(145, 12, 'sword', .5);
  C(145, 7, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 380, 1.15]], bg: (g, t) => evil(g, t, lt, { hat: true, eyes: .35, bg: '#0e1424' }),
    ui: c => DR.write(c, '"GABELOUS"', 640, 640, 70, lt, .2, { col: '#ff4a3a' }) }), 'flash');
  SFX(146, 4, 'splash', .6); SFX(146, 7, 'creak', .5); SFX(146, 13, 'drum', .8); SFX(146, 13, 'sting', .6);
  C(146, 2, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [600, 400, 1.06]], bg: g => { g.fillStyle = '#5aa0c8'; g.fillRect(-300, -300, 1900, 1400); sh(g, '#3a7aa8', 0, c => c.rect(-300, 470, 1900, 600)); },
    act: (g, t) => { const row = Math.sin(t * 3); sh(g, '#6a4a2a', 5, c => { c.moveTo(80, 420); c.lineTo(1200, 420); c.quadraticCurveTo(1180, 520, 1040, 540); c.lineTo(200, 540); c.quadraticCurveTo(100, 520, 80, 420); });
      for (let i = 0; i < 9; i++) { const x = 220 + i * 100; ln(g, [[x, 470], [x - 60 + row * 30, 640]], 8, '#c8a060'); P(g, 'smuggler', x, 470, .2, t + i, { pose: 'idle', turn: .7, face: { mouth: 'grit', eyes: 'squint', sweat: true } }); }
      sh(g, '#f2e6c8', 4, c => c.rect(560, 80, 200, 220)); ln(g, [[660, 300], [660, 420]], 10, '#5a3a1e'); },
    ui: c => { DR.write(c, 'SMUGGLERS → THE GALLEYS', 640, 120, 54, lt, .1); if (lt > R(146, 9)) DR.sign(c, 'REPEAT? EXECUTED', 640, 620, lt, R(146, 9), { size: 46, rot: -.05 }); },
    post: 1 }), 'whip');
  // L147 1789 cahiers: an endless complaint scroll unrolls down the screen; "SALT TAX" circled again and again
  SFX(147, 9, 'paper', .7, 2); SFX(147, 13, 'marker', .5);
  C(147, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#3a2a3a'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { const u = ease.out(clamp(lt / 1.8)); sh(g, '#f4ead0', 5, c => c.rect(420, 40, 440, 60 + u * 700)); sh(g, '#c8a868', 5, c => c.ellipse(640, 70, 240, 30, 0, 0, TAU)); sh(g, '#c8a868', 5, c => c.ellipse(640, 100 + u * 700, 240, 30, 0, 0, TAU));
      const lines = ['bread too dear', 'SALT TAX', 'tithes', 'SALT TAX', 'roads', 'SALT TAX', 'nobles pay nothing', 'SALT TAX']; g.font = MK(30); g.textAlign = 'center';
      lines.forEach((l, i) => { const y = 160 + i * 74; if (y > 100 + u * 700) return; g.fillStyle = l === 'SALT TAX' ? '#c8281e' : '#3a2a1a'; g.fillText(l, 640, y); if (l === 'SALT TAX' && lt > .6 + i * .2) { g.strokeStyle = '#c8281e'; g.lineWidth = 4; g.beginPath(); g.ellipse(640, y - 10, 110, 30, -.05, 0, TAU * clamp((lt - .6 - i * .2) / .3)); g.stroke(); } }); },
    ui: c => DR.write(c, 'THE COMPLAINT LISTS', 640, 60, 50, lt, .2) }), 'whip');
  // L150 abolished: a crowd tears the salt-tax sign down, confetti
  SFX(150, 7, 'impact', .7); SFX(150, 8, 'cheer', .7, 2);
  C(150, 7, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.05], [640, 400, 1.0]], bg: g => DR.sunburst(g, t, '#2a5aa8', '#3a6ab8'),
    crowd: DR.army(80, 600, 1200, 712, 22, ['peasant', 'sansculotte', 'peasant'], .36, .46, 501, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }),
    act: (g, t) => { const f = clamp((lt - .2) / .5); g.save(); g.translate(640, 330 + ease.inOut(f) * 260); g.rotate(f * 1.2); sh(g, '#c8281e', 5, c => c.rect(-220, -60, 440, 120)); g.font = MK(46); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('GABELLE', 0, 0); g.restore(); impact(g, 640, 600, clamp((lt - .7) / .4), 1.2);
      const r = rng(7); for (let i = 0; i < 40; i++) { const y = ((lt * 300 * (.6 + r() * .6) + r() * 720) % 760) - 30, x = r() * W; g.fillStyle = ['#c8281e', '#fff', '#2a5aa8', '#f2d23a'][i % 4]; g.fillRect(x + Math.sin(lt * 5 + i) * 10, y, 10, 16); } },
    ui: c => DR.write(c, 'ABOLISHED!', 640, 130, 92, lt, .4, { col: '#f2d23a' }) }), 'flash');
  // L151 historians argue: two scholars in a tug of war over a rope labelled "how much?"
  SFX(151, 1, 'cloth', .6); SFX(151, 5, 'creak', .5);
  C(151, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#e8c890', '#f4e0b0'), act: (g, t) => { const p = Math.sin(lt * 3) * 50; ln(g, [[260 + p, 520], [1020 + p, 520]], 10, '#8a6a3a');
      P(g, 'scholar', 230 + p, 760, .7, t, { pose: 'presentBoth', turn: .7, lean: -.18, face: { mouth: 'grit', brows: 'angry' } }); P(g, 'scholar2', 1050 + p, 760, .7, t, { pose: 'presentBoth', turn: -.7, lean: .18, face: { mouth: 'grit', brows: 'angry' } });
      sh(g, '#c8281e', 4, c => c.rect(600 + p, 500, 80, 40)); },
    ui: c => { DR.write(c, 'HOW MUCH DID IT MATTER?', 640, 110, 54, lt, .1); bubble(c, 'A LOT!', 260, 270, lt, .5, 260, 380, { size: 32, hold: 1.2 }); bubble(c, 'A LITTLE!', 1020, 270, lt, 1.0, 1020, 380, { size: 32, hold: 1.4 }); } }), 'whip');
  // L152 bread prices: a loaf price tag ticks up; L153 the monarchy can't fix anything: a king hammering a broken pipe, water sprays
  SFX(152, 7, 'cash', .5); SFX(153, 3, 'clink', .6); SFX(153, 4, 'splash', .7);
  C(152, 6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#f2e0b8'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.translate(640, 440); g.scale(1.8, 1.8); sh(g, '#c8884a', 5, c => c.ellipse(0, 0, 150, 70, 0, 0, TAU)); for (let i = -2; i <= 2; i++) ln(g, [[i * 50 - 20, -40], [i * 50 + 20, -10]], 5, '#a8682a'); g.restore();
      const pr = Math.round(lerp(8, 14, clamp((lt - .3) / 1.2))); g.save(); g.translate(930, 260); g.rotate(.15 + Math.sin(lt * 8) * .05); sh(g, '#fff', 5, c => c.roundRect(-90, -50, 180, 100, 10)); g.font = MK(48); g.fillStyle = '#c8281e'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pr + ' sous', 0, 4); g.restore(); },
    ui: c => DR.write(c, 'BREAD PRICES', 640, 110, 64, lt, .1) }), 'whip');
  C(153, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: (g, t) => TS.court(g, t), cam: [[640, 420, 1.3], [640, 420, 1.36]], act: (g, t) => { const hit = Math.floor(lt * 4) % 2;
      P(g, 'louis', 560, 740, .7, t, { pose: hit ? 'pointSide' : 'idle', turn: .6, face: { mouth: 'grit', eyes: 'squint', sweat: true } }); ln(g, [[620, 500], [1300, 500]], 26, '#5a6a7a'); ln(g, [[860, 488], [880, 512]], 6, '#15100c');
      for (let i = 0; i < 14; i++) { const k = (lt * 2 + i / 14) % 1; g.fillStyle = 'rgba(120,200,255,.85)'; g.beginPath(); g.arc(870 + Math.cos(i) * k * 220, 500 - Math.sin(i * 2.3) * k * 160 + k * k * 260, 9, 0, TAU); g.fill(); } impact(g, 860, 500, (lt * 2) % 1, .4); },
    ui: c => DR.write(c, "A KING WHO COULDN'T FIX ANYTHING", 640, 110, 46, lt, .1) }), 'whip');
  // L154 the dinner table: a family pinches salt, the price tag slams down beside the pot
  SFX(154, 5, 'clink', .5); SFX(154, 9, 'thud', .6);
  C(154, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: (g, t) => TS.larder(g, t), cam: [[640, 420, 1.15], [640, 420, 1.22]],
    act: (g, t) => { P(g, 'peasant', 420, 760, .6, t, { pose: pose(lt, [[0, 'idle'], [.6, 'present']]), turn: .5, face: { mouth: 'frown', brows: 'worried' } }); P(g, 'peasantW', 860, 760, .6, t, { pose: 'crossed', turn: -.5, face: { mouth: 'frown', brows: 'worried' } });
      const k = clamp((lt - R(154, 9)) / .2); if (k > 0) { g.save(); g.translate(640, lerp(-100, 520, ease.out(k))); g.rotate(-.1); sh(g, '#fff', 5, c => c.roundRect(-130, -50, 260, 100, 10)); g.font = MK(40); g.fillStyle = '#c8281e'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('+ GABELLE', 0, 4); g.restore(); impact(g, 640, 560, clamp((lt - R(154, 9) - .2) / .3), .6); } },
    ui: c => DR.write(c, 'FELT AT EVERY DINNER TABLE', 640, 110, 52, lt, .1) }), 'whip');

  // ===================== BEAT 5: New York + the Erie Canal =====================
  // L158 Onondaga Lake: zoom down onto the shore; the Onondaga Nation's longhouse + salt springs bubbling
  SFX(158, 12, 'splash', .4); AMB(159, 'lake', 4, .5);
  C(158, 12, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [700, 400, 1.12]], bg: (g, t) => TS.canal(g, t, { v: 'springs' }),
    act: (g, t) => { for (let i = 0; i < 5; i++) { const x = 160 + i * 230; for (let j = 0; j < 3; j++) { const k = (t * .8 + j / 3 + i * .2) % 1; g.strokeStyle = `rgba(255,255,255,${1 - k})`; g.lineWidth = 3; g.beginPath(); g.ellipse(x, 652, 30 + k * 50, 8 + k * 10, 0, 0, TAU); g.stroke(); } } },
    ui: c => { DR.write(c, 'ONONDAGA LAKE', 640, 110, 60, lt, .15); DR.callout(c, 'HOMELAND OF THE ONONDAGA NATION', 640, 200, lt, R(158, 15) - .2, null, null, { size: 30 }); } }), 'zoom');
  // L160 the state takes the springs: a fence slams around them, a "STATE PROPERTY — LEASES" sign spins in
  SFX(160, 3, 'thud', .6); SFX(160, 4, 'thud', .6); SFX(160, 9, 'stamp', .7); SFX(160, 14, 'coins', .5);
  C(160, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.1], [640, 420, 1.16]], bg: (g, t) => TS.canal(g, t, { v: 'springs' }),
    act: (g, t) => { for (let i = 0; i < 12; i++) { const k = clamp((lt - i * .08) / .2), x = 80 + i * 100; if (k <= 0) continue; const y = lerp(300, 690, ease.out(k)); ln(g, [[x, y - 90], [x, y]], 12, '#6a4a2a'); if (i) ln(g, [[x - 100, y - 70], [x, y - 70]], 8, '#8a6a3a'), ln(g, [[x - 100, y - 30], [x, y - 30]], 8, '#8a6a3a'); } },
    ui: c => { DR.sign(c, 'STATE SALT RESERVATION', 640, 160, lt, R(160, 8), { size: 40 }); if (lt > R(160, 13)) DR.callout(c, 'LEASED OUT $$$', 1020, 340, lt, R(160, 13), null, null, { fill: '#e8ffe0' }); } }), 'whip');
  // L162 363 miles: a giant shovel digs a trench across the map, faces of HUDSON and LAKE ERIE high-five
  SFX(162, 0, 'dig', .7); SFX(162, 7, 'dig', .7); SFX(162, 13, 'splash', .6);
  C(162, 7, (ctx, lt, dur, t, R) => { const v = M.view(-76, 42.8, 22); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { const [x0, y0] = M.pt(v, -73.7, 42.7), [x1, y1] = M.pt(v, -78.9, 42.9), k = ease.inOut(clamp((lt - .1) / 1.8));
      g.strokeStyle = '#15100c'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); g.stroke(); g.strokeStyle = '#5ab0e8'; g.lineWidth = 9; g.stroke();
      g.save(); g.translate(lerp(x0, x1, k), lerp(y0, y1, k) - 40); g.rotate(-.6 + Math.sin(lt * 14) * .2); ln(g, [[0, 0], [0, -150]], 12, '#8a6a3a'); sh(g, '#9aa4b0', 5, c => c.roundRect(-26, 0, 52, 60, 10)); g.restore();
      face(g, x0 + 40, y0 + 60, .6, k > .95 ? 'happy' : 'smug', t); face(g, x1 - 20, y1 - 60, .6, k > .95 ? 'happy' : 'sleepy', t); },
    ui: c => { DR.write(c, '363 MILES · BY HAND', 640, 110, 60, lt, .1); } }); }, 'whip');
  // L166 1816 duty: each salt barrel rolls past a toll gate, a hand pinches a coin off every one → canal fund jar fills
  SFX(166, 4, 'stamp', .6); SFX(166, 9, 'clink', .5); SFX(166, 14, 'clink', .5); SFX(166, 18, 'coins', .6);
  C(166, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.05]], bg: (g, t) => TS.canal(g, t), act: (g, t) => {
      for (let i = 0; i < 6; i++) { const x = ((lt * 220 + i * 220) % 1500) - 150, rot = x / 50; g.save(); g.translate(x, 640); g.rotate(rot); PR.barrel(g, 0, 40, .8); g.restore(); if (Math.abs(x - 640) < 30) impact(g, 640, 560, (x - 610) / 60, .4); }
      sh(g, '#c8281e', 4, c => c.rect(600, 470, 80, 30)); ln(g, [[640, 500], [640, 690]], 10, '#5a3a1e'); sh(g, 'rgba(200,230,255,.6)', 5, c => c.roundRect(980, 360, 160, 220, 20)); const f = clamp(lt / 3); sh(g, '#f2c43a', 0, c => c.rect(986, 574 - 200 * f, 148, 200 * f)); g.font = MK(26); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText('CANAL FUND', 1060, 610); },
    ui: c => DR.write(c, 'A DUTY ON EVERY BUSHEL', 640, 110, 56, lt, .1) }), 'whip');
  // L175 90 % of the nation's salt: a pie of the USA fills to 90 % with a stamping hand on New York
  SFX(175, 7, 'whoosh', .6); SFX(175, 9, 'stamp', .7);
  C(175, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#2a4a7a', '#3a5a8a'), act: (g, t) => { const k = ease.out(clamp((lt - .2) / 1.4)) * .9; g.save(); g.translate(640, 400); sh(g, '#f4ecd8', 6, c => c.arc(0, 0, 230, 0, TAU)); g.fillStyle = '#c8281e'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 226, -PI / 2, -PI / 2 + TAU * k); g.closePath(); g.fill();
      g.font = MK(110); g.fillStyle = '#fff'; g.strokeStyle = '#15100c'; g.lineWidth = 12; g.textAlign = 'center'; g.textBaseline = 'middle'; const s = Math.round(k * 100) + '%'; g.strokeText(s, 0, 0); g.fillText(s, 0, 0); g.restore(); },
    ui: c => DR.write(c, "OF THE NATION'S SALT", 640, 690, 50, lt, .3) }), 'whip');
  // L177 "it built the ditch": coins rain into the canal, which fills with water and a boat sails
  SFX(177, 1, 'coins', .7); SFX(177, 9, 'splash', .6);
  C(177, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: (g, t) => TS.canal(g, t), act: (g, t) => { const r = rng(3); for (let i = 0; i < 30; i++) { const y = ((lt * 600 * (.7 + r() * .5) + r() * 600) % 800) - 80, x = 100 + r() * 1080; sh(g, '#f2c43a', 2.5, c => c.ellipse(x, y, 14, 6, lt * 4 + i, 0, TAU)); }
      TS.boat(g, lerp(-200, 1400, clamp(lt / 3.5)), 590, .5, t, 'roman', 0); },
    ui: c => DR.write(c, 'SALT PAID FOR THE DITCH', 640, 110, 58, lt, .2) }), 'whip');
  // L183–185 recap: three map blobs each get their verdict stamped (WAR, REVOLT, CANAL)
  SFX(183, 4, 'stamp', .7); SFX(184, 6, 'stamp', .7); SFX(185, 6, 'stamp', .7);
  C(183, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#efd49c'; g.fillRect(-300, -300, 1900, 1400); G.Paint2.grain(g, 0, 0, W, H, .2, 13, 'multiply', 1.3); },
    act: (g, t) => { [[250, 'CHINA', '#e8907a', 0, 'WAR'], [640, 'FRANCE', '#7a9ae8', R(184, 0), 'REVOLT'], [1030, 'NEW YORK', '#9ac87a', R(185, 0), 'CANAL']].forEach(([x, nm, col, t0, v], i) => { const k = pop(lt, t0, .3); if (k <= 0) return;
      g.save(); g.translate(x, 380); g.scale(k, k); blob(g, 0, 0, 160, 130, col, 11 + i, t); face(g, 0, -10, .8, lt > t0 + 1 ? 'shock' : 'happy', t); g.font = MK(38); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText(nm, 0, -150); g.restore();
      const sk = clamp((lt - t0 - .9) / .2); if (sk > 0) { g.save(); g.translate(x, 540); g.rotate(-.12); g.scale(2 - sk, 2 - sk); g.globalAlpha = sk; sh(g, '#c8281e', 5, c => c.rect(-120, -36, 240, 72)); g.font = MK(44); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(v, 0, 3); g.restore(); } }); },
    ui: c => DR.write(c, 'SALT TAX → ???', 640, 90, 56, lt, .1) }), 'whip');

  // ===================== BEAT 6: the myths =====================
  ticket('PAID IN SALT?', tt(190, 0), tt(206, 0) + 2.5, tt(205, 7), false);
  ticket('SALTED CARTHAGE?', tt(207, 0) - .3, tt(221, 0), tt(212, 2), false);
  // L190 "you've heard it a hundred times": a stack of books, every one says PAID IN SALT, flipping open
  SFX(190, 2, 'paper', .7, 1.2);
  C(190, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#c86a4a', '#e88a6a'), act: (g, t) => { for (let i = 0; i < 8; i++) { const k = pop(lt, i * .12, .25); if (k <= 0) continue; const x = 160 + (i % 4) * 320, y = 260 + Math.floor(i / 4) * 280;
      g.save(); g.translate(x, y); g.scale(k, k); g.rotate((i % 3 - 1) * .08); sh(g, '#fff', 4, c => c.rect(-130, -90, 260, 180)); ln(g, [[0, -90], [0, 90]], 4, '#c8b898'); g.font = MK(24); g.fillStyle = '#c8281e'; g.textAlign = 'center'; g.fillText('PAID IN', -64, -10); g.fillText('SALT!', -64, 24); g.fillStyle = '#7a6a5a'; for (let j = 0; j < 4; j++) g.fillRect(16, -50 + j * 30, 96, 6); g.restore(); } },
    ui: c => DR.write(c, 'A HUNDRED TIMES', 640, 680, 60, lt, .3) }), 'whip');
  // L192 salary: the word SALARY assembles from flying letters onto a payslip
  SFX(192, 3, 'swish', .6); SFX(192, 4, 'ding', .5);
  C(192, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#2a8a5a', '#3aa06a'), act: (g, t) => { sh(g, '#fff', 6, c => c.roundRect(340, 200, 600, 360, 16)); g.font = MK(30); g.fillStyle = '#15100c'; g.textAlign = 'left'; g.fillText('PAYSLIP', 380, 250); ln(g, [[380, 270], [900, 270]], 4, '#15100c');
      'SALARY'.split('').forEach((ch, i) => { const k = ease.out(clamp((lt - .1 - i * .1) / .4)), x = lerp(640 + Math.cos(i * 1.7) * 900, 470 + i * 70, k), y = lerp(380 + Math.sin(i * 2.1) * 500, 420, k); g.font = MK(90); g.fillStyle = '#2a8a5a'; g.textAlign = 'center'; g.fillText(ch, x, y); }); } }), 'whip');
  // L196 Pliny: a scroll unrolls with a quill writing; L199 coins: a centurion bites a coin
  SFX(196, 4, 'paper', .6); SFX(196, 10, 'pencil', .6, 2);
  C(196, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#4a3a2a'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const u = ease.out(clamp(lt / .8)); sh(g, '#f4ead0', 5, c => c.rect(640 - 400 * u, 160, 800 * u, 400)); for (const sd of [-1, 1]) sh(g, '#c8a868', 5, c => c.ellipse(640 + sd * 400 * u, 360, 30, 220, 0, 0, TAU));
      const n = Math.floor(clamp((lt - .8) / 2) * 8); for (let i = 0; i < n; i++) ln(g, [[300, 220 + i * 40], [300 + 600 * ((i * 37) % 10 / 20 + .5), 220 + i * 40]], 5, '#6a5a4a'); if (lt > .8 && n < 8) { const x = 300 + 600 * (((lt * 3) % 1)), y = 220 + n * 40; g.save(); g.translate(x, y); g.rotate(-.6); ln(g, [[0, 0], [0, -160]], 6, '#f4f0e8'); sh(g, '#fff', 3, c => c.ellipse(0, -120, 18, 60, 0, 0, TAU)); g.restore(); } },
    ui: c => { DR.write(c, 'NATURAL HISTORY', 640, 100, 60, lt, .2); DR.yearTag(c, '1st CENTURY AD', lt, R(196, 12)); } }), 'whip');
  SFX(199, 4, 'clink', .7); SFX(199, 4, 'crunch', .5);
  C(199, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.0], [640, 300, 2.1]], dof: 6, bg: (g, t) => TS.camp(g, t), act: (g, t) => { const bite = clamp((lt - R(199, 4) + .2) / .3); head(g, 'legion', 640, 270, 1, t, { face: { mouth: bite > 0 ? 'grit' : 'smile', eyes: bite > 0 ? 'squint' : 'open' } });
      sh(g, '#f2c43a', 5, c => c.arc(lerp(860, 690, ease.out(bite)), lerp(520, 330, ease.out(bite)), 42, 0, TAU)); g.font = MK(30); g.fillStyle = '#a8841a'; g.textAlign = 'center'; g.fillText('SPQR', lerp(860, 690, ease.out(bite)), lerp(530, 340, ease.out(bite))); },
    ui: c => DR.write(c, 'PAID IN COINS', 640, 640, 70, lt, R(199, 4), { col: '#f2d23a' }) }), 'whip');
  // L201–203 salarium = an allowance: a Roman wallet labelled ALLOWANCE pays out for boots, food, gear
  SFX(202, 7, 'cash', .6); SFX(202, 9, 'pop', .5); SFX(202, 10, 'pop', .5);
  C(202, 5, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#d8a840', '#f6d88a'), act: (g, t) => { sh(g, '#8a5a2e', 6, c => c.roundRect(470, 300, 340, 220, 30)); g.font = MK(34); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('SALARIUM', 640, 420);
      [['FOOD', 260, 260], ['BOOTS', 1020, 260], ['GEAR', 640, 160]].forEach(([w, x, y], i) => { const k = ease.out(clamp((lt - .4 - i * .4) / .4)); if (k <= 0) return; g.save(); g.translate(lerp(640, x, k), lerp(410, y, k)); sh(g, '#fff', 5, c => c.roundRect(-90, -40, 180, 80, 14)); g.font = MK(34); g.fillStyle = '#15100c'; g.textBaseline = 'middle'; g.fillText(w, 0, 3); g.restore(); }); },
    ui: c => DR.write(c, 'AN ALLOWANCE FOR EXPENSES', 640, 640, 54, lt, .1) }), 'whip');
  SFX(203, 6, 'boing', .5);
  C(203, 2, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#e8eef4'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const k = ease.out(clamp(lt / 1.4)); ln(g, [[160, 400], [1120, 400]], 8, '#15100c');
      [['ROME: SALARIUM', 200], ['TODAY: PAYCHECK', 1080]].forEach(([s, x], i) => { sh(g, i ? '#2a8a5a' : '#c8281e', 0, c => c.arc(x, 400, 18, 0, TAU)); g.font = MK(34); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText(s, x, i ? 470 : 350); });
      g.save(); g.translate(lerp(200, 1080, k), 400 - Math.abs(Math.sin(k * PI * 4)) * 60); sh(g, '#f2c43a', 4, c => c.arc(0, 0, 26, 0, TAU)); g.restore(); },
    ui: c => DR.write(c, 'LONG BEFORE "PAYCHECK"', 640, 130, 56, lt, .2) }), 'dissolve');

  // L205 myth busted: the ticket flips; a centurion's salt bag explodes into coins
  SFX(205, 6, 'impact', .7); SFX(205, 7, 'sting', .6);
  C(205, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.2], [640, 400, 1.0]], bg: (g, t) => TS.camp(g, t), act: (g, t) => { const b = clamp((lt - R(205, 6)) / .5); P(g, 'legion', 640, 740, .8, t, { pose: b > 0 ? 'shrug' : 'present', face: { mouth: b > 0 ? 'o' : 'grin', eyes: b > 0 ? 'wide' : 'happy' } });
      if (b <= 0) TS.sack(g, 760, 520, 1.1, '#e8dcc0'); else { poof(g, 760, 500, b, 1.2); const r = rng(5); for (let i = 0; i < 18; i++) sh(g, '#f2c43a', 2.5, c => c.ellipse(760 + (r() - .5) * 600 * b, 500 - r() * 300 * b + b * b * 300, 14, 6, i, 0, TAU)); } } }), 'whip');

  // L208 Carthage: Roman soldiers sow salt from bags across a field (as the story claims); a big "SUPPOSEDLY?" stamp
  SFX(208, 2, 'salthiss', .6, 2); SFX(208, 8, 'sting', .5);
  C(208, 1, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [700, 420, 1.06]], bg: (g, t) => TS.carthage(g, t), act: (g, t) => { for (let i = 0; i < 3; i++) { const x = lerp(200, 900, clamp(lt / 3)) + i * 160; P(g, 'legion', x, 700 - i * 30, .4, t + i, { walk: t * 6, turn: .8 });
        for (let j = 0; j < 10; j++) { const k = (lt * 1.5 + j / 10) % 1; g.fillStyle = `rgba(255,255,255,${1 - k})`; g.fillRect(x + 40 + k * 90, 560 - i * 30 + k * k * 120, 4, 4); } } },
    ui: c => { DR.write(c, 'SALTED THE EARTH?', 640, 110, 60, lt, .1); if (lt > R(208, 8)) DR.sign(c, 'SUPPOSEDLY', 640, 230, lt, R(208, 8), { size: 40, rot: -.08 }); } }), 'whip');
  // L211–212 R. T. Ridley searches the ancient sources: books fly off the shelf one by one, all empty
  SFX(211, 5, 'paper', .6, 1.5); SFX(211, 12, 'paper', .6, 1.5); SFX(212, 2, 'boing', .5); SFX(212, 3, 'fly', .5, 1.2);
  C(211, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.05]], bg: g => { g.fillStyle = '#4a2e1e'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { const books = ['POLYBIUS', 'APPIAN', 'LIVY', 'CICERO', 'PLUTARCH', 'FLORUS']; books.forEach((b, i) => { const t0 = .3 + i * .45, k = clamp((lt - t0) / .4); const x = lerp(200 + i * 176, 640 + (i - 2.5) * 40, ease.out(k)), y = lerp(260, 400 + Math.sin(lt * 3 + i) * 10, ease.out(k));
        g.save(); g.translate(x, y); g.rotate((1 - k) * .3 * (i % 2 ? 1 : -1)); sh(g, ['#8a2a22', '#2a5a8a', '#3a7a3a', '#8a6a2a', '#5a3a7a', '#2a6a6a'][i], 4, c => c.rect(-60, -90, 120, 180)); g.font = MK(18); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(b, 0, 0); g.restore(); });
      P(g, 'ridley', 1040, 760, .6, t, { pose: 'magnify', prop: 'magnifier', turn: -.5, face: { mouth: lt > R(212, 0) ? 'o' : 'flat', eyes: lt > R(212, 0) ? 'wide' : 'open' } }); },
    ui: c => { DR.yearTag(c, '1986', lt, .1); if (lt > R(212, 2)) DR.write(c, 'NOTHING. ZERO. NADA.', 640, 120, 64, lt, R(212, 2), { col: '#ff4a3a' }); } }), 'whip');
  // L216–219 where it came from: a detective's corkboard, red string connecting 1930 → 1800s → a medieval pope
  SFX(216, 6, 'paper', .5); SFX(217, 4, 'pencil', .5); SFX(218, 7, 'pencil', .5); SFX(219, 5, 'sting', .5);
  C(216, 6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.08], [640, 380, 1.0]], bg: g => { g.fillStyle = '#b88a5a'; g.fillRect(-300, -300, 1900, 1400); const r = rng(3); for (let i = 0; i < 400; i++) { g.fillStyle = 'rgba(80,50,20,.25)'; g.fillRect(r() * W, r() * H, 3, 3); } },
    act: (g, t) => { const pins = [[260, 230, 'MODERN BOOKS', 0], [640, 470, '1930 · CAMBRIDGE', R(217, 3)], [1000, 220, '1800s VERSIONS', R(218, 3)], [1000, 560, "A MEDIEVAL POPE'S BOAST", R(219, 4)]];
      pins.forEach(([x, y, lab, t0], i) => { const k = pop(lt, t0, .3); if (k <= 0) return; if (i) { const [px, py] = pins[i - 1], s = clamp((lt - t0) / .4); g.strokeStyle = '#c8281e'; g.lineWidth = 5; g.beginPath(); g.moveTo(px, py); g.lineTo(lerp(px, x, s), lerp(py, y, s)); g.stroke(); }
        g.save(); g.translate(x, y); g.scale(k, k); g.rotate((i % 2 ? 1 : -1) * .05); sh(g, '#fff8e8', 4, c => c.rect(-150, -60, 300, 120)); g.font = MK(i === 3 ? 22 : 28); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(lab, 0, 4); sh(g, '#c8281e', 3, c => c.arc(0, -56, 12, 0, TAU)); g.restore(); }); },
    ui: c => DR.write(c, 'WHERE DID IT COME FROM?', 640, 680, 50, lt, .1) }), 'whip');

  // ===================== BEAT 7: Saltville =====================
  // L225 the Confederacy's problem: Union ships slam a chain across the ports one after another
  SFX(226, 1, 'gong', .5); SFX(226, 5, 'impact', .6); SFX(226, 10, 'drop', .5);
  C(226, 0, (ctx, lt, dur, t, R) => { const v = M.view(-84, 31, 9); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { const ports = [[-76.3, 36.9], [-79.9, 32.8], [-81.1, 32.1], [-88, 30.7], [-90.1, 29.9], [-94.8, 29.3]];
      ports.forEach(([lo, la], i) => { const k = ease.out(clamp((lt - .2 - i * .25) / .4)); if (k <= 0) return; const [x, y] = M.pt(v, lo, la), ox = lo > -82 ? 160 : 0, oy = lo > -82 ? 0 : 150; G.TS.boat(g, x + ox * (1.6 - k * .6), y + oy * (1.6 - k * .6), .22, t, 'roman', 0); impact(g, x + ox * .6, y + oy * .6, clamp((lt - .6 - i * .25) / .3), .4); });
      const [cx, cy] = M.pt(v, -86, 34); face(g, cx, cy, 1, lt > 1.8 ? 'scared' : 'happy', t); },
    ui: c => { DR.write(c, 'BLOCKADE', 640, 100, 70, lt, .2, { col: '#2a3a7a' }); if (lt > R(226, 9)) DR.callout(c, 'NO MORE IMPORTED SALT', 640, 650, lt, R(226, 9), null, null, { size: 32 }); } }); }, 'whip');
  // L227 Saltville: a pin drops on the map and a town sign springs up "SALTVILLE — LITERALLY"
  SFX(227, 8, 'boing', .5); SFX(227, 10, 'stamp', .6);
  C(227, 8, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.2], [640, 400, 1.3]], bg: (g, t) => TS.saltville(g, t, { v: 'day' }), act: (g, t) => { const k = pop(lt, .1, .35); g.save(); g.translate(640, 640); g.scale(k, k); ln(g, [[0, 0], [0, -200]], 14, '#5a3a1e'); sh(g, '#2a6a3a', 6, c => c.roundRect(-220, -330, 440, 140, 14)); g.font = MK(56); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SALTVILLE', 0, -270); g.font = MK(26); g.fillText('VIRGINIA', 0, -220); g.restore(); },
    ui: c => bubble(c, 'LITERALLY.', 1020, 200, lt, R(227, 10), 820, 360, { size: 40 }) }), 'whip');
  // L228 by one estimate 2/3: the South's salt sacks split into thirds, two of them stamped SALTVILLE
  SFX(228, 0, 'sack', .6); SFX(228, 2, 'stamp', .6);
  // L237 as many as fifty: a hanging count sign, dark tone; L238 Ferguson: evil silhouette then a judge's gavel
  SFX(237, 7, 'drum', .5); SFX(238, 7, 'bell', .4); SFX(238, 9, 'stamp', .7);
  C(237, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#1c1c26'; g.fillRect(-300, -300, 1900, 1400); for (let i = 0; i < 16; i++) { const x = 90 + i * 74; sh(g, '#8a8c94', 3, c => c.roundRect(x - 22, 560 - (i % 3) * 8, 44, 70, 18)); } },
    ui: c => { hangSign(c, 'KILLED\nAT SALTVILLE', '?', 'UP TO 50', lt, .1, R(237, 10), { y: 300, col: '#c8281e' }); DR.callout(c, 'AMERICAN BATTLEFIELD TRUST', 640, 680, lt, .6, null, null, { size: 26 }); } }), 'dip');
  C(238, 1, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.0], [640, 380, 1.12]], bg: (g, t) => evil(g, t, lt, { eyes: .3, bg: '#14141c' }),
    act: (g, t) => { const gk = clamp((lt - R(238, 8)) / .25); if (gk > 0) { g.save(); g.translate(1000, 300); g.rotate(-.8 + ease.out(gk) * .9); sh(g, '#6a4a2a', 5, c => c.rect(-20, 0, 40, 220)); sh(g, '#6a4a2a', 5, c => c.roundRect(-90, -50, 180, 70, 14)); g.restore(); impact(g, 1060, 520, clamp((lt - R(238, 8) - .2) / .3), .6); } },
    ui: c => { DR.write(c, 'CHAMP FERGUSON', 640, 640, 60, lt, .2, { col: '#fff' }); if (lt > R(238, 9)) DR.sign(c, 'TRIED & EXECUTED (1865)', 640, 110, lt, R(238, 9), { size: 38 }); } }), 'flash');
  // L239–240 the 5th USCC: salute, the flag rises behind them, light breaks through
  SFX(239, 3, 'drum', .5); SFX(240, 2, 'chime', .5);
  C(239, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 400, 1.08]], bg: (g, t) => TS.saltville(g, t, { v: 'dusk' }),
    act: (g, t) => { const fk = ease.out(clamp(lt / 2.6)); ln(g, [[640, 680], [640, 140]], 8, '#c8b898'); g.save(); g.translate(644, 140 + (1 - fk) * 360); const w = Math.sin(t * 4) * 6; for (let i = 0; i < 7; i++) sh(g, i % 2 ? '#fff' : '#c8281e', 0, c => c.rect(0, i * 14, 180 + w, 14)); sh(g, '#2a3a7a', 0, c => c.rect(0, 0, 80, 56)); g.restore();
      for (let i = 0; i < 5; i++) P(g, 'uscav', 260 + i * 190 - (i > 1 ? 0 : 0) + (i >= 2 ? 120 : 0), 720, .5, t + i, { pose: lt > .3 + i * .15 ? 'pointUp' : 'idle', turn: i < 2 ? .4 : -.4, face: { mouth: 'flat', brows: 'neutral' } }); },
    atm: { glare: [640, 140, 420] }, ui: c => { DR.write(c, 'FIGHTING FOR THEIR OWN FREEDOM', 640, 610, 46, lt, .2); if (lt > R(240, 0)) DR.write(c, '— AND MILLIONS MORE', 640, 670, 44, lt, R(240, 0), { col: '#f2d23a' }); } }), 'dissolve');

  // ===================== BEAT 8: India =====================
  // L251–252 the Salt Act: a British hand slams a padlock on the seashore salt; an Indian woman's handful is knocked away
  SFX(251, 3, 'paper', .5); SFX(252, 3, 'impact', .7); SFX(252, 6, 'clink', .6); SFX(252, 8, 'gasp', .5);
  C(251, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#f4ead0'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { const k = clamp(lt / 1.2); sh(g, '#e8dcbc', 6, c => c.rect(320, 120, 640, 520)); g.font = MK(56); g.fillStyle = '#7a1e18'; g.textAlign = 'center'; g.fillText('SALT ACT', 640, 230); g.font = MK(40); g.fillText('1882', 640, 290);
      for (let i = 0; i < 6; i++) ln(g, [[380, 350 + i * 44], [380 + 520 * clamp(k * 2 - i * .2), 350 + i * 44]], 5, '#7a6a5a'); },
    ui: c => DR.yearTag(c, '1882', lt, .2) }), 'whip');
  C(252, 2, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.15], [640, 420, 1.2]], bg: (g, t) => TS.dandi(g, t), act: (g, t) => { const hit = R(252, 3);
      P(g, 'indianW', 500, 740, .7, t, { pose: lt < hit ? 'present' : 'shrug', turn: .4, face: lt < hit ? { mouth: 'smile' } : { mouth: 'shock', eyes: 'wide' } });
      if (lt < hit + .2) { const k = clamp((lt - hit + .35) / .35); hand(g, lerp(1500, 720, ease.out(k)), 470, .9, 0, { kind: 'open', sleeve: '#c8281e' }); }
      if (lt > hit) { const k = clamp((lt - hit) / .8); for (let i = 0; i < 16; i++) { g.fillStyle = '#fff'; g.fillRect(660 + i * 6 - k * 300 * (i % 3), 470 - Math.sin(k * PI) * 80 + k * k * 260, 6, 6); } impact(g, 700, 470, clamp((lt - hit) / .3), .5); } },
    ui: c => { if (lt > R(252, 3)) DR.sign(c, 'NOT ALLOWED', 640, 120, lt, R(252, 3), { size: 50 }); } }), 'whip');
  // L269 Sabarmati → 78 volunteers: a hanging count sign flips from 1 to 78 as people join behind Gandhi
  SFX(269, 1, 'footsteps', .7, 3); SFX(269, 12, 'card', .6);
  C(269, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => TS.marchRoad(g, t),
    crowd: (t2, l2) => DR.army(330, 520, 950, 620, Math.floor(clamp((l2 - .4) / 2) * 36), ['marcher', 'marcherW', 'marcher'], .2, .3, 61, { walk: true, spr: { turn: .1 } }),
    act: (g, t) => P(g, 'gandhi', 640, 690, .42, t, { walk: t * 6, turn: .1, prop: 'staff' }),
    ui: c => hangSign(c, 'MARCHERS', 1, 78, lt, .1, R(269, 12), { x: 980, y: 230 }) }), 'whip');
  // L276 Gandhi picks up salt: hand close-up, salt crystals glitter, then a "CRIME" stamp
  SFX(276, 4, 'crunch', .7); SFX(276, 10, 'sparkle', .6); SFX(276, 13, 'stamp', .8);
  C(276, 4, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 380, 1.15]], bg: g => { g.fillStyle = '#c8b088'; g.fillRect(-300, -300, 1900, 1400); const r = rng(9); for (let i = 0; i < 90; i++) sh(g, '#f4f4f4', 0, c => c.ellipse(r() * W, 400 + r() * 400, 20 + r() * 40, 8 + r() * 10, 0, 0, TAU)); },
    act: (g, t) => { const up = ease.out(clamp((lt - .1) / .8)); hand(g, 640, lerp(640, 380, up), 1.1, -PI / 2, { kind: 'fist', sleeve: '#f4f0e8' }); for (let i = 0; i < 6; i++) { const a = i + lt * 2; g.fillStyle = `rgba(255,255,255,${.5 + .5 * Math.sin(a * 3)})`; g.save(); g.translate(640 + Math.cos(a) * 110, lerp(560, 300, up) + Math.sin(a) * 60); g.rotate(PI / 4); g.fillRect(-6, -6, 12, 12); g.restore(); } },
    ui: c => { if (lt > R(276, 13)) DR.sign(c, 'ILLEGAL!', 640, 600, lt, R(276, 13), { size: 64, rot: -.1 }); } }), 'zoom');

  // ===================== BEAT 9: iodine + roads =====================
  // L302 the thyroid swells into a goiter: neck close-up, the gland inflates like a balloon with a squeak
  SFX(302, 4, 'boing', .5); SFX(302, 9, 'creak', .5); SFX(302, 13, 'pop', .4);
  C(302, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 360, 1.4], [640, 380, 1.5]], bg: g => DR.blueprint(g), act: (g, t) => { const s = 1 + ease.out(clamp((lt - R(302, 9) + .3) / 1.2)) * .9; head(g, 'kid', 640, 230, 1, t, { face: { mouth: s > 1.3 ? 'shock' : 'flat', eyes: s > 1.3 ? 'wide' : 'open', sweat: s > 1.3 } });
      g.save(); g.translate(640, 520); g.scale(s, s); for (const sd of [-1, 1]) sh(g, '#e8707a', 5, c => c.ellipse(sd * 48, 0, 46, 66, sd * .25, 0, TAU)); sh(g, '#e8707a', 5, c => c.rect(-24, -12, 48, 28)); g.restore(); },
    ui: c => { DR.write(c, 'THYROID', 300, 300, 50, lt, .1, { col: '#f2d23a' }); if (lt > R(302, 13) - .2) DR.write(c, '→ GOITER', 1000, 560, 60, lt, R(302, 13) - .2, { col: '#fff' }); } }), 'whip');
  // L305–306 Dr Cowie: a lightbulb pops over his head, he grabs a salt box and pours an iodine bottle in
  SFX(306, 2, 'ding', .7); SFX(306, 4, 'pop', .5);
  C(306, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.15], [640, 420, 1.2]], bg: (g, t) => TS.grocery(g, t, { boxes: 0 }), act: (g, t) => { const b = pop(lt, R(306, 2), .3);
      P(g, 'cowie', 560, 760, .7, t, { pose: pose(lt, [[0, 'think'], [R(306, 2), 'pointUp'], [R(306, 2) + .9, 'present']]), turn: .3, face: { mouth: lt > R(306, 2) ? 'grin' : 'flat', eyes: lt > R(306, 2) ? 'happy' : 'half' } });
      if (b > 0) { g.save(); g.translate(560, 280); g.scale(b, b); T.glow(g, 0, 0, 120, 'rgba(255,240,120,.6)'); sh(g, '#ffe24a', 5, c => c.arc(0, 0, 44, 0, TAU)); sh(g, '#9aa4b0', 4, c => c.rect(-20, 40, 40, 30)); g.restore(); }
      if (lt > R(306, 2) + .9) { TS.saltBox(g, 860, 620, 1.2); const k = clamp((lt - R(306, 2) - 1) / .4); g.save(); g.translate(880, 440); g.rotate(-1.2 * k); sh(g, '#6a3a8a', 4, c => c.roundRect(-24, -70, 48, 90, 10)); g.restore(); for (let i = 0; i < 5; i++) if (k >= 1) { g.fillStyle = '#8a5aaa'; g.beginPath(); g.arc(850, 470 + ((lt * 300 + i * 40) % 140), 6, 0, TAU); g.fill(); } } },
    ui: c => DR.statCard(c, { name: 'DR DAVID M. COWIE', cls: 'U. OF MICHIGAN PEDIATRICIAN', who: 'cowie', stats: [['MEDICINE', 5], ['KIDS', 5], ['BIG IDEAS', 5]] }, 1000, 230, lt, 2.4) }), 'whip');
  // L317–318 the survey: the bar chart drops with a crash, kids cheer
  SFX(318, 2, 'drop', .7); SFX(318, 5, 'impact', .6); SFX(318, 8, 'cheer', .6, 2);
  C(318, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g),
    crowd: DR.army(120, 640, 1160, 712, 14, ['kid', 'kidG', 'kid'], .36, .42, 77, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }),
    act: (g, t) => { const k = ease.inOut(clamp((lt - .1) / .8)), h = lerp(320, 12, k); sh(g, '#e8707a', 5, c => c.rect(420, 540 - h, 160, h)); sh(g, '#7ae8a0', 5, c => c.rect(700, 528, 160, 12)); g.font = MK(36); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(lerp(38.6, 1.4, k).toFixed(1) + '%', 500, 520 - h); g.fillText('1924', 500, 590); g.fillText('1951', 780, 590); impact(g, 500, 520, clamp((lt - .85) / .4), .8); },
    ui: c => DR.write(c, 'GOITERS: 38.6% → 1.4%', 640, 100, 60, lt, .1, { col: '#7ae8a0' }) }), 'whip');
  // L324 40 million tons: a mountain of salt piles up, trucks look tiny next to it, a hand plants a "40,000,000 t" flag
  SFX(324, 3, 'rumble', .6, 2); SFX(324, 9, 'stamp', .6);
  // L326–327 the interstate: a road unrolls across the map like a carpet, then a plough truck chases snow
  SFX(326, 2, 'whoosh', .6); SFX(326, 4, 'truck', .5, 2); SFX(327, 3, 'salthiss', .6, 1.5);
  C(326, 2, (ctx, lt, dur, t, R) => { const v = M.view(-96, 39, 6); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { const routes = [[[-122, 47], [-104, 41], [-87, 41.8], [-74, 40.7]], [[-118, 34], [-97, 32.8], [-81, 32]], [[-93, 45], [-90, 38.6], [-90, 30]]];
      routes.forEach((r, i) => { const k = clamp((lt - .1 - i * .35) / 1.1); if (k > 0) M.route(g, v, r, k, { w: 10, col: '#3a3a44' }); }); },
    ui: c => { DR.write(c, 'THE INTERSTATES', 640, 110, 64, lt, .1); DR.yearTag(c, '1956 →', lt, .4); } }); }, 'whip');
  C(327, 2, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 470, 1.25], [640, 470, 1.4]], bg: (g, t) => TS.highway(g, t), act: (g, t) => { TS.truck(g, 640, 610, 1.2, t, { spray: 1 }); speed(g, 640, 560, -1, 4, 100); }, atm: { snow: 120, night: .25 },
    ui: c => DR.write(c, 'ROAD SALT TOOK OFF', 640, 110, 60, lt, .1) }), 'zoom');
  // L331 the old trick moved from salt to gas to sales tax: a taxman hops from item to item like a frog
  SFX(331, 4, 'boing', .5); SFX(331, 6, 'boing', .5); SFX(331, 9, 'boing', .5);
  C(331, 2, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.sunburst(g, t, '#5a3a7a', '#6a4a8a'), act: (g, t) => { const stops = [[260, R(331, 4), 'SALT'], [640, R(331, 6), 'GAS'], [1020, R(331, 8), 'SALES TAX']];
      stops.forEach(([x, , lab]) => { sh(g, '#fff', 5, c => c.roundRect(x - 120, 470, 240, 90, 14)); g.font = MK(40); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText(lab, x, 528); });
      let x = stops[0][0], y = 470; for (let i = 1; i < stops.length; i++) { const k = clamp((lt - stops[i][1] + .45) / .45); if (k > 0) { x = lerp(stops[i - 1][0], stops[i][0], k); y = 470 - Math.sin(k * PI) * 220; } }
      P(g, 'taxman', x, y, .42, t, { pose: 'present', turn: .6, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => DR.write(c, 'THE SAME OLD TRICK', 640, 110, 60, lt, .1) }), 'whip');
  // L332 anything you can't avoid: the taxman's hand closes around a fridge, a phone, a bag of groceries
  SFX(332, 1, 'swish', .5); SFX(332, 5, 'cash', .6);
  C(332, 0, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#e8eef4'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { const items = [['BREAD', 300], ['FUEL', 640], ['PHONE', 980]]; items.forEach(([lab, x], i) => { const t0 = .2 + i * .5; sh(g, ['#c8884a', '#c8281e', '#2a2a30'][i], 5, c => c.roundRect(x - 80, 360, 160, 200, 18)); g.font = MK(34); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(lab, x, 470);
        const k = clamp((lt - t0) / .3); if (k > 0) { g.save(); g.translate(x + 50, 330); g.rotate(-.3); sh(g, '#fff', 4, c => c.roundRect(-50, -26, 100, 52, 10)); g.font = MK(30); g.fillStyle = '#c8281e'; g.fillText('+TAX', 0, 10); g.restore(); impact(g, x + 50, 330, clamp((lt - t0 - .1) / .3), .4); } }); },
    ui: c => DR.write(c, "ANYTHING YOU CAN'T AVOID BUYING", 640, 120, 50, lt, .1) }), 'whip');
})(window);
