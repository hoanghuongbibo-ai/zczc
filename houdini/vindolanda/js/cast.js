/* Vindolanda cast + costumes (c. AD 90–105, northern frontier), built on Guide + wardrobe kit.
 * Outfits: auxiliary (Tungrian infantry: mail shirt over a red tunic, focale scarf, belt with studded apron, wool
 * trousers, boots, cloak), decurion (cavalry officer: mail, blue scarf, red cloak, plumed helmet), prefect (equestrian
 * commander: tunic with the narrow purple stripes, red cloak, gilded belt), clerk, stola (officers' wives: long dress
 * + palla), briton (checked tunic + trousers, cloak, torc), servant (enslaved household worker: plain tunic),
 * dig73 (1973 excavation: anorak, jeans, wellies).
 * Hats: auxHelmet, cavHelmet, wool cap. Props: tablet, spear, shield, lamp, stylus, trowel, jug, parcel, cup. */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment, lerp } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, PR = Gd.PROPS, LW = 5, TAU = Math.PI * 2, PI = Math.PI;
  const INK = () => Gd.kit.INK;
  const clip = (ctx, shp, fn) => { ctx.save(); ctx.beginPath(); shp(ctx); ctx.clip(); fn(); ctx.restore(); };
  const tube = (ctx, a, b, w, col) => { seg(ctx, [a, b], w + 10); seg(ctx, [a, b], w, col); };
  const mailPattern = (c2, top, bot, col = 'rgba(40,44,52,.45)') => { c2.strokeStyle = col; c2.lineWidth = 1.6; for (let y = top, r = 0; y < bot; y += 6, r++) for (let x = -120 + (r % 2) * 4; x < 120; x += 8) { c2.beginPath(); c2.arc(x, y, 3.2, 0, PI); c2.stroke(); } };
  const cloakBehind = (col, len = -60) => function (ctx, B) { if (B.back) return; const { top, nar } = B; garment(ctx, B, c => { c.moveTo(-60 * nar, top + 6); c.quadraticCurveTo(-108 * nar, -180, -100 * nar, len); c.quadraticCurveTo(0, len + 16, 100 * nar, len); c.quadraticCurveTo(108 * nar, -180, 60 * nar, top + 6); c.closePath(); }, col, 'rgba(30,0,0,.3)'); for (const x of [-70, 70]) curve(ctx, [x * .8 * nar, top + 40], [x * nar, -160], [x * .95 * nar, len + 10], 3, 'rgba(0,0,0,.25)'); };

  // ---- Tungrian auxiliary (Theo's "you" kit and the rank-and-file) ----
  function belt(ctx, B, y = -186) { const { nar, vx } = B; path(ctx, c => c.rect(-66 * nar, y, 132 * nar, 15), '#6b4428', 3.5); for (let x = -56; x <= 56; x += 14) path(ctx, c => c.rect(x * nar - 4, y + 3, 8, 9), '#d0a548', 1.8);
    for (const dx of [-14, 0, 14]) { tube(ctx, [vx + dx, y + 15], [vx + dx, y + 78], 6, '#6b4428'); for (let k = 0; k < 3; k++) path(ctx, c => c.arc(vx + dx, y + 30 + k * 18, 3.6, 0, TAU), '#d0a548', 1.5); path(ctx, c => c.ellipse(vx + dx, y + 84, 4, 6, 0, 0, TAU), '#d0a548', 1.5); } }
  function mailTorso(tunic, scarf) {
    return function (ctx, B) {
      const { top, nar, vx } = B;
      garment(ctx, B, bodyPath(B, -100, 1.18), tunic, 'rgba(40,0,0,.25)');                      // tunic hem showing below the mail
      garment(ctx, B, bodyPath(B, -122, 1.14), '#8f96a1', 'rgba(20,24,40,.35)', c2 => { mailPattern(c2, top - 6, -118); c2.fillStyle = 'rgba(255,255,255,.18)'; c2.fillRect(-90, top, 60, 200); });
      if (B.back) return;
      for (const sd of [-1, 1]) garment(ctx, B, c => { c.moveTo(vx + sd * 20, top - 2); c.quadraticCurveTo(sd * 70 * nar, top - 4, sd * 70 * nar, top + 34); c.lineTo(sd * 40 * nar, top + 40); c.quadraticCurveTo(sd * 30, top + 14, vx + sd * 12, top + 10); c.closePath(); }, '#9aa1ac', 'rgba(20,24,40,.3)', c2 => mailPattern(c2, top - 6, top + 44));
      path(ctx, c => { c.moveTo(vx - 30, top - 6); c.quadraticCurveTo(vx, top + 20, vx + 30, top - 6); c.quadraticCurveTo(vx + 24, top + 24, vx, top + 30); c.quadraticCurveTo(vx - 24, top + 24, vx - 30, top - 6); c.closePath(); }, scarf, 3.5);
      curve(ctx, [vx - 16, top + 6], [vx, top + 18], [vx + 14, top + 6], 2.5, 'rgba(0,0,0,.25)');
      belt(ctx, B);
    };
  }
  O.auxiliary = { hat: 'auxHelmet', arm: { short: true, sleeve: '#9aa1ac', w: 32, band: '#a8392f' }, legs: { kind: 'trousers', c: '#7a5a3c' }, feet: 'boots', boot: '#5a3a22',
    behind: cloakBehind('#6d6a3e', -70), torso: mailTorso('#a8392f', '#d9c9a0'),
    front(ctx, B) { if (B.back) return; path(ctx, c => c.arc(58 * B.nar, B.top + 22, 9, 0, TAU), '#d0a548', 3); } };
  O.decurion = { hat: 'cavHelmet', arm: { short: true, sleeve: '#9aa1ac', w: 32, band: '#2f5f9a' }, legs: { kind: 'trousers', c: '#5a4a3a' }, feet: 'boots', boot: '#4a2e1c',
    behind: cloakBehind('#b2342f', -50), torso: mailTorso('#e8dcc2', '#2f5f9a'),
    front(ctx, B) { if (B.back) return; path(ctx, c => c.arc(58 * B.nar, B.top + 22, 10, 0, TAU), '#e7bf55', 3); path(ctx, c => c.arc(58 * B.nar, B.top + 22, 4, 0, TAU), '#b2342f', 2); } };
  O.prefect = { hat: null, arm: { short: true, sleeve: '#f2ead8', w: 32 }, legs: { kind: 'trousers', c: '#6b5a48' }, feet: 'boots', boot: '#3e2a1c',
    behind: cloakBehind('#b2342f', -40),
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -100, 1.15), '#f2ead8', 'rgba(90,70,40,.2)', c2 => { for (const sd of [-1, 1]) { c2.fillStyle = '#6b3a8e'; c2.fillRect(vx + sd * 26 - 4, top, 8, 240); } });
      if (B.back) return; curve(ctx, [vx - 24, top - 2], [vx, top + 14], [vx + 24, top - 2], 4);
      path(ctx, c => c.rect(-66 * nar, -192, 132 * nar, 16), '#5a3a22', 3.5); for (let x = -54; x <= 54; x += 18) path(ctx, c => c.rect(x * nar - 6, -189, 12, 10), '#e7bf55', 2); },
    front(ctx, B) { if (B.back) return; const { top, nar } = B; garment(ctx, B, c => { c.moveTo(-66 * nar, top + 14); c.quadraticCurveTo(-30, top - 10, 40 * nar, top + 2); c.quadraticCurveTo(70 * nar, top + 8, 66 * nar, top + 30); c.quadraticCurveTo(10, top + 46, -66 * nar, top + 34); c.closePath(); }, '#b2342f', 'rgba(40,0,0,.3)');
      path(ctx, c => c.arc(52 * nar, top + 20, 11, 0, TAU), '#e7bf55', 3); } };
  O.clerk = { hat: null, arm: { short: true, sleeve: '#d9c7a0', w: 30 }, legs: { kind: 'trousers', c: '#6b5a48' }, feet: 'boots', boot: '#5a3a22',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -100, 1.16), '#d9c7a0', 'rgba(90,60,30,.25)'); if (B.back) return; curve(ctx, [vx - 24, top - 2], [vx, top + 14], [vx + 24, top - 2], 4);
      garment(ctx, B, c => { c.moveTo(-64 * nar, top + 10); c.quadraticCurveTo(-20, top + 50, 30, top + 30); c.lineTo(66 * nar, top + 20); c.quadraticCurveTo(70 * nar, top - 4, 30, top - 6); c.quadraticCurveTo(-40, top - 8, -64 * nar, top + 10); c.closePath(); }, '#7a5233', 'rgba(0,0,0,.25)');
      path(ctx, c => c.rect(-64 * nar, -188, 128 * nar, 12), '#5a3a22', 3); } };
  // officers' wives: long tunic dress to the ground + a palla wrapped over the shoulder
  function stola(dress, palla, trim) {
    return { hat: null, arm: { short: true, sleeve: dress, w: 34 }, legs: { kind: 'none' }, feet: 'slippers', shoe: '#c99a3c',
      torso(ctx, B) { const { top, nar, vx } = B;
        garment(ctx, B, c => { c.moveTo(-28 * nar + vx * .2, top - 6); c.quadraticCurveTo(-60 * nar, top - 4, -64 * nar, top + 20); c.quadraticCurveTo(-74 * nar, -140, -86 * nar, -8); c.quadraticCurveTo(0, 4, 86 * nar, -8); c.quadraticCurveTo(74 * nar, -140, 64 * nar, top + 20); c.quadraticCurveTo(60 * nar, top - 4, 28 * nar + vx * .2, top - 6); c.closePath(); }, dress, 'rgba(20,0,30,.25)',
          c2 => { c2.strokeStyle = 'rgba(0,0,0,.18)'; c2.lineWidth = 2.5; for (const x of [-46, -20, 8, 34, 58]) { c2.beginPath(); c2.moveTo(x * .6, -200); c2.quadraticCurveTo(x * .9, -100, x, -8); c2.stroke(); } c2.fillStyle = trim; c2.fillRect(-100, -26, 200, 12); });
        if (B.back) return;
        curve(ctx, [vx - 22, top - 2], [vx, top + 16], [vx + 22, top - 2], 4);
        path(ctx, c => c.rect(-52 * nar, top + 64, 104 * nar, 10), trim, 3);
        garment(ctx, B, c => { c.moveTo(66 * nar, top + 16); c.quadraticCurveTo(10, top + 60, -40 * nar, -150); c.quadraticCurveTo(-60 * nar, -110, -70 * nar, -60); c.lineTo(-40 * nar, -70); c.quadraticCurveTo(-10, -150, 40 * nar, -170); c.quadraticCurveTo(74 * nar, -200, 70 * nar, top + 40); c.closePath(); }, palla, 'rgba(0,0,0,.22)',
          c2 => { for (let k = 0; k < 4; k++) curve(c2, [60 - k * 8, top + 30 + k * 10], [10 - k * 10, -170 + k * 10], [-40 - k * 6, -90 + k * 6], 2.5, 'rgba(0,0,0,.2)'); });
      } };
  }
  O.stolaBlue = stola('#3f7fa8', '#e8c26a', '#e7bf55');
  O.stolaRose = stola('#c8577a', '#f1e3c4', '#e7bf55');
  O.briton = { hat: null, arm: { sleeve: '#4f7a3c', w: 30 }, legs: { kind: 'trousers', c: '#7a4a3a' }, feet: 'boots', boot: '#5a3a22',
    behind: cloakBehind('#5a6a8a', -70),
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -104, 1.15), '#4f7a3c', 'rgba(0,20,0,.3)', c2 => { c2.strokeStyle = 'rgba(200,60,40,.55)'; c2.lineWidth = 3; for (let x = -120; x < 120; x += 18) { c2.beginPath(); c2.moveTo(x, top); c2.lineTo(x, -100); c2.stroke(); } for (let y = top; y < -100; y += 18) { c2.beginPath(); c2.moveTo(-120, y); c2.lineTo(120, y); c2.stroke(); } });
      if (B.back) return; path(ctx, c => c.rect(-66 * nar, -190, 132 * nar, 13), '#6b4428', 3);
      ctx.lineWidth = 9; ctx.strokeStyle = INK(); ctx.beginPath(); ctx.arc(vx, top - 4, 30, .15 * PI, .85 * PI); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#e7bf55'; ctx.stroke(); },
    front(ctx, B) { if (B.back) return; path(ctx, c => c.arc(-56 * B.nar, B.top + 22, 9, 0, TAU), '#c99a3c', 3); } };
  O.servant = { hat: null, arm: { short: true, sleeve: '#cbbd9e', w: 30 }, legs: { kind: 'bare' }, feet: 'slippers', shoe: '#7a5a3a',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -96, 1.14), '#cbbd9e', 'rgba(60,40,20,.25)'); if (B.back) return; curve(ctx, [vx - 22, top - 2], [vx, top + 14], [vx + 22, top - 2], 4); path(ctx, c => c.rect(-62 * nar, -196, 124 * nar, 10), '#8a6a44', 3); } };
  O.dig73 = { hat: null, arm: { sleeve: '#e0772e', w: 32 }, legs: { kind: 'trousers', c: '#3e5a86' }, feet: 'boots', boot: '#2a3a2a',
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -140, 1.06), '#e0772e', 'rgba(60,20,0,.3)'); if (B.back) return;
      seg(ctx, [[vx, top - 4], [vx, -142]], 3); for (const sd of [-1, 1]) path(ctx, c => c.roundRect(vx + sd * 34 - 14, -230, 28, 30, 4), '#c9651f', 3); path(ctx, c => c.roundRect(vx - 26, top - 14, 52, 22, 10), '#c9651f', 3.5); } };

  // ---- helmets ----
  H.auxHelmet = { hideTufts: true,
    behind(ctx, hc) { const { hx } = hc; path(ctx, c => { c.moveTo(-118 + hx, -30); c.quadraticCurveTo(-136 + hx, 6, -100 + hx, 22); c.lineTo(100 + hx, 22); c.quadraticCurveTo(136 + hx, 6, 118 + hx, -30); c.closePath(); }, '#8d939b', 4); },   // neck guard (behind the head)
    draw(ctx, hc) {   // iron bowl, gilded brow band, hinged cheek pieces, crest knob
      const { hx, yaw } = hc;
      for (const s of [-1, 1]) path(ctx, c => { c.moveTo(s * 100, -40); c.quadraticCurveTo(s * 112, 20, s * 86, 58); c.lineTo(s * 72, 46); c.quadraticCurveTo(s * 84, 10, s * 80, -40); c.closePath(); }, '#a7adb5', 4);
      const bowl = c => { c.ellipse(hx, -44, 110, 92, 0, PI * .98, PI * 2.02); c.closePath(); };
      path(ctx, bowl, '#b3b9c1', LW);
      clip(ctx, bowl, () => { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(hx - 44, -100, 30, 14, -.5, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(20,24,40,.3)'; ctx.beginPath(); ctx.ellipse(hx + 120, -60, 60, 120, 0, 0, TAU); ctx.fill(); });
      path(ctx, c => c.roundRect(-114, -58, 228, 16, 8), '#d0a548', 4); for (let x = -90; x <= 90; x += 30) path(ctx, c => c.arc(x + hx * .3, -50, 3.5, 0, TAU), '#8a6a2e', 1.5);
      path(ctx, c => c.arc(hx + Math.sin(yaw) * 10, -136, 9, 0, TAU), '#d0a548', 3);
    } };
  H.cavHelmet = { hideTufts: true, behind(ctx, hc) { H.auxHelmet.behind(ctx, hc); }, draw(ctx, hc) {   // the auxiliary helmet + a tall yellow plume
    const { hx, yaw } = hc, cw = 14 + Math.abs(Math.sin(yaw)) * 60;
    path(ctx, c => { c.moveTo(hx - cw, -124); c.quadraticCurveTo(hx - cw * .3, -200, hx + cw * .3, -196); c.quadraticCurveTo(hx + cw, -190, hx + cw, -124); c.closePath(); }, '#f0c03c', 4);
    ctx.save(); ctx.globalAlpha = .35; for (let k = -.8; k <= .8; k += .2) seg(ctx, [[hx + k * cw, -128], [hx + k * cw * .9, -182]], 2, '#8a5a10'); ctx.restore();
    H.auxHelmet.draw(ctx, hc);
  } };
  H.woolCap = { hideTufts: true, draw(ctx, hc) { path(ctx, c => { c.ellipse(hc.hx, -30, 108, 90, 0, PI, TAU); c.closePath(); }, '#8a6a4a', 4.5); path(ctx, c => c.roundRect(-110, -44, 220, 22, 10), '#7a5a3a', 4); } };

  // ---- props (drawn with the hand: under = behind the fingers, over = in front) ----
  PR.tablet = { hand: 'hold', handDir: -1.2, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 4, y - 44); ctx.rotate(-.12); path(ctx, c => c.roundRect(-46, -26, 92, 52, 4), '#8a6038', 3.5); seg(ctx, [[0, -26], [0, 26]], 2, 'rgba(0,0,0,.4)'); ctx.strokeStyle = '#1a120c'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-38, -14 + i * 9); ctx.lineTo(-8 - (i % 2) * 6, -14 + i * 9); ctx.moveTo(8, -14 + i * 9); ctx.lineTo(36 - (i % 3) * 5, -14 + i * 9); ctx.stroke(); } ctx.restore(); } };
  PR.stylus = { hand: 'hold', under(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x - 6, y + 16], [x + 14, y - 30]], 6); seg(ctx, [[x - 6, y + 16], [x + 14, y - 30]], 3, '#c9a46a'); } };
  PR.spear = { hand: 'hold', handDir: -PI / 2, under(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x + 2, y + 170], [x + 2, y - 300]], 11); seg(ctx, [[x + 2, y + 170], [x + 2, y - 300]], 6, '#8a6038'); path(ctx, c => { c.moveTo(x + 2, y - 350); c.lineTo(x - 10, y - 300); c.lineTo(x + 14, y - 300); c.closePath(); }, '#c9cdd3', 3); } };
  PR.shield = { side: 'L', hand: 'hold', over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x - 6, y - 10);   // flat oval auxiliary shield with a boss
    path(ctx, c => c.ellipse(0, 0, 56, 96, 0, 0, TAU), '#3c5a86', 4.5); path(ctx, c => c.ellipse(0, 0, 48, 88, 0, 0, TAU), null, 0); ctx.strokeStyle = '#e7bf55'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 46, 86, 0, 0, TAU); ctx.stroke();
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, s * 22); ctx.quadraticCurveTo(s * 30, s * 50, 0, s * 78); ctx.stroke(); } path(ctx, c => c.arc(0, 0, 18, 0, TAU), '#c9cdd3', 3.5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(-5, -5, 6, 0, TAU); ctx.fill(); ctx.restore(); } };
  PR.lamp = { hand: 'hold', handDir: 0, over(ctx, a, sd, o) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 20, y - 8); path(ctx, c => { c.ellipse(0, 0, 26, 12, 0, 0, TAU); }, '#c98a4e', 3.5); path(ctx, c => c.ellipse(24, -4, 8, 5, 0, 0, TAU), '#b07a40', 3);
    const fl = Math.sin((o.t || 0) * 13) * 2; path(ctx, c => { c.moveTo(26, -8); c.quadraticCurveTo(36 + fl, -26, 28, -40); c.quadraticCurveTo(20 - fl, -24, 26, -8); c.closePath(); }, '#ffcf5a', 2.5); ctx.restore(); } };
  PR.trowel = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x, y); ctx.rotate(a.dir); seg(ctx, [[10, 0], [34, 0]], 9); seg(ctx, [[10, 0], [34, 0]], 5, '#7a5233'); path(ctx, c => { c.moveTo(34, -2); c.lineTo(76, -16); c.lineTo(80, 0); c.lineTo(76, 16); c.lineTo(34, 2); c.closePath(); }, '#b9bec6', 3.5); ctx.restore(); } };
  PR.jug = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 18, y + 20); path(ctx, c => { c.moveTo(-16, -40); c.lineTo(16, -40); c.quadraticCurveTo(34, -10, 20, 26); c.lineTo(-20, 26); c.quadraticCurveTo(-34, -10, -16, -40); c.closePath(); }, '#c46a3e', 3.5); seg(ctx, [[-18, -30], [-30, -10], [-20, 6]], 4); ctx.restore(); } };
  PR.cup = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 16, y - 6); path(ctx, c => { c.moveTo(-14, -18); c.lineTo(14, -18); c.lineTo(10, 14); c.lineTo(-10, 14); c.closePath(); }, '#b0703e', 3.5); ctx.restore(); } };
  PR.parcel = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 20, y - 30); path(ctx, c => c.roundRect(-44, -34, 88, 64, 10), '#c9b48a', 4); seg(ctx, [[-44, -2], [44, -2]], 5, '#8a5a3a'); seg(ctx, [[0, -34], [0, 30]], 5, '#8a5a3a'); path(ctx, c => c.ellipse(0, -36, 14, 8, 0, 0, TAU), '#8a5a3a', 3); ctx.restore(); } };

  // ---- the cast (spread into Guide.draw options) ----
  const look = (o) => o;
  G.VCast = {
    theoAux:   { outfit: 'auxiliary', prop: 'spear' },                                               // Theo as "you", a Tungrian soldier
    tungA:     { outfit: 'auxiliary', look: look({ skin: '#f2c49e', hairCol: '#6b4226', beard: 'stubble' }) },
    tungB:     { outfit: 'auxiliary', look: look({ skin: '#e8b48c', hairCol: '#b98a4e', beard: 'moustache', width: 1.08 }) },
    tungC:     { outfit: 'auxiliary', look: look({ skin: '#d9a077', hairCol: '#2a1a10', beard: 'full' }) },
    masclus:   { outfit: 'decurion', look: look({ skin: '#f0c39c', hairCol: '#5a3420', beard: 'moustache', eye: '#3f6a8a' }) },
    cerialis:  { outfit: 'prefect', hat: 'none', look: look({ skin: '#eebd96', hair: 'curly', hairCol: '#3a2416', beard: 'full', beardCol: '#3a2416', width: 1.06 }) },
    verecundus:{ outfit: 'prefect', hat: 'none', look: look({ skin: '#e2ae86', hair: 'bald', hairCol: '#8a7a6a', nose: 'big', chin: true }) },
    clerk:     { outfit: 'clerk', hat: 'none', prop: 'stylus', look: look({ skin: '#f3c9a6', hairCol: '#7a5030' }) },
    lepidina:  { outfit: 'stolaBlue', look: look({ skin: '#f7d2b8', hair: 'updo', hairCol: '#4a2a18', lashes: true, lips: '#c7505a', earrings: true }) },
    claudia:   { outfit: 'stolaRose', look: look({ skin: '#f3c6a5', hair: 'updo', hairCol: '#a8642e', lashes: true, lips: '#c7505a', earrings: true }) },
    britonA:   { outfit: 'briton', look: look({ skin: '#f4cfb4', hair: 'long', hairCol: '#b0602a', beard: 'walrus' }) },
    britonB:   { outfit: 'briton', look: look({ skin: '#e9bf9e', hair: 'long', hairCol: '#5a3420', beard: 'walrus' }) },
    servantA:  { outfit: 'servant', prop: 'jug', look: look({ skin: '#c58c64', hairCol: '#1f1712' }) },
    servantB:  { outfit: 'servant', look: look({ skin: '#a8714c', hair: 'curly', hairCol: '#1f1712' }) },
    digger:    { outfit: 'dig73', prop: 'trowel', look: look({ skin: '#f4cdb0', hairCol: '#6b4a30', beard: 'full', beardCol: '#6b4a30' }) },
  };
})(window);
