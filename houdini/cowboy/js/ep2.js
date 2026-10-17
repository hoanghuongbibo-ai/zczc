/* BEAT 4, second half: morning on the trail → drag → noon → Gary's horse → boredom → night guard + the song */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, EP = G.EP, { S, fx, mood, cast, fig, theo, ride, card, talkIn } = EP;
  const TC = o => Object.assign({ outfit: 'cowTheo', hat: 'stetson', light: K.LIGHT.warm }, o);
  const theoRide = (ctx, x, y, s, t, o = {}) => B.steed(ctx, x, y, s, t, Object.assign({ coat: '#c9a070', blanket: '#3a6a9a', rider: TC(Object.assign({ light: { cast: 0, contact: 0 } }, o.r || {})) }, o));

  S('morning', (ctx, lt, dur, t, R) => {   // MORNING: the herd strung out over a mile — walk, don't run
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04); CS.prairie(ctx, t, lt * 8, { v: 'day', seed: 8 });
    B.herd(ctx, t, { seed: 71, n: 110, x: [-300, 1580], y: [460, 560], s: [.07, .17], mode: 'walk', speed: 10, dust: .4, pan: lt * 8 });
    for (let i = 0; i < 5; i++) B.mini(ctx, ((i * 330 + t * 10) % 1700) - 200, i % 2 ? 452 : 575, i % 2 ? .22 : .3, t + i, { gait: 'walk', shirt: ['#3f6f9a', '#b9573e', '#e6d8b6', '#5f7a4a', '#a8392f'][i] });
    CS.foreground(ctx, t, lt * 8); ctx.restore(); CK.dayBanner(ctx, 'MORNING', lt, .1);
    K.tag(ctx, 'strung out over a mile', 640, 210, lt, .8, { size: 28 }); K.tag(ctx, 'you don\'t run it — you WALK it', 640, 640, lt, R('walkit'), { size: 28 });
    if (lt > R('miles')) { const k = K.pop(lt, R('miles')); ctx.save(); ctx.translate(1070, 300); ctx.scale(k, k); sh(ctx, '#f6ead0', 4, c => c.arc(0, 0, 90, Math.PI, 0)); for (let i = 0; i <= 6; i++) { const a = Math.PI + i / 6 * Math.PI; ln(ctx, [[Math.cos(a) * 70, Math.sin(a) * 70], [Math.cos(a) * 84, Math.sin(a) * 84]], 3); } const a = Math.PI + clamp((lt - R('miles')) / 1.2) * Math.PI * .5; ln(ctx, [[0, 0], [Math.cos(a) * 66, Math.sin(a) * 66]], 6, '#b8322a'); sh(ctx, OUT, 0, circ(0, 0, 8)); CK.txt(ctx, '10–15 mi/day', 0, 30, '26px "Luckiest Guy"', '#5a3420'); ctx.restore(); }
  });
  mood('morning', 'trail'); fx('morning', 'hooves', .2, 0, 6); fx('morning', 'moo', .3, 2.5); fx('miles', 'tick', .5);

  S('faster', (ctx, lt, dur, t, R) => {   // push faster → skinny cattle → cheap
    CS.prairie(ctx, t, lt * 50, { v: 'day', seed: 8 }); const run = lt < R('skinny') - .3, thin = clamp((lt - .6) / 1.4);
    ctx.save(); ctx.translate(640, 640); ctx.scale(1 - thin * .25, 1); B.longhorn(ctx, 0, 0, 1.3, t, { mode: run ? 'run' : 'walk', coat: 5 }); ctx.restore();
    CS.foreground(ctx, t, lt * 50); K.tag(ctx, 'push faster = cattle lose weight', 640, 120, lt, .2, { size: 28 });
    CK.priceTag(ctx, 1040, 300, 'price', lt > R('skinny') ? '$' : '$$$', K.pop(lt, R('skinny') - .4, .4), { col: lt > R('skinny') ? '#b8322a' : '#2e6a3a' }); if (lt > R('skinny')) K.tag(ctx, 'skinny cattle sell cheap', 640, 200, lt, R('skinny'), { size: 28 });
  });
  fx('faster', 'hooves', .4, 0, 1.5); fx('skinny', 'pluckUp', .4);

  S('patient', (ctx, lt, dur, t, R) => {   // a 1,000-mile exercise in being patient with cows
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.prairie(ctx, t, lt * 10, { v: 'day', seed: 9 });
    B.longhorn(ctx, 880, 690, .9, t, { mode: 'stand', coat: 2, dir: -1 });
    theoRide(ctx, 420, 700, 1.05, t, { gait: 'walk', r: { pose: lt > 2.5 ? 'facepalm' : 'idle', face: lt > 1.8 ? { mouth: 'o', eyes: 'half' } : { mouth: 'flat', eyes: 'half' } } });
    CS.foreground(ctx, t, lt * 10); ctx.restore();
    K.counter(ctx, 640, 130, 0, 1000, lt, .3, 4, 'miles of being patient with cows', { suffix: ' mi', size: 80 });
  });
  fx('patient', 'moo', .4, 1.5);

  // overhead diagram of a herd on the move with the riders' positions
  function positions(ctx, lt, t, R) {
    CS.prairie(ctx, t, 0, { v: 'day', seed: 10 }); ctx.save(); ctx.fillStyle = 'rgba(250,240,215,.55)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const r = rng(5); for (let i = 0; i < 160; i++) { const u = r(), v2 = (r() - .5) * 2, x = 160 + u * 860 + Math.sin(t * 2 + i) * 3, y = 400 + v2 * 120 * Math.sin(Math.PI * Math.min(1, u * 1.2 + .1)); B.longhorn(ctx, x + t * 6 % 20, y, .13, t + i, { mode: 'walk', coat: i % 9 }); }
    ln(ctx, [[1050, 400], [1180, 400]], 6, '#b8322a'); sh(ctx, '#b8322a', 0, c => { c.moveTo(1200, 400); c.lineTo(1176, 386); c.lineTo(1176, 414); c.closePath(); });
    const dot = (x, y, col, lab, t0, rot) => { const k = K.pop(lt, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); sh(ctx, col, 4, circ(0, 0, 18)); sh(ctx, '#f6ead0', 0, circ(-5, -5, 5)); ctx.restore(); K.tag(ctx, lab, x, y - 44, lt, t0 + .1, { size: 24, rot }); };
    dot(1060, 340, '#b8322a', 'POINT', R('point')); dot(1060, 460, '#b8322a', 'POINT', R('point') + .2);
    dot(800, 250, '#3f6f9a', 'SWING', R('sides')); dot(800, 560, '#3f6f9a', 'SWING', R('sides') + .2); dot(470, 270, '#5f7a4a', 'FLANK', R('sides') + .6); dot(470, 545, '#5f7a4a', 'FLANK', R('sides') + .8);
    dot(110, 400, '#8a6a46', 'DRAG', R('drag'));
    if (lt > R('rotate') && lt < R('point')) { const a = (lt - R('rotate')) * 2; for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(640, 400); ctx.rotate(a + i * 2.1); sh(ctx, '#e8c25a', 3, circ(320, 0, 12)); ctx.restore(); } K.tag(ctx, 'riders rotate', 640, 120, lt, R('rotate'), { size: 28 }); }
    K.tag(ctx, 'you get a position', 640, 650, lt, .2, { size: 28 });
    if (lt > R('line')) K.tag(ctx, 'keep the herd in line', 640, 120, lt, R('line'), { size: 26 }); if (lt > R('slow')) K.tag(ctx, 'the slow, the sick, the stubborn', 300, 560, lt, R('slow'), { size: 22 });
  }
  S('position', (ctx, lt, dur, t, R) => positions(ctx, lt, t, R));
  fx('position', 'paper', .4); fx('point', 'pop', .5); fx('sides', 'pop', .5); fx('sides', 'pop', .4, .6); fx('drag', 'pop', .5);

  S('newguy', (ctx, lt, dur, t, R) => {   // where you end up, new guy: twelve hours of dust
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.06, 640, 520); CS.prairie(ctx, t, lt * 6, { v: 'day', seed: 11 });
    B.herd(ctx, t, { seed: 81, n: 30, x: [500, 1700], y: [470, 600], s: [.2, .4], mode: 'walk', speed: 0, dust: 1, dustN: 22 });
    const cough = lt > R('dust') + 1.6 ? Math.max(0, Math.sin((lt - R('dust') - 1.6) * 10)) : 0;
    theoRide(ctx, 360, 700, 1.05, t, { gait: 'walk', r: { pose: cough > .2 ? 'facepalm' : 'idle', face: cough > .2 ? { mouth: 'shock', eyes: 'closed', brows: 'worried' } : { mouth: 'frown', eyes: 'squint', brows: 'worried' } } });
    ctx.save(); const r = rng(4); for (let i = 0; i < 14; i++) { const k = (t * .15 + r()) % 1, x = 300 + r() * 1000 - k * 200, y = 640 - k * 200; const gr = ctx.createRadialGradient(x, y, 0, x, y, 160); gr.addColorStop(0, `rgba(210,180,130,${.5 * (1 - k)})`); gr.addColorStop(1, 'rgba(210,180,130,0)'); ctx.fillStyle = gr; ctx.fillRect(x - 160, y - 160, 320, 320); } ctx.restore();
    CS.foreground(ctx, t, lt * 6); ctx.restore();
    K.tag(ctx, 'DRAG', 360, 120, lt, .1, { size: 40 }); K.tag(ctx, 'eating the dust of 2,000 animals · 12 hours', 640, 640, lt, R('dust') + .2, { size: 26 });
    if (cough > 0) K.bubble(ctx, '*cough* *cough* *cough*', 520, 260, lt, R('dust') + 1.6, { size: 26 });
  });
  fx('newguy', 'hooves', .2, 0, 6); fx('dust', 'cough', .7, 1.6); fx('dust', 'wind', .3, 0, 4);

  S('noon2', (ctx, lt, dur, t, R) => {   // NOON: same beans, switch horses, the remuda
    const remuda = lt > R('remuda') - .2;
    if (!remuda) { CS.camp(ctx, t, 0, { v: 'dawn', wagon: true }); ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = 'rgba(255,240,200,.6)'; ctx.fillRect(0, 0, W, H); ctx.restore();
      theo(ctx, 520, 720, .9, TC({ t, prop: 'plate', pose: 'present', turn: .2, face: lt > R('same') ? { mouth: 'flat', eyes: 'half', brows: 'skeptic' } : { mouth: 'smile' } }));
      K.tag(ctx, 'same beans', 760, 320, lt, R('same'), { size: 32 }); K.tag(ctx, '(day 23)', 760, 380, lt, R('same') + .6, { size: 22 }); }
    else { CS.prairie(ctx, t, 0, { v: 'noon', seed: 12 }); for (let i = 0; i < 9; i++) B.steed(ctx, 180 + (i % 5) * 200 + (i > 4 ? 100 : 0), i > 4 ? 560 : 640, i > 4 ? .5 : .62, t + i, { gait: i % 3 ? 'stand' : 'walk', saddle: false, coat: ['#8a5a36', '#c9a070', '#3a2a20', '#a87a4a', '#6a4a30', '#d8c4a0', '#5a3a28', '#b07a4a', '#3e2e24'][i], paint: i === 5, graze: i % 2 === 0, dir: i % 2 ? -1 : 1 });
      ride(ctx, 'wrangler', 1050, 700, .8, t, { gait: 'walk', coat: '#a87a4a', dir: -1 }); CS.foreground(ctx, t, 0);
      K.title(ctx, 'THE REMUDA', lt, R('remuda'), { y: 100, size: 60 }); K.tag(ctx, 'each hand rode several horses', 640, 180, lt, R('remuda') + .6, { size: 26 }); if (lt > R('nosingle')) K.tag(ctx, 'no single horse can do this all day', 640, 240, lt, R('nosingle'), { size: 24 }); }
    CK.dayBanner(ctx, 'NOON', lt, .05, { out: R('remuda') - .3 });
  });
  fx('noon2', 'ding', .4); fx('same', 'pluckUp', .4); fx('remuda', 'hooves', .3, 0, 3); fx('remuda', 'whip', .3, .4);

  S('robbers', (ctx, lt, dur, t, R) => {   // "Is this where the bank robbers show up?" — "No. Gary's horse steps in a hole."
    CS.prairie(ctx, t, 0, { v: 'day', seed: 13 });
    const st = lt > R('gary') + 1 ? clamp((lt - R('gary') - 1) / .5) : 0;
    ride(ctx, 'gary', 780, 690, .95, t, { gait: st > 0 ? 'stand' : 'walk', coat: '#b07a4a', stumble: st > 0 ? Math.sin(st * Math.PI) * .9 : 0, riderOpts: { face: st > 0 ? { mouth: 'shock', eyes: 'wide', brows: 'worried' } : { mouth: 'smile', eyes: 'half' }, pose: st > 0 ? 'cheer' : 'idle' } });
    if (st > 0) { ctx.save(); sh(ctx, '#5a4030', 3, c => c.ellipse(880, 700, 40, 10, 0, 0, TAU)); ctx.restore(); CK.puff(ctx, 870, 680, st, .7, 70); }
    fig(ctx, 'director', 200, 780, .82, { t, pose: lt < R('no') ? 'pointSide' : 'shrug', turn: .3, face: lt < R('no') ? { mouth: 'grin', brows: 'up', eyes: 'wide' } : { mouth: 'frown', brows: 'worried' }, vis: Gd.say(t, TV.robbers, TV.no - .1) });
    K.bubble(ctx, 'Is this where the bank robbers show up?', 360, 220, lt, .05, { size: 26 });
    if (lt > R('no')) K.tag(ctx, 'No. This is where Gary\'s horse steps in a hole.', 760, 120, lt, R('no'), { size: 26 }); if (lt > R('gary') + .3) K.tag(ctx, 'Gary', 780, 330, lt, R('gary') + .3, { size: 24 });
  });
  mood('robbers', 'comic'); fx('robbers', 'whip', .3); fx('gary', 'thud', .5, 1.15); fx('gary', 'pluckUp', .4, 1.4);

  S('afternoon', (ctx, lt, dur, t, R) => {   // AFTERNOON: gloriously boring. Grass. Sky. Cow butt. Grass.
    const cutK = [R('grass1'), R('sky'), R('cowbutt'), R('grass2')], seg = lt < cutK[0] ? -1 : cutK.filter(x => lt >= x).length - 1;
    if (seg < 0) { ctx.save(); EP.push(ctx, lt, cutK[0], 1.0, 1.04); CS.prairie(ctx, t, 0, { v: 'noon', seed: 14 }); B.herd(ctx, t, { seed: 91, n: 40, x: [-200, 1480], y: [480, 580], s: [.12, .22], mode: 'mix', speed: 3 });
      theoRide(ctx, 640, 700, 1.0, t, { gait: 'stand', r: { pose: 'think', face: { mouth: 'flat', eyes: 'half', look: [Math.sin(t * 3) * .8, -.5] } } });
      const fx_ = 700 + Math.sin(t * 5) * 90 + Math.sin(t * 13) * 20, fy = 240 + Math.cos(t * 4) * 50; sh(ctx, '#2a2a2a', 0, circ(fx_, fy, 5)); ctx.save(); ctx.globalAlpha = .5; for (const sd of [-1, 1]) sh(ctx, '#d8e8f0', 1, c => c.ellipse(fx_ + sd * 6, fy - 4, 6, 3, sd * .5 + Math.sin(t * 60) * .4, 0, TAU)); ctx.restore();
      CS.foreground(ctx, t, 0); ctx.restore(); CK.dayBanner(ctx, 'AFTERNOON', lt, .05, { out: R('honest') });
      if (lt > R('boring')) K.title(ctx, 'IT\'S BORING.', lt, R('boring'), { y: 150, size: 72 }); if (lt > R('glorious')) CK.counter(ctx, 1080, 560, lt, R('glorious'), { s: .7 }); return; }
    const words = ['GRASS.', 'SKY.', 'COW BUTT.', 'GRASS.'];
    if (seg === 0 || seg === 3) { CS.prairie(ctx, t, 0, { v: 'noon', seed: 14 }); ctx.save(); ctx.translate(640, 900); ctx.scale(3, 3); ctx.translate(-640, -720); CS.foreground(ctx, t, 0); ctx.restore(); }
    else if (seg === 1) { ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, '#2a6ac4'], [1, '#a9d4f2']]); ctx.fillRect(0, 0, W, H); G.Paint2.clouds2(ctx, t, 0, [[300, 200, 1.6, 151, 3]], 'day'); }
    else { CS.prairie(ctx, t, 0, { v: 'noon', seed: 14 }); B.longhorn(ctx, 900, 820, 2.6, t, { mode: 'stand', coat: 3, dir: 1 }); }
    K.title(ctx, words[seg], lt, cutK[seg], { y: 360, size: 110 });
  });
  mood('afternoon', 'quiet'); fx('afternoon', 'buzz', .6, .2, 5); ['grass1', 'sky', 'cowbutt', 'grass2'].forEach(k => fx(k, 'pop', .4)); fx('cowbutt', 'moo', .4, .3);

  S('night', (ctx, lt, dur, t, R) => {   // NIGHT: the herd beds down; you ride slow circles
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 520); CS.prairie(ctx, t, 0, { v: 'night', seed: 15 });
    const beds = clamp((lt - R('beds')) / 1.5);
    B.herd(ctx, t, { seed: 101, n: 46, x: [300, 980], y: [520, 620], s: [.14, .22], mode: beds > .5 ? 'lie' : 'stand', speed: 0 });
    if (lt > R('shift') - .5) { const a = (lt - R('shift')) * .5 + 1.5, x = 640 + Math.cos(a) * 470, y = 580 + Math.sin(a) * 90, s = .55 + Math.sin(a) * .15; const draw = () => theoRide(ctx, x, y + 60, s, t, { gait: 'walk', dir: Math.sin(a) > 0 ? -1 : 1, r: { light: Object.assign({}, K.LIGHT.night, { cast: 0, contact: 0 }), face: { mouth: 'smile', eyes: 'half' } } }); if (Math.sin(a) < 0) { draw(); } else draw(); }
    ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(60,70,120,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    CK.dayBanner(ctx, 'NIGHT', lt, .05, { icon: 'moon' }); if (lt > R('butyou')) K.tag(ctx, 'but you don\'t — night guard', 640, 200, lt, R('butyou'), { size: 28 }); if (lt > R('circles')) K.tag(ctx, 'slow circles around 2,000 sleeping animals', 640, 660, lt, R('circles'), { size: 26 });
  });
  mood('night', 'campfire'); fx('night', 'hooves', .12, 4, 8);

  S('story', (ctx, lt, dur, t, R) => {   // they sang to the cattle
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.06, 640, 500); CS.prairie(ctx, t, lt * 3, { v: 'night', seed: 15 });
    B.herd(ctx, t, { seed: 103, n: 24, x: [-200, 1480], y: [560, 660], s: [.24, .34], mode: 'lie', speed: 0 });
    theoRide(ctx, 560, 700, 1.05, t, { gait: 'walk', r: { light: Object.assign({}, K.LIGHT.night, { cast: 0, contact: 0 }), face: { mouth: lt > R('sang') ? 'o' : 'smile', eyes: lt > R('sang') ? 'closed' : 'half' }, talk: lt > R('sang') ? .3 + .3 * Math.sin(t * 6) : 0 } });
    if (lt > R('sang')) CK.notes(ctx, 640, 330, t, 1.1, 5);
    ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(60,70,120,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.tag(ctx, 'told again and again in old trail memoirs', 640, 90, lt, R('memoirs'), { size: 24 });
    K.tag(ctx, 'to pass the time', 1060, 260, lt, R('pass'), { size: 26 }); K.tag(ctx, 'so a sudden noise won\'t spook them', 1000, 340, lt, R('spook'), { size: 24 }); K.tag(ctx, 'a humming rider = a rider they know is there', 640, 650, lt, R('humming'), { size: 24 });
  });
  fx('sang', 'sparkle', .3);

  S('song', (ctx, lt, dur, t, R) => {   // "Ohhh, please don't stampede…" — an unimpressed stare
    CS.prairie(ctx, t, 0, { v: 'night', seed: 15 }); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(80,90,140,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    B.face(ctx, 820, 470, .9, t, { mood: 'meh', coat: 2, look: -1 });
    theo(ctx, 240, 760, .7, TC({ t, pose: 'present', turn: .5, light: K.LIGHT.night, face: { mouth: 'o', eyes: 'closed', brows: 'up' }, vis: Gd.say(t) })); CK.notes(ctx, 300, 340, t, 1, 4);
    K.bubble(ctx, '~ Ohhh, please don\'t stampede… ~', 420, 200, lt, .05, { size: 26 });
  });
  fx('song', 'moo', .25, 1.4);
})(window);
