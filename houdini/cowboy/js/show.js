/* assembles the episode: shots sorted by their anchor time, each running until the next one starts */
(function (G) {
  'use strict';
  const EP = G.EP, DUR = 784.6, list = EP.shots.slice().sort((a, b) => a.t - b.t);
  const shots = list.map((s, i) => { const start = s.t, end = (list[i + 1] || { t: DUR }).t, R = k => G.TV[k] - start;
    return { start, end, draw: (ctx, lt, dur, t) => s.fn(ctx, lt, dur, t, R) }; });
  G.TOON_FINISH = { grain: .02, vignette: .32 };
  // colour grade: a touch more saturation + contrast, warm soft-light toning, and a soft bloom on the highlights
  const buf = document.createElement('canvas'), bl = document.createElement('canvas'); buf.width = 1280; buf.height = 720; bl.width = 320; bl.height = 180;
  const bg = buf.getContext('2d'), blg = bl.getContext('2d');
  G.TOON_POST = (ctx) => {
    bg.filter = 'saturate(1.24) contrast(1.1) brightness(1.03)'; bg.clearRect(0, 0, 1280, 720); bg.drawImage(ctx.canvas, 0, 0); ctx.drawImage(buf, 0, 0);
    blg.filter = 'brightness(1.25) contrast(1.6) blur(6px)'; blg.clearRect(0, 0, 320, 180); blg.drawImage(ctx.canvas, 0, 0, 320, 180);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .14; ctx.drawImage(bl, 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .12; ctx.fillStyle = '#ffb46a'; ctx.fillRect(0, 0, 1280, 720);
    // painterly canvas: brush strokes + paper tooth over everything (characters included), like the repainted references
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .2; ctx.drawImage(G.Paint2.canvasTex(), 0, 0);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  };
  G.Show = { duration: DUR, narration: 'assets/audio/narration.mp3', shots, sfx: EP.sfx, moods: EP.moods.slice().sort((a, b) => a.t - b.t), images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '500 26px Fredoka', '46px "Luckiest Guy"'] };
})(window);
