/* assemble the remake: the shot list (with transitions), the SALT COUNTER overlay, music moods, colour grade */
(function (G) {
  'use strict';
  G.Guide.straight = true;
  const DUR = 886, EP = G.EP, shots = G.SALT2.build(DUR);
  for (const s of shots) { const d = s.draw; s.draw = (ctx, lt, dur, t) => { d(ctx, lt, dur, t); if (EP.drawCounter) EP.drawCounter(ctx, t); }; }
  G.TOON_FINISH = { grain: .018, vignette: .28 };
  const buf = document.createElement('canvas'), bl = document.createElement('canvas'); buf.width = 1280; buf.height = 720; bl.width = 320; bl.height = 180;
  const bg = buf.getContext('2d'), blg = bl.getContext('2d');
  G.TOON_POST = (ctx) => {
    bg.filter = 'saturate(1.18) contrast(1.06) brightness(1.03)'; bg.clearRect(0, 0, 1280, 720); bg.drawImage(ctx.canvas, 0, 0); ctx.drawImage(buf, 0, 0);
    blg.filter = 'brightness(1.25) contrast(1.6) blur(6px)'; blg.clearRect(0, 0, 320, 180); blg.drawImage(ctx.canvas, 0, 0, 320, 180);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .12; ctx.drawImage(bl, 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .14; ctx.drawImage(G.Paint2.canvasTex(), 0, 0);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; };
  G.Show = { duration: DUR, narration: '../salt/assets/audio/narration.mp3', shots, sfx: [], moods: EP.moods.slice().sort((a, b) => a.t - b.t), images: {}, cues: G.CUES,
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '46px "Luckiest Guy"', '40px "Permanent Marker"', '30px "Patrick Hand"'] };
})(window);
