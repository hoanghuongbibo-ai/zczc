/* Venice — "The bill" (narration-bill.mp3 = 2.0 s chapter pause + narration-full.mp3 347.6–464.4 s).
 * Anchors = full-recording word times − 345.6. From "The prince can't pay either" the script asks for music out and
 * slow, still frames with nothing playful: those shots move only by slow push-ins and cross-fades. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { which: 347.77, holding: 348.65, invoice: 350.19, ages: 350.98, y1201: 352.11, knights: 353.57, crusade: 354.33, venice: 355.39, fleet: 356.58,
    ships: 357.67, thirty3: 358.58, men: 360.02, price: 361.08, marks: 363.15, silver: 363.59, tons: 365.04, double: 367.11, king: 367.88, year: 369.29,
    builds: 370.92, arrive: 373.22, third: 374.81, short: 376.82, thirty: 377.74, marks2: 378.84, bill: 380.74, doge: 381.37, ruler: 382.55, life: 383.77,
    name: 385.0, dandolo: 386.48, blind: 387.56, nobody: 388.89, birthday: 389.82, eighties: 392.15, nineties: 393.19, offers: 395.11, plan: 395.85, workoff: 396.97,
    first: 398.03, retake: 399.37, port: 400.27, adriatic: 401.06, sail: 402.7, cpl: 403.07, young: 404.4, throne: 405.89, promises: 407.44, everything: 408.66,
    cantpay: 410.35, either: 410.89, april: 412.05, y1204: 412.42, crusaders: 413.46, venetians: 414.27, storm: 414.78, christian: 416.98, same: 418.64, rich: 420.14,
    three: 421.4, looted: 422.48, churches: 423.5, stripped: 424.1, civilians: 425.15, killed: 426.01, never: 427.71, holy: 428.86,
    historians: 429.87, dandolo2: 431.76, steer: 432.88, start: 433.72, roll: 435.78, hill: 436.45, bad: 437.4, another: 438.36, inside: 440.06, difference: 441.95,
    home: 443.65, ports: 444.14, islands: 444.86, share: 446.24, empire: 447.17, four: 448.9, horses: 449.82, taken: 450.69, track: 452.29, door: 453.42, marks3: 454.18,
    morning: 456.26, almost: 457.27, copies: 459.54, originals: 460.7, indoors: 461.5, y1980: 462.12, air: 463.93 };
  const A = {}; for (const k in F) A[k] = F[k] - 345.6; A.end = 120.3;
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
  // ---------- props for this part ----------
  function scroll(ctx, x, y, w, len, o = {}) { // a long invoice scroll; len = unrolled length
    ctx.save(); ctx.translate(x, y); shape(ctx, '#f2e6c4', 4, rect(-w / 2, 0, w, len, 2)); shape(ctx, '#d8c8a0', 4, ellipse(0, 0, w / 2 + 8, 16)); shape(ctx, '#d8c8a0', 4, ellipse(0, len, w / 2 + 8, 18));
    if (o.title) txt(ctx, o.title, 0, 40, FX.DISPLAY(o.px || 30), '#7a2a24');
    const r = rng(o.seed || 3); for (let yy = 80; yy < len - 30; yy += 30) { line(ctx, [[-w / 2 + 30, yy], [-w / 2 + 30 + (w - 120) * (.4 + r() * .5), yy]], 4, 'rgba(70,64,58,.45)'); txt(ctx, '…', w / 2 - 50, yy - 2, FX.FONT(700, 16), 'rgba(70,64,58,.6)'); }
    ctx.restore(); }
  function ingot(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#d8dce0', 3.5, poly([[-30, 0], [30, 0], [22, -18], [-22, -18]])); shape(ctx, '#f4f6f8', 0, poly([[-18, -16], [18, -16], [14, -12], [-14, -12]])); ctx.restore(); }
  function elephant(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const lx of [-40, -14, 20, 44]) shape(ctx, '#9aa0a8', 3.5, rect(lx - 10, -50, 20, 50, 4)); shape(ctx, '#a8aeb6', 4, ellipse(0, -74, 64, 40)); shape(ctx, '#a8aeb6', 4, circle(58, -90, 28)); shape(ctx, '#9aa0a8', 3.5, smooth([[78, -84], [92, -50], [86, -20], [96, -12], [80, -14], [74, -50]])); shape(ctx, '#b8bec6', 3, ellipse(44, -88, 14, 22)); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(66, -96, 3, 0, 7); ctx.fill(); ctx.restore(); }
  function tent(ctx, x, y, s, col = '#efe2c0') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, poly([[-50, 0], [0, -70], [50, 0]])); shape(ctx, '#5a4026', 3, poly([[-8, 0], [0, -30], [8, 0]])); line(ctx, [[0, -70], [0, -86]], 3); shape(ctx, RED, 2, poly([[0, -86], [16, -82], [0, -78]])); ctx.restore(); }
  const still = (ctx, lt, dur, z0 = 1, z1 = 1.06, fx = 640, fy = 380) => cam(ctx, lerp(z0, z1, ease.sine(clamp(lt / dur))), fx, fy); // slow, steady push for the 1204 frames
  function grain(ctx, a = .12) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a; ctx.fillStyle = '#d8b890'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  const DANDO = o => P('dandolo', 'doge', o);

  // ---------- b1: chapter card — THE BILL ----------
  function b1(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400); scroll(ctx, 640, 260, 520, 520, { title: 'INVOICE', seed: 4 }); ctx.restore();
    strip(ctx, 'THE BILL', 640, 130, lt - .05, { px: 64, color: RED });
    vig(ctx);
  }

  // ---------- b2: the strangest invoice of the Middle Ages (it keeps unrolling) ----------
  function b2(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8c890'], [1, '#c89a62']]), 0, rect(0, 0, W, H));
    for (let x = 0; x < W; x += 80) shape(ctx, 'rgba(255,255,255,.06)', 0, rect(x, 0, 40, H));
    const un = ease.inOut(clamp((t - A.which) / 3.2)), len = lerp(120, 1600, un);
    ctx.save(); cam(ctx, 1, 640, lerp(360, 760, un));
    scroll(ctx, 640, 120, 480, len, { title: 'INVOICE', seed: 9 });
    ctx.restore();
    // a Venetian clerk keeps writing more lines at the top
    fig(ctx, 220, 720, .34, P('merchant', 'merchantRobe', { hands: { L: [-120, -470], R: [260, -820] }, handShape: { R: 'fist' }, face: { brows: 'smug', mouth: 'smile', look: [.8, -.2], eyes: blink(t, 4.4) } }));
    strip(ctx, 'THE STRANGEST INVOICE', 900, 110, since(t, 'invoice') - .1, { px: 36 }); strip(ctx, 'OF THE MIDDLE AGES', 900, 196, since(t, 'ages') - .1, { px: 28, color: RED });
    vig(ctx);
  }

  // ---------- b3: [MAP] northern France to Venice, 1201 — the envoys come to order a fleet ----------
  const FL = ([lon, lat]) => [60 + (lon + 5) * 52.7, 60 + (51 - lat) * 75];
  const ATL = [[-5, 51], [4, 51], [2.5, 51.05], [1.6, 50.9], [1.6, 50.1], [.1, 49.5], [-1.6, 49.7], [-1.6, 48.7], [-3, 48.8], [-4.6, 48.6], [-4.8, 48.4], [-4.3, 47.8], [-2.5, 47.3], [-2, 47.2], [-1.2, 46.2], [-1.2, 45.5], [-1.3, 44.5], [-1.6, 43.4], [-1.8, 43], [-5, 43]].map(FL);
  const GLION = [[3, 43], [3.2, 43.3], [4.1, 43.5], [4.8, 43.4], [5.4, 43.3], [6.2, 43.1], [7.3, 43.7], [8.2, 43.9], [8.9, 44.4], [9.8, 44.1], [10.2, 43.9], [10.4, 43]].map(FL);
  const ADR2 = [[13.9, 43], [13.6, 43.5], [12.6, 44.1], [12.3, 44.8], [12.3, 45.4], [13, 45.7], [13.8, 45.6], [13.6, 45.1], [13.8, 44.9], [14.4, 45.3], [15.2, 44.6], [15.6, 44], [16.4, 43.5], [17, 43]].map(FL);
  const ROUTE = [[4.07, 48.3], [5.04, 47.3], [6, 45.9], [6.9, 45.25], [7.7, 45.07], [9.2, 45.46], [11, 45.44], [12.3, 45.42]].map(FL);
  function frMap(ctx, t, k) {
    shape(ctx, '#efe0b8', 0, rect(-300, -300, 1900, 1400)); shape(ctx, '#cfd9a6', 4, rect(40, 40, 1200, 640, 6));
    ctx.save(); ctx.beginPath(); ctx.rect(40, 40, 1200, 640); ctx.clip();
    for (const sea of [ATL, GLION, ADR2]) shape(ctx, '#a8d4dc', 4, poly(sea));
    for (const [lon, lat] of [[6.3, 46.2], [7, 45.6], [7.8, 46.1], [8.8, 46.4], [10, 46.5], [11.2, 46.6], [12.4, 46.6], [13.4, 46.4], [6.6, 44.6], [7.2, 44.4]]) { const [x, y] = FL([lon, lat]); shape(ctx, '#b0a88c', 3, poly([[x - 34, y + 20], [x, y - 30], [x + 34, y + 20]])); shape(ctx, '#f4f2ea', 0, poly([[x - 10, y - 14], [x, y - 30], [x + 10, y - 14]])); }
    for (const [n, ll] of [['PARIS', [2.35, 48.85]], ['CHAMPAGNE', [4.07, 48.3]], ['LYON', [4.8, 45.75]], ['MILAN', [9.2, 45.46]], ['VENICE', [12.3, 45.42]]]) { const [x, y] = FL(ll); shape(ctx, n === 'VENICE' ? RED : '#5a4026', 3, circle(x, y, n === 'VENICE' ? 9 : 6)); txt(ctx, n, x, y + 22, `italic 700 ${n === 'VENICE' ? 20 : 15}px Georgia, serif`, '#4a2a1a'); }
    txt(ctx, 'FRANCE', 300, 330, FX.DISPLAY(34), 'rgba(90,70,40,.6)'); txt(ctx, 'THE ALPS', 640, 210, FX.DISPLAY(24), 'rgba(90,70,40,.6)');
    if (k > 0) { const n = Math.max(2, Math.ceil(ROUTE.length * k)), pts = ROUTE.slice(0, n); ctx.save(); ctx.setLineDash([14, 10]); line(ctx, pts, 7, RED); ctx.restore();
      const hd = pts[pts.length - 1]; for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(hd[0] - 18 - i * 22, hd[1] - 10 + (i % 2) * 6); shape(ctx, '#f4efe2', 3, c => c.roundRect(-9, -22, 18, 26, 4)); shape(ctx, RED, 0, rect(-2, -20, 4, 20)); shape(ctx, RED, 0, rect(-7, -14, 14, 4)); ctx.restore(); } }
    ctx.restore(); }
  function b3(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380); frMap(ctx, t, ease.inOut(clamp((t - A.knights + .3) / 2.4))); ctx.restore();
    const fl = since(t, 'fleet'); if (fl > 0) { const s = slam(fl); ctx.save(); ctx.translate(1010, 470); ctx.rotate(.05); ctx.scale(s, s); FX.paperDoc(ctx, 0, 0, 240, 120, { lines: 0, draw: c => { txt(c, 'ORDER:', 0, -22, FX.DISPLAY(28)); txt(c, 'ONE FLEET', 0, 20, FX.DISPLAY(30), RED); } }); ctx.restore(); }
    tag(ctx, 'FRENCH KNIGHTS PLANNING A CRUSADE', 420, 640, since(t, 'knights'), 22);
    vig(ctx);
    FX.dateTag(ctx, '1201');
  }

  // ---------- b4: ships enough for more than 33,000 men ----------
  function b4(ctx, lt, dur, t) {
    const th = since(t, 'thirty3');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    sky(ctx, t); farShore(ctx, 300, t); waterBand(ctx, 310, t, -600, 2200, '#4a98b0');
    // an order board on the quay; tiny soldiers file toward rows of planned ships
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const x = 120 + c * 190 + (r % 2) * 90, y = 380 + r * 90; ctx.save(); ctx.globalAlpha = .45; ctx.setLineDash([10, 8]); galley(ctx, x, y, .3, 4, t, { sail: false }); ctx.restore(); }
    const n = th > 0 ? Math.floor(clamp(th / 1.6) * 120) : 0; for (let i = 0; i < n; i++) { const c = i % 30, r = Math.floor(i / 30), x = 60 + c * 40, y = 640 + r * 20; shape(ctx, '#a8aeb6', 2.5, circle(x, y - 14, 8)); shape(ctx, '#f4efe2', 2.5, rect(x - 7, y - 6, 14, 14, 3)); shape(ctx, RED, 0, rect(x - 1.5, y - 4, 3, 10)); }
    ctx.restore();
    if (th > 0) { const v = Math.floor(lerp(0, 33500, ease.out(clamp(th / 1.4)))), s = pop(th); ctx.save(); ctx.translate(640, 140); ctx.scale(s, s); shape(ctx, '#1f2f4f', 5, rect(-330, -56, 660, 112, 10)); FX.bigText(ctx, (th > 1.4 ? '33,000+' : v.toLocaleString('en-US')) + ' MEN', 0, 0, 64, { color: GOLD }); ctx.restore(); }
    strip(ctx, 'ENOUGH SHIPS FOR…', 640, 60, since(t, 'ships') - .1, { px: 30 });
    vig(ctx);
    FX.dateTag(ctx, 'THE ORDER, 1201');
  }

  // ---------- b5: 85,000 marks of silver — about 22 tons ----------
  function b5(ctx, lt, dur, t) {
    const mk = since(t, 'marks'), tn = since(t, 'tons');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, '#4a3a52', 0, rect(-200, -200, 1700, 1100)); for (let x = -200; x < 1500; x += 120) shape(ctx, 'rgba(255,255,255,.04)', 0, rect(x, -200, 60, 1100)); glow(ctx, 640, 300, 520, 'rgba(255,236,190,.35)');
    shape(ctx, '#7a5434', 0, rect(-200, 560, 1700, 300)); line(ctx, [[-200, 560], [1500, 560]], 4);
    // the silver piles up, bar by bar
    const bars = mk > 0 ? Math.floor(clamp(mk / 1.6) * 90) : (since(t, 'price') > 0 ? 6 : 0);
    for (let i = 0; i < bars; i++) { const row = Math.floor(i / 15), col = i % 15 - row * .5; ingot(ctx, 300 + col * 46 + row * 23, 556 - row * 20, 1); }
    if (bars > 20) glow(ctx, 600, 480, 300, 'rgba(240,240,255,.35)');
    if (tn > 0) { const k = pop(tn); for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = clamp((tn - i * .2) / .3); elephant(ctx, 960 + (i % 2) * 150, 556 - Math.floor(i / 2) * 6, .9); ctx.restore(); } }
    ctx.restore();
    if (mk > 0) { const s = pop(mk); ctx.save(); ctx.translate(560, 140); ctx.scale(s, s); FX.bigText(ctx, '85,000 MARKS', 0, 0, 58, { color: '#e8eef4' }); ctx.restore(); txt(ctx, 'OF SILVER', 560, 196, FX.DISPLAY(26), '#e8eef4'); }
    if (tn > 0) { tag(ctx, '≈ 22 TONS — ABOUT FOUR ELEPHANTS', 1010, 640, tn, 22); }
    vig(ctx);
    FX.dateTag(ctx, 'THE PRICE');
  }

  // ---------- b6: roughly double what the king of France took in during a year (a balance) ----------
  function chest(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#7a4a2a', 4, rect(-50, -50, 100, 50, 4)); shape(ctx, '#8a5a34', 4, c => { c.moveTo(-50, -50); c.quadraticCurveTo(0, -80, 50, -50); c.closePath(); }); shape(ctx, GOLD, 3, rect(-8, -40, 16, 16, 3)); for (const d of [-1, 1]) shape(ctx, GOLD, 0, rect(d * 40 - 3, -50, 6, 50)); ctx.restore(); }
  function b6(ctx, lt, dur, t) {
    const db = since(t, 'double'), kg = since(t, 'king');
    const tilt = db > 0 ? FX.approach(t, A.double, 0, -.2, .25) : 0;
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f0d8a8'], [1, '#d8b080']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 260, 520, 'rgba(255,240,210,.5)');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#7a5434', 5, rect(610, 220, 60, 400)); shape(ctx, '#6e4a2c', 5, rect(520, 600, 240, 40, 6)); shape(ctx, GOLD, 4, circle(640, 220, 18));
    ctx.save(); ctx.translate(640, 220); ctx.rotate(tilt); line(ctx, [[-340, 0], [340, 0]], 12, '#7a5434');
    for (const d of [-1, 1]) { const px = d * 320, py = 0; line(ctx, [[px, py], [px - 70, py + 160]], 3); line(ctx, [[px, py], [px + 70, py + 160]], 3);
      ctx.save(); ctx.translate(px, py + 160); ctx.rotate(-tilt); shape(ctx, '#c9a14a', 4, c => { c.moveTo(-100, 0); c.lineTo(100, 0); c.quadraticCurveTo(80, 26, 0, 30); c.quadraticCurveTo(-80, 26, -100, 0); c.closePath(); });
        if (d < 0) { chest(ctx, -40, 0, .8); chest(ctx, 40, 0, .8); } else if (kg > 0) chest(ctx, 0, 0, .8); ctx.restore(); }
    ctx.restore();
    ctx.restore();
    tag(ctx, 'THE FLEET', 320, 560 - tilt * 320, lt, 24); if (kg > 0) tag(ctx, "FRANCE'S CROWN, 1 YEAR", 960, 470 + tilt * 320, kg, 22);
    if (db > 0) { const s = pop(db); ctx.save(); ctx.translate(640, 90); ctx.scale(s, s); FX.bigText(ctx, '≈ 2×', 0, 0, 72, { color: GOLD }); ctx.restore(); }
    vig(ctx);
  }

  // ---------- b7: Venice builds the fleet ----------
  function b7(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, lerp(1.15, 1.0, ease.inOut(clamp(lt / dur))), 640, 400);
    sky(ctx, t, '#8fd0ec', '#fbe8c0');
    ctx.save(); ctx.translate(0, -40); basilica(ctx, 1080, 420, .42, t); campanile(ctx, 960, 430, .36); ctx.restore();
    shape(ctx, '#d8c8a8', 4, rect(-200, 380, 1700, 26)); waterBand(ctx, 400, t, -600, 2200, '#4a98b0');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) { const i = r * 7 + c, k = pop(t - A.builds + .2 - i * .06); if (k <= 0) continue; ctx.save(); ctx.translate(80 + c * 170 + (r % 2) * 80, 460 + r * 90); ctx.scale(k, k); galley(ctx, 0, 0, .3 + r * .04, 4, t, { flag: RED, sailCol: '#f4e2c0' }); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'VENICE BUILDS THE FLEET', 480, 100, since(t, 'builds') - .1, { px: 36 });
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1202');
  }

  // ---------- b8: the crusaders arrive — only about a third — short by 30,000+ marks ----------
  function b8(ctx, lt, dur, t) {
    const th = since(t, 'third'), sh = since(t, 'short');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    sky(ctx, t); waterBand(ctx, 330, t, -600, 2200, '#4a98b0'); for (let i = 0; i < 7; i++) galley(ctx, 80 + i * 180, 360, .22, 4, t, { flag: RED });
    shape(ctx, '#e2d29a', 4, rect(-200, 400, 1700, 400));
    // a camp marked out for everyone — only a third of it fills
    ctx.save(); ctx.setLineDash([14, 10]); ctx.strokeStyle = '#7a5434'; ctx.lineWidth = 4; ctx.strokeRect(100, 430, 1080, 250); ctx.restore(); txt(ctx, 'CAMP FOR 33,000', 640, 700, FX.FONT(700, 18), '#5a4026');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) { const x = 150 + c * 88, y = 500 + r * 70, filled = c < 4; if (filled) { const k = pop(t - A.arrive + .3 - (r * 4 + c) * .04); if (k <= 0) continue; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); tent(ctx, 0, 0, .7); ctx.restore(); } else { ctx.save(); ctx.globalAlpha = .25; tent(ctx, x, y, .7, '#d8c8a0'); ctx.restore(); } }
    for (let i = 0; i < 6; i++) fig(ctx, 140 + i * 50, 690, .14, P('knight', 'crusader', { face: { look: [.5, 0] } }));
    ctx.restore();
    if (th > 0) { const s = pop(th); ctx.save(); ctx.translate(500, 140); ctx.scale(s, s); FX.bigText(ctx, 'ONLY ⅓ CAME', 0, 0, 56, { color: GOLD }); ctx.restore(); }
    if (sh > 0) FX.stamp(ctx, 'SHORT 30,000+ MARKS', 900, 250, sh, { color: RED, size: 34, rot: -.06 });
    vig(ctx);
    FX.dateTag(ctx, 'THE LIDO, SUMMER 1202');
  }

  // ---------- b9: the man holding the bill is the doge — Enrico Dandolo ----------
  function palaceHall(ctx, t) {
    shape(ctx, '#e8d0a0', 0, rect(-200, -200, 1700, 1100)); for (let x = -200; x < 1500; x += 160) { shape(ctx, '#d8b878', 0, rect(x, -200, 12, 860)); }
    for (const x of [220, 1060]) { shape(ctx, '#f0e6d0', 5, c => { c.moveTo(x - 90, 520); c.lineTo(x - 90, 220); c.quadraticCurveTo(x - 90, 130, x, 100); c.quadraticCurveTo(x + 90, 130, x + 90, 220); c.lineTo(x + 90, 520); c.closePath(); });
      ctx.save(); ctx.beginPath(); ctx.moveTo(x - 70, 510); ctx.lineTo(x - 70, 230); ctx.quadraticCurveTo(x - 70, 150, x, 124); ctx.quadraticCurveTo(x + 70, 150, x + 70, 230); ctx.lineTo(x + 70, 510); ctx.closePath(); ctx.clip();
        shape(ctx, grad(ctx, 0, 120, 0, 510, [[0, '#8fd0ec'], [1, '#fbe8c0']]), 0, rect(x - 80, 110, 160, 410)); shape(ctx, '#4a98b0', 0, rect(x - 80, 400, 160, 120)); galley(ctx, x, 420, .18, 4, t, { flag: RED }); ctx.restore(); }
    shape(ctx, '#8a2a24', 0, rect(-200, 560, 1700, 300)); for (let x = -200; x < 1500; x += 70) shape(ctx, (x / 70) % 2 ? '#f0e6d0' : '#c8a878', 0, poly([[x, 560], [x + 35, 600], [x + 70, 560]]));
    shape(ctx, '#c9a14a', 5, rect(500, 120, 280, 40, 6)); txt(ctx, 'DOGE', 640, 141, FX.DISPLAY(24), '#5a3a22'); }
  function b9(ctx, lt, dur, t) {
    const dg = since(t, 'doge'), lf = since(t, 'life'), nm = since(t, 'name');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 360);
    palaceHall(ctx, t);
    fig(ctx, 640, 690, .4, DANDO({ hands: { L: [-160, -720], R: [160, -720] }, face: { eyes: .38, brows: 'calm', mouth: 'flat', look: [0, .2] }, breathe: breathe(t) }));
    scroll(ctx, 640, 690 - 760 * .4 - 10, 150, 110, { title: 'BILL', px: 20, seed: 5 });
    ctx.restore();
    if (dg > 0) tag(ctx, "THE DOGE: VENICE'S RULER", 300, 210, dg, 22); if (lf > 0) tag(ctx, 'ELECTED FOR LIFE', 300, 270, lf - .1, 20);
    card(ctx, [['ENRICO DANDOLO', FX.DISPLAY(30)], ['DOGE OF VENICE', FX.FONT(600, 18)]], 990, 230, nm, 360);
    vig(ctx);
    FX.dateTag(ctx, "DOGE'S PALACE, 1202");
  }
  function card(ctx, lines, x, y, k, w = 360) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(x + 300, x, e), y); ctx.rotate(.02);
    const h = 30 + lines.length * 34; ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, PAPER, 3.5, rect(-w / 2, -h / 2, w, h, 3)); lines.forEach(([s, f], i) => txt(ctx, s, 0, -h / 2 + 32 + i * 34, f)); ctx.restore(); }

  // ---------- b10: he's blind; nobody recorded his birthday — somewhere between his mid-80s and mid-90s ----------
  function b10(ctx, lt, dur, t) {
    const bl = since(t, 'blind'), bd = since(t, 'birthday'), e8 = since(t, 'eighties'), n9 = since(t, 'nineties');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#d8b878'], [1, '#b8905a']]), 0, rect(0, 0, W, H)); glow(ctx, 380, 300, 420, 'rgba(255,236,190,.5)');
    ctx.save(); cam(ctx, lerp(1.9, 2.0, clamp(lt / dur)), 380, 250);
    fig(ctx, 380, 760, .42, DANDO({ hands: { L: [-160, -560], R: [160, -560] }, face: { eyes: .32, brows: 'calm', mouth: 'flat', look: [0, 0] }, breathe: breathe(t) }));
    ctx.restore();
    if (bl > 0) strip(ctx, 'BLIND', 380, 640, bl, { px: 40 });
    // the age dial: a marker drifting between 85 and 95
    if (bd > 0) { const s = pop(bd); ctx.save(); ctx.translate(950, 300); ctx.scale(s, s); shape(ctx, PAPER, 4, rect(-230, -150, 460, 300, 8));
      txt(ctx, 'BIRTHDAY:', -110, -100, FX.FONT(700, 24)); txt(ctx, '???', 90, -100, FX.DISPLAY(36), RED);
      line(ctx, [[-180, 40], [180, 40]], 8, '#c8b890'); for (const [v, x] of [[80, -180], [85, -90], [90, 0], [95, 90], [100, 180]]) { line(ctx, [[x, 28], [x, 52]], 3); txt(ctx, String(v), x, 74, FX.FONT(700, 18)); }
      const lo = e8 > 0 ? -90 : -90, hi = n9 > 0 ? 90 : (e8 > 0 ? lerp(-90, 90, clamp(e8 / .9)) : -90); if (e8 > 0) shape(ctx, 'rgba(184,50,42,.35)', 3, rect(lo, 30, hi - lo, 20, 6));
      const m = lerp(lo, hi, (Math.sin(t * 1.4) + 1) / 2); shape(ctx, RED, 3, poly([[m, 24], [m - 12, 4], [m + 12, 4]])); txt(ctx, 'AGE ≈ 85–95', 0, 120, FX.DISPLAY(28)); ctx.restore(); }
    vig(ctx);
  }

  // ---------- b11: a payment plan — work it off: first, retake a rebel port across the Adriatic ----------
  function planDoc(ctx, x, y, rows) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.02); shape(ctx, '#f2e6c4', 4, rect(-220, -150, 440, 300, 4)); txt(ctx, 'PAYMENT PLAN', 0, -112, FX.DISPLAY(32), '#7a2a24'); line(ctx, [[-190, -86], [190, -86]], 3);
    rows.forEach(([s, k], i) => { if (k <= 0) return; ctx.globalAlpha = clamp(k / .25); txt(ctx, s, -190, -46 + i * 46, FX.FONT(700, 22), INK, 'left'); ctx.globalAlpha = 1; }); ctx.restore(); }
  function b11(ctx, lt, dur, t) {
    const pl = since(t, 'plan'), fs = since(t, 'first'), pt = since(t, 'port');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    palaceHall(ctx, t);
    shape(ctx, '#6e4a2c', 5, rect(330, 470, 620, 30, 4)); shape(ctx, '#5a3a22', 5, rect(350, 500, 580, 200));
    fig(ctx, 300, 700, .36, DANDO({ hands: { L: [-120, -560], R: [260, -640] }, face: { eyes: .38, brows: 'calm', mouth: pl > 0 ? 'smile' : 'flat', look: [.5, 0] }, breathe: breathe(t) }));
    for (let i = 0; i < 3; i++) fig(ctx, 900 + i * 110, 700, .32, P('knight', 'crusader', { hands: { L: [-120, -470], R: [120, -470] }, face: { brows: i === 1 ? 'worried' : 'up', mouth: 'o', look: [-.7, .1], eyes: blink(t, 52 + i) }, breathe: breathe(t + i) }), { mirror: true });
    ctx.restore();
    if (pl > 0) { const s = pop(pl); ctx.save(); ctx.translate(640, 250); ctx.scale(s, s); planDoc(ctx, 0, 0, [['WORK IT OFF:', since(t, 'workoff')], ['1. RETAKE A REBEL PORT', fs]]); ctx.restore(); }
    // the port across the Adriatic: a small inset map with an arrow to Zara
    if (pt > 0) { const s = pop(pt); ctx.save(); ctx.translate(1060, 170); ctx.scale(s, s); shape(ctx, '#efe0b8', 4, rect(-160, -110, 320, 220, 6)); ctx.save(); ctx.beginPath(); ctx.rect(-160, -110, 320, 220); ctx.clip();
      shape(ctx, '#a8d4dc', 3, poly([[-160, -40], [-120, -90], [-80, -110], [-40, -80], [40, 20], [120, 110], [-30, 110], [-90, 40], [-160, 10]])); ctx.restore();
      shape(ctx, RED, 3, circle(-110, -86, 7)); txt(ctx, 'VENICE', -100, -64, `italic 700 14px Georgia, serif`); shape(ctx, RED, 3, circle(30, -4, 7)); txt(ctx, 'ZARA', 60, -20, `italic 700 15px Georgia, serif`);
      const k = ease.out(clamp(pt / .8)); line(ctx, [[-100, -80], [lerp(-100, 20, k), lerp(-80, -10, k)]], 5, RED); ctx.restore(); FX.caption(ctx, 'A REBEL PORT ACROSS THE ADRIATIC', pt, .1); }
    vig(ctx);
  }

  // ---------- b12: then sail to Constantinople, put a young prince on the throne — he promises everything ----------
  function b12(ctx, lt, dur, t) {
    const yg = since(t, 'young'), pr = since(t, 'promises'), ev = since(t, 'everything');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    palaceHall(ctx, t);
    planDoc(ctx, 330, 300, [['WORK IT OFF:', 1], ['1. RETAKE A REBEL PORT', 1], ['2. SAIL TO CONSTANTINOPLE', since(t, 'cpl') + .2], ['3. CROWN A YOUNG PRINCE', yg]]);
    if (yg > 0) { const x = FX.approach(t, A.young, 1500, 900, .3);
      shape(ctx, GOLD, 5, c => { c.moveTo(x - 90, 690); c.lineTo(x - 90, 420); c.quadraticCurveTo(x, 360, x + 90, 420); c.lineTo(x + 90, 690); c.closePath(); });
      fig(ctx, x, 700, .32, P('prince', 'princeRobe', { hands: pr > 0 ? { L: [-120, -470], R: [-200, -700] } : { L: [-140, -800], R: [140, -800] }, handShape: { R: pr > 0 ? 'fist' : 'open' }, face: { brows: 'up', mouth: 'smile', look: [-.6, 0], eyes: blink(t, 61.0) }, breathe: breathe(t) }));
      if (pr > 0) { const s = pop(pr); ctx.save(); ctx.translate(x - 200, 380); ctx.rotate(-.06); ctx.scale(s, s); FX.paperDoc(ctx, 0, 0, 230, 130, { lines: 0, draw: c => { txt(c, 'I.O.U.', 0, -26, FX.DISPLAY(38), '#7a2a24'); txt(c, ev > 0 ? 'EVERYTHING' : '…', 0, 22, FX.DISPLAY(28)); } }); ctx.restore(); } }
    ctx.restore();
    if (yg > 0) tag(ctx, 'A YOUNG BYZANTINE PRINCE', 900, 140, yg - .1, 22);
    vig(ctx);
  }

  // ---------- b13: the prince can't pay either (the last light beat) ----------
  function b13(ctx, lt, dur, t) {
    const cp = since(t, 'cantpay');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8d0a0'], [1, '#c8a070']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, lerp(1.3, 1.36, clamp(lt / dur)), 640, 360);
    fig(ctx, 640, 760, .44, P('prince', 'princeRobe', { hands: { L: [-160, -520], R: [180, -760] }, handShape: { R: 'fist' }, face: { brows: 'worried', mouth: 'o', look: [.4, -.3], eyes: blink(t, 65.0) }, breathe: breathe(t) }));
    const hx = 640 + 180 * .44, hy = 760 - 760 * .44, tip = cp > 0 ? ease.out(clamp(cp / .4)) : 0; ctx.save(); ctx.translate(hx, hy + 30); ctx.rotate(Math.PI * tip); shape(ctx, '#a8402a', 4, smooth([[-26, 0], [-30, 40], [0, 54], [30, 40], [26, 0], [0, -8]])); line(ctx, [[-14, -4], [14, -4]], 4, GOLD); ctx.restore();
    if (cp > .3) { const k = clamp((cp - .3) / 1.2); ctx.save(); ctx.globalAlpha = 1 - k; shape(ctx, '#d8d0c0', 2.5, ellipse(hx + k * 40, hy + 80 + k * 60, 6, 3)); ctx.restore(); }
    ctx.restore();
    if (cp > 0) FX.stamp(ctx, 'UNPAID', 300, 220, cp + .1, { color: RED, size: 54, rot: -.12 });
    vig(ctx);
  }

  // ======================= 1204 — music out; slow, still frames =======================
  function seaWalls(ctx, t, smoke = 0) {
    shape(ctx, grad(ctx, 0, 0, 0, 470, [[0, '#d8a888'], [1, '#f0c890']]), 0, rect(-200, -200, 1700, 700)); glow(ctx, 980, 380, 420, 'rgba(255,220,170,.45)');
    hagiaSophia(ctx, 520, 360, .9); for (const x of [260, 800, 900]) cypress(ctx, x, 380, .7);
    shape(ctx, '#c8a888', 5, rect(-200, 330, 1700, 120)); for (let x = -180; x < 1500; x += 150) { shape(ctx, '#c8a888', 4.5, rect(x, 270, 70, 180)); for (let k = 0; k < 4; k++) shape(ctx, '#c8a888', 3, rect(x + k * 18, 256, 12, 16)); }
    for (let x = -200; x < 1500; x += 30) shape(ctx, '#b89878', 0, rect(x, 316, 18, 16));
    if (smoke > 0) for (let i = 0; i < 6; i++) { const ph = (t * .06 + i / 6) % 1; ctx.save(); ctx.globalAlpha = .4 * smoke * (1 - ph); ctx.filter = 'blur(4px)'; shape(ctx, '#7a6a64', 0, circle(120 + i * 210 + Math.sin(i) * 40, 250 - ph * 220, 50 + ph * 70)); ctx.restore(); }
    shape(ctx, '#5a8aa0', 0, rect(-200, 450, 1700, 400)); }
  function b14(ctx, lt, dur, t) { // April 1204: the crusaders and Venetians storm Constantinople from the ships
    ctx.save(); still(ctx, lt, dur, 1, 1.06, 640, 400);
    seaWalls(ctx, t, .7);
    for (let i = 0; i < 4; i++) { const x = 140 + i * 300; galley(ctx, x, 500, .55, 4, 0, { flag: RED, sail: false }); line(ctx, [[x + 20, 380], [x + 70, 300]], 10, '#6e4a2c'); line(ctx, [[x + 10, 384], [x + 60, 304]], 3, '#5a4026'); }
    ctx.restore();
    grain(ctx, .1);
    tag(ctx, 'THE CRUSADERS AND THE VENETIANS', 640, 640, since(t, 'crusaders'), 22);
    FX.dateTag(ctx, 'CONSTANTINOPLE, APRIL 1204');
  }
  function b15(ctx, lt, dur, t) { // a Christian city — the same city that made Venice rich
    ctx.save(); still(ctx, lt, dur, 1.25, 1.32, 520, 260);
    seaWalls(ctx, t, .4); line(ctx, [[520, 300 - 300 * .9 + 34], [520, 300 - 300 * .9 - 10]], 5, '#3a2a20'); line(ctx, [[505, 300 - 300 * .9 + 4], [535, 300 - 300 * .9 + 4]], 5, '#3a2a20');
    ctx.save(); ctx.translate(820, 180); const wv = Math.sin(t * .8) * .05; ctx.rotate(wv); line(ctx, [[0, 0], [0, 140]], 5, '#5a4026'); shape(ctx, '#c0303e', 3, c => { c.moveTo(0, 0); c.lineTo(120, 10 + Math.sin(t) * 6); c.lineTo(96, 40); c.lineTo(120, 70 + Math.sin(t + 1) * 6); c.lineTo(0, 60); c.closePath(); }); ctx.restore();
    ctx.restore(); grain(ctx, .1);
    FX.caption(ctx, 'A CHRISTIAN CITY', since(t, 'christian'), .1, W - 60, 40); if (since(t, 'same') > 0) FX.caption(ctx, 'THE CITY THAT MADE VENICE RICH', since(t, 'same'), .1);
  }
  function b16(ctx, lt, dur, t) { // three days of looting; churches stripped; civilians killed — three slow tableaux
    const p1 = clamp((A.churches - .3 - t) / .8), p3 = clamp((t - A.civilians + .4) / .8), p2 = 1 - p1 - p3;
    if (p1 > 0) { ctx.save(); ctx.globalAlpha = p1; ctx.save(); still(ctx, lt, dur, 1, 1.05); shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#c88868'], [1, '#e8b080']]), 0, rect(-200, -200, 1700, 1100));
      for (let i = 0; i < 14; i++) { const x = -100 + i * 110, h = 120 + (i * 53) % 140; shape(ctx, '#8a6a5a', 3.5, rect(x, 520 - h, 90, h)); }
      for (const x of [200, 560, 880, 1120]) { glow(ctx, x, 420, 140, 'rgba(255,150,70,.5)'); for (let i = 0; i < 3; i++) { const ph = (t * .1 + i / 3) % 1; ctx.save(); ctx.globalAlpha = .45 * (1 - ph); ctx.filter = 'blur(4px)'; shape(ctx, '#6a5a54', 0, circle(x + i * 10, 380 - ph * 260, 40 + ph * 60)); ctx.restore(); } }
      shape(ctx, '#6a5048', 0, rect(-200, 520, 1700, 300)); ctx.restore(); ctx.restore(); }
    if (p2 > 0) { ctx.save(); ctx.globalAlpha = p2; ctx.save(); still(ctx, lt, dur, 1.02, 1.07); shape(ctx, '#d8b880', 0, rect(-200, -200, 1700, 1100));
      shape(ctx, '#c8a060', 5, c => { c.moveTo(340, 640); c.lineTo(340, 260); c.arc(640, 260, 300, Math.PI, 0); c.lineTo(940, 640); c.closePath(); });
      const r = rng(4); ctx.save(); ctx.beginPath(); ctx.moveTo(380, 640); ctx.lineTo(380, 270); ctx.arc(640, 270, 260, Math.PI, 0); ctx.lineTo(900, 640); ctx.closePath(); ctx.clip();
      for (let y = 0; y < 640; y += 14) for (let x = 380; x < 900; x += 14) { if (r() < .35) continue; ctx.fillStyle = r() < .5 ? '#e8b84a' : '#d8a238'; ctx.fillRect(x, y, 13, 13); } ctx.restore();
      shape(ctx, '#a89070', 4, rect(560, 470, 160, 170, 4)); for (const x of [480, 800]) { shape(ctx, 'rgba(90,70,50,.5)', 0, rect(x - 6, 400, 12, 120)); }
      ctx.restore(); ctx.restore(); }
    if (p3 > 0) { ctx.save(); ctx.globalAlpha = p3; ctx.save(); still(ctx, lt, dur, 1.04, 1.08); shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#b88870'], [1, '#e0b088']]), 0, rect(-200, -200, 1700, 1100));
      for (const [x, w, h] of [[-100, 260, 420], [1040, 340, 460]]) shape(ctx, '#8a6a5a', 4, rect(x, 560 - h, w, h));
      for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = .35; ctx.filter = 'blur(5px)'; shape(ctx, '#6a5a54', 0, circle(300 + i * 220, 260, 120)); ctx.restore(); }
      shape(ctx, '#7a6058', 0, rect(-200, 560, 1700, 300));
      [['elder', 'tunicElder', 380], ['villagerW', 'dressPlain', 470], ['fisher', 'tunicPoor', 560], ['villagerW', 'dressPlain', 700], ['elder', 'tunicElder', 820]].forEach(([h, o, x], i) => fig(ctx, x + lt * 12, 600, .24 - (i % 2) * .02, P(h, o, { feet: { L: [-50, -40], R: [50, -40] }, hands: { L: [-150, -560], R: [150, -560] }, lean: .08 }), { tint: '#3a2a26' }));
      ctx.restore(); ctx.restore(); }
    grain(ctx, .12);
    if (p1 > .5) FX.caption(ctx, 'THREE DAYS OF LOOTING', since(t, 'three'), .1); else if (p2 > .5) FX.caption(ctx, 'CHURCHES STRIPPED', since(t, 'churches'), .1); else FX.caption(ctx, 'CIVILIANS KILLED', since(t, 'civilians'), .1);
    FX.dateTag(ctx, 'APRIL 1204');
  }
  function sepiaMed(ctx, t) { shape(ctx, '#e6d2a8', 0, rect(-600, -600, 2500, 1900)); shape(ctx, '#c8d0c0', 4, poly(MED)); shape(ctx, '#c8d0c0', 3.5, poly(BLACK)); for (const [lon, lat, rx, ry, a] of ISL) { const [x, y] = LL([lon, lat]); shape(ctx, '#e6d2a8', 3, ellipse(x, y, rx, ry, a)); } }
  function b17(ctx, lt, dur, t) { // the crusade never reaches the Holy Land
    const nv = since(t, 'never');
    ctx.save(); still(ctx, lt, dur, 1.05, 1.1, 760, 420); sepiaMed(ctx, t);
    const ZARA = LL([15.23, 44.12]), JER = LL([35.2, 31.8]), V0 = LL([12.3, 45.3]), CP = LL([29, 41.05]);
    ctx.save(); ctx.setLineDash([12, 9]); line(ctx, [V0, ZARA, LL([18.6, 40.8]), LL([20.9, 37.2]), LL([24, 36.7]), LL([26, 40.1]), CP], 6, RED); ctx.restore();
    ctx.save(); ctx.globalAlpha = .45; ctx.setLineDash([6, 10]); line(ctx, [CP, LL([30.7, 36.4]), LL([34, 33.5]), JER], 5, '#5a4a3a'); ctx.restore();
    for (const [p, n] of [[V0, 'VENICE'], [ZARA, 'ZARA'], [CP, 'CONSTANTINOPLE'], [JER, 'JERUSALEM']]) { shape(ctx, n === 'JERUSALEM' ? '#8a7a6a' : RED, 3, circle(p[0], p[1], 7)); txt(ctx, n, p[0], p[1] - 20, `italic 700 16px Georgia, serif`, '#3a2a1a'); }
    if (nv > 0) { const k = clamp(nv / .5); ctx.save(); ctx.globalAlpha = k; line(ctx, [[JER[0] - 22, JER[1] - 22], [JER[0] + 22, JER[1] + 22]], 8, RED); line(ctx, [[JER[0] - 22, JER[1] + 22], [JER[0] + 22, JER[1] - 22]], 8, RED); ctx.restore(); }
    ctx.restore(); grain(ctx, .08);
    FX.caption(ctx, 'THE CRUSADE NEVER REACHES THE HOLY LAND', nv, .1);
  }
  function b18(ctx, lt, dur, t) { // historians still argue: steered from the start, or a debt rolling downhill?
    const st = since(t, 'steer'), rl = since(t, 'roll'), bd = since(t, 'bad');
    shape(ctx, '#e6d2a8', 0, rect(0, 0, W, H));
    // left: steered from the start — the doge at a ship's wheel, the course fixed on Constantinople
    ctx.save(); ctx.beginPath(); ctx.rect(20, 20, 610, 680); ctx.clip(); ctx.save(); still(ctx, lt, dur, 1, 1.05, 325, 360);
    shape(ctx, grad(ctx, 0, 20, 0, 460, [[0, '#c8b8a8'], [1, '#e8d0b0']]), 0, rect(20, 20, 610, 680)); shape(ctx, '#7a9aa8', 0, rect(20, 460, 610, 240));
    shape(ctx, '#7a5434', 4, rect(40, 470, 570, 60, 6)); fig(ctx, 260, 480, .28, DANDO({ hands: { L: [80, -700], R: [240, -700] }, face: { eyes: .38, brows: 'calm', mouth: 'flat', look: [.6, 0] } }));
    ctx.save(); ctx.translate(410, 300); ctx.rotate(t * .1); shape(ctx, null, 8, circle(0, 0, 70)); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(ctx, [[0, 0], [Math.cos(a) * 96, Math.sin(a) * 96]], 6, '#5a4026'); } ctx.restore();
    ctx.restore(); ctx.restore(); shape(ctx, null, 5, rect(20, 20, 610, 680, 6)); tag(ctx, 'STEERED FROM THE START?', 325, 70, st, 22);
    // right: a debt rolling downhill, gathering one bad option after another
    ctx.save(); ctx.beginPath(); ctx.rect(650, 20, 610, 680); ctx.clip(); ctx.save(); still(ctx, lt, dur, 1, 1.05, 955, 360);
    shape(ctx, grad(ctx, 0, 20, 0, 460, [[0, '#c8b8a8'], [1, '#e8d0b0']]), 0, rect(650, 20, 610, 680)); shape(ctx, '#b8a07a', 4, poly([[650, 200], [1260, 640], [1260, 700], [650, 700]]));
    const signs = [['ZARA', 760, 300], ['THE PRINCE', 930, 420], ['1204', 1110, 550]];
    signs.forEach(([s, x, y]) => { line(ctx, [[x, y], [x, y - 70]], 5, '#5a4026'); shape(ctx, '#f2e6c4', 3.5, rect(x - 56, y - 106, 112, 40, 3)); txt(ctx, s, x, y - 86, FX.DISPLAY(16)); });
    const k = rl > 0 ? clamp((t - A.roll) / 3.4) : 0, bx = lerp(690, 1180, k), by = lerp(220, 580, k), br = lerp(26, 70, k);
    ctx.save(); ctx.translate(bx, by - br); ctx.rotate(k * 12); shape(ctx, '#f2e6c4', 4, circle(0, 0, br)); line(ctx, [[-br * .6, -br * .3], [br * .6, -br * .3]], 3, 'rgba(70,64,58,.5)'); line(ctx, [[-br * .6, br * .2], [br * .5, br * .2]], 3, 'rgba(70,64,58,.5)'); ctx.restore();
    txt(ctx, 'DEBT', bx, by - br * 2 - 14, FX.DISPLAY(18), RED);
    ctx.restore(); ctx.restore(); shape(ctx, null, 5, rect(650, 20, 610, 680, 6)); tag(ctx, 'OR A DEBT ROLLING DOWNHILL?', 955, 70, rl, 22);
    grain(ctx, .08);
    if (bd > 0) FX.caption(ctx, 'ONE BAD OPTION AFTER ANOTHER', bd, .1);
  }
  function b19(ctx, lt, dur, t) { // for the people inside the walls, it made no difference
    ctx.save(); still(ctx, lt, dur, 1.15, 1.2, 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#b89080'], [1, '#e0b890']]), 0, rect(-200, -200, 1700, 1100));
    for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = .3; ctx.filter = 'blur(6px)'; shape(ctx, '#6a5a54', 0, circle(300 + i * 360, 200, 150)); ctx.restore(); }
    shape(ctx, '#a88a72', 5, rect(-200, 260, 1700, 400)); for (let x = -180; x < 1500; x += 70) shape(ctx, 'rgba(70,50,40,.18)', 0, rect(x, 260, 4, 400));
    [['elder', 'tunicElder', 520, .3], ['villagerW', 'dressPlain', 640, .28], ['fisher', 'tunicPoor', 740, .22]].forEach(([h, o, x, s]) => fig(ctx, x, 640, s, P(h, o, { hands: { L: [-100, -520], R: [100, -520] } }), { tint: '#4a3632' }));
    ctx.restore(); grain(ctx, .12);
    FX.caption(ctx, 'FOR THE PEOPLE INSIDE THE WALLS, IT MADE NO DIFFERENCE', since(t, 'inside'), .1);
  }
  function b20(ctx, lt, dur, t) { // Venice comes home with ports, islands, and a large share of a conquered empire
    const pt = since(t, 'ports'), is = since(t, 'islands'), sh = since(t, 'share');
    ctx.save(); still(ctx, lt, dur, 1.25, 1.3, 760, 480); sepiaMed(ctx, t);
    const VEN = '#b8322a';
    if (pt > 0) for (const [lon, lat] of [[21.7, 36.8], [21.95, 36.8], [23.0, 36.5], [19.9, 39.6], [15.23, 44.12], [26.4, 40.2]]) { const [x, y] = LL([lon, lat]); const k = pop(pt); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); shape(ctx, VEN, 3, rect(-6, -6, 12, 12, 2)); ctx.restore(); }
    if (is > 0) { ctx.save(); ctx.globalAlpha = clamp(is / .6); const [cx, cy] = LL([24.9, 35.2]); shape(ctx, VEN, 3, ellipse(cx, cy, 40, 8)); const [ex, ey] = LL([23.8, 38.6]); shape(ctx, VEN, 3, ellipse(ex, ey, 22, 7, -.6)); for (const [lon, lat] of [[25.4, 37.1], [24.4, 37.5], [25.2, 36.4]]) { const [x, y] = LL([lon, lat]); shape(ctx, VEN, 2.5, circle(x, y, 6)); } ctx.restore(); }
    if (sh > 0) { const [x, y] = LL([29, 41.05]); ctx.save(); ctx.globalAlpha = clamp(sh / .6) * .6; shape(ctx, VEN, 0, circle(x, y, 24)); ctx.restore(); }
    ctx.restore(); grain(ctx, .08);
    tag(ctx, 'PORTS', 300, 600, pt, 22); tag(ctx, 'ISLANDS', 480, 600, is, 22); tag(ctx, 'A SHARE OF AN EMPIRE', 720, 600, sh, 22);
    FX.dateTag(ctx, "VENICE'S SHARE, 1204");
  }

  // ---------- b21: four bronze horses — from the racetrack, across the sea, onto St Mark's ----------
  function hippodrome(ctx, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#d8b090'], [1, '#f0c890']]), 0, rect(-200, -200, 1700, 1100));
    shape(ctx, '#c8a888', 5, c => { c.moveTo(-200, 520); c.lineTo(-200, 300); for (let x = -200; x <= 1500; x += 60) c.lineTo(x, 300 + ((x / 60) % 2) * 10); c.lineTo(1500, 520); c.closePath(); });
    for (let i = 0; i < 16; i++) shape(ctx, '#a88a6a', 3, c => { const x = -160 + i * 110; c.moveTo(x, 520); c.lineTo(x, 380); c.arc(x + 30, 380, 30, Math.PI, 0); c.lineTo(x + 60, 520); c.closePath(); });
    shape(ctx, '#d8c098', 0, rect(-200, 520, 1700, 300)); shape(ctx, '#b89a78', 4, rect(-200, 600, 1700, 30, 8));
    shape(ctx, '#d8c8a8', 4, poly([[1060, 600], [1080, 280], [1100, 600]]));
    shape(ctx, '#c8b090', 5, rect(400, 400, 480, 120, 4)); }
  function b21(ctx, lt, dur, t) {
    const ph1 = t < A.taken + .6, ph3 = t >= A.door - .5, mixT = clamp((t - (A.door - .5)) / .6);
    if (!ph3 || mixT < 1) { ctx.save(); ctx.globalAlpha = ph3 ? 1 - mixT : 1; ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
      if (ph1) { hippodrome(ctx, t); for (let i = 0; i < 4; i++) horse(ctx, 470 + i * 110, 400, 1, i < 2 ? 1 : -1, since(t, 'horses') > 0 ? Math.max(.2, Math.exp(-(t - A.horses - i * .2) * 1.5)) : 0); tag(ctx, "CONSTANTINOPLE'S RACETRACK", 640, 140, since(t, 'taken') - .2, 24); }
      else { shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ccbe4'], [1, '#f4e6c4']]), 0, rect(-200, -200, 1700, 1100)); waterBand(ctx, 460, t, -600, 2200, '#4a98b0');
        const gx = lerp(200, 1000, clamp((t - A.taken - .6) / 2.4)); galley(ctx, gx, 540, .9, 4, t, { flag: RED, sailCol: '#f4e2c0' }); for (let i = 0; i < 4; i++) horse(ctx, gx - 150 + i * 70, 500, .55, i < 2 ? 1 : -1); tag(ctx, 'SHIPPED TO VENICE', 640, 140, t - A.taken - .6, 24); }
      ctx.restore(); ctx.restore(); }
    if (ph3) { ctx.save(); ctx.globalAlpha = mixT; ctx.save(); cam(ctx, lerp(1.3, 1.4, clamp((t - A.door) / 3)), 640, 330);
      shape(ctx, grad(ctx, 0, -200, 0, 460, [[0, '#7aaad6'], [1, '#ffe0a8']]), 0, rect(-200, -400, 1700, 1100)); basilica(ctx, 640, 470, 1.4, t, { horseGlow: i => Math.max(0, Math.exp(-(t - A.door - i * .15) * 1.2)) }); ctx.restore(); ctx.restore();
      tag(ctx, "ABOVE THE DOOR OF ST MARK'S", 640, 640, t - A.door, 24); }
    FX.dateTag(ctx, ph1 ? 'THE HIPPODROME, 1204' : ph3 ? "ST MARK'S, VENICE" : 'ACROSS THE SEA');
  }

  // ---------- b22: the horses from this morning — almost: these are copies; the originals moved indoors ----------
  function museum(ctx, t) {
    shape(ctx, '#c88a6a', 0, rect(-200, -200, 1700, 1100)); for (let i = 0; i < 4; i++) { const x = 160 + i * 320; shape(ctx, '#d8a07a', 5, c => { c.moveTo(x - 140, 560); c.lineTo(x - 140, 200); c.quadraticCurveTo(x, 80, x + 140, 200); c.lineTo(x + 140, 560); c.closePath(); }); shape(ctx, '#b87a5a', 0, c => { c.moveTo(x - 110, 560); c.lineTo(x - 110, 220); c.quadraticCurveTo(x, 120, x + 110, 220); c.lineTo(x + 110, 560); c.closePath(); }); }
    glow(ctx, 640, 300, 520, 'rgba(255,240,210,.45)'); shape(ctx, '#e8dcc8', 0, rect(-200, 560, 1700, 300)); for (let x = -200; x < 1500; x += 100) line(ctx, [[x, 560], [x - 60, 760]], 2, 'rgba(70,58,46,.25)');
    for (let i = 0; i < 4; i++) { const x = 250 + i * 260; shape(ctx, '#f0e6d4', 4, rect(x - 80, 500, 160, 70, 4)); horse(ctx, x, 502, 1.5, i < 2 ? 1 : -1, .25); } }
  function b22(ctx, lt, dur, t) {
    const am = since(t, 'almost'), cp = since(t, 'copies'), og = since(t, 'originals'), air = since(t, 'air');
    const inside = og > .3, mix = clamp((og - .3) / .7);
    if (mix < 1) { ctx.save(); ctx.globalAlpha = 1 - mix; ctx.save(); cam(ctx, lerp(1.0, 1.1, clamp(lt / 4)), 640, 360);
      shape(ctx, grad(ctx, 0, -200, 0, 460, [[0, '#6a9ed0'], [.6, '#f6c88a'], [1, '#ffe2a6']]), 0, rect(-200, -400, 1700, 1100)); glow(ctx, 900, 330, 520, 'rgba(255,236,190,.55)');
      basilica(ctx, 640, 470, 1.1, t, { horseGlow: i => am > 0 && am < 2 ? .6 : 0 }); shape(ctx, grad(ctx, 0, 470, 0, 720, [[0, '#b8a68e'], [1, '#8a7a68']]), 0, rect(-200, 470, 1700, 400));
      ctx.restore(); ctx.restore();
      if (am > 0 && am < .25) { ctx.save(); ctx.globalAlpha = .5 * (1 - am / .25); shape(ctx, '#fff', 0, rect(0, 0, W, H)); ctx.restore(); }
      if (cp > 0) FX.stamp(ctx, 'COPIES', 640, 250, cp, { color: RED, size: 56, rot: -.08 });
      strip(ctx, 'THE HORSES FROM THIS MORNING', 640, 640, lt - .2, { px: 30 }); if (am > 0) strip(ctx, '…ALMOST', 1000, 560, am, { px: 30, color: RED, rot: .04 }); }
    if (mix > 0) { ctx.save(); ctx.globalAlpha = mix; ctx.save(); cam(ctx, lerp(1.1, 1.0, mix), 640, 380); museum(ctx, t); ctx.restore(); ctx.restore();
      tag(ctx, 'THE ORIGINALS, INDOORS', 640, 120, og - .3, 26); if (since(t, 'y1980') > 0) tag(ctx, 'SINCE THE 1980s', 640, 186, since(t, 'y1980'), 22);
      if (air > -.6) { const k = clamp((air + .6) / .8); ctx.save(); ctx.globalAlpha = k; ctx.translate(1040, 420); shape(ctx, '#f3e8cc', 4, rect(-170, -130, 340, 260, 8)); ctx.save(); ctx.beginPath(); ctx.rect(-160, -120, 320, 240); ctx.clip();
        shape(ctx, '#b0aca4', 0, rect(-160, -120, 320, 240)); horse(ctx, 0, 80, 1.2, 1); for (let i = 0; i < 18; i++) { const px = ((i * 53 + t * 20) % 320) - 160, py = ((i * 37 + t * 8) % 240) - 120; shape(ctx, 'rgba(90,86,80,.6)', 0, circle(px, py, 4 + (i % 3) * 2)); } ctx.restore();
        txt(ctx, 'POLLUTED AIR OUTSIDE', 0, 150, FX.FONT(700, 18)); ctx.restore(); } }
    vig(ctx);
    FX.dateTag(ctx, mix < .5 ? "ST MARK'S · TODAY" : 'MUSEO DI SAN MARCO');
  }

  const cut = [[0, b1], [2.05, b2], [6.3, b3], [11.6, b4], [15.35, b5], [20.95, b6], [24.75, b7], [26.9, b8], [34.3, b9], [41.7, b10], [49.3, b11], [56.4, b12], [64.0, b13],
    [66.25, b14], [71.1, b15], [75.5, b16], [81.4, b17], [84.15, b18], [93.95, b19], [97.2, b20], [103.0, b21], [109.45, b22]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .7 }, { t: A.which, type: 'paper', gain: .5 }, { t: A.invoice, type: 'slide', gain: .4 },
    { t: A.knights, type: 'slide', gain: .4 }, { t: A.fleet, type: 'thud', gain: .6 }, { t: A.thirty3, type: 'ratchet', gain: .4 },
    { t: A.marks, type: 'rattle', gain: .4 }, { t: A.tons, type: 'thud', gain: .6 }, { t: A.double, type: 'creak', gain: .5 }, { t: A.king, type: 'thud', gain: .4 },
    { t: A.builds, type: 'press', gain: .4 }, { t: A.arrive, type: 'whoosh', gain: .3 }, { t: A.third, type: 'thud', gain: .5 }, { t: A.short, type: 'thud', gain: .8 },
    { t: A.doge, type: 'swell', gain: .4 }, { t: A.name, type: 'slide', gain: .4 }, { t: A.birthday, type: 'paper', gain: .4 },
    { t: A.plan, type: 'paper', gain: .5 }, { t: A.first, type: 'click', gain: .4 }, { t: A.port, type: 'slide', gain: .4 }, { t: A.cpl, type: 'click', gain: .4 }, { t: A.young, type: 'whoosh', gain: .3 },
    { t: A.promises, type: 'scratch', gain: .5 }, { t: A.cantpay, type: 'thud', gain: .7 },
    { t: A.april, type: 'boom', gain: .5 }, { t: A.storm, type: 'wind', gain: .3 }, { t: A.three, type: 'wind', gain: .3 }, { t: A.never, type: 'thud', gain: .4 },
    { t: A.roll, type: 'slide', gain: .3 }, { t: A.home, type: 'swell', gain: .3 }, { t: A.horses, type: 'swell', gain: .4 }, { t: A.door, type: 'swell', gain: .4 },
    { t: A.almost, type: 'scratch', gain: .5 }, { t: A.copies, type: 'thud', gain: .6 }, { t: A.originals + .3, type: 'whoosh', gain: .3 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.bill - .4, mood: 'tense' }, { t: A.either + .3, mood: 'silence' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-bill.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
