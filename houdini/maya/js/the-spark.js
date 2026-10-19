/* The Maya — Beat 3 "The spark: kings, and ending number one" (narration-spark.mp3 = 1.8 s chapter pause + narration-full.mp3 216.3–297.35 s + 1.2 s tail).
 * Anchors = full-recording word times − 214.5. Cities rise → the holy lord → never one empire (a league) → El Mirador → the Preclassic collapse → ENDINGS: 1. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { over: 216.37, cities: 220.69, plaza: 222.72, temples: 223.56, painted: 224.34, carved: 225.45, stone: 225.84, and1: 226.95, top: 230.14, holy: 231.04, speaks: 233.68, gods: 234.29, rain: 235.43, corn: 236.13, him: 237.23, now: 238.15, school: 239.47, never: 241.7, empire: 243.03, capital: 244.52, emperor: 245.61, think: 246.59, roman: 247.43, nfl: 249.3, dozens: 250.32, same: 252.18, language: 252.45, gods2: 253.75, calendar: 254.69, ball: 255.9, beat: 258.44, some: 260.2, giants: 261.16, northern: 262.47, guatemala: 262.93, the2: 264.01, mirador: 264.8, poke: 267.25, and3: 270.07, century: 271.03, abandoned: 274.86, why: 276.06, argue: 277.88, droughts: 278.76, war: 279.51, exhausted: 280.25, eggs: 282.45, the4: 283.36, emptied: 284.3, vanish: 286.0, moved: 287.29, farms: 288.12, rebuild: 289.1, the5: 290.77, fell: 291.27, stayed: 292.74, thats: 294.2, one: 295.03, counting: 296.12 };
  const A = {}; for (const k in F) A[k] = F[k] - 214.5; A.end = 84.05;
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


  const M = G.Maya, { temple, palace, stelaSmall, king, mayaMap, site, MP, mix } = M;
  const SK = ['#a8704a', '#7a4a2a', '#c08a5a', '#8a5a34', '#b07848'], CL = ['#e8dcc0', '#d8c49a', '#f0e6cc', '#c8b088'];
  const villager = (ctx, x, y, s, t, v, o = {}) => N.walker(ctx, x, y, s, t, v, Object.assign({ plain: true, beads: v % 2 === 0, coat: CL[v % 4], pants: SK[v % 5], skin: SK[v % 5], hair: '#1d1a17', hs: [0, 1, 2, 4][v % 4], shoe: SK[v % 5] }, o));
  function ground(ctx, t, tod = 2, hy = 470) { M.sky(ctx, t, tod, hy); M.jungle(ctx, hy - 40, tod, t); shape(ctx, '#7aa858', 0, rect(-600, hy, 2600, 600)); }
  function cross(ctx, x, y, k, r = 70) { if (k <= 0) return; const e = clamp(k / .3); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = '#e8322a';
    ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * clamp(e * 2), y - r + 2 * r * clamp(e * 2)); if (e > .5) { ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * clamp(e * 2 - 1), y - r + 2 * r * clamp(e * 2 - 1)); } ctx.stroke(); ctx.restore(); }
  function rain(ctx, t, x0, x1, y0, y1, a = 1) { ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 70; i++) { const x = x0 + ((i * 53) % (x1 - x0)), y = y0 + ((t * 600 + i * 97) % (y1 - y0)); line(ctx, [[x, y], [x - 6, y + 22]], 3, 'rgba(90,150,220,.8)'); } ctx.restore(); }
  function cloud(ctx, x, y, s, col = '#f4f4f8') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, smooth([[-140, 30], [-150, -10], [-100, -50], [-40, -60], [10, -90], [80, -70], [130, -40], [150, 10], [120, 40], [0, 50]])); ctx.restore(); }
  function cornSprout(ctx, x, y, s, k, t) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); const sw = Math.sin(t * 1.5 + x) * 3; line(ctx, [[0, 0], [sw, -90]], 7, '#4a8a2a'); for (const d of [-1, 1]) shape(ctx, '#6ab048', 2.5, c => { c.moveTo(sw * .5, -40); c.quadraticCurveTo(d * 40, -70, d * 60, -40); c.quadraticCurveTo(d * 30, -50, sw * .5, -30); c.closePath(); }); shape(ctx, '#f6c945', 2.5, ellipse(sw + 8, -70, 7, 18, .3)); ctx.restore(); }
  function pennant(ctx, x, y, s, name, col, k, rot = 0) { if (k <= 0) return; const e = pop(k); ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(k * 3) * .02); ctx.scale(s * e, s * e);
    line(ctx, [[-8, -90], [-8, 120]], 8, '#6a4a2a'); shape(ctx, col, 4, poly([[-4, -90], [230, -40], [-4, 10]])); txt(ctx, name, 80, -40, FX.DISPLAY(name.length > 8 ? 17 : 21), '#fff'); ctx.restore(); }
  function ball(ctx, x, y, r = 18) { shape(ctx, '#2a2420', 3.5, circle(x, y, r)); shape(ctx, 'rgba(255,255,255,.35)', 0, circle(x - r * .35, y - r * .35, r * .3)); }

  // ---------- s1: your great-great-great-grandchildren build cities — plazas, temples, painted walls, carved stone ----------
  function s1(ctx, lt, dur, t) {
    const k = w => clamp((t - A[w] + .2) / .9);
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.06, 1.0), 640, 400); ground(ctx, t, 2);
    // the old mound becomes a plaza
    shape(ctx, mix('#9a7048', '#d8d0bc', k('plaza')), 4, poly([[-80, 600], [40, 520], [1240, 520], [1360, 600]])); if (k('plaza') > 0) for (let i = 0; i < 9; i++) line(ctx, [[120 + i * 120, 522], [80 + i * 130, 598]], 2, `rgba(120,100,80,${.4 * k('plaza')})`);
    temple(ctx, 330, 525, .8, { k: ease.out(k('temples')), col: '#e0d4b8', paint: k('painted') > .5 }); temple(ctx, 960, 525, .95, { k: ease.out(clamp(k('temples') * 1.2 - .2)), col: '#e0d4b8', paint: k('painted') > .5, h: 330 });
    palace(ctx, 645, 525, .85, { k: ease.out(clamp(k('temples') * 1.3 - .3)), paint: k('painted') > .5 });
    for (let i = 0; i < 4; i++) stelaSmall(ctx, 180 + i * 300 + (i > 1 ? 80 : 0), 600, .9, FX.settle(clamp(k('carved') * 4 - i)));
    for (let i = 0; i < 6; i++) villager(ctx, 80 + i * 230, 760 + (i % 2) * 12, .6, t, i, { still: i % 2 === 0 });
    ctx.restore();
    const yr = Math.round(lerp(-800, 100, clamp((t - A.over) / (A.stone - A.over + .5)))); counter(ctx, 1100, 110, yr < 0 ? `${-yr} BC` : `AD ${yr}`, lt - .1, null, GOLD, 34);
    tag(ctx, 'PLAZAS', 220, 650, since(t, 'plaza'), 22); tag(ctx, 'TEMPLES', 960, 160, since(t, 'temples'), 22); tag(ctx, 'PAINTED WALLS', 645, 330, since(t, 'painted'), 22); tag(ctx, 'CARVED STONE', 480, 640, since(t, 'carved'), 22);
    if (since(t, 'cities') > 0) strip(ctx, 'CITIES', 640, 110, since(t, 'cities'), { px: 50 });
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 3', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE SPARK', 640, 350, lt - .35, { px: 66, color: '#c8322a', rot: .02 }); tag(ctx, 'KINGS — AND ENDING #1', 640, 440, lt - .7, 26); ctx.restore(); }
    vig(ctx);
  }

  // ---------- s2: a holy lord at the top — he speaks to the gods; the rain and the corn depend on him ----------
  function s2(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, lerp(1.25, 1.0, ease.inOut(clamp((t - A.gods + .5) / 1.5))), 640, lerp(250, 380, ease.inOut(clamp((t - A.gods + .5) / 1.5))));
    ground(ctx, t, 1.9); shape(ctx, '#d8d0bc', 4, poly([[-80, 620], [40, 560], [1240, 560], [1360, 620]]));
    temple(ctx, 640, 565, .95, { col: '#e0d4b8', paint: true, h: 300 });
    king(ctx, 640, 565 - .95 * 300 - 4, .36, t, { reach: since(t, 'speaks') > 0, cape: '#c8322a', staff: since(t, 'speaks') <= 0 });
    for (let i = 0; i < 12; i++) villager(ctx, 60 + i * 105, 700 + (i % 3) * 14, .5, t, i, { still: true, reach: since(t, 'rain') > 0 && i % 3 === 0 });
    // the field on the right gets rain and corn
    shape(ctx, '#8a6a44', 3, rect(980, 600, 400, 60)); for (let i = 0; i < 5; i++) cornSprout(ctx, 1010 + i * 60, 610, .8, FX.settle(clamp((t - A.corn - i * .08) / .5)), t);
    ctx.restore();
    // the rain god's cloud
    const gk = clamp((since(t, 'gods') + .2) / .6); if (gk > 0) { ctx.save(); ctx.globalAlpha = gk; cloud(ctx, 1020, 120, .9, '#e8eef8'); for (const d of [-1, 1]) { shape(ctx, '#fff', 3, circle(1020 + d * 30, 110, 14)); shape(ctx, INK, 0, circle(1020 + d * 30, 112, 6)); } shape(ctx, '#2f7a9a', 3, c => { c.moveTo(1000, 140); c.quadraticCurveTo(1020, 152, 1040, 140); }); ctx.restore(); }
    if (since(t, 'rain') > 0) rain(ctx, t, 900, 1260, 150, 640, clamp(since(t, 'rain') / .4));
    if (since(t, 'him') > -.2) { const k = clamp((since(t, 'him') + .2) / .5); ctx.save(); ctx.globalAlpha = k; ctx.setLineDash([12, 8]); line(ctx, [[960, 200], [760, 250]], 5, '#2f4a8a'); line(ctx, [[1000, 560], [760, 380]], 5, '#c88a10'); ctx.restore(); }
    tag(ctx, 'A NEW KIND OF PERSON AT THE TOP', 640, 80, since(t, 'top'), 26);
    if (since(t, 'holy') > 0) strip(ctx, 'HOLY LORD', 330, 170, since(t, 'holy'), { px: 50, color: '#2f7a46' });
    if (since(t, 'holy') > .4) tag(ctx, "K'UHUL AJAW", 330, 250, since(t, 'holy') - .4, 22);
    tag(ctx, 'SPEAKS TO THE GODS', 1020, 230, since(t, 'gods'), 22); tag(ctx, 'RAIN', 1180, 400, since(t, 'rain'), 22); tag(ctx, 'CORN', 1160, 520, since(t, 'corn'), 22);
    vig(ctx);
  }

  // ---------- s3: school gets it wrong — there was never one Maya empire. No capital, no emperor ----------
  function s3(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); ctx.translate(640, 390); ctx.rotate(-.015); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-412, -276, 840, 560)); shape(ctx, '#fbf6ea', 4, rect(-420, -284, 840, 560, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(-400, -230, 800, 494); ctx.clip(); ctx.translate(-640, -360 + 20); ctx.translate(640, 360); ctx.scale(.62, .62); ctx.translate(-640, -360); mayaMap(ctx, t, { borders: false, today: false });
    const sh = clamp((t - A.never - .2) / .8); // one big border → shatters into many city-states
    if (sh < 1) { ctx.save(); ctx.globalAlpha = 1 - sh; shape(ctx, 'rgba(200,50,40,.28)', 6, c => { const p = [[-92.8, 18.6], [-90.4, 21.3], [-87.2, 21.5], [-87.8, 18.0], [-88.4, 15.4], [-89.6, 14.4], [-92.3, 15.3]].map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); });
      const [cx, cy] = MP([-89.7, 17.3]); shape(ctx, '#f6c945', 4, poly([[cx, cy - 30], [cx + 9, cy - 9], [cx + 30, cy - 9], [cx + 13, cy + 5], [cx + 20, cy + 26], [cx, cy + 13], [cx - 20, cy + 26], [cx - 13, cy + 5], [cx - 30, cy - 9], [cx - 9, cy - 9]])); ctx.restore(); }
    if (sh > 0) { const C = [[-89.62, 17.22], [-89.74, 18.11], [-89.14, 14.84], [-92.05, 17.48], [-89.04, 15.27], [-91.11, 17.16], [-90.97, 16.9], [-88.57, 20.68], [-89.06, 16.76], [-90.18, 16.43], [-89.4, 17.06], [-91.4, 16.6], [-88.85, 16.95], [-90.5, 17.7], [-89.5, 19.9], [-92.0, 16.9]];
      for (let i = 0; i < C.length; i++) { const [x, y] = MP(C[i]), e = FX.settle(clamp(sh * 2 - i * .05)); if (e > .02) shape(ctx, ['#c8322a', '#2f4a8a', '#2f7a46', '#e8a83a', '#7a4a8a'][i % 5], 3, circle(x, y, Math.max(.5, 13 * e))); } }
    ctx.restore();
    txt(ctx, 'THE MAYA EMPIRE', 0, -252, FX.DISPLAY(30), '#3a2a1a'); if (sh > .3) line(ctx, [[-150, -252], [150, -250]], 7, '#e8322a');
    ctx.restore();
    if (since(t, 'empire') > 0) FX.stamp(ctx, 'NEVER ONE EMPIRE', 980, 160, since(t, 'empire'), { color: '#c8322a', size: 38 });
    tag(ctx, 'NO SINGLE CAPITAL', 300, 620, since(t, 'capital'), 24); tag(ctx, 'NO EMPEROR', 960, 620, since(t, 'emperor'), 24);
    strip(ctx, 'WHAT SCHOOL GETS WRONG', 640, 70, since(t, 'school'), { px: 34 });
    vig(ctx);
  }

  // ---------- s4: less "Roman Empire", more "the NFL" — dozens of franchises ----------
  const TEAMS = [['TIKAL', '#2f4a8a'], ['CALAKMUL', '#c8322a'], ['COPÁN', '#2f7a46'], ['PALENQUE', '#7a4a8a'], ['CARACOL', '#e8a83a'], ['NARANJO', '#d84a7a'], ['YAXCHILAN', '#3a8ac8'], ['DOS PILAS', '#8a5a34'], ['QUIRIGUÁ', '#4a9a6a'], ['PIEDRAS NEGRAS', '#5a5a6a'], ['TONINÁ', '#c86a2a'], ['UXMAL', '#6a3a8a']];
  function s4(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#3a6ab8'], [1, '#2a4a8a']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 10; i++) line(ctx, [[0, 70 * i], [W, 70 * i]], 2, 'rgba(255,255,255,.06)');
    // the Roman way: one eagle standard, one emperor (crossed out)
    { const k = Math.max(since(t, 'roman') + .3, lt + .1); if (k > 0) { const s = pop(k); ctx.save(); ctx.translate(250, 380); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-150, -200, 310, 400)); shape(ctx, '#fbf6ea', 4, rect(-156, -206, 312, 400, 6));
      line(ctx, [[0, 150], [0, -120]], 8, '#8a6a2a'); shape(ctx, '#c8a040', 3, c => { c.moveTo(0, -150); c.quadraticCurveTo(-80, -180, -110, -120); c.quadraticCurveTo(-50, -140, 0, -110); c.quadraticCurveTo(50, -140, 110, -120); c.quadraticCurveTo(80, -180, 0, -150); }); shape(ctx, '#c8322a', 3, rect(-60, -90, 120, 90, 4)); txt(ctx, 'SPQR', 0, -46, FX.DISPLAY(28), '#f6c945');
      txt(ctx, 'ONE EMPIRE', 0, 170, FX.DISPLAY(26)); ctx.restore(); cross(ctx, 250, 360, since(t, 'nfl') - .1, 130); } }
    // the league: dozens of franchises
    for (let i = 0; i < TEAMS.length; i++) { const k = since(t, 'nfl') - .1 - i * .12 + (t > A.dozens ? .4 : 0); const [nm, col] = TEAMS[i]; pennant(ctx, 520 + (i % 3) * 250, 150 + Math.floor(i / 3) * 140, .8, nm, col, k, (i % 2 ? .04 : -.03)); }
    if (since(t, 'nfl') > 0) strip(ctx, 'MORE LIKE A LEAGUE', 900, 60, since(t, 'nfl'), { px: 34 });
    if (since(t, 'dozens') > 0) tag(ctx, 'DOZENS OF FRANCHISES', 900, 690, since(t, 'dozens'), 26);
    if (since(t, 'roman') > 0) tag(ctx, '"ROMAN EMPIRE"', 250, 140, since(t, 'roman'), 24);
    vig(ctx);
  }

  // ---------- s5: same language family, same gods, same calendar, same ballgame — each trying to beat the others ----------
  function s5(ctx, lt, dur, t) {
    ground(ctx, t, 2, 400); shape(ctx, '#d8cdb4', 0, rect(-600, 400, 2600, 600));
    // the ballcourt: two sloped walls with a stone ring
    for (const d of [-1, 1]) { shape(ctx, '#c8b898', 4, poly([[640 + d * 560, 700], [640 + d * 230, 700], [640 + d * 300, 470], [640 + d * 560, 470]])); shape(ctx, '#b8a888', 4, rect(d > 0 ? 940 : 80, 400, 260, 70)); }
    ctx.save(); ctx.translate(640 + 300, 470 - 50); shape(ctx, '#a89878', 5, ellipse(0, 0, 26, 30)); shape(ctx, '#5a4a3a', 0, ellipse(0, 0, 12, 16)); ctx.restore();
    // two teams, a bouncing rubber ball
    const bt = (t * .8) % 2, bx = 640 + Math.sin(t * 1.6) * 230, by = 640 - Math.abs(Math.sin(t * 3.2)) * 170; ball(ctx, bx, by, 18);
    for (let i = 0; i < 4; i++) { const d = i < 2 ? -1 : 1, x = 640 + d * (110 + (i % 2) * 120); villager(ctx, x, 720, .55, t, i + 1, { flip: d > 0, coat: d < 0 ? '#c8322a' : '#2f4a8a' }); shape(ctx, '#e8dcc0', 3, rect(x - 28, 720 - 140 * .55 - 18, 56, 24, 8)); }
    // the "same" checklist
    const IT = [['SAME LANGUAGE FAMILY', 'language'], ['SAME GODS', 'gods2'], ['SAME CALENDAR', 'calendar'], ['SAME BALLGAME', 'ball']];
    for (let i = 0; i < 4; i++) { const k = since(t, IT[i][1]); if (k <= 0) continue; const s = pop(k); ctx.save(); ctx.translate(240 + (i % 2) * 800, 90 + Math.floor(i / 2) * 80); ctx.scale(s, s); ctx.font = FX.DISPLAY(26); const w = ctx.measureText(IT[i][0]).width + 80;
      shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-w / 2 + 5, -26, w, 56)); shape(ctx, '#fbf6ea', 3.5, rect(-w / 2, -30, w, 56, 6)); line(ctx, [[-w / 2 + 18, 0], [-w / 2 + 28, 12], [-w / 2 + 46, -14]], 6, '#2f7a46'); txt(ctx, IT[i][0], 24, 0, FX.DISPLAY(26)); ctx.restore(); }
    if (since(t, 'beat') > 0) strip(ctx, 'EVERY ONE TRYING TO BEAT THE OTHERS', 640, 300, since(t, 'beat'), { px: 32, color: '#c8322a' });
    vig(ctx);
  }

  // ---------- s6: some of the earliest giants rose in northern Guatemala ----------
  function s6(ctx, lt, dur, t) {
    const [fx, fy] = MP([-89.9, 17.6]), zk = ease.inOut(clamp(lt / 2.2));
    ctx.save(); T.cam(ctx, lerp(1.0, 2.0, zk), lerp(640, fx, zk), lerp(360, fy, zk)); mayaMap(ctx, t);
    shape(ctx, 'rgba(47,122,70,.25)', 3, c => { const p = [[-91.0, 17.82], [-89.15, 17.82], [-89.15, 16.5], [-91.0, 16.4]].map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); });
    site(ctx, 'mirador', since(t, 'giants') + .1, 'EL MIRADOR', { r: 8, px: 15 }); for (const [ll, nm, lf] of [[[-89.55, 17.62], 'NAKBE', false], [[-90.1, 17.55], 'TINTAL', true]]) site(ctx, ll, since(t, 'guatemala') + .3, nm, { r: 6, px: 12, col: '#e8a83a', left: lf });
    ctx.restore();
    tag(ctx, 'NORTHERN GUATEMALA', 640, 110, since(t, 'northern'), 28); if (since(t, 'giants') > 0) tag(ctx, 'THE EARLIEST GIANTS', 640, 170, since(t, 'giants'), 24);
    vig(ctx);
  }

  // ---------- s7: El Mirador — temple platforms still poking out of the rainforest canopy today ----------
  function canopy(ctx, t, y0 = 420) { for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) { const x = -120 + i * 100 + (r % 2) * 50, y = y0 + r * 70 + ((i * 37) % 30); shape(ctx, mix('#2f6a3a', '#5aa04a', ((i * 7 + r * 3) % 10) / 10), 3, smooth([[x - 80, y + 30], [x - 70, y - 20], [x - 20, y - 50], [x + 30, y - 46], [x + 70, y - 14], [x + 80, y + 30]])); } }
  function s7(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.1), 640, 360);
    M.sky(ctx, t, 1.6, 420); for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = .5; shape(ctx, '#f8f4ee', 0, ellipse(((i * 470 + t * 12) % 1700) - 200, 380 - i * 20, 220, 26)); ctx.restore(); }
    temple(ctx, 640, 520, 1.15, { col: '#b8ab90', dark: '#7a6e58', tiers: 4, h: 230, w: 260 }); for (let i = 0; i < 9; i++) shape(ctx, '#4a8a3a', 2.5, ellipse(500 + (i * 41) % 280, 400 - (i * 23) % 160, 26, 12, i)); // overgrown
    temple(ctx, 220, 520, .6, { col: '#b8ab90', dark: '#7a6e58', tiers: 4, h: 200, w: 200 }); canopy(ctx, t, 430);
    birds(ctx, t, 4, 140);
    ctx.restore();
    FX.dateTag(ctx, 'EL MIRADOR · PETÉN, GUATEMALA · TODAY'); tag(ctx, 'STILL POKING OUT OF THE CANOPY', 640, 110, since(t, 'poke'), 26); vig(ctx);
  }

  // ---------- s8: around the 2nd century AD, several early giants were largely abandoned. Why? Drought, war, exhausted land — some mix ----------
  function s8(ctx, lt, dur, t) {
    const em = clamp((t - A.abandoned + .3) / 2.0);
    ground(ctx, t, 1.9); shape(ctx, mix('#d8d0bc', '#a8a088', em), 4, poly([[-80, 600], [40, 520], [1240, 520], [1360, 600]]));
    temple(ctx, 330, 525, .8, { col: mix('#e0d4b8', '#b8ab90', em) }); temple(ctx, 960, 525, .95, { col: mix('#e0d4b8', '#b8ab90', em), h: 330 }); palace(ctx, 645, 525, .85, { col: mix('#e2d6bc', '#b8ab90', em) });
    if (em > 0) for (let i = 0; i < 14; i++) shape(ctx, '#4a8a3a', 2, ellipse(200 + (i * 83) % 900, 520 - (i * 61) % 300, 20 * em, 10 * em, i)); // vines creep in
    for (let i = 0; i < 6; i++) { const x = 160 + i * 190 + em * (900 + i * 60); if (x < 1400) villager(ctx, x, 760 + (i % 2) * 12, .6, t, i, { still: em <= 0 }); }
    FX.dateTag(ctx, 'c. AD 150 · NORTHERN GUATEMALA');
    if (since(t, 'century') > 0) tag(ctx, '2ND CENTURY AD', 640, 90, since(t, 'century'), 26);
    if (since(t, 'abandoned') > 0 && since(t, 'why') < 0) strip(ctx, 'LARGELY ABANDONED', 640, 170, since(t, 'abandoned'), { px: 44, color: '#c8322a' });
    // why? three cause cards drop into one bowl ("some mix")
    if (since(t, 'why') > 0) { shape(ctx, 'rgba(20,16,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'WHY?', 640, 110, since(t, 'why'), { px: 56 }); }
    const CA = [['DROUGHT', 'droughts', '#e8a83a'], ['WAR', 'war', '#c8322a'], ['EXHAUSTED LAND', 'exhausted', '#8a5a34']], mixK = clamp((since(t, 'eggs') + .3) / .8);
    for (let i = 0; i < 3; i++) { const k = since(t, CA[i][1]); if (k <= 0) continue; const s = pop(k), x0 = 300 + i * 340, y0 = 330, x = lerp(x0, 640, ease.in(mixK)), y = lerp(y0, 560, ease.in(mixK));
      ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 - mixK * .5), s * (1 - mixK * .5)); ctx.rotate((i - 1) * .06 + mixK * (i - 1)); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-126, -66, 260, 140)); shape(ctx, '#fbf6ea', 4, rect(-130, -70, 260, 140, 6)); shape(ctx, CA[i][2], 0, rect(-130, -70, 260, 26, 6));
      if (i === 0) { shape(ctx, '#f6c945', 3, circle(-60, 10, 24)); for (let j = 0; j < 4; j++) line(ctx, [[0 + j * 26, 20], [10 + j * 26, 40], [4 + j * 26, 56]], 3, '#8a5a34'); }
      if (i === 1) { line(ctx, [[-50, 50], [40, -20]], 6, '#6a4a2a'); line(ctx, [[50, 50], [-40, -20]], 6, '#6a4a2a'); shape(ctx, '#9a9a9a', 2.5, poly([[40, -20], [56, -36], [46, -14]])); shape(ctx, '#9a9a9a', 2.5, poly([[-40, -20], [-56, -36], [-46, -14]])); }
      if (i === 2) { shape(ctx, '#b8946a', 3, rect(-90, 10, 180, 40, 4)); for (let j = 0; j < 4; j++) line(ctx, [[-70 + j * 44, 50], [-60 + j * 44, 30]], 3, '#7a5a3a'); line(ctx, [[60, 20], [64, -10]], 3, '#8a7a4a'); }
      txt(ctx, CA[i][0], 0, -57, FX.DISPLAY(18), '#fff'); ctx.restore(); }
    if (mixK > 0) { shape(ctx, '#8a5a34', 5, c => { c.moveTo(480, 560); c.quadraticCurveTo(640, 720, 800, 560); c.closePath(); }); if (since(t, 'eggs') > .3) tag(ctx, 'PROBABLY SOME MIX', 640, 650, since(t, 'eggs') - .3, 26); }
    if (since(t, 'argue') > 0 && mixK < 1) tag(ctx, 'HISTORIANS STILL ARGUE', 640, 200, since(t, 'argue'), 22);
    vig(ctx);
  }

  // ---------- s9: the big cities emptied. But the people didn't vanish — they moved, farmed, rebuilt somewhere else ----------
  function s9(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, 1.0, lerp(560, 760, ease.inOut(clamp(lt / dur))), 380);
    ground(ctx, t, 2); shape(ctx, '#a8a088', 4, poly([[-300, 600], [-200, 520], [500, 520], [600, 600]]));
    temple(ctx, 120, 525, .75, { col: '#b8ab90' }); for (let i = 0; i < 18; i++) shape(ctx, '#4a8a3a', 2, ellipse(-60 + (i * 53) % 480, 520 - (i * 61) % 280, 22, 11, i));
    // a new village on the right: fields and huts going up
    const bk = clamp((t - A.rebuild + .3) / 1.2), fk = clamp((t - A.farms + .2) / .8);
    shape(ctx, '#8a6a44', 3, rect(860, 580, 420, 70)); for (let i = 0; i < 6; i++) { const k = FX.settle(clamp(fk * 6 - i)); if (k <= 0) continue; ctx.save(); ctx.translate(890 + i * 66, 600); ctx.scale(k, k); line(ctx, [[0, 0], [0, -60]], 6, '#4a8a2a'); for (const d of [-1, 1]) shape(ctx, '#6ab048', 2, ellipse(d * 16, -40, 18, 6, d * .5)); ctx.restore(); }
    for (let i = 0; i < 2; i++) { const k = FX.settle(clamp(bk * 2 - i)); if (k <= 0) continue; ctx.save(); ctx.translate(1000 + i * 190, 560); ctx.scale(.6 * k, .6 * k); shape(ctx, '#e8dcc0', 4, rect(-90, -110, 180, 110, 30)); shape(ctx, '#5a3a20', 3, rect(-24, -70, 48, 70, 14)); shape(ctx, '#c8a050', 4, c => { c.moveTo(-120, -90); c.quadraticCurveTo(0, -250, 120, -90); c.quadraticCurveTo(0, -120, -120, -90); c.closePath(); }); ctx.restore(); }
    // families walking from the old city to the new village
    const mk = clamp((t - A.moved + .5) / 3.5); for (let i = 0; i < 6; i++) { const x = lerp(300 + i * 60, 820 + i * 70, mk); villager(ctx, x, 740 + (i % 2) * 14, .55 - (i % 3) * .07, t, i, { still: mk <= 0 || mk >= 1 }); }
    ctx.restore();
    if (since(t, 'emptied') > 0) tag(ctx, 'THE BIG CITIES EMPTIED', 330, 110, since(t, 'emptied'), 26);
    if (since(t, 'vanish') > 0) strip(ctx, "THE PEOPLE DIDN'T VANISH", 760, 190, since(t, 'vanish'), { px: 38, color: '#2f7a46' });
    tag(ctx, 'MOVED', 700, 300, since(t, 'moved'), 22); tag(ctx, 'FARMED', 900, 300, since(t, 'farms'), 22); tag(ctx, 'REBUILT', 1110, 300, since(t, 'rebuild'), 22);
    vig(ctx);
  }

  // ---------- s10: the kings fell. The farmers stayed. ----------
  function s10(ctx, lt, dur, t) {
    ground(ctx, t, 1.8); shape(ctx, '#8a6a44', 3, rect(-600, 600, 2600, 300));
    // the king's statue topples
    const fk = clamp((since(t, 'fell') + .1) / .7); ctx.save(); ctx.translate(380, 620); ctx.rotate(-ease.in(fk) * 1.45); ctx.translate(-380, -620);
    shape(ctx, '#b8ab90', 4, rect(300, 560, 160, 60, 4)); ctx.save(); ctx.globalAlpha = 1; king(ctx, 380, 560, .55, t, { coat: '#b8ab90', skin: '#a89a80', plume: '#9a9a88', still: true }); ctx.restore(); ctx.restore();
    if (fk >= 1) { shape(ctx, 'rgba(140,120,100,.5)', 0, ellipse(120, 640, 160 * clamp(since(t, 'fell') - .6), 30)); }
    // the farmer stays, with the corn
    villager(ctx, 920, 720, .82, t, 3, { still: true });
    for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(1060 + i * 70, 640); const sw = Math.sin(t * 1.3 + i) * 3; line(ctx, [[0, 0], [sw, -200]], 9, '#4a8a2a'); for (let j = 0; j < 4; j++) { const d = j % 2 ? 1 : -1; shape(ctx, '#6ab048', 2.5, c => { c.moveTo(sw * j / 4, -50 - j * 36); c.quadraticCurveTo(d * 50, -90 - j * 36, d * 70, -50 - j * 36); c.quadraticCurveTo(d * 30, -66 - j * 36, sw * j / 4, -40 - j * 36); c.closePath(); }); } shape(ctx, '#f6c945', 3, ellipse(sw + 12, -120, 10, 26, .3)); ctx.restore(); }
    if (since(t, 'fell') > 0) strip(ctx, 'THE KINGS FELL.', 380, 150, since(t, 'fell'), { px: 48, color: '#c8322a' });
    if (since(t, 'stayed') > 0) strip(ctx, 'THE FARMERS STAYED.', 960, 250, since(t, 'stayed'), { px: 48, color: '#2f7a46', rot: .02 });
    vig(ctx);
  }

  // ---------- s11: that's ending number one. Let's keep counting. ----------
  function s11(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); ctx.translate(560, 340); ctx.rotate(-.02); const s = slam(lt + .2); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-330, -150, 680, 320)); shape(ctx, '#fbf6ea', 5, rect(-340, -160, 680, 320, 4)); ctx.lineWidth = 10; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-322, -142, 644, 284);
    txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 22), '#5a5048'); txt(ctx, 'THE MAYA', 0, -36, FX.DISPLAY(66)); txt(ctx, 'ARE FINISHED.', 0, 34, FX.DISPLAY(56), RED); line(ctx, [[-200, 84], [200, 84]], 3, '#9a8a7a'); txt(ctx, 'Ending #1 — the Preclassic collapse, c. 2nd century AD', 0, 112, FX.FONT(700, 17), '#5a5048'); ctx.restore();
    const n = since(t, 'one') > 0 ? 1 : 0; counter(ctx, 1060, 230, `ENDINGS: ${n}`, lt + .1, 'DECLARED', GOLD, 44); if (since(t, 'one') > 0 && since(t, 'one') < .6) glow(ctx, 1060, 230, 120, 'rgba(255,220,120,.5)');
    if (since(t, 'counting') > -.4) FX.stamp(ctx, 'WRONG', 560, 560, since(t, 'counting') + .4, { color: '#2f7a46', size: 56 });
    strip(ctx, "LET'S KEEP COUNTING", 640, 70, since(t, 'counting') - .2, { px: 36 });
    vig(ctx);
  }

  const cut = [[0, s1], [A.and1 - .05, s2], [A.now - .05, s3], [A.think - .05, s4], [A.same - .1, s5], [A.some - .1, s6], [A.the2 - .05, s7], [A.and3 - .05, s8], [A.the4 - .05, s9], [A.the5 - .05, s10], [A.thats - .1, s11]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.plaza, type: 'slide', gain: .3 }, { t: A.temples, type: 'thud', gain: .4 }, { t: A.painted, type: 'click', gain: .3 }, { t: A.carved, type: 'thud', gain: .3 },
    { t: A.holy, type: 'swell', gain: .5 }, { t: A.gods, type: 'wind', gain: .3 }, { t: A.rain, type: 'splash', gain: .4 }, { t: A.corn, type: 'click', gain: .4 },
    { t: A.empire, type: 'thud', gain: .6 }, { t: A.never + .3, type: 'rattle', gain: .4 }, { t: A.nfl, type: 'whoosh', gain: .4 }, { t: A.dozens, type: 'click', gain: .4 },
    { t: A.language, type: 'click', gain: .4 }, { t: A.gods2, type: 'click', gain: .4 }, { t: A.calendar, type: 'click', gain: .4 }, { t: A.ball, type: 'thud', gain: .5 }, { t: A.beat, type: 'hit', gain: .4 },
    { t: A.mirador, type: 'click', gain: .4 }, { t: A.abandoned, type: 'boom', gain: .3 }, { t: A.why, type: 'thud', gain: .5 }, { t: A.droughts, type: 'paper', gain: .4 }, { t: A.war, type: 'paper', gain: .4 }, { t: A.exhausted, type: 'paper', gain: .4 },
    { t: A.eggs, type: 'slide', gain: .4 }, { t: A.moved, type: 'slide', gain: .3 }, { t: A.fell, type: 'boom', gain: .6 }, { t: A.stayed, type: 'swell', gain: .4 }, { t: A.one, type: 'thud', gain: .7 }, { t: A.counting, type: 'thud', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.holy - .3, mood: 'under' }, { t: A.and3 - .3, mood: 'tense' }, { t: A.the4 - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-spark.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
