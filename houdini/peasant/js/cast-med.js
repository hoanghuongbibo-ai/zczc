/* Medieval cast for "Did medieval peasants work less than you?" — drawn after the user's reference frames: big white round heads with
 * soft rosy cheeks and simple eyes, warm brown ink, textured wool and linen, mitten hands, stubby legs in hose and turnshoes.
 * Everything a figure wears or holds is drawn per figure (no shared instances). Feet at y = 0, up is −y; s = 1 ≈ 230 px tall.
 * MED.person(spec) → { draw(ctx, x, y, s, t, o) } with o = { arms, face, look, flip, walk, hold, blink, talk, mouth, breath }.
 * arms: side | wave | point | hip | cross | shrug | hold | up | reach | pray | dig | carry ; face: neutral | smile | grin | frown | shock |
 * tired | sly | sad | stern | worried ; hold: hoe | sickle | spade | crozier | scroll | jug | basket | eggs | hen | rooster | candle | bread | goad | staff */
(function (G) {
  'use strict';
  const INK = '#2b1d16', LW = 3.6;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const mix = (a, b, k) => { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(k)).toString(16).padStart(2, '0')).join(''); };
  const shp = (ctx, fn, fill, o = {}) => { ctx.beginPath(); fn(ctx); if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (o.shade && fill) { ctx.save(); ctx.beginPath(); fn(ctx); ctx.clip(); ctx.fillStyle = o.shade; ctx.beginPath(); ctx.rect(-999, -999, 1998, 1998); ctx.save(); ctx.translate(-(o.dx ?? 8), -(o.dy ?? 0)); fn(ctx); ctx.restore(); ctx.fill('evenodd'); ctx.restore(); }
    if (o.lw !== 0) { ctx.beginPath(); fn(ctx); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = o.lw ?? LW; ctx.strokeStyle = INK; ctx.stroke(); } };
  const tube = (ctx, pts, w, col) => { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = w + LW * 2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
  // cloth texture: woven wool flecks / chain-like stitches clipped to a shape
  const weave = (ctx, fn, col, seed = 1, kind = 'wool') => { ctx.save(); ctx.beginPath(); fn(ctx); ctx.clip(); ctx.strokeStyle = mix(col, '#000000', .18); ctx.lineWidth = 1.2; let s = seed * 9301 % 233280;
    const R = () => (s = (s * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < 46; i++) { const x = -70 + R() * 140, y = -150 + R() * 160; ctx.beginPath(); if (kind === 'wool') { ctx.moveTo(x, y); ctx.lineTo(x + 3, y + 1.5); } else { ctx.arc(x, y, 1.6, 0, 7); } ctx.stroke(); } ctx.restore(); };
  // ---------------------------------------------------------------- hands and arms
  const hand = (ctx, x, y, r = 11, col = '#fbfaf6') => shp(ctx, k => k.arc(x, y, r, 0, 7), col, { lw: 3 });
  // two-segment arm from shoulder (sx,sy) to hand (hx,hy) with an elbow bent outward by `bend`
  const arm = (ctx, sx, sy, hx, hy, bend, col, cuff) => { const mx = (sx + hx) / 2, my = (sy + hy) / 2, dx = hx - sx, dy = hy - sy, L = Math.hypot(dx, dy) || 1, ex = mx - dy / L * bend, ey = my + dx / L * bend; tube(ctx, [[sx, sy], [ex, ey], [hx, hy]], 17, col); if (cuff) { ctx.strokeStyle = cuff; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(lerp(ex, hx, .78) - 6, lerp(ey, hy, .78)); ctx.lineTo(lerp(ex, hx, .78) + 6, lerp(ey, hy, .78)); ctx.stroke(); } };
  const POSE = { // [left hand x,y, right hand x,y, bendL, bendR] in figure space (screen-left hand = L)
    side: [-40, -46, 40, -46, -10, 10], wave: [-40, -46, 112, -150, -10, -14], point: [-40, -46, 96, -112, -10, 6], hip: [-46, -66, 46, -66, 22, -22], cross: [10, -84, -10, -88, -26, 26],
    shrug: [-74, -112, 74, -112, 18, -18], hold: [-26, -80, 26, -80, -14, 14], up: [-92, -196, 92, -196, 26, -26], reach: [-40, -46, 92, -96, -10, 4], pray: [-4, -104, 4, -104, -24, 24],
    dig: [-12, -64, 30, -96, -18, 14], carry: [-34, -92, 34, -92, -20, 20], talk: [-40, -46, 66, -98, -10, 10], fist: [-40, -46, 84, -160, -10, -26], think: [-40, -46, 20, -128, -10, -20] };
  // ---------------------------------------------------------------- faces
  const face = (ctx, f, t, o) => { const lk = (o.look || 0) * 6, bl = o.blink ? 1 : ((t * 1.7 + (o.seed || 0)) % 4.3 < .12 ? 1 : 0), ey = -158;
    // blush
    ctx.fillStyle = 'rgba(240,140,140,.35)'; for (const sx of [-26, 26]) { ctx.beginPath(); ctx.ellipse(sx + lk * .5, -142, 9, 5.5, 0, 0, 7); ctx.fill(); }
    // eyes
    ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round';
    const lids = { tired: .45, sly: .5, stern: .3, sad: .2 }[f] || 0;
    for (const sx of [-15, 15]) { const x = sx + lk, wide = f === 'shock' ? 1.45 : 1; if (bl || f === 'grin') { ctx.lineWidth = 3.4; ctx.beginPath(); if (f === 'grin') ctx.arc(x, ey + 3, 6, Math.PI * 1.1, Math.PI * 1.9); else { ctx.moveTo(x - 6, ey); ctx.lineTo(x + 6, ey); } ctx.stroke(); continue; }
      ctx.beginPath(); ctx.ellipse(x, ey, 4.6 * wide, 6.2 * wide, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x + 1.6, ey - 2.4, 1.6, 0, 7); ctx.fill(); ctx.fillStyle = INK;
      if (lids) { ctx.fillStyle = '#fbfaf6'; ctx.fillRect(x - 8, ey - 9, 16, 14 * lids); ctx.fillStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(x - 7, ey - 9 + 14 * lids); ctx.lineTo(x + 7, ey - 9 + 14 * lids); ctx.stroke(); } }
    // brows
    ctx.lineWidth = 3.4; const br = { frown: [.35, 1], stern: [.3, 1], angry: [.45, 1], worried: [-.35, 1], sad: [-.3, 1], shock: [0, -5], sly: [.15, 0] }[f] || [0, 0];
    for (const sx of [-15, 15]) { const inX = sx < 0 ? sx + lk + 7 : sx + lk - 7, outX = sx < 0 ? sx + lk - 7 : sx + lk + 7, base = -173 + br[1]; ctx.beginPath(); ctx.moveTo(outX, base - br[0] * 7); ctx.lineTo(inX, base + br[0] * 7); ctx.stroke(); }
    // mouth
    const m = o.talk ? (Math.sin(t * 22) > 0 ? 'open' : 'small') : (o.mouth || { smile: 'smile', grin: 'grin', frown: 'frown', shock: 'o', sad: 'frown', worried: 'wobble', tired: 'flat', stern: 'flat', sly: 'smirk' }[f] || 'small'), mx = lk * .8, my = -136;
    ctx.lineWidth = 3.2; ctx.beginPath();
    if (m === 'smile') ctx.arc(mx, my - 6, 9, .25 * Math.PI, .75 * Math.PI); else if (m === 'grin') { shp(ctx, k => { k.moveTo(mx - 12, my - 4); k.quadraticCurveTo(mx, my + 14, mx + 12, my - 4); k.closePath(); }, '#7a2a24', { lw: 3 }); return; }
    else if (m === 'frown') ctx.arc(mx, my + 6, 8, 1.2 * Math.PI, 1.8 * Math.PI); else if (m === 'o' || m === 'open') { shp(ctx, k => k.ellipse(mx, my, m === 'o' ? 6 : 7, m === 'o' ? 8 : 6, 0, 0, 7), '#7a2a24', { lw: 3 }); return; }
    else if (m === 'smirk') { ctx.moveTo(mx - 6, my); ctx.quadraticCurveTo(mx + 4, my + 2, mx + 9, my - 4); } else if (m === 'wobble') { ctx.moveTo(mx - 8, my); ctx.quadraticCurveTo(mx - 4, my - 3, mx, my); ctx.quadraticCurveTo(mx + 4, my + 3, mx + 8, my); } else if (m === 'flat') { ctx.moveTo(mx - 7, my); ctx.lineTo(mx + 7, my); } else { ctx.moveTo(mx - 4, my); ctx.quadraticCurveTo(mx, my + 3, mx + 4, my); }
    ctx.stroke(); };
  // ---------------------------------------------------------------- headwear and hair (drawn behind / in front of the head)
  const HEAD = { r: 50, y: -160 };
  const hairBack = (ctx, c) => { if (c.hair === 'bowl' || c.hair === 'long') shp(ctx, k => { k.moveTo(-54, -150); k.quadraticCurveTo(-60, -216, 0, -218); k.quadraticCurveTo(60, -216, 54, -150); k.lineTo(54, c.hair === 'long' ? -96 : -128); k.lineTo(-54, c.hair === 'long' ? -96 : -128); k.closePath(); }, c.hairCol, { shade: mix(c.hairCol, '#000000', .3), dx: 8 }); };
  const hairFront = (ctx, c, t) => { const hc = c.hairCol; if (c.hair === 'bowl') shp(ctx, k => { k.moveTo(-52, -150); k.quadraticCurveTo(-54, -214, 0, -214); k.quadraticCurveTo(54, -214, 52, -150); k.quadraticCurveTo(46, -166, 34, -170); k.lineTo(-34, -170); k.quadraticCurveTo(-46, -166, -52, -150); k.closePath(); }, hc, { shade: mix(hc, '#000000', .25), dx: 6 });
    if (c.hair === 'tonsure') { shp(ctx, k => { k.moveTo(-52, -146); k.quadraticCurveTo(-56, -196, -36, -200); k.quadraticCurveTo(0, -186, 36, -200); k.quadraticCurveTo(56, -196, 52, -146); k.quadraticCurveTo(46, -170, 30, -178); k.quadraticCurveTo(0, -170, -30, -178); k.quadraticCurveTo(-46, -170, -52, -146); k.closePath(); }, hc, { shade: mix(hc, '#000000', .25), dx: 6 }); }
    if (c.hair === 'curly') for (let i = 0; i < 9; i++) shp(ctx, k => k.arc(-44 + i * 11, -200 - Math.sin(i * 1.3) * 6, 12, 0, 7), hc, { lw: 2.6 });
    if (c.hair === 'long') shp(ctx, k => { k.moveTo(-50, -150); k.quadraticCurveTo(-52, -212, 0, -214); k.quadraticCurveTo(52, -212, 50, -150); k.quadraticCurveTo(30, -196, 0, -194); k.quadraticCurveTo(-30, -196, -50, -150); k.closePath(); }, hc, { shade: mix(hc, '#000000', .25), dx: 6 }); };
  const beard = (ctx, c) => { if (!c.beard) return; const bc = c.beardCol || c.hairCol; if (c.beard === 'stubble') { ctx.fillStyle = 'rgba(90,70,60,.22)'; ctx.beginPath(); ctx.ellipse(0, -128, 34, 18, 0, 0, Math.PI); ctx.fill(); return; }
    const long = c.beard === 'full' ? 22 : 4; shp(ctx, k => { k.moveTo(-44, -150); k.quadraticCurveTo(-42, -112 + long * .3, 0, -100 + long); k.quadraticCurveTo(42, -112 + long * .3, 44, -150); k.quadraticCurveTo(30, -120, 0, -122); k.quadraticCurveTo(-30, -120, -44, -150); k.closePath(); }, bc, { shade: mix(bc, '#000000', .25), dx: 6 }); };
  const HATS = {
    // the chaperon hood: covers the head, opens round the face, cape over the shoulders, a liripipe tail
    hood(ctx, c, t, back) { const col = c.hoodCol; if (back) { shp(ctx, k => { k.moveTo(-72, -96); k.quadraticCurveTo(-74, -226, 0, -230); k.quadraticCurveTo(74, -226, 72, -96); k.quadraticCurveTo(0, -80, -72, -96); k.closePath(); }, col, { shade: mix(col, '#000000', .28), dx: 10 }); const sw = Math.sin(t * 1.4) * 4; tube(ctx, [[30, -222], [62, -214 + sw], [84, -190 + sw]], 11, col); return; }
      const ring = k => { k.ellipse(0, -164, 62, 66, 0, 0, Math.PI * 2); k.moveTo(42, -156); k.arc(0, -156, 42, 0, Math.PI * 2, true); }; shp(ctx, ring, col, { lw: 3.4 }); ctx.fillStyle = mix(col, '#000000', .2); ctx.beginPath(); ctx.ellipse(0, -164, 62, 66, 0, -1.2, 1.2); ctx.arc(0, -156, 46, 1.1, -1.1, true); ctx.closePath(); ctx.fill(); ctx.strokeStyle = mix(col, '#000000', .35); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(0, -156, 49, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); },
    coif(ctx, c, t, back) { if (back) return; const col = '#f2ece0'; shp(ctx, k => { k.moveTo(-50, -142); k.quadraticCurveTo(-56, -214, 0, -216); k.quadraticCurveTo(56, -214, 50, -142); k.quadraticCurveTo(44, -186, 0, -190); k.quadraticCurveTo(-44, -186, -50, -142); k.closePath(); }, col, { shade: '#d8d0c0', dx: 6 }); ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-46, -144); ctx.quadraticCurveTo(-30, -112, 0, -110); ctx.quadraticCurveTo(30, -112, 46, -144); ctx.stroke(); },
    straw(ctx, c, t, back) { if (back) return; shp(ctx, k => k.ellipse(0, -198, 78, 16, 0, 0, 7), '#e0c068', { shade: '#c8a448', dx: 0, dy: -5 }); shp(ctx, k => { k.moveTo(-36, -200); k.quadraticCurveTo(-34, -238, 0, -240); k.quadraticCurveTo(34, -238, 36, -200); k.closePath(); }, '#e8c870', { shade: '#c8a448', dx: 6 }); ctx.strokeStyle = '#b08a38'; ctx.lineWidth = 1.4; for (let i = -60; i <= 60; i += 12) { ctx.beginPath(); ctx.moveTo(i, -206); ctx.lineTo(i * 1.1, -190); ctx.stroke(); } shp(ctx, k => k.rect(-36, -208, 72, 7), '#8a3a2a', { lw: 2 }); },
    cap(ctx, c, t, back) { if (back) return; const col = c.hatCol || '#8a3a2a'; shp(ctx, k => { k.moveTo(-54, -180); k.quadraticCurveTo(-56, -236, 0, -236); k.quadraticCurveTo(56, -236, 54, -180); k.closePath(); }, col, { shade: mix(col, '#000000', .25), dx: 7 }); shp(ctx, k => k.roundRect(-58, -190, 116, 18, 8), mix(col, '#000000', .12), { lw: 3 }); },
    veil(ctx, c, t, back) { const col = c.veilCol || '#f4f0e6'; if (back) { shp(ctx, k => { k.moveTo(-66, -100); k.quadraticCurveTo(-74, -222, 0, -224); k.quadraticCurveTo(74, -222, 66, -100); k.closePath(); }, col, { shade: '#dcd4c4', dx: 10 }); return; }
      shp(ctx, k => { k.moveTo(-40, -120); k.quadraticCurveTo(0, -96, 40, -120); k.lineTo(36, -108); k.quadraticCurveTo(0, -84, -36, -108); k.closePath(); }, '#ffffff', { lw: 2.6 }); const ring = k => { k.moveTo(-60, -130); k.quadraticCurveTo(-64, -228, 0, -230); k.quadraticCurveTo(64, -228, 60, -130); k.lineTo(44, -150); k.arc(0, -158, 44, -0.18, Math.PI + 0.18, true); k.closePath(); }; shp(ctx, ring, col, { lw: 3.2 }); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.beginPath(); ctx.moveTo(60, -130); ctx.quadraticCurveTo(64, -228, 0, -230); ctx.quadraticCurveTo(50, -214, 48, -150); ctx.closePath(); ctx.fill(); },
    crown(ctx, c, t, back) { if (back) return; shp(ctx, k => { k.moveTo(-48, -196); k.lineTo(-52, -240); k.lineTo(-30, -222); k.lineTo(-16, -250); k.lineTo(0, -224); k.lineTo(16, -250); k.lineTo(30, -222); k.lineTo(52, -240); k.lineTo(48, -196); k.closePath(); }, '#e8c040', { shade: '#c09820', dx: 6 }); for (const [x, col] of [[-26, '#c8302a'], [0, '#3a6ac8'], [26, '#3a9a5a']]) shp(ctx, k => k.arc(x, -208, 5, 0, 7), col, { lw: 2 }); },
    cowl(ctx, c, t, back) { if (!back) return; const col = c.robe; shp(ctx, k => { k.moveTo(-64, -104); k.quadraticCurveTo(-70, -150, -40, -156); k.lineTo(40, -156); k.quadraticCurveTo(70, -150, 64, -104); k.closePath(); }, mix(col, '#ffffff', .08), { shade: mix(col, '#000000', .3), dx: 8 }); },
    skull(ctx, c, t, back) { if (back) return; shp(ctx, k => { k.moveTo(-30, -204); k.quadraticCurveTo(0, -224, 30, -204); k.quadraticCurveTo(0, -214, -30, -204); k.closePath(); }, '#1a1414', { lw: 2.4 }); },
  };
  // ---------------------------------------------------------------- props held in the right hand (figure space, at the hand)
  const PROP = {
    hoe(ctx) { ctx.save(); ctx.rotate(-.25); shp(ctx, k => k.roundRect(-4, -110, 8, 190, 3), '#a8804a', { lw: 3 }); shp(ctx, k => { k.moveTo(-4, 76); k.lineTo(-36, 84); k.lineTo(-34, 96); k.lineTo(4, 88); k.closePath(); }, '#7a7e86', { lw: 3 }); ctx.restore(); },
    spade(ctx) { ctx.save(); ctx.rotate(-.15); shp(ctx, k => k.roundRect(-4, -100, 8, 160, 3), '#a8804a', { lw: 3 }); shp(ctx, k => k.roundRect(-14, -114, 28, 14, 5), '#a8804a', { lw: 3 }); shp(ctx, k => { k.moveTo(-16, 58); k.lineTo(16, 58); k.lineTo(13, 92); k.quadraticCurveTo(0, 100, -13, 92); k.closePath(); }, '#8a6a44', { lw: 3 }); shp(ctx, k => k.rect(-16, 84, 32, 10), '#7a7e86', { lw: 2 }); ctx.restore(); },
    sickle(ctx) { shp(ctx, k => k.roundRect(-5, -4, 10, 34, 4), '#8a5a32', { lw: 3 }); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(22, -18, 26, Math.PI * .95, Math.PI * 2.1); ctx.stroke(); ctx.strokeStyle = '#c8ccd4'; ctx.lineWidth = 4.5; ctx.stroke(); },
    crozier(ctx) { shp(ctx, k => k.roundRect(-4, -190, 8, 290, 3), '#c8a040', { lw: 3 }); ctx.strokeStyle = INK; ctx.lineWidth = 11; ctx.beginPath(); ctx.arc(-16, -196, 18, 0, Math.PI * 1.6, true); ctx.stroke(); ctx.strokeStyle = '#e8c050'; ctx.lineWidth = 5; ctx.stroke(); },
    staff(ctx) { shp(ctx, k => k.roundRect(-4, -170, 8, 270, 3), '#8a6a3a', { lw: 3 }); },
    goad(ctx) { ctx.save(); ctx.rotate(.5); shp(ctx, k => k.roundRect(-3, -150, 6, 200, 3), '#9a7a48', { lw: 2.6 }); ctx.restore(); },
    scroll(ctx) { shp(ctx, k => k.rect(-26, -14, 52, 30), '#f2e6c8', { lw: 3 }); for (const x of [-30, 30]) shp(ctx, k => k.roundRect(x - 5, -18, 10, 38, 5), '#e2d2a8', { lw: 2.6 }); ctx.strokeStyle = 'rgba(80,60,40,.6)'; ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-18, -6 + i * 8); ctx.lineTo(18, -6 + i * 8); ctx.stroke(); } },
    jug(ctx) { shp(ctx, k => { k.moveTo(-14, -30); k.lineTo(14, -30); k.quadraticCurveTo(26, 0, 14, 24); k.lineTo(-14, 24); k.quadraticCurveTo(-26, 0, -14, -30); k.closePath(); }, '#b8784a', { shade: '#8a5a32', dx: 6 }); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(20, -4, 11, -1.3, 1.3); ctx.stroke(); },
    basket(ctx) { shp(ctx, k => { k.moveTo(-34, -10); k.lineTo(34, -10); k.lineTo(26, 24); k.lineTo(-26, 24); k.closePath(); }, '#c8a060', { shade: '#a07a40', dx: 6 }); ctx.strokeStyle = '#8a6a34'; ctx.lineWidth = 1.6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-32 + i, -2 + i * 7); ctx.lineTo(32 - i, -2 + i * 7); ctx.stroke(); } ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -10, 30, Math.PI, 0); ctx.stroke(); },
    eggs(ctx, t) { PROP.basket(ctx); for (let i = 0; i < 5; i++) shp(ctx, k => k.ellipse(-20 + i * 10, -14 - (i % 2) * 4, 6, 8, 0, 0, 7), i % 2 ? '#f4ead8' : '#e8d4b0', { lw: 2 }); },
    candle(ctx, t) { shp(ctx, k => k.ellipse(0, 10, 18, 6, 0, 0, 7), '#c8a040', { lw: 2.6 }); shp(ctx, k => k.rect(-6, -34, 12, 44), '#f4ead0', { lw: 2.6 }); const f = Math.sin(t * 13) * 1.5; shp(ctx, k => { k.moveTo(0, -36); k.quadraticCurveTo(8, -46, f, -58); k.quadraticCurveTo(-8, -46, 0, -36); k.closePath(); }, '#f8c040', { lw: 2 }); },
    bread(ctx) { shp(ctx, k => k.ellipse(0, 0, 26, 16, -.2, 0, 7), '#c8884a', { shade: '#a8683a', dx: 0, dy: -5 }); ctx.strokeStyle = '#8a5428'; ctx.lineWidth = 2; for (const x of [-10, 2, 14]) { ctx.beginPath(); ctx.moveTo(x - 4, -8); ctx.lineTo(x + 2, 4); ctx.stroke(); } },
    hen(ctx, t) { G.MEDA && G.MEDA.hen(ctx, 0, 14, .7, t, { col: '#c87a3a' }); },
    rooster(ctx, t) { G.MEDA && G.MEDA.hen(ctx, 0, 14, .8, t, { rooster: true }); },
    flail(ctx, t) { shp(ctx, k => k.roundRect(-4, -90, 8, 130, 3), '#a8804a', { lw: 3 }); ctx.save(); ctx.translate(0, -90); ctx.rotate(Math.sin(t * 5) * .6); shp(ctx, k => k.roundRect(-4, -60, 8, 60, 3), '#8a6a3a', { lw: 3 }); ctx.restore(); },
    mug(ctx) { shp(ctx, k => k.roundRect(-14, -24, 28, 34, 5), '#8a6a44', { shade: '#6a4a2a', dx: 5 }); shp(ctx, k => k.ellipse(0, -24, 14, 4, 0, 0, 7), '#e8d8a8', { lw: 2 }); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(16, -8, 8, -1.4, 1.4); ctx.stroke(); },
  };
  // ---------------------------------------------------------------- the person
  const BODY = {
    // knee-length belted tunic over hose
    tunic(ctx, c, t, br) { const col = c.tunic, fn = k => { k.moveTo(-34, -112 - br); k.quadraticCurveTo(-46, -100, -50, -46); k.quadraticCurveTo(-52, -34, -44, -30); k.lineTo(44, -30); k.quadraticCurveTo(52, -34, 50, -46); k.quadraticCurveTo(46, -100, 34, -112 - br); k.quadraticCurveTo(0, -102, -34, -112 - br); k.closePath(); };
      shp(ctx, fn, col, { shade: mix(col, '#000000', .2), dx: 10 }); weave(ctx, fn, col, c.seed || 3, c.mail ? 'mail' : 'wool'); ctx.strokeStyle = mix(col, '#000000', .3); ctx.lineWidth = 1.6; for (const x of [-22, 22]) { ctx.beginPath(); ctx.moveTo(x, -64); ctx.lineTo(x * 1.3, -32); ctx.stroke(); }
      shp(ctx, k => k.roundRect(-48, -72, 96, 9, 4), c.belt || '#5a3a22', { lw: 2.6 }); shp(ctx, k => k.rect(-5, -73, 10, 11), '#c8a040', { lw: 2 }); if (c.pouch !== false) shp(ctx, k => { k.moveTo(24, -64); k.lineTo(40, -64); k.quadraticCurveTo(42, -44, 32, -42); k.quadraticCurveTo(22, -44, 24, -64); k.closePath(); }, '#7a5434', { lw: 2.4 }); if (c.patch) shp(ctx, k => k.rect(-30, -56, 16, 14), mix(col, '#ffffff', .2), { lw: 2 }); },
    // a long kirtle (women) or a long robe (clergy, king): to the ankles
    robe(ctx, c, t, br) { const col = c.robe, fn = k => { k.moveTo(-34, -112 - br); k.quadraticCurveTo(-50, -90, -58, -14); k.quadraticCurveTo(-58, -2, -48, 0); k.lineTo(48, 0); k.quadraticCurveTo(58, -2, 58, -14); k.quadraticCurveTo(50, -90, 34, -112 - br); k.quadraticCurveTo(0, -102, -34, -112 - br); k.closePath(); };
      shp(ctx, fn, col, { shade: mix(col, '#000000', .22), dx: 12 }); weave(ctx, fn, col, c.seed || 5); ctx.strokeStyle = mix(col, '#000000', .35); ctx.lineWidth = 1.8; for (const x of [-26, 0, 26]) { ctx.beginPath(); ctx.moveTo(x * .6, -60); ctx.quadraticCurveTo(x, -30, x * 1.2, -4); ctx.stroke(); }
      if (c.scapular) shp(ctx, k => { k.moveTo(-20, -108); k.lineTo(20, -108); k.lineTo(24, -4); k.lineTo(-24, -4); k.closePath(); }, mix(col, '#ffffff', .06), { lw: 2.4 });
      if (c.ermine) { shp(ctx, k => { k.moveTo(-40, -112); k.quadraticCurveTo(0, -84, 40, -112); k.lineTo(44, -96); k.quadraticCurveTo(0, -70, -44, -96); k.closePath(); }, '#f8f6f2', { lw: 2.6 }); ctx.fillStyle = INK; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(-30 + i * 10, -96 + Math.abs(i - 3) * -3, 1.6, 3, 0, 0, 7); ctx.fill(); } }
      if (c.apron) { shp(ctx, k => { k.moveTo(-30, -76); k.lineTo(30, -76); k.quadraticCurveTo(36, -30, 30, -8); k.lineTo(-30, -8); k.quadraticCurveTo(-36, -30, -30, -76); k.closePath(); }, c.apron, { shade: mix(c.apron, '#000000', .12), dx: 6 }); }
      shp(ctx, k => k.roundRect(-44, -76, 88, 7, 3), c.belt || mix(col, '#000000', .45), { lw: 2.2 }); if (c.cross) { ctx.strokeStyle = '#e8c040'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -102); ctx.lineTo(0, -82); ctx.moveTo(-7, -95); ctx.lineTo(7, -95); ctx.stroke(); } },
  };
  class Person {
    constructor(c) { this.c = Object.assign({ hair: 'bowl', hairCol: '#6a4428', tunic: '#8a6a44', hose: '#5a4a3a', shoe: '#4a3020', body: 'tunic', hoodCol: '#6a7a4a', robe: '#3a3436', hat: null }, c); }
    draw(ctx, x, y, s, t, o = {}) { const c = this.c; ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
      const br = o.breath === false ? 0 : Math.sin(t * 2.2 + (c.seed || 0)) * 1.4, wk = o.walk ? Math.sin(o.walk * Math.PI * 2) : 0, bob = o.walk ? Math.abs(Math.cos(o.walk * Math.PI * 2)) * -4 : 0;
      ctx.translate(0, bob);
      // contact shadow
      if (!o.noShadow) { ctx.fillStyle = 'rgba(40,30,20,.22)'; ctx.beginPath(); ctx.ellipse(0, -bob + 2, 46, 9, 0, 0, 7); ctx.fill(); }
      // hat back layers (hood cape, veil back, cowl)
      if (c.hat && HATS[c.hat]) HATS[c.hat](ctx, c, t, true); else hairBack(ctx, c);
      // legs (hidden by long robes)
      if (c.body === 'tunic') for (const sd of [-1, 1]) { const lift = o.walk ? Math.max(0, wk * sd) * 10 : 0, fx = sd * 16 + (o.walk ? wk * sd * 8 : 0); tube(ctx, [[sd * 16, -36], [fx, -8 - lift]], 15, c.hose); shp(ctx, k => k.ellipse(fx + sd * 4, -4 - lift, 15, 8, 0, 0, 7), c.shoe, { lw: 3 }); }
      else for (const sd of [-1, 1]) shp(ctx, k => k.ellipse(sd * 20 + (o.walk ? wk * sd * 6 : 0), -2, 15, 7, 0, 0, 7), c.shoe, { lw: 3 });
      // arms behind for some poses are drawn after; body
      const P = POSE[o.arms || 'side'], sl = [-36, -104 - br], sr = [36, -104 - br];
      const sw = o.walk ? wk * 14 : 0, hl = [P[0] - (o.arms ? 0 : sw), P[1]], hr = [P[2] + (o.arms ? 0 : sw), P[3]];
      const sleeve = c.body === 'robe' ? c.robe : c.tunic;
      if (o.arms === 'cross' || o.arms === 'pray') { BODY[c.body](ctx, c, t, br); arm(ctx, sl[0], sl[1], hl[0], hl[1], P[4], sleeve); arm(ctx, sr[0], sr[1], hr[0], hr[1], P[5], sleeve); hand(ctx, hl[0], hl[1]); hand(ctx, hr[0], hr[1]); }
      else { arm(ctx, sl[0], sl[1], hl[0], hl[1], P[4], sleeve); BODY[c.body](ctx, c, t, br); }
      // head
      ctx.save(); ctx.translate(0, -br * .6); ctx.rotate((o.tilt || 0));
      if (o.back) { const hc = c.hat === 'hood' ? c.hoodCol : c.hat === 'veil' ? (c.veilCol || '#f4f0e6') : c.hat === 'coif' ? '#f2ece0' : (c.hair === 'tonsure' || c.hair === 'none' ? '#fbfaf6' : c.hairCol); shp(ctx, k => k.arc(0, HEAD.y, HEAD.r + (c.hat === 'hood' ? 10 : 2), 0, 7), hc, { shade: mix(hc, '#000000', .2), dx: -10 }); if (c.hair === 'tonsure') { ctx.save(); ctx.beginPath(); ctx.arc(0, HEAD.y, HEAD.r - 1.5, 0, 7); ctx.clip(); ctx.fillStyle = c.hairCol; ctx.fillRect(-60, HEAD.y - 22, 120, 80); ctx.restore(); } if (c.hat === 'cowl') { shp(ctx, k => { k.moveTo(-70, -96); k.quadraticCurveTo(-74, -140, -40, -128); k.quadraticCurveTo(0, -118, 40, -128); k.quadraticCurveTo(74, -140, 70, -96); k.closePath(); }, mix(c.robe, '#ffffff', .1), { shade: mix(c.robe, '#000000', .3), dx: -8 }); } if (c.hat === 'cap' || c.hat === 'straw' || c.hat === 'crown') HATS[c.hat](ctx, c, t, false); }
      else { shp(ctx, k => k.arc(0, HEAD.y, HEAD.r, 0, 7), '#fbfaf6', { shade: '#e6e2da', dx: -8 }); hairFront(ctx, c, t); beard(ctx, c); face(ctx, o.face || 'neutral', t, Object.assign({ seed: c.seed }, o)); if (c.hat && HATS[c.hat]) HATS[c.hat](ctx, c, t, false); }
      ctx.restore();
      if (!(o.arms === 'cross' || o.arms === 'pray')) { arm(ctx, sr[0], sr[1], hr[0], hr[1], P[5], sleeve); hand(ctx, hl[0], hl[1]); if (o.hold && PROP[o.hold]) { ctx.save(); ctx.translate(hr[0], hr[1]); PROP[o.hold](ctx, t); ctx.restore(); } hand(ctx, hr[0], hr[1]); }
      ctx.restore(); }
  }
  const P = spec => new Person(spec);
  // ---------------------------------------------------------------- the cast
  const MED = { Person, P, PROP, POSE, shp, tube, mix, INK, LW, weave };
  MED.hugh = () => P({ seed: 11, hair: 'bowl', hairCol: '#7a4a28', beard: 'short', beardCol: '#7a4a28', tunic: '#8a7048', hose: '#6a5a44', hat: null, patch: true });           // Hugh Miller, villein of Alwalton
  MED.hughHood = () => P({ seed: 11, hair: 'bowl', hairCol: '#7a4a28', beard: 'short', beardCol: '#7a4a28', tunic: '#8a7048', hose: '#6a5a44', hat: 'hood', hoodCol: '#5a6a3e', patch: true });
  MED.wife = () => P({ seed: 12, body: 'robe', robe: '#6a7a98', hat: 'veil', apron: '#e8dcc0', hair: 'none' });                                                   // Hugh's wife (unnamed in the record)
  MED.son = () => P({ seed: 13, hair: 'bowl', hairCol: '#8a5a30', tunic: '#a88a5a', hose: '#7a6a50', pouch: false });
  MED.daughter = () => P({ seed: 14, body: 'robe', robe: '#9a6a5a', hat: 'coif', apron: '#e8dcc0' });
  MED.abbot = () => P({ seed: 21, body: 'robe', robe: '#2a2628', hair: 'tonsure', hairCol: '#8a8a8a', hat: 'cowl', scapular: true, cross: true });                 // the Abbot of Peterborough (Benedictine black habit)
  MED.monk = () => P({ seed: 22, body: 'robe', robe: '#2e2a2c', hair: 'tonsure', hairCol: '#6a4a2a', hat: 'cowl', scapular: true });
  MED.steward = () => P({ seed: 23, hair: 'long', hairCol: '#3a2a20', beard: 'short', beardCol: '#3a2a20', tunic: '#3a5a7a', hose: '#2a2a3a', hat: 'cap', hatCol: '#7a2a2a', belt: '#2a1a12' });
  MED.reeve = () => P({ seed: 24, hair: 'bowl', hairCol: '#5a3a22', beard: 'stubble', tunic: '#6a7a4a', hose: '#4a4a3a', hat: 'cap', hatCol: '#5a4a2a' });
  MED.walter = () => P({ seed: 25, hair: 'curly', hairCol: '#c8783a', beard: 'stubble', tunic: '#7a6a8a', hose: '#5a4a3a', patch: true });
  MED.villein = (seed, o = {}) => { const R = n => ((seed * 9301 + n * 49297) % 233280) / 233280, tun = ['#8a7048', '#6a7a4a', '#7a5a4a', '#8a8070', '#5a6a7a', '#9a7a5a'][seed % 6], hc = ['#6a4428', '#3a2a20', '#8a5a30', '#c8783a', '#2a1e18'][seed % 5];
    return P(Object.assign({ seed, hair: ['bowl', 'curly', 'bowl', 'long'][seed % 4], hairCol: hc, beard: R(1) > .5 ? 'short' : (R(2) > .5 ? 'stubble' : null), beardCol: hc, tunic: tun, hose: mix(tun, '#000000', .35), hat: [null, 'hood', 'coif', 'straw', null, 'hood'][seed % 6], hoodCol: ['#5a6a3e', '#7a4a3a', '#6a6a7a'][seed % 3] }, o)); };
  MED.villager = (seed) => seed % 3 === 2 ? P({ seed, body: 'robe', robe: ['#6a7a98', '#9a6a5a', '#7a8a5a'][seed % 3], hat: seed % 2 ? 'veil' : 'coif', apron: '#e8dcc0' }) : MED.villein(seed);
  MED.edward3 = () => P({ seed: 31, body: 'robe', robe: '#a8242a', hair: 'long', hairCol: '#c8a060', beard: 'full', beardCol: '#c8a060', hat: 'crown', ermine: true, belt: '#e8c040' });
  MED.edward1 = () => P({ seed: 32, body: 'robe', robe: '#3a4a9a', hair: 'long', hairCol: '#6a5040', beard: 'short', beardCol: '#6a5040', hat: 'crown', ermine: true, belt: '#e8c040' });
  MED.advisor = () => P({ seed: 33, body: 'robe', robe: '#3a6a4a', hair: 'bowl', hairCol: '#2a2a2a', hat: 'cap', hatCol: '#1a1a1a' });
  MED.clerk = () => P({ seed: 34, body: 'robe', robe: '#5a4a6a', hair: 'tonsure', hairCol: '#4a3a2a', hat: 'skull' });
  MED.coroner = () => P({ seed: 35, hair: 'long', hairCol: '#4a3a2a', tunic: '#4a3a5a', hose: '#2a2a2a', hat: 'cap', hatCol: '#2a2a3a', beard: 'short', beardCol: '#4a3a2a' });
  G.MED = MED;
})(window);
