/* New York — Beat 4a "The escalation chain" 1776 → Erie Canal (narration-escalation-a.mp3 = 1.8 s chapter pause + narration-full.mp3 268.5–361.6 s).
 * Anchors = full-recording word times − 266.7. Fires: buildings and smoke only, no victims. Washington's quote: letter to John Hancock, 22 Sept 1776. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { sept: 269.03, y1776: 269.6, same: 271.31, revolution: 272.71, washington: 274.63, driven: 276.25, island: 276.82, british: 277.7, marched: 278.35, days: 279.83, midnight: 281.0,
    fire: 281.82, southern: 282.89, wash2: 284.18, watching: 284.85, hills: 285.52, north: 286.03, writes: 287.25, congress: 287.61, burned: 288.44, sunrise: 289.62, morning: 290.68,
    somewhere: 292.36, four: 293.11, thousand: 294.1, buildings: 294.78, quarter: 296.8, blames: 299.27, nobody: 300.62, proves: 301.2, stay: 303.27, seven: 303.72, shanty: 304.9, blocks: 306.62,
    newyork: 307.77, finished: 308.69, one: 310.18, harbor: 311.59, burn: 312.25, sail: 313.45, y1783: 314.12, people: 315.6, census: 317.98, y1790: 318.69, thirty: 320.61, residents: 322.84,
    biggest: 325.05, country: 325.94, best: 327.98, ever: 329.41, y1825: 330.85, state: 332.46, clinton: 334.19, opens: 334.98, ditch: 335.49, forty: 336.61, wide: 337.23, four2: 337.84, deep: 338.45,
    miles363: 339.01, miles: 340.68, hudson: 342.28, erie: 343.5, before: 344.55, ton: 346.11, buffalo: 346.7, hundred: 348.6, after: 350.02, ten: 351.15, cheapest: 352.49, america: 354.1,
    world: 355.39, harbor2: 357.16, population: 358.58, quadruples: 359.25, years2: 360.8 };
  const A = {}; for (const k in F) A[k] = F[k] - 266.7; A.end = 94.9;

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


  const { harbor, walker, oldCorner, notice, obituaryShot, frame, ship, MAN, RL, redcoat, patriot, colonist } = N;
  const counter = (ctx, x, y, val, k, label, col = GOLD, px = 54) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = FX.DISPLAY(px); const w = ctx.measureText(val).width + 60;
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-w / 2 + 6, -px * .8 + 6, w, px * 1.6)); shape(ctx, '#1d1a17', 0, rect(-w / 2, -px * .8, w, px * 1.6, 10)); txt(ctx, val, 0, 3, FX.DISPLAY(px), col); if (label) txt(ctx, label, 0, px * .8 + 22, FX.FONT(800, 16), '#fff'); ctx.restore(); };
  const roll = (a, b, k) => Math.round(lerp(a, b, ease.out(clamp(k)))).toLocaleString('en-US');

  // NY State from lon/lat (for the canal)
  const SP = ([lon, lat]) => [640 + (lon + 75.7) * 125, 380 - (lat - 42.7) * 165];
  const ERIE = [[-80.6, 41.9], [-79.6, 42.2], [-78.9, 42.82], [-79.05, 42.95], [-80.6, 42.6]].map(SP);
  const ONT = [[-79.9, 43.25], [-78.0, 43.36], [-76.8, 43.3], [-76.2, 43.53], [-76.3, 44.05], [-77.5, 44.05], [-79.0, 43.7], [-79.9, 43.6]].map(SP);
  const ATL = [[-74.2, 40.25], [-74.0, 40.47], [-73.9, 40.57], [-73.3, 40.63], [-72.4, 40.82], [-71.9, 41.05], [-71.3, 41.1], [-71.3, 40.25]].map(SP);
  const SOUND = [[-73.8, 40.82], [-73.4, 40.9], [-72.4, 41.0], [-71.9, 41.07], [-71.6, 41.15], [-71.9, 41.28], [-72.9, 41.25], [-73.65, 41.0]].map(SP);
  const HUD = [[-74.02, 40.68], [-73.95, 41.0], [-73.96, 41.6], [-73.88, 42.2], [-73.75, 42.65]].map(SP);
  const CANAL = [[-73.75, 42.65], [-73.94, 42.81], [-74.6, 42.95], [-75.23, 43.1], [-76.15, 43.05], [-76.8, 43.05], [-77.61, 43.16], [-78.69, 43.17], [-78.88, 42.89]].map(SP);
  const TOWNS = [['NEW YORK', -74.0, 40.71], ['ALBANY', -73.75, 42.65], ['UTICA', -75.23, 43.1], ['SYRACUSE', -76.15, 43.05], ['ROCHESTER', -77.61, 43.16], ['BUFFALO', -78.88, 42.89]];
  function stateMap(ctx, t, drawK, o = {}) {
    shape(ctx, '#e8dcb0', 0, rect(-400, -300, 2100, 1300)); for (let i = 0; i < 60; i++) shape(ctx, 'rgba(120,160,90,.25)', 0, circle((i * 137) % 1300, (i * 71) % 740, 22));
    for (const pg of [ERIE, ONT, ATL, SOUND]) shape(ctx, '#6ab8d8', 3.5, poly(pg));
    ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = '#3a8ac0'; ctx.beginPath(); ctx.moveTo(...HUD[0]); HUD.slice(1).forEach(p => ctx.lineTo(...p)); ctx.stroke(); ctx.restore();
    // the canal draws itself from Albany west to Buffalo
    if (drawK > 0) { const n = CANAL.length - 1, up = drawK * n; ctx.save(); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.strokeStyle = '#1d6aa8'; ctx.beginPath(); ctx.moveTo(...CANAL[0]); for (let i = 1; i <= Math.floor(up); i++) ctx.lineTo(...CANAL[i]); if (up < n) { const i = Math.floor(up), f = up - i; ctx.lineTo(lerp(CANAL[i][0], CANAL[i + 1][0], f), lerp(CANAL[i][1], CANAL[i + 1][1], f)); } ctx.stroke();
      ctx.strokeStyle = '#8ad0ff'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    for (const [nm, lon, lat] of TOWNS) { const [x, y] = SP([lon, lat]); shape(ctx, nm === 'NEW YORK' ? RED : '#1d1a17', 2.5, circle(x, y, nm === 'NEW YORK' ? 9 : 6)); txt(ctx, nm, x + (nm === 'BUFFALO' ? -10 : 0), y + (nm === 'ALBANY' || nm === 'NEW YORK' ? 22 : -18), FX.FONT(800, 15), '#3a2a20'); }
    txt(ctx, 'LAKE ERIE', SP([-79.9, 42.35])[0], SP([-79.9, 42.35])[1], FX.FONT(700, 14), '#2f5a7a'); txt(ctx, 'LAKE ONTARIO', SP([-77.8, 43.62])[0], SP([-77.8, 43.62])[1], FX.FONT(700, 14), '#2f5a7a');
    txt(ctx, 'HUDSON', SP([-73.7, 41.5])[0] + 30, SP([-73.7, 41.5])[1], FX.FONT(700, 14), '#2f5a7a'); txt(ctx, 'ATLANTIC', SP([-72.3, 40.5])[0], SP([-72.3, 40.5])[1], FX.FONT(700, 16), '#2f5a7a');
  }

  // ---------- a1: chapter card — September 1776, same streets (the corner, colonial) ----------
  function a1(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 400); oldCorner(ctx, t, { era: '1776' });
    for (let i = 0; i < 5; i++) colonist(ctx, 220 + i * 210 + Math.sin(t * .3 + i) * 20, 740 + (i % 2) * 20, .5, t, i, { step: 1 });
    ctx.restore();
    const card = clamp(1 - Math.max(0, lt - 1.9) / .3);
    if (card > 0) { ctx.save(); ctx.globalAlpha = card; shape(ctx, 'rgba(20,10,10,.35)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 4', 640, 230, lt - .05, { px: 30 }); strip(ctx, 'THE ESCALATION CHAIN', 640, 330, lt - .4, { px: 54, color: RED, rot: .02 }); ctx.restore(); }
    if (lt > 1.9) { FX.dateTag(ctx, 'WALL & BROAD · SEPTEMBER 1776'); strip(ctx, 'SAME STREETS', 640, 110, since(t, 'same') + .2, { px: 40 }); }
    vig(ctx);
  }

  // ---------- a2: the Revolution — Washington's army driven off the island, the British march in (map) ----------
  function a2(ctx, lt, dur, t) {
    const dv = since(t, 'driven'), br = since(t, 'british');
    shape(ctx, '#7cc0dc', 0, rect(0, 0, W, H)); for (let i = 0; i < 14; i++) line(ctx, [[((i * 130 + t * 10) % 1400) - 60, 80 + i * 46], [((i * 130 + t * 10) % 1400) - 20, 80 + i * 46]], 3, 'rgba(255,255,255,.5)');
    const isl = MAN.map(RL); shape(ctx, '#a8c878', 4.5, poly(isl)); ctx.save(); ctx.beginPath(); poly(isl)(ctx); ctx.clip(); for (let i = 0; i < 40; i++) shape(ctx, '#7fa858', 0, circle(120 + (i * 97) % 1100, 330 + (i * 53) % 140, 12)); shape(ctx, '#c8643a', 0, rect(0, 0, 200, H)); ctx.restore();
    // Washington's army: a blue column retreating north
    if (dv > -.4) { const k = ease.inOut(clamp((dv + .4) / 1.6)), [x0, y0] = RL([-74.01, 40.71]), [x1, y1] = RL([-73.955, 40.81]); ctx.save(); ctx.setLineDash([18, 10]); line(ctx, [[x0, y0], [lerp(x0, x1, k), lerp(y0, y1, k)]], 12, BLUE); ctx.restore();
      if (k > .95) { shape(ctx, BLUE, 3, poly([[x1 + 26, y1 - 4], [x1 - 6, y1 - 24], [x1 - 2, y1 + 16]])); tag(ctx, 'WASHINGTON\'S ARMY → NORTH', x1, y1 + 60, dv - 1.2, 18); } }
    // the British: red arrows landing from the East River and marching into the town
    if (br > -.3) { const k = ease.out(clamp((br + .3) / 1.2)), [lx, ly] = RL([-73.975, 40.742]); for (let i = 0; i < 3; i++) { const y = ly + 60 + i * 30; line(ctx, [[lx + 60 - k * 40, y + 120], [lx - k * 120 + i * 20, y + 40 - k * 60]], 10, RED); }
      const [tx, ty] = RL([-74.012, 40.708]); if (k > .8) { line(ctx, [[lx - 90, ly - 20], [tx + 40, ty]], 10, RED); shape(ctx, RED, 3, poly([[tx + 20, ty - 14], [tx + 50, ty + 12], [tx + 14, ty + 18]])); } tag(ctx, 'THE BRITISH MARCH IN', lx + 40, ly + 200, br, 18); }
    FX.dateTag(ctx, 'MANHATTAN · SEPTEMBER 1776');
    strip(ctx, 'THE REVOLUTION HAS ARRIVED', 640, 92, since(t, 'revolution') + .2, { px: 34 });
    vig(ctx);
  }

  // ---------- a3: days later, around midnight, a fire starts near the southern tip ----------
  function a3(ctx, lt, dur, t) {
    const fr = since(t, 'fire'), fk = fr > -.2 ? clamp((fr + .2) / 3) : 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 360); oldCorner(ctx, t, { era: '1776', night: 1, fire: fk * .8 }); ctx.restore();
    FX.dateTag(ctx, 'SEPTEMBER 1776 · AROUND MIDNIGHT');
    if (since(t, 'southern') > 0) tag(ctx, 'NEAR THE SOUTHERN TIP', 640, 600, since(t, 'southern'), 24);
    vig(ctx, .7);
  }

  // ---------- a4: Washington watches from the hills at the north end; writes to Congress: "till after Sun rise the next morning" ----------
  function a4(ctx, lt, dur, t) {
    const wr = since(t, 'writes'), sr = since(t, 'sunrise');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#0f1a34'], [.7, '#3a2a4a'], [1, '#c8643a']]), 0, rect(-200, -200, 1700, 800));
    for (let i = 0; i < 40; i++) { ctx.save(); ctx.globalAlpha = .5 + .4 * Math.sin(t * 2 + i); shape(ctx, '#fff', 0, circle((i * 211) % 1400 - 60, 20 + (i * 97) % 220, 1.6)); ctx.restore(); }
    // the far south of the island glows on the horizon
    glow(ctx, 900, 420, 320, 'rgba(255,120,40,.55)'); for (let k = 0; k < 6; k++) { const p = (t * .12 + k / 6) % 1; ctx.save(); ctx.globalAlpha = .4 * (1 - p); shape(ctx, '#3a3040', 0, circle(860 + k * 20 + p * 60, 400 - p * 240, 30 + p * 50)); ctx.restore(); }
    shape(ctx, '#2a3a2a', 0, c => { c.moveTo(-200, 440); c.quadraticCurveTo(600, 400, 1500, 450); c.lineTo(1500, 470); c.lineTo(-200, 470); c.closePath(); });
    // Harlem Heights: a dark hill, Washington and an aide watching
    shape(ctx, '#1f2a24', 4, c => { c.moveTo(-200, 820); c.quadraticCurveTo(200, 500, 640, 600); c.quadraticCurveTo(900, 640, 1500, 820); c.closePath(); });
    patriot(ctx, 330, 640, .66, t, 2, { still: true }); patriot(ctx, 230, 660, .58, t, 5, { still: true, tricorn: true });
    ctx.restore();
    const nk = since(t, 'wash2') + .2; if (nk > 0) { const e = FX.settle(clamp(nk / .4)); ctx.save(); ctx.translate(lerp(-300, 230, e), 110); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -46, 400, 100)); shape(ctx, PAPER, 4, rect(-200, -50, 400, 100, 4)); txt(ctx, 'GEORGE WASHINGTON', 0, -14, FX.DISPLAY(30)); txt(ctx, 'ON THE HEIGHTS AT THE NORTH END', 0, 24, FX.FONT(700, 14), '#5a4a38'); ctx.restore(); }
    // the letter
    if (wr > -.2) { const e = FX.settle(clamp((wr + .2) / .5)); ctx.save(); ctx.translate(lerp(1500, 860, e), 300); ctx.rotate(.03); ctx.scale(1.3, 1.3); shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-226, -116, 460, 240)); shape(ctx, '#f4ead4', 4, rect(-230, -120, 460, 240, 4));
      txt(ctx, 'TO JOHN HANCOCK, PRESIDENT OF CONGRESS', 0, -88, FX.FONT(800, 14), '#5a4a38'); txt(ctx, '22 SEPT 1776', 0, -64, FX.FONT(700, 14), '#5a4a38');
      txt(ctx, '"…continued to burn', 0, -14, 'italic 600 28px Georgia', '#3a2a20'); txt(ctx, 'pretty rapidly till after', 0, 22, 'italic 600 28px Georgia', '#3a2a20');
      ctx.save(); if (sr > 0) { ctx.globalAlpha = clamp(sr / .4); shape(ctx, 'rgba(255,232,90,.6)', 0, rect(-150, 42, 300, 34)); } ctx.restore(); txt(ctx, 'Sun rise the next morning."', 0, 58, 'italic 700 28px Georgia', '#8a2a20'); ctx.restore(); }
    vig(ctx, .7);
  }

  // ---------- a5: between 400 and 1,000 buildings gone — as much as a quarter of the city ----------
  function a5(ctx, lt, dur, t) {
    const sw = since(t, 'somewhere'), qt = since(t, 'quarter');
    shape(ctx, '#7cc0dc', 0, rect(0, 0, W, H));
    // the town of 1776 at the southern tip: blocks of houses; the burned district spreads up the west side
    ctx.save(); ctx.translate(640, 380); ctx.rotate(-.5); const cols = 14, rows = 9;
    shape(ctx, '#c8b890', 4, rect(-460, -260, 920, 520, 30));
    const burnK = sw > -.3 ? ease.inOut(clamp((sw + .3) / 2.4)) : 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = -430 + c * 62, y = -230 + r * 54, burnt = (c + r * .6) / (cols * .9) < burnK * .5 && r < 6 && c < 11;
      shape(ctx, burnt ? '#2a2420' : ['#c8643a', '#e8b07a', '#b85a3a'][(r + c) % 3], 2, rect(x, y, 48, 40, 3)); if (burnt && (r + c) % 3 === 0) { ctx.save(); ctx.globalAlpha = .5; shape(ctx, '#5a5050', 0, circle(x + 24, y - 10, 16)); ctx.restore(); } }
    ctx.restore();
    counter(ctx, 300, 120, sw > -.2 ? (since(t, 'thousand') > 0 ? '400–1,000' : roll(0, 400, (sw + .2) / .9)) : '0', sw + .2, 'BUILDINGS GONE', '#ff9a5a');
    if (qt > -.2) { const s = pop(qt + .2); ctx.save(); ctx.translate(1030, 560); ctx.scale(s, s); shape(ctx, '#f4efe2', 4, circle(0, 0, 90)); shape(ctx, '#2a2420', 0, c => { c.moveTo(0, 0); c.arc(0, 0, 86, -Math.PI / 2, 0); c.closePath(); }); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.stroke(); txt(ctx, 'UP TO ¼ OF THE CITY', 0, 124, FX.DISPLAY(24), '#fff'); ctx.restore(); }
    FX.dateTag(ctx, 'THE GREAT FIRE · 1776');
    vig(ctx);
  }

  // ---------- a6: each side blames the other, and nobody ever proves it ----------
  function a6(ctx, lt, dur, t) {
    const bl = since(t, 'blames'), nb = since(t, 'nobody');
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#e8c8b8'], [.5, '#f4ead4'], [1, '#c8d4e8']]), 0, rect(0, 0, W, H));
    ctx.save(); ctx.globalAlpha = .35; oldCorner(ctx, t, { era: '1776', ruins: 1 }); ctx.restore();
    redcoat(ctx, 340, 740, .82, t, 1, { still: true, reach: bl > 0 }); patriot(ctx, 940, 740, .82, t, 4, { still: true, reach: bl > 0, flip: true });
    if (bl > 0) { for (const [x, d, s] of [[470, 1, 'THEY DID IT!'], [810, -1, 'NO, THEY DID!']]) { const k = pop(bl - (d < 0 ? .4 : 0)); if (k <= 0) continue; ctx.save(); ctx.translate(x, 260); ctx.scale(k, k); shape(ctx, '#fff', 4, ellipse(0, 0, 150, 56)); shape(ctx, '#fff', 0, poly([[-d * 20, 40], [d * 20, 40], [-d * 50, 90]])); txt(ctx, s, 0, 2, FX.DISPLAY(26)); ctx.restore(); } }
    if (nb > -.2) FX.stamp(ctx, 'NEVER PROVEN', 640, 560, nb + .2, { color: RED, size: 46 });
    vig(ctx);
  }

  // ---------- a7: the British stay seven years; shantytowns fill the burned-out blocks ----------
  function a7(ctx, lt, dur, t) {
    const sv = since(t, 'seven'), sh = since(t, 'shanty');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 420); oldCorner(ctx, t, { era: '1776', ruins: sh > -.5 ? 1 : .6 });
    redcoat(ctx, 300, 740, .55, t, 2, { still: true }); redcoat(ctx, 1000, 760, .52, t * 1.1, 5);
    for (let i = 0; i < 3; i++) colonist(ctx, 520 + i * 120, 760, .46, t * .8, i + 2);
    ctx.restore();
    if (sv > -.3) { const yr = Math.round(lerp(1776, 1783, ease.inOut(clamp((sv + .3) / 2.5)))); ctx.save(); ctx.translate(1100, 120); shape(ctx, PAPER, 4, rect(-110, -60, 220, 120, 8)); shape(ctx, RED, 0, rect(-110, -60, 220, 30)); txt(ctx, String(yr), 0, 16, FX.DISPLAY(48)); ctx.restore(); }
    if (sv > 0) strip(ctx, 'THE BRITISH STAY 7 YEARS', 460, 110, sv, { px: 32, color: RED });
    if (sh > 0) tag(ctx, 'SHANTYTOWNS IN THE BURNED BLOCKS', 640, 220, sh, 22);
    vig(ctx);
  }

  // ---------- a8: New York is finished. Count: 1. That's one. ----------
  function a8(ctx, lt, dur, t) { obituaryShot(ctx, lt, t, 1, since(t, 'newyork') + .2, since(t, 'one'), '1776'); }

  // ---------- a9: but the harbor didn't burn — the British sail out in 1783, and people sail in ----------
  function a9(ctx, lt, dur, t) {
    const sl = since(t, 'sail'), pp = since(t, 'people');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.04), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#4aa8e8'], [1, '#ffe2a8']]), 0, rect(-200, -200, 1700, 900)); glow(ctx, 640, 420, 480, 'rgba(255,240,190,.55)'); clouds(ctx, t, [80, 140]);
    waterBand(ctx, 430, t, -600, 2200, '#3aa0c0');
    // British ships leave to the left; merchant ships arrive from the right
    for (let i = 0; i < 3; i++) { const k = sl > -.5 ? ease.in(clamp((sl + .5 - i * .2) / 3)) : 0; ship(ctx, lerp(380 + i * 160, -400, k), 470 + i * 26, .36, t, 'red'); }
    for (let i = 0; i < 4; i++) { const k = pp > -.4 ? ease.out(clamp((pp + .4 - i * .25) / 2.2)) : 0; ship(ctx, lerp(1600 + i * 120, 760 + i * 130, k), 480 + (i % 2) * 34, .32, t, 'us'); }
    harbor(ctx, 640, 760, 520, t, { look: [Math.sin(t * .7) * .6, -.3], eyes: blink(t, 47.8), mouth: 'smile' });
    ctx.restore();
    if (since(t, 'burn') > -.3) strip(ctx, 'THE HARBOR DIDN\'T BURN', 640, 92, since(t, 'burn') + .3, { px: 38, color: '#2f6a9a' });
    if (since(t, 'y1783') > 0) FX.dateTag(ctx, '25 NOVEMBER 1783 · EVACUATION DAY');
    vig(ctx);
  }

  // ---------- a10: the first US census, 1790 — 33,131 residents, already the biggest city in the country ----------
  function a10(ctx, lt, dur, t) {
    const th = since(t, 'thirty'), bg = since(t, 'biggest');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 18; i++) line(ctx, [[0, 30 + i * 40], [W, 30 + i * 40]], 2, 'rgba(140,100,50,.12)');
    // the census ledger
    ctx.save(); ctx.translate(330, 360); ctx.rotate(-.04); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-196, -236, 400, 480)); shape(ctx, '#f4ead4', 4, rect(-200, -240, 400, 480, 4)); txt(ctx, 'CENSUS OF THE', 0, -200, FX.FONT(800, 18), '#5a4a38'); txt(ctx, 'UNITED STATES · 1790', 0, -176, FX.FONT(800, 18), '#5a4a38');
    for (let i = 0; i < 9; i++) { line(ctx, [[-170, -130 + i * 34], [170, -130 + i * 34]], 1.5, 'rgba(120,90,60,.4)'); txt(ctx, ['New-York', 'Philadelphia', 'Boston', 'Charleston', 'Baltimore', 'Northern Liberties', 'Salem', 'Newport', 'Providence'][i], -160, -146 + i * 34, 'italic 600 18px Georgia', '#3a2a20', 'left'); }
    ctx.restore();
    counter(ctx, 330, 650, th > -.2 ? roll(0, 33131, (th + .2) / 1.6) : '0', th + .2, 'NEW YORK CITY · 1790', GOLD, 48);
    // the biggest city: a bar race
    const rows = [['NEW YORK', 33131, RED], ['PHILADELPHIA', 28522, '#2f4a8a'], ['BOSTON', 18320, '#5a7a4a']], rs = since(t, 'residents'); const k = rs > -.4 ? ease.out(clamp((rs + .4) / 1.6)) : 0;
    rows.forEach(([n, v, c], i) => { const y = 260 + i * 110, w = 520 * v / 33131 * k; shape(ctx, c, 4, rect(680, y - 34, Math.max(4, w), 68, 6)); txt(ctx, n, 690, y - 54, FX.FONT(800, 18), '#3a2a20', 'left'); if (k > .9) txt(ctx, v.toLocaleString('en-US'), 690 + w + 14, y, FX.DISPLAY(26), '#3a2a20', 'left'); });
    if (bg > 0) strip(ctx, 'ALREADY THE BIGGEST CITY IN THE COUNTRY', 900, 110, bg, { px: 26, color: RED });
    txt(ctx, 'CITY PROPER, 1790 CENSUS', 940, 600, FX.FONT(700, 14), '#7a6a5a');
    vig(ctx);
  }

  // ---------- a11: then comes the best bet this city ever makes ----------
  function a11(ctx, lt, dur, t) {
    const bt = since(t, 'best');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2f7a46'], [1, '#1f5a34']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 30; i++) shape(ctx, 'rgba(255,255,255,.04)', 0, circle((i * 211) % W, (i * 97) % H, 40));
    shape(ctx, '#7a4a2a', 6, c => { c.ellipse(640, 760, 820, 220, 0, Math.PI, 2 * Math.PI); c.closePath(); });
    // a map card "1825" on the table, and every chip pushed onto it
    ctx.save(); ctx.translate(640, 330); ctx.rotate(-.05); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-212, -130, 440, 280, 10)); shape(ctx, '#f4ead4', 5, rect(-220, -140, 440, 280, 10));
      shape(ctx, '#9ad0e8', 3, ellipse(-150, 30, 50, 18)); line(ctx, [[-110, 20], [-40, 0], [40, -10], [120, -6], [150, -20]], 8, '#1d6aa8'); line(ctx, [[150, -20], [160, 60], [170, 110]], 8, '#3a8ac0'); shape(ctx, RED, 3, circle(170, 112, 9));
      txt(ctx, 'ERIE CANAL', 0, -90, FX.DISPLAY(34), '#1d6aa8'); txt(ctx, 'BUFFALO', -150, 72, FX.FONT(800, 14), '#5a4a38'); txt(ctx, 'NEW YORK', 120, 128, FX.FONT(800, 14), '#5a4a38'); ctx.restore();
    const k = bt > -.2 ? ease.inOut(clamp((bt + .2) / 1.2)) : 0;
    for (let i = 0; i < 12; i++) { const sx = lerp(180 + (i % 4) * 30, 560 + (i % 4) * 50, k), sy = lerp(620 - Math.floor(i / 4) * 16, 520 - Math.floor(i / 4) * 16, k); shape(ctx, ['#c8322a', '#f4efe2', '#2f4a8a', GOLD][i % 4], 3, ellipse(sx, sy, 40, 13)); }
    if (k > .9) FX.stamp(ctx, 'ALL IN · 1825', 1020, 600, bt - .9, { color: GOLD, size: 40 });
    strip(ctx, 'THE BEST BET THIS CITY EVER MAKES', 640, 92, bt + .2, { px: 32 });
    vig(ctx);
  }

  // ---------- a12: 1825 — New York State, pushed by Governor DeWitt Clinton, opens a ditch: 40 ft wide, 4 ft deep ----------
  function a12(ctx, lt, dur, t) {
    const cl = since(t, 'clinton'), dt = since(t, 'ditch'), fw = since(t, 'forty'), fd = since(t, 'four2');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ad0ec'], [1, '#f4e6c4']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 130]);
    // the canal in cross-section: towpath, water, a packet boat, a mule
    const sk = FX.settle(clamp((lt - .1) / .6));
    ctx.save(); ctx.translate(760, 470); ctx.scale(1, Math.max(.02, sk));
    shape(ctx, '#7aa858', 4, poly([[-560, -60], [-300, -60], [-260, 120], [260, 120], [300, -60], [560, -60], [560, 260], [-560, 260]]));
    shape(ctx, '#4aa6c2', 4, poly([[-292, -30], [292, -30], [256, 112], [-256, 112]])); for (let i = 0; i < 5; i++) line(ctx, [[-200 + i * 90, -14], [-160 + i * 90, -14]], 3, 'rgba(255,255,255,.6)');
    shape(ctx, '#8a5a34', 4, poly([[-140, -40], [140, -40], [120, -6], [-120, -6]])); shape(ctx, '#f4efe2', 3, rect(-100, -76, 180, 36, 4)); for (let i = 0; i < 5; i++) shape(ctx, '#3a5a7a', 0, rect(-88 + i * 34, -68, 20, 18));
    line(ctx, [[-360, -100], [-130, -50]], 2, '#5a4a3a'); shape(ctx, '#8a7a6a', 3, ellipse(-420, -96, 50, 24)); shape(ctx, '#8a7a6a', 3, ellipse(-370, -122, 18, 26, .5)); for (const dx of [-450, -430, -400, -390]) line(ctx, [[dx, -80], [dx, -60]], 6, '#6a5a4a');
    ctx.restore();
    if (fw > -.2) { const s = pop(fw + .2); ctx.save(); ctx.globalAlpha = s; line(ctx, [[468, 420], [1052, 420]], 4, RED); for (const x of [468, 1052]) line(ctx, [[x, 408], [x, 432]], 4, RED); txt(ctx, '40 FT WIDE', 760, 396, FX.DISPLAY(32), RED); ctx.restore(); }
    if (fd > -.2) { const s = pop(fd + .2); ctx.save(); ctx.globalAlpha = s; line(ctx, [[1090, 440], [1090, 582]], 4, RED); txt(ctx, '4 FT DEEP', 1170, 510, FX.DISPLAY(28), RED); ctx.restore(); }
    // DeWitt Clinton's portrait (Samuel Morse), framed
    frame(ctx, T.IMG.clinton, 190, 300, 210, 280, cl + .3, 'GOV. DEWITT CLINTON');
    FX.dateTag(ctx, 'NEW YORK STATE · 1825');
    if (dt > 0) strip(ctx, 'A DITCH', 760, 110, dt, { px: 48, color: '#2f6a9a' });
    vig(ctx);
  }

  // ---------- a13: 363 miles long, from the Hudson River to Lake Erie (map draws) ----------
  function a13(ctx, lt, dur, t) {
    const ml = since(t, 'miles363'), hd = since(t, 'hudson'), er = since(t, 'erie');
    ctx.save(); cam(ctx, 1.0, 640, 380); stateMap(ctx, t, ml > -.3 ? clamp((ml + .3) / 3.4) : 0);
    // a packet boat travelling the line
    const k = ml > 0 ? clamp(ml / 3.4) : 0; if (k > 0) { const n = 8, up = k * n, i = Math.min(n - 1, Math.floor(up)), f = up - i; const P0 = [[-73.75, 42.65], [-73.94, 42.81], [-74.6, 42.95], [-75.23, 43.1], [-76.15, 43.05], [-76.8, 43.05], [-77.61, 43.16], [-78.69, 43.17], [-78.88, 42.89]];
      const a = SP(P0[i]), b = SP(P0[i + 1]); const x = lerp(a[0], b[0], f), y = lerp(a[1], b[1], f); shape(ctx, '#8a5a34', 2.5, poly([[x - 18, y - 4], [x + 18, y - 4], [x + 12, y + 6], [x - 12, y + 6]])); shape(ctx, '#f4efe2', 2, rect(x - 10, y - 14, 18, 10, 2)); }
    ctx.restore();
    counter(ctx, 1080, 640, ml > -.2 ? roll(0, 363, (ml + .2) / 1.8) + ' MI' : '0 MI', ml + .2, 'ALBANY → BUFFALO', '#8ad0ff', 44);
    if (hd > 0) tag(ctx, 'FROM THE HUDSON…', 900, 110, hd, 22); if (er > 0) tag(ctx, '…TO LAKE ERIE', 300, 110, er, 22);
    vig(ctx);
  }

  // ---------- a14: before: about $100 a ton, Buffalo to New York City. After: about $10 ----------
  function a14(ctx, lt, dur, t) {
    const hu = since(t, 'hundred'), tn = since(t, 'ten');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ad0ec'], [1, '#f4e6c4']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [70, 120]);
    line(ctx, [[640, 160], [640, 720]], 4, 'rgba(90,70,50,.4)'); txt(ctx, 'BEFORE', 320, 170, FX.DISPLAY(40), '#5a4a38'); txt(ctx, 'AFTER', 960, 170, FX.DISPLAY(40), '#5a4a38');
    // before: a wagon on a muddy road over the hills
    shape(ctx, '#8ab868', 4, c => { c.moveTo(-50, 520); c.quadraticCurveTo(160, 440, 320, 500); c.quadraticCurveTo(480, 560, 640, 500); c.lineTo(640, 760); c.lineTo(-50, 760); c.closePath(); });
    { const x = 300 + Math.sin(t * .6) * 10, y = 560; shape(ctx, '#f4efe2', 4, c => { c.moveTo(x - 110, y - 60); c.quadraticCurveTo(x, y - 170, x + 110, y - 60); c.closePath(); }); shape(ctx, '#8a5a34', 4, rect(x - 120, y - 64, 240, 50, 4));
      for (const dx of [-80, 80]) { ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(x + dx, y, 32, 0, 7); ctx.stroke(); } shape(ctx, '#7a5a3a', 3.5, ellipse(x + 210, y - 40, 60, 30)); shape(ctx, '#7a5a3a', 3, ellipse(x + 270, y - 70, 20, 30, .5)); for (const dx of [180, 200, 230, 250]) line(ctx, [[x + dx, y - 20], [x + dx, y + 20]], 8, '#6a4a2a'); }
    // after: a canal boat pulled by a mule on the towpath
    shape(ctx, '#7aa858', 4, rect(640, 500, 700, 260)); shape(ctx, '#4aa6c2', 3.5, rect(640, 560, 700, 120)); for (let i = 0; i < 6; i++) line(ctx, [[680 + i * 100, 620], [720 + i * 100, 620]], 3, 'rgba(255,255,255,.6)');
    { const x = 900 + Math.sin(t * .5) * 20; shape(ctx, '#8a5a34', 4, poly([[x - 120, 590], [x + 120, 590], [x + 100, 630], [x - 100, 630]])); shape(ctx, '#f4efe2', 3, rect(x - 80, 552, 150, 40, 4)); for (let i = 0; i < 5; i++) shape(ctx, '#a87a4a', 2, rect(x - 76 + i * 30, 540, 24, 14));
      line(ctx, [[x + 100, 580], [x + 280, 506]], 2, '#5a4a3a'); shape(ctx, '#8a7a6a', 3, ellipse(x + 310, 500, 44, 22)); shape(ctx, '#8a7a6a', 3, ellipse(x + 350, 474, 14, 22, .5)); }
    const tg = (x, y, k, v, c) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.rotate(-.06); ctx.scale(s, s); shape(ctx, '#f4efe2', 4, poly([[-90, -50], [90, -50], [110, 0], [90, 50], [-90, 50]])); shape(ctx, INK, 0, circle(76, 0, 8)); txt(ctx, v, -6, -6, FX.DISPLAY(48), c); txt(ctx, 'PER TON', -6, 32, FX.FONT(800, 14), '#5a4a38'); ctx.restore(); };
    tg(320, 300, hu + .2, '$100', RED); tg(960, 300, tn + .2, '$10', GREEN);
    txt(ctx, 'BUFFALO → NEW YORK CITY', 640, 700, FX.FONT(800, 20), '#3a2a20');
    vig(ctx);
  }

  // ---------- a15: the cheapest road between the middle of America and the rest of the world now runs through one harbor ----------
  function a15(ctx, lt, dur, t) {
    const am = since(t, 'america'), wd = since(t, 'world'), hb = since(t, 'harbor2');
    ctx.save(); cam(ctx, lerp(.8, .85, clamp(lt / dur)), 640, 380); stateMap(ctx, t, 1);
    // goods flow from the Great Lakes, down the canal and the Hudson, and out to the world
    const path = [[-82.5, 42.2], [-78.88, 42.89], [-78.69, 43.17], [-77.61, 43.16], [-76.15, 43.05], [-75.23, 43.1], [-73.94, 42.81], [-73.75, 42.65], [-73.88, 42.2], [-73.96, 41.6], [-73.95, 41.0], [-74.02, 40.68], [-73.5, 40.4], [-70.5, 40.0]].map(SP);
    for (let k = 0; k < 18; k++) { const p = (t * .08 + k / 18) % 1, n = path.length - 1, up = p * n, i = Math.floor(up), f = up - i; const x = lerp(path[i][0], path[i + 1][0], f), y = lerp(path[i][1], path[i + 1][1], f);
      shape(ctx, ['#c8a060', '#f2c24a', '#a87a4a'][k % 3], 2.5, rect(x - 10, y - 8, 20, 16, 3)); }
    if (am > -.2) { const [x, y] = SP([-81.5, 42.6]); tag(ctx, 'THE MIDDLE OF AMERICA', x + 40, y - 70, am + .2, 20); }
    if (wd > -.2) { const [x, y] = SP([-71.2, 40.2]); tag(ctx, '→ THE WORLD', x - 40, y + 40, wd + .2, 22); }
    if (hb > -.3) { const [x, y] = SP([-74.02, 40.68]); glow(ctx, x, y, 70 + 10 * Math.sin(t * 4), 'rgba(255,230,120,.8)'); }
    ctx.restore();
    if (hb > -.2) strip(ctx, 'ALL THROUGH ONE HARBOR', 640, 92, hb + .2, { px: 38, color: '#2f6a9a' }); else strip(ctx, 'THE CHEAPEST ROAD', 640, 92, since(t, 'cheapest') + .2, { px: 36 });
    vig(ctx);
  }

  // ---------- a16: the city's population quadruples in thirty years ----------
  function a16(ctx, lt, dur, t) {
    const q = since(t, 'quadruples');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    line(ctx, [[220, 620], [1060, 620]], 5);
    const k = q > -.4 ? ease.out(clamp((q + .4) / 1.4)) : 0, h1 = 96, h2 = lerp(h1, 400, k);
    shape(ctx, '#a8b8c8', 4, rect(340, 620 - h1, 180, h1)); txt(ctx, '1820', 430, 652, FX.DISPLAY(30)); txt(ctx, '≈ 124,000', 430, 620 - h1 - 26, FX.DISPLAY(28), '#5a6a7a');
    shape(ctx, RED, 4, rect(760, 620 - h2, 180, h2)); txt(ctx, '1850', 850, 652, FX.DISPLAY(30)); if (k > .9) txt(ctx, '≈ 516,000', 850, 620 - h2 - 26, FX.DISPLAY(28), RED);
    for (let i = 0; i < Math.floor(4 * k); i++) shape(ctx, 'rgba(255,255,255,.25)', 0, rect(760, 620 - (i + 1) * 100, 180, 4));
    if (k > .6) { const s = pop(q); ctx.save(); ctx.translate(640, 300); ctx.scale(s, s); FX.bigText(ctx, '× 4', 0, 0, 96, { color: GOLD }); ctx.restore(); }
    txt(ctx, 'MANHATTAN, U.S. CENSUS', 640, 700, FX.FONT(700, 16), '#7a6a5a');
    strip(ctx, 'IN THIRTY YEARS', 640, 92, since(t, 'population'), { px: 36 });
    vig(ctx);
  }

  const cut = [[0, a1], [6.0, a2], [13.0, a3], [17.5, a4], [24.8, a5], [31.4, a6], [35.8, a7], [41.0, a8], [45.6, a9], [50.6, a10], [59.3, a11], [63.5, a12], [72.3, a13], [77.7, a14], [85.3, a15], [91.4, a16]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: .45, type: 'paper', gain: .4 }, { t: A.driven, type: 'whoosh', gain: .4 }, { t: A.british, type: 'thud', gain: .4 }, { t: A.fire - .2, type: 'boom', gain: .4 },
    { t: A.writes, type: 'paper', gain: .5 }, { t: A.somewhere, type: 'ratchet', gain: .4 }, { t: A.quarter, type: 'thud', gain: .5 }, { t: A.blames, type: 'click', gain: .4 }, { t: A.nobody, type: 'thud', gain: .6 },
    { t: A.seven, type: 'ratchet', gain: .3 }, { t: A.newyork - .2, type: 'thud', gain: .8 }, { t: A.one, type: 'thud', gain: .6 }, { t: A.sail, type: 'swell', gain: .4 }, { t: A.thirty, type: 'ratchet', gain: .4 },
    { t: A.biggest, type: 'thud', gain: .5 }, { t: A.best, type: 'rattle', gain: .5 }, { t: A.clinton, type: 'paper', gain: .4 }, { t: A.ditch - .3, type: 'splash', gain: .3 }, { t: A.miles363, type: 'whoosh', gain: .4 },
    { t: A.hundred, type: 'click', gain: .5 }, { t: A.ten, type: 'click', gain: .5 }, { t: A.harbor2, type: 'swell', gain: .4 }, { t: A.quadruples, type: 'thud', gain: .6 },
  ];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.newyork - .3, mood: 'silence' }, { t: A.harbor - .3, mood: 'under' }, { t: A.best - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-escalation-a.mp3', shots, sfx, moods, images: { clinton: 'assets/img/clinton-morse.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
