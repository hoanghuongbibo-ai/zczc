/* Venice — "The filter" (narration-filter.mp3 = 2.0 s chapter pause + narration-full.mp3 464.6–537.0 s).
 * Anchors = full-recording word times − 462.6. Music returns, lower; plague and Ghetto beats stay respectful (no gags). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { highway: 464.84, onit: 466.58, y1348: 467.45, ships: 468.72, plague: 469.44, third: 471.93, people: 472.6, more: 473.78, disease: 474.82, back: 475.94, generations: 476.35,
    oldjob: 479.49, direction: 480.99, seventy: 482.09, outbreak: 484.05, island: 485.83, hospital: 488.2, second: 489.92, arriving: 491.37, shipsw: 491.73, crews: 492.28, cargo: 493.1,
    wait: 493.91, letin: 494.77, forty: 495.73, days: 496.25, italian: 497.33, giorni: 498.84, quarantine: 500.64, offshore: 503.99, adriatic: 505.75, dubrovnik: 507.94,
    machinery: 509.99, inward: 512.77, y1516: 513.9, senate: 515.11, jewish: 516.32, small: 518.16, island2: 518.66, foundry: 520.6, gates: 521.85, locked: 522.36, night: 523.16,
    guards: 524.35, pay: 525.65, themselves: 526.18, venetianword: 527.52, geto: 529.54, scholars: 530.52, ghetto: 532.33, gatestay: 534.13, years: 536.49 };
  const A = {}; for (const k in F) A[k] = F[k] - 462.6; A.end = 75.9;
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
  function blueprintBg(ctx, col = '#2f7ac0') { shape(ctx, col, 0, rect(-400, -400, 2100, 1600));
    ctx.save(); ctx.globalAlpha = .22; for (let x = -400; x < 1700; x += 40) line(ctx, [[x, -400], [x, 1200]], x % 200 ? 1 : 2.5, '#fff'); for (let y = -400; y < 1200; y += 40) line(ctx, [[-400, y], [1700, y]], y % 200 ? 1 : 2.5, '#fff'); ctx.restore(); }
  const still = (ctx, lt, dur, z0 = 1, z1 = 1.05, fx = 640, fy = 380) => cam(ctx, lerp(z0, z1, ease.sine(clamp(lt / dur))), fx, fy);
  function card(ctx, lines, x, y, k, w = 360) { if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(x + 300, x, e), y); ctx.rotate(.02);
    const h = 30 + lines.length * 34; ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); shape(ctx, PAPER, 3.5, rect(-w / 2, -h / 2, w, h, 3)); lines.forEach(([s, f, c], i) => txt(ctx, s, 0, -h / 2 + 32 + i * 34, f, c || INK)); ctx.restore(); }
  function rat(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const st = Math.sin(t * 14) * 4;
    shape(ctx, '#4a4440', 3, ellipse(0, -10, 26, 12)); shape(ctx, '#4a4440', 3, ellipse(24, -14, 12, 9)); shape(ctx, '#6a6460', 2, circle(20, -24, 5)); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(30, -16, 2, 0, 7); ctx.fill();
    line(ctx, [[-24, -10], [-50, -4 + st], [-64, -14]], 3, '#6a6460'); for (const lx of [-12, 12]) line(ctx, [[lx, 0], [lx + st, 6]], 3, '#4a4440'); ctx.restore(); }
  function lazaretto(ctx, x, y, s, kind, t) { // walled hospital island; kind 'old' (hospital + chapel) or 'new' (long airing warehouse)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#c8b890', 4.5, smooth([[-300, 20], [-260, -30], [0, -44], [260, -30], [300, 20], [200, 50], [-200, 50]]));
    shape(ctx, '#e8d0b0', 4.5, rect(-260, -120, 520, 110, 4)); for (let x0 = -250; x0 < 250; x0 += 40) shape(ctx, '#e8d0b0', 3, rect(x0, -134, 24, 16));
    if (kind === 'old') { shape(ctx, '#f0dcc0', 4, rect(-200, -200, 240, 90)); shape(ctx, '#b8503a', 4, poly([[-210, -200], [-80, -250], [50, -200]])); for (let i = 0; i < 5; i++) shape(ctx, '#5a6a7a', 3, rect(-186 + i * 46, -180, 22, 40, 10));
      shape(ctx, '#f0dcc0', 4, rect(100, -290, 50, 180)); shape(ctx, '#b8503a', 4, poly([[94, -290], [125, -330], [156, -290]])); line(ctx, [[125, -330], [125, -360]], 3); line(ctx, [[112, -350], [138, -350]], 3); }
    else { shape(ctx, '#e0c8a0', 4, rect(-230, -210, 460, 100)); shape(ctx, '#b8503a', 4, poly([[-240, -210], [0, -250], [240, -210]])); for (let i = 0; i < 9; i++) shape(ctx, '#7a5434', 3, rect(-210 + i * 50, -170, 26, 50, 4));
      for (let i = 0; i < 6; i++) { const bx = -200 + i * 80; shape(ctx, ['#d8402e', '#2f6aa8', '#e8c14a', '#c8a878'][i % 4], 3, rect(bx, -40, 50, 28, 6)); } }
    line(ctx, [[260, -120], [260, -200]], 4, '#5a4026'); shape(ctx, '#e8c14a', 3, poly([[260, -200], [300, -190], [260, -178]]));
    ctx.restore(); }

  // ---------- f1: chapter card — THE FILTER ----------
  function f1(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ab4cc'], [.65, '#d8e4dc'], [1, '#f0dcb0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [100, 150]);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420); farShore(ctx, 520, t); waterBand(ctx, 540, t);
    lazaretto(ctx, 1040, 560, .5, 'old', t); V.lagoon(ctx, 460, 700, 560, t, { look: [.6, -.3], eyes: blink(t, 1.3), mouth: null, hat: (c, x, y) => V.hats.captain(c, x, y) }); ctx.restore();
    strip(ctx, 'THE FILTER', 640, 130, lt - .05, { px: 64 });
    vig(ctx);
  }

  // ---------- f2: a highway carries whatever is on it ----------
  function f2(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    sky(ctx, t, '#a8cce0', '#f0e2c0'); farShore(ctx, 400, t); waterBand(ctx, 410, t, -600, 2200, '#4a98b0');
    const sc = (t * 90) % 160; for (let i = -2; i < 12; i++) shape(ctx, '#f4efe2', 0, poly([[i * 160 - sc, 470], [i * 160 + 80 - sc, 470], [i * 160 + 76 - sc, 478], [i * 160 + 4 - sc, 478]]));
    galley(ctx, 640, 520, .9, 4, t, { flag: RED, sailCol: '#f4e2c0' });
    for (let i = 0; i < 4; i++) shape(ctx, ['#c8a878', '#a8784a', '#d8b888', '#b89068'][i], 3.5, rect(520 + i * 56, 440, 50, 44, 4));
    // the mooring rope — and something small running along it
    line(ctx, [[820, 470], [1300, 380]], 4, '#c9a35a'); const k = clamp((t - A.onit + .6) / 1.2); rat(ctx, lerp(1240, 900, k), lerp(392, 456, k), .8, t);
    ctx.restore();
    strip(ctx, 'A HIGHWAY CARRIES WHATEVER IS ON IT', 640, 100, lt - .1, { px: 32 });
    vig(ctx);
  }

  // ---------- f3: 1348 — the ships bring plague ----------
  function f3(ctx, lt, dur, t) {
    const pl = since(t, 'plague');
    ctx.save(); still(ctx, lt, dur, 1, 1.06);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#b8b0a0'], [1, '#e8d8b8']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [80, 130], .7);
    for (let i = 0; i < 9; i++) { const x = -80 + i * 160, h = 180 + (i * 47) % 120; shape(ctx, ['#e0b090', '#e8d0a0', '#d0a080'][i % 3], 4, rect(x, 460 - h, 140, h)); shape(ctx, '#a8503a', 4, poly([[x - 6, 460 - h], [x + 70, 460 - h - 24], [x + 146, 460 - h]])); for (let k = 0; k < 3; k++) shape(ctx, '#5a6a7a', 3, rect(x + 24 + k * 36, 460 - h + 30, 20, 36, 8)); }
    shape(ctx, '#c8b8a0', 4, rect(-200, 460, 1700, 40)); waterBand(ctx, 500, t, -600, 2200, '#5a90a0');
    galley(ctx, 760, 560, .8, 4, t, { flag: '#5a5a5a', sailCol: '#d8d0c0' });
    // a sickly haze drifts from the ship into the city
    if (pl > -.4) for (let i = 0; i < 7; i++) { const k = clamp((pl + .4 - i * .12) / 2.4); ctx.save(); ctx.globalAlpha = .38 * Math.sin(Math.PI * Math.min(1, k * 1.2)); ctx.filter = 'blur(6px)'; shape(ctx, '#8a9a6a', 0, circle(lerp(760, 200 + i * 60, k), lerp(480, 340 - i * 10, k), 60 + k * 50)); ctx.restore(); }
    ctx.restore();
    if (since(t, 'y1348') > 0) { const s = pop(since(t, 'y1348')); ctx.save(); ctx.translate(1060, 130); ctx.scale(s, s); FX.bigText(ctx, '1348', 0, 0, 64, { color: '#e8e0d0' }); ctx.restore(); }
    FX.caption(ctx, 'THE SHIPS BRING PLAGUE', pl, .1);
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1348');
  }

  // ---------- f4: an estimated third of its people, possibly more ----------
  function f4(ctx, lt, dur, t) {
    const th = since(t, 'third'), mo = since(t, 'more');
    ctx.save(); still(ctx, lt, dur, 1, 1.05);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8a98b0'], [1, '#d8c8b0']]), 0, rect(-200, -200, 1700, 1100));
    // a street of houses at dusk: windows lit, then a third go dark
    for (let i = 0; i < 3; i++) { const x = 140 + i * 360; shape(ctx, ['#d8b090', '#e0c8a0', '#c8a080'][i], 5, rect(x, 140, 300, 420)); shape(ctx, '#9a4a3a', 5, poly([[x - 10, 140], [x + 150, 100], [x + 310, 140]]));
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const idx = (i * 9 + r * 3 + c), dark = th > 0 && (idx % 3 === 1) && (th - idx * .02) > 0, maybe = mo > 0 && idx === 8 + 9; const wx = x + 40 + c * 90, wy = 180 + r * 120;
        shape(ctx, dark || maybe ? '#3a3a4a' : '#ffd88a', 3.5, c2 => { c2.moveTo(wx, wy + 80); c2.lineTo(wx, wy + 24); c2.arc(wx + 24, wy + 24, 24, Math.PI, 0); c2.lineTo(wx + 48, wy + 80); c2.closePath(); }); if (!(dark || maybe)) glow(ctx, wx + 24, wy + 50, 50, 'rgba(255,210,130,.35)'); } }
    shape(ctx, '#a8987e', 0, rect(-200, 560, 1700, 300)); line(ctx, [[-200, 560], [1500, 560]], 4);
    // the sick carried through an empty street (silhouettes)
    const cx = 200 + lt * 40; for (const d of [0, 1]) fig(ctx, cx + d * 160, 650, .2, P('elder', 'tunicElder', { hands: { L: [d ? -200 : 160, -600], R: [d ? -140 : 220, -600] }, feet: { L: [-40 + Math.sin(t * 5 + d) * 40, -40], R: [40 - Math.sin(t * 5 + d) * 40, -40] } }), { tint: '#3a3436' });
    shape(ctx, '#3a3436', 0, rect(cx + 30, 650 - 600 * .2 - 6, 110, 14, 4));
    ctx.restore();
    if (th > 0) { const s = pop(th); ctx.save(); ctx.translate(1060, 640); ctx.scale(s, s); FX.bigText(ctx, '≈ ⅓', 0, 0, 70, { color: '#f0e6d4' }); ctx.restore(); tag(ctx, 'AN ESTIMATE — POSSIBLY MORE', 640, 660, mo + .3, 20); }
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1348');
  }

  // ---------- f5: the disease keeps coming back for generations (plague waves on a timeline) ----------
  function f5(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#f3e8cc', 4, rect(80, 170, 1120, 390, 6)); line(ctx, [[130, 480], [1150, 480]], 5);
    const X = yr => 150 + (yr - 1340) * 1000 / 300;
    for (let yr = 1350; yr <= 1640; yr += 50) { line(ctx, [[X(yr), 470], [X(yr), 490]], 3); txt(ctx, String(yr), X(yr), 514, FX.FONT(700, 18)); }
    const waves = [[1348, 250], [1400, 110], [1423, 90], [1478, 120], [1528, 100], [1576, 200], [1630, 230]];
    const k = ease.inOut(clamp((t - A.disease + .2) / 2.4));
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, X(1340 + 300 * k) + 2, H); ctx.clip();
    ctx.beginPath(); ctx.moveTo(X(1340), 480); for (let yr = 1340; yr <= 1640; yr += 1) { let h = 0; for (const [w, a] of waves) h += a * Math.exp(-Math.pow((yr - w) / 4, 2)); ctx.lineTo(X(yr), 480 - h); } ctx.lineTo(X(1640), 480); ctx.closePath();
    ctx.fillStyle = 'rgba(138,154,106,.55)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#5a6a3a'; ctx.stroke(); ctx.restore();
    for (const [w, a] of [[1348, 250], [1576, 200], [1630, 230]]) if (X(w) < X(1340 + 300 * k)) { txt(ctx, String(w), X(w), 480 - a - 26, FX.DISPLAY(22), '#5a3a22'); }
    ctx.restore();
    strip(ctx, 'IT KEEPS COMING BACK — FOR GENERATIONS', 640, 100, since(t, 'disease'), { px: 30 });
    vig(ctx);
    FX.dateTag(ctx, 'PLAGUE IN VENICE, 1348–1631');
  }

  // ---------- f6: the water's old job, pointed in a new direction ----------
  function f6(ctx, lt, dur, t) {
    const oj = since(t, 'oldjob'), dr = since(t, 'direction');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ab8d8'], [.65, '#d8e6e0'], [1, '#f0e0b8']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [90, 140]); birds(ctx, t, 3, 160);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    T.blurred(ctx, 1, () => { shape(ctx, '#a9c3a8', 0, c => { c.moveTo(-200, 520); for (let x = -200; x <= 520; x += 120) c.quadraticCurveTo(x + 60, 486, x + 120, 520); c.lineTo(520, 560); c.lineTo(-200, 560); c.closePath(); }); });
    txt(ctx, 'MAINLAND', 160, 470, FX.DISPLAY(22), '#4a6a4a'); txt(ctx, 'THE SEA', 1120, 470, FX.DISPLAY(22), '#2f5d6b');
    V.lagoon(ctx, 640, 690, 640, t, { look: dr > 0 ? [.9, -.1] : [-.9, -.1], eyes: blink(t, 17.6), mouth: 'flat', hat: (c, x, y) => V.hats.helmet(c, x, y) });
    // the shield the lagoon holds up swings from facing the land to facing the sea
    const sw = dr > -.9 ? ease.inOut(clamp((dr + .9) / .8)) : 0, ang = lerp(Math.PI, 0, sw), sx = 640 + Math.cos(ang) * 330, sy = 470;
    if (oj > 0) { const k = pop(oj); ctx.save(); ctx.translate(sx, sy); ctx.scale(k, k); shape(ctx, '#b8ad96', 5, c => { c.moveTo(-60, -80); c.lineTo(60, -80); c.lineTo(60, 10); c.quadraticCurveTo(0, 90, -60, 10); c.closePath(); }); for (let i = 0; i < 3; i++) shape(ctx, '#b8ad96', 3, rect(-60 + i * 46, -100, 28, 22)); ctx.restore();
      shape(ctx, RED, 4, poly([[sx + (sw > .5 ? 80 : -80), sy - 10], [sx + (sw > .5 ? 60 : -60), sy - 30], [sx + (sw > .5 ? 60 : -60), sy + 10]])); }
    ctx.restore();
    strip(ctx, 'THE OLD JOB…', 470, 100, oj, { px: 38 }); if (dr > 0) strip(ctx, '…FACING THE SEA', 860, 190, dr, { px: 34, color: RED, rot: .03 });
    vig(ctx);
  }

  // ---------- f7: 75 years later — an island becomes a permanent plague hospital ----------
  function f7(ctx, lt, dur, t) {
    const sv = since(t, 'seventy'), is = since(t, 'island'), hp = since(t, 'hospital');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    sky(ctx, t); farShore(ctx, 430, t); waterBand(ctx, 440, t);
    T.blurred(ctx, 1.4, () => { for (let i = 0; i < 6; i++) { const x = 900 + i * 60, h = 60 + (i % 3) * 40; shape(ctx, '#d8c0a0', 2, rect(x, 430 - h, 50, h)); } });
    const rise = is > 0 ? FX.settle(clamp(is / .6)) : 0; ctx.save(); ctx.translate(0, (1 - rise) * 200); ctx.globalAlpha = clamp(is / .3); lazaretto(ctx, 560, 560, .9, 'old', t); ctx.restore();
    for (let i = 0; i < 2; i++) { const bx = 200 + i * 520 + Math.sin(t * .4 + i) * 40; ctx.save(); ctx.translate(bx, 640 + Math.sin(t * 1.4 + i) * 3); shape(ctx, '#7a5434', 4, c => { c.moveTo(-70, -10); c.lineTo(70, -10); c.quadraticCurveTo(60, 10, 40, 12); c.lineTo(-40, 12); c.quadraticCurveTo(-60, 10, -70, -10); c.closePath(); }); ctx.restore(); }
    ctx.restore();
    if (sv > 0) { const k = ease.inOut(clamp(sv / 1.6)), yr = Math.round(lerp(1348, 1423, k)), s = pop(sv); ctx.save(); ctx.translate(1060, 120); ctx.scale(s, s); FX.bigText(ctx, String(yr), 0, 0, 60, { color: GOLD }); ctx.restore(); txt(ctx, '+75 YEARS', 1060, 172, FX.DISPLAY(22)); }
    card(ctx, [['LAZZARETTO VECCHIO', FX.DISPLAY(26)], ['PERMANENT PLAGUE HOSPITAL, 1423', FX.FONT(600, 16)]], 360, 130, hp - .2, 420);
    reedsFG(ctx, t); vig(ctx);
    FX.dateTag(ctx, 'THE LAGOON, 1423');
  }

  // ---------- f8: a second island — ships, crews and cargo wait before they're let in ----------
  function f8(ctx, lt, dur, t) {
    const sh = since(t, 'shipsw'), cr = since(t, 'crews'), cg = since(t, 'cargo'), wt = since(t, 'wait');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    sky(ctx, t); farShore(ctx, 420, t); waterBand(ctx, 430, t);
    lazaretto(ctx, 520, 540, .85, 'new', t);
    if (sh > 0) for (let i = 0; i < 3; i++) { const x = FX.approach(t, A.shipsw + i * .2, 1500, 900 + i * 130, .5); galley(ctx, x, 600 - i * 50, .3 - i * .04, 4, t, { flag: '#e8c14a', sail: false }); line(ctx, [[x - 40, 600 - i * 50], [x - 60, 660 - i * 40]], 2, '#5a4026'); }
    if (cr > 0) for (let i = 0; i < 4; i++) { const k = pop(cr - i * .1); if (k <= 0) continue; ctx.save(); ctx.translate(340 + i * 56, 566); ctx.scale(k, k); fig(ctx, 0, 0, .14, P(i % 2 ? 'fisher' : 'elder', i % 2 ? 'tunicPoor' : 'tunicElder', { face: { look: [.3, 0] } })); ctx.restore(); }
    if (cg > 0) tag(ctx, 'CARGO AIRED', 600, 600, cg, 18);
    ctx.restore();
    if (since(t, 'second') > 0) card(ctx, [['LAZZARETTO NUOVO', FX.DISPLAY(26)], ['THE WAITING ISLAND', FX.FONT(600, 16)]], 360, 130, since(t, 'second') - .1, 380);
    if (wt > 0) FX.stamp(ctx, 'WAIT', 1000, 260, wt, { color: RED, size: 50, rot: -.1 });
    vig(ctx);
    FX.dateTag(ctx, 'THE LAGOON, 1468');
  }

  // ---------- f9: forty days — quaranta giorni ----------
  function f9(ctx, lt, dur, t) {
    const fd = since(t, 'forty'), it = since(t, 'italian');
    deskBg(ctx, t);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#f6f0e0', 4.5, rect(300, 150, 680, 440, 6)); shape(ctx, RED, 4.5, rect(300, 150, 680, 70, 6)); txt(ctx, 'QUARANTINE', 640, 186, FX.DISPLAY(32), '#fff');
    const n = fd > -.2 ? Math.min(40, Math.floor(clamp((fd + .2) / 1.6) * 40)) : 0;
    for (let i = 0; i < 40; i++) { const c = i % 8, r = Math.floor(i / 8), x = 330 + c * 80, y = 240 + r * 66; shape(ctx, i < n ? '#e8d8b0' : '#fbf7ec', 2.5, rect(x, y, 70, 56, 4)); txt(ctx, String(i + 1), x + 16, y + 14, FX.FONT(700, 14), '#7a6a5a'); if (i < n) { line(ctx, [[x + 14, y + 16], [x + 56, y + 46]], 4, RED); line(ctx, [[x + 56, y + 16], [x + 14, y + 46]], 4, RED); } }
    ctx.restore();
    if (fd > 0) { const s = pop(fd); ctx.save(); ctx.translate(1110, 130); ctx.scale(s, s); FX.bigText(ctx, '40 DAYS', 0, 0, 50, { color: GOLD }); ctx.restore(); }
    if (it > 0) card(ctx, [['QUARANTA GIORNI', FX.DISPLAY(30)], ['ITALIAN: “FORTY DAYS”', FX.FONT(600, 16)]], 640, 650, it, 440);
    vig(ctx);
  }

  // ---------- f10: that's where the word quarantine comes from ----------
  function f10(ctx, lt, dur, t) {
    const qk = since(t, 'quarantine');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#f0e2c0'], [1, '#d8c098']]), 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#7a2a24', 5, rect(180, 110, 920, 520, 8)); shape(ctx, '#f6f0e0', 4, rect(200, 126, 430, 488, 4)); shape(ctx, '#f6f0e0', 4, rect(650, 126, 430, 488, 4)); line(ctx, [[640, 126], [640, 614]], 4);
    for (let i = 0; i < 12; i++) { line(ctx, [[230, 160 + i * 36], [600 - (i % 3) * 60, 160 + i * 36]], 3, 'rgba(70,64,58,.3)'); line(ctx, [[680, 160 + i * 36], [1050 - (i % 2) * 80, 160 + i * 36]], 3, 'rgba(70,64,58,.3)'); }
    const k = ease.inOut(clamp((qk + .4) / 1.2));
    shape(ctx, '#fff8e0', 3.5, rect(230, 290, 820, 150, 8));
    txt(ctx, 'quaranta', lerp(640, 360, k), 335, `italic 700 ${Math.round(lerp(64, 40, k))}px Georgia, serif`, '#5a3a22'); if (k > .3) { ctx.save(); ctx.globalAlpha = clamp((k - .3) / .4); txt(ctx, '→', 560, 335, FX.DISPLAY(40), RED); txt(ctx, 'QUARANTINE', 820, 335, FX.DISPLAY(56), RED); ctx.restore(); }
    txt(ctx, '“forty”', 360, 400, FX.FONT(700, 20), '#7a6a5a');
    ctx.restore();
    strip(ctx, 'WHERE THE WORD COMES FROM', 640, 70, lt - .1, { px: 32 });
    vig(ctx);
  }

  // ---------- f11: the idea started across the Adriatic — in Dubrovnik (Ragusa) ----------
  const AL = ([lon, lat]) => [-120 + (lon - 10) * 150, 60 + (46.2 - lat) * 150];
  function f11(ctx, lt, dur, t) {
    const of = since(t, 'offshore'), ad = since(t, 'adriatic'), db = since(t, 'dubrovnik');
    shape(ctx, '#efe0b8', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#cfd9a6', 0, rect(-200, -200, 1700, 1100));
    const sea = [[12.3, 45.4], [13, 45.7], [13.8, 45.6], [13.6, 45.1], [13.8, 44.9], [14.4, 45.3], [15.2, 44.6], [15.6, 44], [16.4, 43.5], [17.4, 43.0], [18.1, 42.6], [18.6, 42.4], [19.5, 41.3], [19.4, 40.3], [18.5, 40.1], [16.9, 41.1], [15.9, 41.9], [14.2, 42.5], [13.5, 43.6], [12.6, 44.1], [12.3, 44.8]].map(AL);
    shape(ctx, '#a8d4dc', 4.5, poly([...sea, AL([18.5, 39.6]), AL([16, 39.6])].slice(0, sea.length)));
    for (const [n, ll, c] of [['VENICE', [12.33, 45.44], RED], ['RAGUSA (DUBROVNIK)', [18.09, 42.65], '#2f6aa8']]) { const [x, y] = AL(ll); shape(ctx, c, 3.5, circle(x, y, 10)); txt(ctx, n, x + (n === 'VENICE' ? 0 : -40), y - 24, `italic 700 20px Georgia, serif`, '#3a2a1a'); }
    txt(ctx, 'ADRIATIC', AL([15.6, 42.8])[0], AL([15.6, 42.8])[1], `italic 600 26px Georgia, serif`, '#2f5d6b');
    // Ragusa's walled city and ships held offshore
    if (db > -1) { const [x, y] = AL([18.09, 42.65]); const s = pop(db + 1); ctx.save(); ctx.translate(x + 60, y + 50); ctx.scale(s * .6, s * .6); shape(ctx, '#e0c8a0', 4, rect(-60, -50, 120, 50)); for (let i = 0; i < 5; i++) shape(ctx, '#e0c8a0', 3, rect(-60 + i * 26, -64, 16, 16)); shape(ctx, '#b8503a', 3, poly([[-30, -50], [0, -80], [30, -50]])); ctx.restore(); }
    if (of > 0) { const [x, y] = AL([17.9, 42.4]); for (let i = 0; i < 3; i++) galley(ctx, x - 60 - i * 40, y + 30 + i * 22, .12, 4, t, { sail: false, flag: '#e8c14a' }); }
    if (ad > 0) { const k = ease.out(clamp(ad / 1)); const a = AL([18.09, 42.65]), b = AL([12.4, 45.3]); ctx.save(); ctx.setLineDash([12, 9]); line(ctx, [a, [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]], 6, '#2f6aa8'); ctx.restore(); }
    ctx.restore();
    card(ctx, [['RAGUSA, 1377', FX.DISPLAY(28)], ['THE FIRST TO HOLD SHIPS OFFSHORE', FX.FONT(600, 15)]], 1000, 600, db - .1, 420);
    vig(ctx);
    FX.dateTag(ctx, 'ACROSS THE ADRIATIC');
  }

  // ---------- f12: Venice built the machinery (the system as a flowchart of islands) ----------
  function cog(ctx, x, y, r, a, col) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); for (let i = 0; i < 20; i++) { const ang = i / 20 * Math.PI * 2, rr = i % 2 ? r : r * 1.18; ctx.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr); } ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); shape(ctx, '#f3e8cc', 3, circle(0, 0, r * .35)); ctx.restore(); }
  function f12(ctx, lt, dur, t) {
    blueprintBg(ctx, '#3a86c8');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    const steps = [['SHIP ARRIVES', 180], ['ANCHOR OFFSHORE', 470], ['40 DAYS ON THE ISLAND', 790], ['LET IN', 1100]];
    steps.forEach(([s, x], i) => { const k = pop(lt - .1 - i * .35); if (k <= 0) return; ctx.save(); ctx.translate(x, 330); ctx.scale(k, k); shape(ctx, '#f3e8cc', 4, rect(-130, -90, 260, 180, 10));
      if (i === 0) galley(ctx, 0, 30, .3, 4, t, { flag: '#e8c14a' }); else if (i === 1) { galley(ctx, -20, 30, .26, 4, t, { sail: false }); line(ctx, [[30, 20], [50, 70]], 3); } else if (i === 2) lazaretto(ctx, 0, 50, .3, 'new', t); else { shape(ctx, '#e8a87a', 3.5, rect(-50, -30, 100, 70)); shape(ctx, '#b8503a', 3.5, poly([[-56, -30], [0, -60], [56, -30]])); }
      ctx.restore(); txt(ctx, s, x, 450, FX.DISPLAY(20), '#fff'); if (i < 3) shape(ctx, GOLD, 3.5, poly([[x + 140, 320], [x + 170, 320], [x + 170, 306], [x + 194, 330], [x + 170, 354], [x + 170, 340], [x + 140, 340]])); });
    cog(ctx, 330, 590, 60, t * .8, '#e8c14a'); cog(ctx, 430, 610, 40, -t * 1.2, '#d8a238'); cog(ctx, 850, 600, 54, -t * .9, '#e8c14a'); cog(ctx, 950, 620, 36, t * 1.35, '#d8a238');
    ctx.restore();
    strip(ctx, 'VENICE BUILT THE MACHINERY', 640, 100, since(t, 'machinery') - .3, { px: 36 });
    vig(ctx);
  }

  // ---------- f13: a wall can also face inward ----------
  function f13(ctx, lt, dur, t) {
    const iw = since(t, 'inward');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8ab4cc'], [1, '#e8dcc0']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [90, 140], .8);
    ctx.save(); still(ctx, lt, dur, 1, 1.06, 640, 420);
    waterBand(ctx, 520, t, -600, 2200, '#5a98ac'); shape(ctx, '#c8b890', 4.5, ellipse(640, 540, 330, 44));
    for (let i = 0; i < 5; i++) { const x = 420 + i * 90, h = 120 + (i % 2) * 50; shape(ctx, ['#d8b090', '#e0c8a0'][i % 2], 4, rect(x, 520 - h, 80, h)); shape(ctx, '#9a4a3a', 4, poly([[x - 4, 520 - h], [x + 40, 520 - h - 20], [x + 84, 520 - h]])); }
    // battlements rise around the island — but they face in
    const rise = iw > -.6 ? FX.settle(clamp((iw + .6) / .7)) * 70 : 0;
    for (let i = 0; i < 14; i++) { const a = Math.PI * (i / 13), x = 640 + Math.cos(a) * 340, y = 560 + Math.sin(a) * 30; shape(ctx, '#b8ad96', 4, rect(x - 22, y - rise, 44, rise)); }
    if (iw > .2) { for (const d of [-1, 1]) shape(ctx, RED, 4, poly([[640 + d * 230, 380], [640 + d * 190, 360], [640 + d * 190, 400]])); }
    ctx.restore();
    strip(ctx, 'A WALL CAN ALSO FACE INWARD', 640, 110, lt - .1, { px: 36 });
    vig(ctx);
  }

  // ---------- f14: 1516 — the Senate orders Venice's Jewish residents onto one small island, an old foundry site ----------
  const CITY = [[200, 330], [260, 240], [420, 190], [600, 180], [780, 200], [930, 250], [1040, 330], [1010, 420], [880, 470], [700, 490], [500, 480], [330, 440], [230, 400]];
  function f14(ctx, lt, dur, t) {
    const se = since(t, 'senate'), jw = since(t, 'jewish'), sm = since(t, 'small'), fo = since(t, 'foundry');
    const z = T.keys(t, [[A.jewish, 1], [A.small + .6, 2.6]]), fx = T.keys(t, [[A.jewish, 640], [A.small + .6, 470]]), fy = T.keys(t, [[A.jewish, 360], [A.small + .6, 245]]);
    shape(ctx, '#efe0b8', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, z, fx, fy);
    shape(ctx, '#a8d4dc', 0, rect(-400, -400, 2100, 1600)); shape(ctx, '#e8d8b8', 4.5, smooth(CITY));
    ctx.save(); ctx.beginPath(); smooth(CITY)(ctx); ctx.clip(); const r = rng(9); for (let y = 170; y < 500; y += 16) for (let x = 190; x < 1060; x += 18) { ctx.fillStyle = ['#e8b090', '#d8a080', '#f0c8a0'][Math.floor(r() * 3)]; ctx.fillRect(x + r() * 3, y + r() * 3, 14, 11); }
    line(ctx, [[260, 300], [420, 250], [560, 330], [700, 290], [820, 360], [960, 380]], 18, '#7ab8c8'); ctx.restore();
    // the Ghetto Nuovo: a small island ringed by canals in the north-west (Cannaregio)
    shape(ctx, '#7ab8c8', 3, rect(430, 218, 84, 58, 10)); shape(ctx, sm > 0 ? '#f0d890' : '#e0c8a0', 3.5, rect(442, 228, 60, 38, 6));
    if (sm > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, .6 - (t - A.small) * .3); shape(ctx, null, 4, rect(424, 212, 96, 70, 12)); ctx.restore(); }
    if (fo > 0) { ctx.save(); ctx.globalAlpha = clamp(fo / .5); shape(ctx, '#7a5a4a', 2.5, rect(462, 236, 20, 18, 2)); for (let i = 0; i < 3; i++) { const k = (t * .4 + i / 3) % 1; shape(ctx, 'rgba(120,110,100,.5)', 0, circle(472 + Math.sin(k * 5) * 3, 232 - k * 26, 3 + k * 4)); } ctx.restore(); }
    ctx.restore();
    // the Senate's decree
    if (se > 0 && t < A.small) { const s = slam(se); ctx.save(); ctx.translate(980, 360); ctx.rotate(.04); ctx.scale(s, s); shape(ctx, '#f2e6c4', 4, rect(-150, -190, 300, 380, 4)); txt(ctx, 'DECREE', 0, -150, `700 28px Georgia, serif`, '#7a2a24'); txt(ctx, 'OF THE SENATE', 0, -118, FX.FONT(700, 14));
      txt(ctx, '29 MARCH 1516', 0, -90, FX.FONT(700, 14), '#7a2a24'); for (let i = 0; i < 7; i++) line(ctx, [[-120, -56 + i * 26], [120 - (i % 2) * 40, -56 + i * 26]], 4, 'rgba(70,64,58,.45)'); shape(ctx, RED, 3.5, circle(80, 140, 26)); ctx.restore(); }
    if (sm > 0) tag(ctx, 'ONE SMALL ISLAND', 640, 600, sm, 24); if (fo > 0) tag(ctx, 'SITE OF AN OLD FOUNDRY', 640, 660, fo, 20);
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 1516');
  }

  // ---------- f15: gates locked every night, guards the residents paid for themselves ----------
  function f15(ctx, lt, dur, t) {
    const lk = since(t, 'locked'), gd = since(t, 'guards'), py = since(t, 'pay');
    const night = clamp((t - A.gates + .3) / 1.2);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, `rgb(${lerp(150, 60, night) | 0},${lerp(190, 80, night) | 0},${lerp(220, 130, night) | 0})`], [1, `rgb(${lerp(240, 120, night) | 0},${lerp(220, 110, night) | 0},${lerp(180, 120, night) | 0})`]]), 0, rect(-200, -200, 1700, 1100));
    if (night > .3) { ctx.save(); ctx.globalAlpha = night; shape(ctx, '#f4efd0', 3, circle(1080, 120, 34)); for (let i = 0; i < 14; i++) shape(ctx, '#fff', 0, circle((i * 97) % 1280, 30 + (i * 53) % 200, 2)); ctx.restore(); }
    // tall Ghetto houses behind; the gate on a little bridge over the canal
    for (let i = 0; i < 6; i++) { const x = -40 + i * 220, h = 360 + (i % 2) * 60; shape(ctx, ['#d8b090', '#c8a080', '#e0c8a0'][i % 3], 4.5, rect(x, 500 - h, 200, h)); for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) { const lit = night > .4 && ((r + c + i) % 3 !== 0); shape(ctx, lit ? '#ffd88a' : '#4a5a6a', 2.5, rect(x + 22 + c * 60, 500 - h + 24 + r * 58, 30, 38, 10)); } }
    waterBand(ctx, 560, t, -600, 2200, '#3a7890'); shape(ctx, '#c8b8a0', 4.5, c => { c.moveTo(440, 560); c.quadraticCurveTo(640, 470, 840, 560); c.lineTo(840, 580); c.quadraticCurveTo(640, 500, 440, 580); c.closePath(); });
    shape(ctx, '#c8b8a0', 4.5, rect(560, 300, 40, 240)); shape(ctx, '#c8b8a0', 4.5, rect(680, 300, 40, 240)); shape(ctx, '#c8b8a0', 4.5, rect(550, 280, 180, 30));
    const close = lk > -.2 ? ease.inOut(clamp((lk + .2) / .6)) : 0;
    for (const d of [-1, 1]) { ctx.save(); ctx.translate(640 + d * 40, 310); ctx.scale(lerp(.2, 1, close), 1); for (let i = 0; i < 4; i++) line(ctx, [[d * -40 + d * i * 10 * -1, 0], [d * -40 + d * i * 10 * -1, 220]], 6, '#3a3a40'); line(ctx, [[-40, 40], [40, 40]], 5, '#3a3a40'); line(ctx, [[-40, 180], [40, 180]], 5, '#3a3a40'); ctx.restore(); }
    if (close > .95) shape(ctx, '#c9a14a', 3.5, rect(632, 400, 16, 20, 3));
    // guards outside, with lanterns
    if (gd > 0) for (const [x, d] of [[380, 1], [900, -1]]) { fig(ctx, x, 600, .26, P('fisher', 'tunicElder', { hands: { L: [-120, -470], R: [160, -620] }, handShape: { R: 'fist' }, face: { look: [d * .6, 0] } }), { tint: '#26303c', mirror: d < 0 }); const lx = x + d * 160 * .26, ly = 600 - 620 * .26; line(ctx, [[lx, ly], [lx, ly + 30]], 2.5); shape(ctx, '#ffd88a', 3, rect(lx - 8, ly + 30, 16, 20, 3)); glow(ctx, lx, ly + 40, 70, 'rgba(255,210,130,.5)'); line(ctx, [[x - d * 60, 600 - 600 * .26 - 120], [x - d * 40, 600]], 5, '#26303c'); }
    if (py > 0) for (let i = 0; i < 4; i++) { const k = ((t * .7 + i / 4) % 1); coin(ctx, lerp(640, 900, k), 380 - Math.sin(Math.PI * k) * 60, .8, t * 4 + i); }
    ctx.restore();
    FX.caption(ctx, py > 0 ? 'GUARDS THE RESIDENTS HAD TO PAY FOR' : 'GATES LOCKED EVERY NIGHT', py > 0 ? py : lk, .1);
    vig(ctx);
    FX.dateTag(ctx, 'THE GHETTO, 1516');
  }

  // ---------- f16: the Venetian word for foundry was "geto" — most scholars think that's where "ghetto" comes from ----------
  function f16(ctx, lt, dur, t) {
    const gt = since(t, 'geto'), sc = since(t, 'scholars'), gh = since(t, 'ghetto');
    shape(ctx, '#3a2a26', 0, rect(0, 0, W, H));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    // a foundry: molten metal poured into a mould
    shape(ctx, '#5a4a44', 0, rect(-200, 460, 1700, 400)); shape(ctx, '#7a5a4a', 5, rect(140, 160, 300, 300, 10)); glow(ctx, 290, 360, 220, 'rgba(255,140,40,.55)'); shape(ctx, '#ffb040', 3, rect(220, 330, 140, 70, 10));
    ctx.save(); ctx.translate(520, 260); ctx.rotate(.5); shape(ctx, '#6a6a70', 4.5, c => { c.moveTo(-50, -30); c.lineTo(50, -30); c.lineTo(40, 40); c.lineTo(-40, 40); c.closePath(); }); ctx.restore();
    line(ctx, [[560, 290], [580, 430]], 14, '#ffa030'); glow(ctx, 580, 420, 90, 'rgba(255,170,60,.7)'); shape(ctx, '#7a7a80', 4, rect(530, 430, 110, 40, 6));
    // the word card
    shape(ctx, '#f6f0e0', 5, rect(720, 170, 460, 300, 8));
    txt(ctx, 'geto', 950, 236, `italic 700 60px Georgia, serif`, '#5a3a22'); txt(ctx, 'VENETIAN: “FOUNDRY”', 950, 290, FX.FONT(700, 18), '#7a6a5a');
    if (gh > -.3) { const k = ease.inOut(clamp((gh + .3) / .8)); ctx.save(); ctx.globalAlpha = k; txt(ctx, '↓', 950, 330, FX.DISPLAY(36), RED); txt(ctx, 'GHETTO', 950, 400, FX.DISPLAY(56), RED); ctx.restore(); }
    ctx.restore();
    if (sc > 0) tag(ctx, 'THE LEADING VIEW OF MOST SCHOLARS', 950, 520, sc, 18);
    vig(ctx);
  }

  // ---------- f17: the gates stayed up for almost three hundred years ----------
  function f17(ctx, lt, dur, t) {
    const gs = since(t, 'gatestay');
    const k = gs > 0 ? ease.inOut(clamp(gs / 2.6)) : 0, yr = Math.round(lerp(1516, 1797, k)), season = (k * 6) % 1;
    ctx.save(); still(ctx, lt, dur, 1, 1.05, 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ac0d8'], [1, '#f0e0c0']]), 0, rect(-200, -200, 1700, 1100)); clouds(ctx, t, [90, 140]);
    for (let i = 0; i < 5; i++) { const x = 80 + i * 240, h = 380 + (i % 2) * 50; shape(ctx, ['#d8b090', '#c8a080', '#e0c8a0'][i % 3], 4.5, rect(x, 520 - h, 220, h)); for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) shape(ctx, '#4a5a6a', 2.5, rect(x + 26 + c * 62, 520 - h + 26 + r * 58, 30, 38, 10)); }
    shape(ctx, '#c8b8a0', 4.5, rect(-200, 520, 1700, 200));
    shape(ctx, '#c8b8a0', 4.5, rect(560, 300, 40, 240)); shape(ctx, '#c8b8a0', 4.5, rect(680, 300, 40, 240)); shape(ctx, '#c8b8a0', 4.5, rect(550, 280, 180, 30));
    for (let i = 0; i < 8; i++) line(ctx, [[606 + i * 9, 310], [606 + i * 9, 530]], 5, '#3a3a40');
    // ivy creeps up the gateposts as the years pass
    for (const x of [570, 700]) { const h = 220 * k; for (let i = 0; i < Math.floor(h / 14); i++) shape(ctx, '#5a8a3a', 2, ellipse(x + (i % 2 ? 14 : 4), 530 - i * 14, 9, 6)); }
    if (season > .75) { ctx.save(); ctx.globalAlpha = .7; for (let i = 0; i < 30; i++) shape(ctx, '#fff', 0, circle((i * 89 + t * 30) % 1280, (i * 47 + t * 60) % 720, 3)); ctx.restore(); }
    ctx.restore();
    if (gs > 0) { const s = pop(gs); ctx.save(); ctx.translate(640, 120); ctx.scale(s, s); FX.bigText(ctx, String(yr), 0, 0, 70, { color: GOLD }); ctx.restore(); txt(ctx, '1516 → 1797', 640, 180, FX.DISPLAY(24)); }
    FX.caption(ctx, 'THE GATES STAYED UP FOR ALMOST 300 YEARS', since(t, 'years') - .6, .1);
    vig(ctx);
  }

  const cut = [[0, f1], [2.05, f2], [4.65, f3], [7.75, f4], [12.0, f5], [15.0, f6], [19.35, f7], [26.4, f8], [32.95, f9], [37.0, f10], [39.9, f11], [46.4, f12], [48.4, f13], [51.15, f14], [58.95, f15], [64.7, f16], [71.3, f17]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .6 }, { t: A.onit, type: 'scratch', gain: .3 }, { t: A.y1348, type: 'thud', gain: .5 }, { t: A.plague, type: 'wind', gain: .4 },
    { t: A.third, type: 'click', gain: .3 }, { t: A.disease, type: 'slide', gain: .3 }, { t: A.direction, type: 'whoosh', gain: .4 },
    { t: A.seventy, type: 'ratchet', gain: .3 }, { t: A.island, type: 'splash', gain: .4 }, { t: A.hospital, type: 'paper', gain: .4 },
    { t: A.second, type: 'paper', gain: .4 }, { t: A.shipsw, type: 'splash', gain: .3 }, { t: A.wait, type: 'thud', gain: .6 },
    { t: A.forty, type: 'ratchet', gain: .4 }, { t: A.italian, type: 'paper', gain: .4 }, { t: A.quarantine, type: 'swell', gain: .4 },
    { t: A.adriatic, type: 'slide', gain: .4 }, { t: A.dubrovnik, type: 'paper', gain: .4 }, { t: A.machinery, type: 'press', gain: .4 },
    { t: A.inward, type: 'boom', gain: .4 }, { t: A.senate, type: 'thud', gain: .5 }, { t: A.small, type: 'click', gain: .3 }, { t: A.locked, type: 'clang', gain: .5 },
    { t: A.pay, type: 'click', gain: .3 }, { t: A.geto, type: 'paper', gain: .4 }, { t: A.ghetto, type: 'swell', gain: .3 }, { t: A.gatestay, type: 'ratchet', gain: .3 },
  ];
  const moods = [{ t: 0, mood: 'under' }, { t: A.inward - .3, mood: 'mystery' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-filter.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
