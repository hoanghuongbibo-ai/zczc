/* New York — Beat 9 "Legacy and close" (narration-legacy.mp3 = 1.8 s pause + narration-full.mp3 794.4–855.12 s + 1.5 s tail).
 * Anchors = full-recording word times − 792.6. Full circle: the corner, the creek under the pavement, the wall under the name, the same water. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { why: 795.04, matter: 795.61, foot: 796.74, sooner: 798.08, writes: 799.63, article: 800.08, wherever: 800.79, downtown: 802.45, dead: 803.38, plant: 804.29, closed: 804.66,
    everybody: 805.69, moving: 806.25, four: 807.86, island: 809.15, check: 810.81, two: 811.13, reason: 813.44, came: 814.09, still: 815.18, newpeople: 816.75, showing: 817.6, sofar: 819.43,
    both: 821.01, yes: 821.83, goback: 823.52, corner: 824.14, wall: 825.02, broad: 825.71, train: 826.74, shoes: 827.51, coffee: 828.89, space: 829.96, pavement: 831.35, creek: 832.2, streetname: 833.45,
    wall2: 834.43, end: 836.27, water: 837.96, written: 839.32, obituary: 840.06, six: 840.75, entire: 843.2, history: 843.81, newyork: 844.39, city: 844.77, sofar2: 845.96, enjoyed: 847.03,
    subscribe: 847.85, comments: 849.63, wrote: 851.74, comingback: 853.07, thanks: 854.48 };
  const A = {}; for (const k in F) A[k] = F[k] - 792.6; A.end = 64.0;

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


  const { harbor, walker, corner, land1609, notice, whereMap } = N;
  const counter = (ctx, x, y, val, k, label, col = GOLD, px = 54) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = FX.DISPLAY(px); const w = ctx.measureText(val).width + 60;
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-w / 2 + 6, -px * .8 + 6, w, px * 1.6)); shape(ctx, '#1d1a17', 0, rect(-w / 2, -px * .8, w, px * 1.6, 10)); txt(ctx, val, 0, 3, FX.DISPLAY(px), col); if (label) txt(ctx, label, 0, px * .8 + 22, FX.FONT(800, 16), '#fff'); ctx.restore(); };

  // ---------- l1: Beat 9 card — why does this matter if you've never set foot here? ----------
  function l1(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380); corner(ctx, t, { light: .6 }); ctx.restore();
    const card = clamp(1 - Math.max(0, lt - 1.9) / .3);
    if (card > 0) { ctx.save(); ctx.globalAlpha = card; shape(ctx, 'rgba(20,20,30,.4)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 9', 640, 230, lt - .05, { px: 30 }); strip(ctx, 'LEGACY', 640, 330, lt - .4, { px: 64, color: GREEN, rot: .02 }); ctx.restore(); }
    if (lt > 2.0) { strip(ctx, 'WHY DOES THIS MATTER', 640, 110, since(t, 'why') + .2, { px: 38 }); if (since(t, 'never') > 0 || since(t, 'foot') > -.6) tag(ctx, 'IF YOU\'VE NEVER SET FOOT HERE?', 640, 210, since(t, 'foot') + .6, 24); }
    vig(ctx);
  }

  // ---------- l2: sooner or later somebody writes that article about wherever you live ----------
  function l2(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ac8e8'], [1, '#f0dcb4']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [70, 130]);
    // anytown: a small main street, a water tower, a factory with a quiet chimney
    shape(ctx, '#a8b878', 0, rect(0, 470, W, 300)); shape(ctx, '#9a9a9a', 0, poly([[540, 470], [740, 470], [960, 760], [320, 760]]));
    line(ctx, [[1120, 470], [1120, 300]], 6, '#7a7a80'); line(ctx, [[1180, 470], [1180, 300]], 6, '#7a7a80'); shape(ctx, '#c8c8d0', 4, rect(1090, 230, 120, 80, 30)); txt(ctx, 'ANYTOWN', 1150, 272, FX.FONT(800, 16), '#5a5a68');
    shape(ctx, '#8a7a70', 4, rect(40, 330, 220, 140)); shape(ctx, '#7a6a60', 4, rect(200, 230, 30, 100)); FX.stamp(ctx, 'CLOSED', 150, 400, since(t, 'closed') + .1, { color: RED, size: 26 });
    for (let i = 0; i < 4; i++) { const x = 300 + i * 70; shape(ctx, ['#e8b08a', '#c8d8a8', '#f0d29a', '#b8c8e0'][i], 3.5, rect(x, 380, 64, 90)); shape(ctx, '#3f5a74', 2, rect(x + 12, 400, 40, 30)); }
    for (let i = 0; i < 4; i++) { const x = 760 + i * 80; shape(ctx, ['#d8c0a0', '#a9b6c4', '#e8c0b0', '#c8b8a0'][i], 3.5, rect(x, 370, 74, 100)); for (let k = 0; k < 3; k++) line(ctx, [[x + 10, 420 + k * 14], [x + 64, 410 + k * 14]], 6, '#8a6a4a'); }
    // the article on a phone screen, headlines arriving
    ctx.save(); ctx.translate(640, 360); ctx.rotate(-.04); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -256, 360, 520, 30)); shape(ctx, '#1d1a17', 5, rect(-180, -260, 360, 520, 30)); shape(ctx, '#fbf8f0', 0, rect(-160, -220, 320, 440, 6));
    txt(ctx, 'LOCAL NEWS', 0, -196, FX.FONT(800, 16), '#7a6a5a');
    [['downtown', 'DOWNTOWN IS DEAD'], ['plant', 'THE PLANT CLOSED'], ['everybody', 'EVERYBODY\'S MOVING AWAY']].forEach(([k, s], i) => { const kk = since(t, k) + .2; if (kk <= 0) return; const e = FX.settle(clamp(kk / .35)); ctx.save(); ctx.translate((1 - e) * 300, -120 + i * 120); shape(ctx, '#f0ead8', 2, rect(-148, -46, 296, 92, 6)); shape(ctx, '#c8c0b0', 0, rect(-136, -34, 70, 68, 4)); txt(ctx, s, 34, -6, FX.DISPLAY(s.length > 18 ? 15 : 19), '#1d1a17'); line(ctx, [[-50, 22], [130, 22]], 3, '#c8c0b0'); ctx.restore(); });
    ctx.restore();
    strip(ctx, 'SOMEBODY WRITES THAT ARTICLE', 640, 70, since(t, 'writes') + .2, { px: 30 }); if (since(t, 'wherever') > 0) tag(ctx, '…ABOUT WHEREVER YOU LIVE', 1000, 140, since(t, 'wherever'), 20);
    vig(ctx);
  }

  // ---------- l3/l4: four hundred years on this island say: check two things before you believe it ----------
  function checklist(ctx, t, k1, k2, y1, y2) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    ctx.save(); ctx.translate(640, 400); ctx.rotate(-.02); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-416, -236, 840, 480)); shape(ctx, '#fbf6ea', 5, rect(-420, -240, 840, 480, 6)); for (let i = 0; i < 9; i++) line(ctx, [[-390, -150 + i * 46], [390, -150 + i * 46]], 1.5, 'rgba(90,120,160,.2)');
    txt(ctx, 'BEFORE YOU BELIEVE IT, CHECK:', 0, -190, FX.DISPLAY(30), '#5a4a38');
    const row = (y, k, txt1, icon, yes) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(0, y); ctx.scale(s, s); shape(ctx, '#fff', 4, rect(-370, -40, 80, 80, 8)); if (yes > 0) { const e = pop(yes); ctx.save(); ctx.translate(-330, 0); ctx.scale(e, e); line(ctx, [[-22, 0], [-6, 18], [26, -22]], 10, GREEN); ctx.restore(); }
      txt(ctx, txt1, -250, 0, FX.DISPLAY(30), '#1d1a17', 'left'); icon(ctx); ctx.restore(); };
    row(-60, k1, 'IS THE REASON PEOPLE CAME STILL THERE?', c => { ctx.save(); ctx.translate(330, 0); ctx.beginPath(); ctx.rect(-60, -50, 120, 100); ctx.clip(); harbor(ctx, 0, 40, 120, t, { eyes: 1, mouth: 'smile', look: [-.4, 0] }); ctx.restore(); }, y1);
    row(110, k2, 'ARE NEW PEOPLE STILL SHOWING UP?', c => { for (let i = 0; i < 3; i++) N.immigrant(ctx, 300 + i * 34, 44, .2, t, i + 2, { still: true }); }, y2);
    ctx.restore();
  }
  function l3(ctx, lt, dur, t) { checklist(ctx, t, since(t, 'check') + .3, since(t, 'newpeople') + .2, 0, 0); strip(ctx, '400 YEARS ON ONE ISLAND SAY:', 640, 70, since(t, 'four') + .2, { px: 30 }); vig(ctx); }
  function l4(ctx, lt, dur, t) { const ys = since(t, 'yes'); checklist(ctx, t, 1, since(t, 'newpeople') + .2, since(t, 'both') + .1, ys);
    if (since(t, 'sofar') > 0) strip(ctx, 'HERE, SO FAR…', 640, 70, since(t, 'sofar'), { px: 32 }); if (ys > .1) FX.stamp(ctx, 'YES & YES', 1060, 640, ys - .1, { color: GREEN, size: 40 }); vig(ctx); }

  // ---------- l5: go back to the corner — Wall Street at Broad; a train under your shoes; coffee in your personal space ----------
  function l5(ctx, lt, dur, t) {
    const tr = since(t, 'train'), cf = since(t, 'coffee');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380); ctx.translate(0, tr > 0 && tr < 1.2 ? Math.sin(t * 50) * 2.5 : 0); corner(ctx, t, { light: .4 }); ctx.restore();
    FX.dateTag(ctx, 'WALL & BROAD · TODAY');
    if (since(t, 'broad') > -.2) tag(ctx, 'WALL STREET, AT BROAD', 640, 110, since(t, 'broad') + .2, 26);
    if (tr > 0) tag(ctx, 'A TRAIN UNDER YOUR SHOES', 640, 190, tr, 20);
    if (cf > -.3) { const k = FX.settle(clamp((cf + .3) / .5)); ctx.save(); ctx.translate(lerp(1500, 1080, k), 470); ctx.rotate(-.12); shape(ctx, '#3a4a6a', 5, c => { c.moveTo(500, 60); c.lineTo(80, 20); c.lineTo(76, 90); c.lineTo(500, 140); c.closePath(); });
      shape(ctx, '#f4efe2', 5, c => { c.moveTo(-40, -110); c.lineTo(40, -110); c.lineTo(30, 100); c.lineTo(-30, 100); c.closePath(); }); shape(ctx, '#2f7a46', 0, ellipse(0, -10, 24, 26)); shape(ctx, '#6a4a2a', 4, rect(-46, -128, 92, 22, 6)); shape(ctx, '#f0c8a0', 4, smooth([[86, 16], [36, 24], [20, 64], [36, 104], [86, 96]])); ctx.restore(); }
    vig(ctx);
  }

  // ---------- l6: under the pavement there's a creek; under the street name there's a wall (x-ray) ----------
  function l6(ctx, lt, dur, t) {
    const ck = since(t, 'creek'), wl = since(t, 'wall2');
    ctx.save(); cam(ctx, 1.05, 640, 380); corner(ctx, t, { light: .4, fg: false });
    // x-ray: a round lens over the pavement shows the 1609 creek and marsh beneath
    if (ck > -.4) { const r = 260 * ease.out(clamp((ck + .4) / .7)); ctx.save(); ctx.beginPath(); ctx.arc(860, 600, r, 0, 7); ctx.clip(); land1609(ctx, t, {}); ctx.restore(); ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = '#fbf6ea'; ctx.beginPath(); ctx.arc(860, 600, r, 0, 7); ctx.stroke(); ctx.restore(); }
    // the palisade's ghost along the street; the sign glows
    if (wl > -.4) { const g = clamp((wl + .4) / .7); ctx.save(); ctx.globalAlpha = .6 * g; for (let k = 0; k < 40; k++) { const s2 = lerp(1.05, .12, k / 39), x = N.LX(s2) + 330 * s2, y = N.PY(760, s2), h = 300 * s2; shape(ctx, '#8a6038', 2, c => { c.moveTo(x - 12 * s2, y); c.lineTo(x - 12 * s2, y - h); c.lineTo(x, y - h - 18 * s2); c.lineTo(x + 12 * s2, y - h); c.lineTo(x + 12 * s2, y); c.closePath(); }); } ctx.restore(); }
    ctx.restore();
    if (wl > -.4) glow(ctx, 1110, 186, 100 * clamp((wl + .4) / .7), 'rgba(255,240,150,.6)');
    if (ck > 0) tag(ctx, 'UNDER THE PAVEMENT: A CREEK', 860, 300, ck, 22);
    if (wl > 0) tag(ctx, 'UNDER THE STREET NAME: A WALL', 420, 110, wl, 22);
    vig(ctx);
  }

  // ---------- l7: and out past the end of the street, the same water (push into the slot; the Harbor rises) ----------
  function l7(ctx, lt, dur, t) {
    const wt = since(t, 'water'), z = lerp(1.0, 3.2, ease.inOut(clamp(lt / (dur * .9))));
    ctx.save(); cam(ctx, z, 640, 350); corner(ctx, t, { light: .8, fg: false }); ctx.restore();
    if (wt > -.4) { const k = ease.out(clamp((wt + .4) / 1.0)); ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, 1500, 640); ctx.clip(); harbor(ctx, 640, 860 - 260 * k, 600, t, { look: [0, -.2], eyes: blink(t, 46.0), mouth: 'smile' }); ctx.restore(); for (let i = 0; i < 6; i++) sparkle(ctx, 360 + i * 110, 520 + (i % 2) * 30, (wt - i * .1) / .9, .9); }
    if (wt > 0) strip(ctx, 'THE SAME WATER', 640, 110, wt, { px: 48, color: '#2f6a9a' });
    vig(ctx);
  }

  // ---------- l8: they've written this city's obituary six times — Count: 6 — Population: 8.8 million ----------
  function l8(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a2420'], [1, '#14100e']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 360, 460, 'rgba(255,220,160,.25)');
    const yrs = ['1776', '1835', '1931', '1975', '2001', '2020'];
    for (let i = 0; i < 6; i++) { const k = clamp((lt + .2 - i * .15) / .3); if (k <= 0) continue; const a = (i - 2.5) * .12, s = pop(k); ctx.save(); ctx.translate(640 + (i - 2.5) * 150, 330 + Math.abs(i - 2.5) * 16); ctx.rotate(a); ctx.scale(s * .9, s * .9);
      shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-86, -110, 180, 230)); shape(ctx, '#fbf6ea', 4, rect(-90, -115, 180, 230, 3)); ctx.lineWidth = 6; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-78, -103, 156, 206);
      txt(ctx, 'NEW YORK', 0, -50, FX.DISPLAY(24)); txt(ctx, 'IS', 0, -18, FX.DISPLAY(20)); txt(ctx, 'FINISHED', 0, 14, FX.DISPLAY(24), RED); txt(ctx, yrs[i], 0, 64, FX.DISPLAY(26), '#5a4a38'); ctx.restore(); }
    counter(ctx, 400, 620, 'COUNT: 6', since(t, 'six') + .2, null, GOLD, 44); counter(ctx, 880, 620, 'POPULATION: 8.8 MILLION', since(t, 'six') + .6, null, '#8ad0a0', 36);
    if (since(t, 'written') > -.2) { ctx.save(); ctx.globalAlpha = clamp((since(t, 'written') + .2) / .6); txt(ctx, 'THEY\'VE WRITTEN ITS OBITUARY SIX TIMES', 640, 90, FX.DISPLAY(32), '#f4ecd8'); ctx.restore(); }
  }

  // ---------- l9: and that's the entire history of New York City. So far. ----------
  function l9(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 340); corner(ctx, t, { light: 1 }); glow(ctx, 640, 350, 240, 'rgba(255,230,160,.7)'); ctx.restore();
    ctx.save(); ctx.globalAlpha = .38; shape(ctx, '#1d1a17', 0, rect(0, 0, W, H)); ctx.restore();
    strip(ctx, 'THE ENTIRE HISTORY OF', 640, 220, since(t, 'entire'), { px: 40 });
    const k = since(t, 'newyork') + .1; if (k > 0) { const s = slam(k); ctx.save(); ctx.translate(640, 350); ctx.rotate(-.02); ctx.scale(s, s); FX.bigText(ctx, 'NEW YORK CITY', 0, 0, 120, { color: GOLD }); ctx.restore(); }
    if (since(t, 'sofar2') > -.2) strip(ctx, '…SO FAR.', 900, 470, since(t, 'sofar2') + .2, { px: 44, color: GREEN, rot: .04 });
    vig(ctx);
  }

  // ---------- l10: subscribe; in the comments: what's a city everyone wrote off that you think is coming back? Thanks for watching. ----------
  function l10(ctx, lt, dur, t) {
    const sb = since(t, 'subscribe'), cm = since(t, 'comments'), th = since(t, 'thanks');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.03), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, 520, [[0, '#f0a868'], [.6, '#ffd8a0'], [1, '#ffeac0']]), 0, rect(-200, -200, 1700, 900)); glow(ctx, 640, 470, 460, 'rgba(255,240,190,.6)'); clouds(ctx, t, [70, 120], .9, '#fff2e0');
    const B = [[-560, 80, 180], [-470, 70, 260], [-390, 80, 210], [-300, 60, 380], [-230, 90, 300], [-130, 70, 520], [-50, 60, 340], [20, 80, 440], [110, 70, 300], [190, 60, 560], [260, 90, 380], [360, 70, 280], [440, 80, 330], [530, 90, 220]];
    B.forEach(([dx, w, h], i) => { shape(ctx, ['#e8b08a', '#a9b6c4', '#f0d29a', '#9fb0c0', '#d8c0a0', '#c8a0b8'][i % 6], 3, rect(640 + dx, 520 - h, w, h)); for (let y = 520 - h + 16; y < 510; y += 26) for (let x = 650 + dx; x < 630 + dx + w; x += 20) shape(ctx, (x * 7 + y) % 3 ? 'rgba(255,220,140,.8)' : 'rgba(60,80,110,.4)', 0, rect(x, y, 9, 12)); });
    waterBand(ctx, 520, t);
    harbor(ctx, 640, 790, 520, t, { look: cm > 0 ? [0, -.7] : [0, -.3], eyes: blink(t, 57.2, 61.0), mouth: 'smile' });
    ctx.restore();
    if (sb > -.2) { const tuck = cm > 0 ? ease.inOut(clamp(cm / .6)) : 0, s = pop(sb + .2) * lerp(1, .55, tuck), press = sb > .8 && sb < 1.1 ? .92 : 1; ctx.save(); ctx.translate(lerp(640, 1110, tuck), lerp(300, 650, tuck)); ctx.scale(s * press, s * press);
      shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -42, 360, 92, 20)); shape(ctx, sb > 1 ? '#7a7a7a' : '#d8282a', 4.5, rect(-180, -48, 360, 92, 20)); txt(ctx, sb > 1 ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 0, FX.DISPLAY(38), '#fff'); ctx.restore(); }
    if (cm > -.2) { const s = pop(cm + .2); ctx.save(); ctx.translate(640, 290); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-404, -84, 820, 180, 18)); shape(ctx, '#fffaf0', 4.5, rect(-410, -90, 820, 180, 18)); shape(ctx, '#fffaf0', 0, poly([[-40, 88], [30, 88], [-30, 130]])); line(ctx, [[-40, 90], [-30, 130], [30, 90]], 4.5);
      txt(ctx, 'WHAT\'S A CITY EVERYONE WROTE OFF', 0, -30, FX.DISPLAY(32)); txt(ctx, 'THAT YOU THINK IS COMING BACK?', 0, 22, FX.DISPLAY(32), GREEN); ctx.restore(); }
    if (th > 0) strip(ctx, 'THANKS FOR WATCHING', 640, 92, th, { px: 46, color: RED });
    vig(ctx);
  }

  const cut = [[0, l1], [5.2, l2], [14.6, l3], [22.8, l4], [30.6, l5], [36.0, l6], [42.0, l7], [46.2, l8], [50.0, l9], [54.0, l10]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: .45, type: 'paper', gain: .4 }, { t: A.downtown, type: 'click', gain: .4 }, { t: A.plant, type: 'click', gain: .4 }, { t: A.everybody, type: 'click', gain: .4 },
    { t: A.check, type: 'paper', gain: .4 }, { t: A.yes, type: 'click', gain: .5 }, { t: A.yes + .25, type: 'click', gain: .5 }, { t: A.train - .2, type: 'rattle', gain: .4 }, { t: A.coffee - .3, type: 'whoosh', gain: .4 },
    { t: A.creek - .3, type: 'splash', gain: .3 }, { t: A.wall2 - .3, type: 'creak', gain: .4 }, { t: A.water - .3, type: 'swell', gain: .5 }, { t: A.six, type: 'thud', gain: .6 }, { t: A.newyork - .1, type: 'thud', gain: .8 },
    { t: A.subscribe + .95, type: 'click', gain: .6 }, { t: A.comments, type: 'paper', gain: .4 }, { t: A.thanks, type: 'thud', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.check - .3, mood: 'under' }, { t: A.goback - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-legacy.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
