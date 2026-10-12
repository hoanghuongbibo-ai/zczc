/* THEO's wardrobe: era outfits + swappable headwear. Pick per scene from the script:
 *   Guide.draw(ctx, x, y, s, { outfit: 'roman', hat: 'galea' | 'none' | … })
 * Outfits: suit (guide.js), roman, medieval, edo, victorian, egypt, explorer — each with a default hat.
 * Hats: laurel, galea, hood, feltCap, kasa, topHat, flatCap, pith, nemes, crown.
 * Every piece is drawn in the same ink style with cloth shading + a pattern where the real garment has one
 * (Greek key hem, knit texture, seigaiha waves, tweed, pleated linen), so close-ups stay rich. */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment, lerp, clamp, LW } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, LEGS = Gd.LEGS, FEET = Gd.FEET;
  const PI = Math.PI, TAU = PI * 2;
  const clip = (ctx, shp, fn) => { ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip(); fn(); ctx.restore(); };
  const tube = (ctx, a, b, w, col) => { seg(ctx, [a, b], w + 10); seg(ctx, [a, b], w, col); };

  // ---------------- legs / feet kinds ----------------
  LEGS.hakama = (ctx, g, L) => {   // wide pleated trousers gathered at the ankle (Edo)
    const { sd, ank, nar } = g, x0 = sd * 4, x1 = sd * 64 * nar;
    const shp = c => { c.moveTo(x0, -214); c.lineTo(x1, -214); c.quadraticCurveTo(sd * 92 + (ank[0] - sd * 25) * .6, -110, ank[0] + sd * 26, -48); c.quadraticCurveTo(ank[0], -30, ank[0] - sd * 24, -46); c.quadraticCurveTo(sd * -2, -120, x0, -214); c.closePath(); };
    path(ctx, shp, L.c, LW); clip(ctx, shp, () => { ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(sd > 0 ? 40 : -140, -220, 100, 200); });
    for (const k of [.3, .62]) curve(ctx, [lerp(x0, x1, k), -206], [lerp(x0, x1, k) + sd * 10, -130], [ank[0] + sd * (k * 40 - 18), -54], 2.5, 'rgba(0,0,0,.35)');
    seg(ctx, [[ank[0] - sd * 22, -50], [ank[0] + sd * 24, -52]], 3, 'rgba(0,0,0,.4)');
  };
  LEGS.breeches = (ctx, g, L) => {   // puffy knee breeches + ribbed socks (Victorian boy)
    const { hip, ank } = g, knee = [lerp(hip[0], ank[0], .62), -86];
    tube(ctx, knee, ank, 24, L.sock); for (let y = -80; y > -150; y -= 9) { } // (socks only show below the knee)
    for (const dx of [-6, 0, 6]) seg(ctx, [[knee[0] + dx, knee[1] + 6], [ank[0] + dx, ank[1] - 18]], 1.8, 'rgba(0,0,0,.25)');
    seg(ctx, [hip, knee], 54); seg(ctx, [hip, knee], 44, L.c);
    for (let i = 0; i < 6; i++) { const y = lerp(hip[1], knee[1], i / 6 + .05); seg(ctx, [[hip[0] - 12, y], [hip[0] + 12, y + 4]], 1.4, 'rgba(255,255,255,.18)'); }
    tube(ctx, [knee[0] - 16, knee[1] + 2], [knee[0] + 16, knee[1] + 2], 8, L.band || '#3d342a');
  };
  FEET.boots = (ctx, g, OF) => {
    const { sd, ank, lift, toe } = g, col = OF.boot || '#5a3b24', fx = ank[0] + toe + sd * 5, fy = -14 - lift;
    tube(ctx, [ank[0], -26 - lift], [ank[0], -78 - lift], 30, col);
    path(ctx, c => c.ellipse(fx, fy, 31, 16, 0, 0, TAU), col, 4); seg(ctx, [[fx - 28, fy + 8], [fx + 28, fy + 8]], 5, '#2a1c12');
    for (let i = 0; i < 3; i++) { const y = -36 - i * 13 - lift; seg(ctx, [[ank[0] - 9, y], [ank[0] + 9, y - 7]], 2.2, '#e8d9b8'); seg(ctx, [[ank[0] + 9, y], [ank[0] - 9, y - 7]], 2.2, '#e8d9b8'); }
    tube(ctx, [ank[0] - 15, -78 - lift], [ank[0] + 15, -78 - lift], 6, '#3e2817');
    curve(ctx, [fx - 14, fy - 8], [fx, fy - 12], [fx + 12, fy - 8], 3, 'rgba(255,255,255,.25)');
  };
  FEET.sandals = (ctx, g) => {
    const { sd, ank, lift, toe } = g, fx = ank[0] + toe + sd * 5, fy = -12 - lift, strap = '#7a4a2a';
    path(ctx, c => c.ellipse(fx, fy, 28, 12, 0, 0, TAU), Gd.C.face, 4); seg(ctx, [[fx - 28, fy + 11], [fx + 28, fy + 11]], 6, '#5a3b24');
    for (const dx of [-10, 6]) seg(ctx, [[fx + dx, fy - 10], [fx + dx + 6, fy + 8]], 4, strap);
    for (let i = 0; i < 4; i++) { const y = -32 - i * 14 - lift; seg(ctx, [[ank[0] - 12, y + 3], [ank[0] + 12, y - 3]], 4.5, strap); }
    seg(ctx, [[ank[0] - 12, -32 - lift], [ank[0] - 12, -76 - lift]], 3, strap);
  };
  FEET.geta = (ctx, g) => {   // white tabi socks on raised wooden clogs
    const { sd, ank, lift, toe } = g, fx = ank[0] + toe + sd * 5, fy = -26 - lift;
    seg(ctx, [[ank[0], -40 - lift], [ank[0], fy]], 30); seg(ctx, [[ank[0], -40 - lift], [ank[0], fy]], 21, '#f7f4ee');
    path(ctx, c => c.ellipse(fx, fy, 27, 11, 0, 0, TAU), '#f7f4ee', 4);
    path(ctx, c => c.roundRect(fx - 30, fy + 8, 60, 8, 2), '#c79a5c', 3.5);
    for (const dx of [-18, 12]) path(ctx, c => c.rect(fx + dx - 4, fy + 16, 10, 9), '#a87a42', 3);
    seg(ctx, [[fx + sd * 8, fy + 4], [fx - 6, fy - 8], [fx - sd * 16, fy + 4]], 3.5, '#9b2f2a');
  };

  // ---------------- outfits ----------------
  const greekKey = (ctx, y, x0, x1, col) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.lineJoin = 'miter';
    for (let x = x0; x < x1; x += 16) { ctx.beginPath(); ctx.moveTo(x, y + 5); ctx.lineTo(x, y - 5); ctx.lineTo(x + 10, y - 5); ctx.lineTo(x + 10, y + 1); ctx.lineTo(x + 5, y + 1); ctx.lineTo(x + 5, y - 1); ctx.moveTo(x + 10, y + 5); ctx.lineTo(x + 16, y + 5); ctx.stroke(); } ctx.restore(); };

  O.roman = {
    hat: 'laurel', arm: { short: true, sleeve: '#f3ead6', w: 30, band: '#8a5a32', bracer: '#7a4a2a' }, legs: { kind: 'bare' }, feet: 'sandals', cape: '#b2342f',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B, sh = c => { c.moveTo(-58 * nar, top + 4); c.quadraticCurveTo(-118 * nar, -190, -116 * nar, -60); c.quadraticCurveTo(-80, -50, -40, -66); c.lineTo(40, -70); c.quadraticCurveTo(92 * nar, -100, 98 * nar, -150); c.quadraticCurveTo(84 * nar, top + 40, 58 * nar, top + 4); c.closePath(); };
      garment(ctx, B, sh, this.cape, 'rgba(40,0,0,.32)'); curve(ctx, [-96 * nar, -200], [-104 * nar, -120], [-98 * nar, -66], 3, 'rgba(0,0,0,.3)'); },
    torso(ctx, B) {
      const { top, nar, vx } = B, shp = bodyPath(B, -92, 1.22);
      garment(ctx, B, shp, '#f3ead6', 'rgba(120,90,40,.22)', ctx2 => {
        ctx2.fillStyle = '#8a5a32'; ctx2.fillRect(-120, -118, 240, 16); greekKey(ctx2, -110, -120, 120, '#f3ead6');
        for (const [a, b, c] of [[[vx + 44, top + 10], [vx + 6, top + 70], [vx - 40, top + 96]], [[vx + 54, top + 40], [vx + 10, top + 100], [vx - 46, top + 120]], [[-20, -190], [-14, -150], [-24, -110]], [[24, -190], [30, -150], [22, -112]]]) curve(ctx2, a, b, c, 2.6, 'rgba(120,90,40,.45)');
      });
      if (B.back) { this.capeBack(ctx, B); return; }
      // rope belt with a hanging knot
      const by = -214; seg(ctx, [[-68 * nar, by + 2], [vx, by + 6], [68 * nar, by + 2]], 14); seg(ctx, [[-68 * nar, by + 2], [vx, by + 6], [68 * nar, by + 2]], 8, '#c9a46a');
      for (let x = -60; x < 64; x += 9) seg(ctx, [[x * nar, by + 1], [x * nar + 5, by + 8]], 1.6, 'rgba(90,60,20,.6)');
      const kx = vx - 22; path(ctx, c => c.ellipse(kx, by + 6, 9, 8, 0, 0, TAU), '#c9a46a', 3.5);
      for (const [dx, len] of [[-4, 62], [6, 48]]) { seg(ctx, [[kx + dx, by + 12], [kx + dx * 1.8, by + 12 + len]], 9); seg(ctx, [[kx + dx, by + 12], [kx + dx * 1.8, by + 12 + len]], 5, '#c9a46a'); path(ctx, c => c.ellipse(kx + dx * 1.8, by + 16 + len, 5, 8, 0, 0, TAU), '#b48a4e', 2.5); }
    },
    capeBack(ctx, B) { const { top, nar } = B; garment(ctx, B, c => { c.moveTo(-60 * nar, top + 6); c.quadraticCurveTo(-90, -200, -84, -70); c.quadraticCurveTo(0, -56, 84, -70); c.quadraticCurveTo(90, -200, 60 * nar, top + 6); c.closePath(); }, this.cape, 'rgba(40,0,0,.32)');
      for (const x of [-40, 0, 40]) curve(ctx, [x * .6, top + 30], [x, -150], [x * 1.1, -76], 3, 'rgba(0,0,0,.28)'); },
    front(ctx, B) { if (B.back) return; const { top, nar, vx } = B;   // the cape's cowl around the neck + bronze brooch on the shoulder
      const cw = c => { c.moveTo(-66 * nar, top + 22); c.quadraticCurveTo(-44 * nar, top - 18, vx, top - 6); c.quadraticCurveTo(44 * nar, top - 18, 64 * nar, top + 18); c.quadraticCurveTo(40 * nar, top + 52, vx + 6, top + 40); c.quadraticCurveTo(-34 * nar, top + 54, -66 * nar, top + 22); c.closePath(); };
      garment(ctx, B, cw, this.cape, 'rgba(40,0,0,.3)'); curve(ctx, [-40 * nar, top + 26], [vx, top + 30], [40 * nar, top + 22], 3, 'rgba(0,0,0,.3)');
      path(ctx, c => c.arc(-50 * nar, top + 22, 12, 0, TAU), '#d4a43c', 3.5); path(ctx, c => c.arc(-50 * nar, top + 22, 5, 0, TAU), '#f2d27a', 2); },
  };

  O.medieval = {
    hat: null, arm: { sleeve: '#6f7a52', w: 28, bracer: '#5a3b24' }, legs: { kind: 'trousers', c: '#4a4038' }, feet: 'boots', boot: '#5a3b24',
    torso(ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -104, 1.16), '#6f7a52', 'rgba(20,30,10,.28)', c2 => {   // knit texture
        c2.strokeStyle = 'rgba(40,50,25,.35)'; c2.lineWidth = 1.6; for (let y = top; y < -100; y += 8) for (let x = -90 + ((y / 8) % 2) * 4; x < 90; x += 8) { c2.beginPath(); c2.moveTo(x, y); c2.lineTo(x + 2, y + 4); c2.stroke(); }
      });
      if (B.back) return;
      curve(ctx, [vx - 24, top - 2], [vx, top + 14], [vx + 24, top - 2], 4);
      seg(ctx, [[vx, top + 8], [vx, top + 46]], 3.5); for (let i = 0; i < 3; i++) { const y = top + 16 + i * 10; seg(ctx, [[vx - 7, y], [vx + 7, y + 6]], 2.2, '#d9c7a0'); seg(ctx, [[vx + 7, y], [vx - 7, y + 6]], 2.2, '#d9c7a0'); }
      // leather belt, brass buckle, hanging tail, pouch on the hip
      path(ctx, c => c.rect(-70 * nar, -206, 140 * nar, 17), '#5a3b24', 3.5);
      path(ctx, c => c.roundRect(vx - 22, -211, 22, 27, 4), null, 0); ctx.lineWidth = 9; ctx.strokeStyle = Gd.kit.INK; ctx.strokeRect(vx - 21, -210, 20, 25); ctx.lineWidth = 5; ctx.strokeStyle = '#d0a548'; ctx.strokeRect(vx - 21, -210, 20, 25);
      seg(ctx, [[vx - 11, -198], [vx + 4, -198]], 3);
      tube(ctx, [vx + 6, -190], [vx + 10, -146], 10, '#5a3b24');
      const px = 38 * nar + vx * .3; path(ctx, c => c.roundRect(px, -192, 38, 40, 8), '#7a5233', 3.5); path(ctx, c => { c.moveTo(px - 2, -192); c.lineTo(px + 40, -192); c.lineTo(px + 38, -170); c.quadraticCurveTo(px + 19, -162, px, -170); c.closePath(); }, '#62402a', 3.5); path(ctx, c => c.arc(px + 19, -170, 4, 0, TAU), '#d0a548', 2);
    },
  };

  O.edo = {
    hat: null, arm: { sleeve: '#3c5a86', w: 34, wide: true }, legs: { kind: 'hakama', c: '#8d9198' }, feet: 'geta',
    torso(ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -176, 1.26, 1.06), '#3c5a86', 'rgba(5,15,40,.3)', c2 => {   // seigaiha waves
        c2.strokeStyle = '#7393c4'; c2.lineWidth = 2;
        for (let r = 0, y = top - 6; y < -150; y += 15, r++) for (let x = -110 + (r % 2) * 16; x < 120; x += 32) for (const rad of [15, 10, 5]) { c2.beginPath(); c2.arc(x, y + 15, rad, PI, TAU); c2.stroke(); }
      });
      if (B.back) { path(ctx, c => c.rect(-72 * nar, -250, 144 * nar, 44), '#cbb07a', 3.5); path(ctx, c => c.roundRect(-30, -262, 60, 66, 10), '#bfa169', 3.5); return; }
      // collars: white under-collar, then the dark kimono collar crossing left-over-right (reads as a "y")
      tube(ctx, [vx - 24, top - 4], [vx + 2, top + 54], 8, '#f4f1ea');
      tube(ctx, [vx + 26, top - 4], [vx - 30, top + 112], 12, '#22324d');
      tube(ctx, [vx - 24, top - 4], [vx - 2, top + 44], 7, '#22324d');
      // wide obi + cord
      path(ctx, c => c.rect(-72 * nar, -250, 144 * nar, 44), '#cbb07a', 3.5);
      ctx.save(); ctx.globalAlpha = .25; for (let x = -66; x < 70; x += 12) seg(ctx, [[x * nar, -246], [x * nar + 6, -212]], 2, '#7a5f2e'); ctx.restore();
      seg(ctx, [[-72 * nar, -228], [72 * nar, -228]], 8); seg(ctx, [[-72 * nar, -228], [72 * nar, -228]], 4, '#9b2f2a');
      path(ctx, c => c.ellipse(vx + 10, -228, 9, 7, 0, 0, TAU), '#9b2f2a', 3);
    },
  };

  O.victorian = {
    hat: 'flatCap', arm: { sleeve: '#f4f1ea', w: 32, cuff: '#f4f1ea' }, legs: { kind: 'breeches', c: '#6b6052', sock: '#9a958c' }, feet: 'boots', boot: '#3e2a1c',
    torso(ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -150, 1.02), '#f4f1ea', 'rgba(60,50,40,.16)', c2 => { for (const x of [-40, 30]) curve(c2, [x, top + 40], [x + 6, -230], [x - 4, -160], 2, 'rgba(0,0,0,.18)'); });
      if (B.back) { garment(ctx, B, c => { c.moveTo(-54 * nar, top + 10); c.lineTo(54 * nar, top + 10); c.quadraticCurveTo(60 * nar, -220, 58 * nar, -152); c.quadraticCurveTo(0, -140, -58 * nar, -152); c.quadraticCurveTo(-60 * nar, -220, -54 * nar, top + 10); c.closePath(); }, '#5d5348', 'rgba(0,0,0,.25)'); return; }
      const vest = c => { c.moveTo(vx - 20, top + 4); c.lineTo(-52 * nar, top + 8); c.quadraticCurveTo(-62 * nar, -220, -58 * nar, -160); c.lineTo(vx - 6, -144); c.lineTo(vx, -152); c.lineTo(vx + 6, -144); c.lineTo(58 * nar, -160); c.quadraticCurveTo(62 * nar, -220, 52 * nar, top + 8); c.lineTo(vx + 20, top + 4); c.lineTo(vx, top + 70); c.closePath(); };
      garment(ctx, B, vest, '#4a3426', 'rgba(0,0,0,.3)', c2 => { c2.strokeStyle = 'rgba(255,230,200,.08)'; c2.lineWidth = 3; for (let x = -70; x < 80; x += 7) { c2.beginPath(); c2.moveTo(x, top); c2.lineTo(x, -140); c2.stroke(); } });
      seg(ctx, [[vx, top + 70], [vx, -150]], 3);
      for (let i = 0; i < 5; i++) path(ctx, c => c.arc(vx + 7, top + 84 + i * 19, 4.5, 0, TAU), '#d0a548', 2.5);
      for (const sd of [-1, 1]) seg(ctx, [[vx + sd * 22, -192], [vx + sd * 44, -194]], 3.5);
      curve(ctx, [vx + 9, top + 122], [vx + 26, top + 140], [vx + 40, -194], 2.5, '#d9b14e');   // watch chain
      // stand collar + cravat
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 4, top - 8); c.lineTo(vx + sd * 24, top - 10); c.lineTo(vx + sd * 20, top + 10); c.closePath(); }, '#fff', 3.5);
      path(ctx, c => c.ellipse(vx, top + 12, 9, 8, 0, 0, TAU), '#55667c', 3.5);
      path(ctx, c => { c.moveTo(vx - 6, top + 18); c.lineTo(vx + 6, top + 18); c.lineTo(vx + 14, top + 52); c.lineTo(vx, top + 60); c.lineTo(vx - 14, top + 52); c.closePath(); }, '#55667c', 3.5);
    },
  };

  O.egypt = {
    hat: 'nemes', arm: { bare: true, armlet: '#d9a93a' }, legs: { kind: 'bare' }, feet: 'sandals',
    torso(ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -186, .96), Gd.C.face, 'rgba(60,50,80,.12)');
      if (!B.back) {
        curve(ctx, [vx - 34, top + 64], [vx - 16, top + 76], [vx - 2, top + 66], 2.5, 'rgba(0,0,0,.3)'); curve(ctx, [vx + 34, top + 64], [vx + 16, top + 76], [vx + 2, top + 66], 2.5, 'rgba(0,0,0,.3)');
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.arc(vx, -214, 2.5, 0, TAU); ctx.fill();
        // broad collar (wesekh): gold, turquoise, red and lapis rows of beads
        const cx = vx * .5, cy = top - 14, rows = ['#d9a93a', '#2fa39b', '#b8432f', '#2f4f9a', '#d9a93a'];
        ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(cx, cy, 58, .1 * PI, .9 * PI); ctx.lineWidth = 64; ctx.strokeStyle = Gd.kit.INK; ctx.stroke();
        rows.forEach((col, i) => { ctx.beginPath(); ctx.arc(cx, cy, 32 + i * 12.5, .11 * PI, .89 * PI); ctx.lineWidth = 10.5; ctx.strokeStyle = col; ctx.stroke(); });
        ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let a = .14; a < .88; a += .045) { ctx.beginPath(); ctx.arc(cx + Math.cos(a * PI) * 82, cy + Math.sin(a * PI) * 82, 2.4, 0, TAU); ctx.fill(); }
        ctx.lineCap = 'round';
      }
    },
    legsOver(ctx, B) {   // pleated linen kilt (shendyt) over the legs, with a front tab and belt
      const { nar, vx } = B, k = c => { c.moveTo(-66 * nar, -200); c.lineTo(66 * nar, -200); c.lineTo(80 * nar, -98); c.quadraticCurveTo(0, -88, -80 * nar, -98); c.closePath(); };
      garment(ctx, B, k, '#f6f1e3', 'rgba(90,80,50,.2)', c2 => { c2.strokeStyle = 'rgba(120,100,60,.35)'; c2.lineWidth = 1.8; for (let x = -80; x < 84; x += 9) { c2.beginPath(); c2.moveTo(x * .82, -196); c2.lineTo(x, -92); c2.stroke(); } });
      if (!B.back) path(ctx, c => { c.moveTo(vx - 18, -196); c.lineTo(vx + 18, -196); c.lineTo(vx + 24, -112); c.quadraticCurveTo(vx, -100, vx - 24, -112); c.closePath(); }, '#efe6cc', 3.5);
      path(ctx, c => c.rect(-68 * nar, -206, 136 * nar, 14), '#d9a93a', 3.5);
    },
  };

  O.explorer = {
    hat: 'pith', arm: { sleeve: '#cdb47c', w: 28, roll: true, rollC: '#bea36a' }, legs: { kind: 'trousers', c: '#a68e5a' }, feet: 'boots', boot: '#6a4426',
    torso(ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -150, 1.02), '#cdb47c', 'rgba(70,50,10,.25)');
      if (B.back) return;
      path(ctx, c => { c.moveTo(vx - 18, top - 4); c.lineTo(vx + 18, top - 4); c.lineTo(vx, top + 34); c.closePath(); }, Gd.C.face, 3.5);
      for (const sd of [-1, 1]) path(ctx, c => { c.moveTo(vx + sd * 8, top - 8); c.lineTo(vx + sd * 34, top - 6); c.lineTo(vx + sd * 22, top + 26); c.closePath(); }, '#bea36a', 3.5);
      seg(ctx, [[vx, top + 34], [vx, -160]], 3); for (let i = 0; i < 4; i++) path(ctx, c => c.arc(vx + 5, top + 50 + i * 26, 3.5, 0, TAU), '#8a7448', 2);
      for (const sd of [-1, 1]) { const px = vx + sd * 34; path(ctx, c => c.roundRect(px - 15, top + 52, 30, 32, 3), '#c4aa70', 3); path(ctx, c => { c.moveTo(px - 17, top + 50); c.lineTo(px + 17, top + 50); c.lineTo(px + 15, top + 62); c.lineTo(px - 15, top + 62); c.closePath(); }, '#b39a60', 3); }
      path(ctx, c => c.rect(-68 * nar, -168, 136 * nar, 15), '#5a3b24', 3.5); ctx.lineWidth = 8; ctx.strokeStyle = Gd.kit.INK; ctx.strokeRect(vx - 10, -171, 20, 21); ctx.lineWidth = 4.5; ctx.strokeStyle = '#c9c2b0'; ctx.strokeRect(vx - 10, -171, 20, 21);
    },
  };


  O.toga = {   // Roman citizen / senator: tunic with the broad purple stripes + a white wool toga over the left shoulder
    hat: null, arm: { short: true, sleeve: '#f1ece0', w: 32 }, legs: { kind: 'bare' }, feet: 'sandals',
    torso(ctx, B) {
      const { top, nar, vx } = B, P = '#6b3a8e';
      garment(ctx, B, bodyPath(B, -96, 1.2), '#f1ece0', 'rgba(110,90,60,.2)', c2 => { for (const sd of [-1, 1]) { c2.fillStyle = P; c2.fillRect(vx + sd * 30 - 8, top, 16, 260); } });
      const drape = c => { c.moveTo(-72 * nar, -150); c.quadraticCurveTo(-10, -190, vx + 26, top + 2); c.quadraticCurveTo(64 * nar, top - 8, 70 * nar, top + 24); c.quadraticCurveTo(84 * nar, -150, 80 * nar, -84); c.quadraticCurveTo(20, -70, -50 * nar, -118); c.closePath(); };
      garment(ctx, B, drape, '#f8f4ea', 'rgba(110,90,60,.22)', c2 => { for (let k = 0; k < 5; k++) curve(c2, [-50 + k * 22, -130 + k * 4], [k * 22, -190 - k * 18], [vx + 40 + k * 8, top + 30 + k * 26], 2.6, 'rgba(120,100,70,.45)'); });
      if (B.back) return;
      curve(ctx, [-72 * nar, -146], [-10, -184], [vx + 26, top + 6], 9, P);                         // purple border along the toga's edge
      for (const dy of [0, 9]) curve(ctx, [-44, -176 + dy], [-22, -158 + dy], [0, -176 + dy], 2.5, 'rgba(120,100,70,.55)');   // the umbo: folds bunched at the waist
      curve(ctx, [vx - 22, top - 2], [vx, top + 12], [vx + 20, top - 2], 4);
    },
  };

  // ---------------- hats (head-local: skull centre 0,0, R 100; hc = { yaw, hx, back, t, sx }) ----------------
  H.laurel = { draw(ctx, hc) {   // a wreath of paired leaves around the brow
    for (let i = -7; i <= 7; i++) {
      const phi = i * .2, v = hc.back ? 1 : Math.cos(phi + hc.yaw); if (v < -.05) continue;
      const x = hc.back ? -i * 13 : 104 * Math.sin(clamp(phi + hc.yaw, -PI / 2, PI / 2)), y = -50 + Math.abs(i) * 4.4, a = (i < 0 ? 1 : -1) * (.9 - Math.abs(i) * .05);
      for (const s of [-1, 1]) { ctx.save(); ctx.translate(x, y + s * 5); ctx.rotate(a + s * .45 - PI / 2); path(ctx, c => c.ellipse(0, -9, 6.5, 13, 0, 0, TAU), s > 0 ? '#5f8f3a' : '#79ab4c', 2.6); ctx.restore(); }
    }
  } };
  H.galea = { hideTufts: true, draw(ctx, hc) {   // Roman soldier's helmet: bronze bowl, brow band, cheek guards, red crest
    const { hx, yaw } = hc, cw = 16 + Math.abs(Math.sin(yaw)) * 74;
    path(ctx, c => { c.moveTo(hx - cw, -104); c.quadraticCurveTo(hx - cw * .4, -168, hx + cw * .2, -164); c.quadraticCurveTo(hx + cw, -160, hx + cw, -104); c.closePath(); }, '#b8322c', 4);
    ctx.save(); ctx.globalAlpha = .35; for (let k = -.8; k <= .8; k += .2) seg(ctx, [[hx + k * cw, -108], [hx + k * cw * .9, -152]], 2, '#000'); ctx.restore();
    for (const s of [-1, 1]) path(ctx, c => { c.moveTo(s * 96, -20); c.quadraticCurveTo(s * 108, 30, s * 84, 58); c.lineTo(s * 70, 40); c.quadraticCurveTo(s * 80, 10, s * 76, -20); c.closePath(); }, '#c38f3c', 4);
    path(ctx, c => { c.ellipse(hx, -16, 112, 104, 0, PI * .98, PI * 2.02); c.closePath(); }, '#c99a46', LW);
    ctx.save(); ctx.beginPath(); ctx.ellipse(hx, -16, 112, 104, 0, PI * .98, PI * 2.02); ctx.clip(); ctx.fillStyle = 'rgba(255,240,190,.4)'; ctx.beginPath(); ctx.ellipse(hx - 40, -80, 30, 18, -.5, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(80,40,0,.25)'; ctx.beginPath(); ctx.ellipse(hx + 120, -40, 60, 120, 0, 0, TAU); ctx.fill(); ctx.restore();
    path(ctx, c => c.roundRect(-112, -38, 224, 18, 8), '#a8792f', 4);
  } };
  H.hood = { under: true, hideTufts: true, draw(ctx, hc) {   // medieval hood with a shoulder cape and a face opening
    const fx = Math.sin(hc.yaw) * 30, col = '#6b5139';
    const shp = c => { c.moveTo(-122, 20); c.bezierCurveTo(-130, -110, -40, -132, 0, -128); c.bezierCurveTo(60, -130, 132, -100, 122, 20); c.lineTo(132, 120); c.lineTo(-132, 120); c.closePath(); c.moveTo(fx + 80, 14); c.ellipse(fx, 14, 80, 82, 0, 0, TAU, true); };
    ctx.beginPath(); shp(ctx); ctx.fillStyle = col; ctx.fill('evenodd'); ctx.lineWidth = LW; ctx.strokeStyle = Gd.kit.INK; ctx.stroke();
    ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip('evenodd'); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(fx, 10, 98, 100, 0, 0, TAU); ctx.ellipse(fx, 14, 80, 82, 0, 0, TAU, true); ctx.fill('evenodd'); ctx.restore();
    for (const s of [-1, 1]) curve(ctx, [s * 104, -30], [s * 116, 40], [s * 110, 112], 3, 'rgba(0,0,0,.3)');
  } };
  H.feltCap = { hideTufts: true, draw(ctx, hc) {   // soft medieval cap with an upturned brim and a feather
    const { hx } = hc;
    curve(ctx, [hx + 50, -88], [hx + 120, -150], [hx + 150, -200], 12); curve(ctx, [hx + 50, -88], [hx + 120, -150], [hx + 150, -200], 7, '#b8322c');
    path(ctx, c => { c.moveTo(-108, -46); c.quadraticCurveTo(-100, -150, hx + 10, -142); c.quadraticCurveTo(110, -136, 112, -46); c.closePath(); }, '#4f6b45', LW);
    path(ctx, c => { c.moveTo(-114, -40); c.quadraticCurveTo(0, -70, 116, -40); c.lineTo(122, -62); c.quadraticCurveTo(0, -90, -120, -60); c.closePath(); }, '#3f5937', 4);
  } };
  H.kasa = { hideTufts: true, draw(ctx, hc) {   // conical straw hat with weave lines and a chin cord
    const ax = Math.sin(hc.yaw) * 20;
    for (const s of [-1, 1]) curve(ctx, [s * 80, -44], [s * 70, 40], [s * 20, 96], 2.5, '#5a3b24');
    path(ctx, c => c.ellipse(0, -46, 176, 24, 0, 0, PI), '#a8813f', 4);
    const cone = c => { c.moveTo(-176, -46); c.lineTo(ax, -164); c.lineTo(176, -46); c.ellipse(0, -46, 176, 24, 0, 0, PI); c.closePath(); };
    garment(ctx, { shadeSide: 1 }, cone, '#d9b56a', 'rgba(110,70,10,.25)', c2 => { c2.strokeStyle = 'rgba(120,80,20,.5)'; c2.lineWidth = 1.8; for (let k = -1; k <= 1.001; k += .125) { c2.beginPath(); c2.moveTo(ax, -164); c2.lineTo(k * 176, -46 + (1 - k * k) * 24); c2.stroke(); } for (const f of [.35, .65]) { c2.beginPath(); c2.ellipse(lerp(ax, 0, f), lerp(-164, -46, f), 176 * f, 24 * f, 0, 0, PI); c2.stroke(); } });
  } };
  H.topHat = { hideTufts: true, draw(ctx, hc) {
    const x = hc.hx * .4;
    path(ctx, c => c.ellipse(x, -82, 122, 22, 0, 0, TAU), '#1e1e22', 4);
    const crown = c => { c.moveTo(x - 68, -84); c.lineTo(x - 76, -238); c.quadraticCurveTo(x, -252, x + 76, -238); c.lineTo(x + 68, -84); c.quadraticCurveTo(x, -72, x - 68, -84); c.closePath(); };
    garment(ctx, { shadeSide: 1 }, crown, '#24242a', 'rgba(0,0,0,.4)', c2 => { c2.fillStyle = '#7a1f1f'; c2.fillRect(x - 90, -116, 180, 24); c2.fillStyle = 'rgba(255,255,255,.12)'; c2.fillRect(x - 46, -240, 12, 160); });
    path(ctx, c => c.ellipse(x, -238, 76, 13, 0, 0, TAU), '#2c2c33', 4);
  } };
  H.flatCap = { hideTufts: true, draw(ctx, hc) {   // tweed newsboy cap with a short peak
    const { hx, yaw } = hc, px = Math.sin(yaw) * 40;
    const crown = c => { c.moveTo(-110, -44); c.quadraticCurveTo(-118, -124, hx - 10, -132); c.quadraticCurveTo(116, -132, 114, -44); c.closePath(); };
    garment(ctx, { shadeSide: 1 }, crown, '#7b6d5a', 'rgba(0,0,0,.25)', c2 => { c2.fillStyle = 'rgba(255,240,220,.16)'; for (let y = -134; y < -40; y += 7) for (let x = -120 + (y % 2) * 3; x < 120; x += 7) c2.fillRect(x, y, 2.5, 2.5); });
    path(ctx, c => c.arc(hx - 4, -128, 7, 0, TAU), '#6a5d4c', 3);
    path(ctx, c => { c.moveTo(px - 92, -50); c.quadraticCurveTo(px, -70, px + 92, -50); c.quadraticCurveTo(px + 70, -22, px, -22); c.quadraticCurveTo(px - 70, -22, px - 92, -50); c.closePath(); }, '#685b4a', 4);
  } };
  H.pith = { hideTufts: true, draw(ctx, hc) {   // explorer's pith helmet: brim all round, dome, band
    const { hx } = hc;
    path(ctx, c => c.ellipse(0, -52, 146, 30, 0, PI, TAU), '#d9cda8', 4);
    const dome = c => { c.ellipse(hx * .6, -56, 104, 92, 0, PI, TAU); c.closePath(); };
    garment(ctx, { shadeSide: 1 }, dome, '#ebe1c4', 'rgba(90,70,20,.22)', c2 => { c2.strokeStyle = 'rgba(120,100,60,.4)'; c2.lineWidth = 2; for (const k of [-.5, 0, .5]) { c2.beginPath(); c2.moveTo(hx * .6 + k * 100, -60); c2.quadraticCurveTo(hx * .6 + k * 60, -130, hx * .6, -146); c2.stroke(); } });
    path(ctx, c => c.rect(-104 + hx * .6, -78, 208, 20), '#8a7653', 3.5);
    path(ctx, c => c.ellipse(0, -52, 146, 30, 0, 0, PI), '#e2d6b2', 4);
    path(ctx, c => c.arc(hx * .6, -152, 8, PI, TAU), '#ebe1c4', 3);
  } };
  H.nemes = { under: true, hideTufts: true, draw(ctx, hc) {   // striped royal headcloth with lappets + gold brow band + uraeus
    const fx = Math.sin(hc.yaw) * 26;
    const shp = c => { c.moveTo(fx - 84, -30); c.quadraticCurveTo(fx - 90, -48, fx - 70, -56); c.quadraticCurveTo(fx, -66, fx + 70, -56); c.quadraticCurveTo(fx + 90, -48, fx + 84, -30); c.lineTo(fx + 86, 60); c.lineTo(fx + 78, 150); c.lineTo(fx + 128, 150); c.lineTo(136, 30);
      c.bezierCurveTo(140, -100, 60, -130, 0, -128); c.bezierCurveTo(-60, -130, -140, -100, -136, 30); c.lineTo(fx - 128, 150); c.lineTo(fx - 78, 150); c.lineTo(fx - 86, 60); c.closePath(); };
    garment(ctx, { shadeSide: 1 }, shp, '#d9a93a', 'rgba(60,30,0,.2)', c2 => { c2.fillStyle = '#2f4f9a'; for (let y = -130; y < 160; y += 18) c2.fillRect(-160, y, 320, 9); });
    path(ctx, c => c.roundRect(fx - 92, -56, 184, 16, 6), '#e7bf55', 3.5);
    path(ctx, c => { c.moveTo(fx - 6, -54); c.quadraticCurveTo(fx - 12, -80, fx, -86); c.quadraticCurveTo(fx + 12, -80, fx + 6, -54); c.closePath(); }, '#e7bf55', 3);
  } };
  H.crown = { hideTufts: true, draw(ctx, hc) {
    const x = hc.hx * .5, pts = [-80, -40, 0, 40, 80];
    const shp = c => { c.moveTo(x - 86, -50); c.lineTo(x - 90, -96); pts.forEach((p, i) => { c.lineTo(x + p, -128 - (i === 2 ? 18 : 0)); if (i < 4) c.lineTo(x + p + 20, -98); }); c.lineTo(x + 90, -96); c.lineTo(x + 86, -50); c.quadraticCurveTo(x, -62, x - 86, -50); c.closePath(); };
    garment(ctx, { shadeSide: 1 }, shp, '#e3b440', 'rgba(110,60,0,.28)');
    pts.forEach((p, i) => path(ctx, c => c.arc(x + p, -132 - (i === 2 ? 18 : 0), 7, 0, TAU), '#f2d27a', 3));
    [['#c0392b', 0], ['#2f6fb0', -46], ['#2f6fb0', 46]].forEach(([col, dx]) => path(ctx, c => c.ellipse(x + dx, -74, 9, 11, 0, 0, TAU), col, 3));
  } };
})(window);
