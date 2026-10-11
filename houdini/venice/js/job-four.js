/* Venice — "Job four: a stage" (narration-jobfour.mp3 = 2.0 s chapter pause + narration-full.mp3 606.5–692.1 s).
 * Anchors = full-recording word times − 604.5. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { sovenice: 606.71, done: 608.94, finds: 609.8, newjob1: 611.09, goods: 613.01, through: 613.65, people: 614.87, come: 615.27, carnival: 616.59, months: 618.01,
    masks: 619.32, music: 620.08, visitors: 620.92, europe: 622.22, y1638: 623.44, opens: 625.26, ridotto: 625.71, gambling: 626.74, state: 627.94, described: 629.42, casino: 631.88,
    same: 633.05, newjob: 634.24, stage: 636.12, wonderful: 638.47, army: 641.74, wants: 642.05, y1797: 643.31, twenty7: 645.57, general: 646.99, napoleon: 647.76, bonaparte: 648.41,
    demands: 649.64, dissolve: 650.97, itself: 651.54, may12: 652.67, council: 654.48, votes: 655.01, exactly: 656.38, lastdoge: 657.68, manin: 658.94, walks: 659.55, palace: 660.19,
    twodays: 660.67, later: 661.17, eleven: 662.67, years: 663.66, over: 665.52, french: 666.79, paris: 668.33, y1815: 669.56, comeback: 670.88, independence: 672.67, doesnt: 673.64,
    wall: 675.24, goes: 676.14, y1846: 677.43, austrian: 678.94, rail: 680.2, opens2: 681.09, lagoon: 681.89, two22: 682.93, arches: 684.67, miles: 686.39, long: 686.93,
    first: 688.12, history: 689.03, reach: 690.08, venice: 690.4, boat: 691.43 };
  const A = {}; for (const k in F) A[k] = F[k] - 604.5; A.end = 89.1;
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
  const still = (ctx, lt, dur, z0 = 1, z1 = 1.05, fx = 640, fy = 380) => cam(ctx, lerp(z0, z1, ease.sine(clamp(lt / dur))), fx, fy);
  function card(ctx, lines, x, y, k, w = 360) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(x + 300, x, e), y); ctx.rotate(.02);
    const h = 30 + lines.length * 34; ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, PAPER, 3.5, rect(-w / 2, -h / 2, w, h, 3)); lines.forEach(([s, f, c], i) => txt(ctx, s, 0, -h / 2 + 32 + i * 34, f, c || INK)); ctx.restore(); }
  function curtain(ctx, open = 0, t = 0) { // red stage curtains; open 0 closed → 1 open
    for (const d of [-1, 1]) { const edge = 640 + d * lerp(0, 560, ease.inOut(open)); ctx.save(); const x0 = d < 0 ? -40 : edge, x1 = d < 0 ? edge : 1320;
      shape(ctx, '#a8222a', 4, rect(x0, -20, x1 - x0, 760)); for (let x = x0 + 20; x < x1; x += 44) line(ctx, [[x, -20], [x + Math.sin(t + x) * 4, 740]], 8, 'rgba(60,10,14,.35)'); ctx.restore(); }
    shape(ctx, '#8a1a22', 4, c => { c.moveTo(-40, -20); c.lineTo(1320, -20); c.lineTo(1320, 70); for (let x = 1320; x >= -40; x -= 80) c.quadraticCurveTo(x - 40, 120, x - 80, 70); c.closePath(); }); shape(ctx, GOLD, 0, rect(-40, 60, 1360, 8)); }
  function reveler(ctx, x, y, s, t, ph, kind = 0) { // masked Carnival figure: cloak, tricorn, white bauta mask (or a harlequin)
    ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 3 + ph)) * -4); ctx.scale(s, s);
    const cloak = ['#1f1c22', '#7a1f2a', '#2f4f6a', '#e8a838'][kind % 4];
    if (kind % 4 === 3) { shape(ctx, '#e8a838', 3.5, c => { c.moveTo(-30, 0); c.lineTo(-26, -90); c.quadraticCurveTo(0, -104, 26, -90); c.lineTo(30, 0); c.closePath(); }); ctx.save(); ctx.beginPath(); ctx.rect(-30, -100, 60, 100); ctx.clip(); for (let r = 0; r < 6; r++) for (let c2 = -2; c2 < 3; c2++) shape(ctx, (r + c2) % 2 ? '#d8402e' : '#2f8a4a', 0, poly([[c2 * 24, -100 + r * 18], [c2 * 24 + 12, -91 + r * 18], [c2 * 24, -82 + r * 18], [c2 * 24 - 12, -91 + r * 18]])); ctx.restore(); }
    else shape(ctx, cloak, 3.5, c => { c.moveTo(-34, 0); c.lineTo(-24, -92); c.quadraticCurveTo(0, -106, 24, -92); c.lineTo(34, 0); c.closePath(); });
    shape(ctx, '#f0e8d8', 3.5, ellipse(0, -120, 18, 22)); shape(ctx, '#f8f6f0', 3, c => { c.moveTo(-16, -128); c.quadraticCurveTo(0, -140, 16, -128); c.lineTo(14, -106); c.lineTo(0, -98); c.lineTo(-14, -106); c.closePath(); });
    for (const d of [-6, 6]) shape(ctx, INK, 0, ellipse(d, -122, 3.5, 2.5));
    if (kind % 4 !== 3) { shape(ctx, '#1f1c22', 3.5, poly([[-30, -136], [0, -156], [30, -136], [0, -142]])); } else shape(ctx, '#1f1c22', 3, rect(-16, -148, 32, 10, 4));
    ctx.restore(); }
  function lute(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.5 + Math.sin(t * 4) * .05); shape(ctx, '#c8884a', 3.5, ellipse(0, 0, 26, 32)); shape(ctx, '#5a3a22', 0, circle(0, -4, 7)); shape(ctx, '#8a5a34', 3, rect(-5, -78, 10, 48, 3)); ctx.restore(); }
  function steamTrain(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 3; i++) { const cx = -170 - i * 150; shape(ctx, ['#7a2a24', '#2f5a3a', '#7a2a24'][i], 4, rect(cx - 66, -70, 132, 60, 6)); for (let k = 0; k < 3; k++) shape(ctx, '#f4e8c8', 2.5, rect(cx - 52 + k * 38, -60, 26, 24, 4)); for (const d of [-40, 40]) shape(ctx, '#2a2a30', 3, circle(cx + d, -6, 14)); }
    shape(ctx, '#2a2a30', 4, rect(-90, -66, 150, 56, 10)); shape(ctx, '#3a3a40', 4, rect(-90, -100, 60, 40, 4)); shape(ctx, '#2a2a30', 4, rect(30, -110, 24, 50, 3)); shape(ctx, '#c9a14a', 3, rect(26, -116, 32, 10, 3));
    for (const [d, r] of [[-60, 24], [10, 24], [56, 16]]) { shape(ctx, '#c0303e', 3.5, circle(d, -6, r)); shape(ctx, '#2a2a30', 0, circle(d, -6, r * .3)); }
    for (let i = 0; i < 4; i++) { const k = (t * .8 + i / 4) % 1; ctx.save(); ctx.globalAlpha = .6 * (1 - k); shape(ctx, '#e8e4dc', 0, circle(42 - k * 140, -130 - k * 60, 14 + k * 30)); ctx.restore(); }
    ctx.restore(); }

  // ---------- g1: chapter card — JOB FOUR, A STAGE ----------
  function g1(ctx, lt, dur, t) {
    shape(ctx, '#3a1a20', 0, rect(0, 0, W, H)); curtain(ctx, .32, t); shape(ctx, '#8a5a34', 0, rect(0, 600, W, 120)); for (let i = 0; i < 9; i++) { glow(ctx, 100 + i * 135, 600, 70, 'rgba(255,220,140,.45)'); shape(ctx, '#c9a14a', 3, ellipse(100 + i * 135, 604, 16, 6)); }
    glow(ctx, 640, 420, 340, 'rgba(255,236,190,.4)');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420); V.lagoon(ctx, 640, 690, 520, t, { look: [0, -.4], eyes: blink(t, 1.3), mouth: 'smile', hat: (c, x, y) => V.hats.captain(c, x, y) }); ctx.restore();
    strip(ctx, 'JOB FOUR', 640, 150, lt - .05, { px: 58 }); strip(ctx, 'A STAGE', 640, 252, lt - .75, { px: 44, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- g2: Venice does what it has always done — finds the water a new job (the empty hat peg) ----------
  function g2(ctx, lt, dur, t) {
    const nj = since(t, 'newjob1');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f6b878'], [.6, '#f8dcb0'], [1, '#e8c890']]), 0, rect(0, 0, W, H)); glow(ctx, 900, 300, 460, 'rgba(255,230,180,.55)'); clouds(ctx, t, [100, 150], .8);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 420);
    ctx.save(); ctx.translate(0, -10); basilica(ctx, 1000, 470, .42, t); campanile(ctx, 860, 480, .36); ctx.restore(); shape(ctx, '#d8c8a8', 4, rect(-200, 470, 1700, 22)); waterBand(ctx, 488, t);
    // a wall of pegs: helmet, hard hat, captain's cap… and an empty fourth peg
    shape(ctx, '#8a5a34', 4.5, rect(120, 230, 520, 26, 6));
    [['helmet', 190], ['hardhat', 310], ['captain', 430]].forEach(([h, x]) => { line(ctx, [[x, 256], [x, 280]], 5, '#5a3a22'); ctx.save(); ctx.translate(x, 320); ctx.scale(.4, .4); V.hats[h](ctx, 0, 0); ctx.restore(); });
    line(ctx, [[560, 256], [560, 280]], 5, '#5a3a22'); if (nj < 0) txt(ctx, '?', 560, 330, FX.DISPLAY(56), RED); else { const s = pop(nj); ctx.save(); ctx.translate(560, 320); ctx.scale(s * .36, s * .36); ctx.globalAlpha = .25; V.hats.mask(ctx, 0, 0); ctx.restore(); txt(ctx, '?', 560, 330, FX.DISPLAY(56), RED); }
    V.lagoon(ctx, 760, 700, 560, t, { look: [-.8, -.6], eyes: blink(t, 4.0, 6.0), mouth: nj > 0 ? 'smile' : 'o', hat: (c, x, y) => V.hats.captain(c, x, y) });
    ctx.restore();
    if (nj > 0) tag(ctx, 'JOB #4: ?', 560, 410, nj, 22);
    strip(ctx, 'VENICE DOES WHAT IT HAS ALWAYS DONE', 640, 96, lt - .1, { px: 30 });
    vig(ctx);
  }

  // ---------- g3: if you can't be where the goods pass through, be where the people come ----------
  function g3(ctx, lt, dur, t) {
    const gd = since(t, 'goods'), pp = since(t, 'people');
    shape(ctx, '#f3e8cc', 0, rect(0, 0, W, H));
    ctx.save(); ctx.beginPath(); ctx.rect(20, 20, 610, 680); ctx.clip();
    shape(ctx, grad(ctx, 0, 20, 0, 460, [[0, '#b8c4cc'], [1, '#e8dcc4']]), 0, rect(20, 20, 610, 680)); shape(ctx, '#c8b8a0', 4, rect(20, 430, 610, 80)); shape(ctx, '#7aa0ac', 0, rect(20, 510, 610, 200));
    for (let i = 0; i < 5; i++) { const x = 80 + i * 100; shape(ctx, '#b89a70', 3.5, rect(x, 370, 80, 64, 4)); ctx.save(); ctx.globalAlpha = .6; line(ctx, [[x, 370], [x + 30, 340]], 1.5, '#fff'); line(ctx, [[x + 80, 370], [x + 50, 340]], 1.5, '#fff'); ctx.restore(); }
    galley(ctx, 140 - Math.max(0, gd) * 60, 560, .4, 4, t, { flag: RED }); ctx.restore(); shape(ctx, null, 5, rect(20, 20, 610, 680, 6)); tag(ctx, 'WHERE THE GOODS PASS THROUGH', 325, 70, gd, 18);
    ctx.save(); ctx.beginPath(); ctx.rect(650, 20, 610, 680); ctx.clip();
    shape(ctx, grad(ctx, 0, 20, 0, 460, [[0, '#8fd0ec'], [1, '#fbe6c0']]), 0, rect(650, 20, 610, 680)); ctx.save(); ctx.translate(310, 20); basilica(ctx, 640, 420, .5, t); ctx.restore();
    shape(ctx, '#d8c8a8', 4, rect(650, 420, 610, 90)); shape(ctx, V.WATER, 0, rect(650, 510, 610, 200));
    const n = pp > 0 ? Math.floor(clamp(pp / 1) * 22) : 4; const r = rng(4); for (let i = 0; i < n; i++) { const x = 680 + (i * 53) % 560, y = 470 + (i % 3) * 14; reveler(ctx, x, y, .4, t, i, Math.floor(r() * 4)); }
    for (let i = 0; i < 3; i++) { const bx = 700 + ((t * 40 + i * 200) % 600); ctx.save(); ctx.translate(bx, 600 + i * 30); shape(ctx, '#1f1a18', 3.5, c => { c.moveTo(-60, -6); c.quadraticCurveTo(0, 14, 66, -14); c.lineTo(60, -2); c.quadraticCurveTo(0, 16, -54, 4); c.closePath(); }); ctx.restore(); }
    ctx.restore(); shape(ctx, null, 5, rect(650, 20, 610, 680, 6)); tag(ctx, 'WHERE THE PEOPLE COME', 955, 70, pp, 20);
    if (pp > 0) { const s = pop(pp); ctx.save(); ctx.translate(640, 360); ctx.scale(s, s); shape(ctx, GOLD, 4, poly([[-40, -24], [10, -24], [10, -48], [50, 0], [10, 48], [10, 24], [-40, 24]])); ctx.restore(); }
    vig(ctx);
  }

  // ---------- g4: Carnival stretches on for months — masks, music, visitors from all over Europe ----------
  function g4(ctx, lt, dur, t) {
    const mo = since(t, 'months'), mk = since(t, 'masks'), mu = since(t, 'music'), vi = since(t, 'visitors');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#4a3a6a'], [.6, '#c8789a'], [1, '#f0b888']]), 0, rect(-200, -200, 1700, 1100));
    ctx.save(); ctx.translate(0, -20); basilica(ctx, 640, 430, .7, t); ctx.restore();
    for (let i = 0; i < 9; i++) { const x = 60 + i * 150; line(ctx, [[x, 120], [x + 150, 150]], 2.5, '#3a2a20'); for (let k = 0; k < 4; k++) { const lx = x + 20 + k * 36, ly = 126 + k * 7 + 8; shape(ctx, ['#e8402e', '#e8c14a', '#2f8a4a', '#2f6aa8'][(i + k) % 4], 2.5, ellipse(lx, ly, 9, 12)); glow(ctx, lx, ly, 26, 'rgba(255,220,140,.4)'); } }
    shape(ctx, '#c8b8a0', 0, rect(-200, 410, 1700, 400)); for (let i = -16; i <= 16; i++) line(ctx, [[640 + i * 20, 410], [640 + i * 120, 760]], 1.5, 'rgba(70,58,46,.3)');
    const r = rng(8); const crowd = mk > 0 ? 30 : 14; for (let i = 0; i < crowd; i++) { const x = 40 + (i * 89) % 1200, y = 480 + (i % 4) * 50; reveler(ctx, x + Math.sin(t * .7 + i) * 12, y, .65 + (i % 4) * .08, t, i, Math.floor(r() * 4)); }
    if (mu > 0) { for (const x of [300, 980]) { reveler(ctx, x, 690, .9, t, x, 1); lute(ctx, x + 26, 600, .9, t); } for (let i = 0; i < 6; i++) { const k = (t * .5 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 1 - k; txt(ctx, i % 2 ? '♪' : '♫', 320 + i * 40 + Math.sin(k * 6) * 20, 560 - k * 200, FX.DISPLAY(28), '#fff'); ctx.restore(); } }
    for (let i = 0; i < 40; i++) { const x = (i * 71 + t * 30) % 1280, y = (i * 37 + t * 80) % 720; shape(ctx, ['#e8402e', '#e8c14a', '#2f8a4a', '#2f6aa8', '#fff'][i % 5], 0, rect(x, y, 6, 4, 1)); }
    ctx.restore();
    // the calendar flips through the months of Carnival
    if (mo > -.6) { const months = ['DEC', 'JAN', 'FEB', 'MAR']; const idx = Math.min(3, Math.floor(clamp((mo + .6) / 1.6) * 4)); ctx.save(); ctx.translate(140, 140); shape(ctx, '#f6f0e0', 4, rect(-70, -70, 140, 140, 6)); shape(ctx, RED, 4, rect(-70, -70, 140, 40, 6)); txt(ctx, 'CARNIVAL', 0, -50, FX.FONT(700, 16), '#fff'); txt(ctx, months[idx], 0, 24, FX.DISPLAY(40)); ctx.restore(); }
    if (vi > 0) [['ENGLAND', 900, 190], ['FRANCE', 1060, 230], ['VIENNA', 960, 280], ['PRAGUE', 1130, 320]].forEach(([s, x, y], i) => { const k = pop(vi - i * .15); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(-.1 + i * .06); ctx.scale(k, k); shape(ctx, '#f2e6c4', 3.5, rect(-60, -18, 120, 36, 6)); shape(ctx, '#8a5a34', 2.5, circle(-48, 0, 5)); txt(ctx, s, 6, 1, FX.FONT(700, 15)); ctx.restore(); });
    strip(ctx, 'MASKS · MUSIC · VISITORS', 640, 690, mk, { px: 30 });
    vig(ctx);
    FX.dateTag(ctx, 'CARNIVAL, 1600s–1700s');
  }

  // ---------- g5: 1638 — the government opens the Ridotto, a gambling house run by the state ----------
  function g5(ctx, lt, dur, t) {
    const op = since(t, 'opens'), st = since(t, 'state');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#c88a5a', 0, rect(-200, -200, 1700, 1100)); for (let x = -200; x < 1500; x += 200) { shape(ctx, '#e0b080', 4, c => { c.moveTo(x + 30, 520); c.lineTo(x + 30, 200); c.quadraticCurveTo(x + 100, 130, x + 170, 200); c.lineTo(x + 170, 520); c.closePath(); }); shape(ctx, '#a86a40', 0, rect(x + 50, 220, 100, 300)); }
    for (const x of [320, 960]) { line(ctx, [[x, -200], [x, 80]], 3); shape(ctx, GOLD, 3.5, ellipse(x, 100, 70, 14)); for (let k = -2; k <= 2; k++) { shape(ctx, '#efe6d0', 2.5, rect(x + k * 26 - 4, 74, 8, 24)); glow(ctx, x + k * 26, 68, 34, 'rgba(255,210,130,.6)'); } }
    shape(ctx, '#7a3a2a', 0, rect(-200, 520, 1700, 300));
    for (const [x, y] of [[300, 560], [900, 580]]) { shape(ctx, '#2f6a3a', 4.5, ellipse(x, y, 200, 46)); shape(ctx, '#5a3a22', 4, rect(x - 180, y + 10, 20, 90)); shape(ctx, '#5a3a22', 4, rect(x + 160, y + 10, 20, 90)); for (let i = 0; i < 5; i++) shape(ctx, '#f4efe2', 2.5, rect(x - 80 + i * 32, y - 10, 22, 30, 3)); for (let i = 0; i < 4; i++) coin(ctx, x + 60 + i * 10, y + 6 - i * 4, .7); }
    const r = rng(5); for (let i = 0; i < 10; i++) { const x = 100 + i * 115, y = 520 + (i % 2) * 20; reveler(ctx, x, y, .85, t, i, Math.floor(r() * 3)); }
    if (st > -.4) { fig(ctx, 640, 640, .3, P('elder', 'patrician', { hands: { L: [-150, -560], R: [150, -560] }, face: { brows: 'calm', mouth: 'flat', look: [0, .2], eyes: blink(t, 22.8) } })); }
    ctx.restore();
    if (op > 0) { const s = slam(op); ctx.save(); ctx.translate(640, 120); ctx.scale(s, s); shape(ctx, '#2a1e18', 4, rect(-220, -40, 440, 80, 6)); txt(ctx, 'IL RIDOTTO · 1638', 0, 2, FX.DISPLAY(34), GOLD); ctx.restore(); }
    if (st > 0) { const s = slam(st); ctx.save(); ctx.translate(1080, 260); ctx.scale(s, s); shape(ctx, GOLD, 5, circle(0, 0, 64)); shape(ctx, '#c8a038', 0, circle(0, 0, 48)); txt(ctx, 'S·M', 0, 2, FX.DISPLAY(30), '#7a2a24'); ctx.restore(); tag(ctx, 'RUN BY THE STATE', 1080, 360, st, 20); }
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1638');
  }

  // ---------- g6: usually described as Europe's first legal public casino ----------
  function g6(ctx, lt, dur, t) {
    const cs = since(t, 'casino');
    shape(ctx, '#1f4a2a', 0, rect(0, 0, W, H)); ctx.save(); ctx.globalAlpha = .12; for (let i = 0; i < 300; i++) shape(ctx, '#fff', 0, circle((i * 97) % 1280, (i * 53) % 720, 1.5)); ctx.restore(); glow(ctx, 640, 360, 520, 'rgba(255,240,200,.25)');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    for (let i = 0; i < 5; i++) { const k = clamp((t - A.described + .3 - i * .12) / .6), x = lerp(1400, 260 + i * 120, ease.out(k)), rot = lerp(2, -.2 + i * .1, ease.out(k)); ctx.save(); ctx.translate(x, 470); ctx.rotate(rot); shape(ctx, '#f8f6f0', 3.5, rect(-46, -66, 92, 132, 8)); txt(ctx, ['A', 'K', 'Q', 'J', '7'][i], -26, -42, FX.DISPLAY(24), i % 2 ? RED : INK); shape(ctx, i % 2 ? RED : INK, 0, circle(0, 4, 16)); ctx.restore(); }
    for (let i = 0; i < 2; i++) { const d = since(t, 'described') - .2 - i * .15; if (d <= 0) continue; const h = FX.dropBounce(d, 300, .3), x = 900 + i * 110, rot = d < .6 ? d * 8 : .3 + i; ctx.save(); ctx.translate(x, 520 - h); ctx.rotate(rot); shape(ctx, '#f8f6f0', 4, rect(-34, -34, 68, 68, 10)); for (const [dx, dy] of i ? [[-14, -14], [14, 14], [0, 0]] : [[-14, -14], [14, -14], [-14, 14], [14, 14]]) shape(ctx, INK, 0, circle(dx, dy, 6)); ctx.restore(); }
    for (let i = 0; i < 12; i++) coin(ctx, 700 + (i % 4) * 30, 600 - Math.floor(i / 4) * 10, 1, 0);
    ctx.restore();
    if (cs > -.4) { const s = pop(cs + .4); ctx.save(); ctx.translate(640, 170); ctx.scale(s, s); shape(ctx, RED, 4, poly([[-80, 40], [-110, 140], [-60, 116], [-40, 160], [-10, 50]])); shape(ctx, RED, 4, poly([[80, 40], [110, 140], [60, 116], [40, 160], [10, 50]])); shape(ctx, GOLD, 5, circle(0, 0, 80)); shape(ctx, '#e8c14a', 0, circle(0, 0, 62));
      txt(ctx, 'FIRST', 0, -14, FX.DISPLAY(30), '#7a2a24'); txt(ctx, 'LEGAL PUBLIC', 0, 14, FX.FONT(700, 13), '#7a2a24'); txt(ctx, 'CASINO', 0, 34, FX.FONT(700, 13), '#7a2a24'); ctx.restore(); }
    tag(ctx, 'USUALLY DESCRIBED AS…', 640, 300, since(t, 'described'), 20); txt(ctx, "EUROPE'S", 640, 66, FX.DISPLAY(28), '#f4efe2');
    vig(ctx);
  }

  // ---------- g7: same water, new job — it's a stage (the curtains open; the lagoon puts on a Carnival mask) ----------
  function g7(ctx, lt, dur, t) {
    const nj = since(t, 'newjob'), sg = since(t, 'stage');
    shape(ctx, '#3a1a20', 0, rect(0, 0, W, H)); shape(ctx, grad(ctx, 0, 60, 0, 620, [[0, '#8fd0ec'], [1, '#fbe6c0']]), 0, rect(60, 60, 1160, 560));
    ctx.save(); ctx.translate(0, 20); basilica(ctx, 640, 520, .6, t); campanile(ctx, 400, 520, .5); ctx.restore(); shape(ctx, V.WATER, 0, rect(60, 540, 1160, 80));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    const off = nj > 0 ? clamp(nj / .7) : 0, drop = nj > .25 ? FX.dropBounce(nj - .25, 420, .3) : 999;
    V.lagoon(ctx, 640, 700, 600, t, { look: nj > 0 && nj < 1.2 ? [0, -.9] : [0, .1], eyes: blink(t, 30.4), mouth: sg > 0 ? 'smile' : 'o',
      hat: (c, x, y) => { if (off < 1) { c.save(); c.translate(off * 420, -off * 360 + off * off * 120); c.rotate(off * 2.5); V.hats.captain(c, x, y); c.restore(); }
        if (drop < 999) { c.save(); c.translate(0, -drop); V.hats.mask(c, x, y + 30); c.restore(); } } });
    ctx.restore();
    curtain(ctx, clamp((t - A.same + .3) / 1.4), t); shape(ctx, '#8a5a34', 0, rect(0, 640, W, 80)); for (let i = 0; i < 9; i++) { glow(ctx, 100 + i * 135, 640, 70, 'rgba(255,220,140,.5)'); shape(ctx, '#c9a14a', 3, ellipse(100 + i * 135, 644, 16, 6)); }
    if (sg > 0) { const s = pop(sg); ctx.save(); ctx.translate(1000, 420); ctx.scale(s, s); ctx.rotate(.05); line(ctx, [[0, 40], [0, 220]], 8, '#7a5434'); FX.paperDoc(ctx, 0, 0, 240, 120, { lines: 0, draw: c => { txt(c, 'JOB #4', 0, -18, FX.DISPLAY(40)); txt(c, 'STAGE', 0, 26, FX.DISPLAY(34), RED); } }); ctx.restore(); }
    strip(ctx, 'SAME WATER.', 470, 150, since(t, 'same'), { px: 44 }); strip(ctx, 'NEW JOB.', 830, 150, nj, { px: 44, color: RED, rot: .03 });
    vig(ctx);
  }

  // ---------- g8: a stage is wonderful to own — until someone with an army wants it ----------
  function g8(ctx, lt, dur, t) {
    const ar = since(t, 'army');
    shape(ctx, '#3a1a20', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, grad(ctx, 0, 60, 0, 620, [[0, '#f0c890'], [1, '#e8a868']]), 0, rect(60, 60, 1160, 600)); glow(ctx, 640, 360, 400, 'rgba(255,240,200,.5)');
    const r = rng(2); for (let i = 0; i < 6; i++) reveler(ctx, 260 + i * 150, 560, 1, t, i, Math.floor(r() * 4));
    if (ar > -.3) { const k = ease.out(clamp((ar + .3) / 1.6)); ctx.save(); ctx.globalAlpha = .55 * k; for (let i = 0; i < 8; i++) { const x = lerp(-300, 200, k) + i * 90; fig(ctx, x, 640, .32, P('fisher', 'tunicPoor', { feet: { L: [-50 + Math.sin(t * 6 + i) * 40, -40], R: [50 - Math.sin(t * 6 + i) * 40, -40] } }), { tint: '#1a1416' }); line(ctx, [[x + 40, 640 - 1200 * .32], [x + 46, 640 - 300 * .32]], 6, '#1a1416'); } ctx.restore();
      if (k > .3) for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(260 + i * 150, 560); ctx.rotate(Math.sin(t * 20 + i) * .04 * k); ctx.restore(); } }
    ctx.restore();
    curtain(ctx, 1, t); shape(ctx, '#8a5a34', 0, rect(0, 640, W, 80));
    strip(ctx, 'A WONDERFUL THING TO OWN…', 640, 150, since(t, 'wonderful') - .1, { px: 34 }); if (ar > 0) strip(ctx, '…UNTIL SOMEONE WITH AN ARMY WANTS IT', 640, 250, ar, { px: 28, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- g9: [MAP] northern Italy, 1797 — French armies closing in ----------
  const NL = ([lon, lat]) => [80 + (lon - 6.5) * 150, 70 + (46.6 - lat) * 175];
  function g9(ctx, lt, dur, t) {
    const yr = since(t, 'y1797');
    shape(ctx, '#efe0b8', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#cfd9a6', 0, rect(-200, -200, 1700, 1100));
    const ad = [[12.3, 45.4], [12.6, 44.8], [12.6, 44.1], [13.5, 43.6], [14, 43], [16, 43], [16, 46], [13.8, 45.6], [13, 45.7]].map(NL); shape(ctx, '#a8d4dc', 4, poly(ad));
    const lig = [[7.3, 43.7], [8.2, 43.9], [8.9, 44.4], [9.8, 44.1], [10.2, 43.9], [10.4, 43], [6, 43], [6, 43.6]].map(NL); shape(ctx, '#a8d4dc', 4, poly(lig));
    for (const [lon, lat] of [[7, 46.2], [8, 46.4], [9, 46.4], [10, 46.5], [11, 46.6], [12, 46.6], [13, 46.5], [6.9, 45.4], [7, 44.6]]) { const [x, y] = NL([lon, lat]); shape(ctx, '#b0a88c', 3, poly([[x - 34, y + 20], [x, y - 30], [x + 34, y + 20]])); shape(ctx, '#f4f2ea', 0, poly([[x - 10, y - 14], [x, y - 30], [x + 10, y - 14]])); }
    // Venice's mainland territories, turning French as the armies close in
    const terra = [[9.6, 45.9], [11.2, 46.3], [12.8, 46.4], [13.6, 45.8], [12.4, 45.2], [11.8, 45.0], [10.6, 45.2], [9.6, 45.5]].map(NL);
    const fr = ease.inOut(clamp((t - A.y1797 + .2) / 2.4)); shape(ctx, `rgba(${lerp(200, 47, fr) | 0},${lerp(60, 79, fr) | 0},${lerp(50, 154, fr) | 0},.35)`, 3.5, poly(terra));
    for (const [n, ll] of [['MILAN', [9.19, 45.46]], ['MANTUA', [10.79, 45.16]], ['VERONA', [10.99, 45.44]], ['PADUA', [11.88, 45.41]], ['VENICE', [12.33, 45.44]]]) { const [x, y] = NL(ll); shape(ctx, n === 'VENICE' ? RED : '#5a4026', 3, circle(x, y, n === 'VENICE' ? 10 : 7)); txt(ctx, n, x, y + 24, `italic 700 ${n === 'VENICE' ? 20 : 16}px Georgia, serif`, '#3a2a1a'); }
    for (let i = 0; i < 3; i++) { const k = ease.out(clamp((t - A.y1797 - i * .3) / 2)); const a = NL([7.5 + i * .4, 44.6 + i * .7]), b = NL([10.8 + i * .5, 45.2 + i * .1]); line(ctx, [a, [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]], 16, '#1d1a17'); line(ctx, [a, [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]], 9, '#2f4f9a'); if (k > .1) { const p = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)], ang = Math.atan2(b[1] - a[1], b[0] - a[0]); ctx.save(); ctx.translate(...p); ctx.rotate(ang); shape(ctx, '#2f4f9a', 4, poly([[24, 0], [-12, -20], [-12, 20]])); ctx.restore(); } }
    ctx.restore();
    if (yr > 0) { const s = pop(yr); ctx.save(); ctx.translate(1100, 600); ctx.scale(s, s); FX.bigText(ctx, '1797', 0, 0, 60, { color: GOLD }); ctx.restore(); }
    tag(ctx, 'FRENCH ARMIES', 260, 620, yr + .2, 22);
    vig(ctx);
    FX.dateTag(ctx, 'NORTHERN ITALY, 1797');
  }

  // ---------- g10: a 27-year-old French general, Napoleon Bonaparte — he demands the Republic dissolve itself ----------
  function g10(ctx, lt, dur, t) {
    const nm = since(t, 'napoleon'), dm = since(t, 'demands');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#7a8aa8'], [1, '#e8c8a0']]), 0, rect(-200, -200, 1700, 1100)); for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = .3; ctx.filter = 'blur(6px)'; shape(ctx, '#d8d0c8', 0, circle(200 + i * 300, 200, 120)); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const x = 820 + i * 140; line(ctx, [[x, 640], [x, 300]], 5, '#5a4026'); shape(ctx, ['#2f4f9a', '#f4efe2', '#c0303e'][i], 3, poly([[x, 300], [x + 90, 316 + Math.sin(t * 2 + i) * 6], [x, 350]])); }
    shape(ctx, '#a89070', 0, rect(-200, 620, 1700, 200));
    const X = 440, Y = 700;
    fig(ctx, X, Y, .42, P('napoleon', 'general', { hands: dm > 0 ? { L: [-120, -560], R: [300, -880] } : { L: [-120, -560], R: [150, -600] }, handShape: { R: dm > 0 ? 'fist' : 'open' }, face: { brows: dm > 0 ? 'strain' : 'calm', mouth: dm > 0 ? 'grit' : 'flat', look: [.6, 0], eyes: blink(t, 44.6) }, breathe: breathe(t) }));
    if (dm > 0) { const s = slam(dm); ctx.save(); ctx.translate(X + 300 * .42 + 130, Y - 880 * .42 - 10); ctx.rotate(.04); ctx.scale(s, s); FX.paperDoc(ctx, 0, 0, 280, 180, { lines: 0, draw: c => { txt(c, 'DEMAND', 0, -54, `700 26px Georgia, serif`, '#7a2a24'); txt(c, 'DISSOLVE', 0, 0, FX.DISPLAY(32)); txt(c, 'THE REPUBLIC', 0, 40, FX.DISPLAY(26), RED); } }); ctx.restore(); }
    ctx.restore();
    card(ctx, [['NAPOLEON BONAPARTE', FX.DISPLAY(28)], ['FRENCH GENERAL · AGE 27', FX.FONT(600, 17)]], 900, 140, nm - .2, 400);
    vig(ctx);
    FX.dateTag(ctx, 'SPRING 1797');
  }

  // ---------- g11: May 12 — Venice's Great Council votes to do exactly that ----------
  function g11(ctx, lt, dur, t) {
    const vt = since(t, 'votes'), ex = since(t, 'exactly');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#e0b878', 0, rect(-200, -200, 1700, 1100)); for (let i = 0; i < 4; i++) { shape(ctx, '#c89a58', 4, rect(40 + i * 310, 30, 280, 150, 4)); ctx.save(); ctx.globalAlpha = .5; shape(ctx, ['#8aa8c8', '#c8907a', '#a8b890', '#d8b878'][i], 0, rect(56 + i * 310, 46, 248, 118)); ctx.restore(); }
    shape(ctx, GOLD, 0, rect(-200, 180, 1700, 14));
    // rows of councillors in red and black
    for (let r = 0; r < 4; r++) { shape(ctx, '#7a4a2a', 0, rect(-200, 330 + r * 90, 1700, 22)); for (let i = 0; i < 18; i++) { const x = 20 + i * 70 + (r % 2) * 35, y = 330 + r * 90; shape(ctx, (i + r) % 3 ? '#a8222a' : '#26222a', 3, c => { c.moveTo(x - 20, y); c.lineTo(x - 16, y - 40); c.quadraticCurveTo(x, y - 48, x + 16, y - 40); c.lineTo(x + 20, y); c.closePath(); }); shape(ctx, '#f0c8a8', 2.5, circle(x, y - 54, 11)); } }
    // the ballot urn: balls drop in on "votes"
    shape(ctx, '#c9a14a', 5, c => { c.moveTo(560, 560); c.quadraticCurveTo(520, 460, 590, 430); c.lineTo(690, 430); c.quadraticCurveTo(760, 460, 720, 560); c.closePath(); }); shape(ctx, '#8a6a2a', 4, rect(590, 418, 100, 16, 4));
    if (vt > 0) for (let i = 0; i < 8; i++) { const d = vt - i * .12; if (d <= 0) continue; const y = 300 + Math.min(1, d / .4) * 130; if (d < .4) shape(ctx, '#f4efe2', 3, circle(640 + (i % 3 - 1) * 20, y, 10)); }
    ctx.restore();
    if (ex > 0) FX.stamp(ctx, 'REPUBLIC DISSOLVED', 640, 640, ex, { color: RED, size: 40, rot: -.05 });
    tag(ctx, 'THE GREAT COUNCIL', 640, 230, since(t, 'council'), 24);
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 12 MAY 1797');
  }

  // ---------- g12: the last doge, Ludovico Manin, walks out of the palace two days later ----------
  function g12(ctx, lt, dur, t) {
    const wk = since(t, 'walks'), td = since(t, 'twodays');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ac0d8'], [1, '#f0dcb8']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [90, 140]);
    // the Doge's Palace: pink diamond-patterned wall over a white arcade, and the great door
    shape(ctx, '#f0c8b0', 5, rect(-200, 80, 1700, 330)); ctx.save(); ctx.beginPath(); ctx.rect(-200, 80, 1700, 330); ctx.clip(); for (let y = 80; y < 410; y += 30) for (let x = -200 + ((y / 30) % 2) * 20; x < 1500; x += 40) shape(ctx, 'rgba(255,255,255,.35)', 0, poly([[x, y], [x + 20, y + 15], [x, y + 30], [x - 20, y + 15]])); ctx.restore();
    for (let i = 0; i < 14; i++) shape(ctx, '#f4efe4', 4, c => { const x = -160 + i * 110; c.moveTo(x, 600); c.lineTo(x, 470); c.arc(x + 40, 470, 40, Math.PI, 0); c.lineTo(x + 80, 600); c.closePath(); }); shape(ctx, '#f4efe4', 4, rect(-200, 406, 1700, 26));
    shape(ctx, '#e8dcc8', 5, rect(500, 200, 280, 400)); shape(ctx, '#5a3a2a', 5, c => { c.moveTo(560, 600); c.lineTo(560, 400); c.arc(640, 400, 80, Math.PI, 0); c.lineTo(720, 600); c.closePath(); }); shape(ctx, GOLD, 3.5, ellipse(640, 300, 40, 24));
    shape(ctx, '#c8b8a0', 0, rect(-200, 600, 1700, 200));
    const X = wk > 0 ? lerp(640, 900, ease.inOut(clamp(wk / 2.2))) : 640, ph = t * 5;
    fig(ctx, X, 700, .32, P('manin', 'doge', { feet: wk > 0 && wk < 2.2 ? { L: [-30 + Math.sin(ph) * 50, -40 - Math.max(0, Math.cos(ph)) * 24], R: [30 - Math.sin(ph) * 50, -40 - Math.max(0, -Math.cos(ph)) * 24] } : undefined, face: { brows: 'worried', mouth: 'flat', look: [.6, .2], eyes: blink(t, 53.8, 56.0) }, breathe: breathe(t) }));
    ctx.restore();
    card(ctx, [['LUDOVICO MANIN', FX.DISPLAY(28)], ['THE LAST DOGE', FX.FONT(600, 17)]], 330, 140, since(t, 'manin') - .3, 360);
    if (td > 0) tag(ctx, 'TWO DAYS LATER', 1000, 160, td, 24);
    vig(ctx);
    FX.dateTag(ctx, '14 MAY 1797');
  }

  // ---------- g13: after about eleven hundred years, the Republic is over (the lion banner comes down) ----------
  function g13(ctx, lt, dur, t) {
    const el = since(t, 'eleven'), ov = since(t, 'over');
    ctx.save(); still(ctx, lt, dur, 1, 1.05, 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#c8a890'], [1, '#f0d8b0']]), 0, rect(-200, -200, 1700, 1100)); glow(ctx, 640, 300, 420, 'rgba(255,236,200,.4)');
    ctx.save(); ctx.translate(0, 30); basilica(ctx, 640, 470, .62, t); ctx.restore(); shape(ctx, '#c8b8a0', 0, rect(-200, 500, 1700, 300));
    line(ctx, [[640, 640], [640, 140]], 7, '#5a3a2a'); shape(ctx, '#c9a14a', 4, rect(624, 620, 32, 24, 3));
    const down = ov > -.4 ? ease.inOut(clamp((ov + .4) / 2)) : 0, fy = lerp(150, 520, down);
    ctx.save(); ctx.translate(640, fy); shape(ctx, '#b8222a', 4, c => { c.moveTo(0, 0); c.lineTo(180, 6 + Math.sin(t * 2) * 6); c.lineTo(160, 60); c.lineTo(180, 110 + Math.sin(t * 2 + 1) * 6); c.lineTo(0, 100); c.closePath(); }); shape(ctx, GOLD, 3, circle(80, 50, 26)); txt(ctx, 'S·M', 80, 52, FX.DISPLAY(16), '#7a2a24'); ctx.restore();
    ctx.restore();
    if (el > 0) { const k = ease.out(clamp(el / 1.2)), n = Math.round(lerp(0, 1100, k)), s = pop(el); ctx.save(); ctx.translate(1020, 140); ctx.scale(s, s); FX.bigText(ctx, '≈ ' + n.toLocaleString('en-US') + ' YEARS', 0, 0, 46, { color: GOLD }); ctx.restore(); txt(ctx, 'c. 697 – 1797', 1020, 196, FX.DISPLAY(22)); }
    FX.caption(ctx, 'THE REPUBLIC IS OVER', ov, .1);
    vig(ctx);
  }

  // ---------- g14: the French take the horses to Paris; 1815 they come back; the independence doesn't (a passport) ----------
  function g14(ctx, lt, dur, t) {
    const pr = since(t, 'paris'), cb = since(t, 'comeback'), ind = since(t, 'independence'), dn = since(t, 'doesnt');
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#7a2a24', 5, rect(180, 110, 920, 520, 10)); shape(ctx, '#f2e8d0', 4, rect(198, 126, 432, 488, 4)); shape(ctx, '#f2e8d0', 4, rect(650, 126, 432, 488, 4)); line(ctx, [[640, 126], [640, 614]], 4);
    txt(ctx, 'PASSPORT', 414, 170, FX.DISPLAY(30), '#7a2a24'); ctx.save(); ctx.translate(414, 340); for (let i = 0; i < 4; i++) horse(ctx, -90 + i * 60, 40, .55, i < 2 ? 1 : -1); ctx.restore(); txt(ctx, 'THE FOUR HORSES OF ST MARK', 414, 440, FX.FONT(700, 16));
    txt(ctx, 'CONSTANTINOPLE → VENICE · 1204', 414, 490, FX.FONT(600, 14), '#5a4a3a');
    FX.stamp(ctx, 'PARIS 1797', 790, 230, pr, { color: '#2f4f9a', size: 34, rot: -.12 });
    FX.stamp(ctx, 'VENEZIA 1815', 940, 360, cb, { color: GREEN, size: 32, rot: .08 });
    if (ind > 0) { ctx.save(); ctx.globalAlpha = clamp(ind / .3); ctx.setLineDash([8, 6]); ctx.strokeStyle = '#7a6a5a'; ctx.lineWidth = 3; ctx.strokeRect(700, 470, 330, 110); ctx.restore(); txt(ctx, 'INDEPENDENCE', 865, 500, FX.FONT(700, 18), '#7a6a5a'); }
    if (dn > 0) FX.stamp(ctx, 'NOT RETURNED', 865, 548, dn, { color: RED, size: 26, rot: -.04 });
    ctx.restore();
    vig(ctx);
  }

  // ---------- g15: then the wall itself goes — 1846, under Austrian rule ----------
  function g15(ctx, lt, dur, t) {
    const gs = since(t, 'goes'), au = since(t, 'austrian');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ac4dc'], [1, '#eedcb8']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [90, 140]);
    shape(ctx, '#a9c3a8', 0, rect(-200, 330, 560, 60)); txt(ctx, 'MAINLAND', 120, 310, FX.DISPLAY(20), '#4a6a4a');
    shape(ctx, '#5aa0b4', 0, rect(-200, 380, 1700, 400));
    ctx.save(); ctx.translate(200, -40); basilica(ctx, 640, 470, .36, t); campanile(ctx, 520, 480, .3); ctx.restore(); shape(ctx, '#d8c8a8', 4, rect(560, 430, 520, 24));
    // the old water wall around the city — it cracks
    const cr = gs > 0 ? clamp(gs / .5) : 0; for (let i = 0; i < 18; i++) { const a = Math.PI * (.5 + i / 17), x = 820 + Math.cos(a) * 400, y = 520 + Math.sin(a) * 120; const broken = cr > 0 && i >= 7 && i <= 10; ctx.save(); ctx.translate(x, y); if (broken) { ctx.translate((i - 8.5) * 12 * cr, 30 * cr); ctx.rotate((i - 8.5) * .2 * cr); ctx.globalAlpha = 1 - cr * .5; } shape(ctx, '#b8ad96', 3.5, rect(-14, -30, 28, 30)); ctx.restore(); }
    V.lagoon(ctx, 220, 760, 360, t, { look: [.9, -.2], eyes: blink(t, 71.0), mouth: gs > 0 ? 'o' : 'flat', hat: (c, x, y) => V.hats.helmet(c, x, y) });
    if (au > 0) { const s = pop(au); ctx.save(); ctx.translate(1080, 260); ctx.scale(s, s); line(ctx, [[0, 0], [0, 200]], 6, '#5a3a2a'); shape(ctx, '#1d1a17', 3.5, rect(0, 0, 150, 50)); shape(ctx, '#e8c14a', 3.5, rect(0, 50, 150, 50)); ctx.restore(); tag(ctx, 'AUSTRIAN RULE', 1120, 400, au, 20); }
    ctx.restore();
    if (since(t, 'y1846') > 0) { const s = pop(since(t, 'y1846')); ctx.save(); ctx.translate(640, 120); ctx.scale(s, s); FX.bigText(ctx, '1846', 0, 0, 60, { color: GOLD }); ctx.restore(); }
    strip(ctx, 'THEN THE WALL ITSELF GOES', 640, 680, gs, { px: 30 });
    vig(ctx);
  }

  // ---------- g16: a railroad bridge across the lagoon — 222 arches, more than two miles long ----------
  function g16(ctx, lt, dur, t) {
    const ar = since(t, 'arches'), tw = since(t, 'two22'), mi = since(t, 'miles');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8fd0ec'], [1, '#fbe6c0']]), 0, rect(-200, -200, 1700, 1100)); glow(ctx, 1000, 150, 420, 'rgba(255,240,200,.5)'); clouds(ctx, t); birds(ctx, t, 3, 150);
    T.blurred(ctx, 1, () => { shape(ctx, '#a9c3a8', 0, rect(-200, 330, 300, 60)); ctx.save(); ctx.translate(560, -60); basilica(ctx, 640, 420, .3, t); campanile(ctx, 530, 420, .24); ctx.restore(); });
    shape(ctx, '#5aa0b4', 0, rect(-200, 380, 1700, 400));
    // the bridge recedes from the mainland (left, near) to Venice (right, far)
    const N = 46, P0 = [-120, 520], P1 = [1100, 400], h0 = 120, h1 = 26, lit = tw > 0 ? Math.floor(clamp(tw / 1.8) * N) : 0;
    for (let i = 0; i < N; i++) { const k0 = i / N, k1 = (i + 1) / N, x0 = lerp(P0[0], P1[0], Math.pow(k0, .8)), x1 = lerp(P0[0], P1[0], Math.pow(k1, .8)), y0 = lerp(P0[1], P1[1], k0), y1 = lerp(P0[1], P1[1], k1), h = lerp(h0, h1, k0);
      shape(ctx, i < lit ? '#f0d098' : '#d8c8a8', 2.5, c => { c.moveTo(x0, y0 - h); c.lineTo(x1, y1 - h * .97); c.lineTo(x1, y1); c.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 - h * .7, x0, y0); c.closePath(); }); }
    line(ctx, [[P0[0], P0[1] - h0 - 4], [P1[0], P1[1] - h1 - 4]], 6, '#7a6a5a');
    const tk = clamp((t - A.rail + .3) / 9), tx = lerp(P0[0] + 80, P1[0] - 60, Math.pow(tk, .8)), ty = lerp(P0[1], P1[1], tk) - lerp(h0, h1, tk) - 4; steamTrain(ctx, tx, ty, lerp(.7, .2, tk), t);
    for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .35; shape(ctx, '#fff6dc', 0, ellipse(200 + i * 160, 600 + (i % 2) * 40, 70, 5)); ctx.restore(); }
    ctx.restore();
    if (tw > 0) { const n = Math.min(222, Math.floor(clamp(tw / 1.8) * 222)), s = pop(tw); ctx.save(); ctx.translate(320, 120); ctx.scale(s, s); FX.bigText(ctx, n + ' ARCHES', 0, 0, 52, { color: GOLD }); ctx.restore(); }
    if (mi > 0) tag(ctx, 'MORE THAN 2 MILES (3.6 KM)', 900, 640, mi, 24);
    strip(ctx, 'A RAILROAD BRIDGE ACROSS THE LAGOON', 760, 96, since(t, 'rail'), { px: 30 });
    vig(ctx);
    FX.dateTag(ctx, '1846');
  }

  // ---------- g17: for the first time in its history, you can reach Venice without a boat ----------
  function g17(ctx, lt, dur, t) {
    const bt = since(t, 'boat');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#a8d0e4'], [1, '#f6e4c0']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [80, 130]);
    shape(ctx, '#c8a888', 5, rect(100, 120, 1080, 300)); for (let i = 0; i < 8; i++) shape(ctx, '#e8d8b8', 3.5, c => { const x = 140 + i * 130; c.moveTo(x, 420); c.lineTo(x, 260); c.arc(x + 45, 260, 45, Math.PI, 0); c.lineTo(x + 90, 420); c.closePath(); });
    txt(ctx, 'STAZIONE · VENEZIA', 640, 170, FX.DISPLAY(30), '#5a3a22');
    shape(ctx, '#a89880', 4, rect(-200, 420, 1700, 70)); line(ctx, [[-200, 520], [1500, 520]], 6, '#5a5a60'); line(ctx, [[-200, 550], [1500, 550]], 6, '#5a5a60');
    const ax = FX.approach(t, A.first - 1.2, 1800, 820, .7); steamTrain(ctx, ax, 535, .9, t);
    for (let i = 0; i < 4; i++) { const k = clamp((t - A.reach + .2 - i * .2) / 1.2); if (k <= 0) continue; fig(ctx, lerp(700 - i * 70, 380 - i * 90, k), 470, .2, P(['elder', 'villagerW', 'fisher', 'merchant'][i], ['patrician', 'dressPlain', 'tunicElder', 'merchantRobe'][i], { feet: { L: [-30 + Math.sin(t * 6 + i) * 40, -40], R: [30 - Math.sin(t * 6 + i) * 40, -40] }, face: { look: [-.6, 0], mouth: 'smile' } }), { mirror: true }); }
    shape(ctx, V.WATER, 4, rect(-200, 600, 1700, 200)); ctx.save(); ctx.translate(250, 650 + Math.sin(t * 1.5) * 3); shape(ctx, '#1f1a18', 4, c => { c.moveTo(-130, -10); c.quadraticCurveTo(0, 20, 140, -26); c.lineTo(130, -6); c.quadraticCurveTo(0, 24, -120, 4); c.closePath(); }); ctx.restore();
    fig(ctx, 260, 652, .2, P('fisher', 'tunicPoor', { hands: { L: [60, -640], R: [-60, -620] }, face: { brows: 'worried', mouth: 'frown', look: [.8, -.3] } }));
    ctx.restore();
    if (bt > 0) { const s = pop(bt); ctx.save(); ctx.translate(1040, 640); ctx.scale(s, s); shape(ctx, '#f4efe2', 5, circle(0, 0, 56)); shape(ctx, '#7a5434', 3, c => { c.moveTo(-34, 0); c.lineTo(34, 0); c.quadraticCurveTo(26, 14, 16, 16); c.lineTo(-16, 16); c.quadraticCurveTo(-26, 14, -34, 0); c.closePath(); }); line(ctx, [[-40, -40], [40, 40]], 10, RED); shape(ctx, null, 8, circle(0, 0, 56)); ctx.restore(); }
    strip(ctx, 'NO BOAT NEEDED', 640, 690, bt, { px: 32 }); tag(ctx, 'FIRST TIME IN ITS HISTORY', 640, 96, since(t, 'first'), 24);
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1846');
  }

  const cut = [[0, g1], [2.05, g2], [7.35, g3], [11.85, g4], [18.6, g5], [24.3, g6], [28.3, g7], [33.0, g8], [38.55, g9], [42.0, g10], [48.0, g11], [52.6, g12], [57.4, g13], [62.0, g14], [70.0, g15], [75.5, g16], [83.1, g17]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .6 }, { t: A.newjob1, type: 'click', gain: .4 }, { t: A.people, type: 'whoosh', gain: .3 }, { t: A.carnival, type: 'swell', gain: .4 },
    { t: A.masks, type: 'paper', gain: .4 }, { t: A.visitors, type: 'paper', gain: .3 }, { t: A.opens, type: 'thud', gain: .6 }, { t: A.state, type: 'thud', gain: .6 },
    { t: A.described, type: 'slide', gain: .4 }, { t: A.described + .5, type: 'thud', gain: .4 }, { t: A.casino, type: 'swell', gain: .4 },
    { t: A.same - .3, type: 'slide', gain: .4 }, { t: A.newjob, type: 'whoosh', gain: .5 }, { t: A.stage, type: 'thud', gain: .6 },
    { t: A.army, type: 'boom', gain: .5 }, { t: A.y1797, type: 'thud', gain: .5 }, { t: A.napoleon, type: 'slide', gain: .4 }, { t: A.demands, type: 'thud', gain: .7 },
    { t: A.votes, type: 'click', gain: .4 }, { t: A.votes + .3, type: 'click', gain: .4 }, { t: A.exactly, type: 'thud', gain: .7 }, { t: A.manin, type: 'slide', gain: .4 }, { t: A.walks, type: 'creak', gain: .4 },
    { t: A.over, type: 'wind', gain: .3 }, { t: A.paris, type: 'thud', gain: .6 }, { t: A.comeback, type: 'thud', gain: .6 }, { t: A.doesnt, type: 'thud', gain: .7 },
    { t: A.goes, type: 'rattle', gain: .5 }, { t: A.austrian, type: 'paper', gain: .4 }, { t: A.rail, type: 'whoosh', gain: .4 }, { t: A.two22, type: 'ratchet', gain: .4 }, { t: A.miles, type: 'click', gain: .4 },
    { t: A.first - 1, type: 'whoosh', gain: .4 }, { t: A.boat, type: 'thud', gain: .6 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.army - .4, mood: 'tense' }, { t: A.over - .5, mood: 'silence' }, { t: A.french - .2, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-jobfour.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
