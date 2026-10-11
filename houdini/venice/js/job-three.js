/* Venice — "Job three: a highway" (narration-jobthree.mp3 = 2.0 s chapter pause + narration-full.mp3 252.2–347.4 s).
 * Anchors = full-recording word times − 250.2. New set types: sea chart, portolan map, Constantinople harbour,
 * throne room, customs boom, charter, Canaletto painting, assembly line, myth-bust crowd, banquet race, sea highway. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { sonow: 252.37, farmland: 253.91, pasture: 255.04, quarry: 256.24, goodfor: 258.97, boat: 260.43, salt: 261.96, rivers: 262.84, notice: 264.52,
    top: 266.52, adriatic: 267.26, farthest: 268.27, europe: 270.59, otherend: 271.63, constantinople: 273.27, capital: 274.58, pepper: 276.89, silk: 277.49,
    asia: 278.07, ashore: 278.58, europewants: 279.67, east: 280.85, between: 283.26, eighties: 284.81, deal: 285.89, emperor: 288.28, invaded: 289.11, navy: 290.17,
    venicehas: 291.16, one: 292.01, inreturn: 292.88, trade: 294.97, without: 296.31, taxes: 297.67, historians: 298.81, y1082: 301.22, y1092: 302.5,
    nobody: 304.0, did: 305.55, keep: 306.45, shipyard: 309.18, arsenal: 310.23, hull: 311.46, stages: 312.7, frame: 313.75, planking: 314.58, rigging: 315.48,
    oars: 316.37, centuries: 317.47, detroit: 318.55, sixteen: 320.6, people: 321.86, davis: 324.64, records: 326.38, s1600: 327.05, three: 329.08,
    biggest: 331.68, factory: 332.14, y1574: 334.3, story: 335.74, workers: 336.9, galley: 338.26, king: 339.31, banquet: 340.97,
    same: 342.05, newjob: 343.23, highway: 344.51, owns: 346.29, trucks: 346.64 };
  const A = {}; for (const k in F) A[k] = F[k] - 250.2; A.end = 98.7;
  const since = (t, k) => t - A[k];
  const blink = (t, ...ts) => 1 - G.Rig.blinkAt(t, ts);
  const breathe = t => (Math.sin(t * 1.6) + 1) / 2;
  const slam = (k, d = .09) => k <= 0 ? 0 : k < d ? lerp(1.3, 1, ease.in(k / d)) : 1 + FX.ring(k - d, -.02, 4, 14);
  const pop = (k, d = .3) => k <= 0 ? 0 : FX.settle(clamp(k / d));
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  const vig = (ctx, a = .4) => FX.vignette(ctx, 640, 380, a * .3);
  const P = (head, outfit, o) => Object.assign({ head, outfit, hands: { L: [-120, -470], R: [120, -470] }, feet: { L: [-60, -40], R: [60, -40] } }, o);
  function strip(ctx, text, x, y, k, o = {}) { if (k <= 0) return; const e = FX.settle(clamp(k / .35));
    ctx.save(); ctx.translate(x, lerp(y - 140, y, e)); ctx.rotate(o.rot ?? -.02); const px = o.px || 44; ctx.font = FX.DISPLAY(px); const w = ctx.measureText(text).width + px * 1.2, h = px * 1.55;
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, o.fill || PAPER, 4, rect(-w / 2, -h / 2, w, h, 3)); txt(ctx, text, 0, px * .06, FX.DISPLAY(px), o.color || INK); ctx.restore(); }
  function tag(ctx, s, x, y, k, px = 24) { if (k <= 0) return; const e = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); ctx.font = FX.DISPLAY(px); const w = ctx.measureText(s).width + 28; shape(ctx, PAPER, 3.5, rect(-w / 2, -px * .9, w, px * 1.8, 3)); txt(ctx, s, 0, 2, FX.DISPLAY(px)); ctx.restore(); }
  function sparkle(ctx, x, y, k, s = 1) { if (k <= 0 || k > 1) return; const r = 26 * s * Math.sin(Math.PI * k); ctx.save(); ctx.translate(x, y); ctx.rotate(k * 1.2); shape(ctx, '#fff6c8', 3, poly([[0, -r], [r * .25, -r * .25], [r, 0], [r * .25, r * .25], [0, r], [-r * .25, r * .25], [-r, 0], [-r * .25, -r * .25]])); ctx.restore(); }
  function clouds(ctx, t, ys = [110, 160], a = .9) { for (let i = 0; i < 6; i++) { const x = ((i * 290 + t * (8 + i * 2)) % 1900) - 300, y = ys[i % ys.length] + (i % 3) * 28, w = 120 + (i % 3) * 50;
    ctx.save(); ctx.globalAlpha = a; shape(ctx, '#fff8ee', 3, smooth([[x - w / 2, y], [x - w / 4, y - w * .22], [x + w / 8, y - w * .3], [x + w / 2, y - w * .1], [x + w / 2 + 10, y + 6], [x, y + 12]])); ctx.restore(); } }
  function birds(ctx, t, n = 4, y0 = 150) { for (let i = 0; i < n; i++) { const x = ((i * 230 + t * 40) % 1700) - 200, y = y0 + Math.sin(t * .8 + i) * 20 + i * 18, f = Math.sin(t * 8 + i * 2) * 8; line(ctx, [[x - 14, y - f], [x, y], [x + 14, y - f]], 3, '#3a3a40'); } }
  function reedsFG(ctx, t) { T.blurred(ctx, 2.5, () => { for (const sd of [-1, 1]) for (let i = 0; i < (sd > 0 ? 3 : 8); i++) { const x0 = sd < 0 ? -20 + i * 18 : W + 20 - i * 18, h = 150 + (i * 37) % 120, sw = Math.sin(t * 1.3 + i) * 8;
    line(ctx, [[x0, 740], [x0 + sw * .5 + sd * -6, 720 - h * .6], [x0 + sw + sd * -14, 720 - h]], 9, i % 2 ? '#5a6a2a' : '#6f7f34'); if (i % 3 === 0) shape(ctx, '#7a5a34', 2, ellipse(x0 + sw + sd * -14, 720 - h - 14, 7, 22)); } }); }
  const sky = (ctx, t, top = '#8fd0ec', bot = '#fbe8c0') => { shape(ctx, grad(ctx, 0, -300, 0, H, [[0, top], [1, bot]]), 0, rect(-600, -400, 2600, 1500)); glow(ctx, 1000, 150, 440, 'rgba(255,240,200,.55)'); clouds(ctx, t); birds(ctx, t, 3, 140); };
  const waterBand = (ctx, y, t, x0 = -600, x1 = 2200, col = V.WATER) => shape(ctx, col, 4, c => { c.moveTo(x0, y); for (let x = x0; x <= x1; x += 40) c.lineTo(x, y + Math.sin(x * .02 + t * 1.5) * 5); c.lineTo(x1, 1400); c.lineTo(x0, 1400); c.closePath(); });
  function farShore(ctx, y, t) { T.blurred(ctx, 1.2, () => { shape(ctx, '#a9c3a8', 0, c => { c.moveTo(-600, y); for (let x = -600; x <= 2200; x += 120) c.quadraticCurveTo(x + 60, y - 36 - ((x * 13) % 30), x + 120, y); c.lineTo(2200, y + 40); c.lineTo(-600, y + 40); c.closePath(); }); });
    ctx.save(); ctx.globalAlpha = .25; shape(ctx, '#f6f1e2', 0, rect(-600, y - 100, 2800, 140)); ctx.restore(); }
  function log(ctx, x, y, len, r, rot = 0, col = '#a8784a', bark = '#7a5434') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    shape(ctx, col, 4, rect(-len / 2, -r, len, r * 2, r * .3)); for (let i = 0; i < 4; i++) line(ctx, [[-len / 2 + 20 + i * len / 4, -r * .6], [-len / 2 + 60 + i * len / 4, -r * .5]], 2.5, bark);
    shape(ctx, '#e0b884', 4, ellipse(len / 2, 0, r * .45, r)); for (const k of [.3, .6]) shape(ctx, null, 2, ellipse(len / 2, 0, r * .45 * k, r * k)); ctx.restore(); }

  function deskBg(ctx, t) { // warm, well-lit writing desk that every map and document sits on
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    shape(ctx, '#b5835a', 0, rect(0, 0, W, H));
    for (let y = -20; y < H; y += 64) { shape(ctx, y % 128 ? '#bd8b61' : '#ad7b52', 0, rect(0, y, W, 62)); line(ctx, [[0, y + 62], [W, y + 62]], 2, 'rgba(70,40,20,.35)');
      for (let x = (y * 7) % 300; x < W; x += 300) { ctx.save(); ctx.globalAlpha = .18; line(ctx, [[x, y + 20], [x + 120, y + 26], [x + 200, y + 18]], 2, '#6a4026'); ctx.restore(); } }
    glow(ctx, 640, 330, 700, 'rgba(255,236,190,.35)');
    // props around the edges: scroll, inkwell + quill, coins, magnifier, candle
    shape(ctx, '#efe2c0', 4, rect(-40, 600, 260, 60, 28)); shape(ctx, '#d9c8a0', 4, ellipse(220, 630, 18, 30));
    shape(ctx, '#2a2a3a', 4, rect(1150, 560, 70, 70, 10)); shape(ctx, '#3a3a4e', 4, ellipse(1185, 560, 35, 10)); line(ctx, [[1185, 560], [1250, 420]], 5, '#3a2a1a'); shape(ctx, '#f4efe2', 3, smooth([[1238, 450], [1262, 400], [1250, 396], [1232, 440]]));
    for (const [x, y] of [[1090, 680], [1118, 668], [1104, 700]]) { shape(ctx, '#e8c14a', 3.5, ellipse(x, y, 20, 12)); shape(ctx, '#d0a838', 0, ellipse(x, y - 2, 12, 6)); }
    shape(ctx, null, 7, circle(70, 90, 44)); line(ctx, [[100, 122], [150, 180]], 12, '#6e4a2c'); ctx.save(); ctx.globalAlpha = .25; shape(ctx, '#cfe8f0', 0, circle(70, 90, 40)); ctx.restore();
    shape(ctx, '#efe6d0', 4, rect(1190, 70, 40, 90, 4)); const fl = 1 + Math.sin(t * 11) * .06; glow(ctx, 1210, 50, 160 * fl, 'rgba(255,200,120,.45)'); shape(ctx, '#ffd27a', 3, smooth([[1210, 70], [1201, 52], [1210, 26], [1219, 52]]));
    ctx.restore();
  }
  // ---------- shared props for this part ----------
  function galley(ctx, x, y, s, stage = 4, t = 0, o = {}) { // stage 1 frame · 2 planked · 3 rigged · 4 oars (full)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const hull = c => { c.moveTo(-230, -40); c.lineTo(200, -40); c.quadraticCurveTo(250, -44, 270, -70); c.quadraticCurveTo(250, 6, 180, 14); c.lineTo(-190, 14); c.quadraticCurveTo(-240, 4, -250, -50); c.closePath(); };
    if (stage >= 4) for (let i = 0; i < 12; i++) { const ox = -170 + i * 30, sw = Math.sin(t * 3 + i * .3) * 10; line(ctx, [[ox, -20], [ox - 30 + sw, 40]], 4, '#7a5434'); }
    if (stage <= 1) { for (let i = 0; i < 14; i++) { const ox = -210 + i * 32; line(ctx, [[ox, 12], [ox - 6, -40]], 6, '#a8784a'); } line(ctx, [[-240, 12], [190, 12]], 8, '#8a6034'); line(ctx, [[-230, -40], [210, -40]], 5, '#a8784a'); }
    else { shape(ctx, o.hull || '#9a6a3e', 4.5, hull); for (let i = 0; i < 3; i++) line(ctx, [[-230, -28 + i * 13], [220, -28 + i * 13]], 2, 'rgba(29,26,23,.3)'); shape(ctx, o.trim || '#c8a14a', 3, rect(-230, -46, 440, 8)); }
    if (stage >= 3) { line(ctx, [[0, -40], [0, -230]], 7, '#6e4a2c'); line(ctx, [[-120, -60], [110, -250]], 5, '#6e4a2c');
      if (o.sail !== false) shape(ctx, o.sailCol || '#f4ecd6', 4, c => { c.moveTo(-110, -70); c.quadraticCurveTo(10, -120, 104, -244); c.quadraticCurveTo(20, -170, -110, -70); c.closePath(); });
      line(ctx, [[0, -230], [-230, -44]], 2, '#5a4026'); line(ctx, [[0, -230], [200, -44]], 2, '#5a4026');
      if (o.flag) shape(ctx, o.flag, 3, poly([[0, -230], [44, -222], [0, -208]])); }
    ctx.restore(); }
  function coin(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(.15, Math.abs(Math.cos(rot))) * s, s); shape(ctx, '#e8c14a', 3.5, circle(0, 0, 16)); shape(ctx, '#d0a838', 0, circle(0, 0, 10)); ctx.restore(); }
  function sack(ctx, x, y, s, col = '#c8a878', label) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, smooth([[-34, 0], [-38, -50], [-22, -70], [0, -64], [22, -70], [38, -50], [34, 0]])); line(ctx, [[-14, -62], [14, -62]], 4, '#7a5434'); if (label) txt(ctx, label, 0, -30, FX.DISPLAY(14), '#5a4026'); ctx.restore(); }
  function silk(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, rect(-40, -22, 80, 44, 20)); shape(ctx, 'rgba(255,255,255,.35)', 0, rect(-30, -16, 60, 8, 4)); shape(ctx, col, 3.5, ellipse(40, 0, 10, 22)); ctx.restore(); }
  function camel(ctx, x, y, s, t, ph) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const st = Math.sin(t * 5 + ph) * 8;
    for (const [lx, d] of [[-30, 1], [-14, -1], [24, 1], [40, -1]]) line(ctx, [[lx, -60], [lx + d * st * .4, 0]], 7, '#b88a52');
    shape(ctx, '#c89a62', 4, smooth([[-50, -60], [-40, -96], [-14, -100], [0, -120], [20, -100], [40, -70], [44, -56], [0, -50]])); shape(ctx, '#c89a62', 4, smooth([[40, -70], [60, -110], [78, -116], [84, -104], [66, -96], [56, -62]]));
    sack(ctx, -6, -84, .5, '#a8402a'); ctx.restore(); }
  function hagiaSophia(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#e8b8a0', 4.5, rect(-200, -120, 400, 120)); for (const d of [-1, 1]) shape(ctx, '#d8a088', 4, c => { c.moveTo(d * 60, -120); c.arc(d * 110, -120, 50, Math.PI, 0); c.closePath(); });
    shape(ctx, '#e0a890', 4.5, rect(-80, -200, 160, 80)); shape(ctx, '#9fb2b8', 4.5, c => { c.moveTo(-100, -200); c.bezierCurveTo(-100, -290, 100, -290, 100, -200); c.closePath(); });
    for (let i = 0; i < 9; i++) shape(ctx, '#5a6a7a', 2, rect(-90 + i * 21, -214, 9, 12, 4)); line(ctx, [[0, -268], [0, -300]], 4); shape(ctx, GOLD, 3, circle(0, -304, 7));
    for (let i = 0; i < 5; i++) shape(ctx, '#5a6a7a', 3, rect(-170 + i * 80, -90, 26, 50, 12)); ctx.restore(); }
  function cypress(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#3a6a3a', 3.5, smooth([[0, -160], [18, -110], [20, -40], [10, 0], [-10, 0], [-20, -40], [-18, -110]])); ctx.restore(); }

  // ---------- e1: chapter card on a sea chart ----------
  function seaChart(ctx, t) { shape(ctx, '#efe0b8', 0, rect(-200, -200, 1700, 1100));
    ctx.save(); ctx.globalAlpha = .35; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2; line(ctx, [[320, 420], [320 + Math.cos(a) * 1600, 420 + Math.sin(a) * 1600]], i % 4 ? 1 : 2.5, i % 8 ? '#8a6a4a' : RED); } ctx.restore();
    ctx.save(); ctx.translate(320, 420); for (let i = 0; i < 8; i++) { ctx.save(); ctx.rotate(i * Math.PI / 4); shape(ctx, i % 2 ? '#e8c14a' : RED, 3, poly([[0, -110 + (i % 2) * 40], [14, 0], [0, 14], [-14, 0]])); ctx.restore(); } shape(ctx, PAPER, 3, circle(0, 0, 16)); txt(ctx, 'N', 0, -128, FX.DISPLAY(28), RED); ctx.restore();
    shape(ctx, '#d8c890', 4, smooth([[700, 120], [900, 90], [1100, 140], [1200, 260], [1100, 300], [900, 260], [760, 240]])); ctx.save(); ctx.globalAlpha = .6; for (let i = 0; i < 5; i++) line(ctx, [[720 + i * 20, 250 + i * 14], [1180 - i * 30, 280 + i * 10]], 1.5, '#5a7a8a'); ctx.restore(); }
  function e1(ctx, lt, dur, t) {
    seaChart(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420); V.lagoon(ctx, 760, 700, 520, t, { look: [-.6, -.4], eyes: blink(t, 1.4), mouth: 'smile', hat: (c, x, y) => V.hats.hardhat(c, x, y) }); ctx.restore();
    strip(ctx, 'JOB THREE', 640, 120, lt - .05, { px: 58 }); strip(ctx, 'A HIGHWAY', 640, 222, lt - .75, { px: 44, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- e2: no farmland, no pasture, no quarry — the one thing a lagoon is good for ----------
  function cramped(ctx, t) { const r = rng(14); let x = 180;
    while (x < 1110) { const w = 50 + r() * 50, h = 110 + r() * 150, col = ['#e8a87a', '#f0d29a', '#d88a6a', '#efe2c4', '#c8a0b8', '#e8c07a'][Math.floor(r() * 6)];
      shape(ctx, col, 4, rect(x, 520 - h, w, h)); shape(ctx, '#b8503a', 4, poly([[x - 4, 520 - h], [x + w / 2, 520 - h - 20], [x + w + 4, 520 - h]])); for (let k = 0; k < Math.floor(h / 46); k++) shape(ctx, '#5a6a7a', 2.5, rect(x + w / 2 - 8, 520 - h + 18 + k * 42, 16, 24, 7)); x += w + 2; } }
  function e2(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    sky(ctx, t); farShore(ctx, 500, t); waterBand(ctx, 520, t);
    shape(ctx, '#d8c8a8', 4, smooth([[150, 540], [300, 512], [980, 510], [1140, 540], [1000, 560], [300, 562]])); cramped(ctx, t);
    const gf = since(t, 'goodfor'); for (let i = 0; i < 4; i++) { const k = gf - i * .3; if (k <= 0) continue; const bx = lerp(-200, 140 + i * 300, ease.out(clamp(k / 1.4))); ctx.save(); ctx.translate(bx, 600 + Math.sin(t * 1.4 + i) * 3); shape(ctx, '#7a5434', 4, c => { c.moveTo(-70, -10); c.lineTo(70, -10); c.quadraticCurveTo(60, 10, 40, 12); c.lineTo(-40, 12); c.quadraticCurveTo(-60, 10, -70, -10); c.closePath(); }); ctx.restore(); }
    ctx.restore();
    // the three things a city normally needs — each crossed out on its word
    [['farmland', 270, 'field'], ['pasture', 640, 'cow'], ['quarry', 1010, 'stone']].forEach(([k, x, kind]) => { const d = since(t, k); if (d <= 0) return; const s = pop(d); ctx.save(); ctx.translate(x, 190); ctx.scale(s, s);
      shape(ctx, PAPER, 4.5, circle(0, 0, 86));
      if (kind === 'field') { for (let i = 0; i < 5; i++) { line(ctx, [[-40 + i * 20, 40], [-40 + i * 20, -20]], 4, '#a8882a'); shape(ctx, '#e8c14a', 2.5, ellipse(-40 + i * 20, -30, 7, 16)); } }
      else if (kind === 'cow') { shape(ctx, '#f4efe2', 3.5, ellipse(0, 4, 46, 26)); for (const [sx, sy] of [[-14, -2], [18, 10]]) shape(ctx, '#3a2a20', 0, ellipse(sx, sy, 10, 8)); shape(ctx, '#f4efe2', 3.5, ellipse(46, -14, 18, 14)); for (const lx of [-30, -12, 14, 32]) line(ctx, [[lx, 26], [lx, 50]], 5, '#3a2a20'); }
      else { for (const [bx, by, w] of [[-30, 20, 60], [20, 24, 50], [-6, -14, 56]]) shape(ctx, '#c8c0b0', 3.5, rect(bx - w / 2, by - 18, w, 36, 4)); }
      ctx.restore(); FX.stamp(ctx, 'NO ' + k.toUpperCase(), x, 190, d - .15, { color: RED, size: 30, rot: -.12 }); });
    if (gf > 0) FX.caption(ctx, 'THE ONE THING A LAGOON IS GOOD FOR', gf, .1);
    reedsFG(ctx, t); vig(ctx);
    FX.dateTag(ctx, 'VENICE, 900s');
  }

  // ---------- e3: you get in a boat — first, salt up the rivers ----------
  function e3(ctx, lt, dur, t) {
    const bx = 260 + lt * 46, scroll = lt * 40;
    ctx.save(); cam(ctx, 1.02, 640, 380);
    sky(ctx, t, '#86c8ea', '#f6ecc8');
    ctx.save(); ctx.translate(-scroll * .2, 0); shape(ctx, '#b8c8d0', 4, poly([[-200, 330], [200, 200], [500, 320], [900, 190], [1300, 330], [1700, 220], [1900, 400], [-200, 400]])); ctx.restore();
    ctx.save(); ctx.translate(-scroll * .5, 0); for (let i = 0; i < 18; i++) { const x = -100 + i * 110; shape(ctx, '#7aaa4a', 3.5, smooth([[x - 50, 420], [x - 56, 370], [x - 20, 340], [x + 20, 344], [x + 54, 372], [x + 48, 420]])); shape(ctx, '#7a5434', 3, rect(x - 6, 410, 12, 30)); }
      shape(ctx, '#e8d8b0', 4, rect(900, 330, 160, 110)); shape(ctx, '#b8503a', 4, poly([[890, 330], [980, 290], [1070, 330]])); shape(ctx, '#e8d8b0', 4, rect(1000, 270, 40, 170)); shape(ctx, '#b8503a', 4, poly([[994, 270], [1020, 240], [1046, 270]])); ctx.restore();
    shape(ctx, '#9ab868', 0, rect(-200, 430, 1700, 60));
    shape(ctx, '#6ab0c4', 4, c => { c.moveTo(-200, 480); c.quadraticCurveTo(640, 460, 1500, 490); c.lineTo(1500, 620); c.quadraticCurveTo(640, 600, -200, 620); c.closePath(); });
    for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .4; line(ctx, [[((i * 260 - scroll) % 1600) - 100, 540 + (i % 3) * 20], [((i * 260 - scroll) % 1600) - 40, 540 + (i % 3) * 20]], 4, '#e8f6f8'); ctx.restore(); }
    // the salt boat, poled upstream
    ctx.save(); ctx.translate(bx, 540 + Math.sin(t * 1.6) * 3); shape(ctx, '#7a5434', 4.5, c => { c.moveTo(-150, -14); c.lineTo(150, -14); c.quadraticCurveTo(140, 14, 100, 16); c.lineTo(-100, 16); c.quadraticCurveTo(-140, 14, -150, -14); c.closePath(); });
    for (let i = 0; i < 4; i++) sack(ctx, -60 + i * 40, -14, .55, '#f4f0e6', i === 1 ? 'SALT' : null); ctx.restore();
    const pole = Math.sin(t * 2.2); fig(ctx, bx + 110, 526, .2, P('fisher', 'tunicPoor', { hands: { L: [-60 + pole * 40, -900], R: [40 + pole * 40, -640] }, handShape: { L: 'fist', R: 'fist' }, lean: -.12, face: { look: [-.2, 0] } }), { mirror: true });
    line(ctx, [[bx + 110 - (-60 + pole * 40) * .2, 526 - 900 * .2], [bx + 90 + pole * 30, 620]], 5, '#6e4a2c');
    shape(ctx, '#8a9a52', 0, rect(-200, 615, 1700, 200));
    ctx.restore();
    strip(ctx, 'GET IN A BOAT', 640, 100, since(t, 'boat') + .2, { px: 40 });
    if (since(t, 'salt') > 0) FX.caption(ctx, 'FIRST: SALT, UP THE RIVERS', since(t, 'salt'), .1);
    reedsFG(ctx, t); vig(ctx);
    FX.dateTag(ctx, 'THE RIVERS OF NORTHERN ITALY');
  }

  // ---------- e4–e5: the top of the Adriatic; the sea lane to Constantinople (an old sea chart) ----------
  // coastline traced from real longitude/latitude (x = 100 + (lon + 6)·25.7, y = 140 + (46 − lat)·33.75)
  const LL = ([lon, lat]) => [100 + (lon + 6) * 25.7, 140 + (46 - lat) * 33.75];
  const MED = [[-5.6, 36], [-4.4, 36.7], [-1, 37.6], [-.4, 39.5], [.6, 40.6], [2.2, 41.4], [3.2, 42.2], [5.4, 43.3], [7.3, 43.7], [8.9, 44.4], [10.2, 43.9], [11, 42.6], [12.3, 41.7], [14.3, 40.8], [15.6, 40.1], [15.7, 38.2],
    [16.5, 38.6], [17.1, 39.4], [17.2, 40.5], [18.5, 40.1], [16.9, 41.1], [15.9, 41.9], [14.2, 42.5], [13.5, 43.6], [12.6, 44.1], [12.3, 45.4], [13.8, 45.6], [13.8, 44.9], [15.2, 44.2], [16.4, 43.5], [18.1, 42.6], [19.5, 41.3],
    [19.4, 40.3], [20.7, 39.3], [21.7, 38.3], [21.4, 37.3], [22.5, 36.4], [23.2, 36.6], [23, 37.8], [23.7, 38.0], [22.9, 40.6], [24.4, 40.9], [26.4, 40.6], [28.0, 41.0], [29.0, 41.1], [29.3, 40.8], [27.3, 40.3], [26.3, 40.0],
    [26.7, 39.3], [27.1, 38.4], [27.4, 37.0], [28.2, 36.7], [30.7, 36.9], [32.5, 36.1], [34.6, 36.8], [36, 36.6], [35.9, 35.3], [35.5, 33.9], [34.9, 32.6], [34.3, 31.4], [32.3, 31.3], [29.9, 31.2], [25, 31.6], [23.2, 32.2],
    [20, 32.1], [19.6, 30.6], [18, 30.5], [15.4, 31.7], [13.2, 32.9], [11, 33.4], [10.2, 36.8], [8.6, 36.9], [5.1, 36.8], [3.0, 36.8], [-.6, 35.7], [-2.9, 35.3], [-5.4, 35.9]].map(LL);
  const ADRI = [[12.3, 45.4], [13.8, 45.6], [13.8, 44.9], [15.2, 44.2], [16.4, 43.5], [18.1, 42.6], [19.5, 41.3], [18.5, 40.1], [16.9, 41.1], [15.9, 41.9], [14.2, 42.5], [13.5, 43.6], [12.6, 44.1]].map(LL);
  const BLACK = [[28.9, 41.25], [31, 41.2], [33.5, 42], [36, 41.7], [36.5, 43.5], [34, 44.8], [31, 46.2], [29.6, 45.2], [28.6, 44], [28, 42.6]].map(LL);
  const ISL = [[14, 37.5, 38, 16, .1], [9, 40, 13, 30, 0], [9.1, 42.1, 9, 17, 0], [24.9, 35.2, 40, 8, 0], [33, 35.1, 28, 9, -.15], [3, 39.6, 12, 6, 0]];
  const PL = { venice: LL([12.3, 45.3]), cpl: LL([29, 41.05]), alex: LL([29.9, 31.25]) };
  const LANE = [[12.3, 45.2], [13.5, 44], [16, 42.6], [18.6, 40.8], [19.6, 39.2], [20.9, 37.2], [22.5, 35.9], [24, 36.7], [25.2, 38.6], [26, 40.1], [27.6, 40.6], [29, 41.0]].map(LL);
  function portolan(ctx, t, o = {}) {
    shape(ctx, '#f0e2bc', 0, rect(-600, -600, 2500, 1900));
    ctx.save(); ctx.globalAlpha = .28; for (const [cx, cy] of [[300, 600], [980, 300]]) for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2; line(ctx, [[cx, cy], [cx + Math.cos(a) * 1400, cy + Math.sin(a) * 1400]], 1.2, i % 8 ? '#8a6a4a' : RED); } ctx.restore();
    shape(ctx, '#a8d4dc', 4.5, poly(MED)); if (o.adriatic > 0) { ctx.save(); ctx.globalAlpha = .6 * o.adriatic; shape(ctx, '#ffe9a0', 0, poly(ADRI)); ctx.restore(); }
    shape(ctx, '#a8d4dc', 4, poly(BLACK));
    for (const [lon, lat, rx, ry, a] of ISL) { const [x, y] = LL([lon, lat]); shape(ctx, '#e8dcb0', 3, ellipse(x, y, rx, ry, a)); }
    for (const [n, k, dx, dy] of [['VENICE', 'venice', -50, -18], ['CONSTANTINOPLE', 'cpl', 0, -26], ['ALEXANDRIA', 'alex', 0, 26]]) { shape(ctx, RED, 3, circle(PL[k][0], PL[k][1], 7)); txt(ctx, n, PL[k][0] + dx, PL[k][1] + dy, `italic 700 18px Georgia, serif`, '#4a2a1a'); }
    txt(ctx, 'MARE MEDITERRANEUM', 520, 560, `italic 600 22px Georgia, serif`, '#3a6a7a'); txt(ctx, 'EUROPE', 300, 200, FX.DISPLAY(30), '#8a6a4a'); txt(ctx, 'AFRICA', 400, 660, FX.DISPLAY(30), '#8a6a4a'); txt(ctx, 'ASIA', 1060, 320, FX.DISPLAY(30), '#8a6a4a');
    // a little compass rose and sea creature, as old charts have
    ctx.save(); ctx.translate(200, 560); for (let i = 0; i < 8; i++) { ctx.save(); ctx.rotate(i * Math.PI / 4); shape(ctx, i % 2 ? '#e8c14a' : RED, 2.5, poly([[0, -50 + (i % 2) * 18], [8, 0], [0, 8], [-8, 0]])); ctx.restore(); } ctx.restore();
    ctx.save(); ctx.translate(760, 560 + Math.sin(t * 1.2) * 4); shape(ctx, '#6a9aa8', 3, smooth([[-40, 0], [-20, -16], [20, -14], [40, -2], [56, -14], [52, 6], [20, 8], [-30, 8]])); ctx.restore();
  }
  function e4(ctx, lt, dur, t) {
    const z = T.keys(t, [[A.notice, 3.0], [A.top - .2, 3.0], [A.adriatic + .8, 1.08]]), fx = T.keys(t, [[A.top - .2, PL.venice[0]], [A.adriatic + .8, 640]]), fy = T.keys(t, [[A.top - .2, PL.venice[1] + 20], [A.adriatic + .8, 410]]);
    ctx.save(); cam(ctx, z, fx, fy); portolan(ctx, t, { adriatic: clamp(since(t, 'adriatic') / .5) });
    const fa = since(t, 'farthest'); if (fa > 0) { const k = pop(fa); ctx.save(); ctx.translate(PL.venice[0], PL.venice[1] - 70); ctx.scale(k, k); shape(ctx, RED, 4, poly([[0, 50], [-22, 14], [-8, 14], [-8, -40], [8, -40], [8, 14], [22, 14]])); ctx.restore(); }
    ctx.restore();
    if (since(t, 'top') > 0) strip(ctx, 'THE TOP OF THE ADRIATIC', 380, 600, since(t, 'top'), { px: 36 });
    if (fa > .3) FX.caption(ctx, 'THE FARTHEST NORTH THE MEDITERRANEAN REACHES INTO EUROPE', fa - .3, .1);
    vig(ctx);
    FX.dateTag(ctx, 'AN OLD SEA CHART');
  }
  function e5(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, lerp(1.1, 1.3, ease.inOut(clamp(lt / dur))), lerp(640, 720, ease.inOut(clamp(lt / dur))), lerp(410, 400, ease.inOut(clamp(lt / dur))));
    portolan(ctx, t, { adriatic: 1 });
    const k = ease.inOut(clamp((t - A.otherend + .2) / 1.4)), pts = [LANE[0]]; let L = 0; const seg = []; for (let i = 1; i < LANE.length; i++) { seg.push(Math.hypot(LANE[i][0] - LANE[i - 1][0], LANE[i][1] - LANE[i - 1][1])); }
    const tot = seg.reduce((a, b) => a + b, 0) * k; for (let i = 1; i < LANE.length; i++) { if (L + seg[i - 1] <= tot) { pts.push(LANE[i]); L += seg[i - 1]; } else { const f = (tot - L) / seg[i - 1]; pts.push([lerp(LANE[i - 1][0], LANE[i][0], f), lerp(LANE[i - 1][1], LANE[i][1], f)]); break; } }
    ctx.save(); ctx.setLineDash([12, 9]); line(ctx, pts, 6, RED); ctx.restore(); const hd = pts[pts.length - 1]; galley(ctx, hd[0], hd[1] - 6, .12, 4, t, { flag: RED });
    if (since(t, 'constantinople') > 0) { const s = pop(since(t, 'constantinople')); ctx.save(); ctx.translate(PL.cpl[0], PL.cpl[1]); ctx.scale(s, s); glow(ctx, 0, 0, 60, 'rgba(255,220,120,.6)'); shape(ctx, GOLD, 3, circle(0, 0, 12)); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'THE SEA LANE', 640, 100, since(t, 'otherend'), { px: 36 });
    vig(ctx);
    FX.dateTag(ctx, 'AN OLD SEA CHART');
  }

  // ---------- e6: Constantinople, where the pepper and silk of Asia come ashore ----------
  function e6(ctx, lt, dur, t) {
    const pp = since(t, 'pepper'), sk = since(t, 'silk'), as = since(t, 'asia');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    sky(ctx, t, '#8fd0ec', '#fde6b8');
    T.blurred(ctx, 1, () => { shape(ctx, '#c8b0a0', 0, rect(-200, 370, 1700, 60)); for (let i = 0; i < 16; i++) { const x = -100 + i * 100, h = 40 + (i * 37) % 60; shape(ctx, '#d8c0ac', 3, rect(x, 400 - h, 70, h)); } });
    hagiaSophia(ctx, 640, 420, 1); for (const x of [380, 900, 980]) cypress(ctx, x, 430, .8);
    shape(ctx, '#d8b890', 4.5, rect(-200, 420, 1700, 40)); for (let x = -180; x < 1500; x += 120) { shape(ctx, '#d8b890', 4, rect(x, 380, 50, 80)); for (let k = 0; k < 3; k++) shape(ctx, '#d8b890', 3, rect(x + k * 18, 368, 12, 14)); }
    shape(ctx, '#c8b8a0', 4, rect(-200, 460, 1700, 60));
    waterBand(ctx, 520, t, -600, 2200, '#4a98b0');
    galley(ctx, 260, 556, .7, 4, t, { flag: '#5a2a6a', sailCol: '#e8d8b0' }); galley(ctx, 1080, 566, .6, 3, t, { flag: '#5a2a6a' });
    // pepper sacks, silk bolts and a camel train arrive on the words
    if (pp > 0) for (let i = 0; i < 4; i++) { const h = FX.dropBounce(pp - i * .12, 300, .2); sack(ctx, 440 + i * 46, 500 - h, .8, '#6a4a3a', i === 1 ? 'PEPPER' : null); if (i === 0) for (let k = 0; k < 10; k++) shape(ctx, '#2a1e18', 0, circle(424 + (k * 17) % 160, 488 - (k * 7) % 30, 2)); }
    if (sk > 0) for (let i = 0; i < 3; i++) { const h = FX.dropBounce(sk - i * .12, 300, .2); silk(ctx, 700 + i * 76, 492 - h, .9, ['#d8402e', '#2f6aa8', '#e8c14a'][i]); }
    if (as > -.2) for (let i = 0; i < 3; i++) camel(ctx, FX.approach(t, A.asia - .2 + i * .25, 1500, 980 + i * 110, .4), 470, .7, t, i);
    ctx.restore();
    tag(ctx, 'CONSTANTINOPLE', 640, 110, lt - .1, 30);
    if (sk > 0) FX.caption(ctx, 'PEPPER AND SILK FROM ASIA COME ASHORE', pp, .1);
    vig(ctx);
    FX.dateTag(ctx, 'CAPITAL OF THE BYZANTINE EMPIRE');
  }

  // ---------- e7: Europe wants what the East sells — Venice in between ----------
  function e7(ctx, lt, dur, t) {
    const bt = since(t, 'between');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#a8d0e8'], [.5, '#fbecc6'], [1, '#f6c48a']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [90, 140]);
    // Europe (left): a castle town; the East (right): domes and minaret-free Byzantine skyline
    shape(ctx, '#9ab868', 0, rect(-200, 520, 700, 300)); shape(ctx, '#d8c8a8', 4, rect(40, 330, 220, 190)); for (let k = 0; k < 5; k++) shape(ctx, '#d8c8a8', 3, rect(40 + k * 46, 312, 28, 22)); shape(ctx, '#d8c8a8', 4, rect(90, 230, 70, 100)); shape(ctx, '#2f4f9a', 4, poly([[84, 230], [125, 180], [166, 230]]));
    shape(ctx, '#d8b890', 0, rect(780, 520, 700, 300)); ctx.save(); ctx.translate(-120, 100); hagiaSophia(ctx, 1150, 420, .7); ctx.restore(); cypress(ctx, 1220, 520, .7);
    shape(ctx, '#c8b8a0', 4, rect(-200, 560, 1700, 200));
    txt(ctx, 'EUROPE', 150, 160, FX.DISPLAY(40), '#2f4f6a'); txt(ctx, 'THE EAST', 1110, 160, FX.DISPLAY(40), '#8a3a1a');
    // buyer, merchant, seller
    fig(ctx, 220, 640, .3, P('villagerW', 'dressPlain', { hands: { L: [-120, -470], R: [200, -700] }, handShape: { R: 'fist' }, face: { brows: 'up', mouth: 'smile', look: [.7, 0], eyes: blink(t, 30.5) }, breathe: breathe(t) }));
    fig(ctx, 1060, 640, .3, P('elder', 'byzantine', { hands: { L: [-200, -700], R: [120, -470] }, face: { brows: 'calm', mouth: 'smile', look: [-.7, 0], eyes: blink(t, 31.7) }, breathe: breathe(t + 1) }));
    const sw = Math.sin(t * 2.2), X = 640, Y = 650;
    fig(ctx, X, Y, .34, P('merchant', 'merchantRobe', { hands: { L: [-260, -760 + sw * 30], R: [260, -760 - sw * 30] }, face: { brows: bt > 0 ? 'smug' : 'up', mouth: 'smile', look: [sw * .7, 0], eyes: blink(t, 32.2) }, breathe: breathe(t) }));
    // goods flow west, coins flow east, through his hands
    for (let i = 0; i < 4; i++) { const k = ((t * .45 + i / 4) % 1); silk(ctx, lerp(1000, 290, k), 400 - Math.sin(Math.PI * k) * 90, .6, ['#d8402e', '#2f6aa8', '#e8c14a', '#4a9a5a'][i]); coin(ctx, lerp(290, 1000, k), 470 - Math.sin(Math.PI * k) * 60, 1, t * 6 + i); }
    ctx.restore();
    if (bt > 0) tag(ctx, 'VENICE: THE ONE IN BETWEEN', 640, 110, bt, 28);
    vig(ctx);
  }

  // ---------- e8: the 1080s — the emperor is invaded, needs a navy; Venice has one ----------
  function e8(ctx, lt, dur, t) {
    const inv = since(t, 'invaded'), nv = since(t, 'navy'), vh = since(t, 'venicehas');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#e8c890', 0, rect(-200, -200, 1700, 1100)); const r = rng(6); for (let y = -200; y < 560; y += 18) for (let x = -200; x < 1500; x += 18) if (r() < .3) { ctx.fillStyle = 'rgba(232,193,74,.35)'; ctx.fillRect(x, y, 16, 16); }
    for (const x of [120, 1160]) { shape(ctx, '#7a3a8a', 4.5, rect(x - 34, 60, 68, 520)); shape(ctx, GOLD, 4, rect(x - 46, 40, 92, 28, 4)); }
    shape(ctx, '#7a2a3a', 0, rect(-200, 560, 1700, 300)); for (let x = -200; x < 1500; x += 80) shape(ctx, '#8a3a4a', 0, poly([[x, 560], [x + 40, 600], [x + 80, 560]]));
    // the map on the wall: the empire, with an invasion arrow from the west
    ctx.save(); ctx.translate(880, 250); shape(ctx, '#efe0b8', 4.5, rect(-170, -120, 340, 220, 4)); shape(ctx, '#a8d4dc', 3, smooth([[-150, 40], [-60, 0], [20, 30], [90, -10], [160, 30], [160, 90], [-150, 90]])); shape(ctx, '#c8a0d8', 3, smooth([[-20, -60], [80, -80], [150, -40], [140, 10], [40, 0], [-30, -20]]));
    if (inv > 0) { const k = ease.out(clamp(inv / .7)); line(ctx, [[-160, -60], [lerp(-160, -10, k), -30]], 12, RED); if (k > .9) shape(ctx, RED, 3, poly([[0, -28], [-22, -42], [-18, -14]])); }
    ctx.restore();
    // the throne, the worried emperor, the Venetian envoy
    shape(ctx, GOLD, 5, c => { c.moveTo(250, 600); c.lineTo(250, 300); c.quadraticCurveTo(340, 230, 430, 300); c.lineTo(430, 600); c.closePath(); }); shape(ctx, '#7a3a8a', 4, rect(270, 430, 140, 40, 6));
    fig(ctx, 340, 640, .32, P('emperor', 'byzantine', { hands: inv > 0 ? { L: [-60, -1000], R: [60, -1000] } : { L: [-140, -480], R: [140, -480] }, face: { brows: inv > 0 ? 'worried' : 'calm', mouth: inv > 0 ? 'o' : 'flat', look: vh > 0 ? [.8, 0] : [.5, -.3], eyes: blink(t, 37.0, 40.4) }, breathe: breathe(t) }));
    if (nv > 0) { const k = pop(nv); ctx.save(); ctx.translate(500, 170); ctx.scale(k, k); shape(ctx, '#fff', 4, ellipse(0, 0, 130, 70)); for (let i = 0; i < 3; i++) shape(ctx, '#fff', 3, circle(-110 + i * 14, 80 + i * 14, 9 - i * 2)); galley(ctx, 0, 30, .3, 4, t); txt(ctx, '?', 90, -30, FX.DISPLAY(40), RED); ctx.restore(); }
    if (vh > -.6) { const x = FX.approach(t, A.venicehas - .6, 1500, 760, .3); fig(ctx, x, 640, .32, P('merchant', 'merchantRobe', { hands: { L: [-260, -760], R: [120, -470] }, face: { brows: 'smug', mouth: 'smile', look: [-.8, 0] }, breathe: breathe(t) }), { mirror: true });
      if (vh > 0) { galley(ctx, x - 260 * .32 - 20, 640 - 760 * .32 - 30, .22, 4, t, { flag: RED }); } }
    ctx.restore();
    strip(ctx, 'THE DEAL OF A LIFETIME', 640, 100, since(t, 'deal'), { px: 36 });
    if (vh > 0) FX.caption(ctx, 'VENICE HAS A NAVY', vh, .1);
    vig(ctx);
    FX.dateTag(ctx, 'CONSTANTINOPLE, 1080s');
  }

  // ---------- e9: in return — trade across the empire without paying customs ----------
  function e9(ctx, lt, dur, t) {
    const wo = since(t, 'without'), tx = since(t, 'taxes');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    sky(ctx, t); farShore(ctx, 430, t); waterBand(ctx, 440, t, -600, 2200, '#4a98b0');
    // the customs house on its quay, and its boom across the harbour
    shape(ctx, '#c8b8a0', 4.5, rect(380, 440, 420, 90)); for (let x = 400; x < 800; x += 60) line(ctx, [[x, 444], [x, 530]], 2, 'rgba(70,58,46,.3)');
    shape(ctx, '#e8d8b8', 4.5, rect(520, 200, 240, 260)); shape(ctx, '#b8503a', 4.5, poly([[505, 200], [640, 140], [775, 200]])); for (let i = 0; i < 3; i++) shape(ctx, '#5a6a7a', 3, rect(550 + i * 70, 260, 40, 70, 18)); txt(ctx, 'CUSTOMS', 640, 380, FX.DISPLAY(28), '#5a3a22');
    shape(ctx, '#c8b8a0', 4, rect(500, 456, 280, 30));
    const lift = wo > 0 ? ease.out(clamp(wo / .5)) : 0; ctx.save(); ctx.translate(780, 470); ctx.rotate(-lift * 1.2); shape(ctx, '#d84a3a', 4, rect(0, -10, 380, 20, 4)); for (let i = 0; i < 4; i++) shape(ctx, '#f4efe2', 0, rect(40 + i * 90, -10, 40, 20)); ctx.restore(); shape(ctx, '#5a4026', 4, circle(780, 470, 14));
    // an official collects from a foreign ship...
    fig(ctx, 460, 470, .24, P('elder', 'byzantine', { hands: { L: [-120, -470], R: [220, -640] }, face: { brows: 'calm', mouth: 'flat', look: [-.6, .3] } }), { mirror: true });
    galley(ctx, 230, 520, .5, 4, t, { sail: false, flag: '#4a9a5a', hull: '#7a6a5a' }); for (let i = 0; i < 3; i++) { const k = ((t * .8 + i / 3) % 1); coin(ctx, lerp(300, 420, k), 420 - Math.sin(Math.PI * k) * 60, .8, t * 5 + i); }
    tag(ctx, 'OTHERS PAY', 230, 340, lt - .3, 20);
    // ...the Venetian galley sails straight through
    const vx = wo > 0 ? lerp(1000, 1500, ease.in(clamp((wo - .3) / 2.2))) : 1000; galley(ctx, vx, 540, .6, 4, t, { flag: RED, sailCol: '#f4e2c0' });
    if (tx > 0) FX.stamp(ctx, 'NO CUSTOMS TAX', 1000, 300, tx, { color: GREEN, size: 36, rot: -.06 });
    ctx.restore();
    strip(ctx, 'IN RETURN…', 640, 96, since(t, 'inreturn'), { px: 36 });
    vig(ctx);
    FX.dateTag(ctx, 'ACROSS THE BYZANTINE EMPIRE');
  }

  // ---------- e10: historians argue: 1082 or 1092? Nobody argues about what it did ----------
  function e10(ctx, lt, dur, t) {
    const y1 = since(t, 'y1082'), y2 = since(t, 'y1092'), nb = since(t, 'nobody');
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    // the charter with its gold seal; the date line flips between two years
    ctx.save(); ctx.translate(420, 330); ctx.rotate(-.03); shape(ctx, '#efe2c0', 4, rect(-230, -200, 460, 380, 4)); for (const yy of [-200, 180]) shape(ctx, '#d8c8a0', 4, ellipse(0, yy, 236, 16));
    txt(ctx, 'CHRYSOBULL', 0, -150, `700 30px Georgia, serif`, '#7a2a24'); for (let i = 0; i < 6; i++) line(ctx, [[-190, -100 + i * 24], [190 - (i % 2) * 60, -100 + i * 24]], 4, 'rgba(70,64,58,.45)');
    const flip = y1 > 0 ? (y2 > 0 ? 1 : 0) + (y2 > .8 ? Math.floor((y2 - .8) * 2.4) % 2 : 0) * 0 : -1; const yrTxt = y2 > 0 ? (Math.floor((t - A.y1092) * 1.6) % 2 ? '1082' : '1092') : '1082';
    shape(ctx, '#f8f0d8', 3.5, rect(-120, 60, 240, 56, 6)); if (y1 > 0) txt(ctx, 'AD ' + yrTxt, 0, 88, FX.DISPLAY(36), RED); if (y2 > 0) txt(ctx, '?', 150, 88, FX.DISPLAY(48), RED);
    shape(ctx, '#e8c14a', 4, circle(150, 170, 34)); shape(ctx, '#d0a838', 0, circle(150, 170, 22)); line(ctx, [[150, 136], [130, 100]], 4, '#a8322a'); line(ctx, [[150, 136], [170, 100]], 4, '#a8322a'); ctx.restore();
    // two historians disagreeing
    fig(ctx, 240, 690, .22, P('chronicler', 'habit', { hands: { L: [-120, -470], R: [200, -900] }, handShape: { R: 'point' }, face: { brows: 'strain', mouth: 'o', look: [.8, -.2] } }));
    fig(ctx, 600, 690, .22, P('bowler', 'suit', { hands: { L: [-200, -900], R: [120, -470] }, handShape: { L: 'point' }, face: { brows: 'strain', mouth: 'o', look: [-.8, -.2] } }), { mirror: true });
    if (y1 > 0) { const k = pop(y1); ctx.save(); ctx.translate(200, 450); ctx.scale(k, k); shape(ctx, '#fff', 3.5, ellipse(0, 0, 60, 30)); txt(ctx, '1082!', 0, 2, FX.DISPLAY(22)); ctx.restore(); }
    if (y2 > 0) { const k = pop(y2); ctx.save(); ctx.translate(640, 450); ctx.scale(k, k); shape(ctx, '#fff', 3.5, ellipse(0, 0, 60, 30)); txt(ctx, '1092!', 0, 2, FX.DISPLAY(22)); ctx.restore(); }
    // what it did: Venice's trade takes off
    shape(ctx, 'rgba(255,250,236,.95)', 4, rect(760, 140, 420, 440, 10)); txt(ctx, "VENICE'S TRADE", 970, 180, FX.DISPLAY(26)); line(ctx, [[800, 540], [1150, 540]], 4); line(ctx, [[800, 540], [800, 210]], 4);
    const g = nb > 0 ? ease.out(clamp(nb / 1.4)) : .15; for (let i = 0; i < 6; i++) { const h = (30 + i * i * 9) * g; shape(ctx, ['#e8c14a', '#d8402e', '#2f6aa8'][i % 3], 3.5, rect(820 + i * 54, 540 - h, 40, h, 3)); }
    if (nb > .6) { const k = pop(nb - .6); ctx.save(); ctx.translate(1100, 250); ctx.scale(k, k); shape(ctx, GREEN, 4, poly([[-20, 30], [-20, -10], [-40, -10], [0, -50], [40, -10], [20, -10], [20, 30]])); ctx.restore(); }
    ctx.restore();
    if (y1 > 0 && nb < 0) FX.caption(ctx, 'HISTORIANS ARGUE ABOUT THE DATE', since(t, 'historians'), .1); else if (nb > 0) FX.caption(ctx, 'NOBODY ARGUES ABOUT WHAT IT DID', nb, .1);
    vig(ctx);
  }

  // ---------- e11: the Arsenal (Canaletto's painting comes alive) ----------
  function arsenalGate(ctx, t) {
    sky(ctx, t, '#8fd0ec', '#fbe8c0');
    for (const x of [330, 950]) { shape(ctx, '#d8784a', 4.5, rect(x - 70, 120, 140, 400)); for (let k = 0; k < 4; k++) shape(ctx, '#d8784a', 3, rect(x - 70 + k * 38, 100, 26, 24)); shape(ctx, '#f0e2c4', 3.5, rect(x - 50, 160, 100, 40)); for (let k = 0; k < 3; k++) shape(ctx, '#5a6a7a', 3, rect(x - 40 + k * 30, 240, 20, 50, 10)); }
    shape(ctx, '#d8784a', 4.5, rect(400, 220, 480, 300)); for (let k = 0; k < 12; k++) shape(ctx, '#d8784a', 3, rect(400 + k * 40, 200, 26, 24));
    shape(ctx, '#f0e6d0', 5, rect(560, 280, 160, 240)); shape(ctx, '#f0e6d0', 4, poly([[548, 282], [640, 220], [732, 282]])); shape(ctx, '#3a4a5a', 4, c => { c.moveTo(590, 520); c.lineTo(590, 380); c.arc(640, 380, 50, Math.PI, 0); c.lineTo(690, 520); c.closePath(); });
    shape(ctx, GOLD, 3.5, ellipse(640, 300, 28, 16)); txt(ctx, 'ARSENALE', 640, 340, FX.DISPLAY(18), '#5a3a22');
    shape(ctx, '#c8b8a0', 4, rect(-200, 500, 600, 30)); shape(ctx, '#c8b8a0', 4, rect(880, 500, 600, 30));
    waterBand(ctx, 520, t, -600, 2200, '#4a98b0'); galley(ctx, 640, 600, .55, 4, t, { flag: RED });
    for (const [x, d] of [[220, 1], [1050, -1]]) { ctx.save(); ctx.translate(x + Math.sin(t * .3 + d) * 30, 640 + Math.sin(t * 1.4 + d) * 3); shape(ctx, '#1f1a18', 4, c => { c.moveTo(-110, -6); c.quadraticCurveTo(0, 22, 120, -24); c.lineTo(110, -4); c.quadraticCurveTo(0, 26, -100, 6); c.closePath(); }); ctx.restore(); }
  }
  function e11(ctx, lt, dur, t) {
    const ar = since(t, 'arsenal'), mix = ar > 0 ? ease.inOut(clamp(ar / 1.2)) : 0, im = T.IMG.canaletto;
    if (mix < 1) { ctx.save(); ctx.globalAlpha = 1 - mix;
      shape(ctx, '#7a3a3a', 0, rect(0, 0, W, H)); for (let x = 0; x < W; x += 60) shape(ctx, 'rgba(0,0,0,.08)', 0, rect(x, 0, 30, H));
      ctx.save(); cam(ctx, lerp(1, 1.12, ease.inOut(clamp(lt / (A.arsenal - 55.9)))), 640, 340);
      const fw = 860, fh = fw * (im ? im.height / im.width : .6), fx = 640 - fw / 2, fy = 330 - fh / 2;
      shape(ctx, '#7a5a30', 6, rect(fx - 34, fy - 34, fw + 68, fh + 68, 6)); shape(ctx, '#c9a14a', 4, rect(fx - 18, fy - 18, fw + 36, fh + 36, 4)); if (im) ctx.drawImage(im, fx, fy, fw, fh); shape(ctx, null, 3, rect(fx, fy, fw, fh));
      glow(ctx, 640, 60, 400, 'rgba(255,230,180,.35)'); ctx.restore();
      ctx.save(); ctx.translate(640, 660); shape(ctx, '#e8d8a8', 3.5, rect(-250, -22, 500, 44, 4)); txt(ctx, 'CANALETTO · THE ENTRANCE TO THE ARSENAL · c. 1732', 0, 2, FX.FONT(700, 16), '#3a2a1a'); ctx.restore(); ctx.restore(); }
    if (mix > 0) { ctx.save(); ctx.globalAlpha = mix; ctx.save(); cam(ctx, lerp(1.06, 1, mix), 640, 380); arsenalGate(ctx, t); ctx.restore(); ctx.restore(); }
    strip(ctx, 'A WALLED SHIPYARD', 640, 96, since(t, 'shipyard'), { px: 36 });
    if (ar > 0) tag(ctx, 'THE ARSENAL', 640, 190, ar, 30);
    vig(ctx);
  }

  // ---------- e12: frame, planking, rigging, oars — an assembly line centuries before Detroit ----------
  function e12(ctx, lt, dur, t) {
    const keys = [A.frame, A.planking, A.rigging, A.oars], st = keys.filter(k => t >= k).length;
    const xs = [220, 500, 780, 1060], gx = st === 0 ? 100 : (() => { const k = keys[st - 1]; return lerp(st > 1 ? xs[st - 2] : 0, xs[st - 1], ease.inOut(clamp((t - k + .05) / .5))); })();
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    sky(ctx, t, '#9ad4ee', '#fbe8c0');
    for (let i = 0; i < 4; i++) { const x = xs[i]; shape(ctx, '#d8784a', 4, rect(x - 130, 230, 260, 60)); shape(ctx, '#b8503a', 4, poly([[x - 146, 232], [x, 170], [x + 146, 232]])); for (const d of [-1, 1]) shape(ctx, '#c86a40', 4, rect(x + d * 120 - 10, 290, 20, 200));
      tag(ctx, ['FRAME', 'PLANKING', 'RIGGING', 'OARS'][i], x, 210, t - keys[i] + .2, 20); }
    shape(ctx, '#c8b8a0', 4, rect(-200, 490, 1700, 30)); waterBand(ctx, 520, t, -600, 2200, '#4a98b0');
    // workers at each station, hammering in turn
    for (let i = 0; i < 4; i++) { const x = xs[i] + 110, hit = Math.max(0, Math.sin(t * 6 + i * 1.3)); fig(ctx, x, 500, .18, P(i % 2 ? 'elder' : 'fisher', i % 2 ? 'tunicElder' : 'tunicPoor', { hands: { L: [-160, -600 + hit * 100], R: [-200, -700 + hit * 160] }, handShape: { L: 'fist', R: 'fist' }, face: { look: [-.8, .3] } }), { mirror: true }); }
    galley(ctx, gx, 560, .5, Math.max(1, st), t, { flag: st >= 3 ? RED : null });
    ctx.restore();
    const ce = since(t, 'centuries'); if (ce > 0) { const s = pop(ce); ctx.save(); ctx.translate(1050, 110); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, '#f3e8cc', 4, rect(-170, -60, 340, 120, 6));
      line(ctx, [[-140, 30], [140, 30]], 6, '#5a5a60'); for (let i = 0; i < 2; i++) { const cx = -70 + i * 120; shape(ctx, '#2a2a30', 3, c => { c.moveTo(cx - 40, 24); c.lineTo(cx - 36, 4); c.lineTo(cx - 14, 4); c.lineTo(cx - 6, -12); c.lineTo(cx + 22, -12); c.lineTo(cx + 30, 4); c.lineTo(cx + 40, 6); c.lineTo(cx + 40, 24); c.closePath(); }); for (const d of [-24, 24]) shape(ctx, '#5a5a60', 2.5, circle(cx + d, 26, 7)); }
      txt(ctx, 'DETROIT, 1910s', 0, -38, FX.FONT(700, 18)); ctx.restore(); FX.stamp(ctx, 'CENTURIES LATER', 1050, 190, ce - .2, { color: RED, size: 22, rot: -.05 }); }
    strip(ctx, 'A HULL MOVES THROUGH IN STAGES', 520, 100, since(t, 'hull'), { px: 32 });
    vig(ctx);
    FX.dateTag(ctx, 'INSIDE THE ARSENAL');
  }

  // ---------- e13: "16,000 workers" — Davis checked the records: closer to 3,000 ----------
  function worker(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 2.5, c => { c.moveTo(-14, 0); c.lineTo(-12, -30); c.quadraticCurveTo(0, -38, 12, -30); c.lineTo(14, 0); c.closePath(); }); shape(ctx, '#e8b490', 2.5, circle(0, -46, 10)); ctx.restore(); }
  function e13(ctx, lt, dur, t) {
    const sx = since(t, 'sixteen'), dv = since(t, 'davis'), rc = since(t, 'records'), th = since(t, 'three');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ad4ee'], [1, '#fbe8c0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 120]);
    shape(ctx, '#c8b8a0', 0, rect(0, 300, W, 420)); shape(ctx, '#d8784a', 4, rect(0, 250, W, 50)); for (let x = 0; x < W; x += 40) shape(ctx, '#d8784a', 3, rect(x, 232, 26, 20));
    // the crowd: 16 rows of workers (each figure stands for 100)
    const total = 160, keep = 30, shrink = th > 0 ? ease.inOut(clamp(th / 1.2)) : 0, r = rng(5);
    for (let i = 0; i < total; i++) { const c = i % 20, rr = Math.floor(i / 20), x = 80 + c * 56 + (rr % 2) * 28, y = 380 + rr * 40, appear = sx > 0 ? pop(sx * 3 - i * .015) : (i < 20 ? 1 : 0); if (appear <= 0) continue;
      const gone = i >= keep ? shrink : 0; if (gone >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - gone; worker(ctx, x, y + gone * 30, .8 * appear, ['#d84a3a', '#3a7ab8', '#e8c14a', '#4a9a5a', '#a85ab8'][Math.floor(r() * 5)]); ctx.restore(); }
    if (sx > 0) { ctx.save(); ctx.translate(320, 150); ctx.scale(pop(sx), pop(sx)); FX.bigText(ctx, '16,000?', 0, 0, 60, { color: GOLD }); ctx.restore(); txt(ctx, 'WHAT YOU OFTEN HEAR', 320, 200, FX.FONT(700, 18)); }
    if (th > 0) FX.stamp(ctx, 'MYTH', 330, 150, th, { color: RED, size: 44, rot: -.12 });
    // the historian's book and the yard's own payroll records
    if (dv > 0) { const s = pop(dv); ctx.save(); ctx.translate(980, 160); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, '#2f4f6a', 4.5, rect(-110, -100, 220, 200, 6)); shape(ctx, '#e8c14a', 0, rect(-110, -100, 18, 200));
      txt(ctx, 'SHIPBUILDERS', 10, -56, FX.DISPLAY(20), '#fff'); txt(ctx, 'OF THE VENETIAN', 10, -30, FX.FONT(700, 15), '#fff'); txt(ctx, 'ARSENAL', 10, -6, FX.DISPLAY(22), '#fff'); txt(ctx, 'ROBERT C. DAVIS · 1991', 10, 60, FX.FONT(600, 13), '#e8c14a'); ctx.restore(); }
    if (rc > 0) { for (let i = 0; i < 3; i++) { const k = pop(rc - i * .15); ctx.save(); ctx.translate(780 + i * 26, 230 - i * 12); ctx.scale(k, k); ctx.rotate(-.1 + i * .06); shape(ctx, ['#8a2a24', '#5a3a22', '#4a5a3a'][i], 4, rect(-60, -40, 120, 80, 4)); txt(ctx, 'PAYROLL 16__', 0, 0, FX.FONT(700, 12), '#f4ecd6'); ctx.restore(); } }
    if (th > .5) { const s = pop(th - .5); ctx.save(); ctx.translate(980, 330); ctx.scale(s, s); FX.bigText(ctx, '≈ 3,000', 0, 0, 56, { color: '#7ad08a' }); ctx.restore(); }
    vig(ctx);
    FX.dateTag(ctx, 'THE ARSENAL, 1600s');
  }

  // ---------- e14: still probably the biggest factory in Europe ----------
  function e14(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, lerp(1.25, 1.0, ease.inOut(clamp(lt / dur))), 640, 400);
    shape(ctx, '#4a98b0', 0, rect(-400, -400, 2100, 1600));
    shape(ctx, '#d8c8a8', 0, rect(-400, -400, 2100, 300)); const r = rng(22); for (let i = 0; i < 60; i++) shape(ctx, ['#e8a87a', '#d88a6a', '#f0d29a'][i % 3], 2, rect(-380 + (i * 37) % 2000, -380 + Math.floor(i / 20) * 80, 40, 30));
    shape(ctx, '#d8784a', 6, rect(160, 80, 960, 560, 6)); shape(ctx, '#e8d8b8', 0, rect(176, 96, 928, 528));
    shape(ctx, '#4a98b0', 4, rect(420, 220, 440, 280, 8)); for (let i = 0; i < 4; i++) galley(ctx, 520 + (i % 2) * 220, 300 + Math.floor(i / 2) * 140, .24, 4, t, { flag: RED });
    for (let i = 0; i < 9; i++) { shape(ctx, '#b8503a', 4, rect(200 + i * 98, 110, 84, 90)); line(ctx, [[200 + i * 98, 155], [284 + i * 98, 155]], 3, 'rgba(29,26,23,.4)'); shape(ctx, '#b8503a', 4, rect(200 + i * 98, 520, 84, 90)); }
    for (let i = 0; i < 3; i++) shape(ctx, '#b8503a', 4, rect(200, 230 + i * 90, 180, 70)); for (let i = 0; i < 3; i++) shape(ctx, '#b8503a', 4, rect(900, 230 + i * 90, 180, 70));
    for (let i = 0; i < 5; i++) { const k = ((t * .3 + i / 5) % 1); ctx.save(); ctx.globalAlpha = .4 * (1 - k); shape(ctx, '#f4efe2', 0, circle(260 + i * 180 + Math.sin(k * 5) * 10, 100 - k * 140, 14 + k * 20)); ctx.restore(); }
    shape(ctx, '#d8784a', 4, rect(600, 620, 30, 60)); shape(ctx, '#d8784a', 4, rect(650, 620, 30, 60));
    ctx.restore();
    const bg = since(t, 'biggest'); if (bg > 0) { const s = pop(bg); ctx.save(); ctx.translate(640, 110); ctx.scale(s, s); shape(ctx, RED, 4, poly([[-330, -40], [330, -40], [300, 0], [330, 40], [-330, 40], [-300, 0]])); txt(ctx, "PROBABLY EUROPE'S BIGGEST FACTORY", 0, 2, FX.DISPLAY(28), '#fff'); ctx.restore(); }
    vig(ctx);
    FX.dateTag(ctx, 'THE ARSENAL FROM ABOVE');
  }

  // ---------- e15: 1574 — a war galley fitted out while the king of France sat through a banquet (the story goes) ----------
  function e15(ctx, lt, dur, t) {
    const kg = since(t, 'king'), bq = since(t, 'banquet'), gl = since(t, 'galley');
    shape(ctx, '#f3e8cc', 0, rect(0, 0, W, H));
    // left: the banquet
    ctx.save(); ctx.beginPath(); ctx.rect(20, 20, 610, 680); ctx.clip();
    shape(ctx, '#c8906a', 0, rect(20, 20, 610, 680)); for (let x = 40; x < 640; x += 90) shape(ctx, '#d8a07a', 0, rect(x, 20, 46, 400)); glow(ctx, 320, 200, 300, 'rgba(255,220,150,.45)');
    for (let i = 0; i < 3; i++) { const x = 120 + i * 200; line(ctx, [[x, 20], [x, 90]], 3); shape(ctx, GOLD, 3.5, ellipse(x, 100, 50, 12)); for (let k = -1; k <= 1; k++) { shape(ctx, '#efe6d0', 2.5, rect(x + k * 22 - 4, 76, 8, 22)); glow(ctx, x + k * 22, 70, 30, 'rgba(255,200,120,.5)'); } }
    fig(ctx, 320, 640, .34, P('kingFR', 'frenchRoyal', { hands: { L: [-160, -560], R: [180, -620 + Math.max(0, Math.sin(t * 3)) * 100] }, handShape: { R: 'fist' }, face: { brows: 'calm', mouth: Math.sin(t * 3) > .3 ? 'o' : 'smile', look: [.3, .4], eyes: blink(t, 86.4, 89.9) }, breathe: breathe(t) }));
    shape(ctx, '#f4efe2', 4.5, rect(40, 470, 570, 30, 4)); shape(ctx, '#8a5a3a', 4.5, rect(40, 500, 570, 200));
    for (const [x, kind] of [[120, 'bread'], [230, 'wine'], [430, 'fowl'], [530, 'fruit']]) { if (kind === 'bread') shape(ctx, '#d8a058', 3.5, ellipse(x, 458, 36, 16)); else if (kind === 'wine') { shape(ctx, '#e8c14a', 3, rect(x - 10, 420, 20, 40, 4)); shape(ctx, '#7a1f2a', 0, rect(x - 8, 424, 16, 14)); } else if (kind === 'fowl') { shape(ctx, '#c87a3a', 3.5, ellipse(x, 452, 40, 22)); shape(ctx, '#e8e2d4', 3, ellipse(x, 474, 56, 10)); } else for (let k = 0; k < 4; k++) shape(ctx, ['#d84a3a', '#e8c14a', '#7aaa4a'][k % 3], 3, circle(x - 20 + k * 14, 456 - (k % 2) * 10, 10)); }
    ctx.restore(); shape(ctx, null, 5, rect(20, 20, 610, 680, 6)); tag(ctx, 'THE BANQUET', 325, 60, lt - .2, 22);
    // right: the shipyard rushes a war galley
    ctx.save(); ctx.beginPath(); ctx.rect(650, 20, 610, 680); ctx.clip();
    shape(ctx, grad(ctx, 0, 20, 0, 500, [[0, '#9ad4ee'], [1, '#fbe8c0']]), 0, rect(650, 20, 610, 680)); shape(ctx, '#d8784a', 4, rect(650, 200, 610, 50)); shape(ctx, '#4a98b0', 0, rect(650, 500, 610, 200));
    const prog2 = gl > 0 ? clamp((t - A.galley) / 3.2) : 0, stage = 1 + Math.min(3, Math.floor(prog2 * 4));
    galley(ctx, 955, 520, .7, stage, t, { flag: stage >= 3 ? RED : null });
    for (let i = 0; i < 6; i++) { const x = 720 + i * 90, ph = t * 7 + i, run = Math.sin(t * 2 + i) * 20; fig(ctx, x + run, 500, .14, P(i % 2 ? 'elder' : 'fisher', i % 2 ? 'tunicElder' : 'tunicPoor', { hands: { L: [-120, -700 + Math.sin(ph) * 160], R: [140, -700 - Math.sin(ph) * 160] }, handShape: { L: 'fist', R: 'fist' }, feet: { L: [-30 + Math.sin(ph) * 50, -40], R: [30 - Math.sin(ph) * 50, -40] } }), { mirror: i % 2 === 1 }); }
    ctx.restore(); shape(ctx, null, 5, rect(650, 20, 610, 680, 6)); tag(ctx, 'THE SHIPYARD', 955, 60, gl, 22);
    // the candle between them burns down — the race
    const burn = clamp((t - A.workers) / 4.5); ctx.save(); ctx.translate(640, 380); shape(ctx, '#efe6d0', 4, rect(-16, -90 + burn * 120, 32, 150 - burn * 120, 4)); const fl = 1 + Math.sin(t * 11) * .06; glow(ctx, 0, -100 + burn * 120, 80 * fl, 'rgba(255,200,120,.6)'); shape(ctx, '#ffd27a', 3, smooth([[0, -90 + burn * 120], [-8, -104 + burn * 120], [0, -128 + burn * 120], [8, -104 + burn * 120]])); shape(ctx, '#c9a14a', 4, ellipse(0, 62, 40, 12)); ctx.restore();
    strip(ctx, '1574 — THE STORY GOES…', 640, 690, since(t, 'story'), { px: 30 });
    if (bq > .2) FX.stamp(ctx, 'LEGEND', 960, 360, bq - .2, { color: RED, size: 38, rot: -.1 });
    vig(ctx);
  }

  // ---------- e16: same water, new job — a highway; Venice owns the trucks ----------
  function e16(ctx, lt, dur, t) {
    const nj = since(t, 'newjob'), hw = since(t, 'highway'), ow = since(t, 'owns');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#6ab0e0'], [.55, '#cfe6ea'], [1, '#5aa0b4']]), 0, rect(0, 0, W, H)); glow(ctx, 1000, 140, 440, 'rgba(255,240,200,.55)'); clouds(ctx, t, [80, 130]); birds(ctx, t, 4, 160);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    shape(ctx, '#4a98b0', 0, rect(-200, 380, 1700, 400));
    // the sea lane drawn like a road: lane dashes, a road sign, and a convoy of galleys
    const sc = (t * 120) % 160; for (let i = -2; i < 12; i++) shape(ctx, '#f4efe2', 0, poly([[i * 160 - sc, 470], [i * 160 + 80 - sc, 470], [i * 160 + 76 - sc, 478], [i * 160 + 4 - sc, 478]]));
    line(ctx, [[-200, 420], [1500, 420]], 4, 'rgba(244,239,226,.6)'); line(ctx, [[-200, 530], [1500, 530]], 4, 'rgba(244,239,226,.6)');
    ctx.save(); ctx.translate(1110, 380); line(ctx, [[0, 0], [0, -150]], 10, '#7a7a80'); shape(ctx, '#2f7a46', 4, rect(-130, -230, 260, 90, 8)); txt(ctx, 'CONSTANTINOPLE', 0, -196, FX.DISPLAY(22), '#fff'); txt(ctx, '→', 0, -162, FX.DISPLAY(30), '#fff'); ctx.restore();
    const n = ow > 0 ? 5 : hw > 0 ? 3 : 1; for (let i = 0; i < n; i++) { const x = ((i * 300 + t * 70) % 1800) - 300; galley(ctx, x, 450 + (i % 2) * 40, .28, 4, t, { flag: RED, sailCol: '#f4e2c0' }); }
    // the lagoon swaps the hard hat for a captain's cap
    const off = nj > 0 ? clamp(nj / .7) : 0, drop = nj > .25 ? FX.dropBounce(nj - .25, 420, .3) : 999;
    V.lagoon(ctx, 400, 700, 600, t, { look: nj > 0 && nj < 1.2 ? [0, -.9] : [.5, -.2], eyes: blink(t, 92.6, 96.9), mouth: hw > 0 ? 'smile' : 'o',
      hat: (c, x, y) => { if (off < 1) { c.save(); c.translate(-off * 420, -off * 360 + off * off * 120); c.rotate(-off * 2.5); V.hats.hardhat(c, x, y); c.restore(); }
        if (drop < 999) { c.save(); c.translate(0, -drop / (600 / 600)); V.hats.captain(c, x, y); c.restore(); } } });
    if (hw > 0) { const s = pop(hw); ctx.save(); ctx.translate(820, 600); ctx.scale(s, s); ctx.rotate(.05); FX.paperDoc(ctx, 0, 0, 260, 120, { lines: 0, draw: c => { txt(c, 'JOB #3', 0, -18, FX.DISPLAY(40)); txt(c, 'HIGHWAY', 0, 26, FX.DISPLAY(32), RED); } }); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'SAME WATER.', 470, 100, since(t, 'same'), { px: 44 }); strip(ctx, 'NEW JOB.', 830, 100, nj, { px: 44, color: RED, rot: .03 });
    if (ow > 0) FX.caption(ctx, 'AND VENICE OWNS THE TRUCKS', ow, .05);
    vig(ctx);
  }

  const cut = [[0, e1], [2.05, e2], [9.95, e3], [14.1, e4], [20.95, e5], [24.25, e6], [29.3, e7], [34.2, e8], [42.55, e9], [48.35, e10], [55.95, e11], [62.95, e12], [69.6, e13], [80.6, e14], [83.9, e15], [91.65, e16]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .7 }, { t: .75, type: 'paper', gain: .5 },
    { t: A.farmland, type: 'thud', gain: .5 }, { t: A.pasture, type: 'thud', gain: .5 }, { t: A.quarry, type: 'thud', gain: .5 }, { t: A.goodfor, type: 'splash', gain: .3 },
    { t: A.boat, type: 'splash', gain: .4 }, { t: A.salt, type: 'paper', gain: .4 }, { t: A.top, type: 'whoosh', gain: .4 }, { t: A.farthest, type: 'click', gain: .4 },
    { t: A.otherend, type: 'slide', gain: .4 }, { t: A.constantinople, type: 'swell', gain: .4 }, { t: A.pepper, type: 'thud', gain: .5 }, { t: A.silk, type: 'thud', gain: .4 }, { t: A.asia, type: 'whoosh', gain: .3 },
    { t: A.between, type: 'click', gain: .5 }, { t: A.deal, type: 'paper', gain: .5 }, { t: A.invaded, type: 'hit', gain: .5 }, { t: A.navy, type: 'paper', gain: .4 }, { t: A.venicehas, type: 'whoosh', gain: .4 },
    { t: A.inreturn, type: 'paper', gain: .5 }, { t: A.without, type: 'creak', gain: .5 }, { t: A.taxes, type: 'thud', gain: .7 },
    { t: A.y1082, type: 'click', gain: .5 }, { t: A.y1092, type: 'click', gain: .5 }, { t: A.nobody, type: 'swell', gain: .4 },
    { t: A.shipyard, type: 'paper', gain: .4 }, { t: A.arsenal, type: 'swell', gain: .5 },
    { t: A.frame, type: 'thud', gain: .6 }, { t: A.planking, type: 'thud', gain: .6 }, { t: A.rigging, type: 'thud', gain: .6 }, { t: A.oars, type: 'thud', gain: .6 }, { t: A.centuries, type: 'paper', gain: .5 },
    { t: A.sixteen, type: 'ratchet', gain: .4 }, { t: A.davis, type: 'paper', gain: .5 }, { t: A.records, type: 'paper', gain: .5 }, { t: A.three, type: 'thud', gain: .8 }, { t: A.three + .3, type: 'whoosh', gain: .4 },
    { t: A.biggest, type: 'swell', gain: .4 }, { t: A.story, type: 'paper', gain: .5 }, { t: A.galley, type: 'rattle', gain: .3 }, { t: A.banquet + .2, type: 'thud', gain: .6 },
    { t: A.newjob, type: 'whoosh', gain: .5 }, { t: A.newjob + .55, type: 'clang', gain: .3 }, { t: A.highway, type: 'thud', gain: .6 }, { t: A.owns, type: 'swell', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.deal - .5, mood: 'tense' }, { t: A.historians - .3, mood: 'still' }, { t: A.y1574 - .3, mood: 'mystery' }, { t: A.same - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-jobthree.mp3', shots, sfx, moods, images: { canaletto: 'assets/img/canaletto-arsenal.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
