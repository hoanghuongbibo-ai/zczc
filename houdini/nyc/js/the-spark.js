/* New York — Beat 3 "The spark" (narration-spark.mp3 = 1.8 s chapter pause + narration-full.mp3 118.25–268.4 s + 1 s tail).
 * Anchors = full-recording word times − 116.45. Tone shift (music out) for the wall's builders and the slave market:
 * silhouettes, no faces, no depiction of a sale; a slow push; plain captions. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', ORANGE = '#e8742a';
  const F = { because: 118.38, twenties: 119.53, company: 120.47, king: 122.09, church: 123.06, company2: 124.12, dutch: 125.46, wic: 125.83, beaver: 127.36, trading: 129.39, southern: 130.27, tip: 130.65,
    newam: 132.23, version: 134.44, school: 135.18, bought: 136.49, manhattan: 136.72, twentyfour: 137.41, beads: 138.7, actually: 140.4, exists: 140.87, one: 141.95, letter: 142.23,
    november: 143.43, y1626: 143.9, official: 145.58, schagen: 146.61, reports: 147.45, island: 149.5, value: 150.31, sixty: 150.9, guilders: 151.42, thatsall: 152.54, deed: 153.71,
    who: 155.87, handed: 157.27, nobeads: 158.86, tf2: 160.08, conversion: 161.78, eighteen: 163.22, updated: 165.25, modern: 166.58, thousand: 169.43, historians: 171.41, same: 173.68,
    dutch2: 175.04, buying: 175.84, good: 177.76, lenape: 178.81, share: 181.42, inference: 183.47, nobody: 184.46, side: 185.8, result: 188.06, generations: 189.62, pushed: 191.35,
    word: 193.64, town: 195.24, business: 196.43, fifties: 197.97, muddy: 199.22, port: 199.83, director: 200.74, stuyvesant: 201.69, wall: 203.0, across: 203.66, english: 205.11,
    wallup: 206.44, y1653: 207.25, labor: 209.31, enslaved: 210.29, company3: 212.06, since: 214.07, y1711: 216.02, market: 218.55, foot: 219.47, street: 220.47, middle: 221.59,
    onefive: 223.47, opening: 227.08, named: 227.78, wall2: 228.45, never: 230.31, job: 231.2, y1664: 232.19, four: 233.67, warships: 234.43, demand: 236.21, stuy2: 237.77, fight: 238.66,
    townspeople: 239.96, promising: 242.15, property: 243.75, trade: 244.65, religion: 245.7, changes: 247.51, shot: 248.71, renamed: 249.96, brother: 250.95, duke: 251.68, york: 252.06,
    notice: 253.36, switched: 255.56, work: 257.41, morning: 258.04, flag: 260.69, harbor: 262.79, kill: 265.65, test: 267.63 };
  const A = {}; for (const k in F) A[k] = F[k] - 116.45; A.end = 152.95;

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


  const harbor = N.harbor, walker = N.walker, corner = N.corner, dutchCorner = N.dutchCorner;
  const SKINL = ['#b07a52', '#a06a44', '#c08a5a', '#8a5a3a'];
  const lenape = (ctx, x, y, s, t, v, o = {}) => walker(ctx, x, y, s, t, v, Object.assign({ plain: true, coat: v % 2 ? '#b8865a' : '#a87648', pants: '#9a6a40', shoe: '#7a4a2a', skin: SKINL[v % 4], hair: '#1d1a17', hs: v % 3 === 0 ? 0 : 1, beads: v % 2 === 0 }, o));
  const dutchman = (ctx, x, y, s, t, v, o = {}) => walker(ctx, x, y, s, t, v, Object.assign({ plain: true, coat: ['#1d1a17', '#3a2a20', '#2f3a4a', '#5a3a2a'][v % 4], pants: '#2a2420', shoe: '#1d1a17', collar: true, tallhat: v % 2 === 0, hs: 0 }, o));
  const stuyvesant = (ctx, x, y, s, t, o = {}) => walker(ctx, x, y, s, t, 4, Object.assign({ plain: true, coat: '#6a6a78', pants: '#2a2420', shoe: '#1d1a17', collar: true, skullcap: true, hs: 5, sash: ORANGE, peg: true, sword: true, skin: '#f0c8a0' }, o));
  function sil(ctx, x, y, s, t, v, o = {}) { const C = '#3a3a4c'; walker(ctx, x, y, s, t, v, Object.assign({ plain: true, coat: C, pants: C, skin: C, hair: C, shoe: C, hs: 0 }, o)); shape(ctx, C, 0, circle(x, y - 302 * s, 38 * s)); }
  function frame(ctx, im, x, y, w, h, k, label) { if (k <= 0 || !im) return; const e = FX.settle(clamp(k / .5)); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); ctx.rotate(-.015);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-w / 2 + 10, -h / 2 + 12, w + 24, h + 24)); shape(ctx, '#8a5a2a', 5, rect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 4)); shape(ctx, '#c89a5a', 3, rect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8));
    ctx.drawImage(im, -w / 2, -h / 2, w, h); if (label) { shape(ctx, PAPER, 3, rect(-170, h / 2 + 22, 340, 34, 3)); txt(ctx, label, 0, h / 2 + 40, FX.FONT(700, 15)); } ctx.restore(); }
  function ship(ctx, x, y, s, t, flag) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4 + x) * 3); ctx.scale(s, s);
    shape(ctx, '#7a4a2a', 4, c => { c.moveTo(-130, -40); c.lineTo(130, -40); c.lineTo(150, -70); c.lineTo(110, 10); c.lineTo(-100, 10); c.lineTo(-150, -60); c.closePath(); }); line(ctx, [[-120, -26], [120, -26]], 4, '#e8c860');
    for (let i = 0; i < 5; i++) shape(ctx, '#1d1a17', 0, rect(-90 + i * 40, -20, 14, 10));
    for (const [mx, mh] of [[-60, 200], [10, 240], [80, 180]]) { line(ctx, [[mx, -40], [mx, -40 - mh]], 6, '#5a3a20'); for (let k = 0; k < 2; k++) shape(ctx, '#f4efe2', 3, c => { const y0 = -40 - mh + 20 + k * mh * .45, w = 52 - k * 6; c.moveTo(mx - w, y0); c.quadraticCurveTo(mx, y0 - 10, mx + w, y0); c.quadraticCurveTo(mx + w * .9, y0 + mh * .35, mx + w, y0 + mh * .38); c.quadraticCurveTo(mx, y0 + mh * .32, mx - w, y0 + mh * .38); c.closePath(); }); }
    ctx.translate(10, -290); line(ctx, [[0, 0], [0, 10]], 3); const w = Math.sin(t * 4) * 4;
    if (flag === 'en') { shape(ctx, '#fff', 2.5, poly([[0, 0], [60, w], [60, 36 + w], [0, 36]])); shape(ctx, '#c8322a', 0, rect(26, 2 + w * .5, 8, 32)); shape(ctx, '#c8322a', 0, rect(2, 14 + w * .5, 56, 8)); }
    else { for (let i = 0; i < 3; i++) shape(ctx, ['#e8742a', '#f4efe6', '#2f4a8a'][i], 0, poly([[0, i * 12], [60, i * 12 + w], [60, i * 12 + 12 + w], [0, i * 12 + 12]])); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.strokeRect(0, 0, 60, 36); }
    ctx.restore(); }
  function pelt(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#7a5434', 3, c => { c.moveTo(-30, -20); c.quadraticCurveTo(0, -34, 30, -20); c.lineTo(36, 20); c.quadraticCurveTo(0, 30, -36, 20); c.closePath(); }); shape(ctx, '#8a6444', 0, ellipse(0, -2, 20, 14)); ctx.restore(); }
  function checkRow(ctx, x, y, k, text, ok) { if (k <= 0) return; const e = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); txt(ctx, text, 0, 0, FX.DISPLAY(34), INK, 'left'); ctx.restore();
    if (k > .3) { const s = pop(k - .3); ctx.save(); ctx.translate(x - 50, y); ctx.scale(s, s); shape(ctx, ok ? GREEN : RED, 4, circle(0, 0, 22)); if (ok) line(ctx, [[-10, 0], [-2, 9], [12, -9]], 6, '#fff'); else { line(ctx, [[-9, -9], [9, 9]], 6, '#fff'); line(ctx, [[9, -9], [-9, 9]], 6, '#fff'); } ctx.restore(); } }
  const IMG = () => T.IMG;

  // ---------- s1: chapter card; in the 1620s a company shows up — not a king, not a church ----------
  function s1(ctx, lt, dur, t) {
    const kg = since(t, 'king'), ch = since(t, 'church');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#ffd890'], [1, '#f0a868']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 360, 520, 'rgba(255,248,220,.6)');
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + t * .05; ctx.save(); ctx.globalAlpha = .12; shape(ctx, '#fff', 0, poly([[640, 360], [640 + Math.cos(a) * 1200, 360 + Math.sin(a) * 1200], [640 + Math.cos(a + .1) * 1200, 360 + Math.sin(a + .1) * 1200]])); ctx.restore(); }
    const card = clamp(1 - Math.max(0, lt - 1.9) / .3);
    if (card > 0) { ctx.save(); ctx.globalAlpha = card; strip(ctx, 'BEAT 3', 640, 230, lt - .05, { px: 30 }); strip(ctx, 'THE SPARK', 640, 330, lt - .4, { px: 64, color: ORANGE, rot: .02 }); ctx.restore(); }
    if (lt > 2.1) { strip(ctx, '1620s', 640, 110, since(t, 'twenties') + .2, { px: 40 });
      const icons = [['crown', 330, kg], ['church', 640, ch], ['company', 950, since(t, 'company2') - .2]];
      icons.forEach(([k, x, kk]) => { if (kk <= -.4) return; const s = pop(kk + .4); ctx.save(); ctx.translate(x, 400); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-120, -120, 250, 250, 20)); shape(ctx, PAPER, 5, rect(-125, -125, 250, 250, 20));
        if (k === 'crown') { shape(ctx, GOLD, 4, poly([[-70, 40], [-70, -30], [-35, 0], [0, -50], [35, 0], [70, -30], [70, 40]])); for (const cx of [-70, 0, 70]) shape(ctx, RED, 2.5, circle(cx, cx ? -34 : -54, 9)); txt(ctx, 'A KING?', 0, 90, FX.DISPLAY(28)); }
        if (k === 'church') { shape(ctx, '#e8dcc4', 4, rect(-50, -20, 100, 70)); shape(ctx, '#c8643a', 4, poly([[-60, -20], [0, -70], [60, -20]])); line(ctx, [[0, -70], [0, -104]], 5); line(ctx, [[-12, -92], [12, -92]], 5); shape(ctx, '#5a3a20', 3, rect(-14, 14, 28, 36)); txt(ctx, 'A CHURCH?', 0, 90, FX.DISPLAY(28)); }
        if (k === 'company') { shape(ctx, '#f4efe2', 4, rect(-70, -70, 140, 110, 6)); for (let i = 0; i < 5; i++) line(ctx, [[-54, -50 + i * 18], [54, -50 + i * 18]], 3, '#9a8a7a'); shape(ctx, GREEN, 3, circle(40, 20, 22)); txt(ctx, '$', 40, 22, FX.DISPLAY(26), '#fff'); txt(ctx, 'A COMPANY.', 0, 90, FX.DISPLAY(28), GREEN); }
        ctx.restore(); if (k !== 'company' && kk > .5) { const e = clamp((kk - .5) / .2); ctx.save(); ctx.globalAlpha = e; line(ctx, [[x - 100, 300], [x + 100, 500]], 14, RED); line(ctx, [[x + 100, 300], [x - 100, 500]], 14, RED); ctx.restore(); } }); }
    vig(ctx);
  }

  // ---------- s2: the Dutch West India Company wants beaver fur ----------
  function s2(ctx, lt, dur, t) {
    const bv = since(t, 'beaver');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 400);
    // a Dutch counting house in Amsterdam: tiled floor, a big window onto ships, a desk with a ledger
    shape(ctx, '#c8a878', 0, rect(-100, -100, 1500, 600)); for (let i = 0; i < 9; i++) line(ctx, [[i * 160, 0], [i * 160, 500]], 3, 'rgba(120,80,40,.2)');
    shape(ctx, '#7a4a2a', 6, rect(700, 70, 460, 330, 6)); shape(ctx, grad(ctx, 0, 76, 0, 396, [[0, '#8ad0f0'], [1, '#e8f0f0']]), 0, rect(708, 78, 444, 314)); waterBand(ctx, 300, t, 708, 1152, '#4aa0c0');
    ship(ctx, 900, 330, .3, t, 'nl'); ship(ctx, 1060, 320, .22, t, 'nl'); for (let k = 0; k < 3; k++) line(ctx, [[708 + k * 148, 78], [708 + k * 148, 392]], 6, '#7a4a2a'); line(ctx, [[708, 230], [1152, 230]], 6, '#7a4a2a');
    shape(ctx, grad(ctx, 0, 480, 0, 720, [[0, '#e8dcc4'], [1, '#c8b8a0']]), 0, rect(-100, 480, 1500, 300)); for (let i = 0; i < 12; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) shape(ctx, '#2a2a30', 0, poly([[i * 130 - 60 + j * 40, 500 + j * 80], [i * 130 + 10 + j * 40, 500 + j * 80], [i * 130 + 30 + j * 50, 580 + j * 80], [i * 130 - 40 + j * 50, 580 + j * 80]]));
    // the company's sign
    shape(ctx, '#2f4a8a', 4, rect(120, 80, 420, 110, 8)); txt(ctx, 'G.W.C.', 330, 122, FX.DISPLAY(48), GOLD); txt(ctx, 'DUTCH WEST INDIA COMPANY', 330, 168, FX.FONT(800, 16), '#fff');
    // the director and a clerk; pelts piling up on "beaver fur"
    shape(ctx, '#6a4a2a', 4.5, rect(300, 470, 520, 40, 6)); shape(ctx, '#5a3a20', 4, rect(320, 510, 30, 160)); shape(ctx, '#5a3a20', 4, rect(770, 510, 30, 160));
    shape(ctx, '#f4efe2', 3, rect(460, 440, 140, 34, 3)); line(ctx, [[530, 440], [530, 474]], 2);
    dutchman(ctx, 220, 700, .72, t, 0, { still: true }); dutchman(ctx, 980, 700, .66, t, 3, { still: true, reach: true });
    if (bv > -.3) for (let i = 0; i < 9; i++) { const k = clamp((bv + .3 - i * .1) / .35); if (k <= 0) continue; const d = FX.dropBounce(k * .5, 200, .3); pelt(ctx, 420 + (i % 5) * 46 + (Math.floor(i / 5) * 22), 440 - Math.floor(i / 5) * 30 - d, .9); }
    ctx.restore();
    if (bv > 0) { const s = pop(bv); ctx.save(); ctx.translate(640, 640); ctx.rotate(-.03); ctx.scale(s, s); FX.bigText(ctx, 'IT WANTS BEAVER FUR', 0, 0, 56, { color: GOLD }); ctx.restore(); }
    else strip(ctx, 'A COMPANY.', 640, 110, since(t, 'company2') + .2, { px: 40, color: GREEN });
    vig(ctx);
  }

  // ---------- s3: a trading post on the southern tip of the island: New Amsterdam ----------
  function s3(ctx, lt, dur, t) {
    const tp = since(t, 'trading'), na = since(t, 'newam');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420);
    sky(ctx, t, '#6ab8ea', '#fde6b8'); farShore(ctx, 330, t); waterBand(ctx, 360, t, -600, 2200, '#3aa0c0');
    // the southern tip of the island: a rise of land, the wooded island beyond
    shape(ctx, '#7aa858', 4, c => { c.moveTo(200, 760); c.quadraticCurveTo(300, 440, 640, 420); c.quadraticCurveTo(980, 430, 1100, 760); c.closePath(); });
    for (let i = 0; i < 16; i++) { const x = 360 + i * 40, y = 440 - Math.sin(i / 15 * Math.PI) * 10; shape(ctx, i % 2 ? '#3f7f3a' : '#4f9a44', 3, circle(x, y - 10, 22)); }
    shape(ctx, '#c8b07a', 3, c => { c.moveTo(260, 760); c.quadraticCurveTo(340, 560, 640, 540); c.quadraticCurveTo(940, 550, 1040, 760); c.closePath(); });
    // planted on "trading post": a star fort, a windmill, a storehouse, pelts on the dock
    const k1 = tp > -.3 ? FX.settle(clamp((tp + .3) / .5)) : 0, k2 = tp > 0 ? FX.settle(clamp(tp / .5)) : 0, k3 = tp > .3 ? FX.settle(clamp((tp - .3) / .5)) : 0;
    if (k1 > 0) { ctx.save(); ctx.translate(560, 600); ctx.scale(k1, k1); shape(ctx, '#a8946a', 4, poly([[-120, 0], [-70, -30], [-40, -70], [40, -70], [70, -30], [120, 0], [70, 30], [40, 70], [-40, 70], [-70, 30]])); shape(ctx, '#c8b48a', 3, rect(-50, -40, 100, 60)); shape(ctx, '#b85a3a', 3, poly([[-56, -40], [0, -80], [56, -40]]));
      line(ctx, [[0, -80], [0, -150]], 4); for (let i = 0; i < 3; i++) shape(ctx, ['#e8742a', '#f4efe6', '#2f4a8a'][i], 0, rect(2, -150 + i * 10, 46 + Math.sin(t * 4) * 3, 10)); ctx.restore(); }
    if (k2 > 0) { ctx.save(); ctx.translate(800, 560); ctx.scale(k2, k2); shape(ctx, '#d8c8a8', 4, poly([[-24, 0], [24, 0], [16, -100], [-16, -100]])); for (let i = 0; i < 4; i++) { const a = t * 1.4 + i * Math.PI / 2; line(ctx, [[0, -100], [Math.cos(a) * 70, -100 + Math.sin(a) * 70]], 7, '#7a5434'); } ctx.restore(); }
    if (k3 > 0) { ctx.save(); ctx.translate(400, 660); ctx.scale(k3, k3); shape(ctx, '#c8643a', 4, rect(-60, -60, 120, 60)); shape(ctx, '#8a3a2a', 4, poly([[-66, -60], [0, -100], [66, -60]])); for (let i = 0; i < 6; i++) pelt(ctx, 90 + (i % 3) * 30, -10 - Math.floor(i / 3) * 22, .7); ctx.restore(); }
    ship(ctx, 1020, 470, .5, t, 'nl'); ship(ctx, 210 + Math.sin(t * .2) * 20, 440, .36, t, 'nl');
    dutchman(ctx, 690, 740, .42, t, 1, { still: true }); dutchman(ctx, 900, 760, .4, t * 1.2, 2);
    ctx.restore();
    if (since(t, 'southern') > 0) tag(ctx, 'THE SOUTHERN TIP', 640, 300, since(t, 'southern'), 22);
    if (na > -.2) { const s = slam(na + .2); ctx.save(); ctx.translate(640, 110); ctx.rotate(-.02); ctx.scale(s, s); FX.bigText(ctx, 'NEW AMSTERDAM', 0, 0, 66, { color: GOLD }); ctx.restore(); }
    vig(ctx);
  }

  // ---------- s4: the version you got in school: $24 worth of beads ----------
  function s4(ctx, lt, dur, t) {
    const tf = since(t, 'twentyfour'), bd = since(t, 'beads');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f6e8c8'], [1, '#e8d0a0']]), 0, rect(-100, -100, 1500, 900));
    shape(ctx, '#2f5a46', 6, rect(140, 60, 760, 330, 6)); shape(ctx, '#3f6a56', 0, rect(150, 70, 740, 310)); shape(ctx, '#8a5a34', 4, rect(130, 390, 780, 18));
    // chalk: the island and the famous sum
    ctx.save(); ctx.globalAlpha = .9; ctx.lineWidth = 4; ctx.strokeStyle = '#f4f4ee'; ctx.beginPath(); ctx.moveTo(250, 320); ctx.bezierCurveTo(280, 240, 360, 140, 470, 110); ctx.bezierCurveTo(440, 180, 380, 270, 280, 340); ctx.closePath(); ctx.stroke(); ctx.restore();
    txt(ctx, 'MANHATTAN', 380, 360, FX.FONT(700, 18), '#f4f4ee');
    if (tf > -.2) { ctx.save(); ctx.globalAlpha = clamp((tf + .2) / .4); txt(ctx, '$24', 680, 180, FX.DISPLAY(96), '#f4f4ee'); ctx.restore(); }
    if (bd > -.1) { ctx.save(); ctx.globalAlpha = clamp((bd + .1) / .4); txt(ctx, 'OF BEADS', 680, 290, FX.DISPLAY(52), '#f4f4ee'); ctx.restore(); for (let i = 0; i < 9; i++) shape(ctx, ['#e8423a', '#3a9ad0', '#f6c945', '#4fba5a'][i % 4], 2, circle(560 + i * 28, 340 + Math.sin(i) * 6, 9)); }
    // the teacher pointing, a class of kids at desks
    walker(ctx, 1050, 640, .78, t, 4, { still: true, reach: true, cam: false });
    for (let i = 0; i < 4; i++) { const x = 160 + i * 230; walker(ctx, x, 830, .62, t, i * 3 + 2, { still: true, cam: false }); shape(ctx, '#a87a4a', 4, rect(x - 90, 680, 180, 24, 4)); shape(ctx, '#f4efe2', 2, rect(x - 40, 668, 60, 14, 2)); }
    ctx.restore();
    strip(ctx, 'THE VERSION YOU GOT IN SCHOOL', 640, 450, since(t, 'school') + .1, { px: 30 });
    vig(ctx);
  }

  // ---------- s5: here's what actually exists — one letter ----------
  function s5(ctx, lt, dur, t) {
    const ex = since(t, 'exists'), ol = since(t, 'one');
    shape(ctx, '#2a2420', 0, rect(0, 0, W, H)); glow(ctx, 640, 420, 420, 'rgba(255,220,150,.35)');
    shape(ctx, '#6a4a2a', 5, c => { c.moveTo(-50, 520); c.lineTo(1330, 520); c.lineTo(1330, 760); c.lineTo(-50, 760); c.closePath(); }); for (let i = 0; i < 6; i++) line(ctx, [[-50, 540 + i * 36], [1330, 540 + i * 36]], 2, 'rgba(40,20,10,.3)');
    if (ex > -.6) FX.stamp(ctx, 'MYTH', 300, 220, ex + .6, { color: RED, size: 64 });
    if (ol > -.4) { const d = FX.dropBounce(ol + .4, 300, .3); ctx.save(); ctx.translate(800, 470 - d); ctx.rotate(.04); shape(ctx, 'rgba(0,0,0,.4)', 0, rect(-104, -64, 220, 140)); shape(ctx, '#f4ead4', 4, rect(-110, -70, 220, 140, 3)); for (let i = 0; i < 7; i++) line(ctx, [[-86, -46 + i * 16], [86 - (i % 3) * 20, -46 + i * 16]], 2.5, '#6a5a4a'); shape(ctx, '#a8322a', 2, circle(70, 50, 12)); ctx.restore(); }
    if (ol > 0) { const s = pop(ol); ctx.save(); ctx.translate(800, 200); ctx.scale(s, s); FX.bigText(ctx, 'ONE LETTER', 0, 0, 60, { color: GOLD }); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- s6: Pieter Schagen, 5 November 1626: "for the value of 60 guilders" (the real letter) ----------
  function s6(ctx, lt, dur, t) {
    const sx = since(t, 'sixty'), sc = since(t, 'schagen');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#5a4030'], [1, '#3a2820']]), 0, rect(0, 0, W, H)); glow(ctx, 470, 360, 460, 'rgba(255,220,160,.35)');
    const im = IMG().schagen, zoom = sx > -.8 ? ease.inOut(clamp((sx + .8) / 1.2)) : 0;
    ctx.save(); ctx.translate(lerp(470, 640, zoom), lerp(370, 560, zoom)); ctx.scale(lerp(1, 2.6, zoom), lerp(1, 2.6, zoom)); ctx.translate(-470, -370);
    frame(ctx, im, 470, 370, 380, 580, lt + .5, null);
    if (sx > -.3) { const k = clamp((sx + .3) / .5); ctx.save(); ctx.globalAlpha = .45 * k; shape(ctx, '#ffe85a', 0, rect(470 - 190 + 380 * .14, 370 - 290 + 580 * .228, 380 * .7 * k, 580 * .056)); ctx.restore(); }
    ctx.restore();
    // the writer at work: a Dutch official with a quill (no portrait survives)
    if (zoom < .5) { ctx.save(); ctx.globalAlpha = 1 - zoom * 2; dutchman(ctx, 1000, 760, .74, t, 2, { still: true, reach: true }); line(ctx, [[1050, 470], [1090, 410]], 4, '#f4efe2'); ctx.restore(); }
    FX.dateTag(ctx, '5 NOV 1626 · AMSTERDAM');
    if (sc > -.2 && zoom < .5) { const e = FX.settle(clamp((sc + .2) / .4)); ctx.save(); ctx.translate(lerp(1500, 1010, e), 170); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -46, 360, 100)); shape(ctx, PAPER, 4, rect(-180, -50, 360, 100, 4)); txt(ctx, 'PIETER SCHAGEN', 0, -14, FX.DISPLAY(30)); txt(ctx, 'DUTCH OFFICIAL · NO PORTRAIT SURVIVES', 0, 24, FX.FONT(700, 13), '#5a4a38'); ctx.restore(); }
    if (since(t, 'value') > -.2) { const s = pop(since(t, 'value') + .2); ctx.save(); ctx.translate(640, 130); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-356, -40, 720, 90)); shape(ctx, PAPER, 4, rect(-360, -44, 720, 90, 4)); txt(ctx, '"…FOR THE VALUE OF 60 GUILDERS"', 0, 2, FX.DISPLAY(38)); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- s7: that's all — no deed, no seller, no list of goods, no beads ----------
  function s7(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 380);
    shape(ctx, 'rgba(0,0,0,.25)', 0, rect(210, 70, 870, 590)); shape(ctx, '#fbf6ea', 5, rect(200, 60, 870, 590, 6)); for (let i = 0; i < 12; i++) line(ctx, [[230, 130 + i * 44], [1040, 130 + i * 44]], 1.5, 'rgba(90,120,160,.25)'); line(ctx, [[300, 60], [300, 650]], 2, 'rgba(200,80,80,.35)');
    txt(ctx, 'WHAT THE LETTER SAYS:', 640, 110, FX.DISPLAY(32), '#5a4a38');
    checkRow(ctx, 380, 190, since(t, 'thatsall') + .1, 'BOUGHT THE ISLAND, 60 GUILDERS', true);
    checkRow(ctx, 380, 290, since(t, 'deed'), 'A DEED?', false);
    checkRow(ctx, 380, 380, since(t, 'who'), 'WHO SOLD IT?', false);
    checkRow(ctx, 380, 470, since(t, 'handed'), 'WHAT WAS HANDED OVER?', false);
    checkRow(ctx, 380, 560, since(t, 'nobeads') - .2, 'BEADS?', false);
    ctx.restore();
    if (since(t, 'nobeads') > .3) FX.stamp(ctx, 'NO BEADS', 980, 560, since(t, 'nobeads') - .3, { color: RED, size: 46 });
    vig(ctx);
  }

  // ---------- s8: the $24 is an 1800s currency conversion that nobody ever updated ----------
  function s8(ctx, lt, dur, t) {
    const cv = since(t, 'conversion'), ei = since(t, 'eighteen'), up = since(t, 'updated');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8a6a4a'], [1, '#5a4030']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    // a dusty 1800s ledger
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(190, 130, 920, 520)); shape(ctx, '#3a2a20', 5, rect(180, 120, 920, 520, 10)); shape(ctx, '#f0e2c0', 3, rect(200, 140, 430, 480)); shape(ctx, '#f0e2c0', 3, rect(650, 140, 430, 480)); line(ctx, [[640, 140], [640, 620]], 4, '#5a4030');
    for (let i = 0; i < 10; i++) { line(ctx, [[220, 190 + i * 42], [610, 190 + i * 42]], 1.5, 'rgba(120,90,60,.3)'); line(ctx, [[670, 190 + i * 42], [1060, 190 + i * 42]], 1.5, 'rgba(120,90,60,.3)'); }
    if (cv > -.3) { ctx.save(); ctx.globalAlpha = clamp((cv + .3) / .5); txt(ctx, '60 guilders', 420, 260, 'italic 600 40px Georgia', '#3a2a20'); txt(ctx, '=', 420, 330, FX.DISPLAY(48), '#3a2a20'); txt(ctx, '$24', 420, 410, 'italic 700 72px Georgia', '#8a2a20'); ctx.restore(); }
    if (ei > -.2) { const s = pop(ei + .2); ctx.save(); ctx.translate(860, 300); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, '#e8d8b0', 4, rect(-120, -80, 240, 160, 6)); txt(ctx, 'CONVERTED', 0, -34, FX.FONT(800, 18), '#5a4a38'); txt(ctx, 'IN THE', 0, 0, FX.FONT(700, 18), '#5a4a38'); txt(ctx, '1800s', 0, 44, FX.DISPLAY(48), '#8a2a20'); ctx.restore(); }
    // cobwebs and dust settle on it
    ctx.save(); ctx.globalAlpha = .6 * clamp(lt / 3); ctx.lineWidth = 2; ctx.strokeStyle = '#f4f0e8'; for (let r = 30; r < 150; r += 30) { ctx.beginPath(); ctx.arc(180, 120, r, 0, Math.PI / 2); ctx.stroke(); } for (let a = 0; a <= 6; a++) line(ctx, [[180, 120], [180 + Math.cos(a / 6 * Math.PI / 2) * 150, 120 + Math.sin(a / 6 * Math.PI / 2) * 150]], 2, '#f4f0e8'); ctx.restore();
    for (let i = 0; i < 20; i++) { const p = (t * .1 + i / 20) % 1; ctx.save(); ctx.globalAlpha = .4 * Math.sin(Math.PI * p); shape(ctx, '#f4f0e8', 0, circle(200 + (i * 53) % 900, 100 + p * 500, 2.5)); ctx.restore(); }
    ctx.restore();
    if (up > -.3) FX.stamp(ctx, 'NEVER UPDATED', 860, 560, up + .3, { color: RED, size: 44 });
    vig(ctx, .6);
  }

  // ---------- s9: one modern calculation: closer to a thousand dollars ----------
  function s9(ctx, lt, dur, t) {
    const md = since(t, 'modern'), th = since(t, 'thousand');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8f4ec'], [1, '#c8e4d4']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 400);
    line(ctx, [[200, 600], [1080, 600]], 5);
    const h1 = 24 * .38, h2 = th > -.3 ? FX.settle(clamp((th + .3) / .8)) * 320 : (md > 0 ? 40 * clamp(md / 1) : 0);
    shape(ctx, '#a8b8a8', 4, rect(330, 600 - h1, 160, h1)); txt(ctx, '$24', 410, 600 - h1 - 30, FX.DISPLAY(40), '#5a6a5a'); txt(ctx, 'THE 1800s FIGURE', 410, 640, FX.FONT(700, 18), '#5a6a5a');
    shape(ctx, GREEN, 4, rect(790, 600 - h2, 160, h2)); for (let y = 600 - 24; y > 600 - h2; y -= 26) shape(ctx, GOLD, 2.5, ellipse(870, y, 60, 10));
    if (th > 0) txt(ctx, '≈ $1,000', 870, 600 - h2 - 34, FX.DISPLAY(46), GREEN); txt(ctx, 'ONE MODERN CALCULATION', 870, 640, FX.FONT(700, 18), GREEN);
    ctx.restore();
    strip(ctx, '60 GUILDERS IN TODAY\'S MONEY', 640, 92, md + .2, { px: 32 });
    vig(ctx);
  }

  // ---------- s10/s11: two sides, two different deals; the Lenape side was never written down ----------
  function deals(ctx, t, kL, kR, foc) {
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#e8d8b8'], [.5, '#f4ead4'], [1, '#d8e4c0']]), 0, rect(-100, -100, 1500, 900));
    line(ctx, [[640, 40], [640, 700]], 4, 'rgba(90,70,50,.3)');
    // the Dutch side: a deed, a fence, a lock — "theirs for good"
    if (kL > 0) { const s = pop(kL); ctx.save(); ctx.translate(320, 330); ctx.scale(s, s); shape(ctx, '#fff', 4.5, ellipse(0, -40, 230, 160)); for (const [x, y, r] of [[-170, 110, 22], [-210, 160, 12]]) shape(ctx, '#fff', 4, circle(x, y, r));
      for (let i = 0; i < 9; i++) shape(ctx, '#a87a4a', 2.5, rect(-150 + i * 34, -30, 14, 70)); line(ctx, [[-160, -10], [150, -10]], 6, '#a87a4a'); line(ctx, [[-160, 24], [150, 24]], 6, '#a87a4a');
      shape(ctx, '#f4ead4', 3, rect(-60, -150, 120, 90, 3)); for (let i = 0; i < 4; i++) line(ctx, [[-44, -130 + i * 16], [44, -130 + i * 16]], 2, '#8a7a6a'); shape(ctx, '#a8322a', 2, circle(36, -78, 10)); shape(ctx, GOLD, 3, rect(120, -80, 44, 36, 6)); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(142, -80, 16, Math.PI, 0); ctx.stroke();
      ctx.restore(); dutchman(ctx, 250, 760, .55, t, 0, { still: true }); txt(ctx, 'THE DUTCH: "OURS, FOR GOOD"', 320, 560, FX.DISPLAY(28), '#2f4a8a'); }
    // the Lenape side: people and land shared through the seasons
    if (kR > 0) { const s = pop(kR); ctx.save(); ctx.translate(960, 330); ctx.scale(s, s); shape(ctx, '#fff', 4.5, ellipse(0, -40, 230, 160)); for (const [x, y, r] of [[170, 110, 22], [210, 160, 12]]) shape(ctx, '#fff', 4, circle(x, y, r));
      shape(ctx, '#8ab868', 3, ellipse(0, 20, 150, 50)); for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + t * .4; shape(ctx, ['#7fba5a', '#f6c945', '#e8742a', '#cfe0f0'][i], 2.5, circle(Math.cos(a) * 120, -60 + Math.sin(a) * 50, 18)); }
      shape(ctx, '#2f4a8a', 3, rect(-60, -40, 26, 50, 8)); shape(ctx, '#a87648', 3, rect(30, -40, 26, 50, 8)); shape(ctx, '#f0c8a0', 3, circle(-47, -54, 13)); shape(ctx, '#a06a44', 3, circle(43, -54, 13)); line(ctx, [[-34, -20], [30, -20]], 7, '#e8b890');
      ctx.restore(); lenape(ctx, 1060, 760, .55, t, 1, { still: true }); txt(ctx, 'THE LENAPE: LIKELY "SHARED USE"', 960, 560, FX.DISPLAY(28), '#8a4a2a'); }
  }
  function s10(ctx, lt, dur, t) { ctx.save(); cam(ctx, lerp(1.08, 1.0, ease.inOut(clamp(lt / dur))), 420, 380); deals(ctx, t, since(t, 'dutch2') + .3, 0); ctx.restore();
    strip(ctx, 'NOT THE SAME DEAL', 640, 92, since(t, 'same') + .1, { px: 38, color: RED }); vig(ctx); }
  function s11(ctx, lt, dur, t) {
    const inf = since(t, 'inference'), nb = since(t, 'nobody');
    ctx.save(); cam(ctx, 1.0, 640, 380); deals(ctx, t, 1, since(t, 'lenape') + .3); ctx.restore();
    if (inf > -.2) FX.stamp(ctx, 'AN INFERENCE', 960, 150, inf + .2, { color: '#8a4a2a', size: 40 });
    if (nb > 0) { const s = pop(nb); ctx.save(); ctx.translate(640, 640); ctx.scale(s, s); shape(ctx, '#fbf6ea', 4, rect(-300, -44, 600, 88, 4)); txt(ctx, 'THE LENAPE SIDE: NEVER WRITTEN DOWN', 0, 2, FX.DISPLAY(28), '#5a4a38'); ctx.restore(); }
    vig(ctx);
  }

  // ---------- s12: the result: within a few generations the Lenape are pushed off the island that still carries their word ----------
  const MAN = [[-74.018, 40.700], [-74.0, 40.703], [-73.976, 40.711], [-73.972, 40.73], [-73.972, 40.75], [-73.958, 40.762], [-73.942, 40.776], [-73.929, 40.797], [-73.934, 40.81], [-73.934, 40.835], [-73.927, 40.85], [-73.912, 40.873],
    [-73.92, 40.879], [-73.93, 40.875], [-73.946, 40.851], [-73.959, 40.83], [-73.97, 40.81], [-73.989, 40.785], [-74.009, 40.756], [-74.012, 40.73], [-74.016, 40.712]];
  const RL = ([lon, lat]) => { const dx = (lon + 73.968) * 84.3, dy = (lat - 40.787) * 111, a = 29 * Math.PI / 180, u = dx * Math.sin(a) + dy * Math.cos(a), v = dx * Math.cos(a) - dy * Math.sin(a); return [640 + u * 52, 400 + v * 52]; };
  function s12(ctx, lt, dur, t) {
    const gn = since(t, 'generations'), ps = since(t, 'pushed'), wd = since(t, 'word');
    shape(ctx, '#7cc0dc', 0, rect(0, 0, W, H)); for (let i = 0; i < 14; i++) line(ctx, [[((i * 130 + t * 10) % 1400) - 60, 80 + i * 46], [((i * 130 + t * 10) % 1400) - 20, 80 + i * 46]], 3, 'rgba(255,255,255,.5)');
    const isl = MAN.map(RL); shape(ctx, '#7fb85a', 4.5, poly(isl));
    const grow = ps > -1 ? ease.inOut(clamp((ps + 1) / 2.6)) : 0, front = lerp(160, 1180, grow);
    ctx.save(); ctx.beginPath(); poly(isl)(ctx); ctx.clip();
    // farms and houses spread up the island from the southern tip (left)
    shape(ctx, '#d8c890', 0, rect(0, 0, front, H)); for (let i = 0; i < 40; i++) { const x = 120 + i * 28, y = 340 + (i * 37) % 120; if (x > front) continue; shape(ctx, i % 3 ? '#c8643a' : '#e8b07a', 2, rect(x - 8, y - 10, 16, 14)); shape(ctx, '#8a3a2a', 0, poly([[x - 10, y - 10], [x, y - 18], [x + 10, y - 10]])); }
    for (let i = 0; i < 20; i++) { const x = 160 + i * 52, y = 360 + (i * 53) % 100; if (x < front) continue; shape(ctx, '#4f8f3a', 2, circle(x, y, 13)); }
    ctx.restore();
    // Lenape camps: fade as the frontier passes them (no figures shown)
    for (let i = 0; i < 7; i++) { const x = 260 + i * 140, y = 400 + (i % 2) * 40, a = clamp((x - front) / 120 + 1); if (a <= 0) continue; ctx.save(); ctx.globalAlpha = a; shape(ctx, '#8a6a48', 2.5, c => { c.moveTo(x - 14, y); c.bezierCurveTo(x - 14, y - 22, x + 14, y - 22, x + 14, y); c.closePath(); }); ctx.restore(); }
    if (gn > 0) { const yr = Math.round(lerp(1626, 1700, clamp(gn / 4))); ctx.save(); ctx.translate(1110, 110); shape(ctx, '#1d1a17', 0, rect(-100, -36, 200, 72, 10)); txt(ctx, String(yr), 0, 2, FX.DISPLAY(44), GOLD); ctx.restore(); }
    if (wd > -.4) { const k = clamp((wd + .4) / .6); ctx.save(); ctx.globalAlpha = k; FX.bigText(ctx, 'MANNAHATTA', 640, 600, 64, { color: '#f4e6c4' }); ctx.restore(); txt(ctx, 'THE WORD STAYED', 640, 660, FX.FONT(800, 20), '#2f4a6a'); }
    strip(ctx, 'THE RESULT ISN\'T IN DOUBT', 420, 92, since(t, 'result') + .2, { px: 32 });
    vig(ctx);
  }

  // ---------- s13: the town grows like a business; by the 1650s a muddy little port (Castello Plan → the fixed corner, 1650s) ----------
  function s13(ctx, lt, dur, t) {
    const md = since(t, 'muddy'), mix = md > -.6 ? ease.inOut(clamp((md + .6) / 1.0)) : 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 400); dutchCorner(ctx, t, { wall: 0 });
    for (let i = 0; i < 5; i++) dutchman(ctx, 300 + i * 190 + Math.sin(t * .3 + i) * 20, 730 + (i % 2) * 20, .48, t, i, { step: 1 });
    // pigs and chickens in the mud
    for (let i = 0; i < 2; i++) { const x = 560 + i * 120 + Math.sin(t * .5 + i) * 30, y = 690; shape(ctx, '#e8a0a0', 3, ellipse(x, y, 34, 20)); shape(ctx, '#e8a0a0', 3, circle(x + 30, y - 6, 14)); shape(ctx, '#d88a8a', 2, ellipse(x + 42, y - 4, 6, 5)); for (const d of [-18, 18]) line(ctx, [[x + d, y + 16], [x + d, y + 30]], 5, '#c88080'); }
    for (let i = 0; i < 3; i++) { const x = 760 + i * 40, y = 640 + Math.abs(Math.sin(t * 6 + i)) * -6; shape(ctx, '#f4efe6', 2.5, ellipse(x, y, 12, 9)); shape(ctx, RED, 0, circle(x + 9, y - 10, 4)); }
    ctx.restore();
    if (mix < 1) { ctx.save(); ctx.globalAlpha = 1 - mix; shape(ctx, '#e8dcc0', 0, rect(0, 0, W, H)); const im = IMG().castello; frame(ctx, im, 640, 350, 760, 760 * (im ? im.height / im.width : .73), 1, 'CASTELLO PLAN · NEW AMSTERDAM, 1660'); ctx.restore(); }
    if (since(t, 'business') > 0) strip(ctx, 'IT GROWS LIKE A BUSINESS', 640, 92, since(t, 'business'), { px: 32 });
    if (mix > .5) { FX.dateTag(ctx, 'WALL & BROAD · 1650s'); tag(ctx, 'A MUDDY LITTLE PORT', 640, 190, md, 26); tag(ctx, 'THE CANAL = TODAY\'S BROAD ST', 1050, 640, md - .6, 18); }
    vig(ctx);
  }

  // ---------- s14: director Peter Stuyvesant orders a wall across the island to keep the English out ----------
  function s14(ctx, lt, dur, t) {
    const wl = since(t, 'wall'), en = since(t, 'english');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 420); dutchCorner(ctx, t, { wall: 0 }); ctx.restore();
    stuyvesant(ctx, 420, 760, .95, t, { still: true, reach: wl > -.3 });
    dutchman(ctx, 1000, 770, .78, t, 3, { still: true, tallhat: false });
    // the speech bubble: the island, a wall across it, the English kept out
    if (wl > -.3) { const s = pop(wl + .3); ctx.save(); ctx.translate(780, 250); ctx.scale(s, s); shape(ctx, '#fff', 4.5, ellipse(0, 0, 250, 150)); shape(ctx, '#fff', 4, poly([[-140, 110], [-90, 120], [-230, 210]]));
      shape(ctx, '#7cc0dc', 0, ellipse(0, 0, 220, 120)); ctx.save(); ctx.rotate(-.45); shape(ctx, '#7fb85a', 3, ellipse(-10, 0, 170, 40)); ctx.restore();
      const wk = clamp((wl + .3) / .8); line(ctx, [[-100, 20], [lerp(-100, -40, wk), lerp(20, 90, wk)]], 8, '#7a5430'); line(ctx, [[-100, 20], [lerp(-100, -40, wk), lerp(20, 90, wk)]], 3, INK);
      if (en > -.2) { for (const [x, y] of [[90, -60], [150, -20]]) { shape(ctx, '#7a4a2a', 2.5, poly([[x - 20, y], [x + 20, y], [x + 14, y + 8], [x - 14, y + 8]])); shape(ctx, '#fff', 1.5, rect(x - 2, y - 24, 16, 14)); shape(ctx, RED, 0, rect(x + 4, y - 24, 3, 14)); }
        const e = clamp((en + .2) / .3); ctx.globalAlpha = e; line(ctx, [[60, -90], [180, 10]], 10, RED); line(ctx, [[180, -90], [60, 10]], 10, RED); }
      ctx.restore(); }
    const nk = since(t, 'stuyvesant') + .2; if (nk > 0) { const e = FX.settle(clamp(nk / .4)); ctx.save(); ctx.translate(lerp(-300, 240, e), 110); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -46, 400, 100)); shape(ctx, PAPER, 4, rect(-200, -50, 400, 100, 4)); txt(ctx, 'PETER STUYVESANT', 0, -14, FX.DISPLAY(30)); txt(ctx, 'DIRECTOR OF NEW NETHERLAND, 1647–1664', 0, 24, FX.FONT(700, 14), '#5a4a38'); ctx.restore(); }
    if (en > 0) tag(ctx, 'TO KEEP THE ENGLISH OUT', 780, 440, en, 22);
    vig(ctx);
  }

  // ---------- s15 (tone shift): the wall goes up in 1653; much of the labor by enslaved Africans ----------
  function s15(ctx, lt, dur, t) {
    const wu = since(t, 'wallup'), en = since(t, 'enslaved'), sn = since(t, 'since');
    ctx.save(); cam(ctx, lerp(1.0, 1.09, ease.sine(clamp(lt / dur))), 380, 420);
    dutchCorner(ctx, t, { wall: wu > -.5 ? clamp((wu + .5) / 5.5) : 0, grey: .55 });
    // the builders as silhouettes carrying and setting the logs (no faces)
    for (let i = 0; i < 5; i++) { const x = 140 + i * 120, y = 700 + (i % 2) * 24; sil(ctx, x, y, .5, t * .6, i, { still: i % 2 === 0 }); if (i % 2) line(ctx, [[x - 40, y - 150], [x + 60, y - 170]], 12, '#4a4038'); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha = .25; shape(ctx, '#1d1a17', 0, rect(0, 0, W, H)); ctx.restore();
    FX.dateTag(ctx, 'WALL STREET · 1653');
    if (en > -.2) { ctx.save(); ctx.globalAlpha = clamp((en + .2) / .8); txt(ctx, 'MUCH OF THE LABOR: ENSLAVED AFRICANS', 640, 120, FX.DISPLAY(34), '#f4ecd8'); ctx.restore(); }
    if (sn > -.2) { ctx.save(); ctx.globalAlpha = clamp((sn + .2) / .8); txt(ctx, 'BROUGHT HERE BY THE COMPANY SINCE THE 1620s', 640, 640, FX.DISPLAY(26), '#f4ecd8'); ctx.restore(); }
    vig(ctx, .8);
  }

  // ---------- s16 (tone shift): 1711, the city's slave market at the foot of the same street; by the mid-1700s about one New Yorker in five enslaved ----------
  function s16(ctx, lt, dur, t) {
    const mk = since(t, 'market'), of = since(t, 'onefive');
    ctx.save(); cam(ctx, lerp(1.0, 1.07, ease.sine(clamp(lt / dur))), 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, 420, [[0, '#8a9aaa'], [1, '#d8d4c8']]), 0, rect(-100, -100, 1500, 600));
    T.blurred(ctx, 1, () => shape(ctx, '#8aa08a', 0, c => { c.moveTo(-100, 360); for (let x = -100; x <= 1400; x += 110) c.quadraticCurveTo(x + 55, 336, x + 110, 360); c.lineTo(1400, 372); c.lineTo(-100, 372); c.closePath(); }));
    shape(ctx, grad(ctx, 0, 368, 0, 760, [[0, '#7aa0b0'], [1, '#4a7a90']]), 0, rect(-100, 368, 1500, 400));
    // the foot of Wall Street at the river: an empty open-sided market house on the shore (no people depicted)
    shape(ctx, '#9a8a6a', 4, poly([[-100, 560], [760, 520], [760, 800], [-100, 800]]));
    shape(ctx, '#6a5a48', 4, poly([[180, 330], [620, 330], [660, 380], [140, 380]])); for (const x of [180, 300, 420, 540]) shape(ctx, '#7a6a58', 3, rect(x, 380, 22, 160)); shape(ctx, '#5a4a38', 3, rect(150, 530, 500, 20));
    ctx.restore();
    ctx.save(); ctx.globalAlpha = .3; shape(ctx, '#1d1a17', 0, rect(0, 0, W, H)); ctx.restore();
    FX.dateTag(ctx, 'FOOT OF WALL STREET · 1711');
    if (mk > -.2) { ctx.save(); ctx.globalAlpha = clamp((mk + .2) / .8); txt(ctx, 'THE CITY\'S OFFICIAL SLAVE MARKET', 640, 120, FX.DISPLAY(34), '#f4ecd8'); ctx.restore(); }
    // about one New Yorker in five
    if (of > -.3) { const k = clamp((of + .3) / .8); for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = k; const x = 860 + i * 74, y = 600; shape(ctx, i === 2 ? '#f4ecd8' : 'rgba(244,236,216,.3)', 3, c => { c.moveTo(x - 20, y); c.lineTo(x - 18, y - 60); c.quadraticCurveTo(x, y - 72, x + 18, y - 60); c.lineTo(x + 20, y); c.closePath(); }); shape(ctx, i === 2 ? '#f4ecd8' : 'rgba(244,236,216,.3)', 3, circle(x, y - 84, 16)); ctx.restore(); }
      ctx.save(); ctx.globalAlpha = k; txt(ctx, 'MID-1700s: ABOUT 1 IN 5 NEW YORKERS ENSLAVED', 1010, 660, FX.FONT(800, 17), '#f4ecd8'); ctx.restore(); }
    vig(ctx, .8);
  }

  // ---------- s17: the street from the opening is named for that wall (today's corner with the palisade's ghost) ----------
  function s17(ctx, lt, dur, t) {
    const nm = since(t, 'named'), gh = nm > -.6 ? clamp((nm + .6) / .8) : 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380); corner(ctx, t, { fg: false, crowd: .6 });
    if (gh > 0) { ctx.save(); ctx.globalAlpha = .55 * gh; for (let k = 0; k < 40; k++) { const s2 = lerp(1.05, .12, k / 39), x = N.LX(s2) + 330 * s2, y = N.PY(760, s2), h = 300 * s2; shape(ctx, '#8a6038', 2, c => { c.moveTo(x - 12 * s2, y); c.lineTo(x - 12 * s2, y - h); c.lineTo(x, y - h - 18 * s2); c.lineTo(x + 12 * s2, y - h); c.lineTo(x + 12 * s2, y); c.closePath(); }); } ctx.restore(); }
    ctx.restore();
    if (gh > 0) glow(ctx, 1110, 181, 90 * gh, 'rgba(255,240,150,.6)');
    if (nm > 0) strip(ctx, 'WALL STREET — NAMED FOR THAT WALL', 560, 100, nm, { px: 32 });
    vig(ctx);
  }

  // ---------- s18: the wall never does its job: 1664, four English warships sail into the harbor ----------
  function s18(ctx, lt, dur, t) {
    const fw = since(t, 'four'), dm = since(t, 'demand');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 420);
    sky(ctx, t, '#6ab0e0', '#fde0b0'); waterBand(ctx, 420, t, -600, 2200, '#3a98b8');
    // New Amsterdam on its point, the wall behind the town facing inland
    shape(ctx, '#8ab868', 4, c => { c.moveTo(-100, 420); c.quadraticCurveTo(300, 330, 760, 400); c.lineTo(760, 430); c.lineTo(-100, 440); c.closePath(); });
    for (let i = 0; i < 12; i++) { const x = 60 + i * 52; shape(ctx, ['#c8643a', '#e8b07a', '#b85a3a'][i % 3], 2.5, rect(x, 370 - (i % 3) * 8, 36, 40)); shape(ctx, '#8a3a2a', 2, poly([[x - 2, 370 - (i % 3) * 8], [x + 18, 350 - (i % 3) * 8], [x + 38, 370 - (i % 3) * 8]])); }
    for (let i = 0; i < 30; i++) line(ctx, [[30 + i * 22, 352], [30 + i * 22, 320]], 5, '#7a5430'); tag(ctx, 'THE WALL (FACING INLAND)', 330, 296, since(t, 'never'), 16);
    // the four English warships come in from the sea
    for (let i = 0; i < 4; i++) { const k = fw > -.6 ? ease.out(clamp((fw + .6 - i * .25) / 2.4)) : 0; ship(ctx, lerp(1500 + i * 120, 760 + i * 130, k), 520 + i * 40, .42 + i * .04, t, 'en'); }
    harbor(ctx, 200, 860, 420, t, { look: [.9, -.3], eyes: blink(t, 116.0), mouth: dm > 0 ? 'o' : 'smile' });
    ctx.restore();
    FX.dateTag(ctx, 'NEW AMSTERDAM · 1664');
    if (since(t, 'job') > 0) strip(ctx, 'THE WALL NEVER DOES ITS JOB', 640, 100, since(t, 'job'), { px: 34, color: RED });
    if (dm > 0) tag(ctx, 'FOUR ENGLISH WARSHIPS DEMAND THE TOWN', 900, 680, dm, 20);
    vig(ctx);
  }

  // ---------- s19: Stuyvesant wants to fight; the townspeople don't — the English promise property, trade and religion ----------
  function s19(ctx, lt, dur, t) {
    const fg = since(t, 'fight'), tp = since(t, 'townspeople');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 420); dutchCorner(ctx, t, { wall: 1 });
    ctx.restore();
    stuyvesant(ctx, 260, 760, .9, t, { still: true, reach: fg > 0 });
    if (fg > 0) { const a = Math.sin(t * 8) * .3; ctx.save(); ctx.translate(330, 420); ctx.rotate(-.8 + a); line(ctx, [[0, 0], [0, -150]], 8, '#d8d8e0'); shape(ctx, '#c8a040', 2.5, rect(-14, -6, 28, 10)); ctx.restore(); }
    if (tp > -.2) for (let i = 0; i < 5; i++) { const k = clamp((tp + .2 - i * .1) / .4); if (k <= 0) continue; dutchman(ctx, 640 + i * 120, 780 + (i % 2) * 14, .62, t, i, { still: true }); }
    if (tp > .4) { shape(ctx, '#f4ead4', 3.5, rect(700, 380, 150, 90, 4)); for (let i = 0; i < 4; i++) line(ctx, [[714, 398 + i * 16], [836, 398 + i * 16]], 2, '#8a7a6a'); txt(ctx, 'PLEASE DON\'T', 775, 456, FX.FONT(800, 13), RED); }
    const P = [['property', 'PROPERTY', 'house'], ['trade', 'TRADE', 'coin'], ['religion', 'RELIGION', 'church']];
    P.forEach(([k, l, ic], i) => { const kk = since(t, k); if (kk <= -.2) return; const s = pop(kk + .2); ctx.save(); ctx.translate(620 + i * 210, 160); ctx.scale(s, s); shape(ctx, PAPER, 4, rect(-90, -70, 180, 140, 10));
      if (ic === 'house') { shape(ctx, '#c8643a', 3, rect(-30, -20, 60, 44)); shape(ctx, '#8a3a2a', 3, poly([[-38, -20], [0, -50], [38, -20]])); }
      if (ic === 'coin') { for (let j = 0; j < 3; j++) shape(ctx, GOLD, 3, ellipse(0, 20 - j * 14, 34, 10)); }
      if (ic === 'church') { shape(ctx, '#e8dcc4', 3, rect(-24, -14, 48, 40)); shape(ctx, '#5a6a7a', 3, poly([[-30, -14], [0, -48], [30, -14]])); line(ctx, [[0, -48], [0, -66]], 4); }
      txt(ctx, l, 0, 50, FX.DISPLAY(22)); ctx.restore(); });
    if (since(t, 'promising') > 0) tag(ctx, 'THE ENGLISH PROMISE: EVERYONE KEEPS THEIR…', 830, 260, since(t, 'promising'), 16);
    vig(ctx);
  }

  // ---------- s20: the town changes hands without a shot; renamed for the king's brother, the Duke of York ----------
  function s20(ctx, lt, dur, t) {
    const ch = since(t, 'changes'), sh = since(t, 'shot'), rn = since(t, 'renamed'), dk = since(t, 'duke');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    sky(ctx, t, '#6ab0e0', '#fde0b0'); waterBand(ctx, 520, t, -600, 2200, '#3a98b8');
    // the fort's flagpole: Dutch colours down, English colours up
    shape(ctx, '#a8946a', 4, poly([[300, 520], [400, 440], [880, 440], [980, 520]])); shape(ctx, '#c8b48a', 3.5, rect(520, 380, 240, 70)); shape(ctx, '#b85a3a', 3.5, poly([[510, 380], [640, 330], [770, 380]]));
    line(ctx, [[640, 330], [640, 80]], 7, '#5a3a20');
    const down = ch > 0 ? ease.inOut(clamp(ch / 1.0)) : 0, up = ch > 1.0 ? ease.inOut(clamp((ch - 1.0) / 1.0)) : 0, w = Math.sin(t * 4) * 4;
    { const y = lerp(90, 300, down); ctx.save(); ctx.globalAlpha = 1 - down * .6; for (let i = 0; i < 3; i++) shape(ctx, ['#e8742a', '#f4efe6', '#2f4a8a'][i], 0, poly([[644, y + i * 18], [760, y + i * 18 + w], [760, y + i * 18 + 18 + w], [644, y + i * 18 + 18]])); ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.strokeRect(644, y, 116, 54); ctx.restore(); }
    if (up > 0) { const y = lerp(300, 90, up); shape(ctx, '#fff', 3, poly([[644, y], [760, y + w], [760, y + 60 + w], [644, y + 60]])); shape(ctx, RED, 0, rect(694, y + 2 + w * .5, 14, 56)); shape(ctx, RED, 0, rect(646, y + 24 + w * .5, 112, 12)); }
    for (let i = 0; i < 3; i++) ship(ctx, 160 + i * 380, 620 + (i % 2) * 20, .36, t, 'en');
    ctx.restore();
    if (sh > -.2) FX.stamp(ctx, 'NOT A SHOT FIRED', 300, 200, sh + .2, { color: GREEN, size: 40 });
    // the sign changes
    if (rn > -.2) { const s = pop(rn + .2), sw = dk > 0 ? ease.inOut(clamp(dk / .6)) : 0; ctx.save(); ctx.translate(980, 200); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, '#8a5a34', 4.5, rect(-200, -60, 400, 120, 8));
      ctx.save(); ctx.scale(1, Math.max(.02, Math.abs(1 - sw * 2))); txt(ctx, sw < .5 ? 'NIEUW AMSTERDAM' : 'NEW YORK', 0, 4, FX.DISPLAY(sw < .5 ? 34 : 54), '#f4efe2'); ctx.restore(); ctx.restore(); }
    if (dk > 0) { const e = FX.settle(clamp(dk / .4)); ctx.save(); ctx.translate(lerp(1500, 980, e), 360); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -46, 360, 100)); shape(ctx, PAPER, 4, rect(-180, -50, 360, 100, 4)); txt(ctx, 'JAMES, DUKE OF YORK', 0, -14, FX.DISPLAY(28)); txt(ctx, 'THE KING\'S BROTHER', 0, 24, FX.FONT(700, 15), '#5a4a38'); ctx.restore(); }
    vig(ctx);
  }

  // ---------- s21: notice: a city switched countries and went back to work the next morning ----------
  function s21(ctx, lt, dur, t) {
    const mo = since(t, 'morning'), sw = since(t, 'switched');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 420); dutchCorner(ctx, t, { wall: 1 });
    // everyone back at work: a baker, merchants with pelts, a cart
    for (let i = 0; i < 6; i++) dutchman(ctx, 220 + i * 170 + Math.sin(t * .4 + i) * 16, 740 + (i % 2) * 22, .5, t, i, { step: 1 });
    shape(ctx, '#a87a4a', 4, rect(820, 560, 160, 60, 6)); for (let i = 0; i < 5; i++) pelt(ctx, 840 + i * 28, 552, .55); shape(ctx, '#3a2a20', 3, circle(840, 624, 18)); shape(ctx, '#3a2a20', 3, circle(960, 624, 18));
    // the new flag over the street
    { const x = 120, y = 120, w = Math.sin(t * 4) * 4; line(ctx, [[x, y], [x, 420]], 6, '#5a3a20'); shape(ctx, '#fff', 3, poly([[x + 4, y], [x + 110, y + w], [x + 110, y + 56 + w], [x + 4, y + 56]])); shape(ctx, RED, 0, rect(x + 50, y + 2, 12, 52)); shape(ctx, RED, 0, rect(x + 6, y + 22, 102, 12)); }
    ctx.restore();
    // a rooster crows
    if (mo > -.6) { const k = clamp((mo + .6) / .4); ctx.save(); ctx.translate(1100, 520); ctx.scale(k, k); shape(ctx, '#e8742a', 3, ellipse(0, 0, 30, 22)); shape(ctx, '#2f3a2a', 3, poly([[-26, -6], [-56, -30], [-46, 10]])); shape(ctx, '#e8742a', 3, circle(24, -24, 14)); shape(ctx, RED, 0, poly([[18, -38], [26, -48], [32, -36]])); shape(ctx, GOLD, 0, poly([[36, -24], [50, -20], [36, -16]])); ctx.restore();
      ctx.save(); ctx.globalAlpha = k; txt(ctx, 'COCK-A-DOODLE-DOO!', 1080, 450, FX.DISPLAY(22), '#5a3a20'); ctx.restore(); }
    FX.dateTag(ctx, 'NEW YORK · THE NEXT MORNING');
    if (sw > -.2) strip(ctx, 'SWITCHED COUNTRIES…', 560, 110, sw + .2, { px: 34 });
    if (since(t, 'work') > 0) strip(ctx, '…BACK TO WORK', 640, 210, since(t, 'work'), { px: 34, color: GREEN, rot: .02 });
    vig(ctx);
  }

  // ---------- s22: never built around a flag — built around a harbor — very hard to kill ----------
  function s22(ctx, lt, dur, t) {
    const fl = since(t, 'flag'), hb = since(t, 'harbor'), kl = since(t, 'kill');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#4aa8e8'], [1, '#ffe2a8']]), 0, rect(-200, -200, 1700, 900)); glow(ctx, 640, 420, 480, 'rgba(255,240,190,.55)'); clouds(ctx, t, [80, 140]);
    waterBand(ctx, 470, t, -600, 2200, '#3aa0c0');
    // flags flip over the harbor's head, faster and faster; the harbor doesn't change
    const flags = ['nl', 'en', 'nl', 'en', 'us'], i = fl > 0 ? Math.min(4, Math.floor(fl / .5)) : 0, f = flags[hb > 0 ? 4 : i];
    { const x = 860, y = 160, w = Math.sin(t * 4) * 4; line(ctx, [[x, y], [x, 470]], 6, '#5a3a20');
      if (f === 'nl') for (let k = 0; k < 3; k++) shape(ctx, ['#e8742a', '#f4efe6', '#2f4a8a'][k], 0, poly([[x + 4, y + k * 20], [x + 130, y + k * 20 + w], [x + 130, y + k * 20 + 20 + w], [x + 4, y + k * 20 + 20]]));
      if (f === 'en') { shape(ctx, '#fff', 0, poly([[x + 4, y], [x + 130, y + w], [x + 130, y + 60 + w], [x + 4, y + 60]])); shape(ctx, RED, 0, rect(x + 58, y, 14, 60)); shape(ctx, RED, 0, rect(x + 4, y + 24, 126, 12)); }
      if (f === 'us') { for (let k = 0; k < 7; k++) shape(ctx, k % 2 ? '#fff' : RED, 0, poly([[x + 4, y + k * 9], [x + 130, y + k * 9 + w], [x + 130, y + k * 9 + 9 + w], [x + 4, y + k * 9 + 9]])); shape(ctx, '#2a3a7a', 0, rect(x + 4, y, 52, 34)); }
      ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.strokeRect(x + 4, y, 126, 60); }
    harbor(ctx, 520, 760, 560, t, { look: [.5, -.4], eyes: blink(t, 145.0, 148.2), mouth: 'smile' });
    ctx.restore();
    if (fl > -.2 && hb < 0) strip(ctx, 'NEVER BUILT AROUND A FLAG', 520, 100, fl + .2, { px: 34 });
    if (hb > -.2) strip(ctx, 'BUILT AROUND A HARBOR', 520, 100, hb + .2, { px: 40, color: '#2f6a9a' });
    if (kl > -.2) FX.stamp(ctx, 'VERY HARD TO KILL', 900, 600, kl + .2, { color: RED, size: 40 });
    vig(ctx);
  }

  // ---------- s23: people are about to test that (storm clouds over the harbor) ----------
  function s23(ctx, lt, dur, t) {
    const dk = clamp(lt / 1.4);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#3a4a6a'], [1, '#c8a080']]), 0, rect(0, 0, W, H));
    waterBand(ctx, 470, t * 1.6, -600, 2200, '#2a6a8a');
    for (let i = 0; i < 6; i++) { const x = lerp(1500, 200 + i * 160, ease.out(dk)), y = 120 + (i % 3) * 50; shape(ctx, '#3a3a4a', 3, smooth([[x - 120, y + 30], [x - 80, y - 20], [x, y - 40], [x + 90, y - 16], [x + 120, y + 30]])); }
    harbor(ctx, 640, 780, 520, t, { look: [.8, -.6], eyes: 1, mouth: 'o' });
    strip(ctx, 'PEOPLE ARE ABOUT TO TEST THAT', 640, 600, since(t, 'test') + .2, { px: 34, color: RED });
    vig(ctx, .7);
  }

  const cut = [[0, s1], [7.55, s2], [12.75, s3], [17.55, s4], [23.35, s5], [26.85, s6], [35.95, s7], [43.45, s8], [49.85, s9], [54.55, s10], [62.25, s11], [71.55, s12], [78.55, s13], [84.05, s14],
    [89.85, s15], [99.45, s16], [109.95, s17], [113.15, s18], [121.25, s19], [130.45, s20], [136.85, s21], [142.65, s22], [150.15, s23]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: .45, type: 'paper', gain: .4 }, { t: A.king, type: 'thud', gain: .4 }, { t: A.church, type: 'thud', gain: .4 }, { t: A.company2, type: 'click', gain: .5 },
    { t: A.beaver, type: 'rattle', gain: .4 }, { t: A.trading - .3, type: 'thud', gain: .4 }, { t: A.newam, type: 'thud', gain: .7 }, { t: A.twentyfour, type: 'click', gain: .4 }, { t: A.exists - .6, type: 'thud', gain: .7 },
    { t: A.one, type: 'paper', gain: .5 }, { t: A.sixty - .3, type: 'swell', gain: .4 }, { t: A.deed + .3, type: 'click', gain: .4 }, { t: A.who + .3, type: 'click', gain: .4 }, { t: A.handed + .3, type: 'click', gain: .4 },
    { t: A.nobeads - .2, type: 'thud', gain: .6 }, { t: A.updated - .3, type: 'thud', gain: .6 }, { t: A.thousand - .3, type: 'ratchet', gain: .4 }, { t: A.dutch2 - .3, type: 'paper', gain: .4 },
    { t: A.lenape - .3, type: 'paper', gain: .4 }, { t: A.inference - .2, type: 'thud', gain: .5 }, { t: A.pushed, type: 'swell', gain: .3 }, { t: A.muddy - .5, type: 'whoosh', gain: .4 }, { t: A.wall - .3, type: 'paper', gain: .4 },
    { t: A.never, type: 'thud', gain: .5 }, { t: A.four, type: 'swell', gain: .5 }, { t: A.fight, type: 'click', gain: .4 }, { t: A.property, type: 'paper', gain: .3 }, { t: A.trade, type: 'paper', gain: .3 }, { t: A.religion, type: 'paper', gain: .3 },
    { t: A.changes, type: 'creak', gain: .4 }, { t: A.shot - .2, type: 'thud', gain: .6 }, { t: A.duke, type: 'whoosh', gain: .4 }, { t: A.morning - .6, type: 'click', gain: .4 }, { t: A.flag, type: 'whoosh', gain: .3 }, { t: A.kill - .2, type: 'thud', gain: .7 },
    { t: A.test - .3, type: 'boom', gain: .5 },
  ];
  // music out for the wall's builders and the slave market; back on "And the wall never does its job"
  const moods = [{ t: 0, mood: 'under' }, { t: A.version - .3, mood: 'still' }, { t: A.historians - .3, mood: 'mystery' }, { t: A.town - .3, mood: 'under' }, { t: A.wallup - .4, mood: 'silence' }, { t: A.never - .4, mood: 'under' }, { t: A.test - .6, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-spark.mp3', shots, sfx, moods, images: { schagen: 'assets/img/schagen-letter-1626.jpg', castello: 'assets/img/castello-plan-full.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
