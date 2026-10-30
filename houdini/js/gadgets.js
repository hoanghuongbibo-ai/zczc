/* Shared action gadgets learned from the reference clips (used by salt2 pass 3 and every later episode).
 *   GX.hand(g, x, y, s, ang, {kind:'fist'|'open'|'point', sleeve, hold})   white cartoon glove on a sleeve
 *   GX.poof(g, x, y, k, s)  GX.impact(g, x, y, k, s)  GX.speed(g, x, y, dir, n, len)   effects (k = 0..1 progress)
 *   GX.face(g, x, y, s, mood, t)    a cartoon face for maps/objects/blobs (happy smug angry scared sleepy sad evil shock)
 *   GX.bubble(ctx, text, x, y, lt, t0, tx, ty, o)   speech bubble (crisp UI)
 *   GX.hangSign(ctx, title, prev, val, lt, t0, tFlip, o)   wooden sign on ropes with a flip card
 *   GX.divine(g, t, lt)  GX.evil(g, t, lt, o)  GX.blob(g, x, y, rx, ry, col, seed, t)
 *   EP.ticket(text, from, to, at, ok) + EP.drawTickets(ctx, t)   open-loop question tickets (top-right) */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, EP = G.EP, { W, H, clamp, lerp, rng } = T, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const pop = (lt, t0, d = .3) => { const k = clamp((lt - t0) / d); return k <= 0 ? 0 : G.FX ? G.FX.settle(k) : k; };
  const S2 = G.GX = {};
  // a white cartoon glove on a navy sleeve that enters from `from` (angle, radians) and sits with its fist/palm at (x, y)
  function hand(g, x, y, s, ang, o = {}) { g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s);
    g.lineJoin = 'round'; g.lineWidth = 7; g.strokeStyle = '#15100c';
    g.fillStyle = o.sleeve || '#2a3a7a'; g.beginPath(); g.roundRect(60, -46, 900, 92, 30); g.fill(); g.stroke();
    g.fillStyle = '#f2ead8'; g.beginPath(); g.roundRect(40, -54, 40, 108, 14); g.fill(); g.stroke();
    g.fillStyle = '#ffffff';
    if (o.kind === 'point') { g.beginPath(); g.roundRect(-40, -40, 90, 80, 30); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-150, -22, 130, 36, 18); g.fill(); g.stroke(); }
    else if (o.kind === 'open') { g.beginPath(); g.roundRect(-50, -50, 100, 100, 34); g.fill(); g.stroke(); for (let i = 0; i < 4; i++) { g.beginPath(); g.roundRect(-150, -48 + i * 25, 120, 24, 12); g.fill(); g.stroke(); } }
    else { g.beginPath(); g.roundRect(-70, -56, 130, 112, 40); g.fill(); g.stroke(); g.lineWidth = 4; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(-70, -56 + i * 28); g.lineTo(-30, -56 + i * 28); g.stroke(); } }
    if (o.hold) o.hold(g); g.restore(); }
  // white smoke puff that blooms out and fades (k: 0..1)
  function poof(g, x, y, k, s = 1) { if (k <= 0 || k >= 1) return; g.save(); g.globalAlpha = 1 - k; g.fillStyle = '#fff'; g.strokeStyle = '#15100c'; g.lineWidth = 4;
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU, r = (30 + 70 * ease.out(k)) * s; g.beginPath(); g.arc(x + Math.cos(a) * r, y + Math.sin(a) * r * .7, (34 - 10 * k) * s, 0, TAU); g.fill(); g.stroke(); } g.restore(); }
  // yellow impact star (k 0..1)
  function impact(g, x, y, k, s = 1) { if (k <= 0 || k >= 1) return; g.save(); g.translate(x, y); g.scale(s * (1 + k), s * (1 + k)); g.globalAlpha = 1 - k * k; g.fillStyle = '#ffe24a'; g.strokeStyle = '#15100c'; g.lineWidth = 4; g.beginPath();
    for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, r = i % 2 ? 26 : 70; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.fill(); g.stroke(); g.restore(); }
  function speed(g, x, y, dir = 1, n = 6, len = 160) { g.save(); g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineCap = 'round'; for (let i = 0; i < n; i++) { g.lineWidth = 4 + (i % 2) * 3; const yy = y + (i - n / 2) * 22; g.beginPath(); g.moveTo(x - dir * 40, yy); g.lineTo(x - dir * (40 + len * (.6 + (i % 3) * .2)), yy); g.stroke(); } g.restore(); }
  // a cartoon face for maps, objects and blobs. mood: happy|smug|angry|scared|sleepy|sad|evil|shock
  function face(g, x, y, s, m = 'happy', t = 0) { g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = 'round'; g.lineWidth = 6; g.strokeStyle = '#15100c'; g.fillStyle = '#15100c';
    const blink = (t * .7 % 3) > 2.85;
    if (m === 'sleepy' || blink) { for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 30 - 14, -6); g.lineTo(sd * 30 + 14, -6); g.stroke(); } }
    else if (m === 'happy' || m === 'smug') { for (const sd of [-1, 1]) { g.beginPath(); g.arc(sd * 30, 0, 12, PI * 1.1, PI * 1.9); g.stroke(); } }
    else if (m === 'evil') { g.fillStyle = '#ff2a1a'; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 12, -2); g.lineTo(sd * 46, -16); g.lineTo(sd * 42, 4); g.closePath(); g.fill(); } }
    else { for (const sd of [-1, 1]) { g.beginPath(); g.arc(sd * 30, -2, m === 'shock' || m === 'scared' ? 12 : 9, 0, TAU); g.fill(); } if (m === 'angry') for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 46, -26); g.lineTo(sd * 14, -14); g.stroke(); } }
    g.beginPath(); if (m === 'happy') g.arc(0, 14, 18, .1, PI - .1); else if (m === 'smug') { g.moveTo(-16, 22); g.quadraticCurveTo(4, 30, 22, 14); } else if (m === 'angry' || m === 'sad') g.arc(0, 36, 16, PI + .3, -.3);
    else if (m === 'shock' || m === 'scared') { g.ellipse(0, 26, 11, 15, 0, 0, TAU); g.fill(); } else if (m === 'evil') { g.moveTo(-40, 12); g.quadraticCurveTo(0, 50, 40, 12); g.closePath(); g.fillStyle = '#fff'; g.fill(); } else { g.moveTo(-14, 22); g.lineTo(14, 22); }
    g.stroke(); if (m === 'scared' || m === 'sad') { g.fillStyle = '#7ac8ff'; g.beginPath(); g.ellipse(52, -20, 7, 11, 0, 0, TAU); g.fill(); } g.restore(); }
  // comic speech bubble (crisp UI): text at (x,y), tail pointing to (tx,ty)
  function bubble(ctx, text, x, y, lt, t0, tx, ty, o = {}) { const k = pop(lt, t0, .25); if (k <= 0 || (o.hold && lt > t0 + o.hold)) return; const sz = o.size || 34, lines = text.split('\n');
    ctx.save(); ctx.font = MK(sz); const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + 56, h = lines.length * sz * 1.15 + 40; ctx.restore();
    G.UI.box(ctx, x, y, w + 20, h + 20, c => { c.save(); c.translate(x, y); c.scale(k, k); c.lineWidth = 6; c.strokeStyle = '#15100c'; c.fillStyle = o.fill || '#fff'; c.lineJoin = 'round';
      if (tx != null) { c.beginPath(); c.moveTo(-18, h / 2 - 6); c.lineTo((tx - x) * .55, (ty - y) * .55); c.lineTo(18, h / 2 - 6); c.closePath(); c.fill(); c.stroke(); }
      c.beginPath(); c.ellipse(0, 0, w / 2 + 14, h / 2 + 8, 0, 0, TAU); c.fill(); c.stroke(); c.font = MK(sz); c.fillStyle = o.ink || '#15100c'; c.textAlign = 'center'; c.textBaseline = 'middle';
      lines.forEach((l, i) => c.fillText(l, 0, (i - (lines.length - 1) / 2) * sz * 1.15 + 2)); c.restore(); }, { free: true }); }
  // a wooden sign hanging on two ropes; the number card flips from prev to val at tFlip
  function hangSign(ctx, title, prev, val, lt, t0, tFlip, o = {}) { const k = clamp((lt - t0) / .45); if (k <= 0) return; const x = o.x ?? 640, y = (o.y ?? 300) - (1 - ease.out(k)) * 500, sw = Math.sin(lt * 3) * .03 * Math.exp(-(lt - t0));
    G.UI.box(ctx, x, y, 620, 300, c => { c.save(); c.translate(x, y - 200); c.rotate(sw); c.translate(0, 200); c.strokeStyle = '#5a3a1e'; c.lineWidth = 7; for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(sd * 200, -260); c.lineTo(sd * 200, -60); c.stroke(); }
      c.fillStyle = 'rgba(10,6,4,.4)'; c.beginPath(); c.roundRect(-284, -66, 580, 200, 18); c.fill(); for (let i = 0; i < 3; i++) { c.fillStyle = i % 2 ? '#9a6a3e' : '#8a5a34'; c.beginPath(); c.roundRect(-290, -72 + i * 64, 580, 66, 14); c.fill(); c.lineWidth = 5; c.strokeStyle = '#2a1608'; c.stroke(); }
      c.font = MK(46); c.fillStyle = '#2a1608'; c.textAlign = 'left'; c.textBaseline = 'middle'; title.split('\n').forEach((l, i, a) => c.fillText(l, -260, 30 + (i - (a.length - 1) / 2) * 50));
      const fl = clamp((lt - tFlip) / .35), sx = Math.abs(Math.cos(fl * PI)), show = fl < .5 ? prev : val; c.save(); c.translate(180, 30); c.rotate(.06); c.scale(Math.max(.05, sx), 1); c.fillStyle = '#f8f2e4'; c.fillRect(-62, -74, 124, 148); c.lineWidth = 5; c.strokeStyle = '#15100c'; c.strokeRect(-62, -74, 124, 148);
      c.font = MK(96); const tw = c.measureText(String(show)).width; if (tw > 110) c.font = MK(Math.floor(96 * 110 / tw)); c.fillStyle = fl >= .5 && o.col ? o.col : '#15100c'; c.textAlign = 'center'; c.fillText(String(show), 0, 6); c.restore(); c.restore(); }, { free: true }); }
  // giant era badge (icon + label) used as a section stamp
  function divine(g, t, lt) { const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#5ad2ff'); gr.addColorStop(.5, '#8a5aff'); gr.addColorStop(1, '#ff5ad2'); g.fillStyle = gr; g.fillRect(-300, -300, W + 600, H + 600);
    g.save(); g.translate(W / 2, H / 2); g.rotate(t * .1); for (let i = 0; i < 14; i++) { g.rotate(TAU / 14); g.fillStyle = 'rgba(255,255,255,.12)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(1400, -120); g.lineTo(1400, 120); g.closePath(); g.fill(); } g.restore();
    const r = rng(4); g.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 60; i++) { const x = (r() * W + t * 60) % W, y = r() * H; g.fillRect(x, y, 2, 10); } }
  function evil(g, t, lt, o = {}) { g.fillStyle = o.bg || '#1a1a22'; g.fillRect(-300, -300, W + 600, H + 600); g.save(); g.translate(640, 520 + Math.sin(t) * 6); g.fillStyle = '#05050a'; g.beginPath(); g.arc(0, -120, 230, 0, TAU); g.fill(); g.beginPath(); g.ellipse(0, 260, 380, 240, 0, PI, TAU); g.fill();
    if (o.hat) { g.fillRect(-260, -330, 520, 40); g.fillRect(-150, -420, 300, 100); } if (lt > (o.eyes ?? .4)) { g.globalAlpha = clamp((lt - (o.eyes ?? .4)) / .3); face(g, 0, -150, 2.4, 'evil', t); } g.restore(); }
  // full-screen red tint for dark facts
  const redTint = (ctx, k) => { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = k; ctx.fillStyle = '#c8281e'; ctx.fillRect(0, 0, W, H); ctx.restore(); };
  // a map blob (country) with an outline, used for "talking map" gags
  function blob(g, x, y, rx, ry, col, seed, t) { const r = rng(seed); g.save(); g.fillStyle = col; g.strokeStyle = '#15100c'; g.lineWidth = 6; g.beginPath(); const n = 22;
    for (let i = 0; i <= n; i++) { const a = i / n * TAU, w = 1 + (r() - .5) * .28 + Math.sin(a * 3 + seed) * .06; g.lineTo(x + Math.cos(a) * rx * w, y + Math.sin(a) * ry * w); } g.closePath(); g.fill(); g.stroke(); g.restore(); }
  Object.assign(S2, { hand, poof, impact, speed, face, bubble, hangSign, divine, evil, blob, redTint, pop });

  // ===================== question tickets (open loops) =====================
  // shown top-right from `from` to `to`; each ticket flips ✗→✓ (or stays ✗ = busted) at its time
  const TICKETS = EP.tickets = [];
  const ticket = (text, from, to, at, ok) => TICKETS.push({ text, from, to, at, ok });
  EP.drawTickets = (ctx, t) => { const on = TICKETS.filter(q => t >= q.from && t < q.to); on.forEach((q, i) => { const k = clamp((t - q.from) / .3), out = clamp((q.to - t) / .3), x = W - 250, y = 50 + i * 62;
    G.UI.box(ctx, x, y, 460, 56, c => { c.save(); c.translate(x + (1 - ease.out(Math.min(k, out))) * 520, y); c.fillStyle = 'rgba(10,6,4,.4)'; c.fillRect(-214, -22, 440, 52); c.fillStyle = '#fff'; c.fillRect(-220, -26, 440, 52); c.lineWidth = 4; c.strokeStyle = '#15100c'; c.strokeRect(-220, -26, 440, 52);
      const done = t >= q.at, fk = clamp((t - q.at) / .3); c.fillStyle = done ? (q.ok ? '#2a9a4a' : '#c8281e') : '#c8281e'; c.fillRect(-220, -26, 52, 52); c.strokeRect(-220, -26, 52, 52); c.strokeStyle = '#fff'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath();
      if (done && q.ok) { c.moveTo(-207, 0); c.lineTo(-197, 12); c.lineTo(-180, -12); } else { c.moveTo(-204, -10); c.lineTo(-184, 10); c.moveTo(-184, -10); c.lineTo(-204, 10); } c.stroke();
      if (done && !q.ok && fk > 0) { c.save(); c.translate(-250, 0); c.rotate(-.12); c.scale(1 + (1 - fk) * .8, 1 + (1 - fk) * .8); c.globalAlpha = fk; c.font = MK(26); c.fillStyle = '#c8281e'; c.strokeStyle = '#fff'; c.lineWidth = 6; c.textAlign = 'center'; c.textBaseline = 'middle'; c.strokeText('MYTH', 0, 0); c.fillText('MYTH', 0, 0); c.restore(); }
      c.font = MK(26); c.fillStyle = '#15100c'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(q.text, -156, 1); c.restore(); }, { free: true, keep: true }); }); };
  EP.ticket = ticket;
})(window);
