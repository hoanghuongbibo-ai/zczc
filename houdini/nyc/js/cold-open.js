/* New York — Cold open (narration-coldopen.mp3 = narration-full.mp3 0–61.5 s + a 2.5 s tail for the title).
 * Word anchors from tools/asr.py on the full recording. No violence and no death in the first 30 seconds. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const A = { standing: .19, corner: 1.11, manhattan: 1.92, wall: 2.98, broad: 3.71, eight: 5.23, morning: 5.96, train: 6.92, shaking: 7.45, sidewalk: 8.03, shoes: 8.92,
    coffee: 10.2, personal: 11.03, space: 11.52, towers: 12.48, block: 13.41, sky: 14.37, stay: 15.74, exactly: 16.11, dont: 17.73, feet: 18.21,
    four: 19.58, earlier: 20.54, noise: 21.66, gone: 22.12, low: 23.39, rise: 23.72, marshy: 24.2, creek: 24.91, past: 25.72, open: 26.58, water: 26.84,
    behind: 27.97, forest: 28.68, island: 30.32, same: 31.32, spot: 31.58, same2: 32.29, dirt: 32.7, feet2: 33.3, strange: 34.9, between: 36.15, hillside: 36.77,
    sidewalk2: 37.67, announced: 39.01, end: 39.59, six: 40.89, burned: 42.53, broke: 43.52, emptied: 44.37, every: 45.56, obituary: 47.29, every2: 48.72, came: 50.1,
    bigger: 50.69, how: 52.23, destroyed: 53.65, growing: 54.68, answer: 56.06, never: 56.75, buildings: 57.27, entire: 59.16, history: 59.71, newyork: 60.43, city: 60.88 };
  A.end = 64.0;

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
  const harbor = N.harbor, corner = N.corner;
  function sneakers(ctx, x, y, s, shake = 0) { ctx.save(); ctx.translate(x + shake, y); ctx.scale(s, s);
    for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 70, 0); ctx.rotate(d * .08);
      shape(ctx, '#3a5a8a', 4, rect(-34, -150, 68, 90, 10)); shape(ctx, '#f4f0e6', 4.5, c => { c.moveTo(-44, -60); c.lineTo(-40, 40); c.quadraticCurveTo(0, 62, 40, 40); c.lineTo(44, -60); c.closePath(); });
      shape(ctx, '#d8322a', 3, c => { c.moveTo(-40, 10); c.quadraticCurveTo(0, 22, 40, 10); c.lineTo(40, 28); c.quadraticCurveTo(0, 44, -40, 28); c.closePath(); }); for (let i = 0; i < 3; i++) line(ctx, [[-16, -40 + i * 14], [16, -40 + i * 14]], 3, '#9a9a9a'); ctx.restore(); }
    ctx.restore(); }
  function notice(ctx, x, y, k, count) { if (k <= 0) return; const s = slam(k); ctx.save(); ctx.translate(x, y); ctx.rotate(-.02); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-330, -150, 680, 320)); shape(ctx, '#fbf6ea', 5, rect(-340, -160, 680, 320, 4)); ctx.lineWidth = 10; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-322, -142, 644, 284);
    txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 22), '#5a5048'); txt(ctx, 'NEW YORK', 0, -36, FX.DISPLAY(66)); txt(ctx, 'IS FINISHED.', 0, 34, FX.DISPLAY(56), RED); line(ctx, [[-200, 84], [200, 84]], 3, '#9a8a7a');
    if (count != null) { shape(ctx, '#1d1a17', 0, rect(150, 98, 170, 52, 6)); txt(ctx, 'COUNT: ' + count, 235, 125, FX.DISPLAY(28), GOLD); }
    ctx.restore(); }
  function skyline(ctx, base, sc, t, col = '#2f4a6a', o = {}) { // a Manhattan skyline silhouette, sc grows it
    const B = [[-560, 90, 180], [-470, 70, 260], [-400, 80, 210], [-320, 60, 380], [-250, 90, 300], [-150, 70, 520], [-70, 60, 340], [0, 80, 440], [90, 70, 300], [170, 60, 600], [240, 90, 380], [340, 70, 280], [420, 80, 330], [510, 90, 220]];
    B.forEach(([dx, w, h], bi) => { const hh = h * sc; shape(ctx, o.colors ? o.colors[bi % o.colors.length] : col, 3.5, rect(640 + dx, base - hh, w, hh)); if (o.colors) shape(ctx, 'rgba(255,190,110,.25)', 0, rect(640 + dx + w * .6, base - hh, w * .4, hh)); if (o.windows) for (let y = base - hh + 16; y < base - 14; y += 26) for (let x = 640 + dx + 10; x < 640 + dx + w - 12; x += 20) shape(ctx, (x * 7 + y) % 3 ? 'rgba(255,220,140,.85)' : 'rgba(60,80,110,.45)', 0, rect(x, y, 9, 12)); });
    // the Empire State spire on the tallest
    const hh = 600 * sc; line(ctx, [[640 + 200, base - hh], [640 + 200, base - hh - 70 * sc]], 5, col); }

  // ---------- c1: a street corner in Lower Manhattan — Wall Street at Broad ----------
  function c1(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.06, 1.0), 640, 380); corner(ctx, t, {}); ctx.restore();
    FX.dateTag(ctx, 'LOWER MANHATTAN · TODAY');
    N.whereMap(ctx, 1100, 560, since(t, 'manhattan'), t);
    if (since(t, 'wall') > 0) { const k = since(t, 'wall'); glow(ctx, 1100, 205, 120 * pop(k), 'rgba(255,255,200,.5)'); }
    if (since(t, 'broad') > -.2) tag(ctx, 'WALL STREET, AT BROAD', 640, 110, since(t, 'broad') + .2, 26);
    vig(ctx);
  }

  // ---------- c2: 8:45 in the morning; a train shakes the sidewalk under your shoes (cut-away) ----------
  function c2(ctx, lt, dur, t) {
    const tr = since(t, 'train'), sh = since(t, 'shaking'), shake = sh > 0 && sh < 2 ? Math.sin(t * 60) * 4 : 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 360); ctx.translate(0, shake * .5);
    shape(ctx, grad(ctx, 0, 0, 0, 300, [[0, '#cfd6dc'], [1, '#b8c0c8']]), 0, rect(-200, -200, 1700, 500));
    for (let i = 0; i < 9; i++) { const x = -120 + i * 170, col = ['#e8b08a', '#cfc6b8', '#9fb0c0', '#d8c0a0'][i % 4]; shape(ctx, col, 4, rect(x, 40, 170, 262)); shape(ctx, '#3a5a7a', 3.5, rect(x + 18, 150, 134, 110, 4)); shape(ctx, 'rgba(255,255,255,.25)', 0, poly([[x + 30, 150], [x + 70, 150], [x + 40, 260], [x + 18, 260]]));
      shape(ctx, ['#c8322a', '#2f7a46', '#2f5a8a'][i % 3], 3, poly([[x + 8, 110], [x + 162, 110], [x + 150, 140], [x + 20, 140]])); for (let w = 0; w < 3; w++) shape(ctx, '#5a7894', 2.5, rect(x + 22 + w * 48, 56, 32, 36)); }
    for (let i = 0; i < 7; i++) { const x = ((i * 230 - t * 110) % 1610) + 1610; if (Math.abs((x % 1610) - 160 - 640) < 90) continue; N.walker(ctx, (x % 1610) - 160, 300, .5, t, i * 3 + 1); }
    // the pavement, then the earth, then the subway tunnel with a train
    shape(ctx, '#d6d0c4', 4, rect(-200, 300, 1700, 44)); for (let i = 0; i < 16; i++) line(ctx, [[-120 + i * 100, 300], [-120 + i * 100, 344]], 2, 'rgba(90,80,70,.35)');
    shape(ctx, grad(ctx, 0, 344, 0, 720, [[0, '#9a7a56'], [1, '#6e5238']]), 0, rect(-200, 344, 1700, 500));
    for (let i = 0; i < 30; i++) shape(ctx, 'rgba(60,40,20,.3)', 0, ellipse((i * 137) % 1400, 380 + (i * 61) % 90, 12, 5));
    shape(ctx, '#4a4a52', 5, rect(-200, 470, 1700, 230, 4)); shape(ctx, '#3a3a40', 0, rect(-200, 660, 1700, 40));
    if (tr > -.4) { const x = lerp(1500, -1700, clamp((tr + .4) / 2.6)); for (let c = 0; c < 4; c++) { const cx = x + c * 560; shape(ctx, '#c8ccd4', 4.5, rect(cx, 500, 540, 150, 18)); shape(ctx, '#7a2a8a', 0, rect(cx, 600, 540, 14));
      for (let w = 0; w < 6; w++) shape(ctx, '#ffe9a8', 3, rect(cx + 30 + w * 84, 520, 60, 52, 6)); shape(ctx, '#2a2a30', 3, circle(cx + 80, 656, 16)); shape(ctx, '#2a2a30', 3, circle(cx + 460, 656, 16)); }
      shape(ctx, '#2f7a46', 3, circle(x + 40, 560, 22)); txt(ctx, '4', x + 40, 562, FX.DISPLAY(26), '#fff'); }
    sneakers(ctx, 640, 290, .7, shake);
    if (sh > 0) for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = clamp(1 - (sh % 1)); line(ctx, [[560 + i * 30, 330], [556 + i * 30, 310]], 3, '#5a5048'); ctx.restore(); }
    ctx.restore();
    // the clock: 8:45
    const ck = since(t, 'eight') + .3; if (ck > 0) { const s = pop(ck); ctx.save(); ctx.translate(1180, 72); ctx.scale(s * .72, s * .72); shape(ctx, '#fff', 5, circle(0, 0, 76)); shape(ctx, '#f6c945', 4, circle(0, 0, 66));
      for (let i = 0; i < 12; i++) line(ctx, [[Math.cos(i * Math.PI / 6) * 52, Math.sin(i * Math.PI / 6) * 52], [Math.cos(i * Math.PI / 6) * 60, Math.sin(i * Math.PI / 6) * 60]], 3);
      line(ctx, [[0, 0], [Math.cos(-Math.PI / 2 + (8.75 / 12) * 2 * Math.PI) * 34, Math.sin(-Math.PI / 2 + (8.75 / 12) * 2 * Math.PI) * 34]], 7); line(ctx, [[0, 0], [Math.cos(-Math.PI / 2 + .75 * 2 * Math.PI) * 52, Math.sin(-Math.PI / 2 + .75 * 2 * Math.PI) * 52]], 5); ctx.restore();
      txt(ctx, '8:45 AM', 1040, 74, FX.DISPLAY(34), INK); }
    vig(ctx);
  }

  // ---------- c3: somebody's coffee is in your personal space ----------
  function c3(ctx, lt, dur, t) {
    const cf = since(t, 'coffee'), ps = since(t, 'personal');
    ctx.save(); cam(ctx, 1.25, 640, 470); T.blurred(ctx, 3, () => corner(ctx, t, {})); ctx.restore();
    // a commuter's arm swings a big coffee cup right into the frame
    const k = cf > -.4 ? FX.settle(clamp((cf + .4) / .5)) : 0, bob = Math.sin(t * 6) * 6;
    ctx.save(); ctx.translate(lerp(1600, 700, k), 420 + bob); ctx.rotate(-.12);
    shape(ctx, '#3a4a6a', 5, c => { c.moveTo(900, 120); c.lineTo(160, 40); c.lineTo(150, 150); c.lineTo(900, 260); c.closePath(); }); shape(ctx, '#f0c8a0', 4.5, smooth([[170, 30], [90, 40], [60, 100], [80, 170], [170, 160]]));
    shape(ctx, '#f4efe2', 5, c => { c.moveTo(-60, -170); c.lineTo(60, -170); c.lineTo(46, 150); c.lineTo(-46, 150); c.closePath(); }); shape(ctx, '#2f7a46', 0, ellipse(2, -10, 36, 40)); shape(ctx, '#fff', 3, circle(2, -10, 22));
    shape(ctx, '#6a4a2a', 4.5, rect(-70, -196, 140, 30, 8)); shape(ctx, '#8a6040', 4, rect(-58, -48, 120, 70, 6)); for (let i = 0; i < 3; i++) { const p = (t * .7 + i / 3) % 1; ctx.save(); ctx.globalAlpha = .6 * (1 - p); line(ctx, [[-20 + i * 20, -210 - p * 90], [-10 + i * 20 + Math.sin(p * 8) * 8, -240 - p * 90]], 5, '#fff'); ctx.restore(); }
    ctx.restore();
    if (ps > -.2) strip(ctx, 'PERSONAL SPACE: 0 INCHES', 330, 120, ps + .2, { px: 32, color: RED });
    vig(ctx);
  }

  // ---------- c4: the towers around you block out most of the sky (looking straight up) ----------
  function c4(ctx, lt, dur, t) {
    const bl = since(t, 'block');
    ctx.save(); ctx.translate(640, 360); ctx.rotate(lt * .03); ctx.scale(lerp(1, 1.12, ease.sine(clamp(lt / dur))), lerp(1, 1.12, ease.sine(clamp(lt / dur)))); ctx.translate(-640, -360);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#5fb2e8'], [1, '#b8e2f4']]), 0, rect(-300, -300, 1900, 1400)); clouds(ctx, t, [300, 360], .9);
    const close = bl > -.6 ? ease.inOut(clamp((bl + .6) / 1.6)) : 0, gap = lerp(260, 120, close);
    const towers = [[0, '#b9c2cc'], [Math.PI / 2, '#d8c0a0'], [Math.PI, '#a9b6c4'], [Math.PI * 1.5, '#cfc6b8'], [Math.PI / 4, '#9fb0c0'], [Math.PI * .75, '#d4c4a8'], [Math.PI * 1.25, '#c8bca8'], [Math.PI * 1.75, '#b4bec8']];
    towers.forEach(([a, col], i) => { const r0 = 1200, r1 = gap + (i % 2) * 40, w0 = .55, w1 = .32; const P = (r, da) => [640 + Math.cos(a + da) * r, 360 + Math.sin(a + da) * r];
      shape(ctx, col, 4.5, poly([P(r0, -w0), P(r1, -w1), P(r1, w1), P(r0, w0)]));
      for (let f = 1; f < 9; f++) { const r = lerp(r0, r1, f / 9), w = lerp(w0, w1, f / 9); line(ctx, [P(r, -w), P(r, w)], 2, 'rgba(40,50,60,.3)'); for (let c = -2; c <= 2; c++) shape(ctx, (f + c + i) % 4 ? '#5a7894' : '#9ac0dc', 0, circle(...P(lerp(r, lerp(r0, r1, (f + .5) / 9), .5), c * w / 3), 9 - f * .6)); } });
    ctx.restore();
    glow(ctx, 640, 360, 300, 'rgba(255,220,150,.35)'); for (let i = 0; i < 3; i++) N.pigeon(ctx, 400 + ((t * 60 + i * 200) % 500), 300 + i * 50, .7, t, i);
    if (bl > 0) tag(ctx, 'MOST OF THE SKY: GONE', 640, 640, since(t, 'sky'), 26);
    vig(ctx);
  }

  // ---------- c5: stay exactly where you are. Don't move your feet. (the city freezes) ----------
  function c5(ctx, lt, dur, t) {
    const st = since(t, 'stay'), dm = since(t, 'dont');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 420); corner(ctx, t, { freeze: A.stay + .3 }); ctx.restore();
    if (st > .3) { ctx.save(); ctx.globalAlpha = .28 * clamp((st - .3) / .5); shape(ctx, '#e8eef4', 0, rect(0, 0, W, H)); ctx.restore(); }
    // painted footprints on the pavement where you stand
    if (dm > -.3) { const k = pop(dm + .3); ctx.save(); ctx.translate(640, 660); ctx.scale(k, k * .45); for (const d of [-1, 1]) { shape(ctx, '#f6c945', 4, ellipse(d * 50, 0, 34, 70)); shape(ctx, '#f6c945', 4, ellipse(d * 50, -96, 26, 22)); } ctx.restore(); }
    if (st > -.2) strip(ctx, 'STAY EXACTLY WHERE YOU ARE', 640, 110, st + .2, { px: 34 });
    if (dm > 0) strip(ctx, "DON'T MOVE YOUR FEET", 640, 210, dm, { px: 40, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- c6: the same angle, four hundred years earlier: 1609 ----------
  function c6(ctx, lt, dur, t) {
    const fr = since(t, 'four'), m = fr > 0 ? ease.inOut(clamp(fr / 2.6)) : 0, cr = since(t, 'creek'), ow = since(t, 'open'), rs = since(t, 'rise');
    ctx.save(); cam(ctx, lerp(1, 1.08, ease.sine(clamp(lt / dur))), 640, 400); corner(ctx, t, { m, freeze: A.stay + .3 });
    if (m > .9) birds(ctx, t, 4, 200);
    if (rs > 0) { ctx.save(); ctx.globalAlpha = .5 * Math.sin(Math.PI * clamp(rs / 1.4)); shape(ctx, '#fff8c0', 0, c => { c.moveTo(-100, 120); c.quadraticCurveTo(250, 170, 520, 360); c.lineTo(520, 380); c.quadraticCurveTo(250, 190, -100, 140); c.closePath(); }); ctx.restore(); }
    if (cr > 0) for (let i = 0; i < 5; i++) sparkle(ctx, 900 + i * 60, 420 + i * 60, (cr - i * .12) / .9, .6);
    if (ow > 0) for (let i = 0; i < 6; i++) sparkle(ctx, 120 + i * 220, 360 + (i % 2) * 20, (ow - i * .1) / .9, .7);
    ctx.restore();
    // the year rolls back from today to 1609
    const yr = fr <= 0 ? 2026 : Math.round(lerp(2026, 1609, ease.inOut(clamp(fr / 2.2))));
    ctx.save(); ctx.translate(640, 110); const s = fr > -.4 ? pop(fr + .4) : 0; ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-150, -50, 310, 110, 10)); shape(ctx, PAPER, 4.5, rect(-156, -58, 312, 110, 10)); txt(ctx, String(yr), 0, 0, FX.DISPLAY(74), yr === 1609 ? GREEN : INK); ctx.restore();
    if (since(t, 'gone') > 0) tag(ctx, 'THE NOISE IS GONE', 640, 210, since(t, 'gone'), 22);
    if (cr > 0) tag(ctx, 'A MARSHY CREEK', 1060, 560, cr, 22); if (rs > 0) tag(ctx, 'A LOW RISE', 260, 300, rs, 22); if (ow > 0) tag(ctx, 'OPEN WATER', 640, 300, ow, 22);
    vig(ctx);
  }

  // ---------- c7: behind you, forest, all the way up the island ----------
  const MAN = [[-74.018, 40.700], [-74.0, 40.703], [-73.976, 40.711], [-73.972, 40.73], [-73.972, 40.75], [-73.958, 40.762], [-73.942, 40.776], [-73.929, 40.797], [-73.934, 40.81], [-73.934, 40.835], [-73.927, 40.85], [-73.912, 40.873],
    [-73.92, 40.879], [-73.93, 40.875], [-73.946, 40.851], [-73.959, 40.83], [-73.97, 40.81], [-73.989, 40.785], [-74.009, 40.756], [-74.012, 40.73], [-74.016, 40.712]];
  function c7(ctx, lt, dur, t) {
    const fo = since(t, 'forest'), is = since(t, 'island');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 420);
    sky(ctx, t, '#7cc4ec', '#fbe8c0');
    // looking north from the rise: wooded hills, ridge after ridge, all the way up the island
    for (let r = 5; r >= 0; r--) { const y = 250 + r * 75, col = ['#2f6a34', '#3f7f3a', '#4f8f44', '#5f9f4c', '#7aae5a', '#93bc70'][5 - r] ;
      ctx.save(); if (r > 3) ctx.globalAlpha = .85; shape(ctx, col, 3.5, c => { c.moveTo(-200, 760); c.lineTo(-200, y + 30); for (let x = -200; x <= 1500; x += 90) c.quadraticCurveTo(x + 45, y - 30 - ((x + r * 50) * 13 % 40), x + 90, y + 10 - ((x * 7) % 20)); c.lineTo(1500, 760); c.closePath(); });
      const rows = r < 2 ? 4 : 2; for (let j = rows - 1; j >= 0; j--) for (let i = 0; i < 18; i++) { const x = -150 + i * 95 + (r * 37 + j * 47) % 90, s = .35 + (5 - r) * .14 + j * .08, yy = y + 20 + j * 70 + (i % 3) * 10, sw = Math.sin(t + i + r) * 2;
        shape(ctx, '#5a3a20', 2.5, rect(x - 5 * s, yy - 6 * s, 10 * s, 30 * s)); shape(ctx, (i + j) % 3 ? col : '#2f6a34', 3, ellipse(x + sw, yy - 30 * s, 40 * s, 52 * s)); shape(ctx, 'rgba(255,255,255,.14)', 0, ellipse(x - 12 * s + sw, yy - 46 * s, 10 * s, 16 * s)); } ctx.restore(); }
    for (let i = 0; i < 40; i++) { const x = (i * 131) % 1400 - 60, y = 610 + (i * 47) % 130, sw = Math.sin(t * 1.5 + i) * 3; line(ctx, [[x, y], [x - 6 + sw, y - 26]], 4, '#4f8a3a'); line(ctx, [[x + 6, y], [x + 12 + sw, y - 22]], 4, '#5f9f4c'); if (i % 4 === 0) shape(ctx, ['#f6c945', '#f4efe2', '#e87a9a'][i % 3], 2, circle(x + 3 + sw, y - 30, 6)); }
    shape(ctx, '#7a5434', 4, rect(120, 660, 260, 40, 18)); shape(ctx, '#b8946a', 3, ellipse(380, 680, 14, 20));
    // a deer at the edge of the trees
    shape(ctx, '#a8744a', 3.5, ellipse(1030, 620, 46, 22)); line(ctx, [[1000, 636], [998, 680]], 6, '#8a5a34'); line(ctx, [[1056, 636], [1060, 680]], 6, '#8a5a34'); shape(ctx, '#a8744a', 3.5, ellipse(1078, 588, 16, 26, .4)); shape(ctx, '#a8744a', 3, ellipse(1088, 566, 18, 11)); line(ctx, [[1074, 556], [1066, 532], [1060, 524]], 3, '#6a4a2a'); line(ctx, [[1080, 554], [1086, 530]], 3, '#6a4a2a');
    ctx.restore();
    // inset: the whole island, all green, with you at the southern tip
    const k = is > -.6 ? pop(is + .6) : 0; if (k > 0) { ctx.save(); ctx.translate(1080, 250); ctx.scale(k, k); shape(ctx, '#fbf6ea', 4.5, rect(-130, -200, 260, 360, 8)); shape(ctx, '#7cc0dc', 0, rect(-118, -188, 236, 336));
      const LL = ([lon, lat]) => [(lon + 73.965) * 1500, -(lat - 40.79) * 1900]; shape(ctx, '#5f9f4c', 3.5, poly(MAN.map(LL))); for (let i = 0; i < 14; i++) shape(ctx, '#3f7f3a', 0, circle(...LL([-73.99 + (i % 3) * .015, 40.71 + i * .012]), 7));
      const [yx, yy] = LL([-74.009, 40.706]); shape(ctx, RED, 3, circle(yx, yy, 9)); txt(ctx, 'YOU', yx + 34, yy + 4, FX.FONT(700, 16), RED); ctx.restore(); }
    if (fo > -.2) strip(ctx, 'FOREST, ALL THE WAY UP THE ISLAND', 520, 110, fo + .2, { px: 32, color: GREEN });
    vig(ctx);
  }

  // ---------- c8: same spot, same dirt under your feet (split screen, same camera) ----------
  function c8(ctx, lt, dur, t) {
    const wipe = ease.inOut(clamp(lt / .8)), sx = lerp(1280, 640, wipe);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, sx, H); ctx.clip(); corner(ctx, t, { m: 1 }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(sx, 0, W - sx, H); ctx.clip(); corner(ctx, t, {}); ctx.restore();
    line(ctx, [[sx, 0], [sx, H]], 8, '#fbf6ea'); line(ctx, [[sx, 0], [sx, H]], 3, INK);
    // the same pair of feet at the bottom of both halves
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, sx, H); ctx.clip(); sneakers(ctx, 320, 700, .55); ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(sx, 0, W - sx, H); ctx.clip(); sneakers(ctx, 960, 700, .55); ctx.restore();
    txt(ctx, '1609', 320, 60, FX.DISPLAY(48), '#fff'); txt(ctx, 'TODAY', 960, 60, FX.DISPLAY(48), '#fff');
    if (since(t, 'spot') > -.2) strip(ctx, 'SAME SPOT.', 640, 170, since(t, 'spot') + .2, { px: 40 });
    if (since(t, 'dirt') > -.2) strip(ctx, 'SAME DIRT.', 640, 270, since(t, 'dirt') + .2, { px: 40, color: '#8a5a34', rot: .02 });
    vig(ctx);
  }

  // ---------- c9: between that hillside and that sidewalk, people have announced the end of this city at least six times ----------
  function c9(ctx, lt, dur, t) {
    const an = since(t, 'announced'), sx = since(t, 'six');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8fd0ec'], [1, '#f7e6c0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 130], .8);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    for (let i = 0; i < 34; i++) { const x = -40 + i * 40, k = clamp((x - 200) / 900), h = lerp(40, 260, k * k) * (.6 + ((i * 37) % 10) / 20);
      if (k < .35) { shape(ctx, i % 2 ? '#5f9f4c' : '#4f8f44', 3, circle(x, 470 - 30 - (i % 3) * 8, 34)); line(ctx, [[x, 470], [x, 450]], 6, '#5a3a20'); }
      else if (k < .55) { shape(ctx, '#c8a888', 3, rect(x - 16, 470 - 50, 32, 50)); shape(ctx, '#a8503a', 3, poly([[x - 20, 420], [x, 396], [x + 20, 420]])); }
      else { shape(ctx, ['#a9b6c4', '#d8c0a0', '#9fb0c0', '#e8b08a'][i % 4], 3, rect(x - 18, 470 - h, 36, h)); for (let y = 470 - h + 12; y < 460; y += 22) line(ctx, [[x - 10, y], [x + 10, y]], 4, 'rgba(60,80,110,.4)'); } }
    shape(ctx, grad(ctx, 0, 470, 0, 720, [[0, '#d8c8a0'], [1, '#c0a878']]), 3, rect(-60, 470, 1400, 300));
    // the timeline: the hillside at the left end, the sidewalk at the right end
    line(ctx, [[150, 520], [1130, 520]], 14, INK); line(ctx, [[150, 520], [1130, 520]], 8, '#f6c945');
    shape(ctx, '#5f9f4c', 4, c => { c.moveTo(40, 560); c.quadraticCurveTo(110, 420, 200, 560); c.closePath(); }); shape(ctx, '#3f7f3a', 3, ellipse(110, 440, 24, 30)); txt(ctx, '1609', 120, 600, FX.DISPLAY(30));
    for (const [dx, h] of [[-36, 150], [0, 210], [36, 170]]) shape(ctx, '#a9b6c4', 4, rect(1160 + dx - 16, 560 - h, 32, h)); txt(ctx, 'TODAY', 1160, 600, FX.DISPLAY(30));
    if (since(t, 'hillside') > 0) glow(ctx, 110, 480, 90, 'rgba(255,240,160,.6)'); if (since(t, 'sidewalk2') > 0) glow(ctx, 1160, 440, 90, 'rgba(255,240,160,.6)');
    // six obituary notices pinned along it, each one dropping in on "announced the end … six"
    const yrs = ['1776', '1835', '1931', '1975', '2001', '2020'];
    for (let i = 0; i < 6; i++) { const k = an + .2 - i * .28; if (k <= 0) continue; const x = 250 + i * 160, d = FX.dropBounce(k, 260, .3);
      ctx.save(); ctx.translate(x, 380 - d); ctx.rotate((i % 2 ? 1 : -1) * .05); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-58, -72, 124, 150)); shape(ctx, '#fbf6ea', 4, rect(-62, -78, 124, 150, 3)); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.strokeRect(-52, -68, 104, 130);
      txt(ctx, 'NEW YORK', 0, -32, FX.DISPLAY(20)); txt(ctx, 'IS', 0, -6, FX.DISPLAY(18)); txt(ctx, 'FINISHED', 0, 20, FX.DISPLAY(20), RED); txt(ctx, sx > 0 ? yrs[i] : '????', 0, 50, FX.FONT(700, 16), '#5a5048'); ctx.restore();
      line(ctx, [[x, 452 - d], [x, 512]], 3, INK); shape(ctx, RED, 2.5, circle(x, 520, 8)); }
    ctx.restore();
    if (sx > 0) { const s = pop(sx); ctx.save(); ctx.translate(640, 140); ctx.rotate(-.03); ctx.scale(s, s); FX.bigText(ctx, 'AT LEAST 6 TIMES', 0, 0, 64, { color: GOLD }); ctx.restore(); }
    else if (since(t, 'strange') > -.2) strip(ctx, "HERE'S THE STRANGE PART", 640, 660, since(t, 'strange') + .2, { px: 36 });
    vig(ctx);
  }

  // ---------- c10: It burned. It went broke. It emptied out. Every time, somebody wrote the obituary. ----------
  function panel(ctx, x, k, draw, label, col) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(x, lerp(820, 360, e)); ctx.rotate((x - 640) * .00008);
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-186, -236, 380, 470)); shape(ctx, '#fbf6ea', 5, rect(-190, -240, 380, 470, 6)); ctx.save(); ctx.beginPath(); ctx.rect(-172, -222, 344, 360); ctx.clip(); draw(ctx); ctx.restore(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(-172, -222, 344, 360);
    txt(ctx, label, 0, 184, FX.DISPLAY(34), col); ctx.restore(); }
  function c10(ctx, lt, dur, t) {
    const ob = since(t, 'obituary');
    shape(ctx, grad(ctx, 0, 0, W, H, [[0, '#f0d8a8'], [1, '#e8b888']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 14; i++) line(ctx, [[0, 40 + i * 52], [W, 40 + i * 52]], 2, 'rgba(120,80,40,.15)');
    panel(ctx, 240, since(t, 'burned') + .15, c => { shape(c, grad(c, 0, -222, 0, 140, [[0, '#3a2a4a'], [1, '#e8743a']]), 0, rect(-180, -230, 360, 380)); for (let i = 0; i < 8; i++) { const x = -160 + i * 42, h = 60 + (i * 37) % 90; shape(c, '#1d1a17', 0, rect(x, 140 - h, 36, h)); }
      for (let i = 0; i < 5; i++) { const p = (t * .5 + i / 5) % 1; c.save(); c.globalAlpha = .5 * (1 - p); shape(c, '#5a5050', 0, circle(-60 + i * 30, 40 - p * 200, 30 + p * 30)); c.restore(); } glow(c, 0, 80, 160, 'rgba(255,170,60,.6)'); }, 'IT BURNED.', RED);
    panel(ctx, 640, since(t, 'broke') + .15, c => { shape(c, '#e8e0cc', 0, rect(-180, -230, 360, 380)); shape(c, '#c8b898', 4, rect(-120, -140, 240, 180)); for (let i = 0; i < 4; i++) shape(c, '#f0ead8', 3, rect(-100 + i * 54, -110, 36, 120)); shape(c, '#fbf6ea', 3.5, rect(-120, -190, 240, 50)); txt(c, 'BANK', 0, -164, FX.DISPLAY(30));
      shape(c, '#fff', 3, rect(-70, -40, 140, 40, 4)); txt(c, 'CLOSED', 0, -20, FX.DISPLAY(24), RED); for (let i = 0; i < 4; i++) { const p = (t * .4 + i / 4) % 1; c.save(); c.translate(-140 + p * 280, 120 - Math.sin(p * 6 + i) * 30); c.rotate(p * 4); shape(c, '#e8f0d8', 2.5, rect(-16, -9, 32, 18)); txt(c, 'IOU', 0, 0, FX.FONT(700, 10)); c.restore(); } }, 'IT WENT BROKE.', '#8a5a34');
    panel(ctx, 1040, since(t, 'emptied') + .15, c => { shape(c, grad(c, 0, -222, 0, 140, [[0, '#b8c8d8'], [1, '#e8e4dc']]), 0, rect(-180, -230, 360, 380)); shape(c, '#8a8f98', 0, poly([[-30, 0], [30, 0], [180, 140], [-180, 140]]));
      for (const d of [-1, 1]) shape(c, '#b9b0a4', 3.5, poly([[d * 180, -230], [d * 40, -80], [d * 40, 0], [d * 180, 140]])); const p = (t * .25) % 1; c.save(); c.translate(-120 + p * 240, 110 - Math.abs(Math.sin(p * 12)) * 30); c.rotate(p * 8); shape(c, '#f4efe2', 2.5, rect(-14, -10, 28, 20)); c.restore(); }, 'IT EMPTIED OUT.', '#2f5a8a');
    if (ob > -.25) notice(ctx, 640, 360, ob + .25, null);
    if (since(t, 'every') > 0 && ob < -.25) strip(ctx, 'EVERY TIME…', 640, 70, since(t, 'every'), { px: 30 });
    vig(ctx);
  }

  // ---------- c11: New York is finished. Count: 0 — and every time, the city came back bigger ----------
  function c11(ctx, lt, dur, t) {
    const bg = since(t, 'bigger'), cm = since(t, 'came');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#6ab8ea'], [.7, '#ffd8a0'], [1, '#ffeac0']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 520, 520, 'rgba(255,240,190,.6)'); clouds(ctx, t, [70, 120], .9);
    const sc = cm > -.2 ? lerp(.35, 1.05, FX.settle(clamp((cm + .2) / 1.1))) : .35;
    ctx.save(); skyline(ctx, 600, sc * .7, t, '#8aa0bc'); ctx.translate(40, 0); skyline(ctx, 600, sc, t, '#3a5a80', { windows: true, colors: ['#e8b08a', '#a9b6c4', '#f0d29a', '#9fb0c0', '#d8c0a0', '#c8a0b8'] }); ctx.restore(); waterBand(ctx, 600, t);
    { const lx = 150, ly = 640; shape(ctx, '#7aa890', 3.5, rect(lx - 26, ly - 70, 52, 70)); shape(ctx, '#8ab8a0', 3.5, c => { c.moveTo(lx - 16, ly - 70); c.lineTo(lx - 12, ly - 150); c.lineTo(lx + 12, ly - 150); c.lineTo(lx + 16, ly - 70); c.closePath(); });
      shape(ctx, '#8ab8a0', 3, circle(lx, ly - 162, 12)); for (let i = -2; i <= 2; i++) line(ctx, [[lx, ly - 172], [lx + i * 8, ly - 186]], 3, '#8ab8a0'); line(ctx, [[lx + 10, ly - 146], [lx + 22, ly - 196]], 6, '#8ab8a0'); shape(ctx, '#f6c945', 2.5, ellipse(lx + 23, ly - 204, 6, 9)); glow(ctx, lx + 23, ly - 204, 24, 'rgba(255,220,120,.6)'); }
    for (let i = 0; i < 3; i++) { const bx = ((i * 420 + t * 30) % 1500) - 100, by = 660 + i * 18; shape(ctx, i % 2 ? '#f2a03a' : '#f4efe2', 3, poly([[bx - 50, by - 16], [bx + 50, by - 16], [bx + 40, by], [bx - 40, by]])); shape(ctx, '#f4efe2', 2.5, rect(bx - 20, by - 30, 40, 14, 3)); }
    const nk = clamp(1 - Math.max(0, cm) / .6); if (nk > 0) { ctx.save(); ctx.globalAlpha = nk; notice(ctx, 640, 330, lt + 1, 0); ctx.restore(); }
    if (bg > 0) { const s = pop(bg); ctx.save(); ctx.translate(640, 120); ctx.rotate(-.03); ctx.scale(s, s); FX.bigText(ctx, 'CAME BACK BIGGER', 0, 0, 66, { color: GOLD }); ctx.restore();
      ctx.save(); ctx.translate(1110, 240); ctx.scale(s, s); line(ctx, [[0, 120], [0, -60]], 22, INK); line(ctx, [[0, 120], [0, -60]], 13, GREEN); shape(ctx, GREEN, 5, poly([[-40, -40], [0, -100], [40, -40]])); ctx.restore(); }
    vig(ctx);
  }

  // ---------- c12: how does a place that keeps getting destroyed keep growing? The answer was never the buildings. ----------
  function c12(ctx, lt, dur, t) {
    const ds = since(t, 'destroyed'), gr = since(t, 'growing'), an = since(t, 'answer'), bd = since(t, 'buildings');
    const pan = an > 0 ? ease.inOut(clamp(an / 1.4)) : 0;
    ctx.save(); cam(ctx, lerp(1, 1.18, pan), 640, lerp(380, 560, pan));
    shape(ctx, grad(ctx, 0, -200, 0, 560, [[0, '#6ab8ea'], [1, '#ffe2b0']]), 0, rect(-300, -300, 1900, 900)); clouds(ctx, t, [60, 110]);
    // a toy-like skyline knocked flat on "destroyed", then rebuilt taller on "growing"
    const fade = bd > 0 ? 1 - clamp(bd / .8) * .75 : 1;
    ctx.save(); ctx.globalAlpha = fade;
    const B = [[260, 70, 160], [340, 60, 220], [410, 80, 180], [500, 70, 300], [580, 60, 240], [650, 90, 360], [750, 70, 260], [830, 80, 320], [920, 60, 200], [990, 80, 250]];
    B.forEach(([x, w, h], i) => { const fall = ds > i * .05 && gr < 0 ? ease.in(clamp((ds - i * .05) / .5)) : 0, up = gr > 0 ? FX.settle(clamp((gr - i * .06) / .6)) : 0, hh = gr > 0 ? lerp(0, h * 1.5, up) : h;
      ctx.save(); ctx.translate(x + w / 2, 520); ctx.rotate(fall * (i % 2 ? 1.45 : -1.45)); if (!(gr > 0 && up <= 0)) { shape(ctx, ['#e8b08a', '#a9b6c4', '#f0d29a', '#9fb0c0', '#d8c0a0'][i % 5], 4, rect(-w / 2, -hh, w, hh)); for (let y = -hh + 14; y < -14; y += 28) line(ctx, [[-w / 2 + 10, y], [w / 2 - 10, y]], 5, 'rgba(60,80,110,.45)'); } ctx.restore(); });
    ctx.restore();
    shape(ctx, '#c8b898', 4, rect(-300, 520, 1900, 26));
    waterBand(ctx, 546, t);
    if (bd > 0) { const k = clamp(bd / 1.2); harbor(ctx, 640, 860 - 150 * ease.out(k), 520, t, { look: [0, -.4], eyes: blink(t, 59.2), mouth: 'smile' }); for (let i = 0; i < 6; i++) sparkle(ctx, 400 + i * 90, 600 + (i % 2) * 30, (bd - .3 - i * .08) / .9, .7); }
    ctx.restore();
    if (since(t, 'how') > -.2 && an < 0) strip(ctx, 'HOW DOES IT KEEP GROWING?', 640, 100, since(t, 'how') + .2, { px: 36 });
    if (bd > 0) strip(ctx, 'THE ANSWER WAS NEVER THE BUILDINGS', 640, 100, bd, { px: 32, color: RED });
    vig(ctx);
  }

  // ---------- c13: this is the entire history of New York City (title over the corner) ----------
  function c13(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 340); corner(ctx, t, { light: 1 }); glow(ctx, 640, 350, 220, 'rgba(255,230,160,.7)'); ctx.restore();
    ctx.save(); ctx.globalAlpha = .35; shape(ctx, '#1d1a17', 0, rect(0, 0, W, H)); ctx.restore();
    strip(ctx, 'THE ENTIRE HISTORY OF', 640, 230, since(t, 'entire'), { px: 40 });
    const k = since(t, 'newyork') + .1; if (k > 0) { const s = slam(k); ctx.save(); ctx.translate(640, 360); ctx.rotate(-.02); ctx.scale(s, s); FX.bigText(ctx, 'NEW YORK CITY', 0, 0, 120, { color: GOLD }); ctx.restore(); }
    if (since(t, 'city') > .8) { ctx.save(); ctx.globalAlpha = clamp((since(t, 'city') - .8) / .5); shape(ctx, '#1d1a17', 4, rect(530, 470, 220, 56, 8)); txt(ctx, 'COUNT: 0', 640, 499, FX.DISPLAY(30), GOLD); ctx.restore(); }
    vig(ctx);
  }

  const cut = [[0, c1], [4.8, c2], [9.75, c3], [12.35, c4], [15.6, c5], [19.35, c6], [27.8, c7], [31.25, c8], [34.45, c9], [42.35, c10], [48.4, c11], [52.0, c12], [58.35, c13]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: A.wall, type: 'click', gain: .4 }, { t: A.eight - .2, type: 'click', gain: .5 }, { t: A.train - .3, type: 'swell', gain: .5 }, { t: A.shaking, type: 'rattle', gain: .5 },
    { t: A.coffee - .3, type: 'whoosh', gain: .5 }, { t: A.block - .4, type: 'creak', gain: .4 }, { t: A.dont, type: 'thud', gain: .5 },
    { t: A.four, type: 'whoosh', gain: .5 }, { t: A.creek, type: 'splash', gain: .2 }, { t: A.forest - .2, type: 'paper', gain: .3 }, { t: 31.3, type: 'whoosh', gain: .4 },
    { t: A.announced + .2, type: 'thud', gain: .3 }, { t: A.announced + .5, type: 'thud', gain: .3 }, { t: A.announced + .8, type: 'thud', gain: .3 }, { t: A.six, type: 'thud', gain: .6 },
    { t: A.burned - .15, type: 'paper', gain: .4 }, { t: A.broke - .15, type: 'paper', gain: .4 }, { t: A.emptied - .15, type: 'paper', gain: .4 }, { t: A.obituary - .25, type: 'thud', gain: .8 },
    { t: A.came, type: 'swell', gain: .5 }, { t: A.bigger, type: 'thud', gain: .5 }, { t: A.destroyed, type: 'rattle', gain: .5 }, { t: A.growing, type: 'ratchet', gain: .4 }, { t: A.buildings, type: 'splash', gain: .4 },
    { t: A.newyork - .1, type: 'thud', gain: .8 },
  ];
  // city noise drains away on "stay exactly where you are"; wind and birds in 1609; music lifts again at the obituaries
  const moods = [{ t: 0, mood: 'under' }, { t: A.stay, mood: 'silence' }, { t: A.four + 1.5, mood: 'still' }, { t: A.strange - .3, mood: 'mystery' }, { t: A.came - .3, mood: 'under' }, { t: A.entire - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-coldopen.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
