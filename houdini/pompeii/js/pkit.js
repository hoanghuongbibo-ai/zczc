/* Pompeii series kit: 1080p frame renderer (logical 1280×720 × SS), cached layers, timing helpers and the
 * on-screen furniture (date tag, captions, paper notes, quote cards, stamps, bubbles, name / pronunciation cards,
 * the five-burials counter, chapter strips). */
(function (G) {
  'use strict';
  const T = G.Toon, W = 1280, H = 720, SS = 1.5, INK = '#2b2420';
  const { clamp, lerp, ease } = T;
  const PAPER = '#f4ecd8', PAPER2 = '#e9dcc0';

  // ---------- fonts ----------
  const FONT = (w, px) => `${w} ${px}px Fredoka, "DejaVu Sans", sans-serif`;
  const DISPLAY = px => `${px}px "Luckiest Guy", Fredoka, sans-serif`;
  const HAND = px => `700 ${px}px Caveat, "Patrick Hand", cursive`;

  // ---------- frame ----------
  const reset = ctx => ctx.setTransform(SS, 0, 0, SS, 0, 0);
  let vign = null;
  function finish(ctx) {
    if (!vign) {
      vign = document.createElement('canvas'); vign.width = W * SS; vign.height = H * SS;
      const v = vign.getContext('2d'), g = v.createRadialGradient(W * SS / 2, H * SS * .45, H * SS * .42, W * SS / 2, H * SS / 2, H * SS * 1.0);
      g.addColorStop(0, 'rgba(40,20,10,0)'); g.addColorStop(1, 'rgba(40,20,10,.32)'); v.fillStyle = g; v.fillRect(0, 0, W * SS, H * SS);
    }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(vign, 0, 0); ctx.restore();
  }
  function renderFrame(ctx, shots, t) {
    reset(ctx); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    for (const s of shots) if (t >= s.start && t < s.end) { ctx.save(); s.draw(ctx, t - s.start, s.end - s.start, t); ctx.restore(); reset(ctx); }
    for (const o of (G.Show && G.Show.overlays) || []) if (t >= o.start && t < o.end) { ctx.save(); reset(ctx); o.draw(ctx, t - o.start, o.end - o.start, t); ctx.restore(); }
    finish(ctx);
  }

  // ---------- cached layers (static art drawn once, optionally blurred for depth of field) ----------
  const LAY = new Map();
  function layer(key, w, h, fn, blur = 0) {
    let c = LAY.get(key);
    if (!c) {
      c = document.createElement('canvas'); c.width = Math.ceil(w * SS); c.height = Math.ceil(h * SS);
      const g = c.getContext('2d'); g.scale(SS, SS); fn(g);
      if (blur > 0) { const b = document.createElement('canvas'); b.width = c.width; b.height = c.height; const bg = b.getContext('2d'); bg.filter = `blur(${blur * SS}px)`; bg.drawImage(c, 0, 0); c = b; }
      c._w = w; c._h = h; LAY.set(key, c);
    }
    return c;
  }
  const drawLayer = (ctx, c, x = 0, y = 0) => ctx.drawImage(c, x, y, c._w, c._h);

  // ---------- timing ----------
  const A = k => { const v = G.TP[k]; if (v == null) throw new Error('no anchor ' + k); return v; };
  const since = (t, k, d = 1) => clamp((t - A(k)) / d);           // 0..1 progress after an anchor (absolute t)
  const pop = k => k <= 0 ? 0 : k >= 1 ? 1 : 1 + 2.7 * Math.pow(k - 1, 3) + 1.7 * Math.pow(k - 1, 2);   // overshoot
  const fade = (t, a, d = .3) => clamp((t - a) / d);
  const env = t => { const E = G.ENV; if (!E) return 0; const i = Math.floor(t * E.fps); return E.v[Math.max(0, Math.min(E.v.length - 1, i))] || 0; };
  const talk = (t, a, b) => (t >= a && t < b) ? clamp(env(t) * 1.3) : 0;
  const keys = T.keys;
  const blinkEyes = (t, seed = 0) => { const p = (t + seed * 1.37) % 3.7; return p < .12 ? 'closed' : null; };
  const shake = (t, t0, amp = 8, dur = .8) => { const k = t - t0; if (k < 0 || k > dur) return [0, 0]; const a = amp * Math.exp(-k * 5); return [Math.sin(k * 61) * a, Math.cos(k * 47) * a * .7]; };

  // ---------- primitives ----------
  function P(ctx, fill, lw, path) { ctx.beginPath(); path(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
  function L(ctx, pts, w = 3, c = INK) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
  function text(ctx, s, x, y, o = {}) {
    ctx.save(); ctx.font = o.font || FONT(o.w || 600, o.px || 24); ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'middle';
    if (o.maxW) { const m = ctx.measureText(s).width; if (m > o.maxW) { const px = (o.px || 24) * o.maxW / m; ctx.font = o.font ? o.font.replace(/\d+px/, Math.floor(px) + 'px') : FONT(o.w || 600, px); } }
    if (o.stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = o.stroke; ctx.strokeStyle = o.strokeCol || INK; ctx.strokeText(s, x, y); }
    ctx.fillStyle = o.col || INK; ctx.fillText(s, x, y); ctx.restore();
  }
  function wrap(ctx, s, maxW) { const words = s.split(' '), lines = []; let cur = ''; for (const w of words) { const n = cur ? cur + ' ' + w : w; if (ctx.measureText(n).width > maxW && cur) { lines.push(cur); cur = w; } else cur = n; } if (cur) lines.push(cur); return lines; }
  function scaled(ctx, x, y, k, fn, rot = 0) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(k, k); fn(ctx); ctx.restore(); }
  function paper(ctx, x, y, w, h, o = {}) {
    ctx.fillStyle = 'rgba(30,15,5,.28)'; ctx.fillRect(x + 5, y + 7, w, h);
    P(ctx, o.fill || PAPER, 3, c => c.roundRect(x, y, w, h, o.r ?? 4));
    if (o.tape) for (const tx of [x + w * .18, x + w * .82]) { ctx.save(); ctx.translate(tx, y); ctx.rotate(tx < x + w / 2 ? -.25 : .22); ctx.fillStyle = 'rgba(240,230,190,.85)'; ctx.fillRect(-22, -9, 44, 18); ctx.restore(); }
  }

  // ---------- furniture ----------
  function tag(ctx, s, lt, o = {}) {           // paper date / place tag, top-left
    const k = pop(clamp((lt - (o.at || .15)) / .35)); if (k <= 0) return;
    ctx.save(); reset(ctx); ctx.font = FONT(600, 24); const w = ctx.measureText(s).width + 34;
    scaled(ctx, 40 + w / 2, 52, k, c => { paper(c, -w / 2, -22, w, 44, { r: 3 }); text(c, s, 0, 1, { px: 24 }); }, -.02);
    ctx.restore();
  }
  function caption(ctx, s, lt, at = .4, o = {}) {   // paper strip bottom-right (sources, notes)
    const k = clamp((lt - at) / .3); if (k <= 0) return;
    ctx.save(); reset(ctx); ctx.globalAlpha = k; ctx.font = FONT(600, o.px || 18); const w = ctx.measureText(s).width + 28;
    const x = (o.x ?? W - 40) - w + (1 - ease.out(k)) * 30, y = o.y ?? H - 64;
    paper(ctx, x, y, w, 36, { r: 2, fill: o.fill }); text(ctx, s, x + 14, y + 19, { px: o.px || 18, align: 'left', w: 600 });
    ctx.restore();
  }
  function note(ctx, lines, x, y, lt, o = {}) {   // ON-SCREEN TEXT: taped paper note, centred at x,y
    const k = pop(clamp((lt - (o.at || 0)) / .4)); if (k <= 0) return;
    ctx.save(); const px = o.px || 34; ctx.font = o.hand ? HAND(px) : FONT(600, px);
    const ls = Array.isArray(lines) ? lines : [lines];
    const w = o.w || Math.max(...ls.map(s => ctx.measureText(s).width)) + 60, lh = px * 1.25, h = o.h || ls.length * lh + 44;
    scaled(ctx, x, y, k, c => {
      paper(c, -w / 2, -h / 2, w, h, { tape: o.tape !== false, fill: o.fill });
      ls.forEach((s, i) => text(c, s, 0, -h / 2 + 22 + lh * (i + .5), { font: o.hand ? HAND(px) : FONT(i === 0 && o.bold0 ? 700 : 600, i === 0 ? px : (o.px2 || px * .72)), col: o.cols ? o.cols[i] : INK }));
    }, o.rot ?? -.02);
    ctx.restore();
  }
  function quote(ctx, s, src, x, y, w, k, o = {}) { // quote card, words revealed by k (0..1)
    if (k <= 0 && !o.always) return;
    ctx.save(); const px = o.px || 30; ctx.font = (o.hand ? HAND(px + 6) : FONT(600, px));
    const lines = wrap(ctx, s, w - 70), lh = px * 1.3, h = lines.length * lh + (src ? 88 : 54);
    const kk = pop(clamp((o.lt ?? 1) / .4));
    scaled(ctx, x, y, kk, c => {
      paper(c, -w / 2, -h / 2, w, h, { fill: o.fill || PAPER, tape: true });
      text(c, '“', -w / 2 + 26, -h / 2 + 34, { font: DISPLAY(56), col: '#c0563c' });
      const total = s.split(' ').length; let n = 0;
      lines.forEach((ln, i) => {
        const ws = ln.split(' '); let xx = -w / 2 + 40; c.font = o.hand ? HAND(px + 6) : FONT(600, px);
        const lw = c.measureText(ln).width; xx = -lw / 2;
        for (const wd of ws) { const vis = clamp((k * total - n) * 1.5); n++; const ww = c.measureText(wd + ' ').width; if (vis > 0) { c.save(); c.globalAlpha = vis; text(c, wd, xx, -h / 2 + 40 + lh * (i + .5) + (1 - vis) * 8, { font: o.hand ? HAND(px + 6) : FONT(600, px), align: 'left', col: o.col || INK }); c.restore(); } xx += ww; }
      });
      if (src) text(c, src, 0, h / 2 - 30, { px: 16, w: 500, col: '#6a5a4a', maxW: w - 40 });
    }, o.rot ?? .01);
    ctx.restore();
  }
  function stamp(ctx, s, x, y, k, o = {}) {
    if (k <= 0) return;
    const sc = k < .12 ? lerp(2, .94, k / .12) : lerp(.94, 1, clamp((k - .12) / .1)), a = clamp(k / .1);
    const col = o.col || '#c0392b', px = o.px || 44;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.12); ctx.scale(sc, sc); ctx.globalAlpha *= .92 * a;
    ctx.font = DISPLAY(px); const w = ctx.measureText(s).width + px * .9, h = px * 1.55;
    ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 2.5; ctx.strokeRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16);
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, px * .08);
    ctx.globalCompositeOperation = 'destination-out'; const r = T.rng(9);
    for (let i = 0; i < 60; i++) { ctx.beginPath(); ctx.arc((r() - .5) * w, (r() - .5) * h, r() * 2.4, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  function big(ctx, s, x, y, px, k = 1, o = {}) {      // outlined display heading with a pop
    const kk = o.noPop ? k : pop(k); if (kk <= 0) return;
    scaled(ctx, x, y, kk, c => {
      c.font = DISPLAY(px); c.textAlign = o.align || 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
      c.fillStyle = 'rgba(0,0,0,.3)'; c.fillText(s, 3, 6); c.lineWidth = px * .17; c.strokeStyle = o.stroke || INK; c.strokeText(s, 0, 0); c.fillStyle = o.col || '#f6c945'; c.fillText(s, 0, 0);
    }, o.rot || 0);
  }
  function bubble(ctx, s, x, y, tail, k, o = {}) {      // speech bubble centred at x,y with tail tip at tail[]
    const kk = pop(k); if (kk <= 0) return;
    ctx.save(); const px = o.px || 24; ctx.font = o.hand ? HAND(px + 4) : FONT(600, px);
    const lines = wrap(ctx, s, o.maxW || 300), lh = px * 1.22, w = Math.max(...lines.map(l => ctx.measureText(l).width)) + 40, h = lines.length * lh + 26;
    ctx.translate(x, y); ctx.scale(kk, kk);
    const tx = tail[0] - x, ty = tail[1] - y;
    P(ctx, o.fill || '#fff', 3, c => {
      c.roundRect(-w / 2, -h / 2, w, h, Math.min(22, h / 2));
    });
    // tail
    const bx = clamp(tx * .4, -w / 2 + 24, w / 2 - 24), by = ty > 0 ? h / 2 - 1 : -h / 2 + 1;
    P(ctx, o.fill || '#fff', 0, c => { c.moveTo(bx - 12, by); c.lineTo(tx, ty); c.lineTo(bx + 12, by); c.closePath(); });
    L(ctx, [[bx - 12, by], [tx, ty], [bx + 12, by]], 3);
    if (o.think) { P(ctx, '#fff', 3, c => c.arc(tx * .7, ty * .7, 7, 0, 7)); }
    lines.forEach((l, i) => text(ctx, l, 0, -h / 2 + 13 + lh * (i + .5), { font: o.hand ? HAND(px + 4) : FONT(600, px), col: o.col || INK }));
    ctx.restore();
  }
  function nameCard(ctx, name, sub, x, y, k, o = {}) {  // black card, white text
    const kk = pop(k); if (kk <= 0) return;
    ctx.save(); ctx.font = FONT(700, o.px || 26); const w = Math.max(ctx.measureText(name).width, sub ? (ctx.font = FONT(500, 17), ctx.measureText(sub).width) : 0) + 40, h = sub ? 70 : 46;
    scaled(ctx, x, y, kk, c => {
      c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-w / 2 + 4, -h / 2 + 6, w, h);
      P(c, '#2b2420', 0, cc => cc.roundRect(-w / 2, -h / 2, w, h, 6));
      text(c, name, 0, sub ? -11 : 1, { font: FONT(700, o.px || 26), col: '#fff' });
      if (sub) text(c, sub, 0, 18, { font: FONT(500, 17), col: '#e8d9b8' });
    }, o.rot ?? -.015);
    ctx.restore();
  }
  function phon(ctx, word, say, x, y, k) {             // pronunciation card with a little speaker icon
    const kk = pop(k); if (kk <= 0) return;
    ctx.save(); ctx.font = FONT(700, 30); const w = Math.max(ctx.measureText(say).width + 90, 180);
    scaled(ctx, x, y, kk, c => {
      paper(c, -w / 2, -40, w, 80, { fill: '#fff8e6' });
      text(c, word, 0, -20, { font: FONT(500, 16), col: '#7a6a5a' });
      text(c, say, 18, 12, { font: FONT(700, 30), col: '#c0563c' });
      const sx = -w / 2 + 30, sy = 12; P(c, INK, 0, cc => { cc.moveTo(sx - 9, sy - 5); cc.lineTo(sx - 3, sy - 5); cc.lineTo(sx + 5, sy - 12); cc.lineTo(sx + 5, sy + 12); cc.lineTo(sx - 3, sy + 5); cc.lineTo(sx - 9, sy + 5); cc.closePath(); });
      for (const r of [9, 15]) { c.beginPath(); c.arc(sx + 6, sy, r, -.7, .7); c.lineWidth = 2.4; c.strokeStyle = INK; c.stroke(); }
    }, -.02);
    ctx.restore();
  }
  function chapter(ctx, s, lt, dur = 3.2) {             // chapter strip slides down from the top, then leaves
    const kin = clamp(lt / .45), kout = clamp((lt - dur) / .4); if (kin <= 0 || kout >= 1) return;
    ctx.save(); reset(ctx); ctx.font = DISPLAY(30); const w = ctx.measureText(s).width + 70;
    const y = lerp(-60, 70, ease.out(kin)) - ease.in(kout) * 140;
    ctx.translate(W / 2, y); ctx.rotate(-.01);
    paper(ctx, -w / 2, -30, w, 60, { fill: '#2b2420', tape: true });
    text(ctx, s, 0, 3, { font: DISPLAY(30), col: '#f6c945' });
    ctx.restore();
  }
  function arrow(ctx, x1, y1, x2, y2, k = 1, o = {}) {
    if (k <= 0) return; const x = lerp(x1, x2, k), y = lerp(y1, y2, k), a = Math.atan2(y2 - y1, x2 - x1), col = o.col || '#c0392b', w = o.w || 6;
    const cx = (x1 + x) / 2 + (o.bend || 0) * Math.sin(a), cy = (y1 + y) / 2 - (o.bend || 0) * Math.cos(a);
    ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = w + 4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(cx, cy, x, y); ctx.stroke();
    ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke();
    const aa = Math.atan2(y - cy, x - cx);
    P(ctx, col, 2.5, c => { c.moveTo(x + Math.cos(aa) * 10, y + Math.sin(aa) * 10); c.lineTo(x + Math.cos(aa + 2.4) * 18, y + Math.sin(aa + 2.4) * 18); c.lineTo(x + Math.cos(aa - 2.4) * 18, y + Math.sin(aa - 2.4) * 18); c.closePath(); });
    ctx.restore();
  }
  function tick(ctx, x, y, s, k, col = '#3c9a52') { if (k <= 0) return; const pts = [[-1, 0], [-.3, .7], [1.1, -.8]]; const n = k * 2; const seg = []; seg.push(pts[0]); if (n > 0) seg.push([lerp(pts[0][0], pts[1][0], clamp(n)), lerp(pts[0][1], pts[1][1], clamp(n))]); if (n > 1) seg.push([lerp(pts[1][0], pts[2][0], clamp(n - 1)), lerp(pts[1][1], pts[2][1], clamp(n - 1))]); L(ctx, seg.map(p => [x + p[0] * s, y + p[1] * s]), s * .32 + 3); L(ctx, seg.map(p => [x + p[0] * s, y + p[1] * s]), s * .32, col); }
  function cross(ctx, x, y, s, k, col = '#d0392b') { if (k <= 0) return; const a = clamp(k * 2), b = clamp(k * 2 - 1); L(ctx, [[x - s, y - s], [x - s + 2 * s * a, y - s + 2 * s * a]], s * .32 + 3); L(ctx, [[x - s, y - s], [x - s + 2 * s * a, y - s + 2 * s * a]], s * .32, col); if (b > 0) { L(ctx, [[x + s, y - s], [x + s - 2 * s * b, y - s + 2 * s * b]], s * .32 + 3); L(ctx, [[x + s, y - s], [x + s - 2 * s * b, y - s + 2 * s * b]], s * .32, col); } }
  function ring(ctx, x, y, rx, ry, k, col = '#d0392b') { if (k <= 0) return; ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -.08, -1.6, -1.6 + Math.PI * 2.15 * k); ctx.stroke(); ctx.restore(); }
  function counter(ctx, from, to, k, x, y, px, o = {}) {
    const v = lerp(from, to, ease.out(clamp(k))); const s = (o.pre || '') + (o.fmt ? o.fmt(v) : Math.round(v).toLocaleString('en-US')) + (o.post || '');
    big(ctx, s, x, y, px, 1, { noPop: true, col: o.col, align: o.align });
  }
  function qmark(ctx, x, y, s, k, col = '#f6c945') { big(ctx, '?', x, y, s, k, { col }); }

  // ---------- the five burials ----------
  const BUR = [['ROME', 'paperwork'], ['A VOLCANO', 'ash'], ['TIME', 'grass'], ['OUR STORIES', 'labels'], ['ITS OWN WALLS', 'rubble']];
  function burialIcon(ctx, i, x, y, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (i === 0) { P(ctx, '#f2e6c4', 3, c => c.roundRect(-22, -28, 44, 56, 3)); for (let j = 0; j < 5; j++) L(ctx, [[-14, -16 + j * 9], [14, -16 + j * 9]], 2.4, '#9a8a70'); P(ctx, '#c0392b', 2.4, c => c.arc(10, 18, 8, 0, 7)); }
    if (i === 1) { P(ctx, '#7c8a5a', 3, c => { c.moveTo(-32, 26); c.lineTo(-8, -18); c.lineTo(8, -18); c.lineTo(32, 26); c.closePath(); }); P(ctx, '#9b9590', 2.4, c => { c.arc(-4, -28, 10, 0, 7); c.moveTo(16, -36); c.arc(8, -36, 8, 0, 7); }); P(ctx, '#e8693a', 2.4, c => { c.moveTo(-8, -18); c.lineTo(0, -8); c.lineTo(8, -18); c.closePath(); }); }
    if (i === 2) { P(ctx, '#e9d9a8', 3, c => { c.moveTo(-18, -28); c.lineTo(18, -28); c.lineTo(2, 0); c.lineTo(18, 28); c.lineTo(-18, 28); c.lineTo(-2, 0); c.closePath(); }); P(ctx, '#d4a24a', 0, c => { c.moveTo(-12, 26); c.lineTo(12, 26); c.lineTo(0, 12); c.closePath(); }); L(ctx, [[-22, -30], [22, -30]], 5); L(ctx, [[-22, 30], [22, 30]], 5); }
    if (i === 3) { P(ctx, '#b9473a', 3, c => c.roundRect(-26, -22, 52, 44, 4)); P(ctx, '#f4ecd8', 2.4, c => c.rect(-20, -16, 40, 32)); L(ctx, [[0, -16], [0, 16]], 2.4); for (let j = 0; j < 3; j++) { L(ctx, [[-16, -8 + j * 8], [-4, -8 + j * 8]], 2, '#9a8a70'); L(ctx, [[4, -8 + j * 8], [16, -8 + j * 8]], 2, '#9a8a70'); } }
    if (i === 4) { for (const [bx, by, r] of [[-16, 18, 0], [6, 20, .1], [-4, 4, -.2], [16, 6, .3], [-14, -10, .2]]) { ctx.save(); ctx.translate(bx, by); ctx.rotate(r); P(ctx, '#c9a27a', 2.6, c => c.rect(-11, -7, 22, 14)); ctx.restore(); } }
    ctx.restore();
  }
  // card: 5 slots; slots < n filled; slot n-1 slams at k
  function burials(ctx, n, k, x = W / 2, y = 120, o = {}) {
    const kk = pop(clamp(k / .35)); if (kk <= 0) return;
    scaled(ctx, x, y, kk, c => {
      const w = 560, h = 120;
      paper(c, -w / 2, -h / 2, w, h, { tape: true });
      for (let i = 0; i < 5; i++) {
        const sx = -w / 2 + 64 + i * 108, filled = i < n - 1 || (i === n - 1 && k > .35);
        P(c, filled ? '#fff8e6' : 'rgba(0,0,0,.06)', 2.4, cc => cc.roundRect(sx - 40, -44, 80, 70, 8));
        if (filled) { const kk2 = i === n - 1 ? pop(clamp((k - .35) / .3)) : 1; scaled(c, sx, -9, kk2, cc => burialIcon(cc, i, 0, 0, .9)); }
        else text(c, '?', sx, -9, { font: DISPLAY(34), col: 'rgba(0,0,0,.18)' });
        text(c, (i + 1) + '', sx, 40, { font: FONT(700, 15), col: i < n ? '#c0563c' : '#a09080' });
      }
    }, -.015);
    if (o.label) big(ctx, o.label, x, y + 104, 34, clamp((k - .5) / .3), { col: '#f6c945' });
  }
  // the running gag: "Pompeii: buried. Again."
  function againCard(ctx, k, x = W / 2, y = H / 2, o = {}) {
    if (k <= 0) return;
    const a = pop(clamp(k / .25)), b = pop(clamp((k - .3) / .25)), c = pop(clamp((k - .6) / .25));
    big(ctx, 'POMPEII:', x - 230, y, 64, a, { col: '#f4ecd8' });
    big(ctx, 'BURIED.', x + 40, y, 64, b, { col: '#c9a27a', rot: -.03 });
    if (!o.noAgain) big(ctx, 'AGAIN.', x + 290, y + 4, 64, c, { col: '#e8693a', rot: .04 });
  }

  G.PK = { W, H, SS, INK, PAPER, PAPER2, FONT, DISPLAY, HAND, reset, renderFrame, layer, drawLayer, A, since, pop, fade, env, talk, keys, blinkEyes, shake,
    P, L, text, wrap, scaled, paper, tag, caption, note, quote, stamp, big, bubble, nameCard, phon, chapter, arrow, tick, cross, ring, counter, qmark,
    burialIcon, burials, againCard, BUR };
})(window);
