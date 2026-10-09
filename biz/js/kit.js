/* Shared building blocks for the money channel's explainer shots (bright cartoon "business story" look).
 * Everything is a pure function of shot-local time `lt`, so any frame renders directly.
 *   Kit.txt(ctx, s, x, y, font, color, align, alpha)      handwritten / print text (fonts: Kit.HAND(w, px), Kit.PRINT(px))
 *   Kit.bg.sky | white | cream | color(ctx, c)             backgrounds (bright, no vignette)
 *   Kit.popK(lt, d) / Kit.popAt(ctx, x, y, lt, fn, d)       overshoot scale-in around a point
 *   Kit.card(ctx, x, y, w, h, fill, r, lw)                 outlined rounded card (top-left x, y)
 *   Kit.nameCard(ctx, name, role, x, y, lt)                black card + white handwriting (the references' name tag)
 *   Kit.bubble(ctx, lines, x, y, w, tail, lt, o)           speech bubble centred at (x, y), tail to [tx, ty]
 *   Kit.stamp(ctx, text, x, y, lt, o)                      rubber stamp slamming down (o.color, o.rot, o.size)
 *   Kit.logo(ctx, key, x, y, w, lt, o)                     a supplied logo on a white card (o.card=false: bare)
 *   Kit.photoCircle(ctx, key, x, y, r, lt, o)              a supplied photo cropped into a circle (o.fx, o.fy, o.zoom)
 *   Kit.source(ctx, text, lt)                              small "Source:" tag, bottom left
 *   Kit.headline(ctx, x, y, w, outlet, title, lt, o)       news headline card (outlet name as text)
 *   Kit.doc(ctx, x, y, w, h, title, lines, lt, o)          paper document card
 *   Kit.house(ctx, x, y, s, o)                             cartoon house, base centre at (x, y)
 *   Kit.envelope(ctx, x, y, s, rot, o)                     mail envelope
 *   Kit.host(ctx, x, y, s, t, keys, face, extra)           the host, talking with the narration
 *   Kit.tween(t, keys)                                     piecewise eased value from [[t, v], ...] */
(function (G) {
  'use strict';
  const INK = '#1f1c1a', T = G.Toon, IMG = T.IMG;
  const HAND = G.BizFont.HAND, PRINT = G.BizFont.PRINT;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const back = k => { k = clamp(k); const c = 1.6; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
  const out = k => 1 - Math.pow(1 - clamp(k), 3), inout = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  const P = { blue: '#3b7dd8', green: '#3a9b4f', red: '#e04b3a', yellow: '#f6c945', orange: '#f29b38', pink: '#f5a9b8', purple: '#8e6bd8', teal: '#2bb3a6', grey: '#c4c8ce', paper: '#fffdf8', cream: '#fff1dc', sky: '#cfe9ff', ink: INK };

  function txt(ctx, s, x, y, font, color = INK, align = 'center', a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(a); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); }
  function sh(ctx, fn, fill, lw = 4.5, stroke = INK) { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
  const W = 1280, H = 720;

  const bg = {
    sky(ctx) { ctx.fillStyle = T.grad(ctx, 0, 0, 0, H, [[0, '#8fd0ff'], [1, '#e2f4ff']]); ctx.fillRect(-200, -200, W + 400, H + 400); },
    white(ctx) { ctx.fillStyle = P.paper; ctx.fillRect(-200, -200, W + 400, H + 400); ctx.fillStyle = 'rgba(60,80,120,.06)'; for (let x = 20; x < W; x += 40) for (let y = 20; y < H; y += 40) { ctx.beginPath(); ctx.arc(x, y, 2, 0, 7); ctx.fill(); } },
    cream(ctx) { ctx.fillStyle = T.grad(ctx, 0, 0, 0, H, [[0, '#ffe6c4'], [1, '#fff6ea']]); ctx.fillRect(-200, -200, W + 400, H + 400); },
    color(ctx, c) { ctx.fillStyle = c; ctx.fillRect(-200, -200, W + 400, H + 400); },
    studio(ctx, c1 = '#ffd76a', c2 = '#fff3c9') { // flat colour wall with a soft spotlight floor (host shots)
      ctx.fillStyle = T.grad(ctx, 0, 0, 0, H, [[0, c1], [1, c2]]); ctx.fillRect(-200, -200, W + 400, H + 400);
      ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.ellipse(W / 2, H + 40, 760, 170, 0, 0, 7); ctx.fill();
    },
  };
  const popK = (lt, d = .35) => lt <= 0 ? 0 : back(lt / d);
  function popAt(ctx, x, y, lt, fn, d = .35) { const k = popK(lt, d); if (k <= .001) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y); fn(); ctx.restore(); }
  function card(ctx, x, y, w, h, fill = '#fff', r = 16, lw = 4.5) { sh(ctx, c => c.roundRect(x, y, w, h, r), fill, lw); }
  function nameCard(ctx, name, role, x, y, lt) {
    if (lt <= 0) return; ctx.save(); ctx.font = HAND(700, 40); const w1 = ctx.measureText(name).width; ctx.font = PRINT(24); const w2 = role ? ctx.measureText(role).width : 0; ctx.restore();
    const w = Math.max(w1, w2) + 44, h = role ? 92 : 62;
    popAt(ctx, x, y, lt, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-.02); card(ctx, -w / 2, -h / 2, w, h, '#1f1c1a', 10, 0);
      txt(ctx, name, 0, role ? -14 : 2, HAND(700, 40), '#fff'); if (role) txt(ctx, role, 0, 24, PRINT(24), '#f6c945'); ctx.restore(); });
  }
  function wrap(ctx, s, font, maxW) { ctx.save(); ctx.font = font; const words = s.split(' '), lines = []; let cur = ''; for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; } if (cur) lines.push(cur); ctx.restore(); return lines; }
  function bubble(ctx, lines, x, y, w, tail, lt, o = {}) {
    if (lt <= 0) return; const font = o.font || HAND(700, o.size || 38), lh = (o.size || 38) * 1.12;
    if (typeof lines === 'string') lines = wrap(ctx, lines, font, w - 50);
    const h = lines.length * lh + 34;
    popAt(ctx, tail ? lerp(x, tail[0], .5) : x, tail ? lerp(y, tail[1], .5) : y, lt, () => {
      sh(ctx, c => { c.roundRect(x - w / 2, y - h / 2, w, h, 26); if (tail) { const bx = clamp(tail[0], x - w / 2 + 40, x + w / 2 - 40), by = tail[1] > y ? y + h / 2 : y - h / 2; c.moveTo(bx - 18, by); c.lineTo(tail[0], tail[1]); c.lineTo(bx + 18, by); } }, o.fill || '#fff', 4.5);
      if (tail) { const bx = clamp(tail[0], x - w / 2 + 40, x + w / 2 - 40), by = tail[1] > y ? y + h / 2 : y - h / 2; ctx.fillStyle = o.fill || '#fff'; ctx.fillRect(bx - 15, by - 4 * Math.sign(tail[1] - y), 30, 6); }
      lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 17 + lh * (i + .5), font, o.color || INK));
    });
  }
  function stamp(ctx, text, x, y, lt, o = {}) {
    if (lt <= 0) return; const k = clamp(lt / .18), s = lerp(2.4, 1, out(k)) * (k >= 1 ? 1 + .05 * Math.sin(clamp((lt - .18) / .2) * Math.PI) : 1), col = o.color || P.red, size = o.size || 64;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.12); ctx.scale(s, s); ctx.globalAlpha *= lerp(.2, .95, k);
    ctx.font = HAND(700, size); const w = ctx.measureText(text).width + size * .7, h = size * 1.25;
    ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 12); ctx.stroke();
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 8); ctx.stroke();
    txt(ctx, text, 0, 3, HAND(700, size), col); ctx.restore();
  }
  // a supplied image fitted to width w (or box), centred at (x, y)
  function imageFit(ctx, key, x, y, w, h) { const im = IMG[key]; if (!im) return [w, h || w * .5]; const s = Math.min(w / im.width, (h || 1e9) / im.height), dw = im.width * s, dh = im.height * s; ctx.drawImage(im, x - dw / 2, y - dh / 2, dw, dh); return [dw, dh]; }
  function logo(ctx, key, x, y, w, lt, o = {}) {
    popAt(ctx, x, y, lt, () => { const im = IMG[key]; const crop = o.crop; let iw = im ? im.width : 4, ih = im ? im.height : 2; if (crop) { iw = crop[2]; ih = crop[3]; }
      const h = o.h || w * ih / iw, pad = o.card === false ? 0 : (o.pad ?? 18);
      if (o.card !== false) { sh(ctx, c => c.roundRect(x - w / 2 - pad + 6, y - h / 2 - pad + 8, w + pad * 2, h + pad * 2, 16), 'rgba(0,0,0,.12)', 0); card(ctx, x - w / 2 - pad, y - h / 2 - pad, w + pad * 2, h + pad * 2, o.fill || '#fff', 16, 4.5); }
      if (!im) { txt(ctx, o.alt || key, x, y, PRINT(36)); return; }
      ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, o.round ?? 8); ctx.clip();
      if (crop) ctx.drawImage(im, crop[0], crop[1], crop[2], crop[3], x - w / 2, y - h / 2, w, h); else ctx.drawImage(im, x - w / 2, y - h / 2, w, h); ctx.restore(); }, o.d);
  }
  function photoCircle(ctx, key, x, y, r, lt, o = {}) {
    popAt(ctx, x, y, lt, () => { const im = IMG[key]; sh(ctx, c => c.arc(x, y, r + 7, 0, 7), o.ring || '#fff', 4.5);
      if (im) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); const z = o.zoom || 1, s = 2 * r / Math.min(im.width, im.height) * z, fx = (o.fx ?? .5) * im.width, fy = (o.fy ?? .4) * im.height; ctx.drawImage(im, x - fx * s, y - fy * s, im.width * s, im.height * s); ctx.restore(); }
      sh(ctx, c => c.arc(x, y, r, 0, 7), null, 4); });
  }
  function source(ctx, text, lt) { if (lt <= 0) return; const a = clamp(lt / .4); ctx.save(); ctx.globalAlpha = a * .92; ctx.font = PRINT(20); const w = ctx.measureText(text).width + 26; sh(ctx, c => c.roundRect(24, H - 52, w, 32, 16), 'rgba(255,255,255,.88)', 2); txt(ctx, text, 37, H - 36, PRINT(20), '#4a4f57', 'left'); ctx.restore(); }
  function headline(ctx, x, y, w, outlet, title, lt, o = {}) {
    popAt(ctx, x, y, lt, () => { const lines = wrap(ctx, title, PRINT(o.size || 40), w - 60), h = 92 + lines.length * (o.size || 40) * 1.15;
      ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
      sh(ctx, c => c.roundRect(-w / 2 + 8, -h / 2 + 10, w, h, 14), 'rgba(0,0,0,.14)', 0);
      card(ctx, -w / 2, -h / 2, w, h, '#fff', 14);
      sh(ctx, c => c.roundRect(-w / 2, -h / 2, w, 46, [14, 14, 0, 0]), o.bar || P.red, 4.5);
      txt(ctx, outlet, -w / 2 + 22, -h / 2 + 24, PRINT(24), '#fff', 'left');
      if (o.tag) { txt(ctx, o.tag, w / 2 - 22, -h / 2 + 24, PRINT(20), '#fff', 'right'); }
      lines.forEach((l, i) => txt(ctx, l, -w / 2 + 28, -h / 2 + 82 + i * (o.size || 40) * 1.15, PRINT(o.size || 40), INK, 'left'));
      ctx.restore(); });
  }
  function doc(ctx, x, y, w, h, title, lines, lt, o = {}) {
    popAt(ctx, x, y, lt, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
      sh(ctx, c => c.rect(-w / 2 + 8, -h / 2 + 10, w, h), 'rgba(0,0,0,.13)', 0);
      sh(ctx, c => { c.moveTo(-w / 2, -h / 2); c.lineTo(w / 2 - 34, -h / 2); c.lineTo(w / 2, -h / 2 + 34); c.lineTo(w / 2, h / 2); c.lineTo(-w / 2, h / 2); c.closePath(); }, o.fill || '#fff', 4.5);
      sh(ctx, c => { c.moveTo(w / 2 - 34, -h / 2); c.lineTo(w / 2 - 34, -h / 2 + 34); c.lineTo(w / 2, -h / 2 + 34); }, '#e9e4d8', 3.5);
      let yy = -h / 2 + 46;
      if (title) { const tl = wrap(ctx, title, HAND(700, o.titleSize || 36), w - 60); tl.forEach(l => { txt(ctx, l, 0, yy, HAND(700, o.titleSize || 36), o.titleColor || INK); yy += (o.titleSize || 36) * 1.05; }); yy += 8; }
      for (const l of lines || []) { if (l === '—') { ctx.fillStyle = '#d5d9df'; ctx.fillRect(-w / 2 + 30, yy - 5, w - 60, 10); yy += 24; } else { txt(ctx, l, -w / 2 + 30, yy, PRINT(o.lineSize || 24), '#3d4148', 'left'); yy += (o.lineSize || 24) * 1.35; } }
      ctx.restore(); });
  }
  function house(ctx, x, y, s = 1, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const wall = o.wall || '#ffcf7a', roof = o.roof || P.red;
    sh(ctx, c => c.rect(-110, -150, 220, 150), wall);
    sh(ctx, c => { c.moveTo(-140, -140); c.lineTo(0, -250); c.lineTo(140, -140); c.closePath(); }, roof);
    sh(ctx, c => c.rect(50, -240, 30, 60), '#a8563c', 4);
    const dw = 56 * (o.door ?? 1); sh(ctx, c => c.roundRect(-dw / 2, -96, dw, 96, [10, 10, 0, 0]), o.doorColor || '#4a7bd0', 4.5);
    if (dw > 20) { ctx.fillStyle = '#f6c945'; ctx.beginPath(); ctx.arc(dw / 2 - 10, -46, 4, 0, 7); ctx.fill(); }
    for (const wx of [-78, 78]) { sh(ctx, c => c.rect(wx - 22, -116, 44, 40), '#bfe6ff', 4); T.line(ctx, [[wx, -116], [wx, -76]], 3, INK); T.line(ctx, [[wx - 22, -96], [wx + 22, -96]], 3, INK); }
    ctx.restore();
  }
  function envelope(ctx, x, y, s = 1, rot = 0, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    sh(ctx, c => c.roundRect(-50, -32, 100, 64, 6), o.fill || '#fff', 4);
    sh(ctx, c => { c.moveTo(-48, -30); c.lineTo(0, 6); c.lineTo(48, -30); }, null, 3.5);
    if (o.stampC) sh(ctx, c => c.rect(24, -24, 16, 18), o.stampC, 2.5);
    ctx.restore();
  }
  function host(ctx, x, y, s, t, keys, face, extra = {}) { return G.Host.draw(ctx, x, y, s, Object.assign({ t, pose: G.Host.pose(t, keys), talk: G.Host.talk(t), face }, extra)); }
  function tween(t, ks, fn = inout) { if (t <= ks[0][0]) return ks[0][1]; for (let i = 0; i < ks.length - 1; i++) if (t < ks[i + 1][0]) return lerp(ks[i][1], ks[i + 1][1], fn((t - ks[i][0]) / (ks[i + 1][0] - ks[i][0]))); return ks[ks.length - 1][1]; }
  // a big number / word that slams in and settles
  function slam(ctx, s, x, y, lt, size = 160, color = P.red, o = {}) { if (lt <= 0) return; const k = clamp(lt / .2), sc = lerp(1.9, 1, out(k)) * (k >= 1 ? back(.6 + clamp((lt - .2) / .25) * .4) : 1); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(sc, sc); ctx.globalAlpha *= k;
    if (o.outline !== false) { ctx.font = HAND(700, size); ctx.lineWidth = size * .09; ctx.strokeStyle = o.stroke || '#fff'; ctx.lineJoin = 'round'; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.strokeText(s, 0, 0); }
    txt(ctx, s, 0, 0, HAND(700, size), color, o.align || 'center'); ctx.restore(); }
  // hand-drawn strike / circle around a thing
  function strike(ctx, x1, y1, x2, y2, k, col = P.red, w = 10) { if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, out(k)), lerp(y1, y2, out(k))); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  function scribbleCircle(ctx, x, y, rx, ry, k, col = P.red, w = 7) { if (k <= 0) return; ctx.save(); ctx.beginPath(); const n = 60, end = out(k) * 1.15; for (let i = 0; i <= n * end; i++) { const a = -Math.PI / 2 + (i / n) * Math.PI * 2 * 1.0, wob = 1 + Math.sin(i * .9) * .03 + i / n * .06; const px = x + Math.cos(a) * rx * wob, py = y + Math.sin(a) * ry * wob; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  function arrow(ctx, a, b, k, col = INK, w = 6) { if (k <= 0) return; const e = [lerp(a[0], b[0], out(k)), lerp(a[1], b[1], out(k))]; T.line(ctx, [a, e], w, col); const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), s = w * 3.2; sh(ctx, c => { c.moveTo(e[0] + Math.cos(ang) * s, e[1] + Math.sin(ang) * s); c.lineTo(e[0] + Math.cos(ang + 2.4) * s, e[1] + Math.sin(ang + 2.4) * s); c.lineTo(e[0] + Math.cos(ang - 2.4) * s, e[1] + Math.sin(ang - 2.4) * s); c.closePath(); }, col, 0); }
  function check(ctx, x, y, s, k, col = P.green) { if (k <= 0) return; const pts = [[-.5, 0], [-.15, .35], [.55, -.45]].map(([a, b]) => [x + a * s, y + b * s]); const u = out(k) * 2; const seg = u < 1 ? [pts[0], [lerp(pts[0][0], pts[1][0], u), lerp(pts[0][1], pts[1][1], u)]] : [pts[0], pts[1], [lerp(pts[1][0], pts[2][0], u - 1), lerp(pts[1][1], pts[2][1], u - 1)]]; T.line(ctx, seg, s * .16, col); }
  function cross(ctx, x, y, s, k, col = P.red) { strike(ctx, x - s / 2, y - s / 2, x + s / 2, y + s / 2, k * 2, col, s * .16); strike(ctx, x + s / 2, y - s / 2, x - s / 2, y + s / 2, k * 2 - 1, col, s * .16); }

  function chapterCard(ctx, lt, num, title, col) { // full-frame chapter title: moving stripes, number tab, handwritten title
    bg.color(ctx, col); ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let i = -4; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 90 + lt * 30, 0); ctx.lineTo(i * 90 + 300 + lt * 30, H); ctx.lineTo(i * 90 + 340 + lt * 30, H); ctx.lineTo(i * 90 + 40 + lt * 30, 0); ctx.fill(); }
    popAt(ctx, 640, 270, lt, () => { card(ctx, 520, 230, 240, 80, '#1f1c1a', 14, 0); txt(ctx, 'CHAPTER ' + num, 640, 270, PRINT(40), '#fff'); });
    popAt(ctx, 640, 390, lt - .15, () => txt(ctx, title, 640, 390, HAND(700, 84), '#fff'));
  }
  G.Kit = { chapterCard, INK, P, HAND, PRINT, clamp, lerp, back, out, inout, txt, sh, wrap, bg, popK, popAt, card, nameCard, bubble, stamp, imageFit, logo, photoCircle, source, headline, doc, house, envelope, host, tween, slam, strike, scribbleCircle, arrow, check, cross };
})(window);
