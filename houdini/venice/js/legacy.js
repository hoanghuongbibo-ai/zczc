/* Venice — "Legacy and close" (narration-legacy.mp3 = 2.0 s chapter pause + narration-full.mp3 831.15–905.35 s + 1.5 s tail).
 * Anchors = full-recording word times − 829.15. Callbacks: the square at dawn (cold open), the four job hats,
 * Cassiodorus's water-fowl (job one), the horses (cold open / the bill / job four). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { q: 831.32, matter: 832.31, lagoon: 833.84, because: 835.17, already: 836.45, miami: 837.91, orleans: 839.4, norfolk: 841.0, manhattan: 842.51,
    each: 844.22, conversation: 845.35, venice: 846.12, centuries: 847.98, whatfor: 849.36, cost: 851.62, who: 854.27, stay: 854.84,
    never: 855.86, canals: 857.56, people: 859.21, swamp: 860.14, nobody: 860.63, decided: 861.87, work: 862.96,
    wall: 864.61, foundation: 865.76, highway: 867.19, stage: 868.49, everytime: 869.96, changed: 870.88, job: 871.62,
    roman: 873.43, saw: 875.32, birds: 875.54, tide: 876.62, fifteen: 877.65, later: 878.68, marble: 879.95, horses: 880.71, home: 881.34, tide2: 882.29, twice: 883.46,
    gates: 884.89, now: 886.3, harder: 887.34, answer: 890.08, cityfor: 891.27, buildings: 892.89, saved: 893.43, nobodys: 894.67, home2: 895.13,
    subscribe: 897.7, comments: 899.93, which: 900.82, next: 902.11, thanks: 904.41 };
  const A = {}; for (const k in F) A[k] = F[k] - 829.15; A.end = 77.7;

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
  function pigeon(ctx, x, y, s, t, ph, fly = 0) { ctx.save(); ctx.translate(x, y - fly * 260); ctx.scale(s, s);
    const pk = fly ? 0 : Math.max(0, Math.sin(t * 2.2 + ph)) * 10;
    shape(ctx, '#9aa0aa', 3, ellipse(0, -16, 24, 14)); shape(ctx, '#7a808a', 3, poly([[-20, -18], [-38, -10], [-20, -8]]));
    shape(ctx, '#8a909a', 3, circle(18, -30 + pk, 9)); shape(ctx, '#e8a83a', 2, poly([[26, -30 + pk], [34, -28 + pk], [26, -26 + pk]]));
    if (fly) { const wa = Math.sin(t * 22 + ph) * .9; for (const d of [-1, 1]) { ctx.save(); ctx.translate(-2, -20); ctx.rotate(d * wa - .2); shape(ctx, '#b0b6c0', 3, ellipse(0, -18 * d, 10, 26)); ctx.restore(); } }
    else { line(ctx, [[-4, -4], [-6, 4]], 2.5, '#c0605a'); line(ctx, [[6, -4], [6, 4]], 2.5, '#c0605a'); }
    ctx.restore(); }

  function arcadeSide(ctx, side, t, alpha = 1) { // the Procuratie: long arcaded buildings receding to the basilica
    const vx = 640, vy = 380, x0 = side < 0 ? -60 : W + 60, x1 = side < 0 ? 400 : 880;
    const topA = 60, botA = 660, P = (x, yNear) => { const k = (x - x0) / (x1 - x0), sc = 1 - k * .62; return vy + (yNear - vy) * sc; };
    ctx.save(); ctx.globalAlpha = alpha;
    shape(ctx, '#f0dfbf', 4.5, poly([[x0, P(x0, topA)], [x1, P(x1, topA)], [x1, P(x1, botA)], [x0, P(x0, botA)]]));
    shape(ctx, '#e2cba2', 0, poly([[x0, P(x0, 300)], [x1, P(x1, 300)], [x1, P(x1, 316)], [x0, P(x0, 316)]]));
    for (let i = 0; i < 14; i++) { const k0 = i / 14, k1 = (i + .7) / 14, xa = lerp(x0, x1, k0 * k0 * .3 + k0 * .7), xb = lerp(x0, x1, k1 * k1 * .3 + k1 * .7);
      shape(ctx, '#8a6a52', 3, poly([[xa, P(xa, 420)], [xb, P(xb, 420)], [xb, P(xb, botA - 6)], [xa, P(xa, botA - 6)]]));
      shape(ctx, '#c9a874', 2.5, poly([[xa, P(xa, 150)], [xb, P(xb, 150)], [xb, P(xb, 250)], [xa, P(xa, 250)]])); }
    ctx.restore(); }
  function lamp(ctx, x, y, s, on) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#2a2a30', 3, rect(-5, -180, 10, 180)); shape(ctx, '#2a2a30', 3, rect(-14, -12, 28, 12));
    shape(ctx, on > 0 ? '#ffe39a' : '#d8d2bc', 3.5, poly([[-16, -206], [16, -206], [12, -180], [-12, -180]])); shape(ctx, '#2a2a30', 3, poly([[-20, -206], [0, -222], [20, -206]]));
    ctx.restore(); if (on > 0) glow(ctx, x, y - 196 * s, 90 * s * 2, `rgba(255,220,140,${.55 * on})`); }
  // the whole square; o: { pave (0 stone → 1 mud), lift (buildings rise away 0..1), piles (ghost piles 0..1), marsh (0..1), lamps (0..1), horseGlow }
  function square(ctx, t, o = {}) {
    const lift = o.lift || 0, la = 1 - clamp(lift * 1.4), up = -ease.in(lift) * 300;
    // dawn sky
    shape(ctx, grad(ctx, 0, -200, 0, 460, [[0, '#6a9ed0'], [.6, '#f6c88a'], [1, '#ffe2a6']]), 0, rect(-400, -400, 2100, 900));
    glow(ctx, 900, 330, 520, 'rgba(255,236,190,.55)'); clouds(ctx, t, [70, 120], .9, '#ffeedd'); birds(ctx, t, 3, 120);
    if (o.marsh > 0) { ctx.save(); ctx.globalAlpha = o.marsh; shape(ctx, '#a8b888', 0, c => { c.moveTo(-400, 382); for (let x = -400; x <= 1700; x += 100) c.quadraticCurveTo(x + 50, 368, x + 100, 382); c.lineTo(1700, 420); c.lineTo(-400, 420); c.closePath(); }); ctx.restore(); }
    // buildings (they rise away and fade when the city is peeled back)
    if (la > 0) { ctx.save(); ctx.translate(0, up); ctx.globalAlpha = la;
      arcadeSide(ctx, -1, t); arcadeSide(ctx, 1, t);
      basilica(ctx, 640, 386, 1, t, o); campanile(ctx, 300, 400, .62);
      for (const fx of [560, 640, 720]) { line(ctx, [[fx, 410], [fx, 230]], 4, '#5a3a2a'); shape(ctx, '#c9a14a', 3, rect(fx - 8, 404, 16, 12)); shape(ctx, '#b8322a', 2.5, poly([[fx, 232], [fx + 6, 240], [fx + 5, 290], [fx, 296]])); }
      ctx.restore(); }
    // the ground: wet stone that becomes mud, then marsh water
    const pv = o.pave || 0;
    const ground = c => { c.moveTo(-400, 384); c.lineTo(1700, 384); c.lineTo(1700, 1000); c.lineTo(-400, 1000); c.closePath(); };
    shape(ctx, grad(ctx, 0, 384, 0, 720, [[0, '#b8a68e'], [1, '#8a7a68']]), 0, ground);
    // reflections of the sky and the gold in the wet stone
    ctx.save(); ctx.beginPath(); ground(ctx); ctx.clip(); ctx.globalAlpha = .35 * (1 - pv);
    shape(ctx, grad(ctx, 0, 384, 0, 720, [[0, '#ffe2a6'], [1, 'rgba(255,220,160,0)']]), 0, rect(-400, 384, 2100, 340));
    if (la > 0) { ctx.globalAlpha = .22 * (1 - pv) * la; for (const fx of [520, 640, 760]) shape(ctx, '#f6c945', 0, rect(fx - 30, 390, 60, 260)); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha = (1 - pv) * .6;
    for (let i = -16; i <= 16; i++) line(ctx, [[640 + i * 14, 384], [640 + i * 150, 760]], 2, 'rgba(70,58,46,.5)');
    for (let k = 0; k < 10; k++) { const y = 384 + Math.pow(k / 10, 1.8) * 380; line(ctx, [[-400, y], [1700, y]], 2, 'rgba(70,58,46,.4)'); }
    ctx.globalAlpha = (1 - pv) * .5; for (const [x, w] of [[400, 160], [900, 220], [640, 300]]) shape(ctx, 'rgba(255,248,230,.6)', 0, ellipse(x, 600 + (x % 3) * 30, w, 10));
    ctx.restore();
    if (pv > 0) { ctx.save(); ctx.globalAlpha = pv; shape(ctx, grad(ctx, 0, 384, 0, 720, [[0, '#8a7a52'], [1, '#6e5a3a']]), 0, ground);
      for (const [x, y, w] of [[300, 520, 180], [800, 470, 140], [1000, 620, 240], [520, 650, 200]]) shape(ctx, '#9fc4cc', 3, ellipse(x, y, w * (1 + (o.marsh || 0) * .6), 12 + (o.marsh || 0) * 10)); ctx.restore(); }
    if (o.piles > 0) { ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * clamp(o.piles)) * .8; for (let i = -14; i <= 14; i++) { const x = 640 + i * 46, sink = clamp(o.piles) * 120; shape(ctx, '#8a5a34', 3, rect(x - 9, 400 + sink + (i % 2) * 20, 18, 300)); } ctx.restore(); }
    if (la > 0) { ctx.save(); ctx.translate(0, up); ctx.globalAlpha = la; for (const [x, s] of [[200, 1], [1080, 1], [420, .7], [860, .7]]) lamp(ctx, x, 384 + (s === 1 ? 300 : 150), s, o.lamps ?? 1); ctx.restore(); }
    if (o.marsh > 0) { ctx.save(); ctx.globalAlpha = o.marsh; for (let i = 0; i < 40; i++) { const x = -60 + i * 36 + (i % 3) * 7, y = 410 + (i * 53) % 280, h = 40 + (i * 29) % 70, sw = Math.sin(t * 1.4 + i) * 5;
      line(ctx, [[x, y], [x + sw, y - h * clamp(o.marsh * 1.5)]], 5, i % 2 ? '#6f7f34' : '#5a6a2a'); } ctx.restore(); }
  }



  const still = (ctx, lt, dur, z0 = 1, z1 = 1.05, fx = 640, fy = 380) => cam(ctx, lerp(z0, z1, ease.sine(clamp(lt / dur))), fx, fy);
  function palazzo(ctx, x, y, w, h, col = '#e8b08a', win = '#4a5a6a', lit = -1) { shape(ctx, col, 4.5, rect(x, y - h, w, h)); let n = 0;
    for (let r = 0; r < Math.floor(h / 90); r++) for (let c = 0; c < Math.floor(w / 80); c++, n++) shape(ctx, n === lit ? '#ffd27a' : win, 3, c2 => { const wx = x + 24 + c * 80, wy = y - h + 26 + r * 90; c2.moveTo(wx, wy + 56); c2.lineTo(wx, wy + 18); c2.arc(wx + 18, wy + 18, 18, Math.PI, 0); c2.lineTo(wx + 36, wy + 56); c2.closePath(); });
    shape(ctx, '#b8503a', 4, rect(x - 10, y - h - 14, w + 20, 16)); }
  function person(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 3, c => { c.moveTo(-16, 0); c.lineTo(-14, -34); c.quadraticCurveTo(0, -44, 14, -34); c.lineTo(16, 0); c.closePath(); }); shape(ctx, '#f0c8a0', 3, circle(0, -52, 12)); ctx.restore(); }
  function waterLevel(ctx, y, t, x0 = -200, x1 = 1500, col = V.WATER, a = .85) { ctx.save(); ctx.globalAlpha = a; shape(ctx, col, 4, c => { c.moveTo(x0, y); for (let x = x0; x <= x1; x += 40) c.lineTo(x, y + Math.sin(x * .02 + t * 1.6) * 5); c.lineTo(x1, 1000); c.lineTo(x0, 1000); c.closePath(); }); ctx.restore(); }
  const HATS = ['helmet', 'hardhat', 'captain', 'mask'];
  const hatAt = (name, dy = 0) => (c, x, y) => V.hats[name](c, x, y + (name === 'mask' ? 30 : name === 'lifering' ? -30 : 0) - dy);

  // ---------- g1: chapter card over the square at dawn — "So why does this matter if you're never going to live on a lagoon?" ----------
  function g1(ctx, lt, dur, t) {
    const q = since(t, 'matter');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    square(ctx, t, { lamps: 1 - clamp(lt / 4) });
    for (let i = 0; i < 7; i++) { const fl = q > 1.6 + i * .08 ? ease.in(clamp((q - 1.6 - i * .08) / 1.4)) : 0; pigeon(ctx, 380 + i * 92 + (i % 2) * 30, 640 + (i % 3) * 22, .9, t, i * 1.7, fl); }
    ctx.restore();
    const out = lt > 2.0 ? clamp((lt - 2.0) / .3) : 0;
    ctx.save(); ctx.globalAlpha = 1 - out; strip(ctx, 'LEGACY', 640, 150, lt - .05, { px: 64 }); strip(ctx, 'SAME WATER, YOUR CITY', 640, 262, lt - .6, { px: 34, color: RED, rot: .02 }); ctx.restore();
    if (q > 0) { const s = pop(q); ctx.save(); ctx.translate(640, 150); ctx.scale(s, s); FX.bigText(ctx, 'WHY DOES THIS MATTER?', 0, 0, 58, { color: GOLD }); ctx.restore(); }
    if (since(t, 'lagoon') > -.6) tag(ctx, "IF YOU'LL NEVER LIVE ON A LAGOON", 640, 236, since(t, 'lagoon') + .6, 22);
    vig(ctx);
  }

  // ---------- g2: "you might already" — Miami, New Orleans, Norfolk, Lower Manhattan (US Atlantic and Gulf coast from lon/lat) ----------
  const UL = ([lon, lat]) => [40 + (lon + 98) * 37.5, 60 + (45 - lat) * 30];
  const USA = [[-66, 47], [-67, 44.8], [-68.8, 44.2], [-70.2, 43.6], [-70.8, 42.7], [-70.6, 42.0], [-70.0, 42.05], [-69.95, 41.7], [-70.5, 41.55], [-71.3, 41.5], [-72.5, 41.25], [-73.6, 41.0], [-74.0, 40.7],
    [-74.0, 40.4], [-74.1, 39.8], [-74.9, 38.95], [-75.5, 39.4], [-75.1, 38.8], [-75.05, 38.4], [-75.4, 37.9], [-75.9, 37.1], [-76.0, 36.9], [-75.8, 36.0], [-75.5, 35.3], [-76.5, 34.7], [-77.4, 34.5], [-77.9, 33.9],
    [-79.0, 33.4], [-79.9, 32.7], [-80.8, 32.1], [-81.2, 31.5], [-81.4, 30.7], [-81.3, 29.9], [-81.0, 29.2], [-80.6, 28.4], [-80.5, 27.8], [-80.1, 26.7], [-80.1, 25.9], [-80.4, 25.2], [-80.9, 25.1], [-81.2, 25.3],
    [-81.7, 25.9], [-82.0, 26.5], [-82.6, 27.5], [-82.7, 28.3], [-82.8, 29.0], [-83.6, 29.9], [-84.3, 30.05], [-85.0, 29.7], [-85.4, 29.75], [-86.2, 30.4], [-87.3, 30.35], [-88.0, 30.6], [-88.6, 30.4], [-89.4, 30.3],
    [-89.6, 30.05], [-89.2, 29.3], [-89.4, 28.95], [-90.0, 29.15], [-90.6, 29.1], [-91.5, 29.4], [-92.3, 29.55], [-93.8, 29.7], [-94.8, 29.3], [-95.6, 28.7], [-96.6, 28.1], [-97.2, 27.6], [-97.4, 26.8], [-97.2, 25.9],
    [-97.5, 25.0], [-97.8, 22.0], [-101, 22], [-101, 47]].map(UL);
  const LONGI = [[-74.0, 40.6], [-73.0, 40.7], [-71.9, 41.05], [-72.6, 40.95], [-73.7, 40.85]].map(UL);
  const CHES = [[-76.3, 37.0], [-76.05, 37.9], [-76.45, 39.25], [-76.1, 39.5], [-75.9, 38.3], [-75.98, 37.2]].map(UL);
  const CUBA = [[-84.9, 21.9], [-82, 23.2], [-80, 23.1], [-77, 21.8], [-77, 21], [-80, 21.6], [-82.5, 22.2]].map(UL);
  const CITIES = [['MIAMI', [-80.19, 25.76], 'miami', [120, 10]], ['NEW ORLEANS', [-90.07, 29.95], 'orleans', [0, 80]], ['NORFOLK', [-76.29, 36.85], 'norfolk', [130, 10]], ['LOWER MANHATTAN', [-74.0, 40.71], 'manhattan', [150, -20]]];
  function pin(ctx, x, y, k, col = RED) { if (k <= 0) return; const d = (1 - FX.settle(clamp(k / .45))) * 160; ctx.save(); ctx.translate(x, y - d);
    shape(ctx, 'rgba(0,0,0,.25)', 0, ellipse(4, d + 4, 14, 5)); shape(ctx, col, 4, c => { c.moveTo(0, 0); c.bezierCurveTo(-26, -34, -22, -62, 0, -62); c.bezierCurveTo(22, -62, 26, -34, 0, 0); c.closePath(); }); shape(ctx, '#fff', 3, circle(0, -42, 8)); ctx.restore(); }
  function g2(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 700, 400);
    shape(ctx, grad(ctx, 0, 0, W, H, [[0, '#4f9cc8'], [1, '#2f78a8']]), 0, rect(-200, -200, 1700, 1100));
    ctx.save(); ctx.globalAlpha = .18; for (let lon = -100; lon <= -64; lon += 5) line(ctx, [UL([lon, 48]), UL([lon, 18])], 2, '#fff'); for (let lat = 20; lat <= 48; lat += 5) line(ctx, [UL([-102, lat]), UL([-62, lat])], 2, '#fff'); ctx.restore();
    for (let i = 0; i < 26; i++) { const x = ((i * 173 + t * 14) % 1500) - 100, y = 120 + (i * 97) % 560; if (x > 700 || y > 560) line(ctx, [[x, y], [x + 22, y - 4], [x + 44, y]], 3, 'rgba(255,255,255,.35)'); }
    shape(ctx, '#e4d6a8', 5, poly(USA)); shape(ctx, '#e4d6a8', 4, poly(LONGI)); shape(ctx, '#e4d6a8', 4, poly(CUBA));
    ctx.save(); ctx.beginPath(); poly(USA)(ctx); ctx.clip(); shape(ctx, grad(ctx, 0, 0, 0, 700, [[0, '#a8c890'], [1, '#d8cf98']]), 0, rect(-200, -200, 1700, 1100));
    for (const [x, y, r] of [[200, 160, 90], [520, 300, 120], [300, 420, 80], [700, 150, 100]]) shape(ctx, 'rgba(110,150,90,.25)', 0, ellipse(x, y, r * 1.6, r * .6)); ctx.restore();
    shape(ctx, '#3f8cbc', 3.5, poly(CHES)); shape(ctx, '#3f8cbc', 3, ellipse(...UL([-80.8, 26.95]), 16, 12));
    line(ctx, [UL([-91.2, 36]), UL([-90.6, 33]), UL([-91.3, 31]), UL([-90.1, 30]), UL([-89.3, 29.2])], 5, '#3f8cbc');   // the Mississippi down to the delta
    txt(ctx, 'ATLANTIC OCEAN', 1080, 470, FX.FONT(700, 22), 'rgba(255,255,255,.75)'); txt(ctx, 'GULF OF MEXICO', 330, 650, FX.FONT(700, 22), 'rgba(255,255,255,.75)');
    // the four cities: a pin on each, then a little tide line lapping at it
    CITIES.forEach(([name, ll, key, off]) => { const [x, y] = UL(ll), k = since(t, key);
      if (k > 0) { for (let r = 0; r < 3; r++) { const p = ((t * .6 + r / 3) % 1); ctx.save(); ctx.globalAlpha = .55 * (1 - p) * clamp(k / .6); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 16 + p * 46, 6 + p * 18, 0, 0, 7); ctx.stroke(); ctx.restore(); } }
      pin(ctx, x, y, k); if (k > .2) tag(ctx, name, x + off[0], y + off[1] - 30, k - .2, 20); });
    ctx.restore();
    strip(ctx, 'YOU MIGHT ALREADY', 300, 92, since(t, 'already') + .2, { px: 36 });
    vig(ctx);
  }

  // ---------- g3: each of them is starting the conversation Venice has been having for fifteen centuries ----------
  function skyline(ctx, x, y, kind, t, rise) {
    const B = { miami: [[-60, 150, '#f4f0e6'], [-20, 210, '#bfe4e0'], [20, 170, '#f6d8c8'], [56, 120, '#f4f0e6']], orleans: [[-64, 80, '#e8a888'], [-22, 96, '#f0d29a'], [20, 84, '#a8c8a0'], [58, 76, '#e8b8c8']],
      norfolk: [[-60, 110, '#d8d0c0'], [-20, 140, '#c8d4dc'], [20, 100, '#e0c8a8']], manhattan: [[-62, 220, '#a8b8c8'], [-24, 270, '#c8d0d8'], [14, 200, '#98a8b8'], [50, 240, '#b8c4d0']] }[kind];
    shape(ctx, '#c8b48a', 4, rect(x - 92, y, 184, 22, 4));
    for (const [dx, h, col] of B) { shape(ctx, col, 3.5, rect(x + dx - 18, y - h, 36, h)); for (let yy = y - h + 14; yy < y - 10; yy += 22) for (const wx of [-10, 4]) shape(ctx, 'rgba(60,80,100,.55)', 0, rect(x + dx + wx, yy, 8, 10)); }
    if (kind === 'miami') { line(ctx, [[x + 80, y], [x + 86, y - 70], [x + 90, y - 110]], 7, '#8a6a3a'); for (let i = 0; i < 5; i++) { const a = -2.6 + i * .55; line(ctx, [[x + 90, y - 110], [x + 90 + Math.cos(a) * 40, y - 110 + Math.sin(a) * 26 + 14]], 8, '#4a9a4a'); } }
    if (kind === 'orleans') { for (const [dx, h] of [[-64, 80], [-22, 96], [20, 84], [58, 76]]) line(ctx, [[x + dx - 20, y - h * .45], [x + dx + 20, y - h * .45]], 3, INK); shape(ctx, '#f4efe2', 3.5, rect(x - 6, y - 150, 12, 54)); shape(ctx, '#5a6a7a', 3, poly([[x - 9, y - 150], [x, y - 178], [x + 9, y - 150]])); }
    if (kind === 'norfolk') { shape(ctx, '#8a929c', 4, poly([[x + 30, y + 4], [x + 120, y + 4], [x + 108, y + 24], [x + 40, y + 24]])); shape(ctx, '#a8b0b8', 3, rect(x + 56, y - 22, 34, 26)); line(ctx, [[x - 84, y], [x - 84, y - 130], [x - 30, y - 130]], 6, '#d8642a'); }
    if (kind === 'manhattan') { line(ctx, [[x - 24, y - 270], [x - 24, y - 310]], 4, INK); shape(ctx, '#c8d0d8', 3, poly([[x - 36, y - 270], [x - 24, y - 296], [x - 12, y - 270]])); }
    ctx.save(); ctx.globalAlpha = .85; shape(ctx, V.WATER, 3.5, c => { const wy = y + 18 - rise; c.moveTo(x - 110, wy); for (let xx = x - 110; xx <= x + 110; xx += 20) c.lineTo(xx, wy + Math.sin(xx * .05 + t * 2) * 4); c.lineTo(x + 110, y + 60); c.lineTo(x - 110, y + 60); c.closePath(); }); ctx.restore();
  }
  function g3(ctx, lt, dur, t) {
    const cv = since(t, 'conversation'), ce = since(t, 'centuries');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    sky(ctx, t, '#8fcbea', '#fbe6bc'); farShore(ctx, 560, t); waterBand(ctx, 590, t);
    const xs = [560, 740, 920, 1100], names = ['MIAMI', 'NEW ORLEANS', 'NORFOLK', 'LOWER MANHATTAN'], kinds = ['miami', 'orleans', 'norfolk', 'manhattan'];
    xs.forEach((x, i) => { const k = lt - .15 * i; if (k <= 0) return; const s = pop(k, .4); ctx.save(); ctx.translate(x, 600); ctx.scale(s, s); skyline(ctx, 0, 0, kinds[i], t, 6 + Math.sin(t * 1.4 + i) * 4 + clamp(lt / dur) * 10); ctx.restore(); tag(ctx, names[i], x, 650, k - .2, 15); });
    V.lagoon(ctx, 230, 740, 470, t, { look: [.9, -.2], eyes: blink(t, 15.9, 18.6), mouth: cv > 0 && Math.sin(t * 9) > 0 ? 'o' : 'smile', hat: hatAt('lifering') });
    // the conversation: dotted lines out from Venice, then each city's question bubble
    if (cv > -.3) xs.forEach((x, i) => { const k = clamp((cv + .3 - i * .18) / .5); if (k <= 0) return; ctx.save(); ctx.setLineDash([8, 10]); ctx.lineDashOffset = -t * 30; ctx.strokeStyle = 'rgba(29,26,23,.55)'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(300, 560); ctx.quadraticCurveTo(lerp(300, x, .5), 230, lerp(300, x, k), lerp(560, 300, k)); ctx.stroke(); ctx.restore();
      if (k >= 1) { const s = pop(cv - i * .18 - .2); ctx.save(); ctx.translate(x, 260); ctx.scale(s, s); shape(ctx, '#fff', 4, c => { c.ellipse(0, 0, 38, 30, 0, 0, 7); }); shape(ctx, '#fff', 0, poly([[-8, 24], [8, 26], [0, 44]])); txt(ctx, '?', 0, 3, FX.DISPLAY(36), RED); ctx.restore(); } });
    ctx.restore();
    strip(ctx, 'THE SAME CONVERSATION', 640, 92, since(t, 'each') + .2, { px: 36 });
    if (ce > 0) { const s = pop(ce); ctx.save(); ctx.translate(230, 200); ctx.rotate(-.05); ctx.scale(s, s); FX.bigText(ctx, '1,500 YEARS', 0, 0, 46, { color: GOLD }); ctx.restore(); }
    vig(ctx);
  }

  // ---------- g4: three questions on a signpost by a canal ----------
  function board(ctx, x, y, k, text, dir, icon) { if (k <= 0) return; const fl = FX.settle(clamp(k / .4)); ctx.save(); ctx.translate(x, y); ctx.scale(1, Math.max(.02, fl)); ctx.rotate(dir * -.025);
    const w = 500, h = 76; shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-w / 2 + 6, -h / 2 + 8, w, h)); shape(ctx, '#b8844a', 4.5, poly([[-w / 2, -h / 2], [w / 2 - (dir > 0 ? 0 : 0), -h / 2], [w / 2 + (dir > 0 ? 40 : 0), 0], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2 - (dir < 0 ? 40 : 0), 0]]));
    for (let i = 0; i < 3; i++) line(ctx, [[-w / 2 + 10, -h / 2 + 18 + i * 20], [w / 2 - 10, -h / 2 + 18 + i * 20]], 2, 'rgba(90,50,20,.35)');
    txt(ctx, text, 30, 3, FX.DISPLAY(28), '#fff8e8'); icon(ctx, -w / 2 + 44, 0); ctx.restore(); }
  const iDrop = (ctx, x, y) => shape(ctx, '#3a9ad0', 3.5, c => { c.moveTo(x, y - 24); c.bezierCurveTo(x + 22, y, x + 16, y + 20, x, y + 20); c.bezierCurveTo(x - 16, y + 20, x - 22, y, x, y - 24); c.closePath(); });
  const iCoins = (ctx, x, y) => { for (let i = 0; i < 4; i++) shape(ctx, GOLD, 3, ellipse(x, y + 14 - i * 9, 20, 7)); };
  const iKey = (ctx, x, y) => { shape(ctx, '#f0c040', 3.5, circle(x - 10, y, 12)); shape(ctx, '#b8844a', 0, circle(x - 10, y, 5)); line(ctx, [[x + 2, y], [x + 26, y], [x + 26, y + 10]], 5, '#f0c040'); line(ctx, [[x + 18, y], [x + 18, y + 8]], 5, '#f0c040'); };
  function g4(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    sky(ctx, t, '#86c4e8', '#fbe2b4');
    palazzo(ctx, -40, 470, 330, 340, '#e8b08a'); palazzo(ctx, 300, 470, 300, 380, '#f0d29a'); palazzo(ctx, 610, 470, 330, 330, '#e8c0b0'); palazzo(ctx, 950, 470, 380, 360, '#d8b890');
    shape(ctx, '#d8c8a8', 4, rect(-60, 456, 1400, 18));
    waterLevel(ctx, 480, t, -200, 1500, V.WATER, 1);
    ctx.save(); ctx.globalAlpha = .3; for (const [x, w, col] of [[120, 300, '#e8b08a'], [450, 300, '#f0d29a'], [780, 330, '#e8c0b0'], [1140, 380, '#d8b890']]) shape(ctx, col, 0, rect(x - w / 2, 500, w, 60)); ctx.restore();
    // the fondamenta: solid stone quay along the near side of the canal
    shape(ctx, grad(ctx, 0, 572, 0, 760, [[0, '#d6c6a4'], [1, '#b8a482']]), 4.5, rect(-60, 572, 1400, 300)); for (let i = 0; i < 18; i++) line(ctx, [[-60 + i * 80, 572], [-100 + i * 80, 760]], 2, 'rgba(90,70,50,.3)'); shape(ctx, '#e8dcc0', 4, rect(-60, 566, 1400, 16));
    line(ctx, [[640, 700], [640, 150]], 22, '#7a5434'); line(ctx, [[640, 700], [640, 150]], 4, INK); shape(ctx, '#6a4a2a', 4, rect(612, 686, 56, 22, 4)); shape(ctx, GOLD, 3, circle(640, 146, 12));
    board(ctx, 640, 215, since(t, 'whatfor') + .1, 'WHAT IS THIS WATER FOR?', 1, iDrop);
    board(ctx, 640, 315, since(t, 'cost') + .1, 'WHAT WILL IT COST?', -1, iCoins);
    board(ctx, 640, 415, since(t, 'who') + .1, 'WHO GETS TO STAY?', 1, iKey);
    fig(ctx, 260, 700, .3, P('villagerW', 'dressPlain', { hands: { L: [-110, -470], R: [150, -640] }, headTilt: -.06 }));
    fig(ctx, 1010, 700, .3, P('merchant', 'merchantRobe', { hands: { L: [-120, -480], R: [90, -760] } }), {});
    ctx.restore();
    vig(ctx);
  }

  // ---------- g5: Venice was never really about canals — the postcard is not the point ----------
  function g5(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, W, H, [[0, '#8ad0e8'], [1, '#f6d8a8']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [80, 640], .8);
    const k = FX.settle(clamp(lt / .5)); ctx.save(); ctx.translate(640, 380); ctx.rotate(lerp(-.2, -.03, k) + Math.sin(t * .8) * .006); ctx.scale(lerp(.6, 1, k), lerp(.6, 1, k));
    shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-470 + 12, -280 + 14, 940, 560)); shape(ctx, '#fffaf0', 4.5, rect(-470, -280, 940, 560, 4));
    ctx.save(); ctx.beginPath(); ctx.rect(-440, -250, 880, 500); ctx.clip();
    shape(ctx, grad(ctx, 0, -250, 0, 100, [[0, '#7ac0e8'], [1, '#ffe6b8']]), 0, rect(-440, -250, 880, 500));
    palazzo(ctx, -460, 70, 260, 210, '#e8a888'); palazzo(ctx, -190, 70, 220, 190, '#f0d29a'); palazzo(ctx, 40, 70, 200, 230, '#e8c0b0'); palazzo(ctx, 250, 70, 240, 200, '#d8b890');
    waterLevel(ctx, 80, t, -460, 460, '#3aa0b8', 1);
    // a gondola gliding along the canal
    const gx = lerp(-300, 260, clamp(lt / dur)); shape(ctx, '#1d1a17', 3, c => { c.moveTo(gx - 120, 130); c.quadraticCurveTo(gx, 150, gx + 120, 128); c.lineTo(gx + 136, 100); c.lineTo(gx + 110, 132); c.quadraticCurveTo(gx, 138, gx - 110, 122); c.closePath(); });
    fig(ctx, gx + 70, 130, .14, P('fisher', 'tunicPoor', { hands: { L: [40, -900], R: [80, -500] } })); line(ctx, [[gx + 76, 4], [gx + 20, 170]], 4, '#6a4a2a');
    ctx.restore();
    FX.bigText(ctx, 'GREETINGS FROM THE CANALS', 0, -200, 34, { color: '#fffaf0' }); ctx.restore();
    FX.stamp(ctx, 'NOT REALLY THE POINT', 820, 560, since(t, 'canals') - .1, { color: RED, size: 40 });
    vig(ctx);
  }

  // ---------- g6: people who looked at a swamp nobody wanted and decided the water could work for them ----------
  function g6(ctx, lt, dur, t) {
    const sw = since(t, 'nobody'), wk = since(t, 'work');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 460);
    sky(ctx, t, '#9ccce8', '#f8dcae'); farShore(ctx, 430, t);
    shape(ctx, '#a8b888', 0, rect(-200, 440, 1700, 60));
    waterLevel(ctx, 470, t, -200, 1500, '#5aa0b0', 1);
    for (const [x, y, w] of [[160, 520, 220], [1080, 500, 260], [520, 640, 180], [920, 650, 200]]) { shape(ctx, '#8a7a52', 4, ellipse(x, y, w, 26)); for (let i = 0; i < 12; i++) { const rx = x - w * .8 + i * w * .14, h = 50 + (i * 29) % 60, s = Math.sin(t * 1.3 + i) * 5; line(ctx, [[rx, y - 4], [rx + s, y - h]], 5, i % 2 ? '#6f7f34' : '#5a6a2a'); } }
    // the boat with the first lagoon families (standing in the boat)
    const bx = 640 + Math.sin(t * .5) * 10, by = 590 + Math.sin(t * 1.2) * 3;
    fig(ctx, bx - 60, by - 6, .2, P('fisher', 'tunicPoor', { hands: { L: [-120, -470], R: [240, -820] }, headTilt: -.05 }));
    fig(ctx, bx + 60, by - 6, .19, P('villagerW', 'dressPlain', { hands: { L: [-110, -470], R: [110, -470] } }));
    shape(ctx, '#7a5434', 4.5, c => { c.moveTo(bx - 170, by - 30); c.quadraticCurveTo(bx, by + 30, bx + 170, by - 30); c.lineTo(bx + 150, by + 6); c.quadraticCurveTo(bx, by + 40, bx - 150, by + 6); c.closePath(); }); line(ctx, [[bx - 160, by - 22], [bx + 160, by - 22]], 3, '#5a3a20');
    if (wk > -.4) for (let i = 0; i < 9; i++) { const k = clamp((wk + .4 - i * .07) / .6); ctx.save(); ctx.globalAlpha = .8 * k * (.6 + .4 * Math.sin(t * 3 + i)); line(ctx, [[100 + i * 130, 500 + (i % 3) * 30], [160 + i * 130, 500 + (i % 3) * 30]], 6, GOLD); ctx.restore(); }
    ctx.restore();
    if (sw > -.3) tag(ctx, 'A SWAMP NOBODY WANTED', 340, 300, sw + .3, 24);
    if (wk > 0) strip(ctx, 'MAKE THE WATER WORK', 820, 110, wk, { px: 38, color: GREEN });
    reedsFG(ctx, t); vig(ctx);
  }

  // ---------- g7: A wall. A foundation. A highway. A stage. Every time the world changed, they changed the job. (the four hats) ----------
  function g7(ctx, lt, dur, t) {
    const ks = ['wall', 'foundation', 'highway', 'stage'].map(k => since(t, k)), ev = since(t, 'everytime'), jb = since(t, 'job');
    let cur = -1; ks.forEach((k, i) => { if (k > -.1) cur = i; });
    let hat = cur >= 0 ? HATS[cur] : null, drop = cur >= 0 ? FX.dropBounce(ks[cur] + .1, 260, .3) : 0;
    if (ev > 0 && jb < .2) { hat = HATS[Math.floor(ev / .3) % 4]; drop = 0; }
    if (jb >= .2) { hat = 'lifering'; drop = FX.dropBounce(jb - .2, 260, .3); }
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 440);
    sky(ctx, t, '#8ccbea', '#fbe6bc'); farShore(ctx, 540, t); waterBand(ctx, 570, t);
    ctx.save(); ctx.translate(140, -60); basilica(ctx, 0, 600, .35, t); ctx.restore(); ctx.save(); campanile(ctx, 1150, 560, .45); ctx.restore();
    V.lagoon(ctx, 640, 720, 560, t, { look: ev > 0 && jb < 0 ? [Math.sin(t * 6), -.3] : [0, -.5], eyes: blink(t, 37.5, 41.2), mouth: 'smile', hat: hat ? hatAt(hat, drop) : null });
    if (ev > 0) { const s = pop(ev), sp = t * 3; ctx.save(); ctx.translate(1100, 360); ctx.scale(s, s); shape(ctx, '#4f9cc8', 5, circle(0, 0, 70)); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.clip();
      for (let i = 0; i < 4; i++) { const x = ((i * 70 + sp * 30) % 280) - 140; shape(ctx, '#8ac070', 3, ellipse(x, -20 + (i % 2) * 40, 30, 18)); } ctx.restore(); line(ctx, [[0, -86], [0, 86]], 4, INK); ctx.restore(); }
    ctx.restore();
    const lab = ['A WALL', 'A FOUNDATION', 'A HIGHWAY', 'A STAGE'];
    ks.forEach((k, i) => strip(ctx, lab[i], 170 + i * 314, 100, k + .05, { px: 30, rot: i % 2 ? .02 : -.02 }));
    if (since(t, 'changed') > 0) strip(ctx, 'THEY CHANGED THE JOB', 560, 250, since(t, 'job') + .1, { px: 40, color: RED });
    vig(ctx);
  }

  // ---------- g8: a Roman official once looked at them and saw birds nesting on the tide ----------
  function duck(ctx, x, y, s, t, ph) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6 + ph) * 3); ctx.scale(s, s);
    shape(ctx, '#7a5434', 3, ellipse(0, 6, 46, 14)); for (let i = 0; i < 6; i++) line(ctx, [[-40 + i * 16, 0], [-30 + i * 16, 14]], 3, '#5a3a20');
    shape(ctx, '#8a7a6a', 3.5, ellipse(0, -12, 30, 16)); shape(ctx, '#2f6a4a', 3.5, circle(26, -30, 12)); shape(ctx, '#e8a83a', 2.5, poly([[36, -30], [50, -27], [36, -24]])); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(30, -33, 2.2, 0, 7); ctx.fill(); ctx.restore(); }
  function hut(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const dx of [-40, -10, 20, 50]) line(ctx, [[dx, 0], [dx, 60]], 7, '#6a4a2a');
    shape(ctx, '#b8946a', 4, rect(-60, -50, 120, 54)); shape(ctx, '#d8c48a', 4, poly([[-76, -46], [0, -100], [76, -46]])); for (let i = 0; i < 6; i++) line(ctx, [[-60 + i * 22, -50], [-50 + i * 20, -92 + Math.abs(i - 3) * 8]], 2, 'rgba(90,60,20,.4)'); shape(ctx, '#4a3a2a', 3, rect(-14, -36, 28, 40)); ctx.restore(); }
  function g8(ctx, lt, dur, t) {
    const bd = since(t, 'birds');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 760, 440);
    sky(ctx, t, '#a8cce0', '#fad8a0'); farShore(ctx, 440, t); waterLevel(ctx, 460, t, -200, 1500, '#5aa8b8', 1);
    hut(ctx, 820, 470, .9); hut(ctx, 1040, 480, .7); hut(ctx, 640, 480, .6);
    for (const [x, y, s, ph] of [[700, 560, .9, 0], [900, 600, 1, 1.3], [1120, 580, .8, 2.1], [560, 640, .8, .7]]) duck(ctx, x, y, s, t, ph);
    // the jetty Cassiodorus stands on
    for (const x of [40, 160, 280, 380]) line(ctx, [[x, 610], [x, 760]], 12, '#5a3a20'); shape(ctx, '#9a7048', 4.5, rect(-80, 596, 500, 24)); for (let i = 0; i < 9; i++) line(ctx, [[-80 + i * 56, 598], [-80 + i * 56, 618]], 2, 'rgba(60,40,20,.5)');
    fig(ctx, 240, 600, .32, P('cassiodorus', 'roman', { hands: { L: [-90, -560], R: [260, -760] }, lean: .05 }));
    ctx.restore();
    FX.dateTag(ctx, 'c. AD 537');
    if (bd > -.2) strip(ctx, 'BIRDS NESTING ON THE TIDE', 760, 130, bd + .2, { px: 34 });
    reedsFG(ctx, t, 6); vig(ctx);
  }

  // ---------- g9: fifteen hundred years later the nest is marble, the horses are home, the tide still comes in twice a day ----------
  function g9(ctx, lt, dur, t) {
    const lf = since(t, 'later'), mb = since(t, 'marble'), hs = since(t, 'horses'), td = since(t, 'tide2');
    const grow = ease.inOut(clamp((lf + .4) / (A.marble - A.later + .6)));
    const z = T.keys(t, [[A.marble, 1], [A.horses, 1.28], [A.tide2 - .1, 1.28], [A.tide2 + .9, 1.04]]), fy = T.keys(t, [[A.marble, 380], [A.horses, 280], [A.tide2 - .1, 280], [A.tide2 + .9, 470]]);
    ctx.save(); cam(ctx, z, 640, fy);
    square(ctx, t, { lift: 1 - grow, marsh: 1 - grow, pave: 1 - grow, lamps: 0, horseGlow: i => hs > i * .15 ? clamp((hs - i * .15) / .4) * (.8 + .2 * Math.sin(t * 3 + i)) : 0 });
    if (td > 0) { const k = (1 - Math.cos(td * 1.1)) * .5; ctx.save(); ctx.globalAlpha = .75 * clamp(td / .6); for (const [x, y, w] of [[420, 520, 200], [820, 560, 260], [640, 660, 320], [240, 640, 180], [1040, 650, 220]]) { shape(ctx, 'rgba(130,190,210,.85)', 3, ellipse(x, y, w * (.3 + .7 * k), 10 + 8 * k)); shape(ctx, 'rgba(255,240,200,.6)', 0, ellipse(x - w * .2 * k, y - 2, w * .3 * k, 3)); } ctx.restore(); }
    ctx.restore();
    if (mb > 0) tag(ctx, 'THE NEST IS MARBLE', 270, 110, mb, 24); if (hs > .2) tag(ctx, 'THE HORSES ARE HOME', 640, 120, hs - .2, 26); if (td > .2) tag(ctx, 'HIGH TIDE: STILL TWICE A DAY', 960, 110, since(t, 'twice'), 22);
    vig(ctx);
  }

  // ---------- g10: the gates can hold the sea for now; the harder question ----------
  function g10(ctx, lt, dur, t) {
    const nw = since(t, 'now'), hq = since(t, 'harder');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 420);
    shape(ctx, grad(ctx, 0, 0, 0, 520, [[0, '#4a5a8c'], [.6, '#d88a6a'], [1, '#f6c08a']]), 0, rect(-200, -200, 1700, 800)); glow(ctx, 900, 380, 400, 'rgba(255,200,140,.45)'); clouds(ctx, t, [90, 150], .55, '#f8d8c8');
    // the raised barrier seen head-on from the lagoon side: the sea is higher behind it
    waterLevel(ctx, 330, t * 1.6, -200, 1500, '#2f6a8a', 1);
    for (let i = 0; i < 26; i++) { const x = -40 + i * 52; shape(ctx, '#f2c232', 3.5, poly([[x, 330], [x + 50, 330], [x + 46, 420], [x + 4, 420]])); line(ctx, [[x + 10, 360], [x + 40, 360]], 2.5, 'rgba(120,80,0,.4)'); }
    for (let i = 0; i < 9; i++) { const p = (t * .8 + i / 9) % 1, x = 60 + i * 140; ctx.save(); ctx.globalAlpha = .8 * (1 - p); shape(ctx, '#fff', 0, circle(x + p * 20, 330 - Math.sin(p * Math.PI) * 50, 8 + p * 10)); ctx.restore(); }
    waterLevel(ctx, 430, t, -200, 1500, '#4a9ab8', 1);
    // hourglass on a stone mooring post in the foreground
    const sand = clamp(lt / dur);
    shape(ctx, '#c8b8a0', 4.5, rect(960, 560, 150, 260, 6)); shape(ctx, '#e0d2b8', 4.5, rect(944, 548, 182, 24, 4));
    ctx.save(); ctx.translate(1035, 548); shape(ctx, '#7a5434', 4, rect(-62, -14, 124, 14)); shape(ctx, '#7a5434', 4, rect(-62, -224, 124, 14)); for (const dx of [-54, 54]) line(ctx, [[dx, -212], [dx, -14]], 8, '#7a5434');
    shape(ctx, 'rgba(220,240,250,.55)', 3.5, poly([[-44, -210], [44, -210], [6, -116], [44, -16], [-44, -16], [-6, -116]]));
    shape(ctx, '#e8c070', 0, poly([[-44 + 38 * sand, -210 + 94 * sand], [44 - 38 * sand, -210 + 94 * sand], [0, -118]])); shape(ctx, '#e8c070', 0, poly([[-44, -16], [44, -16], [0, -16 - 70 * sand]])); line(ctx, [[0, -118], [0, -18]], 2, '#e8c070'); ctx.restore();
    V.lagoon(ctx, 400, 725, 440, t, { look: hq > 0 ? [0, -.9] : [.8, -.4], eyes: blink(t, 57.8, 60.6), mouth: hq > 0 ? 'o' : 'flat', hat: hatAt('lifering') });
    if (hq > 0) { const s = pop(hq, .5), b = Math.sin(t * 2) * 6; ctx.save(); ctx.translate(640, 230 + b); ctx.scale(s, s); FX.bigText(ctx, '?', 0, 0, 150, { color: '#fff8e8' }); ctx.restore(); }
    ctx.restore();
    if (nw > -.3) strip(ctx, 'FOR NOW', 1035, 270, nw + .3, { px: 40, color: RED, rot: .03 });
    strip(ctx, 'THE GATES HOLD THE SEA', 360, 92, lt - .15, { px: 32 });
    vig(ctx);
  }

  // ---------- g11: (tone shift, music out) what is a city for, when the buildings are saved and almost nobody's home? ----------
  function g11(ctx, lt, dur, t) {
    const sv = since(t, 'saved'), nb = since(t, 'nobodys'), cf = since(t, 'cityfor');
    ctx.save(); still(ctx, lt, dur, 1, 1.07, 820, 360);
    shape(ctx, grad(ctx, 0, 0, 0, 500, [[0, '#0e1a34'], [1, '#2a3a5e']]), 0, rect(-200, -200, 1700, 900));
    for (let i = 0; i < 40; i++) { const x = (i * 211) % 1400, y = 20 + (i * 97) % 260; ctx.save(); ctx.globalAlpha = .4 + .4 * Math.sin(t * 2 + i); shape(ctx, '#fff', 0, circle(x, y, 1.6 + (i % 3) * .6)); ctx.restore(); }
    shape(ctx, '#f4ecd0', 0, circle(1120, 110, 34)); glow(ctx, 1120, 110, 130, 'rgba(240,230,200,.25)');
    const rows = [[-40, 300, 360, '#8a7a8a'], [270, 280, 400, '#9a8a78'], [560, 320, 340, '#8a7a70'], [890, 300, 380, '#9a8a8a'], [1200, 260, 330, '#8a7a7a']];
    rows.forEach(([x, w, h, col], i) => palazzo(ctx, x, 520, w, h, col, '#1c2438', i === 3 ? 5 : -1));
    if (sv > 0) for (let i = 0; i < 5; i++) sparkle(ctx, 80 + i * 280, 260 + (i % 2) * 80, (sv - i * .15) / .9, .6);
    // the one lit window: a single resident's silhouette
    glow(ctx, 1044, 334, 90, 'rgba(255,200,120,.35)'); shape(ctx, '#3a2a20', 0, c => { c.arc(1062, 330, 8, 0, 7); }); shape(ctx, '#3a2a20', 0, rect(1054, 338, 16, 18));
    waterLevel(ctx, 530, t * .5, -200, 1500, '#1a2a44', 1);
    ctx.save(); ctx.globalAlpha = .35; ctx.translate(0, 1060); ctx.scale(1, -1); rows.forEach(([x, w, h, col]) => shape(ctx, col, 0, rect(x, 520 - h * .3, w, h * .3))); ctx.restore();
    ctx.save(); ctx.globalAlpha = .6; for (let i = 0; i < 6; i++) line(ctx, [[1040 + Math.sin(t + i) * 8, 560 + i * 18], [1080 + Math.sin(t + i) * 8, 560 + i * 18]], 3, '#ffcf80'); ctx.restore();
    ctx.restore();
    if (cf > 0) { ctx.save(); ctx.globalAlpha = clamp(cf / .8); txt(ctx, 'WHAT IS A CITY FOR?', 640, 110, FX.DISPLAY(48), '#f4ecd0'); ctx.restore(); }
    if (nb > 0) { ctx.save(); ctx.globalAlpha = clamp(nb / .8); txt(ctx, "…WHEN ALMOST NOBODY'S HOME", 640, 650, FX.DISPLAY(32), '#f4ecd0'); ctx.restore(); }
    vig(ctx, .7);
  }

  // ---------- g12: subscribe; which city is next in line? thanks for watching ----------
  function g12(ctx, lt, dur, t) {
    const sb = since(t, 'subscribe'), cm = since(t, 'comments'), wh = since(t, 'which'), th = since(t, 'thanks');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 420);
    sky(ctx, t, '#86cdee', '#fde6b6'); farShore(ctx, 560, t); waterBand(ctx, 590, t);
    ctx.save(); ctx.translate(-380, 30); basilica(ctx, 640, 560, .38, t); ctx.restore(); campanile(ctx, 120, 590, .4);
    ctx.save(); ctx.translate(380, 30); for (let i = 0; i < 4; i++) palazzo(ctx, 600 + i * 70, 560, 64, 180 + (i % 2) * 40, ['#e8b08a', '#f0d29a', '#e8c0b0', '#d8b890'][i]); ctx.restore();
    V.lagoon(ctx, 640, 730, 480, t, { look: wh > 0 ? [0, -.8] : [0, -.3], eyes: blink(t, 70.2, 74.0), mouth: 'smile', hat: (c, x, y) => { V.hats.lifering(c, x, y - 30); } });
    // subscribe button, then it tucks into the corner
    if (sb > -.2) { const tuck = cm > 0 ? ease.inOut(clamp(cm / .6)) : 0, s = pop(sb + .2) * lerp(1, .55, tuck), press = sb > .8 && sb < 1.1 ? .92 : 1;
      ctx.save(); ctx.translate(lerp(640, 1110, tuck), lerp(330, 650, tuck)); ctx.scale(s * press, s * press); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-176, -42, 360, 92, 20)); shape(ctx, sb > 1 ? '#7a7a7a' : '#d8282a', 4.5, rect(-180, -48, 360, 92, 20));
      txt(ctx, sb > 1 ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 0, FX.DISPLAY(38), '#fff'); ctx.restore();
      if (sb > .3 && sb < 1.6 && cm < 0) { const hx = lerp(900, 680, ease.out(clamp((sb - .3) / .5))), hy = lerp(560, 352, ease.out(clamp((sb - .3) / .5))); shape(ctx, '#fff', 3.5, poly([[hx, hy], [hx + 14, hy + 46], [hx + 24, hy + 32], [hx + 42, hy + 52], [hx + 50, hy + 44], [hx + 32, hy + 26], [hx + 48, hy + 20]])); } }
    if (cm > 0) { const s = pop(cm, .4); ctx.save(); ctx.translate(640, 310); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-354, -84, 720, 180, 18)); shape(ctx, '#fffaf0', 4.5, rect(-360, -90, 720, 180, 18)); shape(ctx, '#fffaf0', 0, poly([[-40, 88], [30, 88], [-30, 130]])); line(ctx, [[-40, 90], [-30, 130], [30, 90]], 4.5);
      txt(ctx, 'WHICH CITY IS NEXT IN LINE?', 0, -38, FX.DISPLAY(36)); ctx.restore();
      ['MIAMI', 'NEW ORLEANS', 'NORFOLK', 'MANHATTAN', 'YOUR CITY?'].forEach((n, i) => { const k = wh - .1 - i * .22; if (k <= 0) return; const e = FX.settle(clamp(k / .35)); ctx.save(); ctx.translate(lerp(640, 380 + i * 130, e), 340); ctx.rotate((i - 2) * .04); ctx.scale(e, e);
        shape(ctx, i === 4 ? GOLD : '#e8f0f4', 3.5, rect(-60, -22, 120, 44, 8)); txt(ctx, n, 0, 2, FX.FONT(800, n.length > 9 ? 13 : 16)); ctx.restore(); }); }
    ctx.restore();
    if (th > 0) strip(ctx, 'THANKS FOR WATCHING', 640, 92, th, { px: 46, color: RED });
    vig(ctx);
  }

  const cut = [[0, g1], [6.0, g2], [15.0, g3], [20.1, g4], [26.6, g5], [29.6, g6], [35.3, g7], [44.15, g8], [48.4, g9], [55.5, g10], [61.95, g11], [67.4, g12]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .6 }, { t: .65, type: 'paper', gain: .4 }, { t: A.matter, type: 'thud', gain: .5 }, { t: A.matter + 1.6, type: 'whoosh', gain: .3 },
    { t: A.already, type: 'paper', gain: .4 }, { t: A.miami, type: 'click', gain: .5 }, { t: A.orleans, type: 'click', gain: .5 }, { t: A.norfolk, type: 'click', gain: .5 }, { t: A.manhattan, type: 'click', gain: .5 },
    { t: A.each, type: 'paper', gain: .4 }, { t: A.conversation, type: 'whoosh', gain: .3 }, { t: A.centuries, type: 'thud', gain: .5 },
    { t: A.whatfor, type: 'creak', gain: .4 }, { t: A.cost, type: 'creak', gain: .4 }, { t: A.who, type: 'creak', gain: .4 }, { t: 26.6, type: 'whoosh', gain: .4 }, { t: A.canals, type: 'thud', gain: .7 },
    { t: A.nobody, type: 'paper', gain: .4 }, { t: A.work, type: 'swell', gain: .4 },
    { t: A.wall, type: 'thud', gain: .5 }, { t: A.foundation, type: 'thud', gain: .5 }, { t: A.highway, type: 'thud', gain: .5 }, { t: A.stage, type: 'thud', gain: .5 }, { t: A.everytime, type: 'ratchet', gain: .4 }, { t: A.job + .2, type: 'thud', gain: .5 },
    { t: A.birds, type: 'paper', gain: .4 }, { t: A.later, type: 'swell', gain: .4 }, { t: A.horses, type: 'click', gain: .4 }, { t: A.tide2, type: 'splash', gain: .3 },
    { t: A.gates, type: 'swell', gain: .4 }, { t: A.now, type: 'thud', gain: .5 }, { t: A.harder, type: 'whoosh', gain: .3 },
    { t: A.subscribe, type: 'click', gain: .5 }, { t: A.subscribe + .95, type: 'click', gain: .6 }, { t: A.comments, type: 'paper', gain: .4 }, { t: A.which, type: 'paper', gain: .3 }, { t: A.thanks, type: 'thud', gain: .5 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.because - .3, mood: 'under' }, { t: A.roman - .3, mood: 'mystery' }, { t: A.later - .3, mood: 'still' }, { t: A.cityfor - .5, mood: 'silence' }, { t: A.subscribe - .6, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-legacy.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
