/* Merer's Diary — graphics kit G.EK (papyrus log cards, chapter strip, timeline, onion pile, tomb painting,
 * sand / ramp / gang diagrams, workforce bars, 10-day calendar, timesheet, red gang graffiti, name cards, bones card). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, P = G.Paint, P2 = G.Paint2, K = G.VK, ES = G.ES, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const FONT = (w, s) => `${w} ${s}px Fredoka`, DISP = s => `${s}px "Luckiest Guy"`;
  const txt = (g, s, x, y, font, col = OUT, align = 'center') => { g.font = font; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const pop = K.pop, fadeIn = K.fadeIn;

  // hieratic-looking ink squiggles (a line of "writing"), reveal 0..1
  function hieratic(ctx, x, y, w, seed, k = 1, col = '#2a2018', lw = 3) { const r = rng(seed); let px = x; ctx.save(); ctx.beginPath(); ctx.rect(x - 4, y - 30, w * k + 8, 60); ctx.clip();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = lw;
    while (px < x + w) { const g = r(), gw = 10 + r() * 16; ctx.beginPath();
      if (g < .3) { ctx.moveTo(px, y - 12); ctx.quadraticCurveTo(px + gw * .5, y + 10, px + gw, y - 6); }
      else if (g < .5) { ctx.moveTo(px + gw * .5, y - 16); ctx.lineTo(px + gw * .4, y + 12); ctx.moveTo(px, y); ctx.lineTo(px + gw, y - 2); }
      else if (g < .7) { ctx.arc(px + gw / 2, y, gw * .35, PI * .2, PI * 1.8); }
      else if (g < .85) { ctx.moveTo(px, y + 10); ctx.bezierCurveTo(px + gw * .2, y - 18, px + gw * .8, y + 18, px + gw, y - 10); }
      else { ctx.moveTo(px, y - 14); ctx.lineTo(px + gw, y - 14); ctx.moveTo(px + gw * .5, y - 14); ctx.lineTo(px + gw * .5, y + 12); }
      ctx.stroke(); px += gw + 4 + r() * 6; }
    ctx.restore(); }
  function papyrusSheet(ctx, x, y, w, h, o = {}) {   // the sheet: crossed fibres, darker edges, torn corners
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.scale) ctx.scale(o.scale, o.scale);
    ctx.fillStyle = 'rgba(40,20,8,.35)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 10, w, h);
    const r = rng(o.seed || 3), edge = c => { c.moveTo(-w / 2, -h / 2 + 6); for (let i = 0; i <= 10; i++) c.lineTo(-w / 2 + i * w / 10, -h / 2 + (r() * 6)); for (let i = 0; i <= 6; i++) c.lineTo(w / 2 - r() * 6, -h / 2 + i * h / 6); for (let i = 0; i <= 10; i++) c.lineTo(w / 2 - i * w / 10, h / 2 - r() * 6); for (let i = 0; i <= 6; i++) c.lineTo(-w / 2 + r() * 6, h / 2 - i * h / 6); c.closePath(); };
    sh(ctx, '#e8d49c', 4, edge); ctx.save(); ctx.beginPath(); edge(ctx); ctx.clip();
    for (let xx = -w / 2; xx < w / 2; xx += 4 + r() * 9) { ctx.strokeStyle = `rgba(140,100,40,${.06 + r() * .12})`; ctx.lineWidth = 1 + r() * 2.5; ctx.beginPath(); ctx.moveTo(xx, -h / 2); ctx.bezierCurveTo(xx + (r() - .5) * 6, -h / 6, xx + (r() - .5) * 6, h / 6, xx + (r() - .5) * 5, h / 2); ctx.stroke(); } for (let yy = -h / 2; yy < h / 2; yy += 6 + r() * 14) { ctx.strokeStyle = `rgba(150,110,50,${.04 + r() * .08})`; ctx.lineWidth = 1 + r() * 2; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.lineTo(w / 2, yy + (r() - .5) * 4); ctx.stroke(); }
    const vg = ctx.createRadialGradient(0, 0, Math.min(w, h) * .3, 0, 0, Math.max(w, h) * .7); vg.addColorStop(0, 'rgba(120,80,30,0)'); vg.addColorStop(1, 'rgba(120,80,30,.35)'); ctx.fillStyle = vg; ctx.fillRect(-w / 2, -h / 2, w, h);
    if (o.border) {   // Egyptian frieze: lotus + papyrus panels down the sides, a striped band along the bottom
      for (const sd of [-1, 1]) { const bx = sd < 0 ? -w / 2 + 10 : w / 2 - 44; ctx.fillStyle = '#d8c48a'; ctx.fillRect(bx, -h / 2 + 10, 34, h - 20); ctx.strokeStyle = '#3a6a8a'; ctx.lineWidth = 2.5; ctx.strokeRect(bx, -h / 2 + 10, 34, h - 20);
        for (let y = -h / 2 + 24; y < h / 2 - 30; y += 34) { const cx = bx + 17; ctx.fillStyle = '#2a7a7a'; ctx.beginPath(); ctx.moveTo(cx, y); ctx.quadraticCurveTo(cx - 13, y + 12, cx - 9, y + 26); ctx.lineTo(cx + 9, y + 26); ctx.quadraticCurveTo(cx + 13, y + 12, cx, y); ctx.fill();
          ctx.fillStyle = '#3a5aa0'; ctx.beginPath(); ctx.ellipse(cx, y + 14, 4, 10, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#c8402a'; ctx.fillRect(cx - 2, y + 26, 4, 6); } }
      const by = h / 2 - 22; for (let x = -w / 2 + 10; x < w / 2 - 10; x += 16) { ctx.fillStyle = ['#2a7a7a', '#d8b040', '#3a5aa0', '#c8402a'][Math.floor((x + w) / 16) % 4]; ctx.fillRect(x, by, 12, 10); } ctx.strokeStyle = '#3a2614'; ctx.lineWidth = 2; ctx.strokeRect(-w / 2 + 10, by - 2, w - 20, 14); }
    if (o.draw) o.draw(ctx); ctx.restore(); ctx.restore(); }
  // painted diagram board (user's repainted refs): a reed-mat table under one big bordered papyrus sheet, warm light from upper left
  const board = (ctx, seed = 1) => ctx.drawImage(P.layer('ekboard' + seed, g => { g.setTransform(1, 0, 0, 1, 0, 0); const r = rng(seed);
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#6e4a2c'], [1, '#4a3020']]); g.fillRect(0, 0, W, H);
    for (let y = 0; y < H; y += 9) { g.fillStyle = `rgba(${r() < .5 ? '30,18,8' : '160,110,60'},${.08 + r() * .1})`; g.fillRect(0, y, W, 4 + r() * 3); }   // reed mat
    papyrusSheet(g, W / 2, H / 2 + 4, W - 50, H - 34, { rot: (r() - .5) * .006, seed: seed + 40, border: true });
    const lg = g.createRadialGradient(260, 120, 40, 520, 300, 1000); lg.addColorStop(0, 'rgba(255,236,190,.28)'); lg.addColorStop(.5, 'rgba(255,220,160,0)'); lg.addColorStop(1, 'rgba(60,30,10,.28)'); g.fillStyle = lg; g.fillRect(0, 0, W, H);
  }, 0, W, H), 0, 0);
  // a line from Merer's log: hieratic writes itself, then the English translation types under it
  function logCard(ctx, lt, t0, text, o = {}) {
    const k = pop(lt, t0, .45); if (k <= 0) return; const w = o.w || 900, lines = K.wrap(ctx, text, FONT(700, o.size || 34), w - 120), lh = (o.size || 34) * 1.3, h = 150 + lines.length * lh + (o.source === false ? 0 : 30);
    const kw = clamp((lt - t0 - .2) / (o.writeDur || 1.2)), n = Math.floor((lt - t0 - .3 - (o.writeDur || 1.2) * .6) * 34);
    papyrusSheet(ctx, o.x ?? W / 2, o.y ?? H / 2, w + 80, h + 20, { rot: o.rot ?? -.012, scale: k, seed: o.seed || 3, border: o.border !== false, draw: c => {
      hieratic(c, -w / 2 + 60, -h / 2 + 52, w - 120, o.seed || 7, kw, '#2a2018', 3.2); if (o.red !== false) hieratic(c, -w / 2 + 60, -h / 2 + 52, 90, (o.seed || 7) + 1, kw * 6, '#b2342a', 3.4);
      let used = 0; lines.forEach((l, i) => { const show = l.slice(0, Math.max(0, n - used)); used += l.length; txt(c, show, -w / 2 + 60, -h / 2 + 118 + i * lh, FONT(700, o.size || 34), '#2a1a10', 'left'); });
      if (o.source !== false && n > text.length) txt(c, o.source || '— Papyrus Jarf, trans. Tallet', w / 2 - 50, h / 2 - 30, FONT(600, 20), '#7a4a2a', 'right');
      if (kw > 0 && kw < 1) { const px = -w / 2 + 60 + (w - 120) * kw; c.save(); c.translate(px, -h / 2 + 46); c.rotate(.6); ln(c, [[0, 0], [60, -80]], 8); ln(c, [[0, 0], [60, -80]], 4.5, '#b8a060'); c.restore(); }
    } });
  }
  // a bold on-screen text strip (the script's ON-SCREEN TEXT lines)
  function onScreen(ctx, lt, t0, text, o = {}) { const k = pop(lt, t0, .35); if (k <= 0) return; const sz = o.size || 28; ctx.save(); ctx.font = FONT(700, sz); const w = Math.min(W - 80, ctx.measureText(text).width + 60), h = sz * 2;
    ctx.translate(o.x ?? W / 2, o.y ?? H - 74); ctx.scale(k, k); ctx.rotate(o.rot ?? -.01); ctx.fillStyle = 'rgba(30,14,6,.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 7, w, h); sh(ctx, o.fill || '#f7eedb', 3.5, c => c.roundRect(-w / 2, -h / 2, w, h, 10));
    sh(ctx, o.accent || '#c8322a', 0, c => c.rect(-w / 2, -h / 2, 10, h)); txt(ctx, text, 6, 1, FONT(700, sz), o.col || OUT); ctx.restore(); }
  // chapter strip (titles are not spoken: a paper strip slides in top-left)
  // parchment scroll label with rolled ends (the user's map + river frames)
  function scroll(ctx, text, x, y, k = 1, o = {}) { if (k <= 0) return; const sz = o.size || 24; ctx.save(); ctx.font = (o.serif ? `600 ${sz}px Georgia, serif` : FONT(700, sz)); const w = ctx.measureText(text).width + 48, h = sz * 1.9;
    ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(o.rot || 0); ctx.fillStyle = 'rgba(30,14,6,.35)'; ctx.fillRect(-w / 2 + 5, -h / 2 + 6, w, h);
    sh(ctx, '#f2e2bc', 3, c => c.rect(-w / 2, -h / 2, w, h)); ctx.fillStyle = grad(ctx, 0, -h / 2, 0, h / 2, [[0, 'rgba(255,250,235,.4)'], [1, 'rgba(150,110,60,.25)']]); ctx.fillRect(-w / 2, -h / 2, w, h);
    for (const sd of [-1, 1]) { sh(ctx, '#e2cc9c', 3, c => c.roundRect(sd * w / 2 - 7, -h / 2 - 5, 14, h + 10, 7)); ln(ctx, [[sd * w / 2, -h / 2 - 2], [sd * w / 2, h / 2 + 2]], 1.5, 'rgba(120,80,40,.5)'); }
    ctx.fillStyle = o.col || '#3a2614'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 2); ctx.restore(); }
  // chapter strip: a parchment scroll banner with a red ribbon carrying the chapter number (titles are not spoken)
  function chapter(ctx, lt, num, title, o = {}) { const k = clamp(lt / .5), out = clamp((lt - (o.dur || 3.2)) / .5); if (k <= 0 || out >= 1) return; const x = lerp(-560, 30, ease.out(k)) - out * 640;
    ctx.save(); ctx.font = '600 30px Georgia, serif'; const w = ctx.measureText(title).width + 120; ctx.translate(x, 34); ctx.fillStyle = 'rgba(30,14,6,.35)'; ctx.fillRect(8, 8, w, 60);
    sh(ctx, '#f2e2bc', 3, c => c.rect(0, 0, w, 60)); ctx.fillStyle = grad(ctx, 0, 0, 0, 60, [[0, 'rgba(255,250,235,.4)'], [1, 'rgba(150,110,60,.28)']]); ctx.fillRect(0, 0, w, 60); sh(ctx, '#e2cc9c', 3, c => c.roundRect(w - 8, -6, 16, 72, 8));
    sh(ctx, '#a8282a', 3, c => { c.moveTo(4, -8); c.lineTo(66, -8); c.lineTo(66, 74); c.lineTo(35, 60); c.lineTo(4, 74); c.closePath(); }); ln(ctx, [[10, -2], [60, -2]], 2, '#e8c070');
    txt(ctx, String(num), 35, 28, '700 36px Georgia, serif', '#f6e6c0'); txt(ctx, title, 84, 31, '600 30px Georgia, serif', '#3a2614', 'left'); ctx.restore(); }
  // name card for real people (no faces): name, role, a small icon
  function nameCard(ctx, lt, t0, name, role, x, y, o = {}) { const k = pop(lt, t0, .4); if (k <= 0) return; K.paper(ctx, x, y, o.w || 380, 112, { rot: o.rot ?? .015, scale: k, draw: c => {
      sh(c, o.iconCol || '#c8a46a', 3, circ(-(o.w || 380) / 2 + 52, 0, 34)); const ic = o.icon || 'brush'; c.save(); c.translate(-(o.w || 380) / 2 + 52, 0);
      if (ic === 'brush') { ln(c, [[-14, 14], [14, -14]], 7); ln(c, [[-14, 14], [14, -14]], 4, '#8a5a32'); sh(c, '#d8c08a', 2, c2 => c2.ellipse(-16, 16, 8, 5, -.8, 0, TAU)); }
      else if (ic === 'flask') { sh(c, '#9fd0e8', 2.5, c2 => { c2.moveTo(-6, -18); c2.lineTo(6, -18); c2.lineTo(6, -6); c2.lineTo(16, 16); c2.lineTo(-16, 16); c2.lineTo(-6, -6); c2.closePath(); }); }
      else if (ic === 'bone') { ln(c, [[-14, 10], [14, -10]], 9); ln(c, [[-14, 10], [14, -10]], 5, '#f2ead6'); for (const [bx, by] of [[-16, 8], [-12, 14], [12, -14], [16, -8]]) sh(c, '#f2ead6', 2, circ(bx, by, 5)); }
      else if (ic === 'drill') { sh(c, '#8a9aa8', 2.5, c2 => c2.rect(-6, -18, 12, 36)); for (let i = 0; i < 4; i++) ln(c, [[-8, -12 + i * 9], [8, -8 + i * 9]], 2); }
      c.restore(); txt(c, name, -(o.w || 380) / 2 + 102, -16, FONT(700, 26), OUT, 'left'); txt(c, role, -(o.w || 380) / 2 + 102, 18, FONT(600, 18), '#7a4a2a', 'left'); } }); }
  // timeline: Great Pyramid → Cleopatra → Moon landing (to scale), gaps labelled
  function timeline(ctx, lt, t0, o = {}) {
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#1c2440'], [1, '#2e2a48']]); ctx.fillRect(0, 0, W, H); const r = rng(5); for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(255,250,230,${.2 + r() * .6})`; ctx.fillRect(r() * W, r() * 300, 1.5, 1.5); }
    const x0 = 120, x1 = 1160, yr = y => lerp(x0, x1, (y + 2560) / (1969 + 2560)), y = 430, k = clamp((lt - t0) / 1.6);
    ln(ctx, [[x0, y], [lerp(x0, x1, k), y]], 14); ln(ctx, [[x0, y], [lerp(x0, x1, k), y]], 8, '#f2d27a');
    const mk = (yearV, label, sub, at, up, draw) => { const a = pop(lt, at); if (a <= 0) return; const x = yr(yearV); ctx.save(); ctx.translate(x, y); ctx.scale(a, a); sh(ctx, '#c8322a', 3.5, circ(0, 0, 14));
      ln(ctx, [[0, -14], [0, up ? -70 : 70]], 4, '#f2d27a'); ctx.restore(); if (draw) draw(x, up ? y - 140 : y + 150, a); K.tag(ctx, label, x, up ? y - 230 : y + 240, lt, at + .1, { size: 24 }); K.tag(ctx, sub, x, up ? y - 190 : y + 280, lt, at + .2, { size: 18, fill: '#f2d27a' }); };
    mk(-2560, 'Great Pyramid', '~2560 BC', t0 + .2, true, (x, yy, a) => ES.pyramid(ctx, x, yy + 40, 110 * a, { k: 1 }));
    mk(-30, 'Cleopatra', 'died 30 BC', t0 + (o.cleoAt ?? 1.2), false, (x, yy, a) => { sh(ctx, '#e0b440', 3, c => c.ellipse(x, yy - 10, 30 * a, 34 * a, 0, 0, TAU)); sh(ctx, '#1e1814', 3, c => c.ellipse(x, yy - 6, 26 * a, 30 * a, 0, 0, TAU)); sh(ctx, '#b07448', 3, circ(x, yy - 2, 20 * a)); });
    mk(1969, 'Moon landing', '1969', t0 + (o.moonAt ?? 2.2), true, (x, yy, a) => { sh(ctx, '#e8e8ee', 3, circ(x, yy, 36 * a)); for (const [dx, dy, rr] of [[-10, -8, 7], [12, 6, 5], [-4, 14, 4]]) sh(ctx, '#c8c8d2', 0, circ(x + dx * a, yy + dy * a, rr * a)); });
    const ga = fadeIn(lt, t0 + (o.gapAt ?? 3.2), .5); if (ga > 0) { ctx.save(); ctx.globalAlpha = ga; for (const [a, b, s2, col] of [[-2560, -30, '≈ 2,530 years', '#f6c945'], [-30, 1969, '≈ 2,000 years', '#9fd0e8']]) { const xa = yr(a) + 16, xb = yr(b) - 16; ctx.setLineDash([10, 8]); ln(ctx, [[xa, y + 40], [xb, y + 40]], 4, col); ctx.setLineDash([]); txt(ctx, s2, (xa + xb) / 2, y + 66, FONT(700, 24), col); } ctx.restore(); }
  }
  // onion pile with radishes and garlic and a price tag
  function onions(ctx, x, y, s, lt, t0, t) { const k = pop(lt, t0, .5); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); const r = rng(7);
    const items = []; for (let row = 0; row < 8; row++) { const n = 11 - row, w = 520 - row * 62; for (let i = 0; i < n; i++) items.push([-w / 2 + (i + .5) * w / n + (r() - .5) * 14, -row * 30 - r() * 6, r()]); } items.sort((a, b) => a[1] - b[1] ? b[1] - a[1] : 0);
    for (const [ix, iy, u] of items) { if (u < .6) { sh(ctx, u < .3 ? '#c8763a' : '#b85a8a', 3, c => { c.moveTo(ix, iy - 36); c.quadraticCurveTo(ix + 30, iy - 20, ix + 22, iy); c.quadraticCurveTo(ix, iy + 8, ix - 22, iy); c.quadraticCurveTo(ix - 30, iy - 20, ix, iy - 36); c.closePath(); }); ln(ctx, [[ix, iy - 36], [ix + 4, iy - 48]], 3, '#8aa04a'); ctx.strokeStyle = 'rgba(255,240,200,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ix - 8, iy - 28); ctx.quadraticCurveTo(ix - 14, iy - 14, ix - 8, iy - 2); ctx.stroke(); }
      else if (u < .82) { sh(ctx, '#f2ead6', 3, c => c.ellipse(ix, iy - 16, 18, 20, 0, 0, TAU)); for (const d of [-6, 0, 6]) ln(ctx, [[ix + d, iy - 34], [ix + d, iy - 2]], 1.5, 'rgba(120,100,70,.4)'); }
      else { sh(ctx, '#d84a5a', 3, circ(ix, iy - 14, 16)); ln(ctx, [[ix, iy - 30], [ix - 6, iy - 52]], 4, '#5a9a3a'); ln(ctx, [[ix, iy - 30], [ix + 8, iy - 50]], 4, '#5a9a3a'); } }
    ctx.restore(); const tk = pop(lt, t0 + .7); if (tk > 0) { ctx.save(); ctx.translate(x + 230 * s, y - 230 * s); ctx.rotate(.12 + Math.sin(t * 2) * .03); ctx.scale(tk, tk); ln(ctx, [[-70, -70], [-20, -10]], 3, '#8a6a44');
      sh(ctx, '#f7eedb', 4, c => { c.moveTo(-60, -40); c.lineTo(140, -40); c.lineTo(140, 60); c.lineTo(-60, 60); c.lineTo(-90, 10); c.closePath(); }); sh(ctx, '#fff', 3, circ(-60, 10, 7)); txt(ctx, '1,600', 40, -6, DISP(42), '#c8322a'); txt(ctx, 'talents of silver', 40, 34, FONT(700, 18), OUT); ctx.restore(); } }
  // the Djehutihotep sledge painting (redrawn in Middle Kingdom style): registers of haulers, a colossus, the water pourer
  function tombPainting(ctx, lt, t, o = {}) {
    ctx.fillStyle = '#e6d2a6'; ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .4, 131, 'multiply', 1.2);
    ln(ctx, [[0, 70], [W, 70]], 6, '#a8402a'); ln(ctx, [[0, 650], [W, 650]], 6, '#a8402a'); for (let x = 0; x < W; x += 30) { sh(ctx, x % 60 ? '#3a6a9a' : '#c8a040', 0, c => c.rect(x, 52, 22, 12)); }
    // the colossus on its sledge (right)
    const cx = 1000, cy = 560; sh(ctx, '#8a6a44', 3.5, c => { c.moveTo(cx - 170, cy); c.lineTo(cx + 150, cy); c.quadraticCurveTo(cx + 180, cy - 4, cx + 172, cy - 24); c.lineTo(cx - 170, cy - 20); c.closePath(); });
    // the colossus: a striding statue in profile facing left, on a base block (painted Egyptian style: flat colour, black outline)
    ctx.save(); ctx.translate(cx - 20, cy - 20); const st = '#e8e0cc';
    sh(ctx, '#d8ccb0', 3.5, c => c.rect(-120, -40, 220, 40));
    sh(ctx, st, 3.5, c => { c.moveTo(-60, -40); c.lineTo(-40, -200); c.lineTo(-10, -200); c.lineTo(-20, -40); c.closePath(); });   // front leg
    sh(ctx, st, 3.5, c => { c.moveTo(10, -40); c.lineTo(0, -200); c.lineTo(30, -200); c.lineTo(40, -40); c.closePath(); });          // back leg
    sh(ctx, '#f2ead6', 3.5, c => { c.moveTo(-50, -190); c.lineTo(40, -190); c.lineTo(36, -260); c.lineTo(-44, -260); c.closePath(); });   // kilt
    sh(ctx, st, 3.5, c => { c.moveTo(-44, -260); c.lineTo(36, -260); c.lineTo(46, -400); c.lineTo(-30, -400); c.closePath(); });           // torso
    sh(ctx, st, 3.5, c => { c.moveTo(-26, -390); c.lineTo(-40, -290); c.lineTo(-24, -284); c.lineTo(-10, -380); c.closePath(); });        // arm at the side
    sh(ctx, st, 3.5, c => c.ellipse(4, -440, 40, 46, 0, 0, TAU)); sh(ctx, '#1e1814', 3.5, c => { c.moveTo(-30, -470); c.quadraticCurveTo(10, -500, 50, -462); c.lineTo(52, -400); c.lineTo(20, -400); c.lineTo(18, -440); c.lineTo(-14, -446); c.closePath(); });
    sh(ctx, OUT, 0, circ(-20, -444, 4)); ln(ctx, [[-36, -430], [-44, -424]], 3); ctx.restore();
    // haulers in four rows pulling ropes to the left
    const rows = [200, 290, 380, 470]; rows.forEach((ry, ri) => { const yy = ry + 90; ln(ctx, [[cx - 170, cy - 16 - ri * 4], [60, yy - 46]], 3.5, '#8a5a2a');
      for (let i = 0; i < 16; i++) { const fx = 120 + i * 48 + (ri % 2) * 20, sw = Math.sin(t * 4 + i * .6 + ri) * 3 * (o.move ?? 1);
        ctx.save(); ctx.translate(fx + sw, yy); sh(ctx, '#a0583a', 2.5, c => { c.moveTo(-6, 0); c.lineTo(-14 - 4, -40); c.lineTo(-4, -44); c.lineTo(8, 0); c.closePath(); }); sh(ctx, '#f2ead6', 2, c => c.rect(-12, -34, 18, 14)); sh(ctx, '#a0583a', 2.5, circ(-20, -52, 8)); sh(ctx, '#1e1814', 0, c => c.arc(-20, -54, 8, PI * .9, TAU * 1.02)); ln(ctx, [[-14, -40], [-30, -40]], 3, '#a0583a'); ctx.restore(); } });
    // the man pouring water in front of the sledge
    const pk = o.pour ?? 1; ctx.save(); ctx.translate(cx - 230, cy); sh(ctx, '#a0583a', 2.5, c => { c.moveTo(-6, 0); c.lineTo(0, -44); c.lineTo(10, -44); c.lineTo(10, 0); c.closePath(); }); sh(ctx, '#f2ead6', 2, c => c.rect(-6, -34, 18, 14)); sh(ctx, '#a0583a', 2.5, circ(4, -54, 8)); ln(ctx, [[8, -40], [30, -54]], 3, '#a0583a'); sh(ctx, '#b8653a', 2.5, c => c.ellipse(36, -58, 8, 12, -1.2, 0, TAU));
    if (pk > 0) { ctx.strokeStyle = 'rgba(70,130,190,.9)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(44, -60); ctx.quadraticCurveTo(70, -40, 66 + Math.sin(t * 6) * 2, 0); ctx.stroke(); }
    ctx.restore(); if (o.circle) { const a = clamp(o.circle); ctx.save(); ctx.strokeStyle = '#c8322a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(cx - 200, cy - 30, 80, -PI / 2, -PI / 2 + TAU * a); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 6; i++) hieratic(ctx, 140 + i * 120, 130, 90, 40 + i, 1, '#3a2a1a', 2.6);
  }
  // wet vs dry sand: two sledges, sand heaping up in front of the dry one, force arrows
  function sandDiagram(ctx, lt, t, t0 = 0) {
    board(ctx, 2);
    const panel = (x, label, wet, at) => { const a = pop(lt, at, .4); if (a <= 0) return; ctx.save(); ctx.translate(x, 380); ctx.scale(a, a);
      sh(ctx, wet ? '#b8956a' : '#e2c58e', 3.5, c => c.rect(-260, 60, 520, 80)); if (wet) { ctx.fillStyle = 'rgba(80,120,160,.25)'; ctx.fillRect(-258, 62, 516, 76); }
      const k = clamp((lt - at - .4) / 2), dx = lerp(-140, wet ? 60 : -60, ease.out(k));
      if (!wet) sh(ctx, '#e2c58e', 3, c => { c.moveTo(dx + 70, 60); c.quadraticCurveTo(dx + 110, 60 - 40 * k, dx + 150, 60); c.closePath(); });
      ES.sledge(ctx, dx, 60, .7, { rope: false }); const fl = wet ? 120 : 240; ln(ctx, [[dx + 100, 10], [dx + 100 + fl * .9, 10]], 14, OUT); ln(ctx, [[dx + 100, 10], [dx + 100 + fl * .9, 10]], 8, wet ? '#3f9a4f' : '#c8322a'); sh(ctx, wet ? '#3f9a4f' : '#c8322a', 3, c => { c.moveTo(dx + 100 + fl, 10); c.lineTo(dx + 100 + fl - 26, -6); c.lineTo(dx + 100 + fl - 26, 26); c.closePath(); });
      txt(ctx, label, 0, -170, DISP(44), wet ? '#2a6a9a' : '#a0602a'); txt(ctx, wet ? 'pulling force ≈ ½' : 'sand piles up', 0, 200, FONT(700, 26), OUT); ctx.restore(); };
    panel(340, 'DRY SAND', false, t0); panel(940, 'WET SAND', true, t0 + .6);
  }
  // four ramp theories, each a mini pyramid diagram, then STILL DEBATED
  function rampTypes(ctx, lt, t0, o = {}) {
    board(ctx, 5);
    const names = ['STRAIGHT', 'ZIGZAG', 'SPIRAL', 'INTERNAL'];
    names.forEach((n, i) => { const a = pop(lt, t0 + i * (o.gap ?? 1.1), .4); if (a <= 0) return; const x = 250 + i * 260, y = 470; ctx.save(); ctx.translate(x, y); ctx.scale(a, a);
      ES.pyramid(ctx, 0, 0, 220, { k: 1 }); ctx.lineCap = 'round'; ctx.strokeStyle = '#a0602a'; ctx.lineWidth = 10;
      ctx.beginPath(); if (i === 0) { ctx.moveTo(-165, -4); ctx.lineTo(-20, -130); } else if (i === 1) { ctx.moveTo(100, -6); ctx.lineTo(-60, -40); ctx.lineTo(60, -76); ctx.lineTo(-30, -110); ctx.lineTo(10, -136); } else if (i === 2) { ctx.moveTo(-110, -2); ctx.lineTo(100, -20); ctx.lineTo(60, -50); ctx.lineTo(-60, -60); ctx.lineTo(-30, -96); ctx.lineTo(30, -110); } else { ctx.setLineDash([8, 8]); ctx.moveTo(-80, -20); ctx.lineTo(70, -40); ctx.lineTo(-40, -76); ctx.lineTo(30, -110); }
      ctx.stroke(); ctx.setLineDash([]); txt(ctx, n, 0, 60, DISP(32), OUT); ctx.restore(); });
    if (o.stampAt != null) FX.stamp(ctx, 'STILL DEBATED', 640, 200, lt - o.stampAt, { color: '#c8322a', size: 54, rot: -.08 });
  }
  // gang → 5 divisions → teams (tree), with team-name banners
  function gangChart(ctx, lt, t0, o = {}) {
    board(ctx, 1);
    const box = (x, y, w, h, s, at, col) => { const a = pop(lt, at, .35); if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(a, a); sh(ctx, col || '#f7eedb', 3.5, c => c.roundRect(-w / 2, -h / 2, w, h, 10)); txt(ctx, s, 0, 1, FONT(700, h > 50 ? 28 : 20), OUT); ctx.restore(); };
    box(640, 130, 380, 70, 'GANG · "Friends of Khufu"', t0, '#f2d27a');
    for (let d = 0; d < 5; d++) { const x = 180 + d * 230, at = t0 + .6 + d * .2; if (lt > at) ln(ctx, [[640, 165], [x, 280]], 3, 'rgba(60,30,10,.5)'); box(x, 300, 200, 56, 'division ' + (d + 1), at, '#e2ecd4');
      for (let tm = 0; tm < 3; tm++) { const ty = 420 + tm * 70, at2 = t0 + 1.8 + d * .12 + tm * .1; if (lt > at2) ln(ctx, [[x, 328], [x, ty - 22]], 2, 'rgba(60,30,10,.35)'); box(x, ty, 150, 44, 'team', at2, '#f7eedb'); } }
  }
  // workforce bars: Herodotus' 100,000 vs modern estimates
  function workforce(ctx, lt, t0, o = {}) {
    board(ctx, 4);
    const bar = (y, v0, v1, label, col, at) => { const k = ease.out(clamp((lt - at) / 1)); if (k <= 0) return; const sc = 9.4e-3, x0 = 180; sh(ctx, col, 3.5, c => c.rect(x0, y - 34, v1 * sc * k, 68)); if (v0 !== v1) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x0, y - 34, v0 * sc * k, 68); }
      txt(ctx, label, x0, y - 62, FONT(700, 26), OUT, 'left'); };
    bar(260, 100000, 100000, 'Herodotus: 100,000 men', '#c8763a', t0); bar(480, 10000, 25000, 'Modern estimates: ~10,000–25,000', '#3f8a6a', t0 + (o.modernAt ?? 1.4));
    for (let i = 0; i <= 10; i++) { const x = 180 + i * 94; ln(ctx, [[x, 560], [x, 570]], 2); if (i % 2 === 0) txt(ctx, (i * 10) + 'k', x, 592, FONT(600, 18), '#7a4a2a'); } ln(ctx, [[180, 560], [1120, 560]], 3);
  }
  // the Egyptian ten-day week with boat trips marked
  function calendar(ctx, lt, t0, o = {}) { for (let d = 0; d < 10; d++) { const a = pop(lt, t0 + d * .08, .3); if (a <= 0) continue; const x = 190 + d * 100, y = o.y ?? 560; ctx.save(); ctx.translate(x, y); ctx.scale(a, a);
      sh(ctx, '#f7eedb', 3.5, c => c.roundRect(-44, -50, 88, 100, 8)); txt(ctx, 'day ' + (d + 1), 0, -30, FONT(700, 18), '#7a4a2a'); if ([1, 4, 8].includes(d)) { ES.boat(ctx, 0, 30, .12, 0, { blocks: 2, mast: false, bob: 0 }); K.tag(ctx, 'trip', 0, -2, 1, 0, { size: 16, fill: '#f6c945' }); } ctx.restore(); }
    K.tag(ctx, 'the Egyptian work "week" = 10 days', 640, (o.y ?? 560) - 100, lt, t0 + .9, { size: 24 }); }
  // timesheet: Merer's crew → reports to Ankhhaf
  function timesheet(ctx, lt, t0) { const k = pop(lt, t0, .45); if (k <= 0) return; K.paper(ctx, 640, 360, 760, 460, { rot: -.015, scale: k, draw: c => {
      txt(c, 'WEEKLY TIMESHEET', 0, -190, DISP(40), '#c8322a'); const rows = [['Crew', '"The Uraeus of Khufu Is Its Prow"'], ['Inspector', 'Merer'], ['Reports to', 'Ankhhaf'], ['Title', 'Chief of all the king\'s works']];
      rows.forEach(([a, b], i) => { const y = -110 + i * 66; ln(c, [[-330, y + 30], [330, y + 30]], 2, 'rgba(60,30,10,.25)'); txt(c, a, -320, y, FONT(600, 22), '#7a4a2a', 'left'); txt(c, b, -120, y, FONT(700, 26), OUT, 'left'); });
      if (lt > t0 + 1.4) { c.save(); c.strokeStyle = '#c8322a'; c.lineWidth = 5; c.beginPath(); c.ellipse(-60, 22, 96, 30, -.04, 0, TAU * clamp((lt - t0 - 1.4) / .5)); c.stroke(); c.restore(); } } }); }
  // red ochre gang graffiti painted on stone (reveal k)
  function graffiti(ctx, text, x, y, k, o = {}) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || -.03);
    ctx.font = DISP(o.size || 54); const w = ctx.measureText(text).width; ctx.beginPath(); ctx.rect(-w / 2 - 80, -80, (w + 160) * k, 200); ctx.clip();
    ctx.strokeStyle = 'rgba(178,52,38,.9)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(-w / 2 - 44, 0, 30, 54, 0, 0, TAU); ctx.stroke(); hieratic(ctx, -w / 2 - 60, -20, 34, o.seed || 9, 1, 'rgba(178,52,38,.9)', 5); hieratic(ctx, -w / 2 - 60, 20, 34, (o.seed || 9) + 3, 1, 'rgba(178,52,38,.9)', 5);
    txt(ctx, text, 0, 0, DISP(o.size || 54), 'rgba(190,58,40,.92)'); ctx.restore(); }
  // bones card: a lower spine with worn discs and a healed fracture (x-ray style)
  function bonesCard(ctx, lt, t0, o = {}) { const k = pop(lt, t0, .45); if (k <= 0) return; ctx.save(); ctx.translate(o.x ?? 640, o.y ?? 360); ctx.scale(k, k);
    sh(ctx, '#1a2430', 4, c => c.roundRect(-320, -230, 640, 460, 14)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 0, 0, 300, 'rgba(120,180,220,.18)'); ctx.restore();
    for (let i = 0; i < 5; i++) { const y = -170 + i * 64; sh(ctx, '#dfe8ee', 2.5, c => c.roundRect(-160 - 36, y, 72, 44, 12)); sh(ctx, '#dfe8ee', 2, c => c.ellipse(-160 - 56, y + 22, 22, 9, 0, 0, TAU)); sh(ctx, '#dfe8ee', 2, c => c.ellipse(-160 + 56, y + 22, 22, 9, 0, 0, TAU)); if (i > 2) { ctx.fillStyle = 'rgba(200,60,50,.6)'; ctx.fillRect(-196, y + 44, 72, 6); } }
    sh(ctx, '#dfe8ee', 2.5, c => c.roundRect(80, -200, 40, 400, 18)); sh(ctx, '#dfe8ee', 2.5, c => c.ellipse(100, -204, 34, 24, 0, 0, TAU)); sh(ctx, '#dfe8ee', 2.5, c => c.ellipse(100, 204, 34, 24, 0, 0, TAU));
    const hk = clamp((lt - t0 - (o.healAt ?? 1)) / .6); ctx.strokeStyle = '#1a2430'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(78, 10); ctx.lineTo(96, -4); ctx.lineTo(108, 14); ctx.lineTo(122, 0); ctx.stroke(); if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; sh(ctx, '#f2f6f8', 0, c => c.ellipse(100, 6, 30, 16, 0, 0, TAU)); ctx.restore(); }
    if (o.labels !== false) { txt(ctx, 'worn lower spine', -160, 210, FONT(700, 20), '#f2d27a'); txt(ctx, hk > .5 ? 'break that healed' : 'broken bone', 100, 250 - 30, FONT(700, 20), '#f2d27a'); }
    ctx.restore(); }

  function count(ctx, x, y, to, lt, t0, d, label, o = {}) { const k = clamp((lt - t0) / d); if (lt < t0 - .2) return; const v = lerp(0, to, ease.out(k)), s = pop(lt, t0 - .2, .35);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); FX.bigText(ctx, (o.prefix || '') + v.toLocaleString('en-US', { minimumFractionDigits: o.dec ?? 0, maximumFractionDigits: o.dec ?? 0 }) + (o.suffix || ''), 0, 0, o.size || 84, { color: o.color || '#f6c945' });
    if (label) { ctx.font = FONT(700, 24); const w = ctx.measureText(label).width + 30; sh(ctx, '#f7eedb', 3, c => c.roundRect(-w / 2, (o.size || 84) * .55, w, 40, 10)); txt(ctx, label, 0, (o.size || 84) * .55 + 21, FONT(700, 24)); } ctx.restore(); }
  G.EK = { board, scroll, count, hieratic, papyrusSheet, logCard, onScreen, chapter, nameCard, timeline, onions, tombPainting, sandDiagram, rampTypes, gangChart, workforce, calendar, timesheet, graffiti, bonesCard, txt, FONT, DISP };
})(window);
