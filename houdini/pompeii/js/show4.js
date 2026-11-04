/* Beat 5 (recap) + Beat 6: the eruption, as an eyewitness saw it (460 – 735 s). */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, S = G.PS, T = G.Toon, PL = G.PL;
  const { W, H, P, L, text, A, since, pop } = PK, { clamp, lerp, ease } = T, cam = S.cam;
  const who = PL.who;

  // ---------- recap ----------
  S.mood('wherewere', 'pluck');
  S.cut('wherewere', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    PK.big(ctx, 'NOW, WHERE WERE WE?', 640, 90, 48, clamp(lt / .4), { col: '#f6c945' });
    const panels = [['recap', 'joined Rome the hard way'], ['recap', 'survived a riot + an earthquake'], ['recap', 'halfway through a renovation']];
    panels.forEach(([k, s], i) => {
      const p = since(t, k, .4) - i * .9; if (p <= 0) return;
      const x = 230 + i * 410;
      PK.scaled(ctx, x, 360, pop(clamp(p)), c => {
        St.frame(c, 0, 0, 320, 220, cc => {
          if (i === 0) { St.sky(cc, '#a8d6ea', '#f7ecd0'); F.person(cc, -60, 110, .8, F.cast('sulla', { dir: 1, face: { eyes: 'dot', mouth: 'smirk' } })); F.person(cc, 70, 110, .8, F.cast('pompeian', { dir: -1, face: { eyes: 'dot', mouth: 'wavy', brows: 'worried' } })); }
          if (i === 1) { P(cc, '#c9b48a', 0, q => q.rect(-160, -110, 320, 220)); P(cc, '#e6d2a0', 2, q => q.ellipse(0, 50, 140, 40, 0, 0, 7)); for (let j = 0; j < 6; j++) P(cc, '#8a8278', 2, q => q.arc(-120 + j * 50, -40 + (j % 2) * 30, 7, 0, 7)); L(cc, [[-40, -100], [-20, -60], [-46, -20], [-30, 20]], 4); }
          if (i === 2) { P(cc, '#efe1c2', 0, q => q.rect(-160, -110, 320, 220)); for (const dx of [-80, 60]) { L(cc, [[dx, 110], [dx, -100]], 6, '#a0764e'); } P(cc, '#b98a5a', 2, q => q.rect(-100, -10, 200, 10)); }
        }, {});
        text(c, s, 0, 150, { px: 20, w: 700 });
      }, (i - 1) * .03);
    });
    const r = since(t, 'recap', 4) * 1.4 - .6;
    if (r > 0) { P(ctx, '#e4d6b8', 3, c => c.roundRect(340, 600, 600, 30, 15)); P(ctx, '#f2c230', 3, c => c.roundRect(340, 600, 600 * .47 * clamp(r * 2), 30, 15)); text(ctx, 'RENOVATION: 47%', 640, 616, { px: 18, w: 700 }); }
  });
  S.cut('mountain', (ctx, lt, d, t) => {
    const k = ease.inOut(clamp(lt / (d - .2)));
    cam(ctx, lerp(1, 1.4, k), 900, lerp(560, 330, k));
    PL.street(ctx, t, { vx: 900, smoke: .4 });
  });
  S.fx('mountain', 'swell');

  // ---------- one teenager: Pliny the Younger ----------
  S.over('teen', 'pliny', (ctx, lt) => PK.chapter(ctx, 'THE CLIMAX: THE ERUPTION', lt, 2.2));
  S.cut('teen', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#f0dfc0');
    // villa interior wall + window onto the bay
    P(ctx, '#e9d4b0', 0, c => c.rect(-100, -100, W + 200, 600)); P(ctx, '#b8473a', 0, c => c.rect(-100, 380, W + 200, 120)); L(ctx, [[-100, 380], [W + 100, 380]], 3);
    P(ctx, '#9fd0e8', 3, c => c.rect(820, 90, 300, 220)); P(ctx, '#7fb9cf', 0, c => c.rect(823, 230, 294, 77)); St.vesuvius(ctx, 1000, 236, .22, { t }); L(ctx, [[970, 90], [970, 310]], 4);
    P(ctx, '#a0764e', 3, c => c.rect(260, 470, 520, 26)); for (const x of [290, 750]) L(ctx, [[x, 496], [x, 640]], 8);
    St.scroll(ctx, 520, 450, 140, 60, .05);
    who(ctx, 'younger', 520, 690, 1.45, { dir: 0, t, face: { eyes: PK.blinkEyes(t) || 'half', brows: 'worried', mouth: 'frown' }, armL: [-30, 20], armR: [36, 20], holdR: (c, x, y) => L(c, [[x, y], [x + 10, y - 30]], 3, '#4a3a30') });
    PK.nameCard(ctx, 'Pliny the Younger', 'age 17', 520, 160, since(t, 'pliny', .4));
    PK.phon(ctx, 'Misenum', 'my-SEE-num', 970, 400, since(t, 'misenum', .4));
    const u = since(t, 'uncle', .6);
    if (u > 0) { who(ctx, 'elder', lerp(1400, 1000, ease.out(u)), 700, 1.5, { dir: -1, t, walk: u < 1 ? t * 8 : null, face: { eyes: 'dot', mouth: 'smile', brows: 'up' } }); PK.nameCard(ctx, 'Pliny the Elder', 'his uncle', 1000, 330, since(t, 'uncle', .4) * 1.2 - .3); }
  });
  S.fx('pliny', 'pop'); S.fx('uncle', 'whoosh', 0, .5);
  S.cut('elder', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 600, sun: false }); St.sea(ctx, 420, t);
    for (let i = 0; i < 3; i++) St.galley(ctx, 200 + i * 360, 470 + (i % 2) * 30, .55, t, { stripe: '#b8322b' });
    who(ctx, 'elder', 640, 700, 1.7, { dir: 0, t, medal: true, face: { eyes: 'happy', mouth: 'grin', brows: 'up' }, armL: [-30, -10], armR: [30, -10] });
    PL.lbl(ctx, 'ADMIRAL OF THE ROMAN FLEET', 640, 120, clamp(lt / .4), { px: 30 });
    const w = since(t, 'wiki', .6);
    if (w > 0) {
      PL.dim(ctx, .45 * w);
      // a towering stack of scrolls
      const n = Math.floor(clamp(w * 1.3) * 18);
      for (let i = 0; i < n; i++) St.scroll(ctx, 1040 + (i % 2) * 14 - 7, 680 - i * 34, 110, 30, Math.PI / 2 + (i % 3 - 1) * .05, '#f2e6c4');
      PL.lbl(ctx, 'his encyclopedia: basically ancient Wikipedia', 640, 200, w, { px: 24 });
    }
  });
  S.fx('wiki', 'paper'); S.fx('wiki', 'paper', .3); S.fx('wiki', 'paper', .6);
  S.cut('neverslept', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3a2f40', '#141018');
    St.sun(ctx, 1120, 110, 30, '#f4f0d8');
    P(ctx, '#6b4630', 3, c => c.rect(300, 470, 680, 26));
    // oil lamp glow
    const gx = 400, gy = 450; const g = ctx.createRadialGradient(gx, gy, 10, gx, gy, 380); g.addColorStop(0, 'rgba(255,200,120,.55)'); g.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    P(ctx, '#c99a45', 3, c => c.ellipse(gx, gy + 10, 34, 12, 0, 0, 7)); P(ctx, '#ffd36a', 0, c => c.ellipse(gx + 22, gy - 8 + Math.sin(t * 9) * 2, 6, 12, 0, 0, 7));
    for (let i = 0; i < Math.min(12, 3 + lt * 2.5); i++) St.scroll(ctx, 880 + (i % 2) * 12, 450 - i * 22, 100, 20, Math.PI / 2, '#f2e6c4');
    who(ctx, 'elder', 640, 700, 1.5, { dir: 0, t, face: { eyes: 'wide', mouth: 'flat', brows: 'up' }, armR: [36, 0 + Math.sin(t * 18) * 4], holdR: (c, x, y) => L(c, [[x, y], [x + 10, y - 30]], 3, '#4a3a30') });
    PL.lbl(ctx, '…written by one man who never slept', 640, 120, clamp(lt / .4), { px: 26 });
  });

  // ---------- decades later: Tacitus asks; two letters ----------
  S.cut('decades', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    who(ctx, 'tacitus', 220, 690, 1.4, { dir: 1, t, face: { eyes: 'dot', mouth: 'flat', brows: 'up' }, armR: [36, -20] });
    who(ctx, 'younger', 1060, 690, 1.4, { dir: -1, t, beard: 'stubble', hair: 'curly', hairCol: '#5a3a24', body: 'toga', col: '#f0ebe0', stripe: '#7a3b8f', face: { eyes: 'dot', mouth: 'flat', brows: 'sad' } });
    PK.nameCard(ctx, 'Tacitus', 'historian', 220, 300, clamp(lt / .4)); PL.lbl(ctx, 'Pliny the Younger, decades later', 1060, 300, clamp(lt / .4), { px: 18 });
    // the question flies right
    const q = clamp((lt - .6) / 1.4); if (q < 1 && q > 0) { const x = lerp(300, 980, ease.inOut(q)), y = 420 - Math.sin(Math.PI * q) * 120; PK.scaled(ctx, x, y, 1, c => { PK.paper(c, -90, -40, 180, 80, { fill: '#fff8e6' }); text(c, 'How did your uncle die?', 0, 0, { font: PK.HAND(22), maxW: 160 }); }, Math.sin(q * 6) * .1); }
    // two letters come back
    const r = since(t, 'twoletters', 1.2);
    for (let i = 0; i < 2; i++) { const p = clamp(r * 1.4 - i * .3); if (p <= 0) continue; const x = lerp(980, 520 + i * 200, ease.out(p)), y = lerp(420, 400, p); PK.scaled(ctx, x, y, 1, c => { St.scroll(c, 0, 0, 150, 190, (i - .5) * .1); text(c, ['Letter 6.16', 'Letter 6.20'][i], 0, 0, { px: 18, w: 700 }); }, 0); }
    PK.stamp(ctx, 'ONLY EYEWITNESS ACCOUNT', 640, 600, since(t, 'onlyeye', 1), { px: 40 });
  });
  S.fx('decades', 'whoosh', .6, .5); S.fx('twoletters', 'paper'); S.fx('twoletters', 'paper', .35); S.fx('onlyeye', 'stamp');

  // ---------- Misenum: the cloud shaped like an umbrella pine ----------
  S.mood('version', 'tension');
  const misenum = (ctx, t, colK, o = {}) => {
    St.sky(ctx, o.top || '#a8d6ea', o.bot || '#f7ecd0'); St.sun(ctx, 300, 120, 40);
    St.sea(ctx, 430, t);
    P(ctx, '#9bb46a', 3, c => { c.moveTo(-100, 440); c.quadraticCurveTo(500, 400, 1400, 450); c.lineTo(1400, 460); c.lineTo(-100, 460); c.closePath(); });
    St.vesuvius(ctx, 900, 440, .45, { t, col: colK, smoke: colK > 0 ? 0 : .5 });
    // terrace
    P(ctx, '#d8c49a', 3, c => c.rect(-100, 560, W + 200, 200)); for (let x = -60; x < W + 100; x += 60) { L(ctx, [[x, 520], [x, 560]], 6); L(ctx, [[x, 520], [x, 560]], 3, '#efe1c2'); } P(ctx, '#efe1c2', 3, c => c.rect(-100, 510, W + 200, 14));
  };
  S.cut('version', (ctx, lt, d, t) => {
    const ck = clamp((t - A('cloud') - .3) / 9);
    misenum(ctx, t, ck);
    PK.tag(ctx, 'Misenum, AD 79 — early afternoon', lt);
    const pt = since(t, 'cloud', .5);
    who(ctx, 'mother', 380, 700, 1.4, { dir: 1, t, face: { eyes: pt > 0 ? 'wide' : 'dot', mouth: pt > 0 ? 'o' : 'smile', brows: 'worried', look: [1, -.6] }, armR: pt > 0 ? [60, -40] : [5, 58] });
    who(ctx, 'younger', 560, 700, 1.3, { dir: 1, t, face: { eyes: 'dot', mouth: 'flat', look: [1, -.6] } });
    // pine-tree comparison inset
    const pn = since(t, 'pine', .5);
    if (pn > 0) PK.scaled(ctx, 1100, 360, pop(pn), c => { PK.paper(c, -110, -150, 220, 300, { tape: true }); St.pine(c, -4, 110, 220); text(c, 'umbrella pine', 0, 130, { px: 18, w: 700 }); });
    const tr = since(t, 'trunk', .4);
    if (tr > 0) { PK.arrow(ctx, 760, 300, 880, 300, tr, { col: '#2b2420', w: 4 }); PL.lbl(ctx, 'tall trunk', 690, 300, tr, { px: 20 }); PK.arrow(ctx, 760, 150, 860, 170, tr * 1.3 - .3, { col: '#2b2420', w: 4 }); PL.lbl(ctx, 'spreading top', 680, 150, tr * 1.3 - .3, { px: 20 }); }
    PL.lbl(ctx, 'unusual size and appearance', 900, 600, since(t, 'unusual', .4) * (1 - since(t, 'pine', .3)), { px: 22 });
  });
  S.fx('cloud', 'rumble', .2, .6);
  S.cut('scientist', (ctx, lt, d, t) => {
    misenum(ctx, t, .95);
    cam(ctx, 1, 640, 360);
    const r = since(t, 'research', .4);
    who(ctx, 'elder', 520, 720, 1.8, { dir: 1, t, face: { eyes: r > 0 ? 'wide' : 'dot', mouth: r > 0 ? 'grin' : 'smile', brows: 'up', look: [1, -.7], blush: r > 0 ? 1 : 0 }, armR: [40, -50], armL: [-20, 20], holdL: (c, x, y) => St.scroll(c, x, y, 40, 60, .2) });
    if (r > 0) { for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + t; L(ctx, [[520 + Math.cos(a) * 130, 300 + Math.sin(a) * 130], [520 + Math.cos(a) * 160, 300 + Math.sin(a) * 160]], 5, '#f6c945'); } PK.big(ctx, 'RESEARCH OPPORTUNITY!', 640, 110, 52, r, { col: '#f6c945' }); }
  });
  S.fx('research', 'ding');
  S.mood('skb1', 'pluck');
  S.cut('skb1', (ctx, lt, d, t) => {
    misenum(ctx, t, 1);
    const eT = PL.talk(t, 'skb1', 'skb2') + PL.talk(t, 'skb3', 'basically'), yT = PL.talk(t, 'skb2', 'skb3');
    who(ctx, 'elder', 400, 710, 1.5, { dir: 1, t, face: { eyes: 'dot', mouth: 'smile', brows: 'up', talk: eT }, armR: t < A('skb2') ? [60, -40] : [10, 50] });
    who(ctx, 'younger', 880, 710, 1.4, { dir: -1, t, face: { eyes: 'half', mouth: 'frown', brows: 'worried', talk: yT }, armL: [-30, 10], holdL: (c, x, y) => St.scroll(c, x, y, 40, 60, -.2) });
    PL.say(ctx, t, 'skb1', 'skb2', 'Boat. Now. I need a closer look.', 420, 230, [420, 380], { px: 24 });
    PL.say(ctx, t, 'skb2', 'skb3', 'Uncle, I have homework.', 860, 250, [870, 400], { px: 24 });
    PL.say(ctx, t, 'skb3', 'basically', 'Suit yourself.', 420, 250, [420, 380], { px: 24 });
  });
  S.cut('basically', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#f0dfc0');
    P(ctx, '#a0764e', 3, c => c.rect(360, 520, 560, 24));
    who(ctx, 'younger', 640, 690, 1.5, { dir: 0, t, face: { eyes: 'half', mouth: 'flat', brows: 'calm' }, armL: [-30, 10], armR: [36, 10], holdR: (c, x, y) => L(c, [[x, y], [x + 10, y - 30]], 3, '#4a3a30') });
    St.scroll(ctx, 640, 500, 160, 50, 0);
    PK.stamp(ctx, 'BASICALLY TRUE', 640, 160, clamp(lt / .8), { px: 48, col: '#2f7a46' });
    const h = since(t, 'homework', .5);
    if (h > 0) PK.scaled(ctx, 1020, 330, pop(h), c => { PK.paper(c, -150, -90, 300, 180, { fill: '#fff8e6', tape: true }); text(c, 'HOMEWORK', 0, -50, { font: PK.DISPLAY(30) }); text(c, 'lives saved: 1', 0, 0, { font: PK.HAND(34), col: '#c0392b' }); P(c, '#f0c43c', 2.6, q => q.arc(0, 52, 22, 0, 7)); text(c, '★', 0, 53, { px: 22, col: '#fff' }); });
  });
  S.fx('basically', 'stamp'); S.fx('homework', 'ding', 0, .5);

  // ---------- the rescue fleet sails toward the danger ----------
  S.mood('fleet', 'tension');
  const bayStorm = (ctx, t, dark) => {
    St.sky(ctx, lerp(0, 1, dark) > .5 ? '#5a5560' : '#c9b8a8', lerp(0, 1, dark) > .5 ? '#8a7a70' : '#e9d8c0');
    St.vesuvius(ctx, 980, 430, .8, { t, col: 1, darkCol: dark > .5 });
    St.sea(ctx, 430, t, { col: '#7aa0b0', col2: '#4a6f80' });
  };
  S.cut('fleet', (ctx, lt, d, t) => {
    bayStorm(ctx, t, .3);
    for (let i = 0; i < 4; i++) St.galley(ctx, 160 + i * 230 + lt * 25, 520 + (i % 2) * 70, .55 + (i % 2) * .08, t, { stripe: '#b8322b' });
    const c = since(t, 'coast', .5);
    if (c > 0) { P(ctx, '#c9b48a', 3, q => { q.moveTo(1000, 470); q.quadraticCurveTo(1150, 450, 1400, 460); q.lineTo(1400, 520); q.lineTo(1000, 520); q.closePath(); }); for (let i = 0; i < 4; i++) F.person(ctx, 1080 + i * 50, 500, .4, F.roman(70 + i, { face: { eyes: 'wide', mouth: 'open' }, armR: [10, -50 + Math.sin(t * 8 + i) * 10] })); PL.lbl(ctx, 'people on the coast need help', 1000, 300, c, { px: 20 }); }
    if (t > A('ashships')) St.pumiceRain(ctx, t, 90, .9, 3, 1);
  });
  S.fx('fleet', 'splash', 0, .4);
  S.cut('helmsman', (ctx, lt, d, t) => {
    bayStorm(ctx, t, .6);
    // on deck: the helmsman pleads, the admiral points forward
    P(ctx, '#8a5a34', 3, c => { c.moveTo(-100, 560); c.lineTo(1380, 560); c.lineTo(1380, 760); c.lineTo(-100, 760); c.closePath(); }); for (let x = -60; x < 1400; x += 80) L(ctx, [[x, 560], [x, 760]], 2, 'rgba(0,0,0,.25)');
    who(ctx, 'helmsman', 380, 690, 1.5, { dir: 1, t, face: { eyes: 'wide', mouth: 'open', brows: 'worried', sweat: t }, armR: [-50, -30], armL: [-60, -10] });
    const ref = since(t, 'refuses', .5);
    who(ctx, 'elder', 820, 690, 1.6, { dir: 1, t, face: { eyes: 'dot', mouth: ref > 0 ? 'smile' : 'flat', brows: ref > 0 ? 'angry' : 'calm' }, armR: ref > 0 ? [70, -40] : [5, 58] });
    PK.bubble(ctx, 'Turn back!', 360, 260, [380, 400], since(t, 'helmsman', .3), { px: 26 });
    St.pumiceRain(ctx, t, 110, .95, 5, 1);
  });
  S.cut('fortune', (ctx, lt, d, t) => {
    // the movie poster
    PL.darkBg(ctx, '#3a2a2a', '#120c0c');
    const z = lerp(1.05, 1, clamp(lt / 3)); cam(ctx, z, 640, 360);
    P(ctx, '#2b2420', 4, c => c.rect(370, 20, 540, 680));
    ctx.save(); ctx.beginPath(); ctx.rect(370, 20, 540, 680); ctx.clip();
    const g = ctx.createLinearGradient(0, 20, 0, 700); g.addColorStop(0, '#e86a3a'); g.addColorStop(1, '#4a1a20'); ctx.fillStyle = g; ctx.fillRect(370, 20, 540, 680);
    St.vesuvius(ctx, 640, 520, .7, { t, col: 1, darkCol: true });
    who(ctx, 'elder', 640, 760, 2.0, { dir: 0, t, face: { eyes: 'dot', mouth: 'smirk', brows: 'angry' }, arms: 'crossed', cloak: '#7a3b8f' });
    ctx.restore();
    text(ctx, 'FORTUNE STOOD BY', 640, 600, { font: PK.DISPLAY(44), col: '#f6c945', stroke: 8 });
    text(ctx, 'THE COURAGEOUS', 640, 650, { font: PK.DISPLAY(44), col: '#f6c945', stroke: 8 });
    text(ctx, 'THIS AUGUST… OR OCTOBER', 640, 60, { px: 18, w: 700, col: '#fff' });
    PK.caption(ctx, 'Pliny the Younger, Letters 6.16, trans. Betty Radice', lt, .4);
  });
  S.fx('fortune', 'tada', 0, .7);

  // ---------- Stabiae: a bath, dinner, a nap, pillow helmets ----------
  S.cut('stabiae', (ctx, lt, d, t) => {
    const B = St.BAY; cam(ctx, 1.3, 520, 420);
    St.bayMap(ctx, { erupt: 1, t });
    St.town(ctx, 'Misenum', ...B.misenum, 1); St.town(ctx, 'Pompeii', ...B.pompeii, 1, { dx: 40 }); St.town(ctx, 'Stabiae', ...B.stabiae, 1, { col: '#d0392b', r: 10, dx: -50, dy: 4 });
    const e = St.route(ctx, [B.misenum, [300, 420], [520, 520], [700, 560], B.stabiae], clamp(lt / 2));
    if (e) St.galley(ctx, e[0], e[1] + 6, .18, t, {});
    PK.phon(ctx, 'Stabiae', 'STAY-bee-eye', 900, 610, clamp(lt / .4));
    PL.lbl(ctx, "a friend's villa, south of Pompeii", 900, 250, since(t, 'friend', .4), { px: 20 });
  });
  S.mood('sky', 'pluck');
  S.cut('sky', (ctx, lt, d, t) => {
    // the villa in cross-section: bath | dinner | bedroom, rocks rattling on the roof
    St.sky(ctx, '#4a4048', '#7a6a60');
    St.roof(ctx, 120, 200, 1040, 40, '#a8553a');
    P(ctx, '#e9d4b0', 3, c => c.rect(120, 200, 1040, 440)); for (const x of [470, 820]) L(ctx, [[x, 200], [x, 640]], 4);
    P(ctx, '#b8473a', 0, c => c.rect(122, 560, 1036, 78));
    St.pumiceRain(ctx, t, 50, .9, 6, 1);
    // bath
    const b = since(t, 'bath', .3); P(ctx, '#d6cdbd', 3, c => c.roundRect(170, 520, 250, 90, 20)); P(ctx, '#9fd0e8', 2, c => c.rect(180, 530, 230, 26));
    if (t < A('sleep')) who(ctx, 'elder', 290, 600, 1.1, { dir: 0, t, cloak: null, face: { eyes: 'closed', mouth: 'smile' }, armL: [-40, -20], armR: [40, -20] });
    if (t < A('sleep')) { ctx.save(); P(ctx, '#9fd0e8', 0, c => c.rect(176, 534, 238, 70)); ctx.restore(); P(ctx, '#d6cdbd', 3, c => c.roundRect(170, 540, 250, 70, 20)); }
    // dinner
    P(ctx, '#a0764e', 3, c => c.rect(530, 520, 240, 20)); P(ctx, '#e7a96a', 2.4, c => c.ellipse(650, 512, 40, 10, 0, 0, 7)); St.amphora(ctx, 720, 520, .5);
    if (t >= A('sleep') && t < A('sleep') + 1.3) who(ctx, 'elder', 650, 640, 1.1, { dir: 0, t, face: { eyes: 'happy', mouth: 'smile' }, armR: [30, -20] });
    // bedroom
    P(ctx, '#c9a27a', 3, c => c.rect(860, 520, 260, 50)); P(ctx, '#f3ead8', 3, c => c.roundRect(870, 500, 80, 30, 10));
    if (t >= A('sleep') + 1.3) { ctx.save(); ctx.translate(990, 520); ctx.rotate(-Math.PI / 2); who(ctx, 'elder', 0, 0, 1, { dir: 0, t, face: { eyes: 'closed', mouth: 'o' } }); ctx.restore(); }
    // snoring + people at the door
    const sn = since(t, 'snoring', .3);
    if (sn > 0) { for (let i = 0; i < 3; i++) { const p = ((t * .6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - p; text(ctx, 'Z', 960 + p * 80, 470 - p * 120, { font: PK.DISPLAY(28 + p * 20), col: '#fff', stroke: 5 }); ctx.restore(); } F.person(ctx, 1220, 640, .9, F.roman(80, { dir: -1, face: { eyes: 'closed', mouth: 'frown', brows: 'angry' }, armL: [-24, -60], armR: [24, -60] })); }
    PL.lbl(ctx, 'BATH', 295, 470, since(t, 'bath', .3)); PL.lbl(ctx, 'DINNER', 650, 470, since(t, 'sleep', .3)); PL.lbl(ctx, 'SLEEP', 990, 470, since(t, 'sleep', .3) * 2 - 1);
  });
  S.fx('sky', 'thud', .2, .3); S.fx('bath', 'splash', 0, .4); S.fx('snoring', 'snore');
  S.cut('pillows', (ctx, lt, d, t) => {
    St.sky(ctx, '#4a4048', '#7a6a60');
    P(ctx, '#e9d4b0', 3, c => c.rect(-100, 160, W + 200, 600)); P(ctx, '#b8473a', 0, c => c.rect(-100, 560, W + 200, 200));
    const k = clamp(lt / 1.2);
    const fam = [['elder', 380], ['sailor', 560], ['mother', 740], ['helmsman', 920]];
    fam.forEach(([n, x], i) => who(ctx, n, x, 690, 1.35, { dir: 0, t, hat: k > i * .2 ? 'pillow' : (n === 'mother' ? 'veil' : (n === 'helmsman' ? 'pileus' : 'none')), hatCol: ['#f3ead8', '#e8d6f0', '#d6e8f0', '#f0e2c8'][i], face: { eyes: 'dot', mouth: i % 2 ? 'grin' : 'smile', brows: 'up' }, armL: i === 0 ? [-30, -10] : [-5, 58], armR: [30, -16] }));
    PL.lbl(ctx, 'pillow helmets', 640, 150, k, { px: 30 });
    const a = since(t, 'absurd', .4); if (a > 0) { PL.lbl(ctx, 'absurd', 380, 250, a, { px: 24 }); PL.lbl(ctx, '…and smart', 900, 250, a * 1.4 - .4, { px: 24, col: '#2f7a46' }); }
    PL.dim(ctx, since(t, 'lastfunny', 2.8) * .8);
  });
  S.fx('pillows', 'pop', .2); S.fx('pillows', 'pop', .45); S.fx('pillows', 'pop', .7); S.fx('pillows', 'pop', .95);

  // ================= TONE SHIFT: no jokes until the twist =================
  S.mood('pumice', 'drone');
  const greyStreet = (ctx, t, depth, o = {}) => {
    PL.street(ctx, t, { top: '#5d5852', bot: '#8a8178', sun: false, clouds: false, green: false, ash: .5, vx: 900, houses: o.houses });
    // pumice piling in the street
    if (depth > 0) P(ctx, '#bdb4a6', 3, c => { c.moveTo(-400, 760); c.lineTo(-400, 700 - depth); for (let x = -400; x <= 1700; x += 80) c.lineTo(x, 700 - depth + Math.sin(x * .05) * 5); c.lineTo(1700, 760); c.closePath(); });
  };
  S.cut('pumice', (ctx, lt, d, t) => {
    greyStreet(ctx, t, lt * 10);
    St.pumiceRain(ctx, t, 160, 1, 9, .9);
    PK.tag(ctx, 'Pompeii, the first hours', lt);
    PL.lbl(ctx, 'pumice: small, light volcanic stones', 640, 130, since(t, 'pumice', 2.5) * 2 - 1, { px: 22 });
  });
  S.fx('pumice', 'rainLoop', 0, 1.5);
  S.cut('inches', (ctx, lt, d, t) => {
    greyStreet(ctx, t, 60 + lt * 14);
    St.pumiceRain(ctx, t, 140, 1, 9, .9);
    // a ruler measuring the pile
    P(ctx, '#f2c230', 3, c => c.rect(980, 380, 50, 320)); for (let i = 0; i < 10; i++) L(ctx, [[980, 400 + i * 30], [1000 - (i % 2) * 8, 400 + i * 30]], 2);
    PL.lbl(ctx, '≈ 6 inches an hour', 1005, 340, clamp(lt / .4), { px: 22 }); PK.caption(ctx, "one study's estimate", lt, .6);
    // a roof gives way
    const r = since(t, 'roofs', 1.2);
    if (r > 0) { PL.dim(ctx, 0); St.puff(ctx, 440, 230, 120, r, '#bdb4a6'); }
  });
  S.cut('roofs', (ctx, lt, d, t) => {
    greyStreet(ctx, t, 110, { houses: [[-60, 170, 210], [120, 150, 250], [280, 200, 220, { door: true, roof: false }], [490, 160, 260], [660, 210, 230, { door: true }], [880, 160, 250], [1050, 220, 220, { door: true }]] });
    const k = clamp(lt / .8);
    // the roof of the third house sags and drops in
    ctx.save(); ctx.translate(380, 250 + ease.in(k) * 80); ctx.rotate(ease.in(k) * .25); St.roof(ctx, -100, 0, 200, 30); ctx.restore();
    St.puff(ctx, 380, 300, 140, clamp((lt - .7) / 1), '#bdb4a6');
    St.pumiceRain(ctx, t, 140, 1, 9, .9);
    PL.lbl(ctx, 'roofs begin to give way', 640, 130, clamp(lt / .4), { px: 22 });
  });
  S.fx('roofs', 'crumble', .5, .8);
  S.cut('window', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3e3a38', '#1a1816');
    const k = clamp(lt / (d));
    // an hourglass
    PK.scaled(ctx, 640, 360, 2.4, c => PK.burialIcon(c, 2, 0, 0, 1));
    PL.lbl(ctx, 'THIS IS THE WINDOW', 640, 150, clamp(lt / .4), { px: 30 });
    const m = since(t, 'movies', .5);
    if (m > 0) { PL.dim(ctx, .6 * m); PK.scaled(ctx, 640, 380, pop(m), c => { P(c, '#2b2420', 4, q => q.rect(-330, -170, 660, 340)); for (let i = 0; i < 9; i++) { P(c, '#f4ecd8', 0, q => q.rect(-310 + i * 72, -160, 30, 14)); P(c, '#f4ecd8', 0, q => q.rect(-310 + i * 72, 146, 30, 14)); } P(c, '#a9a39a', 0, q => q.rect(-300, -130, 600, 260)); for (let i = 0; i < 4; i++) F.person(c, -200 + i * 130, 110, .8, { body: 'tunic', col: '#8a857e', legs: '#8a857e', gloves: '#8a857e', shoes: '#6a655e', face: { eyes: 'closed', mouth: 'flat', brows: 'none' }, armR: [30, -40] }); text(c, 'THE MOVIE VERSION: everyone frozen instantly', 0, -100, { px: 20, w: 700 }); }); PK.cross(ctx, 640, 380, 140, since(t, 'movies', 1.5) * 1.5 - .4); }
  });
  S.cut('gotout', (ctx, lt, d, t) => {
    // people leaving through the town gate along the road, carrying what they can
    St.sky(ctx, '#5d5852', '#8a8178'); St.ground(ctx, 520, '#a49a8a');
    St.cityWall(ctx, -400, 900, 520, 220, { gate: 640, towers: [380, 860], col: '#bfb09a' });
    P(ctx, '#bdb4a6', 0, c => { c.moveTo(560, 520); c.lineTo(720, 520); c.lineTo(1200, 760); c.lineTo(500, 760); c.closePath(); });
    for (let i = 0; i < 9; i++) { const p = ((lt * .12 + i / 9) % 1), x = lerp(640, 1000 + (i % 3) * 120, p), y = lerp(530, 760, p), s = lerp(.35, 1.1, p); F.person(ctx, x, y, s, F.roman(200 + i, { dir: 1, t, walk: t * 6 + i, face: { eyes: 'dot', mouth: 'flat', brows: 'worried' }, armR: [14, -60], holdR: (c, hx, hy) => P(c, ['#c9a27a', '#8a6a5a', '#a08060'][i % 3], 2.4, q => q.ellipse(hx, hy - 10, 22, 16, 0, 0, 7)) })); }
    St.pumiceRain(ctx, t, 90, .9, 11, .9);
    PL.lbl(ctx, 'most people likely got out', 360, 130, clamp(lt / .4), { px: 24 });
    const n = since(t, 'notall', .5); if (n > 0) PL.lbl(ctx, 'not all of them', 360, 190, n, { px: 24, col: '#c0392b' });
  });
  S.cut('notfrozen', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a4440', '#1e1a18');
    // a clock face: hours, not an instant
    P(ctx, '#f4ecd8', 4, c => c.arc(640, 360, 180, 0, 7)); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; L(ctx, [[640 + Math.cos(a) * 150, 360 + Math.sin(a) * 150], [640 + Math.cos(a) * 168, 360 + Math.sin(a) * 168]], 5); }
    const h = lt * .9; L(ctx, [[640, 360], [640 + Math.sin(h) * 90, 360 - Math.cos(h) * 90]], 9); L(ctx, [[640, 360], [640 + Math.sin(h * 12) * 140, 360 - Math.cos(h * 12) * 140]], 5);
    PL.lbl(ctx, 'not frozen in a single instant', 640, 110, clamp(lt / .4), { px: 26 });
    PL.lbl(ctx, 'hours to run — and many did', 640, 620, since(t, 'hours', .4), { px: 26 });
  });
  S.cut('carry', (ctx, lt, d, t) => {
    greyStreet(ctx, t, 90, { houses: [[-60, 170, 210], [120, 250, 250, { door: true }], [370, 200, 220, { door: true }], [570, 260, 260, { door: true }], [830, 210, 230, { door: true }], [1040, 250, 220, { door: true }]] });
    // left: people carrying bundles; right: doorways with those who stayed
    for (let i = 0; i < 3; i++) F.person(ctx, 120 + i * 120 + lt * 30, 690, 1.0, F.roman(220 + i, { dir: 1, t, walk: t * 6 + i, face: { eyes: 'dot', mouth: 'flat', brows: 'worried' }, armR: [14, -60], holdR: (c, hx, hy) => P(c, '#a08060', 2.4, q => q.ellipse(hx, hy - 10, 22, 16, 0, 0, 7)) }));
    PL.lbl(ctx, 'some left with what they could carry', 300, 120, clamp(lt / .4), { px: 20 });
    const g = since(t, 'guard', .5);
    if (g > 0) { F.person(ctx, 700, 660, 1.0, F.roman(230, { dir: -1, t, face: { eyes: 'dot', mouth: 'frown', brows: 'worried' }, arms: 'crossed' })); PL.lbl(ctx, 'some stayed to guard their homes', 900, 120, g, { px: 20 }); }
    const o = since(t, 'old', .5);
    if (o > 0) { F.person(ctx, 900, 660, 1.0, F.roman(231, { dir: -1, t, hair: 'bald', beard: 'full', hairCol: '#d0ccc4', face: { eyes: 'dot', mouth: 'flat', brows: 'sad' }, armL: [-24, 50], holdL: (c, hx, hy) => L(c, [[hx, hy], [hx - 6, hy + 70]], 5, '#7a5a3a'), lean: .06 })); F.person(ctx, 1060, 660, 1.0, F.roman(232, { dir: -1, t, col: '#9a948a', face: { eyes: 'dot', mouth: 'flat', brows: 'sad' } })); PL.lbl(ctx, 'the old, the sick, the enslaved', 900, 180, o, { px: 20 }); }
    St.pumiceRain(ctx, t, 110, .9, 13, .9);
  });
  S.cut('team', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a4440', '#1e1a18');
    // a single house in cross-section, filling with pumice; a small group inside
    P(ctx, '#e9d4b0', 4, c => c.rect(340, 260, 600, 360)); St.roof(ctx, 340, 260, 600, 40, '#8a6a5a');
    const fill = clamp(lt / 6) * 120; P(ctx, '#bdb4a6', 0, c => c.rect(342, 620 - fill, 596, fill));
    for (let i = 0; i < 5; i++) F.stamp(ctx, F.roman(240 + i, { face: { eyes: 'dot', mouth: 'flat', brows: 'worried' } }), 470 + i * 80, 600, .7, i % 2 === 1);
    PL.lbl(ctx, 'one house, studied by volcanologists', 640, 160, clamp(lt / .4), { px: 22 });
    const n = since(t, 'nineteen', .5);
    if (n > 0) { PK.counter(ctx, 0, 19, since(t, 'nineteen', 2), 1080, 360, 80, { post: 'h', col: '#f4ecd8' }); PL.lbl(ctx, 'survived 19+ hours', 1080, 440, n, { px: 20 }); }
  });
  S.cut('notlava', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a4440', '#1e1a18');
    // a lava river doodle, crossed out
    P(ctx, '#e8693a', 3, c => { c.moveTo(200, 500); c.quadraticCurveTo(400, 420, 640, 480); c.quadraticCurveTo(880, 540, 1080, 460); c.lineTo(1080, 520); c.quadraticCurveTo(880, 600, 640, 540); c.quadraticCurveTo(400, 480, 200, 560); c.closePath(); });
    text(ctx, 'LAVA', 640, 520, { font: PK.DISPLAY(40), col: '#fff3c0' });
    PK.cross(ctx, 640, 500, 160, clamp(lt / .8));
    PL.lbl(ctx, 'lava never reached Pompeii', 640, 200, since(t, 'neverlava', .4), { px: 30 });
  });
  S.cut('pdc', (ctx, lt, d, t) => {
    // diagram: currents of hot gas + ash racing down the slope toward the town
    St.sky(ctx, '#4a4440', '#6a625a');
    P(ctx, '#7a7268', 3, c => { c.moveTo(-100, 640); c.lineTo(200, 640); c.quadraticCurveTo(360, 420, 460, 200); c.lineTo(540, 200); c.quadraticCurveTo(700, 480, 1380, 600); c.lineTo(1380, 760); c.lineTo(-100, 760); c.closePath(); });
    St.column(ctx, 500, 200, .8, t, { darkCol: true });
    for (const x of [1040, 1100, 1160]) St.house(ctx, x, 600, 50, 40, { roofD: 10 });
    text(ctx, 'POMPEII', 1100, 640, { px: 18, w: 700, col: '#f4ecd8' });
    // surges
    const surges = Math.min(6, 1 + Math.floor((t - A('pdc')) / 2.2));
    for (let s = 0; s < surges; s++) { const p = clamp((t - A('pdc') - s * 2.2) / 3.5), reach = s >= 3 ? 1 : .55 + s * .12; const x = lerp(540, 540 + 620 * reach, ease.out(p)); for (let i = 0; i < 6; i++) { const xx = lerp(540, x, i / 5), yy = 200 + (xx - 540) * .62 - 30; P(ctx, s >= 3 ? '#5a524a' : '#9a9088', 2, c => c.arc(xx, yy, 18 + i * 6, 0, 7)); } }
    PL.lbl(ctx, 'pyroclastic density currents', 640, 80, clamp(lt / .4), { px: 28 });
    PL.lbl(ctx, 'avalanches of superheated gas and ash', 640, 135, since(t, 'avalanches', .4), { px: 22 });
    PL.lbl(ctx, 'a series of them — overnight into the morning', 640, 190, since(t, 'series', .4), { px: 20 });
    if (t > A('deadliest')) PL.lbl(ctx, 'no outrunning them', 1100, 520, since(t, 'nooutrun', .4), { px: 20, col: '#c0392b' });
  });
  S.fx('pdc', 'rumble', 0, .6); S.fx('deadliest', 'rumble', 0, .6);
  S.cut('debated', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a4440', '#1e1a18');
    PL.lbl(ctx, 'HOW THEY DIED IS STILL DEBATED', 640, 90, clamp(lt / .4), { px: 28 });
    const a = since(t, 'heat', .5), b = since(t, 'y2021', .5);
    if (a > 0) PK.scaled(ctx, 380, 380, pop(a), c => { PK.paper(c, -200, -170, 400, 340, { tape: true }); text(c, 'ONE MAJOR STUDY', 0, -130, { px: 20, w: 700 }); P(c, '#fff', 3, q => q.roundRect(-16, -90, 32, 170, 16)); P(c, '#d0392b', 3, q => q.arc(0, 96, 28, 0, 7)); P(c, '#d0392b', 0, q => q.rect(-9, -60, 18, 150)); text(c, 'extreme heat', 0, 140, { px: 22, w: 600 }); });
    if (b > 0) PK.scaled(ctx, 900, 380, pop(b), c => { PK.paper(c, -200, -170, 400, 340, { tape: true }); text(c, 'ANOTHER STUDY (2021)', 0, -130, { px: 20, w: 700 }); for (let i = 0; i < 20; i++) P(c, '#9a948c', 0, q => q.arc(-100 + (i * 37) % 200, -70 + (i * 53) % 150, 8, 0, 7)); text(c, "couldn't breathe in the ash", 0, 110, { px: 20, w: 600 }); text(c, 'for 10 to 20 minutes', 0, 140, { px: 20, w: 600 }); });
  });
  S.cut('together', (ctx, lt, d, t) => {
    // wide shot: the city under grey ash. No characters.
    St.sky(ctx, '#6a645e', '#a49a8e');
    St.vesuvius(ctx, 900, 380, .8, { t, green: false, ash: .6 });
    for (let i = 0; i < 10; i++) St.house(ctx, 60 + i * 120, 520, 100, 70 + (i * 37) % 50, { col: '#b8b0a4', dado: '#9a928a', roofCol: '#9a8a80', roofD: 14 });
    P(ctx, '#c4bcb0', 3, c => { c.moveTo(-100, 760); c.lineTo(-100, 500); for (let x = -100; x < 1400; x += 60) c.lineTo(x, 490 + Math.sin(x * .03) * 10); c.lineTo(1400, 760); c.closePath(); });
    St.ashFall(ctx, t, 120, .6);
  });
  S.cut('remains', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3e3a38', '#1a1816');
    PK.counter(ctx, 0, 1150, clamp(lt / 2), 640, 150, 80, { pre: '≈ ', col: '#f4ecd8' });
    PL.lbl(ctx, 'people recovered in Pompeii', 640, 220, clamp(lt / .4), { px: 22 });
    // town outline: excavated vs unexcavated third
    const th = since(t, 'third', .6);
    if (th > 0) { P(ctx, '#d9c9a8', 3, c => c.ellipse(640, 470, 330, 150, 0, 0, 7)); ctx.save(); ctx.beginPath(); ctx.ellipse(640, 470, 330, 150, 0, 0, 7); ctx.clip(); P(ctx, '#7a6a5a', 0, c => c.rect(860, 300, 200, 400)); for (let i = 0; i < 20; i++) L(ctx, [[860 + i * 12, 300], [800 + i * 12, 700]], 2, 'rgba(255,255,255,.25)'); ctx.restore(); P(ctx, null, 3, c => c.ellipse(640, 470, 330, 150, 0, 0, 7)); text(ctx, 'excavated', 560, 470, { px: 22, w: 700 }); text(ctx, '⅓ never dug', 1060, 640, { px: 20, w: 700, col: '#f4ecd8' }); }
    const o = since(t, 'outside', .6);
    if (o > 0) { ctx.save(); ctx.setLineDash([8, 10]); for (const a of [-.4, .3, 2.8]) L(ctx, [[640 + Math.cos(a) * 330, 470 + Math.sin(a) * 150], [640 + Math.cos(a) * (330 + 200 * o), 470 + Math.sin(a) * (150 + 120 * o)]], 4, '#e8a07a'); ctx.restore(); PL.lbl(ctx, 'many died outside the walls', 260, 640, o, { px: 18 }); }
    const tl = since(t, 'toll', .6);
    if (tl > 0) { PL.dim(ctx, .7 * tl); PK.reset(ctx); PK.big(ctx, '15–20%', 640, 330, 110, tl, { col: '#f4ecd8' }); PL.lbl(ctx, 'of the population, at least — Italy\'s culture ministry', 640, 430, tl, { px: 20 }); }
  });
  S.cut('beach', (ctx, lt, d, t) => {
    St.sky(ctx, '#3a3634', '#5a524a'); St.sea(ctx, 380, t, { col: '#5a6a70', col2: '#3a4a50' });
    P(ctx, '#a8a090', 3, c => { c.moveTo(-100, 520); c.quadraticCurveTo(640, 470, 1400, 520); c.lineTo(1400, 760); c.lineTo(-100, 760); c.closePath(); });
    P(ctx, '#e9e2d4', 3, c => { c.moveTo(500, 620); c.lineTo(820, 610); c.lineTo(840, 660); c.lineTo(480, 670); c.closePath(); });
    const lie = since(t, 'collapses', 2);
    if (lie <= 0) who(ctx, 'elder', 660, 640, 1.2, { dir: 0, t, sit: true, cloak: null, face: { eyes: 'closed', mouth: 'flat', brows: 'sad' } });
    else { ctx.save(); ctx.translate(560, 640); ctx.rotate(-Math.PI / 2 * ease.inOut(lie)); who(ctx, 'elder', 0, 0, 1.2, { dir: 0, t, cloak: null, face: { eyes: 'closed', mouth: 'flat', brows: 'calm' } }); ctx.restore(); }
    St.ashFall(ctx, t, 140, .6, 4);
    PK.tag(ctx, 'Stabiae', lt);
    PK.caption(ctx, 'His nephew believed the fumes choked him', t - A('fumes'), 0);
    const e = since(t, 'edge', 2);
    if (e > 0) { ctx.save(); ctx.globalAlpha = .45 * e; P(ctx, '#8a8278', 0, c => { c.moveTo(-100, 300); c.quadraticCurveTo(300, 380, 420, 520); c.lineTo(-100, 620); c.closePath(); }); ctx.restore(); PL.lbl(ctx, 'the edge of the last current', 300, 200, e, { px: 20 }); }
  });
  S.cut('run', (ctx, lt, d, t) => {
    St.sky(ctx, '#141210', '#2a2420'); St.ground(ctx, 560, '#4a443e');
    const dawn = since(t, 'survive', 2);
    if (dawn > 0) { ctx.save(); ctx.globalAlpha = dawn; St.sky(ctx, '#8a7a7a', '#e9b98a', -300, 560); ctx.restore(); }
    const list = PL.crowdRow(8, 80, 1200, 640, .8, 260);
    for (const [x, y, s, o, m, ph] of list) F.person(ctx, x + lt * 20, y, s, Object.assign({}, o, { dir: 1, t, walk: t * 6 + ph, face: { eyes: 'dot', mouth: 'flat', brows: 'worried' } }));
    const shake = Math.abs(Math.sin(t * 6));
    who(ctx, 'younger', 520 + lt * 20, 700, 1.15, { dir: 1, t, walk: t * 6, face: { eyes: 'dot', mouth: 'flat', brows: 'worried' }, armR: [20, -60 + shake * 10] });
    who(ctx, 'mother', 400 + lt * 20, 700, 1.1, { dir: 1, t, walk: t * 6 + 1, face: { eyes: 'dot', mouth: 'flat', brows: 'worried' }, armL: [-20, -60 + shake * 10] });
    St.ashFall(ctx, t, 220, .8 * (1 - dawn * .6), 8);
    PL.lbl(ctx, 'they survive', 640, 160, dawn, { px: 26 });
    const l = since(t, 'letters', .5);
    if (l > 0) PK.scaled(ctx, 1040, 240, pop(l), c => { St.scroll(c, 0, 0, 140, 170, .06); text(c, 'the letters', 0, 0, { font: PK.HAND(28) }); });
  });
  S.fx('survive', 'swell', 0, .6);
  S.cut('twentyft', (ctx, lt, d, t) => {
    St.sky(ctx, '#8a8178', '#c4bcb0');
    // cross-section: a two-storey house under layers of pumice and ash
    St.house(ctx, 440, 660, 260, 280, { door: true, win: [60, 200], roofD: 26, col: '#d9cbb0' });
    const k = ease.out(clamp(lt / 2.6));
    P(ctx, '#bdb4a6', 3, c => c.rect(-100, 660 - 180 * k, W + 200, 180 * k));
    P(ctx, '#8f877c', 3, c => c.rect(-100, 660 - 340 * k, W + 200, 160 * k));
    for (let i = 0; i < 30; i++) P(ctx, '#a39a8e', 0, c => c.arc((i * 97) % 1300, 660 - 30 - (i * 53) % Math.max(1, 150 * k), 4, 0, 7));
    ctx.save(); ctx.setLineDash([10, 8]); P(ctx, null, 3, c => { c.rect(440, 380, 260, 280); c.moveTo(428, 380); c.lineTo(458, 350); c.lineTo(682, 350); c.lineTo(712, 380); }); ctx.restore(); text(ctx, 'a two-storey house', 570, 520, { px: 18, w: 700, col: '#3a3430' });
    P(ctx, '#f2c230', 3, c => c.rect(980, 320, 44, 340)); for (let i = 0; i <= 20; i++) L(ctx, [[980, 660 - i * 17], [i % 5 ? 992 : 1004, 660 - i * 17]], 2);
    PL.lbl(ctx, 'up to 20 feet of ash and stone', 1000, 270, clamp(lt / .5), { px: 22 });
    text(ctx, 'pumice', 200, 600, { px: 20, w: 700 }); text(ctx, 'ash + currents', 200, 440, { px: 20, w: 700, col: '#f4ecd8' });
  });
  S.cut('burial2', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#3e3a38', '#1a1816');
    PK.burials(ctx, 2, clamp(lt / 1.2), W / 2, 200, { label: 'BURIAL #2 — BY A VOLCANO' });
    PK.againCard(ctx, clamp((lt - 1.4) / 1.4), W / 2, 500);
  });
  S.fx('burial2', 'thud', 0, .6);
})(window);
