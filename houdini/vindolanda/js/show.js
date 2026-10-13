/* assembles the episode: shots sorted by their anchor time, each running until the next one starts */
(function (G) {
  'use strict';
  const EP = G.EP, DUR = 791.2, list = EP.shots.slice().sort((a, b) => a.t - b.t);
  const shots = list.map((s, i) => { const start = s.t, end = (list[i + 1] || { t: DUR }).t, R = k => G.TV[k] - start;
    return { start, end, draw: (ctx, lt, dur, t) => s.fn(ctx, lt, dur, t, R) }; });
  G.TOON_FINISH = { grain: .022, vignette: .4 };
  G.Show = { duration: DUR, narration: 'assets/audio/narration.mp3', shots, sfx: EP.sfx, moods: EP.moods.slice().sort((a, b) => a.t - b.t), images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '500 26px Fredoka', '46px "Luckiest Guy"'] };
})(window);
