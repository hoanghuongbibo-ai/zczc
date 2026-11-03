/* The War of Jenkins' Ear — polish pass: a deeper sea (perspective swells, crest highlights, a bright horizon line, foam), a sky
 * with a far layer of thin horizon cloud, and Mount Vernon rebuilt from its river front (the two-storey piazza of eight square
 * columns, red roof with dormers and the cupola with its dove weathervane, shuttered windows, the flanking dependencies). */
(function (G) {
  'use strict';
  const JS = G.JS, S = G.Sets2, MS = G.MS, C2 = G.Cast2, shp = C2.shp, mix = C2.mix, INK = C2.INK;
  const lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const rng = s => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  // ---------------------------------------------------------------- sea
  const sea1 = JS.sea; JS.sea = (ctx, t, hz = 420, o = {}) => { sea1(ctx, t, hz, o); if (o.polish === false) return; const col = o.col || '#3a7ab8', calm = o.calm || 0;
    ctx.save(); ctx.beginPath(); ctx.rect(-1300, hz, 3900, 1500); ctx.clip();
    // long swells in perspective: farther = thinner and closer together; each has a lit crest and a darker trough
    for (let j = 1; j < 11; j++) { const u = j / 11, y = hz + Math.pow(u, 1.8) * 560, amp = (2 + u * 16) * (1 - calm * .8), wl = 90 + u * 420, ph = t * (.5 + u * .6) + j * 1.7;
      ctx.beginPath(); ctx.moveTo(-1300, y + 60 * u); for (let x = -1300; x <= 2600; x += 24) ctx.lineTo(x, y + Math.sin(x / wl * 6.28 + ph) * amp); ctx.lineTo(2600, y + 60 * u + 40); ctx.lineTo(-1300, y + 60 * u + 40); ctx.closePath(); ctx.fillStyle = `rgba(${mix(col, '#000000', .45).slice(1).match(/../g).map(h => parseInt(h, 16)).join(',')},${.06 + u * .06})`; ctx.fill();
      ctx.beginPath(); for (let x = -1300; x <= 2600; x += 24) { const yy = y + Math.sin(x / wl * 6.28 + ph) * amp; x === -1300 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.strokeStyle = `rgba(255,255,255,${(.07 + u * .1) * (1 - calm * .5)})`; ctx.lineWidth = 1 + u * 2; ctx.stroke(); }
    // foam caps catching the light in the foreground
    if (calm < .6) { const R = rng(11); for (let i = 0; i < 26; i++) { const u = .45 + R() * .55, y = hz + Math.pow(u, 1.8) * 560, x = ((R() * 2200 + t * 14 * u) % 2400) - 500, w = 14 + u * 40, life = .5 + .5 * Math.sin(t * 1.3 + i * 2.1); if (life < .2) continue; ctx.fillStyle = `rgba(255,255,255,${.55 * life})`; ctx.beginPath(); ctx.ellipse(x, y, w * life, 2 + u * 3, 0, Math.PI, 0); ctx.fill(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x - w * .6 + k * w * .6, y + 4, 1.5 + u * 1.5, 0, 7); ctx.fill(); } } }
    ctx.restore();
    // the bright line where sea meets sky
    const hg = ctx.createLinearGradient(0, hz - 6, 0, hz + 10); hg.addColorStop(0, 'rgba(255,255,255,0)'); hg.addColorStop(.4, 'rgba(255,255,255,.55)'); hg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hg; ctx.fillRect(-1300, hz - 6, 3900, 16); };
  // ---------------------------------------------------------------- sky: a far layer of thin cloud streaks along the horizon
  const sky1 = JS.sky; JS.sky = (ctx, t, tod = 'day', hz = 400, o = {}) => { sky1(ctx, t, tod, hz, o); if (tod === 'night' || o.polish === false) return; const R = rng(23), c = tod === 'storm' ? '120,124,136' : tod === 'dusk' || tod === 'dawn' ? '255,214,190' : '255,255,255';
    for (let i = 0; i < 9; i++) { const y = hz - 18 - R() * 70, x = ((R() * 2200 + t * 3) % 2600) - 600, w = 160 + R() * 260; ctx.fillStyle = `rgba(${c},${.18 + R() * .18})`; ctx.beginPath(); ctx.ellipse(x, y, w, 5 + R() * 6, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + w * .3, y - 6, w * .5, 4 + R() * 4, 0, 0, 7); ctx.fill(); } };
  // ---------------------------------------------------------------- Mount Vernon, river front
  JS.mountVernon = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const W2 = 270, H = 168, wall = '#f3efe4', roof = '#b8442e', roofDk = '#8e3020', sh = '#3a4a3a';
    // dependencies left and right, set back (smaller, hazier)
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 400, -6); ctx.scale(.55, .55); ctx.globalAlpha = .92; shp(ctx, k => k.rect(-120, -110, 240, 110), mix(wall, '#c8d0d8', .2), { lw: 3 }); shp(ctx, k => { k.moveTo(-136, -110); k.lineTo(-90, -160); k.lineTo(90, -160); k.lineTo(136, -110); k.closePath(); }, mix(roof, '#c8d0d8', .2), { lw: 3 }); for (let c = 0; c < 4; c++) shp(ctx, k => k.rect(-96 + c * 56, -84, 24, 36), '#2a3448', { lw: 2.5 }); shp(ctx, k => k.rect(-14, -50, 28, 50), '#5a3a24', { lw: 2.5 }); ctx.restore(); }
    // curved covered walkways (colonnades) linking them
    for (const sd of [-1, 1]) { ctx.strokeStyle = INK; ctx.lineWidth = 2.5; shp(ctx, k => { k.moveTo(sd * W2, -60); k.quadraticCurveTo(sd * 320, -40, sd * 336, -16); k.lineTo(sd * 336, -6); k.quadraticCurveTo(sd * 316, -30, sd * W2, -46); k.closePath(); }, roof, { lw: 2.5 }); for (let i = 0; i < 4; i++) { const px = sd * (W2 + 12 + i * 17); shp(ctx, k => k.rect(px - 2.5, -54 + i * 10, 5, 50 - i * 8), '#fbfaf6', { lw: 1.6 }); } }
    // main block: wooden boards cut and painted to look like stone (rusticated), with sand in the paint
    shp(ctx, k => k.rect(-W2, -H, W2 * 2, H), wall, { shade: '#dcd6c8', dx: -16 }); ctx.save(); ctx.beginPath(); ctx.rect(-W2, -H, W2 * 2, H); ctx.clip(); ctx.strokeStyle = 'rgba(140,130,110,.45)'; ctx.lineWidth = 1.3; for (let r = 0; r < 10; r++) for (let c = 0; c < 20; c++) ctx.strokeRect(-W2 + c * 28 + (r % 2) * 14, -H + r * 17, 28, 17); ctx.restore();
    // windows with dark green shutters, two storeys
    for (let c = 0; c < 9; c++) for (let r = 0; r < 2; r++) { const wx = -232 + c * 58, wy = -H + 22 + r * 74; shp(ctx, k => k.rect(wx - 10, wy - 2, 8, 44), '#2e4a32', { lw: 1.6 }); shp(ctx, k => k.rect(wx + 26, wy - 2, 8, 44), '#2e4a32', { lw: 1.6 }); shp(ctx, k => k.rect(wx, wy, 24, 40), '#2a3448', { lw: 2.2 }); ctx.strokeStyle = '#e8e4da'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(wx + 12, wy); ctx.lineTo(wx + 12, wy + 40); ctx.moveTo(wx, wy + 13); ctx.lineTo(wx + 24, wy + 13); ctx.moveTo(wx, wy + 27); ctx.lineTo(wx + 24, wy + 27); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(wx + 2, wy + 2, 8, 9); }
    // the piazza: shade under its roof, flagstone floor, eight square columns running the full height
    ctx.fillStyle = 'rgba(40,40,50,.22)'; ctx.fillRect(-W2, -H, W2 * 2, 18); shp(ctx, k => k.rect(-W2 - 6, -10, W2 * 2 + 12, 12), '#c8b8a0', { lw: 2.2 }); ctx.strokeStyle = 'rgba(90,70,50,.5)'; ctx.lineWidth = 1; for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.moveTo(-W2 + i * 23, -10); ctx.lineTo(-W2 + i * 23 - 4, 2); ctx.stroke(); }
    for (let i = 0; i < 8; i++) { const px = -W2 + 14 + i * ((W2 * 2 - 28) / 7); shp(ctx, k => k.rect(px - 9, -H, 18, H - 10), '#fbfaf6', { shade: '#dedad2', dx: -6, lw: 2.2 }); shp(ctx, k => k.rect(px - 12, -H, 24, 7), '#fbfaf6', { lw: 1.8 }); shp(ctx, k => k.rect(px - 12, -17, 24, 7), '#fbfaf6', { lw: 1.8 }); }
    // cornice, hipped roof with three dormers, two chimneys
    shp(ctx, k => k.rect(-W2 - 10, -H - 10, W2 * 2 + 20, 12), '#fbfaf6', { lw: 2.4 });
    shp(ctx, k => { k.moveTo(-W2 - 18, -H - 10); k.lineTo(-W2 + 50, -H - 78); k.lineTo(W2 - 50, -H - 78); k.lineTo(W2 + 18, -H - 10); k.closePath(); }, roof, { shade: roofDk, dx: 0, dy: -10 }); ctx.strokeStyle = 'rgba(80,20,10,.35)'; ctx.lineWidth = 1.2; for (let i = 1; i < 7; i++) { const yy = -H - 10 - i * 10; ctx.beginPath(); ctx.moveTo(-W2 - 18 + i * 10, yy); ctx.lineTo(W2 + 18 - i * 10, yy); ctx.stroke(); }
    for (const dx of [-150, 0, 150]) { shp(ctx, k => k.rect(dx - 18, -H - 62, 36, 34), '#fbfaf6', { lw: 2.2 }); shp(ctx, k => { k.moveTo(dx - 24, -H - 62); k.lineTo(dx, -H - 84); k.lineTo(dx + 24, -H - 62); k.closePath(); }, '#fbfaf6', { lw: 2.2 }); shp(ctx, k => k.rect(dx - 9, -H - 56, 18, 24), '#2a3448', { lw: 1.6 }); }
    for (const dx of [-170, 170]) { shp(ctx, k => k.rect(dx - 12, -H - 108, 24, 44), '#f3efe4', { lw: 2.4 }); shp(ctx, k => k.rect(dx - 15, -H - 112, 30, 8), '#d8d4ca', { lw: 2 }); }
    // the cupola: white, arched windows, a red bell roof, the dove of peace weathervane turning a little in the wind
    shp(ctx, k => k.rect(-24, -H - 128, 48, 50), '#fbfaf6', { lw: 2.4 }); for (const dx of [-12, 12]) shp(ctx, k => { k.moveTo(dx - 6, -H - 88); k.lineTo(dx - 6, -H - 112); k.quadraticCurveTo(dx, -H - 120, dx + 6, -H - 112); k.lineTo(dx + 6, -H - 88); k.closePath(); }, '#2a3448', { lw: 1.6 });
    shp(ctx, k => { k.moveTo(-30, -H - 128); k.quadraticCurveTo(-26, -H - 160, 0, -H - 166); k.quadraticCurveTo(26, -H - 160, 30, -H - 128); k.closePath(); }, roof, { lw: 2.4 }); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -H - 166); ctx.lineTo(0, -H - 196); ctx.stroke();
    ctx.save(); ctx.translate(0, -H - 196); ctx.scale(Math.cos(t * .4) > 0 ? 1 : -1, 1); shp(ctx, k => { k.moveTo(-16, 0); k.quadraticCurveTo(-4, -8, 10, -4); k.lineTo(18, -8); k.lineTo(14, 0); k.quadraticCurveTo(0, 6, -16, 0); k.closePath(); k.moveTo(-2, -4); k.lineTo(2, -16); k.lineTo(8, -4); }, '#2a3a2a', { lw: 1.6 }); ctx.restore();
    ctx.restore(); };
})(window);
