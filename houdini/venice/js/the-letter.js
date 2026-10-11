/* Venice — "The letter" (narration-letter.mp3 = 2.0 s chapter pause + narration-full.mp3 537.3–606.3 s).
 * Anchors = full-recording word times − 535.3. New: de' Barbari artifact, Priuli's study, a world map (Europe–Africa–India)
 * traced from lon/lat, a caravel, the myth-bust of "Venice collapsed on the spot", economists' dials, a flip-book. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { by1500: 537.52, nothing: 539.84, touch: 540.56, mail: 542.33, arrives: 542.62, banker: 544.17, priuli: 545.27, diary: 546.62, y1501: 547.93, report: 549.7, egypt: 551.05,
    portuguese: 552.02, india: 553.57, bysea: 554.8, around: 555.84, africa: 556.75, believe: 559.21, confirmed: 560.58, writes: 561.7, merchants: 562.61, baby: 564.02, milk: 564.99,
    think: 566.28, centuries: 568.37, advantage: 570.28, seat: 570.98, water: 573.0, somebody: 573.96, found: 574.67, ocean: 575.69, popular: 577.41, collapsed: 578.91, spot: 579.59,
    didnt: 580.78, spice: 582.06, cameback: 582.68, decades: 583.33, historians: 584.88, fight: 585.85, hard: 586.75, route: 587.66, fast: 588.73, direction: 590.0, set: 590.73,
    main: 592.14, street: 592.48, atlantic: 593.65, wasnt: 595.13, onit: 595.8, skipping: 596.89, genoa: 598.94, ottomans: 600.39, plagues: 602.38, mattered: 603.46, didntchange: 604.95, direction2: 605.45 };
  const A = {}; for (const k in F) A[k] = F[k] - 535.3; A.end = 72.5;
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

  function basilica(ctx, x, y, s, t, o = {}) { // x,y = centre of the facade base
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    // domes behind
    for (const [dx, dy, r] of [[-190, -232, 26], [-96, -246, 34], [0, -262, 44], [96, -246, 34], [190, -232, 26]]) {
      shape(ctx, '#9fb2b8', 4, c => { c.moveTo(dx - r, dy); c.bezierCurveTo(dx - r, dy - r * 1.3, dx + r, dy - r * 1.3, dx + r, dy); c.closePath(); });
      shape(ctx, 'rgba(255,255,255,.25)', 0, ellipse(dx - r * .4, dy - r * .5, r * .18, r * .4, -.3));
      shape(ctx, '#d8c8a0', 3, rect(dx - 6, dy - r * 1.05 - 18, 12, 18)); shape(ctx, GOLD, 3, circle(dx, dy - r * 1.05 - 24, 6)); line(ctx, [[dx, dy - r * 1.05 - 30], [dx, dy - r * 1.05 - 46]], 3); }
    // upper storey with five pointed gables
    shape(ctx, '#ead8b4', 4.5, rect(-280, -210, 560, 100));
    for (let i = 0; i < 5; i++) { const gx = -224 + i * 112, w = i === 2 ? 60 : 44;
      shape(ctx, '#ead8b4', 4, c => { c.moveTo(gx - w, -205); c.quadraticCurveTo(gx - w, -250, gx, -272 - (i === 2 ? 14 : 0)); c.quadraticCurveTo(gx + w, -250, gx + w, -205); c.closePath(); });
      shape(ctx, '#e8b84a', 3.5, c => { c.moveTo(gx - w * .72, -150); c.lineTo(gx - w * .72, -200); c.quadraticCurveTo(gx - w * .7, -238, gx, -250 - (i === 2 ? 12 : 0)); c.quadraticCurveTo(gx + w * .7, -238, gx + w * .72, -200); c.lineTo(gx + w * .72, -150); c.closePath(); });
      if (i === 2) { for (let k = 0; k < 6; k++) line(ctx, [[gx - 36 + k * 14, -150], [gx - 36 + k * 14, -228 + Math.abs(k - 2.5) * 6]], 2, 'rgba(29,26,23,.4)'); }
      shape(ctx, GOLD, 2.5, circle(gx, -276 - (i === 2 ? 14 : 0), 5)); }
    // the terrace with the four horses over the central door
    shape(ctx, '#d8c49c', 4, rect(-284, -112, 568, 14));
    for (let i = 0; i < 4; i++) horse(ctx, -54 + i * 36, -116, .2, i < 2 ? 1 : -1, o.horseGlow ? o.horseGlow(i) : 0);
    // lower storey: five portals with gold mosaic lunettes
    shape(ctx, '#efe2c4', 4.5, rect(-280, -98, 560, 98));
    for (let i = 0; i < 5; i++) { const px = -224 + i * 112, w = i === 2 ? 46 : 36, top = i === 2 ? -92 : -80;
      shape(ctx, '#d0b48a', 4, c => { c.moveTo(px - w - 8, 0); c.lineTo(px - w - 8, top + w); c.arc(px, top + w, w + 8, Math.PI, 0); c.lineTo(px + w + 8, 0); c.closePath(); });
      shape(ctx, '#e8b84a', 3, c => { c.moveTo(px - w, top + w + 6); c.arc(px, top + w + 6, w, Math.PI, 0); c.closePath(); });
      ctx.save(); ctx.globalAlpha = .55; for (let k = 0; k < 8; k++) shape(ctx, '#fff2b8', 0, circle(px - w * .7 + (k % 4) * w * .46, top + w - 4 + Math.floor(k / 4) * 10, 2)); ctx.restore();
      shape(ctx, '#5a3a2a', 3.5, rect(px - w + 6, top + w + 6, (w - 6) * 2, -top - w - 6)); }
    ctx.restore();
  }
  function horse(ctx, x, y, s, dir, glowK = 0) { // a bronze horse in the San Marco pose: head turned, one foreleg raised
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
    const B = '#b07e3e', B2 = '#8a5e2a', leg = (ax, ay, kx, ky, hx, hy) => { line(ctx, [[ax, ay], [kx, ky], [hx, hy]], 15, INK); line(ctx, [[ax, ay], [kx, ky], [hx, hy]], 9, B2); shape(ctx, '#5a3a1a', 3, rect(hx - 8, hy - 2, 16, 8, 2)); };
    leg(-44, -50, -48, -26, -46, -2); leg(-24, -50, -20, -26, -18, -2); leg(36, -50, 40, -26, 42, -2);
    leg(48, -54, 72, -62, 80, -44);                                                                                         // raised foreleg
    shape(ctx, B2, 3.5, c => { c.moveTo(-62, -66); c.quadraticCurveTo(-90, -54, -84, -14); c.lineTo(-74, -16); c.quadraticCurveTo(-76, -44, -58, -56); c.closePath(); }); // tail
    shape(ctx, B, 4.5, smooth([[-66, -60], [-50, -80], [0, -84], [44, -80], [62, -64], [52, -44], [0, -40], [-50, -44]]));
    shape(ctx, B, 4.5, smooth([[34, -76], [44, -104], [58, -126], [72, -134], [80, -122], [70, -100], [62, -72], [50, -56]]));   // arched neck
    shape(ctx, B, 4.5, smooth([[64, -136], [76, -142], [104, -124], [110, -112], [100, -106], [80, -114], [66, -122]]));         // head
    shape(ctx, B, 3, poly([[70, -138], [72, -154], [80, -140]]));                                                             // ear
    for (let k = 0; k < 4; k++) line(ctx, [[46 + k * 6, -100 - k * 9], [38 + k * 6, -96 - k * 9]], 3, B2);                      // mane
    shape(ctx, 'rgba(255,230,170,.45)', 0, ellipse(-6, -74, 40, 7)); shape(ctx, 'rgba(90,140,110,.22)', 0, ellipse(10, -50, 34, 7));
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(88, -126, 3.2, 0, 7); ctx.fill(); line(ctx, [[66, -116], [96, -108]], 3, '#5a3a1a');   // eye, bridle
    ctx.restore();
    if (glowK > 0) glow(ctx, x, y - 80 * s, 120 * s * glowK + 40 * s, `rgba(255,220,140,${.5 * glowK})`);
  }
  function campanile(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#c86a4a', 4.5, rect(-34, -420, 68, 420)); for (const dx of [-18, 0, 18]) line(ctx, [[dx, -400], [dx, -8]], 2.5, 'rgba(29,26,23,.25)');
    shape(ctx, '#efe2c4', 4.5, rect(-40, -500, 80, 80)); for (let i = 0; i < 4; i++) shape(ctx, '#5a6a7a', 3, c => { const ax = -30 + i * 18; c.moveTo(ax, -428); c.lineTo(ax, -470); c.arc(ax + 6, -470, 6, Math.PI, 0); c.lineTo(ax + 12, -428); c.closePath(); });
    shape(ctx, '#efe2c4', 4, rect(-36, -540, 72, 40)); shape(ctx, '#6aa07a', 4.5, poly([[-38, -540], [0, -640], [38, -540]])); shape(ctx, GOLD, 3, circle(0, -648, 7));
    ctx.restore(); }
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
  function card(ctx, lines, x, y, k, w = 360) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(x + 300, x, e), y); ctx.rotate(.02);
    const h = 30 + lines.length * 34; ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, PAPER, 3.5, rect(-w / 2, -h / 2, w, h, 3)); lines.forEach(([s, f, c], i) => txt(ctx, s, 0, -h / 2 + 32 + i * 34, f, c || INK)); ctx.restore(); }
  // ---------- world map: Europe, Africa, Arabia, India (traced from lon/lat) ----------
  const WL = ([lon, lat]) => [60 + (lon + 20) * 11.6, 92 + (45 - lat) * 7.2];
  const AFR = [[-6, 35.8], [-10, 30], [-13, 27.5], [-17, 21], [-17, 15], [-15, 11], [-13, 8], [-8, 4.5], [-2, 5], [5, 4], [9, 4], [10, -2], [13, -10], [12, -18], [15, -27], [18, -34.5], [20, -34.8], [26, -33.8], [32, -28.5], [35, -24], [40, -15], [40, -10], [39, -4], [43, 0], [48, 5], [51, 11.8], [43, 11.5], [39, 16], [37, 21], [34, 27.5], [32.5, 30], [32.3, 31.3], [29.9, 31.2], [25.0, 31.6], [23.2, 32.2], [20.0, 32.1], [19.6, 30.6], [18.0, 30.5], [15.4, 31.7], [13.2, 32.9], [11.0, 33.4], [10.2, 36.8], [8.6, 36.9], [5.1, 36.8], [3.0, 36.8], [-0.6, 35.7], [-2.9, 35.3], [-5.4, 35.9]].map(WL);
  const EUR = [[-20, 62], [-9.5, 43.5], [-9, 38.7], [-8.5, 37], [-6, 36.2], [-5.6, 36.0], [-4.4, 36.7], [-1.0, 37.6], [-0.4, 39.5], [0.6, 40.6], [2.2, 41.4], [3.2, 42.2], [5.4, 43.3], [7.3, 43.7], [8.9, 44.4], [10.2, 43.9], [11.0, 42.6], [12.3, 41.7], [14.3, 40.8], [15.6, 40.1], [15.7, 38.2], [16.5, 38.6], [17.1, 39.4], [17.2, 40.5], [18.5, 40.1], [16.9, 41.1], [15.9, 41.9], [14.2, 42.5], [13.5, 43.6], [12.6, 44.1], [12.3, 45.4], [13.8, 45.6], [13.8, 44.9], [15.2, 44.2], [16.4, 43.5], [18.1, 42.6], [19.5, 41.3], [19.4, 40.3], [20.7, 39.3], [21.7, 38.3], [21.4, 37.3], [22.5, 36.4], [23.2, 36.6], [23.0, 37.8], [23.7, 38.0], [22.9, 40.6], [24.4, 40.9], [26.4, 40.6], [28.0, 41.0], [29.0, 41.1], [29.3, 40.8], [27.3, 40.3], [26.3, 40.0], [26.7, 39.3], [27.1, 38.4], [27.4, 37.0], [28.2, 36.7], [30.7, 36.9], [32.5, 36.1], [34.6, 36.8], [36.0, 36.6], [35.9, 35.3], [35.5, 33.9], [34.9, 32.6], [34.3, 31.4], [34.8, 29.5], [36, 26], [39, 21], [43, 13], [45, 12.7], [52, 15.5], [56, 17.5], [59, 22.5], [56.5, 25.5], [56, 27], [51, 24.5], [48, 29.5], [50, 30], [54, 26.8], [57, 25.6], [62, 25.2], [67, 24.5], [70, 21], [73, 17], [75, 12], [76.5, 8.3], [78, 8.5], [80, 13], [80, 16], [82, 17], [85, 20], [85, 62]].map(WL);
  const MADA = [[44, -25], [47, -25], [50, -15], [49, -12], [44, -16]].map(WL);
  const WPL = { lisbon: WL([-9.1, 38.7]), venice: WL([12.3, 45.2]), alex: WL([29.9, 31.2]), calicut: WL([75.8, 11.25]), cape: WL([18.5, -34.4]), suez: WL([32.5, 29.9]) };
  const NEW_ROUTE = [[-9.1, 38.7], [-14, 30], [-19, 18], [-20, 5], [-12, -10], [5, -28], [18.5, -37], [30, -34], [40, -22], [44, -10], [45, 2], [55, 8], [66, 11], [75.8, 11.25]].map(WL);
  const OLD_ROUTE = [[75.8, 11.25], [62, 13], [52, 13], [44, 12.5], [40, 18], [36, 24], [33, 28], [32.5, 30.4], [29.9, 31.2], [26, 34], [20, 36], [18, 40], [14, 43], [12.3, 45.2]].map(WL);
  function worldMap(ctx, t, o = {}) {
    shape(ctx, '#a8d4dc', 0, rect(-600, -600, 2500, 1900));
    ctx.save(); ctx.globalAlpha = .18; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; line(ctx, [[640, 380], [640 + Math.cos(a) * 1600, 380 + Math.sin(a) * 1600]], 1.2, '#3a6a7a'); } ctx.restore();
    if (o.medGold > 0) { ctx.save(); ctx.globalAlpha = .55 * o.medGold; shape(ctx, '#ffe9a0', 0, poly([WL([-6, 36]), WL([3, 42]), WL([12, 45]), WL([30, 41]), WL([36, 36.5]), WL([32, 31]), WL([10, 33]), WL([-6, 35.5])])); ctx.restore(); }
    if (o.oceanGlow > 0) { ctx.save(); ctx.globalAlpha = .45 * o.oceanGlow; shape(ctx, '#7ad0f0', 0, poly([WL([-20, 40]), WL([-10, 30]), WL([-20, -40]), WL([80, -40]), WL([80, 5]), WL([55, 8]), WL([45, 2]), WL([40, -15]), WL([18, -34]), WL([12, -18]), WL([10, -2]), WL([-8, 4.5]), WL([-17, 15]), WL([-20, 25])])); ctx.restore(); }
    shape(ctx, '#d8d0a0', 4.5, poly(EUR)); shape(ctx, '#d8c890', 4.5, poly(AFR)); shape(ctx, '#d8c890', 3.5, poly(MADA));
    txt(ctx, 'EUROPE', WL([5, 47])[0], WL([5, 47])[1] + 30, FX.DISPLAY(24), 'rgba(90,70,40,.6)'); txt(ctx, 'AFRICA', WL([20, 5])[0], WL([20, 5])[1], FX.DISPLAY(34), 'rgba(90,70,40,.55)'); txt(ctx, 'INDIA', WL([78, 20])[0], WL([78, 20])[1], FX.DISPLAY(24), 'rgba(90,70,40,.6)');
    txt(ctx, 'ATLANTIC OCEAN', WL([-12, -12])[0], WL([-12, -12])[1], `italic 600 20px Georgia, serif`, '#2f5d6b'); txt(ctx, 'INDIAN OCEAN', WL([65, -15])[0], WL([65, -15])[1], `italic 600 20px Georgia, serif`, '#2f5d6b');
    for (const [k, n, dx, dy] of [['lisbon', 'LISBON', -50, 0], ['venice', 'VENICE', 40, 14], ['alex', 'ALEXANDRIA', 0, 20], ['calicut', 'CALICUT', 0, 22]]) { shape(ctx, k === 'venice' ? RED : '#5a4026', 3, circle(WPL[k][0], WPL[k][1], 7)); txt(ctx, n, WPL[k][0] + dx, WPL[k][1] + dy, `italic 700 15px Georgia, serif`, '#3a2a1a'); }
  }
  function routeDraw(ctx, pts, k, col, w = 6, dash = [12, 9], alpha = 1) { if (k <= 0) return; const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
    let want = tot * clamp(k), out = [pts[0]]; for (let i = 1; i < pts.length; i++) { if (want >= seg[i - 1]) { out.push(pts[i]); want -= seg[i - 1]; } else { const f = want / seg[i - 1]; out.push([lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]); break; } }
    ctx.save(); ctx.globalAlpha = alpha; ctx.setLineDash(dash); line(ctx, out, w, col); ctx.restore(); return out[out.length - 1]; }
  function caravel(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const bob = Math.sin(t * 2) * 3; ctx.translate(0, bob);
    shape(ctx, '#8a5a34', 4, c => { c.moveTo(-90, -20); c.lineTo(90, -26); c.quadraticCurveTo(80, 12, 50, 16); c.lineTo(-60, 16); c.quadraticCurveTo(-90, 6, -100, -34); c.closePath(); });
    for (const [mx, h, w] of [[-30, 120, 60], [30, 100, 50]]) { line(ctx, [[mx, -20], [mx, -20 - h]], 5, '#5a3a22'); shape(ctx, '#f4efe2', 3.5, c => { c.moveTo(mx - w / 2, -h + 10); c.quadraticCurveTo(mx, -h - 2, mx + w / 2, -h + 10); c.lineTo(mx + w / 2, -40); c.quadraticCurveTo(mx, -30, mx - w / 2, -40); c.closePath(); });
      shape(ctx, RED, 0, rect(mx - 4, -h + 22, 8, 40)); shape(ctx, RED, 0, rect(mx - 14, -h + 36, 28, 8)); }
    ctx.restore(); }

  // ---------- L1: chapter card — THE LETTER ----------
  function L1(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(420 + i * 150, 430 + (i % 2) * 20); ctx.rotate(-.12 + i * .08); shape(ctx, '#f0e2c0', 4, rect(-110, -70, 220, 140, 4)); line(ctx, [[-110, -70], [0, 10], [110, -70]], 3, 'rgba(29,26,23,.35)'); shape(ctx, RED, 3, circle(0, 16, 18)); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'THE LETTER', 640, 130, lt - .05, { px: 64 });
    vig(ctx);
  }

  // ---------- L2: by 1500, a city nothing can touch (de' Barbari's view, then a golden shield) ----------
  function engravedVenice(ctx, t) {
    shape(ctx, '#efe2c0', 0, rect(-200, -200, 1700, 1100));
    ctx.save(); ctx.globalAlpha = .35; for (let y = -200; y < 900; y += 8) line(ctx, [[-200, y], [1500, y + 30]], 1, '#8a7a5a'); ctx.restore();
    const ISL2 = [[200, 360], [300, 250], [520, 200], [760, 210], [960, 260], [1080, 360], [1000, 450], [780, 500], [520, 500], [300, 460]];
    shape(ctx, '#f0e4c6', 4.5, smooth(ISL2)); ctx.save(); ctx.beginPath(); smooth(ISL2)(ctx); ctx.clip();
    const r = rng(12); for (let y = 190; y < 510; y += 13) for (let x = 190; x < 1090; x += 15) { const h = 8 + r() * 6; shape(ctx, '#e6d2a8', 1.3, poly([[x, y], [x + 12, y], [x + 12, y - h], [x + 6, y - h - 5], [x, y - h]])); }
    line(ctx, [[240, 340], [420, 290], [560, 380], [700, 320], [860, 400], [1000, 410]], 16, '#c8d4c8'); ctx.restore();
    for (let i = 0; i < 6; i++) galley(ctx, 240 + i * 160, 560 + (i % 2) * 40, .18, 4, t, { sailCol: '#f4ecd6' });
    for (const [x, y, a] of [[90, 90, .5], [1190, 90, 2.6]]) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); shape(ctx, '#f0e4c6', 3, circle(0, 0, 40)); for (let k = 0; k < 4; k++) line(ctx, [[30, -6 + k * 4], [90 + k * 14, -10 + k * 6]], 2, '#8a7a5a'); ctx.restore(); }
  }
  function L2(ctx, lt, dur, t) {
    const nt = since(t, 'nothing'), mix = clamp((t - A.by1500 - 1.6) / .8), im = T.IMG.barbari;
    if (mix < 1) { ctx.save(); ctx.globalAlpha = 1 - mix; shape(ctx, '#7a3a3a', 0, rect(0, 0, W, H));
      ctx.save(); cam(ctx, lerp(1, 1.1, clamp(lt / 2.2)), 640, 340); const fh = 480, fw = fh * (im ? im.width / im.height : 1), fx = 640 - fw / 2, fy = 330 - fh / 2;
      shape(ctx, '#7a5a30', 6, rect(fx - 30, fy - 30, fw + 60, fh + 60, 6)); shape(ctx, '#c9a14a', 4, rect(fx - 15, fy - 15, fw + 30, fh + 30, 4)); if (im) ctx.drawImage(im, fx, fy, fw, fh); shape(ctx, null, 3, rect(fx, fy, fw, fh)); ctx.restore();
      ctx.save(); ctx.translate(640, 670); shape(ctx, '#e8d8a8', 3.5, rect(-290, -22, 580, 44, 4)); txt(ctx, "JACOPO DE' BARBARI · VIEW OF VENICE, 1500 (DETAIL)", 0, 2, FX.FONT(700, 16), '#3a2a1a'); ctx.restore(); ctx.restore(); }
    if (mix > 0) { ctx.save(); ctx.globalAlpha = mix; ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380); engravedVenice(ctx, t);
      if (nt > 0) { const k = FX.settle(clamp(nt / .6)); ctx.save(); ctx.globalAlpha = .5 * clamp(nt / .4); shape(ctx, 'rgba(255,220,120,.25)', 5, c => { c.ellipse(640, 470, 560 * k, 360 * k, 0, Math.PI, 0); }); ctx.restore(); glow(ctx, 640, 250, 300, `rgba(255,230,150,${.3 * clamp(nt)})`); }
      ctx.restore(); ctx.restore(); }
    strip(ctx, 'BY 1500…', 300, 110, since(t, 'by1500'), { px: 40 }); if (nt > 0) strip(ctx, 'A CITY NOTHING CAN TOUCH', 760, 190, nt, { px: 34, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- L3: then some mail arrives — banker Girolamo Priuli keeps a diary ----------
  function study(ctx, t) {
    shape(ctx, '#d8b890', 0, rect(-200, -200, 1700, 1100)); for (let x = -200; x < 1500; x += 70) shape(ctx, 'rgba(120,80,50,.08)', 0, rect(x, -200, 35, 860));
    shape(ctx, '#e8d0a0', 6, c => { c.moveTo(860, 470); c.lineTo(860, 220); c.arc(980, 220, 120, Math.PI, 0); c.lineTo(1100, 470); c.closePath(); });
    ctx.save(); ctx.beginPath(); ctx.moveTo(880, 460); ctx.lineTo(880, 225); ctx.arc(980, 225, 100, Math.PI, 0); ctx.lineTo(1080, 460); ctx.closePath(); ctx.clip();
    shape(ctx, grad(ctx, 0, 120, 0, 460, [[0, '#8fd0ec'], [1, '#fbe8c0']]), 0, rect(870, 110, 220, 360)); shape(ctx, '#4a98b0', 0, rect(870, 380, 220, 90)); galley(ctx, 980, 400, .2, 4, t, { flag: RED }); ctx.restore();
    shape(ctx, '#6e4a2c', 5, rect(40, 180, 260, 400, 4)); const rb = rng(3); for (let sh = 0; sh < 3; sh++) { const y = 200 + sh * 120; shape(ctx, '#5a3a22', 0, rect(52, y + 104, 236, 10)); let x = 58; while (x < 280) { const w = 16 + rb() * 18, h = 70 + rb() * 26; shape(ctx, ['#8a2a24', '#2f4f6a', '#4a6a3a', '#a8782a'][Math.floor(rb() * 4)], 3, rect(x, y + 104 - h, w, h, 2)); x += w + 2; } }
    shape(ctx, '#8a5e3a', 0, rect(-200, 600, 1700, 300)); line(ctx, [[-200, 600], [1500, 600]], 4, 'rgba(0,0,0,.4)'); }
  function L3(ctx, lt, dur, t) {
    const ml = since(t, 'mail'), dy = since(t, 'diary');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    study(ctx, t);
    const X = 560, Y = 660, S = .38;
    fig(ctx, X, Y, S, P('priuli', 'patrician', { hands: ml > .6 ? { L: [-60, -760], R: [200, -760] } : { L: [-120, -560], R: [120, -560] }, face: { brows: ml > 0 ? 'up' : 'calm', mouth: 'flat', look: ml > 0 ? [.8, -.1] : [0, .3], eyes: blink(t, 7.9, 10.4) }, breathe: breathe(t) }));
    shape(ctx, '#6e4a2c', 5, rect(330, 470, 460, 30, 4)); shape(ctx, '#5a3a22', 5, rect(350, 500, 420, 160));
    if (dy > -.3) { ctx.save(); ctx.translate(470, 462); shape(ctx, '#8a2a24', 4, rect(-80, -10, 160, 14, 3)); shape(ctx, '#f4ecd6', 3, rect(-74, -18, 148, 10, 2)); ctx.restore(); }
    shape(ctx, '#efe6d0', 3.5, rect(700, 420, 18, 50, 3)); glow(ctx, 709, 410, 70, 'rgba(255,200,120,.45)'); shape(ctx, '#ffd27a', 2.5, smooth([[709, 420], [703, 408], [709, 390], [715, 408]]));
    // a courier hands over the letter
    if (ml > -.5) { const cx = FX.approach(t, A.mail - .5, 1400, 880, .35); fig(ctx, cx, Y, .34, P('fisher', 'tunicPoor', { hands: { L: [-260, -720], R: [120, -470] }, face: { brows: 'up', mouth: 'smile', look: [-.8, 0] } }), { mirror: true });
      if (ml < .7) { ctx.save(); ctx.translate(cx - 260 * .34, Y - 720 * .34); shape(ctx, '#f0e2c0', 3.5, rect(-34, -22, 68, 44, 3)); shape(ctx, RED, 2.5, circle(0, 2, 8)); ctx.restore(); } else { ctx.save(); ctx.translate(X + 70 * S, Y - 760 * S - 20); shape(ctx, '#f0e2c0', 3.5, rect(-50, -30, 100, 60, 3)); ctx.restore(); } }
    ctx.restore();
    card(ctx, [['GIROLAMO PRIULI', FX.DISPLAY(30)], ['VENETIAN BANKER · DIARIST', FX.FONT(600, 17)]], 330, 140, since(t, 'priuli') - .3, 400);
    strip(ctx, 'THEN SOME MAIL ARRIVES', 860, 96, ml - .2, { px: 32 });
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1501');
  }

  // ---------- L4: in 1501 he writes down a report passed along from Egypt ----------
  function L4(ctx, lt, dur, t) {
    const yr = since(t, 'y1501'), rp = since(t, 'report'), eg = since(t, 'egypt');
    shape(ctx, '#c8a070', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.02, 1.08), 640, 360);
    shape(ctx, '#7a2a24', 5, rect(140, 80, 1000, 580, 8)); shape(ctx, '#f6eed6', 4, rect(160, 96, 470, 548, 3)); shape(ctx, '#f6eed6', 4, rect(650, 96, 470, 548, 3)); line(ctx, [[640, 96], [640, 644]], 4);
    if (yr > 0) { ctx.save(); ctx.beginPath(); ctx.rect(190, 120, 420 * clamp(yr / .8), 60); ctx.clip(); txt(ctx, 'Adì … 1501', 210, 150, `italic 700 34px Georgia, serif`, '#3a2a1a', 'left'); ctx.restore(); }
    const lines = Math.floor(clamp((t - A.y1501 - .6) / 3.2) * 14);
    for (let i = 0; i < Math.min(lines, 14); i++) { const x0 = i < 7 ? 200 : 690, y = 210 + (i % 7) * 52, len = 360 - ((i * 37) % 120); ctx.save(); ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(x0, y); for (let k = 0; k < len; k += 12) ctx.lineTo(x0 + k, y + Math.sin(k * .3 + i) * 3); ctx.lineWidth = 3; ctx.strokeStyle = '#4a3a2a'; ctx.stroke(); ctx.restore(); }
    if (rp > 0) { const qx = lines < 7 ? 200 + 360 : 690 + 300, qy = 210 + ((lines - 1) % 7) * 52; line(ctx, [[qx, qy], [qx + 40, qy - 80]], 4, '#3a2a1a'); shape(ctx, '#f4efe2', 3, smooth([[qx + 30, qy - 60], [qx + 54, qy - 104], [qx + 40, qy - 108], [qx + 26, qy - 70]])); }
    ctx.restore();
    if (eg > 0) { const s = pop(eg); ctx.save(); ctx.translate(1040, 560); ctx.scale(s, s); shape(ctx, PAPER, 4, rect(-160, -80, 320, 160, 8)); shape(ctx, '#a8d4dc', 3, rect(-150, -70, 300, 140, 6));
      shape(ctx, '#d8c890', 3, poly([[-150, 30], [-60, 10], [20, 30], [150, 10], [150, 70], [-150, 70]])); shape(ctx, '#d8d0a0', 3, poly([[-150, -70], [-40, -70], [-60, -30], [-150, -20]]));
      const k = ease.out(clamp(eg / .8)); line(ctx, [[60, 30], [lerp(60, -110, k), lerp(30, -50, k)]], 5, RED); shape(ctx, RED, 3, circle(60, 30, 7)); txt(ctx, 'EGYPT', 70, 52, `italic 700 16px Georgia, serif`); txt(ctx, 'VENICE', -100, -56, `italic 700 14px Georgia, serif`); ctx.restore(); }
    strip(ctx, 'A REPORT, PASSED ALONG FROM EGYPT', 640, 690, rp, { px: 28 });
    vig(ctx);
  }

  // ---------- L5: Portuguese ships have reached India — by sea, around the bottom of Africa ----------
  function L5(ctx, lt, dur, t) {
    const pg = since(t, 'portuguese'), ind = since(t, 'india'), ar = since(t, 'around');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    worldMap(ctx, t);
    const k = clamp((t - A.portuguese + .2) / (A.africa + 1 - A.portuguese)); const hd = routeDraw(ctx, NEW_ROUTE, ease.inOut(k), '#2f6aa8', 7);
    if (hd) caravel(ctx, hd[0], hd[1] - 8, .32, t);
    if (ar > 0) { ctx.save(); ctx.translate(WPL.cape[0], WPL.cape[1] + 30); const s = pop(ar); ctx.scale(s, s); shape(ctx, PAPER, 3.5, rect(-110, -18, 220, 36, 4)); txt(ctx, 'AROUND THE BOTTOM OF AFRICA', 0, 1, FX.FONT(700, 13)); ctx.restore(); }
    if (ind > 0) { const s = pop(ind); ctx.save(); ctx.translate(WPL.calicut[0], WPL.calicut[1]); ctx.scale(s, s); glow(ctx, 0, 0, 60, 'rgba(255,220,120,.6)'); shape(ctx, GOLD, 3, circle(0, 0, 10)); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'PORTUGUESE SHIPS HAVE REACHED INDIA', 640, 690, pg, { px: 28 }); if (since(t, 'bysea') > 0) strip(ctx, 'BY SEA', 1080, 110, since(t, 'bysea'), { px: 40, color: RED, rot: .03 });
    vig(ctx);
    FX.dateTag(ctx, 'THE CAPE ROUTE, 1498');
  }

  // ---------- L6: at first he doesn't believe it; when it's confirmed — "like a baby without its milk" ----------
  function L6(ctx, lt, dur, t) {
    const bl = since(t, 'believe'), cf = since(t, 'confirmed'), bb = since(t, 'baby');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.1, 1.18), 520, 360);
    study(ctx, t);
    const shake = bl > 0 && bl < 1.2 ? Math.sin(bl * 14) * .12 : 0;
    fig(ctx, 520, 680, .4, P('priuli', 'patrician', { hands: cf > 0 ? { L: [-200, -760], R: [200, -760] } : { L: [-60, -760], R: [200, -760] }, headTilt: shake, face: { brows: cf > .3 ? 'worried' : bl > 0 ? 'strain' : 'calm', mouth: cf > .3 ? 'o' : bl > 0 ? 'frown' : 'flat', look: [.5, .3], eyes: blink(t, 23.7, 26.9) }, breathe: breathe(t) }));
    shape(ctx, '#6e4a2c', 5, rect(290, 490, 460, 30, 4)); shape(ctx, '#5a3a22', 5, rect(310, 520, 420, 160));
    ctx.restore();
    if (bl > 0 && cf < 0) { const s = pop(bl); ctx.save(); ctx.translate(780, 210); ctx.scale(s, s); shape(ctx, '#fff', 4, ellipse(0, 0, 130, 56)); for (let i = 0; i < 3; i++) shape(ctx, '#fff', 3, circle(-110 + i * 16, 62 + i * 14, 9 - i * 2)); txt(ctx, 'IMPOSSIBLE.', 0, 2, FX.DISPLAY(28)); ctx.restore(); }
    if (cf > 0) { const s = slam(cf); ctx.save(); ctx.translate(980, 330); ctx.rotate(.06); ctx.scale(s, s); FX.paperDoc(ctx, 0, 0, 260, 180, { lines: 5, title: 'LISBON', titleSize: 22 }); ctx.restore(); FX.stamp(ctx, 'CONFIRMED', 980, 380, cf - .1, { color: GREEN, size: 34, rot: -.1 }); }
    if (bb > -.8) { const s = slam(bb + .8); ctx.save(); ctx.translate(640, 620); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-440 + 8, -80 + 10, 880, 160); shape(ctx, '#f1e6c8', 4, rect(-440, -80, 880, 160, 3));
      txt(ctx, '“…like a baby without its milk.”', 0, -16, `italic 700 40px Georgia, serif`); txt(ctx, 'GIROLAMO PRIULI, DIARY, 1501 · TRANS. N. CLIFF', 0, 44, FX.FONT(700, 15), '#7a2a24'); ctx.restore(); }
    vig(ctx);
  }

  // ---------- L7: Venice's whole advantage was its seat on one body of water — somebody just found a different ocean ----------
  function L7(ctx, lt, dur, t) {
    const st = since(t, 'seat'), oc = since(t, 'found');
    const MC = WL([16, 37]); ctx.save(); cam(ctx, T.keys(t, [[A.think, 1.7], [A.water + .3, 1.7], [A.found + .6, 1.0]]), T.keys(t, [[A.think, MC[0]], [A.water + .3, MC[0]], [A.found + .6, 640]]), T.keys(t, [[A.think, MC[1]], [A.water + .3, MC[1]], [A.found + .6, 380]]));
    worldMap(ctx, t, { medGold: clamp(st / .6), oceanGlow: clamp(oc / .8) });
    if (st > 0) { const s = pop(st); const [x, y] = WPL.venice; ctx.save(); ctx.translate(x + 10, y + 34); ctx.scale(s * .5, s * .5); shape(ctx, '#a8322a', 4, rect(-40, -20, 80, 30, 6)); shape(ctx, '#c9a14a', 4, rect(-46, -90, 92, 70, 8)); shape(ctx, '#a8322a', 3, rect(-36, -80, 72, 50, 6)); line(ctx, [[-36, 10], [-40, 50]], 6, '#c9a14a'); line(ctx, [[36, 10], [40, 50]], 6, '#c9a14a'); ctx.restore(); }
    ctx.restore();
    if (st > 0 && oc < 0) FX.caption(ctx, "VENICE'S SEAT: ONE BODY OF WATER", st, .1);
    if (oc > 0) strip(ctx, 'A DIFFERENT OCEAN', 640, 110, oc, { px: 44, color: '#2f6aa8' });
    vig(ctx);
  }

  // ---------- L8: the popular version: collapsed on the spot — it didn't; the old spice routes came back for decades ----------
  function L8(ctx, lt, dur, t) {
    const cl = since(t, 'collapsed'), dn = since(t, 'didnt'), cb = since(t, 'cameback');
    if (t < A.didnt + .9) { const fade = clamp((A.didnt + .9 - t) / .4); ctx.save(); ctx.globalAlpha = fade;
      shape(ctx, '#e8d8b8', 0, rect(0, 0, W, H)); ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
      shape(ctx, '#7a2a24', 5, rect(240, 90, 800, 540, 10)); shape(ctx, '#f6eed6', 4, rect(260, 106, 760, 508, 4)); txt(ctx, 'THE POPULAR VERSION', 640, 150, FX.DISPLAY(30), '#7a2a24');
      const fall = cl > 0 ? clamp(cl / 1.4) : 0;
      for (let i = 0; i < 7; i++) { const x = 320 + i * 96, h = 120 + (i * 37) % 100, rot = fall * (i % 2 ? .3 : -.25), dy = fall * fall * 120; ctx.save(); ctx.translate(x + 40, 520 + dy * .3); ctx.rotate(rot); shape(ctx, ['#e8a87a', '#f0d29a', '#d88a6a'][i % 3], 4, rect(-40, -h, 80, h)); shape(ctx, '#b8503a', 4, poly([[-44, -h], [0, -h - 20], [44, -h]])); ctx.restore(); }
      if (fall > .3) for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .5; ctx.filter = 'blur(3px)'; shape(ctx, '#e8dcc8', 0, circle(340 + i * 110, 520 - fall * 40, 40 + fall * 30)); ctx.restore(); }
      txt(ctx, 'VENICE COLLAPSES ON THE SPOT!', 640, 580, FX.DISPLAY(28), '#3a2a1a');
      ctx.restore(); FX.stamp(ctx, 'MYTH', 640, 340, dn, { color: RED, size: 80, rot: -.12 }); ctx.restore(); }
    if (t > A.didnt + .5) { const fade = clamp((t - A.didnt - .5) / .4); ctx.save(); ctx.globalAlpha = fade; ctx.save(); cam(ctx, 1.35, WL([30, 25])[0], WL([30, 25])[1]);
      worldMap(ctx, t); const k = ease.inOut(clamp((t - A.spice + .2) / 1.4)); routeDraw(ctx, OLD_ROUTE, k, GOLD, 8, [1, 0]); routeDraw(ctx, OLD_ROUTE, k, '#a8782a', 3, [10, 8]);
      for (let i = 0; i < 4; i++) { const p = ((t * .12 + i / 4) % 1) * k, idx = Math.floor(p * (OLD_ROUTE.length - 1)), f = p * (OLD_ROUTE.length - 1) - idx; if (idx >= OLD_ROUTE.length - 1) continue; const x = lerp(OLD_ROUTE[idx][0], OLD_ROUTE[idx + 1][0], f), y = lerp(OLD_ROUTE[idx][1], OLD_ROUTE[idx + 1][1], f); shape(ctx, '#c89a62', 3, rect(x - 9, y - 7, 18, 14, 3)); }
      ctx.restore(); ctx.restore(); if (cb > 0) FX.caption(ctx, 'THE OLD SPICE ROUTES CAME BACK FOR DECADES', cb, .1); }
    if (dn > 0 && t < A.didnt + .9) strip(ctx, "IT DIDN'T.", 640, 660, dn, { px: 40 });
  }

  // ---------- L9: economic historians still fight over how hard the Portuguese route hit, and how fast ----------
  function dial(ctx, x, y, label, v, t) { ctx.save(); ctx.translate(x, y); shape(ctx, '#f4efe2', 5, c => c.arc(0, 0, 110, Math.PI, 0)); shape(ctx, null, 4, rect(-110, 0, 220, 4));
    for (let i = 0; i <= 10; i++) { const a = Math.PI + i / 10 * Math.PI; line(ctx, [[Math.cos(a) * 92, Math.sin(a) * 92], [Math.cos(a) * 106, Math.sin(a) * 106]], 3); }
    const a = Math.PI + v * Math.PI; line(ctx, [[0, 0], [Math.cos(a) * 86, Math.sin(a) * 86]], 7, RED); shape(ctx, INK, 0, circle(0, 0, 9)); txt(ctx, label, 0, 40, FX.DISPLAY(24)); ctx.restore(); }
  function L9(ctx, lt, dur, t) {
    const hd = since(t, 'hard'), fs = since(t, 'fast');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8d8b8'], [1, '#c8a878']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#7a5434', 0, rect(-200, 600, 1700, 200));
    dial(ctx, 470, 330, 'HOW HARD?', hd > 0 ? .5 + .38 * Math.sin(t * 2.1) : .2, t); dial(ctx, 810, 330, 'HOW FAST?', fs > 0 ? .5 + .38 * Math.sin(t * 1.7 + 1) : .2, t);
    fig(ctx, 200, 640, .3, P('bowler', 'suit', { hands: { L: [-120, -470], R: [220, -860] }, handShape: { R: 'point' }, face: { brows: 'strain', mouth: 'o', look: [.8, -.2], eyes: blink(t, 50.8) }, breathe: breathe(t) }));
    fig(ctx, 1080, 640, .3, P('young', 'suit', { hands: { L: [-220, -860], R: [120, -470] }, handShape: { L: 'point' }, face: { brows: 'strain', mouth: 'o', look: [-.8, -.2], eyes: blink(t, 52.3) }, breathe: breathe(t + 1) }), { mirror: true });
    ctx.restore();
    strip(ctx, 'ECONOMIC HISTORIANS STILL FIGHT', 640, 100, since(t, 'historians') - .2, { px: 34 });
    if (fs > 0) tag(ctx, 'DEBATED', 640, 520, fs, 26);
    vig(ctx);
  }

  // ---------- L10: the direction was set — the world's main street moves to the Atlantic, and Venice isn't on it ----------
  function L10(ctx, lt, dur, t) {
    const st = since(t, 'set'), ms = since(t, 'street'), at = since(t, 'atlantic'), wn = since(t, 'wasnt');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    worldMap(ctx, t, { oceanGlow: clamp(at / .8) });
    const fadeOld = clamp(ms / 1.5); routeDraw(ctx, OLD_ROUTE, 1, '#a8782a', 6, [10, 8], 1 - fadeOld * .75);
    routeDraw(ctx, NEW_ROUTE, 1, '#2f6aa8', 7); if (at > 0) { const k = ease.out(clamp(at / 1.2)); ctx.save(); ctx.setLineDash([12, 9]); line(ctx, [WPL.lisbon, [lerp(WPL.lisbon[0], 20, k), lerp(WPL.lisbon[1], 220, k)]], 7, '#2f6aa8'); ctx.restore(); if (k > .95) txt(ctx, '→ THE AMERICAS', 110, 250, FX.FONT(700, 16), '#2f5d6b'); }
    // the "main street" sign slides from Venice to Lisbon
    const sk = ease.inOut(clamp((t - A.main + .2) / 1.6)), sx = lerp(WPL.venice[0], WPL.lisbon[0] - 40, sk), sy = lerp(WPL.venice[1] + 60, WPL.lisbon[1] + 60, sk);
    if (ms > -.6) { ctx.save(); ctx.translate(sx, sy); line(ctx, [[0, 0], [0, 60]], 6, '#7a7a80'); shape(ctx, '#2f7a46', 4, rect(-90, -40, 180, 44, 6)); txt(ctx, 'MAIN STREET', 0, -18, FX.DISPLAY(20), '#fff'); ctx.restore(); }
    if (wn > 0) { const [x, y] = WPL.venice; ctx.save(); ctx.globalAlpha = .6; shape(ctx, '#5a5a5a', 0, circle(x, y, 14)); ctx.restore(); tag(ctx, "VENICE: NOT ON IT", x + 90, y + 40, wn, 18); }
    ctx.restore();
    strip(ctx, 'THE DIRECTION WAS SET', 640, 690, st, { px: 30 });
    vig(ctx);
    FX.dateTag(ctx, '1500s');
  }

  // ---------- L11: I'm skipping a lot — wars with Genoa, wars with the Ottomans, two more great plagues — they mattered ----------
  function plagueMask(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#1f1c22', 4, c => { c.moveTo(-60, -40); c.quadraticCurveTo(-60, -110, 0, -116); c.quadraticCurveTo(60, -110, 60, -40); c.lineTo(60, 0); c.lineTo(-60, 0); c.closePath(); });
    shape(ctx, '#efe6d0', 4, c => { c.moveTo(-50, -60); c.quadraticCurveTo(-46, -20, 0, -10); c.quadraticCurveTo(80, 20, 130, 70); c.quadraticCurveTo(60, 40, 0, 30); c.quadraticCurveTo(-46, 20, -50, -60); c.closePath(); });
    for (const d of [-24, 20]) { shape(ctx, '#2a2a30', 3, circle(d, -40, 13)); shape(ctx, 'rgba(255,255,255,.4)', 0, circle(d - 4, -44, 4)); } ctx.restore(); }
  function L11(ctx, lt, dur, t) {
    const sk = since(t, 'skipping'), cards = [['genoa', 'WARS WITH GENOA'], ['ottomans', 'WARS WITH THE OTTOMANS'], ['plagues', 'TWO MORE GREAT PLAGUES']];
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e0c8a0'], [1, '#c8a070']]), 0, rect(0, 0, W, H));
    if (sk > 0) { ctx.save(); ctx.translate(1080, 110); for (let i = 0; i < 2; i++) shape(ctx, '#3a3a40', 0, poly([[-30 + i * 34, -26], [0 + i * 34, 0], [-30 + i * 34, 26]])); ctx.restore(); txt(ctx, "SKIPPING A LOT", 1080, 160, FX.FONT(700, 18)); }
    cards.forEach(([k, label], i) => { const d = since(t, k); if (d <= -.3) return; const done = i < 2 ? clamp((t - A[cards[i + 1][0]] + .3) / .4) : 0;
      const x = lerp(1500, 640, ease.out(clamp((d + .3) / .45))) - done * 900, rot = lerp(.2, -.03 + i * .03, ease.out(clamp((d + .3) / .45))) - done * .3;
      ctx.save(); ctx.translate(x, 380); ctx.rotate(rot); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-310 + 10, -220 + 12, 620, 440); shape(ctx, '#f6eed6', 5, rect(-310, -220, 620, 440, 8));
      ctx.save(); ctx.beginPath(); ctx.rect(-290, -200, 580, 330); ctx.clip(); shape(ctx, grad(ctx, 0, -200, 0, 130, [[0, '#9ad4ee'], [1, '#fbe8c0']]), 0, rect(-290, -200, 580, 330));
      if (k === 'genoa') { shape(ctx, '#4a98b0', 0, rect(-290, 40, 580, 90)); galley(ctx, -120, 80, .45, 4, t, { flag: RED }); ctx.save(); ctx.scale(-1, 1); galley(ctx, -140, 90, .45, 4, t, { flag: '#f4efe2' }); ctx.restore(); shape(ctx, RED, 0, rect(124, -38, 6, 18)); shape(ctx, RED, 0, rect(118, -32, 18, 6)); }
      else if (k === 'ottomans') { shape(ctx, '#4a98b0', 0, rect(-290, 40, 580, 90)); shape(ctx, '#d8c8a0', 4, rect(40, -60, 220, 110)); for (let q = 0; q < 6; q++) shape(ctx, '#d8c8a0', 3, rect(40 + q * 38, -78, 24, 20)); galley(ctx, -120, 90, .45, 4, t, { flag: '#c0303e' }); }
      else { plagueMask(ctx, -90, 60, 1.1); plagueMask(ctx, 150, 70, .8); }
      ctx.restore(); txt(ctx, label, 0, 175, FX.DISPLAY(30)); ctx.restore(); });
    if (since(t, 'mattered') > 0) strip(ctx, 'THEY MATTERED.', 640, 690, since(t, 'mattered'), { px: 34 });
    vig(ctx);
  }

  // ---------- L12: they didn't change the direction (a compass that stays on the Atlantic) ----------
  function L12(ctx, lt, dur, t) {
    const dc = since(t, 'didntchange');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    worldMap(ctx, t, { oceanGlow: .6 }); ctx.save(); ctx.globalAlpha = .55; shape(ctx, '#f3e8cc', 0, rect(-200, -200, 1700, 1100)); ctx.restore();
    ctx.save(); ctx.translate(640, 380); shape(ctx, '#c9a14a', 6, circle(0, 0, 190)); shape(ctx, '#f6eed6', 5, circle(0, 0, 166));
    for (const [n, a] of [['N', -Math.PI / 2], ['E', 0], ['S', Math.PI / 2], ['W', Math.PI]]) txt(ctx, n, Math.cos(a) * 134, Math.sin(a) * 134, FX.DISPLAY(30), n === 'W' ? RED : INK);
    const needle = Math.PI + .25 + FX.ring(dc + .5, .25, .9, 1.6) * (dc > -.5 ? 1 : 0); ctx.save(); ctx.rotate(needle); shape(ctx, RED, 4, poly([[150, 0], [0, -20], [-40, 0], [0, 20]])); shape(ctx, '#3a3a40', 4, poly([[-150, 0], [0, -20], [40, 0], [0, 20]])); ctx.restore(); shape(ctx, GOLD, 4, circle(0, 0, 18)); ctx.restore();
    ctx.restore();
    strip(ctx, "THEY DIDN'T CHANGE THE DIRECTION", 640, 100, dc, { px: 32 }); txt(ctx, 'TOWARD THE ATLANTIC', 250, 620, FX.DISPLAY(24), '#2f5d6b');
    vig(ctx);
  }

  const cut = [[0, L1], [2.05, L2], [6.05, L3], [12.4, L4], [16.5, L5], [22.6, L6], [30.8, L7], [41.0, L8], [48.95, L9], [54.3, L10], [61.25, L11], [68.95, L12]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .6 }, { t: A.nothing, type: 'swell', gain: .4 }, { t: A.mail, type: 'paper', gain: .5 }, { t: A.priuli, type: 'slide', gain: .4 }, { t: A.diary, type: 'paper', gain: .4 },
    { t: A.y1501, type: 'scratch', gain: .4 }, { t: A.report, type: 'scratch', gain: .3 }, { t: A.egypt, type: 'slide', gain: .4 },
    { t: A.portuguese, type: 'whoosh', gain: .4 }, { t: A.india, type: 'swell', gain: .4 }, { t: A.around, type: 'wind', gain: .3 },
    { t: A.believe, type: 'hit', gain: .4 }, { t: A.confirmed, type: 'thud', gain: .7 }, { t: A.baby - .8, type: 'paper', gain: .5 },
    { t: A.seat, type: 'click', gain: .4 }, { t: A.found, type: 'swell', gain: .5 }, { t: A.collapsed, type: 'rattle', gain: .4 }, { t: A.didnt, type: 'thud', gain: .8 },
    { t: A.spice, type: 'slide', gain: .3 }, { t: A.hard, type: 'ratchet', gain: .3 }, { t: A.fast, type: 'ratchet', gain: .3 },
    { t: A.main, type: 'slide', gain: .4 }, { t: A.atlantic, type: 'whoosh', gain: .4 }, { t: A.wasnt, type: 'thud', gain: .5 },
    { t: A.skipping, type: 'whoosh', gain: .4 }, { t: A.genoa - .3, type: 'paper', gain: .5 }, { t: A.ottomans - .3, type: 'paper', gain: .5 }, { t: A.plagues - .3, type: 'paper', gain: .5 },
    { t: A.didntchange, type: 'creak', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.believe - .4, mood: 'mystery' }, { t: A.popular - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-letter.mp3', shots, sfx, moods, images: { barbari: 'assets/img/debarbari-detail.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
