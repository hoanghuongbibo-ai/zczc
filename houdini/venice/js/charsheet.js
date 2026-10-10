(function (G) {
  const T = G.Toon, FX = G.FX;
  const cast = [['chronicler', 'habit'], ['cassiodorus', 'roman'], ['fisher', 'tunicPoor'], ['elder', 'tunicElder'], ['villagerW', 'dressPlain'], ['pepin', 'king']];
  G.Show = { duration: 2, narration: 'venice/assets/audio/narration-job-one.mp3', sfx: [], moods: [], fonts: ['700 20px Fredoka', '40px "Luckiest Guy"'],
    shots: [{ start: 0, end: 2, draw(ctx) { FX.darkBg(ctx, '#3a342e');
      cast.forEach(([h, o], i) => { FX.fig(ctx, 110 + i * 212, 690, .4, { head: h, outfit: o, hands: { L: [-150, -470], R: [150, -470] }, feet: { L: [-60, -40], R: [60, -40] }, face: { mouth: 'smile', brows: 'calm' } });
        ctx.fillStyle = '#fff'; ctx.font = '700 20px Fredoka'; ctx.textAlign = 'center'; ctx.fillText(h, 110 + i * 212, 40); });
      FX.fig(ctx, 1180, 690, .4, { head: 'fisher', outfit: 'tunicPoor', hands: { L: [-150, -470], R: [150, -470] } }, { tint: '#2a2420' }); } }] };
})(window);
