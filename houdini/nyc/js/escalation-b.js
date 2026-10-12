/* New York — Beat 4b "The escalation chain" 1835 fire → 1950 (narration-escalation-b.mp3 = narration-full.mp3 361.6–512.6 s + 1 s tail).
 * Anchors = full-recording word times − 361.6. The 1835 fire painting and the Ellis Island / Hine photos are public domain. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { newmoney: 362.48, warehouses: 363.64, december: 365.86, y1835: 366.3, catches: 368.75, fire: 369.19, cold: 370.74, freezes: 371.83, hoses: 373.16, people: 374.17, brooklyn: 374.96,
    watch: 375.84, river: 377.12, morning: 378.15, seventeen: 378.84, blocks: 379.68, estimates: 381.3, five30: 382.2, seven00: 383.41, buildings: 384.4, heart: 385.72, district: 386.72,
    twentythree: 387.62, twentysix: 388.96, insurance: 390.08, go: 390.88, newyork: 392.92, finished: 393.94, two: 395.39, except: 396.64, rebuilt: 397.95, year: 398.92, brick: 399.74, stone: 400.03,
    firemen: 401.85, nowater: 402.49, aqueduct: 404.21, river2: 405.34, westchester: 406.13, opens: 407.68, later: 408.7, disaster: 410.1, repaired: 411.47, better: 413.34, remember: 415.32,
    happening: 417.08, swelling: 418.94, y1898: 420.02, merges: 423.57, manhattan: 425.49, brooklyn2: 426.36, queens: 426.95, bronx: 427.82, staten: 428.63, onecity: 429.78, y1900: 431.23,
    three4: 432.77, coming: 435.92, harbor: 437.23, island: 438.38, immigration: 439.41, y1892: 440.57, first: 442.14, teenager: 443.34, annie: 444.92, sixtytwo: 446.73, twelve: 448.42,
    follow: 449.89, ellis: 450.62, busiest: 452.1, april: 453.1, eleven: 455.24, arrive: 458.01, oneday: 459.24, smalltown: 460.8, dinner: 462.8, rail: 465.06, anyone: 466.53, skyline: 469.32,
    taller: 471.02, tallest: 472.23, worst: 474.05, crash: 476.73, y1929: 477.51, later2: 479.54, work: 480.28, empire: 481.03, rises: 483.06, four10: 483.77, days: 484.92, stories: 486.77,
    year2: 488.35, opens2: 489.47, may: 489.98, depression: 493.16, tenants: 494.67, empty: 496.54, profit: 500.72, newyork3: 501.87, three3: 504.57, count: 505.75, climbing: 507.1,
    y1950: 508.54, million3: 511.09 };
  const A = {}; for (const k in F) A[k] = F[k] - 361.6; A.end = 152.0;

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


  const { harbor, walker, oldCorner, notice, obituaryShot, frame, ship, steamer, MAN, merchant1835, fireman, immigrant } = N;
  const counter = (ctx, x, y, val, k, label, col = GOLD, px = 54) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = FX.DISPLAY(px); const w = ctx.measureText(val).width + 60;
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-w / 2 + 6, -px * .8 + 6, w, px * 1.6)); shape(ctx, '#1d1a17', 0, rect(-w / 2, -px * .8, w, px * 1.6, 10)); txt(ctx, val, 0, 3, FX.DISPLAY(px), col); if (label) txt(ctx, label, 0, px * .8 + 22, FX.FONT(800, 16), '#fff'); ctx.restore(); };
  const roll = (a, b, k) => Math.round(lerp(a, b, ease.out(clamp(k)))).toLocaleString('en-US');
  function esb(ctx, x, base, s, k, lit, t) { // the Empire State Building, built up to fraction k (0..1)
    ctx.save(); ctx.translate(x, base); ctx.scale(s, s);
    const tiers = [[0, 60, 240], [60, 520, 180], [520, 600, 130], [600, 640, 100], [640, 700, 70], [700, 780, 40]], top = k * 780;
    ctx.save(); ctx.beginPath(); ctx.rect(-300, -top - 2, 600, top + 4); ctx.clip();
    tiers.forEach(([y0, y1, w]) => { shape(ctx, '#d8d0c0', 4, rect(-w / 2, -y1, w, y1 - y0)); for (let i = -w / 2 + 12; i < w / 2 - 8; i += 16) line(ctx, [[i, -y0 - 4], [i, -y1 + 4]], 2, 'rgba(90,80,70,.35)');
      if (lit != null) for (let y = y0 + 10; y < y1 - 6; y += 14) for (let i = -w / 2 + 6; i < w / 2 - 8; i += 16) if (((i * 7 + y * 3) % 17) < lit * 17) shape(ctx, '#ffd27a', 0, rect(i, -y - 8, 8, 6)); });
    line(ctx, [[0, -780], [0, -860]], 6, '#a8a8b0'); ctx.restore();
    if (k < 1) { const yt = -top; for (let i = -3; i <= 3; i++) line(ctx, [[i * 40, yt], [i * 40, yt - 40]], 3, '#5a4a3a'); line(ctx, [[-140, yt - 40], [140, yt - 40]], 3, '#5a4a3a'); line(ctx, [[60, yt - 40], [60, yt - 110], [160, yt - 110]], 4, '#e8742a'); }
    ctx.restore(); }

  // ---------- b1: December 1835 — all the new money stacked in the warehouses downtown ----------
  function b1(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 400); oldCorner(ctx, t, { era: '1835', night: 1, snow: 1 });
    for (let i = 0; i < 4; i++) merchant1835(ctx, 260 + i * 240, 750 + (i % 2) * 18, .52, t * .7, i);
    ctx.restore();
    FX.dateTag(ctx, 'WALL & BROAD · DECEMBER 1835');
    if (since(t, 'warehouses') > -.2) tag(ctx, 'WAREHOUSES FULL OF NEW MONEY', 640, 110, since(t, 'warehouses') + .2, 26);
    vig(ctx, .6);
  }

  // ---------- b2: one catches fire; so cold the water freezes in the firemen's hoses ----------
  function b2(ctx, lt, dur, t) {
    const fr = since(t, 'fire'), fz = since(t, 'freezes');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 400); oldCorner(ctx, t, { era: '1835', night: 1, snow: 1, fire: fr > -.3 ? clamp((fr + .3) / 1.5) : 0 });
    // a hand-pumped fire engine and its crew; the hose stiffens with ice
    { const x = 480, y = 700; shape(ctx, '#c8322a', 4, rect(x - 90, y - 80, 180, 60, 8)); shape(ctx, GOLD, 3, rect(x - 60, y - 110, 120, 30, 6)); for (const d of [-60, 60]) { ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(x + d, y - 12, 26, 0, 7); ctx.stroke(); }
      const pump = Math.sin(t * 6) * 18; line(ctx, [[x - 140, y - 110 + pump], [x + 140, y - 110 - pump]], 8, '#5a3a20'); }
    fireman(ctx, 300, 770, .62, t, 1, { reach: true }); fireman(ctx, 660, 770, .6, t * 1.1, 2, { reach: true }); fireman(ctx, 900, 780, .66, t, 3, { still: true, reach: true });
    { ctx.lineWidth = 12; ctx.strokeStyle = '#3a3a40'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(560, 640); ctx.quadraticCurveTo(760, 560, 940, 520); ctx.stroke();
      const ice = fz > -.3 ? clamp((fz + .3) / 1.2) : 0; if (ice > 0) { ctx.strokeStyle = `rgba(200,235,255,${.9 * ice})`; ctx.lineWidth = 16; ctx.stroke(); for (let i = 0; i < 9; i++) { const p = i / 8, x = lerp(580, 930, p), y = lerp(632, 522, p) + Math.sin(p * 3) * -20; shape(ctx, '#e8f6ff', 2, poly([[x - 6, y + 4], [x + 6, y + 4], [x, y + 4 + 24 * ice]])); } }
      if (ice < .6) for (let i = 0; i < 10; i++) { const p = (t * 1.5 + i / 10) % 1; ctx.save(); ctx.globalAlpha = (1 - p) * (1 - ice); shape(ctx, '#9ad0f0', 0, circle(940 + p * 120, 520 - p * 80 + p * p * 120, 6)); ctx.restore(); } }
    ctx.restore();
    if (fz > 0) strip(ctx, 'THE WATER FREEZES IN THE HOSES', 640, 110, fz, { px: 30, color: '#2f6a9a' });
    else if (since(t, 'catches') > -.2) strip(ctx, 'ONE CATCHES FIRE', 640, 110, since(t, 'catches') + .2, { px: 34, color: RED });
    vig(ctx, .6);
  }

  // ---------- b3: people line the Brooklyn shore to watch it burn across the river (the 1835 painting) ----------
  function b3(ctx, lt, dur, t) {
    const im = T.IMG.fire1835;
    shape(ctx, '#1d1a17', 0, rect(0, 0, W, H));
    if (im) { const z = lerp(1.0, 1.12, ease.sine(clamp(lt / dur))); ctx.save(); ctx.translate(640, 360); ctx.scale(z, z); const w = 1280, h = w * im.height / im.width; ctx.drawImage(im, -w / 2, -h / 2 + 20, w, h); ctx.restore(); }
    shape(ctx, PAPER, 3, rect(440, 640, 400, 36, 3)); txt(ctx, 'THE GREAT FIRE, FROM BROOKLYN · DEC 1835', 640, 659, FX.FONT(700, 15));
    if (since(t, 'brooklyn') > 0) tag(ctx, 'WATCHING FROM THE BROOKLYN SHORE', 640, 90, since(t, 'brooklyn'), 24);
    vig(ctx, .5);
  }

  // ---------- b4: by morning, seventeen blocks gone — 530 to 700 buildings ----------
  function b4(ctx, lt, dur, t) {
    const bl = since(t, 'blocks'), es = since(t, 'estimates');
    shape(ctx, '#7cc0dc', 0, rect(0, 0, W, H));
    ctx.save(); ctx.translate(640, 400); ctx.rotate(-.35); shape(ctx, '#c8b890', 4, rect(-500, -280, 1000, 560, 30));
    const burn = [[3, 2], [4, 2], [5, 2], [3, 3], [4, 3], [5, 3], [6, 3], [4, 4], [5, 4], [6, 4], [7, 4], [5, 5], [6, 5], [7, 5], [6, 6], [7, 6], [8, 5]];
    for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) { const x = -470 + c * 78, y = -250 + r * 64, bi = burn.findIndex(([bc, br]) => bc === c && br === r), b = bi >= 0 && bl > -.6 + bi * .08;
      shape(ctx, b ? '#2a2420' : ['#a8503a', '#c8c0b0', '#9a4a3a'][(r + c) % 3], 2, rect(x, y, 66, 52, 3)); if (b && (r + c) % 2) { ctx.save(); ctx.globalAlpha = .4; shape(ctx, '#5a5050', 0, circle(x + 33, y - 6, 18)); ctx.restore(); } }
    txt(ctx, 'WALL ST', -470 + 78 * 2, -270, FX.FONT(800, 16), '#3a2a20'); txt(ctx, 'EAST RIVER', 380, 300, FX.FONT(800, 16), '#2f5a7a');
    ctx.restore();
    counter(ctx, 230, 110, bl > -.4 ? String(Math.min(17, Math.max(0, Math.floor((bl + .6) / .08)))) : '0', bl + .4, 'BLOCKS GONE', '#ff9a5a');
    if (es > -.2) counter(ctx, 1040, 110, '530–700', es + .2, 'BUILDINGS', '#ff9a5a');
    FX.dateTag(ctx, 'BY MORNING · 17 DEC 1835');
    vig(ctx);
  }

  // ---------- b5: the heart of the business district — 23 of the city's 26 fire insurance companies go under ----------
  function b5(ctx, lt, dur, t) {
    const tt = since(t, 'twentythree'), go = since(t, 'go');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    for (let i = 0; i < 26; i++) { const c = i % 9, r = Math.floor(i / 9), x = 170 + c * 118, y = 250 + r * 150, k = clamp((lt - .1 - i * .03) / .3); if (k <= 0) continue; const s = pop(k);
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#d8d0c0', 3.5, rect(-46, -50, 92, 100)); shape(ctx, '#b8b0a0', 3, poly([[-52, -50], [0, -80], [52, -50]])); for (const d of [-26, 0, 26]) shape(ctx, '#f4efe6', 2, rect(d - 6, -40, 12, 70)); txt(ctx, 'FIRE INS.', 0, 58, FX.FONT(800, 12), '#3a2a20');
      const dead = go > -.3 && i < 23; if (dead) { const d = clamp((go + .3 - i * .04) / .2); ctx.globalAlpha = d; shape(ctx, 'rgba(0,0,0,.45)', 0, rect(-46, -50, 92, 100)); ctx.rotate(-.2); shape(ctx, RED, 0, rect(-50, -12, 100, 26)); txt(ctx, 'CLOSED', 0, 1, FX.DISPLAY(18), '#fff'); }
      ctx.restore(); }
    if (tt > -.2) counter(ctx, 640, 640, go > 0 ? '23 OF 26 GO UNDER' : '26 INSURERS', tt + .2, null, RED, 40);
    strip(ctx, 'THE HEART OF THE BUSINESS DISTRICT', 640, 92, since(t, 'heart') + .2, { px: 30 });
    vig(ctx);
  }

  // ---------- b6: New York is finished. Count: 2 ----------
  function b6(ctx, lt, dur, t) { obituaryShot(ctx, lt, t, 2, since(t, 'newyork') + .2, since(t, 'two'), '1835'); }

  // ---------- b7: except the district is rebuilt within about a year — in brick and stone ----------
  function b7(ctx, lt, dur, t) {
    const rb = since(t, 'rebuilt'), bs = since(t, 'brick');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 400); oldCorner(ctx, t, { era: '1835', rebuild: rb > -.3 ? clamp((rb + .3) / 2.4) : 0 });
    for (let i = 0; i < 4; i++) merchant1835(ctx, 260 + i * 240, 750 + (i % 2) * 18, .52, t, i + 1, { step: 1 });
    ctx.restore();
    if (rb > -.2) { const yr = rb > 1.5 ? '1836' : '1835'; counter(ctx, 1110, 110, yr, rb + .2, 'ABOUT A YEAR', GOLD, 40); }
    if (bs > -.2) strip(ctx, 'REBUILT IN BRICK AND STONE', 520, 110, bs + .2, { px: 32 });
    vig(ctx);
  }

  // ---------- b8: no water → an aqueduct brings a river down from Westchester County; it opens seven years later (map) ----------
  const AQ = ([lon, lat]) => [640 + (lon + 73.88) * 836, 380 - (lat - 41.0) * 1100];
  const BANK = [[-73.94, 41.35], [-73.89, 41.2], [-73.87, 41.08], [-73.88, 41.0], [-73.9, 40.95], [-73.93, 40.88], [-73.95, 40.83], [-74.0, 40.76], [-74.02, 40.7], [-74.02, 40.6]];
  function b8(ctx, lt, dur, t) {
    const aq = since(t, 'aqueduct'), op = since(t, 'opens');
    shape(ctx, '#e8dcb0', 0, rect(0, 0, W, H)); for (let i = 0; i < 50; i++) shape(ctx, 'rgba(120,160,90,.25)', 0, circle((i * 137) % 1300, (i * 71) % 740, 22));
    shape(ctx, '#6ab8d8', 3.5, poly([[-100, -100], ...BANK.map(AQ), [-100, 900]])); txt(ctx, 'HUDSON RIVER', AQ([-73.98, 41.1])[0] - 60, AQ([-73.98, 41.1])[1], FX.FONT(800, 16), '#2f5a7a');
    // the Croton River and the dam
    const [cx, cy] = AQ([-73.86, 41.22]); line(ctx, [[cx, cy], [cx + 80, cy - 40], [cx + 200, cy - 30]], 8, '#3a8ac0'); shape(ctx, '#8a8a90', 3, rect(cx - 16, cy - 10, 32, 20)); txt(ctx, 'CROTON RIVER', cx + 140, cy - 60, FX.FONT(800, 15), '#2f5a7a');
    // the aqueduct draws south to the reservoirs in Manhattan
    const route = [[-73.86, 41.22], [-73.86, 41.15], [-73.86, 41.08], [-73.87, 41.0], [-73.89, 40.93], [-73.92, 40.87], [-73.931, 40.842], [-73.95, 40.81], [-73.97, 40.78], [-73.982, 40.753]].map(AQ);
    const k = clamp((lt - .3) / 5.2); if (k > 0) { const n = route.length - 1, up = k * n; ctx.save(); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.setLineDash([16, 8]); ctx.lineDashOffset = -t * 30; ctx.strokeStyle = '#1d6aa8'; ctx.beginPath(); ctx.moveTo(...route[0]);
      for (let i = 1; i <= Math.floor(up); i++) ctx.lineTo(...route[i]); if (up < n) { const i = Math.floor(up), f = up - i; ctx.lineTo(lerp(route[i][0], route[i + 1][0], f), lerp(route[i][1], route[i + 1][1], f)); } ctx.stroke(); ctx.restore(); }
    if (k > .65) { const [hx, hy] = AQ([-73.931, 40.842]); shape(ctx, '#d8c8a8', 3, rect(hx - 40, hy - 6, 80, 12)); for (let i = 0; i < 5; i++) shape(ctx, '#d8c8a8', 2, rect(hx - 38 + i * 18, hy + 6, 8, 16)); txt(ctx, 'HIGH BRIDGE', hx + 90, hy, FX.FONT(800, 13), '#3a2a20'); }
    if (k >= 1) { const [rx, ry] = AQ([-73.982, 40.753]); shape(ctx, '#3a8ac0', 3, rect(rx - 20, ry - 14, 40, 28)); txt(ctx, 'RESERVOIR', rx + 70, ry, FX.FONT(800, 13), '#3a2a20'); }
    txt(ctx, 'WESTCHESTER COUNTY', AQ([-73.78, 41.05])[0], AQ([-73.78, 41.05])[1], FX.FONT(800, 18), '#5a4a38'); txt(ctx, 'MANHATTAN', AQ([-73.96, 40.77])[0] + 70, AQ([-73.96, 40.77])[1] + 30, FX.FONT(800, 15), '#5a4a38');
    if (op > -.2) counter(ctx, 1080, 600, '1842', op + .2, 'OPENS 7 YEARS LATER', '#8ad0ff', 44);
    strip(ctx, 'THE FIREMEN HAD NO WATER', 640, 92, since(t, 'nowater') + .2, { px: 32, color: RED });
    vig(ctx);
  }

  // ---------- b9: the disaster didn't just get repaired — it left the city better equipped. Remember that. ----------
  function b9(ctx, lt, dur, t) {
    const rp = lt - .1, bt = since(t, 'better'), rm = since(t, 'remember');
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#e8d8c8'], [.5, '#f4ead4'], [1, '#d8ecd8']]), 0, rect(0, 0, W, H)); line(ctx, [[640, 160], [640, 680]], 4, 'rgba(90,70,50,.3)');
    if (rp > -.2) { const s = pop(rp + .2); ctx.save(); ctx.translate(330, 420); ctx.scale(s, s); shape(ctx, '#a8503a', 4, rect(-110, -160, 220, 260)); for (let i = 0; i < 6; i++) shape(ctx, '#3f5a74', 2, rect(-90 + (i % 3) * 66, -130 + Math.floor(i / 3) * 90, 44, 54)); shape(ctx, '#c8a878', 3, poly([[-60, 20], [40, 0], [50, 40], [-50, 60]])); txt(ctx, 'REPAIRED', 0, 150, FX.DISPLAY(40), '#8a5a34'); ctx.restore(); }
    if (bt > -.2) { const s = pop(bt + .2); ctx.save(); ctx.translate(960, 420); ctx.scale(s, s); shape(ctx, '#c8c0b0', 4, rect(-120, -180, 240, 280)); for (let i = 0; i < 8; i++) shape(ctx, '#3f5a74', 2, rect(-96 + (i % 4) * 50, -150 + Math.floor(i / 4) * 90, 32, 54));
      shape(ctx, RED, 3.5, rect(150, 30, 34, 70, 6)); shape(ctx, RED, 3, ellipse(167, 30, 22, 10)); for (let i = 0; i < 10; i++) { const p = (t * 1.2 + i / 10) % 1; shape(ctx, '#7ac8f0', 0, circle(190 + p * 120, 56 - p * 40 + p * p * 90, 6)); } txt(ctx, 'BETTER', 0, 150, FX.DISPLAY(44), GREEN); ctx.restore(); }
    if (rm > -.2) { const s = pop(rm + .2); ctx.save(); ctx.translate(640, 110); ctx.scale(s, s); FX.bigText(ctx, 'REMEMBER THAT ↻', 0, 0, 52, { color: GOLD }); ctx.restore(); }
    vig(ctx);
  }

  // ---------- b10: 1898 — it merges with its neighbors: five boroughs become one city ----------
  const BP = ([lon, lat]) => [640 + (lon + 73.95) * 1094, 360 - (lat - 40.71) * 1440];
  const BRONX = [[-73.933, 40.8], [-73.92, 40.81], [-73.91, 40.87], [-73.92, 40.88], [-73.91, 40.915], [-73.85, 40.905], [-73.78, 40.89], [-73.78, 40.84], [-73.82, 40.81], [-73.88, 40.8]];
  const QUEENS = [[-73.96, 40.74], [-73.94, 40.77], [-73.9, 40.79], [-73.83, 40.79], [-73.77, 40.79], [-73.75, 40.76], [-73.7, 40.75], [-73.73, 40.65], [-73.76, 40.6], [-73.86, 40.58], [-73.85, 40.65], [-73.88, 40.68], [-73.92, 40.7], [-73.95, 40.73]];
  const BKLYN = [[-73.99, 40.7], [-73.97, 40.71], [-73.96, 40.73], [-73.92, 40.7], [-73.88, 40.68], [-73.85, 40.65], [-73.86, 40.58], [-73.93, 40.57], [-74.0, 40.57], [-74.04, 40.58], [-74.04, 40.62], [-74.02, 40.64], [-74.01, 40.68]];
  const STATEN = [[-74.07, 40.64], [-74.06, 40.6], [-74.12, 40.54], [-74.25, 40.5], [-74.24, 40.55], [-74.2, 40.63], [-74.15, 40.64]];
  function b10(ctx, lt, dur, t) {
    const oc = since(t, 'onecity');
    shape(ctx, '#7cc0dc', 0, rect(0, 0, W, H)); for (let i = 0; i < 14; i++) line(ctx, [[((i * 130 + t * 10) % 1400) - 60, 80 + i * 46], [((i * 130 + t * 10) % 1400) - 20, 80 + i * 46]], 3, 'rgba(255,255,255,.5)');
    shape(ctx, '#d8d0b0', 3, poly([[-74.4, 40.4], [-74.25, 40.5], [-74.2, 40.63], [-74.1, 40.66], [-74.05, 40.71], [-74.02, 40.76], [-73.96, 40.85], [-73.92, 41.0], [-74.4, 41.0]].map(BP))); txt(ctx, 'NEW JERSEY', BP([-74.22, 40.78])[0], BP([-74.22, 40.78])[1], FX.FONT(800, 16), '#7a6a5a');
    const B = [['MANHATTAN', MAN, 'manhattan', '#e8742a', [-73.975, 40.77]], ['BROOKLYN', BKLYN, 'brooklyn2', '#3a9a5a', [-73.95, 40.64]], ['QUEENS', QUEENS, 'queens', '#a85ab8', [-73.81, 40.71]], ['THE BRONX', BRONX, 'bronx', '#3a7ac8', [-73.86, 40.86]], ['STATEN ISLAND', STATEN, 'staten', '#d84a5a', [-74.15, 40.58]]];
    const one = oc > -.2 ? ease.inOut(clamp((oc + .2) / .6)) : 0;
    B.forEach(([nm, pg, k, col, lab]) => { const kk = since(t, k) + .2, on = kk > 0 ? FX.settle(clamp(kk / .4)) : 0; const c = one > 0 ? (one > .5 ? GOLD : col) : (on > 0 ? col : '#c8c0a8');
      ctx.save(); const [cx, cy] = BP(lab); ctx.translate(cx, cy); ctx.scale(lerp(1, 1.04, on * (1 - one)), lerp(1, 1.04, on * (1 - one))); ctx.translate(-cx, -cy); shape(ctx, c, 4, poly(pg.map(BP))); ctx.restore();
      if (on > 0) txt(ctx, nm, cx, cy, FX.DISPLAY(nm.length > 10 ? 18 : 22), '#fff'); });
    if (one > .5) { const s = pop(oc); ctx.save(); ctx.translate(1060, 140); ctx.scale(s, s); FX.bigText(ctx, 'ONE CITY', 0, 0, 64, { color: GOLD }); ctx.restore(); }
    FX.dateTag(ctx, 'GREATER NEW YORK · 1898');
    if (since(t, 'merges') > 0 && one < .5) strip(ctx, 'IT MERGES WITH ITS NEIGHBORS', 900, 640, since(t, 'merges'), { px: 28 });
    vig(ctx);
  }

  // ---------- b11: the 1900 census counts 3.4 million people ----------
  function b11(ctx, lt, dur, t) {
    const th = since(t, 'three4');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    for (let r = 0; r < 5; r++) for (let i = 0; i < 14; i++) { const k = clamp((lt - .2 - (r * 14 + i) * .02) / .3); if (k <= 0) continue; immigrant(ctx, 60 + i * 90 + (r % 2) * 45, 470 + r * 70, .3 + r * .03, t * .5, r * 14 + i, { still: true }); }
    counter(ctx, 640, 200, th > -.4 ? (th > .6 ? '3.4 MILLION' : roll(0, 3437202, (th + .4) / 1)) : '0', lt, 'NEW YORKERS · 1900 CENSUS', GOLD, 60);
    vig(ctx);
  }

  // ---------- b12: they're still coming — Ellis Island opens in 1892; the first through: Annie Moore, a teenager from Ireland ----------
  function b12(ctx, lt, dur, t) {
    const im = since(t, 'immigration'), an = since(t, 'annie');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 420);
    sky(ctx, t, '#9ccce8', '#f4e6c4'); waterBand(ctx, 430, t, -600, 2200, '#4aa0c0');
    // the first (1892) wooden immigration station with its turrets, on its small island
    shape(ctx, '#a8b878', 4, ellipse(640, 440, 420, 46));
    { const k = im > -.4 ? FX.settle(clamp((im + .4) / .6)) : 1; ctx.save(); ctx.translate(640, 430); ctx.scale(1, k); shape(ctx, '#d8b878', 4, rect(-300, -120, 600, 120)); for (const x of [-300, -100, 100, 300]) { shape(ctx, '#c8a868', 4, rect(x - 30, -190, 60, 190)); shape(ctx, '#5a6a7a', 3.5, poly([[x - 38, -190], [x, -250], [x + 38, -190]])); }
      for (let i = 0; i < 10; i++) shape(ctx, '#3f5a74', 2, rect(-270 + i * 56, -96, 30, 40)); shape(ctx, '#5a3a20', 3, rect(-30, -60, 60, 60)); ctx.restore(); }
    steamer(ctx, 1080 + Math.sin(t * .2) * 10, 470, .6, t); line(ctx, [[820, 470], [960, 470]], 10, '#8a6a4a');
    ctx.restore();
    // Annie Moore steps ashore
    immigrant(ctx, 520, 760, .9, t, 1, { shawl: '#3a6a3a', hs: 1, hair: '#a8502a', skin: '#f0d0b0', coat: '#4a3a5a', still: an < 0 });
    shape(ctx, '#8a5a34', 4, rect(560, 610, 70, 50, 6)); line(ctx, [[580, 610], [580, 596], [610, 596], [610, 610]], 4, '#5a3a20');
    if (an > -.3) { const e = FX.settle(clamp((an + .3) / .4)); ctx.save(); ctx.translate(lerp(1500, 960, e), 600); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -46, 400, 100)); shape(ctx, PAPER, 4, rect(-200, -50, 400, 100, 4)); txt(ctx, 'ANNIE MOORE', 0, -14, FX.DISPLAY(32)); txt(ctx, 'A TEENAGER FROM IRELAND · THE FIRST THROUGH', 0, 24, FX.FONT(700, 13), '#5a4a38'); ctx.restore(); }
    FX.dateTag(ctx, 'ELLIS ISLAND · 1 JANUARY 1892');
    strip(ctx, 'AND THEY\'RE STILL COMING', 640, 92, since(t, 'coming') + .2, { px: 34 });
    vig(ctx);
  }

  // ---------- b13: over the next 62 years, about 12 million people follow her through Ellis Island ----------
  function b13(ctx, lt, dur, t) {
    const tw = since(t, 'twelve');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 420);
    sky(ctx, t, '#9ccce8', '#f4e6c4'); waterBand(ctx, 440, t, -600, 2200, '#4aa0c0');
    // the brick main building with its four copper-domed towers (opened 1900)
    shape(ctx, '#a8b878', 4, ellipse(640, 450, 500, 50)); shape(ctx, '#b8604a', 4, rect(340, 270, 600, 170)); for (let i = 0; i < 3; i++) shape(ctx, '#e8dcc4', 3.5, c => { const x = 470 + i * 170; c.moveTo(x - 50, 440); c.lineTo(x - 50, 340); c.arc(x, 340, 50, Math.PI, 0); c.lineTo(x + 50, 440); c.closePath(); });
    for (const x of [360, 500, 780, 920]) { shape(ctx, '#c8704a', 4, rect(x - 24, 190, 48, 90)); shape(ctx, '#6ab0a0', 3.5, c => { c.moveTo(x - 30, 192); c.quadraticCurveTo(x, 130, x + 30, 192); c.closePath(); }); line(ctx, [[x, 150], [x, 128]], 3); }
    ctx.restore();
    // a stream of people walking in
    for (let i = 0; i < 14; i++) { const p = ((t * .05 + i / 14) % 1); immigrant(ctx, lerp(-60, 1340, p), 740 + (i % 3) * 14, .45, t, i); }
    counter(ctx, 640, 120, tw > -.4 ? roll(0, 12000000, (tw + .4) / 1.4) : '0', tw + .4, 'PEOPLE · 1892–1954', GOLD, 52);
    vig(ctx);
  }

  // ---------- b14: busiest day, April 17th 1907: 11,747 people — a small town walking off the boats before dinner ----------
  function b14(ctx, lt, dur, t) {
    const el = since(t, 'eleven'), sm = since(t, 'smalltown'), dn = since(t, 'dinner');
    shape(ctx, '#2a2420', 0, rect(0, 0, W, H));
    const im = T.IMG.pens, ph = sm > -.4 ? 1 - clamp((sm + .4) / .6) : 1;
    if (ph > 0) { ctx.save(); ctx.globalAlpha = ph; frame(ctx, im, 470, 360, 700, 700 * (im ? im.height / im.width : .75), 1, 'THE REGISTRY ROOM, ELLIS ISLAND'); ctx.restore(); }
    if (ph < 1) { ctx.save(); ctx.globalAlpha = 1 - ph; sky(ctx, t, '#f0b070', '#ffe2b0'); shape(ctx, '#8ab868', 0, rect(0, 460, W, 300));
      for (let i = 0; i < 10; i++) { const x = 60 + i * 120, h = 90 + (i * 37) % 60; shape(ctx, ['#e8b08a', '#f0d29a', '#d8c0a0'][i % 3], 3.5, rect(x, 460 - h, 90, h)); shape(ctx, '#a8503a', 3, poly([[x - 6, 460 - h], [x + 45, 420 - h], [x + 96, 460 - h]])); }
      for (let i = 0; i < 12; i++) immigrant(ctx, 60 + i * 100, 700 + (i % 2) * 20, .42, t, i, { step: 1 });
      ctx.save(); ctx.translate(980, 600); shape(ctx, '#2f7a46', 4, rect(-130, -50, 260, 100, 6)); line(ctx, [[0, 50], [0, 140]], 8, '#5a3a20'); txt(ctx, 'WELCOME TO', 0, -20, FX.FONT(800, 16), '#fff'); txt(ctx, 'POP. 11,747', 0, 16, FX.DISPLAY(34), '#fff'); ctx.restore();
      ctx.restore(); }
    counter(ctx, 1060, 200, el > -.4 ? roll(0, 11747, (el + .4) / 2.2) : '0', el + .4, 'IN ONE DAY · 17 APRIL 1907', GOLD, 50);
    if (dn > -.3) { const s = pop(dn + .3); ctx.save(); ctx.translate(200, 140); ctx.scale(s, s); shape(ctx, '#fff', 4, circle(0, 0, 60)); line(ctx, [[0, 0], [0, -44]], 6); line(ctx, [[0, 0], [0, 40]], 5); txt(ctx, 'BEFORE DINNER', 0, 90, FX.DISPLAY(22), '#fff'); ctx.restore(); }
    vig(ctx, .5);
  }

  // ---------- b15: put yourself at that rail — you don't know anyone; the first thing you see is a skyline, getting taller ----------
  function b15(ctx, lt, dur, t) {
    const sk = since(t, 'skyline'), tl = since(t, 'taller');
    ctx.save(); cam(ctx, lerp(1.0, 1.1, ease.sine(clamp(lt / dur))), 640, 360);
    shape(ctx, grad(ctx, 0, 0, 0, 420, [[0, '#8ab8d8'], [1, '#f4dcb0']]), 0, rect(-200, -200, 1700, 700)); clouds(ctx, t, [80, 140], .8);
    const grow = tl > -.4 ? ease.out(clamp((tl + .4) / 1.4)) : 0;
    for (let i = 0; i < 18; i++) { const x = 380 + i * 34, h = (80 + (i * 37) % 120) * (1 + grow * (i % 3 === 0 ? 1.4 : .5)); shape(ctx, ['#9fb0c0', '#a9b6c4', '#8a9aac'][i % 3], 2.5, rect(x, 400 - h, 30, h)); }
    // the Statue of Liberty on the left
    { const lx = 230, ly = 400; shape(ctx, '#8a9a8a', 3, rect(lx - 24, ly - 60, 48, 60)); shape(ctx, '#7ab8a0', 3, c => { c.moveTo(lx - 14, ly - 60); c.lineTo(lx - 10, ly - 140); c.lineTo(lx + 10, ly - 140); c.lineTo(lx + 14, ly - 60); c.closePath(); }); shape(ctx, '#7ab8a0', 3, circle(lx, ly - 150, 10)); line(ctx, [[lx + 8, ly - 134], [lx + 18, ly - 182]], 5, '#7ab8a0'); shape(ctx, GOLD, 2, ellipse(lx + 19, ly - 190, 5, 8)); }
    shape(ctx, grad(ctx, 0, 400, 0, 720, [[0, '#4a90a8'], [1, '#2a6a88']]), 0, rect(-200, 398, 1700, 400)); for (let i = 0; i < 20; i++) line(ctx, [[((i * 120 + t * 20) % 1400) - 60, 430 + i * 14], [((i * 120 + t * 20) % 1400) - 20, 430 + i * 14]], 3, 'rgba(255,255,255,.4)');
    ctx.restore();
    // the rail and the passengers beside you
    immigrant(ctx, 160, 860, .95, t, 2, { still: true }); immigrant(ctx, 1110, 880, .9, t, 4, { still: true, shawl: '#8a3a3a', hs: 1 });
    shape(ctx, '#5a3a20', 4, rect(-20, 600, 1320, 26, 4)); for (let i = 0; i < 14; i++) shape(ctx, '#5a3a20', 3, rect(20 + i * 96, 626, 14, 120)); shape(ctx, '#3a2a1a', 0, rect(-20, 700, 1320, 40));
    if (since(t, 'anyone') > 0) tag(ctx, 'YOU DON\'T KNOW ANYONE HERE', 640, 110, since(t, 'anyone'), 24);
    if (sk > 0) strip(ctx, 'A SKYLINE — GETTING TALLER', 640, 200, sk, { px: 32, color: BLUE });
    vig(ctx);
  }

  // ---------- b16: the tallest piece goes up at the worst possible moment — the stock market crashes in 1929 ----------
  function b16(ctx, lt, dur, t) {
    const cr = since(t, 'crash');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a3a4a'], [1, '#1a2430']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 14; i++) line(ctx, [[120, 120 + i * 40], [1160, 120 + i * 40]], 1.5, 'rgba(255,255,255,.08)');
    const pts = []; for (let i = 0; i <= 40; i++) { const x = 140 + i * 25, up = 560 - i * 9 - Math.sin(i * 1.3) * 14, k = cr > 0 ? clamp((x - 140 - 760) / 100 + cr * 2) : 0; pts.push([x, x > 900 ? lerp(up, 640 + Math.sin(i) * 10, clamp(cr / .6) * clamp((x - 900) / 140)) : up]); }
    const shown = Math.min(41, Math.floor(lt / dur * 60) + 10); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = cr > 0 ? RED : '#4fd08a'; ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1, shown).forEach(p => ctx.lineTo(...p)); ctx.stroke(); ctx.restore();
    // ticker tape
    for (let i = 0; i < 14; i++) { const p = (t * .25 + i / 14) % 1; ctx.save(); ctx.translate(100 + i * 85, -20 + p * 760); ctx.rotate(Math.sin(t * 3 + i) * .6); shape(ctx, '#f4efe2', 0, rect(-30, -6, 60, 12)); ctx.restore(); }
    if (cr > -.2) { const s = slam(cr + .2); ctx.save(); ctx.translate(900, 220); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, '#f4ead4', 5, rect(-230, -110, 460, 220, 4)); txt(ctx, 'THE DAILY LEDGER', 0, -76, 'italic 700 22px Georgia', '#3a2a20'); line(ctx, [[-200, -56], [200, -56]], 3);
      txt(ctx, 'STOCKS CRASH', 0, -6, FX.DISPLAY(50), RED); txt(ctx, 'OCTOBER 1929', 0, 52, FX.DISPLAY(28), '#3a2a20'); ctx.restore(); }
    strip(ctx, 'THE WORST POSSIBLE MOMENT', 420, 92, since(t, 'worst') + .2, { px: 32 });
    vig(ctx, .6);
  }

  // ---------- b17: a few months later work starts on the Empire State Building anyway — 410 days, 102 stories ----------
  function b17(ctx, lt, dur, t) {
    const em = since(t, 'empire'), dy = since(t, 'four10'), st = since(t, 'stories');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 380);
    shape(ctx, grad(ctx, 0, -100, 0, 720, [[0, '#6ab8ea'], [1, '#fde6b8']]), 0, rect(-200, -200, 1700, 1000)); clouds(ctx, t, [100, 170]);
    for (let i = 0; i < 16; i++) { const x = -40 + i * 90, h = 120 + (i * 53) % 160; if (Math.abs(x - 640) < 140) continue; shape(ctx, ['#a9b6c4', '#c8b8a0', '#9fb0c0'][i % 3], 3, rect(x, 720 - h, 80, h)); }
    const k = em > -.3 ? ease.inOut(clamp((em + .3) / 6.5)) : 0; esb(ctx, 640, 720, .78, Math.max(.04, k), null, t);
    ctx.restore();
    frame(ctx, T.IMG.hine, 1060, 300, 300, 240, em + .5, 'LEWIS HINE · 1930–31');
    counter(ctx, 230, 140, dy > -.6 ? roll(0, 410, (dy + .6) / 1.6) + ' DAYS' : Math.round(410 * k) + ' DAYS', em + .3, null, GOLD, 42);
    counter(ctx, 230, 270, Math.round(102 * k) + ' STORIES', st + .2, null, '#8ad0ff', 36);
    strip(ctx, 'WORK STARTS ANYWAY', 640, 92, since(t, 'work') + .2, { px: 34 });
    vig(ctx);
  }

  // ---------- b18: it opens on May 1st 1931 into the Depression — the "Empty State Building"; ~20 years to turn a profit ----------
  function b18(ctx, lt, dur, t) {
    const em = since(t, 'empty'), pr = since(t, 'profit');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 340);
    shape(ctx, grad(ctx, 0, -100, 0, 720, [[0, '#3a4a6a'], [1, '#c8a080']]), 0, rect(-200, -200, 1700, 1000));
    for (let i = 0; i < 16; i++) { const x = -40 + i * 90, h = 120 + (i * 53) % 160; if (Math.abs(x - 640) < 140) continue; shape(ctx, ['#7a8a9a', '#8a7a6a', '#6a7a8a'][i % 3], 3, rect(x, 720 - h, 80, h)); }
    esb(ctx, 640, 720, .78, 1, .08, t);
    ctx.restore();
    // "for rent" signs
    for (let i = 0; i < 3; i++) { const k = pop(lt - .5 - i * .3); if (k <= 0) continue; ctx.save(); ctx.translate(520 + i * 120, 520 - i * 90); ctx.scale(k, k); ctx.rotate((i - 1) * .06); shape(ctx, '#f4efe2', 3, rect(-50, -16, 100, 32, 3)); txt(ctx, 'FOR RENT', 0, 1, FX.FONT(800, 14), RED); ctx.restore(); }
    FX.dateTag(ctx, 'OPENED 1 MAY 1931');
    if (since(t, 'depression') > 0) tag(ctx, 'STRAIGHT INTO THE GREAT DEPRESSION', 300, 200, since(t, 'depression'), 18);
    if (em > -.2) FX.stamp(ctx, 'THE "EMPTY STATE BUILDING"', 900, 320, em + .2, { color: RED, size: 30 });
    if (pr > -.6) { const yr = Math.round(lerp(1931, 1950, ease.inOut(clamp((pr + .6) / 1.2)))); counter(ctx, 980, 560, String(yr), pr + .6, '≈ 20 YEARS TO A PROFIT', GOLD, 44); }
    vig(ctx);
  }

  // ---------- b19: New York is finished. Count: 3 ----------
  function b19(ctx, lt, dur, t) { obituaryShot(ctx, lt, t, 3, since(t, 'newyork3') + .2, since(t, 'three3'), '1931'); }

  // ---------- b20: the count that matters keeps climbing anyway — by 1950, 7.9 million New Yorkers ----------
  function b20(ctx, lt, dur, t) {
    const m = since(t, 'million3');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    const D = [[1790, 33131], [1820, 123706], [1850, 515547], [1900, 3437202], [1950, 7891957]], X = y => 160 + (y - 1790) / 160 * 900, Y = v => 620 - v / 8000000 * 440;
    line(ctx, [[150, 620], [1080, 620]], 4); line(ctx, [[150, 620], [150, 160]], 4); for (const y of [1790, 1850, 1900, 1950]) txt(ctx, String(y), X(y), 650, FX.FONT(800, 18), '#5a4a38');
    const k = clamp((lt - .2) / 5.5);
    ctx.save(); ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.strokeStyle = GREEN; ctx.beginPath(); ctx.moveTo(X(D[0][0]), Y(D[0][1])); const n = D.length - 1, up = k * n;
    for (let i = 1; i <= Math.floor(up); i++) ctx.lineTo(X(D[i][0]), Y(D[i][1])); if (up < n) { const i = Math.floor(up), f = up - i; ctx.lineTo(lerp(X(D[i][0]), X(D[i + 1][0]), f), lerp(Y(D[i][1]), Y(D[i + 1][1]), f)); } ctx.stroke(); ctx.restore();
    // the three obituaries pinned where they happened — and the line keeps going
    for (const [yr, v, lbl] of [[1776, 25000, '1'], [1835, 270000, '2'], [1931, 6930000, '3']]) { const x = X(Math.max(1790, yr)), y = Y(v); if (yr > D[0][0] + up * 40) continue; shape(ctx, '#1d1a17', 3, rect(x - 18, y - 74, 36, 40, 4)); txt(ctx, '✝' + lbl, x, y - 54, FX.FONT(800, 16), '#fff'); line(ctx, [[x, y - 34], [x, y - 8]], 3); }
    counter(ctx, 960, 200, m > -.4 ? '7.9 MILLION' : roll(33131, 7891957, k), lt, 'NEW YORKERS', GOLD, 52);
    strip(ctx, 'THE COUNT THAT MATTERS KEEPS CLIMBING', 520, 92, since(t, 'count') + .2, { px: 28, color: GREEN });
    vig(ctx);
  }

  const cut = [[0, b1], [7.0, b2], [12.6, b3], [16.4, b4], [23.9, b5], [31.3, b6], [35.0, b7], [39.7, b8], [47.9, b9], [56.5, b10], [69.5, b11], [73.6, b12], [84.5, b13], [90.2, b14], [102.3, b15], [110.5, b16], [117.5, b17], [127.8, b18], [140.3, b19], [144.0, b20]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: A.warehouses, type: 'rattle', gain: .3 }, { t: A.fire - .2, type: 'boom', gain: .5 }, { t: A.freezes, type: 'creak', gain: .4 }, { t: 12.6, type: 'whoosh', gain: .4 }, { t: A.blocks - .4, type: 'ratchet', gain: .4 },
    { t: A.go, type: 'thud', gain: .5 }, { t: A.newyork - .2, type: 'thud', gain: .8 }, { t: A.two, type: 'thud', gain: .6 }, { t: A.rebuilt, type: 'ratchet', gain: .4 }, { t: A.aqueduct, type: 'bubbles', gain: .4 },
    { t: A.opens, type: 'thud', gain: .5 }, { t: A.better, type: 'splash', gain: .4 }, { t: A.remember, type: 'whoosh', gain: .4 }, { t: A.manhattan, type: 'click', gain: .4 }, { t: A.brooklyn2, type: 'click', gain: .4 },
    { t: A.queens, type: 'click', gain: .4 }, { t: A.bronx, type: 'click', gain: .4 }, { t: A.staten, type: 'click', gain: .4 }, { t: A.onecity, type: 'thud', gain: .6 }, { t: A.three4, type: 'ratchet', gain: .4 },
    { t: A.annie - .3, type: 'paper', gain: .4 }, { t: A.twelve, type: 'ratchet', gain: .4 }, { t: A.eleven, type: 'ratchet', gain: .4 }, { t: A.dinner, type: 'click', gain: .4 }, { t: A.taller, type: 'swell', gain: .4 },
    { t: A.crash - .2, type: 'boom', gain: .5 }, { t: A.empire, type: 'ratchet', gain: .3 }, { t: A.empty, type: 'thud', gain: .6 }, { t: A.newyork3 - .2, type: 'thud', gain: .8 }, { t: A.three3, type: 'thud', gain: .6 }, { t: A.million3, type: 'swell', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.newyork - .3, mood: 'silence' }, { t: A.except - .3, mood: 'under' }, { t: A.rail - .3, mood: 'still' }, { t: A.tallest - .3, mood: 'tense' }, { t: A.newyork3 - .3, mood: 'silence' }, { t: A.count - .3, mood: 'under' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-escalation-b.mp3', shots, sfx, moods, images: { fire1835: 'assets/img/fire-1835-painting.jpg', pens: 'assets/img/ellis-island-pens.jpg', hine: 'assets/img/esb-worker-hine.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
