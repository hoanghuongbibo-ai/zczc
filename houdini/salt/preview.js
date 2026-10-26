/* salt — set + cast preview frames (before the voice-over arrives). Rendered with tools/_thumbs.mjs. */
(function (G) {
  const TS = G.TS, EP = G.EP, { W, H } = G.Toon;
  const fig = (g, who, x, y, s, o) => G.VK.fig(g, x, y, s, EP.cast(who, Object.assign({ t: 3 }, o)));
  const S = [
    g => { TS.highway(g, 3.2, { drive: .25 }); },
    g => { TS.kitchen(g, 3, { sh: { turn: 1, face: 'smug' } }); },
    g => { TS.hallstatt(g, 6); },
    g => { TS.hallstatt(g, 2); fig(g, 'miner', 330, 760, .85, { pose: 'present', turn: .3, face: { mouth: 'smile' } }); fig(g, 'miner2', 950, 760, .85, { turn: -.3, face: { mouth: 'o', brows: 'up' } }); },
  ];
  window.THUMB_N = S.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); S[i](g); return c.toDataURL('image/png'); };
})(window);
