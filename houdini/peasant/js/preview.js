/* Preview (15 s, no narration yet): the cold-open beat "Meet Hugh" → the time-off skit with the abbot → "…A rooster."
 * Shot 1  establishing wide at dawn: abbey on the horizon, ox team ploughing a strip, the village, Hugh's yard; push in as Hugh steps out.
 * Shot 2  over Hugh's shoulder (back view, big, cropped by the frame) toward the abbot at his table in the chamber.
 * Shot 3  reverse: Hugh's deadpan close-up over the abbot's shoulder; the rooster hops onto the table. */
(function (G) {
  'use strict';
  const F2 = G.F2, U = G.SUI, S = G.Sets2, W = G.World, L = G.Life, M = G.MED, A = G.MEDA, MS = G.MS, k01 = U.k01, ease = U.ease, lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const HUGH = M.hughHood(), HUGH2 = M.hugh(), ABBOT = M.abbot(), REEVE = M.reeve(), SON = M.son(), WIFE = M.wife(), MONK = M.monk();
  const view = (ctx, t) => { MS.sky(ctx, t, 'day', 330, { clouds: 3, birds: false }); MS.far(ctx, t, 330, { abbey: false }); MS.fields(ctx, t, 380, 700, { vx: 900 }); };
  // ---------------------------------------------------------------- 1 · Alwalton at dawn
  const sVillage = F2.shot({ noCov: true, cam: [[0, 1.0, 640, 360], [.35, 1.0, 640, 360], [1, 1.32, 470, 470]], drift: .3, world: (ctx, t, lt) => {
      MS.sky(ctx, t, 'dawn', 330, { seed: 3 }); MS.far(ctx, t, 330, { abbeyX: 1020, abbeyS: .36 }); MS.fields(ctx, t, 368, 560, { vx: 980 });
      // plough team working a strip, far middle ground (moving slowly left → right)
      const px = 520 + lt * 14; ctx.save(); ctx.globalAlpha = .96; A.plough(ctx, px - 130, 470, .3, t); A.ox(ctx, px - 10, 474, .3, t, { yoke: true, walk: lt * .45 }); A.ox(ctx, px + 10, 466, .28, t, { yoke: true, walk: lt * .45 + .3 }); REEVE.draw(ctx, px - 180, 476, .3, t, { arms: 'hold', face: 'neutral', walk: lt * .45 }); SON.draw(ctx, px + 80, 482, .24, t, { arms: 'side', hold: 'goad', walk: lt * .45 + .5 }); ctx.restore();
      // village street: church and two cottages, hedge
      MS.church(ctx, 1210, 556, .5, t); MS.cottage(ctx, 870, 560, .42, t, { seed: 5, leanTo: false }); MS.cottage(ctx, 1030, 566, .36, t, { seed: 6, leanTo: false, flip: true, smoke: true });
      // the near yard: ground, path, mud, animals
      M.shp(ctx, k => { k.moveTo(-600, 560); k.quadraticCurveTo(300, 540, 700, 552); k.quadraticCurveTo(1200, 566, 1900, 548); k.lineTo(1900, 1200); k.lineTo(-600, 1200); k.closePath(); }, '#8aa04e', { lw: 3 });
      M.shp(ctx, k => { k.moveTo(250, 650); k.quadraticCurveTo(520, 700, 640, 800); k.lineTo(900, 800); k.quadraticCurveTo(700, 690, 330, 640); k.closePath(); }, '#b89a64', { lw: 2.4 });
      MS.tufts(ctx, -200, 1500, 570, 640, t, 26, 3, .9); MS.flowers(ctx, 560, 1400, 590, 660, t, 26, 4);
      // a fox slinks along the hedge line toward the hens
      A.fox(ctx, 1180 - lt * 22, 600, .5, t, { flip: true, walk: lt * .9 });
      MS.wattle(ctx, 520, 1080, 668, .8); MS.cottage(ctx, 300, 650, .95, t, { door: k01(lt, 1.2, .8), seed: 2, moss: true });
      // the rooster on the chopping block crows; hens peck; geese; the pig roots in the mud
      MS.mud(ctx, 820, 720, 110, 26, 4); A.pig(ctx, 800, 726, .8, t, { spots: true, root: true }); A.hen(ctx, 620, 712, 1, t, { peck: true }); A.hen(ctx, 680, 726, .95, t, { peck: true, col: '#e8d8b8', flip: true });
      M.shp(ctx, k => k.rect(520, 688, 46, 34), '#8a6a44', { lw: 3 }); M.shp(ctx, k => k.ellipse(543, 688, 23, 7, 0, 0, 7), '#c8a878', { lw: 2.6 }); A.hen(ctx, 543, 690, 1.05, t, { rooster: true, peck: lt > .4 && lt < 1.6 ? false : false });
      A.goose(ctx, 1010, 742, .95, t, { hiss: lt > 3 }); A.goose(ctx, 1080, 732, .85, t, {}); MS.stone(ctx, 940, 760, 1.1, 3); L.mushrooms && L.mushrooms(ctx, 150, 735, .8, 2);
      // Hugh steps out of the door, stretches, then turns to us
      if (lt > 1.6) { const k = k01(lt, 1.6, 1.2), x = lerp(292, 400, ease.inOut(k)); HUGH.draw(ctx, x, 660, .9, t, { arms: lt > 2.6 && lt < 3.8 ? 'up' : (lt >= 3.8 ? 'wave' : 'side'), face: lt > 2.6 && lt < 3.8 ? 'tired' : 'smile', mouth: lt > 2.7 && lt < 3.6 ? 'o' : undefined, walk: k < 1 ? lt * 1.6 : 0, look: .3 }); }
      MS.foreground(ctx, t, 'both', { y: 800 }); },
    ui: (ctx, t, lt) => { U.tag(ctx, 640, 120, 'MEET HUGH', k01(lt, 3.8, .3), 1.8); } });
  // ---------------------------------------------------------------- 2 · over Hugh's shoulder: the abbot at his table
  const sAsk = F2.shot({ noCov: true, cam: [[1.0, 640, 380], [1.08, 700, 380]], drift: .3, world: (ctx, t, lt) => {
      MS.chamber(ctx, t, { windowX: 1000, view, crossX: 640, shelfX: 250 }); MS.hanging(ctx, 560, 110, .9, t); MS.candleStand(ctx, 1150, 620, 1.1, t); MS.chest(ctx, 300, 640, .9); A.cat(ctx, 360, 572, .9, t, {});
      MONK.draw(ctx, 470, 600, .78, t, { arms: 'hold', hold: 'scroll', face: 'neutral', look: .6 });
      ABBOT.draw(ctx, 780, 640, 1.0, t, { arms: lt > 2.3 ? 'talk' : 'hold', face: lt > 2.3 ? 'smile' : 'neutral', talk: lt > 2.3 && lt < 5, look: -.5 }); MS.table(ctx, 780, 650, 380, 1); M.shp(ctx, k => k.rect(690, 548, 150, 12), '#f2e6c8', { lw: 2.4 }); ctx.save(); ctx.translate(900, 548); M.PROP.candle(ctx, t); ctx.restore(); ctx.save(); ctx.translate(640, 540); M.PROP.jug(ctx, t); ctx.restore(); MS.deskThings(ctx, 700, 558, .9, t);
      HUGH.draw(ctx, 250, 1010, 2.4, t, { back: true, arms: 'side' }); },
    ui: (ctx, t, lt) => { U.bubble(ctx, "Hi. I'd like to request some time off.", 420, 150, k01(lt, .3, .3) * (1 - k01(lt, 2.2, .2)), { tx: 300, ty: 330 }); U.bubble(ctx, 'Sure. One week at Christmas, one at Easter, and one at Whitsun.', 820, 140, k01(lt, 2.3, .3), { tx: 780, ty: 300, w: 420 }); } });
  // ---------------------------------------------------------------- 3 · reverse: "…A rooster."
  const sRooster = F2.shot({ noCov: true, cam: [[1.0, 640, 360], [1.1, 600, 380]], drift: .2, world: (ctx, t, lt) => {
      MS.chamber(ctx, t, { window: false, crossX: 980, shelfX: 420 }); MS.hanging(ctx, 760, 100, 1, t); MS.lectern(ctx, 180, 640, 1, t);
      HUGH.draw(ctx, 560, 700, 1.5, t, { arms: lt > 2.2 ? 'cross' : 'side', face: lt > 1.4 ? 'tired' : 'neutral', mouth: lt > 1.4 ? 'flat' : undefined, talk: lt > 1.4 && lt < 2.2, look: .5 });
      MS.table(ctx, 760, 760, 600, 1.2); MS.deskThings(ctx, 560, 650, 1.1, t); const hop = k01(lt, .3, .5); A.hen(ctx, lerp(1100, 800, ease.out(hop)), 650 - Math.sin(hop * Math.PI) * 60, 1.5, t, { rooster: true, flip: true });
      ABBOT.draw(ctx, 1130, 900, 1.9, t, { back: true, arms: 'side' }); },
    ui: (ctx, t, lt) => { U.bubble(ctx, '…A rooster.', 560, 150, k01(lt, 1.4, .3), { tx: 560, ty: 300, big: true, size: 40 }); } });
  F2.chapter({ cut: [[0, sVillage, 0], [6.0, sAsk, .3], [10.6, sRooster, .25]], badges: [[.8, 5.6, 'ALWALTON', 'England, 1279']],
    sfx: [{ t: 1.2, type: 'creak', gain: .5 }, { t: 1.8, type: 'steps', gain: .3 }, { t: 6.3, type: 'pop', gain: .3 }, { t: 8.3, type: 'pop', gain: .3 }, { t: 11.0, type: 'swish', gain: .3 }, { t: 12.0, type: 'pop', gain: .4 }],
    moods: [{ t: 0, mood: 'silence' }], amb: [{ t0: 0, type: 'wind' }, { t0: 6, type: 'room' }] });
})(window);
