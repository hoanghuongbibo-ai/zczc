/* Sketch rig — characters built from SEPARATE assets.
 * A Person is an assembly of independent parts (feet, legs, coat, shawl, arms, hands, head, face, hat), and every prop is its own
 * instance owned by one character: each soldier gets his own Musket, his own Hat, his own Lantern — nothing is shared or baked into
 * the body. Parts can be drawn on their own (asset sheet), offset (exploded view), dropped, or swapped per character.
 * Everything is a pure function of time t, so any frame renders on its own (the exporter renders frames out of order). */
(function (G) {
  'use strict';
  const INK = '#1e1a20', LW = 5;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const rng = (s) => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const mix = (a, b, k) => { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(k)).toString(16).padStart(2, '0')).join(''); };
  // fill + ink outline, with an optional inner shadow band (flat-cel look)
  function shape(ctx, fn, fill, o = {}) { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (o.shade && fill) { ctx.save(); ctx.beginPath(); fn(ctx); ctx.clip(); ctx.fillStyle = o.shade; ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 8000); ctx.save(); ctx.translate(-(o.dx ?? 8), -(o.dy ?? 0)); fn(ctx); ctx.restore(); ctx.fill('evenodd'); ctx.restore(); }
    if (o.lw !== 0) { ctx.beginPath(); fn(ctx); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = o.lw ?? LW; ctx.strokeStyle = o.stroke || INK; ctx.stroke(); } }
  const sil = (o, col) => o.silhouette ? o.silhouette : col; // silhouettes: every fill becomes the night colour
  // ======================= PROPS: each one a separate class, one instance per owner =======================
  class Musket { constructor(seed = 1) { const R = rng(seed * 97 + 3); this.seed = seed; this.len = 250 + R() * 20; this.stock = ['#7a4a2a', '#8a5a34', '#6a3e22'][seed % 3]; this.metal = '#8a8f98'; this.bayonet = R() > .5; this.sling = R() > .3; }
    // drawn with the butt at the origin, pointing up (−y); a = angle, s = scale
    draw(ctx, x, y, a = 0, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); const L = this.len;
      shape(ctx, c => { c.moveTo(-9, 0); c.lineTo(9, 0); c.lineTo(7, -70); c.lineTo(4, -L * .62); c.lineTo(-4, -L * .62); c.lineTo(-7, -70); c.closePath(); }, sil(o, this.stock), { lw: 4, shade: sil(o, mix(this.stock, '#000000', .3)), dx: 4 });
      shape(ctx, c => c.rect(-3, -L, 6, L * .48), sil(o, this.metal), { lw: 3.5 });
      if (!o.silhouette) { ctx.fillStyle = '#c8a040'; ctx.fillRect(-6, -78, 12, 10); ctx.fillRect(-5, -L * .4, 10, 6); }
      if (this.bayonet) shape(ctx, c => { c.moveTo(-2, -L + 4); c.lineTo(2, -L + 4); c.lineTo(0, -L - 46); c.closePath(); }, sil(o, '#c8ccd4'), { lw: 3 });
      if (this.sling && !o.silhouette) { ctx.strokeStyle = '#d8ccb0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(6, -20); ctx.quadraticCurveTo(16, -L * .35, 5, -L * .55); ctx.stroke(); }
      ctx.restore(); } }
  class Hat { constructor(seed = 1, kind = 'tricorne') { this.seed = seed; this.kind = kind; this.col = kind === 'bearskin' ? '#141016' : ['#22202a', '#2a2420', '#1e2228'][seed % 3]; this.trim = seed % 4 === 0 ? '#d8c890' : null; this.tilt = ((seed * 37) % 7 - 3) * .015; }
    draw(ctx, x, y, s = 1, a = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(a + this.tilt); ctx.scale(s, s); const col = sil(o, this.col);
      if (this.kind === 'bearskin') { shape(ctx, c => { c.moveTo(-60, 10); c.bezierCurveTo(-70, -60, -50, -130, 0, -132); c.bezierCurveTo(50, -130, 70, -60, 60, 10); c.closePath(); }, col, { lw: 5, shade: '#000000', dx: 10 }); if (!o.silhouette) { ctx.fillStyle = '#d8b040'; ctx.beginPath(); ctx.arc(0, -10, 12, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); } }
      else { shape(ctx, c => { c.moveTo(-82, 4); c.quadraticCurveTo(-60, -22, -40, -30); c.quadraticCurveTo(-20, -62, 0, -60); c.quadraticCurveTo(20, -62, 40, -30); c.quadraticCurveTo(60, -22, 82, 4); c.quadraticCurveTo(0, -16, -82, 4); c.closePath(); }, col, { lw: 5, shade: mix(this.col, '#000000', .4), dx: 10 });
        if (this.trim && !o.silhouette) { ctx.strokeStyle = this.trim; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-76, 0); ctx.quadraticCurveTo(0, -18, 76, 0); ctx.stroke(); } }
      if (o.snow) { ctx.fillStyle = '#f4f8fc'; ctx.beginPath(); ctx.ellipse(0, this.kind === 'bearskin' ? -128 : -56, 34 * o.snow, 9 * o.snow, 0, Math.PI, 0); ctx.fill(); }
      ctx.restore(); } }
  class Lantern { constructor(seed = 1) { this.seed = seed; }
    draw(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const fl = .85 + Math.sin(t * 11 + this.seed) * .08 + Math.sin(t * 23) * .05;
      if (!o.noGlow) { const g = ctx.createRadialGradient(0, 30, 4, 0, 30, 170 * fl); g.addColorStop(0, 'rgba(255,200,110,.55)'); g.addColorStop(1, 'rgba(255,190,100,0)'); ctx.fillStyle = g; ctx.fillRect(-200, -150, 400, 360); }
      ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -12, 6, 0, 7); ctx.stroke();
      shape(ctx, c => { c.moveTo(-14, 0); c.lineTo(14, 0); c.lineTo(10, 8); c.lineTo(-10, 8); c.closePath(); }, '#2a2626', { lw: 3 });
      shape(ctx, c => c.rect(-12, 8, 24, 34), `rgba(255,${200 + fl * 30 | 0},120,1)`, { lw: 3 }); ctx.fillStyle = '#fff4c0'; ctx.beginPath(); ctx.ellipse(0, 26, 4 * fl, 7 * fl, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-4, 8); ctx.lineTo(-4, 42); ctx.moveTo(4, 8); ctx.lineTo(4, 42); ctx.stroke(); shape(ctx, c => c.rect(-14, 42, 28, 7), '#2a2626', { lw: 3 }); ctx.restore(); } }
  class Shoe { constructor(seed = 1) { this.seed = seed; }   // the worn-out shoe left behind in the snow (its own asset)
    draw(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || -.08); ctx.scale(s, s); const flap = Math.sin(t * 2 + this.seed) * .04;
      shape(ctx, c => { c.moveTo(-70, 0); c.quadraticCurveTo(-74, -30, -40, -34); c.lineTo(30, -40); c.quadraticCurveTo(70, -36, 74, -6); c.lineTo(70, 4); c.closePath(); }, '#6a4428', { lw: 5, shade: '#4a2c18', dx: 8 });
      ctx.save(); ctx.rotate(flap); shape(ctx, c => { c.moveTo(-72, 4); c.lineTo(70, 4); c.quadraticCurveTo(72, 14, 40, 16); c.lineTo(-60, 14); c.closePath(); }, '#3a2618', { lw: 4 }); ctx.restore();
      ctx.fillStyle = '#e8e4dc'; ctx.beginPath(); ctx.ellipse(12, -22, 12, 8, .2, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); // the hole
      ctx.fillStyle = '#c8b048'; ctx.fillRect(-26, -40, 18, 8); ctx.strokeRect(-26, -40, 18, 8); ctx.restore(); } }
  // ======================= PERSON: an assembly of separate part-drawers =======================
  class Person { constructor(cfg = {}) { const seed = cfg.seed || 1, R = rng(seed * 131 + 7); this.seed = seed;
      this.coat = cfg.coat || ['#7a5236', '#6a4a30', '#5a4636', '#2a3a6a', '#4a5a3a'][seed % 5]; this.facings = cfg.facings || null; this.legs = cfg.legs || ['#8a7a5a', '#6a5a44', '#7a6a50'][seed % 3];
      this.shawl = cfg.shawl ?? (R() > .3 ? ['#8a8a84', '#7a7468', '#9a9488'][seed % 3] : null); this.feet = cfg.feet || (R() > .5 ? 'rags' : 'shoes'); this.ragged = cfg.ragged ?? true; this.head = cfg.head || '#f4f2ee'; this.uniform = cfg.uniform || null;
      this.hat = cfg.hat === null ? null : new Hat(seed, cfg.hatKind || 'tricorne'); this.musket = cfg.musket === false ? null : new Musket(seed); this.lantern = cfg.lantern ? new Lantern(seed) : null; this.w = cfg.w || 1; }
    // part drawers — each is independent; o.explode[part] = [dx, dy] lets the asset sheet pull them apart
    feetPart(ctx, o) { const fy = 0; for (const sx of [-1, 1]) { const lift = (o.step || 0) * (sx > 0 ? 1 : -1) > 0 ? Math.abs(o.step) * 10 : 0; ctx.save(); ctx.translate(sx * 26, fy - lift);
        if (this.feet === 'rags') { shape(ctx, c => { c.ellipse(sx * 6, -10, 30, 17, 0, 0, 7); }, sil(o, '#b8ac94'), { lw: 4.5, shade: sil(o, '#8a7e68'), dx: 6 }); if (!o.silhouette) { ctx.strokeStyle = '#7a6e58'; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(sx * 6 - 22 + i * 14, -24); ctx.lineTo(sx * 6 - 14 + i * 14, 2); ctx.stroke(); } } }
        else shape(ctx, c => c.ellipse(sx * 8, -9, 30, 14, 0, 0, 7), sil(o, '#3a2a20'), { lw: 4.5 }); ctx.restore(); } }
    legsPart(ctx, o) { for (const sx of [-1, 1]) { const lift = (o.step || 0) * sx > 0 ? Math.abs(o.step) * 10 : 0; shape(ctx, c => c.roundRect(sx * 26 - 13, -78 - lift, 26, 62, 8), sil(o, this.legs), { lw: 4.5, shade: sil(o, mix(this.legs, '#000000', .25)), dx: 5 }); } }
    coatPart(ctx, o, t) { const sway = Math.sin(t * 1.7 + this.seed) * 3 * (o.wind ?? 1); const hem = -62, top = -196; const wT = 52, wB = 62;
      shape(ctx, c => { c.moveTo(-wT, top); c.lineTo(wT, top); c.lineTo(wB + sway, hem); if (this.ragged && !this.uniform) { for (let i = 0; i <= 8; i++) c.lineTo(lerp(wB + sway, -wB + sway, i / 8), hem + (i % 2 ? 12 : 0)); } else c.lineTo(-wB + sway, hem); c.closePath(); }, sil(o, this.coat), { lw: 5, shade: sil(o, mix(this.coat, '#000000', .3)), dx: 12 });
      if (o.silhouette) return; if (this.uniform === 'redcoat') { ctx.fillStyle = '#f4f0e8'; ctx.fillRect(-14, top, 28, 110); ctx.strokeStyle = '#f4f0e8'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-46, top + 6); ctx.lineTo(40, hem - 20); ctx.moveTo(46, top + 6); ctx.lineTo(-40, hem - 20); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#2a3a8a'; ctx.fillRect(-wT, top, 14, 120); ctx.fillRect(wT - 14, top, 14, 120); }
      else { ctx.strokeStyle = mix(this.coat, '#000000', .45); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, top + 8); ctx.lineTo(sway * .4, hem); ctx.stroke(); ctx.fillStyle = '#c8a860'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-8, top + 30 + i * 26, 4, 0, 7); ctx.fill(); }
        if (this.ragged) { ctx.fillStyle = mix(this.coat, '#ffffff', .18); ctx.save(); ctx.translate(-30, -110); ctx.rotate(.2); ctx.fillRect(-10, -9, 20, 18); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.strokeRect(-10, -9, 20, 18); ctx.setLineDash([]); ctx.restore(); } } }
    shawlPart(ctx, o) { if (!this.shawl) return; shape(ctx, c => { c.moveTo(-58, -200); c.quadraticCurveTo(0, -212, 58, -200); c.lineTo(50, -150); c.quadraticCurveTo(0, -128, -50, -150); c.closePath(); }, sil(o, this.shawl), { lw: 4.5, shade: sil(o, mix(this.shawl, '#000000', .25)), dx: 8 }); }
    // arms: 'cross' (hugging himself, like the reference), 'sides', 'hold' (musket upright in the right hand), 'lantern'
    armsPart(ctx, o, t) { const pose = o.arms || 'cross', col = sil(o, this.coat), cuff = sil(o, mix(this.coat, '#000000', .2)); const shiv = o.shiver ? Math.sin(t * 40) * 1.5 : 0;
      const sleeve = (x0, y0, x1, y1) => { ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 21; ctx.stroke(); };
      if (pose === 'cross') { sleeve(-50, -186, -20 + shiv, -130); sleeve(-20 + shiv, -130, 26 + shiv, -146); sleeve(50, -186, 22 - shiv, -122); sleeve(22 - shiv, -122, -24 - shiv, -138); this.hands = [[30 + shiv, -146], [-28 - shiv, -138]]; }
      else if (pose === 'hold') { sleeve(-50, -186, -58, -118); sleeve(50, -186, 64, -138); sleeve(64, -138, 66, -112); this.hands = [[-58, -112], [66, -108]]; }
      else if (pose === 'lantern') { sleeve(-50, -186, -54, -116); sleeve(50, -186, 76, -150); sleeve(76, -150, 90, -128); this.hands = [[-54, -110], [92, -122]]; }
      else if (pose === 'point') { sleeve(-50, -186, -56, -114); sleeve(50, -186, 110, -196); this.hands = [[-56, -110], [118, -198]]; }
      else { sleeve(-50, -186, -58, -116); sleeve(50, -186, 58, -116); this.hands = [[-58, -110], [58, -110]]; } }
    handsPart(ctx, o) { for (const [x, y] of this.hands || []) shape(ctx, c => c.arc(x, y, 13, 0, 7), sil(o, '#f8f6f2'), { lw: 4 }); }
    headPart(ctx, o, t) { const bob = Math.sin(t * 1.4 + this.seed) * 1.5, hx = (o.lookX || 0) * 3; ctx.save(); ctx.translate(hx, -262 + bob);
      shape(ctx, c => c.arc(0, 0, 66, 0, 7), sil(o, o.frost ? mix(this.head, '#a8c8ff', o.frost) : this.head), { lw: 5.5, shade: sil(o, mix(this.head, '#8890a0', .35)), dx: 12, dy: 6 });
      if (!o.silhouette) this.facePart(ctx, o, t); ctx.restore(); }
    facePart(ctx, o, t) { const e = o.face || 'neutral', lx = (o.lookX || 0) * 6, bl = (Math.sin(t * .9 + this.seed * 2.3) > .985 || ((t + this.seed) % 4.1) < .12) && e !== 'cold'; ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineCap = 'round';
      if (e === 'cold') { ctx.lineWidth = 5; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 30 + lx - sx * 10, -16); ctx.lineTo(sx * 18 + lx - sx * 10, -8); ctx.lineTo(sx * 30 + lx - sx * 10, 0); ctx.stroke(); } const ch = Math.sin(t * 30) * 1.2; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(-20, 16 + ch, 40, 20, 5); ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); ctx.beginPath(); for (let i = 1; i < 4; i++) { ctx.moveTo(-20 + i * 10, 16 + ch); ctx.lineTo(-20 + i * 10, 36 + ch); } ctx.moveTo(-20, 26 + ch); ctx.lineTo(20, 26 + ch); ctx.lineWidth = 2.5; ctx.stroke(); return; }
      ctx.lineWidth = 5; const brow = e === 'worried' ? 1 : e === 'angry' ? -1 : 0; if (brow) for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 14 + lx, -28 - brow * 2); ctx.lineTo(sx * 32 + lx, -28 + brow * 6 * (sx)); ctx.stroke(); }
      for (const sx of [-1, 1]) { if (bl) { ctx.beginPath(); ctx.moveTo(sx * 22 + lx - 6, -10); ctx.lineTo(sx * 22 + lx + 6, -10); ctx.stroke(); } else if (e === 'shock') { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx * 22 + lx, -10, 10, 0, 7); ctx.fill(); ctx.lineWidth = 3.5; ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx * 22 + lx * 1.3, -10, 4, 0, 7); ctx.fill(); } else if (e === 'determined') { ctx.beginPath(); ctx.moveTo(sx * 22 + lx - 8, -10); ctx.lineTo(sx * 22 + lx + 8, -10); ctx.stroke(); } else { ctx.beginPath(); ctx.ellipse(sx * 22 + lx, -10, 4.5, 6.5, 0, 0, 7); ctx.fill(); } }
      ctx.lineWidth = 5; ctx.beginPath(); if (e === 'shock') { ctx.ellipse(lx * .5, 26, 8, 11, 0, 0, 7); ctx.fillStyle = INK; ctx.fill(); } else if (e === 'sad' || e === 'worried') { ctx.arc(lx * .5, 36, 14, Math.PI * 1.15, Math.PI * 1.85); } else if (e === 'smile') { ctx.arc(lx * .5, 16, 14, .2, Math.PI - .2); } else { ctx.moveTo(-12 + lx * .5, 26); ctx.lineTo(12 + lx * .5, 26); } ctx.stroke();
      if (o.breath) { const ph = (t * .5 + this.seed * .3) % 1; if (ph < .55) { const k = ph / .55; ctx.fillStyle = `rgba(235,240,248,${.55 * (1 - k)})`; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(30 + k * 50 + i * 10, 28 - k * 18 - i * 4, 8 + k * 16, 0, 7); ctx.fill(); } } } }
    // the whole assembly; parts drawn back-to-front; props drawn between arms and hands so the hand closes over them
    draw(ctx, x, y, s, t, o = {}) { const ex = o.explode || {}; const part = (name, fn) => { const d = ex[name]; ctx.save(); if (d) ctx.translate(d[0], d[1]); fn(); ctx.restore(); };
      const br = 1 + Math.sin(t * 2.1 + this.seed) * .012; ctx.save(); ctx.translate(x + (o.shiver ? Math.sin(t * 37 + this.seed) * 1.6 : 0), y); ctx.scale(s * this.w, s * br);
      if (!o.silhouette && !o.noShadow) { ctx.fillStyle = 'rgba(10,14,30,.28)'; ctx.beginPath(); ctx.ellipse(0, 2, 72, 12, 0, 0, 7); ctx.fill(); }
      part('legs', () => this.legsPart(ctx, o)); part('feet', () => this.feetPart(ctx, o)); part('coat', () => this.coatPart(ctx, o, t)); part('shawl', () => this.shawlPart(ctx, o));
      if (this.musket && o.arms === 'hold') part('musket', () => this.musket.draw(ctx, 70, -2, .04, 1, o)); else if (this.musket && o.slung !== false && o.arms !== 'hold') part('musket', () => this.musket.draw(ctx, 48, -40, .5, .8, o));
      part('arms', () => this.armsPart(ctx, o, t));
      if (this.lantern && o.arms === 'lantern') { const [hx, hy] = this.hands[1]; part('lantern', () => this.lantern.draw(ctx, hx, hy + 6, 1, t, o)); }
      part('hands', () => this.handsPart(ctx, o)); part('head', () => this.headPart(ctx, o, t)); if (this.hat && !o.noHat) part('hat', () => this.hat.draw(ctx, (o.lookX || 0) * 3, -304 + Math.sin(t * 1.4 + this.seed) * 1.5, 1.14, 0, Object.assign({}, o, { snow: o.snow })));
      ctx.restore();
      // frost creeping up from the feet: tint the figure's own pixels below a rising line
      if (o.frostUp) { /* drawn by the caller with Rig.frost() on an offscreen layer */ } }
  }
  // a figure drawn to its own layer so effects (frost, ghost-fade, silhouette glow) affect only that character
  const layers = {}; function layer(key) { if (!layers[key]) { const c = document.createElement('canvas'); c.width = 1280; c.height = 720; layers[key] = c; } const c = layers[key], x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, 1280, 720); return [c, x]; }
  function frosted(ctx, person, x, y, s, t, o, k) { const [c, x2] = layer('frost'); x2.setTransform(ctx.getTransform()); person.draw(x2, x, y, s, t, o); x2.setTransform(1, 0, 0, 1, 0, 0); if (k > 0) { const top = ctx.getTransform().transformPoint({ x: x, y: y - 330 * s * k }).y; x2.globalCompositeOperation = 'source-atop'; const g = x2.createLinearGradient(0, top - 30, 0, top + 30); g.addColorStop(0, 'rgba(140,190,255,0)'); g.addColorStop(1, 'rgba(140,190,255,.62)'); x2.fillStyle = g; x2.fillRect(0, top - 30, 1280, 760); x2.globalCompositeOperation = 'source-over'; }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(c, 0, 0); ctx.restore(); }
  function faded(ctx, person, x, y, s, t, o, alpha, grey) { const [c, x2] = layer('fade'); x2.setTransform(ctx.getTransform()); person.draw(x2, x, y, s, t, o); x2.setTransform(1, 0, 0, 1, 0, 0);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = alpha; if (grey) ctx.filter = `grayscale(${grey}) brightness(${1 + grey * .25})`; ctx.drawImage(c, 0, 0); ctx.filter = 'none'; ctx.restore(); }
  G.Rig = { INK, LW, shape, mix, clamp, lerp, rng, Person, Musket, Hat, Lantern, Shoe, frosted, faded };
})(window);
