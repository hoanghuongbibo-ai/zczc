/* Cast sheet for approval: "You" (lead, 16) in poses/expressions + the period extras. */
(function (G) {
  'use strict';
  const K = G.Kit, C = G.Cast, T = G.Toon;
  G.TOON_FINISH = { grain: .02, vignette: 0 };
  function sheet(ctx, lt) {
    ctx.fillStyle = '#efe4c8'; ctx.fillRect(0, 0, 1280, 720);
    K.txt(ctx, 'CAST — THE AMERICAN REVOLUTION', 640, 40, K.DISPLAY(34), '#fff', 'center', 1, { stroke: 7 });
    T.line(ctx, [[30, 380], [1250, 380]], 2, 'rgba(0,0,0,.2)');
    const you = [
      [{ face: { eyes: 'dot', brows: 'neutral', mouth: 'flat' }, armR: 'musket', musket: 'shoulder' }, 'YOU (16)'],
      [{ face: { eyes: 'squint', brows: 'worried', mouth: 'grit' }, armR: 'hug', armL: 'hug', shiver: true, shiverMarks: true, snow: .8, frost: .45 }, 'COLD'],
      [{ face: { eyes: 'shock', brows: 'up', mouth: 'o', sweat: true } }, 'SHOCK'],
      [{ face: { eyes: 'tired', brows: 'sad', mouth: 'frown' }, blanket: true }, 'TIRED'],
      [{ face: { eyes: 'closed', brows: 'up', mouth: 'smile' }, armR: 'up' }, 'WIN'],
      [{ face: { eyes: 'dot', brows: 'angry', mouth: 'flat' }, musket: 'ready', armR: [30, 10, 10, 30], armL: [30, 26, -50, 6] }, 'READY'],
    ];
    you.forEach(([o, name], i) => { const x = 120 + i * 205; C.person(ctx, x, 345, .9, Object.assign({ costume: 'you', t: lt }, o)); K.label(ctx, name, x, 370, 1, { size: 20 }); });
    const extras = [['continental', 'CONTINENTAL'], ['militia', 'MILITIA'], ['redcoat', 'REDCOAT'], ['grenadier', 'GRENADIER'], ['hessian', 'HESSIAN'], ['civilian', 'CIVILIAN']];
    extras.forEach(([c, name], i) => { const x = 120 + i * 205; C.person(ctx, x, 680, .82, { costume: c, t: lt, musket: c === 'civilian' ? null : 'shoulder', bayonet: c !== 'militia', face: { eyes: 'dot', brows: c === 'hessian' || c === 'grenadier' ? 'angry' : 'neutral', mouth: 'flat' } }); K.label(ctx, name, x, 700, 1, { size: 18 }); });
  }
  G.Show = { duration: 2, narration: null, images: {}, fonts: ['30px "Luckiest Guy"', '30px "Permanent Marker"', '700 20px Fredoka'],
    shots: [{ start: 0, end: 2, draw: (ctx, lt) => sheet(ctx, lt) }], sfx: [], moods: [] };
})(window);
