/* Preview (61.4–79.3 s): "a midnight escape in the fog · a winter that kills about two thousand men without a single battle ·
 * a Prussian drillmaster who can't speak English · a French admiral who wins the war without ever setting foot on the battlefield ·
 * but first, you need to get in the boat." Four quick trailer cards, then back to the landing on the Delaware. */
(function (G) {
  'use strict';
  const F2 = G.F2, at = F2.at, U = G.SUI, S = G.Sets2, W = G.World, CK = G.CK, P = G.P2, O = G.SketchOpen, k01 = U.k01, ease = U.ease, { clamp, lerp } = CK;
  const T = { fog: at('theres a midnight escape', 60), win: at('a winter that kills', 60), noBattle: at('without a single battle', 60), pru: at('a prussian drillmaster', 60), eng: at('cant speak english', 60), adm: at('and a french admiral', 68), foot: at('without ever setting foot', 70), first: at('but first you need', 74), boat: at('get in the boat', 74), end: at('to understand how you ended up', 76) };
  // the cast for these cards — new instances, each with their own props
  const WASH = P.washington(201), ROWERS = [P.continental(202), P.militia(203), P.continental(204), P.militia(205), P.continental(206), P.militia(207)];
  const HUDDLE = [P.continental(210), P.militia(211), G.Cast2.make.you(212), P.militia(213), P.continental(214)];
  const STEU = P.steuben(220), DRILL = [P.militia(221), P.continental(222), P.militia(223), P.continental(224)], GRASSE = P.degrasse(230);
  const banner = (ctx, text, sub, t, t0) => { U.hand(ctx, text, 640, 112, 50, k01(t, t0 + .15, .5), { col: '#ffe14a', rot: -.03 }); if (sub) U.hand(ctx, sub, 640, 176, 26, k01(t, t0 + .5, .4)); };
  // A · the midnight escape: boats rowing through fog, Washington standing in the last one with a lantern
  const sFog = F2.shot({ cam: [[1.15, 600, 420], [1.0, 640, 380]], world: (ctx, t) => { S.sky(ctx, t, 'night', { horizon: 380 }); S.hills(ctx, 390, '#1a2238', 4, 30, { lw: 0 }); S.sea(ctx, 380, t, { col: '#1e3050', n: 40 });
      for (let b = 0; b < 3; b++) { const x = ((t - T.fog) * 50 + b * 380) % 1500 - 200, y = 500 + b * 60, s = .7 + b * .15; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ROWERS.slice(b * 2, b * 2 + 2).forEach((f, i) => f.draw(ctx, -60 + i * 110, -20, .5, t, { arms: 'hold', noShadow: true, look: .5 })); if (b === 2) WASH.draw(ctx, 140, -24, .58, t, { arms: 'side', noShadow: true, face: 'stern' }); W.durham(ctx, 40, 0, 1, t, { men: 0 }); ctx.restore(); } },
    ui: (ctx, t) => { S.fog(ctx, t, .45, 560); banner(ctx, 'A MIDNIGHT ESCAPE', 'IN THE FOG', t, T.fog); U.datePlate(ctx, 'NEW YORK · AUG 1776', k01(t, T.fog + .3, .3)); }, vig: .55 });
  // B · a winter that kills ~2,000 men — no battle
  const sWinter = F2.shot({ cam: [[1.0, 640, 380], [1.12, 640, 420]], world: (ctx, t) => { S.sky(ctx, t, 'winter', { horizon: 470 }); CK.snowGround(ctx, 470, t, 3); for (let i = 0; i < 4; i++) S.hut(ctx, 120 + i * 360, 520 + (i % 2) * 20, .8, t, { snow: true }); W.fire(ctx, 640, 690, .8, t);
      HUDDLE.forEach((f, i) => f.draw(ctx, 380 + i * 130 + (i > 1 ? 40 : 0), 720 + (i % 2) * 14, .62, t, { arms: 'cross', face: 'cold', shiver: true, breath: true, snow: true })); },
    ui: (ctx, t) => { S.snow(ctx, t, 120); banner(ctx, 'A WINTER THAT KILLS', null, t, T.win); U.count(ctx, 2000, 640, 300, 96, k01(t, T.win + .9, 1.4), { pre: '~', cap: 'MEN' }); if (t > T.noBattle) { U.hand(ctx, 'NO BATTLE', 1040, 440, 36, k01(t, T.noBattle, .4)); U.mark(ctx, 'x', 1040, 540, 46, k01(t, T.noBattle + .2, .4)); } } });
  // C · a Prussian drillmaster who can't speak English (and his greyhound)
  const sDrill = F2.shot({ cam: [[1.25, 420, 420], [1.05, 600, 400]], world: (ctx, t) => { S.sky(ctx, t, 'overcast', { horizon: 470 }); CK.snowGround(ctx, 470, t, 5); S.hut(ctx, 1050, 500, .7, t, { snow: true }); S.hut(ctx, 200, 480, .6, t, { snow: true });
      STEU.draw(ctx, 330, 690, .95, t, { arms: t > T.eng ? 'shout' : 'point', face: 'angry' }); S.greyhound(ctx, 170, 712, 1.35, t, { flip: false });
      DRILL.forEach((f, i) => f.draw(ctx, 640 + i * 150, 680 + (i % 2) * 10, .7, t, { arms: 'port', face: t > T.eng ? 'shock' : 'neutral', look: -.6 })); },
    ui: (ctx, t) => { banner(ctx, 'A PRUSSIAN DRILLMASTER', null, t, T.pru); U.shout(ctx, t > T.eng + .6 ? '#@$%&!' : 'ACHTUNG!', 470, 320, k01(t, T.pru + .4, .3), { size: 44, bg: '#ffffff', col: '#e8302a' }); for (let i = 0; i < 4; i++) U.hand(ctx, '?', 660 + i * 150, 430 - (i % 2) * 14, 40, k01(t, T.eng + .2 + i * .1, .3), { col: '#ffe14a' }); } });
  // D · a French admiral who wins the war without setting foot on the battlefield
  const sAdmiral = F2.shot({ cam: [[1.0, 640, 380], [1.3, 470, 380], [1.3, 470, 380], [1.05, 860, 360]], world: (ctx, t) => { S.sky(ctx, t, 'day', { horizon: 420, sun: [1100, 120, 40] }); S.sea(ctx, 420, t, { col: '#2a6aa8' });
      for (let i = 0; i < 6; i++) S.ship(ctx, 560 + i * 150, 470 + (i % 2) * 24, .28 + (i % 2) * .05, t, 'fr', { flip: true });
      G.Rig.shape(ctx, c => { c.moveTo(1050, 424); c.quadraticCurveTo(1200, 396, 1700, 400); c.lineTo(1700, 430); c.lineTo(1050, 430); c.closePath(); }, '#6a8a5a', { lw: 2.5 }); ctx.save(); ctx.translate(1230, 404); ctx.scale(.5, .5); for (let i = 0; i < 3; i++) S.puff(ctx, i * 60, 0, ((t * .5 + i * .3) % 1), 1); ctx.restore();
      // the quarterdeck: planks, rail, a gun, rigging
      ctx.fillStyle = '#9a7048'; ctx.fillRect(-300, 610, 1900, 400); ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 3; for (let y = 630; y < 900; y += 26) { ctx.beginPath(); ctx.moveTo(-300, y); ctx.lineTo(1600, y); ctx.stroke(); }
      G.Rig.shape(ctx, c => c.rect(-300, 560, 1900, 18), '#6a4a2a', { lw: 3 }); for (let x = -260; x < 1600; x += 60) G.Rig.shape(ctx, c => c.rect(x, 576, 10, 40), '#7a5434', { lw: 2 }); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, 560); ctx.lineTo(260, -200); ctx.moveTo(100, 560); ctx.lineTo(260, -200); ctx.stroke();
      GRASSE.draw(ctx, 470, 720, 1.05, t, { arms: 'shout', face: 'stern' }); S.cannon(ctx, 820, 700, .8, t, { flip: true }); },
    ui: (ctx, t) => { banner(ctx, 'A FRENCH ADMIRAL', null, t, T.adm); if (t > T.foot) { U.hand(ctx, 'THE BATTLEFIELD', 1040, 240, 28, k01(t, T.foot, .4)); U.arrow(ctx, 1060, 270, 1160, 360, k01(t, T.foot + .2, .3), { bend: -20 }); U.hand(ctx, 'NEVER SET FOOT THERE', 900, 160, 30, k01(t, T.foot + .9, .4), { col: '#ffd040' }); } } });
  // E · "but first, you need to get in the boat" — back at McConkey's Ferry; the crew waves you in, you step aboard
  const CREW2 = [P.militia(240), P.continental(241), P.militia(242)], YOU = O.YOU;
  const sBoat = F2.shot({ cam: [[1.25, 520, 520], [1.35, 600, 540]], world: (ctx, t) => { O.river(ctx, t); const bx = 760, by = 640; ctx.save(); ctx.translate(bx, by + Math.sin(t * 1.3) * 3); CREW2.forEach((f, i) => f.draw(ctx, 10 + i * 90, -22, .45, t, { arms: i === 1 ? 'wave' : 'side', noShadow: true, snow: true, face: 'neutral', look: -.8 })); ctx.restore(); W.durham(ctx, bx + 30, by, 1.1, t, { men: 0 });
      const u = ease.inOut(k01(t, T.first + .6, 1.6)), x = lerp(470, 690, u), y = lerp(690, 618, u); YOU.fig.draw(ctx, x, y, .48, t, { arms: 'cross', step: u > 0 && u < 1 ? Math.sin(t * 9) : 0, snow: true, breath: true, face: 'cold' }); },
    ui: (ctx, t) => { W.sleet(ctx, t, 150); U.hand(ctx, 'GET IN THE BOAT', 640, 140, 46, k01(t, T.boat, .5), { col: '#ffe14a' }); U.datePlate(ctx, 'DEC 25, 1776', 1); }, vig: .55 });
  F2.chapter({ cut: [[T.fog - .15, sFog, .15], [T.win - .1, sWinter, .2], [T.pru - .1, sDrill, .15], [T.adm - .1, sAdmiral, .15], [T.first - .1, sBoat, .25]],
    sfx: [{ t: T.fog, type: 'impact', gain: .35 }, { t: T.fog + .4, type: 'splash2', gain: .25 }, { t: T.win, type: 'impact', gain: .35 }, { t: T.win + .9, type: 'riser', gain: .2 }, { t: T.noBattle + .2, type: 'stamp', gain: .5 }, { t: T.pru, type: 'impact', gain: .35 }, { t: T.pru + .4, type: 'slap', gain: .4 }, { t: T.eng + .6, type: 'boo', gain: .2 }, { t: T.adm, type: 'impact', gain: .35 }, { t: T.adm + .5, type: 'cannon', gain: .25 }, { t: T.foot + .9, type: 'pop', gain: .3 }, { t: T.first + .6, type: 'crunch', gain: .3 }, { t: T.boat, type: 'splash2', gain: .3 }],
    moods: [{ t: T.fog - .2, mood: 'tense' }, { t: T.first, mood: 'still' }],
    amb: [{ t0: T.fog - .15, type: 'river' }, { t0: T.win - .1, type: 'snowwind' }, { t0: T.adm - .1, type: 'sea' }, { t0: T.first - .1, type: 'river' }] });
})(window);
