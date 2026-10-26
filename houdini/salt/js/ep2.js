/* "It's About Salt" — BEAT 4c (France: the gabelle, the skit, smugglers + salt police, 1789–90 · counter 3)
 * + BEAT 4d (New York: Onondaga salt, the Erie Canal, the Salt City · counter 4) + BEAT 5 (the recap bridge)
 * + BEAT 6 (the "salary" myth · MYTH #1 BUSTED · the salted-Carthage myth · MYTH #2 BUSTED). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, EK = G.EK, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, { W, H, clamp, lerp, ease } = T;
  const { OUT, sh, ln } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, push, cover } = EP, say = Gd.say, L = n => G.TV['L' + n], big = EP.big;
  // gabelle zones (approximate, after the classic 18th-century map): grande gabelle (north + centre), petite gabelle (south-east), Brittany exempt
  const GRANDE = [[-1.5, 50.5], [2.5, 51.2], [4.5, 50.2], [5.2, 48.6], [4.6, 46.8], [3.2, 46.2], [1.4, 46.1], [0, 46.6], [-1.2, 47.2], [-1.6, 48.4], [-1.8, 49.6]];
  const PETITE = [[4.6, 46.8], [6.2, 46.2], [7.6, 44.2], [6.6, 43.1], [4.6, 43.3], [3.2, 43.2], [2.4, 44.2], [3.2, 46.2]];
  const BRITTANY = [[-4.8, 48.6], [-3.2, 48.9], [-1.6, 48.4], [-1.2, 47.2], [-2.6, 47.2], [-4.4, 47.8]];

  // ===================== BEAT 4c — France: the most hated tax =====================
  mood(122, 'busy'); fx(122, 'whoosh', .5);
  S(122, (ctx, lt, dur, t, R) => {   // fast-forward to France. In 1360 the French crown made a sales tax, the gabelle, permanent; by the 1400s "gabelle" meant one thing: the salt tax
    const v = EP.mapShot(ctx, t, lt, [[0, 2.4, 46.6, 26], [6, 2.4, 46.6, 30]], { D: 2.2 });
    if (lt > R(123, 2)) K.tag(ctx, '1360: made permanent', 330, 140, lt, R(123, 2), { size: 28 });
    if (lt > R(124)) EK.nameCard(ctx, lt, R(124), 'LA GABELLE', 'gah-BELL · by the 1400s: the salt tax', 900, 600, { icon: 'brush', w: 480 });
    if (lt > R(125)) EP.label(ctx, lt, R(125), 'THE SALT TAX', 640, 120);
    EP.dateTag(ctx, 'France · 1360 → 1700s');
  });
  S(126, (ctx, lt, dur, t, R) => {   // in the "big gabelle" regions people were required to buy a set amount of salt from the royal storehouses — whether they needed it or not
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.grenier(ctx, t);
    for (let i = 0; i < 4; i++) fig(ctx, i % 2 ? 'peasant' : 'smuggler', 120 + i * 110, 760 - i * 18, .62 - i * .04, t + i, { prop: i % 2 ? 'coins' : 'none', turn: .7, face: { mouth: 'frown', brows: 'worried' } });
    fig(ctx, 'taxman', 640, 600, .55, { t, pose: 'present', turn: -.2, face: { mouth: 'grin', brows: 'sly' } }); ctx.restore();
    if (lt > R(128, 5)) EP.card(ctx, 'COMPULSORY SALT\n(a set amount per household)', 960, 140, lt, R(128, 5), { size: 26 });
    if (lt > R(129)) K.tag(ctx, 'need it or not', 960, 270, lt, R(129), { size: 28, fill: '#ffd8d0' });
  });
  S(130, (ctx, lt, dur, t, R) => {   // rates were wildly different: Brittany paid basically nothing, Paris paid a fortune. And the nobility and the clergy? Exempt.
    if (lt < R(133)) { const v = M.view(1.6, 46.8, 78); M.draw(ctx, t, v); const a = clamp(lt / .6);
      M.zone(ctx, v, GRANDE, '#8a2a22', .45 * a); M.zone(ctx, v, PETITE, '#d88a3a', .4 * a); M.zone(ctx, v, BRITTANY, '#f4f2ea', .7 * a);
      M.label(ctx, v, 2.2, 48, 'GRANDE GABELLE', { size: 22, col: '#5a1410' }); M.label(ctx, v, 5.2, 44.6, 'PETITE GABELLE', { size: 18, col: '#7a3a10' }); M.label(ctx, v, -3, 48.1, 'BRITTANY', { size: 18 });
      if (lt > R(131)) M.pin(ctx, v, -2.8, 48, 'Brittany: ≈ nothing', 1, { col: '#3a8a52', dy: 10 }); if (lt > R(132)) M.pin(ctx, v, 2.35, 48.86, 'Paris: a fortune', 1); }
    else { TS.grenier(ctx, t); for (let i = 0; i < 2; i++) { const u = clamp((lt - R(133) - i * .5) / 2.4); fig(ctx, i ? 'noble' : 'scholar', lerp(1400, 1150, ease.out(u)) + i * 80, 600, .5, t + i, { walk: u < 1 ? t * 6 : null, turn: -.7, outfit: i ? 'georgian' : 'frockBlack', hat: i ? 'periwig' : 'none', face: { mouth: 'smirk', eyes: 'half' } }); }
      if (lt > R(134)) EP.label(ctx, lt, R(134), 'EXEMPT', 1120, 180, '#2a8a52'); K.tag(ctx, 'nobility · clergy', 1120, 260, lt, R(133) + .3, { size: 26 }); }
  });
  // the skit: the peasant and the tax collector
  mood(135, 'comic');
  S(135, (ctx, lt, dur, t, R) => {   // "So I have to buy salt I don't need…" "Mm-hm." "…at a price the duke doesn't pay…" "He's very busy." "…and if I buy it cheap from Brittany, you arrest me." "Now you're getting it!"
    const pTalk = lt < R(136) - .1 || (lt > R(137) - .1 && lt < R(138) - .1) || (lt > R(139) - .1 && lt < R(142) - .1);
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); TS.grenier(ctx, t);
    fig(ctx, 'peasant', 400, 760, .9, { t, pose: lt > R(139) && lt < R(142) ? 'presentBoth' : lt > R(137) ? 'shrug' : 'present', turn: .35, vis: pTalk ? say(t) : null, face: lt > R(142) ? { mouth: 'frown', eyes: 'half', brows: 'worried' } : { mouth: 'grit', brows: 'worried', look: [.7, 0] } }); EP.mark(ctx, 'p', 400, 760, .9);
    fig(ctx, 'taxman', 880, 760, .9, { t, pose: lt > R(142) ? 'thumbsUp' : 'hips', turn: -.35, vis: !pTalk ? say(t) : null, face: { mouth: 'grin', brows: 'sly', eyes: lt > R(138) && lt < R(139) ? 'half' : 'happy', look: [-.6, 0] } }); EP.mark(ctx, 'tc', 880, 760, .9);
    ctx.restore();
    EP.speech(ctx, 'p', '"So I have to buy salt I don\'t need…"', L(135), L(136), t); EP.speech(ctx, 'tc', '"Mm-hm."', L(136), L(137), t);
    EP.speech(ctx, 'p', '"…at a price the duke doesn\'t pay…"', L(137), L(138), t); EP.speech(ctx, 'tc', '"He\'s very busy."', L(138), L(139), t);
    EP.speech(ctx, 'p', '"…and if I buy it cheap from Brittany, you arrest me."', L(139), L(142), t); EP.speech(ctx, 'tc', '"Now you\'re getting it!"', L(142), L(143), t);
  });
  mood(143, 'danger'); fx(143, 'hooves', .5, 2.2, 3);
  S(143, (ctx, lt, dur, t, R) => {   // smuggling exploded: smugglers ran salt across provincial borders; the crown hired armed salt police; convicted smugglers → the galleys, repeat offenders executed
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 470); TS.border(ctx, t);
    for (let i = 0; i < 3; i++) { const u = clamp(lt / 4.5 - i * .06), x = lerp(320, 900, u) - i * 120; fig(ctx, 'smuggler', x, 560 + i * 34, .42, t + i, { walk: u < 1 ? t * 8 : null, turn: .8, face: { mouth: 'grit', eyes: 'squint', brows: 'worried' } }); }
    if (lt > R(145)) for (let i = 0; i < 2; i++) { const u = clamp((lt - R(145)) / 3 - i * .1); fig(ctx, 'taxman', lerp(-80, 420, u) - i * 120, 640 + i * 30, .5, t + i, { walk: u < 1 ? t * 9 : null, turn: .8, face: { mouth: 'grit', brows: 'angry' } }); }
    ctx.restore(); EP.dateTag(ctx, 'France · 1700s');
    if (lt > R(144)) K.tag(ctx, 'across provincial borders', 640, 140, lt, R(144), { size: 28 });
    if (lt > R(145, 6)) EK.nameCard(ctx, lt, R(145, 6), 'THE SALT POLICE', 'the crown\'s armed force', 960, 250, { icon: 'brush', w: 420 });
    if (lt > R(146)) EP.card(ctx, 'caught → the galleys\nagain → execution', 960, 560, lt, R(146), { size: 26 });
  });
  mood(147, 'rising');
  S(147, (ctx, lt, dur, t, R) => {   // 1789: the official lists of complaints for the Estates-General — the gabelle was all over them. March 1790: abolished.
    EP.board(ctx, 9, ['grenier', 'border', 'larder']);
    const k = K.pop(lt, .2, .4); if (k > 0) { ctx.save(); ctx.translate(560, 380); ctx.scale(k, k); ctx.rotate(-.02); K.paper(ctx, 0, 0, 440, 420, { draw: c => { EK.txt(c, 'CAHIER DE DOLÉANCES', 0, -170, '28px "Luckiest Guy"', '#3a2618'); EK.txt(c, 'list of complaints · 1789', 0, -136, '700 18px Fredoka', '#6a5040');
      for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(60,40,20,.5)'; c.fillRect(-170, -100 + i * 44, 300 + (i % 3) * 20, 6); } EK.txt(c, 'la GABELLE !', 20, 46, '700 30px Fredoka', '#8a1e18'); } }); ctx.restore(); }
    if (lt > R(148)) { const k2 = clamp((lt - R(148)) / .5); ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[14, '#fff'], [8, '#e0261c']]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.ellipse(585, 424, 130, 40, -.05, 0, TAU * .97 * k2); ctx.stroke(); } ctx.restore(); }
    if (lt > R(149)) { EP.label(ctx, lt, R(150), 'ABOLISHED', 960, 220, '#2a8a52'); K.tag(ctx, 'March 1790', 960, 300, lt, R(149), { size: 30 }); }
  });
  S(151, (ctx, lt, dur, t, R) => {   // historians argue how much the salt tax caused the Revolution — one of many grievances (bread prices, debt, a monarchy that couldn't fix anything) — but the one everybody felt at the dinner table
    if (lt < R(154)) { EP.board(ctx, 10, ['grenier', 'larder', 'border']); [['bread prices', 380, 260], ['debt', 760, 240], ['a stuck monarchy', 420, 470], ['the salt tax', 800, 480]].forEach(([s2, x, y], i) => { const a = i < 3 ? R(152) + i * .6 : .2; if (lt > a) EP.card(ctx, s2, x, y, lt, a, { size: 32, fill: i === 3 ? '#ffe2a8' : undefined }); }); }
    else { TS.larder(ctx, t); fig(ctx, 'peasant', 640, 760, .9, { t, pose: 'shrug', turn: 0, prop: 'none', face: { mouth: 'frown', brows: 'worried' } }); EP.shaker(ctx, 860, 472, .55, t, { turn: 1, face: 'smug' }); K.tag(ctx, 'felt at the dinner table', 640, 140, lt, R(154), { size: 32 }); }
  });
  EP.count(3, 155, -.3);
  S(155, (ctx, lt, dur, t, R) => {   // and once again… it's about salt
    TS.grenier(ctx, t); fig(ctx, 'peasant', 240, 760, .88, { t, pose: 'cheer', turn: .3, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); fig(ctx, 'taxman', 1040, 760, .85, { t, pose: 'shrug', turn: -.3, face: { mouth: 'frown', brows: 'worried', sweat: true } });
    EP.refrainSalt(ctx, lt, .1, { y: 120, gap: R(156) - .1 });
  });

  // ===================== BEAT 4d — America: the ditch that salt built =====================
  mood(157, 'rising'); fx(157, 'whoosh', .5);
  S(157, (ctx, lt, dur, t, R) => {   // now America, and the story flips: central New York, the shores of Onondaga Lake, homeland of the Onondaga Nation — salt springs; after the Revolution, a state salt reservation leased out
    const v = EP.mapShot(ctx, t, lt, [[0, -76.2, 43.05, 60], [8, -76.2, 43.05, 120]], { D: 2.2 });
    if (lt > 2.2) { M.pin(ctx, v, -76.2, 43.08, 'Onondaga Lake', clamp((lt - R(158, 6)) / .4)); }
    if (lt > R(158, 14)) K.tag(ctx, 'homeland of the Onondaga Nation', 640, 620, lt, R(158, 14), { size: 26 });
    if (lt > R(159)) K.tag(ctx, 'salt springs', 300, 160, lt, R(159), { size: 28 }); if (lt > R(160)) EP.card(ctx, 'state salt reservation\n→ leased out', 980, 160, lt, R(160), { size: 24 });
    EP.dateTag(ctx, 'New York · 1790s–1800s');
  });
  S(161, (ctx, lt, dur, t, R) => {   // then New York had a crazy idea: dig a 363-mile ditch from the Hudson to Lake Erie — the Erie Canal
    if (lt < R(163)) { const v = M.view(-75.9, 42.85, 95); M.draw(ctx, t, v); const k = clamp((lt - R(162)) / 2.2);
      M.route(ctx, v, [[-73.75, 42.65], [-74.4, 42.95], [-75.2, 43.1], [-76.15, 43.05], [-77.0, 43.08], [-77.6, 43.15], [-78.3, 43.1], [-78.88, 42.9]], k, { w: 9, dash: [20, 10] });
      M.pin(ctx, v, -73.75, 42.65, 'Hudson · Albany', clamp((lt - R(162)) / .4)); if (k > .95) M.pin(ctx, v, -78.88, 42.9, 'Lake Erie · Buffalo', 1);
      if (lt > R(162, 2)) EK.count(ctx, 900, 560, 363, lt, R(162, 2), 1.2, 'miles of ditch', { size: 64 }); }
    else { ctx.save(); push(ctx, lt - R(163), dur - R(163), 1.0, 1.06, 640, 520); TS.canal(ctx, t, { dig: true }); ctx.restore(); EP.big(ctx, 'THE ERIE CANAL', 640, 140, 66, lt, R(163), '#ffd23a'); }
  });
  S(164, (ctx, lt, dur, t, R) => {   // Thomas Jefferson thought the idea was ridiculous. But New York needed a way to pay for it…
    TS.canal(ctx, t, { dig: true }); fig(ctx, 'jefferson', 640, 760, .9, { t, pose: 'shrug', turn: .1, face: { mouth: 'smirk', brows: 'skeptic', eyes: 'half' } });
    EK.nameCard(ctx, lt, .2, 'THOMAS JEFFERSON', 'thought it was ridiculous', 330, 120, { icon: 'brush', w: 420 });
    if (lt > R(165)) K.tag(ctx, 'how to pay for it?', 960, 140, lt, R(165), { size: 30 });
  });
  S(166, (ctx, lt, dur, t, R) => {   // in 1816 lawmakers put a duty on every bushel of Onondaga salt to feed the canal fund
    EP.board(ctx, 11, ['canalSalt', 'canal', 'grocery']);
    for (let i = 0; i < 3; i++) { const k = K.pop(lt, .3 + i * .3, .4); if (k > 0) { ctx.save(); ctx.translate(380 + i * 120, 470); ctx.scale(k, k); PR.barrel(ctx, 0, 0, 1.1); ctx.restore(); } }
    const k = K.pop(lt, 1.2, .4); if (k > 0) { ctx.save(); ctx.translate(880, 360); ctx.scale(k, k); K.paper(ctx, 0, 0, 340, 240, { rot: .02, draw: c => { EK.txt(c, 'CANAL FUND', 0, -80, '34px "Luckiest Guy"', '#2a5aa8'); EK.txt(c, 'salt duty', 0, -30, '700 24px Fredoka', '#3a2618'); EK.txt(c, 'per bushel', 0, 4, '700 24px Fredoka', '#3a2618'); EK.txt(c, 'from 1816', 0, 60, '700 22px Fredoka', '#8a1e18'); } }); ctx.restore(); }
    for (let i = 0; i < 6; i++) { const u = ((lt * .8 + i / 6) % 1); if (lt > 1.4) sh(ctx, '#e8c45a', 2.5, c => c.ellipse(lerp(560, 820, u), 440 - Math.sin(u * PI) * 100, 14, 6, 0, 0, TAU)); }
  });
  S(167, (ctx, lt, dur, t, R) => {   // the weird part? The salt makers were fine with it — once the canal opened in 1825 they could ship salt cheap across the country
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 480); TS.canal(ctx, t, { boat: clamp(lt / dur) * .9 + .05 }); ctx.restore();
    if (lt > R(168)) K.tag(ctx, 'salt makers: fine with it', 640, 140, lt, R(168), { size: 30, fill: '#d8f0c8' });
    if (lt > R(169)) EP.dateTag(ctx, 'canal opens · 1825'); if (lt > R(170)) K.tag(ctx, 'ship salt cheap', 640, 210, lt, R(170), { size: 28 });
  });
  S(171, (ctx, lt, dur, t, R) => {   // the town on top of the springs got a new nickname: the Salt City — today, Syracuse. By the 1870s Onondaga County made nearly 90 percent of the nation's salt
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.canal(ctx, t, { v: 'salt', boat: .4 + clamp(lt / dur) * .3 }); ctx.restore();
    if (lt > R(172)) EP.label(ctx, lt, R(172), 'THE SALT CITY', 640, 150, '#2a5aa8'); if (lt > R(173)) K.tag(ctx, 'today: Syracuse, NY', 640, 230, lt, R(173), { size: 28 });
    if (lt > R(175)) EK.count(ctx, 1000, 560, 90, lt, R(175, 4), 1.2, '% of the nation\'s salt · 1870s', { size: 64, suffix: '%' });
  });
  S(176, (ctx, lt, dur, t, R) => {   // so this time salt didn't just get taxed — it built the road, or in this case the ditch, that made New York rich
    TS.canal(ctx, t, { boat: .6 }); if (lt > R(177)) K.tag(ctx, 'it built the ditch', 640, 150, lt, R(177), { size: 32 }); if (lt > R(178)) EP.label(ctx, lt, R(178), 'NEW YORK: RICH', 640, 240, '#2a8a52');
  });
  EP.count(4, 179, -.3);
  S(179, (ctx, lt, dur, t, R) => {   // and once again… it's about salt
    TS.canal(ctx, t, { v: 'salt', boat: .5 }); fig(ctx, 'peasant', 250, 760, .9, { t, pose: 'cheer', turn: .3, prop: 'saltSack', face: { mouth: 'grin', eyes: 'happy', brows: 'up' } });
    EP.refrainSalt(ctx, lt, .1, { y: 120, gap: R(180) - .1 });
  });

  // ===================== BEAT 5 — the bridge (no sponsor read in the recording) =====================
  mood(181, 'comic');
  S(181, (ctx, lt, dur, t, R) => {   // now where were we? China taxed salt to pay for war, France taxed salt until people revolted, New York taxed salt to dig a canal
    EP.board(ctx, 12, ['hanCourt', 'grenier', 'canal']);
    [['CHINA', 'taxed it → war', R(183), 330], ['FRANCE', 'taxed it → revolt', R(184), 640], ['NEW YORK', 'taxed it → a canal', R(185), 950]].forEach(([a, b, at, x]) => { if (lt > at) { const k = K.pop(lt, at, .4); if (k > 0) G.UI.box(ctx, x, 380, 290, 200, c => { c.translate(x, 380); c.scale(k, k); K.paper(c, 0, 0, 270, 180, { draw: cc => { EK.txt(cc, a, 0, -30, '40px "Luckiest Guy"', '#c8322a'); EK.txt(cc, b, 0, 30, '700 24px Fredoka', '#3a2618'); } }); }); } });
    if (lt < R(183)) EP.big(ctx, 'NOW WHERE WERE WE?', 640, 380, 54, lt, .1, '#ffd23a');
  });
  mood(186, 'danger');
  S(186, (ctx, lt, dur, t, R) => {   // but if salt keeps armies fed… what happens when you take it away?
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 640, 470); TS.saltville(ctx, t, { v: 'dusk' }); ctx.restore(); ctx.save(); ctx.fillStyle = 'rgba(20,10,20,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    if (lt > R(187)) EP.big(ctx, '…TAKE IT AWAY?', 640, 160, 60, lt, R(187), '#ff6a4a');
  });

  // ===================== BEAT 6 — the twist: that "salary" thing =====================
  mood(188, 'curious'); fx(188, 'paper', .5);
  S(188, (ctx, lt, dur, t, R) => {   // first, a promise I made: the salary thing. Roman soldiers were paid in salt, and that's where "salary" comes from. Half of that is true.
    TS.camp(ctx, t); const k = ease.out(clamp(lt / .7)), x = lerp(1110, 640, k), y = lerp(150, 330, k), sc = lerp(.55, 1.2, k);
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.translate(-x, -y); EP.quote(ctx, lt + 9, 0, 'Roman soldiers were paid in salt\n→ that’s where “salary” comes from!', x, y, { size: 26, w: 520 }); ctx.restore();
    if (lt > R(193)) { K.tag(ctx, 'the WORD: true', 380, 560, lt, R(193) + .3, { size: 30, fill: '#d8f0c8' }); K.tag(ctx, 'the PAY: …?', 900, 560, lt, R(193) + .8, { size: 30, fill: '#ffd8d0' }); }
  });
  S(194, (ctx, lt, dur, t, R) => {   // the word is real: Latin salarium comes from sal, salt. Even Pliny the Elder, in his Natural History (1st century AD), linked salarium to salt and old military honors
    EP.board(ctx, 13, ['camp', 'via', 'carthage']);
    const k = K.pop(lt, .2, .4); if (k > 0) { ctx.save(); ctx.translate(640, 250); ctx.scale(k, k); EK.txt(ctx, 'SAL', -250, 0, '80px "Luckiest Guy"', '#2a5aa8'); EK.txt(ctx, '→', -110, 0, '60px "Luckiest Guy"', '#3a2618'); EK.txt(ctx, 'SALARIUM', 130, 0, '80px "Luckiest Guy"', '#c8322a');
      EK.txt(ctx, 'salt', -250, 60, '700 24px Fredoka', '#3a2618'); EK.txt(ctx, 'salt-money / allowance', 130, 60, '700 24px Fredoka', '#3a2618'); ctx.restore(); }
    if (lt > R(196)) { fig(ctx, 'pliny', 380, 690, .62, { t, pose: 'present', turn: .3, face: { mouth: 'smile', brows: 'up' } }); EK.nameCard(ctx, lt, R(196, 5), 'PLINY THE ELDER', 'Natural History · 1st century AD', 860, 470, { icon: 'brush', w: 440 }); }
    if (lt > R(197)) K.tag(ctx, 'salt + old military honors', 860, 600, lt, R(197), { size: 26 });
  });
  fx(198, 'clink', .5, 1.6);
  S(198, (ctx, lt, dur, t, R) => {   // but Roman soldiers were not handed bags of salt on payday. They were paid in coins — read their pay in the records. Salarium: many historians think it had become a general allowance long before "paycheck"
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 470); TS.camp(ctx, t);
    fig(ctx, 'pliny', 520, 760, .82, { t, pose: 'present', prop: 'coins', turn: .3, outfit: 'toga', face: { mouth: 'smile', brows: 'up' } }); fig(ctx, 'legion', 860, 760, .82, { t, pose: lt > R(199) ? 'thumbsUp' : 'idle', turn: -.3, face: { mouth: lt > R(199) ? 'grin' : 'flat', eyes: lt > R(199) ? 'happy' : 'open' } }); ctx.restore();
    if (lt < R(199)) { const k = K.pop(lt, .4, .4); if (k > 0) { TS.sack(ctx, 860, 520, .9 * k, '#e8dcbc', 'SAL'); K.cross(ctx, 860, 470, 1.6, lt, .9); } }
    if (lt > R(199)) K.tag(ctx, 'paid in coins', 640, 130, lt, R(199), { size: 32, fill: '#fff3c8' }); if (lt > R(200)) K.tag(ctx, 'pay records survive', 640, 200, lt, R(200), { size: 26 });
    if (lt > R(202)) EP.card(ctx, 'salarium → a general allowance\nfor expenses (many historians)', 640, 600, lt, R(202), { size: 24 });
  });
  fx(205, 'stamp', .8, .3);
  S(204, (ctx, lt, dur, t, R) => {   // so "salary comes from salt" is about right for the word; "soldiers were paid in salt" is a myth
    EP.board(ctx, 14, ['camp', 'via', 'hallstatt']);
    EP.card(ctx, '“salary” comes from salt\n✓ about right (the word)', 640, 270, lt, .2, { size: 28, fill: '#e2f4d8' });
    if (lt > R(205)) EP.card(ctx, '“soldiers were paid in salt”\n✗ MYTH', 640, 470, lt, R(205), { size: 28, fill: '#ffd8d0' });
    EP.busted(ctx, lt, R(205) + .5, 1, 640, 620);
  });
  // ---------- the salted-Carthage myth ----------
  S(206, (ctx, lt, dur, t, R) => {   // another famous Roman one: when Rome destroyed Carthage in 146 BC, they supposedly plowed the fields with salt so nothing would ever grow there again
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 480); TS.carthage(ctx, t);
    const u = clamp((lt - R(208)) / 4); FA.horse(ctx, lerp(200, 700, u) + 140, 600, .6, t, { dir: 1, coat: '#7a6a5a' }); ln(ctx, [[lerp(200, 700, u), 610], [lerp(200, 700, u) + 90, 560]], 6, '#5a3a22');
    fig(ctx, 'legion', lerp(200, 700, u) - 60, 640, .45, t, { walk: lt > R(208) ? t * 6 : null, turn: .7, prop: 'saltSack' });
    if (lt > R(208)) for (let i = 0; i < 14; i++) { const x = lerp(200, 700, u) - 80 - i * 22; if (x > 80) { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(x, 660 + (i % 3) * 8, 5, 5); } }
    ctx.restore(); EP.dateTag(ctx, 'Carthage · 146 BC');
    if (lt > R(208, 4)) K.tag(ctx, 'supposedly: salted fields', 900, 150, lt, R(208, 4), { size: 30 });
  });
  fx(209, 'buzz', .4, .2);
  S(209, (ctx, lt, dur, t, R) => {   // they didn't — or at least no ancient writer says so. In 1986 the historian R. T. Ridley went looking in the ancient sources… and came up empty
    EP.board(ctx, 15, ['carthage', 'camp', 'via']);
    EP.big(ctx, 'THEY DIDN’T', 640, 200, 70, lt, .1, '#ff6a4a'); if (lt > R(210)) K.tag(ctx, 'no ancient writer says so', 640, 280, lt, R(210), { size: 30 });
    if (lt > R(211)) { const k = K.pop(lt, R(211), .4); if (k > 0) { ctx.save(); ctx.translate(640, 470); ctx.scale(k, k); sh(ctx, '#7a3a2a', 4, c => c.rect(-130, -90, 260, 180)); sh(ctx, '#e8d8b0', 3, c => c.rect(-110, -70, 220, 70)); EK.txt(ctx, 'R. T. Ridley · 1986', 0, -46, '700 22px Fredoka', '#3a2618'); EK.txt(ctx, '“To be taken with', 0, 30, '700 20px serif', '#f2e6cc'); EK.txt(ctx, 'a pinch of salt”', 0, 58, '700 20px serif', '#f2e6cc'); ctx.restore(); } }
    if (lt > R(212)) K.tag(ctx, 'came up empty', 640, 620, lt, R(212), { size: 30, fill: '#fff3c8' });
  });
  mood(213, 'somber');
  S(213, (ctx, lt, dur, t, R) => {   // the destruction was real and horrific: the city burned, and survivors were killed or enslaved
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 400); TS.carthage(ctx, t); ctx.restore(); ctx.save(); ctx.fillStyle = 'rgba(40,20,10,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    if (lt > R(214)) for (const x of [580, 1040, 180]) P2fire(ctx, x, 380, t);
    if (lt > .4) K.tag(ctx, 'the destruction was real', 640, 140, lt, .4, { size: 30 }); if (lt > R(215)) K.tag(ctx, 'survivors killed or enslaved', 640, 600, lt, R(215), { size: 28 });
  });
  const P2fire = (ctx, x, y, t) => G.Paint2.fire(ctx, x, y, .7, t + x);
  mood(216, 'curious');
  S(216, (ctx, lt, dur, t, R) => {   // the salt detail shows up in modern books — often traced to a 1930 Cambridge history; others find versions from the 1800s and link it to a medieval pope's boast about salting a town
    EP.board(ctx, 16, ['carthage', 'camp', 'grenier']);
    [['1930', 'Cambridge Ancient History', R(217)], ['1800s', 'earlier versions', R(218)], ['Middle Ages', 'a pope’s boast about salting a town', R(219)]].forEach(([a, b, at], i) => { if (lt > at - .1) EP.card(ctx, a + '\n' + b, 640, 200 + i * 150, lt, at, { size: 26, fill: i === 0 ? '#ffe2a8' : undefined }); });
    if (lt < R(217)) K.tag(ctx, 'where did the salt come from?', 640, 380, lt, .3, { size: 30 });
  });
  fx(221, 'stamp', .8, 1.2);
  S(220, (ctx, lt, dur, t, R) => {   // and Rome later built a new colony right on the spot — strange to salt the dirt you're going to farm
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.carthage(ctx, t, { v: 'colony' });
    fig(ctx, 'legion', 400, 760, .8, { t, pose: 'shrug', turn: .3, prop: 'none', outfit: 'toga', hat: 'none', face: { mouth: 'smirk', brows: 'skeptic' } }); ctx.restore();
    EP.dateTag(ctx, 'Roman Carthage · rebuilt'); if (lt > R(221)) K.tag(ctx, 'salt your own farmland?', 900, 200, lt, R(221), { size: 28 });
    EP.busted(ctx, lt, R(221) + 1.2, 2, 900, 120);
  });
})(window);
