/* "The Life of the Mona Lisa" — cast + wardrobe (drawn from the user's reference photos, in the house style).
 * Outfits: lucco (Florentine long robe; colour variants), leonardo (rose robe + long white beard), lisaDress (dark
 *   gown + veil), francis (puffed striped doublet), renTunic (Salaì), vasariRobe, royalRobe (Louis XIV ermine),
 *   napoleon (campaign coat), empire (Joséphine), smock (Peruggia's white work smock), suitC(...) 1911–1960s suits,
 *   gardien (1911 Louvre guard), judge, ladySuit (Rose Valland), pinkSuit (Jackie), marine, tourist variants.
 * Hats: beret, cappuccio, veil, bicorne, bigWig, fedora, pillbox, marineCap, cloche, gardienCap. */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (c, k) => Gd.hexMul(c, k);

  // ---------- a long robe to the ground (Florence 1500) ----------
  const robe = (col, trim, o = {}) => ({ hat: o.hat || 'cappuccio', arm: { sleeve: col, w: o.w || 40, cuff: trim }, legs: { kind: 'none' }, feet: 'none',
    behind(ctx, B) { if (B.back || !o.cape) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-70 * nar, top + 10); c.lineTo(70 * nar, top + 10); c.lineTo(96 * nar, 0); c.lineTo(-96 * nar, 0); c.closePath(); }, mul(col, .7), 4); },
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-62 * nar, -200); c.lineTo(62 * nar, -200); c.quadraticCurveTo(96 * nar, -90, 104 * nar, 0); c.lineTo(-104 * nar, 0); c.quadraticCurveTo(-96 * nar, -90, -62 * nar, -200); c.closePath(); }, col, 'rgba(0,0,0,.25)',
      c2 => { c2.strokeStyle = 'rgba(0,0,0,.14)'; c2.lineWidth = 4; for (let x = -70; x <= 70; x += 35) { c2.beginPath(); c2.moveTo(x * .6, -190); c2.quadraticCurveTo(x * .9, -80, x * 1.1, 0); c2.stroke(); } });
      path(ctx, c => c.ellipse(0, -2, 98 * nar, 12, 0, 0, TAU), mul(col, .6), 3);
      for (const sd of [-1, 1]) path(ctx, c => c.ellipse(sd * 30, 2, 26, 10, 0, 0, TAU), '#2a1e18', 3); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -196, 1.06), col, 'rgba(0,0,0,.25)'); if (B.back) return;
      if (o.belt !== false) path(ctx, c => c.rect(-64 * nar, -206, 128 * nar, 14), trim, 3);
      path(ctx, c => { c.moveTo(vx - 36, top + 2); c.quadraticCurveTo(vx, top + 30, vx + 36, top + 2); c.lineTo(vx + 30, top - 8); c.quadraticCurveTo(vx, top + 12, vx - 30, top - 8); c.closePath(); }, trim, 3);
      if (o.beard) { // Leonardo / Vasari: a long beard falling over the chest
        garment(ctx, B, c => { c.moveTo(vx - 46, top - 30); c.quadraticCurveTo(vx - 58, top + 70, vx - 6, top + 150); c.quadraticCurveTo(vx + 4, top + 120, vx + 10, top + 156); c.quadraticCurveTo(vx + 58, top + 70, vx + 46, top - 30); c.closePath(); }, o.beard, 'rgba(0,0,0,.12)',
          c2 => { c2.strokeStyle = 'rgba(120,120,120,.4)'; c2.lineWidth = 2.5; for (let i = -3; i <= 3; i++) { c2.beginPath(); c2.moveTo(vx + i * 12, top - 10); c2.quadraticCurveTo(vx + i * 14, top + 60, vx + i * 6, top + 130); c2.stroke(); } }); } } });
  O.luccoRed = robe('#a8302a', '#e8c86a', { cape: true });
  O.luccoBlack = robe('#2a2630', '#c8a24a', { hat: 'cappuccioRed' });
  O.luccoBrown = robe('#6a4a32', '#c8a24a', { hat: 'cappuccio' });
  O.leonardo = robe('#7a4a5a', '#3a2a30', { hat: 'beret', beard: '#f2f0ec', belt: false });
  O.vasariRobe = robe('#2a2a30', '#5a4a3a', { hat: 'none', beard: '#3a2e26', belt: false });
  O.renTunic = { hat: 'none', arm: { sleeve: '#c8783a', w: 32, cuff: '#e8d8b0' }, legs: { kind: 'breeches', c: '#3a5a7a', sock: '#3a5a7a' }, feet: 'shoes',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -120, 1.04), '#c8783a', 'rgba(0,0,0,.22)'); if (B.back) return;
      path(ctx, c => c.rect(-64 * nar, -150, 128 * nar, 12), '#5a3a22', 3); path(ctx, c => { c.moveTo(vx - 30, top + 2); c.quadraticCurveTo(vx, top + 26, vx + 30, top + 2); c.closePath(); }, '#e8d8b0', 3); } };
  O.lisaDress = { hat: 'veil', arm: { sleeve: '#7a5a3a', w: 40, cuff: '#5a3e26' }, legs: { kind: 'none' }, feet: 'none',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-60 * nar, -190); c.lineTo(60 * nar, -190); c.quadraticCurveTo(130 * nar, -80, 140 * nar, 0); c.lineTo(-140 * nar, 0); c.quadraticCurveTo(-130 * nar, -80, -60 * nar, -190); c.closePath(); }, '#2e3a2a', 'rgba(0,0,0,.3)'); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -186, .92), '#2e3a2a', 'rgba(0,0,0,.3)'); if (B.back) return;
      path(ctx, c => { c.moveTo(vx - 54, top + 4); c.quadraticCurveTo(vx, top + 52, vx + 54, top + 4); c.quadraticCurveTo(vx, top + 30, vx - 54, top + 4); c.closePath(); }, '#e8c8a0', 2);
      ctx.save(); ctx.strokeStyle = '#c8a050'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(vx - 54, top + 6); ctx.quadraticCurveTo(vx, top + 56, vx + 54, top + 6); ctx.stroke(); ctx.restore(); } };
  O.francis = { hat: 'tudorCap', arm: { sleeve: '#e8dcc0', w: 46, cuff: '#fbf8f0' }, legs: { kind: 'breeches', c: '#2a2a30', sock: '#e8e0cc' }, feet: 'shoes',
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -150, 1.12), '#2a2a30', 'rgba(0,0,0,.3)', c2 => { c2.fillStyle = '#e8dcc0'; for (let x = -60; x < 64; x += 22) c2.fillRect(x, top, 10, 200); }); if (B.back) return;
      path(ctx, c => c.rect(-66 * nar, -166, 132 * nar, 14), '#c9a24a', 3); for (let i = 0; i < 5; i++) path(ctx, c => c.arc(vx, top + 30 + i * 22, 4, 0, TAU), '#e8c86a', 2);
      path(ctx, c => { c.moveTo(vx - 40, top + 6); c.lineTo(vx + 40, top + 6); c.lineTo(vx + 30, top - 6); c.lineTo(vx - 30, top - 6); c.closePath(); }, '#fbf8f0', 3); } };
  O.royalRobe = { hat: 'bigWig', arm: { sleeve: '#2a3a8a', w: 42, cuff: '#fbf8f0' }, legs: { kind: 'breeches', c: '#fbf8f0', sock: '#fbf8f0' }, feet: 'shoes',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-80 * nar, top + 10); c.lineTo(80 * nar, top + 10); c.lineTo(130 * nar, 0); c.lineTo(-130 * nar, 0); c.closePath(); }, '#2a3a8a', 4);
      ctx.fillStyle = '#e8c86a'; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(-100 * nar + (i % 4) * 66 * nar, top + 60 + Math.floor(i / 4) * 60, 6, 0, TAU); ctx.fill(); } },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -150, 1.04), '#fbf8f0', 'rgba(80,60,30,.18)'); if (B.back) return;
      path(ctx, c => { c.moveTo(-70 * nar, top + 10); c.quadraticCurveTo(-90 * nar, top - 10, 70 * nar, top + 10); c.lineTo(76 * nar, top + 40); c.lineTo(-76 * nar, top + 40); c.closePath(); }, '#fbf8f0', 3);
      ctx.fillStyle = '#15100c'; for (let i = 0; i < 8; i++) ctx.fillRect(-60 * nar + i * 16 * nar, top + 18 + (i % 2) * 8, 5, 9); } };
  O.napoleon = { hat: 'bicorne', arm: { sleeve: '#1e2a4a', w: 32, cuff: '#c8281e' }, legs: { kind: 'breeches', c: '#f4f0e6', sock: '#f4f0e6' }, feet: 'boots', boot: '#15100c',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-64 * nar, top + 20); c.lineTo(64 * nar, top + 20); c.lineTo(78 * nar, -70); c.lineTo(-78 * nar, -70); c.closePath(); }, '#16203a', 4); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -150, 1.02), '#f4f0e6', 'rgba(60,50,40,.16)'); if (B.back) return;
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(sd * 66 * nar, top + 18); c.lineTo(vx + sd * 30, top + 4); c.lineTo(vx + sd * 40, -160); c.lineTo(sd * 76 * nar, -70); c.closePath(); }, '#1e2a4a', 'rgba(0,0,0,.28)');
      for (const sd of [-1, 1]) { path(ctx, c => c.ellipse(sd * 62 * nar, top + 14, 26, 12, 0, 0, TAU), '#e8c86a', 3); ctx.save(); ctx.strokeStyle = '#e8c86a'; ctx.lineWidth = 2; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(sd * 62 * nar + i * 8, top + 24); ctx.lineTo(sd * 62 * nar + i * 9, top + 40); ctx.stroke(); } ctx.restore(); }
      path(ctx, c => c.rect(vx - 30, top - 6, 60, 16), '#c8281e', 3); path(ctx, c => c.rect(-60 * nar, -164, 120 * nar, 12), '#f4f0e6', 2.5); } };
  O.empire = { hat: 'none', arm: { sleeve: '#f6f2ea', w: 30, cuff: '#f6f2ea', short: true }, legs: { kind: 'none' }, feet: 'none',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-50 * nar, -250); c.lineTo(50 * nar, -250); c.quadraticCurveTo(100 * nar, -100, 110 * nar, 0); c.lineTo(-110 * nar, 0); c.quadraticCurveTo(-100 * nar, -100, -50 * nar, -250); c.closePath(); }, '#f6f2ea', 'rgba(80,70,60,.15)'); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -240, .9), '#f6f2ea', 'rgba(80,70,60,.15)'); if (B.back) return; path(ctx, c => c.rect(-58 * nar, -250, 116 * nar, 12), '#c8a24a', 2.5);
      path(ctx, c => { c.moveTo(-90, top + 10); c.quadraticCurveTo(0, top + 60, 90, top + 10); c.lineTo(110, top + 40); c.quadraticCurveTo(0, top + 100, -110, top + 40); c.closePath(); }, '#b8282e', 3); } };
  O.smock = { hat: 'none', arm: { sleeve: '#f6f4ee', w: 34, cuff: '#e8e4d8' }, legs: { kind: 'trousers', c: '#4a4448' }, feet: 'boots', boot: '#2a2420',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -96, 1.12), '#f6f4ee', 'rgba(80,80,90,.18)'); if (B.back) return;
      for (let i = 0; i < 3; i++) path(ctx, c => c.arc(vx, top + 40 + i * 30, 4, 0, TAU), '#d8d4c8', 2);
      for (const sd of [-1, 1]) path(ctx, c => c.rect(sd * 34 - 18, -180, 36, 30), '#ece8de', 3);
      ctx.fillStyle = 'rgba(160,150,140,.35)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-40 + i * 17, -120 + (i % 3) * 18, 4, 0, TAU); ctx.fill(); } } };
  const suitC = (coat, vest, tie, trou, hat = 'none') => ({ hat, arm: { sleeve: coat, w: 32, cuff: '#f4f1ea' }, legs: { kind: 'trousers', c: trou || mul(coat, .85) }, feet: 'boots', boot: '#1e1a18',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -146, 1.04), coat, 'rgba(0,0,0,.25)'); if (B.back) return;
      path(ctx, c => { c.moveTo(vx - 22, top + 4); c.lineTo(vx + 22, top + 4); c.lineTo(vx, top + 80); c.closePath(); }, '#f4f1ea', 3);
      if (vest) path(ctx, c => { c.moveTo(vx - 14, top + 30); c.lineTo(vx + 14, top + 30); c.lineTo(vx, top + 80); c.closePath(); }, vest, 2.5);
      path(ctx, c => { c.moveTo(vx - 7, top + 8); c.lineTo(vx + 7, top + 8); c.lineTo(vx + 9, top + 64); c.lineTo(vx, top + 76); c.lineTo(vx - 9, top + 64); c.closePath(); }, tie, 2.5);
      for (const sd of [-1, 1]) seg(ctx, [[vx + sd * 22, top + 4], [vx + sd * 6, top + 90]], 3.5, mul(coat, .7));
      for (let i = 0; i < 2; i++) path(ctx, c => c.arc(vx + 4, top + 104 + i * 26, 4, 0, TAU), mul(coat, .6), 2); } });
  O.suit1911 = suitC('#3a3430', '#5a4a3a', '#2a2a30', null, 'bowlerT');
  O.suitGrey = suitC('#5a5e66', null, '#7a2a2a', null);
  O.suitBrown = suitC('#5a4232', '#7a6a4a', '#2a3a5a', null);
  O.suitNavy = suitC('#25304a', null, '#2a5a9a', null);
  O.suitDark = suitC('#2a2a30', null, '#2a2a30', null);
  O.suitFedora = suitC('#4a4a52', null, '#8a3a2a', null, 'fedora');
  O.gardien = suitC('#1e2a4a', null, '#1e2a4a', '#1e2a4a', 'gardienCap');
  O.judge = robe('#15100c', '#c8281e', { hat: 'none', belt: false });
  O.ladySuit = { hat: 'cloche', arm: { sleeve: '#6a6a72', w: 30, cuff: '#6a6a72' }, legs: { kind: 'none' }, feet: 'none',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-56 * nar, -170); c.lineTo(56 * nar, -170); c.lineTo(70 * nar, -40); c.lineTo(-70 * nar, -40); c.closePath(); }, '#5a5a62', 'rgba(0,0,0,.25)');
      for (const sd of [-1, 1]) { seg(ctx, [[sd * 24, -40], [sd * 24, 0]], 20, '#e8c8b0'); path(ctx, c => c.ellipse(sd * 26, 2, 20, 9, 0, 0, TAU), '#2a2420', 3); } },
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -166, 1), '#6a6a72', 'rgba(0,0,0,.25)'); if (B.back) return; path(ctx, c => { c.moveTo(vx - 20, top + 2); c.lineTo(vx + 20, top + 2); c.lineTo(vx, top + 50); c.closePath(); }, '#f4f1ea', 3); } };
  O.pinkSuit = { hat: 'pillbox', arm: { sleeve: '#e86a9a', w: 30, cuff: '#e86a9a' }, legs: { kind: 'none' }, feet: 'none',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-56 * nar, -170); c.lineTo(56 * nar, -170); c.lineTo(66 * nar, -50); c.lineTo(-66 * nar, -50); c.closePath(); }, '#e86a9a', 'rgba(0,0,0,.2)');
      for (const sd of [-1, 1]) { seg(ctx, [[sd * 24, -50], [sd * 24, 0]], 20, '#f2d4c0'); path(ctx, c => c.ellipse(sd * 26, 2, 20, 9, 0, 0, TAU), '#e86a9a', 3); } },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -166, 1), '#e86a9a', 'rgba(0,0,0,.2)'); if (B.back) return;
      for (let i = 0; i < 3; i++) path(ctx, c => c.arc(vx, top + 40 + i * 30, 6, 0, TAU), '#15100c', 2);
      ctx.fillStyle = '#fbf8f0'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(vx - 32 + i * 8, top + 4 + Math.sin(i / 8 * PI) * 12, 4, 0, TAU); ctx.fill(); } } };
  O.marine = suitC('#1e2a4a', null, '#15100c', '#1e2a4a', 'marineCap');
  O.tourist1 = suitC('#3a8ae8', null, '#3a8ae8', '#3a4a6a'); O.tourist2 = suitC('#e8a03a', null, '#e8a03a', '#4a4a52'); O.tourist3 = suitC('#3ab88a', null, '#3ab88a', '#2a2a30');
  O.coat60 = suitC('#6a5a4a', null, '#2a2a30', '#3a3a40', 'fedora'); O.coat60b = suitC('#3a4a5a', null, '#8a2a2a', '#2a2a30');

  // ---------- hats ----------
  H.beret = { draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.ellipse(x - 6, -112, 140, 52, -.1, 0, TAU), '#1e1a1e', 4.5); path(ctx, c => c.ellipse(x + 10, -142, 100, 40, -.15, 0, TAU), '#2a242a', 4); } };
  const capp = col => ({ draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // Florentine cappuccio: padded roll + falling cloth
    path(ctx, c => { c.moveTo(x + 80, -110); c.quadraticCurveTo(x + 150, -60, x + 120, 20); c.lineTo(x + 92, 18); c.quadraticCurveTo(x + 110, -50, x + 60, -100); c.closePath(); }, mul(col, .8), 4);
    path(ctx, c => c.ellipse(x, -120, 132, 46, 0, 0, TAU), col, 4.5); path(ctx, c => c.ellipse(x, -150, 96, 36, 0, 0, TAU), mul(col, 1.1), 4); } });
  H.cappuccio = capp('#2a2630'); H.cappuccioRed = capp('#a8302a');
  H.veil = { draw(ctx, hc) { const x = (hc.hx || 0) * .5; ctx.save(); ctx.globalAlpha = .45; path(ctx, c => { c.moveTo(x - 120, -80); c.quadraticCurveTo(x, -190, x + 120, -80); c.lineTo(x + 130, 40); c.lineTo(x + 110, 40); c.quadraticCurveTo(x, -150, x - 110, 40); c.lineTo(x - 130, 40); c.closePath(); }, '#2a2420', 0); ctx.restore(); } };
  H.bicorne = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => { c.moveTo(x - 190, -110); c.quadraticCurveTo(x, -280, x + 190, -110); c.quadraticCurveTo(x, -150, x - 190, -110); c.closePath(); }, '#15100c', 4.5);
    path(ctx, c => c.arc(x + 60, -170, 16, 0, TAU), '#2a4ab8', 3); path(ctx, c => c.arc(x + 60, -170, 9, 0, TAU), '#fbf8f0', 0); path(ctx, c => c.arc(x + 60, -170, 4, 0, TAU), '#c8281e', 0); } };
  H.bigWig = { hideTufts: true, behind(ctx, hc) { const x = Math.sin(hc.yaw || 0) * 16; for (const sd of [-1, 1]) for (let i = 0; i < 5; i++) path(ctx, c => c.ellipse(x + sd * (120 + (i % 2) * 14), -40 + i * 44, 44, 30, 0, 0, TAU), '#3a2618', 3.5); },
    draw(ctx, hc) { const x = Math.sin(hc.yaw || 0) * 20; for (let i = -2; i <= 2; i++) path(ctx, c => c.ellipse(x + i * 46, -140 - (2 - Math.abs(i)) * 14, 50, 40, 0, 0, TAU), '#4a3020', 3.5);
      for (const sd of [-1, 1]) path(ctx, c => c.ellipse(x + sd * 118, -70, 34, 46, 0, 0, TAU), '#4a3020', 3.5); } };
  H.fedora = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.ellipse(x, -100, 160, 26, -.04, 0, TAU), '#3a3632', 4.5);
    garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 90, -104); c.quadraticCurveTo(x - 96, -200, x - 30, -196); c.quadraticCurveTo(x, -170, x + 30, -196); c.quadraticCurveTo(x + 96, -200, x + 90, -104); c.closePath(); }, '#4a4640', 'rgba(0,0,0,.3)'); path(ctx, c => c.rect(x - 90, -124, 180, 18), '#1e1a18', 3); } };
  H.pillbox = { draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.roundRect(x - 62, -196, 124, 56, 14), '#e86a9a', 4); path(ctx, c => c.ellipse(x, -196, 62, 14, 0, 0, TAU), '#f08ab0', 3); } };
  H.marineCap = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.ellipse(x, -150, 130, 40, 0, 0, TAU), '#fbf8f0', 4.5); path(ctx, c => c.rect(x - 96, -150, 192, 40), '#15100c', 4); path(ctx, c => c.ellipse(x, -104, 110, 18, 0, 0, TAU), '#15100c', 3); path(ctx, c => c.arc(x, -134, 12, 0, TAU), '#e8c86a', 2.5); } };
  H.cloche = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.ellipse(x, -100, 156, 30, 0, 0, TAU), '#4a4a52', 4.5); garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 100, -100); c.bezierCurveTo(x - 104, -210, x + 104, -210, x + 100, -100); c.closePath(); }, '#5a5a62', 'rgba(0,0,0,.25)'); path(ctx, c => c.rect(x - 100, -122, 200, 14), '#2a2a30', 3); } };
  H.gardienCap = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => c.roundRect(x - 96, -190, 192, 80, 10), '#1e2a4a', 4.5); path(ctx, c => c.ellipse(x + 10, -108, 120, 16, 0, 0, TAU), '#15100c', 3); path(ctx, c => c.rect(x - 96, -136, 192, 12), '#c8a24a', 2.5); } };

  // the sit twins (toilet/js/cast.js builds them only for outfits that existed then)
  for (const k of Object.keys(O)) if (!k.includes('@') && !O[k + '@sit']) { const S = O[k], L = S.legs || {}; O[k + '@sit'] = Object.assign({}, S, { legs: { kind: 'sit', c: L.kind === 'bare' || L.kind === 'none' ? (S.arm || {}).sleeve : (L.c || L.sock), shoe: S.boot || '#2e2c30' }, feet: 'none', legsOver: undefined }); }

  // ---------- the cast (from the user's photos) ----------
  const L = (o) => o; Object.assign(G.CW, {
    leonardo:  { outfit: 'leonardo', look: L({ skin: '#f2d2b6', hairCol: '#e8e6e2', beard: 'full', beardCol: '#f2f0ec', brow: 1.2 }) },
    lisa:      { outfit: 'lisaDress', look: L({ skin: '#f4dcc4', hair: 'curly', hairCol: '#3a2618', lashes: true, lips: '#b8706a' }) },
    francesco: { outfit: 'luccoRed', look: L({ skin: '#ecc8a6', hairCol: '#2a1e16', beard: 'full', beardCol: '#2a1e16' }) },
    vespucci:  { outfit: 'luccoBlack', look: L({ skin: '#eecaa8', hairCol: '#5a4a3a', beard: 'stubble' }) },
    vasari:    { outfit: 'vasariRobe', look: L({ skin: '#ecc8a6', hair: 'bald', hairCol: '#3a2e26', beard: 'full', beardCol: '#3a2e26' }) },
    salai:     { outfit: 'renTunic', look: L({ skin: '#f2d2b6', hair: 'curly', hairCol: '#8a5a2a' }) },
    francis:   { outfit: 'francis', look: L({ skin: '#eecaa8', hairCol: '#3a2618', beard: 'full', beardCol: '#3a2618', nose: 'big' }) },
    louis14:   { outfit: 'royalRobe', look: L({ skin: '#f2d6c0', hairCol: '#4a3020' }) },
    napoleon:  { outfit: 'napoleon', look: L({ skin: '#f2d6c0', hairCol: '#3a2a1a' }) },
    josephine: { outfit: 'empire', look: L({ skin: '#f4dcc8', hair: 'curly', hairCol: '#2a1a12', lashes: true, lips: '#c06a6a' }) },
    beroud:    { outfit: 'suitDark', look: L({ skin: '#f0d0b4', hairCol: '#2a2420', beard: 'moustache', beardCol: '#2a2420' }) },
    peruggia:  { outfit: 'smock', look: L({ skin: '#eccaa8', hairCol: '#1e1814', beard: 'walrus', beardCol: '#1e1814' }) },
    peruggiaS: { outfit: 'suitBrown', look: L({ skin: '#eccaa8', hairCol: '#1e1814', beard: 'walrus', beardCol: '#1e1814' }) },
    gardien:   { outfit: 'gardien', look: L({ skin: '#f0d0b4', hairCol: '#3a3030', beard: 'moustache', beardCol: '#3a3030' }) },
    apollinaire: { outfit: 'suit1911', look: L({ skin: '#eecaa8', hairCol: '#1e1814', beard: 'moustache', beardCol: '#1e1814', width: 1.18 }) },
    picasso:   { outfit: 'suitBrown', look: L({ skin: '#e8c4a0', hairCol: '#15100c', hair: 'mop' }) },
    geri:      { outfit: 'suit1911', look: L({ skin: '#f0d0b4', hairCol: '#4a4040', beard: 'moustache', beardCol: '#4a4040' }) },
    poggi:     { outfit: 'suitDark', look: L({ skin: '#f2d6bc', hairCol: '#2a2420' }) },
    judgeIT:   { outfit: 'judge', look: L({ skin: '#ecc8a6', hair: 'bald', hairCol: '#8a8a8a', beard: 'moustache', beardCol: '#8a8a8a' }) },
    decker:    { outfit: 'suitFedora', look: L({ skin: '#f0d0b4', hairCol: '#5a4a3a' }) },
    jaujard:   { outfit: 'suitGrey', look: L({ skin: '#ecc8a6', hairCol: '#1e1814' }) },
    valland:   { outfit: 'ladySuit', look: L({ skin: '#f2d6c0', hairCol: '#3a2a20', lashes: true, glasses: true }) },
    jackie:    { outfit: 'pinkSuit', look: L({ skin: '#f4dcc8', hair: 'curly', hairCol: '#2a1a12', lashes: true, lips: '#d05a7a' }) },
    jfk:       { outfit: 'suitNavy', look: L({ skin: '#f2d2b4', hairCol: '#7a4a2a' }) },
    malraux:   { outfit: 'suitDark', look: L({ skin: '#eecaa8', hairCol: '#1e1814' }) },
    marine:    { outfit: 'marine', look: L({ skin: '#e8c4a0', hairCol: '#2a2420' }) },
    livingstone: { outfit: 'ladySuit', hat: 'none', look: L({ skin: '#f4dcc8', hair: 'curly', hairCol: '#c8a070', lashes: true, glasses: true }) },
    tourist1: { outfit: 'tourist1', look: L({ skin: '#f2d2b6', hairCol: '#5a3a22' }) }, tourist2: { outfit: 'tourist2', look: L({ skin: '#c8906a', hairCol: '#15100c', hair: 'curly' }) },
    tourist3: { outfit: 'tourist3', look: L({ skin: '#f4dcc8', hairCol: '#c8a070', lashes: true }) }, tourist4: { outfit: 'hoodie', look: L({ skin: '#8a5a3a', hairCol: '#15100c' }) },
    visitor60: { outfit: 'coat60', look: L({ skin: '#f0d0b4', hairCol: '#5a4a3a' }) }, visitor60b: { outfit: 'coat60b', look: L({ skin: '#e8c4a0', hairCol: '#2a2420' }) },
    citizen1:  { outfit: 'georgian', look: L({ skin: '#f0d0b4', hairCol: '#5a4a3a' }) }, citizen2: { outfit: 'peasantFR', look: L({ skin: '#ecc8a6', hairCol: '#3a2a1a' }) },
    citizen3:  { outfit: 'empire', look: L({ skin: '#f4dcc8', hair: 'curly', hairCol: '#8a5a2a', lashes: true }) },
    worker1911: { outfit: 'smock', look: L({ skin: '#f0d0b4', hairCol: '#5a4a3a', beard: 'moustache', beardCol: '#5a4a3a' }) },
    paris1911a: { outfit: 'suit1911', look: L({ skin: '#f0d0b4', hairCol: '#3a3030', beard: 'moustache', beardCol: '#3a3030' }) },
    paris1911b: { outfit: 'empire', hat: 'cloche', look: L({ skin: '#f4dcc8', hair: 'curly', hairCol: '#5a3a22', lashes: true }) },
    musician:  { outfit: 'renTunic', look: L({ skin: '#ecc8a6', hairCol: '#2a1e16' }) },
    jester:    { outfit: 'renTunic', hat: 'feltCap', look: L({ skin: '#f2d2b6', hairCol: '#8a5a2a' }) },
  });
})(window);
