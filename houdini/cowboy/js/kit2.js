/* Cowboy episode graphics (G.CK): the GUNFIGHT COUNTER sign, posters, price tags, word cards, newspapers, book
 * covers, time-of-day banners, lightning, stink lines, music notes, a sepia portrait frame, a film-frame border. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, P = G.Paint, P2 = G.Paint2, K = G.VK, { W, H, clamp, lerp, ease, grad, rng } = T, { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const FONT = (w, s) => `${w} ${s}px Fredoka, sans-serif`, DISP = s => `${s}px "Luckiest Guy", Fredoka, sans-serif`;
  const txt = (ctx, s, x, y, font, col = OUT, align = 'center') => { ctx.font = font; ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); };
  const pop = K.pop;

  // ---------- the running joke: GUNFIGHT COUNTER (a painted plank with a flip-digit box) ----------
  function counter(ctx, x, y, lt, t0, o = {}) {
    const k = pop(lt, t0, .4); if (k <= 0) return; const s = (o.s || 1) * k;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot ?? -.03);
    ctx.fillStyle = 'rgba(30,15,5,.35)'; ctx.beginPath(); ctx.roundRect(-186, -60, 380, 140, 12); ctx.fill();
    for (const sd of [-1, 1]) { ln(ctx, [[sd * 150, -110], [sd * 150, -64]], 3, '#5a4a3a'); sh(ctx, '#8a8a90', 2, circ(sd * 150, -64, 4)); }
    P2.planks(ctx, -190, -64, 380, 140, { size: 35, base: '#8a5a34', seed: 7, joints: false }); ctx.lineWidth = 5; ctx.strokeStyle = OUT; ctx.strokeRect(-190, -64, 380, 140);
    txt(ctx, 'GUNFIGHT COUNTER', 0, -34, DISP(30), '#f6e2b6');
    const shake = o.spin ? Math.sin(lt * 40) * clamp(1 - (lt - o.spin) / .8) * (lt > o.spin ? 1 : 0) : 0;
    sh(ctx, '#1e1a18', 4, c => c.roundRect(-70, -12, 140, 76, 10));
    const digits = String(o.v ?? 0).padStart(2, '0'); for (let i = 0; i < 2; i++) { const dx = -34 + i * 68; sh(ctx, '#f2ead8', 3, c => c.roundRect(dx - 28, -4, 56, 60, 6)); ln(ctx, [[dx - 28, 26], [dx + 28, 26]], 2, 'rgba(0,0,0,.35)');
      let d = digits[i]; if (o.spin && lt > o.spin && lt < o.spin + .7 && i === 1) d = String(Math.floor(lt * 18) % 10); txt(ctx, d, dx, 27 + shake, DISP(52), '#b8322a'); }
    if (o.note) { ctx.font = FONT(700, 20); const w = ctx.measureText(o.note).width + 26; sh(ctx, '#f7eedb', 3, c => c.roundRect(-w / 2, 84, w, 34, 8)); txt(ctx, o.note, 0, 101, FONT(700, 20)); }
    ctx.restore();
  }
  // ---------- aged paper poster (WANTED / job posting) ----------
  function poster(ctx, x, y, w, h, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.scale) ctx.scale(o.scale, o.scale);
    ctx.fillStyle = 'rgba(30,15,5,.35)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 10, w, h);
    const edge = c => { const r = rng(o.seed || 3); c.moveTo(-w / 2, -h / 2); for (let i = 1; i <= 10; i++) c.lineTo(-w / 2 + w * i / 10, -h / 2 + (r() - .5) * 6); for (let i = 1; i <= 10; i++) c.lineTo(w / 2 + (r() - .5) * 6, -h / 2 + h * i / 10); for (let i = 9; i >= 0; i--) c.lineTo(-w / 2 + w * i / 10, h / 2 + (r() - .5) * 6); for (let i = 9; i >= 1; i--) c.lineTo(-w / 2 + (r() - .5) * 6, -h / 2 + h * i / 10); c.closePath(); };
    sh(ctx, '#efe0bc', 4, edge); ctx.save(); ctx.beginPath(); edge(ctx); ctx.clip(); ctx.fillStyle = grad(ctx, -w / 2, -h / 2, w / 2, h / 2, [[0, 'rgba(160,110,50,.25)'], [.5, 'rgba(160,110,50,0)'], [1, 'rgba(120,80,30,.3)']]); ctx.fillRect(-w / 2, -h / 2, w, h); P2.grain(ctx, -w / 2, -h / 2, w, h, .35, 9, 'multiply', .6); if (o.draw) o.draw(ctx); ctx.restore();
    for (const [nx, ny] of [[-w / 2 + 16, -h / 2 + 16], [w / 2 - 16, -h / 2 + 16]]) sh(ctx, '#6a6a70', 2, circ(nx, ny, 5));
    ctx.restore();
  }
  // ---------- price tag on a string ----------
  function priceTag(ctx, x, y, top, big, k, o = {}) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(k * 7) * (1 - clamp(k)) * .3 + (o.rot || 0)); ctx.scale(clamp(k * 1.2, 0, 1), clamp(k * 1.2, 0, 1));
    ln(ctx, [[0, -90], [0, -46]], 3, '#5a4a3a'); sh(ctx, o.fill || '#f6ead0', 4, c => { c.moveTo(-70, -36); c.lineTo(-40, -60); c.lineTo(70, -60); c.lineTo(70, 60); c.lineTo(-70, 60); c.closePath(); }); sh(ctx, '#fff', 3, circ(-44, -36, 7));
    txt(ctx, top, 8, -26, FONT(700, 20), '#6a4a30'); txt(ctx, big, 8, 20, DISP(o.size || 48), o.col || '#b8322a'); ctx.restore(); }
  // ---------- Spanish → English word card ----------
  function wordCard(ctx, x, y, from, to, k, o = {}) { if (k <= 0) return; const s = FX.settle(clamp(k)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
    K.paper(ctx, 0, 0, o.w || 420, 96, { seed: from.length, draw: c => { txt(c, from, -(o.w || 420) / 4 + 6, -2, FONT(700, 28), '#a8522e'); txt(c, '→', 0, -2, DISP(34), '#5a4026'); txt(c, to, (o.w || 420) / 4 - 6, -2, DISP(34), '#2e2a26'); if (o.sub) txt(c, o.sub, 0, 34, FONT(600, 15), '#8a6a4a'); } }); ctx.restore(); }
  // ---------- newspaper slam ----------
  function newspaper(ctx, x, y, s, k, head, sub, o = {}) { if (k <= 0) return; const sc = s * (1 + (1 - FX.settle(clamp(k))) * .8), rot = (o.rot ?? -.05) + (1 - clamp(k)) * .6;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.fillStyle = 'rgba(30,15,5,.35)'; ctx.fillRect(-232, -152, 480, 320);
    sh(ctx, '#efe6d0', 4, c => c.rect(-240, -160, 480, 320)); txt(ctx, o.mast || 'THE DAILY GAZETTE', 0, -128, DISP(30), '#2e2a26'); ln(ctx, [[-220, -106], [220, -106]], 3); ln(ctx, [[-220, -100], [220, -100]], 1.5);
    const lines = head.split('\n'); lines.forEach((l, i) => txt(ctx, l, 0, -64 + i * 52, DISP(lines.length > 1 ? 46 : 54), o.col || '#2e2a26'));
    if (sub) txt(ctx, sub, 0, 30 + (lines.length - 1) * 30, FONT(700, 20), '#5a4a3a');
    for (let i = 0; i < 4; i++) { ln(ctx, [[-210, 82 + i * 16], [-20, 82 + i * 16]], 3, 'rgba(0,0,0,.3)'); ln(ctx, [[20, 82 + i * 16], [210, 82 + i * 16]], 3, 'rgba(0,0,0,.3)'); }
    P2.grain(ctx, -240, -160, 480, 320, .25, 6, 'multiply', .6); ctx.restore(); }
  // ---------- book / dime-novel cover ----------
  function book(ctx, x, y, s, k, title, sub, o = {}) { if (k <= 0) return; const sc = s * FX.settle(clamp(k)); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(sc, sc);
    ctx.fillStyle = 'rgba(30,15,5,.35)'; ctx.fillRect(-130, -176, 270, 370); sh(ctx, o.col || '#7a2a22', 5, c => c.roundRect(-140, -186, 270, 360, 6)); sh(ctx, G.Guide.hexMul(o.col || '#7a2a22', .7), 0, c => c.rect(-140, -186, 22, 360));
    if (o.art) { ctx.save(); ctx.beginPath(); ctx.rect(-100, -60, 210, 170); ctx.clip(); o.art(ctx); ctx.restore(); ctx.lineWidth = 4; ctx.strokeStyle = o.ink || '#e8c25a'; ctx.strokeRect(-100, -60, 210, 170); }
    const lines = title.split('\n'); lines.forEach((l, i) => txt(ctx, l, 5, -150 + i * (o.ts || 30), DISP(o.ts || 30), o.ink || '#e8c25a'));
    if (sub) sub.split('\n').forEach((l, i) => txt(ctx, l, 5, 136 + i * 20, FONT(700, 16), o.ink || '#e8c25a'));
    if (o.price) { sh(ctx, '#e8c25a', 3, circ(90, -120, 28)); txt(ctx, o.price, 90, -120, DISP(18), '#7a2a22'); }
    P2.grain(ctx, -140, -186, 270, 360, .3, 4, 'overlay', .6); ctx.restore(); }
  // ---------- time-of-day banner (sun/moon dial + word) ----------
  function dayBanner(ctx, word, lt, t0, o = {}) { const k = pop(lt, t0, .45); if (k <= 0) return; const out = clamp((lt - (o.out ?? 99)) / .3); ctx.save(); ctx.translate(o.x ?? 640, (o.y ?? 96) - out * 200); ctx.scale(k, k);
    ctx.font = DISP(54); const w = ctx.measureText(word).width + 150; sh(ctx, '#f6ead0', 4.5, c => c.roundRect(-w / 2, -44, w, 88, 44));
    const icon = o.icon || 'sun', ix = -w / 2 + 52; if (icon === 'moon') { sh(ctx, '#2a3460', 3, circ(ix, 0, 30)); sh(ctx, '#f6f0d8', 0, circ(ix + 6, -4, 20)); sh(ctx, '#2a3460', 0, circ(ix + 14, -10, 16)); }
    else { const col = icon === 'dawn' ? '#f2a060' : '#f6c945'; for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + lt; ln(ctx, [[ix + Math.cos(a) * 26, Math.sin(a) * 26], [ix + Math.cos(a) * 36, Math.sin(a) * 36]], 4, col); } sh(ctx, col, 3, circ(ix, 0, 20)); if (icon === 'dawn') { sh(ctx, '#f6ead0', 0, c => c.rect(ix - 40, 4, 80, 40)); ln(ctx, [[ix - 38, 4], [ix + 38, 4]], 3); } }
    txt(ctx, word, 28, 4, DISP(54), '#5a3420'); ctx.restore(); }
  // ---------- lightning bolt (seeded, flickers) ----------
  function bolt(ctx, x0, y0, x1, y1, seed, a = 1) { if (a <= 0) return; const r = rng(seed), P_ = [[x0, y0]]; for (let i = 1; i < 12; i++) { const k = i / 12; P_.push([lerp(x0, x1, k) + (r() - .5) * 70, lerp(y0, y1, k)]); } P_.push([x1, y1]);
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter'; ctx.lineJoin = 'round'; for (const [w, c] of [[22, 'rgba(160,190,255,.25)'], [10, 'rgba(200,220,255,.6)'], [4, '#ffffff']]) { ctx.beginPath(); P_.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.stroke(); } ctx.restore(); }
  // ---------- stink lines / music notes / dust puffs ----------
  function stink(ctx, x, y, t, s = 1) { ctx.save(); ctx.strokeStyle = 'rgba(120,140,60,.8)'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const k = (t * .6 + i / 3) % 1, xx = x + (i - 1) * 30 * s; ctx.globalAlpha = Math.sin(k * PI); ctx.beginPath(); for (let j = 0; j < 12; j++) { const yy = y - k * 60 * s - j * 5 * s; ctx.lineTo(xx + Math.sin(j * .9 + t * 4 + i) * 8 * s, yy); } ctx.stroke(); } ctx.restore(); }
  function notes(ctx, x, y, t, s = 1, n = 4) { ctx.save(); for (let i = 0; i < n; i++) { const k = (t * .35 + i / n) % 1, xx = x + Math.sin(k * 6 + i) * 30 * s + i * 14 * s, yy = y - k * 160 * s; ctx.globalAlpha = Math.sin(k * PI); ctx.save(); ctx.translate(xx, yy); ctx.scale(s, s); sh(ctx, '#f6ead0', 2.5, c => c.ellipse(0, 0, 9, 7, -.4, 0, TAU)); ln(ctx, [[8, -2], [8, -34]], 3); if (i % 2) ln(ctx, [[8, -34], [20, -26]], 3); ctx.restore(); } ctx.restore(); }
  function puff(ctx, x, y, k, a = .7, r = 60) { if (k <= 0 || k >= 1) return; ctx.save(); ctx.globalAlpha = a * (1 - k); for (let i = 0; i < 5; i++) { const ang = i / 5 * TAU + .3; sh(ctx, '#d8c4a0', 0, circ(x + Math.cos(ang) * r * k, y + Math.sin(ang) * r * .5 * k, r * .45 * (1 - k * .4))); } ctx.restore(); }
  // ---------- sepia portrait frame (oval) holding a Guide figure ----------
  function portrait(ctx, x, y, s, k, draw, o = {}) { if (k <= 0) return; const sc = s * FX.settle(clamp(k)); ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = 'rgba(30,15,5,.4)'; ctx.beginPath(); ctx.ellipse(10, 14, 190, 240, 0, 0, TAU); ctx.fill();
    sh(ctx, '#8a5a2a', 6, c => c.ellipse(0, 0, 190, 240, 0, 0, TAU)); sh(ctx, '#c9a050', 3, c => c.ellipse(0, 0, 176, 226, 0, 0, TAU));
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 160, 210, 0, 0, TAU); ctx.clip(); ctx.fillStyle = grad(ctx, 0, -210, 0, 210, [[0, '#e8d8b8'], [1, '#c8b08a']]); ctx.fillRect(-170, -220, 340, 440); ctx.filter = o.color ? 'none' : 'sepia(.85) contrast(1.05)'; draw(ctx); ctx.restore();
    if (o.name) { ctx.font = DISP(30); const w = ctx.measureText(o.name).width + 40; sh(ctx, '#f6ead0', 4, c => c.roundRect(-w / 2, 214, w, 52, 10)); txt(ctx, o.name, 0, 242, DISP(30), '#5a3420'); if (o.sub) txt(ctx, o.sub, 0, 290, FONT(700, 20), '#f6ead0'); }
    ctx.restore(); }
  // ---------- film-frame border (the movie set reads as a film) ----------
  function filmFrame(ctx, t, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#141210'; ctx.fillRect(0, 0, W, 34); ctx.fillRect(0, H - 34, W, 34); ctx.fillStyle = '#e8e0cc'; const off = (t * 120) % 60; for (let x = -60 + off; x < W + 60; x += 60) { ctx.beginPath(); ctx.roundRect(x, 8, 30, 18, 4); ctx.fill(); ctx.beginPath(); ctx.roundRect(x, H - 26, 30, 18, 4); ctx.fill(); } ctx.restore(); }
  // ---------- split card (two columns, e.g. myth vs real) ----------
  function label(ctx, s, x, y, lt, t0, o = {}) { K.tag(ctx, s, x, y, lt, t0, o); }
  function crossOut(ctx, x, y, w, k) { if (k <= 0) return; ctx.save(); ctx.lineCap = 'round'; for (const [a, b] of [[[-1, -1], [1, 1]], [[1, -1], [-1, 1]]]) { const e = clamp(k * 2 - (a[0] > 0 ? 1 : 0)); if (e <= 0) continue; ctx.beginPath(); ctx.moveTo(x + a[0] * w, y + a[1] * w); ctx.lineTo(x + lerp(a[0], b[0], e) * w, y + lerp(a[1], b[1], e) * w); ctx.lineWidth = 22; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = 14; ctx.strokeStyle = '#d8433a'; ctx.stroke(); } ctx.restore(); }

  G.CK = { counter, poster, priceTag, wordCard, newspaper, book, dayBanner, bolt, stink, notes, puff, portrait, filmFrame, label, crossOut, txt, FONT, DISP };
})(window);
