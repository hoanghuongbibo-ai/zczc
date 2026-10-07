/* Part 5 cast — original designs in the house style: Arthur Ford (the medium who delivered the code)
 * and George Hardeen (Houdini's grandnephew, 2007). Uses the face builder from js/cast3.js. */
(function (G) {
  'use strict';
  const C = G.Chars, { part, stroke, smooth } = C, face = C.castFace, browSet = C.browSet;
  const O = [266, 1461], L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);
  // Arthur Ford: slicked-back dark hair with a high shine, thin moustache, heavy-lidded "medium" eyes.
  function ford(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eeb38c', ear: [364, 326], lids: true,
      face: [[184, 210], [320, 202], [350, 258], [356, 340], [328, 414], [284, 446], [238, 450], [206, 434], [186, 398], [172, 334], [170, 270]],
      hair: c => { part(c, smooth(L([[168, 290], [166, 206], [224, 162], [310, 158], [362, 200], [364, 290], [340, 228], [262, 204], [196, 228]])), '#1f1a18'); stroke(c, L([[214, 186], [300, 176]]), 4, 'rgba(255,255,255,.35)'); },
      eyes: [[222, 302, 19, 19], [294, 306, 20, 20]], pupil: 7,
      brows: browSet([[200, 270], [222, 262], [244, 270]], [[272, 274], [294, 266], [316, 274]]), browW: 7,
      nose: [[256, 312], [244, 354], [264, 360]],
      mouth: [258, 408, 16],
      front: c => stroke(c, L([[224, 384], [258, 378], [292, 384]]), 6, '#1f1a18'),
    });
  }
  // George Hardeen: a modern man in his fifties — short grey hair, rectangular glasses.
  function hardeen(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eab08a', ear: [364, 326],
      face: [[182, 208], [322, 200], [352, 258], [358, 340], [330, 414], [286, 448], [238, 452], [204, 436], [184, 398], [170, 334], [168, 270]],
      hair: c => part(c, smooth(L([[172, 284], [170, 214], [220, 176], [304, 172], [358, 210], [360, 284], [340, 236], [266, 218], [196, 236]])), '#a8a49c'),
      eyes: [[222, 302, 18, 18], [294, 306, 19, 19]], pupil: 7,
      brows: browSet([[200, 272], [222, 264], [244, 272]], [[272, 276], [294, 268], [316, 276]]), browW: 8, browC: '#6a665e',
      nose: [[256, 312], [244, 354], [264, 360]],
      mouth: [258, 408, 18],
      front: c => { for (const [x, y] of [[222, 302], [294, 306]]) part(c, c2 => c2.roundRect(x - 26 - O[0], y - 18 - O[1], 52, 36, 6), null, 3.5); stroke(c, L([[248, 302], [268, 302]]), 3.5); },
    });
  }
  Object.assign(C.HEADS, { ford, hardeen });
})(window);
