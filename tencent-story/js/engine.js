/* Hand-drawn collage engine — plain Canvas 2D, no dependencies.
 * Everything is drawn procedurally: torn paper cutouts, wobbly ink lines that
 * "boil" at 8 fps, masking tape, ransom-note lettering and rubber stamps. */
(function (G) {
  'use strict';
  const W = 1280, H = 720;
  const INK = '#2b2118';
  const PAL = {
    cream: '#f4ead5', kraft: '#d8b98c', red: '#d9472b', teal: '#2f8f8a',
    mustard: '#e6b23a', blue: '#3c6fb0', pink: '#ec9a9a', green: '#7fae5a',
    navy: '#28385e', brown: '#9a6a3f', white: '#fbf7ee', grey: '#b9b2a4',
  };

  // ---------- math ----------
  function rng(seed) {
    let s = (seed >>> 0) || 0x9e3779b9;
    return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }
  function hash() {
    let h = 2166136261;
    for (let i = 0; i < arguments.length; i++) { h ^= Math.round(arguments[i] * 997) | 0; h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = {
    outCubic: k => 1 - Math.pow(1 - k, 3),
    inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
    outBack: k => { const c = 1.9; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); },
    outElastic: k => k === 0 || k === 1 ? k : Math.pow(2, -10 * k) * Math.sin((k * 10 - .75) * (2 * Math.PI / 3)) + 1,
  };

  // Global clock state set by the player each frame.
  const E = { t: 0, boil: 0 };

  // ---------- shape point generators ----------
  function rectPts(x, y, w, h, seg = 4) {
    const p = [];
    const edge = (x1, y1, x2, y2) => { for (let i = 0; i < seg; i++) p.push([lerp(x1, x2, i / seg), lerp(y1, y2, i / seg)]); };
    edge(x, y, x + w, y); edge(x + w, y, x + w, y + h); edge(x + w, y + h, x, y + h); edge(x, y + h, x, y);
    return p;
  }
  function ellipsePts(cx, cy, rx, ry, n = 18) {
    const p = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; p.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
    return p;
  }
  // Densify a polygon then push points in/out to fake a torn paper edge.
  function torn(pts, amp, seed, step = 9) {
    const r = rng(seed), out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(d / step));
      const nx = -(b[1] - a[1]) / (d || 1), ny = (b[0] - a[0]) / (d || 1);
      for (let j = 0; j < n; j++) {
        const k = j / n, o = (r() - .5) * amp;
        out.push([lerp(a[0], b[0], k) + nx * o, lerp(a[1], b[1], k) + ny * o]);
      }
    }
    return out;
  }
  function pathPts(ctx, p, closed = true) {
    ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
    if (closed) ctx.closePath();
  }

  // ---------- paper texture ----------
  let texPattern = null, bgCanvas = null;
  function makeTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d'), r = rng(42), img = g.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 200 + r() * 55;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    g.strokeStyle = 'rgba(120,100,70,0.12)'; g.lineWidth = 0.7;
    for (let i = 0; i < 70; i++) { // paper fibres
      const x = r() * 256, y = r() * 256, a = r() * Math.PI, l = 4 + r() * 14;
      g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + r() * 6, y + r() * 6, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
    }
    return c;
  }
  function texture(ctx) {
    if (!texPattern) texPattern = ctx.createPattern(makeTexture(), 'repeat');
    return texPattern;
  }

  function background(ctx, tint = PAL.cream) {
    if (!bgCanvas || bgCanvas.tint !== tint) {
      bgCanvas = document.createElement('canvas'); bgCanvas.width = W; bgCanvas.height = H; bgCanvas.tint = tint;
      const g = bgCanvas.getContext('2d'), r = rng(7);
      g.fillStyle = tint; g.fillRect(0, 0, W, H);
      g.globalCompositeOperation = 'multiply'; g.globalAlpha = 0.55;
      g.fillStyle = texture(g); g.fillRect(0, 0, W, H);
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      // faint blotches like old card stock
      for (let i = 0; i < 26; i++) {
        const x = r() * W, y = r() * H, rad = 40 + r() * 160;
        const grd = g.createRadialGradient(x, y, 0, x, y, rad);
        grd.addColorStop(0, 'rgba(170,130,80,0.06)'); grd.addColorStop(1, 'rgba(170,130,80,0)');
        g.fillStyle = grd; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }
      const v = g.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .95);
      v.addColorStop(0, 'rgba(60,35,10,0)'); v.addColorStop(1, 'rgba(60,35,10,0.32)');
      g.fillStyle = v; g.fillRect(0, 0, W, H);
    }
    ctx.drawImage(bgCanvas, 0, 0);
  }

  // ---------- ink strokes ----------
  function ink(ctx, pts, o = {}) {
    const closed = o.closed !== false, jit = o.jit ?? 2.2, w = o.width ?? 3;
    const r = rng(hash(o.seed || 1, E.boil));
    ctx.save();
    ctx.strokeStyle = o.color || INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const passes = o.passes ?? 2;
    for (let pass = 0; pass < passes; pass++) {
      const p = pts.map(([x, y]) => [x + (r() - .5) * jit, y + (r() - .5) * jit]);
      ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
      const n = closed ? p.length : p.length - 1;
      for (let i = 0; i < n; i++) {
        const a = p[i], b = p[(i + 1) % p.length];
        ctx.quadraticCurveTo((a[0] + b[0]) / 2 + (r() - .5) * jit * 1.4, (a[1] + b[1]) / 2 + (r() - .5) * jit * 1.4, b[0], b[1]);
      }
      ctx.globalAlpha = (o.alpha ?? 1) * (pass ? .5 : 1);
      ctx.lineWidth = pass ? w * .55 : w;
      ctx.stroke();
    }
    ctx.restore();
  }
  function line(ctx, x1, y1, x2, y2, o = {}) {
    const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 40));
    const p = []; for (let i = 0; i <= n; i++) p.push([lerp(x1, x2, i / n), lerp(y1, y2, i / n)]);
    ink(ctx, p, Object.assign({ closed: false }, o));
  }
  // Hatching clipped to a polygon — gives the pencil-shaded look.
  function hatch(ctx, pts, o = {}) {
    const gap = o.gap || 9, ang = o.angle ?? -0.8, r = rng(hash(o.seed || 3, E.boil));
    ctx.save(); pathPts(ctx, pts); ctx.clip();
    ctx.strokeStyle = o.color || 'rgba(43,33,24,0.35)'; ctx.lineWidth = o.width || 1.4;
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const R = Math.hypot(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    ctx.translate(cx, cy); ctx.rotate(ang);
    ctx.beginPath();
    for (let y = -R; y < R; y += gap) { ctx.moveTo(-R, y + (r() - .5) * 2); ctx.lineTo(R, y + (r() - .5) * 2); }
    ctx.stroke(); ctx.restore();
  }

  // ---------- paper cutouts ----------
  // pts: base polygon. Draws drop shadow, white torn core, colored face, texture, ink outline.
  function cutout(ctx, pts, o = {}) {
    const seed = o.seed || 11;
    const edge = torn(pts, o.tear ?? 4, seed);
    ctx.save();
    if (o.shadow !== false) {
      ctx.save(); ctx.translate(o.sx ?? 5, o.sy ?? 6);
      pathPts(ctx, edge); ctx.fillStyle = 'rgba(55,35,15,0.28)'; ctx.fill(); ctx.restore();
    }
    if (o.core !== false) { // the white fibrous rim a torn sheet shows
      const rim = torn(pts, (o.tear ?? 4) * 1.6, seed + 1);
      pathPts(ctx, rim); ctx.fillStyle = PAL.white; ctx.fill();
    }
    const face = o.core !== false ? torn(insetPts(pts, 2.5), o.tear ?? 4, seed + 2) : edge;
    pathPts(ctx, face); ctx.fillStyle = o.fill || PAL.kraft; ctx.fill();
    ctx.save(); ctx.clip();
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = o.texAlpha ?? 0.5;
    ctx.fillStyle = texture(ctx); ctx.fillRect(-W, -H, W * 3, H * 3);
    ctx.restore();
    if (o.hatch) hatch(ctx, face, Object.assign({ seed }, o.hatch));
    if (o.outline !== false) ink(ctx, pts, { seed: seed + 5, width: o.lineWidth ?? 2.6, jit: o.jit ?? 2.4, alpha: o.inkAlpha ?? .9 });
    ctx.restore();
    return face;
  }
  function insetPts(pts, d) {
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    return pts.map(([x, y]) => { const l = Math.hypot(x - cx, y - cy) || 1; return [x - (x - cx) / l * d, y - (y - cy) / l * d]; });
  }

  function tape(ctx, x, y, w, ang = 0, seed = 1) {
    const h = 26, r = rng(seed);
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    const p = [];
    for (let i = 0; i <= 5; i++) p.push([-w / 2 + (i % 2 ? 4 : 0) + r() * 2, -h / 2 + i * h / 5]);
    for (let i = 5; i >= 0; i--) p.push([w / 2 - (i % 2 ? 4 : 0) - r() * 2, -h / 2 + i * h / 5]);
    pathPts(ctx, p); ctx.fillStyle = 'rgba(236,222,180,0.78)'; ctx.fill();
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .35; ctx.fillStyle = texture(ctx); ctx.fill();
    ctx.restore();
  }

  // ---------- lettering ----------
  const RANSOM_FONTS = ['DejaVu Serif', 'Liberation Sans', 'FreeSerif', 'Courier 10 Pitch', 'DejaVu Sans', 'Liberation Serif'];
  const CHIP_COLORS = [PAL.white, PAL.mustard, PAL.cream, PAL.pink, PAL.teal, PAL.white, PAL.kraft, PAL.red, PAL.navy];
  // Ransom-note headline: every letter on its own scrap. p = 0..1 reveal.
  function ransom(ctx, text, x, y, o = {}) {
    const size = o.size || 48, seed = o.seed || 5, r = rng(seed), p = o.p ?? 1;
    const letters = [...text].map((ch, i) => {
      const font = RANSOM_FONTS[Math.floor(r() * RANSOM_FONTS.length)];
      const bold = r() > .35 ? 'bold ' : '', ital = r() > .8 ? 'italic ' : '';
      const s = size * (0.85 + r() * 0.35);
      const chip = CHIP_COLORS[Math.floor(r() * CHIP_COLORS.length)];
      return { ch, f: `${ital}${bold}${Math.round(s)}px "${font}"`, s, chip, rot: (r() - .5) * 0.28, dy: (r() - .5) * size * .18, i };
    });
    ctx.save();
    let total = 0;
    letters.forEach(l => { ctx.font = l.f; l.w = l.ch === ' ' ? size * .45 : ctx.measureText(l.ch).width + size * .22; total += l.w + 2; });
    let cx = o.align === 'left' ? x : x - total / 2;
    const n = letters.length;
    letters.forEach((l, i) => {
      const k = clamp(p * (n + 4) - i, 0, 1);
      if (l.ch !== ' ' && k > 0) {
        const sc = ease.outBack(k);
        ctx.save(); ctx.translate(cx + l.w / 2, y + l.dy); ctx.rotate(l.rot + (1 - k) * .6); ctx.scale(sc, sc);
        const hw = l.w / 2, hh = l.s * .62;
        cutout(ctx, rectPts(-hw, -hh, l.w, hh * 2, 1), { fill: l.chip, seed: seed * 31 + i, tear: 2.5, outline: false, sx: 2, sy: 3, texAlpha: .4 });
        const dark = [PAL.teal, PAL.red, PAL.navy].includes(l.chip);
        ctx.fillStyle = dark ? PAL.white : INK; ctx.font = l.f; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(l.ch, 0, l.s * .05);
        ctx.restore();
      }
      cx += l.w + 2;
    });
    ctx.restore();
  }
  // Typewriter label on a scrap of paper (tag).
  function label(ctx, text, x, y, o = {}) {
    const size = o.size || 26;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    const sc = o.scale ?? 1; ctx.scale(sc, sc);
    ctx.font = `bold ${size}px "Courier 10 Pitch", "DejaVu Sans Mono", monospace`;
    const w = ctx.measureText(text).width + size * 1.1, h = size * 1.7;
    cutout(ctx, rectPts(-w / 2, -h / 2, w, h, 2), { fill: o.fill || PAL.white, seed: o.seed || 77, tear: 3, lineWidth: 2 });
    ctx.fillStyle = o.color || INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 2);
    if (o.tape !== false) tape(ctx, 0, -h / 2, Math.min(w * .5, 90), (o.rot || 0) * -2 + .1, o.seed || 3);
    ctx.restore();
  }
  // Rubber stamp that slams down: k goes 0..1.
  function stamp(ctx, text, x, y, k, o = {}) {
    if (k <= 0) return;
    const sc = k < 1 ? lerp(2.4, 1, ease.outCubic(k)) : 1;
    const a = k < 1 ? ease.outCubic(k) : 1;
    const size = o.size || 44, color = o.color || PAL.red;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12); ctx.scale(sc, sc);
    ctx.globalAlpha = 0.88 * a; ctx.globalCompositeOperation = 'multiply';
    ctx.font = `bold ${size}px "DejaVu Sans", sans-serif`;
    const w = ctx.measureText(text).width + size * .9, h = size * 1.6;
    ink(ctx, rectPts(-w / 2, -h / 2, w, h, 3), { seed: 401, color, width: 5, jit: 2.5, passes: 1 });
    ink(ctx, rectPts(-w / 2 + 7, -h / 2 + 7, w - 14, h - 14, 3), { seed: 402, color, width: 2, jit: 2, passes: 1 });
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 2);
    // speckle the ink so it reads as rubber
    ctx.globalCompositeOperation = 'destination-out'; const r = rng(9);
    for (let i = 0; i < 90; i++) { ctx.beginPath(); ctx.arc((r() - .5) * w, (r() - .5) * h, r() * 2.2, 0, 7); ctx.fill(); }
    ctx.restore();
  }

  // ---------- doodle props ----------
  function person(ctx, x, y, s, o = {}) {
    const seed = o.seed || 21;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
    // arms
    const wave = o.wave ? Math.sin(E.t * 9 + seed) * .5 : 0;
    line(ctx, -34, -70, -62, -30 - wave * 40, { seed: seed + 1, width: 4 });
    line(ctx, 34, -70, 62, -30 + wave * 40, { seed: seed + 2, width: 4 });
    // body (trapezoid shirt)
    cutout(ctx, [[-30, -95], [30, -95], [44, 0], [-44, 0]], { fill: o.shirt || PAL.blue, seed, tear: 3, hatch: { gap: 10, seed } });
    // legs
    line(ctx, -16, 0, -20, 36, { seed: seed + 3, width: 4 }); line(ctx, 16, 0, 20, 36, { seed: seed + 4, width: 4 });
    // head
    if (!o.noHead) head(ctx, 0, -128, o, seed);
    ctx.restore();
  }
  function head(ctx, x, y, o, seed) {
    cutout(ctx, ellipsePts(x, y, 30, 34, 16), { fill: o.skin || '#f1c9a0', seed: seed + 7, tear: 2 });
    // hair scribble
    const hp = []; for (let i = 0; i <= 10; i++) hp.push([x - 30 + i * 6, y - 22 - (i % 2 ? 12 : 4)]);
    ink(ctx, hp, { closed: false, seed: seed + 8, width: 4, color: o.hair || INK });
    ctx.fillStyle = INK;
    const blink = (Math.floor(E.t * 3 + seed) % 11) === 0 ? .2 : 1;
    ctx.save(); ctx.translate(x, y);
    ctx.beginPath(); ctx.ellipse(-10, -2, 3, 3.5 * blink, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(10, -2, 3, 3.5 * blink, 0, 0, 7); ctx.fill();
    ctx.restore();
    ink(ctx, [[x - 10, y + 12], [x, y + 18], [x + 10, y + 12]], { closed: false, seed: seed + 9, width: 2.5 });
  }
  function horseHead(ctx, x, y, s, seed = 90) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pts = [[-18, -60], [-4, -78], [4, -58], [22, -44], [52, -6], [56, 14], [44, 24], [20, 14], [8, 4], [10, 40], [-30, 40], [-34, 0], [-30, -36]];
    cutout(ctx, pts, { fill: PAL.brown, seed, tear: 3, hatch: { gap: 8, seed, angle: .7 } });
    // mane
    const m = []; for (let i = 0; i < 9; i++) m.push([-30 - (i % 2 ? 12 : 0), -44 + i * 10]);
    ink(ctx, m, { closed: false, seed: seed + 1, width: 5, color: INK });
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(14, -24, 4, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(46, 10, 3, 0, 7); ctx.fill();
    ink(ctx, [[28, 18], [38, 20], [46, 17]], { closed: false, seed: seed + 2, width: 2.5 });
    ctx.restore();
  }
  function building(ctx, x, y, w, h, o = {}) {
    const seed = o.seed || 50;
    cutout(ctx, rectPts(x, y - h, w, h, 3), { fill: o.fill || PAL.grey, seed, tear: 3 });
    const r = rng(seed);
    for (let wy = y - h + 14; wy < y - 22; wy += 22) for (let wx = x + 10; wx < x + w - 16; wx += 20) {
      if (r() < .25) continue;
      ink(ctx, rectPts(wx, wy, 9, 11, 1), { seed: seed + wx + wy, width: 1.6, jit: 1.2, passes: 1 });
      if (r() < .4) { ctx.fillStyle = 'rgba(230,178,58,0.7)'; ctx.fillRect(wx + 1, wy + 1, 7, 9); }
    }
  }
  function sun(ctx, x, y, r0, seed = 60) {
    const rays = [];
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2 + E.t * .25;
      line(ctx, x + Math.cos(a) * (r0 + 10), y + Math.sin(a) * (r0 + 10), x + Math.cos(a) * (r0 + 30), y + Math.sin(a) * (r0 + 30), { seed: seed + i, width: 3, color: '#c9861f' });
    }
    cutout(ctx, ellipsePts(x, y, r0, r0, 20), { fill: PAL.mustard, seed, tear: 3 });
    return rays;
  }
  function cloud(ctx, x, y, s, seed = 70) {
    const p = [];
    for (let i = 0; i < 20; i++) {
      const a = i / 20 * Math.PI * 2, bump = 1 + .18 * Math.sin(a * 5);
      p.push([x + Math.cos(a) * 60 * s * bump, y + Math.sin(a) * 26 * s * bump]);
    }
    cutout(ctx, p, { fill: PAL.white, seed, tear: 2, lineWidth: 2 });
  }
  function palm(ctx, x, y, s, seed = 80) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sway = Math.sin(E.t * 1.6 + seed) * 4;
    cutout(ctx, [[-6, 0], [6, 0], [4 + sway, -110], [-4 + sway, -110]], { fill: PAL.brown, seed, tear: 2, lineWidth: 2 });
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * .55, cx = sway, cy = -110;
      const ex = cx + Math.cos(a) * 70, ey = cy + Math.sin(a) * 40 + 24;
      cutout(ctx, [[cx, cy], [(cx + ex) / 2 + 6, (cy + ey) / 2 - 18], [ex, ey], [(cx + ex) / 2 - 6, (cy + ey) / 2 - 2]], { fill: PAL.green, seed: seed + i, tear: 2, lineWidth: 2 });
    }
    ctx.restore();
  }

  // A torn sheet of paper that sweeps across as a scene transition. k: 0..1
  function paperWipe(ctx, k, fill = PAL.kraft, seed = 300) {
    if (k <= 0 || k >= 1) return;
    const x = lerp(-W * 1.2, W * 1.2, ease.inOut(k));
    ctx.save(); ctx.translate(x, 0); ctx.rotate(-0.06);
    cutout(ctx, rectPts(-40, -120, W + 80, H + 240, 6), { fill, seed, tear: 18, outline: false, sx: 14, sy: 0 });
    ctx.restore();
  }

  // ---------- player ----------
  // scenes: [{start, end, draw(ctx, localT, t)}]. Renders the right scene for time t.
  function renderFrame(ctx, scenes, t) {
    E.t = t; E.boil = Math.floor(t * 8);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    for (const s of scenes) if (t >= s.start && t < s.end) s.draw(ctx, t - s.start, t);
  }

  G.Collage = {
    W, H, INK, PAL, E, rng, hash, clamp, prog, lerp, ease,
    rectPts, ellipsePts, torn, pathPts, background, ink, line, hatch, cutout, tape,
    ransom, label, stamp, person, head, horseHead, building, sun, cloud, palm, paperWipe, renderFrame,
  };
})(window);
