/* BEAT 6: the real danger wasn't outlaws (weather + water), then the cow towns by the numbers */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, EP = G.EP, { S, fx, mood, cast, fig, theo, ride, card, talkIn } = EP;
  const TC = o => Object.assign({ outfit: 'cowTheo', hat: 'stetson', light: K.LIGHT.warm }, o);
  const icon = (ctx, kind, x, y, s, k) => { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
    if (kind === 'bullet') { sh(ctx, '#c9a648', 4, c => c.roundRect(-20, -10, 30, 60, 4)); sh(ctx, '#b07a3a', 4, c => { c.moveTo(-20, -10); c.quadraticCurveTo(-20, -60, -5, -70); c.quadraticCurveTo(10, -60, 10, -10); c.closePath(); }); }
    else if (kind === 'storm') { sh(ctx, '#6a7280', 4, c => { c.arc(-30, 0, 34, Math.PI * .5, Math.PI * 1.5); c.arc(0, -24, 40, Math.PI, 0); c.arc(34, 0, 30, Math.PI * 1.5, Math.PI * .5); c.closePath(); }); sh(ctx, '#f6d24a', 3, c => { c.moveTo(0, 20); c.lineTo(-16, 60); c.lineTo(0, 56); c.lineTo(-10, 90); c.lineTo(20, 46); c.lineTo(4, 50); c.lineTo(14, 20); c.closePath(); }); }
    else if (kind === 'water') { for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let x = -60; x <= 60; x += 6) ctx.lineTo(x, i * 26 + Math.sin(x * .12) * 8); ctx.lineWidth = 14; ctx.strokeStyle = OUT; ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#4a8ab8'; ctx.stroke(); } }
    ctx.restore(); };

  S('nobody', (ctx, lt, dur, t, R) => {   // not a bullet — weather and water
    CS.studio(ctx, t, 0);
    theo(ctx, 320, 700, .9, TC({ t, pose: Gd.pose(lt, [[0, 'present'], [R('bullet') + .6, 'crossed'], [R('weather'), 'presentBoth']]), turn: .3, vis: Gd.say(t), face: { mouth: 'smile', brows: 'up' } }));
    icon(ctx, 'bullet', 820, 330, 1.6, K.pop(lt, R('bullet'))); CK.crossOut(ctx, 820, 330, 90, clamp((lt - R('bullet') - .8) / .5));
    icon(ctx, 'storm', 760, 560, 1.2, K.pop(lt, R('weather') + .6)); icon(ctx, 'water', 1060, 560, 1.2, K.pop(lt, R('weather') + 1.2));
    K.tag(ctx, 'weather', 760, 680, lt, R('weather') + .7, { size: 26 }); K.tag(ctx, 'water', 1060, 680, lt, R('weather') + 1.3, { size: 26 });
  });
  mood('nobody', 'danger'); fx('bullet', 'whip', .4); fx('bullet', 'stamp', .4, .8); fx('weather', 'thunder', .3, .6);

  S('nps2', (ctx, lt, dur, t, R) => {   // the NPS list of real threats
    CS.prairie(ctx, t, 0, { v: 'storm', seed: 16 }); ctx.save(); ctx.fillStyle = 'rgba(20,24,30,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.title(ctx, 'THE REAL THREATS', lt, .1, { y: 100, size: 60 }); K.tag(ctx, 'per the National Park Service', 640, 170, lt, .4, { size: 22 });
    card(ctx, 'cattle panicking\nat river crossings', 230, 400, lt, R('river1'), { size: 28, rot: -.03 }); card(ctx, 'stampedes at night,\nwithout warning', 640, 430, lt, R('stampnight'), { size: 28 }); card(ctx, 'storms + lightning', 1050, 400, lt, R('storms2'), { size: 28, rot: .03 });
  });
  fx('river1', 'pop', .5); fx('stampnight', 'pop', .5); fx('storms2', 'thunder', .4);

  S('tallest', (ctx, lt, dur, t, R) => {   // a man on a horse is the tallest thing for miles
    const fl = [.6, 2.4, 3.9].reduce((a, s0) => Math.max(a, Math.max(0, Math.sin((lt - s0) * 12)) * clamp(1 - (lt - s0) / .6) * (lt > s0 ? 1 : 0)), 0);
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 560); CS.prairie(ctx, t, 0, { v: 'storm', seed: 16, flash: fl }); CK.bolt(ctx, 900, 0, 860, 470, 5, fl * 2); CK.bolt(ctx, 300, 0, 380, 450, 9, clamp(fl * 2 - .6));
    ride(ctx, 'hand', 640, 690, .9, t, { gait: 'stand', coat: '#5a3a28', riderOpts: { light: K.LIGHT.grey, face: { mouth: 'o', eyes: 'wide', brows: 'worried', look: [.4, -.6] } } });
    ln(ctx, [[640, 300], [640, 150]], 4, '#e8433a'); sh(ctx, '#e8433a', 0, c => { c.moveTo(640, 290); c.lineTo(628, 270); c.lineTo(652, 270); c.closePath(); });
    K.rain(ctx, t, 1, 200, .3); CS.foreground(ctx, t, 0, { v: 'storm' }); ctx.restore();
    K.tag(ctx, 'tallest thing for miles', 640, 120, lt, .4, { size: 30 });
  });
  fx('tallest', 'thunder', .6, .6); fx('tallest', 'thunder', .5, 2.4); fx('tallest', 'rain', .5, 0, 5);

  S('stampede', (ctx, lt, dur, t, R) => {   // two thousand animals suddenly deciding to go somewhere — in the dark
    const go = R('somewhere'), up = clamp((lt - go + .3) / .8), run = lt > go + .4, fl = Math.max(0, Math.sin((lt - go + .5) * 14)) * clamp(1 - (lt - go + .5) / .6) * (lt > go - .5 ? 1 : 0);
    ctx.save(); const sk = run ? 3 : 0; ctx.translate(Math.sin(t * 40) * sk, Math.cos(t * 33) * sk);
    CS.prairie(ctx, t, run ? (lt - go) * 140 : 0, { v: lt > go - .5 ? 'storm' : 'night', seed: 17, flash: fl }); if (lt > go - .5) CK.bolt(ctx, 700, 0, 640, 450, 7, fl * 2);
    B.herd(ctx, t, { seed: 111, n: 44, x: [-300, 1580], y: [500, 680], s: [.2, .42], mode: run ? 'run' : up > 0 ? 'stand' : 'lie', speed: run ? 300 : 0, dust: run ? .7 : 0, lift: run ? null : c => up * (c.ph > .5 ? 1 : .6) });
    if (lt > R('turn')) { const k = clamp((lt - R('turn')) / 2); ride(ctx, 'hand', lerp(-100, 900, ease.out(k)), 700, .85, t, { gait: 'gallop', coat: '#5a3a28', riderOpts: { light: K.LIGHT.grey, pose: 'pointSide', face: { mouth: 'shock', brows: 'angry' } } }); }
    ctx.restore(); if (lt < go - .5) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(50,60,110,.4)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    K.tag(ctx, '2,000 animals · each well over half a ton', 640, 110, lt, .4, { size: 28 }); if (lt > R('dark')) K.tag(ctx, 'in the dark', 640, 180, lt, R('dark'), { size: 30 }); if (lt > R('turn')) K.tag(ctx, 'your job: ride in front and turn them', 640, 640, lt, R('turn') + .2, { size: 26 });
  });
  fx('somewhere', 'thunder', .7, -.5); fx('somewhere', 'hooves', .7, .3, 8, 14); fx('somewhere', 'rumble', .5, .3, 4); fx('turn', 'whip', .4);

  S('rivers2', (ctx, lt, dur, t, R) => {   // river crossings were worse
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 520); CS.river(ctx, t, 0, { flow: 1.6 });
    B.herd(ctx, t, { seed: 121, n: 22, x: [-200, 1480], y: [520, 690], s: [.26, .42], mode: 'walk', speed: 20, each: (c, x, y, s) => { c.save(); c.fillStyle = '#7f6e4c'; c.globalAlpha = .96; c.fillRect(x - 170 * s, y - 92 * s, 400 * s, 130 * s); c.restore(); CS.waterline(c, x + 30 * s, y - 94 * s, 300 * s, t); } });
    B.steed(ctx, 700, 700, .8, t, { gait: 'swim', coat: '#5a3a28', rider: cast('hand', { light: { cast: 0, contact: 0 }, face: { mouth: 'shock', eyes: 'wide', brows: 'worried' }, pose: 'cheer' }) }); ctx.fillStyle = '#7f6e4c'; ctx.fillRect(500, 640, 420, 90); CS.waterline(ctx, 700, 642, 360, t);
    ctx.restore(); K.title(ctx, 'RIVER CROSSINGS', lt, .1, { y: 100, size: 56 }); K.tag(ctx, 'most of these young men couldn\'t swim', 640, 180, lt, R('swim'), { size: 26 });
  });
  fx('rivers2', 'river', .6, 0, 5); fx('rivers2', 'splash', .4, .8); fx('swim', 'moo', .3, .4);

  S('drownedm', (ctx, lt, dur, t, R) => {   // quiet: a grave beside the trail, the herd moves on at dawn
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.08, 520, 560); CS.prairie(ctx, t * .5, 0, { v: 'dawn', seed: 18 });
    B.herd(ctx, t, { seed: 131, n: 40, x: [500, 1700], y: [470, 520], s: [.08, .13], mode: 'walk', speed: 14, dust: .3 });
    CS.grave(ctx, 420, 650, 1.2, t); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .3; ctx.fillStyle = '#ffb070'; ctx.fillRect(0, 0, W, H); ctx.restore();
  });
  mood('drownedm', 'somber'); fx('drownedm', 'wind', .3, 0, 9);

  S('fine', (ctx, lt, dur, t, R) => {   // "Fine. FINE. But the cow towns! Shootouts every night!"
    CS.cowtown(ctx, t, 0, { v: 'night' });
    fig(ctx, 'director', 640, 780, 1.0, { t, pose: Gd.pose(lt, [[0, 'facepalm'], [1.6, 'pointUp'], [R('shootouts'), 'cheer']]), turn: .1, light: K.LIGHT.night, face: lt < 1.6 ? { mouth: 'frown', eyes: 'closed', brows: 'worried' } : { mouth: 'grin', eyes: 'wide', brows: 'up' }, vis: Gd.say(t) });
    K.bubble(ctx, lt < R('towns') ? 'Fine. FINE.' : lt < R('shootouts') ? 'But the COW TOWNS! Abilene! Dodge City!' : 'Shootouts EVERY NIGHT!', 640, 160, lt, lt < R('towns') ? .05 : lt < R('shootouts') ? R('towns') : R('shootouts'), { size: 30 });
    EP.filmLook(ctx, t, .5);
  });
  mood('fine', 'saloon'); fx('shootouts', 'whip', .5);

  const KV = { lon: -98.6, lat: 38.2, z: 1.5 }, TOWNS = ['Abilene', 'Ellsworth', 'Wichita', 'Dodge City', 'Caldwell'];
  S('check', (ctx, lt, dur, t, R) => {   // let's check: Robert Dykstra, the five Kansas cattle towns
    if (lt < R('five') - .2) { CS.studio(ctx, t, 0); theo(ctx, 320, 700, .9, { t, prop: 'magnifier', pose: 'magnify', turn: .3, vis: Gd.say(t), face: { mouth: 'smile', brows: 'up', eyes: 'squint' } });
      CK.book(ctx, 880, 360, 1, K.pop(lt, R('dykstra')), 'THE\nCATTLE\nTOWNS', 'Robert R. Dykstra · 1968', { col: '#3a5a7a', ts: 36 }); K.tag(ctx, 'historian Robert Dykstra', 880, 600, lt, R('dykstra') + .3, { size: 26 }); K.tag(ctx, 'went through the records', 880, 650, lt, R('dykstra') + 1.2, { size: 22 }); return; }
    CS.map(ctx, t, KV); TOWNS.forEach((n, i) => CS.pin(ctx, n, KV, lt, R('five') + i * .55, { size: 22, dy: i === 3 ? 40 : -66 })); FX.dateTag(ctx, 'KANSAS · THE 5 BIG CATTLE TOWNS');
  });
  mood('check', 'curious'); fx('check', 'paper', .5, .3); TOWNS.forEach((n, i) => fx('five', 'pop', .4, i * .55));

  S('y1870', (ctx, lt, dur, t, R) => {   // ~45 violent deaths, 5 towns, 15 years
    CS.map(ctx, t, KV); ctx.save(); ctx.fillStyle = 'rgba(250,240,215,.55)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.tag(ctx, '1870 – 1885', 640, 100, lt, .1, { size: 34 });
    K.counter(ctx, 640, 300, 0, 45, lt, R('fortyfive'), 1.6, '≈ violent deaths · all 5 towns combined', { prefix: '~', size: 120 });
    card(ctx, '5 towns · 15 years · ~45 violent deaths', 640, 520, lt, R('fortyfive') + 2, { size: 30 });
    K.tag(ctx, '(including killings by police)', 640, 600, lt, R('police'), { size: 24 }); K.tag(ctx, '≈ 1.5 per cattle season', 640, 660, lt, R('season') + .3, { size: 30 });
  });
  fx('fortyfive', 'tick', .5); fx('fortyfive', 'stamp', .5, 1.7); fx('season', 'ding', .4, .3);

  S('dodge', (ctx, lt, dur, t, R) => {   // Dodge City, "the wickedest town in the West": about fifteen
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.06, 640, 480); CS.cowtown(ctx, t, lt * 8, { v: 'night' });
    for (let i = 0; i < 6; i++) K.mini(ctx, ((i * 230 + t * 30) % 1500) - 100, 600 + (i % 2) * 20, 1.6, t, { walk: 1, ph: i, dir: i % 2 ? -1 : 1, skin: K.SKINS[i % 6], cloth: K.CLOTH[i % 8] });
    ctx.restore(); FX.dateTag(ctx, 'DODGE CITY, KANSAS'); K.title(ctx, '"THE WICKEDEST TOWN IN THE WEST"', lt, R('wickedest'), { y: 100, size: 44 });
    K.counter(ctx, 640, 290, 0, 15, lt, R('fifteen'), 1.2, 'violent deaths in its cowboy years', { prefix: '~', size: 100 });
    if (lt > R('point2')) card(ctx, 'Dykstra: the movie cow town belongs more\nto imagination than to history', 640, 560, lt, R('point2') + .2, { size: 26 });
  });
  fx('wickedest', 'whip', .4); fx('fifteen', 'tick', .5); fx('point2', 'paper', .4);

  S('why2', (ctx, lt, dur, t, R) => {   // violence sells newspapers
    CS.studio(ctx, t, 0); ctx.save(); ctx.fillStyle = 'rgba(40,20,10,.2)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    CK.newspaper(ctx, 400, 300, .9, clamp((lt - R('sells')) / .35), 'GUNFIGHT\nIN DODGE!', 'Our correspondent fears for his life', { rot: -.08, mast: 'EASTERN HERALD' });
    CK.newspaper(ctx, 850, 380, .9, clamp((lt - R('eastern')) / .35), 'WICKEDEST\nTOWN IN THE WEST', 'Sinners! Saloons! Six-guns!', { rot: .06, mast: 'NEW YORK GAZETTE' });
    if (lt > R('locals')) { const k = K.pop(lt, R('locals')); fig(ctx, 'boss', 1100, 760, .7 * Math.max(.01, k), { t, prop: 'cash', pose: 'present', turn: -.4, face: { eyes: 'wink', mouth: 'grin' } }); K.tag(ctx, 'locals played along', 1080, 420, lt, R('locals') + .2, { size: 24 }); }
    if (lt > R('business')) K.tag(ctx, 'great for business', 1080, 470, lt, R('business'), { size: 26 }); K.title(ctx, 'VIOLENCE SELLS', lt, R('sells') - .3, { y: 90, size: 54 });
  });
  mood('why2', 'saloon'); fx('sells', 'stamp', .6); fx('eastern', 'stamp', .6); fx('business', 'clink', .5);

  S('hollywood', (ctx, lt, dur, t, R) => {   // Hollywood bought the package
    CS.movieSet(ctx, t, 0, { crew: true });
    CK.book(ctx, 640, 360, 1.1, K.pop(lt, .2), 'GUNFIGHT\nAT HIGH NOON', 'NOW SHOWING', { col: '#2a2a2e', ink: '#f2f2f2', ts: 38, art: c => { c.filter = 'grayscale(1)'; Gd.draw(c, -40, 110, .3, cast('gun1', { t, pose: 'hips', light: false })); Gd.draw(c, 60, 110, .3, cast('gun2', { t, pose: 'hips', light: false, mirror: true })); c.filter = 'none'; } });
    K.tag(ctx, 'a few decades later: Hollywood bought the whole package', 640, 80, lt, .3, { size: 24 }); EP.filmLook(ctx, t, .8);
  });
  mood('hollywood', 'western'); fx('hollywood', 'whoosh', .4);

  S('fair', (ctx, lt, dur, t, R) => {   // to be fair: Dodge was rough in its very first year
    CS.cowtown(ctx, t, 0, { v: 'day' }); ctx.save(); ctx.filter = 'sepia(.6)'; ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .4; ctx.fillStyle = '#c08040'; ctx.fillRect(0, 0, W, H); ctx.restore();
    FX.dateTag(ctx, 'DODGE CITY · 1872'); K.title(ctx, 'TO BE FAIR…', lt, .1, { y: 100, size: 56 });
    card(ctx, 'rough in its very first year', 640, 230, lt, .6, { size: 28 }); K.tag(ctx, 'before it was a cow town', 360, 330, lt, R('cowtown2'), { size: 24 }); K.tag(ctx, 'before real law enforcement', 920, 330, lt, R('law'), { size: 24 }); K.tag(ctx, 'historians argue about the early frontier', 640, 420, lt, R('argue'), { size: 24 });
  });
  mood('fair', 'curious'); fx('cowtown2', 'pop', .4); fx('law', 'pop', .4); fx('argue', 'pop', .4);

  S('paycheck', (ctx, lt, dur, t, R) => {   // more likely to lose his paycheck at a card table than his life
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 520); CS.saloon(ctx, t, 0);
    fig(ctx, 'cowhand', 360, 760, .75, { t, hat: 'battered', pose: lt > 3.5 ? 'facepalm' : 'idle', turn: .4, face: lt > 3.5 ? { mouth: 'frown', brows: 'worried', eyes: 'closed' } : { mouth: 'smile', brows: 'up' } });
    fig(ctx, 'gun1', 720, 760, .75, { t, pose: lt > 3.5 ? 'present' : 'crossed', prop: lt > 3.5 ? 'cash' : null, turn: -.4, hat: 'stetsonBlack', face: { mouth: 'smirk', eyes: 'half' } });
    const r = rng(3); for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(460 + i * 34, 590 + r() * 6); ctx.rotate((r() - .5) * .5); sh(ctx, '#f6f2e6', 2.5, c => c.roundRect(-14, -20, 28, 40, 3)); CK.txt(ctx, ['A', 'K', '7', '2', 'Q'][i], 0, 0, '700 16px Fredoka', i % 2 ? '#b8322a' : '#1e1e22'); ctx.restore(); }
    const cash = clamp((lt - 3) / .8); ctx.save(); ctx.translate(lerp(440, 640, ease.inOut(cash)), 580); sh(ctx, '#8fb07a', 3, c => c.roundRect(-26, -10, 52, 20, 3)); ctx.restore();
    ctx.restore(); K.tag(ctx, 'lose his paycheck at a card table', 640, 100, lt, .5, { size: 28 }); K.tag(ctx, '…not his life in a shootout', 640, 160, lt, 2.6, { size: 26 });
    CK.counter(ctx, 1110, 260, lt, 4.5, { s: .62, note: 'still basically 0' });
  });
  fx('paycheck', 'paper', .3, 1); fx('paycheck', 'clink', .5, 3.4); fx('paycheck', 'stamp', .4, 4.6);
})(window);
