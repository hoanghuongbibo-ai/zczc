/* Page player for the Pompeii series: 1920×1080 canvas, logical 1280×720 drawing (PK.SS), narration + score.
 * ?t=5 renders one still; window.renderAt / Show.sfx / Show.moods serve the exporter (audio is mixed in Node). */
(function (G) {
  'use strict';
  G.startPlayer = async function (show) {
    const PK = G.PK, canvas = document.getElementById('stage'), ctx = canvas.getContext('2d');
    canvas.width = PK.W * PK.SS; canvas.height = PK.H * PK.SS;
    const btn = document.getElementById('play'), time = document.getElementById('time');
    await Promise.all(['600 20px Fredoka', '700 20px Fredoka', '500 20px Fredoka', '20px "Luckiest Guy"', '700 20px Caveat'].map(f => document.fonts.load(f)));
    if (show.prepare) show.prepare();
    const draw = t => PK.renderFrame(ctx, show.shots, Math.min(t, show.duration - 1e-3));
    G.renderAt = t => { draw(t); return true; };
    G.READY = true;
    const q = new URLSearchParams(location.search);
    if (q.has('t')) { draw(parseFloat(q.get('t'))); if (btn) btn.style.display = 'none'; return; }
    const narration = new Audio(show.narration);
    let actx = null, music = null, src = null, t0 = 0, playing = false, offset = +(q.get('from') || 0);
    const now = () => playing ? actx.currentTime - t0 : offset;
    function play() {
      if (!actx) {
        actx = new (G.AudioContext || G.webkitAudioContext)();
        const data = G.PSound.render({ duration: show.duration, sfx: show.sfx, moods: show.moods });
        music = actx.createBuffer(1, data.length, G.PSound.SR); music.copyToChannel(data, 0);
      }
      if (offset >= show.duration) offset = 0;
      src = actx.createBufferSource(); src.buffer = music; src.connect(actx.destination); src.start(0, offset);
      narration.currentTime = offset; narration.play();
      t0 = actx.currentTime - offset; playing = true; btn.textContent = '❚❚ Pause';
    }
    function pause() { offset = now(); playing = false; src.stop(); narration.pause(); btn.textContent = '▶ Play'; }
    btn.onclick = () => (playing ? pause() : play());
    (function loop() { const t = now(); if (playing && t >= show.duration) { pause(); offset = show.duration; } draw(t); time.textContent = `${t.toFixed(1)}s / ${show.duration}s`; requestAnimationFrame(loop); })();
  };
})(window);
