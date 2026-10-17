/* The dialogue scenes, re-choreographed (user: "dialogue still stiff, movements rigid — make it really polished"):
 * camera coverage that eases onto whoever speaks (EP.cover), speakers gesture phrase by phrase (Guide acting layer
 * + vis), listeners turn, nod and react (listen), characters walk in with a gait instead of sliding.
 * EP.R(key, fn) replaces the shot registered on that anchor in ep0–ep4. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, EP = G.EP, { fx, mood, cast, fig, theo } = EP;
  const say = Gd.say, TC = o => Object.assign({ outfit: 'cowTheo', hat: 'stetson', light: K.LIGHT.warm }, o);
  EP.R = (key, fn, off = 0) => { const tt = Math.max(0, TV[key] + off), s = EP.shots.find(x => Math.abs(x.t - tt) < 1e-6); if (s) s.fn = fn; else EP.shots.push({ t: tt, fn }); };
  // camera coverage: keys [[lt, zoom, focusX, focusY], …] — eases between framings (a soft "cut" to the speaker)
  EP.cover = (ctx, lt, keys, d = .55) => { let A = keys[0], Bk = keys[0], k = 1; for (let i = 0; i < keys.length; i++) if (lt >= keys[i][0]) { A = i ? keys[i - 1] : keys[i]; Bk = keys[i]; k = clamp((lt - keys[i][0]) / d); }
    const e = ease.inOut(k), z = lerp(A[1], Bk[1], e); let fx_ = lerp(A[2], Bk[2], e), fy = lerp(A[3], Bk[3], e);
    fx_ = clamp(fx_, 640 / z, W - 640 / z); fy = clamp(fy, 360 / z, H - 360 / z); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  const R_ = EP.R, cover = EP.cover;
  const walkIn = (lt, t0, d, x0, x1) => { const k = clamp((lt - t0) / d); return { x: lerp(x0, x1, ease.inOut(k)), walking: k > 0 && k < 1, bob: k > 0 && k < 1 ? Math.abs(Math.sin((lt - t0) * 8)) * -6 : 0, k }; };
  const GX1 = 320, GX2 = 960, GY = 650;

  // ---------------- COLD OPEN ----------------
  R_('action', (ctx, lt, dur, t, R) => {   // "Aaand… ACTION!"
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [.2, 1.18, 880, 460], [R('action') - .05, 1.0, 640, 360]], .45); CS.movieSet(ctx, t, 0, { crew: true });
    CS.longShadow(ctx, GX1, GY, 34); CS.longShadow(ctx, GX2, GY, 34);
    fig(ctx, 'gun1', GX1, GY, .62, { t, pose: 'idle', turn: .6, face: { mouth: 'flat', brows: 'neutral', look: [.6, 0] } }); fig(ctx, 'gun2', GX2, GY, .62, { t: t + 1, pose: 'idle', turn: -.6, face: { mouth: 'flat' } });
    const up = lt > R('action') - .3 ? Math.sin(clamp((lt - R('action') + .3) / .5) * Math.PI) * 18 : 0;
    CS.longShadow(ctx, 1040, 760, 44, 200);
    fig(ctx, 'director', 1040, 760 - up, .78, { t, pose: lt < R('action') - .3 ? 'present' : 'pointUp', turn: -.3, face: { mouth: 'open', brows: 'up', eyes: lt > R('action') ? 'happy' : 'open' }, vis: say(t, 0, 2.4) });
    ctx.restore();
    const ck = clamp((lt - R('action') + .12) / .12); EP.clapper(ctx, 420, 380 + Math.max(0, 1 - lt / .3) * 300 + (lt > R('action') + .4 ? (lt - R('action') - .4) * 900 : 0), .9, ck, t);
    K.bubble(ctx, 'Aaand… ACTION!', 1010, 200, lt, .2, { size: 30 }); EP.filmLook(ctx, t);
  });

  R_('town', (ctx, lt, dur, t, R) => {   // the face-off — close on whoever talks
    const d1 = R('draw');
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 400], [.35, 1.6, GX1 + 60, 440], [d1 - .15, 1.6, GX2 - 60, 440], [dur - .5, 1.15, 640, 430]], .5); CS.movieSet(ctx, t, 0, { tph: .2 });
    CS.longShadow(ctx, GX1, GY, 34); CS.longShadow(ctx, GX2, GY, 34);
    const v1 = say(t, TV.town, TV.draw - .1), v2 = say(t, TV.draw, TV.excuse);
    fig(ctx, 'gun1', GX1, GY, .62, { t, pose: 'idle', gestSet: ['pointSide', 'idle', 'pointSide'], turn: .7, vis: v1, listen: v2, face: { mouth: 'flat', brows: 'angry', eyes: 'squint', look: [.8, 0] } });
    fig(ctx, 'gun2', GX2, GY, .62, { t: t + 1, pose: lt > d1 - .3 ? 'hips' : 'idle', gestSet: ['idle', 'hips'], turn: -.7, vis: v2, face: { mouth: 'flat', brows: 'angry', eyes: lt < d1 && lt > 1.6 ? 'half' : 'squint', look: [-.8, 0] } });
    const u = ((lt - .6) / 3.2); if (u > 0 && u < 1) B.tumbleweed(ctx, lerp(-60, 1340, u), 690 - Math.abs(Math.sin(u * 16)) * 36, 30, t * 6);
    ctx.restore();
    K.bubble(ctx, 'This town ain\'t big enough for the both of us.', 640, 120, lt, .15, { size: 26 });
    if (lt > d1) K.bubble(ctx, 'Then draw, partner.', 640, 200, lt, d1, { size: 30 });
    EP.filmLook(ctx, t);
  });

  R_('excuse', (ctx, lt, dur, t, R) => {   // the extra wanders in — and the gunslingers can't believe it
    const w = walkIn(lt, 0, 2.2, -100, 640);
    ctx.save(); cover(ctx, lt, [[0, 1.1, 640, 470], [2.1, 1.5, 640, 480], [R('lost') - .1, 1.12, 640, 460], [R('lost') + 2.2, 1.35, 640, 470]], .6); CS.movieSet(ctx, t, 0, { tph: .5 });
    const vC = say(t, TV.excuse, TV.cut), look1 = clamp((w.x - GX1) / 300) * .9, react = lt > R('lost') + .6;
    CS.longShadow(ctx, GX1, GY, 34); CS.longShadow(ctx, GX2, GY, 34); CS.longShadow(ctx, w.x, 660, 32);
    fig(ctx, 'gun1', GX1, GY, .62, { t, pose: react ? 'crossed' : 'hips', turn: .5, listen: vC, face: { mouth: react ? 'smirk' : 'o', brows: 'skeptic', eyes: react ? 'half' : 'open', look: [look1, .1] } });
    fig(ctx, 'gun2', GX2, GY, .62, { t: t + 1, pose: lt > R('lost') + 1.4 ? 'facepalm' : 'hips', turn: -.5, listen: vC, face: { mouth: lt > R('lost') + 1.4 ? 'frown' : 'flat', brows: 'worried', eyes: lt > R('lost') + 1.4 ? 'closed' : 'open', look: [-.6, .1] } });
    CK.puff(ctx, w.x - 30, 650, (lt * 2) % 1, w.walking ? .5 : 0, 46);
    fig(ctx, 'cowhand', w.x, 660 + w.bob, .6, { t, walk: w.walking ? t * 8 : null, turn: w.walking ? .6 : 0, pose: w.walking ? 'idle' : 'shrug', gestSet: ['shrug', 'presentBoth', 'pointSideL', 'shrug'], vis: vC, face: { mouth: 'smile', brows: 'worried' } });
    CK.stink(ctx, w.x + 60, 360, t, .8);
    ctx.restore();
    if (lt < R('cows')) K.bubble(ctx, '\'Scuse me.', 640, 150, lt, .1, { size: 28 });
    else if (lt < R('lost')) K.bubble(ctx, 'Has anybody seen about two thousand cows?', 640, 130, lt, R('cows'), { size: 26 });
    else K.bubble(ctx, 'I lost \'em in a thunderstorm last night.', 640, 130, lt, R('lost'), { size: 26 });
    EP.filmLook(ctx, t);
  });

  R_('cut', (ctx, lt, dur, t, R) => {   // "CUT! Who let the extra in?"
    const sk = Math.max(0, 1 - lt / .5) * 10, jump = Math.sin(clamp(lt / .45) * Math.PI) * 40;
    ctx.save(); ctx.translate(Math.sin(lt * 60) * sk, 0); cover(ctx, lt, [[0, 1.0, 640, 360], [.2, 1.12, 560, 420], [R('wholet') - .1, 1.2, 640, 380]], .5);
    ctx.save(); ctx.filter = 'blur(3px)'; CS.movieSet(ctx, t, 0, { tumble: false }); ctx.restore();
    fig(ctx, 'cowhand', 860, 560, .4, { t, pose: lt > R('wholet') ? 'shrug' : 'wave', face: { mouth: 'grin', brows: 'up' }, light: false });
    fig(ctx, 'director', 520, 800 - jump, 1.0, { t, pose: lt < R('wholet') ? 'pointSide' : 'present', gestSet: ['pointSide', 'facepalm', 'pointSide'], turn: .25, lean: .06, face: { mouth: 'shock', brows: 'angry', eyes: 'wide' }, vis: say(t, TV.cut, TV.know) });
    ctx.restore();
    K.title(ctx, 'CUT!', lt, 0, { y: 130, size: 110, color: '#e8433a' }); if (lt > R('wholet')) K.bubble(ctx, 'Who let the extra in?', 900, 250, lt, R('wholet'), { size: 30 });
    EP.filmLook(ctx, t);
  });

  // ---------------- "None of MY cowboys look like that." ----------------
  R_('cut2', (ctx, lt, dur, t, R) => {
    const w = walkIn(lt, 0, .9, 1500, 1010), vD = say(t, TV.cut2, TV.getto - .05), vT = say(t, TV.getto, TV.trail);
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 380], [1.0, 1.35, 900, 460], [R('getto') - .15, 1.35, 380, 470]], .55); CS.prairie(ctx, t, 0, { v: 'day', seed: 7 });
    const cows = [['vet', 190, 'crossed', { mouth: 'flat', brows: 'skeptic' }], ['vaquero', 340, 'idle', { mouth: 'smirk', brows: 'skeptic' }], ['freed', 490, 'hips', { mouth: 'flat', brows: 'up' }], ['freed2', 640, 'shrug', { mouth: 'flat', brows: 'skeptic' }]];
    cows.forEach(([n, x, p, f], i) => fig(ctx, n, x, 660, .52, { t: t + i, pose: lt > .8 + i * .2 ? p : 'idle', turn: .55, listen: vD, face: Object.assign({ look: [.9, 0] }, f) }));
    fig(ctx, 'director', w.x, 760 + w.bob, .92, { t, walk: w.walking ? t * 9 : null, pose: w.walking ? 'idle' : 'pointSideL', gestSet: ['pointSideL', 'presentL', 'shrug', 'pointSideL'], turn: -.35, vis: vD, face: { mouth: 'shock', brows: 'angry', eyes: 'wide' } });
    if (lt > R('getto') - .4) { const k = clamp((lt - R('getto') + .4) / .4); theo(ctx, lerp(-120, 150, ease.out(k)), 760, .72, { t, pose: 'presentBoth', turn: .5, vis: vT, face: { mouth: 'smirk', eyes: 'half', brows: 'skeptic' } }); }
    ctx.restore();
    K.title(ctx, 'CUT!', lt, 0, { y: 110, size: 90, color: '#e8433a' }); if (lt > R('mycowboys') - .1 && lt < R('getto')) K.bubble(ctx, 'None of MY cowboys look like that!', 760, 210, lt, R('mycowboys') - .1, { size: 28 });
    if (lt > R('getto')) K.bubble(ctx, 'Yeah. We\'ll get to why.', 400, 220, lt, R('getto'), { size: 28 });
    EP.filmLook(ctx, t, .6);
  });

  // ---------------- Cookie's menu ----------------
  R_('coffee', (ctx, lt, dur, t, R) => {
    const vC = say(t, TV.coffee, TV.couldi - .05) || say(t, TV.menu, TV.morning), vT = say(t, TV.couldi, TV.menu - .05), slump = lt > R('menu') + 2.2;
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 400], [.15, 1.4, 820, 400], [R('couldi') - .1, 1.4, 430, 410], [R('menu') - .1, 1.4, 820, 400], [R('menu') + 2.1, 1.1, 640, 400]], .5);
    CS.camp(ctx, t, 0, { v: 'dawn', wagon: true });
    fig(ctx, 'cook', 860, 720, .86, { t, prop: lt < R('couldi') ? 'coffee' : 'ladle', pose: lt < R('complaints') ? 'present' : lt < R('menu') ? 'crossed' : 'pointSideL', gestSet: lt < R('menu') ? ['present', 'presentBoth', 'present'] : ['pointSideL', 'presentL', 'shrug'], turn: -.35, light: K.LIGHT.dusk, vis: vC, listen: vT,
      face: { mouth: lt > R('complaints') ? 'smirk' : 'flat', brows: 'skeptic', eyes: lt > R('complaints') && lt < R('menu') ? 'half' : 'open', look: [-.7, 0] } });
    theo(ctx, 400, 720, .82, TC({ t, prop: 'plate', pose: slump ? 'shrug' : 'present', gestSet: ['present', 'presentBoth'], turn: .35, light: K.LIGHT.dusk, vis: vT, listen: vC, lean: slump ? .06 : 0,
      face: lt > R('menu') + .4 ? { mouth: 'frown', brows: 'worried', eyes: 'half', look: [.7, .2] } : { mouth: 'smile', brows: 'up', look: [.7, 0] } }));
    ctx.restore();
    if (lt < R('beanson')) K.bubble(ctx, 'Coffee\'s on.', 760, 150, lt, .05, { size: 30 }); else if (lt < R('complaints')) K.bubble(ctx, 'Beans are on.', 760, 150, lt, R('beanson'), { size: 30 }); else if (lt < R('couldi')) K.bubble(ctx, 'Complaints are OFF.', 760, 150, lt, R('complaints'), { size: 32 });
    else if (lt < R('menu')) K.bubble(ctx, 'Could I maybe get—', 480, 160, lt, R('couldi'), { size: 30 });
    else K.bubble(ctx, 'You want a menu? Go to Kansas City.', 700, 150, lt, R('menu'), { size: 30 });
  });

  // ---------------- the bank robbers / Gary's horse ----------------
  R_('robbers', (ctx, lt, dur, t, R) => {
    const vD = say(t, TV.robbers, TV.no - .05), st = lt > R('gary') + 1 ? clamp((lt - R('gary') - 1) / .5) : 0;
    ctx.save(); cover(ctx, lt, [[0, 1.35, 300, 470], [R('no') - .1, 1.0, 640, 380], [R('gary') + .6, 1.4, 820, 500]], .6); CS.prairie(ctx, t, 0, { v: 'day', seed: 13 });
    B.steed(ctx, 800, 690, .95, t, { gait: st > 0 ? 'stand' : 'walk', coat: '#b07a4a', stumble: st > 0 ? Math.sin(st * Math.PI) * .9 : 0, rider: cast('gary', { light: { cast: 0, contact: 0 }, pose: st > 0 ? 'cheer' : 'idle', face: st > 0 ? { mouth: 'shock', eyes: 'wide', brows: 'worried' } : { mouth: 'smile', eyes: 'half' } }) });
    if (st > 0) { sh(ctx, '#5a4030', 3, c => c.ellipse(900, 700, 40, 10, 0, 0, TAU)); CK.puff(ctx, 890, 680, st, .7, 70); }
    fig(ctx, 'director', 230, 780 - (lt < .5 ? Math.sin(lt / .5 * Math.PI) * 20 : 0), .82, { t, prop: 'megaphone', pose: lt < R('no') ? 'present' : 'shrug', gestSet: ['present', 'pointSide', 'presentBoth', 'pointSide'], turn: .3, vis: vD,
      face: lt < R('no') ? { mouth: 'grin', brows: 'up', eyes: 'wide' } : lt < R('gary') + 1.2 ? { mouth: 'flat', brows: 'skeptic', eyes: 'half', look: [.9, 0] } : { mouth: 'shock', brows: 'worried', eyes: 'wide', look: [.9, .2] } });
    CS.foreground(ctx, t, 0); ctx.restore();
    if (lt < R('no')) K.bubble(ctx, 'Is this where the bank robbers show up?', 520, 160, lt, .05, { size: 28 });
    else K.tag(ctx, 'No. This is where Gary\'s horse steps in a hole.', 640, 110, lt, R('no'), { size: 26 });
  });

  // ---------------- "Fine. FINE. But the cow towns!" ----------------
  R_('fine', (ctx, lt, dur, t, R) => {
    const vD = say(t, TV.fine, TV.check - .1), hype = lt > 1.6;
    ctx.save(); cover(ctx, lt, [[0, 1.35, 640, 470], [1.6, 1.0, 640, 380], [R('shootouts') - .1, 1.25, 640, 440]], .6); CS.cowtown(ctx, t, 0, { v: 'night' });
    fig(ctx, 'director', 640, 780 - (hype ? Math.abs(Math.sin((lt - 1.6) * 5)) * 10 : 0), 1.0, { t, prop: 'megaphone', pose: hype ? 'present' : 'facepalm', gestSet: ['pointSide', 'pointSideL', 'cheer', 'presentBoth'], turn: .1, light: K.LIGHT.night, vis: vD,
      face: hype ? { mouth: 'grin', eyes: 'wide', brows: 'up' } : { mouth: 'frown', eyes: 'closed', brows: 'worried' } });
    ctx.restore();
    K.bubble(ctx, lt < R('towns') ? 'Fine. FINE.' : lt < R('shootouts') ? 'But the COW TOWNS! Abilene! Dodge City!' : 'Shootouts EVERY NIGHT!', 640, 150, lt, lt < R('towns') ? .05 : lt < R('shootouts') ? R('towns') : R('shootouts'), { size: 32 });
    EP.filmLook(ctx, t, .5);
  });

  // ---------------- Nat Love's buffalo ----------------
  R_('buffalo', (ctx, lt, dur, t, R) => {
    const vN = say(t, TV.buffalo, TV.reportedly2 - .05) || say(t, TV.newspaper, TV.didnt - .05), vT = say(t, TV.reportedly2, TV.newspaper - .05) || say(t, TV.didnt, TV.strangest);
    ctx.save(); cover(ctx, lt, [[0, 1.3, 460, 480], [R('reportedly2') - .1, 1.45, 1050, 520], [R('newspaper') - .1, 1.3, 460, 480], [R('didnt') - .1, 1.45, 1050, 520]], .45);
    CS.prairie(ctx, t, 0, { v: 'day', seed: 21 });
    for (let i = 0; i < 11; i++) { const x = 760 + (i % 4) * 120 + Math.floor(i / 4) * 40 + Math.sin(t * 2 + i) * 4, y = 560 + Math.floor(i / 4) * 50; ctx.save(); ctx.translate(x, y); ctx.scale(.42, .42); sh(ctx, '#5a3a24', 4, c => c.ellipse(0, -90, 110, 60, 0, 0, TAU)); sh(ctx, '#3e2616', 4, c => c.ellipse(80, -110, 60, 70, 0, 0, TAU)); sh(ctx, '#3e2616', 3, c => c.ellipse(100, -70, 30, 30, 0, 0, TAU)); for (const lx of [-60, -30, 40, 70]) ln(ctx, [[lx, -40], [lx, 0]], 14, '#3e2616'); ctx.restore(); ctx.save(); ctx.strokeStyle = '#c9a868'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(430, 360); ctx.quadraticCurveTo((430 + x) / 2, 290 + Math.sin(t * 3 + i) * 10, x + 30, y - 60); ctx.stroke(); ctx.restore(); }
    B.steed(ctx, 400, 690, .95, t, { gait: 'stand', coat: '#d8c4a0', paint: true, rider: cast('natlove', { light: { cast: 0, contact: 0 }, prop: lt > R('newspaper') ? 'newspaper' : 'lasso', pose: 'cheer', vis: vN, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }) });
    theo(ctx, 1110, 780, .62, { t, pose: lt > R('didnt') ? 'shrug' : 'crossed', turn: -.4, vis: vT, listen: vN, face: lt > R('didnt') ? { mouth: 'grin', eyes: 'half', blush: 1 } : { mouth: 'flat', brows: 'skeptic', eyes: 'half', look: [-.8, 0] } });
    ctx.restore();
    if (lt < R('reportedly2')) K.bubble(ctx, '…then I roped ELEVEN buffalo with one hand—', 600, 130, lt, .05, { size: 26 });
    else if (lt < R('newspaper')) K.bubble(ctx, 'Reportedly.', 800, 150, lt, R('reportedly2'), { size: 30 });
    else if (lt < R('didnt')) K.bubble(ctx, '—while reading a newspaper.', 600, 130, lt, R('newspaper'), { size: 28 });
    else K.bubble(ctx, 'That part he didn\'t say. I made that up.', 760, 150, lt, R('didnt'), { size: 28 });
  });

  // ---------------- the last take ----------------
  R_('lasttake', (ctx, lt, dur, t, R) => {
    const vD = say(t, TV.lasttake, TV.walkcows - .05) || say(t, TV.worst, TV.thejob - .05), vC = say(t, TV.walkcows, TV.worst - .05) || say(t, TV.thejob, TV.leaves);
    ctx.save(); cover(ctx, lt, [[0, 1.35, 980, 430], [R('walkcows') - .1, 1.4, 540, 420], [R('worst') - .1, 1.4, 980, 430], [R('thejob') - .1, 1.45, 540, 420]], .5);
    CS.movieSet(ctx, t, 0, { crew: true, tumble: false }); CS.longShadow(ctx, 520, 700, 40); CS.longShadow(ctx, 1000, 760, 44, 200);
    const count = [R('walkcows'), R('eatbeans'), R('singcows'), R('dontdrown')].filter(x => lt >= x).length;
    fig(ctx, 'cowhand', 520, 700, .8, { t, pose: lt > R('thejob') ? 'shrug' : count ? 'present' : 'idle', gestSet: ['present', 'presentBoth', 'pointSide', 'shrug'], turn: .45, vis: vC, listen: vD, face: lt > R('thejob') ? { mouth: 'smile', eyes: 'half', brows: 'up' } : { mouth: 'smile', brows: 'up', look: [.8, 0] } });
    fig(ctx, 'director', 1000, 760, .86, { t, prop: 'megaphone', pose: lt > R('worst') ? 'facepalm' : lt > R('walkcows') ? 'crossed' : 'present', gestSet: ['present', 'presentBoth', 'pointSideL'], turn: -.4, vis: vD, listen: vC,
      face: lt > R('worst') ? { mouth: 'frown', brows: 'worried', eyes: 'closed' } : lt > R('singcows') ? { mouth: 'frown', brows: 'skeptic', eyes: 'half', look: [-.8, 0] } : { mouth: 'open', brows: 'up', look: [-.8, 0] } });
    ctx.restore();
    if (lt < R('walkcows')) K.bubble(ctx, 'Okay, okay. Last take. What does the REAL cowboy do?', 640, 140, lt, .05, { size: 26 });
    [['Walk cows.', 'walkcows'], ['Eat beans.', 'eatbeans'], ['Sing to the cows.', 'singcows'], ['Don\'t drown.', 'dontdrown']].forEach(([s, k], i) => { if (lt < R('worst')) EP.card(ctx, s, 250, 140 + i * 72, lt, R(k), { size: 28, rot: (i % 2 ? .02 : -.02) }); });
    if (lt > R('worst') && lt < R('thejob')) K.bubble(ctx, '…That\'s the worst movie I\'ve ever heard.', 640, 140, lt, R('worst'), { size: 28 }); if (lt > R('thejob')) K.bubble(ctx, 'That\'s the job.', 640, 140, lt, R('thejob'), { size: 32 });
    CK.filmFrame(ctx, t, 1);
  });
})(window);
