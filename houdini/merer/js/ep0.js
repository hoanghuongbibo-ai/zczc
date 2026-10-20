/* Merer's Diary — framework + COLD OPEN (you wake on Merer's boat) + CH 1 (a king who needs a mountain).
 * Shots start on voice anchors (window.TV); inside a shot R('key') is that anchor relative to the shot start. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, ES = G.ES, EK = G.EK, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, PI = Math.PI;
  const EP = G.EP = { shots: [], sfx: [], moods: [] };
  EP.S = (key, fn, off = 0) => EP.shots.push({ t: Math.max(0, TV[key] + off), fn });
  EP.fx = (key, type, gain = 1, off = 0, dur) => EP.sfx.push({ t: Math.max(0, TV[key] + off), type, gain, dur });
  EP.mood = (key, mood, off = 0) => EP.moods.push({ t: Math.max(0, TV[key] + off), mood });
  const { S, fx, mood } = EP;
  // ---------- shared helpers ----------
  const LIGHT = { dawn: { x: .8, y: -.4, rim: '#ffd2a8', rimA: .55, shade: '#4a3a5a', shadeA: .3, cast: .25 }, day: { x: .6, y: -.8, rim: '#fff2d0', rimA: .45, shade: '#5a4030', shadeA: .28, cast: .3 },
    gold: { x: -.8, y: -.4, rim: '#ffcf8a', rimA: .6, shade: '#5a3a3a', shadeA: .32, cast: .35 }, dusk: { x: .8, y: -.3, rim: '#ffa86a', rimA: .6, shade: '#3a2a4a', shadeA: .35, cast: .3 },
    night: { x: .6, y: -.6, rim: '#a8c0ff', rimA: .4, shade: '#1a1a3a', shadeA: .4, cast: 0 }, lamp: { x: -.5, y: -.5, rim: '#ffb46a', rimA: .6, shade: '#2a1a1a', shadeA: .4, cast: 0 } };
  EP.LIGHT = LIGHT;
  const cast = EP.cast = (n, o = {}) => Object.assign({ light: LIGHT.day }, G.CW[n] || {}, o, { look: Object.assign({}, (G.CW[n] || {}).look, o.look) });
  EP.fig = (ctx, n, x, y, s, o) => K.fig(ctx, x, y, s, cast(n, o));
  EP.theo = (ctx, x, y, s, o) => K.fig(ctx, x, y, s, Object.assign({ light: LIGHT.day }, o));
  EP.push = (ctx, lt, dur, z0 = 1, z1 = 1.06, fx_ = 640, fy = 360) => { const z = lerp(z0, z1, ease.sine(clamp(lt / dur))); ctx.translate(fx_, fy); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  EP.cover = (ctx, lt, keys, d = .55) => { let A = keys[0], Bk = keys[0], k = 1; for (let i = 0; i < keys.length; i++) if (lt >= keys[i][0]) { A = i ? keys[i - 1] : keys[i]; Bk = keys[i]; k = clamp((lt - keys[i][0]) / d); }
    const e = ease.inOut(k), z = lerp(A[1], Bk[1], e); let fx_ = lerp(A[2], Bk[2], e), fy = lerp(A[3], Bk[3], e);
    fx_ = clamp(fx_, 640 / z, W - 640 / z); fy = clamp(fy, 360 / z, H - 360 / z); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  EP.dateTag = (ctx, s) => FX.dateTag ? FX.dateTag(ctx, s) : K.tag(ctx, s, 170, 40, 1, 0, { size: 20 });
  EP.deck = (ctx, y, dark = 1) => { P2.planks(ctx, 0, y, W, H - y, { size: 26, base: G.Guide.hexMul('#9a6a3e', dark), seed: 4 }); ln(ctx, [[0, y], [W, y]], 5); };
  EP.say = t => Gd.say(t);
  const fig = EP.fig, theo = EP.theo, push = EP.push, cover = EP.cover;
  const card = (ctx, text, x, y, lt, t0, o = {}) => { const k = K.pop(lt, t0, .4); if (k <= 0) return; const lines = text.split('\n'), sz = o.size || 32; ctx.font = `700 ${sz}px Fredoka`; const w = o.w || Math.max(...lines.map(l => ctx.measureText(l).width)) + 70, h = lines.length * sz * 1.3 + 40;
    K.paper(ctx, x, y, w, h, { rot: o.rot ?? -.02, scale: k, fill: o.fill, draw: c => lines.forEach((l, i) => EK.txt(c, l, 0, -h / 2 + 20 + sz * .65 + i * sz * 1.3, `700 ${sz}px Fredoka`, o.col || OUT)) }); };
  EP.card = card;
  function pickup(ctx, x, y, s, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.setLineDash([12, 9]); ctx.lineWidth = 5; ctx.strokeStyle = '#fff6e0';
    ctx.beginPath(); ctx.moveTo(-160, 0); ctx.lineTo(-160, -56); ctx.lineTo(-40, -56); ctx.lineTo(-20, -100); ctx.lineTo(70, -100); ctx.lineTo(100, -56); ctx.lineTo(160, -50); ctx.lineTo(160, 0); ctx.closePath(); ctx.stroke(); ctx.setLineDash([]);
    for (const wx of [-100, 100]) { ctx.beginPath(); ctx.arc(wx, 0, 30, 0, TAU); ctx.stroke(); } ctx.restore(); }
  EP.pickup = pickup;
  const pen = (ctx, x, y, a = .6) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ln(ctx, [[0, 0], [70, -96]], 9); ln(ctx, [[0, 0], [70, -96]], 5, '#c9a46a'); ctx.restore(); };
  EP.pen = pen;

  // ===================== COLD OPEN =====================
  mood('wake', 'nileQuiet');
  fx('wake', 'river', .5, 0, 9); fx('wake', 'birds', .3, 1.5);
  S('wake', (ctx, lt, dur, t, R) => {   // dawn mist over the wide brown river; the boat tied up below the white cliff
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 760, 520); ES.nile(ctx, t, lt * 4, { v: 'dawn', mist: 1, cliff: 'near', h: 300 });
    ln(ctx, [[470, 560], [520, 600]], 3, '#8a6a44'); ln(ctx, [[520, 560], [520, 640]], 8); ln(ctx, [[520, 560], [520, 640]], 4.5, '#6a4a2a');
    ES.boat(ctx, 790, 588, .82, t, { blocks: 0, sleepers: 10, ph: 0 }); ln(ctx, [[525, 575], [560, 570], [520, 568]], 2.5, '#c8aa70');
    motes(ctx, t, 20, 3); ctx.restore();
    EP.dateTag(ctx, 'TURA · JULY · c. 2560 BC'); if (lt > R('july')) K.tag(ctx, 'the river in flood', 980, 250, lt, R('river0') + 2, { size: 22 });
  });
  S('forty', (ctx, lt, dur, t, R) => {   // forty men asleep around you, wrapped in linen
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 600); ES.nile(ctx, t, 0, { v: 'dawn', mist: .8, near: false, h: 300 });
    ES.boat(ctx, 640, 690, 1.9, t, { blocks: 0, sleepers: 12, mast: false, bob: .5 }); motes(ctx, t, 16, 5); ctx.restore();
    K.tag(ctx, '40 men', 640, 120, lt, .6, { size: 30 });
  });
  S('cliff', (ctx, lt, dur, t, R) => {   // behind you: a pale limestone cliff covered in fresh chisel marks
    ctx.save(); const z = lerp(1.35, 1.15, ease.sine(clamp(lt / dur))); ctx.translate(640, lerp(520, 380, ease.inOut(clamp(lt / dur)))); ctx.scale(z, z); ctx.translate(-640, -360); ES.cliff(ctx, t, 0, { v: 'dawn' }); ctx.restore();
    K.tag(ctx, 'fresh chisel marks', 860, 240, lt, 1.6, { size: 26, rot: .03 }); ln(ctx, [[760, 270], [700, 330]], 4, '#fff6e0');
  });
  const deckSleepers = (ctx, t) => { for (let i = 0; i < 7; i++) ES.ew(ctx, 80 + i * 170, 600 + (i % 2) * 14, 2.2, t, { pose: 'sleep', seed: i + 3 }); };
  S('awake', (ctx, lt, dur, t, R) => {   // a few feet away a man is already awake: reed pen, papyrus
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 700, 420); ES.nile(ctx, t, 0, { v: 'dawn', mist: .6, near: false, h: 300 }); EP.deck(ctx, 560); deckSleepers(ctx, t);
    fig(ctx, 'merer', 760, 720, .82, { t, pose: 'idle', turn: -.35, light: LIGHT.dawn, face: { mouth: 'flat', brows: 'neutral', eyes: lt < R('reed') ? 'half' : 'open', look: [.3, .5] } }); ctx.restore();
    if (lt > R('reed')) K.tag(ctx, 'a reed pen + a sheet of papyrus', 380, 180, lt, R('reed') + .4, { size: 24 });
  });
  fx('writes', 'scratch', .8, .3); fx('writes', 'scratch', .6, 1.4);
  S('writes', (ctx, lt, dur, t, R) => {   // close: he writes one line — where the team spent the night
    ctx.fillStyle = '#5a4030'; ctx.fillRect(0, 0, W, H); EP.deck(ctx, 0, .8); ctx.save(); ctx.globalAlpha = .45; ctx.fillStyle = '#3a2a1a'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const k = clamp((lt - .2) / 2.2); EK.papyrusSheet(ctx, 640, 380, 820, 380, { rot: -.03, draw: c => { EK.hieratic(c, -340, -60, 680, 11, k, '#2a2018', 4); EK.hieratic(c, -340, -60, 80, 12, k * 8, '#b2342a', 4.2); } });
    if (k < 1) pen(ctx, 300 + 680 * k, 330, .55);
    K.tag(ctx, 'where the team spent the night', 640, 640, lt, R('where') + .1, { size: 26 });
  });
  S('away', (ctx, lt, dur, t, R) => {   // he rolls it up, puts it away — and looks at you
    ctx.save(); push(ctx, lt, dur, 1.12, 1.2, 700, 380); ES.nile(ctx, t, 0, { v: 'dawn', mist: .5, near: false, h: 300 }); EP.deck(ctx, 560); deckSleepers(ctx, t);
    fig(ctx, 'merer', 700, 760, .9, { t, pose: 'idle', prop: lt < .8 ? 'papyrus' : null, turn: -.15, light: LIGHT.dawn, face: { mouth: lt > R('boss') ? 'smirk' : 'flat', brows: lt > R('boss') ? 'up' : 'neutral', look: lt > R('name') - .3 ? [0, 0] : [.4, .4] } }); ctx.restore();
    if (lt > R('name')) EK.nameCard(ctx, lt, R('name'), 'MERER', 'inspector', 300, 200, { icon: 'brush' }); if (lt > R('boss')) K.tag(ctx, 'your boss', 960, 210, lt, R('boss') + .1, { size: 30, rot: -.04 });
  });
  fx('block', 'rumble', .4);
  S('today', (ctx, lt, dur, t, R) => {   // today: move a block as heavy as a pickup truck across the river
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.nile(ctx, t, lt * 10, { v: 'day', near: false, h: 280 }); ES.boat(ctx, 640, 560, 1.0, t, { blocks: 1, rowers: 6, sail: .2 }); ctx.restore();
    const a = clamp((lt - R('block') - .8) / .5); if (a > 0) { pickup(ctx, 640, 360, .9, a); K.tag(ctx, '≈ one pickup truck', 640, 230, lt, R('block') + 1.1, { size: 28 }); }
  });
  fx('across', 'scratch', .8, 2.2);
  S('across', (ctx, lt, dur, t, R) => {   // wide, from one bank across the Nile: workers + the huge block in front; Giza far away
    ctx.save(); push(ctx, lt, dur, 1.0, 1.04, 640, 500); ES.nile(ctx, t, lt * 6, { v: 'day', giza: true, gizaX: 1000, h: 300, bankY: 560 });
    ES.sledge(ctx, 420, 650, 1.0, { ropeTo: 720, ropeY: -40 }); for (let i = 0; i < 7; i++) ES.ew(ctx, 660 + i * 70, 640 + (i % 2) * 10, 1.3, t, { pose: 'pull', seed: i + 1 });
    ES.ew(ctx, 260, 660, 1.3, t, { pose: 'pour', seed: 9 }); ctx.restore();
    K.tag(ctx, 'the building site: ~10 miles away', 1000, 300, lt, .8, { size: 22 });
    EK.logCard(ctx, lt, R('across') + 2, 'Spends the night at Tura South.', { y: 150, w: 640, size: 30, source: false, writeDur: .8 });
  });
  S('strange', (ctx, lt, dur, t, R) => {   // the strange part: that sheet survived
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08); ES.museum(ctx, t); ctx.restore(); if (lt > R('survived')) K.tag(ctx, 'it survived', 640, 110, lt, R('survived') + .2, { size: 32 });
  });
  S('fourthou', (ctx, lt, dur, t, R) => {   // 4,500 years later: pulled out of a cave on the Red Sea coast
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 300, 470); ES.jarf(ctx, t, 0, { scrolls: clamp((lt - 2) / 1.5), sealed: 1 }); ctx.restore();
    K.tag(ctx, '4,500 years later', 900, 140, lt, .3, { size: 28 }); K.tag(ctx, 'a cave on the Red Sea coast', 900, 200, lt, 2.2, { size: 24 });
  });
  S('oldest', (ctx, lt, dur, t, R) => {   // the oldest inscribed papyrus ever found
    ctx.save(); push(ctx, lt, dur, 1.12, 1.2, 640, 330); ES.museum(ctx, t); ctx.restore(); EK.onScreen(ctx, lt, .3, 'the oldest inscribed papyrus ever found');
  });
  S('written', (ctx, lt, dur, t, R) => {   // written by a man who helped build the Great Pyramid
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 650, 330); ES.giza(ctx, t, 0, { v: 'gold', k: .9, workers: 18 }); ctx.restore();
    EK.onScreen(ctx, lt, .4, 'written by a man who helped build the Great Pyramid', { y: 640 });
  });
  // Theo: forget the whips, forget the aliens → the four questions
  mood('whips', 'curious');
  fx('whips', 'pop', .5, .5); fx('aliens', 'pop', .5, .2); fx('allday', 'pop', .4); fx('fed', 'pop', .4); fx('patched', 'pop', .4); fx('why', 'pop', .4);
  S('whips', (ctx, lt, dur, t, R) => {
    ctx.save(); push(ctx, lt, dur, 1.0, 1.04); ES.giza(ctx, t, 0, { v: 'gold', k: 1 }); ctx.restore();
    const qs = [['What did they do all day?', R('allday')], ['Who fed them?', R('fed')], ['Who patched them up?', R('patched')], ['Why did they do it at all?', R('why')]];
    if (lt < R('first')) { card(ctx, 'WHIPS', 820, 220, lt, .3, { size: 44, rot: -.05 }); K.cross(ctx, 820, 220, 70, lt, .9); card(ctx, 'ALIENS', 1060, 300, lt, R('aliens'), { size: 44, rot: .05 }); K.cross(ctx, 1060, 300, 70, lt, R('aliens') + .5); }
    else qs.forEach(([q, at], i) => card(ctx, q, 880, 150 + i * 110, lt, at, { size: 30, rot: (i % 2 ? .015 : -.015) }));
    theo(ctx, 300, 760, .9, { t, pose: lt < R('first') ? 'pointSide' : 'present', turn: .35, light: LIGHT.gold, vis: Gd.say(t), face: { mouth: 'smile', brows: lt < R('first') ? 'skeptic' : 'up', look: [.7, -.1] } });
  });
  S('answer', (ctx, lt, dur, t, R) => {   // the answer starts with that one line. Write it down.
    ctx.fillStyle = '#4a3020'; ctx.fillRect(0, 0, W, H); EP.deck(ctx, 0, .7);
    EK.logCard(ctx, lt, .2, 'Spends the night at Tura South.', { y: 300, w: 860, size: 38 });
    if (lt > R('writeit')) K.title(ctx, 'WRITE IT DOWN.', lt, R('writeit'), { y: 600, size: 70 });
  });

  // ===================== CH 1: a king who needs a mountain =====================
  mood('king', 'nile');
  const EGYPT = { lon: 31.2, lat: 27.6, z: .27 };
  S('king', (ctx, lt, dur, t, R) => {   // MAP: Egypt, the Nile from Aswan to the Delta, pin on Giza
    const v = { lon: lerp(31.2, 31.1, ease.inOut(clamp(lt / dur))), lat: lerp(27.6, 28.2, ease.inOut(clamp(lt / dur))), z: lerp(.27, .32, ease.inOut(clamp(lt / dur))) };
    ES.map(ctx, t, v); ES.route(ctx, ES.NILE, v, clamp((lt - .5) / 2.2), { col: '#2a7ab0', w: 8 }); ES.pin(ctx, 'Aswan', v, lt, .6); ES.pin(ctx, 'Giza', v, lt, 2.4);
    EK.chapter(ctx, lt, 1, 'A king who needs a mountain');
  });
  S('khufu', (ctx, lt, dur, t, R) => {   // Khufu — dates uncertain; one estimate 2589–2566 BC
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 380); ES.nile(ctx, t, 0, { v: 'gold', giza: false, near: false, h: 360 });
    sh(ctx, '#e2c48e', 4, c => c.rect(380, 560, 520, 40)); sh(ctx, '#d4b47e', 4, c => c.rect(420, 600, 440, 120));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 640, 300, 280, 'rgba(255,210,120,.25)'); ctx.restore();
    fig(ctx, 'khufu', 640, 570, .78, { t, pose: 'idle', turn: 0, light: LIGHT.gold, face: { mouth: 'flat', brows: 'neutral', eyes: 'half' } }); ctx.restore();
    K.tag(ctx, 'KHUFU (KOO-foo)', 640, 90, lt, .4, { size: 34 }); if (lt > R('dates')) K.tag(ctx, 'exact dates: unknown', 260, 300, lt, R('dates') + .2, { size: 22, rot: -.04 }); if (lt > R('reign')) K.tag(ctx, 'one estimate: 2589–2566 BC', 1020, 300, lt, R('reign') + .4, { size: 24, rot: .03 });
  });
  S('people', (ctx, lt, dur, t, R) => {   // to his people he's a god living on Earth
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 300); ES.nile(ctx, t, 0, { v: 'gold', near: false, h: 360 }); sh(ctx, '#d8b884', 4, c => c.rect(0, 520, W, 200));
    sh(ctx, '#e2c48e', 4, c => c.rect(500, 380, 280, 40)); sh(ctx, '#d4b47e', 4, c => c.rect(520, 420, 240, 100));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 640, 240, 220 + Math.sin(t * 2) * 10, 'rgba(255,220,140,.35)'); ctx.restore();
    fig(ctx, 'khufu', 640, 390, .5, { t, pose: 'presentBoth', light: LIGHT.gold, face: { mouth: 'flat', eyes: 'half' } });
    const r = rng(3); for (let i = 0; i < 26; i++) { const x = 60 + (i % 13) * 92 + (i > 12 ? 46 : 0), y = 600 + (i > 12 ? 70 : 0); ES.ew(ctx, x, y, 1.3, t, { pose: 'stand', seed: i, dir: x < 640 ? 1 : -1 }); }
    ctx.restore(); if (lt > R('god')) K.tag(ctx, 'a god living on Earth', 640, 110, lt, R('god') + .2, { size: 32 });
  });
  fx('sky', 'sparkle', .5, .3); fx('launch', 'rise', .4);
  S('dies', (ctx, lt, dur, t, R) => {   // when he dies he must reach the sky — the pyramid is the launch pad
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 300); ES.giza(ctx, t, 0, { v: 'night', k: 1 }); ctx.restore();
    const up = clamp((lt - R('sky')) / 2.5); if (up > 0) { const y = lerp(260, 40, ease.out(up)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 650, y, 60, 'rgba(255,240,180,.8)'); ctx.restore(); sh(ctx, '#fff6d0', 2, c => { for (let k = 0; k < 5; k++) { const a = -PI / 2 + k * TAU / 5; c.lineTo(650 + Math.cos(a) * 14, y + Math.sin(a) * 14); c.lineTo(650 + Math.cos(a + PI / 5) * 6, y + Math.sin(a + PI / 5) * 6); } c.closePath(); }); }
    if (lt > R('launch')) { const a = clamp((lt - R('launch')) / .6); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a * .5; ctx.fillStyle = grad(ctx, 0, 0, 0, 300, [[0, 'rgba(255,230,160,0)'], [1, 'rgba(255,230,160,.8)']]); ctx.beginPath(); ctx.moveTo(620, 290); ctx.lineTo(680, 290); ctx.lineTo(760, 0); ctx.lineTo(540, 0); ctx.closePath(); ctx.fill(); ctx.restore(); K.tag(ctx, 'a launch pad to the sky', 980, 520, lt, R('launch') + .3, { size: 28 }); }
  });
  fx('orders', 'hammer', .4, 1); fx('feet', 'pop', .4, .6); fx('feet', 'pop', .4, 3.2);
  S('orders', (ctx, lt, dur, t, R) => {   // the biggest building the world had ever seen: ~481 ft, ~2.3 million blocks
    const k = Math.round(lerp(.2, 1, clamp(lt / (R('feet') + 1))) * 10) / 10; ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.giza(ctx, t, 0, { v: 'day', k, workers: 20 }); ctx.restore();
    if (lt > R('feet')) { K.counter(ctx, 340, 260, 0, 481, lt, R('feet') + .4, 1.2, 'feet tall (approx.)', { size: 84, suffix: ' ft' }); EK.count(ctx, 940, 260, 2.3, lt, R('feet') + 2.6, 1.0, 'blocks (estimate)', { size: 84, dec: 1, suffix: ' million' }); }
    if (lt > R('tallest')) EK.onScreen(ctx, lt, R('tallest') + .3, 'tallest human-made structure on Earth for ~3,800 years');
  });
  fx('time', 'whoosh', .4, .2);
  S('time', (ctx, lt, dur, t, R) => { EK.timeline(ctx, lt, .2, { cleoAt: R('cleo') + .2, moonAt: R('cleo') + 1.6, gapAt: R('cleo') + 2.8 }); });
  S('thinking', (ctx, lt, dur, t, R) => {   // Theo: somebody had to do the actual work
    ctx.save(); push(ctx, lt, dur, 1.0, 1.04); ES.giza(ctx, t, 0, { v: 'day', k: .7, workers: 26 }); ctx.restore();
    theo(ctx, 320, 760, .9, { t, pose: lt > R('work') ? 'shrug' : 'present', turn: .3, vis: Gd.say(t), face: { mouth: 'smile', brows: lt > R('work') ? 'up' : 'neutral', look: [.6, -.1] } });
    if (lt > R('work')) K.tag(ctx, 'somebody had to do the work', 900, 160, lt, R('work') + .3, { size: 28 });
  });
})(window);
