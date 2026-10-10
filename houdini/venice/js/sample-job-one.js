/* Venice — 17 s sample of "Job one: a wall" (narration-job-one.mp3, 0 – 17.25 s).
 * Word anchors below come from tools/asr.py on the recording (the narrator reads the chapter title aloud). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Ch = G.Chars, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945';
  const A = { job: .04, wall: 1.22, start: 2.29, anyone: 3.21, outhere: 3.75, venice: 5.1, tells: 5.33, tidy: 6.32, story1: 6.77,
    atnoon: 8.38, noon1: 8.53, march: 9.09, fifth: 9.66, year: 10.4, four: 10.67, city: 12.32, founded: 12.84, noon2: 13.76, exactly: 14.5,
    great: 15.99, story2: 16.35, end: 17.25 };
  const since = (t, k) => t - A[k];
  const blink = (t, ...ts) => 1 - G.Rig.blinkAt(t, ts);
  const breathe = t => (Math.sin(t * 1.6) + 1) / 2;
  const slam = (k, d = .09) => k <= 0 ? 0 : k < d ? lerp(1.3, 1, ease.in(k / d)) : 1 + FX.ring(k - d, -.02, 4, 14);
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  function strip(ctx, text, x, y, k, o = {}) { // paper title strip that drops in and settles
    if (k <= 0) return; const e = FX.settle(clamp(k / .35));
    ctx.save(); ctx.translate(x, lerp(y - 160, y, e)); ctx.rotate(o.rot ?? -.02);
    const px = o.px || 58; ctx.font = FX.DISPLAY(px); const w = ctx.measureText(text).width + px * 1.2, h = px * 1.55;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h);
    shape(ctx, PAPER, 4, rect(-w / 2, -h / 2, w, h, 3)); txt(ctx, text, 0, px * .06, FX.DISPLAY(px), o.color || INK);
    ctx.restore();
  }
  const chronicler = o => Object.assign({ head: 'chronicler', outfit: 'habit', hands: { L: [-120, -480], R: [120, -480] }, feet: { L: [-60, -40], R: [60, -40] } }, o);
  function sparkle(ctx, x, y, k, s = 1) { if (k <= 0 || k > 1) return; const r = 26 * s * Math.sin(Math.PI * k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(k * 1.2); shape(ctx, '#fff6c8', 3, poly([[0, -r], [r * .25, -r * .25], [r, 0], [r * .25, r * .25], [0, r], [-r * .25, r * .25], [-r, 0], [-r * .25, -r * .25]])); ctx.restore(); }

  // ---------- s1: chapter card — "JOB ONE … A WALL", the lagoon puts on its first hat ----------
  function s1(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#24365a'], [.55, '#c98a4a'], [1, '#f2c26a']]), 0, rect(0, 0, W, H));
    glow(ctx, 640, 520, 520, 'rgba(255,214,140,.35)');
    for (const [x, y, w] of [[180, 150, 160], [1010, 110, 200], [760, 210, 120]]) shape(ctx, 'rgba(255,240,225,.55)', 0, smooth([[x - w / 2, y], [x - w / 4, y - 22], [x + w / 6, y - 30], [x + w / 2, y], [x, y + 10]]));
    const fall = since(t, 'wall') - .05, drop = FX.dropBounce(fall, 520, .3), landed = fall > .33;
    const look = fall < -.25 ? [0, .1] : landed ? (fall > 1 ? [0, .15] : [0, -.9]) : [0, -.9];
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    V.lagoon(ctx, 640, 610, 700, t, { look, eyes: blink(t, A.wall + .42, 1.95), mouth: fall > .9 ? 'smile' : (landed ? 'o' : null),
      hat: fall > 0 ? (c, x, y) => { c.save(); c.translate(0, -drop / (700 / 600)); V.hats.helmet(c, x, y); c.restore(); } : null });
    ctx.restore();
    strip(ctx, 'JOB ONE', 640, 120, lt - A.job);
    strip(ctx, 'A WALL', 640, 222, since(t, 'wall'), { px: 46, color: RED, rot: .02 });
    FX.vignette(ctx, 640, 380, .45);
  }

  // ---------- s2: [MAP] northeastern Italy in the 500s — Roman towns inland, the lagoon on the coast ----------
  const MX = 90, MY = 60; // map sheet origin
  const COAST = [[420, 600], [470, 520], [520, 450], [560, 400], [610, 360], [680, 340], [760, 330], [840, 320], [910, 318], [980, 330], [1030, 360], [1050, 430], [1070, 520], [1090, 600]];
  const TOWNS = [['PATAVIUM', 'Padua', 400, 410], ['ALTINUM', '', 612, 312], ['CONCORDIA', '', 768, 276], ['AQUILEIA', '', 905, 282]];
  function town(ctx, x, y, k) { if (k <= 0) return; const s = FX.settle(clamp(k / .3)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#efe2c2', 3, rect(-16, -14, 32, 18)); shape(ctx, '#c2553e', 3, poly([[-22, -14], [0, -30], [22, -14]])); for (const xx of [-9, 0, 9]) line(ctx, [[xx, -12], [xx, 2]], 2.5); ctx.restore(); }
  function s2(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2c2723');
    const z = lerp(1, 1.12, ease.inOut(clamp(lt / dur))); ctx.save(); cam(ctx, z, lerp(640, 655, ease.inOut(clamp(lt / dur))), lerp(360, 390, ease.inOut(clamp(lt / dur))));
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(MX + 10, MY + 12, 1100, 600);
    ctx.save(); ctx.translate(MX, MY);
    shape(ctx, '#e8dcb8', 4, rect(0, 0, 1100, 600, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1100, 600); ctx.clip();
    shape(ctx, '#cfd9a6', 0, rect(0, 0, 1100, 600));                                                   // land
    shape(ctx, '#8fc0cc', 0, c => { c.moveTo(COAST[0][0], COAST[0][1]); for (const p of COAST) c.lineTo(p[0], p[1]); c.lineTo(1100, 600); c.closePath(); }); // the Adriatic
    line(ctx, COAST, 4, '#3d6a78');
    for (let i = 0; i < 4; i++) line(ctx, COAST.map(([x, y]) => [x + 22 + i * 26, y + 16 + i * 22]).filter(([x, y]) => y < 600 && x < 1100), 2, 'rgba(255,255,255,.35)');
    for (let x = -20; x < 1120; x += 70) { const h = 60 + ((x * 37) % 40); shape(ctx, '#a9a48a', 3, poly([[x, 120], [x + 45, 120 - h], [x + 90, 120]])); shape(ctx, '#f4f1e6', 0, poly([[x + 32, 120 - h + 16], [x + 45, 120 - h], [x + 58, 120 - h + 16]])); }
    shape(ctx, '#bcc79a', 0, rect(0, 120, 1100, 30));
    for (const r of [[[300, 120], [340, 260], [380, 360], [470, 430], [525, 448]], [[640, 120], [650, 220], [690, 300], [700, 338]], [[0, 560], [150, 545], [300, 570], [430, 590]]]) line(ctx, r, 4, '#6aa7bb');
    // the lagoon: a crescent of shallow water behind the sandbars, with mud islands
    shape(ctx, '#b9dde2', 3, smooth([[505, 470], [530, 420], [570, 378], [620, 352], [680, 338], [700, 350], [650, 372], [600, 400], [560, 444], [530, 486]]));
    for (const [x, y, r] of [[560, 410, 7], [590, 388, 6], [620, 372, 8], [575, 430, 5], [640, 360, 5], [545, 448, 5]]) shape(ctx, '#a99a6a', 2, ellipse(x, y, r * 1.6, r));
    shape(ctx, '#b9dde2', 3, smooth([[930, 322], [970, 314], [1000, 324], [968, 334]]));                // Grado lagoon
    TOWNS.forEach(([n, sub, x, y], i) => { const k = since(t, 'start') + .1 - i * .26; town(ctx, x, y, k); if (k > .1) { ctx.globalAlpha = clamp((k - .1) / .2); txt(ctx, n, x, y + 22, FX.FONT(700, 15)); if (sub) txt(ctx, `(${sub})`, x, y + 39, FX.FONT(600, 12), '#4a443d'); ctx.globalAlpha = 1; } });
    txt(ctx, 'A L P S', 560, 140, FX.FONT(700, 22), '#4a4636');
    txt(ctx, 'ADRIATIC SEA', 850, 500, `italic 600 24px Georgia, serif`, '#2f5d6b');
    ctx.restore();
    // the question: why is anyone out here?
    const an = since(t, 'anyone');
    if (an > 0) { ctx.save(); ctx.setLineDash([12, 9]); ctx.lineWidth = 5; ctx.strokeStyle = RED; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.ellipse(600, 410, 140, 92, -.55, -.5, -.5 + Math.PI * 2 * ease.out(clamp(an / .5))); ctx.stroke(); ctx.restore(); }
    const oh = since(t, 'outhere');
    if (oh > 0) { const s = FX.settle(clamp(oh / .3)); ctx.save(); ctx.translate(735, 440); ctx.scale(s, s); ctx.rotate(.1); FX.bigText(ctx, '?', 0, 0, 92, { color: GOLD }); ctx.restore(); }
    if (an > .4) { ctx.globalAlpha = clamp((an - .4) / .25); txt(ctx, 'THE LAGOON', 470, 520, FX.DISPLAY(24), '#1f4b58'); line(ctx, [[505, 505], [540, 470]], 3, '#1f4b58'); ctx.globalAlpha = 1; }
    ctx.restore(); ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'NORTHEASTERN ITALY, c. AD 500');
  }

  // ---------- s3: Venice tells a very tidy story about itself — the chronicler and the official book ----------
  function book(ctx, x, y, open, bump, title) { // closed → open; bump lifts it (taps)
    ctx.save(); ctx.translate(x, y - bump * 14);
    const w = 150, h = 190;
    T.shadow(ctx, 0, h / 2 + 18, w * 1.1, 10, .25, 6);
    if (open < .5) { const sx = 1 - open * 2; ctx.save(); ctx.scale(Math.max(sx, .02), 1);
      shape(ctx, '#8a2a24', 4.5, rect(-w / 2, -h / 2, w, h, 6)); shape(ctx, '#c9a14a', 3, rect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 4));
      txt(ctx, title[0], 0, -24, FX.DISPLAY(19), '#f6e7b8'); txt(ctx, title[1], 0, 6, FX.DISPLAY(30), '#f6e7b8'); ctx.restore(); }
    else { const k = (open - .5) * 2;
      shape(ctx, '#8a2a24', 4.5, rect(-w, -h / 2 - 6, w * 2, h + 12, 6));
      shape(ctx, '#f4ecd6', 3.5, rect(-w + 10, -h / 2, w - 12, h, 3)); shape(ctx, '#f4ecd6', 3.5, rect(2, -h / 2, (w - 12) * k, h, 3));
      for (let i = 0; i < 7; i++) { line(ctx, [[-w + 30, -h / 2 + 34 + i * 20], [-24, -h / 2 + 34 + i * 20]], 4, 'rgba(70,64,58,.4)'); if (k > .9) line(ctx, [[24, -h / 2 + 34 + i * 20], [w - 30, -h / 2 + 34 + i * 20]], 4, 'rgba(70,64,58,.4)'); }
      line(ctx, [[0, -h / 2], [0, h / 2]], 4); }
    ctx.restore();
  }
  function scriptorium(ctx) {
    shape(ctx, '#b49a78', 0, rect(-200, -200, 1700, 1100));
    const r = rng(4); for (let y = -200; y < 640; y += 44) for (let x = -200 + ((y / 44) % 2) * 40; x < 1500; x += 80) shape(ctx, `rgba(90,66,44,${.08 + r() * .08})`, 0, rect(x + 2, y + 2, 76, 40, 3));
    // arched window looking out on the lagoon
    const win = c => { c.moveTo(860, 470); c.lineTo(860, 240); c.arc(970, 240, 110, Math.PI, 0); c.lineTo(1080, 470); c.closePath(); };
    shape(ctx, '#e7d3ac', 6, c => { c.moveTo(838, 492); c.lineTo(838, 240); c.arc(970, 240, 132, Math.PI, 0); c.lineTo(1102, 492); c.closePath(); });
    ctx.save(); ctx.beginPath(); win(ctx); ctx.clip();
    shape(ctx, grad(ctx, 0, 130, 0, 470, [[0, '#9cc8dc'], [1, '#f2d9a6']]), 0, rect(840, 120, 260, 360));
    shape(ctx, V.WATER, 0, rect(840, 400, 260, 80)); shape(ctx, '#a99a6a', 3, ellipse(930, 402, 60, 10)); shape(ctx, '#a99a6a', 3, ellipse(1050, 410, 40, 8));
    ctx.restore(); shape(ctx, null, 6, win); line(ctx, [[970, 130], [970, 470]], 6); shape(ctx, '#d6bf96', 5, rect(830, 470, 280, 26, 3));
    shape(ctx, '#6e4a2c', 0, rect(-200, 640, 1700, 300)); line(ctx, [[-200, 640], [1500, 640]], 4, 'rgba(0,0,0,.45)');
  }
  function s3(ctx, lt, dur, t) {
    const op = clamp((since(t, 'tells') - .05) / .45), td = since(t, 'tidy');
    const bump = Math.max(0, Math.sin(Math.PI * clamp(td / .18))) + Math.max(0, Math.sin(Math.PI * clamp((td - .26) / .18)));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.02, 1.08), 560, 400);
    scriptorium(ctx);
    const X = 520, Y = 690, S = .4;
    fig(ctx, X, Y, S, chronicler({ hands: { L: [-120, -760 + bump * 30], R: [120, -760 + bump * 30] }, handShape: { L: 'open', R: 'open' }, headTilt: td > 0 ? -.06 : 0,
      face: { brows: td > 0 ? 'smug' : 'calm', mouth: op > .3 ? 'smile' : 'flat', look: td > .5 ? [.25, .05] : [0, .35], eyes: blink(t, A.venice + .6, A.tidy + .7) }, breathe: breathe(t) }));
    book(ctx, X, Y - 770 * S + 40, op, bump, ['THE STORY OF', 'VENICE']);
    if (td > 0) [[X - 160, Y - 400], [X + 165, Y - 360], [X + 120, Y - 470], [X - 120, Y - 300]].forEach(([x, y], i) => sparkle(ctx, x, y, (td - .1 - i * .09) / .55, 1.1));
    ctx.restore();
    FX.vignette(ctx, 600, 380, .45);
    FX.caption(ctx, "VENICE'S OFFICIAL STORY", lt, .9);
  }

  // ---------- s4: noon, 25 March 421, the city is founded — the legend, told in storybook gold ----------
  function s4(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f7d98a'], [.7, '#f3c56c'], [1, '#e2a64e']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    // the sun climbs to noon on "noon"
    const sk = ease.inOut(clamp((since(t, 'noon1') + .15) / .9)), sx = lerp(1040, 900, sk), sy = lerp(520, 150, sk);
    glow(ctx, sx, sy, 260, 'rgba(255,250,220,.6)'); shape(ctx, '#fff2b0', 4, circle(sx, sy, 58));
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * .2; line(ctx, [[sx + Math.cos(a) * 74, sy + Math.sin(a) * 74], [sx + Math.cos(a) * 96, sy + Math.sin(a) * 96]], 5, '#fff2b0'); }
    // lagoon water and an empty island waiting for its city
    shape(ctx, V.WATER, 4, c => { c.moveTo(-100, 560); for (let x = -100; x <= 1400; x += 50) c.lineTo(x, 560 + Math.sin(x * .02 + t * 1.5) * 6); c.lineTo(1400, 900); c.lineTo(-100, 900); c.closePath(); });
    shape(ctx, '#b9a46e', 4, smooth([[700, 572], [780, 536], [940, 528], [1080, 544], [1140, 574], [920, 590]]));
    // the calendar page: MARCH 25, then AD 421
    const mk = since(t, 'march'), fk = since(t, 'fifth'), yk = since(t, 'four');
    if (mk > 0) { const s = slam(mk); ctx.save(); ctx.translate(330, 300); ctx.rotate(-.04); ctx.scale(s, s);
      ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-150 + 8, -170 + 10, 300, 330);
      shape(ctx, '#f6f0e0', 4.5, rect(-150, -170, 300, 330, 4)); shape(ctx, RED, 4.5, rect(-150, -170, 300, 70, 4)); txt(ctx, 'MARCH', 0, -133, FX.DISPLAY(40), '#fff');
      for (const x of [-90, 90]) shape(ctx, '#7a7a7a', 3, rect(x - 7, -186, 14, 30, 6));
      if (fk > 0) { const s2 = FX.settle(clamp(fk / .3)); ctx.save(); ctx.translate(0, 10); ctx.scale(s2, s2); txt(ctx, '25', 0, 0, FX.DISPLAY(150)); ctx.restore(); }
      ctx.restore(); }
    if (yk > 0) { const s = slam(yk); ctx.save(); ctx.translate(330, 530); ctx.rotate(.03); ctx.scale(s, s); FX.bigText(ctx, 'AD 421', 0, 0, 74, { color: GOLD }); ctx.restore(); }
    // "the city is founded": the first stone thuds down on the island
    const fd = since(t, 'founded') + .25;
    if (fd > 0) { const h = FX.dropBounce(fd, 420, .25), x = 930, y = 540 - h;
      if (fd > .55) { const k = clamp((fd - .55) / .5); ctx.save(); ctx.globalAlpha = 1 - k; for (const d of [-1, 1]) shape(ctx, '#e6d6a8', 3, circle(x + d * (80 + 50 * k), 540 - 12 - 18 * k, 14 + 10 * k)); ctx.restore(); }
      shape(ctx, '#d8d0bd', 4.5, rect(x - 92, y - 120, 184, 120, 4)); shape(ctx, '#c4baa3', 0, rect(x - 92, y - 26, 184, 26));
      txt(ctx, 'VENICE', x, y - 76, FX.DISPLAY(32), '#5a5040'); txt(ctx, 'FOUNDED', x, y - 44, FX.FONT(700, 18), '#5a5040'); }
    ctx.restore();
    FX.dateTag(ctx, 'THE LEGEND');
    FX.vignette(ctx, 640, 380, .35);
  }

  // ---------- s5: "Noon. Exactly." — the clock snaps to twelve; the chronicler is very sure; LEGEND ----------
  function s5(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f3d79a'], [1, '#d9a85e']]), 0, rect(0, 0, W, H));
    glow(ctx, 470, 330, 420, 'rgba(255,245,210,.45)');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 370);
    // bell tower face with a swinging bell above
    const cx = 470, cy = 360, R = 190;
    shape(ctx, '#c9b089', 5, rect(cx - 250, cy - 330, 500, 820, 6)); shape(ctx, '#b39870', 0, rect(cx - 250, cy - 330, 500, 40));
    const ba = FX.pendulum(since(t, 'noon2'), .45, 120, .9) * (since(t, 'noon2') > 0 ? 1 : 0);
    ctx.save(); ctx.translate(cx, cy - 300); ctx.rotate(since(t, 'noon2') > 0 ? ba : 0); line(ctx, [[0, 0], [0, 28]], 6);
    shape(ctx, '#c9a14a', 4.5, c => { c.moveTo(-34, 74); c.quadraticCurveTo(-30, 26, 0, 24); c.quadraticCurveTo(30, 26, 34, 74); c.closePath(); }); ctx.restore();
    shape(ctx, '#2b3b5c', 6, circle(cx, cy, R + 22)); shape(ctx, '#f4ecd6', 5, circle(cx, cy, R));
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 - Math.PI / 2; const n = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][i];
      txt(ctx, n, cx + Math.cos(a) * (R - 34), cy + Math.sin(a) * (R - 34), `700 ${i ? 24 : 30}px Georgia, serif`, '#2b3b5c'); }
    // minute hand creeps toward twelve, then snaps the last step on "noon" with a small overshoot
    const sn = since(t, 'noon2'); const minutes = sn < 0 ? lerp(-3.2, -1, clamp(lt / (A.noon2 - 13.55))) : lerp(-1, 0, FX.settle(clamp(sn / .25)));
    const mA = minutes / 60 * Math.PI * 2 - Math.PI / 2, hA = (minutes / 60) / 12 * Math.PI * 2 - Math.PI / 2;
    line(ctx, [[cx, cy], [cx + Math.cos(hA) * R * .5, cy + Math.sin(hA) * R * .5]], 12, '#2b3b5c'); line(ctx, [[cx, cy], [cx + Math.cos(mA) * R * .78, cy + Math.sin(mA) * R * .78]], 8, '#2b3b5c');
    shape(ctx, '#c9a14a', 4, circle(cx, cy, 14));
    if (sn > 0) glow(ctx, cx, cy - R + 30, 140 * Math.exp(-sn * 2), 'rgba(255,240,180,.6)');
    // the chronicler, very pleased with his precise legend
    const ex = since(t, 'exactly'), gr = since(t, 'great'), st = since(t, 'story2');
    const point = ex > 0 && gr < 0, proud = gr > 0;
    const X = 960, Y = 700, S = .4, lift = ex > 0 ? ease.out(clamp(ex / .25)) : 0;
    const hR = point ? [lerp(140, 230, lift), lerp(-470, -1180, lift)] : proud ? [200, -760] : [130, -560];
    const hL = proud ? [-200, -760] : [-110, -700];
    fig(ctx, X, Y, S, chronicler({ hands: { L: hL, R: hR }, handShape: { L: 'open', R: point ? 'point' : 'open' }, headTilt: proud ? .06 : 0,
      face: { brows: st > .25 ? 'worried' : point ? 'smug' : 'up', mouth: st > .25 ? 'o' : 'smile', look: st > .25 ? [.9, -.1] : point ? [.4, -.5] : proud ? [0, .1] : [.6, 0], eyes: blink(t, 14.2, A.great + .3) }, breathe: breathe(t) }), { mirror: true });
    if (!proud) book(ctx, X - 46, Y - 270, 0, 0, ['THE STORY OF', 'VENICE']);                // tucked under his arm
    else book(ctx, X, Y - 760 * S + 40, 1, 0, ['', '']);                                       // held up open
    if (ex > 0 && ex < 1.6) { ctx.globalAlpha = clamp(ex / .2) * clamp((1.6 - ex) / .3); FX.bigText(ctx, '12:00', 770, 150, 56, { color: GOLD }); ctx.globalAlpha = 1; }
    ctx.restore();
    FX.stamp(ctx, 'LEGEND', 470, 380, st, { color: RED, size: 78, rot: -.14 });
    FX.vignette(ctx, 640, 380, .4);
    FX.dateTag(ctx, 'THE LEGEND');
  }

  const cut = [[0, s1], [2.15, s2], [4.95, s3], [8.2, s4], [13.55, s5]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: A.job + .05, type: 'paper', gain: .7 }, { t: A.wall, type: 'paper', gain: .5 }, { t: A.wall + .38, type: 'clang', gain: .35 },
    ...[0, 1, 2, 3].map(i => ({ t: A.start + .12 + i * .26, type: 'click', gain: .25 })), { t: A.anyone, type: 'scratch', gain: .4 }, { t: A.outhere, type: 'thud', gain: .45 },
    { t: A.tells + .05, type: 'paper', gain: .7 }, { t: A.tidy, type: 'thud', gain: .3 }, { t: A.tidy + .26, type: 'thud', gain: .3 },
    { t: A.march, type: 'paper', gain: .6 }, { t: A.four, type: 'thud', gain: .55 }, { t: A.founded + .5, type: 'thud', gain: .8 },
    { t: A.noon2, type: 'ratchet', gain: .4 }, { t: A.noon2 + .05, type: 'clang', gain: .45 }, { t: A.exactly, type: 'click', gain: .5 }, { t: A.story2, type: 'thud', gain: .9 },
  ];
  const moods = [{ t: 0, mood: 'still' }];
  G.Show = {
    duration: A.end, narration: 'venice/assets/audio/narration-job-one.mp3', shots, sfx, moods,
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
