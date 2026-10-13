/* Vindolanda episode kit, part 2: painted sets (cached layers + live animation). Each set is drawn with
 * set(ctx, t, pan, opts) and handles its own parallax, weather and atmosphere. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, P = G.Paint, K = G.VK, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, sky, rays, clouds, hills, smoothPts, tree, bush, blades, birds, motes, leafMass, PAD } = P, TAU = Math.PI * 2, F = G.Fauna;
  const grey = (ctx, t, pan, list, a = .96) => { ctx.save(); ctx.filter = 'saturate(.2) brightness(.95)'; clouds(ctx, t, pan, list); ctx.restore(); };
  const SKY = {
    day: [[0, '#5f9fd8'], [.38, '#a9cde8'], [.66, '#f5e3bc'], [1, '#f6d39a']], grey: [[0, '#7d8fa3'], [.5, '#b9c3c9'], [.8, '#d9d6c6'], [1, '#e2d6b8']],
    dusk: [[0, '#3f4a7a'], [.4, '#9a6a8a'], [.7, '#f0a070'], [1, '#ffc480']], night: [[0, '#141a33'], [.6, '#2a3358'], [1, '#4a4a66']], dawn: [[0, '#5c6f94'], [.5, '#c8b8b8'], [.8, '#f2cfa8'], [1, '#f7d9ae']] };

  // ================= the fort from outside (variants by sky) =================
  const fortLayer = v => layer('fort-' + v, g => {
    sky(g, v === 'dusk' ? [1000, 380] : [300, 230], SKY[v], v === 'night' ? 0 : .8);
    if (v === 'night') { const r = rng(5); g.fillStyle = '#fff'; for (let i = 0; i < 120; i++) { g.globalAlpha = .3 + r() * .7; g.fillRect(-PAD + r() * (W + PAD * 2), r() * 360, 2, 2); } g.globalAlpha = 1; }
    const dk = v === 'night' ? .45 : v === 'dusk' ? .8 : 1, tone = (hex) => G.Guide.hexMul(hex, dk);
    hills(g, 470, smoothPts(-PAD, W + PAD, 360, 100, 61, 10), tone('#9aa88c'), tone('#b5bca0'), 2, 'rgba(255,240,200,.35)');
    hills(g, 520, smoothPts(-PAD, W + PAD, 430, 70, 63, 12), tone('#86a95a'), tone('#a4be6c'), 2.5, 'rgba(240,240,170,.5)');
    g.fillStyle = grad(g, 0, 500, 0, H, [[0, tone('#93b860')], [1, tone('#5f8a3e')]]); g.fillRect(-PAD, 500, W + PAD * 2, 220);
    sh(g, tone('#c9b28a'), 3, c => { c.moveTo(-PAD, 640); c.quadraticCurveTo(400, 600, 700, 590); c.quadraticCurveTo(1000, 580, W + PAD, 600); c.lineTo(W + PAD, 630); c.quadraticCurveTo(1000, 612, 700, 622); c.quadraticCurveTo(400, 634, -PAD, 680); c.closePath(); });
    const x0 = 330, x1 = 950, yT = 420, yB = 540;
    sh(g, tone('#7a6a48'), 4, c => { c.moveTo(x0 - 40, yB + 20); c.lineTo(x0, yB - 20); c.lineTo(x1, yB - 20); c.lineTo(x1 + 40, yB + 20); c.closePath(); });
    for (const [x, w, c2] of [[380, 170, '#b85a36'], [570, 120, '#a8502f'], [720, 170, '#c8643c'], [880, 90, '#a8502f']]) sh(g, tone(c2), 3.5, c => { c.moveTo(x, yT + 14); c.lineTo(x + w / 2, yT - 46); c.lineTo(x + w, yT + 14); c.closePath(); });
    const r = rng(8); for (let x = x0; x < x1; x += 13) { const h = 78 + r() * 8; sh(g, tone(['#8a6a44', '#7a5c3a', '#9a7a50'][Math.floor(r() * 3)]), 2.5, c => { c.moveTo(x, yB - 20); c.lineTo(x, yB - 20 - h); c.lineTo(x + 6, yB - 28 - h); c.lineTo(x + 12, yB - 20 - h); c.lineTo(x + 12, yB - 20); c.closePath(); }); }
    const gx = 640; for (const s of [-1, 1]) { sh(g, tone('#8a6a44'), 4, c => c.rect(gx + s * 60 - 30, yT - 70, 60, 150)); sh(g, tone('#6b4a2e'), 4, c => { c.moveTo(gx + s * 60 - 40, yT - 70); c.lineTo(gx + s * 60, yT - 110); c.lineTo(gx + s * 60 + 40, yT - 70); c.closePath(); }); sh(g, v === 'night' || v === 'dusk' ? '#ffc870' : '#2c1d16', 3, c => c.rect(gx + s * 60 - 10, yT - 50, 20, 26)); }
    sh(g, '#2c1d16', 4, c => { c.moveTo(gx - 30, yB - 20); c.lineTo(gx - 30, yT + 10); c.quadraticCurveTo(gx, yT - 10, gx + 30, yT + 10); c.lineTo(gx + 30, yB - 20); c.closePath(); });
    sh(g, tone('#7a5c3a'), 4, c => c.rect(gx - 100, yT - 76, 200, 14));
  });
  function flag(ctx, t, x, y, col = '#b2342f') { ln(ctx, [[x, y + 44], [x, y - 30]], 4); ctx.save(); ctx.beginPath(); ctx.moveTo(x, y - 26); for (let i = 0; i <= 10; i++) ctx.lineTo(x + i * 5, y - 26 + Math.sin(t * 6 - i * .7) * 3); for (let i = 10; i >= 0; i--) ctx.lineTo(x + i * 5, y + 6 + Math.sin(t * 6 - i * .7) * 3); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = OUT; ctx.stroke(); ctx.restore(); }
  function fortExt(ctx, t, pan, o = {}) {
    const v = o.v || 'day'; put(ctx, fortLayer(v), pan, .7);
    if (v === 'day') { clouds(ctx, t, pan, [[-100, 30, 1.0, 71, 7], [720, 50, .75, 72, 5]]); rays(ctx, [300 - pan * .7, 230], t, .08); }
    else if (v === 'dusk') clouds(ctx, t, pan, [[-60, 60, .9, 76, 6], [800, 40, .8, 77, 4]]);
    else if (v === 'grey' || v === 'rain') grey(ctx, t, pan, [[-200, 10, 1.4, 73, 9], [500, -10, 1.3, 74, 7], [1000, 30, 1.2, 75, 8]]);
    if (v !== 'night') { tree(ctx, 90, 560, t, 41, .7, pan, .75); tree(ctx, 1210, 560, t, 43, .75, pan, .75);
      F.sheep(ctx, 230 - pan * .72, 520, .5, t, { ph: 0 }); F.sheep(ctx, 300 - pan * .72, 530, .45, t, { ph: 1.3, dir: -1 }); F.horse(ctx, 1030 - pan * .75, 560, .38, t, { graze: true, coat: '#7a4a2e' });
      bush(ctx, 210, 655, 200, 80, t, 51, pan, .9); bush(ctx, 1060, 660, 220, 90, t, 52, pan, .9); }
    if (v === 'day') { F.butterfly(ctx, 420 - pan, 560, .8, t, { col: '#f27ca0' }); F.butterfly(ctx, 900 - pan, 520, .7, t, { col: '#f7d64a', ph: 3 }); }
    if (v !== 'night') birds(ctx, t, [[0, 120, 45, 0], [40, 140, 45, 1.1], [70, 112, 45, 2]]);
    for (const [x, y] of [[465, 380], [630, 370], [805, 380]]) K.smoke(ctx, t, x - pan * .7, y);
    flag(ctx, t, 640 - pan * .7, 300);
    if (o.march !== false) { for (let i = 0; i < 6; i++) { const u = ((t * .045 + i / 6) % 1), x = lerp(-150, 1450, u) - pan * .9; K.mini(ctx, x, 612 - Math.sin(u * Math.PI) * 14, .62, t, { walk: 1, ph: i, mail: true, helmet: true, shield: true, spear: true, skin: K.SKINS[i % 6] }); }
      for (let i = 0; i < 3; i++) { const u = ((t * .035 + i / 3 + .3) % 1), x = lerp(1450, -150, u) - pan * .9; K.mini(ctx, x, 628, .7, t, { walk: 1, ph: i + 3, dir: -1, cloth: K.CLOTH[i + 2], skin: K.SKINS[(i + 2) % 6], carry: i === 1, dress: i === 0, bun: i === 0, palla: '#e7bf55' }); } }
    blades(ctx, 80, 725, 16, 120, t, 31, pan, 1.4, 2); blades(ctx, 1210, 725, 14, 110, t, 32, pan, 1.4, 2);
    if (v === 'rain' || o.rain) K.rain(ctx, t, o.rain ?? 1, 170, o.slant ?? .3);
    if (v === 'day') motes(ctx, t, 18, 6);
  }

  // ================= inside the fort: a timber street / parade ground =================
  const streetLayer = v => layer('street2-' + v, g => {
    sky(g, [900, 120], SKY[v === 'rain' ? 'grey' : v === 'dawn' ? 'dawn' : 'day'], .7);
    const dk = v === 'rain' ? .86 : 1, tone = h => G.Guide.hexMul(h, dk), r = rng(12);
    hills(g, 330, smoothPts(-PAD, W + PAD, 300, 50, 5, 10), tone('#a9bb86'), tone('#bccb98'), 2, 'rgba(255,250,210,.4)');
    const HOUSES = [[-200, 360, 230, '#ecd0a4', '#c8643c', '#3c6a8a'], [190, 300, 260, '#f2dcb4', '#b85a36', '#5f8a4a'], [520, 280, 210, '#e6c08e', '#c8643c', '#8a3a3a'], [830, 330, 250, '#f0d6ae', '#b85a36', '#3c6a8a'], [1190, 320, 220, '#e8c79a', '#c8643c', '#5f8a4a']];
    for (const [x, w, h, wall, roof, shut] of HOUSES) {
      sh(g, tone(wall), 4, c => c.rect(x, 520 - h, w, h));
      g.save(); g.beginPath(); g.rect(x, 520 - h, w, h); g.clip(); g.fillStyle = grad(g, x, 0, x + w, 0, [[0, 'rgba(255,255,240,.25)'], [.6, 'rgba(255,255,240,0)'], [1, 'rgba(120,60,30,.18)']]); g.fillRect(x, 520 - h, w, h);
      for (let i = 0; i < 18; i++) { g.fillStyle = `rgba(160,110,60,${.05 + r() * .06})`; g.beginPath(); g.ellipse(x + r() * w, 520 - r() * h, 10 + r() * 20, 6 + r() * 10, 0, 0, TAU); g.fill(); } g.restore();
      for (const k of [0, 1]) ln(g, [[x + 4 + k * (w - 8), 520 - h], [x + 4 + k * (w - 8), 520]], 6, '#6b4428');
      ln(g, [[x, 520 - h + 6], [x + w, 520 - h + 6]], 6, '#6b4428');
      // terracotta tile roof with rows and a lit edge
      const roofP = c => { c.moveTo(x - 24, 526 - h); c.lineTo(x + w / 2, 466 - h - 20); c.lineTo(x + w + 24, 526 - h); c.closePath(); };
      sh(g, tone(roof), 4, roofP); g.save(); g.beginPath(); roofP(g); g.clip(); for (let yy = 466 - h - 20; yy < 526 - h; yy += 10) { g.strokeStyle = 'rgba(90,30,10,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 30, yy); g.lineTo(x + w + 30, yy); g.stroke(); for (let xx = x - 30 + (yy % 20 ? 8 : 0); xx < x + w + 30; xx += 16) { g.beginPath(); g.arc(xx, yy + 10, 8, Math.PI, TAU); g.stroke(); } }
        g.fillStyle = 'rgba(255,220,180,.25)'; g.beginPath(); g.moveTo(x - 24, 526 - h); g.lineTo(x + w / 2, 466 - h - 20); g.lineTo(x + w / 2, 486 - h); g.closePath(); g.fill(); g.restore();
      // door, windows with shutters and a flower box
      sh(g, '#5a3a22', 3.5, c => c.roundRect(x + w / 2 - 26, 430, 52, 90, [26, 26, 0, 0])); ln(g, [[x + w / 2, 434], [x + w / 2, 520]], 2, 'rgba(0,0,0,.35)'); sh(g, '#d0a548', 1.5, circ(x + w / 2 + 14, 478, 3));
      for (const wx of [x + 40, x + w - 80]) { if (wx + 40 > x + w - 10 || wx < x + 10) continue; const wy = 520 - h + 50; sh(g, '#2c2a36', 3, c => c.rect(wx, wy, 40, 40)); g.fillStyle = 'rgba(255,220,140,.35)'; g.fillRect(wx + 4, wy + 4, 32, 32); ln(g, [[wx + 20, wy], [wx + 20, wy + 40]], 3, '#5a3a22');
        for (const sx of [-1, 1]) sh(g, tone(shut), 2.5, c => c.rect(sx < 0 ? wx - 16 : wx + 40, wy, 16, 40));
        sh(g, '#8a5a36', 2.5, c => c.rect(wx - 6, wy + 40, 52, 10)); for (let f = 0; f < 6; f++) { sh(g, '#4f8034', 0, circ(wx - 2 + f * 9, wy + 38, 6)); sh(g, P.FLOWERS[(f + x) % 6 < 0 ? 0 : (f + Math.abs(x)) % 6], 1.5, circ(wx - 2 + f * 9, wy + 34, 4)); } }
    }
    // ground: warm packed earth with a stone path and grass at the walls
    g.fillStyle = grad(g, 0, 516, 0, H, [[0, tone('#cdb088')], [1, tone('#a8875e')]]); g.fillRect(-PAD, 516, W + PAD * 2, 220);
    for (let i = 0; i < 70; i++) { const px = -PAD + r() * (W + PAD * 2), py = 560 + r() * 160; g.fillStyle = tone(['#c4a77e', '#bc9e74', '#cbb088'][i % 3]); g.beginPath(); g.ellipse(px, py, 9 + r() * 10, 4 + r() * 3, 0, 0, TAU); g.fill(); g.strokeStyle = 'rgba(90,60,30,.35)'; g.lineWidth = 1.5; g.stroke(); }
    for (let i = 0; i < 6; i++) { const px = -100 + r() * 1400, py = 600 + r() * 100; g.fillStyle = 'rgba(140,180,210,.55)'; g.beginPath(); g.ellipse(px, py, 40 + r() * 40, 8 + r() * 5, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(255,255,255,.4)'; g.beginPath(); g.ellipse(px - 10, py - 2, 14, 2, 0, 0, TAU); g.fill(); }
    for (let x = -PAD; x < W + PAD; x += 14) { const hh = 6 + r() * 10; ln(g, [[x, 522], [x + 3, 522 - hh]], 3, ['#4f8034', '#6ea447'][Math.floor(r() * 2)]); }
    for (const x of [140, 1100]) { sh(g, '#8a5a36', 3.5, c => c.roundRect(x, 470, 46, 60, 8)); for (const y of [482, 516]) ln(g, [[x, y], [x + 46, y]], 4, '#5a5a5a'); }
    for (const [x, sz] of [[470, 1], [800, .8]]) { sh(g, '#b8673e', 3, c => { c.moveTo(x - 18 * sz, 520); c.lineTo(x - 22 * sz, 490); c.lineTo(x + 22 * sz, 490); c.lineTo(x + 18 * sz, 520); c.closePath(); }); leafMass(g, x, 470, 34 * sz, 28 * sz, x, ['#2f5a2a', '#477c34', '#6ea447', '#9cc95a']); }
  });
  function street(ctx, t, pan, o = {}) {
    const v = o.v || 'day'; put(ctx, streetLayer(v), pan, .8);
    if (v !== 'rain') { clouds(ctx, t, pan, [[100, 10, .7, 81, 5], [800, 30, .6, 82, 4]]); birds(ctx, t, [[200, 80, 40, 0], [240, 96, 40, 1]]); }
    for (const x of [300, 900]) K.smoke(ctx, t, x - pan * .8, 230, .3);
    if (o.animals !== false && v !== 'rain') { F.chicken(ctx, 1080 - pan * .9, 600, .9, t, { dir: -1, ph: .2 }); F.chicken(ctx, 1150 - pan * .9, 620, .8, t, { ph: .6, col: '#c98a4e' }); F.chicken(ctx, 160 - pan * .9, 610, .85, t, { ph: .4 });
      F.dog(ctx, 240 - pan * .9, 560, .7, t, { dir: 1 }); F.butterfly(ctx, 380 - pan * .5, 300, .9, t, { col: '#f6a04d' }); F.butterfly(ctx, 980 - pan * .5, 260, .8, t, { col: '#a77bd8', ph: 2 }); }
    if (v === 'rain') K.rain(ctx, t, 1, 190, o.slant ?? .5);
    else motes(ctx, t, 16, 7);
  }

  // ================= barracks room at grey dawn =================
  const barracksLayer = layer('barracks', g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#a07a56'], [1, '#7a5a3e']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    for (let x = -PAD; x < W + PAD; x += 60) { ln(g, [[x, 0], [x, 520]], 4, 'rgba(30,18,10,.35)'); ln(g, [[x + 30, 0], [x + 30, 520]], 1.5, 'rgba(255,220,180,.08)'); }
    sh(g, '#6a4a32', 4, c => c.rect(-PAD, 520, W + PAD * 2, 210)); for (let i = 0; i < 8; i++) ln(g, [[-PAD, 540 + i * 24], [W + PAD, 540 + i * 24]], 2, 'rgba(0,0,0,.2)'); sh(g, '#b2342f', 3, c => c.ellipse(640, 640, 300, 40, 0, 0, TAU)); sh(g, '#d9a94a', 0, c => c.ellipse(640, 640, 250, 28, 0, 0, TAU)); sh(g, '#b2342f', 0, c => c.ellipse(640, 640, 190, 18, 0, 0, TAU));
    sh(g, '#2a1d16', 5, c => c.rect(860, 110, 230, 180)); g.fillStyle = grad(g, 0, 110, 0, 290, [[0, '#9fb0c4'], [1, '#d8cbb8']]); g.fillRect(872, 122, 206, 156); ln(g, [[975, 110], [975, 290]], 6, '#2a1d16'); ln(g, [[860, 200], [1090, 200]], 6, '#2a1d16');
    for (const [x, y] of [[60, 360], [60, 470], [420, 360], [420, 470]]) { sh(g, '#6b4a30', 4, c => c.rect(x, y, 300, 26)); sh(g, ['#b2342f', '#3c6a8a', '#c99a3c', '#5f8a4a'][(x + y) % 4 < 0 ? 0 : ((x / 60 + y / 110) | 0) % 4], 3, c => c.roundRect(x + 10, y - 22, 280, 24, 10)); g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 3; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(x + 30 + k * 44, y - 20); g.lineTo(x + 30 + k * 44, y); g.stroke(); } sh(g, '#efe4cc', 3, c => c.roundRect(x + 20, y - 34, 70, 22, 10)); }
    for (const x of [60, 340, 420, 700]) ln(g, [[x + 10, 300], [x + 10, 520]], 9, '#5a3c26');
    for (let i = 0; i < 4; i++) { sh(g, ['#9aa1ac', '#a8392f', '#6d6a3e', '#b3b9c1'][i], 3, c => c.roundRect(760 + i * 34, 330, 26, 90, 6)); }
    sh(g, '#b3b9c1', 3, c => c.arc(1150, 300, 26, Math.PI, TAU)); sh(g, '#3c5a86', 3, c => c.ellipse(1180, 420, 34, 58, 0, 0, TAU));
  });
  function barracks(ctx, t, pan, o = {}) {
    put(ctx, barracksLayer, pan, .6);
    K.beam(ctx, [[872 - pan * .6, 122], [1078 - pan * .6, 122], [760, 720], [420, 720]], .18 + (o.light || 0));
    { const lx = 620 - pan * .6, fl = 1 + Math.sin(t * 11) * .05; ln(ctx, [[lx, 0], [lx, 70]], 3); sh(ctx, '#c98a4e', 3, c => c.roundRect(lx - 16, 70, 32, 40, 6)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, lx, 92, 180 * fl, 'rgba(255,190,100,.35)'); ctx.restore(); sh(ctx, '#ffcf5a', 1.5, c => c.ellipse(lx, 92, 6, 10 * fl, 0, 0, TAU)); }
    motes(ctx, t, 26, 12, [380, 120, 700, 600]);
  }

  // ================= clerk's office (shelves of tablets, lamp) =================
  const officeLayer = layer('office', g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#c4a07a'], [1, '#8f6e50']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    sh(g, '#2c2a36', 4, c => c.rect(500, 60, 280, 200)); g.fillStyle = grad(g, 0, 60, 0, 260, [[0, '#9fc4e8'], [1, '#f2dcb4']]); g.fillRect(508, 68, 264, 184); ln(g, [[640, 60], [640, 260]], 6, '#5a3a22'); hills(g, 252, [[508, 200], [580, 180], [660, 196], [772, 176]], '#8fae64', '#a4be6c', 0);
    for (const [x0, w] of [[-120, 420], [920, 400]]) { sh(g, '#5a3a22', 4, c => c.rect(x0, 60, w, 400)); for (let s = 0; s < 4; s++) { const y = 90 + s * 92; sh(g, '#7a5233', 3, c => c.rect(x0 + 10, y + 70, w - 20, 12)); const r = rng(s + x0);
      for (let x = x0 + 20; x < x0 + w - 30; x += 20 + r() * 14) sh(g, ['#8a6038', '#7a5230', '#9a7048'][Math.floor(r() * 3)], 2, c => c.rect(x, y + 70 - (30 + r() * 30), 10 + r() * 8, 30 + r() * 30)); } }
    sh(g, '#8a5a36', 5, c => c.rect(-PAD, 470, W + PAD * 2, 260)); g.fillStyle = 'rgba(255,220,170,.18)'; g.fillRect(-PAD, 470, W + PAD * 2, 18); for (let i = 0; i < 9; i++) ln(g, [[-PAD, 500 + i * 26], [W + PAD, 500 + i * 26]], 2, 'rgba(60,30,10,.18)');
    sh(g, '#b8673e', 3, c => { c.moveTo(1150, 470); c.lineTo(1140, 420); c.lineTo(1200, 420); c.lineTo(1190, 470); c.closePath(); }); leafMass(g, 1170, 380, 50, 50, 77, ['#2f5a2a', '#477c34', '#6ea447', '#9cc95a']);
    sh(g, '#c98a4e', 3.5, c => c.ellipse(560, 462, 30, 12, 0, 0, TAU));
  });
  function office(ctx, t, pan, o = {}) { put(ctx, officeLayer, pan, .6); const fl = Math.sin(t * 13) * 2; T.glow(ctx, 586 - pan * .6, 430, 260, 'rgba(255,200,120,.35)'); sh(ctx, '#ffcf5a', 2.5, c => { c.moveTo(586 - pan * .6, 452); c.quadraticCurveTo(596 + fl - pan * .6, 432, 588 - pan * .6, 418); c.quadraticCurveTo(578 - fl - pan * .6, 434, 586 - pan * .6, 452); c.closePath(); }); motes(ctx, t, 18, 14); }

  // ================= Theo's studio: warm wall, floating tablets, signature backdrop =================
  const studioLayer = layer('studio', g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#f4d9b0'], [1, '#e6bf8a']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    const r = rng(33); g.fillStyle = 'rgba(160,100,50,.07)'; for (let i = 0; i < 90; i++) { g.beginPath(); g.arc(-PAD + r() * (W + PAD * 2), r() * H, 20 + r() * 80, 0, TAU); g.fill(); }
    g.strokeStyle = 'rgba(160,100,50,.18)'; g.lineWidth = 3; for (let x = -PAD; x < W + PAD; x += 140) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 60, H); g.stroke(); }
    sh(g, '#c99a6a', 0, c => c.rect(-PAD, 560, W + PAD * 2, 170)); g.fillStyle = grad(g, 0, 560, 0, 600, [[0, 'rgba(0,0,0,.18)'], [1, 'rgba(0,0,0,0)']]); g.fillRect(-PAD, 560, W + PAD * 2, 40);
  });
  function studio(ctx, t, pan, o = {}) {
    put(ctx, studioLayer, pan, .3);
    if (!o.plain) for (let i = 0; i < 6; i++) { const x = [120, 300, 980, 1160, 200, 1080][i], y = [140, 330, 120, 300, 480, 470][i] + Math.sin(t * .8 + i) * 10; K.tablet(ctx, x - pan * .5, y, 110, 64, { rot: Math.sin(t * .5 + i) * .1, seed: i + 40, ink: .7, scale: .9 }); }
    T.glow(ctx, 640, 340, 420, 'rgba(255,240,200,.25)'); motes(ctx, t, 20, 21);
  }

  // ================= maps (parchment, animated lines) =================
  const BRIT = [[.3, .04], [.5, .02], [.54, .03], [.53, .07], [.47, .12], [.56, .12], [.62, .13], [.62, .2], [.55, .27], [.5, .31], [.58, .35], [.62, .43], [.7, .47], [.76, .52], [.74, .56], [.8, .6], [.92, .64], [.94, .68], [.92, .73], [.88, .78], [.94, .81], [.92, .84], [.78, .86], [.68, .86], [.56, .88], [.46, .9], [.3, .95], [.38, .88], [.5, .8], [.4, .78], [.3, .76], [.38, .68], [.36, .58], [.48, .58], [.48, .52], [.46, .47], [.4, .44], [.42, .41], [.3, .42], [.26, .44], [.3, .36], [.3, .3], [.22, .33], [.24, .22], [.18, .16], [.22, .1]];
  const IRE = [[.06, .52], [.16, .46], [.24, .5], [.22, .62], [.16, .74], [.04, .78], [-.02, .66]];
  const mapPt = (bx, by, bw, bh) => ([u, v]) => [bx + u * bw, by + v * bh];
  function parchment(g) { g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#ecd9b2'], [1, '#d9bf8e']]); g.fillRect(-PAD, 0, W + PAD * 2, H); const r = rng(4); g.fillStyle = 'rgba(140,100,50,.08)'; for (let i = 0; i < 70; i++) { g.beginPath(); g.arc(-PAD + r() * (W + PAD * 2), r() * H, 20 + r() * 70, 0, TAU); g.fill(); }
    g.fillStyle = 'rgba(120,170,190,.35)'; g.fillRect(-PAD, 0, W + PAD * 2, H); }
  function land(g, pts, fill = '#b9c48a') { const sm = T.smooth(pts, true); sh(g, fill, 4, sm); g.save(); g.beginPath(); sm(g); g.clip();  const r = rng(9); g.strokeStyle = 'rgba(90,110,50,.35)'; g.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = -PAD + r() * (W + PAD * 2), y = r() * H; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 8, y - 10); g.lineTo(x + 16, y); g.stroke(); } g.restore(); }
  const BOX = [380, 30, 520, 660];   // Britain map box (x, y, w, h)
  const britainLayer = layer('map-brit', g => { parchment(g); const f = mapPt(...BOX); land(g, BRIT.map(f)); land(g, IRE.map(mapPt(BOX[0] - 300, BOX[1], 520, 660)), '#c4cc96');
    sh(g, '#b9c48a', 4, c => { c.moveTo(BOX[0] + 520 * 1.04, 700); c.lineTo(BOX[0] + 520 * .98, 690); c.lineTo(BOX[0] + 520 * 1.1, 640); c.lineTo(W + PAD, 600); c.lineTo(W + PAD, 760); c.closePath(); });
    K.txt(g, 'GAUL', 1080, 690, K.FONT(700, 22), 'rgba(60,40,20,.6)', 'center'); K.txt(g, 'HIBERNIA', 140, 380, K.FONT(700, 20), 'rgba(60,40,20,.6)', 'center'); K.txt(g, 'OCEANUS', 1060, 260, K.FONT(700, 22), 'rgba(40,70,90,.5)', 'center'); });
  const MP = mapPt(...BOX);
  const PLACES = { vindolanda: [.52, .42], corbridge: [.57, .422], tyne: [.62, .43], solway: [.42, .412], london: [.84, .79], kent: [.93, .82], carlisle: [.445, .418] };
  function mapBritain(ctx, t, lt, o = {}) {
    const z = o.zoom || 1, fx = o.focus ? MP(PLACES[o.focus] || o.focus) : [640, 360];
    ctx.save(); T.cam(ctx, z, lerp(640, fx[0], Math.min(1, (z - 1) * 2)), lerp(360, fx[1], Math.min(1, (z - 1) * 2)));
    put(ctx, britainLayer, 0, 0);
    if (o.draw) o.draw(ctx, MP);
    ctx.restore();
  }
  function pin(ctx, xy, label, lt, t0, o = {}) { const k = K.pop(lt, t0); if (k <= 0) return; const [x, y] = xy, b = FX.dropBounce(lt - t0, 30, .35); ctx.save(); ctx.translate(x, y - b); ctx.scale(k, k);
    sh(ctx, o.col || '#d8433a', 3.5, c => { c.moveTo(0, 0); c.quadraticCurveTo(-16, -22, -12, -32); c.arc(0, -32, 12, Math.PI, 0); c.quadraticCurveTo(16, -22, 0, 0); c.closePath(); }); sh(ctx, '#fff', 0, circ(0, -32, 5)); ctx.restore();
    if (label) K.tag(ctx, label, x + (o.dx ?? 0), y - 62 + (o.dy ?? 0), lt, t0 + .1, { size: o.size || 20 }); }
  function route(ctx, pts, lt, t0, d, o = {}) { const k = clamp((lt - t0) / d); if (k <= 0) return; let L = 0; const segs = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); L += l; }
    let rem = L * k; ctx.save(); ctx.beginPath(); ctx.moveTo(...pts[0]); let end = pts[0], ang = 0; for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / segs[i - 1]); end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; ang = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]); ctx.lineTo(...end); rem -= segs[i - 1]; }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (o.dash) ctx.setLineDash(o.dash); ctx.lineWidth = (o.w || 7) + 5; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = o.w || 7; ctx.strokeStyle = o.col || '#d8433a'; ctx.stroke(); ctx.setLineDash([]);
    if (o.arrow && k > .05) { ctx.translate(...end); ctx.rotate(ang); sh(ctx, o.col || '#d8433a', 3, c => { c.moveTo(14, 0); c.lineTo(-10, -12); c.lineTo(-10, 12); c.closePath(); }); } ctx.restore(); }
  // Europe: Britain small at left, the continent, the frontier
  const EBOX = [140, 60, 300, 380];
  const europeLayer = layer('map-eu', g => { parchment(g); land(g, BRIT.map(mapPt(...EBOX)));
    const cont = [[300, 760], [340, 560], [430, 520], [520, 470], [560, 440], [600, 420], [640, 400], [700, 380], [760, 350], [800, 300], [820, 230], [870, 220], [900, 290], [960, 300], [1040, 260], [1180, 250], [W + PAD, 240], [W + PAD, 760]];
    land(g, cont, '#c9c88e'); sh(g, '#c9c88e', 4, c => { c.moveTo(990, 760); c.lineTo(1040, 600); c.lineTo(1100, 640); c.lineTo(1120, 760); c.closePath(); });
    K.txt(g, 'BRITANNIA', 290, 470, K.FONT(700, 20), 'rgba(60,40,20,.65)', 'center'); K.txt(g, 'GAUL', 520, 640, K.FONT(700, 22), 'rgba(60,40,20,.6)', 'center'); K.txt(g, 'GERMANIA', 1000, 380, K.FONT(700, 22), 'rgba(60,40,20,.6)', 'center'); K.txt(g, 'ITALIA ↓', 1070, 700, K.FONT(700, 20), 'rgba(60,40,20,.6)', 'center');
    g.save(); g.setLineDash([10, 8]); ln(g, [[640, 420], [700, 440], [800, 470], [900, 520], [1000, 560], [1180, 600]], 4, 'rgba(178,52,47,.7)'); g.restore(); K.txt(g, 'RHINE FRONTIER', 940, 500, K.FONT(700, 16), 'rgba(178,52,47,.8)', 'center'); });
  const EP = mapPt(...EBOX);
  function mapEurope(ctx, t, lt, o = {}) { const z = o.zoom || 1, fx = o.focusXY || [640, 360]; ctx.save(); T.cam(ctx, z, fx[0], fx[1]); put(ctx, europeLayer, 0, 0); if (o.draw) o.draw(ctx, EP); ctx.restore(); }

  // ================= the outpost in drizzle (Masclus) =================
  const outpostLayer = layer('outpost', g => {
    sky(g, [900, 200], SKY.grey, .2); hills(g, 500, smoothPts(-PAD, W + PAD, 400, 80, 91, 9), '#8f9fa0', '#a8b4ac', 2); hills(g, 540, smoothPts(-PAD, W + PAD, 460, 60, 93, 12), '#6f9050', '#86a85e', 2.5);
    g.fillStyle = grad(g, 0, 520, 0, H, [[0, '#7a9a50'], [1, '#56763a']]); g.fillRect(-PAD, 520, W + PAD * 2, 220); { const rr = rng(19); for (let i = 0; i < 40; i++) { const hx = -PAD + rr() * (W + PAD * 2), hy = 540 + rr() * 150; g.fillStyle = ['#9a6aa8', '#b582c0', '#7f5a90'][i % 3]; g.beginPath(); g.ellipse(hx, hy, 18 + rr() * 20, 6 + rr() * 4, 0, 0, TAU); g.fill(); } }
    sh(g, '#7a5c3a', 4, c => c.rect(980, 220, 120, 300)); for (let y = 240; y < 520; y += 40) ln(g, [[980, y], [1100, y]], 3, 'rgba(0,0,0,.3)'); sh(g, '#5a3a22', 4, c => { c.moveTo(960, 220); c.lineTo(1040, 160); c.lineTo(1120, 220); c.closePath(); }); sh(g, '#2c1d16', 3, c => c.rect(1020, 260, 40, 40));
  });
  function outpost(ctx, t, pan, o = {}) { put(ctx, outpostLayer, pan, .6); grey(ctx, t, pan, [[-200, -20, 1.5, 61, 6], [500, -30, 1.4, 62, 5], [900, 0, 1.3, 63, 7]]);
    F.horse(ctx, 150 - pan * .6, 560, .62, t, { coat: '#8a5a36', graze: true, ph: 0 }); F.horse(ctx, 300 - pan * .6, 548, .55, t, { coat: '#3a2a20', mane: '#1a120c', dir: -1, ph: 2 });
    for (let x = -60; x < 420; x += 70) { ln(ctx, [[x - pan * .6, 600], [x - pan * .6, 556]], 6, '#7a5233'); } ln(ctx, [[-60 - pan * .6, 568], [420 - pan * .6, 568]], 5, '#7a5233');
    K.rain(ctx, t, o.rain ?? .55, 120, .15); }

  // ================= the commander's house at lamplight =================
  const houseLayer = layer('house', g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#6a2a24'], [1, '#3a1814']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    for (let x = -PAD; x < W + PAD; x += 260) { sh(g, '#8a3a30', 3, c => c.rect(x + 20, 80, 220, 330)); sh(g, '#d9b06a', 0, c => c.rect(x + 34, 94, 192, 4)); sh(g, '#2a4a3a', 2.5, c => c.rect(x + 50, 120, 160, 250)); g.fillStyle = 'rgba(217,176,106,.6)'; g.beginPath(); g.arc(x + 130, 245, 30, 0, TAU); g.fill(); }
    sh(g, '#2a1410', 4, c => c.rect(-PAD, 470, W + PAD * 2, 260)); const r = rng(2); for (let i = 0; i < 14; i++) for (let j = 0; j < 4; j++) sh(g, (i + j) % 2 ? '#c9b08a' : '#8a6a4a', 1.5, c => c.rect(-PAD + i * 120, 480 + j * 60, 120, 60));
    sh(g, '#6b4628', 4.5, c => c.roundRect(470, 470, 340, 40, 8)); for (const x of [490, 770]) ln(g, [[x, 510], [x, 620]], 14, '#5a3a22');
  });
  function house(ctx, t, pan, o = {}) { put(ctx, houseLayer, pan, .5); const fl = 1 + Math.sin(t * 11) * .04 + Math.sin(t * 7.3) * .03;
    for (const px of [70, 1215]) { const x = px - pan * .5; sh(ctx, '#b8673e', 3, c => { c.moveTo(x - 30, 680); c.lineTo(x - 36, 620); c.lineTo(x + 36, 620); c.lineTo(x + 30, 680); c.closePath(); }); bush(ctx, px, 630, 120, 120, t, px, pan, .5); }
    if (o.cat !== false) F.cat(ctx, 1000 - pan * .5, 700, .8, t, { dir: -1 });
    sh(ctx, '#c98a4e', 3.5, c => c.ellipse(640 - pan * .5, 466, 30, 12, 0, 0, TAU)); sh(ctx, '#ffcf5a', 2.5, c => { const x = 664 - pan * .5; c.moveTo(x, 458); c.quadraticCurveTo(x + 10 * fl, 438, x + 2, 422 - 4 * fl); c.quadraticCurveTo(x - 8, 438, x, 458); c.closePath(); });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .45 * fl; T.glow(ctx, 664 - pan * .5, 430, 520, 'rgba(255,180,90,.6)'); ctx.restore(); motes(ctx, t, 14, 31); }

  // ================= a Briton farmstead (roundhouse) =================
  const farmLayer = layer('farm', g => { sky(g, [300, 300], SKY.grey, .4); hills(g, 500, smoothPts(-PAD, W + PAD, 380, 90, 71, 10), '#9aae86', '#b4c49a', 2); g.fillStyle = grad(g, 0, 480, 0, H, [[0, '#86a85a'], [1, '#5f8040']]); g.fillRect(-PAD, 480, W + PAD * 2, 260);
    for (const [x, s] of [[420, 1], [820, .8]]) { g.save(); g.translate(x, 520); g.scale(s, s); sh(g, '#b08a5a', 4, c => c.rect(-130, -120, 260, 120)); for (let i = 0; i < 12; i++) ln(g, [[-130 + i * 22, -120], [-130 + i * 22, 0]], 2, 'rgba(60,40,20,.35)'); sh(g, '#c9a85a', 4.5, c => { c.moveTo(-160, -110); c.lineTo(0, -280); c.lineTo(160, -110); c.closePath(); }); for (let i = 0; i < 9; i++) ln(g, [[-150 + i * 37, -112], [0, -270]], 2, 'rgba(120,90,30,.5)'); sh(g, '#3a2418', 3.5, c => c.rect(-26, -80, 52, 80)); g.restore(); }
    for (let x = -PAD; x < W + PAD; x += 18) ln(g, [[x, 560], [x, 520]], 5, '#7a5c3a'); ln(g, [[-PAD, 530], [W + PAD, 530]], 4, '#7a5c3a'); });
  function farm(ctx, t, pan, o = {}) { put(ctx, farmLayer, pan, .6); K.smoke(ctx, t, 420 - pan * .6, 250, .35); grey(ctx, t, pan, [[0, 20, 1, 41, 5], [700, 40, .9, 42, 4]]);
    F.sheep(ctx, 960 - pan * .6, 520, .55, t, { ph: 0 }); F.sheep(ctx, 1060 - pan * .6, 530, .5, t, { ph: 1.4, dir: -1 }); F.sheep(ctx, 1150 - pan * .6, 515, .45, t, { ph: 2.2 });
    F.chicken(ctx, 250 - pan * .8, 600, .7, t, { ph: .3, col: '#c98a4e' }); bush(ctx, 120, 620, 180, 80, t, 61, pan, .8); blades(ctx, 100, 725, 18, 110, t, 51, pan, 1.3, 0); }

  // ================= gate at dusk, looking out =================
  const gateLayer = layer('gate', g => { sky(g, [700, 420], SKY.dusk, .9); hills(g, 500, smoothPts(-PAD, W + PAD, 420, 80, 31, 10), '#5a4a5a', '#6a5a66', 2); g.fillStyle = grad(g, 0, 480, 0, H, [[0, '#4a5a3a'], [1, '#2e3a26']]); g.fillRect(-PAD, 480, W + PAD * 2, 260);
    for (const s of [-1, 1]) { sh(g, '#4a3424', 5, c => c.rect(640 + s * 330 - 120, -20, 240, 760)); for (let y = 0; y < 720; y += 30) ln(g, [[640 + s * 330 - 120, y], [640 + s * 330 + 120, y]], 2, 'rgba(0,0,0,.35)'); }
    sh(g, '#4a3424', 5, c => c.rect(200, -20, 880, 90)); });
  function gate(ctx, t, pan, o = {}) { put(ctx, gateLayer, pan, .4); if (o.riders) for (let i = 0; i < 9; i++) { const x = 380 + i * 60 + Math.sin(t * .6 + i) * 8, y = 470 + (i % 3) * 6; ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#2a2030'; ctx.beginPath(); ctx.ellipse(0, -14, 20, 9, 0, 0, TAU); ctx.fill(); ctx.fillRect(-14, -10, 3, 14); ctx.fillRect(12, -10, 3, 14); ctx.beginPath(); ctx.arc(2, -32, 6, 0, TAU); ctx.fill(); ctx.fillRect(16, -26, 8, 4); ctx.restore(); } }

  // ================= the 1973 dig (trench, wet earth) =================
  const digLayer = layer('dig', g => { sky(g, [1000, 200], SKY.grey, .3); hills(g, 330, smoothPts(-PAD, W + PAD, 270, 70, 21, 10), '#8f9f80', '#a7b494', 2); g.fillStyle = '#6f8a4a'; g.fillRect(-PAD, 300, W + PAD * 2, 60);
    sh(g, '#6a4a30', 4, c => c.rect(-PAD, 350, W + PAD * 2, 380)); const cols = ['#5a3e2a', '#6b4a32', '#4f3726', '#7a5638', '#3e2c20']; cols.forEach((col, i) => { g.fillStyle = col; g.fillRect(-PAD, 360 + i * 70, W + PAD * 2, 70); }); const r = rng(6); for (let i = 0; i < 120; i++) sh(g, '#8d857a', 2, c => c.ellipse(-PAD + r() * (W + PAD * 2), 380 + r() * 340, 5 + r() * 8, 3 + r() * 4, r(), 0, TAU));
    g.fillStyle = 'rgba(90,120,140,.5)'; g.fillRect(-PAD, 650, W + PAD * 2, 80); for (let i = 0; i < 8; i++) ln(g, [[i * 180, 300], [i * 180 + 4, 350]], 5, '#c9a46a'); ln(g, [[-PAD, 306], [W + PAD, 306]], 3, '#e0772e'); });
  function dig(ctx, t, pan, o = {}) { put(ctx, digLayer, pan, .5); grey(ctx, t, pan, [[0, 0, 1, 11, 5], [700, 20, .9, 12, 4]]); blades(ctx, 200, 330, 30, 40, t, 71, pan, .5, 0); blades(ctx, 1000, 330, 30, 40, t, 72, pan, .5, 0); F.butterfly(ctx, 300 - pan * .5, 200, .7, t, { col: '#f27ca0' }); }

  G.VS = { SKY, fortExt, street, barracks, office, studio, mapBritain, mapEurope, pin, route, MP, EP, PLACES, outpost, house, farm, gate, dig, flag, BRIT, mapPt };
})(window);
