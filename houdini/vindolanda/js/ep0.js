/* Vindolanda episode — framework + BEAT 1 (cold open). Shots start on voice anchors (window.TV); inside a shot,
 * R('key') gives that anchor's time relative to the shot start, so every action lands on its word. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, V = G.VS, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, sky, clouds, hills, smoothPts, blades, birds, motes, PAD } = P, TAU = Math.PI * 2;
  const EP = G.EP = { shots: [], sfx: [], moods: [] };
  EP.S = (key, fn, off = 0) => EP.shots.push({ t: TV[key] + off, fn });
  EP.fx = (key, type, gain = 1, off = 0, dur) => EP.sfx.push({ t: Math.max(0, TV[key] + off), type, gain, dur });
  EP.mood = (key, mood, off = 0) => EP.moods.push({ t: Math.max(0, TV[key] + off), mood });
  const { S, fx, mood } = EP;
  const theoSuit = (o) => Object.assign({ light: K.LIGHT.warm }, o);

  // ---------- 1. inbox: notifications stack (boss / supplies / mom / party) ----------
  const room = layer('v-room', g => {
    g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#4a3550'], [1, '#2b1f2e']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    sh(g, '#f2b45a', 0, circ(1040, 220, 120)); g.fillStyle = 'rgba(255,190,110,.25)'; g.beginPath(); g.arc(1040, 220, 260, 0, TAU); g.fill();
    sh(g, '#6b4a3a', 4, c => c.rect(-PAD, 470, W + PAD * 2, 260)); sh(g, '#8a5a8a', 4, c => c.roundRect(120, 300, 380, 200, 30)); sh(g, '#a06aa0', 4, c => c.roundRect(150, 260, 140, 110, 24));
    sh(g, '#3d6a8a', 4, c => c.rect(700, 80, 200, 260)); g.fillStyle = 'rgba(160,200,255,.3)'; g.fillRect(712, 92, 176, 236); ln(g, [[800, 80], [800, 340]], 4); ln(g, [[700, 210], [900, 210]], 4);
  }, 9);
  const NOTES = [['BOSS', 'Need you in my office. Now.', '#5b7fc4', 'B'], ['SUPPLY DEPOT', 'Sorry — we’re all out.', '#d97a3a', 'S'], ['MOM', 'Package on its way! Wear the socks.', '#d8433a', 'M'], ['CLAUDIA', 'You’re invited! Birthday party', '#8a4f9a', 'C']];
  function phone(ctx, x, y, s, t, at, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#1d1a20', 6, c => c.roundRect(-150, -290, 300, 580, 42));
    ctx.fillStyle = grad(ctx, 0, -270, 0, 270, [[0, '#6aa0d8'], [1, '#e8a8c8']]); ctx.beginPath(); ctx.roundRect(-134, -272, 268, 544, 30); ctx.fill();
    K.txt(ctx, '9:41', 0, -230, K.FONT(700, 40), '#fff', 'center'); K.txt(ctx, o.day || 'Monday', 0, -196, K.FONT(600, 18), 'rgba(255,255,255,.85)', 'center');
    sh(ctx, '#1d1a20', 0, c => c.roundRect(-40, -282, 80, 20, 10));
    at.forEach((t0, i) => { const k = clamp((t - t0) / .45); if (k <= 0) return; const slot = at.filter(t1 => t > t1).length - 1 - i, y0 = -160 + slot * 98 - (1 - FX.settle(k)) * 120;
      ctx.save(); ctx.globalAlpha = clamp(k * 3); const [who, msg, col, ini] = (o.notes || NOTES)[i];
      sh(ctx, 'rgba(255,255,255,.95)', 3, c => c.roundRect(-124, y0 - 40, 248, 84, 16)); sh(ctx, col, 3, circ(-92, y0, 22)); K.txt(ctx, ini, -92, y0 + 1, K.FONT(700, 20), '#fff', 'center');
      K.txt(ctx, who, -62, y0 - 16, K.FONT(700, 18)); K.txt(ctx, msg.length > 22 ? msg.slice(0, 21) + '…' : msg, -62, y0 + 12, K.FONT(600, 15), '#5a4a40'); K.txt(ctx, 'now', 112, y0 - 16, K.FONT(600, 12), '#9a8a80', 'right'); ctx.restore(); });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .12; ctx.fillStyle = '#9fd0ff'; ctx.beginPath(); ctx.roundRect(-134, -272, 268, 544, 30); ctx.fill(); ctx.restore();
    ctx.restore();
  }
  EP.phoneScene = (ctx, lt, dur, t, at, o) => { put(ctx, room, 0, 0); const bob = Math.sin(t * 1.3) * 4, s = lerp(.98, 1.08, ease.sine(clamp(lt / dur))); T.glow(ctx, 640, 380, 420, 'rgba(140,190,255,.18)'); phone(ctx, 640, 372 + bob, s, lt, at, o); };
  S('inbox', (ctx, lt, dur, t, R) => { EP.phoneScene(ctx, lt, dur, t, [R('boss'), R('supplies'), R('mom'), R('party')]); K.confetti(ctx, lt, R('party') + .4, 640, 160, 70);
    K.tag(ctx, 'Check your inbox.', 640, 60, lt, .05, { size: 24 }); });
  ['boss', 'supplies', 'mom', 'party'].forEach(k => fx(k, 'ping', .8)); fx('party', 'confetti', .7, .4); mood('inbox', 'curious');

  // ---------- 2. the throw: northern England, wet ditch ----------
  const moorBack = layer('v-moor', g => {
    sky(g, [980, 260], V.SKY.grey, .35);
    hills(g, 520, smoothPts(-PAD, W + PAD, 400, 120, 41, 10), '#8fa08a', '#a7b49a', 2, 'rgba(240,240,220,.4)'); hills(g, 560, smoothPts(-PAD, W + PAD, 450, 90, 43, 12), '#6f8a54', '#8ea064', 2.5, 'rgba(220,230,160,.4)');
    const r = rng(9); for (let x = -PAD; x < W + PAD; x += 22) { const y = 500 + Math.sin(x * .006) * 18; sh(g, ['#9a978e', '#b4b0a4', '#86847c'][Math.floor(r() * 3)], 2.5, c => c.ellipse(x, y - r() * 6, 14, 9, r(), 0, TAU)); sh(g, ['#a8a59a', '#8f8c82'][Math.floor(r() * 2)], 2.5, c => c.ellipse(x + 10, y - 14, 12, 8, r(), 0, TAU)); }
    g.fillStyle = grad(g, 0, 520, 0, H, [[0, '#7f9a52'], [1, '#5c7a3c']]); g.fillRect(-PAD, 520, W + PAD * 2, 200);
    sh(g, '#4b3a2a', 4, c => { c.moveTo(-PAD, 610); c.quadraticCurveTo(500, 590, 1500, 620); c.lineTo(1500, 690); c.quadraticCurveTo(500, 670, -PAD, 690); c.closePath(); });
    g.fillStyle = grad(g, 0, 615, 0, 680, [[0, '#566a78'], [1, '#33434d']]); g.beginPath(); g.moveTo(-PAD, 625); g.quadraticCurveTo(500, 606, 1500, 636); g.lineTo(1500, 680); g.quadraticCurveTo(500, 662, -PAD, 682); g.closePath(); g.fill();
  });
  S('throw', (ctx, lt, dur, t, R) => {
    const pan = lerp(-20, 20, lt / dur); ctx.save(); T.cam(ctx, lerp(1.0, 1.04, lt / dur), 640, 360);
    put(ctx, moorBack, pan, .5); ctx.save(); ctx.filter = 'saturate(.15) brightness(.92)'; clouds(ctx, t, pan, [[-80, 40, 1, 51, 8], [600, 10, .9, 52, 6]]); ctx.restore(); birds(ctx, t, [[300, 160, 30, 0], [330, 175, 30, 1]]);
    const rel = R('wet') - .35, x0 = 420 - pan, y0 = 300, vx = 470, vy = -520, g = 980, tl = lt - rel, land = (-vy + Math.sqrt(vy * vy - 4 * .5 * g * (y0 - 640))) / g;
    Gd.draw(ctx, 330 - pan, 600, .74, theoSuit({ t, pose: Gd.pose(lt, [[0, 'idle'], [rel - 1.1, 'pointSide'], [rel - .6, 'cheer'], [rel, 'pointSide'], [rel + .9, 'hips']], .22), turn: .55, lean: lt > rel - .7 && lt < rel ? -.08 : lt > rel && lt < rel + .4 ? .08 : 0,
      face: lt < rel ? { mouth: 'grit', brows: 'angry', look: [.6, -.2] } : { mouth: 'o', brows: 'up', eyes: 'wide', look: [.8, .3] }, hair: Gd.hairRing(lt - rel, .5), light: K.LIGHT.grey }));
    if (tl > 0 && tl < land) { const px = x0 + vx * tl, py = y0 + vy * tl + .5 * g * tl * tl; ctx.save(); ctx.translate(px, py); ctx.rotate(tl * 14); sh(ctx, '#1d1a20', 4, c => c.roundRect(-14, -26, 28, 52, 6)); ctx.fillStyle = '#7ab0e0'; ctx.fillRect(-10, -21, 20, 42); ctx.restore(); }
    if (tl >= land) { const u = tl - land, sx = x0 + vx * land; for (let i = 0; i < 3; i++) { const k = clamp((u - i * .18) / 1.2); if (k <= 0 || k >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - k; ctx.strokeStyle = '#dbe8f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(sx, 640, 20 + k * 90, 5 + k * 16, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
      const r = rng(4); for (let i = 0; i < 14; i++) { const a = -Math.PI * (.15 + r() * .7), v = 200 + r() * 220, x = sx + Math.cos(a) * v * u, y = 640 + Math.sin(a) * v * u + 490 * u * u; if (y > 644) continue; sh(ctx, '#cfe3ef', 2, circ(x, y, 4 + r() * 3)); } }
    blades(ctx, 100, 720, 18, 110, t, 21, pan, 1.4, 4); blades(ctx, 1200, 725, 16, 110, t, 22, pan, 1.4, 3);
    ctx.restore(); FX.dateTag(ctx, 'NORTHERN ENGLAND');
  });
  fx('throw', 'wind', .5, 0, 4); fx('wet', 'whoosh', .8, -.35); fx('wet', 'splash', .9, .75);

  // ---------- 3. 1,900 years of wet soil ----------
  S('wait', (ctx, lt, dur, t) => {
    const k = ease.inOut(clamp(lt / (dur - .3))), day = (Math.sin(lt * 18) + 1) / 2;
    ctx.fillStyle = grad(ctx, 0, 0, 0, 300, [[0, `rgb(${lerp(20, 120, day)},${lerp(30, 150, day)},${lerp(60, 190, day)})`], [1, `rgb(${lerp(40, 220, day)},${lerp(40, 210, day)},${lerp(70, 190, day)})`]]); ctx.fillRect(0, 0, W, 300);
    const surf = lerp(560, 250, k), r = rng(31);
    for (let i = 0; i < 9; i++) { const y0 = lerp(560, 250, i / 9), y1 = lerp(560, 250, (i + 1) / 9); if (y0 < surf) continue; const top = Math.max(y1, surf);
      ctx.fillStyle = ['#5a4030', '#6b4c36', '#4f3a2c', '#735339', '#5e4532', '#6a4a34', '#544030', '#705038', '#62482f'][i]; ctx.fillRect(0, top, W, y0 - top + 1);
      for (let j = 0; j < 14; j++) { const sx = r() * W, sy = lerp(top, y0, r()); if (sy > top + 4) sh(ctx, '#8d857a', 2, c => c.ellipse(sx, sy, 6 + r() * 8, 4 + r() * 4, r(), 0, TAU)); } }
    ctx.fillStyle = '#4a3a2e'; ctx.fillRect(0, 560, W, 160); ctx.fillStyle = 'rgba(70,90,110,.6)'; ctx.fillRect(0, 560, W, 26);
    ln(ctx, [[0, surf], [W, surf]], 4); for (let x = 10; x < W; x += 18) { const h = 10 + (x * 7 % 13) + Math.sin(t * 2 + x) * 2; ln(ctx, [[x, surf], [x + 3, surf - h]], 3, '#5f8a3c'); }
    ctx.save(); ctx.translate(640, 588); ctx.rotate(.08); sh(ctx, '#1d1a20', 4, c => c.roundRect(-60, -14, 120, 26, 7)); ctx.restore();
    const yrs = Math.round(1900 * k / 10) * 10; ctx.save(); ctx.translate(640, 140); FX.bigText(ctx, `+${yrs.toLocaleString('en-US')} YEARS`, 0, 0, 64, { color: '#f6c945' }); ctx.restore();
  });
  fx('wait', 'rumble', .7, 0, 2.2); mood('wait', 'quiet');

  // ---------- 4. rain → the phone becomes a wooden tablet → four real messages ----------
  S('hypo', (ctx, lt, dur, t, R) => {
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a4650'], [1, '#22292f']]); ctx.fillRect(0, 0, W, H); T.glow(ctx, 640, 360, 420, 'rgba(255,220,170,.18)');
    const k = ease.inOut(clamp((lt - .4) / 1.4)), wob = Math.sin(lt * 2) * 4;
    ctx.save(); ctx.globalAlpha = 1 - k; ctx.translate(640, 360 + wob); sh(ctx, '#1d1a20', 5, c => c.roundRect(-110 + k * 40, -210 + k * 120, 220 - k * 80, 420 - k * 240, 24)); ctx.restore();
    ctx.save(); ctx.globalAlpha = k; K.tablet(ctx, 640, 360 + wob, lerp(160, 460, k), lerp(320, 190, k), { ink: clamp((lt - 1.4) / .8) * .85, rot: -.04, seed: 7, glow: .15 }); ctx.restore();
    const s4 = clamp((lt - R('exist')) / .5);
    if (s4 > 0) { ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a4650'], [1, '#22292f']]); ctx.globalAlpha = s4; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      [['BOSS', 'leave request'], ['SUPPLIES', '“no beer”'], ['PACKAGE', 'socks & underpants'], ['PARTY', 'birthday invite']].forEach(([a, b], i) => { const kk = FX.settle(clamp((lt - R('exist') - i * .2) / .5)); if (kk <= 0) return; const x = 190 + i * 300, y = 330 + (1 - kk) * 300;
        K.tablet(ctx, x, y + Math.sin(t * 1.5 + i) * 5, 250, 140, { rot: (i % 2 ? .04 : -.05), seed: 11 + i, glow: .12 }); sh(ctx, '#f6efdd', 3, c => c.roundRect(x - 100, y + 92, 200, 56, 8)); K.txt(ctx, a, x, y + 108, K.FONT(700, 18), '#d8433a', 'center'); K.txt(ctx, b, x, y + 130, K.FONT(600, 16), OUT, 'center'); }); }
    K.rain(ctx, t, .9, 140);
  });
  fx('hypo', 'rain', .5, 0, 5.4); fx('exist', 'sparkle', .6); [0, .2, .4, .6].forEach(o => fx('exist', 'pop', .5, o));

  // ---------- 5. ink on a sliver of wood (macro) ----------
  S('slivers', (ctx, lt, dur, t) => {
    ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#6a4a32'], [1, '#3e2a1c']]); ctx.fillRect(0, 0, W, H); K.beam(ctx, [[300, 0], [700, 0], [1000, 720], [400, 720]], .2);
    const z = lerp(1.15, 1.0, ease.out(clamp(lt / dur)));
    ctx.save(); T.cam(ctx, z, 640, 380); K.tablet(ctx, 640, 380, 720, 360, { rot: -.03, seed: 23, reveal: clamp(lt / (dur - .4)), rows: 6 });
    const rv = clamp(lt / (dur - .4)), side = rv < .5 ? -1 : 1, rr = (rv * 2) % 1, row = Math.floor(rr * 6), px = side < 0 ? lerp(-330, -30, (rr * 6) % 1) : lerp(30, 330, (rr * 6) % 1), py = -180 + 18 + row * 330 / 6;
    ctx.save(); ctx.translate(640 + px, 380 + py); ctx.rotate(-.5); ln(ctx, [[0, 0], [80, -150]], 12); ln(ctx, [[0, 0], [80, -150]], 7, '#c9a46a'); sh(ctx, '#1a120c', 2, circ(0, 0, 4)); ctx.restore(); ctx.restore();
    K.tag(ctx, 'around AD 100', 1070, 640, lt, .5);
  });
  fx('slivers', 'scratch', .7, .2, 3.2);

  // ---------- 6. Vindolanda, the edge of the empire ----------
  S('fort', (ctx, lt, dur, t, R) => { const pan = lerp(-60, 50, ease.sine(clamp(lt / dur))); ctx.save(); T.cam(ctx, lerp(1, 1.08, ease.sine(clamp(lt / dur))), 640, 360); V.fortExt(ctx, t, pan); ctx.restore();
    FX.dateTag(ctx, 'VINDOLANDA · c. AD 100'); K.tag(ctx, 'the far northern edge of the Roman Empire', 860, 110, lt, R('edge')); });
  fx('fort', 'birds', .6); mood('fort', 'adventure');

  // ---------- 7-9. the three teasers: beer / socks / birthday ----------
  S('soldier', (ctx, lt, dur, t) => { V.outpost(ctx, t, lerp(0, 30, lt / dur));
    // an empty barrel, tipped; Masclus peers in, then turns to write
    ctx.save(); ctx.translate(760, 600); ctx.rotate(Math.sin(t * 2) * .02); sh(ctx, '#8a5a36', 4.5, c => c.roundRect(-60, -110, 120, 120, 26)); for (const y of [-90, -10]) ln(ctx, [[-60, y], [60, y]], 6, '#5a5a5a'); sh(ctx, '#3a2418', 3, c => c.ellipse(0, -110, 56, 14, 0, 0, TAU)); ctx.restore();
    K.fig(ctx, 560, 660, .82, K.cast('masclus', { t, turn: .5, pose: Gd.pose(lt, [[0, 'idle'], [1.2, 'shrug']]), face: { mouth: 'frown', brows: 'worried', look: [.8, .4] }, light: K.LIGHT.grey }));
    K.fig(ctx, 960, 670, .74, K.cast('tungB', { t, turn: -.4, pose: 'crossed', face: { mouth: 'frown', brows: 'worried', look: [-.5, .4] }, light: K.LIGHT.grey }));
    K.bubble(ctx, 'NO BEER?!', 760, 330, lt, .6, { size: 30 }); });
  fx('soldier', 'boing', .5, .6);
  S('care', (ctx, lt, dur, t) => { V.studio(ctx, t, 0); const k = K.pop(lt, .1);
    ctx.save(); ctx.translate(640, 470); ctx.scale(k, k); sh(ctx, '#c9b48a', 5, c => c.roundRect(-150, -90, 300, 170, 16)); ln(ctx, [[-150, -10], [150, -10]], 9, '#8a5a3a'); ln(ctx, [[0, -90], [0, 80]], 9, '#8a5a3a'); ctx.restore();
    [['sock', -220, 1.0], ['pants', 0, 1.4], ['sock', 220, 1.8]].forEach(([e, dx, at], i) => { const u = lt - at; if (u < 0) return; const up = Math.min(1, u / .5), y = 400 - 180 * Math.sin(up * Math.PI / 2) + (u > .5 ? Math.sin((u - .5) * 3) * 8 : 0), x = 640 + dx * ease.out(up);
      if (e === 'sock') K.sock(ctx, x, y, 1, i ? '#a8392f' : '#c9b48a', Math.sin(u * 4 + i) * .2); else K.pants(ctx, x, y, 1.1, '#e6dcc4', Math.sin(u * 4) * .1); });
    K.tag(ctx, 'socks · underpants', 640, 130, lt, 1.2); });
  [1.0, 1.4, 1.8].forEach(o => fx('care', 'pop', .6, o));
  S('bday', (ctx, lt, dur, t, R) => { V.house(ctx, t, 0);
    K.fig(ctx, 640, 690, .86, K.cast('claudia', { t, turn: .2, prop: 'tablet', pose: Gd.pose(lt, [[0, 'idle'], [.6, 'present']]), face: { mouth: lt > R('handwriting') ? 'grin' : 'smile', eyes: lt > R('handwriting') ? 'happy' : 'open', look: [.4, -.1] }, light: K.LIGHT.night }));
    K.tag(ctx, 'signed in her own hand', 640, 110, lt, R('handwriting') - .2, { fill: '#fde6c4' }); K.confetti(ctx, lt, R('handwriting') + .2, 640, 140, 40); });
  fx('handwriting', 'sparkle', .6);

  // ---------- 10. the cliché: shield wall … charge … record scratch ----------
  S('picture', (ctx, lt, dur, t, R) => {
    const cliche = lt < R('guess'), sh0 = R('shield'), ch = R('charge');
    if (cliche) { ctx.save(); T.cam(ctx, lerp(1, 1.12, lt / R('guess')), 640, 380); V.fortExt(ctx, t, 0, { v: 'dusk', march: false });
      const n = 9; for (let i = 0; i < n; i++) { const go = lt > ch ? (lt - ch) * 240 : 0, x = 180 + i * 110 + go, y = 640 + (i % 2) * 10, k = K.pop(lt, sh0 - .4 + i * .05);
        if (k <= 0) continue; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); K.mini(ctx, 0, 0, 1.6, t, { walk: lt > ch ? 1 : 0, ph: i, mail: true, helmet: true, skin: K.SKINS[i % 6] }); sh(ctx, '#b2342f', 3, c => c.roundRect(-34, -96, 46, 74, 8)); sh(ctx, '#e7bf55', 2, circ(-11, -59, 7)); ctx.restore(); }
      ctx.restore(); K.letterbox(ctx, 1); K.title(ctx, lt > ch ? 'CHARGE!' : 'THE SHIELD WALL', lt, lt > ch ? ch : sh0, { y: 110, size: 58, color: '#ffd166' }); }
    else { V.street(ctx, t, 0); const u = lt - R('guess');
      [['tungA', 330, 'sweeping'], ['tungB', 640, 'writing'], ['tungC', 950, 'carrying']].forEach(([n, x, what], i) => { K.fig(ctx, x, 680, .74, K.cast(n, { t, turn: i === 1 ? 0 : (i ? -.3 : .3), hat: 'none', pose: Gd.pose(u, [[0, 'idle'], [.3 + i * .1, ['think', 'present', 'cheer'][i]]]), prop: ['spear', 'tablet', 'parcel'][i], face: { mouth: 'smile', eyes: i === 1 ? 'half' : 'open' } })); K.tag(ctx, what, x, 380, u, .3 + i * .15, { size: 20 }); });
      K.title(ctx, 'ACTUALLY…', u, .05, { y: 110, size: 56 }); }
  });
  mood('picture', 'adventure'); fx('shield', 'thud', .8); fx('charge', 'whoosh', .8); fx('charge', 'crowd', .6, 0, 1.2); fx('guess', 'boing', .8); fx('guess', 'tick', 1); mood('guess', 'comic');

  // ---------- 11. "for once, we can read it" — Theo with the magnifier ----------
  S('read', (ctx, lt, dur, t) => { V.studio(ctx, t, 0); K.tablet(ctx, 820, 330, 420, 230, { seed: 31, glow: .25 + Math.sin(t * 3) * .05, rot: .03 });
    K.fig(ctx, 420, 700, .9, theoSuit({ t, turn: .45, prop: 'magnifier', pose: 'magnify', talk: K.vtalk(t), face: { mouth: 'grin', brows: 'up', look: [.8, -.2] } })); });
  fx('read', 'ding', .6);

  // ---------- 12. title: a day at the edge of the world (sun arcs morning → night) ----------
  S('sowhat', (ctx, lt, dur, t, R) => {
    const k = clamp(lt / dur), sunA = Math.PI * (1 - k), sx = 640 + Math.cos(sunA) * 520, sy = 560 - Math.sin(sunA) * 420;
    V.fortExt(ctx, t, 0, { v: k > .7 ? 'dusk' : 'day', march: true });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, sx, sy, 260, 'rgba(255,220,150,.7)'); ctx.restore(); sh(ctx, '#ffd36a', 4, circ(sx, sy, 40));
    ctx.save(); ctx.fillStyle = `rgba(20,20,60,${clamp((k - .6) * 1.2) * .45})`; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.title(ctx, 'MORNING  →  NIGHT', lt, .3, { y: 90, size: 54 });
    const m = K.pop(lt, R('mail')); if (m > 0) { const u = lt - R('mail'); ctx.save(); ctx.translate(lerp(200, 1100, clamp(u / 1.6)), 300 - Math.sin(clamp(u / 1.6) * Math.PI) * 140); ctx.rotate(Math.sin(u * 6) * .2); K.tablet(ctx, 0, 0, 120, 70, { seed: 51, scale: m }); ctx.restore(); K.tag(ctx, 'and how did their mail survive?', 640, 620, lt, R('mail') + .2); }
  });
  fx('sowhat', 'rise', .6); fx('mail', 'whoosh', .6); mood('sowhat', 'curious');
})(window);
