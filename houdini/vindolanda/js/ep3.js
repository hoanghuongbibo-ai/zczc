/* BEAT 6 (the beer letter — myth-bust) + BEAT 7 (afternoon: the care package) */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, V = G.VS, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, { S, fx, mood } = G.EP;
  const aux = o => K.cast('theoAux', Object.assign({ light: K.LIGHT.warm }, o)), theo = o => Object.assign({ light: K.LIGHT.warm }, o);
  const AUXLOOK = { outfit: 'auxiliary' };
  function barrel(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sh(ctx, '#8a5a36', 4.5, c => c.roundRect(-60, -110, 120, 120, 26)); for (let i = 0; i < 4; i++) ln(ctx, [[-40 + i * 27, -104], [-40 + i * 27, 4]], 2, 'rgba(0,0,0,.25)'); for (const yy of [-90, -10]) ln(ctx, [[-60, yy], [60, yy]], 6, '#5a5a5a'); sh(ctx, '#3a2418', 3, c => c.ellipse(0, -110, 56, 14, 0, 0, TAU)); ctx.restore(); }

  // ---------- 51. the outpost; something terrible has happened ----------
  S('decurion', (ctx, lt, dur, t, R) => { const drama = lt > R('terrible'); ctx.save(); if (drama) T.cam(ctx, lerp(1, 1.35, ease.out(clamp((lt - R('terrible')) / .6))), 760, 520); V.outpost(ctx, t, 0);
    barrel(ctx, 760, 620, 1, drama ? Math.sin(t * 20) * .02 : 0);
    K.fig(ctx, 520, 690, .8, K.cast('masclus', { t, turn: .4, pose: Gd.pose(lt, [[0, 'hips'], [R('terrible'), 'facepalm']]), face: drama ? { mouth: 'shock', eyes: 'wide', brows: 'up', look: [.8, .4] } : { mouth: 'smile', brows: 'sly' }, light: K.LIGHT.grey }));
    K.fig(ctx, 330, 700, .7, K.cast('tungA', { t: t + 2, outfit: 'decurion', hat: 'cavHelmet', turn: .3, pose: drama ? 'shrug' : 'idle', face: drama ? { mouth: 'o', eyes: 'wide' } : { mouth: 'smile' }, light: K.LIGHT.grey }));
    K.fig(ctx, 980, 700, .7, K.cast('tungC', { t: t + 4, outfit: 'decurion', hat: 'cavHelmet', turn: -.3, pose: drama ? 'facepalm' : 'crossed', face: drama ? { mouth: 'frown', brows: 'worried' } : { mouth: 'flat', eyes: 'half' }, light: K.LIGHT.grey }));
    ctx.restore(); K.letterbox(ctx, drama ? clamp((lt - R('terrible')) / .3) : 0);
    if (!drama) K.tag(ctx, 'out on duty, away from the main fort', 640, 120, lt, R('outduty'), { size: 24 }); else K.title(ctx, 'THE BARREL IS EMPTY', lt, R('terrible') + .4, { y: 120, size: 50, color: '#ff8a6a' }); });
  mood('decurion', 'comic'); fx('terrible', 'stamp', .8); fx('terrible', 'thud', .6, .4); mood('terrible', 'quiet', .1);
  // ---------- 52. he writes to Cerialis, "his king" ----------
  S('writes', (ctx, lt, dur, t, R) => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W / 2 - 4, H); ctx.clip(); V.outpost(ctx, t, 200, { rain: .35 }); K.fig(ctx, 320, 700, .78, K.cast('masclus', { t, prop: 'stylus', turn: .3, pose: 'present', face: { mouth: lt > R('flourish') ? 'grin' : 'flat', brows: lt > R('flourish') ? 'sly' : 'worried', look: [.5, .4] }, light: K.LIGHT.grey })); K.tablet(ctx, 470, 560, 150, 84, { seed: 628, reveal: clamp(lt / 3) }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(W / 2 + 4, 0, W / 2, H); ctx.clip(); V.house(ctx, t, -300); K.fig(ctx, 960, 700, .8, K.cast('cerialis', { t, prop: 'tablet', turn: -.3, pose: 'present', face: { mouth: lt > R('king') ? 'smirk' : 'flat', eyes: 'half', brows: 'skeptic', look: [-.3, .2] }, light: K.LIGHT.night }));
      if (lt > R('king')) { const k = K.pop(lt, R('king')), b = FX.dropBounce(lt - R('king'), 60, .3); ctx.save(); ctx.translate(960, 330 - b); ctx.scale(k, k); sh(ctx, '#e3b440', 4, c => { c.moveTo(-50, 30); c.lineTo(-56, -14); c.lineTo(-28, 8); c.lineTo(0, -30); c.lineTo(28, 8); c.lineTo(56, -14); c.lineTo(50, 30); c.closePath(); }); ctx.restore(); } ctx.restore();
    ln(ctx, [[W / 2, 0], [W / 2, H]], 8); K.tag(ctx, 'Masclus', 320, 120, lt, .2, { size: 24 }); K.tag(ctx, 'Flavius Cerialis, commander', 960, 120, lt, .5, { size: 22 });
    K.tag(ctx, '“to his king”', 960, 230, lt, R('king') + .1, { size: 28, fill: '#fde6c4' });
    if (lt > R('flourish')) { K.paper(ctx, 320, 320, 420, 150, { rot: -.03, scale: K.pop(lt, R('flourish')), draw: c => { K.txt(c, '☐ a very Roman flourish', -180, -30, K.FONT(700, 24)); K.txt(c, '☐ buttering up the boss', -180, 20, K.FONT(700, 24)); if (lt > R('flourish') + 2.6) K.tick(c, -165, 20, 16, lt, R('flourish') + 2.6); } }); } });
  fx('writes', 'scratch', .6, 0, 2.4); fx('king', 'sparkle', .6); fx('flourish', 'paper', .5); fx('flourish', 'pop', .5, 2.6);
  // ---------- 53. the bad news, in the edition's translation (Tab. Vindol. 628) ----------
  S('badnews', (ctx, lt, dur, t, R) => { V.house(ctx, t, 0); ctx.save(); ctx.globalAlpha = .45; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.quote(ctx, lt, R('beer') - .2, 'My fellow-soldiers have no beer.', 'Tab. Vindol. 628', { y: 300, size: 46 });
    K.tag(ctx, '…and he asks for some to be sent.', 640, 520, lt, R('sendsome'), { size: 28 }); barrel(ctx, 1110, 690, .8, Math.sin(t * 2) * .03); });
  fx('beer', 'paper', .5, -.2); fx('nobody', 'tuba', .9, -.6);
  // ---------- 54. the punchier version online → MYTH CARD ----------
  S('nobody', (ctx, lt, dur, t, R) => {
    if (lt < R('pubtrans')) { V.studio(ctx, t, 0); K.fig(ctx, 300, 700, .9, aux({ t, turn: .35, prop: null, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'think'], [R('punchier'), 'pointSide'], [R('great'), 'thumbsUp'], [R('news'), 'present']]), face: { mouth: 'smirk', brows: 'sly', look: [.7, -.1] } }));
      if (lt > R('punchier')) { const k = K.pop(lt, R('punchier')); ctx.save(); ctx.translate(840, 360); ctx.scale(k, k); sh(ctx, '#1d1a20', 6, c => c.roundRect(-230, -300, 460, 600, 36)); ctx.fillStyle = '#f4f6f8'; ctx.beginPath(); ctx.roundRect(-214, -284, 428, 568, 26); ctx.fill();
        K.txt(ctx, '🔥 VIRAL', -190, -250, K.FONT(700, 20), '#d8433a'); K.txt(ctx, 'Roman soldier’s letter:', -190, -210, K.FONT(700, 22), OUT);
        if (lt > R('quote')) { const lines = K.wrap(ctx, '“If you do not send me more beer, I cannot answer for the men.”', K.FONT(700, 30), 380); lines.forEach((l, i) => K.txt(ctx, l, -190, -150 + i * 40, K.FONT(700, 30), '#b2342f')); }
        if (lt > R('news')) for (let i = 0; i < 3; i++) { sh(ctx, '#e6e9ee', 2, c => c.roundRect(-190, 60 + i * 66, 380, 54, 8)); ln(ctx, [[-170, 80 + i * 66], [100, 80 + i * 66]], 6, 'rgba(0,0,0,.3)'); ln(ctx, [[-170, 98 + i * 66], [40, 98 + i * 66]], 4, 'rgba(0,0,0,.18)'); }
        ctx.restore(); }
      if (lt > R('great')) K.tag(ctx, 'great line!', 300, 250, lt, R('great'), { size: 28 }); return; }
    K.mythCard(ctx, lt - R('pubtrans'), t, { myth: '“If you do not send me more beer, I cannot answer for the men.”', lines: [['It isn’t in the published translation.', .2], ['Popular quote ≠ published translation', .9, '#b2342f'], ['The real Masclus: less a threat,', R('polite') - R('pubtrans')], ['more a polite workplace email.', R('polite') - R('pubtrans') + 1.4]], stamp: 'BUSTED', stampAt: .7, theoLook: AUXLOOK }); });
  mood('nobody', 'comic'); fx('punchier', 'ping', .7); fx('quote', 'rise', .4); fx('great', 'pop', .5); fx('news', 'paper', .5); fx('pubtrans', 'stamp', .9, .7);
  // ---------- 56. cervesa: a Celtic word; beer country vs wine country ----------
  S('cerv', (ctx, lt, dur, t, R) => {
    if (lt < R('northeu')) { V.studio(ctx, t, 0); K.title(ctx, 'CERVESA', lt, .1, { y: 260, size: 100, color: '#f6c945' }); K.tag(ctx, '(ker-WAY-sa) · “beer”', 640, 360, lt, .5, { size: 28 });
      K.tag(ctx, 'a CELTIC word, not a Latin one', 640, 450, lt, R('celtic'), { size: 30, fill: '#d8f0c8' }); K.tick(ctx, 900, 450, 26, lt, R('sense') + .2);
      for (let i = 0; i < 3; i++) { const k = K.pop(lt, .3 + i * .1); ctx.save(); ctx.translate(250 + i * 390, 600 + Math.sin(t * 2 + i) * 6); ctx.scale(k * .8, k * .8); sh(ctx, '#c98a4e', 4, c => c.roundRect(-40, -60, 80, 110, 12)); sh(ctx, '#f6c945', 0, c => c.rect(-32, -40, 64, 82)); sh(ctx, '#fff', 3, c => c.ellipse(0, -60, 46, 18, 0, 0, TAU)); ln(ctx, [[40, -30], [66, -24], [66, 20], [40, 26]], 8); ctx.restore(); } return; }
    V.mapEurope(ctx, t, lt, { draw: (c, EP) => { const u = lt - R('northeu');
      [[EP([.55, .5]), 0], [520, 560, .2], [760, 400, .4], [960, 360, .6]].forEach((p, i) => { const xy = Array.isArray(p[0]) ? p[0] : [p[0], p[1]], at = Array.isArray(p[0]) ? p[1] : p[2], k = K.pop(u, at); if (k <= 0) return; c.save(); c.translate(xy[0], xy[1] + Math.sin(t * 3 + i) * 4); c.scale(k * .5, k * .5); sh(c, '#c98a4e', 4, cc => cc.roundRect(-40, -60, 80, 110, 12)); sh(c, '#f6c945', 0, cc => cc.rect(-32, -40, 64, 82)); sh(c, '#fff', 3, cc => cc.ellipse(0, -60, 46, 18, 0, 0, TAU)); c.restore(); });
      const gk = K.pop(u, 1); if (gk > 0) { c.save(); c.translate(1070, 640); c.scale(gk, gk); for (let i = 0; i < 9; i++) sh(c, '#8a3a8a', 2.5, circ((i % 3 - 1) * 16 + (Math.floor(i / 3) % 2) * 8, Math.floor(i / 3) * 14, 9)); ln(c, [[0, -14], [6, -30]], 4, '#4f7a3c'); c.restore(); }
      K.tag(c, 'beer country', 700, 290, u, .7, { size: 22 }); K.tag(c, 'wine country', 1070, 590, u, 1.1, { size: 20 }); } }); });
  fx('cerv', 'ding', .5, .1); fx('celtic', 'pop', .5); fx('northeu', 'swish', .5); mood('cerv', 'warm');
  // ---------- 57. 2017: a new batch of 25 tablets — and Masclus again ----------
  S('best', (ctx, lt, dur, t, R) => { V.dig(ctx, t, 0); for (let i = 0; i < 25; i++) { const k = K.pop(lt, R('y2017') - R('best') + .3 + i * .06); if (k <= 0) continue; const x = 140 + (i % 9) * 125, y = 420 + Math.floor(i / 9) * 90; K.tablet(ctx, x, y, 100, 56, { seed: 300 + i, rot: (i % 3 - 1) * .1, scale: k, glow: i === 12 && lt > R('again') ? .5 : 0 }); }
    K.fig(ctx, 1140, 360, .55, K.cast('digger', { t, look: { skin: '#e9b896', hairCol: '#2a1a10', beard: 'stubble' }, pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } }));
    K.counter(ctx, 400, 130, 0, 25, lt, R('y2017') - R('best') + .3, 1.4, 'new tablets found in 2017', { size: 70, prefix: '≈ ' });
    if (lt > R('again')) { K.tag(ctx, 'MASCLUS', 140 + 3 * 125, 440, lt, R('again') + .3, { size: 26, fill: '#fde6c4' }); }
    if (lt > R('leave')) { K.paper(ctx, 860, 250, 380, 140, { rot: .03, scale: K.pop(lt, R('leave')), draw: c => { K.txt(c, 'applying for LEAVE', 0, -14, K.DISP(32), '#3c5a86', 'center'); K.txt(c, '(time off)', 0, 30, K.FONT(700, 22), OUT, 'center'); } }); } });
  mood('best', 'adventure'); fx('y2017', 'sparkle', .6, .3); fx('again', 'ding', .7, .3); fx('leave', 'pop', .6);
  // ---------- 58. BEER + VACATION: the most famous Roman at this fort ----------
  S('centuries', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); if (lt > R('famous')) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .3; ctx.fillStyle = grad(ctx, 0, 0, 0, 700, [[0, '#fff2c8'], [1, 'rgba(0,0,0,0)']]); ctx.beginPath(); ctx.moveTo(600, -10); ctx.lineTo(680, -10); ctx.lineTo(900, 720); ctx.lineTo(380, 720); ctx.fill(); ctx.restore(); }
    K.fig(ctx, 640, 700, 1, K.cast('masclus', { t, hat: 'none', pose: Gd.pose(lt, [[0, 'idle'], [R('famous'), 'cheer']]), face: lt > R('famous') ? { mouth: 'grin', eyes: 'happy', brows: 'up' } : { mouth: 'smile', brows: 'sly' }, light: K.LIGHT.night, hair: Gd.hairRing(lt - R('famous'), .4) }));
    [['BEER', 310, '#c99a3c', R('reqbeer')], ['VACATION', 970, '#3c5a86', R('reqleave')]].forEach(([l, x, col, at]) => { K.tablet(ctx, x, 470, 260, 150, { seed: l.length * 31, scale: K.pop(lt, .2), rot: x < 640 ? -.05 : .05 }); K.tag(ctx, l, x, 360, lt, Math.min(at, .6), { size: 34, fill: col, col: '#fff' }); if (lt > at) K.tick(ctx, x + 120, 360, 20, lt, at); });
    K.title(ctx, 'MOST FAMOUS ROMAN AT THE FORT', lt, R('famous'), { y: 100, size: 46 }); });
  fx('famous', 'confetti', .6); fx('reqbeer', 'pop', .5); fx('reqleave', 'pop', .5);
  S('wrote3', (ctx, lt, dur, t, R) => K.wroteSting(ctx, lt, t, { extra: [['TWICE.', R('twice')]] })); fx('wrote3', 'wrote', .9); fx('twice', 'stamp', .8);

  // ================= BEAT 7 =================
  S('afternoon', (ctx, lt, dur, t) => { V.fortExt(ctx, t, lerp(-30, 30, lt / dur), { march: false }); const u = clamp(lt / 2.4);
    K.mini(ctx, lerp(1400, 760, ease.out(u)), 630, .95, t, { walk: u < 1 ? 1 : 0, dir: -1, cloth: '#d97a3a', carry: true, ph: 1 });
    K.fig(ctx, 560, 690, .7, aux({ t, prop: lt > 2.6 ? 'parcel' : null, turn: .45, pose: Gd.pose(lt, [[0, 'idle'], [2.4, 'present']]), face: lt > 2.6 ? { mouth: 'grin', eyes: 'happy', brows: 'up' } : { mouth: 'smile', look: [.8, 0] } }));
    K.tag(ctx, 'MAIL!', 760, 380, lt, 2.5, { size: 30, fill: '#fde6c4' }); });
  mood('afternoon', 'warm'); fx('afternoon', 'pop', .6, 2.5);
  S('first1973', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); K.tablet(ctx, 520, 370, 560, 300, { seed: 346, glow: .25, scale: K.pop(lt, 0), rows: 6 });
    K.paper(ctx, 1030, 260, 360, 190, { rot: .03, scale: K.pop(lt, .4), draw: c => { K.txt(c, 'Tab. Vindol. 346', 0, -50, K.FONT(700, 24), '#b2342f', 'center'); K.txt(c, 'the very FIRST tablet', 0, -10, K.FONT(700, 24), OUT, 'center'); K.txt(c, 'found in 1973', 0, 30, K.FONT(700, 22), OUT, 'center'); } });
    K.tag(ctx, 'from somebody — probably family', 1030, 470, lt, R('family'), { size: 22 }); });
  fx('first1973', 'paper', .5); fx('family', 'pop', .4);
  S('socks', (ctx, lt, dur, t) => { V.barracks(ctx, t, 0); sh(ctx, '#c9b48a', 5, c => c.roundRect(470, 560, 340, 120, 14)); ln(ctx, [[470, 600], [810, 600]], 8, '#8a5a3a');
    const items = [[467.32, 'sock', 300, 0], [467.6, 'sock', 420, 1], [469.11, 'sandal', 620, 0], [469.5, 'sandal', 760, 1], [470.62, 'pants', 980, 0], [470.9, 'pants', 1100, 1]];
    items.forEach(([at, kind, x, j]) => { const u = t - at; if (u < 0) return; const up = Math.min(1, u / .45), y = 560 - 260 * Math.sin(up * Math.PI / 2) + (u > .45 ? Math.sin((u - .45) * 3 + j) * 8 : 0), xx = lerp(640, x, ease.out(up));
      if (kind === 'sock') K.sock(ctx, xx, y, 1.1, j ? '#a8392f' : '#c9b48a', Math.sin(u * 3 + j) * .2); else if (kind === 'sandal') K.sandal(ctx, xx, y, 1, Math.sin(u * 3) * .2); else K.pants(ctx, xx, y, 1.15, j ? '#c9d6e8' : '#e6dcc4', Math.sin(u * 3 + j) * .1); });
    K.quote(ctx, lt, .2, '…pairs of socks… two pairs of sandals and two pairs of underpants…', 'Tab. Vindol. 346', { y: 120, size: 28, w: 900 }); });
  fx('socks', 'pop', .6, .1); fx('socks', 'pop', .6, .4); fx('sandals', 'pop', .6, .52); fx('sandals', 'pop', .6, .9); fx('underpants', 'boing', .7, .51); fx('underpants', 'pop', .6, .8);
  S('hello', (ctx, lt, dur, t, R) => { V.barracks(ctx, t, 0);
    if (lt < R('messmates')) { K.paper(ctx, 640, 360, 600, 420, { rot: -.02, draw: c => { K.txt(c, 'say hello to…', 0, -160, K.FONT(700, 30), '#b2342f', 'center'); const r = rng(5); for (let i = 0; i < 6; i++) { const a = K.fadeIn(lt, .4 + i * .3); c.globalAlpha = a; ln(c, [[-200, -100 + i * 44], [-200 + 160 + r() * 200, -100 + i * 44]], 8, 'rgba(60,40,20,.35)'); c.globalAlpha = 1; } } }); return; }
    const u = lt - R('messmates'); [['tungA', 330], ['tungB', 520], ['theo', 720], ['tungC', 920]].forEach(([n, x], i) => { const o = { t: t + i, hat: 'none', turn: (i - 1.5) * .15, pose: Gd.pose(u, [[0, 'idle'], [.2 + i * .1, 'cheer']]), face: { mouth: 'grin', eyes: 'happy', brows: 'up' }, hair: Gd.hairRing(u - .2 - i * .1, .4), light: K.LIGHT.grey }; K.fig(ctx, x, 700, .76, n === 'theo' ? aux(Object.assign(o, { prop: null })) : K.cast(n, o)); });
    K.tag(ctx, '“all your messmates”', 640, 120, u, .1, { size: 30, fill: '#fde6c4' }); if (lt > R('fortune')) { K.tag(ctx, '…in the greatest good fortune', 640, 190, lt, R('fortune'), { size: 26 }); const r = rng(8); for (let i = 0; i < 20; i++) { const a = Math.sin(t * 4 + i); if (a > 0) sh(ctx, '#fff2a8', 0, circ(150 + r() * 980, 220 + r() * 300, 4 * a)); } } });
  fx('messmates', 'confetti', .5, .3); fx('fortune', 'sparkle', .6);
  S('thatsit', (ctx, lt, dur, t, R) => {
    if (lt < R('mom2')) { V.barracks(ctx, t, 0); K.fig(ctx, 640, 700, 1, aux({ t, prop: null, hat: 'none', pose: 'present', face: { mouth: 'flat', eyes: 'half' } })); K.pants(ctx, 790, 440, 1, '#e6dcc4', Math.sin(t * 2) * .08); K.title(ctx, 'THAT’S IT.', lt, .1, { y: 110, size: 60 }); return; }
    const u = lt - R('mom2'); ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#8fb3d8'], [1, '#c8d8e8']]); ctx.fillRect(0, 0, W, H); sh(ctx, '#7a8aa0', 0, c => c.rect(0, 520, W, 200)); sh(ctx, '#d8433a', 4, c => c.roundRect(100, 300, 240, 200, 10)); sh(ctx, '#3c5a86', 4, c => c.rect(900, 120, 220, 160)); K.txt(ctx, 'GO TEAM', 1010, 200, K.DISP(30), '#fff', 'center');
    K.fig(ctx, 520, 700, .9, theo({ t, outfit: 'explorer', hat: 'none', turn: .2, pose: 'present', face: { mouth: 'grin', eyes: 'happy' } }));
    ctx.save(); ctx.translate(780, 520); sh(ctx, '#c9a46a', 4, c => c.roundRect(-110, -70, 220, 140, 10)); K.txt(ctx, 'FROM: MOM', 0, -30, K.FONT(700, 22), OUT, 'center'); ctx.restore();
    for (let i = 0; i < 3; i++) K.sock(ctx, 720 + i * 60, 400 - Math.abs(Math.sin(t * 3 + i)) * 10, .7, ['#3c5a86', '#d8433a', '#6f7a52'][i], -.2 + i * .1);
    K.tag(ctx, 'your mom mailing you a 3-pack of socks at college', 640, 110, u, .2, { size: 24, fill: '#fde6c4' }); });
  fx('thatsit', 'boing', .5, .1); fx('mom2', 'ping', .6);
  // ---------- 65. monuments show armour; nobody carves underpants into an arch → FACT ----------
  S('mattered', (ctx, lt, dur, t, R) => {
    if (lt < R('evidence')) { ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#9fb4c8'], [1, '#e8dcc8']]); ctx.fillRect(0, 0, W, H);
      sh(ctx, '#d9d2c4', 5, c => { c.moveTo(240, 700); c.lineTo(240, 160); c.lineTo(1040, 160); c.lineTo(1040, 700); c.lineTo(820, 700); c.lineTo(820, 420); c.quadraticCurveTo(640, 240, 460, 420); c.lineTo(460, 700); c.closePath(); }); sh(ctx, '#cfc6b6', 4, c => c.rect(220, 120, 840, 60));
      for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(300 + i * 60 + (i > 1 ? 560 : 0) - (i > 1 ? 120 : 0), 380); ctx.globalAlpha = .9; ctx.filter = 'grayscale(1) brightness(1.2)'; K.mini(ctx, 0, 0, 1.3, 0, { mail: true, helmet: true, shield: true, spear: true }); ctx.restore(); }
      K.tag(ctx, 'Roman monuments: armour & tunics', 640, 90, lt, R('monuments') - R('mattered'), { size: 24 });
      if (lt > R('arch')) { const k = K.pop(lt, R('arch')); ctx.save(); ctx.translate(640, 220); ctx.scale(k, k); ctx.filter = 'grayscale(1) brightness(1.15)'; K.pants(ctx, 0, 0, 1.2, '#ddd'); ctx.restore(); K.cross(ctx, 640, 220, 70, lt, R('arch') + .8); K.tag(ctx, 'nobody carves underpants into a triumphal arch', 640, 620, lt, R('arch') + .3, { size: 22 }); }
      if (lt < R('monuments')) { K.fig(ctx, 1120, 700, .7, theo({ t, turn: -.4, talk: K.vtalk(t), pose: 'think', face: { mouth: 'smirk', brows: 'skeptic' } })); } return; }
    K.mythCard(ctx, lt - R('evidence'), t, { head: 'FACT', headCol: '#3f9a4f', myth: 'Tab. Vindol. 346 is hard evidence:', lines: [['frontier soldiers wore socks and underwear', .3, '#3f9a4f'], ['…at least some of the time.', R('coldwet') - R('evidence') - 2], ['In a place this cold and wet — of course they did.', R('coldwet') - R('evidence')]], stamp: 'FACT', stampAt: .8, stampCol: '#3f9a4f', theoLook: AUXLOOK }); });
  mood('mattered', 'comic'); fx('arch', 'boing', .6); fx('arch', 'tick', .5, .8); fx('evidence', 'stamp', .9, .8); mood('evidence', 'warm');
  // ---------- 67. shoes: ~5,000; boots, women's sandals, tiny children's shoes ----------
  S('feet', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0);
    if (lt < R('shoes')) { const r = rng(4); for (let i = 0; i < 40; i++) { const k = K.pop(lt, .2 + i * .04); if (k <= 0) continue; K.shoe(ctx, 200 + r() * 880, 640 - r() * 260 - (i % 5) * 10, .7 * k, ['#6b4428', '#7a5233', '#5a3a22'][i % 3], (r() - .5)); } K.title(ctx, 'MORE ROMAN LEATHER THAN ANYWHERE', lt, R('leather') - R('feet'), { y: 110, size: 44 }); return; }
    const r = rng(4); for (let i = 0; i < 40; i++) K.shoe(ctx, 200 + r() * 880, 640 - r() * 260 - (i % 5) * 10, .7, ['#6b4428', '#7a5233', '#5a3a22'][i % 3], (r() - .5));
    ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = '#2a1810'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.counter(ctx, 640, 160, 0, 5000, lt, R('k5000'), 1.2, 'shoes — by one researcher’s count', { prefix: '≈ ', size: 90 });
    [[517.43, 'soldiers’ boots', 360, 1.2, '#6b4428'], [518.81, 'women’s sandals', 640, 1.0, '#c99a3c'], [520.24, 'tiny children’s shoes', 920, .55, '#d97a3a']].forEach(([at, l, x, s, col]) => { const k = K.pop(t, at); if (k <= 0) return; ctx.save(); ctx.translate(x, 470); ctx.scale(k, k); if (l.startsWith('women')) K.sandal(ctx, 0, 0, s); else K.shoe(ctx, 0, 0, s, col); ctx.restore(); K.tag(ctx, l, x, 580, t, at + .1, { size: 22 }); }); });
  fx('leather', 'thud', .4); fx('k5000', 'rise', .5); fx('kids', 'pop', .5); fx('kids', 'pop', .5, 1.4); fx('kids', 'pop', .6, 2.8);
  S('important', (ctx, lt, dur, t, R) => { V.street(ctx, t, 0); for (let i = 0; i < 4; i++) { const u = ((t * .12 + i / 4) % 1), x = lerp(-80, 1360, u); K.mini(ctx, x, 690 - (i % 2) * 20, .8, t, { walk: 1.8, ph: i * 2, cloth: K.CLOTH[i + 3], skin: K.SKINS[i % 6], hair: K.HAIRS[i % 6], wave: i % 2 === 0 }); }
    K.fig(ctx, 420, 700, .78, K.cast('lepidina', { t, turn: .3, pose: 'present', face: { mouth: 'smile', look: [.8, .3] } })); K.fig(ctx, 900, 700, .78, aux({ t, prop: 'spear', turn: -.3, pose: 'idle', face: { mouth: 'o', brows: 'up', look: [-.5, .3] } }));
    K.title(ctx, 'NOT JUST A BASE FULL OF MEN', lt, R('notmen') - .2, { y: 110, size: 48 }); });
  fx('important', 'crowd', .3, 0, 4);
  S('whereweere', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0); K.fig(ctx, 330, 700, .92, theo({ t, turn: .35, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'think'], [R('recap'), 'present']]), face: { mouth: 'grin', brows: 'up' } }));
    [['the headcount', R('recap')], ['the beer', R('recap') + .9], ['the socks', R('recap') + 1.8], ['…and children', R('children')]].forEach(([l, at], i) => { K.tag(ctx, l, 860, 180 + i * 110, lt, at, { size: 30, fill: i === 3 ? '#fde6c4' : '#f7eedb' }); K.tick(ctx, 1080, 180 + i * 110, 16, lt, at + .3); }); });
  fx('whereweere', 'whoosh', .4); fx('recap', 'pop', .5); fx('recap', 'pop', .5, .9); fx('recap', 'pop', .5, 1.8); fx('children', 'ding', .5);
})(window);
