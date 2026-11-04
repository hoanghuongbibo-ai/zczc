/* Beat 10 (bombs + a wall that gave up), Beat 11 (too popular to die), Beat 12 (so when did Pompeii die?) + CTA #2: 1047 – 1411 s. */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, S = G.PS, T = G.Toon, PL = G.PL;
  const { W, H, P, L, text, A, since, pop } = PK, { clamp, lerp, ease } = T, cam = S.cam;
  const who = PL.who;

  function plane(ctx, x, y, s = 1, o = {}) {
    PK.scaled(ctx, x, y, s, c => {
      const col = o.col || '#7a8468';
      P(c, col, 3, q => { q.moveTo(-110, 0); q.quadraticCurveTo(-100, -18, -40, -16); q.lineTo(90, -12); q.quadraticCurveTo(120, -6, 118, 4); q.lineTo(-100, 10); q.closePath(); });
      P(c, col, 3, q => { q.moveTo(-10, -4); q.lineTo(30, -4); q.lineTo(70, 46); q.lineTo(50, 46); q.closePath(); });
      P(c, col, 3, q => { q.moveTo(-90, -6); q.lineTo(-110, -36); q.lineTo(-96, -36); q.lineTo(-70, -8); q.closePath(); });
      for (const dx of [20, 50]) P(c, '#5a6048', 2.4, q => q.ellipse(dx + 10, 18 + (dx - 20) * .6, 10, 6, 0, 0, 7));
      P(c, '#bfe3f7', 2, q => q.ellipse(84, -10, 14, 5, 0, 0, 7));
      if (o.crumpled) { L(c, [[-20, -12], [0, 4], [20, -10]], 3); }
    }, o.rot || 0);
  }
  function blast(ctx, x, y, k, s = 1) { if (k <= 0 || k >= 1) return; ctx.save(); ctx.globalAlpha = 1 - k * .8; for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; P(ctx, i % 2 ? '#f2a03a' : '#e8693a', 2.4, c => c.arc(x + Math.cos(a) * 40 * s * k, y + Math.sin(a) * 26 * s * k - 20 * k, 26 * s * (1 - k * .5), 0, 7)); } P(ctx, '#fff3c0', 0, c => c.arc(x, y - 10, 22 * s * (1 - k), 0, 7)); ctx.restore(); St.puff(ctx, x, y - 40, 90 * s, k, '#6a625a'); }
  function bombDrop(ctx, x, y0, y1, k) { if (k <= 0 || k >= 1) return; G.PBomb(ctx, x, lerp(y0, y1, k * k), .5); }
  const ruins = (ctx, t, o = {}) => {
    St.sky(ctx, o.top || '#c9b89a', o.bot || '#efe0c0'); St.vesuvius(ctx, 1000, 400, .7, { t, smoke: o.smoke || 0 });
    St.ground(ctx, 520, '#b5a47c');
    for (const [x, w, h] of [[80, 120, 120], [230, 90, 170], [360, 140, 100], [540, 110, 150], [690, 160, 120], [890, 100, 160], [1030, 140, 110]]) { P(ctx, '#d9cbb0', 3, c => { c.moveTo(x, 560); c.lineTo(x, 560 - h); c.lineTo(x + w * .3, 560 - h + 12); c.lineTo(x + w * .6, 560 - h - 6); c.lineTo(x + w, 560 - h + 20); c.lineTo(x + w, 560); c.closePath(); }); P(ctx, '#b8473a', 0, c => c.rect(x + 2, 520, w - 4, 38)); }
    St.ground(ctx, 560, '#b5a47c');
  };

  // ================= Beat 10 =================
  S.over('y1943', 'ww2', (ctx, lt) => PK.chapter(ctx, 'THE 20TH CENTURY: BOMBS AND A WALL', lt, 1.8));
  S.mood('y1943', 'brass');
  S.cut('y1943', (ctx, lt, d, t) => {
    // newsreel countdown then the Salerno map
    if (lt < 2.2) { P(ctx, '#d8d0bc', 0, c => c.rect(-100, -100, W + 200, H + 200)); P(ctx, null, 4, c => c.arc(640, 360, 220, 0, 7)); L(ctx, [[640, 100], [640, 620]], 3); L(ctx, [[380, 360], [900, 360]], 3); const a = lt * 6.283; P(ctx, 'rgba(60,50,40,.3)', 0, c => { c.moveTo(640, 360); c.arc(640, 360, 220, -Math.PI / 2, -Math.PI / 2 + (a % 6.283)); c.closePath(); }); text(ctx, '' + Math.max(1, 3 - Math.floor(lt / .73)), 640, 370, { font: PK.DISPLAY(160) }); PK.tag(ctx, '1943 — World War II', lt); return; }
    const B = St.BAY; cam(ctx, 1.1, 760, 470);
    St.bayMap(ctx, {});
    St.town(ctx, 'Pompeii', ...B.pompeii, 1, { dx: 40 });
    St.town(ctx, 'Salerno', 1150, 600, 1, { dx: 0, dy: 24 });
    const s = since(t, 'salerno', 1);
    PK.arrow(ctx, 1150, 760, 1150, 620, s, { col: '#3c6fb6', w: 10 }); if (s > 0) text(ctx, 'ALLIES', 1210, 700, { px: 22, w: 700, col: '#3c6fb6', stroke: 5, strokeCol: '#f4ecd8' });
    const g = since(t, 'counter', 1);
    PK.arrow(ctx, 950, 260, 1080, 520, g, { col: '#4a4a52', w: 10 }); if (g > 0) text(ctx, 'GERMAN FORCES', 900, 240, { px: 20, w: 700, stroke: 5, strokeCol: '#f4ecd8' });
    const r = since(t, 'slowdown', 1.5);
    if (r > 0) { ctx.save(); ctx.setLineDash([16, 6]); L(ctx, [[600, 300], [760, 420], [880, 470], [1000, 520]].slice(0, 1 + Math.ceil(r * 3)), 6, '#4a4a52'); ctx.restore(); text(ctx, 'roads + railways', 700, 330, { px: 20, w: 700, stroke: 5, strokeCol: '#f4ecd8' }); }
    PK.tag(ctx, '1943', lt);
  });
  S.fx('y1943', 'tick', .1); S.fx('y1943', 'tick', .83); S.fx('y1943', 'tick', 1.56); S.fx('salerno', 'whoosh');
  S.cut('bombroads', (ctx, lt, d, t) => {
    St.sky(ctx, '#9fbccc', '#e9e0c8'); St.ground(ctx, 560, '#b5a47c');
    P(ctx, '#7a7268', 0, c => c.rect(-100, 600, W + 200, 30)); for (let x = -100; x < W + 100; x += 40) L(ctx, [[x, 596], [x, 634]], 3, '#5a4a3a');
    for (let i = 0; i < 3; i++) plane(ctx, ((lt * 160 + i * 300) % 1700) - 200, 120 + i * 50, .8);
    // the target and where the bombs actually land
    const k = since(t, 'inaccurate', .5);
    if (k > 0) { PK.reset(ctx); PK.scaled(ctx, 640, 380, pop(k), c => { for (const [r, col] of [[160, '#fff'], [120, '#d0392b'], [80, '#fff'], [40, '#d0392b']]) P(c, col, 3, q => q.arc(0, 0, r, 0, 7)); }); const hits = [[-320, -200], [380, 140], [-280, 220], [460, -170], [140, 260], [-500, 40]]; hits.forEach(([dx, dy], i) => { const p = clamp((lt - .8 - i * .25) / .3); if (p > 0) { P(ctx, '#2b2420', 0, c => c.arc(640 + dx, 380 + dy, 12, 0, 7)); blast(ctx, 640 + dx, 380 + dy, clamp((lt - .8 - i * .25) / .8), .5); } }); PL.lbl(ctx, 'wildly inaccurate', 640, 640, k, { px: 26 }); }
  });
  S.fx('bombroads', 'plane');
  S.cut('augsep', (ctx, lt, d, t) => {
    const sh = PK.shake(t, A('augsep') + 1.2, 6, .6); ctx.translate(sh[0], sh[1]);
    ruins(ctx, t);
    for (let i = 0; i < 6; i++) { const t0 = (i * .9) % (d), p = ((lt - t0) % 3) / 1; const x = 150 + i * 190; bombDrop(ctx, x, -40, 520, p); blast(ctx, x, 540, (p - 1) / 1.2, 1); }
    PK.tag(ctx, 'Aug – Sept 1943', lt);
    PK.counter(ctx, 0, 160, since(t, 'one60', 2), 640, 120, 80, { post: '+', col: '#f4ecd8' });
    if (t > A('one60')) PL.lbl(ctx, 'Allied bombs hit the ancient city', 640, 190, since(t, 'one60', .4), { px: 22 });
  });
  for (let i = 0; i < 5; i++) { S.fx('augsep', 'whistle', i * 1.4, .5); S.fx('augsep', 'explosion', i * 1.4 + 1.1, .5); }
  S.cut('monuments', (ctx, lt, d, t) => {
    ruins(ctx, t);
    const lb = [['forum', 'parts of the Forum', 300, 330], ['faun', 'the House of the Faun', 640, 300], ['museum', "the site's museum", 980, 330]];
    lb.forEach(([k, s, x, y]) => { const p = since(t, k, .4); if (p <= 0) return; PL.lbl(ctx, s, x, y, p, { px: 20 }); St.puff(ctx, x, 480, 80, clamp((t - A(k)) / 1.2), '#8a8278'); PK.arrow(ctx, x, y + 26, x, 440, p, { col: '#c0392b', w: 5 }); });
    PL.lbl(ctx, 'damaged:', 640, 130, clamp(lt / .4), { px: 28 });
  });
  S.cut('pollard', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#d9c7a3');
    for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { P(ctx, '#c9a27a', 3, c => c.rect(640 + i * 100, 220 + r * 110, 90, 100)); P(ctx, '#f4ecd8', 2, c => c.rect(665 + i * 100, 250 + r * 110, 40, 20)); }
    who(ctx, 'historian', 360, 700, 1.5, { dir: 1, t, hair: 'short', hairCol: '#6b5a4a', face: { eyes: 'dot', mouth: 'flat', brows: 'up' }, armR: [36, -20], holdR: (c, x, y) => PK.paper(c, x - 10, y - 40, 60, 46, { fill: '#fff' }) });
    PK.nameCard(ctx, 'Nigel Pollard', 'historian — dug through the military archives', 360, 230, clamp(lt / .4), { px: 22 });
    const s = since(t, 'sideeffect', .5);
    if (s > 0) PK.note(ctx, ['a side effect of aiming at nearby targets'], 820, 120, t - A('sideeffect'), { px: 24 });
    PK.stamp(ctx, 'NOT DELIBERATE', 900, 600, since(t, 'notdeliberate', 1), { px: 40, col: '#2f7a46' });
  });
  S.fx('notdeliberate', 'stamp');
  S.mood('remember', 'pluck');
  S.cut('remember', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#d9c7a3');
    const f = since(t, 'finally', 1.2);
    // the "amazed" wall, shrugging, then giving up
    ctx.save(); ctx.translate(640, 600); ctx.rotate(ease.in(f) * .5); ctx.translate(0, ease.in(f) * 120);
    St.wallStones(ctx, -300, -360, 600, 360, 3, '#e3d4b4');
    text(ctx, 'I am amazed, wall, that you', 0, -260, { font: PK.HAND(34), col: '#4a3a30' }); text(ctx, 'have not fallen in ruins…', 0, -220, { font: PK.HAND(34), col: '#4a3a30' });
    if (f <= 0) { const sh = Math.max(0, Math.sin((lt - 1) * 4)) * 10; L(ctx, [[-300, -360 - sh], [-340, -400 - sh]], 6); L(ctx, [[300, -360 - sh], [340, -400 - sh]], 6); }
    ctx.restore();
    if (f > 0) St.puff(ctx, 640, 600, 260, clamp(f * 1.2), '#c9b48f');
    if (f > .5) St.rubble(ctx, 640, 700, 500, 5);
    bombDrop(ctx, 640, -60, 260, clamp((t - A('finally') + .9) / .9));
  });
  S.fx('remember', 'whistle', 2.2, .5); S.fx('finally', 'crumble'); S.fx('finally', 'boing', 1, .4);
  S.mood('notfinished', 'tension');
  S.cut('notfinished', (ctx, lt, d, t) => {
    St.sky(ctx, '#2a2030', '#7a4a40');
    St.vesuvius(ctx, 640, 520, 1.1, { t, col: clamp(lt / 3), green: false, darkCol: true });
    if (lt > 1) { ctx.save(); ctx.globalAlpha = .6; P(ctx, '#e8693a', 0, c => { c.moveTo(600, 240); c.quadraticCurveTo(560, 400, 420, 520); c.lineTo(460, 520); c.quadraticCurveTo(600, 400, 640, 240); c.closePath(); }); ctx.restore(); }
    St.ground(ctx, 520, '#5a524a');
    PK.tag(ctx, 'March 1944', lt);
    const b = since(t, 'b25', .5);
    if (b > 0) { for (let i = 0; i < 4; i++) plane(ctx, 200 + i * 290, 620 + (i % 2) * 30, .9, { crumpled: true, col: '#6a7058' }); St.ashFall(ctx, t, 200, .8); PL.lbl(ctx, 'dozens of American B-25 bombers wrecked', 640, 150, b, { px: 22 }); }
    PK.caption(ctx, 'according to accounts of the time', t - A('accounts'), 0);
  });
  S.fx('notfinished', 'rumble'); S.fx('y1944', 'boom', 0, .6);
  S.cut('notes', (ctx, lt, d, t) => {
    St.sky(ctx, '#bfe0ee', '#f6ecd2');
    St.cloud(ctx, 640, 560, 3);
    who(ctx, 'elder', 640, 520, 1.5, { dir: 1, t, face: { eyes: 'dot', mouth: 'smile', brows: 'up', look: [1, .5] }, armL: [-20, 10], holdL: (c, x, y) => St.scroll(c, x, y, 50, 70, .2), armR: [30, 0 + Math.sin(t * 18) * 4], holdR: (c, x, y) => L(c, [[x, y], [x + 10, y - 30]], 3, '#4a3a30') });
    PL.lbl(ctx, 'somewhere, Pliny the Elder is taking notes', 640, 100, clamp(lt / .4), { px: 24 });
  });
  S.cut('afterwar', (ctx, lt, d, t) => {
    ruins(ctx, t);
    const k = clamp(lt / 3);
    for (const [x, w] of [[230, 90], [540, 110], [890, 100]]) { P(ctx, '#c9c2b2', 3, c => c.rect(x, 560 - 220 * k, w, 220 * k)); }
    for (const x of [300, 640, 960]) who(ctx, 'digger', x, 690, 1.0, { dir: 1, hat: 'cap', hatCol: '#7a7a7a', body: 'modern', col: '#6a7a8a', legs: '#4a4a52', t, armR: [30, -30 + Math.sin(t * 8) * 8] });
    PL.lbl(ctx, '1940s rebuild', 640, 250, k * 2, { px: 24 });
    const m = since(t, 'mind', .4);
    if (m > 0) PK.scaled(ctx, 1080, 160, pop(m), c => { P(c, '#ffe97a', 2.4, q => q.rect(-90, -60, 180, 120)); text(c, 'remember:', 0, -20, { font: PK.HAND(30) }); text(c, '1940s!', 0, 20, { font: PK.HAND(36), col: '#c0392b' }); }, .05);
    const s = since(t, 'thirtysec', .4);
    if (s > 0) { PK.reset(ctx); text(ctx, '0:' + String(Math.max(0, 30 - Math.floor((t - A('thirtysec')) * 1))).padStart(2, '0'), 200, 160, { font: PK.DISPLAY(60), col: '#f4ecd8', stroke: 8 }); }
  });
  S.mood('nov6', 'drone');
  S.cut('nov6', (ctx, lt, d, t) => {
    PL.street(ctx, t, { top: '#1e2236', bot: '#3a3e56', sun: false, clouds: false, smoke: 0, houses: [[-60, 300, 230], [260, 300, 250, { door: true }], [580, 260, 260, { door: true, win: [60, 200] }], [860, 300, 240], [1180, 200, 230]] });
    PL.dim(ctx, .35, '#101428');
    const c = since(t, 'collapse', 1.6);
    if (c > 0) { P(ctx, '#3a3e56', 0, q => q.rect(560, 150, 300, 330)); St.puff(ctx, 710, 420, 220, c, '#8a8278'); St.rubble(ctx, 710, 470, 300 * clamp(c * 2), 8, '#b8a888'); }
    St.rain(ctx, t, 160, .55);
    PK.tag(ctx, 'November 6, 2010', lt);
    PL.lbl(ctx, 'Schola Armaturarum', 710, 110, since(t, 'schola', .4), { px: 22 }); PL.lbl(ctx, '"House of the Gladiators"', 710, 160, since(t, 'gladiators', .4), { px: 20 });
    if (t > A('nohurt')) { PK.reset(ctx); PL.lbl(ctx, 'nobody hurt', 300, 620, since(t, 'nohurt', .4), { px: 24, col: '#2f7a46' }); }
  });
  S.fx('nov6', 'rainLoop', 0, 1.2); S.fx('collapse', 'crumble');
  S.cut('photos', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3a3a48', '#16161e');
    const papers = [['THE GLOBE TIMES', ['POMPEII', 'COLLAPSE']], ['DAILY COURIER', ['ANCIENT', 'HOUSE FALLS']], ['EVENING POST', ['"A DISGRACE"']]];
    papers.forEach((p, i) => { const k = clamp((lt - i * .4) / .4); if (k <= 0) return; PK.scaled(ctx, 330 + i * 300, 360 + (i % 2) * 30, ease.out(k), c => St.newspaper(c, 0, 0, 300, 230, p[0], p[1], { rot: (i - 1) * .08, pic: (cc, x, y) => St.rubble(cc, x, y + 30, 90, 3) }), 0); });
    if (t > A('embarrass')) PK.stamp(ctx, 'EMBARRASSING', 640, 620, since(t, 'embarrass', 1), { px: 44 });
  });
  S.fx('photos', 'paper'); S.fx('photos', 'paper', .4); S.fx('photos', 'paper', .8);
  S.cut('twist', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    PL.lbl(ctx, "HERE'S THE TWIST", 640, 90, clamp(lt / .4), { px: 30 });
    const k = since(t, 'recon', 1.5);
    St.rubble(ctx, 400, 560, 360 * clamp(k * 1.5), 4, '#c9c2b2'); PL.lbl(ctx, '1940s reconstruction', 400, 620, k, { px: 22 });
    St.rubble(ctx, 900, 560, 110 * clamp(k * 1.5), 9, '#c9b48f'); PL.lbl(ctx, 'original Roman wall', 900, 620, since(t, 'original', .4), { px: 22 });
    const b = since(t, 'bombsfirst', .5);
    if (b > 0) { PK.scaled(ctx, 380, 260, pop(b), c => { G.PBomb(c, 0, 0, 1.4); text(c, 'got it first', 0, 80, { px: 22, w: 700 }); }); }
    const r = since(t, 'rainfinish', .5);
    if (r > 0) PK.scaled(ctx, 900, 260, pop(r), c => { St.cloud(c, 0, 0, .8, '#9fb0c0'); for (let i = 0; i < 5; i++) L(c, [[-50 + i * 25, 20], [-58 + i * 25, 50]], 3, '#5f8fb8'); text(c, 'finished it', 0, 90, { px: 22, w: 700 }); });
  });
  S.cut('burial5', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a3a33', '#241c1a');
    PK.burials(ctx, 5, clamp(lt / 1.2), W / 2, 160, { label: 'BURIAL #5 — BY ITS OWN WALLS' });
    PK.againCard(ctx, clamp((lt - .6) / 1.2), W / 2, 400);
    const a = since(t, 'amazedabout', .5);
    if (a > 0) { PL.dim(ctx, .6 * a); PK.reset(ctx); PK.note(ctx, ['…and that wall finally had', 'something to be amazed about'], 640, 400, t - A('amazedabout'), { hand: true, px: 46 }); }
  });
  S.fx('burial5', 'thud'); S.fx('burial5', 'stamp', .8); S.fx('burial5', 'stamp', 1.1); S.fx('burial5', 'stamp', 1.4);
  S.mood('money', 'pluck');
  S.cut('money', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 520 });
    for (let i = 0; i < 6; i++) { const p = clamp((lt - i * .15) / .5); PK.scaled(ctx, 200 + i * 170, lerp(-80, 600, ease.in(p)) - (p >= 1 ? 0 : 0), 1, c => { P(c, '#c9a27a', 3, q => { q.moveTo(-34, 40); q.quadraticCurveTo(-46, -10, -14, -24); q.lineTo(14, -24); q.quadraticCurveTo(46, -10, 34, 40); q.closePath(); }); text(c, '€', 0, 12, { font: PK.FONT(700, 30), col: '#3c7a3a' }); }); }
    const g = since(t, 'gpp', .5);
    if (g > 0) { PK.reset(ctx); PK.big(ctx, 'THE GREAT POMPEII PROJECT', 640, 120, 50, g, { col: '#f6c945' }); PL.lbl(ctx, '2012 — the European Union + Italy', 640, 185, g, { px: 22 }); }
    if (t > A('budget')) { PK.counter(ctx, 0, 105, since(t, 'budget', 2), 640, 330, 84, { post: ' MILLION EUROS', col: '#f4ecd8' }); }
    if (t > A('dollars')) PL.lbl(ctx, '≈ $145 million at the time', 640, 410, since(t, 'dollars', .4), { px: 24 });
  });
  S.fx('budget', 'cash');
  S.cut('drainage', (ctx, lt, d, t) => {
    ruins(ctx, t, { top: '#a8d6ea', bot: '#f7ecd0' });
    const items = [['drainage', 'DRAINAGE', 220], ['shoring', 'SHORING UP THE EDGES', 520], ['security', 'SECURITY', 820], ['maint', 'ACTUAL MAINTENANCE', 1080]];
    items.forEach(([k, s, x], i) => { const p = since(t, k, .4); if (p <= 0) return; PL.lbl(ctx, s, x, 120 + (i % 2) * 60, p, { px: 20 }); PK.tick(ctx, x + 10, 230 + (i % 2) * 60, 16, since(t, k, .6) * 1.2 - .2); });
    if (t > A('drainage')) { P(ctx, '#7a8a9a', 3, c => c.rect(100, 600, 300, 26)); for (let i = 0; i < 3; i++) { const p = ((t * 1.2 + i / 3) % 1); P(ctx, '#7fb6d9', 0, c => c.arc(110 + p * 280, 613, 6, 0, 7)); } }
    if (t > A('shoring')) { for (const x of [450, 560]) L(ctx, [[x, 560], [x + 60, 420]], 10, '#a0764e'); }
    if (t > A('security')) { P(ctx, '#3a3a40', 3, c => c.roundRect(800, 360, 60, 30, 6)); P(ctx, '#e2453a', 0, c => c.arc(850, 375, 4 + Math.sin(t * 6) * 1, 0, 7)); L(ctx, [[830, 390], [830, 560]], 5); }
    if (t > A('maint')) who(ctx, 'digger', 1080, 690, 1.1, { dir: -1, t, hat: 'cap', hatCol: '#f2c230', body: 'vest', col: '#6d8bb3', legs: '#4a4a52', face: { eyes: 'happy', mouth: 'smile' }, armL: [-40, 10 + Math.sin(t * 6) * 10], holdL: (c, x, y) => { L(c, [[x, y - 20], [x - 20, y + 60]], 5, '#a0764e'); P(c, '#9aa3a8', 2, q => q.ellipse(x - 22, y + 64, 18, 6, 0, 0, 7)); } });
    if (t > A('works')) PK.stamp(ctx, 'IT WORKS', 640, 400, since(t, 'works', 1), { px: 50, col: '#2f7a46' });
    if (t > A('toowell')) { PK.reset(ctx); for (let i = 0; i < 18; i++) F.stamp(ctx, F.cast('tourist', { hatCol: ['#e0605a', '#5f8fb8', '#f2c94c'][i % 3], col: F.TUNICS[i % 9] }), 1300 - ((t - A('toowell')) * 120) + i * 40, 720 - (i % 3) * 14, .8, true); }
  });
  ['drainage', 'shoring', 'security', 'maint'].forEach(k => S.fx(k, 'pop')); S.fx('works', 'stamp');

  // ================= Beat 11: too popular to die =================
  S.over('visitors', 'freesunday', (ctx, lt) => PK.chapter(ctx, 'TODAY: TOO POPULAR TO DIE', lt, 2.2));
  S.mood('visitors', 'market');
  S.cut('visitors', (ctx, lt, d, t) => {
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 640, H); ctx.clip(); ctx.translate(-320, 0); PL.street(ctx, t, {}); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(640, 0, 640, H); ctx.clip(); ctx.translate(320, 0); PL.street(ctx, t, {});
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 340 + i * 70 + r * 25, y = 600 + r * 45; F.stamp(ctx, F.cast('tourist', { hatCol: ['#e0605a', '#5f8fb8', '#f2c94c', '#7f9f5a'][(i + r) % 4], col: F.TUNICS[(i * 3 + r) % 9], face: { eyes: 'happy', mouth: 'grin' }, armR: [10, -70], holdR: null }), x, y, .75, false); L(ctx, [[x + 8, y - 120], [x + 20, y - 190]], 3); P(ctx, '#2b2420', 2, c => c.roundRect(x + 12, y - 210, 18, 26, 4)); }
    ctx.restore(); L(ctx, [[640, 0], [640, H]], 6);
    PK.counter(ctx, 0, 4, clamp(lt / 1.5), 640, 220, 70, { pre: '', post: ' million / year', col: '#f4ecd8', fmt: v => (v < 4 ? v.toFixed(1) : '4+') });
  });
  S.cut('freesunday', (ctx, lt, d, t) => {
    PL.street(ctx, t, {});
    const k = since(t, 'k36', 2);
    const n = Math.floor(20 + 60 * k);
    for (let i = 0; i < n; i++) F.stamp(ctx, F.cast('tourist', { hatCol: ['#e0605a', '#5f8fb8', '#f2c94c', '#7f9f5a'][i % 4], col: F.TUNICS[(i * 5) % 9] }), (i * 97) % 1300 - 10, 560 + ((i * 37) % 160), .55 + ((i * 37) % 160) / 600, i % 2 === 0);
    PK.tag(ctx, 'a free Sunday, October 2024', lt);
    if (t > A('k36')) PK.counter(ctx, 0, 36000, k, 640, 150, 80, { post: '+', col: '#f4ecd8' });
    const b = since(t, 'ballpark', .4);
    if (b > 0) PL.lbl(ctx, '≈ a sold-out big-league ballpark', 640, 230, b, { px: 24 });
    const f = since(t, 'fragile', .4);
    if (f > 0) PK.stamp(ctx, 'FRAGILE', 1000, 380, f * 1.2, { px: 50, col: '#d9a441' });
  });
  S.fx('k36', 'crowd');
  S.cut('cap', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    // turnstile with a counter, cap at 20,000; named tickets print out
    P(ctx, '#9aa3a8', 3, c => c.rect(520, 380, 70, 220)); P(ctx, '#9aa3a8', 3, c => c.rect(690, 380, 70, 220)); const r = t * 3; for (let i = 0; i < 3; i++) L(ctx, [[640, 470], [640 + Math.cos(r + i * 2.09) * 60, 470 + Math.sin(r + i * 2.09) * 20]], 8);
    P(ctx, '#2b2420', 3, c => c.roundRect(470, 220, 340, 110, 10));
    const k = clamp(lt / 3); text(ctx, Math.round(lerp(18800, 20000, k)).toLocaleString('en-US') + ' / 20,000', 640, 275, { font: PK.DISPLAY(38), col: k >= 1 ? '#e2453a' : '#9fe0a8' });
    PK.tag(ctx, 'from November 15, 2024', lt);
    PL.lbl(ctx, 'daily cap: 20,000 visitors', 640, 130, since(t, 'k20', .4), { px: 26 });
    const tk = since(t, 'tickets', .8);
    if (tk > 0) PK.scaled(ctx, 1000, 420 + 40 * (1 - tk), pop(tk), c => { PK.paper(c, -140, -60, 280, 120, { fill: '#fff' }); text(c, 'TICKET', 0, -32, { font: PK.DISPLAY(24) }); text(c, 'Name: YOUR NAME', 0, 6, { font: PK.HAND(30) }); L(c, [[-120, 34], [120, 34]], 2, '#9a8a70'); }, .05);
    const u = since(t, 'uninvited', 3);
    if (u > 0) for (let i = 0; i < 5; i++) { const x = lerp(-100, 1380, (u * 1.2 + i * .12) % 1.4 - .1); F.person(ctx, x, 700, .8, F.cast(i % 2 ? 'vet' : 'tourist', { dir: 1, t, walk: t * 8 + i, face: { eyes: 'happy', mouth: 'grin' }, armR: [14, 40], holdR: (c, hx, hy) => P(c, i % 2 ? '#8a5a34' : '#3c6fb6', 2.6, q => q.roundRect(hx - 16, hy, 32, 26, 4)) })); }
  });
  S.fx('tickets', 'type');
  S.cut('digging', (ctx, lt, d, t) => {
    ruins(ctx, t, { top: '#a8d6ea', bot: '#f7ecd0' });
    for (const [x, n] of [[300, 'arch'], [640, 'arch2'], [980, 'arch3']]) { const ph = Math.sin(t * 4 + x); who(ctx, n, x, 690, 1.1, { dir: x < 640 ? 1 : -1, t, face: { eyes: 'dot', mouth: 'smile', look: [0, 1] }, armR: [20, 20 + ph * 6], holdR: (c, hx, hy) => P(c, '#f2e6c4', 2, q => q.roundRect(hx - 6, hy, 12, 30, 4)) }); }
    const th = since(t, 'third2', .5);
    if (th > 0) PK.scaled(ctx, 1040, 170, pop(th), c => { PK.paper(c, -140, -80, 280, 160, { tape: true }); P(c, '#d9c9a8', 2.4, q => q.ellipse(0, 10, 110, 50, 0, 0, 7)); c.save(); c.beginPath(); c.ellipse(0, 10, 110, 50, 0, 0, 7); c.clip(); P(c, '#7a6a5a', 0, q => q.rect(40, -50, 80, 120)); c.restore(); text(c, '⅓ still underground', 0, 64, { px: 16, w: 700 }); });
    const items = [['rooms', 'ROOMS', 240], ['rooms', 'FRESCOES', 460], ['rooms', 'SCRIBBLES', 680]];
    items.forEach(([k, s], i) => { const p = since(t, k, .4) - i * .6; PL.lbl(ctx, s, 240 + i * 220, 130, clamp(p), { px: 22 }); });
  });
  S.cut('imaging', (ctx, lt, d, t) => {
    P(ctx, '#e9dcc0', 0, c => c.rect(-100, -100, W + 200, H + 200));
    ctx.fillStyle = 'rgba(0,0,0,.05)'; const r = T.rng(9); for (let i = 0; i < 80; i++) ctx.fillRect(r() * W, r() * H, 20 + r() * 80, 2 + r() * 3);
    const sx = lerp(100, 1180, clamp(lt / 4));
    // scanned area reveals faded scribbles
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, sx, H); ctx.clip();
    const notes = ['Successus ♥ Iris', 'you owe me 3 asses', 'Marcus was here', 'CELADUS!', 'the bread is bad', '♥ ♥', 'Crescens ♥', 'Atimetus got me pregnant? no.', 'lol', 'VOTE FOR ME'];
    notes.forEach((s, i) => text(ctx, s, 120 + (i * 233) % 1060, 120 + ((i * 97) % 440), { font: PK.HAND(30), col: i % 3 === 0 ? '#c0507a' : '#4a3a30' }));
    ctx.restore();
    P(ctx, 'rgba(120,200,255,.18)', 0, c => c.rect(sx - 40, 0, 80, H)); L(ctx, [[sx, 0], [sx, H]], 4, '#5fb0e8');
    PK.tag(ctx, '2026: new imaging', lt);
    PL.lbl(ctx, 'dozens of faded scribbles from a single wall', 640, 640, since(t, 'dozens', .4), { px: 22 });
    if (t > A('neverclosed')) { PL.dim(ctx, .5 * since(t, 'neverclosed', .4)); PK.reset(ctx); PK.note(ctx, ['THE COMMENT SECTION', 'never closed'], 640, 360, t - A('neverclosed'), { px: 46, bold0: true }); }
  });
  S.fx('imaging', 'swell'); S.fx('neverclosed', 'ding', 0, .5);

  // ================= Beat 12: so when did Pompeii die? =================
  S.over('back', 'found2018', (ctx, lt) => PK.chapter(ctx, 'SO WHEN DID POMPEII DIE?', lt, 2.2));
  S.mood('back', 'warm');
  S.cut('back', (ctx, lt, d, t) => {
    cam(ctx, 1.08, 640, 380);
    const modern = t > A('found2018');
    St.room(ctx, { paint: .55, note: 1, t, modern });
    if (!modern) who(ctx, 'worker', 520, 640, 1.6, { dir: 1, t, face: { eyes: 'half', mouth: 'flat', look: [1, -.5] }, armR: [44, -60], holdR: (c, x, y) => St.charcoal(c, x + 4, y - 8, .5) });
    else { who(ctx, 'arch', 400, 690, 1.3, { dir: 1, t, face: { eyes: 'wide', mouth: 'grin', look: [1, -.6] } }); PK.tag(ctx, '2018 — a house under renovation', lt); }
    if (t > A('oct17')) PK.note(ctx, ['XVI K NOV', '= October 17'], 640, 520, t - A('oct17'), { px: 36, bold0: true, cols: ['#2b2420', '#c0392b'] });
  });
  S.cut('charcoal', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    // charcoal fades on walls fast → so it must be recent
    for (let i = 0; i < 4; i++) { const a = 1 - i * .3; ctx.save(); ctx.globalAlpha = Math.max(.08, a); text(ctx, 'XVI K NOV', 200 + i * 290, 260, { font: PK.HAND(46) }); ctx.restore(); text(ctx, ['new', '+1 yr?', '+2 yrs?', 'later'][i], 200 + i * 290, 320, { px: 18, w: 700 }); }
    PL.lbl(ctx, "charcoal doesn't usually last long on a wall", 640, 130, clamp(lt / .4), { px: 22 });
    const w = since(t, 'written79', .4);
    if (w > 0) PL.lbl(ctx, '→ written in October 79?', 640, 420, w, { px: 26 });
    const f = since(t, 'fall', .5);
    if (f > 0) for (let i = 0; i < 10; i++) { const p = ((t * .4 + i / 10) % 1); ctx.save(); ctx.translate(100 + i * 120 + Math.sin(t * 2 + i) * 30, p * 760 - 40); ctx.rotate(t * 2 + i); P(ctx, ['#d9822b', '#c0563c', '#e7b84a'][i % 3], 2, c => c.ellipse(0, 0, 14, 8, 0, 0, 7)); ctx.restore(); }
    if (t > A('oct24')) { St.calendar(ctx, 450, 560, 'OCTOBER', '24', 'AD 79?', .8 * pop(since(t, 'oct24', .4))); }
    if (t > A('notaug')) { St.calendar(ctx, 830, 560, 'AUGUST', '24', 'AD 79', .8); PK.cross(ctx, 830, 560, 60, since(t, 'notaug', .6)); }
  });
  S.fx('fall', 'wind', 0, .5);
  S.cut('presswild', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3a3a48', '#16161e');
    const papers = [['THE DAILY TROWEL', ['VESUVIUS DATE', 'WRONG?!']], ['MORNING AMPHORA', ['OCTOBER, NOT', 'AUGUST']]];
    papers.forEach((p, i) => { const k = clamp((lt - i * .3) / .4); PK.scaled(ctx, 380 + i * 520, 330, ease.out(k), c => St.newspaper(c, 0, 0, 340, 250, p[0], p[1], { rot: (i - .5) * .1 }), 0); });
    const h = since(t, 'hedging', .5);
    if (h > 0) { PL.dim(ctx, .5 * h); PK.reset(ctx); PK.scaled(ctx, 640, 400, pop(h), c => { P(c, '#7a3b2e', 3, q => q.roundRect(-220, -140, 440, 280, 10)); P(c, '#f4ecd8', 3, q => q.rect(-200, -125, 400, 250)); text(c, 'Vesuvius erupted on', 0, -80, { px: 22, w: 700 }); text(c, 'Aug? Oct? 24', 0, -40, { font: PK.DISPLAY(36) }); for (let i = 0; i < 7; i++) P(c, '#5f8a3a', 2.4, q => q.arc(-150 + i * 50, 80, 34, Math.PI, 0)); P(c, '#5f8a3a', 0, q => q.rect(-184, 78, 368, 40)); text(c, '(hedging)', 0, 100, { px: 18, w: 700, col: '#fff' }); }); }
  });
  S.fx('presswild', 'paper'); S.fx('presswild', 'paper', .3);
  S.cut('but', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    if (t < A('late2024')) { PK.big(ctx, 'BUT…', 640, 330, 160, clamp(lt / .3), { col: '#e8693a' }); return; }
    // the review + Aug 24 back on the table
    PK.tag(ctx, 'late 2024', t - A('late2024'));
    PK.scaled(ctx, 330, 330, pop(since(t, 'review', .4)), c => { PK.paper(c, -150, -190, 300, 380, { fill: '#fff' }); text(c, 'REVIEW', 0, -150, { font: PK.DISPLAY(30) }); text(c, "co-written by the park's director", 0, -114, { px: 14, w: 600 }); for (let i = 0; i < 10; i++) L(c, [[-120, -80 + i * 24], [120 - (i % 3) * 30, -80 + i * 24]], 3, 'rgba(70,64,58,.4)'); });
    P(ctx, '#a0764e', 3, c => c.rect(620, 470, 520, 26)); for (const x of [650, 1110]) L(ctx, [[x, 496], [x, 640]], 8);
    const tb = since(t, 'table', .6);
    if (tb > 0) St.calendar(ctx, 880, lerp(200, 380, ease.out(tb)), 'AUGUST', '24', 'still on the table', .8);
  });
  S.fx('but', 'boing', 0, .6);
  S.cut('foss', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#e9dcc0');
    who(ctx, 'historian', 200, 700, 1.4, { dir: 1, t, hair: 'short', hairCol: '#5a3a24', beard: 'full', face: { eyes: 'dot', mouth: 'flat', brows: 'up' }, armR: [40, -30] });
    PK.nameCard(ctx, 'Pedar Foss', 'scholar', 200, 300, clamp(lt / .4));
    const k = since(t, 'manuscripts', 1.2);
    for (let i = 0; i < 6; i++) { const p = clamp(k * 2 - i * .2); if (p <= 0) continue; const x = 470 + i * 130; PK.scaled(ctx, x, 380, pop(p), c => { PK.paper(c, -55, -90, 110, 180, { fill: '#efe2c0' }); for (let j = 0; j < 8; j++) L(c, [[-40, -70 + j * 18], [40 - (j % 2) * 16, -70 + j * 18]], 2, 'rgba(70,64,58,.4)'); }); }
    const o = since(t, 'onlydate', .5);
    if (o > 0) { for (let i = 0; i < 6; i++) { const x = 470 + i * 130; PK.ring(ctx, x, 420, 50, 22, o * 1.2 - .2, '#2f7a46'); text(ctx, 'Aug 24', x, 420, { px: 16, w: 700, col: '#2f7a46' }); } PL.lbl(ctx, 'the only date with real support in the manuscripts', 790, 620, o, { px: 20 }); }
    PL.lbl(ctx, "old manuscripts of Pliny's letter", 790, 200, k, { px: 22 });
  });
  S.cut('visible', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    // the note still clearly visible years later
    for (let i = 0; i < 3; i++) { PK.scaled(ctx, 260 + i * 380, 280, 1, c => { PK.paper(c, -150, -100, 300, 200, { fill: '#e8dcc0' }); text(c, 'XVI K NOV', 0, -10, { font: PK.HAND(44) }); text(c, ['2018', '2020', '2022'][i], 0, 70, { px: 20, w: 700 }); }); }
    PL.lbl(ctx, 'still clearly visible years after it was uncovered', 640, 110, clamp(lt / .4), { px: 22 });
    const a = since(t, 'ad78', .6);
    if (a > 0) { L(ctx, [[200, 560], [200 + 880 * a, 560]], 6); St.calendar(ctx, 220, 560, 'OCT', 'AD 78', 'note written?', .7, { px: 36 }); if (a >= 1) St.calendar(ctx, 1060, 560, 'AUGUST', 'AD 79', 'eruption?', .7, { px: 36 }); PL.lbl(ctx, '≈ 10 months', 640, 500, since(t, 'tenmonths', .4), { px: 24 }); }
  });
  S.cut('otherside', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    // balance scale: AUG on the left, evidence for OCT piles on the right
    const n = (t > A('fruit') ? 1 : 0) + (t > A('wool') ? 1 : 0) + (t > A('coin') ? 1 : 0);
    const tilt = G.FX ? 0 : 0; void tilt; const ang = lerp(-.12, .14, n / 3) + Math.sin(t * 2) * .01;
    L(ctx, [[640, 640], [640, 260]], 12); P(ctx, '#c99a45', 3, c => c.arc(640, 250, 16, 0, 7));
    ctx.save(); ctx.translate(640, 260); ctx.rotate(ang); L(ctx, [[-340, 0], [340, 0]], 10, '#8a6240');
    for (const sx of [-340, 340]) { ctx.save(); ctx.translate(sx, 0); ctx.rotate(-ang); L(ctx, [[0, 0], [-60, 140]], 2); L(ctx, [[0, 0], [60, 140]], 2); P(ctx, '#c99a45', 3, c => c.ellipse(0, 140, 90, 18, 0, 0, Math.PI)); if (sx < 0) St.calendar(ctx, 0, 70, 'AUGUST', '24', 'manuscripts', .55); else { if (n > 0) { for (let i = 0; i < 3; i++) P(ctx, '#c0392b', 2.4, c => c.arc(-50 + i * 24, 124, 13, 0, 7)); } if (n > 1) P(ctx, '#8a6a9a', 2.4, c => c.roundRect(-4, 100, 50, 34, 6)); if (n > 2) P(ctx, '#e7b84a', 2.4, c => c.arc(66, 120, 16, 0, 7)); } ctx.restore(); }
    ctx.restore();
    const lb = [['fruit', 'autumn fruit in the ruins'], ['wool', 'heavy wool clothing on some victims'], ['coin', 'a coin some date to Sept 79 or later']];
    lb.forEach(([k, s], i) => PL.lbl(ctx, s, 980, 520 + i * 50, since(t, k, .4), { px: 18 }));
    PL.lbl(ctx, 'ON THE OTHER SIDE', 980, 100, clamp(lt / .4), { px: 24 });
  });
  S.fx('fruit', 'pop'); S.fx('wool', 'pop'); S.fx('coin', 'coin');
  S.cut('conf', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#d9c7a3');
    P(ctx, '#7a3b2e', 3, c => c.rect(140, 90, 1000, 70)); text(ctx, 'INTERNATIONAL CONFERENCE: WHEN DID VESUVIUS ERUPT?', 640, 126, { font: PK.DISPLAY(26), col: '#f6c945', maxW: 960 });
    PK.tag(ctx, 'November 2025', lt);
    P(ctx, '#a0764e', 3, c => c.rect(120, 520, 1040, 30));
    const ex = ['historian', 'arch3', 'director', 'scientist', 'fiorelli'];
    ex.forEach((n, i) => who(ctx, n, 220 + i * 210, 560, 1.15, { dir: i < 2 ? 1 : -1, t, face: { eyes: 'dot', brows: i % 2 ? 'angry' : 'skeptic', mouth: Math.sin(t * 5 + i) > 0 ? 'open' : 'flat' }, armR: [30, -30 + Math.sin(t * 4 + i) * 20] }));
    PK.bubble(ctx, 'August!', 330, 250, [300, 330], clamp(lt / .3), { px: 24 }); PK.bubble(ctx, 'October!', 860, 250, [850, 330], clamp((lt - .5) / .3), { px: 24 });
    const dn = since(t, 'didnt', .6);
    if (dn > 0) { PL.dim(ctx, .55 * dn); PK.reset(ctx); PK.note(ctx, ['Eruption date: August 24 or October 24, AD 79?', 'Still debated.'], 640, 380, t - A('didnt'), { px: 32, bold0: true, cols: ['#2b2420', '#c0392b'] }); }
  });
  S.fx('didnt', 'stamp');

  // ---------- so here's where that leaves us ----------
  S.mood('leaves', 'warm');
  S.cut('leaves', (ctx, lt, d, t) => {
    PL.street(ctx, t, { graffiti: { 280: [{ s: 'Celadus!!', x: 60, y: 60 }], 660: [{ s: 'VOTE ME', x: 150, y: 90 }] } });
    const beats = [['sports', 260, { arms: null, armR: [30, -50], face: { eyes: 'dot', mouth: 'open', brows: 'angry' } }], ['griped', 520, { face: { eyes: 'half', mouth: 'frown', brows: 'skeptic' }, arms: 'crossed' }], ['fixed', 1000, { face: { eyes: 'dot', mouth: 'smile' }, armR: [40, -30 + Math.sin(t * 8) * 10] }]];
    beats.forEach(([k, x, ex], i) => { if (t < A(k)) return; F.person(ctx, x, 690, 1.1, F.roman(500 + i, Object.assign({ dir: 1, t }, ex))); });
    if (t > A('sports')) PK.bubble(ctx, 'NUCERIA STINKS!', 260, 360, [270, 470], since(t, 'sports', .3), { px: 18 });
    if (t > A('griped')) PK.bubble(ctx, 'my neighbor…', 520, 380, [520, 470], since(t, 'griped', .3), { px: 18 });
    if (t > A('griped') + .8) { who(ctx, 'pompeian', 760, 690, 1.1, { dir: 1, t, face: { eyes: 'dot', mouth: 'grin' }, armR: [36, -50 + Math.sin(t * 20) * 4], holdR: (c, x, y) => L(c, [[x, y], [x + 14, y - 24]], 4, '#5a4a3a') }); }
    PL.lbl(ctx, 'an ordinary town', 640, 110, since(t, 'ordtown', .4), { px: 28 });
  });
  S.cut('killed', (ctx, lt, d, t) => {
    St.sky(ctx, '#2a2428', '#5a4a48'); St.vesuvius(ctx, 640, 600, 1.2, { t, col: .9, darkCol: true, green: false });
    St.ground(ctx, 600, '#4a443e');
    const e = since(t, 'everyone', .5);
    if (e > 0) {
      PL.dim(ctx, .3);
      const line = [['kings', 'king', 'KINGS'], ['hunters', 'digger', 'TREASURE HUNTERS'], ['guides2', 'guide', 'TOUR GUIDES'], ['bombers', 'pilot', 'BOMBERS'], ['historians2', 'historian', 'HISTORIANS']];
      line.forEach(([k, n, s], i) => { if (t < A(k)) return; const x = 170 + i * 235; who(ctx, n, x, 700, 1.0, { dir: 0, t, face: { eyes: 'dot', mouth: 'flat' }, armR: [30, -40], holdR: (c, hx, hy) => St.shovel(c, hx, hy, .4, .5) }); PL.lbl(ctx, s, x, 470, since(t, k, .3), { px: 16 }); });
      if (t > A('buriedagain')) PL.lbl(ctx, '…buried them again, a little', 640, 120, since(t, 'buriedagain', .4), { px: 26 });
      if (t > A('wanted')) PL.lbl(ctx, 'with what we wanted them to be', 640, 180, since(t, 'wanted', .4), { px: 22 });
    }
  });
  ['kings', 'hunters', 'guides2', 'bombers', 'historians2'].forEach(k => S.fx(k, 'dig', 0, .5));
  S.cut('new', (ctx, lt, d, t) => {
    ruins(ctx, t, { top: '#a8d6ea', bot: '#f7ecd0' });
    for (const [x, n] of [[360, 'arch2'], [900, 'arch3']]) who(ctx, n, x, 690, 1.3, { dir: x < 640 ? 1 : -1, t, face: { eyes: 'dot', mouth: 'smile', look: [0, 1] }, armR: [30, 30 + Math.sin(t * 6) * 6], holdR: (c, hx, hy) => { L(c, [[hx, hy], [hx + 10, hy + 20]], 5, '#a0764e'); P(c, '#d9a441', 2, q => q.rect(hx + 4, hy + 18, 16, 12)); } });
    PL.lbl(ctx, "let Pompeii be what it actually was", 640, 120, since(t, 'letbe', .4), { px: 26 });
    const words = [['messy', 'MESSY', 250], ['mixed', 'MIXED', 520], ['uncertain', 'UNCERTAIN', 790], ['realw', 'REAL', 1050]];
    words.forEach(([k, s, x], i) => PK.stamp(ctx, s, x, 260, since(t, k, .9), { px: 40, col: ['#c0563c', '#3c6fb6', '#7a5a3a', '#2f7a46'][i], rot: (i % 2 ? .08 : -.08) }));
  });
  ['messy', 'mixed', 'uncertain', 'realw'].forEach(k => S.fx(k, 'stamp', 0, .6));
  S.cut('threemil', (ctx, lt, d, t) => {
    St.sky(ctx, '#2a2a48', '#e98a5a'); St.vesuvius(ctx, 640, 520, 1.1, { t, smoke: since(t, 'notdone', 1) * .8, face: since(t, 'notdone', .6) * .6, base: '#5a6a48' });
    // the modern city lights at its foot
    P(ctx, '#2a2a38', 3, c => c.rect(-100, 500, W + 200, 300));
    const r = T.rng(12); for (let i = 0; i < 260; i++) { const x = r() * W, y = 520 + r() * 200; ctx.fillStyle = r() > .5 ? '#ffe39a' : '#ffc06a'; ctx.globalAlpha = .6 + .4 * Math.sin(t * 2 + i); ctx.fillRect(x, y, 3, 3); } ctx.globalAlpha = 1;
    PK.counter(ctx, 0, 3, clamp(lt / 1.5), 640, 140, 70, { pre: '≈ ', post: ' million people', col: '#f4ecd8', fmt: v => Math.round(v) + '' });
    PL.lbl(ctx, 'still live in the shadow of Vesuvius', 640, 210, clamp(lt / .4), { px: 22 });
    if (t > A('notdone')) PL.lbl(ctx, 'not done either', 640, 660, since(t, 'notdone', .4), { px: 26, col: '#c0392b' });
  });
  S.fx('notdone', 'rumble', .5, .7);

  // ---------- CTA #2: the worker writes one last note ----------
  S.mood('cta2', 'pluck');
  S.cut('cta2', (ctx, lt, d, t) => {
    cam(ctx, 1.1, 640, 380);
    St.room(ctx, { paint: .55, note: 1, t });
    const k = clamp((lt - 1.2) / 2.6);
    ctx.save(); ctx.translate(840, 395); ctx.rotate(-.05); ctx.font = PK.HAND(40); const s = "Wall's still standing. Mostly."; ctx.fillStyle = 'rgba(30,26,24,.9)'; ctx.fillText(s.slice(0, Math.ceil(s.length * k)), -200, 0); ctx.restore();
    who(ctx, 'worker', 520, 650, 1.6, { dir: lt < 1 ? 0 : 1, t, face: { eyes: lt < 1 ? 'dot' : 'half', mouth: lt < 1 ? 'smirk' : 'flat', look: lt < 1 ? [0, 0] : [1, -.3] }, armR: lt < 1 ? [6, 56] : [80, -40], holdR: (c, x, y) => St.charcoal(c, x + 4, y - 8, .5) });
    PK.caption(ctx, '(invented — not a real inscription)', lt, 1.5);
  });
  S.fx('cta2', 'scratch', 1.3, .7); S.fx('cta2', 'scratch', 2.3, .7);
  S.cut('like', (ctx, lt, d, t) => {
    P(ctx, '#e9dcc0', 0, c => c.rect(-100, -100, W + 200, H + 200)); P(ctx, '#b8473a', 0, c => c.rect(-100, 560, W + 200, 300));
    ctx.fillStyle = 'rgba(0,0,0,.05)'; const r = T.rng(4); for (let i = 0; i < 80; i++) ctx.fillRect(r() * W, r() * 540, 20 + r() * 80, 2 + r() * 3);
    // like + subscribe, drawn on the wall like graffiti
    PK.scaled(ctx, 380, 300, pop(clamp(lt / .4)), c => { c.lineWidth = 6; c.strokeStyle = '#2b2420'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-60, 0); c.lineTo(-60, 80); c.lineTo(-30, 80); c.lineTo(-30, 0); c.closePath(); c.moveTo(-30, 0); c.lineTo(0, -60); c.quadraticCurveTo(20, -70, 20, -40); c.lineTo(10, 0); c.lineTo(60, 0); c.quadraticCurveTo(80, 10, 66, 30); c.lineTo(56, 80); c.lineTo(-30, 80); c.stroke(); text(c, 'LIKE', 0, 130, { font: PK.HAND(46) }); }, -.06);
    const s = since(t, 'subscribe', .4);
    if (s > 0) PK.scaled(ctx, 880, 300, pop(s), c => { P(c, '#d0392b', 4, q => q.roundRect(-170, -50, 340, 100, 18)); text(c, 'SUBSCRIBE', 0, 3, { font: PK.DISPLAY(44), col: '#fff' }); }, .04);
    const f = since(t, 'free', .5);
    if (f > 0) { PL.lbl(ctx, "it's free — faster than the Senate banning a gladiator show", 640, 520, f, { px: 20 }); }
  });
  S.fx('like', 'pop'); S.fx('subscribe', 'pop'); S.fx('like', 'scratch', .1, .5);
  S.cut('wantknow', (ctx, lt, d, t) => {
    // your town, buried; an archaeologist from the year 4026 gets it wrong
    St.sky(ctx, '#b9a8d8', '#f0d8e0');
    P(ctx, '#9a948c', 3, c => c.rect(-100, 430, W + 200, 400));
    P(ctx, '#7a6a5a', 3, c => { c.moveTo(380, 430); c.lineTo(440, 560); c.lineTo(860, 560); c.lineTo(920, 430); c.closePath(); });
    // a buried modern living room, partly dug out: sofa + TV + rubber duck
    P(ctx, '#5f8fb8', 3, c => c.roundRect(470, 500, 160, 50, 10)); P(ctx, '#2b2420', 3, c => c.rect(700, 470, 110, 70)); P(ctx, '#f2c230', 2.4, c => c.arc(560, 488, 12, 0, 7));
    PK.tag(ctx, 'the year 4026', lt);
    const y = since(t, 'y4026', .5);
    if (y > 0) { who(ctx, 'scientist', 1000, 640, 1.3, { dir: -1, t, body: 'flight', col: '#e8e8f0', col2: '#9fc6d8', hat: 'none', face: { eyes: 'wide', mouth: 'o', brows: 'up' }, armL: [-40, -40], holdL: (c, x, y2) => { P(c, '#f2c230', 2.4, q => q.arc(x - 10, y2 - 20, 16, 0, 7)); P(c, '#e8693a', 2, q => q.ellipse(x + 4, y2 - 22, 8, 4, 0, 0, 7)); }, front: c => { c.save(); c.globalAlpha = .35; P(c, '#cfe6f0', 3, q => q.arc(0, -146, 58, 0, 7)); c.restore(); } }); PK.bubble(ctx, 'A sacred yellow idol!', 980, 300, [990, 400], y, { px: 22 }); }
    const w = since(t, 'writewall', .5);
    if (w > 0) { PL.dim(ctx, .5 * w); PK.reset(ctx); PK.note(ctx, ['Write it on the wall…', 'I mean, in the comments.'], 640, 360, t - A('writewall'), { hand: true, px: 48 }); }
  });
  S.fx('y4026', 'boing', 0, .5);
  S.cut('thanks', (ctx, lt, d, t) => {
    cam(ctx, 1.05, 640, 380);
    St.room(ctx, { paint: .55, note: 1, t });
    who(ctx, 'worker', 640, 650, 1.7, { dir: 0, t, face: { eyes: 'happy', mouth: 'grin' }, armR: [40, -70 + Math.sin(t * 8) * 12] });
    PK.reset(ctx); PK.big(ctx, 'THANKS FOR WATCHING', 640, 120, 54, clamp(lt / .4), { col: '#f6c945' });
    PL.dim(ctx, clamp((lt - d + 1) / 1));
  });
  S.mood('thanks', 'none', 0);
})(window);
