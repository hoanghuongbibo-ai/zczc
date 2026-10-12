/* New York — Beats 6 + 7 "The twist" / "The climax" (narration-climax.mp3 = 1.8 s pause + narration-full.mp3 512.6–687.6 s + 1 s tail).
 * Anchors = full-recording word times − 510.8. Ford spoke at the National Press Club (Ford Library transcript). The front page is recreated
 * with a made-up masthead and the real headline words. The 1977 blackout: silhouettes only, no faces. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { sofar: 513.24, toughness: 515.4, knocked: 517.08, back: 518.72, skips: 521.07, buildings: 522.09, toughness2: 524.52, aqueduct: 526.0, every: 527.11, two: 529.57, harbor: 530.88,
    cheapest: 532.2, steady: 535.1, newpeople: 536.02, bet: 537.31, both: 539.6, stop: 540.29, y1975: 542.13, corner: 544.17, nothing: 545.78, frightening: 548.01, factory: 549.35, dock: 550.43,
    twenty: 551.91, hundreds: 553.51, suburbs: 555.83, borrowing: 558.62, lenders: 560.45, enough: 561.36, nyc: 562.5, capital: 564.18, weeks: 565.97, bills: 568.32, asks: 569.99, washington: 570.36,
    october: 572.14, ford: 574.06, rules: 575.5, people: 576.83, stampeded: 578.74, morning: 581.16, daily: 581.84, fivewords: 582.81, fordto: 585.26, drop: 586.72, never: 588.71, editor: 590.09,
    brink: 591.17, pencil: 592.23, headline: 594.6, couldnt: 596.06, within: 597.04, approved: 598.45, billion: 599.79, paid: 602.6, interest: 603.72, yearlater: 604.86, lost: 606.59,
    presidency: 608.28, analysts: 609.84, reason: 612.32, bleeding: 614.37, pain: 616.15, price: 617.27, cuts: 618.55, services: 619.26, historian: 620.47, kim: 621.02, hardest: 623.09, least: 624.8,
    july: 626.69, y1977: 627.53, lightning: 629.07, north: 630.52, nine30: 632.09, dark: 634.0, stays: 635.04, hours: 637.1, sixteen: 638.47, damaged: 640.76, thousand: 642.03, fires: 642.57,
    police: 644.1, arrests: 647.33, largest: 648.32, y1980: 651.44, lost2: 653.84, eighthundred: 654.67, tenyears: 656.87, inten: 658.9, nyfin: 659.98, four: 662.22, believed: 664.69, why: 666.36,
    because: 667.91, newcomers: 668.69, again: 669.9, y1970: 670.86, onefour: 672.08, born: 674.42, y2000: 676.27, twonine: 677.97, neighborhoods: 680.38, writtenoff: 682.1, census2: 683.71,
    eightmillion: 685.2, firsttime: 686.57 };
  const A = {}; for (const k in F) A[k] = F[k] - 510.8; A.end = 177.8;

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


  const { harbor, walker, corner, notice, obituaryShot, frame, immigrant } = N;
  const counter = (ctx, x, y, val, k, label, col = GOLD, px = 54) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = FX.DISPLAY(px); const w = ctx.measureText(val).width + 60;
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-w / 2 + 6, -px * .8 + 6, w, px * 1.6)); shape(ctx, '#1d1a17', 0, rect(-w / 2, -px * .8, w, px * 1.6, 10)); txt(ctx, val, 0, 3, FX.DISPLAY(px), col); if (label) txt(ctx, label, 0, px * .8 + 22, FX.FONT(800, 16), '#fff'); ctx.restore(); };
  const roll = (a, b, k) => Math.round(lerp(a, b, ease.out(clamp(k)))).toLocaleString('en-US');
  const suit70 = (ctx, x, y, s, t, v, o = {}) => walker(ctx, x, y, s, t, v, Object.assign({ plain: false, coat: ['#6a4a2a', '#4a5a3a', '#5a4a6a', '#3a4a5a'][v % 4], pants: '#3a3a40', cam: false }, o));
  const ford = (ctx, x, y, s, t, o = {}) => walker(ctx, x, y, s, t, 0, Object.assign({ coat: '#2a3448', pants: '#2a3448', skin: '#f0c8a0', hair: '#c8a878', hs: 0, cam: false, plain: false }, o));
  const sil = (ctx, x, y, s, t, v, o = {}) => { const C = '#1a1a26'; walker(ctx, x, y, s, t, v, Object.assign({ plain: true, coat: C, pants: C, skin: C, hair: C, shoe: C, hs: 0 }, o)); shape(ctx, C, 0, circle(x, y - 302 * s, 38 * s)); };
  function skyline(ctx, base, sc, lit, t, cols) { const B = [[-600, 80, 180], [-510, 70, 260], [-430, 80, 210], [-340, 60, 380], [-270, 90, 300], [-170, 70, 520], [-90, 60, 340], [-20, 80, 440], [70, 70, 300], [150, 60, 600], [220, 90, 380], [320, 70, 280], [400, 80, 330], [490, 90, 220], [590, 70, 260]];
    B.forEach(([dx, w, h], bi) => { const hh = h * sc, x = 640 + dx; shape(ctx, cols ? cols[bi % cols.length] : '#3a4a6a', 3, rect(x, base - hh, w, hh));
      for (let y = base - hh + 14; y < base - 12; y += 24) for (let xx = x + 10; xx < x + w - 12; xx += 18) { const on = typeof lit === 'function' ? lit(xx, y, bi) : lit; if (on > 0) shape(ctx, `rgba(255,220,130,${.85 * on})`, 0, rect(xx, y, 8, 11)); else shape(ctx, 'rgba(20,24,40,.6)', 0, rect(xx, y, 8, 11)); } });
    line(ctx, [[640 + 150 + 30, base - 600 * sc], [640 + 180, base - 600 * sc - 70 * sc]], 5, cols ? '#5a6a7a' : '#3a4a6a'); }

  // ---------- t1: Beat 6 card; so far a story about toughness — knocked down, back up ----------
  function t1(ctx, lt, dur, t) {
    const kd = since(t, 'knocked'), bu = since(t, 'back');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#6ab8ea'], [1, '#ffe2b0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 140]);
    const tilt = kd > 0 && bu < 0 ? ease.out(clamp(kd / .5)) * .35 : bu > 0 ? .35 * (1 - FX.settle(clamp(bu / .6))) : 0;
    ctx.save(); ctx.translate(640, 600); ctx.rotate(-tilt); ctx.translate(-640, -600); skyline(ctx, 600, .9, 1, t, ['#e8b08a', '#a9b6c4', '#f0d29a', '#9fb0c0', '#d8c0a0']); ctx.restore(); waterBand(ctx, 600, t);
    const card = clamp(1 - Math.max(0, lt - 1.9) / .3);
    if (card > 0) { ctx.save(); ctx.globalAlpha = card; shape(ctx, 'rgba(20,10,30,.35)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 6', 640, 230, lt - .05, { px: 30 }); strip(ctx, 'THE TWIST', 640, 330, lt - .4, { px: 64, color: BLUE, rot: .02 }); ctx.restore(); }
    if (lt > 2.1) { strip(ctx, 'A STORY ABOUT TOUGHNESS?', 640, 92, since(t, 'toughness') + .2, { px: 34 }); if (kd > 0) tag(ctx, bu > 0 ? 'BACK UP!' : 'KNOCKED DOWN…', 640, 200, bu > 0 ? bu : kd, 30); }
    vig(ctx);
  }

  // ---------- t2: the part that story skips: buildings don't rebuild themselves; toughness doesn't pay for an aqueduct ----------
  function t2(ctx, lt, dur, t) {
    const bd = lt - .1, tg = since(t, 'toughness2'), aq = since(t, 'aqueduct');
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#f0e0c8'], [1, '#e8d4b4']]), 0, rect(0, 0, W, H));
    // a ruined lot waiting with a sign; a tough guy flexing over an unpaid aqueduct bill
    if (bd > -.3) { const s = pop(bd + .3); ctx.save(); ctx.translate(330, 520); ctx.scale(s, s); shape(ctx, '#3a3230', 4, rect(-150, -60, 300, 60)); for (let i = 0; i < 6; i++) shape(ctx, '#7a6a58', 3, rect(-130 + i * 46, -60 - (i % 3) * 30, 34, (i % 3) * 30 + 6)); line(ctx, [[60, -60], [60, -200]], 6, '#5a3a20');
      shape(ctx, '#f4efe2', 4, rect(-20, -280, 160, 90, 4)); txt(ctx, 'REBUILD', 60, -248, FX.DISPLAY(24)); txt(ctx, 'ME?', 60, -214, FX.DISPLAY(24), RED); ctx.restore(); txt(ctx, 'BUILDINGS DON\'T REBUILD THEMSELVES', 330, 620, FX.DISPLAY(22)); }
    if (tg > -.3) { walker(ctx, 940, 600, .8, t, 2, { still: true, reach: true, cam: false, coat: '#c8322a' }); const k = pop(tg + .3); ctx.save(); ctx.translate(940, 270); ctx.scale(k, k); shape(ctx, '#e8b890', 4, c => { c.moveTo(-30, 30); c.quadraticCurveTo(-40, -30, 0, -40); c.quadraticCurveTo(40, -50, 40, 0); c.quadraticCurveTo(30, 30, -30, 30); c.closePath(); }); ctx.restore(); }
    if (aq > -.3) { const s = pop(aq + .3); ctx.save(); ctx.translate(1120, 470); ctx.rotate(.06); ctx.scale(s, s); shape(ctx, '#fbf6ea', 4, rect(-110, -80, 220, 160, 4)); txt(ctx, 'INVOICE', 0, -52, FX.FONT(800, 18), '#5a4a38'); txt(ctx, 'AQUEDUCT', 0, -14, FX.DISPLAY(28)); txt(ctx, '$ $ $ $', 0, 30, FX.DISPLAY(30), GREEN); FX.stamp(ctx, 'UNPAID', 0, 58, 1, { color: RED, size: 22 }); ctx.restore(); }
    strip(ctx, 'THE PART THAT STORY SKIPS', 640, 92, since(t, 'skips') + .2, { px: 34, color: RED });
    vig(ctx);
  }

  // ---------- t3/t4: every comeback ran on two things — the harbor, and a steady line of new people. What if both stop at once? ----------
  function scale2(ctx, t, kH, kP, stop) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ad0ec'], [1, '#f4e6c4']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [70, 120]);
    // a big balance on a stone base
    shape(ctx, '#8a7a6a', 4, poly([[580, 700], [700, 700], [670, 640], [610, 640]])); line(ctx, [[640, 640], [640, 230]], 12, '#5a4a3a'); shape(ctx, GOLD, 4, circle(640, 222, 18));
    const tilt = Math.sin(t * .8) * .02; ctx.save(); ctx.translate(640, 230); ctx.rotate(tilt); line(ctx, [[-380, 0], [380, 0]], 12, '#5a4a3a');
    for (const d of [-1, 1]) { line(ctx, [[d * 380, 0], [d * 300, 170]], 3, '#5a4a3a'); line(ctx, [[d * 380, 0], [d * 460, 170]], 3, '#5a4a3a'); shape(ctx, '#b8a888', 4, c => { c.moveTo(d * 380 - 120, 170); c.quadraticCurveTo(d * 380, 230, d * 380 + 120, 170); c.closePath(); }); }
    ctx.restore();
    // left pan: the harbor with ships coming and going; right pan: a line of newcomers
    if (kH > 0) { ctx.save(); ctx.globalAlpha = clamp(kH); ctx.beginPath(); ctx.rect(140, 220, 240, 190); ctx.clip(); shape(ctx, '#3aa0c0', 0, rect(140, 330, 240, 80)); const sp = stop ? 1 - stop : 1;
      for (let i = 0; i < 3; i++) { const x = 140 + ((t * 30 * sp + i * 90) % 280); shape(ctx, '#7a4a2a', 2.5, poly([[x - 26, 336], [x + 26, 336], [x + 20, 346], [x - 20, 346]])); line(ctx, [[x, 336], [x, 300]], 2.5, '#5a3a20'); shape(ctx, '#f4efe2', 1.5, poly([[x + 2, 304], [x + 18, 312], [x + 18, 330], [x + 2, 332]])); }
      ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(100, 200, 330, 228); ctx.clip(); harbor(ctx, 260, 420, 210, t, { look: [.3, -.3], eyes: 1, mouth: stop > .5 ? 'o' : 'smile' }); ctx.restore(); shape(ctx, '#b8a888', 4, c => { c.moveTo(130, 396); c.quadraticCurveTo(260, 470, 390, 396); c.lineTo(390, 404); c.quadraticCurveTo(260, 480, 130, 404); c.closePath(); }); shape(ctx, '#b8a888', 4, c => { c.moveTo(130, 400); c.quadraticCurveTo(260, 446, 390, 400); c.quadraticCurveTo(260, 470, 130, 400); c.closePath(); }); txt(ctx, 'THE HARBOR', 260, 470, FX.DISPLAY(24), '#2f6a9a'); }
    if (kP > 0) { ctx.save(); ctx.globalAlpha = clamp(kP); for (let i = 0; i < 6; i++) { const ph = stop ? 0 : t; immigrant(ctx, 920 + i * 34, 400 - (i % 2) * 6, .3, ph, i + 2, { still: !!stop }); } ctx.restore(); txt(ctx, 'NEW PEOPLE BETTING ON IT', 1020, 470, FX.DISPLAY(22), '#8a4a2a'); }
  }
  function t3(ctx, lt, dur, t) { scale2(ctx, t, lt - .1, lt - .6, 0); strip(ctx, 'EVERY COMEBACK RAN ON TWO THINGS', 640, 92, since(t, 'every') + .2, { px: 32 }); if (since(t, 'cheapest') > 0) tag(ctx, 'CHEAPEST PLACE ON THE CONTINENT TO DO BUSINESS', 300, 560, since(t, 'cheapest'), 15); vig(ctx); }
  function t4(ctx, lt, dur, t) { const st = since(t, 'stop'); scale2(ctx, t, 1, 1, st > -.3 ? clamp((st + .3) / .6) : 0);
    if (st > -.2) { ctx.save(); ctx.globalAlpha = .4 * clamp((st + .2) / .6); shape(ctx, '#2a2a3a', 0, rect(0, 0, W, H)); ctx.restore(); const s = pop(st + .2); ctx.save(); ctx.translate(640, 560); ctx.scale(s, s); FX.bigText(ctx, '?', 0, 0, 160, { color: '#fff' }); ctx.restore(); }
    strip(ctx, 'WHAT IF BOTH STOP AT ONCE?', 640, 92, since(t, 'both') + .3, { px: 36, color: RED }); vig(ctx); }

  // ---------- t5: Beat 7 — 1975, back on the corner; nothing on fire, which is what makes it frightening ----------
  function t5(ctx, lt, dur, t) {
    const nt = since(t, 'nothing'), fr = since(t, 'frightening');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.07), 640, 380); corner(ctx, t, { grey: .75, crowd: .25, fg: false });
    // litter blowing along the empty street
    for (let i = 0; i < 6; i++) { const p = (t * .12 + i / 6) % 1; ctx.save(); ctx.translate(lerp(300, 1000, p), 640 + Math.sin(p * 9 + i) * 20); ctx.rotate(p * 9); shape(ctx, '#e8e4d8', 2, rect(-14, -10, 28, 20)); ctx.restore(); }
    ctx.restore();
    const card = clamp(1 - Math.max(0, lt - 2.0) / .3);
    if (card > 0) { ctx.save(); ctx.globalAlpha = card; strip(ctx, 'BEAT 7', 640, 230, lt - .05, { px: 30 }); strip(ctx, 'THE CLIMAX', 640, 330, lt - .4, { px: 64, color: RED, rot: .02 }); ctx.restore(); }
    FX.dateTag(ctx, 'WALL & BROAD · 1975');
    if (nt > 0) tag(ctx, 'NOTHING IS ON FIRE', 640, 110, nt, 26); if (fr > 0) strip(ctx, 'THAT\'S WHAT MAKES IT FRIGHTENING', 640, 200, fr, { px: 30, color: RED });
    vig(ctx, .6);
  }

  // ---------- t6: factory and dock jobs leaving for twenty years; hundreds of thousands move to the suburbs ----------
  function t6(ctx, lt, dur, t) {
    const fc = since(t, 'factory'), sb = since(t, 'suburbs');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9aa8b8'], [1, '#d8d0c0']]), 0, rect(0, 0, W, H));
    line(ctx, [[640, 120], [640, 720]], 4, 'rgba(60,60,70,.3)');
    // left: an idle dock and a closed factory
    waterBand(ctx, 560, t * .3, -100, 640, '#5a7a8a'); shape(ctx, '#7a7068', 4, rect(40, 360, 260, 200)); for (let i = 0; i < 3; i++) shape(ctx, '#6a6058', 4, poly([[40 + i * 86, 360], [83 + i * 86, 320], [126 + i * 86, 360]])); shape(ctx, '#8a8070', 4, rect(250, 220, 30, 140));
    for (let i = 0; i < 6; i++) shape(ctx, '#3a3a40', 2, rect(60 + i * 40, 400, 26, 30)); FX.stamp(ctx, 'CLOSED', 170, 480, fc + .2, { color: RED, size: 30 });
    line(ctx, [[400, 560], [400, 260], [560, 260]], 10, '#a86a3a'); line(ctx, [[540, 260], [540, 330]], 3, '#5a5a60'); txt(ctx, 'DOCK JOBS', 470, 220, FX.FONT(800, 16), '#3a3a40');
    // right: a family loading a station wagon for the suburbs
    shape(ctx, '#8ab868', 0, rect(640, 520, 640, 200)); shape(ctx, '#e8dcc0', 3.5, rect(1000, 380, 180, 140)); shape(ctx, '#a8503a', 3.5, poly([[990, 380], [1090, 310], [1190, 380]])); shape(ctx, '#3f5a74', 2, rect(1030, 410, 40, 40)); shape(ctx, '#5a3a20', 2, rect(1110, 450, 34, 70)); txt(ctx, 'SUBURBS', 1090, 290, FX.DISPLAY(24), GREEN);
    { const p = sb > -.5 ? ease.inOut(clamp((sb + .5) / 2.2)) : 0, x = lerp(720, 920, p); shape(ctx, '#c89a6a', 4, rect(x - 90, 560, 180, 50, 10)); shape(ctx, '#8a5a34', 0, rect(x - 90, 580, 180, 10)); shape(ctx, '#9ac8e0', 3, rect(x - 60, 534, 110, 30, 6)); shape(ctx, '#2a2a30', 3, circle(x - 50, 612, 16)); shape(ctx, '#2a2a30', 3, circle(x + 50, 612, 16));
      for (let i = 0; i < 3; i++) shape(ctx, ['#a87a4a', '#e8742a', '#3a7ac8'][i], 2.5, rect(x - 70 + i * 40, 510, 34, 26, 3)); }
    counter(ctx, 330, 110, '20 YEARS', fc + .4, 'OF JOBS LEAVING', '#ff9a5a', 40);
    if (sb > -.3) counter(ctx, 960, 110, '100,000s', sb + .3, 'MOVE OUT', '#8ad0ff', 40);
    vig(ctx);
  }

  // ---------- t7: covering the gap by borrowing — and now the lenders have had enough ----------
  function t7(ctx, lt, dur, t) {
    const br = since(t, 'borrowing'), ln = since(t, 'lenders');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#c8b8a0'], [1, '#a89878']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 10; i++) line(ctx, [[0, 60 + i * 70], [W, 60 + i * 70]], 2, 'rgba(90,70,50,.15)');
    shape(ctx, '#6a4a2a', 5, rect(140, 500, 540, 40, 6)); shape(ctx, '#5a3a20', 4, rect(160, 540, 30, 180)); shape(ctx, '#5a3a20', 4, rect(630, 540, 30, 180));
    suit70(ctx, 300, 740, .66, t, 1, { still: true });
    const n = br > -.5 ? Math.floor(clamp((br + .5) / 2.5) * 14) : 2; for (let i = 0; i < n; i++) { ctx.save(); ctx.translate(520 + (i % 2) * 8, 490 - i * 14); ctx.rotate((i % 3 - 1) * .05); shape(ctx, '#f4efe2', 2, rect(-70, -8, 140, 14)); txt(ctx, 'IOU', 0, -1, FX.FONT(800, 10), RED); ctx.restore(); }
    // the bank's door slams
    shape(ctx, '#d8d0c0', 4, rect(820, 160, 380, 500)); for (const x of [860, 940, 1080, 1160]) shape(ctx, '#f4efe6', 3, rect(x - 14, 220, 28, 440)); shape(ctx, '#b8b0a0', 4, poly([[800, 160], [1010, 80], [1220, 160]])); txt(ctx, 'LENDERS', 1010, 136, FX.DISPLAY(28), '#5a4a38');
    const shut = ln > -.2 ? FX.settle(clamp((ln + .2) / .4)) : 0; shape(ctx, '#5a3a20', 4, rect(950, 420, 120 * (.15 + .85 * shut), 240));
    if (ln > .2) FX.stamp(ctx, 'NO MORE LOANS', 1010, 380, ln - .2, { color: RED, size: 36 });
    strip(ctx, 'COVERING THE GAP BY BORROWING', 420, 92, br + .2, { px: 30 });
    vig(ctx);
  }

  // ---------- t8: the financial capital of the world — weeks from being unable to pay its own bills ----------
  function t8(ctx, lt, dur, t) {
    const cp = since(t, 'capital'), wk = since(t, 'weeks'), bl = since(t, 'bills');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#4a5a7a'], [1, '#2a3248']]), 0, rect(0, 0, W, H));
    skyline(ctx, 720, .95, .5, t);
    if (cp > -.2) { const s = pop(cp + .2); ctx.save(); ctx.translate(640, 150); ctx.rotate(-.02); ctx.scale(s, s); shape(ctx, GOLD, 5, rect(-330, -50, 660, 100, 8)); txt(ctx, 'FINANCIAL CAPITAL OF THE WORLD', 0, 4, FX.DISPLAY(32), '#3a2a20'); if (wk > 0) { line(ctx, [[-120, -50], [-80, 0], [-140, 50]], 5, '#3a2a20'); line(ctx, [[160, -50], [130, 10], [180, 50]], 5, '#3a2a20'); } ctx.restore(); }
    // the calendar runs down
    if (wk > -.2) { const wks = Math.max(1, 6 - Math.floor(clamp((wk + .2) / 2.5) * 5)); ctx.save(); ctx.translate(1080, 380); shape(ctx, PAPER, 4, rect(-110, -100, 220, 200, 8)); shape(ctx, RED, 0, rect(-110, -100, 220, 44)); txt(ctx, 'CASH LEFT', 0, -78, FX.FONT(800, 18), '#fff'); txt(ctx, wks + (wks > 1 ? ' WEEKS' : ' WEEK'), 0, 22, FX.DISPLAY(44), RED); ctx.restore(); }
    if (bl > -.2) for (let i = 0; i < 12; i++) { const k = clamp((bl + .2 - i * .06) / .4); if (k <= 0) continue; const d = FX.dropBounce(k * .6, 300, .3); ctx.save(); ctx.translate(160 + (i % 6) * 70, 560 - Math.floor(i / 6) * 40 - d); ctx.rotate((i % 3 - 1) * .2); shape(ctx, '#f4efe2', 2.5, rect(-40, -26, 80, 52, 3)); txt(ctx, 'BILL', 0, -6, FX.FONT(800, 14), RED); txt(ctx, 'DUE', 0, 12, FX.FONT(800, 12), '#3a2a20'); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- t9: so it asks Washington for help ----------
  function t9(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ad0ec'], [1, '#f4e6c4']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 140]);
    // the Capitol on the right, New York's skyline on the left, a letter flying between
    ctx.save(); ctx.translate(1000, 620); shape(ctx, '#f4efe6', 4, rect(-220, -100, 440, 100)); for (let i = 0; i < 9; i++) shape(ctx, '#e8e0d0', 2, rect(-200 + i * 48, -96, 18, 92)); shape(ctx, '#f4efe6', 4, rect(-80, -170, 160, 70)); shape(ctx, '#f4efe6', 4, c => { c.moveTo(-90, -170); c.quadraticCurveTo(0, -300, 90, -170); c.closePath(); }); shape(ctx, '#f4efe6', 3, rect(-12, -300, 24, 40)); ctx.restore();
    txt(ctx, 'WASHINGTON', 1000, 670, FX.DISPLAY(30), BLUE);
    ctx.save(); ctx.translate(-400, 0); skyline(ctx, 640, .55, 1, t, ['#a9b6c4', '#d8c0a0', '#9fb0c0']); ctx.restore(); txt(ctx, 'NEW YORK', 260, 670, FX.DISPLAY(30), RED);
    const k = ease.inOut(clamp((lt - .2) / 2.2)), x = lerp(320, 980, k), y = 420 - Math.sin(k * Math.PI) * 220; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 5) * .1); shape(ctx, '#fbf6ea', 3.5, rect(-50, -32, 100, 64, 3)); line(ctx, [[-50, -32], [0, 4], [50, -32]], 3); txt(ctx, 'HELP!', 0, 18, FX.DISPLAY(18), RED); ctx.restore();
    strip(ctx, 'IT ASKS WASHINGTON FOR HELP', 640, 92, since(t, 'asks') + .2, { px: 34 });
    vig(ctx);
  }

  // ---------- t10: October 29th — President Gerald Ford rules it out: "will not be stampeded" (National Press Club) ----------
  function t10(ctx, lt, dur, t) {
    const fd = since(t, 'ford'), st = since(t, 'stampeded');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#3a4a6a'], [1, '#1f2a40']]), 0, rect(0, 0, W, H)); shape(ctx, '#2f3a5a', 0, rect(0, 0, W, 420)); for (let i = 0; i < 8; i++) shape(ctx, 'rgba(255,255,255,.05)', 0, rect(60 + i * 160, 0, 60, 420));
    shape(ctx, '#c8a868', 4, rect(300, 120, 400, 60, 6)); txt(ctx, 'NATIONAL PRESS CLUB', 500, 152, FX.DISPLAY(26), '#3a2a20');
    ford(ctx, 500, 700, .9, t, { still: true, reach: st < 0 });
    shape(ctx, '#6a4a2a', 4.5, poly([[400, 520], [600, 520], [580, 720], [420, 720]])); shape(ctx, GOLD, 3, circle(500, 590, 24)); for (const d of [-40, 40]) line(ctx, [[500 + d, 520], [500 + d * .6, 470]], 4, '#2a2a30');
    // flashbulbs
    for (let i = 0; i < 4; i++) if ((t * 1.3 + i * .37) % 2 < .08) glow(ctx, 120 + i * 300, 640, 120, 'rgba(255,255,255,.7)');
    frame(ctx, T.IMG.ford, 1020, 260, 200, 248, fd + .3, 'PRESIDENT GERALD FORD');
    FX.dateTag(ctx, '29 OCTOBER 1975 · WASHINGTON');
    if (since(t, 'rules') > 0) FX.stamp(ctx, 'NO BAILOUT', 1020, 470, since(t, 'rules'), { color: RED, size: 40 });
    if (since(t, 'people') > -.2) { const s = pop(since(t, 'people') + .2); ctx.save(); ctx.translate(640, 620); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-416, -40, 840, 90)); shape(ctx, PAPER, 4, rect(-420, -44, 840, 90, 4)); txt(ctx, '"THE PEOPLE OF THIS COUNTRY WILL NOT BE STAMPEDED"', 0, 2, FX.DISPLAY(26)); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- t11: the next morning, five words across the front page: FORD TO CITY: DROP DEAD ----------
  function t11(ctx, lt, dur, t) {
    const ft = since(t, 'fordto'), dd = since(t, 'drop');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f0d8a8'], [1, '#d8b888']]), 0, rect(0, 0, W, H));
    // a newsstand rack of papers; the front page slams
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(140 + i * 250, 640); ctx.rotate((i - 2) * .03); shape(ctx, '#f4efe2', 3, rect(-90, -60, 180, 120)); for (let j = 0; j < 5; j++) line(ctx, [[-70, -40 + j * 18], [70, -40 + j * 18]], 3, '#9a8a7a'); ctx.restore(); }
    const k = lt - .2; if (k > 0) { const s = slam(k); ctx.save(); ctx.translate(640, 320); ctx.rotate(-.02); ctx.scale(s * .95, s * .95); shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-280, -270, 570, 560)); shape(ctx, '#f8f4ea', 4, rect(-290, -280, 580, 560, 3));
      txt(ctx, 'THE DAILY CITY', 0, -238, 'italic 800 34px Georgia', '#1d1a17'); line(ctx, [[-260, -210], [260, -210]], 3); txt(ctx, 'FINAL · THURSDAY, OCTOBER 30, 1975', 0, -192, FX.FONT(700, 12), '#5a4a38');
      if (ft > -.1) txt(ctx, 'FORD TO CITY:', 0, -110, FX.DISPLAY(66), '#1d1a17'); if (dd > -.1) { const s2 = slam(dd + .1); ctx.save(); ctx.translate(0, -10); ctx.scale(s2, s2); txt(ctx, 'DROP DEAD', 0, 0, FX.DISPLAY(84), '#1d1a17'); ctx.restore(); }
      txt(ctx, 'Vows He\'ll Veto Any Bail-Out', 0, 70, 'italic 700 30px Georgia', '#1d1a17'); shape(ctx, '#8a8a90', 3, rect(-250, 100, 230, 150)); for (let j = 0; j < 6; j++) line(ctx, [[10, 110 + j * 24], [250, 110 + j * 24]], 3, '#9a8a7a'); ctx.restore(); }
    txt(ctx, 'RECREATION — HEADLINE AS PRINTED', 640, 700, FX.FONT(700, 13), '#7a6a5a');
    vig(ctx);
  }

  // ---------- t12: Ford never said that — an editor named William Brink wrote it, in pencil, on a sheet of newsprint ----------
  function t12(ctx, lt, dur, t) {
    const nv = since(t, 'never'), br = since(t, 'brink'), pn = since(t, 'pencil');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#5a6a7a'], [1, '#3a4a5a']]), 0, rect(0, 0, W, H));
    // a newsroom desk at night: a lamp, a typewriter, a sheet of newsprint; a pencil writes the five words
    shape(ctx, '#6a4a2a', 5, rect(-50, 470, 1380, 300)); glow(ctx, 640, 420, 380, 'rgba(255,220,150,.35)'); line(ctx, [[960, 470], [1000, 300], [940, 250]], 8, '#2a2a30'); shape(ctx, '#2a2a30', 3, poly([[900, 230], [980, 230], [960, 280], [920, 280]]));
    shape(ctx, '#3a3a40', 4, rect(80, 380, 260, 110, 10)); for (let i = 0; i < 4; i++) for (let j = 0; j < 8; j++) shape(ctx, '#e8e4dc', 0, circle(110 + j * 28, 410 + i * 18, 7));
    ctx.save(); ctx.translate(640, 520); ctx.rotate(-.04); shape(ctx, '#ece6d6', 3, rect(-260, -90, 520, 220)); const wk = pn > -.3 ? clamp((pn + .3) / 1.6) : 0, s1 = 'FORD TO CITY:', s2 = 'DROP DEAD';
    ctx.font = '700 46px "Comic Sans MS", Fredoka'; ctx.fillStyle = '#4a4a50'; ctx.textAlign = 'left'; ctx.fillText(s1.slice(0, Math.ceil(s1.length * Math.min(1, wk * 2))), -220, -20); if (wk > .5) ctx.fillText(s2.slice(0, Math.ceil(s2.length * (wk - .5) * 2)), -220, 50);
    const px = wk < .5 ? -220 + 300 * wk * 2 : -220 + 260 * (wk - .5) * 2, py = wk < .5 ? -30 : 40; ctx.save(); ctx.translate(px, py); ctx.rotate(-.7); shape(ctx, GOLD, 3, rect(0, -8, 140, 16)); shape(ctx, '#e8b890', 2, poly([[0, -8], [-22, 0], [0, 8]])); ctx.restore(); ctx.restore();
    if (nv > -.2) FX.stamp(ctx, 'FORD NEVER SAID THAT', 640, 140, nv + .2, { color: RED, size: 46 });
    if (br > -.2) { const e = FX.settle(clamp((br + .2) / .4)); ctx.save(); ctx.translate(lerp(1500, 1050, e), 330); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -46, 360, 100)); shape(ctx, PAPER, 4, rect(-180, -50, 360, 100, 4)); txt(ctx, 'WILLIAM BRINK', 0, -14, FX.DISPLAY(30)); txt(ctx, 'EDITOR, DAILY NEWS', 0, 24, FX.FONT(700, 15), '#5a4a38'); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- t13: the headline did what the speech couldn't — $2.3 billion in federal loans within two months, paid back with interest ----------
  function t13(ctx, lt, dur, t) {
    const ap = since(t, 'approved'), bn = since(t, 'billion'), pd = since(t, 'paid');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8f4ec'], [1, '#c8e4d4']]), 0, rect(0, 0, W, H));
    // the calendar: October → December 1975
    { const mo = ['OCT', 'NOV', 'DEC'][Math.min(2, Math.floor(clamp((since(t, 'within') + .2) / 1.4) * 3))]; ctx.save(); ctx.translate(200, 260); shape(ctx, PAPER, 4, rect(-100, -90, 200, 180, 8)); shape(ctx, RED, 0, rect(-100, -90, 200, 40)); txt(ctx, '1975', 0, -70, FX.FONT(800, 18), '#fff'); txt(ctx, mo, 0, 24, FX.DISPLAY(52)); ctx.restore(); }
    if (lt > .2) { const s = pop(lt - .2); ctx.save(); ctx.translate(700, 330); ctx.rotate(-.03); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-326, -126, 660, 260)); shape(ctx, '#e8f4e0', 5, rect(-330, -130, 660, 260, 10)); ctx.lineWidth = 3; ctx.strokeStyle = GREEN; ctx.strokeRect(-310, -110, 620, 220);
      txt(ctx, 'U.S. TREASURY · FEDERAL LOANS', 0, -76, FX.FONT(800, 18), GREEN); txt(ctx, 'PAY TO: THE CITY OF NEW YORK', -60, -30, FX.FONT(700, 18), '#3a2a20'); if (bn > -.2) txt(ctx, '$2,300,000,000', 0, 30, FX.DISPLAY(56), GREEN); line(ctx, [[60, 90], [280, 90]], 2); txt(ctx, 'G. R. Ford', 170, 78, 'italic 600 24px Georgia', '#2a3448'); ctx.restore(); }
    if (pd > -.2) FX.stamp(ctx, 'PAID BACK — WITH INTEREST', 760, 580, pd + .2, { color: GREEN, size: 38 });
    strip(ctx, 'THE HEADLINE DID WHAT THE SPEECH COULDN\'T', 640, 92, since(t, 'headline') + .2, { px: 28 });
    vig(ctx);
  }

  // ---------- t14: a year later Ford narrowly lost New York State and the presidency; some analysts think the five words helped ----------
  function t14(ctx, lt, dur, t) {
    const ls = since(t, 'lost'), an = since(t, 'analysts');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#dce8f4'], [1, '#b8c8e0']]), 0, rect(0, 0, W, H));
    // a ballot box and New York State turning to the other column
    shape(ctx, '#e8dcc0', 4.5, rect(160, 330, 300, 260, 8)); shape(ctx, '#3a3a40', 0, rect(250, 330, 120, 14)); txt(ctx, 'VOTE', 310, 470, FX.DISPLAY(48), BLUE); FX.dateTag(ctx, 'NOVEMBER 1976');
    for (let i = 0; i < 4; i++) { const p = ((t * .4 + i / 4) % 1); ctx.save(); ctx.translate(310, 280 + p * 60); ctx.globalAlpha = 1 - p; shape(ctx, '#fff', 2, rect(-30, -20, 60, 40, 3)); ctx.restore(); }
    const k = ls > -.2 ? clamp((ls + .2) / .8) : 0; ctx.save(); ctx.translate(820, 380); shape(ctx, k > .5 ? '#3a6ac8' : '#c8c0b0', 4, poly([[-220, 40], [-160, -90], [60, -110], [200, -60], [220, 40], [120, 80], [60, 160], [-40, 120]])); txt(ctx, 'NEW YORK', 0, 10, FX.DISPLAY(32), '#fff'); if (k > .5) txt(ctx, 'LOST BY FORD', 0, 50, FX.FONT(800, 16), '#fff'); ctx.restore();
    if (since(t, 'presidency') > -.2) FX.stamp(ctx, 'AND THE PRESIDENCY', 820, 620, since(t, 'presidency') + .2, { color: RED, size: 34 });
    if (an > -.2) { const s = pop(an + .2); ctx.save(); ctx.translate(640, 140); ctx.scale(s, s); shape(ctx, '#f8f4ea', 4, rect(-300, -44, 600, 88, 4)); txt(ctx, 'FORD TO CITY: DROP DEAD', 0, 4, FX.DISPLAY(36)); ctx.restore(); txt(ctx, 'PART OF THE REASON?', 640, 220, FX.DISPLAY(26), RED); }
    vig(ctx);
  }

  // ---------- t15/t16: the loans stop the bleeding, not the pain: years of cuts; Kim Phillips-Fein — hardest on those with the least ----------
  const SERV = [['LIBRARY', '#8a5a34'], ['FIREHOUSE', RED], ['HOSPITAL', '#3a8ac0'], ['SCHOOL', '#e8a83a'], ['SUBWAY', GREEN], ['PARKS', '#5a9a4a'], ['SANITATION', '#7a7a80']];
  function t15(ctx, lt, dur, t) {
    const pn = since(t, 'pain'), cu = since(t, 'cuts');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    SERV.forEach(([n, c], i) => { const x = 140 + i * 166, y = 400, k = pop(lt - .1 - i * .08); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); shape(ctx, c, 4, rect(-66, -90, 132, 160, 10)); shape(ctx, '#fff', 0, rect(-46, -60, 92, 60, 6)); txt(ctx, n, 0, 40, FX.FONT(800, 14), '#fff');
      const ck = cu > -.2 ? clamp((cu + .2 - i * .15) / .3) : 0; if (ck > 0) { ctx.globalAlpha = ck; shape(ctx, 'rgba(0,0,0,.4)', 0, rect(-66, -90, 132, 160, 10)); line(ctx, [[-80, -100], [80, 80]], 8, '#fff'); line(ctx, [[-82, -96], [78, 84]], 4, RED); txt(ctx, 'CUT', 0, -20, FX.DISPLAY(30), '#fff'); } ctx.restore(); });
    strip(ctx, 'THE LOANS STOP THE BLEEDING', 640, 110, since(t, 'bleeding') + .2, { px: 32, color: GREEN });
    if (pn > 0) strip(ctx, '…NOT THE PAIN', 640, 210, pn, { px: 34, color: RED, rot: .02 });
    if (cu > 0) tag(ctx, 'YEARS OF CUTS TO CITY SERVICES', 640, 620, cu, 24);
    vig(ctx);
  }
  function t16(ctx, lt, dur, t) {
    const hd = since(t, 'hardest');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#d8d0c8'], [1, '#b8b0a8']]), 0, rect(0, 0, W, H));
    // a seesaw of the cuts: the weight lands on the poorer block
    const tilt = hd > -.4 ? ease.out(clamp((hd + .4) / .8)) * .2 : 0; shape(ctx, '#7a6a5a', 4, poly([[600, 640], [680, 640], [640, 560]]));
    ctx.save(); ctx.translate(640, 560); ctx.rotate(tilt); line(ctx, [[-460, 0], [460, 0]], 14, '#5a4a3a');
    shape(ctx, '#e8dcc0', 3.5, rect(-440, -130, 180, 130)); shape(ctx, '#a8503a', 3, poly([[-450, -130], [-350, -190], [-250, -130]])); txt(ctx, 'MORE', -350, -60, FX.DISPLAY(24), GREEN);
    shape(ctx, '#7a6a5a', 3.5, rect(260, -110, 180, 110)); for (let i = 0; i < 3; i++) shape(ctx, '#5a4a3a', 2, rect(280 + i * 56, -90, 34, 40)); txt(ctx, 'LEAST', 350, -30, FX.DISPLAY(24), RED);
    for (let i = 0; i < 4; i++) { const d = hd > -.2 ? FX.dropBounce(hd + .2 - i * .1, 300, .3) : 300; shape(ctx, '#3a3a40', 3, rect(300 + (i % 2) * 60, -170 - Math.floor(i / 2) * 50 - d, 60, 46, 4)); txt(ctx, 'CUT', 330 + (i % 2) * 60, -147 - Math.floor(i / 2) * 50 - d, FX.FONT(800, 14), '#fff'); }
    ctx.restore();
    const nk = since(t, 'kim') + .2; if (nk > 0) { const e = FX.settle(clamp(nk / .4)); ctx.save(); ctx.translate(lerp(-300, 300, e), 150); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-226, -46, 460, 100)); shape(ctx, PAPER, 4, rect(-230, -50, 460, 100, 4)); txt(ctx, 'KIM PHILLIPS-FEIN', 0, -14, FX.DISPLAY(30)); txt(ctx, 'HISTORIAN · "FEAR CITY" (2017)', 0, 24, FX.FONT(700, 15), '#5a4a38'); ctx.restore(); }
    if (hd > 0) tag(ctx, 'HARDEST ON THE NEW YORKERS WITH THE LEAST', 860, 150, hd, 18);
    vig(ctx);
  }

  // ---------- t17: a July night in 1977 — lightning hits the power lines north of the city; around 9:30 ----------
  function t17(ctx, lt, dur, t) {
    const lg = since(t, 'lightning'), nn = since(t, 'nine30');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#141a30'], [1, '#2a3048']]), 0, rect(0, 0, W, H));
    for (let i = 0; i < 6; i++) { const x = 100 + i * 230; shape(ctx, '#2a2a3a', 3, smooth([[x - 160, 140], [x - 80, 80], [x, 70], [x + 90, 90], [x + 160, 140], [x, 160]])); }
    shape(ctx, '#1f2a24', 0, c => { c.moveTo(-50, 600); c.quadraticCurveTo(640, 540, 1330, 600); c.lineTo(1330, 760); c.lineTo(-50, 760); c.closePath(); });
    // transmission towers and lines
    const towers = [200, 520, 840, 1160]; towers.forEach(x => { line(ctx, [[x - 50, 600], [x, 300], [x + 50, 600]], 6, '#8a8a98'); line(ctx, [[x - 60, 360], [x + 60, 360]], 5, '#8a8a98'); line(ctx, [[x - 40, 420], [x + 40, 420]], 5, '#8a8a98'); });
    for (let i = 0; i < 3; i++) { ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#6a6a78'; ctx.beginPath(); towers.slice(0, -1).forEach((x, j) => { ctx.moveTo(x - 60 + i * 60, 360); ctx.quadraticCurveTo(x + 160, 420, towers[j + 1] - 60 + i * 60, 360); }); ctx.stroke(); ctx.restore(); }
    if (lg > -.1 && lg < 1.2) { const f = (Math.floor(lg * 12) % 2) ? 1 : .3; ctx.save(); ctx.globalAlpha = f; shape(ctx, 'rgba(220,230,255,.25)', 0, rect(0, 0, W, H)); line(ctx, [[600, 120], [560, 200], [620, 230], [540, 330], [520, 300]], 8, '#fff'); glow(ctx, 520, 310, 120, 'rgba(200,220,255,.8)'); ctx.restore();
      for (let i = 0; i < 10; i++) shape(ctx, '#ffe27a', 0, circle(520 + Math.cos(i) * 40 * lg * 3, 310 + Math.sin(i * 2) * 30 * lg * 3, 4)); }
    FX.dateTag(ctx, 'JULY 1977 · NORTH OF THE CITY');
    if (nn > -.2) { const s = pop(nn + .2); ctx.save(); ctx.translate(1080, 560); ctx.scale(s, s); shape(ctx, '#1d1a17', 4, rect(-120, -50, 240, 100, 10)); txt(ctx, '9:30 PM', 0, 4, FX.DISPLAY(48), '#ff5a3a'); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- t18: everything goes dark — for twenty-five hours ----------
  function t18(ctx, lt, dur, t) {
    const dk = since(t, 'dark'), hr = since(t, 'hours');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#0e1428'], [1, '#1a2238']]), 0, rect(0, 0, W, H));
    for (let i = 0; i < 40; i++) { ctx.save(); ctx.globalAlpha = .4 + .4 * Math.sin(t * 2 + i); shape(ctx, '#fff', 0, circle((i * 211) % 1300, 20 + (i * 97) % 240, 1.6)); ctx.restore(); }
    const off = dk > -.6 ? clamp((dk + .6) / 1.0) : 0; skyline(ctx, 720, 1.0, (x) => (x / 1280) < 1 - off ? 1 : 0, t, ['#222a3a', '#1f2636', '#262e40']);
    if (hr > -.4) counter(ctx, 640, 140, (hr > .6 ? '25' : String(Math.round(25 * clamp((hr + .4) / 1)))) + ' HOURS', hr + .4, 'DARK', '#ffd27a', 50);
    if (dk > 0) strip(ctx, 'EVERYTHING GOES DARK', 640, 300, dk, { px: 40, color: '#2f4a8a' });
    vig(ctx, .8);
  }

  // ---------- t19: 1,600+ stores looted or damaged, 1,000+ fires, 3,776 arrests — the largest mass arrest in the city's history (silhouettes) ----------
  function t19(ctx, lt, dur, t) {
    const sx = since(t, 'sixteen'), fr = since(t, 'fires'), ar = since(t, 'arrests');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#0e1428'], [1, '#2a2030']]), 0, rect(0, 0, W, H));
    // a dark shopping street: broken shutters, a far fire glow, flashlight beams (no faces)
    shape(ctx, '#1a1a24', 0, rect(0, 200, W, 360)); for (let i = 0; i < 7; i++) { const x = 20 + i * 180; shape(ctx, '#23232e', 3, rect(x, 260, 160, 300)); shape(ctx, '#0a0a10', 2, rect(x + 20, 420, 120, 140)); line(ctx, [[x + 30, 430], [x + 70, 470], [x + 50, 520], [x + 110, 480]], 2, '#5a5a6a'); }
    if (fr > -.4) { glow(ctx, 1000, 300, 260, 'rgba(255,120,40,.5)'); for (let k = 0; k < 6; k++) { const p = (t * .15 + k / 6) % 1; ctx.save(); ctx.globalAlpha = .4 * (1 - p); shape(ctx, '#3a3038', 0, circle(980 + k * 20 + p * 60, 260 - p * 200, 30 + p * 50)); ctx.restore(); } }
    shape(ctx, '#14141c', 0, rect(0, 560, W, 200));
    for (let i = 0; i < 6; i++) { const x = 140 + i * 200 + Math.sin(t * .6 + i) * 30; sil(ctx, x, 740, .55, t, i); }
    for (let i = 0; i < 3; i++) { const a = Math.sin(t * .9 + i * 2) * .5; ctx.save(); ctx.translate(200 + i * 440, 600); ctx.rotate(-1.2 + a); ctx.globalAlpha = .25; shape(ctx, '#fff8d0', 0, poly([[0, 0], [600, -80], [600, 80]])); ctx.restore(); }
    counter(ctx, 230, 120, sx > -.3 ? '1,600+' : '0', sx + .3, 'STORES LOOTED OR DAMAGED', '#ffd27a', 40);
    counter(ctx, 640, 120, fr > -.3 ? '1,000+' : '0', fr + .3, 'FIRES REPORTED', '#ff9a5a', 40);
    counter(ctx, 1050, 120, ar > -.6 ? roll(0, 3776, (ar + .6) / 1.2) : '0', since(t, 'police') + .2, 'ARRESTS', '#8ad0ff', 40);
    if (since(t, 'largest') > 0) strip(ctx, 'THE LARGEST MASS ARREST IN THE CITY\'S HISTORY', 640, 260, since(t, 'largest'), { px: 26 });
    vig(ctx, .8);
  }

  // ---------- t20: the 1980 census — more than 800,000 people lost in ten years: one New Yorker in ten ----------
  function t20(ctx, lt, dur, t) {
    const lo = since(t, 'lost2'), it = since(t, 'inten');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#c8c0b8'], [1, '#a8a098']]), 0, rect(0, 0, W, H));
    for (let i = 0; i < 10; i++) { const x = 170 + i * 105, gone = i === 7 && it > -.3, k = gone ? clamp((it + .3) / .6) : 0; ctx.save(); ctx.globalAlpha = 1 - k * .8; ctx.translate(0, -k * 30); immigrant(ctx, x, 560, .62, t, i + 3, { still: true }); ctx.restore(); if (gone && k > .5) { ctx.save(); ctx.setLineDash([8, 6]); ctx.strokeStyle = '#5a5050'; ctx.lineWidth = 3; ctx.strokeRect(x - 40, 340, 80, 220); ctx.restore(); } }
    counter(ctx, 640, 150, lo > -.4 ? (lo > .9 ? '−800,000+' : '−' + roll(0, 800000, (lo + .4) / 1.3)) : '0', since(t, 'y1980') + .2, 'PEOPLE · 1970 → 1980', '#ff8a6a', 52);
    if (it > -.2) strip(ctx, 'ONE NEW YORKER IN TEN', 640, 650, it + .2, { px: 36, color: RED });
    FX.dateTag(ctx, '1980 CENSUS');
    vig(ctx);
  }

  // ---------- t21: New York is finished — Count: 4. And this is the one where people believed it. So why wasn't it true? ----------
  function t21(ctx, lt, dur, t) {
    obituaryShot(ctx, lt, t, 4, since(t, 'nyfin') + .2, since(t, 'four'), '1975–1980');
    if (since(t, 'believed') > -.2) { ctx.save(); ctx.globalAlpha = clamp((since(t, 'believed') + .2) / .5); txt(ctx, 'THE ONE WHERE PEOPLE BELIEVED IT', 640, 100, FX.DISPLAY(34), '#ff8a6a'); ctx.restore(); }
    if (since(t, 'why') > -.2) { const s = pop(since(t, 'why') + .2); ctx.save(); ctx.translate(1110, 330); ctx.scale(s, s); FX.bigText(ctx, '?', 0, 0, 160, { color: GOLD }); ctx.restore(); }
  }

  // ---------- t22: the line of newcomers started up again — foreign-born New Yorkers, 1.4 million (1970) → almost 2.9 million (2000) ----------
  function t22(ctx, lt, dur, t) {
    const ag = since(t, 'again'), of = since(t, 'onefour'), tn = since(t, 'twonine');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ad0ec'], [1, '#f4e6c4']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [70, 120]);
    // jets landing, a line of people walking in from the left
    for (let i = 0; i < 2; i++) { const p = (t * .08 + i * .5) % 1; ctx.save(); ctx.translate(lerp(1400, -100, p), 120 + p * 120 + i * 40); ctx.rotate(.12); shape(ctx, '#f4efe6', 3, ellipse(0, 0, 70, 12)); shape(ctx, '#c8d4e0', 3, poly([[-10, 0], [20, -40], [34, -40], [20, 0]])); shape(ctx, '#3a7ac8', 0, rect(-50, -4, 90, 4)); ctx.restore(); }
    shape(ctx, '#c8b890', 0, rect(0, 600, W, 160));
    for (let i = 0; i < 12; i++) { const p = ((t * .05 * (ag > 0 ? 1 : .2) + i / 12) % 1); walker(ctx, lerp(-60, 640, p), 690, .5, t, i * 3 + 1, { cam: false }); }
    const k1 = of > -.3 ? FX.settle(clamp((of + .3) / .6)) : 0, k2 = tn > -.3 ? FX.settle(clamp((tn + .3) / .8)) : 0;
    line(ctx, [[740, 560], [1180, 560]], 4); shape(ctx, '#8ab0c8', 4, rect(780, 560 - 150 * k1, 140, 150 * k1)); shape(ctx, GREEN, 4, rect(1000, 560 - 310 * k2, 140, 310 * k2));
    if (k1 > .5) { txt(ctx, '1.4M', 850, 560 - 150 - 26, FX.DISPLAY(32), '#3a5a7a'); txt(ctx, '1970', 850, 590, FX.DISPLAY(24)); } if (k2 > .5) { txt(ctx, '2.9M', 1070, 560 - 310 - 26, FX.DISPLAY(32), GREEN); txt(ctx, '2000', 1070, 590, FX.DISPLAY(24)); }
    txt(ctx, 'NEW YORKERS BORN IN ANOTHER COUNTRY', 960, 640, FX.FONT(800, 16), '#3a2a20');
    strip(ctx, 'THE LINE OF NEWCOMERS STARTS UP AGAIN', 520, 92, since(t, 'newcomers') + .2, { px: 30, color: GREEN });
    vig(ctx);
  }

  // ---------- t23: they moved into neighborhoods everyone else had written off ----------
  function t23(ctx, lt, dur, t) {
    const nb = since(t, 'neighborhoods'), up = nb > -.3 ? ease.inOut(clamp((nb + .3) / 2.4)) : 0;
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, lerp(0, 1, up) > .5 ? '#7ac4ec' : '#9aa0a8'], [1, '#f0e2c4']]), 0, rect(0, 0, W, H));
    const cols = ['#e8b08a', '#f0d29a', '#e8c0b0', '#b8d8a8', '#a8c8e8', '#e8a8c0'], signs = ['BAKERY', 'GROCERY', 'TAQUERIA', 'NOODLES', 'TAILOR', 'MARKET'];
    for (let i = 0; i < 6; i++) { const x = 20 + i * 210, h = 300 + (i % 2) * 60; shape(ctx, up > i / 6 ? cols[i] : '#7a7470', 4, rect(x, 560 - h, 200, h)); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) shape(ctx, up > i / 6 ? '#3f5a74' : '#4a4440', 2, rect(x + 20 + c * 60, 560 - h + 30 + r * 80, 40, 50));
      if (up > i / 6) { shape(ctx, ['#c8322a', '#2f7a46', '#e8742a', '#2f4a8a', '#7a3a8a', '#d8a83a'][i], 3, rect(x + 10, 470, 180, 40, 4)); txt(ctx, signs[i], x + 100, 491, FX.FONT(800, 18), '#fff'); }
      else { for (let k = 0; k < 3; k++) line(ctx, [[x + 20, 480 + k * 20], [x + 180, 470 + k * 20]], 8, '#8a6a4a'); } }
    shape(ctx, '#c8c0b0', 0, rect(0, 560, W, 200));
    for (let i = 0; i < 9; i++) if (up > i / 9) walker(ctx, 80 + i * 140, 740, .55, t, i * 2 + 5, { cam: false, step: 1 });
    if (since(t, 'writtenoff') > -.6) FX.stamp(ctx, 'WRITTEN OFF?', 1080, 140, up < .5 ? since(t, 'writtenoff') + .6 : 0, { color: RED, size: 36 });
    strip(ctx, 'NEIGHBORHOODS EVERYONE ELSE HAD WRITTEN OFF', 520, 92, nb + .2, { px: 28 });
    vig(ctx);
  }

  // ---------- t24: that year (2000) the census counted more than eight million New Yorkers for the first time ----------
  function t24(ctx, lt, dur, t) {
    const em = since(t, 'eightmillion');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380); corner(ctx, t, { crowd: 1 }); ctx.restore();
    ctx.save(); ctx.globalAlpha = .45; shape(ctx, '#1d1a17', 0, rect(0, 0, W, H)); ctx.restore();
    counter(ctx, 640, 320, em > -.6 ? roll(7322564, 8008278, (em + .6) / 1.6) : '7,322,564', lt, 'NEW YORKERS · 2000 CENSUS', GOLD, 66);
    if (since(t, 'firsttime') > -.2) strip(ctx, 'MORE THAN 8 MILLION — FOR THE FIRST TIME', 640, 520, since(t, 'firsttime') + .2, { px: 32, color: GREEN });
    vig(ctx);
  }

  const cut = [[0, t1], [10.2, t2], [16.2, t3], [27.6, t4], [31.2, t5], [38.4, t6], [46.0, t7], [51.7, t8], [58.7, t9], [62.0, t10], [70.3, t11], [77.4, t12], [83.5, t13], [93.6, t14], [102.4, t15], [109.4, t16],
    [114.9, t17], [123.0, t18], [127.2, t19], [139.3, t20], [148.9, t21], [157.0, t22], [165.5, t23], [172.1, t24]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: .45, type: 'paper', gain: .4 }, { t: A.knocked, type: 'thud', gain: .5 }, { t: A.back, type: 'swell', gain: .4 }, { t: A.aqueduct - .3, type: 'paper', gain: .4 },
    { t: A.harbor, type: 'splash', gain: .3 }, { t: A.steady, type: 'click', gain: .3 }, { t: A.stop, type: 'thud', gain: .6 }, { t: A.y1975, type: 'whoosh', gain: .4 }, { t: A.factory, type: 'thud', gain: .4 },
    { t: A.lenders, type: 'thud', gain: .7 }, { t: A.bills, type: 'paper', gain: .5 }, { t: A.asks, type: 'whoosh', gain: .4 }, { t: A.rules, type: 'thud', gain: .6 }, { t: A.fivewords - .2, type: 'paper', gain: .5 },
    { t: A.drop - .1, type: 'thud', gain: .9 }, { t: A.never - .2, type: 'thud', gain: .6 }, { t: A.pencil, type: 'paper', gain: .4 }, { t: A.billion, type: 'ratchet', gain: .4 }, { t: A.paid - .2, type: 'thud', gain: .5 },
    { t: A.presidency - .2, type: 'thud', gain: .5 }, { t: A.cuts, type: 'click', gain: .4 }, { t: A.hardest, type: 'thud', gain: .5 }, { t: A.lightning, type: 'boom', gain: .7 }, { t: A.dark - .2, type: 'click', gain: .6 },
    { t: A.fires, type: 'boom', gain: .3 }, { t: A.arrests, type: 'ratchet', gain: .4 }, { t: A.inten, type: 'whoosh', gain: .4 }, { t: A.nyfin - .2, type: 'thud', gain: .8 }, { t: A.four, type: 'thud', gain: .6 },
    { t: A.again, type: 'swell', gain: .4 }, { t: A.neighborhoods, type: 'swell', gain: .3 }, { t: A.eightmillion, type: 'ratchet', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'under' }, { t: A.both - .3, mood: 'tense' }, { t: A.y1975 - .3, mood: 'mystery' }, { t: A.lightning - .3, mood: 'tense' }, { t: A.nyfin - .3, mood: 'silence' }, { t: A.because - .3, mood: 'under' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-climax.mp3', shots, sfx, moods, images: { ford: 'assets/img/ford-official.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
