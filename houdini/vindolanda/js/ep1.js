/* BEAT 2 (the world before) + BEAT 3 (why anything got written down) */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, V = G.VS, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes, layer, put, PAD } = P, TAU = Math.PI * 2, { S, fx, mood } = G.EP;
  const theo = o => Object.assign({ light: K.LIGHT.warm }, o), MP = V.MP, PL = V.PLACES;

  // ---------- 13. where it is — the empire, Britain at its edge, fog beyond ----------
  S('where', (ctx, lt, dur, t, R) => { const z = lerp(1, 1.5, ease.inOut(clamp(lt / dur)));
    V.mapEurope(ctx, t, lt, { zoom: z, focusXY: [lerp(640, 300, ease.inOut(clamp(lt / dur))), lerp(360, 250, ease.inOut(clamp(lt / dur)))], draw: (c, EP) => {
      const k = K.fadeIn(lt, .4, .8); c.save(); c.globalAlpha = k * .35; c.fillStyle = '#b2342f'; c.beginPath(); c.moveTo(300, 760); c.lineTo(340, 560); c.lineTo(600, 420); c.lineTo(1280, 600); c.lineTo(1280, 760); c.closePath(); c.fill(); c.restore();
      K.tag(c, 'ROMAN EMPIRE', 760, 610, lt, .6, { size: 22 });
      const f = K.fadeIn(lt, R('isnt'), .6); if (f > 0) { c.save(); c.globalAlpha = f * .75; for (let i = 0; i < 6; i++) { const x = EP([.42, .1])[0] + Math.sin(t * .4 + i) * 20 + (i - 3) * 30, y = EP([.42, .1])[1] + (i % 3) * 20; c.fillStyle = '#eef0f2'; c.beginPath(); c.ellipse(x, y, 70, 30, 0, 0, TAU); c.fill(); } c.restore(); K.tag(c, 'not Rome', EP([.42, .1])[0], EP([.42, .1])[1] - 60, lt, R('isnt') + .2, { size: 20, col: '#5a6a7a' }); }
      V.pin(c, EP([.52, .42]), null, lt, 1.2); } }); });
  mood('where', 'adventure'); fx('where', 'whoosh', .5); fx('isnt', 'wind', .4, 0, 2);

  // ---------- 14. AD 43 invasion → four decades → north ----------
  S('invade', (ctx, lt, dur, t, R) => { V.mapBritain(ctx, t, lt, { draw: (c, MP) => {
      V.route(c, [[1180, 760], [1060, 690], MP(PL.kent)], lt, .1, 1.2, { arrow: true, w: 9 }); K.tag(c, 'AD 43', MP(PL.kent)[0] + 80, MP(PL.kent)[1] - 60, lt, .4, { size: 26, fill: '#fde6c4' });
      if (lt > R('north')) { V.route(c, [MP(PL.london), MP([.74, .66]), MP([.62, .55]), MP([.54, .44])], lt, R('north'), 2, { arrow: true, w: 8, col: '#e07a2e' }); } } });
    if (lt > R('decades')) K.counter(ctx, 230, 150, 43, 85, lt, R('decades'), 1.6, 'four decades later', { prefix: 'AD ', size: 72 });
    K.march(ctx, t, 700, 5, .06, .55, { dx: 0 }); });
  fx('invade', 'whoosh', .6); fx('decades', 'tick', .6); fx('north', 'rise', .5);

  // ---------- 15. AD 85: the fort goes up; the Stanegate, coast to coast ----------
  S('y85', (ctx, lt, dur, t, R) => {
    if (lt < R('stanegate')) { V.fortExt(ctx, t, 0, { march: false }); const r = rng(3); for (let i = 0; i < 6; i++) { const x = 360 + i * 110, ph = i; K.mini(ctx, x, 560, .9, t, { mail: true, helmet: i % 2 === 0, skin: K.SKINS[i % 6], ph });
        const a = Math.max(0, Math.sin(t * 6 + ph)); ln(ctx, [[x + 14, 510], [x + 30 + a * 10, 480 - a * 20]], 6, '#7a5233'); } K.tag(ctx, 'c. AD 85', 640, 120, lt, .2, { size: 30, fill: '#fde6c4' }); return; }
    V.mapBritain(ctx, t, lt, { zoom: lerp(1, 2.2, ease.inOut(clamp((lt - R('stanegate')) / 1.2))), focus: 'vindolanda', draw: (c, MP) => {
      const road = [MP(PL.carlisle), MP([.49, .422]), MP(PL.vindolanda), MP(PL.corbridge), MP([.6, .426])]; V.route(c, road, lt, R('stanegate') + .3, 1.6, { w: 6, col: '#c9a46a' });
      if (lt > R('coast')) { V.route(c, [MP(PL.solway), MP(PL.carlisle)], lt, R('coast'), .6, { w: 4, col: '#c9a46a', dash: [6, 6] }); V.route(c, [MP([.6, .426]), MP(PL.tyne)], lt, R('coast'), .6, { w: 4, col: '#c9a46a', dash: [6, 6] }); }
      V.pin(c, MP(PL.vindolanda), 'Vindolanda', lt, R('stanegate') + 1, { size: 12, dy: 18 }); K.tag(c, 'the Stanegate', MP([.53, .44])[0], MP([.53, .44])[1] + 22, lt, R('stanegate') + 1.4, { size: 11 });
      K.tag(c, 'Solway', MP(PL.solway)[0] - 20, MP(PL.solway)[1] + 30, lt, R('coast') + .3, { size: 10 }); K.tag(c, 'Tyne', MP(PL.tyne)[0] + 20, MP(PL.tyne)[1] + 30, lt, R('coast') + .4, { size: 10 }); } }); });
  fx('y85', 'hammer', .5, .3); fx('y85', 'hammer', .5, .9); fx('stanegate', 'whoosh', .4); fx('coast', 'swish', .5);

  // ---------- 16. the name: Vindolanda ≈ "white lawns" ----------
  S('name', (ctx, lt, dur, t, R) => { V.fortExt(ctx, t, lerp(0, 40, lt / dur), { march: true });
    const k = K.fadeIn(lt, R('lawns'), 1.2); if (k > 0) { const r = rng(14); for (let i = 0; i < 260; i++) { const x = r() * W, y = 520 + r() * 200, s = (2 + r() * 4) * k; ctx.fillStyle = 'rgba(255,255,250,.9)'; for (let p = 0; p < 5; p++) { ctx.beginPath(); ctx.arc(x + Math.cos(p / 5 * TAU) * s, y + Math.sin(p / 5 * TAU) * s, s * .8, 0, TAU); ctx.fill(); } } }
    K.title(ctx, 'VINDOLANDA', lt, .2, { y: 110, size: 72 }); K.tag(ctx, '(vin-doh-LAN-dah)', 640, 175, lt, .5, { size: 20 });
    K.tag(ctx, 'Vindolanda ≈ “white lawns” — meaning debated', 640, 640, lt, R('lawns') + .3, { size: 24, fill: '#fde6c4' }); });
  fx('name', 'ding', .5, .2); fx('lawns', 'sparkle', .6);

  // ---------- 17. the headline everyone gets wrong → MYTH CARD ----------
  S('headline', (ctx, lt, dur, t, R) => {
    if (lt < R('noexist')) { V.studio(ctx, t, 0);
      K.fig(ctx, 330, 700, .9, theo({ t, turn: .35, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'idle'], [.5, 'pointUp'], [R('hwall') + .2, 'present']]), face: { mouth: 'grin', brows: lt > R('hwall') ? 'skeptic' : 'up', look: [.7, -.2] } }));
      const k = K.pop(lt, R('hwall') - .1, .3); if (k > 0) { ctx.save(); ctx.translate(820, 340); ctx.rotate(.05 - (1 - k) * .4); ctx.scale(k, k); K.paper(ctx, 0, 0, 520, 380, { fill: '#f1ead8', draw: c => {
        K.txt(c, 'The Daily Scroll', 0, -150, K.DISP(40), OUT, 'center'); ln(c, [[-230, -120], [230, -120]], 3); K.txt(c, 'LETTERS FROM', 0, -80, K.DISP(46), '#b2342f', 'center'); K.txt(c, 'HADRIAN’S WALL!', 0, -30, K.DISP(46), '#b2342f', 'center');
        for (let i = 0; i < 6; i++) ln(c, [[-220, 20 + i * 22], [220 - (i % 3) * 50, 20 + i * 22]], 6, 'rgba(60,40,20,.25)'); K.txt(c, 'NEWS', 0, 165, K.FONT(700, 14), '#8a7a6a', 'center'); } }); ctx.restore(); }
      return; }
    K.mythCard(ctx, lt - R('noexist'), t, { myth: '“Letters from Hadrian’s Wall”', lines: [['Hadrian’s Wall doesn’t exist yet.', .3], ['Construction begins in AD 122,', R('y122') - R('noexist')], ['after Hadrian visits Britain.', R('y122') - R('noexist') + .8]], stamp: 'BUSTED', stampAt: .9 });
  });
  mood('headline', 'comic'); fx('hwall', 'stamp', .7, -.1); fx('hwall', 'paper', .5); fx('noexist', 'stamp', .9, .9);
  // ---------- 18. timeline: fort → letters → wall ----------
  S('y122', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0);
    const x0 = 160, x1 = 1120, yr = y => lerp(x0, x1, (y - 80) / 50); ln(ctx, [[x0, 420], [x1, 420]], 8); ln(ctx, [[x0, 420], [x1, 420]], 4, '#c9a46a');
    [[85, 'fort built', .2], [97, 'the letters', .5], [105, '', .5], [122, 'Wall begins', .8]].forEach(([y, l, at]) => { if (!l) return; const k = K.pop(lt, at); if (k <= 0) return; const x = yr(y); ctx.save(); ctx.translate(x, 420); ctx.scale(k, k); sh(ctx, y === 122 ? '#b2342f' : '#3c5a86', 3.5, circ(0, 0, 14)); ctx.restore(); K.tag(ctx, `AD ${y}`, x, 380, lt, at, { size: 22 }); K.tag(ctx, l, x, 470, lt, at + .1, { size: 20, fill: '#fde6c4' }); });
    const k2 = clamp((lt - .5) / .6); if (k2 > 0) { ctx.save(); ctx.globalAlpha = .5 * k2; ctx.fillStyle = '#f6c945'; ctx.fillRect(yr(97), 404, (yr(105) - yr(97)) * k2, 32); ctx.restore(); }
    if (lt > R('twenty')) { V.route(ctx, [[yr(101), 300], [(yr(101) + yr(122)) / 2, 230], [yr(122), 300]], lt, R('twenty'), 1, { w: 5, col: '#d8433a', arrow: true }); K.tag(ctx, '20–30 years before', (yr(101) + yr(122)) / 2, 200, lt, R('twenty') + .4, { size: 24, fill: '#fde6c4' }); }
    // Hadrian, only mentioned: a silhouette on horseback
    const hk = K.fadeIn(lt, .9, .5); if (hk > 0) { ctx.save(); ctx.globalAlpha = hk * .9; ctx.translate(yr(122) + 20 + (1 - hk) * 60, 600); ctx.fillStyle = '#3a2a30'; ctx.beginPath(); ctx.ellipse(0, -60, 60, 28, 0, 0, TAU); ctx.fill(); for (const lx of [-44, -26, 30, 46]) ctx.fillRect(lx, -40, 8, 46); ctx.beginPath(); ctx.moveTo(50, -76); ctx.lineTo(84, -120); ctx.lineTo(96, -104); ctx.lineTo(64, -60); ctx.fill(); ctx.beginPath(); ctx.arc(-6, -118, 16, 0, TAU); ctx.fill(); ctx.fillRect(-20, -104, 30, 46); ctx.restore(); K.tag(ctx, 'Emperor Hadrian visits', yr(122) + 20, 650, lt, 1.1, { size: 18 }); } });
  fx('y122', 'tick', .5, .2); fx('y122', 'tick', .5, .5); fx('y122', 'tick', .5, .8); fx('twenty', 'swish', .5);
  // ---------- 19. the wall draws itself north of Vindolanda; they're guarding a road ----------
  S('south', (ctx, lt, dur, t, R) => {
    if (lt < R('road')) { V.mapBritain(ctx, t, lt, { zoom: 2.4, focus: 'vindolanda', draw: (c, MP) => {
      V.route(c, [MP(PL.carlisle), MP([.49, .422]), MP(PL.vindolanda), MP(PL.corbridge), MP([.6, .426])], lt, -1, .1, { w: 6, col: '#c9a46a' });
      V.route(c, [MP([.42, .405]), MP([.48, .408]), MP([.53, .405]), MP([.58, .408]), MP([.63, .412])], lt, .6, 2.2, { w: 7, col: '#8a8076', dash: [10, 5] }); K.tag(c, 'Hadrian’s Wall (from AD 122)', MP([.53, .37])[0], MP([.53, .37])[1] - 20, lt, 1.2, { size: 11 });
      V.pin(c, MP(PL.vindolanda), 'Vindolanda', lt, .1, { size: 12, dy: 96 }); } }); return; }
    const u = lt - R('road'); V.fortExt(ctx, t, lerp(0, 60, u / 2), { march: true }); K.stampy = 0; FX.stamp(ctx, 'GUARDING: A ROAD', 640, 150, u - .4, { color: '#c8322a', size: 40, rot: -.08 }); });
  fx('south', 'swish', .5, .6); fx('road', 'stamp', .8, .4);

  // ---------- 20. the second thing: not Italians — auxiliaries ----------
  S('second', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0);
    if (lt < R('aux')) { K.fig(ctx, 640, 700, .95, theo({ t, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'pointUp'], [R('italians'), 'shrug']]), face: { mouth: 'grin', brows: 'up' } })); K.tag(ctx, '#2', 790, 220, lt, .1, { size: 40 });
      if (lt > R('italians')) { K.tag(ctx, 'ITALIANS?', 300, 300, lt, R('italians'), { size: 34 }); K.cross(ctx, 300, 300, 60, lt, R('italians') + .6); } return; }
    const u = lt - R('aux'); ['tungA', 'tungB', 'tungC', 'britonA', 'tungA'].slice(0, 4).forEach((n, i) => { const x = 220 + i * 280, k = K.pop(u, i * .15); if (k <= 0) return; K.fig(ctx, x, 690 + (1 - k) * 200, .8, K.cast(n === 'britonA' ? 'tungB' : n, { t: t + i, turn: (i - 1.5) * .15, pose: ['idle', 'hips', 'crossed', 'thumbsUp'][i], face: { mouth: ['grin', 'smile', 'flat', 'grin'][i] }, light: K.LIGHT.warm, look: i === 3 ? { skin: '#c98f66', hairCol: '#1f1712', beard: 'stubble' } : undefined })); });
    K.title(ctx, 'AUXILIARIES', u, .1, { y: 110, size: 62 }); K.tag(ctx, 'recruited from peoples Rome had already conquered', 640, 180, lt, R('conquered'), { size: 22 }); });
  fx('second', 'pop', .6, .1); fx('italians', 'boing', .5); fx('aux', 'whoosh', .5); fx('conquered', 'ding', .4);
  // ---------- 21. Tungrians (Belgium) and Batavians (Netherlands) → Britain ----------
  S('tung', (ctx, lt, dur, t, R) => { V.mapEurope(ctx, t, lt, { zoom: 1.25, focusXY: [520, 420], draw: (c, EP) => {
      const tg = [600, 500], bt = [660, 410], vin = EP([.52, .42]);
      V.pin(c, tg, 'Tungrians · ≈ Belgium', lt, .3, { size: 16 }); V.route(c, [tg, [480, 420], vin], lt, .8, 1.6, { arrow: true, w: 6 });
      if (lt > R('bata')) { V.pin(c, bt, 'Batavians · ≈ Netherlands', lt, R('bata'), { size: 16, col: '#3c5a86', dy: -10 }); V.route(c, [bt, [520, 330], vin], lt, R('bata') + .5, 1.6, { arrow: true, w: 6, col: '#3c5a86' }); }
      V.pin(c, vin, null, lt, 0); } });
    K.tag(ctx, 'First Cohort of Tungrians (TUNG-ree-uns)', 640, 650, lt, .6, { size: 22 }); });
  fx('tung', 'whoosh', .5, .8); fx('bata', 'whoosh', .5, .5);
  // ---------- 22. a long way from home, where it rains a lot ----------
  S('rains', (ctx, lt, dur, t) => { V.street(ctx, t, 0, { v: 'rain', slant: .45 });
    [['tungA', 420, .3], ['tungB', 640, 0], ['tungC', 860, -.3]].forEach(([n, x, tu], i) => K.fig(ctx, x, 690, .78, K.cast(n, { t: t + i, turn: tu, pose: i === 1 ? 'shrug' : 'crossed', face: { mouth: 'frown', brows: 'worried', eyes: i === 2 ? 'half' : 'open', look: [0, -.6] }, light: K.LIGHT.grey }))); K.rain(ctx, t, 1, 120, .45); });
  fx('rains', 'rain', .6, 0, 2.2);

  // ================= BEAT 3 =================
  S('whymail', (ctx, lt, dur, t) => { V.studio(ctx, t, 0); const r = rng(4); for (let i = 0; i < 14; i++) K.tablet(ctx, 820 + (r() - .5) * 260, 520 - i * 18, 200, 110, { rot: (r() - .5) * .3, seed: i + 3, ink: .7 });
    K.fig(ctx, 380, 700, .92, theo({ t, turn: .4, talk: K.vtalk(t), pose: 'think', face: { mouth: 'smirk', brows: 'skeptic', look: [.8, -.3] } })); K.bubble(ctx, '?', 470, 230, lt, .3, { size: 60 }); });
  mood('whymail', 'quiet');
  S('paper', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0);
    K.fig(ctx, 640, 700, .86, K.cast('clerk', { t, prop: 'tablet', pose: Gd.pose(lt, [[0, 'idle'], [.4, 'present']]), face: { mouth: 'smile', eyes: 'half', look: [.4, .3] }, light: K.LIGHT.night }));
    K.title(ctx, 'PAPERWORK', lt, .3, { y: 100, size: 58 });
    [['counted', 'COUNTED', '#3c5a86'], ['counted', 'FED', '#e07a2e', .7], ['counted', 'CLOTHED', '#6f7a52', 1.6], ['counted', 'PAID', '#c99a3c', 2.6]].forEach(([k, l, col, off], i) => { const at = R(k) + (off || 0); K.tag(ctx, l, 220 + (i % 2) * 840, 260 + Math.floor(i / 2) * 160, lt, at, { size: 30, fill: col, col: '#fff' }); if (lt > R('record') + i * .2) K.tablet(ctx, 220 + (i % 2) * 840, 330 + Math.floor(i / 2) * 160, 110, 60, { seed: i + 60, scale: K.pop(lt, R('record') + i * .2) }); }); });
  [0, .7, 1.6, 2.6].forEach(o => fx('counted', 'pop', .6, o)); fx('record', 'paper', .6);
  S('papy', (ctx, lt, dur, t, R) => {
    if (lt < R('egypt')) { V.studio(ctx, t, 0); const k = K.pop(lt, .1); ctx.save(); ctx.translate(640, 360); ctx.scale(k, k); sh(ctx, '#e8d29a', 4, c => c.roundRect(-260, -120, 520, 240, 6)); for (const s of [-1, 1]) sh(ctx, '#d4b878', 4, c => c.roundRect(s * 270 - 20, -140, 40, 280, 20)); for (let i = 0; i < 6; i++) ln(ctx, [[-220, -80 + i * 32], [200 - (i % 2) * 60, -80 + i * 32]], 5, 'rgba(60,40,20,.4)'); ctx.restore(); K.tag(ctx, 'PAPYRUS', 640, 140, lt, .3, { size: 30 }); return; }
    const u = lt - R('egypt'); ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#7fb5d8'], [.6, '#f6e0b0'], [1, '#e8c88a']]); ctx.fillRect(0, 0, W, H); T.glow(ctx, 1000, 140, 220, 'rgba(255,240,200,.9)');
    for (const [x, s] of [[900, 1], [1080, .7]]) sh(ctx, '#e0b878', 3.5, c => { c.moveTo(x - 150 * s, 520); c.lineTo(x, 520 - 200 * s); c.lineTo(x + 150 * s, 520); c.closePath(); });
    sh(ctx, '#e6c68e', 0, c => c.rect(0, 500, W, 220)); for (let i = 0; i < 6; i++) { ctx.strokeStyle = 'rgba(180,140,80,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 540 + i * 30); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 540 + i * 30 + Math.sin(x * .02 + i + t * .3) * 6); ctx.stroke(); }
    ctx.save(); ctx.translate(420, 600); ctx.rotate(-.1); sh(ctx, '#e8d29a', 4, c => c.roundRect(-120, -40, 240, 80, 6)); ctx.restore(); K.tag(ctx, 'survives in the dry sands of Egypt', 420, 450, u, .3, { size: 22 }); K.tick(ctx, 600, 560, 40, u, .8); });
  fx('egypt', 'wind', .4, 0, 3); fx('egypt', 'ding', .5, .8);
  S('nopapy', (ctx, lt, dur, t) => { V.street(ctx, t, 0, { v: 'rain' }); const k = K.pop(lt, .3); ctx.save(); ctx.translate(640, 330); ctx.scale(k, k); for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .25; ln(ctx, [[0, 140], [Math.cos(a) * 30, 0]], 6, '#4f7a3c'); sh(ctx, '#6f9f40', 3, c => c.ellipse(Math.cos(a) * 40, Math.sin(a) * 60, 10, 34, a + Math.PI / 2, 0, TAU)); } ctx.restore(); K.cross(ctx, 640, 330, 110, lt, 1.1); K.tag(ctx, 'no papyrus in Britain', 640, 560, lt, .8, { size: 26 }); });
  fx('nopapy', 'rain', .4, 0, 3.4); fx('nopapy', 'boing', .5, 1.1);
  // ---------- leaves of wood: postcard-size, < 2 mm thick, then ink ----------
  S('around', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0);
    if (lt < R('postcard')) { ctx.save(); ctx.translate(640, 520); sh(ctx, '#a07850', 5, c => c.ellipse(0, 0, 260, 60, 0, 0, TAU)); sh(ctx, '#c9a46a', 4, c => c.ellipse(-250, 0, 26, 58, 0, 0, TAU)); for (let i = 0; i < 5; i++) { const k = clamp((lt - .3 - i * .4) / .5); if (k <= 0) continue; ctx.save(); ctx.translate(-150 + i * 70, -80 - k * 120); ctx.rotate(-.3 + k * .3); K.tablet(ctx, 0, 0, 160, 90, { ink: 0, seed: i + 70 }); ctx.restore(); } ctx.restore();
      K.fig(ctx, 1040, 700, .8, K.cast('tungA', { t, hat: 'none', pose: Gd.pose(lt, [[0, 'pointSideL']]), face: { mouth: 'smile', look: [-.8, .2] }, light: K.LIGHT.night })); K.tag(ctx, 'thin leaves of wood', 640, 130, lt, .4, { size: 26 }); return; }
    if (lt < R('tenth')) { const u = lt - R('postcard'); K.tablet(ctx, 460, 360, 330, 190, { ink: 0, seed: 71, scale: K.pop(u, 0) }); K.paper(ctx, 860, 360, 330, 190, { scale: K.pop(u, .3), fill: '#fbf6ea', draw: c => { K.txt(c, 'POSTCARD', 0, -60, K.FONT(700, 26), OUT, 'center'); for (let i = 0; i < 3; i++) ln(c, [[20, -10 + i * 30], [140, -10 + i * 30]], 3, 'rgba(0,0,0,.3)'); sh(c, '#d8433a', 3, cc => cc.rect(100, -80, 44, 50)); } }); K.tag(ctx, '≈ postcard-sized', 660, 560, u, .6, { size: 26 }); return; }
    if (lt < R('ink')) { const u = lt - R('tenth'); ctx.save(); ctx.translate(640, 360); sh(ctx, '#7a5233', 3, c => c.rect(-380, -6, 760, 12)); ctx.restore(); ln(ctx, [[260, 300], [260, 420]], 3); ln(ctx, [[1020, 300], [1020, 420]], 3); K.counter(ctx, 640, 200, 0, 2, u, .2, .5, 'often less than 1/10 inch thick', { prefix: '< ', suffix: ' mm', size: 80 }); return; }
    const u = lt - R('ink'); K.tablet(ctx, 640, 380, 600, 300, { seed: 72, reveal: clamp(u / 1.6) }); sh(ctx, '#2a1a10', 4, c => c.ellipse(1010, 560, 46, 26, 0, 0, TAU)); sh(ctx, '#1a120c', 0, c => c.ellipse(1010, 552, 34, 14, 0, 0, TAU)); K.tag(ctx, 'and write on them in ink', 640, 140, u, .2, { size: 26 }); });
  fx('around', 'scratch', .5, .4, 1.5); fx('postcard', 'pop', .5); fx('tenth', 'tick', .7); fx('ink', 'scratch', .6, 0, 1.6); mood('around', 'curious');
  // ---------- thrown out, bonfires ----------
  S('throwout', (ctx, lt, dur, t, R) => { V.street(ctx, t, 0);
    sh(ctx, '#6a4a30', 4, c => { c.moveTo(250, 690); c.quadraticCurveTo(400, 560, 560, 690); c.closePath(); }); const r = rng(9); for (let i = 0; i < 9; i++) K.tablet(ctx, 330 + r() * 160, 640 - r() * 60, 90, 50, { rot: (r() - .5), seed: i, ink: .6 });
    for (let i = 0; i < 4; i++) { const u = ((lt - .2 - i * .35)); if (u < 0 || u > .7) continue; const x = lerp(760, 420, u / .7), y = 420 - Math.sin(u / .7 * Math.PI) * 160 + 200 * (u / .7); K.tablet(ctx, x, y, 90, 50, { rot: u * 10, seed: i + 30, ink: .6 }); }
    K.fig(ctx, 860, 700, .78, K.cast('tungB', { t, hat: 'none', pose: Gd.pose(lt, [[0, 'idle'], [.1, 'pointSideL'], [.5, 'idle'], [.6, 'pointSideL']]), face: { mouth: 'flat', eyes: 'half' } }));
    if (lt > R('bonfire')) { const k = ease.out(clamp((lt - R('bonfire')) / .6)); G.Paint2.fire(ctx, 1215, 705, .68 * k, t); K.smoke(ctx, t, 1215, 500, .45 * k); } });
  [.2, .55, .9, 1.25].forEach(o => fx('throwout', 'swish', .4, o)); fx('bonfire', 'fire', .6, 0, 4);
  // ---------- wood rots, ink fades … but Vindolanda is wet ----------
  S('rots', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0); const k = clamp(lt / (R('fades') + 1)); K.tablet(ctx, 640, 360, 520, 260, { seed: 81, ink: .85 * (1 - clamp((lt - R('fades')) / .9)), worn: true, wood: G.Guide.hexMul('#6b4a2e', 1 - k * .35) });
    const r = rng(3); for (let i = 0; i < 18; i++) { const a = clamp((lt - .1 - i * .05) / .4); if (a <= 0) continue; sh(ctx, ['#7a8a5a', '#9aa070', '#5a6a4a'][i % 3], 2, circ(400 + r() * 480, 250 + r() * 220, 6 + r() * 14 * a)); }
    K.tag(ctx, 'wood rots', 400, 140, lt, .2, { size: 28 }); K.tag(ctx, 'ink fades', 880, 140, lt, R('fades'), { size: 28 }); });
  fx('rots', 'rumble', .3, 0, 1.2);
  const P2 = G.Paint2, storm = layer('v-storm', g => { P2.overcast(g, [[0, '#3c4656'], [.2, '#5a6676'], [.3, '#7a8694'], [1, '#8a94a0']], 61, [640, 260]); }),
    strataL = layer('v-strata2', g => { P2.strata(g, 205, 600, { seed: 23, n: 7, pebbles: 140, roots: 14 }); }),
    clayL = layer('v-clay', g => { g.fillStyle = grad(g, 0, 585, 0, H, [[0, '#4e5860'], [1, '#2e363c']]); g.fillRect(-PAD, 585, W + PAD * 2, 140); P2.grain(g, -PAD, 585, W + PAD * 2, 140, .5, 4, 'overlay', .8);
      P2.pebbles(g, -PAD, 600, W + PAD * 2, 110, 70, 9, { min: 3, var: 6, cols: ['#6a7278', '#565e64', '#7a8288', '#4a5258'] }); g.strokeStyle = 'rgba(20,24,28,.7)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-PAD, 590); for (let x = -PAD; x <= W + PAD; x += 20) g.lineTo(x, 590 + Math.sin(x * .01) * 4); g.stroke(); });
  S('wetfort', (ctx, lt, dur, t, R) => {
    if (lt < R('layers')) { V.fortExt(ctx, t, 0, { v: 'rain', march: false }); return; }
    const u = lt - R('layers'); put(ctx, storm, 0, 0); K.rain(ctx, t, .7, 80);
    const n = 7; for (let i = 0; i < n; i++) { const k = ease.out(clamp((u - i * .45) / .6)), y0 = 200 + i * 57, y1 = i === n - 1 ? 600 : y0 + 60; if (k <= 0) continue; ctx.save(); ctx.globalAlpha = k; ctx.beginPath(); ctx.rect(0, y0 - (1 - k) * 60, W, y1 - y0 + 4); ctx.clip(); ctx.drawImage(strataL, -PAD, -(1 - k) * 60); ctx.restore(); }
    put(ctx, clayL, 0, 0); const r = rng(7); for (let i = 0; i < 5; i++) K.tablet(ctx, 220 + i * 210, 640 + (r() - .5) * 30, 120, 60, { rot: (r() - .5) * .4, seed: i + 90, ink: .7, worn: true }); K.shoe(ctx, 1150, 620, .8);
    K.rain(ctx, t, .8, 120, .1);
    if (lt > R('oxygen')) { const v = lt - R('oxygen'); for (let i = 0; i < 6; i++) { const y = lerp(120, 520, ((v * .5 + i / 6) % 1)), x = 200 + i * 170; const blocked = y > 480; sh(ctx, blocked ? 'rgba(200,220,255,.4)' : 'rgba(200,230,255,.9)', 2.5, circ(x, Math.min(y, 482), 18)); K.txt(ctx, 'O₂', x, Math.min(y, 482), K.FONT(700, 16), '#3a5a7a', 'center'); }
      ln(ctx, [[0, 500], [W, 500]], 6, 'rgba(255,255,255,.5)'); K.tag(ctx, 'NO OXYGEN', 640, 650, v, .4, { size: 30, fill: '#fde6c4' }); for (let i = 0; i < 4; i++) { const bx = 250 + i * 260 + Math.sin(t * 3 + i) * 20; ctx.save(); ctx.translate(bx, 470 + Math.abs(Math.sin(t * 4 + i)) * -10); sh(ctx, '#8a6a4a', 2.5, c => c.ellipse(0, 0, 14, 8, 0, 0, TAU)); for (const s of [-1, 1]) ln(ctx, [[s * 6, 4], [s * 12, 12]], 2); ctx.restore(); } }
    K.tag(ctx, 'damp, compacted earth', 640, 240, u, .3, { size: 24 }); });
  fx('wetfort', 'rain', .5, 0, 2); fx('layers', 'thud', .5, 0); fx('layers', 'thud', .5, .45); fx('layers', 'thud', .5, .9); fx('oxygen', 'boing', .4, .6);
  S('wrote1', (ctx, lt, dur, t, R) => { if (lt < R('kept')) { K.wroteSting(ctx, lt, t, { text: 'Somebody wrote it down.' }); return; } const u = lt - R('kept');
    ctx.save(); ctx.translate(0, -205 * 1.83); ctx.scale(1, 1.83); ctx.drawImage(strataL, -PAD, -1); ctx.restore(); ctx.fillStyle = 'rgba(20,10,4,.25)'; ctx.fillRect(0, 0, W, H); K.tablet(ctx, 640, 380, 380, 200, { seed: 7, glow: .3 + Math.sin(t * 3) * .1 }); K.title(ctx, '…AND THE GROUND KEPT IT.', u, .1, { y: 140, size: 50 }); });
  fx('wrote1', 'wrote', .9); fx('kept', 'sparkle', .5);
})(window);
