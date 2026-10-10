/* Venice — "Job one: a wall" (narration-job-one.mp3, full part). Shots 1–5 are the approved sample.
 * Word anchors below come from tools/asr.py on the recording (the narrator reads the chapter title aloud). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Ch = G.Chars, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945';
  const A = { job: .04, wall: 1.22, start: 2.29, anyone: 3.21, outhere: 3.75, venice: 5.1, tells: 5.33, tidy: 6.32, story1: 6.77,
    atnoon: 8.38, noon1: 8.53, march: 9.09, fifth: 9.66, year: 10.4, four: 10.67, city: 12.32, founded: 12.84, noon2: 13.76, exactly: 14.5,
    great: 15.99, story2: 16.35,
    also: 17.35, chronicles: 18.12, more: 18.99, later: 20.3, church: 21.27, built: 22.37, eleven: 23.0,
    real: 24.39, letter: 25.81, around: 26.86, five37: 27.46, official: 29.44, cass: 30.21, writes: 31.48, people: 32.01, lagoon1: 32.54,
    wants: 33.57, ship: 34.2, wine: 34.71, oil: 35.18, along: 36.04, describes: 37.13,
    houses: 38.8, ground: 39.96, woven: 41.08, branches: 41.74, boats: 42.74, tied: 43.53, animals: 44.81,
    rich: 45.89, poor: 46.47, same: 47.26, fish: 47.7, sell: 48.68, one: 49.11, salt: 50.2,
    says: 51.09, quote: 52.63, manner: 53.74, waterfowl: 54.37, already: 55.81, here: 57.4, mainland: 58.23, worse: 59.73,
    y568: 60.82, lombard: 62.74, crosses: 63.29, alps: 63.98, towns: 64.71, fall: 65.87, one2: 66.22, after: 66.62, another: 67.04,
    whole: 67.77, move: 68.98, marsh1: 69.5, good: 70.09, why: 71.09, marsh2: 71.47, because: 72.5, army1: 73.84,
    y810: 74.98, charlemagne: 75.95, pepin: 76.88, take: 77.69, captures: 79.16, outer: 79.83, then: 81.07, stops: 82.33,
    his: 83.6, shallows: 85.02, middle: 86.33, pulls: 87.19, details: 88.46, venetian: 89.83, neutral: 92.03, outcome: 93.03, doubt: 94.25,
    lagoon2: 95.21, firstjob: 96.6, wall2: 97.64, leaders: 98.75, capital: 100.21, behind: 100.64, cluster: 101.64, center: 103.23, rivo: 104.17, know: 105.5, rialto: 106.48,
    end: 108.6 };
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
  function s2(ctx, lt, dur, t) { italyMap(ctx, lt, dur, t, {}); }
  function italyMap(ctx, lt, dur, t, o) {
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
    TOWNS.forEach(([n, sub, x, y], i) => { const k = o.townK ? o.townK(i) : since(t, 'start') + .1 - i * .26; town(ctx, x, y, k); if (o.townOver) o.townOver(ctx, i, x, y); if (k > .1) { ctx.globalAlpha = clamp((k - .1) / .2); txt(ctx, n, x, y + 22, FX.FONT(700, 15)); if (sub) txt(ctx, `(${sub})`, x, y + 39, FX.FONT(600, 12), '#4a443d'); ctx.globalAlpha = 1; } });
    txt(ctx, 'A L P S', 560, 140, FX.FONT(700, 22), '#4a4636');
    txt(ctx, 'ADRIATIC SEA', 850, 500, `italic 600 24px Georgia, serif`, '#2f5d6b');
    ctx.restore();
    if (o.over) o.over(ctx);
    // the question: why is anyone out here?
    const an = o.over ? -1 : since(t, 'anyone');
    if (an > 0) { ctx.save(); ctx.setLineDash([12, 9]); ctx.lineWidth = 5; ctx.strokeStyle = RED; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.ellipse(600, 410, 140, 92, -.55, -.5, -.5 + Math.PI * 2 * ease.out(clamp(an / .5))); ctx.stroke(); ctx.restore(); }
    const oh = o.over ? -1 : since(t, 'outhere');
    if (oh > 0) { const s = FX.settle(clamp(oh / .3)); ctx.save(); ctx.translate(735, 440); ctx.scale(s, s); ctx.rotate(.1); FX.bigText(ctx, '?', 0, 0, 92, { color: GOLD }); ctx.restore(); }
    if (an > .4) { ctx.globalAlpha = clamp((an - .4) / .25); txt(ctx, 'THE LAGOON', 470, 520, FX.DISPLAY(24), '#1f4b58'); line(ctx, [[505, 505], [540, 470]], 3, '#1f4b58'); ctx.globalAlpha = 1; }
    ctx.restore(); ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, o.tag || 'NORTHEASTERN ITALY, c. AD 500');
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


  // ======================= the rest of Job one =======================
  const sceneSky = (ctx, top = '#9cc8dc', bot = '#f2d9a6') => shape(ctx, grad(ctx, 0, 0, 0, H, [[0, top], [1, bot]]), 0, rect(-400, -300, 2400, 1400));
  const water = (ctx, y, t, x0 = -400, x1 = 2400, col = V.WATER) => shape(ctx, col, 4, c => { c.moveTo(x0, y); for (let x = x0; x <= x1; x += 40) c.lineTo(x, y + Math.sin(x * .02 + t * 1.5) * 5); c.lineTo(x1, 1400); c.lineTo(x0, 1400); c.closePath(); });
  const walk = (ph, amp = 1) => ({ feet: { L: [-30 + Math.sin(ph) * 70 * amp, -40 - Math.max(0, Math.cos(ph)) * 34 * amp], R: [30 - Math.sin(ph) * 70 * amp, -40 - Math.max(0, -Math.cos(ph)) * 34 * amp] },
    hands: { L: [-130 - Math.sin(ph) * 60 * amp, -470], R: [130 + Math.sin(ph) * 60 * amp, -470] } });
  const P = (head, outfit, o) => Object.assign({ head, outfit, hands: { L: [-120, -470], R: [120, -470] }, feet: { L: [-60, -40], R: [60, -40] } }, o);
  function hut(ctx, x, y, s = 1, door = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#9a7048', 4, rect(-70, -90, 140, 90)); for (let i = -50; i < 70; i += 24) line(ctx, [[i, -88], [i, -2]], 2.5, 'rgba(29,26,23,.3)');
    shape(ctx, '#c9a35a', 4, poly([[-92, -86], [0, -160], [92, -86]])); for (let i = -60; i <= 60; i += 20) line(ctx, [[i * .9, -96], [i * .2, -150]], 2, 'rgba(29,26,23,.25)');
    if (door) shape(ctx, '#4a3420', 3.5, rect(-18, -56, 36, 56, 3)); ctx.restore(); }
  function boat(ctx, x, y, s = 1, rot = 0, cargo) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    shape(ctx, '#7a5434', 4.5, c => { c.moveTo(-120, -30); c.lineTo(120, -30); c.quadraticCurveTo(110, 10, 80, 14); c.lineTo(-80, 14); c.quadraticCurveTo(-110, 10, -120, -30); c.closePath(); });
    line(ctx, [[-110, -18], [110, -18]], 3, 'rgba(29,26,23,.35)'); if (cargo) cargo(ctx); ctx.restore(); }
  function amphora(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#c97b4a', 4, smooth([[0, 46], [-22, 20], [-26, -14], [-14, -36], [-9, -50], [9, -50], [14, -36], [26, -14], [22, 20]]));
    shape(ctx, col, 0, rect(-22, -10, 44, 14)); line(ctx, [[-9, -44], [-22, -28]], 4); line(ctx, [[9, -44], [22, -28]], 4); ctx.restore(); }
  function fish(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    shape(ctx, '#9fb4bc', 3.5, c => { c.ellipse(0, 0, 34, 14, 0, 0, 7); }); shape(ctx, '#9fb4bc', 3.5, poly([[30, 0], [52, -14], [50, 14]])); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-20, -3, 3, 0, 7); ctx.fill(); ctx.restore(); }
  function flames(ctx, x, y, s, t, k) { if (k <= 0) return; const g = clamp(k / .5) * s; ctx.save(); ctx.translate(x, y); ctx.scale(g, g);
    glow(ctx, 0, -40, 120, 'rgba(255,140,40,.45)');
    for (const [dx, h, ph, col] of [[-26, 70, 0, '#e8622a'], [24, 80, 1.7, '#e8622a'], [0, 104, .8, '#f29a2e'], [0, 60, 2.4, '#ffd36a']]) { const f = 1 + Math.sin(t * 9 + ph) * .08;
      shape(ctx, col, 3, smooth([[dx - 22, 0], [dx - 16, -h * .5 * f], [dx, -h * f], [dx + 16, -h * .5 * f], [dx + 22, 0]])); }
    ctx.restore();
    for (let i = 0; i < 3; i++) { const ph = ((t * .5 + i / 3) % 1); ctx.save(); ctx.globalAlpha = .45 * (1 - ph) * clamp(k); shape(ctx, '#5a5048', 0, circle(x + Math.sin(ph * 4 + i) * 20 * s, y - (120 + ph * 220) * s, (26 + ph * 40) * s)); ctx.restore(); } }
  function warrior(ctx, x, y, s, ph, tint = '#2a2420') { // a marching soldier in silhouette: spear + round shield
    fig(ctx, x, y, s, P('fisher', 'tunicPoor', walk(ph, .8)), { tint });
    line(ctx, [[x + 120 * s, y - 1100 * s], [x + 140 * s, y - 300 * s]], 9 * s * 2.2, tint);
    shape(ctx, tint, 0, poly([[x + 120 * s, y - 1100 * s - 50 * s], [x + 100 * s, y - 1100 * s + 20 * s], [x + 140 * s, y - 1100 * s + 20 * s]]));
    shape(ctx, tint, 0, circle(x - 90 * s, y - 700 * s, 150 * s)); shape(ctx, 'rgba(255,255,255,.12)', 0, circle(x - 90 * s, y - 700 * s, 40 * s)); }
  function card(ctx, lines, x, y, k, w = 360) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(x + 300, x, e), y); ctx.rotate(.02);
    const h = 30 + lines.length * 34; ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, PAPER, 3.5, rect(-w / 2, -h / 2, w, h, 3));
    lines.forEach(([s, f], i) => txt(ctx, s, 0, -h / 2 + 32 + i * 34, f || FX.FONT(700, 22))); ctx.restore(); }
  function framePic(ctx, x, y, w, h, inside) { T.shadow(ctx, x + 10, y + h / 2 + 14, w * .5, 12, .35, 8);
    shape(ctx, '#7a5a30', 5, rect(x - w / 2 - 16, y - h / 2 - 16, w + 32, h + 32, 6)); shape(ctx, '#c9a14a', 3, rect(x - w / 2 - 7, y - h / 2 - 7, w + 14, h + 14, 4)); shape(ctx, '#cbb894', 3, rect(x - w / 2, y - h / 2, w, h));
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip(); inside(); ctx.restore(); }

  // ---------- s6: the founding story comes from chronicles 600+ years later, about a church built in the 1100s ----------
  const YX = yr => 120 + (yr - 380) * 1040 / 840;
  function churchIcon(ctx, x, y, s, ghost) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (ghost) { ctx.setLineDash([8, 7]); ctx.globalAlpha = .8; }
    const f = ghost ? null : '#e9dcc0', r = ghost ? null : '#b8503a';
    shape(ctx, f, 4, rect(-50, -70, 100, 70)); shape(ctx, r, 4, poly([[-62, -68], [0, -112], [62, -68]])); shape(ctx, f, 4, rect(42, -150, 34, 150)); shape(ctx, r, 4, poly([[38, -148], [59, -186], [80, -148]]));
    if (!ghost) shape(ctx, '#4a3420', 3, c => { c.moveTo(-14, 0); c.lineTo(-14, -30); c.arc(0, -30, 14, Math.PI, 0); c.lineTo(14, 0); c.closePath(); });
    ctx.restore(); }
  function s6(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2c2723');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 390);
    shape(ctx, PAPER, 4, rect(100, 430, 1080, 40, 4));
    for (let yr = 400; yr <= 1200; yr += 100) { const x = YX(yr); line(ctx, [[x, 430], [x, 470]], 3); txt(ctx, String(yr), x, 498, FX.FONT(700, 20), '#efe6d0'); }
    // the legend at 421: the founding stone
    ctx.save(); ctx.translate(YX(421), 420); shape(ctx, '#d8d0bd', 4, rect(-60, -80, 120, 80, 4)); txt(ctx, 'VENICE', 0, -50, FX.DISPLAY(22), '#5a5040'); txt(ctx, '421', 0, -24, FX.FONT(700, 16), '#5a5040'); ctx.restore();
    txt(ctx, 'THE LEGEND', YX(421), 540, FX.FONT(700, 18), GOLD);
    // the chronicles land in the 11th century
    const ch = since(t, 'chronicles');
    if (ch > 0) { const s = slam(ch); ctx.save(); ctx.translate(YX(1050), 360); ctx.scale(s, s); ctx.rotate(-.05);
      shape(ctx, '#efe2c0', 4, rect(-60, -50, 120, 100, 3)); for (const yy of [-50, 50]) shape(ctx, '#c9b48a', 4, ellipse(0, yy, 66, 12));
      for (let i = 0; i < 4; i++) line(ctx, [[-40, -24 + i * 16], [40 - (i % 2) * 18, -24 + i * 16]], 3, 'rgba(70,64,58,.5)'); ctx.restore();
      ctx.globalAlpha = clamp((ch - .2) / .3); txt(ctx, 'CHRONICLES', YX(1050), 540, FX.FONT(700, 18), GOLD); txt(ctx, '11th CENTURY', YX(1050), 562, FX.FONT(600, 14), '#efe6d0'); ctx.globalAlpha = 1; }
    // the 600-year gap
    const gp = since(t, 'more');
    if (gp > 0) { const k = ease.inOut(clamp(gp / 1.2)), x0 = YX(421) + 70, x1 = lerp(x0, YX(1050) - 70, k);
      ctx.save(); ctx.setLineDash([14, 10]); line(ctx, [[x0, 300], [x1, 300]], 5, '#efe6d0'); ctx.restore();
      if (k > .98) shape(ctx, '#efe6d0', 0, poly([[x1 + 18, 300], [x1 - 4, 288], [x1 - 4, 312]]));
      const lk = since(t, 'later'); if (lk > 0) { const s = FX.settle(clamp(lk / .3)); ctx.save(); ctx.translate((x0 + YX(1050) - 70) / 2, 250); ctx.scale(s, s); FX.bigText(ctx, '600+ YEARS LATER', 0, 0, 44, { color: GOLD }); ctx.restore(); } }
    // the church in the story didn't exist until the 1100s
    const cg = since(t, 'church');
    if (cg > 0) { ctx.globalAlpha = clamp(cg / .3); churchIcon(ctx, YX(421) + 4, 330, .6, true); ctx.globalAlpha = 1; txt(ctx, '?', YX(421) + 60, 230, FX.DISPLAY(50), RED); }
    const bu = since(t, 'built');
    if (bu > 0) { const rise = ease.out(clamp(bu / .6)); ctx.save(); ctx.beginPath(); ctx.rect(YX(1150) - 100, 0, 200, 430); ctx.clip(); churchIcon(ctx, YX(1150), 430 + (1 - rise) * 200, .9); ctx.restore(); }
    const el = since(t, 'eleven'); if (el > 0) { ctx.globalAlpha = clamp(el / .25); txt(ctx, 'CHURCH BUILT', YX(1150), 540, FX.FONT(700, 18), GOLD); txt(ctx, '1100s', YX(1150), 562, FX.FONT(600, 14), '#efe6d0'); ctx.globalAlpha = 1; }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'WHERE THE LEGEND COMES FROM');
  }

  // ---------- s7: the real evidence is a letter ----------
  function s7(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2f2a26');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 370);
    const sl = FX.approach(t, A.real, 1400, 640, .14), cr = since(t, 'letter');
    ctx.save(); ctx.translate(sl, 380); ctx.rotate(-.04);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-260 + 8, -170 + 10, 520, 340);
    shape(ctx, '#efe2c0', 4.5, rect(-260, -170, 520, 340, 4)); line(ctx, [[-260, -60], [0, 40], [260, -60]], 3.5, 'rgba(29,26,23,.4)');
    const sp = cr > 0 ? ease.out(clamp(cr / .3)) * 18 : 0;
    for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * sp, 30 + (sp ? sp * .4 : 0)); ctx.rotate(d * sp * .01);
      shape(ctx, '#a8322a', 4, c => { c.moveTo(0, -46); c.arc(0, 30 - 46 + 16, 46, -Math.PI / 2, Math.PI / 2, d < 0); c.closePath(); }); ctx.restore(); }
    if (!cr || cr <= 0) txt(ctx, 'C', 0, 30, `700 40px Georgia, serif`, '#f0c8a0');
    ctx.restore();
    ctx.restore();
    FX.caption(ctx, 'THE REAL EVIDENCE: A LETTER', lt, .3);
    FX.vignette(ctx, 640, 380, .45);
  }

  // ---------- s8: c. 537 — Cassiodorus, a Roman official in Ravenna, writes to the people of the lagoon ----------
  function mosaicWall(ctx) {
    shape(ctx, '#1f4a44', 0, rect(-300, -300, 2000, 1000));
    const r = rng(11); for (let y = -300; y < 640; y += 16) for (let x = -300; x < 1700; x += 16) { const v = r(); if (v < .5) continue; ctx.fillStyle = v < .7 ? 'rgba(232,193,74,.22)' : v < .85 ? 'rgba(40,110,100,.5)' : 'rgba(255,255,255,.06)'; ctx.fillRect(x + 1, y + 1, 14, 14); }
    for (const x of [140, 1140]) { shape(ctx, '#e9dcc0', 5, rect(x - 30, 100, 60, 540)); shape(ctx, '#c9a14a', 4, rect(x - 44, 80, 88, 26, 3)); }
    shape(ctx, null, 0, c => c);
    for (let i = 0; i < 5; i++) { const x = 300 + i * 170; ctx.save(); ctx.globalAlpha = .5; shape(ctx, '#e8c14a', 3, circle(x, 140, 18)); ctx.restore(); }
    shape(ctx, '#7a5a3a', 0, rect(-300, 640, 2000, 400)); line(ctx, [[-300, 640], [1700, 640]], 4, 'rgba(0,0,0,.45)');
  }
  function desk(ctx, x, y, w) { shape(ctx, '#6e4a2c', 5, rect(x - w / 2, y, w, 40, 4)); shape(ctx, '#5a3a22', 5, rect(x - w / 2 + 20, y + 40, w - 40, 220)); }
  function s8(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.02, 1.1), 600, 400);
    mosaicWall(ctx);
    const wr = since(t, 'writes'), writing = wr > 0, X = 560, Y = 690, S = .4;
    const qx = writing ? Math.sin(wr * 14) * 28 : 0;
    fig(ctx, X, Y, S, P('cassiodorus', 'roman', { hands: { L: [-90, -560], R: [70 + qx, -560 + Math.abs(Math.sin(wr * 7)) * (writing ? 12 : 0)] }, handShape: { R: 'fist' }, lean: .08,
      face: { brows: since(t, 'lagoon1') > 0 ? 'up' : 'calm', mouth: since(t, 'lagoon1') > 0 ? 'smile' : 'flat', look: writing ? [.1, .7] : [.3, .1], eyes: blink(t, A.around + .5, A.cass + 1.2) }, breathe: breathe(t) }));
    const hx = X + (70 + qx) * S, hy = Y - 560 * S;
    desk(ctx, X, hy + 30, 420);
    shape(ctx, '#f2ecd9', 3.5, poly([[X - 110, hy + 16], [X + 120, hy + 16], [X + 130, hy + 30], [X - 120, hy + 30]]));
    line(ctx, [[hx + 6, hy - 6], [hx + 40, hy - 90]], 5, '#3a2a1a'); shape(ctx, '#f4efe2', 3, smooth([[hx + 30, hy - 60], [hx + 52, hy - 100], [hx + 38, hy - 104], [hx + 26, hy - 70]]));
    shape(ctx, '#2a2430', 3.5, rect(X - 170, hy - 6, 30, 24, 4));                                       // ink pot
    ctx.restore();
    card(ctx, [['CASSIODORUS', FX.DISPLAY(30)], ['ROMAN OFFICIAL, RAVENNA', FX.FONT(600, 18)]], 1000, 220, since(t, 'cass') - .1, 380);
    const lg = since(t, 'lagoon1'); if (lg > 0) { const s = slam(lg); ctx.save(); ctx.translate(980, 470); ctx.scale(s, s); ctx.rotate(-.03); FX.paperDoc(ctx, 0, 0, 380, 120, { lines: 0, draw: c => { txt(c, 'TO THE PEOPLE', 0, -18, FX.DISPLAY(28)); txt(c, 'OF THE LAGOON', 0, 18, FX.DISPLAY(28)); } }); ctx.restore(); }
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, 'RAVENNA, c. AD 537');
  }

  // ---------- s9: he wants wine and oil shipped — and describes how they live ----------
  function letterCard(ctx, x, y, rows, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.02);
    const w = 470, h = 520; ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); shape(ctx, '#f1e6c8', 4, rect(-w / 2, -h / 2, w, h, 3));
    txt(ctx, 'CASSIODORUS · VARIAE 12.24', 0, -h / 2 + 34, FX.FONT(700, 18), '#7a2a24'); txt(ctx, 'Letter to the tribunes of the maritime people, c. 537', 0, -h / 2 + 60, `italic 15px Georgia, serif`, '#4a443d');
    line(ctx, [[-w / 2 + 24, -h / 2 + 80], [w / 2 - 24, -h / 2 + 80]], 2.5);
    rows.forEach(([s, k, f, col], i) => { if (k <= 0) return; ctx.globalAlpha = clamp(k / .25); txt(ctx, s, -w / 2 + 34 + (1 - ease.out(clamp(k / .3))) * 20, -h / 2 + 118 + i * 44, f || FX.FONT(700, 24), col || INK, 'left'); ctx.globalAlpha = 1; });
    ctx.restore(); }
  function s9(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2c2723');
    const push = since(t, 'describes'), z = push > 0 ? lerp(1, 1.18, ease.inOut(clamp(push / 1.2))) : 1;
    ctx.save(); cam(ctx, z, push > 0 ? lerp(640, 470, ease.inOut(clamp(push / 1.2))) : 640, push > 0 ? lerp(370, 420, ease.inOut(clamp(push / 1.2))) : 370);
    letterCard(ctx, 400, 370, [['WANTED, SHIPPED:', since(t, 'wants'), FX.FONT(700, 20), '#7a2a24'], ['• WINE', since(t, 'wine')], ['• OIL', since(t, 'oil')], ['', -1], ['HOW THEY LIVE:', since(t, 'describes'), FX.FONT(700, 20), '#7a2a24']]);
    // the boat on the lagoon, loading the order
    shape(ctx, V.WATER, 4, c => { c.moveTo(700, 520); for (let x = 700; x <= 1220; x += 30) c.lineTo(x, 520 + Math.sin(x * .03 + t * 1.6) * 5); c.lineTo(1220, 640); c.lineTo(700, 640); c.closePath(); });
    const bob = Math.sin(t * 1.6) * 4;
    boat(ctx, 960, 524 + bob, 1.2, Math.sin(t * 1.3) * .02, c => {
      [['wine', -40, '#7a1f2a'], ['oil', 40, '#c9a14a']].forEach(([k, dx, col]) => { const d = since(t, k); if (d <= 0) return; const h = FX.dropBounce(d, 360, .25); amphora(c, dx, -76 - h, 1, col); }); });
    [['wine', 920, 'WINE'], ['oil', 1010, 'OIL']].forEach(([k, x, s]) => { const d = since(t, k); if (d > .4) { ctx.globalAlpha = clamp((d - .4) / .2); txt(ctx, s, x, 600, FX.FONT(700, 18), '#efe6d0'); ctx.globalAlpha = 1; } });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, 'THE LETTER, c. AD 537');
  }

  // ---------- s10: houses on ground held together with woven branches; boats tied to the walls like animals ----------
  function wattleIsland(ctx, x, y, w, weave, t) { // a mud island retained by a woven-branch fence
    shape(ctx, '#8a7a52', 4.5, rect(x - w / 2, y - 60, w, 120, 10));
    const n = Math.floor(w / 26), shown = Math.floor(n * clamp(weave));
    for (let i = 0; i <= n; i++) line(ctx, [[x - w / 2 + i * 26, y - 70], [x - w / 2 + i * 26, y + 60]], 6, '#5a4026');
    for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let i = 0; i <= shown; i++) { const xx = x - w / 2 + i * 26, yy = y - 50 + r * 28 + ((i + r) % 2 ? 7 : -7); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
      ctx.lineWidth = 9; ctx.strokeStyle = '#a8804a'; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke(); }
    shape(ctx, '#6f7a3a', 4, rect(x - w / 2 - 6, y - 78, w + 12, 18, 6)); }
  function s10(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    sceneSky(ctx); for (const [x, y] of [[200, 140], [980, 110]]) shape(ctx, 'rgba(255,255,255,.7)', 0, smooth([[x - 80, y], [x - 30, y - 26], [x + 40, y - 30], [x + 90, y], [x, y + 12]]));
    water(ctx, 520, t);
    const wv = clamp((since(t, 'woven') + .1) / 1.2);
    wattleIsland(ctx, 520, 540, 560, wv, t);
    hut(ctx, 560, 462, 1.25);
    // the fisherman at his door
    const ti = since(t, 'tied'), reach = ti > -.4 && ti < .9;
    fig(ctx, 380, 462, .27, P('fisher', 'tunicPoor', { hands: { L: [-120, -470], R: reach ? [300, -600] : [130, -470] }, face: { brows: 'calm', mouth: since(t, 'animals') > 0 ? 'smile' : 'flat', look: since(t, 'boats') > 0 ? [.8, .2] : [.2, 0], eyes: blink(t, A.houses + .8, A.boats + 1.3) }, breathe: breathe(t) }));
    // a boat comes in and is tied to the hut wall; it tugs on its rope like a tethered animal
    const bx = FX.approach(t, A.boats, 1500, 1000, .35), tug = since(t, 'animals') > 0 ? Math.sin(since(t, 'animals') * 3.2) * 26 * Math.exp(-since(t, 'animals') * .4) : 0;
    const bob = Math.sin(t * 1.6) * 4;
    boat(ctx, bx + tug, 530 + bob, 1, Math.sin(t * 1.3) * .03);
    if (ti > 0) { const ring = [664, 420], end = [bx + tug - 110, 506 + bob], sag = 40 * (1 - clamp(ti / .3)) + Math.max(0, -tug) * .6 + 8;
      ctx.beginPath(); ctx.moveTo(...ring); ctx.quadraticCurveTo((ring[0] + end[0]) / 2, Math.max(ring[1], end[1]) + sag, ...end); ctx.lineWidth = 5; ctx.strokeStyle = '#c9a35a'; ctx.stroke(); ctx.lineWidth = 1.5; ctx.strokeStyle = INK; ctx.stroke();
      shape(ctx, null, 4, circle(ring[0], ring[1], 9)); }
    ctx.restore();
    if (t < A.boats) FX.caption(ctx, 'GROUND HELD TOGETHER WITH WOVEN BRANCHES', lt, .9); else FX.caption(ctx, 'BOATS TIED TO THE WALLS, LIKE ANIMALS', since(t, 'boats'), .7);
    FX.vignette(ctx, 640, 380, .35);
    FX.dateTag(ctx, 'THE LAGOON, c. AD 537');
  }

  // ---------- s11: rich and poor eat the same fish ----------
  function s11(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    sceneSky(ctx, '#a8d0e0', '#f4e0b4'); water(ctx, 560, t); shape(ctx, '#b9a46e', 4, smooth([[120, 600], [300, 520], [980, 520], [1160, 600], [640, 640]]));
    const sm = since(t, 'same'), up = k => ease.out(clamp(k / .3));
    const lift = up(sm);
    fig(ctx, 420, 600, .33, P('elder', 'tunicElder', { hands: { L: [-130, -470], R: [lerp(150, 240, lift), lerp(-470, -900, lift)] }, handShape: { R: 'fist' }, face: { brows: 'up', mouth: 'smile', look: [.5, -.2], eyes: blink(t, 46.6) }, breathe: breathe(t) }));
    fig(ctx, 860, 600, .33, P('fisher', 'tunicPoor', { hands: { L: [-130, -470], R: [lerp(150, 240, lift), lerp(-470, -900, lift)] }, handShape: { R: 'fist' }, face: { brows: 'up', mouth: 'smile', look: [.5, -.2], eyes: blink(t, 47.1) }, breathe: breathe(t + 1) }), { mirror: true });
    if (sm > 0) { fish(ctx, 420 + 240 * .33 + 4, 600 - 900 * .33 - 30, 1.1, -.2 + Math.sin(sm * 6) * .1 * Math.exp(-sm * 2)); fish(ctx, 860 - 240 * .33 - 4, 600 - 900 * .33 - 30, 1.1, Math.PI + .2 + Math.sin(sm * 6 + 1) * .1 * Math.exp(-sm * 2)); }
    const fk = since(t, 'fish'); if (fk > 0) { const s = FX.settle(clamp(fk / .3)); ctx.save(); ctx.translate(640, 300); ctx.scale(s, s); FX.bigText(ctx, '=', 0, 0, 110, { color: GOLD }); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'RICH', 420, 110, since(t, 'rich'), { px: 34 }); strip(ctx, 'POOR', 860, 110, since(t, 'poor'), { px: 34 });
    FX.caption(ctx, 'EVERYONE EATS THE SAME FISH', since(t, 'same'), .3);
    FX.vignette(ctx, 640, 380, .35);
  }

  // ---------- s12: they sell one thing — salt ----------
  function s12(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    sceneSky(ctx, '#a8d0e0', '#f6e6c0'); shape(ctx, '#b9a46e', 0, rect(-200, 420, 1700, 400));
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 140 + c * 250 + r * 30, y = 450 + r * 80; shape(ctx, '#cfe3e6', 4, poly([[x, y], [x + 220, y], [x + 230, y + 62], [x - 10, y + 62]])); ctx.save(); ctx.globalAlpha = .7; for (let i = 0; i < 5; i++) shape(ctx, '#fff', 0, circle(x + 30 + i * 40, y + 30 + (i % 2) * 10, 5)); ctx.restore(); }
    // she rakes the crystals into a heap
    const rk = Math.sin(t * 3) * .5 + .5;
    const X = 860, Y = 600, S = .3;
    shape(ctx, '#f8f8f4', 4, smooth([[X - 270, Y], [X - 230, Y - 60], [X - 180, Y - 80], [X - 130, Y - 50], [X - 110, Y]]));
    fig(ctx, X, Y, S, P('villagerW', 'dressPlain', { hands: { L: [lerp(-300, -220, rk), -620], R: [lerp(-120, -40, rk), -760] }, handShape: { L: 'fist', R: 'fist' }, lean: -.1, face: { brows: 'calm', mouth: 'flat', look: [-.7, .4], eyes: blink(t, 49.6) }, breathe: breathe(t) }));
    line(ctx, [[X + lerp(-120, -40, rk) * S + 6, Y - 760 * S], [X + lerp(-300, -220, rk) * S - 60, Y - 20]], 6, '#7a5434'); line(ctx, [[X + lerp(-300, -220, rk) * S - 90, Y - 18], [X + lerp(-300, -220, rk) * S - 30, Y - 22]], 8, '#7a5434');
    const sa = since(t, 'salt') - .05; if (sa > 0) { const h = FX.dropBounce(sa, 380, .2); ctx.save(); ctx.translate(1080, 610 - h);
      shape(ctx, '#e6d8b0', 4.5, smooth([[-70, 0], [-76, -90], [-50, -120], [-20, -112], [0, -130], [20, -112], [50, -120], [76, -90], [70, 0]])); txt(ctx, 'SALT', 0, -54, FX.DISPLAY(30), '#5a4a30'); ctx.restore(); }
    ctx.restore();
    const on = since(t, 'one'); if (on > 0) { const s = FX.settle(clamp(on / .3)); ctx.save(); ctx.translate(250, 200); ctx.scale(s, s); FX.bigText(ctx, '1 EXPORT', 0, 0, 60, { color: GOLD }); ctx.restore(); }
    FX.caption(ctx, 'THEY SELL ONE THING: SALT', since(t, 'salt'), .2);
    FX.vignette(ctx, 640, 380, .35);
  }

  // ---------- s13: "after the manner of water-fowl" (Hodgkin's wording) ----------
  function duck(ctx, x, y, s, flap, flying) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#8a6a4a', 3.5, ellipse(0, 0, 34, 20)); shape(ctx, '#2f6a4a', 3.5, circle(26, -18, 13)); shape(ctx, '#e8a83a', 3, poly([[36, -18], [52, -14], [36, -10]]));
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(29, -21, 2.5, 0, 7); ctx.fill();
    const wa = flying ? Math.sin(flap) * .9 : .1; ctx.save(); ctx.translate(-6, -8); ctx.rotate(-wa); shape(ctx, '#a8865a', 3.5, ellipse(-14, -8, 22, 10, -.3)); ctx.restore(); ctx.restore(); }
  function s13(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    sceneSky(ctx, '#f0c89a', '#f6e2b8'); water(ctx, 540, t);
    for (const [x, s] of [[230, .8], [560, 1], [930, .85]]) { shape(ctx, '#8a7a52', 4, ellipse(x, 548, 150 * s, 26 * s)); hut(ctx, x, 540, s); }
    for (const [x, y] of [[360, 540], [760, 546], [1100, 548]]) { shape(ctx, '#a8865a', 3, ellipse(x, y + 4, 30, 9)); }                  // nests on the mud
    const wf = since(t, 'waterfowl') - .3;
    [[360, 520, 0], [760, 526, .25], [1100, 528, .5]].forEach(([x, y, d], i) => { const k = clamp((wf - d) / 1.2); if (wf - d <= 0) return;
      const sx = lerp(x + 500, x, ease.out(k)), sy = lerp(y - 300, y, ease.out(k)); duck(ctx, sx, sy, .9, t * 18 + i, k < 1); });
    ctx.restore();
    const q = since(t, 'quote'); if (q > 0) { const s = slam(q); ctx.save(); ctx.translate(640, 230); ctx.scale(s, s); ctx.rotate(-.015);
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-440 + 8, -110 + 10, 880, 220); shape(ctx, '#f1e6c8', 4, rect(-440, -110, 880, 220, 3));
      txt(ctx, '“…after the manner', 0, -42, `italic 700 46px Georgia, serif`); txt(ctx, 'of water-fowl.”', 0, 14, `italic 700 46px Georgia, serif`);
      txt(ctx, 'CASSIODORUS, VARIAE 12.24 · TRANS. T. HODGKIN, 1886', 0, 74, FX.FONT(700, 16), '#7a2a24'); ctx.restore(); }
    FX.vignette(ctx, 640, 380, .4);
  }

  // ---------- s14: so there are already people here ----------
  function s14(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 420);
    sceneSky(ctx, '#d8a070', '#f4d49a'); glow(ctx, 900, 420, 400, 'rgba(255,220,150,.4)'); water(ctx, 500, t);
    const isl = [[180, 520, .55], [430, 540, .7], [700, 516, .5], [960, 536, .65], [1180, 520, .5]];
    for (const [x, y, s] of isl) { shape(ctx, '#8a7a52', 4, ellipse(x, y + 8, 170 * s, 28 * s)); hut(ctx, x, y, s); }
    for (const [x, ph] of [[430, 0], [960, 2]]) for (let i = 0; i < 3; i++) { const k = ((t * .4 + i / 3 + ph) % 1); ctx.save(); ctx.globalAlpha = .4 * (1 - k); shape(ctx, '#efe6d0', 0, circle(x + 10 + Math.sin(k * 5) * 10, 430 - k * 160, 10 + k * 18)); ctx.restore(); }
    boat(ctx, 300 + lt * 22, 600, .7); fig(ctx, 300 + lt * 22, 586, .16, P('fisher', 'tunicPoor', { hands: { L: [-80, -900], R: [180, -500] }, face: { look: [.4, 0] } }));
    boat(ctx, 1000 - lt * 16, 640, .6); fig(ctx, 990 - lt * 16, 628, .15, P('elder', 'tunicElder', { hands: { L: [-160, -700], R: [120, -470] }, face: { look: [-.4, 0] } }), { mirror: true });
    fig(ctx, 700, 516, .14, P('villagerW', 'dressPlain', { hands: { L: [-120, -470], R: [180, -1000] }, face: { mouth: 'smile', look: [-.3, 0] } }));
    ctx.restore();
    const h = since(t, 'here'); if (h > 0) { const y = 330 - FX.dropBounce(h, 260, .3); ctx.save(); ctx.translate(640, y); shape(ctx, RED, 4, c => { c.moveTo(0, 0); c.bezierCurveTo(-34, -40, -30, -80, 0, -80); c.bezierCurveTo(30, -80, 34, -40, 0, 0); }); shape(ctx, '#fff', 3, circle(0, -54, 11)); ctx.restore(); }
    strip(ctx, 'PEOPLE ALREADY LIVE HERE', 640, 120, since(t, 'already') - .1, { px: 40 });
    FX.vignette(ctx, 640, 380, .4);
    FX.dateTag(ctx, 'THE LAGOON, c. AD 537');
  }

  // ---------- s15–s16: the mainland gets worse; 568, the Lombards cross the Alps ----------
  function storm(ctx, k, t) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = .55 * k;
    shape(ctx, '#2a2a34', 0, c => { c.moveTo(0, 0); c.lineTo(1100, 0); c.lineTo(1100, 150); c.lineTo(840, 300); c.lineTo(700, 330); c.lineTo(600, 330); c.lineTo(500, 450); c.lineTo(420, 600); c.lineTo(0, 600); c.closePath(); }); ctx.restore();
    for (let i = 0; i < 4; i++) { const x = 120 + i * 220 + Math.sin(t * .5 + i) * 10, y = 170 + (i % 2) * 90; ctx.save(); ctx.globalAlpha = k; shape(ctx, '#8a8a9c', 3.5, smooth([[x - 70, y], [x - 40, y - 34], [x + 10, y - 44], [x + 60, y - 26], [x + 74, y + 4], [x, y + 14]])); ctx.restore(); } }
  function s15(ctx, lt, dur, t) { italyMap(ctx, lt, dur, t, { townK: () => 1, tag: 'THE MAINLAND, 500s', over: c => storm(c, clamp((since(t, 'mainland') + .2) / 1.4), t) }); }
  function s16(ctx, lt, dur, t) {
    italyMap(ctx, lt, dur, t, { townK: () => 1, tag: 'AD 568', over: c => { storm(c, 1, t);
      const lk = since(t, 'lombard'); if (lk > 0) { card(c, [['LOMBARDS', FX.DISPLAY(30)]], 330, 60, lk, 230); }
      const cr = since(t, 'crosses'); if (cr > 0) { const k = ease.inOut(clamp(cr / 1.1)), pts = [[520, -20], [540, 120], [560, 220], [520, 330], [450, 390]], n = Math.max(2, Math.ceil(pts.length * k));
        const pp = pts.slice(0, n); const last = pp[pp.length - 1], prev = pp[pp.length - 2], ang = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
        line(c, pp, 16, '#2a2420'); line(c, pp, 9, '#7a3a2a'); c.save(); c.translate(...last); c.rotate(ang); shape(c, '#7a3a2a', 4, poly([[24, 0], [-12, -22], [-12, 22]])); c.restore(); } } });
  }

  // ---------- s17: the Roman towns fall one after another; whole communities move into the marsh ----------
  function romanTown(ctx, x, y, s, t, fire) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#e9dcc0', 4.5, rect(-110, -150, 220, 150)); shape(ctx, '#c2553e', 4.5, poly([[-130, -148], [0, -220], [130, -148]])); for (const xx of [-80, -40, 0, 40, 80]) line(ctx, [[xx, -140], [xx, -6]], 6, '#cbbd9e');
    ctx.restore(); flames(ctx, x, y - 150 * s, s * 1.3, t, fire); }
  function s17(ctx, lt, dur, t) {
    const fx = T.keys(t, [[A.towns, 520], [A.whole, 620], [A.good + .6, 1500]]);
    ctx.save(); cam(ctx, 1, fx, 380);
    sceneSky(ctx, '#7a5a5a', '#e8a868'); glow(ctx, 400, 480, 600, 'rgba(255,120,40,.25)');
    shape(ctx, '#9a8a5a', 4, c => { c.moveTo(-400, 470); c.quadraticCurveTo(300, 420, 900, 470); c.quadraticCurveTo(1300, 500, 1340, 600); c.lineTo(1340, 1000); c.lineTo(-400, 1000); c.closePath(); });
    [[100, 'fall'], [330, 'one2'], [560, 'after'], [800, 'another']].forEach(([x, k]) => romanTown(ctx, x, 480, .8, t, since(t, k)));
    water(ctx, 600, t, 1300, 2400); for (let x = 1300; x < 2300; x += 46) { line(ctx, [[x, 600], [x - 8, 520 - (x % 3) * 14]], 4, '#6f7a3a'); }
    shape(ctx, '#8a6a44', 4, rect(1340, 586, 360, 16, 3)); for (let x = 1360; x < 1700; x += 60) line(ctx, [[x, 600], [x, 650]], 6, '#5a4026');
    shape(ctx, '#8a7a52', 4, ellipse(1840, 610, 170, 28)); hut(ctx, 1840, 604, .9);
    // the Lombards march in behind the burning towns
    for (let i = 0; i < 4; i++) warrior(ctx, -260 + i * 110 + lt * 60, 560 - (i % 2) * 10, .2, t * 6 + i);
    // a family walks out toward the marsh and onto the walkway
    [['elder', 'tunicElder', 0], ['villagerW', 'dressPlain', -110], ['fisher', 'tunicPoor', -220]].forEach(([h, o, dx], i) => {
      const x = 900 + dx + lt * 140, onWalk = x > 1340, y = onWalk ? 586 : 560 + (x - 900) * .02;
      if (x > 1760) return;
      fig(ctx, Math.min(x, 1760), y, .2, P(h, o, Object.assign(walk(t * 6 + i * 1.3), { face: { brows: 'worried', mouth: 'flat', look: [.6, 0] }, lean: .05 })));
      if (h === 'elder') { shape(ctx, '#c9b48a', 3.5, ellipse(Math.min(x, 1760) - 34, y - 150, 26, 20)); } });
    ctx.restore();
    FX.caption(ctx, t < A.whole ? 'THE OLD ROMAN TOWNS FALL' : 'WHOLE COMMUNITIES MOVE INTO THE MARSH', t < A.whole ? lt : since(t, 'whole'), .3);
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, 'AFTER 568');
  }

  // ---------- s18: why a marsh? because of what it does to an army ----------
  function s18(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 420);
    sceneSky(ctx, '#a8b8c0', '#e8d6a8');
    shape(ctx, '#9a8a5a', 4, c => { c.moveTo(-200, 520); c.lineTo(480, 520); c.quadraticCurveTo(520, 560, 540, 1000); c.lineTo(-200, 1000); c.closePath(); });
    const bc = since(t, 'because'), x = bc > 0 ? Math.min(250 + bc * 230, 690) : 250, sink = clamp((x - 520) / 170) * 150;
    const struggle = sink > 0 ? Math.sin(t * 7) * .08 : 0;
    warrior(ctx, x, 560 + sink, .26, bc > 0 && x < 690 ? t * 6 : 0, '#2a2420');
    shape(ctx, '#6e5a3a', 4.5, c => { c.moveTo(500, 560); for (let xx = 500; xx <= 1500; xx += 40) c.lineTo(xx, 560 + Math.sin(xx * .05) * 4); c.lineTo(1500, 1000); c.lineTo(500, 1000); c.closePath(); });
    for (const [px, py] of [[700, 600], [900, 640], [1100, 590], [800, 700]]) shape(ctx, '#8fb4bc', 3, ellipse(px, py, 60, 10));
    if (sink > 60) { const k = clamp((sink - 60) / 60); for (const d of [-1, 1]) shape(ctx, '#6e5a3a', 3, circle(x + d * (40 + 40 * k), 556 - 30 * Math.sin(Math.PI * k), 10)); }
    ctx.restore();
    strip(ctx, 'WHY A MARSH?', 640, 120, since(t, 'why'), { px: 52 });
    if (since(t, 'army1') > 0) FX.caption(ctx, 'ARMIES SINK IN THE MUD', since(t, 'army1'), .1);
    FX.vignette(ctx, 640, 380, .4);
  }

  // ---------- s19: [MAP] the lagoon, 810 — Pepin takes the outer islands; the arrow stalls at the shallows ----------
  const ML = [[0, 330], [120, 260], [260, 190], [420, 140], [600, 100], [800, 70], [1100, 40]];
  const LIDO = [[150, 600], [300, 520], [430, 440], [560, 370], [700, 300], [840, 230], [980, 160], [1100, 100]];
  const lidoY = x => { for (let i = 0; i < LIDO.length - 1; i++) if (x <= LIDO[i + 1][0]) return lerp(LIDO[i][1], LIDO[i + 1][1], (x - LIDO[i][0]) / (LIDO[i + 1][0] - LIDO[i][0])); return 100; };
  const PLACES = { chioggia: [270, 500], pellestrina: [470, 412], malamocco: [600, 340], rivo: [560, 230], torcello: [800, 130] };
  function lagoonMap(ctx, lt, dur, t, o) {
    FX.darkBg(ctx, '#2c2723');
    ctx.save(); const zz = o.zoom ? o.zoom(lt) : FX.push(lt, dur, 1, 1.06), fk = o.zoom ? clamp((zz - 1) / .6) : 0; cam(ctx, zz, lerp(640, 650, fk), lerp(380, 300, fk));
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(MX + 10, MY + 12, 1100, 600);
    ctx.save(); ctx.translate(MX, MY); shape(ctx, '#e8dcb8', 4, rect(0, 0, 1100, 600, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1100, 600); ctx.clip();
    shape(ctx, '#cfd9a6', 0, rect(0, 0, 1100, 600));
    shape(ctx, '#b9dde2', 0, c => { c.moveTo(...ML[0]); for (const p of ML) c.lineTo(...p); for (const p of [...LIDO].reverse()) c.lineTo(...p); c.closePath(); });
    shape(ctx, '#8fc0cc', 0, c => { c.moveTo(...LIDO[0]); for (const p of LIDO) c.lineTo(p[0] + 18, p[1] + 14); c.lineTo(1100, 600); c.closePath(); });
    line(ctx, ML, 4, '#6a8a5a');
    // mud flats (the shallows) and the deep channels between them
    const r = rng(21); for (let i = 0; i < 26; i++) { const x = 140 + r() * 900, y0 = ML.find(p => p[0] >= x) || ML[ML.length - 1], y = lerp(y0[1] + 30, lidoY(x) - 30, r()); if (Math.hypot(x - 560, y - 230) < 70) continue; shape(ctx, 'rgba(176,160,110,.55)', 0, ellipse(x, y, 30 + r() * 30, 9 + r() * 7, -.5)); }
    for (const ch of [[[395, 470], [430, 400], [500, 320], [545, 250]], [[640, 335], [600, 290], [570, 245]], [[815, 240], [740, 200], [640, 210], [580, 228]]]) line(ctx, ch, 7, '#6aa7bb');
    // the sandbar islands (lidi) with their inlets
    for (const [a, b] of [[150, 380], [410, 520], [545, 800], [830, 1100]]) { const pts = []; for (let x = a; x <= b; x += 20) pts.push([x + 9, lidoY(x) + 7]); line(ctx, pts, 16, '#d9c890'); line(ctx, pts, 3, 'rgba(29,26,23,.35)'); }
    // Rivo Alto: the cluster of islands in the middle
    for (const [dx, dy, rr] of [[0, 0, 16], [24, -10, 11], [-22, 8, 12], [8, 20, 10], [-6, -20, 9], [30, 14, 8]]) shape(ctx, '#a99a6a', 3, ellipse(PLACES.rivo[0] + dx, PLACES.rivo[1] + dy, rr * 1.4, rr * .9));
    shape(ctx, '#a99a6a', 3, ellipse(PLACES.torcello[0], PLACES.torcello[1], 20, 12));
    txt(ctx, 'MAINLAND', 180, 120, FX.FONT(700, 20), '#4a5a3a'); txt(ctx, 'ADRIATIC SEA', 880, 470, `italic 600 24px Georgia, serif`, '#2f5d6b');
    if (o.inner) o.inner(ctx);
    ctx.restore(); if (o.over) o.over(ctx); ctx.restore(); ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, o.tag || 'THE LAGOON, AD 810');
  }
  function flag(ctx, x, y, k, col = '#2f4f8a') { if (k <= 0) return; const s = FX.settle(clamp(k / .3)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, [[0, 0], [0, -46]], 4); shape(ctx, col, 3, poly([[0, -46], [30, -38], [0, -28]])); ctx.restore(); }
  function arrowPath(ctx, pts, k, col = '#2f4f8a') { if (k <= 0) return; const tot = []; let L = 0; for (let i = 1; i < pts.length; i++) { L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); tot.push(L); }
    const want = L * clamp(k), out = [pts[0]]; for (let i = 1; i < pts.length; i++) { if (tot[i - 1] <= want) out.push(pts[i]); else { const prevL = i > 1 ? tot[i - 2] : 0, f = (want - prevL) / (tot[i - 1] - prevL); out.push([lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]); break; } }
    if (out.length < 2) return; line(ctx, out, 18, '#1d1a17'); line(ctx, out, 11, col); const a = out[out.length - 1], b = out[out.length - 2], ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
    ctx.save(); ctx.translate(...a); ctx.rotate(ang); shape(ctx, col, 4, poly([[26, 0], [-12, -22], [-12, 22]])); ctx.restore(); }
  function s19(ctx, lt, dur, t) {
    const tk = since(t, 'take'), cap = since(t, 'captures'), th = since(t, 'then'), st = since(t, 'stops');
    lagoonMap(ctx, lt, dur, t, { tag: 'THE LAGOON, AD 810', inner: c => {
      arrowPath(c, [[60, 640], [200, 560], [330, 480], [470, 420], [590, 352]], tk / 1.4);
      [['chioggia', 0], ['pellestrina', .3], ['malamocco', .6]].forEach(([p, d]) => flag(c, PLACES[p][0], PLACES[p][1], cap - d));
      if (cap > .9) { c.globalAlpha = clamp((cap - .9) / .3); txt(c, 'OUTER ISLANDS TAKEN', 430, 560, FX.FONT(700, 18), '#2f4f8a'); c.globalAlpha = 1; }
      // the push toward the centre: it reaches the shallows and bounces back
      if (th > 0) { const k = st > 0 ? .55 - .12 * Math.exp(-st * 3) * Math.cos(st * 9) - .12 * (1 - Math.exp(-st * 3)) : .55 * ease.out(clamp(th / 1.1));
        arrowPath(c, [[592, 340], [585, 300], [572, 262]], k / .55 * .55 + 0, '#2f4f8a');
        if (st > 0) { const s = FX.settle(clamp(st / .3)); c.save(); c.translate(640, 290); c.scale(s, s); txt(c, 'THE SHALLOWS', 0, 0, FX.DISPLAY(22), '#7a2a24'); c.restore(); } }
      if (th > 0) { c.globalAlpha = clamp(th / .4); txt(c, 'RIVO ALTO', PLACES.rivo[0] - 10, PLACES.rivo[1] - 40, FX.FONT(700, 16)); c.globalAlpha = 1; } } });
    card(ctx, [['PEPIN', FX.DISPLAY(30)], ["CHARLEMAGNE'S SON", FX.FONT(600, 17)], ['KING OF ITALY', FX.FONT(600, 17)]], 1050, 200, since(t, 'charlemagne'), 300);
  }

  // ---------- s20: his army can't cross the shallows; he pulls back ----------
  function s20(ctx, lt, dur, t) {
    const mid = since(t, 'middle'), pl = since(t, 'pulls');
    const fx = T.keys(t, [[A.his, 560], [A.middle - .3, 600], [A.middle + .6, 760], [A.pulls + .2, 620]]);
    ctx.save(); cam(ctx, 1.02, fx, 380);
    sceneSky(ctx, '#a8b8c8', '#efdcb0');
    shape(ctx, '#b9dde2', 0, rect(-300, 420, 2000, 200)); for (const [x, s] of [[1050, 1], [1150, .7], [1240, .8]]) { shape(ctx, '#a99a6a', 3, ellipse(x, 430, 60 * s, 8)); hut(ctx, x, 428, .3 * s); }
    shape(ctx, '#8a7a52', 0, rect(-300, 470, 2000, 600));
    for (const [x, y, w] of [[300, 520, 120], [700, 560, 180], [1000, 500, 140], [520, 640, 160], [1200, 600, 200]]) shape(ctx, '#9fc4cc', 3, ellipse(x, y, w, 14));
    // the stuck boat and the soldiers pushing it
    const rock = since(t, 'shallows') > 0 ? Math.sin(since(t, 'shallows') * 6) * .04 * Math.exp(-since(t, 'shallows') * .8) : 0;
    boat(ctx, 640, 580, 1.4, rock);
    const stop = pl > .3;
    for (let i = 0; i < 3; i++) fig(ctx, 430 + i * 60, 610, .2, P('fisher', 'tunicPoor', { hands: { L: stop ? [-120, -470] : [200, -640], R: stop ? [120, -470] : [260, -700] }, lean: stop ? 0 : .25, feet: { L: [-120, -40], R: [40, -40] } }), { tint: '#26303c' });
    // Pepin on the shore, frustrated, then he turns and waves them back
    const turned = pl > .25, X = 220, Y = 640, S = .3;
    fig(ctx, X, Y, S, P('pepin', 'king', { hands: turned ? { L: [-150, -480], R: [260, -1000] } : { L: [-90, -620], R: [90, -620] }, handShape: turned ? {} : { L: 'fist', R: 'fist' },
      face: { brows: turned ? 'strain' : 'strain', mouth: turned ? 'o' : 'flat', look: turned ? [-.6, 0] : mid > 0 ? [.9, -.2] : [.6, .2], eyes: blink(t, A.his + 1.1) }, breathe: breathe(t) }), { mirror: turned });
    ctx.restore();
    FX.caption(ctx, pl > 0 ? 'HE PULLS BACK' : "HIS ARMY CAN'T CROSS THE SHALLOWS", pl > 0 ? pl : lt, .3);
    FX.vignette(ctx, 640, 380, .4);
    FX.dateTag(ctx, 'AD 810');
  }

  // ---------- s21: the details come from later Venetian writers — not exactly neutral; the outcome isn't in doubt ----------
  function s21(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.02, 1.08), 600, 400);
    scriptorium(ctx);
    const X = 420, Y = 690, S = .4, wr = Math.sin(t * 12) * 20, writing = t < A.outcome;
    fig(ctx, X, Y, S, chronicler({ hands: { L: [140, -700], R: [300 + (writing ? wr : 0), -720] }, handShape: { R: 'fist' }, lean: .06,
      face: { brows: since(t, 'neutral') > 0 ? 'smug' : 'calm', mouth: 'smile', look: since(t, 'neutral') > 0 && since(t, 'neutral') < 1.4 ? [-.2, 0] : [.7, .5], eyes: since(t, 'neutral') > .1 && since(t, 'neutral') < .5 ? .1 : blink(t, 90.4) }, breathe: breathe(t) }));
    // lectern with the open chronicle: a heroic Venetian and a very small Pepin
    const lx = 640, ly = 470; shape(ctx, '#6e4a2c', 5, poly([[lx - 50, 690], [lx + 50, 690], [lx + 20, ly + 40], [lx - 20, ly + 40]]));
    ctx.save(); ctx.translate(lx, ly); ctx.rotate(-.12); shape(ctx, '#8a2a24', 4.5, rect(-170, -100, 340, 160, 5)); shape(ctx, '#f4ecd6', 3.5, rect(-160, -94, 156, 148, 3)); shape(ctx, '#f4ecd6', 3.5, rect(4, -94, 156, 148, 3));
    for (let i = 0; i < 6; i++) line(ctx, [[-148, -74 + i * 20], [-20, -74 + i * 20]], 3, 'rgba(70,64,58,.45)');
    const dv = since(t, 'venetian'); if (dv > 0) { ctx.globalAlpha = clamp(dv / .4); shape(ctx, '#c9a14a', 3, circle(70, -50, 16)); line(ctx, [[70, -34], [70, 10]], 4); line(ctx, [[70, -20], [100, -44]], 4); line(ctx, [[100, -44], [110, -70]], 3, '#8a8a8a'); line(ctx, [[60, 10], [56, 36]], 4); line(ctx, [[80, 10], [86, 36]], 4); ctx.globalAlpha = 1; }
    const nt = since(t, 'neutral'); if (nt > 0) { ctx.globalAlpha = clamp(nt / .3); shape(ctx, '#f0c09a', 2.5, circle(130, 24, 7)); line(ctx, [[130, 31], [130, 42]], 2.5); for (const d of [-3, 3]) line(ctx, [[130 + d, 22], [130 + d, 30]], 1.5, '#3a7ab8'); ctx.globalAlpha = 1; }
    ctx.restore();
    if (writing) { const hx = X + (300 + wr) * S, hy = Y - 720 * S; line(ctx, [[hx, hy], [hx + 30, hy - 70]], 4, '#f4efe2'); }
    ctx.restore();
    card(ctx, [['LATER VENETIAN WRITERS', FX.FONT(700, 22)]], 980, 130, since(t, 'venetian') - .2, 390);
    FX.stamp(ctx, 'NEUTRAL?', 1000, 300, nt, { color: RED, size: 40, rot: .1 });
    FX.stamp(ctx, 'OUTCOME: FRANKS WITHDRAW', 1000, 500, since(t, 'doubt') - .1, { color: '#2f7a46', size: 34, rot: -.06 });
    FX.vignette(ctx, 640, 380, .45);
  }

  // ---------- s22: the lagoon has its first job — it's a wall ----------
  function s22(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2f4a6a'], [.6, '#9ab0b8'], [1, '#e8d6a8']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 420);
    const wl = since(t, 'wall2');
    // battlements rise out of the waves along the whole water line
    if (wl > 0) { const rise = FX.settle(clamp(wl / .45)) * 90; for (let x = -100; x < 1400; x += 120) { shape(ctx, '#b8ad96', 4.5, rect(x, 560 - rise, 80, rise + 20)); for (let y = 560 - rise + 26; y < 580; y += 26) line(ctx, [[x, y], [x + 80, y]], 2.5, 'rgba(29,26,23,.3)'); } }
    V.lagoon(ctx, 640, 610, 700, t, { look: wl > .3 ? [0, .1] : [0, -.2], eyes: blink(t, A.firstjob + .5), mouth: wl > .2 ? 'smile' : null, hat: (c, x, y) => V.hats.helmet(c, x, y) });
    const fj = since(t, 'firstjob'); if (fj > 0) { const s = FX.settle(clamp(fj / .3)); ctx.save(); ctx.translate(960, 360); ctx.scale(s, s); ctx.rotate(.06); line(ctx, [[0, 40], [0, 220]], 8, '#7a5434');
      FX.paperDoc(ctx, 0, 0, 230, 120, { lines: 0, draw: c => { txt(c, 'JOB #1', 0, -18, FX.DISPLAY(40)); txt(c, 'WALL', 0, 26, FX.DISPLAY(34), RED); } }); ctx.restore(); }
    ctx.restore();
    strip(ctx, "IT'S A WALL", 640, 110, wl, { px: 56, color: RED });
    FX.vignette(ctx, 640, 380, .4);
  }

  // ---------- s23: the leaders move the capital behind it, to Rivo Alto — the Rialto ----------
  function s23(ctx, lt, dur, t) {
    const mv = since(t, 'move'), cl = since(t, 'cluster'), rv = since(t, 'rivo'), ri = since(t, 'rialto'), bh = since(t, 'behind');
    lagoonMap(ctx, lt, dur, t, { tag: 'AD 810', zoom: l => T.keys(t, [[A.leaders, 1], [A.cluster, 1.15], [A.rivo + .5, 1.6]]), inner: c => {
      if (bh > 0) { c.save(); c.setLineDash([12, 9]); c.lineWidth = 5; c.strokeStyle = RED; c.beginPath(); c.ellipse(PLACES.rivo[0], PLACES.rivo[1] + 10, 150, 90, -.4, 0, Math.PI * 2 * ease.out(clamp(bh / .7))); c.stroke(); c.restore(); }
      const k = ease.inOut(clamp(mv / 1.4)), x = lerp(PLACES.malamocco[0], PLACES.rivo[0], k), y = lerp(PLACES.malamocco[1], PLACES.rivo[1], k) - Math.sin(Math.PI * k) * 40;
      c.save(); c.translate(x, y - 6); const pop = cl > 0 ? 1 + FX.ring(cl, .12, 2.5, 5) : 1; c.scale(pop, pop);
      shape(c, '#efe2c2', 3.5, rect(-20, -20, 40, 22)); shape(c, '#c2553e', 3.5, poly([[-26, -20], [0, -38], [26, -20]])); shape(c, GOLD, 3, poly([[-12, -38], [-12, -52], [-6, -44], [0, -54], [6, -44], [12, -52], [12, -38]])); c.restore();
      if (mv <= 0) txt(c, 'CAPITAL', PLACES.malamocco[0] + 40, PLACES.malamocco[1] + 34, FX.FONT(700, 15));
      if (cl > 0) for (const [dx, dy] of [[0, 0], [24, -10], [-22, 8], [8, 20]]) glow(c, PLACES.rivo[0] + dx, PLACES.rivo[1] + dy, 30, `rgba(255,230,140,${.5 * Math.exp(-cl)})`); },
      over: c => { if (rv > 0) { const s = slam(rv); c.save(); c.translate(PLACES.rivo[0] + 10, PLACES.rivo[1] + 62); c.scale(s * .62, s * .62);
        const name = ri > 0 ? 'RIALTO' : 'RIVO ALTO'; c.font = FX.DISPLAY(44); const w = c.measureText(name).width + 50; shape(c, PAPER, 4, rect(-w / 2, -34, w, 66, 3)); txt(c, name, 0, 2, FX.DISPLAY(44), ri > 0 ? RED : INK); c.restore(); } } });
    if (ri > 0) FX.caption(ctx, 'RIVO ALTO = TODAY\'S RIALTO', ri, .2);
  }

  const cut = [[0, s1], [2.15, s2], [4.95, s3], [8.2, s4], [13.55, s5], [17.25, s6], [24.2, s7], [26.7, s8], [33.4, s9], [38.6, s10], [45.7, s11], [48.5, s12], [51.0, s13],
    [55.7, s14], [58.1, s15], [60.7, s16], [64.6, s17], [71.0, s18], [74.9, s19], [83.5, s20], [88.35, s21], [95.1, s22], [98.6, s23]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: A.job + .05, type: 'paper', gain: .7 }, { t: A.wall, type: 'paper', gain: .5 }, { t: A.wall + .38, type: 'clang', gain: .35 },
    ...[0, 1, 2, 3].map(i => ({ t: A.start + .12 + i * .26, type: 'click', gain: .25 })), { t: A.anyone, type: 'scratch', gain: .4 }, { t: A.outhere, type: 'thud', gain: .45 },
    { t: A.tells + .05, type: 'paper', gain: .7 }, { t: A.tidy, type: 'thud', gain: .3 }, { t: A.tidy + .26, type: 'thud', gain: .3 },
    { t: A.march, type: 'paper', gain: .6 }, { t: A.four, type: 'thud', gain: .55 }, { t: A.founded + .5, type: 'thud', gain: .8 },
    { t: A.noon2, type: 'ratchet', gain: .4 }, { t: A.noon2 + .05, type: 'clang', gain: .45 }, { t: A.exactly, type: 'click', gain: .5 }, { t: A.story2, type: 'thud', gain: .9 },
    { t: A.chronicles, type: 'thud', gain: .5 }, { t: A.more, type: 'slide', gain: .5 }, { t: A.later, type: 'paper', gain: .5 }, { t: A.church, type: 'swell', gain: .3 }, { t: A.built, type: 'slide', gain: .5 },
    { t: A.real, type: 'whoosh', gain: .4 }, { t: A.letter, type: 'click', gain: .6 }, { t: A.writes, type: 'scratch', gain: .4 }, { t: A.cass, type: 'slide', gain: .4 }, { t: A.lagoon1, type: 'paper', gain: .6 },
    { t: A.wine + .3, type: 'thud', gain: .5 }, { t: A.oil + .3, type: 'thud', gain: .5 }, { t: A.describes, type: 'paper', gain: .4 },
    { t: A.woven, type: 'scratch', gain: .4 }, { t: A.boats, type: 'splash', gain: .3 }, { t: A.tied + .1, type: 'creak', gain: .5 }, { t: A.animals, type: 'creak', gain: .4 },
    { t: A.same + .1, type: 'whoosh', gain: .3 }, { t: A.fish, type: 'click', gain: .5 }, { t: A.one, type: 'thud', gain: .4 }, { t: A.salt + .3, type: 'thud', gain: .7 },
    { t: A.quote, type: 'thud', gain: .7 }, { t: A.waterfowl, type: 'splash', gain: .3 }, { t: A.here + .3, type: 'thud', gain: .5 },
    { t: A.mainland, type: 'wind', gain: .4 }, { t: A.lombard, type: 'slide', gain: .4 }, { t: A.crosses, type: 'boom', gain: .5 },
    { t: A.fall, type: 'whoosh', gain: .4 }, { t: A.one2, type: 'whoosh', gain: .4 }, { t: A.after, type: 'whoosh', gain: .4 }, { t: A.another, type: 'whoosh', gain: .4 },
    { t: A.why, type: 'paper', gain: .6 }, { t: A.army1 - .4, type: 'splash', gain: .5 },
    { t: A.take, type: 'slide', gain: .4 }, { t: A.captures, type: 'click', gain: .4 }, { t: A.captures + .3, type: 'click', gain: .4 }, { t: A.captures + .6, type: 'click', gain: .4 },
    { t: A.stops, type: 'thud', gain: .7 }, { t: A.shallows, type: 'creak', gain: .5 }, { t: A.pulls + .25, type: 'whoosh', gain: .3 },
    { t: A.details, type: 'scratch', gain: .4 }, { t: A.neutral, type: 'thud', gain: .5 }, { t: A.doubt - .1, type: 'thud', gain: .7 },
    { t: A.firstjob, type: 'thud', gain: .5 }, { t: A.wall2, type: 'boom', gain: .6 }, { t: A.move, type: 'slide', gain: .4 }, { t: A.cluster, type: 'swell', gain: .3 }, { t: A.rivo, type: 'paper', gain: .6 }, { t: A.rialto, type: 'paper', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: 58.1, mood: 'tense' }, { t: 71.0, mood: 'mystery' }, { t: 74.9, mood: 'tense' }, { t: 88.35, mood: 'still' }];
  G.Show = {
    duration: A.end, narration: 'venice/assets/audio/narration-job-one.mp3', shots, sfx, moods,
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
