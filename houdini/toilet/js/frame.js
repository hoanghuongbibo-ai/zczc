/* "Where Does It Go?" — episode framework: shot registry on transcript lines, camera helpers, Theo + cast drawing,
 * speech bubbles that follow the voice (house style v9), the refrain stamp, chapter strips.
 * Shots: S(n, fn, off) starts a shot at the first word of transcript line n (toilet/transcript.txt); inside a shot
 * R(n) = that line's start relative to the shot, R(n, k) = its k-th word. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2;
  const EP = G.EP = { shots: [], sfx: [], moods: [] };
  const at = (n, off = 0) => Math.max(0, TV['L' + n] + off);
  EP.at = at;
  EP.S = (n, fn, off = 0) => EP.shots.push({ t: at(n, off), fn });
  EP.fx = (n, type, gain = 1, off = 0, dur) => EP.sfx.push({ t: at(n, off), type, gain, dur });
  EP.mood = (n, mood, off = 0) => EP.moods.push({ t: at(n, off), mood });
  const LIGHT = { day: { x: .6, y: -.8, rim: '#fff2d0', rimA: .45, shade: '#5a4030', shadeA: .28, cast: .3 }, grey: { x: .5, y: -.8, rim: '#e8eef2', rimA: .35, shade: '#3a4050', shadeA: .3, cast: .2 },
    warm: { x: -.6, y: -.5, rim: '#ffcf8a', rimA: .55, shade: '#5a3a3a', shadeA: .3, cast: .3 }, fire: { x: .5, y: -.4, rim: '#ffb46a', rimA: .6, shade: '#2a1a1a', shadeA: .4, cast: 0 },
    dark: { x: .5, y: -.6, rim: '#a8b0c8', rimA: .3, shade: '#14141e', shadeA: .45, cast: 0 }, room: { x: -.5, y: -.7, rim: '#fff6e8', rimA: .4, shade: '#3a4050', shadeA: .25, cast: .25 } };
  EP.LIGHT = LIGHT;
  const cast = EP.cast = (n, o = {}) => Object.assign({ light: LIGHT.day }, G.CW[n] || {}, o, { look: Object.assign({}, (G.CW[n] || {}).look, o.look) });
  EP.fig = (ctx, n, x, y, s, o) => K.fig(ctx, x, y, s, cast(n, o));
  EP.theo = (ctx, x, y, s, o) => K.fig(ctx, x, y, s, Object.assign({ light: LIGHT.day }, o));
  EP.sit = (ctx, n, x, seatY, s, o = {}) => { const c = n === 'theo' ? Object.assign({ light: LIGHT.day, outfit: 'suit' }, o) : cast(n, o); c.outfit = (c.outfit || 'suit') + '@sit'; K.fig(ctx, x, seatY + 130 * s, s, c); };   // seated: seatY = seat line
  EP.push = (ctx, lt, dur, z0 = 1, z1 = 1.06, fx_ = 640, fy = 360) => { const z = lerp(z0, z1, ease.sine(clamp(lt / dur))); ctx.translate(fx_, fy); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  EP.cover = (ctx, lt, keys, d = .55) => { let A = keys[0], Bk = keys[0], k = 1; for (let i = 0; i < keys.length; i++) if (lt >= keys[i][0]) { A = i ? keys[i - 1] : keys[i]; Bk = keys[i]; k = clamp((lt - keys[i][0]) / d); }
    const e = ease.inOut(k), z = lerp(A[1], Bk[1], e); let fx_ = lerp(A[2], Bk[2], e), fy = lerp(A[3], Bk[3], e);
    fx_ = clamp(fx_, 640 / z, W - 640 / z); fy = clamp(fy, 360 / z, H - 360 / z); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  EP.dateTag = (ctx, s) => FX.dateTag ? FX.dateTag(ctx, s) : K.tag(ctx, s, 170, 40, 1, 0, { size: 20 });
  EP.card = (ctx, text, x, y, lt, t0, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const lines = text.split('\n'), sz = o.size || 32; ctx.font = `700 ${sz}px Fredoka`; const w = o.w || Math.max(...lines.map(l => ctx.measureText(l).width)) + 70, h = lines.length * sz * 1.3 + 40;
    K.paper(ctx, x, y, w, h, { rot: o.rot ?? -.02, scale: k, fill: o.fill, draw: c => lines.forEach((l, i) => EK.txt(c, l, 0, -h / 2 + 20 + sz * .65 + i * sz * 1.3, `700 ${sz}px Fredoka`, o.col || OUT)) }); };
  EP.say = t => Gd.say(t);
  // the refrain: "IT STILL HAS TO GO SOMEWHERE" + its number, slammed as a red rubber stamp on a paper strip
  EP.refrain = (ctx, lt, t0, num, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const y = o.y ?? 610;
    K.paper(ctx, 640, y, 900, 96, { rot: -.015, scale: k, draw: c => { EK.txt(c, 'IT STILL HAS TO GO SOMEWHERE', -40, 4, '44px "Luckiest Guy"', '#3a2618'); } });
    if (num != null) FX.stamp(ctx, '#' + num, 1010, y - 14, clamp((lt - t0 - .35) / .3), { color: '#c8322a', size: 64, rot: -.12 }); };
  EP.rule = (ctx, lt, t0, text) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; K.paper(ctx, 640, 600, 980, 120, { rot: .01, scale: k, fill: '#fff3c8', draw: c => { EK.txt(c, 'RULE #1', -330, 0, '48px "Luckiest Guy"', '#c8322a'); EK.txt(c, text, 110, 2, '700 40px Fredoka', '#3a2618'); } }); };
  EP.label = (ctx, lt, t0, text, x = 640, y = 110, col = '#c8322a') => { const k = clamp((lt - t0) / .3); if (k <= 0) return; FX.stamp(ctx, text, x, y, k, { color: col, size: 46, rot: -.08 }); };

  // ---------- speech bubbles that follow the voice (from cowboy/js/skits.js, house style v9) ----------
  const marks = {};
  EP.mark = (ctx, who, x, y, s, dy = 400, top = 625) => { const m = ctx.getTransform(); marks[who] = { f: G.EP.frame, mouth: m.transformPoint(new DOMPoint(x, y - dy * s)), top: m.transformPoint(new DOMPoint(x, y - top * s)), half: 215 * s * Math.hypot(m.a, m.b) }; };
  const lineEnd = (from, limit) => { const V = G.VIS; if (!V) return limit; for (let i = Math.floor(limit * V.fps); i > from * V.fps; i--) if (V.o[i] > .12) return i / V.fps + .1; return limit; };
  const ends = {};
  EP.speech = (ctx, who, text, from, limit, t, o = {}) => {
    const key = from + ':' + limit, end = ends[key] ?? (ends[key] = lineEnd(from, limit));
    if (t < from - .05 || t > end + .3) return;
    const M = marks[who]; if (!M) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const cw = ctx.canvas.width / W; ctx.scale(cw, cw);
    const words = text.split(' '), shown = Math.min(words.length, Math.ceil(words.length * clamp((t - from) / Math.max(.3, (end - from) * .9)) + .001));
    const pop = FX.settle(clamp((t - from + .05) / .22)), out = clamp((t - end) / .3), size = Math.round((o.size || 30) * 1.25);
    ctx.font = `700 ${size}px Fredoka, sans-serif`; const said = words.slice(0, shown).join(' ');
    const wf = ctx.measureText(text).width + 56, h = size * 1.75, gap = 20, tail = 16;
    const hx = M.top.x / cw, hy = M.top.y / cw, mx = M.mouth.x / cw, my = M.mouth.y / cw, half = M.half / cw;
    const heads = Object.values(marks).filter(m => m.f === G.EP.frame).map(m => { const hh = m.half / cw; return [m.top.x / cw - hh, m.top.y / cw - 6, m.top.x / cw + hh, m.mouth.y / cw + 70 * hh / 215 * 1.6]; });
    const over = (x, y) => { let a = 0; for (const [x0, y0, x1, y1] of heads) a += Math.max(0, Math.min(x1, x + wf / 2) - Math.max(x0, x - wf / 2)) * Math.max(0, Math.min(y1, y + h / 2 + tail) - Math.max(y0, y - h / 2)); return a; };
    const cx0 = x => clamp(x, wf / 2 + 20, W - wf / 2 - 20), topY = h / 2 + 22;
    const C = [[cx0(hx), hy - gap - tail - h / 2, 0, 0], [cx0(hx + half + 30 + wf / 2), clamp(my - 70, topY, H - h / 2 - 90), 1, 4], [cx0(hx - half - 30 - wf / 2), clamp(my - 70, topY, H - h / 2 - 90), -1, 4],
      [cx0(hx + half * .55 + wf / 2), topY, 0, 2], [cx0(hx - half * .55 - wf / 2), topY, 0, 2]];
    let best = null; for (const [x, y, sd, pen] of C) { if (y - h / 2 < 14) continue; const sc = over(x, y) + pen * 400 + Math.abs(x - hx) * .3; if (!best || sc < best[0]) best = [sc, x, y, sd]; }
    let [, bx, by, side] = best || [0, cx0(hx), topY, 0];
    const w = Math.min(wf, Math.max(h * 1.8, ctx.measureText(said).width + 56)), cx = side ? side * -(wf - w) / 2 : 0;
    ctx.globalAlpha = 1 - out; ctx.translate(bx + cx, by); ctx.scale(pop, pop);
    const r = 16, INKB = '#4a3222';
    const shape = c => { c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, r);
      if (!side) { const tx = clamp(hx - bx - cx, -w / 2 + 34, w / 2 - 34); c.moveTo(tx - 13, h / 2); c.lineTo(tx, h / 2 + tail); c.lineTo(tx + 13, h / 2); }
      else { const ty = clamp(my - by, -h / 2 + 14, h / 2 - 14), ex = -side * w / 2; c.moveTo(ex, ty - 11); c.lineTo(ex - side * tail, ty + 6); c.lineTo(ex, ty + 11); } };
    ctx.save(); ctx.translate(6, 6); shape(ctx); ctx.fillStyle = 'rgba(60,35,15,.28)'; ctx.fill(); ctx.restore();
    shape(ctx); ctx.fillStyle = '#fbf3df'; ctx.fill(); ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = INKB; ctx.stroke();
    ctx.fillStyle = '#fbf3df'; if (!side) { const tx = clamp(hx - bx - cx, -w / 2 + 34, w / 2 - 34); ctx.fillRect(tx - 10, h / 2 - 4, 20, 6); } else { const ty = clamp(my - by, -h / 2 + 14, h / 2 - 14); ctx.fillRect(-side * w / 2 - (side > 0 ? 2 : 4), ty - 8, 6, 16); }
    ctx.font = `700 ${size}px Fredoka, sans-serif`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = INKB; ctx.fillText(said, -w / 2 + 28, 2);
    ctx.restore();
  };
  EP.lineEnd = lineEnd;
})(window);

/* ---------- crisp text layer (js/ui.js): every label / card / stamp / bubble is deferred and laid out after the grade ---------- */
(function (G) {
  'use strict';
  const UI = G.UI, K = G.VK, EK = G.EK, FX = G.FX, EP = G.EP, T = G.Toon, clamp = T.clamp;
  const direct = () => UI.flushing;
  K.tag = (ctx, text, x, y, lt, t0, o = {}) => { const k = K.pop(lt, t0); if (k <= 0) return; UI.tag(ctx, text, x, y, Math.max(24, o.size || 26), { k, rot: o.rot, fill: o.fill }); };
  EP.label = (ctx, lt, t0, text, x = 640, y = 110, col = '#d23a2a') => { const k = FX.settle(clamp((lt - t0) / .3)); if (k <= 0) return; UI.sign(ctx, text, x, y, 44, { k, fill: col === '#c8322a' ? '#d23a2a' : col }); };
  const stamp0 = FX.stamp; FX.stamp = (ctx, text, x, y, k, o = {}) => { if (direct()) return stamp0(ctx, text, x, y, k, o); if (k <= 0) return; UI.sign(ctx, text, x, y, Math.min(64, o.size || 48), { k: FX.settle(clamp(k)), rot: o.rot, fill: o.color === '#2a7a4a' ? '#2a8a52' : '#d23a2a' }); };
  const big0 = FX.bigText; FX.bigText = (ctx, text, x, y, px, o = {}) => { if (direct() || px <= 0) return big0(ctx, text, x, y, px, o); ctx.save(); ctx.font = `${px}px "Luckiest Guy"`; const w = ctx.measureText(text).width + px * .4; ctx.restore(); UI.box(ctx, x, y - px * .1, w, px * 1.25, c => big0(c, text, x, y, px, o)); };
  const card0 = EP.card; EP.card = (ctx, text, x, y, lt, t0, o = {}) => { if (direct()) return card0(ctx, text, x, y, lt, t0, o); const k = K.pop(lt, t0, .4); if (k <= 0) return; const lines = text.split('\n'), sz = o.size || 32; ctx.save(); ctx.font = `700 ${sz}px Fredoka`; const w = o.w || Math.max(...lines.map(l => ctx.measureText(l).width)) + 70, h = lines.length * sz * 1.3 + 40; ctx.restore();
    UI.box(ctx, x, y, (w + 16) * k, (h + 16) * k, c => card0(c, text, x, y, lt, t0, o)); };
  const name0 = EK.nameCard; EK.nameCard = (ctx, lt, t0, name, role, x, y, o = {}) => { if (lt < t0) return; UI.box(ctx, x, y, (o.w || 380) + 20, 132, c => name0(c, lt, t0, name, role, x, y, o)); };
  const count0 = EK.count; EK.count = (ctx, x, y, to, lt, t0, d, label, o = {}) => { if (lt < t0 - .2) return; const sz = o.size || 84; UI.box(ctx, x, y + sz * .2, Math.max(sz * 3.4, label ? label.length * 13 + 40 : 0), sz * 1.9, c => count0(c, x, y, to, lt, t0, d, label, o)); };
  const ref0 = EP.refrain; EP.refrain = (ctx, lt, t0, num, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const y = o.y ?? 610; UI.box(ctx, 680, y, 1040, 130, c => ref0(c, lt, t0, num, o)); };
  const rule0 = EP.rule; EP.rule = (ctx, lt, t0, text) => { if (K.pop(lt, t0, .4) <= 0) return; UI.box(ctx, 640, 600, 1000, 140, c => rule0(c, lt, t0, text)); };
  EP.dateTag = (ctx, s) => { ctx.save(); ctx.font = '700 20px Fredoka'; const w = ctx.measureText(s).width + 40; ctx.restore(); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); UI.box(ctx, 30 + w / 2, 42, w + 10, 44, c => FX.dateTag(c, s), { free: true }); ctx.restore(); };
  const sp0 = EP.speech; EP.speech = (ctx, who, text, from, limit, t, o) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); UI.box(ctx, 640, 360, 1, 1, c => sp0(c, who, text, from, limit, t, o), { free: true }); ctx.restore(); };
  // every figure registers its head as an obstacle so labels keep clear of faces
  const fig0 = K.fig; K.fig = (ctx, x, y, s, o, blur) => { fig0(ctx, x, y, s, o, blur); if (s >= .45 && !UI.flushing) UI.face(ctx, x - 190 * s, y - 650 * s, x + 190 * s, y - 330 * s); };
})(window);
