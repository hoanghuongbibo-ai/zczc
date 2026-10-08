/* 10-second style preview for the business-story channel — the cold open of
 * "How One Company Quietly Bought America's Funeral Homes" (no narration yet).
 * Beats: the family funeral home → grandma's memory → the sign cracks → pins across the US → 1,485 / 500. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, B = G.Bean;
  const { W, H, shape, rect, circle, line, grad, cam, prog, lerp, ease, clamp, rng } = T;
  const INK = B.INK, HAND = (w, px) => `${w} ${px}px Caveat, "Patrick Hand", cursive`, PRINT = px => `${px}px "Patrick Hand", Caveat, cursive`;
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  const pop = k => FX.settle(clamp(k));
  G.TOON_FINISH = { grain: .02, vignette: 0 };                 // the references are clean and flat: no vignette, barely any grain

  // ---------- the funeral home (fictional name) ----------
  const NAME = ['HOLLOWAY & SONS', 'FUNERAL HOME'];
  function sky(ctx) {
    ctx.fillStyle = grad(ctx, 0, -100, 0, 500, [[0, '#b9c6cc'], [1, '#d9dedc']]); ctx.fillRect(-400, -300, 2100, 1300);
    for (const [x, y, s] of [[180, 90, 1], [980, 70, 1.3], [1180, 140, .8]]) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#eef1f0'; for (const [dx, dy, r] of [[0, 0, 30], [32, -10, 38], [70, 2, 28], [40, 12, 30]]) { ctx.beginPath(); ctx.arc(dx, dy, r, 0, 7); ctx.fill(); } ctx.restore(); }
  }
  function building(ctx) {
    // brick body
    B.outline(ctx, c => c.rect(260, 190, 760, 330), '#9c6a58');
    ctx.save(); ctx.beginPath(); ctx.rect(262, 192, 756, 326); ctx.clip(); ctx.strokeStyle = 'rgba(60,30,20,.22)'; ctx.lineWidth = 2;
    for (let y = 192, i = 0; y < 520; y += 18, i++) { ctx.beginPath(); ctx.moveTo(260, y); ctx.lineTo(1020, y); ctx.stroke(); for (let x = 260 + (i % 2) * 22; x < 1020; x += 44) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 18); ctx.stroke(); } } ctx.restore();
    // pediment + roof line
    B.outline(ctx, c => { c.moveTo(380, 190); c.lineTo(640, 92); c.lineTo(900, 190); c.closePath(); }, '#efe9dc');
    B.outline(ctx, c => c.rect(360, 186, 560, 22), '#e4ddcd');
    // windows
    for (const x of [300, 900]) for (const y of [240, 370]) { B.outline(ctx, c => c.rect(x, y, 80, 100), '#5d6f78'); B.line(ctx, [[x + 40, y], [x + 40, y + 100]], 3); B.line(ctx, [[x, y + 50], [x + 80, y + 50]], 3); }
    // white columns + door
    B.outline(ctx, c => c.rect(570, 360, 140, 160), '#4a342a'); B.line(ctx, [[640, 360], [640, 520]], 3); ctx.fillStyle = '#c9a14a'; ctx.beginPath(); ctx.arc(628, 445, 4, 0, 7); ctx.arc(652, 445, 4, 0, 7); ctx.fill();
    for (const x of [410, 500, 760, 850]) { B.outline(ctx, c => c.rect(x, 208, 30, 312), '#f6f2ea'); B.line(ctx, [[x + 15, 214], [x + 15, 514]], 1.8, 'rgba(0,0,0,.12)'); B.outline(ctx, c => c.rect(x - 6, 208, 42, 12), '#f6f2ea', 3); }
    for (let i = 0; i < 3; i++) B.outline(ctx, c => c.rect(520 - i * 18, 520 + i * 14, 240 + i * 36, 14), '#d8d2c4', 3);
  }
  function lawn(ctx) { B.outline(ctx, c => c.rect(-400, 560, 2100, 400), '#8f9a72', 0); line(ctx, [[-400, 560], [1700, 560]], 4, INK); shape(ctx, '#b8b2a4', 0, c => { c.moveTo(570, 562); c.lineTo(710, 562); c.lineTo(820, 900); c.lineTo(460, 900); c.closePath(); }); }
  // the sign on two posts; crack k (0..1) splits it down the middle
  function sign(ctx, x, y, s, crack = 0, t = 0) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (const px of [-150, 150]) B.outline(ctx, c => c.rect(px - 9, 40, 18, 150), '#6b4f39');
    const halves = crack > 0 ? [-1, 1] : [0];
    const CR = [[0, -80], [-10, -40], [8, -8], [-6, 26], [6, 60], [0, 82]];
    for (const h of halves) {
      ctx.save();
      if (h) { const sep = crack > .6 ? (crack - .6) * 10 : 0; ctx.translate(h * sep, Math.abs(h) * sep * .3); ctx.rotate(h * sep * .004);
        ctx.beginPath(); ctx.moveTo(h * 260, -110); for (const p of CR) ctx.lineTo(...p); ctx.lineTo(h * 260, 110); ctx.closePath(); ctx.clip(); }
      B.outline(ctx, c => c.roundRect(-210, -82, 420, 164, 10), '#efe6cf');
      B.outline(ctx, c => c.roundRect(-196, -68, 392, 136, 6), null, 2.4);
      txt(ctx, NAME[0], 0, -34, PRINT(40)); txt(ctx, NAME[1], 0, 2, PRINT(28), '#5a4a3a');
      txt(ctx, 'Family Owned Since 1952', 0, 44, HAND(700, 34), '#7a2e26');
      ctx.restore();
    }
    if (crack > 0) { const n = Math.ceil(crack * CR.length); ctx.save(); ctx.beginPath(); ctx.moveTo(...CR[0]); for (let i = 1; i < Math.min(n, CR.length); i++) ctx.lineTo(...CR[i]); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
      if (crack < .9) { const r = rng(4); for (let i = 0; i < 6; i++) { const k = (crack * 3 + i * .17) % 1; ctx.fillStyle = '#d8ccb0'; ctx.fillRect((r() - .5) * 30, -40 + k * 160, 5, 5); } } }
    ctx.restore();
  }

  // ---------- shots ----------
  function s1(ctx, lt, dur, t) { // the brick funeral home, white columns, slow push-in toward the sign
    ctx.save(); cam(ctx, lerp(1, 1.12, ease.inOut(clamp(lt / dur))), 640, 470);
    sky(ctx); lawn(ctx); building(ctx);
    for (const [x, h] of [[120, 300], [1160, 260]]) { B.line(ctx, [[x, 560], [x, 560 - h]], 9, '#5a4636'); for (const a of [-.6, -.3, .3, .6]) B.line(ctx, [[x, 560 - h * .6], [x + a * 90, 560 - h * .95]], 4, '#5a4636'); }
    sign(ctx, 640, 610, .62);
    ctx.restore();
  }
  function s2(ctx, lt, dur, t) { // grandma's memory: the name she trusted
    ctx.fillStyle = '#d9cfbd'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.fillStyle = '#e8e0cf'; ctx.beginPath(); ctx.ellipse(640, 360, 520, 330, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); cam(ctx, lerp(1, 1.05, clamp(lt / dur)), 640, 400);
    sign(ctx, 900, 420, .55);
    B.groundShadow(ctx, 520, 600, 260, 26);
    const nod = Math.sin(clamp((lt - .5) / .8) * Math.PI) * .03;
    B.person(ctx, 440, 600, 1, { skin: 'white', hair: 'greyBun', glasses: true, body: '#b48f9a', top: 'cardigan', legs: '#6a5a5a', lean: nod, face: { mouth: 'smile', brows: 'calm', look: [.6, -.1], eyes: lt > 1.4 && lt < 1.55 ? 0 : 1 }, armL: [.15, 0], armR: [.5, .9] });
    B.person(ctx, 600, 600, .72, { skin: 'white', hair: 'short', body: '#6e8aa0', top: 'shirt', legs: '#4a5a6a', face: { mouth: 'flat', brows: 'calm', look: [.5, -.4] }, armL: [.45, .8], armR: [.12, 0] });
    ctx.restore();
    ctx.save(); ctx.globalAlpha = clamp((lt - .3) / .4); txt(ctx, 'The name grandma trusted.', 640, 92, HAND(700, 46)); ctx.restore();
  }
  function s3(ctx, lt, dur, t) { // the sign cracks down the middle
    const cr = clamp((lt - .55) / .5);
    ctx.save(); cam(ctx, lerp(1.0, 1.06, clamp(lt / dur)), 640, 380);
    sky(ctx); lawn(ctx);
    const shake = cr > 0 && cr < .5 ? Math.sin(lt * 70) * 4 * (1 - cr * 2) : 0;
    ctx.translate(shake, 0); sign(ctx, 640, 360, 1.55, cr, t);
    ctx.restore();
  }
  // contiguous US outline (lon, lat), projected to the frame
  const US = [[-124.7, 48.4], [-123, 49], [-95, 49], [-89.6, 48], [-84.8, 46.5], [-82.4, 45.3], [-83, 42], [-79, 42.5], [-79.2, 43.4], [-76, 44], [-75, 45], [-71.5, 45], [-70, 46.7], [-68.3, 47.4], [-67, 45], [-70.6, 43], [-70.5, 41.8], [-69.9, 41.7], [-71.9, 41.3], [-74, 40.6], [-74.2, 39.4], [-75.5, 38.8], [-76, 37], [-75.5, 35.5], [-76.5, 34.7], [-78.5, 33.8], [-80.9, 32], [-81.4, 30.7], [-80.1, 27], [-80.4, 25.2], [-81.8, 25.9], [-82.8, 28], [-82.7, 29.9], [-84.3, 30.1], [-85.4, 29.7], [-87.7, 30.3], [-89.6, 30.2], [-89.4, 29.1], [-91.3, 29.3], [-93.8, 29.7], [-94.8, 29.3], [-97.2, 27.7], [-97.4, 26], [-99.2, 26.5], [-101.4, 29.8], [-103, 29], [-104.7, 29.9], [-106.5, 31.8], [-108.2, 31.8], [-111, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.8], [-124.2, 42], [-124.1, 46.2]];
  const proj = ([lon, lat]) => [140 + (lon + 125) * 16.95, 110 + (49.5 - lat) * 20.6];
  let usPath = null, pins = null;
  function usShape() {
    if (usPath) return; usPath = new Path2D(); US.map(proj).forEach((p, i) => i ? usPath.lineTo(...p) : usPath.moveTo(...p)); usPath.closePath();
    const c = document.createElement('canvas').getContext('2d'), r = rng(11); pins = [];
    while (pins.length < 420) { const p = [140 + r() * 1000, 110 + r() * 520]; if (c.isPointInPath(usPath, ...p)) pins.push(p); }
    pins.sort((a, b) => Math.hypot(a[0] - 735, a[1] - 515) - Math.hypot(b[0] - 735, b[1] - 515));   // spreading out from Houston
  }
  function s4(ctx, lt, dur, t) { // one company in Houston; pins one by one, then hundreds at once
    usShape();
    ctx.fillStyle = '#fbfaf7'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(ctx, lerp(1.04, 1, ease.out(clamp(lt / dur))), 640, 380);
    ctx.fillStyle = '#e6e0d2'; ctx.fill(usPath); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke(usPath);
    const hou = proj([-95.4, 29.8]);
    const one = Math.floor(clamp((lt - .25) / .9) * 6), many = lt > 1.25 ? Math.floor(ease.in(clamp((lt - 1.25) / .45)) * pins.length) : 0;
    const n = Math.max(one, many);
    for (let i = 0; i < n; i++) { const [x, y] = pins[i], k = i < 6 ? pop((lt - .25 - i * .15) / .2) : 1; ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(x, y, 6 * k, 0, 7); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke(); }
    const hk = pop(lt / .3); ctx.save(); ctx.translate(...hou); ctx.scale(hk, hk); B.outline(ctx, c => c.arc(0, 0, 13, 0, 7), '#2a2622', 3); ctx.restore();
    if (hk > .5) { txt(ctx, 'Houston', hou[0] - 20, hou[1] + 36, HAND(700, 34), INK, 'right'); }
    ctx.restore();
  }
  function s5(ctx, lt, dur, t) { // 1,485 funeral homes · 500 cemeteries (white explainer slide, like the references)
    ctx.fillStyle = '#fbfaf7'; ctx.fillRect(0, 0, W, H);
    const k1 = ease.out(clamp((lt - .1) / .9)), k2 = ease.out(clamp((lt - .35) / .9));
    const house = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); B.outline(ctx, c => { c.moveTo(-40, 0); c.lineTo(-40, -50); c.lineTo(0, -82); c.lineTo(40, -50); c.lineTo(40, 0); c.closePath(); }, '#9c6a58', 4); B.outline(ctx, c => c.rect(-12, -34, 24, 34), '#4a342a', 3); for (const cx of [-28, 20]) B.outline(ctx, c => c.rect(cx, -42, 8, 42), '#f6f2ea', 2.4); ctx.restore(); };
    const stone = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); B.outline(ctx, c => { c.moveTo(-30, 0); c.lineTo(-30, -50); c.quadraticCurveTo(0, -84, 30, -50); c.lineTo(30, 0); c.closePath(); }, '#b6b4ae', 4); B.line(ctx, [[-14, -40], [14, -40]], 3); B.line(ctx, [[-14, -26], [10, -26]], 3); ctx.restore(); };
    house(380, 330, pop((lt - .05) / .3) * 1.6); stone(900, 330, pop((lt - .3) / .3) * 1.7);
    txt(ctx, Math.round(1485 * k1).toLocaleString('en-US'), 380, 420, HAND(700, 96), '#c0392b'); txt(ctx, 'funeral homes', 380, 490, HAND(700, 44));
    txt(ctx, String(Math.round(500 * k2)), 900, 420, HAND(700, 96), '#c0392b'); txt(ctx, 'cemeteries', 900, 490, HAND(700, 44));
    ctx.save(); ctx.globalAlpha = clamp((lt - .7) / .3); txt(ctx, 'One company. Its name isn\'t on the sign.', 640, 610, HAND(700, 42), '#5a5048'); ctx.restore();
  }

  const shots = [[0, 3.0, s1], [3.0, 5.0, s2], [5.0, 6.8, s3], [6.8, 8.6, s4], [8.6, 10.4, s5]].map(([start, end, draw]) => ({ start, end, draw }));
  G.Show = {
    duration: 10.4, narration: '../biz/assets/audio/silence-10s.mp3', shots,
    sfx: [{ t: 5.55, type: 'hit', gain: .8 }, { t: 5.6, type: 'scratch', gain: .7 }, ...[0, 1, 2, 3, 4, 5].map(i => ({ t: 7.05 + i * .15, type: 'click', gain: .45 })), { t: 8.05, type: 'rattle', gain: .5 }, { t: 8.6, type: 'whoosh', gain: .5 }],
    moods: [{ t: 0, mood: 'mystery' }],
    images: {}, fonts: ['700 40px Caveat', '40px "Patrick Hand"'],
  };
})(window);
