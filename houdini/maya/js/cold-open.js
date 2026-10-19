/* The Maya — Cold open + Beat 1 teaser (narration-coldopen.mp3 = narration-full.mp3 0–102.85 s + a 3.2 s tail for the title).
 * Word anchors from tools/asr.py on the full recording. Fixed camera: El Castillo, Chichén Itzá (maya-set.js). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const A = { standing: 3.51, thousands: 7.63, some: 9.72, party: 10.36, pray: 11.89, watch: 14.94, because: 16.62, movie: 18.68, documentary: 20.22, forwarded: 21.43,
    ancient: 23.72, gone: 25.18, message: 28.5, calendar: 29.56, tonight: 31.06, so: 32.38, midnight: 33.65, sunrise: 35.18, breakfast: 36.61, nothing: 37.96,
    but: 39.37, buy: 41.69, water: 42.38, folding: 43.42, turns: 45.44, says: 46.46, spanish: 48.84, mayaword: 49.98, wait2: 51.61, people2: 52.64, selling: 54.7,
    around: 56.71, six: 56.96, speak: 58.32, so2: 60.22, disappear: 62.14, here: 64.24, vanished: 66.31, what: 67.63, over: 69.52, twenty: 70.14, three: 72.29,
    building: 74.6, boy: 77.52, stranger: 82.0, drought: 86.29, bonfire: 89.52, last2: 92.01, and3: 95.02, keep: 95.88, score: 96.1, finished: 98.68, count: 100.82 };
  A.end = 106.0;
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


  const M = G.Maya, { plaza, castillo, vendor, table, crowdBand, mayaMap, site, MP, flowers, mix } = M;
  const NAVY = 'rgba(16,18,56,';

  // ---------- small props ----------
  function partyHat(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y - 330 * s); ctx.scale(s, s); shape(ctx, col, 3.5, poly([[-24, 0], [24, 0], [4, -70]])); for (let i = 0; i < 3; i++) shape(ctx, '#fff', 0, circle(-10 + i * 10, -14 - i * 16, 4)); shape(ctx, '#f6c945', 2.5, circle(4, -72, 8)); ctx.restore(); }
  function glowStick(ctx, x, y, s, t, col, ph) { const a = Math.sin(t * 3 + ph) * .5; ctx.save(); ctx.translate(x + 80 * s, y - 240 * s); ctx.rotate(-.4 + a); glow(ctx, 0, -30, 46, col.replace('1)', '.5)')); line(ctx, [[0, 0], [0, -60]], 9, col); ctx.restore(); }
  function candle(ctx, x, y, s, t, ph) { ctx.save(); ctx.translate(x + 50 * s, y - 150 * s); ctx.scale(s, s); const f = Math.sin(t * 10 + ph) * 2; glow(ctx, 0, -40, 70, 'rgba(255,200,110,.6)');
    shape(ctx, '#f8f2e0', 3, rect(-8, -34, 16, 40, 3)); shape(ctx, '#ffb43a', 2, c => { c.moveTo(-6, -36); c.quadraticCurveTo(-7, -50, f, -60); c.quadraticCurveTo(7, -50, 6, -36); c.closePath(); }); ctx.restore(); }
  function endSign(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y - 210 * s); ctx.scale(s, s); ctx.rotate(Math.sin(t * 1.3) * .03);
    shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-86, -50, 180, 110)); shape(ctx, '#c8a46a', 4, rect(-90, -56, 180, 110, 4)); ctx.font = FX.DISPLAY(26); ctx.fillStyle = '#1d1a17'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('THE END', 0, -24); ctx.fillText('IS NEAR', 0, 8); ctx.font = FX.FONT(800, 16); ctx.fillStyle = '#c8322a'; ctx.fillText('12·21·12', 0, 38); ctx.restore(); }
  function worried(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) line(ctx, [[d * 6, -322], [d * 22, -314]], 4); shape(ctx, '#fff', 2.5, ellipse(0, -276, 9, 6)); ctx.restore(); } // raised inner brows + open mouth over the walker face
  function nightWash(ctx, a) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(110,110,190,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function povHand(ctx, hx, hy, item) { // "you": a sleeve reaching in from the bottom-right corner
    const pts = [[1340, 820], [1180, 700], [hx, hy]]; line(ctx, pts, 64, INK); line(ctx, pts, 54, '#3a6ab8'); shape(ctx, '#e8b890', 4, circle(hx, hy, 30));
    if (item === 'coins') for (let i = 0; i < 3; i++) shape(ctx, '#e8c14a', 3, ellipse(hx - 20 + i * 12, hy - 28 - i * 3, 13, 7));
    if (item === 'bottle') { shape(ctx, 'rgba(170,220,250,.95)', 3.5, rect(hx - 16, hy - 92, 32, 84, 8)); shape(ctx, '#3a8ad8', 3, rect(hx - 8, hy - 108, 16, 16, 3)); shape(ctx, '#f4efe6', 0, rect(hx - 15, hy - 60, 30, 18)); shape(ctx, '#e8b890', 4, circle(hx, hy - 10, 30)); } }
  function bubble(ctx, x, y, k, text, o = {}) { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = FX.DISPLAY(o.px || 30); const w = ctx.measureText(text).width + 50;
    shape(ctx, 'rgba(0,0,0,.2)', 0, rect(-w / 2 + 6, -40, w, 76, 30)); shape(ctx, '#fff', 4, c => { c.roundRect(-w / 2, -46, w, 76, 30); c.moveTo((o.tail || -1) * 30, 28); c.lineTo((o.tail || -1) * 60, 70); c.lineTo((o.tail || -1) * 4, 28); });
    txt(ctx, text, 0, -6, FX.DISPLAY(o.px || 30), o.col || INK); ctx.restore(); }
  function clockBadge(ctx, x, y, mins, k) { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.3)', 0, circle(6, 8, 74)); shape(ctx, '#fbf6ea', 5, circle(0, 0, 74)); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [[Math.sin(a) * 58, -Math.cos(a) * 58], [Math.sin(a) * 66, -Math.cos(a) * 66]], i % 3 ? 3 : 6); }
    const hA = (mins / 720) * Math.PI * 2, mA = (mins / 60) * Math.PI * 2; line(ctx, [[0, 0], [Math.sin(hA) * 34, -Math.cos(hA) * 34]], 8); line(ctx, [[0, 0], [Math.sin(mA) * 52, -Math.cos(mA) * 52]], 5, '#c8322a'); shape(ctx, INK, 0, circle(0, 0, 7));
    const hh = Math.floor(mins / 60) % 24, mm = Math.floor(mins % 60), h12 = ((hh + 11) % 12) + 1; const lab = `${h12}:${String(mm).padStart(2, '0')} ${hh < 12 ? 'AM' : 'PM'}`;
    ctx.font = FX.DISPLAY(26); const w = ctx.measureText(lab).width + 26; shape(ctx, '#1d1a17', 0, rect(-w / 2, 82, w, 38, 6)); txt(ctx, lab, 0, 102, FX.DISPLAY(26), GOLD); ctx.restore(); }
  // a Long Count stela face: 13 · 0 · 0 · 0 · 0 in bar-and-dot with shell zeros
  function barDot(ctx, n, x, y, s, col = INK) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (n === 0) { shape(ctx, '#e8dcc0', 3, c => { c.ellipse(0, 0, 30, 18, 0, 0, Math.PI * 2); }); for (const dx of [-14, 0, 14]) line(ctx, [[dx, -12], [dx * .6, 10]], 2.5, col); line(ctx, [[-26, 4], [26, 4]], 2.5, col); }
    else { const bars = Math.floor(n / 5), dots = n % 5; for (let b = 0; b < bars; b++) shape(ctx, col, 0, rect(-34, 10 - b * 16, 68, 10, 4)); for (let d = 0; d < dots; d++) shape(ctx, col, 0, circle((d - (dots - 1) / 2) * 18, 10 - bars * 16 - 4, 6)); } ctx.restore(); }
  function stela(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const st = '#a4977c', face = '#bcae90', deep = '#6a5e4a';
    shape(ctx, 'rgba(0,0,0,.3)', 0, ellipse(0, 6, 210, 24));
    shape(ctx, st, 5, c => { c.moveTo(-170, 0); c.lineTo(-164, -470); c.quadraticCurveTo(-160, -600, 0, -620); c.quadraticCurveTo(160, -600, 164, -470); c.lineTo(170, 0); c.closePath(); });
    for (let i = 0; i < 40; i++) shape(ctx, 'rgba(70,60,45,.25)', 0, circle(-150 + (i * 61) % 300, -590 + (i * 137) % 580, 2 + (i % 3)));
    shape(ctx, 'rgba(60,50,40,.25)', 3, rect(-140, -560, 280, 530, 14));
    // the Initial Series glyph across the top, then two columns: bar-and-dot numbers | period glyphs
    shape(ctx, face, 3, rect(-120, -548, 240, 70, 16)); shape(ctx, deep, 0, ellipse(0, -513, 50, 22)); for (const d of [-1, 1]) shape(ctx, deep, 0, circle(d * 78, -513, 12));
    for (let i = 0; i < 5; i++) { const yy = -420 + i * 82;
      shape(ctx, face, 3, rect(-124, yy - 36, 116, 72, 16)); barDot(ctx, i === 0 ? 13 : 0, -66, yy + 2, i === 0 ? .95 : 1.05, '#3a2e24');
      shape(ctx, face, 3, rect(8, yy - 36, 116, 72, 16)); shape(ctx, deep, 2.5, smooth([[28, yy - 20], [66, yy - 28], [102, yy - 8], [96, yy + 22], [52, yy + 26], [26, yy + 6]])); shape(ctx, face, 0, circle(64, yy - 4, 9)); line(ctx, [[40, yy + 12], [88, yy + 12]], 3, face); }
    if (o.glowN > 0) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, -66, -256, 230, `rgba(255,190,80,${.45 * o.glowN})`); ctx.globalCompositeOperation = 'source-over'; }
    if (o.ring > 0) { ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = '#e8322a'; ctx.beginPath(); ctx.ellipse(-66, -256, 86, 230, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(o.ring)); ctx.stroke(); ctx.restore(); }
    const mk = clamp(o.moss || 0); if (mk > 0) { ctx.globalAlpha = mk; for (let i = 0; i < 11; i++) shape(ctx, i % 2 ? '#4a7a3a' : '#5a8a3a', 2, ellipse(-160 + i * 32, -590 + Math.abs(i - 5) * 22, 24, 11, i)); for (const d of [-1, 1]) { line(ctx, [[d * 160, -520], [d * 140, -380], [d * 168, -220], [d * 150, -40]], 8, '#3a6a2a'); for (let j = 0; j < 4; j++) shape(ctx, '#4a8a3a', 2, ellipse(d * (150 + (j % 2) * 14), -480 + j * 120, 14, 8, d * .6)); } ctx.globalAlpha = 1; }
    ctx.restore(); }

  // ---------- c1: the night of December 20th, 2012 — a crowd at the foot of the pyramid ----------
  const FRONT = [[90, 0, 'party'], [300, 4, 'cam'], [520, 7, 'pray'], [770, 2, 'party'], [990, 9, 'pray'], [1200, 3, 'party']];
  function frontRow(ctx, t, yy, s, set, night) { for (const [x, v, kind] of set) { const o = { cam: kind === 'cam', reach: kind === 'party' };
      N.walker(ctx, x, yy, s, t, v, Object.assign({ still: true }, o)); if (kind === 'party') { glowStick(ctx, x, yy, s, t, v % 2 ? 'rgba(120,255,170,1)' : 'rgba(255,120,220,1)', v); if (v % 3 === 0) partyHat(ctx, x, yy, s, ['#e8423a', '#3a8ad8', '#f6a828'][v % 3]); }
      if (kind === 'pray') candle(ctx, x, yy, s, t, v); if (kind === 'sign') { endSign(ctx, x, yy, s, t); worried(ctx, x, yy, s); } } }
  function c1(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.07), 640, 360); plaza(ctx, t, { tod: 0, doorGlow: true }); ctx.restore();
    nightWash(ctx, .18);
    frontRow(ctx, t, 790, .95, FRONT, 1);
    FX.dateTag(ctx, 'DEC 20, 2012 · CHICHÉN ITZÁ, YUCATÁN');
    if (since(t, 'standing') > 0) { const k = pop(since(t, 'standing')); ctx.save(); ctx.translate(640, 596); ctx.scale(k, k); shape(ctx, '#f6c945', 4, poly([[-16, -40], [16, -40], [16, -10], [30, -10], [0, 22], [-30, -10], [-16, -10]])); ctx.restore(); tag(ctx, 'YOU ARE HERE', 640, 540, since(t, 'standing') + .1, 22); }
    if (since(t, 'thousands') > 0) tag(ctx, 'THOUSANDS OF PEOPLE', 640, 120, since(t, 'thousands'), 26);
    vig(ctx);
  }

  // ---------- c2: some came to party, some to pray, a few came to watch the world end (pan along the crowd) ----------
  const STRIP = [[160, 0, 'party'], [330, 2, 'party'], [500, 6, 'party'], [880, 7, 'pray'], [1060, 1, 'pray'], [1240, 9, 'pray'], [1640, 4, 'cam'], [1820, 3, 'sign'], [2010, 8, 'still']];
  function c2(ctx, lt, dur, t) {
    const fx = lerp(330, 1800, ease.inOut(clamp((lt - .2) / (dur - .6))));
    ctx.save(); ctx.translate(-(fx - 640) * .25, 0); plaza(ctx, t, { tod: 0, doorGlow: true }); ctx.restore();
    nightWash(ctx, .2);
    ctx.save(); ctx.translate(-(fx - 640), 0);
    for (let i = 0; i < 20; i++) { const x = -100 + i * 130, v = i * 5 + 1; N.person(ctx, x, 640 + (i % 2) * 14, 1.9, ['#2f4a7a', '#7a4a8a', '#3a8a5a', '#c8322a'][i % 4], { v }); if (i % 3 === 0) { glow(ctx, x + 18, 490, 30, 'rgba(255,230,160,.55)'); shape(ctx, '#fff6d0', 0, circle(x + 18, 490, 4)); } }
    // the party: a boombox and confetti
    shape(ctx, '#2a2a30', 4, rect(200, 700, 120, 66, 8)); for (const dx of [228, 292]) { shape(ctx, '#5a5a6a', 3, circle(dx, 733, 22)); shape(ctx, '#1d1a17', 0, circle(dx, 733, 9 + Math.abs(Math.sin(t * 8)) * 3)); }
    for (let i = 0; i < 26; i++) { const x = 80 + (i * 97) % 560, y = ((t * 90 + i * 53) % 520) + 40; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 3 + i); shape(ctx, ['#e8423a', '#f6c945', '#3a8ad8', '#3ad88a'][i % 4], 0, rect(-6, -3, 12, 6)); ctx.restore(); }
    for (const [x, v, kind] of STRIP) { N.walker(ctx, x, 800, 1.0, t, v, { still: kind !== 'party', reach: kind === 'party', cam: kind === 'cam' });
      if (kind === 'party') { glowStick(ctx, x, 800, 1.0, t, v % 2 ? 'rgba(120,255,170,1)' : 'rgba(255,120,220,1)', v); partyHat(ctx, x, 800, 1.0, ['#e8423a', '#3a8ad8', '#f6a828'][v % 3]); }
      if (kind === 'pray') candle(ctx, x, 800, 1.0, t, v); if (kind === 'sign') { endSign(ctx, x, 800, 1.0, t); worried(ctx, x, 800, 1.0); } if (kind === 'still') worried(ctx, x, 800, 1.0); }
    tag(ctx, 'SOME CAME TO PARTY', 330, 140, since(t, 'party') + .1, 30);
    tag(ctx, 'SOME CAME TO PRAY', 1060, 140, since(t, 'pray') + .1, 30);
    tag(ctx, 'A FEW CAME TO WATCH THE WORLD END', 1820, 140, since(t, 'watch') + .1, 30);
    ctx.restore();
    FX.dateTag(ctx, 'DEC 20, 2012 · CHICHÉN ITZÁ, YUCATÁN'); vig(ctx);
  }

  // ---------- c3: a movie trailer, a cable documentary, a forwarded email from your uncle ----------
  function c3(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#4a3a6a'], [1, '#2a2240']]), 0, rect(-600, -300, 2600, 1500));
    for (let x = -40; x < 1320; x += 80) shape(ctx, 'rgba(255,255,255,.04)', 0, rect(x, 0, 40, 560)); // wallpaper stripes
    shape(ctx, '#6a4a34', 4, rect(-20, 560, 1320, 200)); shape(ctx, '#7a5a40', 0, rect(-20, 560, 1320, 18));
    glow(ctx, 640, 360, 420, 'rgba(120,180,255,.25)'); // TV glow on the room
    const zk = Math.max(since(t, 'movie'), .5), dk = Math.max(since(t, 'documentary') + .3, .5), ek = Math.max(since(t, 'forwarded') + .2, .5), lit = k => .45 + .55 * clamp(k / .3);
    // 1 — the movie poster (made-up film)
    { const s = 1; if (s > 0) { ctx.save(); ctx.globalAlpha = lit(since(t, 'movie')); ctx.translate(220, 320); ctx.rotate(-.04); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.4)', 0, rect(-140, -200, 290, 410)); shape(ctx, '#c8a040', 5, rect(-150, -210, 300, 410, 4));
      shape(ctx, grad(ctx, 0, -190, 0, 180, [[0, '#2a0a1a'], [.6, '#b8301a'], [1, '#f6a02a']]), 0, rect(-136, -196, 272, 382));
      shape(ctx, '#1d1218', 3, poly([[-100, 130], [100, 130], [50, 30], [-50, 30]])); shape(ctx, '#1d1218', 3, rect(-26, 0, 52, 30)); line(ctx, [[30, -170], [10, -110], [36, -100], [6, -20]], 6, '#fff6c0');
      shape(ctx, '#3a8ad8', 3, c => { c.moveTo(-136, 186); c.quadraticCurveTo(-120, 60, -40, 70); c.quadraticCurveTo(-90, 110, -60, 186); c.closePath(); });
      txt(ctx, 'DOOMSDAY', 0, -150, FX.DISPLAY(44), '#fff2d0'); txt(ctx, '2012', 0, -104, FX.DISPLAY(52), '#f6c945'); txt(ctx, 'THE END IS COMING', 0, 160, FX.FONT(800, 16), '#fff'); ctx.restore(); ctx.globalAlpha = 1; if (since(t, 'movie') > 0) tag(ctx, 'MOVIE TRAILER', 220, 570, since(t, 'movie'), 22); } }
    // 2 — the TV documentary
    { const s = 1; if (s > 0) { ctx.save(); ctx.globalAlpha = lit(since(t, 'documentary') + .3); ctx.translate(640, 330); ctx.scale(s, s); shape(ctx, '#1d1a17', 5, rect(-210, -150, 420, 270, 14)); const sc = grad(ctx, 0, -130, 0, 100, [[0, '#1a1a3a'], [1, '#3a2a5a']]); shape(ctx, sc, 0, rect(-196, -136, 392, 228, 6));
      glow(ctx, 0, -30, 120, 'rgba(255,190,90,.5)'); ctx.save(); ctx.translate(0, -30); ctx.rotate(t * .3); shape(ctx, '#c8b088', 4, circle(0, 0, 70)); for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); shape(ctx, '#8a7458', 0, rect(-8, -64, 16, 18, 3)); } shape(ctx, '#a89068', 3, circle(0, 0, 30)); ctx.restore();
      shape(ctx, '#c8322a', 0, rect(-196, 48, 300, 34)); txt(ctx, 'ANCIENT PROPHECY?', -186, 66, FX.DISPLAY(22), '#fff', 'left'); shape(ctx, '#f4efe6', 0, rect(-196, 82, 230, 18)); txt(ctx, 'THE MAYA KNEW...', -188, 92, FX.FONT(800, 12), INK, 'left');
      for (const d of [-1, 1]) line(ctx, [[d * 60, 120], [d * 90, 170]], 8, '#2a2a2a'); ctx.restore(); ctx.globalAlpha = 1; if (since(t, 'documentary') + .3 > 0) tag(ctx, 'CABLE DOCUMENTARY', 640, 570, since(t, 'documentary') + .3, 22); } }
    // 3 — the forwarded email on a laptop
    { const s = 1; if (s > 0) { ctx.save(); ctx.globalAlpha = lit(since(t, 'forwarded') + .2); ctx.translate(1060, 370); ctx.rotate(.03); ctx.scale(s, s); shape(ctx, '#8a8a94', 4, poly([[-190, 120], [190, 120], [220, 160], [-220, 160]])); shape(ctx, '#2a2a30', 5, rect(-180, -150, 360, 270, 10)); shape(ctx, '#fbfbf6', 0, rect(-166, -136, 332, 242, 4));
      shape(ctx, '#3a6ab8', 0, rect(-166, -136, 332, 30)); txt(ctx, 'Inbox (1)', -156, -121, FX.FONT(800, 14), '#fff', 'left');
      txt(ctx, 'From: Uncle Gary', -152, -88, FX.FONT(700, 15), '#3a3a3a', 'left'); txt(ctx, 'FWD: FWD: FWD: RE:', -152, -62, FX.FONT(800, 16), INK, 'left'); txt(ctx, 'THE MAYA KNEW!!!', -152, -36, FX.DISPLAY(24), '#c8322a', 'left');
      for (let i = 0; i < 4; i++) shape(ctx, '#d8d8d0', 0, rect(-152, -10 + i * 22, 280 - (i % 2) * 60, 10, 4)); txt(ctx, 'FORWARD TO 10 PEOPLE!!', -152, 88, FX.FONT(800, 14), '#c8322a', 'left'); ctx.restore(); ctx.globalAlpha = 1; if (since(t, 'forwarded') + .2 > 0) tag(ctx, 'FORWARDED EMAIL', 1060, 570, since(t, 'forwarded') + .2, 22); } }
    // the family on the sofa, from behind
    shape(ctx, '#8a3a3a', 5, rect(140, 640, 1000, 140, 30)); for (const [x, v] of [[420, 2], [640, 5], [860, 3]]) { const sk = ['#f0c8a0', '#a8704a', '#d8a07a', '#7a4a2a', '#e8b890', '#c08a5a'][v]; shape(ctx, ['#2a1a10', '#5a3a1a', '#8a8a8a', '#1d1a17'][v % 4], 4, circle(x, 640, 52)); shape(ctx, sk, 4, circle(x - 50, 650, 12)); shape(ctx, sk, 4, circle(x + 50, 650, 12)); }
    vig(ctx);
  }

  // ---------- c4: an ancient civilization, gone for a thousand years, left one last message — a calendar that runs out tonight ----------
  function c4(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.12), 640, 300);
    shape(ctx, grad(ctx, 0, -300, 0, H, [[0, '#0e1a2a'], [1, '#1e3a34']]), 0, rect(-600, -400, 2600, 1500));
    for (let i = 0; i < 12; i++) { const x = -200 + i * 150, h = 300 + (i * 97) % 200; line(ctx, [[x, 760], [x + 20, 760 - h]], 34 + (i % 3) * 10, '#1a2a22'); shape(ctx, '#1e3a2a', 0, ellipse(x + 20, 760 - h, 120, 60)); }
    for (let i = 0; i < 18; i++) shape(ctx, '#244a34', 0, ellipse(-200 + i * 100, 720 + (i % 3) * 14, 90, 40));
    const gone = clamp((since(t, 'gone')) / 1.4), beam = clamp((since(t, 'message') + .4) / .8);
    stela(ctx, 640, 700, .95, t, { moss: .3 + .7 * gone, glowN: clamp(since(t, 'calendar') / .4), ring: clamp(since(t, 'tonight') / .5) });
    if (beam > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const bx = lerp(1400, 640, ease.out(beam)); shape(ctx, 'rgba(255,240,190,.16)', 0, poly([[1300, 820], [1340, 820], [bx + 170, 120], [bx - 170, 120]])); glow(ctx, bx, 380, 260, 'rgba(255,240,190,.28)'); ctx.restore(); }
    for (let i = 0; i < 14; i++) { const x = (i * 211) % 1280, y = 200 + (i * 137) % 400, a = .4 + .4 * Math.sin(t * 2 + i); glow(ctx, x, y, 10, `rgba(220,255,140,${a * .7})`); } // fireflies
    ctx.restore();
    if (since(t, 'tonight') > 0) {
      FX.stamp(ctx, 'RUNS OUT TONIGHT?', 1000, 560, since(t, 'tonight') - .1, { color: '#e8322a', size: 34 }); }
    if (since(t, 'gone') > 0) tag(ctx, '"GONE FOR 1,000 YEARS"', 300, 120, since(t, 'gone'), 26);
    if (since(t, 'calendar') > 0) tag(ctx, '13.0.0.0.0 = DEC 21, 2012', 980, 120, since(t, 'calendar'), 26);
    vig(ctx);
  }

  // ---------- c5: so you wait. Midnight. Sunrise. Breakfast. Nothing. ----------
  function c5(ctx, lt, dur, t) {
    const tod = clamp((t - (A.sunrise - .9)) / 1.0) + clamp((t - (A.breakfast - .5)) / 1.0);
    plaza(ctx, t, { tod, doorGlow: true, thin: clamp((t - A.midnight) / 3.5) * .5 });
    if (tod < 1) nightWash(ctx, .2 * (1 - tod));
    // fireworks at midnight
    const mk = since(t, 'midnight'); if (mk > 0 && mk < 1.6) for (let b = 0; b < 3; b++) { const bx = 300 + b * 340, by = 140 + (b % 2) * 40, r = 90 * ease.out(clamp((mk - b * .2) / .8)), a = 1 - clamp((mk - b * .2 - .6) / .8);
      if (r > 0 && a > 0) for (let i = 0; i < 14; i++) { const an = i / 14 * Math.PI * 2; ctx.save(); ctx.globalAlpha = a; shape(ctx, ['#f6c945', '#ff6a8a', '#7ad8ff'][b], 0, circle(bx + Math.cos(an) * r, by + Math.sin(an) * r, 5)); ctx.restore(); } }
    // big tourists in the front row: yawning at sunrise, a coffee at breakfast
    for (const [x, v] of [[150, 5], [1130, 1]]) N.walker(ctx, x, 800, 1.0, t, v, { still: true });
    const mins = t < A.midnight ? lerp(23 * 60 + 57, 24 * 60, clamp((t - A.so) / (A.midnight - A.so))) : t < A.sunrise ? lerp(0, 6 * 60 + 10, clamp((t - A.midnight) / (A.sunrise - A.midnight))) : lerp(6 * 60 + 10, 7 * 60 + 40, clamp((t - A.sunrise) / (A.breakfast - A.sunrise)));
    clockBadge(ctx, 1110, 150, mins, lt + .2);
    tag(ctx, 'MIDNIGHT', 1110, 300, since(t, 'midnight'), 24); if (since(t, 'sunrise') > 0) tag(ctx, 'SUNRISE', 1110, 340, since(t, 'sunrise'), 24); if (since(t, 'breakfast') > 0) tag(ctx, 'BREAKFAST', 1110, 380, since(t, 'breakfast'), 24);
    if (since(t, 'breakfast') > 0) { const k = pop(since(t, 'breakfast')); ctx.save(); ctx.translate(1130 + 58, 800 - 160); ctx.scale(k, k); shape(ctx, '#f4efe2', 3.5, poly([[-16, -30], [16, -30], [12, 8], [-12, 8]])); shape(ctx, '#c8322a', 0, rect(-15, -18, 30, 8)); for (let i = 0; i < 3; i++) line(ctx, [[-8 + i * 8, -36], [-4 + i * 8 + Math.sin(t * 3 + i) * 3, -60]], 3, 'rgba(255,255,255,.7)'); ctx.restore(); }
    if (since(t, 'nothing') > -.1) strip(ctx, 'NOTHING.', 640, 120, since(t, 'nothing') + .1, { px: 64 });
    FX.dateTag(ctx, mins < 24 * 60 && t < A.midnight ? 'DEC 20, 2012' : 'DEC 21, 2012'); vig(ctx);
  }

  // ---------- c6: the parking lot — you buy water from a woman at a folding table; she says something you don't understand ----------
  function gateSet(ctx, t) {
    M.sky(ctx, t, 1.75, 470); M.jungle(ctx, 400, 1.75, t);
    castillo(ctx, 250, 450, .42, { tod: 1.75 }); shape(ctx, '#9ac070', 0, rect(-600, 450, 2600, 400));
    shape(ctx, '#a8a8a0', 0, poly([[620, 450], [1900, 450], [1900, 600], [700, 600]])); for (let i = 0; i < 6; i++) line(ctx, [[760 + i * 110, 470], [740 + i * 120, 590]], 3, '#f4f0e0'); // the lot
    const car = (x, y, col, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 4, c => { c.moveTo(-70, 0); c.lineTo(-66, -26); c.lineTo(-40, -30); c.lineTo(-24, -54); c.lineTo(30, -54); c.lineTo(48, -30); c.lineTo(70, -26); c.lineTo(72, 0); c.closePath(); }); shape(ctx, '#bfe0f0', 3, poly([[-18, -48], [26, -48], [38, -32], [-30, -32]])); for (const d of [-40, 42]) { shape(ctx, INK, 0, circle(d, 2, 14)); shape(ctx, '#aaa', 0, circle(d, 2, 6)); } ctx.restore(); };
    car(820, 520, '#e8423a', .8); car(990, 530, '#f4efe6', .8); car(1160, 520, '#3a8ad8', .8);
    shape(ctx, '#f6c945', 4, rect(1060, 430, 260, 96, 10)); for (let i = 0; i < 5; i++) shape(ctx, '#9ad0f0', 2.5, rect(1076 + i * 46, 446, 34, 30, 4)); txt(ctx, 'TOURS', 1180, 500, FX.DISPLAY(22), '#c8322a'); for (const d of [1100, 1270]) shape(ctx, INK, 0, circle(d, 528, 16));
    // the exit gate arch
    for (const x of [560, 800]) shape(ctx, '#8a5a34', 4, rect(x - 14, 300, 28, 260)); shape(ctx, '#a87a4a', 4, rect(530, 270, 300, 52, 6)); txt(ctx, 'SALIDA · EXIT', 680, 297, FX.DISPLAY(28), '#fbf6e0');
    crowdBand(ctx, 540, t, { n: 18, x0: 300, x1: 1000, s: 1.0, drift: 22, thin: .3 });
  }
  function c6(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420); gateSet(ctx, t);
    const turn = since(t, 'turns') > 0;
    vendor(ctx, 560, 740, .95, t, { reach: !turn && since(t, 'water') > -.2 && since(t, 'water') < 1.6, flip: turn });
    vendor(ctx, 900, 760, .9, t, { v: 4, skin: '#9a6a40', ribbon: '#3a8ad8', flip: true });
    table(ctx, 600, 740, 1.0, { bottles: since(t, 'water') > .4 ? 5 : 6 });
    ctx.restore();
    // you: coins in, a bottle back out
    const bk = since(t, 'buy'), wk = since(t, 'water');
    if (bk > -.3 && wk < 1.8) { const out = clamp((bk + .3) / .5) - clamp((wk - .9) / .7), hx = lerp(1360, 820, ease.out(clamp(out))), hy = lerp(820, 560, ease.out(clamp(out))); povHand(ctx, hx, hy, wk > .3 ? 'bottle' : 'coins'); }
    FX.dateTag(ctx, 'DEC 21, 2012 · 7:45 AM');
    tag(ctx, 'A FOLDING TABLE NEAR THE GATE', 640, 110, since(t, 'folding'), 24);
    bubble(ctx, 700, 260, since(t, 'says'), "BA'AX KA WA'ALIK?", { tail: -1 });
    if (since(t, 'spanish') > 0) tag(ctx, "IT ISN'T SPANISH…", 700, 360, since(t, 'spanish'), 26);
    vig(ctx);
  }

  // ---------- c7: it's Maya. Wait. The people you came to say goodbye to are selling you water. ----------
  function c7(ctx, lt, dur, t) {
    const frozen = since(t, 'wait2') > 0, tt = frozen ? A.wait2 + .02 : t;
    ctx.save(); T.cam(ctx, lerp(1.55, 1.7, ease.inOut(clamp(lt / dur))), 700, 470); gateSet(ctx, tt);
    vendor(ctx, 560, 740, .95, tt, { reach: true }); vendor(ctx, 900, 760, .9, tt, { v: 4, skin: '#9a6a40', ribbon: '#3a8ad8', flip: true }); table(ctx, 600, 740, 1.0, { bottles: 5 });
    ctx.restore();
    bubble(ctx, 640, 120, 1, "BA'AX KA WA'ALIK?", { px: 34 });
    FX.stamp(ctx, 'YUCATEC MAYA', 1010, 150, since(t, 'mayaword') + .1, { color: '#2f7a46', size: 40 });
    povHand(ctx, 980, 600, 'bottle');
    if (frozen) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = 'rgba(20,20,40,.15)'; ctx.fillRect(0, 0, W, H); ctx.restore(); txt(ctx, 'WAIT.', 140, 300, FX.DISPLAY(56), '#fff'); }
    if (since(t, 'people2') > 0) { ctx.save(); ctx.fillStyle = 'rgba(20,16,30,.55)'; ctx.fillRect(0, 596, W, 124); ctx.restore(); txt(ctx, 'THE PEOPLE YOU CAME TO SAY GOODBYE TO…', 640, 630, FX.DISPLAY(34), '#fff');
      if (since(t, 'selling') > 0) txt(ctx, '…ARE SELLING YOU WATER.', 640, 680, FX.DISPLAY(38), GOLD); }
    vig(ctx);
  }

  // ---------- c8: around six million people speak a Mayan language today ----------
  const LANGS = [['YUCATEC', [-89.0, 20.2]], ['CH’OL', [-92.1, 17.6]], ['TZELTAL', [-92.0, 16.95]], ['TZOTZIL', [-92.75, 16.6]], ['MAM', [-91.8, 15.2]], ['K’ICHE’', [-91.25, 14.95]], ['KAQCHIKEL', [-90.85, 14.55]], ["Q’EQCHI’", [-89.9, 15.7]]];
  const LOFF = [[80, -40], [-90, -50], [-120, -10], [-110, 40], [-130, 20], [-60, 64], [90, 64], [130, -30]];
  function c8(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 360); mayaMap(ctx, t);
    for (let i = 0; i < LANGS.length; i++) { const [nm, ll] = LANGS[i], k = lt - .15 - i * .28; if (k <= 0) continue; const [x, y] = MP(ll);
      for (let j = 0; j < 7; j++) { const a = j * 2.1 + i, r = 14 + (j % 3) * 12; shape(ctx, '#e8423a', 2, circle(x + Math.cos(a) * r, y + Math.sin(a) * r * .7, 5 * pop(k - j * .04))); }
      const [ox, oy] = LOFF[i]; line(ctx, [[x, y], [x + ox * .8, y + oy * .8]], 2.5, 'rgba(60,40,30,.6)'); tag(ctx, nm, x + ox, y + oy, k, 18); }
    ctx.restore();
    const n = Math.round(6000000 * ease.out(clamp((t - A.six) / 1.2)) / 1000) * 1000; counter(ctx, 1060, 620, n.toLocaleString('en-US'), since(t, 'around') + .1, null, GOLD, 52);
    if (since(t, 'around') > 0) strip(ctx, 'ABOUT', 1060, 548, since(t, 'around'), { px: 24 }); strip(ctx, 'SPEAK A MAYAN LANGUAGE TODAY', 640, 80, since(t, 'speak'), { px: 34 });
    vig(ctx);
  }

  // ---------- c9: so how does a civilization "disappear"… and still be here? Then what exactly ended? ----------
  function c9(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 380);
    ctx.save(); ctx.translate(640, 380); ctx.rotate(-.02); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-392, -276, 800, 560)); shape(ctx, '#fbf6ea', 4, rect(-400, -284, 800, 560, 4)); line(ctx, [[0, -284], [0, 276]], 3, 'rgba(0,0,0,.15)');
    txt(ctx, 'CHAPTER 7', -200, -236, FX.FONT(800, 18), '#8a6a4a'); txt(ctx, 'THE MYSTERIOUS', -200, -196, FX.DISPLAY(32), '#3a2a1a'); txt(ctx, 'DISAPPEARANCE', -200, -156, FX.DISPLAY(34), '#3a2a1a'); txt(ctx, 'OF THE MAYA', -200, -116, FX.DISPLAY(32), '#3a2a1a');
    for (let i = 0; i < 9; i++) shape(ctx, '#d8d0c0', 0, rect(-360, -76 + i * 30, 300 - (i % 3) * 40, 10, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(40, -250, 330, 250); ctx.clip(); M.sky(ctx, t, 1.9, 0); shape(ctx, '#3a6a3a', 0, rect(40, -60, 330, 80)); castillo(ctx, 205, -40, .36, { tod: 1.9 }); for (let i = 0; i < 6; i++) shape(ctx, '#2f5a2f', 3, ellipse(40 + i * 66, -40 + (i % 2) * 10, 50, 30)); ctx.restore(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(40, -250, 330, 250);
    txt(ctx, 'Fig. 7.1 — A lost civilization', 205, 24, FX.FONT(700, 15), '#6a5a4a');
    for (let i = 0; i < 6; i++) shape(ctx, '#d8d0c0', 0, rect(50, 60 + i * 30, 300 - (i % 2) * 50, 10, 4));
    if (since(t, 'vanished') > 0) { const k = clamp(since(t, 'vanished') / .4); line(ctx, [[-370, -156], [lerp(-370, -30, k), -152]], 8, '#e8322a'); }
    ctx.restore();
    // the photo of the water seller lands on the page
    if (since(t, 'here') > -.1) { const k = FX.settle(clamp((since(t, 'here') + .1) / .4)); ctx.save(); ctx.translate(lerp(1400, 900, k), 470); ctx.rotate(.08); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-104, -124, 220, 250)); shape(ctx, '#fff', 3, rect(-110, -130, 220, 250, 3));
      ctx.save(); ctx.beginPath(); ctx.rect(-96, -116, 192, 190); ctx.clip(); shape(ctx, '#9ad0f0', 0, rect(-96, -116, 192, 190)); vendor(ctx, 0, 220, .7, t, {}); ctx.restore(); txt(ctx, 'DEC 21, 2012', 0, 100, FX.FONT(800, 16), '#5a4a3a'); ctx.restore(); }
    ctx.restore();
    FX.stamp(ctx, 'DISAPPEARED?', 420, 560, since(t, 'disappear') + .1, { color: '#c8322a', size: 40 });
    if (since(t, 'what') > 0) strip(ctx, 'THEN WHAT EXACTLY ENDED?', 640, 90, since(t, 'what') + .1, { px: 40, color: '#c8322a' });
    vig(ctx);
  }

  // ---------- c10: over the next twenty-odd minutes we'll walk through three thousand years ----------
  function c10(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); ctx.translate(0, 0); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(70, 470, 1150, 80)); shape(ctx, '#f6ecd0', 4, rect(60, 460, 1160, 80, 6));
    const ER = [['1000 BC', 0], ['AD 1', .33], ['500', .5], ['1000', .66], ['1500', .83], ['2012', 1]];
    for (const [s, f] of ER) { const x = 120 + f * 1040; line(ctx, [[x, 460], [x, 500]], 4); txt(ctx, s, x, 522, FX.FONT(800, 20), '#3a2a1a'); }
    shape(ctx, grad(ctx, 120, 0, 1160, 0, [[0, '#7aa858'], [.5, '#e8a83a'], [.8, '#c8322a'], [1, '#3a8ad8']]), 0, rect(120, 470, 1040 * clamp(lt / (dur - .4)), 12, 4));
    const wx = 120 + 1040 * ease.inOut(clamp(lt / (dur - .4))); N.walker(ctx, wx, 456, .62, t, 9, {});
    ctx.restore();
    strip(ctx, '3,000 YEARS', 640, 200, since(t, 'three') + .1, { px: 64, color: '#2f7a46' }); tag(ctx, 'IN ABOUT 20 MINUTES', 640, 300, since(t, 'twenty'), 26);
    vig(ctx);
  }

  // ---------- c11: six stops on the way (cards on a corkboard) ----------
  const CARDS = [['building', 'A BUILDING SO BIG', 'NOBODY NOTICED IT'], ['boy', 'A BOY KING AT 12', 'WHO RULED 68 YEARS'], ['stranger', 'A STRANGER ARRIVES', 'THE SAME DAY THE KING DIES'],
    ['drought', 'A DROUGHT IN THE', 'MUD OF A LAKE'], ['bonfire', 'A BONFIRE', 'OF BOOKS'], ['last', 'THE LAST INDEPENDENT', 'KINGDOM IN THE AMERICAS']];
  function cardArt(ctx, kind, t) { // drawn in a 300x170 window centred on 0,0
    const bg = (a, b) => shape(ctx, grad(ctx, 0, -85, 0, 85, [[0, a], [1, b]]), 0, rect(-150, -85, 300, 170));
    if (kind === 'building') { bg('#9ad0f0', '#e8f4d0'); shape(ctx, '#8ab868', 0, rect(-150, 0, 300, 85)); shape(ctx, '#a8c878', 3, c => { c.moveTo(-140, 30); c.lineTo(-100, -4); c.lineTo(110, -4); c.lineTo(140, 30); c.closePath(); }); ctx.save(); ctx.setLineDash([6, 5]); line(ctx, [[-100, -4], [110, -4]], 3, '#3a8ad8'); ctx.restore();
      for (const [x, y] of [[-40, 18], [40, 26]]) { shape(ctx, '#fbf6ea', 3, ellipse(x, y, 22, 12)); shape(ctx, INK, 0, circle(x - 8, y - 2, 4)); shape(ctx, '#fbf6ea', 3, circle(x + 22, y - 8, 9)); } }
    if (kind === 'boy') { bg('#f6d08a', '#e8a85a'); N.walker(ctx, 0, 140, .58, t, 2, { plain: true, still: true, coat: '#2f8a6a', pants: '#e8dcc0', skin: '#a8704a', beads: true }); for (let i = 0; i < 7; i++) shape(ctx, ['#2f8a6a', '#3ab08a', '#c8322a'][i % 3], 2, ellipse(-36 + i * 12, -98 - Math.sin(i / 6 * Math.PI) * 18, 6, 22, (i - 3) * .3)); txt(ctx, '12', 110, -50, FX.DISPLAY(36), '#c8322a'); }
    if (kind === 'stranger') { bg('#e8b878', '#c88a5a'); shape(ctx, '#a89070', 3, poly([[30, 85], [150, 85], [150, -40], [110, -70], [70, -40], [30, -40]])); shape(ctx, '#5a4a3a', 0, rect(70, 0, 40, 85)); ctx.save(); ctx.globalAlpha = .9; N.walker(ctx, -60, 150, .55, t, 3, { plain: true, still: true, coat: '#3a2a2a', pants: '#3a2a2a', skin: '#3a2a2a' }); ctx.restore();
      for (let i = 0; i < 5; i++) shape(ctx, '#3a8a5a', 2, ellipse(-80 + i * 10, -54 - i * 2, 6, 20, (i - 2) * .4)); line(ctx, [[-30, 0], [-10, -70]], 4, '#5a4a3a'); }
    if (kind === 'drought') { bg('#f6c870', '#f0a84a'); shape(ctx, '#fff2a0', 3, circle(100, -50, 24)); const L = ['#7aa8c0', '#c8b088', '#e8dcc0', '#b89a70', '#e8dcc0', '#a88a60']; for (let i = 0; i < 6; i++) shape(ctx, L[i], 1.5, rect(-150, -10 + i * 16, 300, 16));
      for (let i = 0; i < 6; i++) shape(ctx, '#f8f4ff', 1.5, poly([[-110 + i * 44, 40], [-104 + i * 44, 30], [-98 + i * 44, 40], [-104 + i * 44, 50]])); line(ctx, [[-60, -10], [-50, 10], [-64, 30]], 2.5, '#5a3a20'); }
    if (kind === 'bonfire') { bg('#3a2030', '#6a2a20'); glow(ctx, 0, 30, 120, 'rgba(255,150,60,.5)'); for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-50 + i * 50, 50); ctx.rotate((i - 1) * .3); for (let j = 0; j < 4; j++) shape(ctx, '#f0e4c8', 2, poly([[j * 10 - 20, -20 + (j % 2) * 6], [j * 10 - 10, -20 + ((j + 1) % 2) * 6], [j * 10 - 10, 10 + ((j + 1) % 2) * 6], [j * 10 - 20, 10 + (j % 2) * 6]])); ctx.restore(); }
      const f = Math.sin(t * 8) * 4; shape(ctx, '#ff8a2a', 3, c => { c.moveTo(-70, 50); c.quadraticCurveTo(-50, -20, f, -70); c.quadraticCurveTo(50, -20, 70, 50); c.closePath(); }); shape(ctx, '#ffe07a', 0, c => { c.moveTo(-30, 50); c.quadraticCurveTo(-20, 0, f, -30); c.quadraticCurveTo(20, 0, 30, 50); c.closePath(); }); }
    if (kind === 'last') { bg('#9ad0f0', '#5ab0d0'); shape(ctx, '#3a8ac0', 0, rect(-150, 10, 300, 75)); shape(ctx, '#8ab868', 3, ellipse(0, 22, 100, 24)); for (let i = 0; i < 5; i++) { const x = -70 + i * 35, h = 30 + (i % 2) * 22; shape(ctx, '#e8dcc0', 2.5, poly([[x - 14, 14], [x + 14, 14], [x + 9, 14 - h], [x - 9, 14 - h]])); shape(ctx, '#c8322a', 2, rect(x - 8, 6 - h, 16, 10)); }
      for (let i = 0; i < 3; i++) shape(ctx, '#6a4a2a', 2, poly([[100 + i * 14, 54], [130 + i * 14, 54], [124 + i * 14, 62], [104 + i * 14, 62]])); }
  }
  const CARD_AT = ['building', 'boy', 'stranger', 'drought', 'bonfire', 'last2'];
  function c11(ctx, lt, dur, t) {
    shape(ctx, '#b88a58', 0, rect(0, 0, W, H)); for (let i = 0; i < 400; i++) shape(ctx, i % 2 ? 'rgba(90,60,30,.25)' : 'rgba(255,230,190,.25)', 0, circle((i * 97) % W, (i * 53) % H, 2 + (i % 3)));
    shape(ctx, '#7a5434', 10, rect(14, 14, W - 28, H - 28, 8)); ctx.lineWidth = 14; ctx.strokeStyle = '#6a4424'; ctx.strokeRect(10, 10, W - 20, H - 20);
    let active = -1; for (let i = 0; i < 6; i++) if (since(t, CARD_AT[i]) > -.1) active = i;
    for (let i = 0; i < 6; i++) { const k = since(t, CARD_AT[i]) + .1; if (k <= 0) continue; const [kind, l1, l2] = CARDS[i], x = 230 + (i % 3) * 410, y = 220 + Math.floor(i / 3) * 290, s = pop(k) * (i === active ? 1.06 : .97);
      ctx.save(); ctx.translate(x, y); ctx.rotate(((i * 37) % 7 - 3) * .012 + Math.sin(t * 1.3 + i) * .006); ctx.scale(s, s);
      shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-166, -116, 340, 262)); shape(ctx, '#fbf6ea', 4, rect(-172, -124, 344, 262, 4));
      ctx.save(); ctx.beginPath(); ctx.rect(-150, -104, 300, 170); ctx.clip(); ctx.translate(0, -19); cardArt(ctx, kind, t); ctx.restore(); ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.strokeRect(-150, -104, 300, 170);
      txt(ctx, l1, 0, 92, FX.DISPLAY(22)); txt(ctx, l2, 0, 118, FX.DISPLAY(i === 5 ? 18 : 22), '#c8322a');
      shape(ctx, '#e8423a', 3, circle(0, -124, 12)); shape(ctx, '#fff', 0, circle(-3, -127, 3.5)); ctx.restore(); }
    vig(ctx);
  }

  // ---------- c12: we're going to keep score — the world has declared the Maya finished more than once ----------
  function c12(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 360);
    const k = since(t, 'finished') - .05; if (k > 0) { const s = slam(k); ctx.save(); ctx.translate(560, 330); ctx.rotate(-.02); ctx.scale(s, s);
      shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-330, -150, 680, 320)); shape(ctx, '#fbf6ea', 5, rect(-340, -160, 680, 320, 4)); ctx.lineWidth = 10; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-322, -142, 644, 284);
      txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 22), '#5a5048'); txt(ctx, 'THE MAYA', 0, -36, FX.DISPLAY(66)); txt(ctx, 'ARE FINISHED.', 0, 34, FX.DISPLAY(56), RED); line(ctx, [[-200, 84], [200, 84]], 3, '#9a8a7a'); txt(ctx, '— everyone, more than once', 0, 112, FX.FONT(700, 18), '#5a5048'); ctx.restore(); }
    ctx.restore();
    counter(ctx, 1050, 230, 'ENDINGS: 0', since(t, 'score') + .05, 'DECLARED', GOLD, 44);
    counter(ctx, 1050, 470, 'WRONG: ?', since(t, 'count') + .05, 'TIMES', '#8ad0a0', 44);
    strip(ctx, "LET'S KEEP SCORE", 640, 70, since(t, 'keep'), { px: 40 });
    vig(ctx);
  }

  // ---------- c13: title over the plaza at dawn ----------
  function c13(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.04, 1.0), 640, 360); plaza(ctx, t, { tod: 1.35, thin: .6 }); ctx.restore();
    vendor(ctx, 1150, 690, .75, t, {}); table(ctx, 1040, 700, .8, {});
    shape(ctx, 'rgba(20,16,40,.25)', 0, rect(0, 0, W, H));
    strip(ctx, 'THE ENTIRE HISTORY OF', 640, 230, lt - .05, { px: 36 });
    strip(ctx, 'THE MAYA', 640, 330, lt - .3, { px: 96, color: GOLD, fill: '#2a1e3a', rot: .02 });
    vig(ctx);
  }

  const cut = [[0, c1], [A.some - .1, c2], [A.because - .05, c3], [A.ancient - .25, c4], [A.so - .05, c5], [A.but - .05, c6], [A.mayaword - .1, c7], [A.around - .1, c8], [A.so2 - .1, c9], [A.over - .05, c10], [A.building - .15, c11], [A.and3 - .05, c12], [102.85, c13]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: A.standing, type: 'click', gain: .4 }, { t: A.thousands, type: 'swell', gain: .4 }, { t: A.party, type: 'click', gain: .4 }, { t: A.pray, type: 'click', gain: .4 }, { t: A.watch, type: 'thud', gain: .4 },
    { t: A.movie, type: 'paper', gain: .4 }, { t: A.documentary - .3, type: 'click', gain: .4 }, { t: A.forwarded - .2, type: 'click', gain: .5 },
    { t: A.gone, type: 'wind', gain: .3 }, { t: A.message - .4, type: 'whoosh', gain: .4 }, { t: A.tonight, type: 'thud', gain: .6 },
    { t: A.midnight, type: 'boom', gain: .3 }, { t: A.midnight + .3, type: 'boom', gain: .25 }, { t: A.sunrise - .3, type: 'swell', gain: .4 }, { t: A.breakfast, type: 'click', gain: .4 }, { t: A.nothing, type: 'thud', gain: .5 },
    { t: A.buy, type: 'click', gain: .4 }, { t: A.water + .3, type: 'slide', gain: .3 }, { t: A.says, type: 'paper', gain: .3 }, { t: A.mayaword, type: 'thud', gain: .6 },
    { t: A.around, type: 'swell', gain: .4 }, { t: A.disappear, type: 'thud', gain: .5 }, { t: A.here - .1, type: 'slide', gain: .4 }, { t: A.vanished, type: 'scratch', gain: .4 }, { t: A.what, type: 'paper', gain: .4 },
    { t: A.over, type: 'whoosh', gain: .4 }, { t: A.building, type: 'paper', gain: .4 }, { t: A.boy, type: 'paper', gain: .4 }, { t: A.stranger, type: 'paper', gain: .4 }, { t: A.drought, type: 'paper', gain: .4 }, { t: A.bonfire, type: 'paper', gain: .4 }, { t: A.last2, type: 'paper', gain: .4 },
    { t: A.score, type: 'click', gain: .5 }, { t: A.finished, type: 'thud', gain: .8 }, { t: A.count, type: 'click', gain: .5 }, { t: 103.1, type: 'swell', gain: .5 }, { t: 103.4, type: 'thud', gain: .7 },
  ];
  // low drone + night insects → the music cuts on "It's Maya" → warm and rising for the road ahead
  const moods = [{ t: 0, mood: 'mystery' }, { t: A.because - .3, mood: 'under' }, { t: A.so - .3, mood: 'mystery' }, { t: A.nothing - .2, mood: 'silence' }, { t: A.but, mood: 'under' }, { t: A.mayaword - .05, mood: 'silence' },
    { t: A.around - .2, mood: 'under' }, { t: A.over - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-coldopen.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
