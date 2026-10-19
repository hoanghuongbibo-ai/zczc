/* The Maya — Beat 4a "The stranger" (narration-stranger.mp3 = 1.8 s chapter pause + narration-full.mp3 297.3–389.5 s + 1.2 s tail).
 * Anchors = full-recording word times − 295.5. Tikal, AD 378: Siyaj K'ak' arrives, the king dies the same day, Spearthrower Owl's son on the throne. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { scribe: 300.67, powerful: 302.7, pyramid: 306.8, above: 309.34, jungle: 309.79, ships: 311.62, and1: 312.75, someone: 313.59, arrives: 314.01, name: 317.77, fire: 320.01, and2: 321.7, chilling: 322.82, very: 324.13, king: 326.98, died: 328.9, within: 329.91, year: 330.47, throne: 332.54, mysterious: 334.06, owl: 337.5, and3: 338.37, warriors: 340.52, style: 341.22, the2: 342.92, giant: 342.98, mexico: 344.29, six: 345.62, away: 346.7, thats: 347.61, drive: 348.09, foot: 350.46, mountains: 351.25, forest: 352.3, so: 353.38, takeover: 355.12, coup: 356.55, lights: 358.09, here: 359.16, steward: 361.98, conquest: 365.13, order: 367.48, others: 368.48, alliance: 370.56, what: 371.86, results: 373.37, centuries: 374.55, bragging: 377.03, the3: 380.23, rain: 384.09, rivals: 385.36, personal: 388.48 };
  const A = {}; for (const k in F) A[k] = F[k] - 295.5; A.end = 95.2;
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
  function canopy(ctx, t, y0 = 420) { for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) { const x = -120 + i * 100 + (r % 2) * 50, y = y0 + r * 70 + ((i * 37) % 30); shape(ctx, mix('#2f6a3a', '#5aa04a', ((i * 7 + r * 3) % 10) / 10), 3, smooth([[x - 80, y + 30], [x - 70, y - 20], [x - 20, y - 50], [x + 30, y - 46], [x + 70, y - 14], [x + 80, y + 30]])); } }
  const imgFrame = (ctx, key, x, y, w, h, k, label) => { const im = T.IMG[key]; if (im) N.frame(ctx, im, x, y, w, h, k, label); };
  // the Teotihuacan look: square feathered shield with a goggle-eyed storm-god face, darts and spearthrower, tasselled headdress
  function teoWarrior(ctx, x, y, s, t, v, o = {}) {
    N.walker(ctx, x, y, s, t, v, { plain: true, still: o.still, flip: o.flip, coat: '#e8dcc0', pants: SK[v % 5], skin: SK[v % 5], hair: '#1d1a17', hs: 0, shoe: '#8a6a3a' });
    ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    for (let i = 0; i < 5; i++) shape(ctx, i % 2 ? '#2f9a8a' : '#e8a83a', 2, ellipse(-24 + i * 12, -372 - Math.abs(i - 2) * -6, 7, 26, (i - 2) * .25)); shape(ctx, '#c8322a', 3, rect(-36, -350, 72, 18, 4));
    for (const d of [-1, 1]) { ctx.lineWidth = 4; ctx.strokeStyle = '#1d1a17'; ctx.beginPath(); ctx.arc(d * 13, -300, 13, 0, 7); ctx.stroke(); } // goggles
    line(ctx, [[46, -150], [64, -330]], 5, '#6a4a2a'); for (const dx of [0, 8]) { line(ctx, [[56 + dx, -170], [74 + dx, -340]], 3, '#8a6a3a'); shape(ctx, '#9a9a9a', 0, poly([[74 + dx, -340], [78 + dx, -356], [70 + dx, -342]])); }
    ctx.save(); ctx.translate(-56, -180); shape(ctx, '#e8dcc0', 4, rect(-38, -44, 76, 88, 4)); for (let i = 0; i < 6; i++) shape(ctx, i % 2 ? '#2f9a8a' : '#e8a83a', 1.5, ellipse(-30 + i * 12, 50, 5, 12)); for (const d of [-1, 1]) { shape(ctx, '#fff', 2.5, circle(d * 13, -14, 11)); shape(ctx, INK, 0, circle(d * 13, -14, 4)); } shape(ctx, '#c8322a', 2, rect(-14, 6, 28, 16, 3)); ctx.restore();
    ctx.restore(); }
  function owlEmblem(ctx, x, y, s, a = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
    shape(ctx, '#5a4a3a', 4, smooth([[-80, 40], [-90, -40], [-60, -90], [0, -100], [60, -90], [90, -40], [80, 40], [0, 70]])); for (const d of [-1, 1]) { shape(ctx, '#f6c945', 4, circle(d * 34, -30, 26)); shape(ctx, INK, 0, circle(d * 34, -30, 11)); shape(ctx, '#5a4a3a', 3, poly([[d * 50, -80], [d * 76, -120], [d * 72, -74]])); }
    shape(ctx, '#e8a83a', 3, poly([[-10, -6], [10, -6], [0, 14]])); line(ctx, [[-100, 80], [100, -10]], 10, '#8a6a3a'); shape(ctx, '#8a6a3a', 3, circle(-100, 80, 12)); ctx.restore(); }
  function codex(ctx, x, y, s, k, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 4; i++) { const px = -150 + i * 76; shape(ctx, '#f4ecd6', 2.5, poly([[px, -40 + (i % 2) * 8], [px + 76, -40 + ((i + 1) % 2) * 8], [px + 76, 40 + ((i + 1) % 2) * 8], [px, 40 + (i % 2) * 8]]));
      const n = Math.floor(clamp(k * 4 - i) * 6); for (let j = 0; j < n; j++) { const gx = px + 12 + (j % 2) * 30, gy = -26 + Math.floor(j / 2) * 24 + (i % 2) * 4; shape(ctx, j % 3 ? '#c8322a' : '#1d1a17', 1.5, rect(gx, gy, 22, 18, 5)); } } ctx.restore(); }

  // ---------- a1: January AD 378 — you're a scribe in Tikal, one of the most powerful cities in the Maya world ----------
  function a1(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 380);
    ground(ctx, t, 1.95, 460); shape(ctx, '#d8d0bc', 4, poly([[-80, 560], [40, 500], [1240, 500], [1360, 560]]));
    temple(ctx, 300, 505, .85, { col: '#e0d4b8', paint: true, h: 330, w: 130 }); temple(ctx, 980, 505, .7, { col: '#e0d4b8', paint: true, h: 260, w: 120 }); palace(ctx, 640, 505, .7, { paint: true });
    for (let i = 0; i < 9; i++) villager(ctx, 120 + i * 130, 560, .3, t, i, { still: i % 3 !== 0 });
    // the scribe's terrace in the foreground
    shape(ctx, '#c8b898', 4, rect(-80, 600, 1440, 200)); shape(ctx, '#b8a888', 0, rect(-80, 600, 1440, 14));
    villager(ctx, 470, 790, .9, t, 2, { still: true, reach: true, coat: '#f4ecd6' }); shape(ctx, '#c8322a', 3, rect(470 - 34, 790 - 336, 68, 12, 4)); line(ctx, [[470 + 20, 790 - 340], [470 + 40, 790 - 380]], 4, '#6a4a2a');
    shape(ctx, '#8a5a34', 4, rect(560, 650, 420, 30, 6)); codex(ctx, 770, 630, 1.0, clamp((t - A.scribe + .5) / 6), t); line(ctx, [[540, 560], [700, 610]], 5, '#6a4a2a'); shape(ctx, '#1d1a17', 0, circle(700, 612, 4));
    shape(ctx, '#c8322a', 3, ellipse(1040, 660, 30, 14)); shape(ctx, '#1d1a17', 3, ellipse(1110, 660, 30, 14)); // paint pots
    ctx.restore();
    FX.dateTag(ctx, 'JANUARY, AD 378 · TIKAL');
    tag(ctx, "YOU'RE A SCRIBE", 470, 300, since(t, 'scribe'), 24); if (since(t, 'powerful') > 0) tag(ctx, 'ONE OF THE MOST POWERFUL CITIES', 900, 130, since(t, 'powerful'), 24);
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 4 · THE ESCALATION', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE STRANGER', 640, 350, lt - .35, { px: 66, color: '#c8322a', rot: .02 }); tag(ctx, 'AD 378', 640, 440, lt - .7, 26); ctx.restore(); }
    vig(ctx);
  }

  // ---------- a2: pyramids so tall they'll one day stick up above the jungle like the masts of buried ships ----------
  function a2(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 360);
    M.sky(ctx, t, 1.5, 430); for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = .55; shape(ctx, '#f8f4ee', 0, ellipse(((i * 410 + t * 10) % 1700) - 200, 400 - i * 16, 240, 24)); ctx.restore(); }
    const rise = ease.out(clamp((t - A.jungle + 1.2) / 1.6));
    for (const [x, s, h] of [[260, .8, 300], [560, 1.0, 340], [880, .9, 320], [1120, .7, 260]]) temple(ctx, x, 560 + 120 * (1 - rise), s, { col: '#d0c4a6', dark: '#8a7e66', h, w: 110, tiers: 5 });
    canopy(ctx, t, 470); birds(ctx, t, 5, 130);
    // the ghost of a ship's mast and sail on "buried ships"
    const sk = clamp((since(t, 'ships') + .3) / .6); if (sk > 0) { ctx.save(); ctx.globalAlpha = .35 * sk; for (const [x, s] of [[560, 1], [880, .8]]) { line(ctx, [[x, 420], [x, 60]], 8, '#3a2a20'); shape(ctx, '#f4efe2', 3, poly([[x + 6, 90], [x + 6, 300], [x + 120 * s, 280], [x + 100 * s, 100]])); } ctx.restore(); }
    ctx.restore();
    FX.dateTag(ctx, 'TIKAL · ONE DAY'); tag(ctx, 'ABOVE THE JUNGLE', 640, 110, since(t, 'above'), 26); if (since(t, 'ships') > 0) tag(ctx, 'LIKE THE MASTS OF BURIED SHIPS', 640, 170, since(t, 'ships'), 24);
    vig(ctx);
  }

  // ---------- a3: today, someone arrives — the stones call him Siyaj K'ak', "Fire Is Born" ----------
  function a3(ctx, lt, dur, t) {
    const march = clamp((t - A.someone + 1.0) / 6.0);
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 760, 400);
    ground(ctx, t, 1.6, 460); temple(ctx, 1040, 470, .6, { col: '#e0d4b8', paint: true, h: 300, w: 110 }); palace(ctx, 820, 470, .5, { paint: true });
    shape(ctx, '#e0d6c0', 4, poly([[-200, 720], [-120, 560], [1500, 520], [1500, 720]])); // the causeway (sacbe)
    for (let i = 0; i < 8; i++) villager(ctx, 900 + i * 50, 545, .28, t, i, { still: true });
    for (let i = 0; i < 7; i++) { const x = lerp(-300, 520, march) - i * 120, y = 690 - i * 8; teoWarrior(ctx, x, y, i === 0 ? .62 : .5, t, i + 1, { still: march >= 1 }); }
    ctx.restore();
    FX.dateTag(ctx, 'JANUARY, AD 378 · TIKAL');
    tag(ctx, 'SOMEONE ARRIVES', 640, 100, since(t, 'arrives'), 28);
    if (since(t, 'name') > -.2) { const k = pop(since(t, 'name') + .2); ctx.save(); ctx.translate(980, 230); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -76, 400, 170)); shape(ctx, '#fbf6ea', 4, rect(-200, -80, 400, 170, 6));
      txt(ctx, "SIYAJ K'AK'", 0, -36, FX.DISPLAY(40), '#c8322a'); txt(ctx, 'SEE-yahk KAHK', 0, 6, FX.FONT(700, 18), '#6a5a4a'); if (since(t, 'fire') > 0) txt(ctx, '"FIRE IS BORN"', 0, 50, FX.DISPLAY(32), '#e8742a'); ctx.restore(); }
    vig(ctx);
  }

  // ---------- a4: the stones record something chilling — on the very day he arrived, the long-reigning king died ----------
  function a4(ctx, lt, dur, t) {
    deskBg(ctx, t);
    imgFrame(ctx, 'stela31', 260, 360, 230, 400, lt + .1, 'TIKAL STELA 31');
    // the same-day card
    const sk = since(t, 'very') + .1; if (sk > 0) { const s = pop(sk); ctx.save(); ctx.translate(800, 250); ctx.rotate(-.02); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-286, -96, 580, 270)); shape(ctx, '#fbf6ea', 4, rect(-290, -100, 580, 270, 6));
      txt(ctx, 'ONE DAY IN JANUARY, AD 378', 0, -64, FX.DISPLAY(28)); line(ctx, [[0, -40], [0, 160]], 3, '#c8b8a0');
      teoWarrior(ctx, -150, 160, .3, t, 1, { still: true }); txt(ctx, 'ARRIVES', -150, -28, FX.DISPLAY(22), '#2f4a8a');
      if (since(t, 'king') > 0) { const kk = clamp(since(t, 'died') / .8); ctx.save(); ctx.globalAlpha = 1 - kk * .55; king(ctx, 150, 160, .26, t, { cape: '#2f4a8a' }); ctx.restore(); txt(ctx, 'THE KING', 150, -28, FX.DISPLAY(22), '#c8322a'); }
      ctx.restore(); }
    if (since(t, 'king') > 0) tag(ctx, "CHAK TOK ICH'AAK · KING OF TIKAL", 800, 470, since(t, 'king'), 22);
    if (since(t, 'died') > 0) FX.stamp(ctx, 'DIED — THE SAME DAY', 820, 580, since(t, 'died'), { color: '#c8322a', size: 40 });
    if (since(t, 'chilling') > 0 && since(t, 'very') < 0) strip(ctx, 'SOMETHING CHILLING', 800, 250, since(t, 'chilling'), { px: 40 });
    vig(ctx);
  }

  // ---------- a5: within a year, a new king on Tikal's throne — the son of a foreign lord called "Spearthrower Owl" ----------
  function a5(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8a3a2a'], [1, '#5a2a20']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 6; i++) shape(ctx, 'rgba(255,220,180,.06)', 0, rect(80 + i * 200, 0, 90, H));
    glow(ctx, 520, 360, 360, 'rgba(255,190,120,.35)');
    // the shadow of the foreign lord behind the throne
    const ok = clamp((since(t, 'owl') + .5) / .8); if (ok > 0) owlEmblem(ctx, 520, 250, 1.5, .35 * ok);
    shape(ctx, '#6a3a2a', 4, rect(340, 520, 360, 120, 8)); shape(ctx, '#c8a040', 3, rect(340, 520, 360, 16)); for (let i = 0; i < 4; i++) shape(ctx, '#e8a040', 2.5, ellipse(380 + i * 95, 500, 30, 14)); // the throne bench with jaguar cushions
    king(ctx, 520, 600, .55, t, { cape: '#2f9a8a', plume: '#2f9a8a', coat: '#e8dcc0', skin: '#a8704a' });
    imgFrame(ctx, 'marcador', 1020, 360, 230, 390, since(t, 'owl') + .2, 'TIKAL "MARCADOR"');
    counter(ctx, 160, 110, since(t, 'year') > 0 ? 'AD 379' : 'AD 378', lt + .1, null, GOLD, 34);
    tag(ctx, 'A NEW KING ON THE THRONE', 520, 90, since(t, 'throne'), 26);
    if (since(t, 'owl') > 0) strip(ctx, '"SPEARTHROWER OWL"', 520, 170, since(t, 'owl'), { px: 38, color: '#5a4a3a' });
    if (since(t, 'mysterious') > 0) tag(ctx, 'SON OF A MYSTERIOUS FOREIGN LORD', 520, 680, since(t, 'mysterious'), 22);
    vig(ctx);
  }

  // ---------- a6: suddenly Tikal's art is full of warriors in the style of Teotihuacan ----------
  function a6(ctx, lt, dur, t) {
    deskBg(ctx, t);
    // a painted vase rolled out flat: Maya figures on the left, Teotihuacan-style warriors taking over
    ctx.save(); ctx.translate(640, 380); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-512, -196, 1040, 400)); shape(ctx, '#e8b878', 5, rect(-520, -204, 1040, 400, 10)); shape(ctx, '#c8322a', 0, rect(-520, -204, 1040, 30)); shape(ctx, '#c8322a', 0, rect(-520, 166, 1040, 30));
    for (let i = 0; i < 10; i++) shape(ctx, '#1d1a17', 1.5, rect(-500 + i * 104, -196, 30, 14, 3));
    const tk = clamp((t - A.warriors + .3) / 1.6);
    for (let i = 0; i < 5; i++) { const x = -400 + i * 200, isTeo = i < Math.round(tk * 5); ctx.save(); ctx.translate(x, 160); if (isTeo) teoWarrior(ctx, 0, 0, .55, t, i, { still: true }); else villager(ctx, 0, 0, .55, t, i, { still: true, coat: '#f0e6cc' }); ctx.restore(); }
    ctx.restore();
    strip(ctx, "TIKAL'S ART", 640, 70, lt - .1, { px: 34 }); if (since(t, 'style') > 0) tag(ctx, 'IN THE STYLE OF TEOTIHUACAN', 640, 650, since(t, 'style'), 26);
    vig(ctx);
  }

  // ---------- a7: Teotihuacan, near today's Mexico City — roughly 600 miles away ----------
  function a7(ctx, lt, dur, t) {
    const [tx, ty] = MP([-98.84, 19.69]), [kx, ky] = MP(M.SITES.tikal);
    ctx.save(); T.cam(ctx, .62, 400, 300); mayaMap(ctx, t, { today: false });
    const ak = clamp((since(t, 'away') + 1.4) / 1.3);
    if (ak > 0) { ctx.save(); ctx.setLineDash([22, 14]); const mx = (tx + kx) / 2, my = Math.min(ty, ky) - 160, n = 30; ctx.lineWidth = 9; ctx.strokeStyle = '#c8322a'; ctx.beginPath(); for (let i = 0; i <= n * ak; i++) { const u = i / n, x = (1 - u) * (1 - u) * tx + 2 * u * (1 - u) * mx + u * u * kx, y = (1 - u) * (1 - u) * ty + 2 * u * (1 - u) * my + u * u * ky; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
    site(ctx, [-98.84, 19.69], since(t, 'giant') + .3, 'TEOTIHUACAN', { r: 14, px: 28, left: true }); site(ctx, 'tikal', lt + .2, 'TIKAL', { r: 14, px: 28 });
    { const [mx, my] = MP([-99.13, 19.43]); if (since(t, 'mexico') > 0) { shape(ctx, '#2f4a8a', 3, circle(mx - 14, my + 30, 9)); txt(ctx, '(today: Mexico City)', mx - 14, my + 64, FX.FONT(800, 24), '#2f4a8a'); } }
    ctx.restore();
    if (since(t, 'six') > 0) counter(ctx, 640, 640, '≈ 600 MILES', since(t, 'six'), null, GOLD, 48);
    vig(ctx);
  }

  // ---------- a8: about the drive from New York to Detroit — except on foot, through mountains and rainforest ----------
  function a8(ctx, lt, dur, t) {
    M.sky(ctx, t, 2, 460);
    // top band: a highway and a road sign
    shape(ctx, '#8ab868', 0, rect(0, 250, W, 110)); shape(ctx, '#5a5a62', 0, rect(0, 300, W, 50)); for (let i = 0; i < 14; i++) shape(ctx, '#f6e27a', 0, rect(((i * 120 - t * 220) % 1500 + 1500) % 1500 - 100, 322, 60, 6));
    { const cx = 200 + ((t * 140) % 900); shape(ctx, '#c8322a', 3.5, rect(cx - 60, 270, 120, 40, 10)); shape(ctx, '#9ad0f0', 2.5, rect(cx - 30, 258, 60, 20, 6)); for (const d of [-36, 36]) shape(ctx, INK, 0, circle(cx + d, 312, 12)); }
    { const k = pop(since(t, 'drive') + .1); ctx.save(); ctx.translate(960, 150); ctx.scale(k, k); line(ctx, [[0, 40], [0, 130]], 8, '#7a7a80'); shape(ctx, '#2f7a46', 4, rect(-190, -60, 380, 110, 8)); txt(ctx, 'DETROIT  ≈ 600 MI', 0, -18, FX.DISPLAY(30), '#fff'); txt(ctx, 'from NEW YORK', 0, 22, FX.FONT(800, 18), '#fff'); ctx.restore(); }
    // bottom band: on foot, over mountains and through rainforest
    shape(ctx, '#7aa858', 0, rect(0, 420, W, 300));
    const fk = clamp((since(t, 'foot') + .2) / .5); if (fk > 0) { ctx.save(); ctx.globalAlpha = fk; shape(ctx, '#8a9aa8', 4, poly([[-40, 640], [160, 450], [300, 600], [460, 420], [640, 640]])); shape(ctx, '#f4f4f8', 0, poly([[430, 450], [460, 420], [490, 452]]));
      for (let i = 0; i < 8; i++) shape(ctx, mix('#2f6a3a', '#5aa04a', (i % 3) / 3), 3, smooth([[640 + i * 90, 640], [650 + i * 90, 560], [700 + i * 90, 520], [750 + i * 90, 560], [760 + i * 90, 640]]));
      const wx = lerp(40, 1200, clamp((t - A.foot) / 3.0)); teoWarrior(ctx, wx, 690, .42, t, 2, {}); ctx.restore(); }
    if (since(t, 'foot') > 0) strip(ctx, 'EXCEPT ON FOOT', 300, 460, since(t, 'foot'), { px: 36, color: '#c8322a' });
    if (since(t, 'mountains') > 0) tag(ctx, 'MOUNTAINS', 320, 700, since(t, 'mountains'), 22); if (since(t, 'forest') > 0) tag(ctx, 'RAINFOREST', 950, 700, since(t, 'forest'), 22);
    vig(ctx);
  }

  // ---------- a9: so what was this? A takeover, a dynastic coup, or a powerful alliance? ----------
  const OPTS = [['A TAKEOVER?', 'takeover', '#c8322a'], ['A DYNASTIC COUP?', 'coup', '#7a4a8a'], ['AN ALLIANCE?', 'lights', '#2f7a46']];
  function a9(ctx, lt, dur, t) {
    deskBg(ctx, t); strip(ctx, 'SO WHAT WAS THIS?', 640, 90, lt - .05, { px: 46 });
    for (let i = 0; i < 3; i++) { const k = since(t, OPTS[i][1]) + .15; if (k <= 0) continue; const s = pop(k); ctx.save(); ctx.translate(250 + i * 390, 380); ctx.rotate((i - 1) * .04); ctx.scale(s, s);
      shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-156, -126, 320, 260)); shape(ctx, '#fbf6ea', 4, rect(-160, -130, 320, 260, 6)); shape(ctx, OPTS[i][2], 0, rect(-160, -130, 320, 36, 6)); txt(ctx, OPTS[i][0], 0, -111, FX.DISPLAY(24), '#fff');
      if (i === 0) { teoWarrior(ctx, -40, 120, .3, t, 1, { still: true }); line(ctx, [[30, 40], [110, 40]], 8, '#c8322a'); shape(ctx, '#c8322a', 0, poly([[110, 24], [134, 40], [110, 56]])); temple(ctx, 120, 110, .18, { col: '#e0d4b8' }); }
      if (i === 1) { shape(ctx, '#c8a040', 3, c => { c.moveTo(-60, 30); c.lineTo(-50, -40); c.lineTo(-25, -10); c.lineTo(0, -50); c.lineTo(25, -10); c.lineTo(50, -40); c.lineTo(60, 30); c.closePath(); }); line(ctx, [[-90, 80], [90, 80]], 6, '#7a4a8a'); shape(ctx, '#7a4a8a', 0, poly([[90, 66], [112, 80], [90, 94]])); }
      if (i === 2) { for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 50, 0); line(ctx, [[0, 60], [-d * 30, 10]], 22, INK); line(ctx, [[0, 60], [-d * 30, 10]], 16, d < 0 ? '#e8dcc0' : '#f0e6cc'); ctx.restore(); } shape(ctx, '#a8704a', 4, circle(0, 4, 26)); }
      ctx.restore(); }
    vig(ctx);
  }

  // ---------- a10: where the experts stand — David Stuart: a military conquest; others: an alliance ----------
  function a10(ctx, lt, dur, t) {
    deskBg(ctx, t);
    strip(ctx, 'WHERE THE EXPERTS STAND', 640, 70, lt - .05, { px: 36 });
    // left: Stuart's reading
    { const k = pop(since(t, 'here') + .8); if (k > 0) { ctx.save(); ctx.translate(330, 330); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-226, -146, 460, 300)); shape(ctx, '#fbf6ea', 4, rect(-230, -150, 460, 300, 6));
      txt(ctx, 'DAVID STUART', 0, -110, FX.DISPLAY(30)); txt(ctx, 'epigrapher — reads the glyphs', 0, -76, FX.FONT(700, 17), '#6a5a4a');
      if (since(t, 'conquest') > -.3) { txt(ctx, 'A MILITARY', 0, -20, FX.DISPLAY(34), '#c8322a'); txt(ctx, 'CONQUEST', 0, 22, FX.DISPLAY(40), '#c8322a'); } if (since(t, 'order') > -.3) txt(ctx, '→ a new political order', 0, 84, FX.FONT(800, 20), '#3a2a1a'); ctx.restore(); } }
    // right: others
    { const k = pop(since(t, 'others') + .1); if (k > 0) { ctx.save(); ctx.translate(950, 330); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-226, -146, 460, 300)); shape(ctx, '#fbf6ea', 4, rect(-230, -150, 460, 300, 6));
      txt(ctx, 'OTHER SCHOLARS', 0, -110, FX.DISPLAY(30)); txt(ctx, 'read the same stones', 0, -76, FX.FONT(700, 17), '#6a5a4a'); if (since(t, 'alliance') > -.3) { txt(ctx, 'MORE LIKE AN', 0, -20, FX.DISPLAY(30), '#2f7a46'); txt(ctx, 'ALLIANCE', 0, 24, FX.DISPLAY(40), '#2f7a46'); } ctx.restore(); } }
    if (since(t, 'alliance') > .3) { ctx.save(); ctx.translate(640, 590); const s = pop(since(t, 'alliance') - .3); ctx.scale(s, s); shape(ctx, '#1d1a17', 0, rect(-260, -32, 520, 64, 10)); txt(ctx, 'DEBATED — CONQUEST OR ALLIANCE?', 0, 2, FX.DISPLAY(26), GOLD); ctx.restore(); }
    vig(ctx);
  }

  // ---------- a11: what nobody disputes — for centuries, kings kept bragging about their link to that "arrival" ----------
  function a11(ctx, lt, dur, t) {
    ground(ctx, t, 2, 470); shape(ctx, '#d8d0bc', 4, rect(-100, 560, 1500, 200));
    const yrs = ['AD 400', 'AD 500', 'AD 600', 'AD 700'];
    for (let i = 0; i < 4; i++) { const k = clamp((t - A.what - .2 - i * .5) / .5); if (k <= 0) continue; const x = 220 + i * 280; stelaSmall(ctx, x, 600, 2.0, FX.settle(k)); king(ctx, x + 90, 640, .32, t, { v: i, plume: ['#2f9a6a', '#3a8ac8', '#7a4a8a', '#e8a83a'][i] }); tag(ctx, yrs[i], x, 690, k, 20);
      if (since(t, 'bragging') > i * .25) { const bk = pop(since(t, 'bragging') - i * .25); ctx.save(); ctx.translate(x + 40, 250 - (i % 2) * 40); ctx.scale(bk, bk); shape(ctx, '#fff', 3.5, c => { c.roundRect(-110, -36, 220, 64, 22); c.moveTo(20, 28); c.lineTo(40, 60); c.lineTo(46, 28); }); txt(ctx, 'MY LINE GOES BACK', 0, -14, FX.FONT(800, 15)); txt(ctx, 'TO THE ARRIVAL!', 0, 8, FX.FONT(800, 15), '#c8322a'); ctx.restore(); } }
    if (since(t, 'results') > 0) FX.stamp(ctx, 'NOBODY DISPUTES THIS', 640, 120, since(t, 'results'), { color: '#2f4a8a', size: 40 });
    vig(ctx);
  }

  // ---------- a12: being a Maya king isn't just about rain — it's about rivals. And the rivalry is about to get personal ----------
  function a12(ctx, lt, dur, t) {
    const rv = clamp((since(t, 'rivals') + .1) / .6);
    ground(ctx, t, lerp(1.9, 1.5, rv), 470);
    // left: the rain king (from Beat 3) fades; right: two kings face off
    ctx.save(); ctx.globalAlpha = 1 - rv * .7; temple(ctx, 320, 560, .7, { col: '#e0d4b8', paint: true }); king(ctx, 320, 560 - .7 * 300 - 4, .3, t, { reach: true, cape: '#c8322a' }); for (let i = 0; i < 40; i++) { const x = 160 + (i * 41) % 320, y = 80 + ((t * 500 + i * 97) % 300); line(ctx, [[x, y], [x - 5, y + 18]], 2.5, 'rgba(90,150,220,.7)'); } ctx.restore();
    if (rv > 0) { for (const d of [-1, 1]) { const x = 820 + d * lerp(260, 150, ease.out(rv)); king(ctx, x, 700, .62, t, { flip: d > 0, cape: d < 0 ? '#2f4a8a' : '#c8322a', plume: d < 0 ? '#2f9a6a' : '#7a4a8a', staff: true }); }
      ctx.save(); ctx.translate(820, 330); const s = pop(since(t, 'rivals')); ctx.scale(s, s); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; line(ctx, [[Math.cos(a) * 20, Math.sin(a) * 20], [Math.cos(a) * 46, Math.sin(a) * 46]], 6, '#e8322a'); } ctx.restore(); }
    if (since(t, 'rain') > 0) tag(ctx, "NOT JUST ABOUT RAIN", 320, 110, since(t, 'rain'), 26);
    if (since(t, 'rivals') > 0) strip(ctx, "IT'S ABOUT RIVALS", 820, 130, since(t, 'rivals'), { px: 46, color: '#c8322a' });
    if (since(t, 'personal') > 0) tag(ctx, 'ABOUT TO GET PERSONAL…', 820, 220, since(t, 'personal'), 26);
    vig(ctx);
  }

  const cut = [[0, a1], [A.pyramid - .15, a2], [A.and1 - .05, a3], [A.and2 - .05, a4], [A.within - .1, a5], [A.and3 - .05, a6], [A.the2 - .05, a7], [A.thats - .05, a8], [A.so - .1, a9], [A.here - .1, a10], [A.what - .1, a11], [A.the3 - .05, a12]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.scribe, type: 'scratch', gain: .3 }, { t: A.jungle, type: 'swell', gain: .4 }, { t: A.ships, type: 'creak', gain: .3 },
    { t: A.arrives, type: 'thud', gain: .5 }, { t: A.arrives + .6, type: 'thud', gain: .4 }, { t: A.arrives + 1.2, type: 'thud', gain: .4 }, { t: A.name, type: 'paper', gain: .4 }, { t: A.fire, type: 'swell', gain: .5 },
    { t: A.chilling, type: 'wind', gain: .4 }, { t: A.died, type: 'boom', gain: .6 }, { t: A.throne, type: 'thud', gain: .4 }, { t: A.owl, type: 'swell', gain: .5 },
    { t: A.warriors, type: 'whoosh', gain: .4 }, { t: A.six, type: 'click', gain: .5 }, { t: A.drive, type: 'click', gain: .4 }, { t: A.foot, type: 'thud', gain: .4 },
    { t: A.takeover, type: 'paper', gain: .4 }, { t: A.coup, type: 'paper', gain: .4 }, { t: A.lights, type: 'paper', gain: .4 }, { t: A.conquest, type: 'thud', gain: .5 }, { t: A.alliance, type: 'thud', gain: .5 },
    { t: A.results, type: 'thud', gain: .5 }, { t: A.bragging, type: 'click', gain: .4 }, { t: A.rivals, type: 'hit', gain: .6 }, { t: A.personal, type: 'boom', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.pyramid - .2, mood: 'mystery' }, { t: A.and1 - .2, mood: 'tense' }, { t: A.thats - .2, mood: 'under' }, { t: A.so - .2, mood: 'mystery' }, { t: A.the3 - .2, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-stranger.mp3', shots, sfx, moods, images: { stela31: 'assets/img/tikal-stela31-photo.jpg', marcador: 'assets/img/tikal-marcador.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
