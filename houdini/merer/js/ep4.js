/* Merer's Diary — CH 10 (evening: the city that fed the pyramid), CH 11 (the cost: what the bones remember),
 * CH 12 (night: where the diary went), CH 13 (legacy + close + sign-off). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, ES = G.ES, EK = G.EK, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, PI = Math.PI, DISP = s => `${s}px "Luckiest Guy"`;
  const { S, fx, mood, fig, theo, push, cover, card, LIGHT } = EP;

  // ===================== CH 10: the city that fed the pyramid =====================
  mood('remember', 'warm');
  S('remember', (ctx, lt, dur, t, R) => {   // Heit el-Ghurab at dusk: galleries, bakeries, storage, scribes' offices, a cattle corral, harbors
    ctx.save(); push(ctx, lt, dur, 1.0, 1.07, 640, 470); ES.town(ctx, t, 0, { v: 'dusk' }); ctx.restore();
    EK.chapter(ctx, lt, 10, 'Evening: the city that fed the pyramid');
    if (lt > R('aera')) EK.nameCard(ctx, lt, R('aera'), 'AERA', 'Ancient Egypt Research Associates (Lehner\'s team)', 380, 190, { icon: 'brush', w: 600 });
    if (lt > R('years35')) K.tag(ctx, '35+ years of digging', 980, 160, lt, R('years35') + .3, { size: 24 }); if (lt > R('acres')) K.tag(ctx, '~10 acres uncovered', 980, 210, lt, R('acres') + .3, { size: 24, fill: '#f6c945' });
    [['long galleries — like barracks', 480, 320, R('galleries2')], ['bakeries', 700, 280, R('storage') - .4], ['storage', 900, 340, R('storage') + .4], ['scribes\' offices', 360, 420, R('offices')], ['cattle corral', 1020, 560, R('offices') + 1.2]].forEach(([s2, x, y, at]) => { if (lt > at) K.tag(ctx, s2, x, y, lt, at, { size: 22, fill: '#e2ecd4' }); });
    if (lt > R('after')) EK.onScreen(ctx, lt, R('after') + .2, 'mostly from the kings just after Khufu: Khafre and Menkaure', { size: 24, y: 640 });
    if (lt > R('older')) K.tag(ctx, '…hints of an older town underneath', 640, 570, lt, R('older') + .2, { size: 24 });
    if (lt > R('khafre') + 6) EK.onScreen(ctx, lt, R('khafre') + 6, 'Heit el-Ghurab — "Lost City of the Pyramid Builders"', { size: 26, y: 90 });
  });
  function bakery(ctx, t, lt) {   // a bakery yard: domed oven with fire, conical bread moulds, beer jars, smoke
    ES.town(ctx, t, 0, { v: 'dusk', people: false }); ctx.fillStyle = 'rgba(40,20,10,.25)'; ctx.fillRect(0, 0, W, H);
    sh(ctx, '#c49a68', 4, c => c.rect(0, 520, W, 200)); P2.grain(ctx, 0, 520, W, 200, .3, 301, 'overlay', 1);
    sh(ctx, '#a8784a', 4, c => { c.moveTo(150, 640); c.quadraticCurveTo(150, 430, 300, 430); c.quadraticCurveTo(450, 430, 450, 640); c.closePath(); }); sh(ctx, '#2a1408', 3, c => c.ellipse(300, 600, 60, 40, 0, 0, TAU)); P2.fire(ctx, 300, 630, .6, t);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 300, 580, 220, 'rgba(255,140,60,.25)'); ctx.restore(); K.smoke(ctx, t, 300, 400, .5);
    for (let i = 0; i < 7; i++) sh(ctx, '#b06a3a', 3, c => { c.moveTo(500 + i * 34, 640); c.lineTo(512 + i * 34, 570); c.lineTo(524 + i * 34, 640); c.closePath(); });
    for (let i = 0; i < 5; i++) sh(ctx, '#b8653a', 3, c => { c.moveTo(1000 + i * 52, 660); c.quadraticCurveTo(980 + i * 52, 610, 1000 + i * 52, 560); c.lineTo(1030 + i * 52, 560); c.quadraticCurveTo(1050 + i * 52, 610, 1030 + i * 52, 660); c.closePath(); });
  }
  fx('walkin', 'fire', .35, 0, 6); fx('meat', 'moo', .3, .3);
  S('walkin', (ctx, lt, dur, t, R) => {   // walking in after a day on the river: bread ovens, beer jars ("liquid bread"), and meat
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 480); bakery(ctx, t, lt);
    fig(ctx, 'baker', 600, 730, .7, { t, pose: 'idle', turn: -.2, light: LIGHT.lamp, face: { mouth: 'smile', look: [-.4, 0] } }); fig(ctx, 'brewer', 880, 730, .7, { t, pose: 'idle', turn: .2, light: LIGHT.lamp, face: { mouth: 'smile', look: [.4, 0] } });
    if (lt > R('meat')) for (let i = 0; i < 3; i++) ES.cow(ctx, 120 + i * 90, 700, 1.4, t, i); ctx.restore();
    K.tag(ctx, 'smoke from the bread ovens', 300, 120, lt, R('smoke'), { size: 24 }); if (lt > R('beer')) { K.tag(ctx, 'beer = "liquid bread"', 1000, 120, lt, R('beer') + 1, { size: 26, fill: '#f6c945' }); }
    if (lt > R('meat')) K.title(ctx, '…and MEAT', lt, R('meat'), { y: 220, size: 60 });
  });
  function animal(ctx, kind, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const col = kind === 'sheep' ? '#f2ead6' : kind === 'pig' ? '#e8a8a0' : '#a0663a';
    sh(ctx, col, 3, c => c.ellipse(0, 0, 40, 24, 0, 0, TAU)); sh(ctx, col, 3, c => c.ellipse(40, -10, 16, 14, 0, 0, TAU)); for (const lx of [-24, -8, 10, 24]) ln(ctx, [[lx, 20], [lx, 40]], 6);
    if (kind === 'cattle') { ln(ctx, [[34, -22], [26, -38]], 4, '#f0e2c0'); ln(ctx, [[46, -22], [56, -38]], 4, '#f0e2c0'); } if (kind === 'pig') sh(ctx, '#d88a80', 2, c => c.ellipse(54, -8, 6, 5, 0, 0, TAU)); sh(ctx, OUT, 0, circ(44, -14, 2.5)); ctx.restore(); }
  S('redding', (ctx, lt, dur, t, R) => {   // Richard Redding: ~25,000 sheep/goat, ~8,000 cattle, ~1,000 pig bone fragments → >4,000 lb of meat a day (estimate)
    EK.board(ctx, 311 % 7 + 1);
    EK.nameCard(ctx, lt, .2, 'RICHARD REDDING', 'zooarchaeologist', 330, 90, { icon: 'bone', w: 420 });
    [['sheep', 25000, 'sheep + goat fragments', 0], ['cattle', 8000, 'cattle fragments', R('cattle')], ['pig', 1000, 'pig fragments', R('pigs')]].forEach(([k2, v, l, at], i) => { const a = K.pop(lt, at || .6); if (a <= 0) return; const x = 240 + i * 400; animal(ctx, k2, x - 30, 290, 1.4 * a); EK.count(ctx, x, 440, v, lt, (at || .6) + .2, 1.2, l, { size: 66, prefix: '~' }); });
    if (lt > R('pounds4k')) { ctx.save(); ctx.beginPath(); ctx.rect(0, 160, W, 560); ctx.clip(); EK.board(ctx, 311 % 7 + 1); ctx.restore(); EK.count(ctx, 640, 360, 4000, lt, R('pounds4k') + .8, 1.4, 'pounds of meat a day, on average (estimate)', { size: 110, prefix: '> ' }); }
    if (lt > R('estimate')) K.tag(ctx, 'an estimate: bones + calorie math', 640, 620, lt, R('estimate'), { size: 26, fill: '#f6c945' });
  });
  S('howmany', (ctx, lt, dur, t, R) => {   // how many people? Not 100,000: ~10,000–25,000; a smaller year-round crew + many more in the flood
    EK.workforce(ctx, lt, R('nother') - .2, { modernAt: R('modern') - R('nother') + .2 });
    if (lt > R('smallercrew')) K.tag(ctx, 'a smaller crew all year + many more rotating in during the flood', 640, 660, lt, R('smallercrew'), { size: 22, fill: '#f6c945' });
  });
  S('onemore', (ctx, lt, dur, t, R) => {   // Merer reports to Ankhhaf (ANKH-hahf), Khufu's half-brother, "chief of all the king's works"
    if (lt < R('ceo')) { ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); ES.giza(ctx, t, 0, { v: 'gold', k: .9 });
      fig(ctx, 'ankhhaf', 760, 740, .9, { t, pose: 'idle', turn: -.25, light: LIGHT.gold, face: { mouth: 'flat', brows: 'neutral', eyes: 'half' } }); fig(ctx, 'merer', 420, 740, .7, { t, pose: 'idle', turn: .3, light: LIGHT.gold, face: { mouth: 'smile', look: [.7, -.2] } }); ctx.restore();
      K.tag(ctx, 'Merer reports to…', 420, 300, lt, R('ankhhaf') + .2, { size: 24 }); EK.nameCard(ctx, lt, R('ankhhaf') + 1, 'ANKHHAF (ANKH-hahf)', 'Khufu\'s half-brother', 960, 160, { icon: 'brush', w: 440 });
      if (lt > R('chief')) K.tag(ctx, '"chief of all the king\'s works"', 960, 260, lt, R('chief'), { size: 26, fill: '#f6c945' }); if (lt > R('bossboss')) K.tag(ctx, 'the boss\'s boss — in the diary', 640, 640, lt, R('bossboss'), { size: 26 }); }
    else { ctx.fillStyle = '#5a3a26'; ctx.fillRect(0, 0, W, H); EP.deck(ctx, 0, .7); EK.timesheet(ctx, lt, R('ceo') + .1); }
  });

  // ===================== CH 11: the cost =====================
  mood('bodies', 'somber');
  S('bodies', (ctx, lt, dur, t, R) => {   // the skeletons: arthritis, worn lower spines, bones broken under heavy loads; men + women; many died in their 30s
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 480); ES.cemetery(ctx, t, 0, { v: 'dusk' }); ctx.restore(); ctx.fillStyle = 'rgba(20,10,30,.25)'; ctx.fillRect(0, 0, W, H);
    EK.chapter(ctx, lt, 11, 'The cost: what the bones remember');
    if (lt > R('arthritis')) EK.bonesCard(ctx, lt, R('arthritis'), { x: 640, y: 350, healAt: 99 });
    [['arthritis', R('arthritis') + .4], ['worn-down lower spines', R('spines')], ['bones broken under heavy loads', R('broken')]].forEach(([s2, at], i) => { if (lt > at) K.tag(ctx, s2, 1080, 220 + i * 60, lt, at, { size: 22 }); });
    if (lt > R('women')) K.tag(ctx, 'men and women are both buried here', 640, 640, lt, R('women'), { size: 24 }); if (lt > R('thirties')) K.tag(ctx, 'many died in their 30s', 640, 690, lt, R('thirties'), { size: 24, fill: '#f2d8c8' });
  });
  S('else', (ctx, lt, dur, t, R) => {   // most breaks healed properly — someone set them; very good medical care; surgery; an amputation survived for years
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#2a2230'], [1, '#1a1620']]); ctx.fillRect(0, 0, W, H);
    EK.bonesCard(ctx, lt, -1, { x: 460, y: 360, healAt: R('healed') + 1 });
    [['most broken bones healed properly', R('healed')], ['someone set them', R('setthem')], ['"very good medical care" — Egypt\'s antiquities ministry', R('ministry')], ['cases that point to surgery', R('surgery')], ['reportedly: an amputation the patient survived for years', R('amput')]]
      .forEach(([s2, at], i) => { if (lt > at) K.tag(ctx, s2, 960, 160 + i * 90, lt, at, { size: i === 2 || i === 4 ? 18 : 22, fill: i === 1 ? '#e2ecd4' : undefined }); });
  });
  S('needed2', (ctx, lt, dur, t, R) => {   // the state needed them, fed them, fixed them — and the work still wore them down. Both are true.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); ES.cemetery(ctx, t, 0, { v: 'dusk' }); ctx.restore(); ctx.fillStyle = 'rgba(20,10,30,.3)'; ctx.fillRect(0, 0, W, H);
    [['needed them', 0], ['fed them', R('fixed') - .2], ['fixed them', R('fixed') + .5]].forEach(([s2, at], i) => card(ctx, s2, 300 + i * 340, 200, lt, at, { size: 32, fill: '#e2ecd4', rot: (i - 1) * .03 }));
    if (lt > R('wore')) card(ctx, '…and the work still wore them down', 640, 360, lt, R('wore'), { size: 32, fill: '#f2d8c8' }); if (lt > R('both')) K.title(ctx, 'BOTH ARE TRUE', lt, R('both') + .1, { y: 520, size: 56 });
  });
  S('ordinary', (ctx, lt, dur, t, R) => {   // ordinary people; many still lie there, just south of it — then a long pause
    ctx.save(); push(ctx, lt, dur, 1.12, 1.0, 860, 360); ES.cemetery(ctx, t, 0, { v: 'dusk' }); ctx.restore(); const dk = clamp((lt - R('southof') - .6) / 2.5); ctx.fillStyle = `rgba(14,8,24,${.3 + dk * .3})`; ctx.fillRect(0, 0, W, H);
    K.tag(ctx, 'ordinary people', 640, 140, lt, .3, { size: 30 }); if (lt > R('gave')) K.tag(ctx, 'years of their lives for one king\'s afterlife', 640, 200, lt, R('gave'), { size: 24 }); if (lt > R('lying')) K.tag(ctx, 'many still lie here — just south of the pyramid', 640, 640, lt, R('lying'), { size: 24 });
  });

  // ===================== CH 12: where the diary went =====================
  mood('whycave', 'nileQuiet');
  S('whycave', (ctx, lt, dur, t, R) => {   // MAP: Giza across the desert to Wadi al-Jarf on the Red Sea — well over 100 miles
    const v = { lon: 31.9, lat: 29.5, z: .85 }; ES.map(ctx, t, v); ES.pin(ctx, 'Giza', v, lt, .3); ES.pin(ctx, 'Wadi al-Jarf', v, lt, .8, { col: '#2a6a96' });
    ES.route(ctx, [[31.13, 29.98], [31.6, 29.7], [32.1, 29.4], [32.64, 29.08]], v, clamp((lt - 1) / 2), { dash: true });
    EK.chapter(ctx, lt, 12, 'Night: where the diary went'); if (lt > R('hundredmi')) K.tag(ctx, 'well over 100 miles', 640, 600, lt, R('hundredmi'), { size: 28, fill: '#f6c945' });
  });
  S('morejob', (ctx, lt, dur, t, R) => {   // Merer's crew: a royal transport team — harbors, expeditions, wherever they were sent
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); ES.jarf(ctx, t, 0, { sealed: 0 }); ES.boat(ctx, 980, 400, .55, t, { blocks: 0, sail: 1, rowers: 4 });
    for (let i = 0; i < 10; i++) ES.ew(ctx, 620 + i * 54, 560 + (i % 2) * 20, 1.4, t, { pose: i % 3 ? 'walk' : 'carry', seed: i + 121, dir: i % 2 ? 1 : -1 }); ctx.restore();
    K.tag(ctx, 'not just stone haulers', 640, 110, lt, R('haulers') + .1, { size: 26 }); if (lt > R('transport')) K.tag(ctx, 'a royal transport team', 640, 165, lt, R('transport'), { size: 30, fill: '#f6c945' }); if (lt > R('harbors')) K.tag(ctx, 'harbors · expeditions', 640, 220, lt, R('harbors') + .3, { size: 24 });
  });
  fx('sealed', 'thud', .4); fx('sealed', 'thud', .3, .5);
  S('logswent', (ctx, lt, dur, t, R) => {   // the logs went with them; at the end of Khufu's reign they packed up and left the paperwork, sealed in front of the galleries
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 300, 470); ES.jarf(ctx, t, 0, { v: 'dusk', sealed: clamp((lt - R('sealed') + .6) / 1.2), scrolls: 1 });
    for (let i = 0; i < 4; i++) ES.ew(ctx, 640 + i * 60 + lt * 20, 560, 1.4, t, { pose: 'walk', seed: i + 131 }); ctx.restore();
    if (lt > R('packed')) K.tag(ctx, 'Tallet + Lehner suggest: packed up at the end of Khufu\'s reign', 820, 130, lt, R('packed'), { size: 22 }); if (lt > R('sealed')) K.tag(ctx, 'old paperwork, sealed in front of the galleries', 820, 185, lt, R('sealed') + .3, { size: 22 });
    if (lt > R('cantknow')) K.tag(ctx, 'we can\'t know for sure', 820, 240, lt, R('cantknow'), { size: 24, fill: '#f2d8c8' });
  });
  S('nobody', (ctx, lt, dur, t, R) => {   // and then for about 4,500 years, nobody read it
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 300, 470); ES.jarf(ctx, t, 0, { v: 'night', sealed: 1 }); ctx.restore();
    K.counter(ctx, 640, 200, 0, 4500, lt, .2, 2.4, 'years', { size: 96, prefix: '~' }); if (lt > R('noread')) K.title(ctx, 'nobody read it', lt, R('noread'), { y: 380, size: 56 });
  });

  // ===================== CH 13: legacy + close =====================
  mood('changesd', 'tender');
  S('changesd', (ctx, lt, dur, t, R) => {   // the modern pyramid at sunset: for centuries a mystery story — a pharaoh, a mountain of stone, nameless people with whips
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 650, 330); ES.giza(ctx, t, 0, { v: 'dusk', k: 1 }); ctx.restore();
    EK.chapter(ctx, lt, 13, 'Legacy');
    if (lt > R('mystery')) { ctx.save(); ctx.globalAlpha = .9; [['a pharaoh', R('pharaoh')], ['a mountain of stone', R('pharaoh') + 1.2], ['nameless people with whips at their backs', R('army')]].forEach(([s2, at], i) => card(ctx, s2, 640, 180 + i * 80, lt, at, { size: 28, fill: '#e8e2d4', rot: (i % 2 ? .02 : -.02) })); ctx.restore(); }
  });
  S('now2', (ctx, lt, dur, t, R) => {   // now we know: names, the boat's name, where they slept, what they ate, who the boss reported to, the Drunkards
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#f2dcae'], [1, '#d6b47e']]); ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .3, 401, 'overlay', 1);
    const items = [['some of their names', R('names')], ['the name of their boat', R('boatsname')], ['where they slept · what they ate', R('slept2')], ['who their boss reported to', R('reported')], ['that some called themselves the Drunkards', R('reported') + 2]];
    items.forEach(([s2, at], i) => { if (lt < at) return; card(ctx, s2, 600, 120 + i * 100, lt, at, { size: 30, rot: (i % 2 ? .012 : -.012) }); K.tick(ctx, 220, 120 + i * 100, 30, lt, at + .3); });
    K.title(ctx, 'NOW WE KNOW', lt, .1, { y: 660, size: 50 });
  });
  const ICONS = ['river', 'harbor', 'calendar', 'bakers', 'medicine', 'paperwork'];
  function icon(ctx, kind, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, '#f7eedb', 4, circ(0, 0, 70));
    if (kind === 'river') { ctx.lineWidth = 10; ctx.strokeStyle = '#4f86a0'; ctx.beginPath(); ctx.moveTo(-40, -40); ctx.bezierCurveTo(30, -20, -30, 20, 40, 40); ctx.stroke(); }
    else if (kind === 'harbor') ES.boat(ctx, 0, 20, .17, t, { blocks: 1, mast: true, sail: 1, bob: 0 });
    else if (kind === 'calendar') { sh(ctx, '#fff', 3, c => c.rect(-36, -30, 72, 60)); sh(ctx, '#c8322a', 0, c => c.rect(-36, -30, 72, 14)); for (let i = 0; i < 10; i++) sh(ctx, OUT, 0, circ(-26 + (i % 5) * 13, -4 + Math.floor(i / 5) * 18, 3)); }
    else if (kind === 'bakers') { sh(ctx, '#d09a52', 3, c => { c.moveTo(-30, 30); c.quadraticCurveTo(0, -60, 30, 30); c.closePath(); }); }
    else if (kind === 'medicine') { sh(ctx, '#3f9a4f', 3, c => { c.rect(-12, -36, 24, 72); c.rect(-36, -12, 72, 24); }); }
    else { EK.papyrusSheet(ctx, 0, 0, 70, 80, { draw: c => { for (let i = 0; i < 3; i++) EK.hieratic(c, -24, -20 + i * 18, 48, i, 1, '#2a2018', 2); } }); }
    ctx.restore(); EK.txt(ctx, kind, x, y + 92 * s, '700 22px Fredoka'); }
  S('trick', (ctx, lt, dur, t, R) => {   // not one superhuman trick — a supply chain: a river, a harbor, a calendar, a city of bakers, a medical system, paperwork
    EK.board(ctx, 411 % 7 + 1);
    if (lt < R('supply')) { card(ctx, 'one superhuman trick', 640, 300, lt, .3, { size: 44 }); K.cross(ctx, 640, 300, 90, lt, 2.4); }
    else { K.title(ctx, 'A SUPPLY CHAIN', lt, R('supply'), { y: 140, size: 60 });
      const step = (R('notstone') - R('river2') - .6) / 6; ICONS.forEach((k2, i) => { const at = R('river2') + i * step, a = K.pop(lt, at, .4); if (a <= 0) return; const x = 150 + i * 196; icon(ctx, k2, x, 380, a, t); if (i && lt > at) { ctx.setLineDash([8, 8]); ln(ctx, [[x - 120, 380], [x - 76, 380]], 4, '#b8322a'); ctx.setLineDash([]); } }); }
  });
  S('notstone', (ctx, lt, dur, t, R) => {   // never really about stone — about organizing people
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.giza(ctx, t, 0, { v: 'gold', k: .75 }); const r = rng(9);
    for (let i = 0; i < 60; i++) { const row = Math.floor(i / 12), x = 160 + (i % 12) * 84, y = 490 + row * 46; ES.ew(ctx, x, y, .8 + row * .12, t, { pose: 'stand', seed: i + 141 }); } ctx.restore();
    card(ctx, 'not about stone', 400, 160, lt, .2, { size: 32, rot: -.03 }); if (lt > R('organizing')) K.title(ctx, 'ORGANIZING PEOPLE', lt, R('organizing') + .2, { y: 260, size: 58 });
  });
  S('world', (ctx, lt, dur, t, R) => {   // the world they started: timesheets, crew rosters, shipping logs, office cafeterias
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#dfe8ee'], [1, '#c4d2dc']]); ctx.fillRect(0, 0, W, H);
    K.tag(ctx, 'you still live in the world they started', 640, 90, lt, .2, { size: 28 });
    [['timesheet', R('timesheet')], ['crew roster', R('roster')], ['shipping log', R('shipping')], ['office cafeteria', R('cafeteria')]].forEach(([s2, at], i) => { const a = K.pop(lt, at, .4); if (a <= 0) return; K.paper(ctx, 200 + i * 290, 380, 240, 300, { rot: (i % 2 ? .03 : -.03), scale: a, draw: c => {
      for (let j = 0; j < 7; j++) ln(c, [[-90, -90 + j * 26], [90, -90 + j * 26]], 3, 'rgba(60,60,80,.25)'); if (i === 3) { sh(c, '#d09a52', 3, cc => cc.ellipse(0, -40, 50, 18, 0, 0, TAU)); sh(c, '#9aa0a8', 3, cc => cc.ellipse(0, -30, 70, 14, 0, 0, TAU)); } EK.txt(c, s2, 0, 110, '700 24px Fredoka'); } }); });
  });
  fx('somebody', 'scratch', .5, .6);
  const nightWriter = (ctx, t, lt) => { ES.nile(ctx, t, 0, { v: 'night', near: false, h: 320 }); EP.deck(ctx, 560, .5); for (let i = 0; i < 5; i++) ES.ew(ctx, 80 + i * 150, 610 + (i % 2) * 14, 2.1, t, { pose: 'sleep', seed: i + 151 }); P2.lantern(ctx, 1040, 470, t, .8);
    fig(ctx, 'merer', 940, 750, .85, { t, pose: 'idle', turn: -.35, light: LIGHT.lamp, face: { mouth: 'smile', eyes: 'half', look: [-.2, .6] } }); };
  S('somebody', (ctx, lt, dur, t, R) => {   // somebody, somewhere, is still writing down where the team spent the night
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 900, 440); nightWriter(ctx, t, lt); ctx.restore();
    K.tag(ctx, 'still writing down where the team spent the night', 520, 140, lt, .6, { size: 26 });
  });
  S('mostimp', (ctx, lt, dur, t, R) => {   // the most important thing he did: keep a record — 4,500 years later an ordinary man gets to tell his own story
    if (lt < R('years4500')) { ctx.save(); push(ctx, lt, dur, 1.1, 1.18, 900, 420); nightWriter(ctx, t, lt); ctx.restore(); card(ctx, 'not hauling a block…', 420, 160, lt, .4, { size: 30 }); if (lt > R('record')) card(ctx, '…keeping a record', 420, 250, lt, R('record'), { size: 34, fill: '#e2ecd4' }); }
    else if (lt < R('ordman')) { ctx.save(); push(ctx, lt - R('years4500'), 3, 1.0, 1.08); ES.museum(ctx, t); ctx.restore(); K.tag(ctx, '4,500 years later', 640, 110, lt, R('years4500'), { size: 28 }); }
    else { ctx.save(); push(ctx, lt - R('ordman'), 5, 1.0, 1.05); ES.nile(ctx, t, (lt - R('ordman')) * 10, { v: 'dusk', near: false, h: 320 }); ES.boat(ctx, 640, 600, 1.0, t, { blocks: 2, sail: 1, rowers: 5 }); ctx.restore(); K.tag(ctx, 'an ordinary man on an ordinary boat', 640, 110, lt, R('ordman'), { size: 28 }); if (lt > R('own')) K.tag(ctx, 'gets to tell his own story', 640, 170, lt, R('own'), { size: 28, fill: '#f6c945' }); }
  });
  fx('writeend', 'wrote', .5, .4);
  S('writeend', (ctx, lt, dur, t, R) => {   // Write it down. — "Spends the night at Akhet-Khufu."
    ctx.fillStyle = '#4a3020'; ctx.fillRect(0, 0, W, H); EP.deck(ctx, 0, .7);
    EK.logCard(ctx, lt, .1, 'Spends the night at Akhet-Khufu.', { y: 300, w: 880, size: 38, writeDur: .9 }); K.title(ctx, 'WRITE IT DOWN.', lt, .3, { y: 590, size: 64 });
  });
  mood('subscribe', 'warm');
  fx('subscribe', 'pop', .4, .5); fx('hauler', 'pop', .3); fx('comments', 'pop', .3);
  S('subscribe', (ctx, lt, dur, t, R) => {   // sign-off: subscribe; which job would you take — hauler, boatman, baker or scribe?
    ctx.save(); push(ctx, lt, dur, 1.0, 1.03); ES.giza(ctx, t, 0, { v: 'gold', k: 1 }); ctx.restore();
    theo(ctx, 250, 760, .88, { t, outfit: 'egypt', hat: 'nemes', pose: lt < R('whichjob') ? 'wave' : 'present', turn: .35, light: LIGHT.gold, vis: Gd.say(t), face: { mouth: 'grin', brows: 'up', look: [.6, -.1] } });
    if (lt < R('whichjob')) { const k = K.pop(lt, .5); ctx.save(); ctx.translate(820, 300); ctx.scale(k, k); sh(ctx, '#c8322a', 4, c => c.roundRect(-150, -40, 300, 80, 40)); EK.txt(ctx, 'SUBSCRIBE', 0, 2, DISP(40), '#fff6e0'); ctx.restore(); }
    else [['hauler', R('hauler')], ['boatman', R('hauler') + .5], ['baker', R('hauler') + 1], ['scribe', R('hauler') + 1.4]].forEach(([s2, at], i) => card(ctx, s2, 600 + (i % 2) * 300, 200 + Math.floor(i / 2) * 140, lt, at, { size: 40, rot: (i % 2 ? .03 : -.03) }));
    if (lt > R('comments')) K.tag(ctx, 'tell me in the comments', 760, 520, lt, R('comments'), { size: 28, fill: '#f6c945' }); if (lt > R('watching')) K.title(ctx, 'THANKS FOR WATCHING', lt, R('watching'), { y: 640, size: 46 });
  });
})(window);
