/* ~12 s demo: the talking host + animated icons + modern chart motion, using numbers from the funeral-homes script.
 * The voice is a temporary placeholder (a clip of the history-channel narration) only to show the lip sync. */
(function (G) {
  'use strict';
  const T = G.Toon, H = G.Host, I = G.Icons, Ch = G.Charts;
  const { W, clamp, lerp, ease, grad } = T;
  const INK = '#1f1c1a', HAND = (w, px) => `${w} ${px}px Caveat, "Patrick Hand", cursive`;
  const txt = (ctx, s, x, y, font, color = INK, align = 'center', a = 1) => { ctx.save(); ctx.globalAlpha = clamp(a); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const bright = ctx => { ctx.fillStyle = grad(ctx, 0, 0, 0, 720, [[0, '#dff1ff'], [1, '#fef9ef']]); ctx.fillRect(0, 0, W, 720); ctx.fillStyle = '#ffe9b8'; ctx.beginPath(); ctx.ellipse(640, 690, 900, 90, 0, 0, 7); ctx.fill(); };
  const white = ctx => { ctx.fillStyle = '#fffdf8'; ctx.fillRect(0, 0, W, 720); };
  const host = (ctx, x, y, s, t, keys, face, extra = {}) => H.draw(ctx, x, y, s, Object.assign({ t, pose: H.pose(t, keys), talk: H.talk(t), face }, extra));

  function a(ctx, lt, dur, t) { // host intro: talking, gesturing, money icons pop in around him
    bright(ctx);
    const face = { mouth: 'flat', brows: lt > 2.4 ? 'up' : 'neutral', look: [.3, 0] };
    host(ctx, 400, 680, 1.25, t, [[0, 'idle'], [.4, 'present'], [2.3, 'presentBoth'], [3.4, 'pointUp']], face);
    [['moneyBag', 820, 220, 1.0], ['piggy', 1060, 300, 1.5], ['coins', 860, 470, 2.0], ['barsUp', 1100, 540, 2.6]].forEach(([n, x, y, t0]) => I.pop(ctx, n, x, y, 150, lt - t0));
  }
  function b(ctx, lt, dur, t) { // grouped bars: SCI vs other funeral homes (2017 FCA/CFA price survey, medians)
    white(ctx);
    Ch.compare(ctx, { x: 90, y: 620, w: 820, h: 360, lt, title: 'Median prices, 2017 survey', names: ['SCI homes', 'Other homes'], colors: ['#d64535', '#3b7dd8'], fmt: v => '$' + Math.round(v).toLocaleString('en-US'),
      groups: [{ label: 'Simple cremation', a: 2700, b: 1562 }, { label: 'Simple burial', a: 2845, b: 1893 }, { label: 'Full funeral', a: 7705, b: 5241 }] });
    Ch.callout(ctx, { x: 420, y: 96, tx: 700, ty: 200, text: '47–72% higher', lt: lt - 2.6, color: '#f4c93c' });
    host(ctx, 1110, 690, .95, t, [[0, 'idle'], [.3, 'pointSideL'], [2.6, 'shrug']], { mouth: 'flat', brows: lt > 2.6 ? 'skeptic' : 'neutral', look: [-.6, 0], eyes: lt > 2.6 ? 'side' : 'open' }, { mirror: false });
  }
  function c(ctx, lt, dur, t) { // donut + counter, then a cost breakdown in horizontal bars
    white(ctx);
    Ch.donut(ctx, { x: 290, y: 330, r: 170, lt, slices: [{ value: 63, color: '#f29b38', label: 'cremation', pop: true }, { value: 37, color: '#c4c8ce' }], centre: { value: 63, suffix: '%', color: INK } });
    txt(ctx, 'Americans choosing cremation, 2025', 290, 600, HAND(700, 34), INK, 'center', clamp(lt / .4));
    Ch.hbars(ctx, { x: 520, y: 150, w: 640, rowH: 70, lt: lt - .6, fmt: v => '$' + Math.round(v).toLocaleString('en-US'), labelW: 250,
      data: [{ label: 'Basic services fee', value: 2495, color: '#3b7dd8' }, { label: 'Metal casket', value: 2500, color: '#3a9b4f' }, { label: 'Embalming', value: 845, color: '#f4c93c' }, { label: 'Burial vault', value: 1695, color: '#d64535' }] });
    txt(ctx, 'Where a typical funeral bill goes (NFDA)', 880, 110, HAND(700, 34), INK, 'center', clamp((lt - .5) / .4));
    host(ctx, 1190, 712, .56, t, [[0, 'think'], [2.6, 'thumbsUp']], { mouth: 'flat', brows: 'neutral', look: [-.5, -.2] });
  }
  const shots = [[0, 4.2, a], [4.2, 8.6, b], [8.6, 12.6, c]].map(([start, end, draw]) => ({ start, end, draw }));
  G.Show = { duration: 12.6, narration: '../biz/assets/audio/test-voice.mp3', shots,
    sfx: [1.0, 1.5, 2.0, 2.6].map(t => ({ t, type: 'click', gain: .5 })).concat([{ t: 4.2, type: 'whoosh', gain: .4 }, { t: 6.8, type: 'thud', gain: .4 }, { t: 8.6, type: 'whoosh', gain: .4 }]),
    moods: [{ t: 0, mood: 'still' }], images: {}, fonts: ['700 40px Caveat', '40px "Patrick Hand"'] };
})(window);
