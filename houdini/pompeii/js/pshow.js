/* Show builder for the Pompeii video: shots are cut on word anchors (window.TP); each shot lasts until the next cut. */
(function (G) {
  'use strict';
  const PK = G.PK;
  const S = G.PS = { cuts: [], sfx: [], moods: [], overlays: [] };
  const tt = k => typeof k === 'number' ? k : PK.A(k);
  S.cut = (k, draw, off = 0) => S.cuts.push({ start: tt(k) + off, draw });
  S.fx = (k, type, off = 0, gain) => S.sfx.push({ type, t: tt(k) + off, gain });
  S.mood = (k, mood, off = 0) => S.moods.push({ t: tt(k) + off, mood });
  S.over = (a, b, draw, oa = 0, ob = 0) => S.overlays.push({ start: tt(a) + oa, end: tt(b) + ob, draw });
  S.build = () => {
    const dur = G.TP.end, cuts = S.cuts.slice().sort((a, b) => a.start - b.start);
    const shots = cuts.map((c, i) => ({ start: c.start, end: i + 1 < cuts.length ? cuts[i + 1].start : dur, draw: c.draw }));
    if (shots.length) shots[0].start = 0;
    G.Show = { duration: dur, narration: 'assets/audio/narration.mp3', shots, sfx: S.sfx.sort((a, b) => a.t - b.t), moods: S.moods, overlays: S.overlays };
    return G.Show;
  };
  // camera: zoom z around focus (fx, fy) in logical coordinates
  S.cam = (ctx, z, fx, fy, rot = 0) => { ctx.translate(PK.W / 2, PK.H / 2); if (rot) ctx.rotate(rot); ctx.scale(z, z); ctx.translate(-fx, -fy); };
})(window);
