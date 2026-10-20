/* The Maya — Beat 9 "Legacy & close" (narration-legacy.mp3 = 1.8 s chapter pause + narration-full.mp3 1184.0–1310.7 s + 3.2 s tail for the end card).
 * Anchors = full-recording word times − 1182.2. Warmth returns: 6,000,000 speakers, the stones talk again, the 13.0.0.0.0 odometer, a rewind recap, the vendor at dawn, end card. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { here: 1184.29, stops: 1185.03, today: 1186.04, six: 1187.02, speak: 1188.42, roughly: 1190.01, kiche: 1192.41, peninsula: 1195.52, bought: 1196.41, some1: 1197.74, thriving: 1198.24, taught: 1199.11, radio: 1200.78, some2: 1201.88, thread: 1203.19, itza: 1204.44, language: 1205.23, island: 1206.36, spoken: 1207.46, elders: 1209.68, and1: 1211.05, stones: 1211.66, talking: 1212.46, thanks: 1213.94, knorozov: 1214.26, prosk: 1215.15, scholars: 1216.28, specialists: 1217.66, most: 1219.0, kings1: 1221.53, names: 1222.59, eighteen: 1224.28, fire: 1225.73, pakal: 1227.59, so: 1229.14, night: 1230.4, calendar: 1232.15, never: 1233.05, ran: 1233.58, long: 1234.81, odometer: 1236.01, on: 1237.61, rolled: 1239.85, thirteen: 1240.67, z1: 1241.7, z2: 1242.41, z3: 1243.12, z4: 1243.82, same: 1244.63, mythological: 1245.9, current: 1247.13, and2: 1248.35, kept: 1249.67, out: 1250.78, thousands: 1251.09, only: 1253.23, two: 1253.48, neither: 1256.3, world1: 1257.8, maya2: 1258.84, predict: 1259.7, rest: 1261.54, predicted: 1262.74, maya3: 1263.59, over: 1264.62, over2: 1265.51, first: 1266.81, three: 1268.69, everybody: 1271.08, kings2: 1272.25, later: 1273.03, kings3: 1274.11, carved: 1274.6, rain: 1276.76, when: 1277.55, stopped: 1278.1, fell1: 1279.37, empires: 1280.51, burned: 1282.6, books: 1283.05, empires2: 1283.87, too: 1284.88, farmers: 1286.02, stayed: 1286.64, woman: 1287.89, folding: 1288.46, speaking: 1289.49, older: 1290.52, closing: 1291.8, sun: 1293.12, didnt: 1294.85, kings4: 1296.53, fell2: 1297.06, people: 1298.09, still: 1298.88, here2: 1299.21, iff: 1300.95, subscribe: 1301.92, which: 1303.32, surprised: 1304.81, which2: 1306.19, skip: 1307.47, tell: 1308.16, comments: 1308.56, thanks2: 1309.47 };
  const A = {}; for (const k in F) A[k] = F[k] - 1182.2; A.end = 131.7;
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


  const M = G.Maya, { temple, palace, stelaSmall, king, mayaMap, site, MP, mix, castillo, plaza, vendor, table, crowdBand } = M;
  const SK = ['#a8704a', '#7a4a2a', '#c08a5a', '#8a5a34', '#b07848'], CL = ['#e8dcc0', '#d8c49a', '#f0e6cc', '#c8b088'];
  const villager = (ctx, x, y, s, t, v, o = {}) => N.walker(ctx, x, y, s, t, v, Object.assign({ plain: true, beads: v % 2 === 0, coat: CL[v % 4], pants: SK[v % 5], skin: SK[v % 5], hair: '#1d1a17', hs: [0, 1, 2, 4][v % 4], shoe: SK[v % 5] }, o));
  const imgFrame = (ctx, key, x, y, w, h, k, label) => { const im = T.IMG[key]; if (im) N.frame(ctx, im, x, y, w, h, k, label); };
  function nightWash(ctx, a) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(110,110,190,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function sil(ctx, x, y, s, col = '#2a2228') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 0, circle(0, -150, 22)); shape(ctx, col, 0, c => { c.moveTo(-26, -124); c.quadraticCurveTo(0, -132, 26, -124); c.lineTo(32, -40); c.lineTo(18, 0); c.lineTo(-18, 0); c.lineTo(-32, -40); c.closePath(); }); ctx.restore(); }
  function cloud(ctx, x, y, s, col = '#e8eef8') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, smooth([[-140, 30], [-150, -10], [-100, -50], [-40, -60], [10, -90], [80, -70], [130, -40], [150, 10], [120, 40], [0, 50]])); ctx.restore(); }
  function sun(ctx, x, y, r, a = 1) { ctx.save(); ctx.globalAlpha = a; glow(ctx, x, y, r * 3, 'rgba(255,220,120,.5)'); for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; line(ctx, [[x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3], [x + Math.cos(an) * r * 1.8, y + Math.sin(an) * r * 1.8]], 5, '#f6a828'); } shape(ctx, '#f6d23a', 4, circle(x, y, r)); ctx.restore(); }
  function rainfall(ctx, t, a, x0 = 0, x1 = W, y0 = 0, y1 = 620) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = Math.min(1, a); const n = Math.round(80 * a); for (let i = 0; i < n; i++) { const x = x0 + ((i * 53) % (x1 - x0)), y = y0 + ((t * 620 + i * 97) % (y1 - y0)); line(ctx, [[x, y], [x - 6, y + 22]], 3, 'rgba(80,140,220,.85)'); } ctx.restore(); }
  function basketOnHead(ctx, x, y, s, full = true) { ctx.save(); ctx.translate(x, y - 352 * s); ctx.scale(s, s);
    shape(ctx, '#b88a4a', 3.5, poly([[-40, 0], [40, 0], [30, -40], [-30, -40]])); for (let i = 0; i < 4; i++) line(ctx, [[-36 + i * 2, -10 * i], [36 - i * 2, -10 * i]], 2, '#8a6030');
    if (full) shape(ctx, '#7a5434', 3, c => { c.moveTo(-32, -38); c.quadraticCurveTo(0, -78, 32, -38); c.closePath(); }); ctx.restore(); }
  function hut(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#e8dcc0', 4, rect(-90, -110, 180, 110, 30)); shape(ctx, '#5a3a20', 3, rect(-24, -70, 48, 70, 14));
    shape(ctx, '#c8a050', 4, c => { c.moveTo(-120, -90); c.quadraticCurveTo(0, -250, 120, -90); c.quadraticCurveTo(0, -120, -120, -90); c.closePath(); }); for (let i = 0; i < 8; i++) line(ctx, [[-100 + i * 28, -96], [-60 + i * 16, -200]], 2.5, '#a88030'); ctx.restore(); }
  function corn(ctx, x, y, s, t, g = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sw = Math.sin(t * 1.2 + x) * 3, hgt = lerp(60, 300, g);
    line(ctx, [[0, 0], [sw, -hgt]], 16, INK); line(ctx, [[0, 0], [sw, -hgt]], 10, '#5a9a3a');
    for (let i = 0; i < 5; i++) { const yy = -30 - i * hgt / 6, d = i % 2 ? 1 : -1, len = lerp(30, 100, g); shape(ctx, '#6ab048', 3, c => { c.moveTo(sw * i / 5, yy); c.quadraticCurveTo(d * len * .6, yy - 34, d * len, yy + 10); c.quadraticCurveTo(d * len * .5, yy - 14, sw * i / 5, yy - 10); c.closePath(); }); }
    if (g > .7) { shape(ctx, '#f6c945', 3, ellipse(12 + sw, -hgt * .55, 9, 26, .3)); line(ctx, [[sw, -hgt], [sw - 14, -hgt - 34]], 3, '#c8a050'); line(ctx, [[sw, -hgt], [sw + 12, -hgt - 38]], 3, '#c8a050'); } ctx.restore(); }
  function caravel(ctx, x, y, s, t, ph = 0, tilt = 0) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4 + ph) * 4); ctx.rotate(tilt); ctx.scale(s, s); shape(ctx, '#7a4a2a', 4, c => { c.moveTo(-120, -10); c.lineTo(120, -20); c.lineTo(96, 30); c.lineTo(-96, 30); c.closePath(); }); shape(ctx, '#5a3420', 3, rect(-110, -40, 50, 30, 4));
    for (const [mx, h, w] of [[-30, 170, 70], [50, 140, 56]]) { line(ctx, [[mx, -10], [mx, -h]], 6, '#5a3a20'); shape(ctx, '#f4efe2', 3.5, c => { c.moveTo(mx - w, -h + 20); c.quadraticCurveTo(mx, -h + 10, mx + w, -h + 20); c.lineTo(mx + w - 8, -40); c.quadraticCurveTo(mx, -30, mx - w + 8, -40); c.closePath(); }); line(ctx, [[mx - 30, -h + 40], [mx + 30, -70]], 7, '#b82a2a'); line(ctx, [[mx + 30, -h + 40], [mx - 30, -70]], 7, '#b82a2a'); }
    ctx.restore(); }
  function bonfire(ctx, x, y, s, t, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); glow(ctx, 0, -60, 220, 'rgba(255,140,60,.55)'); for (let i = 0; i < 5; i++) { const f = Math.sin(t * 7 + i * 1.7) * 10; shape(ctx, i % 2 ? '#ff8a2a' : '#ffb43a', 0, c => { c.moveTo(-90 + i * 36, 0); c.quadraticCurveTo(-80 + i * 36 + f, -90 - (i % 3) * 30, -60 + i * 36 + f * .5, -160 - (i % 2) * 40); c.quadraticCurveTo(-40 + i * 36, -70, -30 + i * 36, 0); c.closePath(); }); } shape(ctx, '#3a2a1a', 3, rect(-110, -6, 220, 20, 4)); ctx.restore(); }
  // ◀◀ rewind badge for the recap run
  function rewind(ctx, t, label) { ctx.save(); ctx.translate(1120, 70); shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-112, -26, 236, 56, 8)); shape(ctx, '#1d1a17', 0, rect(-118, -32, 236, 56, 8));
    const on = Math.sin(t * 6) > -.3; if (on) for (const dx of [-96, -70]) shape(ctx, '#f6c945', 0, poly([[dx + 24, -16], [dx + 24, 16], [dx, 0]]));
    txt(ctx, label, 26, 0, FX.DISPLAY(22), '#fff'); ctx.restore(); }
  // a newspaper obituary card
  function obit(ctx, x, y, s, rot, sub, k, wrongK = 0) { if (k <= 0) return; const e = slam(k); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * e, s * e);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-196, -112, 400, 236)); shape(ctx, '#fbf6ea', 4, rect(-204, -120, 400, 236, 4)); ctx.lineWidth = 6; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-190, -106, 372, 208);
    txt(ctx, 'OBITUARY', -4, -74, FX.FONT(700, 16), '#5a5048'); txt(ctx, 'THE MAYA', -4, -32, FX.DISPLAY(44)); txt(ctx, 'ARE FINISHED.', -4, 12, FX.DISPLAY(36), RED); line(ctx, [[-140, 44], [132, 44]], 2.5, '#9a8a7a'); txt(ctx, sub, -4, 72, FX.FONT(800, 17), '#3a3028');
    if (wrongK > 0) { const w = slam(wrongK); ctx.save(); ctx.rotate(-.18); ctx.scale(w, w); ctx.globalAlpha = .92; ctx.lineWidth = 8; ctx.strokeStyle = GREEN; ctx.strokeRect(-110, -40, 220, 80); txt(ctx, 'WRONG', 0, 4, FX.DISPLAY(54), GREEN); ctx.restore(); }
    ctx.restore(); }
  const ENDS = ['#1 · PRECLASSIC, c. AD 150', '#2 · CLASSIC, c. AD 900', '#3 · NOJPETÉN, 1697', '#4 · CASTE WAR, 1901', 'BONUS · DEC 21, 2012'];

  // ---------- g1: here's where the count stops ----------
  function g1(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    for (let i = 0; i < 4; i++) obit(ctx, 260 + i * 150, 300 + (i % 2) * 120, .62, (i - 1.5) * .07, ENDS[i], lt + .3 - i * .12);
    ctx.restore();
    counter(ctx, 1050, 250, 'ENDINGS: 4', lt + .2, 'DECLARED', GOLD, 48);
    counter(ctx, 1050, 450, 'CAME TRUE: 0', lt - .3, null, '#8ad0a0', 40);
    if (since(t, 'stops') > -.2) FX.stamp(ctx, 'THE COUNT STOPS HERE', 640, 640, since(t, 'stops') + .2, { color: RED, size: 44 });
    vig(ctx);
  }

  // ---------- g2: ~6,000,000 people, ~30 languages — from K'iche' in the highlands to Yucatec where you bought your water ----------
  const LANGS = [['YUCATEC', [-89.0, 20.2]], ['CH’OL', [-92.1, 17.6]], ['TZELTAL', [-92.0, 16.95]], ['TZOTZIL', [-92.75, 16.6]], ['MAM', [-91.8, 15.2]], ['K’ICHE’', [-91.25, 14.95]], ['KAQCHIKEL', [-90.85, 14.55]], ["Q’EQCHI’", [-89.9, 15.7]]];
  const LOFF = [[80, -40], [-90, -50], [-120, -10], [-110, 40], [-130, 20], [-60, 64], [90, 64], [130, -30]];
  const MORE = [[-91.6, 16.2], [-90.9, 15.4], [-90.4, 15.1], [-91.4, 15.7], [-90.1, 16.3], [-89.6, 16.8], [-92.4, 15.6], [-91.0, 16.8], [-89.4, 15.2], [-90.6, 14.9], [-91.9, 16.0], [-92.6, 17.1], [-89.0, 16.0], [-88.9, 19.2], [-88.4, 20.4], [-89.6, 20.6], [-90.3, 17.4], [-88.8, 17.2], [-91.5, 17.2], [-90.0, 18.4], [-89.3, 17.9], [-91.2, 14.6]];
  function g2(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 380); mayaMap(ctx, t, { today: true });
    const mk = since(t, 'roughly'); for (let i = 0; i < MORE.length; i++) { const k = mk - i * .05; if (k <= 0) continue; const [x, y] = MP(MORE[i]); shape(ctx, '#f6a828', 2, circle(x, y, 7 * pop(k))); }
    for (let i = 0; i < LANGS.length; i++) { const [nm, ll] = LANGS[i], k = lt - .1 - i * .12; if (k <= 0) continue; const [x, y] = MP(ll);
      const hot = (i === 5 && since(t, 'kiche') > 0) || (i === 0 && since(t, 'peninsula') > 0);
      for (let j = 0; j < 7; j++) { const a = j * 2.1 + i, r = 14 + (j % 3) * 12; shape(ctx, '#e8423a', 2, circle(x + Math.cos(a) * r, y + Math.sin(a) * r * .7, 5 * pop(k - j * .04))); }
      if (hot) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = GOLD; ctx.beginPath(); ctx.arc(x, y, 50 + Math.sin(t * 5) * 4, 0, 7); ctx.stroke(); ctx.restore(); }
      const [ox, oy] = LOFF[i]; line(ctx, [[x, y], [x + ox * .8, y + oy * .8]], 2.5, 'rgba(60,40,30,.6)'); tag(ctx, nm, x + ox, y + oy, k, hot ? 24 : 18); }
    ctx.restore();
    const n = Math.round(6000000 * ease.out(clamp((t - A.six + .3) / 1.2)) / 1000) * 1000; counter(ctx, 1060, 110, n.toLocaleString('en-US'), lt + .1, 'SPEAK A MAYAN LANGUAGE', GOLD, 48);
    if (mk > 0) strip(ctx, '~30 DIFFERENT LANGUAGES', 300, 80, mk, { px: 34 });
    if (since(t, 'kiche') > 0) tag(ctx, 'GUATEMALAN HIGHLANDS', 380, 660, since(t, 'kiche'), 22);
    if (since(t, 'bought') > -.2) { const k = since(t, 'bought') + .2; tag(ctx, 'WHERE YOU BOUGHT YOUR WATER', 1000, 300, k, 22); const s = pop(k); ctx.save(); ctx.translate(1000, 370); ctx.scale(s, s); shape(ctx, 'rgba(170,220,250,.95)', 3.5, rect(-14, -38, 28, 70, 7)); shape(ctx, '#3a8ad8', 3, rect(-7, -52, 14, 14, 3)); shape(ctx, '#f4efe6', 0, rect(-13, -8, 26, 14)); ctx.restore(); }
    vig(ctx);
  }

  // ---------- g3: some are thriving (schools, radio); some hang by a thread ----------
  function panel(ctx, x, y, k, rot, l1, l2, c2, draw) { if (k <= 0) return; const s = pop(k, .4); ctx.save(); ctx.translate(x, lerp(y + 160, y, ease.out(clamp(k / .4)))); ctx.rotate(rot); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-262, -190, 540, 440)); shape(ctx, '#fbf6ea', 5, rect(-270, -200, 540, 440, 6));
    ctx.save(); ctx.beginPath(); ctx.rect(-245, -175, 490, 300); ctx.clip(); draw(); ctx.restore(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(-245, -175, 490, 300);
    txt(ctx, l1, 0, 162, FX.DISPLAY(32)); if (l2) txt(ctx, l2, 0, 204, FX.DISPLAY(22), c2); ctx.restore(); }
  function classroom(ctx, t) {
    shape(ctx, '#f0dcb0', 0, rect(-245, -175, 490, 300)); shape(ctx, '#c89a6a', 0, rect(-245, 60, 490, 70));
    shape(ctx, '#2f5a3a', 5, rect(-200, -150, 270, 140, 6)); txt(ctx, "BIX A BEEL?", -65, -100, FX.DISPLAY(30), '#f4f0e0'); txt(ctx, '(HOW ARE YOU?)', -65, -58, FX.FONT(800, 15), '#cfe0c8');
    villager(ctx, -160, 120, .42, t, 1, { still: true, reach: true, coat: '#3a6ab8' });
    for (let i = 0; i < 4; i++) { const x = -60 + i * 70; shape(ctx, '#a87a4a', 3, rect(x - 28, 84, 56, 14, 3)); villager(ctx, x, 130, .3, t, i + 2, { still: true, reach: i % 2 === 0 }); }
    // the radio
    shape(ctx, '#c8322a', 4, rect(130, -120, 90, 60, 10)); shape(ctx, '#3a2a2a', 0, circle(158, -90, 16)); line(ctx, [[196, -110], [196, -70]], 4, '#f4efe6'); line(ctx, [[150, -120], [190, -160]], 3);
    for (let i = 0; i < 3; i++) { const r = 20 + ((t * 40 + i * 18) % 54); ctx.save(); ctx.globalAlpha = 1 - r / 74; ctx.lineWidth = 4; ctx.strokeStyle = '#c8322a'; ctx.beginPath(); ctx.arc(176, -90, r + 40, -1.1, -.3); ctx.stroke(); ctx.restore(); } }
  function thread(ctx, t, k) {
    shape(ctx, grad(ctx, 0, -175, 0, 125, [[0, '#4a4058'], [1, '#2a2434']]), 0, rect(-245, -175, 490, 300));
    shape(ctx, '#8a8a94', 3, rect(-60, -175, 120, 22, 4)); const sw = Math.sin(t * 1.6) * .06;
    ctx.save(); ctx.translate(0, -153); ctx.rotate(sw);
    line(ctx, [[0, 0], [0, 120]], 3, '#e8dcc0'); line(ctx, [[-2, 120], [3, 128]], 1.5, '#e8dcc0'); line(ctx, [[2, 120], [-3, 130]], 1.5, '#e8dcc0'); line(ctx, [[0, 128], [0, 196]], 2, '#e8dcc0');
    shape(ctx, '#d84a8a', 3.5, ellipse(0, 230, 46, 38)); for (let i = 0; i < 4; i++) line(ctx, [[-40, 212 + i * 10], [40, 216 + i * 10]], 2, '#a83a6a'); ctx.restore();
    if (k > 0) { ctx.save(); ctx.globalAlpha = .5 + .5 * Math.sin(t * 8); glow(ctx, 0, -28, 30, 'rgba(255,120,120,.6)'); ctx.restore(); } }
  function g3(ctx, lt, dur, t) {
    deskBg(ctx, t);
    panel(ctx, 340, 340, lt + .1, -.03, 'THRIVING', since(t, 'radio') > 0 ? 'TAUGHT IN SCHOOLS · ON THE RADIO' : since(t, 'taught') > 0 ? 'TAUGHT IN SCHOOLS' : '', GREEN, () => classroom(ctx, t));
    panel(ctx, 950, 360, since(t, 'some2') + .1, .03, 'HANGING BY A THREAD', 'FEWER SPEAKERS EVERY YEAR', RED, () => thread(ctx, t, since(t, 'thread')));
    sparkle(ctx, 160, 140, (lt - .3) / .8, 1);
    vig(ctx);
  }

  // ---------- g4: Itza', the language of the last island kingdom — a small number of elders ----------
  function g4(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.07), 640, 420);
    M.sky(ctx, t, 1.6, 400); M.jungle(ctx, 360, 1.7, t); shape(ctx, '#4aa6c8', 0, rect(-600, 400, 2600, 400));
    for (let i = 0; i < 10; i++) line(ctx, [[((i * 150 + t * 15) % 1500) - 100, 430 + (i % 4) * 30], [((i * 150 + t * 15) % 1500) - 50, 430 + (i % 4) * 30]], 3, 'rgba(255,255,255,.4)');
    shape(ctx, '#7aa858', 4, ellipse(900, 450, 230, 40)); const HC = ['#e8423a', '#f6c945', '#3a8ad8', '#f4efe6', '#2fa06a', '#d84a8a']; for (let i = 0; i < 9; i++) { const x = 720 + i * 42, h = 26 + (i % 3) * 10; shape(ctx, HC[i % 6], 2.5, rect(x - 16, 440 - h, 32, h)); shape(ctx, '#b8542a', 2, poly([[x - 20, 440 - h], [x + 20, 440 - h], [x, 424 - h]])); }
    shape(ctx, '#e8dcc0', 3, rect(886, 340, 24, 70)); shape(ctx, '#c8322a', 2.5, poly([[880, 340], [916, 340], [898, 318]]));
    shape(ctx, '#8ab060', 4, c => { c.moveTo(-600, 560); c.quadraticCurveTo(300, 520, 1900, 580); c.lineTo(1900, 900); c.lineTo(-600, 900); c.closePath(); });
    hut(ctx, 230, 600, 1.0);
    // the elders, and a child listening in
    for (const [x, v, h] of [[500, 3, '#d8d4cc'], [640, 1, '#c8c4bc']]) { villager(ctx, x, 760, .82, t, v, { still: true, hair: h, reach: v === 3 }); line(ctx, [[x + 46, 640], [x + 54, 760]], 6, '#6a4a2a'); }
    villager(ctx, 790, 770, .5, t, 4, { still: true });
    ctx.restore();
    if (since(t, 'spoken') > -.4) { const k = since(t, 'spoken') + .4; ctx.save(); const s = pop(k); ctx.translate(560, 330); ctx.scale(s, s); shape(ctx, '#fff', 4, c => { c.roundRect(-110, -44, 220, 76, 30); c.moveTo(-20, 30); c.lineTo(-40, 74); c.lineTo(10, 30); }); for (let i = 0; i < 3; i++) shape(ctx, INK, 0, circle(-40 + i * 40, -6, 9 * (.6 + .4 * Math.abs(Math.sin(t * 4 + i))))); ctx.restore(); }
    strip(ctx, "ITZA'", 640, 80, lt + .1, { px: 52, color: '#2f4a8a' });
    tag(ctx, 'THE LANGUAGE OF THE LAST ISLAND KINGDOM', 640, 168, since(t, 'language'), 24);
    if (since(t, 'elders') > -.8) { ctx.save(); ctx.fillStyle = 'rgba(20,16,30,.6)'; ctx.fillRect(0, 640, W, 80); ctx.restore(); txt(ctx, 'SPOKEN TODAY BY ONLY A SMALL NUMBER OF ELDERS', 640, 680, FX.DISPLAY(30), GOLD); }
    FX.dateTag(ctx, 'LAKE PETÉN ITZÁ · TODAY'); vig(ctx);
  }

  // ---------- g5: and the stones are talking again ----------
  function barDot(ctx, n, x, y, s, col = '#3a2e24') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (n === 0) { shape(ctx, '#e8dcc0', 3, c => { c.ellipse(0, 0, 30, 18, 0, 0, Math.PI * 2); }); for (const dx of [-14, 0, 14]) line(ctx, [[dx, -12], [dx * .6, 10]], 2.5, col); line(ctx, [[-26, 4], [26, 4]], 2.5, col); }
    else { const bars = Math.floor(n / 5), dots = n % 5; for (let b = 0; b < bars; b++) shape(ctx, col, 0, rect(-34, 10 - b * 16, 68, 10, 4)); for (let d = 0; d < dots; d++) shape(ctx, col, 0, circle((d - (dots - 1) / 2) * 18, 10 - bars * 16 - 4, 6)); } ctx.restore(); }
  function bigStela(ctx, x, y, s, lit) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const st = '#a4977c', face = '#bcae90', deep = '#6a5e4a';
    shape(ctx, 'rgba(0,0,0,.3)', 0, ellipse(0, 6, 210, 24));
    shape(ctx, st, 5, c => { c.moveTo(-170, 0); c.lineTo(-164, -470); c.quadraticCurveTo(-160, -600, 0, -620); c.quadraticCurveTo(160, -600, 164, -470); c.lineTo(170, 0); c.closePath(); });
    for (let i = 0; i < 40; i++) shape(ctx, 'rgba(70,60,45,.25)', 0, circle(-150 + (i * 61) % 300, -590 + (i * 137) % 580, 2 + (i % 3)));
    shape(ctx, face, 3, rect(-120, -548, 240, 70, 16)); shape(ctx, deep, 0, ellipse(0, -513, 50, 22)); for (const d of [-1, 1]) shape(ctx, deep, 0, circle(d * 78, -513, 12));
    for (let i = 0; i < 5; i++) { const yy = -420 + i * 82;
      for (const [bx, j] of [[-124, i * 2], [8, i * 2 + 1]]) { const on = clamp(lit * 10 - j); shape(ctx, mix(face, '#f8e6a8', on), 3, rect(bx, yy - 36, 116, 72, 16)); if (on > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx + 58, yy, 70, `rgba(255,200,90,${.35 * on})`); ctx.restore(); } }
      barDot(ctx, i === 0 ? 13 : 0, -66, yy + 2, i === 0 ? .95 : 1.05, '#3a2e24');
      shape(ctx, deep, 2.5, smooth([[28, yy - 20], [66, yy - 28], [102, yy - 8], [96, yy + 22], [52, yy + 26], [26, yy + 6]])); shape(ctx, face, 0, circle(64, yy - 4, 9)); line(ctx, [[40, yy + 12], [88, yy + 12]], 3, face); }
    ctx.restore(); }
  function g5(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 360);
    M.sky(ctx, t, 1.95, 560); M.jungle(ctx, 520, 1.95, t); shape(ctx, '#7aa858', 0, rect(-600, 560, 2600, 400));
    bigStela(ctx, 460, 720, .95, clamp((lt - .2) / 2.2));
    ctx.restore();
    const SAY = [['"HE SAT IN KINGSHIP…"', 920, 200], ['"…ON THIS DAY…"', 1000, 330], ['"…HIS NAME WAS…"', 920, 460]];
    for (let i = 0; i < 3; i++) { const k = since(t, 'stones') + .2 - i * .55; if (k <= 0) continue; const s = pop(k); const [s1, x, y] = SAY[i]; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = FX.DISPLAY(26); const w = ctx.measureText(s1).width + 48; shape(ctx, 'rgba(0,0,0,.2)', 0, rect(-w / 2 + 6, -30, w, 66, 26)); shape(ctx, '#fff', 4, c => { c.roundRect(-w / 2, -36, w, 66, 26); c.moveTo(-w / 2 + 10, 0); c.lineTo(-w / 2 - 40, 20); c.lineTo(-w / 2 + 12, 20); }); txt(ctx, s1, 0, -3, FX.DISPLAY(26)); ctx.restore(); }
    strip(ctx, 'THE STONES ARE TALKING AGAIN', 640, 640, since(t, 'talking') + .2, { px: 40, color: '#2f7a46' });
    vig(ctx);
  }

  // ---------- g6: thanks to Knorozov, Proskouriakoff and the scholars who followed — most inscriptions can now be read ----------
  function cat(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const tl = Math.sin(t * 2) * .3;
    line(ctx, [[30, -10], [56, -30 + tl * 20], [60, -60]], 7, '#5a4030'); shape(ctx, '#efe2c8', 3.5, ellipse(0, -18, 40, 22)); shape(ctx, '#efe2c8', 3.5, circle(-34, -46, 20));
    for (const d of [-1, 1]) shape(ctx, '#5a4030', 3, poly([[-34 + d * 8, -60], [-34 + d * 18, -76], [-34 + d * 18, -56]])); shape(ctx, '#7a5a40', 0, ellipse(-34, -40, 11, 8)); for (const d of [-1, 1]) shape(ctx, '#4a8ad8', 0, circle(-34 + d * 8, -50, 3.5)); ctx.restore(); }
  function portrait(ctx, x, y, k, rot, name, sub, draw) { if (k <= 0) return; const s = pop(k, .4); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-142, -172, 300, 380)); shape(ctx, '#fbf6ea', 4, rect(-150, -180, 300, 380, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(-128, -158, 256, 260); ctx.clip(); draw(); ctx.restore(); ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.strokeRect(-128, -158, 256, 260);
    txt(ctx, name, 0, 134, FX.DISPLAY(26)); txt(ctx, sub, 0, 168, FX.FONT(800, 15), '#6a5a4a'); ctx.restore(); }
  function g6(ctx, lt, dur, t) {
    deskBg(ctx, t);
    portrait(ctx, 230, 300, since(t, 'knorozov') + .3, -.04, 'YURI KNOROZOV', 'THE SOUNDS OF THE GLYPHS', () => { shape(ctx, '#c8d8e8', 0, rect(-128, -158, 256, 260)); N.walker(ctx, 0, 200, .62, t, 3, { plain: true, still: true, coat: '#5a5a62', pants: '#4a4a52', skin: '#f0c8a0', hair: '#4a3a30', hs: 1, shoe: '#2a2a2a' }); cat(ctx, 70, 96, .9, t); });
    portrait(ctx, 560, 300, since(t, 'prosk') + .2, .03, 'TATIANA PROSKOURIAKOFF', 'THE LIVES OF THE KINGS', () => { shape(ctx, '#e8d8c0', 0, rect(-128, -158, 256, 260)); N.walker(ctx, 0, 200, .62, t, 7, { plain: true, still: true, coat: '#7a4a6a', pants: '#5a3a4a', skin: '#f4d0b0', hair: '#3a2a20', hs: 2, shoe: '#2a2a2a' }); for (const d of [-1, 1]) shape(ctx, null, 3, circle(d * 12, -18, 9)); });
    // the scholars who followed
    if (since(t, 'scholars') > -.2) { const k = since(t, 'scholars') + .2; tag(ctx, '…AND THE SCHOLARS WHO FOLLOWED', 990, 150, k, 22); for (let i = 0; i < 12; i++) { const kk = k - i * .06; if (kk <= 0) continue; const s = pop(kk), x = 850 + (i % 4) * 92, y = 250 + Math.floor(i / 4) * 92; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#fbf6ea', 3, rect(-38, -38, 76, 76, 6)); shape(ctx, SK[(i + 2) % 5], 3, circle(0, -4, 18)); shape(ctx, ['#1d1a17', '#6a4a2a', '#c8c4bc', '#3a2a20'][i % 4], 0, c => { c.arc(0, -8, 19, Math.PI, 0); }); shape(ctx, ['#3a6ab8', '#c8322a', '#2f7a46', '#e8a83a'][i % 4], 2.5, rect(-22, 16, 44, 18, 6)); ctx.restore(); } }
    // most surviving inscriptions can now be read
    if (since(t, 'specialists') > 0) { const k = since(t, 'specialists'), f = .85 * ease.inOut(clamp((t - A.most + .4) / 1.4)); ctx.save(); ctx.translate(640, 630); const s = pop(k); ctx.scale(s, s);
      shape(ctx, '#1d1a17', 0, rect(-430, -50, 860, 110, 12)); txt(ctx, 'SURVIVING INSCRIPTIONS WE CAN READ', 0, -24, FX.DISPLAY(22), '#fff');
      shape(ctx, '#3a3438', 0, rect(-400, 0, 800, 34, 8)); shape(ctx, GREEN, 0, rect(-400, 0, 800 * f, 34, 8)); if (f > .5) txt(ctx, 'MOST', -400 + 800 * f - 50, 18, FX.DISPLAY(22), '#fff'); ctx.restore(); }
    vig(ctx);
  }

  // ---------- g7: the kings have their names back — 18 Rabbit, Fire Is Born, Pakal ----------
  function g7(ctx, lt, dur, t) {
    shape(ctx, '#c8b48c', 0, rect(0, 0, W, H)); for (let r = 0; r < 12; r++) for (let c = 0; c < 10; c++) { const x = c * 140 + (r % 2) * 70 - 70, y = r * 64; shape(ctx, (r * 7 + c * 3) % 5 ? '#d2be96' : '#bca882', 2.5, rect(x + 4, y + 4, 132, 56, 6)); }
    glow(ctx, 640, 300, 600, 'rgba(255,240,200,.35)');
    const nm = (key, s) => since(t, key) > -.15 ? s : 'NAME: ???';
    imgFrame(ctx, 'stelaH', 250, 330, 170, 340, lt + .1, nm('eighteen', '18 RABBIT · COPÁN'));
    { const k = lt - .1, e = FX.settle(clamp(k / .5)); ctx.save(); ctx.translate(640, 330); ctx.scale(e, e); ctx.rotate(.015);
      shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-120, -178, 264, 384)); shape(ctx, '#8a5a2a', 5, rect(-132, -190, 264, 380, 4)); shape(ctx, '#c89a5a', 3, rect(-124, -182, 248, 364));
      ctx.save(); ctx.beginPath(); ctx.rect(-118, -176, 236, 352); ctx.clip(); shape(ctx, grad(ctx, 0, -176, 0, 176, [[0, '#f6c870'], [1, '#e8885a']]), 0, rect(-118, -176, 236, 352)); temple(ctx, 60, 150, .3, { col: '#e0d4b8', paint: true }); king(ctx, -20, 172, .62, t, { cape: '#2a3a6a', plume: '#3a8a5a', coat: '#e8dcc0', staff: true }); ctx.restore();
      shape(ctx, PAPER, 3, rect(-190, 212, 380, 34, 3)); txt(ctx, nm('fire', 'FIRE IS BORN · TIKAL, 378'), 0, 230, FX.FONT(700, 15)); ctx.restore(); }
    imgFrame(ctx, 'pakal', 1040, 300, 300, 216, lt - .3, nm('pakal', 'PAKAL · PALENQUE'));
    for (const [x, y, key] of [[250, 520, 'eighteen'], [640, 545, 'fire'], [1040, 430, 'pakal']]) if (since(t, key) > -.15 && since(t, key) < .5) glow(ctx, x, y, 60, 'rgba(255,230,140,.6)');
    strip(ctx, 'THE KINGS HAVE THEIR NAMES BACK', 640, 70, since(t, 'names') + .2, { px: 40 });
    for (const [x, k] of [[250, 'eighteen'], [640, 'fire'], [1040, 'pakal']]) sparkle(ctx, x + 90, 170, (since(t, k) + .1) / .8, 1);
    vig(ctx);
  }

  // ---------- g8: so let's go back to that night in 2012 — the calendar never "ran out" ----------
  function g8(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.05, 1.0), 640, 360); plaza(ctx, t, { tod: 0, doorGlow: true }); ctx.restore();
    for (let i = 0; i < 9; i++) sil(ctx, 80 + i * 140, 790, 1.15 + (i % 2) * .15, '#1a1622');
    nightWash(ctx, .45);
    FX.dateTag(ctx, 'DEC 20, 2012 · CHICHÉN ITZÁ');
    const ck = since(t, 'calendar') + .2; if (ck > 0) { tag(ctx, 'RUNS OUT TONIGHT?', 640, 160, ck, 34); const xk = clamp(since(t, 'never') / .35); if (xk > 0) line(ctx, [[460, 160], [lerp(460, 820, xk), 156]], 9, RED); }
    if (since(t, 'ran') > -.1) strip(ctx, 'IT NEVER "RAN OUT."', 640, 290, since(t, 'ran') + .1, { px: 52, color: GREEN });
    vig(ctx);
  }

  // ---------- g9 / g11: the Long Count as a car odometer ----------
  const UNITS = ["BAK'TUN", "K'ATUN", 'TUN', 'WINAL', "K'IN"];
  function odometer(ctx, t, from, to, rollAt, hl, o = {}) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a2a3a'], [1, '#14141c']]), 0, rect(0, 0, W, H));
    // the windscreen: dawn over the jungle
    ctx.save(); ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(1300, 0); ctx.lineTo(1300, 230); ctx.quadraticCurveTo(640, 180, -20, 230); ctx.closePath(); ctx.clip();
    shape(ctx, grad(ctx, 0, 0, 0, 230, [[0, o.night ? '#1e2440' : '#7ab8e0'], [1, o.night ? '#4a3a5a' : '#f8d8a8']]), 0, rect(0, 0, W, 240)); M.jungle(ctx, 190, o.night ? .3 : 1.8, t); ctx.restore();
    shape(ctx, '#3a3440', 6, c => { c.moveTo(-20, 230); c.quadraticCurveTo(640, 180, 1300, 230); c.lineTo(1300, 760); c.lineTo(-20, 760); c.closePath(); });
    // gauges
    for (const [gx, lab] of [[210, 'KM/H'], [1070, 'RPM']]) { shape(ctx, '#1d1a22', 5, circle(gx, 430, 150)); for (let i = 0; i < 11; i++) { const a = Math.PI * (.8 + i * .14); line(ctx, [[gx + Math.cos(a) * 118, 430 + Math.sin(a) * 118], [gx + Math.cos(a) * 136, 430 + Math.sin(a) * 136]], i % 2 ? 3 : 6, '#e8e4dc'); }
      const a = Math.PI * (.85 + .15 * Math.sin(t * .7 + gx)); line(ctx, [[gx, 430], [gx + Math.cos(a) * 120, 430 + Math.sin(a) * 120]], 6, '#e8423a'); shape(ctx, '#5a5a62', 3, circle(gx, 430, 16)); txt(ctx, lab, gx, 500, FX.FONT(800, 18), '#a8a4b0'); }
    // the odometer window
    const ow = 120, x0 = 640 - (ow * 5 + 30 * 4) / 2;
    shape(ctx, '#0e0e12', 5, rect(x0 - 24, 330, ow * 5 + 30 * 4 + 48, 170, 14));
    for (let i = 0; i < 5; i++) { const x = x0 + i * (ow + 30), d = (4 - i) * .12, p = ease.inOut(clamp((t - rollAt - d) / .5)), a = from[i], b = to[i];
      ctx.save(); ctx.beginPath(); ctx.rect(x, 350, ow, 120); ctx.clip(); shape(ctx, '#f4efe2', 0, rect(x, 350, ow, 120));
      const hot = hl === i; if (hot) shape(ctx, '#fff2b0', 0, rect(x, 350, ow, 120));
      if (a === b) txt(ctx, String(a), x + ow / 2, 412, FX.DISPLAY(72), hot ? RED : INK);
      else { txt(ctx, String(a), x + ow / 2, 412 - p * 120, FX.DISPLAY(72), INK); txt(ctx, String(b), x + ow / 2, 412 + (1 - p) * 120, FX.DISPLAY(72), hot ? RED : INK); }
      shape(ctx, 'rgba(0,0,0,.18)', 0, rect(x, 350, ow, 22)); shape(ctx, 'rgba(0,0,0,.18)', 0, rect(x, 448, ow, 22)); ctx.restore();
      if (i < 4) shape(ctx, '#f4efe2', 0, circle(x + ow + 15, 440, 7));
      txt(ctx, UNITS[i], x + ow / 2, 486, FX.FONT(800, 16), hot ? GOLD : '#a8a4b0'); }
    // steering wheel rim
    ctx.save(); ctx.lineWidth = 46; ctx.strokeStyle = '#1d1a22'; ctx.beginPath(); ctx.arc(640, 1180, 560, Math.PI * 1.18, Math.PI * 1.82); ctx.stroke(); ctx.restore();
  }
  function g9(ctx, lt, dur, t) {
    const hl = t > A.z4 - .1 ? 4 : t > A.z3 - .1 ? 3 : t > A.z2 - .1 ? 2 : t > A.z1 - .1 ? 1 : t > A.thirteen - .1 ? 0 : -1;
    odometer(ctx, t, [12, 19, 19, 17, 19], [13, 0, 0, 0, 0], A.rolled, hl, { night: t < A.on });
    tag(ctx, 'THE LONG COUNT WORKS LIKE AN ODOMETER', 640, 120, since(t, 'odometer') + .1, 28);
    if (since(t, 'on') > 0) FX.dateTag(ctx, 'DEC 21, 2012'); else FX.dateTag(ctx, 'DEC 20, 2012');
    if (since(t, 'rolled') > .2) strip(ctx, '13.0.0.0.0', 640, 610, since(t, 'rolled') - .2, { px: 58, color: GOLD, fill: '#2a1e3a' });
    vig(ctx);
  }

  // ---------- g10: the same number it showed at the mythological start of the current era ----------
  function g10(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 380);
    shape(ctx, 'rgba(0,0,0,.25)', 0, rect(70, 210, 1150, 400)); shape(ctx, '#f6ecd0', 4, rect(60, 200, 1160, 400, 6));
    const L = [200, 470], R = [1080, 470], ak = clamp((t - A.current + .3) / 1.6);
    ctx.save(); ctx.setLineDash([14, 10]); ctx.lineWidth = 6; ctx.strokeStyle = '#8a6a4a'; ctx.beginPath(); ctx.moveTo(...L); ctx.quadraticCurveTo(640, 180, ...R); ctx.stroke(); ctx.restore();
    if (ak > 0) { ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = GOLD; ctx.beginPath(); for (let i = 0; i <= 40 * ak; i++) { const u = i / 40, x = (1 - u) * (1 - u) * L[0] + 2 * u * (1 - u) * 640 + u * u * R[0], y = (1 - u) * (1 - u) * L[1] + 2 * u * (1 - u) * 180 + u * u * R[1]; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
      const u = ak, x = (1 - u) * (1 - u) * L[0] + 2 * u * (1 - u) * 640 + u * u * R[0], y = (1 - u) * (1 - u) * L[1] + 2 * u * (1 - u) * 180 + u * u * R[1]; M.sideWalker(ctx, x, y, .3, t, 9, { dir: 1, coat: '#3a6ab8', pants: '#2a2a34', skin: '#e8b890', hair: '#5a3a20' }); }
    if (ak > .3) tag(ctx, '13 BAK’TUNS = ABOUT 5,125 YEARS', 640, 300, (ak - .3) * 3, 24);
    counter(ctx, R[0], R[1] + 40, '13.0.0.0.0', lt + .2, 'DEC 21, 2012', GOLD, 36);
    counter(ctx, L[0], L[1] + 40, '13.0.0.0.0', since(t, 'mythological') - .1, '3114 BC · MYTHOLOGICAL START', GOLD, 36);
    ctx.restore();
    strip(ctx, 'THE SAME NUMBER', 640, 90, lt + .1, { px: 44 });
    vig(ctx);
  }

  // ---------- g11: …and then it simply kept going. Nothing ended. ----------
  function g11(ctx, lt, dur, t) {
    const steps = 1 + Math.max(0, Math.floor((t - A.kept) / .7)), n = Math.min(steps, 4), cur = t < A.kept ? 0 : n, prev = Math.max(0, cur - 1), rollAt = t < A.kept ? 1e9 : A.kept + (cur - 1) * .7;
    odometer(ctx, t, [13, 0, 0, 0, prev], [13, 0, 0, 0, cur], rollAt, t > A.kept - .1 ? 4 : -1, {});
    FX.dateTag(ctx, `DEC ${21 + cur}, 2012`);
    tag(ctx, '13.0.0.0.0 → 13.0.0.0.1 → …', 640, 120, since(t, 'kept') + .1, 28);
    if (since(t, 'kept') > .3) strip(ctx, 'NOTHING ENDED.', 640, 610, since(t, 'kept') - .3, { px: 60, color: GREEN });
    vig(ctx);
  }

  // ---------- g12: thousands of inscriptions — only two known texts mention the date, neither describes the end of the world ----------
  const TWO = [37, 118];
  function glyphTile(ctx, x, y, s, i, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 2.5, rect(-24, -22, 48, 44, 12)); const r = (i * 37) % 5;
    shape(ctx, 'rgba(60,50,40,.55)', 0, smooth([[-14, -8 + r], [0, -14], [14, -6], [10, 10], [-8, 12]])); shape(ctx, col, 0, circle(-2 + r, -2, 4)); line(ctx, [[-12, 14], [12, 14]], 2, 'rgba(60,50,40,.5)'); ctx.restore(); }
  function g12(ctx, lt, dur, t) {
    shape(ctx, '#3a3236', 0, rect(0, 0, W, H)); glow(ctx, 640, 360, 640, 'rgba(255,220,170,.18)');
    const dim = clamp((t - A.only) / .5);
    for (let i = 0; i < 160; i++) { const k = since(t, 'thousands') + .6 - (i % 40) * .015 - Math.floor(i / 40) * .1; if (k <= 0) continue; const x = 92 + (i % 16) * 73, y = 210 + Math.floor(i / 16) * 46; const isTwo = TWO.includes(i);
      ctx.save(); ctx.globalAlpha = isTwo ? 1 : 1 - .75 * dim; glyphTile(ctx, x, y, .82 * pop(k), i, isTwo && dim > 0 ? '#f6d880' : '#c8b896'); ctx.restore(); }
    counter(ctx, 640, 110, 'THOUSANDS OF INSCRIPTIONS', lt + .1, null, '#f4ecd8', 34);
    if (dim > 0) { const LBL = ['TORTUGUERO · MONUMENT 6', 'LA CORONA · BLOCK V']; for (let j = 0; j < 2; j++) { const i = TWO[j], x = 92 + (i % 16) * 73, y = 210 + Math.floor(i / 16) * 46, tx = j ? 960 : 320, ty = 660;
      line(ctx, [[x, y + 20], [tx, ty - 30]], 3, 'rgba(246,216,128,.8)'); tag(ctx, LBL[j], tx, ty, since(t, 'two') + j * -.2, 22); } }
    if (since(t, 'only') > 0) strip(ctx, 'ONLY TWO KNOWN TEXTS MENTION THE DATE', 640, 110, since(t, 'only'), { px: 34, color: '#c8322a' });
    if (since(t, 'neither') > 0) strip(ctx, 'NEITHER ONE DESCRIBES THE END OF THE WORLD', 640, 420, since(t, 'neither'), { px: 36, color: GREEN, rot: .02 });
    vig(ctx);
  }

  // ---------- g13: the Maya didn't predict the end of the world; the world predicted the end of the Maya — over and over ----------
  function g13(ctx, lt, dur, t) {
    deskBg(ctx, t);
    const AT = [A.rest + .5, A.predicted, A.maya3, A.over, A.over2];
    for (let i = 0; i < 5; i++) obit(ctx, 190 + i * 225, 440 + (i % 2) * 70, .66, ((i * 37) % 7 - 3) * .03, ENDS[i], t - AT[i] + .1, t - A.over2 - .4 - i * .18);
    strip(ctx, "THE MAYA DIDN'T PREDICT THE END OF THE WORLD", 640, 80, lt + .1, { px: 32 });
    if (since(t, 'rest') > 0) strip(ctx, 'THE WORLD KEPT PREDICTING THE END OF THE MAYA', 640, 180, since(t, 'rest'), { px: 32, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- g14 (rewind): the first giant thing was built by everybody — the kings came later ----------
  function mound(ctx, h, x0 = -80, x1 = 1500, y = 600) { if (h <= 0) return; shape(ctx, '#9a7048', 4, poly([[x0, y], [x0 + h * 1.4, y - h], [x1 - h * 1.4, y - h], [x1, y]]));
    for (let i = 1; i < 8; i++) { const yy = y - h * i / 8; if (h * i / 8 < 4) continue; line(ctx, [[x0 + (y - yy) * 1.4 + 6, yy], [x1 - (y - yy) * 1.4 - 6, yy]], 2.5, i % 2 ? 'rgba(60,40,20,.35)' : 'rgba(200,160,110,.4)'); }
    shape(ctx, '#8ab060', 0, rect(x0 + h * 1.4, y - h - 6, x1 - x0 - h * 2.8, 8)); }
  function g14(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.06, 1.0), 640, 400);
    M.sky(ctx, t, 2, 480); M.jungle(ctx, 440, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 480, 2600, 600));
    mound(ctx, 120, -80, 1500, 600);
    for (let i = 0; i < 9; i++) { const dir = i % 2 ? -1 : 1, x = dir > 0 ? ((t * 70 + i * 190) % 1600) - 160 : 1440 - ((t * 70 + i * 190) % 1600), y = 700 + (i % 3) * 20;
      M.sideWalker(ctx, x, y, .55, t, i, { dir, coat: CL[i % 4], pants: SK[i % 5], skin: SK[i % 5], shoe: SK[i % 5], bun: i % 3 === 1 }); basketOnHead(ctx, x + dir * 2, y + 4, .55, dir > 0); }
    const kk = since(t, 'kings2'); if (kk > 0) { const e = pop(kk, .45); ctx.save(); ctx.translate(1040, 470); ctx.scale(e, e); king(ctx, 0, 0, .62, t, { cape: '#c8322a', staff: true }); ctx.restore(); sparkle(ctx, 1100, 170, kk / .8, 1.4); }
    ctx.restore();
    tag(ctx, '3,000 YEARS AGO', 300, 140, since(t, 'three'), 24);
    strip(ctx, 'BUILT BY EVERYBODY', 640, 240, since(t, 'everybody') + .1, { px: 50, color: GREEN });
    if (kk > 0) tag(ctx, 'THE KINGS CAME LATER', 1000, 160, since(t, 'later') + .1, 26);
    rewind(ctx, t, 'c. 1000 BC'); vig(ctx);
  }

  // ---------- g15: the kings carved their faces in stone and promised rain; the rain stopped; the kings fell ----------
  function g15(ctx, lt, dur, t) {
    const wet = 1 - clamp((t - A.stopped + .1) / .4), dry = clamp((t - A.stopped - .3) / .9), fall = ease.in(clamp((t - A.fell1 + .1) / .7));
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 400);
    M.sky(ctx, t, lerp(1.9, 2.1, dry), 520); if (wet > 0) { ctx.save(); ctx.globalAlpha = wet; shape(ctx, grad(ctx, 0, -300, 0, 520, [[0, '#6a7688'], [1, '#a8b0bc']]), 0, rect(-600, -400, 2600, 920)); ctx.restore(); }
    shape(ctx, mix(mix('#7aa858', '#5a8a48', wet), '#c8a868', dry), 0, rect(-600, 520, 2600, 600));
    if (dry > .3) for (let i = 0; i < 14; i++) line(ctx, [[100 + i * 80, 600 + (i % 3) * 40], [130 + i * 80, 620 + (i % 3) * 40], [116 + i * 80, 650 + (i % 3) * 40]], 3, `rgba(90,60,30,${dry})`);
    temple(ctx, 260, 540, .7, { col: '#e0d4b8', paint: true });
    for (const x of [520, 600]) stelaSmall(ctx, x, 600, 1.4, clamp((t - A.carved + .3) / .5));
    if (wet > 0) { ctx.save(); ctx.globalAlpha = wet; for (const [cx, cy, cs] of [[60, 90, .9], [330, 50, 1.0], [620, 110, .9], [900, 60, 1.0], [1180, 100, .9], [1450, 70, .8]]) cloud(ctx, cx, cy, cs, '#7a8698'); ctx.restore(); }
    if (dry > 0) sun(ctx, 1110, 130, 50, dry);
    ctx.save(); ctx.translate(880, 640); ctx.rotate(fall * 1.45); ctx.translate(-880, -640); king(ctx, 880, 640, .78, t, { cape: '#c8322a', reach: fall === 0 && dry < .5, staff: true }); ctx.restore();
    for (let i = 0; i < 5; i++) villager(ctx, 1000 + i * 60, 720 + (i % 2) * 12, .45, t, i, { still: true, flip: true });
    ctx.restore();
    if (wet > 0) { ctx.save(); ctx.globalAlpha = wet; for (let i = 0; i < 220; i++) { const x = (i * 59) % (W + 60) - 30, y = ((t * 720 + i * 97) % (H + 60)) - 30; line(ctx, [[x, y], [x - 7, y + 26]], 3, 'rgba(70,120,200,.8)'); } ctx.restore(); }
    tag(ctx, 'FACES IN STONE', 560, 360, since(t, 'carved'), 22);
    if (since(t, 'rain') > 0) tag(ctx, '"I BRING THE RAIN"', 880, 260, since(t, 'rain'), 24);
    if (since(t, 'fell1') > 0) strip(ctx, 'THE KINGS FELL', 640, 120, since(t, 'fell1'), { px: 50, color: RED });
    rewind(ctx, t, 'c. AD 900'); vig(ctx);
  }

  // ---------- g16: empires came from across the ocean and burned the books — and the empires fell too ----------
  function g16(ctx, lt, dur, t) {
    const sink = ease.in(clamp((t - A.empires2 - .2) / 1.4));
    M.sky(ctx, t, 1.4, 420); shape(ctx, '#3a8ac0', 0, rect(-600, 420, 2600, 400));
    for (let i = 0; i < 12; i++) line(ctx, [[((i * 130 + t * 20) % 1500) - 100, 450 + (i % 4) * 40], [((i * 130 + t * 20) % 1500) - 50, 450 + (i % 4) * 40]], 3, 'rgba(255,255,255,.4)');
    const sx = lerp(1450, 760, ease.out(clamp((lt + .2) / 1.8)));
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 520); ctx.clip(); caravel(ctx, sx, 500 + sink * 260, .95, t, 0, sink * .35); caravel(ctx, sx + 260, 470 + sink * 300, .6, t, 1, -sink * .3); ctx.restore();
    shape(ctx, '#d8c08a', 4, c => { c.moveTo(-20, 560); c.quadraticCurveTo(300, 520, 640, 580); c.lineTo(640, 760); c.lineTo(-20, 760); c.closePath(); });
    const bk = since(t, 'burned'); if (bk > -.3) { bonfire(ctx, 260, 660, .9, t, clamp((bk + .3) / .4)); for (let i = 0; i < 4; i++) { const p = clamp((bk - i * .2) / .8); if (p <= 0 || p >= 1) continue; ctx.save(); ctx.translate(lerp(500, 260, p), lerp(560, 640, p) - Math.sin(p * Math.PI) * 80); ctx.rotate(p * 4); shape(ctx, '#f0e4c8', 3, rect(-26, -18, 52, 36, 3)); line(ctx, [[0, -18], [0, 18]], 2); ctx.restore(); } }
    tag(ctx, 'EMPIRES FROM ACROSS THE OCEAN', 900, 150, lt + .1, 24);
    if (bk > 0) tag(ctx, 'THE BOOKS BURNED', 260, 400, bk, 24);
    if (since(t, 'too') > -.3) strip(ctx, 'THE EMPIRES FELL TOO', 900, 260, since(t, 'too') + .3, { px: 42, color: RED });
    rewind(ctx, t, '1562'); vig(ctx);
  }

  // ---------- g17: and the farmers stayed ----------
  function g17(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 460);
    M.sky(ctx, t, 1.9, 470); M.jungle(ctx, 430, 1.9, t); shape(ctx, '#8a6a3a', 0, rect(-600, 470, 2600, 600));
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) corn(ctx, 40 + i * 150 + (r % 2) * 70, 540 + r * 70, .55 + r * .12, t, clamp(lt / 1.2 + .4));
    for (const [x, v] of [[360, 2], [700, 0], [980, 3]]) { villager(ctx, x, 760, .8, t, v, { still: true, reach: true }); const sw = Math.sin(t * 3 + x) * .2; ctx.save(); ctx.translate(x + 50, 560); ctx.rotate(.5 + sw); line(ctx, [[0, 0], [0, 190]], 7, '#6a4a2a'); shape(ctx, '#8a8a90', 3, rect(-24, 186, 48, 18, 4)); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'AND THE FARMERS STAYED.', 640, 110, lt, { px: 50, color: GREEN });
    rewind(ctx, t, 'ALWAYS'); vig(ctx);
  }

  // ---------- g18: the woman at the folding table, closing up her cooler as the sun comes up ----------
  // early visitors who turn to look at her (and wave as she passes)
  const FOLK = [[120, 610, .52, 2, 1], [250, 640, .58, 5, 0], [372, 604, .5, 8, 1], [980, 606, .5, 3, 0], [1100, 636, .58, 7, 1], [1220, 608, .52, 10, 0]];
  function vendorScene(ctx, t, lid, sunK, vx = 760, walking = false) {
    ctx.save(); plaza(ctx, t, { tod: lerp(1.2, 1.7, sunK), crowd: false, torches: false });
    glow(ctx, 640, 470, 520, `rgba(255,200,120,${.35 * sunK})`); ctx.restore();
    for (const [x, y, sc, v, cup] of FOLK) { const near = Math.abs(vx - x) < 320; N.walker(ctx, x, y, sc, t, v, { still: true, cam: false, look: clamp((vx - x) / 50, -4, 4), reach: (walking && near) || (!walking && v % 5 === 0) }); }
    if (walking) M.vendorSide(ctx, vx, 760, 1.05, t, { dir: -1 }); else vendor(ctx, vx, 760, 1.05, t, { reach: lid < 1 && lid > 0 });
    table(ctx, 560, 760, 1.15, { bottles: 2 });
    // the cooler lid swings shut (drawn over the table's cooler)
    ctx.save(); ctx.translate(560, 760); ctx.scale(1.15, 1.15); ctx.translate(-134, -201); ctx.rotate(-1.3 * (1 - lid)); shape(ctx, '#f4efe6', 4, rect(0, -11, 138, 22, 8)); ctx.restore();
  }
  function g18(ctx, lt, dur, t) {
    const lid = ease.inOut(clamp((t - A.closing) / .9)), sk = clamp((t - A.closing + .6) / 2.4);
    const wk = clamp((lt - .1) / 1.8), vx = lerp(1420, 760, ease.out(wk)); ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.08), 680, 520); vendorScene(ctx, t, lid, sk, vx, wk < .97); ctx.restore();
    tag(ctx, 'THE WOMAN AT THE FOLDING TABLE', 640, 90, lt + .1, 26);
    if (since(t, 'older') > -.2) { ctx.save(); ctx.fillStyle = 'rgba(20,16,30,.55)'; ctx.fillRect(0, 150, W, 64); ctx.restore(); txt(ctx, 'SPEAKING A LANGUAGE OLDER THAN ENGLISH', 640, 184, FX.DISPLAY(32), GOLD); }
    if (since(t, 'didnt') > -.2) { ctx.save(); ctx.globalAlpha = clamp((since(t, 'didnt') + .2) / .6); ctx.fillStyle = 'rgba(20,16,30,.55)'; ctx.fillRect(0, 230, W, 56); ctx.restore(); ctx.save(); ctx.globalAlpha = clamp((since(t, 'didnt') + .2) / .6); txt(ctx, "…ON A WORLD THAT DIDN'T END.", 640, 260, FX.DISPLAY(28), '#fff'); ctx.restore(); }
    FX.dateTag(ctx, 'DEC 21, 2012 · DAWN'); vig(ctx);
  }

  // ---------- g19: the kings fell (rapid rewind into the dark) — the people are still here ----------
  const REW = [[g17, 'farmers'], [g16, 'too'], [g15, 'fell1'], [g14, 'everybody']];
  function g19(ctx, lt, dur, t) {
    const back = A.people - .25;
    if (t < back) { const n = REW.length, seg = (back - A.kings4 + .15) / (n + 1), i = Math.floor(lt / seg);
      if (i < n) { const [fn, key] = REW[i], ft = A[key] + .3 - (lt - i * seg) * 3; fn(ctx, ft - A[key] + 1, 3, ft);
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(150,140,200,.55)'; ctx.fillRect(0, 0, W, H); ctx.restore();
        for (let j = 0; j < 4; j++) { const y = ((t * 900 + j * 211) % (H + 40)) - 20; shape(ctx, 'rgba(255,255,255,.25)', 0, rect(0, y, W, 6)); } }
      const dk = clamp((lt - n * seg) / seg); ctx.save(); ctx.globalAlpha = Math.max(dk, i >= n ? 1 : 0); shape(ctx, '#0e0c12', 0, rect(0, 0, W, H)); ctx.restore();
      ctx.save(); ctx.globalAlpha = 1 - clamp(dk * 1.5); rewind(ctx, t * 2, '3,000 YEARS'); ctx.restore();
      if (since(t, 'fell2') > -.1) { ctx.save(); ctx.globalAlpha = clamp((since(t, 'fell2') + .1) / .3); txt(ctx, 'THE KINGS FELL.', 640, 360, FX.DISPLAY(56), '#f4ecd8'); ctx.restore(); }
      return; }
    const k = clamp((t - back) / .6);
    ctx.save(); T.cam(ctx, lerp(1.12, 1.04, ease.out(clamp((t - back) / 3))), 680, 520); vendorScene(ctx, t, 1, 1); ctx.restore();
    ctx.save(); ctx.globalAlpha = 1 - k; shape(ctx, '#0e0c12', 0, rect(0, 0, W, H)); ctx.restore();
    strip(ctx, 'THE PEOPLE ARE STILL HERE.', 640, 130, since(t, 'still') + .2, { px: 52, color: GREEN });
    vig(ctx);
  }

  // ---------- g20: end card — subscribe · which ending surprised you most? · which did your school skip? · thanks for watching ----------
  function g20(ctx, lt, dur, t) {
    T.blurred(ctx, 3, () => { ctx.save(); T.cam(ctx, 1.04, 680, 520); vendorScene(ctx, t, 1, 1); ctx.restore(); });
    shape(ctx, 'rgba(24,18,40,.45)', 0, rect(0, 0, W, H));
    strip(ctx, 'THE ENTIRE HISTORY OF THE MAYA', 640, 70, lt - .05, { px: 30, color: GOLD, fill: '#2a1e3a' });
    // subscribe button with a bell
    { const k = since(t, 'subscribe') + .2; if (k > 0) { const s = pop(k), pr = since(t, 'subscribe') > .5 && since(t, 'subscribe') < .7 ? .94 : 1; ctx.save(); ctx.translate(640, 200); ctx.scale(s * pr, s * pr); const on = since(t, 'subscribe') > .6;
      shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -38, 360, 84, 14)); shape(ctx, on ? '#5a5a62' : '#e8322a', 4, rect(-180, -42, 360, 84, 14)); txt(ctx, on ? 'SUBSCRIBED' : 'SUBSCRIBE', -20, 2, FX.DISPLAY(36), '#fff');
      ctx.save(); ctx.translate(140, 0); ctx.rotate(on ? Math.sin(t * 18) * .25 * Math.max(0, 1 - (since(t, 'subscribe') - .6)) : 0); shape(ctx, GOLD, 3, c => { c.moveTo(-16, 12); c.quadraticCurveTo(-16, -20, 0, -22); c.quadraticCurveTo(16, -20, 16, 12); c.closePath(); }); shape(ctx, GOLD, 2.5, circle(0, 18, 5)); ctx.restore(); ctx.restore(); } }
    // the five "endings", as small obituary cards
    for (let i = 0; i < 5; i++) obit(ctx, 160 + i * 240, 400, .5, ((i * 37) % 7 - 3) * .03, ENDS[i], since(t, 'which') + .1 - i * .12, since(t, 'surprised') - .1 - i * .1);
    if (since(t, 'which') > 0) tag(ctx, 'WHICH "ENDING" SURPRISED YOU MOST?', 640, 560, since(t, 'which'), 28);
    if (since(t, 'which2') > 0) tag(ctx, 'AND WHICH ONE DID YOUR SCHOOL SKIP?', 640, 620, since(t, 'which2'), 28);
    if (since(t, 'tell') > 0) { const k = pop(since(t, 'tell')); ctx.save(); ctx.translate(1110, 300); ctx.scale(k, k); shape(ctx, '#fff', 4, c => { c.roundRect(-110, -40, 220, 70, 24); c.moveTo(-30, 28); c.lineTo(-56, 60); c.lineTo(0, 28); }); txt(ctx, 'COMMENTS!', 0, -4, FX.DISPLAY(24)); ctx.restore(); }
    if (since(t, 'thanks2') > -.1) strip(ctx, 'THANKS FOR WATCHING', 640, 680, since(t, 'thanks2') + .1, { px: 40, color: '#fff', fill: '#2f7a46', rot: .015 });
    vig(ctx);
  }

  const cut = [[0, g1], [A.today - .15, g2], [A.some1 - .15, g3], [A.itza - .15, g4], [A.and1 - .15, g5], [A.thanks - .15, g6], [A.kings1 - .15, g7], [A.so - .15, g8], [A.long - .15, g9], [A.same - .15, g10], [A.and2 - .15, g11], [A.out - .15, g12], [A.maya2 - .15, g13],
    [A.first - .15, g14], [A.kings3 - .15, g15], [A.empires - .15, g16], [A.farmers - .15, g17], [A.woman - .15, g18], [A.kings4 - .15, g19], [A.iff - .2, g20]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .1, type: 'paper', gain: .4 }, { t: A.stops, type: 'thud', gain: .6 }, { t: A.six, type: 'swell', gain: .4 }, { t: A.roughly, type: 'click', gain: .3 }, { t: A.kiche, type: 'click', gain: .4 }, { t: A.bought, type: 'click', gain: .4 },
    { t: A.some1, type: 'paper', gain: .4 }, { t: A.some2, type: 'paper', gain: .4 }, { t: A.itza, type: 'whoosh', gain: .3 }, { t: A.stones, type: 'swell', gain: .4 }, { t: A.knorozov, type: 'paper', gain: .4 }, { t: A.prosk, type: 'paper', gain: .4 }, { t: A.scholars, type: 'click', gain: .3 }, { t: A.most, type: 'slide', gain: .3 },
    { t: A.eighteen, type: 'thud', gain: .4 }, { t: A.fire, type: 'thud', gain: .4 }, { t: A.pakal, type: 'thud', gain: .4 }, { t: A.never, type: 'scratch', gain: .4 }, { t: A.ran, type: 'thud', gain: .5 },
    { t: A.rolled, type: 'ratchet', gain: .5 }, { t: A.thirteen, type: 'click', gain: .4 }, { t: A.z1, type: 'click', gain: .3 }, { t: A.z2, type: 'click', gain: .3 }, { t: A.z3, type: 'click', gain: .3 }, { t: A.z4, type: 'click', gain: .3 },
    { t: A.mythological, type: 'thud', gain: .4 }, { t: A.current, type: 'whoosh', gain: .3 }, { t: A.kept, type: 'ratchet', gain: .4 }, { t: A.kept + .7, type: 'ratchet', gain: .3 }, { t: A.kept + 1.4, type: 'ratchet', gain: .3 },
    { t: A.thousands, type: 'rattle', gain: .3 }, { t: A.only, type: 'swell', gain: .3 }, { t: A.neither, type: 'thud', gain: .6 },
    { t: A.rest + .5, type: 'thud', gain: .4 }, { t: A.predicted, type: 'thud', gain: .4 }, { t: A.maya3, type: 'thud', gain: .4 }, { t: A.over, type: 'thud', gain: .4 }, { t: A.over2, type: 'thud', gain: .4 }, { t: A.over2 + .4, type: 'hit', gain: .4 },
    { t: A.first - .1, type: 'whoosh', gain: .4 }, { t: A.everybody, type: 'swell', gain: .3 }, { t: A.kings3 - .1, type: 'whoosh', gain: .3 }, { t: A.fell1, type: 'thud', gain: .6 }, { t: A.empires - .1, type: 'whoosh', gain: .3 }, { t: A.too, type: 'thud', gain: .5 }, { t: A.farmers - .1, type: 'whoosh', gain: .3 },
    { t: A.closing, type: 'slide', gain: .3 }, { t: A.closing + .9, type: 'click', gain: .4 }, { t: A.kings4, type: 'whoosh', gain: .5 }, { t: A.fell2, type: 'thud', gain: .5 }, { t: A.people - .2, type: 'swell', gain: .5 },
    { t: A.subscribe, type: 'click', gain: .5 }, { t: A.which, type: 'paper', gain: .3 }, { t: A.tell, type: 'click', gain: .4 }, { t: A.thanks2, type: 'swell', gain: .4 },
  ];
  // slow return of warmth → the 2012 night in mystery → still for the recap → a breath of silence on "the kings fell" → resolve
  const moods = [{ t: 0, mood: 'still' }, { t: A.so - .3, mood: 'mystery' }, { t: A.long - .3, mood: 'under' }, { t: A.maya2 - .3, mood: 'still' }, { t: A.kings4 - .2, mood: 'silence' }, { t: A.people - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-legacy.mp3', shots, sfx, moods,
    images: { stelaH: 'assets/img/copan-stela-h.jpg', pakal: 'assets/img/pakal-jade-mask.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
