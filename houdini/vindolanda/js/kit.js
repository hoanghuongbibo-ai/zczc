/* Vindolanda episode kit, part 1: timing helpers, figures, crowds, paper graphics (cards, quote cards, counters,
 * labels, Myth Card, the "Somebody wrote that down" sting), tablets, weather. Everything is a pure function of time. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, VC = G.VCast, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2;
  Gd.setTheme('warm');
  // overshoot easings can dip a hair below zero: never hand the canvas a negative radius
  const CP = CanvasRenderingContext2D.prototype, A0 = CP.arc, E0 = CP.ellipse;
  if (!CP.__safeR) { CP.__safeR = true; CP.arc = function (x, y, r, a, b, cc) { return A0.call(this, x, y, Math.max(0, r), a, b, cc); }; CP.ellipse = function (x, y, rx, ry, rot, a, b, cc) { return E0.call(this, x, y, Math.max(0, rx), Math.max(0, ry), rot, a, b, cc); }; }
  const FONT = (w, px) => `${w} ${px}px Fredoka, sans-serif`, DISP = px => `${px}px "Luckiest Guy", Fredoka, sans-serif`;
  const txt = (ctx, s, x, y, font, col = OUT, align = 'left', base = 'middle') => { ctx.font = font; ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(s, x, y); };
  const pop = (lt, t0, d = .35) => FX.settle(clamp((lt - t0) / d));   // overshoot-and-settle scale for pop-ins
  const fadeIn = (lt, t0, d = .3) => clamp((lt - t0) / d);
  // narration loudness → mouth (Theo presenting to camera)
  const vtalk = (t) => { const e = G.VENV; if (!e) return 0; const i = t * e.fps, a = e.v[Math.floor(i)] || 0, b = e.v[Math.floor(i) + 1] || 0; return clamp(((a + (b - a) * (i % 1)) - .14) * 1.5); };

  // ---------- figures ----------
  function fig(ctx, x, y, s, o, blur = 0) { ctx.save(); if (blur) ctx.filter = `blur(${blur}px)`; Gd.draw(ctx, x, y, s, o); ctx.restore(); }
  const cast = (name, o) => Object.assign({}, VC[name] || {}, o, { look: Object.assign({}, (VC[name] || {}).look, o && o.look) });
  const LIGHT = { warm: { x: -.6, y: -.8, rim: '#ffe2a8', rimA: .7, shade: '#4a2030', shadeA: .3, cast: .18 }, grey: { x: -.4, y: -.9, rim: '#e8eef4', rimA: .45, shade: '#1a2030', shadeA: .34, cast: .1 },
    night: { x: .6, y: -.6, rim: '#ffc070', rimA: .8, shade: '#10102a', shadeA: .45, cast: .12 }, dusk: { x: .7, y: -.5, rim: '#ffb070', rimA: .75, shade: '#2a1030', shadeA: .4, cast: .18 } };

  // ---------- refined mini people for crowds (walk cycle, arm swing, face) ----------
  const SKINS = ['#fcd8bd', '#f2c09a', '#e3ab83', '#c98f66', '#a8714c', '#7e5236'], HAIRS = ['#3d2416', '#1f1712', '#6b4226', '#b98a4e', '#a8642e', '#8a8a8a'];
  const CLOTH = ['#a8392f', '#3c5a86', '#6f7a52', '#c99a3c', '#e6dcc4', '#8a4f9a', '#d97a3a', '#4f7a3c'];
  function mini(ctx, x, y, s, t, o = {}) {
    const ph = o.ph || 0, walk = o.walk ?? 0, sw = Math.sin(t * 7 + ph) * walk, bob = Math.abs(Math.sin(t * 7 + ph)) * 2.5 * walk, dir = o.dir || 1;
    ctx.save(); ctx.translate(x, y - bob); ctx.scale(s * dir, s);
    ln(ctx, [[-6, -20], [-6 - sw * 6, 0]], 7); ln(ctx, [[-6, -20], [-6 - sw * 6, 0]], 4, o.legs || '#6b5040'); ln(ctx, [[6, -20], [6 + sw * 6, 0]], 7); ln(ctx, [[6, -20], [6 + sw * 6, 0]], 4, o.legs || '#6b5040');
    const body = o.mail ? '#9aa1ac' : (o.cloth || CLOTH[0]);
    ln(ctx, [[-12, -44], [-16 + sw * 7, -24]], 7); ln(ctx, [[-12, -44], [-16 + sw * 7, -24]], 4, body);
    sh(ctx, body, 2.5, c => { c.moveTo(-13, -16); c.quadraticCurveTo(-15, -46, 0, -50); c.quadraticCurveTo(15, -46, 13, -16); c.closePath(); });
    if (o.mail) { sh(ctx, o.cloth || '#a8392f', 2, c => c.rect(-13, -20, 26, 5)); ctx.fillStyle = 'rgba(40,44,52,.35)'; for (let yy = -44; yy < -20; yy += 5) for (let xx = -10; xx < 10; xx += 5) ctx.fillRect(xx, yy, 2, 2); }
    if (o.wave) { const a = Math.sin(t * 9 + ph) * .5; ln(ctx, [[12, -44], [22 + a * 8, -64]], 7); ln(ctx, [[12, -44], [22 + a * 8, -64]], 4, body); }
    else { ln(ctx, [[12, -44], [16 - sw * 7, -24]], 7); ln(ctx, [[12, -44], [16 - sw * 7, -24]], 4, body); }
    sh(ctx, o.skin || SKINS[0], 2.5, circ(0, -62, 12));
    if (o.helmet) { sh(ctx, '#b3b9c1', 2.5, c => c.arc(0, -64, 13, Math.PI, TAU)); sh(ctx, '#d0a548', 1.5, c => c.rect(-13, -66, 26, 3)); }
    else sh(ctx, o.hair || HAIRS[0], 0, c => c.arc(0, -65, 12, Math.PI * 1.05, Math.PI * 1.95));
    ctx.fillStyle = OUT; ctx.beginPath(); ctx.arc(3, -61, 1.6, 0, TAU); ctx.arc(-3, -61, 1.6, 0, TAU); ctx.fill();
    if (o.shield) sh(ctx, '#3c5a86', 2, c => c.ellipse(-12, -32, 7, 13, 0, 0, TAU));
    if (o.spear) { ln(ctx, [[15, 2], [15, -78]], 2.5, '#7a5233'); sh(ctx, '#c9c2b0', 1.2, c => { c.moveTo(15, -84); c.lineTo(12, -76); c.lineTo(18, -76); c.closePath(); }); }
    if (o.carry) sh(ctx, '#c9a46a', 2, c => c.roundRect(-10, -86, 20, 16, 3));
    ctx.restore();
  }
  // a column of soldiers marching across (ix seeds the look)
  function march(ctx, t, y, n, speed, s, o = {}) { const r = rng(o.seed || 3); for (let i = 0; i < n; i++) { const u = ((t * speed + i / n) % 1), dir = o.dir || 1, x = dir > 0 ? lerp(-120, W + 120, u) : lerp(W + 120, -120, u);
    mini(ctx, x + (o.dx || 0), y + (r() - .5) * 6, s, t, { walk: 1, ph: i, dir, mail: true, helmet: true, shield: true, spear: r() < .7, skin: SKINS[Math.floor(r() * 6)], cloth: '#a8392f' }); } }

  // ---------- paper graphics ----------
  function paper(ctx, x, y, w, h, o = {}) {   // a warm paper card with drop shadow (centre x,y)
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.scale) ctx.scale(o.scale, o.scale);
    ctx.fillStyle = 'rgba(40,20,8,.35)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 7, -h / 2 + 9, w, h, 10); ctx.fill();
    sh(ctx, o.fill || '#f7eedb', 4, c => c.roundRect(-w / 2, -h / 2, w, h, 10));
    ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 10); ctx.clip(); const r = rng(o.seed || 4); ctx.fillStyle = 'rgba(160,120,70,.06)'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-w / 2 + r() * w, -h / 2 + r() * h, 10 + r() * 30, 0, TAU); ctx.fill(); } ctx.restore();
    if (o.draw) o.draw(ctx);
    ctx.restore();
  }
  // quote card: a paper strip that types the line on, with a source tag
  function quote(ctx, lt, t0, text, source, o = {}) {
    const k = pop(lt, t0, .4); if (k <= 0) return; const lines = wrap(ctx, text, FONT(700, o.size || 34), o.w || 820), lh = (o.size || 34) * 1.3, h = lines.length * lh + 90, n = Math.floor((lt - t0 - .2) * 38);
    paper(ctx, o.x ?? W / 2, o.y ?? H / 2, (o.w || 820) + 80, h, { rot: o.rot ?? -.015, scale: k, draw: c => {
      let used = 0; lines.forEach((l, i) => { const show = l.slice(0, Math.max(0, n - used)); used += l.length; txt(c, show, -(o.w || 820) / 2, -h / 2 + 46 + i * lh, FONT(700, o.size || 34), o.col || OUT); });
      if (source && n > text.length) txt(c, '— ' + source, (o.w || 820) / 2, h / 2 - 26, FONT(600, 20), '#8a5a3a', 'right');
      txt(c, '“', -(o.w || 820) / 2 - 30, -h / 2 + 40, DISP(60), '#d8433a', 'left');
    } });
  }
  function wrap(ctx, text, font, maxW) { ctx.font = font; const words = text.split(' '), out = []; let cur = ''; for (const w of words) { const tst = cur ? cur + ' ' + w : w; if (ctx.measureText(tst).width > maxW && cur) { out.push(cur); cur = w; } else cur = tst; } if (cur) out.push(cur); return out; }
  // big animated number with a label tag
  function counter(ctx, x, y, from, to, lt, t0, d, label, o = {}) {
    const k = clamp((lt - t0) / d); if (lt < t0 - .2) return; const v = Math.round(lerp(from, to, ease.out(k))), s = pop(lt, t0 - .2, .35);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); FX.bigText(ctx, (o.prefix || '') + v.toLocaleString('en-US') + (o.suffix || ''), 0, 0, o.size || 90, { color: o.color || '#f6c945' });
    if (label) { ctx.font = FONT(700, 24); const w = ctx.measureText(label).width + 30; sh(ctx, o.tag || '#f7eedb', 3, c => c.roundRect(-w / 2, (o.size || 90) * .55, w, 40, 10)); txt(ctx, label, 0, (o.size || 90) * .55 + 21, FONT(700, 24), OUT, 'center'); }
    ctx.restore();
  }
  // a pop-in label (paper tag) — e.g. on-screen text from the script
  function tag(ctx, text, x, y, lt, t0, o = {}) { const k = pop(lt, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k, k); ctx.font = FONT(700, o.size || 26); const w = ctx.measureText(text).width + 34, h = (o.size || 26) * 1.7;
    ctx.fillStyle = 'rgba(40,20,8,.3)'; ctx.fillRect(-w / 2 + 4, -h / 2 + 5, w, h); sh(ctx, o.fill || '#f7eedb', 3.5, c => c.roundRect(-w / 2, -h / 2, w, h, 8)); txt(ctx, text, 0, 1, FONT(700, o.size || 26), o.col || OUT, 'center'); ctx.restore(); }
  function title(ctx, text, lt, t0, o = {}) { const k = pop(lt, t0, .45); if (k <= 0) return; ctx.save(); ctx.translate(o.x ?? W / 2, o.y ?? 120); ctx.scale(k, k); ctx.rotate(o.rot || 0); FX.bigText(ctx, text, 0, 0, o.size || 64, { color: o.color || '#f6c945' }); ctx.restore(); }
  function bubble(ctx, text, x, y, lt, t0, o = {}) { const k = pop(lt, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = FONT(700, o.size || 26); const w = ctx.measureText(text).width + 40, h = (o.size || 26) * 1.9;
    sh(ctx, '#fffaf0', 3.5, c => { c.roundRect(-w / 2, -h / 2, w, h, h / 2); c.moveTo(-10 + (o.tail || 0), h / 2 - 2); c.lineTo(-24 + (o.tail || 0) * 1.6, h / 2 + 22); c.lineTo(10 + (o.tail || 0), h / 2 - 2); }); txt(ctx, text, 0, 1, FONT(700, o.size || 26), OUT, 'center'); ctx.restore(); }
  function cross(ctx, x, y, s, lt, t0) { const k = clamp((lt - t0) / .25); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; for (const [a, b, kk] of [[[-1, -1], [1, 1], Math.min(1, k * 2)], [[1, -1], [-1, 1], Math.max(0, k * 2 - 1)]]) { if (kk <= 0) continue; ctx.beginPath(); ctx.moveTo(a[0] * s, a[1] * s); ctx.lineTo(lerp(a[0], b[0], kk) * s, lerp(a[1], b[1], kk) * s); ctx.lineWidth = s * .28; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = s * .18; ctx.strokeStyle = '#d8433a'; ctx.stroke(); } ctx.restore(); }
  function tick(ctx, x, y, s, lt, t0) { const k = clamp((lt - t0) / .3); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.beginPath(); const pts = [[-1, 0], [-.3, .7], [1.1, -.9]], L = k * 2; ctx.moveTo(pts[0][0] * s, pts[0][1] * s); if (L < 1) ctx.lineTo(lerp(pts[0][0], pts[1][0], L) * s, lerp(pts[0][1], pts[1][1], L) * s); else { ctx.lineTo(pts[1][0] * s, pts[1][1] * s); ctx.lineTo(lerp(pts[1][0], pts[2][0], L - 1) * s, lerp(pts[1][1], pts[2][1], L - 1) * s); }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = s * .32; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = s * .2; ctx.strokeStyle = '#3f9a4f'; ctx.stroke(); ctx.restore(); }

  // ---------- the leaf tablet ----------
  function tablet(ctx, x, y, w, h, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.scale) ctx.scale(o.scale, o.scale);
    if (o.glow) T.glow(ctx, 0, 0, w * .9, `rgba(255,220,150,${o.glow})`);
    const edge = c => { if (o.worn) { const r = rng(o.seed || 3); c.moveTo(-w / 2, -h / 2); for (let i = 0; i <= 12; i++) c.lineTo(-w / 2 + i * w / 12, -h / 2 + (i % 12 ? r() * 8 : 0)); for (let i = 0; i <= 8; i++) c.lineTo(w / 2 - (i % 8 ? r() * 8 : 0), -h / 2 + i * h / 8); for (let i = 12; i >= 0; i--) c.lineTo(-w / 2 + i * w / 12, h / 2 - (i % 12 ? r() * 8 : 0)); for (let i = 8; i >= 0; i--) c.lineTo(-w / 2 + (i % 8 ? r() * 8 : 0), -h / 2 + i * h / 8); c.closePath(); } else c.roundRect(-w / 2, -h / 2, w, h, 6); };
    sh(ctx, o.wood || '#6b4a2e', 4, edge);
    ctx.save(); ctx.beginPath(); edge(ctx); ctx.clip();
    const r = rng(o.seed || 5); ctx.strokeStyle = 'rgba(40,24,12,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { const yy = -h / 2 + r() * h; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.bezierCurveTo(-w / 6, yy + (r() - .5) * 8, w / 6, yy + (r() - .5) * 8, w / 2, yy + (r() - .5) * 6); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,220,170,.12)'; ctx.fillRect(-w / 2, -h / 2, w, h * .3);
    ln(ctx, [[0, -h / 2], [0, h / 2]], 2.5, 'rgba(30,18,8,.55)');
    const ink = o.ink ?? .85;
    if (ink > 0) { ctx.globalAlpha = ink; const rr = rng(o.seed || 5); ctx.lineCap = 'round';
      const rows = o.rows || 5;
      for (const side of [-1, 1]) for (let l = 0; l < rows; l++) {
        const rough = o.handChange != null && side > 0 && l >= rows - 2, reveal = o.reveal ?? 1; if ((side < 0 ? l : rows + l) / (rows * 2) > reveal) continue;
        ctx.strokeStyle = rough ? (o.roughCol || '#2a1408') : '#1a120c'; ctx.lineWidth = rough ? 3.4 : 2.6;
        let px = side < 0 ? -w / 2 + 14 : 14; const py = -h / 2 + 18 + l * (h - 30) / rows; ctx.beginPath(); ctx.moveTo(px, py);
        while (px < (side < 0 ? -14 : w / 2 - 14) - 6) { const nx = px + (rough ? 9 + rr() * 12 : 6 + rr() * 8); ctx.quadraticCurveTo((px + nx) / 2, py - (rough ? 10 : 6) + rr() * (rough ? 20 : 12), nx, py + (rr() - .5) * (rough ? 9 : 4)); px = nx; } ctx.stroke(); }
      if (o.handChange != null && o.handChange > 0) { ctx.globalAlpha = o.handChange; ctx.strokeStyle = '#f6c945'; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.strokeRect(6, -h / 2 + 18 + (rows - 2) * (h - 30) / rows - 16, w / 2 - 14, (h - 30) / rows * 2 + 4); ctx.setLineDash([]); }
    }
    if (o.ir) { ctx.globalAlpha = 1; ctx.fillStyle = `rgba(20,10,5,${.85 * (1 - o.ir)})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
    ctx.restore(); ctx.restore();
  }
  // ---------- signature beats ----------
  // MYTH CARD: myth line, fact lines, stamp; Theo points from the side (pass theo:false to skip)
  function mythCard(ctx, lt, t, o) {
    P.sh(ctx, null, 0, c => c); ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#7a4e33'], [1, '#4f3121']]); ctx.fillRect(0, 0, W, H);
    const r = rng(21); for (let i = 0; i < 40; i++) { const y = r() * H; ctx.strokeStyle = 'rgba(40,18,8,.25)'; ctx.lineWidth = 2 + r() * 3; ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(400, y + (r() - .5) * 40, 900, y + (r() - .5) * 40, W, y + (r() - .5) * 20); ctx.stroke(); }
    beam(ctx, [[180, 0], [560, 0], [980, 720], [420, 720]], .2); P.motes(ctx, t, 30, 9, [150, 0, 800, 720]);
    const k = FX.settle(clamp(lt / .5)), cy = 330 + (1 - k) * 420;
    paper(ctx, 540, cy, 840, 470, { rot: -.02 * k, draw: c => {
      txt(c, o.head || 'MYTH', -390, -190, DISP(48), o.headCol || '#d8433a'); const hw = (c.font = DISP(48), c.measureText(o.head || 'MYTH').width);
      wrap(c, o.myth, FONT(700, 28), 600 - hw).forEach((l, i) => txt(c, l, -370 + hw, -192 + i * 32, FONT(700, 28)));
      ln(c, [[-390, -140], [390, -140]], 2.5, 'rgba(60,30,10,.25)');
      (o.lines || []).forEach(([s, at, col, size], i) => { const a = fadeIn(lt, at); if (a <= 0) return; c.globalAlpha = a; wrap(c, s, FONT(i === 0 ? 700 : 600, size || 27), 740).forEach((l, j) => txt(c, l, -370, -100 + i * 52 + j * 30 + (1 - a) * 8, FONT(i === 0 ? 700 : 600, size || 27), col || OUT)); c.globalAlpha = 1; });
      if (o.stamp) FX.stamp(c, o.stamp, 260, 160, lt - o.stampAt, { color: o.stampCol || '#c8322a', size: 46, rot: -.16 });
      if (o.draw) o.draw(c, lt);
    } });
    if (o.theo !== false) { const hop = lt > o.stampAt ? Math.max(0, Math.sin((lt - o.stampAt) * 8) * 18 * Math.exp(-(lt - o.stampAt) * 3)) : 0;
      fig(ctx, 1120, 700 - hop, .62, Object.assign({ t, turn: -.4, pose: Gd.pose(lt, [[0, 'idle'], [.6, 'pointSideL'], [o.stampAt + .1, 'cheer']]), hair: Gd.hairRing(lt - o.stampAt, .5), talk: vtalk(t) * .8,
        face: lt < o.stampAt ? { mouth: 'open', brows: 'up', look: [-.7, 0] } : { mouth: 'grin', eyes: 'happy', brows: 'up' }, light: { x: -.6, y: -.8, rim: '#ffe2a8', cast: 0 } }, o.theoLook || {})); }
    FX.caption(ctx, 'MYTH CARD', lt, .3, W - 40, 26);
  }
  // "Somebody wrote that down." — brush lettering writes itself, ink splat, wax-seal stamp
  function wroteSting(ctx, lt, t, o = {}) {
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#f3e4c4'], [1, '#e2c99c']]); ctx.fillRect(0, 0, W, H);
    const r = rng(8); ctx.fillStyle = 'rgba(150,110,60,.08)'; for (let i = 0; i < 60; i++) { ctx.beginPath(); ctx.arc(r() * W, r() * H, 20 + r() * 60, 0, TAU); ctx.fill(); }
    const s = o.text || 'Somebody wrote that down.', k = clamp(lt / 1.1);
    ctx.save(); ctx.font = DISP(64); const w = ctx.measureText(s).width; ctx.beginPath(); ctx.rect(W / 2 - w / 2 - 10, 0, (w + 20) * k, H); ctx.clip();
    txt(ctx, s, W / 2 + 4, H / 2 + 6, DISP(64), 'rgba(60,30,10,.25)', 'center'); txt(ctx, s, W / 2, H / 2, DISP(64), '#2a1a10', 'center'); ctx.restore();
    if (k < 1) { const px = W / 2 - w / 2 + w * k; ctx.save(); ctx.translate(px, H / 2 - 20); ctx.rotate(.6); ln(ctx, [[0, 0], [70, -90]], 9); ln(ctx, [[0, 0], [70, -90]], 5, '#c9a46a'); ctx.restore(); }
    const st = lt - 1.25; if (st > 0) { const sc = st < .12 ? lerp(1.8, .95, st / .12) : 1; ctx.save(); ctx.translate(W / 2 + w / 2 - 20, H / 2 + 74); ctx.scale(sc, sc); ctx.rotate(-.2); sh(ctx, '#b2342f', 4, circ(0, 0, 44)); sh(ctx, '#c8463a', 0, circ(-4, -4, 34)); txt(ctx, 'V', 0, 3, DISP(46), '#7a1f1a', 'center'); ctx.restore(); }
    (o.extra || []).forEach(([s2, at]) => { const kk = pop(lt, at); if (kk <= 0) return; ctx.save(); ctx.translate(W / 2, H / 2 + 140); ctx.scale(kk, kk); txt(ctx, s2, 0, 0, DISP(70), '#d8433a', 'center'); ctx.restore(); });
  }
  function beam(ctx, pts, a) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.filter = 'blur(10px)'; ctx.fillStyle = `rgba(255,225,160,${a})`; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function rain(ctx, t, a = 1, n = 160, slant = .25) { if (a <= 0) return; const r = rng(17); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(210,225,240,.55)'; ctx.lineWidth = 2;
    for (let i = 0; i < n; i++) { const sp = 900 + r() * 500, x0 = r() * (W + 600), y = ((r() * H + t * sp) % (H + 60)) - 30, x = x0 - (y * slant) - 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 26 * slant, y + 26); ctx.stroke(); } ctx.restore(); }
  function smoke(ctx, t, x, y, a = .4) { for (let i = 0; i < 6; i++) { const k = (t * .22 + i / 6) % 1; ctx.save(); ctx.globalAlpha = a * (1 - k); ctx.fillStyle = '#d8d4cc'; ctx.beginPath(); ctx.arc(x + k * 50 + Math.sin(k * 6 + t) * 6, y - k * 140, 9 + k * 24, 0, TAU); ctx.fill(); ctx.restore(); } }
  function puff(ctx, x, y, k, a = 1) { if (k <= 0 || a <= 0) return; const r = rng(4); ctx.save(); ctx.globalAlpha = clamp(a);
    for (let i = 0; i < 11; i++) { const ang = r() * TAU, d = (40 + r() * 120) * ease.out(k), rad = (50 + r() * 60) * ease.out(k); sh(ctx, i % 3 ? '#fbf7ee' : '#e9e2d3', 4, circ(x + Math.cos(ang) * d, y + Math.sin(ang) * d * .8, rad)); } ctx.restore(); }
  function confetti(ctx, lt, t0, cx = W / 2, cy = 200, n = 60) { if (lt < t0) return; const r = rng(3), u = lt - t0; if (u > 3) return; for (let i = 0; i < n; i++) { const vx = (r() - .5) * 700, vy = -300 - r() * 400, x = cx + vx * u, y = cy + vy * u + 500 * u * u, a = r() * TAU + u * 8;
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = P.FLOWERS[i % 6]; ctx.globalAlpha = clamp(3 - u); ctx.fillRect(-6, -3, 12, 6); ctx.restore(); } }
  // TEMP-free: a gentle letterbox vignette for drama
  function letterbox(ctx, k) { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, 60 * k); ctx.fillRect(0, H - 60 * k, W, 60 * k); ctx.restore(); }
  function desat(ctx, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = a; ctx.fillStyle = '#888'; ctx.fillRect(0, 0, W, H); ctx.restore(); }


  // ---------- clothing props for the care package ----------
  function sock(ctx, x, y, s, col = '#c9b48a', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    sh(ctx, col, 4, c => { c.moveTo(-18, -60); c.lineTo(18, -60); c.lineTo(18, 10); c.quadraticCurveTo(20, 34, 50, 36); c.quadraticCurveTo(66, 40, 62, 56); c.quadraticCurveTo(56, 66, 20, 64); c.lineTo(-10, 62); c.quadraticCurveTo(-22, 58, -18, 30); c.closePath(); });
    for (const yy of [-52, -44]) ln(ctx, [[-18, yy], [18, yy]], 3, 'rgba(0,0,0,.25)'); sh(ctx, 'rgba(0,0,0,.12)', 0, c => c.ellipse(46, 52, 14, 10, 0, 0, TAU)); ctx.restore(); }
  function pants(ctx, x, y, s, col = '#e6dcc4', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    sh(ctx, col, 4, c => { c.moveTo(-50, -30); c.lineTo(50, -30); c.lineTo(54, 20); c.quadraticCurveTo(30, 26, 14, 34); c.lineTo(0, 12); c.lineTo(-14, 34); c.quadraticCurveTo(-30, 26, -54, 20); c.closePath(); });
    ln(ctx, [[-50, -22], [50, -22]], 4, 'rgba(0,0,0,.25)'); ctx.restore(); }
  function sandal(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    sh(ctx, '#7a4a2a', 4, c => c.ellipse(0, 0, 60, 24, 0, 0, TAU)); for (const dx of [-30, 0, 30]) ln(ctx, [[dx - 10, -18], [dx + 10, 18]], 6, '#5a3420'); ctx.restore(); }
  function shoe(ctx, x, y, s, col = '#6b4428', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    sh(ctx, col, 4, c => { c.moveTo(-50, -10); c.quadraticCurveTo(-40, -40, 0, -38); c.quadraticCurveTo(40, -30, 56, 0); c.quadraticCurveTo(50, 14, 0, 14); c.lineTo(-50, 12); c.closePath(); });
    for (let i = 0; i < 4; i++) sh(ctx, '#e7d8b8', 1.5, circ(-14 + i * 12, -26 + i * 2, 3)); ln(ctx, [[-50, 10], [56, 2]], 5, '#3a2416'); ctx.restore(); }
  G.VK = { FONT, DISP, txt, pop, fadeIn, vtalk, fig, cast, LIGHT, mini, march, SKINS, HAIRS, CLOTH, paper, quote, wrap, counter, tag, title, bubble, cross, tick, tablet, mythCard, wroteSting, beam, rain, smoke, puff, confetti, letterbox, desat, sock, pants, sandal, shoe };
})(window);
