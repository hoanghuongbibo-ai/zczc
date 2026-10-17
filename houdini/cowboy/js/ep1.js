/* BEAT 3 (who takes a job like this) + BEAT 4, first half (dawn at the chuck wagon) */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, EP = G.EP, { S, fx, mood, cast, fig, theo, ride, card, talkIn } = EP;
  const TC = o => Object.assign({ outfit: 'cowTheo', hat: 'stetson', light: K.LIGHT.warm }, o);   // Theo on the trail

  S('began', (ctx, lt, dur, t, R) => { const v = { lon: -100.5, lat: 34.2, z: .6 }; CS.map(ctx, t, v);
    CS.route(ctx, CS.TRAILS.chisholm, v, clamp(lt / 1.2), { label: 'Chisholm Trail', labelAt: [-96.4, 35.4] });
    CS.route(ctx, CS.TRAILS.western, v, clamp((lt - .5) / 1.2), { col: '#c06a1a', label: 'Western Trail', labelAt: [-100.9, 34.0] });
    CS.route(ctx, CS.TRAILS.goodnight, v, clamp((lt - 1) / 1.4), { col: '#3a6a9a', label: 'Goodnight-Loving', labelAt: [-104.4, 32.6] });
    FX.dateTag(ctx, '1866 – 1880s'); K.title(ctx, 'THE TRAIL DRIVES BEGIN', lt, .1, { y: 80, size: 50 }); });
  mood('began', 'trail'); fx('began', 'whoosh', .5); fx('began', 'paper', .4, .6);

  S('outfit', (ctx, lt, dur, t, R) => {   // a typical outfit: 12–15 people, up to 2,000 head
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.prairie(ctx, t, lt * 4, { v: 'day', seed: 6 });
    B.herd(ctx, t, { seed: 51, n: 70, x: [-200, 1480], y: [470, 600], s: [.1, .24], mode: 'walk', speed: 14, dust: .45, pan: lt * 4 });
    for (let i = 0; i < 6; i++) B.mini(ctx, ((i * 260 + t * 14) % 1600) - 160, i % 2 ? 470 : 610, i % 2 ? .3 : .42, t + i, { gait: 'walk', shirt: ['#b9573e', '#3f6f9a', '#e6d8b6', '#5f7a4a', '#a8392f', '#4a6f98'][i], skin: ['#f0c4a0', '#7a4e34', '#c88a5e', '#f2c8a4', '#6a4430', '#e2aa82'][i] });
    const bk = clamp((lt - R('boss') + .4) / .6); if (bk > 0) ride(ctx, 'boss', lerp(1400, 980, ease.out(bk)), 700, .82, t, { gait: bk < 1 ? 'trot' : 'walk', coat: '#3a2a20', dir: -1 });
    if (lt > R('wrangler') - .3) { for (let i = 0; i < 5; i++) B.steed(ctx, 120 + i * 70 + Math.sin(t + i) * 6, 650 + (i % 2) * 20, .32, t + i * .7, { gait: 'walk', saddle: false, coat: ['#8a5a36', '#c9a070', '#3a2a20', '#a87a4a', '#6a4a30'][i], paint: i === 1 }); ride(ctx, 'wrangler', 470, 690, .55, t, { gait: 'walk', coat: '#a87a4a' }); }
    CS.foreground(ctx, t, lt * 4); ctx.restore();
    K.tag(ctx, '12–15 people', 300, 120, lt, R('twelve'), { size: 30 }); K.tag(ctx, 'up to 2,000 head', 640, 180, lt, R('twelve') + 1.6, { size: 30 });
    K.tag(ctx, 'trail boss', 1000, 390, lt, R('boss'), { size: 24 }); K.tag(ctx, 'cook', 760, 330, lt, R('boss') + .9, { size: 24 }); K.tag(ctx, 'wrangler', 420, 470, lt, R('wrangler'), { size: 24 }); K.tag(ctx, 'hands', 820, 470, lt, R('hands'), { size: 24 }); K.tag(ctx, 'some of them teenagers', 640, 260, lt, R('teens'), { size: 28 });
  });
  fx('outfit', 'hooves', .25, 0, 6); fx('outfit', 'moo', .35, 2); fx('boss', 'hooves', .4, -.3, 1.4);

  S('wanted', (ctx, lt, dur, t, R) => {   // the job posting
    CS.cowtown(ctx, t, 0, { v: 'day' }); ctx.save(); ctx.fillStyle = 'rgba(40,20,10,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const lines = [['young men', 'young'], ['must ride', 'ride'], ['must not mind sleeping on the', 'ground'], ['ground for three months', 'ground'], ['must accept being trampled,', 'trampled'], ['drowned', 'drowned'], ['or struck by lightning', 'lightning']];
    CK.poster(ctx, 640, 380, 640, 680, { seed: 7, scale: K.pop(lt, .05, .4), rot: -.01, draw: c => {
      CK.txt(c, 'WANTED', 0, -280, '84px "Luckiest Guy"', '#5a2a1a'); ln(c, [[-260, -228], [260, -228]], 3, '#5a2a1a');
      lines.forEach(([l, k], i) => { const a = clamp((lt - R(k) - (i === 3 ? .8 : 0)) / .25); if (a <= 0) return; c.save(); c.globalAlpha = a; CK.txt(c, l, 0, -186 + i * 44, `700 ${i === 0 ? 34 : 28}px Fredoka`, '#2e2014'); c.restore(); });
      if (lt > R('thirty')) { CK.txt(c, 'PAY: $30 a month', 0, 150, '40px "Luckiest Guy"', '#2e6a3a'); } if (lt > R('beans')) { CK.txt(c, 'FOOD: BEANS', 0, 214, '44px "Luckiest Guy"', '#8a3a22'); }
      if (lt > R('trampled')) for (const [k2, x] of [['trampled', -270], ['drowned', 250], ['lightning', -250]]) { if (lt > R(k2) + .1) { const yy = k2 === 'trampled' ? 30 : k2 === 'drowned' ? 74 : 118; c.save(); c.translate(x, yy - 6); c.font = '28px sans-serif'; c.restore(); } } } });
    if (lt > R('beans') - .1) { const u = clamp((lt - R('beans') + .1) / 1); for (let i = 0; i < 10; i++) K.mini(ctx, lerp(1400, 900 - i * 34, ease.out(clamp(u * 1.4 - i * .04))), 700, 1.5, t, { walk: u < 1 ? 1 : 0, ph: i, dir: -1, skin: K.SKINS[i % 6], cloth: K.CLOTH[i % 8], hair: K.HAIRS[i % 6], wave: i === 2 }); }
  });
  mood('wanted', 'saloon'); fx('wanted', 'paper', .6); ['young', 'ride', 'ground', 'trampled', 'drowned', 'lightning'].forEach(k => fx(k, 'tick', .5)); fx('thirty', 'clink', .6); fx('beans', 'stamp', .6); fx('beans', 'crowd', .4, .1, 1.4);

  S('signed', (ctx, lt, dur, t, R) => {   // who signed up: veterans, vaqueros, freedmen
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.03, 640, 500); CS.prairie(ctx, t, 0, { v: 'day', seed: 7 });
    B.herd(ctx, t, { seed: 61, n: 26, x: [-200, 1480], y: [470, 540], s: [.1, .16], mode: 'mix', speed: 4 });
    const who = [['vet', 200, 'southerners', 'White Southerners, back from the war'], ['vaquero', 430, 'vaqueros', 'Mexican & Tejano vaqueros'], ['vaquero2', 600, 'vaqueros', null], ['freed', 830, 'freedmen', 'freedmen'], ['freed2', 1040, 'freedmen', null]];
    who.forEach(([n, x, k, label], i) => { const kk = K.pop(lt, R(k) + (i === 2 || i === 4 ? .35 : 0), .4); if (kk <= .01) return; fig(ctx, n, x, 700 - (1 - kk) * 40, .62, { t: t + i, pose: i === 1 ? 'wave' : i === 3 ? 'hips' : 'idle', turn: (640 - x) / 900, face: { mouth: 'smile' } }); });
    CS.foreground(ctx, t, 0); ctx.restore();
    K.tag(ctx, 'anyone who could ride and needed work', 640, 90, lt, R('anyone'), { size: 28 });
    K.tag(ctx, 'White Southerners, back from the war', 220, 230, lt, R('southerners'), { size: 20 }); K.tag(ctx, 'Mexican & Tejano vaqueros', 520, 180, lt, R('vaqueros'), { size: 20 }); K.tag(ctx, 'freedmen', 940, 230, lt, R('freedmen'), { size: 22 });
    if (lt > R('oneinfour')) EP.card(ctx, '~1 in 4 cowboys were Black\n(estimates vary)', 640, 330, lt, R('oneinfour') + .3, { size: 32 });
  });
  mood('signed', 'trail'); fx('southerners', 'pop', .4); fx('vaqueros', 'pop', .4); fx('freedmen', 'pop', .4); fx('oneinfour', 'stamp', .5, .3);

  S('cut2', (ctx, lt, dur, t, R) => {   // "CUT! None of my cowboys look like that." — "Yeah. We'll get to why."
    const sk = Math.max(0, 1 - lt / .4) * 8; ctx.save(); ctx.translate(Math.sin(lt * 60) * sk, 0); CS.prairie(ctx, t, 0, { v: 'day', seed: 7 });
    ['vet', 'vaquero', 'freed', 'freed2'].forEach((n, i) => fig(ctx, n, 160 + i * 150, 660, .5, { t: t + i, pose: 'idle', turn: .5, face: { mouth: 'flat', brows: 'skeptic', look: [.8, 0] } }));
    const dk = clamp(lt / .4); fig(ctx, 'director', lerp(1500, 1000, ease.out(dk)), 760, .92, { t, pose: Gd.pose(lt, [[0, 'pointSideL'], [2, 'crossed']]), turn: -.3, face: { mouth: 'shock', brows: 'angry', eyes: 'wide' }, vis: Gd.say(t, TV.cut2, TV.getto) });
    ctx.restore(); K.title(ctx, 'CUT!', lt, 0, { y: 110, size: 90, color: '#e8433a' }); K.bubble(ctx, 'None of MY cowboys look like that!', 900, 230, lt, R('mycowboys'), { size: 26 });
    if (lt > R('getto')) { theo(ctx, 120, 760, .72, { t, pose: 'present', turn: .5, face: { mouth: 'smirk', eyes: 'half', brows: 'skeptic' }, vis: Gd.say(t) }); K.bubble(ctx, 'Yeah. We\'ll get to why.', 330, 330, lt, R('getto'), { size: 26 }); }
    EP.filmLook(ctx, t, .6);
  });
  mood('cut2', 'comic'); fx('cut2', 'clap', .6); fx('cut2', 'stamp', .5, .05);

  // ===================== BEAT 4 — a day on the trail =====================
  S('trail', (ctx, lt, dur, t, R) => {   // Theo spins into his trail kit
    CS.studio(ctx, t, 0); const sp = .5, k = clamp((lt - sp) / .5), th = ease.inOut(k) * TAU * 1.5, after = lt > sp + .25;
    const o = { t, turn: k > 0 && k < 1 ? Math.sin(th) : 0, back: k > 0 && k < 1 && Math.cos(th) < 0, vis: Gd.say(t), pose: after ? Gd.pose(lt - sp, [[0, 'idle'], [.6, 'thumbsUp'], [2.2, 'present']]) : 'present', hair: Gd.hairRing(lt - sp - .4, .5), face: { mouth: 'grin', brows: 'up', eyes: after && lt < 2 ? 'happy' : 'open' } };
    K.fig(ctx, 420, 700, .95, after ? TC(o) : Object.assign({ light: K.LIGHT.warm }, o)); K.puff(ctx, 420, 470, clamp((lt - sp - .2) / .25), 1 - clamp((lt - sp - .45) / .4));
    K.title(ctx, 'YOU: NEW HAND, 1870s', lt, .4, { y: 90, size: 50 });
    EP.card(ctx, 'Kansas: 2–3 months away', 920, 260, lt, R('months'), { size: 30, rot: .03 });
    if (lt > R('yourday')) { const words = [['DAWN', '#f2a060'], ['MORNING', '#f6c945'], ['NOON', '#f6c945'], ['AFTERNOON', '#e8a03a'], ['NIGHT', '#3a4a7a']]; words.forEach(([w, c], i) => { const kk = K.pop(lt, R('yourday') + i * .15); if (kk <= 0) return; ctx.save(); ctx.translate(920, 360 + i * 56); ctx.scale(kk, kk); sh(ctx, c, 3, circ(-120, 0, 14)); CK.txt(ctx, w, -96, 2, '30px "Luckiest Guy"', '#5a3420', 'left'); ctx.restore(); }); }
  });
  mood('trail', 'western'); fx('trail', 'whoosh', .7, .5); fx('trail', 'pop', .6, .75); fx('months', 'paper', .5); fx('yourday', 'tick', .5);

  S('dawn', (ctx, lt, dur, t, R) => {   // DAWN: the cook is yelling
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 560); CS.camp(ctx, t, 0, { v: 'dawn' });
    const up = clamp((lt - R('wake') - .4) / .5);
    ctx.save(); ctx.translate(lerp(300, 330, up), lerp(670, 700, up)); ctx.rotate(-Math.PI / 2 * (1 - ease.out(up))); Gd.draw(ctx, 0, 0, .62, TC({ t, hat: up > .5 ? 'stetson' : 'none', light: Object.assign({}, K.LIGHT.dusk, { cast: 0, contact: up }), pose: up < 1 ? 'idle' : 'facepalm', face: up < .05 ? { eyes: 'closed', mouth: 'o' } : { eyes: 'half', mouth: 'frown', brows: 'worried' } })); ctx.restore();
    if (up < .05) { sh(ctx, '#3a5a7a', 3.5, c => c.roundRect(170, 650, 260, 44, 20)); K.bubble(ctx, 'z z z', 260, 560, lt, .1, { size: 24 }); }
    fig(ctx, 'cook', 760, 700, .74, { t, pose: Gd.pose(lt, [[0, 'pointSideL'], [R('grumpy'), 'hips']]), turn: -.4, light: K.LIGHT.dusk, face: { mouth: 'shock', brows: 'angry', eyes: 'squint' }, talk: lt > R('wake') ? .5 + .5 * Math.sin(t * 16) : 0 });
    ctx.restore(); CK.dayBanner(ctx, 'DAWN', lt, .1, { icon: 'dawn' });
    if (lt > R('wake') + .2) K.bubble(ctx, 'UP! UP! UP!', 820, 250, lt, R('wake') + .2, { size: 34 });
    if (lt > R('alarm')) { const k = K.pop(lt, R('alarm')); ctx.save(); ctx.translate(1110, 420); ctx.scale(k, k); sh(ctx, '#c9a648', 4, circ(0, 0, 46)); sh(ctx, '#f6ead0', 3, circ(0, 0, 36)); ln(ctx, [[0, 0], [0, -24]], 4); ln(ctx, [[0, 0], [16, 6]], 4); for (const sd of [-1, 1]) sh(ctx, '#c9a648', 3, circ(sd * 34, -40, 14)); ctx.restore(); CK.crossOut(ctx, 1110, 420, 60, clamp((lt - R('alarm') - .3) / .4)); }
    K.tag(ctx, 'a man', 760, 330, lt, R('aman'), { size: 26 }); K.tag(ctx, 'a GRUMPY one', 780, 380, lt, R('grumpy'), { size: 28, rot: .04 });
  });
  mood('dawn', 'campfire'); fx('dawn', 'fire', .4, 0, 7); fx('wake', 'cough', .2, .1); fx('wake', 'stamp', .4, .2); fx('alarm', 'ping', .3); fx('grumpy', 'pluckUp', .4);

  S('important', (ctx, lt, dur, t, R) => {   // the cook: the most important person on the drive
    CS.camp(ctx, t, 0, { v: 'dawn', wagon: true }); ctx.save(); ctx.fillStyle = 'rgba(30,20,30,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    fig(ctx, 'cook', 400, 720, 1.0, { t, pose: Gd.pose(lt, [[0, 'crossed'], [5, 'hips'], [9, 'idle']]), turn: .25, light: K.LIGHT.dusk, face: { mouth: 'smirk', brows: 'skeptic', eyes: 'half' } });
    K.title(ctx, 'THE COOK', lt, .1, { x: 880, y: 120, size: 64 }); K.tag(ctx, 'most important person on the drive', 880, 200, lt, .6, { size: 26 });
    K.tag(ctx, 'typically an older ex-cowboy', 880, 270, lt, R('nps') + .6, { size: 26 });
    CK.priceTag(ctx, 800, 450, 'cook', '$50/mo', K.pop(lt, R('fifty') + .3, .5), { col: '#2e6a3a', size: 36 }); CK.priceTag(ctx, 1040, 470, 'you', '$30/mo', K.pop(lt, R('morethan'), .5), { size: 36 });
    if (lt > R('chuck') - 1) {}
  });
  fx('important', 'ding', .4, .6); fx('fifty', 'clink', .5, .3); fx('morethan', 'pluckUp', .4);

  S('chuck', (ctx, lt, dur, t, R) => {   // the chuck wagon
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 520); CS.camp(ctx, t, 0, { v: 'dawn', wagon: false });
    CS.wagon(ctx, 760, 640, 1.15, t, { open: true, labels: lt - R('rolling') });
    ctx.restore(); K.title(ctx, 'THE CHUCK WAGON', lt, .1, { y: 80, size: 58 });
    if (lt > R('goodnight') - 0 || lt > R('rolling') + 2.2) { CK.portrait(ctx, 190, 370, .55, K.pop(lt, R('rolling') + 2.4), c => Gd.draw(c, 0, 330, .62, cast('goodnight', { t, pose: 'idle', light: false, face: { mouth: 'smile' } })), { name: 'Charles Goodnight', sub: 'usually credited · 1866' }); }
  });
  fx('chuck', 'hooves', .2, 0, 1.4); fx('rolling', 'pop', .4); fx('rolling', 'pop', .4, .5); fx('rolling', 'pop', .4, 1);

  S('coffee', (ctx, lt, dur, t, R) => {   // skit: Cookie's menu
    ctx.save(); EP.push(ctx, lt, dur, 1.02, 1.08, 640, 560); CS.camp(ctx, t, 0, { v: 'dawn', wagon: true });
    fig(ctx, 'cook', 860, 720, .86, { t, prop: lt < R('couldi') ? 'coffee' : 'ladle', pose: Gd.pose(lt, [[0, 'present'], [R('complaints'), 'crossed'], [R('menu'), 'pointSideL']]), turn: -.35, light: K.LIGHT.dusk, face: { mouth: lt > R('complaints') ? 'smirk' : 'flat', brows: 'skeptic', eyes: 'half' }, vis: Gd.say(t, TV.coffee, TV.couldi - .1) || Gd.say(t, TV.menu, TV.morning) });
    theo(ctx, 360, 720, .82, TC({ t, prop: 'plate', pose: lt > R('menu') + .6 ? 'shrug' : 'present', turn: .35, light: K.LIGHT.dusk, face: lt > R('menu') ? { mouth: 'frown', brows: 'worried', eyes: 'half' } : { mouth: 'smile', brows: 'up' }, vis: Gd.say(t, TV.couldi, TV.menu - .1) }));
    ctx.restore();
    K.bubble(ctx, 'Coffee\'s on.', 960, 200, lt, .05, { size: 28 }); if (lt > R('beanson')) K.bubble(ctx, 'Beans are on.', 1010, 270, lt, R('beanson'), { size: 28 }); if (lt > R('complaints')) K.bubble(ctx, 'Complaints are OFF.', 980, 340, lt, R('complaints'), { size: 30 });
    if (lt > R('couldi') && lt < R('menu')) K.bubble(ctx, 'Could I maybe get—', 320, 300, lt, R('couldi'), { size: 28 });
    if (lt > R('menu')) K.bubble(ctx, 'You want a menu? Go to Kansas City.', 860, 160, lt, R('menu'), { size: 28 });
  });
  mood('coffee', 'comic'); fx('beanson', 'pop', .3); fx('complaints', 'stamp', .4); fx('menu', 'pluckUp', .4, 1.2);
})(window);
