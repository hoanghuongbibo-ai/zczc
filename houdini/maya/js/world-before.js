/* The Maya — Beat 2 "The world before" (narration-worldbefore.mp3 = 1.8 s chapter pause + narration-full.mp3 103.0–216.3 s + 1.2 s tail).
 * Anchors = full-recording word times − 101.2. Aguada Fénix: corn → communal building → hidden in plain sight → lidar → "made by everybody". */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { rewind: 103.07, mexican: 106.54, tabasco: 107.42, lowlands: 108.43, border: 109.55, thoughts: 111.2, hot: 111.2, wet: 111.81, green: 112.59, camps: 115.98, hunting: 116.65, fishing: 117.29, gathering: 118.07, but: 119.11, skinny: 121.95, grass: 123.16, patience: 124.54, corn: 125.9, changes: 127.63, stay: 129.95, so: 131.27, neighbor: 133.38, carrying: 134.11, basket: 135.5, years: 137.28, enormous: 139.77, raised: 140.9, platform: 141.82, long: 143.46, four: 144.4, thirty: 146.6, with2: 148.5, nine: 148.69, spokes: 151.03, this: 152.63, aguada: 153.71, flat: 158.31, walk: 159.39, cattle: 162.63, nobody: 164.22, flew: 166.31, laser: 167.05, published: 168.26, oldest: 170.56, built: 174.0, between: 174.62, biggest: 177.92, pyramid: 180.05, afterward: 181.57, and2: 182.61, notice: 182.77, giant: 184.65, throne: 186.35, portrait: 187.53, the3: 188.99, takeshi: 190.6, communal: 192.54, together: 194.87, ordering: 196.4, thats: 197.88, interpretation: 198.28, argue: 200.83, olmec: 204.13, invented: 205.9, but2: 207.38, everybody: 212.74, because: 213.9, change: 215.22 };
  const A = {}; for (const k in F) A[k] = F[k] - 101.2; A.end = 116.3;
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


  const M = G.Maya, { plaza, castillo, crowdBand, mayaMap, site, MP, mix } = M;
  const SK = ['#a8704a', '#7a4a2a', '#c08a5a', '#8a5a34', '#b07848'], CL = ['#e8dcc0', '#d8c49a', '#f0e6cc', '#c8b088'];
  // a Preclassic villager: cotton wrap, bare legs, beads
  const villager = (ctx, x, y, s, t, v, o = {}) => N.walker(ctx, x, y, s, t, v, Object.assign({ plain: true, beads: v % 2 === 0, coat: CL[v % 4], pants: SK[v % 5], skin: SK[v % 5], hair: '#1d1a17', hs: [0, 1, 2, 4][v % 4], shoe: SK[v % 5] }, o));
  function basketOnHead(ctx, x, y, s, full = true, flip = false) { ctx.save(); ctx.translate(x, y - 352 * s); ctx.scale(s, s);
    shape(ctx, '#b88a4a', 3.5, poly([[-40, 0], [40, 0], [30, -40], [-30, -40]])); for (let i = 0; i < 4; i++) line(ctx, [[-36 + i * 2, -10 * i], [36 - i * 2, -10 * i]], 2, '#8a6030');
    if (full) shape(ctx, '#7a5434', 3, c => { c.moveTo(-32, -38); c.quadraticCurveTo(0, -78, 32, -38); c.closePath(); }); ctx.restore(); }
  function cow(ctx, x, y, s, t, ph = 0, flip = false) { ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s); const nod = Math.max(0, Math.sin(t * .9 + ph)) * 14;
    for (const lx of [-40, -20, 30, 48]) line(ctx, [[lx, -40], [lx, 0]], 9, INK), line(ctx, [[lx, -40], [lx, -2]], 5, '#f4efe6');
    shape(ctx, '#f8f4ea', 4, ellipse(0, -60, 70, 36)); shape(ctx, '#2a2420', 0, ellipse(-20, -66, 18, 13, .4)); shape(ctx, '#2a2420', 0, ellipse(26, -52, 14, 10, -.3));
    line(ctx, [[-70, -66], [-84, -30]], 4, INK);
    ctx.save(); ctx.translate(66, -70 + nod); ctx.rotate(.5 + nod / 40); shape(ctx, '#f8f4ea', 4, ellipse(18, 0, 28, 20)); shape(ctx, '#e8b0a0', 3, ellipse(38, 6, 12, 12)); shape(ctx, INK, 0, circle(12, -6, 4)); shape(ctx, '#f8f4ea', 3, ellipse(4, -18, 10, 6, -.6)); ctx.restore(); ctx.restore(); }
  function hut(ctx, x, y, s, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
    shape(ctx, '#e8dcc0', 4, rect(-90, -110, 180, 110, 30)); shape(ctx, '#5a3a20', 3, rect(-24, -70, 48, 70, 14));
    shape(ctx, '#c8a050', 4, c => { c.moveTo(-120, -90); c.quadraticCurveTo(0, -250, 120, -90); c.quadraticCurveTo(0, -120, -120, -90); c.closePath(); }); for (let i = 0; i < 8; i++) line(ctx, [[-100 + i * 28, -96], [-60 + i * 16, -200]], 2.5, '#a88030'); ctx.restore(); }
  function leanTo(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, [[-70, 0], [-10, -110]], 7, '#6a4a2a'); line(ctx, [[70, 0], [10, -110]], 7, '#6a4a2a');
    shape(ctx, '#7aa858', 3.5, poly([[-80, 0], [0, -120], [80, 0]])); for (let i = 0; i < 5; i++) line(ctx, [[-60 + i * 30, 0], [0, -110]], 2, '#4a7a3a'); shape(ctx, '#3a2a1a', 0, poly([[-26, 0], [0, -46], [26, 0]])); ctx.restore(); }
  function fire(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const a of [-.5, .5]) line(ctx, [[-20, 4], [20, -4]].map(([px, py]) => [px * Math.cos(a), py + px * Math.sin(a)]), 8, '#6a4a2a'); const f = Math.sin(t * 9) * 3;
    shape(ctx, '#ff8a2a', 2.5, c => { c.moveTo(-14, 0); c.quadraticCurveTo(-14, -26, f, -44); c.quadraticCurveTo(14, -26, 14, 0); c.closePath(); }); for (let i = 0; i < 3; i++) { const yy = -60 - ((t * 30 + i * 30) % 90); ctx.save(); ctx.globalAlpha = .4 * (1 + yy / 150); shape(ctx, '#ddd', 0, circle(f + Math.sin(yy / 20) * 8, yy, 10 + i * 2)); ctx.restore(); } ctx.restore(); }
  // a corn plant: g 0 = wild teosinte (skinny, tiny cob) → 1 = maize (thick stalk, big ear)
  function cornPlant(ctx, x, y, s, g, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sw = Math.sin(t * 1.2) * 3;
    const hgt = lerp(220, 360, g), w = lerp(5, 14, g);
    line(ctx, [[0, 0], [sw, -hgt]], w + 6, INK); line(ctx, [[0, 0], [sw, -hgt]], w, '#5a9a3a');
    for (let i = 0; i < 6; i++) { const yy = -40 - i * hgt / 7, d = i % 2 ? 1 : -1, len = lerp(60, 120, g); shape(ctx, '#6ab048', 3, c => { c.moveTo(sw * i / 6, yy); c.quadraticCurveTo(d * len * .6, yy - 40, d * len, yy + 10); c.quadraticCurveTo(d * len * .5, yy - 16, sw * i / 6, yy - 10); c.closePath(); }); }
    line(ctx, [[sw, -hgt], [sw - 16, -hgt - 40]], 3, '#c8a050'); line(ctx, [[sw, -hgt], [sw + 14, -hgt - 44]], 3, '#c8a050'); line(ctx, [[sw, -hgt], [sw, -hgt - 50]], 3, '#c8a050');
    // the ear
    const ey = -hgt * .55, el = lerp(22, 110, g), ew = lerp(7, 26, g); ctx.save(); ctx.translate(w / 2 + 6, ey); ctx.rotate(.35);
    if (g > .3) shape(ctx, '#8ac060', 3, c => { c.moveTo(0, 0); c.quadraticCurveTo(-ew * 1.4, -el * .6, 0, -el * 1.1); c.quadraticCurveTo(ew * 1.4, -el * .6, 0, 0); });
    shape(ctx, '#f6c945', 3, ellipse(0, -el / 2, ew, el / 2)); for (let r = 0; r < Math.round(lerp(2, 9, g)); r++) for (let c2 = -1; c2 <= 1; c2++) shape(ctx, '#f8d860', 1.2, circle(c2 * ew * .45, -el * .15 - r * el * .09, ew * .2));
    if (g > .5) for (let i = 0; i < 4; i++) line(ctx, [[0, -el], [-8 + i * 5, -el - 18 - i * 3]], 2, '#a86a3a');
    ctx.restore(); ctx.restore(); }
  function cross(ctx, x, y, k, r = 70) { if (k <= 0) return; const e = clamp(k / .3); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = '#e8322a';
    ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * clamp(e * 2), y - r + 2 * r * clamp(e * 2)); if (e > .5) { ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * clamp(e * 2 - 1), y - r + 2 * r * clamp(e * 2 - 1)); } ctx.stroke(); ctx.restore(); }
  function colossalHead(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#8a8a7a', 4, c => { c.moveTo(-70, 0); c.lineTo(-76, -120); c.quadraticCurveTo(-70, -170, 0, -172); c.quadraticCurveTo(70, -170, 76, -120); c.lineTo(70, 0); c.closePath(); });
    shape(ctx, '#7a7a6a', 3, c => { c.moveTo(-80, -120); c.quadraticCurveTo(0, -190, 80, -120); c.lineTo(80, -136); c.quadraticCurveTo(0, -200, -80, -136); c.closePath(); });
    for (const d of [-1, 1]) { shape(ctx, '#6a6a5a', 2.5, ellipse(d * 28, -92, 16, 8)); } shape(ctx, '#7a7a6a', 3, poly([[-14, -86], [14, -86], [22, -50], [-22, -50]])); shape(ctx, '#5a5a4a', 3, ellipse(0, -28, 30, 10)); ctx.restore(); }
  function throne(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#c8a040', 4, rect(-60, -70, 120, 70, 6)); shape(ctx, '#c8a040', 4, rect(-60, -170, 120, 100, 10)); shape(ctx, '#c8322a', 3, rect(-44, -150, 88, 74, 6)); shape(ctx, '#f6c945', 3, circle(0, -184, 16)); ctx.restore(); }
  function kingStela(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#b8ab90', 4, c => { c.moveTo(-50, 0); c.lineTo(-46, -170); c.quadraticCurveTo(0, -190, 46, -170); c.lineTo(50, 0); c.closePath(); });
    shape(ctx, '#8a7c62', 2.5, circle(0, -130, 16)); for (let i = 0; i < 5; i++) shape(ctx, '#3a8a5a', 2, ellipse(-18 + i * 9, -150 - Math.abs(i - 2) * -4, 4, 14, (i - 2) * .3)); shape(ctx, '#8a7c62', 2.5, rect(-16, -112, 32, 70, 6)); ctx.restore(); }
  // a hand-drawn "lidar" relief: green ground → orange platform with causeways; reveal = 0..1 sweeps left to right
  function lidarField(ctx, t, reveal, o = {}) { const cx = 640, cy = 380, Lw = 760, Lh = 200;
    shape(ctx, '#7aa858', 0, rect(-600, -400, 2600, 1500)); for (let i = 0; i < 70; i++) shape(ctx, i % 2 ? '#6a9848' : '#8ab868', 0, ellipse((i * 173) % 1500 - 100, (i * 97) % 800, 50 + (i % 4) * 14, 30 + (i % 3) * 10, i));
    for (let i = 0; i < 9; i++) { const x = 80 + i * 150; line(ctx, [[x, -10], [x + 30, 760]], 3, 'rgba(120,90,60,.4)'); } // fence lines
    ctx.save(); ctx.beginPath(); ctx.rect(-600, -400, 600 + lerp(-40, 1340, reveal), 1500); ctx.clip();
    shape(ctx, '#4a8a6a', 0, rect(-600, -400, 2600, 1500)); for (let i = 0; i < 200; i++) { const x = (i * 131) % 1400 - 60, y = (i * 71) % 780 - 20; shape(ctx, mix('#3a7a6a', '#8ac0a0', ((i * 37) % 10) / 10), 0, ellipse(x, y, 30, 18, i)); }
    const CW = [[-1, -1, -1.6, -1.8], [0, -1, 0, -1.9], [1, -1, 1.6, -1.8], [-1, 1, -1.7, 1.9], [0, 1, .1, 2.0], [1, 1, 1.5, 1.9], [-1, 0, -2.0, -.2], [1, 0, 2.0, .3], [-.5, 1, -.8, 2.0]];
    for (const [ax, ay, bx, by] of CW) { const x0 = cx + ax * Lw / 2 * .8, y0 = cy + ay * Lh / 2, x1 = cx + bx * Lw / 2, y1 = cy + by * Lh; line(ctx, [[x0, y0], [x1, y1]], 30, '#c87a3a'); line(ctx, [[x0, y0], [x1, y1]], 12, '#e8a050'); }
    shape(ctx, '#a8582a', 0, rect(cx - Lw / 2 + 10, cy - Lh / 2 + 12, Lw, Lh)); shape(ctx, '#d88a3a', 0, rect(cx - Lw / 2, cy - Lh / 2, Lw, Lh)); shape(ctx, '#f0b060', 0, rect(cx - Lw / 2, cy - Lh / 2, Lw, 14));
    for (let i = 0; i < 12; i++) shape(ctx, '#e8a050', 2, ellipse(cx - 300 + (i * 61) % 600, cy - 60 + (i * 47) % 120, 18, 10)); // small mounds on top
    ctx.restore();
    if (reveal > 0 && reveal < 1) { const sx = lerp(-40, 1340, reveal); glow(ctx, sx, 360, 200, 'rgba(120,255,240,.35)'); line(ctx, [[sx, -20], [sx, 740]], 5, '#7affee'); } }

  // ---------- w1: rewind three thousand years — the map, then Tabasco near today's border with Guatemala ----------
  const TABASCO = [[-94.15, 18.15], [-93.3, 18.45], [-92.6, 18.6], [-91.85, 18.6], [-91.45, 18.15], [-90.98, 17.95], [-91.2, 17.4], [-91.45, 17.25], [-92.0, 17.5], [-92.7, 17.4], [-93.4, 17.3], [-93.9, 17.6]];
  function w1(ctx, lt, dur, t) {
    const zk = ease.inOut(clamp((t - A.mexican + .3) / 2.4)), [fx, fy] = MP([-92.0, 17.9]);
    ctx.save(); T.cam(ctx, lerp(1.0, 1.9, zk), lerp(640, fx, zk), lerp(360, fy, zk)); mayaMap(ctx, t);
    if (since(t, 'tabasco') > -.2) { const k = clamp((since(t, 'tabasco') + .2) / .5); ctx.save(); ctx.globalAlpha = k; shape(ctx, 'rgba(246,201,69,.55)', 3, c => { const p = TABASCO.map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); }); ctx.restore();
      const [x, y] = MP([-92.9, 18.0]); txt(ctx, 'TABASCO', x, y, FX.DISPLAY(22), '#5a3a1a'); }
    if (since(t, 'border') > 0) { const k = since(t, 'border'), a = .5 + .5 * Math.sin(k * 8); ctx.save(); ctx.globalAlpha = clamp(k / .3) * a; ctx.setLineDash([12, 8]); line(ctx, [[-92.25, 14.53], [-92.15, 15.05], [-91.73, 16.07], [-90.45, 16.07], [-90.6, 16.5], [-91.1, 16.9], [-91.44, 17.25], [-90.98, 17.25], [-90.98, 17.82], [-89.15, 17.82]].map(MP), 6, '#e8322a'); ctx.restore(); }
    site(ctx, 'aguada', since(t, 'lowlands'), 'YOU ARE HERE', { col: '#2f7a46' });
    ctx.restore();
    // the rewind dial
    { const rk = clamp((t - A.rewind) / 1.6), yr = Math.round(lerp(2012, -1000, ease.inOut(rk))); const lab = yr > 0 ? `AD ${yr}` : `${-yr || 1} BC`;
      ctx.save(); ctx.translate(180, 110); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-126, -34, 260, 80)); shape(ctx, '#1d1a17', 0, rect(-130, -40, 260, 80, 10)); txt(ctx, lab, 0, 2, FX.DISPLAY(40), GOLD); if (rk > 0 && rk < 1) txt(ctx, '◀◀', -98, 2, FX.FONT(800, 22), '#fff'); ctx.restore(); }
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 2', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE WORLD BEFORE', 640, 350, lt - .35, { px: 62, color: GREEN, rot: .02 }); tag(ctx, 'c. 1000 BC', 640, 440, lt - .7, 26); ctx.restore(); }
    vig(ctx);
  }

  // ---------- w2: hot, wet, green — camps, hunting, fishing, gathering ----------
  function lowlands(ctx, t, o = {}) {
    M.sky(ctx, t, 2, 430); glow(ctx, 1080, 90, 160, 'rgba(255,240,170,.6)'); shape(ctx, '#fff2a0', 4, circle(1080, 90, 44));
    M.jungle(ctx, 360, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 430, 2600, 600));
    shape(ctx, '#4aa6c8', 4, c => { c.moveTo(-600, 520); c.quadraticCurveTo(300, 480, 700, 530); c.quadraticCurveTo(1100, 580, 2200, 520); c.lineTo(2200, 600); c.quadraticCurveTo(1100, 650, 700, 610); c.quadraticCurveTo(300, 570, -600, 600); c.closePath(); });
    for (let i = 0; i < 8; i++) { const x = ((i * 190 + t * 30) % 1500) - 100; line(ctx, [[x, 556 + (i % 2) * 20], [x + 40, 556 + (i % 2) * 20]], 3, 'rgba(255,255,255,.6)'); }
    for (let i = 0; i < 10; i++) shape(ctx, '#5a9a3a', 3, c => { const x = -40 + i * 145; c.moveTo(x, 760); c.quadraticCurveTo(x + 10, 660, x + 40, 640); c.quadraticCurveTo(x + 30, 700, x + 60, 760); c.closePath(); }); }
  function w2(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 400); lowlands(ctx, t);
    leanTo(ctx, 200, 500, .9); leanTo(ctx, 330, 490, .7); fire(ctx, 270, 515, .9, t);
    // fishing: a dugout canoe with a net
    { const x = 760 + Math.sin(t * .5) * 20, y = 570 + Math.sin(t * 1.3) * 3; shape(ctx, '#7a4a2a', 4, c => { c.moveTo(x - 110, y - 12); c.quadraticCurveTo(x, y + 26, x + 110, y - 12); c.lineTo(x + 100, y); c.quadraticCurveTo(x, y + 34, x - 100, y); c.closePath(); });
      villager(ctx, x - 20, y - 4, .42, t, 3, { still: true, reach: true }); ctx.save(); ctx.setLineDash([5, 5]); line(ctx, [[x + 14, y - 104], [x + 80, y - 20], [x + 130, y + 10]], 2.5, '#5a4a3a'); ctx.restore(); }
    // hunting: walks with a spear; gathering: a basket of fruit
    const hx = 1060 + Math.sin(t * .4) * 30; villager(ctx, hx, 720, .78, t, 1, {}); line(ctx, [[hx + 40, 720 - 130], [hx + 60, 720 - 330]], 6, '#6a4a2a'); shape(ctx, '#8a8a8a', 2.5, poly([[hx + 58, 720 - 330], [hx + 70, 720 - 360], [hx + 66, 720 - 326]]));
    villager(ctx, 520, 730, .8, t, 2, { still: true }); { const bx = 520 - 50 * .8, by = 730 - 150 * .8; shape(ctx, '#b88a4a', 3.5, poly([[bx - 34, by - 30], [bx + 30, by - 30], [bx + 22, by + 20], [bx - 26, by + 20]])); for (let i = 0; i < 5; i++) shape(ctx, ['#e8423a', '#f6a828', '#8ac040'][i % 3], 2, circle(bx - 22 + i * 11, by - 34 - (i % 2) * 6, 9)); }
    villager(ctx, 140, 740, .85, t, 4, { still: true });
    ctx.restore();
    // hot · wet · green icons
    const icon = (x, k, draw, lab) => { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, 110); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, circle(4, 6, 48)); shape(ctx, '#fbf6ea', 4, circle(0, 0, 48)); draw(); ctx.restore(); tag(ctx, lab, x, 186, k - .1, 22); };
    icon(160, since(t, 'hot'), () => { for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; line(ctx, [[Math.cos(a) * 24, Math.sin(a) * 24], [Math.cos(a) * 36, Math.sin(a) * 36]], 4, '#f6a828'); } shape(ctx, '#f6c945', 3, circle(0, 0, 18)); }, 'HOT');
    icon(290, since(t, 'wet'), () => { for (const [dx, dy] of [[-14, -8], [10, -16], [4, 14]]) shape(ctx, '#3a8ad8', 3, c => { c.moveTo(dx, dy - 16); c.quadraticCurveTo(dx + 12, dy + 4, dx, dy + 8); c.quadraticCurveTo(dx - 12, dy + 4, dx, dy - 16); }); }, 'WET');
    icon(420, since(t, 'green'), () => { shape(ctx, '#5aa83a', 3, c => { c.moveTo(-22, 20); c.quadraticCurveTo(-24, -26, 24, -24); c.quadraticCurveTo(22, 20, -22, 20); }); line(ctx, [[-22, 20], [16, -16]], 3, '#3a7a2a'); }, 'GREEN');
    tag(ctx, 'MOVING BETWEEN CAMPS', 260, 400, since(t, 'camps'), 22); tag(ctx, 'HUNTING', 1100, 330, since(t, 'hunting'), 22); tag(ctx, 'FISHING', 780, 430, since(t, 'fishing'), 22); tag(ctx, 'GATHERING', 520, 470, since(t, 'gathering'), 22);
    FX.dateTag(ctx, 'c. 1000 BC · TABASCO LOWLANDS'); vig(ctx);
  }

  // ---------- w3: a skinny, stubborn grass that turns into corn — and corn means you can stay ----------
  function w3(ctx, lt, dur, t) {
    const g = ease.inOut(clamp((t - A.patience) / (A.corn - A.patience + .3)));
    M.sky(ctx, t, 2, 470); M.jungle(ctx, 420, 2, t); shape(ctx, '#8a6a44', 4, rect(-600, 520, 2600, 400)); for (let i = 0; i < 6; i++) line(ctx, [[-20, 560 + i * 34], [1300, 560 + i * 34]], 4, 'rgba(60,40,20,.35)');
    for (let i = 0; i < 5; i++) cornPlant(ctx, 260 + i * 120, 600 + (i % 2) * 20, .62 + (i === 2 ? .3 : 0), clamp(g * (i === 2 ? 1 : .96)), t + i);
    // the camp folds away on "corn changes things"; a house goes up on "you can stay"
    const away = clamp(since(t, 'changes') / .8); if (away < 1) { ctx.save(); ctx.globalAlpha = 1 - away; leanTo(ctx, 1040, 560, .9); ctx.restore(); }
    if (since(t, 'stay') > -.3) { const k = FX.settle(clamp((since(t, 'stay') + .3) / .5)); hut(ctx, 1040, 580, .95, k); villager(ctx, 1160, 740, .7, t, 2, { still: true }); }
    // cob size inset: teosinte vs maize
    if (since(t, 'grass') > 0) { const k = pop(since(t, 'grass')); ctx.save(); ctx.translate(1080, 200); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-146, -86, 300, 170)); shape(ctx, '#fbf6ea', 4, rect(-150, -90, 300, 170, 8));
      txt(ctx, 'WILD GRASS', -70, -64, FX.FONT(800, 15), '#5a4a3a'); shape(ctx, '#c8a050', 2.5, ellipse(-70, 0, 6, 26)); for (let i = 0; i < 5; i++) shape(ctx, '#d8b060', 1.5, circle(-70, -20 + i * 10, 4));
      if (g > .05) { txt(ctx, 'CORN', 70, -64, FX.FONT(800, 15), '#5a4a3a'); ctx.save(); ctx.globalAlpha = clamp(g * 1.5); shape(ctx, '#f6c945', 3, ellipse(70, 6, 22 * (.3 + .7 * g), 54 * (.3 + .7 * g))); ctx.restore(); }
      line(ctx, [[-30, 0], [30, 0]], 3); shape(ctx, INK, 0, poly([[30, -8], [44, 0], [30, 8]])); ctx.restore(); }
    tag(ctx, 'A SKINNY, STUBBORN GRASS', 420, 110, since(t, 'skinny'), 26);
    if (since(t, 'patience') > 0) { const gen = Math.round(lerp(1, 300, g)); tag(ctx, `GENERATION ${gen}`, 420, 170, since(t, 'patience'), 22); }
    if (since(t, 'corn') > 0) strip(ctx, 'CORN', 640, 300, since(t, 'corn'), { px: 70, color: '#c88a10' });
    if (since(t, 'stay') > 0) FX.stamp(ctx, 'YOU CAN STAY', 860, 440, since(t, 'stay') - .1, { color: GREEN, size: 40 });
    vig(ctx);
  }

  // ---------- w4: you and your neighbours start carrying dirt. Basket after basket, for years ----------
  function mound(ctx, h, x0 = -80, x1 = 1500, y = 600) { if (h <= 0) return; shape(ctx, '#9a7048', 4, poly([[x0, y], [x0 + h * 1.4, y - h], [x1 - h * 1.4, y - h], [x1, y]]));
    for (let i = 1; i < 8; i++) { const yy = y - h * i / 8; if (h * i / 8 < 4) continue; line(ctx, [[x0 + (y - yy) * 1.4 + 6, yy], [x1 - (y - yy) * 1.4 - 6, yy]], 2.5, i % 2 ? 'rgba(60,40,20,.35)' : 'rgba(200,160,110,.4)'); }
    shape(ctx, '#8ab060', 0, rect(x0 + h * 1.4, y - h - 6, x1 - x0 - h * 2.8, 8)); }
  function w4(ctx, lt, dur, t) {
    const h = lerp(14, 150, ease.inOut(clamp((t - A.carrying) / (A.enormous - A.carrying + .6))));
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.08, 1.0), 640, 400);
    M.sky(ctx, t, 2, 480); M.jungle(ctx, 440, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 480, 2600, 600));
    mound(ctx, h, -80, 1500, 600);
    // a line of carriers: full baskets going right, empty ones coming back
    for (let i = 0; i < 9; i++) { const dir = i % 2 ? -1 : 1, x = dir > 0 ? ((t * 70 + i * 190) % 1600) - 160 : 1440 - ((t * 70 + i * 190) % 1600), y = 700 + (i % 3) * 20;
      villager(ctx, x, y, .55, t, i, { flip: dir < 0 }); basketOnHead(ctx, x, y, .55, dir > 0); }
    for (let i = 0; i < 4; i++) { const x = 200 + i * 300, y = 600 - h - 4; if (h < 40) continue; villager(ctx, x, y, .32, t, i + 5, { still: true, reach: true }); }
    ctx.restore();
    tag(ctx, 'YOU AND YOUR NEIGHBOURS', 640, 100, since(t, 'neighbor'), 26);
    if (since(t, 'basket') > 0) tag(ctx, 'BASKET AFTER BASKET', 640, 160, since(t, 'basket'), 26);
    if (since(t, 'years') > 0) { const yr = Math.max(1, Math.round(lerp(1, 40, clamp((t - A.years) / 2.6)))); counter(ctx, 1110, 110, `YEAR ${yr}`, since(t, 'years'), null, GOLD, 34); }
    if (since(t, 'enormous') > 0) strip(ctx, 'ENORMOUS', 640, 260, since(t, 'enormous'), { px: 60, color: '#a8582a' });
    FX.dateTag(ctx, 'c. 1000–800 BC'); vig(ctx);
  }

  // ---------- w5: a raised earthen platform nearly a mile long, 30 to 50 feet high ----------
  function w5(ctx, lt, dur, t) {
    M.sky(ctx, t, 2, 480); M.jungle(ctx, 440, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 480, 2600, 600));
    mound(ctx, 120, 80, 1200, 600);
    villager(ctx, 1260, 600, .2, t, 3, { still: true });
    const L = since(t, 'long'), F = since(t, 'four'), Hh = since(t, 'thirty');
    if (L > 0) { const k = ease.out(clamp(L / .8)); line(ctx, [[80, 650], [lerp(80, 1200, k), 650]], 6, '#c8322a'); for (const x of [80, lerp(80, 1200, k)]) line(ctx, [[x, 630], [x, 670]], 6, '#c8322a'); }
    if (F > 0) { counter(ctx, 640, 700, '≈ 4,600 FT · 1.4 KM', F, null, GOLD, 34); }
    tag(ctx, 'NEARLY A MILE LONG', 640, 560, L, 26);
    if (Hh > 0) { const k = ease.out(clamp(Hh / .6)); line(ctx, [[1230, 600], [1230, 600 - 120 * k]], 6, '#2f4a8a'); line(ctx, [[1214, 480], [1246, 480]], 5, '#2f4a8a'); tag(ctx, '30–50 FT HIGH', 1100, 430, Hh, 24); }
    tag(ctx, 'A RAISED EARTHEN PLATFORM', 640, 110, since(t, 'platform'), 30);
    txt(ctx, 'height exaggerated ×5', 1180, 708, FX.FONT(700, 15), 'rgba(40,40,40,.7)', 'right');
    vig(ctx);
  }

  // ---------- w6: nine wide causeways running out like spokes on a wheel (top view) ----------
  function w6(ctx, lt, dur, t) {
    shape(ctx, '#7aa858', 0, rect(0, 0, W, H)); for (let i = 0; i < 60; i++) shape(ctx, i % 2 ? '#6a9848' : '#8ab868', 0, ellipse((i * 173) % 1400 - 60, (i * 97) % 760, 60, 34, i));
    const cx = 640, cy = 370, Lw = 620, Lh = 170, k = clamp((t - A.nine + .2) / 2.6);
    const SP = [[-1.4, -1.6], [0, -1.8], [1.4, -1.6], [-1.6, 1.7], [0, 1.9], [1.5, 1.7], [-1.9, -.1], [1.9, .2], [-.7, 1.9]];
    for (let i = 0; i < 9; i++) { const kk = clamp(k * 9 - i), [dx, dy] = SP[i], x0 = cx + Math.sign(dx) * Math.min(Math.abs(dx), 1) * Lw / 2 * .8, y0 = cy + Math.sign(dy) * Lh / 2 * (Math.abs(dy) > .5 ? 1 : 0); if (kk <= 0) continue;
      const x1 = lerp(x0, cx + dx * Lw / 2, kk), y1 = lerp(y0, cy + dy * Lh * 1.1, kk); line(ctx, [[x0, y0], [x1, y1]], 34, INK); line(ctx, [[x0, y0], [x1, y1]], 26, '#c8a070'); }
    shape(ctx, 'rgba(0,0,0,.25)', 0, rect(cx - Lw / 2 + 12, cy - Lh / 2 + 14, Lw, Lh)); shape(ctx, '#b8885a', 5, rect(cx - Lw / 2, cy - Lh / 2, Lw, Lh, 8)); shape(ctx, '#c8a070', 0, rect(cx - Lw / 2 + 20, cy - Lh / 2 + 20, Lw - 40, Lh - 40, 6));
    counter(ctx, 640, 640, `${Math.min(9, Math.floor(k * 9 + .001))} CAUSEWAYS`, since(t, 'nine') + .1, null, GOLD, 40);
    if (since(t, 'spokes') > 0) tag(ctx, 'LIKE SPOKES ON A WHEEL', 640, 90, since(t, 'spokes'), 28);
    txt(ctx, 'TOP VIEW', 1200, 690, FX.FONT(800, 18), 'rgba(30,40,20,.7)', 'right'); vig(ctx);
  }

  // ---------- w7: Aguada Fénix today — so wide and so flat it looks like the landscape. Cattle graze on it ----------
  function ranch(ctx, t, o = {}) {
    M.sky(ctx, t, 2, 470); M.jungle(ctx, 450, 2.2, t); shape(ctx, '#8ab868', 0, rect(-600, 470, 2600, 600));
    if (o.outline) { ctx.save(); ctx.globalAlpha = o.outline; ctx.setLineDash([14, 10]); line(ctx, [[-100, 610], [120, 560], [1180, 560], [1400, 610]], 5, '#c8322a'); ctx.restore(); }
    for (let i = 0; i < 14; i++) { const x = -40 + i * 100; line(ctx, [[x, 500], [x, 540]], 6, '#6a4a2a'); } line(ctx, [[-40, 512], [1320, 512]], 2.5, '#5a4a3a'); line(ctx, [[-40, 526], [1320, 526]], 2.5, '#5a4a3a');
    for (const [x, y] of [[180, 470], [980, 460], [1140, 476]]) { line(ctx, [[x, y + 30], [x + 6, y - 80]], 10, '#7a5a3a'); for (let j = 0; j < 6; j++) shape(ctx, '#4a8a3a', 2.5, ellipse(x + 6 + Math.cos(j) * 40, y - 84 + Math.sin(j) * 10, 44, 12, j)); }
    cow(ctx, 320, 640, .9, t, 0); cow(ctx, 560, 620, .7, t, 1.3, true); cow(ctx, 860, 660, 1.0, t, 2.1); cow(ctx, 1110, 610, .6, t, .7, true); }
  function w7(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420); ranch(ctx, t, { outline: clamp(since(t, 'flat') / .6) * .9 });
    const wx = lerp(120, 1180, clamp((t - A.this) / (A.nobody - A.this))); N.walker(ctx, wx, 740, .62, t, 9, {});
    ctx.restore();
    FX.stamp(ctx, 'AGUADA FÉNIX', 640, 160, since(t, 'aguada') + .05, { color: '#a8582a', size: 52 });
    if (since(t, 'flat') > 0) tag(ctx, 'THE WHOLE PLATFORM: UNDER YOUR FEET', 640, 260, since(t, 'flat'), 24);
    if (since(t, 'cattle') > 0) tag(ctx, 'CATTLE GRAZE ON IT', 860, 420, since(t, 'cattle'), 24);
    FX.dateTag(ctx, 'TODAY · TABASCO, MEXICO'); vig(ctx);
  }

  // ---------- w8: nobody spotted it until archaeologists flew over with laser scanners — published 2020 ----------
  function w8(ctx, lt, dur, t) {
    const rv = clamp((t - A.laser + .2) / 2.4);
    lidarField(ctx, t, rv);
    // the plane
    { const px = lerp(-200, 1500, clamp((t - A.flew + .8) / 4.0)); ctx.save(); ctx.translate(px, 90); shape(ctx, '#f4efe6', 4, ellipse(0, 0, 90, 18)); shape(ctx, '#3a6ab8', 3, poly([[-20, -6], [30, -6], [-10, -70], [-30, -70]])); shape(ctx, '#3a6ab8', 3, poly([[-20, 6], [30, 6], [-10, 70], [-30, 70]])); shape(ctx, '#3a6ab8', 3, poly([[-90, 0], [-70, -30], [-60, 0]])); for (let i = 0; i < 4; i++) shape(ctx, '#9ad0f0', 0, circle(30 - i * 18, -4, 4));
      if (rv > 0 && rv < 1) { ctx.save(); ctx.globalAlpha = .35; shape(ctx, '#7affee', 0, poly([[-6, 10], [6, 10], [80, 640], [-80, 640]])); ctx.restore(); } ctx.restore(); }
    tag(ctx, 'LASER SCANNERS (LIDAR)', 640, 190, since(t, 'laser'), 26);
    if (since(t, 'published') > 0) { const k = pop(since(t, 'published')); ctx.save(); ctx.translate(1060, 560); ctx.rotate(.05); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-120, -80, 250, 170)); shape(ctx, '#fbf6ea', 4, rect(-126, -86, 252, 172, 4));
      txt(ctx, 'PUBLISHED', 0, -50, FX.FONT(800, 18), '#5a4a3a'); txt(ctx, '2020', 0, 0, FX.DISPLAY(56), '#c8322a'); txt(ctx, 'Inomata et al.', 0, 48, FX.FONT(700, 16), '#5a4a3a'); ctx.restore(); }
    if (since(t, 'oldest') > 0) strip(ctx, 'OLDEST MONUMENTAL BUILDING IN THE MAYA AREA', 640, 640, since(t, 'oldest'), { px: 30 });
    vig(ctx);
  }

  // ---------- w9: built 1000–800 BC — and the biggest: bigger than any pyramid the Maya built afterward ----------
  function w9(ctx, lt, dur, t) {
    deskBg(ctx, t);
    counter(ctx, 640, 110, '1000–800 BC', Math.max(lt, .4), 'BUILT', GOLD, 40);
    // volume blocks: a huge block of earth vs later pyramids
    const bk = Math.max(clamp(lt / .5), clamp((since(t, 'biggest') + .2) / .8));
    if (bk > 0) { const s = FX.settle(bk); ctx.save(); ctx.translate(430, 600); ctx.scale(s, s); shape(ctx, '#7a5434', 4, poly([[-300, 0], [180, 0], [260, -60], [-220, -60]])); shape(ctx, '#9a7048', 4, rect(-300, -250, 480, 250)); shape(ctx, '#7a5434', 4, poly([[180, -250], [260, -310], [260, -60], [180, 0]])); shape(ctx, '#b08458', 4, poly([[-300, -250], [180, -250], [260, -310], [-220, -310]]));
      txt(ctx, 'AGUADA FÉNIX', -60, -130, FX.DISPLAY(36), '#fbf6ea'); txt(ctx, 'c. 1000 BC', -60, -86, FX.FONT(800, 20), '#fbf6ea'); ctx.restore(); }
    if (since(t, 'afterward') > -1.6) { const ak = clamp((since(t, 'pyramid') + .1) / .6); for (let i = 0; i < 3; i++) { const k = clamp(ak * 3 - i); if (k <= 0) continue; castillo(ctx, 900 + i * 130, 600, .22 * FX.settle(k), { tod: 2 }); }
      if (ak > .3) txt(ctx, 'LATER PYRAMIDS', 1030, 640, FX.DISPLAY(24), '#3a2a1a'); }
    if (since(t, 'biggest') > 0) strip(ctx, 'THE BIGGEST', 430, 230, since(t, 'biggest'), { px: 48, color: '#a8582a' });
    txt(ctx, 'by volume of earth moved', 430, 650, FX.FONT(700, 17), '#3a2a1a');
    vig(ctx);
  }

  // ---------- w10: notice what's missing — no giant carved heads, no thrones, no portrait of a king ----------
  function w10(ctx, lt, dur, t) {
    M.sky(ctx, t, 2, 470); M.jungle(ctx, 430, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 600)); mound(ctx, 70, -100, 1400, 560);
    for (let i = 0; i < 7; i++) villager(ctx, 120 + i * 180, 760 + (i % 2) * 14, .6, t, i, { still: true });
    const items = [[300, 'giant', colossalHead, 'NO GIANT CARVED HEADS', .9], [640, 'throne', throne, 'NO THRONES', .8], [980, 'portrait', kingStela, 'NO PORTRAIT OF A KING', 1.0]];
    for (const [x, key, draw, lab, s] of items) { const k = since(t, key) + .25; if (k <= 0) continue; ctx.save(); ctx.globalAlpha = .95; ctx.translate(x, 0); const e = pop(k); ctx.translate(0, 330); ctx.scale(e, e); shape(ctx, 'rgba(255,255,255,.85)', 4, circle(0, -80, 120)); draw(ctx, 0, 10, s * .9); ctx.restore(); cross(ctx, x, 250, k - .35, 90); tag(ctx, lab, x, 440, k - .2, 22); }
    strip(ctx, "NOTICE WHAT'S MISSING", 640, 70, since(t, 'notice') + .1, { px: 40 });
    vig(ctx);
  }

  // ---------- w11: Takeshi Inomata's team thinks this was communal work — not a ruler ordering them around ----------
  function w11(ctx, lt, dur, t) {
    M.sky(ctx, t, 2, 470); M.jungle(ctx, 430, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 600)); mound(ctx, 90, -100, 1400, 580);
    for (let i = 0; i < 8; i++) { const x = 90 + i * 150, y = 740 + (i % 2) * 18; villager(ctx, x, y, .62, t + i * .3, i, {}); basketOnHead(ctx, x, y, .62, i % 2 === 0); }
    // name card (no face)
    if (since(t, 'takeshi') > -.2) { const k = pop(since(t, 'takeshi') + .2); ctx.save(); ctx.translate(250, 170); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -56, 360, 120)); shape(ctx, '#fbf6ea', 4, rect(-180, -60, 360, 120, 6));
      txt(ctx, 'TAKESHI INOMATA', 0, -16, FX.DISPLAY(30)); txt(ctx, 'archaeologist · led the dig', 0, 24, FX.FONT(700, 18), '#5a4a3a'); ctx.restore(); }
    if (since(t, 'communal') > 0) strip(ctx, 'COMMUNAL WORK', 800, 120, since(t, 'communal'), { px: 50, color: GREEN });
    if (since(t, 'together') > 0) tag(ctx, 'LOTS OF PEOPLE BUILDING TOGETHER', 800, 210, since(t, 'together'), 24);
    // the ruler who wasn't there
    if (since(t, 'ordering') > -.3) { const k = pop(since(t, 'ordering') + .3); ctx.save(); ctx.translate(1110, 470); ctx.scale(k, k); ctx.globalAlpha = .9; shape(ctx, '#fbf6ea', 4, circle(0, -60, 100)); kingStela(ctx, 0, 20, .7); ctx.restore(); cross(ctx, 1110, 410, since(t, 'ordering') - .1, 80); tag(ctx, 'NOT A RULER', 1110, 590, since(t, 'ordering'), 22); }
    vig(ctx);
  }

  // ---------- w12: an interpretation — how much did they learn from the Olmec vs invent on their own? ----------
  function w12(ctx, lt, dur, t) {
    deskBg(ctx, t);
    strip(ctx, "THAT'S AN INTERPRETATION", 640, 80, since(t, 'interpretation') + .1, { px: 36 });
    tag(ctx, 'Inomata et al., Nature 2020', 640, 150, since(t, 'interpretation') + .3, 22);
    const sk = since(t, 'argue'), tilt = sk > 0 ? Math.sin((t - A.argue) * 1.7) * .14 * clamp(sk / .6) : 0;
    ctx.save(); ctx.translate(640, 560); shape(ctx, '#6a4a2a', 4, rect(-24, -10, 48, 30, 6)); line(ctx, [[0, 0], [0, -250]], 14, INK); line(ctx, [[0, 0], [0, -250]], 8, '#c8a040');
    ctx.translate(0, -250); ctx.rotate(tilt); line(ctx, [[-300, 0], [300, 0]], 14, INK); line(ctx, [[-300, 0], [300, 0]], 8, '#c8a040'); shape(ctx, '#c8a040', 3, circle(0, 0, 14));
    for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 280, 0); ctx.rotate(-tilt); line(ctx, [[-60, 120], [0, 0], [60, 120]], 3); shape(ctx, '#d8b060', 4, c => { c.moveTo(-90, 120); c.quadraticCurveTo(0, 170, 90, 120); c.closePath(); });
      if (d < 0 && since(t, 'olmec') > -.3) { colossalHead(ctx, 0, 122, .45); txt(ctx, 'LEARNED FROM', 0, 196, FX.DISPLAY(22)); txt(ctx, 'THE OLMEC', 0, 222, FX.DISPLAY(22), RED); }
      if (d > 0 && since(t, 'invented') > -.3) { for (let i = 0; i < 3; i++) villager(ctx, -40 + i * 40, 122, .22, t, i, { still: true }); txt(ctx, 'INVENTED', 0, 196, FX.DISPLAY(22)); txt(ctx, 'ON THEIR OWN', 0, 222, FX.DISPLAY(22), GREEN); }
      ctx.restore(); }
    ctx.restore();
    if (sk > 0) tag(ctx, 'STILL ARGUED ABOUT', 640, 690, sk, 22);
    vig(ctx);
  }

  // ---------- w13: hold on to that image — the first big thing the Maya made was made by everybody. That's about to change ----------
  function w13(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 420);
    M.sky(ctx, t, 1.75, 470); M.jungle(ctx, 430, 1.75, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 600)); mound(ctx, 120, -100, 1400, 600);
    for (let i = 0; i < 16; i++) { const x = 40 + i * 80, y = 600 - 120 - 2; villager(ctx, x, y, .3, t, i, { still: true, reach: i % 3 === 0 }); }
    for (let i = 0; i < 7; i++) villager(ctx, 120 + i * 175, 770 + (i % 2) * 12, .62, t, i + 2, { still: true, reach: i % 2 === 0 });
    ctx.restore();
    // a shadow falls on "that's about to change": a crown silhouette over the sky
    const sh = clamp((since(t, 'because') + .2) / 1.4); if (sh > 0) { ctx.save(); ctx.globalAlpha = .55 * sh; shape(ctx, '#1d1a2a', 0, c => { const x = 1040, y = lerp(-200, 120, ease.out(sh)); c.moveTo(x - 160, y + 60); c.lineTo(x - 140, y - 60); c.lineTo(x - 70, y); c.lineTo(x, y - 90); c.lineTo(x + 70, y); c.lineTo(x + 140, y - 60); c.lineTo(x + 160, y + 60); c.closePath(); }); ctx.restore();
      ctx.save(); ctx.globalAlpha = .25 * sh; ctx.fillStyle = '#1d1a2a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    FX.stamp(ctx, 'MADE BY EVERYBODY', 520, 200, since(t, 'everybody') - .05, { color: GREEN, size: 52 });
    if (since(t, 'change') > 0) tag(ctx, "THAT'S ABOUT TO CHANGE", 1040, 330, since(t, 'change'), 26);
    vig(ctx);
  }

  const cut = [[0, w1], [A.thoughts - .25, w2], [A.but - .05, w3], [A.so - .05, w4], [A.raised - .1, w5], [A.with2 - .05, w6], [A.this - .05, w7], [A.nobody - .1, w8], [A.built - .1, w9], [A.and2 - .05, w10], [A.the3 - .05, w11], [A.thats - .1, w12], [A.but2 - .05, w13]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.rewind, type: 'ratchet', gain: .5 }, { t: A.tabasco, type: 'click', gain: .4 }, { t: A.border, type: 'click', gain: .3 },
    { t: A.hot, type: 'click', gain: .4 }, { t: A.wet, type: 'splash', gain: .3 }, { t: A.green, type: 'click', gain: .4 },
    { t: A.corn, type: 'swell', gain: .4 }, { t: A.stay, type: 'thud', gain: .5 }, { t: A.carrying, type: 'slide', gain: .3 }, { t: A.basket, type: 'thud', gain: .3 }, { t: A.enormous, type: 'boom', gain: .4 },
    { t: A.long, type: 'slide', gain: .4 }, { t: A.thirty, type: 'click', gain: .4 }, { t: A.nine, type: 'whoosh', gain: .4 }, { t: A.aguada, type: 'thud', gain: .7 }, { t: A.cattle, type: 'creak', gain: .2 },
    { t: A.flew - .5, type: 'wind', gain: .4 }, { t: A.laser, type: 'swell', gain: .4 }, { t: A.published, type: 'paper', gain: .5 }, { t: A.biggest, type: 'thud', gain: .6 },
    { t: A.giant + .1, type: 'scratch', gain: .4 }, { t: A.throne + .1, type: 'scratch', gain: .4 }, { t: A.portrait + .1, type: 'scratch', gain: .4 }, { t: A.communal, type: 'click', gain: .4 }, { t: A.ordering, type: 'scratch', gain: .4 },
    { t: A.argue, type: 'creak', gain: .4 }, { t: A.everybody, type: 'thud', gain: .7 }, { t: A.because, type: 'boom', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.so - .3, mood: 'under' }, { t: A.this - .3, mood: 'still' }, { t: A.nobody - .3, mood: 'mystery' }, { t: A.and2 - .3, mood: 'under' }, { t: A.because - .2, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-worldbefore.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
