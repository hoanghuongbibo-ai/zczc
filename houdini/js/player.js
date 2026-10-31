/* Player: loads the supplied art, then syncs the canvas to narration + score.
 * ?t=5 renders one still; window.renderAt / renderSoundtrack serve the exporter. */
(function (G) {
  'use strict';
  const T = G.Toon;
  G.startPlayer = async function (show) {
    const canvas = document.getElementById('stage'), ctx = canvas.getContext('2d');
    const RS = G.RENDER_SCALE || 1; canvas.width = Math.round(T.W * RS); canvas.height = Math.round(T.H * RS);
    // RENDER_SCALE (e.g. 1.5 → 1920×1080): every drawing call still works in 1280×720 units; the main context's transforms are premultiplied
    // by the scale (identity resets included) and getTransform reports unscaled matrices, so offscreen 1280×720 layers keep lining up
    if (RS !== 1) { G.__RS = RS; T.scaleCtx(ctx, RS); ctx.setTransform(1, 0, 0, 1, 0, 0); }
    const btn = document.getElementById('play'), time = document.getElementById('time');
    await T.loadImages(show.images || {});
    await Promise.all((show.fonts || []).map(f => document.fonts.load(f)));
    const draw = t => T.renderFrame(ctx, show.shots, Math.min(t, show.duration - 1e-3));
    const soundOpts = () => ({ duration: show.duration, sfx: show.sfx, moods: show.moods, amb: show.amb });
    G.renderAt = t => { draw(t); return true; };
    G.renderSoundtrack = () => {
      const buf = G.Soundtrack.render(soundOpts()), i16 = new Int16Array(buf.length);
      for (let i = 0; i < buf.length; i++) i16[i] = Math.max(-1, Math.min(1, buf[i])) * 32767;
      let s = ''; const u8 = new Uint8Array(i16.buffer);
      for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
      return btoa(s);
    };
    G.READY = true;
    const q = new URLSearchParams(location.search);
    if (q.has('t')) { draw(parseFloat(q.get('t'))); btn.style.display = 'none'; return; }

    const narration = new Audio(show.narration);
    let actx = null, music = null, src = null, t0 = 0, playing = false, offset = 0;
    const now = () => playing ? actx.currentTime - t0 : offset;
    function play() {
      if (!actx) {
        actx = new (G.AudioContext || G.webkitAudioContext)();
        const data = G.Soundtrack.render(soundOpts());
        music = actx.createBuffer(1, data.length, G.Soundtrack.SR); music.copyToChannel(data, 0);
      }
      if (offset >= show.duration) offset = 0;
      src = actx.createBufferSource(); src.buffer = music; src.connect(actx.destination); src.start(0, offset);
      narration.currentTime = offset; narration.play();
      t0 = actx.currentTime - offset; playing = true; btn.textContent = '❚❚ Pause';
    }
    function pause() { offset = now(); playing = false; src.stop(); narration.pause(); btn.textContent = '▶ Play'; }
    btn.onclick = () => (playing ? pause() : play());
    (function loop() {
      const t = now();
      if (playing && t >= show.duration) { pause(); offset = show.duration; }
      draw(t); time.textContent = `${t.toFixed(1)}s / ${show.duration}s`;
      requestAnimationFrame(loop);
    })();
  };
})(window);
