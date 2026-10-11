/* Venice — "Job five: the threat" (narration-jobfive.mp3 = 2.5 s chapter pause + narration-full.mp3 692.4–830.9 s).
 * Anchors = full-recording word times − 689.9. The chapter pause also carries the script's on-screen text
 * "1866: Venice becomes part of Italy". Population bars use only the script's two figures (1951, 2025). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { most: 692.6, out: 695.7, century: 696.73, water: 698.94, factories: 699.98, shore: 701.57, pump: 702.17, region: 703.89, compacts: 705.46, y1950: 708.0, drops: 709.59,
    inches: 711.04, sea: 712.08, up: 713.36, together: 714.6, doorstep: 716.51, foot: 717.7, y1900: 719.09, nov: 720.6, y1966: 721.62, storm: 723.26, adriatic: 724.38, lagoon: 725.35,
    holds: 725.98, gauge: 727.42, six: 728.28, inches2: 729.41, zero: 730.17, highest: 731.54, recorded: 732.49, flooded: 734.34, day: 735.52, answer: 736.97, fifty: 738.09,
    seventy8: 739.82, gates: 740.95, seabed: 742.19, three: 742.98, lagoon2: 744.02, tide: 745.64, air: 747.44, swing: 747.85, sea2: 749.05, late: 751.53, billion: 753.18,
    scandal: 755.63, october: 757.4, rise: 759.34, real: 760.13, first: 761.44, dry: 763.94, work: 765.09, designed: 766.45, five: 767.55, year: 768.4, four: 769.91, hundred: 772.02,
    study: 773.91, twenty: 775.22, once: 778.28, here: 780.09, square: 781.53, morning: 782.03, watched: 783.59, left: 785.34, y1951: 786.55, k175: 788.14, historic: 790.63,
    y2025: 792.1, k48: 794.24, visitors: 798.54, counting: 801.19, beds: 804.4, residents: 805.04, y2024: 806.47, busiest: 807.78, fee: 810.1, walk: 810.6, officials: 812.18,
    thousands: 814.28, registered: 816.62, evenso: 817.72, seventy: 820.25, same: 822.11, fifth: 824.48, look: 827.54, protected: 829.8 };
  const A = {}; for (const k in F) A[k] = F[k] - 689.9; A.end = 142.5;
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
  function blueprintBg(ctx, col = '#2f7ac0') { shape(ctx, col, 0, rect(-400, -400, 2100, 1600));
    ctx.save(); ctx.globalAlpha = .22; for (let x = -400; x < 1700; x += 40) line(ctx, [[x, -400], [x, 1200]], x % 200 ? 1 : 2.5, '#fff'); for (let y = -400; y < 1200; y += 40) line(ctx, [[-400, y], [1700, y]], y % 200 ? 1 : 2.5, '#fff'); ctx.restore(); }

  const still = (ctx, lt, dur, z0 = 1, z1 = 1.05, fx = 640, fy = 380) => cam(ctx, lerp(z0, z1, ease.sine(clamp(lt / dur))), fx, fy);
  function card(ctx, lines, x, y, k, w = 360) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(x + 300, x, e), y); ctx.rotate(.02);
    const h = 30 + lines.length * 34; ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, PAPER, 3.5, rect(-w / 2, -h / 2, w, h, 3)); lines.forEach(([s, f, c], i) => txt(ctx, s, 0, -h / 2 + 32 + i * 34, f, c || INK)); ctx.restore(); }
  function palazzo(ctx, x, y, w, h, col = '#e8b08a') { shape(ctx, col, 4.5, rect(x, y - h, w, h)); for (let r = 0; r < Math.floor(h / 90); r++) for (let c = 0; c < Math.floor(w / 80); c++) shape(ctx, '#4a5a6a', 3, c2 => { const wx = x + 24 + c * 80, wy = y - h + 26 + r * 90; c2.moveTo(wx, wy + 56); c2.lineTo(wx, wy + 18); c2.arc(wx + 18, wy + 18, 18, Math.PI, 0); c2.lineTo(wx + 36, wy + 56); c2.closePath(); });
    shape(ctx, '#b8503a', 4, rect(x - 10, y - h - 14, w + 20, 16)); }
  function person(ctx, x, y, s, col, cam_) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 3, c => { c.moveTo(-16, 0); c.lineTo(-14, -34); c.quadraticCurveTo(0, -44, 14, -34); c.lineTo(16, 0); c.closePath(); }); shape(ctx, '#f0c8a0', 3, circle(0, -52, 12)); if (cam_) shape(ctx, '#2a2a30', 2.5, rect(8, -44, 16, 11, 3)); ctx.restore(); }
  function bed(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#7a5434', 3, rect(-34, -8, 68, 10)); shape(ctx, '#f4efe2', 3, rect(-32, -22, 64, 16, 4)); shape(ctx, '#e8c0a0', 3, rect(-32, -26, 18, 10, 4)); shape(ctx, '#3a7ab8', 3, rect(-12, -24, 44, 16, 4)); ctx.restore(); }
  function gateRow(ctx, x0, y, n, w, ang, col = '#f2c232') { for (let i = 0; i < n; i++) { ctx.save(); ctx.translate(x0 + i * (w + 3), y); ctx.rotate(-ang); shape(ctx, col, 2.5, rect(0, -6, w, 12, 2)); ctx.restore(); } }
  function waterLevel(ctx, y, t, x0 = -200, x1 = 1500, col = V.WATER, a = .85) { ctx.save(); ctx.globalAlpha = a; shape(ctx, col, 4, c => { c.moveTo(x0, y); for (let x = x0; x <= x1; x += 40) c.lineTo(x, y + Math.sin(x * .02 + t * 1.6) * 5); c.lineTo(x1, 1000); c.lineTo(x0, 1000); c.closePath(); }); ctx.restore(); }

  // ---------- h1: chapter card — JOB FIVE, THE THREAT — 1866: Venice becomes part of Italy ----------
  function h1(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#6a88a8'], [.6, '#c8d0cc'], [1, '#e8d8b0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 130], .9);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420); waterBand(ctx, 560, t, -600, 2200, '#4a8aa0'); V.lagoon(ctx, 640, 700, 560, t, { look: [0, -.5], eyes: blink(t, 1.6), mouth: 'o', hat: (c, x, y) => V.hats.mask(c, x, y + 30) }); ctx.restore();
    strip(ctx, 'JOB FIVE', 640, 110, lt - .05, { px: 58 }); strip(ctx, 'THE THREAT', 640, 212, lt - .7, { px: 44, color: RED, rot: .02 });
    if (lt > 1.1) { const s = pop(lt - 1.1); ctx.save(); ctx.translate(1060, 330); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, PAPER, 4, rect(-170, -70, 340, 140, 6)); for (const [i, col] of [[0, '#2f8a4a'], [1, '#f4efe2'], [2, '#c0303e']]) shape(ctx, col, 2.5, rect(-150 + i * 40, -50, 40, 60));
      txt(ctx, '1866', 70, -26, FX.DISPLAY(36)); txt(ctx, 'VENICE BECOMES', 40, 20, FX.FONT(700, 15)); txt(ctx, 'PART OF ITALY', 40, 42, FX.FONT(700, 15)); ctx.restore(); }
    vig(ctx);
  }

  // ---------- h2: for most of this story, the problem was keeping people out ----------
  function h2(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ab8d8'], [1, '#f0e2c0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [90, 140]);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420); waterBand(ctx, 520, t);
    ctx.save(); ctx.translate(200, -40); basilica(ctx, 640, 520, .4, t); ctx.restore();
    V.lagoon(ctx, 640, 700, 560, t, { look: [-.8, -.1], eyes: blink(t, 4.2), mouth: 'smile', hat: (c, x, y) => V.hats.helmet(c, x, y) });
    // armies, plague ships and invaders bounce off the lagoon one after another
    // enemy fleets sail in on the water, hit the lagoon's shallows and are pushed back out (they stay on the water)
    const items = [[0, '#5a5a5a', .25], [.9, '#7a2a2a', .22], [1.8, '#3a3a5a', .27]];
    items.forEach(([d, fl, sc]) => { const p = (lt - d) / 1.1; if (p <= 0 || p > 1.4) return; const x = p < .7 ? lerp(-140, 280, p / .7) : lerp(280, 60, (p - .7) / .7), rock = p > .7 ? Math.sin(Math.PI * (p - .7) / .7) * 8 : 0;
      ctx.save(); ctx.globalAlpha = p > 1.1 ? clamp((1.4 - p) / .3) : 1; galley(ctx, x, 540 + rock, sc, 4, t, { flag: fl }); ctx.restore();
      if (p > .7 && p < .9) { const r = (p - .7) / .2; ctx.save(); ctx.globalAlpha = 1 - r; for (let i = 0; i < 7; i++) shape(ctx, '#fff', 0, circle(330 + Math.cos(i * .9) * 40 * (1 + r), 530 - Math.abs(Math.sin(i * .9)) * 50 * (1 + r), 6)); ctx.restore(); } });
    ctx.restore();
    strip(ctx, 'THE PROBLEM WAS KEEPING PEOPLE OUT', 640, 96, since(t, 'most') + .3, { px: 30 });
    vig(ctx);
  }
  function warrior(ctx, x, y, s, ph, tint) { fig(ctx, x, y, s, P('fisher', 'tunicPoor', { feet: { L: [-30 + Math.sin(ph) * 50, -40], R: [30 - Math.sin(ph) * 50, -40] } }), { tint }); line(ctx, [[x + 120 * s, y - 1100 * s], [x + 140 * s, y - 300 * s]], 20 * s, tint); shape(ctx, tint, 0, circle(x - 90 * s, y - 700 * s, 150 * s)); }

  // ---------- h3: in the 20th century, the problem becomes the water ----------
  function h3(ctx, lt, dur, t) {
    const wt = since(t, 'water');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9aa8b8'], [1, '#e0d8c8']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [80, 130], .7);
    palazzo(ctx, 160, 560, 440, 420, '#e8b08a'); palazzo(ctx, 640, 560, 480, 460, '#f0d29a');
    for (let i = 0; i < 4; i++) shape(ctx, '#e8e0d0', 3.5, rect(380 - i * 10, 560 + i * 26, 160 + i * 20, 26));
    shape(ctx, '#5a3a2a', 4, c => { c.moveTo(410, 560); c.lineTo(410, 450); c.arc(460, 450, 50, Math.PI, 0); c.lineTo(510, 560); c.closePath(); });
    const lvl = wt > -1.5 ? lerp(680, 590, ease.inOut(clamp((wt + 1.5) / 2.4))) : 680; waterLevel(ctx, lvl, t);
    ctx.restore();
    if (since(t, 'century') > 0) { const s = pop(since(t, 'century')); ctx.save(); ctx.translate(1080, 110); ctx.scale(s, s); FX.bigText(ctx, '1900s', 0, 0, 56, { color: GOLD }); ctx.restore(); }
    if (wt > 0) strip(ctx, 'THE PROBLEM BECOMES THE WATER', 640, 96, wt, { px: 34, color: RED });
    vig(ctx);
  }

  // ---------- h4: factories pump groundwater out from under the region; the ground compacts ----------
  function factory(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#8a8a92', 4, rect(-120, -120, 240, 120)); for (let i = 0; i < 3; i++) shape(ctx, '#7a7a82', 4, poly([[-120 + i * 80, -120], [-80 + i * 80, -160], [-40 + i * 80, -120]]));
    for (const cx of [-80, 60]) { shape(ctx, '#a85a4a', 4, rect(cx - 12, -260, 24, 140)); for (let k = 0; k < 3; k++) { const p = (t * .4 + k / 3) % 1; ctx.save(); ctx.globalAlpha = .5 * (1 - p); shape(ctx, '#d8d4cc', 0, circle(cx + Math.sin(p * 4) * 10 + p * 40, -270 - p * 120, 14 + p * 26)); ctx.restore(); } } ctx.restore(); }
  function h4(ctx, lt, dur, t) {
    const pm = since(t, 'pump'), cp = since(t, 'compacts');
    shape(ctx, grad(ctx, 0, 0, 0, 330, [[0, '#a8c4d8'], [1, '#e8dcc4']]), 0, rect(0, 0, W, 340));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 380);
    const sink = cp > -1 ? ease.inOut(clamp((cp + 1) / 2)) * 26 : 0;
    // ground layers: surface, clay, the water-bearing sand (aquifer) that shrinks as it's pumped
    shape(ctx, '#9ab868', 4, poly([[-200, 330], [560, 330], [700, 330 + sink * .6], [1500, 330 + sink], [1500, 380 + sink], [-200, 380]]));
    shape(ctx, '#b89a70', 4, poly([[-200, 380], [1500, 380 + sink], [1500, 520 + sink * .8], [-200, 520]]));
    const aq = pm > 0 ? clamp(pm / 2.6) : 0; shape(ctx, '#7ab8d0', 4, poly([[-200, 520], [1500, 520 + sink * .8], [1500, 640 - aq * 50], [-200, 640 - aq * 50]]));
    for (let i = 0; i < 26; i++) shape(ctx, 'rgba(255,255,255,.5)', 0, circle(-160 + i * 64, 560 + (i % 3) * 18 - aq * 20, 4));
    shape(ctx, '#8a7a62', 4, rect(-200, 640 - aq * 50, 1700, 300));
    factory(ctx, 220, 330, .8, t); factory(ctx, 470, 330, .65, t);
    // wells drawing water up
    for (const x of [260, 500]) { shape(ctx, '#5a5a62', 3.5, rect(x - 8, 330, 16, 220)); if (pm > 0) for (let k = 0; k < 4; k++) { const p = ((t * .8 + k / 4) % 1); shape(ctx, '#7ab8d0', 2, circle(x, 540 - p * 200, 6)); } }
    // Venice across the water, sinking with the ground
    shape(ctx, '#5aa0b4', 0, rect(800, 300 + sink * .5, 700, 40)); ctx.save(); ctx.translate(0, sink); for (let i = 0; i < 5; i++) { const x = 900 + i * 90, h = 70 + (i % 2) * 30; shape(ctx, ['#e8a87a', '#f0d29a'][i % 2], 3.5, rect(x, 320 - h, 76, h)); } ctx.restore();
    if (cp > 0) for (const x of [900, 1100, 1300]) { shape(ctx, RED, 4, poly([[x, 260], [x + 16, 260], [x + 16, 290], [x + 30, 290], [x + 8, 316], [x - 14, 290], [x, 290]])); }
    ctx.restore();
    tag(ctx, 'MAINLAND FACTORIES', 330, 130, since(t, 'factories'), 22); tag(ctx, 'GROUNDWATER PUMPED OUT', 330, 600, pm, 20); if (cp > 0) tag(ctx, 'THE GROUND COMPACTS', 1080, 200, cp, 22);
    vig(ctx);
    FX.dateTag(ctx, 'MARGHERA, 1950s');
  }

  // ---------- h5: twenty years after 1950 the city drops nearly five inches — and the sea is coming up ----------
  function h5(ctx, lt, dur, t) {
    const dp = since(t, 'drops'), su = since(t, 'sea');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#a8c8dc'], [1, '#f0e2c4']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [80, 130]);
    const sink = dp > 0 ? ease.inOut(clamp(dp / 1.6)) * 46 : 0, rise = su > 0 ? ease.inOut(clamp(su / 1.4)) * 40 : 0;
    ctx.save(); ctx.translate(0, sink); palazzo(ctx, 200, 520, 520, 380, '#e8b08a'); shape(ctx, '#e8e0d0', 4, rect(200, 520, 520, 40)); ctx.restore();
    // a measuring staff fixed to the sea floor (it doesn't sink): the building slides past its marks
    shape(ctx, '#f4efe2', 4, rect(800, 200, 60, 440)); for (let i = 0; i <= 16; i++) { const y = 220 + i * 26; line(ctx, [[800, y], [i % 4 ? 820 : 840, y]], 3); if (i % 4 === 0) txt(ctx, String(8 - i / 2), 880, y, FX.FONT(700, 16), INK, 'left'); }
    line(ctx, [[720, 520 + sink], [800, 520 + sink]], 4, RED); line(ctx, [[720, 520], [800, 520]], 3, 'rgba(184,50,42,.4)');
    waterLevel(ctx, 600 - rise, t, -200, 1500, V.WATER, .85);
    if (su > 0) { shape(ctx, '#2f6aa8', 4, poly([[1000, 560 - rise], [1030, 520 - rise], [1060, 560 - rise], [1042, 560 - rise], [1042, 610], [1018, 610], [1018, 560 - rise]])); }
    ctx.restore();
    if (since(t, 'y1950') > 0) { const k = ease.inOut(clamp((t - A.y1950) / 2.4)), yr = Math.round(lerp(1950, 1970, k)), s = pop(since(t, 'y1950')); ctx.save(); ctx.translate(1080, 110); ctx.scale(s, s); FX.bigText(ctx, String(yr), 0, 0, 56, { color: GOLD }); ctx.restore(); }
    if (dp > 0) tag(ctx, '≈ 5 INCHES (12 CM) DOWN', 380, 110, dp, 24); if (su > 0) tag(ctx, 'THE SEA IS COMING UP', 1080, 640, su, 22);
    vig(ctx);
  }

  // ---------- h6: together: the water at Venice's doorstep is about a foot higher than in 1900 ----------
  function h6(ctx, lt, dur, t) {
    const ft = since(t, 'foot'), y1 = since(t, 'y1900');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.05, 1.12), 640, 420);
    shape(ctx, '#e8b08a', 0, rect(-200, -200, 1700, 1100)); for (let y = -200; y < 900; y += 40) line(ctx, [[-200, y], [1500, y]], 2, 'rgba(120,70,40,.15)');
    shape(ctx, '#e8e0d0', 5, rect(380, 140, 520, 520)); shape(ctx, '#5a3a2a', 5, c => { c.moveTo(430, 660); c.lineTo(430, 330); c.arc(640, 330, 210, Math.PI, 0); c.lineTo(850, 660); c.closePath(); });
    for (let i = 0; i < 6; i++) shape(ctx, '#d8d0c0', 3, rect(430, 520 + i * 26, 420, 26));
    const old = 600, now = 520; ctx.save(); ctx.setLineDash([12, 9]); line(ctx, [[300, old], [980, old]], 4, '#5a6a7a'); ctx.restore(); txt(ctx, '1900', 1010, old, FX.DISPLAY(24), '#3a4a5a', 'left');
    const lvl = ft > -.5 ? lerp(old, now, ease.inOut(clamp((ft + .5) / 1.2))) : old; waterLevel(ctx, lvl, t, -200, 1500, '#3a8aa4', .8);
    if (ft > .4) { line(ctx, [[300, now], [980, now]], 4, RED); txt(ctx, 'TODAY', 1010, now, FX.DISPLAY(24), RED, 'left'); shape(ctx, RED, 3, poly([[260, old - 6], [250, now + 10], [270, now + 10]])); }
    ctx.restore();
    if (ft > 0) { const s = pop(ft); ctx.save(); ctx.translate(320, 110); ctx.scale(s, s); FX.bigText(ctx, '≈ +1 FOOT', 0, 0, 56, { color: GOLD }); ctx.restore(); txt(ctx, '(ABOUT 30 CM)', 320, 160, FX.DISPLAY(20)); }
    strip(ctx, 'PUT THE TWO TOGETHER', 900, 96, since(t, 'together') - .2, { px: 30 });
    vig(ctx);
  }

  // ---------- h7: November 4, 1966 — a storm shoves the Adriatic into the lagoon and holds it there ----------
  function h7(ctx, lt, dur, t) {
    const st = since(t, 'storm'), hd = since(t, 'holds');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#5a6a80'], [1, '#a8b8c4']]), 0, rect(-200, -200, 1700, 1100));
    // a view from above: the Adriatic (right), the lido and its inlets, the lagoon and the city (left)
    shape(ctx, '#3a7890', 0, rect(560, -200, 1000, 1100)); shape(ctx, '#7ab0c0', 0, rect(-200, -200, 760, 1100));
    shape(ctx, '#d8c890', 4, c => { c.moveTo(560, -200); c.lineTo(600, -200); c.lineTo(600, 160); c.lineTo(560, 160); c.closePath(); }); shape(ctx, '#d8c890', 4, rect(560, 230, 40, 200)); shape(ctx, '#d8c890', 4, rect(560, 500, 40, 400));
    shape(ctx, '#e8c8a0', 4.5, smooth([[120, 300], [220, 220], [360, 230], [420, 320], [360, 420], [200, 420]]));
    const push = st > 0 ? ease.inOut(clamp(st / 2.2)) : 0;
    for (let i = 0; i < 12; i++) { const y = 40 + i * 56, x = lerp(1300, 640, ((t * .35 + i * .13) % 1)); ctx.save(); ctx.globalAlpha = .7 * push; shape(ctx, '#d8eef4', 0, poly([[x, y], [x + 60, y - 10], [x + 60, y + 10]])); line(ctx, [[x + 60, y], [x + 140, y]], 5, '#d8eef4'); ctx.restore(); }
    for (const y of [195, 465]) { ctx.save(); ctx.globalAlpha = push; for (let k = 0; k < 4; k++) { const x = 560 - ((t * 120 + k * 50) % 200); shape(ctx, '#d8eef4', 0, ellipse(x, y, 26, 8)); } ctx.restore(); }
    if (push > 0) { ctx.save(); ctx.globalAlpha = .35 * push; shape(ctx, '#2f6a80', 0, rect(-200, -200, 760, 1100)); ctx.restore(); }
    ctx.save(); ctx.translate(1080, 160); ctx.rotate(t * 1.2); for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); shape(ctx, 'rgba(230,236,240,.6)', 0, c => { c.moveTo(0, 0); c.quadraticCurveTo(120, -40, 160, 40); c.quadraticCurveTo(80, 0, 0, 0); }); ctx.restore(); } ctx.restore();
    if (hd > 0) { ctx.save(); ctx.globalAlpha = clamp(hd / .4); for (const y of [195, 465]) { shape(ctx, RED, 4, rect(540, y - 30, 12, 60)); } ctx.restore(); }
    ctx.restore();
    if (since(t, 'nov') > 0) { const s = pop(since(t, 'nov')); ctx.save(); ctx.translate(320, 110); ctx.scale(s, s); FX.bigText(ctx, '4 NOV 1966', 0, 0, 52, { color: GOLD }); ctx.restore(); }
    tag(ctx, 'ADRIATIC', 1060, 600, since(t, 'adriatic'), 24); tag(ctx, 'LAGOON', 280, 560, since(t, 'lagoon'), 24); if (hd > 0) tag(ctx, '…AND HOLDS IT THERE', 640, 660, hd, 24);
    vig(ctx);
  }

  // ---------- h8: the tide gauge reads 6 ft 4 in above zero — the highest ever recorded ----------
  function h8(ctx, lt, dur, t) {
    const gg = since(t, 'gauge'), hi = since(t, 'highest');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#7a8aa0'], [1, '#c8ccc8']]), 0, rect(-200, -200, 1700, 1100));
    palazzo(ctx, -60, 640, 360, 520, '#d8a88a');
    // the staff: zero at the bottom, centimetres and feet up the side
    const Z = 640, PX = 2.6; shape(ctx, '#f4efe2', 4.5, rect(560, 60, 90, 600)); for (let cm = 0; cm <= 220; cm += 10) { const y = Z - cm * PX; line(ctx, [[560, y], [cm % 50 ? 590 : 610, y]], 3); if (cm % 50 === 0) txt(ctx, cm + ' cm', 662, y, FX.FONT(700, 16), INK, 'left'); }
    for (let ft = 1; ft <= 7; ft++) { const y = Z - ft * 30.48 * PX; line(ctx, [[540, y], [560, y]], 3, '#2f6aa8'); txt(ctx, ft + ' ft', 532, y, FX.FONT(700, 15), '#2f6aa8', 'right'); }
    // a 6-foot person for scale
    fig(ctx, 860, Z, 183 * PX / 1460, P('young', 'suit', { face: { brows: 'worried', mouth: 'o', look: [-.6, -.5] } }));
    const lvl = gg > -1 ? lerp(0, 194, ease.inOut(clamp((gg + 1) / 2.6))) : 0; waterLevel(ctx, Z - lvl * PX, t, -200, 1500, '#3a7a94', .78);
    if (lvl > 150) { line(ctx, [[520, Z - 194 * PX], [1100, Z - 194 * PX]], 4, RED); }
    ctx.restore();
    if (since(t, 'six') > 0) { const s = pop(since(t, 'six')); ctx.save(); ctx.translate(1060, 120); ctx.scale(s, s); FX.bigText(ctx, '6 FT 4 IN', 0, 0, 52, { color: GOLD }); ctx.restore(); txt(ctx, '194 CM ABOVE ZERO', 1060, 170, FX.DISPLAY(20)); }
    if (hi > 0) FX.stamp(ctx, 'HIGHEST EVER RECORDED', 1000, 300, hi, { color: RED, size: 30, rot: -.06 });
    vig(ctx);
    FX.dateTag(ctx, 'THE TIDE GAUGE, 4 NOV 1966');
  }

  // ---------- h9: the city stays flooded for most of a day (a recreated front page) ----------
  function h9(ctx, lt, dur, t) {
    const fl = since(t, 'flooded');
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 600, 380);
    ctx.save(); ctx.translate(560, 370); ctx.rotate(-.03); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-330 + 10, -320 + 12, 660, 640); shape(ctx, '#ebe4d0', 4, rect(-330, -320, 660, 640, 2));
    txt(ctx, 'THE LAGOON COURIER', 0, -280, `700 40px Georgia, serif`); line(ctx, [[-300, -248], [300, -248]], 3); txt(ctx, 'SATURDAY, 5 NOVEMBER 1966', 0, -232, FX.FONT(700, 13)); line(ctx, [[-300, -218], [300, -218]], 2);
    txt(ctx, 'VENICE UNDER WATER', 0, -180, FX.DISPLAY(40), RED);
    // the photo: the Piazzetta afloat, the column with the lion
    shape(ctx, '#bdb6a6', 3, rect(-290, -150, 580, 300)); ctx.save(); ctx.beginPath(); ctx.rect(-290, -150, 580, 300); ctx.clip(); ctx.filter = 'grayscale(1) contrast(1.1)';
    shape(ctx, '#d8d0c0', 0, rect(-290, -150, 580, 300)); shape(ctx, '#a8a090', 3, rect(-290, -110, 260, 200)); for (let i = 0; i < 6; i++) shape(ctx, '#d8d0c0', 2, c => { const x = -280 + i * 42; c.moveTo(x, 90); c.lineTo(x, 30); c.arc(x + 16, 30, 16, Math.PI, 0); c.lineTo(x + 32, 90); c.closePath(); });
    shape(ctx, '#8a8478', 3, rect(80, -130, 24, 240)); shape(ctx, '#6a645a', 3, ellipse(92, -136, 30, 12)); shape(ctx, '#7a7468', 3, ellipse(150, -110, 60, 30));
    ctx.globalAlpha = .9; shape(ctx, '#9a9688', 0, rect(-290, 60, 580, 100)); for (let i = 0; i < 8; i++) line(ctx, [[-280 + i * 74, 80 + (i % 2) * 20], [-240 + i * 74, 80 + (i % 2) * 20]], 2, '#c8c4b8'); ctx.restore();
    for (let i = 0; i < 6; i++) { line(ctx, [[-290, 180 + i * 20], [-20, 180 + i * 20]], 3, 'rgba(70,64,58,.45)'); line(ctx, [[20, 180 + i * 20], [290 - (i % 2) * 60, 180 + i * 20]], 3, 'rgba(70,64,58,.45)'); }
    ctx.restore();
    ctx.restore();
    if (fl > 0) { const s = pop(fl); ctx.save(); ctx.translate(1060, 260); ctx.scale(s, s); shape(ctx, '#f4efe2', 5, circle(0, 0, 90)); const a = -Math.PI / 2 + ease.inOut(clamp(fl / 1.4)) * Math.PI * 1.7; shape(ctx, 'rgba(58,138,164,.6)', 0, c => { c.moveTo(0, 0); c.arc(0, 0, 84, -Math.PI / 2, a); c.closePath(); }); line(ctx, [[0, 0], [Math.cos(a) * 70, Math.sin(a) * 70]], 6); shape(ctx, INK, 0, circle(0, 0, 8)); ctx.restore(); tag(ctx, 'FLOODED FOR MOST OF A DAY', 1060, 390, fl, 20); }
    vig(ctx);
  }

  // ---------- h10: the answer takes 50+ years — 78 steel gates on the seabed at the three openings ----------
  function h10(ctx, lt, dur, t) {
    const ff = since(t, 'fifty'), g78 = since(t, 'seventy8'), sb = since(t, 'seabed'), th = since(t, 'three');
    blueprintBg(ctx, '#2f78b8');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    const LIDO = [[60, 700], [300, 560], [520, 430], [760, 300], [1000, 170], [1240, 60]];
    shape(ctx, 'rgba(255,255,255,.12)', 3, c => { c.moveTo(-200, -200); c.lineTo(1500, -200); for (const p of [...LIDO].reverse()) c.lineTo(p[0] - 20, p[1] - 40); c.lineTo(-200, 900); c.closePath(); });
    ctx.save(); ctx.setLineDash([]); line(ctx, LIDO, 6, '#fff'); ctx.restore();
    shape(ctx, 'rgba(255,255,255,.25)', 3, smooth([[240, 330], [320, 270], [440, 280], [470, 360], [400, 410], [280, 400]])); txt(ctx, 'VENICE', 360, 340, FX.DISPLAY(22), '#fff');
    const inlets = [['LIDO', 900, 225], ['MALAMOCCO', 640, 365], ['CHIOGGIA', 410, 495]];
    inlets.forEach(([n, x, y], i) => { const k = th - i * .2; shape(ctx, '#2f78b8', 0, circle(x, y, 42)); if (k > 0) { ctx.save(); ctx.globalAlpha = clamp(k / .3); shape(ctx, null, 4, circle(x, y, 50)); ctx.restore(); txt(ctx, n, x + 80, y + 40, FX.DISPLAY(18), '#fff'); }
      if (g78 > 0) { const shown = Math.floor(clamp((g78 - i * .25) / 1.2) * 26); ctx.save(); ctx.translate(x - 50, y + 26); ctx.rotate(-.48); for (let g = 0; g < shown; g++) shape(ctx, '#f2c232', 1.5, rect(g * 4, 0, 3, 10)); ctx.restore(); } });
    ctx.restore();
    if (ff > -.5) { const k = ease.inOut(clamp((ff + .5) / 1.4)), yr = Math.round(lerp(1966, 2020, k)), s = pop(ff + .5); ctx.save(); ctx.translate(1060, 520); ctx.scale(s, s); FX.bigText(ctx, String(yr), 0, 0, 56, { color: GOLD }); ctx.restore(); txt(ctx, 'MORE THAN 50 YEARS', 1060, 570, FX.DISPLAY(20), '#fff'); }
    if (g78 > 0) { const n = Math.min(78, Math.floor(clamp(g78 / 1.6) * 78)), s = pop(g78); ctx.save(); ctx.translate(250, 110); ctx.scale(s, s); FX.bigText(ctx, n + ' STEEL GATES', 0, 0, 44, { color: GOLD }); ctx.restore(); }
    if (sb > 0) tag(ctx, 'LYING FLAT ON THE SEABED', 250, 180, sb, 18);
    vig(ctx);
    FX.dateTag(ctx, 'THE FLOOD BARRIER (MOSE)');
  }

  // ---------- h11: when a big tide comes, they fill with air and swing up to shut out the sea ----------
  function h11(ctx, lt, dur, t) {
    const ar = since(t, 'air'), sw = since(t, 'swing');
    shape(ctx, '#f3e8cc', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    const ang = sw > -.1 ? ease.inOut(clamp((sw + .1) / 1.2)) * 1.05 : 0, seaUp = since(t, 'tide') > 0 ? ease.inOut(clamp(since(t, 'tide') / 2)) * 120 : 0;
    shape(ctx, grad(ctx, 0, 60, 0, 300, [[0, '#9ad0ec'], [1, '#e8e4d8']]), 0, rect(40, 40, 1200, 300));
    waterLevel(ctx, 320 - seaUp, t, 640, 1240, '#2f6a88', .9); waterLevel(ctx, 320, t, 40, 640, '#5aa0b4', .9);
    shape(ctx, '#8a7a5a', 4, rect(40, 560, 1200, 120)); shape(ctx, '#7a7a80', 4, rect(560, 540, 200, 40, 4)); txt(ctx, 'CONCRETE HOUSING ON THE SEABED', 660, 640, FX.FONT(700, 16), '#f4efe2');
    // the gate: a steel box hinged at its foot, lying flat (full of water) → air pumped in → it rises
    ctx.save(); ctx.translate(600, 548); ctx.rotate(-ang); shape(ctx, '#f2c232', 4.5, rect(0, -36, 300, 36, 4)); const fillA = ar > 0 ? clamp(ar / .8) : 0; shape(ctx, '#3a7aa0', 0, rect(6, -30, 288 * (1 - fillA), 24, 3));
    if (ar > 0 && ar < 1.5) for (let i = 0; i < 6; i++) { const p = (t * 1.6 + i / 6) % 1; shape(ctx, '#fff', 2, circle(30 + i * 44, -18 - p * 6, 5)); } ctx.restore(); shape(ctx, '#3a3a40', 4, circle(600, 548, 12));
    line(ctx, [[600, 548], [600, 700]], 0); txt(ctx, 'LAGOON SIDE', 300, 380, FX.DISPLAY(22), '#2f5d6b'); txt(ctx, 'SEA SIDE', 1020, 380 - seaUp * .3, FX.DISPLAY(22), '#f4efe2');
    if (ar > 0) { shape(ctx, '#d8d4cc', 3.5, rect(100, 480, 120, 60, 8)); line(ctx, [[220, 510], [600, 540]], 5, '#7a7a80'); txt(ctx, 'AIR', 160, 510, FX.DISPLAY(20)); }
    ctx.restore();
    strip(ctx, 'HOW THE GATES WORK', 640, 90, lt - .1, { px: 32 }); if (ar > 0) tag(ctx, 'FILL WITH AIR', 300, 200, ar, 22); if (sw > 0) tag(ctx, 'SWING UP — SHUT OUT THE SEA', 960, 200, sw, 22);
    vig(ctx);
  }

  // ---------- h12: years late, ~six billion euros, a corruption scandal ----------
  function h12(ctx, lt, dur, t) {
    const lt_ = since(t, 'late'), bn = since(t, 'billion'), sc = since(t, 'scandal');
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    for (let i = 0; i < 8; i++) { const k = clamp((t - A.late + .8 - i * .12) / 1); if (k <= 0) continue; ctx.save(); ctx.translate(lerp(240, -200 + i * 40, ease.in(k)), lerp(300, -100, ease.in(k))); ctx.rotate(k * 3 + i); shape(ctx, '#f6f0e0', 3, rect(-50, -60, 100, 120, 4)); shape(ctx, RED, 0, rect(-50, -60, 100, 26)); txt(ctx, String(2003 + i * 2), 0, 10, FX.DISPLAY(22)); ctx.restore(); }
    if (bn > -.3) { const n = Math.floor(clamp((bn + .3) / 1.4) * 30); for (let i = 0; i < n; i++) { const c = i % 6, r = Math.floor(i / 6); ctx.save(); ctx.translate(560 + c * 58 + r * 8, 560 - r * 30); shape(ctx, '#8ab89a', 3, rect(-26, -14, 52, 28, 3)); shape(ctx, '#6a9a7a', 0, rect(-8, -14, 16, 28)); ctx.restore(); } }
    if (sc > -.4) { const s = slam(sc + .4); ctx.save(); ctx.translate(1040, 330); ctx.rotate(.05); ctx.scale(s, s); shape(ctx, '#d8b878', 4, rect(-140, -100, 280, 200, 6)); shape(ctx, '#c8a868', 4, rect(-140, -120, 120, 30, 6)); txt(ctx, 'INVESTIGATION', 0, -40, FX.FONT(700, 18)); for (let i = 0; i < 3; i++) shape(ctx, '#8ab89a', 2.5, rect(60 + i * 10, 60 + i * 6, 60, 26, 3)); ctx.restore(); }
    ctx.restore();
    if (lt_ > 0) tag(ctx, 'YEARS LATE', 260, 120, lt_, 26); if (bn > 0) { const s = pop(bn); ctx.save(); ctx.translate(720, 160); ctx.scale(s, s); FX.bigText(ctx, '≈ 6 BILLION EUROS', 0, 0, 50, { color: GOLD }); ctx.restore(); }
    if (sc > 0) FX.stamp(ctx, 'CORRUPTION SCANDAL', 1040, 470, sc, { color: RED, size: 30, rot: -.08 });
    vig(ctx);
  }

  // ---------- h13: October 2020 — the gates rise against a real storm tide; the city stays dry ----------
  function h13(ctx, lt, dur, t) {
    const rs = since(t, 'rise'), dr = since(t, 'dry');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#a8d0e4'], [.55, '#c8d4dc'], [1, '#5a6a80']]), 0, rect(-200, -200, 1700, 1100));
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = .7; shape(ctx, '#6a7a8c', 0, ellipse(900 + i * 150, 120 + (i % 2) * 40, 120, 40)); ctx.restore(); }
    T.blurred(ctx, 1, () => { ctx.save(); ctx.translate(-60, -20); basilica(ctx, 340, 470, .5, t); campanile(ctx, 180, 480, .42); ctx.restore(); });
    waterLevel(ctx, 470, t, -200, 700, '#7ab8cc', .95);
    const sea = 470 - (lt > 0 ? 60 : 0); waterLevel(ctx, sea - Math.sin(t * 2) * 8, t, 700, 1500, '#2f6a88', .95);
    for (let i = 0; i < 5; i++) { const x = 900 + ((t * 80 + i * 120) % 600); shape(ctx, '#e8f4f8', 0, ellipse(x, sea + 6, 30, 6)); }
    const up = rs > -.3 ? ease.inOut(clamp((rs + .3) / 1.4)) : 0; for (let i = 0; i < 14; i++) { const x = 692 + i * 0, y = 640 - i * 18; ctx.save(); ctx.translate(700 - i * 6, 640 - i * 22); ctx.rotate(-up * 1.05); shape(ctx, '#f2c232', 3, rect(0, -8, 120, 16, 3)); ctx.restore(); }
    if (dr > 0) { glow(ctx, 340, 300, 300, `rgba(255,240,180,${.5 * clamp(dr)})`); }
    ctx.restore();
    if (since(t, 'october') > 0) { const s = pop(since(t, 'october')); ctx.save(); ctx.translate(320, 110); ctx.scale(s, s); FX.bigText(ctx, 'OCTOBER 2020', 0, 0, 48, { color: GOLD }); ctx.restore(); }
    if (since(t, 'first') > 0) tag(ctx, 'FIRST TIME AGAINST A REAL STORM TIDE', 960, 620, since(t, 'first'), 18);
    if (dr > 0) FX.stamp(ctx, 'THE CITY STAYS DRY', 340, 560, dr, { color: GREEN, size: 34, rot: -.06 });
    vig(ctx);
  }

  // ---------- h14: they work — designed for ~5 closures a year; ~100 in their first 4½ years ----------
  function h14(ctx, lt, dur, t) {
    const wk = since(t, 'work'), fv = since(t, 'five'), hd = since(t, 'hundred');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8dcc0'], [1, '#d0b890']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 380);
    shape(ctx, 'rgba(255,250,236,.95)', 4, rect(80, 170, 1120, 470, 10));
    txt(ctx, 'DESIGNED FOR', 230, 240, FX.DISPLAY(24)); txt(ctx, 'ACTUAL, FIRST 4½ YEARS', 230, 400, FX.DISPLAY(22));
    const g = (x, y, k) => { ctx.save(); ctx.translate(x, y); ctx.scale(k, k); shape(ctx, '#f2c232', 2.5, rect(-14, -6, 28, 12, 2)); line(ctx, [[-14, 6], [-14, 12]], 2); ctx.restore(); };
    if (fv > -.3) for (let i = 0; i < 5; i++) g(440 + i * 40, 240, pop(fv + .3 - i * .08)); if (fv > .3) txt(ctx, '≈ 5 A YEAR', 700, 240, FX.DISPLAY(24), '#2f5d6b', 'left');
    const n = hd > -1.6 ? Math.min(100, Math.floor(clamp((hd + 1.6) / 2) * 100)) : 0; for (let i = 0; i < n; i++) g(440 + (i % 25) * 28, 340 + Math.floor(i / 25) * 34, 1);
    if (n > 0) txt(ctx, '≈ ' + n, 1150, 400, FX.DISPLAY(30), RED, 'right');
    ctx.restore();
    if (wk > 0) strip(ctx, 'THEY WORK.', 640, 96, wk, { px: 40, color: GREEN });
    if (hd > .3) FX.caption(ctx, 'ABOUT A HUNDRED CLOSURES IN 4½ YEARS', hd - .3, .1);
    vig(ctx);
  }

  // ---------- h15: one study — with 20 more inches of sea level rise, closing roughly once a day ----------
  function h15(ctx, lt, dur, t) {
    const sd = since(t, 'study'), tw = since(t, 'twenty'), on = since(t, 'once');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#a8c8dc'], [1, '#e8dcc4']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 380);
    shape(ctx, '#f4efe2', 4.5, rect(120, 160, 70, 460)); for (let i = 0; i <= 12; i++) line(ctx, [[120, 180 + i * 36], [i % 2 ? 145 : 165, 180 + i * 36]], 3);
    const rise = tw > -.4 ? ease.inOut(clamp((tw + .4) / 1.6)) * 130 : 0; waterLevel(ctx, 560 - rise, t, -200, 420, '#3a8aa4', .85); if (tw > 0) txt(ctx, '+20 IN (50 CM)', 220, 420 - rise, FX.DISPLAY(22), '#2f5d6b', 'left');
    // a calendar: every day crossed with a gate closure
    shape(ctx, '#f6f0e0', 4.5, rect(560, 180, 600, 420, 8)); shape(ctx, RED, 4.5, rect(560, 180, 600, 50, 8)); txt(ctx, 'GATE CLOSURES', 860, 206, FX.DISPLAY(24), '#fff');
    const days = on > -.4 ? Math.floor(clamp((on + .4) / 1.2) * 35) : 0; for (let i = 0; i < 35; i++) { const c = i % 7, r = Math.floor(i / 7), x = 580 + c * 82, y = 250 + r * 68; shape(ctx, '#fbf7ec', 2, rect(x, y, 74, 60, 4)); if (i < days) { shape(ctx, '#f2c232', 2.5, rect(x + 16, y + 22, 42, 16, 3)); } }
    ctx.restore();
    if (sd > 0) tag(ctx, 'ONE STUDY', 860, 120, sd, 24); if (on > .2) strip(ctx, 'ROUGHLY ONCE A DAY', 860, 660, on - .2, { px: 32, color: RED });
    vig(ctx);
  }

  // ---------- h16: the part you couldn't see from the square — while everyone watched the water, the people left ----------
  function h16(ctx, lt, dur, t) {
    const wt = since(t, 'watched'), lf = since(t, 'left');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f6c88a'], [1, '#ffe8bc']]), 0, rect(-200, -200, 1700, 1100)); glow(ctx, 900, 260, 420, 'rgba(255,236,190,.55)');
    for (let i = 0; i < 4; i++) palazzo(ctx, -80 + i * 360, 470, 320, 360, ['#e8b08a', '#f0d29a', '#d8a080', '#e8c8a0'][i]);
    // windows go dark one by one; a sign flips
    const dark = lf > -1 ? Math.floor(clamp((lf + 1) / 2.4) * 10) : 0; for (let i = 0; i < dark; i++) { const b = i % 4, r = Math.floor(i / 4); shape(ctx, '#2a2a34', 0, rect(-80 + b * 360 + 24 + (i % 3) * 80 + 4, 470 - 360 + 26 + r * 90 + 22, 28, 34, 10)); }
    shape(ctx, '#d8c8a8', 4, rect(-200, 470, 1700, 40)); waterLevel(ctx, 510, t);
    // tourists on the quay watch the water gauge...
    shape(ctx, '#f4efe2', 4, rect(980, 330, 30, 180)); for (let i = 0; i < 7; i++) person(ctx, 820 + i * 50, 500, .8, ['#d84a3a', '#3a7ab8', '#e8c14a', '#4a9a5a'][i % 4], i % 2);
    // ...while a removal boat, piled with a family's furniture, slips away behind them
    const bx = lf > -1.2 ? lerp(260, -300, ease.in(clamp((lf + 1.2) / 3))) : 260; ctx.save(); ctx.translate(bx, 580 + Math.sin(t * 1.5) * 3);
    shape(ctx, '#7a5434', 4.5, c => { c.moveTo(-170, -20); c.lineTo(170, -20); c.quadraticCurveTo(160, 16, 120, 18); c.lineTo(-120, 18); c.quadraticCurveTo(-160, 16, -170, -20); c.closePath(); });
    shape(ctx, '#a8402a', 3.5, rect(-130, -80, 110, 60, 10)); shape(ctx, '#c8a878', 3.5, rect(-10, -70, 60, 50, 3)); shape(ctx, '#c8a878', 3.5, rect(56, -60, 50, 40, 3)); shape(ctx, '#8a5a34', 3.5, rect(-110, -130, 70, 50, 3)); line(ctx, [[110, -20], [110, -120]], 4, '#5a3a22'); shape(ctx, '#e8d8a8', 3, rect(80, -150, 60, 34, 4));
    ctx.restore();
    ctx.restore();
    if (since(t, 'square') > 0 && wt < 0) strip(ctx, "THE PART YOU COULDN'T SEE", 640, 96, since(t, 'here'), { px: 30 });
    if (wt > 0) tag(ctx, 'EVERYONE WATCHED THE WATER', 960, 260, wt, 20); if (lf > 0) strip(ctx, 'THE PEOPLE LEFT', 400, 96, lf, { px: 40, color: RED });
    vig(ctx);
  }

  // ---------- h17: 1951: about 175,000 residents — 2025: fewer than 48,000 (the historic city) ----------
  function h17(ctx, lt, dur, t) {
    const a1 = since(t, 'y1951'), a2 = since(t, 'y2025'), k48 = since(t, 'k48');
    shape(ctx, '#f3e8cc', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 380);
    const base = 600, Hmax = 360, b1 = a1 > -.2 ? FX.settle(clamp((a1 + .2) / .8)) * Hmax : 0, b2 = a2 > -.2 ? FX.settle(clamp((a2 + .2) / .8)) * Hmax * 48 / 175 : 0;
    line(ctx, [[200, base], [1080, base]], 5);
    shape(ctx, '#2f6aa8', 4, rect(330, base - b1, 200, b1, 6)); shape(ctx, '#c0303e', 4, rect(750, base - b2, 200, b2, 6));
    // the people inside the bars: each icon ≈ 5,000 residents
    for (let i = 0; i < Math.floor(35 * b1 / Hmax); i++) person(ctx, 352 + (i % 5) * 38, base - 12 - Math.floor(i / 5) * 54, .55, '#f4efe2');
    for (let i = 0; i < Math.floor(10 * b2 / (Hmax * 48 / 175 || 1)); i++) person(ctx, 772 + (i % 5) * 38, base - 12 - Math.floor(i / 5) * 54, .55, '#f4efe2');
    txt(ctx, '1951', 430, base + 36, FX.DISPLAY(32)); txt(ctx, '2025', 850, base + 36, FX.DISPLAY(32));
    if (a1 > .3) txt(ctx, '≈ 175,000', 430, base - b1 - 36, FX.DISPLAY(36), '#2f6aa8'); if (k48 > -.2) txt(ctx, '< 48,000', 850, base - b2 - 36, FX.DISPLAY(36), '#c0303e');
    ctx.restore();
    strip(ctx, 'RESIDENTS OF THE HISTORIC CITY', 640, 90, since(t, 'historic') - 2, { px: 32 }); txt(ctx, 'EACH FIGURE ≈ 5,000 PEOPLE', 1100, 650, FX.FONT(700, 14), '#7a6a5a');
    vig(ctx);
  }

  // ---------- h18: 20–30 million visitors a year, depending on who's counting ----------
  function h18(ctx, lt, dur, t) {
    const vs = since(t, 'visitors'), ct = since(t, 'counting');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8fd0ec'], [1, '#fbecc6']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t);
    shape(ctx, '#f0e6d4', 5, c => { c.moveTo(80, 520); c.quadraticCurveTo(640, 250, 1200, 520); c.lineTo(1200, 560); c.quadraticCurveTo(640, 300, 80, 560); c.closePath(); });
    waterLevel(ctx, 560, t, -200, 1500, V.WATER, .95);
    const r = rng(6); for (let i = 0; i < 70; i++) { const p = ((t * .08 + i / 70) % 1), x = lerp(80, 1200, p), y = 520 - Math.sin(Math.PI * p) * 250 - 6; person(ctx, x, y, .55, ['#d84a3a', '#3a7ab8', '#e8c14a', '#4a9a5a', '#f4efe2', '#a85ab8'][i % 6], r() < .3); }
    ctx.restore();
    if (vs > -.6) { const flick = ct > 0 ? (Math.floor(t * 2.5) % 2 ? '20,000,000' : '30,000,000') : '20–30 MILLION', s = pop(vs + .6); ctx.save(); ctx.translate(640, 110); ctx.scale(s, s); shape(ctx, '#1f2f4f', 5, rect(-300, -50, 600, 100, 10)); FX.bigText(ctx, flick, 0, 0, 52, { color: GOLD }); ctx.restore(); shape(ctx, '#fff8e8', 3, rect(520, 172, 240, 34, 8)); txt(ctx, 'VISITORS A YEAR', 640, 190, FX.DISPLAY(22)); }
    if (ct > 0) tag(ctx, "DEPENDING ON WHO'S COUNTING", 640, 660, ct, 20);
    vig(ctx);
  }

  // ---------- h19: more tourist beds than residents (an apartment block, room by room) ----------
  function h19(ctx, lt, dur, t) {
    const bd = since(t, 'beds'), rs = since(t, 'residents');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#a8d0e4'], [1, '#f6e4c0']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#e8b08a', 5, rect(300, 90, 680, 560)); shape(ctx, '#b8503a', 4, rect(290, 76, 700, 18));
    // a cut-away: 3 floors × 3 rooms; most rooms hold tourist beds and suitcases, two hold a family
    const rooms = [0, 1, 0, 0, 0, 1, 0, 0, 0];
    rooms.forEach((res, i) => { const c = i % 3, r = Math.floor(i / 3), x = 320 + c * 220, y = 110 + r * 180; shape(ctx, res ? '#f8e8c8' : '#eef0f4', 3.5, rect(x, y, 200, 160, 4));
      const k = res ? pop(rs - (i === 5 ? .2 : 0)) : pop(bd - i * .06); if (k <= 0) return; ctx.save(); ctx.translate(x + 100, y + 130); ctx.scale(k, k);
      if (res) { shape(ctx, '#8a5a34', 3, rect(-50, -40, 100, 10, 3)); person(ctx, -30, 0, .9, '#5a6a7a'); person(ctx, 30, 0, .9, '#a85a5a'); }
      else { bed(ctx, -40, 0, 1); bed(ctx, 40, 0, 1); shape(ctx, '#c0303e', 3, rect(-90, -40, 24, 32, 4)); line(ctx, [[-84, -40], [-72, -40]], 3); } ctx.restore(); });
    ctx.restore();
    if (bd > 0) tag(ctx, 'TOURIST BEDS', 160, 300, bd, 22); if (rs > 0) tag(ctx, 'RESIDENTS', 1120, 300, rs, 22);
    if (rs > .3) strip(ctx, 'MORE BEDS THAN RESIDENTS', 640, 690, rs - .3, { px: 30, color: RED });
    vig(ctx);
  }

  // ---------- h20: since 2024, on the busiest days, a day-tripper pays a fee to walk in ----------
  function h20(ctx, lt, dur, t) {
    const bs = since(t, 'busiest'), fe = since(t, 'fee'), wk = since(t, 'walk');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ad4ee'], [1, '#fbe8c0']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [80, 130]);
    palazzo(ctx, 760, 520, 460, 380, '#f0d29a'); shape(ctx, '#d8c8a8', 0, rect(-200, 520, 1700, 300));
    // the checkpoint: a booth, a ticket reader, a barrier arm
    shape(ctx, '#3a6a9a', 4.5, rect(420, 330, 160, 190, 8)); shape(ctx, '#e8f0f4', 3, rect(440, 350, 120, 70, 4)); txt(ctx, 'ACCESS', 500, 375, FX.DISPLAY(18), '#2f5d6b'); txt(ctx, 'FEE', 500, 400, FX.DISPLAY(18), '#2f5d6b');
    const open = wk > -.2 ? ease.out(clamp((wk + .2) / .4)) : 0; ctx.save(); ctx.translate(580, 450); ctx.rotate(-open * 1.4); shape(ctx, RED, 3.5, rect(0, -8, 200, 16, 4)); for (let i = 0; i < 3; i++) shape(ctx, '#fff', 0, rect(30 + i * 60, -8, 26, 16)); ctx.restore();
    const px = wk > 0 ? lerp(380, 900, ease.inOut(clamp(wk / 1.6))) : 380; fig(ctx, px, 560, .26, P('young', 'suit', { feet: wk > 0 ? { L: [-30 + Math.sin(t * 6) * 50, -40], R: [30 - Math.sin(t * 6) * 50, -40] } : undefined, hands: fe > 0 && wk < 0 ? { L: [-120, -470], R: [220, -700] } : { L: [-120, -470], R: [120, -470] }, handShape: { R: 'fist' }, face: { mouth: 'smile', look: [.6, 0] } }));
    if (fe > 0 && wk < .4) coin(ctx, 380 + 220 * .26 + 10, 560 - 700 * .26, 1, t * 5);
    ctx.restore();
    if (since(t, 'y2024') > 0) { ctx.save(); ctx.translate(180, 170); shape(ctx, '#f6f0e0', 4, rect(-110, -90, 220, 180, 6)); shape(ctx, RED, 4, rect(-110, -90, 220, 36, 6)); txt(ctx, 'SINCE 2024', 0, -72, FX.FONT(700, 16), '#fff');
      for (let i = 0; i < 21; i++) { const c = i % 7, r = Math.floor(i / 7), x = -96 + c * 28, y = -40 + r * 38; shape(ctx, '#fbf7ec', 1.5, rect(x, y, 24, 32, 3)); if (bs > 0 && (i % 7 === 5 || i % 7 === 6 || i === 9)) shape(ctx, '#e8c14a', 0, rect(x + 3, y + 3, 18, 26, 2)); } ctx.restore(); }
    if (bs > 0) tag(ctx, 'THE BUSIEST DAYS', 180, 300, bs, 18); if (fe > 0) tag(ctx, 'DAY-TRIPPERS PAY A FEE', 900, 140, fe, 22);
    vig(ctx);
  }

  // ---------- h21: the official count misses thousands who live here unregistered ----------
  function h21(ctx, lt, dur, t) {
    const th = since(t, 'thousands'), rg = since(t, 'registered');
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#2f4f6a', 5, rect(220, 130, 520, 460, 8)); shape(ctx, '#f6f0e0', 4, rect(240, 150, 480, 420, 4)); txt(ctx, 'RESIDENT REGISTER', 480, 190, FX.DISPLAY(26), '#2f4f6a');
    for (let i = 0; i < 10; i++) { line(ctx, [[270, 230 + i * 32], [560, 230 + i * 32]], 3, 'rgba(70,64,58,.45)'); line(ctx, [[600, 230 + i * 32], [690, 230 + i * 32]], 3, 'rgba(70,64,58,.45)'); }
    // outside the book: people who live here but aren't in it
    if (th > -.4) for (let i = 0; i < 12; i++) { const k = pop(th + .4 - i * .06); if (k <= 0) continue; ctx.save(); ctx.globalAlpha = .55; ctx.translate(820 + (i % 4) * 90, 300 + Math.floor(i / 4) * 120); ctx.scale(k, k); person(ctx, 0, 0, 1.4, '#7a8a9a'); ctx.restore(); }
    ctx.restore();
    tag(ctx, 'CITY OFFICIALS SAY…', 480, 650, since(t, 'officials'), 20); if (th > 0) { const s = pop(th); ctx.save(); ctx.translate(990, 160); ctx.scale(s, s); FX.bigText(ctx, '+ THOUSANDS', 0, 0, 44, { color: GOLD }); ctx.restore(); }
    if (rg > 0) tag(ctx, 'LIVING HERE, NOT REGISTERED', 990, 660, rg, 20);
    vig(ctx);
  }

  // ---------- h22: even so, the direction has been the same for seventy years ----------
  function h22(ctx, lt, dur, t) {
    const sv = since(t, 'seventy');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8d8b8'], [1, '#c8a878']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    const k = ease.inOut(clamp((t - A.evenso + .1) / 2.6)); line(ctx, [[180, 520], [1100, 520]], 5); for (let yr = 1951; yr <= 2025; yr += 10) { const x = 180 + (yr - 1951) / 74 * 920; line(ctx, [[x, 510], [x, 530]], 3); txt(ctx, String(yr), x, 556, FX.FONT(700, 16)); }
    const x1 = lerp(180, 1100, k), y1 = lerp(200, 470, k); line(ctx, [[180, 200], [x1, y1]], 16, '#c0303e'); if (k > .1) { const ang = Math.atan2(270, 920); ctx.save(); ctx.translate(x1, y1); ctx.rotate(ang); shape(ctx, '#c0303e', 4, poly([[34, 0], [-12, -26], [-12, 26]])); ctx.restore(); }
    ctx.restore();
    if (sv > 0) { const s = pop(sv); ctx.save(); ctx.translate(640, 120); ctx.scale(s, s); FX.bigText(ctx, '70 YEARS, ONE DIRECTION', 0, 0, 44, { color: GOLD }); ctx.restore(); }
    strip(ctx, 'EVEN SO…', 300, 640, since(t, 'evenso'), { px: 34 });
    vig(ctx);
  }

  // ---------- h23: same water, fifth job — the thing people come to look at, and the thing the city must be protected from ----------
  function h23(ctx, lt, dur, t) {
    const ff = since(t, 'fifth'), lk = since(t, 'look'), pr = since(t, 'protected');
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#9ad4ee'], [.5, '#cfe2e6'], [1, '#6a7a8c']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 130]);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 420);
    waterBand(ctx, 540, t);
    // left: tourists photographing the lagoon; right: gates and sandbags against the sea
    if (lk > -.4) { for (let i = 0; i < 5; i++) person(ctx, 80 + i * 60, 530, .9, ['#d84a3a', '#3a7ab8', '#e8c14a', '#4a9a5a', '#a85ab8'][i], true); for (let i = 0; i < 3; i++) { const k = (t * 1.5 + i / 3) % 1; if (k < .15) glow(ctx, 110 + i * 120, 470, 60, 'rgba(255,255,255,.8)'); } }
    if (pr > -.4) { for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(1040 + i * 30, 540); ctx.rotate(-1.0); shape(ctx, '#f2c232', 2.5, rect(0, -6, 90, 12, 2)); ctx.restore(); } for (let r = 0; r < 3; r++) for (let c = 0; c < 5 - r; c++) shape(ctx, '#c8b088', 3, ellipse(900 + c * 40 + r * 20, 530 - r * 22, 22, 12)); }
    const off = ff > 0 ? clamp(ff / .7) : 0, drop = ff > .25 ? FX.dropBounce(ff - .25, 420, .3) : 999;
    V.lagoon(ctx, 640, 700, 600, t, { look: lk > 0 && pr < 0 ? [-.8, -.2] : pr > 0 ? [.8, -.2] : [0, -.6], eyes: blink(t, 133.6, 138.0), mouth: pr > 0 ? 'flat' : 'smile',
      hat: (c, x, y) => { if (off < 1) { c.save(); c.translate(off * 420, -off * 360 + off * off * 120); c.rotate(off * 2.5); V.hats.mask(c, x, y + 30); c.restore(); }
        if (drop < 999) { c.save(); c.translate(0, -drop); V.hats.lifering(c, x, y + 20); c.restore(); } } });
    ctx.restore();
    strip(ctx, 'SAME WATER.', 470, 96, since(t, 'same'), { px: 44 }); strip(ctx, 'FIFTH JOB.', 830, 96, ff, { px: 44, color: RED, rot: .03 });
    if (lk > 0) tag(ctx, 'THE THING PEOPLE COME TO LOOK AT', 300, 300, lk, 18); if (pr > 0) tag(ctx, 'THE THING THE CITY NEEDS PROTECTING FROM', 960, 300, pr, 18);
    vig(ctx);
  }

  const cut = [[0, h1], [2.55, h2], [6.1, h3], [9.95, h4], [16.85, h5], [24.35, h6], [30.55, h7], [37.35, h8], [43.4, h9], [46.55, h10], [55.2, h11], [59.95, h12], [66.3, h13],
    [74.9, h14], [83.6, h15], [89.9, h16], [96.4, h17], [105.9, h18], [111.9, h19], [116.0, h20], [121.7, h21], [127.5, h22], [131.9, h23]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .6 }, { t: 1.1, type: 'paper', gain: .4 }, { t: A.water, type: 'splash', gain: .4 }, { t: A.factories, type: 'press', gain: .3 }, { t: A.pump, type: 'bubbles', gain: .3 },
    { t: A.compacts, type: 'creak', gain: .4 }, { t: A.drops, type: 'slide', gain: .4 }, { t: A.sea, type: 'swell', gain: .3 }, { t: A.foot, type: 'thud', gain: .5 },
    { t: A.nov, type: 'boom', gain: .5 }, { t: A.storm, type: 'wind', gain: .6 }, { t: A.holds, type: 'thud', gain: .5 }, { t: A.six, type: 'ratchet', gain: .4 }, { t: A.highest, type: 'thud', gain: .8 },
    { t: A.flooded - .2, type: 'paper', gain: .5 }, { t: A.fifty, type: 'ratchet', gain: .3 }, { t: A.seventy8, type: 'click', gain: .4 }, { t: A.three, type: 'click', gain: .4 },
    { t: A.air, type: 'bubbles', gain: .5 }, { t: A.swing, type: 'creak', gain: .5 }, { t: A.late, type: 'paper', gain: .4 }, { t: A.billion, type: 'rattle', gain: .4 }, { t: A.scandal, type: 'thud', gain: .7 },
    { t: A.rise, type: 'creak', gain: .5 }, { t: A.dry, type: 'swell', gain: .5 }, { t: A.work, type: 'click', gain: .5 }, { t: A.hundred, type: 'ratchet', gain: .4 }, { t: A.once, type: 'ratchet', gain: .3 },
    { t: A.left, type: 'thud', gain: .5 }, { t: A.y1951, type: 'thud', gain: .5 }, { t: A.y2025, type: 'thud', gain: .5 }, { t: A.visitors, type: 'whoosh', gain: .4 }, { t: A.beds, type: 'paper', gain: .4 },
    { t: A.fee, type: 'click', gain: .5 }, { t: A.walk, type: 'creak', gain: .4 }, { t: A.thousands, type: 'swell', gain: .3 }, { t: A.seventy, type: 'thud', gain: .5 },
    { t: A.fifth, type: 'whoosh', gain: .5 }, { t: A.fifth + .55, type: 'thud', gain: .4 }, { t: A.look, type: 'click', gain: .4 }, { t: A.protected, type: 'thud', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.nov - .3, mood: 'tense' }, { t: A.answer - .3, mood: 'still' }, { t: A.here - .3, mood: 'mystery' }, { t: A.same - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-jobfive.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
