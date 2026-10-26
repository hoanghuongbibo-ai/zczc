/* "Where Does It Go?" — BEAT 6a (Sir John Harington, the Ajax, the book, the Elizabeth skit, three problems, refrain #4)
 * + BEAT 6b (Alexander Cumming bends the pipe: the S-trap) + BEAT 6c (okay, Tom: Crapper's myths, patents, showroom). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TS = G.TS, EF = G.EF, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, theo, sit, push, cover, card, refrain, label, LIGHT } = EP;
  const say = Gd.say, L = n => TV['L' + n];
  Object.assign(G.CW, {
    lady1: { outfit: 'gown', hat: 'none', look: { skin: '#f6e2d0', hair: 'long', hairCol: '#6a3a1e', lashes: true, lips: '#c25a5a' } },
    lady2: { outfit: 'gown', hat: 'none', look: { skin: '#f2dcc4', hair: 'curly', hairCol: '#e0b060', lashes: true, lips: '#c25a5a' } } });

  // the Ajax cutaway: cistern up top, a valve + handle, the bowl, a pipe down into the pit (k = flush progress 0..1)
  function ajax(ctx, x, y, s, t, k = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#8a6a44', 4, c => c.rect(-150, -330, 300, 150)); ctx.fillStyle = '#6aa0c8'; ctx.fillRect(-140, -320 + k * 100, 280, 130 - k * 100);   // cistern + water level
    ln(ctx, [[0, -180], [0, -110]], 22); ln(ctx, [[0, -180], [0, -110]], 14, '#9aa2ac');
    ctx.save(); ctx.translate(60, -150); ctx.rotate(-k * .9); ln(ctx, [[0, 0], [90, 0]], 14); ln(ctx, [[0, 0], [90, 0]], 8, '#c9a24a'); sh(ctx, '#c9a24a', 3, circ(92, 0, 12)); ctx.restore();
    sh(ctx, '#e8e2d4', 4, c => { c.moveTo(-120, -110); c.lineTo(120, -110); c.quadraticCurveTo(100, 20, 30, 40); c.lineTo(-30, 40); c.quadraticCurveTo(-100, 20, -120, -110); c.closePath(); });
    sh(ctx, '#5a4a36', 3, c => c.rect(-26, 40, 52, 160)); sh(ctx, '#3a2e22', 4, c => c.ellipse(0, 230, 170, 50, 0, 0, TAU));
    if (k > 0 && k < 1) for (let i = 0; i < 10; i++) { const u = ((t * 2 + i / 10) % 1); ctx.fillStyle = 'rgba(120,180,220,.8)'; ctx.fillRect(-10 + Math.sin(i) * 8, -100 + u * 320, 20, 20); }
    if (o.labels) { const lbl = [['cistern', -230, -260], ['valve + handle', 260, -150], ['bowl', -230, -40], ['pit below', 260, 220]]; lbl.forEach(([s2, lx, ly], i) => { if (o.labels > i) { ctx.save(); ctx.scale(1 / s, 1 / s); ctx.restore(); TS.txt(ctx, s2, lx, ly, '700 30px Fredoka', '#3a2618'); } }); }
    ctx.restore(); }
  EP.ajax = ajax;

  // ===================== BEAT 6a — Sir John Harington =====================
  mood(146, 'comic');
  S(146, (ctx, lt, dur, t, R) => {   // meet Sir John Harington — courtier, poet, translator, godson of Elizabeth I; keeps getting kicked out of court
    ctx.save(); cover(ctx, lt, [[0, 1.35, 400, 360], [R(150), 1.0, 640, 360]]); TS.court(ctx, t);
    if (lt > R(150)) fig(ctx, 'elizabeth', 640, 640, .82, { t, pose: lt > R(151) ? 'pointSideL' : 'idle', turn: lt > R(151) ? -.2 : 0, face: { mouth: lt > R(151) ? 'frown' : 'flat', eyes: 'half', brows: lt > R(151) ? 'angry' : 'skeptic' } });
    const out = clamp((lt - R(151) - .4) / 1.6); fig(ctx, 'harington', lerp(330, -200, ease.inOut(out)), 720, .92, { t, walk: out > 0 && out < 1 ? t * 8 : null, pose: lt < R(150) ? 'present' : 'idle', turn: out > 0 ? -.6 : .3, face: { mouth: out > 0 ? 'frown' : 'smirk', brows: out > 0 ? 'worried' : 'sly', eyes: 'open' } });
    ctx.restore();
    EK.nameCard(ctx, lt, .2, 'SIR JOHN HARINGTON', 'HAIR-ing-tun · 1560–1612', 330, 110, { icon: 'brush', w: 470 });
    [[R(147), 'courtier'], [R(148), 'poet'], [R(149), 'translator']].forEach(([a, s2], i) => { if (lt > a && lt < R(151)) K.tag(ctx, s2, 820 + i * 150, 200 + (i % 2) * 40, lt, a, { size: 28 }); });
    if (lt > R(150) && lt < R(151) + .5) K.tag(ctx, 'godson of Queen Elizabeth I', 900, 140, lt, R(150), { size: 28 });
    if (lt > R(151)) K.tag(ctx, 'kicked out of court (often)', 900, 140, lt, R(151) + .4, { size: 28 });
  });
  S(152, (ctx, lt, dur, t, R) => {   // reportedly: banished for passing racy translated poetry to the ladies-in-waiting; punishment: translate the entire poem. Which he did.
    TS.court(ctx, t, { pan: 60 });
    fig(ctx, 'lady1', 820, 720, .8, { t, pose: 'idle', turn: -.4, face: { mouth: 'o', eyes: 'wide', brows: 'up', blush: true } }); fig(ctx, 'lady2', 1060, 720, .8, { t: t + 1, turn: -.5, face: { mouth: 'grin', eyes: 'happy', blush: true } });
    fig(ctx, 'harington', 470, 740, .92, { t, pose: 'present', prop: 'book', turn: .4, face: { mouth: 'smirk', brows: 'sly', look: [.7, 0] } });
    label(ctx, lt, .2, 'REPORTEDLY', 1040, 110, '#c8322a'); if (lt > R(153) && lt < R(154)) K.tag(ctx, 'racy translated poetry', 640, 200, lt, R(153), { size: 30 });
    if (lt > R(154)) { const k = K.pop(lt, R(155), .4), pages = Math.floor(clamp((lt - R(155)) / 2) * 30); ctx.save(); ctx.fillStyle = 'rgba(30,15,10,.45)'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < pages; i++) { ctx.save(); ctx.translate(640 + Math.sin(i * 1.7) * 8, 640 - i * 12); ctx.rotate(Math.sin(i) * .05); sh(ctx, '#efe4c8', 2.5, c => c.rect(-130, -10, 260, 12)); ctx.restore(); }
      EP.card(ctx, 'punishment: translate the ENTIRE poem', 640, 150, lt, R(154), { size: 30 }); if (lt > R(156)) { K.tag(ctx, 'which he did.', 900, 300, lt, R(156), { size: 32 }); K.tick(ctx, 1040, 260, 1.4, lt, R(156) + .3); } }
  });
  S(157, (ctx, lt, dur, t, R) => {   // around the 1590s, at his house in Kelston near Bath, he builds a flushing toilet: the Ajax ("jakes" = slang for toilet)
    if (lt < R(158) + .3) { ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 360); TS.kelston(ctx, t); ctx.restore(); EP.dateTag(ctx, 'Kelston, near Bath · 1590s'); }
    else { EK.board(ctx, 10); ajax(ctx, 470, 470, .9, t, 0); FX.bigText(ctx, 'THE AJAX', 900, 220, 90 * K.pop(lt, R(159), .4), { fill: '#ffd23a' });
      if (lt > R(160)) EP.card(ctx, 'a pun: "a jakes"\n= slang for a toilet', 900, 420, lt, R(160), { size: 30 }); }
  });
  fx(165, 'splash', .6, .2); fx(165, 'river', .4, .3, 1.8);
  S(162, (ctx, lt, dur, t, R) => {   // a cistern above, a bowl, a handle, a valve. Turn it — water washes everything down into a pit below.
    EK.board(ctx, 11); const k = clamp((lt - R(165)) / 2.2);
    ajax(ctx, 520, 450, 1.0, t, k, { labels: lt > R(164) ? 4 : lt > R(163) ? 2 : 1 });
    if (lt > R(165)) K.tag(ctx, 'turn it →', 940, 180, lt, R(165), { size: 30 }); if (lt > R(166)) K.tag(ctx, 'everything → the pit', 880, 560, lt, R(166), { size: 30 });
  });
  S(167, (ctx, lt, dur, t, R) => {   // he even installs one for the queen at Richmond Palace — the year is debated (1592? later 1590s?)
    TS.court(ctx, t); ajax(ctx, 940, 600, .55, t, 0);
    fig(ctx, 'elizabeth', 520, 720, .85, { t, pose: 'idle', turn: .4, face: { mouth: 'flat', eyes: 'half', brows: 'skeptic', look: [.7, .2] } });
    EP.dateTag(ctx, 'Richmond Palace'); if (lt > R(168)) label(ctx, lt, R(168), 'DATE DEBATED', 640, 110);
    if (lt > R(169)) K.tag(ctx, '1592?', 900, 200, lt, R(169), { size: 34 }); if (lt > R(170)) K.tag(ctx, 'later in the 1590s?', 1060, 260, lt, R(170), { size: 30 });
  });
  S(171, (ctx, lt, dur, t, R) => {   // 1596: a whole book — "A New Discourse of a Stale Subject, Called the Metamorphosis of Ajax" — under a pen name meaning "hater of filth"
    EK.board(ctx, 12); const k = K.pop(lt, .3, .5); ctx.save(); ctx.translate(420, 380); ctx.scale(k, k); ctx.rotate(-.04);
    sh(ctx, '#6a2a22', 5, c => c.roundRect(-170, -240, 340, 480, 10)); sh(ctx, '#efe2c0', 3, c => c.rect(-140, -210, 280, 420));
    ['A NEW', 'DISCOURSE', 'of a', 'STALE SUBJECT,', 'called the', 'METAMORPHOSIS', 'of AJAX'].forEach((l, i) => TS.txt(ctx, l, 0, -170 + i * 52, (i % 2 ? '700 22px' : '600 30px') + ' Georgia, serif', '#3a2618'));
    ctx.restore(); EP.dateTag(ctx, '1596');
    if (lt > R(175)) EP.card(ctx, 'by "Misacmos"\n= hater of filth', 920, 280, lt, R(175), { size: 32 });
    if (lt > R(177)) K.tag(ctx, 'a toilet manual…', 920, 480, lt, R(177), { size: 28 }); if (lt > R(178)) K.tag(ctx, '…and a coded attack on people at court', 920, 550, lt, R(178), { size: 26 });
  });
  fx(181, 'stamp', .7, .2);
  S(179, (ctx, lt, dur, t, R) => {   // the queen is not amused. He gets banished. Again.
    ctx.save(); push(ctx, lt, dur, 1.3, 1.45, 640, 330); TS.court(ctx, t); fig(ctx, 'elizabeth', 640, 700, .9, { t, pose: lt > R(180) ? 'pointSideL' : 'crossed', turn: lt > R(180) ? -.3 : 0, face: { mouth: 'frown', eyes: 'half', brows: 'angry' } }); ctx.restore();
    if (lt > R(181)) FX.stamp(ctx, 'BANISHED', 640, 560, clamp((lt - R(181)) / .3), { color: '#c8322a', size: 70, rot: -.1 });
    if (lt > R(182)) K.tag(ctx, '(again)', 900, 620, lt, R(182), { size: 32 });
  });
  S(183, (ctx, lt, dur, t, R) => {   // SKIT — ELIZABETH: "John. You wrote a toilet book. About my friends." HARINGTON: "It's allegorical!" ELIZABETH: "Go allegorize in Somerset."
    ctx.save(); cover(ctx, lt, [[0, 1.35, 470, 330], [R(187) - .1, 1.35, 850, 330], [R(188) - .1, 1.35, 470, 330]]); TS.court(ctx, t);
    fig(ctx, 'elizabeth', 470, 720, .9, { t, pose: lt > R(188) ? 'pointSide' : 'crossed', turn: .35, vis: lt < R(187) || lt > R(188) - .1 ? say(t) : null, face: { mouth: 'flat', eyes: 'half', brows: lt > R(188) ? 'angry' : 'skeptic', look: [.6, 0] } }); EP.mark(ctx, 'liz', 470, 720, .9);
    fig(ctx, 'harington', 850, 740, .92, { t, pose: lt > R(187) - .1 && lt < R(188) ? 'presentBoth' : 'idle', prop: lt < R(187) ? 'book' : null, turn: -.35, vis: lt > R(187) - .1 && lt < R(188) ? say(t) : null, face: { mouth: lt > R(188) ? 'frown' : 'grin', brows: 'up', eyes: lt > R(188) ? 'open' : 'wide', sweat: true, look: [-.6, 0] } }); EP.mark(ctx, 'har', 850, 740, .92);
    ctx.restore();
    EP.speech(ctx, 'liz', '"John. You wrote a toilet book. About my friends."', L(183), L(187), t); EP.speech(ctx, 'har', '"It\'s allegorical!"', L(187), L(188), t); EP.speech(ctx, 'liz', '"Go allegorize in Somerset."', L(188), L(189), t);
  });
  S(189, (ctx, lt, dur, t, R) => {   // so: the flush toilet exists in the 1590s. Royal approval. Published instructions. And it… goes nowhere. Why?
    EK.board(ctx, 13); ajax(ctx, 300, 470, .75, t, 0);
    [[R(190), 'royal approval'], [R(190) + 1, 'published instructions']].forEach(([a, s2], i) => { if (lt > a) { K.tag(ctx, s2, 760, 220 + i * 90, lt, a, { size: 30 }); K.tick(ctx, 1000, 210 + i * 90, 1, lt, a + .3); } });
    if (lt > R(192)) FX.bigText(ctx, '…GOES NOWHERE', 760, 480, 70 * K.pop(lt, R(192), .4), { fill: '#ffd23a' }); if (lt > R(193)) FX.bigText(ctx, 'WHY?', 760, 600, 60 * K.pop(lt, R(193), .4), { fill: '#fff' });
  });
  fx(203, 'stamp', .7, .3);
  S(194, (ctx, lt, dur, t, R) => {   // three huge problems: 7.5 gallons a flush, hauled by hand · no smell block from the pit · it still had to go somewhere (a pit under your house)
    const p = lt < R(198) ? 0 : lt < R(200) ? 1 : 2;
    if (p < 2) { EK.board(ctx, 14); [['1', 'WATER'], ['2', 'SMELL'], ['3', 'WHERE?']].forEach(([n, s2], i) => { const on = i <= p, a = i === 0 ? R(195) : i === 1 ? R(198) : R(200); if (lt > a - .1) EP.card(ctx, n + ' · ' + s2, 260 + i * 380, 130, lt, a, { size: 34, fill: i === p ? '#fff3c8' : undefined }); });
      if (p === 0) { EK.count(ctx, 420, 380, 7.5, lt, R(196), 1.4, 'gallons per flush (reportedly)', { size: 90, dec: 1 }); if (lt > R(197)) { fig(ctx, 'neo2', 960, 720, .75, { t, prop: 'jug', pose: 'idle', turn: -.3, face: { mouth: 'grit', brows: 'worried', sweat: true } }); K.tag(ctx, 'hauled by hand', 960, 330, lt, R(197), { size: 28 }); } }
      else { ajax(ctx, 640, 500, .7, t, 0); TS.stink(ctx, t, 640, 430, 1, 3); K.cross(ctx, 640, 340, 1.4, lt, R(199) + 1.2); K.tag(ctx, 'nothing blocked the smell from the pit', 640, 690, lt, R(199), { size: 28 }); } }
    else {   // the cutaway: an early flush toilet draining into a pit under the house; water poured in by hand; odours rising
      ctx.fillStyle = '#e8d8b8'; ctx.fillRect(0, 0, W, 470); TS.stoneCourses(ctx, 0, 0, W, 470, '#d8c49a', 5); ctx.fillStyle = '#6a5240'; ctx.fillRect(0, 470, W, H - 470); sh(ctx, '#3a2a1e', 4, c => c.ellipse(640, 640, 300, 70, 0, 0, TAU));
      ajax(ctx, 640, 430, .7, t, .5); fig(ctx, 'neo2', 360, 470, .65, { t, prop: 'jug', pose: { L: [-68, -158], R: [150, -360], hL: 'rest', hR: 'hold' }, turn: .5, face: { mouth: 'grit', brows: 'worried', sweat: true } });
      TS.stink(ctx, t, 640, 600, 1, 4); K.tag(ctx, 'a pit under your house isn\'t a plan', 640, 110, lt, R(203) - .4, { size: 30 });
      if (lt > R(202)) refrain(ctx, lt, R(202), 4, { y: 220 }); }
  });

  // ===================== BEAT 6b — Alexander Cumming bends the pipe =====================
  mood(204, 'curious');
  function strap(ctx, x, y, s, t, k = 1, o = {}) {   // the S-trap: a bent pipe that keeps a plug of water in its lowest curve (k = fill)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const P_ = c => { c.moveTo(-200, -200); c.lineTo(-200, 0); c.bezierCurveTo(-200, 120, 0, 120, 0, 0); c.bezierCurveTo(0, -120, 200, -120, 200, 0); c.lineTo(200, 200); };
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P_(ctx); ctx.lineWidth = 96; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = 84; ctx.strokeStyle = '#c8ced4'; ctx.stroke(); ctx.lineWidth = 66; ctx.strokeStyle = '#f2f4f6'; ctx.stroke();
    if (k > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-260, 90 - k * 110, 300, 200); ctx.clip(); ctx.beginPath(); ctx.moveTo(-200, -60); ctx.lineTo(-200, 0); ctx.bezierCurveTo(-200, 120, 0, 120, 0, 0); ctx.lineWidth = 62; ctx.strokeStyle = '#6ab0e0'; ctx.stroke(); ctx.restore(); }
    if (o.stink) { TS.stink(ctx, t, 200, 220, o.stink, 1); if (o.blocked) { ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = '#c8322a'; ctx.beginPath(); ctx.moveTo(-60, 20); ctx.lineTo(60, 120); ctx.moveTo(60, 20); ctx.lineTo(-60, 120); ctx.stroke(); ctx.restore(); } }
    ctx.restore(); }
  S(204, (ctx, lt, dur, t, R) => {   // almost 180 years pass. 1775: a Scottish watchmaker, Alexander Cumming, gets the first patent for a flush toilet
    EK.board(ctx, 15);
    if (lt < R(206)) { FX.bigText(ctx, '~180 YEARS LATER', 640, 360, 80 * K.pop(lt, .2, .4), { fill: '#ffd23a' }); return; }
    fig(ctx, 'cumming', 330, 760, .95, { t, pose: 'magnify', turn: .35, face: { mouth: 'o', brows: 'up', look: [.5, -.2] } });
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(820 + (i % 2) * 140, 470 + Math.floor(i / 2) * 140); ctx.rotate(t * (i % 2 ? -.8 : .8)); ctx.lineWidth = 6; ctx.strokeStyle = '#c9a24a'; ctx.beginPath(); for (let a = 0; a < TAU; a += TAU / 24) { const r = a % (TAU / 12) < TAU / 24 ? 60 : 48; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.stroke(); ctx.restore(); }
    EK.nameCard(ctx, lt, R(207), 'ALEXANDER CUMMING', 'Scottish watchmaker · 1733–1814', 900, 120, { icon: 'brush', w: 470 });
    if (lt > R(207) + 1.6) EP.card(ctx, 'PATENT · 1775\nthe first for a flush toilet', 900, 280, lt, R(207) + 1.6, { size: 28, fill: '#fff3c8' });
  });
  fx(209, 'whoosh', .5);
  S(208, (ctx, lt, dur, t, R) => {   // his big idea is tiny: bend the pipe. The S-trap holds water — a seal; smell from below can't get past
    EK.board(ctx, 16); const k = clamp((lt - R(211)) / 1.2);
    strap(ctx, 520, 380, .9, t, k, { stink: lt > R(213) ? 1 : 0, blocked: lt > R(213) + .6 });
    FX.bigText(ctx, 'BEND THE PIPE', 640, 80, 64 * K.pop(lt, R(209), .4), { fill: '#ffd23a' });
    if (lt > R(210)) EK.nameCard(ctx, lt, R(210), 'THE S-TRAP', 'Cumming, 1775', 1010, 220, { icon: 'brush', w: 340 });
    if (lt > R(212)) K.tag(ctx, 'water = a seal', 1010, 380, lt, R(212), { size: 30 }); if (lt > R(213)) K.tag(ctx, 'smell can\'t get past', 1010, 450, lt, R(213), { size: 28 });
  });
  S(214, (ctx, lt, dur, t, R) => {   // look under your sink: the great-grandchild of Cumming's bend. Least glamorous invention ever — made indoor toilets bearable.
    TS.bathroom(ctx, t, { pan: 80 }); ctx.save(); ctx.translate(640, 0);
    sh(ctx, '#fbfdfe', 5, c => c.roundRect(-200, 300, 400, 70, 20)); sh(ctx, '#e8eef2', 4, c => c.rect(-60, 370, 120, 330)); ctx.restore();
    strap(ctx, 640, 520, .32, t, 1); K.tag(ctx, 'under your sink: Cumming\'s great-grandchild', 640, 200, lt, .4, { size: 28 });
    if (lt > R(215)) { fig(ctx, 'cumming', 1060, 760, .85, { t, pose: 'thumbsUp', turn: -.35, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); K.tag(ctx, 'least glamorous invention ever', 400, 120, lt, R(215), { size: 28 }); }
    if (lt > R(216)) label(ctx, lt, R(216) + .3, 'BEARABLE', 400, 560, '#2a7a4a');
  });

  // ===================== BEAT 6c — Okay, Tom. Your turn. =====================
  mood(217, 'comic');
  fx(217, 'boing', .6, .2); fx(217, 'confetti', .5, .5);
  S(217, (ctx, lt, dur, t, R) => {   // "Fine. Now, Tom." Crapper bursts in, ecstatic. A real Victorian plumber in London.
    TS.showroom(ctx, t); const up = ease.out(clamp((lt - .5) / .4));
    theo(ctx, 300, 760, .9, { t, outfit: 'victorian', hat: 'topHat', pose: lt < .6 ? 'shrug' : 'present', turn: .35, vis: say(t), face: { mouth: 'smile', eyes: 'half', brows: 'up' } });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 760); ctx.clip(); fig(ctx, 'crapper', 860, 760 + (1 - up) * 560, 1.0, { t, pose: 'cheer', turn: -.3, hair: Gd.hairRing(lt - .9), face: { mouth: 'grin', eyes: 'happy', brows: 'up', blush: true } }); ctx.restore();
    if (lt > R(219)) EK.nameCard(ctx, lt, R(219), 'THOMAS CRAPPER', 'Victorian plumber, London · 1836–1910', 900, 110, { icon: 'brush', w: 520 });
  });
  fx(221, 'stamp', .6, .4); fx(225, 'stamp', .6, .2);
  S(220, (ctx, lt, dur, t, R) => {   // myth 1: he invented the flush toilet — nope, Cumming's patent, nearly a century earlier. Myth 2: "crap" from his name — nope, Middle English. A coincidence.
    EK.board(ctx, 17); fig(ctx, 'crapper', 1080, 780, .8, { t, pose: lt < R(222) ? 'cheer' : lt < R(225) ? 'shrug' : 'facepalm', turn: -.3, face: { mouth: lt < R(222) ? 'grin' : 'frown', eyes: lt < R(222) ? 'happy' : 'open', brows: lt < R(222) ? 'up' : 'worried' } });
    if (lt < R(223)) { EP.card(ctx, 'MYTH 1: he invented\nthe flush toilet', 520, 200, lt, .2, { size: 34 }); if (lt > R(221)) FX.stamp(ctx, 'NOPE', 520, 330, clamp((lt - R(221) - .3) / .3), { color: '#c8322a', size: 70, rot: -.1 });
      if (lt > R(222)) EP.card(ctx, 'that patent: Cumming, 1775', 520, 470, lt, R(222), { size: 30, fill: '#fff3c8' }); }
    else { EP.card(ctx, 'MYTH 2: "crap" comes\nfrom his name', 520, 200, lt, R(223), { size: 34 }); if (lt > R(225)) FX.stamp(ctx, 'ALSO NOPE', 520, 330, clamp((lt - R(225)) / .3), { color: '#c8322a', size: 64, rot: -.1 });
      if (lt > R(226)) EP.card(ctx, '"crap" is Middle English —\naround long before him', 520, 470, lt, R(226), { size: 28, fill: '#fff3c8' });
      if (lt > R(227)) FX.bigText(ctx, 'A COINCIDENCE', 520, 630, 56 * K.pop(lt, R(227), .4), { fill: '#ffd23a' }); if (lt > R(228)) K.tag(ctx, 'the greatest in plumbing history', 520, 690, lt, R(228) + 1, { size: 22 }); }
  });
  S(229, (ctx, lt, dur, t, R) => {   // so what did Crapper actually do? 9 patents (3 for water-closet improvements), a successful company, one of the first showrooms (~1870)
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [R(234), 1.0, 640, 360]]); TS.showroom(ctx, t);
    fig(ctx, 'crapper', 640, 760, .95, { t, pose: lt > R(234) ? 'presentBoth' : 'present', prop: lt > R(234) ? null : 'wrench', turn: 0, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); ctx.restore();
    if (lt > R(230) && lt < R(234)) { EK.count(ctx, 330, 300, 9, lt, R(230), 1, 'patents', { size: 90 }); EK.count(ctx, 950, 300, 3, lt, R(230) + 1.6, .6, 'for water closets', { size: 90 }); }
    if (lt > R(231) && lt < R(234)) K.tag(ctx, 'a successful company', 640, 610, lt, R(231), { size: 28 });
    if (lt > R(234)) { EP.dateTag(ctx, 'c. 1870'); K.tag(ctx, 'one of the first bathroom showrooms', 640, 200, lt, R(234), { size: 30 }); }
    if (lt > R(236)) for (const [x, p] of [[300, '£4'], [560, '£5'], [820, '£6'], [1080, '£7']]) K.tag(ctx, p, x + 50, 400, lt, R(236) + x / 2000, { size: 24, fill: '#f6c945' });
  });
  S(237, (ctx, lt, dur, t, R) => {   // WWI American soldiers saw "Crapper" on British toilets and took the word home — popular, but "reportedly"
    TS.bathroom(ctx, t); ctx.fillStyle = 'rgba(80,70,50,.35)'; ctx.fillRect(0, 0, W, H);
    sh(ctx, '#2a2a30', 4, c => c.roundRect(700, 160, 260, 110, 10)); TS.txt(ctx, 'T. CRAPPER', 830, 200, '30px "Luckiest Guy"', '#e8c870'); TS.txt(ctx, 'CHELSEA · LONDON', 830, 240, '700 18px Fredoka', '#e8c870');
    fig(ctx, 'soldier', 450, 760, .9, { t, pose: 'pointSide', turn: .4, face: { mouth: 'o', eyes: 'wide', brows: 'up', look: [.7, -.4] } });
    EP.dateTag(ctx, 'World War I · 1917–18'); if (lt > R(238)) label(ctx, lt, R(238), 'REPORTEDLY', 900, 420);
  });
  S(239, (ctx, lt, dur, t, R) => {   // CRAPPER (deflated): "So I'm… a salesman."  NARRATOR: "A great salesman, Tom."
    ctx.save(); cover(ctx, lt, [[0, 1.3, 860, 330], [R(241) - .1, 1.0, 640, 360]]); TS.showroom(ctx, t);
    theo(ctx, 360, 760, .92, { t, outfit: 'victorian', hat: 'topHat', pose: lt > R(241) ? 'thumbsUp' : 'idle', turn: .35, vis: lt > R(241) - .1 ? say(t) : null, face: { mouth: 'smile', brows: 'up', eyes: lt > R(241) ? 'happy' : 'open', look: [.6, 0] } }); EP.mark(ctx, 'theo', 360, 760, .92);
    fig(ctx, 'crapper', 860, 760, .95, { t, pose: lt > R(241) + .8 ? 'cheer' : 'shrug', turn: -.3, vis: lt < R(241) - .1 ? say(t) : null, face: { mouth: lt > R(241) + .8 ? 'grin' : 'frown', eyes: lt > R(241) + .8 ? 'happy' : 'half', brows: lt > R(241) + .8 ? 'up' : 'worried', look: [-.4, .3] } }); EP.mark(ctx, 'crap', 860, 760, .95);
    ctx.restore(); EP.speech(ctx, 'crap', '"So I\'m… a salesman."', L(239), L(241), t); EP.speech(ctx, 'theo', '"A great salesman, Tom."', L(241), L(242), t);
  });
})(window);
