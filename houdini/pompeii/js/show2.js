/* Beat 2 (a town nobody bragged about) + Beat 3 (Sulla moves in): 93 – 255 s. */
(function (G) {
  'use strict';
  const PK = G.PK, F = G.Folk, St = G.PSet, S = G.PS, T = G.Toon, PL = G.PL;
  const { W, H, P, L, text, A, since, pop } = PK, { clamp, lerp, ease } = T, cam = S.cam;
  const who = PL.who;

  // chapter strips (not spoken: shown at the start of the beat)
  S.over('b2start', 'rude', (ctx, lt) => PK.chapter(ctx, 'THE WORLD BEFORE', lt, 2.6));
  S.over('sulla', 'sullah', (ctx, lt) => PK.chapter(ctx, 'THE SPARK: SULLA MOVES IN', lt, 1.8));

  // ---------- Pompeii at the party of famous cities ----------
  S.mood('b2start', 'pluck');
  S.cut('b2start', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#f3e2c6'); cam(ctx, lerp(1, 1.06, clamp(lt / 8)), 640, 380);
    // a party: banner, famous guests in a huddle
    P(ctx, '#e7b84a', 3, c => c.rect(140, 90, 1000, 60)); text(ctx, 'FAMOUS ANCIENT CITIES — ANNUAL PARTY', 640, 121, { font: PK.DISPLAY(28) });
    for (let i = 0; i < 12; i++) P(ctx, ['#d0392b', '#5f8fb8', '#e7b84a'][i % 3], 2, c => { c.moveTo(140 + i * 84, 150); c.lineTo(182 + i * 84, 150); c.lineTo(161 + i * 84, 176); c.closePath(); });
    const guests = [['ROME', 420, '#b8322b'], ['ATHENS', 560, '#5f8fb8'], ['CARTHAGE', 700, '#8b6fa8']];
    guests.forEach(([n, x, c], i) => { who(ctx, i === 0 ? 'senator' : 'tacitus', x, 600, 1.1, { dir: i === 1 ? -1 : 1, t, face: { eyes: 'happy', mouth: Math.sin(t * 4 + i) > 0 ? 'grin' : 'smile' }, armR: [20, -30 + Math.sin(t * 5 + i) * 6], holdR: (cc, x2, y2) => St.amphora(cc, x2, y2 + 6, .45, '#c98a5a') }); PL.lbl(ctx, n, x, 360, 1, { px: 18 }); });
    // Pompeii alone in the corner with a name tag
    const k = since(t, 'rude', .5);
    who(ctx, 'pompeian', 1040, 620, 1.1, { dir: -1, t, face: { eyes: 'dot', mouth: k > 0 ? 'wavy' : 'smile', brows: 'worried', look: [-1, 0], sweat: k > 0 ? t * .8 : 0 }, armR: [6, -16], holdR: (c, x, y) => St.amphora(c, x, y + 6, .45) });
    PL.lbl(ctx, 'Hello, my name is: POMPEII', 1040, 360, 1, { px: 16 });
    PK.stamp(ctx, "DIDN'T MATTER", 760, 250, since(t, 'mostlife', 1.2), { px: 54 });
  });
  S.fx('mostlife', 'stamp', .4); S.fx('rude', 'boing', 0, .5);

  // ---------- Italy, 6th century BC: the Oscans at the mouth of the Sarno ----------
  S.cut('oscans', (ctx, lt, d, t) => {
    const k = ease.inOut(clamp(lt / 3)), I = St.IT;
    cam(ctx, lerp(1, 2.6, k), lerp(640, I.sarno[0], k), lerp(360, I.sarno[1], k));
    St.italy(ctx);
    // local peoples pop up across Italy
    const peoples = [['Oscans', 712, 400], ['Latins', 560, 300], ['Etruscans', 500, 220], ['Umbrians', 590, 200], ['Greeks', 900, 560], ['Samnites', 720, 360], ['Lucanians', 820, 470]];
    peoples.forEach(([n, x, y], i) => { const p = i === 0 ? clamp(lt / .5) : since(t, 'local', .4) - i * .1; if (p <= 0) return; PL.hut(ctx, x, y, .28 * pop(clamp(p)), i === 0 ? '#e0a060' : '#c9a27a'); if (i === 0 || k < .5) text(ctx, n, x, y + 12, { px: i === 0 ? 9 : 13, w: 700, stroke: 3, strokeCol: '#f4ecd8' }); });
    PK.tag(ctx, 'Italy, 6th century BC', lt);
  });

  // ---------- pumpe = five ----------
  S.cut('pumpe', (ctx, lt, d, t) => {
    PL.day(ctx, t, { vesuvius: true, vx: 1050, gy: 500, vs: .6 });
    const m = ease.inOut(since(t, 'villages', 1.6));
    for (let i = 0; i < 5; i++) { const x0 = 160 + i * 240, x1 = 560 + (i - 2) * 55, y0 = 600 + (i % 2) * 40, y1 = 600 - Math.abs(i - 2) * 6; PL.hut(ctx, lerp(x0, x1, m), lerp(y0, y1, m), lerp(.9, .8, m), ['#c9a27a', '#d9b48a', '#c0956a', '#d6a77a', '#caa078'][i]); if (m < .2) text(ctx, (i + 1) + '', x0, y0 + 24, { font: PK.DISPLAY(28), col: '#c0563c', stroke: 5 }); }
    PK.note(ctx, ['pumpe = "five"', '(a theory, not a fact)'], 640, 170, t - A('pumpe') - .6, { px: 40, bold0: true });
    PK.stamp(ctx, 'MAYBE.', 1000, 300, since(t, 'maybe2', 1), { px: 50, col: '#7a5a3a' });
  });
  S.fx('pumpe', 'pop', .6); S.fx('villages', 'whoosh'); S.fx('maybe2', 'stamp');
  S.cut('paperwork0', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#d9c7a3');
    St.scroll(ctx, 640, 360, 520, 380, -.02);
    text(ctx, 'FOUNDING CHARTER OF POMPEII', 640, 220, { font: PK.DISPLAY(28) });
    text(ctx, 'Signed:', 470, 470, { font: PK.HAND(36) }); L(ctx, [[530, 485], [820, 485]], 3);
    const q = Math.sin(t * 2) * 30;
    ctx.save(); ctx.translate(700 + q, 430); ctx.rotate(.5); P(ctx, '#f4f0e6', 2.4, c => { c.moveTo(0, -80); c.quadraticCurveTo(26, -40, 0, 20); c.quadraticCurveTo(-14, -30, 0, -80); }); ctx.restore();
    // tumbleweed
    const tw = (lt * 260) % (W + 300) - 150; ctx.save(); ctx.translate(tw, 620 - Math.abs(Math.sin(lt * 5)) * 30); ctx.rotate(lt * 6); ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(0, 0, 18 + i * 3, i, i + 4); ctx.stroke(); } ctx.restore();
  });
  S.fx('paperwork0', 'wind');

  // ---------- passed around like the last slice of pizza ----------
  S.cut('pizza', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#f3d9b5');
    const owners = [['', 640], ['GREEKS', 260], ['ETRUSCANS', 640], ['SAMNITES', 1020]];
    const tg = A('greeks'), steps = [tg, tg + 1.1, tg + 2.3];
    let idx = 0; for (const s of steps) if (t > s) idx++;
    const prevX = idx === 0 ? 640 : owners[idx][1], nextX = owners[Math.min(3, idx + 1)][1];
    const mv = idx < 3 ? ease.inOut(clamp((t - (steps[idx] - .7)) / .7)) : 0;
    const px = lerp(prevX, nextX, idx < 3 ? mv : 0), py = 330 - Math.sin(Math.PI * mv) * 80;
    // reaching hands at the bottom
    owners.slice(1).forEach(([n, x], i) => { const active = idx >= i + 1; who(ctx, ['tacitus', 'pompeian', 'digger'][i], x, 720, 1.25, { dir: 0, t, hair: ['curly', 'short', 'messy'][i], col: ['#5f8fb8', '#b65a4a', '#7f9f5a'][i], body: 'tunic', face: { eyes: active && idx === i + 1 ? 'happy' : 'dot', mouth: active && idx === i + 1 ? 'grin' : 'o', look: [(px - x) / 400, -1] }, armR: [20, -70], armL: [-20, -60] }); PL.lbl(ctx, n, x, 470, t > steps[i] - .7 ? 1 : 0, { px: 20 }); });
    // the slice
    PK.scaled(ctx, px, py, 1, c => { P(c, '#f2c84b', 3, q => { q.moveTo(-70, -40); q.lineTo(70, -40); q.lineTo(0, 90); q.closePath(); }); P(c, '#c98a4a', 3, q => q.roundRect(-78, -54, 156, 22, 10)); for (const [x, y] of [[-30, -18], [20, -10], [-4, 30], [30, -26]]) P(c, '#c0392b', 2, q => q.arc(x, y, 9, 0, 7)); text(c, 'POMPEII', 0, -2, { font: PK.FONT(700, 16) }); }, Math.sin(t * 3) * .05);
  });
  S.fx('greeks', 'whoosh'); S.fx('greeks', 'whoosh', 1.1); S.fx('greeks', 'whoosh', 2.3);

  // ---------- Samnites build the walls you can still walk along ----------
  S.cut('samnites', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 520 });
    const built = clamp(lt / 3.2);
    const rows = 7;
    for (let r = 0; r < rows; r++) for (let i = 0; i < 12; i++) { const order = (r * 12 + i) / (rows * 12); if (order > built) continue; P(ctx, (r + i) % 2 ? '#d7c39a' : '#cbb68a', 2.2, c => c.rect(260 + i * 64 + (r % 2) * 32, 560 - r * 30, 62, 28)); }
    for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i * .4) % 1; who(ctx, 'digger', 300 + i * 330, 640, 1, { dir: 1, t, hat: 'none', hair: 'messy', beard: 'full', col: '#7f9f5a', face: { eyes: 'dot', brows: 'angry', mouth: 'teeth' }, armL: [20, -20 - ph * 30], armR: [40, -20 - ph * 30], holdR: (c, x, y) => P(c, '#cbb68a', 2.2, q => q.rect(x - 20, y - 26, 44, 24)) }); }
    PL.lbl(ctx, 'SAMNITES: tough hill people', 640, 150, since(t, 'samnites', .4));
    // ghost of a modern tourist walking the finished wall
    const g = since(t, 'samnites', 3.5) * 3 - 1.6;
    if (g > 0) { ctx.save(); ctx.globalAlpha = .55 * clamp(g); who(ctx, 'tourist', lerp(300, 900, clamp((lt - 3.5) / 3)), 350, .8, { dir: 1, walk: t * 9, t }); ctx.restore(); PL.lbl(ctx, '…still walkable today', 900, 230, clamp(g), { px: 18 }); }
  });
  for (let i = 0; i < 6; i++) S.fx('samnites', 'thud', .3 + i * .55, .4);

  // ---------- Rome spreads like spilled wine ----------
  S.cut('romeup', (ctx, lt, d, t) => {
    St.italy(ctx); const I = St.IT;
    const k = ease.out(since(t, 'romedoes', 4));
    // the cup tips at Rome
    PK.scaled(ctx, I.rome[0] - 10, I.rome[1] - 40, 1, c => { P(c, '#c99a45', 3, q => { q.moveTo(-26, -20); q.lineTo(26, -20); q.lineTo(14, 20); q.lineTo(-14, 20); q.closePath(); }); L(c, [[0, 20], [0, 40]], 5); P(c, '#c99a45', 3, q => q.ellipse(0, 42, 18, 5, 0, 0, 7)); }, lerp(0, 1.6, clamp(lt / .8)));
    ctx.save(); ctx.beginPath(); ctx.moveTo(...St.ITALY[0]); for (const p of St.ITALY.slice(1)) ctx.lineTo(...p); ctx.closePath(); ctx.clip();
    ctx.globalAlpha = .75; ctx.fillStyle = '#8e1f3a';
    const r = T.rng(5); ctx.beginPath(); for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, rr = (60 + 600 * k) * (.75 + r() * .4); ctx.lineTo(I.rome[0] + Math.cos(a) * rr * 1.1, I.rome[1] + Math.sin(a) * rr * .8); } ctx.closePath(); ctx.fill(); ctx.restore();
    St.town(ctx, 'ROME', ...I.rome, 1, { px: 22 }); St.town(ctx, 'Pompeii', ...I.pompeii, 1, { col: '#e7b84a', dx: 30, dy: 20 });
    PK.tag(ctx, 'Rome expands', lt);
  });
  S.fx('romeup', 'splash');

  // ---------- allies: the polite version ----------
  S.cut('allies', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#f0e0c0');
    who(ctx, 'senator', 380, 650, 1.6, { dir: 1, t, hat: 'wreath', face: { eyes: 'dot', mouth: 'smile', brows: 'calm' }, armR: [50, 10] });
    who(ctx, 'pompeian', 900, 650, 1.6, { dir: -1, t, face: { eyes: 'dot', mouth: t > A('vote') + .3 ? 'frown' : 'smile', brows: t > A('vote') + .3 ? 'worried' : 'calm' }, armL: [-50, 10] });
    P(ctx, '#fff', 3, c => c.arc(640, 560, 16, 0, 7));
    PK.big(ctx, 'ALLIES*', 640, 140, 70, since(t, 'allies', .5), { col: '#f6c945' });
    const items = [['language', 'keep your language', 'tick'], ['soldiers', 'send us soldiers', 'tick'], ['vote', 'no vote', 'cross']];
    items.forEach(([k, s, m], i) => { const p = since(t, k, .4); if (p <= 0) return; const y = 250 + i * 70; PL.lbl(ctx, s, 640, y, p, { px: 22 }); (m === 'tick' ? PK.tick : PK.cross)(ctx, 800, y, 18, since(t, k, .6) * 1.4 - .3); });
    PK.caption(ctx, '* terms and conditions apply', lt, 1.5);
  });
  S.fx('allies', 'pop'); ['language', 'soldiers'].forEach(k => S.fx(k, 'ding', .2, .5)); S.fx('vote', 'boing', .2, .6);

  // ---------- 91 BC: the allies get fed up — the Social War ----------
  S.mood('ninety1', 'tension');
  S.cut('ninety1', (ctx, lt, d, t) => {
    PL.day(ctx, t, { top: '#e9b28a', bot: '#f2d9b0', gy: 470 });
    const list = PL.crowdRow(9, 140, 1140, 640, .95, 30, {}).concat(PL.crowdRow(8, 190, 1090, 560, .8, 50, {}));
    for (const c of list) { const [x, y, s, o, m, ph] = c; F.person(ctx, x, y - Math.abs(Math.sin(t * 5 + ph)) * 8, s, Object.assign({}, o, { t, face: { eyes: 'dot', brows: 'angry', mouth: 'open' }, armR: [16, -64 + Math.sin(t * 5 + ph) * 6], holdR: (cc, hx, hy) => { if (ph % 1.4 < .7) { L(cc, [[hx, hy + 10], [hx, hy - 70]], 4, '#7a5a3a'); P(cc, '#f4ecd8', 2.4, q => q.rect(hx - 34, hy - 108, 68, 40)); text(cc, 'VOTE!', hx, hy - 88, { px: 15, w: 700 }); } else { L(cc, [[hx, hy + 10], [hx, hy - 50]], 5, '#7a5a3a'); P(cc, '#f29a3a', 2, q => q.ellipse(hx, hy - 62, 8, 14, 0, 0, 7)); } } })); }
    PK.tag(ctx, '91 BC', lt);
    PL.lbl(ctx, 'FULL CITIZENSHIP — NOW!', 640, 150, since(t, 'ninety1', .5) * 2 - .6, { px: 30 });
  });
  S.fx('ninety1', 'crowd');
  S.cut('social', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#f6e6cf');
    PK.big(ctx, 'THE SOCIAL WAR', 640, 140, 70, clamp(lt / .4), { col: '#f6c945' });
    const b = since(t, 'brunch', .5);
    // the imagined brunch: table, mimosa glasses, an invitation that says NOT INVITED
    P(ctx, '#f4f0e6', 3, c => c.rect(300, 470, 680, 30)); for (const x of [340, 940]) L(ctx, [[x, 500], [x, 640]], 6);
    for (const x of [420, 560, 720, 860]) { P(ctx, '#f6c945', 2.4, c => { c.moveTo(x - 12, 400); c.lineTo(x + 12, 400); c.lineTo(x + 6, 460); c.lineTo(x - 6, 460); c.closePath(); }); L(ctx, [[x, 460], [x, 470]], 3); }
    P(ctx, '#e7a96a', 3, c => c.ellipse(640, 460, 50, 14, 0, 0, 7));
    PK.scaled(ctx, 640, 300, pop(b), c => { PK.paper(c, -150, -50, 300, 100, { fill: '#fff' }); text(c, 'Brunch @ Rome', 0, -20, { font: PK.HAND(34) }); text(c, 'NOT INVITED', 0, 22, { font: PK.DISPLAY(28), col: '#c0392b' }); }, .05);
    // reality: it's a real, bloody war
    const r = since(t, 'bloody', .3);
    if (r > 0) {
      PL.dim(ctx, .85 * r, '#2a1d1a');
      for (let side = 0; side < 2; side++) for (let i = 0; i < 7; i++) { const x = side ? 700 + i * 70 : 100 + i * 70, push = Math.sin(t * 4 + i) * 6; F.stamp(ctx, F.cast('legion', { dir: side ? -1 : 1, col: side ? '#c9a45a' : '#9a8a6a', col2: side ? '#b8423a' : '#4a6f8f', hat: side ? 'legion' : 'gallic' }), x + push * (side ? -1 : 1), 620 + (i % 2) * 20, 1.0, false); }
      PK.big(ctx, 'A REAL WAR', 640, 300, 64, since(t, 'bloody', .5), { col: '#e8693a' });
    }
  });
  S.fx('social', 'gong', 0, .5); S.fx('brunch', 'pop'); S.fx('bloody', 'boom', 0, .6);

  // ---------- Pompeii picks a side. The wrong side. ----------
  S.cut('picks2', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 480 });
    // fork in the road
    P(ctx, '#d9c49a', 0, c => { c.moveTo(560, 720); c.lineTo(720, 720); c.lineTo(660, 560); c.lineTo(1100, 500); c.lineTo(1120, 520); c.lineTo(700, 600); c.lineTo(640, 520); c.lineTo(180, 500); c.lineTo(160, 520); c.lineTo(600, 600); c.closePath(); });
    PL.sign(ctx, 'ROME →', 820, 620, 1, { h: 130 }); PL.sign(ctx, '← ITALIAN ALLIES', 460, 620, 1, { h: 130 });
    const w = clamp((lt - .4) / 1.4);
    who(ctx, 'pompeian', lerp(640, 360, ease.inOut(w)), lerp(700, 560, w), 1.2, { dir: -1, t, walk: w > 0 && w < 1 ? t * 9 : null, face: { eyes: 'dot', mouth: 'smile', brows: 'up' }, armR: [10, -50], holdR: (c, x, y) => { L(c, [[x, y], [x, y - 80]], 4); P(c, '#4a6f8f', 2.4, q => q.rect(x, y - 80, 50, 30)); } });
    const wr = since(t, 'wrongside', .6);
    if (wr > 0) { PK.stamp(ctx, 'WRONG SIDE', 640, 280, wr * 1.2, { px: 64 }); }
  });
  S.fx('wrongside', 'sad');

  // ---------- Sulla ----------
  S.mood('sulla', 'tension');
  S.cut('sulla', (ctx, lt, d, t) => {
    PL.day(ctx, t, { top: '#f0c79a', bot: '#f6e2c0', gy: 500, sunX: 200 });
    St.cityWall(ctx, 760, 1500, 560, 210, { towers: [900, 1220], gate: 1060 });
    cam(ctx, lerp(1.08, 1.0, clamp(lt / 4)), 600, 380);
    F.horse(ctx, 420, 660, 1.35, { col: '#8a5a34', saddle: '#b8322b', mirror: false });
    who(ctx, 'sulla', 400, 540, 1.25, { dir: 1, t, arms: 'crossed', sit: false, face: { eyes: 'dot', brows: 'angry', mouth: 'flat', look: [1, 0] }, bob: Math.sin(t * 1.5) * 1.5 });
    PK.nameCard(ctx, 'Lucius Cornelius Sulla', 'Roman general', 380, 110, since(t, 'sulla', .5));
    PK.phon(ctx, 'Sulla', 'SULL-uh', 1060, 140, since(t, 'sullah', .5) * (1 - since(t, 'general', .3)));
    const lb = [['general', 'ROMAN GENERAL', 820, 200], ['general', 'FUTURE DICTATOR', 860, 260]];
    lb.forEach(([k, s, x, y], i) => PL.lbl(ctx, s, x, y, since(t, k, .4) - i * .8, { px: 22 }));
  });
  S.fx('sulla', 'sting', 0, .6); S.fx('sullah', 'pop');
  S.cut('ticket', (ctx, lt, d, t) => {
    PL.street(ctx, t, {});
    // a Pompeian's cart parked in the street; Sulla slaps a ticket on it
    P(ctx, '#a0764e', 3, c => c.rect(560, 540, 220, 70)); for (const x of [600, 740]) { P(ctx, '#7a4f33', 3, c => c.arc(x, 620, 30, 0, 7)); P(ctx, '#c9a27a', 2, c => c.arc(x, 620, 8, 0, 7)); }
    for (let i = 0; i < 5; i++) St.amphora(ctx, 590 + i * 40, 540, .6);
    const sl = since(t, 'ticket', 1.2);
    who(ctx, 'sulla', 420, 690, 1.3, { dir: 1, t, face: { eyes: 'dot', brows: 'angry', mouth: sl > .4 ? 'smirk' : 'flat' }, armR: sl < .4 ? [40, -30] : [70, 0] });
    if (sl > .4) PL.ticket(ctx, 690, 560, .15, (sl - .4) * 3);
    who(ctx, 'pompeian', 980, 690, 1.3, { dir: -1, t, face: { eyes: sl > .4 ? 'wide' : 'dot', brows: 'worried', mouth: sl > .4 ? 'o' : 'flat' } });
    PL.lbl(ctx, 'warm personality of a parking ticket', 640, 120, since(t, 'ticket', .5), { px: 24 });
  });
  S.fx('ticket', 'stamp', .55);

  // ---------- 89 BC: the siege ----------
  S.cut('besiege', (ctx, lt, d, t) => {
    PL.day(ctx, t, { top: '#e9b88f', bot: '#f4dcb6', gy: 470, sun: false });
    St.cityWall(ctx, 760, 1500, 520, 220, { towers: [880, 1180], dents: [[820, 400, 10], [990, 380, 12], [1120, 440, 9]] });
    // stones arc from the catapult into the wall
    for (let i = 0; i < 3; i++) { const p = ((lt * .6 + i / 3) % 1), x = lerp(250, 900 + i * 90, p), y = 420 - Math.sin(Math.PI * p) * 260; P(ctx, '#8a8278', 2.4, c => c.arc(x, y, 12, 0, 7)); if (p > .9) St.puff(ctx, 900 + i * 90, 420, 50, (p - .9) * 10, '#d9cbb0'); }
    // catapult
    P(ctx, '#8a6240', 3, c => c.rect(150, 560, 180, 26)); for (const x of [175, 305]) { P(ctx, '#7a4f33', 3, c => c.arc(x, 596, 20, 0, 7)); }
    ctx.save(); ctx.translate(240, 560); ctx.rotate(-.6 - Math.max(0, Math.sin(lt * 3.77)) * .6); L(ctx, [[0, 0], [0, -120]], 10); L(ctx, [[0, 0], [0, -120]], 6, '#a0764e'); ctx.restore();
    // ranks of soldiers
    const list = []; for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) list.push([60 + i * 72 + r * 20, 600 + r * 40, .62 + r * .06, F.cast('legion'), false, i + r]);
    St.crowd(ctx, list, t);
    PK.tag(ctx, '89 BC', lt);
  });
  for (let i = 0; i < 4; i++) S.fx('besiege', 'thud', 1.4 + i * 1.66, .7);
  S.cut('funone', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#efe3c4');
    who(ctx, 'historian', 360, 650, 1.5, { dir: 1, t, face: { eyes: 'dot', brows: 'angry', mouth: PK.talk(t, A('argue'), A('argue') + 2) > .2 ? 'open' : 'flat' }, armR: [40, -40], holdR: (c, x, y) => St.scroll(c, x + 10, y - 20, 40, 60, .3) });
    who(ctx, 'arch3', 920, 650, 1.5, { dir: -1, t, hat: 'none', face: { eyes: 'dot', brows: 'skeptic', mouth: 'frown' }, armL: [-40, -30] });
    PL.say(ctx, t, 'argue', 'walls', 'He took it in 89 BC!', 420, 230, [380, 330], { px: 24 });
    PL.say(ctx, t, 'argue', 'walls', 'Did he, though?', 880, 260, [900, 340], { px: 24, hold: 0 });
    PK.big(ctx, 'HISTORIANS STILL ARGUE', 640, 90, 44, since(t, 'funone', .4), { col: '#f6c945' });
  });
  S.cut('walls', (ctx, lt, d, t) => {
    const z = lerp(1.6, 1.8, lt / d); cam(ctx, z, 1000, 420);
    PL.day(ctx, t, { gy: 470, sun: false });
    St.cityWall(ctx, 760, 1500, 560, 260, { towers: [880, 1180], dents: [[960, 400, 12], [1040, 360, 9], [1100, 450, 14], [1010, 470, 8]] });
    PK.reset(ctx);
    PL.lbl(ctx, 'the walls show damage', 640, 620, since(t, 'walls', .4), { px: 26 });
    const h = since(t, 'heldout', .5);
    if (h > 0) PK.note(ctx, ['…but did Pompeii hold out longer?', 'scholars disagree'], 640, 150, t - A('heldout'), { px: 30, bold0: true });
  });
  S.fx('walls', 'pop');

  // ---------- Rome wins; 80 BC: Sulla's veterans move in ----------
  S.cut('rome_wins', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 520 });
    const k = clamp(lt / .5);
    const y = lerp(-200, 560, ease.in(k));
    L(ctx, [[640, y], [640, y - 330]], 10); L(ctx, [[640, y], [640, y - 330]], 6, '#7a5a3a');
    P(ctx, '#b8322b', 3, c => c.rect(570, y - 300, 140, 120)); text(ctx, 'SPQR', 640, y - 240, { font: PK.DISPLAY(34), col: '#f6c945' });
    PK.scaled(ctx, 640, y - 340, 1, c => { P(c, '#e7b84a', 3, q => { q.moveTo(-60, -10); q.quadraticCurveTo(-30, -50, 0, -20); q.quadraticCurveTo(30, -50, 60, -10); q.quadraticCurveTo(30, -20, 0, 0); q.quadraticCurveTo(-30, -20, -60, -10); q.closePath(); }); P(c, '#e7b84a', 3, q => q.arc(0, -26, 12, 0, 7)); });
    if (k >= 1) St.puff(ctx, 640, 560, 90, clamp((lt - .5) / .6), '#d9c49a');
    PK.big(ctx, 'ROME WINS', 640, 130, 66, since(t, 'rome_wins', .4) * 1.5 - .4, { col: '#f6c945' });
  });
  S.fx('rome_wins', 'thud', .5); S.fx('rome_wins', 'tada', .7, .5);
  S.cut('punish', (ctx, lt, d, t) => {
    PL.street(ctx, t, { houses: [[-60, 170, 210], [120, 150, 250, { door: true }], [280, 200, 220, { door: true, win: [40, 160] }], [490, 160, 260, { door: true }], [660, 210, 230, { door: true, win: [50, 160] }], [880, 160, 250, { door: true }], [1050, 220, 220, { door: true, win: [60] }]] });
    const list = []; for (let i = 0; i < 12; i++) { const x = ((lt * 70 + i * 120) % 1500) - 200; list.push([x, 640 + (i % 3) * 22, .85, F.cast('vet', { dir: 1 }), false, i * .9]); }
    for (const [x, y, s, o, , ph] of list.sort((a, b) => a[1] - b[1])) F.person(ctx, x, y - Math.abs(Math.sin(t * 6 + ph)) * 3, s, Object.assign({}, o, { walk: t * 6 + ph, t, armR: [14, 40], holdR: (c, hx, hy) => { P(c, '#8a5a34', 2.6, q => q.roundRect(hx - 16, hy, 32, 26, 4)); L(c, [[hx - 6, hy], [hx - 6, hy - 4], [hx + 6, hy - 4], [hx + 6, hy]], 2.4); }, armL: [-24, 30], holdL: (c, hx, hy) => { L(c, [[hx, hy - 10], [hx - 6, hy + 60]], 5, '#7a5a3a'); } }));
    PK.tag(ctx, '80 BC', lt);
    PL.lbl(ctx, "Sulla's retired soldiers", 640, 140, since(t, 'colony', .4), { px: 26 });
    if (t > A('fewk')) { PK.reset(ctx); PL.lbl(ctx, 'likely a few thousand', 640, 200, since(t, 'fewk', .4), { px: 24, col: '#c0392b' }); }
  });

  // ---------- SKIT: congratulations, you're Roman now ----------
  S.cut('sk1', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 420 });
    St.cityWall(ctx, -400, 1680, 520, 240, { gate: 640, towers: [380, 900] });
    St.ground(ctx, 560, '#c9b48a');
    const sk6 = since(t, 'sk6', 1.2);
    // veterans waiting behind Sulla with suitcases, then marching through the gate at "great question"
    for (let i = 0; i < 4; i++) { const x = lerp(120 + i * 70, 640, ease.in(clamp(sk6 * 1.2 - i * .12))), y = 640 - i * 8; const o = F.cast('vet', { dir: 1, face: { eyes: 'happy', mouth: 'grin' } }); F.person(ctx, x, y, .9, Object.assign({}, o, { t, walk: sk6 > 0 && sk6 < 1 ? t * 8 + i : null, armR: [14, 40], holdR: (c, hx, hy) => P(c, '#8a5a34', 2.6, q => q.roundRect(hx - 16, hy, 32, 26, 4)) })); }
    const sTalk = PL.talk(t, 'sk1', 'sk2') + PL.talk(t, 'sk4', 'sk5') + PL.talk(t, 'sk6', 'newname');
    const pTalk = PL.talk(t, 'sk2', 'sk3') + PL.talk(t, 'sk3', 'sk4') + PL.talk(t, 'sk5', 'sk6');
    who(ctx, 'sulla', 470, 690, 1.45, { dir: 1, t, face: { eyes: 'dot', brows: t > A('sk6') ? 'up' : 'calm', mouth: t > A('sk6') ? 'grin' : 'smile', talk: sTalk }, armR: t < A('sk2') ? [50, -40] : [10, 50], armL: t > A('sk4') && t < A('sk5') ? [-40, -40] : [-6, 56] });
    who(ctx, 'pompeian', 840, 690, 1.45, { dir: -1, t, face: { eyes: t > A('sk3') ? (t > A('sk5') ? 'wide' : 'dot') : 'happy', brows: t > A('sk3') ? 'worried' : 'up', mouth: t > A('sk5') ? 'wavy' : 'smile', talk: pTalk, sweat: t > A('sk5') ? t : 0 } });
    PL.say(ctx, t, 'sk1', 'sk2', "Congratulations, Pompeii! You're Roman now.", 420, 170, [450, 330], { px: 24 });
    PL.say(ctx, t, 'sk2', 'sk3', 'Oh, wow. Thanks.', 860, 200, [850, 360], { px: 24 });
    PL.say(ctx, t, 'sk3', 'sk4', "What's the catch?", 860, 200, [850, 360], { px: 24 });
    PL.say(ctx, t, 'sk4', 'sk5', 'Two thousand of my guys need houses.', 420, 170, [450, 330], { px: 24 });
    PL.say(ctx, t, 'sk5', 'sk6', '…Whose houses?', 860, 200, [850, 360], { px: 24 });
    PL.say(ctx, t, 'sk6', 'newname', 'Great question.', 420, 190, [450, 330], { px: 24 });
  });
  S.fx('sk6', 'boing', .3, .5); S.mood('sk1', 'pluck');

  // ---------- the new official name ----------
  S.cut('newname', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 520 });
    PL.sign(ctx, 'POMPEII', 260, 620, 1, { h: 150, px: 30 });
    const k = ease.out(clamp(lt / 1.6));
    const long = 'COLONIA CORNELIA VENERIA POMPEIANORUM';
    ctx.save(); ctx.font = PK.FONT(700, 30); const w = ctx.measureText(long).width + 40; ctx.restore();
    const x0 = 140, wv = w * k;
    P(ctx, '#e7d29a', 3, c => c.roundRect(x0, 420, wv, 50, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(x0, 420, wv, 50); ctx.clip(); text(ctx, long, x0 + 20, 446, { px: 30, w: 700, align: 'left' }); ctx.restore();
    L(ctx, [[x0 + wv - 20, 470], [x0 + wv - 20, 620]], 9); L(ctx, [[x0 + wv - 20, 470], [x0 + wv - 20, 620]], 5, '#8a6240');
    // the Pompeian tries to read it, runs out of breath
    const m = since(t, 'mouthful', 2.5);
    who(ctx, 'pompeian', 1000, 690, 1.3, { dir: -1, t, face: { eyes: m > .5 ? 'closed' : 'dot', brows: 'worried', mouth: m > 0 ? (m > .6 ? 'wavy' : 'open') : 'flat', look: [-1, -.5], sweat: m > .5 ? t : 0 }, lean: m > .6 ? .08 : 0 });
    if (m > 0) PK.bubble(ctx, m < .6 ? 'Colonia Cornelia Vene… huff…' : 'Just "Pompeii".', 980, 230, [990, 330], clamp(m * 5), { px: 22 });
  });
  S.fx('newname', 'creak'); S.fx('newname', 'whoosh', .2, .5);
  S.cut('latin', (ctx, lt, d, t) => {
    PL.paperBg(ctx, '#d9c7a3');
    P(ctx, '#d6cdbd', 4, c => c.roundRect(240, 170, 800, 300, 8));
    const k = clamp(lt / 2.6);
    // Oscan inscription (stylised letters) gets chiselled over with Latin
    ctx.save(); ctx.beginPath(); ctx.rect(240 + 800 * k, 170, 800, 300); ctx.clip(); text(ctx, 'ᚱ𐌉𐌅 𐌀𐌍𐌄𐌓 𐌐𐌏𐌌𐌐𐌄', 640, 320, { px: 50, col: '#6a6050' }); text(ctx, '(Oscan)', 640, 400, { px: 20, col: '#8a8070' }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(240, 170, 800 * k, 300); ctx.clip(); text(ctx, 'COLONIA CORNELIA', 640, 290, { font: '700 46px Georgia, serif', col: '#4a4038' }); text(ctx, 'VENERIA POMPEIANORVM', 640, 350, { font: '700 40px Georgia, serif', col: '#4a4038' }); text(ctx, '(Latin)', 640, 410, { px: 20, col: '#8a8070' }); ctx.restore();
    // chisel at the edge
    const cx = 240 + 800 * k; if (k < 1) { L(ctx, [[cx, 300], [cx + 50, 220]], 10); L(ctx, [[cx, 300], [cx + 50, 220]], 6, '#9aa3a8'); P(ctx, '#a0764e', 3, c => c.roundRect(cx + 40, 160, 34, 60, 6)); }
    // old language whispered on
    const v = since(t, 'vanish', .5);
    if (v > 0) { who(ctx, 'pompeian', 380, 720, 1, { dir: 1, t, face: { eyes: 'dot', mouth: 'smirk', look: [1, 0] } }); who(ctx, 'digger', 520, 720, 1, { dir: -1, t, face: { eyes: 'dot', mouth: 'o' } }); PK.bubble(ctx, 'psst… (in Oscan)', 450, 560, [420, 600], v, { px: 18 }); PK.stamp(ctx, 'OFFICIALLY OUT', 920, 580, since(t, 'vanish', 1) * 1.3 - .3, { px: 34 }); }
  });
  for (let i = 0; i < 6; i++) S.fx('latin', 'tick', i * .42, .9);

  // ---------- burial #1: under paperwork ----------
  S.cut('burial1', (ctx, lt, d, t) => {
    PL.day(ctx, t, { gy: 520 });
    // a little Oscan house; papers rain down and pile over it
    PL.hut(ctx, 640, 620, 2.2, '#e0a060');
    text(ctx, 'OSCAN TOWN', 640, 660, { px: 22, w: 700, stroke: 5, strokeCol: '#f4ecd8' });
    const pk = clamp((t - A('notash')) / 3.2), r = T.rng(4);
    for (let i = 0; i < 120 * pk; i++) { const tx = 420 + r() * 440, ty = 640 - r() * 180 * Math.min(1, pk * 1.3) * (1 - Math.abs(tx - 640) / 300); ctx.save(); ctx.translate(tx, ty); ctx.rotate(r() - .5); P(ctx, '#fffaf0', 1.6, c => c.rect(-18, -12, 36, 24)); L(ctx, [[-12, -4], [12, -4]], 1.6, '#9a8a70'); L(ctx, [[-12, 4], [8, 4]], 1.6, '#9a8a70'); ctx.restore(); }
    for (let i = 0; i < 12; i++) { const p = ((lt * .7 + i / 12) % 1); ctx.save(); ctx.translate(380 + (i * 47) % 520 + Math.sin(lt * 2 + i) * 30, -40 + p * 640); ctx.rotate(Math.sin(lt * 3 + i)); P(ctx, '#fffaf0', 1.6, c => c.rect(-18, -12, 36, 24)); ctx.restore(); }
    PK.burials(ctx, 1, clamp(lt / 1.2), W / 2, 120, { label: 'BURIAL #1 — KIND OF' });
    PL.lbl(ctx, 'not under ash: under paperwork', 640, 300, since(t, 'notash', .4), { px: 24 });
  });
  S.fx('burial1', 'thud'); S.fx('burial1', 'pop', .4); S.fx('notash', 'paper'); S.fx('covered', 'paper');
  S.cut('again1', (ctx, lt, d, t) => {
    PL.darkBg(ctx, '#4a3a33', '#241c1a');
    PK.againCard(ctx, clamp(lt / 1.2), W / 2, 320);
    const f = since(t, 'firsttime', .5);
    if (f > 0) { PK.cross(ctx, 930, 324, 70, f * 1.3); text(ctx, 'well… for the first time', 900, 440, { font: PK.HAND(46), col: '#f6c945' }); }
    const y = since(t, 'youknow', .5);
    if (y > 0) who(ctx, 'worker', 220, 720, 1.2, { dir: 1, t, face: { eyes: 'half', mouth: 'smirk', brows: 'up' }, armL: [-40, -20], armR: [40, -20] });
  });
  S.fx('again1', 'stamp', .1); S.fx('again1', 'stamp', .45); S.fx('again1', 'stamp', .8); S.fx('firsttime', 'boing', 0, .5);
})(window);
