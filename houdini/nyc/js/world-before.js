/* New York — Beat 2 "The world before" (narration-worldbefore.mp3 = 1.8 s chapter pause + narration-full.mp3 61.5–118.25 s + 1 s tail).
 * Anchors = full-recording word times − 59.7. Lenape life drawn from general ethnographic reference (bark-covered houses,
 * cornfields, dugout canoes, deerskin clothing): no feathered headdresses, no stereotypes. Eric Sanderson is a living
 * person: shown as a name card and an anonymous figure from behind. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { start: 61.67, hillside: 62.32, y1609: 63.64, lenape: 65.79, thousands: 67.76, name: 69.66, inside: 70.7, manna: 71.89, translated: 73.74, island: 74.84, hills: 75.75,
    argue: 78.31, walk: 80.32, ecologist: 81.42, sanderson: 82.57, ten: 83.52, rebuilding: 84.4, block: 85.88, british: 88.07, map: 88.72, reconstruction: 90.11, sixty: 91.46,
    streams: 92.64, twenty: 94.38, ponds: 94.77, times: 95.99, square: 96.27, forest: 97.34, scientific: 98.72, model: 99.3, photograph: 100.07, best: 101.81, look: 102.21,
    turn: 104.2, south: 104.44, marsh: 105.46, water: 106.67, reason: 107.3, everything: 107.97, deep: 109.77, sheltered: 110.27, harbor: 110.82, river: 111.47, north: 112.19,
    continent: 112.78, hold: 113.89, harbor2: 114.56, character: 115.87, never: 117.2, leaves: 117.52 };
  const A = {}; for (const k in F) A[k] = F[k] - 59.7; A.end = 59.55;

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


  const harbor = N.harbor, corner = N.corner, walker = N.walker;
  const SKINL = ['#b07a52', '#a06a44', '#c08a5a', '#8a5a3a'];
  const lenape = (ctx, x, y, s, t, v, o = {}) => walker(ctx, x, y, s, t, v, Object.assign({ plain: true, coat: v % 2 ? '#b8865a' : '#a87648', pants: '#9a6a40', shoe: '#7a4a2a', skin: SKINL[v % 4], hair: '#1d1a17', hs: v % 3 === 0 ? 0 : 1, beads: v % 2 === 0 }, o));
  function wigwam(ctx, x, y, s, long) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const w = long ? 200 : 110;
    shape(ctx, '#8a6a48', 4.5, c => { c.moveTo(-w, 0); c.bezierCurveTo(-w, -150, w, -150, w, 0); c.closePath(); });
    for (let i = 1; i < 5; i++) line(ctx, [[-w + i * w / 2.5, -6], [-w + i * w / 2.5, -100 + Math.abs(i - 2.5) * 20]], 2.5, 'rgba(60,40,20,.4)'); for (let k = 1; k < 4; k++) { ctx.save(); ctx.beginPath(); ctx.moveTo(-w, 0); ctx.bezierCurveTo(-w, -150, w, -150, w, 0); ctx.clip(); line(ctx, [[-w, -k * 32], [w, -k * 32]], 2.5, 'rgba(60,40,20,.35)'); ctx.restore(); }
    shape(ctx, '#3a2a1a', 3, c => { c.moveTo(-22, 0); c.lineTo(-22, -54); c.quadraticCurveTo(0, -70, 22, -54); c.lineTo(22, 0); c.closePath(); }); ctx.restore(); }
  function corn(ctx, x, y, s, t, i) { const sw = Math.sin(t * 1.4 + i) * 3; line(ctx, [[x, y], [x + sw, y - 70 * s]], 4 * s + 1, '#5f8f34'); for (const d of [-1, 1]) line(ctx, [[x + sw * .5, y - 34 * s], [x + d * 22 * s + sw, y - 46 * s]], 3 * s + 1, '#6f9f3c'); shape(ctx, '#f2c24a', 2, ellipse(x + 6 * s + sw, y - 50 * s, 4 * s, 10 * s)); }
  function frame(ctx, im, x, y, w, h, k, label) { if (k <= 0 || !im) return; const e = FX.settle(clamp(k / .5)); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); ctx.rotate(-.02);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-w / 2 + 10, -h / 2 + 12, w + 24, h + 24)); shape(ctx, '#8a5a2a', 5, rect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 4)); shape(ctx, '#c89a5a', 3, rect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8));
    ctx.drawImage(im, -w / 2, -h / 2, w, h); if (label) { shape(ctx, PAPER, 3, rect(-150, h / 2 + 22, 300, 34, 3)); txt(ctx, label, 0, h / 2 + 40, FX.FONT(700, 15)); } ctx.restore(); }

  // ---------- b1: chapter card over the 1609 hillside — THE WORLD BEFORE ----------
  function b1(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 400); corner(ctx, t, { m: 1 }); birds(ctx, t, 4, 180); ctx.restore();
    strip(ctx, 'BEAT 2', 640, 120, lt - .05, { px: 30 }); strip(ctx, 'THE WORLD BEFORE', 640, 214, lt - .4, { px: 54, color: GREEN, rot: .02 });
    if (since(t, 'hillside') > 0) tag(ctx, 'START WITH THE HILLSIDE', 640, 620, since(t, 'hillside'), 24);
    vig(ctx);
  }

  // ---------- b2: in 1609 this island belongs to the Lenape, and has for thousands of years ----------
  function b2(ctx, lt, dur, t) {
    const ln = since(t, 'lenape'), th = since(t, 'thousands');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420);
    sky(ctx, t, '#7cc4ec', '#fde6b8'); farShore(ctx, 380, t); waterBand(ctx, 400, t, -600, 2200, '#4aa6c2');
    // a dugout canoe out on the water, fishing
    { const cx = 1000 + Math.sin(t * .4) * 30, cy = 430; shape(ctx, '#6a4a2a', 3.5, c => { c.moveTo(cx - 90, cy - 8); c.quadraticCurveTo(cx, cy + 16, cx + 90, cy - 8); c.lineTo(cx + 78, cy + 6); c.quadraticCurveTo(cx, cy + 22, cx - 78, cy + 6); c.closePath(); });
      for (const d of [-40, 30]) { shape(ctx, '#a87648', 2.5, rect(cx + d - 10, cy - 40, 20, 34, 6)); shape(ctx, '#a06a44', 2.5, circle(cx + d, cy - 50, 10)); shape(ctx, '#1d1a17', 0, ellipse(cx + d, cy - 56, 10, 6)); } line(ctx, [[cx + 40, cy - 36], [cx + 70, cy + 16]], 3, '#5a3a20'); }
    // the shore: bark-covered houses, a cornfield, a drying rack with fish, smoke from a cooking fire
    shape(ctx, grad(ctx, 0, 440, 0, 760, [[0, '#a8c070'], [1, '#7f9a4a']]), 4, c => { c.moveTo(-100, 470); c.quadraticCurveTo(640, 430, 1400, 480); c.lineTo(1400, 800); c.lineTo(-100, 800); c.closePath(); });
    for (let i = 0; i < 26; i++) corn(ctx, 820 + (i % 13) * 34 + (Math.floor(i / 13)) * 16, 560 + Math.floor(i / 13) * 40, 1 + Math.floor(i / 13) * .2, t, i);
    wigwam(ctx, 300, 520, .9, true); wigwam(ctx, 560, 500, .7, false); wigwam(ctx, 120, 560, .6, false);
    for (let k = 0; k < 5; k++) { const p = (t * .2 + k / 5) % 1; ctx.save(); ctx.globalAlpha = .5 * (1 - p); shape(ctx, '#e8e4dc', 0, circle(700 + Math.sin(p * 6) * 10, 560 - p * 200, 10 + p * 20)); ctx.restore(); }
    shape(ctx, '#5a3a20', 3, c => { c.moveTo(680, 580); c.lineTo(720, 580); c.lineTo(710, 570); c.lineTo(690, 570); c.closePath(); }); glow(ctx, 700, 570, 40, 'rgba(255,160,60,.6)'); shape(ctx, '#f2a03a', 0, poly([[690, 572], [700, 548], [710, 572]]));
    line(ctx, [[600, 600], [600, 520]], 5, '#6a4a2a'); line(ctx, [[660, 600], [660, 520]], 5, '#6a4a2a'); line(ctx, [[596, 526], [664, 526]], 4, '#6a4a2a'); for (let i = 0; i < 4; i++) shape(ctx, '#a8b4bc', 2, ellipse(608 + i * 16, 546, 5, 14));
    // people at work: carrying a basket, tending the corn, a child running
    lenape(ctx, 430, 700, .62, t, 0, { still: true }); lenape(ctx, 960, 690, .55, t, 1, { reach: true, still: true }); lenape(ctx, 1150, 720, .66, t, 2, { still: true }); lenape(ctx, 230, 730, .42, t * 1.6, 3, { flip: true });
    shape(ctx, '#c8a060', 3, c => { c.moveTo(390, 540); c.lineTo(470, 540); c.lineTo(460, 580); c.lineTo(400, 580); c.closePath(); }); for (let i = 0; i < 4; i++) shape(ctx, '#f2c24a', 2, ellipse(406 + i * 16, 538, 7, 9));
    ctx.restore();
    FX.dateTag(ctx, '1609 · MANHATTAN');
    if (ln > -.2) strip(ctx, 'LENAPE HOMELAND', 640, 110, ln + .2, { px: 44, color: '#8a4a2a' });
    if (th > 0) tag(ctx, 'FOR THOUSANDS OF YEARS', 640, 200, th, 24);
    vig(ctx);
  }

  // ---------- b3: their name for it is still inside ours: Mannahatta → Manhattan ----------
  function b3(ctx, lt, dur, t) {
    const mn = since(t, 'manna'), ins = since(t, 'inside');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f6e6c4'], [1, '#e8c890']]), 0, rect(0, 0, W, H));
    for (let i = 0; i < 18; i++) line(ctx, [[0, 30 + i * 40], [W, 30 + i * 40]], 2, 'rgba(140,100,50,.12)');
    // the island silhouette behind the words, half forest, half city
    ctx.save(); ctx.globalAlpha = .55; const IL = MAN.map(RL).map(([x, y]) => [x, y + 250]); shape(ctx, '#7fb85a', 4, poly(IL)); ctx.beginPath(); poly(IL)(ctx); ctx.clip();
      for (let i = 0; i < 40; i++) { const x = 100 + i * 28, y = 500 + (i % 3) * 18; if (x < 640) shape(ctx, '#4f8f3a', 2, circle(x, y, 14)); else { shape(ctx, ['#a9b6c4', '#d8c0a0', '#e8b08a'][i % 3], 2, rect(x - 10, y - 30 - (i % 4) * 14, 20, 50 + (i % 4) * 14)); } } ctx.restore();
    const word = 'MANNAHATTA', keep = [1, 1, 1, 0, 0, 1, 1, 1, 1, 1], show = mn > -.3 ? clamp((mn + .3) / .5) : 0, morph = mn > .5 ? ease.inOut(clamp((mn - .5) / 1.0)) : 0;
    ctx.save(); ctx.font = FX.DISPLAY(96); const ws = [...word].map(c => ctx.measureText(c).width), tot = ws.reduce((a, b) => a + b, 0); ctx.restore();
    let x0 = 640 - tot / 2; [...word].forEach((c, i) => { const cx = x0 + ws[i] / 2; x0 += ws[i]; const drop = keep[i] ? 0 : morph; ctx.save(); ctx.globalAlpha = show * (1 - drop); ctx.translate(cx, 300 + drop * 120); ctx.rotate(drop * (i % 2 ? .6 : -.6));
      FX.bigText(ctx, c, 0, 0, 96, { color: keep[i] ? GOLD : '#e8a060' }); ctx.restore(); });
    if (morph > .8) { const k = clamp((morph - .8) / .2); ctx.save(); ctx.globalAlpha = k; FX.bigText(ctx, 'MANHATTAN', 640, 470, 84, { color: '#fff' }); ctx.restore(); line(ctx, [[640, 350], [640, 410]], 6, INK); shape(ctx, INK, 0, poly([[626, 404], [654, 404], [640, 424]])); }
    if (ins > -.2) strip(ctx, 'THEIR NAME IS STILL INSIDE OURS', 640, 110, ins + .2, { px: 32 });
    txt(ctx, 'LENAPE (MUNSEE)', 640, 220, FX.FONT(700, 22), '#8a4a2a');
    vig(ctx);
  }

  // ---------- b4: usually translated "island of many hills" — though people who study the language still argue ----------
  function b4(ctx, lt, dur, t) {
    const hl = since(t, 'hills'), ar = since(t, 'argue');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 400);
    sky(ctx, t, '#86ccee', '#fde8c0'); waterBand(ctx, 520, t, -600, 2200, '#4aa6c2');
    // the island in profile, hill after hill, each popping up on "many hills"
    const hs = [[120, 90], [260, 130], [400, 100], [520, 160], [660, 120], [790, 180], [930, 140], [1070, 110], [1190, 150]];
    ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, 1800, 724); ctx.clip();
    hs.forEach(([x, h], i) => { const k = hl > -.4 ? FX.settle(clamp((hl + .4 - i * .07) / .4)) : .35; shape(ctx, i % 2 ? '#6aa84c' : '#76b456', 4, ellipse(x, 524, 130, Math.max(10, h * k))); shape(ctx, 'rgba(255,255,255,.14)', 0, ellipse(x - 30, 524 - h * k * .6, 26, Math.max(.5, h * k * .2))); });
    ctx.restore(); shape(ctx, '#6aa84c', 4, rect(-60, 516, 1400, 14));
    hs.forEach(([x, h], i) => { const k = hl > -.4 ? FX.settle(clamp((hl + .4 - i * .07) / .4)) : .35; for (let j = 0; j < 3; j++) shape(ctx, j % 2 ? '#3f7f3a' : '#4f9a44', 3, circle(x - 26 + j * 26, 520 - h * k + 6 + (j % 2) * 8, 18)); });
    ctx.restore();
    if (since(t, 'translated') > -.2) strip(ctx, 'USUALLY TRANSLATED:', 640, 100, since(t, 'translated') + .2, { px: 28 });
    if (since(t, 'island') > -.2) { const s = pop(since(t, 'island') + .2); ctx.save(); ctx.translate(640, 196); ctx.scale(s, s); FX.bigText(ctx, '"ISLAND OF MANY HILLS"', 0, 0, 56, { color: GOLD }); ctx.restore(); }
    if (ar > -.2) { const k = ar + .2; for (const [x, y, d] of [[260, 640, 0], [1020, 640, .25]]) { if (k - d <= 0) continue; const s = pop(k - d); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#fff', 4, ellipse(0, 0, 70, 46)); shape(ctx, '#fff', 0, poly([[-10, 40], [14, 40], [x < 640 ? 40 : -40, 70]])); txt(ctx, '?', 0, 4, FX.DISPLAY(52), RED); ctx.restore(); }
      tag(ctx, 'LINGUISTS STILL ARGUE ABOUT IT', 640, 660, ar, 22); }
    vig(ctx);
  }

  // ---------- b5: an ecologist, Eric Sanderson, spent ten years rebuilding this landscape, block by block ----------
  function b5(ctx, lt, dur, t) {
    const bk = since(t, 'block'), tn = since(t, 'ten'), rb = since(t, 'rebuilding');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#d8e4ec'], [1, '#b8c8d4']]), 0, rect(0, 0, W, H));
    // a big map table seen from above: the street grid peels away block by block to reveal forest, streams and wetland
    ctx.save(); ctx.translate(640, 330); ctx.rotate(-.06);
    shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-470, -250, 960, 520)); shape(ctx, '#8a6a4a', 5, rect(-480, -262, 960, 520, 10)); shape(ctx, '#fbf6ea', 3, rect(-460, -242, 920, 480));
    const cols = 14, rows = 8, cw = 920 / cols, rh = 480 / rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = -460 + c * cw, y = -242 + r * rh, order = (c + r * 1.7) / (cols + rows * 1.7), flip = rb > 0 ? clamp((rb * .35 - order * 1.6) / .25) : 0;
      if (flip < 1) { ctx.save(); ctx.translate(x + cw / 2, y + rh / 2); ctx.scale(1, 1 - flip); shape(ctx, '#d0ccc4', 2, rect(-cw / 2 + 4, -rh / 2 + 4, cw - 8, rh - 8)); for (let k = 0; k < 3; k++) shape(ctx, ['#e8b08a', '#a9b6c4', '#f0d29a'][(r + c + k) % 3], 1.5, rect(-cw / 2 + 8 + k * 18, -rh / 2 + 8, 14, rh - 16)); ctx.restore(); }
      if (flip > 0) { ctx.save(); ctx.globalAlpha = flip; shape(ctx, (r * 3 + c) % 7 === 0 ? '#9fd0e0' : '#7fb85a', 0, rect(x + 1, y + 1, cw - 2, rh - 2)); if ((r * 3 + c) % 7 !== 0) for (let k = 0; k < 2; k++) shape(ctx, '#4f8f3a', 1.5, circle(x + 16 + k * 26, y + 20 + (k % 2) * 16, 11)); ctx.restore(); } }
    if (rb > 1.4) { ctx.save(); ctx.globalAlpha = clamp((rb - 1.4) / .8); ctx.lineWidth = 5; ctx.strokeStyle = '#3a9ad0'; ctx.beginPath(); ctx.moveTo(-460, 60); ctx.bezierCurveTo(-200, -40, 0, 120, 200, 20); ctx.bezierCurveTo(320, -40, 380, 60, 460, 0); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    // the ecologist at the table, seen from behind (a living person: no likeness)
    ctx.save(); ctx.translate(1040, 760); shape(ctx, '#4a6a4a', 4.5, c => { c.moveTo(-90, 0); c.lineTo(-80, -180); c.quadraticCurveTo(0, -230, 80, -180); c.lineTo(90, 0); c.closePath(); }); shape(ctx, '#5a3a2a', 4.5, circle(0, -236, 50)); shape(ctx, '#3a2a1a', 0, ellipse(0, -258, 46, 26));
    line(ctx, [[-70, -160], [-150, -240]], 22, INK); line(ctx, [[-70, -160], [-150, -240]], 15, '#4a6a4a'); shape(ctx, '#e8b890', 3, circle(-154, -246, 13)); ctx.restore();
    // name card
    const nk = since(t, 'sanderson') + .2; if (nk > 0) { const e = FX.settle(clamp(nk / .4)); ctx.save(); ctx.translate(lerp(-300, 230, e), 600); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -46, 400, 100)); shape(ctx, PAPER, 4, rect(-200, -50, 400, 100, 4)); txt(ctx, 'ERIC SANDERSON', 0, -14, FX.DISPLAY(32)); txt(ctx, 'ECOLOGIST · THE MANNAHATTA PROJECT', 0, 24, FX.FONT(700, 15), '#5a4a38'); ctx.restore(); }
    if (tn > 0) { const s = pop(tn); ctx.save(); ctx.translate(1120, 110); ctx.scale(s, s); shape(ctx, '#1d1a17', 0, rect(-110, -40, 220, 80, 10)); txt(ctx, '10 YEARS', 0, 2, FX.DISPLAY(40), GOLD); ctx.restore(); }
    if (bk > 0) strip(ctx, 'BLOCK BY BLOCK', 330, 92, bk, { px: 36, color: GREEN });
    vig(ctx);
  }

  // ---------- b6: from an old British army map → more than 60 miles of streams and 20 ponds ----------
  const MAN = [[-74.018, 40.700], [-74.0, 40.703], [-73.976, 40.711], [-73.972, 40.73], [-73.972, 40.75], [-73.958, 40.762], [-73.942, 40.776], [-73.929, 40.797], [-73.934, 40.81], [-73.934, 40.835], [-73.927, 40.85], [-73.912, 40.873],
    [-73.92, 40.879], [-73.93, 40.875], [-73.946, 40.851], [-73.959, 40.83], [-73.97, 40.81], [-73.989, 40.785], [-74.009, 40.756], [-74.012, 40.73], [-74.016, 40.712]];
  const RL = ([lon, lat]) => { const dx = (lon + 73.968) * 84.3, dy = (lat - 40.787) * 111, a = 29 * Math.PI / 180, u = dx * Math.sin(a) + dy * Math.cos(a), v = dx * Math.cos(a) - dy * Math.sin(a); return [640 + u * 52, 360 + v * 52]; };
  function b6(ctx, lt, dur, t) {
    const br = since(t, 'british'), rc = since(t, 'reconstruction'), st = since(t, 'streams'), pd = since(t, 'ponds');
    shape(ctx, grad(ctx, 0, 0, W, H, [[0, '#f0e2c0'], [1, '#e0c898']]), 0, rect(0, 0, W, H));
    const fade = rc > 0 ? clamp(rc / .8) : 0;
    // the 1782 British Headquarters Map, framed, then the reconstruction drawn over the island
    if (fade < 1) { ctx.save(); ctx.globalAlpha = 1 - fade; const im = T.IMG.bhq; frame(ctx, im, 640, 360, 1000, 1000 * (im ? im.height / im.width : .29), br + .4, 'BRITISH HEADQUARTERS MAP · c. 1782'); ctx.restore(); }
    if (fade > 0) { ctx.save(); ctx.globalAlpha = fade;
      // the island laid along the screen (north to the right), 1609 landscape
      const L = RL;
      shape(ctx, '#7cc0dc', 0, rect(0, 0, W, H)); for (let i = 0; i < 12; i++) line(ctx, [[((i * 130 + t * 10) % 1400) - 60, 80 + i * 52], [((i * 130 + t * 10) % 1400) - 20, 80 + i * 52]], 3, 'rgba(255,255,255,.5)');
      shape(ctx, '#6aa84c', 4.5, poly(MAN.map(L)));
      ctx.save(); ctx.beginPath(); poly(MAN.map(L))(ctx); ctx.clip(); for (let i = 0; i < 70; i++) { const x = 60 + (i * 97) % 1200, y = 160 + (i * 59) % 420; shape(ctx, i % 3 ? '#4f8f3a' : '#3f7f34', 2, circle(x, y, 14 + (i % 3) * 3)); }
      // streams draw themselves on "sixty miles of streams"
      const sk = st > -.5 ? clamp((st + .5) / 1.6) : 0; ctx.lineWidth = 5; ctx.strokeStyle = '#2f8ad0'; ctx.lineCap = 'round';
      for (let i = 0; i < 18; i++) { const x0 = 100 + i * 62, y0 = 230; ctx.beginPath(); ctx.moveTo(x0, y0); const n = 8; for (let j = 1; j <= Math.ceil(n * sk); j++) ctx.lineTo(x0 + Math.sin(j * 1.3 + i) * 16, y0 + j * 32); ctx.stroke(); }
      if (pd > -.2) for (let i = 0; i < 21; i++) { const k = pop(pd + .2 - i * .04); if (k <= 0) continue; const x = 130 + (i * 113) % 1040, y = 300 + (i * 71) % 180; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); shape(ctx, '#3a9ad0', 2.5, ellipse(0, 0, 18, 11)); ctx.restore(); }
      ctx.restore(); ctx.restore();
      if (st > -.3) { const s = pop(st + .3); ctx.save(); ctx.translate(330, 640); ctx.scale(s, s); shape(ctx, '#1d1a17', 0, rect(-210, -36, 420, 72, 10)); txt(ctx, '60+ MILES OF STREAMS', 0, 2, FX.DISPLAY(32), '#8ad0ff'); ctx.restore(); }
      if (pd > -.2) { const s = pop(pd + .2); ctx.save(); ctx.translate(960, 640); ctx.scale(s, s); shape(ctx, '#1d1a17', 0, rect(-140, -36, 280, 72, 10)); txt(ctx, '20+ PONDS', 0, 2, FX.DISPLAY(32), '#8ad0ff'); ctx.restore(); }
      FX.dateTag(ctx, 'MANHATTAN, 1609 · RECONSTRUCTION'); }
    vig(ctx);
  }

  // ---------- b7: where Times Square will be — forest (wipe, same angle) ----------
  function b7(ctx, lt, dur, t) {
    const fo = since(t, 'forest'), wipe = fo > -.6 ? ease.inOut(clamp((fo + .6) / 1.0)) : 0, wx = lerp(1300, -20, wipe);
    // Times Square, today: billboards, the red steps, taxis, crowds
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, wx, H); ctx.clip();
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a2a5a'], [1, '#5a3a6a']]), 0, rect(0, 0, W, H));
    for (const [x, w, h, side] of [[0, 300, 720, -1], [980, 300, 720, 1]]) { shape(ctx, '#3a3a4a', 4, rect(x, 0, w, h)); for (let i = 0; i < 6; i++) { const y = 20 + i * 110, col = ['#e83a5a', '#3ac8e8', '#f6c945', '#8a5ae8', '#3ae88a', '#e8823a'][(i + (side > 0 ? 3 : 0)) % 6]; shape(ctx, col, 3, rect(x + 20, y, w - 40, 90, 6)); glow(ctx, x + w / 2, y + 45, 90, col + '66'); for (let k = 0; k < 3; k++) shape(ctx, 'rgba(255,255,255,.6)', 0, rect(x + 40 + k * 70, y + 30 + (k % 2) * 16, 50, 10, 4)); } }
    shape(ctx, '#3a3a4a', 4, poly([[300, 0], [520, 0], [560, 420], [300, 520]])); shape(ctx, '#3a3a4a', 4, poly([[980, 0], [760, 0], [720, 420], [980, 520]]));
    for (let i = 0; i < 4; i++) { shape(ctx, ['#f6c945', '#e83a5a'][i % 2], 3, poly([[320, 40 + i * 110], [500, 60 + i * 95], [516, 140 + i * 90], [320, 130 + i * 110]])); shape(ctx, ['#3ac8e8', '#8a5ae8'][i % 2], 3, poly([[960, 40 + i * 110], [780, 60 + i * 95], [764, 140 + i * 90], [960, 130 + i * 110]])); }
    shape(ctx, '#7a7e86', 0, poly([[300, 520], [980, 520], [1280, 720], [0, 720]])); shape(ctx, '#c8322a', 4, poly([[520, 470], [760, 470], [800, 560], [480, 560]])); for (let i = 0; i < 5; i++) line(ctx, [[488 + i * 4, 480 + i * 18], [792 - i * 4, 480 + i * 18]], 2, 'rgba(255,255,255,.4)');
    for (let i = 0; i < 3; i++) N.taxi(ctx, 300 + ((t * 80 + i * 300) % 700), 620 + i * 30, .8);
    for (let i = 0; i < 8; i++) walker(ctx, 60 + i * 160, 790 + (i % 2) * 20, .62, t, i * 2 + 3);
    ctx.restore();
    // the same spot in 1609: forest
    ctx.save(); ctx.beginPath(); ctx.rect(wx, 0, W - wx, H); ctx.clip();
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ad0ec'], [1, '#e8f0c0']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 200, 400, 'rgba(255,250,210,.6)');
    for (let r = 0; r < 4; r++) for (let i = 0; i < 12; i++) { const x = -40 + i * 120 + (r % 2) * 60, y = 280 + r * 130, s = .7 + r * .35, sw = Math.sin(t + i + r) * 3;
      shape(ctx, '#5a3a20', 3, rect(x - 9 * s, y - 20 * s, 18 * s, 120 * s)); for (const [dx, dy, rr, c] of [[-30, -60, 46, '#3f7f3a'], [30, -64, 48, '#3a7434'], [0, -100, 56, '#4f9a44']]) shape(ctx, c, 3, circle(x + dx * s + sw, y + dy * s, rr * s)); }
    for (let i = 0; i < 6; i++) { const y = 640 + (i % 2) * 40; shape(ctx, ['#e05a5a', '#f6c945', '#f4efe2'][i % 3], 0, circle(80 + i * 220, y, 7)); }
    // a deer where the red steps will be
    shape(ctx, '#a8744a', 3.5, ellipse(640, 600, 60, 28)); for (const dx of [-36, -16, 24, 44]) line(ctx, [[640 + dx, 620], [640 + dx, 680]], 7, '#8a5a34'); shape(ctx, '#a8744a', 3.5, ellipse(700, 556, 20, 34, .4)); shape(ctx, '#a8744a', 3, ellipse(712, 528, 24, 14)); line(ctx, [[704, 516], [692, 486], [684, 476]], 4, '#6a4a2a'); line(ctx, [[712, 514], [720, 484]], 4, '#6a4a2a');
    ctx.restore();
    line(ctx, [[wx, 0], [wx, H]], 8, '#fbf6ea');
    if (wipe < .5) strip(ctx, 'TIMES SQUARE, TODAY', 640, 90, since(t, 'times') + .2, { px: 34 }); else strip(ctx, 'TIMES SQUARE, 1609: FOREST', 640, 90, fo, { px: 34, color: GREEN });
    vig(ctx);
  }

  // ---------- b8: a scientific model, not a photograph — and the best look anyone has ----------
  function b8(ctx, lt, dur, t) {
    const md = since(t, 'model'), ph = since(t, 'photograph'), bs = since(t, 'best');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2f5a7a'], [1, '#1f3a5a']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 30; i++) shape(ctx, 'rgba(255,255,255,.06)', 0, circle((i * 211) % W, (i * 97) % H, 30));
    // a computer screen with the model rendering as layers (terrain, soil, forest, water)
    ctx.save(); ctx.translate(560, 360); shape(ctx, '#2a2a30', 5, rect(-360, -230, 720, 440, 16)); shape(ctx, '#0f1a2a', 0, rect(-340, -210, 680, 400));
    const layers = [['#8a6a4a', 'TERRAIN'], ['#c8a060', 'SOILS'], ['#3a9ad0', 'WATER'], ['#4f9a44', 'FOREST'], ['#e8d870', 'MEADOWS']];
    layers.forEach(([c, l], i) => { const k = clamp((lt - .2 - i * .35) / .4); if (k <= 0) return; const y = 120 - i * 50 - (1 - k) * 40; ctx.save(); ctx.globalAlpha = .85 * k; shape(ctx, c, 2.5, poly([[-260, y], [140, y], [260, y - 60], [-140, y - 60]])); ctx.restore(); txt(ctx, l, 300, y - 30, FX.FONT(700, 14), '#cfe0f0'); });
    shape(ctx, '#3a3a40', 4, rect(-60, 210, 120, 40)); shape(ctx, '#3a3a40', 4, rect(-160, 248, 320, 18, 6)); ctx.restore();
    if (md > -.2) { const s = pop(md + .2); ctx.save(); ctx.translate(1060, 220); ctx.scale(s, s); shape(ctx, '#f4efe2', 4, rect(-130, -50, 260, 100, 10)); txt(ctx, 'SCIENTIFIC', 0, -14, FX.DISPLAY(28), GREEN); txt(ctx, 'MODEL ✓', 0, 22, FX.DISPLAY(28), GREEN); ctx.restore(); }
    if (ph > -.1) { const s = pop(ph + .1); ctx.save(); ctx.translate(1060, 400); ctx.scale(s, s); shape(ctx, '#f4efe2', 4, rect(-130, -60, 260, 120, 10)); shape(ctx, '#5a5a60', 3.5, rect(-46, -34, 92, 62, 8)); shape(ctx, '#9ac0dc', 3, circle(0, -4, 20)); shape(ctx, '#5a5a60', 3, rect(-30, -44, 28, 12, 3));
      line(ctx, [[-70, -50], [70, 50]], 10, RED); txt(ctx, 'NOT A PHOTO', 0, 44, FX.FONT(800, 16), RED); ctx.restore(); }
    if (bs > -.2) strip(ctx, 'ALSO THE BEST LOOK ANYONE HAS', 640, 660, bs + .2, { px: 32, color: GREEN });
    vig(ctx);
  }

  // ---------- b9: now turn south, past the marsh — that water is the reason for everything that follows ----------
  function b9(ctx, lt, dur, t) {
    const ms = since(t, 'marsh'), rs = since(t, 'reason');
    ctx.save(); cam(ctx, lerp(1.0, 1.08, ease.sine(clamp(lt / dur))), 640, 420);
    shape(ctx, grad(ctx, 0, -100, 0, 420, [[0, '#4aa8e8'], [.7, '#b8e2f4'], [1, '#ffe2a8']]), 0, rect(-200, -200, 1700, 700)); glow(ctx, 640, 360, 420, 'rgba(255,240,190,.6)'); clouds(ctx, t, [80, 140]); birds(ctx, t, 5, 170);
    // the harbor opening south: Staten Island and the Narrows far off, Governors Island, New Jersey to the right
    T.blurred(ctx, 1.2, () => { shape(ctx, '#86b47e', 0, c => { c.moveTo(-200, 360); c.quadraticCurveTo(200, 330, 520, 360); c.lineTo(520, 372); c.lineTo(-200, 372); c.closePath(); }); shape(ctx, '#7aa870', 0, c => { c.moveTo(820, 360); c.quadraticCurveTo(1100, 320, 1500, 350); c.lineTo(1500, 372); c.lineTo(820, 372); c.closePath(); }); });
    shape(ctx, grad(ctx, 0, 360, 0, 760, [[0, '#7ad0e0'], [1, '#2f8ab0']]), 0, rect(-200, 362, 1700, 500));
    for (let i = 0; i < 18; i++) { const x = ((i * 113 + t * 15) % 1500) - 100, y = 380 + (i * 47) % 300; line(ctx, [[x, y], [x + 30 + y * .05, y]], 3, 'rgba(255,255,255,.5)'); }
    ctx.save(); ctx.globalAlpha = .35; shape(ctx, '#fff6c8', 0, poly([[600, 362], [680, 362], [800, 760], [480, 760]])); ctx.restore();
    shape(ctx, '#8ab870', 3, ellipse(860, 420, 70, 14)); for (let i = 0; i < 4; i++) shape(ctx, '#4f8f3a', 2, circle(830 + i * 20, 410, 9));
    if (rs > 0) { const k = clamp(rs / 1.0); const hy = 600 - 80 * ease.out(k); ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, 1800, hy + 200 + 10); ctx.clip(); harbor(ctx, 640, hy, 330, t, { look: [0, -.2], eyes: blink(t, 48.5), mouth: 'smile' }); ctx.restore(); for (let i = 0; i < 5; i++) line(ctx, [[520 + i * 56, hy + 12 + (i % 2) * 6], [556 + i * 56, hy + 12 + (i % 2) * 6]], 4, 'rgba(255,255,255,.7)'); for (let i = 0; i < 6; i++) sparkle(ctx, 420 + i * 90, 470 + (i % 2) * 40, (rs - i * .1) / .9, .8); }
    // the marsh you look past, in the foreground
    shape(ctx, '#9ab868', 4, c => { c.moveTo(-200, 600); c.quadraticCurveTo(300, 560, 640, 640); c.quadraticCurveTo(1000, 580, 1500, 610); c.lineTo(1500, 900); c.lineTo(-200, 900); c.closePath(); });
    for (let i = 0; i < 60; i++) { const x = -60 + (i * 47) % 1400, y = 610 + (i * 31) % 120, h = 40 + (i * 17) % 50, sw = Math.sin(t * 1.3 + i) * 5; line(ctx, [[x, y], [x + sw, y - h]], 5, i % 2 ? '#6f7f34' : '#5a6a2a'); if (i % 5 === 0) shape(ctx, '#8a5a34', 2, ellipse(x + sw, y - h - 10, 5, 12)); }
    ctx.restore();
    if (since(t, 'south') > -.2) strip(ctx, 'NOW TURN SOUTH', 640, 92, since(t, 'south') + .2, { px: 36 });
    if (rs > 0) strip(ctx, 'THE REASON FOR EVERYTHING THAT FOLLOWS', 640, 190, rs, { px: 30, color: '#2f6a9a', rot: .02 });
    vig(ctx);
  }

  // ---------- b10: a deep, sheltered harbor with a river running north into the continent (map from lon/lat) ----------
  const PP = ([lon, lat]) => [640 + (lon + 73.8) * 208, 360 - (lat - 41.6) * 277];
  const WEST = [[-77, 40.3], [-74.05, 40.3], [-74.0, 40.47], [-74.1, 40.45], [-74.27, 40.48], [-74.27, 40.52], [-74.2, 40.63], [-74.15, 40.66], [-74.08, 40.67], [-74.05, 40.71], [-74.02, 40.76], [-73.96, 40.85], [-73.92, 41.0], [-73.96, 41.3], [-73.97, 41.6], [-73.95, 42.0], [-73.85, 42.3], [-73.76, 42.65], [-73.75, 43.2], [-77, 43.2]].map(PP);
  const EAST = [[-73.73, 43.2], [-73.73, 42.65], [-73.82, 42.3], [-73.9, 42.0], [-73.93, 41.6], [-73.9, 41.3], [-73.87, 41.0], [-73.91, 40.88], [-73.8, 40.81], [-73.7, 40.87], [-73.62, 40.99], [-73.4, 41.08], [-73.0, 41.2], [-72.4, 41.27], [-71.8, 41.33], [-70.5, 41.5], [-70.5, 43.2]].map(PP);
  const LI = [[-74.04, 40.70], [-74.02, 40.64], [-74.04, 40.58], [-73.9, 40.57], [-73.7, 40.58], [-73.3, 40.63], [-72.9, 40.72], [-72.4, 40.82], [-71.9, 41.07], [-72.3, 41.0], [-72.9, 40.95], [-73.4, 40.9], [-73.7, 40.83], [-73.82, 40.8], [-73.93, 40.77], [-73.97, 40.72]].map(PP);
  const SI = [[-74.07, 40.64], [-74.06, 40.6], [-74.12, 40.54], [-74.25, 40.5], [-74.24, 40.55], [-74.2, 40.63], [-74.15, 40.64]].map(PP);
  function b10(ctx, lt, dur, t) {
    const dp = since(t, 'deep'), sh = since(t, 'sheltered'), rv = since(t, 'river'), nt = since(t, 'north'), ct = since(t, 'continent');
    const z = T.keys(t, [[A.deep - .3, 2.2], [A.river, 2.2], [A.north + .2, 1.0]]), fy = T.keys(t, [[A.deep - .3, 590], [A.river, 590], [A.north + .2, 360]]), fx = T.keys(t, [[A.deep - .3, 600], [A.river, 600], [A.north + .2, 640]]);
    shape(ctx, '#e8dcc0', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, z, fx, fy);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#6ab8d8'], [1, '#4aa0c8']]), 0, rect(-400, -400, 2100, 1600));
    for (let i = 0; i < 40; i++) { const x = ((i * 113 + t * 8) % 1500) - 100, y = (i * 61) % 760; line(ctx, [[x, y], [x + 16, y]], 2, 'rgba(255,255,255,.35)'); }
    for (const pg of [WEST, EAST, LI, SI]) shape(ctx, '#d8d0a8', 3.5, poly(pg)); shape(ctx, '#d8d0a8', 2.5, poly(MAN.map(PP)));
    ctx.save(); ctx.globalAlpha = .45; for (const pg of [WEST, EAST]) { ctx.save(); ctx.beginPath(); poly(pg)(ctx); ctx.clip(); for (let i = 0; i < 50; i++) shape(ctx, '#8ab870', 0, circle((i * 137) % 1280, (i * 71) % 720, 18)); ctx.restore(); } ctx.restore();
    // the sheltered upper bay glows
    if (sh > -.2) { const [hx, hy] = PP([-74.04, 40.66]); glow(ctx, hx, hy, 40 + 8 * Math.sin(t * 3), 'rgba(255,240,140,.7)'); ctx.save(); ctx.setLineDash([4, 4]); ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.arc(hx, hy, 24, 0, 7); ctx.stroke(); ctx.restore(); }
    // the Hudson draws itself north to Albany, then an arrow into the continent
    const rk = rv > -.2 ? clamp((rv + .2) / 1.4) : 0, path = [[-74.03, 40.7], [-73.98, 40.85], [-73.93, 41.0], [-73.95, 41.3], [-73.96, 41.6], [-73.93, 42.0], [-73.84, 42.3], [-73.75, 42.65]].map(PP);
    if (rk > 0) { ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = '#2f8ad0'; ctx.beginPath(); const n = path.length - 1, upto = rk * n; ctx.moveTo(...path[0]); for (let i = 1; i <= Math.floor(upto); i++) ctx.lineTo(...path[i]); if (upto < n) { const i = Math.floor(upto), f = upto - i; ctx.lineTo(lerp(path[i][0], path[i + 1][0], f), lerp(path[i][1], path[i + 1][1], f)); } ctx.stroke(); ctx.restore(); }
    if (rk >= 1) { const [ax, ay] = PP([-73.75, 42.65]); shape(ctx, RED, 3, circle(ax, ay, 7)); txt(ctx, 'ALBANY', ax + 50, ay, FX.FONT(700, 16)); }
    if (ct > 0) { const k = ease.out(clamp(ct / .9)), [ax, ay] = PP([-73.8, 42.65]); ctx.save(); ctx.setLineDash([16, 10]); line(ctx, [[ax, ay], [lerp(ax, 40, k), ay - 20 * k]], 8, '#c8322a'); ctx.restore(); if (k > .95) { shape(ctx, RED, 3, poly([[30, ay - 20], [56, ay - 40], [56, ay]])); txt(ctx, 'INTO THE CONTINENT', 200, ay - 50, FX.DISPLAY(24), RED); } }
    if (z < 1.6) { const [mx, my] = PP([-73.97, 40.78]); txt(ctx, 'MANHATTAN', mx + 70, my - 4, FX.FONT(700, 13), '#5a4a38'); txt(ctx, 'HUDSON RIVER', PP([-73.95, 41.4])[0] - 70, PP([-73.95, 41.4])[1], FX.FONT(700, 15), '#2f5a8a'); txt(ctx, 'ATLANTIC OCEAN', 900, 640, FX.FONT(700, 18), '#fff'); txt(ctx, 'LONG ISLAND', PP([-73.2, 40.78])[0], PP([-73.2, 40.78])[1], FX.FONT(700, 14), '#5a4a38'); }
    else { const [hx, hy] = PP([-74.04, 40.66]); txt(ctx, 'UPPER BAY', hx - 40, hy + 30, FX.FONT(800, 7), '#fff'); txt(ctx, 'THE NARROWS', PP([-74.04, 40.6])[0] + 20, PP([-74.04, 40.6])[1] + 4, FX.FONT(700, 6), '#fff'); }
    ctx.restore();
    // depth inset: a deep channel even a big ship can use
    if (dp > -.2 && z > 1.5) { const s = pop(dp + .2); ctx.save(); ctx.translate(1040, 180); ctx.scale(s, s); shape(ctx, PAPER, 4, rect(-170, -100, 340, 200, 8)); shape(ctx, '#4aa0c8', 3, c => { c.moveTo(-150, -40); c.lineTo(150, -40); c.lineTo(150, -20); c.quadraticCurveTo(60, 80, 0, 80); c.quadraticCurveTo(-60, 80, -150, -20); c.closePath(); });
      shape(ctx, '#5a3a20', 3, poly([[-60, -60], [60, -60], [40, -30], [-40, -30]])); line(ctx, [[0, -60], [0, -96]], 4); txt(ctx, 'DEEP', 100, 40, FX.DISPLAY(26), '#1f4a6a'); ctx.restore(); }
    if (sh > 0 && z > 1.5) strip(ctx, 'SHELTERED BY ISLANDS', 360, 92, sh, { px: 32 });
    if (nt > 0) strip(ctx, 'A RIVER RUNNING NORTH', 330, 640, nt, { px: 32, color: '#2f6a9a' });
    vig(ctx);
  }

  // ---------- b11: hold on to that harbor — the one character in this story who never leaves ----------
  function b11(ctx, lt, dur, t) {
    const ch = since(t, 'character'), nv = since(t, 'never');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#4aa8e8'], [1, '#ffe2a8']]), 0, rect(-200, -200, 1700, 900)); glow(ctx, 640, 420, 480, 'rgba(255,240,190,.55)'); clouds(ctx, t, [80, 140]);
    waterBand(ctx, 470, t, -600, 2200, '#3aa0c0');
    // the eras sail past behind the harbor: a canoe, a Dutch ship, a steamer, a ferry
    const boats = [[0, 'canoe'], [1, 'dutch'], [2, 'steam'], [3, 'ferry']];
    boats.forEach(([i, k]) => { const p = ((t * .07 + i * .25) % 1), x = lerp(1450, -170, p), y = 470; ctx.save(); ctx.translate(x, y);
      if (k === 'canoe') { shape(ctx, '#6a4a2a', 3, c => { c.moveTo(-60, -6); c.quadraticCurveTo(0, 12, 60, -6); c.lineTo(52, 4); c.quadraticCurveTo(0, 16, -52, 4); c.closePath(); }); }
      if (k === 'dutch') { shape(ctx, '#7a4a2a', 3.5, poly([[-80, -20], [80, -20], [64, 8], [-64, 8]])); line(ctx, [[0, -20], [0, -130]], 5, '#5a3a20'); shape(ctx, '#f4efe2', 3, poly([[4, -126], [60, -110], [60, -40], [4, -30]])); shape(ctx, '#f2a03a', 0, rect(-4, -140, 22, 10)); }
      if (k === 'steam') { shape(ctx, '#2a2a30', 3.5, poly([[-100, -24], [100, -24], [84, 8], [-84, 8]])); shape(ctx, '#f4efe2', 3, rect(-60, -54, 110, 30)); shape(ctx, '#c8322a', 3, rect(-10, -90, 22, 36)); for (let j = 0; j < 3; j++) { const q = (t * .5 + j / 3) % 1; ctx.save(); ctx.globalAlpha = .4 * (1 - q); shape(ctx, '#8a8a90', 0, circle(0 - q * 40, -100 - q * 60, 12 + q * 14)); ctx.restore(); } }
      if (k === 'ferry') { shape(ctx, '#f2a03a', 3.5, poly([[-90, -22], [90, -22], [80, 8], [-80, 8]])); shape(ctx, '#f4efe2', 3, rect(-70, -52, 140, 30, 4)); for (let j = 0; j < 6; j++) shape(ctx, '#9ac8e0', 0, rect(-62 + j * 22, -46, 14, 14)); }
      ctx.restore(); });
    harbor(ctx, 640, 720, 600, t, { look: [Math.sin(t * .8) * .6, -.3], eyes: blink(t, 55.0, 57.6), mouth: 'smile' });
    ctx.restore();
    if (since(t, 'hold') > -.2) strip(ctx, 'HOLD ON TO THAT HARBOR', 640, 92, since(t, 'hold') + .2, { px: 38 });
    if (ch > 0) strip(ctx, 'THE ONE CHARACTER WHO NEVER LEAVES', 640, 196, ch, { px: 32, color: '#2f6a9a', rot: .02 });
    vig(ctx);
  }

  const cut = [[0, b1], [3.9, b2], [9.5, b3], [13.8, b4], [19.9, b5], [28.6, b6], [35.6, b7], [40.0, b8], [44.3, b9], [50.0, b10], [54.2, b11]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: .45, type: 'paper', gain: .4 }, { t: A.lenape - .2, type: 'paper', gain: .4 }, { t: A.manna, type: 'swell', gain: .4 }, { t: A.manna + 1.2, type: 'whoosh', gain: .4 },
    { t: A.hills, type: 'ratchet', gain: .4 }, { t: A.argue, type: 'click', gain: .4 }, { t: A.sanderson - .2, type: 'paper', gain: .4 }, { t: A.ten, type: 'thud', gain: .5 }, { t: A.rebuilding, type: 'ratchet', gain: .3 },
    { t: A.british - .4, type: 'paper', gain: .5 }, { t: A.reconstruction, type: 'whoosh', gain: .4 }, { t: A.streams, type: 'bubbles', gain: .4 }, { t: A.ponds, type: 'click', gain: .4 },
    { t: A.forest - .6, type: 'whoosh', gain: .6 }, { t: A.model, type: 'click', gain: .5 }, { t: A.photograph, type: 'thud', gain: .5 }, { t: A.south, type: 'whoosh', gain: .4 }, { t: A.reason, type: 'splash', gain: .4 },
    { t: A.deep, type: 'swell', gain: .3 }, { t: A.river, type: 'bubbles', gain: .3 }, { t: A.continent, type: 'whoosh', gain: .5 }, { t: A.character, type: 'thud', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.walk - .3, mood: 'under' }, { t: A.turn - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-worldbefore.mp3', shots, sfx, moods, images: { bhq: 'assets/img/british-hq-map-1782.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
