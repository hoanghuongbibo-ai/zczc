/* New York — Beat 8 "Aftermath and human cost" (narration-aftermath.mp3 = 1.8 s pause + narration-full.mp3 687.6–794.4 s + 1 s tail).
 * Anchors = full-recording word times − 685.8. Tone: slow, spare, no counter animation, no slams. 9/11: no aircraft, no burning
 * towers — a held shot of the corner, the memorial. COVID: empty streets, an ambulance's lights, no patients shown. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a', CREAM = '#f4ecd8';
  const F = { remember: 689.19, sept: 690.83, y2001: 691.86, terrorists: 693.18, wtc: 695.62, walk: 697.07, corner: 697.59, began: 698.63, more: 699.8, killed: 702.41, weeks: 704.69,
    ask: 706.07, downtown: 710.22, fifteen: 711.81, comptroller: 713.49, doubled: 717.1, today: 718.1, memorial: 718.92, neighborhood: 719.91, five: 722.3, march: 723.86, y2020: 724.3,
    center: 726.8, pandemic: 728.32, april: 731.48, eight: 732.66, die: 734.02, streets: 735.06, empty: 735.74, obits: 738.02, office: 739.86, over: 742.17, leaving: 743.79, census: 745.12,
    k468: 747.61, left: 750.16, summer: 750.74, argued: 753.66, revised: 754.42, planners: 756.24, rebound: 758.0, six: 759.41, detail: 760.89, official: 763.2, counted: 764.74,
    most: 769.87, history: 770.83, taken: 772.63, aprilfirst: 773.4, record: 775.55, worst: 776.83, real: 779.65, free: 781.19, evenly: 782.98, lenape: 784.13, island: 785.73,
    wall: 787.81, paid: 788.8, bigger: 790.54, everyone: 792.62, coming: 793.39 };
  const A = {}; for (const k in F) A[k] = F[k] - 685.8; A.end = 109.6;

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


  const { harbor, walker, corner, dutchCorner, land1609, immigrant } = N;
  const fade = (k, d = .8) => clamp(k / d);
  const quiet = (ctx, s, x, y, k, px = 34, col = CREAM) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha = fade(k); ctx.font = FX.DISPLAY(px); const w = ctx.measureText(s).width + px * 1.4; if (col === CREAM || col === '#ffb88a' || col === '#d8d0c0' || col === '#b8b0a0') shape(ctx, 'rgba(14,16,24,.55)', 0, rect(x - w / 2, y - px * .85, w, px * 1.7, px * .5)); txt(ctx, s, x, y, FX.DISPLAY(px), col); ctx.restore(); };
  const still = (ctx, lt, dur, z1 = 1.06, fx = 640, fy = 380) => cam(ctx, lerp(1, z1, ease.sine(clamp(lt / dur))), fx, fy);
  const dim = (ctx, a) => { ctx.save(); ctx.globalAlpha = a; shape(ctx, '#0e1018', 0, rect(-400, -300, 2100, 1300)); ctx.restore(); };

  // ---------- k1: quiet card — and then the two you remember ----------
  function k1(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#1a1e2a'], [1, '#0e1018']]), 0, rect(0, 0, W, H));
    quiet(ctx, 'BEAT 8', 640, 300, lt - .2, 26, '#9a9aa8'); quiet(ctx, 'AFTERMATH', 640, 360, lt - .6, 54);
    quiet(ctx, 'AND THEN THE TWO YOU REMEMBER', 640, 460, since(t, 'remember'), 24, '#c8c0b0');
  }

  // ---------- k2: September 11th 2001 — a short walk from the corner where this video began (held shot, no aircraft) ----------
  function k2(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.08, 640, 360); corner(ctx, t, { freeze: A.sept, crowd: .7, fg: false });
    // a pale haze drifts in over the rooftops; the light goes grey
    const hz = clamp((lt - 1.5) / 6); ctx.save(); ctx.globalAlpha = .55 * hz; shape(ctx, grad(ctx, 0, -200, 0, 500, [[0, '#c8c4bc'], [1, 'rgba(200,196,188,0)']]), 0, rect(-400, -300, 2100, 800)); ctx.restore();
    ctx.restore(); dim(ctx, .25 + .2 * hz);
    ctx.save(); ctx.globalAlpha = fade(since(t, 'sept') + .3); FX.dateTag(ctx, '11 SEPTEMBER 2001 · 8:46 AM'); ctx.restore();
    // a small quiet map: the corner and the World Trade Center site, a short walk apart
    if (since(t, 'walk') > -.4) { ctx.save(); ctx.globalAlpha = fade(since(t, 'walk') + .4); ctx.translate(1080, 560); shape(ctx, 'rgba(244,236,216,.92)', 3, rect(-150, -110, 300, 220, 8));
      shape(ctx, '#9ac0d8', 0, rect(-140, -100, 60, 200)); for (let i = 0; i < 5; i++) line(ctx, [[-80, -80 + i * 40], [140, -96 + i * 40]], 2, '#c8b898'); line(ctx, [[-60, 40], [120, 70]], 4, '#a89878');
      shape(ctx, '#5a5a68', 2, rect(-58, -64, 22, 22)); shape(ctx, '#5a5a68', 2, rect(-30, -50, 22, 22)); txt(ctx, 'WTC', -34, -84, FX.FONT(800, 13), '#3a3a48');
      shape(ctx, RED, 2, circle(70, 56, 8)); txt(ctx, 'WALL & BROAD', 70, 84, FX.FONT(800, 12), '#3a3a48'); ctx.setLineDash([5, 5]); line(ctx, [[-30, -30], [66, 50]], 2, '#3a3a48'); txt(ctx, '≈ 10 MIN WALK', 30, -6, FX.FONT(700, 11), '#3a3a48'); ctx.restore(); }
  }

  // ---------- k3: more than 2,750 people were killed in Lower Manhattan (still text, a candle) ----------
  function k3(ctx, lt, dur, t) {
    shape(ctx, '#0b0c12', 0, rect(0, 0, W, H)); glow(ctx, 640, 520, 160 + Math.sin(t * 3) * 6, 'rgba(255,200,120,.25)');
    shape(ctx, '#f4efe2', 2, rect(626, 520, 28, 90, 4)); shape(ctx, '#ffd27a', 0, c => { c.moveTo(640, 516); c.quadraticCurveTo(630 + Math.sin(t * 5) * 2, 498, 640, 478); c.quadraticCurveTo(650, 498, 640, 516); c.closePath(); });
    quiet(ctx, 'MORE THAN 2,750 PEOPLE', 640, 280, lt - .3, 44); quiet(ctx, 'KILLED IN LOWER MANHATTAN', 640, 340, lt - .9, 26, '#b8b0a0');
  }

  // ---------- k4: in the weeks after, people ask whether anyone will ever want to live or work downtown again ----------
  function k4(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.05); corner(ctx, t, { empty: true, grey: .7 }); ctx.restore(); dim(ctx, .3);
    quiet(ctx, 'IN THE WEEKS AFTER', 640, 110, since(t, 'weeks'), 28, '#d8d0c0');
    quiet(ctx, 'WILL ANYONE EVER LIVE OR WORK DOWNTOWN AGAIN?', 640, 620, since(t, 'ask'), 30);
  }

  // ---------- k5: fifteen years later, the state comptroller: Lower Manhattan's population has doubled (still graphic) ----------
  function k5(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.05); corner(ctx, t, { crowd: 1, light: .3 }); ctx.restore(); dim(ctx, .35);
    const k = fade(since(t, 'comptroller') + .2); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.translate(640, 380); shape(ctx, 'rgba(244,236,216,.95)', 3, rect(-260, -150, 520, 300, 10));
      txt(ctx, 'PEOPLE LIVING IN LOWER MANHATTAN', 0, -116, FX.FONT(800, 16), '#3a3a48'); line(ctx, [[-200, 100], [200, 100]], 3, '#3a3a48');
      shape(ctx, '#8a9aac', 3, rect(-150, 20, 100, 80)); shape(ctx, GREEN, 3, rect(50, -60, 100, 160)); txt(ctx, '2001', -100, 124, FX.FONT(800, 16), '#3a3a48'); txt(ctx, '≈ 15 YEARS LATER', 100, 124, FX.FONT(800, 14), '#3a3a48'); txt(ctx, '× 2', 100, -84, FX.DISPLAY(30), GREEN); ctx.restore(); }
    quiet(ctx, 'FIFTEEN YEARS LATER', 640, 110, since(t, 'fifteen'), 30);
  }

  // ---------- k6: today, a memorial and a neighborhood at the same time. "Five." ----------
  function k6(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.06, 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, 420, [[0, '#7ab4dc'], [1, '#e8eef0']]), 0, rect(-200, -200, 1700, 700));
    // One World Trade Center and the neighborhood around the plaza
    shape(ctx, grad(ctx, 0, 0, W, 0, [[0, '#9ac0dc'], [1, '#c8e0f0']]), 3.5, poly([[860, 420], [1000, 420], [970, 60], [890, 60]])); line(ctx, [[930, 60], [930, -20]], 4, '#9aa0aa'); for (let y = 80; y < 420; y += 30) line(ctx, [[890 - (420 - y) * -.08, y], [970 + (420 - y) * -.08, y]], 1.5, 'rgba(255,255,255,.4)');
    for (let i = 0; i < 8; i++) { const x = i < 4 ? 20 + i * 150 : 1020 + (i - 4) * 70, h = 160 + (i * 41) % 120; if (x > 820 && x < 1040) continue; shape(ctx, ['#c8b8a0', '#a9b6c4', '#d8c8b0', '#b8c4d0'][i % 4], 3, rect(x, 420 - h, i < 4 ? 140 : 64, h)); for (let y = 420 - h + 16; y < 410; y += 24) line(ctx, [[x + 10, y], [x + (i < 4 ? 130 : 54), y]], 4, 'rgba(60,80,110,.35)'); }
    shape(ctx, '#c8c4b8', 0, rect(-200, 420, 1700, 400));
    // the pool: a square void, water falling on all sides, names cut in the bronze parapet
    shape(ctx, '#6a6a72', 4, poly([[300, 470], [980, 470], [1100, 640], [180, 640]])); shape(ctx, grad(ctx, 0, 490, 0, 620, [[0, '#9aa4b0'], [1, '#4a5260']]), 0, poly([[340, 490], [940, 490], [1040, 620], [240, 620]]));
    for (let i = 0; i < 70; i++) { const p = i / 70, x = lerp(345, 935, p), yy = (t * 40 + i * 7) % 18; line(ctx, [[x, 492], [x, 520 + yy * .2]], 2, 'rgba(230,240,248,.8)'); }
    shape(ctx, '#14161c', 3, poly([[540, 540], [740, 540], [770, 590], [510, 590]])); for (let i = 0; i < 20; i++) { const x = lerp(545, 735, i / 20); line(ctx, [[x, 542], [x, 560]], 1.5, 'rgba(230,240,248,.6)'); }
    shape(ctx, '#6a5a3a', 3, poly([[300, 470], [980, 470], [990, 458], [290, 458]])); for (let i = 0; i < 40; i++) line(ctx, [[310 + i * 17, 462], [322 + i * 17, 462]], 1.5, '#c8b070');
    // trees and people: visitors, a parent with a child, neighbors walking a dog
    for (let i = 0; i < 9; i++) { const x = 60 + i * 150 + (i % 2) * 30, y = 700 - (i % 2) * 40; line(ctx, [[x, y], [x, y - 60]], 7, '#5a3a20'); shape(ctx, i % 2 ? '#5f9f4c' : '#4f8f3a', 3, circle(x, y - 90, 40)); }
    for (let i = 0; i < 5; i++) walker(ctx, 220 + i * 210 + Math.sin(t * .3 + i) * 20, 770, .42, t * .5, i * 3 + 2, { cam: false });
    ctx.restore(); dim(ctx, .12);
    quiet(ctx, 'TODAY: A MEMORIAL', 420, 110, since(t, 'memorial'), 30); quiet(ctx, 'AND A NEIGHBORHOOD', 860, 160, since(t, 'neighborhood'), 30);
    if (since(t, 'five') > 0) { ctx.save(); ctx.globalAlpha = fade(since(t, 'five')); shape(ctx, 'rgba(14,16,24,.75)', 0, rect(560, 600, 160, 90, 10)); txt(ctx, 'FIVE.', 640, 646, FX.DISPLAY(40), CREAM); ctx.restore(); }
  }

  // ---------- k7: then March 2020 — the city an early center of the COVID-19 pandemic in the United States ----------
  function k7(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.06); corner(ctx, t, { empty: true, light: .2 }); ctx.restore(); dim(ctx, .3);
    quiet(ctx, 'MARCH 2020', 640, 120, since(t, 'march') + .2, 40);
    quiet(ctx, 'AN EARLY CENTER OF THE COVID-19 PANDEMIC IN THE U.S.', 640, 620, since(t, 'center'), 26);
  }

  // ---------- k8: on one day that April more than eight hundred New Yorkers die. The streets empty. ----------
  function k8(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.06, 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#141a2a'], [1, '#22283a']]), 0, rect(-200, -200, 1700, 1100));
    // a hospital at night, an ambulance outside, its lights turning; no people shown
    shape(ctx, '#3a4050', 4, rect(260, 160, 760, 420)); for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) shape(ctx, (r * 3 + c) % 4 ? '#ffe2a0' : '#2a3040', 0, rect(290 + c * 72, 190 + r * 70, 46, 40)); shape(ctx, '#c8d0d8', 3, rect(560, 470, 160, 110)); txt(ctx, 'EMERGENCY', 640, 452, FX.FONT(800, 18), '#ff6a5a');
    shape(ctx, '#1a1e28', 0, rect(-200, 580, 1700, 400));
    { const x = 860, y = 640; shape(ctx, '#f4efe6', 4, rect(x - 110, y - 90, 220, 90, 8)); shape(ctx, '#f4efe6', 4, rect(x + 110, y - 66, 60, 66, 8)); shape(ctx, RED, 0, rect(x - 110, y - 46, 220, 10)); line(ctx, [[x - 20, y - 70], [x + 20, y - 70]], 6, RED); line(ctx, [[x, y - 84], [x, y - 56]], 6, RED);
      for (const d of [-70, 120]) shape(ctx, '#2a2a30', 3, circle(x + d, y, 18)); const on = Math.sin(t * 6) > 0; shape(ctx, on ? '#ff4a3a' : '#3a5aff', 2, rect(x - 40, y - 104, 30, 14, 4)); glow(ctx, x - 25, y - 98, 160, on ? 'rgba(255,60,50,.35)' : 'rgba(60,90,255,.35)'); }
    ctx.restore();
    quiet(ctx, 'APRIL 2020', 640, 90, since(t, 'april') + .2, 34);
    quiet(ctx, 'ON ONE DAY, MORE THAN 800 NEW YORKERS DIE', 640, 690, since(t, 'eight'), 24);
  }

  // ---------- k9: within weeks the obituaries are back: the office is dead, the city is over, everyone is leaving ----------
  function k9(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#d8d0c0'], [1, '#b8b0a0']]), 0, rect(0, 0, W, H));
    const heads = [['office', 'THE OFFICE IS DEAD', 320, 300, -.05], ['over', 'THE CITY IS OVER', 760, 260, .04], ['leaving', 'EVERYONE IS LEAVING', 560, 500, -.02]];
    heads.forEach(([k, s, x, y, r]) => { const kk = since(t, k) + .2; if (kk <= 0) return; const e = ease.out(clamp(kk / .8)); ctx.save(); ctx.globalAlpha = e; ctx.translate(x, y - (1 - e) * 30); ctx.rotate(r);
      shape(ctx, 'rgba(0,0,0,.2)', 0, rect(-226, -76, 460, 160)); shape(ctx, '#f8f4ea', 3, rect(-230, -80, 460, 160, 3)); txt(ctx, 'OPINION', 0, -54, FX.FONT(800, 14), '#7a6a5a'); txt(ctx, s, 0, -6, FX.DISPLAY(34), '#1d1a17'); for (let i = 0; i < 3; i++) line(ctx, [[-190, 30 + i * 14], [190, 30 + i * 14]], 3, '#b8b0a0'); ctx.restore(); });
    quiet(ctx, 'WITHIN WEEKS, THE OBITUARIES ARE BACK', 640, 92, since(t, 'obits') + .2, 30, '#3a3a48');
  }

  // ---------- k10: ~468,000 left by summer 2022 (estimates, argued over and revised); planners say it's rebounding. "Six." ----------
  function k10(ctx, lt, dur, t) {
    const rv = since(t, 'revised'), rb = since(t, 'rebound');
    ctx.save(); still(ctx, lt, dur, 1.04, 640, 400);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#a8b8c8'], [1, '#e8e0d0']]), 0, rect(-200, -200, 1700, 800)); shape(ctx, '#9a9aa0', 0, rect(-200, 560, 1700, 300));
    for (let i = 0; i < 2; i++) { const x = 300 + i * 520 + Math.sin(t * .2 + i) * 10; shape(ctx, '#f4efe6', 4, rect(x - 120, 420, 200, 140, 6)); shape(ctx, '#e8742a', 4, rect(x + 80, 470, 70, 90, 8)); shape(ctx, '#9ac0dc', 3, rect(x + 94, 484, 40, 30, 4)); for (const d of [-80, 40, 120]) shape(ctx, '#2a2a30', 3, circle(x + d, 566, 20)); txt(ctx, 'MOVING', x - 20, 490, FX.DISPLAY(26), '#e8742a'); }
    ctx.restore();
    { const k = fade(since(t, 'k468')); ctx.save(); ctx.globalAlpha = k; ctx.translate(640, 230); shape(ctx, 'rgba(244,236,216,.95)', 3, rect(-300, -80, 600, 160, 10)); txt(ctx, '≈ 468,000 RESIDENTS LEFT', 0, -16, FX.DISPLAY(36), '#3a3a48'); txt(ctx, 'CENSUS BUREAU ESTIMATE · APR 2020 – JUL 2022', 0, 30, FX.FONT(800, 15), '#5a5a68');
      if (rv > 0) { ctx.globalAlpha = k * fade(rv); line(ctx, [[-220, -16], [220, -16]], 3, '#5a5a68'); txt(ctx, 'ESTIMATES ARGUED OVER AND REVISED', 0, 66, 'italic 600 20px Georgia', '#8a3a2a'); } ctx.restore(); }
    if (rb > -.2) { ctx.save(); ctx.globalAlpha = fade(rb + .2); line(ctx, [[1000, 640], [1100, 560], [1180, 500]], 6, GREEN); shape(ctx, GREEN, 0, poly([[1170, 486], [1200, 490], [1188, 516]])); txt(ctx, 'CITY PLANNERS: REBOUNDING', 1020, 680, FX.FONT(800, 16), GREEN); ctx.restore(); }
    if (since(t, 'six') > 0) { ctx.save(); ctx.globalAlpha = fade(since(t, 'six')); shape(ctx, 'rgba(14,16,24,.75)', 0, rect(560, 600, 160, 90, 10)); txt(ctx, 'SIX.', 640, 646, FX.DISPLAY(40), CREAM); ctx.restore(); }
  }

  // ---------- k11: the 2020 census: 8,804,190 — the most in the city's history — counted as of April 1st 2020 ----------
  function k11(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8e4dc'], [1, '#cfc8bc']]), 0, rect(0, 0, W, H));
    ctx.save(); ctx.translate(500, 380); ctx.rotate(-.03); shape(ctx, 'rgba(0,0,0,.2)', 0, rect(-266, -236, 540, 480)); shape(ctx, '#fbf8f0', 3, rect(-270, -240, 540, 480, 4));
    txt(ctx, 'UNITED STATES CENSUS 2020', 0, -200, FX.FONT(800, 20), '#2f4a6a'); line(ctx, [[-240, -176], [240, -176]], 2, '#2f4a6a'); txt(ctx, 'NEW YORK CITY · TOTAL POPULATION', 0, -140, FX.FONT(700, 16), '#5a5a68');
    if (since(t, 'counted') > -.2) { ctx.globalAlpha = fade(since(t, 'counted') + .2, 1.2); shape(ctx, '#fff', 2, rect(-220, -100, 440, 90, 6)); txt(ctx, '8,804,190', 0, -54, FX.DISPLAY(62), '#1d1a17'); ctx.globalAlpha = 1; }
    if (since(t, 'most') > -.2) { ctx.globalAlpha = fade(since(t, 'most') + .2); txt(ctx, 'THE MOST IN THE CITY\'S HISTORY', 0, 30, FX.DISPLAY(26), GREEN); ctx.globalAlpha = 1; }
    for (let i = 0; i < 4; i++) line(ctx, [[-220, 90 + i * 30], [220, 90 + i * 30]], 2, '#d8d0c0'); ctx.restore();
    // the calendar page: April 1, 2020
    if (since(t, 'aprilfirst') > -.4) { ctx.save(); ctx.globalAlpha = fade(since(t, 'aprilfirst') + .4); ctx.translate(1010, 330); shape(ctx, '#fbf8f0', 3, rect(-120, -130, 240, 260, 8)); shape(ctx, RED, 0, rect(-120, -130, 240, 56)); txt(ctx, 'APRIL 2020', 0, -100, FX.FONT(800, 20), '#fff'); txt(ctx, '1', 0, 20, FX.DISPLAY(110), '#1d1a17'); txt(ctx, 'CENSUS DAY', 0, 100, FX.FONT(800, 16), '#5a5a68'); ctx.restore(); }
    quiet(ctx, 'THE DETAIL I CAN\'T GET PAST', 640, 70, since(t, 'detail') + .2, 26, '#3a3a48');
  }

  // ---------- k12: the record was set in the worst month ----------
  function k12(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.08); corner(ctx, t, { empty: true, light: 1 }); ctx.restore(); dim(ctx, .35);
    quiet(ctx, 'THE RECORD WAS SET', 640, 300, since(t, 'record') + .1, 44); quiet(ctx, 'IN THE WORST MONTH', 640, 370, since(t, 'worst'), 44, '#ffb88a');
  }

  // ---------- k13: the comebacks are real — never free, never shared evenly ----------
  function k13(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#d8d4cc'], [1, '#b8b4ac']]), 0, rect(0, 0, W, H)); ctx.save(); ctx.globalAlpha = .35; for (let i = 0; i < 16; i++) { const x = 20 + i * 80, h = 140 + (i * 53) % 220; shape(ctx, '#9aa0aa', 2, rect(x, 560 - h, 70, h)); } ctx.restore();
    const tl = clamp((since(t, 'evenly') + .3) / 1.2) * .16; shape(ctx, '#7a6a5a', 3, poly([[610, 640], [670, 640], [640, 590]]));
    ctx.save(); ctx.translate(640, 590); ctx.rotate(tl); line(ctx, [[-420, 0], [420, 0]], 10, '#5a4a3a');
    for (let i = 0; i < 4; i++) walker(ctx, -380 + i * 60, 0, .3, t, i * 2 + 1, { still: true, cam: false }); for (let i = 0; i < 2; i++) walker(ctx, 260 + i * 80, 0, .3, t, i * 5 + 3, { still: true, cam: false });
    ctx.restore();
    quiet(ctx, 'THE COMEBACKS ARE REAL', 640, 140, since(t, 'real') + .2, 40); quiet(ctx, 'NEVER FREE', 420, 230, since(t, 'free'), 32, '#8a3a2a'); quiet(ctx, 'NEVER SHARED EVENLY', 860, 230, since(t, 'evenly'), 32, '#8a3a2a');
  }

  // ---------- k14: the Lenape did not get their island back; the people who built the wall were never paid ----------
  function k14(ctx, lt, dur, t) {
    const wl = since(t, 'wall'), mix = wl > -.6 ? ease.inOut(clamp((wl + .6) / 1.0)) : 0;
    ctx.save(); still(ctx, lt, dur, 1.05, 640, 400);
    if (mix < 1) { ctx.save(); ctx.globalAlpha = 1 - mix; corner(ctx, t, { m: 1 }); ctx.restore(); }
    if (mix > 0) { ctx.save(); ctx.globalAlpha = mix; dutchCorner(ctx, t, { wall: 1, grey: .55 }); for (let i = 0; i < 5; i++) { const C = '#3a3a4c', x = 140 + i * 120; walker(ctx, x, 720 + (i % 2) * 24, .5, t, i, { still: true, plain: true, coat: C, pants: C, skin: C, hair: C, shoe: C, hs: 0 }); shape(ctx, C, 0, circle(x, 720 + (i % 2) * 24 - 151, 19)); } ctx.restore(); }
    ctx.restore(); dim(ctx, .3);
    quiet(ctx, 'THE LENAPE DID NOT GET THEIR ISLAND BACK', 640, 110, since(t, 'lenape') + .2, 30);
    quiet(ctx, 'THE PEOPLE WHO BUILT THE WALL WERE NEVER PAID', 640, 640, wl, 30);
  }

  // ---------- k15: a city coming back bigger is not the same thing as everyone in it coming back ----------
  function k15(ctx, lt, dur, t) {
    ctx.save(); still(ctx, lt, dur, 1.06); corner(ctx, t, { crowd: .8, fg: false }); ctx.restore(); dim(ctx, .35);
    // a front row with gaps: dashed outlines where people are missing
    for (let i = 0; i < 7; i++) { const x = 120 + i * 175; if (i === 2 || i === 5) { ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = 'rgba(244,236,216,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, 560, 36, 40, 0, 0, 7); ctx.rect(x - 40, 600, 80, 150); ctx.stroke(); ctx.restore(); } else walker(ctx, x, 790, .62, t, i * 3 + 1, { still: true, cam: false }); }
    quiet(ctx, 'A CITY COMING BACK BIGGER', 640, 110, since(t, 'bigger') - .5, 34); quiet(ctx, 'IS NOT EVERYONE IN IT COMING BACK', 640, 170, since(t, 'everyone'), 30, '#ffb88a');
  }

  const cut = [[0, k1], [4.4, k2], [13.9, k3], [18.7, k4], [25.9, k5], [32.2, k6], [37.4, k7], [44.8, k8], [51.0, k9], [59.2, k10], [74.5, k11], [89.6, k12], [92.8, k13], [98.2, k14], [103.8, k15]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [{ t: A.weeks - .5, type: 'swell', gain: .15 }, { t: A.today - .3, type: 'swell', gain: .2 }, { t: A.office, type: 'paper', gain: .25 }, { t: A.over, type: 'paper', gain: .25 }, { t: A.leaving, type: 'paper', gain: .25 }];
  const moods = [{ t: 0, mood: 'silence' }, { t: A.today - .5, mood: 'still' }, { t: A.march - .5, mood: 'silence' }, { t: A.detail - .5, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'nyc/assets/audio/narration-aftermath.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
