/* BEAT 8 (the birthday party) + BEAT 9 (aftermath & human cost) + BEAT 10 (legacy + close) */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, V = G.VS, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, { S, fx, mood } = G.EP;
  const theo = o => Object.assign({ light: K.LIGHT.warm }, o), aux = o => K.cast('theoAux', Object.assign({ light: K.LIGHT.warm }, o));
  const NIGHT = K.LIGHT.night;

  // ================= BEAT 8 =================
  S('light', (ctx, lt, dur, t, R) => { V.house(ctx, t, lerp(-20, 20, lt / dur));
    K.fig(ctx, 470, 700, .86, K.cast('cerialis', { t, turn: .35, pose: 'idle', face: { mouth: 'smile', eyes: 'half', look: [.7, 0] }, light: NIGHT }));
    K.fig(ctx, 810, 700, .86, K.cast('lepidina', { t: t + 1, turn: -.35, pose: Gd.pose(lt, [[0, 'idle'], [R('getsmail'), 'present']]), prop: lt > R('getsmail') ? 'tablet' : undefined, face: lt > R('getsmail') ? { mouth: 'grin', eyes: 'open', brows: 'up', look: [.3, -.2] } : { mouth: 'smile', look: [-.7, 0] }, light: NIGHT }));
    K.tag(ctx, 'Flavius Cerialis', 470, 140, lt, .4, { size: 22 }); K.tag(ctx, 'Sulpicia Lepidina', 810, 140, lt, .8, { size: 22 }); K.tag(ctx, 'officers’ families lived here too', 640, 620, lt, R('families'), { size: 24, fill: '#fde6c4' }); });
  mood('light', 'tender'); fx('getsmail', 'ping', .5);
  S('claudia', (ctx, lt, dur, t, R) => { V.house(ctx, t, 200); ctx.save(); ctx.fillStyle = 'rgba(80,30,60,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.fig(ctx, 520, 700, .9, K.cast('claudia', { t, turn: .3, prop: 'tablet', pose: 'present', face: { mouth: 'grin', eyes: 'happy', brows: 'up' }, light: NIGHT }));
    K.tag(ctx, 'Claudia Severa', 520, 140, lt, .2, { size: 26 });
    if (lt > R('brocchus')) { K.fig(ctx, 900, 700, .82, K.cast('cerialis', { t: t + 3, look: { skin: '#e8b48c', hair: 'mop', hairCol: '#6b4226', beard: 'stubble' }, turn: -.3, pose: 'crossed', face: { mouth: 'smile', eyes: 'half' }, light: NIGHT })); K.tag(ctx, 'her husband: Aelius Brocchus', 900, 220, lt, R('brocchus') + .3, { size: 20 }); K.tag(ctx, 'commander at a nearby fort', 900, 270, lt, R('brocchus') + .7, { size: 18 }); } });
  fx('claudia', 'sparkle', .4);
  S('scribe', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); K.fig(ctx, 300, 700, .82, K.cast('clerk', { t, prop: 'stylus', turn: .4, pose: 'present', face: { mouth: 'flat', eyes: 'half', look: [.6, .4] }, light: NIGHT }));
    K.tablet(ctx, 760, 400, 560, 300, { seed: 291, rows: 6, reveal: lt < R('reads') ? clamp(lt / 3.5) * .8 : .8 }); K.tag(ctx, 'neat, professional hand: likely a scribe', 760, 120, lt, .6, { size: 22 }); });
  fx('scribe', 'scratch', .5, 0, 3.4); mood('scribe', 'tender');
  S('reads', (ctx, lt, dur, t, R) => { V.house(ctx, t, 0); ctx.save(); ctx.globalAlpha = .5; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.quote(ctx, lt, R('sept') - .3, 'On 11 September, sister, for the day of the celebration of my birthday, I give you a warm invitation to make sure you come to us…', 'Tab. Vindol. 291', { y: 340, size: 34, w: 880 });
    const k = K.pop(lt, R('celebr')); if (k > 0) { ctx.save(); ctx.translate(1120, 600); ctx.scale(k * .8, k * .8); sh(ctx, '#f3c6d4', 4, c => c.roundRect(-70, -40, 140, 70, 10)); sh(ctx, '#fff6ea', 3, c => c.roundRect(-70, -60, 140, 30, 10)); for (let i = 0; i < 3; i++) { ln(ctx, [[-40 + i * 40, -60], [-40 + i * 40, -90]], 6, '#e85d5d'); const fl = Math.sin(t * 12 + i) * 2; sh(ctx, '#ffcf5a', 2, c => c.ellipse(-40 + i * 40 + fl, -100, 6, 10, 0, 0, TAU)); } ctx.restore(); } });
  fx('sept', 'paper', .5, -.3); fx('celebr', 'sparkle', .5); fx('invite', 'ding', .4);
  S('sisters', (ctx, lt, dur, t, R) => {
    if (lt < R('sis')) { V.house(ctx, t, 0); [['lepidina', 520, .3], ['claudia', 760, -.3]].forEach(([n, x, tu], i) => K.fig(ctx, x, 700, .86, K.cast(n, { t: t + i, turn: tu, pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy', brows: 'up' }, light: NIGHT }))); K.tag(ctx, 'not actually sisters: a term of affection', 640, 130, lt, .3, { size: 24 });
      for (let i = 0; i < 6; i++) { const u = (t * .5 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 1 - u; ctx.translate(640 + Math.sin(i * 2 + t) * 30, 300 - u * 120); sh(ctx, '#e85d7a', 2.5, c => { c.moveTo(0, 8); c.bezierCurveTo(-16, -6, -8, -18, 0, -8); c.bezierCurveTo(8, -18, 16, -6, 0, 8); c.closePath(); }); ctx.restore(); } return; }
    const u = lt - R('sis'); ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#f4c8d8'], [1, '#f8e2c8']]); ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(640, 380); sh(ctx, '#1d1a20', 6, c => c.roundRect(-160, -300, 320, 600, 40)); ctx.fillStyle = '#f4f6f8'; ctx.beginPath(); ctx.roundRect(-144, -284, 288, 568, 30); ctx.fill(); sh(ctx, '#8a4f9a', 0, c => c.roundRect(-120, -60, 220, 70, 30)); K.txt(ctx, 'u coming bday?? sis 💕', -100, -24, K.FONT(700, 18), '#fff'); ctx.restore(); K.tag(ctx, 'like calling your best friend “sis”', 640, 650, u, .2, { size: 24 }); });
  fx('sisters', 'pop', .4, .3); fx('sis', 'ping', .6);
  // ---------- 74. look closely: the handwriting changes ----------
  S('lookclose', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); const z = lerp(1, 1.7, ease.inOut(clamp((lt - .3) / 2.2)));
    ctx.save(); T.cam(ctx, z, lerp(640, 820, clamp((z - 1) / .7)), lerp(380, 450, clamp((z - 1) / .7))); K.tablet(ctx, 640, 380, 600, 320, { seed: 291, rows: 6, handChange: K.fadeIn(lt, R('changes')), roughCol: '#3a1a10' }); ctx.restore();
    K.tag(ctx, 'the handwriting changes', 640, 110, lt, R('changes'), { size: 32, fill: '#fde6c4' }); K.tag(ctx, 'rougher, less practised', 640, 640, lt, R('rougher'), { size: 26 }); });
  fx('changes', 'ding', .6); fx('lookclose', 'rise', .4, .3);
  S('confident', (ctx, lt, dur, t, R) => { V.house(ctx, t, 100); K.fig(ctx, 560, 700, .95, K.cast('claudia', { t, prop: 'stylus', turn: .35, pose: 'present', face: { mouth: 'smile', brows: 'up', look: [.7, .4] }, light: NIGHT }));
    K.tablet(ctx, 860, 560, 240, 130, { seed: 291, rows: 4, handChange: 1, reveal: clamp(lt / 3), roughCol: '#3a1a10' }); K.tag(ctx, 'Claudia Severa herself', 640, 120, lt, .3, { size: 30, fill: '#fde6c4' }); K.tag(ctx, 'a personal note + her goodbye', 640, 180, lt, R('personal'), { size: 22 });
    if (lt > R('others')) { for (let i = 0; i < 3; i++) K.tablet(ctx, 1060 + i * 30, 320 + i * 40, 160, 90, { seed: 400 + i, rot: .1 - i * .08, scale: K.pop(lt, R('others') + i * .2), handChange: 1, rows: 3 }); K.tag(ctx, 'other letters to Lepidina too', 1050, 470, lt, R('others') + .5, { size: 18 }); } });
  fx('confident', 'scratch', .5, 0, 2.6); fx('others', 'pop', .4);
  S('earliest', (ctx, lt, dur, t, R) => { ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#2a1a30'], [1, '#4a2a3a']]); ctx.fillRect(0, 0, W, H); T.glow(ctx, 640, 340, 460, 'rgba(255,210,160,.35)'); motes(ctx, t, 40, 41);
    K.tablet(ctx, 640, 360, 420, 230, { seed: 291, rows: 5, handChange: 1, glow: .45 + Math.sin(t * 2) * .1, roughCol: '#3a1a10' });
    if (lt < R('notpoem')) { K.paper(ctx, 640, 600, 900, 110, { scale: K.pop(lt, .6), draw: c => { K.txt(c, 'believed to be the EARLIEST known writing in Latin', 0, -18, K.FONT(700, 28), OUT, 'center'); K.txt(c, 'by a woman’s own hand', 0, 22, K.FONT(700, 28), '#b2342f', 'center'); } }); }
    else { [['a poem', R('notpoem'), 330], ['a speech', R('notspeech'), 640]].forEach(([l, at, x]) => { K.tag(ctx, l, x, 610, lt, at, { size: 28 }); K.cross(ctx, x, 610, 40, lt, at + .25); }); K.tag(ctx, 'a birthday invite', 950, 610, lt, R('invite2'), { size: 30, fill: '#f3c6d4' }); K.tick(ctx, 1110, 610, 20, lt, R('invite2') + .3); } });
  mood('earliest', 'tender'); fx('earliest', 'sparkle', .5, .6); fx('notpoem', 'tick', .5, .25); fx('notspeech', 'tick', .5, .25); fx('invite2', 'ding', .6, .3);
  S('y100', (ctx, lt, dur, t, R) => { V.mapBritain(ctx, t, lt, { zoom: 2.6, focus: 'vindolanda', draw: (c, MP) => { const a = MP(V.PLACES.vindolanda), b = MP([.6, .41]);
      V.pin(c, a, 'Lepidina', lt, .2, { size: 11, dy: 96 }); V.pin(c, b, 'Claudia', lt, .5, { size: 11, col: '#8a4f9a', dy: -10 }); V.route(c, [b, [(a[0] + b[0]) / 2, a[1] - 40], a], lt, R('farhome') - .5, 1.4, { w: 4, col: '#e85d7a', dash: [8, 6], arrow: true }); } });
    K.tag(ctx, 'around AD 100 · the edge of the known world', 640, 110, lt, R('edgeworld') - .3, { size: 26, fill: '#fde6c4' }); K.tag(ctx, 'from one woman far from home to another', 640, 650, lt, R('farhome'), { size: 24 }); });
  S('didgo', (ctx, lt, dur, t, R) => { V.house(ctx, t, 0); K.fig(ctx, 640, 700, .95, K.cast('lepidina', { t, turn: 0, pose: 'think', face: { mouth: 'smirk', brows: 'skeptic', look: [-.4, -.5] }, light: NIGHT }));
    K.bubble(ctx, '?', 760, 260, lt, .3, { size: 60 }); if (lt > R('nobodywrote')) { K.tablet(ctx, 1040, 460, 260, 150, { seed: 999, ink: 0, scale: K.pop(lt, R('nobodywrote')) }); K.tag(ctx, 'nobody wrote that down', 1040, 590, lt, R('nobodywrote') + .2, { size: 22 }); } K.tag(ctx, 'Did Lepidina go? We don’t know.', 640, 110, lt, R('dontknow') - .3, { size: 28 }); });
  fx('didgo', 'pop', .4, .3);

  // ================= BEAT 9 (quiet; muted palette; no gags) =================
  S('cozy', (ctx, lt, dur, t, R) => { const k = clamp((lt - R('occupation')) / 1.2);
    if (lt < R('occupation')) { V.studio(ctx, t, 0, { plain: true }); [['beer', 340], ['socks', 640], ['birthdays', 940]].forEach(([l, x], i) => { const kk = K.pop(lt, .3 + i * .5); if (kk <= 0) return; ctx.save(); ctx.translate(x, 380); ctx.scale(kk, kk); if (i === 0) { sh(ctx, '#c98a4e', 4, c => c.roundRect(-40, -60, 80, 110, 12)); sh(ctx, '#f6c945', 0, c => c.rect(-32, -40, 64, 82)); } else if (i === 1) K.sock(ctx, 0, 0, 1.2, '#a8392f'); else { sh(ctx, '#f3c6d4', 4, c => c.roundRect(-70, -40, 140, 70, 10)); } ctx.restore(); K.tag(ctx, l, x, 500, lt, .5 + i * .5, { size: 26 }); }); return; }
    V.gate(ctx, t, 0, { riders: false }); for (const x of [470, 810]) K.mini(ctx, x, 690, 1.9, t, { mail: true, helmet: true, shield: true, spear: true, dir: x < 640 ? 1 : -1 }); K.desat(ctx, .45 * k); K.tag(ctx, 'an army of occupation', 640, 110, lt, R('occupation') + .4, { size: 28 }); });
  mood('occupation', 'somber');
  S('t164', (ctx, lt, dur, t, R) => {
    if (lt < R('armor')) { V.office(ctx, t, 0); K.tablet(ctx, 520, 370, 520, 280, { seed: 164, rows: 5, scale: K.pop(lt, 0) }); K.paper(ctx, 1020, 300, 360, 170, { rot: .02, scale: K.pop(lt, .4), draw: c => { K.txt(c, 'Tab. Vindol. 164', 0, -40, K.FONT(700, 24), '#b2342f', 'center'); K.txt(c, 'a short military note', 0, 0, K.FONT(700, 22), OUT, 'center'); K.txt(c, 'c. AD 97–105', 0, 40, K.FONT(600, 20), '#8a5a3a', 'center'); } }); K.desat(ctx, .45); return; }
    V.farm(ctx, t, 0); for (let i = 0; i < 3; i++) K.fig(ctx, 380 + i * 260, 700, .78, K.cast(i === 1 ? 'britonB' : 'britonA', { t: t + i, turn: (1 - i) * .2, prop: i === 1 ? 'spear' : undefined, pose: 'idle', face: { mouth: 'flat', look: [0, 0] }, light: K.LIGHT.grey, look: i === 2 ? { skin: '#e9c4a4', hair: 'long', hairCol: '#c98a4e', beard: 'moustache' } : undefined }));
    K.tag(ctx, '“unprotected by armour”', 640, 110, lt, R('armor') + .2, { size: 24 }); K.tag(ctx, '“very many cavalry”', 640, 170, lt, R('cavalry'), { size: 24 }); K.tag(ctx, '“the cavalry don’t use swords”', 640, 230, lt, R('noswords'), { size: 24 }); K.desat(ctx, .45); });
  fx('t164', 'paper', .4);
  S('newword', (ctx, lt, dur, t, R) => { ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a3430'], [1, '#22201c']]); ctx.fillRect(0, 0, W, H); K.tablet(ctx, 640, 380, 640, 330, { seed: 164, rows: 5, ink: .5 });
    if (lt > R('britt')) { const k = K.pop(lt, R('britt')); ctx.save(); ctx.translate(640, 330); ctx.scale(k, k); FX.bigText(ctx, 'BRITTUNCULI', 0, 0, 80, { color: '#e8e0d0' }); ctx.restore(); K.tag(ctx, '(brit-TUN-kyoo-lee)', 640, 410, lt, R('britt') + .3, { size: 22 }); }
    K.tag(ctx, '“wretched Britons”', 500, 520, lt, R('wretched'), { size: 28 }); K.tag(ctx, '≈ “little Brits”: a sneering diminutive', 760, 600, lt, R('little'), { size: 24 }); });
  fx('britt', 'thud', .5);
  S('argue', (ctx, lt, dur, t, R) => { ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#3a3430'], [1, '#22201c']]); ctx.fillRect(0, 0, W, H); K.tablet(ctx, 640, 300, 520, 260, { seed: 164, rows: 5, ink: .45 });
    for (let i = 0; i < 4; i++) { const x = 220 + i * 280; ctx.save(); ctx.fillStyle = '#4a4440'; ctx.beginPath(); ctx.arc(x, 520, 34, 0, TAU); ctx.fill(); ctx.fillRect(x - 46, 556, 92, 140); ctx.restore(); K.bubble(ctx, ['?', '…', '?!', '…'][i], x + 40, 450, lt, .3 + i * .25, { size: 30 }); }
    K.tag(ctx, 'specialists still argue about the rest of the sentence', 640, 110, lt, .2, { size: 24 }); K.tag(ctx, '…but nobody argues about the tone.', 640, 170, lt, R('tone'), { size: 26, fill: '#e8d8c8' }); });
  S('land', (ctx, lt, dur, t, R) => { V.farm(ctx, t, lerp(0, 30, lt / dur)); K.fig(ctx, 480, 700, .82, K.cast('britonB', { t, turn: .2, pose: 'idle', face: { mouth: 'flat', eyes: 'half' }, light: K.LIGHT.grey }));
    for (let i = 0; i < 2; i++) K.mini(ctx, 700 + i * 70, 690, 1, t, { cloth: ['#4f7a3c', '#8a4f9a'][i], skin: '#f4cfb4', hair: '#b0602a', walk: .3, ph: i });
    K.tag(ctx, 'these are the people whose land this was', 640, 110, lt, .3, { size: 26 }); if (lt > R('problem')) { K.paper(ctx, 960, 380, 330, 120, { rot: .04, scale: K.pop(lt, R('problem')), draw: c => K.txt(c, 'MILITARY PROBLEM', 0, 2, K.DISP(30), '#5a5a5a', 'center') }); } K.desat(ctx, .45); });
  S('nochoice', (ctx, lt, dur, t, R) => { V.house(ctx, t, 0); ctx.save(); ctx.fillStyle = 'rgba(20,20,30,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.fig(ctx, 420, 700, .86, K.cast('servantA', { t, turn: .3, pose: 'idle', face: { mouth: 'flat', look: [.5, .2] }, light: NIGHT })); K.fig(ctx, 860, 700, .86, K.cast('servantB', { t: t + 2, turn: -.3, prop: 'jug', pose: 'present', face: { mouth: 'flat', eyes: 'half' }, light: NIGHT }));
    K.tag(ctx, 'people who had no choice about being there', 640, 110, lt, .3, { size: 26 }); K.tag(ctx, 'households included enslaved people', 640, 170, lt, R('enslaved'), { size: 24 }); K.tag(ctx, 'they appear in the tablets too, doing the work', 640, 620, lt, R('work'), { size: 22 }); K.desat(ctx, .4); });
  S('sit', (ctx, lt, dur, t, R) => { ctx.fillStyle = '#1e1a18'; ctx.fillRect(0, 0, W, H); const fl = 1 + Math.sin(t * 9) * .05; T.glow(ctx, 640, 420, 320 * fl, 'rgba(255,180,90,.35)'); sh(ctx, '#c98a4e', 3.5, c => c.ellipse(640, 470, 34, 13, 0, 0, TAU)); sh(ctx, '#ffcf5a', 2, c => { c.moveTo(664, 462); c.quadraticCurveTo(676, 440, 666, 424); c.quadraticCurveTo(656, 440, 664, 462); c.closePath(); });
    if (lt > R('archive')) { K.tablet(ctx, 360, 330, 260, 150, { seed: 291, rows: 4, handChange: 1, scale: K.pop(lt, R('archive')), roughCol: '#3a1a10' }); K.tag(ctx, 'a birthday party', 360, 440, lt, R('archive') + .2, { size: 22 }); }
    if (lt > R('conquest')) { K.tablet(ctx, 920, 330, 260, 150, { seed: 164, rows: 4, scale: K.pop(lt, R('conquest')) }); K.tag(ctx, 'conquest and slavery', 920, 440, lt, R('conquest') + .2, { size: 22 }); }
    if (lt > R('inkcasual')) { sh(ctx, '#2a1a10', 4, c => c.ellipse(640, 590, 50, 26, 0, 0, TAU)); K.tag(ctx, 'the same casual ink', 640, 650, lt, R('inkcasual') + .3, { size: 24 }); } });

  // ================= BEAT 10 =================
  S('y1973', (ctx, lt, dur, t, R) => { V.dig(ctx, t, lerp(-20, 20, lt / dur)); const up = ease.out(clamp((lt - 3) / 1.6));
    K.fig(ctx, 560, 720, .82, K.cast('digger', { t, turn: .3, pose: Gd.pose(lt, [[0, 'think'], [2.8, 'present']]), face: lt > 3.4 ? { mouth: 'o', eyes: 'wide', brows: 'up' } : { mouth: 'flat', eyes: 'half', look: [.3, .6] }, light: K.LIGHT.grey }));
    K.tablet(ctx, 700, lerp(680, 520, up), 130, 70, { seed: 346, ink: .5, glow: up * .4 }); FX.dateTag(ctx, '1973'); K.tag(ctx, 'archaeologist Robin Birley', 640, 120, lt, .8, { size: 24 }); K.tag(ctx, 'the first thin, dark sliver of wood', 640, 180, lt, 4.2, { size: 22 }); });
  mood('y1973', 'quiet'); fx('y1973', 'ding', .6, 4.2);
  S('since', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); const r = rng(6); for (let i = 0; i < 60; i++) { const k = K.pop(lt, .2 + i * .03); if (k <= 0) continue; K.tablet(ctx, 80 + r() * 1120, 120 + r() * 520, 90, 50, { seed: i + 500, rot: (r() - .5) * .5, scale: k * (.6 + r() * .5) }); }
    K.title(ctx, 'HUNDREDS OF LETTERS', lt, R('hundreds') - .2, { y: 120, size: 60 });
    if (lt > R('names')) { const names = ['Masclus', 'Cerialis', 'Lepidina', 'Claudia', 'Verecundus', 'Brocchus', 'Flavius', 'Candidus', 'Octavius', 'Severa']; names.forEach((n, i) => K.tag(ctx, n, 160 + (i % 5) * 240, 360 + Math.floor(i / 5) * 90, lt, R('names') + i * .12, { size: 22, fill: i % 2 ? '#fde6c4' : '#f7eedb' })); }
    if (lt > R('goeson')) K.tag(ctx, 'the work still goes on', 640, 640, lt, R('goeson'), { size: 26 }); });
  fx('hundreds', 'rise', .5); fx('names', 'sparkle', .5);
  S('faint', (ctx, lt, dur, t, R) => { ctx.fillStyle = '#16121a'; ctx.fillRect(0, 0, W, H); const sweep = clamp((lt - R('infra')) / 2.2);
    K.tablet(ctx, 640, 360, 640, 340, { seed: 628, rows: 5, ink: .12 }); if (sweep > 0) { ctx.save(); ctx.beginPath(); ctx.rect(320, 0, 640 * sweep, H); ctx.clip(); ctx.filter = 'grayscale(1) contrast(1.6) brightness(1.4)'; K.tablet(ctx, 640, 360, 640, 340, { seed: 628, rows: 5, ink: 1, wood: '#9a9a9a' }); ctx.restore(); ln(ctx, [[320 + 640 * sweep, 160], [320 + 640 * sweep, 560]], 6, 'rgba(255,80,80,.8)'); T.glow(ctx, 320 + 640 * sweep, 360, 120, 'rgba(255,80,80,.4)'); }
    K.tag(ctx, 'so fragile and faint…', 640, 110, lt, .2, { size: 26 }); K.tag(ctx, 'read with INFRARED photography', 640, 630, lt, R('infra') + .2, { size: 26, fill: '#fde6c4' }); });
  fx('infra', 'rise', .6); fx('infra', 'sparkle', .5, 2.2);
  S('think', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0); K.fig(ctx, 330, 700, .92, theo({ t, turn: .35, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'think'], [R('bones'), 'present'], [R('words'), 'presentBoth']]), face: { mouth: lt > R('words') ? 'grin' : 'smile', brows: 'up', look: [.6, -.2] } }));
    if (lt > R('bones') && lt < R('words')) { ctx.save(); ctx.translate(880, 480); ln(ctx, [[-90, 0], [90, -20]], 18, '#e8e0cc'); for (const [x, y] of [[-90, 0], [90, -20]]) { sh(ctx, '#e8e0cc', 3, circ(x, y - 10, 16)); sh(ctx, '#e8e0cc', 3, circ(x, y + 10, 16)); } ctx.restore(); K.tag(ctx, 'bones and rubbish', 880, 360, lt, R('bones') + .2, { size: 26 }); }
    if (lt > R('words')) { const ws = ['beer', 'socks', 'birthday', 'leave', 'sick', 'pay']; ws.forEach((w, i) => { const u = (lt - R('words') - i * .15); if (u < 0) return; const y = 560 - u * 90; K.tag(ctx, w, 760 + (i % 3) * 150, Math.max(200, y - Math.floor(i / 3) * 80), lt, R('words') + i * .15, { size: 24 }); }); K.title(ctx, 'THEIR WORDS', lt, R('words'), { x: 880, y: 120, size: 54 }); } });
  mood('think', 'rising', 1.5); fx('words', 'sparkle', .6);
  S('notemp', (ctx, lt, dur, t) => { V.studio(ctx, t, 0, { plain: true }); K.tag(ctx, 'emperors’ speeches', 640, 110, t, 726.9, { size: 26 }); K.cross(ctx, 640, 110, 50, t, 727.4);
    [['workplace memos', 729.2], ['sick notes', 730.36], ['shopping lists', 731.4], ['a care package', 732.58], ['a birthday invite', 733.97]].forEach(([l, at], i) => { const x = 230 + (i % 3) * 410, y = 290 + Math.floor(i / 3) * 230; const k = K.pop(t, at); if (k <= 0) return; K.tablet(ctx, x, y, 240, 130, { seed: 600 + i, scale: k, rot: (i % 2 ? .05 : -.04) }); K.tag(ctx, l, x, y + 100, t, at + .1, { size: 24, fill: i === 4 ? '#f3c6d4' : '#f7eedb' }); }); });
  [729.2, 730.36, 731.4, 732.58, 733.97].forEach(a => G.EP.sfx.push({ t: a, type: 'pop', gain: .5 })); fx('notemp', 'boing', .4, .5);
  // ---------- 91. so what did he do all day? the recap montage on the words ----------
  S('sowhat2', (ctx, lt, dur, t, R) => {
    const beats = [[739.97, 'got counted'], [741.05, 'worked'], [742.09, 'waited on supplies'], [743.96, 'got sick · eye inflammation'], [747.15, 'beer ran out · asked for time off'], [750.73, 'got socks from home'], [752.34, 'and the people around him']];
    let cur = -1; beats.forEach((b, i) => { if (t >= b[0]) cur = i; });
    if (cur < 0) { V.fortExt(ctx, t, lerp(0, 30, lt / 4)); K.title(ctx, 'SO… WHAT DID HE DO ALL DAY?', lt, .2, { y: 110, size: 48 }); return; }
    if (cur === 0) { V.street(ctx, t, 0, { v: 'dawn' }); for (let i = 0; i < 7; i++) { K.mini(ctx, 230 + i * 120, 650, 1.3, t, { mail: true, helmet: true, shield: true, ph: i }); K.tick(ctx, 230 + i * 120, 520, 16, t, 740 + i * .12); } }
    else if (cur === 1) { V.street(ctx, t, 0); const hk = Math.max(0, Math.sin(t * 7)); K.fig(ctx, 640, 700, .9, aux({ t, prop: null, hat: 'none', pose: { L: [-68, -158], R: [120 - hk * 30, -260 - hk * 140], hL: 'rest', hR: 'fist', cross: 0, out: false, shrug: 0, bow: 0 }, face: { mouth: 'grit', brows: 'angry' } })); }
    else if (cur === 2) { V.fortExt(ctx, t, 0, { march: false }); K.fig(ctx, 640, 700, .9, aux({ t, prop: 'spear', pose: 'crossed', face: { mouth: 'flat', eyes: 'half', look: [.8, 0] } })); }
    else if (cur === 3) { V.barracks(ctx, t, 0); K.fig(ctx, 640, 700, .9, aux({ t, prop: null, hat: 'none', pose: 'facepalm', face: { mouth: 'frown', brows: 'worried', eyes: 'squint', sweat: true } })); }
    else if (cur === 4) { V.outpost(ctx, t, 0, { rain: .3 }); K.fig(ctx, 520, 700, .9, K.cast('masclus', { t, prop: 'tablet', pose: 'present', face: { mouth: 'grin', brows: 'sly' }, light: K.LIGHT.grey })); barrel(ctx, 820, 640); }
    else if (cur === 5) { V.barracks(ctx, t, 0); K.fig(ctx, 520, 700, .9, aux({ t, prop: null, hat: 'none', pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } })); K.sock(ctx, 820, 430 - Math.abs(Math.sin(t * 3)) * 20, 1.2, '#a8392f'); }
    else { V.street(ctx, t, 0); [['lepidina', 260], ['servantA', 500], ['britonA', 760], ['claudia', 1010]].forEach(([n, x], i) => K.fig(ctx, x, 700, .7, K.cast(n, { t: t + i, turn: (1.5 - i) * .15, pose: 'idle', face: { mouth: 'smile', look: [0, 0] } }))); for (let i = 0; i < 3; i++) K.mini(ctx, 380 + i * 260, 700, .85, t, { walk: 1.5, ph: i, cloth: K.CLOTH[i + 4], skin: K.SKINS[i + 1], wave: true }); K.tag(ctx, 'officers’ wives · children · the enslaved · the conquered', 640, 640, t, 753.6, { size: 22 }); }
    K.tag(ctx, beats[cur][1].toUpperCase(), 640, 100, t, beats[cur][0], { size: 32, fill: '#fde6c4' }); });
  function barrel(ctx, x, y) { sh(ctx, '#8a5a36', 4.5, c => c.roundRect(x - 60, y - 110, 120, 120, 26)); for (const yy of [-90, -10]) ln(ctx, [[x - 60, y + yy], [x + 60, y + yy]], 6, '#5a5a5a'); sh(ctx, '#3a2418', 3, c => c.ellipse(x, y - 110, 56, 14, 0, 0, TAU)); }
  [739.97, 741.05, 742.09, 743.96, 747.15, 750.73, 752.34].forEach(a => G.EP.sfx.push({ t: a, type: 'swish', gain: .4 }));
  S('ordinary', (ctx, lt, dur, t) => { V.fortExt(ctx, t, lerp(-60, 60, lt / dur), { v: 'dusk', rain: .35 }); K.tag(ctx, 'ordinary days in the same cold, wet place', 640, 120, lt, .3, { size: 26 }); });
  fx('ordinary', 'rain', .35, 0, 4.5);
  // ---------- 92. check your inbox again ----------
  S('inbox2', (ctx, lt, dur, t, R) => { G.EP.phoneScene(ctx, lt, dur, t, [R('boss2'), R('supplies2'), R('package2'), R('party2')], { day: 'Today', notes: [['BOSS', 'Got a minute?', '#5b7fc4', 'B'], ['SUPPLY DEPOT', 'Back-ordered, sorry!', '#d97a3a', 'S'], ['PACKAGE', 'Delivered to your door', '#d8433a', 'P'], ['PARTY', 'You’re invited!', '#8a4f9a', 'P']] }); K.tag(ctx, 'Check your inbox again.', 640, 60, lt, .05, { size: 24 }); });
  ['boss2', 'supplies2', 'package2', 'party2'].forEach(k => fx(k, 'ping', .7)); mood('inbox2', 'curious');
  S('y1900', (ctx, lt, dur, t, R) => { const k = ease.inOut(clamp(lt / 2.2)); ctx.fillStyle = '#4a3a2e'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 6; i++) { ctx.fillStyle = ['#5a4030', '#6b4c36', '#4f3a2c', '#735339', '#5e4532', '#6a4a34'][i]; ctx.fillRect(0, i * 120, W, 120 * k + 2); }
    ctx.save(); ctx.translate(640, 420); ctx.rotate(.06); ctx.globalAlpha = 1 - k * .3; sh(ctx, '#1d1a20', 4, c => c.roundRect(-90, -40, 180, 80, 12)); ctx.fillStyle = '#7ab0e0'; ctx.fillRect(-80, -32, 160, 64); ctx.restore();
    K.counter(ctx, 640, 150, 0, 1900, lt, .1, 1.8, 'years from now', { size: 70 }); K.tag(ctx, 'that’s what will be left of you', 640, 600, lt, R('leftofyou'), { size: 26 });
    if (lt > R('notbig')) { ctx.save(); ctx.globalAlpha = .9 - clamp((lt - R('notbig') - .6) / .8); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; sh(ctx, P.FLOWERS[i % 6], 0, circ(320 + Math.cos(a) * 80, 380 + Math.sin(a) * 80, 8)); } ctx.restore(); K.tag(ctx, 'not the big moments', 320, 520, lt, R('notbig'), { size: 22 }); K.cross(ctx, 320, 380, 50, lt, R('notbig') + .5); }
    if (lt > R('themail')) { K.tablet(ctx, 960, 400, 220, 120, { seed: 7, glow: .4, scale: K.pop(lt, R('themail')) }); K.tag(ctx, 'THE MAIL', 960, 510, lt, R('themail') + .1, { size: 34, fill: '#fde6c4' }); } });
  fx('y1900', 'rumble', .6, 0, 2); fx('themail', 'ding', .6);
  S('glad', (ctx, lt, dur, t) => { V.dig(ctx, t, 0); ctx.save(); ctx.globalCompositeOperation = 'hue'; ctx.globalAlpha = .25; ctx.fillStyle = '#4080ff'; ctx.fillRect(0, 0, W, 320); ctx.restore();
    const up = ease.out(clamp((lt - .5) / 1.4)); K.fig(ctx, 520, 720, .85, theo({ t, outfit: 'explorer', hat: 'none', turn: .3, pose: Gd.pose(lt, [[0, 'think'], [1.6, 'present']]), face: lt > 1.6 ? { mouth: 'grin', eyes: 'happy', brows: 'up' } : { mouth: 'o', eyes: 'wide', look: [.4, .6] } }));
    ctx.save(); ctx.translate(680, lerp(680, 520, up)); ctx.rotate(-.1); sh(ctx, '#3a3a40', 4, c => c.roundRect(-34, -60, 68, 120, 12)); ctx.fillStyle = '#5a7a9a'; ctx.fillRect(-26, -50, 52, 100); ctx.restore(); T.glow(ctx, 680, lerp(680, 520, up), 140 * up, 'rgba(255,230,160,.5)');
    FX.dateTag(ctx, 'AD 3926?'); K.title(ctx, '…GLAD YOU WROTE IT DOWN.', lt, 1.8, { y: 120, size: 50 }); });
  mood('glad', 'rising'); fx('glad', 'sparkle', .7, 1.6);
  // ---------- 95. end card ----------
  S('subscribe', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0);
    K.fig(ctx, 330, 700, .95, theo({ t, turn: .35, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'wave'], [R('dug'), 'present'], [R('comments'), 'pointSide'], [R('thanks'), 'wave']]), face: { mouth: 'grin', eyes: lt > R('thanks') ? 'happy' : 'open', brows: 'up' } }));
    const k = K.pop(lt, .3); ctx.save(); ctx.translate(860, 200); ctx.scale(k, k); sh(ctx, '#d8433a', 5, c => c.roundRect(-150, -40, 300, 80, 40)); K.txt(ctx, 'SUBSCRIBE', 0, 2, K.DISP(38), '#fff', 'center'); ctx.restore();
    if (lt > R('dug')) K.paper(ctx, 860, 400, 560, 170, { rot: -.02, scale: K.pop(lt, R('dug')), draw: c => { K.txt(c, 'If archaeologists dug up your inbox', 0, -40, K.FONT(700, 26), OUT, 'center'); K.txt(c, 'in 2,000 years… which ONE message', 0, 0, K.FONT(700, 26), OUT, 'center'); K.txt(c, 'would you want them to find?', 0, 40, K.FONT(700, 26), '#b2342f', 'center'); } });
    if (lt > R('comments')) K.bubble(ctx, 'Tell me in the comments!', 860, 590, lt, R('comments'), { size: 28 }); });
  fx('subscribe', 'pop', .6, .3); fx('dug', 'paper', .5); fx('comments', 'ping', .5); fx('thanks', 'sparkle', .6);
})(window);
