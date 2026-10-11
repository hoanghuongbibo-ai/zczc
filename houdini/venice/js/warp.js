/* Re-time a finished show onto a new take of the narration without touching its shots:
 * pairs = [[oldT, newT], ...] word matches (monotonic). Frames at new time t are drawn at the old time warp(t),
 * so every beat stays on its word; sfx and mood cues are moved to the new times. */
(function (G) {
  'use strict';
  function interp(p, x, from, to) {
    if (x <= p[0][from]) return p[0][to] + (x - p[0][from]);
    for (let i = 0; i < p.length - 1; i++) if (x < p[i + 1][from]) { const a = p[i], b = p[i + 1]; return a[to] + (x - a[from]) * (b[to] - a[to]) / (b[from] - a[from]); }
    const l = p[p.length - 1]; return l[to] + (x - l[from]);
  }
  G.warpShow = function (show, pairs, narration, duration) {
    const toOld = t => interp(pairs, t, 1, 0), toNew = t => interp(pairs, t, 0, 1);
    const shots = show.shots.map(s => ({ start: Math.max(0, toNew(s.start)), end: Math.min(duration, toNew(s.end)),
      draw: (ctx, lt, dur, t) => { const to = toOld(t); s.draw(ctx, to - s.start, s.end - s.start, to); } }));
    shots[shots.length - 1].end = duration;
    return Object.assign({}, show, { duration, narration, shots,
      sfx: show.sfx.map(c => Object.assign({}, c, { t: toNew(c.t) })), moods: show.moods.map(c => Object.assign({}, c, { t: Math.max(0, toNew(c.t)) })) });
  };
})(window);
