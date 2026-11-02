/* "Did Medieval Peasants Work Less Than You?" — cast, wardrobe and farm animals.
 * Outfits: tunicC(col) peasant tunic + hose (colour variants), kirtle(col) woman's dress + apron, monk (black Benedictine
 *   habit, scapular, cowl), abbotRobe (habit + gold pectoral cross), stewardRobe (long hooded gown), royalRobe (from
 *   monalisa/js/cast.js) with a crown, rebelTunic. Hats: coif (white linen cap), wimple, tonsure (bald crown ring via look).
 * Animals (G.FARM): ox(g,x,y,s,t,o) cow(...) rooster(...) pig(...) plough(g,x,y,s) — side views, feet at (x,y). */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, bodyPath, garment } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, TAU = Math.PI * 2, PI = Math.PI;
  const T = G.Toon, P = G.Paint, { sh, ln } = P, mul = (c, k) => Gd.hexMul(c, k);
  const tunicC = (col, hose, hat = 'none', belt = '#5a3a1e') => ({ hat, arm: { sleeve: col, w: 32, cuff: mul(col, .85) }, legs: { kind: 'trousers', c: hose }, feet: 'boots', boot: '#4a3020',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -96, 1.1), col, 'rgba(0,0,0,.22)'); if (B.back) return;
      path(ctx, c => c.rect(-66 * nar, -150, 132 * nar, 12), belt, 3); path(ctx, c => c.rect(vx + 18, -142, 22, 30), '#8a6a3a', 2.5);
      path(ctx, c => { c.moveTo(vx - 26, top + 2); c.lineTo(vx, top + 30); c.lineTo(vx + 26, top + 2); c.closePath(); }, mul(col, .8), 3);
      ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,.16)'; ctx.lineWidth = 3; for (const x of [-40, 0, 40]) { ctx.beginPath(); ctx.moveTo(x * nar, -140); ctx.lineTo(x * nar * 1.1, -96); ctx.stroke(); } ctx.restore(); } });
  O.tunicBrown = tunicC('#8a6a44', '#5a4a3a', 'hood'); O.tunicGreen = tunicC('#5a7a44', '#6a5a44'); O.tunicRed = tunicC('#a8483a', '#4a4a52', 'feltCap');
  O.tunicBlue = tunicC('#4a6a8a', '#6a5a44', 'woolCap'); O.tunicGrey = tunicC('#7a7a70', '#5a4a3a'); O.tunicOchre = tunicC('#b8904a', '#5a4a3a', 'kerchief');
  O.rebelTunic = tunicC('#6a5a44', '#4a4038', 'hood', '#2a1e14');
  const kirtle = (col, apron = '#e8dcc0') => ({ hat: 'coif', arm: { sleeve: col, w: 30, cuff: mul(col, .85) }, legs: { kind: 'none' }, feet: 'none',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-56 * nar, -170); c.lineTo(56 * nar, -170); c.quadraticCurveTo(96 * nar, -80, 104 * nar, 0); c.lineTo(-104 * nar, 0); c.quadraticCurveTo(-96 * nar, -80, -56 * nar, -170); c.closePath(); }, col, 'rgba(0,0,0,.22)');
      path(ctx, c => { c.moveTo(-40, -160); c.lineTo(40, -160); c.lineTo(56, -20); c.lineTo(-56, -20); c.closePath(); }, apron, 3); for (const sd of [-1, 1]) path(ctx, c => c.ellipse(sd * 28, 2, 22, 9, 0, 0, TAU), '#4a3020', 3); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -166, .96), col, 'rgba(0,0,0,.22)'); if (B.back) return; path(ctx, c => c.rect(-60 * nar, -176, 120 * nar, 10), '#5a3a1e', 2.5);
      path(ctx, c => { c.moveTo(vx - 30, top + 2); c.quadraticCurveTo(vx, top + 26, vx + 30, top + 2); c.closePath(); }, '#efe6d0', 2.5); } });
  O.kirtleBlue = kirtle('#5a7aa0'); O.kirtleRed = kirtle('#a8584a'); O.kirtleGreen = kirtle('#6a8a54'); O.kirtleBrown = kirtle('#8a6a4a', '#f2ead6');
  const habit = (col, cross) => ({ hat: 'none', arm: { sleeve: col, w: 44, cuff: mul(col, .8) }, legs: { kind: 'none' }, feet: 'none',
    behind(ctx, B) { if (B.back) return; const { top } = B; path(ctx, c => { c.moveTo(-70, top + 10); c.quadraticCurveTo(0, top - 60, 70, top + 10); c.lineTo(60, top + 40); c.lineTo(-60, top + 40); c.closePath(); }, mul(col, .75), 4); },
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-60 * nar, -200); c.lineTo(60 * nar, -200); c.quadraticCurveTo(96 * nar, -90, 100 * nar, 0); c.lineTo(-100 * nar, 0); c.quadraticCurveTo(-96 * nar, -90, -60 * nar, -200); c.closePath(); }, col, 'rgba(0,0,0,.3)',
      c2 => { c2.strokeStyle = 'rgba(255,255,255,.07)'; c2.lineWidth = 4; for (let x = -60; x <= 60; x += 30) { c2.beginPath(); c2.moveTo(x * .7, -190); c2.lineTo(x * 1.1, 0); c2.stroke(); } });
      for (const sd of [-1, 1]) path(ctx, c => c.ellipse(sd * 28, 2, 22, 9, 0, 0, TAU), '#2a2020', 3); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -196, 1.06), col, 'rgba(0,0,0,.3)'); if (B.back) return;
      path(ctx, c => c.rect(vx - 26, top + 10, 52, 200), mul(col, .82), 3);   // scapular
      ctx.save(); ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-60 * nar, -206); ctx.quadraticCurveTo(0, -196, 60 * nar, -206); ctx.stroke(); ctx.beginPath(); ctx.moveTo(30, -200); ctx.lineTo(36, -150); ctx.stroke(); ctx.restore();
      if (cross) { ctx.save(); ctx.strokeStyle = '#e8c86a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(vx - 18, top + 6); ctx.lineTo(vx, top + 60); ctx.lineTo(vx + 18, top + 6); ctx.stroke(); ctx.restore(); path(ctx, c => { c.rect(vx - 5, top + 60, 10, 38); c.rect(vx - 15, top + 70, 30, 10); }, '#e8c86a', 2.5); } } });
  O.monk = habit('#26222a', false); O.abbotRobe = habit('#1e1a22', true);
  O.stewardRobe = { hat: 'hood', arm: { sleeve: '#6a2a2a', w: 36, cuff: '#4a1a1a' }, legs: { kind: 'none' }, feet: 'none',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-58 * nar, -190); c.lineTo(58 * nar, -190); c.quadraticCurveTo(90 * nar, -90, 96 * nar, 0); c.lineTo(-96 * nar, 0); c.quadraticCurveTo(-90 * nar, -90, -58 * nar, -190); c.closePath(); }, '#6a2a2a', 'rgba(0,0,0,.28)'); for (const sd of [-1, 1]) path(ctx, c => c.ellipse(sd * 28, 2, 22, 9, 0, 0, TAU), '#2a1a14', 3); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -190, 1.02), '#6a2a2a', 'rgba(0,0,0,.28)'); if (B.back) return; path(ctx, c => c.rect(-62 * nar, -198, 124 * nar, 12), '#2a1a14', 3); path(ctx, c => c.roundRect(vx + 20, -190, 26, 34, 6), '#8a6a3a', 2.5); for (let i = 0; i < 6; i++) path(ctx, c => c.arc(vx, top + 30 + i * 22, 4, 0, TAU), '#c8a24a', 2); } };
  H.coif = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => { c.moveTo(x - 118, -40); c.bezierCurveTo(x - 124, -170, x + 124, -170, x + 118, -40); c.quadraticCurveTo(x + 100, -100, x, -104); c.quadraticCurveTo(x - 100, -100, x - 118, -40); c.closePath(); }, '#f4efe2', 4); ctx.save(); ctx.strokeStyle = 'rgba(120,110,90,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, -150); ctx.lineTo(x, -104); ctx.stroke(); ctx.restore(); } };
  H.wimple = { hideTufts: true, behind(ctx, hc) { const x = Math.sin(hc.yaw || 0) * 12; path(ctx, c => c.roundRect(x - 130, -110, 260, 230, 60), '#f4efe2', 4); }, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => { c.moveTo(x - 120, -40); c.bezierCurveTo(x - 126, -176, x + 126, -176, x + 120, -40); c.quadraticCurveTo(x + 100, -110, x, -112); c.quadraticCurveTo(x - 100, -110, x - 120, -40); c.closePath(); }, '#f6f2e8', 4); } };
  for (const k of Object.keys(O)) if (!k.includes('@') && !O[k + '@sit']) { const S = O[k], L = S.legs || {}; O[k + '@sit'] = Object.assign({}, S, { legs: { kind: 'sit', c: L.kind === 'none' || L.kind === 'bare' ? (S.arm || {}).sleeve : (L.c || L.sock), shoe: S.boot || '#2e2c30' }, feet: 'none', legsOver: undefined }); }

  Object.assign(G.CW, {
    hugh:    { outfit: 'tunicBrown', hat: 'none', look: { skin: '#e8c4a0', hairCol: '#6a4a2a', beard: 'stubble', beardCol: '#6a4a2a' } },
    hughH:   { outfit: 'tunicBrown', look: { skin: '#e8c4a0', hairCol: '#6a4a2a', beard: 'stubble', beardCol: '#6a4a2a' } },
    agnes:   { outfit: 'kirtleBlue', look: { skin: '#f0d0b0', hair: 'curly', hairCol: '#8a5a2a', lashes: true } },
    kidBoy:  { outfit: 'tunicGreen', look: { skin: '#f2d2b6', hairCol: '#8a5a2a', width: .82 } },
    kidGirl: { outfit: 'kirtleRed', hat: 'none', look: { skin: '#f2d2b6', hair: 'curly', hairCol: '#a86a2a', lashes: true, width: .8 } },
    abbot:   { outfit: 'abbotRobe', look: { skin: '#f0cfae', hair: 'bald', hairCol: '#8a8a8a', width: 1.25, beard: 'stubble', beardCol: '#9a9a9a' } },
    monk:    { outfit: 'monk', look: { skin: '#eccaa8', hair: 'bald', hairCol: '#5a4a3a' } },
    steward: { outfit: 'stewardRobe', look: { skin: '#f0d0b4', hairCol: '#3a2a1a', beard: 'full', beardCol: '#3a2a1a' } },
    reeve:   { outfit: 'tunicRed', look: { skin: '#e8c4a0', hairCol: '#2a1e14', beard: 'moustache', beardCol: '#2a1e14' } },
    walter:  { outfit: 'tunicOchre', look: { skin: '#ecc8a6', hairCol: '#c8a070', beard: 'full', beardCol: '#c8a070', width: 1.1 } },
    vill1:   { outfit: 'tunicGreen', look: { skin: '#ecc8a6', hairCol: '#3a2a1a' } }, vill2: { outfit: 'tunicBlue', look: { skin: '#e8c4a0', hairCol: '#8a5a2a', beard: 'stubble' } },
    vill3:   { outfit: 'tunicGrey', look: { skin: '#f0d0b4', hairCol: '#5a3a22', beard: 'full', beardCol: '#5a3a22' } }, vill4: { outfit: 'kirtleGreen', look: { skin: '#f0d0b0', hair: 'curly', hairCol: '#3a2a1a', lashes: true } },
    vill5:   { outfit: 'kirtleBrown', hat: 'wimple', look: { skin: '#f2d6c0', lashes: true } }, vill6: { outfit: 'tunicRed', look: { skin: '#d8a880', hairCol: '#15100c' } },
    rebel:   { outfit: 'rebelTunic', look: { skin: '#e8c4a0', hairCol: '#5a3a22', beard: 'full', beardCol: '#5a3a22' } }, rebel2: { outfit: 'tunicRed', hat: 'hood', look: { skin: '#ecc8a6', hairCol: '#2a1e14', beard: 'stubble' } },
    edward3: { outfit: 'royalRobe', hat: 'crown', look: { skin: '#f0d0b4', hairCol: '#c8a070', beard: 'full', beardCol: '#c8a070' } },
    edward1: { outfit: 'royalRobe', hat: 'crown', look: { skin: '#f0d0b4', hairCol: '#8a6a4a', beard: 'full', beardCol: '#8a6a4a' } },
    edward2: { outfit: 'royalRobe', hat: 'crown', look: { skin: '#f2d6c0', hairCol: '#c8a070', beard: 'moustache', beardCol: '#c8a070' } },
    advisor: { outfit: 'stewardRobe', hat: 'none', look: { skin: '#ecc8a6', hair: 'bald', hairCol: '#8a8a8a', beard: 'full', beardCol: '#9a9a9a', glasses: false } },
    clerk:   { outfit: 'monk', look: { skin: '#f0d0b4', hair: 'bald', hairCol: '#6a5a4a', glasses: true } },
    viewer2: { outfit: 'hoodie', hat: 'none', look: { skin: '#f0d0b4', hairCol: '#3a2a1a' } },
  });

  // ---------------- farm animals ----------------
  const shade = (c, k) => mul(c, k);
  const leg = (g, x, y0, y1, w, col) => { ln(g, [[x, y0], [x, y1]], w + 6, '#2a1e14'); ln(g, [[x, y0], [x, y1]], w, col); g.fillStyle = '#2a1e14'; g.fillRect(x - w / 2 - 2, y1 - 10, w + 4, 12); };
  function ox(g, x, y, s, t, o = {}) { const col = o.coat || '#8a5a3a', dir = o.dir || 1, walk = o.walk ? t * 6 : 0, nod = o.walk ? Math.sin(walk) * 4 : Math.sin(t * .8) * 2;
    g.save(); g.translate(x, y); g.scale(s * dir, s);
    for (const [lx, ph] of [[-70, 0], [60, PI]]) leg(g, lx + Math.sin(walk + ph) * 8, -80, 0, 16, shade(col, .75));
    sh(g, col, 4.5, c => { c.moveTo(-110, -150); c.quadraticCurveTo(-130, -90, -96, -70); c.quadraticCurveTo(0, -56, 90, -72); c.quadraticCurveTo(120, -110, 100, -160); c.quadraticCurveTo(0, -180, -110, -150); });
    g.save(); g.beginPath(); g.ellipse(0, -120, 120, 50, 0, 0, TAU); g.clip(); g.fillStyle = 'rgba(255,240,210,.15)'; g.fillRect(-120, -180, 240, 30); g.restore();
    for (const [lx, ph] of [[-56, PI / 2], [76, 3 * PI / 2]]) leg(g, lx + Math.sin(walk + ph) * 8, -80, 0, 16, col);
    ln(g, [[-112, -140], [-136, -96 + Math.sin(t * 2) * 6]], 6, shade(col, .8));
    g.save(); g.translate(100, -150 + nod); sh(g, col, 4.5, c => { c.moveTo(-10, -10); c.quadraticCurveTo(30, -26, 56, 0); c.quadraticCurveTo(64, 30, 44, 40); c.quadraticCurveTo(10, 40, -6, 22); c.closePath(); });
    sh(g, shade(col, 1.25), 0, c => c.ellipse(54, 28, 14, 11, 0, 0, TAU)); g.fillStyle = '#15100c'; g.beginPath(); g.arc(30, 2, 4, 0, TAU); g.fill();
    sh(g, '#f2ead6', 3, c => { c.moveTo(10, -16); c.quadraticCurveTo(-6, -50, 24, -54); c.quadraticCurveTo(6, -40, 20, -18); c.closePath(); }); g.restore();
    if (o.yoke) { g.fillStyle = '#6a4a2a'; g.fillRect(70, -190 + nod, 26, 50); } g.restore(); }
  function cow(g, x, y, s, t, o = {}) { ox(g, x, y, s, t, Object.assign({ coat: '#f2ead6' }, o)); g.save(); g.translate(x, y); g.scale(s * (o.dir || 1), s); g.fillStyle = '#2a2020'; for (const [cx, cy, r] of [[-60, -130, 26], [10, -110, 20], [50, -140, 18]]) { g.beginPath(); g.ellipse(cx, cy, r, r * .7, .4, 0, TAU); g.fill(); } sh(g, '#f0a8b0', 3, c => c.ellipse(-10, -66, 22, 12, 0, 0, TAU)); g.restore(); }
  function rooster(g, x, y, s, t, o = {}) { const dir = o.dir || 1, peck = Math.max(0, Math.sin(t * 2 + (o.ph || 0))) > .8 ? 14 : 0, crow = o.crow ? Math.sin(t * 2) * .2 - .4 : 0;
    g.save(); g.translate(x, y); g.scale(s * dir, s); ln(g, [[-6, -30], [-8, 0]], 5, '#e8a03a'); ln(g, [[8, -30], [10, 0]], 5, '#e8a03a');
    for (let i = 0; i < 5; i++) { g.save(); g.translate(-40, -60); g.rotate(-1.2 + i * .25 + Math.sin(t * 2 + i) * .05); sh(g, ['#1e3a2a', '#2a4a3a', '#6a2a1e', '#1e3a2a', '#2a2a30'][i], 3, c => c.ellipse(0, -40, 10, 42, 0, 0, TAU)); g.restore(); }
    sh(g, '#a8482a', 4, c => c.ellipse(0, -56, 44, 30, 0, 0, TAU)); sh(g, '#e8a03a', 3, c => c.ellipse(-4, -54, 26, 18, .3, 0, TAU));
    g.save(); g.translate(30, -84 + peck); g.rotate(crow); sh(g, '#c8582a', 4, c => c.arc(0, 0, 18, 0, TAU)); sh(g, '#d8281e', 3, c => { c.moveTo(-12, -14); c.lineTo(-6, -34); c.lineTo(0, -18); c.lineTo(6, -34); c.lineTo(12, -16); c.closePath(); });
    g.fillStyle = '#e8b83a'; g.beginPath(); g.moveTo(14, -4); g.lineTo(30, 2 + (o.crow ? 6 : 0)); g.lineTo(14, 6); g.fill(); g.fillStyle = '#d8281e'; g.beginPath(); g.ellipse(14, 14, 5, 9, 0, 0, TAU); g.fill(); g.fillStyle = '#15100c'; g.beginPath(); g.arc(6, -4, 3, 0, TAU); g.fill(); g.restore(); g.restore(); }
  function pig(g, x, y, s, t, o = {}) { const dir = o.dir || 1; g.save(); g.translate(x, y); g.scale(s * dir, s); for (const lx of [-40, 30]) leg(g, lx, -40, 0, 12, '#d89a8a'); sh(g, '#f2b0a0', 4.5, c => c.ellipse(0, -60, 80, 44, 0, 0, TAU)); sh(g, '#e89a8a', 4, c => c.ellipse(80, -60, 24, 22, 0, 0, TAU)); sh(g, '#d88a7a', 3, c => c.ellipse(100, -58, 9, 12, 0, 0, TAU));
    g.fillStyle = '#15100c'; g.beginPath(); g.arc(78, -70, 3.5, 0, TAU); g.fill(); g.strokeStyle = '#d88a7a'; g.lineWidth = 4; g.beginPath(); g.arc(-84, -70, 8, 0, PI * 1.5 + Math.sin(t * 4)); g.stroke(); for (const lx of [-26, 44]) leg(g, lx, -40, 0, 12, '#f2b0a0'); g.restore(); }
  function plough(g, x, y, s, dir = 1) { g.save(); g.translate(x, y); g.scale(s * dir, s); ln(g, [[-160, -10], [80, -50]], 10, '#6a4a2a'); ln(g, [[-170, -120], [-140, -10]], 9, '#6a4a2a'); ln(g, [[-200, -110], [-170, -120]], 8, '#6a4a2a'); sh(g, '#7a7a80', 4, c => { c.moveTo(-150, -14); c.lineTo(-100, -4); c.lineTo(-140, 8); c.closePath(); }); for (const wx of [70]) sh(g, '#5a3a22', 3, c => c.arc(wx, -30, 22, 0, TAU)); g.restore(); }

  // ---------- hand props + animated work poses ----------
  const GP = G.Guide.PROPS, stick = (ctx, a, len, ang, col, w) => { const [x, y] = a.wr, ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len; ctx.lineCap = 'round'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = w + 6; ctx.beginPath(); ctx.moveTo(x - Math.cos(ang) * 40, y - Math.sin(ang) * 40); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); return [ex, ey]; };
  const angOf = o => o.propAng != null ? o.propAng : 1.2;
  GP.hoe = { under: (ctx, a, sd, o) => { const ang = angOf(o), [ex, ey] = stick(ctx, a, 250, ang, '#8a6a3a', 12); ctx.save(); ctx.translate(ex, ey); ctx.rotate(ang + 1.4); ctx.fillStyle = '#6a6a72'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 5; ctx.beginPath(); ctx.rect(-6, -10, 70, 30); ctx.fill(); ctx.stroke(); ctx.restore(); } };
  GP.goad = { under: (ctx, a, sd, o) => stick(ctx, a, 300, angOf(o), '#9a7a4a', 9) };
  GP.flail = { under: (ctx, a, sd, o) => { const ang = angOf(o), [ex, ey] = stick(ctx, a, 200, ang, '#8a6a3a', 11); const b = ang + (o.swing || .8); ctx.lineCap = 'round'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(b) * 110, ey + Math.sin(b) * 110); ctx.stroke(); ctx.strokeStyle = '#a8824a'; ctx.lineWidth = 13; ctx.stroke(); } };
  GP.sickle = { under: (ctx, a, sd, o) => { const ang = angOf(o), [ex, ey] = stick(ctx, a, 70, ang, '#8a6a3a', 12); ctx.save(); ctx.translate(ex, ey); ctx.rotate(ang); ctx.strokeStyle = '#15100c'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(40, -30, 50, PI * .9, PI * 2.2); ctx.stroke(); ctx.strokeStyle = '#b8bcc4'; ctx.lineWidth = 9; ctx.stroke(); ctx.restore(); } };
  GP.bucket = { hand: 'fist', under: (ctx, a) => { const [x, y] = a.wr; ctx.fillStyle = '#9a7a4a'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 50, y + 30); ctx.lineTo(x + 50, y + 30); ctx.lineTo(x + 40, y + 130); ctx.lineTo(x - 40, y + 130); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y + 30, 50, PI, TAU); ctx.stroke(); ctx.fillStyle = '#f6f2e8'; ctx.fillRect(x - 44, y + 34, 88, 12); } };
  GP.candle = { under: (ctx, a, sd, o) => { const [x, y] = a.wr; ctx.fillStyle = '#f2e6c0'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 5; ctx.beginPath(); ctx.rect(x - 14, y - 110, 28, 90); ctx.fill(); ctx.stroke(); const f = Math.sin((o.t || 0) * 13) * 3; ctx.fillStyle = '#ffb030'; ctx.beginPath(); ctx.ellipse(x + f, y - 130, 12, 24, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff3a0'; ctx.beginPath(); ctx.ellipse(x + f, y - 124, 6, 12, 0, 0, TAU); ctx.fill(); } };
  GP.bread = { under: (ctx, a) => { const [x, y] = a.wr; ctx.fillStyle = '#b8803a'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(x, y - 30, 64, 40, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#8a5a20'; ctx.lineWidth = 4; for (const d of [-20, 0, 20]) { ctx.beginPath(); ctx.moveTo(x + d - 10, y - 56); ctx.lineTo(x + d + 10, y - 10); ctx.stroke(); } } };
  GP.mug = { under: (ctx, a) => { const [x, y] = a.wr; ctx.fillStyle = '#8a6a4a'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.rect(x - 34, y - 90, 68, 90); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f2e0b0'; ctx.beginPath(); ctx.ellipse(x, y - 90, 34, 12, 0, 0, TAU); ctx.fill(); ctx.stroke(); } };
  GP.spindle = { side: 'L', under: (ctx, a, sd, o) => { const [x, y] = a.wr, b = Math.sin((o.t || 0) * 3) * 10; ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + b, y + 200); ctx.stroke(); ctx.save(); ctx.translate(x + b, y + 220); ctx.rotate((o.t || 0) * 9); ctx.fillStyle = '#8a6a3a'; ctx.strokeStyle = '#15100c'; ctx.lineWidth = 4; ctx.fillRect(-4, -40, 8, 80); ctx.beginPath(); ctx.ellipse(0, 20, 26, 9, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); } };
  // work poses: returns {pose, prop, propAng, swing} to spread into P options; ph = phase time
  const WORK = (kind, ph) => { const s = Math.sin(ph * 5), c = (Math.sin(ph * 5) + 1) / 2;
    if (kind === 'hoe') return { pose: { L: [120 + c * 30, -260 + c * 60], R: [150 + c * 40, -300 + c * 120], hL: 'fist', hR: 'fist' }, prop: 'hoe', propAng: .9 + c * .6 };
    if (kind === 'flail') return { pose: { L: [-40, -200], R: [60 + s * 40, -420 + c * 160], hL: 'rest', hR: 'fist' }, prop: 'flail', propAng: -1.2 + c * 2, swing: .6 + c * 1.6 };
    if (kind === 'sickle') return { pose: { L: [150, -200 + s * 20], R: [180 + s * 40, -170 + c * 40], hL: 'fist', hR: 'fist' }, prop: 'sickle', propAng: .2 + s * .5 };
    if (kind === 'goad') return { pose: { L: [-68, -158], R: [170, -260 + s * 20], hL: 'rest', hR: 'fist' }, prop: 'goad', propAng: -.35 + s * .1 };
    if (kind === 'plough') return { pose: { L: [150, -230 + s * 8], R: [190, -236 - s * 8], hL: 'fist', hR: 'fist' } };
    if (kind === 'bucket') return { pose: { L: [-68, -158], R: [110, -150 + s * 6], hL: 'rest', hR: 'fist' }, prop: 'bucket' };
    if (kind === 'stir') return { pose: { L: [-68, -158], R: [150 + Math.cos(ph * 4) * 30, -220 + Math.sin(ph * 4) * 14], hL: 'rest', hR: 'fist' }, prop: 'goad', propAng: 1.3 };
    if (kind === 'grind') return { pose: { L: [130 + Math.cos(ph * 5) * 40, -150 + Math.sin(ph * 5) * 14], R: [150 + Math.cos(ph * 5) * 40, -160 + Math.sin(ph * 5) * 14], hL: 'fist', hR: 'fist' } };
    if (kind === 'spin') return { pose: { L: [-130, -330 + s * 10], R: [100, -300], hL: 'fist', hR: 'fist' }, prop: 'spindle' };
    if (kind === 'candle') return { pose: { L: [-68, -158], R: [120, -260], hL: 'rest', hR: 'fist' }, prop: 'candle' };
    if (kind === 'bread') return { pose: { L: [-68, -158], R: [160, -300], hL: 'rest', hR: 'palm' }, prop: 'bread' };
    if (kind === 'mug') return { pose: { L: [-68, -158], R: [150, -290 + s * 10], hL: 'rest', hR: 'fist' }, prop: 'mug' };
    if (kind === 'scare') return { pose: { L: [-140 - c * 30, -420 + c * 80], R: [140 + c * 30, -420 + c * 80], hL: 'palm', hR: 'palm' } };
    if (kind === 'milk') return { pose: { L: [100 + c * 10, -150 + c * 40], R: [140 + (1 - c) * 10, -150 + (1 - c) * 40], hL: 'fist', hR: 'fist' } };
    return { pose: 'idle' }; };
  G.FARM = { ox, cow, rooster, pig, plough, WORK };
})(window);
