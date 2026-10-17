/* The Real Cowboy — framework + COLD OPEN (the movie set) + BEAT 2 (a state full of cows and empty of money).
 * Shots start on voice anchors (window.TV); inside a shot R('key') is that anchor relative to the shot start. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, motes, PAD } = P, TAU = Math.PI * 2;
  const EP = G.EP = { shots: [], sfx: [], moods: [] };
  EP.S = (key, fn, off = 0) => EP.shots.push({ t: Math.max(0, TV[key] + off), fn });
  EP.fx = (key, type, gain = 1, off = 0, dur) => EP.sfx.push({ t: Math.max(0, TV[key] + off), type, gain, dur });
  EP.mood = (key, mood, off = 0) => EP.moods.push({ t: Math.max(0, TV[key] + off), mood });
  const { S, fx, mood } = EP;
  // ---------- shared helpers ----------
  const cast = EP.cast = (n, o = {}) => Object.assign({ light: K.LIGHT.warm }, G.CW[n] || {}, o, { look: Object.assign({}, (G.CW[n] || {}).look, o.look) });
  EP.fig = (ctx, n, x, y, s, o) => K.fig(ctx, x, y, s, cast(n, o));
  EP.theo = (ctx, x, y, s, o) => K.fig(ctx, x, y, s, Object.assign({ light: K.LIGHT.warm }, o));
  EP.talkIn = (t, a, b) => (t >= a && t <= b ? K.vtalk(t) : 0);
  EP.ride = (ctx, n, x, y, s, t, o = {}) => B.steed(ctx, x, y, s, t, Object.assign({ rider: cast(n, { light: { cast: 0, contact: 0 } }) }, o));
  EP.card = (ctx, text, x, y, lt, t0, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const lines = text.split('\n'), sz = o.size || 34, w = o.w || Math.max(...lines.map(l => { ctx.font = `700 ${sz}px Fredoka`; return ctx.measureText(l).width; })) + 70, h = lines.length * sz * 1.3 + 40;
    K.paper(ctx, x, y, w, h, { rot: o.rot ?? -.02, scale: k, fill: o.fill, draw: c => lines.forEach((l, i) => CK.txt(c, l, 0, -h / 2 + 20 + sz * .65 + i * sz * 1.3, `700 ${sz}px Fredoka`, o.col || OUT)) }); };
  EP.push = (ctx, lt, dur, z0 = 1, z1 = 1.06, fx_ = 640, fy = 360) => { const z = lerp(z0, z1, ease.sine(clamp(lt / dur))); ctx.translate(fx_, fy); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  const card = EP.card, ride = EP.ride, fig = EP.fig, theo = EP.theo, talkIn = EP.talkIn;
  const tvt = k => TV[k];

  // clapperboard (big, hand-held)
  function clapper(ctx, x, y, s, k, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.08);
    sh(ctx, '#1e1e22', 5, c => c.rect(-150, -60, 300, 190)); for (let i = 0; i < 3; i++) ln(ctx, [[-136, -10 + i * 44], [136, -10 + i * 44]], 2.5, 'rgba(255,255,255,.55)');
    CK.txt(ctx, 'THE REAL COWBOY', 0, 6, '26px "Luckiest Guy"', '#f2f2f2'); CK.txt(ctx, 'SCENE 1   TAKE 1', 0, 52, '700 22px Fredoka', '#f2f2f2'); CK.txt(ctx, 'DIR. "HOLLYWOOD"', 0, 96, '700 18px Fredoka', '#c9c9cf');
    ctx.save(); ctx.translate(-150, -60); ctx.rotate(-.55 * (1 - k)); sh(ctx, '#f2f2f2', 5, c => c.rect(0, -40, 300, 40)); for (let i = 0; i < 6; i++) sh(ctx, '#1e1e22', 0, c => { c.moveTo(14 + i * 50, -40); c.lineTo(38 + i * 50, -40); c.lineTo(24 + i * 50, 0); c.lineTo(0 + i * 50, 0); c.closePath(); }); ctx.restore();
    ctx.restore(); }
  EP.clapper = clapper;
  const flicker = t => .94 + .06 * Math.sin(t * 47) * Math.sin(t * 13);   // old-film flicker on the movie-set shots
  function filmLook(ctx, t, a = 1) { ctx.save(); ctx.globalAlpha = (1 - flicker(t)) * .5 * a; ctx.fillStyle = '#fff6e0'; ctx.fillRect(0, 0, W, H); ctx.restore(); const r = rng(Math.floor(t * 24)); ctx.save(); ctx.globalAlpha = .35 * a; ctx.strokeStyle = 'rgba(40,30,20,.5)'; ctx.lineWidth = 1.2; for (let i = 0; i < 2; i++) { const x = r() * W; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + (r() - .5) * 8, H); ctx.stroke(); } ctx.restore(); CK.filmFrame(ctx, t, a); }
  EP.filmLook = filmLook;
  const GX1 = 320, GX2 = 960;   // gunslinger marks on Main Street
  function duel(ctx, t, lt, o = {}) {
    CS.longShadow(ctx, GX1, 650, 34); CS.longShadow(ctx, GX2, 650, 34);
    fig(ctx, 'gun1', GX1, 650, .62, { t, pose: o.p1 || 'idle', turn: o.turn1 ?? .7, face: o.f1 || { mouth: 'flat', brows: 'angry', eyes: 'squint', look: [.8, 0] }, vis: o.vis1 || null });
    fig(ctx, 'gun2', GX2, 650, .62, { t: t + 1, pose: o.p2 || 'idle', turn: o.turn2 ?? -.7, face: o.f2 || { mouth: 'flat', brows: 'angry', eyes: 'squint', look: [-.8, 0] }, vis: o.vis2 || null });
  }

  // ===================== COLD OPEN =====================
  S('action', (ctx, lt, dur, t, R) => {   // "Aaand… ACTION!"  the director, the crew, the clapper
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04); CS.movieSet(ctx, t, 0, { crew: true });
    duel(ctx, t, lt, { f1: { mouth: 'flat', brows: 'neutral', look: [.8, 0] }, f2: { mouth: 'flat', look: [-.8, 0] } });
    CS.longShadow(ctx, 1040, 760, 44, 200);
    fig(ctx, 'director', 1040, 760, .78, { lean: lt > R('action') - .2 ? -.06 : 0, t, pose: lt < R('action') ? 'present' : 'pointUp', turn: -.3, face: { mouth: 'open', brows: 'up' }, vis: Gd.say(t, 0, 2.4) });
    ctx.restore();
    const ck = clamp((lt - R('action') + .12) / .12); clapper(ctx, 420, 380 + Math.max(0, 1 - lt / .3) * 300, .9, ck, t);
    K.bubble(ctx, 'Aaand… ACTION!', 1010, 210, lt, .2, { size: 30 }); filmLook(ctx, t);
  }, -TV.action);
  mood('action', 'western', -TV.action); fx('action', 'clap', .9, -.05); fx('action', 'wind', .35, -1.3, 3);

  S('town', (ctx, lt, dur, t, R) => {   // the face-off on Main Street
    ctx.save(); EP.push(ctx, lt, dur + 3.6, 1.0, 1.12, 640, 470); CS.movieSet(ctx, t, 0, { tph: .2 });
    duel(ctx, t, lt, { vis1: Gd.say(t, TV.town, TV.draw - .1), vis2: Gd.say(t, TV.draw, TV.excuse), p1: lt > R('draw') ? 'hips' : 'idle', p2: lt > R('draw') + .4 ? 'hips' : 'idle' });
    ctx.restore();
    K.bubble(ctx, 'This town ain\'t big enough for the both of us.', 360, 170, lt, .1, { size: 24 });
    if (lt > R('draw')) K.bubble(ctx, 'Then draw, partner.', 930, 230, lt, R('draw'), { size: 26 });
    filmLook(ctx, t);
  });
  fx('town', 'whip', .3, .2);

  S('excuse', (ctx, lt, dur, t, R) => {   // the real cowhand wanders in, looking for two thousand cows
    ctx.save(); EP.push(ctx, lt, dur, 1.1, 1.14, 640, 470); CS.movieSet(ctx, t, 0, { tph: .5 });
    const walkK = clamp(lt / 2.2), cx = lerp(-80, 640, ease.out(walkK));
    duel(ctx, t, lt, { p1: 'hips', p2: 'hips', f1: lt > 1 ? { mouth: 'o', brows: 'skeptic', look: [.4, 0] } : undefined, f2: lt > 1.2 ? { mouth: 'flat', brows: 'worried', look: [-.4, 0] } : undefined, turn1: .5, turn2: -.5 });
    CK.puff(ctx, cx - 30, 640, (lt * 2) % 1, .5, 50);
    CS.longShadow(ctx, cx, 660, 32);
    fig(ctx, 'cowhand', cx, 660, .6, { t, walk: walkK < 1 ? t * 8 : null, turn: walkK < 1 ? .6 : 0, pose: walkK < 1 ? 'idle' : 'shrug', face: { mouth: 'smile', brows: 'worried' }, vis: Gd.say(t, TV.excuse, TV.cut) });
    CK.stink(ctx, cx + 60, 360, t, .8);
    ctx.restore();
    if (lt > R('cows')) K.bubble(ctx, 'Has anybody seen about two thousand cows?', 640, 150, lt, R('cows'), { size: 26 });
    if (lt > R('lost')) K.bubble(ctx, 'Lost \'em in a thunderstorm last night.', 640, 240, lt, R('lost'), { size: 24 });
    else if (lt < R('cows')) K.bubble(ctx, '\'Scuse me.', 520, 220, lt, .1, { size: 26 });
    filmLook(ctx, t);
  });
  fx('excuse', 'hooves', .2, 0, 1.5); fx('excuse', 'pluckUp', .5, 1.6);

  S('cut', (ctx, lt, dur, t, R) => {   // "CUT! Who let the extra in?"
    const sk = Math.max(0, 1 - lt / .5) * 10; ctx.save(); ctx.translate(Math.sin(lt * 60) * sk, 0); EP.push(ctx, lt, dur, 1.0, 1.02);
    ctx.save(); ctx.filter = 'blur(3px)'; CS.movieSet(ctx, t, 0, { tumble: false }); ctx.restore();
    fig(ctx, 'cowhand', 820, 560, .4, { t, pose: 'wave', face: { mouth: 'grin' }, light: false });
    fig(ctx, 'director', 520, 800, 1.0, { lean: .08 * Math.max(0, 1 - lt / 1.2), t, pose: Gd.pose(lt, [[0, 'pointSide'], [1.2, 'facepalm']], .25), turn: .25, face: { mouth: 'shock', brows: 'angry', eyes: 'wide' }, vis: Gd.say(t, TV.cut, TV.know) });
    ctx.restore();
    K.title(ctx, 'CUT!', lt, 0, { y: 140, size: 110, color: '#e8433a' }); if (lt > R('wholet')) K.bubble(ctx, 'Who let the extra in?', 900, 260, lt, R('wholet'), { size: 30 });
    filmLook(ctx, t);
  });
  fx('cut', 'stamp', .7); fx('cut', 'clap', .6, .05);

  // ===================== MYTH vs REAL =====================
  S('know', (ctx, lt, dur, t, R) => {   // the cowboy you know: a movie poster
    CS.studio(ctx, t, 0);
    theo(ctx, 330, 700, .9, { t, pose: Gd.pose(lt, [[0, 'present'], [1.4, 'pointSide']]), turn: .3, vis: Gd.say(t), face: { mouth: 'smile', brows: 'up' } });
    const k = K.pop(lt, .2, .45); CK.poster(ctx, 900, 360, 380, 520, { rot: .03, scale: k, seed: 5, draw: c => {
      c.fillStyle = grad(c, 0, -260, 0, 260, [[0, '#f2a050'], [1, '#c0563a']]); c.fillRect(-190, -260, 380, 520);
      Gd.draw(c, 0, 230, .62, cast('gun1', { t, pose: 'hips', face: { eyes: 'squint', brows: 'angry', mouth: 'smirk' }, light: false }));
      CK.txt(c, 'THE FASTEST', 0, -224, '40px "Luckiest Guy"', '#fff3d0'); CK.txt(c, 'GUN IN THE WEST', 0, -186, '34px "Luckiest Guy"', '#fff3d0'); } });
    K.tag(ctx, 'fast draw', 760, 520, lt, R('squint') - .2, { size: 26, rot: -.05 }); K.tag(ctx, 'steely squint', 1060, 200, lt, R('squint') + .6, { size: 26, rot: .04 }); K.tag(ctx, 'shoots first, asks never', 900, 640, lt, R('shoots'), { size: 26 });
    K.tag(ctx, 'THE COWBOY YOU KNOW', 900, 70, lt, .1, { size: 30 });
  });
  fx('know', 'whip', .5, .2); fx('squint', 'ding', .4); fx('shoots', 'pop', .5);

  S('existed', (ctx, lt, dur, t, R) => {   // … and the one who actually existed
    CS.studio(ctx, t, 0);
    theo(ctx, 300, 700, .9, { t, pose: Gd.pose(lt, [[0, 'presentL'], [.4, 'pointSide'], [9, 'present'], [12.5, 'shrug']]), turn: .35, vis: Gd.say(t), face: { mouth: 'smile', brows: 'up' } });
    const k = K.pop(lt, .1, .4); if (k > .01) fig(ctx, 'cowhand', 860, 700, .92 * k, { t, pose: Gd.pose(lt, [[0, 'idle'], [4, 'shrug'], [7, 'idle']]), turn: -.3, face: lt > R('bathed') && lt < R('decent') ? { mouth: 'grin', eyes: 'happy', blush: 1 } : { mouth: 'smile', brows: 'worried' } });
    if (lt > R('bathed')) { CK.stink(ctx, 800, 300, t, 1.1); CK.stink(ctx, 960, 330, t + .5, .9); }
    K.tag(ctx, 'THE COWBOY WHO ACTUALLY EXISTED', 760, 70, lt, .1, { size: 28 });
    K.tag(ctx, 'probably a teenager', 1080, 180, lt, R('teen'), { size: 26, rot: .03 }); CK.priceTag(ctx, 1110, 380, 'pay', '≈ $1/day', K.pop(lt, R('dollar'), .5), { size: 34 });
    K.tag(ctx, 'last bath: 3 weeks ago', 600, 250, lt, R('bathed') + .3, { size: 24, rot: -.04 });
    CK.counter(ctx, 640, 600, lt, R('firing') + .2, { s: .9, note: 'a whole career, maybe zero' });
  });
  fx('teen', 'pop', .5); fx('dollar', 'clink', .5); fx('bathed', 'pluckUp', .4, .3); fx('firing', 'stamp', .6, .2);

  S('noon', (ctx, lt, dur, t, R) => {   // three questions
    CS.studio(ctx, t, 0);
    theo(ctx, 640, 720, .95, { t, pose: Gd.pose(lt, [[0, 'think'], [R('famous') - .5, 'present'], [R('saddle') - 1.5, 'cheer']]), vis: Gd.say(t), face: lt < R('famous') ? { mouth: 'flat', brows: 'skeptic', look: [-.4, -.5] } : { mouth: 'grin', brows: 'up' } });
    card(ctx, 'What did he actually\ndo all day?', 250, 200, lt, R('allday'), { size: 28, rot: -.04 });
    card(ctx, 'Why was he out\nthere at all?', 1030, 200, lt, R('why'), { size: 28, rot: .04 });
    card(ctx, 'How did a ~20-year job become\nthe most famous job in America?', 640, 110, lt, R('famous') + .4, { size: 26 });
    if (lt < R('allday')) K.tag(ctx, 'no duel at high noon…', 640, 300, lt, .1, { size: 28 });
  });
  fx('allday', 'pop', .5); fx('why', 'pop', .5); fx('famous', 'pop', .5, .4);

  S('saddle', (ctx, lt, dur, t, R) => {   // title: saddle up, it's a long walk to Kansas
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 420); CS.prairie(ctx, t, lt * 6, { v: 'dusk' });
    B.herd(ctx, t, { seed: 7, n: 40, x: [-200, 1480], y: [520, 640], s: [.14, .3], mode: 'walk', dust: .4 });
    B.mini(ctx, lerp(200, 330, lt / dur), 600, .55, t, { gait: 'walk', shirt: '#3f6f9a' }); CS.foreground(ctx, t, 0, { v: 'dusk' }); ctx.restore();
    K.title(ctx, 'THE REAL COWBOY', lt, .1, { y: 200, size: 96 }); K.tag(ctx, 'It\'s a long walk to Kansas · 1866–1886', 640, 300, lt, R('walk'), { size: 28 });
  });
  fx('saddle', 'whip', .5, .1); fx('saddle', 'moo', .4, 1.2);

  // ===================== BEAT 2 — cows, no money =====================
  const TXV = { lon: -98.6, lat: 31.4, z: .78 };
  function cattleField(ctx, lt, n, t0, v, seed = 3, spread = 1) { const r = rng(seed); for (let i = 0; i < n; i++) { const lon = -104 + r() * 10, lat = 26.5 + r() * 9.5; if (!inTexas(lon, lat)) { i--; continue; } const [x, y] = CS.toS(lon, lat, v); CS.cattleIcon(ctx, x, y, .9, K.pop(lt, t0 + i * .02 * spread)); } }
  const TXP = [[-106.6, 32.0], [-103.06, 32.0], [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-98.0, 34.0], [-96.0, 33.8], [-94.04, 33.6], [-94.04, 31.0], [-93.8, 29.7], [-94.7, 29.3], [-96.8, 28.3], [-97.4, 27.4], [-97.2, 25.95], [-99.1, 26.4], [-100.3, 28.2], [-101.4, 29.8], [-102.4, 29.8], [-103.2, 29.0], [-104.5, 29.6], [-106.6, 31.8]];
  function inTexas(x, y) { let c = false; for (let i = 0, j = TXP.length - 1; i < TXP.length; j = i++) { const [xi, yi] = TXP[i], [xj, yj] = TXP[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }
  EP.cattleField = cattleField; EP.TXV = TXV;

  S('guy', (ctx, lt, dur, t, R) => { const v = { lon: lerp(-98.6, -98.6, 0), lat: 31.4, z: lerp(.7, .82, ease.sine(clamp(lt / dur))) }; CS.map(ctx, t, v); cattleField(ctx, lt, 46, .3, v);
    FX.dateTag(ctx, 'TEXAS · 1865'); if (lt > R('thisguy') - .2) { const k = K.pop(lt, R('thisguy') - .2); const [x, y] = CS.toS(-98.2, 30.4, v); ctx.save(); ctx.strokeStyle = '#d8433a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, 40 * k, 0, TAU); ctx.stroke(); ctx.restore(); K.tag(ctx, 'this guy →', x - 160, y, lt, R('thisguy') - .1, { size: 26 }); } });
  mood('guy', 'trail'); fx('guy', 'paper', .5); fx('thisguy', 'pop', .5, -.2);

  S('longhorn', (ctx, lt, dur, t, R) => {   // the Texas longhorn, horns about the width of a pickup
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.04, 640, 500); CS.prairie(ctx, t, 0, { v: 'noon', seed: 2 });
    const k = clamp((lt - .4) / 1.2), ghost = clamp((lt - R('tough') + .8) / .5);
    if (ghost > 0) { ctx.save(); ctx.globalAlpha = .35 * ghost; ctx.strokeStyle = '#2a3a5a'; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.roundRect(440, 370, 420, 120, 20); ctx.roundRect(480, 300, 180, 80, 14); ctx.stroke(); ctx.setLineDash([]); for (const wx of [520, 790]) { ctx.beginPath(); ctx.arc(wx, 500, 40, 0, TAU); ctx.stroke(); } ctx.restore(); K.tag(ctx, 'horns ≈ the width of a pickup', 640, 160, lt, R('tough') - .6, { size: 26 }); }
    B.longhorn(ctx, lerp(380, 560, ease.out(k)), 640, 1.6, t, { mode: k < 1 ? 'walk' : 'stand', coat: 1, horn: 1.15, ph: .2 }); CS.foreground(ctx, t, 0); ctx.restore();
    K.tag(ctx, 'tough', 220, 300, lt, R('tough'), { size: 30, rot: -.05 }); K.tag(ctx, 'half-wild', 1080, 300, lt, R('halfwild'), { size: 30, rot: .05 }); K.tag(ctx, 'walks forever on bad grass', 1000, 620, lt, R('halfwild') + 1.2, { size: 24 });
    K.title(ctx, 'THE TEXAS LONGHORN', lt, .05, { y: 90, size: 60 });
  });
  fx('longhorn', 'moo', .6, .6); fx('tough', 'pop', .5); fx('halfwild', 'pop', .5);

  S('ticket', (ctx, lt, dur, t, R) => {   // the personality of a parking ticket
    CS.prairie(ctx, t, 0, { v: 'noon', seed: 2 }); ctx.save(); ctx.filter = 'blur(2px)'; ctx.restore();
    B.face(ctx, 640, 470, .95, t, { mood: 'meh', chew: true, coat: 1 });
    const u = clamp((lt - .5) / 1.2), tx = lerp(900, 930, u) + Math.sin(lt * 5) * 30 * (1 - u), ty = lerp(-60, 300, ease.out(u));
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(Math.sin(lt * 4) * .3 * (1 - u) + .2); sh(ctx, '#f6e27a', 3.5, c => c.rect(-50, -70, 100, 140)); CK.txt(ctx, 'PARKING', 0, -44, '22px "Luckiest Guy"', '#b8322a'); CK.txt(ctx, 'VIOLATION', 0, -18, '700 16px Fredoka', '#5a3a22'); for (let i = 0; i < 4; i++) ln(ctx, [[-36, 6 + i * 14], [36, 6 + i * 14]], 2, 'rgba(0,0,0,.4)'); ctx.restore();
    K.tag(ctx, 'personality: parking ticket', 640, 640, lt, .2, { size: 30 });
  });
  fx('ticket', 'paper', .6, .5); fx('ticket', 'pluckUp', .4, 1.7);

  S('multiply', (ctx, lt, dur, t, R) => { const v = { lon: -98.6, lat: 31.4, z: .82 }; CS.map(ctx, t, v); cattleField(ctx, lt, Math.min(220, 30 + Math.floor(lt * 60)), -5, v, 9, .2);
    FX.dateTag(ctx, '1861–1865'); K.tag(ctx, 'more… and more… and more cattle', 640, 640, lt, .3, { size: 28 }); });
  fx('multiply', 'tick', .4, .3); fx('multiply', 'tick', .4, .9); fx('multiply', 'tick', .4, 1.5);

  S('skip', (ctx, lt, dur, t, R) => {   // ranchers leave for the war; enslaved men work the herds
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.05, 640, 480); CS.ranch(ctx, t, 0);
    B.herd(ctx, t, { seed: 11, n: 22, x: [-100, 1380], y: [560, 620], s: [.22, .3], mode: 'mix', speed: 6 });
    const dep = clamp((lt - R('ranchers') + .5) / 4); if (dep < 1) ride(ctx, 'vet', lerp(700, 1420, ease.inOut(dep)), 520, .42 * (1 - dep * .3), t, { gait: dep > 0 ? 'trot' : 'stand', coat: '#5a3a28', blanket: '#5a5a62' });
    ride(ctx, 'freed', lerp(140, 300, lt / dur), 690, .62, t, { gait: 'walk', coat: '#8a5a36', riderOpts: { pose: 'idle', face: { mouth: 'flat', look: [.6, .2] } } });
    ride(ctx, 'freed2', lerp(1100, 960, lt / dur), 700, .66, t + 2, { gait: 'walk', dir: -1, coat: '#c9a070', blanket: '#3a6a9a', rider: cast('freed2', { prop: 'lasso', pose: 'idle', light: { cast: 0, contact: 0 } }) });
    ctx.restore();
    K.tag(ctx, 'a part the movies skip', 640, 90, lt, .2, { size: 30 }); if (lt > R('ranchers')) K.tag(ctx, 'ranchers off to war', 1060, 420, lt, R('ranchers') + .3, { size: 24 }); if (lt > R('enslaved')) K.tag(ctx, 'the cattle work: done by enslaved people', 640, 170, lt, R('enslaved') + .2, { size: 26 });
  });
  mood('skip', 'quiet'); fx('ranchers', 'hooves', .3, .5, 2.5);

  S('ended', (ctx, lt, dur, t, R) => {   // still, quiet illustration — no gag
    ctx.save(); EP.push(ctx, lt, dur, 1.02, 1.1, 640, 460); CS.prairie(ctx, t * .3, 0, { v: 'dawn', seed: 3 });
    B.herd(ctx, t * .4, { seed: 13, n: 30, x: [-200, 1480], y: [500, 580], s: [.12, .22], mode: 'mix', speed: 4 });
    ride(ctx, 'freed2', 380, 680, .7, t * .5, { gait: 'stand', coat: '#5a3a28', rider: cast('freed2', { prop: 'lasso', pose: 'idle', turn: .4, light: K.LIGHT.dusk, face: { mouth: 'flat', look: [.5, -.1] } }) });
    ride(ctx, 'freed', 760, 700, .74, t * .5 + 1, { gait: 'stand', coat: '#8a5a36', dir: -1, rider: cast('freed', { pose: 'idle', turn: .3, light: K.LIGHT.dusk, face: { mouth: 'flat', look: [-.4, -.1] } }) });
    ride(ctx, 'ikard', 1080, 650, .58, t * .5 + 2, { gait: 'stand', coat: '#3a2a20', rider: cast('ikard', { pose: 'idle', light: K.LIGHT.dusk, face: { mouth: 'flat' } }) });
    ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .3; ctx.fillStyle = '#ffb070'; ctx.fillRect(0, 0, W, H); ctx.restore();
    K.tag(ctx, 'walked out of slavery already knowing how to rope, ride and work a herd', 640, 90, lt, R('walkedout') + .4, { size: 22 });
  });
  fx('ended', 'wind', .25, 0, 6);

  S('y1865', (ctx, lt, dur, t, R) => { const v = { lon: -98.6, lat: 31.4, z: .82 }; CS.map(ctx, t, v); cattleField(ctx, lt, 200, -5, v, 9, 0);
    FX.dateTag(ctx, 'TEXAS · 1865'); K.title(ctx, 'TWO THINGS', lt, .1, { y: 90, size: 56 });
    card(ctx, '1. millions of cattle', 300, 220, lt, R('millions'), { size: 30, rot: -.03 }); card(ctx, '2. no money', 980, 220, lt, R('nomoney'), { size: 30, rot: .03 });
    if (lt > R('nomoney') + .2) { const k = K.pop(lt, R('nomoney') + .2); ctx.save(); ctx.translate(980, 420); ctx.scale(k, k); sh(ctx, '#8a5a34', 4, c => c.roundRect(-70, -50, 140, 100, 18)); sh(ctx, '#6b4026', 3, c => c.roundRect(-70, -50, 140, 34, 14)); CK.txt(ctx, '$0', 0, 20, '40px "Luckiest Guy"', '#f6e2b6'); ctx.restore(); CK.stink(ctx, 1000, 360, t, .5); } });
  mood('y1865', 'curious'); fx('millions', 'pop', .5); fx('nomoney', 'pluckUp', .5);

  S('north', (ctx, lt, dur, t, R) => { const k = ease.inOut(clamp(lt / 1.6)), v = { lon: lerp(-98.6, -93, k), lat: lerp(31.4, 36.5, k), z: lerp(.82, .62, k) }; CS.map(ctx, t, v); cattleField(ctx, lt, 160, -5, { lon: v.lon, lat: v.lat, z: v.z }, 9, 0);
    for (const [p, i] of [['Chicago', 0], ['St. Louis', 1]]) { const [x, y] = CS.toS(...CS.PLACES[p], v), kk = K.pop(lt, 1.4 + i * .4); if (kk <= 0) continue; ctx.save(); ctx.translate(x, y); ctx.scale(kk, kk); for (let b = 0; b < 5; b++) sh(ctx, ['#7a7a86', '#8a8a96', '#6a6a76'][b % 3], 3, c => c.rect(-60 + b * 24, -40 - (b % 3) * 18, 22, 40 + (b % 3) * 18)); K.smoke(ctx, t, -30, -80, .4); ctx.restore(); K.tag(ctx, p, x, y + 30, lt, 1.5 + i * .4, { size: 20 }); }
    K.tag(ctx, 'up north: booming cities', 640, 640, lt, .6, { size: 28 }); });
  fx('north', 'whoosh', .4); fx('north', 'crowd', .3, 1.6, 2.5);

  S('smith', (ctx, lt, dur, t, R) => {   // ~10× the price up north
    CS.studio(ctx, t, 0);
    B.longhorn(ctx, 330, 690, .95, t, { mode: 'stand', coat: 0, horn: 1 }); B.longhorn(ctx, 950, 690, .95, t + 1, { mode: 'stand', coat: 0, horn: 1, dir: -1 });
    CK.priceTag(ctx, 330, 260, 'in Texas', '$4', K.pop(lt, R('tentimes') + .4, .5)); CK.priceTag(ctx, 950, 260, 'up north', '$40', K.pop(lt, R('tentimes') + 1.2, .5), { col: '#2e7a3a' });
    K.tag(ctx, '≈ 10×', 640, 300, lt, R('tentimes') + 2, { size: 44 });
    card(ctx, 'Texas: cheap cow.  North: expensive cow.', 640, 90, lt, R('tentimes') + 2.6, { size: 28 }); K.tag(ctx, 'per the Smithsonian', 640, 680, lt, .2, { size: 20 });
  });
  fx('tentimes', 'clink', .5, .4); fx('tentimes', 'clink', .6, 1.2); fx('tentimes', 'ding', .5, 2);

  S('thinking', (ctx, lt, dur, t, R) => {   // "just put the cows on a train"
    CS.studio(ctx, t, 0);
    theo(ctx, 360, 700, .9, { t, pose: Gd.pose(lt, [[0, 'think'], [R('train'), 'present'], [R('great'), 'thumbsUp']]), turn: .2, vis: Gd.say(t), face: lt > R('great') ? { mouth: 'grin', eyes: 'wink' } : { mouth: 'smile', brows: 'up' } });
    if (lt > R('train') - .3) { const x = lerp(1400, 820, ease.out(clamp((lt - R('train') + .3) / 1.4))); ctx.save(); ctx.translate(x, 560); sh(ctx, '#2a2a30', 4, c => c.roundRect(-80, -80, 120, 80, 8)); sh(ctx, '#2a2a30', 4, c => c.rect(-60, -130, 34, 50)); sh(ctx, '#b8322a', 4, c => c.rect(20, -110, 60, 110)); for (const wx of [-50, 0, 50]) { sh(ctx, '#5a5a62', 3, circ(wx, 0, 20)); } K.smoke(ctx, t, -44, -150, .5);
      for (let i = 0; i < 2; i++) { sh(ctx, '#8a5a36', 4, c => c.rect(100 + i * 170, -90, 150, 90)); for (let j = 0; j < 3; j++) B.longhorn(ctx, 130 + i * 170 + j * 40, -40, .22, t + j, { mode: 'stand', coat: j + i }); sh(ctx, '#3a3a42', 3, circ(130 + i * 170, 4, 16)); sh(ctx, '#3a3a42', 3, circ(220 + i * 170, 4, 16)); } ctx.restore(); }
    card(ctx, '"Just put the cows on a train."', 820, 160, lt, R('train'), { size: 30 });
  });
  fx('train', 'whoosh', .4); fx('great', 'ding', .5);

  S('except', (ctx, lt, dur, t, R) => { const v = { lon: -95.5, lat: 35.2, z: .66 }; CS.map(ctx, t, v); EP.cattleField(ctx, lt, 90, -5, v, 9, 0);
    CS.route(ctx, CS.TRAILS.rail, v, clamp((lt - .3) / 2.4), { rail: 1 }); const nope = K.pop(lt, .6); if (nope > 0) { const [x, y] = CS.toS(-98.6, 30.5, v); CK.crossOut(ctx, x, y - 40, 60 * nope, clamp((lt - .6) / .5)); K.tag(ctx, 'no railroad in Texas (yet)', x, y + 60, lt, .7, { size: 22 }); }
    CS.pin(ctx, 'Abilene', v, lt, R('kansas2'), { label: 'end of the line: Kansas' });
    if (lt > R('kansas2') + .6) { const [ax, ay] = CS.toS(-97.21, 38.6, v), [sx, sy] = CS.toS(-98.5, 30.0, v); ctx.save(); ctx.setLineDash([14, 10]); ln(ctx, [[sx, sy], [ax, ay]], 6, '#b8322a'); ctx.restore(); K.tag(ctx, '600+ miles from the herds', (ax + sx) / 2 + 150, (ay + sy) / 2, lt, R('kansas2') + .8, { size: 24 }); } });
  fx('except', 'hooves', .2, .3, 2); fx('kansas2', 'pop', .6);

  S('plan', (ctx, lt, dur, t, R) => {   // the plan: walk them to Kansas
    CS.studio(ctx, t, 0);
    theo(ctx, 250, 700, .85, { t, pose: Gd.pose(lt, [[0, 'presentBoth'], [2, 'pointSide']]), turn: .3, vis: Gd.say(t), face: { mouth: 'grin', brows: 'up' } });
    const k = K.pop(lt, .2, .5); K.paper(ctx, 800, 370, 760, 460, { scale: k, rot: .01, draw: c => {
      CK.txt(c, 'THE PLAN', 0, -190, '48px "Luckiest Guy"', '#5a3420'); CK.txt(c, '(beautifully simple, incredibly dumb)', 0, -146, '700 20px Fredoka', '#8a6a4a');
      const u = clamp((lt - R('couple')) / 5); B.herd(c, t, { seed: 21, n: 16, x: [-300, -300 + 560 * (.3 + u * .7)], y: [10, 70], s: [.14, .18], mode: 'walk', speed: 0 });
      c.save(); c.setLineDash([12, 8]); ln(c, [[-320, 120], [300, 120]], 4, '#b8322a'); c.restore(); sh(c, '#b8322a', 0, cc => { cc.moveTo(320, 120); cc.lineTo(296, 108); cc.lineTo(296, 132); cc.closePath(); });
      CK.txt(c, '2,000 half-wild cows', -180, 160, '700 22px Fredoka', '#2e2a26'); CK.txt(c, 'KANSAS', 300, 80, '30px "Luckiest Guy"', '#b8322a'); } });
    K.tag(ctx, '≈ Houston → Kansas City', 800, 640, lt, R('couple') + 2.5, { size: 26 });
  });
  fx('plan', 'paper', .5);

  S('rivers', (ctx, lt, dur, t, R) => {   // through rivers, storms, Indian Territory, on horseback
    const seg = lt < R('storms') ? 0 : lt < R('territory') ? 1 : lt < R('horseback') ? 2 : 3;
    if (seg === 0) { CS.river(ctx, t, 0); B.herd(ctx, t, { seed: 31, n: 16, x: [-100, 1400], y: [560, 660], s: [.3, .4], mode: 'walk', each: (c, x, y, s) => { c.save(); c.fillStyle = '#7f6e4c'; c.fillRect(x - 160 * s, y - 90 * s, 380 * s, 120 * s); c.restore(); CS.waterline(c, x + 20 * s, y - 92 * s, 260 * s, t); } }); K.tag(ctx, 'rivers', 640, 110, lt, 0, { size: 40 }); }
    else if (seg === 1) { const fl = Math.max(0, Math.sin((lt - R('storms')) * 9)) * clamp(1 - (lt - R('storms')) / .8); CS.prairie(ctx, t, 0, { v: 'storm', flash: fl }); CK.bolt(ctx, 820, 0, 760, 460, 3, fl * 2); B.herd(ctx, t, { seed: 33, n: 24, x: [-100, 1400], y: [540, 660], s: [.24, .36], mode: 'walk' }); K.rain(ctx, t, 1, 180, .3); K.tag(ctx, 'storms', 640, 110, lt, R('storms'), { size: 40 }); }
    else if (seg === 2) { const v = { lon: -97.6, lat: 35.2, z: 1.3 }; CS.map(ctx, t, v); CS.route(ctx, CS.TRAILS.chisholm, v, 1, {}); K.tag(ctx, 'through Indian Territory', 640, 120, lt, R('territory'), { size: 36 }); }
    else { CS.prairie(ctx, t, lt * 30, { v: 'day', seed: 4 }); ride(ctx, 'hand', 640, 640, 1.2, t, { gait: 'trot', coat: '#7a4a2e' }); CS.foreground(ctx, t, lt * 30); K.tag(ctx, 'on horseback', 640, 110, lt, R('horseback'), { size: 40 }); }
  });
  fx('rivers', 'river', .4, 0, 1.2); fx('storms', 'thunder', .6); fx('storms', 'rain', .5, 0, 1.3); fx('territory', 'paper', .5); fx('horseback', 'hooves', .4, 0, 1.6);

  S('whole', (ctx, lt, dur, t, R) => {   // "that's the whole job — that's the cowboy"
    ctx.save(); EP.push(ctx, lt, dur, 1.0, 1.06, 640, 520); CS.prairie(ctx, t, 0, { v: 'dusk', seed: 5 });
    B.herd(ctx, t, { seed: 41, n: 36, x: [-200, 1480], y: [500, 600], s: [.12, .24], mode: 'walk', speed: 18, dust: .5 });
    ride(ctx, 'cowhand', lerp(520, 640, lt / dur), 690, .9, t, { gait: 'walk', coat: '#6a4a30', rider: cast('cowhand', { light: K.LIGHT.dusk, pose: 'idle', face: { mouth: 'smile', eyes: 'half' } }) });
    CS.foreground(ctx, t, 0, { v: 'dusk' }); ctx.restore();
    K.title(ctx, 'THAT\'S THE WHOLE JOB.', lt, .2, { y: 120, size: 60 }); if (lt > R('thecowboy')) K.tag(ctx, 'that\'s the cowboy', 640, 210, lt, R('thecowboy'), { size: 30 });
  });
  mood('whole', 'western'); fx('whole', 'moo', .3, .5);
})(window);
