/* Venice — Cold open (narration-coldopen.mp3 = narration-full.mp3 0–80.15 s + a short tail for the title).
 * Word anchors from tools/asr.py on the full recording. Bright, layered sets (see skill: bright, vivid, full frames). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, V = G.Venice;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, fig = FX.fig, RED = '#b8322a', PAPER = '#f1ead8', GOLD = '#f6c945';
  const A = { six: .09, square: 3.39, hour: 4.97, quiet: 6.23, marble: 7.6, shoes: 8.41, mosaic: 9.57, head: 10.58,
    above: 11.53, door: 12.22, four: 12.85, horses: 13.78, remember: 15.03, look: 17.13, stone: 18.64, mud: 19.5, hammered: 20.73, packed: 22.36,
    trunks: 23.52, millions: 24.76, whole: 26.34, city: 26.75, venice: 27.92, buried: 30.14, forest: 30.57, middle: 31.57, lagoon: 32.03, two: 33.15, dry: 34.37,
    peel: 35.95, marble2: 37.42, churches: 38.39, forest2: 39.41, goback: 41.01, fifteen: 41.42, years: 42.49, spot: 44.47,
    ankle: 45.8, marsh: 47.04, reeds: 47.85, mud2: 48.74, tide: 49.72, twice: 51.15, nobody: 52.5, centuries: 54.72, richest: 56.96, europe: 58.08,
    today: 59.08, stranger: 60.43, beds: 62.14, people: 63.52, here: 64.17, how: 65.56, nobodyw: 66.37, everybody: 68.51, why: 70.07, leaving: 71.36,
    answer: 72.72, water: 73.66, over: 74.92, same: 77.01, five: 78.05, jobs: 78.9, end: 83.2 };
  A.title = 79.75;
  const since = (t, k) => t - A[k];
  const blink = (t, ...ts) => 1 - G.Rig.blinkAt(t, ts);
  const slam = (k, d = .09) => k <= 0 ? 0 : k < d ? lerp(1.3, 1, ease.in(k / d)) : 1 + FX.ring(k - d, -.02, 4, 14);
  const pop = (k, d = .3) => k <= 0 ? 0 : FX.settle(clamp(k / d));
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  const vig = (ctx, a = .4) => FX.vignette(ctx, 640, 380, a * .3);
  function strip(ctx, text, x, y, k, o = {}) {
    if (k <= 0) return; const e = FX.settle(clamp(k / .35));
    ctx.save(); ctx.translate(x, lerp(y - 140, y, e)); ctx.rotate(o.rot ?? -.02);
    const px = o.px || 48; ctx.font = FX.DISPLAY(px); const w = ctx.measureText(text).width + px * 1.2, h = px * 1.55;
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h);
    shape(ctx, o.fill || PAPER, 4, rect(-w / 2, -h / 2, w, h, 3)); txt(ctx, text, 0, px * .06, FX.DISPLAY(px), o.color || INK); ctx.restore();
  }
  function sparkle(ctx, x, y, k, s = 1) { if (k <= 0 || k > 1) return; const r = 30 * s * Math.sin(Math.PI * k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(k * 1.2); glow(ctx, 0, 0, r * 2.2, 'rgba(255,240,180,.7)'); shape(ctx, '#fffbe0', 3, poly([[0, -r], [r * .22, -r * .22], [r, 0], [r * .22, r * .22], [0, r], [-r * .22, r * .22], [-r, 0], [-r * .22, -r * .22]])); ctx.restore(); }
  function clouds(ctx, t, ys = [110, 160], a = .9, tint = '#fff6ea') { for (let i = 0; i < 6; i++) { const x = ((i * 290 + t * (8 + i * 2)) % 1900) - 300, y = ys[i % ys.length] + (i % 3) * 28, w = 120 + (i % 3) * 50;
    ctx.save(); ctx.globalAlpha = a; shape(ctx, tint, 3, smooth([[x - w / 2, y], [x - w / 4, y - w * .22], [x + w / 8, y - w * .3], [x + w / 2, y - w * .1], [x + w / 2 + 10, y + 6], [x, y + 12]])); ctx.restore(); } }
  function birds(ctx, t, n = 4, y0 = 150) { for (let i = 0; i < n; i++) { const x = ((i * 230 + t * 40) % 1700) - 200, y = y0 + Math.sin(t * .8 + i) * 20 + i * 18, f = Math.sin(t * 8 + i * 2) * 8;
    line(ctx, [[x - 14, y - f], [x, y], [x + 14, y - f]], 3, '#3a3a40'); } }
  function reedsFG(ctx, t, n = 9, gust = 0) { T.blurred(ctx, 2.5, () => { for (const sd of [-1, 1]) for (let i = 0; i < (sd > 0 ? 4 : n); i++) {
    const x0 = sd < 0 ? -20 + i * 18 : W + 20 - i * 18, h = 150 + (i * 37) % 120, sw = Math.sin(t * 1.3 + i) * 8 + gust * 30;
    line(ctx, [[x0, 740], [x0 + sw * .5 + sd * -6, 720 - h * .6], [x0 + sw + sd * -14, 720 - h]], 9, i % 2 ? '#5a6a2a' : '#6f7f34');
    if (i % 3 === 0) shape(ctx, '#7a5a34', 2, ellipse(x0 + sw + sd * -14, 720 - h - 14, 7, 22)); } }); }
  function pigeon(ctx, x, y, s, t, ph, fly = 0) { ctx.save(); ctx.translate(x, y - fly * 260); ctx.scale(s, s);
    const pk = fly ? 0 : Math.max(0, Math.sin(t * 2.2 + ph)) * 10;
    shape(ctx, '#9aa0aa', 3, ellipse(0, -16, 24, 14)); shape(ctx, '#7a808a', 3, poly([[-20, -18], [-38, -10], [-20, -8]]));
    shape(ctx, '#8a909a', 3, circle(18, -30 + pk, 9)); shape(ctx, '#e8a83a', 2, poly([[26, -30 + pk], [34, -28 + pk], [26, -26 + pk]]));
    if (fly) { const wa = Math.sin(t * 22 + ph) * .9; for (const d of [-1, 1]) { ctx.save(); ctx.translate(-2, -20); ctx.rotate(d * wa - .2); shape(ctx, '#b0b6c0', 3, ellipse(0, -18 * d, 10, 26)); ctx.restore(); } }
    else { line(ctx, [[-4, -4], [-6, 4]], 2.5, '#c0605a'); line(ctx, [[6, -4], [6, 4]], 2.5, '#c0605a'); }
    ctx.restore(); }

  // ======================= the square =======================
  // Piazza San Marco at dawn in one-point perspective (vanishing point ~ (640, 380)).
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

  // ---------- c1: six in the morning, St Mark's Square, quiet ----------
  function c1(ctx, lt, dur, t) {
    const q = since(t, 'quiet'), lampsOn = q > 0 ? clamp(1 - q / .5) : 1;
    ctx.save(); cam(ctx, lerp(.96, 1.05, ease.inOut(clamp(lt / dur))), 640, lerp(400, 380, ease.inOut(clamp(lt / dur))));
    square(ctx, t, { lamps: lampsOn });
    [[380, 640, .9, 0], [470, 600, .75, 1.3], [820, 660, 1, 2.1], [930, 610, .8, .7], [700, 700, 1.1, 3.1]].forEach(([x, y, s, ph], i) => {
      const fly = i === 2 && q > 0 ? ease.in(clamp(q / 1.2)) : 0; pigeon(ctx, x + fly * 300, y, s, t, ph, fly); });
    ctx.restore();
    vig(ctx);
    FX.dateTag(ctx, "ST MARK'S SQUARE · 6:00 AM");
  }

  // ---------- c2: marble under your shoes, gold mosaic over your head (a tilt up) ----------
  function shoes(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (const d of [-1, 1]) { shape(ctx, '#3a4a6a', 4, rect(d * 60 - 34, -260, 68, 200, 10));
      shape(ctx, '#f4efe2', 4.5, c => { c.moveTo(d * 60 - 44, -60); c.lineTo(d * 60 + 30, -64); c.quadraticCurveTo(d * 60 + 96, -50, d * 60 + 96, -10); c.lineTo(d * 60 - 44, -6); c.closePath(); });
      shape(ctx, '#d8402e', 3, rect(d * 60 - 44, -16, 140, 12, 4)); for (let k = 0; k < 3; k++) line(ctx, [[d * 60 + k * 14, -58], [d * 60 + 10 + k * 14, -44]], 3); }
    ctx.restore(); }
  function c2(ctx, lt, dur, t) {
    const fy = T.keys(t, [[A.marble - .3, 1150], [A.shoes + .4, 1150], [A.head - .2, 80]]);
    ctx.save(); cam(ctx, 1, 640, fy);
    // marble floor with inlaid rosettes
    shape(ctx, '#efe6d6', 0, rect(-200, 1000, 1700, 600));
    for (let r = 0; r < 4; r++) for (let c = -1; c < 9; c++) { const x = c * 170 + (r % 2) * 85, y = 1040 + r * 90;
      shape(ctx, (r + c) % 2 ? '#c84a3a' : '#2f5a6a', 3, poly([[x, y - 40], [x + 60, y], [x, y + 40], [x - 60, y]])); shape(ctx, '#f6f0e2', 2.5, circle(x, y, 12)); }
    T.shadow(ctx, 640, 1330, 220, 26, .3, 10); shoes(ctx, 640, 1330, 1);
    // the portal wall rising above: marble columns, then the gold mosaic lunette
    shape(ctx, '#ead8b4', 0, rect(-200, -300, 1700, 1300));
    for (const x of [120, 260, 1020, 1160]) { shape(ctx, x % 280 ? '#c9b48a' : '#b8735a', 4, rect(x - 26, 300, 52, 700)); shape(ctx, '#e8d8b0', 4, rect(x - 36, 280, 72, 26, 4)); }
    shape(ctx, '#d0b48a', 6, c => { c.moveTo(250, 1000); c.lineTo(250, 250); c.arc(640, 250, 390, Math.PI, 0); c.lineTo(1030, 1000); c.closePath(); });
    const lun = c => { c.moveTo(300, 260); c.arc(640, 260, 340, Math.PI, 0); c.closePath(); };
    shape(ctx, '#e8b84a', 5, lun);
    ctx.save(); ctx.beginPath(); lun(ctx); ctx.clip(); const r = rng(5);
    for (let y = -90; y < 270; y += 14) for (let x = 300; x < 990; x += 14) { const v = r(); ctx.fillStyle = v < .3 ? '#f6d270' : v < .5 ? '#d8a238' : '#ecc055'; ctx.fillRect(x, y, 13, 13); }
    for (const [x, h, col] of [[460, 230, '#2f4f8a'], [560, 260, '#8a2a24'], [640, 300, '#2f4f8a'], [720, 260, '#8a2a24'], [820, 230, '#2f4f8a']]) {
      shape(ctx, col, 3.5, c => { c.moveTo(x - 30, 260); c.lineTo(x - 22, 260 - h + 50); c.quadraticCurveTo(x, 260 - h + 30, x + 22, 260 - h + 50); c.lineTo(x + 30, 260); c.closePath(); });
      shape(ctx, '#f6d270', 3, circle(x, 260 - h + 18, 26)); shape(ctx, '#f0c8a0', 3, circle(x, 260 - h + 22, 15)); }
    glow(ctx, 640, 100, 380, 'rgba(255,240,180,.5)');
    ctx.restore();
    shape(ctx, '#5a3a2a', 5, rect(330, 262, 620, 740));
    ctx.restore();
    if (t < A.mosaic - .3) FX.caption(ctx, 'MARBLE UNDER YOUR SHOES', since(t, 'marble'), .2); else FX.caption(ctx, 'GOLD MOSAIC OVER YOUR HEAD', since(t, 'mosaic'), .1);
    vig(ctx);
  }

  // ---------- c3: above the church door, four bronze horses. Remember those horses. ----------
  function c3(ctx, lt, dur, t) {
    const z = T.keys(t, [[A.above, 1], [A.horses, 1.15], [A.remember + .6, 1.32]]);
    ctx.save(); cam(ctx, z, 640, 360);
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#7aaad6'], [1, '#ffe0a8']]), 0, rect(-200, -200, 1700, 1100));
    glow(ctx, 640, 200, 600, 'rgba(255,236,190,.5)');
    // the great central window behind the horses, gold-framed
    shape(ctx, '#e8b84a', 6, c => { c.moveTo(380, 520); c.lineTo(380, 220); c.arc(640, 220, 260, Math.PI, 0); c.lineTo(900, 520); c.closePath(); });
    shape(ctx, '#7a90a8', 5, c => { c.moveTo(420, 520); c.lineTo(420, 230); c.arc(640, 230, 220, Math.PI, 0); c.lineTo(860, 520); c.closePath(); });
    ctx.save(); ctx.globalAlpha = .55; for (let x = 440; x < 860; x += 30) line(ctx, [[x, 60], [x, 520]], 3, '#3a4a5a'); for (let y = 80; y < 520; y += 30) line(ctx, [[420, y], [860, y]], 3, '#3a4a5a'); ctx.restore();
    for (const x of [150, 1130]) { shape(ctx, '#ead8b4', 5, c => { c.moveTo(x - 120, 520); c.lineTo(x - 120, 240); c.quadraticCurveTo(x - 120, 140, x, 90); c.quadraticCurveTo(x + 120, 140, x + 120, 240); c.lineTo(x + 120, 520); c.closePath(); }); shape(ctx, '#e8b84a', 4, c => { c.moveTo(x - 80, 520); c.lineTo(x - 80, 260); c.quadraticCurveTo(x - 80, 190, x, 150); c.quadraticCurveTo(x + 80, 190, x + 80, 260); c.lineTo(x + 80, 520); c.closePath(); }); }
    // the terrace and balustrade
    shape(ctx, '#e2cfa8', 5, rect(-100, 520, 1500, 40)); for (let x = -80; x < 1400; x += 40) shape(ctx, '#ead8b4', 3.5, rect(x, 560, 22, 70, 6)); shape(ctx, '#d8c49c', 5, rect(-100, 630, 1500, 30));
    // four horses: they catch the morning sun one after another on "four bronze horses"
    for (let i = 0; i < 4; i++) { const hx = 330 + i * 205, dir = i < 2 ? 1 : -1, gk = since(t, 'four') - i * .22; shape(ctx, '#c8b490', 4, rect(hx - 60, 510, 120, 16, 3));
      horse(ctx, hx, 512, 1.55, dir, gk > 0 ? Math.max(.25, Math.exp(-gk * 1.5)) : 0); sparkle(ctx, hx + dir * 60, 360, (gk - .05) / .6, 1.2); }
    ctx.restore();
    const rm = since(t, 'remember');
    if (rm > 0) { ctx.save(); ctx.globalAlpha = .25 * clamp(rm / .3); shape(ctx, '#3a2a20', 0, c => { c.rect(0, 0, W, H); c.ellipse(640, 430, 560, 230, 0, 0, Math.PI * 2, true); }); ctx.restore();
      const s = slam(rm); ctx.save(); ctx.translate(1050, 150); ctx.rotate(.06); ctx.scale(s, s); line(ctx, [[0, -60], [-80, 160]], 3, RED); shape(ctx, RED, 3, circle(0, -60, 9));
      FX.paperDoc(ctx, 0, 0, 280, 96, { lines: 0, draw: c => { txt(c, 'REMEMBER', 0, -14, FX.DISPLAY(34), RED); txt(c, 'THESE HORSES', 0, 22, FX.FONT(700, 20)); } }); ctx.restore(); }
    vig(ctx);
    FX.dateTag(ctx, "ST MARK'S BASILICA");
  }

  // ---------- c4: look down — stone, mud, tree trunks, millions, under the whole city ----------
  function houseRow(ctx, x0, x1, y, t) { const r = rng(31); let x = x0;
    while (x < x1) { const w = 90 + r() * 70, h = 150 + r() * 120, col = ['#e8a87a', '#f0d29a', '#d88a6a', '#efe2c4', '#c8a0b8', '#e8c07a'][Math.floor(r() * 6)];
      if (Math.abs(x + w / 2 - 640) < 120) { basilicaMini(ctx, 640, y); x = 770; continue; }
      shape(ctx, col, 4, rect(x, y - h, w, h)); shape(ctx, '#b8503a', 4, poly([[x - 6, y - h], [x + w / 2, y - h - 26], [x + w + 6, y - h]]));
      for (let k = 0; k < Math.floor(h / 50); k++) for (let j = 0; j < 2; j++) { shape(ctx, '#5a6a7a', 2.5, c => { const wx = x + 18 + j * (w - 54), wy = y - h + 26 + k * 46; c.moveTo(wx, wy + 26); c.lineTo(wx, wy + 8); c.arc(wx + 9, wy + 8, 9, Math.PI, 0); c.lineTo(wx + 18, wy + 26); c.closePath(); }); }
      shape(ctx, '#7a4a2a', 3, rect(x + w * .7, y - h - 40, 12, 24)); x += w + 4; } }
  function basilicaMini(ctx, x, y) { basilica(ctx, x, y, .42, 0); }
  function c4(ctx, lt, dur, t) {
    const fy = T.keys(t, [[A.look - .1, 300], [A.stone, 420], [A.hammered, 520], [A.trunks, 560], [A.whole - .3, 560], [A.city + .4, 470]]);
    const z = T.keys(t, [[A.look, 1.35], [A.trunks, 1.2], [A.whole - .3, 1.2], [A.city + .4, .82]]);
    ctx.save(); cam(ctx, z, 640, fy);
    shape(ctx, grad(ctx, 0, -600, 0, 330, [[0, '#7ab4dc'], [1, '#ffe4b0']]), 0, rect(-900, -900, 3100, 1240)); clouds(ctx, t, [0, 60], .9);
    houseRow(ctx, -700, 1950, 320, t);
    shape(ctx, V.WATER, 4, rect(1950, 290, 600, 160)); line(ctx, [[1950, 290], [2500, 290]], 4);
    // layers
    shape(ctx, '#c8b8a0', 4, rect(-900, 320, 2850, 26)); for (let x = -900; x < 1950; x += 40) line(ctx, [[x, 322], [x, 344]], 2, 'rgba(70,58,46,.4)');
    shape(ctx, '#9a7a4e', 4, rect(-900, 346, 2850, 18));
    shape(ctx, grad(ctx, 0, 364, 0, 760, [[0, '#7a6440'], [1, '#5e4a30']]), 4, rect(-900, 364, 2850, 400));
    shape(ctx, '#7a8a92', 4, rect(-900, 760, 3400, 300)); for (let i = 0; i < 30; i++) shape(ctx, 'rgba(255,255,255,.12)', 0, ellipse(-900 + i * 110, 800 + (i % 3) * 40, 30, 6));
    // piles: one hammered in, then rows packed tight, then the whole city
    const pileAt = (x, k) => { if (k <= 0) return; const d = Math.min(1, k / .25), y = lerp(-80, 352, ease.in(d));
      ctx.save(); ctx.beginPath(); ctx.rect(-900, 346, 2850, 420); ctx.clip();
      shape(ctx, '#a8784a', 3.5, c => { c.moveTo(x - 13, y); c.lineTo(x + 13, y); c.lineTo(x + 13, y + 360); c.lineTo(x, y + 392); c.lineTo(x - 13, y + 360); c.closePath(); });
      line(ctx, [[x - 4, y + 20], [x - 2, y + 320]], 2, 'rgba(70,40,20,.4)'); ctx.restore(); };
    const hm = since(t, 'hammered'), pk = since(t, 'packed');
    pileAt(640, hm);
    for (let i = 1; i <= 34; i++) for (const d of [-1, 1]) pileAt(640 + d * i * 34, pk - i * .045);
    for (let i = 35; i <= 40; i++) for (const d of [-1, 1]) pileAt(640 + d * i * 34, since(t, 'whole') - (i - 35) * .05);
    // labels on the layers
    [['STONE', 'stone', 333], ['MUD', 'mud', 560], ['TREE TRUNKS', 'trunks', 470]].forEach(([s, k, y], i) => { const kk = since(t, k); if (kk <= 0) return; const e = pop(kk);
      ctx.save(); ctx.translate([980, 300, 760][i], y); ctx.scale(e, e); ctx.font = FX.DISPLAY(26); const w = ctx.measureText(s).width + 30; shape(ctx, PAPER, 3.5, rect(-w / 2, -22, w, 44, 3)); txt(ctx, s, 0, 2, FX.DISPLAY(26)); ctx.restore(); });
    ctx.restore();
    const ml = since(t, 'millions');
    if (ml > 0) { const n = Math.floor(lerp(0, 1000000, ease.in(clamp(ml / .9)))); const s = pop(ml); ctx.save(); ctx.translate(640, 110); ctx.scale(s, s);
      FX.bigText(ctx, ml > .9 ? 'MILLIONS' : n.toLocaleString('en-US'), 0, 0, 70, { color: GOLD }); ctx.restore(); }
    if (hm > 0 && hm < .3) { const k = hm / .3; ctx.save(); ctx.globalAlpha = 1 - k; shape(ctx, 'rgba(255,255,255,.6)', 0, c => c.rect(0, 0, W, H)); ctx.restore(); }
    vig(ctx);
    FX.dateTag(ctx, 'UNDER THE SQUARE');
  }

  // ---------- c5: a stone city on a buried forest, in the middle of a lagoon, 2.5 miles from dry land ----------
  const ISLAND = [[420, 300], [470, 250], [560, 230], [660, 236], [760, 250], [840, 290], [880, 340], [840, 380], [740, 400], [620, 410], [520, 396], [450, 360]];
  function aerial(ctx, t) {
    shape(ctx, '#8fc8d4', 0, rect(-900, -700, 3000, 2200));
    for (let i = 0; i < 40; i++) { const r = rng(40 + i)(); shape(ctx, 'rgba(176,160,110,.45)', 0, ellipse(-500 + (i * 173) % 2200, -300 + (i * 97) % 1200, 50 + r * 60, 14 + r * 10, -.4)); }
    // mainland (dry land), top-left, with fields
    shape(ctx, '#a8c878', 4, c => { c.moveTo(-900, -700); c.lineTo(600, -700); c.lineTo(420, -380); c.quadraticCurveTo(200, -200, -100, -160); c.lineTo(-900, 40); c.closePath(); });
    for (let i = 0; i < 18; i++) { const x = -800 + (i % 6) * 160, y = -640 + Math.floor(i / 6) * 150; shape(ctx, ['#c8d88a', '#98b868', '#d8c878'][i % 3], 2, poly([[x, y], [x + 140, y + 10], [x + 120, y + 120], [x - 10, y + 110]])); }
    // the sea and the long sandbar islands
    shape(ctx, '#5aa8c0', 0, c => { c.moveTo(800, 1500); c.lineTo(1200, 700); c.lineTo(1700, 300); c.lineTo(2100, 100); c.lineTo(2100, 1500); c.closePath(); });
    line(ctx, [[760, 1500], [1160, 700], [1660, 300], [2100, 90]], 22, '#e2d29a');
    // the city: tight red roofs, the Grand Canal, St Mark's
    shape(ctx, '#e8c8a0', 4.5, smooth(ISLAND));
    ctx.save(); ctx.beginPath(); smooth(ISLAND)(ctx); ctx.clip(); const r = rng(9);
    for (let y = 220; y < 420; y += 12) for (let x = 410; x < 890; x += 14) { ctx.fillStyle = ['#c8603a', '#d8784a', '#b8502e', '#e8a070'][Math.floor(r() * 4)]; ctx.fillRect(x + r() * 3, y + r() * 3, 11, 9); }
    line(ctx, [[440, 300], [520, 270], [600, 330], [680, 300], [740, 350], [800, 360]], 14, '#6ab0c4');
    ctx.restore(); shape(ctx, '#f4efe2', 3, rect(760, 360, 28, 18)); shape(ctx, '#c86a4a', 2.5, rect(746, 344, 8, 26));
  }
  function aerialExtras(ctx, t) {
    shape(ctx, '#e8c8a0', 4, smooth([[430, 440], [560, 430], [700, 440], [690, 456], [560, 452], [440, 458]]));
    for (const [x, y, rx] of [[760, 120, 46], [880, 170, 30], [300, 520, 36], [980, 470, 26]]) { shape(ctx, '#e0c098', 3.5, ellipse(x, y, rx, rx * .55)); shape(ctx, '#c8603a', 0, ellipse(x, y - 2, rx * .6, rx * .3)); }
    for (let i = 0; i < 6; i++) { const ph = (t * .05 + i / 6) % 1, x = lerp(-200 + i * 140, 1200 - i * 60, ph), y = 560 + Math.sin(i * 2) * 200 - ph * 120;
      ctx.save(); ctx.globalAlpha = .7; line(ctx, [[x - 50, y + 12], [x, y]], 4, '#e8f6f8'); ctx.restore(); shape(ctx, i % 2 ? '#f4efe2' : '#7a5434', 2.5, ellipse(x, y, 12, 5, -.25)); }
  }
  function c5(ctx, lt, dur, t) {
    const z = T.keys(t, [[A.venice, 2.2], [A.middle, 2.0], [A.lagoon + .9, .95]]), fx = T.keys(t, [[A.middle, 650], [A.lagoon + .9, 460]]), fyy = T.keys(t, [[A.middle, 320], [A.lagoon + .9, 120]]);
    ctx.save(); cam(ctx, z, fx, fyy);
    aerial(ctx, t); aerialExtras(ctx, t);
    const tw = since(t, 'two');
    if (tw > 0) { const k = ease.inOut(clamp(tw / .9)), a = [470, 255], b = [lerp(470, 250, k), lerp(255, -230, k)];
      ctx.save(); ctx.setLineDash([16, 12]); line(ctx, [a, b], 7, RED); ctx.restore(); shape(ctx, RED, 3, circle(a[0], a[1], 9)); if (k > .98) shape(ctx, RED, 3, circle(250, -230, 9));
      if (tw > .5) { const s = pop(tw - .5); ctx.save(); ctx.translate(250, 30); ctx.scale(s, s); ctx.rotate(-.05); FX.paperDoc(ctx, 0, 0, 280, 90, { lines: 0, draw: c => { txt(c, '≈ 2.5 MILES', 0, -12, FX.DISPLAY(32)); txt(c, '(4 KM) TO DRY LAND', 0, 22, FX.FONT(700, 16)); } }); ctx.restore(); } }
    if (since(t, 'dry') > 0) { ctx.save(); ctx.globalAlpha = .5 * Math.exp(-since(t, 'dry') * 1.5); shape(ctx, '#fff6c0', 0, c => { c.moveTo(-900, -700); c.lineTo(600, -700); c.lineTo(420, -380); c.quadraticCurveTo(200, -200, -100, -160); c.lineTo(-900, 40); c.closePath(); }); ctx.restore(); }
    ctx.restore();
    // the lens: the buried forest under the city
    const bf = since(t, 'buried');
    if (bf > 0 && t < A.middle + .3) { const k = pop(bf) * clamp((A.middle + .3 - t) / .3); ctx.save(); ctx.translate(900, 420); ctx.scale(k, k);
      shape(ctx, '#6e5a3a', 0, circle(0, 0, 150)); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 150, 0, 7); ctx.clip();
      for (let y = -160; y < 160; y += 26) for (let x = -160; x < 160; x += 26) { shape(ctx, '#c89a62', 2.5, circle(x + (y / 26 % 2) * 13, y, 10)); shape(ctx, '#a8784a', 0, circle(x + (y / 26 % 2) * 13, y, 4)); }
      ctx.restore(); shape(ctx, null, 10, circle(0, 0, 150)); line(ctx, [[106, 106], [190, 190]], 22, '#6e4a2c'); txt(ctx, 'A BURIED FOREST', 0, 178, FX.DISPLAY(28), INK); ctx.restore(); }
    strip(ctx, 'A STONE CITY', 640, 100, since(t, 'venice') + .2, { px: 40 });
    vig(ctx);
    FX.dateTag(ctx, 'VENICE TODAY');
  }

  // ---------- c6: peel it back — the marble, the churches, the forest — 1,500 years ----------
  function c6(ctx, lt, dur, t) {
    const pv = clamp(since(t, 'marble2') / .6), lift = clamp(since(t, 'churches') / .9), pl = clamp(since(t, 'forest2') / 1.2), ms = clamp((since(t, 'forest2') - .9) / 1.4);
    ctx.save(); cam(ctx, lerp(1.04, 1.0, clamp(lt / dur)), 640, 390);
    square(ctx, t, { pave: pv, lift, piles: pl, marsh: ms, lamps: 0 });
    const sp = since(t, 'spot'); if (sp > 0) { const s = pop(sp); ctx.save(); ctx.translate(640, 560); ctx.scale(s, s); line(ctx, [[-40, -24], [40, 24]], 14, RED); line(ctx, [[-40, 24], [40, -24]], 14, RED); ctx.restore(); }
    ctx.restore();
    // the year counter
    const fy = since(t, 'fifteen');
    if (fy > -1.2) { const k = ease.inOut(clamp(fy / 1.2)), yr = Math.round(lerp(2026, 500, k)); ctx.save(); ctx.translate(1060, 120); FX.bigText(ctx, k >= 1 ? 'c. AD 500' : String(yr), 0, 0, 56, { color: GOLD }); ctx.restore();
      if (fy > 0 && fy < 1.2) { ctx.save(); ctx.globalAlpha = .18 * Math.sin(Math.PI * fy / 1.2); shape(ctx, '#f0d8a0', 0, c => c.rect(0, 0, W, H)); ctx.restore(); } }
    [['THE MARBLE', 'marble2'], ['THE CHURCHES', 'churches'], ['THE FOREST', 'forest2']].forEach(([s, k], i) => { const kk = since(t, k); if (kk > 0 && kk < 1.6 && t < A.goback) strip(ctx, s, 360 + i * 280, 110, kk, { px: 30, rot: (i - 1) * .03 }); });
    if (t < A.marble2 - .2) strip(ctx, 'PEEL IT BACK', 640, 110, since(t, 'peel'), { px: 40 });
    vig(ctx);
  }

  // ---------- c7: ankle-deep in a salt marsh — reeds, mud, the tide twice a day; nobody would pick this ----------
  function c7(ctx, lt, dur, t) {
    const rd = since(t, 'reeds'), gust = rd > 0 ? Math.sin(rd * 4) * Math.exp(-rd * 1.2) : 0, md = since(t, 'mud2'), td = since(t, 'tide'), nb = since(t, 'nobody');
    const wl = td > 0 ? lerp(560, 500, ease.inOut(clamp(td / 1.6))) : 560;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    shape(ctx, grad(ctx, 0, -100, 0, 480, [[0, '#8fd0ec'], [1, '#fbe8c0']]), 0, rect(-200, -200, 1700, 700)); glow(ctx, 980, 200, 420, 'rgba(255,240,200,.55)'); clouds(ctx, t, [110, 170]); birds(ctx, t, 4, 170);
    shape(ctx, '#a8b888', 0, rect(-200, 440, 1700, 30));
    shape(ctx, '#8a7a52', 0, rect(-200, 466, 1700, 400));
    for (const [x, y, w] of [[200, 520, 160], [1000, 500, 200], [600, 610, 260], [1150, 640, 160]]) shape(ctx, '#9fc4cc', 3, ellipse(x, y, w, 12));
    // reed beds in the middle distance
    for (let i = 0; i < 60; i++) { const x = -150 + i * 27, b = 470 + (i * 37) % 60, h = 70 + (i * 23) % 60, sw = Math.sin(t * 1.4 + i * .7) * 6 + gust * 26;
      line(ctx, [[x, b], [x + sw * .5, b - h * .6], [x + sw, b - h]], 5, i % 2 ? '#6f7f34' : '#5a6a2a'); if (i % 5 === 0) shape(ctx, '#7a5a34', 2, ellipse(x + sw, b - h - 10, 5, 15)); }
    // your legs, ankle-deep
    const lift = md > 0 ? Math.sin(Math.PI * clamp(md / 1.1)) * 70 : 0;
    for (const [d, up] of [[-1, 0], [1, lift]]) { const x = 640 + d * 64; shape(ctx, '#3a4a6a', 4.5, rect(x - 30, -100, 60, 560 - up)); shape(ctx, '#4a5a7a', 4, rect(x - 33, 440 - up, 66, 26, 6)); shape(ctx, '#e8b490', 4, rect(x - 22, 466 - up, 44, 110));
      shape(ctx, '#7a6440', 4, c => { c.moveTo(x - 46, 574 - up); c.lineTo(x + 54, 574 - up); c.quadraticCurveTo(x + 96, 590 - up, x + 96, 620 - up); c.lineTo(x - 46, 624 - up); c.closePath(); });
      if (up > 10) for (let k = 0; k < 3; k++) shape(ctx, '#6e5a3a', 2, ellipse(x - 20 + k * 30, 630 - up + ((t * 300 + k * 40) % 80), 5, 8)); }
    // the water: rises with the tide
    ctx.save(); ctx.globalAlpha = .82; shape(ctx, V.WATER, 4, c => { c.moveTo(-200, wl); for (let x = -200; x <= 1500; x += 40) c.lineTo(x, wl + Math.sin(x * .02 + t * 1.6) * 5); c.lineTo(1500, 900); c.lineTo(-200, 900); c.closePath(); }); ctx.restore();
    for (const d of [-1, 1]) { ctx.save(); ctx.globalAlpha = .7; shape(ctx, null, 3, ellipse(640 + d * 70 + 10, wl + 6, 70 + Math.sin(t * 3) * 6, 10)); ctx.restore(); }
    // the sign: PRIME LOCATION, sinking crooked into the mud
    const sink = nb > 0 ? ease.in(clamp(nb / 1.6)) : 0; ctx.save(); ctx.translate(1010, 520 + sink * 60); ctx.rotate(.08 + sink * .35);
    line(ctx, [[0, 0], [0, -150]], 10, '#7a5434'); shape(ctx, '#d8b878', 4.5, rect(-110, -220, 220, 80, 4)); txt(ctx, 'PRIME', 0, -196, FX.DISPLAY(28), '#5a3a22'); txt(ctx, 'LOCATION', 0, -162, FX.DISPLAY(24), '#5a3a22'); ctx.restore();
    ctx.restore();
    // labels on the beats
    strip(ctx, 'A SALT MARSH', 640, 100, since(t, 'marsh') - .1, { px: 38 });
    if (rd > 0) strip(ctx, 'REEDS', 300, 210, rd, { px: 30, rot: -.05 });
    if (md > 0) strip(ctx, 'MUD', 960, 210, md, { px: 30, rot: .04 });
    const tw = since(t, 'twice'); if (tw > 0) { const s = pop(tw); ctx.save(); ctx.translate(200, 400); ctx.scale(s, s); shape(ctx, PAPER, 4, circle(0, 0, 70)); for (const a of [0, Math.PI]) { ctx.save(); ctx.rotate(a + t * .8); shape(ctx, '#3a7ab8', 3, poly([[0, -56], [14, -36], [-14, -36]])); ctx.restore(); }
      txt(ctx, '2×', 0, -6, FX.DISPLAY(36), '#2f5d6b'); txt(ctx, 'A DAY', 0, 26, FX.FONT(700, 15), '#2f5d6b'); ctx.restore(); }
    if (nb > 0) FX.caption(ctx, 'NOBODY WOULD PICK THIS', nb, .2);
    reedsFG(ctx, t, 9, gust);
    vig(ctx);
    FX.dateTag(ctx, 'THE SAME SPOT · c. AD 500');
  }

  // ---------- c8: for centuries, one of the richest cities in Europe ----------
  function skyline(ctx, base, rise, t) { // Venice's skyline rising out of the water, house by house
    const r = rng(17); let x = -100, i = 0;
    while (x < 1400) { const w = 70 + r() * 60, h = 120 + r() * 140, k = clamp((rise - i * .035) / .4), e = FX.settle(k);
      if (k > 0) { const col = ['#e8a87a', '#f0d29a', '#d88a6a', '#efe2c4', '#c8a0b8', '#e8c07a'][i % 6];
        ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1800, base + 2 + 400); ctx.clip(); ctx.translate(0, (1 - e) * (h + 40));
        if (i === 9) { basilica(ctx, x + 120, base, .5, t); campanile(ctx, x - 20, base, .42); x += 260; } else { shape(ctx, col, 4, rect(x, base - h, w, h)); shape(ctx, '#b8503a', 4, poly([[x - 6, base - h], [x + w / 2, base - h - 24], [x + w + 6, base - h]]));
          for (let k2 = 0; k2 < Math.floor(h / 48); k2++) shape(ctx, '#5a6a7a', 2.5, rect(x + w / 2 - 9, base - h + 20 + k2 * 44, 18, 24, 8)); x += w + 6; }
        ctx.restore(); } else x += w + 6;
      i++; } }
  function coin(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(.15, Math.abs(Math.cos(rot))) * s, s); shape(ctx, '#e8c14a', 4, circle(0, 0, 22)); shape(ctx, '#d0a838', 0, circle(0, 0, 14)); txt(ctx, 'V', 0, 1, FX.DISPLAY(18), '#a8782a'); ctx.restore(); }
  function c8(ctx, lt, dur, t) {
    const ce = since(t, 'centuries'), ri = since(t, 'richest');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, grad(ctx, 0, -100, 0, 520, [[0, ri > 0 ? '#f6c46a' : '#8fd0ec'], [1, '#fff0c8']]), 0, rect(-200, -200, 1700, 800)); glow(ctx, 640, 380, 600, 'rgba(255,230,160,.5)'); clouds(ctx, t, [90, 140], .8);
    skyline(ctx, 520, ce > 0 ? ce * 1.2 : 0, t);
    shape(ctx, V.WATER, 4, c => { c.moveTo(-200, 520); for (let x = -200; x <= 1500; x += 40) c.lineTo(x, 520 + Math.sin(x * .02 + t * 1.5) * 5); c.lineTo(1500, 900); c.lineTo(-200, 900); c.closePath(); });
    for (let i = 0; i < 6; i++) { const x = 100 + i * 220; ctx.save(); ctx.globalAlpha = .3; shape(ctx, '#fff2c0', 0, ellipse(x, 560 + (i % 2) * 40, 60, 5)); ctx.restore(); }
    // gold: coins rain into stacks on "richest"
    if (ri > 0) { for (let i = 0; i < 22; i++) { const d = ri - i * .06; if (d <= 0) continue; const x = 120 + (i * 151) % 1040, h = FX.dropBounce(d, 520, .25); coin(ctx, x, 600 - h, 1, t * 6 + i); }
      for (const [x, n] of [[300, 5], [980, 7]]) for (let k = 0; k < Math.min(n, Math.floor((ri - .4) * 8)); k++) { shape(ctx, '#e8c14a', 4, ellipse(x, 640 - k * 12, 34, 10)); } }
    ctx.restore();
    if (ri > 0) strip(ctx, "ONE OF EUROPE'S RICHEST CITIES", 640, 100, ri, { px: 38 }); else strip(ctx, 'FOR CENTURIES…', 640, 100, ce, { px: 38 });
    vig(ctx);
    FX.dateTag(ctx, '1200s – 1500s');
  }

  // ---------- c9: today — more beds for tourists than people who live here ----------
  function bed(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, '#7a5434', 3, rect(-30, -8, 60, 10)); shape(ctx, '#f4efe2', 3, rect(-28, -22, 56, 16, 4)); shape(ctx, '#e8c0a0', 3, rect(-28, -26, 16, 10, 4)); shape(ctx, '#3a7ab8', 3, rect(-10, -24, 38, 16, 4)); ctx.restore(); }
  function person(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, col, 3, c => { c.moveTo(-16, 0); c.lineTo(-14, -34); c.quadraticCurveTo(0, -44, 14, -34); c.lineTo(16, 0); c.closePath(); }); shape(ctx, '#f0c8a0', 3, circle(0, -52, 12)); ctx.restore(); }
  function c9(ctx, lt, dur, t) {
    const bd = since(t, 'beds'), pp = since(t, 'people');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, grad(ctx, 0, -100, 0, 480, [[0, '#8fd0ec'], [1, '#fbecc6']]), 0, rect(-200, -200, 1700, 700)); clouds(ctx, t, [80, 120]);
    // a canal-side today: crowds along the quay
    skyline(ctx, 420, 9, t);
    shape(ctx, '#d8c8a8', 4, rect(-200, 420, 1700, 80)); shape(ctx, V.WATER, 4, rect(-200, 500, 1700, 300));
    const r = rng(3); for (let i = 0; i < 46; i++) { const x = -60 + i * 30 + r() * 10, y = 470 + (i % 3) * 12, bob = Math.abs(Math.sin(t * 5 + i)) * 3; person(ctx, x + Math.sin(t * .5 + i) * 6, y - bob, .7, ['#d84a3a', '#3a7ab8', '#e8c14a', '#4a9a5a', '#f4efe2', '#a85ab8'][i % 6]); }
    // the comparison: beds vs residents
    if (bd > -.2) { const k = ease.out(clamp((bd + .2) / 1.2)); ctx.save(); ctx.translate(0, 0);
      shape(ctx, 'rgba(255,250,236,.92)', 4, rect(150, 520, 980, 180, 10));
      txt(ctx, 'TOURIST BEDS', 300, 568, FX.FONT(700, 20)); for (let i = 0; i < Math.floor(18 * k); i++) bed(ctx, 420 + i * 38, 580, .6);
      txt(ctx, 'RESIDENTS', 300, 648, FX.FONT(700, 20)); const kp = ease.out(clamp(pp / 1)); for (let i = 0; i < Math.floor(16 * kp); i++) person(ctx, 420 + i * 38, 670, .6, '#5a6a7a');
      if (pp > 1) { const s = pop(pp - 1); ctx.save(); ctx.translate(1110, 610); ctx.scale(s, s); FX.bigText(ctx, '>', 0, 0, 64, { color: GOLD }); ctx.restore(); } ctx.restore(); }
    ctx.restore();
    strip(ctx, "TODAY, IT'S STRANGER", 640, 100, since(t, 'today'), { px: 38 });
    vig(ctx);
    FX.dateTag(ctx, 'VENICE TODAY');
  }

  // ---------- c10: how did a place nobody wanted… everybody wants? why are its own people leaving? ----------
  function c10(ctx, lt, dur, t) {
    const nw = since(t, 'nobodyw'), ev = since(t, 'everybody'), wy = since(t, 'why');
    const split = wy > 0 ? ease.inOut(clamp(wy / .5)) : 0;
    shape(ctx, '#f3e8cc', 0, rect(0, 0, W, H));
    // left panel: the marsh nobody wanted
    ctx.save(); ctx.translate(-split * 700, 0); ctx.beginPath(); ctx.rect(20, 20, 610, 680); ctx.clip();
    shape(ctx, grad(ctx, 0, 20, 0, 400, [[0, '#a8c8d4'], [1, '#e8e0c0']]), 0, rect(20, 20, 610, 680)); shape(ctx, '#8a7a52', 0, rect(20, 400, 610, 300));
    for (let i = 0; i < 26; i++) { const x = 30 + i * 24, h = 60 + (i * 31) % 70; line(ctx, [[x, 420 + (i % 3) * 20], [x + Math.sin(t + i) * 5, 420 + (i % 3) * 20 - h]], 5, '#5a6a2a'); }
    for (const [x, y] of [[200, 520], [460, 600]]) shape(ctx, '#9fc4cc', 3, ellipse(x, y, 120, 12));
    ctx.restore(); ctx.save(); ctx.translate(-split * 700, 0); shape(ctx, null, 5, rect(20, 20, 610, 680, 6)); ctx.restore();
    // right panel: the city everybody wants
    ctx.save(); ctx.translate(split * 700, 0); ctx.beginPath(); ctx.rect(650, 20, 610, 680); ctx.clip();
    shape(ctx, grad(ctx, 0, 20, 0, 400, [[0, '#8fd0ec'], [1, '#fbecc6']]), 0, rect(650, 20, 610, 680)); ctx.save(); ctx.translate(650, 0); ctx.scale(.48, 1); skyline(ctx, 430, 9, t); ctx.restore();
    shape(ctx, '#d8c8a8', 4, rect(650, 430, 610, 70)); shape(ctx, V.WATER, 4, rect(650, 500, 610, 200));
    for (let i = 0; i < 22; i++) person(ctx, 670 + i * 27, 482 + (i % 3) * 10, .65, ['#d84a3a', '#3a7ab8', '#e8c14a', '#4a9a5a'][i % 4]);
    ctx.restore(); ctx.save(); ctx.translate(split * 700, 0); shape(ctx, null, 5, rect(650, 20, 610, 680, 6)); ctx.restore();
    if (split < 1) { ctx.save(); ctx.globalAlpha = 1 - split; strip(ctx, 'NOBODY WANTED', 325, 120, nw, { px: 34 }); strip(ctx, 'EVERYBODY WANTS', 955, 120, ev, { px: 34, color: RED });
      if (ev > 0) { const s = pop(ev); ctx.save(); ctx.translate(640, 360); ctx.scale(s, s); shape(ctx, GOLD, 4, poly([[-40, -24], [10, -24], [10, -48], [50, 0], [10, 48], [10, 24], [-40, 24]])); ctx.restore(); } ctx.restore(); }
    // behind the panels: a resident leaves home with a suitcase; the door sign flips HOME → HOTEL
    if (split > 0) { ctx.save(); ctx.globalAlpha = split;
      shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#8fd0ec'], [1, '#fbecc6']]), 0, rect(0, 0, W, H)); clouds(ctx, t, [90, 140]);
      shape(ctx, '#c8a0b8', 5, rect(-20, 160, 240, 480)); for (const y of [210, 330, 450]) shape(ctx, '#5a6a7a', 3, rect(60, y, 60, 80, 20));
      shape(ctx, V.WATER, 4, rect(780, 560, 520, 160)); shape(ctx, '#f0d29a', 5, rect(1080, 120, 220, 450)); for (const y of [170, 290, 410]) shape(ctx, '#5a6a7a', 3, rect(1140, y, 60, 80, 20));
      shape(ctx, '#e2cfa8', 5, c => { c.moveTo(780, 560); c.quadraticCurveTo(930, 440, 1080, 560); c.lineTo(1080, 580); c.quadraticCurveTo(930, 470, 780, 580); c.closePath(); });
      ctx.save(); ctx.translate(930, 640 + Math.sin(t * 1.5) * 3); shape(ctx, '#1f1a18', 4, c => { c.moveTo(-120, -10); c.quadraticCurveTo(0, 20, 130, -26); c.lineTo(120, -6); c.quadraticCurveTo(0, 24, -110, 4); c.closePath(); }); ctx.restore();
      shape(ctx, '#e8a87a', 5, rect(240, 80, 520, 560)); for (const x of [300, 600]) for (const y of [130, 260]) shape(ctx, '#5a6a7a', 3.5, c => { c.moveTo(x, y + 90); c.lineTo(x, y + 30); c.arc(x + 30, y + 30, 30, Math.PI, 0); c.lineTo(x + 60, y + 90); c.closePath(); });
      shape(ctx, '#6e4a2c', 5, c => { c.moveTo(420, 640); c.lineTo(420, 450); c.arc(500, 450, 80, Math.PI, 0); c.lineTo(580, 640); c.closePath(); }); shape(ctx, '#d8c8a8', 0, rect(0, 640, W, 80)); line(ctx, [[0, 640], [W, 640]], 4);
      const lv = since(t, 'leaving'), flip = lv > 0 ? clamp(lv / .3) : 0; ctx.save(); ctx.translate(500, 380); ctx.scale(1, Math.abs(Math.cos(flip * Math.PI)) || .02);
      shape(ctx, PAPER, 4, rect(-80, -26, 160, 52, 3)); txt(ctx, flip < .5 ? 'HOME' : 'HOTEL', 0, 2, FX.DISPLAY(30), flip < .5 ? INK : RED); ctx.restore();
      const wx = 520 + Math.max(0, wy - .3) * 170, ph = t * 6.5;
      fig(ctx, wx, 650, .26, { head: 'elder', outfit: 'tunicElder', feet: { L: [-30 + Math.sin(ph) * 70, -40 - Math.max(0, Math.cos(ph)) * 30], R: [30 - Math.sin(ph) * 70, -40 - Math.max(0, -Math.cos(ph)) * 30] }, hands: { L: [-130 - Math.sin(ph) * 50, -470], R: [150, -430] }, handShape: { R: 'fist' }, face: { brows: 'worried', mouth: 'flat', look: [.7, 0], eyes: blink(t, 71.0) } });
      shape(ctx, '#8a3a2a', 4, rect(wx + 150 * .26 - 26, 650 - 430 * .26 + 10, 52, 66, 6)); line(ctx, [[wx + 150 * .26 - 12, 650 - 430 * .26 + 10], [wx + 150 * .26 + 12, 650 - 430 * .26 + 10]], 4);
      ctx.restore(); strip(ctx, 'WHY ARE ITS PEOPLE LEAVING?', 640, 100, wy - .2, { px: 36 }); }
    vig(ctx);
  }

  // ---------- c11: the answer is the water — five jobs — title ----------
  function c11(ctx, lt, dur, t) {
    const wt = since(t, 'water'), fv = since(t, 'five'), tt = since(t, 'title');
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#7ab8e0'], [.65, '#cfe6ea'], [1, '#fbe6be']]), 0, rect(0, 0, W, H));
    glow(ctx, 640, 300, 600, 'rgba(255,240,200,.55)'); clouds(ctx, t, [90, 150]); birds(ctx, t, 4, 170);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    T.blurred(ctx, 1.2, () => { shape(ctx, '#bcd0b8', 0, c => { c.moveTo(-200, 520); for (let x = -200; x <= 1500; x += 120) c.quadraticCurveTo(x + 60, 490, x + 120, 520); c.lineTo(1500, 560); c.lineTo(-200, 560); c.closePath(); });
      ctx.save(); ctx.scale(1, 1); for (const [x, s] of [[150, .5], [1120, .45]]) { shape(ctx, '#9a9a72', 2, ellipse(x, 528, 80, 7)); } ctx.restore(); });
    const rise = wt > -.3 ? FX.settle(clamp((wt + .3) / .7)) : 0;
    ctx.save(); ctx.translate(0, (1 - rise) * 320); V.lagoon(ctx, 640, 640, 760, t, { look: tt > 0 ? [0, -.6] : fv > 0 ? [0, -.8] : [0, .1], eyes: blink(t, 75.6, 77.6), mouth: wt > .3 ? 'smile' : 'o' }); ctx.restore();
    if (wt > 0 && wt < .8) for (let i = 0; i < 10; i++) { const a = -Math.PI * (i + .5) / 10, d = wt * 300; shape(ctx, '#d9eef0', 3, circle(640 + Math.cos(a) * d * 1.6, 520 + Math.sin(a) * d - wt * wt * 200 + wt * 160, 10 * (1 - wt))); }
    // five hats line up above the lagoon, one per job
    const hats = ['helmet', 'hardhat', 'captain', 'mask', 'lifering'];
    hats.forEach((h, i) => { const k = since(t, 'over') + .3 - i * .75; if (k <= 0) return; const s = pop(k) * .62, x = 240 + i * 200, y = 300 + Math.abs(i - 2) * 26 + Math.sin(t * 1.5 + i) * 4;
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); V.hats[h](ctx, 0, 0); ctx.restore();
      const n = since(t, 'five') - i * .12; if (n > 0) { ctx.save(); ctx.translate(x, y + 70); ctx.scale(pop(n), pop(n)); shape(ctx, RED, 3.5, circle(0, 0, 20)); txt(ctx, String(i + 1), 0, 2, FX.DISPLAY(24), '#fff'); ctx.restore(); } });
    ctx.restore();
    if (tt < 0) strip(ctx, 'THE ANSWER IS THE WATER', 640, 96, since(t, 'answer'), { px: 40 });
    const jb = since(t, 'jobs'); if (jb > 0 && tt < 0) { const s = pop(jb); ctx.save(); ctx.translate(640, 190); ctx.scale(s, s); FX.bigText(ctx, '5 JOBS · 1,500 YEARS', 0, 0, 44, { color: GOLD }); ctx.restore(); }
    // title card
    if (tt > 0) { const s = slam(tt, .12); ctx.save(); ctx.globalAlpha = clamp(tt / .15); ctx.translate(640, 150); ctx.rotate(-.02); ctx.scale(s, s);
      ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-470 + 10, -100 + 12, 940, 200); shape(ctx, PAPER, 6, rect(-470, -100, 940, 200, 6)); shape(ctx, null, 3, rect(-452, -82, 904, 164, 4));
      txt(ctx, 'THE ENTIRE HISTORY OF', 0, -42, FX.DISPLAY(40), INK); FX.bigText(ctx, 'VENICE', 0, 30, 92, { color: GOLD }); ctx.restore();
      sparkle(ctx, 210, 120, (tt - .1) / .7, 1.2); sparkle(ctx, 1070, 280, (tt - .3) / .7, 1); }
    vig(ctx);
  }

  const cut = [[0, c1], [7.2, c2], [11.35, c3], [16.85, c4], [27.75, c5], [35.55, c6], [44.95, c7], [54.3, c8], [58.95, c9], [64.85, c10], [72.35, c11]];
  const shots = cut.map(([s, draw], i) => ({ start: s, end: i + 1 < cut.length ? cut[i + 1][0] : A.end, draw }));
  const sfx = [
    { t: .3, type: 'wind', gain: .25 }, { t: A.quiet + .1, type: 'whoosh', gain: .25 }, { t: A.shoes, type: 'click', gain: .4 }, { t: A.mosaic, type: 'swell', gain: .35 },
    ...[0, 1, 2, 3].map(i => ({ t: A.four + i * .22, type: 'click', gain: .3 })), { t: A.remember, type: 'thud', gain: .6 },
    { t: A.look, type: 'whoosh', gain: .4 }, { t: A.stone, type: 'paper', gain: .4 }, { t: A.mud, type: 'paper', gain: .4 }, { t: A.hammered + .2, type: 'thud', gain: .9 },
    ...[0, 1, 2, 3, 4, 5].map(i => ({ t: A.packed + i * .18, type: 'thud', gain: .45 })), { t: A.trunks, type: 'paper', gain: .4 }, { t: A.millions, type: 'ratchet', gain: .4 }, { t: A.millions + .9, type: 'thud', gain: .6 },
    { t: A.venice, type: 'whoosh', gain: .3 }, { t: A.buried, type: 'swell', gain: .35 }, { t: A.two, type: 'slide', gain: .4 },
    { t: A.peel, type: 'paper', gain: .5 }, { t: A.marble2, type: 'paper', gain: .5 }, { t: A.churches, type: 'whoosh', gain: .5 }, { t: A.forest2, type: 'slide', gain: .4 }, { t: A.fifteen, type: 'swell', gain: .5 }, { t: A.spot, type: 'thud', gain: .6 },
    { t: A.marsh, type: 'wind', gain: .35 }, { t: A.reeds, type: 'wind', gain: .3 }, { t: A.mud2 + .2, type: 'splash', gain: .4 }, { t: A.tide, type: 'splash', gain: .3 }, { t: A.twice, type: 'click', gain: .4 }, { t: A.nobody + .4, type: 'creak', gain: .5 },
    { t: A.centuries, type: 'swell', gain: .4 }, ...[0, 1, 2, 3, 4, 5].map(i => ({ t: A.richest + .2 + i * .25, type: 'click', gain: .3 })),
    { t: A.today, type: 'whoosh', gain: .4 }, { t: A.beds, type: 'paper', gain: .4 }, { t: A.people + 1, type: 'thud', gain: .5 },
    { t: A.nobodyw, type: 'paper', gain: .4 }, { t: A.everybody, type: 'paper', gain: .4 }, { t: A.why, type: 'whoosh', gain: .4 }, { t: A.leaving, type: 'click', gain: .5 },
    { t: A.answer, type: 'paper', gain: .5 }, { t: A.water - .2, type: 'splash', gain: .6 }, ...[0, 1, 2, 3, 4].map(i => ({ t: A.over + .3 + i * .75, type: 'click', gain: .35 })),
    { t: A.title, type: 'boom', gain: .6 }, { t: A.title + .05, type: 'swell', gain: .6 },
  ];
  const moods = [{ t: 0, mood: 'under' }, { t: A.peel - .3, mood: 'mystery' }, { t: A.answer - .2, mood: 'still' }, { t: A.title, mood: 'under' }];
  G.Show = { duration: A.end, narration: 'venice/assets/audio/narration-coldopen.mp3', shots, sfx, moods,
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'] };
})(window);
