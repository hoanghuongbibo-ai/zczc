/* The Maya — Beat 8 "Aftermath & human cost: the long conquest" (narration-conquest.mp3 = 1.8 s chapter pause + narration-full.mp3 931.9–1183.7 s + 1.2 s tail).
 * Anchors = full-recording word times − 930.1. TONE SHIFT (script: no humour until the legacy reset): slow fades instead of bounces, silhouettes for victims, no gore,
 * the music held at silence over the genocide finding; warmth returns only on "and it failed". */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46', BLUE = '#2f4a8a';
  const F = { arrived: 934.87, aztec: 938.74, dozens: 940.61, the1: 943.73, seventeen: 947.24, disaster: 948.6, that1: 950.56, irony: 952.42, conquer: 955.18, kingdom: 957.18, army: 962.24, alongside: 963.83, deadly: 965.67, diseases: 966.71, and1: 970.7, fire: 971.83, july: 973.38, money: 976.84, the2: 979.12, diego: 980.18, secretly: 983.48, affair: 987.44, public: 989.54, people1: 992.52, tortured: 993.01, thousands: 994.09, smashed: 995.7, and2: 997.76, books: 998.18, paper: 1001.25, cliffs: 1002.89, astronomy: 1003.93, ritual: 1004.89, history: 1005.68, medicine: 1006.53, london: 1007.84, twenty: 1009.42, accounts: 1011.38, he1: 1013.63, we: 1018.5, today: 1022.71, only: 1026.08, four2: 1029.8, europe: 1031.55, shipped: 1036.53, and3: 1038.36, strange: 1039.62, descriptions: 1044.05, burned: 1047.74, keep: 1049.84, the3: 1053.19, conquest: 1053.29, half: 1055.86, last: 1057.44, pizza: 1059.47, ruling: 1060.58, island: 1061.16, guatemala: 1064.64, fled: 1066.54, on1: 1071.04, march: 1071.16, stormed: 1074.4, think: 1075.84, date: 1076.52, pilgrims: 1078.29, harvard: 1080.41, eighty: 1085.19, revolution: 1086.75, thats1: 1088.0, three: 1088.89, over: 1090.97, wasnt: 1092.14, in2: 1093.19, seven: 1093.95, land: 1097.57, rose: 1098.95, cast: 1103.33, peninsula: 1107.71, in3: 1108.9, independent: 1111.12, chance: 1113.57, speaking: 1116.47, orders: 1118.06, half2: 1120.36, help: 1121.6, mexican: 1122.88, occupied: 1123.73, estimates: 1127.3, tens: 1130.42, far: 1131.69, and4: 1132.95, hardest: 1134.81, sixty: 1137.37, conflict: 1142.31, when: 1145.72, commission: 1148.27, more: 1154.55, eighty2: 1158.95, and5: 1163.02, eighties: 1165.02, regions: 1166.31, genocide: 1169.15, not1: 1171.58, collapse: 1171.86, drought: 1173.07, ending: 1174.34, killed: 1176.72, five: 1179.77, attempt: 1181.08, failed: 1183.05 };
  const A = {}; for (const k in F) A[k] = F[k] - 930.1; A.end = 254.8;
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


  const M = G.Maya, { temple, palace, stelaSmall, king, mayaMap, site, MP, mix, castillo } = M;
  const SK = ['#a8704a', '#7a4a2a', '#c08a5a', '#8a5a34', '#b07848'], CL = ['#e8dcc0', '#d8c49a', '#f0e6cc', '#c8b088'];
  const villager = (ctx, x, y, s, t, v, o = {}) => N.walker(ctx, x, y, s, t, v, Object.assign({ plain: true, beads: v % 2 === 0, coat: CL[v % 4], pants: SK[v % 5], skin: SK[v % 5], hair: '#1d1a17', hs: [0, 1, 2, 4][v % 4], shoe: SK[v % 5] }, o));
  const fade = k => clamp(k / .7);
  const imgFrame = (ctx, key, x, y, w, h, k, label) => { const im = T.IMG[key]; if (im) N.frame(ctx, im, x, y, w, h, k, label); };
  function quiet(ctx, text, y, k, col = '#f4ecd8', px = 30) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = fade(k); txt(ctx, text, 640, y, FX.DISPLAY(px), col); ctx.restore(); }
  function band(ctx, y0, y1, a = .55) { ctx.save(); ctx.fillStyle = `rgba(15,12,20,${a})`; ctx.fillRect(0, y0, W, y1 - y0); ctx.restore(); }
  // a silhouette figure (victims and crowds in this beat are never drawn with faces)
  function sil(ctx, x, y, s, col = '#2a2228', o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 0, circle(0, -150, 22)); shape(ctx, col, 0, c => { c.moveTo(-26, -124); c.quadraticCurveTo(0, -132, 26, -124); c.lineTo(32, -40); c.lineTo(18, 0); c.lineTo(-18, 0); c.lineTo(-32, -40); c.closePath(); }); if (o.bound) line(ctx, [[-20, -80], [20, -86]], 5, '#8a6a4a'); ctx.restore(); }
  function caravel(ctx, x, y, s, t, ph = 0) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4 + ph) * 4); ctx.scale(s, s); shape(ctx, '#7a4a2a', 4, c => { c.moveTo(-120, -10); c.lineTo(120, -20); c.lineTo(96, 30); c.lineTo(-96, 30); c.closePath(); }); shape(ctx, '#5a3420', 3, rect(-110, -40, 50, 30, 4));
    for (const [mx, h, w] of [[-30, 170, 70], [50, 140, 56]]) { line(ctx, [[mx, -10], [mx, -h]], 6, '#5a3a20'); shape(ctx, '#f4efe2', 3.5, c => { c.moveTo(mx - w, -h + 20); c.quadraticCurveTo(mx, -h + 10, mx + w, -h + 20); c.lineTo(mx + w - 8, -40); c.quadraticCurveTo(mx, -30, mx - w + 8, -40); c.closePath(); }); line(ctx, [[mx - 30, -h + 40], [mx + 30, -70]], 7, '#b82a2a'); line(ctx, [[mx + 30, -h + 40], [mx - 30, -70]], 7, '#b82a2a'); }
    ctx.restore(); }
  function friar(ctx, x, y, s, t, o = {}) { N.walker(ctx, x, y, s, t, 6, Object.assign({ plain: true, coat: '#6a4a34', pants: '#6a4a34', skin: '#e8c0a0', hair: '#5a3a20', hs: 3, shoe: '#3a2a1a', still: true }, o)); ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); shape(ctx, '#6a4a34', 3.5, poly([[-40, -130], [40, -130], [48, -6], [-48, -6]])); line(ctx, [[-34, -140], [34, -140]], 5, '#e8dcc0'); line(ctx, [[20, -140], [26, -60]], 4, '#e8dcc0'); ctx.restore(); }
  function fire(ctx, x, y, s, t, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); glow(ctx, 0, -60, 220, 'rgba(255,140,60,.55)'); for (let i = 0; i < 5; i++) { const f = Math.sin(t * 7 + i * 1.7) * 10; shape(ctx, i % 2 ? '#ff8a2a' : '#ffb43a', 0, c => { c.moveTo(-90 + i * 36, 0); c.quadraticCurveTo(-80 + i * 36 + f, -90 - (i % 3) * 30, -60 + i * 36 + f * .5, -160 - (i % 2) * 40); c.quadraticCurveTo(-40 + i * 36, -70, -30 + i * 36, 0); c.closePath(); }); } shape(ctx, '#3a2a1a', 3, rect(-110, -6, 220, 20, 4)); ctx.restore(); }
  function cropFrame(ctx, key, x, y, w, h, k, label) { imgFrame(ctx, key, x, y, w, h, k, label); }
  const PROV = [[-90.2, 20.9], [-89.5, 20.6], [-88.7, 20.8], [-87.8, 20.9], [-87.4, 20.2], [-88.2, 20.0], [-89.0, 19.9], [-89.9, 19.9], [-90.3, 19.2], [-89.6, 19.0], [-88.7, 19.2], [-88.0, 18.9], [-89.2, 18.4], [-90.4, 18.4], [-88.6, 17.8], [-89.9, 17.4]];
  function provinces(ctx, t, fall = 0, cols = true) { for (let i = 0; i < PROV.length; i++) { const [x, y] = MP(PROV[i]), taken = i / PROV.length < fall; shape(ctx, taken ? 'rgba(120,110,100,.65)' : `hsla(${(i * 47) % 360},55%,58%,.75)`, 2.5, c => { c.ellipse(x, y, 34, 26, (i % 3) * .4, 0, 7); }); if (taken) { line(ctx, [[x, y + 6], [x, y - 30]], 3, '#3a2a1a'); shape(ctx, '#f4efe2', 2, poly([[x, y - 30], [x + 22, y - 24], [x, y - 16]])); line(ctx, [[x + 2, y - 28], [x + 18, y - 18]], 2.5, '#b82a2a'); } } }

  // ---------- c1: the 1500s — the Spanish find no single empire to topple, but dozens of small kingdoms ----------
  function c1(ctx, lt, dur, t) {
    ctx.save(); T.cam(ctx, 1.25, 600, 300); mayaMap(ctx, t, { today: false });
    const pk = clamp((since(t, 'dozens') + .3) / 1.0); if (pk > 0) { ctx.save(); ctx.globalAlpha = pk; provinces(ctx, t, 0); ctx.restore(); }
    // the Aztec capital: one target (off to the west)
    
    for (let i = 0; i < 3; i++) { const sx = lerp(1500, 1100 - i * 60, ease.out(clamp((t - A.arrived + .6) / 2.4))); caravel(ctx, sx, 230 + i * 70, .32, t, i); }
    ctx.restore();
    if (since(t, 'aztec') > -.3) { const k = fade(since(t, 'aztec') + .3); ctx.save(); ctx.globalAlpha = k; for (const [r, c] of [[40, '#c8322a'], [26, '#fff'], [12, '#c8322a']]) shape(ctx, c, r === 40 ? 4 : 0, circle(150, 430, r)); line(ctx, [[60, 430], [100, 430]], 5, '#c8322a'); ctx.restore(); tag(ctx, '← THE AZTEC CAPITAL: ONE TARGET', 300, 500, since(t, 'aztec'), 22); }
    if (since(t, 'dozens') > 0) tag(ctx, 'THE MAYA: DOZENS OF SMALL KINGDOMS', 860, 640, since(t, 'dozens'), 22);
    if (lt < 2.4) { const a = clamp((2.4 - lt) / .4); ctx.save(); ctx.globalAlpha = a; shape(ctx, 'rgba(15,12,20,.6)', 0, rect(0, 0, W, H)); strip(ctx, 'BEAT 8 · AFTERMATH & HUMAN COST', 640, 260, lt - .05, { px: 28 }); strip(ctx, 'THE LONG CONQUEST', 640, 350, lt - .35, { px: 60, color: '#8a2a2a', rot: 0 }); tag(ctx, '1517–1999', 640, 440, lt - .7, 24); ctx.restore(); }
    FX.dateTag(ctx, 'THE 1500s'); vig(ctx, .5);
  }

  // ---------- c2: 1517 — the first Spanish expedition to land on the Yucatán coast ends in disaster for the Spanish ----------
  function c2(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#e8b888'], [1, '#c88a5a']]), 0, rect(0, 0, W, 300)); shape(ctx, '#3a7aa8', 0, rect(0, 300, W, 200)); for (let i = 0; i < 9; i++) line(ctx, [[((i * 170 + t * 20) % 1400) - 80, 330 + (i % 3) * 50], [((i * 170 + t * 20) % 1400) - 30, 330 + (i % 3) * 50]], 3, 'rgba(255,255,255,.5)');
    shape(ctx, '#e8d8b0', 0, poly([[0, 500], [1280, 470], [1280, 720], [0, 720]])); M.jungle(ctx, 470, 1.8, t);
    const back = clamp((since(t, 'disaster') + .2) / 2.0);
    caravel(ctx, lerp(760, 1000, back), 360, .7, t); caravel(ctx, lerp(1040, 1220, back), 380, .55, t, 1);
    for (let i = 0; i < 5; i++) { const x = lerp(520 + i * 50, 700 + i * 60, back); ctx.save(); ctx.globalAlpha = 1 - back * .5; sil(ctx, x, 480 + (i % 2) * 10, .5, '#5a4a4a'); ctx.restore(); }
    for (let i = 0; i < 9; i++) sil(ctx, 60 + i * 50, 560 + (i % 3) * 12, .7, '#2a2228');
    FX.dateTag(ctx, 'YUCATÁN COAST · 1517');
    if (since(t, 'seventeen') > 0) counter(ctx, 640, 110, '1517', since(t, 'seventeen'), null, GOLD, 40);
    if (since(t, 'disaster') > 0) tag(ctx, 'A DISASTER — FOR THE SPANISH', 640, 190, since(t, 'disaster'), 24);
    vig(ctx, .5);
  }

  // ---------- c3: the bitter irony — hard to conquer kingdom by kingdom, but never one army to stop them ----------
  function c3(ctx, lt, dur, t) {
    const fall = clamp((t - A.kingdom + .2) / (A.army - A.kingdom + 2));
    ctx.save(); T.cam(ctx, 1.9, ...MP([-89.0, 19.6])); mayaMap(ctx, t, { today: false, borders: false }); provinces(ctx, t, fall); ctx.restore();
    const yr = Math.round(lerp(1527, 1546, fall)); counter(ctx, 160, 110, String(yr), since(t, 'kingdom') + .2, null, GOLD, 36);
    if (since(t, 'irony') > 0) strip(ctx, 'THE BITTER IRONY', 640, 80, since(t, 'irony'), { px: 36, color: '#8a2a2a' });
    if (since(t, 'conquer') > 0) tag(ctx, 'HARD TO CONQUER — KINGDOM BY KINGDOM', 640, 610, since(t, 'conquer'), 22);
    if (since(t, 'army') > 0) tag(ctx, 'NEVER ONE ARMY TO STOP THEM', 640, 670, since(t, 'army'), 22);
    vig(ctx, .5);
  }

  // ---------- c4: alongside the soldiers came something deadlier — diseases never encountered before ----------
  function c4(ctx, lt, dur, t) {
    const hz = clamp((t - A.deadly + .3) / 3.0);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, mix('#c8a878', '#6a5a5a', hz)], [1, mix('#8a6a4a', '#3a3036', hz)]]), 0, rect(0, 0, W, H));
    for (let i = 0; i < 6; i++) { const x = 140 + i * 200; shape(ctx, mix('#e8dcc0', '#8a7a6a', hz), 3, rect(x - 50, 470, 100, 70, 16)); shape(ctx, mix('#c8a050', '#6a5a40', hz), 3, c => { c.moveTo(x - 64, 484); c.quadraticCurveTo(x, 390, x + 64, 484); c.closePath(); }); }
    for (let i = 0; i < 14; i++) { ctx.save(); ctx.globalAlpha = 1 - clamp(hz * 1.4 - (i % 5) * .12) * .7; sil(ctx, 80 + i * 86, 640 + (i % 2) * 14, .7, '#2a2228'); ctx.restore(); }
    // a slow grey haze rolls in from the right
    ctx.save(); ctx.globalAlpha = .55 * hz; for (let i = 0; i < 10; i++) shape(ctx, '#9a9098', 0, ellipse(1400 - hz * 1200 + (i * 140) % 700, 300 + (i * 61) % 360, 220, 80, i)); ctx.restore();
    quiet(ctx, 'SOMETHING DEADLIER', 110, since(t, 'deadly'), '#fff', 34); quiet(ctx, 'DISEASES THE AMERICAS HAD NEVER ENCOUNTERED', 170, since(t, 'diseases'), '#f4ecd8', 22);
    vig(ctx, .6);
  }

  // ---------- c5: and then came the fire — July 12th, 1562, the plaza of Maní ----------
  function maniPlaza(ctx, t, dusk = 1) { M.sky(ctx, t, lerp(1.9, 1.15, dusk), 470); shape(ctx, mix('#7aa858', '#6a7a4a', dusk), 0, rect(-600, 470, 2600, 300)); shape(ctx, mix('#d8d0bc', '#a89a88', dusk), 4, rect(-100, 560, 1500, 200));
    // the Franciscan church and convent
    shape(ctx, mix('#f0e6d0', '#b8a898', dusk), 4, rect(820, 250, 360, 310)); shape(ctx, mix('#f0e6d0', '#b8a898', dusk), 4, poly([[820, 250], [1000, 150], [1180, 250]])); shape(ctx, '#4a3a30', 3, c => { c.roundRect(960, 430, 80, 130, 36); }); line(ctx, [[1000, 150], [1000, 90]], 6, '#3a2a20'); line(ctx, [[980, 110], [1020, 110]], 6, '#3a2a20');
    for (let i = 0; i < 4; i++) { const x = 120 + i * 150; shape(ctx, mix('#e8dcc0', '#9a8a7a', dusk), 3, rect(x - 50, 480, 100, 80, 16)); shape(ctx, mix('#c8a050', '#7a6a4a', dusk), 3, c => { c.moveTo(x - 64, 494); c.quadraticCurveTo(x, 400, x + 64, 494); c.closePath(); }); } }
  function c5(ctx, lt, dur, t) {
    maniPlaza(ctx, t, clamp(lt / 2));
    FX.dateTag(ctx, 'MANÍ, YUCATÁN · JULY 12, 1562');
    quiet(ctx, 'AND THEN CAME THE FIRE', 110, since(t, 'fire'), '#fff', 36);
    if (since(t, 'july') > 0) counter(ctx, 640, 190, 'JULY 12, 1562', since(t, 'july'), null, GOLD, 34);
    if (since(t, 'money') > 0) tag(ctx, 'THE PLAZA OF MANÍ', 380, 400, since(t, 'money'), 22);
    vig(ctx, .5);
  }

  // ---------- c6: the friar Diego de Landa learns the baptized Maya still honor their old gods — an auto-da-fé ----------
  function c6(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#3a3036'], [1, '#2a2226']]), 0, rect(0, 0, W, H));
    imgFrame(ctx, 'landa', 300, 320, 300, 296, Math.max(lt + .1, since(t, 'diego') + .1), 'FRAY DIEGO DE LANDA');
    // a small figure of an old god kept hidden in a home
    { const k = since(t, 'secretly') + .2; if (k > 0) { ctx.save(); ctx.globalAlpha = fade(k); ctx.translate(880, 330); shape(ctx, '#5a4a40', 4, rect(-170, -130, 340, 260, 10)); glow(ctx, 0, 30, 120, 'rgba(255,190,110,.35)'); shape(ctx, '#bcae90', 3, rect(-24, -10, 48, 70, 10)); shape(ctx, '#9a8a70', 2.5, circle(0, -24, 20)); for (const d of [-1, 1]) shape(ctx, '#3a2a20', 0, circle(d * 7, -26, 3)); shape(ctx, '#f6c945', 0, circle(-60, 50, 6)); shape(ctx, '#f6c945', 0, circle(60, 50, 6)); ctx.restore(); tag(ctx, 'THE OLD GODS, HONORED IN SECRET', 880, 500, k, 20); } }
    if (since(t, 'affair') > -.3) { band(ctx, 560, 720, .7); quiet(ctx, 'AN AUTO-DA-FÉ — "AN ACT OF FAITH"', 610, since(t, 'affair') + .3, '#fff', 30); quiet(ctx, 'a public ritual of punishment and penance', 660, since(t, 'public'), '#e8dcc8', 22); }
    vig(ctx, .6);
  }

  // ---------- c7: people were tortured; thousands of sacred images smashed and burned (silhouettes, no gore) ----------
  function c7(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a1e22'], [1, '#5a2a1a']]), 0, rect(0, 0, W, H));
    fire(ctx, 640, 600, 1.4, t, fade(lt));
    for (let i = 0; i < 7; i++) { const x = 160 + i * 160 + (i > 3 ? 80 : 0); if (Math.abs(x - 640) < 140) continue; sil(ctx, x, 690, .9, '#120c10', { bound: i % 3 === 1 }); }
    // idols on the pile, breaking
    const sk = clamp((since(t, 'smashed') + .2) / .8); for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(560 + i * 32, 590 - (i % 2) * 14); ctx.rotate(sk * (i - 2.5) * .3); ctx.globalAlpha = 1 - sk * .4; shape(ctx, '#7a6a5a', 2.5, rect(-12, -34, 24, 34, 6)); shape(ctx, '#6a5a4a', 2, circle(0, -42, 10)); ctx.restore(); }
    quiet(ctx, 'PEOPLE WERE TORTURED', 110, since(t, 'tortured'), '#fff', 32); quiet(ctx, 'THOUSANDS OF SACRED IMAGES — SMASHED AND BURNED', 170, since(t, 'thousands'), '#f4d8b8', 24);
    vig(ctx, .7);
  }

  // ---------- c8: and so were books — folded bark-paper codices: astronomy, ritual, history, medicine ----------
  function c8(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#3a3036'], [1, '#241e22']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 360, 420, 'rgba(255,220,170,.18)');
    cropFrame(ctx, 'dresden', 230, 330, 170, 360, since(t, 'books') + .2, 'DRESDEN CODEX');
    cropFrame(ctx, 'madrid30', 600, 300, 320, 300, since(t, 'paper') + .1, 'MADRID CODEX');
    cropFrame(ctx, 'paris', 1000, 300, 300, 270, since(t, 'cliffs') + .1, 'PARIS CODEX');
    const L = [['ASTRONOMY', 'astronomy'], ['RITUAL', 'ritual'], ['HISTORY', 'history'], ['MEDICINE', 'medicine']]; for (let i = 0; i < 4; i++) tag(ctx, L[i][0], 340 + i * 200, 640, since(t, L[i][1]), 22);
    quiet(ctx, 'AND SO WERE BOOKS', 70, since(t, 'books'), '#fff', 34);
    vig(ctx, .5);
  }
  function c9(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a1e22'], [1, '#5a2a1a']]), 0, rect(0, 0, W, H));
    fire(ctx, 640, 620, 1.2, t, 1);
    for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(520 + i * 46, 590 - (i % 2) * 10); ctx.rotate((i - 2.5) * .25); for (let j = 0; j < 4; j++) shape(ctx, mix('#f0e4c8', '#3a2a1a', clamp(lt / 6 + (i % 3) * .1)), 1.5, poly([[j * 9 - 18, -26 + (j % 2) * 5], [j * 9 - 9, -26 + ((j + 1) % 2) * 5], [j * 9 - 9, 10 + ((j + 1) % 2) * 5], [j * 9 - 18, 10 + (j % 2) * 5]])); ctx.restore(); }
    for (let i = 0; i < 6; i++) { const ph = (t * .4 + i * .17) % 1; ctx.save(); ctx.globalAlpha = .7 * (1 - ph); shape(ctx, '#f4a050', 0, rect(560 + i * 30 + Math.sin(ph * 6 + i) * 20, 520 - ph * 420, 6, 4)); ctx.restore(); } // sparks
    if (since(t, 'twenty') > -.2) { counter(ctx, 640, 150, '27', since(t, 'twenty') + .2, null, '#ffb87a', 64); quiet(ctx, 'the number usually credited to Landa himself', 230, since(t, 'twenty') + .5, '#f4d8b8', 20); }
    if (since(t, 'accounts') > 0) tag(ctx, 'OTHER ACCOUNTS: FAR MORE', 640, 300, since(t, 'accounts'), 22);
    vig(ctx, .7);
  }

  // ---------- c10: in his own words — "we burned them all, which they regretted to an amazing degree" ----------
  function c10(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#3a3036'], [1, '#241e22']]), 0, rect(0, 0, W, H));
    imgFrame(ctx, 'landa', 230, 330, 260, 256, lt + .1, 'DIEGO DE LANDA');
    ctx.save(); ctx.translate(800, 340); ctx.globalAlpha = fade(lt); shape(ctx, 'rgba(0,0,0,.3)', 0, rect(-326, -186, 660, 380)); shape(ctx, '#f0e4c8', 4, rect(-330, -190, 660, 380, 6));
    txt(ctx, 'IN HIS OWN WORDS (TRANSLATED):', 0, -140, FX.FONT(800, 18), '#6a5a4a');
    const q = ['"…we burned them all,', 'which they regretted to an', 'amazing degree…"']; const qk = clamp((t - A.we + .2) / 3.2); for (let i = 0; i < 3; i++) { const n = Math.round(q[i].length * clamp(qk * 3 - i)); txt(ctx, q[i].slice(0, n), 0, -70 + i * 56, FX.DISPLAY(34), '#3a1a12'); }
    txt(ctx, 'Diego de Landa, Relación de las cosas de Yucatán, c. 1566', 0, 150, FX.FONT(700, 17), '#6a5a4a'); ctx.restore();
    vig(ctx, .5);
  }

  // ---------- c11: today only four codices survive — three in Europe: Dresden, Madrid, Paris ----------
  function c11(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#1e1a22'], [1, '#141016']]), 0, rect(0, 0, W, H));
    const mk = clamp((since(t, 'europe') + .2) / .8);
    const SL = [['dresden', 'DRESDEN'], ['madrid90', 'MADRID'], ['paris', 'PARIS'], [null, 'MEXICO CITY']];
    for (let i = 0; i < 4; i++) { const k = Math.max(since(t, 'only') + .2, lt - .2) - i * .25; if (k <= 0) continue; const x = 190 + i * 300, y = lerp(330, 250, mk), w = [120, 240, 200, 180][i], h = [250, 80, 180, 160][i]; glow(ctx, x, y, 180, 'rgba(255,230,190,.16)'); shape(ctx, '#3a3440', 3, rect(x - 130, y + h / 2 + 30, 260, 16, 4));
      if (SL[i][0]) imgFrame(ctx, SL[i][0], x, y, w, h, k, SL[i][1]); else { ctx.save(); ctx.globalAlpha = fade(k); shape(ctx, '#e8dcb8', 3, rect(x - w / 2, y - h / 2, w, h, 4)); for (let j = 0; j < 6; j++) shape(ctx, '#a8946a', 0, rect(x - w / 2 + 16, y - h / 2 + 16 + j * 22, w - 32, 10, 4)); ctx.restore(); tag(ctx, 'MAYA CODEX OF MEXICO', x, y + h / 2 + 30, k, 16); } }
    if (since(t, 'only') > 0) quiet(ctx, 'ONLY FOUR ARE KNOWN TO SURVIVE', 70, since(t, 'only'), '#fff', 32);
    if (since(t, 'four2') > 0) counter(ctx, 640, 140, '4', since(t, 'four2'), null, GOLD, 56);
    // the shipping route: Yucatán → Europe
    if (mk > 0) { ctx.save(); ctx.globalAlpha = mk; shape(ctx, '#2a4a6a', 3, rect(140, 440, 1000, 240, 12)); shape(ctx, '#c8b890', 3, smooth([[160, 560], [230, 520], [280, 580], [240, 650], [180, 640]])); shape(ctx, '#c8b890', 3, smooth([[880, 480], [1080, 470], [1120, 560], [1060, 650], [900, 640], [860, 560]]));
      for (const [x, y, n] of [[960, 510, 'DRESDEN'], [920, 600, 'MADRID'], [930, 550, 'PARIS']]) { shape(ctx, GOLD, 2.5, circle(x, y, 8)); txt(ctx, n, x + 60, y, FX.FONT(800, 15), '#f4ecd8'); }
      const sk = clamp((since(t, 'shipped') + .2) / 1.2); ctx.setLineDash([12, 9]); ctx.lineWidth = 4; ctx.strokeStyle = '#f4ecd8'; ctx.beginPath(); for (let i = 0; i <= 30 * sk; i++) { const u = i / 30, x = lerp(250, 900, u), y = 570 - Math.sin(u * Math.PI) * 90; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); if (since(t, 'shipped') > 0) quiet(ctx, 'PROBABLY SAVED BECAUSE THEY HAD ALREADY CROSSED THE OCEAN', 700, since(t, 'shipped'), '#f4ecd8', 18); }
    vig(ctx, .5);
  }

  // ---------- c12: the twist — the man who burned the books left behind a partial key to reading them ----------
  function c12(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#3a3036'], [1, '#2a2226']]), 0, rect(0, 0, W, H));
    fire(ctx, 260, 560, .8, t, .9); imgFrame(ctx, 'alphabet', 760, 340, 380, 394, since(t, 'descriptions') + .2, "LANDA'S 'ALPHABET', RELACIÓN, c. 1566");
    if (since(t, 'keep') > -.2) { const k = fade(since(t, 'keep') + .2); ctx.save(); ctx.globalAlpha = k; ctx.translate(1100, 560); ctx.rotate(-.4); ctx.lineWidth = 12; ctx.strokeStyle = GOLD; ctx.beginPath(); ctx.arc(0, -60, 34, 0, 7); ctx.stroke(); line(ctx, [[0, -26], [0, 80]], 12, GOLD); line(ctx, [[0, 50], [26, 50]], 10, GOLD); line(ctx, [[0, 72], [20, 72]], 10, GOLD); ctx.restore(); }
    quiet(ctx, 'A STRANGE TWIST', 70, since(t, 'strange'), '#fff', 34);
    if (since(t, 'burned') > 0) tag(ctx, 'THE MAN WHO BURNED THE BOOKS…', 330, 360, since(t, 'burned'), 22);
    if (since(t, 'keep') > 0) tag(ctx, '…LEFT A PARTIAL KEY TO READING THEM', 760, 660, since(t, 'keep'), 22);
    vig(ctx, .5);
  }

  // ---------- c13: over a century and a half — the last independent Maya kingdom: the Itza, on the island of Nojpetén ----------
  function c13(ctx, lt, dur, t) {
    deskBg(ctx, t); ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#1e1a22'; ctx.fillRect(0, 0, W, H); ctx.restore();
    line(ctx, [[140, 380], [1140, 380]], 6, 'rgba(60,40,20,.6)'); const X = y => 140 + (y - 1500) / 200 * 1000;
    for (const [y, l] of [[1517, '1517'], [1542, '1542'], [1600, '1600'], [1697, '1697']]) { line(ctx, [[X(y), 365], [X(y), 395]], 4); txt(ctx, l, X(y), 420, FX.FONT(800, 20), '#3a2a1a'); }
    const k = clamp((t - A.conquest + .2) / 2.0); shape(ctx, 'rgba(140,40,40,.5)', 0, rect(X(1517), 370, (X(1697) - X(1517)) * k, 20, 6));
    if (since(t, 'half') > 0) tag(ctx, 'OVER A CENTURY AND A HALF', 640, 300, since(t, 'half'), 26);
    if (since(t, 'pizza') > 0) { strip(ctx, 'THE ITZA KINGDOM', 640, 540, since(t, 'pizza'), { px: 42, color: '#2f4a8a' }); tag(ctx, 'THE LAST INDEPENDENT MAYA KINGDOM', 640, 620, since(t, 'last') + .2, 22); }
    vig(ctx, .5);
  }
  function itzaIsland(ctx, t, o = {}) { const dusk = o.dusk || 0; M.sky(ctx, t, lerp(1.95, 1.2, dusk), 400); M.jungle(ctx, 360, 1.9, t); shape(ctx, mix('#4aa6c8', '#3a6a8a', dusk), 0, rect(-600, 400, 2600, 400)); for (let i = 0; i < 10; i++) line(ctx, [[((i * 150 + t * 15) % 1500) - 100, 440 + (i % 4) * 60], [((i * 150 + t * 15) % 1500) - 50, 440 + (i % 4) * 60]], 3, 'rgba(255,255,255,.4)');
    shape(ctx, '#7aa858', 4, ellipse(640, 470, 330, 60)); for (let i = 0; i < 6; i++) temple(ctx, 400 + i * 96, 470, .22 + (i === 2 || i === 3 ? .08 : 0), { col: '#e8dcc0', paint: true, h: 240, w: 110 });
    for (let i = 0; i < 4; i++) { const x = 220 + i * 260 + Math.sin(t * .5 + i) * 20; shape(ctx, '#6a4a2a', 3, poly([[x - 50, 560 + i * 20], [x + 50, 560 + i * 20], [x + 40, 574 + i * 20], [x - 40, 574 + i * 20]])); sil(ctx, x, 560 + i * 20, .3, '#3a2a20'); } }
  function c14(ctx, lt, dur, t) {
    const [lx, ly] = MP(M.SITES.nojpeten), mapK = clamp((since(t, 'fled') + .2) / 1.0), isK = clamp((since(t, 'island') + .2) / .8);
    { ctx.save(); T.cam(ctx, 2.0, lx + 30, ly - 120); mayaMap(ctx, t, { today: false }); shape(ctx, '#4aa6c8', 3, ellipse(lx, ly, 30, 10)); site(ctx, 'nojpeten', lt + .2, 'NOJPETÉN · LAKE PETÉN ITZÁ', { r: 7, px: 14 }); site(ctx, 'mayapan', mapK, 'MAYAPÁN', { r: 7, px: 14, col: '#7a6a5a' });
      if (mapK > 0) { const [mx, my] = MP(M.SITES.mayapan); ctx.save(); ctx.setLineDash([12, 8]); line(ctx, [[mx, my], [lerp(mx, lx, mapK), lerp(my, ly, mapK)]], 6, '#c8322a'); ctx.restore(); } ctx.restore(); if (mapK > 0) tag(ctx, 'FLED SOUTH, 1440s', 1000, 560, mapK, 24); }
    if (since(t, 'guatemala') > 0 && mapK <= 0) tag(ctx, 'NORTHERN GUATEMALA', 640, 120, since(t, 'guatemala'), 24);
    vig(ctx, .5);
  }

  // ---------- c15: March 13th, 1697 — Spanish forces storm the island ----------
  function c15(ctx, lt, dur, t) {
    itzaIsland(ctx, t, { dusk: .3 });
    const sk = clamp((since(t, 'stormed') + .8) / 2.0); for (let i = 0; i < 3; i++) caravel(ctx, lerp(1400 + i * 120, 960 + i * 100, ease.out(sk)), 520 + i * 40, .32, t, i);
    if (since(t, 'stormed') > 0) { for (let i = 0; i < 4; i++) { const ph = (t * .2 + i * .25) % 1; ctx.save(); ctx.globalAlpha = .45 * (1 - ph) * clamp(since(t, 'stormed')); shape(ctx, '#8a8a8a', 0, circle(520 + i * 80, 380 - ph * 200, 30 + ph * 40)); ctx.restore(); } }
    band(ctx, 610, 720, .65); quiet(ctx, 'MARCH 13, 1697', 640, since(t, 'march'), GOLD, 34); quiet(ctx, 'THE LAST INDEPENDENT NATIVE KINGDOM IN THE AMERICAS FALLS', 688, since(t, 'march') + .4, '#f4ecd8', 20);
    vig(ctx, .5);
  }

  // ---------- c16: think about that date — after Plymouth, after Harvard, less than 80 years before the American Revolution ----------
  function c16(ctx, lt, dur, t) {
    deskBg(ctx, t); ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = '#1e1a22'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const X = y => 140 + (y - 1600) / 200 * 1000; line(ctx, [[120, 400], [1160, 400]], 6, 'rgba(60,40,20,.6)');
    const EV = [[1620, 'PLYMOUTH', 'pilgrims', '#2f4a8a'], [1636, 'HARVARD', 'harvard', '#8a2a2a'], [1697, 'NOJPETÉN FALLS', 'last', '#5a4a3a'], [1776, 'REVOLUTION', 'revolution', '#2f7a46']];
    for (let i = 0; i < 4; i++) { const [y, l, key, col] = EV[i], k = i === 2 ? lt + .1 : since(t, key) + .1; if (k <= 0) continue; const s = pop(k); ctx.save(); ctx.translate(X(y), 400); ctx.scale(s, s); shape(ctx, col, 3, circle(0, 0, 14)); ctx.restore(); tag(ctx, l, X(y), i % 2 ? 470 : 330, k, 20); txt(ctx, String(y), X(y), i % 2 ? 300 : 500, FX.DISPLAY(24), col); }
    if (since(t, 'eighty') > -.2) { const k = clamp((since(t, 'eighty') + .2) / .8); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = '#c8322a'; ctx.beginPath(); ctx.moveTo(X(1697), 560); ctx.lineTo(X(1697) + (X(1776) - X(1697)) * k, 560); ctx.stroke(); ctx.restore(); if (k >= 1) tag(ctx, 'LESS THAN 80 YEARS', (X(1697) + X(1776)) / 2, 610, since(t, 'eighty'), 24); }
    if (since(t, 'date') > 0) strip(ctx, 'THINK ABOUT THAT DATE', 640, 100, since(t, 'date'), { px: 36 });
    vig(ctx, .5);
  }

  // ---------- c17: that's ending number three. Surely this time it's over. It wasn't. ----------
  function c17(ctx, lt, dur, t) {
    deskBg(ctx, t); ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#1e1a22'; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); ctx.translate(560, 340); ctx.rotate(-.02); ctx.globalAlpha = fade(lt + .2); shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-330, -150, 680, 320)); shape(ctx, '#fbf6ea', 5, rect(-340, -160, 680, 320, 4)); ctx.lineWidth = 10; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-322, -142, 644, 284);
    txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 22), '#5a5048'); txt(ctx, 'THE MAYA', 0, -36, FX.DISPLAY(66)); txt(ctx, 'ARE FINISHED.', 0, 34, FX.DISPLAY(56), RED); line(ctx, [[-200, 84], [200, 84]], 3, '#9a8a7a'); txt(ctx, 'Ending #3 — Nojpetén falls, 1697', 0, 112, FX.FONT(700, 17), '#5a5048'); ctx.restore();
    counter(ctx, 1060, 230, `ENDINGS: ${since(t, 'three') > 0 ? 3 : 2}`, lt + .1, 'DECLARED', GOLD, 44);
    if (since(t, 'over') > 0) tag(ctx, 'SURELY THIS TIME IT\'S OVER', 560, 560, since(t, 'over'), 24);
    if (since(t, 'wasnt') > 0) FX.stamp(ctx, "IT WASN'T", 560, 640, since(t, 'wasnt'), { color: '#2f7a46', size: 48 });
    vig(ctx, .5);
  }

  // ---------- c18: 1847 — pushed off their land and into debt, Maya communities rise up: the Caste War ----------
  const REBEL = [[-87.2, 21.4], [-88.4, 21.3], [-89.2, 20.9], [-89.9, 20.4], [-90.2, 19.6], [-89.8, 18.8], [-88.9, 18.3], [-88.0, 18.4], [-87.5, 19.3], [-87.0, 20.4]];
  function c18(ctx, lt, dur, t) {
    const sp = clamp((t - A.rose + .3) / (A.peninsula - A.rose + 1));
    ctx.save(); T.cam(ctx, 1.9, ...MP([-88.9, 20.0])); mayaMap(ctx, t, { today: false, borders: false });
    const [cx, cy] = MP([-88.0, 19.6]); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 40 + 320 * ease.out(sp), 0, 7); ctx.clip(); shape(ctx, 'rgba(160,50,40,.45)', 3, c => { const p = REBEL.map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); }); ctx.restore();
    site(ctx, 'merida', lt + .2, 'MÉRIDA', { r: 8, px: 15, col: '#2f4a8a', left: true }); site(ctx, [-90.53, 19.85], lt + .3, 'CAMPECHE', { r: 8, px: 15, col: '#2f4a8a', left: true });
    ctx.restore();
    counter(ctx, 160, 110, '1847', since(t, 'seven') + .1, null, GOLD, 40);
    if (since(t, 'land') > 0) tag(ctx, 'PUSHED OFF THEIR LAND — AND INTO DEBT', 640, 600, since(t, 'land'), 22);
    if (since(t, 'cast') > 0) strip(ctx, 'THE CASTE WAR', 640, 90, since(t, 'cast'), { px: 44, color: '#8a2a2a' });
    if (since(t, 'peninsula') > 0) tag(ctx, 'NEARLY DROVE THEIR ENEMIES OFF THE PENINSULA', 640, 660, since(t, 'peninsula'), 20);
    vig(ctx, .5);
  }

  // ---------- c19: in the eastern jungles, an independent state around Chan Santa Cruz and its "speaking cross" ----------
  function c19(ctx, lt, dur, t) {
    M.sky(ctx, t, 1.6, 470); M.jungle(ctx, 430, 1.6, t); shape(ctx, '#6a9a4a', 0, rect(-600, 470, 2600, 300));
    // the shrine: a long stone church-like building with a cross on its altar
    shape(ctx, '#e0d4b8', 4, rect(380, 300, 520, 260)); shape(ctx, '#c8bca0', 4, poly([[360, 300], [640, 230], [920, 300]])); shape(ctx, '#3a2e26', 3, c => { c.roundRect(580, 420, 120, 140, 50); });
    const ck = fade(since(t, 'speaking') + .2); glow(ctx, 640, 470, 120, `rgba(255,220,140,${.4 * ck})`); line(ctx, [[640, 520], [640, 440]], 8, '#6a4a2a'); line(ctx, [[614, 466], [666, 466]], 8, '#6a4a2a');
    if (since(t, 'orders') > 0) for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = fade(since(t, 'orders') - i * .2) * .8; ctx.lineWidth = 4; ctx.strokeStyle = '#f6c945'; ctx.beginPath(); ctx.arc(640, 466, 60 + i * 26, -.6, .6); ctx.stroke(); ctx.beginPath(); ctx.arc(640, 466, 60 + i * 26, Math.PI - .6, Math.PI + .6); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 8; i++) sil(ctx, 120 + i * 150 + (i > 3 ? 200 : 0), 700, .6, '#3a2e30');
    const yr = Math.round(lerp(1850, 1901, clamp((t - A.half2 + .5) / 2))); if (since(t, 'half2') > -.5) counter(ctx, 1110, 110, String(yr), since(t, 'half2') + .5, null, GOLD, 34);
    if (since(t, 'chance') > 0) tag(ctx, 'CHAN SANTA CRUZ', 640, 200, since(t, 'chance'), 26);
    if (since(t, 'independent') > 0) tag(ctx, 'THEIR OWN INDEPENDENT STATE', 300, 110, since(t, 'independent'), 22);
    if (since(t, 'speaking') > 0) tag(ctx, 'THE "SPEAKING CROSS"', 640, 600, since(t, 'speaking'), 24);
    if (since(t, 'help') > 0) tag(ctx, 'IT HELD FOR MORE THAN HALF A CENTURY', 640, 650, since(t, 'help'), 20);
    vig(ctx, .5);
  }

  // ---------- c20: 1901 — Mexican troops occupy Chan Santa Cruz. Death toll estimates vary enormously. Ending #4 ----------
  function c20(ctx, lt, dur, t) {
    deskBg(ctx, t); ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#1e1a22'; ctx.fillRect(0, 0, W, H); ctx.restore();
    counter(ctx, 330, 130, '1901', Math.max(lt, since(t, 'occupied') + .1), 'CHAN SANTA CRUZ OCCUPIED', GOLD, 40);
    if (since(t, 'estimates') > -.2) { const k = fade(since(t, 'estimates') + .2); ctx.save(); ctx.globalAlpha = k; ctx.translate(330, 380); shape(ctx, '#fbf6ea', 4, rect(-260, -80, 520, 180, 8)); txt(ctx, 'DEATH TOLL ESTIMATES', 0, -50, FX.DISPLAY(22)); const g = grad(ctx, -220, 0, 220, 0, [[0, '#d8a080'], [1, '#6a1a1a']]); shape(ctx, g, 3, rect(-220, -10, 440, 36, 18)); txt(ctx, 'TENS OF THOUSANDS', -120, 60, FX.FONT(800, 16)); txt(ctx, '→  FAR MORE', 130, 60, FX.FONT(800, 16)); ctx.restore(); }
    if (since(t, 'tens') > -.4) { ctx.save(); ctx.translate(900, 360); ctx.globalAlpha = fade(since(t, 'tens') + .4); shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-226, -146, 460, 300)); shape(ctx, '#fbf6ea', 5, rect(-230, -150, 460, 300, 4)); ctx.lineWidth = 8; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-216, -136, 432, 272); txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 20), '#5a5048'); txt(ctx, 'THE MAYA', 0, -44, FX.DISPLAY(46)); txt(ctx, 'ARE FINISHED.', 0, 6, FX.DISPLAY(40), RED); txt(ctx, 'Ending #4 — Caste War of Yucatán,', 0, 62, FX.FONT(700, 15), '#5a5048'); txt(ctx, '1847–1901 (estimates of deaths vary widely)', 0, 86, FX.FONT(700, 15), '#5a5048'); ctx.restore();
      counter(ctx, 900, 620, `ENDINGS: ${since(t, 'far') > 0 ? 4 : 3}`, since(t, 'tens') + .3, null, GOLD, 36); }
    vig(ctx, .5);
  }

  // ---------- c21: the twentieth century, the hardest chapter — Guatemala, 1960–1996 ----------
  const GUA = [[-92.2, 14.55], [-92.15, 15.05], [-91.73, 16.07], [-90.45, 16.07], [-90.6, 16.5], [-91.1, 16.9], [-91.44, 17.25], [-90.98, 17.25], [-90.98, 17.82], [-89.15, 17.82], [-89.15, 15.9], [-88.2, 15.72], [-89.15, 14.6], [-89.36, 14.42], [-90.1, 13.75], [-91.0, 13.92], [-91.8, 14.25]];
  function guatemala(ctx, t, col = '#5a4a4a') { shape(ctx, col, 3, c => { const p = GUA.map(MP); c.moveTo(...p[0]); for (const q of p.slice(1)) c.lineTo(...q); c.closePath(); }); }
  function c21(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#1e1a22'], [1, '#141016']]), 0, rect(0, 0, W, H));
    ctx.save(); T.cam(ctx, 1.7, ...MP([-90.3, 15.7])); ctx.globalAlpha = fade(lt); guatemala(ctx, t, '#4a4048'); ctx.restore();
    quiet(ctx, 'THE HARDEST CHAPTER OF ALL', 90, since(t, 'hardest'), '#f4ecd8', 32);
    if (since(t, 'sixty') > 0) quiet(ctx, 'GUATEMALA · 1960–1996', 640, since(t, 'sixty'), GOLD, 34);
    quiet(ctx, 'AN INTERNAL ARMED CONFLICT — GOVERNMENT AND LEFTIST GUERRILLAS', 690, since(t, 'conflict'), '#e8dcc8', 18);
    vig(ctx, .6);
  }

  // ---------- c22: the Commission for Historical Clarification, 1999: 200,000+ killed or disappeared; 83% of identified victims were Maya ----------
  function c22(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#1e1a22'], [1, '#141016']]), 0, rect(0, 0, W, H));
    { const k = fade(Math.max(lt, since(t, 'commission') + .2)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.translate(270, 360); shape(ctx, '#e8e4dc', 4, rect(-160, -220, 320, 440, 6)); shape(ctx, '#3a4a6a', 0, rect(-160, -220, 320, 70, 6)); txt(ctx, 'GUATEMALA', 0, -186, FX.DISPLAY(28), '#fff'); txt(ctx, 'MEMORY OF', 0, -110, FX.DISPLAY(30), '#3a3a3a'); txt(ctx, 'SILENCE', 0, -70, FX.DISPLAY(38), '#3a3a3a'); txt(ctx, 'Commission for', 0, 60, FX.FONT(700, 18), '#5a5a5a'); txt(ctx, 'Historical Clarification', 0, 86, FX.FONT(700, 18), '#5a5a5a'); txt(ctx, '1999', 0, 160, FX.DISPLAY(32), '#3a4a6a'); ctx.restore(); } }
    // 200,000+: rows of small dots, filling quietly
    const fk = clamp((t - A.more + .2) / 3.0); for (let i = 0; i < 400; i++) { if (i / 400 > fk) break; const x = 520 + (i % 40) * 17, y = 160 + Math.floor(i / 40) * 26, mayaDot = (i % 100) < 83; shape(ctx, since(t, 'eighty2') > 0 && mayaDot ? '#c8a060' : '#8a8a92', 0, circle(x, y, 6)); }
    if (since(t, 'more') > 0) { ctx.save(); ctx.globalAlpha = fade(since(t, 'more')); txt(ctx, 'MORE THAN 200,000 KILLED OR DISAPPEARED', 860, 500, FX.DISPLAY(24), '#f4ecd8'); ctx.restore(); }
    if (since(t, 'eighty2') > 0) { ctx.save(); ctx.globalAlpha = fade(since(t, 'eighty2')); txt(ctx, '83% OF THE FULLY IDENTIFIED VICTIMS WERE MAYA', 860, 560, FX.DISPLAY(24), '#e8c890'); ctx.restore(); }
    vig(ctx, .6);
  }

  // ---------- c23: genocide — early 1980s, specific regions, agents of the state ----------
  const REG = [[-91.15, 15.45], [-90.45, 15.08], [-90.88, 15.03], [-91.55, 15.75]];
  function c23(ctx, lt, dur, t) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#1e1a22'], [1, '#141016']]), 0, rect(0, 0, W, H));
    ctx.save(); T.cam(ctx, 1.9, ...MP([-90.6, 15.4])); guatemala(ctx, t, '#4a4048'); const rk = fade(since(t, 'regions') + .2); for (const r of REG) { const [x, y] = MP(r); ctx.save(); ctx.globalAlpha = rk * .8; shape(ctx, '#8a3a3a', 0, circle(x, y, 22)); ctx.restore(); } ctx.restore();
    band(ctx, 520, 720, .7);
    if (since(t, 'eighties') > -.2) quiet(ctx, 'EARLY 1980s · SPECIFIC REGIONS', 560, since(t, 'eighties') + .2, GOLD, 26);
    if (since(t, 'genocide') > -.3) quiet(ctx, 'AGENTS OF THE STATE COMMITTED ACTS OF GENOCIDE AGAINST MAYA GROUPS', 615, since(t, 'genocide') + .3, '#f4ecd8', 20);
    quiet(ctx, 'Commission for Historical Clarification, "Guatemala: Memory of Silence," 1999', 670, since(t, 'genocide') + 1.0, '#c8c0b4', 16);
    vig(ctx, .6);
  }

  // ---------- c24: not a collapse, not a drought, not an ending the Maya chose. Not ending #5 — an attempt to make one. It failed. ----------
  function c24(ctx, lt, dur, t) {
    const dawn = clamp((since(t, 'failed') + .4) / 1.6);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, mix('#141016', '#e8a070', dawn)], [1, mix('#1e1a22', '#f4d8a8', dawn)]]), 0, rect(0, 0, W, H));
    quiet(ctx, 'NOT A COLLAPSE.', 150, since(t, 'collapse'), '#f4ecd8', 34); quiet(ctx, 'NOT A DROUGHT.', 210, since(t, 'drought'), '#f4ecd8', 34); quiet(ctx, 'NOT AN ENDING THE MAYA CHOSE.', 270, since(t, 'ending'), '#f4ecd8', 34);
    quiet(ctx, 'PEOPLE KILLED FOR WHO THEY WERE.', 360, since(t, 'killed'), '#e8c890', 34);
    if (since(t, 'five') > -.3) { const k = fade(since(t, 'five') + .3); ctx.save(); ctx.globalAlpha = k * (1 - dawn); txt(ctx, 'NOT ENDING #5 —', 640, 450, FX.DISPLAY(32), '#f4ecd8'); if (since(t, 'attempt') > 0) txt(ctx, 'AN ATTEMPT TO MAKE ONE.', 640, 500, FX.DISPLAY(32), '#f4ecd8'); ctx.restore(); }
    // at "it failed": a dawn, and people still standing
    if (dawn > 0) { ctx.save(); ctx.globalAlpha = dawn; shape(ctx, '#6a8a4a', 0, rect(0, 560, W, 160)); for (let i = 0; i < 9; i++) sil(ctx, 200 + i * 110, 680, .9 - (i % 3) * .1, '#2a2228'); ctx.restore(); }
    if (since(t, 'failed') > 0) { ctx.save(); ctx.translate(640, 470); const s = FX.settle(clamp(since(t, 'failed') / .5)); ctx.scale(s, s); shape(ctx, '#2f7a46', 0, rect(-170, -40, 340, 80, 12)); txt(ctx, 'IT FAILED.', 0, 2, FX.DISPLAY(44), '#fff'); ctx.restore(); }
    vig(ctx, .6);
  }

  const cut = [[0, c1], [A.the1 - .1, c2], [A.that1 - .1, c3], [A.alongside - .1, c4], [A.and1 - .1, c5], [A.the2 - .1, c6], [A.people1 - .1, c7], [A.and2 - .1, c8], [A.london - .1, c9], [A.he1 - .1, c10], [A.today - .1, c11], [A.and3 - .1, c12], [A.the3 - .1, c13], [A.ruling - .1, c14], [A.on1 - .1, c15], [A.think - .1, c16], [A.thats1 - .1, c17], [A.in2 - .1, c18], [A.in3 - .1, c19], [A.mexican - .1, c20], [A.and4 - .1, c21], [A.when - .1, c22], [A.and5 - .1, c23], [A.not1 - .1, c24]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .4 }, { t: A.arrived, type: 'wind', gain: .4 }, { t: A.dozens, type: 'click', gain: .3 }, { t: A.seventeen, type: 'thud', gain: .4 }, { t: A.kingdom, type: 'thud', gain: .3 },
    { t: A.deadly, type: 'wind', gain: .4 }, { t: A.fire, type: 'swell', gain: .4 }, { t: A.july, type: 'thud', gain: .4 }, { t: A.affair, type: 'thud', gain: .3 }, { t: A.smashed, type: 'rattle', gain: .3 },
    { t: A.books, type: 'paper', gain: .3 }, { t: A.twenty, type: 'thud', gain: .4 }, { t: A.we, type: 'paper', gain: .3 }, { t: A.only, type: 'swell', gain: .3 }, { t: A.shipped, type: 'slide', gain: .3 }, { t: A.keep, type: 'click', gain: .4 },
    { t: A.pizza, type: 'thud', gain: .3 }, { t: A.fled, type: 'slide', gain: .3 }, { t: A.stormed, type: 'boom', gain: .4 }, { t: A.eighty, type: 'slide', gain: .3 }, { t: A.three, type: 'thud', gain: .5 }, { t: A.wasnt, type: 'thud', gain: .5 },
    { t: A.rose, type: 'swell', gain: .4 }, { t: A.cast, type: 'thud', gain: .4 }, { t: A.speaking, type: 'swell', gain: .3 }, { t: A.occupied, type: 'thud', gain: .4 }, { t: A.far, type: 'thud', gain: .4 },
    { t: A.failed, type: 'swell', gain: .5 },
  ];
  // tonal drop: no humour; low drone; silence held over the genocide finding; warmth returns only on "it failed"
  const moods = [{ t: 0, mood: 'under' }, { t: A.and1 - .2, mood: 'mystery' }, { t: A.today - .2, mood: 'under' }, { t: A.in2 - .2, mood: 'tense' }, { t: A.and4 - .2, mood: 'mystery' }, { t: A.and5 - .2, mood: 'silence' }, { t: A.failed - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'maya/assets/audio/narration-conquest.mp3', shots, sfx, moods,
    images: { landa: 'assets/img/landa-portrait.jpg', alphabet: 'assets/img/landa-alphabet.jpg', dresden: 'assets/img/dresden-p09.jpg', madrid30: 'assets/img/madrid-30a-crop.jpg', madrid90: 'assets/img/madrid-90-92-crop.jpg', paris: 'assets/img/paris-23-24-crop.jpg' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '800 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
