/* The Maya — Beat 6 "The twist: the stones were talking" (narration-stones.mp3 = 1.8 s chapter pause + narration-full.mp3 633.35–744.3 s + 1.2 s tail).
 * Anchors = full-recording word times − 631.55. The old 'peaceful stargazers' picture; Knorozov (1952, syllables, Cold War); Proskouriakoff (1960, Piedras Negras, lifespans); boasts and trash talk; the stones go quiet. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { picture: 636.53, gentle: 638.0, stars: 640.26, carving: 641.09, no: 643.4, wars: 643.6, politics: 645.06, calm: 647.0, dates: 649.22, and1: 650.17, unreadable: 651.85, numbers: 653.72, door: 655.98, then: 656.92, outsiders: 657.85, lock: 658.81, in1: 659.86, ignore: 663.05, published: 663.92, pictures: 666.78, many: 668.52, sounds: 669.59, bubbles: 670.85, out: 672.46, it: 673.37, cold: 673.71, brush: 675.94, meanwhile: 677.36, pro: 678.63, siberia: 680.2, pennsylvania: 681.5, architect: 683.08, salary: 685.99, was: 687.0, necklace: 690.38, she: 692.3, clusters: 694.15, lifespan: 695.9, birth: 697.2, coronation: 698.11, anniversaries: 699.26, death: 700.68, in2: 701.83, published2: 703.08, conclusion: 703.61, astronomy: 705.34, stories: 707.59, kings: 708.82, so: 709.89, gone: 711.93, human: 715.19, boosting: 716.83, capturing: 717.82, marrying: 719.17, grudges: 721.2, generations: 721.93, the2: 723.47, press: 724.7, trash: 726.67, thats: 728.02, fire: 728.96, rabbit: 731.52, name: 734.48, and2: 735.68, hundred: 739.86, lands: 741.36, quiet: 743.63 };
  const A = {}; for (const k in F) A[k] = F[k] - 631.55; A.end = 113.95;
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
  const imgFrame = (ctx, key, x, y, w, h, k, label) => { const im = T.IMG[key]; if (im) N.frame(ctx, im, x, y, w, h, k, label); };
  function cross(ctx, x, y, k, r = 70) { if (k <= 0) return; const e = clamp(k / .3); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = '#e8322a';
    ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * clamp(e * 2), y - r + 2 * r * clamp(e * 2)); if (e > .5) { ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * clamp(e * 2 - 1), y - r + 2 * r * clamp(e * 2 - 1)); } ctx.stroke(); ctx.restore(); }
  // the two code-breakers
  function knorozov(ctx, x, y, s, t, o = {}) { N.walker(ctx, x, y, s, t, 3, Object.assign({ coat: '#2a2a34', pants: '#1d1d24', skin: '#ecc8a8', hair: '#1d1a17', hs: 0, shoe: '#1d1a17', still: true }, o));
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) line(ctx, [[d * 6, -320], [d * 22, -316]], 4); // stern brows
    if (o.cat !== false) { shape(ctx, '#f0e6d4', 3.5, ellipse(0, -176, 54, 30)); shape(ctx, '#f0e6d4', 3.5, circle(-50, -200, 24)); shape(ctx, '#5a3a2a', 0, ellipse(-50, -196, 14, 12)); shape(ctx, '#5a3a2a', 3, poly([[-68, -216], [-62, -240], [-52, -220]])); shape(ctx, '#5a3a2a', 3, poly([[-46, -220], [-36, -240], [-32, -214]]));
      for (const d of [-1, 1]) { shape(ctx, '#7ac8f0', 0, ellipse(-50 + d * 8, -204, 4, 3)); } line(ctx, [[50, -170], [80, -150], [90, -170]], 8, '#5a3a2a'); for (const px of [-30, 30]) shape(ctx, '#5a3a2a', 2, ellipse(px, -150, 10, 7)); }
    ctx.restore(); }
  function tatiana(ctx, x, y, s, t, o = {}) { N.walker(ctx, x, y, s, t, 7, Object.assign({ coat: '#7a6a9a', pants: '#ecc8a8', skin: '#ecc8a8', hair: '#3a2a20', hs: 4, shoe: '#5a3a2a', still: true }, o));
    ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); shape(ctx, '#5a4a6a', 3.5, poly([[-38, -132], [38, -132], [46, -40], [-46, -40]])); for (let i = 0; i < 9; i++) shape(ctx, '#f8f4ea', 1.5, circle(-20 + i * 5, -246 + Math.abs(i - 4) * 3, 3.5)); ctx.restore(); }
  function glyph(ctx, x, y, s, kind, col = '#3a2e24', bg = '#d8cdb4') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, bg, 3.5, rect(-50, -50, 100, 100, 22));
    if (kind === 'ka') { shape(ctx, col, 2.5, smooth([[-30, 20], [-34, -14], [-10, -34], [20, -30], [34, -6], [22, 22]])); for (const d of [-14, 6]) shape(ctx, bg, 0, circle(d, -8, 7)); line(ctx, [[-20, 26], [20, 26]], 4, col); }
    else if (kind === 'wa') { shape(ctx, col, 2.5, ellipse(0, 0, 32, 26)); line(ctx, [[-20, -4], [20, -4]], 4, bg); for (let i = 0; i < 3; i++) shape(ctx, bg, 0, circle(-14 + i * 14, 10, 5)); }
    else if (kind === 'num') { for (let b = 0; b < 2; b++) shape(ctx, col, 0, rect(-36, 10 - b * 16, 72, 10, 4)); for (let d = 0; d < 3; d++) shape(ctx, col, 0, circle(-20 + d * 20, -20, 6)); }
    else { const r = (kind.charCodeAt(0) * 7) % 5; shape(ctx, col, 2.5, smooth([[-30, 24], [-36, -10 + r * 2], [-12, -32], [18, -34 + r], [34, -4], [24, 26]])); shape(ctx, bg, 0, circle(-6 + r * 2, -6, 8)); line(ctx, [[-22, 14], [22, 14 - r * 2]], 4, bg); }
    ctx.restore(); }
  function padlock(ctx, x, y, s, open = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.save(); ctx.translate(26, -40); ctx.rotate(-open * .9); ctx.translate(-26, 40); ctx.lineWidth = 14; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(0, -40, 26, Math.PI, 0); ctx.lineTo(26, -10); ctx.moveTo(-26, -40); ctx.lineTo(-26, -10); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#a8a8b0'; ctx.stroke(); ctx.restore();
    shape(ctx, '#e8b83a', 5, rect(-44, -14, 88, 70, 10)); shape(ctx, INK, 0, circle(0, 14, 9)); shape(ctx, INK, 0, rect(-4, 14, 8, 22)); ctx.restore(); }

  // ---------- g1: the old picture — gentle priest-astronomers staring at the stars, carving calendar math ----------
  function oldPicture(ctx, t, x, y, s, torn = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-370, -236, 760, 490)); shape(ctx, '#c8a040', 6, rect(-380, -246, 760, 492, 6)); shape(ctx, '#e8c860', 3, rect(-364, -230, 728, 460));
    ctx.save(); ctx.beginPath(); ctx.rect(-350, -216, 700, 432); ctx.clip();
    shape(ctx, grad(ctx, 0, -216, 0, 216, [[0, '#2a3a6a'], [.7, '#8a7ab0'], [1, '#e8c8a0']]), 0, rect(-350, -216, 700, 432));
    for (let i = 0; i < 40; i++) shape(ctx, '#fff8e0', 0, circle(-340 + (i * 97) % 680, -200 + (i * 53) % 220, 1.6 + (i % 3)));
    // a round observatory tower and a calm priest with sighting sticks
    shape(ctx, '#d8cdb4', 3.5, rect(-260, 0, 240, 216)); shape(ctx, '#e0d4b8', 3.5, rect(-220, -110, 160, 110)); shape(ctx, '#e0d4b8', 3.5, c => { c.ellipse(-140, -110, 80, 60, 0, Math.PI, 0); c.closePath(); }); shape(ctx, '#2a2024', 2, rect(-150, -150, 20, 30, 4));
    king(ctx, 120, 190, .5, t, { coat: '#f4ecd6', cape: '#d8c8e8', plume: '#c8b8e8', reach: true }); line(ctx, [[180, 40], [260, -120]], 4, '#6a4a2a'); line(ctx, [[196, 40], [276, -110]], 4, '#6a4a2a');
    ctx.restore();
    if (torn > 0) { ctx.save(); ctx.globalAlpha = clamp(torn); shape(ctx, '#3a2e24', 0, poly([[-40, -246], [30, -120], [-20, 0], [40, 120], [0, 246], [30, 246], [70, 120], [10, 0], [60, -120], [-10, -246]])); ctx.restore(); }
    ctx.restore(); }
  function g1(ctx, lt, dur, t) {
    deskBg(ctx, t);
    oldPicture(ctx, t, 640, 380, .95);
    strip(ctx, 'THE OLD PICTURE', 640, 70, since(t, 'picture') + .2, { px: 36 });
    tag(ctx, 'GENTLE PRIEST-ASTRONOMERS', 330, 640, since(t, 'gentle'), 22); tag(ctx, 'STARING AT THE STARS', 640, 690, since(t, 'stars'), 22); tag(ctx, 'CARVING CALENDAR MATH', 950, 640, since(t, 'carving'), 22);
    if (lt < 2.1) { const a = clamp((2.1 - lt) / .3); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(20,20,30,.45)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 6 · THE TWIST', 640, 260, lt - .05, { px: 30 }); strip(ctx, 'THE STONES WERE TALKING', 640, 350, lt - .35, { px: 56, color: '#2f4a8a', rot: .02 }); ctx.restore(); }
    vig(ctx);
  }

  // ---------- g2: no wars, no politics — just very calm people who were very into dates ----------
  function g2(ctx, lt, dur, t) {
    deskBg(ctx, t);
    const ic = (x, key, lab, draw) => { const k = since(t, key) + .2; if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, 330); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, circle(6, 8, 110)); shape(ctx, '#fbf6ea', 5, circle(0, 0, 110)); draw(); ctx.restore(); cross(ctx, x, 330, k - .3, 90); tag(ctx, lab, x, 480, k, 24); };
    ic(260, 'wars', 'NO WARS', () => { line(ctx, [[-60, 60], [60, -60]], 10, '#6a4a2a'); line(ctx, [[60, 60], [-60, -60]], 10, '#6a4a2a'); for (const [a, b] of [[60, -60], [-60, -60]]) shape(ctx, '#9a9aa8', 3, poly([[a, b], [a + (a > 0 ? 14 : -14), b - 20], [a - (a > 0 ? 6 : -6), b - 4]])); });
    ic(640, 'politics', 'NO POLITICS', () => { shape(ctx, '#8a5a34', 4, rect(-50, -10, 100, 70, 6)); shape(ctx, '#c8a040', 3, rect(-60, -20, 120, 16, 4)); line(ctx, [[0, -20], [0, -70]], 5, '#3a3a3a'); shape(ctx, '#3a3a3a', 3, circle(0, -76, 12)); });
    imgFrame(ctx, 'dresden', 1020, 340, 170, 360, since(t, 'calm') + .1, 'DRESDEN CODEX');
    if (since(t, 'dates') > 0) strip(ctx, 'VERY INTO DATES', 1020, 110, since(t, 'dates'), { px: 34, color: '#2f4a8a' });
    vig(ctx);
  }

  // ---------- g3: the carvings were mostly unreadable — numbers yes, words locked ----------
  function g3(ctx, lt, dur, t) {
    deskBg(ctx, t);
    ctx.save(); ctx.translate(640, 360); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-392, -226, 800, 460)); shape(ctx, '#bcae90', 5, rect(-400, -234, 800, 460, 14));
    const K = ['num', 'xa', 'num', 'mo', 'za', 'num', 'qe', 'lu', 'num', 'ri', 'by', 'num'];
    const nk = since(t, 'numbers'), wk = since(t, 'door');
    for (let i = 0; i < 12; i++) { const x = -300 + (i % 4) * 200, y = -150 + Math.floor(i / 4) * 150, isN = K[i] === 'num'; const lit = isN && nk > 0, dim = !isN && wk > -.6;
      glyph(ctx, x, y, 1.1, K[i], '#3a2e24', lit ? '#b8e8a8' : dim ? '#a8a090' : '#d8cdb4'); if (lit) { line(ctx, [[x + 30, y + 40], [x + 40, y + 52], [x + 60, y + 24]], 6, '#2f7a46'); } }
    ctx.restore();
    if (wk > -.6) padlock(ctx, 1080, 560, .9 * pop(wk + .6));
    if (since(t, 'unreadable') > 0) strip(ctx, 'MOSTLY UNREADABLE', 640, 70, since(t, 'unreadable'), { px: 36 });
    if (nk > 0) tag(ctx, 'NUMBERS: READABLE', 250, 650, nk, 24); if (wk > -.2) tag(ctx, 'WORDS: LOCKED', 900, 650, wk + .2, 24);
    vig(ctx);
  }

  // ---------- g4: then two outsiders picked the lock ----------
  function g4(ctx, lt, dur, t) {
    deskBg(ctx, t);
    const ok = clamp((since(t, 'lock') + .2) / .5); padlock(ctx, 640, 380, 2.2, ease.out(ok));
    for (const [d, col] of [[-1, '#2a2a34'], [1, '#7a6a9a']]) { const k = clamp((since(t, 'outsiders') + .3) / .6); ctx.save(); ctx.globalAlpha = k; ctx.translate(640 + d * lerp(500, 330, ease.out(k)), 560); ctx.scale(d, 1); shape(ctx, col, 4, c => { c.ellipse(0, -160, 60, 70, 0, 0, 7); }); shape(ctx, col, 4, rect(-70, -90, 140, 200, 30)); ctx.restore(); }
    if (ok > 0) for (let i = 0; i < 8; i++) sparkle(ctx, 640 + Math.cos(i) * 180, 360 + Math.sin(i) * 140, ok * 1.2 - i * .05, 1);
    strip(ctx, 'TWO OUTSIDERS', 640, 90, since(t, 'outsiders'), { px: 40 }); if (ok > .5) tag(ctx, 'PICKED THE LOCK', 640, 650, ok, 28);
    vig(ctx);
  }

  // ---------- g5: 1952 — a young Soviet scholar, Yuri Knorozov: many glyphs stand for sounds ----------
  function study(ctx, t) { shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#6a5a4a'], [1, '#4a3e34']]), 0, rect(0, 0, W, H)); for (let i = 0; i < 8; i++) shape(ctx, mix('#8a3a2a', '#3a5a8a', (i % 3) / 2), 2, rect(60 + i * 40, 120, 34, 160, 3)); shape(ctx, '#6a4a2a', 4, rect(40, 280, 380, 18));
    shape(ctx, '#9ac0e8', 5, rect(900, 90, 280, 220, 6)); line(ctx, [[1040, 90], [1040, 310]], 5); line(ctx, [[900, 200], [1180, 200]], 5); for (let i = 0; i < 5; i++) shape(ctx, '#f4f4f8', 0, circle(930 + i * 55, 140 + (i % 2) * 30, 4)); // snowy window
    shape(ctx, '#7a5434', 0, rect(0, 600, W, 120)); glow(ctx, 640, 420, 320, 'rgba(255,220,150,.25)'); }
  function g5(ctx, lt, dur, t) {
    study(ctx, t);
    knorozov(ctx, 430, 720, .95, t, {});
    { const k = pop(since(t, 'published') + .2); if (k > 0) { ctx.save(); ctx.translate(900, 470); ctx.rotate(.05); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-136, -166, 280, 340)); shape(ctx, '#f4ecd6', 4, rect(-140, -170, 280, 340, 4)); txt(ctx, '1952', 0, -130, FX.DISPLAY(34), '#c8322a'); for (let i = 0; i < 9; i++) shape(ctx, '#c8bca0', 0, rect(-110, -90 + i * 22, 220 - (i % 3) * 40, 9, 4)); glyph(ctx, -50, 130, .6, 'ka'); glyph(ctx, 50, 130, .6, 'wa'); ctx.restore(); } }
    FX.dateTag(ctx, 'LENINGRAD · 1952');
    if (since(t, 'ignore') > -.2) { const k = pop(since(t, 'ignore') + .2); ctx.save(); ctx.translate(430, 120); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-206, -56, 420, 120)); shape(ctx, '#fbf6ea', 4, rect(-210, -60, 420, 120, 6)); txt(ctx, 'YURI KNOROZOV', 0, -18, FX.DISPLAY(32), '#c8322a'); txt(ctx, 'YOO-ree kno-ROH-zof · Soviet scholar', 0, 22, FX.FONT(700, 17), '#6a5a4a'); ctx.restore(); }
    if (since(t, 'pictures') > 0) tag(ctx, 'NOT JUST PICTURES FOR IDEAS', 900, 230, since(t, 'pictures'), 22);
    vig(ctx);
  }
  // sounds: ka + ka + wa → kakaw (cacao)
  function g6(ctx, lt, dur, t) {
    deskBg(ctx, t); strip(ctx, 'MANY STOOD FOR SOUNDS', 640, 70, Math.max(lt, since(t, 'sounds') + .2), { px: 38 });
    const S = [['ka', 'KA', 0], ['ka', 'KA', .35], ['wa', 'WA', .7]];
    for (let i = 0; i < 3; i++) { const k = lt - .2 - S[i][2]; if (k <= 0) continue; const s = pop(k), x = 330 + i * 300; glyph(ctx, x, 300, 1.6 * s, S[i][0]); if (since(t, 'bubbles') > -.2) tag(ctx, S[i][1], x, 420, since(t, 'bubbles') + .2 - i * .15, 34); }
    if (since(t, 'bubbles') > 0) tag(ctx, 'SYLLABLES', 640, 500, since(t, 'bubbles'), 24);
    if (since(t, 'out') > -.3) { const k = pop(since(t, 'out') + .3); ctx.save(); ctx.translate(640, 610); ctx.scale(k, k); shape(ctx, '#1d1a17', 0, rect(-300, -40, 600, 80, 12)); txt(ctx, 'KA-KA-W(A) = KAKAW = "CACAO"', 0, 2, FX.DISPLAY(32), GOLD); ctx.restore(); }
    vig(ctx);
  }
  // the Cold War: Western experts brush him off
  function g7(ctx, lt, dur, t) {
    shape(ctx, '#c83a2a', 0, rect(0, 0, 640, H)); shape(ctx, '#2a4a8a', 0, rect(640, 0, 640, H)); line(ctx, [[640, 0], [640, H]], 10, '#1d1a17');
    txt(ctx, 'EAST', 320, 80, FX.DISPLAY(40), 'rgba(255,255,255,.5)'); txt(ctx, 'WEST', 960, 80, FX.DISPLAY(40), 'rgba(255,255,255,.5)');
    knorozov(ctx, 320, 700, .8, t, { cat: false, reach: true });
    // the paper flies over the wall and is swatted back
    const bk = clamp((since(t, 'brush') + .4) / 1.2), px = bk < .5 ? lerp(420, 880, bk * 2) : lerp(880, 520, (bk - .5) * 2), py = 300 - Math.sin(bk * Math.PI) * 120;
    ctx.save(); ctx.translate(px, py); ctx.rotate(bk * 6); shape(ctx, '#f4ecd6', 3, rect(-40, -50, 80, 100, 3)); ctx.restore();
    for (let i = 0; i < 3; i++) { const x = 860 + i * 130; N.walker(ctx, x, 700, .62, t, i + 4, { flip: true, coat: '#4a4a5a', pants: '#2a2a34', skin: '#f0c8a0', hs: 5, still: true, reach: i === 0 && bk > .4 }); }
    if (since(t, 'cold') > 0) strip(ctx, 'THE COLD WAR', 640, 170, since(t, 'cold'), { px: 46 });
    if (since(t, 'brush') > 0) FX.stamp(ctx, 'BRUSHED OFF', 960, 300, since(t, 'brush'), { color: '#f6c945', size: 44 });
    vig(ctx);
  }

  // ---------- g8: meanwhile, Tatiana Proskouriakoff — born in Siberia, raised in Pennsylvania, architect, no salary ----------
  function g8(ctx, lt, dur, t) {
    deskBg(ctx, t);
    tatiana(ctx, 300, 720, .95, t, {});
    if (since(t, 'pro') > -.2) { const k = pop(since(t, 'pro') + .2); ctx.save(); ctx.translate(320, 110); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-226, -56, 460, 120)); shape(ctx, '#fbf6ea', 4, rect(-230, -60, 460, 120, 6)); txt(ctx, 'TATIANA PROSKOURIAKOFF', 0, -18, FX.DISPLAY(28), '#7a4a8a'); txt(ctx, 'pros-koor-YAH-kof', 0, 22, FX.FONT(700, 18), '#6a5a4a'); ctx.restore(); }
    // her route: Siberia → Pennsylvania (a little globe-strip)
    { const k = since(t, 'siberia') + .1; if (k > 0) { const s = pop(k); ctx.save(); ctx.translate(880, 230); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.25)', 0, rect(-256, -86, 520, 180)); shape(ctx, '#9ad0f0', 4, rect(-260, -90, 520, 180, 12)); shape(ctx, '#e8dcb0', 3, smooth([[-250, -40], [-120, -70], [40, -60], [120, -20], [60, 20], [-80, 10], [-240, 20]])); shape(ctx, '#e8dcb0', 3, smooth([[150, -30], [250, -50], [250, 40], [170, 50]]));
      shape(ctx, '#c8322a', 2.5, circle(-60, -30, 9)); txt(ctx, 'SIBERIA', -60, -54, FX.FONT(800, 16)); const rk = clamp((since(t, 'pennsylvania') + .3) / .8); if (rk > 0) { ctx.save(); ctx.setLineDash([8, 6]); const n = 20; ctx.lineWidth = 4; ctx.strokeStyle = '#c8322a'; ctx.beginPath(); for (let i = 0; i <= n * rk; i++) { const u = i / n; const x = lerp(-60, 200, u), y = -30 - Math.sin(u * Math.PI) * 50 + u * 30; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); shape(ctx, '#2f4a8a', 2.5, circle(200, 0, 9)); txt(ctx, 'PENNSYLVANIA', 200, 30, FX.FONT(800, 15)); } ctx.restore(); } }
    if (since(t, 'architect') > -.1) { const k = pop(since(t, 'architect') + .1); ctx.save(); ctx.translate(760, 520); ctx.rotate(-.05); ctx.scale(k, k); shape(ctx, '#f4f8fc', 3.5, rect(-120, -80, 240, 160, 4)); for (let i = 0; i < 6; i++) line(ctx, [[-110, -60 + i * 26], [110, -60 + i * 26]], 1.2, 'rgba(60,100,160,.3)'); shape(ctx, 'none', 0, rect(0, 0, 0, 0)); ctx.lineWidth = 2.5; ctx.strokeStyle = '#2f4a8a'; ctx.strokeRect(-60, -20, 120, 70); ctx.beginPath(); ctx.moveTo(-70, -20); ctx.lineTo(0, -60); ctx.lineTo(70, -20); ctx.stroke(); ctx.restore(); tag(ctx, 'TRAINED AS AN ARCHITECT', 760, 640, since(t, 'architect'), 22); }
    if (since(t, 'salary') > 0) { counter(ctx, 1100, 520, '$0', since(t, 'salary'), 'SALARY (AT FIRST)', GOLD, 48); }
    vig(ctx);
  }

  // ---------- g9: she stares at the stone monuments of Piedras Negras, Guatemala ----------
  function pnStela(ctx, x, y, s, k = 1, hl = 0) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s * k); shape(ctx, '#bcae90', 4, c => { c.moveTo(-60, 0); c.lineTo(-56, -260); c.quadraticCurveTo(0, -284, 56, -260); c.lineTo(60, 0); c.closePath(); });
    ctx.save(); ctx.translate(0, -196); shape(ctx, '#a89a80', 3, rect(-30, -40, 60, 90, 12)); shape(ctx, '#8a7c62', 2.5, circle(0, -54, 16)); for (let i = 0; i < 5; i++) shape(ctx, '#7a6e58', 1.5, ellipse(-16 + i * 8, -72, 4, 12, (i - 2) * .3)); ctx.restore();
    for (let i = 0; i < 4; i++) { shape(ctx, hl > 0 && i < 3 ? mix('#d8cdb4', '#f6c945', hl) : '#d8cdb4', 2, rect(-44, -110 + i * 26, 40, 22, 5)); shape(ctx, '#d8cdb4', 2, rect(4, -110 + i * 26, 40, 22, 5)); } ctx.restore(); }
  function g9(ctx, lt, dur, t) {
    M.sky(ctx, t, 1.95, 470); M.jungle(ctx, 430, 1.95, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 600)); shape(ctx, '#d8d0bc', 4, rect(-100, 600, 1500, 200));
    for (let i = 0; i < 6; i++) pnStela(ctx, 140 + i * 200, 620, .95, FX.settle(clamp((lt - .1 - i * .2) / .4)));
    tatiana(ctx, 1150, 760, .7, t, { flip: true, reach: true });
    FX.dateTag(ctx, 'PIEDRAS NEGRAS · GUATEMALA'); if (since(t, 'necklace') > 0) tag(ctx, 'PIEDRAS NEGRAS', 640, 110, since(t, 'necklace'), 28);
    vig(ctx);
  }

  // ---------- g10: the dates came in clusters that fit one human lifespan — birth, coronation, anniversaries, death ----------
  function g10(ctx, lt, dur, t) {
    deskBg(ctx, t);
    line(ctx, [[120, 420], [1160, 420]], 6, 'rgba(60,40,20,.5)'); for (let y = 0; y <= 5; y++) { const x = 120 + y * 208; line(ctx, [[x, 405], [x, 435]], 4); txt(ctx, `AD ${600 + y * 40}`, x, 462, FX.FONT(800, 18), '#3a2a1a'); }
    // date pins from several monuments cluster into one bracket
    const ck = clamp((t - A.clusters + .3) / 1.0); for (let i = 0; i < 14; i++) { const x0 = 140 + (i * 173) % 1000, x1 = 330 + (i % 7) * 85, x = lerp(x0, x1, ease.inOut(ck)), y = lerp(260 + (i % 4) * 30, 380, ease.inOut(ck)); shape(ctx, '#c8322a', 2.5, circle(x, y, 9)); }
    if (ck > .6) { const k = clamp((ck - .6) / .4); shape(ctx, 'rgba(47,122,70,.25)', 3, rect(310, 360, 560 * k, 40, 10)); tag(ctx, 'ONE HUMAN LIFESPAN', 590, 330, since(t, 'lifespan'), 24); }
    const EV = [['BIRTH', 'birth', 330], ['CORONATION', 'coronation', 480], ['ANNIVERSARIES', 'anniversaries', 680], ['DEATH', 'death', 860]];
    for (const [lab, key, x] of EV) { const k = since(t, key) + .1; if (k <= 0) continue; const s = pop(k); ctx.save(); ctx.translate(x, 540); ctx.scale(s, s); shape(ctx, '#fbf6ea', 3.5, circle(0, 0, 46));
      if (key === 'birth') { shape(ctx, '#f0c8a0', 2.5, circle(0, -6, 18)); shape(ctx, '#f4ecd6', 2.5, ellipse(0, 18, 26, 14)); }
      if (key === 'coronation') { shape(ctx, '#c8a040', 3, c => { c.moveTo(-26, 16); c.lineTo(-22, -16); c.lineTo(-10, 0); c.lineTo(0, -22); c.lineTo(10, 0); c.lineTo(22, -16); c.lineTo(26, 16); c.closePath(); }); }
      if (key === 'anniversaries') { for (let i = 0; i < 3; i++) shape(ctx, '#e8a83a', 2, rect(-24 + i * 18, -16, 12, 30, 3)); shape(ctx, '#c8322a', 2.5, rect(-28, 12, 56, 16, 4)); }
      if (key === 'death') { shape(ctx, '#bcae90', 3, c => { c.moveTo(-20, 24); c.lineTo(-20, -10); c.quadraticCurveTo(0, -34, 20, -10); c.lineTo(20, 24); c.closePath(); }); }
      ctx.restore(); tag(ctx, lab, x, 610, k, 20); line(ctx, [[x, 494], [x, 430]], 3, 'rgba(60,40,20,.4)'); }
    if (since(t, 'clusters') > 0) strip(ctx, 'DATES IN CLUSTERS', 640, 90, since(t, 'clusters'), { px: 36 });
    vig(ctx);
  }

  // ---------- g11: 1960 — not astronomy charts: life stories of real kings ----------
  function g11(ctx, lt, dur, t) {
    deskBg(ctx, t);
    { const k = pop(Math.max(since(t, 'published2') + .2, lt - .1)); if (k > 0) { ctx.save(); ctx.translate(330, 360); ctx.rotate(-.03); ctx.scale(k, k); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-196, -246, 400, 500)); shape(ctx, '#f8f2e0', 4, rect(-200, -250, 400, 500, 4)); txt(ctx, '1960', 0, -200, FX.DISPLAY(34), '#c8322a'); txt(ctx, 'Historical Implications', 0, -150, FX.FONT(800, 20)); txt(ctx, 'of a Pattern of Dates at', 0, -124, FX.FONT(800, 20)); txt(ctx, 'Piedras Negras, Guatemala', 0, -98, FX.FONT(800, 20)); txt(ctx, 'T. Proskouriakoff', 0, -62, FX.FONT(700, 17), '#6a5a4a');
      for (let i = 0; i < 10; i++) shape(ctx, '#d8d0c0', 0, rect(-160, -20 + i * 22, 320 - (i % 3) * 40, 9, 4)); ctx.restore(); } }
    // star chart → crossed; king's life → ticked
    { const k = since(t, 'astronomy') + .1; if (k > 0) { const s = pop(k); ctx.save(); ctx.translate(840, 250); ctx.scale(s, s); shape(ctx, '#2a3a6a', 4, rect(-130, -90, 260, 180, 8)); for (let i = 0; i < 12; i++) shape(ctx, '#fff8e0', 0, circle(-110 + (i * 53) % 220, -70 + (i * 37) % 140, 3)); line(ctx, [[-80, -40], [-20, 0], [40, -30], [90, 20]], 2, 'rgba(255,255,255,.6)'); ctx.restore(); cross(ctx, 840, 250, k - .2, 100); tag(ctx, 'NOT ASTRONOMY CHARTS', 840, 370, k, 22); } }
    { const k = since(t, 'stories') + .1; if (k > 0) { const s = pop(k); ctx.save(); ctx.translate(1060, 560); ctx.scale(s, s); shape(ctx, '#fbf6ea', 4, rect(-150, -100, 300, 200, 8)); king(ctx, -70, 90, .28, t, { cape: '#c8322a' }); for (let i = 0; i < 4; i++) { txt(ctx, ['BORN', 'CROWNED', 'WON', 'DIED'][i], 60, -60 + i * 40, FX.FONT(800, 18)); } ctx.restore(); strip(ctx, 'LIFE STORIES OF REAL KINGS', 760, 680, since(t, 'kings'), { px: 28, color: '#2f7a46' }); } }
    if (since(t, 'conclusion') > 0) { ctx.save(); ctx.fillStyle = 'rgba(20,16,30,.0)'; ctx.restore(); }
    tag(ctx, 'Proskouriakoff, American Antiquity, 1960', 330, 650, since(t, 'published2') + .5, 18);
    vig(ctx);
  }

  // ---------- g12: the gentle stargazers? Gone. Kings boasting, capturing rivals, marrying for alliances, holding grudges ----------
  function comic(ctx, x, y, k, title, draw) { if (k <= 0) return; const s = pop(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-136, -126, 280, 260)); shape(ctx, '#bcae90', 5, rect(-140, -130, 280, 260, 14)); ctx.save(); ctx.beginPath(); ctx.rect(-126, -116, 252, 200); ctx.clip(); shape(ctx, '#d8cdb4', 0, rect(-126, -116, 252, 200)); draw(); ctx.restore(); txt(ctx, title, 0, 106, FX.DISPLAY(20), '#3a2a1a'); ctx.restore(); }
  function g12(ctx, lt, dur, t) {
    deskBg(ctx, t);
    const gk = clamp((since(t, 'human') + .2) / .5), tear = clamp((since(t, 'gone') + .1) / .4); if (gk < 1) { ctx.save(); ctx.globalAlpha = 1 - gk; oldPicture(ctx, t, 640, 380, .7, tear); ctx.restore(); }
    if (since(t, 'gone') > -.2 && gk < 1) FX.stamp(ctx, 'GONE', 640, 380, since(t, 'gone') + .2, { color: '#c8322a', size: 70 });
    if (since(t, 'human') > 0) strip(ctx, 'SOMETHING MUCH MORE HUMAN', 640, 70, since(t, 'human'), { px: 36 });
    comic(ctx, 170, 330, since(t, 'boosting') + .1, 'BOASTING', () => { king(ctx, -40, 80, .3, t, { cape: '#c8322a' }); shape(ctx, '#fff', 2.5, c => { c.roundRect(-10, -100, 120, 50, 16); }); txt(ctx, "I'M #1!", 50, -76, FX.DISPLAY(20), '#c8322a'); });
    comic(ctx, 480, 330, since(t, 'capturing') + .1, 'CAPTURING RIVALS', () => { king(ctx, -40, 80, .3, t, { cape: '#2f4a8a' }); villager(ctx, 60, 80, .22, t, 3, { still: true }); line(ctx, [[30, 30], [60, 10]], 3, '#8a6a3a'); });
    comic(ctx, 790, 330, since(t, 'marrying') + .1, 'MARRYING FOR ALLIANCES', () => { king(ctx, -50, 80, .26, t, { cape: '#2f7a46' }); M.vendor(ctx, 50, 80, .22, t, { ribbon: '#c8322a' }); shape(ctx, '#e8423a', 2, c => { c.moveTo(0, -60); c.bezierCurveTo(-14, -76, -30, -56, 0, -36); c.bezierCurveTo(30, -56, 14, -76, 0, -60); }); });
    comic(ctx, 1100, 330, since(t, 'grudges') + .1, 'GRUDGES FOR GENERATIONS', () => { king(ctx, -60, 80, .26, t, { cape: '#c8322a' }); king(ctx, 60, 80, .26, t, { flip: true, cape: '#7a4a8a' }); for (let i = 0; i < 3; i++) line(ctx, [[-8 + i * 8, -60], [-4 + i * 8, -40]], 4, '#e8322a'); });
    if (since(t, 'generations') > 0) tag(ctx, 'NOT CALM. NOT PEACEFUL.', 640, 560, since(t, 'generations'), 26);
    vig(ctx);
  }

  // ---------- g13: the stones were basically press releases — some were trash talk ----------
  function g13(ctx, lt, dur, t) {
    M.sky(ctx, t, 2, 470); M.jungle(ctx, 430, 2, t); shape(ctx, '#7aa858', 0, rect(-600, 470, 2600, 600)); shape(ctx, '#d8d0bc', 4, rect(-100, 600, 1500, 200));
    pnStela(ctx, 380, 640, 1.5, 1); pnStela(ctx, 900, 640, 1.5, 1);
    if (since(t, 'press') > -.2) { const k = pop(since(t, 'press') + .2); ctx.save(); ctx.translate(380, 200); ctx.scale(k, k); shape(ctx, '#fbf6ea', 4, c => { c.roundRect(-200, -70, 400, 120, 20); c.moveTo(-10, 50); c.lineTo(10, 90); c.lineTo(30, 50); }); txt(ctx, 'FOR IMMEDIATE RELEASE:', 0, -36, FX.FONT(800, 18), '#6a5a4a'); txt(ctx, 'OUR KING WINS AGAIN', 0, 0, FX.DISPLAY(28), '#2f4a8a'); ctx.restore(); }
    if (since(t, 'trash') > -.2) { const k = pop(since(t, 'trash') + .2); ctx.save(); ctx.translate(900, 210); ctx.rotate(Math.sin(t * 8) * .02); ctx.scale(k, k); shape(ctx, '#fbf6ea', 4, c => { c.roundRect(-210, -70, 420, 120, 20); c.moveTo(-10, 50); c.lineTo(10, 90); c.lineTo(30, 50); }); txt(ctx, '"YOUR CITY?', 0, -26, FX.DISPLAY(26), '#c8322a'); txt(ctx, 'WE TOOK YOUR KING."', 0, 12, FX.DISPLAY(26), '#c8322a'); ctx.restore(); }
    if (since(t, 'press') > 0) strip(ctx, 'PRESS RELEASES', 380, 380, since(t, 'press'), { px: 34, color: '#2f4a8a' }); if (since(t, 'trash') > 0) strip(ctx, 'TRASH TALK', 900, 380, since(t, 'trash'), { px: 34, color: '#c8322a' });
    vig(ctx);
  }

  // ---------- g14: that's how we know about Fire Is Born, 18 Rabbit, Pakal ----------
  function g14(ctx, lt, dur, t) {
    deskBg(ctx, t); strip(ctx, "THAT'S HOW WE KNOW", 640, 70, lt - .05, { px: 40 });
    const C = [['FIRE IS BORN', 'fire', '#2f9a8a'], ['18 RABBIT LOST HIS HEAD', 'rabbit', '#c8322a'], ['PAKAL GOT HIS NAME BACK', 'name', '#2f7a46']];
    for (let i = 0; i < 3; i++) { const k = since(t, C[i][1]) + (i === 0 ? .9 : .3); if (k <= 0) continue; const s = pop(k); const x = 230 + i * 410; ctx.save(); ctx.translate(x, 360); ctx.rotate((i - 1) * .04); ctx.scale(s, s); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-166, -176, 340, 360)); shape(ctx, '#fbf6ea', 4, rect(-170, -180, 340, 360, 8));
      glyph(ctx, -80, -100, .9, ['fi', 'ra', 'pa'][i]); line(ctx, [[-20, -100], [20, -100]], 4); shape(ctx, INK, 0, poly([[20, -110], [34, -100], [20, -90]]));
      if (i === 0) { ctx.save(); ctx.translate(90, -30); ctx.scale(.9, .9); for (let j = 0; j < 5; j++) shape(ctx, j % 2 ? '#2f9a8a' : '#e8a83a', 2, ellipse(-24 + j * 12, -60, 7, 26, (j - 2) * .25)); shape(ctx, '#c8322a', 2.5, rect(-36, -40, 72, 16, 4)); ctx.restore(); }
      if (i === 1) { ctx.save(); ctx.translate(90, -60); for (let j = 0; j < 7; j++) { ctx.save(); ctx.rotate(-1 + j * .33); shape(ctx, '#c8322a', 2, ellipse(0, -30, 7, 30)); ctx.restore(); } ctx.restore(); }
      if (i === 2) { ctx.save(); ctx.translate(90, -90); shape(ctx, '#2fa06a', 3.5, c => { c.ellipse(0, 0, 40, 50, 0, 0, 7); }); for (const d of [-1, 1]) { shape(ctx, '#f4f4ee', 2, ellipse(d * 15, -6, 9, 6)); shape(ctx, INK, 0, circle(d * 15, -6, 3)); } ctx.restore(); }
      txt(ctx, C[i][0].split(' ').slice(0, 2).join(' '), 0, 70, FX.DISPLAY(24), C[i][2]); txt(ctx, C[i][0].split(' ').slice(2).join(' '), 0, 106, FX.DISPLAY(22), C[i][2]); ctx.restore(); }
    vig(ctx);
  }

  // ---------- g15: it's how we know what happened next — in the 800s, the stones start going quiet ----------
  function g15(ctx, lt, dur, t) {
    const qk = clamp((t - A.quiet + 1.6) / 2.4);
    M.sky(ctx, t, lerp(1.95, 1.45, qk), 470); M.jungle(ctx, 430, lerp(1.95, 1.45, qk), t); shape(ctx, mix('#7aa858', '#8a9a6a', qk), 0, rect(-600, 470, 2600, 600)); shape(ctx, '#d8d0bc', 4, rect(-100, 600, 1500, 200));
    for (let i = 0; i < 6; i++) { const x = 140 + i * 200, on = qk < (6 - i) / 6 + .02; pnStela(ctx, x, 640, .8, 1); if (on) { const b = 1 - clamp((qk - (5 - i) / 6) * 6); ctx.save(); ctx.globalAlpha = .9; shape(ctx, '#fff', 3, c => { c.roundRect(x - 50, 330 - (i % 2) * 30, 100, 44, 16); }); txt(ctx, ['WON!', 'CROWNED', 'BORN', 'ALLIED', 'BUILT', 'WON!'][i], x, 352 - (i % 2) * 30, FX.FONT(800, 16)); ctx.restore(); } else txt(ctx, '…', x, 352 - (i % 2) * 30, FX.DISPLAY(30), 'rgba(60,50,40,.5)'); }
    const yr = Math.round(lerp(800, 909, qk)); counter(ctx, 640, 110, `AD ${yr}`, since(t, 'hundred') + .3, null, GOLD, 40);
    if (since(t, 'lands') > 0) tag(ctx, 'ACROSS THE SOUTHERN LOWLANDS', 640, 190, since(t, 'lands'), 24);
    if (since(t, 'quiet') > 0) strip(ctx, 'THE STONES GO QUIET', 640, 270, since(t, 'quiet'), { px: 40, color: '#5a4a3a' });
    vig(ctx, .4 + qk * .3);
  }

  const cut = [[0, g1], [A.no - .1, g2], [A.and1 - .1, g3], [A.then - .1, g4], [A.in1 - .1, g5], [A.many - .1, g6], [A.it - .1, g7], [A.meanwhile - .1, g8], [A.was - .1, g9], [A.she - .1, g10], [A.in2 - .1, g11], [A.so - .1, g12], [A.the2 - .1, g13], [A.thats - .1, g14], [A.and2 - .1, g15]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .5 }, { t: A.stars, type: 'swell', gain: .3 }, { t: A.wars, type: 'scratch', gain: .4 }, { t: A.politics, type: 'scratch', gain: .4 }, { t: A.dates, type: 'paper', gain: .4 },
    { t: A.numbers, type: 'click', gain: .4 }, { t: A.door, type: 'clang', gain: .4 }, { t: A.lock, type: 'click', gain: .6 }, { t: A.lock + .15, type: 'ratchet', gain: .4 }, { t: A.ignore, type: 'paper', gain: .4 }, { t: A.published, type: 'paper', gain: .4 },
    { t: A.sounds, type: 'click', gain: .4 }, { t: A.bubbles, type: 'click', gain: .4 }, { t: A.out, type: 'thud', gain: .5 }, { t: A.cold, type: 'boom', gain: .4 }, { t: A.brush, type: 'whoosh', gain: .5 },
    { t: A.pro, type: 'paper', gain: .4 }, { t: A.pennsylvania, type: 'whoosh', gain: .3 }, { t: A.salary, type: 'click', gain: .4 }, { t: A.necklace, type: 'thud', gain: .3 }, { t: A.clusters, type: 'slide', gain: .4 },
    { t: A.birth, type: 'click', gain: .4 }, { t: A.coronation, type: 'click', gain: .4 }, { t: A.anniversaries, type: 'click', gain: .4 }, { t: A.death, type: 'thud', gain: .4 }, { t: A.published2, type: 'paper', gain: .5 }, { t: A.kings, type: 'swell', gain: .4 },
    { t: A.gone, type: 'thud', gain: .6 }, { t: A.boosting, type: 'paper', gain: .4 }, { t: A.capturing, type: 'paper', gain: .4 }, { t: A.marrying, type: 'paper', gain: .4 }, { t: A.grudges, type: 'paper', gain: .4 }, { t: A.press, type: 'click', gain: .4 }, { t: A.trash, type: 'hit', gain: .4 },
    { t: A.fire, type: 'thud', gain: .4 }, { t: A.rabbit, type: 'thud', gain: .4 }, { t: A.name, type: 'thud', gain: .4 }, { t: A.quiet, type: 'wind', gain: .4 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.then - .2, mood: 'mystery' }, { t: A.it - .2, mood: 'tense' }, { t: A.meanwhile - .2, mood: 'under' }, { t: A.so - .2, mood: 'still' }, { t: A.and2 - .2, mood: 'silence' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-stones.mp3', shots, sfx, moods, images: { dresden: 'assets/img/dresden-p09.jpg' }, fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
