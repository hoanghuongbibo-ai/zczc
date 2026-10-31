/* The cast (from the channel's cast sheet): round white heads with brown hair at the sides, a big black tricorne, coats over short legs,
 * white mitten hands, rag-wrapped feet. Every part and prop is SEPARATE: each character owns his own Hat instance, his own Musket,
 * his own Shawl — nothing is baked into the body or shared between characters.
 * Units: s = 1 matches the cast sheet (≈225 px from hat top to feet); feet at y = 0, up is −y. Pure functions of t. */
(function (G) {
  'use strict';
  const INK = '#241c1a', LW = 4;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const mix = (a, b, k) => { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(k)).toString(16).padStart(2, '0')).join(''); };
  const shp = (ctx, fn, fill, o = {}) => { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (o.shade && fill) { ctx.save(); ctx.beginPath(); fn(ctx); ctx.clip(); ctx.fillStyle = o.shade; ctx.beginPath(); ctx.rect(-999, -999, 1998, 1998); ctx.save(); ctx.translate(-(o.dx ?? 7), -(o.dy ?? 0)); fn(ctx); ctx.restore(); ctx.fill('evenodd'); ctx.restore(); }
    if (o.lw !== 0) { ctx.beginPath(); fn(ctx); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = o.lw ?? LW; ctx.strokeStyle = INK; ctx.stroke(); } };
  const tube = (ctx, pts, w, col) => { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = w + LW * 2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
  // ======================= PROPS / WEARABLES (one instance per owner) =======================
  class Tricorne { constructor(o = {}) { this.col = o.col || '#2a2422'; this.trim = o.trim || null; this.w = o.w || 1; }
    draw(ctx, o = {}) { const c = this.col, w = this.w; ctx.save(); ctx.scale(w, 1);
      shp(ctx, k => { k.moveTo(-44, -200); k.quadraticCurveTo(-40, -228, 0, -230); k.quadraticCurveTo(40, -228, 44, -200); k.closePath(); }, mix(c, '#ffffff', .1), { lw: LW });
      const brim = k => { k.moveTo(-70, -196); k.quadraticCurveTo(-64, -214, -36, -214); k.quadraticCurveTo(0, -206, 36, -214); k.quadraticCurveTo(64, -214, 70, -196); k.quadraticCurveTo(40, -186, 0, -176); k.quadraticCurveTo(-40, -186, -70, -196); k.closePath(); };
      shp(ctx, brim, c, { shade: mix(c, '#000000', .45), dx: 0, dy: -6 }); ctx.strokeStyle = mix(c, '#ffffff', .18); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-60, -202); ctx.quadraticCurveTo(0, -196, 60, -202); ctx.stroke();
      if (this.trim) { ctx.strokeStyle = this.trim; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-66, -195); ctx.quadraticCurveTo(-40, -186, 0, -177); ctx.quadraticCurveTo(40, -186, 66, -195); ctx.stroke(); }
      if (o.snow) { ctx.fillStyle = '#e6eaf0'; ctx.beginPath(); ctx.moveTo(-66, -204); ctx.quadraticCurveTo(-62, -216, -36, -216); ctx.quadraticCurveTo(-34, -232, 0, -233); ctx.quadraticCurveTo(34, -232, 36, -216); ctx.quadraticCurveTo(62, -216, 66, -204); ctx.quadraticCurveTo(60, -210, 36, -210); ctx.quadraticCurveTo(30, -226, 0, -226); ctx.quadraticCurveTo(-30, -226, -36, -210); ctx.quadraticCurveTo(-60, -210, -66, -204); ctx.closePath(); ctx.fill(); }
      ctx.restore(); } }
  class WideBrim { constructor(o = {}) { this.col = o.col || '#3a2e28'; }
    draw(ctx) { const c = this.col; shp(ctx, k => k.ellipse(0, -194, 60, 12, 0, 0, 7), c, { shade: mix(c, '#000000', .4), dx: 0, dy: -5 }); shp(ctx, k => { k.moveTo(-28, -196); k.lineTo(-28, -224); k.quadraticCurveTo(-26, -238, 0, -238); k.quadraticCurveTo(26, -238, 28, -224); k.lineTo(28, -196); k.closePath(); }, mix(c, '#ffffff', .08), { shade: mix(c, '#000000', .35), dx: 6 }); ctx.strokeStyle = mix(c, '#000000', .5); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-27, -204); ctx.lineTo(27, -204); ctx.stroke(); } }
  class Bearskin { constructor(o = {}) { this.col = o.col || '#1a1616'; }
    draw(ctx) { const c = this.col; const fur = k => { k.moveTo(-46, -190); k.bezierCurveTo(-54, -262, -36, -300, 0, -300); k.bezierCurveTo(36, -300, 54, -262, 46, -190); k.quadraticCurveTo(0, -182, -46, -190); k.closePath(); };
      shp(ctx, fur, c, { shade: '#000000', dx: 8 }); ctx.save(); ctx.beginPath(); fur(ctx); ctx.clip(); ctx.strokeStyle = 'rgba(120,112,116,.5)'; ctx.lineWidth = 1.6; for (let i = 0; i < 26; i++) { const x = -36 + (i * 17) % 72, y = -292 + (i * 29) % 90; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 2, y + 6, x, y + 12); ctx.stroke(); } ctx.restore();
      shp(ctx, k => k.ellipse(0, -212, 15, 11, 0, 0, 7), '#d8b048', { lw: 0 }); } }
  class Mitre { constructor(o = {}) { this.col = o.col || '#c8a040'; }
    draw(ctx) { shp(ctx, k => { k.moveTo(-32, -194); k.lineTo(-32, -246); k.lineTo(0, -280); k.lineTo(32, -246); k.lineTo(32, -194); k.closePath(); }, this.col, { shade: mix(this.col, '#6a4a10', .35), dx: 6 });
      ctx.strokeStyle = mix(this.col, '#4a3008', .6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-14, -226); ctx.lineTo(0, -246); ctx.lineTo(14, -226); ctx.stroke();
      shp(ctx, k => k.rect(-34, -204, 68, 12), '#c8302a', { lw: 3 }); shp(ctx, k => k.arc(0, -286, 7, 0, 7), '#f0ece4', { lw: 3 }); } }
  class Musket { constructor(o = {}) { this.len = o.len || 172; this.stock = o.stock || '#6a3e22'; this.bayonet = !!o.bayonet; }
    // drawn with the butt at the origin, pointing up (−y), rotated by a
    draw(ctx, x, y, a = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const L = this.len;
      shp(ctx, k => { k.moveTo(-5, 6); k.lineTo(5, 6); k.lineTo(4, -L * .64); k.lineTo(-4, -L * .64); k.closePath(); }, this.stock, { lw: 3 }); shp(ctx, k => k.rect(-2.5, -L, 5, L * .4), '#8a8e96', { lw: 2.5 });
      if (this.bayonet) { ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1, -L); ctx.lineTo(1, -L - 34); ctx.stroke(); ctx.strokeStyle = '#c8ccd4'; ctx.lineWidth = 2; ctx.stroke(); }
      ctx.restore(); } }
  class Shawl { constructor(o = {}) { this.col = o.col || '#8a8680'; }
    draw(ctx) { shp(ctx, k => { k.moveTo(-46, -126); k.quadraticCurveTo(0, -136, 46, -126); k.quadraticCurveTo(54, -104, 48, -90); k.quadraticCurveTo(0, -76, -48, -90); k.quadraticCurveTo(-54, -104, -46, -126); k.closePath(); }, this.col, { shade: mix(this.col, '#000000', .25), dx: 8 }); } }
  // ======================= A CHARACTER: an assembly of separate parts =======================
  class Figure { constructor(c = {}) { this.c = Object.assign({ coat: '#7a5232', legs: '#c8b890', feet: 'rags', hair: '#4a3022', head: '#f8f6f2' }, c); this.seed = c.seed || 1;
      this.props = c.props || []; this.hat = c.hat === undefined ? new Tricorne() : c.hat; this.musket = c.musket === undefined ? new Musket() : c.musket; this.shawl = c.shawl === undefined ? (c.uniform ? null : new Shawl()) : c.shawl; }
    // parts ---------------------------------------------------------------
    feet(ctx, o) { const c = this.c; for (const sx of [-1, 1]) { const lift = (o.step || 0) * sx > 0 ? Math.abs(o.step) * 6 : 0; if (c.feet === 'rags') { shp(ctx, k => k.ellipse(sx * 19, -11 - lift, 20, 10, 0, 0, 7), '#b8ae98', { lw: 3.5, shade: '#8e8470', dx: 0, dy: -4 }); ctx.strokeStyle = '#6e6656'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(sx * 19 - 13 + i * 8, -18 - lift); ctx.lineTo(sx * 19 - 7 + i * 8, -3 - lift); ctx.stroke(); } }
        else if (c.feet === 'bare') shp(ctx, k => k.ellipse(sx * 19, -9 - lift, 17, 9, 0, 0, 7), c.head, { lw: 3 });
        else { if (c.feet === 'boots') shp(ctx, k => k.roundRect(sx * 19 - 10, -46 - lift, 20, 40, 5), '#1a1414', { lw: 3 }); shp(ctx, k => k.ellipse(sx * 19, -10 - lift, 19, 10, 0, 0, 7), '#221c1c', { lw: 3 }); } } }
    legsP(ctx, o) { const c = this.c; if (c.dress) return; for (const sx of [-1, 1]) { const lift = (o.step || 0) * sx > 0 ? Math.abs(o.step) * 6 : 0; shp(ctx, k => k.rect(sx * 15 - 8, -48 - lift, 16, 34), c.legs, { lw: 3.5, shade: mix(c.legs, '#000000', .2), dx: 4 }); } }
    coatP(ctx, o, t) { const c = this.c, sway = Math.sin(t * 1.6 + this.seed) * 1.5, hem = c.dress ? -8 : -30, col = c.coat;
      const body = k => { k.moveTo(-40, -126); k.quadraticCurveTo(0, -132, 40, -126); k.lineTo(48 + sway, hem); if (c.uniform) k.lineTo(-48 + sway, hem); else for (let i = 0; i <= 8; i++) k.lineTo(lerp(48 + sway, -48 + sway, i / 8), hem + (i % 2 ? 7 : 0)); k.closePath(); };
      shp(ctx, body, col, { shade: mix(col, '#000000', .28), dx: 12 }); ctx.save(); ctx.beginPath(); body(ctx); ctx.clip();
      if (c.waistcoat) { ctx.fillStyle = c.waistcoat; ctx.fillRect(-10, -126, 20, 70); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.strokeRect(-10, -126, 20, 70); ctx.fillStyle = mix(c.waistcoat, '#6a4a10', .5); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-4, -112 + i * 14, 2.4, 0, 7); ctx.fill(); } }
      if (c.facings) { ctx.fillStyle = c.facings; ctx.fillRect(-20, -126, 8, 70); ctx.fillRect(12, -126, 8, 70); }
      if (c.belts) { ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-38, -122); ctx.lineTo(30, -50); ctx.moveTo(38, -122); ctx.lineTo(-30, -50); ctx.stroke(); ctx.strokeStyle = '#f4f0e8'; ctx.lineWidth = 6.5; ctx.stroke(); }
      if (c.sash) { ctx.strokeStyle = c.sash; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-38, -124); ctx.lineTo(40, -56); ctx.stroke(); }
      if (c.apron) { ctx.fillStyle = c.apron; ctx.fillRect(-30, -96, 60, 90); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.strokeRect(-30, -96, 60, 90); }
      if (c.star) { ctx.save(); ctx.translate(-22, -100); ctx.fillStyle = '#e8c048'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 5 : 13, a = i * Math.PI / 8; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
      if (c.texture) { ctx.strokeStyle = mix(col, '#000000', .35); ctx.lineWidth = 1.5; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(-36 + i * 6, -50); ctx.lineTo(-35 + i * 6, -44); ctx.stroke(); } }
      if (c.stripes) { ctx.strokeStyle = c.stripes; ctx.lineWidth = 6; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-50, -118 + i * 16); ctx.lineTo(50, -118 + i * 16); ctx.stroke(); } }
      if (!c.uniform && !c.waistcoat) { ctx.strokeStyle = mix(col, '#000000', .4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sway * .3, -120); ctx.lineTo(sway, hem); ctx.stroke(); }
      ctx.restore(); if (c.epaulettes) for (const sx of [-1, 1]) { shp(ctx, k => k.ellipse(sx * 40, -124, 16, 7, sx * .2, 0, 7), c.epaulettes, { lw: 3 }); ctx.strokeStyle = c.epaulettes; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(sx * (30 + i * 4), -118); ctx.lineTo(sx * (30 + i * 4), -106); ctx.stroke(); } } }
    // arms: 'side' (down by the sides; the right hand holds the musket upright), 'cross' (hugging himself), 'fist' (right fist up), 'port' (musket across the body)
    armsP(ctx, o, t) { const c = this.c, col = c.coat, cuff = c.cuffs || mix(col, '#000000', .2), pose = o.arms || 'side', sh = o.shiver ? Math.sin(t * 40) * 1.2 : 0; let H;
      if (pose === 'cross') { tube(ctx, [[-40, -118], [-48, -96], [8 + sh, -92]], 20, col); tube(ctx, [[40, -118], [46, -98], [-4 - sh, -100]], 20, col); H = [[10 + sh, -94]]; }
      else if (pose === 'fist') { tube(ctx, [[-40, -118], [-46, -60]], 20, col); tube(ctx, [[40, -118], [56, -128], [62, -170]], 20, col); H = [[-46, -56], [62, -176]]; }
      else if (pose === 'port') { tube(ctx, [[-40, -118], [-34, -84], [12, -108]], 20, col); tube(ctx, [[40, -118], [48, -96], [38, -88]], 20, col); H = [[12, -108], [38, -86]]; }
      else if (pose === 'point') { tube(ctx, [[-40, -118], [-46, -60]], 20, col); tube(ctx, [[40, -118], [80, -122], [112, -128]], 20, col); H = [[-46, -56], [118, -130]]; }
      else if (pose === 'up') { const w = Math.sin(t * 6 + this.seed) * 4; tube(ctx, [[-40, -118], [-62, -160], [-70 - w, -200]], 20, col); tube(ctx, [[40, -118], [62, -160], [70 + w, -200]], 20, col); H = [[-72 - w, -206], [72 + w, -206]]; }
      else if (pose === 'hold') { tube(ctx, [[-40, -118], [-44, -88], [-16, -84]], 20, col); tube(ctx, [[40, -118], [44, -88], [16, -84]], 20, col); H = [[-14, -84], [14, -84]]; }
      else if (pose === 'hip') { tube(ctx, [[-40, -118], [-68, -96], [-46, -74]], 20, col); tube(ctx, [[40, -118], [68, -96], [46, -74]], 20, col); H = [[-46, -72], [46, -72]]; }
      else if (pose === 'shrug') { tube(ctx, [[-40, -118], [-64, -100], [-84, -114]], 20, col); tube(ctx, [[40, -118], [64, -100], [84, -114]], 20, col); H = [[-88, -118], [88, -118]]; }
      else if (pose === 'wave') { const w = Math.sin(t * 9 + this.seed) * 10; tube(ctx, [[-40, -118], [-46, -60]], 20, col); tube(ctx, [[40, -118], [70, -140], [78 + w, -184]], 20, col); H = [[-46, -56], [80 + w, -190]]; }
      else if (pose === 'shout') { tube(ctx, [[-40, -118], [-46, -60]], 20, col); tube(ctx, [[40, -118], [46, -128], [30, -136]], 20, col); H = [[-46, -56], [26, -138]]; }
      else { tube(ctx, [[-40, -118], [-46, -60]], 20, col); tube(ctx, [[40, -118], [52, -62]], 20, col); H = [[-46, -56], [54, -58]]; }
      this._hands = H; this._pose = pose; }
    handsP(ctx) { for (const [x, y] of this._hands || []) { shp(ctx, k => k.arc(x, y, 12, 0, 7), '#fbfaf6', { lw: 3.5 }); shp(ctx, k => k.ellipse(x - 9, y - 3, 5, 6, -.4, 0, 7), '#fbfaf6', { lw: 2.5 }); } }
    headP(ctx, o, t) { const c = this.c, bob = Math.sin(t * 1.5 + this.seed) * 1.2; ctx.save(); ctx.translate((o.look || 0) * 2, bob);
      if (c.ringlets) { ctx.fillStyle = c.ringlets; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(sx * (46 + (i % 2) * 6), -170 + i * 22, 11, 13, 0, 0, 7); ctx.fill(); ctx.stroke(); } }
      if (c.hair !== null) { ctx.fillStyle = c.hair; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 44, -158, 12, 26, sx * .15, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); } }
      shp(ctx, k => k.arc(0, -160, 50, 0, 7), o.frostHead ? mix(c.head, '#bcd8ff', o.frostHead) : c.head, { lw: LW, shade: '#d8d8dc', dx: -8, dy: -6 });
      if (c.bald) { ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-20, -196, 6, 3.6, 5.6); ctx.stroke(); }
      this.face(ctx, o, t); ctx.restore(); }
    face(ctx, o, t) { const e = o.face || 'neutral', lx = (o.look || 0) * 5, blink = e === 'neutral' && ((t + this.seed * .7) % 3.7) < .12; ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = 3.5; const ey = -160, my = -132;
      if (e === 'cold') { ctx.lineWidth = 4; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 24 + lx, ey - 8); ctx.lineTo(sx * 13 + lx, ey); ctx.lineTo(sx * 24 + lx, ey + 8); ctx.stroke(); } const ch = Math.sin(t * 30) * 1; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(-14 + lx, my - 4 + ch, 28, 14, 4); ctx.fill(); ctx.lineWidth = 3; ctx.stroke(); ctx.lineWidth = 1.8; ctx.beginPath(); for (let i = 1; i < 4; i++) { ctx.moveTo(-14 + lx + i * 7, my - 4 + ch); ctx.lineTo(-14 + lx + i * 7, my + 10 + ch); } ctx.moveTo(-14 + lx, my + 3 + ch); ctx.lineTo(14 + lx, my + 3 + ch); ctx.stroke();
        ctx.lineWidth = 2.5; for (const sx of [-1, 1]) { const x0 = sx * 66; ctx.beginPath(); ctx.moveTo(x0, ey - 18); ctx.lineTo(x0 + sx * 6, ey - 12); ctx.lineTo(x0, ey - 6); ctx.lineTo(x0 + sx * 6, ey); ctx.stroke(); } return; }
      if (e === 'shock') { for (const sx of [-1, 1]) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx * 18 + lx, ey, 9, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx * 18 + lx, ey, 3.6, 0, 7); ctx.fill(); } ctx.fillStyle = '#7a1e18'; ctx.beginPath(); ctx.ellipse(lx * .5, my, 5, 7, 0, 0, 7); ctx.fill(); ctx.lineWidth = 2.5; ctx.stroke();
        ctx.fillStyle = '#7ac0f0'; ctx.beginPath(); ctx.moveTo(44, ey - 6); ctx.quadraticCurveTo(39, ey + 6, 44, ey + 8); ctx.quadraticCurveTo(49, ey + 6, 44, ey - 6); ctx.fill(); ctx.lineWidth = 1.5; ctx.stroke(); return; }
      if (e === 'win') { ctx.lineWidth = 3.5; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 18 + lx - 8, ey + 3); ctx.lineTo(sx * 18 + lx, ey - 5); ctx.lineTo(sx * 18 + lx + 8, ey + 3); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-9 + lx, my - 4); ctx.lineTo(lx, my + 3); ctx.lineTo(9 + lx, my - 4); ctx.stroke(); return; }
      const brow = e === 'tired' || e === 'angry' ? 1 : e === 'worried' ? -1 : 0; if (brow) { ctx.lineWidth = 3.5; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 28 + lx, ey - 16 - brow * 3); ctx.lineTo(sx * 10 + lx, ey - 12 + brow * 3); ctx.stroke(); } } else if (e === 'stern') { ctx.lineWidth = 3; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 28 + lx, ey - 14); ctx.lineTo(sx * 10 + lx, ey - 12); ctx.stroke(); } }
      for (const sx of [-1, 1]) { if (blink) { ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx * 18 + lx - 5, ey); ctx.lineTo(sx * 18 + lx + 5, ey); ctx.stroke(); } else { ctx.beginPath(); ctx.ellipse(sx * 18 + lx, ey, 4, 5.5, 0, 0, 7); ctx.fill(); } }
      ctx.lineWidth = 3.5; ctx.beginPath(); if (e === 'tired' || e === 'sad') { ctx.moveTo(-8 + lx, my + 4); ctx.lineTo(lx, my - 3); ctx.lineTo(8 + lx, my + 4); } else if (e === 'smile') { ctx.arc(lx, my - 6, 9, .3, Math.PI - .3); } else { ctx.moveTo(-8 + lx, my); ctx.lineTo(8 + lx, my); } ctx.stroke();
      if (this.c.beard) { const bc = this.c.beard, kind = this.c.beardKind || 'full'; ctx.save(); ctx.fillStyle = bc; ctx.strokeStyle = INK; ctx.lineWidth = 3;
        if (kind === 'chops') { for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 46, -172); ctx.quadraticCurveTo(sx * 62, -140, sx * 40, -118); ctx.quadraticCurveTo(sx * 26, -122, sx * 24, -140); ctx.quadraticCurveTo(sx * 30, -160, sx * 40, -176); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
        else if (kind === 'goatee') { ctx.beginPath(); ctx.moveTo(-12 + lx, my + 6); ctx.quadraticCurveTo(lx, my + 34, 12 + lx, my + 6); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        else { ctx.beginPath(); ctx.moveTo(-46, -158); ctx.quadraticCurveTo(-52, -112, -20, -96); ctx.quadraticCurveTo(lx, kind === 'long' ? -70 : -88, 20, -96); ctx.quadraticCurveTo(52, -112, 46, -158); ctx.quadraticCurveTo(38, -128, 18 + lx, my - 4); ctx.quadraticCurveTo(lx, my + 6, -18 + lx, my - 4); ctx.quadraticCurveTo(-38, -128, -46, -158); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = mix(bc, '#000000', .25); ctx.lineWidth = 1.5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-24 + i * 12, -118); ctx.quadraticCurveTo(-26 + i * 12, -108, -20 + i * 10, -100); ctx.stroke(); } ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-8 + lx, my + 1); ctx.lineTo(8 + lx, my + 1); ctx.stroke(); }
        ctx.restore(); }
      if (this.c.mustache) { ctx.strokeStyle = this.c.mustache; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-14 + lx, my - 7); ctx.quadraticCurveTo(lx, my - 11, 14 + lx, my - 7); ctx.stroke(); }
      if (o.breath) { const ph = (t * .5 + this.seed * .3) % 1; if (ph < .55) { const k = ph / .55; ctx.fillStyle = `rgba(236,242,250,${.6 * (1 - k)})`; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(22 + k * 40 + i * 8, my - k * 14 - i * 4, 6 + k * 12, 0, 7); ctx.fill(); } } } }
    // the whole figure ----------------------------------------------------
    draw(ctx, x, y, s, t, o = {}) { const ex = o.explode || {}; const part = (n, fn) => { if (o.only && !o.only.includes(n)) return; const d = ex[n]; ctx.save(); if (d) ctx.translate(d[0], d[1]); fn(); ctx.restore(); };
      ctx.save(); ctx.translate(x + (o.shiver ? Math.sin(t * 37 + this.seed) * 1.2 * s : 0), y); ctx.scale(s * (o.flip ? -1 : 1) * (this.c.wide || 1), s * (1 + Math.sin(t * 2 + this.seed) * .008)); if (this.c.tall) { ctx.translate(0, 0); ctx.scale(1, this.c.tall); }
      if (!o.noShadow) { ctx.fillStyle = 'rgba(20,16,10,.18)'; ctx.beginPath(); ctx.ellipse(0, 0, 50, 8, 0, 0, 7); ctx.fill(); }
      const pose = o.arms || 'side', m = this.musket;
      part('legs', () => this.legsP(ctx, o)); part('feet', () => this.feet(ctx, o)); part('coat', () => this.coatP(ctx, o, t)); if (this.shawl) part('shawl', () => this.shawl.draw(ctx));
      part('arms', () => this.armsP(ctx, o, t)); for (const pr of this.props) part('prop', () => pr.draw(ctx, { pose, t, hands: this._hands, o, fig: this })); if (m && pose === 'side' && o.musket !== false) part('musket', () => m.draw(ctx, 62, -40, .02)); if (m && pose === 'port' && o.musket !== false) part('musket', () => m.draw(ctx, -58, -54, 1.0)); part('hands', () => this.handsP(ctx));
      part('head', () => this.headP(ctx, o, t)); if (this.hat && !o.noHat) part('hat', () => { ctx.save(); ctx.translate((o.look || 0) * 2, Math.sin(t * 1.5 + this.seed) * 1.2 + (o.hatLift || 0)); ctx.rotate(o.hatTilt || 0); this.hat.draw(ctx, { snow: o.snow }); ctx.restore(); });
      ctx.restore(); } }
  G.Cast2 = { INK, LW, mix, shp, Figure, Tricorne, WideBrim, Bearskin, Mitre, Musket, Shawl,
    // the line-up from the cast sheet — each a NEW instance with its OWN props
    make: {
      you: (seed = 16) => new Figure({ seed, coat: '#7a5232', legs: '#c8b890', feet: 'rags', hat: new Tricorne(), musket: new Musket(), shawl: new Shawl() }),
      continental: (seed = 1) => new Figure({ seed, uniform: true, coat: '#2a4a8a', waistcoat: '#d8c08a', legs: '#d8c8a0', feet: 'shoes', cuffs: '#d8c08a', hat: new Tricorne(), musket: new Musket({ bayonet: true }) }),
      militia: (seed = 2) => new Figure({ seed, coat: '#7a6a40', legs: '#c8b890', feet: 'shoes', texture: true, hat: new WideBrim(), musket: new Musket(), shawl: null }),
      redcoat: (seed = 3) => new Figure({ seed, uniform: true, coat: '#c8302a', facings: '#2a3a8a', belts: true, legs: '#f2eee6', feet: 'shoes', hat: new Tricorne(), musket: new Musket({ bayonet: true }) }),
      grenadier: (seed = 4) => new Figure({ seed, uniform: true, coat: '#c8302a', facings: '#2a3a8a', belts: true, legs: '#f2eee6', feet: 'shoes', hat: new Bearskin(), musket: new Musket({ bayonet: true }) }),
      hessian: (seed = 5) => new Figure({ seed, uniform: true, coat: '#1e2a5a', facings: '#c8302a', belts: true, legs: '#e8e0c8', feet: 'shoes', mustache: '#6a2a1a', hat: new Mitre(), musket: new Musket({ bayonet: true }) }),
      civilian: (seed = 6) => new Figure({ seed, coat: '#5a7a4a', legs: '#a89870', feet: 'shoes', bald: true, hat: null, musket: null, shawl: null }) } };
})(window);
