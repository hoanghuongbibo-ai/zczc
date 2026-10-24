/* Canada — Beat 13, the Second World War and Japanese Canadian internment (1128.3–1169 s): Canada fights hard; at home, after Pearl Harbor,
 * from January 1942 about 21,000–22,000 Japanese Canadians removed from the West Coast — 90%+ of the community, most Canadian-born or naturalized;
 * homes, boats, businesses taken and sold; nobody ever charged; no return to the coast until 1949; 1988, Mulroney apologizes, $21,000 each. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK } = C, k01 = S.k01;
  const a = (ph, from = 1126) => F.at(ph, from);
  const A = { start: a('canada fought hard'), home: a('at home it did'), later: a('would later apologize'), pearl: a('after pearl harbor'), removed: a('removed about'), coast: a('from the west coast'), p90: a('90 percent'), born: a('canadian-born'), homes: a('homes boats'), sold: a('taken and sold'),
    single: a('not a single'), charged: a('ever charged'), back: a('back to the coast'), until: a('until 1949'), y1988: a('in 1988'), mulroney: a('prime minister brian'), survivors: a('survivors received'), end: a('after the war the deal') };
  // a fishing boat at the dock
  const boat = (ctx, x, y, s, t, name) => { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4 + x) * 3); ctx.scale(s, s); P.cel(ctx, cc => { cc.moveTo(-150, -40); cc.lineTo(150, -40); cc.lineTo(120, 20); cc.lineTo(-130, 20); cc.closePath(); }, '#e8e0d0', { shade: '#a89880', dx: 0, dy: 10, lw: 3 }); P.cel(ctx, cc => cc.rect(-150, -46, 300, 10), '#3a6a8a', { dx: 0, dy: 0, lw: 2 });
    P.cel(ctx, cc => cc.rect(10, -110, 90, 70), '#d8c8a8', { shade: '#a89878', dx: 10, dy: 0, lw: 3 }); P.ink(ctx, '#3a4a5a', cc => cc.rect(30, -96, 26, 22), 2); P.ink(ctx, '#5a3a24', cc => cc.rect(-80, -200, 6, 160), 0); ctx.fillStyle = INK; ctx.font = '700 16px "Special Elite"'; ctx.textAlign = 'center'; ctx.fillText(name, -60, -10); ctx.restore(); };
  // 1. Canada fights hard again: soldiers in steel helmets marching past the Red Ensign
  function sWar(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: 30 }, { z: 1.04, x: -30 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 470, seed: 491 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 460, ['#7a8a5a', '#5a6a4a'], 6, 30));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 560, 1900, 400), '#7a8a5a', { dx: 0, dy: 0, lw: 0 }); P.ink(ctx, '#5a5a5a', cc => cc.rect(1080, 300, 6, 400), 0); C.flagRedEnsign(ctx, 1086, 300, 130, 76);
      for (let i = 0; i < 7; i++) C.fig(ctx, ((i * 150 + lt * 60) % 1100) - 40, 700, .62, t * 1.3 + i, { coat: '#7a7a50', pants: '#6a6a44', hat: 'brodie', hatCol: '#5a5a3a', pose: 'walk', flip: false, seed: 500 + i }); });
    S.date(ctx, '1939–1945', 1); if (t > A.home) S.fact(ctx, 'and at home, it did something it would later apologize for', k01(t, A.home, .4)); C.finish(ctx, t); }
  // 2. the West Coast, 1942: the notice on the wall; families with suitcases walk past their boats and homes, which get SOLD tags
  function sRemoval(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06, x: 40 }, { z: 1.0, x: -40 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'dawn', t, { horizon: 420, seed: 501 })); Cn.layer(ctx, c, .3, () => C.hills(ctx, 410, ['#4a6a5a', '#3a5a4a'], 5, 40));
    Cn.layer(ctx, c, 1, () => { Cn.water(ctx, -300, 420, 1600, 560, t, { pal: 'dawn' }); const soldK = k01(t, A.sold, .4);
      [[120, 'KATSU MARU'], [470, 'SAKURA No. 2'], [820, 'NORTH STAR']].forEach(([x, n], i) => { boat(ctx, x, 520, .7, t, n); if (soldK > 0) C.stamp(ctx, 'SOLD', x, 440, 30, -.1 + i * .08, soldK); });
      P.cel(ctx, cc => cc.rect(-300, 540, 1900, 30), '#8a6040', { shade: '#5a3a20', dx: 0, dy: 6, lw: 3 }); P.cel(ctx, cc => cc.rect(-300, 570, 1900, 400), '#9a9a88', { dx: 0, dy: 0, lw: 0 });
      // a store front with a sign
      P.cel(ctx, cc => cc.rect(1000, 300, 300, 270), '#c8a878', { shade: '#987850', dx: 20, dy: 0, lw: 4 }); P.cel(ctx, cc => cc.rect(990, 290, 320, 40), '#6a4a2a', { dx: 0, dy: 0, lw: 3 }); ctx.fillStyle = '#fbf8f0'; ctx.font = '900 22px Anton'; ctx.textAlign = 'center'; ctx.fillText('TANAKA GROCERY', 1150, 318); P.ink(ctx, '#4a5a6a', cc => cc.rect(1030, 360, 110, 110), 3); P.cel(ctx, cc => cc.rect(1180, 400, 70, 170), '#5a3a24', { dx: 0, dy: 0, lw: 3 }); if (soldK > 0) C.stamp(ctx, 'SOLD', 1150, 420, 40, .08, soldK);
      // the notice
      ctx.save(); ctx.translate(1080, 520); ctx.rotate(-.03); P.cel(ctx, cc => cc.rect(-60, -40, 120, 80), '#f4ecd8', { dx: 0, dy: 3, lw: 2 }); ctx.fillStyle = INK; ctx.font = '900 18px Anton'; ctx.fillText('NOTICE', 0, -16); ctx.globalAlpha = .4; for (let i = 0; i < 4; i++) ctx.fillRect(-46, -4 + i * 10, 92, 3); ctx.restore();
      const walk = clamp(lt / dur); for (let i = 0; i < 6; i++) { const x = lerp(-60, 520, walk) + i * 110, kid = i === 2 || i === 4; C.fig(ctx, x, 700 + (i % 2) * 10, kid ? .42 : .64, t * 1.2 + i, Object.assign(i % 3 === 1 ? { kind: 'woman', cloth: ['#5a6a8a', '#7a5a5a'][i % 2], hair: '#1a1410', hairStyle: 'bun', skin: '#e8c090', seed: 510 + i } : PP.japanese(i), { pose: 'walk', mood: 'sad', flip: false, prop: kid ? null : (cc) => P.cel(cc, c2 => c2.rect(-22, 0, 44, 32), ['#6a4a2a', '#4a3a2a'][i % 2], { dx: 0, dy: 0, lw: 2 }) })); } });
    S.date(ctx, 'JANUARY 1942 · BRITISH COLUMBIA', k01(t, A.pearl, .4)); const lines = [[A.removed, 'about 21,000–22,000 Japanese Canadians removed from the West Coast'], [A.p90, 'more than 90% of the community — most Canadian-born or naturalized'], [A.homes, 'homes, boats and businesses — taken and sold']];
    let cur = null; for (const l of lines) if (t > l[0]) cur = l; if (cur) S.fact(ctx, cur[1], k01(t, cur[0], .4)); C.finish(ctx, t); }
  // 3. not a single one ever charged; 1942 → 1949
  function sCharged(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      C.headline(ctx, 'CHARGED WITH WRONGDOING:', 640, 180, 40, { rot: -.02, bg: '#fbf8f0' }); S.bigNum(ctx, '0', 640, 300, 140, k01(t, A.charged, .3), '#c23a2c');
      if (t > A.back) S.timeline(ctx, 520, 1940, 1952, [{ v: 1942, text: 'removed', size: 20, up: false, k: 1 }, { v: 1949, text: 'allowed back to the coast', size: 20, up: false, k: k01(t, A.until, .5) }], { x0: 260, x1: 1020 }); });
    C.finish(ctx, t); }
  // 4. 1988: Mulroney apologizes in the House; $21,000 to each survivor
  function sApology(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06 }, { z: 1.0 }); Cn.layer(ctx, c, 1, () => { S.court(ctx, t); ctx.fillStyle = 'rgba(30,70,40,.35)'; ctx.fillRect(-300, -300, 1900, 1400);
      C.fig(ctx, 640, 640, 1.0, t, { face: 'mulroney', pose: 'talk', mood: 'sad', seed: 521 }); P.cel(ctx, cc => { cc.moveTo(560, 470); cc.lineTo(720, 470); cc.lineTo(700, 640); cc.lineTo(580, 640); cc.closePath(); }, '#5a3418', { shade: '#3a2010', dx: 10, dy: 0, lw: 4 }); C.flagCA(ctx, 940, 120, 180, 90); P.ink(ctx, '#4a4a4a', cc => cc.rect(934, 120, 6, 420), 0); });
    S.date(ctx, '1988', 1); if (t > A.mulroney) S.fact(ctx, 'Prime Minister Brian Mulroney apologizes', k01(t, A.mulroney, .4), { y: 60 }); if (t > A.survivors) C.headline(ctx, '$21,000 TO EACH SURVIVOR', 640, 600, 40, { rot: -.03, bg: '#fbf8f0' }); C.finish(ctx, t); }

  const cut = [[A.start, sWar, .4], [A.pearl - .1, sRemoval, .4], [A.single - .1, sCharged, .4], [A.y1988 - .1, sApology, .4]];
  F.chapter({ cut, sfx: [{ t: A.sold, type: 'press', gain: .45 }, { t: A.charged, type: 'thud', gain: .4 }, { t: A.survivors, type: 'paper', gain: .3 }],
    moods: [{ t: A.start, mood: 'tense' }, { t: A.pearl, mood: 'under' }, { t: A.y1988, mood: 'still' }] });
})(window);
