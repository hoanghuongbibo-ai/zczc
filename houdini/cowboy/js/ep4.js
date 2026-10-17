/* BEAT 7 (the men behind the myth) + BEAT 8 (the job disappears) + BEAT 9 (legacy + close) */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, EP = G.EP, { S, fx, mood, cast, fig, theo, ride, card, talkIn } = EP;
  const TC = o => Object.assign({ outfit: 'cowTheo', hat: 'stetson', light: K.LIGHT.warm }, o);

  // ===================== BEAT 7 =====================
  S('violence', (ctx, lt, dur, t, R) => {   // the movies got the violence wrong… and the people
    CS.studio(ctx, t, 0); const tear = clamp((lt - R('people') + .1) / .5);
    ['vaquero', 'freed', 'vet', 'freed2', 'vaquero2'].forEach((n, i) => fig(ctx, n, 560 + i * 130 - 130, 700, .6, { t: t + i, pose: i === 2 ? 'wave' : 'idle', turn: (2 - i) * .2, face: { mouth: 'smile' } }));
    if (tear < 1) { ctx.save(); for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * tear * 420, tear * 60); ctx.rotate(sd * tear * .3); ctx.beginPath(); if (sd < 0) ctx.rect(0, 0, 820, H); else ctx.rect(820, 0, 460, H); ctx.clip(); CK.poster(ctx, 820, 380, 520, 640, { seed: 5, draw: c => { c.fillStyle = grad(c, 0, -320, 0, 320, [[0, '#f2a050'], [1, '#c0563a']]); c.fillRect(-260, -320, 520, 640); Gd.draw(c, 0, 300, .8, cast('gun1', { t, pose: 'hips', face: { eyes: 'squint', brows: 'angry', mouth: 'smirk' }, light: false })); CK.txt(c, 'THE COWBOY', 0, -270, '52px "Luckiest Guy"', '#fff3d0'); } }); ctx.restore(); } ctx.restore(); }
    theo(ctx, 220, 720, .85, { t, pose: Gd.pose(lt, [[0, 'present'], [R('people') - .3, 'pointSide']]), turn: .3, vis: Gd.say(t), face: { mouth: 'grin', brows: 'up' } });
    if (lt > R('people')) K.title(ctx, 'THE PEOPLE', lt, R('people'), { y: 100, size: 64 });
  });
  mood('violence', 'warm'); fx('people', 'paper', .8); fx('people', 'whoosh', .4);

  S('first', (ctx, lt, dur, t, R) => {   // the vaquero came first
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 520); CS.ranch(ctx, t, 0); B.herd(ctx, t, { seed: 141, n: 18, x: [-100, 1380], y: [560, 620], s: [.22, .3], mode: 'mix', speed: 4 });
    ride(ctx, 'vaquero', 640, 700, 1.05, t, { gait: 'stand', coat: '#d8c4a0', paint: true, blanket: '#b8322a', rider: cast('vaquero', { prop: 'lasso', pose: 'idle', turn: .3, light: { cast: 0, contact: 0 }, face: { mouth: 'smile', brows: 'up' } }) });
    ctx.restore(); K.tag(ctx, 'the cowboy wasn\'t really an Anglo invention', 640, 90, lt, R('anglo'), { size: 26 }); K.tag(ctx, 'Spanish & Mexican vaqueros were here first', 640, 150, lt, R('spanish') + .5, { size: 24 }); K.tag(ctx, '…long before Texas joined the U.S. (1845)', 640, 210, lt, R('spanish') + 2.5, { size: 22 });
  });
  mood('first', 'western'); fx('first', 'whip', .3, .6);

  S('vocab', (ctx, lt, dur, t, R) => {   // you can hear it in the vocabulary
    CS.studio(ctx, t, 0); fig(ctx, 'vaquero', 200, 720, .78, { t, prop: 'lasso', pose: 'idle', turn: .4, face: { mouth: 'grin', brows: 'up' } });
    const W_ = [['lazo', 'lasso', 'lasso'], ['la reata', 'lariat', 'lariat'], ['rodeo', 'rodeo', 'rodeo'], ['chaparreras', 'chaps', 'chaps'], ['rancho', 'ranch', 'ranch'], ['vaquero', 'buckaroo', 'buckaroo']];
    W_.forEach(([a, b, k], i) => CK.wordCard(ctx, 520 + (i % 2) * 460, 160 + Math.floor(i / 2) * 140, a, b, clamp((lt - R(k)) / .4), { w: 420, rot: (i % 2 ? .02 : -.02) }));
    K.tag(ctx, 'all borrowed from Spanish', 760, 620, lt, R('borrowed'), { size: 30 }); K.tag(ctx, 'spellings & origins per standard dictionaries', 760, 670, lt, R('borrowed') + .5, { size: 16 });
  });
  ['lasso', 'lariat', 'rodeo', 'chaps', 'ranch', 'buckaroo'].forEach(k => fx(k, 'pop', .4)); fx('borrowed', 'ding', .4);

  S('ikard', (ctx, lt, dur, t, R) => {   // Bose Ikard
    CS.studio(ctx, t, 0); ctx.save(); ctx.fillStyle = 'rgba(40,24,10,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    CK.portrait(ctx, 400, 330, .95, K.pop(lt, .1, .6), c => Gd.draw(c, 0, 340, .7, cast('ikard', { t, pose: 'idle', light: false, face: { mouth: 'flat', look: [.1, 0] } })), { name: 'BOSE IKARD', color: true });
    card(ctx, 'born into slavery · Mississippi · 1840s', 900, 300, lt, R('born'), { size: 26, rot: .02 }); card(ctx, 'brought to Texas as a child', 900, 400, lt, R('texas3'), { size: 26, rot: -.02 });
  });
  mood('ikard', 'tender'); fx('ikard', 'ding', .3);

  S('emanc', (ctx, lt, dur, t, R) => {   // 1866: the drive to Colorado with Goodnight and Loving
    const v = { lon: -101.5, lat: 35.6, z: .92 }; CS.map(ctx, t, v); CS.route(ctx, CS.TRAILS.goodnight, v, clamp((lt - R('y1866')) / 3), { col: '#3a6a9a', w: 8, label: 'Goodnight-Loving Trail', labelAt: [-102.6, 33.6] });
    CS.pin(ctx, 'Fort Belknap', v, lt, R('y1866') - .3, { label: 'Texas', dy: 40 }); CS.pin(ctx, 'Denver', v, lt, R('y1866') + 2.6, { label: 'Colorado' });
    FX.dateTag(ctx, 'AFTER EMANCIPATION · 1866'); if (lt > R('goodnight')) K.tag(ctx, 'led by Charles Goodnight & Oliver Loving', 640, 640, lt, R('goodnight'), { size: 26 });
  });
  fx('y1866', 'paper', .4); fx('y1866', 'hooves', .2, .3, 3);

  S('besthand', (ctx, lt, dur, t, R) => {   // one of Goodnight's best hands
    const run = lt > R('stamps') && lt < R('cash'); ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.prairie(ctx, t, run ? lt * 60 : 0, { v: 'day', seed: 19 });
    if (run) B.herd(ctx, t, { seed: 151, n: 30, x: [-200, 1480], y: [480, 600], s: [.16, .28], mode: 'run', speed: 260, dust: .7 });
    ride(ctx, 'ikard', 640, 700, 1.0, t, { gait: run ? 'gallop' : 'walk', coat: '#3a2a20', riderOpts: { prop: lt > R('cash') ? 'cash' : null, pose: lt > R('tracker') && lt < R('stamps') ? 'pointSide' : 'idle', face: { mouth: 'smile', brows: lt > R('tracker') && lt < R('stamps') ? 'skeptic' : 'neutral' } } });
    if (lt > R('tracker') && lt < R('stamps')) { for (let i = 0; i < 6; i++) sh(ctx, '#6a5038', 0, c => c.ellipse(860 + i * 60, 720 - (i % 2) * 10, 12, 6, 0, 0, TAU)); }
    CS.foreground(ctx, t, run ? lt * 60 : 0); ctx.restore();
    K.tag(ctx, 'one of Goodnight\'s best hands', 640, 90, lt, .2, { size: 28 }); K.tag(ctx, 'tracker', 360, 200, lt, R('tracker'), { size: 28 }); K.tag(ctx, 'rode through stampedes', 640, 200, lt, R('stamps'), { size: 28 }); K.tag(ctx, 'trusted to carry the outfit\'s cash', 920, 200, lt, R('cash'), { size: 26 });
  });
  fx('stamps', 'hooves', .5, 0, 1.6); fx('cash', 'clink', .5);

  S('reportedly', (ctx, lt, dur, t, R) => {   // "farther than any living man"
    CS.studio(ctx, t, 0); ctx.save(); ctx.fillStyle = 'rgba(40,24,10,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    CK.portrait(ctx, 250, 330, .75, K.pop(lt, .1), c => Gd.draw(c, 0, 330, .62, cast('goodnight', { t, pose: 'idle', light: false, face: { mouth: 'smile' } })), { name: 'Charles Goodnight' });
    K.quote(ctx, lt, R('farther') - .2, 'I trusted him farther than any living man.', 'Charles Goodnight, reportedly', { x: 800, y: 340, w: 640, size: 36 });
  });
  fx('farther', 'paper', .4, -.2);

  S('died', (ctx, lt, dur, t, R) => {   // the grave marker — hold the shot, no gag
    const sayk = clamp((lt - R('says') + .3) / (R('splendid') - R('says') + .6)), z = lerp(1, 1.18, ease.sine(clamp(lt / dur)));
    ctx.save(); ctx.translate(640, 560); ctx.scale(z, z); ctx.translate(-640, -560); CS.cemetery(ctx, t, 0); CS.stone(ctx, 640, 700, 1.05, sayk, { hi: lt > R('splendid') }); ctx.restore();
    K.tag(ctx, 'Bose Ikard · died 1929 · Weatherford, Texas', 640, 70, lt, .3, { size: 24 }); if (lt > R('paid') && lt < R('says')) K.tag(ctx, 'Goodnight paid for the granite marker — and wrote the words', 640, 130, lt, R('paid'), { size: 22 });
  });
  mood('died', 'tender'); fx('splendid', 'ding', .3);

  S('complicated', (ctx, lt, dur, t, R) => {   // a rough kind of equality on the trail — with limits
    const lim = lt > R('limits'); ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.prairie(ctx, t, lt * 8, { v: 'day', seed: 20 });
    B.herd(ctx, t, { seed: 161, n: 40, x: [-300, 1580], y: [470, 560], s: [.12, .2], mode: 'walk', speed: 10, pan: lt * 8 });
    if (lim) ride(ctx, 'boss', 1000, 640, .78, t, { gait: 'walk', coat: '#3a2a20', riderOpts: { face: { mouth: 'flat' } } });
    ride(ctx, 'freed', 380, 700, .86, t, { gait: 'walk', coat: '#8a5a36' }); ride(ctx, 'hand', 640, 712, .86, t + .4, { gait: 'walk', coat: '#c9a070', blanket: '#3a6a9a' });
    CS.foreground(ctx, t, lt * 8); ctx.restore();
    K.tag(ctx, 'out on the trail: a rough kind of equality', 640, 90, lt, R('equality'), { size: 26 }); K.tag(ctx, 'judged by whether you could do the job', 640, 150, lt, R('judged'), { size: 24 }); K.tag(ctx, 'pay could be roughly equal', 640, 210, lt, R('pay2'), { size: 24 });
    if (lim) K.tag(ctx, 'but: Black cowboys rarely became trail bosses', 960, 420, lt, R('bosses'), { size: 22, fill: '#fde6c4' });
  });
  mood('complicated', 'warm'); fx('limits', 'pluckUp', .3);

  S('segreg', (ctx, lt, dur, t, R) => {   // in town, the old rules came right back
    CS.cowtown(ctx, t, 0, { v: 'day' }); ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = .55; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const k = clamp((lt - 1) / 1.6); fig(ctx, 'freed', lerp(560, 300, ease.inOut(k)), 700, .7, { t, pose: 'idle', turn: k > 0 && k < 1 ? -.6 : .3, walk: k > 0 && k < 1 ? t * 7 : null, face: { mouth: 'flat', brows: 'worried' } }); fig(ctx, 'hand', lerp(720, 980, ease.inOut(k)), 700, .7, { t, pose: 'idle', turn: k > 0 && k < 1 ? .6 : -.3, walk: k > 0 && k < 1 ? t * 7 : null, face: { mouth: 'flat' } });
    ctx.save(); ctx.setLineDash([16, 12]); ln(ctx, [[640, 560], [640, 720]], 5, `rgba(180,50,40,${clamp(k)})`); ctx.restore();
    K.tag(ctx, 'the moment the herd reached town: segregation came right back', 640, 100, lt, .3, { size: 24 });
  });
  mood('segreg', 'somber');

  S('natlove', (ctx, lt, dur, t, R) => {   // Nat Love, "Deadwood Dick"
    CS.studio(ctx, t, 0);
    fig(ctx, 'natlove', 330, 720, .95, { t, pose: Gd.pose(lt, [[0, 'cheer'], [3, 'hips']]), turn: .3, face: { mouth: 'grin', brows: 'up', eyes: lt < 3 ? 'happy' : 'open' } });
    card(ctx, 'born enslaved · Tennessee · 1854', 860, 140, lt, R('bornT'), { size: 24 }); K.tag(ctx, 'later a cowboy', 860, 220, lt, R('later'), { size: 26 });
    CK.book(ctx, 880, 470, .82, clamp((lt - R('y1907')) / .4), 'THE LIFE AND\nADVENTURES OF\nNAT LOVE', 'Better known in the cattle country\nas "Deadwood Dick" · 1907', { col: '#5a2a3a', ts: 24 });
    if (lt > R('author') + 1.6) K.tag(ctx, 'an extremely modest title', 1080, 680, lt, R('author') + 1.6, { size: 22, rot: -.04 });
  });
  mood('natlove', 'saloon'); fx('natlove', 'whip', .3, .2); fx('y1907', 'paper', .5);

  S('contests', (ctx, lt, dur, t, R) => {   // tall tales — a fish story from your uncle
    CS.studio(ctx, t, 0);
    K.tag(ctx, 'shooting contests', 260, 140, lt, .1, { size: 26 }); K.tag(ctx, 'wild adventures', 640, 120, lt, 1.2, { size: 26 }); K.tag(ctx, 'near-death escapes', 1020, 140, lt, R('neardeath'), { size: 26 });
    K.tag(ctx, 'historians love the book…', 640, 230, lt, R('historians2'), { size: 28 });
    if (lt > R('fish')) { const g = clamp((lt - R('fish') - .3) / 3); theo(ctx, 640, 740, .8, { t, pose: 'presentBoth', face: { mouth: 'grin', eyes: 'happy', brows: 'up' }, vis: Gd.say(t) }); ctx.save(); ctx.translate(640, 470); ctx.scale(.6 + g * 1.4, .6 + g * 1.4); sh(ctx, '#7aa0b8', 4, c => { c.ellipse(0, 0, 90, 34, 0, 0, TAU); }); sh(ctx, '#7aa0b8', 4, c => { c.moveTo(80, 0); c.lineTo(130, -34); c.lineTo(130, 34); c.closePath(); }); sh(ctx, OUT, 0, circ(-60, -6, 5)); ctx.restore(); K.tag(ctx, '…and treat it like a fish story', 640, 300, lt, R('fish') + .4, { size: 26 }); }
  });
  fx('contests', 'pop', .4, .1); fx('contests', 'pop', .4, 1.2); fx('neardeath', 'pop', .4); fx('fish', 'rise', .4, .3);

  S('buffalo', (ctx, lt, dur, t, R) => {   // skit: eleven buffalo, one hand — "Reportedly." — "…while reading a newspaper." — "I made that up."
    CS.prairie(ctx, t, 0, { v: 'day', seed: 21 });
    for (let i = 0; i < 11; i++) { const x = 760 + (i % 4) * 120 + Math.floor(i / 4) * 40, y = 560 + Math.floor(i / 4) * 50; ctx.save(); ctx.translate(x, y); ctx.scale(.42, .42); sh(ctx, '#5a3a24', 4, c => { c.ellipse(0, -90, 110, 60, 0, 0, TAU); }); sh(ctx, '#3e2616', 4, c => c.ellipse(80, -110, 60, 70, 0, 0, TAU)); sh(ctx, '#3e2616', 3, c => c.ellipse(100, -70, 30, 30, 0, 0, TAU)); for (const lx of [-60, -30, 40, 70]) ln(ctx, [[lx, -40], [lx, 0]], 14, '#3e2616'); ctx.restore(); ctx.save(); ctx.strokeStyle = '#c9a868'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(420, 380); ctx.quadraticCurveTo((420 + x) / 2, 300, x + 30, y - 60); ctx.stroke(); ctx.restore(); }
    B.steed(ctx, 400, 690, .95, t, { gait: 'stand', coat: '#d8c4a0', paint: true, rider: cast('natlove', { light: { cast: 0, contact: 0 }, prop: lt > R('newspaper') ? 'newspaper' : 'lasso', pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' }, vis: Gd.say(t, TV.buffalo, TV.reportedly2) || Gd.say(t, TV.newspaper, TV.didnt) }) });
    K.bubble(ctx, '…then I roped ELEVEN buffalo with one hand—', 420, 150, lt, .05, { size: 24 });
    if (lt > R('reportedly2')) { theo(ctx, 1150, 780, .62, { t, pose: lt > R('didnt') ? 'shrug' : 'crossed', turn: -.4, face: lt > R('didnt') ? { mouth: 'grin', eyes: 'half', blush: 1 } : { mouth: 'flat', brows: 'skeptic', eyes: 'half' }, vis: Gd.say(t, TV.reportedly2, TV.newspaper) || Gd.say(t, TV.didnt, TV.strangest) }); K.bubble(ctx, lt > R('didnt') ? 'That part he didn\'t say. I made that up.' : 'Reportedly.', 1000, 300, lt, lt > R('didnt') ? R('didnt') : R('reportedly2'), { size: 26 }); }
    if (lt > R('newspaper')) K.bubble(ctx, '—while reading a newspaper.', 420, 240, lt, R('newspaper'), { size: 24 });
  });
  mood('buffalo', 'comic'); fx('buffalo', 'whip', .5, 1); fx('reportedly2', 'pluckUp', .3); fx('newspaper', 'paper', .5); fx('didnt', 'pluckUp', .4, 1.4);

  // ===================== BEAT 8 =====================
  S('strangest', (ctx, lt, dur, t, R) => {   // the golden age lasted about twenty years
    CS.studio(ctx, t, 0); const k = clamp((lt - .6) / 2.5);
    sh(ctx, '#f6ead0', 4, c => c.roundRect(160, 330, 960, 60, 30)); ctx.save(); ctx.beginPath(); ctx.roundRect(160, 330, 960, 60, 30); ctx.clip(); ctx.fillStyle = '#c0563a'; ctx.fillRect(160, 330, 960 * k, 60); ctx.restore(); ln(ctx, [[160, 330], [1120, 330]], 0);
    CK.txt(ctx, '1866', 160, 430, '40px "Luckiest Guy"', '#5a3420'); CK.txt(ctx, '1886', 1120, 430, '40px "Luckiest Guy"', '#5a3420');
    B.mini(ctx, 160 + 960 * k, 320, .6, t, { gait: 'gallop', shirt: '#3f6f9a' });
    K.title(ctx, 'THE GOLDEN AGE OF THE CATTLE DRIVE', lt, .2, { y: 120, size: 44 }); K.tag(ctx, '≈ 20 years', 640, 520, lt, R('twentyyrs'), { size: 40 });
  });
  mood('strangest', 'curious'); fx('twentyyrs', 'stamp', .5);

  S('killed', (ctx, lt, dur, t, R) => {   // three things killed it
    CS.studio(ctx, t, 0); K.title(ctx, '3 THINGS KILLED IT', lt, .1, { y: 90, size: 54 });
    const box = (i, t0, title, draw) => { const k = K.pop(lt, t0, .45); if (k <= 0) return; const x = 240 + i * 400; K.paper(ctx, x, 400, 340, 380, { scale: k, rot: (i - 1) * .02, draw: c => { CK.txt(c, title, 0, -150, '30px "Luckiest Guy"', '#5a3420'); draw(c); } }); };
    box(0, R('railroads'), '1. RAILROADS', c => { const v = { lon: -95.8, lat: 35.5, z: .34 }; c.save(); c.translate(-640, -360 + 20); c.beginPath(); c.rect(480, 230, 320, 260); c.clip(); CS.map(c, t, v); CS.route(c, CS.TRAILS.railTX, v, clamp((lt - R('railroads') - .4) / 1.5), { rail: 1 }); c.restore(); CK.txt(c, 'finally reach Texas', 0, 150, '700 22px Fredoka'); });
    box(1, R('barbed'), '2. BARBED WIRE', c => { c.save(); c.translate(-120, 80); CS.fence(c, 0, 240, 0, { barbed: true, h: 120, gap: 80 }); c.restore(); CK.txt(c, 'fences off the open range', 0, 150, '700 20px Fredoka'); });
    box(2, R('fever'), '3. "TEXAS FEVER"', c => { c.save(); c.translate(0, 10); sh(c, '#7a3a2a', 4, cc => cc.ellipse(0, 0, 50, 40, 0, 0, TAU)); sh(c, '#5a2a1a', 3, cc => cc.ellipse(0, -44, 20, 14, 0, 0, TAU)); for (const sd of [-1, 1]) for (let k2 = 0; k2 < 4; k2++) ln(c, [[sd * 36, -20 + k2 * 14], [sd * 70, -30 + k2 * 20]], 5); c.restore(); CK.txt(c, 'states block Texas cattle', 0, 120, '700 20px Fredoka'); if (lt > R('ticks')) CK.txt(c, 'spread by ticks', 0, 152, '700 22px Fredoka', '#b8322a'); });
  });
  fx('railroads', 'pop', .5); fx('barbed', 'pop', .5); fx('fever', 'pop', .5); fx('ticks', 'pluckUp', .3);

  S('winters', (ctx, lt, dur, t, R) => {   // the winters of 1885–87: the Big Die-Up
    const cut = lt > R('bankrupt') - .2; ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.06, 640, 520); CS.prairie(ctx, t, 0, { v: 'snow', seed: 22, wind: 2.2 });
    if (!cut) { B.herd(ctx, t, { seed: 171, n: 20, x: [300, 1000], y: [560, 640], s: [.26, .34], mode: 'stand', speed: 0, each: (c, x, y, s) => { c.save(); c.globalAlpha = .5; c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(x, y - 160 * s, 100 * s, 18 * s, 0, 0, TAU); c.fill(); c.restore(); } }); CS.fence(ctx, -50, 1330, 690, { barbed: true, h: 90, gap: 120, col: '#6a5a4a' }); }
    else { fig(ctx, 'boss', 460, 720, .9, { t, pose: 'facepalm', turn: .3, face: { mouth: 'frown', brows: 'worried', eyes: 'closed' }, light: K.LIGHT.grey }); for (let i = 0; i < 16; i++) { ctx.save(); ctx.translate(820 + (i % 4) * 14, 700 - i * 16); ctx.rotate((i % 3 - 1) * .08); sh(ctx, '#f2ead8', 2.5, c => c.rect(-70, -10, 140, 18)); ctx.restore(); } K.tag(ctx, 'UNPAID', 860, 400, lt, R('bankrupt'), { size: 34, fill: '#fde6c4' }); }
    ctx.restore();
    FX.dateTag(ctx, 'WINTERS OF 1885–86 & 1886–87'); if (!cut) { K.tag(ctx, 'overcrowded, overgrazed + a hot, dry summer', 640, 110, lt, R('overgraze'), { size: 24 }); K.tag(ctx, 'blizzard after blizzard', 640, 170, lt, R('blizzard'), { size: 30 }); K.tag(ctx, 'cattle starved or froze', 640, 230, lt, R('starved'), { size: 26 }); }
    else { K.tag(ctx, 'ranchers went bankrupt', 640, 110, lt, R('bankrupt'), { size: 30 }); if (lt > R('teddy')) CK.portrait(ctx, 1080, 300, .6, K.pop(lt, R('teddy')), c => Gd.draw(c, 0, 330, .62, cast('teddy', { t, pose: 'idle', light: false, face: { mouth: 'frown', brows: 'worried' } })), { name: 'Theodore Roosevelt', sub: 'running cattle in Dakota' }); }
  });
  mood('winters', 'somber'); fx('winters', 'wind', .6, 0, 9); fx('blizzard', 'wind', .5, 0, 5); fx('bankrupt', 'paper', .5);

  S('dieup', (ctx, lt, dur, t, R) => {   // THE BIG DIE-UP — how big? historians still argue
    CS.prairie(ctx, t, 0, { v: 'snow', seed: 22, wind: 1 }); ctx.save(); ctx.fillStyle = 'rgba(250,250,252,.5)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.title(ctx, 'THE BIG DIE-UP', lt, .1, { y: 100, size: 64 }); if (lt > R('howbig')) K.tag(ctx, 'how big? historians + economists still argue', 640, 180, lt, R('argue2'), { size: 26 });
    const bar = (y, lab, frac, t0, col) => { const k = clamp((lt - t0) / .8); if (lt < t0) return; sh(ctx, '#f6ead0', 3.5, c => c.roundRect(300, y - 26, 680, 52, 14)); ctx.save(); ctx.beginPath(); ctx.roundRect(300, y - 26, 680, 52, 14); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(300, y - 26, 680 * frac * ease.out(k), 52); ctx.restore(); CK.txt(ctx, lab, 640, y + 2, '700 24px Fredoka', OUT); };
    bar(300, 'some popular accounts: "most of the range cattle"', .8, R('most'), 'rgba(184,50,42,.55)'); bar(390, 'other estimates: 15–25% in many areas', .2, R('pct'), 'rgba(58,106,154,.6)'); bar(480, 'one economic study: not so catastrophic?', .1, R('study'), 'rgba(90,120,70,.6)');
    if (lt > R('nobody2')) card(ctx, 'what nobody disputes: the open-range era was over', 640, 620, lt, R('nobody2') + .2, { size: 28 });
  });
  fx('dieup', 'stamp', .5, .1); fx('most', 'pop', .4); fx('pct', 'pop', .4); fx('study', 'pop', .4); fx('nobody2', 'ding', .4);

  S('thecowboys', (ctx, lt, dur, t, R) => {   // and the cowboys? a lone hand at the fence line
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.06, 640, 560); CS.prairie(ctx, t, 0, { v: 'dusk', seed: 23 }); CS.fence(ctx, -50, 1330, 650, { barbed: true, h: 90, gap: 130, col: '#5a4a3a' });
    fig(ctx, 'cowhand', 640, 700, .82, { t, pose: 'idle', turn: .2, back: false, light: K.LIGHT.dusk, face: { mouth: 'flat', eyes: 'half', look: [.5, -.2] } });
    CS.foreground(ctx, t, 0, { v: 'dusk' }); ctx.restore();
    K.tag(ctx, 'most only ever did this a few seasons', 640, 100, lt, R('seasons'), { size: 26 }); K.tag(ctx, 'ranch hands on fenced land', 300, 220, lt, R('ranchhands'), { size: 24 }); K.tag(ctx, 'rodeo riders', 980, 220, lt, R('rodeoriders'), { size: 24 });
    K.tag(ctx, 'Black cowboys: often a harder time buying land + starting over', 640, 300, lt, R('harder'), { size: 22 });
    CK.counter(ctx, 1080, 560, lt, R('harder') + 3, { s: .62, note: '0 — final' });
  });
  mood('thecowboys', 'tender'); fx('harder', 'stamp', .4, 3);

  // ===================== BEAT 9 =====================
  S('matter', (ctx, lt, dur, t, R) => {   // the idea got bigger: dime novels, Wild West shows, westerns
    CS.studio(ctx, t, 0); K.tag(ctx, 'the real cowboys disappeared…', 640, 90, lt, R('disappeared'), { size: 26 }); K.title(ctx, '…THE IDEA GOT BIGGER', lt, R('bigger'), { y: 160, size: 48 });
    CK.book(ctx, 260, 450, .78, clamp((lt - R('dime')) / .35), 'DEADSHOT\nDAN', 'or, The Terror of the Plains', { col: '#c0563a', price: '5¢', ts: 34, rot: -.06, art: c => Gd.draw(c, 0, 110, .3, cast('gun1', { t, pose: 'hips', light: false })) });
    CK.book(ctx, 640, 470, .8, clamp((lt - R('wildwest')) / .35), 'WILD WEST\nSHOW!', 'Daring riders · trick shots', { col: '#2e5a8a', ts: 36, art: c => { Gd.draw(c, -40, 110, .3, cast('gun2', { t, pose: 'cheer', light: false })); Gd.draw(c, 50, 110, .3, cast('vaquero', { t, pose: 'wave', light: false })); } });
    CK.book(ctx, 1020, 450, .78, clamp((lt - R('westerns')) / .35), 'SHOWDOWN', 'a century of westerns', { col: '#2a2a2e', ink: '#f2f2f2', ts: 38, rot: .06, art: c => { c.filter = 'grayscale(1)'; Gd.draw(c, 0, 110, .3, cast('gun1', { t, pose: 'idle', light: false })); c.filter = 'none'; } });
  });
  mood('matter', 'western'); fx('dime', 'paper', .5); fx('wildwest', 'paper', .5); fx('westerns', 'paper', .5);

  S('along', (ctx, lt, dur, t, R) => {   // whiter, older, angrier, better with a pistol
    CS.movieSet(ctx, t, 0, { tumble: false });
    const st = [[R('along'), 'cowhand', { look: { skin: '#7a4e34', hair: 'curly', hairCol: '#1a1410' } }, 'the real one: often a teen, often not white'], [R('whiter'), 'cowhand', { look: { skin: '#f4caa8' } }, 'whiter'], [R('older'), 'boss', {}, 'older'], [R('angrier'), 'gun1', { face: { brows: 'angry', mouth: 'grit', eyes: 'squint' } }, 'angrier'], [R('pistol'), 'gun1', { pose: 'pointSide', face: { brows: 'angry', mouth: 'smirk', eyes: 'squint' } }, 'better with a pistol']];
    let cur = 0; st.forEach((s, i) => { if (lt >= s[0]) cur = i; }); const s0 = st[cur];
    CS.longShadow(ctx, 640, 720, 50, 220);
    fig(ctx, s0[1], 640, 720, 1.0, Object.assign({ t, pose: 'idle', face: { mouth: 'flat' } }, s0[2])); { const pk = clamp((lt - s0[0]) / .35); if (pk < 1) K.puff(ctx, 640, 470, pk, 1 - pk); }
    K.tag(ctx, s0[3], 640, 120, lt, s0[0], { size: 34 }); EP.filmLook(ctx, t, .7);
  });
  fx('whiter', 'whoosh', .4); fx('older', 'whoosh', .4); fx('angrier', 'whoosh', .4); fx('pistol', 'whip', .5);

  S('lasttake', (ctx, lt, dur, t, R) => {   // the last take: what does the real cowboy do?
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.movieSet(ctx, t, 0, { crew: true, tumble: false });
    CS.longShadow(ctx, 520, 700, 40); CS.longShadow(ctx, 1000, 760, 44, 200);
    fig(ctx, 'cowhand', 520, 700, .8, { t, pose: lt > R('thejob') ? 'shrug' : 'present', turn: .45, face: { mouth: 'smile', brows: 'up' }, vis: Gd.say(t, TV.walkcows, TV.worst - .1) || Gd.say(t, TV.thejob, TV.leaves) });
    fig(ctx, 'director', 1000, 760, .86, { t, pose: lt > R('worst') ? 'facepalm' : 'present', turn: -.4, face: lt > R('worst') ? { mouth: 'frown', brows: 'worried', eyes: 'closed' } : { mouth: 'open', brows: 'up' }, vis: Gd.say(t, TV.lasttake, TV.walkcows - .1) || Gd.say(t, TV.worst, TV.thejob - .1) });
    ctx.restore();
    if (lt < R('walkcows')) K.bubble(ctx, 'Okay, okay. Last take. What does the REAL cowboy do?', 900, 180, lt, .05, { size: 24 });
    [['Walk cows.', 'walkcows'], ['Eat beans.', 'eatbeans'], ['Sing to the cows.', 'singcows'], ['Don\'t drown.', 'dontdrown']].forEach(([s, k], i) => card(ctx, s, 300, 130 + i * 74, lt, R(k), { size: 28, rot: (i % 2 ? .02 : -.02) }));
    if (lt > R('worst')) K.bubble(ctx, '…That\'s the worst movie I\'ve ever heard.', 960, 240, lt, R('worst'), { size: 26 }); if (lt > R('thejob')) K.bubble(ctx, 'That\'s the job.', 560, 320, lt, R('thejob'), { size: 30 });
    CK.filmFrame(ctx, t, 1);
  });
  mood('lasttake', 'comic'); fx('lasttake', 'clap', .5, .2); ['walkcows', 'eatbeans', 'singcows', 'dontdrown'].forEach(k => fx(k, 'pop', .4)); fx('thejob', 'pluckUp', .4, .5);

  S('leaves', (ctx, lt, dur, t, R) => {   // rodeo grew out of the work; Bill Pickett's bulldogging
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 520); CS.rodeo(ctx, t, 0);
    const k = clamp((lt - R('pickett') + .5) / 2.5), x = lerp(200, 760, ease.out(k));
    B.longhorn(ctx, x + 180, 690, .8, t, { mode: k < 1 ? 'run' : 'stand', coat: 0, lift: k > .8 ? .3 : 0 });
    B.steed(ctx, x - 40, 700, .82, t, { gait: k < 1 ? 'gallop' : 'stand', coat: '#3a2a20', rider: cast('pickett', { light: { cast: 0, contact: 0 }, pose: 'pointSide', face: { mouth: 'grit', brows: 'angry' } }) });
    ctx.restore(); K.tag(ctx, 'rodeo grew out of this work', 640, 90, lt, R('rodeogrew'), { size: 30 });
    if (lt > R('pickett')) EP.card(ctx, 'Bill Pickett — credited with inventing\nbulldogging (steer wrestling)', 640, 190, lt, R('pickett') + .3, { size: 24 });
  });
  mood('leaves', 'rising'); fx('pickett', 'crowd', .5, 1, 3); fx('pickett', 'hooves', .4, 0, 2.5);

  S('words2', (ctx, lt, dur, t, R) => {   // vaqueros: lasso and lariat in your dictionary
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.ranch(ctx, t, 0); B.herd(ctx, t, { seed: 181, n: 16, x: [-100, 1380], y: [560, 620], s: [.22, .3], mode: 'mix', speed: 4 });
    ride(ctx, 'vaquero', 440, 700, .9, t, { gait: 'trot', coat: '#d8c4a0', paint: true, blanket: '#b8322a', rider: cast('vaquero', { prop: 'lasso', pose: 'cheer', light: { cast: 0, contact: 0 } }) }); ride(ctx, 'vaquero2', 900, 710, .9, t + 1, { gait: 'walk', dir: -1, coat: '#6a4a30' });
    ctx.restore(); CK.wordCard(ctx, 640, 120, 'lazo', 'lasso', clamp(lt / .4), { w: 380 }); CK.wordCard(ctx, 640, 230, 'la reata', 'lariat', clamp((lt - .6) / .4), { w: 380 });
  });
  fx('words2', 'whip', .4, .4);

  S('clubs', (ctx, lt, dur, t, R) => {   // Black cowboy riding clubs, Oakland to New York
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 520); CS.city(ctx, t, 0, { banner: 'RIDING CLUB · PARADE DAY' });
    ride(ctx, 'rider1', lerp(1500, 300, lt / dur), 690, .85, t, { gait: 'walk', dir: -1, coat: '#f2ead8', blanket: '#e8a03a' }); ride(ctx, 'rider2', lerp(1800, 600, lt / dur), 700, .85, t + .5, { gait: 'walk', dir: -1, coat: '#3a2a20', blanket: '#b8322a' });
    ctx.restore(); K.tag(ctx, 'Black cowboy riding clubs · Oakland → New York', 640, 340, lt, .3, { size: 26 }); K.tag(ctx, 'keeping this history alive today', 640, 400, lt, 1.6, { size: 24 });
  });
  mood('clubs', 'rising'); fx('clubs', 'crowd', .4, 0, 5); fx('clubs', 'hooves', .3, 0, 5);

  S('thinkback', (ctx, lt, dur, t, R) => {   // think back to the movie set — it almost never happened
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.08, 640, 470); CS.movieSet(ctx, t, 0, {});
    CS.longShadow(ctx, 320, 650, 34); CS.longShadow(ctx, 960, 650, 34);
    fig(ctx, 'gun1', 320, 650, .62, { t, pose: 'hips', turn: .7, face: { mouth: 'flat', brows: 'angry', eyes: 'squint', look: [.8, 0] } }); fig(ctx, 'gun2', 960, 650, .62, { t: t + 1, pose: 'hips', turn: -.7, face: { mouth: 'flat', brows: 'angry', eyes: 'squint', look: [-.8, 0] } });
    ctx.restore(); EP.filmLook(ctx, t); if (lt > R('never')) { const k = K.pop(lt, R('never'), .3); ctx.save(); ctx.translate(640, 320); ctx.rotate(-.12); ctx.scale(k * 1.2, k * 1.2); ctx.strokeStyle = '#d8433a'; ctx.lineWidth = 8; ctx.strokeRect(-260, -50, 520, 100); CK.txt(ctx, 'ALMOST NEVER HAPPENED', 0, 4, '40px "Luckiest Guy"', '#d8433a'); ctx.restore(); }
  });
  mood('thinkback', 'western'); fx('never', 'stamp', .7);

  S('quieter', (ctx, lt, dur, t, R) => {   // what happened, thousands of times, was quieter
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.08, 640, 540); CS.prairie(ctx, t, 0, { v: 'night', seed: 24 });
    B.herd(ctx, t, { seed: 191, n: 40, x: [260, 1020], y: [520, 620], s: [.14, .24], mode: 'lie', speed: 0 });
    const a = lt * .22 + 1.8, x = 640 + Math.cos(a) * 470, y = 600 + Math.sin(a) * 80, s = .7 + Math.sin(a) * .15;
    ride(ctx, 'cowhand', x, y + 70, s, t, { gait: 'walk', dir: Math.sin(a) > 0 ? -1 : 1, coat: '#6a4a30', riderOpts: { light: Object.assign({}, K.LIGHT.night, { cast: 0, contact: 0 }), face: { mouth: 'o', eyes: 'half' }, talk: .2 + .2 * Math.sin(t * 5) } });
    CK.notes(ctx, x, y - 160 * s, t, .8, 3); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(60,70,120,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const fade = 1 - clamp(lt / 1.2); if (fade > 0) { ctx.save(); ctx.globalAlpha = fade; CS.movieSet(ctx, t, 0, { tumble: false }); ctx.restore(); }
    K.tag(ctx, 'a 17-year-old in the dark, riding slow circles', 640, 90, lt, R('seventeen'), { size: 26 }); if (lt > R('hum')) K.tag(ctx, 'humming, so they\'d know he was there', 640, 150, lt, R('hum'), { size: 24 });
    if (lt > R('thatscowboy')) K.title(ctx, 'THAT\'S THE COWBOY.', lt, R('thatscowboy'), { y: 250, size: 64 }); if (lt > R('fastest')) K.tag(ctx, 'not the fastest gun in the West', 640, 340, lt, R('fastest'), { size: 26 }); if (lt > R('asleep')) K.tag(ctx, 'just the guy who didn\'t fall asleep on night guard', 640, 400, lt, R('asleep'), { size: 26 });
  });
  mood('quieter', 'tender'); fx('thatscowboy', 'ding', .3);

  S('subscribe', (ctx, lt, dur, t, R) => {   // sign-off: which job would you have survived?
    CS.studio(ctx, t, 0);
    theo(ctx, 300, 720, .95, TC({ t, pose: Gd.pose(lt, [[0, 'present'], [R('which') - .3, 'think'], [R('comments'), 'pointSide'], [R('thanks'), 'wave']]), turn: .3, vis: Gd.say(t), face: { mouth: 'grin', brows: 'up', eyes: lt > R('thanks') ? 'happy' : 'open' } }));
    if (lt < R('which')) { const k = K.pop(lt, .2); ctx.save(); ctx.translate(880, 340); ctx.scale(k, k); sh(ctx, '#d8433a', 5, c => c.roundRect(-170, -50, 340, 100, 50)); CK.txt(ctx, 'SUBSCRIBE', 0, 4, '44px "Luckiest Guy"', '#fff'); ctx.restore(); }
    else { K.title(ctx, 'WHICH JOB WOULD YOU SURVIVE?', lt, R('which'), { x: 820, y: 110, size: 40 }); [['POINT', 'pointq'], ['DRAG', 'dragq'], ['WRANGLER', 'wranglerq'], ['COOK', 'wranglerq']].forEach(([s, k], i) => card(ctx, s, 700 + (i % 2) * 280, 260 + Math.floor(i / 2) * 120, lt, R(k) + (i === 3 ? .8 : 0), { size: 40, rot: (i % 2 ? .03 : -.03) })); if (lt > R('comments')) K.tag(ctx, 'tell me in the comments', 840, 520, lt, R('comments'), { size: 28 }); }
  });
  mood('subscribe', 'trail'); fx('subscribe', 'pop', .5, .2); ['pointq', 'dragq', 'wranglerq'].forEach(k => fx(k, 'pop', .4)); fx('wranglerq', 'pop', .4, .8); fx('thanks', 'sparkle', .4);
})(window);
