/* Vindolanda — COLD OPEN preview (~30 s), painted look. No voice yet: timing is estimated at ~150 wpm and the
 * narration is shown as TEMP captions so the cut can be judged; everything re-times to the real voice later.
 *   inbox → four notifications stack (boss / supplies / package / party) → Theo hurls the phone into a wet ditch in
 *   the north of England → time-lapse: 1,900 years of soil → rain → the phone dissolves into a wooden tablet →
 *   the four real tablets → Vindolanda, c. AD 100. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, sky, clouds, hills, smoothPts, blades, birds, motes, PAD } = P, TAU = Math.PI * 2;
  Gd.setTheme('warm');
  const FONT = (w, px) => `${w} ${px}px Fredoka, sans-serif`;
  const txt = (ctx, s, x, y, font, col = OUT, align = 'left') => { ctx.font = font; ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); };

  // ---------- TEMP narration captions (until the voice-over arrives) ----------
  const LINES = [[.2, 1.5, 'Check your inbox.'], [1.6, 3.5, 'Somebody needs something from the boss.'], [3.6, 5.1, 'Somebody’s out of supplies.'], [5.2, 6.9, 'Somebody’s mom sent a package.'],
    [7.0, 9.9, 'And somebody’s having a birthday party, and you’re invited.'], [10.1, 14.0, 'Now take your phone, throw it into a wet ditch in the north of England,'], [14.1, 17.0, 'and wait about nineteen hundred years.'],
    [17.4, 19.2, 'Because that’s not a hypothetical.'], [19.3, 21.4, 'Those exact four messages exist.'], [21.6, 25.3, 'They were written on slivers of wood around the year 100 AD,'], [25.4, 30.6, 'at a Roman fort called Vindolanda, at the far northern edge of the Roman Empire.']];
  function captions(ctx, t) {
    const L = LINES.find(l => t >= l[0] && t < l[1]); if (!L) return;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = FONT(600, 24); const w = ctx.measureText(L[2]).width + 36, x = W / 2 - w / 2, y = H - 64;
    ctx.globalAlpha = .82; ctx.fillStyle = 'rgba(30,18,10,.75)'; ctx.beginPath(); ctx.roundRect(x, y, w, 40, 8); ctx.fill(); ctx.globalAlpha = 1;
    txt(ctx, L[2], W / 2, y + 21, FONT(600, 24), '#fff3e0', 'center'); txt(ctx, 'TEMP CAPTION', x + w - 6, y - 10, FONT(700, 11), 'rgba(255,240,220,.7)', 'right');
    ctx.restore();
  }
  // ---------- rain (diagonal streaks + splashes), deterministic ----------
  function rain(ctx, t, a = 1, n = 160) {
    if (a <= 0) return; const r = rng(17); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(210,225,240,.55)'; ctx.lineWidth = 2;
    for (let i = 0; i < n; i++) { const sp = 900 + r() * 500, x0 = r() * (W + 300), y = ((r() * H + t * sp) % (H + 60)) - 30, x = x0 - (y * .25) - 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 7, y + 26); ctx.stroke(); }
    ctx.restore();
  }

  // ---------- shot A: the phone & the stacking notifications (a cosy evening room, blurred) ----------
  const room = layer('v-room', g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#4a3550'], [1, '#2b1f2e']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    sh(g, '#f2b45a', 0, circ(1040, 220, 120)); g.fillStyle = 'rgba(255,190,110,.25)'; g.beginPath(); g.arc(1040, 220, 260, 0, TAU); g.fill();
    sh(g, '#6b4a3a', 4, c => c.rect(-PAD, 470, W + PAD * 2, 260)); for (let i = 0; i < 6; i++) ln(g, [[-PAD, 500 + i * 40], [W + PAD, 500 + i * 40]], 2, 'rgba(0,0,0,.2)');
    sh(g, '#8a5a8a', 4, c => c.roundRect(120, 300, 380, 200, 30)); sh(g, '#a06aa0', 4, c => c.roundRect(150, 260, 140, 110, 24));
    sh(g, '#3d6a8a', 4, c => c.rect(700, 80, 200, 260)); g.fillStyle = 'rgba(160,200,255,.3)'; g.fillRect(712, 92, 176, 236); ln(g, [[800, 80], [800, 340]], 4); ln(g, [[700, 210], [900, 210]], 4);
  }, 9);
  const NOTES = [['BOSS', 'Need you in my office. Now.', '#5b7fc4', 'B'], ['SUPPLY DEPOT', 'Sorry — we’re all out.', '#d97a3a', 'S'], ['MOM', 'Package on its way! Wear the socks.', '#d8433a', 'M'], ['CLAUDIA', 'You’re invited! Birthday party 🎂', '#8a4f9a', 'C']];
  function phone(ctx, x, y, s, lt, notesAt, glow = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#1d1a20', 6, c => c.roundRect(-150, -290, 300, 580, 42)); sh(ctx, null, 0, c => c);
    ctx.fillStyle = grad(ctx, 0, -270, 0, 270, [[0, '#6aa0d8'], [1, '#e8a8c8']]); ctx.beginPath(); ctx.roundRect(-134, -272, 268, 544, 30); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)'; txt(ctx, '9:41', 0, -230, FONT(700, 40), '#fff', 'center'); txt(ctx, 'Monday', 0, -196, FONT(600, 18), 'rgba(255,255,255,.85)', 'center');
    sh(ctx, '#1d1a20', 0, c => c.roundRect(-40, -282, 80, 20, 10));
    notesAt.forEach((t0, i) => {   // each card drops in from above with a springy settle; older cards slide down
      const k = clamp((lt - t0) / .45); if (k <= 0) return; const later = notesAt.filter((t1, j) => j > i && lt > t1).length;
      const yy = -150 + later * 0 + (NOTES.length - 1 - i) * 0; const slot = notesAt.filter(t1 => lt > t1).length - 1 - i;
      const y0 = -160 + slot * 98 - (1 - FX.settle(k)) * 120; ctx.save(); ctx.globalAlpha = clamp(k * 3);
      const [who, msg, col, ini] = NOTES[i];
      sh(ctx, 'rgba(255,255,255,.93)', 3, c => c.roundRect(-124, y0 - 40, 248, 84, 16)); sh(ctx, col, 3, circ(-92, y0, 22)); txt(ctx, ini, -92, y0 + 1, FONT(700, 20), '#fff', 'center');
      txt(ctx, who, -62, y0 - 16, FONT(700, 18)); txt(ctx, msg.length > 22 ? msg.slice(0, 21) + '…' : msg, -62, y0 + 12, FONT(600, 15), '#5a4a40'); txt(ctx, 'now', 112, y0 - 16, FONT(600, 12), '#9a8a80', 'right');
      ctx.restore(); });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .15 * glow; ctx.fillStyle = '#9fd0ff'; ctx.beginPath(); ctx.roundRect(-134, -272, 268, 544, 30); ctx.fill(); ctx.restore();
    ctx.restore();
  }
  function shotPhone(ctx, lt, dur, t) {
    put(ctx, room, 0, 0);
    const bob = Math.sin(t * 1.3) * 4, s = lerp(.92, 1.0, ease.sine(clamp(lt / dur)));
    // a hand holding the phone (Theo's), the phone glow lighting the frame
    T.glow(ctx, 640, 380, 420, 'rgba(140,190,255,.18)');
    phone(ctx, 640, 372 + bob, s * 1.12, lt, [1.6, 3.6, 5.2, 7.0]);
    if (lt > 7.1) { const r = rng(3); for (let i = 0; i < 40; i++) { const u = clamp((lt - 7.1) / 1.6), x = 640 + (r() - .5) * 700 * ease.out(u), y = 200 - 200 * ease.out(u) + 900 * u * u * (.4 + r() * .4), a = r() * TAU + lt * 4;
      ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = P.FLOWERS[i % 6]; ctx.globalAlpha = 1 - u * .5; ctx.fillRect(-6, -3, 12, 6); ctx.restore(); } }
  }

  // ---------- shot B: the moor — Theo hurls the phone into a wet ditch ----------
  const SKYG = [[0, '#7d8fa3'], [.5, '#b9c3c9'], [.8, '#d9d6c6'], [1, '#e2d6b8']];
  const moorBack = layer('v-moor', g => {
    sky(g, [980, 260], SKYG, .35);
    hills(g, 520, smoothPts(-PAD, W + PAD, 400, 120, 41, 10), '#8fa08a', '#a7b49a', 2, 'rgba(240,240,220,.4)');
    hills(g, 560, smoothPts(-PAD, W + PAD, 450, 90, 43, 12), '#6f8a54', '#8ea064', 2.5, 'rgba(220,230,160,.4)');
    // drystone wall snaking across the field
    const r = rng(9); for (let x = -PAD; x < W + PAD; x += 22) { const y = 500 + Math.sin(x * .006) * 18; sh(g, ['#9a978e', '#b4b0a4', '#86847c'][Math.floor(r() * 3)], 2.5, c => c.ellipse(x, y - r() * 6, 14, 9, r(), 0, TAU)); sh(g, ['#a8a59a', '#8f8c82'][Math.floor(r() * 2)], 2.5, c => c.ellipse(x + 10, y - 14, 12, 8, r(), 0, TAU)); }
    g.fillStyle = grad(g, 0, 520, 0, H, [[0, '#7f9a52'], [1, '#5c7a3c']]); g.fillRect(-PAD, 520, W + PAD * 2, 200);
    for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(${40 + r() * 40},${70 + r() * 40},30,.35)`; g.fillRect(-PAD + r() * (W + PAD * 2), 530 + r() * 190, 3, 8 + r() * 10); }
    // the ditch: a dark, wet channel across the foreground
    sh(g, '#4b3a2a', 4, c => { c.moveTo(-PAD, 610); c.quadraticCurveTo(500, 590, 1500, 620); c.lineTo(1500, 690); c.quadraticCurveTo(500, 670, -PAD, 690); c.closePath(); });
    g.fillStyle = grad(g, 0, 615, 0, 680, [[0, '#566a78'], [1, '#33434d']]); g.beginPath(); g.moveTo(-PAD, 625); g.quadraticCurveTo(500, 606, 1500, 636); g.lineTo(1500, 680); g.quadraticCurveTo(500, 662, -PAD, 682); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(220,235,245,.35)'; g.lineWidth = 3; for (let i = 0; i < 12; i++) { const x = -100 + i * 130; g.beginPath(); g.moveTo(x, 640); g.lineTo(x + 50, 638); g.stroke(); }
  });
  const DITCH = [900, 640];
  function shotThrow(ctx, lt, dur, t) {   // 10.1 → 14.1
    const pan = lerp(-20, 20, lt / dur);
    ctx.save(); T.cam(ctx, lerp(1.0, 1.04, lt / dur), 640, 360);
    put(ctx, moorBack, pan, .5); ctx.save(); ctx.filter = 'saturate(.15) brightness(.92)'; clouds(ctx, t, pan, [[-80, 40, 1, 51, 8], [600, 10, .9, 52, 6]]); ctx.restore(); birds(ctx, t, [[300, 160, 30, 0], [330, 175, 30, 1]]);
    // anticipation (wind-up 0.9–1.6) → release at 1.75 → ballistic flight with spin → splash at land time
    const rel = 1.75, x0 = 420 - pan, y0 = 300, vx = 470, vy = -520, g = 980, tl = lt - rel, land = (() => { const a = .5 * g, b = vy, c = y0 - DITCH[1]; return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a); })();
    const keys = [[0, 'idle'], [.6, 'pointSide'], [1.05, 'cheer'], [rel, 'pointSide'], [rel + .9, 'hips']];
    Gd.draw(ctx, 330 - pan, 600, .74, { t, outfit: 'suit', pose: Gd.pose(lt, keys, .22), turn: .55, lean: lt > 1.0 && lt < rel ? -.08 : lt > rel && lt < rel + .4 ? .08 : 0,
      face: lt < rel ? { mouth: 'grit', brows: 'angry', look: [.6, -.2] } : { mouth: 'o', brows: 'up', eyes: 'wide', look: [.8, .3] }, hair: Gd.hairRing(lt - rel, .5), light: { x: -.4, y: -.9, rim: '#f4f0e6', rimA: .4, cast: .12 } });
    if (tl > 0 && tl < land) { const px = x0 + vx * tl, py = y0 + vy * tl + .5 * g * tl * tl; ctx.save(); ctx.translate(px, py); ctx.rotate(tl * 14); sh(ctx, '#1d1a20', 4, c => c.roundRect(-14, -26, 28, 52, 6)); ctx.fillStyle = '#7ab0e0'; ctx.fillRect(-10, -21, 20, 42); ctx.restore();
      ctx.save(); ctx.globalAlpha = .4; ln(ctx, [[px - vx * .05, py - (vy + g * tl) * .05], [px, py]], 3, '#fff'); ctx.restore(); }
    if (tl >= land) { const u = tl - land, sx = x0 + vx * land;
      for (let i = 0; i < 3; i++) { const k = clamp((u - i * .18) / 1.2); if (k <= 0 || k >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - k; ctx.strokeStyle = '#dbe8f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(sx, DITCH[1], 20 + k * 90, 5 + k * 16, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
      const r = rng(4); for (let i = 0; i < 14; i++) { const a = -Math.PI * (.15 + r() * .7), v = 200 + r() * 220, x = sx + Math.cos(a) * v * u, y = DITCH[1] + Math.sin(a) * v * u + 490 * u * u; if (y > DITCH[1] + 4) continue; sh(ctx, '#cfe3ef', 2, circ(x, y, 4 + r() * 3)); } }
    blades(ctx, 100, 720, 18, 110, t, 21, pan, 1.4, 4); blades(ctx, 1200, 725, 16, 110, t, 22, pan, 1.4, 3);
    ctx.restore(); FX.dateTag(ctx, 'NORTHERN ENGLAND');
  }

  // ---------- shot C: time-lapse cross-section — 1,900 years of wet soil seal the phone ----------
  function shotYears(ctx, lt, dur, t) {   // 14.1 → 17.4
    const k = ease.inOut(clamp(lt / (dur - .4))), day = (Math.sin(lt * 18) + 1) / 2;
    ctx.fillStyle = grad(ctx, 0, 0, 0, 300, [[0, `rgb(${lerp(20, 120, day)},${lerp(30, 150, day)},${lerp(60, 190, day)})`], [1, `rgb(${lerp(40, 220, day)},${lerp(40, 210, day)},${lerp(70, 190, day)})`]]); ctx.fillRect(0, 0, W, 300);
    const surf = lerp(560, 250, k), r = rng(31);
    // soil strata accumulating upward, each a slightly different brown with stones and roots
    const nL = 9; for (let i = 0; i < nL; i++) { const y0 = lerp(560, 250, i / nL), y1 = lerp(560, 250, (i + 1) / nL); if (y1 < surf - 1 && y0 < surf) continue; const top = Math.max(y1, surf);
      ctx.fillStyle = ['#5a4030', '#6b4c36', '#4f3a2c', '#735339', '#5e4532', '#6a4a34', '#544030', '#705038', '#62482f'][i]; ctx.fillRect(0, top, W, y0 - top + 1);
      for (let j = 0; j < 14; j++) { const sx = r() * W, sy = lerp(top, y0, r()); if (sy > top + 4) sh(ctx, '#8d857a', 2, c => c.ellipse(sx, sy, 6 + r() * 8, 4 + r() * 4, r(), 0, TAU)); } }
    ctx.fillStyle = '#4a3a2e'; ctx.fillRect(0, 560, W, 160);
    ctx.fillStyle = 'rgba(70,90,110,.6)'; ctx.fillRect(0, 560, W, 26);   // the old waterlogged ditch layer
    ln(ctx, [[0, surf], [W, surf]], 4); for (let x = 10; x < W; x += 18) { const h = 10 + (x * 7 % 13); ln(ctx, [[x, surf], [x + 3, surf - h]], 3, '#5f8a3c'); }
    // the buried phone, lying in the wet layer
    ctx.save(); ctx.translate(640, 588); ctx.rotate(.08); sh(ctx, '#1d1a20', 4, c => c.roundRect(-60, -14, 120, 26, 7)); ctx.restore();
    txt(ctx, 'NO OXYGEN', 760, 610, FONT(700, 18), 'rgba(220,235,245,.85)');
    const yrs = Math.round(1900 * k / 10) * 10; ctx.save(); ctx.translate(640, 140); FX.bigText(ctx, `+${yrs.toLocaleString('en-US')} YEARS`, 0, 0, 64, { color: '#f6c945' }); ctx.restore();
    rain(ctx, t, clamp((lt - 2.6) / .4), 120);
  }

  // ---------- shot D: rain; the phone dissolves into a thin, dark sliver of wood with faded ink ----------
  function tablet(ctx, x, y, w, h, ink, o = {}) {   // a Vindolanda-style leaf tablet: thin, postcard-sized, folded in the middle
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    sh(ctx, o.wood || '#6b4a2e', 4, c => c.roundRect(-w / 2, -h / 2, w, h, 6));
    ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 6); ctx.clip();
    const r = rng(o.seed || 5); ctx.strokeStyle = 'rgba(40,24,12,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { const yy = -h / 2 + r() * h; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.bezierCurveTo(-w / 6, yy + (r() - .5) * 8, w / 6, yy + (r() - .5) * 8, w / 2, yy + (r() - .5) * 6); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,220,170,.12)'; ctx.fillRect(-w / 2, -h / 2, w, h * .3);
    ln(ctx, [[0, -h / 2], [0, h / 2]], 2.5, 'rgba(30,18,8,.55)');   // the fold
    if (ink > 0) { ctx.globalAlpha = ink; const rr = rng(o.seed || 5); ctx.strokeStyle = '#1a120c'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
      for (const side of [-1, 1]) for (let l = 0; l < 5; l++) { let px = side < 0 ? -w / 2 + 14 : 14; const py = -h / 2 + 18 + l * (h - 30) / 5; ctx.beginPath(); ctx.moveTo(px, py);
        while (px < (side < 0 ? -14 : w / 2 - 14) - 6) { const nx = px + 6 + rr() * 8; ctx.quadraticCurveTo((px + nx) / 2, py - 6 + rr() * 12, nx, py + (rr() - .5) * 4); px = nx; } ctx.stroke(); } }
    ctx.restore(); ctx.restore();
  }
  function shotDissolve(ctx, lt, dur, t) {   // 17.4 → 21.5
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a4650'], [1, '#22292f']]); ctx.fillRect(0, 0, W, H);
    T.glow(ctx, 640, 360, 420, 'rgba(255,220,170,.18)');
    const k = ease.inOut(clamp((lt - .5) / 1.4)), wob = Math.sin(lt * 2) * 4;
    // phone (shrinking, darkening) cross-fades into the wooden leaf
    ctx.save(); ctx.globalAlpha = 1 - k; ctx.translate(640, 360 + wob); ctx.rotate(lerp(.1, -.04, k)); sh(ctx, '#1d1a20', 5, c => c.roundRect(-110 + k * 40, -210 + k * 120, 220 - k * 80, 420 - k * 240, 24)); ctx.fillStyle = '#6aa0d8'; ctx.globalAlpha = (1 - k) * (1 - k); ctx.fillRect(-96 + k * 40, -194 + k * 120, 192 - k * 80, 388 - k * 240); ctx.restore();
    ctx.save(); ctx.globalAlpha = k; tablet(ctx, 640, 360 + wob, lerp(160, 460, k), lerp(320, 190, k), clamp((lt - 1.6) / .9) * .85, { rot: -.04, seed: 7 }); ctx.restore();
    // "those exact four messages exist": the tablet splits into four, each with its tag
    const s4 = clamp((lt - 2.2) / .6);
    if (s4 > 0) { const tags = [['BOSS', 'leave request'], ['SUPPLIES', '“no beer”'], ['PACKAGE', 'socks & underpants'], ['PARTY', 'birthday invite']];
      ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a4650'], [1, '#22292f']]); ctx.globalAlpha = s4; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      tags.forEach(([a, b], i) => { const kk = FX.settle(clamp((lt - 2.2 - i * .18) / .5)); if (kk <= 0) return; const x = 190 + i * 300, y = 340 + (1 - kk) * 300;
        tablet(ctx, x, y + Math.sin(t * 1.5 + i) * 5, 250, 140, .85, { rot: (i % 2 ? .04 : -.05), seed: 11 + i });
        sh(ctx, '#f6efdd', 3, c => c.roundRect(x - 100, y + 92, 200, 56, 8)); txt(ctx, a, x, y + 108, FONT(700, 18), '#d8433a', 'center'); txt(ctx, b, x, y + 130, FONT(600, 16), OUT, 'center'); }); }
    rain(ctx, t, .9, 140);
  }

  // ---------- shot E: Vindolanda c. AD 100 — timber fort on the road at the edge of the empire ----------
  const fortBack = layer('v-fort', g => {
    sky(g, [300, 230], [[0, '#7e95ad'], [.45, '#c9c9c0'], [.75, '#f0d8a8'], [1, '#e9c38a']], .9);
    hills(g, 470, smoothPts(-PAD, W + PAD, 360, 100, 61, 10), '#9aa88c', '#b5bca0', 2, 'rgba(255,240,200,.4)');
    hills(g, 520, smoothPts(-PAD, W + PAD, 430, 70, 63, 12), '#7b9656', '#94a866', 2.5, 'rgba(240,230,160,.5)');
    g.fillStyle = grad(g, 0, 500, 0, H, [[0, '#86a05a'], [1, '#5f7c3e']]); g.fillRect(-PAD, 500, W + PAD * 2, 220);
    // the Stanegate road running across
    sh(g, '#c9b28a', 3, c => { c.moveTo(-PAD, 640); c.quadraticCurveTo(400, 600, 700, 590); c.quadraticCurveTo(1000, 580, W + PAD, 600); c.lineTo(W + PAD, 630); c.quadraticCurveTo(1000, 612, 700, 622); c.quadraticCurveTo(400, 634, -PAD, 680); c.closePath(); });
    // earth rampart + timber palisade
    const x0 = 360, x1 = 920, yT = 420, yB = 540;
    sh(g, '#7a6a48', 4, c => { c.moveTo(x0 - 40, yB + 20); c.lineTo(x0, yB - 20); c.lineTo(x1, yB - 20); c.lineTo(x1 + 40, yB + 20); c.closePath(); });
    const r = rng(8); for (let x = x0; x < x1; x += 13) { const h = 78 + r() * 8; sh(g, ['#8a6a44', '#7a5c3a', '#9a7a50'][Math.floor(r() * 3)], 2.5, c => { c.moveTo(x, yB - 20); c.lineTo(x, yB - 20 - h); c.lineTo(x + 6, yB - 28 - h); c.lineTo(x + 12, yB - 20 - h); c.lineTo(x + 12, yB - 20); c.closePath(); }); }
    // roofs of barracks + the commander's house peeking over the palisade, chimney stacks
    for (const [x, w, c2] of [[420, 160, '#9a5a3a'], [600, 120, '#8a4e34'], [740, 150, '#9a5a3a']]) sh(g, c2, 3.5, c => { c.moveTo(x, yT + 10); c.lineTo(x + w / 2, yT - 40); c.lineTo(x + w, yT + 10); c.closePath(); });
    // gate with two towers
    const gx = 640; for (const s of [-1, 1]) { sh(g, '#8a6a44', 4, c => c.rect(gx + s * 60 - 30, yT - 70, 60, 150)); sh(g, '#6b4a2e', 4, c => { c.moveTo(gx + s * 60 - 40, yT - 70); c.lineTo(gx + s * 60, yT - 110); c.lineTo(gx + s * 60 + 40, yT - 70); c.closePath(); }); sh(g, '#2c1d16', 3, c => c.rect(gx + s * 60 - 10, yT - 50, 20, 26)); }
    sh(g, '#2c1d16', 4, c => { c.moveTo(gx - 30, yB - 20); c.lineTo(gx - 30, yT + 10); c.quadraticCurveTo(gx, yT - 10, gx + 30, yT + 10); c.lineTo(gx + 30, yB - 20); c.closePath(); });
    sh(g, '#7a5c3a', 4, c => c.rect(gx - 100, yT - 76, 200, 14));
  });
  function smoke(ctx, t, x, y) { for (let i = 0; i < 6; i++) { const k = (t * .22 + i / 6) % 1; ctx.save(); ctx.globalAlpha = .4 * (1 - k); ctx.fillStyle = '#d8d4cc'; ctx.beginPath(); ctx.arc(x + k * 50 + Math.sin(k * 6 + t) * 6, y - k * 140, 9 + k * 24, 0, TAU); ctx.fill(); ctx.restore(); } }
  function soldier(ctx, x, y, s, t, ph, dir = 1) {   // tiny auxiliary: mail shirt, oval shield, helmet, spear; walking bob
    const b = Math.abs(Math.sin(t * 6 + ph)) * 3; ctx.save(); ctx.translate(x, y - b); ctx.scale(s * dir, s);
    ln(ctx, [[-6, 0], [-6, -18]], 6); ln(ctx, [[6, 0], [6, -18]], 6); sh(ctx, '#9a9ea6', 2.5, c => c.roundRect(-13, -50, 26, 34, 8)); sh(ctx, '#b2342f', 2, c => c.rect(-12, -20, 24, 6));
    sh(ctx, Gd.C.face, 2.5, circ(0, -60, 10)); sh(ctx, '#a8a8a8', 2.5, c => c.arc(0, -62, 11, Math.PI, TAU)); ln(ctx, [[16, 2], [16, -84]], 3, '#7a5233'); sh(ctx, '#c9c2b0', 1.5, c => { c.moveTo(16, -84); c.lineTo(12, -76); c.lineTo(20, -76); c.closePath(); });
    sh(ctx, '#3c5a86', 2.5, c => c.ellipse(-14, -34, 10, 20, 0, 0, TAU)); sh(ctx, '#d0a548', 1.5, circ(-14, -34, 3));
    ctx.restore();
  }
  function shotFort(ctx, lt, dur, t) {   // 21.5 → 30.8
    const pan = lerp(-60, 50, ease.sine(clamp(lt / dur)));
    ctx.save(); T.cam(ctx, lerp(1.0, 1.08, ease.sine(clamp(lt / dur))), 640, 360);
    put(ctx, fortBack, pan, .7); ctx.save(); ctx.filter = 'saturate(.3) brightness(1.02)'; clouds(ctx, t, pan, [[-100, 30, 1.1, 71, 7], [700, 60, .8, 72, 5]]); ctx.restore(); birds(ctx, t, [[0, 120, 45, 0], [40, 140, 45, 1.1], [70, 112, 45, 2]]);
    for (const [x, y] of [[500, 380], [660, 370], [800, 380]]) smoke(ctx, t, x - pan * .7, y);
    // the red standard flapping over the gate
    const fx = 640 - pan * .7, fy = 300; ln(ctx, [[fx, 344], [fx, fy - 30]], 4); ctx.save(); ctx.beginPath(); ctx.moveTo(fx, fy - 26); for (let i = 0; i <= 10; i++) ctx.lineTo(fx + i * 5, fy - 26 + Math.sin(t * 6 - i * .7) * 3); for (let i = 10; i >= 0; i--) ctx.lineTo(fx + i * 5, fy + 6 + Math.sin(t * 6 - i * .7) * 3); ctx.closePath(); ctx.fillStyle = '#b2342f'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = OUT; ctx.stroke(); ctx.restore();
    for (let i = 0; i < 7; i++) { const u = ((t * .05 + i / 7) % 1), x = lerp(-150, 1450, u) - pan * .9, y = 612 - Math.sin(u * Math.PI) * 18; soldier(ctx, x, y, .62, t, i, 1); }
    for (let i = 0; i < 4; i++) { const u = ((t * .04 + i / 4 + .3) % 1), x = lerp(1450, -150, u) - pan * .9, y = 626; soldier(ctx, x, y, .7, t, i + 3, -1); }
    blades(ctx, 80, 725, 16, 120, t, 31, pan, 1.4, 2); blades(ctx, 1210, 725, 14, 110, t, 32, pan, 1.4, 2);
    motes(ctx, t, 20, 6);
    ctx.restore();
    FX.dateTag(ctx, 'VINDOLANDA · c. AD 100');
    const k = clamp((lt - 4.2) / .5); if (k > 0) { ctx.save(); ctx.globalAlpha = k; FX.caption(ctx, 'the far northern edge of the Roman Empire', 10, 0, W - 60, 90); ctx.restore(); }
  }
  const shots = [[0, 10.0, shotPhone], [10.0, 14.1, shotThrow], [14.1, 17.4, shotYears], [17.4, 21.5, shotDissolve], [21.5, 30.8, shotFort]].map(([start, end, draw]) => ({ start, end, draw: (ctx, lt, dur, t) => { draw(ctx, lt, dur, t); captions(ctx, t); } }));
  G.TOON_FINISH = { grain: .025, vignette: .5 };
  G.Show = { duration: 30.8, narration: 'assets/audio/silence.mp3', shots,
    sfx: [{ t: 1.6, type: 'click', gain: .5 }, { t: 3.6, type: 'click', gain: .5 }, { t: 5.2, type: 'click', gain: .5 }, { t: 7.0, type: 'click', gain: .6 }, { t: 7.05, type: 'swell', gain: .25 },
      { t: 10.0, type: 'wind', gain: .4 }, { t: 11.75, type: 'whoosh', gain: .7 }, { t: 12.95, type: 'splash', gain: .8 }, { t: 14.1, type: 'whoosh', gain: .4 }, { t: 16.7, type: 'wind', gain: .5 },
      { t: 17.4, type: 'paper', gain: .4 }, { t: 19.6, type: 'thud', gain: .35 }, { t: 21.5, type: 'swell', gain: .4 }],
    moods: [{ t: 0, mood: 'still' }, { t: 10.0, mood: 'under' }, { t: 14.1, mood: 'mystery' }, { t: 21.5, mood: 'still' }], images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '46px "Luckiest Guy"'] };
})(window);
