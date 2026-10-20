/* Merer's Diary — CH 7 (afternoon: dragging, ramps and wet sand), CH 8 (your team has a name), CH 9 (so were they slaves?). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, ES = G.ES, EK = G.EK, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, PI = Math.PI, DISP = s => `${s}px "Luckiest Guy"`;
  const { S, fx, mood, fig, theo, push, cover, card, LIGHT } = EP;
  const chip = (ctx, s, x, y, lt, at, col) => K.tag(ctx, s, x, y, lt, at, { size: 26, fill: col });

  // ===================== CH 7: dragging, ramps and wet sand =====================
  mood('offboat', 'nileWork');
  fx('offboat', 'rumble', .35, .6); fx('offboat', 'splash', .2, 1.4);
  S('offboat', (ctx, lt, dur, t, R) => {   // the block on a wooden sledge at the harbor; a man in front pours water on the sand
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 520); ES.giza(ctx, t, 0, { v: 'day', k: .75, basin: true, basinY: 640 }); ES.boat(ctx, 1100, 700, .55, t, { blocks: 0, mast: false });
    const bx = lerp(300, 420, clamp(lt / dur)); ES.sledge(ctx, bx, 610, .8, { ropeTo: 700, ropeY: -30 }); ES.ew(ctx, bx + 160, 612, 1.6, t, { pose: 'pour', seed: 4 });
    for (let i = 0; i < 6; i++) ES.ew(ctx, bx + 300 + i * 60, 606, 1.4, t, { pose: 'pull', seed: i + 61, speed: 2.5 }); ctx.restore();
    EK.chapter(ctx, lt, 7, 'Afternoon: dragging, ramps and wet sand');
    if (lt > R('thinner')) K.tag(ctx, 'up the plateau… the evidence gets thinner', 640, 120, lt, R('thinner'), { size: 26 });
    if (lt > R('honest')) { chip(ctx, 'CLUE', 520, 190, lt, R('honest') + 1, '#e2ecd4'); chip(ctx, 'GUESS', 760, 190, lt, R('honest') + 2.2, '#f2d8c8'); }
  });
  S('clue1', (ctx, lt, dur, t, R) => {   // ARTIFACT: the Djehutihotep sledge scene (~700 years later): 172 men + a man pouring liquid
    ctx.save(); const z = lt > R('pouring') ? lerp(1, 1.5, ease.inOut(clamp((lt - R('pouring')) / 1.2))) : 1; ctx.translate(780, 560); ctx.scale(z, z); ctx.translate(-780, -560);
    EK.tombPainting(ctx, lt, t, { circle: clamp((lt - R('pouring') - 1) / .8) }); ctx.restore();
    K.tag(ctx, 'CLUE #1: a tomb painting', 300, 110, lt, .2, { size: 28, fill: '#e2ecd4' });
    if (lt > R('notkhufu') && lt < R('pouring')) K.tag(ctx, 'not from Khufu\'s time: ~700 years later', 640, 660, lt, R('notkhufu') + .3, { size: 24 });
    if (lt > R('djehuti') && lt < R('pouring')) K.tag(ctx, 'tomb of governor Djehutihotep (jeh-hoo-tee-HO-tep)', 840, 110, lt, R('djehuti') + .2, { size: 22 });
    if (lt > R('men172') && lt < R('pouring')) EK.count(ctx, 1000, 260, 172, lt, R('men172') + .3, 1.2, 'men hauling a statue', { size: 72 });
  });
  fx('ritual', 'swish', .3, 3);
  S('ritual', (ctx, lt, dur, t, R) => {   // for a long time: "just a ritual"
    ctx.save(); ctx.translate(780, 560); ctx.scale(1.5, 1.5); ctx.translate(-780, -560); EK.tombPainting(ctx, lt, t, { circle: 1 }); ctx.restore();
    card(ctx, 'a ritual?', 640, 200, lt, .4, { size: 44, rot: -.04 });
  });
  S('y2014', (ctx, lt, dur, t, R) => {   // 2014: physicists in Amsterdam (Daniel Bonn) test it in the lab
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); ES.lab(ctx, t); sh(ctx, '#e2c58e', 3.5, c => c.rect(360, 400, 460, 34)); ES.sledge(ctx, 520 + Math.sin(t) * 6, 404, .35, { rope: false });
    fig(ctx, 'scientist', 960, 720, .82, { t, pose: 'present', turn: -.4, light: LIGHT.day, face: { mouth: 'smile', brows: 'up', look: [-.6, .2] } }); ctx.restore();
    EK.nameCard(ctx, lt, .4, 'DANIEL BONN + physicists', 'University of Amsterdam · 2014', 360, 110, { icon: 'flask', w: 470 });
  });
  S('water', (ctx, lt, dur, t, R) => {   // with the right amount of water the sand stiffens — pulling force ≈ halved; wet sand at the beach vs dry
    EK.sandDiagram(ctx, lt, t, .1);
    if (lt > R('half')) K.title(ctx, 'roughly HALF the pulling force', lt, R('half') + .3, { y: 90, size: 48 });
    if (lt > R('beach')) K.tag(ctx, 'think: wet sand at the beach vs dry sand', 640, 650, lt, R('beach'), { size: 26, fill: '#f6c945' });
  });
  S('lehnerreact', (ctx, lt, dur, t, R) => {   // Mark Lehner: plausible — but probably not the only trick
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.desertRamp(ctx, t, 0, {}); ES.sledge(ctx, 520, 600, .9, { ropeTo: 500, ropeY: -40 }); ES.ew(ctx, 690, 600, 1.6, t, { pose: 'pour', seed: 7 }); ctx.restore();
    EK.nameCard(ctx, lt, .2, 'MARK LEHNER', 'archaeologist', 300, 110, { icon: 'brush' });
    card(ctx, 'plausible…', 760, 260, lt, R('plausible'), { size: 40, rot: -.03 }); card(ctx, '…but probably not the only trick', 800, 360, lt, R('plausible') + 1.3, { size: 30, rot: .02 });
  });
  fx('ropes', 'whoosh', .3);
  S('clue2', (ctx, lt, dur, t, R) => {   // 2018, Hatnub: a steep ramp (~20 % grade), staircases both sides, post holes; ropes around posts; inscriptions name Khufu
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 360); ES.hatnub(ctx, t, 0, {});
    if (lt > R('ropes')) { const u = clamp((lt - R('ropes')) / 4), y = lerp(560, 330, u), x = lerp(640, 640, u), s = lerp(.6, .4, u); ES.sledge(ctx, x - 60 * s, y, s, { rope: false });
      for (const sd of [-1, 1]) { const px = lerp(sd < 0 ? 560 : 720, sd < 0 ? 590 : 690, u), py = y - 120; ln(ctx, [[px, py - 30], [px, py + 10]], 8, '#6a4a2a'); ln(ctx, [[x, y - 40 * s], [px, py], [sd < 0 ? 380 : 900, 140 + (1 - u) * 60]], 3, '#b8945a'); }
      for (let i = 0; i < 4; i++) { ES.ew(ctx, 340 - i * 34, 200 + i * 40, .9, t, { pose: 'pull', seed: i + 71, dir: -1, speed: 2.5 }); ES.ew(ctx, 940 + i * 34, 200 + i * 40, .9, t, { pose: 'pull', seed: i + 75, speed: 2.5 }); } }
    ctx.restore(); EP.dateTag(ctx, 'HATNUB (HAT-noob) · 2018');
    K.tag(ctx, 'CLUE #2: an alabaster quarry', 640, 70, lt, .2, { size: 26, fill: '#e2ecd4' });
    if (lt > R('ramp')) { K.tag(ctx, 'steep ramp: ~20 % grade', 260, 300, lt, R('ramp') + 1, { size: 24 }); K.tag(ctx, 'staircases on both sides', 1030, 300, lt, R('ramp') + 3, { size: 24 }); K.tag(ctx, 'holes for wooden posts', 640, 660, lt, R('ramp') + 5, { size: 24 }); }
    if (lt > R('inscr')) { const k = K.pop(lt, R('inscr') + .2); ctx.save(); ctx.translate(1060, 520); ctx.scale(k, k); sh(ctx, '#f7eedb', 4, c => c.roundRect(-46, -110, 92, 220, 46)); ctx.strokeStyle = OUT; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-50, 118); ctx.lineTo(50, 118); ctx.stroke();
      sh(ctx, '#c8322a', 3, circ(0, -66, 16)); ln(ctx, [[-22, -24], [22, -24]], 6, '#2a6a96'); sh(ctx, '#2a6a96', 3, c => c.ellipse(0, 20, 18, 10, 0, 0, TAU)); ln(ctx, [[-16, 66], [16, 66]], 6, '#2a2018'); ctx.restore(); K.tag(ctx, 'inscriptions name Khufu', 1060, 680, lt, R('inscr') + .4, { size: 22 }); }
  });
  S('quarrynot', (ctx, lt, dur, t, R) => {   // a quarry, not a pyramid — how did blocks get up 481 feet? straight, zigzag, spiral, internal ramps
    if (lt < R('ramptypes')) { ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 300); ES.giza(ctx, t, 0, { v: 'day', k: 1 }); ctx.restore();
      card(ctx, 'a quarry ≠ a pyramid', 320, 160, lt, .3, { size: 32 }); if (lt > R('howup')) { K.counter(ctx, 980, 200, 0, 481, lt, R('howup') + .4, 1, 'feet up — how?', { size: 76, suffix: ' ft' }); ln(ctx, [[650, 440], [650, 130]], 6, '#c8322a'); } }
    else EK.rampTypes(ctx, lt, R('ramptypes') + .1, { gap: .9, stampAt: R('selling') + .3 });
    if (lt > R('argue')) K.tag(ctx, 'historians still argue about this', 640, 640, lt, R('argue'), { size: 26 });
  });
  fx('selling', 'stamp', .5, .3);
  S('people2', (ctx, lt, dur, t, R) => {   // what's not in doubt: it was done by people. Lots of them.
    ctx.save(); push(ctx, lt, dur, 1.15, 1.0, 640, 420); ES.giza(ctx, t, 0, { v: 'gold', k: .7 }); const r = rng(81);
    for (let i = 0; i < 120; i++) { const row = i % 8, x = ((i * 53 + t * (10 + row * 2) * (i % 2 ? 1 : -1)) % 1500 + 1500) % 1500 - 110, y = 470 + row * 30; ES.ew(ctx, x, y, .5 + row * .1, t, { pose: i % 7 === 0 ? 'carry' : i % 5 === 0 ? 'pull' : 'walk', seed: i, dir: i % 2 ? 1 : -1 }); } ctx.restore();
    K.title(ctx, 'PEOPLE.', lt, .4, { y: 130, size: 70 }); if (lt > R('lots')) K.tag(ctx, 'lots of them', 640, 210, lt, R('lots'), { size: 30, fill: '#f6c945' });
  });

  // ===================== CH 8: your team has a name =====================
  mood('twist', 'curious');
  fx('graffiti', 'scratch', .5, .4); fx('friends', 'ding', .4); fx('drunk', 'ding', .4, 1.6);
  function relieving(ctx, lt, t) {   // a cut-away of the pyramid: the King's Chamber with the stacked relieving chambers above it
    EK.board(ctx, 231 % 7 + 1);
    ES.pyramid(ctx, 640, 680, 900, { k: 1 }); ln(ctx, [[640 - 300, 680], [640, 380]], 0);
    sh(ctx, '#3a2a20', 3.5, c => c.rect(600, 420, 90, 46)); for (let i = 0; i < 5; i++) { const a = clamp((lt - .6 - i * .2) / .3); if (a <= 0) continue; ctx.save(); ctx.globalAlpha = a; sh(ctx, '#5a4030', 3, c => c.rect(604, 400 - i * 26, 82, 18)); ctx.restore(); }
    sh(ctx, '#7a5a40', 3, c => { c.moveTo(604, 280); c.lineTo(645, 250); c.lineTo(686, 280); c.closePath(); });
    K.tag(ctx, 'King\'s Chamber', 860, 450, lt, .3, { size: 22 }); K.tag(ctx, 'relieving chambers — never meant to be seen', 900, 320, lt, 1.4, { size: 22, fill: '#f6c945' }); ln(ctx, [[700, 340], [760, 330]], 3);
  }
  S('twist', (ctx, lt, dur, t, R) => {   // the crews weren't anonymous — they named themselves; inside spaces nobody was supposed to see
    if (lt < R('inside')) { ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.chamber(ctx, t, {}); ctx.restore(); EK.chapter(ctx, lt, 8, 'The twist: your team has a name');
      if (lt > R('anon')) K.tag(ctx, 'not anonymous', 640, 300, lt, R('anon'), { size: 34 }); if (lt > R('named')) K.title(ctx, 'THEY NAMED THEMSELVES', lt, R('named'), { y: 420, size: 54 }); }
    else relieving(ctx, lt - R('inside'), t);
  });
  S('graffiti', (ctx, lt, dur, t, R) => {   // red-paint graffiti left by work gangs: "Friends of Khufu"; at Menkaure's: "Friends of…" / "Drunkards of Menkaure"
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 360); ES.chamber(ctx, t, { lampX: 640 + Math.sin(t * .5) * 120 }); ctx.restore();
    EK.graffiti(ctx, 'FRIENDS OF KHUFU', 640, 250, clamp((lt - R('friends') + 1.2) / 1.6), { size: 58 });
    if (lt > R('menkaure')) { EK.graffiti(ctx, 'FRIENDS OF MENKAURE', 520, 430, clamp((lt - R('drunk')) / 1.2), { size: 40, rot: .03, seed: 13 }); EK.graffiti(ctx, 'DRUNKARDS OF MENKAURE', 740, 560, clamp((lt - R('drunk') - 1.6) / 1.4), { size: 46, rot: -.05, seed: 17 }); K.tag(ctx, 'at a later king\'s pyramid: Menkaure', 640, 110, lt, R('menkaure') + .3, { size: 24 }); }
    K.tag(ctx, 'red paint, left by work gangs', 640, 660, lt, .4, { size: 24 });
  });
  S('yes', (ctx, lt, dur, t, R) => {   // Theo: yes. Drunkards. A real team name, in a royal monument, 4,500 years ago.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.04); ES.chamber(ctx, t, { lampX: 900 }); ctx.restore(); EK.graffiti(ctx, 'DRUNKARDS OF MENKAURE', 780, 220, 1, { size: 40, rot: -.05, seed: 17 });
    theo(ctx, 330, 760, .9, { t, pose: lt < R('realname') ? 'shrug' : 'present', turn: .3, light: LIGHT.lamp, vis: Gd.say(t), face: { mouth: 'grin', brows: 'up', eyes: lt < 1 ? 'happy' : 'open', look: [.6, -.2] } });
    if (lt > R('realname')) K.tag(ctx, 'a real team name', 860, 380, lt, R('realname'), { size: 28 }); if (lt > R('royalmon')) K.tag(ctx, 'written in a royal monument', 860, 440, lt, R('royalmon'), { size: 26 }); if (lt > R('ago')) K.tag(ctx, '4,500 years ago', 860, 500, lt, R('ago'), { size: 28, fill: '#f6c945' });
  });
  S('deeper', (ctx, lt, dur, t, R) => { EK.gangChart(ctx, lt, R('five') - .2); EK.nameCard(ctx, lt, .2, 'from the marks + records', 'reconstruction by Lehner and others', 300, 660, { icon: 'brush', w: 470 }); });
  function team(ctx, t, x, y, n, col, label, dir, seed) { ES.sledge(ctx, x, y, .55, { ropeTo: 520 * dir, ropeY: -20 }); for (let i = 0; i < n; i++) ES.ew(ctx, x + dir * (110 + i * 40), y - 2, 1.05, t, { pose: 'pull', seed: seed + i, speed: 3, dir, kilt: i % 2 ? '#f2ead6' : col });
    ctx.save(); ctx.translate(x + dir * 70, y - 120); ln(ctx, [[0, 0], [0, 90]], 5, '#6a4a2a'); sh(ctx, col, 3, c => { c.moveTo(0, 0); c.lineTo(dir * 110, 6); c.lineTo(dir * 100, 22); c.lineTo(dir * 110, 40); c.lineTo(0, 44); c.closePath(); }); EK.txt(ctx, label, dir * 52, 22, '700 14px Fredoka', '#fff6e0'); ctx.restore(); }
  S('rival', (ctx, lt, dur, t, R) => {   // rival teams side by side — less chain gang, more company softball league (with stone)
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 480); ES.desertRamp(ctx, t, 0, {});
    team(ctx, t, lerp(160, 360, clamp(lt / dur)), 560, 7, '#2a6a96', 'FRIENDS', 1, 81); team(ctx, t, lerp(1120, 900, clamp(lt / dur)), 680, 7, '#c8322a', 'DRUNKARDS', -1, 91); ctx.restore();
    K.tag(ctx, 'rival teams, side by side', 640, 110, lt, .3, { size: 28 });
    if (lt > R('softball')) { card(ctx, 'chain gang', 380, 230, lt, R('softball'), { size: 30, rot: -.05 }); K.cross(ctx, 380, 230, 60, lt, R('softball') + .5); card(ctx, 'company softball league', 860, 230, lt, R('softball') + 1.2, { size: 30, rot: .04 }); }
    if (lt > R('stone2')) K.tag(ctx, '…with stone', 860, 300, lt, R('stone2'), { size: 26, fill: '#f6c945' });
  });

  // ===================== CH 9: so were they slaves? =====================
  mood('hardest', 'quiet');
  fx('notfree', 'stamp', .5, .4);
  S('hardest', (ctx, lt, dur, t, R) => {   // MYTH CARD: slaves with whips built the pyramids
    K.mythCard(ctx, lt, t, { myth: 'Slaves with whips built the pyramids.', lines: [['The evidence: not in the way you\'ve pictured…', R('evidence'), '#2a6a3a'], ['…but this wasn\'t a free job either.', R('notfree'), '#8a3a2a']], stamp: 'IT\'S COMPLICATED', stampAt: R('notfree') + .4, stampCol: '#c8822a' });
    EK.chapter(ctx, lt, 9, 'So were they slaves?');
  });
  S('awayfrom', (ctx, lt, dur, t, R) => {   // pointing away from slavery: Egyptians buried with their families beside the king; records; rations as pay
    if (lt < R('rations')) { ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 480); ES.cemetery(ctx, t, 0, { v: 'gold' });
      fig(ctx, 'w3', 380, 720, .66, { t, pose: 'idle', turn: .3, light: LIGHT.gold, face: { mouth: 'smile' } }); fig(ctx, 'baker', 560, 720, .62, { t, prop: null, pose: 'idle', turn: .1, light: LIGHT.gold, face: { mouth: 'smile' } }); fig(ctx, 'w1', 690, 730, .38, { t, pose: 'wave', turn: .1, light: LIGHT.gold, face: { mouth: 'grin' } });
      ctx.restore(); K.tag(ctx, 'Egyptians — buried with their families', 640, 110, lt, R('egyptians') - .1, { size: 26 }); if (lt > R('egyptians') + 2.5) K.tag(ctx, 'in their own tombs, right beside the king', 640, 160, lt, R('egyptians') + 2.5, { size: 24 });
      if (lt > R('records')) K.tag(ctx, 'named crews · kept records', 1000, 300, lt, R('records'), { size: 24, fill: '#e2ecd4' }); }
    else { ctx.save(); push(ctx, lt - R('rations'), dur, 1.0, 1.05, 640, 420); ES.town(ctx, t, 0, { v: 'day', people: false });
      for (let i = 0; i < 5; i++) { sh(ctx, '#d8c08a', 3, c => c.roundRect(120 + i * 70, 620, 60, 70, 14)); ln(ctx, [[130 + i * 70, 632], [170 + i * 70, 632]], 3, '#8a6a3a'); }
      for (let i = 0; i < 4; i++) { const g = G.VK; sh(ctx, '#b8653a', 3, c => { c.moveTo(500 + i * 50, 690); c.quadraticCurveTo(480 + i * 50, 640, 500 + i * 50, 600); c.lineTo(530 + i * 50, 600); c.quadraticCurveTo(550 + i * 50, 640, 530 + i * 50, 690); c.closePath(); }); }
      fig(ctx, 'merer', 860, 720, .74, { t, pose: 'idle', turn: -.3, face: { mouth: 'flat', brows: 'neutral', look: [-.6, .4] } }); for (let i = 0; i < 4; i++) ES.ew(ctx, 980 + i * 60, 690, 1.6, t, { pose: 'stand', seed: i + 91, dir: -1 }); ctx.restore();
      K.tag(ctx, 'food + supplies issued to the men', 640, 110, lt, R('rations') + .2, { size: 26 }); if (lt > R('coins')) K.tag(ctx, 'no coins yet: paid in goods', 640, 165, lt, R('coins') + .3, { size: 26, fill: '#f6c945' }); }
  });
  S('other', (ctx, lt, dur, t, R) => {   // the other side: compulsory service — "everybody owed a labor tax"; like a draft
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); ES.nile(ctx, t, 0, { v: 'day', near: true, h: 300, bankY: 540, reeds: false });
    for (let i = 0; i < 30; i++) ES.ew(ctx, 120 + (i % 10) * 90 + (Math.floor(i / 10) % 2) * 40, 600 + Math.floor(i / 10) * 40, 1.1, t, { pose: 'stand', seed: i + 101, dir: i % 2 ? 1 : -1 });
    fig(ctx, 'merer', 1100, 720, .6, { t, pose: 'idle', turn: -.4, face: { mouth: 'flat', look: [-.6, .2] } }); ctx.restore();
    K.tag(ctx, 'compulsory service', 640, 110, lt, R('compulsory'), { size: 30 });
    if (lt > R('tax')) { EK.nameCard(ctx, lt, R('tax'), 'MARK LEHNER', 'in interviews', 330, 210, { icon: 'brush' }); card(ctx, '"it seems everybody owed a labor tax"', 840, 220, lt, R('tax') + .8, { size: 26 }); }
    if (lt > R('draft')) { [['fed', 0], ['housed', 1], ['sent home', 2]].forEach(([s2, i]) => { K.tag(ctx, s2, 400 + i * 240, 330, lt, R('fed2') + i * .5, { size: 26, fill: '#e2ecd4' }); }); K.tag(ctx, 'think of it like a draft', 640, 270, lt, R('draft'), { size: 28 }); }
    if (lt > R('sayno')) K.tag(ctx, '…but you probably couldn\'t say no', 640, 400, lt, R('sayno') + .2, { size: 28, fill: '#f2d8c8' });
  });
  fx('honestans', 'pop', .3, .8); fx('citizens', 'ding', .4);
  S('didhave', (ctx, lt, dur, t, R) => {   // Egypt did have slaves — just not the main workforce; citizens who owed the state their muscle for a season
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#7a4e33'], [1, '#4f3121']]); ctx.fillRect(0, 0, W, H); P.motes(ctx, t, 20, 9);
    card(ctx, 'Ancient Egypt did have slaves —', 640, 120, lt, .2, { size: 30 }); card(ctx, '— just not the main workforce on these pyramids', 640, 190, lt, R('mainwork'), { size: 26, rot: .01 });
    if (lt > R('honestans')) { card(ctx, 'slaves', 380, 330, lt, R('honestans') + .6, { size: 40, rot: -.05 }); K.cross(ctx, 380, 330, 60, lt, R('honestans') + 1.4); card(ctx, 'happy volunteers', 880, 330, lt, R('honestans') + 2.2, { size: 40, rot: .04 }); K.cross(ctx, 880, 330, 60, lt, R('honestans') + 3); }
    if (lt > R('citizens')) { card(ctx, 'citizens who owed the state\ntheir muscle for a season', 640, 500, lt, R('citizens'), { size: 34, fill: '#e2ecd4' }); K.tick(ctx, 920, 470, 40, lt, R('citizens') + .6); }
    if (lt > R('dinner')) K.title(ctx, '…and the state owed YOU dinner', lt, R('dinner') + .2, { y: 650, size: 40 });
  });
})(window);
