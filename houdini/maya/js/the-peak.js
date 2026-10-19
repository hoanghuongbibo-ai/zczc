/* The Maya — Beat 4d "The peak — and how big it really was" (narration-peak.mp3 = 1.8 s chapter pause + narration-full.mp3 553.35–632.7 s + 1.2 s tail).
 * Anchors = full-recording word times − 551.55. c. AD 750; the 'empty jungle' myth; PACUNAM lidar (side section, not the Beat 2 top view); 61,480 structures; 7–11 million; corn lives off rain. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { zoom: 553.84, seven: 555.76, height: 557.02, classic: 559.14, how: 560.74, not: 566.29, empty: 568.63, ceremonial: 569.9, villages: 571.73, then: 572.99, sixteen: 573.85, popcorn: 575.64, flew: 577.35, eight: 580.08, guatemala: 582.57, the2: 583.7, leaves: 585.07, bounce: 585.78, strips: 587.76, they: 589.75, counted: 589.89, houses: 593.79, palaces: 594.66, roads: 595.7, terraces: 596.79, walls: 598.22, when: 599.3, marcelo: 600.41, extrapolated: 603.32, central: 604.93, indiana: 607.35, seven2: 609.82, thats: 613.14, extrapolation: 613.45, not2: 614.43, critics: 616.09, direction: 617.29, clear: 618.01, this2: 619.01, jungle: 620.8, crowded: 621.99, millions: 624.44, court: 625.98, rain: 628.23, remember: 629.29, matter: 630.81 };
  const A = {}; for (const k in F) A[k] = F[k] - 551.55; A.end = 82.35;
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
  function tree(ctx, x, y, s, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); line(ctx, [[0, 0], [4, -120]], 16, '#6a4a2a'); for (const [dx, dy, r] of [[-40, -130, 50], [40, -136, 54], [0, -170, 60], [-10, -120, 44]]) shape(ctx, '#3f8a3a', 3, circle(dx, dy, r)); ctx.restore(); }
  function hut(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#e8dcc0', 3, rect(-30, -34, 60, 34, 10)); shape(ctx, '#c8a050', 3, c => { c.moveTo(-40, -28); c.quadraticCurveTo(0, -80, 40, -28); c.closePath(); }); ctx.restore(); }
  function cornIcon(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#8ac060', 3, c => { c.moveTo(0, 40); c.quadraticCurveTo(-40, 0, -6, -50); c.lineTo(0, 30); }); shape(ctx, '#f6c945', 3.5, ellipse(4, -6, 20, 46)); for (let r = 0; r < 6; r++) for (let c2 = -1; c2 <= 1; c2++) shape(ctx, '#f8d860', 1, circle(4 + c2 * 9, -36 + r * 12, 4)); ctx.restore(); }
  function cloudRain(ctx, x, y, s, t, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#e8eef8', 4, smooth([[-110, 30], [-120, -10], [-80, -46], [-30, -54], [10, -80], [70, -60], [110, -30], [120, 10], [90, 36], [0, 44]])); for (let i = 0; i < 9; i++) { const xx = -80 + i * 20, yy = 50 + ((t * 300 + i * 40) % 90); line(ctx, [[xx, yy], [xx - 5, yy + 18]], 4, '#5a96d8'); } ctx.restore(); }

  // ---------- d1: zoom out — around 750, the height of the Late Classic ----------
  function d1(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(70, 340, 1150, 80)); shape(ctx, '#f6ecd0', 4, rect(60, 330, 1160, 80, 6));
    const X = y => 120 + (y + 1000) / 2500 * 1040; const ER = [[-1000, '1000 BC'], [-500, '500 BC'], [1, 'AD 1'], [500, '500'], [1000, '1000'], [1500, '1500']];
    for (const [y, s] of ER) { line(ctx, [[X(y), 330], [X(y), 370]], 4); txt(ctx, s, X(y), 392, FX.FONT(800, 18), '#3a2a1a'); }
    // a hump: Preclassic, Classic, Postclassic
    const pk = clamp((t - A.height + .5) / 1.2); shape(ctx, 'rgba(47,122,70,.35)', 3, c => { c.moveTo(X(-1000), 330); c.bezierCurveTo(X(-200), 330 - 60, X(500), 330 - 120 * (1 + pk * .6), X(750), 330 - 200 * (.5 + pk * .5)); c.bezierCurveTo(X(850), 330 - 120, X(950), 330 - 40, X(1500), 330 - 60); c.lineTo(X(1500), 330); c.closePath(); });
    if (since(t, 'seven') > 0) { const s = pop(since(t, 'seven')); ctx.save(); ctx.translate(X(750), 330 - 200 * (.5 + pk * .5)); ctx.scale(s, s); shape(ctx, '#c8322a', 3, circle(0, 0, 14)); ctx.restore(); line(ctx, [[X(750), 330], [X(750), 330 - 200 * (.5 + pk * .5)]], 3, '#c8322a'); }
    ctx.restore();
    if (since(t, 'seven') > 0) counter(ctx, X(750), 520, 'c. AD 750', since(t, 'seven'), null, GOLD, 40);
    if (since(t, 'classic') > 0) tag(ctx, 'THE HEIGHT OF THE LATE CLASSIC', X(750), 600, since(t, 'classic'), 24);
    if (since(t, 'zoom') > 0) strip(ctx, 'ZOOM OUT', 640, 120, since(t, 'zoom'), { px: 40 });
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 4 · THE ESCALATION', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE PEAK', 640, 350, lt - .35, { px: 66, color: '#c88a10', rot: .02 }); tag(ctx, 'c. AD 750', 640, 440, lt - .7, 26); ctx.restore(); }
    vig(ctx);
  }

  // ---------- d2: how many people? For most of the 20th century: "not that many". The jungle looked empty ----------
  function d2(ctx, lt, dur, t) {
    deskBg(ctx, t);
    // an old 1950s-style map: mostly blank jungle, a few temples, a question mark
    ctx.save(); ctx.translate(640, 390); ctx.rotate(-.015); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-472, -266, 960, 540)); shape(ctx, '#e8dcb0', 4, rect(-480, -274, 960, 540, 4));
    for (let i = 0; i < 70; i++) shape(ctx, 'rgba(90,130,70,.28)', 0, ellipse(-440 + (i * 131) % 880, -230 + (i * 71) % 460, 40, 22, i));
    txt(ctx, 'THE MAYA LOWLANDS', 0, -230, FX.DISPLAY(28), '#5a4a2a'); txt(ctx, '— a survey, 1950s —', 0, -196, FX.FONT(700, 16), '#7a6a4a');
    const ck = clamp((t - A.ceremonial + .3) / .8); for (const [x, y] of [[-260, -60], [40, 40], [260, -100], [-60, 150]]) { if (ck <= 0) continue; ctx.save(); ctx.translate(x, y); ctx.scale(ck, ck); shape(ctx, '#bcae90', 2.5, poly([[-22, 0], [22, 0], [12, -30], [-12, -30]])); shape(ctx, '#bcae90', 2.5, rect(-8, -42, 16, 12)); ctx.restore(); }
    const vk = clamp((t - A.villages + .3) / .8); for (const [x, y] of [[-380, 120], [180, 180], [360, 60], [-140, -150], [120, -180]]) if (vk > 0) hut(ctx, x, y, .5 * vk);
    if (since(t, 'empty') > 0) { ctx.save(); ctx.globalAlpha = clamp(since(t, 'empty') / .4); txt(ctx, '?', 300, 140, FX.DISPLAY(90), 'rgba(120,90,50,.5)'); txt(ctx, '?', -320, 40, FX.DISPLAY(70), 'rgba(120,90,50,.4)'); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'HOW MANY PEOPLE?', 640, 70, lt - .05, { px: 40 });
    if (since(t, 'not') > 0) FX.stamp(ctx, '"NOT THAT MANY"', 980, 620, since(t, 'not'), { color: '#7a5a3a', size: 40 });
    if (since(t, 'empty') > 0) tag(ctx, 'THE JUNGLE LOOKED EMPTY', 330, 640, since(t, 'empty'), 22);
    vig(ctx);
  }

  // ---------- d3: 2016 — the PACUNAM Lidar Initiative flies laser scanners over ~830 square miles of northern Guatemala ----------
  const SURVEY = [[-90.0, 17.75, .5, .35], [-89.55, 17.55, .45, .4], [-89.95, 17.2, .35, .3], [-89.3, 17.25, .4, .3], [-90.35, 17.35, .3, .3], [-89.75, 16.9, .3, .25], [-90.6, 17.0, .25, .25], [-89.4, 16.85, .3, .2], [-89.05, 17.6, .25, .2], [-90.3, 17.7, .2, .2]];
  function surveyPatches(ctx, k, col = 'rgba(232,140,60,.75)') { for (let i = 0; i < SURVEY.length; i++) { const kk = clamp(k * SURVEY.length - i); if (kk <= 0) continue; const [lo, la, w, h] = SURVEY[i], [x0, y0] = MP([lo - w / 2, la + h / 2]), [x1, y1] = MP([lo + w / 2, la - h / 2]); shape(ctx, col, 3, rect(x0, y0, (x1 - x0) * kk, y1 - y0)); } }
  function d3(ctx, lt, dur, t) {
    const [fx, fy] = MP([-89.8, 17.3]); ctx.save(); T.cam(ctx, lerp(1.4, 2.6, ease.inOut(clamp(lt / 2.5))), lerp(640, fx, ease.inOut(clamp(lt / 2.5))), lerp(360, fy, ease.inOut(clamp(lt / 2.5)))); mayaMap(ctx, t);
    const sk = clamp((t - A.flew) / 4.0); surveyPatches(ctx, sk);
    site(ctx, 'tikal', .6, 'TIKAL', { r: 6, px: 12, col: '#2f4a8a' });
    // the plane mowing the lawn
    if (sk > 0 && sk < 1) { const row = Math.floor(sk * 6), u = (sk * 6) % 1, dir = row % 2 ? -1 : 1, [ax, ay] = MP([-90.75, 17.95 - row * .2]), [bx] = MP([-88.85, 17.95]); const px = dir > 0 ? lerp(ax, bx, u) : lerp(bx, ax, u); ctx.save(); ctx.translate(px, ay); ctx.scale(dir * .35, .35); shape(ctx, '#f4efe6', 4, ellipse(0, 0, 90, 18)); shape(ctx, '#3a6ab8', 3, poly([[-20, -6], [30, -6], [-10, -70], [-30, -70]])); shape(ctx, '#3a6ab8', 3, poly([[-20, 6], [30, 6], [-10, 70], [-30, 70]])); ctx.restore(); }
    ctx.restore();
    counter(ctx, 160, 110, '2016', since(t, 'sixteen') + .1, null, GOLD, 40);
    if (since(t, 'popcorn') > -.2) { const k = pop(since(t, 'popcorn') + .2); ctx.save(); ctx.translate(640, 110); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-246, -42, 500, 90)); shape(ctx, '#fbf6ea', 4, rect(-250, -46, 500, 90, 6)); txt(ctx, 'PACUNAM LIDAR INITIATIVE', 0, -10, FX.DISPLAY(28), '#c86a2a'); txt(ctx, 'laser scanners on planes', 0, 24, FX.FONT(700, 17), '#6a5a4a'); ctx.restore(); }
    if (since(t, 'eight') > 0) counter(ctx, 1040, 620, '≈ 830 SQ MILES', since(t, 'eight'), null, GOLD, 40);
    if (since(t, 'guatemala') > 0) tag(ctx, 'NORTHERN GUATEMALA', 1040, 540, since(t, 'guatemala'), 22);
    vig(ctx);
  }

  // ---------- d4: the lasers slip between the leaves, bounce off the ground, and the computer strips the forest away ----------
  function d4(ctx, lt, dur, t) {
    const strip_ = clamp((t - A.strips + .3) / 1.4);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ad0f0'], [1, '#e8f0e0']]), 0, rect(0, 0, W, H));
    // the ground profile with buried house mounds and a causeway
    const GY = x => 560 + Math.sin(x / 140) * 20 + (x > 500 && x < 620 ? -40 * Math.sin((x - 500) / 120 * Math.PI) : 0) + (x > 860 && x < 940 ? -24 * Math.sin((x - 860) / 80 * Math.PI) : 0) + (x > 220 && x < 290 ? -20 * Math.sin((x - 220) / 70 * Math.PI) : 0);
    shape(ctx, '#b8946a', 4, c => { c.moveTo(-10, 760); for (let x = -10; x <= 1290; x += 10) c.lineTo(x, GY(x)); c.lineTo(1290, 760); c.closePath(); });
    if (strip_ > .3) { const k = clamp((strip_ - .3) / .5); ctx.save(); ctx.globalAlpha = k; shape(ctx, '#e88a3a', 3, c => { c.moveTo(-10, 760); for (let x = -10; x <= 1290; x += 10) c.lineTo(x, GY(x)); c.lineTo(1290, 760); c.closePath(); }); for (const [x, s] of [[560, 'HOUSE MOUND'], [900, 'PLATFORM'], [255, 'HOUSE']]) tag(ctx, s, x, GY(x) - 70, k, 18); ctx.restore(); }
    // the forest, fading on "strips the forest away"
    for (let i = 0; i < 14; i++) tree(ctx, 30 + i * 92, GY(30 + i * 92) + 4, .95 + (i % 3) * .12, 1 - strip_);
    // the plane and the pulses
    const px = lerp(-100, 1380, clamp(lt / (dur + .5))); ctx.save(); ctx.translate(px, 70); shape(ctx, '#f4efe6', 4, ellipse(0, 0, 90, 18)); shape(ctx, '#3a6ab8', 3, poly([[-20, -6], [30, -6], [-10, -50], [-30, -50]])); ctx.restore();
    for (let i = 0; i < 9; i++) { const ph = ((t * 1.4 + i * .13) % 1), x0 = px - 120 + i * 30; if (x0 < 0 || x0 > 1280) continue; const gy = GY(x0), hit = i % 3 === 0 && strip_ < .6 ? 330 : gy; const y = lerp(90, hit, clamp(ph * 2)), back = ph > .5; ctx.save(); ctx.globalAlpha = .9; line(ctx, [[x0, back ? lerp(hit, 90, (ph - .5) * 2) : y - 30], [x0, back ? lerp(hit, 90, (ph - .5) * 2) + 30 : y]], 4, i % 3 === 0 && strip_ < .6 ? '#e8423a' : '#2ad8c8'); ctx.restore(); if (!back && ph > .45) shape(ctx, i % 3 === 0 && strip_ < .6 ? '#e8423a' : '#2ad8c8', 0, circle(x0, hit, 6)); }
    if (since(t, 'leaves') > 0) tag(ctx, 'THROUGH THE GAPS IN THE LEAVES', 330, 170, since(t, 'leaves'), 22);
    if (since(t, 'bounce') > 0) tag(ctx, 'OFF THE GROUND AND BACK', 330, 230, since(t, 'bounce'), 22);
    if (since(t, 'strips') > 0) strip(ctx, 'STRIP THE FOREST AWAY', 900, 190, since(t, 'strips'), { px: 36, color: '#c86a2a' });
    vig(ctx);
  }

  // ---------- d5: 61,480 structures — houses, palaces, roads, farm terraces, defensive walls ----------
  const KINDS = [['HOUSES', 'houses', '#e8dcc0'], ['PALACES', 'palaces', '#c8322a'], ['ROADS', 'roads', '#f6c945'], ['FARM TERRACES', 'terraces', '#7ab048'], ['DEFENSIVE WALLS', 'walls', '#7a4a8a']];
  function d5(ctx, lt, dur, t) {
    // oblique bare-earth relief
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4c890'], [1, '#d8884a']]), 0, rect(0, 0, W, H));
    ctx.save(); ctx.translate(640, 400); ctx.transform(1, 0, -.3, .72, 0, 0);
    for (let i = 0; i < 22; i++) line(ctx, [[-900, -500 + i * 50], [900, -500 + i * 50 + Math.sin(i) * 20]], 3, 'rgba(120,60,20,.18)');
    const kk = KINDS.map(k => clamp((t - A[k[1]] + .3) / .8));
    for (let i = 0; i < 170; i++) { const x = -760 + ((i * 197) % 1520), y = -400 + ((i * 113) % 760); const sel = i % 5, k = Math.max(clamp((t - A.counted - i * .004) / .3), 0); if (k <= 0) continue;
      const hl = kk[sel] > 0 && (since(t, KINDS[sel][1]) < 1.6); const col = hl ? KINDS[sel][2] : '#f4d0a0';
      if (sel === 2) line(ctx, [[x - 50, y], [x + 50, y]], hl ? 16 : 10, col); else if (sel === 3) { for (let j = 0; j < 3; j++) line(ctx, [[x - 40, y + j * 14], [x + 40, y + j * 14]], 7, col); } else if (sel === 4) line(ctx, [[x - 60, y - 16], [x + 60, y + 16]], 13, col); else shape(ctx, col, 3, rect(x - 20 * (sel === 1 ? 2 : 1), y - 15, 40 * (sel === 1 ? 2 : 1), 30, 5)); }
    ctx.restore();
    const n = Math.round(61480 * ease.out(clamp((t - A.counted) / 2.6))); counter(ctx, 640, 100, n.toLocaleString('en-US') + ' STRUCTURES', since(t, 'counted') + .1, null, GOLD, 42);
    for (let i = 0; i < 5; i++) { const k = since(t, KINDS[i][1]); if (k <= 0) continue; const s = pop(k); ctx.save(); ctx.translate(140 + i * 250, 640); ctx.scale(s, s); ctx.font = FX.DISPLAY(22); const w = ctx.measureText(KINDS[i][0]).width + 50; shape(ctx, '#fbf6ea', 3.5, rect(-w / 2, -24, w, 48, 8)); shape(ctx, KINDS[i][2], 2.5, rect(-w / 2 + 10, -10, 20, 20, 4)); txt(ctx, KINDS[i][0], 14, 2, FX.DISPLAY(22)); ctx.restore(); }
    vig(ctx);
  }

  // ---------- d6: Canuto and Estrada-Belli extrapolate across the central lowlands — about the size of Indiana — 7 to 11 million ----------
  const LOWLANDS = [[-91.6, 18.4], [-90.4, 19.3], [-89.0, 19.4], [-88.1, 18.3], [-88.4, 16.3], [-89.5, 15.9], [-90.8, 16.0], [-91.9, 16.9]];
  const INDIANA = [[-87.53, 41.76], [-84.82, 41.76], [-84.82, 39.1], [-84.9, 38.8], [-85.9, 38.2], [-86.5, 37.9], [-87.1, 37.8], [-88.0, 37.8], [-87.5, 38.7], [-87.53, 39.4]];
  function d6(ctx, lt, dur, t) {
    const [fx, fy] = MP([-89.9, 17.6]); ctx.save(); T.cam(ctx, 1.6, fx, fy); mayaMap(ctx, t, { today: false });
    surveyPatches(ctx, 1); const ek = clamp((t - A.extrapolated + .2) / 1.2);
    if (ek > 0) { ctx.save(); ctx.globalAlpha = .55 * ek; shape(ctx, 'rgba(232,140,60,.6)', 4, c => { const p = LOWLANDS.map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); }); ctx.restore(); }
    // Indiana, same scale, slid in beside it
    const ik = clamp((t - A.indiana + .5) / .9); if (ik > 0) { const ox = -89.9 + lerp(6, 2.9, ease.out(ik)) - (-86.2), oy = 17.6 - 39.8; ctx.save(); ctx.globalAlpha = ik; shape(ctx, 'rgba(58,106,184,.55)', 4, c => { const p = INDIANA.map(([lo, la]) => MP([lo + ox, la + oy])); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); }); const [lx, ly] = MP([-86.2 + ox, 39.8 + oy]); txt(ctx, 'INDIANA', lx, ly, FX.DISPLAY(22), '#fff'); ctx.restore(); }
    ctx.restore();
    if (since(t, 'marcelo') > -.2) { const k = pop(since(t, 'marcelo') + .2); ctx.save(); ctx.translate(250, 120); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-206, -46, 420, 100)); shape(ctx, '#fbf6ea', 4, rect(-210, -50, 420, 100, 6)); txt(ctx, 'MARCELLO CANUTO', 0, -16, FX.DISPLAY(24), '#2f4a8a'); txt(ctx, '& FRANCISCO ESTRADA-BELLI', 0, 18, FX.DISPLAY(20), '#2f4a8a'); ctx.restore(); }
    if (since(t, 'central') > 0) tag(ctx, 'EXTRAPOLATED ACROSS THE CENTRAL LOWLANDS', 640, 300, since(t, 'central'), 22);
    if (since(t, 'seven2') > -.1) { counter(ctx, 640, 590, '7–11 MILLION PEOPLE', since(t, 'seven2') + .1, null, GOLD, 44); tag(ctx, 'an estimate — Canuto et al., Science 2018', 640, 670, since(t, 'seven2') + .3, 20); }
    vig(ctx);
  }

  // ---------- d7: an extrapolation, not a headcount — it has critics — but the direction is clear ----------
  function d7(ctx, lt, dur, t) {
    deskBg(ctx, t);
    // a census clipboard (crossed out)
    { const k = pop(lt + .1); ctx.save(); ctx.translate(300, 380); ctx.scale(k, k); shape(ctx, '#8a5a34', 4, rect(-140, -180, 280, 360, 10)); shape(ctx, '#fbf6ea', 3, rect(-118, -150, 236, 310, 4)); shape(ctx, '#bcbcc4', 3, rect(-40, -196, 80, 30, 6)); for (let i = 0; i < 7; i++) { txt(ctx, 'IIII', -60, -110 + i * 38, FX.FONT(800, 22), '#3a3a3a'); line(ctx, [[-90, -110 + i * 38], [-30, -116 + i * 38]], 3, '#3a3a3a'); } txt(ctx, 'HEADCOUNT', 40, -120, FX.DISPLAY(20)); ctx.restore(); }
    if (since(t, 'not2') > 0) FX.stamp(ctx, 'NOT A HEADCOUNT', 300, 380, since(t, 'not2'), { color: '#c8322a', size: 34 });
    if (since(t, 'critics') > 0) { const b = (x, y, s, k) => { if (k <= 0) return; const e = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); shape(ctx, '#fff', 3.5, c => { c.roundRect(-90, -30, 180, 56, 20); c.moveTo(-10, 26); c.lineTo(-30, 54); c.lineTo(14, 26); }); txt(ctx, s, 0, -2, FX.DISPLAY(22)); ctx.restore(); }; b(760, 220, 'TOO HIGH?', since(t, 'critics')); b(1040, 300, 'TOO LOW?', since(t, 'critics') - .25); tag(ctx, 'IT HAS CRITICS', 900, 400, since(t, 'critics'), 22); }
    if (since(t, 'direction') > -.2) { const k = clamp((since(t, 'direction') + .2) / .6); line(ctx, [[760, 640], [lerp(760, 1120, k), lerp(640, 480, k)]], 14, '#2f7a46'); if (k >= 1) shape(ctx, '#2f7a46', 0, poly([[1120, 480], [1080, 476], [1104, 512]])); tag(ctx, 'THE DIRECTION IS CLEAR', 940, 620, since(t, 'clear'), 24); }
    if (since(t, 'extrapolation') > 0) strip(ctx, "AN EXTRAPOLATION", 640, 70, since(t, 'extrapolation'), { px: 36 });
    vig(ctx);
  }

  // ---------- d8: not a few temples lost in the jungle — a crowded, engineered landscape ----------
  function d8(ctx, lt, dur, t) {
    ground(ctx, t, 2, 470);
    // left: the old picture (one temple, all jungle)
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 640, H); ctx.clip(); for (let i = 0; i < 12; i++) tree(ctx, 20 + i * 55, 700 - (i % 3) * 40, .9); temple(ctx, 320, 520, .5, { col: '#b8ab90', h: 240, w: 100 }); for (let i = 0; i < 10; i++) tree(ctx, (i * 71) % 640, 760, 1.1); ctx.restore();
    if (since(t, 'jungle') > 0) FX.stamp(ctx, 'THE OLD PICTURE', 320, 160, since(t, 'jungle'), { color: '#7a5a3a', size: 36 });
    // right: the real picture
    const rk = clamp((t - A.crowded + .4) / 1.0); ctx.save(); ctx.beginPath(); ctx.rect(640, 0, 640, H); ctx.clip();
    shape(ctx, '#8ab868', 0, rect(640, 470, 640, 300)); for (let r = 0; r < 4; r++) line(ctx, [[640, 520 + r * 30], [1280, 500 + r * 30]], 6, '#6a9a3a');
    line(ctx, [[660, 720], [1260, 540]], 22, '#e8dcc0'); temple(ctx, 980, 520, .5, { col: '#e0d4b8', paint: true, h: 240, w: 100 }); palace(ctx, 1160, 520, .4, { paint: true });
    for (let i = 0; i < 14; i++) { const k = clamp(rk * 14 - i); if (k <= 0) continue; hut(ctx, 680 + (i * 83) % 580, 560 + (i * 47) % 180, .7 * k); }
    for (let i = 0; i < 8; i++) villager(ctx, 700 + i * 70, 740 + (i % 2) * 14, .3, t, i, { still: false });
    ctx.restore(); line(ctx, [[640, 0], [640, H]], 6, '#fbf6ea');
    if (since(t, 'crowded') > 0) strip(ctx, 'A CROWDED, ENGINEERED LANDSCAPE', 960, 120, since(t, 'crowded'), { px: 28, color: '#2f7a46' });
    vig(ctx);
  }

  // ---------- d9: millions living off corn — and corn lives off rain. Remember that. ----------
  function d9(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f4e6c4'], [1, '#e8cc98']]), 0, rect(0, 0, W, H));
    const p = clamp(lt / .6), c = since(t, 'court') + .2, r = since(t, 'rain') + .2;
    for (let i = 0; i < 9; i++) villager(ctx, 120 + (i % 3) * 70, 640 - Math.floor(i / 3) * 70, .32, t, i, { still: true });
    tag(ctx, 'MILLIONS OF PEOPLE', 190, 300, p, 22);
    if (c > 0) { const k = clamp(c / .5); line(ctx, [[340, 470], [lerp(340, 500, k), 470]], 10, '#3a2a1a'); if (k >= 1) shape(ctx, '#3a2a1a', 0, poly([[500, 456], [524, 470], [500, 484]])); cornIcon(ctx, 640, 470, 1.6 * pop(c)); tag(ctx, 'LIVE OFF CORN', 640, 620, c, 22); }
    const fade = clamp((since(t, 'matter') + .2) / 1.4); if (r > 0) { const k = clamp(r / .5); line(ctx, [[780, 470], [lerp(780, 920, k), 470]], 10, '#3a2a1a'); if (k >= 1) shape(ctx, '#3a2a1a', 0, poly([[920, 456], [944, 470], [920, 484]])); cloudRain(ctx, 1080, 430, pop(r), t, 1 - fade * .75 + Math.sin(t * 20) * .1 * fade); tag(ctx, 'CORN LIVES OFF RAIN', 1080, 620, r, 22); }
    if (since(t, 'remember') > 0) FX.stamp(ctx, 'REMEMBER THIS', 640, 150, since(t, 'remember'), { color: '#c8322a', size: 48 });
    if (since(t, 'matter') > 0) tag(ctx, "IT'S ABOUT TO MATTER MORE THAN ANYTHING", 640, 250, since(t, 'matter'), 24);
    vig(ctx);
  }

  const cut = [[0, d1], [A.how - .1, d2], [A.then - .1, d3], [A.the2 - .1, d4], [A.they - .1, d5], [A.when - .1, d6], [A.thats - .1, d7], [A.this2 - .1, d8], [A.millions - .1, d9]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.zoom, type: 'whoosh', gain: .4 }, { t: A.seven, type: 'click', gain: .4 }, { t: A.not, type: 'thud', gain: .5 }, { t: A.ceremonial, type: 'click', gain: .3 }, { t: A.villages, type: 'click', gain: .3 },
    { t: A.sixteen, type: 'click', gain: .4 }, { t: A.flew - .3, type: 'wind', gain: .4 }, { t: A.eight, type: 'thud', gain: .4 }, { t: A.leaves, type: 'swell', gain: .3 }, { t: A.strips, type: 'whoosh', gain: .5 },
    { t: A.counted, type: 'ratchet', gain: .4 }, { t: A.houses, type: 'click', gain: .4 }, { t: A.palaces, type: 'click', gain: .4 }, { t: A.roads, type: 'click', gain: .4 }, { t: A.terraces, type: 'click', gain: .4 }, { t: A.walls, type: 'click', gain: .4 },
    { t: A.marcelo, type: 'paper', gain: .4 }, { t: A.indiana, type: 'slide', gain: .4 }, { t: A.seven2, type: 'thud', gain: .7 }, { t: A.not2, type: 'thud', gain: .5 }, { t: A.critics, type: 'paper', gain: .4 }, { t: A.clear, type: 'swell', gain: .4 },
    { t: A.crowded, type: 'swell', gain: .4 }, { t: A.court, type: 'click', gain: .4 }, { t: A.rain, type: 'splash', gain: .4 }, { t: A.remember, type: 'thud', gain: .6 }, { t: A.matter, type: 'boom', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.then - .2, mood: 'mystery' }, { t: A.they - .2, mood: 'under' }, { t: A.millions - .2, mood: 'still' }, { t: A.remember - .2, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-peak.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
