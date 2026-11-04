/* Cold open + CTA #1 (0 – 93 s). */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, S = G.PS, T = G.Toon;
  const { W, H, P, L, text, A, since, pop } = PK, { clamp, lerp, ease } = T, cam = S.cam;
  const ap = (t, k, d = .4) => pop(since(t, k, d));

  // ---------- 1. the bored worker in the half-finished room ----------
  S.mood('open', 'pluck');
  S.cut('open', (ctx, lt, d, t) => {
    const z = lerp(1.0, 1.12, ease.sine(clamp(lt / 7))); cam(ctx, z, 620, 360);
    St.room(ctx, { paint: .55, note: 0, t });
    St.bucket(ctx, 470, 560, 1, '#b8473a');
    // pick up the charcoal: bend down to the bucket at "picks", come back up
    const pick = since(t, 'picks', .9), up = since(t, 'picks', 1.6);
    const bend = Math.sin(Math.PI * clamp(pick)) * .8 * (1 - clamp((up - .6) / .4));
    const hasChar = pick > .5;
    if (!hasChar) St.charcoal(ctx, 488, 498, .9);
    const sigh = since(t, 'notpaid', .6);
    F.person(ctx, 560, 600, 1.55, F.cast('worker', { dir: -1, t, lean: -bend * .25, bob: Math.sin(t * 1.6) * 1.2 + bend * 10,
      face: { eyes: PK.blinkEyes(t) || 'half', look: [-.6, bend > .2 ? .6 : 0], brows: sigh > 0 && sigh < 1 ? 'sad' : 'calm', mouth: sigh > 0 && sigh < 1 ? 'o' : 'flat' },
      armL: bend > .05 ? [-30 - bend * 20, 40 + bend * 10] : [-6, 56], armR: hasChar ? [26, -10] : [6, 56],
      holdR: hasChar ? (c, x, y) => St.charcoal(c, x + 4, y - 8, .5) : null, holdL: null }));
    // thought bubble: the pay
    const k = since(t, 'notpaid', .4), out = since(t, 'picks', .3);
    if (k > 0 && out < 1) PK.scaled(ctx, 700, 250, pop(k) * (1 - out), c => {
      PK.P(c, '#fff', 3, cc => cc.ellipse(0, 0, 110, 70, 0, 0, 7)); for (const [x, y, r] of [[-70, 70, 12], [-95, 100, 7]]) PK.P(c, '#fff', 3, cc => cc.arc(x, y, r, 0, 7));
      text(c, 'TODAY\'S PAY:', 0, -30, { px: 20, w: 700 });
      PK.P(c, '#e7b84a', 3, cc => cc.arc(0, 14, 16, 0, 7)); text(c, '1', 0, 15, { px: 18, w: 700 });
    });
    PK.tag(ctx, 'Pompeii, 1st century AD', lt);
  });
  S.fx('notpaid', 'boing', .2, .6); S.fx('picks', 'whoosh', .3, .5);

  // ---------- 2. close on the wall: the note gets written ----------
  S.cut('scribbles', (ctx, lt, d, t) => {
    const z = lerp(1.0, 1.06, lt / d); cam(ctx, z, 640, 300);
    St.room(ctx, { paint: .55, note: 0, t, door: false });
    const k = clamp((t - A('scribbles')) / (A('notsure') - A('scribbles') - .3));
    const tip = St.noteScrawl(ctx, 640, 200, k, 1, 1.15) || [560, 200];
    // the writing hand follows the charcoal tip; forearm runs off to the bottom-right into the tunic sleeve
    if (t < A('notsure') - .2) {
      const hx = tip[0] + 6 + Math.sin(t * 22) * 1.5, hy = tip[1] + 8 + Math.sin(t * 17) * 2;
      const el = [hx + 150, hy + 230], sh = [hx + 330, hy + 420];
      PK.L(ctx, [[hx, hy], el, sh], 40); PK.L(ctx, [[hx, hy], el, sh], 33, '#fff');
      ctx.save(); ctx.translate(el[0] + 40, el[1] + 50); ctx.rotate(Math.atan2(sh[1] - el[1], sh[0] - el[0])); PK.P(ctx, '#b98652', 3.2, c => c.roundRect(0, -36, 260, 72, 14)); ctx.restore();
      PK.P(ctx, '#fff', 3.2, c => c.arc(hx + 6, hy + 8, 22, 0, 7)); St.charcoal(ctx, hx - 4, hy - 6, -.7);
    }
    // ON-SCREEN TEXT
    PK.note(ctx, ['"XVI K NOV"', 'the 16th day before the Kalends of November', '= October 17'], 640, 520, t - A('date'), { px: 30, bold0: true, w: 620, cols: ['#2b2420', '#4a3a30', '#c0392b'] });
    // the doodle: somebody eating too much
    const e = since(t, 'eating', .5);
    if (e > 0) PK.scaled(ctx, 450, 300, pop(e), c => {
      c.save(); c.globalAlpha = .85; c.lineWidth = 4; c.strokeStyle = '#2b2622'; c.lineCap = 'round';
      c.beginPath(); c.arc(0, -40, 18, 0, 7); c.stroke(); c.beginPath(); c.ellipse(0, 10, 34, 36, 0, 0, 7); c.stroke();
      c.beginPath(); c.moveTo(-14, 44); c.lineTo(-18, 70); c.moveTo(14, 44); c.lineTo(18, 70); c.moveTo(30, 0); c.lineTo(56, -14); c.stroke();
      c.beginPath(); c.ellipse(64, -22, 12, 8, -.5, 0, 7); c.stroke(); c.beginPath(); c.arc(-6, -42, 2, 0, 7); c.arc(6, -42, 2, 0, 7); c.fill(); c.beginPath(); c.arc(0, -34, 6, 0, Math.PI); c.stroke();
      c.restore();
    }, -.08);
    const q = since(t, 'notsure', .4);
    if (q > 0) { PK.qmark(ctx, 1080, 140, 80, q); PK.qmark(ctx, 1150, 200, 54, since(t, 'notsure', .4) - .2); }
  });
  for (let i = 0; i < 9; i++) S.fx('scribbles', 'scratch', i * 1.05, .9);
  S.fx('date', 'pop'); S.fx('eating', 'pop'); S.fx('notsure', 'boing', 0, .5);

  // ---------- 3. he puts it down, goes home, forgets ----------
  S.cut('down', (ctx, lt, d, t) => {
    cam(ctx, 1.04, 640, 360);
    const ev = since(t, 'forgets', 1.6);                                   // time passes after he leaves
    St.room(ctx, { paint: .55, note: 1, t });
    St.bucket(ctx, 470, 560, 1);
    const drop = t - A('down');
    const hy = drop < .25 ? 0 : G.FX ? 0 : 0;
    // charcoal: released from the hand, falls onto the plank
    const fall = Math.max(0, drop - .35), y = Math.min(305 - 6, 380 + 0) ; void y; void hy;
    const cy = fall <= 0 ? 380 : Math.min(450, 380 + 0.5 * 2400 * fall * fall * .3);
    St.charcoal(ctx, 610, cy, fall > 0 ? Math.min(1.5, fall * 6) : -.4);
    // walk to the door and out
    const w = clamp((t - A('home')) / 2.2), x = lerp(560, 1060, ease.inOut(w));
    if (w < 1) F.person(ctx, x, 600, 1.55, F.cast('worker', { dir: w > 0 ? 1 : -1, t, walk: w > 0 && w < 1 ? t * 9 : null, bob: w > 0 && w < 1 ? -Math.abs(Math.sin(t * 9)) * 4 : 0,
      face: { eyes: PK.blinkEyes(t) || 'half', mouth: 'flat' }, armR: drop < .35 ? [30, -14] : [6, 56] }));
    // forgets: a thought bubble pops, empties, and he is gone; the light swings across the room
    const f = since(t, 'forgets', .3);
    if (f > 0 && f < 1) PK.bubble(ctx, '...what note?', 1060, 250, [1060, 330], f, { think: true });
    if (ev > 0) { ctx.save(); ctx.globalAlpha = ev * .35; ctx.fillStyle = '#1b2240'; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore(); }
  });
  S.fx('down', 'tick', .55, .8); S.fx('home', 'whoosh', 1.4, .3);

  // ---------- 4. 2018: archaeologists crowd round the note ----------
  S.mood('twok', 'none'); S.mood('twok', 'market', 1.2);
  S.fx('twok', 'recordScratch');
  S.cut('twok', (ctx, lt, d, t) => {
    const news = since(t, 'news', .5);
    cam(ctx, lerp(1.1, 1.0, ease.out(clamp(lt / 1.5))), 640, 340);
    St.room(ctx, { paint: .55, note: 1, modern: true, t, door: false });
    // archaeologists: magnifier, hugging, camera
    const ar = (n, x, s, ex) => F.person(ctx, x, 690, s, F.cast(n, ex));
    ar('arch3', 380, 1.35, { dir: 1, t, face: { eyes: 'wide', mouth: 'o', look: [.6, -.4] }, armR: [40, -50], holdR: (c, x, y) => { P(c, '#3a3a40', 2.4, cc => cc.roundRect(x - 2, y - 26, 44, 30, 5)); P(c, '#9fc6d8', 2, cc => cc.arc(x + 20, y - 11, 9, 0, 7)); }, armL: [-10, 40] });
    ar('arch', 640, 1.45, { dir: 0, t, face: { eyes: 'wide', mouth: 'grin', look: [0, -.8] }, armR: [34, -60], holdR: (c, x, y) => { L(c, [[x, y], [x + 14, y - 30]], 6, '#7a4f33'); P(c, '#cfe6f0', 3, cc => cc.arc(x + 22, y - 46, 20, 0, 7)); }, bob: -Math.abs(Math.sin(t * 7)) * 5 });
    ar('arch2', 880, 1.35, { dir: -1, t, face: { eyes: 'happy', mouth: 'grin', blush: 1 }, armL: [-10, -50], armR: [10, -50], bob: -Math.abs(Math.sin(t * 6 + 1)) * 8 });
    // camera flashes
    for (const ft of [.7, 1.6, 2.2, 3.5]) { const k = t - A('twok') - ft; if (k > 0 && k < .25) { ctx.save(); ctx.globalAlpha = (1 - k / .25) * .6; ctx.fillStyle = '#fff'; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore(); } }
    PK.tag(ctx, 'October 2018', lt);
    // newspapers spin in
    const papers = [['THE DAILY TROWEL', ['2,000-YEAR-OLD', 'DOODLE FOUND!']], ['MORNING AMPHORA', ['CHARCOAL NOTE', 'STUNS EXPERTS']], ['WORLD SCROLL', ['THE WALL', 'THAT WROTE BACK']]];
    papers.forEach((p, i) => { const k = since(t, 'news', .5) - i * .45 / .5 * .5; if (k <= 0) return; const kk = ease.out(clamp(k)); PK.scaled(ctx, 380 + i * 260, 380 + i * 18, kk, c => St.newspaper(c, 0, 0, 330, 250, p[0], p[1], { rot: (1 - kk) * 6 + (i - 1) * .06 }), 0); });
    // textbook with the date circled, then stamped
    const tb = since(t, 'textbook', .5);
    if (tb > 0) {
      ctx.save(); ctx.globalAlpha = clamp(tb * 2) * .5; ctx.fillStyle = '#000'; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore();
      PK.scaled(ctx, 640, 380, pop(tb), c => {
        P(c, '#7a3b2e', 3, cc => cc.roundRect(-330, -190, 660, 380, 10)); P(c, '#f4ecd8', 3, cc => cc.rect(-310, -175, 300, 350)); P(c, '#f4ecd8', 3, cc => cc.rect(10, -175, 300, 350));
        text(c, 'HISTORY', -160, -140, { font: PK.DISPLAY(30) }); text(c, 'Chapter 7', -160, -105, { px: 18 });
        for (let i = 0; i < 8; i++) L(c, [[-290, -70 + i * 26], [-30 - (i % 3) * 30, -70 + i * 26]], 3, 'rgba(80,70,60,.3)');
        text(c, 'Vesuvius erupts:', 160, -110, { px: 24, w: 700 }); text(c, 'AUGUST 24,', 160, -60, { font: PK.DISPLAY(40) }); text(c, 'AD 79', 160, -15, { font: PK.DISPLAY(40) });
        for (let i = 0; i < 5; i++) L(c, [[30, 40 + i * 24], [290 - (i % 2) * 40, 40 + i * 24]], 3, 'rgba(80,70,60,.3)');
        PK.ring(c, 160, -38, 140, 64, since(t, 'textbook', 1.2) * 1.2 - .2);
      });
      PK.stamp(ctx, 'WRONG DATE?', 820, 470, since(t, 'wrongdate', 1), { px: 52 });
    }
  });
  S.fx('news', 'paper'); S.fx('news', 'paper', .45); S.fx('news', 'paper', .9); S.fx('textbook', 'thud'); S.fx('wrongdate', 'stamp');
  for (const ft of [.7, 1.6, 2.2, 3.5]) S.fx('twok', 'flash', ft, .6);

  // ---------- 5. the story you know: a pop-up book ----------
  S.cut('thing', (ctx, lt, d, t) => {
    St.sky(ctx, '#3a2f3f', '#6a4f4a'); ctx.fillStyle = '#5a3e2e'; ctx.fillRect(-400, 560, W + 800, 400);
    cam(ctx, lerp(1, 1.08, lt / d), 640, 380);
    // the open book
    P(ctx, '#7a3b2e', 3, c => c.roundRect(150, 170, 980, 470, 14));
    P(ctx, '#f6eedb', 3, c => c.roundRect(170, 180, 460, 440, 6)); P(ctx, '#f6eedb', 3, c => c.roundRect(650, 180, 460, 440, 6));
    text(ctx, 'The Story of Pompeii', 400, 220, { font: PK.HAND(36) });
    text(ctx, '(the version you know)', 400, 255, { font: PK.FONT(500, 18), col: '#7a6a5a' });
    // left page: the volcano goes boom
    const boom = since(t, 'boom', .6), bk = t - A('boom');
    ctx.save(); ctx.beginPath(); ctx.rect(170, 180, 460, 440); ctx.clip();
    St.vesuvius(ctx, 400, 600, .55, { t, col: boom > 0 ? clamp(bk / 1.2) : 0, smoke: boom > 0 ? 0 : .6 });
    if (bk > 0 && bk < .5) PK.big(ctx, 'BOOM!', 400, 330, 70, clamp(bk / .2), { col: '#e8693a', rot: -.08 });
    ctx.restore();
    // right page: everybody freezes
    const fz = since(t, 'freezes', .5);
    const poses = [[760, 560, { armL: [-30, -40], armR: [40, -20], face: { eyes: 'wide', mouth: 'o' } }], [880, 560, { armL: [-40, 0], armR: [10, -55], face: { eyes: 'wide', mouth: 'open' } }], [1000, 560, { armR: [40, -40], face: { eyes: 'wide', mouth: 'o', brows: 'worried' } }]];
    ctx.save(); ctx.beginPath(); ctx.rect(650, 180, 460, 440); ctx.clip();
    poses.forEach(([x, y, o], i) => {
      const run = fz > 0 ? 0 : Math.sin(t * 9 + i) * 1;
      F.person(ctx, x + run * 4, y, .95, Object.assign(F.roman(i * 7 + 3), o, { dir: -1, walk: fz > 0 ? null : t * 9 + i, t }));
    });
    if (fz > 0) { ctx.globalAlpha = .55 * fz; ctx.fillStyle = '#bcd8ec'; ctx.fillRect(650, 180, 460, 440); ctx.globalAlpha = 1; for (let i = 0; i < 6; i++) L(ctx, [[700 + i * 70, 300], [690 + i * 70, 320]], 3, '#ffffff'); }
    ctx.restore();
    const te = since(t, 'theend', .5);
    if (te > 0) text(ctx, 'THE END', 880, 260, { font: PK.HAND(64), col: '#2b2420' });
    // except: big red crosses over every page
    const ex = since(t, 'except', 1.2);
    if (ex > 0) { PK.cross(ctx, 400, 450, 90, ex * 1.5); PK.cross(ctx, 880, 450, 90, ex * 1.5 - .4); PK.stamp(ctx, 'NOT QUITE', 640, 400, since(t, 'except', 1.2) - .5, { px: 60 }); }
  });
  S.fx('boom', 'explosion', 0, .7); S.fx('freezes', 'sizzle'); S.fx('theend', 'tada', 0, .6); S.fx('except', 'recordScratch'); S.fx('except', 'stamp', .7);

  // ---------- 6. MAP: Bay of Naples, AD 79 ----------
  S.cut('fivetimes', (ctx, lt, d, t) => {
    const B = St.BAY; cam(ctx, lerp(1.25, 1.5, ease.inOut(clamp(lt / d))), lerp(700, 770, clamp(lt / d)), 400);
    St.bayMap(ctx, {});
    St.town(ctx, 'Misenum', ...B.misenum, 1); St.town(ctx, 'Neapolis', ...B.naples, 1); St.town(ctx, 'Herculaneum', ...B.herc, 1, { dx: -30 }); St.town(ctx, 'Stabiae', ...B.stabiae, 1, { dx: -46, dy: 6 });
    St.town(ctx, 'Nuceria', ...B.nuceria, 1);
    St.pulse(ctx, ...B.pompeii, t); St.town(ctx, 'POMPEII', ...B.pompeii, 1, { col: '#d0392b', r: 10, px: 24, dx: 50, dy: -14 });
    text(ctx, 'Vesuvius', B.vesuvius[0], B.vesuvius[1] - 44, { px: 20, w: 700, stroke: 5, strokeCol: '#f4ecd8' });
    // distance line ~6 miles
    const k = clamp(lt / 1.2);
    ctx.save(); ctx.setLineDash([6, 6]); L(ctx, [B.vesuvius, [lerp(B.vesuvius[0], B.pompeii[0], k), lerp(B.vesuvius[1], B.pompeii[1], k)]], 3, '#2b2420'); ctx.restore();
    if (k >= 1) text(ctx, '≈ 6 miles', 790, 360, { px: 18, w: 700, stroke: 5, strokeCol: '#f4ecd8', col: '#c0392b' });
    PK.tag(ctx, 'Bay of Naples, AD 79', lt);
    const c5 = since(t, 'count', .5);
    if (c5 > 0) { PK.reset(ctx); PK.big(ctx, 'BURIED: 5 TIMES', W / 2, 620, 58, c5, { col: '#f4ecd8', rot: -.02 }); }
  });
  S.fx('fivetimes', 'whoosh'); S.fx('count', 'thud');

  // ---------- 7. five burials: layers stack over a little town ----------
  const layerCols = ['#f2e6c4', '#9d958a', '#7fa24f', '#c97f5a', '#c9a27a'];
  S.cut('b1', (ctx, lt, d, t) => {
    St.sky(ctx, '#bfe0ee', '#f6ecd2'); St.sun(ctx, 1080, 120, 40);
    St.ground(ctx, 620, '#b98a5a');
    // a little town on the ground
    const tw = c => { for (const [x, w, h] of [[360, 120, 90], [490, 90, 120], [590, 130, 80], [730, 100, 110], [840, 90, 70]]) St.house(c, x, 620, w, h, { door: w > 100, roofD: 18 }); };
    tw(ctx);
    const keys = ['b1', 'b2', 'b3', 'b4', 'b5'];
    let top = 620;
    keys.forEach((k, i) => {
      const p = since(t, k, .7); if (p <= 0) return;
      const hgt = [70, 110, 40, 50, 60][i], yy = top - hgt * ease.out(p);
      const yDrop = lerp(-200, 0, ease.out(p));
      ctx.save(); ctx.translate(0, yDrop * (1 - p));
      P(ctx, layerCols[i], 3, c => { c.moveTo(250, top + 2); c.quadraticCurveTo(300, yy, 400, yy + 6); c.lineTo(900, yy - 4); c.quadraticCurveTo(990, yy, 1030, top + 2); c.closePath(); });
      // layer details
      ctx.save(); ctx.beginPath(); ctx.moveTo(250, top + 2); ctx.quadraticCurveTo(300, yy, 400, yy + 6); ctx.lineTo(900, yy - 4); ctx.quadraticCurveTo(990, yy, 1030, top + 2); ctx.closePath(); ctx.clip();
      const r = T.rng(i + 2);
      if (i === 0) for (let j = 0; j < 30; j++) { ctx.save(); ctx.translate(300 + r() * 680, yy + r() * hgt); ctx.rotate(r() - .5); P(ctx, '#fffaf0', 1.6, c => c.rect(-16, -11, 32, 22)); L(ctx, [[-10, -4], [10, -4]], 1.4, '#9a8a70'); ctx.restore(); }
      if (i === 1) for (let j = 0; j < 40; j++) P(ctx, '#b5ada2', 0, c => c.arc(300 + r() * 680, yy + r() * hgt, 3 + r() * 5, 0, 7));
      if (i === 3) for (let j = 0; j < 14; j++) { ctx.save(); ctx.translate(300 + r() * 680, yy + 10 + r() * (hgt - 10)); ctx.rotate(r() - .5); P(ctx, '#f4ecd8', 1.6, c => c.rect(-22, -9, 44, 18)); text(ctx, ['MOTHER', 'SISTERS', 'LEGEND', 'MYTH'][j % 4], 0, 0, { px: 9, w: 700 }); ctx.restore(); }
      if (i === 4) for (let j = 0; j < 30; j++) { ctx.save(); ctx.translate(300 + r() * 680, yy + 8 + r() * hgt); ctx.rotate(r() * 2); P(ctx, '#b48e66', 1.6, c => c.rect(-9, -6, 18, 12)); ctx.restore(); }
      ctx.restore();
      if (i === 2) { St.tufts(ctx, 4, 320, 960, yy - 2, yy + 2, 24, '#5f8a3a'); St.pine(ctx, 700, yy + 4, 90); }
      ctx.restore();
      top = yy;
    });
    PK.burials(ctx, Math.max(1, keys.filter(k => t >= A(k)).length), clamp((t - A(keys[Math.max(0, keys.filter(k => t >= A(k)).length - 1)])) / 1), W / 2, 120, { label: ['BY ROME', 'BY A VOLCANO', 'BY TIME', 'BY OUR OWN STORIES', 'BY ITS OWN WALLS'][Math.max(0, keys.filter(k => t >= A(k)).length - 1)] });
  });
  ['b1', 'b2', 'b3', 'b4', 'b5'].forEach(k => { S.fx(k, 'thud'); S.fx(k, 'pop', .4); });

  // ---------- 8. every time, somebody digs it back out ----------
  S.cut('dig', (ctx, lt, d, t) => {
    St.sky(ctx, '#bfe0ee', '#f6ecd2'); St.sun(ctx, 1080, 120, 40); St.ground(ctx, 470, '#9a7552');
    // dug pit revealing the town
    const k = clamp(lt / (d - .3));
    P(ctx, '#6e5038', 3, c => { c.moveTo(250, 470); c.lineTo(330, 640); c.lineTo(950, 640); c.lineTo(1030, 470); c.closePath(); });
    ctx.save(); ctx.beginPath(); ctx.moveTo(250, 470); ctx.lineTo(330, 640); ctx.lineTo(950, 640); ctx.lineTo(1030, 470); ctx.closePath(); ctx.clip();
    ctx.translate(0, lerp(170, 20, ease.out(k)));
    for (const [x, w, h] of [[360, 120, 90], [490, 90, 120], [590, 130, 80], [730, 100, 110], [840, 90, 70]]) St.house(ctx, x, 620, w, h, { door: w > 100, roofD: 18 });
    ctx.restore();
    // diggers along the rim, shovels in rhythm
    const xs = [220, 420, 640, 860, 1060];
    xs.forEach((x, i) => {
      const ph = (t * 1.6 + i * .37) % 1, sh = Math.sin(ph * Math.PI * 2);
      F.person(ctx, x, 480, .95, F.cast(i % 2 ? 'digger' : 'arch', { dir: x < 640 ? 1 : -1, t, armL: [x < 640 ? 34 : -34, 20 + sh * 16], armR: [x < 640 ? 44 : -44, 4 + sh * 16], holdR: (c, hx, hy) => St.shovel(c, hx, hy + 10, (x < 640 ? -1 : 1) * (.8 + sh * .3), .8), face: { eyes: 'dot', mouth: 'flat', brows: 'calm' } }));
      if (sh > .9) St.puff(ctx, x + (x < 640 ? 70 : -70), 500, 30, (ph * 4) % 1, '#9a7552');
    });
  });
  for (let i = 0; i < 6; i++) S.fx('dig', 'dig', i * .62, .7);

  // ---------- 9. a perfectly average beach town nobody important cared about ----------
  S.cut('how', (ctx, lt, d, t) => {
    St.sky(ctx, '#a8d6ea', '#f7ecd0'); St.sun(ctx, 1040, 110, 44); St.clouds(ctx, t, [[200, 120, .8], [700, 90, .6]], 6);
    St.vesuvius(ctx, 330, 470, .9, { t });
    St.sea(ctx, 560, t);
    // the town on the shore
    St.hills(ctx, 520, '#c9b48a', 3, 20, 500, 1700);
    for (const [x, w, h] of [[640, 90, 70], [740, 110, 90], [860, 80, 60], [950, 120, 80], [1080, 90, 70]]) St.house(ctx, x, 530, w, h, { roofD: 16 });
    PK.reset(ctx);
    // the "average" meter
    PK.scaled(ctx, 300, 140, pop(since(t, 'how', .5)), c => {
      PK.paper(c, -150, -50, 300, 100, { tape: true }); text(c, 'IMPORTANCE', 0, -24, { px: 18, w: 700 });
      P(c, '#e4d6b8', 2.4, cc => cc.roundRect(-120, -4, 240, 26, 13)); P(c, '#e7b84a', 2.4, cc => cc.roundRect(-120, -4, 240 * .5, 26, 13)); text(c, 'MEH', 0, 9, { px: 16, w: 700 });
    });
    // VIPs on a litter pass by without looking
    const v = since(t, 'nobody', 2.6);
    if (v > 0) {
      const x = lerp(-260, 1500, v);
      P(ctx, '#7a3b2e', 3, c => c.roundRect(x - 90, 520, 180, 60, 8)); P(ctx, '#c99a45', 3, c => c.rect(x - 140, 572, 280, 10));
      F.person(ctx, x, 590, .9, F.cast('senator', { dir: 1, t, face: { eyes: 'closed', brows: 'skeptic', mouth: 'flat', look: [1, -1] }, tilt: -.15, hat: 'wreath' }));
      for (const dx of [-120, 120]) F.person(ctx, x + dx, 690, .8, F.roman(dx > 0 ? 4 : 9, { dir: 1, walk: t * 10, t }));
      PK.bubble(ctx, 'Pompeii? Never heard of it.', x + 60, 420, [x + 20, 470], clamp(v * 6), { px: 20 });
    }
  });
  S.fx('nobody', 'whoosh', .5, .5);
  S.cut('famous', (ctx, lt, d, t) => {
    St.sky(ctx, '#2c2b48', '#5a4a6a');
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#ffeec0'; ctx.beginPath(); const x = 640 + (i - 2) * 140; ctx.moveTo(x - 20, -50); ctx.lineTo(x + 20, -50); ctx.lineTo(640 + (i - 2) * 30 + 120, 520); ctx.lineTo(640 + (i - 2) * 30 - 120, 520); ctx.fill(); ctx.restore(); }
    cam(ctx, lerp(1, 1.08, lt / d), 640, 380);
    P(ctx, '#c99a45', 3, c => c.rect(420, 470, 440, 60)); P(ctx, '#e7b84a', 3, c => c.rect(460, 420, 360, 52)); text(ctx, '#1', 640, 448, { font: PK.DISPLAY(36) });
    for (const [x, w, h] of [[480, 90, 80], [575, 90, 110], [680, 110, 70]]) St.house(ctx, x, 420, w, h, { roofD: 16, cracked: true });
    PK.big(ctx, 'MOST FAMOUS DEAD CITY ON EARTH', 640, 120, 46, since(t, 'famous', .5), { col: '#f6c945' });
    // a crowd of silhouettes with flashes
    for (let i = 0; i < 14; i++) { const x = 60 + i * 90; P(ctx, '#1b1a2a', 0, c => { c.arc(x, 640, 36, 0, 7); c.rect(x - 40, 670, 80, 100); }); if (((t * 3 + i * .37) % 1) < .08) { ctx.save(); ctx.globalAlpha = .8; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 20, 610, 16, 0, 7); ctx.fill(); ctx.restore(); } }
  });
  S.fx('famous', 'tada', 0, .6); S.fx('famous', 'flash', .4, .4); S.fx('famous', 'flash', 1.1, .4);

  // ---------- 10. title: let's dig ----------
  S.mood('letsdig', 'none'); S.mood('cta1', 'pluck');
  S.cut('letsdig', (ctx, lt, d, t) => {
    St.sky(ctx, '#bfe0ee', '#f6ecd2'); St.ground(ctx, 560, '#9a7552');
    const k = clamp(lt / .5);
    St.shovel(ctx, 640, lerp(800, 560, ease.out(k)) - 60, -.1, 1.4);
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i - 4.5) * .25, dd = lt * 400; if (lt < 1.2) P(ctx, '#7a5a3c', 2, c => c.arc(640 + Math.cos(a) * dd, 560 + Math.sin(a) * dd + 600 * lt * lt, 8, 0, 7)); }
    PK.big(ctx, 'POMPEII', 640, 250, 130, clamp((lt - .2) / .4), { col: '#f4ecd8' });
    PK.big(ctx, 'BURIED FIVE TIMES', 640, 360, 46, clamp((lt - .6) / .4), { col: '#e8693a' });
  });
  S.fx('letsdig', 'dig'); S.fx('letsdig', 'gong', .2, .5);

  // ---------- 11. CTA #1: more plot twists than a soap opera ----------
  S.cut('cta1', (ctx, lt, d, t) => {
    St.sky(ctx, '#f3d9b5', '#e9b98a'); P(ctx, '#7a4f33', 0, c => c.rect(-400, 560, W + 800, 400));
    // old TV set
    const tvz = lerp(1, 1.04, lt / d); cam(ctx, tvz, 640, 360);
    P(ctx, '#8a5a34', 4, c => c.roundRect(300, 120, 680, 470, 30)); P(ctx, '#2b2420', 3, c => c.roundRect(330, 150, 520, 400, 20));
    for (const y of [220, 300]) P(ctx, '#d9a441', 3, c => c.arc(915, y, 22, 0, 7)); for (const x of [380, 900]) L(ctx, [[x, 590], [x - (x < 640 ? 30 : -30), 650]], 8);
    ctx.save(); ctx.beginPath(); ctx.roundRect(330, 150, 520, 400, 20); ctx.clip();
    // on screen: a dramatic soap close-up (two Romans gasping), with zoom snap
    const snap = Math.floor(lt / 1.4) % 2, zz = 1 + (lt % 1.4) * .08;
    ctx.translate(590, 400); ctx.scale(zz, zz); ctx.translate(-590, -400);
    St.sky(ctx, '#e7a9b6', '#f2d3c4');
    F.person(ctx, 500, 640, 1.6, F.roman(3, { dir: 1, t, face: { eyes: snap ? 'wide' : 'dot', mouth: 'o', brows: 'worried' }, armL: [-10, -50] }));
    F.person(ctx, 700, 660, 1.6, F.roman(12, { dir: -1, t, face: { eyes: 'dot', mouth: 'smirk', brows: 'angry' }, armR: [10, -40] }));
    ctx.restore();
    text(ctx, 'PLOT TWIST!', 590, 190, { font: PK.DISPLAY(36), col: '#f6c945', stroke: 7 });
    PK.reset(ctx);
    // the three teasers
    const cards = [['mother', '"THE MOTHER"', '…was a man'], ['bombs', '160+', 'bombs'], ['datewrong', 'AUG 24?', 'wrong in every textbook?']];
    cards.forEach(([k, a, b], i) => {
      const p = since(t, k, .5); if (p <= 0) return;
      PK.scaled(ctx, 200 + i * 440, 600, pop(p), c => {
        PK.paper(c, -170, -80, 340, 160, { tape: true });
        if (i === 0) { P(c, '#fff', 2.4, cc => cc.rect(-150, -60, 300, 54)); text(c, a, 0, -33, { font: PK.FONT(700, 28) }); text(c, b, 0, 30, { font: PK.HAND(34), col: '#c0392b' }); }
        if (i === 1) { text(c, a, -40, -10, { font: PK.DISPLAY(64), col: '#c0392b' }); text(c, b, 90, -6, { font: PK.FONT(700, 30) }); for (let j = 0; j < 4; j++) bomb(c, -120 + j * 70, 55, .5); }
        if (i === 2) { text(c, a, 0, -20, { font: PK.DISPLAY(50) }); text(c, b, 0, 36, { font: PK.HAND(28), col: '#c0392b' }); }
      }, (i - 1) * .04);
    });
  });
  S.fx('cta1', 'sting'); S.fx('mother', 'pop'); S.fx('bombs', 'whistle', 0, .4); S.fx('datewrong', 'pop');
  function bomb(c, x, y, s) { PK.scaled(c, x, y, s, cc => { P(cc, '#4a4a52', 3, q => q.ellipse(0, 0, 18, 34, 0, 0, 7)); P(cc, '#4a4a52', 3, q => { q.moveTo(-14, -30); q.lineTo(14, -30); q.lineTo(10, -46); q.lineTo(-10, -46); q.closePath(); }); }); }
  G.PBomb = bomb;

  // ---------- 12. watch to the end: our worker walks the progress bar ----------
  S.cut('watch', (ctx, lt, d, t) => {
    St.sky(ctx, '#2b2a33', '#3b3a45');
    const k = clamp(lt / (d - .2));
    P(ctx, '#5a5a66', 3, c => c.roundRect(140, 440, 1000, 22, 11)); P(ctx, '#d0392b', 3, c => c.roundRect(140, 440, 1000 * lerp(.05, .97, k), 22, 11));
    F.person(ctx, 140 + 1000 * lerp(.05, .97, k), 436, .9, F.cast('worker', { dir: 1, walk: t * 10, t, bob: -Math.abs(Math.sin(t * 10)) * 4, face: { eyes: 'dot', mouth: 'smile' } }));
    // finish flag
    L(ctx, [[1140, 440], [1140, 320]], 5); P(ctx, '#fff', 3, c => { c.moveTo(1140, 320); c.lineTo(1210, 340); c.lineTo(1140, 360); c.closePath(); });
    text(ctx, 'WATCH TO THE END', 640, 220, { font: PK.DISPLAY(56), col: '#f6c945', stroke: 9 });
    text(ctx, '0:00', 150, 500, { px: 20, col: '#cfcfd8' }); text(ctx, 'THE END', 1120, 500, { px: 20, col: '#cfcfd8' });
  });

  // ---------- 13. back to the Bay of Naples: a city to dig up ----------
  S.cut('backbay', (ctx, lt, d, t) => {
    const B = St.BAY, k = ease.inOut(clamp(lt / 2));
    cam(ctx, lerp(1, 2.2, k), lerp(640, B.pompeii[0], k), lerp(360, B.pompeii[1] - 30, k));
    St.bayMap(ctx, {});
    St.pulse(ctx, ...B.pompeii, t); St.town(ctx, 'Pompeii', ...B.pompeii, 1, { col: '#d0392b', r: 9, dx: 0, dy: 26 });
    const s = since(t, 'cityup', .5);
    if (s > 0) { St.shovel(ctx, B.pompeii[0] + 10, B.pompeii[1] - 60 + 20 * (1 - ease.out(s)), -.25 + Math.sin(t * 5) * .05, .6); }
    PK.reset(ctx);
    if (s > 0) PK.big(ctx, 'LET\'S DIG IT UP', 640, 640, 50, s, { col: '#f4ecd8' });
  });
  S.fx('backbay', 'whoosh'); S.fx('cityup', 'dig');
})(window);
