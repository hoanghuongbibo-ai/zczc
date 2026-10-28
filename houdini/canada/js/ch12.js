/* Canada — Beat 12, the plans (1086.5–1128.3 s): Defence Scheme No. 1 was real, written 12 April 1921 — strike first, grab key cities, fall back, wait for help;
 * Brown never checked with Britain; shelved 1928. 1930: the US Army's War Plan Red. Neither used; within twenty years, the closest allies. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK } = C, k01 = S.k01;
  const a = (ph, from = 1084) => F.at(ph, from);
  const A = { start: a('so yes defence'), real: a('was real'), written: a('written april'), idea: a('the idea hit'), grab: a('grab key'), fall: a('then fall back', 1090), wait: a('wait for help'), problem: a('the problem brown'), never: a('never checked'), noplans: a('no plans to send'), shelved: a('was shelved'),
    y1930: a('and in 1930'), drew: a('us army drew'), incase: a('in case of war'), called: a('it was called'), red: a('war plan red'), neither: a('neither plan'), twenty: a('within twenty'), allies: a('closest allies'), fact: a('the fact that both'), tells: a('tells you everything'), end: a('canada fought hard') };
  const folder = (ctx, x, y, w, h, rot, title, sub, k = 1) => { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const s = ease.back(clamp(k)); ctx.scale(s, s); C.shadow(ctx, true, 10, .4); ctx.fillStyle = '#d8b878'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 8); ctx.fill(); C.shadow(ctx, false); ctx.fillStyle = '#e4c88a'; ctx.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28);
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = `900 ${w * .1}px Anton`; ctx.fillText(title, 0, -h * .12); ctx.font = `700 ${w * .05}px Fredoka, sans-serif`; ctx.fillText(sub, 0, h * .04); ctx.restore(); C.stamp(ctx, 'SECRET', x + w * .2, y + h * .3, w * .09, -.12, k); };
  // 1. the plan was real: the folder and a map of the five thrusts
  function sScheme(ctx, lt, dur, t) { const v = S.view({ lon: -95, lat: 46, s: 1000, y: 360 }, { lon: -92, lat: 45, s: 1250, y: 330 }, ease.inOut(clamp(lt / dur)));
    const pr = C.map(ctx, v, { prov: true, fill: n => n === 'Canada' ? '#c86a5a' : n === 'United States of America' ? '#8ab0d8' : null, alpha: .55 });
    const thrusts = [[[-123, 49.5], [-122.3, 47.6], 'Seattle'], [[-111, 49.5], [-111.3, 47.5], 'Great Falls'], [[-97, 49.5], [-93.3, 45], 'Minneapolis'], [[-82.5, 43], [-83, 42.3], 'Detroit'], [[-74, 45.5], [-73.8, 42.7], 'Albany']];
    thrusts.forEach(([f, to, n], i) => { const kt = A.idea + i * .45, back = t > A.fall ? k01(t, A.fall, 1.5) : 0; if (t < kt) return; const kk = k01(t, kt, .7); const tip = back > 0 ? [lerp(to[0], f[0], back * .7), lerp(to[1], f[1], back * .7)] : to; C.mapArrow(ctx, pr, f, tip, kk, '#c23a2c', 14, .15); if (t > A.grab) { const [x, y] = pr(...to); C.label(ctx, n, x, y + 30, 18); } });
    if (t > A.wait) C.headline(ctx, '…THEN WAIT FOR HELP', 640, 600, 38, { rot: -.03, bg: '#fbf8f0' });
    folder(ctx, 1080, 170, 300, 200, .05, 'DEFENCE SCHEME No. 1', 'written 12 April 1921', k01(t, A.start, .4)); if (t > A.real) C.stamp(ctx, 'REAL', 1170, 90, 40, .1, k01(t, A.real, .3));
    S.date(ctx, '1921', 1); C.finish(ctx, t); }
  // 2. the problem: Brown never checked with Britain — London has no plans to send a big army
  function sProblem(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.04 }); Cn.layer(ctx, c, 1, () => { S.room(ctx, t, { wall: '#c8b48a', window: true, wx: 1100, sky: 'golden' });
      C.photo(ctx, 'defense-scheme-no-1', 300, 230, 220, 293, { rot: -.05, tape: true, seed: 131, caption: 'the five thrusts (modern map)', capSize: 13 });
      C.fig(ctx, 640, 690, .95, t, { face: 'busterUniform', pose: t > A.never ? 'chin' : 'talk', mood: t > A.noplans ? 'shock' : 'calm', seed: 451 }); S.desk(ctx, 640, 560, 460); P.cel(ctx, cc => cc.rect(540, 540, 200, 22), '#e8dcc0', { dx: 0, dy: 0, lw: 2 });
      if (t > A.never) { ctx.save(); ctx.translate(1000, 260); ctx.globalAlpha = k01(t, A.never, .4); P.cel(ctx, cc => cc.ellipse(0, 0, 170, 110, 0, 0, 7), '#fbf8f0', { dx: 0, dy: 6, lw: 3 }); C.flagUK(ctx, -60, -70, 120, 66); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '700 22px Fredoka, sans-serif'; ctx.fillText('Britain: no plans to', 0, 30); ctx.fillText('send a big army', 0, 58); ctx.restore(); } });
    if (t > A.problem && t < A.never + 1) S.fact(ctx, 'Brown never checked with Britain', k01(t, A.problem, .4)); if (t > A.shelved) C.stamp(ctx, 'SHELVED · 1928', 640, 360, 70, -.08, k01(t, A.shelved, .3)); C.finish(ctx, t); }
  // 3. 1930: the US Army's own plan — War Plan Red (red = Britain), a general at the map table
  function sRed(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06 }, { z: 1.0 }); Cn.layer(ctx, c, 1, () => { S.room(ctx, t, { wall: '#b8c0b8' });
      ctx.save(); ctx.translate(640, 220); C.shadow(ctx, true, 8, .4); ctx.fillStyle = '#efe6cc'; ctx.fillRect(-260, -150, 520, 300); C.shadow(ctx, false); ctx.beginPath(); ctx.rect(-250, -140, 500, 280); ctx.clip(); C.map(ctx, { lon: -85, lat: 50, s: 560, x: 0, y: 0 }, { fill: n => n === 'Canada' ? '#d84a3a' : n === 'United States of America' ? '#5a8ac8' : null, alpha: .8 }); ctx.restore();
      P.ink(ctx, '#5a5a5a', cc => cc.rect(240, 110, 6, 400), 0); C.flagUS(ctx, 246, 110, 120, 70);
      for (const [x, f] of [[480, 0], [800, 1]]) C.fig(ctx, x, 690, .9, t + x, { coat: '#6a6a4a', pants: '#5a5a3a', hat: 'kepi', hatCol: '#5a5a3a', mustache: f ? '#5a4a3a' : null, pose: f ? 'point' : 'stand', flip: !!f, seed: 461 + f }); S.desk(ctx, 640, 560, 520);
      folder(ctx, 640, 540, 240, 120, -.04, 'WAR PLAN RED', 'U.S. Army · 1930', k01(t, A.red - .3, .4)); });
    S.date(ctx, '1930', 1); if (t > A.incase && t < A.red) S.fact(ctx, 'the US Army\'s plan to invade Canada — in case of war with Britain', k01(t, A.incase, .4)); if (t > A.red) S.fact(ctx, 'colour codes: RED = Britain (and its empire)', k01(t, A.red + .4, .4)); C.finish(ctx, t); }
  // 4. neither used: both folders stamped NEVER USED; then two soldiers shake hands — the closest allies
  function sAllies(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.04 }); if (t < A.twenty) { Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft'); folder(ctx, 400, 300, 360, 240, -.05, 'DEFENCE SCHEME No. 1', 'Canada · 1921', 1); folder(ctx, 880, 300, 360, 240, .04, 'WAR PLAN RED', 'United States · 1930', 1); });
      C.stamp(ctx, 'NEVER USED', 640, 330, 80, -.1, k01(t, A.neither + .6, .3)); C.finish(ctx, t); return; }
    Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 470, sun: [640, 300], sunR: 50, seed: 471 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 460, ['#8aa86a', '#6f8f4a'], 6, 30));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 560, 1900, 400), '#8aa858', { dx: 0, dy: 0, lw: 0 }); P.ink(ctx, '#e8e0d0', cc => cc.rect(636, 520, 8, 200), 2);
      for (const [x, d] of [[380, 0], [900, 1]]) { P.ink(ctx, '#5a5a5a', cc => cc.rect(x, 300, 6, 330), 0); d ? C.flagUS(ctx, x + 6, 300, 120, 70) : C.flagRedEnsign(ctx, x + 6, 300, 120, 70); }
      C.fig(ctx, 500, 700, .9, t, Object.assign(PP.soldier1917(1), { hat: 'brodie', pose: 'point', mood: 'happy', seed: 481 })); C.fig(ctx, 780, 700, .9, t, { coat: '#6a6a44', pants: '#5a5a3a', hat: 'brodie', hatCol: '#5a5a3a', pose: 'point', mood: 'happy', flip: true, seed: 482 }); });
    if (t > A.allies) C.headline(ctx, 'THE CLOSEST ALLIES ON EARTH', 640, 120, 40, { rot: -.03, bg: '#fbf8f0' }); if (t > A.fact) S.fact(ctx, 'but both plans existed — that\'s how the border felt in the 1920s', k01(t, A.fact, .4)); C.finish(ctx, t); }

  const cut = [[A.start, sScheme, .4], [A.problem - .1, sProblem, .4], [A.y1930 - .1, sRed, .4], [A.neither - .1, sAllies, .4]];
  F.chapter({ cut, sfx: [{ t: A.real, type: 'press', gain: .45 }, { t: A.idea, type: 'whoosh', gain: .35 }, { t: A.never, type: 'scratch', gain: .3 }, { t: A.shelved, type: 'press', gain: .45 }, { t: A.red - .3, type: 'slide', gain: .35 }, { t: A.neither + .6, type: 'press', gain: .45 }, { t: A.twenty, type: 'swell', gain: .35 }],
    moods: [{ t: A.start, mood: 'tense' }, { t: A.twenty, mood: 'still' }] });
})(window);
