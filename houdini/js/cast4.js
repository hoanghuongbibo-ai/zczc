/* Part 4 cast — original designs in the house style: Rose Mackenberg (undercover investigator),
 * Rahman Bey (the "trance" performer), Bess Houdini, and a McGill student. Uses the face builder from js/cast3.js. */
(function (G) {
  'use strict';
  const C = G.Chars, { part, stroke, smooth, poly, rot, limb } = C, face = C.castFace, browSet = C.browSet;
  const O = [266, 1461], L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);

  // Rose Mackenberg: sharp-eyed, dark bob under a plain cloche, round glasses she uses as part of her disguises.
  function rose(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f2c19e', ear: [362, 334],
      face: [[186, 218], [318, 210], [348, 268], [352, 344], [324, 412], [280, 442], [238, 446], [206, 432], [186, 396], [174, 336], [172, 276]],
      hair: c => { part(c, smooth(L([[160, 370], [156, 290], [176, 260], [190, 340], [186, 380]])), '#2a1e18'); part(c, smooth(L([[356, 376], [362, 290], [344, 262], [336, 340], [340, 386]])), '#2a1e18');
        part(c, smooth(L([[148, 276], [170, 176], [262, 140], [358, 176], [378, 276], [330, 254], [262, 244], [190, 256]])), '#4a5a6a'); stroke(c, L([[158, 258], [372, 258]]), 8, '#2a3440'); },
      eyes: [[222, 308, 19, 20], [292, 312, 20, 21]], pupil: 7,
      brows: browSet([[202, 278], [222, 270], [242, 278]], [[272, 282], [292, 274], [312, 282]]), browW: 6, browC: '#2a1e18',
      nose: [[258, 320], [250, 354], [264, 358]],
      mouth: [258, 398, 15], lip: '#a8404a',
      front: c => { for (const [x, y] of [[222, 308], [292, 312]]) part(c, c2 => c2.arc(x - O[0], y - O[1], 27, 0, Math.PI * 2), null, 3.5); stroke(c, L([[249, 308], [265, 308]]), 3.5); },
    });
  }
  // Rahman Bey: a stage "fakir" — wrapped turban with a jewel, dark beard, calm half-closed eyes.
  function bey(ctx, f = {}) {
    face(ctx, f, {
      skin: '#c98a5e', ear: [364, 326], lids: true,
      face: [[182, 214], [322, 206], [352, 262], [358, 340], [330, 412], [286, 446], [238, 450], [204, 434], [184, 398], [170, 334], [168, 272]],
      hair: c => { part(c, smooth(L([[176, 380], [190, 456], [240, 506], [292, 506], [342, 454], [354, 380], [320, 420], [266, 432], [212, 420]])), '#1f1a18');
        part(c, smooth(L([[146, 272], [150, 186], [212, 130], [300, 120], [370, 160], [392, 250], [380, 282], [330, 246], [266, 238], [196, 250]])), '#efe6d0');
        for (const y of [168, 204, 236]) stroke(c, L([[170, y + 30], [266, y - 6], [380, y + 24]]), 3, 'rgba(29,26,23,.3)');
        part(c, c2 => c2.arc(266 - O[0], 214 - O[1], 15, 0, Math.PI * 2), '#c0303e', 3.5); },
      eyes: [[222, 304, 19, 20], [294, 308, 20, 21]], pupil: 7,
      brows: browSet([[200, 272], [222, 264], [244, 272]], [[272, 276], [294, 268], [316, 276]]), browW: 9,
      nose: [[256, 314], [242, 356], [264, 362]],
      mouth: [258, 404, 16],
      front: c => part(c, smooth(L([[214, 384], [258, 372], [302, 384], [288, 398], [258, 392], [228, 398]])), '#1f1a18', 4),
    });
  }
  // Bess Houdini: petite, dark curly bob, big expressive eyes, a small cupid-bow mouth.
  function bess(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f3c4a2', ear: [360, 334], cheek: [[214, 362], [310, 366]],
      face: [[188, 222], [316, 214], [346, 270], [350, 344], [322, 410], [280, 438], [240, 442], [208, 428], [188, 394], [176, 336], [174, 278]],
      hair: c => { for (const [x, y, r] of [[170, 300, 34], [176, 240, 38], [214, 196, 40], [266, 182, 42], [318, 196, 40], [356, 240, 38], [362, 300, 34], [168, 356, 28], [364, 356, 28]]) part(c, c2 => c2.arc(x - O[0], y - O[1], r, 0, Math.PI * 2), '#2a1a16', 4);
        part(c, smooth(L([[190, 262], [230, 226], [300, 222], [340, 260], [300, 246], [236, 248]])), '#2a1a16', 0); },
      eyes: [[224, 310, 22, 23], [292, 314, 23, 24]], pupil: 8,
      brows: browSet([[204, 274], [224, 266], [244, 274]], [[274, 278], [292, 270], [312, 278]]), browW: 6, browC: '#2a1a16',
      nose: [[258, 322], [252, 350], [264, 354]],
      mouth: [258, 394, 13], lip: '#b8303e',
    });
  }
  // A second McGill student: sandy hair, freckles.
  function student(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f2bf98', ear: [362, 328], cheek: [[214, 364], [310, 366]],
      face: [[186, 212], [320, 204], [350, 262], [354, 340], [326, 414], [282, 446], [238, 450], [206, 434], [186, 398], [172, 334], [170, 272]],
      hair: c => part(c, smooth(L([[168, 296], [166, 220], [214, 176], [300, 170], [356, 208], [362, 292], [338, 238], [282, 226], [246, 250], [222, 228], [190, 258]])), '#c89a5a'),
      eyes: [[222, 304, 19, 20], [292, 308, 20, 21]], pupil: 7,
      brows: browSet([[202, 274], [222, 268], [242, 274]], [[272, 278], [292, 272], [312, 278]]), browW: 6, browC: '#8a6a3a',
      nose: [[258, 318], [248, 352], [264, 356]],
      mouth: [258, 402, 18],
    });
  }
  Object.assign(C.HEADS, { rose, bey, bess, student });

  const legsPair = (ctx, J, cloth, shoe, w1, w2) => {
    for (const [hip, knee, ank] of [[C.SK.hipL, J.kneeL, J.ankL], [C.SK.hipR, J.kneeR, J.ankR]]) {
      part(ctx, limb(hip, knee, w1, w2 + 6), cloth); part(ctx, limb(knee, ank, w2 + 6, w2), cloth);
      if (shoe) part(ctx, smooth([[ank[0] - 44, ank[1] + 6], [ank[0] + 38, ank[1] + 2], [ank[0] + 52, ank[1] + 38], [ank[0] - 52, ank[1] + 42]]), shoe);
    }
  };
  const arms = (ctx, J, hs, sleeve, skin, w = 62, cuff) => {
    for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]), cx = Math.cos(dir), cy = Math.sin(dir);
      part(ctx, limb(sh, el, w, w - 8), sleeve); part(ctx, limb(el, [wr[0] - cx * 8, wr[1] - cy * 8], w - 8, w - 16), sleeve);
      if (cuff) part(ctx, limb([wr[0] - cx * 8, wr[1] - cy * 8], [wr[0] + cx * 2, wr[1] + cy * 2], w - 20, w - 20), cuff, 4);
      C.hand(ctx, [wr[0] + cx * 4, wr[1] + cy * 4], dir, hs[side] || 'open', skin, .95);
    }
  };
  const neck = (skin, w = 66) => (c, J) => part(c, limb(rot([0, -1012], J.P, J.lean), rot([0, -962], J.P, J.lean), w, w + 4), skin);
  const body = (J, top, hem, wTop, wHem) => { const R = p => rot(p, J.P, J.lean);
    return c => { c.moveTo(...R([-62, top - 22])); c.lineTo(...R([62, top - 22])); c.quadraticCurveTo(...R([wTop - 10, top - 6]), ...R([wTop, top + 46])); c.lineTo(...R([wHem, hem])); c.lineTo(...R([-wHem, hem])); c.lineTo(...R([-wTop, top + 46])); c.quadraticCurveTo(...R([-wTop + 10, top - 6]), ...R([-62, top - 22])); c.closePath(); }; };
  Object.assign(C.OUTFITS, {
    plainCoat: { // Rose: a plain belted coat, the kind of thing a widow seeking a sitting might wear
      legs: (c, J) => legsPair(c, J, '#f2c19e', '#2a2020', 52, 42),
      neck: neck('#f2c19e', 58),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -956, -380, 150, 190), '#5a5048'); stroke(c, [R([-150, -640]), R([150, -640])], 12, '#3a322c'); part(c, poly([R([-56, -962]), R([56, -962]), R([0, -860])]), '#efe9dc', 4); },
      arms: (c, J, hs) => arms(c, J, hs, '#5a5048', '#f2c19e', 58),
    },
    robe: { // Rahman Bey: a long white robe with a sash
      legs: (c, J) => legsPair(c, J, '#efe6d0', '#6a4a2a', 80, 66),
      neck: neck('#c98a5e', 70),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -60, 160, 210), '#efe6d0'); stroke(c, [R([-160, -620]), R([160, -620])], 16, '#a8322a'); stroke(c, [R([0, -960]), R([0, -700])], 3, 'rgba(29,26,23,.3)'); },
      arms: (c, J, hs) => arms(c, J, hs, '#efe6d0', '#c98a5e', 70),
    },
    bessDress: { // Bess: a dark 1920s dress with a white collar
      legs: (c, J) => legsPair(c, J, '#f3c4a2', '#1f1a1a', 50, 40),
      neck: neck('#f3c4a2', 56),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -950, -400, 140, 180), '#2a2a3a'); part(c, smooth([R([-70, -956]), R([0, -910]), R([70, -956]), R([60, -936]), R([0, -892]), R([-60, -936])]), '#f4efe2', 4); },
      arms: (c, J, hs) => arms(c, J, hs, '#2a2a3a', '#f3c4a2', 52),
    },
  });
})(window);
