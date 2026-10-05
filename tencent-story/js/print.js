/* Vintage print-collage toolkit (builds on engine.js).
 * Looks like cut-up mid-century magazine pages: halftone dot shading, ink
 * misregistration, aged paper, fake newsprint columns, scissor-cut word strips.
 * Every image is drawn procedurally; nothing is copied from real print ads. */
(function (G) {
  'use strict';
  const C = G.Collage;
  const { W, H, rng, lerp, clamp } = C;

  const INK = {
    black: '#1c1714', red: '#b5402c', mustard: '#e3a92c', teal: '#3f7f7a',
    cream: '#efe4c8', paper: '#e9dcbc', yellow: '#f0c23b', navy: '#24324f',
  };

  // ---------- canvases ----------
  function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  // Aged paper fill on a 2D context.
  function paper(g, color, seed = 1) {
    const w = g.canvas.width, h = g.canvas.height, r = rng(seed);
    g.fillStyle = color; g.fillRect(0, 0, w, h);
    g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = .45;
    g.fillStyle = textureOf(g); g.fillRect(0, 0, w, h); g.restore();
    for (let i = 0; i < 18; i++) { // foxing / age blotches
      const x = r() * w, y = r() * h, rad = 60 + r() * 220;
      const grd = g.createRadialGradient(x, y, 0, x, y, rad);
      grd.addColorStop(0, 'rgba(140,95,40,0.07)'); grd.addColorStop(1, 'rgba(140,95,40,0)');
      g.fillStyle = grd; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
  }
  let texCanvas = null;
  function textureOf(g) {
    if (!texCanvas) {
      texCanvas = canvas(256, 256); const t = texCanvas.getContext('2d'), r = rng(42);
      const img = t.createImageData(256, 256);
      for (let i = 0; i < img.data.length; i += 4) { const v = 205 + r() * 50; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
      t.putImageData(img, 0, 0);
    }
    return g.createPattern(texCanvas, 'repeat');
  }

  // ---------- halftone ----------
  // Turns a mask (ink density = alpha) into a dot screen drawn onto dst.
  function halftone(dst, mask, o = {}) {
    const cell = o.cell || 6, ang = o.angle ?? .26, w = mask.width, h = mask.height;
    const d = mask.getContext('2d').getImageData(0, 0, w, h).data;
    const cos = Math.cos(ang), sin = Math.sin(ang), R = Math.hypot(w, h) / 2 + cell;
    const ox = o.ox || 0, oy = o.oy || 0;
    dst.save(); dst.fillStyle = o.color || INK.black; dst.globalAlpha = o.alpha ?? .94;
    if (o.blend) dst.globalCompositeOperation = o.blend;
    dst.beginPath();
    for (let v = -R; v < R; v += cell) for (let u = -R; u < R; u += cell) {
      const x = w / 2 + u * cos - v * sin, y = h / 2 + u * sin + v * cos;
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const a = d[((y | 0) * w + (x | 0)) * 4 + 3] / 255;
      if (a < .04) continue;
      const rad = Math.sqrt(a) * cell * .64;
      dst.moveTo(x + ox + rad, y + oy); dst.arc(x + ox, y + oy, rad, 0, Math.PI * 2);
    }
    dst.fill(); dst.restore();
  }
  // Build an image from ink layers. layers: [{color, cell, angle, draw(g, w, h), solid?, reg:[dx,dy]}]
  function plate(w, h, bg, layers, seed = 1) {
    const out = canvas(w, h), g = out.getContext('2d');
    if (bg) paper(g, bg, seed);
    for (const L of layers) {
      const m = canvas(w, h), mg = m.getContext('2d');
      mg.fillStyle = mg.strokeStyle = '#000';
      L.draw(mg, w, h);
      const [dx, dy] = L.reg || [0, 0]; // slight misregistration per ink
      if (L.solid) { // flat ink: tint the mask and print it with a little texture
        mg.globalCompositeOperation = 'source-in'; mg.fillStyle = L.color; mg.fillRect(0, 0, w, h);
        g.save(); g.globalAlpha = L.alpha ?? .95; g.globalCompositeOperation = L.blend || 'multiply'; g.drawImage(m, dx, dy); g.restore();
      } else {
        halftone(g, m, { color: L.color, cell: L.cell, angle: L.angle, ox: dx, oy: dy, alpha: L.alpha, blend: L.blend || 'multiply' });
      }
    }
    // overall wear: re-apply paper texture on top so inks look absorbed
    g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = .25; g.fillStyle = textureOf(g); g.fillRect(0, 0, w, h); g.restore();
    return out;
  }

  // ---------- fake newsprint ----------
  const SYL = ['ta', 'ren', 'mo', 'li', 'sha', 'ver', 'an', 'dul', 'pe', 'ri', 'os', 'ke', 'tor', 'na', 'bel', 'si', 'com', 'pra', 'u', 'gel', 'fa', 'is'];
  function fakeWord(r) { let s = ''; const n = 1 + Math.floor(r() * 3); for (let i = 0; i < n; i++) s += SYL[Math.floor(r() * SYL.length)]; return s; }
  function newsprint(g, x, y, w, h, o = {}) {
    const r = rng(o.seed || 9), size = o.size || 15, cols = o.cols || 2, gap = 18;
    const cw = (w - gap * (cols - 1)) / cols, lh = size * 1.3;
    g.save(); g.fillStyle = o.color || 'rgba(28,23,20,0.85)'; g.font = `${size}px "Liberation Serif"`; g.textBaseline = 'top';
    for (let c = 0; c < cols; c++) {
      for (let ly = 0; ly + lh <= h; ly += lh) {
        const words = []; let tw = 0;
        while (true) { const wd = fakeWord(r); const ww = g.measureText(wd).width; if (tw + ww + size * .3 * words.length > cw) break; words.push([wd, ww]); tw += ww; }
        const last = r() < .1, space = last ? size * .3 : (cw - tw) / Math.max(1, words.length - 1);
        let cx = x + c * (cw + gap);
        for (const [wd, ww] of words) { g.fillText(wd, cx, y + ly); cx += ww + space; }
      }
    }
    g.restore();
  }

  // ---------- scissor-cut word strip ----------
  // Appears with a hard 2-frame "slap" (no soft easing), like a pasted cutout.
  function strip(ctx, text, x, y, o = {}) {
    const lt = o.lt ?? 1; if (lt < 0) return;
    const size = o.size || 54, font = o.font || `italic bold ${size}px "FreeSerif"`;
    const r = rng(o.seed || 3);
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.04);
    const slap = lt < .07 ? 1.07 : 1; ctx.scale(slap, slap);
    ctx.font = font;
    const tw = ctx.measureText(text).width, padX = o.padX ?? size * .35, padY = o.padY ?? size * .2;
    const w = tw + padX * 2, h = size * 1.05 + padY * 2, ax = o.align === 'left' ? 0 : -w / 2;
    const p = [[ax + r() * 4, -h / 2 + r() * 3], [ax + w - r() * 4, -h / 2 + r() * 3], [ax + w - r() * 4, h / 2 - r() * 3], [ax + r() * 4, h / 2 - r() * 3]];
    if (o.bg !== 'none') {
      ctx.save(); ctx.translate(4, 6); C.pathPts(ctx, p); ctx.fillStyle = 'rgba(20,12,5,0.35)'; ctx.fill(); ctx.restore();
      C.pathPts(ctx, p); ctx.fillStyle = o.bg || INK.cream; ctx.fill();
      ctx.save(); ctx.clip(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .45; ctx.fillStyle = textureOf(ctx); ctx.fillRect(ax, -h, w, h * 2); ctx.restore();
    }
    ctx.fillStyle = o.fg || INK.black; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    if (o.squash) { ctx.save(); ctx.scale(o.squash, 1); ctx.fillText(text, (ax + padX) / o.squash, size * .06); ctx.restore(); }
    else ctx.fillText(text, ax + padX, size * .06);
    ctx.restore();
  }

  // ---------- post: grain, weave, vignette ----------
  let grains = null, vign = null;
  function post(ctx, t) {
    if (!grains) {
      grains = [0, 1, 2, 3].map(i => {
        const c = canvas(640, 360), g = c.getContext('2d'), r = rng(100 + i), img = g.createImageData(640, 360);
        for (let k = 0; k < img.data.length; k += 4) { const v = 128 + (r() - .5) * 120; img.data[k] = img.data[k + 1] = img.data[k + 2] = v; img.data[k + 3] = 255; }
        g.putImageData(img, 0, 0);
        for (let s = 0; s < 6; s++) { g.fillStyle = 'rgba(40,30,20,0.5)'; g.fillRect(r() * 640, r() * 360, 1 + r() * 2, 1 + r() * 2); } // dust
        return c;
      });
      vign = canvas(W, H); const v = vign.getContext('2d');
      const grd = v.createRadialGradient(W / 2, H / 2, H * .4, W / 2, H / 2, H * 1.0);
      grd.addColorStop(0, 'rgba(30,18,6,0)'); grd.addColorStop(1, 'rgba(30,18,6,0.45)');
      v.fillStyle = grd; v.fillRect(0, 0, W, H);
    }
    ctx.save();
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .16;
    ctx.drawImage(grains[Math.floor(t * 12) % 4], 0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    ctx.drawImage(vign, 0, 0);
    ctx.restore();
  }

  // ---------- shot sequencer ----------
  // shot: {start, end, build(): canvas (oversized), zoom:[a,b], drift:[dx,dy], overlay(ctx, lt, dur)}
  function shotsToScenes(shots) {
    return shots.map(s => ({
      start: s.start, end: s.end,
      draw(ctx, lt) {
        if (!s.cache) s.cache = s.build();
        const dur = s.end - s.start, k = clamp(lt / dur);
        const [z0, z1] = s.zoom || [1, 1.06], [dx, dy] = s.drift || [0, 0];
        const z = lerp(z0, z1, k);
        const weave = [Math.sin(Math.floor(C.E.t * 12) * 1.7) * .8, Math.cos(Math.floor(C.E.t * 12) * 2.3) * .6];
        ctx.save();
        ctx.translate(W / 2 + dx * k + weave[0], H / 2 + dy * k + weave[1]); ctx.scale(z, z);
        ctx.drawImage(s.cache, -s.cache.width / 2, -s.cache.height / 2);
        if (s.overlay) { ctx.translate(-W / 2, -H / 2); s.overlay(ctx, lt, dur); }
        ctx.restore();
        post(ctx, C.E.t);
        if (s.after) s.after(ctx, lt, dur);
      },
    }));
  }

  // ---------- original figures ----------
  // A generic mid-century "ad illustration" bust. Draws into two mask layers:
  // L.tone (skin/tie, printed red) and L.key (hair/suit/features, printed black).
  function bust(L, cx, cy, s, o = {}) {
    const T = L.tone, K = L.key;
    for (const g of [T, K]) { g.save(); g.translate(cx, cy); g.scale(s, s); if (o.flip) g.scale(-1, 1); }
    // suit
    const sg = K.createLinearGradient(-170, 0, 170, 0);
    sg.addColorStop(0, `rgba(0,0,0,${o.suit ?? .8})`); sg.addColorStop(.6, `rgba(0,0,0,${(o.suit ?? .8) * .55})`); sg.addColorStop(1, `rgba(0,0,0,${o.suit ?? .8})`);
    K.fillStyle = sg; K.beginPath();
    K.moveTo(-175, 340); K.bezierCurveTo(-170, 175, -125, 128, -42, 106); K.lineTo(42, 106); K.bezierCurveTo(125, 128, 170, 175, 175, 340); K.closePath(); K.fill();
    K.globalCompositeOperation = 'destination-out';
    K.beginPath(); K.moveTo(-40, 102); K.lineTo(40, 102); K.lineTo(0, 225); K.closePath(); K.fill();
    K.globalCompositeOperation = 'source-over';
    // lapels
    K.fillStyle = 'rgba(0,0,0,.95)';
    K.beginPath(); K.moveTo(-42, 106); K.lineTo(-8, 225); K.lineTo(-60, 170); K.closePath(); K.fill();
    K.beginPath(); K.moveTo(42, 106); K.lineTo(8, 225); K.lineTo(60, 170); K.closePath(); K.fill();
    // collar
    K.lineWidth = 3; K.strokeStyle = 'rgba(0,0,0,.8)';
    K.beginPath(); K.moveTo(-34, 100); K.lineTo(-12, 132); K.lineTo(0, 118); K.lineTo(12, 132); K.lineTo(34, 100); K.stroke();
    // tie
    T.fillStyle = 'rgba(0,0,0,1)';
    T.beginPath(); T.moveTo(-9, 120); T.lineTo(9, 120); T.lineTo(15, 200); T.lineTo(0, 224); T.lineTo(-15, 200); T.closePath(); T.fill();
    K.fillStyle = 'rgba(0,0,0,.35)'; K.beginPath(); K.moveTo(-9, 120); K.lineTo(0, 132); K.lineTo(9, 120); K.closePath(); K.fill();
    // neck
    T.fillStyle = 'rgba(0,0,0,.4)'; T.fillRect(-30, 40, 60, 66);
    K.fillStyle = 'rgba(0,0,0,.3)'; K.beginPath(); K.ellipse(0, 62, 32, 16, 0, 0, Math.PI); K.fill();
    // ears
    T.fillStyle = 'rgba(0,0,0,.55)';
    T.beginPath(); T.ellipse(-62, 6, 11, 20, 0, 0, 7); T.fill(); T.beginPath(); T.ellipse(62, 6, 11, 20, 0, 0, 7); T.fill();
    // head with shading (light from upper left)
    const hg = T.createRadialGradient(-22, -24, 8, 0, 0, 86);
    hg.addColorStop(0, 'rgba(0,0,0,.18)'); hg.addColorStop(.7, 'rgba(0,0,0,.42)'); hg.addColorStop(1, 'rgba(0,0,0,.72)');
    T.fillStyle = hg; T.beginPath(); T.ellipse(0, 0, 60, 76, 0, 0, 7); T.fill();
    // cheeks
    T.fillStyle = 'rgba(0,0,0,.18)'; T.beginPath(); T.arc(-30, 22, 14, 0, 7); T.arc(30, 22, 14, 0, 7); T.fill();
    // hair
    K.fillStyle = 'rgba(0,0,0,.96)'; K.beginPath();
    const hair = o.hair || 'part';
    if (hair === 'part') {
      K.moveTo(-62, 0); K.bezierCurveTo(-70, -70, -30, -96, 10, -92); K.bezierCurveTo(52, -90, 70, -60, 62, -4);
      K.bezierCurveTo(56, -36, 40, -50, 20, -54); K.bezierCurveTo(-10, -44, -40, -52, -54, -30); K.closePath();
    } else if (hair === 'flat') {
      K.moveTo(-62, -6); K.bezierCurveTo(-66, -80, 66, -80, 62, -6); K.bezierCurveTo(58, -44, 30, -52, 0, -52); K.bezierCurveTo(-30, -52, -58, -44, -62, -6); K.closePath();
    } else { // wavy pompadour
      K.moveTo(-60, -4); K.bezierCurveTo(-74, -96, 10, -118, 46, -86); K.bezierCurveTo(70, -66, 68, -40, 61, -4);
      K.bezierCurveTo(52, -40, 34, -56, 4, -50); K.bezierCurveTo(-24, -46, -50, -40, -60, -4); K.closePath();
    }
    K.fill();
    // brows, eyes, nose, mouth
    K.lineCap = 'round'; K.strokeStyle = 'rgba(0,0,0,.95)'; K.lineWidth = 5;
    K.beginPath(); K.moveTo(-38, -22); K.quadraticCurveTo(-24, -30, -10, -24); K.moveTo(10, -24); K.quadraticCurveTo(24, -30, 38, -22); K.stroke();
    K.fillStyle = 'rgba(0,0,0,1)';
    K.beginPath(); K.ellipse(-24, -6, 6, 5, 0, 0, 7); K.ellipse(24, -6, 6, 5, 0, 0, 7); K.fill();
    if (o.glasses) {
      K.lineWidth = 3.5; K.beginPath(); K.ellipse(-24, -6, 17, 13, 0, 0, 7); K.moveTo(41, -6); K.ellipse(24, -6, 17, 13, 0, 0, 7); K.moveTo(-7, -8); K.lineTo(7, -8); K.stroke();
    }
    K.fillStyle = 'rgba(0,0,0,.45)'; K.beginPath(); K.moveTo(4, -2); K.lineTo(12, 22); K.lineTo(0, 26); K.closePath(); K.fill();
    K.lineWidth = 4; K.beginPath(); K.moveTo(-22, 40); K.quadraticCurveTo(0, 56, 22, 40); K.stroke();
    T.fillStyle = 'rgba(0,0,0,.5)'; T.beginPath(); T.moveTo(-18, 43); T.quadraticCurveTo(0, 60, 18, 43); T.quadraticCurveTo(0, 52, -18, 43); T.fill();
    for (const g of [T, K]) g.restore();
  }

  // Original side-view horse silhouette (Catmull-Rom through hand-placed points).
  const HORSE = [[40, 110], [120, 96], [200, 100], [250, 86], [290, 42], [318, 16], [326, -12], [338, 14], [362, 32], [404, 84], [396, 104], [352, 96], [322, 92],
    [304, 132], [302, 172], [296, 244], [300, 318], [286, 330], [274, 318], [268, 244], [254, 198], [180, 204], [122, 198], [112, 244], [122, 318], [106, 330], [92, 318], [84, 250], [58, 204], [42, 152]];
  function smooth(g, pts) {
    const n = pts.length; g.beginPath();
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      if (i === 0) g.moveTo(p1[0], p1[1]);
      g.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
    }
    g.closePath();
  }
  function horse(g, x, y, s) {
    g.save(); g.translate(x, y); g.scale(s, s);
    const grd = g.createLinearGradient(0, -20, 0, 330);
    grd.addColorStop(0, 'rgba(0,0,0,.55)'); grd.addColorStop(.5, 'rgba(0,0,0,.85)'); grd.addColorStop(1, 'rgba(0,0,0,1)');
    // far-side legs, a shade lighter, so it reads as four-legged
    g.fillStyle = 'rgba(0,0,0,.7)';
    for (const [x0, lean] of [[248, -10], [96, 12]]) {
      g.beginPath(); g.moveTo(x0, 190); g.lineTo(x0 + 26, 190); g.lineTo(x0 + 22 + lean, 316); g.lineTo(x0 + 6 + lean, 326); g.lineTo(x0 + lean, 316); g.closePath(); g.fill();
    }
    g.fillStyle = grd; smooth(g, HORSE); g.fill();
    // tail
    g.fillStyle = 'rgba(0,0,0,1)'; g.beginPath(); g.moveTo(46, 108); g.bezierCurveTo(0, 130, -6, 210, 14, 250); g.bezierCurveTo(16, 200, 30, 150, 52, 130); g.closePath(); g.fill();
    // mane
    g.beginPath(); g.moveTo(250, 86); g.bezierCurveTo(270, 50, 300, 20, 322, 10); g.lineTo(312, 40); g.bezierCurveTo(296, 60, 280, 84, 262, 104); g.closePath(); g.fill();
    // eye highlight
    g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(352, 44, 5, 0, 7); g.fill();
    g.restore();
  }

  function skyline(g, x0, base, w, seed = 4) {
    const r = rng(seed); let x = x0;
    while (x < x0 + w) {
      const bw = 50 + r() * 90, bh = 90 + r() * 230;
      g.fillStyle = `rgba(0,0,0,${.65 + r() * .3})`; g.fillRect(x, base - bh, bw, bh);
      if (r() < .3) g.fillRect(x + bw / 2 - 3, base - bh - 30, 6, 30); // antenna
      g.globalCompositeOperation = 'destination-out';
      for (let wy = base - bh + 14; wy < base - 16; wy += 20) for (let wx = x + 8; wx < x + bw - 12; wx += 16) if (r() < .55) g.fillRect(wx, wy, 7, 10);
      g.globalCompositeOperation = 'source-over';
      x += bw + 6 + r() * 14;
    }
  }

  G.Print = { INK, canvas, paper, halftone, plate, newsprint, strip, post, shotsToScenes, bust, horse, skyline, smooth, textureOf };
})(window);
