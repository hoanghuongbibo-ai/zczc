/* The Maya — Beat 7 "The climax: the long dry (c. 800–950)" (narration-longdry.mp3 = 1.8 s chapter pause + narration-full.mp3 744.8–931.6 s + 1.2 s tail).
 * Anchors = full-recording word times − 743.0. The farmer's field; Lake Chichancanab gypsum; −41/−54/−70 %; the king's trap; a wobbly tower pushed by drought; Toniná 909; the forest; Ending #2; where they went. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { farmer: 747.26, generations: 752.3, and1: 753.58, dry: 756.05, rains: 757.34, corn: 758.42, except: 759.63, late: 761.13, white: 762.91, nearly: 765.62, we: 767.13, precision: 768.83, eight: 770.29, cambridge: 772.36, florida: 773.94, lake: 777.0, during: 779.56, droughts: 779.87, evaporates: 781.4, heavier: 784.34, some1: 785.63, locked: 786.58, crystals: 787.79, measure: 789.53, what1: 794.37, found: 794.65, forty: 799.04, seventy: 804.83, imagine: 806.79, cut: 808.65, years: 810.31, food: 813.06, government: 814.8, depends: 815.63, because: 817.46, trap: 818.06, palace: 821.74, gods: 825.0, rain: 825.95, common: 828.04, so: 828.89, deliver: 831.11, the2: 832.12, explanation: 835.07, strongest: 839.4, but: 841.83, strained: 843.92, people: 845.52, itself: 846.89, bigger: 849.25, harder: 850.24, some2: 851.31, damage: 853.04, warfare: 854.54, north1: 857.56, drought: 859.57, push: 860.16, wobbly: 861.76, what2: 863.47, one: 865.88, carping: 868.81, building: 870.65, crowning: 872.15, the3: 873.86, very: 873.98, long: 875.08, coming: 878.48, january: 882.2, after: 885.17, silent: 888.25, in3: 889.62, forest: 889.77, roots: 891.49, crack: 891.9, trees: 893.46, climb: 894.0, thousands: 898.67, hills: 900.45, thats: 901.43, school: 903.46, two: 905.31, good: 906.29, go: 907.65, died: 908.94, moved: 911.97, north: 912.88, highlands: 915.17, villages: 916.59, and3: 918.66, rose: 920.42, to: 921.29, walled: 923.17, style: 925.59, family: 927.03, people2: 928.09, the4: 929.02, foul: 929.51, state: 930.85 };
  const A = {}; for (const k in F) A[k] = F[k] - 743.0; A.end = 189.8;
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


  const M = G.Maya, { temple, palace, stelaSmall, king, mayaMap, site, MP, mix, castillo } = M;
  const SK = ['#a8704a', '#7a4a2a', '#c08a5a', '#8a5a34', '#b07848'], CL = ['#e8dcc0', '#d8c49a', '#f0e6cc', '#c8b088'];
  const villager = (ctx, x, y, s, t, v, o = {}) => N.walker(ctx, x, y, s, t, v, Object.assign({ plain: true, beads: v % 2 === 0, coat: CL[v % 4], pants: SK[v % 5], skin: SK[v % 5], hair: '#1d1a17', hs: [0, 1, 2, 4][v % 4], shoe: SK[v % 5] }, o));
  const farmer = (ctx, x, y, s, t, o = {}) => villager(ctx, x, y, s, t, 3, Object.assign({ coat: '#f0e6cc' }, o));
  function cross(ctx, x, y, k, r = 70) { if (k <= 0) return; const e = clamp(k / .3); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = '#e8322a';
    ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * clamp(e * 2), y - r + 2 * r * clamp(e * 2)); if (e > .5) { ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * clamp(e * 2 - 1), y - r + 2 * r * clamp(e * 2 - 1)); } ctx.stroke(); ctx.restore(); }
  // a field of corn whose health h (0 dead … 1 lush) and ground dryness d (0 wet … 1 cracked) are set by the shot
  function field(ctx, t, h, d, x0 = -100, x1 = 1380, y = 620) {
    shape(ctx, mix('#6a4a2a', '#b8946a', d), 4, rect(x0, y - 20, x1 - x0, 220)); if (d > .4) { ctx.save(); ctx.globalAlpha = clamp((d - .4) / .4); for (let i = 0; i < 18; i++) { const x = x0 + 40 + (i * 89) % (x1 - x0 - 80), yy = y + 20 + (i * 53) % 140; line(ctx, [[x, yy], [x + 20, yy + 14], [x + 10, yy + 30], [x + 34, yy + 40]], 2.5, '#6a4a2a'); } ctx.restore(); }
    for (let i = 0; i < 9; i++) { const x = x0 + 80 + i * (x1 - x0 - 160) / 8, sw = Math.sin(t * 1.3 + i) * 3 * h, ht = lerp(60, 200, h), col = mix('#a89048', '#4a8a2a', h); line(ctx, [[x, y], [x + sw, y - ht]], 8, col);
      for (let j = 0; j < 3; j++) { const dd = j % 2 ? 1 : -1, yy = y - 30 - j * ht / 4, len = lerp(26, 60, h); shape(ctx, mix('#c8b060', '#6ab048', h), 2, c => { c.moveTo(x + sw * j / 3, yy); c.quadraticCurveTo(x + dd * len * .6, yy - 20 + (1 - h) * 30, x + dd * len, yy + 8 + (1 - h) * 24); c.quadraticCurveTo(x + dd * len * .4, yy - 4, x + sw * j / 3, yy + 6); c.closePath(); }); }
      if (h > .55) shape(ctx, '#f6c945', 2.5, ellipse(x + 10 + sw, y - ht * .55, 7, 18 * h, .3)); } }
  function rainfall(ctx, t, a, x0 = 0, x1 = W, y0 = 0, y1 = 620) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = Math.min(1, a); const n = Math.round(80 * a); for (let i = 0; i < n; i++) { const x = x0 + ((i * 53) % (x1 - x0)), y = y0 + ((t * 620 + i * 97) % (y1 - y0)); line(ctx, [[x, y], [x - 6, y + 22]], 3, 'rgba(80,140,220,.85)'); } ctx.restore(); }
  function cloud(ctx, x, y, s, col = '#e8eef8') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, smooth([[-140, 30], [-150, -10], [-100, -50], [-40, -60], [10, -90], [80, -70], [130, -40], [150, 10], [120, 40], [0, 50]])); ctx.restore(); }
  function sun(ctx, x, y, r, a = 1) { ctx.save(); ctx.globalAlpha = a; glow(ctx, x, y, r * 3, 'rgba(255,220,120,.5)'); for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; line(ctx, [[x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3], [x + Math.cos(an) * r * 1.8, y + Math.sin(an) * r * 1.8]], 5, '#f6a828'); } shape(ctx, '#f6d23a', 4, circle(x, y, r)); ctx.restore(); }
  function barDot(ctx, n, x, y, s, col = '#3a2e24') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (n === 0) { shape(ctx, '#e8dcc0', 3, c => { c.ellipse(0, 0, 30, 18, 0, 0, Math.PI * 2); }); for (const dx of [-14, 0, 14]) line(ctx, [[dx, -12], [dx * .6, 10]], 2.5, col); line(ctx, [[-26, 4], [26, 4]], 2.5, col); }
    else { const bars = Math.floor(n / 5), dots = n % 5; for (let b = 0; b < bars; b++) shape(ctx, col, 0, rect(-34, 10 - b * 16, 68, 10, 4)); for (let d = 0; d < dots; d++) shape(ctx, col, 0, circle((d - (dots - 1) / 2) * 18, 10 - bars * 16 - 4, 6)); } ctx.restore(); }
  function cityHills(ctx, t, k) { // temples sinking into green hills as k → 1
    for (const [x, s, h] of [[220, .7, 260], [520, 1.0, 320], [860, .85, 300], [1110, .6, 240]]) { ctx.save(); ctx.globalAlpha = 1 - clamp((k - .5) * 2); temple(ctx, x, 560, s, { col: mix('#d8cdb4', '#8a9a6a', k), h, w: 120 }); ctx.restore();
      const hk = clamp(k * 1.3); shape(ctx, mix('#4a8a3a', '#3a7a3a', k), 4, c => { const w = 150 * s, hh = (h * s + 120 * s) * hk; c.moveTo(x - w * 1.6, 562); c.quadraticCurveTo(x - w * .6, 562 - hh * 1.1, x, 562 - hh); c.quadraticCurveTo(x + w * .6, 562 - hh * 1.1, x + w * 1.6, 562); c.closePath(); });
      for (let i = 0; i < 6; i++) { const kk = clamp(k * 1.6 - i * .1); if (kk <= 0) continue; shape(ctx, '#3f8a3a', 2.5, circle(x - 90 * s + i * 36 * s, 560 - (h * s + 80 * s) * kk * (.4 + (i % 3) * .2), 26 * s * kk)); } } }

  // ---------- k1: around 850 — a farmer outside a great southern city; the same field for generations ----------
  function k1(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420);
    M.sky(ctx, t, 1.95, 470); M.jungle(ctx, 430, 1.95, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 300));
    for (const [x, s] of [[880, .45], [1020, .6], [1160, .4]]) temple(ctx, x, 480, s, { col: '#e0d4b8', paint: true, h: 280, w: 110 });
    field(ctx, t, .95, 0, -100, 1380, 640); farmer(ctx, 330, 760, .85, t, { still: true, reach: true }); line(ctx, [[330 + 70, 760 - 230], [330 + 110, 760 - 20]], 6, '#6a4a2a');
    ctx.restore();
    FX.dateTag(ctx, 'c. AD 850 · THE SOUTHERN LOWLANDS'); tag(ctx, "YOU'RE A FARMER", 330, 300, since(t, 'farmer'), 24); if (since(t, 'generations') > 0) tag(ctx, 'THE SAME FIELD FOR GENERATIONS', 640, 110, since(t, 'generations'), 26);
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 7 · THE CLIMAX', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE LONG DRY', 640, 350, lt - .35, { px: 66, color: '#c86a2a', rot: .02 }); tag(ctx, 'c. AD 800–950', 640, 440, lt - .7, 26); ctx.restore(); }
    vig(ctx);
  }

  // ---------- k2: every year the same way — dry season, then the rains, then corn ----------
  function k2(ctx, lt, dur, t) {
    const dk = clamp(since(t, 'dry') / .6), rk = clamp(since(t, 'rains') / .4), ck = clamp(since(t, 'corn') / .8);
    const h = lerp(lerp(.95, .15, dk), 1, ck), d = lerp(dk, 0, rk);
    M.sky(ctx, t, rk > 0 && ck < 1 ? lerp(2, 1.6, rk) : 2, 470); M.jungle(ctx, 430, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 300));
    if (dk > 0 && rk < 1) sun(ctx, 1040, 120, 50, 1 - rk);
    if (rk > 0) { cloud(ctx, 640, 120, 1.1 * pop(since(t, 'rains')), '#d8dce8'); rainfall(ctx, t, rk * (1 - ck * .8), 300, 1000, 160, 620); }
    field(ctx, t, h, d, -100, 1380, 640); farmer(ctx, 200, 760, .7, t, { still: true });
    // the yearly wheel
    ctx.save(); ctx.translate(1110, 330); const seg = [['DRY', '#e8a83a', dk], ['RAINS', '#3a8ad8', rk], ['CORN', '#4a9a3a', ck]]; for (let i = 0; i < 3; i++) { const a0 = -Math.PI / 2 + i * 2 * Math.PI / 3; shape(ctx, seg[i][2] > 0 ? seg[i][1] : '#d8d0c0', 3, c => { c.moveTo(0, 0); c.arc(0, 0, 90, a0, a0 + 2 * Math.PI / 3); c.closePath(); }); const mx = Math.cos(a0 + Math.PI / 3) * 56, my = Math.sin(a0 + Math.PI / 3) * 56; txt(ctx, seg[i][0], mx, my, FX.DISPLAY(18), '#fff'); } shape(ctx, '#fbf6ea', 3, circle(0, 0, 20)); ctx.restore();
    tag(ctx, 'EVERY YEAR, THE SAME WAY', 640, 80, lt - .1, 26);
    vig(ctx);
  }

  // ---------- k3: except the rains have been late. Then light. Then some years, barely there ----------
  function k3(ctx, lt, dur, t) {
    const lk = clamp(since(t, 'late') / .6), wk = clamp(since(t, 'white') / .6), bk = clamp(since(t, 'nearly') / .8);
    const rainAmt = lerp(.9, .5, wk) * (1 - bk * .85) * clamp(1 - (1 - lk) * .9), h = lerp(.8, .25, bk) - wk * .2, d = lerp(.2, .9, bk);
    M.sky(ctx, t, 2, 470); M.jungle(ctx, 430, lerp(2, 2.4, bk), t); shape(ctx, mix('#7aa858', '#b8a868', bk), 0, rect(-600, 470, 2600, 300));
    sun(ctx, 1080, 110, 46, .4 + bk * .6); cloud(ctx, 560, 120, lerp(1.0, .45, bk), mix('#c8ccd8', '#f4f4f8', bk)); rainfall(ctx, t, rainAmt, 380, 760, 160, 620);
    field(ctx, t, Math.max(.1, h), d, -100, 1380, 640); farmer(ctx, 200, 760, .7, t, { still: true });
    // a rain-gauge jar emptying
    ctx.save(); ctx.translate(1080, 520); shape(ctx, 'rgba(255,255,255,.6)', 4, rect(-50, -140, 100, 160, 14)); const lvl = lerp(.9, .15, (wk + bk) / 2); shape(ctx, '#5a96d8', 0, rect(-46, 16 - 150 * lvl, 92, 150 * lvl, 10)); for (let i = 1; i < 5; i++) line(ctx, [[-50, 20 - i * 32], [-30, 20 - i * 32]], 3); ctx.restore();
    tag(ctx, 'LATE', 300, 120, since(t, 'late'), 26); tag(ctx, 'LIGHT', 460, 170, since(t, 'white'), 26); tag(ctx, 'BARELY THERE', 640, 220, since(t, 'nearly'), 26);
    vig(ctx);
  }

  // ---------- k4: 2018 — a team from Cambridge and Florida, gypsum layers at the bottom of Lake Chichancanab ----------
  function k4(ctx, lt, dur, t) {
    const [fx, fy] = MP(M.SITES.chichancanab); ctx.save(); T.cam(ctx, lerp(1.2, 2.2, ease.inOut(clamp(lt / 3))), lerp(640, fx, ease.inOut(clamp(lt / 3))), lerp(360, fy, ease.inOut(clamp(lt / 3)))); mayaMap(ctx, t);
    site(ctx, 'chichancanab', since(t, 'lake') + .4, 'LAKE CHICHANCANAB', { r: 10, px: 18, col: '#2f4a8a' }); ctx.restore();
    counter(ctx, 160, 110, '2018', since(t, 'eight') + .1, null, GOLD, 40);
    const card = (y, k, s) => { if (k <= 0) return; const e = pop(k); ctx.save(); ctx.translate(980, y); ctx.scale(e, e); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -36, 400, 80)); shape(ctx, '#fbf6ea', 4, rect(-200, -40, 400, 80, 8)); txt(ctx, s, 0, 2, FX.DISPLAY(24), '#2f4a8a'); ctx.restore(); };
    card(120, since(t, 'cambridge'), 'UNIVERSITY OF CAMBRIDGE'); card(210, since(t, 'florida'), 'UNIVERSITY OF FLORIDA');
    if (since(t, 'precision') > 0) strip(ctx, 'SURPRISING PRECISION', 640, 640, since(t, 'precision'), { px: 34 });
    vig(ctx);
  }
  function lakeSection(ctx, t, lvl, o = {}) { // a cutaway of the lake: water level lvl (0..1), sediment with gypsum
    shape(ctx, grad(ctx, 0, 0, 0, 300, [[0, '#8ad0f0'], [1, '#f4e6c4']]), 0, rect(0, 0, W, 300)); shape(ctx, '#f4e6c4', 0, rect(0, 300, W, 460));
    shape(ctx, '#8ab868', 4, poly([[-20, 300], [200, 290], [300, 300], [300, 760], [-20, 760]])); shape(ctx, '#8ab868', 4, poly([[980, 300], [1100, 290], [1300, 300], [1300, 760], [980, 760]]));
    const top = lerp(470, 300, lvl); shape(ctx, '#4a96c8', 3, c => { c.moveTo(300, top); c.lineTo(980, top); c.lineTo(940, 520); c.lineTo(340, 520); c.closePath(); });
    const L = ['#c8b088', '#e8dcc0', '#b89a70', '#e8dcc0', '#a88a60', '#e8dcc0', '#c8b088']; for (let i = 0; i < 7; i++) shape(ctx, L[i], 2, poly([[340 + i * 6, 520 + i * 32], [940 - i * 6, 520 + i * 32], [940 - (i + 1) * 6, 552 + i * 32], [340 + (i + 1) * 6, 552 + i * 32]]));
    shape(ctx, '#7a6a4a', 4, poly([[300, 300], [340, 520], [380, 760], [300, 760]])); shape(ctx, '#7a6a4a', 4, poly([[980, 300], [940, 520], [900, 760], [980, 760]]));
    if (o.crystals) for (let i = 0; i < 7; i++) if (i % 2 === 1) for (let j = 0; j < 8; j++) { const x = 380 + j * 70 + (i % 4) * 10, y = 536 + i * 32, g = o.crystals * (.6 + .4 * Math.sin(t * 3 + j + i)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, x, y, 22, `rgba(200,230,255,${.6 * g})`); ctx.restore(); shape(ctx, '#f4f8ff', 1.5, poly([[x, y - 12], [x + 7, y], [x, y + 12], [x - 7, y]])); } }
  function k5(ctx, lt, dur, t) {
    lakeSection(ctx, t, lerp(1, .55, clamp((t - A.evaporates + .5) / 2.5)));
    sun(ctx, 1100, 90, 44, 1);
    for (let i = 0; i < 14; i++) { const x = 340 + (i * 47) % 600, ph = (t * .6 + i * .13) % 1, y = lerp(380, 120, ph); if (since(t, 'evaporates') < -.3) continue; ctx.save(); ctx.globalAlpha = 1 - ph; shape(ctx, '#bfe4ff', 2, circle(x, y, 7)); ctx.restore(); }
    // heavy water left behind
    if (since(t, 'heavier') > -.3) { const k = clamp((since(t, 'heavier') + .3) / .6); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = k; const x = 380 + (i * 61) % 520, y = 470 + (i * 23) % 40; shape(ctx, '#1d4a8a', 2, circle(x, y, 10)); shape(ctx, '#fff', 0, rect(x - 4, y - 2, 8, 4, 1)); ctx.restore(); } tag(ctx, 'HEAVIER WATER LEFT BEHIND', 640, 600, k, 24); }
    if (since(t, 'droughts') > 0) tag(ctx, 'IN A DROUGHT, MORE WATER EVAPORATES', 640, 80, since(t, 'droughts'), 24);
    vig(ctx);
  }
  function k6(ctx, lt, dur, t) {
    const ck = clamp((t - A.locked + .3) / 1.4); lakeSection(ctx, t, .55, { crystals: ck });
    if (since(t, 'crystals') > -.2) { const k = pop(since(t, 'crystals') + .2); ctx.save(); ctx.translate(1080, 560); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, circle(6, 8, 110)); shape(ctx, '#fbf6ea', 5, circle(0, 0, 110)); shape(ctx, '#e8f0ff', 4, poly([[0, -70], [44, 0], [0, 70], [-44, 0]])); for (let i = 0; i < 4; i++) { shape(ctx, '#1d4a8a', 2, circle(-16 + (i % 2) * 30, -22 + Math.floor(i / 2) * 40, 9)); } ctx.restore(); line(ctx, [[760, 600], [970, 560]], 3, 'rgba(60,40,20,.5)'); tag(ctx, 'GYPSUM CRYSTAL · WATER LOCKED INSIDE', 1080, 690, since(t, 'crystals'), 18); }
    if (since(t, 'measure') > 0) strip(ctx, 'MEASURING THE ANCIENT WATER ITSELF', 640, 90, since(t, 'measure'), { px: 32, color: '#2f4a8a' });
    if (since(t, 'locked') > 0) tag(ctx, 'LAYER BY LAYER, YEAR BY YEAR', 640, 170, since(t, 'locked'), 22);
    vig(ctx);
  }

  // ---------- k7: rainfall dropped 41–54% compared with today; up to 70% at the worst ----------
  function k7(ctx, lt, dur, t) {
    deskBg(ctx, t); shape(ctx, '#fbf6ea', 4, rect(140, 120, 1000, 480, 10)); line(ctx, [[220, 520], [1080, 520]], 4); line(ctx, [[220, 520], [220, 160]], 4);
    txt(ctx, 'YEARLY RAINFALL', 640, 150, FX.DISPLAY(26), '#3a2a1a');
    const bar = (x, val, lab, col, k, sub) => { if (k <= 0) return; const e = ease.out(clamp(k / .8)), hh = 320 * val * e; shape(ctx, col, 3.5, rect(x - 70, 520 - hh, 140, hh, 6)); txt(ctx, lab, x, 552, FX.DISPLAY(20)); if (sub) txt(ctx, sub, x, 520 - hh - 24, FX.DISPLAY(26), col); };
    bar(360, 1, 'TODAY', '#3a8ad8', lt + .2, '100%');
    if (since(t, 'forty') > -.2) { const k = since(t, 'forty') + .2, e = ease.out(clamp(k / .8)); shape(ctx, '#e8a83a', 3.5, rect(570, 520 - 320 * .59 * e, 140, 320 * .59 * e, 6)); shape(ctx, 'rgba(232,168,58,.4)', 0, rect(570, 520 - 320 * .59 * e, 140, 320 * .13 * e)); txt(ctx, 'c. 850', 640, 552, FX.DISPLAY(20)); if (e > .8) txt(ctx, '−41% TO −54%', 640, 520 - 320 * .59 - 24, FX.DISPLAY(26), '#c86a2a'); }
    if (since(t, 'seventy') > -.2) bar(920, .3, 'WORST STRETCHES', '#c8322a', since(t, 'seventy') + .2, 'UP TO −70%');
    tag(ctx, 'Evans et al., Science 2018 · Lake Chichancanab', 640, 650, since(t, 'found') + .3, 20);
    if (since(t, 'found') > 0) strip(ctx, 'WHAT THEY FOUND', 640, 70, since(t, 'found'), { px: 36 });
    vig(ctx);
  }

  // ---------- k8: imagine your water cut in half for years — and your food and your government depend on it ----------
  function k8(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    const hk = clamp((since(t, 'cut') + .3) / .8);
    ctx.save(); ctx.translate(300, 470); shape(ctx, 'rgba(255,255,255,.55)', 5, poly([[-90, -200], [90, -200], [70, 100], [-70, 100]])); const lvl = lerp(.85, .42, hk); shape(ctx, '#5a96d8', 0, poly([[-70 - 20 * lvl, 100 - 300 * lvl], [70 + 20 * lvl, 100 - 300 * lvl], [70, 100], [-70, 100]])); ctx.restore();
    if (since(t, 'cut') > 0) tag(ctx, 'CUT IN HALF', 300, 640, since(t, 'cut'), 26); if (since(t, 'years') > 0) tag(ctx, 'FOR YEARS', 300, 690, since(t, 'years'), 22);
    // the stack that stands on the water
    const items = [['WATER', '#5a96d8', 'water'], ['FOOD', '#e8a83a', 'food'], ['GOVERNMENT', '#7a4a8a', 'government']];
    const wob = since(t, 'depends') > 0 ? Math.sin(t * 5) * .04 * clamp(since(t, 'depends')) : 0;
    ctx.save(); ctx.translate(880, 640); ctx.rotate(wob); for (let i = 0; i < 3; i++) { const k = i === 0 ? clamp(since(t, 'food') + 1) : since(t, items[i][2]) + .1; if (k <= 0) continue; const e = FX.settle(clamp(k / .4)); ctx.save(); ctx.translate(0, -i * 130 - (1 - e) * 200); shape(ctx, items[i][1], 4, rect(-160 + i * 20, -120, 320 - i * 40, 120, 10)); txt(ctx, items[i][0], 0, -60, FX.DISPLAY(32), '#fff'); ctx.restore(); } ctx.restore();
    if (since(t, 'depends') > 0) tag(ctx, 'ALL OF IT DEPENDS ON THE WATER', 880, 120, since(t, 'depends'), 24);
    vig(ctx);
  }

  // ---------- k9: here's the trap — the king's whole job is to talk to the gods who send the rain. And the rain isn't coming ----------
  function k9(ctx, lt, dur, t) {
    const dry = clamp((since(t, 'common') + .2) / .8);
    M.sky(ctx, t, 2, 470); sun(ctx, 1110, 100, 44, .6 + dry * .4); M.jungle(ctx, 430, lerp(2, 2.3, dry), t); shape(ctx, mix('#7aa858', '#b8a868', dry), 0, rect(-600, 470, 2600, 300));
    temple(ctx, 420, 600, .85, { col: '#e0d4b8', paint: true, h: 300, w: 140 }); king(ctx, 420, 600 - .85 * 300 - 4, .34, t, { reach: true, cape: '#c8322a' });
    if (since(t, 'gods') > -.3) { ctx.save(); ctx.globalAlpha = clamp((since(t, 'gods') + .3) / .5) * (1 - dry); cloud(ctx, 760, 120, .7, '#e8eef8'); ctx.restore(); }
    field(ctx, t, lerp(.5, .15, dry), lerp(.5, 1, dry), 820, 1380, 660); farmer(ctx, 980, 760, .62, t, { still: true });
    // palace vs hut
    if (since(t, 'palace') > -.2) { const k = pop(since(t, 'palace') + .2); ctx.save(); ctx.translate(190, 200); ctx.scale(k, k); palace(ctx, 0, 0, .35, { paint: true }); txt(ctx, 'HIM', 0, 26, FX.DISPLAY(20)); ctx.restore(); ctx.save(); ctx.translate(1180, 300); ctx.scale(k, k); shape(ctx, '#e8dcc0', 3, rect(-40, -40, 80, 40, 12)); shape(ctx, '#c8a050', 3, c => { c.moveTo(-52, -32); c.quadraticCurveTo(0, -96, 52, -32); c.closePath(); }); txt(ctx, 'YOU', 0, 26, FX.DISPLAY(20)); ctx.restore(); }
    if (since(t, 'trap') > 0) strip(ctx, "HERE'S THE TRAP", 640, 80, since(t, 'trap'), { px: 40, color: '#c8322a' });
    if (since(t, 'rain') > 0) tag(ctx, 'HE SAYS HE CAN BRING THE RAIN', 640, 160, since(t, 'rain'), 24);
    if (dry > .3) tag(ctx, "THE RAIN ISN'T COMING", 980, 450, dry, 24);
    vig(ctx);
  }
  // ---------- k10: so what happens to a king who can't deliver? ----------
  function k10(ctx, lt, dur, t) {
    M.sky(ctx, t, 2.2, 470); sun(ctx, 1110, 100, 44, 1); M.jungle(ctx, 430, 2.3, t); shape(ctx, '#b8a868', 0, rect(-600, 470, 2600, 300));
    ctx.save(); T.cam(ctx, lerp(1.0, 1.8, ease.inOut(clamp(lt / dur))), 420, 330); temple(ctx, 420, 600, .85, { col: '#e0d4b8', paint: true, h: 300, w: 140 }); king(ctx, 420, 600 - .85 * 300 - 4, .34, t, { cape: '#c8322a', ph: Math.sin(t * 6) }); ctx.restore();
    strip(ctx, "A KING WHO CAN'T DELIVER?", 900, 300, since(t, 'deliver') + .3, { px: 38, color: '#c8322a' });
    vig(ctx, .5);
  }

  // ---------- k11: no one clean explanation — but drought is the strongest single piece of evidence ----------
  function k11(ctx, lt, dur, t) {
    shape(ctx, '#b88a58', 0, rect(0, 0, W, H)); for (let i = 0; i < 300; i++) shape(ctx, i % 2 ? 'rgba(90,60,30,.25)' : 'rgba(255,230,190,.25)', 0, circle((i * 97) % W, (i * 53) % H, 2 + (i % 3))); shape(ctx, '#7a5434', 10, rect(14, 14, W - 28, H - 28, 8));
    const C = [['DROUGHT', 300, 300, '#c86a2a', 1.25], ['WAR', 700, 220, '#c8322a', .9], ['OVERPOPULATION', 1000, 330, '#7a4a8a', .9], ['POLITICS', 620, 500, '#2f4a8a', .9], ['TRADE', 980, 560, '#2f7a46', .9]];
    for (let i = 1; i < 5; i++) line(ctx, [[C[0][1], C[0][2]], [C[i][1], C[i][2]]], 3, '#c8322a');
    for (let i = 0; i < 5; i++) { const k = clamp((lt - .1 - i * .25) / .4); if (k <= 0) continue; const [nm, x, y, col, s] = C[i], hl = i === 0 && since(t, 'strongest') > 0; ctx.save(); ctx.translate(x, y); ctx.scale(pop(k) * s * (hl ? 1 + .05 * Math.sin(t * 4) : 1), pop(k) * s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-116, -56, 240, 120)); shape(ctx, '#fbf6ea', 4, rect(-120, -60, 240, 120, 6)); shape(ctx, col, 0, rect(-120, -60, 240, 28, 6)); txt(ctx, nm, 0, 10, FX.DISPLAY(nm.length > 10 ? 20 : 26)); shape(ctx, '#e8423a', 3, circle(0, -64, 9)); ctx.restore(); }
    if (since(t, 'explanation') > 0) strip(ctx, 'NO ONE CLEAN EXPLANATION', 640, 80, since(t, 'explanation'), { px: 34 });
    if (since(t, 'strongest') > 0) FX.stamp(ctx, 'STRONGEST SINGLE EVIDENCE', 300, 470, since(t, 'strongest'), { color: '#c86a2a', size: 30 });
    vig(ctx);
  }

  // ---------- k12–k13: an already strained system — a wobbly tower that the drought pushes over ----------
  const BLOCKS = [['PACKED WITH PEOPLE', 'people', '#7a4a8a'], ['AT WAR WITH ITSELF', 'itself', '#c8322a'], ['BUILD BIGGER', 'bigger', '#e8a83a'], ['FIGHT HARDER', 'harder', '#c86a2a']];
  function tower(ctx, t, n, wob, fall, hl = -1) { ctx.save(); ctx.translate(640, 640); ctx.rotate(wob + ease.in(fall) * 1.2); for (let i = 0; i < n; i++) { const b = BLOCKS[i % 4], k = clamp(n - i); ctx.save(); ctx.translate((i % 2 ? 14 : -14) * (1 + fall * 3), -i * 92 - 92); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-196, 6, 400, 86)); shape(ctx, b[2], 4, rect(-200, 0, 400, 86, 8)); if (hl === i) { ctx.lineWidth = 8; ctx.strokeStyle = '#f6c945'; ctx.strokeRect(-204, -4, 408, 94); } txt(ctx, b[0], 0, 44, FX.DISPLAY(26), '#fff'); ctx.restore(); } ctx.restore(); }
  function k12(ctx, lt, dur, t) {
    deskBg(ctx, t); shape(ctx, '#8a5a34', 0, rect(0, 640, W, 80));
    ctx.save(); ctx.setLineDash([12, 10]); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(90,60,30,.45)'; for (let i = 0; i < 4; i++) ctx.strokeRect(440 + (i % 2 ? 14 : -14), 548 - i * 92, 400, 86); ctx.restore();
    const n = [0, 1, 2, 3].filter(i => since(t, BLOCKS[i][1]) > -.2).length; tower(ctx, t, n, Math.sin(t * 2.2) * .02 * n, 0);
    strip(ctx, 'A SYSTEM ALREADY STRAINED', 640, 80, Math.max(lt - .1, since(t, 'strained')), { px: 36 });
    vig(ctx);
  }
  const STRESS = [['ENVIRONMENTAL DAMAGE', 'damage', '#4a8a3a'], ['WARFARE', 'warfare', '#c8322a'], ['TRADE ROUTES SHIFTING NORTH', 'north1', '#2f7a46']];
  function k13(ctx, lt, dur, t) {
    deskBg(ctx, t); shape(ctx, '#8a5a34', 0, rect(0, 640, W, 80));
    const pk = clamp((since(t, 'push') + .1) / .8), fall = clamp((since(t, 'wobbly') + .2) / 1.0);
    tower(ctx, t, 4, Math.sin(t * 2.6) * .03 + pk * .06, fall);
    for (let i = 0; i < 3; i++) { const k = since(t, STRESS[i][1]) + .1; if (k <= 0 || pk > .3) continue; tag(ctx, 'SOME STRESS: ' + STRESS[i][0], 1000, 160 + i * 70, k, 20); }
    // the drought: a hot hand pushing the tower
    if (since(t, 'drought') > -.3) { const k = clamp((since(t, 'drought') + .3) / .6), x = lerp(-200, 200, ease.out(k)) + pk * 120; ctx.save(); ctx.translate(x, 380); shape(ctx, '#e8742a', 5, rect(-160, -70, 260, 140, 60)); for (let i = 0; i < 4; i++) shape(ctx, '#e8742a', 4, rect(80, -60 + i * 32, 70, 28, 14)); txt(ctx, 'DROUGHT', -30, 0, FX.DISPLAY(32), '#fff'); ctx.restore(); }
    if (since(t, 'push') > 0) strip(ctx, 'THE PUSH', 640, 80, since(t, 'push'), { px: 44, color: '#c86a2a' });
    if (since(t, 'wobbly') > .6) { ctx.save(); ctx.translate(640, 680); const s = pop(since(t, 'wobbly') - .6); ctx.scale(s, s); shape(ctx, '#1d1a17', 0, rect(-420, -30, 840, 60, 10)); txt(ctx, 'CAUSES DEBATED — DROUGHT + WAR + OVERPOPULATION + POLITICAL BREAKDOWN', 0, 2, FX.DISPLAY(18), GOLD); ctx.restore(); }
    vig(ctx);
  }

  // ---------- k14: one by one, the southern cities stop carving, stop building, stop crowning kings ----------
  const SOUTH = [[-89.62, 17.22], [-89.74, 18.11], [-92.05, 17.48], [-89.14, 14.84], [-90.18, 16.43], [-91.11, 17.16], [-90.97, 16.9], [-89.06, 16.76], [-89.4, 17.06], [-92.01, 16.9], [-89.04, 15.27], [-88.85, 16.95]];
  function k14(ctx, lt, dur, t) {
    const [fx, fy] = MP([-90.4, 16.8]); ctx.save(); T.cam(ctx, 1.7, fx, fy); mayaMap(ctx, t, { today: false });
    for (let i = 0; i < SOUTH.length; i++) { const [x, y] = MP(SOUTH[i]), off = clamp((t - A.one - i * .45) / .4); shape(ctx, mix('#c8322a', '#8a8a8a', off), 3, circle(x, y, 11)); if (off > 0) { ctx.save(); ctx.globalAlpha = off; shape(ctx, 'rgba(60,60,60,.25)', 0, circle(x, y, 22)); ctx.restore(); } }
    ctx.restore();
    const ic = (x, key, lab, draw) => { const k = since(t, key) + .1; if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, 600); ctx.scale(s, s); shape(ctx, '#fbf6ea', 4, circle(0, 0, 54)); draw(); ctx.restore(); cross(ctx, x, 600, k - .2, 44); tag(ctx, lab, x, 680, k, 20); };
    ic(330, 'carping', 'NO MORE MONUMENTS', () => { shape(ctx, '#bcae90', 3, rect(-18, -36, 36, 64, 8)); line(ctx, [[20, -20], [44, -40]], 6, '#6a4a2a'); });
    ic(640, 'building', 'NO MORE BUILDING', () => { for (const x of [-26, 26]) line(ctx, [[x, 30], [x, -36]], 5, '#8a6a3a'); for (let j = 0; j < 3; j++) line(ctx, [[-26, 20 - j * 22], [26, 20 - j * 22]], 4, '#8a6a3a'); });
    ic(950, 'crowning', 'NO MORE KINGS CROWNED', () => { shape(ctx, '#c8a040', 3, c => { c.moveTo(-30, 18); c.lineTo(-26, -16); c.lineTo(-12, 0); c.lineTo(0, -24); c.lineTo(12, 0); c.lineTo(26, -16); c.lineTo(30, 18); c.closePath(); }); });
    if (since(t, 'one') > 0) strip(ctx, 'ONE BY ONE', 640, 80, since(t, 'one'), { px: 40 });
    vig(ctx);
  }

  // ---------- k15: the very last known Long Count date — Toniná, Chiapas — a period that ended in January AD 909 ----------
  function k15(ctx, lt, dur, t) {
    deskBg(ctx, t);
    // a drawn monument (Monument 101 is a small carved stone; this is a drawing, not the real piece)
    ctx.save(); ctx.translate(380, 620); const k = pop(lt + .1); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, ellipse(0, 6, 190, 20)); shape(ctx, '#b8ab90', 5, rect(-170, -440, 340, 440, 16));
    shape(ctx, '#d8cdb4', 3, rect(-140, -420, 280, 60, 14)); shape(ctx, '#8a7c62', 0, ellipse(0, -390, 50, 20));
    const LC = [10, 4, 0, 0, 0]; for (let i = 0; i < 5; i++) { const y = -320 + i * 66, hl = since(t, 'long') > 0; shape(ctx, hl ? '#f8f0c8' : '#d8cdb4', 3, rect(-130, y - 28, 120, 56, 12)); barDot(ctx, LC[i], -70, y + 2, .8); shape(ctx, '#d8cdb4', 3, rect(10, y - 28, 120, 56, 12)); shape(ctx, '#7a6c56', 2, smooth([[30, y - 14], [70, y - 20], [110, y - 4], [100, y + 16], [50, y + 18], [28, y]])); }
    ctx.restore();
    if (since(t, 'long') > 0) tag(ctx, '10 · 4 · 0 · 0 · 0', 380, 660, since(t, 'long'), 22);
    tag(ctx, 'TONINÁ MONUMENT 101 (drawing)', 380, 110, lt + .1, 20);
    { const k = since(t, 'coming') + .1; if (k > 0) { ctx.save(); ctx.translate(900, 240); const s = pop(k); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -96, 400, 200)); shape(ctx, '#9ad0f0', 4, rect(-200, -100, 400, 200, 10)); shape(ctx, '#e8dcb0', 3, smooth([[-200, -40], [-60, -80], [80, -40], [200, -60], [200, 100], [-200, 100]])); shape(ctx, '#c8322a', 3, circle(-20, 20, 10)); txt(ctx, 'TONINÁ', -20, 54, FX.DISPLAY(24)); txt(ctx, 'CHIAPAS, MEXICO', 0, -70, FX.FONT(800, 18), '#2f4a8a'); ctx.restore(); } }
    if (since(t, 'january') > 0) counter(ctx, 900, 480, 'JANUARY, AD 909', since(t, 'january'), null, GOLD, 40);
    if (since(t, 'very') > 0) strip(ctx, 'THE VERY LAST KNOWN LONG COUNT DATE', 820, 600, since(t, 'very'), { px: 26, color: '#c8322a' });
    vig(ctx);
  }

  // ---------- k16: after that, in the southern lowlands, the stones go silent ----------
  function k16(ctx, lt, dur, t) {
    M.sky(ctx, t, 1.25, 470); M.jungle(ctx, 430, 1.25, t); shape(ctx, '#8a9a6a', 0, rect(-600, 470, 2600, 300)); shape(ctx, '#c8c0a8', 4, rect(-100, 600, 1500, 200));
    temple(ctx, 640, 560, .8, { col: '#c8bca0', h: 300, w: 140 }); for (let i = 0; i < 6; i++) stelaSmall(ctx, 150 + i * 200 + (i > 2 ? 120 : 0), 640, 1.4);
    if (since(t, 'silent') > 0) { ctx.save(); ctx.globalAlpha = clamp(since(t, 'silent') / .8); txt(ctx, 'SILENCE', 640, 160, FX.DISPLAY(56), 'rgba(255,255,255,.8)'); ctx.restore(); }
    vig(ctx, .7);
  }

  // ---------- k17: the forest moves in — roots crack the plazas, trees climb the pyramids, green hills ----------
  function k17(ctx, lt, dur, t) {
    const rk = clamp((t - A.roots + .3) / 1.6);
    shape(ctx, '#c8c0a8', 0, rect(0, 0, W, H)); for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) shape(ctx, mix('#d8d0bc', '#bcb49a', ((r + c) % 3) / 3), 2.5, rect(c * 150 - 20 + (r % 2) * 70, r * 125, 146, 121, 4));
    for (let i = 0; i < 7; i++) { const k = clamp(rk * 1.3 - i * .08); if (k <= 0) continue; const x = 80 + i * 190, pts = []; for (let j = 0; j <= 12 * k; j++) pts.push([x + Math.sin(j * .9 + i) * 40, j * 60]); if (pts.length > 1) { line(ctx, pts, 14 - i % 3 * 3, '#6a4a2a'); for (let j = 1; j < pts.length; j += 2) line(ctx, [pts[j], [pts[j][0] + 50 * (j % 4 ? 1 : -1), pts[j][1] + 30]], 5, '#7a5a3a'); } for (let j = 0; j < 8 * k; j++) shape(ctx, '#4a8a3a', 2, ellipse(x + 30 * Math.sin(j * 2.1 + i), j * 90 + 30, 30, 14, j)); }
    if (rk > 0) for (let i = 0; i < 9; i++) line(ctx, [[100 + i * 130, 300 + (i % 3) * 100], [140 + i * 130, 340 + (i % 3) * 100], [120 + i * 130, 380 + (i % 3) * 100]], 4 * rk, '#3a2e24');
    if (since(t, 'forest') > 0) strip(ctx, 'THE FOREST MOVES IN', 640, 80, since(t, 'forest'), { px: 40, color: '#2f7a46' });
    if (since(t, 'crack') > 0) tag(ctx, 'ROOTS CRACK THE PLAZAS', 640, 640, since(t, 'crack'), 24);
    vig(ctx);
  }
  function k18(ctx, lt, dur, t) {
    const gk = clamp((t - A.climb + .2) / (A.hills - A.climb + .6));
    M.sky(ctx, t, 1.9, 470); M.jungle(ctx, 430, 1.9, t); shape(ctx, '#5a9a4a', 0, rect(-600, 470, 2600, 300));
    cityHills(ctx, t, gk);
    for (let i = 0; i < 16; i++) { const k = clamp(gk * 1.4 - (i % 5) * .08); if (k <= 0) continue; ctx.save(); ctx.translate(-20 + i * 85, 700); ctx.scale(k, k); line(ctx, [[0, 0], [4, -120]], 14, '#6a4a2a'); for (const [dx, dy, r] of [[-36, -120, 44], [36, -126, 48], [0, -160, 54]]) shape(ctx, '#3f8a3a', 3, circle(dx, dy, r)); ctx.restore(); }
    if (since(t, 'climb') > 0) tag(ctx, 'TREES CLIMB THE PYRAMIDS', 640, 90, since(t, 'climb'), 24);
    if (since(t, 'thousands') > 0) tag(ctx, 'CITIES OF TENS OF THOUSANDS', 640, 150, since(t, 'thousands'), 22);
    if (since(t, 'hills') > 0) strip(ctx, '…ARE GREEN HILLS', 640, 240, since(t, 'hills'), { px: 44, color: '#2f7a46' });
    vig(ctx);
  }

  // ---------- k19: that's the "Maya collapse" you read about in school — ending number two ----------
  function k19(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); ctx.translate(560, 340); ctx.rotate(-.02); const s = slam(lt + .2); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-330, -150, 680, 320)); shape(ctx, '#fbf6ea', 5, rect(-340, -160, 680, 320, 4)); ctx.lineWidth = 10; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-322, -142, 644, 284);
    txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 22), '#5a5048'); txt(ctx, 'THE MAYA', 0, -36, FX.DISPLAY(66)); txt(ctx, 'ARE FINISHED.', 0, 34, FX.DISPLAY(56), RED); line(ctx, [[-200, 84], [200, 84]], 3, '#9a8a7a'); txt(ctx, 'Ending #2 — the Classic "collapse", c. 800–950', 0, 112, FX.FONT(700, 17), '#5a5048'); ctx.restore();
    const n = since(t, 'two') > 0 ? 2 : 1; counter(ctx, 1060, 230, `ENDINGS: ${n}`, lt + .1, 'DECLARED', GOLD, 44); if (since(t, 'two') > 0 && since(t, 'two') < .6) glow(ctx, 1060, 230, 120, 'rgba(255,220,120,.5)');
    if (since(t, 'school') > 0) tag(ctx, '"THE MAYA COLLAPSE" — AS IN SCHOOL', 560, 560, since(t, 'school'), 22);
    vig(ctx);
  }

  // ---------- k20: where did they go? Some died; many moved — north to the Yucatán, south to the highlands, smaller villages ----------
  function k20(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, 1.25, 640, 330); mayaMap(ctx, t, { today: false });
    shape(ctx, 'rgba(120,120,120,.35)', 3, c => { const p = [[-91.6, 18.2], [-89.0, 18.4], [-88.4, 16.3], [-89.5, 15.9], [-90.8, 16.0], [-91.9, 16.9]].map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); });
    // a few dots fade (some died), most travel
    const DOTS = 40; for (let i = 0; i < DOTS; i++) { const [sx, sy] = MP([-91.3 + (i * 37 % 26) / 10, 16.3 + (i * 13 % 18) / 10]); const died = i % 7 === 0, dir = i % 3; const mk = clamp((t - A.moved - (i % 8) * .12) / 2.2);
      if (died) { ctx.save(); ctx.globalAlpha = 1 - clamp((since(t, 'died') + .2) / 1.2) * .85; shape(ctx, '#7a6a5a', 0, circle(sx, sy, 6)); ctx.restore(); continue; }
      const [tx, ty] = dir === 0 ? MP([-89.6 + (i % 5) * .3, 20.2 + (i % 3) * .3]) : dir === 1 ? MP([-91.4 + (i % 4) * .4, 15.0 - (i % 3) * .2]) : MP([-89.4 + (i % 5) * .25, 16.9 + (i % 4) * .2]); shape(ctx, dir === 0 ? '#c8322a' : dir === 1 ? '#2f4a8a' : '#2f7a46', 0, circle(lerp(sx, tx, ease.inOut(mk)), lerp(sy, ty, ease.inOut(mk)), 6)); }
    if (since(t, 'north') > 0) { const [a, b] = MP([-90.2, 17.9]), [c, d] = MP([-89.6, 19.8]); line(ctx, [[a, b], [c, d]], 8, '#c8322a'); shape(ctx, '#c8322a', 0, poly([[c - 14, d + 10], [c, d - 14], [c + 14, d + 12]])); }
    if (since(t, 'highlands') > 0) { const [a, b] = MP([-91.0, 16.4]), [c, d] = MP([-91.2, 15.2]); line(ctx, [[a, b], [c, d]], 8, '#2f4a8a'); shape(ctx, '#2f4a8a', 0, poly([[c - 14, d - 10], [c, d + 14], [c + 14, d - 10]])); }
    ctx.restore();
    if (since(t, 'go') > -.2) strip(ctx, 'WHERE DID THEY GO?', 640, 70, since(t, 'go') + .2, { px: 38 });
    if (since(t, 'died') > 0) tag(ctx, 'SOME DIED — HUNGER, WAR', 240, 620, since(t, 'died'), 22); if (since(t, 'moved') > 0) tag(ctx, 'MANY MOVED', 640, 140, since(t, 'moved'), 24);
    if (since(t, 'north') > 0) tag(ctx, 'NORTH → YUCATÁN', 1040, 200, since(t, 'north'), 22); if (since(t, 'highlands') > 0) tag(ctx, 'SOUTH → HIGHLANDS', 1040, 620, since(t, 'highlands'), 22); if (since(t, 'villages') > 0) tag(ctx, 'SMALLER VILLAGES, LIVING ON LESS', 640, 680, since(t, 'villages'), 20);
    vig(ctx);
  }

  // ---------- k21: in the north, new powers rose — Chichén Itzá, later walled Mayapán. Different style, same people ----------
  function k21(ctx, lt, dur, t) {
    M.sky(ctx, t, 1.95, 470); M.jungle(ctx, 430, 1.95, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 300));
    { const k = since(t, 'rose') + .3; if (k > 0) { ctx.save(); ctx.translate(360, 600); const s = FX.settle(clamp(k / .6)); ctx.scale(s, s); castillo(ctx, 0, 0, .55, { tod: 2 }); ctx.restore(); tag(ctx, 'CHICHÉN ITZÁ', 360, 680, k, 24); } }
    { const k = since(t, 'walled') + .2; if (k > 0) { ctx.save(); ctx.translate(950, 600); const s = FX.settle(clamp(k / .6)); ctx.scale(s, s); shape(ctx, '#c8bca0', 4, poly([[-260, 0], [-250, -60], [250, -60], [260, 0]])); for (let i = 0; i < 12; i++) shape(ctx, '#b8ab90', 2.5, rect(-250 + i * 42, -76, 22, 18, 3)); temple(ctx, 0, -60, .32, { col: '#e0d4b8', h: 220, w: 100 }); for (const x of [-150, 150]) shape(ctx, '#e0d4b8', 3, rect(x - 30, -100, 60, 40, 8)); ctx.restore(); tag(ctx, 'MAYAPÁN — A WALLED CITY', 950, 680, k, 22); } }
    strip(ctx, 'NEW POWERS IN THE NORTH', 640, 80, Math.max(lt - .1, since(t, 'rose')), { px: 36 });
    if (since(t, 'style') > 0) tag(ctx, 'DIFFERENT STYLE', 360, 170, since(t, 'style'), 24);
    if (since(t, 'family') > 0) tag(ctx, 'SAME LANGUAGE FAMILY', 640, 230, since(t, 'family'), 24); if (since(t, 'people2') > 0) strip(ctx, 'SAME PEOPLE', 950, 170, since(t, 'people2'), { px: 38, color: '#2f7a46' });
    vig(ctx);
  }

  // ---------- k22: the kings fell. The farmers stayed. ----------
  function k22(ctx, lt, dur, t) {
    M.sky(ctx, t, 1.8, 470); M.jungle(ctx, 430, 1.8, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 300));
    // this time the stela tips into the vines; the farmer's field comes back green
    const fk = clamp((since(t, 'foul') + .1) / .8); ctx.save(); ctx.translate(360, 640); ctx.rotate(-ease.in(fk) * 1.4); stelaSmall(ctx, 0, 0, 2.4); ctx.restore(); for (let i = 0; i < 10; i++) shape(ctx, '#3f8a3a', 2.5, ellipse(200 + i * 40, 650 - (i % 3) * 12, 30, 14, i));
    field(ctx, t, lerp(.4, 1, clamp((since(t, 'state') + .2) / 1)), 0, 720, 1380, 660); farmer(ctx, 860, 760, .82, t, { still: true });
    if (since(t, 'foul') > 0) strip(ctx, 'THE KINGS FELL.', 360, 150, since(t, 'foul'), { px: 48, color: '#c8322a' });
    if (since(t, 'state') > 0) strip(ctx, 'THE FARMERS STAYED.', 960, 250, since(t, 'state'), { px: 48, color: '#2f7a46', rot: .02 });
    vig(ctx);
  }

  const cut = [[0, k1], [A.and1 - .1, k2], [A.except - .1, k3], [A.we - .1, k4], [A.during - .1, k5], [A.some1 - .1, k6], [A.what1 - .1, k7], [A.imagine - .1, k8], [A.because - .1, k9], [A.so - .1, k10], [A.the2 - .1, k11], [A.but - .1, k12], [A.some2 - .1, k13], [A.what2 - .1, k14], [A.the3 - .1, k15], [A.after - .1, k16], [A.in3 - .1, k17], [A.trees - .1, k18], [A.thats - .1, k19], [A.good - .1, k20], [A.and3 - .1, k21], [A.the4 - .1, k22]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.dry, type: 'wind', gain: .3 }, { t: A.rains, type: 'splash', gain: .4 }, { t: A.corn, type: 'click', gain: .4 }, { t: A.late, type: 'click', gain: .3 }, { t: A.nearly, type: 'wind', gain: .4 },
    { t: A.eight, type: 'click', gain: .4 }, { t: A.cambridge, type: 'paper', gain: .4 }, { t: A.florida, type: 'paper', gain: .4 }, { t: A.evaporates, type: 'swell', gain: .3 }, { t: A.crystals, type: 'click', gain: .4 }, { t: A.measure, type: 'swell', gain: .4 },
    { t: A.forty, type: 'thud', gain: .5 }, { t: A.seventy, type: 'thud', gain: .6 }, { t: A.cut, type: 'splash', gain: .3 }, { t: A.food, type: 'thud', gain: .4 }, { t: A.government, type: 'thud', gain: .4 }, { t: A.trap, type: 'boom', gain: .4 },
    { t: A.common, type: 'wind', gain: .4 }, { t: A.deliver, type: 'thud', gain: .4 }, { t: A.strongest, type: 'thud', gain: .5 }, { t: A.people, type: 'thud', gain: .3 }, { t: A.itself, type: 'thud', gain: .3 }, { t: A.bigger, type: 'thud', gain: .3 }, { t: A.harder, type: 'thud', gain: .3 },
    { t: A.push, type: 'hit', gain: .5 }, { t: A.wobbly, type: 'rattle', gain: .5 }, { t: A.wobbly + .8, type: 'boom', gain: .6 }, { t: A.carping, type: 'scratch', gain: .4 }, { t: A.building, type: 'scratch', gain: .4 }, { t: A.crowning, type: 'scratch', gain: .4 },
    { t: A.long, type: 'click', gain: .4 }, { t: A.january, type: 'thud', gain: .5 }, { t: A.crack, type: 'creak', gain: .5 }, { t: A.climb, type: 'creak', gain: .4 }, { t: A.hills, type: 'swell', gain: .4 },
    { t: A.thats + .1, type: 'thud', gain: .7 }, { t: A.two, type: 'click', gain: .5 }, { t: A.moved, type: 'slide', gain: .3 }, { t: A.to, type: 'thud', gain: .4 }, { t: A.walled, type: 'thud', gain: .4 }, { t: A.foul, type: 'boom', gain: .5 }, { t: A.state, type: 'swell', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.we - .2, mood: 'mystery' }, { t: A.imagine - .2, mood: 'under' }, { t: A.because - .2, mood: 'tense' }, { t: A.the2 - .2, mood: 'mystery' }, { t: A.but - .2, mood: 'tense' }, { t: A.what2 - .2, mood: 'under' }, { t: A.after - .2, mood: 'silence' }, { t: A.in3, mood: 'still' }, { t: A.good - .2, mood: 'under' }, { t: A.the4 - .2, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-longdry.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
