/* The Maya — Beat 4b "The king who lost his head" (narration-rabbit.mp3 = 1.8 s chapter pause + narration-full.mp3 389.9–467.75 s + 1.2 s tail).
 * Anchors = full-recording word times − 388.1. Copán's 18 Rabbit, his stelae, the ballcourt, 113 days, Quiriguá. No gore: the headdress falls, the throne empties. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { hundreds: 391.04, copan: 392.27, honduras: 393.92, southern: 394.97, your: 397.53, king: 397.78, gloves: 402.63, rabbit: 404.84, eighteen: 406.0, years: 408.18, towering: 410.32, themself: 411.94, years2: 412.9, installation: 415.04, equity: 416.73, coupons: 419.05, named: 420.67, in1: 423.24, dedicates: 426.01, court: 428.41, masterpiece: 429.57, a1: 431.29, hundred: 431.33, later: 432.56, dead: 433.62, captured: 434.56, man: 437.06, the2: 439.43, celebrated: 440.76, small: 443.31, salt: 444.47, some: 445.8, collect: 447.41, back: 448.94, possible: 450.64, incomplete: 453.15, fact: 455.2, what2: 456.22, built: 458.67, alliance: 460.61, flip: 461.15, vassal: 462.29, threat: 462.96, portrait: 464.7, short: 466.8, margin: 467.11 };
  const A = {}; for (const k in F) A[k] = F[k] - 388.1; A.end = 80.85;
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
  const imgFrame = (ctx, key, x, y, w, h, k, label) => { const im = T.IMG[key]; if (im) N.frame(ctx, im, x, y, w, h, k, label); };
  // 18 Rabbit: blue cape, red plumes; K'ak' Tiliw: green cape, yellow plumes
  const RABBIT = { cape: '#2f4a8a', plume: '#c8322a', skin: '#a8704a', v: 2 }, KAK = { cape: '#2f7a46', plume: '#e8a83a', skin: '#8a5a34', v: 5 };
  function headdress(ctx, x, y, s, rot, col) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); for (let i = 0; i < 9; i++) { ctx.save(); ctx.rotate(-1.1 + i * .275); shape(ctx, i % 2 ? col : mix(col, '#ffffff', .2), 2.5, ellipse(0, -70, 13, 70)); ctx.restore(); } shape(ctx, '#c8a040', 3, c => { c.moveTo(-34, 4); c.quadraticCurveTo(0, -28, 34, 4); c.lineTo(30, 12); c.lineTo(-30, 12); c.closePath(); }); shape(ctx, '#2fa06a', 2.5, circle(0, -8, 9)); ctx.restore(); }

  // ---------- b1: jump ahead to the 700s — Copán, in western Honduras ----------
  function b1(ctx, lt, dur, t) {
    const [fx, fy] = MP(M.SITES.copan), zk = ease.inOut(clamp((t - A.copan + .3) / 2.0));
    ctx.save(); T.cam(ctx, lerp(1.0, 2.1, zk), lerp(640, fx, zk), lerp(360, fy - 40, zk)); mayaMap(ctx, t);
    site(ctx, 'tikal', .6, 'TIKAL', { r: 7, px: 13, col: '#9a8a7a' }); site(ctx, 'copan', since(t, 'copan') + .1, 'COPÁN', { r: 11, px: 22 });
    ctx.restore();
    counter(ctx, 160, 110, since(t, 'hundreds') > 0 ? 'AD 700s' : 'AD 378', lt + .1, null, GOLD, 34);
    if (since(t, 'honduras') > 0) tag(ctx, 'WESTERN HONDURAS', 640, 120, since(t, 'honduras'), 26);
    if (since(t, 'southern') > 0) tag(ctx, 'ON THE SOUTHEASTERN EDGE OF THE MAYA WORLD', 640, 640, since(t, 'southern'), 24);
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 4 · THE ESCALATION', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE KING WHO LOST HIS HEAD', 640, 350, lt - .35, { px: 56, color: '#c8322a', rot: .02 }); tag(ctx, 'AD 738', 640, 440, lt - .7, 26); ctx.restore(); }
    vig(ctx);
  }

  // ---------- b2: your king is Waxaklajuun Ub'aah K'awiil — nicknamed "18 Rabbit" ----------
  function copanPlaza(ctx, t, tod = 1.9) { ground(ctx, t, tod, 470); shape(ctx, '#d8d0bc', 4, poly([[-200, 620], [-80, 520], [1360, 520], [1480, 620]]));
    temple(ctx, 1060, 525, .6, { col: '#d8cdb4', h: 240, w: 120, paint: true }); palace(ctx, 240, 525, .6, { paint: true }); for (let i = 0; i < 5; i++) stelaSmall(ctx, 360 + i * 140, 560 + (i % 2) * 10, 1.0); }
  function b2(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 420); copanPlaza(ctx, t);
    king(ctx, 640, 760, .8, t, Object.assign({ staff: true }, RABBIT));
    ctx.restore();
    FX.dateTag(ctx, 'COPÁN · AD 700s');
    if (since(t, 'king') > -.2) { const k = pop(since(t, 'king') + .2); ctx.save(); ctx.translate(330, 190); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-256, -66, 520, 150)); shape(ctx, '#fbf6ea', 4, rect(-260, -70, 520, 150, 6));
      txt(ctx, "WAXAKLAJUUN UB'AAH K'AWIIL", 0, -24, FX.DISPLAY(28), '#2f4a8a'); txt(ctx, 'wah-shahk-lah-HOON oo-BAH kah-WEEL', 0, 18, FX.FONT(700, 18), '#6a5a4a'); txt(ctx, 'king of Copán · r. 695–738', 0, 50, FX.FONT(800, 17), '#3a2a1a'); ctx.restore(); }
    // the scholar's notebook: the glyph, then the nickname
    if (since(t, 'gloves') > -.4) { const k = pop(since(t, 'gloves') + .4); ctx.save(); ctx.translate(1000, 260); ctx.rotate(.04); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-156, -126, 320, 260)); shape(ctx, '#f8f2d8', 4, rect(-160, -130, 320, 260, 6)); for (let i = 0; i < 7; i++) line(ctx, [[-140, -90 + i * 32], [140, -90 + i * 32]], 1.5, 'rgba(90,120,160,.3)');
      shape(ctx, '#d8cdb4', 3, rect(-110, -100, 110, 100, 18)); for (let b = 0; b < 3; b++) shape(ctx, '#3a2e24', 0, rect(-100, -30 - b * 14, 90, 9, 4)); shape(ctx, '#3a2e24', 0, circle(-55, -84, 6)); // bar-dot 18 = 3 bars + 3 dots
      for (let d = 0; d < 3; d++) shape(ctx, '#3a2e24', 0, circle(-80 + d * 25, -84 + 0, 5));
      ctx.save(); ctx.translate(60, -50); shape(ctx, '#d8cdb4', 3, ellipse(0, 10, 40, 26)); shape(ctx, '#d8cdb4', 3, ellipse(-8, -30, 9, 26, -.2)); shape(ctx, '#d8cdb4', 3, ellipse(10, -30, 9, 26, .2)); shape(ctx, INK, 0, circle(-10, 4, 4)); ctx.restore(); // rabbit glyph
      if (since(t, 'rabbit') > 0) { txt(ctx, '18', -55, 40, FX.DISPLAY(44), '#c8322a'); txt(ctx, 'RABBIT', 60, 40, FX.DISPLAY(32), '#c8322a'); line(ctx, [[-40, 90], [120, 90]], 4, '#c8322a'); txt(ctx, '?', 140, -96, FX.DISPLAY(40), '#c8322a'); }
      ctx.restore(); }
    if (since(t, 'rabbit') > 0) strip(ctx, '"18 RABBIT"', 1000, 480, since(t, 'rabbit'), { px: 44, color: '#c8322a' });
    vig(ctx);
  }

  // ---------- b3: he ruled for more than forty years and filled the city with towering stone portraits of himself ----------
  const STELAE = [['stD', 'STELA D'], ['stC', 'STELA C'], ['stH', 'STELA H'], ['stF', 'STELA F'], ['stB', 'STELA B']];
  function b3(ctx, lt, dur, t) {
    copanPlaza(ctx, t, 2); shape(ctx, 'rgba(255,250,235,.35)', 0, rect(0, 0, W, H));
    for (let i = 0; i < 5; i++) { const k = clamp((lt - .1 - i * .35) / .5); imgFrame(ctx, STELAE[i][0], 160 + i * 240, 380, 150, 290, k, STELAE[i][1]); }
    counter(ctx, 640, 110, '40+ YEARS ON THE THRONE', since(t, 'years') + .2, null, GOLD, 36);
    if (since(t, 'themself') > 0) tag(ctx, 'ALL OF THEM: 18 RABBIT', 640, 650, since(t, 'themself'), 26);
    vig(ctx);
  }

  // ---------- b4: years earlier he installed a new ruler in Quiriguá, a smaller town under Copán's thumb — K'ak' Tiliw Chan Yopaat ----------
  function b4(ctx, lt, dur, t) {
    ground(ctx, t, 1.8, 470); shape(ctx, '#d8d0bc', 4, poly([[-200, 640], [-80, 540], [1360, 540], [1480, 640]]));
    temple(ctx, 300, 545, .45, { col: '#d8cdb4', h: 200, w: 100 }); for (let i = 0; i < 4; i++) { const x = 820 + i * 120; shape(ctx, '#e8dcc0', 3, rect(x - 40, 480, 80, 60, 14)); shape(ctx, '#c8a050', 3, c => { c.moveTo(x - 54, 494); c.quadraticCurveTo(x, 420, x + 54, 494); c.closePath(); }); }
    for (let i = 0; i < 7; i++) villager(ctx, 80 + i * 175, 560, .3, t, i, { still: true });
    // the crowning: 18 Rabbit places the headdress on the new lord
    const ck = clamp((t - A.installation + .2) / 1.6);
    king(ctx, 470, 760, .82, t, Object.assign({ reach: true }, RABBIT));
    villager(ctx, 760, 760, .74, t, 5, { still: true, coat: '#f0e6cc', skin: KAK.skin, pants: KAK.skin });
    headdress(ctx, lerp(560, 760, ease.inOut(ck)), lerp(400, 760 - .74 * 340, ease.inOut(ck)), .5, 0, KAK.plume);
    FX.dateTag(ctx, 'QUIRIGUÁ · AD 724');
    if (since(t, 'equity') > 0) strip(ctx, 'QUIRIGUÁ', 1000, 120, since(t, 'equity'), { px: 44 });
    if (since(t, 'coupons') > 0) { const k = pop(since(t, 'coupons')); ctx.save(); ctx.translate(1090, 270); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-120, -50, 250, 110)); shape(ctx, '#fbf6ea', 3.5, rect(-124, -54, 248, 108, 8)); shape(ctx, '#e8b890', 3.5, c => { c.roundRect(-50, -60, 50, 80, 22); }); shape(ctx, '#d8a07a', 2.5, ellipse(-25, -46, 16, 12)); txt(ctx, "UNDER COPÁN'S", 50, -12, FX.FONT(800, 17)); txt(ctx, 'THUMB', 50, 16, FX.DISPLAY(26), '#c8322a'); ctx.restore(); }
    if (since(t, 'named') > -.2) { const k = pop(since(t, 'named') + .2); ctx.save(); ctx.translate(760, 210); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-226, -56, 460, 120)); shape(ctx, '#fbf6ea', 4, rect(-230, -60, 460, 120, 6)); txt(ctx, "K'AK' TILIW CHAN YOPAAT", 0, -18, FX.DISPLAY(28), '#2f7a46'); txt(ctx, 'KAHK tee-LEEW chahn yoh-PAHT', 0, 22, FX.FONT(700, 18), '#6a5a4a'); ctx.restore(); }
    vig(ctx);
  }

  // ---------- b5: January 738 — 18 Rabbit dedicates the final version of his grand ballcourt. His masterpiece ----------
  function b5(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 400);
    shape(ctx, '#7aa858', 0, rect(-600, -400, 2600, 1500)); for (let i = 0; i < 50; i++) shape(ctx, i % 2 ? '#6a9848' : '#8ab868', 0, ellipse((i * 173) % 1500 - 100, (i * 97) % 760, 60, 34, i));
    // the ballcourt from above: an I-shaped alley between two long buildings with sloped benches
    shape(ctx, '#e8dcc0', 5, poly([[340, 80], [940, 80], [940, 200], [780, 200], [780, 520], [940, 520], [940, 640], [340, 640], [340, 520], [500, 520], [500, 200], [340, 200]]));
    for (const d of [-1, 1]) { const x = 640 + d * 190; shape(ctx, '#c8b898', 4, rect(x - 70, 200, 140, 320, 6)); shape(ctx, '#d8c8a8', 3, rect(x - 70 + (d < 0 ? 100 : 0), 200, 40, 320)); shape(ctx, '#b84a3a', 3, rect(x - 50, 250, 100, 220, 8)); for (let j = 0; j < 3; j++) { const y = 260 + j * 100; ctx.save(); ctx.translate(x + d * -54, y + 30); ctx.scale(-d, 1); shape(ctx, '#e8423a', 3, ellipse(0, 0, 16, 12)); shape(ctx, '#3a8ad8', 2, poly([[-14, -6], [-26, 0], [-14, 6]])); shape(ctx, '#f6c945', 2, circle(6, -3, 4)); ctx.restore(); } } // macaw-head markers
    for (let j = 0; j < 3; j++) { shape(ctx, '#bcae90', 3, circle(640, 250 + j * 110, 22)); shape(ctx, '#8a7c62', 0, circle(640, 250 + j * 110, 10)); } // floor markers
    const dk = clamp((t - A.dedicates + .3) / 1.0); if (dk > 0) { for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; ctx.save(); ctx.globalAlpha = dk * (.6 + .4 * Math.sin(t * 3 + i)); shape(ctx, ['#f6c945', '#e8423a', '#3a8ad8'][i % 3], 0, circle(640 + Math.cos(a) * 340 * dk, 360 + Math.sin(a) * 300 * dk, 7)); ctx.restore(); } }
    for (let i = 0; i < 12; i++) { const x = i < 6 ? 380 + i * 18 : 830 + (i - 6) * 18, y = 120 + (i % 3) * 20; shape(ctx, CL[i % 4], 2.5, circle(x, y, 9)); shape(ctx, '#1d1a17', 0, circle(x, y - 3, 6)); }
    ctx.restore();
    FX.dateTag(ctx, 'COPÁN · JANUARY 738'); if (since(t, 'court') > 0) tag(ctx, 'THE GRAND BALLCOURT', 640, 690, since(t, 'court'), 24);
    if (since(t, 'masterpiece') > 0) strip(ctx, 'HIS MASTERPIECE', 1060, 120, since(t, 'masterpiece'), { px: 40, color: '#c8322a', rot: .03 });
    txt(ctx, 'TOP VIEW', 1240, 700, FX.FONT(800, 16), 'rgba(30,40,20,.7)', 'right'); vig(ctx);
  }

  // ---------- b6: 113 days later he's dead — captured and beheaded at Quiriguá, by the man he'd helped put in power ----------
  function b6(ctx, lt, dur, t) {
    const dk = clamp((t - A.hundred + .1) / 1.4), day = Math.max(1, Math.round(113 * ease.out(dk))), gone = clamp((since(t, 'dead') + .1) / 1.2);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, mix('#c88a5a', '#4a3a4a', gone)], [1, mix('#8a5a3a', '#2a2030', gone)]]), 0, rect(0, 0, W, H));
    // the throne: 18 Rabbit, then only his headdress falling to the step
    shape(ctx, '#6a3a2a', 4, rect(380, 520, 360, 120, 8)); shape(ctx, '#c8a040', 3, rect(380, 520, 360, 16));
    if (gone < 1) { ctx.save(); ctx.globalAlpha = 1 - gone; king(ctx, 560, 600, .55, t, RABBIT); ctx.restore(); }
    if (gone > 0) { const f = ease.in(clamp(gone * 1.3)); headdress(ctx, lerp(560, 640, f), lerp(600 - .55 * 340, 610, f), .32, f * 1.2, RABBIT.plume); }
    // calendar pages
    ctx.save(); ctx.translate(1040, 240); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-96, -96, 200, 200)); shape(ctx, '#fbf6ea', 4, rect(-100, -100, 200, 200, 8)); shape(ctx, '#c8322a', 0, rect(-100, -100, 200, 40, 8)); txt(ctx, 'DAY', 0, -80, FX.DISPLAY(24), '#fff'); txt(ctx, String(day), 0, 20, FX.DISPLAY(72)); ctx.restore();
    if (since(t, 'later') > 0) tag(ctx, '113 DAYS LATER', 1040, 380, since(t, 'later'), 24);
    if (since(t, 'captured') > 0) FX.stamp(ctx, 'CAPTURED', 330, 160, since(t, 'captured'), { color: '#e8322a', size: 46 });
    if (since(t, 'man') > 0) { ctx.save(); ctx.fillStyle = 'rgba(15,12,20,.6)'; ctx.fillRect(0, 610, W, 110); ctx.restore(); txt(ctx, 'BEHEADED AT QUIRIGUÁ —', 640, 640, FX.DISPLAY(32), '#fff'); txt(ctx, 'BY THE MAN HE HAD PUT IN POWER', 640, 686, FX.DISPLAY(34), GOLD); }
    vig(ctx, .6);
  }

  // ---------- b7: Quiriguá's inscriptions celebrate it for decades — how did a small town pull this off? ----------
  function b7(ctx, lt, dur, t) {
    deskBg(ctx, t);
    imgFrame(ctx, 'zooG', 400, 330, 480, 344, lt + .1, 'QUIRIGUÁ · ZOOMORPH G');
    if (since(t, 'celebrated') > 0) tag(ctx, 'CELEBRATED FOR DECADES', 400, 610, since(t, 'celebrated'), 24);
    // small vs big
    const k = since(t, 'small') + .2; if (k > 0) { const s = pop(k); ctx.save(); ctx.translate(960, 420); ctx.scale(s, s); temple(ctx, -90, 120, .62, { col: '#d8cdb4', h: 260, w: 120 }); txt(ctx, 'COPÁN', -90, 160, FX.DISPLAY(26), '#2f4a8a'); temple(ctx, 120, 120, .25, { col: '#d8cdb4', h: 200, w: 100 }); txt(ctx, 'QUIRIGUÁ', 120, 160, FX.DISPLAY(22), '#2f7a46'); ctx.restore(); }
    if (since(t, 'salt') > 0) strip(ctx, 'HOW?', 960, 150, since(t, 'salt'), { px: 54, color: '#c8322a' });
    vig(ctx);
  }

  // ---------- b8: some scholars think the superpower Calakmul was quietly backing Quiriguá — possible, but not confirmed ----------
  function b8(ctx, lt, dur, t) {
    const [qx, qy] = MP(M.SITES.quirigua), [cx, cy] = MP(M.SITES.calakmul);
    ctx.save(); T.cam(ctx, 1.35, 640, 400); mayaMap(ctx, t);
    site(ctx, 'copan', lt + .2, 'COPÁN', { r: 9, px: 16, left: true, col: '#2f4a8a' }); site(ctx, 'quirigua', lt + .3, 'QUIRIGUÁ', { r: 7, px: 15, col: '#2f7a46' });
    const ck = since(t, 'collect') + .2; if (ck > 0) { site(ctx, 'calakmul', ck, 'CALAKMUL', { r: 14, px: 22, col: '#c8322a' }); const lk = clamp((since(t, 'back') + .3) / 1.0); ctx.save(); ctx.setLineDash([10, 9]); ctx.globalAlpha = .8; line(ctx, [[cx, cy], [lerp(cx, qx, lk), lerp(cy, qy, lk)]], 6, '#c8322a'); ctx.restore(); }
    ctx.restore();
    if (since(t, 'collect') > 0) tag(ctx, 'THE SUPERPOWER', 900, 110, since(t, 'collect'), 24);
    if (since(t, 'possible') > 0) { const k = pop(since(t, 'possible')); ctx.save(); ctx.translate(250, 450); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-156, -106, 320, 220)); shape(ctx, '#fbf6ea', 4, rect(-160, -110, 320, 220, 8));
      const pc = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0]], miss = since(t, 'incomplete') > -.3 ? [1, 5] : []; for (let i = 0; i < 6; i++) { if (miss.includes(i)) { ctx.save(); ctx.setLineDash([6, 6]); ctx.lineWidth = 3; ctx.strokeStyle = '#9a8a7a'; ctx.strokeRect(pc[i][0] * 80 - 36, pc[i][1] * 70 - 6, 72, 62); ctx.restore(); continue; } shape(ctx, ['#e8a83a', '#3a8ad8', '#2f7a46'][i % 3], 3, rect(pc[i][0] * 80 - 36, pc[i][1] * 70 - 6, 72, 62, 6)); }
      txt(ctx, since(t, 'incomplete') > 0 ? 'INCOMPLETE EVIDENCE' : 'POSSIBLE…', 0, 84, FX.DISPLAY(20), '#3a2a1a'); ctx.restore(); }
    if (since(t, 'fact') > -.2) { ctx.save(); ctx.translate(640, 650); const s = pop(since(t, 'fact') + .2); ctx.scale(s, s); shape(ctx, '#1d1a17', 0, rect(-230, -32, 460, 64, 10)); txt(ctx, "CALAKMUL'S ROLE — DEBATED", 0, 2, FX.DISPLAY(28), GOLD); ctx.restore(); }
    vig(ctx);
  }

  // ---------- b9: the world the kings built — every alliance could flip, every vassal was a threat, your portrait could outlive you by a very short margin ----------
  function b9(ctx, lt, dur, t) {
    ground(ctx, t, 1.75, 470); shape(ctx, '#d8d0bc', 4, rect(-100, 560, 1500, 200));
    // alliances that flip: rope links between pennants snapping and re-tying
    const P = [[180, 220, '#2f4a8a', 'TIKAL'], [420, 160, '#c8322a', 'CALAKMUL'], [180, 420, '#2f7a46', 'QUIRIGUÁ'], [420, 400, '#7a4a8a', 'NARANJO']];
    const fl = since(t, 'flip') > 0 ? Math.floor((t - A.flip) * 2.2) % 3 : 0, links = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]][fl];
    { for (const [a, b] of links) line(ctx, [[P[a][0], P[a][1]], [P[b][0], P[b][1]]], 6, '#c8a040'); for (const [x, y, col, nm] of P) { line(ctx, [[x, y - 30], [x, y + 60]], 6, '#6a4a2a'); shape(ctx, col, 3.5, poly([[x + 2, y - 30], [x + 120, y - 6], [x + 2, y + 18]])); txt(ctx, nm, x + 48, y - 6, FX.DISPLAY(nm.length > 7 ? 13 : 16), '#fff'); }
      tag(ctx, 'EVERY ALLIANCE COULD FLIP', 300, 520, since(t, 'flip') + .1, 22); }
    // the vassal with a dagger behind his back
    if (since(t, 'vassal') > -.2) { villager(ctx, 700, 700, .62, t, 5, { still: true, coat: '#f0e6cc', skin: KAK.skin, pants: KAK.skin }); line(ctx, [[700 - 46, 700 - 100], [700 - 80, 700 - 70]], 8, '#9a9aa8'); tag(ctx, 'EVERY VASSAL A THREAT', 700, 340, since(t, 'threat') + .1, 22); }
    // the stela that outlived its king by a very short margin
    imgFrame(ctx, 'stD', 1080, 330, 150, 290, since(t, 'portrait') + .1, 'STELA D · AD 736');
    if (since(t, 'short') > -.2) { counter(ctx, 1080, 560, 'KING DIED 738', since(t, 'short') + .2, null, '#ff8a7a', 26); tag(ctx, '≈ 2 YEARS LATER', 1080, 640, since(t, 'margin'), 22); }
    if (lt < .3 || since(t, 'built') > -1) strip(ctx, 'THE WORLD THE KINGS HAD BUILT', 640, 70, Math.max(lt, since(t, 'built') + .4), { px: 34 });
    vig(ctx);
  }

  const cut = [[0, b1], [A.your - .1, b2], [A.eighteen - .1, b3], [A.years2 - .1, b4], [A.in1 - .1, b5], [A.a1 - .1, b6], [A.the2 - .1, b7], [A.some - .1, b8], [A.what2 - .1, b9]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.copan, type: 'click', gain: .4 }, { t: A.king, type: 'paper', gain: .4 }, { t: A.gloves, type: 'scratch', gain: .3 }, { t: A.rabbit, type: 'thud', gain: .5 },
    { t: A.towering, type: 'thud', gain: .4 }, { t: A.towering + .3, type: 'thud', gain: .35 }, { t: A.towering + .6, type: 'thud', gain: .35 }, { t: A.towering + .9, type: 'thud', gain: .35 }, { t: A.towering + 1.2, type: 'thud', gain: .35 },
    { t: A.equity, type: 'click', gain: .4 }, { t: A.installation + 1.4, type: 'swell', gain: .4 }, { t: A.named, type: 'paper', gain: .4 }, { t: A.dedicates, type: 'swell', gain: .5 }, { t: A.masterpiece, type: 'thud', gain: .5 },
    { t: A.hundred, type: 'ratchet', gain: .4 }, { t: A.dead, type: 'boom', gain: .6 }, { t: A.captured, type: 'thud', gain: .6 }, { t: A.dead + .9, type: 'clang', gain: .25 },
    { t: A.celebrated, type: 'paper', gain: .4 }, { t: A.salt, type: 'thud', gain: .4 }, { t: A.collect, type: 'click', gain: .4 }, { t: A.incomplete, type: 'paper', gain: .4 }, { t: A.fact, type: 'thud', gain: .5 },
    { t: A.flip, type: 'whoosh', gain: .4 }, { t: A.threat, type: 'scratch', gain: .4 }, { t: A.portrait, type: 'paper', gain: .4 }, { t: A.margin, type: 'thud', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'tense' }, { t: A.eighteen - .2, mood: 'under' }, { t: A.a1 - .3, mood: 'silence' }, { t: A.the2 - .3, mood: 'mystery' }, { t: A.what2 - .2, mood: 'tense' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-rabbit.mp3', shots, sfx, moods,
    images: { stB: 'assets/img/copan-stela-b.jpg', stC: 'assets/img/copan-stela-c.jpg', stD: 'assets/img/copan-stela-d.jpg', stF: 'assets/img/copan-stela-f.jpg', stH: 'assets/img/copan-stela-h.jpg', zooG: 'assets/img/quirigua-zoomorph-g.jpg' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
