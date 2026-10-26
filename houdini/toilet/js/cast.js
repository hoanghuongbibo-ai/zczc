/* "Where Does It Go?" — cast + costumes for the history of the toilet.
 * Outfits: hoodie (the Viewer), plumber (Thomas Crapper: shirt + waistcoat + leather apron), tudor (Sir John Harington:
 *   doublet, ruff, short cape, trunk hose), gown (Elizabeth I: pearl bodice, fan ruff, bell skirt), georgian (Alexander
 *   Cumming: long coat, waistcoat, jabot, breeches), frock (Victorians: Snow, Bazalgette, MPs), sewerman (navvy).
 * Hats: tudorCap (velvet cap + feather), periwig (Georgian tied wig), queenCrown (small jewelled crown), bowlerT.
 * Props: phone, wrench, hanky, plans, pot (Indus commode pot), sponge (tersorium), book (Metamorphosis of Ajax).
 * Every outfit also gets a seated twin "name@sit" (legs bent toward camera, feet on the floor 50 units below 0):
 * draw a seated figure with y = seat line + 50·s. */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment, lerp } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, PR = Gd.PROPS, LEGS = Gd.LEGS, FEET = Gd.FEET, TAU = Math.PI * 2, PI = Math.PI;
  const INK = () => Gd.kit.INK;

  // ---------- seated legs: thighs come toward the camera (short, wide), shins drop to the floor ----------
  LEGS.sit = (ctx, g, L) => { const { sd } = g, knee = [sd * 46, -104], ank = [sd * 48, 34], col = L.c || Gd.C.face;
    if (sd < 0) path(ctx, c => c.roundRect(-78, -156, 156, 52, 22), col, 4.5);   // the lap: thighs pointing at the camera
    seg(ctx, [knee, ank], 44); seg(ctx, [knee, ank], 34, col);
    path(ctx, c => c.ellipse(knee[0], knee[1], 30, 24, 0, 0, TAU), col, 4.5); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.ellipse(knee[0] - 6, knee[1] - 8, 14, 8, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(ank[0] - 16, knee[1] + 22, 32, 10);
    const sh = L.shoe || '#2e2c30'; path(ctx, c => c.ellipse(ank[0] + sd * 6, 44, 30, 14, 0, 0, TAU), sh, 4);
    if (L.sneaker) { path(ctx, c => c.rect(ank[0] + sd * 6 - 30, 46, 60, 7), '#f4f4f4', 2.5); } };
  const sitTwin = k => { const S = O[k], L = S.legs || {}; O[k + '@sit'] = Object.assign({}, S, { legs: { kind: 'sit', c: L.kind === 'bare' ? null : (L.c || L.sock), shoe: S.boot || (S.feet === 'barefoot' ? Gd.C.face : '#2e2c30'), sneaker: S.sneaker }, feet: 'none' }); };

  // ---------- the Viewer: modern hoodie + jeans + white sneakers ----------
  O.hoodie = { hat: 'none', arm: { sleeve: '#3a9a8e', w: 32, cuff: '#2f857a' }, legs: { kind: 'trousers', c: '#3d5d8f' }, feet: 'shoes', sneaker: true,
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -138, 1.06), '#3a9a8e', 'rgba(0,40,40,.25)');
      if (B.back) return;
      path(ctx, c => { c.moveTo(vx - 64, top + 4); c.quadraticCurveTo(vx, top + 34, vx + 64, top + 4); c.quadraticCurveTo(vx, top - 26, vx - 64, top + 4); c.closePath(); }, '#2f857a', 4);   // hood collar
      for (const sd of [-1, 1]) { seg(ctx, [[vx + sd * 14, top + 16], [vx + sd * 16, top + 70]], 3, '#f2efe6'); path(ctx, c => c.arc(vx + sd * 16, top + 74, 4, 0, TAU), '#f2efe6', 2); }
      path(ctx, c => { c.moveTo(vx - 46, -224); c.lineTo(vx + 46, -224); c.lineTo(vx + 54, -164); c.lineTo(vx - 54, -164); c.closePath(); }, '#33897e', 3.5);   // kangaroo pocket
      path(ctx, c => c.rect(-66 * nar, -152, 132 * nar, 16), '#2f857a', 3.5); } };

  // ---------- Thomas Crapper: rolled shirt sleeves, green waistcoat, leather apron ----------
  O.plumber = { hat: 'flatCap', arm: { sleeve: '#f4f1ea', w: 30, roll: true, rollC: '#e6e0d2' }, legs: { kind: 'trousers', c: '#4a4440' }, feet: 'boots', boot: '#3a2618',
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -146, 1.02), '#f4f1ea', 'rgba(60,50,40,.16)');
      if (B.back) return;
      garment(ctx, B, c => { c.moveTo(vx - 22, top + 4); c.lineTo(-54 * nar, top + 10); c.quadraticCurveTo(-62 * nar, -220, -58 * nar, -170); c.lineTo(58 * nar, -170); c.quadraticCurveTo(62 * nar, -220, 54 * nar, top + 10); c.lineTo(vx + 22, top + 4); c.lineTo(vx, top + 60); c.closePath(); }, '#2f5a40', 'rgba(0,0,0,.3)');
      for (let i = 0; i < 4; i++) path(ctx, c => c.arc(vx + 4, top + 74 + i * 22, 4.5, 0, TAU), '#d0a548', 2.5);
      curve(ctx, [vx + 8, top + 110], [vx + 28, top + 130], [vx + 44, -190], 2.5, '#d9b14e');
      path(ctx, c => { c.moveTo(vx - 50, -230); c.lineTo(vx + 50, -230); c.lineTo(vx + 60, -40); c.quadraticCurveTo(vx, -32, vx - 60, -40); c.closePath(); }, '#8a5a34', 4);   // leather apron
      seg(ctx, [[vx - 50, -230], [vx - 30, top + 30]], 4, '#6a4224'); seg(ctx, [[vx + 50, -230], [vx + 30, top + 30]], 4, '#6a4224');
      path(ctx, c => c.roundRect(vx - 26, -196, 52, 40, 4), '#7a4c2a', 3);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 4, top - 8); c.lineTo(vx + sd * 24, top - 10); c.lineTo(vx + sd * 20, top + 10); c.closePath(); }, '#fff', 3.5);
      path(ctx, c => c.ellipse(vx, top + 12, 9, 8, 0, 0, TAU), '#7a2a2a', 3.5); } };

  // ---------- Sir John Harington: doublet, ruff, short cape, trunk hose ----------
  const ruff = (ctx, x, y, w, h, n = 18) => { path(ctx, c => c.ellipse(x, y, w, h, 0, 0, TAU), '#fbf8f0', 4); ctx.save(); ctx.strokeStyle = 'rgba(120,110,90,.45)'; ctx.lineWidth = 2;
    for (let i = 0; i < n; i++) { const a = i * TAU / n; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * w * .45, y + Math.sin(a) * h * .45); ctx.lineTo(x + Math.cos(a) * w * .95, y + Math.sin(a) * h * .95); ctx.stroke(); } ctx.restore(); };
  O.tudor = { hat: 'tudorCap', arm: { sleeve: '#2f5a3e', w: 34, cuff: '#fbf8f0' }, legs: { kind: 'breeches', c: '#2a3e30', sock: '#e8e0cc' }, feet: 'shoes',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-70 * nar, top + 10); c.lineTo(70 * nar, top + 10); c.lineTo(84 * nar, -150); c.lineTo(-84 * nar, -150); c.closePath(); }, '#1e2a24', 4); },
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, c => { c.moveTo(-60 * nar, top + 4); c.lineTo(60 * nar, top + 4); c.quadraticCurveTo(68 * nar, -220, 60 * nar, -170); c.lineTo(vx, -136); c.lineTo(-60 * nar, -170); c.quadraticCurveTo(-68 * nar, -220, -60 * nar, top + 4); c.closePath(); }, '#2f5a3e', 'rgba(0,20,10,.3)',
        c2 => { c2.strokeStyle = 'rgba(220,200,120,.35)'; c2.lineWidth = 3; for (let x = -60; x < 64; x += 16) { c2.beginPath(); c2.moveTo(x, top + 10); c2.lineTo(x * .8, -160); c2.stroke(); } });
      if (B.back) return;
      seg(ctx, [[vx, top + 30], [vx, -140]], 3); for (let i = 0; i < 7; i++) path(ctx, c => c.arc(vx, top + 40 + i * 22, 4, 0, TAU), '#e2c27a', 2);
      path(ctx, c => c.rect(-62 * nar, -176, 124 * nar, 12), '#c9a24a', 3);
      ruff(ctx, vx * .5, top - 4, 74, 26); } };
  H.tudorCap = { draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // flat black velvet cap with a white feather, worn tilted
    path(ctx, c => c.ellipse(x + 10, -118, 128, 30, -.12, 0, TAU), '#1c1c22', 4.5); path(ctx, c => c.ellipse(x + 6, -132, 84, 28, -.12, 0, TAU), '#24242c', 4);
    path(ctx, c => { c.moveTo(x + 50, -140); c.quadraticCurveTo(x + 140, -210, x + 180, -150); c.quadraticCurveTo(x + 120, -170, x + 62, -128); c.closePath(); }, '#fbf8f0', 3.5);
    path(ctx, c => c.arc(x + 54, -136, 8, 0, TAU), '#e2c27a', 2.5); } };

  // ---------- Elizabeth I: pearl bodice with a pointed stomacher, standing fan ruff, bell skirt ----------
  O.gown = { hat: 'queenCrown', arm: { sleeve: '#f4ede0', w: 44, cuff: '#fbf8f0' }, legs: { kind: 'none' }, feet: 'none',
    behind(ctx, B) { if (B.back) return; const { top, vx } = B; ctx.save(); ctx.translate(vx * .4, top - 40);   // tall lace fan ruff behind the head
      path(ctx, c => { c.moveTo(-130, 60); c.quadraticCurveTo(-150, -70, 0, -96); c.quadraticCurveTo(150, -70, 130, 60); c.closePath(); }, 'rgba(252,250,244,.95)', 4);
      ctx.strokeStyle = 'rgba(150,140,120,.45)'; ctx.lineWidth = 2; for (let a = -PI * .95; a < -PI * .05; a += .12) { ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(Math.cos(a) * 130, 40 + Math.sin(a) * 120); ctx.stroke(); } ctx.restore(); },
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-60 * nar, -190); c.lineTo(60 * nar, -190); c.quadraticCurveTo(150 * nar, -90, 160 * nar, 0); c.lineTo(-160 * nar, 0); c.quadraticCurveTo(-150 * nar, -90, -60 * nar, -190); c.closePath(); }, '#e9dfcc', 'rgba(80,60,30,.2)',
      c2 => { c2.fillStyle = '#c9a24a'; for (let y = -170; y < 0; y += 34) for (let x = -150; x < 160; x += 40) { c2.beginPath(); c2.arc(x + ((y / 34) % 2) * 20, y, 4.5, 0, TAU); c2.fill(); } });
      path(ctx, c => { c.moveTo(-36, -190); c.lineTo(36, -190); c.lineTo(90, 0); c.lineTo(-90, 0); c.closePath(); }, '#b83a3a', 3.5); },
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -186, .9), '#f4ede0', 'rgba(80,60,30,.2)'); if (B.back) return;
      path(ctx, c => { c.moveTo(vx - 34, top + 20); c.lineTo(vx + 34, top + 20); c.lineTo(vx, -150); c.closePath(); }, '#b83a3a', 3.5);   // stomacher
      ctx.fillStyle = '#fbf8f0'; for (let i = 0; i < 6; i++) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(vx + sd * (28 - i * 4), top + 34 + i * 22, 4, 0, TAU); ctx.fill(); }
      for (let i = 0; i < 9; i++) { const a = .15 * PI + i * .7 * PI / 8; path(ctx, c => c.arc(vx * .5 + Math.cos(a) * 52, top + 4 + Math.sin(a) * 26, 5, 0, TAU), '#fbf8f0', 2); } } };
  H.queenCrown = { draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // small jewelled crown sitting down in the curls
    path(ctx, c => { c.moveTo(x - 50, -112); c.lineTo(x - 56, -158); c.lineTo(x - 28, -134); c.lineTo(x, -168); c.lineTo(x + 28, -134); c.lineTo(x + 56, -158); c.lineTo(x + 50, -112); c.closePath(); }, '#e3b440', 4);
    [[-30, '#c0392b'], [0, '#2f6fb0'], [30, '#c0392b']].forEach(([dx, col]) => path(ctx, c => c.arc(x + dx, -126, 6, 0, TAU), col, 2.5)); } };

  // ---------- Alexander Cumming: Georgian long coat, waistcoat, lace jabot, breeches + stockings ----------
  O.georgian = { hat: 'periwig', arm: { sleeve: '#3a4e7a', w: 32, cuff: '#2a3a5e' }, legs: { kind: 'breeches', c: '#3a4e7a', sock: '#f2efe6' }, feet: 'shoes',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-64 * nar, top + 20); c.lineTo(64 * nar, top + 20); c.lineTo(80 * nar, -70); c.lineTo(-80 * nar, -70); c.closePath(); }, '#2f4268', 4); },
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -150, 1.02), '#efe2c0', 'rgba(80,60,20,.2)'); if (B.back) return;
      for (let i = 0; i < 6; i++) path(ctx, c => c.arc(vx + 4, top + 50 + i * 22, 4, 0, TAU), '#c9a24a', 2);
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(sd * 66 * nar, top + 18); c.lineTo(vx + sd * 34, top + 4); c.lineTo(vx + sd * 52, -150); c.lineTo(sd * 76 * nar, -80); c.closePath(); }, '#3a4e7a', 'rgba(0,0,0,.25)');
      path(ctx, c => { c.moveTo(vx - 18, top - 2); c.lineTo(vx + 18, top - 2); c.quadraticCurveTo(vx + 26, top + 40, vx, top + 56); c.quadraticCurveTo(vx - 26, top + 40, vx - 18, top - 2); c.closePath(); }, '#fbf8f0', 3); } };
  H.periwig = { hideTufts: true,   // powdered wig hugging the head: smooth top, two side rolls over the ears, a ribboned queue behind
    behind(ctx, hc) { const x = Math.sin(hc.yaw || 0) * 16; path(ctx, c => c.roundRect(x - 26, -20, 52, 130, 22), '#e9e6de', 4); path(ctx, c => c.ellipse(x, -18, 30, 16, 0, 0, TAU), '#2a2a30', 3); },
    draw(ctx, hc) { const x = Math.sin(hc.yaw || 0) * 20;
      garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 124, -40); c.bezierCurveTo(x - 128, -120, x - 70, -146, x, -146); c.bezierCurveTo(x + 70, -146, x + 128, -120, x + 124, -40); c.quadraticCurveTo(x + 100, -96, x, -100); c.quadraticCurveTo(x - 100, -96, x - 124, -40); c.closePath(); }, '#f2efe8', 'rgba(120,110,90,.2)');
      for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) path(ctx, c => c.ellipse(x + sd * 118, -40 + i * 26, 20, 12, 0, 0, TAU), '#f2efe8', 3.5); } };

  // ---------- Victorians: frock coat (doctor / engineer / MP) and the sewer navvy ----------
  const frock = (coat, vest) => ({ hat: 'none', arm: { sleeve: coat, w: 32, cuff: '#f4f1ea' }, legs: { kind: 'trousers', c: '#3a3a40' }, feet: 'boots', boot: '#1e1a18',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-64 * nar, top + 20); c.lineTo(64 * nar, top + 20); c.lineTo(78 * nar, -60); c.lineTo(-78 * nar, -60); c.closePath(); }, Gd.hexMul(coat, .82), 4); },
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -150, 1.02), '#f4f1ea', 'rgba(60,50,40,.16)'); if (B.back) return;
      garment(ctx, B, c => { c.moveTo(vx - 20, top + 6); c.lineTo(-50 * nar, top + 10); c.lineTo(-56 * nar, -166); c.lineTo(56 * nar, -166); c.lineTo(50 * nar, top + 10); c.lineTo(vx + 20, top + 6); c.lineTo(vx, top + 50); c.closePath(); }, vest, 'rgba(0,0,0,.3)');
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(sd * 66 * nar, top + 18); c.lineTo(vx + sd * 30, top + 4); c.lineTo(vx + sd * 44, -170); c.lineTo(sd * 76 * nar, -70); c.closePath(); }, coat, 'rgba(0,0,0,.28)');
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 4, top - 8); c.lineTo(vx + sd * 24, top - 10); c.lineTo(vx + sd * 20, top + 10); c.closePath(); }, '#fff', 3.5);
      path(ctx, c => { c.moveTo(vx - 18, top + 8); c.lineTo(vx + 18, top + 8); c.lineTo(vx + 10, top + 24); c.lineTo(vx - 10, top + 24); c.closePath(); }, '#1e1e24', 3); } });
  O.frockBlack = frock('#2a2a30', '#5a5a64'); O.frockBrown = frock('#4a3628', '#8a7a5a'); O.frockGrey = frock('#5a5e68', '#2a2a30'); O.frockNavy = frock('#2a3450', '#a08a5a');
  O.sewerman = { hat: 'flatCap', arm: { sleeve: '#c9b48a', w: 30, roll: true, rollC: '#b8a276' }, legs: { kind: 'trousers', c: '#5a4c3e' }, feet: 'boots', boot: '#3a2618',
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -146, 1.04), '#c9b48a', 'rgba(60,40,10,.22)'); if (B.back) return;
      for (const sd of [-1, 1]) seg(ctx, [[vx + sd * 30, top + 10], [vx + sd * 36, -150]], 7, '#5a3a22');
      path(ctx, c => c.ellipse(vx, top + 10, 20, 12, 0, 0, TAU), '#b8432f', 3); } };
  H.bowlerT = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.ellipse(x, -96, 150, 24, -.03, 0, TAU), '#2a2622', 4.5);
    garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 92, -100); c.bezierCurveTo(x - 96, -200, x + 96, -200, x + 92, -100); c.closePath(); }, '#2e2a26', 'rgba(0,0,0,.3)'); path(ctx, c => c.rect(x - 92, -118, 184, 16), '#1a1816', 3); } };

  // ---------- props ----------
  PR.phone = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 14, y - 34); ctx.rotate(-.12);
    path(ctx, c => c.roundRect(-24, -46, 48, 92, 9), '#1e2028', 4); ctx.fillStyle = '#5ab0e8'; ctx.fillRect(-18, -38, 36, 72); ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let i = 0; i < 4; i++) ctx.fillRect(-14, -30 + i * 16, 28 - (i % 2) * 10, 6); ctx.restore(); } };
  PR.wrench = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x, y + 8], [x + 10, y - 96]], 16); seg(ctx, [[x, y + 8], [x + 10, y - 96]], 9, '#9aa2ac');
    path(ctx, c => { c.moveTo(x - 10, y - 90); c.lineTo(x + 32, y - 96); c.lineTo(x + 30, y - 130); c.lineTo(x + 18, y - 128); c.lineTo(x + 16, y - 110); c.lineTo(x + 2, y - 110); c.lineTo(x, y - 130); c.lineTo(x - 12, y - 126); c.closePath(); }, '#9aa2ac', 4); } };
  PR.hanky = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; path(ctx, c => { c.moveTo(x - 20, y - 26); c.quadraticCurveTo(x + 10, y - 50, x + 40, y - 30); c.lineTo(x + 30, y + 10); c.quadraticCurveTo(x, y + 2, x - 16, y + 12); c.closePath(); }, '#f6f4ee', 3.5); } };
  PR.plans = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 30, y - 20); ctx.rotate(-.3);
    path(ctx, c => c.roundRect(-70, -16, 140, 32, 14), '#dfe8f2', 4); ctx.strokeStyle = '#3a6ab0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(-70, 0, 8, 16, 0, 0, TAU); ctx.stroke(); ctx.restore(); } };
  PR.pot = { hand: 'hold', handDir: 0, over(ctx, a, sd, o) { const [x, y] = a.wr; potFace(ctx, x + 30, y - 40, .9, (o && o.potFace) || 'plain'); } };
  PR.sponge = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x, y + 6], [x + 14, y - 130]], 12); seg(ctx, [[x, y + 6], [x + 14, y - 130]], 6, '#a8804a');
    path(ctx, c => c.ellipse(x + 16, y - 150, 28, 24, 0, 0, TAU), '#e0b85a', 4); ctx.fillStyle = 'rgba(140,90,20,.45)'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(x + 4 + (i % 3) * 12, y - 162 + Math.floor(i / 3) * 11, 3, 0, TAU); ctx.fill(); } } };
  PR.book = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 30, y - 40); ctx.rotate(-.1);
    path(ctx, c => c.rect(-44, -56, 88, 112), '#7a3a2a', 4); path(ctx, c => c.rect(-34, -44, 68, 30), '#e8d9b0', 2.5); ctx.fillStyle = '#3a2a1a'; ctx.font = '700 13px Georgia, serif'; ctx.textAlign = 'center'; ctx.fillText('AJAX', 0, -24); ctx.restore(); } };
  // the Indus commode pot (it talks once: "Buddy.")
  function potFace(ctx, x, y, s, face = 'plain', talk = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    path(ctx, c => { c.moveTo(-40, -50); c.quadraticCurveTo(-74, 0, -44, 50); c.lineTo(44, 50); c.quadraticCurveTo(74, 0, 40, -50); c.closePath(); }, '#c47a48', 4.5);
    path(ctx, c => c.ellipse(0, -52, 44, 12, 0, 0, TAU), '#9a5634', 4); ctx.strokeStyle = 'rgba(80,30,10,.35)'; ctx.lineWidth = 3; for (const yy of [-20, 10]) { ctx.beginPath(); ctx.moveTo(-56, yy); ctx.quadraticCurveTo(0, yy + 10, 56, yy); ctx.stroke(); }
    if (face !== 'plain') { for (const sd of [-1, 1]) { path(ctx, c => c.ellipse(sd * 16, -6, 7, face === 'flat' ? 3 : 8, 0, 0, TAU), '#2a1810', 0); seg(ctx, [[sd * 24, -22], [sd * 8, face === 'flat' ? -20 : -24]], 3, '#2a1810'); }
      path(ctx, c => c.ellipse(0, 16, 12, 3 + talk * 7, 0, 0, TAU), '#2a1810', 0); }
    ctx.restore(); }
  G.potFace = potFace;

  for (const k of Object.keys(O)) if (!k.includes('@') && !O[k + '@sit']) sitTwin(k);

  // ---------- the cast ----------
  G.CW = {
    viewer:    { outfit: 'hoodie', hat: 'none', prop: 'phone', look: { skin: '#f1c9a5', hair: 'mop', hairCol: '#5a3a22' } },
    crapper:   { outfit: 'plumber', hat: 'flatCap', prop: 'wrench', look: { skin: '#f0c4a0', hairCol: '#5a3a24', beard: 'full', beardCol: '#6a4428', nose: 'big' } },
    harington: { outfit: 'tudor', hat: 'tudorCap', look: { skin: '#f2cfae', hairCol: '#7a5232', beard: 'full', beardCol: '#7a5232' } },
    elizabeth: { outfit: 'gown', hat: 'queenCrown', look: { skin: '#f8ece2', hair: 'curly', hairCol: '#c8562a', lashes: true, lips: '#b83a3a' } },
    cumming:   { outfit: 'georgian', hat: 'periwig', look: { skin: '#efc9a8', hairCol: '#e9e6de' } },
    snow:      { outfit: 'frockBlack', hat: 'none', look: { skin: '#eec4a2', hairCol: '#3a2a1e', beard: 'stubble', beardCol: '#3a2a1e' } },
    bazalgette:{ outfit: 'frockNavy', hat: 'topHat', prop: 'plans', look: { skin: '#eec4a2', hairCol: '#2a1e16', beard: 'walrus', beardCol: '#2a1e16' } },
    mp1:       { outfit: 'frockGrey', hat: 'topHat', prop: 'hanky', look: { skin: '#f2c8a6', hair: 'bald', hairCol: '#9a948a', beard: 'full', beardCol: '#b8b2a6', width: 1.12 } },
    mp2:       { outfit: 'frockBrown', hat: 'none', prop: 'hanky', look: { skin: '#eebf9a', hairCol: '#6a4a2a', beard: 'moustache', beardCol: '#6a4a2a' } },
    marcus:    { outfit: 'toga', hat: 'none', look: { skin: '#e8b890', hair: 'bald', hairCol: '#b9b4ab', nose: 'big', width: 1.2, chin: true, brow: 8.5, browCol: '#7d7870' } },
    roman2:    { outfit: 'roman', hat: 'none', look: { skin: '#dca67c', hair: 'curly', hairCol: '#2a1e16' } },
    excavator: { outfit: 'explorer', hat: 'pith', prop: 'pot', look: { skin: '#f0c8a8', hairCol: '#6a4a2a', beard: 'moustache', beardCol: '#6a4a2a' } },
    neo1:      { outfit: 'briton', hat: 'none', look: { skin: '#e8bc94', hair: 'long', hairCol: '#6a4224', beard: 'full', beardCol: '#6a4224' } },
    neo2:      { outfit: 'briton', hat: 'woolCap', look: { skin: '#f0c8a2', hairCol: '#a0602a' } },
    indus1:    { outfit: 'eWorker', hat: 'none', look: { skin: '#a8683e', hairCol: '#1a1410', beard: 'full', beardCol: '#1a1410' } },
    indus2:    { outfit: 'eDress', hat: 'none', look: { skin: '#9a603c', hair: 'long', hairCol: '#1a1410', lashes: true, earrings: true } },
    navvy:     { outfit: 'sewerman', hat: 'flatCap', look: { skin: '#eebf9a', hairCol: '#4a3420', beard: 'stubble', beardCol: '#4a3420' } },
    soldier:   { outfit: 'explorer', hat: 'none', look: { skin: '#f0c8a8', hairCol: '#8a6a3a' } },
  };
})(window);
