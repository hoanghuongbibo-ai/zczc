/* Beat 4: a normal town next to a not-normal mountain (255 – 460 s). */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, S = G.PS, T = G.Toon, PL = G.PL;
  const { W, H, P, L, text, A, since, pop } = PK, { clamp, lerp, ease } = T, cam = S.cam;
  const who = PL.who;

  S.over('b4start', 'fine', (ctx, lt) => PK.chapter(ctx, 'A NORMAL TOWN, A NOT-NORMAL MOUNTAIN', lt, 3));
  S.mood('b4start', 'market');

  // ---------- fine, comfortable, a busy port town ----------
  S.cut('b4start', (ctx, lt, d, t) => {
    PL.street(ctx, t, {});
    const list = [];
    for (let i = 0; i < 9; i++) { const dir = i % 2 ? 1 : -1, x = ((i * 170 + dir * lt * 60) % 1500 + 1500) % 1500 - 110; list.push([x, 600 + (i % 3) * 40, .95, F.roman(60 + i, { dir }), false, i]); }
    for (const [x, y, s, o, , ph] of list.sort((a, b) => a[1] - b[1])) F.person(ctx, x, y, s, Object.assign({}, o, { t, walk: t * 7 + ph, bob: -Math.abs(Math.sin(t * 7 + ph)) * 3 }));
    // a cart of produce
    const cx = ((lt * 50) % 1600) - 200; P(ctx, '#a0764e', 3, c => c.rect(cx, 610, 160, 50)); for (const x of [cx + 30, cx + 130]) P(ctx, '#7a4f33', 3, c => c.arc(x, 666, 22, 0, 7)); for (let i = 0; i < 6; i++) P(ctx, ['#c0392b', '#e7b84a', '#7f9f5a'][i % 3], 2, c => c.arc(cx + 20 + i * 24, 604, 12, 0, 7));
    const meters = [['fine', 'COMFORTABLE']];
    PL.lbl(ctx, 'FINE.', 300, 110, since(t, 'fine', .4), { px: 30 }); PL.lbl(ctx, 'COMFORTABLE.', 560, 120, since(t, 'fine', .4) * 2 - 1.4, { px: 30 });
    // population range bar
    const pk = since(t, 'port', .6);
    if (pk > 0) PK.scaled(ctx, 900, 140, pop(pk), c => {
      PK.paper(c, -230, -60, 460, 130, { tape: true }); text(c, 'POPULATION', 0, -36, { px: 18, w: 700 });
      P(c, '#e4d6b8', 2.4, q => q.roundRect(-190, -10, 380, 20, 10));
      const wig = t > A('range') ? Math.sin(t * 6) * 14 : 0;
      P(c, '#e7b84a', 2.4, q => q.roundRect(-110 + wig, -10, 190 - wig, 20, 10));
      text(c, '10,000', -110, 36, { px: 18, w: 700 }); text(c, '20,000', 80, 36, { px: 18, w: 700 }); text(c, '(a range, honestly)', 0, 56, { px: 14, col: '#7a6a5a' });
    });
  });
  S.fx('fine', 'pop'); S.fx('fine', 'pop', .9); S.fx('port', 'pop');

  // ---------- Alison Cooley: no crucial moment hinges on Pompeii ----------
  S.cut('cooley', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    who(ctx, 'scientist', 230, 680, 1.5, { dir: 1, body: 'suit', col: '#6b4f6a', col2: '#efe6d6', tie: '#c0563c', legs: '#4a4040', hair: 'long', hairCol: '#9b6a42', face: { eyes: 'dot', mouth: 'flat', brows: 'skeptic' }, armR: [30, -30] });
    PK.nameCard(ctx, 'Alison Cooley', 'historian', 230, 260, clamp(lt / .4));
    PK.quote(ctx, 'No crucial moment in Roman history hinges on Pompeii.', 'Alison Cooley (paraphrased in our script)', 760, 300, 640, clamp((t - A('nocrucial')) / 2.2), { lt: t - A('nocrucial') + .4 });
    // hall of fame with an empty frame
    const h = since(t, 'nofamous', .5);
    if (h > 0) { PL.dim(ctx, .25 * h); for (let i = 0; i < 4; i++) { const x = 560 + i * 150, y = 560; St.frame(ctx, x, y, 100, 120, c => { if (i < 3) { F.person(c, 0, 120, .6, F.cast(['senator', 'tacitus', 'elder'][i], { dir: 0 })); } else text(c, '?', 0, 0, { font: PK.DISPLAY(60), col: '#a09080' }); }); text(ctx, i < 3 ? ['statesman', 'writer', 'scholar'][i] : 'from Pompeii', x, y + 90, { px: 16, w: 700, stroke: 4, strokeCol: '#f4ecd8' }); } }
  });
  S.fx('nofamous', 'pop');
  S.cut('usa', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 440 });
    // a highway with lane dashes
    P(ctx, '#5a5a62', 3, c => c.rect(-400, 520, W + 800, 140)); for (let x = -400 + ((-lt * 400) % 120); x < W + 400; x += 120) P(ctx, '#f2e6a8', 0, c => c.rect(x, 586, 60, 8));
    PL.sign(ctx, 'POMPEII  pop. "small"', 300 - lt * 30, 520, 1, { h: 130, col: '#3c8a52', px: 20 });
    PL.sign(ctx, 'ROME →', 1050 - lt * 30, 520, 1, { h: 160, col: '#3c6fb6', px: 26 });
    // the car (with a family that doesn't stop)
    const cx = 640 + Math.sin(lt * 1.5) * 10;
    P(ctx, '#d0392b', 3, c => { c.moveTo(cx - 150, 630); c.lineTo(cx - 150, 590); c.lineTo(cx - 90, 586); c.lineTo(cx - 50, 540); c.lineTo(cx + 60, 540); c.lineTo(cx + 110, 586); c.lineTo(cx + 150, 594); c.lineTo(cx + 150, 630); c.closePath(); });
    P(ctx, '#bfe3f7', 2.4, c => { c.moveTo(cx - 40, 550); c.lineTo(cx + 50, 550); c.lineTo(cx + 88, 586); c.lineTo(cx - 76, 586); c.closePath(); });
    for (const x of [cx - 90, cx + 90]) { P(ctx, '#2b2420', 3, c => c.arc(x, 632, 26, 0, 7)); P(ctx, '#b8b8c0', 2, c => c.arc(x, 632, 10, 0, 7)); }
    for (const [x, n] of [[cx - 20, 'tourist'], [cx + 40, 'arch2']]) { ctx.save(); ctx.beginPath(); ctx.rect(cx - 76, 540, 164, 46); ctx.clip(); who(ctx, n, x, 680, .7, { dir: 1, hat: n === 'arch2' ? 'none' : 'cap', face: { eyes: 'half', mouth: 'flat' } }); ctx.restore(); }
    PL.lbl(ctx, 'If Rome were the United States…', 640, 110, clamp(lt / .4), { px: 26 });
  });
  S.fx('usa', 'whoosh', 1, .5);

  // ---------- but ordinary is priceless; they wrote on the walls ----------
  S.cut('ordinary', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a3a40', '#1e1a24');
    P(ctx, '#c99a45', 3, c => c.rect(520, 470, 240, 40)); P(ctx, '#7a3b2e', 3, c => c.rect(550, 510, 180, 120));
    const k = clamp(lt / 1.6);
    P(ctx, '#a39d92', 3, c => { c.moveTo(560, 470); c.quadraticCurveTo(560, 380, 640, 370); c.quadraticCurveTo(730, 370, 720, 470); c.closePath(); });
    for (let i = 0; i < 6; i++) { const a = t * 2 + i, r = 90 + Math.sin(t * 3 + i) * 10; ctx.save(); ctx.globalAlpha = k; ctx.translate(640 + Math.cos(a) * r, 420 + Math.sin(a) * r * .6); ctx.rotate(t); P(ctx, '#fff6c8', 0, c => { for (let j = 0; j < 4; j++) { c.moveTo(0, 0); c.lineTo(Math.cos(j * 1.57) * 14, Math.sin(j * 1.57) * 14); c.lineTo(Math.cos(j * 1.57 + .5) * 4, Math.sin(j * 1.57 + .5) * 4); } }); ctx.restore(); }
    PL.lbl(ctx, 'ORDINARY', 640, 300, 1, { px: 26 });
    PK.big(ctx, 'PRICELESS', 640, 160, 70, clamp((lt - .6) / .4), { col: '#f6c945' });
  });
  S.fx('ordinary', 'ding', .7, .5);
  S.cut('onething', (ctx, lt, d, t) => {
    PL.street(ctx, t, {});
    const k = t > A('walls2');
    who(ctx, 'pompeian', 640, 650, 1.6, { dir: 1, t, face: { eyes: 'dot', mouth: k ? 'grin' : 'smile', look: [1, -.5] }, armR: [36, -50 + (k ? Math.sin(t * 20) * 6 : 0)], holdR: (c, x, y) => L(c, [[x, y], [x + 14, y - 24]], 4, '#5a4a3a') });
    PK.big(ctx, 'THEY WROTE ON THE WALLS', 640, 130, 52, since(t, 'walls2', .4), { col: '#f6c945' });
  });
  // the wall of notifications
  const WALL_ITEMS = [['election', 'VOTE FOR GAIUS', '— an honest man —', '#c0392b', 220, 220], ['love', 'Marcus ♥ Spendusa', '', '#d0507a', 620, 200], ['insults', 'Phileros is a', 'eunuch', '#2b2420', 980, 240], ['fanart', '', '', '#2b2420', 400, 420]];
  S.cut('election', (ctx, lt, d, t) => {
    const cz = lerp(1.0, 1.04, lt / d); cam(ctx, cz, 640, 360);
    P(ctx, '#efe1c2', 0, c => c.rect(-200, -200, W + 400, H + 400)); P(ctx, '#b8473a', 0, c => c.rect(-200, 560, W + 400, 300)); L(ctx, [[-200, 560], [W + 200, 560]], 3);
    ctx.fillStyle = 'rgba(0,0,0,.04)'; const r = T.rng(3); for (let i = 0; i < 60; i++) ctx.fillRect(r() * W, r() * 560, 30 + r() * 80, 3);
    const chat = since(t, 'groupchat', .5);
    WALL_ITEMS.forEach(([k, a, b, col, x, y], i) => {
      const p = since(t, k, .4); if (p <= 0) return;
      PK.scaled(ctx, x, y, pop(p), c => {
        if (k === 'fanart') { c.lineWidth = 4; c.strokeStyle = '#2b2420'; c.lineCap = 'round'; c.beginPath(); c.arc(-60, -60, 16, 0, 7); c.moveTo(-60, -44); c.lineTo(-60, 0); c.lineTo(-76, 40); c.moveTo(-60, 0); c.lineTo(-44, 40); c.moveTo(-60, -30); c.lineTo(-20, -50); c.lineTo(10, -70); c.stroke(); c.beginPath(); c.arc(60, -50, 16, 0, 7); c.moveTo(60, -34); c.lineTo(60, 10); c.lineTo(46, 50); c.moveTo(60, 10); c.lineTo(76, 50); c.moveTo(60, -20); c.lineTo(30, -10); c.stroke(); text(c, 'CELADUS #1!', 0, 80, { font: PK.HAND(34) }); }
        else { text(c, a, 0, 0, { font: PK.HAND(44), col }); if (b) text(c, b, 0, 44, { font: PK.HAND(34), col }); }
      }, (i % 2 ? .05 : -.06));
      // notification badge
      const bx = x + 120, by = y - 50; if (chat <= 0) { PK.scaled(ctx, bx, by, pop(p), c => { P(c, '#e2453a', 2.4, q => q.arc(0, 0, 16, 0, 7)); text(c, '' + (i + 1), 0, 1, { px: 18, w: 700, col: '#fff' }); }); }
    });
    // group chat / reviews / comments UI over the wall
    if (chat > 0) {
      PK.reset(ctx);
      const ui = [['groupchat', 'GROUP CHAT', '#5f8fb8', 230], ['yelp', '★★☆☆☆  "bread was stale"', '#d9a441', 520], ['yelp', 'COMMENTS: 2,000 years', '#7f9f5a', 810]];
      ui.forEach(([k, s, col, y], i) => { const p = since(t, k, .4) - (i === 2 ? .9 : 0); PK.scaled(ctx, 1040, 420 + i * 80 - 120, pop(clamp(p)), c => { P(c, col, 3, q => q.roundRect(-190, -30, 380, 60, 18)); text(c, s, 0, 2, { px: 22, w: 700, col: '#fff', maxW: 350 }); }); });
    }
    PK.caption(ctx, 'real Pompeii graffiti, paraphrased', lt, 1);
  });
  ['election', 'love', 'insults', 'fanart'].forEach(k => { S.fx(k, 'scratch', 0, .6); S.fx(k, 'pop', .1, .6); }); S.fx('groupchat', 'ding', 0, .4); S.fx('yelp', 'ding', 0, .4);

  // ---------- one grump scratches the famous complaint ----------
  S.cut('sick', (ctx, lt, d, t) => {
    PL.street(ctx, t, { graffiti: { 120: [{ s: 'VOTE GAIUS', x: 70, y: 80, px: 22 }, { s: '♥', x: 120, y: 120, px: 30 }], 280: [{ s: 'Celadus!!', x: 60, y: 60 }, { s: 'Phileros = ...', x: 130, y: 110 }], 490: [{ s: 'bread: 2/5', x: 80, y: 70 }], 660: [{ s: 'lol', x: 60, y: 60, px: 26 }, { s: 'VOTE ME', x: 150, y: 90 }] } });
    const k = t > A('sick') + 1.2;
    who(ctx, 'seneca', 560, 660, 1.5, { dir: 1, hair: 'messy', hairCol: '#6b5a4a', beard: 'stubble', body: 'tunic', col: '#8b6fa8', face: { eyes: 'half', brows: 'angry', mouth: 'frown', look: [1, -.4] }, armR: [36, -54 + (k ? Math.sin(t * 22) * 5 : 0)], holdR: (c, x, y) => L(c, [[x, y], [x + 14, y - 24]], 4, '#5a4a3a') });
    PK.bubble(ctx, 'ugh. SO many inscriptions.', 520, 300, [550, 420], since(t, 'sick', .4), { think: true, px: 22 });
    // a map of town: it shows up in more than one spot
    const m = since(t, 'morespots', .5);
    if (m > 0) PK.scaled(ctx, 1020, 220, pop(m), c => { PK.paper(c, -160, -110, 320, 220, { tape: true }); text(c, 'found in several spots', 0, -88, { px: 16, w: 700 }); P(c, '#e7dcc4', 2.4, q => q.ellipse(0, 10, 130, 70, 0, 0, 7)); for (const [x, y] of [[-60, -10], [40, 30], [80, -20]]) P(c, '#c0392b', 2, q => q.arc(x, y, 8, 0, 7)); });
  });
  S.fx('sick', 'scratch', 1.2);
  S.mood('amazed', 'gentle');
  S.cut('amazed', (ctx, lt, d, t) => {
    P(ctx, '#e9dcc0', 0, c => c.rect(-100, -100, W + 200, H + 200));
    ctx.fillStyle = 'rgba(0,0,0,.05)'; const r = T.rng(4); for (let i = 0; i < 80; i++) ctx.fillRect(r() * W, r() * H, 20 + r() * 80, 2 + r() * 3);
    cam(ctx, lerp(1, 1.05, lt / d), 640, 360);
    const k = clamp((t - A('amazed')) / (A('real') - A('amazed') - .3));
    PK.quote(ctx, 'I am amazed, wall, that you have not fallen in ruins, you who bear the weight of so many boring inscriptions.', 'graffito, CIL IV 1904, trans. Sententiae Antiquae', 640, 330, 820, k, { hand: true, px: 40, fill: '#f4ecd8', lt: lt + .5, always: true });
    PK.stamp(ctx, 'REAL', 1050, 560, since(t, 'real', .9), { px: 60, col: '#2f7a46' });
  });
  S.fx('real', 'stamp');
  S.cut('comment', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#eae6de');
    const rows = [['WallGuy_79', 'I am amazed, wall, that you have not fallen…', 0], ['Pompeian_42', "you're literally writing on it", 1], ['Celadus_fan', 'first', 2]];
    rows.forEach(([u, s, i]) => { const p = clamp((lt - i * .8) / .4); PK.scaled(ctx, 640, 200 + i * 130, pop(p), c => { PK.paper(c, -420, -50, 840, 100, { fill: '#fff', r: 10 }); P(c, ['#c0563c', '#5f8fb8', '#7f9f5a'][i], 2.4, q => q.arc(-370, -10, 24, 0, 7)); text(c, u, -330, -24, { px: 18, w: 700, align: 'left' }); text(c, s, -330, 8, { px: 22, w: 500, align: 'left' }); text(c, 'likes ' + [2000, 12, 3][i] + '   ·   reply', -330, 36, { px: 14, align: 'left', col: '#7a6a5a' }); }, 0); });
    PK.big(ctx, 'A COMMENT ABOUT THE COMMENTS', 640, 80, 40, clamp(lt / .4), { col: '#f6c945' });
    const h = since(t, 'holdwall', .5);
    if (h > 0) { PL.dim(ctx, .5 * h); PK.reset(ctx); PK.note(ctx, ['HOLD ONTO THAT WALL', "it's coming back"], 640, 380, t - A('holdwall'), { px: 44, bold0: true }); }
  });
  S.fx('comment', 'pop'); S.fx('comment', 'pop', .8); S.fx('comment', 'pop', 1.6); S.fx('holdwall', 'thud');

  // ---------- AD 59: the amphitheatre riot ----------
  function arena(ctx, t, o = {}) {
    St.sky(ctx, o.top || '#9fcde4', o.bot || '#f3e3c0');
    if (o.ves !== false) St.vesuvius(ctx, 1100, 330, .5, { t });
    // stands (back half)
    P(ctx, '#d7c39a', 3, c => c.ellipse(640, 470, 640, 210, 0, Math.PI, 0)); P(ctx, '#c9b48a', 3, c => c.rect(0, 470, W, 250));
    for (let r = 0; r < 5; r++) L(ctx, [[0, 300 + r * 34], [W, 300 + r * 34]], 2, 'rgba(0,0,0,.2)');
    // arena floor
    P(ctx, '#e6d2a0', 3, c => c.ellipse(640, 600, 520, 110, 0, 0, 7));
  }
  S.mood('ad59', 'tension');
  S.cut('ad59', (ctx, lt, d, t) => {
    arena(ctx, t);
    const st = since(t, 'stones', .3), sw = since(t, 'swords', .3);
    // fans: Pompeii (red) on the left stands, Nuceria (blue) on the right
    const fans = []; for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const left = i < 4, x = 70 + i * 140 + r * 18, y = 360 + r * 52; if (i === 4) continue; fans.push([x, y, .5 + r * .06, F.roman(100 + i + r * 9, { col: left ? '#c0392b' : '#3c6fb6', face: { eyes: 'dot', brows: 'angry', mouth: 'open' } }), !left, i + r]); }
    St.crowd(ctx, fans, t * (st > 0 ? 2 : 1));
    // gladiators below
    for (const [x, dir] of [[560, 1], [720, -1]]) who(ctx, 'legion', x + Math.sin(t * 4) * 10 * dir, 640, .9, { dir, t, hat: dir > 0 ? 'gallic' : 'legion', body: 'armor', armR: [30 * dir, -30 + Math.sin(t * 6) * 20], holdR: (c, hx, hy) => L(c, [[hx, hy], [hx + 30 * dir, hy - 30]], 5, '#b8b8c0') });
    // trash talk
    const tk = since(t, 'trash', .4);
    if (tk > 0) { PK.bubble(ctx, '#@%!', 260, 240, [300, 330], tk, { px: 28 }); PK.bubble(ctx, 'Nuceria stinks!', 420, 200, [380, 320], tk - .4, { px: 22 }); PK.bubble(ctx, '&*@#!!', 1010, 240, [980, 330], tk - .2, { px: 28 }); }
    // stones fly
    if (st > 0) for (let i = 0; i < 8; i++) { const p = ((lt * 1.2 + i / 8) % 1), fromL = i % 2, x = fromL ? lerp(250, 1000, p) : lerp(1000, 250, p), y = 380 - Math.sin(Math.PI * p) * 160 + i * 6; P(ctx, '#8a8278', 2, c => c.arc(x, y, 8, 0, 7)); }
    if (sw > 0) for (let i = 0; i < 6; i++) { const x = 140 + i * 200, a = Math.sin(t * 8 + i) * .8; ctx.save(); ctx.translate(x, 300); ctx.rotate(a); L(ctx, [[0, 0], [0, -60]], 7); L(ctx, [[0, 0], [0, -60]], 4, '#d8d8e0'); L(ctx, [[-12, 0], [12, 0]], 5); ctx.restore(); }
    PK.tag(ctx, 'Pompeii amphitheater, AD 59', lt);
    PK.nameCard(ctx, 'Tacitus', 'Roman historian', 1080, 120, since(t, 'tacitus', .4) * (1 - since(t, 'trash', .3)));
    PL.lbl(ctx, 'POMPEII FANS', 300, 690, 1, { px: 18, col: '#c0392b' }); PL.lbl(ctx, 'NUCERIA FANS', 980, 690, 1, { px: 18, col: '#3c6fb6' });
    PK.phon(ctx, 'Nuceria', 'noo-SEER-ee-uh', 1000, 130, since(t, 'nuceria2', .4) * (1 - since(t, 'stones', .3)));
  });
  S.fx('ad59', 'cheer'); S.fx('trash', 'crowd'); S.fx('stones', 'thud', .3, .6); S.fx('stones', 'thud', .8, .6); S.fx('swords', 'creak', 0, .4);
  S.mood('died', 'drone');
  S.cut('died', (ctx, lt, d, t) => {
    arena(ctx, t, { top: '#5a4a6a', bot: '#b0806a', ves: false });
    PL.dim(ctx, .35, '#2a1830');
    // the wounded carried home: dark silhouettes walking slowly out
    for (let i = 0; i < 3; i++) { const x = 300 + i * 260 + lt * 12; ctx.save(); ctx.globalAlpha = .9; for (const dx of [-60, 60]) F.stamp(ctx, F.roman(140 + i), x + dx, 690, .8, false); P(ctx, '#3a3040', 2, c => c.rect(x - 70, 600, 140, 14)); ctx.restore(); }
    PL.dim(ctx, .25, '#000');
  });
  S.cut('painted', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#5a4a40', '#2a201c');
    cam(ctx, lerp(1, 1.06, lt / d), 640, 360);
    St.frame(ctx, 640, 330, 620, 400, c => {
      c.fillStyle = '#e9d8b0'; c.fillRect(-310, -200, 620, 400);
      P(c, '#cdb586', 2.4, q => q.ellipse(0, 40, 230, 90, 0, 0, 7)); P(c, '#e2cf9e', 2, q => q.ellipse(0, 50, 150, 50, 0, 0, 7));
      P(c, '#b98a5a', 2, q => q.rect(-300, -180, 180, 120)); P(c, '#c49a6a', 2, q => q.rect(140, -170, 150, 100));
      const r = T.rng(6); for (let i = 0; i < 40; i++) { const x = (r() - .5) * 520, y = -60 + r() * 220; c.fillStyle = ['#7a3b2e', '#3a5a7a', '#5a4030'][i % 3]; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); c.fillRect(x - 3, y + 5, 6, 12); }
      c.fillStyle = 'rgba(120,90,50,.15)'; for (let i = 0; i < 40; i++) c.fillRect((r() - .5) * 620, (r() - .5) * 400, 30 + r() * 60, 4);
    }, { bg: '#e9d8b0' });
    PK.caption(ctx, 'Riot fresco, National Archaeological Museum of Naples (our redrawing)', lt, .6);
    PL.lbl(ctx, 'one of the only images of a real ancient sports riot', 640, 650, since(t, 'onlyimage', .4), { px: 22 });
  });

  // ---------- Rome's response: a ten-year ban ----------
  S.mood('response', 'pluck');
  S.cut('response', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe0c4');
    // senate benches
    for (let r = 0; r < 2; r++) P(ctx, '#c9a27a', 3, c => c.rect(80, 520 + r * 70, 1120, 24));
    for (let i = 0; i < 8; i++) F.stamp(ctx, F.cast('senator', { dir: i < 4 ? 1 : -1, face: { eyes: 'dot', brows: 'skeptic', mouth: 'frown' } }), 140 + i * 140, 530 + (i % 2) * 70, .75, false);
    // the poster gets the ban stamp
    PK.scaled(ctx, 640, 230, 1, c => { PK.paper(c, -170, -130, 340, 260, { fill: '#f6eedb', tape: true }); text(c, 'GLADIATOR SHOWS', 0, -90, { font: PK.DISPLAY(28) }); text(c, 'POMPEII AMPHITHEATER', 0, -50, { px: 18, w: 700 }); });
    PK.stamp(ctx, 'BANNED — 10 YEARS', 640, 240, since(t, 'ban', 1.2), { px: 40 });
    if (t > A('ban')) { PK.reset(ctx); St.calendar(ctx, 1080, 220, 'YEARS', '' + Math.min(10, Math.max(1, Math.floor((t - A('ban')) * 3))), 'of no games', .9); }
  });
  S.fx('ban', 'stamp', .1);
  S.cut('exiled', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 470 });
    P(ctx, '#d9c49a', 0, c => { c.moveTo(400, 720); c.lineTo(880, 720); c.lineTo(660, 490); c.lineTo(620, 490); c.closePath(); });
    const w = clamp(lt / 3.5);
    who(ctx, 'tacitus', lerp(640, 645, w), lerp(700, 510, w), lerp(1.3, .45, w), { dir: 0, hair: 'short', col: '#b65a4a', body: 'tunic', t, walk: t * 6, face: { eyes: 'sad', mouth: 'frown', brows: 'sad' }, armR: [10, -40], holdR: (c, x, y) => { L(c, [[x, y + 10], [x - 20, y - 50]], 4, '#7a5a3a'); P(c, '#c0563c', 2.4, q => q.arc(x - 24, y - 56, 14, 0, 7)); } });
    PK.stamp(ctx, 'ORGANIZER: EXILED', 640, 180, clamp(lt / .9), { px: 40 });
    // the fan-club banner comes down
    const c = since(t, 'clubs', 1);
    if (c > 0) { ctx.save(); ctx.translate(250, 260 + ease.in(c) * 300); ctx.rotate(c * .8); P(ctx, '#c0392b', 3, q => q.rect(-120, -30, 240, 60)); text(ctx, 'FAN CLUB', 0, 2, { font: PK.DISPLAY(26), col: '#f6c945' }); ctx.restore(); PL.lbl(ctx, 'illegal associations: shut down', 960, 330, since(t, 'clubs', .4), { px: 20 }); }
  });
  S.fx('exiled', 'stamp', .1); S.fx('clubs', 'whoosh');
  S.cut('nfl', (ctx, lt, d, t) => {
    St.sky(ctx, '#1f2a4a', '#3c4f7a');
    P(ctx, '#4a7a3a', 3, c => c.rect(-100, 520, W + 200, 300)); for (let i = 0; i < 10; i++) L(ctx, [[i * 140, 520], [i * 140 - 60, 720]], 3, 'rgba(255,255,255,.6)');
    for (const x of [100, 1180]) { L(ctx, [[x, 520], [x, 140]], 8); P(ctx, '#f6f0c8', 3, c => c.rect(x - 40, 110, 80, 40)); }
    // scoreboard
    P(ctx, '#2b2420', 4, c => c.roundRect(340, 110, 600, 240, 12));
    text(ctx, 'HOME GAMES', 640, 170, { font: PK.DISPLAY(44), col: '#f6c945' });
    text(ctx, 'CANCELLED', 640, 230, { font: PK.DISPLAY(50), col: '#e2453a' });
    text(ctx, 'UNTIL 2036', 640, 295, { font: PK.DISPLAY(44), col: '#f6c945' });
    // the one bad tailgate: a grill that flips over
    const g = clamp((lt - 1) / .8);
    ctx.save(); ctx.translate(640, 640); ctx.rotate(ease.in(g) * 1.6);
    P(ctx, '#3a3a40', 3, c => c.ellipse(0, -40, 70, 26, 0, 0, Math.PI)); L(ctx, [[-40, -20], [-60, 40]], 5); L(ctx, [[40, -20], [60, 40]], 5);
    ctx.restore(); if (g >= 1) St.puff(ctx, 700, 640, 60, clamp((lt - 1.8) / .6), '#9a948c');
    who(ctx, 'tourist', 420, 700, 1.1, { dir: 1, t, hat: 'cap', hatCol: '#3c6fb6', face: { eyes: g > .3 ? 'wide' : 'happy', mouth: g > .3 ? 'o' : 'grin' }, armR: [30, -20] });
  });
  S.fx('nfl', 'thud', 1.8);

  // ---------- then comes the ground: the earthquake ----------
  S.mood('ground', 'tension');
  S.cut('ground', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    St.calendar(ctx, 640, 290, 'FEBRUARY', '5', 'AD 62 or AD 63?', 1.3);
    const s = since(t, 'seneca1', .5);
    if (s > 0) { who(ctx, 'seneca', 250, 690, 1.3, { dir: 1, t, armR: [30, -60], holdR: (c, x, y) => PL.sign(c, '62?', x, y + 40, 1, { h: 70, px: 26 }), face: { eyes: 'dot', mouth: 'flat', brows: 'skeptic' } }); who(ctx, 'tacitus', 1030, 690, 1.3, { dir: -1, t, armL: [-30, -60], holdL: (c, x, y) => PL.sign(c, '63?', x, y + 40, 1, { h: 70, px: 26 }), face: { eyes: 'dot', mouth: 'flat', brows: 'skeptic' } }); PL.lbl(ctx, 'Seneca', 250, 470, s); PL.lbl(ctx, 'Tacitus', 1030, 470, s); }
  });
  S.fx('ground', 'rumble');
  S.cut('quake', (ctx, lt, d, t) => {
    const [sx, sy] = PK.shake(t, A('quake'), 14, 2.5);
    ctx.translate(sx, sy);
    PL.street(ctx, t, { houses: [[-60, 170, 210, { cracked: true }], [120, 150, 250, { shop: true }], [280, 200, 220, { door: true, cracked: lt > .6 }], [490, 160, 260, { shop: true }], [660, 210, 230, { door: true, cracked: lt > 1 }], [880, 160, 250, { shop: true }], [1050, 220, 220, { door: true }]] });
    // tiles falling
    for (let i = 0; i < 10; i++) { const p = clamp((lt - i * .18) / .8); if (p <= 0) continue; const x = 60 + i * 120, y = 220 + p * p * 420; ctx.save(); ctx.translate(x, Math.min(y, 640)); ctx.rotate(p * 4); P(ctx, '#c5653f', 2.4, c => c.rect(-14, -6, 28, 12)); ctx.restore(); }
    // people steady themselves
    for (const [x, n] of [[320, 3], [800, 9]]) F.person(ctx, x, 650, 1.1, F.roman(n, { t, face: { eyes: 'wide', mouth: 'o', brows: 'worried' }, armL: [-50, -10], armR: [50, -10], lean: Math.sin(t * 20) * .08 }));
    PK.big(ctx, 'EARTHQUAKE', 640, 120, 64, clamp(lt / .3), { col: '#e8693a', rot: Math.sin(t * 30) * .03 });
  });
  S.fx('quake', 'quake'); S.fx('quake', 'crumble', 1);
  S.cut('seneca2', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    who(ctx, 'seneca', 260, 690, 1.5, { dir: 1, t, face: { eyes: 'dot', mouth: PK.talk(t, A('seneca2'), A('sheep')) > .2 ? 'open' : 'flat' }, armR: [50, -30], armL: [-10, 30], holdL: (c, x, y) => St.scroll(c, x, y, 40, 60, .2) });
    PK.nameCard(ctx, 'Seneca', 'philosopher', 260, 300, clamp(lt / .4));
    // a cracked statue on a plinth
    P(ctx, '#d6cdbd', 3, c => c.rect(640, 520, 160, 120));
    F.person(ctx, 720, 520, 1.1, { body: 'toga', col: '#e6e1d6', col2: '#efeae0', legs: '#e6e1d6', shoes: '#d6cdbd', hair: 'curly', hairCol: '#d6cdbd', face: { eyes: 'closed', mouth: 'flat' }, armR: [30, -40], gloves: '#e6e1d6' });
    const k = clamp(lt / 1.2); L(ctx, [[690, 340], [710, 380], [700, 420], [725, 470], [715, 520]].slice(0, 1 + Math.floor(k * 4)), 3);
    PL.lbl(ctx, 'statues cracked', 720, 300, since(t, 'seneca2', 1.5) * 2 - 1.2);
  });
  S.fx('seneca2', 'crumble', 1, .5);
  S.cut('sheep', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 380, sun: false });
    // a flock of very still sheep
    for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { if (r === 3 && i === 4) continue; F.sheep(ctx, 80 + i * 140 + (r % 2) * 60, 470 + r * 70, .7 + r * .05, { mirror: (i + r) % 3 === 0, closed: true }); }
    // the one that's "fine"
    const k = t - A('sheep') - 1.4, hoof = k > 0 && k < 1.6, fall = clamp((k - 1.6) / .5);
    ctx.save(); ctx.translate(700, 680); ctx.rotate(ease.in(fall) * 1.57); F.sheep(ctx, 0, 0, 1, { hoof, closed: false }); ctx.restore();
    if (hoof) PK.bubble(ctx, "I'm fine.", 760, 520, [730, 590], clamp(k / .2), { px: 26 });
    PK.big(ctx, '600 SHEEP', 640, 120, 60, clamp(lt / .4), { col: '#f4ecd8' });
    const g = since(t, 'poisongas', .6);
    if (g > 0) { for (let i = 0; i < 12; i++) { const p = ((t * .3 + i / 12) % 1); ctx.save(); ctx.globalAlpha = .5 * g * (1 - p); P(ctx, '#9fcf6a', 0, c => c.arc(60 + i * 110 + Math.sin(t + i) * 20, 700 - p * 300, 20 + p * 40, 0, 7)); ctx.restore(); } PL.lbl(ctx, "Seneca's guess: poison gas from the ground", 640, 200, g, { px: 22 }); }
  });
  S.fx('sheep', 'sheep', 1.4); S.fx('sheep', 'thud', 3.1, .6);

  // ---------- the angry mountain nobody suspects ----------
  S.cut('expect', (ctx, lt, d, t) => {
    const ang = since(t, 'angry', .6);
    PL.day(ctx, t, { vesuvius: true, vx: 640, gy: 540, vs: 1, smoke: .7, face: ang > 0 ? ang : 0 });
    // Romans picnic with their backs to it
    P(ctx, '#e0605a', 3, c => c.rect(380, 640, 520, 40)); for (let i = 0; i < 6; i++) L(ctx, [[380 + i * 86, 640], [380 + i * 86, 680]], 2, '#fff');
    for (const [x, n, dir] of [[440, 3, 1], [620, 12, -1], [820, 21, -1]]) F.person(ctx, x, 690, 1.0, F.roman(n, { dir, t, face: { eyes: 'happy', mouth: 'grin' }, armR: [20, -30], holdR: (c, hx, hy) => St.amphora(c, hx, hy + 4, .4) }));
    PK.bubble(ctx, 'hey… maybe the angry mountain is the problem?', 1000, 300, [950, 420], since(t, 'angry', .4) * (1 - since(t, 'nobodydoes', .2)), { px: 20, maxW: 260 });
    if (t > A('nobodydoes')) PL.lbl(ctx, 'NOBODY DOES.', 300, 160, since(t, 'nobodydoes', .4), { px: 30 });
  });
  S.fx('angry', 'rumble', 0, .4); S.fx('nobodydoes', 'boing', 0, .4);
  S.cut('notvolcano', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 560 });
    St.vesuvius(ctx, 640, 600, 1.1, { t });
    // vineyard workers and amphorae
    const g = since(t, 'green', .5);
    for (let i = 0; i < 4; i++) { const x = 260 + i * 260; P(ctx, '#7a5a3a', 2, c => c.rect(x - 40, 580, 80, 6)); for (let j = 0; j < 4; j++) P(ctx, '#7a3b8f', 1.6, c => c.arc(x - 30 + j * 20, 600, 7, 0, 7)); if (g > 0) F.person(ctx, x + 40, 690, .9, F.roman(30 + i, { dir: -1, t, face: { eyes: 'happy', mouth: 'smile' }, armL: [-30, -10 + Math.sin(t * 3 + i) * 8] })); }
    PL.lbl(ctx, 'NOT a volcano (they thought)', 640, 130, clamp(lt / .4), { px: 30 });
    if (g > 0) PL.lbl(ctx, 'just a big green mountain covered in vineyards', 640, 190, g, { px: 22 });
  });
  S.cut('air', (ctx, lt, d, t) => {
    // Seneca's theory: air rushing around underground, cross-section
    St.sky(ctx, '#bfe0ee', '#f6ecd2'); P(ctx, '#7fa24f', 3, c => c.rect(-100, 250, W + 200, 20)); P(ctx, '#9a7552', 0, c => c.rect(-100, 270, W + 200, 500));
    P(ctx, '#5a4030', 3, c => { c.moveTo(150, 420); c.quadraticCurveTo(400, 330, 640, 420); c.quadraticCurveTo(900, 520, 1130, 420); c.quadraticCurveTo(1180, 560, 900, 600); c.quadraticCurveTo(640, 520, 400, 600); c.quadraticCurveTo(120, 560, 150, 420); c.closePath(); });
    for (let i = 0; i < 6; i++) { const p = ((t * .5 + i / 6) % 1); const x = lerp(200, 1100, p), y = 470 + Math.sin(p * 9) * 40; PK.arrow(ctx, x - 60, y, x, y, 1, { col: '#bfe3f7', w: 6 }); }
    for (const x of [250, 640, 1000]) for (let i = 0; i < 3; i++) St.house(ctx, x - 60 + i * 50, 252, 44, 40, { roof: true, roofD: 10 });
    PL.lbl(ctx, "SENECA'S THEORY: air rushing around underground", 640, 130, clamp(lt / .4), { px: 24 });
    PK.stamp(ctx, 'NOPE', 1050, 660, clamp((lt - 1.6) / .9), { px: 44 });
  });
  S.fx('air', 'wind');

  // ---------- so Pompeii renovates. For years. ----------
  S.mood('human', 'pluck');
  S.cut('human', (ctx, lt, d, t) => {
    PL.street(ctx, t, {});
    // scaffolding rises in front of the houses
    const k = since(t, 'renovating', 1.5);
    for (const x of [130, 500, 890]) { const hh = 280 * ease.out(k); for (const dx of [0, 140]) { L(ctx, [[x + dx, 470], [x + dx, 470 - hh]], 7); L(ctx, [[x + dx, 470], [x + dx, 470 - hh]], 4, '#a0764e'); } for (let y = 470 - 70; y > 470 - hh; y -= 90) P(ctx, '#b98a5a', 2.4, c => c.rect(x - 10, y, 160, 10)); }
    // calendar pages fly off for "for years"
    const y = since(t, 'years', 2);
    if (y > 0) { for (let i = 0; i < 6; i++) { const p = clamp(y * 3 - i * .4); if (p <= 0 || p >= 1) continue; ctx.save(); ctx.translate(640 + p * 400, 200 - p * 140); ctx.rotate(p * 3); PK.paper(ctx, -40, -50, 80, 100, { fill: '#fff' }); text(ctx, 'AD ' + (63 + i * 3), 0, 0, { px: 16, w: 700 }); ctx.restore(); } St.calendar(ctx, 640, 200, 'AD', '' + Math.min(79, 63 + Math.floor(y * 16)), 'still renovating', .9); }
    const st = since(t, 'stillrepair', .4);
    if (st > 0) PL.sign(ctx, 'STILL UNDER RENOVATION', 1040, 690, st, { h: 120, col: '#f2c230', px: 20 });
    who(ctx, 'worker', 380, 690, 1.2, { dir: 1, t, armR: [30, -40 + Math.sin(t * 6) * 10], holdR: (c, x, y) => P(c, '#9aa3a8', 2, q => { q.moveTo(x, y); q.lineTo(x + 30, y - 10); q.lineTo(x + 34, y + 6); q.closePath(); }) });
  });
  for (let i = 0; i < 3; i++) S.fx('renovating', 'thud', i * .4, .5); S.fx('years', 'paper', .2); S.fx('years', 'paper', .9);
  S.cut('kitchen', (ctx, lt, d, t) => {
    // split screen: neighbour's kitchen (left) vs Pompeii AD 79 (right)
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 640, H); ctx.clip();
    P(ctx, '#e9eef0', 0, c => c.rect(0, 0, 640, H)); P(ctx, '#b0a090', 0, c => c.rect(0, 500, 640, 220));
    P(ctx, '#d0d6da', 3, c => c.rect(60, 330, 500, 170)); for (let i = 0; i < 3; i++) P(ctx, '#bfc6ca', 2, c => c.rect(80 + i * 160, 350, 140, 130));
    P(ctx, '#9fb8c8', 3, c => c.rect(120, 120, 180, 140)); L(ctx, [[60, 330], [560, 330]], 6);
    // sawhorse + paint can + sticky note
    P(ctx, '#d6c79a', 3, c => c.rect(340, 560, 160, 16)); for (const x of [350, 490]) L(ctx, [[x, 576], [x - 14, 650]], 6);
    PK.scaled(ctx, 440, 190, 1, c => { P(c, '#ffe97a', 2.4, q => q.rect(-80, -60, 160, 120)); text(c, 'almost done!', 0, -20, { font: PK.HAND(28) }); text(c, '— since 2019', 0, 18, { font: PK.HAND(26), col: '#c0392b' }); }, .06);
    who(ctx, 'tourist', 220, 700, 1.1, { dir: 1, hat: 'cap', hatCol: '#7a7a7a', face: { eyes: 'half', mouth: 'flat' }, t });
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(640, 0, 640, H); ctx.clip(); ctx.translate(640, 0); ctx.scale(.5, 1);
    PL.street(ctx, t, { houses: [[0, 300, 260, { door: true }], [300, 300, 300, { door: true }], [600, 300, 240, { door: true }], [900, 300, 280, { door: true }]] });
    for (const x of [100, 700]) { for (const dx of [0, 200]) { L(ctx, [[x + dx, 470], [x + dx, 170]], 7); L(ctx, [[x + dx, 470], [x + dx, 170]], 4, '#a0764e'); } P(ctx, '#b98a5a', 2.4, c => c.rect(x - 10, 300, 220, 10)); }
    ctx.restore();
    ctx.save(); ctx.translate(960, 0);
    who(ctx, 'worker', 0, 690, 1.1, { dir: -1, t, face: { eyes: 'half', mouth: 'flat' } });
    ctx.restore();
    L(ctx, [[640, 0], [640, H]], 6);
    PL.lbl(ctx, 'your neighbor', 320, 60, 1); PL.lbl(ctx, 'Pompeii, AD 79', 960, 60, 1);
    const sc = since(t, 'scaffold', .3);
    if (sc > 0) { PL.lbl(ctx, 'SCAFFOLDING', 960, 160, sc, { px: 22 }); PL.lbl(ctx, 'WET PLASTER', 960, 220, since(t, 'scaffold', .3) * 2 - 1.8, { px: 22 }); }
  });
  S.fx('scaffold', 'pop'); S.fx('scaffold', 'pop', .9);
  S.cut('bored', (ctx, lt, d, t) => {
    cam(ctx, 1.12, 640, 380);
    St.room(ctx, { paint: .55, note: clamp(lt / 3) * .4, t });
    who(ctx, 'worker', 520, 640, 1.6, { dir: 1, t, face: { eyes: 'half', mouth: 'flat', look: [1, -.5] }, armR: [44, -60 + Math.sin(t * 20) * 4], holdR: (c, x, y) => St.charcoal(c, x + 4, y - 8, .5) });
  });
  S.fx('bored', 'scratch', .3, .7);
})(window);
