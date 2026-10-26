/* "It's About Salt" — shared shot helpers + COLD OPEN (highway → the shaker → the montage → "I'm going to count it")
 * + BEAT 2 (why you can't quit salt · salt = a fridge in a sack · Hallstatt: the mine, the staircase, the rich graves · counter 1). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TS = G.TS, EF = G.EF, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, push, cover, card, label, LIGHT } = EP;
  const say = Gd.say, L = n => G.TV['L' + n];

  // ---------- shared helpers (used by every ep file) ----------
  // photos for the collage boards: snapshots of this episode's own painted sets (real Commons photos replace them when available)
  const SNAP = {}, SCAP = { highway: 'road salt today', kitchen: 'the shaker', hallstatt: 'Hallstatt', mine: 'Bronze Age mine', larder: 'salting pork', hanCourt: 'Han court', hanEstate: 'salt pans', debate: '81 BC debate', via: 'Via Salaria',
    grenier: 'grenier à sel', border: 'smugglers', canal: 'Erie Canal', canalSalt: 'Syracuse', carthage: 'Carthage', camp: 'Roman camp', saltville: 'Saltville', marchRoad: 'Salt March', dandi: 'Dandi', saltworks: 'salt works', grocery: 'iodized salt' };
  let lastSnap = '';
  const snap0 = TS.snap; TS.snap = n => { lastSnap = n; if (!SCAP[n]) return snap0(n); if (SNAP[n]) return SNAP[n]; const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    const [name, v] = n === 'canalSalt' ? ['canal', 'salt'] : [n]; try { TS[name](g, 2, v ? { v } : { guards: false }); } catch (e) { } return (SNAP[n] = c); };
  const pol0 = TS.polaroid; TS.polaroid = (ctx, img, x, y, w, rot, cap, o) => pol0(ctx, img, x, y, w, rot, cap || SCAP[lastSnap] || '', o);
  EP.board = (ctx, seed, photos) => EK.board(ctx, seed, { photos });
  // a map shot: the 3D globe flies in to (lon, lat), then dissolves into the crisp vector map (optional slow drift)
  EP.mapShot = (ctx, t, lt, keys, o = {}) => { const v = M.fly(lt, keys); M.draw(ctx, t, v, o); if (o.intro !== false) M.intro(ctx, t, lt, keys[0][1], keys[0][2], keys[0][3], o.D || 2.6); return v; };
  EP.shaker = (ctx, x, y, s, t, o = {}) => G.shaker(ctx, x, y, s, Object.assign({ t }, o));
  EP.big = (ctx, text, x, y, size, lt, t0, col = '#ffd23a') => { if (lt < t0) return; FX.bigText(ctx, text, x, y, size * K.pop(lt, t0, .4), { fill: col }); };
  EP.crossOut = (ctx, x, y, r, lt, t0) => { if (lt > t0) K.cross(ctx, x, y, r / 60, lt, t0); };
  const big = EP.big;

  // ===================== COLD OPEN =====================
  mood(1, 'curious');
  fx(1, 'wind', .5, 0, 9); fx(3, 'swish', .5, .4);
  S(1, (ctx, lt, dur, t, R) => {   // right now, somewhere in America, a truck is throwing salt onto a highway like it's nothing
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 700, 470); TS.highway(ctx, t, { drive: clamp(lt / 14) * .5 }); ctx.restore();
    EP.dateTag(ctx, 'somewhere in America · tonight');
    if (lt > R(3, 3)) K.tag(ctx, 'salt', 900, 560, lt, R(3, 3), { size: 34 });
  });
  S(4, (ctx, lt, dur, t, R) => {   // in 2024, roads ate about 4 out of every 10 tons of salt this country used
    TS.highway(ctx, t, { drive: .5 + clamp(lt / 8) * .2 });
    const k = K.pop(lt, .2, .4); if (k > 0) { ctx.save(); ctx.translate(1030, 250); ctx.scale(k, k); K.paper(ctx, 0, 0, 380, 300, { rot: .02, draw: c => { EK.txt(c, 'US SALT · 2024', 0, -112, '30px "Luckiest Guy"', '#3a2618');
      const a = clamp((lt - R(5, 2)) / 1.2) * .41; c.save(); c.translate(-70, 20); sh(c, '#d8d0c0', 4, cc => cc.arc(0, 0, 80, 0, TAU)); sh(c, '#c8322a', 4, cc => { cc.moveTo(0, 0); cc.arc(0, 0, 80, -PI / 2, -PI / 2 + a * TAU); cc.closePath(); }); c.restore();
      if (a > .4) { EK.txt(c, '≈ 4 in 10', 90, 0, '36px "Luckiest Guy"', '#c8322a'); EK.txt(c, 'tons → roads', 90, 40, '700 22px Fredoka', '#3a2618'); } } }); ctx.restore(); }
  });
  fx(6, 'pop', .4, .6);
  S(6, (ctx, lt, dur, t, R) => {   // and this little guy? same stuff. Sodium chloride. The cheapest thing in your kitchen.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.12, 620, 380); TS.kitchen(ctx, t, { sh: { turn: ease.inOut(clamp((lt - .4) / 1.0)), face: lt > R(9) ? 'happy' : 'smug' } }); ctx.restore();
    if (lt > R(7)) K.tag(ctx, 'same stuff', 380, 200, lt, R(7), { size: 30 });
    if (lt > R(8)) { const k = K.pop(lt, R(8), .4); if (k > 0) { ctx.save(); ctx.translate(880, 200); ctx.scale(k, k); K.paper(ctx, 0, 0, 260, 120, { rot: -.03, draw: c => { EK.txt(c, 'NaCl', 0, -10, '50px "Luckiest Guy"', '#2a5aa8'); EK.txt(c, 'sodium chloride', 0, 34, '700 20px Fredoka', '#3a2618'); } }); ctx.restore(); } }
    if (lt > R(9)) K.tag(ctx, '≈ $1 a pound', 640, 620, lt, R(9), { size: 30 });
  });
  S(10, (ctx, lt, dur, t, R) => {   // but for most of human history, this was NOT cheap
    ctx.save(); push(ctx, lt, dur, 1.12, 1.3, 620, 360); TS.kitchen(ctx, t, { sh: { turn: 1, face: lt > R(11) ? 'shock' : 'smug' } }); ctx.restore();
    if (lt > R(11)) EP.label(ctx, lt, R(11) + .2, 'NOT CHEAP', 640, 120);
  });
  // the montage: emperors · kings + smugglers · armies · the 1930 walk
  mood(12, 'adventure'); fx(12, 'gong', .5); fx(13, 'whoosh', .4); fx(14, 'rumble', .5); fx(15, 'whoosh', .4);
  S(12, (ctx, lt, dur, t, R) => {   // emperors built monopolies on it
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 400); TS.hanCourt(ctx, t, { guards: false }); TS.saltHeap(ctx, 760, 420, 200, 70);
    fig(ctx, 'wudi', 520, 760, .82, { t, pose: 'present', turn: .3, face: { mouth: 'smirk', brows: 'sly', look: [.6, .1] } }); ctx.restore();
    EP.label(ctx, lt, .4, 'MONOPOLY', 900, 160);
  });
  S(13, (ctx, lt, dur, t, R) => {   // kings taxed it so hard people smuggled it under their clothes
    TS.border(ctx, t); const w = clamp(lt / 3.4);
    fig(ctx, 'smuggler', lerp(300, 760, ease.inOut(w)), 640, .7, { t, walk: w > 0 && w < 1 ? t * 7 : null, turn: .7, prop: 'none', face: { mouth: 'grit', eyes: 'squint', brows: 'worried', look: [.8, 0] } });
    ctx.save(); ctx.translate(lerp(300, 760, ease.inOut(w)) + 8, 640 - 300 * .7); TS.sack(ctx, 0, 40, .55, '#e8dcbc'); ctx.restore();
    EP.dateTag(ctx, 'France · 1700s'); K.tag(ctx, 'taxed so hard…', 980, 180, lt, .3, { size: 30 }); if (lt > 1.4) K.tag(ctx, '…people smuggled it', 980, 250, lt, 1.4, { size: 28 });
  });
  S(14, (ctx, lt, dur, t, R) => {   // armies marched hundreds of miles to burn the places that made it
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 480); TS.saltville(ctx, t, { v: 'wrecked' }); ctx.restore(); EP.dateTag(ctx, 'Virginia · 1864');
    for (let i = 0; i < 4; i++) { const u = clamp(lt / 3 - i * .08); fig(ctx, i % 2 ? 'uscav2' : 'uscav', lerp(-120, 520, u) + i * 150, 680 + (i % 2) * 24, .36, t + i, { walk: u < 1 ? t * 8 : null, turn: .8, face: { mouth: 'grit', brows: 'worried' } }); }
  });
  S(15, (ctx, lt, dur, t, R) => {   // and in 1930 a 60-year-old man walked 240 miles to the ocean — just to pick some of it up off the ground
    const pick = lt > R(17) + .4; TS.dandi(ctx, t); EP.dateTag(ctx, 'India · 1930');
    const x = lerp(140, 560, ease.inOut(clamp(lt / (R(17) + .2)))); fig(ctx, 'gandhi', x, 700, .62, { t, walk: !pick && lt < R(17) + .2 ? t * 6 : null, turn: pick ? .2 : .7, pose: pick ? { L: [-60, -150], R: [70, -120], hL: 'rest', hR: 'hold' } : undefined, prop: pick ? 'none' : 'staff', face: { mouth: 'smile', eyes: pick ? 'half' : 'open' } });
    if (lt > R(16)) { const k = K.pop(lt, R(16) + .3, .4); if (k > 0) EK.count(ctx, 960, 200, 240, lt, R(16) + .3, 1.4, 'miles on foot', { size: 72 }); }
    if (lt > R(16, 2)) K.tag(ctx, 'age 60', 300, 160, lt, R(16, 2), { size: 30 });
  });
  mood(18, 'curious');
  S(18, (ctx, lt, dur, t, R) => {   // so how did the most boring thing on your table end up starting wars, funding canals and shaking an empire?
    TS.kitchen(ctx, t, { sh: { turn: 1, face: 'smug' } });
    [[R(18, 9), 'WARS', 250, '#c8322a'], [R(19, 1), 'CANALS', 640, '#2a5aa8'], [R(19, 4), 'AN EMPIRE', 1020, '#7a3a8a']].forEach(([a, s2, x, col], i) => { if (lt > a) { const k = K.pop(lt, a, .4); if (k > 0) G.UI.sign(ctx, s2, x, 150, 44, { k, rot: (i - 1) * .04, fill: col }); } });
  });
  S(20, (ctx, lt, dur, t, R) => {   // here's the short version: it was never about flavor
    ctx.save(); push(ctx, lt, dur, 1.0, 1.15, 610, 380); TS.kitchen(ctx, t, { sh: { turn: 1, face: lt > R(21) ? 'smug' : 'happy' } }); ctx.restore();
    if (lt > R(21)) { big(ctx, 'IT WAS NEVER', 640, 130, 64, lt, R(21)); big(ctx, 'ABOUT FLAVOR', 640, 210, 64, lt, R(21) + .5, '#ff6a4a'); }
  });
  mood(22, 'busy');
  S(22, (ctx, lt, dur, t, R) => {   // today we're doing the ENTIRE history of salt. And you'll notice a pattern. I'm going to count it.
    TS.kitchen(ctx, t, { shaker: false }); ctx.save(); ctx.fillStyle = 'rgba(30,20,10,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const k = K.pop(lt, .2, .5); if (k > 0) { ctx.save(); ctx.translate(640, 300); ctx.scale(k, k); K.paper(ctx, 0, 0, 760, 220, { rot: -.02, draw: c => { EK.txt(c, 'THE ENTIRE HISTORY OF', 0, -50, '40px "Luckiest Guy"', '#3a2618'); EK.txt(c, 'SALT', 0, 30, '100px "Luckiest Guy"', '#c8322a'); } }); ctx.restore(); }
    EP.shaker(ctx, 1080, 680, .9, t, { turn: 1, face: lt > R(23) ? 'smug' : 'happy' });
    if (lt > R(23)) K.tag(ctx, 'notice a pattern…', 300, 600, lt, R(23), { size: 30 });
  });
  EP.count(0, 24, .4);

  // ===================== BEAT 2 — why you can't quit salt =====================
  mood(25, 'comic');
  S(25, (ctx, lt, dur, t, R) => {   // first, why does anyone care? your body runs on sodium: nerves fire with it, muscles contract with it; run out → cramps, confusion, worse
    EP.board(ctx, 2, ['kitchen', 'larder', 'highway']);
    fig(ctx, 'viewer', 380, 690, .7, { t, pose: lt > R(30) ? 'shrug' : 'idle', turn: .2, prop: 'none', face: lt > R(30) ? { mouth: 'grit', eyes: 'squint', brows: 'worried', sweat: true } : { mouth: 'smile' } });
    if (lt > R(27)) K.tag(ctx, 'body runs on sodium (Na)', 820, 150, lt, R(27), { size: 28 });
    if (lt > R(28)) { const k = clamp((lt - R(28)) / .5); ctx.save(); ctx.strokeStyle = '#f6c13a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { ctx.beginPath(); const y0 = 300 + i * 60; ctx.moveTo(470, y0); for (let j = 1; j <= 6 * k; j++) ctx.lineTo(470 + j * 40, y0 + (j % 2 ? -18 : 18)); ctx.stroke(); } ctx.restore(); K.tag(ctx, 'nerves fire', 820, 250, lt, R(28), { size: 26 }); }
    if (lt > R(29)) K.tag(ctx, 'muscles contract', 820, 330, lt, R(29), { size: 26 });
    if (lt > R(30)) EP.card(ctx, 'run out → cramps,\nconfusion, worse', 820, 470, lt, R(30), { size: 28 });
    if (lt > R(31)) EP.label(ctx, lt, R(31), 'BODY PROBLEM', 820, 600);
  });
  S(32, (ctx, lt, dur, t, R) => {   // but the bigger problem was the fridge. There wasn't one.
    TS.larder(ctx, t); const k = K.pop(lt, .3, .4);
    if (k > 0) { ctx.save(); ctx.translate(900, 430); ctx.scale(k, k); sh(ctx, '#f4f6f8', 5, c => c.roundRect(-90, -240, 180, 280, 18)); ln(ctx, [[-90, -150], [90, -150]], 5); ln(ctx, [[60, -210], [60, -170]], 8, '#9aa2ac'); ln(ctx, [[60, -120], [60, -60]], 8, '#9aa2ac'); ctx.restore(); }
    if (lt > R(33)) K.cross(ctx, 900, 330, 2.6, lt, R(33));
    if (lt > R(33)) K.tag(ctx, 'no fridge', 900, 120, lt, R(33), { size: 32 });
  });
  S(34, (ctx, lt, dur, t, R) => {   // kill a pig in November: a few days before it's a biology experiment. Salt pulls the water out → bacteria can't grow → food lasts through winter
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 640, 420); TS.larder(ctx, t); ctx.restore(); EP.dateTag(ctx, 'November');
    if (lt < R(36)) { const day = Math.min(4, 1 + Math.floor(clamp((lt - R(35)) / 2.4) * 4)); if (lt > R(35)) K.tag(ctx, 'day ' + day + (day > 3 ? ' — uh oh' : ''), 640, 160, lt, R(35), { size: 32 }); }
    if (lt > R(36)) { const k = clamp((lt - R(36)) / 1.5); for (let i = 0; i < 8; i++) { const u = (k + i / 8) % 1; ctx.fillStyle = `rgba(80,150,220,${.8 * (1 - u)})`; ctx.beginPath(); ctx.ellipse(650 + (i % 4) * 100, 440 - u * 100, 7, 10, 0, 0, TAU); ctx.fill(); } K.tag(ctx, 'salt pulls the water out', 640, 160, lt, R(36), { size: 30 }); }
    if (lt > R(37)) { const k = K.pop(lt, R(37), .4); if (k > 0) { ctx.save(); ctx.translate(300, 260); ctx.scale(k, k); for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(i * 1.2); sh(ctx, '#7aba5a', 3, c => c.ellipse(26, 0, 22, 12, 0, 0, TAU)); ctx.restore(); } ctx.restore(); K.cross(ctx, 300, 260, 1.6, lt, R(37) + .3); } }
    if (lt > R(38)) K.tag(ctx, 'food lasts all winter ✓', 640, 600, lt, R(38), { size: 30, fill: '#d8f0c8' });
  });
  S(39, (ctx, lt, dur, t, R) => {   // salt is basically a refrigerator you can carry in a sack
    TS.village(ctx, t, .4); fig(ctx, 'peasant', 640, 760, .9, { t, prop: 'saltSack', pose: 'present', turn: .2, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } });
    EP.card(ctx, 'a fridge\nin a sack', 980, 220, lt, .5, { size: 40, fill: '#e8f4ff' });
  });
  S(40, (ctx, lt, dur, t, R) => {   // if your village had salt you survived February; if it didn't, you had to buy some from somebody who did
    TS.village(ctx, t, .7); EP.dateTag(ctx, 'February');
    fig(ctx, 'peasant', 360, 740, .8, { t, prop: 'saltSack', turn: .4, face: { mouth: lt > R(41) ? 'smirk' : 'smile', brows: lt > R(41) ? 'sly' : 'up', look: [.6, 0] } });
    if (lt > R(41)) fig(ctx, 'neo2', lerp(1400, 920, ease.out(clamp((lt - R(41)) / 1))), 740, .8, { t, walk: lt < R(41) + 1 ? t * 7 : null, prop: lt > R(42) ? 'coins' : 'none', turn: -.4, face: { mouth: 'grit', brows: 'worried', look: [-.6, 0] } });
    if (lt > R(40, 5)) K.tag(ctx, 'survived ✓', 360, 160, lt, R(40, 5), { size: 30, fill: '#d8f0c8' }); if (lt > R(42)) K.tag(ctx, 'buy it', 920, 160, lt, R(42), { size: 30 });
  });
  fx(43, 'gong', .5, .3);
  S(43, (ctx, lt, dur, t, R) => {   // and that's where the trouble starts
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 640, 380); TS.village(ctx, t, .7); ctx.restore(); ctx.save(); ctx.fillStyle = `rgba(20,10,30,${.35 * clamp(lt / .8)})`; ctx.fillRect(0, 0, W, H); ctx.restore();
    EP.label(ctx, lt, .5, 'TROUBLE', 640, 340);
  });
  // ---------- Hallstatt ----------
  mood(44, 'warm'); fx(44, 'whoosh', .5);
  S(44, (ctx, lt, dur, t, R) => {   // meet Hallstatt (HAHL-shtaht)
    const v = EP.mapShot(ctx, t, lt, [[0, 13.65, 47.56, 48], [3, 13.65, 47.56, 60]], { D: 1.6, relief: [[10, 47, 6, 2.2, 'rgba(255,255,255,.35)']] });
    M.pin(ctx, v, 13.65, 47.56, 'Hallstatt', clamp((lt - 1.3) / .4)); if (lt > 1.2) { M.label(ctx, v, 14.5, 47.9, 'AUSTRIA', { size: 24 }); M.label(ctx, v, 10.5, 46.6, 'THE ALPS', { size: 20, col: '#7a6a5a' }); }
  }, -1.0);
  S(45, (ctx, lt, dur, t, R) => {   // a postcard-pretty village in the Austrian Alps; inside the mountain above it, one of the oldest salt mines on Earth
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 880, 300); TS.hallstatt(ctx, t); ctx.restore();
    EK.nameCard(ctx, lt, .2, 'HALLSTATT', 'HAHL-shtaht · Austria', 330, 610, { icon: 'brush', w: 420 });
    if (lt > R(46)) { const k = clamp((lt - R(46)) / .5); ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[14, '#fff'], [8, '#e0261c']]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.ellipse(1000, 178, 80, 50, -.1, -.2, -.2 + TAU * .97 * k); ctx.stroke(); } ctx.restore(); K.tag(ctx, 'the salt mine', 1000, 80, lt, R(46) + .3, { size: 28 }); }
  });
  S(47, (ctx, lt, dur, t, R) => {   // the mine's operators + archaeologists: salt-getting here goes back about 7,000 years (leaning on one deer-antler tool found in 1838 — a good guess)
    TS.hallstatt(ctx, t, { pan: 40 });
    EK.count(ctx, 640, 180, 7000, lt, .4, 1.6, 'years of salt-getting?', { size: 80 });
    if (lt > R(48)) { const k = K.pop(lt, R(48) + .2, .4); if (k > 0) { ctx.save(); ctx.translate(1000, 470); ctx.scale(k, k); K.paper(ctx, 0, 0, 300, 220, { rot: .03, draw: c => { c.save(); c.translate(-20, 10); c.rotate(-.4); ln(c, [[-90, 30], [80, 10]], 26); ln(c, [[-90, 30], [80, 10]], 18, '#e2d2b0'); ln(c, [[40, 14], [70, -50]], 18); ln(c, [[40, 14], [70, -50]], 11, '#e2d2b0'); c.restore(); EK.txt(c, 'antler pick · found 1838', 0, 86, '700 20px Fredoka', '#3a2618'); } }); ctx.restore(); } }
    if (lt > R(50)) K.tag(ctx, 'a good guess', 640, 330, lt, R(50) + .5, { size: 30, fill: '#fff3c8' });
  });
  mood(51, 'adventure'); fx(51, 'whoosh', .4);
  S(51, (ctx, lt, dur, t, R) => {   // what's NOT a guess is the Bronze Age: the Natural History Museum Vienna found an industrial-scale operation — shafts 300+ ft down, leather gloves, a rope thick as your fist, millions of burnt pine torches
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 380); TS.mine(ctx, t);
    fig(ctx, 'miner', 230, 560, .5, { t, pose: { L: [-60, -300 + Math.sin(t * 4) * 30], R: [70, -330 + Math.sin(t * 4) * 30], hL: 'hold', hR: 'hold' }, turn: .4, face: { mouth: 'grit', brows: 'worried' } });
    fig(ctx, 'miner2', 1080, 700, .62, { t, turn: -.3, prop: 'torch', face: { mouth: 'smile' } }); ctx.restore();
    EP.dateTag(ctx, 'Bronze Age · c. 1500–1000 BC');
    if (lt > R(52, 3)) EK.nameCard(ctx, lt, R(52, 3), 'NATURAL HISTORY MUSEUM VIENNA', 'excavating the Hallstatt mines', 420, 110, { icon: 'brush', w: 560 });
    [[R(53), 'shafts 100 m+ deep', 1000, 120], [R(53, 4), 'leather gloves', 1000, 190], [R(54), 'rope thick as a fist', 1000, 260], [R(55), 'millions of pine torches', 1000, 330]].forEach(([a, s2, x, y]) => { if (lt > a) K.tag(ctx, s2, x, y, lt, a, { size: 26 }); });
  });
  S(56, (ctx, lt, dur, t, R) => {   // and a wooden staircase that tree-ring dating puts at about 3,300 years old — the oldest wooden staircase found in Europe. Salt preserves wood too.
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 380], [1.2, 1.5, 720, 430]]); TS.mine(ctx, t, { stair: clamp((lt - .6) / .8) }); ctx.restore();
    if (lt > .8) K.tag(ctx, 'c. 1344 BC (tree rings)', 640, 140, lt, .8, { size: 30 });
    if (lt > R(57)) EP.label(ctx, lt, R(57), "EUROPE'S OLDEST", 640, 600);
    if (lt > R(58)) K.tag(ctx, 'salt preserves wood too', 980, 260, lt, R(58), { size: 28 });
    if (lt > R(59)) K.tag(ctx, '"used it last Tuesday"', 980, 330, lt, R(59) + .6, { size: 26, fill: '#fff3c8' });
  });
  S(60, (ctx, lt, dur, t, R) => {   // the graveyard nearby: people buried with expensive bronze jewelry. Digging salt out of the mountain made Hallstatt rich.
    EP.board(ctx, 3, ['hallstatt', 'mine', 'larder']);
    const k = K.pop(lt, .3, .5); if (k > 0) { ctx.save(); ctx.translate(560, 380); ctx.scale(k, k);   // bronze finds: a spiral brooch, a bracelet, a pin
      ctx.strokeStyle = OUT; ctx.lineWidth = 12; ctx.lineCap = 'round'; for (const sx of [-1, 1]) { ctx.beginPath(); for (let a = 0; a < 14; a += .1) { const r = 6 + a * 5; ctx.lineTo(sx * 70 + Math.cos(a) * r * sx, Math.sin(a) * r); } ctx.stroke(); }
      ctx.strokeStyle = '#c8943a'; ctx.lineWidth = 7; for (const sx of [-1, 1]) { ctx.beginPath(); for (let a = 0; a < 14; a += .1) { const r = 6 + a * 5; ctx.lineTo(sx * 70 + Math.cos(a) * r * sx, Math.sin(a) * r); } ctx.stroke(); }
      ctx.lineWidth = 14; ctx.strokeStyle = OUT; ctx.beginPath(); ctx.ellipse(260, 10, 70, 50, 0, 0, TAU); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#d8a84a'; ctx.stroke(); ctx.restore(); }
    if (lt > .6) K.tag(ctx, 'bronze jewelry from the graves', 640, 600, lt, .6, { size: 28 });
    if (lt > R(61)) EP.label(ctx, lt, R(61) + .4, 'RICH', 960, 200, '#2a8a52');
  });
  EP.count(1, 64, -.4);
  S(62, (ctx, lt, dur, t, R) => {   // salt goes in, money comes out
    TS.hallstatt(ctx, t, { v: 'day' }); ctx.save(); ctx.fillStyle = 'rgba(255,240,200,.15)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const k = K.pop(lt, .1, .4); if (k > 0) { ctx.save(); ctx.translate(640, 420); ctx.scale(k, k);   // the salt-to-money machine
      sh(ctx, '#8a6a4a', 5, c => c.roundRect(-150, -110, 300, 200, 20)); sh(ctx, '#c8a060', 4, c => c.roundRect(-110, -80, 220, 60, 10)); ctx.font = '30px "Luckiest Guy"'; ctx.fillStyle = '#3a2618'; ctx.textAlign = 'center'; ctx.fillText('SALT → $', 0, -40);
      for (let i = 0; i < 6; i++) { const u = (t * 1.2 + i / 6) % 1; sh(ctx, '#fbfbf8', 2, c => c.rect(-240 + u * 90, -60 + Math.sin(i) * 20, 10, 10)); sh(ctx, '#e8c45a', 2.5, c => c.ellipse(160 + u * 120, 40 + u * 40 - Math.sin(u * PI) * 60, 14, 6, 0, 0, TAU)); }
      ctx.restore(); }
    if (lt > R(62, 2)) K.tag(ctx, 'salt goes in', 300, 260, lt, R(62, 2), { size: 30 }); if (lt > R(63)) K.tag(ctx, 'money comes out', 980, 260, lt, R(63), { size: 30, fill: '#fff3c8' });
  });
  S(64, (ctx, lt, dur, t, R) => {   // and once again… it's about salt
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 400); TS.mine(ctx, t);
    fig(ctx, 'miner', 250, 760, .82, { t, pose: 'cheer', turn: .3, prop: 'none', face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); fig(ctx, 'miner2', 1030, 760, .82, { t: t + 1, pose: 'thumbsUp', turn: -.3, prop: 'none', face: { mouth: 'grin', eyes: 'happy' } }); ctx.restore();
    EP.refrainSalt(ctx, lt, .1, { y: 120, gap: R(65) - .1 });
  });
})(window);
