/* "It's About Salt" — episode extras on top of toilet/js/frame.js (shots on transcript lines, bubbles, crisp UI):
 *   EP.count(n, line, off)        registers a SALT COUNTER tick (n, at transcript line `line`): a big counter card slams in
 *                                 centre-screen with a cha-ching, then shrinks into the corner badge that stays on screen
 *   EP.refrainSalt(ctx, lt, t0)   "AND ONCE AGAIN… IT'S ABOUT SALT" paper strip
 *   EP.busted(ctx, lt, t0, n)     "MYTH #n — BUSTED" red sign
 *   EP.quote(ctx, lt, t0, text, x, y, o)   a sticky-note style quote card (the "salary" claim)
 *   SFX.cash                      cash-register cha-ching */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, K = G.VK, EK = G.EK, EP = G.EP, UI = G.UI, { W, H, clamp, lerp, ease } = T, TAU = Math.PI * 2;
  const SFX = G.Soundtrack.SFX; SFX.cash = (b, t, g) => { SFX.clink(b, t, g * .9); SFX.ding(b, t + .1, g); SFX.clink(b, t + .16, g * .6); };
  const COUNTS = EP.COUNTS = [];
  EP.count = (n, line, off = 0) => { COUNTS.push({ t: EP.at(line, off), n }); EP.fx(line, 'cash', .8, off); };
  // the counter badge: wooden plaque with a salt-crystal icon and a flip number
  function plaque(c, n, prev, flip, s = 1) { c.save(); c.scale(s, s);
    c.fillStyle = 'rgba(30,15,5,.45)'; c.beginPath(); c.roundRect(-150 + 6, -54 + 7, 300, 108, 18); c.fill();
    c.fillStyle = '#8a5a34'; c.beginPath(); c.roundRect(-150, -54, 300, 108, 18); c.fill(); c.lineWidth = 6; c.strokeStyle = '#2a1608'; c.stroke();
    c.fillStyle = '#f6efe0'; c.beginPath(); c.roundRect(-140, -44, 190, 88, 12); c.fill();
    c.font = '700 22px Fredoka'; c.fillStyle = '#5a3a22'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SALT COUNTER', -45, -18);
    for (let i = 0; i < 3; i++) { c.save(); c.translate(-108 + i * 30, 18); c.rotate(.6); c.fillStyle = '#ffffff'; c.strokeStyle = '#7a8a9a'; c.lineWidth = 2; c.fillRect(-9, -9, 18, 18); c.strokeRect(-9, -9, 18, 18); c.restore(); }
    c.fillStyle = '#c8322a'; c.beginPath(); c.roundRect(58, -44, 82, 88, 12); c.fill(); c.lineWidth = 4; c.strokeStyle = '#2a1608'; c.stroke();
    const show = flip < .5 ? prev : n, sy = Math.abs(Math.cos(flip * Math.PI)); c.save(); c.translate(99, 2); c.scale(1, Math.max(.05, sy));
    c.font = (show === '∞' ? '62px' : '64px') + ' "Luckiest Guy"'; c.fillStyle = '#fff'; c.fillText(String(show), 0, 4); c.restore(); c.restore(); }
  const box0 = UI.box; EP.drawCounter = (ctx, t) => { const past = COUNTS.filter(c => c.t <= t); UI.keepOut = null; if (!past.length) return; const cur = past[past.length - 1], prev = past.length > 1 ? past[past.length - 2].n : 0, lt = t - cur.t;
    const k = clamp(lt / .35), flip = clamp((lt - .35) / .45), go = ease.inOut(clamp((lt - 2.4) / .5));
    const cx = EP.counterAt ? EP.counterAt[0] : 1118, cy = EP.counterAt ? EP.counterAt[1] : 668, x = lerp(640, cx, go), y = lerp(330, cy, go), s = lerp(1.2 * FX.settle(k), EP.counterAt ? .64 : .6, go);
    if (go > .5) UI.keepOut = [x - 150 * s - 5, y - 54 * s - 5, x + 150 * s + 5, y + 54 * s + 5];
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); box0(ctx, x, y, 300 * s + 10, 108 * s + 10, c => { c.translate(x, y); plaque(c, cur.n, prev, flip, s); }, { free: true, keep: true }); ctx.restore(); };

  EP.refrainSalt = (ctx, lt, t0, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const y = o.y ?? 610, k2 = clamp((lt - t0 - (o.gap ?? 1.1)) / .3);
    UI.box(ctx, 640, y, 1000, 130, c => { K.paper(c, 640, y, 920, 100, { rot: -.012, scale: k, draw: cc => { EK.txt(cc, 'AND ONCE AGAIN…', -220, 4, '40px "Luckiest Guy"', '#5a3a22'); if (k2 > 0) { cc.save(); cc.translate(200, 2); cc.scale(FX.settle(k2), FX.settle(k2)); EK.txt(cc, "IT'S ABOUT SALT", 0, 2, '50px "Luckiest Guy"', '#c8322a'); cc.restore(); } } }); }); };
  EP.busted = (ctx, lt, t0, n, x = 640, y = 120) => { const k = FX.settle(clamp((lt - t0) / .3)); if (k <= 0) return; UI.sign(ctx, `MYTH #${n} — BUSTED`, x, y, 52, { k, rot: -.06 }); };
  EP.quote = (ctx, lt, t0, text, x, y, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const lines = text.split('\n'), sz = o.size || 30;
    UI.box(ctx, x, y, (o.w || 560) + 30, lines.length * sz * 1.35 + 70, c => { c.translate(x, y); c.rotate(o.rot ?? -.03); c.scale(k, k); const w = o.w || 560, h = lines.length * sz * 1.35 + 44;
      c.fillStyle = 'rgba(30,15,5,.4)'; c.fillRect(-w / 2 + 7, -h / 2 + 8, w, h); c.fillStyle = o.fill || '#fff19a'; c.fillRect(-w / 2, -h / 2, w, h); c.lineWidth = 4; c.strokeStyle = '#3a2a10'; c.strokeRect(-w / 2, -h / 2, w, h);
      c.fillStyle = 'rgba(240,200,90,.8)'; c.fillRect(-50, -h / 2 - 14, 100, 26);
      c.font = `700 ${sz}px Fredoka`; c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach((l, i) => c.fillText(l, 0, -h / 2 + 22 + sz * .7 + i * sz * 1.35)); }); };
})(window);
