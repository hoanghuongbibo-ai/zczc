/* ~20 s demo: THEO's time-travel wardrobe. Each spin ends in a costume puff and a new era: layered parallax sets
 * (sky → far, blurred → mid → perspective floor → Theo → blurred foreground), era lighting on Theo (rim colour and
 * direction), drifting atmosphere (dust, petals, fog, smoke). Silent narration track; music + foley only. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, { W, H, clamp, lerp, ease, shape, rect, grad, line, circle, rng } = T;
  const INK = FX.INK, TAU = Math.PI * 2, HZ = 470;   // horizon line
  // ---------- cached layers (built once; blur = depth of field) ----------
  const cache = {};
  function layer(key, w, blur, fn) {
    if (cache[key]) return cache[key];
    const raw = document.createElement('canvas'); raw.width = w; raw.height = H; fn(raw.getContext('2d'), w);
    if (!blur) return (cache[key] = raw);
    const c = document.createElement('canvas'); c.width = w; c.height = H; const g = c.getContext('2d'); g.filter = `blur(${blur}px)`; g.drawImage(raw, 0, 0); return (cache[key] = c);
  }
  const put = (ctx, c, pan, depth, off = -160) => ctx.drawImage(c, off - pan * depth, 0);
  function floor(ctx, pan, base, lineCol, rows = 9, vxk = 1) {   // perspective floor: rows get wider toward camera, seams converge
    ctx.fillStyle = grad(ctx, 0, HZ, 0, H, [[0, T.ease ? base[0] : base[0]], [1, base[1]]]); ctx.fillRect(-200, HZ, W + 400, H - HZ + 100);
    ctx.save(); ctx.strokeStyle = lineCol; ctx.lineWidth = 2;
    for (let i = 1; i <= rows; i++) { const y = HZ + Math.pow(i / rows, 1.8) * (H - HZ + 60); ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(W + 200, y); ctx.stroke(); }
    const vpx = W / 2 - pan * .25;
    for (let k = -14; k <= 14; k++) { ctx.beginPath(); ctx.moveTo(vpx + k * 46, HZ); ctx.lineTo(W / 2 - pan * vxk + k * 220, H + 60); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle = grad(ctx, 0, HZ, 0, HZ + 80, [[0, 'rgba(255,255,255,.18)'], [1, 'rgba(255,255,255,0)']]); ctx.fillRect(-200, HZ, W + 400, 80);
  }
  // ---------- puff: the costume-change cloud ----------
  function puff(ctx, x, y, k, a = 1) {   // k 0..1 grows; a fades
    if (k <= 0 || a <= 0) return; const r = rng(4);
    ctx.save(); ctx.globalAlpha = clamp(a);
    for (let i = 0; i < 11; i++) { const ang = r() * TAU, d = (40 + r() * 120) * ease.out(k), rad = (50 + r() * 60) * ease.out(k);
      shape(ctx, i % 3 ? '#fbf7ee' : '#e9e2d3', 4, circle(x + Math.cos(ang) * d, y + Math.sin(ang) * d * .8, rad)); }
    for (let i = 0; i < 8; i++) { const ang = i / 8 * TAU, d = 200 * ease.out(k); ctx.save(); ctx.translate(x + Math.cos(ang) * d, y + Math.sin(ang) * d); ctx.rotate(ang); ctx.fillStyle = '#f6c945';
      ctx.beginPath(); for (let j = 0; j < 8; j++) { const rr = j % 2 ? 5 : 14; ctx.lineTo(Math.cos(j / 8 * TAU) * rr, Math.sin(j / 8 * TAU) * rr); } ctx.closePath(); ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); }
    ctx.restore();
  }
  // spin before a costume change: turn → back → turn → front, with speed lines
  function spin(lt, t0) { const k = clamp((lt - t0) / .5); if (k <= 0) return null; const th = ease.inOut(k) * TAU * 1.5; return { turn: Math.sin(th), back: Math.cos(th) < 0, k }; }
  function speedLines(ctx, x, y, k) { if (k <= 0 || k >= 1) return; ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI) * .8; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) { const yy = y - 60 - i * 62, a0 = k * 12 + i; ctx.beginPath(); ctx.ellipse(x, yy, 150, 26, 0, a0, a0 + 1.4); ctx.stroke(); } ctx.restore(); }

  // ---------- set layers ----------
  const SETS = {
    study: {
      sky(ctx) { ctx.fillStyle = grad(ctx, 0, 0, 0, HZ, [[0, '#e9d9b8'], [1, '#d6bf94']]); ctx.fillRect(0, 0, W, HZ); },
      far: () => layer('study-far', 1600, 1.6, (g) => {
        shape(g, '#6b4a30', 4, rect(560, 70, 480, 300, 4)); shape(g, '#efe2c2', 3, rect(578, 88, 444, 264, 2));
        g.fillStyle = '#c9b48a'; g.beginPath(); g.ellipse(700, 210, 90, 70, .3, 0, TAU); g.fill(); g.beginPath(); g.ellipse(900, 190, 70, 90, -.2, 0, TAU); g.fill();
        shape(g, '#cfe6f2', 4, rect(1120, 60, 220, 300, 4)); g.fillStyle = 'rgba(255,255,240,.6)'; g.fillRect(1130, 70, 200, 280); line(g, [[1230, 60], [1230, 360]], 5); line(g, [[1120, 210], [1340, 210]], 5);
        for (const [x, h, c] of [[200, 130, '#8e3b32'], [232, 150, '#3d5a7a'], [266, 120, '#c99a3c'], [296, 140, '#4f6b45'], [328, 125, '#8e3b32'], [360, 150, '#6b5a8a']]) shape(g, c, 3, rect(x, 330 - h, 30, h, 2));
        shape(g, '#6b4a30', 3.5, rect(180, 330, 230, 16, 2)); g.fillStyle = '#9b6a43'; g.fillRect(0, 400, 1600, 70); line(g, [[0, 400], [1600, 400]], 4);
      }),
      floor(ctx, pan) { floor(ctx, pan, ['#8a5a36', '#6a4128'], 'rgba(40,20,10,.35)', 7); },
      fg: () => layer('study-fg', 1700, 5, (g) => { shape(g, '#5a3b24', 5, rect(1290, 560, 420, 200, 10)); shape(g, '#e9dcc0', 4, rect(1330, 520, 150, 46, 4)); shape(g, '#c99a3c', 4, circle(1560, 540, 34)); }),
      light: { x: -.7, y: -.7, rim: '#fff0d0' }, shafts: true, tag: 'MEET THEO',
    },
    rome: {
      sky(ctx) { ctx.fillStyle = grad(ctx, 0, 0, 0, HZ, [[0, '#7fb7e6'], [.7, '#cfe3ef'], [1, '#f2e6c8']]); ctx.fillRect(0, 0, W, HZ); T.glow(ctx, 260, 110, 260, 'rgba(255,240,190,.9)'); },
      far: () => layer('rome-far', 1700, 3, (g) => {
        g.fillStyle = '#a9b98f'; g.beginPath(); g.moveTo(0, 420); for (let x = 0; x <= 1700; x += 100) g.lineTo(x, 360 + Math.sin(x * .006) * 40); g.lineTo(1700, 470); g.lineTo(0, 470); g.fill();
        for (const x of [180, 230, 900, 940, 1500]) { g.fillStyle = '#4f6b45'; g.beginPath(); g.ellipse(x, 340, 16, 60, 0, 0, TAU); g.fill(); }
        g.fillStyle = '#e8dcc0'; g.fillRect(1100, 300, 260, 120); for (let i = 0; i < 6; i++) g.fillRect(1110 + i * 44, 300, 16, 120); g.beginPath(); g.moveTo(1090, 300); g.lineTo(1230, 250); g.lineTo(1370, 300); g.fill();
      }),
      mid: () => layer('rome-mid', 1800, 1.2, (g) => {   // temple front: steps, columns, pediment
        const x0 = 520, x1 = 1300; g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(x0 - 20, 140, x1 - x0 + 40, 330);
        shape(g, '#efe4cb', 4, (c) => { c.moveTo(x0 - 30, 150); c.lineTo((x0 + x1) / 2, 60); c.lineTo(x1 + 30, 150); c.closePath(); });
        shape(g, '#e2d5b6', 3, (c) => { c.moveTo(x0 + 30, 140); c.lineTo((x0 + x1) / 2, 84); c.lineTo(x1 - 30, 140); c.closePath(); });
        shape(g, '#e9dcbf', 4, rect(x0 - 30, 150, x1 - x0 + 60, 36));
        for (let i = 0; i < 8; i++) { const x = x0 + i * ((x1 - x0) / 7); shape(g, '#f4ead3', 4, rect(x - 22, 186, 44, 230)); g.fillStyle = 'rgba(120,100,60,.25)'; g.fillRect(x + 6, 190, 14, 222); for (const dx of [-10, 0]) line(g, [[x + dx, 192], [x + dx, 412]], 2, 'rgba(120,100,60,.35)'); shape(g, '#e9dcbf', 3, rect(x - 28, 180, 56, 12)); }
        for (let s = 0; s < 3; s++) shape(g, s % 2 ? '#e2d5b6' : '#ebdfc4', 3.5, rect(x0 - 60 - s * 24, 416 + s * 18, x1 - x0 + 120 + s * 48, 18));
        shape(g, '#b2342f', 3, rect(300, 200, 60, 150)); shape(g, '#d4a43c', 3, circle(330, 250, 16));
      }),
      floor(ctx, pan) { floor(ctx, pan, ['#d9c9a4', '#b9a47c'], 'rgba(110,90,50,.35)', 8); },
      fg: () => layer('rome-fg', 1800, 6, (g) => { shape(g, '#f1e6cc', 6, rect(20, -20, 120, 760)); g.fillStyle = 'rgba(120,100,60,.3)'; g.fillRect(90, 0, 40, 740); shape(g, '#e7dbbd', 5, rect(0, 640, 170, 40)); }),
      light: { x: -.75, y: -.65, rim: '#fff3c9', rimA: .6, shade: '#2a1a40' }, shafts: true, motes: 'rgba(255,245,210,.85)', tag: 'ROME · 44 BC',
    },
    medieval: {
      sky(ctx) { ctx.fillStyle = grad(ctx, 0, 0, 0, HZ, [[0, '#9fb4c4'], [1, '#e2dccb']]); ctx.fillRect(0, 0, W, HZ); },
      far: () => layer('med-far', 1700, 3, (g) => {
        g.fillStyle = '#8fa086'; g.beginPath(); g.moveTo(0, 430); g.quadraticCurveTo(500, 300, 900, 380); g.quadraticCurveTo(1300, 320, 1700, 420); g.lineTo(1700, 470); g.lineTo(0, 470); g.fill();
        g.fillStyle = '#9a9890'; g.fillRect(560, 250, 160, 120); for (const x of [540, 700]) { g.fillRect(x, 210, 40, 160); g.beginPath(); g.moveTo(x - 6, 210); g.lineTo(x + 20, 170); g.lineTo(x + 46, 210); g.fill(); }
        g.fillStyle = '#b8322c'; g.fillRect(718, 150, 4, 30); g.beginPath(); g.moveTo(722, 152); g.lineTo(750, 160); g.lineTo(722, 168); g.fill();
      }),
      mid: () => layer('med-mid', 1800, 1.2, (g) => {   // timber-frame houses
        const house = (x, w, h, roof) => { shape(g, '#efe3c6', 4, rect(x, HZ - h, w, h)); g.strokeStyle = '#4a3322'; g.lineWidth = 9; g.strokeRect(x + 4, HZ - h + 4, w - 8, h - 8);
          for (let i = 1; i < 4; i++) line(g, [[x + i * w / 4, HZ - h], [x + i * w / 4, HZ]], 8, '#4a3322'); line(g, [[x, HZ - h / 2], [x + w, HZ - h / 2]], 8, '#4a3322'); line(g, [[x, HZ - h], [x + w / 4, HZ - h / 2]], 7, '#4a3322'); line(g, [[x + w, HZ - h], [x + 3 * w / 4, HZ - h / 2]], 7, '#4a3322');
          shape(g, roof, 4, (c) => { c.moveTo(x - 24, HZ - h); c.lineTo(x + w / 2, HZ - h - w * .55); c.lineTo(x + w + 24, HZ - h); c.closePath(); });
          shape(g, '#7a5a3a', 3.5, rect(x + w / 2 - 22, HZ - 80, 44, 80, 4)); shape(g, '#ffd98a', 3.5, rect(x + 22, HZ - h + 24, 36, 34)); };
        house(200, 260, 230, '#7d4a33'); house(520, 220, 270, '#5f4a3d'); house(1000, 280, 220, '#7d4a33'); house(1340, 240, 260, '#5f4a3d');
        line(g, [[760, 200], [880, 200]], 6, '#4a3322'); shape(g, '#d9c7a0', 3.5, rect(830, 206, 70, 46, 4)); g.fillStyle = '#4a3322'; g.font = '700 22px Fredoka'; g.textAlign = 'center'; g.fillText('INN', 865, 236);
        for (const [x, c] of [[930, '#b8322c'], [960, '#2f4f9a']]) { shape(g, c, 3, (cc) => { cc.moveTo(x, 260); cc.lineTo(x + 26, 260); cc.lineTo(x + 26, 330); cc.lineTo(x + 13, 316); cc.lineTo(x, 330); cc.closePath(); }); }
      }),
      floor(ctx, pan) { floor(ctx, pan, ['#a39886', '#7d7262'], 'rgba(40,30,20,.35)', 10); },
      fg: () => layer('med-fg', 1800, 6, (g) => { shape(g, '#7a5233', 6, circle(1330, 660, 120)); shape(g, '#a07850', 5, circle(1330, 660, 30)); for (let i = 0; i < 8; i++) line(g, [[1330, 660], [1330 + Math.cos(i / 8 * TAU) * 110, 660 + Math.sin(i / 8 * TAU) * 110]], 12, '#5a3b24');
        shape(g, '#8a5a36', 5, rect(110, 540, 140, 220, 16)); for (const y of [580, 700]) shape(g, '#5a5a5a', 3, rect(106, y, 148, 14)); }),
      light: { x: -.5, y: -.85, rim: '#f4f0e6', rimA: .4, shadeA: .36 }, smoke: [[655, 150]], tag: 'ENGLAND · 1350',
    },
    edo: {
      sky(ctx) { ctx.fillStyle = grad(ctx, 0, 0, 0, HZ, [[0, '#4a3f78'], [.5, '#c9708a'], [1, '#f6b878']]); ctx.fillRect(0, 0, W, HZ); T.glow(ctx, 980, 380, 300, 'rgba(255,200,140,.7)'); },
      far: () => layer('edo-far', 1700, 3, (g) => {
        g.fillStyle = '#6a6a9a'; g.beginPath(); g.moveTo(600, 470); g.lineTo(900, 190); g.quadraticCurveTo(930, 175, 960, 190); g.lineTo(1260, 470); g.fill();
        g.fillStyle = '#f4f0f8'; g.beginPath(); g.moveTo(840, 246); g.lineTo(900, 190); g.quadraticCurveTo(930, 175, 960, 190); g.lineTo(1020, 246); g.lineTo(990, 236); g.lineTo(960, 254); g.lineTo(930, 238); g.lineTo(900, 256); g.lineTo(870, 238); g.closePath(); g.fill();
      }),
      mid: () => layer('edo-mid', 1800, 1.2, (g) => {
        const house = (x, w, h) => { shape(g, '#6e4a32', 4, rect(x, HZ - h, w, h)); for (let i = 1; i < 6; i++) line(g, [[x + i * w / 6, HZ - h + 40], [x + i * w / 6, HZ]], 4, '#4a2f1e');
          shape(g, '#3a3640', 4, (c) => { c.moveTo(x - 40, HZ - h + 10); c.quadraticCurveTo(x + w / 2, HZ - h - 50, x + w + 40, HZ - h + 10); c.lineTo(x + w + 30, HZ - h + 34); c.lineTo(x - 30, HZ - h + 34); c.closePath(); });
          shape(g, '#2f4f7a', 3.5, rect(x + w * .3, HZ - h + 44, w * .4, 70)); for (let i = 1; i < 4; i++) line(g, [[x + w * .3 + i * w * .1, HZ - h + 50], [x + w * .3 + i * w * .1, HZ - h + 114]], 2, '#f4f0ea'); };
        house(160, 300, 250); house(1180, 320, 270);
      }),
      floor(ctx, pan) { floor(ctx, pan, ['#c79f78', '#9a7652'], 'rgba(80,50,30,.25)', 6); },
      fg: () => layer('edo-fg', 1800, 5, (g) => { line(g, [[1700, -20], [1300, 120], [1100, 90]], 26, '#4a2f2a'); line(g, [[1420, 80], [1380, 200]], 14, '#4a2f2a');
        const r = rng(7); for (let i = 0; i < 60; i++) { const x = 1100 + r() * 600, y = -20 + r() * 240; shape(g, i % 2 ? '#f6c3d3' : '#f9d9e3', 2, circle(x, y, 14 + r() * 10)); } }),
      light: { x: .7, y: -.6, rim: '#ffbf80', rimA: .7, shade: '#2a1840', shadeA: .38 }, lanterns: [[470, 210], [1150, 230]], petals: true, tag: 'EDO JAPAN · 1820',
    },
    london: {
      sky(ctx) { ctx.fillStyle = grad(ctx, 0, 0, 0, HZ, [[0, '#2a3348'], [1, '#6c7488']]); ctx.fillRect(0, 0, W, HZ); },
      far: () => layer('lon-far', 1700, 3, (g) => {
        g.fillStyle = '#3d4458'; for (let x = 0; x < 1700; x += 120) { const h = 160 + (x * 7 % 90); g.fillRect(x, HZ - h, 110, h); g.fillRect(x + 20, HZ - h - 40, 16, 40); g.fillRect(x + 70, HZ - h - 30, 14, 30); }
        g.fillRect(1180, 90, 70, 380); g.beginPath(); g.moveTo(1170, 90); g.lineTo(1215, 20); g.lineTo(1260, 90); g.fill(); g.fillStyle = '#f1d9a0'; g.beginPath(); g.arc(1215, 130, 24, 0, TAU); g.fill();
      }),
      mid: () => layer('lon-mid', 1800, 1.2, (g) => {
        shape(g, '#8a4a3a', 4, rect(-20, 120, 760, 350)); shape(g, '#7a3f31', 4, rect(1040, 140, 800, 330));
        g.strokeStyle = 'rgba(40,10,5,.35)'; g.lineWidth = 2; for (let y = 130; y < 470; y += 16) { g.beginPath(); g.moveTo(-20, y); g.lineTo(740, y); g.moveTo(1040, y); g.lineTo(1840, y); g.stroke(); }
        for (const [x0, n] of [[30, 4], [1090, 4]]) for (let i = 0; i < n; i++) for (const y of [170, 300]) { shape(g, '#3a2a24', 4, rect(x0 + i * 170, y, 90, 100, 3)); shape(g, (i + y) % 3 ? '#ffd48a' : '#59607a', 3, rect(x0 + i * 170 + 8, y + 8, 74, 84)); line(g, [[x0 + i * 170 + 45, y + 8], [x0 + i * 170 + 45, y + 92]], 3, '#3a2a24'); }
      }),
      floor(ctx, pan) { floor(ctx, pan, ['#4e5466', '#2f3444'], 'rgba(10,10,20,.45)', 11); },
      fg: () => layer('lon-fg', 1800, 5, (g) => { shape(g, '#1d2230', 5, rect(1330, -20, 40, 760)); shape(g, '#1d2230', 4, rect(1290, 80, 120, 20)); shape(g, '#ffe3a0', 4, rect(1300, 100, 100, 70, 6)); }),
      light: { x: .8, y: -.5, rim: '#ffd28a', rimA: .7, shade: '#0d1430', shadeA: .45 }, gaslamp: [1080, 250], fog: true, tag: 'LONDON · 1888',
    },
  };

  function scene(ctx, key, lt, dur, t, theo) {
    const S = SETS[key], pan = lerp(-40, 50, ease.sine(clamp(lt / dur))), z = lerp(1, 1.05, ease.sine(clamp(lt / dur)));
    ctx.save(); T.cam(ctx, z, 640, 380);
    S.sky(ctx);
    put(ctx, S.far(), pan, .15);
    if (S.mid) put(ctx, S.mid(), pan, .5);
    if (S.smoke) for (const [x, y] of S.smoke) for (let i = 0; i < 5; i++) { const k = ((t * .25 + i / 5) % 1); ctx.save(); ctx.globalAlpha = .35 * (1 - k); ctx.fillStyle = '#e8e4dc'; ctx.beginPath(); ctx.arc(x - 160 - pan * .15 + k * 60, y - k * 120, 10 + k * 26, 0, TAU); ctx.fill(); ctx.restore(); }
    if (S.lanterns) for (const [x, y] of S.lanterns) { const a = FX.pendulum(t, .06, 60, .05), lx = x - 160 - pan * .5; ctx.save(); ctx.translate(lx, y - 40); ctx.rotate(a); line(ctx, [[0, 0], [0, 40]], 3); T.glow(ctx, 0, 76, 90, 'rgba(255,170,90,.55)'); shape(ctx, '#d8433a', 4, T.ellipse(0, 76, 28, 38)); for (const dy of [-18, 0, 18]) line(ctx, [[-26, 76 + dy], [26, 76 + dy]], 2, 'rgba(0,0,0,.3)'); shape(ctx, '#2a2a2a', 3, rect(-12, 34, 24, 8)); ctx.restore(); }
    S.floor(ctx, pan);
    if (S.gaslamp) { const [x, y] = S.gaslamp, lx = x - 160 - pan * .5; T.glow(ctx, lx, y, 220, 'rgba(255,210,140,.5)'); shape(ctx, '#1d2230', 4, rect(lx - 6, y, 12, HZ - y + 40)); shape(ctx, '#ffe3a0', 4, rect(lx - 20, y - 46, 40, 46, 4)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.filter = 'blur(14px)'; ctx.globalAlpha = .3; ctx.fillStyle = grad(ctx, 0, HZ + 40, 0, H, [[0, '#ffd28a'], [1, 'rgba(0,0,0,0)']]); ctx.beginPath(); ctx.ellipse(lx, HZ + 140, 34, 130, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    if (S.shafts) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .12; ctx.fillStyle = grad(ctx, 200, 0, 700, 700, [[0, '#fff3d0'], [1, 'rgba(0,0,0,0)']]); ctx.beginPath(); ctx.moveTo(140 - pan * .3, -40); ctx.lineTo(380 - pan * .3, -40); ctx.lineTo(980, 760); ctx.lineTo(560, 760); ctx.fill(); ctx.restore(); }
    // THEO in the world plane (depth 1)
    theo(ctx, 640 - pan, 660, S.light);
    if (S.motes) T.dust(ctx, t, c => c.rect(0, 0, W, H), [0, 0, W, H], 50, 5, S.motes);
    if (S.petals) { const r = rng(11); for (let i = 0; i < 26; i++) { const sp = 40 + r() * 50, x = ((r() * 1500 - t * sp * .7) % 1500 + 1500) % 1500 - 100, y = ((r() * 800 + t * sp) % 800) - 40, a = t * (1 + r() * 2) + i; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(1, .5 + .5 * Math.abs(Math.sin(a))); shape(ctx, '#f7c6d6', 2, T.ellipse(0, 0, 8, 5)); ctx.restore(); } }
    put(ctx, S.fg(), pan, 1.5, -120);
    if (S.fog) for (let i = 0; i < 3; i++) { const x = ((t * (14 + i * 8) + i * 400) % 1800) - 400; ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#c9d1e0'; ctx.filter = 'blur(30px)'; ctx.beginPath(); ctx.ellipse(x, 560 + i * 50, 420, 50, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    ctx.restore();
    // atmospheric perspective: a light haze over the far half (sells the depth)
    FX.dateTag(ctx, S.tag);
  }

  // one era shot: puff-out reveal at the start, an action, then a spin + puff at the end
  function eraShot(key, outfit, hat, keys, faceFn, opts = {}) {
    return (ctx, lt, dur, t) => scene(ctx, key, lt, dur, t, (c, x, y, light) => {
      const sp = opts.noSpin ? null : spin(lt, dur - .62);
      const o = { t, outfit, hat, pose: Gd.pose(lt, keys), face: faceFn(lt), turn: sp ? sp.turn : (opts.turn || 0), back: sp ? sp.back : false, light,
        hair: Gd.hairRing(lt - .25, .4) + (sp ? Gd.hairRing(lt - dur + .2, .5) : 0) };
      if (sp) speedLines(c, x, y, sp.k);
      Gd.draw(c, x, y, .82, o);
      if (lt < .4 && !opts.noPuffIn) puff(c, x, y - 230, 1, 1 - lt / .4);
      if (!opts.noSpin) puff(c, x, y - 230, clamp((lt - (dur - .25)) / .25), 1);
    });
  }
  const happy = { mouth: 'grin', eyes: 'happy', brows: 'up' };
  const shots = [
    [0, 3.6, eraShot('study', 'suit', null, [[0, 'idle'], [.5, 'wave'], [1.9, 'present']], lt => lt < .5 ? { mouth: 'smile' } : lt < 1.9 ? happy : { mouth: 'grin', brows: 'up', look: [.6, 0] }, { noPuffIn: true })],
    [3.6, 6.8, eraShot('rome', 'roman', null, [[0, 'presentBoth'], [1.3, 'pointUp']], lt => lt < 1.3 ? happy : { mouth: 'o', brows: 'up', look: [.4, -.8] })],
    [6.8, 10.0, eraShot('medieval', 'medieval', 'hood', [[0, 'hips'], [1.4, 'thumbsUp']], lt => lt < 1.4 ? { mouth: 'grin', brows: 'sly' } : { mouth: 'smile', eyes: 'wink', brows: 'sly' })],
    [10.0, 13.2, eraShot('edo', 'edo', 'kasa', [[0, 'idle'], [.5, 'bow'], [1.7, 'present']], lt => lt > .5 && lt < 1.7 ? { mouth: 'smile', eyes: 'happy' } : { mouth: 'grin', brows: 'up', look: [.5, 0] })],
    [13.2, 16.4, eraShot('london', 'victorian', 'topHat', [[0, 'idle'], [.5, 'magnify'], [1.8, 'magnify']], lt => lt < 1.8 ? { mouth: 'flat', brows: 'skeptic', eyes: 'squint', look: [.8, -.2] } : { mouth: 'smirk', brows: 'sly', look: [.3, 0] }, { turn: .4 })],
    [16.4, 20.4, lineup],
  ].map(([start, end, draw]) => ({ start, end, draw }));
  // the magnify pose needs the prop: patch the London shot's figure via a pose-prop default
  Gd.POSES.magnify.prop = 'magnifier';

  function lineup(ctx, lt, dur, t) {   // all seven outfits pop in on a stage under spotlights
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#2b2340'], [1, '#14101e']]); ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = grad(ctx, 0, 520, 0, H, [[0, '#4a3a5a'], [1, '#231a30']]); ctx.fillRect(0, 520, W, 200);
    for (let i = 0; i < 9; i++) line(ctx, [[i * 160, 520], [i * 160 - 120 + i * 30, 720]], 2, 'rgba(255,255,255,.08)');
    const L = [['roman', 'laurel'], ['medieval', 'feltCap'], ['edo', 'kasa'], ['suit', null], ['victorian', 'flatCap'], ['egypt', 'nemes'], ['explorer', 'pith']];
    const order = [3, 2, 4, 1, 5, 0, 6];
    L.forEach(([o, h], i) => {
      const t0 = .2 + order.indexOf(i) * .22, k = clamp((lt - t0) / .5), x = 120 + i * 173, y = 640;
      if (k <= 0) return;
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .22 * k; ctx.fillStyle = grad(ctx, 0, 0, 0, 700, [[0, '#fff2c8'], [1, 'rgba(0,0,0,0)']]); ctx.beginPath(); ctx.moveTo(x - 20, 0); ctx.lineTo(x + 20, 0); ctx.lineTo(x + 110, y + 20); ctx.lineTo(x - 110, y + 20); ctx.fill(); ctx.restore();
      ctx.save(); ctx.globalAlpha = .4 * k; ctx.fillStyle = '#fff2c8'; ctx.beginPath(); ctx.ellipse(x, y, 100, 18, 0, 0, TAU); ctx.fill(); ctx.restore();
      const h0 = FX.dropBounce(lt - t0, 140, .3);
      Gd.draw(ctx, x, y - h0, .56, { t: t + i, outfit: o, hat: h, pose: i === 3 ? Gd.pose(lt, [[0, 'idle'], [2.0, 'cheer']]) : ['pointUp', 'hips', 'bow', 'idle', 'thumbsUp', 'crossed', 'wave'][i],
        face: i === 3 && lt > 2 ? { mouth: 'grin', eyes: 'happy', brows: 'up' } : { mouth: i === 2 ? 'smile' : 'grin', eyes: i === 2 ? 'happy' : 'open', brows: 'up', look: [(3 - i) * .2, 0] }, turn: (3 - i) * .12, hair: Gd.hairRing(lt - t0 - .3, .5),
        light: { x: 0, y: -1, rim: '#fff2c8', rimA: .7, cast: 0 } });
    });
    const k = FX.settle(clamp((lt - 2.0) / .45));
    if (k > 0) { ctx.save(); ctx.translate(640, 100); ctx.scale(k, k); FX.bigText(ctx, 'ONE GUIDE. EVERY ERA.', 0, 0, 64, { color: '#f6c945' }); ctx.restore(); }
  }
  G.Show = { duration: 20.4, narration: 'assets/audio/silence.mp3', shots,
    sfx: [].concat(...[3.6, 6.8, 10.0, 13.2].map(c => [{ t: c - .62, type: 'whoosh', gain: .7 }, { t: c - .2, type: 'swell', gain: .35 }, { t: c, type: 'hit', gain: .45 }, { t: c + .05, type: 'click', gain: .6 }]),
      [{ t: .5, type: 'click', gain: .4 }, { t: 10.5, type: 'slide', gain: .3 }, { t: 13.7, type: 'slide', gain: .35 }], [0, 1, 2, 3, 4, 5, 6].map(i => ({ t: 16.6 + i * .22, type: 'thud', gain: .45 })), [{ t: 18.4, type: 'boom', gain: .5 }]),
    moods: [{ t: 0, mood: 'still' }, { t: 3.6, mood: 'under' }, { t: 10.0, mood: 'mystery' }, { t: 13.2, mood: 'tense' }, { t: 16.4, mood: 'under' }], images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '700 22px Fredoka', '40px "Luckiest Guy"'] };
})(window);
