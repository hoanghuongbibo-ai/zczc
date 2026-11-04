/* Beat 7 (Pompeii didn't die that day), Beat 8 (the treasure hunters), Beat 9 (Fiorelli + the casts): 735 – 1047 s. */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, S = G.PS, T = G.Toon, PL = G.PL;
  const { W, H, P, L, text, A, since, pop } = PK, { clamp, lerp, ease } = T, cam = S.cam;
  const who = PL.who;

  // ================= Beat 7 =================
  S.over('nobodytells', 'storywas', (ctx, lt) => PK.chapter(ctx, "THE TWIST: POMPEII DIDN'T DIE THAT DAY", lt, 1.6));
  S.mood('nobodytells', 'gentle');
  S.cut('nobodytells', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    P(ctx, '#7a3b2e', 3, c => c.roundRect(300, 180, 680, 400, 12)); P(ctx, '#f6eedb', 3, c => c.rect(320, 195, 310, 370)); P(ctx, '#f6eedb', 3, c => c.rect(650, 195, 310, 370));
    text(ctx, 'Pompeii died', 475, 300, { font: PK.HAND(40) }); text(ctx, 'in AD 79', 475, 350, { font: PK.HAND(40) }); text(ctx, 'THE END.', 805, 330, { font: PK.HAND(54) });
    const y = since(t, 'y2025', .6);
    if (y > 0) { PK.cross(ctx, 805, 330, 90, y * 1.4); PK.scaled(ctx, 640, 470, pop(y), c => { PK.paper(c, -300, -60, 600, 120, { fill: '#fff8e6', tape: true }); text(c, '2025: the archaeological park announces new evidence', 0, -18, { px: 20, w: 700 }); text(c, 'from the south of the city: people came back', 0, 18, { px: 20, w: 700, col: '#c0392b' }); }); }
  });
  S.fx('y2025', 'paper');
  S.cut('cameback', (ctx, lt, d, t) => {
    St.sky(ctx, '#9a9088', '#d8ccb8'); St.vesuvius(ctx, 1000, 420, .7, { t, green: false });
    P(ctx, '#c4bcb0', 3, c => { c.moveTo(-100, 760); c.lineTo(-100, 480); for (let x = -100; x < 1400; x += 80) c.lineTo(x, 470 + Math.sin(x * .02) * 26); c.lineTo(1400, 760); c.closePath(); });
    for (const x of [520, 700, 860]) { P(ctx, '#d9cbb0', 3, c => c.rect(x, 380, 120, 100)); P(ctx, '#3d2f28', 2, c => c.rect(x + 50, 410, 20, 30)); }
    // a few people walk back over the ash dunes
    for (let i = 0; i < 4; i++) { const p = clamp((lt - i * .5) / 6); F.person(ctx, lerp(-60 - i * 60, 420 + i * 40, p), 560 + i * 30, .8, F.roman(300 + i, { dir: 1, t, walk: t * 6 + i, col: '#9a8a7a', face: { eyes: 'dot', mouth: 'flat', brows: 'calm' }, armR: [14, -60], holdR: (c, x, y) => P(c, '#8a6a5a', 2.4, q => q.ellipse(x, y - 10, 20, 14, 0, 0, 7)) })); }
    // the rich, leaving in a cart
    const r = since(t, 'notrich', 2.5);
    if (r > 0) { const x = lerp(700, 1500, ease.in(r)); P(ctx, '#7a3b2e', 3, c => c.rect(x - 70, 600, 140, 50)); for (const dx of [-40, 40]) P(ctx, '#4a3020', 3, c => c.arc(x + dx, 656, 18, 0, 7)); F.person(ctx, x - 20, 610, .6, F.cast('senator', { dir: 1, face: { eyes: 'closed', mouth: 'flat' } })); PL.lbl(ctx, 'not the rich', 1000, 160, r * 3, { px: 24 }); }
  });
  S.cut('traced', (ctx, lt, d, t) => {
    const B = St.BAY; cam(ctx, 1.25, 700, 430);
    St.bayMap(ctx, {});
    St.town(ctx, 'Pompeii', ...B.pompeii, 1, { col: '#7a7268', dx: 40 });
    const towns = [B.naples, B.herc, B.stabiae, B.nuceria, [560, 330], [900, 300], [1040, 360], [880, 560], [1100, 480], [640, 280], [960, 230], [1000, 600]];
    towns.forEach((p, i) => { const k = clamp((lt - .3 - i * .18) / .3); if (k <= 0) return; St.route(ctx, [B.pompeii, p], k, { col: '#c0563c', w: 3, dash: [6, 6] }); St.town(ctx, '', p[0], p[1], k, { col: '#e7b84a', r: 7 }); });
    PK.reset(ctx);
    PK.counter(ctx, 0, 200, clamp(lt / 2.5), 1080, 120, 64, { post: '+', col: '#f4ecd8' }); PL.lbl(ctx, 'likely survivors, a dozen towns', 1080, 185, clamp(lt / .4), { px: 18 });
    const n = since(t, 'names', .5);
    if (n > 0) PK.note(ctx, ['traced by family names', 'unique to the area'], 260, 620, t - A('names'), { px: 26, bold0: true });
  });
  S.cut('nowhere', (ctx, lt, d, t) => {
    // cross-section: a building half under ash; life in the upper floor, a cellar with oven + mill below
    St.sky(ctx, '#9a9088', '#d8ccb8');
    P(ctx, '#d9cbb0', 3, c => c.rect(300, 140, 680, 480)); St.roof(ctx, 300, 140, 680, 40, '#8a6a5a'); L(ctx, [[300, 380], [980, 380]], 5);
    P(ctx, '#c4bcb0', 3, c => { c.moveTo(-100, 760); c.lineTo(-100, 400); c.lineTo(300, 390); c.lineTo(300, 620); c.lineTo(980, 620); c.lineTo(980, 390); c.lineTo(1400, 400); c.lineTo(1400, 760); c.closePath(); });
    text(ctx, 'ASH', 140, 520, { font: PK.DISPLAY(40), col: '#8a8278' }); text(ctx, 'ASH', 1160, 520, { font: PK.DISPLAY(40), col: '#8a8278' });
    // upstairs: squatters and newcomers
    const people = [[420, 'digger'], [560, 'pompeian'], [700, 'mother'], [840, 'sailor']];
    people.forEach(([x, n], i) => { const k = clamp((lt - i * .4) / .5); if (k <= 0) return; who(ctx, n, x, 370, .85 * pop(k), { dir: i % 2 ? -1 : 1, t, col: ['#9a8a6a', '#7a8a9a', '#8a6a7a', '#6a7a6a'][i], face: { eyes: 'dot', mouth: 'flat', brows: 'calm' } }); });
    PL.lbl(ctx, 'nowhere else to go', 400, 90, since(t, 'nowhere', .4), { px: 20 }); PL.lbl(ctx, '+ newcomers, nothing to lose', 870, 90, since(t, 'newcomers', .4), { px: 20 });
    // cellar
    const c = since(t, 'cellars', .6);
    if (c > 0) { ctx.save(); ctx.globalAlpha = c; P(ctx, '#b8473a', 3, q => q.arc(450, 560, 50, Math.PI, 0)); P(ctx, '#e8693a', 0, q => q.arc(450, 560, 22, Math.PI, 0)); P(ctx, '#9a948c', 3, q => { q.moveTo(760, 600); q.lineTo(800, 470); q.lineTo(840, 600); q.closePath(); }); F.person(ctx, 640, 610, .7, F.roman(310, { dir: 1, t, walk: t * 4 })); ctx.restore(); PL.lbl(ctx, 'old ground floors → cellars: ovens + mills', 640, 670, c, { px: 20 }); }
    PL.lbl(ctx, 'upper floors', 1100, 260, since(t, 'upper', .4), { px: 20 });
  });
  S.cut('director', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    who(ctx, 'director', 260, 690, 1.5, { dir: 1, t, face: { eyes: 'dot', mouth: PK.talk(t, A('gray'), A('fifthc')) > .3 ? 'open' : 'smile' }, armR: [40, -30] });
    PK.nameCard(ctx, 'Gabriel Zuchtriegel', 'director, Pompeii Archaeological Park', 260, 260, clamp(lt / .4), { px: 22 });
    PK.phon(ctx, 'Zuchtriegel', 'TSOOKH-tree-gel', 760, 160, clamp(lt / .4) * (1 - since(t, 'gray', .3)));
    PK.quote(ctx, 'a precarious, gray settlement, a kind of camp', '', 780, 280, 560, clamp((t - A('gray')) / 2.5), { lt: t - A('gray') + .3 });
    const f = since(t, 'fifthc', .6);
    if (f > 0) { L(ctx, [[520, 560], [520 + 620 * f, 560]], 6); text(ctx, 'AD 79', 520, 600, { px: 20, w: 700 }); text(ctx, '5th century AD', 1140, 600, { px: 20, w: 700 }); for (let i = 0; i < 7; i++) if (i / 7 < f) P(ctx, i % 2 ? '#d9cbb0' : '#7f9f5a', 2.4, c => c.roundRect(540 + i * 86, 530, 70, 18, 8)); PL.lbl(ctx, 'on and off', 830, 500, f, { px: 18 }); }
  });
  S.cut('whyknow', (ctx, lt, d, t) => {
    St.sky(ctx, '#bfe0ee', '#f6ecd2'); St.ground(ctx, 520, '#9a7552');
    P(ctx, '#6e5038', 3, c => { c.moveTo(200, 520); c.lineTo(280, 680); c.lineTo(1000, 680); c.lineTo(1080, 520); c.closePath(); });
    PL.lbl(ctx, "WHY DIDN'T WE KNOW?", 640, 100, clamp(lt / .4), { px: 30 });
    const items = [['frescoes', 'FRESCOES', 380], ['frescoes', 'STATUES', 640], ['frescoes', 'GOLD', 900]];
    items.forEach(([k, s, x], i) => { const p = since(t, k, .4) - i * .5; if (p <= 0) return; PK.scaled(ctx, x, 230, pop(clamp(p)), c => { if (i === 0) { P(c, '#b8473a', 3, q => q.rect(-50, -40, 100, 80)); P(c, '#e2b54a', 0, q => q.rect(-50, -40, 100, 14)); } if (i === 1) F.person(c, 0, 50, .5, { body: 'toga', col: '#e6e1d6', legs: '#e6e1d6', shoes: '#d6cdbd', gloves: '#e6e1d6', hair: 'curly', hairCol: '#d6cdbd', face: { eyes: 'closed' } }); if (i === 2) for (let j = 0; j < 5; j++) P(c, '#f0c43c', 2.4, q => q.arc(-30 + j * 15, 20 - (j % 2) * 10, 12, 0, 7)); text(c, s, 0, 70, { px: 20, w: 700 }); }); });
    // 18th-century excavator, eyes on the treasure, shovels the faint traces away
    const k = since(t, 'inway', .5), ph = (t * 1.6) % 1;
    who(ctx, 'digger', 760, 600, 1.2, { dir: -1, t, hat: 'tricorn', face: { eyes: 'dot', mouth: 'grin', look: [0, -1] }, armL: [-40, 10 + Math.sin(ph * 6.28) * 14], armR: [-30, 20 + Math.sin(ph * 6.28) * 14], holdR: (c, x, y) => St.shovel(c, x, y + 10, .9 + Math.sin(ph * 6.28) * .3, .8) });
    if (k > 0) { ctx.save(); ctx.globalAlpha = .5; P(ctx, '#7a6a5a', 2, c => c.ellipse(500, 660, 40, 10, 0, 0, 7)); St.amphora(ctx, 440, 660, .5, '#9a8070'); ctx.restore(); PL.lbl(ctx, "the squatters' faint traces", 470, 600, k, { px: 18 }); }
    const sh = since(t, 'shoveled', .5);
    if (sh > 0) PK.scaled(ctx, 1080, 420, pop(sh), c => { PK.paper(c, -110, -80, 220, 160, { fill: '#fff' }); text(c, 'NOTES:', 0, -50, { px: 20, w: 700 }); text(c, '—', 0, 0, { font: PK.HAND(40) }); });
    if (since(t, 'preview', .4) > 0) PK.stamp(ctx, 'PREVIEW OF WHAT\'S NEXT', 640, 400, since(t, 'preview', 1), { px: 36, col: '#7a5a3a' });
  });
  S.fx('inway', 'dig'); S.fx('shoveled', 'dig'); S.fx('shoveled', 'dig', .6);
  S.cut('leave', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 480, vesuvius: true, vx: 1050, vs: .55 });
    const g = clamp(lt / 3);
    P(ctx, '#9bb46a', 3, c => { c.moveTo(200, 620); c.quadraticCurveTo(640, 420 - 40 * g, 1080, 620); c.closePath(); });
    for (let i = 0; i < 8; i++) St.tufts(ctx, 20 + i, 300, 980, 540, 610, 4);
    const c = since(t, 'civita', .5);
    if (c > 0) PL.sign(ctx, 'LA CIVITA = "the city"', 640, 520, c, { h: 110, px: 20 });
    const k = since(t, 'knew', .5);
    if (k > 0) { who(ctx, 'digger', 480, 560, 1.0, { dir: 1, t, hat: 'pileus', face: { eyes: 'dot', mouth: 'smile', look: [0, 1] }, bob: -Math.abs(Math.sin(t * 6)) * 6 }); PK.bubble(ctx, "there's a city down there!", 420, 380, [460, 440], k, { px: 20 }); }
    const w = since(t, 'which', .5);
    if (w > 0) { PK.qmark(ctx, 820, 420, 80, w); PL.lbl(ctx, '…but which one?', 860, 330, w, { px: 22 }); }
    PK.tag(ctx, 'centuries later', lt);
  });
  S.cut('burial3', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3a4a34', '#1a2016');
    PK.burials(ctx, 3, clamp(lt / 1.2), W / 2, 200, { label: 'BURIAL #3 — BY TIME' });
    PK.againCard(ctx, clamp((lt - .8) / 1.2), W / 2, 500);
  });
  S.fx('burial3', 'thud'); S.fx('burial3', 'stamp', .9); S.fx('burial3', 'stamp', 1.2); S.fx('burial3', 'stamp', 1.5);

  // ================= Beat 8: rediscovery =================
  S.over('fontana', 'architect', (ctx, lt) => PK.chapter(ctx, 'REDISCOVERY: THE TREASURE HUNTERS', lt, 2.2));
  S.mood('fontana', 'pluck');
  S.cut('fontana', (ctx, lt, d, t) => {
    const B = St.BAY; cam(ctx, 2, 860, 450);
    St.bayMap(ctx, {});
    P(ctx, 'rgba(120,100,70,.25)', 2, c => c.ellipse(B.pompeii[0] + 10, B.pompeii[1] - 6, 34, 20, 0, 0, 7)); text(ctx, '(buried city)', B.pompeii[0] + 10, B.pompeii[1] - 34, { px: 11, w: 700 });
    const k = clamp(lt / 3);
    ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = '#3c7ab0'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(960, 452); ctx.lineTo(lerp(960, 790, k), lerp(452, 462, k)); ctx.stroke(); ctx.restore();
    PK.reset(ctx);
    PK.tag(ctx, '1592 – 1600', lt);
    PK.nameCard(ctx, 'Domenico Fontana', 'architect', 300, 600, since(t, 'architect', .4));
    PL.lbl(ctx, 'a water channel for the Sarno River', 900, 620, since(t, 'architect', .4) * 2 - 1, { px: 20 });
  });
  S.cut('tunnel', (ctx, lt, d, t) => {
    // cross-section: the tunnel cuts through buried walls and frescoes
    St.sky(ctx, '#bfe0ee', '#f6ecd2'); P(ctx, '#7fa24f', 3, c => c.rect(-100, 150, W + 200, 20)); P(ctx, '#a08a6a', 0, c => c.rect(-100, 170, W + 200, 600));
    for (const [x, h] of [[200, 260], [520, 300], [860, 240]]) { P(ctx, '#d9cbb0', 3, c => c.rect(x, 620 - h, 200, h)); P(ctx, '#b8473a', 0, c => c.rect(x + 2, 540, 196, 78)); }
    P(ctx, '#3a2a20', 3, c => c.rect(-100, 430, W + 200, 80));
    const x = (lt * 130) % 1500 - 100;
    const hit = since(t, 'hit', .3);
    who(ctx, 'digger', 300 + Math.min(lt, 3) * 40, 510, .7, { dir: 1, t, face: { eyes: hit > 0 && hit < 1 ? 'wide' : 'dot', mouth: 'flat' }, armR: [40, -20 + Math.sin(t * 8) * 10] });
    void x;
    if (hit > 0) { PL.lbl(ctx, 'walls! paintings! inscriptions!', 640, 360, hit, { px: 22 }); }
    const n = since(t, 'nothing', .5);
    if (n > 0) { PL.dim(ctx, .3 * n); who(ctx, 'alcub', 1000, 700, 1.3, { dir: -1, t, hat: 'none', hair: 'short', hairCol: '#4a3426', col: '#5a4a6a', face: { eyes: 'half', mouth: 'flat', brows: 'up' }, armL: [-40, -20], armR: [40, -20] }); PL.lbl(ctx, '…nothing. He keeps digging.', 1000, 300, n, { px: 22 }); }
    const c = since(t, 'canaldue', .5);
    if (c > 0) St.calendar(ctx, 760, 200, 'CANAL', 'DUE', 'Friday', .9, { px: 50 });
  });
  for (let i = 0; i < 5; i++) S.fx('tunnel', 'dig', i * .5, .5); S.fx('hit', 'thud');
  S.cut('y1689', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    P(ctx, '#d6cdbd', 4, c => c.roundRect(390, 200, 500, 150, 8)); text(ctx, '… DECVRIO POMPEIS …', 640, 275, { font: '700 34px Georgia, serif', col: '#4a4038' });
    PK.tag(ctx, '1689', lt);
    const a = since(t, 'argue2', .4);
    if (a > 0) { for (const [x, n, dir, s] of [[300, 'historian', 1, 'Pompeii!'], [640, 'fiorelli', 0, 'Is it, though?'], [980, 'tourist18', -1, 'Need more evidence…']]) { who(ctx, n, x, 700, 1.1, { dir, t, face: { eyes: 'dot', mouth: 'open', brows: 'skeptic' } }); } PK.bubble(ctx, 'Pompeii!', 300, 430, [300, 480], a, { px: 20 }); PK.bubble(ctx, 'Is it, though?', 640, 400, [640, 470], a - .3, { px: 20 }); PK.bubble(ctx, 'Need more evidence…', 980, 430, [980, 480], a - .6, { px: 20 }); }
    const n = since(t, 'noshovel', .5);
    if (n > 0) { PL.dim(ctx, .5 * n); St.shovel(ctx, 640, 420, -.3, 1.6); ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.4; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(600, 330, 20 + i * 14, 0, 1.6); ctx.stroke(); } ctx.restore(); PL.lbl(ctx, 'nobody grabs a shovel', 640, 600, n, { px: 26 }); }
  });
  S.cut('y1748', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 520 });
    for (let i = 0; i < 8; i++) { const p = clamp((lt - i * .12) / .6); St.shovel(ctx, 160 + i * 140, lerp(-100, 520, ease.in(p)) - 60, (i % 2 ? .2 : -.2), 1); }
    PK.tag(ctx, '1748', lt);
    PK.big(ctx, 'THE SHOVELS ARRIVE', 640, 140, 54, clamp(lt / .5), { col: '#f6c945' });
  });
  for (let i = 0; i < 8; i++) S.fx('y1748', 'thud', .55 + i * .12, .4);
  S.cut('charles', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9d4b0');
    const sp = since(t, 'spain', .6);
    who(ctx, 'king', 330, 700, 1.6, { dir: 1, t, face: { eyes: 'half', mouth: 'smirk', brows: 'up' } });
    PK.nameCard(ctx, 'Charles of Bourbon', sp > 0 ? 'King of Naples → later King Charles III of Spain' : 'King of Naples', 330, 210, clamp(lt / .4), { px: 24 });
    const al = since(t, 'alcubierre', .5);
    if (al > 0) { who(ctx, 'alcub', 900, 700, 1.5, { dir: -1, t, face: { eyes: 'dot', mouth: 'smile', brows: 'up' }, armL: [-30, -30], holdL: (c, x, y) => St.shovel(c, x, y + 20, -.3, .6) }); PK.nameCard(ctx, 'Rocque Joaquín de Alcubierre', 'engineer', 900, 250, al, { px: 22 }); }
  });
  S.cut('herculaneum', (ctx, lt, d, t) => {
    const B = St.BAY; cam(ctx, 2.2, 720, 400);
    St.bayMap(ctx, {});
    St.town(ctx, 'Herculaneum', ...B.herc, 1, { dx: -40 }); St.town(ctx, 'Pompeii', ...B.pompeii, 1, { dx: 30 });
    St.shovel(ctx, B.herc[0] + 16, B.herc[1] - 30, -.3, .35);
    const m = since(t, 'moves', 1.5);
    if (m > 0) { const e = St.route(ctx, [B.herc, [720, 400], B.pompeii], m); if (e) St.shovel(ctx, e[0] + 10, e[1] - 30, -.3, .35); }
    PK.reset(ctx);
    if (m > 0) { PL.lbl(ctx, 'ash here: easier to dig', 640, 640, m * 2 - 1, { px: 22 }); }
  });
  S.cut('nomistake', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    const s = since(t, 'notscience', .5);
    if (s > 0) { PL.lbl(ctx, 'SCIENCE', 400, 300, s, { px: 40 }); PK.cross(ctx, 400, 300, 90, since(t, 'notscience', .8) * 1.3 - .3); }
    const tr = since(t, 'treasure', .6);
    if (tr > 0) PK.scaled(ctx, 900, 380, pop(tr), c => { P(c, '#8a5a34', 3, q => q.rect(-120, -40, 240, 120)); P(c, '#a06a3e', 3, q => { q.moveTo(-120, -40); q.quadraticCurveTo(0, -130, 120, -40); q.closePath(); }); for (let i = 0; i < 9; i++) P(c, '#f0c43c', 2, q => q.arc(-90 + i * 22, -50 - (i % 3) * 10, 12, 0, 7)); text(c, "FOR THE KING'S PALACE", 0, 120, { px: 20, w: 700 }); });
  });
  S.fx('notscience', 'boing', .2, .5); S.fx('treasure', 'coin');
  S.cut('skc1', (ctx, lt, d, t) => {
    // throne room skit
    PL.paperBg(ctx, '#d9b48a');
    P(ctx, '#b8322b', 0, c => c.rect(-100, 560, W + 200, 200)); for (const x of [120, 1160]) { P(ctx, '#e9d4b0', 3, c => c.rect(x - 30, 60, 60, 500)); }
    P(ctx, '#c99a45', 4, c => { c.moveTo(220, 690); c.lineTo(220, 330); c.quadraticCurveTo(320, 270, 420, 330); c.lineTo(420, 690); c.closePath(); });
    const kT = PL.talk(t, 'skc1', 'skc2') + PL.talk(t, 'skc4', 'skc5') + PL.talk(t, 'skc6', 'y1763'), aT = PL.talk(t, 'skc2', 'skc4') + PL.talk(t, 'skc5', 'skc6');
    who(ctx, 'king', 320, 690, 1.45, { dir: 1, t, sit: false, face: { eyes: t > A('skc4') ? 'wide' : 'half', mouth: t > A('skc6') ? 'grin' : 'flat', brows: t > A('skc4') ? 'up' : 'calm', talk: kT }, armR: t > A('skc6') ? [50, -40] : [10, 40] });
    who(ctx, 'alcub', 860, 690, 1.45, { dir: -1, t, face: { eyes: t > A('skc5') ? 'dot' : 'happy', mouth: t > A('skc5') ? 'wavy' : 'grin', brows: t > A('skc4') ? 'worried' : 'up', talk: aT, sweat: t > A('skc4') ? t : 0 }, armL: t < A('skc4') ? [-50, -40] : [-10, 40], holdL: t < A('skc4') ? (c, x, y) => St.scroll(c, x, y - 20, 50, 70, -.2) : null });
    PL.say(ctx, t, 'skc1', 'skc2', 'Did you find anything?', 380, 200, [340, 330], { px: 24 });
    PL.say(ctx, t, 'skc2', 'skc4', "Your Majesty, we've uncovered a Roman town! Streets, homes, the daily lives of thousands —", 860, 200, [860, 340], { px: 22, maxW: 380 });
    PL.say(ctx, t, 'skc4', 'skc5', 'Is any of it… shiny?', 380, 200, [340, 330], { px: 24 });
    PL.say(ctx, t, 'skc5', 'skc6', "…There's a statue?", 860, 220, [860, 340], { px: 24 });
    PL.say(ctx, t, 'skc6', 'y1763', 'Bring me the statue.', 380, 200, [340, 330], { px: 24 });
    if (t > A('skc6') + .6) { const p = clamp((t - A('skc6') - .6) / 1.2); F.person(ctx, lerp(1400, 1060, ease.out(p)), 690, 1.1, { body: 'toga', col: '#e6e1d6', col2: '#efeae0', legs: '#e6e1d6', shoes: '#d6cdbd', gloves: '#e6e1d6', hair: 'curly', hairCol: '#d6cdbd', face: { eyes: 'closed', mouth: 'flat' } }); }
  });
  S.fx('skc6', 'tada', .3, .5);
  S.cut('y1763', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    P(ctx, '#d6cdbd', 4, c => c.roundRect(340, 170, 600, 170, 8));
    const k = clamp(lt / 1.8); ctx.save(); ctx.beginPath(); ctx.rect(340, 170, 600 * k, 170); ctx.clip(); text(ctx, 'RES PVBLICA', 640, 230, { font: '700 46px Georgia, serif', col: '#4a4038' }); text(ctx, 'POMPEIANORVM', 640, 290, { font: '700 46px Georgia, serif', col: '#4a4038' }); ctx.restore();
    PK.tag(ctx, '1763', lt);
    PL.lbl(ctx, '"the community of the Pompeians"', 640, 400, since(t, 'community', .4), { px: 24 });
    const f = since(t, 'fifteenyrs', .5);
    if (f > 0) { St.calendar(ctx, 400, 560, 'DIGGING SINCE', '1748', '', .8, { px: 44 }); PK.arrow(ctx, 500, 560, 760, 560, f, { col: '#2b2420' }); St.calendar(ctx, 880, 560, 'CONFIRMED', '1763', '', .8 * pop(clamp(f * 1.5 - .5)), { px: 44 }); PL.lbl(ctx, '15 years', 630, 500, f, { px: 22, col: '#c0392b' }); }
  });
  S.cut('richkids', (ctx, lt, d, t) => {
    // the Grand Tour: young aristocrats sketching the freshly dug ruins
    PL.day(ctx, t, { gy: 500, vesuvius: true, vx: 1050, vs: .55, smoke: .4 });
    for (const [x, h] of [[200, 160], [330, 120], [440, 190]]) { P(ctx, '#d9cbb0', 3, c => c.rect(x, 560 - h, 90, h)); for (let i = 0; i < 3; i++) P(ctx, '#e9dcc0', 2.4, c => c.rect(x + 10 + i * 26, 560 - h - 40, 16, 40)); }
    // easel + painter
    L(ctx, [[760, 690], [800, 470]], 5); L(ctx, [[860, 690], [820, 470]], 5); P(ctx, '#fff', 3, c => c.rect(740, 450, 140, 110)); for (const [x, h] of [[760, 40], [790, 30], [820, 50]]) P(ctx, '#d9cbb0', 1.6, c => c.rect(x, 540 - h, 18, h));
    who(ctx, 'tourist18', 940, 700, 1.25, { dir: -1, t, face: { eyes: 'dot', mouth: 'smile', brows: 'up' }, armL: [-50, -30 + Math.sin(t * 10) * 4], holdL: (c, x, y) => L(c, [[x, y], [x - 20, y - 10]], 3, '#7a5a3a') });
    who(ctx, 'tourist18', 620, 700, 1.15, { dir: 1, col: '#8b5a8a', hat: 'none', face: { eyes: 'happy', mouth: 'grin' }, armR: [40, -40], holdR: (c, x, y) => P(c, '#f2e6c4', 2, q => q.rect(x - 10, y - 30, 40, 30)) });
    PK.tag(ctx, 'the Grand Tour', lt);
    PL.lbl(ctx, 'young aristocrats, writers, artists', 640, 130, since(t, 'aristocrats', .4), { px: 24 });
    if (t > A('ultimate')) PK.stamp(ctx, 'ULTIMATE STOP', 340, 240, since(t, 'ultimate', 1), { px: 40, col: '#2f7a46' });
  });
  S.fx('ultimate', 'stamp');

  // ================= Beat 9: Fiorelli and the casts =================
  S.over('fiorelli', 'takesover', (ctx, lt) => PK.chapter(ctx, 'FIORELLI AND THE STORIES WE TOLD', lt, 2.6));
  S.cut('fiorelli', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    for (const [x, n] of [[180, 'digger'], [360, 'tourist18'], [920, 'king'], [1100, 'digger']]) who(ctx, n, x, 700, 1.1, { dir: x < 640 ? 1 : -1, t, face: { eyes: 'happy', mouth: 'grin' }, armR: [20, -40], holdR: (c, hx, hy) => { for (let j = 0; j < 3; j++) P(c, '#f0c43c', 2, q => q.arc(hx - 10 + j * 10, hy - 12 - j * 4, 9, 0, 7)); } });
    who(ctx, 'fiorelli', 640, 700, 1.5, { dir: 0, t, face: { eyes: 'dot', mouth: 'flat', brows: 'calm' }, armL: [-30, 0], holdL: (c, x, y) => { P(c, '#2b4a6a', 2.4, q => q.rect(x - 22, y - 30, 40, 54)); }, armR: [30, -10], holdR: (c, x, y) => { P(c, '#e7c46a', 2, q => q.rect(x - 4, y - 60, 10, 90)); } });
    PK.nameCard(ctx, 'Giuseppe Fiorelli', 'archaeologist', 640, 200, clamp(lt / .4));
    PK.phon(ctx, 'Fiorelli', 'fyoh-REL-ee', 1000, 200, since(t, 'fyoh', .4) * (1 - since(t, 'takesover', .4)));
    PL.lbl(ctx, 'treasure chest → crime scene', 640, 100, clamp(lt / .4) * 1.5 - .5, { px: 24 });
  });
  S.cut('takesover', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    // the site as a numbered grid
    const g = since(t, 'order', 1);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const k = clamp(g * 24 - (r * 6 + c)); if (k <= 0) continue; P(ctx, '#d9cbb0', 2.4, q => q.rect(420 + c * 120, 180 + r * 90, 110, 80)); text(ctx, (r + 1) + '.' + (c + 1), 475 + c * 120, 220 + r * 90, { px: 16, w: 700, col: '#7a6a5a' }); }
    const w = since(t, 'writedown', .5);
    if (w > 0) PK.scaled(ctx, 220, 380, pop(w), c => { PK.paper(c, -140, -180, 280, 360, { fill: '#fff' }); text(c, 'WRITE EVERYTHING', 0, -146, { px: 18, w: 700 }); text(c, 'DOWN', 0, -122, { px: 18, w: 700 }); for (let i = 0; i < 10; i++) L(c, [[-110, -90 + i * 26], [-110 + 220 * clamp(w * 10 - i), -90 + i * 26]], 3, 'rgba(70,64,58,.5)'); });
    PL.lbl(ctx, 'DIG IN ORDER', 780, 140, since(t, 'order', .4), { px: 24 });
    PL.lbl(ctx, 'TREAT THE TOWN AS A TOWN', 780, 590, since(t, 'asatown', .4), { px: 26 });
  });
  S.fx('writedown', 'type'); S.fx('order', 'pop');

  // the casts: abstract, respectful shapes (no faces, no detail)
  const CAST = '#bdb6aa';
  function castShape(ctx, x, y, s, kind = 0, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const col = o.col || CAST;
    if (kind === 0) { P(ctx, col, 3, c => c.ellipse(0, 0, 70, 26, -.1, 0, 7)); P(ctx, col, 3, c => c.arc(-82, -8, 22, 0, 7)); P(ctx, col, 3, c => c.ellipse(60, 18, 40, 14, .6, 0, 7)); }
    if (kind === 1) { P(ctx, col, 3, c => c.ellipse(0, 0, 60, 30, .2, 0, 7)); P(ctx, col, 3, c => c.arc(-66, -26, 22, 0, 7)); P(ctx, col, 3, c => c.ellipse(-50, -50, 12, 30, -.4, 0, 7)); }
    if (kind === 2) { P(ctx, col, 3, c => c.ellipse(0, 0, 70, 28, 0, 0, 7)); P(ctx, col, 3, c => c.arc(-84, -6, 22, 0, 7)); P(ctx, col, 3, c => c.ellipse(-10, -26, 30, 18, 0, 0, 7)); P(ctx, col, 3, c => c.arc(-44, -40, 14, 0, 7)); if (o.bracelet) P(ctx, '#e7b84a', 2.4, c => c.ellipse(20, -20, 10, 6, 0, 0, 7)); }
    ctx.restore();
  }
  S.mood('y1863', 'gentle');
  S.cut('y1863', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a4440', '#1e1a18');
    PK.tag(ctx, '1863', lt);
    const steps = [['hardened', 'ash hardens around a body'], ['hollow', 'the body decays: a hollow remains'], ['poured', 'liquid plaster poured in'], ['chipped', 'the ash chipped away']];
    steps.forEach(([k, s], i) => {
      const p = since(t, k, .5); if (p <= 0) return;
      const x = 190 + i * 300;
      PK.scaled(ctx, x, 370, pop(p), c => {
        PK.paper(c, -130, -120, 260, 240, { fill: '#e9e2d4' });
        if (i < 3) P(c, '#9a948c', 2, q => q.rect(-110, -100, 220, 170));
        if (i === 0) castShape(c, 10, -10, .9, 0, { col: '#7a6a5a' });
        if (i === 1) castShape(c, 10, -10, .9, 0, { col: '#3a3430' });
        if (i === 2) { castShape(c, 10, -10, .9, 0, { col: '#3a3430' }); c.save(); c.beginPath(); c.rect(-110, -100 + 170 * (1 - clamp((t - A('poured')) / 3)), 220, 170); c.clip(); castShape(c, 10, -10, .9, 0, { col: '#f4f0e6' }); c.restore(); L(c, [[60, -100], [40, -40]], 6, '#f4f0e6'); }
        if (i === 3) { castShape(c, 10, -10, .9, 0, { col: '#f0ebe0' }); }
        text(c, s, 0, 96, { px: 15, w: 700, maxW: 240 });
      });
    });
  });
  S.cut('people', (ctx, lt, d, t) => {
    // museum: casts in glass cases, viewed quietly from a distance
    P(ctx, '#d9d2c4', 0, c => c.rect(-100, -100, W + 200, 600)); P(ctx, '#a8a092', 0, c => c.rect(-100, 500, W + 200, 300)); L(ctx, [[-100, 500], [W + 100, 500]], 3);
    cam(ctx, lerp(1.0, 1.06, lt / d), 640, 400);
    for (let i = 0; i < 3; i++) { const x = 260 + i * 380; P(ctx, '#8a7a6a', 3, c => c.rect(x - 140, 470, 280, 70)); castShape(ctx, x, 448, 1.1, i); ctx.save(); ctx.globalAlpha = .18; P(ctx, '#cfe6f0', 3, c => c.rect(x - 150, 330, 300, 140)); ctx.restore(); P(ctx, null, 3, c => c.rect(x - 150, 330, 300, 140)); }
    const v = since(t, 'powerful', 1);
    if (v > 0) for (let i = 0; i < 3; i++) F.stamp(ctx, F.roman(400 + i, { dir: 0, face: { eyes: 'dot', mouth: 'flat', brows: 'sad' } }), 300 + i * 340, 720, 1.0, false);
    const labels = [['curled', 'curled on their sides'], ['raised', 'arms raised'], ['covered2', 'faces covered']];
    labels.forEach(([k, s], i) => PL.lbl(ctx, s, 260 + i * 380, 290, since(t, k, .5), { px: 18 }));
  });
  S.cut('gavestories', (ctx, lt, d, t) => {
    P(ctx, '#d9d2c4', 0, c => c.rect(-100, -100, W + 200, 600)); P(ctx, '#a8a092', 0, c => c.rect(-100, 500, W + 200, 300));
    for (let i = 0; i < 2; i++) { const x = 400 + i * 480; P(ctx, '#8a7a6a', 3, c => c.rect(x - 160, 470, 320, 70)); if (i === 0) { castShape(ctx, x, 448, 1.15, 2, { bracelet: true }); } else { castShape(ctx, x - 40, 448, 1.0, 0); castShape(ctx, x + 50, 430, .9, 1); } }
    const lbls = [['bracelet', 0, 'THE MOTHER PROTECTING HER CHILD'], ['pair', 1, 'TWO SISTERS IN A FINAL EMBRACE']];
    lbls.forEach(([k, i, s]) => { const p = since(t, k === 'bracelet' ? 'motherst' : 'sisters', .4); if (p <= 0) return; const x = 400 + i * 480; PK.scaled(ctx, x, 260, pop(p), c => { P(c, '#fff', 3, q => q.rect(-200, -34, 400, 68)); text(c, s, 0, 0, { px: 18, w: 700, maxW: 380 }); }); if (t > A('guesses')) { PK.qmark(ctx, x + 210, 230, 60, since(t, 'guesses', .4)); } });
    PL.lbl(ctx, 'adult with a gold bracelet, holding a child', 400, 620, since(t, 'bracelet', .4), { px: 16 });
    const g = since(t, 'guides', .5);
    if (g > 0 && t < A('guesses')) { who(ctx, 'guide', 640, 720, 1.1, { dir: 0, t, face: { eyes: 'happy', mouth: 'open' }, armR: [20, -70], holdR: (c, x, y) => { L(c, [[x, y], [x, y - 60]], 3); P(c, '#e2453a', 2, q => { q.moveTo(x, y - 60); q.lineTo(x + 30, y - 52); q.lineTo(x, y - 44); q.closePath(); }); } }); }
    if (t > A('modern')) PL.lbl(ctx, 'guesses, based on how the bodies looked to modern eyes', 640, 120, since(t, 'modern', .4), { px: 20 });
  });
  S.cut('y2024', (ctx, lt, d, t) => {
    // the lab
    P(ctx, '#e9eef0', 0, c => c.rect(-100, -100, W + 200, 600)); P(ctx, '#b8c4ca', 0, c => c.rect(-100, 520, W + 200, 300)); L(ctx, [[-100, 520], [W + 100, 520]], 3);
    const inst = ['Harvard', 'University of Florence', 'Max Planck Institute'], ks = ['harvard', 'florence', 'maxplanck'];
    inst.forEach((s, i) => PL.lbl(ctx, s, 240 + i * 400, 100, since(t, ks[i], .4), { px: 22, fill: '#fff' }));
    PK.tag(ctx, '2024', lt);
    P(ctx, '#f4f2ee', 3, c => c.rect(160, 470, 960, 30));
    // 14 sample vials; a handful light up with usable DNA
    const sm = since(t, 'sampled', .5);
    for (let i = 0; i < 14; i++) { const x = 230 + i * 60, lit = [1, 4, 7, 9, 12].includes(i) && t > A('sampled') + 1.2; P(ctx, lit ? '#9fe0a8' : '#dfe6ea', 2.4, c => c.roundRect(x - 10, 400, 20, 70, 8)); if (lit) { ctx.save(); ctx.globalAlpha = .4; P(ctx, '#9fe0a8', 0, c => c.arc(x, 430, 24, 0, 7)); ctx.restore(); } }
    if (sm > 0) { PL.lbl(ctx, '14 casts sampled', 420, 330, sm, { px: 20 }); PL.lbl(ctx, 'usable DNA: a handful', 860, 330, since(t, 'sampled', .5) * 2 - 2, { px: 20, col: '#2f7a46' }); }
    who(ctx, 'scientist', 180, 720, 1.2, { dir: 1, t, face: { eyes: 'dot', mouth: 'flat', brows: 'up' }, armR: [40, -30] });
    who(ctx, 'scientist', 1110, 720, 1.2, { dir: -1, hair: 'short', hairCol: '#5a3a24', beard: 'full', t, face: { eyes: 'dot', mouth: 'o', brows: 'up' }, armL: [-40, -30] });
  });
  S.cut('wasman', (ctx, lt, d, t) => {
    P(ctx, '#d9d2c4', 0, c => c.rect(-100, -100, W + 200, 600)); P(ctx, '#a8a092', 0, c => c.rect(-100, 500, W + 200, 300));
    P(ctx, '#8a7a6a', 3, c => c.rect(440, 470, 400, 70)); castShape(ctx, 640, 448, 1.4, 2, { bracelet: true });
    // the label flips
    const f = clamp((lt - .4) / .5), sx = Math.abs(Math.cos(f * Math.PI));
    ctx.save(); ctx.translate(640, 250); ctx.scale(sx, 1); P(ctx, '#fff', 3, c => c.rect(-220, -40, 440, 80)); text(ctx, f < .5 ? '"THE MOTHER"' : 'A MAN', 0, 2, { font: PK.DISPLAY(40), col: f < .5 ? '#2b2420' : '#c0392b' }); ctx.restore();
    const u = since(t, 'unrelated', .5);
    if (u > 0) { L(ctx, [[540, 350], [640, 320], [740, 350]], 4, '#7a6a5a'); PK.cross(ctx, 640, 330, 26, u * 1.3); PL.lbl(ctx, 'not related to the child', 640, 640, u, { px: 22 }); }
  });
  S.fx('wasman', 'paper', .4); S.fx('wasman', 'sting', .8, .5);
  S.cut('genetics', (ctx, lt, d, t) => {
    St.italy(ctx); const I = St.IT;
    cam(ctx, 1, 640, 360);
    for (let i = 0; i < 4; i++) { const k = clamp((lt - i * .3) / 1.2); St.route(ctx, [[1280, 420 + i * 70], [1050, 470 + i * 20], I.pompeii], k, { col: '#c0563c', w: 5 }); }
    PL.lbl(ctx, 'recent arrivals from the eastern Mediterranean', 900, 660, clamp(lt / .5), { px: 20 });
    St.town(ctx, 'Pompeii', ...I.pompeii, 1, { col: '#c0392b', dx: -30, dy: 24 });
    const c = since(t, 'crossroads', .5);
    if (c > 0) { PK.reset(ctx); PL.dim(ctx, .5 * c); PK.scaled(ctx, 640, 420, pop(c), cc => { L(cc, [[0, 160], [0, -160]], 10); L(cc, [[0, 160], [0, -160]], 6, '#8a6240'); const sg = [['ROME', -.15, -110], ['ALEXANDRIA', .12, -50], ['ATHENS', -.1, 10], ['ANTIOCH', .15, 70]]; for (const [s, r, y] of sg) { cc.save(); cc.translate(0, y); cc.rotate(r); P(cc, '#c9a27a', 3, q => q.rect(-10, -20, 170, 40)); text(cc, s, 75, 1, { px: 18, w: 700 }); cc.restore(); } }); PK.big(ctx, 'A CROSSROADS', 640, 140, 60, c, { col: '#f6c945' }); }
  });
  S.cut('overcorrect', (ctx, lt, d, t) => {
    P(ctx, '#d9d2c4', 0, c => c.rect(-100, -100, W + 200, 600)); P(ctx, '#a8a092', 0, c => c.rect(-100, 500, W + 200, 300));
    P(ctx, '#8a7a6a', 3, c => c.rect(440, 470, 400, 70)); castShape(ctx, 640, 448, 1.4, 2, { bracelet: true });
    const k = since(t, 'moving', .8);
    PK.scaled(ctx, 640, 250, 1, c => { P(c, '#fff', 3, q => q.rect(-260, -40, 520, 80)); text(c, k > 0 ? 'A man holding a child.' : 'A man holding an unrelated child.', 0, 2, { font: PK.HAND(40) }); });
    PL.lbl(ctx, 'researchers: careful not to overcorrect', 640, 120, clamp(lt / .4), { px: 22 });
    PL.lbl(ctx, 'not less moving', 400, 640, since(t, 'moving', .4), { px: 22 }); PL.lbl(ctx, '…if anything, more', 860, 640, since(t, 'more', .4), { px: 22 });
    PL.lbl(ctx, "it's just true", 640, 340, since(t, 'true', .4), { px: 24, col: '#2f7a46' });
  });
  S.cut('burial4', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a3a33', '#241c1a');
    PK.burials(ctx, 4, clamp(lt / 1.2), W / 2, 160, { label: 'BURIAL #4 — BY OUR STORIES' });
    // storybooks stacked over a little cast
    const k = since(t, 'comforting', 3);
    castShape(ctx, 640, 640, .8, 2, { col: '#9a948a' });
    for (let i = 0; i < Math.floor(k * 7); i++) { ctx.save(); ctx.translate(640 + (i % 2 ? 12 : -12), 620 - i * 36); ctx.rotate((i % 3 - 1) * .05); P(ctx, ['#b9473a', '#3c6fb6', '#7f9f5a', '#d9a441'][i % 4], 3, c => c.roundRect(-110, -16, 220, 32, 4)); text(ctx, ['LEGEND', 'MYTH', 'STORY', 'GUESS'][i % 4], 0, 1, { px: 16, w: 700, col: '#fff' }); ctx.restore(); }
    if (t > A('again4')) PL.dim(ctx, .6 * since(t, 'again4', .4));
    if (t > A('again4')) PK.againCard(ctx, since(t, 'again4', 1.2), W / 2, 330);
  });
  S.fx('burial4', 'thud'); S.fx('again4', 'stamp', .1); S.fx('again4', 'stamp', .4); S.fx('again4', 'stamp', .7);
})(window);
