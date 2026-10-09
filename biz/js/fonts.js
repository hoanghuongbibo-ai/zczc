/* Channel typefaces. Load before charts.js / kit.js. Pages pick a set with window.BIZ_FONT before this script:
 *   'clean'   (default from now on) — Fredoka (rounded display, eye-catching) for titles, numbers and labels;
 *             Nunito (very readable) for small print, sources and body lines. Both OFL, in assets/fonts/.
 *   'classic' — the hand-lettered Caveat + Patrick Hand used in the first housing video.
 * Sizes are tuned so existing layouts written for Caveat px sizes still fit (Fredoka is wider per px). */
(function (G) {
  'use strict';
  const set = G.BIZ_FONT || 'clean';
  const SETS = {
    clean: { HAND: (w, px) => `${w >= 700 ? 600 : 500} ${Math.round(px * .8)}px Fredoka, Nunito, sans-serif`, PRINT: px => `700 ${Math.round(px * .86)}px Nunito, Fredoka, sans-serif`,
      load: ['600 40px Fredoka', '500 40px Fredoka', '700 40px Nunito'] },
    classic: { HAND: (w, px) => `${w} ${px}px Caveat, "Patrick Hand", cursive`, PRINT: px => `${px}px "Patrick Hand", Caveat, cursive`,
      load: ['700 40px Caveat', '40px "Patrick Hand"'] },
  };
  G.BizFont = Object.assign({ name: set }, SETS[set] || SETS.clean);
})(window);
