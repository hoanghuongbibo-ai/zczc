/* SKIT FORMAT demo (~25 s): the reference's language — painterly golden-hour sets, sun wedges, blurred foreground
 * foliage, wide two-shots, over-the-shoulder with a blurred foreground figure, deadpan close-ups, comic pauses,
 * name-tagged subtitles — with the channel's own touch: THEO (era outfit), the paper subtitle strips, and the
 * MYTH CARD insert with the BUSTED stamp. Myth: Romans had "vomit rooms". Fact: a vomitorium is the passage that
 * lets a theatre/amphitheatre crowd pour out (Latin vomere, "to spew forth"). Silent track until the user's voice/script. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, CAST = G.Cast, { W, H, clamp, lerp, ease, shape, rect, grad, line, circle, rng } = T;
  const INK = FX.INK, TAU = Math.PI * 2;
  const cache = {};
  function layer(key, blur, fn, w = W + 200) {
    if (cache[key]) return cache[key];
    const raw = document.createElement('canvas'); raw.width = w; raw.height = H; const r = raw.getContext('2d'); r.translate(100, 0); fn(r);
    if (!blur) return (cache[key] = raw);
    const c = document.createElement('canvas'); c.width = w; c.height = H; const g = c.getContext('2d'); g.filter = `blur(${blur}px)`; g.drawImage(raw, 0, 0); return (cache[key] = c);
  }
  const put = (ctx, c, dx = 0) => ctx.drawImage(c, -100 + dx, 0);
  const union = (g, pieces, fill, lw = 4) => { for (const p of pieces) { g.beginPath(); p(g); g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(); } g.fillStyle = fill; for (const p of pieces) { g.beginPath(); p(g); g.fill(); } };

  // ---------- painter kit ----------
  function sky(g, top = '#8fc3cf', mid = '#f3e2b0', low = '#f4b98a', sun = [760, 420]) {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, top], [.45, mid], [.75, '#f7d59a'], [1, low]]); g.fillRect(-100, 0, W + 200, H);
    const r = g.createRadialGradient(sun[0], sun[1], 10, sun[0], sun[1], 420); r.addColorStop(0, 'rgba(255,250,215,.95)'); r.addColorStop(.25, 'rgba(255,236,170,.55)'); r.addColorStop(1, 'rgba(255,220,150,0)'); g.fillStyle = r; g.fillRect(-100, 0, W + 200, H);
  }
  function cloud(g, x, y, s) {
    const b = [[0, 0, 60], [55, -22, 52], [110, -4, 58], [165, 10, 40], [-55, 12, 40]];
    g.save(); g.translate(x, y); g.scale(s, s * .5);
    g.fillStyle = 'rgba(236,196,160,.75)'; b.forEach(([bx, by, r]) => { g.beginPath(); g.arc(bx, by + 14, r, 0, TAU); g.fill(); });
    g.fillStyle = 'rgba(255,248,230,.95)'; b.forEach(([bx, by, r]) => { g.beginPath(); g.arc(bx - 4, by - 2, r * .9, 0, TAU); g.fill(); });
    g.restore();
    g.save(); g.lineWidth = 3; g.strokeStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.moveTo(x - 60 * s, y + 4 * s); g.quadraticCurveTo(x + 50 * s, y - 14 * s, x + 170 * s, y + 2 * s); g.stroke(); g.restore();
  }
  function mountains(g, base, peaks, col, lit, lw = 4) {   // peaks: [[x, y], …] ; lit faces on the left (sun side)
    const sil = c => { c.moveTo(peaks[0][0] - 200, base); for (const p of peaks) c.lineTo(p[0], p[1]); c.lineTo(peaks[peaks.length - 1][0] + 200, base); c.closePath(); };
    g.fillStyle = col; g.beginPath(); sil(g); g.fill();
    g.save(); g.beginPath(); sil(g); g.clip(); g.fillStyle = lit;
    for (let i = 0; i < peaks.length; i++) { const p = peaks[i], q = peaks[i - 1] || [p[0] - 200, base]; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.lineTo(lerp(q[0], p[0], .4), base); g.lineTo(p[0] - 10, base); g.closePath(); g.fill(); }
    g.restore(); g.beginPath(); sil(g); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.stroke();
  }
  function bush(g, x, y, w, h, seed, flowers = true) {
    const r = rng(seed), P = [];
    for (let i = 0; i < 26; i++) { const a = Math.PI * (1.05 + r() * .9), d = Math.sqrt(r()); P.push([x + Math.cos(a) * w * .42 * d, y + Math.sin(a) * h * .62 * d, (w + h) * (.09 + r() * .06)]); }
    union(g, P.map(([px, py, pr]) => c => c.arc(px, py, pr, 0, TAU)), '#5f7a3a');
    g.fillStyle = '#8aa552'; for (const [px, py, pr] of P) { g.beginPath(); g.arc(px - pr * .25, py - pr * .3, pr * .55, 0, TAU); g.fill(); }
    if (flowers) for (let i = 0; i < 12; i++) { const fx = x + (r() - .5) * w * .85, fy = y - r() * h * .8; g.fillStyle = '#fffaf0'; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(fx + Math.cos(k / 5 * TAU) * 6, fy + Math.sin(k / 5 * TAU) * 6, 5, 0, TAU); g.fill(); } g.fillStyle = '#f0c040'; g.beginPath(); g.arc(fx, fy, 3.5, 0, TAU); g.fill(); }
  }
  function grass(g, x, y, n, h, seed, dark = '#3f5a2a', light = '#6f8f3f') {
    const r = rng(seed);
    for (let i = 0; i < n; i++) { const bx = x + (r() - .5) * n * 9, lean = (r() - .5) * 1.2, hh = h * (.6 + r() * .5), col = r() < .5 ? dark : light;
      g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 2.5; g.beginPath(); g.moveTo(bx - 6, y); g.quadraticCurveTo(bx + lean * hh * .3, y - hh * .6, bx + lean * hh * .6, y - hh); g.quadraticCurveTo(bx + lean * hh * .2 + 4, y - hh * .5, bx + 6, y); g.closePath(); g.fill(); g.stroke(); }
  }
  function tree(g, x, y, s) { line(g, [[x, y], [x + 6, y - 160 * s]], 22 * s); line(g, [[x, y], [x + 6, y - 160 * s]], 14 * s, '#6b4a30'); bush(g, x + 10, y - 150 * s, 260 * s, 240 * s, 31, false); }
  function column(g, x, top, bot, w) {
    shape(g, '#ead2b2', 4, rect(x - w / 2, top + 40, w, bot - top - 80));
    g.save(); g.beginPath(); g.rect(x - w / 2, top + 40, w, bot - top - 80); g.clip(); g.fillStyle = grad(g, x - w / 2, 0, x + w / 2, 0, [[0, 'rgba(255,250,235,.7)'], [.45, 'rgba(255,240,210,0)'], [1, 'rgba(120,80,60,.45)']]); g.fillRect(x - w / 2, top, w, bot - top);
    for (let i = 1; i < 6; i++) line(g, [[x - w / 2 + i * w / 6, top + 44], [x - w / 2 + i * w / 6, bot - 44]], 2.5, 'rgba(110,70,50,.35)'); g.restore();
    shape(g, '#e2c6a2', 4, rect(x - w / 2 - 16, top, w + 32, 40)); shape(g, '#e2c6a2', 4, rect(x - w / 2 - 20, bot - 40, w + 40, 40));
  }
  const lightWedge = (g, pts, a = .3, col = '255,240,205') => { g.save(); g.filter = 'blur(6px)'; g.fillStyle = `rgba(${col},${a})`; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath(); g.fill(); g.restore(); };

  // ---------- sets (cached layers) ----------
  const terraceBack = blur => layer('terrace' + blur, blur, g => {
    sky(g, '#8fc3cf', '#f3e2b0', '#f4b98a', [700, 430]);
    cloud(g, 120, 120, 1.2); cloud(g, 820, 90, .9); cloud(g, 1060, 200, .7);
    mountains(g, 560, [[-60, 360], [140, 250], [300, 330], [420, 290], [560, 380]], '#a8a576', '#c9c48c', 3.5);
    mountains(g, 560, [[860, 380], [1020, 270], [1180, 300], [1330, 220]], '#a8a576', '#c9c48c', 3.5);
    mountains(g, 560, [[-120, 450], [80, 380], [260, 430], [980, 440], [1150, 370], [1380, 410]], '#7f8a52', '#9fa865', 4);
    // terrace floor + stone balustrade
    g.fillStyle = grad(g, 0, 520, 0, H, [[0, '#d7c1a2'], [1, '#b49a7c']]); g.fillRect(-100, 520, W + 200, 200);
    for (let i = 0; i < 6; i++) line(g, [[-100, 540 + i * i * 6], [W + 100, 540 + i * i * 6]], 2, 'rgba(110,80,60,.25)');
    shape(g, '#e7d6bb', 4, rect(-100, 470, W + 200, 22));
    for (let x = -80; x < W + 100; x += 46) { shape(g, '#e2cfb1', 3.5, c => { c.moveTo(x - 10, 492); c.quadraticCurveTo(x - 18, 506, x - 8, 520); c.lineTo(x + 8, 520); c.quadraticCurveTo(x + 18, 506, x + 10, 492); c.closePath(); }); }
    shape(g, '#d9c4a5', 4, rect(-100, 518, W + 200, 14));
    tree(g, 1180, 520, 1.25); bush(g, 60, 520, 260, 110, 3);
    lightWedge(g, [[560, 0], [760, 0], [1100, 720], [700, 720]], .18);
  });
  const terraceFg = () => layer('terraceFg', 7, g => { bush(g, 40, 760, 420, 230, 7); bush(g, 1260, 780, 380, 200, 9); grass(g, 260, 730, 16, 110, 4); });
  const colonnadeBack = blur => layer('colon' + blur, blur, g => {
    g.fillStyle = grad(g, 0, 0, 0, 560, [[0, '#b99881'], [1, '#d6b79a']]); g.fillRect(-100, 0, W + 200, 560);
    for (let y = 30, r = 0; y < 560; y += 64, r++) { line(g, [[-100, y], [W + 100, y]], 3, 'rgba(90,60,45,.35)'); for (let x = -100 + (r % 2) * 90; x < W + 100; x += 180) line(g, [[x, y], [x, y + 64]], 3, 'rgba(90,60,45,.35)'); }
    shape(g, '#6e706b', 4, rect(390, 0, 500, 500)); g.fillStyle = grad(g, 0, 0, 0, 500, [[0, 'rgba(0,0,0,.25)'], [1, 'rgba(255,240,220,.1)']]); g.fillRect(390, 0, 500, 500);
    column(g, 360, -10, 520, 110); column(g, 920, -10, 520, 110);
    shape(g, '#d9c0a0', 4, rect(200, 500, 880, 34)); shape(g, '#cdb090', 4, rect(170, 530, 940, 26));
    g.fillStyle = grad(g, 0, 556, 0, H, [[0, '#b39a86'], [1, '#8e7666']]); g.fillRect(-100, 556, W + 200, 170);
    lightWedge(g, [[-100, 0], [150, 0], [520, 720], [120, 720]], .32); lightWedge(g, [[700, 0], [860, 0], [1180, 720], [880, 720]], .28);
    lightWedge(g, [[150, 0], [300, 0], [640, 720], [520, 720]], .16, '60,30,20');
    grass(g, 80, 556, 18, 90, 12); grass(g, 1200, 556, 18, 90, 13);
  });
  const colonnadeFg = () => layer('colonFg', 6, g => {
    for (const [x, s] of [[30, 1], [1250, 1]]) { shape(g, '#c9b08a', 5, rect(x - 110, 640, 220, 120, 10)); shape(g, '#e0c9a3', 4, rect(x - 120, 630, 240, 22, 6)); bush(g, x, 640, 220, 90, x + 5); }
  });
  const desk = () => layer('desk', 0, g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#6b4630'], [1, '#4a2f20']]); g.fillRect(-100, 0, W + 200, H);
    const r = rng(21); for (let i = 0; i < 40; i++) { const y = r() * H; g.strokeStyle = 'rgba(30,15,8,.25)'; g.lineWidth = 2 + r() * 3; g.beginPath(); g.moveTo(-100, y); g.bezierCurveTo(300, y + (r() - .5) * 40, 900, y + (r() - .5) * 40, W + 100, y + (r() - .5) * 20); g.stroke(); }
    lightWedge(g, [[200, 0], [700, 0], [1000, 720], [300, 720]], .14);
  });
  const arenaBack = () => layer('arena', 0, g => {
    sky(g, '#7fb5c8', '#f2dfae', '#f2b07e', [1050, 330]); cloud(g, 160, 110, 1); cloud(g, 900, 70, .8);
    const top = x => 120 + Math.pow((x - 640) / 700, 2) * 140, R = (x, t) => lerp(top(x), 600, t);
    // the curved outer wall with three arcades
    g.beginPath(); g.moveTo(-100, top(-100)); for (let x = -100; x <= W + 100; x += 20) g.lineTo(x, top(x)); g.lineTo(W + 100, 600); g.lineTo(-100, 600); g.closePath(); g.fillStyle = '#dcc0a0'; g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke();
    g.save(); g.clip(); g.fillStyle = grad(g, 0, 0, W, 0, [[0, 'rgba(255,245,220,.35)'], [.6, 'rgba(0,0,0,0)'], [1, 'rgba(90,50,40,.35)']]); g.fillRect(-100, 0, W + 200, 600); g.restore();
    for (let tier = 0; tier < 3; tier++) {
      const t0 = [.08, .38, .68][tier], t1 = t0 + .25;
      for (let x = -80; x < W + 100; x += 92) { const y0 = R(x, t0), y1 = R(x, t1), w = 56 * (1 - Math.abs(x - 640) / 1600);
        shape(g, tier === 2 ? '#3a2a24' : '#4a352c', 3.5, c => { c.moveTo(x - w / 2, y1); c.lineTo(x - w / 2, y0 + w / 2); c.arc(x, y0 + w / 2, w / 2, Math.PI, 0); c.lineTo(x + w / 2, y1); c.closePath(); });
        if (tier === 2) { g.fillStyle = 'rgba(255,220,160,.12)'; g.fillRect(x - w / 2, y0 + w / 2, w, y1 - y0 - w / 2); } }
      g.beginPath(); for (let x = -100; x <= W + 100; x += 20) g.lineTo(x, R(x, t1) + 6); g.lineWidth = 6; g.strokeStyle = 'rgba(90,60,40,.5)'; g.stroke();
    }
    g.fillStyle = grad(g, 0, 600, 0, H, [[0, '#cdb291'], [1, '#a88d70']]); g.fillRect(-100, 600, W + 200, 120); line(g, [[-100, 600], [W + 100, 600]], 5);
    lightWedge(g, [[900, 0], [1150, 0], [1300, 720], [1000, 720]], .2);
  });

  // ---------- subtitles: name tab + cream paper strip (the channel's own) ----------
  const NAMES = { Theo: '#d8433a', Marcus: '#6b3a8e' };
  function sub(ctx, who, text, lt, t0, t1) {
    if (lt < t0 || lt > t1) return;
    const k = clamp((lt - t0) / .18), out = clamp((t1 - lt) / .15), n = Math.min(text.length, Math.floor((lt - t0) * 45) + 1), shown = text.slice(0, n);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = Math.min(k, out);
    ctx.font = '600 27px Fredoka, sans-serif'; const w = ctx.measureText(text).width + 48, x = W / 2 - w / 2, y = H - 92 + (1 - ease.out(k)) * 14;
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(x + 5, y + 6, w, 48);
    shape(ctx, '#f6efdd', 3.5, rect(x, y, w, 48, 6)); ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(shown, x + 24, y + 26);
    ctx.font = '700 20px Fredoka, sans-serif'; const nw = ctx.measureText(who).width + 26;
    shape(ctx, NAMES[who] || '#444', 3, rect(x + 14, y - 22, nw, 30, 15)); ctx.fillStyle = '#fff'; ctx.fillText(who, x + 27, y - 6);
    ctx.restore();
  }
  // figure with optional depth-of-field blur
  const fig = (ctx, x, y, s, o, blur = 0) => { if (blur) { ctx.save(); ctx.filter = `blur(${blur}px)`; Gd.draw(ctx, x, y, s, o); ctx.restore(); } else Gd.draw(ctx, x, y, s, o); };
  const SUN = { x: -.55, y: -.8, rim: '#fff0c4', rimA: .65, shade: '#3a1e3a', shadeA: .34, cast: .22 };
  const theo = (o) => Object.assign({ outfit: 'roman', light: SUN }, o);
  const marcus = (o) => Object.assign({}, CAST.marcus, { light: SUN }, o);

  // ---------- shots ----------
  function s1(ctx, lt, dur, t) {   // wide: Theo strolls onto the terrace, looks around
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    put(ctx, terraceBack(0));
    const k = clamp(lt / 2.2), x = lerp(-80, 540, ease.out(k)), walking = k < 1;
    const turn = walking ? .85 : lerp(.85, lt < 3.2 ? -.4 : .1, ease.inOut(clamp((lt - 2.3) / .5)));
    fig(ctx, x, 660, .8, theo({ t, walk: walking ? lt * 7.5 : null, turn, pose: Gd.pose(lt, [[0, 'idle'], [2.4, 'hips']]), face: lt < 2.4 ? { mouth: 'smile', look: [.6, 0] } : { mouth: 'grin', brows: 'up', look: [lt < 3.2 ? -.7 : .4, -.2] }, hair: Gd.hairRing(lt - 2.2, .4) }));
    put(ctx, terraceFg(), -lt * 6);
    ctx.restore();
    FX.dateTag(ctx, 'ROME · AD 80');
    sub(ctx, 'Theo', 'Ah, Rome! Now… where is the famous vomitorium?', lt, 2.5, 4.55);
  }
  function s2(ctx, lt, dur, t) {   // two-shot at the colonnade: Marcus turns, very slowly
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1, 1.03), 640, 400);
    put(ctx, colonnadeBack(0));
    const mt = lt < .7 ? null : lerp(-1, -.5, ease.inOut(clamp((lt - .7) / 1.2)));
    fig(ctx, 860, 660, .74, marcus({ t, back: mt === null, turn: mt ?? 0, pose: 'idle', face: { eyes: 'half', mouth: 'flat', look: [-.6, 0] } }));
    fig(ctx, 420, 660, .7, theo({ t, turn: .5, pose: Gd.pose(lt, [[0, 'idle'], [2.4, 'present']]), face: lt < 2.4 ? { mouth: 'smile', brows: 'up' } : { mouth: 'grin', brows: 'up', eyes: 'happy' }, hair: Gd.hairRing(lt - 2.4, .3) }));
    put(ctx, colonnadeFg());
    ctx.restore();
    sub(ctx, 'Marcus', 'The what?', lt, 1.3, 2.3);
    sub(ctx, 'Theo', 'You know… the room where you throw up so you can keep feasting?', lt, 2.4, 4.55);
  }
  function s3(ctx, lt, dur, t) {   // over the shoulder: Theo blurred in the foreground, Marcus deadpan
    ctx.save(); T.cam(ctx, lerp(1.06, 1.1, lt / dur), 640, 380);
    put(ctx, colonnadeBack(3));
    fig(ctx, 830, 790, 1.08, marcus({ t, turn: -.45, pose: 'idle', noBlink: true, face: { eyes: (lt > 1.4 && lt < 1.62) ? 'closed' : 'half', mouth: 'flat', look: [-.5, 0] } }));
    fig(ctx, 250, 1260, 1.9, theo({ t, back: true, pose: 'idle', light: Object.assign({}, SUN, { cast: 0 }) }), 9);
    ctx.restore();
    sub(ctx, 'Marcus', '…It’s a hallway.', lt, 1.9, 3.35);
  }
  function s4(ctx, lt, dur, t) {   // MYTH CARD (the channel's signature insert)
    put(ctx, desk());
    const k = FX.settle(clamp(lt / .5)), cx = 560, cy = 340 + (1 - k) * 420;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.025 * k);
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-392, -222, 800, 460);
    shape(ctx, '#f4ecd8', 4, rect(-400, -230, 800, 460, 6));
    ctx.fillStyle = '#d8433a'; ctx.font = '46px "Luckiest Guy"'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('MYTH', -370, -180);
    ctx.fillStyle = INK; ctx.font = '700 28px Fredoka'; ctx.fillText('Romans had “vomit rooms” for feasts', -240, -178);
    line(ctx, [[-370, -148], [370, -148]], 2.5, 'rgba(0,0,0,.25)');
    // drawing: amphitheatre cross-section, a passage under the seats; the crowd flows out through it
    ctx.save(); ctx.translate(-210, 40);
    shape(ctx, '#d9c3a2', 3.5, c => { c.moveTo(-170, 120); c.lineTo(-170, 100); for (let i = 0; i < 6; i++) { c.lineTo(-170 + i * 50, 100 - i * 30); c.lineTo(-120 + i * 50, 100 - i * 30); } c.lineTo(150, -90); c.lineTo(150, 120); c.closePath(); });
    shape(ctx, '#4a352c', 3.5, c => { c.moveTo(-60, 120); c.lineTo(-60, 70); c.quadraticCurveTo(0, 30, 60, 70); c.lineTo(60, 120); c.closePath(); });
    line(ctx, [[-180, 120], [170, 120]], 4);
    const flow = clamp((lt - .9) / 1.6);
    ctx.save(); ctx.setLineDash([12, 10]); ctx.lineDashOffset = -lt * 40; line(ctx, [[-150, 60], [-20, 96], [130, 100], [200, 100]], 5, '#d8433a'); ctx.restore();
    shape(ctx, '#d8433a', 3, c => { c.moveTo(200, 86); c.lineTo(226, 100); c.lineTo(200, 114); c.closePath(); });
    for (let i = 0; i < 9; i++) { const u = ((lt * .45 + i / 9) % 1); if (u > flow) continue; const px = lerp(-150, 200, u), py = u < .37 ? lerp(60, 96, u / .37) : lerp(96, 100, (u - .37) / .63);
      shape(ctx, ['#3c5a86', '#b2342f', '#6f7a52', '#c99a3c'][i % 4], 2.5, c => c.ellipse(px, py + 6, 8, 11, 0, 0, TAU)); shape(ctx, '#fff', 2.5, circle(px, py - 10, 7)); }
    ctx.fillStyle = INK; ctx.font = '700 18px Fredoka'; ctx.textAlign = 'center'; ctx.fillText('vomitorium', 0, 150);
    ctx.restore();
    const lines = [['VOMITORIUM =', '700 26px Fredoka', 1.4], ['a passage that lets the crowd', '600 24px Fredoka', 1.7], ['“spew out” of the amphitheatre', '600 24px Fredoka', 1.9], ['Latin vomere: “to spew forth”', '600 22px Fredoka', 2.3], ['Not a room for throwing up!', '700 24px Fredoka', 2.7]];
    lines.forEach(([s, f, at], i) => { const a = clamp((lt - at) / .3); if (a <= 0) return; ctx.globalAlpha = a; ctx.font = f; ctx.fillStyle = i === 4 ? '#b2342f' : INK; ctx.textAlign = 'left'; ctx.fillText(s, 20, -96 + i * 44 + (1 - a) * 8); ctx.globalAlpha = 1; });
    FX.stamp(ctx, 'BUSTED', 250, 150, lt - 3.2, { color: '#c8322a', size: 46, rot: -.16 });
    ctx.restore();
    fig(ctx, 1110, 690, .62, theo({ t, turn: -.4, pose: Gd.pose(lt, [[0, 'idle'], [.8, 'pointSideL'], [3.3, 'cheer']]), face: lt < 3.3 ? { mouth: 'open', brows: 'up', look: [-.7, 0] } : { mouth: 'grin', eyes: 'happy', brows: 'up' }, hair: Gd.hairRing(lt - 3.3, .45), light: { x: -.6, y: -.8, rim: '#ffe9c0', cast: 0 } }));
    FX.caption(ctx, 'MYTH CARD', lt, .4, W - 40, 30);
  }
  function s5(ctx, lt, dur, t) {   // amphitheatre: the crowd pours out of the passages
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 360);
    put(ctx, arenaBack());
    const r = rng(5);
    for (let i = 0; i < 70; i++) { const gate = Math.floor(r() * 12), gx = -80 + gate * 92 + 46 * 0, sp = .25 + r() * .2, ph = r();
      const u = (lt * sp + ph) % 1, ang = (r() - .5) * 1.4, px = gx + Math.sin(ang) * u * 260, py = 560 + u * 150, s = .5 + u * .7;
      if (gx < -40 || gx > 1320) continue; ctx.save(); ctx.translate(px, py); ctx.scale(s, s);
      shape(ctx, ['#3c5a86', '#b2342f', '#6f7a52', '#c99a3c', '#e9e2d0'][i % 5], 2.5, c => c.ellipse(0, 0, 9, 14, 0, 0, TAU)); shape(ctx, '#fff', 2.5, circle(0, -20, 8)); ctx.restore(); }
    fig(ctx, 450, 720, .8, marcus({ t, turn: .3, pose: Gd.pose(lt, [[0, 'idle'], [.5, 'present']]), face: { eyes: 'half', mouth: 'smirk', brows: 'sly', look: [.6, 0] } }));
    fig(ctx, 130, 740, .74, theo({ t, turn: .5, pose: 'idle', face: { mouth: 'o', brows: 'up', eyes: 'wide', look: [.8, -.3] } }));
    ctx.restore();
    sub(ctx, 'Marcus', 'See? It spews out people. Not lunch.', lt, .5, 3.05);
  }
  function cu(who) {   // deadpan close-ups over the blurred terrace
    return (ctx, lt, dur, t) => {
      ctx.save(); T.cam(ctx, lerp(1.02, 1.06, lt / dur), 640, 360); put(ctx, terraceBack(5));
      if (who === 'theo') fig(ctx, 600, 1140, 1.95, theo({ t, turn: .15, pose: 'idle', face: { mouth: 'grin', brows: 'worried', blush: true, sweat: true, look: [.3, 0] }, light: Object.assign({}, SUN, { cast: 0 }) }));
      else fig(ctx, 690, 1140, 1.95, marcus({ t, turn: -.2, pose: 'idle', noBlink: true, face: { eyes: (lt > .7 && lt < 1.05) ? 'closed' : 'half', mouth: 'flat', look: [-.4, 0] }, light: Object.assign({}, SUN, { cast: 0 }) }));
      ctx.restore();
      if (who === 'theo') sub(ctx, 'Theo', '…I knew that.', lt, .45, 2.1); else sub(ctx, 'Marcus', 'Mm-hm.', lt, 1.2, 2.3);
    };
  }
  const shots = [[0, 4.6, s1], [4.6, 9.2, s2], [9.2, 12.6, s3], [12.6, 17.6, s4], [17.6, 20.8, s5], [20.8, 23.0, cu('theo')], [23.0, 25.4, cu('marcus')]].map(([start, end, draw]) => ({ start, end, draw }));
  G.TOON_FINISH = { grain: .03, vignette: .55 };
  G.Show = { duration: 25.4, narration: 'assets/audio/silence.mp3', shots,
    sfx: [{ t: 0, type: 'wind', gain: .25 }, { t: 12.6, type: 'paper', gain: .6 }, { t: 12.75, type: 'slide', gain: .4 }, { t: 15.8, type: 'thud', gain: .9 }, { t: 15.82, type: 'press', gain: .5 }, { t: 15.9, type: 'swell', gain: .3 }, { t: 17.6, type: 'wind', gain: .3 }, { t: 20.8, type: 'click', gain: .3 }],
    moods: [{ t: 0, mood: 'still' }, { t: 9.2, mood: 'silence' }, { t: 12.6, mood: 'under' }, { t: 17.6, mood: 'still' }, { t: 20.8, mood: 'silence' }], images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '700 20px Fredoka', '46px "Luckiest Guy"'] };
})(window);
