/* Venice — "Job two: a foundation" (narration-jobtwo.mp3 = 2.0 s chapter pause + narration-full.mp3 184.6–251.9 s).
 * Anchors = full-recording word times − 182.6. New angles throughout (no repeat of the cold open's ground cross-section). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945', GREEN = '#2f7a46';
  const F = { problem: 185.06, mud: 187.23, sohere: 188.42, take: 190.17, trunk: 190.81, oak: 191.53, larch: 192.18, alder: 192.99, sharpen: 194.0, hammered: 195.16,
    straight: 195.66, soft: 196.76, mud2: 197.18, another1: 198.48, beside: 199.27, another2: 200.6, thousands: 201.68, packed: 202.9, brace: 204.0,
    deck: 206.37, timber: 206.71, stone: 207.7, building: 208.75, wondering: 210.88, wood: 212.82, water: 213.7, rotted: 214.74, rot: 216.14, oxygen: 216.9,
    sealed: 218.27, none: 220.16, bell: 221.46, collapsed: 223.05, y1902: 223.67, piles: 224.89, thousand: 226.85, sound: 229.08, nobody: 230.5, estimates: 232.14,
    bridge: 233.22, twelve: 234.47, fourteen: 235.07, trunks: 236.33, record: 237.44, sixteen: 238.0, church: 239.56, salute: 240.22, took: 241.98,
    million: 242.57, hundred1: 243.47, thousand2: 244.07, hundred2: 244.95, fifty: 245.25, seven: 245.63, somebody: 246.58, counted: 247.07,
    same: 247.99, newjob: 249.52, foundation: 250.9 };
  const A = {}; for (const k in F) A[k] = F[k] - 182.6; A.end = 70.8;
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

  // ---------- d1: chapter card — JOB TWO, A FOUNDATION (blueprint table) ----------
  function blueprintBg(ctx, col = '#2f7ac0') { shape(ctx, col, 0, rect(-400, -400, 2100, 1600));
    ctx.save(); ctx.globalAlpha = .22; for (let x = -400; x < 1700; x += 40) line(ctx, [[x, -400], [x, 1200]], x % 200 ? 1 : 2.5, '#fff'); for (let y = -400; y < 1200; y += 40) line(ctx, [[-400, y], [1700, y]], y % 200 ? 1 : 2.5, '#fff'); ctx.restore(); }
  function d1(ctx, lt, dur, t) {
    blueprintBg(ctx);
    ctx.save(); ctx.globalAlpha = .55; for (let i = 0; i < 14; i++) line(ctx, [[200 + i * 64, 520], [200 + i * 64, 700]], 6, '#fff'); line(ctx, [[180, 520], [1060, 520]], 5, '#fff'); line(ctx, [[180, 500], [1060, 500]], 5, '#fff');
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.strokeRect(330, 300, 580, 200); for (let i = 0; i < 6; i++) ctx.strokeRect(360 + i * 92, 340, 52, 70); ctx.restore();
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420); V.lagoon(ctx, 640, 690, 520, t, { look: [-.5, -.6], eyes: blink(t, 1.3), mouth: 'o', hat: (c, x, y) => V.hats.helmet(c, x, y) }); ctx.restore();
    strip(ctx, 'JOB TWO', 640, 120, lt - .05, { px: 58 }); strip(ctx, 'A FOUNDATION', 640, 222, lt - .75, { px: 44, color: RED, rot: .02 });
    vig(ctx);
  }

  // ---------- d2: one problem — Rivo Alto is mud (the model house sinks) ----------
  function modelHouse(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    shape(ctx, '#e8a87a', 4, rect(-60, -110, 120, 110)); shape(ctx, '#b8503a', 4, poly([[-70, -108], [0, -150], [70, -108]])); for (const dx of [-30, 18]) shape(ctx, '#5a6a7a', 3, rect(dx, -86, 22, 30, 8)); shape(ctx, '#6e4a2c', 3, rect(-12, -40, 24, 40, 6)); ctx.restore(); }
  function d2(ctx, lt, dur, t) {
    const md = since(t, 'mud'), pr = since(t, 'problem');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 420);
    sky(ctx, t); farShore(ctx, 470, t); waterBand(ctx, 480, t);
    shape(ctx, '#8a7a52', 4.5, smooth([[120, 560], [260, 500], [560, 486], [900, 492], [1160, 540], [1100, 600], [640, 620], [200, 610]]));
    for (let i = 0; i < 26; i++) { const x = 150 + i * 38, b = 520 + (i % 3) * 8, h = 40 + (i * 23) % 40; line(ctx, [[x, b], [x + Math.sin(t * 1.4 + i) * 5, b - h]], 5, i % 2 ? '#6f7f34' : '#5a6a2a'); }
    // the leader sets the model of his new house on the mud... and it sinks
    const placed = pr > .4, sink = md > 0 ? ease.inOut(clamp(md / 1.4)) : 0, X = 470, Y = 560, S = .32;
    fig(ctx, X, Y, S, P('elder', 'tunicElder', { hands: placed ? { L: [-130, -470], R: [150, -520] } : { L: [120, -700], R: [300, -700] }, lean: placed ? 0 : .08,
      face: { brows: md > .2 ? 'worried' : 'up', mouth: md > .2 ? 'o' : 'smile', look: [.8, .6], eyes: blink(t, 3.2) }, breathe: breathe(t) }));
    const hx = placed ? 640 : X + 230 * S, hy = placed ? 540 + sink * 70 : Y - 700 * S + 10;
    ctx.save(); ctx.beginPath(); ctx.rect(0, -400, 1400, 540 + 400 + 4); ctx.clip(); modelHouse(ctx, hx, hy, placed ? 1 : .8, sink * .22); ctx.restore();
    if (md > 0) for (let i = 0; i < 6; i++) { const k = clamp((md - i * .12) / .5), a = Math.PI * (1.1 + i * .16); if (k > 0 && k < 1) shape(ctx, '#6e5a3a', 2.5, circle(640 + Math.cos(a) * 90 * k, 540 + Math.sin(a) * 60 * k + k * k * 40, 7 * (1 - k * .5))); }
    if (md > .3) shape(ctx, '#6e5a3a', 3, ellipse(640, 542, 90, 12));
    ctx.restore();
    strip(ctx, 'ONE PROBLEM', 900, 100, pr, { px: 42 });
    if (md > 0) strip(ctx, 'RIVO ALTO IS MUD', 900, 196, md, { px: 34, color: RED, rot: .02 });
    reedsFG(ctx, t); vig(ctx);
    FX.dateTag(ctx, 'RIVO ALTO, 800s');
  }

  // ---------- d3: take a tree trunk — oak, larch, alder (rafts down the rivers) ----------
  function tree(ctx, x, y, s, kind) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#7a5434', 4, rect(-12, -110, 24, 110));
    if (kind === 'larch') { for (let i = 0; i < 4; i++) shape(ctx, '#6a9a4a', 4, poly([[-60 + i * 10, -80 - i * 40], [0, -150 - i * 40], [60 - i * 10, -80 - i * 40]])); }
    else shape(ctx, kind === 'oak' ? '#5a8a3a' : '#7aaa4a', 4, smooth([[-80, -110], [-90, -170], [-50, -220], [0, -236], [50, -220], [90, -170], [80, -110], [0, -96]])); ctx.restore(); }
  function leaf(ctx, x, y, s, kind) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (kind === 'oak') shape(ctx, '#5a8a3a', 3.5, smooth([[0, -40], [14, -30], [10, -18], [20, -8], [12, 4], [20, 16], [0, 34], [-20, 16], [-12, 4], [-20, -8], [-10, -18], [-14, -30]]));
    else if (kind === 'larch') { for (let i = -4; i <= 4; i++) line(ctx, [[0, 10], [i * 7, -30]], 4, '#4a7a3a'); shape(ctx, '#8a6a3a', 3, circle(0, 12, 8)); }
    else shape(ctx, '#7aaa4a', 3.5, smooth([[0, -36], [24, -14], [20, 18], [0, 32], [-20, 18], [-24, -14]]));
    line(ctx, [[0, 34], [0, 48]], 3, '#5a4026'); ctx.restore(); }
  function d3(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    sky(ctx, t, '#86c8ea', '#f6ecc8');
    shape(ctx, '#b8c8d0', 4, poly([[-200, 300], [100, 120], [300, 260], [520, 90], [760, 270], [980, 110], [1200, 280], [1500, 160], [1500, 400], [-200, 400]])); for (const [x, y] of [[100, 120], [520, 90], [980, 110]]) shape(ctx, '#f4f6f8', 0, poly([[x - 40, y + 30], [x, y], [x + 40, y + 30]]));
    for (let i = 0; i < 22; i++) tree(ctx, -100 + i * 70, 420 + (i % 2) * 10, .5 + (i % 3) * .08, ['oak', 'larch', 'alder'][i % 3]);
    shape(ctx, '#9ab868', 0, rect(-200, 420, 1700, 60));
    // the river carries a raft of logs down toward the lagoon
    shape(ctx, '#6ab0c4', 4, c => { c.moveTo(-200, 520); c.quadraticCurveTo(640, 470, 1500, 540); c.lineTo(1500, 640); c.quadraticCurveTo(640, 580, -200, 640); c.closePath(); });
    const rx = -300 + lt * 90; for (let i = 0; i < 5; i++) log(ctx, rx + i * 8, 540 + i * 16, 260, 13, -.02);
    fig(ctx, rx + 60, 548, .17, P('fisher', 'tunicPoor', { hands: { L: [120, -900], R: [180, -500] } }));
    line(ctx, [[rx + 60 + 120 * .17, 548 - 900 * .17], [rx + 60 + 200 * .17, 600]], 4, '#7a5434');
    shape(ctx, '#8a9a52', 0, rect(-200, 630, 1700, 200));
    // the three trunks roll forward, one per species, on the words
    [['oak', 'OAK'], ['larch', 'LARCH'], ['alder', 'ALDER']].forEach(([k, s], i) => { const d = since(t, k); if (d <= 0) return; const x = FX.approach(t, A[k], 1500, 330 + i * 300, .16), rot = (x - (330 + i * 300)) * -.01;
      log(ctx, x, 632, 240, 26, 0); ctx.save(); ctx.translate(x - 30, 572); ctx.rotate(rot * .1); leaf(ctx, 0, -40, 1.1, k); ctx.restore(); tag(ctx, s, x, 686, d - .1, 24); });
    ctx.restore();
    strip(ctx, 'TAKE A TREE TRUNK', 640, 100, since(t, 'take'), { px: 40 });
    vig(ctx);
    FX.dateTag(ctx, 'FROM THE MAINLAND FORESTS');
  }

  // ---------- d4: sharpen one end, hammer it straight down through the soft mud ----------
  function d4(ctx, lt, dur, t) {
    const sh = since(t, 'sharpen'), hm = since(t, 'hammered');
    const blows = [A.hammered, A.straight + .2, A.soft, A.mud2 + .3], nb = blows.filter(b => t >= b).length, last = blows[nb - 1] ?? -9, since1 = t - last;
    const drive = nb ? (nb - 1 + clamp(since1 / .12)) / 4 : 0;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    sky(ctx, t); farShore(ctx, 440, t);
    // half-built scaffold and other driven piles behind
    for (let i = 0; i < 7; i++) { const x = 140 + i * 160; shape(ctx, '#a8784a', 3.5, rect(x - 11, 380, 22, 130)); shape(ctx, '#e0b884', 3, ellipse(x, 380, 11, 5)); }
    waterBand(ctx, 500, t, -600, 2200, '#5aa0b4'); shape(ctx, '#7a6a48', 4, rect(-600, 560, 2800, 400));
    // the pile driver: a tripod of poles, a heavy rammer lifted by ropes, four men hauling
    const up = nb ? (since1 < .12 ? 0 : clamp((since1 - .2) / .45)) : (t > A.sharpen + 1 ? clamp((t - A.sharpen - 1) / .5) : 0);
    const ramY = lerp(410 + drive * 120, 230, ease.out(up)), pileTop = 420 + drive * 120;
    line(ctx, [[520, 560], [640, 140]], 10, '#6e4a2c'); line(ctx, [[760, 560], [640, 140]], 10, '#6e4a2c'); line(ctx, [[640, 100], [640, 150]], 8, '#6e4a2c'); shape(ctx, '#5a3a22', 4, circle(640, 140, 14));
    if (sh > .9 || hm > 0) { ctx.save(); ctx.beginPath(); ctx.rect(0, -400, 1400, 560 + 400 + 6); ctx.clip();
      shape(ctx, '#a8784a', 4, c => { c.moveTo(626, pileTop); c.lineTo(654, pileTop); c.lineTo(654, pileTop + 230); c.lineTo(640, pileTop + 262); c.lineTo(626, pileTop + 230); c.closePath(); }); shape(ctx, '#e0b884', 3, ellipse(640, pileTop, 14, 6)); ctx.restore();
      line(ctx, [[640, 140], [640, ramY - 40]], 3, '#c9a35a'); shape(ctx, '#5a4026', 4.5, rect(600, ramY - 40, 80, 46, 8));
      for (let i = 0; i < 4; i++) { const d = i < 2 ? -1 : 1, x = 640 + d * (170 + (i % 2) * 90), pull = ease.out(up) * 80;
        line(ctx, [[640, 140], [x - d * 30, 330 + pull * .3]], 3, '#c9a35a');
        fig(ctx, x, 600, .22, P(i % 2 ? 'elder' : 'fisher', i % 2 ? 'tunicElder' : 'tunicPoor', { hands: { L: [d * -60, -820 + pull * 2], R: [d * -20, -760 + pull * 2] }, handShape: { L: 'fist', R: 'fist' }, lean: d * -.1 * up, face: { brows: 'strain', mouth: up > .5 ? 'grit' : 'o', look: [-d * .5, -.6] } }), { mirror: d > 0 }); }
      if (since1 >= 0 && since1 < .5 && nb) { const k = since1 / .5; for (let i = 0; i < 8; i++) { const a = Math.PI * (1.05 + i * .11); shape(ctx, '#6e5a3a', 2.5, circle(640 + Math.cos(a) * 110 * k, 560 + Math.sin(a) * 50 * k + k * k * 30, 6 * (1 - k))); } line(ctx, [[580, ramY + 8], [560, ramY + 20]], 4, '#fff'); line(ctx, [[700, ramY + 8], [720, ramY + 20]], 4, '#fff'); } }
    // before that: an axe sharpens the end, chips flying
    if (sh > 0 && sh < 1.1) { const sw = Math.sin(sh * 16), X = 360, Y = 620;
      log(ctx, 700, 610, 300, 22, 0); fig(ctx, X, Y, .26, P('fisher', 'tunicPoor', { hands: { L: [200, -700 + sw * 120], R: [260, -760 + sw * 120] }, handShape: { L: 'fist', R: 'fist' }, lean: .12, face: { brows: 'strain', mouth: 'grit', look: [1, .4] } }));
      const hx = X + 260 * .26, hy = Y - (760 - sw * 120) * .26; line(ctx, [[hx, hy], [hx + 60, hy - 40]], 6, '#7a5434'); shape(ctx, '#9aa0a8', 3.5, poly([[hx + 50, hy - 52], [hx + 82, hy - 44], [hx + 70, hy - 20]]));
      for (let i = 0; i < 5; i++) { const k = (sh * 3 + i / 5) % 1; shape(ctx, '#e0b884', 2, rect(850 + k * 80, 590 - k * 60 + k * k * 120, 9, 5, 1)); } }
    ctx.restore();
    if (sh > 0 && hm < 0) strip(ctx, 'SHARPEN ONE END', 640, 100, sh, { px: 38 }); else strip(ctx, 'HAMMER IT STRAIGHT DOWN', 640, 100, hm, { px: 38 });
    vig(ctx);
    FX.dateTag(ctx, 'BUILDING ON RIVO ALTO');
  }

  // ---------- d5: another beside it, another — thousands, packed so tight they brace each other (top-down) ----------
  function d5(ctx, lt, dur, t) {
    const th = since(t, 'thousands'), br = since(t, 'brace');
    const z = T.keys(t, [[A.another1 - .4, 2.6], [A.another2 + .3, 1.9], [A.thousands + .4, 1.0]]);
    ctx.save(); cam(ctx, z, 640, 360);
    shape(ctx, '#7a6a48', 0, rect(-400, -400, 2100, 1500)); const r0 = rng(12); for (let i = 0; i < 90; i++) shape(ctx, 'rgba(60,46,30,.25)', 0, ellipse(r0() * 1300, r0() * 720, 6 + r0() * 14, 3 + r0() * 6));
    shape(ctx, '#5aa0b4', 4, rect(-400, -400, 2100, 120)); shape(ctx, '#5aa0b4', 4, rect(-400, 640, 2100, 300));
    ctx.save(); ctx.setLineDash([14, 10]); ctx.strokeStyle = '#f4efe2'; ctx.lineWidth = 4; ctx.strokeRect(250, 150, 780, 420); ctx.restore();
    // pile heads appear: one, beside it, another… then the whole footprint fills
    const cols = 26, rows = 14, sp = 30, x0 = 640 - (cols - 1) * sp / 2, y0 = 360 - (rows - 1) * sp / 2;
    const order = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) order.push([c, r, Math.hypot(c - cols / 2 + .5, r - rows / 2 + .5)]);
    order.sort((a, b) => a[2] - b[2]);
    const shown = t < A.another1 ? 1 : t < A.another2 ? 2 : t < A.thousands ? 3 : Math.min(order.length, 3 + Math.floor((t - A.thousands) * 140));
    order.forEach(([c, r], i) => { if (i >= shown) return; const x = x0 + c * sp, y = y0 + r * sp, born = i < 3 ? [A.take, A.another1, A.another2][i] : A.thousands + (i - 3) / 140, k = pop(t - born, .2), sq = br > 0 ? 1 + .06 * Math.exp(-br * 2) * Math.sin(br * 12) : 1;
      ctx.save(); ctx.translate(x, y); ctx.scale(k * sq, k * sq); shape(ctx, '#d8a868', 2.5, circle(0, 0, 13.5)); shape(ctx, null, 1.5, circle(0, 0, 8)); shape(ctx, '#a8784a', 0, circle(0, 0, 3)); ctx.restore(); });
    if (br > 0) { const k = pop(br); for (const [x, y, a] of [[230, 360, 0], [1050, 360, Math.PI], [640, 130, Math.PI / 2], [640, 590, -Math.PI / 2]]) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(k, k); shape(ctx, RED, 4, poly([[-30, -16], [10, -16], [10, -32], [40, 0], [10, 32], [10, 16], [-30, 16]])); ctx.restore(); } }
    ctx.restore();
    if (th > 0) { const n = Math.min(10000, Math.floor(ease.in(clamp(th / 1.2)) * 10000)), s = pop(th); ctx.save(); ctx.translate(1060, 110); ctx.scale(s, s); FX.bigText(ctx, th > 1.2 ? 'THOUSANDS' : n.toLocaleString('en-US'), 0, 0, 52, { color: GOLD }); ctx.restore(); }
    if (br > 0) strip(ctx, 'THEY BRACE EACH OTHER', 640, 660, br, { px: 34, rot: .01 }); else if (t < A.thousands) strip(ctx, t < A.another2 ? 'ANOTHER, RIGHT BESIDE IT' : 'THEN ANOTHER', 640, 660, since(t, 'another1'), { px: 34 });
    vig(ctx);
    FX.dateTag(ctx, 'FROM ABOVE');
  }

  // ---------- d6: on top goes a deck of timber, then stone, then a building (colour blueprint) ----------
  function d6(ctx, lt, dur, t) {
    blueprintBg(ctx, '#3a86c8');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    const base = 600, L0 = 330, L1 = 950;
    shape(ctx, 'rgba(120,92,60,.6)', 3, rect(-200, base, 1700, 200)); txt(ctx, 'MUD', 1080, 680, FX.DISPLAY(26), '#fff');
    for (let i = 0; i < 16; i++) { const x = L0 + 14 + i * 40; shape(ctx, '#c89a62', 3, c => { c.moveTo(x - 10, base - 10); c.lineTo(x + 10, base - 10); c.lineTo(x + 10, base + 150); c.lineTo(x, base + 170); c.lineTo(x - 10, base + 150); c.closePath(); }); }
    const dk = since(t, 'deck'), st = since(t, 'stone'), bd = since(t, 'building');
    if (dk > 0) { const y = base - 10 - FX.dropBounce(dk, 300, .2); for (let i = 0; i < 2; i++) shape(ctx, i ? '#a8784a' : '#b8885a', 3.5, rect(L0 - 10, y - 18 - i * 18, L1 - L0 + 20, 18, 2)); for (let x = L0; x < L1; x += 60) line(ctx, [[x, y - 36], [x, y]], 2, 'rgba(70,40,20,.5)'); tag(ctx, 'TIMBER DECK', 1120, y - 20, dk - .2, 22); }
    if (st > 0) { const y = base - 46 - FX.dropBounce(st, 300, .2); for (let r = 0; r < 2; r++) for (let x = L0 - 6 + (r % 2) * 40; x < L1; x += 80) shape(ctx, '#f2ece0', 3, rect(x, y - 30 - r * 30, Math.min(78, L1 + 6 - x), 30, 2)); tag(ctx, 'STONE', 1120, y - 40, st - .2, 22); }
    if (bd > 0) { const rise = FX.settle(clamp(bd / .6)), h = 300 * rise, y = base - 106; ctx.save(); ctx.beginPath(); ctx.rect(L0 - 20, y - 340, L1 - L0 + 40, 340); ctx.clip();
      shape(ctx, '#f0b48a', 4.5, rect(L0, y - h, L1 - L0, h)); for (let k = 0; k < 3; k++) for (let j = 0; j < 6; j++) shape(ctx, '#3a5a7a', 3, c => { const wx = L0 + 40 + j * 100, wy = y - h + 40 + k * 90; c.moveTo(wx, wy + 60); c.lineTo(wx, wy + 18); c.arc(wx + 18, wy + 18, 18, Math.PI, 0); c.lineTo(wx + 36, wy + 60); c.closePath(); });
      shape(ctx, '#b8503a', 4, rect(L0 - 14, y - h - 14, L1 - L0 + 28, 16)); ctx.restore(); tag(ctx, 'BUILDING', 1120, y - 160, bd - .2, 22); }
    tag(ctx, 'PILES', 200, base + 70, lt - .2, 22);
    ctx.restore();
    strip(ctx, 'HOW A VENETIAN HOUSE STANDS', 640, 96, lt - .1, { px: 36 });
    vig(ctx);
  }

  // ---------- d7: why hasn't a city on wood, in water, rotted away? ----------
  function d7(ctx, lt, dur, t) {
    const wd = since(t, 'wood'), wt = since(t, 'water'), rt = since(t, 'rotted');
    // left: a garden fence post in open air (it rots); right: the city on its piles in the lagoon
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 636, H); ctx.clip();
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#9ad4ee'], [1, '#fbecc8']]), 0, rect(0, 0, 636, H)); clouds(ctx, t, [90, 140]);
    shape(ctx, '#8ac060', 0, rect(0, 470, 640, 260)); for (let i = 0; i < 14; i++) { const x = 30 + i * 46; shape(ctx, ['#e86a6a', '#f6c945', '#ffffff'][i % 3], 2.5, circle(x, 520 + (i % 3) * 40, 9)); line(ctx, [[x, 530 + (i % 3) * 40], [x, 560 + (i % 3) * 40]], 3, '#4a7a3a'); }
    const rot = rt > 0 ? clamp(rt / 1.4) : 0;
    ctx.save(); ctx.translate(320, 520); ctx.rotate(rot * .25); shape(ctx, lerp(0, 1, rot) > .5 ? '#7a6a4a' : '#a8784a', 4, rect(-26, -220 + rot * 40, 52, 220 - rot * 40, 4));
    if (rot > 0) { for (const [x, y] of [[-26, -80], [26, -140], [-26, -40]]) { ctx.save(); ctx.globalAlpha = rot; shape(ctx, '#e8d8b0', 3, ellipse(x, y, 22, 9)); shape(ctx, '#c8a878', 2.5, rect(x - 3, y, 6, 14)); ctx.restore(); } for (let k = 0; k < 4; k++) line(ctx, [[-10 + k * 7, -200 + rot * 40], [-14 + k * 7, -120]], 2.5, 'rgba(29,26,23,.4)'); }
    ctx.restore(); for (const x of [120, 520]) { shape(ctx, '#a8784a', 4, rect(x - 22, 330, 44, 190, 4)); } line(ctx, [[100, 380], [540, 380]], 10, '#a8784a'); line(ctx, [[100, 450], [540, 450]], 10, '#a8784a');
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(644, 0, 636, H); ctx.clip();
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8fd0ec'], [1, '#fbe8c0']]), 0, rect(644, 0, 636, H)); clouds(ctx, t, [100, 150]);
    shape(ctx, '#f0d29a', 4.5, rect(760, 180, 400, 300)); for (let k = 0; k < 2; k++) for (let j = 0; j < 4; j++) shape(ctx, '#3a5a7a', 3, rect(790 + j * 95, 220 + k * 120, 40, 70, 18)); shape(ctx, '#b8503a', 4, rect(746, 166, 428, 18));
    shape(ctx, '#f2ece0', 4, rect(740, 480, 440, 26));
    const xr = wt > 0 ? clamp(wt / .5) : 0;
    ctx.save(); ctx.globalAlpha = .85; shape(ctx, V.WATER, 4, c => { c.moveTo(644, 500); for (let x = 644; x <= 1290; x += 30) c.lineTo(x, 500 + Math.sin(x * .03 + t * 1.6) * 5); c.lineTo(1290, 720); c.lineTo(644, 720); c.closePath(); }); ctx.restore();
    if (wd > 0) { ctx.save(); ctx.globalAlpha = .6 + .4 * xr; for (let i = 0; i < 10; i++) shape(ctx, '#c89a62', 3, rect(760 + i * 42, 506, 16, 230)); ctx.restore(); }
    if (rt > .3) { const s = pop(rt - .3); ctx.save(); ctx.translate(960, 110); ctx.scale(s, s); FX.bigText(ctx, '?', 0, 0, 120, { color: GOLD }); ctx.restore(); }
    ctx.restore();
    line(ctx, [[640, 0], [640, H]], 8, '#f3e8cc'); line(ctx, [[640, 0], [640, H]], 2, INK);
    tag(ctx, 'WOOD + AIR', 320, 110, lt - .3, 26); tag(ctx, 'WOOD + WATER', 960, 640, wt, 24);
    if (rt > 0) FX.caption(ctx, 'WHY HASN\'T IT ROTTED AWAY?', rt, .1, W - 60, 30);
    vig(ctx);
  }

  // ---------- d8: rot needs oxygen; wood sealed in wet mud gets almost none ----------
  function o2(ctx, x, y, s, t, ph, munch) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#e86a6a', 3.5, circle(-12, 0, 16)); shape(ctx, '#e86a6a', 3.5, circle(12, 0, 16)); txt(ctx, 'O₂', 0, 1, FX.DISPLAY(13), '#fff');
    ctx.fillStyle = INK; for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(d * 6 - 2, -8, 2.5, 0, 7); ctx.fill(); }
    if (munch) shape(ctx, '#5a1a1a', 2, ellipse(0, 9, 7, 3 + Math.abs(Math.sin(t * 12 + ph)) * 4)); ctx.restore(); }
  function d8(ctx, lt, dur, t) {
    const ox = since(t, 'oxygen'), sl = since(t, 'sealed'), no = since(t, 'none');
    shape(ctx, '#f3e8cc', 0, rect(0, 0, W, H));
    // top panel: in air, oxygen eats the wood (fungus grows)
    ctx.save(); ctx.beginPath(); ctx.rect(30, 30, 1220, 320); ctx.clip();
    shape(ctx, grad(ctx, 0, 30, 0, 350, [[0, '#a8daf0'], [1, '#e8f4f0']]), 0, rect(30, 30, 1220, 320));
    log(ctx, 640, 240, 620, 46, 0, '#a8784a'); const eat = ox > 0 ? clamp(ox / 3) : 0;
    for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = eat; shape(ctx, '#e8d8b0', 3, ellipse(420 + i * 80, 196, 22, 9)); shape(ctx, '#c8a878', 2, rect(417 + i * 80, 196, 6, 12)); ctx.restore(); }
    for (let i = 0; i < 12; i++) { const ph = i * .7, a = t * 1.2 + ph, x = 640 + Math.cos(a) * (300 + (i % 3) * 30), y = 200 + Math.sin(a * 1.3) * 60; o2(ctx, ox > 0 ? lerp(x, 360 + (i % 6) * 100, clamp(ox / 1.2) * .6) : x, y, .9, t, ph, ox > .6); }
    ctx.restore(); shape(ctx, null, 5, rect(30, 30, 1220, 320, 8)); tag(ctx, 'IN AIR: ROT', 170, 70, lt - .2, 22);
    // bottom panel: sealed in wet mud, oxygen bounces off the surface
    ctx.save(); ctx.beginPath(); ctx.rect(30, 370, 1220, 320); ctx.clip();
    shape(ctx, '#a8daf0', 0, rect(30, 370, 1220, 80)); shape(ctx, '#5aa0b4', 0, rect(30, 430, 1220, 50)); shape(ctx, grad(ctx, 0, 480, 0, 690, [[0, '#6e5a3a'], [1, '#4e3e28']]), 0, rect(30, 480, 1220, 220)); line(ctx, [[30, 480], [1250, 480]], 4, INK);
    log(ctx, 640, 600, 620, 46, 0, '#b8885a');
    for (let i = 0; i < 10; i++) { const ph = i * .9, cyc = ((t * .9 + i * .23) % 1), x = 120 + i * 110, y = sl > 0 ? 470 - Math.abs(Math.sin(cyc * Math.PI)) * 60 : 400 + Math.sin(t + i) * 10; o2(ctx, x, y, .8, t, ph, false);
      if (sl > 0 && cyc < .08) { line(ctx, [[x - 18, 482], [x - 28, 474]], 3, '#fff'); line(ctx, [[x + 18, 482], [x + 28, 474]], 3, '#fff'); } }
    ctx.restore(); shape(ctx, null, 5, rect(30, 370, 1220, 320, 8)); tag(ctx, 'SEALED IN WET MUD', 200, 410, sl, 22);
    if (no > 0) { const s = pop(no); ctx.save(); ctx.translate(1080, 640); ctx.scale(s, s); FX.bigText(ctx, 'O₂ ≈ 0', 0, 0, 52, { color: GOLD }); ctx.restore(); }
    strip(ctx, 'ROT NEEDS OXYGEN', 640, 360, ox, { px: 36 });
    vig(ctx);
  }

  // ---------- d9: the bell tower collapses, 1902 ----------
  function belltower(ctx, x, y, s, crumble, t) { // crumble 0..1: top-down collapse into rubble
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const H0 = 640, alive = H0 * (1 - crumble);
    ctx.save(); ctx.beginPath(); ctx.rect(-200, -alive - 200, 400, alive + 200); ctx.clip();
    shape(ctx, '#c86a4a', 4.5, rect(-40, -420, 80, 420)); for (const dx of [-20, 0, 20]) line(ctx, [[dx, -400], [dx, -8]], 2.5, 'rgba(29,26,23,.25)');
    shape(ctx, '#efe2c4', 4.5, rect(-46, -510, 92, 90)); for (let i = 0; i < 4; i++) shape(ctx, '#5a6a7a', 3, rect(-36 + i * 20, -490, 12, 50, 6));
    shape(ctx, '#efe2c4', 4, rect(-40, -552, 80, 42)); shape(ctx, '#6aa07a', 4.5, poly([[-42, -552], [0, -640], [42, -552]])); ctx.restore();
    if (crumble > 0) { const r = rng(4); for (let i = 0; i < 26; i++) { const a = r() * Math.PI, d = r() * 160 * crumble, fy = -alive - 40 + (r() * 400 + crumble * 600) * crumble; shape(ctx, '#c86a4a', 2.5, rect(Math.cos(a) * d * (r() < .5 ? -1 : 1) - 8, Math.min(-10, fy), 16, 10, 2)); }
      shape(ctx, '#b8604a', 4, smooth([[-170, 0], [-120, -60 * crumble], [-40, -110 * crumble], [40, -90 * crumble], [130, -50 * crumble], [180, 0]])); }
    ctx.restore(); }
  function d9(ctx, lt, dur, t) {
    const cl = since(t, 'collapsed'), yr = since(t, 'y1902');
    ctx.save(); const shake = cl > 0 && cl < 1.2 ? Math.sin(cl * 40) * 6 * (1 - cl / 1.2) : 0; cam(ctx, FX.push(lt, dur, 1, 1.05), 640 + shake, 380);
    sky(ctx, t, '#9ccbe4', '#f4e6c4');
    // the square seen from the waterfront: arcades, the basilica corner, the tower
    shape(ctx, '#f0dfbf', 4.5, rect(-200, 260, 520, 360)); for (let i = 0; i < 6; i++) shape(ctx, '#8a6a52', 3, rect(-160 + i * 80, 470, 46, 150, 20));
    shape(ctx, '#ead8b4', 4.5, rect(860, 300, 520, 320)); for (const [dx, r] of [[960, 46], [1120, 54]]) shape(ctx, '#9fb2b8', 4, c => { c.moveTo(dx - r, 300); c.bezierCurveTo(dx - r, 300 - r * 1.3, dx + r, 300 - r * 1.3, dx + r, 300); c.closePath(); });
    for (let i = 0; i < 3; i++) shape(ctx, '#e8b84a', 3.5, c => { const px = 920 + i * 140; c.moveTo(px - 40, 620); c.lineTo(px - 40, 470); c.arc(px, 470, 40, Math.PI, 0); c.lineTo(px + 40, 620); c.closePath(); });
    shape(ctx, grad(ctx, 0, 620, 0, 720, [[0, '#c8b8a0'], [1, '#a8987e']]), 0, rect(-200, 620, 1700, 200));
    belltower(ctx, 600, 620, .9, cl > 0 ? ease.in(clamp(cl / 1.1)) : 0, t);
    if (cl > .2) { const k = clamp((cl - .2) / 2); for (let i = 0; i < 9; i++) { const a = Math.PI * (1 + i / 8), d = 120 + k * 260; ctx.save(); ctx.globalAlpha = .7 * (1 - k * .5); ctx.filter = 'blur(3px)'; shape(ctx, '#ece2d0', 0, circle(600 + Math.cos(a) * d * .9, 600 + Math.sin(a) * d * .5 - k * 80, 60 + k * 70)); ctx.restore(); } }
    for (const [x, ph] of [[300, 0], [420, 1.2], [780, 2]]) { const fly = cl > 0 ? clamp(cl / .8) : 0; ctx.save(); ctx.translate(x + fly * 200, 640 - fly * 300); shape(ctx, '#9aa0aa', 3, ellipse(0, -14, 20, 12)); shape(ctx, '#8a909a', 3, circle(16, -26, 8)); ctx.restore(); }
    ctx.restore();
    if (yr > 0) { const s = slam(yr); ctx.save(); ctx.translate(1010, 300); ctx.rotate(.05); ctx.scale(s, s);
      ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-170 + 8, -200 + 10, 340, 400); shape(ctx, '#ebe4d0', 4, rect(-170, -200, 340, 400, 2));
      txt(ctx, 'THE LAGOON COURIER', 0, -168, `700 22px Georgia, serif`); line(ctx, [[-150, -146], [150, -146]], 3); txt(ctx, 'MONDAY, 14 JULY 1902', 0, -132, FX.FONT(600, 12));
      txt(ctx, 'THE BELL TOWER', 0, -92, FX.DISPLAY(30)); txt(ctx, 'HAS FALLEN', 0, -56, FX.DISPLAY(30), RED);
      shape(ctx, '#cfc4a8', 3, rect(-140, -30, 280, 140)); ctx.save(); ctx.beginPath(); ctx.rect(-140, -30, 280, 140); ctx.clip(); belltower(ctx, 0, 110, .2, .6, t); for (let i = 0; i < 4; i++) shape(ctx, 'rgba(232,220,200,.9)', 0, circle(-60 + i * 40, 70 - i * 6, 30)); ctx.restore();
      for (let i = 0; i < 5; i++) line(ctx, [[-140, 130 + i * 14], [140 - (i % 2) * 60, 130 + i * 14]], 4, 'rgba(70,64,58,.45)'); ctx.restore(); }
    strip(ctx, "ST MARK'S BELL TOWER", 400, 96, since(t, 'bell') - .1, { px: 34 });
    vig(ctx);
    FX.dateTag(ctx, 'VENICE, 14 JULY 1902');
  }

  // ---------- d10: the piles underneath — about a thousand years down there, still sound ----------
  function d10(ctx, lt, dur, t) {
    const th = since(t, 'thousand'), sd = since(t, 'sound');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    sky(ctx, t, '#a8d0e4', '#f4e6c4');
    shape(ctx, '#b8604a', 4, smooth([[-200, 300], [100, 250], [300, 290], [480, 240], [700, 280], [1000, 230], [1500, 300], [1500, 360], [-200, 360]]));
    // the excavation pit under the rubble: piles exposed, water seeping in
    shape(ctx, '#c8b8a0', 4, rect(-200, 330, 1700, 40)); shape(ctx, grad(ctx, 0, 370, 0, 720, [[0, '#6e5a3a'], [1, '#4e3e28']]), 4, poly([[160, 370], [1120, 370], [1040, 720], [240, 720]]));
    ctx.save(); ctx.globalAlpha = .6; shape(ctx, '#5aa0b4', 0, rect(200, 640, 900, 80)); ctx.restore();
    for (let i = 0; i < 16; i++) { const x = 300 + i * 46, top = 460 + (i % 2) * 6; shape(ctx, '#8a6034', 3.5, rect(x - 15, top, 30, 300, 4)); shape(ctx, '#c89a62', 3, ellipse(x, top, 15, 6)); for (const k of [.4, .7]) shape(ctx, null, 1.5, ellipse(x, top, 15 * k, 6 * k)); }
    for (const [x, y, s] of [[100, 420, 1], [1180, 430, 1]]) { line(ctx, [[x - 60, y - 140], [x + 60, y - 140]], 6, '#7a5434'); line(ctx, [[x - 50, y - 140], [x - 40, y]], 6, '#7a5434'); line(ctx, [[x + 50, y - 140], [x + 40, y]], 6, '#7a5434'); }
    // two engineers of 1902: one knocks on a pile, the other notes it down
    const knock = sd > -.4 ? Math.max(0, Math.sin((sd + .4) * 14)) : 0;
    fig(ctx, 560, 470, .26, P('bowler', 'suit', { hands: { L: [-120, -470], R: [220 - knock * 40, -330 + knock * 20] }, handShape: { R: 'fist' }, lean: .18, face: { brows: sd > 0 ? 'up' : 'calm', mouth: sd > .2 ? 'smile' : 'flat', look: [.7, .8], eyes: blink(t, 43.6) }, breathe: breathe(t) }));
    fig(ctx, 860, 470, .26, P('bowler', 'suit', { hands: { L: [-160, -620], R: [-60, -640] }, handShape: { R: 'fist' }, face: { brows: th > 0 ? 'up' : 'calm', mouth: 'smile', look: [-.5, .4], eyes: blink(t, 45.0) }, breathe: breathe(t + 1) }), { mirror: true });
    FX.paperDoc(ctx, 860 + 100 * .26, 470 - 640 * .26, 46, 60, { lines: 3, rot: .1 });
    ctx.restore();
    if (th > 0) { const n = Math.round(lerp(0, 1000, ease.out(clamp(th / .8)))), s = pop(th); ctx.save(); ctx.translate(1040, 120); ctx.scale(s, s); FX.bigText(ctx, '~' + n.toLocaleString('en-US') + ' YEARS', 0, 0, 46, { color: GOLD }); ctx.restore(); }
    if (sd > 0) { FX.stamp(ctx, 'STILL SOUND', 260, 330, sd, { color: GREEN, size: 52, rot: -.08 }); }
    strip(ctx, 'THE PILES UNDERNEATH', 400, 96, lt - .1, { px: 32 });
    vig(ctx);
    FX.dateTag(ctx, 'UNDER THE TOWER, 1902');
  }

  // ---------- d11: nobody knows the total — the Rialto Bridge alone: 12,000–14,000 trunks ----------
  function rialto(ctx, x, y, s, xray, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (xray > 0) { ctx.save(); ctx.globalAlpha = xray; for (const side of [-1, 1]) for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { const px = side * (330 + c * 18), py = 40 + r * 22; shape(ctx, '#c89a62', 2, rect(px - 6, py, 12, 70, 2)); } ctx.restore(); }
    shape(ctx, '#f2ece0', 5, c => { c.moveTo(-420, 0); c.lineTo(-300, 0); c.quadraticCurveTo(0, -210, 300, 0); c.lineTo(420, 0); c.lineTo(420, -60); c.quadraticCurveTo(0, -270, -420, -60); c.closePath(); });
    shape(ctx, '#e6dcc6', 4, c => { c.moveTo(-300, 0); c.quadraticCurveTo(0, -210, 300, 0); c.lineTo(270, 0); c.quadraticCurveTo(0, -180, -270, 0); c.closePath(); });
    for (const d of [-1, 1]) for (let i = 0; i < 3; i++) { const bx = d * (90 + i * 80), by = -160 + i * 28; shape(ctx, '#f2ece0', 3.5, rect(bx - 34, by - 50, 68, 50)); shape(ctx, '#b8503a', 3, poly([[bx - 40, by - 50], [bx, by - 66], [bx + 40, by - 50]])); shape(ctx, '#5a6a7a', 2.5, rect(bx - 12, by - 40, 24, 30, 10)); }
    shape(ctx, '#f2ece0', 4.5, rect(-56, -260, 112, 80)); shape(ctx, '#b8503a', 4, poly([[-70, -258], [0, -296], [70, -258]])); for (const dx of [-30, 30]) shape(ctx, '#5a6a7a', 3, c => { c.moveTo(dx - 14, -184); c.lineTo(dx - 14, -226); c.arc(dx, -226, 14, Math.PI, 0); c.lineTo(dx + 14, -184); c.closePath(); });
    ctx.restore(); }
  function d11(ctx, lt, dur, t) {
    const es = since(t, 'estimates'), br = since(t, 'bridge'), tw = since(t, 'twelve'), fo = since(t, 'fourteen');
    const fx = T.keys(t, [[A.nobody, 640], [A.estimates - .2, 640], [A.estimates + .8, 640]]), z = T.keys(t, [[A.nobody, 1.1], [A.estimates + .9, 1]]);
    ctx.save(); cam(ctx, z, fx, 380);
    sky(ctx, t);
    for (const [x, w, h, col] of [[-100, 200, 280, '#e8a87a'], [110, 160, 240, '#f0d29a'], [1000, 180, 260, '#d88a6a'], [1190, 200, 300, '#efe2c4']]) { shape(ctx, col, 4, rect(x, 520 - h, w, h)); for (let k = 0; k < 3; k++) shape(ctx, '#5a6a7a', 3, rect(x + w / 2 - 14, 520 - h + 30 + k * 70, 28, 44, 12)); }
    waterBand(ctx, 520, t);
    const xray = br > 0 ? clamp((tw + .3) / .6) : 0;
    if (xray > 0) { ctx.save(); ctx.globalAlpha = .4 * xray; shape(ctx, '#3a2a1a', 0, rect(-200, 540, 1700, 200)); ctx.restore(); }
    rialto(ctx, 640, 540, 1, xray, t);
    for (const [x, d] of [[300, 1], [980, -1]]) { const bx = x + Math.sin(t * .3 + d) * 40; ctx.save(); ctx.translate(bx, 600 + Math.sin(t * 1.4 + d) * 3); shape(ctx, '#1f1a18', 4, c => { c.moveTo(-110, -6); c.quadraticCurveTo(0, 22, 120, -24); c.lineTo(110, -4); c.quadraticCurveTo(0, 26, -100, 6); c.closePath(); }); ctx.restore(); }
    ctx.restore();
    // the ledger nobody could fill in
    if (t < A.estimates + .4) { const k = clamp((A.estimates + .4 - t) / .3); ctx.save(); ctx.globalAlpha = k; ctx.translate(640, 330); ctx.rotate(-.03);
      FX.paperDoc(ctx, 0, 0, 420, 260, { lines: 0, draw: c => { txt(c, 'PILES UNDER VENICE', 0, -80, FX.DISPLAY(28)); txt(c, 'TOTAL:', -60, 0, FX.FONT(700, 30)); txt(c, '???', 80, 0, FX.DISPLAY(48), RED); } }); ctx.restore();
      FX.stamp(ctx, 'NOBODY KNOWS', 780, 440, since(t, 'nobody') + .3, { color: RED, size: 34, rot: -.1 }); }
    if (br > 0) tag(ctx, 'THE RIALTO BRIDGE', 640, 110, br, 30);
    if (tw > 0) { const s = pop(tw); ctx.save(); ctx.translate(640, 670); ctx.scale(s, s); FX.bigText(ctx, fo > 0 ? '12,000 – 14,000 TRUNKS' : '12,000…', 0, 0, 44, { color: GOLD }); ctx.restore(); }
    vig(ctx);
    FX.dateTag(ctx, 'RIALTO BRIDGE · STONE, 1591');
  }

  // ---------- d12: a 1600s record — Santa Maria della Salute took 1,106,657 ----------
  function salute(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#f4efe4', 5, rect(-260, -200, 520, 200)); shape(ctx, '#f4efe4', 5, poly([[-150, -200], [0, -260], [150, -200]]));
    for (let i = 0; i < 6; i++) shape(ctx, '#e6dcc6', 3, rect(-220 + i * 80, -180, 22, 170));
    shape(ctx, '#5a4a3a', 4, c => { c.moveTo(-40, 0); c.lineTo(-40, -110); c.arc(0, -110, 40, Math.PI, 0); c.lineTo(40, 0); c.closePath(); });
    shape(ctx, '#ece6d8', 5, rect(-170, -330, 340, 90)); for (let i = 0; i < 8; i++) shape(ctx, '#5a6a7a', 3, rect(-150 + i * 40, -310, 18, 50, 8));
    for (const d of [-1, 1]) for (let i = 0; i < 3; i++) shape(ctx, '#f4efe4', 4, c => { const vx = d * (180 - i * 4), vy = -250 - i * 6; c.arc(vx, vy, 24, 0, Math.PI * 2); });
    shape(ctx, '#e8e2d4', 5, c => { c.moveTo(-180, -330); c.bezierCurveTo(-180, -520, 180, -520, 180, -330); c.closePath(); }); for (let i = -3; i <= 3; i++) line(ctx, [[i * 50, -335], [i * 14, -470]], 2.5, 'rgba(29,26,23,.25)');
    shape(ctx, '#f4efe4', 4, rect(-26, -520, 52, 40)); shape(ctx, '#e8e2d4', 4, c => { c.moveTo(-26, -520); c.bezierCurveTo(-26, -570, 26, -570, 26, -520); c.closePath(); }); line(ctx, [[0, -560], [0, -600]], 4); shape(ctx, GOLD, 3, circle(0, -606, 8));
    shape(ctx, '#e8e2d4', 4, c => { c.moveTo(250, -200); c.bezierCurveTo(250, -300, 380, -300, 380, -200); c.closePath(); }); shape(ctx, '#f4efe4', 4, rect(250, -200, 130, 200));
    ctx.restore(); }
  function d12(ctx, lt, dur, t) {
    const steps = [[A.million, 1000000], [A.hundred1, 1100000], [A.thousand2, 1106000], [A.hundred2, 1106600], [A.fifty, 1106650], [A.seven, 1106657]];
    let val = 0, lastStep = -9; for (const [tt, v] of steps) if (t >= tt) { val = v; lastStep = tt; }
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    sky(ctx, t, '#8fd0ec', '#fbe6c0');
    farShore(ctx, 470, t);
    salute(ctx, 860, 520, .78);
    waterBand(ctx, 520, t); for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = .35; shape(ctx, '#fff6dc', 0, ellipse(760 + i * 40, 560 + i * 18, 70 - i * 8, 5)); ctx.restore(); }
    // the clerk of the 1600s with his ledger, tallying — on a stone quay
    shape(ctx, '#d8ccb4', 4.5, rect(-200, 520, 760, 260)); for (let x = -200; x < 560; x += 70) line(ctx, [[x, 524], [x, 780]], 2, 'rgba(70,58,46,.3)'); shape(ctx, '#c8baa0', 4, rect(-200, 520, 760, 14));
    const X = 300, Y = 640, S = .34, wr = Math.sin(t * 14) * 18, writing = t > A.record && t < A.somebody;
    fig(ctx, X, Y, S, P('chronicler', 'habit', { hands: { L: [-60, -800], R: [140 + (writing ? wr : 0), -810] }, handShape: { R: 'fist' }, lean: .05, face: { brows: 'strain', mouth: 'flat', look: [.5, .9], eyes: blink(t, 56.0, 59.0) }, breathe: breathe(t) }));
    shape(ctx, '#6e4a2c', 5, rect(130, Y - 270, 360, 30, 4)); shape(ctx, '#5a3a22', 5, rect(150, Y - 240, 320, 240));
    for (const px of [170, 320]) shape(ctx, '#6a4630', 3.5, rect(px, Y - 220, 130, 190, 6));
    for (let i = 0; i < 4; i++) shape(ctx, ['#8a2a24', '#2f4f6a', '#4a6a3a', '#a8782a'][i], 3.5, rect(140 + (i % 2) * 6, Y - 300 - i * 16, 110, 16, 3));
    shape(ctx, '#efe6d0', 3.5, rect(452, Y - 330, 18, 60, 3)); const fl = 1 + Math.sin(t * 11) * .06; glow(ctx, 461, Y - 344, 90 * fl, 'rgba(255,200,120,.5)'); shape(ctx, '#ffd27a', 2.5, smooth([[461, Y - 330], [455, Y - 342], [461, Y - 360], [467, Y - 342]]));
    shape(ctx, '#f4ecd6', 3.5, poly([[180, Y - 286], [420, Y - 286], [430, Y - 270], [170, Y - 270]])); line(ctx, [[300, Y - 286], [300, Y - 270]], 2.5);
    if (writing) { const hx = X + (140 + wr) * S, hy = Y - 810 * S; line(ctx, [[hx, hy], [hx + 26, hy - 60]], 4, '#3a2a1a'); }
    ctx.restore();
    tag(ctx, 'A RECORD FROM THE 1600s', 300, 120, since(t, 'sixteen'), 24);
    if (since(t, 'salute') > 0) tag(ctx, 'SANTA MARIA DELLA SALUTE', 860, 120, since(t, 'salute'), 26);
    if (val > 0) { const s = t - lastStep < .25 ? slam(t - lastStep, .12) : 1; ctx.save(); ctx.translate(800, 650); ctx.scale(s, s);
      ctx.font = FX.DISPLAY(70); const w = ctx.measureText('1,106,657').width + 60; shape(ctx, '#1f2f4f', 5, rect(-w / 2, -50, w, 96, 10)); FX.bigText(ctx, val.toLocaleString('en-US'), 0, 0, 70, { color: val === 1106657 ? GOLD : '#f4efe2' }); ctx.restore();
      if (val === 1106657) sparkle(ctx, 1060, 600, (t - A.seven) / .7, 1.2); }
    vig(ctx);
    FX.dateTag(ctx, 'SANTA MARIA DELLA SALUTE, 1600s');
  }

  // ---------- d13: somebody counted ----------
  function d13(ctx, lt, dur, t) {
    const cn = since(t, 'counted');
    ctx.save(); cam(ctx, lerp(1.25, 1.32, clamp(lt / dur)), 600, 330);
    shape(ctx, '#e6cf9e', 0, rect(-200, -200, 1700, 1100));
    const r = rng(8); for (let i = 0; i < 260; i++) { const x = 20 + (i % 26) * 48, y = 30 + Math.floor(i / 26) * 46; for (let k = 0; k < 4; k++) line(ctx, [[x + k * 8, y], [x + k * 8, y + 30]], 3, 'rgba(70,50,30,.55)'); line(ctx, [[x - 4, y + 24], [x + 30, y + 6]], 3, 'rgba(70,50,30,.55)'); }
    shape(ctx, '#6e4a2c', 5, rect(240, 470, 720, 40, 4)); shape(ctx, '#5a3a22', 5, rect(270, 510, 660, 260));
    const shut = cn > .2 ? clamp((cn - .2) / .25) : 0;
    const X = 600, Y = 760, S = .44;
    fig(ctx, X, Y, S, P('chronicler', 'habit', { hands: { L: [-160, -680], R: shut > 0 ? [160, -660] : [120, -940] }, handShape: { R: 'fist' }, headTilt: shut > 0 ? -.08 : .04,
      face: { brows: shut > 0 ? 'smug' : 'worried', mouth: shut > 0 ? 'smile' : 'o', look: shut > 0 ? [0, .1] : [.2, -.5], eyes: shut > .5 ? .25 : blink(t, 64.2) }, breathe: breathe(t) * 1.6 }));
    ctx.save(); ctx.translate(600, 466); const open = 1 - shut; shape(ctx, '#8a2a24', 4.5, rect(-160 * (.4 + .6 * open), -14, 320 * (.4 + .6 * open), 18, 3)); if (open > .3) { shape(ctx, '#f4ecd6', 3.5, rect(-150 * open, -22, 300 * open, 10, 2)); } ctx.restore();
    if (shut > 0 && shut < 1) for (let i = 0; i < 6; i++) { const a = Math.PI * (1 + i / 5); shape(ctx, 'rgba(255,240,220,.7)', 0, circle(600 + Math.cos(a) * 140 * shut, 450 + Math.sin(a) * 40 * shut, 10)); }
    const sweat = since(t, 'somebody'); if (sweat > 0) { const k = (sweat * .8) % 1; shape(ctx, '#8fd0ec', 2.5, c => { const x = X + 70, y = Y - 1270 * S + k * 60; c.moveTo(x, y - 10); c.quadraticCurveTo(x + 8, y + 4, x, y + 8); c.quadraticCurveTo(x - 8, y + 4, x, y - 10); }); }
    ctx.restore();
    strip(ctx, 'SOMEBODY COUNTED.', 640, 640, since(t, 'somebody'), { px: 46 });
    vig(ctx);
  }

  // ---------- d14: same water, new job — it's a foundation (hard hat on, building site behind) ----------
  function crane(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, [[0, 0], [0, -320]], 12, '#7a5434'); line(ctx, [[-60, -300], [240, -340]], 10, '#7a5434'); line(ctx, [[0, -320], [-60, -300]], 6, '#7a5434');
    const sw = Math.sin(t * .9) * 10; line(ctx, [[220, -336], [220 + sw, -180]], 3, '#c9a35a'); shape(ctx, '#e8e2d4', 3.5, rect(196 + sw, -180, 48, 34, 3)); shape(ctx, '#6e4a2c', 4, circle(0, -40, 34)); ctx.restore(); }
  function d14(ctx, lt, dur, t) {
    const sm = since(t, 'same'), nj = since(t, 'newjob'), fd = since(t, 'foundation');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#7ab8e0'], [.65, '#d6ead8'], [1, '#fbe6be']]), 0, rect(0, 0, W, H)); glow(ctx, 1000, 140, 440, 'rgba(255,240,200,.55)'); clouds(ctx, t, [90, 140]); birds(ctx, t, 4, 170);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 420);
    // a Venetian building site behind the lagoon: scaffolding, a wooden crane, a half-built palazzo on its piles
    T.blurred(ctx, .8, () => { shape(ctx, '#f0b48a', 4, rect(820, 270, 320, 270)); for (let k = 0; k < 2; k++) for (let j = 0; j < 4; j++) shape(ctx, '#3a5a7a', 3, rect(845 + j * 76, 300 + k * 100, 30, 56, 12));
      for (let x = 800; x <= 1160; x += 60) line(ctx, [[x, 220], [x, 540]], 5, '#a8784a'); for (let y = 260; y <= 520; y += 70) line(ctx, [[790, y], [1170, y]], 5, '#a8784a'); crane(ctx, 1220, 540, .9, t);
      shape(ctx, '#e8a87a', 4, rect(120, 330, 220, 210)); shape(ctx, '#b8503a', 4, poly([[110, 330], [230, 290], [350, 330]])); for (let i = 0; i < 5; i++) shape(ctx, '#a8784a', 3, rect(130 + i * 46, 540, 16, 40)); });
    // the lagoon swaps hats: the helmet flies off, the hard hat drops on
    const off = nj > 0 ? clamp(nj / .7) : 0, drop = nj > .25 ? FX.dropBounce(nj - .25, 420, .3) : 999;
    V.lagoon(ctx, 640, 640, 720, t, { look: nj > 0 && nj < 1.2 ? [0, -.9] : [0, .1], eyes: blink(t, 66.0, 69.4), mouth: fd > 0 ? 'smile' : nj > 0 ? 'o' : 'smile',
      hat: (c, x, y) => { if (off < 1) { c.save(); c.translate(off * 420, -off * 360 + off * off * 120); c.rotate(off * 2.5); V.hats.helmet(c, x, y); c.restore(); }
        if (drop < 999) { c.save(); c.translate(0, -drop / (720 / 600)); V.hats.hardhat(c, x, y); c.restore(); } } });
    if (fd > 0) { const s = pop(fd); ctx.save(); ctx.translate(980, 380); ctx.scale(s, s); ctx.rotate(.06); line(ctx, [[0, 40], [0, 220]], 8, '#7a5434');
      FX.paperDoc(ctx, 0, 0, 260, 120, { lines: 0, draw: c => { txt(c, 'JOB #2', 0, -18, FX.DISPLAY(40)); txt(c, 'FOUNDATION', 0, 26, FX.DISPLAY(30), RED); } }); ctx.restore(); }
    ctx.restore();
    strip(ctx, 'SAME WATER.', 470, 100, sm, { px: 44 }); strip(ctx, 'NEW JOB.', 830, 100, nj, { px: 44, color: RED, rot: .03 });
    vig(ctx);
  }

  const cut = [[0, d1], [2.05, d2], [5.75, d3], [11.2, d4], [15.25, d5], [22.6, d6], [27.1, d7], [33.4, d8], [38.6, d9], [42.15, d10], [47.75, d11], [54.65, d12], [63.85, d13], [65.2, d14]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .05, type: 'paper', gain: .7 }, { t: .75, type: 'paper', gain: .5 },
    { t: A.problem, type: 'paper', gain: .5 }, { t: A.mud, type: 'splash', gain: .5 }, { t: A.mud + .3, type: 'creak', gain: .4 },
    { t: A.take, type: 'paper', gain: .4 }, { t: A.oak, type: 'thud', gain: .5 }, { t: A.larch, type: 'thud', gain: .5 }, { t: A.alder, type: 'thud', gain: .5 },
    ...[0, 1, 2, 3, 4, 5].map(i => ({ t: A.sharpen + .1 + i * .19, type: 'click', gain: .35 })),
    { t: A.hammered, type: 'thud', gain: .9 }, { t: A.straight + .2, type: 'thud', gain: .9 }, { t: A.soft, type: 'thud', gain: .9 }, { t: A.mud2 + .3, type: 'thud', gain: .9 },
    { t: A.another1, type: 'thud', gain: .5 }, { t: A.another2, type: 'thud', gain: .5 }, { t: A.thousands, type: 'ratchet', gain: .4 }, { t: A.brace, type: 'press', gain: .5 },
    { t: A.deck, type: 'thud', gain: .6 }, { t: A.stone, type: 'thud', gain: .7 }, { t: A.building, type: 'swell', gain: .4 },
    { t: A.wood, type: 'paper', gain: .3 }, { t: A.water, type: 'splash', gain: .3 }, { t: A.rotted, type: 'creak', gain: .5 },
    { t: A.oxygen, type: 'bubbles', gain: .4 }, { t: A.sealed, type: 'thud', gain: .4 }, { t: A.none, type: 'click', gain: .5 },
    { t: A.collapsed, type: 'boom', gain: .9 }, { t: A.collapsed + .3, type: 'rattle', gain: .4 }, { t: A.y1902, type: 'thud', gain: .7 },
    { t: A.thousand, type: 'ratchet', gain: .3 }, { t: A.sound - .3, type: 'click', gain: .5 }, { t: A.sound - .15, type: 'click', gain: .5 }, { t: A.sound + .1, type: 'thud', gain: .6 },
    { t: A.nobody, type: 'thud', gain: .5 }, { t: A.estimates, type: 'whoosh', gain: .4 }, { t: A.twelve, type: 'click', gain: .4 }, { t: A.fourteen, type: 'click', gain: .4 },
    { t: A.sixteen, type: 'paper', gain: .5 }, { t: A.salute, type: 'swell', gain: .3 },
    ...['million', 'hundred1', 'thousand2', 'hundred2', 'fifty', 'seven'].map(k => ({ t: A[k], type: 'click', gain: .45 })), { t: A.seven + .05, type: 'thud', gain: .7 },
    { t: A.counted + .2, type: 'thud', gain: .8 }, { t: A.newjob, type: 'whoosh', gain: .5 }, { t: A.newjob + .55, type: 'clang', gain: .3 }, { t: A.foundation, type: 'thud', gain: .6 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.wondering - .5, mood: 'mystery' }, { t: A.bell - .5, mood: 'tense' }, { t: A.piles - .2, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-jobtwo.mp3', shots, sfx, moods, fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
