/* "It's About Salt" remake — shared helpers for the shot files (s0–s4).
 *   P(g, who, x, y, s, t, o)       a cast member (feet at x,y)
 *   head(g, who, hx, hy, s, t, o)   place a character by its HEAD centre (for close-ups: s 1.6–3)
 *   SFX(n, k, type, gain, dur)      sound cue at word k of line n (k null = line start); type = a foley name (see salt2/foley)
 *   AMB(n, type, dur, gain)         ambience bed (rain, wind, fire, crowd, sea, birds, night, court, street, factory)
 *   say(t)                          lip-sync from the narration (skits)
 *   PAL                             scene palettes */
(function (G) {
  'use strict';
  const EP = G.EP, K = G.VK;
  G.P = (g, who, x, y, s, t, o = {}) => K.fig(g, x, y, s, EP.cast(who, Object.assign({ t }, o)));
  G.head = (g, who, hx, hy, s, t, o = {}) => G.P(g, who, hx, hy + 490 * s, s, t, o);
  const CUES = G.CUES = [];
  G.SFX = (n, k, type, gain = 1, dur, off = 0) => CUES.push({ t: G.C.t(n, k) + off, type, gain, dur });
  G.SFXat = (t, type, gain = 1, dur) => CUES.push({ t, type, gain, dur });
  G.AMB = (n, type, dur, gain = 1, off = 0) => CUES.push({ t: G.C.t(n, null) + off, type: 'amb_' + type, gain, dur });
  G.say = t => G.Guide.say(t);
  G.L = n => G.TV['L' + n];
})(window);
(function (G) { const EP = G.EP; EP.shaker = (ctx, x, y, s, t, o = {}) => G.shaker(ctx, x, y, s, Object.assign({ t }, o)); })(window);
