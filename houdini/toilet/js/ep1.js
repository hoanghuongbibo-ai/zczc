/* "Where Does It Go?" — BEAT 3 (Mohenjo-daro: the first plumbing city, the pots, "Buddy.", refrain #2)
 * + BEAT 4a (Rome: Cloaca Maxima, foricae, the bench skit, the sponge on a stick, pessoi, refrain #3)
 * + BEAT 4b (the fall: back to the bucket, garderobe, "Still no, Tom") + BEAT 5 (sponsor bridge recap). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TS = G.TS, EF = G.EF, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, theo, sit, push, cover, card, refrain, label, LIGHT } = EP;
  const say = Gd.say, L = n => TV['L' + n];
  const tick = (ctx, s, x, y, lt, t0, ok = true) => { K.tag(ctx, s, x, y, lt, t0, { size: 28 }); if (lt > t0 + .4) (ok ? K.tick : K.cross)(ctx, x + (ctx.measureText ? 0 : 0) - 0, y - 60, 1, lt, t0 + .4); };

  // ===================== BEAT 3 — Mohenjo-daro =====================
  mood(62, 'adventure');
  fx(64, 'pop', .4, .2); fx(66, 'stamp', .6, .4);
  S(62, (ctx, lt, dur, t, R) => {   // fast forward ~2500 BC: the Indus valley (Pakistan + NW India); Mohenjo-daro — obsessed with drainage
    const u = ease.inOut(clamp(lt / 4)), v = { lon: lerp(70, 68.6, u), lat: lerp(25, 27.3, u), z: lerp(.5, 1.05, u) };
    TS.map(ctx, t, 'southasia', v); TS.pin(ctx, 'southasia', v, 68.14, 27.33, 'Mohenjo-daro', clamp((lt - R(64) + .3) / .4));
    EP.dateTag(ctx, 'Indus Valley · c. 2500 BC');
    if (lt > R(64)) EK.nameCard(ctx, lt, R(64) + .3, 'MOHENJO-DARO', 'mo-HEN-jo DAH-ro · in Sindh, Pakistan', 330, 620, { icon: 'brush', w: 480 });
    if (lt > R(65)) K.tag(ctx, 'one of the biggest cities on Earth', 900, 140, lt, R(65), { size: 26 });
    if (lt > R(66)) label(ctx, lt, R(66) + .2, 'OBSESSED WITH DRAINAGE', 900, 230);
    TS.globeOver(ctx, t, lt, 68.14, 27.33);
  });
  S(67, (ctx, lt, dur, t, R) => {   // a private bathing area in almost every house; house drains → covered brick street drains, big enough to climb in
    ctx.save(); cover(ctx, lt, [[0, 1.15, 600, 420], [R(68), 1.0, 640, 400], [R(69), 1.35, 900, 560]]); TS.mohenjo(ctx, t);
    fig(ctx, 'indus2', 300, 600, .62, { t, pose: 'present', turn: .3, face: { mouth: 'smile' } });
    if (lt > R(69)) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 576); ctx.clip(); fig(ctx, 'indus1', 900, 576 + 260 * .62 * (1 - ease.out(clamp((lt - R(69)) / .8))) + 150, .62, { t, pose: 'pointUp', turn: -.2, face: { mouth: 'grin', brows: 'up' } }); ctx.restore(); }
    ctx.restore();
    if (lt < R(68) + .5) K.tag(ctx, 'a private bathing area', 595, 250, lt, .4, { size: 26 });
    if (lt > R(68)) { K.tag(ctx, 'house drain', 300, 470, lt, R(68), { size: 24 }); K.tag(ctx, 'covered brick street drain', 640, 690, lt, R(68) + .7, { size: 24 }); }
    if (lt > R(69)) K.tag(ctx, 'big enough to climb in', 980, 200, lt, R(69) + .4, { size: 26 });
    if (lt > R(70)) label(ctx, lt, R(70) + .3, 'A CITY SEWER — 4,500 YEARS AGO', 640, 110);
  });
  S(71, (ctx, lt, dur, t, R) => {   // toilets? the honest version: a couple of brick toilets; but (Kenoyer) most people used old pots set into the ground
    EK.board(ctx, 4);
    theo(ctx, 210, 760, .9, { t, outfit: 'explorer', hat: 'pith', pose: lt < R(73) ? 'think' : 'present', turn: .35, vis: say(t), face: { mouth: 'smile', brows: lt < R(72) ? 'skeptic' : 'up', look: [.6, -.1] } });
    if (lt > R(73)) { const k = K.pop(lt, R(73), .4); ctx.save(); ctx.translate(640, 300); ctx.scale(k, k); TS.bricks(ctx, -130, -60, 260, 120, { c: '#c47a4a', bw: 40, bh: 16, seed: 2 }); sh(ctx, null, 4, c => c.rect(-130, -60, 260, 120));
      sh(ctx, '#1e140c', 3, c => c.ellipse(0, -60, 40, 14, 0, 0, TAU)); ln(ctx, [[0, 60], [140, 90]], 12, '#7a8a78'); ctx.restore(); K.tag(ctx, 'brick toilet + drain (a couple)', 640, 420, lt, R(73) + .3, { size: 24 }); }
    if (lt > R(74)) EK.nameCard(ctx, lt, R(74), 'JONATHAN MARK KENOYER', 'Indus archaeologist', 960, 120, { icon: 'brush', w: 470 });
    if (lt > R(75)) { for (let i = 0; i < 3; i++) { const k = K.pop(lt, R(75) + i * .25, .4); if (k <= 0) continue; ctx.save(); ctx.translate(840 + i * 150, 560); ctx.scale(k, k); sh(ctx, '#8a6a4a', 3, c => c.ellipse(0, 40, 90, 22, 0, 0, TAU)); G.potFace(ctx, 0, 0, .9, 'plain'); ctx.restore(); }
      K.tag(ctx, 'most people: old pots set into the ground', 990, 670, lt, R(75) + .6, { size: 24 }); }
  });
  fx(79, 'boing', .5, .1);
  S(76, (ctx, lt, dur, t, R) => {   // early excavators mistook them for burial urns — "A sacred funerary vessel." POT: "Buddy."
    const down = ease.inOut(clamp((lt - (R(79) + .6)) / 1.4));
    TS.mohenjo(ctx, t, { worker: false }); ctx.fillStyle = 'rgba(30,20,10,.25)'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 380], [R(78), 1.5, 640, 330]]);
    fig(ctx, 'excavator', 560, 760, .95, { t, prop: null, pose: { L: [-68, -158], R: [lerp(150, 150, down), lerp(-360, -180, down)], hL: 'rest', hR: 'hold' }, turn: .3, vis: lt > R(78) - .1 && lt < R(79) ? say(t) : null,
      face: { mouth: lt > R(79) ? 'flat' : 'smile', eyes: lt > R(79) ? 'half' : 'open', brows: lt > R(79) ? 'neutral' : 'up', look: [.8, -.4] } });
    EP.mark(ctx, 'exc', 560, 760, .95);
    const px = 720 + 0, py = lerp(320, 500, down); G.potFace(ctx, px, py, 1.1, lt > R(79) - .1 ? 'flat' : 'face', lt > R(79) && lt < R(79) + .6 ? Math.abs(Math.sin(lt * 16)) : 0);
    EP.mark(ctx, 'pot', px, py + 260 * .45, .45, 300, 380); ctx.restore();
    EP.speech(ctx, 'exc', '"A sacred funerary vessel."', L(78), L(79), t); EP.speech(ctx, 'pot', '"Buddy."', L(79), L(80), t);
    if (lt < R(78)) K.tag(ctx, 'mistaken for burial urns', 640, 120, lt, .3, { size: 28 });
  });
  fx(83, 'stamp', .7, .4);
  S(80, (ctx, lt, dur, t, R) => {   // not flushing porcelain thrones. What they nailed: the pipe. House → drain → away.
    EK.board(ctx, 5);
    if (lt < R(81) + .4) { const k = K.pop(lt, .2, .4); ctx.save(); ctx.translate(640, 330); ctx.scale(k * 1.1, k * 1.1); TS.toilet(ctx, 0, 140, .7); ctx.restore(); if (lt > .8) K.cross(ctx, 640, 330, 2.4, lt, .8); K.tag(ctx, 'no porcelain thrones', 640, 560, lt, .5, { size: 28 }); }
    else { const steps = [['house', R(82)], ['drain', R(82) + .9], ['AWAY from people', R(82) + 1.8]]; steps.forEach(([s2, a], i) => { if (lt > a) EP.card(ctx, s2, 260 + i * 380, 320, lt, a, { size: 32 }); if (i && lt > a) { const k = clamp((lt - a) / .4); ln(ctx, [[260 + (i - 1) * 380 + 110, 320], [260 + (i - 1) * 380 + 110 + k * 160, 320]], 10, '#7ac0e0'); } });
      FX.bigText(ctx, 'THE PIPE', 640, 140, 80 * K.pop(lt, R(81) + .4, .4), { fill: '#7ac0e0' }); }
    if (lt > R(83)) refrain(ctx, lt, R(83), 2);
  });

  // ===================== BEAT 4a — Rome =====================
  mood(84, 'comic');
  S(84, (ctx, lt, dur, t, R) => {   // next up: Rome. The Romans love infrastructure.
    const u = ease.inOut(clamp(lt / 2.6)), v = { lon: lerp(15, 12.5, u), lat: lerp(38, 41.9, u), z: lerp(.55, 1.4, u) };
    TS.map(ctx, t, 'med', v); TS.pin(ctx, 'med', v, 12.48, 41.89, 'ROME', clamp((lt - .6) / .4)); EP.dateTag(ctx, 'Roman Empire');
    if (lt > R(86)) K.tag(ctx, 'the Romans ♥ infrastructure', 640, 640, lt, R(86), { size: 30 });
    TS.globeOver(ctx, t, lt, 12.48, 41.89, { D: 2.2 });
  });
  S(87, (ctx, lt, dur, t, R) => {   // aqueducts bring water in; the Cloaca Maxima — "the Greatest Sewer" — carries water out toward the Tiber
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 450, 450); TS.rome(ctx, t); ctx.restore();
    K.tag(ctx, 'aqueduct: water IN', 640, 110, lt, .3, { size: 26 });
    if (lt > (L(87) + 2.3 - L(87))) EK.nameCard(ctx, lt, 2.3, 'CLOACA MAXIMA', '"the Greatest Sewer"', 330, 620, { icon: 'brush', w: 420 });
    if (lt > R(88)) K.tag(ctx, '→ water OUT to the Tiber', 820, 560, lt, R(88), { size: 26 });
  });
  S(89, (ctx, lt, dur, t, R) => {   // public toilets: foricae. A long stone bench, a row of holes, no stalls, shoulder to shoulder
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.forica(ctx, t);
    if (lt > R(92)) { sit(ctx, 'marcus', 540, 440, .78, { t, turn: .5, face: { mouth: 'grin', look: [.8, 0] } }); sit(ctx, 'roman2', 770, 440, .78, { t, turn: -.4, face: { mouth: 'grit', brows: 'worried', look: [-.4, 0] } }); }
    ctx.restore(); EK.nameCard(ctx, lt, .3, 'FORICAE', 'Roman public toilets', 300, 110, { icon: 'brush', w: 400 });
    if (lt > R(90)) K.tag(ctx, 'a long bench, a row of holes', 900, 200, lt, R(90), { size: 26 });
    if (lt > R(91)) { K.tag(ctx, 'no stalls', 820, 270, lt, R(91), { size: 26 }); K.tag(ctx, 'no dividers', 1060, 300, lt, R(91) + .6, { size: 26 }); }
  });
  S(93, (ctx, lt, dur, t, R) => {   // SKIT — ROMAN 1: "So how's the family?"  ROMAN 2: "Marcus, I'm begging you, not now."
    ctx.save(); cover(ctx, lt, [[0, 1.45, 520, 330], [R(94) - .1, 1.45, 760, 330]]); TS.forica(ctx, t);
    sit(ctx, 'marcus', 540, 440, .78, { t, turn: .5, vis: lt < R(94) ? say(t) : null, face: { mouth: 'grin', brows: 'up', look: [.8, 0] } }); EP.mark(ctx, 'marcus', 540, 440 + 130 * .78, .78);
    sit(ctx, 'roman2', 770, 440, .78, { t, turn: -.4, vis: lt > R(94) - .1 ? say(t) : null, face: { mouth: 'grit', brows: 'worried', eyes: lt > R(94) ? 'closed' : 'open', sweat: true, look: [-.2, .3] } }); EP.mark(ctx, 'roman2', 770, 440 + 130 * .78, .78);
    ctx.restore(); EP.speech(ctx, 'marcus', '"So how\'s the family?"', L(93), L(94), t); EP.speech(ctx, 'roman2', '"Marcus, I\'m begging you, not now."', L(94), L(96), t);
  });
  S(96, (ctx, lt, dur, t, R) => {   // the sponge on a stick: tersorium / xylospongium — a sea sponge on a stick, rinsed in water or vinegar
    EK.board(ctx, 6); const k = K.pop(lt, .2, .5); ctx.save(); ctx.translate(640, 520); ctx.scale(1.6 * k, 1.6 * k); ctx.rotate(-.25); G.Guide.PROPS.sponge.over(ctx, { wr: [0, 0] }); ctx.restore();
    if (lt > R(97)) EK.nameCard(ctx, lt, R(97), 'TERSORIUM · XYLOSPONGIUM', 'zy-lo-SPON-gee-um', 640, 110, { icon: 'brush', w: 560 });
    if (lt > R(98)) K.tag(ctx, 'a sea sponge on a stick', 980, 380, lt, R(98), { size: 26 }); if (lt > R(99)) K.tag(ctx, 'rinsed in water or vinegar', 980, 450, lt, R(99), { size: 26 });
    K.tag(ctx, 'replica', 330, 640, lt, .8, { size: 22, fill: '#f6c945' });
  });
  fx(108, 'pop', .4); fx(109, 'pop', .4);
  S(100, (ctx, lt, dur, t, R) => {   // "please tell me they didn't share it" — honest answer: historians aren't sure. Wipe? Or toilet brush? (Jennifer Bates)
    TS.forica(ctx, t); ctx.fillStyle = 'rgba(40,20,10,.3)'; ctx.fillRect(0, 0, W, H);
    theo(ctx, 260, 760, .95, { t, outfit: 'toga', hat: 'laurel', pose: lt < R(102) ? 'facepalm' : lt < R(104) ? 'present' : 'shrug', turn: .35, vis: say(t), face: { mouth: lt < R(102) ? 'grit' : 'smile', eyes: lt < R(102) ? 'squint' : 'open', brows: lt < R(102) ? 'worried' : 'up', sweat: lt < R(102), look: [.6, -.1] } });
    if (lt > R(101) && lt < R(103)) K.tag(ctx, '"…they didn\'t SHARE it?"', 820, 160, lt, R(101), { size: 30 });
    if (lt > R(103)) K.tag(ctx, 'historians aren\'t sure what it was for', 800, 120, lt, R(103), { size: 26 });
    if (lt > R(104)) EP.card(ctx, 'traditional view:\nfor wiping yourself', 700, 300, lt, R(104), { size: 26 });
    if (lt > R(105)) EP.card(ctx, 'newer research:\na toilet brush', 1040, 300, lt, R(105), { size: 26, rot: .02 });
    if (lt > R(107)) EK.nameCard(ctx, lt, R(107), 'JENNIFER BATES', 'archaeologist', 880, 470, { icon: 'brush', w: 380 });
    if (lt > R(108)) EP.card(ctx, 'clean yourself… or the toilet?', 880, 600, lt, R(108), { size: 28, fill: '#fff3c8' });
    if (lt > R(110) - 1.2) label(ctx, lt, R(110) - 1.2, 'DEBATED', 1100, 200);
  });
  S(110, (ctx, lt, dur, t, R) => {   // what we do know: pessoi — little ceramic discs in Roman-era latrines, likely for wiping. Which sounds worse. Let's move on.
    EK.board(ctx, 7);
    for (let i = 0; i < 5; i++) { const k = K.pop(lt, R(111) + i * .15, .4); if (k <= 0) continue; ctx.save(); ctx.translate(380 + i * 130, 340 + (i % 2) * 30); ctx.scale(k, k); sh(ctx, '#c47a48', 4, circ(0, 0, 46)); sh(ctx, 'rgba(255,220,180,.35)', 0, circ(-10, -12, 16)); ctx.restore(); }
    if (lt > R(111)) EK.nameCard(ctx, lt, R(111), 'PESSOI', 'ceramic discs from Roman latrines', 640, 120, { icon: 'brush', w: 480 });
    if (lt > R(112)) K.tag(ctx, 'likely used for wiping', 640, 470, lt, R(112), { size: 28 });
    theo(ctx, 1080, 760, .8, { t, outfit: 'toga', hat: 'laurel', pose: lt > R(114) ? 'pointSide' : 'facepalm', turn: -.3, vis: say(t), face: { mouth: 'grit', eyes: 'squint', brows: 'worried', sweat: true } });
    if (lt > R(113)) K.tag(ctx, 'which sounds worse', 1000, 300, lt, R(113), { size: 26 });
  });
  S(115, (ctx, lt, dur, t, R) => {   // Rome had the pipes, not the germs: shared benches, shared water, no handwashing science. Plumbing brilliant, understanding zero.
    EK.board(ctx, 8);
    EP.card(ctx, 'PIPES', 380, 220, lt, .2, { size: 50 }); if (lt > .7) K.tick(ctx, 380, 330, 2, lt, .7);
    if (lt > R(116)) { EP.card(ctx, 'GERMS?', 900, 220, lt, R(116), { size: 50 }); if (lt > R(116) + 1) K.cross(ctx, 900, 330, 2, lt, R(116) + 1); }
    if (lt > R(117)) ['shared benches', 'shared water', 'no handwashing science'].forEach((s2, i) => K.tag(ctx, s2, 300 + i * 340, 480, lt, R(117) + i * .5, { size: 26 }));
    if (lt > R(118)) K.tag(ctx, 'plumbing: brilliant', 400, 600, lt, R(118), { size: 32, fill: '#cfe8c0' }); if (lt > R(119)) K.tag(ctx, 'understanding: zero', 880, 600, lt, R(119), { size: 32, fill: '#f6c4b8' });
  });
  fx(120, 'stamp', .7, .4); fx(122, 'splash', .5);
  S(120, (ctx, lt, dur, t, R) => {   // it still has to go somewhere — in Rome's case: straight into the river  → refrain #3
    ctx.save(); push(ctx, lt, dur, 1.15, 1.3, 450, 470); TS.rome(ctx, t); ctx.restore();
    refrain(ctx, lt, .2, 3, { y: 130 }); if (lt > R(122)) K.tag(ctx, 'straight into the river', 640, 640, lt, R(122), { size: 32 });
  });

  // ===================== BEAT 4b — the fall: back to the bucket =====================
  mood(123, 'curious');
  const KINGDOMS = [['VISIGOTHS', -4, 40.5, 6, 3.2, '#c8823a'], ['FRANKS', 2, 47.5, 4, 2, '#5a8ac8'], ['VANDALS', 8, 34.5, 5, 2, '#c84a4a'], ['ODOACER', 12.5, 43, 3, 3, '#8a5ac8'], ['EASTERN EMPIRE', 27, 39.5, 8, 4, '#c8a83a']];
  S(123, (ctx, lt, dur, t, R) => {   // the Western Roman Empire falls apart in the 400s AD; big public systems fade across much of Western Europe
    const v = { lon: 12, lat: 39.5, z: .7 }; TS.map(ctx, t, 'med', v); EP.dateTag(ctx, 'AD 476');
    KINGDOMS.forEach(([s2, lo, la, rw, rh, col], i) => { const k = clamp((lt - .4 - i * .35) / .5); if (k <= 0) return; const [x, y] = TS.mapPt('med', v, lo, la), sc = 1600 / 53 * v.z;
      ctx.save(); ctx.globalAlpha = .38 * k; ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, rw * sc, rh * sc * 1.12, 0, 0, TAU); ctx.fill(); ctx.restore(); TS.txt(ctx, s2, x, y, '22px "Luckiest Guy"', '#3a2618'); });
    if (lt > R(124)) K.tag(ctx, 'big systems need a big government', 640, 650, lt, R(124), { size: 28 });
  });
  fx(128, 'splash', .4, .8);
  S(125, (ctx, lt, dur, t, R) => {   // for centuries: chamber pots, privies over pits, cesspits under houses
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.medieval(ctx, t, { pour: clamp((lt - R(128) - .2) / .6), stink: lt > R(130) ? .7 : 0 }); ctx.restore();
    if (lt > R(128)) K.tag(ctx, 'chamber pots', 520, 130, lt, R(128), { size: 28 }); if (lt > R(129)) K.tag(ctx, 'privies over pits', 1180, 340, lt, R(129), { size: 26 }); if (lt > R(130)) K.tag(ctx, 'cesspits under houses', 270, 570, lt, R(130), { size: 26 });
    EP.dateTag(ctx, 'Western Europe · c. 500–1500');
  });
  S(131, (ctx, lt, dur, t, R) => {   // castles get the garderobe: a small room jutting out of the wall, a hole that drops… outside (a moat you don't want to swim in)
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [R(132), 1.4, 625, 300], [R(133), 1.15, 625, 470]]); TS.castle(ctx, t, { stink: lt > R(133) ? 1 : 0 }); ctx.restore();
    EK.nameCard(ctx, lt, .2, 'GARDEROBE', 'the castle toilet', 320, 110, { icon: 'brush', w: 380 });
    if (lt > R(133)) K.tag(ctx, '…outside.', 900, 620, lt, R(133), { size: 34 });
  });
  S(134, (ctx, lt, dur, t, R) => {   // no advance for a thousand years — it went backwards. Nobody had a city-sized plan for where it should go.
    EK.board(ctx, 9); const pts = [[180, 520, 'Skara Brae'], [380, 330, 'Indus'], [600, 240, 'Rome'], [760, 470, 'AD 476'], [1100, 500, 'c. 1500']], k = clamp(lt / 3);
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); const n = pts.length - 1, upto = k * n;
    for (let i = 0; i <= Math.floor(upto); i++) ctx[i ? 'lineTo' : 'moveTo'](pts[i][0], pts[i][1]); if (upto < n) { const i = Math.floor(upto), f = upto - i; ctx.lineTo(lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)); }
    ctx.lineWidth = 14; ctx.strokeStyle = '#c8322a'; ctx.stroke(); ctx.restore();
    pts.forEach(([x, y, s2], i) => { if (k * n >= i) K.tag(ctx, s2, x, y + 50, lt, i * 3 / n, { size: 22 }); });
    TS.txt(ctx, 'toilet tech', 120, 140, '700 26px Fredoka', '#6a5040', 'left');
    if (lt > R(135)) label(ctx, lt, R(135), 'BACKWARDS', 900, 200);
    if (lt > R(137)) EP.card(ctx, 'no city-sized plan\nfor where it should go', 640, 630, lt, R(137), { size: 28 });
  });
  fx(138, 'boing', .5); fx(138, 'whoosh', .4, 1.2);
  S(138, (ctx, lt, dur, t, R) => {   // Crapper pops in again — "Still no, Tom."
    TS.medieval(ctx, t); const up = ease.inOut(clamp(lt / .7)) - ease.inOut(clamp((lt - 1.1) / .7));
    theo(ctx, 360, 760, .95, { t, outfit: 'medieval', hat: 'hood', pose: 'pointSide', turn: .35, vis: say(t), face: { mouth: 'flat', eyes: 'half', brows: 'skeptic', look: [.7, -.1] } });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 760); ctx.clip(); fig(ctx, 'crapper', 940 + (1 - up) * 640, 760, .95, { t, walk: up > .01 && up < .99 ? t * 9 : null, pose: lt > .8 ? 'shrug' : 'cheer', turn: -.35, face: { mouth: lt > .8 ? 'frown' : 'grin', eyes: lt > .8 ? 'open' : 'happy', brows: lt > .8 ? 'worried' : 'up' } }); ctx.restore();
  }, -.2);

  // ===================== BEAT 5 — sponsor bridge (no sponsor read in the recording): the recap =====================
  mood(139, 'busy');
  S(139, (ctx, lt, dur, t, R) => {   // now, where were we? Indus built the pipes, Rome the sewers + awkward benches, medieval Europe back to the bucket. Enter: a queen's troublemaking godson.
    EK.board(ctx, 2); const items = [[R(141), 'INDUS', 'built the pipes'], [R(142), 'ROME', 'sewers + awkward benches'], [R(143), 'MEDIEVAL EUROPE', 'back to the bucket']];
    items.forEach(([a, h, s2], i) => { if (lt < a) return; const k = K.pop(lt, a, .4); ctx.save(); ctx.translate(250 + i * 390, 330); ctx.scale(k, k); ctx.rotate((i - 1) * .03);
      K.paper(ctx, 0, 0, 340, 230, { draw: c => { EK.txt(c, h, 0, -60, '34px "Luckiest Guy"', '#c8322a'); EK.txt(c, s2, 0, 10, '700 24px Fredoka', '#3a2618'); } }); ctx.restore(); });
    if (lt < R(141)) FX.bigText(ctx, 'NOW, WHERE WERE WE?', 640, 330, 70 * K.pop(lt, .1, .4), { fill: '#ffd23a' });
    if (lt > R(144)) { const k = clamp((lt - R(144)) / .5); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(30,10,10,.6)'; ctx.fillRect(0, 0, W, H); ctx.restore(); FX.bigText(ctx, 'ENTER: the queen\'s troublemaking godson', 640, 600, 46 * K.pop(lt, R(144), .4), { fill: '#fff' }); }
  });
})(window);
