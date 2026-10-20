/* Merer's Diary — CH 2 (the story everyone believed: Herodotus), CH 3 (a horse trips: the builders' cemetery + town),
 * CH 4 (the diary in the cave: Wadi al-Jarf, 2013). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, ES = G.ES, EK = G.EK, B = G.Beasts, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, theo, push, cover, card, LIGHT } = EP;

  // ===================== CH 2: the story everyone believed =====================
  mood('greek', 'comic');
  const herodotusScene = (ctx, lt, t, o = {}) => {   // Herodotus in his sun hat, squinting up at the pyramid while a local guide talks
    ES.giza(ctx, t, o.pan || 0, { v: 'noon', k: 1 });
    fig(ctx, 'guideman', o.gx ?? 860, 700, .74, { t, pose: o.guidePose || 'present', turn: -.35, vis: o.guideTalk ? { k: 'A', o: .5 + .5 * Math.sin(t * 11), nod: 0, brow: 0, beat: 0, beat2: 0, tilt: 0, t, fade: 1 } : null, face: o.guideFace || { mouth: 'grin', brows: 'up', look: [-.5, 0] } });
    fig(ctx, 'herodotus', o.hx ?? 470, 700, .8, { t, pose: o.herPose || 'idle', prop: o.herProp, turn: .3, face: o.herFace || { eyes: 'squint', mouth: 'flat', brows: 'skeptic', look: [.4, -.4] } });
  };
  S('greek', (ctx, lt, dur, t, R) => {   // one Greek tourist…
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 560, 420); herodotusScene(ctx, lt, t, { guideTalk: lt > R('guides') }); ctx.restore();
    EK.chapter(ctx, lt, 2, 'The story everyone believed');
    if (lt > R('hero')) EK.nameCard(ctx, lt, R('hero'), 'HERODOTUS', '(heh-ROD-uh-tus) · Greek writer', 330, 160, { icon: 'brush', w: 440 });
    if (lt > R('visited')) { K.tag(ctx, 'visited Egypt ~450 BC', 960, 150, lt, R('visited') + .3, { size: 26 }); K.tag(ctx, '…about 2,000 years late', 960, 200, lt, R('visited') + 2.4, { size: 24, fill: '#f6c945' }); }
  });
  S('guides', (ctx, lt, dur, t, R) => {   // the local guides told him: Khufu forced the whole country to work
    ctx.save(); push(ctx, lt, dur, 1.15, 1.22, 800, 420); herodotusScene(ctx, lt, t, { guideTalk: true, guidePose: 'presentBoth' }); ctx.restore();
    K.tag(ctx, '"Khufu forced the whole country to work for him"', 640, 120, lt, .6, { size: 26 });
  });
  fx('gangs', 'crowd', .4);
  S('gangs', (ctx, lt, dur, t, R) => {   // gangs of 100,000 men, three months at a time, twenty years
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.giza(ctx, t, 0, { v: 'noon', k: .6 }); const r = rng(5);
    for (let i = 0; i < 90; i++) { const row = i % 6, x = ((i * 37 + t * 30) % 1500) - 110, y = 500 + row * 34; ES.ew(ctx, x, y, .7 + row * .1, t, { pose: 'walk', seed: i }); } ctx.restore();
    K.counter(ctx, 640, 190, 0, 100000, lt, .3, 1.4, 'men (Herodotus)', { size: 90 });
    if (lt > R('months')) K.tag(ctx, '3 months at a time', 330, 330, lt, R('months'), { size: 26, rot: -.03 }); if (lt > R('twenty')) K.tag(ctx, '20 years for the pyramid', 950, 330, lt, R('twenty'), { size: 26, rot: .03 });
    EK.onScreen(ctx, lt, 1.2, 'Herodotus, Histories 2.124 — written ~2,000 years after the build', { size: 24 });
  });
  fx('slaves', 'stamp', .5); fx('hollywood', 'stamp', .5);
  S('grew', (ctx, lt, dur, t, R) => {   // the story grew: + slaves, + whips, + Hollywood
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a2a40'], [1, '#1e1626']]); ctx.fillRect(0, 0, W, H); P.motes(ctx, t, 20, 5);
    card(ctx, 'Herodotus: 100,000 men', 640, 170, lt, .2, { size: 34 });
    card(ctx, '+ slaves', 360, 330, lt, R('slaves'), { size: 40, rot: -.05, fill: '#f2d8c8' }); card(ctx, '+ whips', 640, 360, lt, R('slaves') + .9, { size: 40, rot: .04, fill: '#f2d8c8' }); card(ctx, '+ Hollywood', 920, 330, lt, R('hollywood'), { size: 40, rot: -.03, fill: '#f2d8c8' });
    if (lt > R('hollywood')) { const k = K.pop(lt, R('hollywood') + .3); ctx.save(); ctx.translate(920, 470); ctx.scale(k, k); sh(ctx, '#1e1e22', 4, c => c.rect(-90, -50, 180, 100)); for (let i = 0; i < 6; i++) { sh(ctx, '#f2f2f2', 0, c => c.rect(-84 + i * 30, -46, 16, 10)); sh(ctx, '#f2f2f2', 0, c => c.rect(-84 + i * 30, 36, 16, 10)); } ES.pyramid(ctx, 0, 30, 90, { k: 1 }); ctx.restore(); }
    if (lt > R('knew')) K.title(ctx, 'everybody "knew"', lt, R('knew') + .2, { y: 590, size: 60 });
  });
  S('detail', (ctx, lt, dur, t, R) => {   // the guide "reads" an inscription: radishes, onions and garlic
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 640, 420); herodotusScene(ctx, lt, t, { guideTalk: lt > R('inscription'), guidePose: 'pointSide', herPose: 'think', herFace: { eyes: 'open', mouth: 'o', brows: 'up', look: [.5, -.3] } });
    const k = K.pop(lt, R('inscription') + .3); if (k > 0) { ctx.save(); ctx.translate(1080, 420); ctx.scale(k, k); sh(ctx, '#e8d8b0', 4, c => c.rect(-110, -130, 220, 260)); for (let r2 = 0; r2 < 3; r2++) EK.hieratic(ctx, -90, -90 + r2 * 60, 180, 20 + r2, 1, '#5a3a20', 3); ctx.restore(); }
    ctx.restore();
    if (lt > R('radishes')) [['radishes', 280], ['onions', 640], ['garlic', 1000]].forEach(([s2, x], i) => K.tag(ctx, s2, x, 110, lt, R('radishes') + 1 + i * .5, { size: 30, rot: (i - 1) * .04 }));
  });
  fx('talents', 'ding', .5, .6);
  S('talents', (ctx, lt, dur, t, R) => {   // 1,600 talents of silver — a ridiculous amount of onions
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#f2dcae'], [1, '#d6b47e']]); ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .3, 3, 'overlay', 1);
    EK.onions(ctx, 560, 640, 1.0, lt, .1, t);
    if (lt > R('onions')) K.title(ctx, 'that\'s a LOT of onions', lt, R('onions'), { y: 110, size: 56 });
    if (lt > R('historians')) EK.onScreen(ctx, lt, R('historians'), 'most historians: the guide made it up — or couldn\'t read the writing', { size: 24 });
  });
  S('buried', (ctx, lt, dur, t, R) => {   // the real question: who paid for lunch?
    ctx.save(); push(ctx, lt, dur, 1.1, 1.0, 640, 400); ES.giza(ctx, t, 0, { v: 'gold', k: 1 }); for (let i = 0; i < 14; i++) ES.ew(ctx, 120 + i * 80, 650 + (i % 2) * 20, 1.5, t, { pose: 'stand', seed: i + 40 }); ctx.restore();
    if (lt > R('stones')) card(ctx, 'forget the stones', 640, 220, lt, R('stones'), { size: 30 });
    if (lt > R('lunch')) K.title(ctx, 'WHO PAID FOR LUNCH?', lt, R('lunch'), { y: 130, size: 66 });
  });
  S('here', (ctx, lt, dur, t, R) => {   // recap: a god-king · 100,000 men · a fortune in onions
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#f2dcae'], [1, '#d6b47e']]); ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .3, 5, 'overlay', 1);
    const items = [['a god-king', 'needs a mountain', R('godking')], ['100,000 men', '(says a tourist)', R('tourist')], ['a fortune', 'in onions', R('tourist') + 2.2]];
    items.forEach(([a, b, at], i) => { const k = K.pop(lt, at, .4); if (k <= 0) return; K.paper(ctx, 240 + i * 400, 330, 330, 330, { rot: (i - 1) * .03, scale: k, draw: c => {
      if (i === 0) ES.pyramid(c, 0, 40, 160, { k: 1 }); else if (i === 1) for (let j = 0; j < 12; j++) ES.ew(c, -100 + (j % 6) * 40, 20 + Math.floor(j / 6) * 40, 1, t, { pose: 'walk', seed: j }); else EK.onions(c, 0, 60, .3, 9, 0, t);
      EK.txt(c, a, 0, 100, DISP(30)); EK.txt(c, b, 0, 136, `700 20px Fredoka`, '#7a4a2a'); } }); });
    if (lt > R('basically')) EK.onScreen(ctx, lt, R('basically'), 'for a very long time, that was basically all we had');
  });
  const DISP = s => `${s}px "Luckiest Guy"`;

  // ===================== CH 3: a stumble in the sand =====================
  mood('then', 'curious', .3);
  fx('horse', 'hooves', .5, -.3); fx('hoof', 'thud', .5, 2.5); fx('hoof', 'whoosh', .3, 2.3);
  S('then', (ctx, lt, dur, t, R) => {   // 1990: a tourist's horse catches its hoof on a mud-brick wall south of the Sphinx
    const trip = R('hoof') + 2.4, tk = clamp((lt - trip) / .35), back = clamp((lt - trip - .5) / .6);
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 620, 520); ES.giza(ctx, t, 0, { v: 'day', k: 1 }); ES.sphinx(ctx, 980, 520, .9);
    // the low mud-brick wall just poking out of the sand
    for (let i = 0; i < 6; i++) sh(ctx, '#9a6a44', 2.5, c => c.rect(560 + i * 34, 612 - (i % 2) * 4, 32, 16)); ctx.fillStyle = 'rgba(226,196,142,.9)'; ctx.fillRect(540, 624, 240, 20);
    const x = lerp(-80, 470, ease.out(clamp(lt / (trip + .1)))), dip = Math.sin(tk * PI) * .12 * (1 - back);
    ctx.save(); ctx.translate(x, 640); ctx.rotate(dip); B.steed(ctx, 0, 0, 1.0, t, { gait: lt < trip ? 'walk' : 'stand', coat: '#c8a074', rider: EP.cast('scientist', { outfit: 'explorer', hat: 'pith', light: { cast: 0, contact: 0 }, face: { mouth: tk > .3 ? 'shock' : 'smile', eyes: tk > .3 ? 'wide' : 'open' } }) }); ctx.restore();
    if (tk > 0) { ctx.save(); ctx.translate(600, 620); ctx.scale(.45, .45); K.puff(ctx, 0, 0, tk, 1 - back * .7); ctx.restore(); }
    ctx.restore(); EP.dateTag(ctx, 'GIZA · 1990');
    EK.chapter(ctx, lt, 3, 'The first clue: a stumble in the sand');
    if (lt > trip + .6) K.tag(ctx, 'a mud-brick wall!', 660, 520, lt, trip + .6, { size: 26 });
  });
  S('hawass', (ctx, lt, dur, t, R) => {   // that's how Zahi Hawass tells it — his team dug: a wall, a tomb, hundreds
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 480); ES.cemetery(ctx, t, 0, { v: 'day' }); ctx.restore();
    // sand being cleared: a cover over the tombs pulls away bit by bit on "wall", "tomb", "hundreds"
    const cov = 1 - clamp((lt - R('wall')) / (R('hundreds') - R('wall') + 1.2)); if (cov > 0) { ctx.save(); ctx.fillStyle = '#e2c48e'; ctx.fillRect(lerp(W, 0, 1 - cov) , 380, W, 340); P2.grain(ctx, 0, 380, W, 340, .3, 9, 'overlay', 1); ctx.restore(); }
    EK.nameCard(ctx, lt, .3, 'ZAHI HAWASS', 'Egyptian archaeologist', 300, 120, { icon: 'brush' });
    if (lt > R('wall')) K.tag(ctx, 'a wall', 900, 120, lt, R('wall'), { size: 26 }); if (lt > R('tomb')) K.tag(ctx, '…then a tomb', 960, 170, lt, R('tomb'), { size: 26 }); if (lt > R('hundreds')) K.tag(ctx, '…then hundreds', 1020, 220, lt, R('hundreds'), { size: 26 });
    EK.onScreen(ctx, lt, R('hundreds') + .4, 'Cemetery of the Pyramid Builders — excavations from 1990', { size: 24 });
  });
  S('notroyal', (ctx, lt, dur, t, R) => {   // not royal: small, mud brick, some like tiny pyramids, in the king's shadow
    ctx.save(); const z = lerp(1.5, 1.0, ease.inOut(clamp((lt - R('shadow')) / 2.5))); ctx.translate(640, 520); ctx.scale(z, z); ctx.translate(-640, -520); ES.cemetery(ctx, t, 0, { v: 'gold' }); ctx.restore();
    if (lt > R('small')) K.tag(ctx, 'small · mud brick · rough stone', 640, 110, lt, R('small'), { size: 26 }); if (lt > R('tiny')) K.tag(ctx, 'some like tiny pyramids', 640, 160, lt, R('tiny'), { size: 24, fill: '#f6c945' });
    if (lt > R('shadow')) K.tag(ctx, 'in the shadow of the king\'s monument', 640, 600, lt, R('shadow') + 1.2, { size: 24 });
  });
  S('downhill', (ctx, lt, dur, t, R) => {   // just down the hill: Mark Lehner, digging since 1988 at Heit el-Ghurab, the Wall of the Crow
    ctx.save(); push(ctx, lt, dur, 1.25, 1.0, 200, 420); ES.town(ctx, t, 0, { v: 'day', people: lt > R('townfound') });
    const dig = ease.inOut(clamp((lt - R('heit')) / (R('townfound') - R('heit') + 1.5))), top = lerp(330, 760, dig);   // the sand being dug away, layer by layer
    if (dig < 1) { ctx.save(); ctx.beginPath(); ctx.moveTo(250, H); ctx.lineTo(250, top + 30); for (let x = 250; x <= W + 40; x += 40) ctx.lineTo(x, top + Math.sin(x * .02) * 14); ctx.lineTo(W + 40, H); ctx.closePath(); ctx.fillStyle = grad(ctx, 0, top, 0, H, [[0, '#e8cc94'], [1, '#c8a46a']]); ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = OUT; ctx.stroke(); ctx.clip(); P2.grain(ctx, 250, top - 20, W, H, .35, 12, 'overlay', 1); ctx.restore(); }
    ctx.restore(); EK.nameCard(ctx, lt, R('lehner'), 'MARK LEHNER', 'American archaeologist · digging since 1988', 360, 120, { icon: 'brush', w: 520 });
    if (lt > R('heit')) K.tag(ctx, 'Heit el-Ghurab (HAIT el-ghoo-RAHB)', 900, 200, lt, R('heit'), { size: 24 }); if (lt > R('crow')) K.tag(ctx, '"the Wall of the Crow"', 900, 250, lt, R('crow') + .2, { size: 26, fill: '#f6c945' });
    if (lt > R('wallsize')) EK.onScreen(ctx, lt, R('wallsize') + 1, 'the wall: ~650 ft long · ~33 ft high', { size: 26 });
    if (lt > R('townfound')) K.title(ctx, 'A TOWN', lt, R('townfound') + 1.2, { y: 130, size: 70 });
  });
  S('comeback', (ctx, lt, dur, t, R) => {   // where they slept + where they were buried — but not what they did all day
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 636, H); ctx.clip(); ctx.translate(-320, 0); ES.cemetery(ctx, t, 0, { v: 'gold' }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(644, 0, 636, H); ctx.clip(); ctx.translate(320, 0); ES.town(ctx, t, 0, { v: 'gold' }); ctx.restore(); ln(ctx, [[640, 0], [640, H]], 8);
    K.tag(ctx, 'where they were buried', 320, 120, lt, R('told') + 1, { size: 26 }); K.tag(ctx, 'where they slept', 960, 120, lt, R('told') + .6, { size: 26 });
    if (lt > R('didnt')) K.title(ctx, 'but what did they DO all day?', lt, R('didnt') + .2, { y: 400, size: 46 });
  });
  fx('needed', 'scratch', .6, .8);
  S('needed', (ctx, lt, dur, t, R) => {   // for that, someone had to write it down
    ctx.fillStyle = '#4a3020'; ctx.fillRect(0, 0, W, H); EP.deck(ctx, 0, .7);
    const k = clamp((lt - .5) / 2); EK.papyrusSheet(ctx, 640, 360, 760, 330, { rot: .02, draw: c => { for (let r2 = 0; r2 < 3; r2++) EK.hieratic(c, -320, -80 + r2 * 70, 640, 60 + r2, clamp(k * 3 - r2), '#2a2018', 3.4); } });
    if (k < 1) EP.pen(ctx, 330 + 640 * ((k * 3) % 1), 300 + Math.floor(Math.min(2.99, k * 3)) * 70, .55);
    K.title(ctx, 'someone had to WRITE IT DOWN', lt, .8, { y: 620, size: 44 });
  });

  // ===================== CH 4: the diary in the cave =====================
  mood('y2013', 'nile');
  S('y2013', (ctx, lt, dur, t, R) => {   // MAP: zoom east to the Red Sea coast, pin on Wadi al-Jarf; Pierre Tallet's team, 2013
    const u = ease.inOut(clamp(lt / 4)), v = { lon: lerp(31.3, 32.4, u), lat: lerp(28.6, 29.1, u), z: lerp(.45, 1.1, u) };
    ES.map(ctx, t, v); ES.pin(ctx, 'Giza', v, lt, .2); ES.pin(ctx, 'Wadi al-Jarf', v, lt, 2.4, { col: '#2a6a96' }); if (lt > R('copper')) { ES.route(ctx, [[32.64, 29.08], [33.0, 28.9], [33.4, 28.9]], v, clamp((lt - R('copper')) / 1.5), { dash: true, col: '#2a6a96' }); ES.pin(ctx, [33.4, 28.9], v, lt, R('copper') + 1.2, { label: 'Sinai copper', col: '#b87333' }); }
    EK.chapter(ctx, lt, 4, 'The diary in the cave'); EP.dateTag(ctx, 'WADI AL-JARF · 2013');
    if (lt > 1.2) EK.nameCard(ctx, lt, 1.2, 'PIERRE TALLET', '(pee-AIR tah-LAY) · led the French-Egyptian team', 400, 640, { icon: 'brush', w: 560 });
  });
  S('galleries', (ctx, lt, dur, t, R) => {   // storage galleries carved into the rock for their boats; papyrus rolls wedged between big stones
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [R('wedged'), 1.6, 280, 450]], .8); ES.jarf(ctx, t, 0, { sealed: 1, scrolls: clamp((lt - R('rolls')) / 1.2) }); ctx.restore();
    K.tag(ctx, 'storage galleries for their boats', 900, 150, lt, .4, { size: 26 }); if (lt > R('rolls')) K.tag(ctx, 'rolls of papyrus!', 700, 560, lt, R('rolls') + .4, { size: 30, fill: '#f6c945' });
  });
  S('fragments', (ctx, lt, dur, t, R) => {   // hundreds of fragments from maybe ~30 scrolls
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#e8d4a8'], [1, '#c8a878']]); ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .3, 7, 'overlay', 1);
    const r = rng(14), n = Math.floor(lerp(4, 70, clamp(lt / 2.6))); for (let i = 0; i < n; i++) { const x = 80 + r() * 1120, y = 80 + r() * 520, s = .14 + r() * .12; EK.papyrusSheet(ctx, x, y, 400 * s * 3, 300 * s * 2.2, { rot: (r() - .5) * .8, seed: i + 2, draw: c => EK.hieratic(c, -40, 0, 80, i, 1, '#2a2018', 2) }); }
    K.counter(ctx, 640, 300, 0, 30, lt, R('scrolls') + .2, 1, 'scrolls, maybe', { prefix: '~', size: 96 });
  });
  S('oldestp', (ctx, lt, dur, t, R) => {   // ARTIFACT: Papyrus Jarf A — oldest inscribed papyri; accounts; Merer's logbook
    ctx.save(); push(ctx, lt, dur, 1.0, 1.12, 640, 340); ES.museum(ctx, t); ctx.restore();
    EK.onScreen(ctx, lt, .3, 'the oldest inscribed papyri ever found', { y: 90 });
    if (lt > R('accounts')) ['grain', 'supplies', 'who got what'].forEach((s2, i) => K.tag(ctx, s2, 260 + i * 380, 640, lt, R('accounts') + .4 + i * .5, { size: 26, fill: '#e2ecd4' }));
  });
  S('logbook', (ctx, lt, dur, t, R) => {   // the best preserved: a logbook by an "inspector" named Merer, Khufu's year 27
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 400); ES.nile(ctx, t, 0, { v: 'gold', near: false, h: 340 }); EP.deck(ctx, 600); ctx.restore();
    fig(ctx, 'merer', 330, 760, .9, { t, pose: 'idle', turn: .3, light: LIGHT.gold, face: { mouth: 'smile', brows: 'neutral', look: [.6, 0] } });
    K.tag(ctx, 'title: "inspector"', 800, 150, lt, R('logbook') + 2.5 - R('logbook'), { size: 26 });
    if (lt > R('merername')) EK.nameCard(ctx, lt, R('merername'), 'MERER', 'inspector · logbook keeper', 860, 260, { icon: 'brush' });
    if (lt > R('dated')) K.tag(ctx, 'dated: year 27 of Khufu', 860, 400, lt, R('dated') + .5, { size: 28, fill: '#f6c945' }); if (lt > R('end')) K.tag(ctx, 'probably the very end of his reign', 860, 450, lt, R('end') + .2, { size: 22 });
  });
  S('nearly', (ctx, lt, dur, t, R) => {   // the Great Pyramid nearly finished
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 650, 330); ES.giza(ctx, t, 0, { v: 'gold', k: .9, workers: 24 }); ctx.restore();
    K.tag(ctx, 'the Great Pyramid: nearly finished', 640, 110, lt, .3, { size: 28 });
  });
})(window);
