/* "Where Does It Go?" — COLD OPEN (the viewer on the toilet → Skara Brae → the question → Crapper pops in)
 * + BEAT 2 (everyone just went · crowds invent toilets · Skara Brae's wall cells and drains · refrain #1). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TS = G.TS, EF = G.EF, EP = G.EP, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, theo, sit, push, cover, card, refrain, rule, label, LIGHT } = EP;
  const say = Gd.say, PHONE = { L: [-68, -158], R: [44, -262], hL: 'rest', hR: 'hold' };
  const TOILET_X = 640, FLOOR = 700, TS_ = .95, SEAT = FLOOR - 190, VS = (FLOOR - SEAT) / 174;
  // the viewer on the toilet in the bright bathroom (shared by the cold open and the ending)
  EP.viewerScene = (ctx, t, lt, o = {}) => { TS.bathroom(ctx, t); TS.toilet(ctx, TOILET_X, FLOOR, TS_);
    sit(ctx, 'viewer', TOILET_X, SEAT, VS, Object.assign({ t, pose: o.pose || PHONE, turn: o.turn ?? .1, light: LIGHT.room, face: o.face || { mouth: 'smile', eyes: 'half', look: [.3, .5] } }, o.fig || {})); };
  const swirl = (ctx, x, y, r, k, t) => { ctx.save(); ctx.translate(x, y); sh(ctx, '#fbfdfe', 5, circ(0, 0, r + 20)); sh(ctx, '#bfe2f2', 3, circ(0, 0, r));
    for (let i = 0; i < 5; i++) { ctx.beginPath(); for (let a = 0; a < 5; a += .1) { const rr = r * (1 - a / 5) * (1 - k * .3); ctx.lineTo(Math.cos(a + t * 5 + i * 1.26) * rr, Math.sin(a + t * 5 + i * 1.26) * rr); } ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(70,140,190,.7)'; ctx.stroke(); }
    sh(ctx, '#2a4a5a', 0, circ(0, 0, r * .18 * (1 + k))); ctx.restore(); };

  // ===================== COLD OPEN =====================
  mood(1, 'comic');
  S(1, (ctx, lt, dur, t, R) => {   // a decent chance you're watching this on the toilet. No judgment. Statistically…
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 420);
    const startled = lt > R(2) - .2 && lt < R(3);
    EP.viewerScene(ctx, t, lt, { face: startled ? { mouth: 'o', eyes: 'wide', brows: 'up', look: [0, 0] } : lt > R(3) ? { mouth: 'smile', eyes: 'open', brows: 'up', look: [0, 0] } : { mouth: 'smile', eyes: 'half', look: [.3, .5] },
      pose: startled ? Object.assign({}, PHONE, { R: [70, -300] }) : PHONE });
    ctx.restore();
    if (lt > R(3)) { const k = K.pop(lt, R(3) + .3, .4); if (k > 0) { ctx.save(); ctx.translate(1040, 220); ctx.scale(k, k); ctx.rotate(.04);   // the stat card
      K.paper(ctx, 0, 0, 360, 170, { draw: c => { EK.txt(c, 'WHERE HISTORY', 0, -36, '34px "Luckiest Guy"', '#3a2618'); EK.txt(c, 'HAPPENS NOW', 0, 8, '34px "Luckiest Guy"', '#c8322a'); EK.txt(c, '(statistically)', 0, 52, '700 22px Fredoka', '#6a5040'); } }); ctx.restore(); } }
    if (lt > R(2) - .1 && lt < R(3) + .3) K.tag(ctx, 'no judgment', 380, 200, lt, R(2), { size: 30, rot: -.04 });
  });
  fx(4, 'pop', .3); fx(6, 'splash', .7, -.3); fx(6, 'river', .5, -.2, 2.4); fx(7, 'whoosh', .5, .6);
  S(4, (ctx, lt, dur, t, R) => {   // here's the weird part: press the handle, the water swirls, everything just… leaves
    const press = clamp((lt - (R(5) + .6)) / .3) * (1 - clamp((lt - (R(5) + 1.4)) / .4));
    ctx.save(); cover(ctx, lt, [[0, 1.5, 640, 330]]); EP.viewerScene(ctx, t, lt, { pose: { L: [-68, -158], R: [120, -330 + press * 18], hL: 'rest', hR: 'point' }, turn: .4, face: { mouth: 'flat', eyes: 'open', look: [.6, .2] } }); ctx.restore();
    if (lt > R(6) - .3) { const k = K.pop(lt, R(6) - .3, .4), dk = clamp((lt - R(8)) / 1); ctx.save(); ctx.translate(1010, 470); ctx.scale(k, k); swirl(ctx, 0, 0, 150, dk, t); ctx.restore();
      K.tag(ctx, 'swirl…', 1010, 680, lt, R(6), { size: 26 }); }
    if (lt > R(8)) K.tag(ctx, '…gone.', 640, 120, lt, R(8), { size: 40, rot: -.03 });
  });
  S(9, (ctx, lt, dur, t, R) => {   // you don't think about where. You've never had to. (the floor slides away: a pipe going down into "?")
    const k = ease.inOut(clamp(lt / 1.2)); ctx.save(); ctx.translate(0, -k * 300); EP.viewerScene(ctx, t, lt, { face: { mouth: 'smile', eyes: 'half', look: [.3, .5] } });
    ctx.fillStyle = '#5a4a3a'; ctx.fillRect(0, H, W, 400); sh(ctx, '#d8dee2', 4, c => c.rect(610, 700, 60, 360)); for (let i = 0; i < 6; i++) { const y = 720 + ((t * 120 + i * 60) % 340); ctx.fillStyle = 'rgba(120,170,200,.5)'; ctx.fillRect(620, y, 40, 12); }
    ctx.restore(); if (k > .6) { FX.bigText(ctx, '?', 640, 600, 220 * K.pop(lt, 1.0, .5), { fill: '#ffd23a' }); }
  });
  fx(11, 'whoosh', .6, -.2); fx(11, 'wind', .5, 0, 6);
  mood(11, 'curious');
  S(11, (ctx, lt, dur, t, R) => {   // hard cut: an island off the top of Scotland, ~5,000 years ago; a little stone village
    ctx.save(); push(ctx, lt, dur, 1.12, 1.0, 700, 560); TS.orkney(ctx, t, lt * 10); ctx.restore();
    EP.dateTag(ctx, 'ORKNEY · c. 3100 BC'); if (lt > R(12)) K.tag(ctx, 'a little stone village', 700, 420, lt, R(12), { size: 26 });
  });
  fx(16, 'pop', .4, .1);
  S(13, (ctx, lt, dur, t, R) => {   // inside the houses, built into the walls: small cells… and under some of them? Drains.
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [R(14), 1.35, 1060, 420]]); TS.skara(ctx, t, { drain: clamp((lt - R(16)) / .6) }); ctx.restore();
    if (lt > R(14)) K.tag(ctx, 'a small cell in the wall', 900, 160, lt, R(14), { size: 26 });
    if (lt > R(16)) FX.bigText(ctx, 'DRAINS', 640, 120, 90 * K.pop(lt, R(16), .4), { fill: '#7ac0e0' });
    EP.dateTag(ctx, 'Skara Brae, Orkney · c. 3100–2500 BC');
  });
  S(17, (ctx, lt, dur, t, R) => {   // archaeologists think these may have been toilets. Indoor toilets. Older than the Great Pyramid.
    ctx.save(); push(ctx, lt, dur, 1.25, 1.35, 1080, 460); TS.skara(ctx, t, { drain: 1 }); ctx.restore();
    label(ctx, lt, .3, 'MAYBE TOILETS?', 640, 110);
    if (lt > R(18)) K.tag(ctx, 'INDOOR toilets', 400, 220, lt, R(18), { size: 32, rot: -.05 });
    if (lt > R(19)) { const k = K.pop(lt, R(19), .4); ctx.save(); ctx.translate(320, 520); ctx.scale(k, k);
      K.paper(ctx, 0, 0, 470, 210, { rot: -.02, draw: c => { EK.txt(c, 'Skara Brae', -110, -50, '700 28px Fredoka', '#3a2618'); EK.txt(c, 'c. 3100 BC', 110, -50, '700 28px Fredoka', '#c8322a');
        G.ES.pyramid(c, -60, 60, 120, { k: 1 }); EK.txt(c, 'Great Pyramid', 90, 20, '700 24px Fredoka', '#3a2618'); EK.txt(c, 'c. 2560 BC', 90, 54, '700 24px Fredoka', '#6a5040'); } }); ctx.restore(); }
  });
  S(20, (ctx, lt, dur, t, R) => {   // Theo: if humans figured out toilet + drain 5,000 years ago… why until the 1800s for a normal house?
    TS.bathroom(ctx, t, { pan: 40 }); TS.toilet(ctx, 980, 700, .7);
    theo(ctx, 360, 760, .95, { t, pose: lt < R(21) ? 'think' : lt < R(22) ? 'present' : 'shrug', turn: .35, vis: say(t), face: { mouth: 'smile', brows: lt > R(22) ? 'up' : 'skeptic', look: [.6, -.1] } });
    if (lt > R(21)) EP.card(ctx, 'toilet + drain', 940, 180, lt, R(21), { size: 34 });
    if (lt > R(21) + .6) K.tag(ctx, '~3000 BC', 940, 250, lt, R(21) + .6, { size: 24 });
    if (lt > R(22)) { const k = clamp((lt - R(22)) / 1.6); ctx.save(); ln(ctx, [[700, 330], [lerp(700, 1200, ease.out(k)), 330]], 8, '#c8322a'); ctx.restore(); K.tag(ctx, 'a normal house: the 1800s', 960, 390, lt, R(22) + 1.4, { size: 26 }); }
  });
  // the answer involves: a queen · a watchmaker · a sponge on a stick · a city that couldn't breathe · Thomas Crapper
  S(23, (ctx, lt, dur, t, R) => { EK.board(ctx, 3);
    const items = [[R(23), 'a queen', 'elizabeth'], [R(24), 'a watchmaker', 'cumming'], [R(25), 'a sponge on a stick', null], [R(26), 'a city that\ncouldn\'t breathe', 'city']];
    items.forEach(([at, s2, who], i) => { const k = K.pop(lt, at, .4); if (k <= 0) return; const x = 210 + i * 285, y = 330; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate((i % 2 ? 1 : -1) * .04);
      K.paper(ctx, 0, 0, 250, 300, { draw: c => { c.save(); c.beginPath(); c.rect(-110, -136, 220, 200); c.clip(); c.fillStyle = '#d8c8a8'; c.fillRect(-110, -136, 220, 200);
        if (who === 'city') { c.fillStyle = '#7a7060'; for (let j = 0; j < 7; j++) c.fillRect(-110 + j * 32, -40 - (j % 3) * 30, 28, 120); c.fillStyle = 'rgba(150,170,60,.6)'; c.fillRect(-110, -136, 220, 200); }
        else if (who) G.VK.fig(c, 0, 230, .5, EP.cast(who, { t, face: { mouth: who === 'elizabeth' ? 'flat' : 'smile', eyes: who === 'elizabeth' ? 'half' : 'open' } }));
        else G.Guide.PROPS.sponge.over(c, { wr: [-14, 60] }); c.restore(); s2.split('\n').forEach((l, j) => EK.txt(c, l, 0, 92 + j * 26 - (s2.includes('\n') ? 10 : 0), '700 24px Fredoka', '#3a2618')); } }); ctx.restore(); });
    if (lt > R(27)) { const k = K.pop(lt, R(27), .35); EK.nameCard(ctx, lt, R(27), 'THOMAS CRAPPER', 'Victorian plumber', 640, 620, { icon: 'brush', w: 440 }); }
    if (lt > R(28) + .6) FX.stamp(ctx, 'DID NOT INVENT THE TOILET', 640, 520, clamp((lt - R(28) - .6) / .3), { color: '#c8322a', size: 40, rot: -.06 });
  });
  fx(27, 'boing', .5, .1); fx(29, 'whoosh', .5, .6);
  S(27, (ctx, lt, dur, t, R) => {   // Crapper pops in grinning — "Not yet, Tom. Get out."
    TS.showroom(ctx, t); const up = ease.out(clamp(lt / .35)) - ease.inOut(clamp((lt - (R(30) + .2)) / .5));
    theo(ctx, 360, 760, .95, { t, pose: lt > R(29) ? 'pointSide' : 'present', turn: .35, vis: say(t), face: { mouth: lt > R(29) ? 'flat' : 'smile', brows: lt > R(29) ? 'skeptic' : 'up', eyes: lt > R(29) ? 'half' : 'open', look: [.7, -.1] } });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 760); ctx.clip(); fig(ctx, 'crapper', 920, 760 + (1 - up) * 560, .95, { t, pose: lt > R(29) ? 'shrug' : 'cheer', turn: -.35, face: { mouth: lt > R(29) ? 'frown' : 'grin', eyes: lt > R(29) ? 'open' : 'happy', brows: lt > R(29) ? 'worried' : 'up' } }); ctx.restore();
    if (lt < R(29)) K.tag(ctx, '"TA-DA!"', 1000, 150, lt, .3, { size: 30 });
  }, -.3);

  // ===================== BEAT 2 — the world before: everyone just… went =====================
  mood(31, 'busy');
  fx(33, 'pop', .4); fx(34, 'pop', .4); fx(35, 'ding', .4);
  S(31, (ctx, lt, dur, t, R) => {   // the honest baseline: the toilet was "outside". Pick a spot. Walk away. Done.
    TS.village(ctx, t, 0); const w = clamp((lt - R(34)) / 2);
    fig(ctx, 'neo1', lerp(520, 1010, ease.inOut(w)), 640, .7, { t, walk: w > 0 && w < 1 ? t * 8 : null, turn: w > 0 && w < 1 ? .7 : .2, face: { mouth: 'smile', look: [.6, 0] } });
    EF.bushMass(ctx, 1000, 670, 260, 130, 77, 1);
    [[R(33), 'PICK A SPOT', 300, 200], [R(34), 'WALK AWAY', 640, 160], [R(35), 'DONE.', 980, 200]].forEach(([a, s2, x, y], i) => { if (lt > a) K.tag(ctx, s2, x, y, lt, a, { size: 34, rot: (i - 1) * .04 }); });
    EP.dateTag(ctx, 'for most of human history');
  });
  S(36, (ctx, lt, dur, t, R) => {   // works great for a small band who keep moving
    TS.village(ctx, t, 0, { pan: lt * 30 }); for (let i = 0; i < 5; i++) fig(ctx, i % 2 ? 'neo2' : 'neo1', ((lt * 90 + i * 150) % 1500) - 200, 640 + (i % 2) * 18, .6, { t: t + i, walk: t * 8 + i, turn: .7 });
    K.tag(ctx, 'keep moving = no problem', 640, 150, lt, .3, { size: 30 });
  });
  S(38, (ctx, lt, dur, t, R) => {   // people stop moving. Farming → villages → neighbours → your spot is now somebody's front yard
    const k = clamp((lt - R(39)) / (R(41) - R(39)));
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 980, 600); TS.village(ctx, t, k); ctx.restore();
    if (lt > R(39)) K.tag(ctx, 'farming → villages', 330, 150, lt, R(39), { size: 28 }); if (lt > R(40)) K.tag(ctx, 'villages → neighbours', 950, 150, lt, R(40), { size: 28 });
    if (lt > R(41)) { fig(ctx, 'neo1', 860, 720, .7, { t, pose: 'shrug', turn: .4, face: { mouth: 'grit', brows: 'worried', eyes: 'wide', sweat: true } });
      fig(ctx, 'neo2', 1110, 720, .7, { t: t + 1, pose: 'hips', turn: -.4, face: { mouth: 'frown', brows: 'angry', look: [-.6, 0] } }); K.tag(ctx, 'his front yard', 1110, 300, lt, R(41) + .6, { size: 26 }); }
  });
  fx(43, 'stamp', .6, .3);
  S(42, (ctx, lt, dur, t, R) => {   // RULE #1 — the toilet isn't invented by smart people. It's invented by crowded people.
    TS.village(ctx, t, 1); ctx.fillStyle = 'rgba(40,30,20,.35)'; ctx.fillRect(0, 0, W, H);
    theo(ctx, 300, 760, .9, { t, outfit: 'medieval', hat: 'hood', pose: lt < R(44) ? 'present' : 'pointUp', turn: .3, vis: say(t), face: { mouth: 'smile', brows: 'up', look: [.6, -.2] } });
    if (lt > R(43)) { K.tag(ctx, 'not smart people…', 820, 200, lt, R(43), { size: 30 }); if (lt > R(43) + .9) K.cross(ctx, 820, 200, 1.6, lt, R(43) + .9); }
    if (lt > R(44)) rule(ctx, lt, R(44), 'Crowds invent toilets.');
  });
  mood(45, 'curious');
  S(45, (ctx, lt, dur, t, R) => {   // back to Skara Brae: a cluster of stone houses on Orkney, c. 3100–2500 BC — older than Stonehenge + the Great Pyramid
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 700, 600); TS.orkney(ctx, t, -lt * 8); ctx.restore();
    EP.dateTag(ctx, 'Skara Brae, Orkney · c. 3100–2500 BC');
    if (lt > R(48)) { const k = K.pop(lt, R(48), .4); ctx.save(); ctx.translate(640, 180); ctx.scale(k, k); K.paper(ctx, 0, 0, 760, 150, { draw: c => {
      const items = [['Skara Brae', '3100 BC', -250], ['Stonehenge', '3000 BC', 0], ['Great Pyramid', '2560 BC', 250]]; items.forEach(([a, b, x], i) => { EK.txt(c, a, x, -22, '700 26px Fredoka', i ? '#3a2618' : '#c8322a'); EK.txt(c, b, x, 20, '700 22px Fredoka', '#6a5040'); }); } }); ctx.restore(); }
  });
  S(49, (ctx, lt, dur, t, R) => {   // beds, a hearth and a stone dresser — all stone, because Orkney has few trees
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 400); TS.skara(ctx, t); ctx.restore();
    [[0, 'stone bed', 220, 330], [.6, 'hearth', 660, 500], [1.2, 'stone dresser', 640, 220]].forEach(([d, s2, x, y]) => { if (lt > R(49) + d) K.tag(ctx, s2, x, y, lt, R(49) + d, { size: 26 }); });
    if (lt > R(50)) EP.card(ctx, 'few trees on Orkney\n→ furniture of stone', 1040, 150, lt, R(50), { size: 26 });
  });
  S(51, (ctx, lt, dur, t, R) => {   // drains under the wall cells; Gordon Childe (1920s) read them as toilets; today: more careful
    ctx.save(); cover(ctx, lt, [[0, 1.3, 1040, 440], [R(52), 1.0, 640, 360]]); TS.skara(ctx, t, { drain: 1 });
    if (lt > R(52)) fig(ctx, 'excavator', 860, 720, .85, { t, pose: lt < R(53) ? 'magnify' : 'pointSide', prop: lt < R(53) ? null : 'pot', turn: .4, face: { mouth: lt > R(53) ? 'grin' : 'o', brows: 'up', look: [.6, -.1] } });
    ctx.restore();
    if (lt > R(52)) EK.nameCard(ctx, lt, R(52), 'V. GORDON CHILDE', 'archaeologist · dug here 1927–30', 330, 110, { icon: 'brush', w: 470 });
    if (lt > R(53)) K.tag(ctx, '"toilets!"', 940, 230, lt, R(53), { size: 30 });
    if (lt > R(55)) { K.tag(ctx, 'storage?', 1000, 330, lt, R(55), { size: 28 }); K.tag(ctx, 'toilet?', 1180, 420, lt, R(55) + 1.2, { size: 28 }); label(ctx, lt, R(55) + .4, 'DEBATED', 640, 620); }
  });
  S(56, (ctx, lt, dur, t, R) => {   // maybe the oldest indoor bathroom in Britain; maybe a damp closet; somebody thought hard about water flowing away
    TS.skara(ctx, t, { drain: 1 });
    theo(ctx, 360, 760, .95, { t, outfit: 'medieval', hat: 'hood', pose: lt < R(58) ? 'shrug' : 'present', turn: .35, vis: say(t), face: { mouth: 'smile', brows: 'up', look: [.6, -.1] } });
    K.tag(ctx, 'oldest indoor bathroom in Britain?', 820, 140, lt, .3, { size: 26 }); if (lt > R(57)) K.tag(ctx, '…or a damp closet', 900, 200, lt, R(57), { size: 26, rot: .03 });
    if (lt > R(58)) { const k = clamp((lt - R(58)) / 1.5); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = '#7ac0e0'; ctx.setLineDash([26, 18]); ctx.lineDashOffset = -t * 60;
      ctx.beginPath(); ctx.moveTo(1050, 660); ctx.lineTo(lerp(1050, 1280, k), 660); ctx.stroke(); ctx.restore(); K.tag(ctx, 'water flows AWAY', 1080, 590, lt, R(58) + .5, { size: 26 }); }
  });
  fx(61, 'stamp', .7, .4);
  S(59, (ctx, lt, dur, t, R) => {   // that idea is the whole video: the waste has to go somewhere  → refrain #1
    TS.orkney(ctx, t, 0); ctx.fillStyle = 'rgba(30,20,10,.3)'; ctx.fillRect(0, 0, W, H);
    theo(ctx, 640, 760, .95, { t, outfit: 'medieval', hat: 'hood', pose: lt < R(60) ? 'present' : 'pointUp', turn: 0, vis: say(t), face: { mouth: 'smile', brows: 'up' } });
    if (lt > R(61)) refrain(ctx, lt, R(61), 1, { y: 150 });
  });
})(window);
