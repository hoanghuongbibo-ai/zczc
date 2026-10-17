/* Cowboy episode cast + costumes (Texas → Kansas trail drives, 1866–1886, plus a 1950s Hollywood movie set).
 * Outfits: cowhand (work shirt, vest, bandana, leather chaps over denim, heeled boots; o.dust adds trail dust),
 *   vaquero (short charro jacket with trim, red sash, flared trousers with side buttons), gunslinger (long duster,
 *   vest, gun belt), lawman (white shirt, leather vest, tin star), director (1950s Hollywood: open shirt, ascot,
 *   jodhpurs + riding boots), cook (rolled sleeves, suspenders, long stained apron), boss (long coat over vest),
 *   veteran (grey shell jacket), rancher (frock coat — Goodnight), buckskin (fringed — Nat Love / Roosevelt),
 *   modern (riding-club shirt, jeans).
 * Hats: stetson (+ colour variants), battered (the extra's sweat-stained hat), sombrero, beret, kepi, bowler,
 *   teddy (stetson + spectacles), hatShades (beret + sunglasses).
 * Props: megaphone, lasso, ladle, coffee, plate (beans), paper, harmonica, rifle, clapper, cash (money roll).
 * Every outfit also gets an "@ride" twin (no legs/feet) used by Beasts.steed for mounted riders. */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment, lerp } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, PR = Gd.PROPS, LEGS = Gd.LEGS, FEET = Gd.FEET, LW = 5, TAU = Math.PI * 2, PI = Math.PI;
  const INK = () => Gd.kit.INK;
  const clip = (ctx, shp, fn) => { ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip(); fn(); ctx.restore(); };
  const tube = (ctx, a, b, w, col) => { seg(ctx, [a, b], w + 10); seg(ctx, [a, b], w, col); };
  const dustSpecks = (c2, top, bot, a = .35, seed = 3) => { let s = seed; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; c2.fillStyle = `rgba(196,164,112,${a})`; for (let i = 0; i < 70; i++) { c2.beginPath(); c2.arc(-110 + r() * 220, top + r() * (bot - top), 2 + r() * 5, 0, TAU); c2.fill(); } };

  // ---------- legs / feet ----------
  LEGS.chaps = (ctx, g, L, B) => {   // denim legs + leather chaps on the outside of each leg (fringe on the seam)
    LEGS.trousers(ctx, g, { c: L.c }, B);
    const { sd, hip, ank } = g, k = 1, a = [hip[0] + sd * 4, hip[1] - 6], b = [ank[0] + sd * 6, ank[1] - 6];
    const shp = c => { c.moveTo(a[0] - sd * 10, a[1]); c.lineTo(a[0] + sd * 26, a[1] + 2); c.lineTo(b[0] + sd * 22, b[1]); c.lineTo(b[0] - sd * 6, b[1] + 2); c.closePath(); };
    path(ctx, shp, L.chap || '#8a5432', 4); clip(ctx, shp, () => { ctx.fillStyle = 'rgba(255,230,190,.16)'; ctx.fillRect(a[0] - 30, a[1], 18, 160); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(a[0] + sd * 10, a[1], sd * 30, 160); });
    if (L.fringe) for (let i = 0; i < 9; i++) { const u = (i + .5) / 9, x = lerp(a[0] + sd * 26, b[0] + sd * 22, u), y = lerp(a[1], b[1], u); seg(ctx, [[x, y], [x + sd * 12, y + 4]], 3, L.chap || '#8a5432'); }
    for (let i = 0; i < 3; i++) { const y = lerp(a[1] + 20, b[1] - 20, i / 2); path(ctx, c => c.arc(lerp(a[0], b[0], (y - a[1]) / (b[1] - a[1])) + sd * 20, y, 3.5, 0, TAU), '#d8c08a', 1.5); }
    if (k && L.dust) { ctx.save(); ctx.globalAlpha = .4; ctx.fillStyle = '#c9a874'; ctx.fillRect(Math.min(b[0] - 20, b[0] + sd * 26), b[1] - 40, 46, 40); ctx.restore(); }
  };
  LEGS.jodhpurs = (ctx, g, L) => { const { hip, ank } = g, knee = [lerp(hip[0], ank[0], .55), -96];
    seg(ctx, [hip, knee], 60); seg(ctx, [hip, knee], 50, L.c); seg(ctx, [knee, ank], 40); seg(ctx, [knee, ank], 30, L.c); };
  LEGS.flare = (ctx, g, L) => {   // vaquero calzoneras: slim at the hip, flared at the boot, a row of silver buttons
    const { sd, hip, ank } = g, shp = c => { c.moveTo(hip[0] - 18, hip[1]); c.lineTo(hip[0] + 18, hip[1]); c.lineTo(ank[0] + sd * 30, ank[1] + 4); c.lineTo(ank[0] - sd * 22, ank[1] + 4); c.closePath(); };
    path(ctx, shp, L.c, 4); clip(ctx, shp, () => { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(hip[0] + sd * 4, hip[1], sd * 40, 200); });
    for (let i = 0; i < 6; i++) { const u = (i + .5) / 6; path(ctx, c => c.arc(lerp(hip[0] + sd * 16, ank[0] + sd * 26, u), lerp(hip[1] + 10, ank[1], u), 3.4, 0, TAU), '#e4e4ea', 1.5); }
  };
  FEET.cboots = (ctx, g, OF) => {   // heeled riding boots with a pointed toe, stitched shaft and a star spur
    const { sd, ank, lift, toe } = g, col = OF.boot || '#6a4026', fx = ank[0] + toe + sd * 8, fy = -16 - lift;
    tube(ctx, [ank[0], -26 - lift], [ank[0], -82 - lift], 32, col);
    for (const y of [-50, -66]) curve(ctx, [ank[0] - 12, y - lift], [ank[0], y - 6 - lift], [ank[0] + 12, y - lift], 2, 'rgba(255,230,190,.45)');
    path(ctx, c => { c.moveTo(fx - 28, fy - 10); c.quadraticCurveTo(fx + 6, fy - 20, fx + 34, fy + 4); c.lineTo(fx + 30, fy + 8); c.lineTo(fx - 28, fy + 8); c.closePath(); }, col, 4);
    path(ctx, c => c.rect(fx - 30, fy + 4, 16, 10), '#2a1a10', 3);
    if (OF.spurs) { seg(ctx, [[fx - 30, fy - 2], [fx - 44, fy - 2]], 3, '#9aa0a8'); for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; seg(ctx, [[fx - 48, fy - 2], [fx - 48 + Math.cos(a) * 8, fy - 2 + Math.sin(a) * 8]], 2, '#9aa0a8'); } }
  };
  FEET.riding = (ctx, g, OF) => { const { sd, ank, lift, toe } = g, fx = ank[0] + toe + sd * 6, fy = -14 - lift; tube(ctx, [ank[0], -26 - lift], [ank[0], -96 - lift], 38, OF.boot || '#1e1a18'); path(ctx, c => c.ellipse(fx, fy, 30, 15, 0, 0, TAU), OF.boot || '#1e1a18', 4); curve(ctx, [ank[0] - 10, -90 - lift], [ank[0] - 4, -60 - lift], [ank[0] - 8, -34 - lift], 3, 'rgba(255,255,255,.25)'); };

  // ---------- torsos ----------
  const collar = (ctx, B, col) => { const { top, vx } = B; for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 4, top - 6); c.lineTo(vx + sd * 30, top - 8); c.lineTo(vx + sd * 22, top + 18); c.closePath(); }, col, 3.5); };
  const bandana = (ctx, B, col) => { const { top, vx } = B; path(ctx, c => { c.moveTo(vx - 34, top - 8); c.quadraticCurveTo(vx, top + 8, vx + 34, top - 8); c.lineTo(vx + 4, top + 40); c.lineTo(vx - 4, top + 40); c.closePath(); }, col, 3.5);
    for (const [dx, dy] of [[-14, 6], [8, 10], [-2, 24], [14, 0]]) path(ctx, c => c.arc(vx + dx, top + dy, 2.6, 0, TAU), 'rgba(255,255,255,.75)', 0); };
  const gunbelt = (ctx, B, y = -178, side = 1, col = '#5a3a22') => { const { nar } = B; path(ctx, c => c.rect(-70 * nar, y, 140 * nar, 16), col, 3.5); for (let x = -60; x <= 60; x += 10) path(ctx, c => c.rect(x * nar - 2, y + 4, 4, 8), '#c9a648', 0);
    path(ctx, c => c.roundRect(side * 56 * nar - 16, y + 8, 30, 64, 8), col, 4); path(ctx, c => c.roundRect(side * 56 * nar - 8, y - 6, 16, 22, 4), '#3a2a20', 3); };
  const buckle = (ctx, B, y = -184, col = '#6b4428') => { const { nar, vx } = B; path(ctx, c => c.rect(-66 * nar, y, 132 * nar, 14), col, 3.5); path(ctx, c => c.roundRect(vx * .4 - 14, y - 4, 28, 22, 4), '#d8b85a', 3); };
  function cowhand(o = {}) {
    const shirt = o.shirt || '#b9573e', vest = o.vest === undefined ? '#6b4a30' : o.vest;
    return { hat: o.hat || 'stetson', arm: { sleeve: shirt, w: 30, cuff: o.cuff }, legs: { kind: 'chaps', c: o.jeans || '#4a5a78', chap: o.chap || '#8a5432', fringe: o.fringe, dust: o.dust }, feet: 'cboots', boot: o.boot || '#6a4026',
      torso(ctx, B) { const { top, nar, vx } = B;
        garment(ctx, B, bodyPath(B, -112, 1.12), shirt, 'rgba(40,10,0,.25)', c2 => { if (o.check) { c2.strokeStyle = 'rgba(255,255,255,.18)'; c2.lineWidth = 4; for (let x = -120; x < 120; x += 22) { c2.beginPath(); c2.moveTo(x, top - 10); c2.lineTo(x, -100); c2.stroke(); } for (let y = top; y < -100; y += 22) { c2.beginPath(); c2.moveTo(-120, y); c2.lineTo(120, y); c2.stroke(); } } if (o.dust) dustSpecks(c2, top, -100, .4, 5); });
        if (B.back) return;
        collar(ctx, B, shirt);
        if (vest) for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 18, top - 4); c.lineTo(sd * 62 * nar, top + 6); c.quadraticCurveTo(sd * 70 * nar, -150, sd * 62 * nar, -118); c.lineTo(vx + sd * 10, -118); c.quadraticCurveTo(vx + sd * 4, -170, vx + sd * 18, top + 70); c.closePath(); }, vest, 'rgba(0,0,0,.3)', c2 => { if (o.dust) dustSpecks(c2, top, -110, .35, 9); });
        if (vest) for (const sd of [-1, 1]) path(ctx, c => c.rect(vx + sd * 30 - 10, top + 76, 20, 6), 'rgba(0,0,0,.25)', 0);
        buckle(ctx, B, -184, o.belt || '#5a3a22');
        bandana(ctx, B, o.bandana || '#c0392b');
        if (o.gun) gunbelt(ctx, B, -170, 1);
      },
      front(ctx, B) { if (o.dust && !B.back) { ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#c9a874'; ctx.beginPath(); ctx.ellipse(0, -60, 70, 40, 0, 0, TAU); ctx.fill(); ctx.restore(); } } };
  }
  O.cowhand = cowhand({ dust: true });
  O.cowTheo = cowhand({ shirt: '#3f6f9a', check: true, vest: '#7a5232', bandana: '#d8433a' });
  O.cowRed = cowhand({ shirt: '#a8392f', vest: '#4a3426', bandana: '#e8c25a' });
  O.cowCream = cowhand({ shirt: '#e6d8b6', vest: '#5a3a22', bandana: '#3a6a9a', chap: '#6b4026' });
  O.cowGreen = cowhand({ shirt: '#5f7a4a', vest: null, bandana: '#c0392b', check: true });
  O.cowBlue = cowhand({ shirt: '#4a6f98', vest: '#3a2a20', bandana: '#e0b040', chap: '#7a4a2a' });
  O.cowPickett = cowhand({ shirt: '#c8453a', vest: '#2a2220', bandana: '#f2e6c8', chap: '#5a3420' });
  O.veteran = { hat: 'kepi', arm: { sleeve: '#8f9294', w: 30 }, legs: { kind: 'trousers', c: '#7a7466' }, feet: 'cboots', boot: '#3a2a1c', spurs: false,
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -118, 1.14), '#8f9294', 'rgba(20,20,30,.3)'); if (B.back) return;
      for (let i = 0; i < 6; i++) path(ctx, c => c.arc(vx, top + 24 + i * 24, 4.5, 0, TAU), '#d8b85a', 2); seg(ctx, [[vx - 3, top - 6], [vx - 3, -120]], 2.5, 'rgba(0,0,0,.4)'); collar(ctx, B, '#8f9294'); buckle(ctx, B, -184, '#3a2a1c'); } };
  O.vaquero = { hat: 'sombrero', arm: { sleeve: '#5a3422', w: 30, cuff: '#e8dcc0' }, legs: { kind: 'flare', c: '#4a3424' }, feet: 'cboots', boot: '#3a2418',
    torso(ctx, B) { const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -118, 1.12), '#efe4cc', 'rgba(60,40,20,.2)');
      if (B.back) { garment(ctx, B, bodyPath(B, -200, 1.14), '#5a3422', 'rgba(0,0,0,.3)'); return; }
      path(ctx, c => c.rect(-68 * nar, -200, 136 * nar, 34), '#b8322a', 3.5); for (let k = 0; k < 3; k++) seg(ctx, [[-64 * nar, -194 + k * 10], [64 * nar, -192 + k * 10]], 1.5, 'rgba(0,0,0,.25)');
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 16, top - 4); c.lineTo(sd * 64 * nar, top + 6); c.quadraticCurveTo(sd * 70 * nar, -180, sd * 62 * nar, -204); c.lineTo(vx + sd * 26, -204); c.quadraticCurveTo(vx + sd * 18, -260, vx + sd * 16, top + 40); c.closePath(); }, '#5a3422', 'rgba(0,0,0,.3)',
        c2 => { c2.strokeStyle = '#e0c070'; c2.lineWidth = 3; c2.beginPath(); c2.moveTo(vx + sd * 22, top + 30); c2.quadraticCurveTo(sd * 50, -230, sd * 56 * nar, -206); c2.stroke(); for (let k = 0; k < 4; k++) { c2.beginPath(); c2.arc(sd * 40, top + 60 + k * 26, 4, 0, TAU); c2.stroke(); } });
      path(ctx, c => { c.moveTo(vx - 16, top + 6); c.quadraticCurveTo(vx, top + 20, vx + 16, top + 6); c.lineTo(vx, top + 34); c.closePath(); }, '#2a2a2a', 3); } };
  O.gunslinger = { hat: 'stetsonBlack', arm: { sleeve: '#2c2a2e', w: 32 }, legs: { kind: 'trousers', c: '#3a3634' }, feet: 'cboots', boot: '#1e1a18',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; garment(ctx, B, c => { c.moveTo(-64 * nar, top + 8); c.quadraticCurveTo(-98 * nar, -120, -96 * nar, -30); c.lineTo(96 * nar, -30); c.quadraticCurveTo(98 * nar, -120, 64 * nar, top + 8); c.closePath(); }, '#3a3230', 'rgba(0,0,0,.35)'); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.1), '#d8cdb8', 'rgba(40,30,20,.25)'); if (B.back) return;
      garment(ctx, B, c => { c.moveTo(vx - 30, top - 2); c.lineTo(vx + 30, top - 2); c.lineTo(vx + 26, -118); c.lineTo(vx - 26, -118); c.closePath(); }, '#4a2e22', 'rgba(0,0,0,.3)');
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 22, top - 6); c.lineTo(sd * 66 * nar, top + 4); c.quadraticCurveTo(sd * 92 * nar, -100, sd * 90 * nar, -32); c.lineTo(sd * 54 * nar, -32); c.quadraticCurveTo(sd * 44, -150, vx + sd * 30, top + 40); c.closePath(); }, '#3a3230', 'rgba(0,0,0,.35)');
      gunbelt(ctx, B, -176, -1, '#2a1c14'); path(ctx, c => { c.moveTo(vx - 14, top + 2); c.lineTo(vx + 14, top + 2); c.lineTo(vx, top + 22); c.closePath(); }, '#1e1a18', 3); } };
  O.lawman = { hat: 'stetsonWhite', arm: { sleeve: '#f2ead8', w: 30 }, legs: { kind: 'trousers', c: '#5a4a3a' }, feet: 'cboots', boot: '#5a3420',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.12), '#f2ead8', 'rgba(60,50,30,.2)'); if (B.back) return; collar(ctx, B, '#f2ead8');
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 18, top - 4); c.lineTo(sd * 62 * nar, top + 6); c.lineTo(sd * 62 * nar, -118); c.lineTo(vx + sd * 10, -118); c.quadraticCurveTo(vx + sd * 6, -170, vx + sd * 18, top + 70); c.closePath(); }, '#8a5a32', 'rgba(0,0,0,.3)');
      ctx.save(); ctx.translate(-34 * nar, top + 70); path(ctx, c => { for (let k = 0; k < 10; k++) { const a = -PI / 2 + k * PI / 5, r = k % 2 ? 7 : 17; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); }, '#e2c25a', 3); ctx.restore();
      gunbelt(ctx, B, -176, 1, '#3a2418'); seg(ctx, [[vx - 10, top + 2], [vx + 10, top + 2]], 6, '#1e1a18'); } };
  O.director = { hat: 'hatShades', arm: { sleeve: '#f6f0e2', w: 30, cuff: '#f6f0e2' }, legs: { kind: 'jodhpurs', c: '#c8a878' }, feet: 'riding', boot: '#1e1a18',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.14), '#f6f0e2', 'rgba(60,50,40,.18)'); if (B.back) return; collar(ctx, B, '#f6f0e2');
      path(ctx, c => { c.moveTo(vx - 24, top + 2); c.quadraticCurveTo(vx, top + 26, vx + 24, top + 2); c.quadraticCurveTo(vx + 20, top + 48, vx + 4, top + 60); c.quadraticCurveTo(vx - 6, top + 44, vx - 24, top + 2); c.closePath(); }, '#c0392b', 3.5);
      for (const [dx, dy] of [[-8, 16], [6, 30], [-2, 44]]) path(ctx, c => c.arc(vx + dx, top + dy, 3, 0, TAU), '#f6d77a', 0);
      path(ctx, c => c.rect(-66 * nar, -188, 132 * nar, 12), '#3a2a20', 3); } };
  O.cook = { hat: 'bowler', arm: { short: true, sleeve: '#e8dcc0', w: 30 }, legs: { kind: 'trousers', c: '#5a5048' }, feet: 'cboots', boot: '#4a3020', spurs: false,
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.18), '#e8dcc0', 'rgba(60,50,30,.22)'); if (B.back) return;
      for (const sd of [-1, 1]) seg(ctx, [[sd * 34 * nar, top + 2], [sd * 30 * nar, -180]], 9, '#6b2a22');
      garment(ctx, B, c => { c.moveTo(-50 * nar, top + 70); c.lineTo(50 * nar, top + 70); c.lineTo(66 * nar, -40); c.quadraticCurveTo(0, -30, -66 * nar, -40); c.closePath(); }, '#efe8da', 'rgba(60,50,40,.2)',
        c2 => { for (const [x, y, r] of [[-20, -150, 14], [24, -110, 10], [-6, -80, 8], [30, -170, 7]]) { c2.fillStyle = 'rgba(140,100,60,.35)'; c2.beginPath(); c2.ellipse(x, y, r, r * .7, .3, 0, TAU); c2.fill(); } });
      seg(ctx, [[-50 * nar, top + 70], [-80 * nar, -200]], 3); seg(ctx, [[50 * nar, top + 70], [80 * nar, -200]], 3); collar(ctx, B, '#e8dcc0'); } };
  O.boss = { hat: 'stetsonGrey', arm: { sleeve: '#5a4232', w: 32 }, legs: { kind: 'chaps', c: '#5a5048', chap: '#5a3420' }, feet: 'cboots', boot: '#3a2418',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; garment(ctx, B, c => { c.moveTo(-62 * nar, top + 8); c.quadraticCurveTo(-88 * nar, -140, -86 * nar, -80); c.lineTo(86 * nar, -80); c.quadraticCurveTo(88 * nar, -140, 62 * nar, top + 8); c.closePath(); }, '#5a4232', 'rgba(0,0,0,.3)'); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.12), '#d8c8a8', 'rgba(60,40,20,.2)'); if (B.back) return;
      garment(ctx, B, c => { c.moveTo(vx - 28, top - 2); c.lineTo(vx + 28, top - 2); c.lineTo(vx + 26, -150); c.lineTo(vx - 26, -150); c.closePath(); }, '#7a2e26', 'rgba(0,0,0,.3)');
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 22, top - 6); c.lineTo(sd * 64 * nar, top + 4); c.quadraticCurveTo(sd * 82 * nar, -120, sd * 80 * nar, -80); c.lineTo(sd * 44 * nar, -80); c.quadraticCurveTo(sd * 36, -150, vx + sd * 28, top + 40); c.closePath(); }, '#5a4232', 'rgba(0,0,0,.3)');
      bandana(ctx, B, '#2a2a2a'); } };
  O.rancher = { hat: 'stetsonBlack', arm: { sleeve: '#2e2a28', w: 32, cuff: '#f2ead8' }, legs: { kind: 'trousers', c: '#3e3832' }, feet: 'cboots', boot: '#1e1a18', spurs: false,
    behind: O.boss.behind,
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.12), '#f2ead8', 'rgba(60,40,20,.2)'); if (B.back) return;
      garment(ctx, B, c => { c.moveTo(vx - 30, top - 2); c.lineTo(vx + 30, top - 2); c.lineTo(vx + 28, -150); c.lineTo(vx - 28, -150); c.closePath(); }, '#4a3a2e', 'rgba(0,0,0,.3)'); for (let i = 0; i < 4; i++) path(ctx, c => c.arc(vx, top + 50 + i * 24, 3.5, 0, TAU), '#c9a648', 1.5);
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 22, top - 6); c.lineTo(sd * 64 * nar, top + 4); c.quadraticCurveTo(sd * 82 * nar, -120, sd * 80 * nar, -60); c.lineTo(sd * 44 * nar, -60); c.quadraticCurveTo(sd * 36, -150, vx + sd * 28, top + 40); c.closePath(); }, '#2e2a28', 'rgba(0,0,0,.35)');
      seg(ctx, [[vx - 12, top + 2], [vx + 12, top + 2]], 7, '#1e1a18'); } };
  const fringeTorso = (col, o = {}) => function (ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -100, 1.16), col, 'rgba(60,30,10,.28)', c2 => { c2.strokeStyle = 'rgba(255,240,210,.2)'; c2.lineWidth = 2; for (let y = top + 10; y < -100; y += 26) { c2.beginPath(); c2.moveTo(-100, y); c2.lineTo(100, y + 6); c2.stroke(); } }); if (B.back) return;
    for (let i = 0; i < 14; i++) { const x = lerp(-62, 62, i / 13) * nar; seg(ctx, [[x, -104], [x + 2, -84]], 3.5, G.Guide.hexMul(col, .8)); }
    for (const sd of [-1, 1]) for (let i = 0; i < 6; i++) seg(ctx, [[vx + sd * (14 + i * 9), top + 40 + i * 6], [vx + sd * (16 + i * 9), top + 56 + i * 6]], 3, G.Guide.hexMul(col, .8));
    curve(ctx, [vx - 40, top + 30], [vx, top + 60], [vx + 40, top + 30], 3, 'rgba(60,30,10,.5)'); collar(ctx, B, col); if (o.bandana) bandana(ctx, B, o.bandana); buckle(ctx, B, -186, '#5a3420'); };
  O.buckskin = { hat: 'stetsonTan', arm: { sleeve: '#c49a64', w: 32 }, legs: { kind: 'chaps', c: '#5a4a3a', chap: '#a87a48', fringe: true }, feet: 'cboots', boot: '#5a3420', torso: fringeTorso('#c49a64', { bandana: '#c0392b' }) };
  O.teddy = { hat: 'teddy', arm: { sleeve: '#b8915e', w: 32 }, legs: { kind: 'trousers', c: '#5a4a3a' }, feet: 'cboots', boot: '#3a2418', spurs: false, torso: fringeTorso('#b8915e', { bandana: '#2a4a7a' }) };
  O.modern = { hat: 'stetsonWhite', arm: { sleeve: '#e8a03a', w: 30 }, legs: { kind: 'trousers', c: '#2e4a7a' }, feet: 'cboots', boot: '#7a3a22',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -112, 1.12), '#e8a03a', 'rgba(80,30,0,.25)', c2 => { c2.fillStyle = '#7a2a2a'; c2.fillRect(-120, top, 240, 30); }); if (B.back) return; collar(ctx, B, '#e8a03a');
      for (let i = 0; i < 5; i++) path(ctx, c => c.arc(vx, top + 30 + i * 26, 3.5, 0, TAU), '#fff', 1.5); buckle(ctx, B, -184, '#3a2418'); } };
  // mounted twins: legs come from Beasts.steed instead
  for (const k of Object.keys(O)) if (!k.includes('@')) O[k + '@ride'] = Object.assign({}, O[k], { legs: { kind: 'none', c: O[k].legs.c }, feet: 'none' });

  // ---------- hats ----------
  function stetson(col, band = '#3a2418', o = {}) {
    return { hideTufts: true,
      behind(ctx, hc) { const x = hc.hx * .5; path(ctx, c => c.ellipse(x, -64, o.w || 178, 30, o.tilt || 0, 0, TAU), G.Guide.hexMul(col, .8), 4); },
      draw(ctx, hc) { const x = hc.hx * .5, w = o.w || 178, tilt = o.tilt || 0;
        const crown = c => { c.moveTo(x - 82, -70); c.quadraticCurveTo(x - 92, -150, x - 66, -196); c.quadraticCurveTo(x - 30, -176, x, -186); c.quadraticCurveTo(x + 30, -176, x + 66, -196); c.quadraticCurveTo(x + 92, -150, x + 82, -70); c.closePath(); };
        garment(ctx, { shadeSide: 1 }, crown, col, 'rgba(0,0,0,.28)', c2 => { c2.fillStyle = band; c2.fillRect(x - 100, -104, 200, 22); c2.fillStyle = 'rgba(255,255,255,.14)'; c2.fillRect(x - 56, -190, 14, 120); if (o.stain) { c2.fillStyle = 'rgba(90,60,30,.35)'; c2.beginPath(); c2.ellipse(x - 20, -94, 70, 18, 0, 0, TAU); c2.fill(); } });
        curve(ctx, [x - 30, -176], [x, -150], [x + 30, -176], 3, 'rgba(0,0,0,.35)');
        ctx.save(); ctx.rotate(tilt); path(ctx, c => { c.ellipse(x, -64, w, 30, 0, 0, PI); c.quadraticCurveTo(x - w * .5, -40, x, -46); c.quadraticCurveTo(x + w * .5, -40, x + w, -64); }, col, 4);
        if (o.hole) path(ctx, c => c.ellipse(x + 40, -150, 9, 6, .3, 0, TAU), '#2a1a10', 2);
        ctx.restore(); if (o.glasses) glasses(ctx, hc, '#2a2a2a', 'rgba(200,230,255,.25)'); } };
  }
  function glasses(ctx, hc, frame, lens) { const x = hc.hx; for (const s of [-1, 1]) path(ctx, c => c.ellipse(x + s * 44, 10, 26, 22, 0, 0, TAU), lens, 4); seg(ctx, [[x - 18, 8], [x + 18, 8]], 4, frame); }
  H.stetson = stetson('#8a6a46');
  H.stetsonBlack = stetson('#2a2624', '#5a4a3a');
  H.stetsonWhite = stetson('#efe6d2', '#3a2418');
  H.stetsonGrey = stetson('#8a8478', '#2a2420');
  H.stetsonTan = stetson('#c8a46e', '#5a3420', { w: 196 });
  H.battered = stetson('#a88a5e', '#5a4026', { stain: true, hole: true, tilt: -.04 });
  H.teddy = stetson('#b89a6a', '#3a2418', { glasses: true });
  H.sombrero = { hideTufts: true,
    behind(ctx, hc) { const x = hc.hx * .5; path(ctx, c => c.ellipse(x, -60, 236, 40, 0, 0, TAU), '#a07a48', 4); },
    draw(ctx, hc) { const x = hc.hx * .5; garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 76, -66); c.quadraticCurveTo(x - 70, -190, x, -222); c.quadraticCurveTo(x + 70, -190, x + 76, -66); c.closePath(); }, '#b48a52', 'rgba(0,0,0,.25)', c2 => { c2.fillStyle = '#8a2a22'; c2.fillRect(x - 90, -110, 180, 18); c2.fillStyle = '#e0c070'; c2.fillRect(x - 90, -104, 180, 5); });
      path(ctx, c => { c.ellipse(x, -60, 236, 40, 0, 0, PI); c.quadraticCurveTo(x, -30, x + 236, -60); }, '#b48a52', 4); curve(ctx, [x - 200, -52], [x, -24], [x + 200, -52], 3, '#e0c070'); } };
  H.beret = { hideTufts: true, draw(ctx, hc) { const x = hc.hx * .4; path(ctx, c => c.ellipse(x + 26, -92, 124, 40, -.18, 0, TAU), '#2a2830', 4.5); path(ctx, c => c.arc(x + 30, -134, 8, 0, TAU), '#2a2830', 3); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.ellipse(x - 10, -110, 60, 12, -.18, 0, TAU); ctx.fill(); } };
  H.hatShades = { hideTufts: true, draw(ctx, hc) { H.beret.draw(ctx, hc); const x = hc.hx; for (const s of [-1, 1]) path(ctx, c => c.roundRect(x + s * 44 - 30, -8, 60, 36, 12), '#1e1e24', 4); seg(ctx, [[x - 14, 4], [x + 14, 4]], 4); ctx.fillStyle = 'rgba(255,255,255,.35)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + s * 44 - 10, 2, 9, 5, -.4, 0, TAU); ctx.fill(); } } };
  H.kepi = { hideTufts: true, draw(ctx, hc) { const x = hc.hx * .5; garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 92, -60); c.lineTo(x - 76, -150); c.lineTo(x + 70, -168); c.lineTo(x + 92, -60); c.closePath(); }, '#8f9294', 'rgba(0,0,0,.3)'); path(ctx, c => c.rect(x - 96, -84, 192, 22), '#6f7274', 3.5); path(ctx, c => { c.moveTo(x - 80, -64); c.quadraticCurveTo(x, -20, x + 90, -60); c.closePath(); }, '#2a2420', 4); } };
  H.bowler = { hideTufts: true, draw(ctx, hc) { const x = hc.hx * .5; path(ctx, c => c.ellipse(x, -70, 140, 22, 0, 0, TAU), '#4a3e34', 4); garment(ctx, { shadeSide: 1 }, c => { c.moveTo(x - 86, -72); c.quadraticCurveTo(x - 92, -190, x, -190); c.quadraticCurveTo(x + 92, -190, x + 86, -72); c.closePath(); }, '#5a4a3e', 'rgba(0,0,0,.3)', c2 => { c2.fillStyle = '#2a2420'; c2.fillRect(x - 100, -100, 200, 18); c2.fillStyle = 'rgba(180,150,110,.3)'; c2.beginPath(); c2.ellipse(x + 30, -150, 20, 12, 0, 0, TAU); c2.fill(); }); } };

  // ---------- props ----------
  PR.megaphone = { hand: 'hold', handDir: 0, over(ctx, a, sd) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 6, y - 26); ctx.rotate(-.35 * sd); path(ctx, c => { c.moveTo(0, -12); c.lineTo(110, -46); c.lineTo(110, 46); c.lineTo(0, 12); c.closePath(); }, '#e8e2d4', 4); path(ctx, c => c.ellipse(110, 0, 12, 46, 0, 0, TAU), '#c9c2b2', 4); seg(ctx, [[30, -20], [30, 20]], 3, '#c0392b'); ctx.restore(); } };
  PR.lasso = { side: 'L', hand: 'hold', over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x - 6, y + 10); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(0, 10 + k * 3, 42 - k * 2, 52 - k * 2, .1, 0, TAU); ctx.lineWidth = 9; ctx.strokeStyle = INK(); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#c9a868'; ctx.stroke(); } ctx.restore(); } };
  PR.ladle = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x, y + 6], [x + 8, y - 90]], 9); seg(ctx, [[x, y + 6], [x + 8, y - 90]], 5, '#9aa0a8'); path(ctx, c => c.ellipse(x + 10, y - 100, 22, 14, 0, 0, TAU), '#9aa0a8', 4); } };
  PR.coffee = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 26, y + 6); path(ctx, c => { c.moveTo(-22, -40); c.lineTo(22, -40); c.lineTo(30, 30); c.lineTo(-30, 30); c.closePath(); }, '#4a6a8a', 4); ctx.fillStyle = 'rgba(255,255,255,.4)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-20 + (i % 3) * 18, -24 + Math.floor(i / 3) * 30, 3, 0, TAU); ctx.fill(); } path(ctx, c => { c.moveTo(22, -26); c.lineTo(46, -46); c.lineTo(28, -6); }, null, 4); path(ctx, c => c.ellipse(0, -44, 20, 6, 0, 0, TAU), '#3a5a7a', 3); ctx.restore(); } };
  PR.plate = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 24, y - 4); path(ctx, c => c.ellipse(0, 0, 44, 14, 0, 0, TAU), '#9aa0a8', 4); ctx.fillStyle = '#8a3a22'; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.ellipse(-24 + (i % 6) * 9, -4 + Math.floor(i / 6) * 5, 5, 3.4, 0, 0, TAU); ctx.fill(); } ctx.restore(); } };
  PR.paper = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 30, y - 30); ctx.rotate(-.1); path(ctx, c => c.rect(-40, -54, 80, 100), '#f2ead8', 3.5); for (let i = 0; i < 6; i++) seg(ctx, [[-28, -36 + i * 14], [28, -36 + i * 14]], 2.5, 'rgba(0,0,0,.35)'); ctx.restore(); } };
  PR.newspaper = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 40, y - 40); ctx.rotate(-.06); path(ctx, c => c.rect(-70, -60, 140, 110), '#efe6d0', 3.5); path(ctx, c => c.rect(-60, -50, 120, 18), '#3a3430', 0); for (let i = 0; i < 6; i++) seg(ctx, [[-58, -20 + i * 12], [-6, -20 + i * 12]], 2.5, 'rgba(0,0,0,.35)'); path(ctx, c => c.rect(6, -24, 52, 52), '#c9bfa8', 2); ctx.restore(); } };
  PR.harmonica = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; path(ctx, c => c.roundRect(x - 4, y - 18, 56, 18, 4), '#c9ced6', 3.5); for (let i = 0; i < 6; i++) path(ctx, c => c.rect(x + 2 + i * 8, y - 12, 5, 6), '#2a2a2a', 0); } };
  PR.clapper = { hand: 'hold', handDir: 0, over(ctx, a, sd, o) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 30, y - 30); path(ctx, c => c.rect(-60, -30, 120, 80), '#1e1e22', 4); for (let i = 0; i < 3; i++) seg(ctx, [[-50, -10 + i * 18], [50, -10 + i * 18]], 2, 'rgba(255,255,255,.6)'); ctx.save(); ctx.translate(-60, -30); ctx.rotate(-(o.clap ?? .35)); path(ctx, c => c.rect(0, -20, 120, 20), '#f2f2f2', 4); for (let i = 0; i < 4; i++) path(ctx, c => { c.moveTo(10 + i * 28, -20); c.lineTo(24 + i * 28, -20); c.lineTo(14 + i * 28, 0); c.lineTo(0 + i * 28, 0); c.closePath(); }, '#1e1e22', 0); ctx.restore(); ctx.restore(); } };
  PR.cash = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 22, y - 12); for (let i = 0; i < 3; i++) path(ctx, c => c.roundRect(-24 + i * 4, -14 - i * 4, 52, 26, 3), '#8fb07a', 3); path(ctx, c => c.rect(-4, -26, 10, 30), '#c9a648', 2); ctx.restore(); } };
  PR.rope = PR.lasso;

  // ---------- the cast (spread into Guide.draw options) ----------
  G.CW = {
    theoCow:  { outfit: 'cowTheo', hat: 'stetson' },                                                     // Theo on the trail ("you, new guy")
    cowhand:  { outfit: 'cowhand', hat: 'battered', look: { skin: '#f4b694', hairCol: '#b8873e', width: .94 } },   // the 17-year-old extra
    gun1:     { outfit: 'gunslinger', look: { skin: '#e6b48e', hairCol: '#2a1a12', beard: 'moustache', brow: 1 } },
    gun2:     { outfit: 'lawman', look: { skin: '#f0c4a0', hairCol: '#8a5a30', chin: true } },
    director: { outfit: 'director', prop: 'megaphone', look: { skin: '#efc3a0', hairCol: '#3a2a20', beard: 'moustache', width: 1.06 } },
    cook:     { outfit: 'cook', prop: 'ladle', look: { skin: '#e8b08a', hair: 'bald', hairCol: '#c8c2b8', beard: 'full', beardCol: '#d8d2c8', nose: 'big', width: 1.1 } },
    boss:     { outfit: 'boss', look: { skin: '#e2aa82', hairCol: '#5a4030', beard: 'walrus', beardCol: '#6a5040' } },
    wrangler: { outfit: 'cowGreen', hat: 'stetsonTan', look: { skin: '#c88c62', hairCol: '#2a1a12' } },
    vaquero:  { outfit: 'vaquero', look: { skin: '#c88a5e', hairCol: '#1e1612', beard: 'moustache' } },
    vaquero2: { outfit: 'vaquero', look: { skin: '#b97a52', hairCol: '#1e1612' } },
    freed:    { outfit: 'cowCream', hat: 'stetsonGrey', look: { skin: '#7a4e34', hair: 'curly', hairCol: '#1a1410' } },
    freed2:   { outfit: 'cowBlue', look: { skin: '#5e3c28', hair: 'curly', hairCol: '#1a1410', beard: 'moustache' } },
    vet:      { outfit: 'veteran', look: { skin: '#f0c4a0', hairCol: '#a06a3a', beard: 'stubble' } },
    hand:     { outfit: 'cowRed', look: { skin: '#f2c8a4', hairCol: '#6b4226' } },
    gary:     { outfit: 'cowGreen', hat: 'stetsonGrey', look: { skin: '#f4caa8', hairCol: '#d0a050', nose: 'big' } },
    ikard:    { outfit: 'cowCream', hat: 'stetsonBlack', look: { skin: '#6a4430', hairCol: '#1a1410', beard: 'moustache', hair: 'curly' } },
    goodnight:{ outfit: 'rancher', look: { skin: '#e8b892', hairCol: '#e0dcd4', beard: 'full', beardCol: '#ece8e0', width: 1.08 } },
    natlove:  { outfit: 'buckskin', prop: 'lasso', look: { skin: '#734a30', hair: 'curly', hairCol: '#1a1410', beard: 'moustache' } },
    pickett:  { outfit: 'cowPickett', hat: 'stetsonBlack', look: { skin: '#5a3a26', hairCol: '#1a1410', beard: 'moustache' } },
    teddy:    { outfit: 'teddy', look: { skin: '#f0c4a0', hairCol: '#8a6a40', beard: 'moustache', chin: true } },
    rider1:   { outfit: 'modern', look: { skin: '#5e3c28', hair: 'long', hairCol: '#1a1410', lashes: true, lips: '#a8404a', earrings: true } },
    rider2:   { outfit: 'cowRed', hat: 'stetsonBlack', look: { skin: '#6e4630', hairCol: '#1a1410', beard: 'stubble' } },
  };
})(window);
