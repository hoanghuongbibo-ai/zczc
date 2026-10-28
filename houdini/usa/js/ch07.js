/* The American Revolution — Beat 7, Steuben (539.4–598.1 s): a stranger rides into camp; a Prussian captain with no English; drilling in
 * German and French, swearing translated; "now where were we?" — the recap; the model company; marching out of Valley Forge like an army. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, U = G.US, PP = G.PEOPLE, { clamp, lerp, ease, INK, rng, mix } = C, k01 = S.k01;
  const YOU = Object.assign({}, G.CAST.you, { lead: false, speak: false });
  const musket = (cc) => P.ink(cc, '#5a3a24', c2 => c2.rect(-3, -110, 6, 120), 2);
  const camp = (ctx, c, t, seed) => { Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 470, seed })); Cn.layer(ctx, c, .5, () => U.treeline(ctx, 470, '#3a4a44', 22, seed % 13, .5)); Cn.layer(ctx, c, 1, () => { U.snowGround(ctx, 520, { seed: seed % 7 }); for (let i = 0; i < 5; i++) U.hut(ctx, 120 + i * 260, 540, .5, t, { snow: true }); }); };
  // 1. a stranger rides into camp; dismounts; it's Steuben
  function sStranger(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.08 }); camp(ctx, c, t, 301); Cn.layer(ctx, c, 1, () => { const k = ease.out(k01(t, 539.6, 3.6)), x = lerp(1500, 860, k);
      P.horse(ctx, x, 700, .85, t, { walk: k < 1, flip: true, col: '#d8d0c0', rider: t < 543.6 ? cc => C.fig(cc, 0, -120, .95, t, Object.assign({}, G.CAST.steuben, { pose: 'stand', still: true, speak: false, profile: true, flip: true })) : null });
      if (t > 543.6) C.fig(ctx, 640, 712, 1.0, t, { face: 'steuben', pose: t > 549 ? 'point' : 'stand', mood: 'calm', brow: 'angry' });
      for (let i = 0; i < 4; i++) C.fig(ctx, 120 + i * 110, 700 + (i % 2) * 10, .58, t + i, Object.assign(PP.ragged(i), { pose: i === 2 ? 'chin' : 'hold', mood: 'shock', still: true, speak: false, turn: .45 })); });
    S.date(ctx, 'FEBRUARY 23, 1778', 1); if (t < 544.1) S.fact(ctx, 'a stranger rides into camp', k01(t, 539.6, .4)); else if (t > 549) S.fact(ctx, "he's here to teach you to fight like a professional army", k01(t, 549, .4)); C.finish(ctx, t, { vig: .5 }); }
  // 2. one small problem: he speaks; nobody understands
  function sProblem(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); camp(ctx, c, t, 311); Cn.layer(ctx, c, 1, () => { C.fig(ctx, 900, 712, 1.0, t, { face: 'steuben', pose: 'point', mood: 'happy', flip: true });
      for (let i = 0; i < 4; i++) C.fig(ctx, 140 + i * 130, 705, .7, t + i, Object.assign(i === 1 ? YOU : PP.ragged(i), { pose: i % 2 ? 'shrug' : 'chin', mood: 'shock', still: true, speak: false, turn: .45 })); });
    if (t > 553.4) C.bubble(ctx, 'GUTEN MORGEN,\nSOLDATEN!', 960, 170, 36, 920, 330); if (t > 554.9) { for (let i = 0; i < 4; i++) { const k = ease.back(k01(t, 555 + i * .15, .3)); ctx.save(); ctx.translate(140 + i * 130, 330); ctx.scale(k, k); ctx.font = '70px "Luckiest Guy"'; ctx.textAlign = 'center'; G.Type.outlined(ctx, '?', 0, 0, 70, '#ffe040'); ctx.restore(); } C.stamp(ctx, 'NO ENGLISH', 640, 470, 70, -.1, k01(t, 555, .3)); }
    if (t < 554.9) S.fact(ctx, "there's one small problem", k01(t, 552.9, .4)); C.finish(ctx, t, { vig: .45 }); }
  // 3. the drill: German, then French, then swearing — and his aide translates the swearing
  function sDrill(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); camp(ctx, c, t, 321); Cn.layer(ctx, c, 1, () => { const step = Math.floor(t * 1.6) % 2;
      for (let i = 0; i < 8; i++) { const x = 120 + (i % 4) * 120, y = 640 + (i / 4 | 0) * 60; C.fig(ctx, x + (i / 4 | 0) * 40, y, .5 + (i / 4 | 0) * .05, t + i * .7, Object.assign(PP.ragged(i), { pose: (i + step) % 3 === 0 ? 'point' : 'hold', mood: t > 560.2 ? 'shock' : 'worried', still: true, speak: false, turn: .45, prop: musket })); }
      C.fig(ctx, 860, 712, 1.0, t, { face: 'steuben', pose: t > 560.2 ? 'up' : 'point', mood: t > 560.2 ? 'angry' : 'calm', flip: true, lipT: t });
      if (t > 562.3) C.fig(ctx, 1120, 712, .8, t, Object.assign(PP.continental(4), { pose: 'point', mood: 'worried', still: true, speak: false, flip: true, turn: -.45 })); });
    if (t < 559.1) C.bubble(ctx, 'VORWÄRTS,\nMARSCH!', 900, 160, 40, 880, 320); else if (t < 560.2) C.bubble(ctx, 'EN AVANT,\nMARCHE!', 900, 160, 40, 880, 320); else if (t < 562.3) C.bubble(ctx, '#@%!! &*#!!\nSACRÉ…!!', 880, 150, 44, 870, 320);
    else { C.bubble(ctx, '#@%!! &*#!!', 760, 130, 34, 840, 320); C.bubble(ctx, '"HE SAYS YOU\'RE\nALL #@%!!"', 1110, 250, 26, 1110, 380); C.label(ctx, 'his aide, translating', 1110, 440, 16, { bg: '#f4c44a' }); }
    S.fact(ctx, t < 559.1 ? 'so he drills you in German' : t < 560.2 ? 'and French' : t < 562.3 ? 'and when that fails, he swears at you' : 'then has the swearing translated into English', k01(t, t < 559.1 ? 557 : t < 560.2 ? 559.1 : t < 562.3 ? 560.2 : 562.3, .3)); C.finish(ctx, t); }
  // 4. "now where were we? right." — three polaroids: the fog, Trenton, Valley Forge; then "something new"
  function sRecap(ctx, lt, dur, t) { C.bg(ctx, 'kraft'); const pics = [[260, 340, -.06, 569.6, 'NEW YORK: rowed away in the fog', (cc, w, h) => { cc.fillStyle = '#c8ccd0'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#7a8a9a'; cc.fillRect(0, h * .55, w, h * .45); U.boat(cc, w / 2, h * .66, .4, t, { men: 4, oars: true, seed: 2 }); cc.fillStyle = 'rgba(240,240,240,.55)'; cc.fillRect(0, 0, w, h); }],
      [640, 320, .04, 573.2, 'TRENTON: a win', (cc, w, h) => { cc.fillStyle = '#f0d8b0'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#eef2f4'; cc.fillRect(0, h * .6, w, h * .4); for (let i = 0; i < 3; i++) C.fig(cc, 50 + i * 90, h * .98, .3, t + i, Object.assign(PP.hessian(i), { pose: 'up', mood: 'sad', still: true, speak: false })); }],
      [1020, 340, -.03, 576.5, "VALLEY FORGE: didn't fall apart", (cc, w, h) => { cc.fillStyle = '#9aa4b0'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#eef2f4'; cc.fillRect(0, h * .55, w, h * .45); for (let i = 0; i < 3; i++) U.hut(cc, 40 + i * 100, h * .8, .3, t, { snow: true }); }]];
    for (const [x, y, r, kt, cap, inner] of pics) if (t > kt) S.polaroid(ctx, x, y, 300, 200, r, inner, cap, ease.back(k01(t, kt, .4)), 3);
    if (t < 569.6) { ctx.save(); ctx.font = '56px "Luckiest Guy"'; ctx.textAlign = 'center'; G.Type.outlined(ctx, t < 569.4 ? 'NOW WHERE WERE WE?' : 'RIGHT.', 640, 360, 56, '#ffffff'); ctx.restore(); }
    if (t > 580.7) C.headline(ctx, 'BY SPRING: SOMETHING NEW', 640, 600, 44, { rot: -.02, bg: '#ffe040' }); C.finish(ctx, t); }
  // 5. the model company: one sharp squad, then it multiplies — 1 → 2 → 4 → 8 blocks
  function sModel(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.08 }, { z: 1.0 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 470, sun: [1100, 230], sunR: 40, seed: 331 })); Cn.layer(ctx, c, 1, () => { U.ground(ctx, 520, '#a8b878'); const gen = Math.min(3, Math.floor(k01(t, 586.5, 4.5) * 4)); const n = 1 << gen;
      for (let b = 0; b < n; b++) { const cols = Math.min(n, 4), col = b % 4, row = b / 4 | 0, bx = 640 + (col - (cols - 1) / 2) * (1180 / cols), by = n <= 4 ? 700 : 560 + row * 150, s = [.85, .62, .45, .36][gen], sp = s * 120; const fresh = b >= n / 2 && n > 1 ? k01(t, 586.5 + gen * 1.12, .5) : 1; ctx.globalAlpha = fresh;
        for (let i = 5; i >= 0; i--) C.fig(ctx, bx + ((i % 3) - 1) * sp + (i / 3 | 0) * sp * .5, by - (i / 3 | 0) * sp * .45, s * (1 - (i / 3 | 0) * .08), t, Object.assign(PP.continental(i + b), { pose: Math.floor(t * 1.6) % 2 ? 'hold' : 'point', mood: 'calm', still: true, speak: false, turn: .45, prop: musket })); ctx.globalAlpha = 1; } });
    S.fact(ctx, t < 588 ? 'Steuben drills one model company until it is sharp' : 'then those men drill the next group, and the next', k01(t, t < 588 ? 584.5 : 588, .4)); C.finish(ctx, t); }
  // 6. marching out of Valley Forge in step
  function sMarchOut(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06, x: -30 }, { z: 1.0, x: 30 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 470, sun: [1100, 230], sunR: 40, seed: 341 })); Cn.layer(ctx, c, .5, () => C.hills(ctx, 460, ['#8aa86a', '#6f8f4a'], 9, 30)); Cn.layer(ctx, c, 1, () => { U.ground(ctx, 520, '#a8b878'); for (let i = 0; i < 4; i++) U.hut(ctx, 140 + i * 330, 540, .45, t, {});
      for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const x = ((i * 150 + (t - 591.8) * 70) % 1500) - 120 + r * 40; C.fig(ctx, x, 660 + r * 50, .5 + r * .06, t * 1.6, Object.assign(i === 4 && r ? YOU : PP.continental(i + r * 9), { pose: 'walk', profile: true, still: true, speak: false, mood: 'happy', prop: musket })); }
      U.flagPole(ctx, ((4 * 150 + (t - 591.8) * 70) % 1500) - 80, 600, 260, 'us', t, .7); });
    S.date(ctx, 'JUNE 19, 1778', 1); if (t > 594.5) C.headline(ctx, 'IT MARCHES LIKE AN ARMY', 640, 170, 50, { rot: -.03, bg: '#ffe040' }); C.finish(ctx, t); }

  sRecap.noCover = true; sModel.noCover = true; sDrill.noCover = true; sMarchOut.noCover = true;
  const cut = [[539.4, sStranger, .3], [552.8, sProblem, .3], [556.9, sDrill, .3], [568.6, sRecap, .3], [584.4, sModel, .3], [591.8, sMarchOut, .3]];
  F.chapter({ cut, sfx: [{ t: 539.6, type: 'hooves', gain: .45 }, { t: 555, type: 'stamp', gain: .6 }, { t: 557, type: 'drumroll', gain: .3 }, { t: 560.2, type: 'boo', gain: .2 }, { t: 562.3, type: 'pop', gain: .3 }, { t: 569.6, type: 'swish', gain: .3 }, { t: 573.2, type: 'swish', gain: .3 }, { t: 576.5, type: 'swish', gain: .3 },
    { t: 580.7, type: 'ding', gain: .4 }, { t: 584.6, type: 'march', gain: .45 }, { t: 591.9, type: 'march', gain: .55 }, { t: 592, type: 'drumroll', gain: .35 }, { t: 594.5, type: 'impact', gain: .45 }],
    moods: [{ t: 539.4, mood: 'mystery' }, { t: 552.8, mood: 'still' }, { t: 568.6, mood: 'under' }, { t: 591.8, mood: 'under' }] });
})(window);
