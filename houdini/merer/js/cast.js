/* Merer's Diary — cast + costumes (Old Kingdom Egypt, reign of Khufu, ~2560 BC; plus Herodotus' Greece ~450 BC).
 * Outfits: eWorker (bare chest, plain linen kilt knotted at the waist, barefoot), eScribe (Merer / Ankhhaf: knee kilt
 *   with a front panel, linen sash across the chest, simple bead collar), eDress (linen sheath dress with straps —
 *   bakers, brewers, families), eGreek (Herodotus: chiton + terracotta himation, sandals), eLab (modern lab coat).
 *   Khufu wears Theo's 'egypt' outfit (pleated royal kilt, broad collar) with the nemes.
 * Hats: wigOK (short black Old Kingdom bob wig), kerchief (white linen work cap), petasos (Greek straw sun hat).
 * Props: papyrus (sheet + reed pen), mallet, jar (beer jar on the shoulder), bread (conical loaf), rope (haul rope). */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment, lerp } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, PR = Gd.PROPS, LEGS = Gd.LEGS, FEET = Gd.FEET, TAU = Math.PI * 2, PI = Math.PI;
  const INK = () => Gd.kit.INK;
  const LINEN = '#f3ecda', LINEN_D = 'rgba(110,90,50,.22)';

  FEET.barefoot = (ctx, g) => { const { sd, ank, lift, toe } = g, fx = ank[0] + toe + sd * 6, fy = -12 - lift;
    path(ctx, c => c.ellipse(fx, fy, 27, 12, 0, 0, TAU), Gd.C.face, 4); for (let i = 0; i < 3; i++) path(ctx, c => c.arc(fx + 16 + i * 4, fy - 6 + i * 4, 2, 0, TAU), 'rgba(0,0,0,.18)', 0); };

  const kilt = (ctx, B, o = {}) => {   // knee-length linen kilt: wrap-over front edge, pleats, a linen belt with a knot
    const { nar, vx } = B, bot = o.long ? -70 : -98, k = c => { c.moveTo(-66 * nar, -204); c.lineTo(66 * nar, -204); c.lineTo(78 * nar, bot); c.quadraticCurveTo(0, bot + 10, -78 * nar, bot); c.closePath(); };
    garment(ctx, B, k, o.c || LINEN, LINEN_D, c2 => { c2.strokeStyle = 'rgba(130,110,70,.3)'; c2.lineWidth = 1.6; for (let x = -80; x < 84; x += (o.pleat ? 8 : 16)) { c2.beginPath(); c2.moveTo(x * .82, -200); c2.lineTo(x, bot + 6); c2.stroke(); } });
    if (!B.back) { curve(ctx, [vx - 10, -200], [vx + 16, -150], [vx + 30, bot + 4], 3, 'rgba(90,70,40,.5)'); if (o.panel) path(ctx, c => { c.moveTo(vx - 16, -198); c.lineTo(vx + 16, -198); c.lineTo(vx + 20, bot - 6); c.lineTo(vx - 20, bot - 6); c.closePath(); }, '#efe5cb', 3); }
    path(ctx, c => c.rect(-68 * nar, -210, 136 * nar, 13), o.belt || '#e2d6b6', 3.5);
    if (!B.back) path(ctx, c => { c.moveTo(vx + 20, -206); c.lineTo(vx + 30, -184); c.lineTo(vx + 22, -182); c.closePath(); }, o.belt || '#e2d6b6', 2.5);
  };
  const chest = (ctx, B) => { const { top, vx } = B; if (B.back) return;
    curve(ctx, [vx - 34, top + 64], [vx - 16, top + 76], [vx - 2, top + 66], 2.5, 'rgba(0,0,0,.28)'); curve(ctx, [vx + 34, top + 64], [vx + 16, top + 76], [vx + 2, top + 66], 2.5, 'rgba(0,0,0,.28)');
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.arc(vx, -224, 2.5, 0, TAU); ctx.fill(); };

  O.eWorker = { hat: 'none', arm: { bare: true }, legs: { kind: 'bare' }, feet: 'barefoot',
    torso(ctx, B) { garment(ctx, B, bodyPath(B, -196, .96), Gd.C.face, 'rgba(60,30,10,.16)'); chest(ctx, B); },
    legsOver(ctx, B) { kilt(ctx, B); } };
  O.eScribe = { hat: 'wigOK', arm: { bare: true }, legs: { kind: 'bare' }, feet: 'sandals',
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -196, .98), Gd.C.face, 'rgba(60,30,10,.16)'); chest(ctx, B); if (B.back) return;
      // linen sash over one shoulder + a simple two-row bead collar
      path(ctx, c => { c.moveTo(vx - 64, top + 4); c.lineTo(vx - 34, top - 4); c.lineTo(vx + 70, top + 120); c.lineTo(vx + 50, top + 136); c.closePath(); }, LINEN, 3.5);
      ctx.lineCap = 'butt'; ['#2fa39b', '#c9a24a'].forEach((col, i) => { ctx.beginPath(); ctx.arc(vx * .5, top - 14, 36 + i * 11, .14 * PI, .86 * PI); ctx.lineWidth = 13; ctx.strokeStyle = INK(); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.stroke(); }); ctx.lineCap = 'round'; },
    legsOver(ctx, B) { kilt(ctx, B, { panel: true, pleat: true, long: true }); } };
  O.eKing = Object.assign({}, O.egypt);
  O.eDress = { hat: 'none', arm: { bare: true }, legs: { kind: 'bare' }, feet: 'barefoot',
    torso(ctx, B) { const { top, nar, vx } = B; const shp = c => { c.moveTo(-58 * nar, top + 50); c.lineTo(58 * nar, top + 50); c.lineTo(74 * nar, -40); c.quadraticCurveTo(0, -30, -74 * nar, -40); c.closePath(); };
      garment(ctx, B, bodyPath(B, -196, .94), Gd.C.face, 'rgba(60,30,10,.14)'); garment(ctx, B, shp, LINEN, LINEN_D);
      if (!B.back) for (const sd of [-1, 1]) seg(ctx, [[vx + sd * 30, top + 54], [vx + sd * 38, top - 2]], 9, LINEN); } };
  O.eGreek = { hat: 'petasos', arm: { sleeve: '#d8dbe2', w: 30, short: true }, legs: { kind: 'bare' }, feet: 'sandals',
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, c => { c.moveTo(-60 * nar, top - 4); c.lineTo(60 * nar, top - 4); c.lineTo(80 * nar, -60); c.quadraticCurveTo(0, -50, -80 * nar, -60); c.closePath(); }, '#d8dbe2', 'rgba(40,50,80,.22)', c2 => { c2.strokeStyle = 'rgba(80,90,120,.3)'; c2.lineWidth = 2; for (let x = -70; x < 80; x += 14) { c2.beginPath(); c2.moveTo(x * .8, top); c2.lineTo(x, -60); c2.stroke(); } });
      if (B.back) return;
      garment(ctx, B, c => { c.moveTo(vx - 70, top + 2); c.quadraticCurveTo(vx - 20, top + 20, vx + 72, -150); c.lineTo(vx + 80, -70); c.quadraticCurveTo(vx, -60, vx - 76, -90); c.closePath(); }, '#b8573a', 'rgba(60,10,0,.28)', c2 => { c2.strokeStyle = 'rgba(255,220,180,.25)'; c2.lineWidth = 3; for (let i = 0; i < 4; i++) { c2.beginPath(); c2.moveTo(-60, -120 + i * 14); c2.quadraticCurveTo(0, -110 + i * 12, 70, -140 + i * 16); c2.stroke(); } });
      path(ctx, c => c.rect(vx - 76, -92, 156, 8), '#e2c27a', 2.5); } };
  O.eLab = { hat: 'none', arm: { sleeve: '#f4f6f8', w: 30 }, legs: { kind: 'trousers', c: '#3e4a5e' }, feet: 'shoes',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -60, 1.04), '#f4f6f8', 'rgba(40,60,90,.18)'); if (B.back) return;
      path(ctx, c => { c.moveTo(vx - 20, top - 4); c.lineTo(vx + 20, top - 4); c.lineTo(vx, top + 70); c.closePath(); }, '#7aa0c8', 3.5);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 6, top - 8); c.lineTo(vx + sd * 40, top - 4); c.lineTo(vx + sd * 14, top + 90); c.closePath(); }, '#e8ecf0', 3.5);
      path(ctx, c => c.roundRect(vx + 30, top + 80, 34, 30, 4), '#e8ecf0', 3); seg(ctx, [[vx + 40, top + 72], [vx + 40, top + 96]], 4, '#3a6ab0'); } };

  // ---------- headwear ----------
  H.wigOK = { hideTufts: true,   // short rounded Old Kingdom wig: a full bob behind the head + a cap with a straight fringe over the brow
    behind(ctx, hc) { const fx = Math.sin(hc.yaw || 0) * 16;
      garment(ctx, { shadeSide: 1 }, c => { c.moveTo(fx - 150, 44); c.bezierCurveTo(fx - 172, -90, fx - 100, -156, fx, -156); c.bezierCurveTo(fx + 100, -156, fx + 172, -90, fx + 150, 44); c.quadraticCurveTo(fx, 70, fx - 150, 44); c.closePath(); }, '#1e1814', 'rgba(0,0,0,.3)'); },
    draw(ctx, hc) { const fx = Math.sin(hc.yaw || 0) * 22;
      garment(ctx, { shadeSide: 1 }, c => { c.moveTo(fx - 146, 40); c.bezierCurveTo(fx - 166, -92, fx - 98, -150, fx, -150); c.bezierCurveTo(fx + 98, -150, fx + 166, -92, fx + 146, 40); c.lineTo(fx + 108, 40); c.lineTo(fx + 106, -44); c.quadraticCurveTo(fx, -56, fx - 106, -44); c.lineTo(fx - 108, 40); c.closePath(); }, '#1e1814', 'rgba(0,0,0,.25)', c2 => {
        c2.strokeStyle = 'rgba(255,255,255,.12)'; c2.lineWidth = 3; for (let y = -130; y < 40; y += 17) { c2.beginPath(); c2.moveTo(-170, y); c2.quadraticCurveTo(0, y + 12, 170, y); c2.stroke(); } });
      curve(ctx, [fx - 70, -112], [fx - 20, -134], [fx + 40, -126], 5, 'rgba(255,255,255,.18)'); } };
  H.kerchief = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // white linen work cap tied at the back
    garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 128, -30); c.bezierCurveTo(x - 132, -120, x - 70, -140, x, -140); c.bezierCurveTo(x + 70, -140, x + 132, -120, x + 128, -30); c.quadraticCurveTo(x, -62, x - 128, -30); c.closePath(); }, LINEN, LINEN_D);
    path(ctx, c => { c.moveTo(x + 116, -50); c.lineTo(x + 168, -20); c.lineTo(x + 150, 6); c.lineTo(x + 110, -30); c.closePath(); }, LINEN, 3.5); } };
  H.petasos = { hideTufts: true, draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // Greek traveller's straw sun hat
    path(ctx, c => c.ellipse(x, -70, 200, 34, -.04, 0, TAU), '#d8b46a', 4.5);
    garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 80, -76); c.quadraticCurveTo(x - 70, -160, x, -164); c.quadraticCurveTo(x + 70, -160, x + 80, -76); c.closePath(); }, '#d8b46a', 'rgba(90,60,10,.25)', c2 => { c2.strokeStyle = 'rgba(120,80,20,.35)'; c2.lineWidth = 2; for (let y = -160; y < -70; y += 10) { c2.beginPath(); c2.moveTo(-90, y); c2.lineTo(90, y + 4); c2.stroke(); } });
    path(ctx, c => c.rect(x - 80, -94, 160, 12), '#8a5a2a', 3); } };

  // ---------- props ----------
  PR.papyrus = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 34, y - 30); ctx.rotate(-.08);
    path(ctx, c => c.rect(-44, -58, 88, 104), '#e9d9a8', 3.5); ctx.strokeStyle = 'rgba(120,90,40,.25)'; ctx.lineWidth = 1.5; for (let i = -40; i < 44; i += 7) { ctx.beginPath(); ctx.moveTo(i, -56); ctx.lineTo(i, 44); ctx.stroke(); }
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-32, -40 + i * 15); for (let k = 0; k < 8; k++) ctx.quadraticCurveTo(-28 + k * 8, -46 + i * 15 + (k % 2) * 10, -24 + k * 8, -40 + i * 15); ctx.lineWidth = 2.4; ctx.strokeStyle = i === 0 ? '#b8322a' : '#2a2018'; ctx.stroke(); }
    path(ctx, c => c.roundRect(-52, -64, 10, 116, 5), '#d8c48c', 3); ctx.restore(); } };
  PR.pen = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x - 4, y + 10], [x + 20, y - 60]], 7); seg(ctx, [[x - 4, y + 10], [x + 20, y - 60]], 3.5, '#a88a4a'); } };
  PR.mallet = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x, y + 10], [x + 6, y - 70]], 11); seg(ctx, [[x, y + 10], [x + 6, y - 70]], 6, '#8a5a32'); path(ctx, c => c.roundRect(x - 18, y - 110, 50, 44, 10), '#a06a3a', 4); } };
  PR.jar = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 8, y - 40); path(ctx, c => { c.moveTo(-18, -50); c.quadraticCurveTo(-44, 0, -20, 50); c.lineTo(20, 50); c.quadraticCurveTo(44, 0, 18, -50); c.closePath(); }, '#b8653a', 4); path(ctx, c => c.ellipse(0, -52, 22, 8, 0, 0, TAU), '#8a4424', 3); ctx.restore(); } };
  PR.bread = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 20, y - 14); path(ctx, c => { c.moveTo(-26, 16); c.quadraticCurveTo(0, -46, 26, 16); c.closePath(); }, '#d09a52', 4); ctx.fillStyle = 'rgba(255,240,200,.35)'; ctx.beginPath(); ctx.ellipse(-6, -2, 6, 12, .3, 0, TAU); ctx.fill(); ctx.restore(); } };

  // ---------- the cast ----------
  G.CW = {
    merer:    { outfit: 'eScribe', hat: 'wigOK', prop: 'papyrus', look: { skin: '#b8784e', hairCol: '#1e1814', brow: 1 } },
    ankhhaf:  { outfit: 'eScribe', hat: 'none', look: { skin: '#b07450', hair: 'bald', hairCol: '#2a1e16', width: 1.06, brow: 1 } },
    khufu:    { outfit: 'eKing', hat: 'nemes', look: { skin: '#b97a50', hairCol: '#1e1814' } },
    w1:       { outfit: 'eWorker', hat: 'none', look: { skin: '#a8683e', hairCol: '#1a1410' } },
    w2:       { outfit: 'eWorker', hat: 'kerchief', look: { skin: '#8a5434', hairCol: '#1a1410', beard: 'stubble' } },
    w3:       { outfit: 'eWorker', hat: 'none', look: { skin: '#c08458', hair: 'bald', hairCol: '#1a1410', width: 1.08 } },
    w4:       { outfit: 'eWorker', hat: 'kerchief', look: { skin: '#9a5e38', hairCol: '#1a1410' } },
    w5:       { outfit: 'eWorker', hat: 'none', look: { skin: '#b5724a', hair: 'curly', hairCol: '#1a1410' } },
    baker:    { outfit: 'eDress', hat: 'none', prop: 'bread', look: { skin: '#b07048', hair: 'long', hairCol: '#1a1410', lashes: true, lips: '#9a3a3a' } },
    brewer:   { outfit: 'eDress', hat: 'none', prop: 'jar', look: { skin: '#9a603c', hair: 'long', hairCol: '#1a1410', lashes: true, earrings: true } },
    herodotus:{ outfit: 'eGreek', hat: 'petasos', look: { skin: '#e2b088', hairCol: '#6a5a4a', beard: 'full', beardCol: '#8a7a68', nose: 'big' } },
    guideman: { outfit: 'eWorker', hat: 'kerchief', look: { skin: '#a8683e', hairCol: '#1a1410', beard: 'moustache' } },
    scientist:{ outfit: 'eLab', hat: 'none', look: { skin: '#f0c8a8', hairCol: '#8a6a4a', beard: 'stubble' } },
  };
})(window);
