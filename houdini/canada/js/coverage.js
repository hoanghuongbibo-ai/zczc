/* Canada — editorial coverage, after the reference channel: no framing holds longer than a narration beat (~1.6–3.4 s).
 * Each scene is cut into beats on the narration's pauses; beat 0 is the scene's own wide shot, later beats cut (hard) to a
 * close-up of the speaking character, a reaction close-up of someone else, an insert on a photo/document, a two-shot, or a
 * re-framed wide — chosen from what is actually on screen. A pre-pass renders the beat's first frame off-screen while the
 * drawing helpers log where figures, photos and text boxes landed; framings never cut a text box in half.
 * Also: camera shake on impact sound effects, and per-beat acting (G.__beat) read by the figure adapter. */
(function (G) {
  'use strict';
  const W = 1280, H = 720, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = k => k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
  // ---- beats from the narration: split on pauses, keep 1.6–3.4 s ----
  function beatTimes(duration) { const ws = (G.WORDS || []).map(w => w[1]), out = [0]; let last = 0;
    for (let i = 1; i < ws.length; i++) { const t = ws[i], gap = t - ws[i - 1]; if ((gap > .45 && t - last >= 1.6) || t - last >= 3.4) { out.push(t - Math.min(.12, gap * .3)); last = t; } }
    out.push(duration); return out; }
  // ---- the registry the drawing helpers write into during a pre-pass ----
  let REG = null; const tp = (ctx, x, y) => { const m = ctx.getTransform(), p = m.transformPoint(new DOMPoint(x, y)); return [p.x, p.y, Math.sqrt(Math.abs(m.a * m.d - m.b * m.c))]; };
  const box = (ctx, x, y, w, h) => { if (!REG) return; w *= 1.15; h *= 1.4; const [sx, sy, k] = tp(ctx, x, y); REG.boxes.push([sx - w * k / 2, sy - h * k / 2, sx + w * k / 2, sy + h * k / 2]); };
  function instrument() { const C = G.Col, S = G.Scenes; if (C.__instr) return; C.__instr = true;
    const wrap = (obj, name, fn) => { const f = obj[name]; if (!f) return; obj[name] = function (...a) { if (REG) try { fn(...a); } catch (e) { } return f.apply(this, a); }; };
    const tw = (text, size, k = .62) => { const ls = String(text).split('\n'); return [Math.max(...ls.map(l => l.length)) * size * k + size, ls.length * size * 1.35]; };
    wrap(C, 'stamp', (ctx, text, x, y, size) => { const [w, h] = tw(text, size, .66); box(ctx, x, y, w, h); });
    wrap(C, 'headline', (ctx, text, x, y, size) => { const [w, h] = tw(text, size, .68); box(ctx, x, y - size * .3, w, h); });
    wrap(C, 'label', (ctx, text, x, y, size = 22) => { const [w, h] = tw(text, size, .62); box(ctx, x, y, w, h); });
    wrap(C, 'scrawl', (ctx, text, x, y, size) => { const [w, h] = tw(text, size, .5); box(ctx, x, y, w, h); });
    wrap(C, 'ransom', (ctx, text, x, y, size) => { const [w, h] = tw(text, size, .7); box(ctx, x, y, w, h); });
    wrap(C, 'bubble', (ctx, text, x, y, size) => { const [w, h] = tw(text, size, .6); box(ctx, x, y, w + 40, h + 40); });
    wrap(C, 'photo', (ctx, key, x, y, w, h, o = {}) => { const s = o.scale || 1; box(ctx, x, y, w * s + 30, h * s + 50); const [sx, sy, k] = tp(ctx, x, y); REG.photos.push([sx, sy, w * s * k, h * s * k]); });
    wrap(S, 'bigNum', (ctx, text, x, y, size) => { const [w, h] = tw(text, size, .62); box(ctx, x, y - size * .3, w, h); });
    wrap(S, 'polaroid', (ctx, x, y, w, h) => { box(ctx, x, y + 20, w + 30, h + 80); const [sx, sy, k] = tp(ctx, x, y); REG.photos.push([sx, sy, w * k, h * k]); });
    wrap(S, 'paper', (ctx, x, y, w, h, rot, mast, head, o = {}) => { const s = o.scale || 1; box(ctx, x, y, w * s, h * s); const [sx, sy, k] = tp(ctx, x, y); REG.photos.push([sx, sy, w * s * k, h * s * k]); });
    wrap(S, 'counter', (ctx, x, y, s) => box(ctx, x, y + 40, 240 * s, 160 * s));
    wrap(S, 'folder', (ctx, x, y, w, h) => box(ctx, x, y, w, h)); }
  // the figure adapter calls this with the figure's feet, scale and options
  G.__regFig = (ctx, x, y, S, q) => { if (!REG) return; const fx = q.face === 1 ? 1 : -1, hx = x + fx * 17 * S * (q.front ? 0 : 1), hy = y - 376 * S; const [sx, sy, k] = tp(ctx, hx, hy), [fx2, fy2] = tp(ctx, x, y);
    REG.figs.push({ x: sx, y: sy, r: 72 * S * k, feet: fy2, fx: fx2, speak: !!q.speak, walk: !!q.walk, front: !!q.front }); };
  // ---- choose a framing for a beat ----
  const inFrame = f => f.x > 40 && f.x < W - 40 && f.y > 30 && f.y < H - 40 && f.r > 9;
  function viewOf(cx, cy, z) { const vw = W / z, vh = H / z; cx = clamp(cx, vw / 2, W - vw / 2); cy = clamp(cy, vh / 2, H - vh / 2); return { cx, cy, z, x0: cx - vw / 2, y0: cy - vh / 2, x1: cx + vw / 2, y1: cy + vh / 2 }; }
  // a framing must not slice a text box: each box is wholly inside or wholly outside
  const clean = (v, boxes) => boxes.every(([a, b, c, d]) => (c < v.x0 || a > v.x1 || d < v.y0 || b > v.y1) || (a >= v.x0 + 10 && c <= v.x1 - 10 && b >= v.y0 + 10 && d <= v.y1 - 10));
  function fit(cx, cy, z, boxes, zMin) { for (let zz = z; zz >= zMin; zz -= .08) { const v = viewOf(cx, cy, zz); if (clean(v, boxes)) return v; } return null; }
  const PATTERN = ['close', 'react', 'insert', 'two', 'close', 'wide2', 'react', 'insert', 'close', 'two'];
  function frame(reg, bi, prevKind, prev) { if (bi === 0) return null; if (reg.nMax > reg.n0 && prevKind) return { kind: 'pop', cx: 640, cy: 360, z: 1 }; /* new text pops in: show it whole */ const figs = reg.figs.filter(f => inFrame(f) && !f.walk), boxes = reg.boxes, lead = figs.find(f => f.speak) || figs.slice().sort((a, b) => b.r - a.r)[0];
    const others = figs.filter(f => f !== lead && f.r > 14);
    for (let n = 0; n < PATTERN.length; n++) { const kind = PATTERN[(bi - 1 + n) % PATTERN.length]; let v = null; if (kind === prevKind || (kind === 'react' && prevKind === 'close' && n === 0 && false)) continue;
      if (kind === 'close' && lead && lead.r > 12) v = fit(lead.x, lead.y + lead.r * .55, clamp(H / (lead.r * 5.2), 1.45, 3), boxes, 1.35);
      else if (kind === 'react' && others.length) { const f = others[bi % others.length]; v = fit(f.x, f.y + f.r * .55, clamp(H / (f.r * 5.4), 1.45, 3), boxes, 1.35); }
      else if (kind === 'insert' && reg.photos.length) { const p = reg.photos.slice().sort((a, b) => b[2] * b[3] - a[2] * a[3])[0]; v = fit(p[0], p[1], clamp(Math.min(W * .8 / p[2], H * .8 / p[3]), 1.2, 2.4), boxes, 1.15); }
      else if (kind === 'two' && lead && others.length) { const g = [lead, others[0]]; const x0 = Math.min(...g.map(f => f.x - f.r * 2)), x1 = Math.max(...g.map(f => f.x + f.r * 2)), y0 = Math.min(...g.map(f => f.y - f.r * 1.6)), y1 = Math.max(...g.map(f => f.feet));
        v = fit((x0 + x1) / 2, (y0 + y1) / 2, clamp(Math.min(W / ((x1 - x0) * 1.25), H / ((y1 - y0) * 1.15)), 1.2, 2), boxes, 1.15); }
      else if (kind === 'wide2') { const pts = figs.length ? figs : reg.photos.map(p => ({ x: p[0], y: p[1] })); if (pts.length) { const cx = pts.reduce((s, f) => s + f.x, 0) / pts.length, cy = pts.reduce((s, f) => s + f.y, 0) / pts.length; v = fit(cx, cy, 1.22, boxes, 1.12); } }
      if (v && prev && Math.abs(v.z - prev.z) < .25 && Math.hypot(v.cx - prev.cx, v.cy - prev.cy) < 120) v = null;
      if (v) return Object.assign(v, { kind }); }
    // nothing to cut to (maps, cards): alternate gentle re-frames so the picture still moves on the beat
    return Object.assign(fit(bi % 2 ? 560 : 720, bi % 3 ? 340 : 380, 1.1, boxes, 1.04) || viewOf(640, 360, 1), { kind: 'drift' }); }
  // ---- shake on impacts ----
  const KICK = { cannon: 9, volley: 6, boom: 9, artillery: 7, explosion: 10, stamp: 4, press: 3, hammer: 4, gavel: 3, thud: 4, hit: 4, slap: 3, mg: 3, gallop: 2 };
  function shake(sfx, t) { let dx = 0, dy = 0; for (const c of sfx) { const k = KICK[c.type], u = t - c.t; if (!k || u < 0 || u > .4) continue; const a = k * (c.gain ?? 1) * 1.6 * (1 - u / .4) ** 2; dx += Math.sin(u * 83 + c.t) * a; dy += Math.cos(u * 71 + c.t * 3) * a; } return [dx, dy]; }

  // ---- background life, by the scene's ambience (js/soundmap.js): birds over open country, motes in rooms, snow, drifting smoke ----
  const OUT = { meadow: 1, forest: 1, river: 1, sea: 1, harbour: 1, wind: 1, mountain: 1, street: 1, highway: 1, ship: 1 };
  function life(ctx, amb, t, seed) { const r = k => { const x = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (OUT[amb]) { // a small flock crosses every ~9 s, wings beating
      const per = 9 + r(1) * 4, ph = ((t + r(2) * per) % per) / per; if (ph < .7) { const u = ph / .7, dir = r(3) < .5 ? 1 : -1, y0 = 70 + r(4) * 120;
        ctx.strokeStyle = 'rgba(40,30,30,.75)'; ctx.lineCap = 'round'; ctx.lineWidth = 2.2; for (let i = 0; i < 5; i++) { const x = (dir > 0 ? -60 + u * 1400 : 1340 - u * 1400) - dir * i * (26 + i * 3), y = y0 + Math.sin(i * 1.7) * 14 + i * 6, f = Math.sin(t * 14 + i * 1.3) * 6, s = 7 - i * .5;
          ctx.beginPath(); ctx.moveTo(x - s, y - f); ctx.quadraticCurveTo(x - s * .4, y - 2, x, y); ctx.quadraticCurveTo(x + s * .4, y - 2, x + s, y - f); ctx.stroke(); } } }
    if (amb === 'room' || amb === 'office' || amb === 'court' || amb === 'commons' || amb === 'tv') { ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 26; i++) { const x = (r(10 + i) * 1280 + Math.sin(t * .3 + i) * 30) % 1280, y = (r(40 + i) * 720 - t * (6 + r(70 + i) * 8)) % 720, yy = y < 0 ? y + 720 : y;
      ctx.fillStyle = `rgba(255,236,190,${.08 + .1 * Math.abs(Math.sin(t * .8 + i))})`; ctx.beginPath(); ctx.arc(x, yy, 1.4 + r(90 + i) * 1.8, 0, 7); ctx.fill(); } }
    if (amb === 'snowwind') { ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 70; i++) { const sp = 40 + r(i) * 70, x = ((r(100 + i) * 1500 + t * (30 + r(200 + i) * 50) + Math.sin(t + i) * 20) % 1400) - 60, y = (r(300 + i) * 760 + t * sp) % 760; ctx.beginPath(); ctx.arc(x, y, 1.5 + r(400 + i) * 2.5, 0, 7); ctx.fill(); } }
    if (amb === 'battle' || amb === 'trench' || amb === 'ww2') { for (let i = 0; i < 5; i++) { const x = ((r(500 + i) * 1600 + t * 18) % 1700) - 200, y = 380 + r(600 + i) * 240, rr = 140 + r(700 + i) * 160, g = ctx.createRadialGradient(x, y, 0, x, y, rr); g.addColorStop(0, 'rgba(90,80,74,.22)'); g.addColorStop(1, 'rgba(90,80,74,0)'); ctx.fillStyle = g; ctx.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      ctx.fillStyle = 'rgba(255,170,80,.8)'; for (let i = 0; i < 14; i++) { const x = (r(800 + i) * 1280 + Math.sin(t * 1.3 + i) * 40) % 1280, y = 720 - ((t * (30 + r(900 + i) * 40) + r(950 + i) * 720) % 720); ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill(); } }
    ctx.restore(); }
  // ---- wrap every scene draw ----
  function wrap(cut, duration, sfx, ambOf = () => null) { instrument(); const BT = beatTimes(duration), scratch = document.createElement('canvas'); scratch.width = W; scratch.height = H; const sctx = scratch.getContext('2d'), cache = new Map();
    const sorted = cut.slice().sort((a, b) => a[0] - b[0]);
    return sorted.map(([s0, draw, fade], i) => { const s1 = i + 1 < sorted.length ? sorted[i + 1][0] : duration; if (draw.noCover) return [s0, draw, fade];
      // this scene's beats (global beat times inside it; a tail shorter than 1.2 s merges into the previous beat)
      const bs = [s0, ...BT.filter(b => b > s0 + 1.2 && b < s1 - 1.2)];
      const f = function (ctx, lt, dur, t) { let bi = 0; while (bi + 1 < bs.length && t >= bs[bi + 1]) bi++; const bStart = bs[bi], bEnd = bi + 1 < bs.length ? bs[bi + 1] : s1;
        G.__beat = BT.findIndex(b => b > t) - 1; G.__beatIdx = bi;
        let v = cache.get(s0 + ':' + bi); if (v === undefined) { const ft = G.__frameT, sp = G.__spoke, all = { figs: [], boxes: [], photos: [] };
          // sample the beat at its start, middle and end so text that pops in mid-beat is known too; figures come from the start
          [.05, .5, .95].forEach((u, j) => { const tt = bStart + .05 + (bEnd - bStart - .1) * u; REG = { figs: [], boxes: [], photos: [] }; sctx.setTransform(1, 0, 0, 1, 0, 0); sctx.save(); G.__frameT = tt; G.__spoke = false;
            try { draw(sctx, tt - s0, dur, tt); } catch (e) { } sctx.restore(); if (j === 0) { all.figs = REG.figs; all.photos = REG.photos; all.n0 = REG.boxes.length; } all.nMax = Math.max(all.nMax || 0, REG.boxes.length); all.boxes.push(...REG.boxes); });
          G.__frameT = ft; G.__spoke = sp; REG = null; const prev = bi > 0 ? cache.get(s0 + ':' + (bi - 1)) : null; v = frame(all, bi, prev ? prev.kind : 'wide', prev || { z: 1, cx: 640, cy: 360 }); cache.set(s0 + ':' + bi, v); }
        const k = ease(clamp((t - bStart) / Math.max(1, bEnd - bStart), 0, 1)), [sx, sy] = shake(sfx, t);
        let z = 1, cx = 640, cy = 360; if (v) { z = v.z * (1 + .05 * k); cx = v.cx; cy = v.cy; } else { z = 1 + .035 * k; }
        if (sx || sy) z *= 1.02; const vv = viewOf(cx, cy, z);
        ctx.translate(640 + sx, 360 + sy); ctx.scale(z, z); ctx.translate(-vv.cx, -vv.cy);
        const out = draw(ctx, lt, dur, t); const amb = ambOf(draw.name, s0); if (amb) life(ctx, amb, t, Math.round(s0)); return out; };
      Object.defineProperty(f, 'name', { value: draw.name }); return [s0, f, fade >= .5 ? .5 : 0]; }); }
  // ---- a scan for the sound pass: when do text boxes, photos and figures appear? (tools/autosfx.mjs writes js/autosfx.js) ----
  function scan(cut, duration, step = .1) { instrument(); const sorted = cut.slice().sort((a, b) => a[0] - b[0]), cv = document.createElement('canvas'); cv.width = W; cv.height = H; const g = cv.getContext('2d'), ev = [];
    sorted.forEach(([s0, draw], i) => { const s1 = i + 1 < sorted.length ? sorted[i + 1][0] : duration; let prev = null; if (i > 0) ev.push([s0, 'cut']);
      for (let t = s0 + .02; t < s1; t += step) { REG = { figs: [], boxes: [], photos: [] }; g.setTransform(1, 0, 0, 1, 0, 0); g.save(); G.__frameT = t; G.__spoke = false; try { draw(g, t - s0, s1 - s0, t); } catch (e) { } g.restore();
        const c = [REG.boxes.length, REG.photos.length, REG.figs.length]; REG = null; if (prev) { if (c[0] > prev[0]) ev.push([+t.toFixed(2), 'text']); if (c[1] > prev[1]) ev.push([+t.toFixed(2), 'photo']); if (c[2] > prev[2]) ev.push([+t.toFixed(2), 'figure']); } prev = c; } });
    return ev; }
  G.Coverage = { wrap, beatTimes, scan };
})(window);
