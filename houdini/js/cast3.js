/* Part 3 cast — original designs in the same style as js/chars.js:
 * Sir Arthur Conan Doyle, Lady Jean Doyle, Kingsley Doyle (portrait), Mina "Margery" Crandon,
 * and two Scientific American committee members. Same image-space units as Houdini's head. */
(function (G) {
  'use strict';
  const C = G.Chars, { part, stroke, smooth, poly, rot, limb } = C, INK = C.INK;
  const O = [266, 1461], L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);
  const lerp = (a, b, k) => a + (b - a) * k;

  // brows: calm / worried / up / strain / smug derived from a calm pair
  const browSet = (l, r) => ({
    calm: [l, r], up: [l.map(([x, y]) => [x, y - 14]), r.map(([x, y]) => [x, y - 14])],
    worried: [[l[0], [l[1][0], l[1][1] - 6], [l[2][0], l[2][1] - 14]], [[r[0][0], r[0][1] - 14], [r[1][0], r[1][1] - 6], r[2]]],
    strain: [[l[0], l[1], [l[2][0], l[2][1] + 12]], [[r[0][0], r[0][1] + 12], r[1], r[2]]],
    smug: [[l[0], l[1], [l[2][0], l[2][1] + 8]], [[r[0][0], r[0][1] - 4], [r[1][0], r[1][1] - 10], [r[2][0], r[2][1] - 4]]],
  });
  function face(ctx, f, o) {
    const open = f.eyes ?? 1, lk = f.look || [0, 0];
    if (o.back) o.back(ctx);
    part(ctx, c => c.ellipse(o.ear[0] - O[0], o.ear[1] - O[1], 19, 30, -.15, 0, Math.PI * 2), o.skin);
    part(ctx, smooth(L(o.face)), o.skin);
    if (o.cheek) for (const [x, y] of o.cheek) { ctx.fillStyle = 'rgba(220,90,80,.18)'; ctx.beginPath(); ctx.ellipse(x - O[0], y - O[1], 22, 14, 0, 0, Math.PI * 2); ctx.fill(); }
    if (o.hair) o.hair(ctx);
    for (const [x, y, rx, ry] of o.eyes) {
      const X = x - O[0], Y = y - O[1];
      part(ctx, c => c.ellipse(X, Y, rx, ry * Math.max(open, .06), 0, 0, Math.PI * 2), '#fbf0db', 4.5);
      if (open > .15) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(X + lk[0] * rx * .45, Y + lk[1] * ry * .4, o.pupil || 7.5, 0, Math.PI * 2); ctx.fill(); }
      else stroke(ctx, [[X - rx, Y], [X, Y + ry * .3], [X + rx, Y]], 4.5);
      if (o.lids) stroke(ctx, [[X - rx, Y - ry * .35], [X, Y - ry * .6], [X + rx, Y - ry * .35]], 4);
    }
    for (const b of (o.brows[f.brows || 'calm'] || o.brows.calm)) { const p = L(b); ctx.beginPath(); ctx.moveTo(...p[0]); ctx.quadraticCurveTo(...p[1], ...p[2]); ctx.lineWidth = o.browW || 7; ctx.strokeStyle = o.browC || INK; ctx.lineCap = 'round'; ctx.stroke(); }
    stroke(ctx, L(o.nose), 4.5);
    const [mx, my, mw] = o.mouth, m = f.mouth || 'flat';
    if (m === 'smile') stroke(ctx, L([[mx - mw, my - 4], [mx, my + 9], [mx + mw, my - 5]]), 4.5);
    else if (m === 'o') part(ctx, c => c.ellipse(mx - O[0], my - O[1], 10, 14, 0, 0, Math.PI * 2), '#5a2420', 4);
    else if (m === 'frown') stroke(ctx, L([[mx - mw, my + 6], [mx, my - 4], [mx + mw, my + 6]]), 4.5);
    else if (m === 'grit') { part(ctx, smooth(L([[mx - mw, my - 8], [mx + mw, my - 10], [mx + mw, my + 10], [mx - mw, my + 10]])), '#fbf0db', 4); stroke(ctx, L([[mx - mw, my], [mx + mw, my - 1]]), 3); }
    else if (o.lip) part(ctx, smooth(L([[mx - mw, my - 2], [mx + mw, my - 4], [mx + mw - 6, my + 6], [mx - mw + 6, my + 6]])), o.lip, 3.5);
    else stroke(ctx, L([[mx - mw, my], [mx, my + 2], [mx + mw, my - 2]]), 4.5);
    if (o.front) o.front(ctx, f);
  }

  // Doyle: big, ruddy, receding brown hair slicked flat, a huge walrus moustache.
  function doyle(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eda882', ear: [372, 322], cheek: [[206, 360], [318, 364]],
      face: [[170, 196], [330, 188], [362, 246], [370, 332], [346, 420], [300, 456], [240, 462], [200, 448], [174, 410], [160, 334], [156, 262]],
      hair: c => { part(c, smooth(L([[158, 290], [150, 230], [176, 186], [230, 168], [300, 168], [350, 190], [372, 236], [370, 290], [352, 236], [300, 206], [248, 216], [196, 214], [172, 250]])), '#6a4a32');
        stroke(c, L([[200, 192], [262, 182], [330, 192]]), 3, 'rgba(255,240,220,.35)'); },
      eyes: [[218, 300, 18, 18], [294, 304, 19, 19]], pupil: 7,
      brows: browSet([[196, 270], [218, 262], [240, 270]], [[272, 274], [294, 266], [318, 274]]), browW: 9, browC: '#5a3c28',
      nose: [[256, 312], [244, 350], [266, 356]],
      mouth: [258, 412, 20],
      front: c => part(c, smooth(L([[256, 362], [300, 366], [340, 392], [334, 412], [300, 398], [262, 394], [222, 398], [182, 412], [176, 392], [214, 366]])), '#7a5236', 4.5), // walrus moustache
    });
  }
  // Lady Jean Doyle: dark hair in a soft Edwardian updo, pearl drop earrings, gentle face.
  function jean(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f4c6a4', ear: [362, 330], lids: f.trance,
      back: c => part(c, smooth(L([[170, 250], [190, 150], [266, 120], [342, 150], [364, 250]])), '#4a3024'),
      face: [[186, 218], [318, 210], [348, 268], [352, 344], [324, 412], [280, 442], [238, 446], [206, 432], [186, 396], [174, 336], [172, 276]],
      hair: c => { part(c, smooth(L([[166, 320], [160, 240], [200, 186], [266, 172], [334, 186], [370, 240], [364, 320], [340, 256], [290, 228], [230, 232], [190, 262]])), '#4a3024');
        part(c, c2 => c2.ellipse(266 - O[0], 134 - O[1], 52, 34, 0, 0, Math.PI * 2), '#4a3024'); },
      eyes: [[222, 308, 20, 21], [292, 312, 21, 22]],
      brows: browSet([[202, 276], [222, 268], [242, 276]], [[272, 280], [292, 272], [312, 280]]), browW: 6, browC: '#3a2418',
      nose: [[258, 320], [250, 354], [264, 358]],
      mouth: [258, 398, 16], lip: '#b8606a',
      front: c => { part(c, c2 => c2.arc(366 - O[0], 382 - O[1], 9, 0, Math.PI * 2), '#f6f2ea', 3); },
    });
  }
  // Margery (Mina Crandon): 1920s finger-waved bob, light brown, bright eyes, cupid-bow lips.
  function margery(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f6c7a6', ear: [362, 334], cheek: [[212, 362], [312, 366]],
      face: [[186, 218], [318, 210], [348, 268], [352, 344], [324, 412], [280, 440], [238, 444], [206, 430], [186, 396], [174, 336], [172, 276]],
      hair: c => { part(c, smooth(L([[156, 388], [148, 270], [190, 196], [266, 178], [344, 196], [384, 270], [378, 392], [350, 346], [352, 276], [300, 236], [236, 246], [190, 280], [184, 350]])), '#9a6a3e');
        for (const y of [214, 236]) stroke(c, L([[196, y + 20], [230, y], [262, y + 16], [296, y - 2], [330, y + 14]]), 3.5, 'rgba(60,36,18,.55)'); },
      eyes: [[224, 310, 21, 22], [292, 314, 22, 23]], pupil: 8,
      brows: browSet([[204, 274], [224, 266], [244, 274]], [[274, 278], [292, 270], [312, 278]]), browW: 5.5, browC: '#5a3a22',
      nose: [[258, 322], [252, 352], [264, 356]],
      mouth: [258, 396, 14], lip: '#c0303e',
      front: c => part(c, c2 => c2.ellipse(372 - O[0], 386 - O[1], 7, 16, 0, 0, Math.PI * 2), '#2f5a6a', 3),
    });
  }
  // Kingsley Doyle: young man in a WWI army cap (portrait only).
  function kingsley(ctx, f = {}) {
    face(ctx, f, {
      skin: '#efb48e', ear: [364, 330],
      face: [[184, 214], [320, 206], [350, 264], [356, 342], [328, 412], [284, 444], [238, 448], [206, 434], [186, 398], [172, 336], [170, 274]],
      hair: c => { part(c, smooth(L([[170, 280], [174, 230], [266, 214], [358, 230], [362, 280], [330, 256], [210, 256]])), '#5a3a26');
        part(c, smooth(L([[150, 236], [164, 168], [266, 140], [368, 168], [384, 236]])), '#6a6a42'); part(c, smooth(L([[140, 236], [390, 236], [366, 262], [168, 262]])), '#4a4a2c'); part(c, c2 => c2.arc(266 - O[0], 198 - O[1], 14, 0, Math.PI * 2), '#c9a14a', 3); },
      eyes: [[222, 304, 19, 20], [294, 308, 20, 21]], pupil: 7,
      brows: browSet([[202, 276], [222, 270], [242, 276]], [[272, 280], [294, 274], [314, 280]]), browW: 6,
      nose: [[258, 318], [248, 354], [264, 358]],
      mouth: [258, 402, 18],
    });
  }
  // Committee: a bearded professor in spectacles, and a lean clean-shaven editor with slick hair.
  function professor(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f0b892', ear: [366, 322],
      face: [[180, 202], [324, 194], [354, 250], [362, 330], [336, 404], [290, 436], [240, 442], [204, 430], [182, 396], [168, 330], [164, 262]],
      hair: c => { part(c, smooth(L([[164, 300], [156, 232], [200, 186], [266, 176], [334, 188], [370, 236], [364, 300], [346, 230], [266, 204], [186, 230]])), '#d8d2c4');
        part(c, smooth(L([[178, 380], [196, 446], [240, 500], [292, 500], [336, 444], [352, 380], [320, 420], [266, 434], [210, 420]])), '#d8d2c4'); },
      eyes: [[222, 300, 17, 18], [292, 304, 18, 19]], pupil: 6.5,
      brows: browSet([[200, 270], [222, 262], [244, 270]], [[270, 274], [292, 266], [314, 274]]), browW: 8, browC: '#a8a294',
      nose: [[256, 312], [244, 352], [264, 358]],
      mouth: [258, 404, 16],
      front: c => { for (const [x, y] of [[222, 300], [292, 304]]) part(c, c2 => c2.arc(x - O[0], y - O[1], 26, 0, Math.PI * 2), null, 3); stroke(c, L([[248, 300], [266, 300]]), 3); },
    });
  }
  function editor(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e8a87e', ear: [362, 326],
      face: [[188, 206], [318, 198], [344, 256], [348, 340], [322, 418], [280, 452], [240, 456], [210, 440], [192, 402], [180, 336], [178, 268]],
      hair: c => part(c, smooth(L([[176, 290], [172, 214], [220, 172], [300, 168], [354, 204], [356, 290], [336, 236], [270, 212], [214, 222], [190, 262]])), '#1f1c1a'),
      eyes: [[226, 304, 17, 17], [292, 308, 18, 18]], pupil: 6.5,
      brows: browSet([[206, 274], [226, 268], [246, 276]], [[272, 278], [292, 272], [312, 278]]), browW: 7,
      nose: [[258, 316], [250, 356], [264, 360]],
      mouth: [258, 406, 16],
      front: c => { for (const [x, y] of [[226, 304], [292, 308]]) part(c, c2 => c2.rect(x - 24 - O[0], y - 18 - O[1], 48, 36), null, 3); stroke(c, L([[250, 304], [268, 304]]), 3); },
    });
  }
  Object.assign(C.HEADS, { doyle, jean, margery, kingsley, professor, editor });
  C.castFace = face; C.browSet = browSet;                                      // shared with later casts (js/cast4.js)

  // ---------- outfits ----------
  const legsPair = (ctx, J, cloth, shoe, w1, w2) => {
    for (const [hip, knee, ank] of [[C.SK.hipL, J.kneeL, J.ankL], [C.SK.hipR, J.kneeR, J.ankR]]) {
      part(ctx, limb(hip, knee, w1, w2 + 6), cloth); part(ctx, limb(knee, ank, w2 + 6, w2), cloth);
      if (shoe) part(ctx, smooth([[ank[0] - 44, ank[1] + 6], [ank[0] + 38, ank[1] + 2], [ank[0] + 52, ank[1] + 38], [ank[0] - 52, ank[1] + 42]]), shoe);
    }
  };
  const arms = (ctx, J, hs, sleeve, skin, w = 66, cuff) => {
    for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]), cx = Math.cos(dir), cy = Math.sin(dir);
      part(ctx, limb(sh, el, w, w - 8), sleeve); part(ctx, limb(el, [wr[0] - cx * 8, wr[1] - cy * 8], w - 8, w - 16), sleeve);
      if (cuff) part(ctx, limb([wr[0] - cx * 8, wr[1] - cy * 8], [wr[0] + cx * 2, wr[1] + cy * 2], w - 20, w - 20), cuff, 4);
      C.hand(ctx, [wr[0] + cx * 4, wr[1] + cy * 4], dir, hs[side] || 'open', skin, .95);
    }
  };
  const neck = (skin, w = 70) => (c, J) => part(c, limb(rot([0, -1012], J.P, J.lean), rot([0, -962], J.P, J.lean), w, w + 4), skin);
  const body = (J, top, hem, wTop, wHem) => { const R = p => rot(p, J.P, J.lean);
    return c => { c.moveTo(...R([-62, top - 22])); c.lineTo(...R([62, top - 22])); c.quadraticCurveTo(...R([wTop - 10, top - 6]), ...R([wTop, top + 46])); c.lineTo(...R([wHem, hem])); c.lineTo(...R([-wHem, hem])); c.lineTo(...R([-wTop, top + 46])); c.quadraticCurveTo(...R([-wTop + 10, top - 6]), ...R([-62, top - 22])); c.closePath(); }; };
  Object.assign(C.OUTFITS, {
    tweed: { // Doyle: broad three-piece brown tweed, watch chain, wing collar
      legs: (c, J) => legsPair(c, J, '#6a5640', '#2a2018', 100, 80),
      neck: neck('#eda882', 78),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, body(J, -962, -520, 190, 200), '#7a6448');
        part(c, poly([R([-60, -968]), R([60, -968]), R([0, -800])]), '#f4efe2', 4.5);
        part(c, poly([R([-56, -930]), R([56, -930]), R([60, -600]), R([-60, -600])]), '#6a5238', 4.5);
        stroke(c, [R([-24, -700]), R([20, -668]), R([40, -630])], 4, '#c9a14a');
        for (let x = -170; x <= 170; x += 34) stroke(c, [R([x, -940]), R([x - 8, -540])], 2, 'rgba(40,28,16,.22)');
        part(c, poly([R([-62, -968]), R([-6, -700]), R([-104, -820])]), '#86704f', 4.5); part(c, poly([R([62, -968]), R([6, -700]), R([104, -820])]), '#86704f', 4.5); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-40, -990]), R([0, -972]), R([40, -990]), R([38, -956]), R([0, -968]), R([-38, -956])]), '#3a5a4a', 4); },
      arms: (c, J, hs) => arms(c, J, hs, '#7a6448', '#eda882', 74, '#f4efe2'),
    },
    teaGown: { // Lady Doyle: long lavender-grey gown with lace yoke and pearls
      legs: (c, J) => legsPair(c, J, '#4a4052', '#2a2024', 70, 60),
      neck: neck('#f4c6a4', 62),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -40, 150, 230), '#8a7a9a');
        part(c, smooth([R([-110, -940]), R([110, -940]), R([80, -860]), R([0, -836]), R([-80, -860])]), '#efe9dc', 4);
        for (let i = 0; i < 9; i++) { const a = -.8 + i * .2; part(c, c2 => c2.arc(...R([Math.sin(a) * 70, -930 + Math.cos(a) * 46]), 7, 0, Math.PI * 2), '#f6f2ea', 2.5); } },
      arms: (c, J, hs) => arms(c, J, hs, '#8a7a9a', '#f4c6a4', 56, '#efe9dc'),
    },
    flapper: { // Margery: teal drop-waist dress, long beads
      legs: (c, J) => legsPair(c, J, '#f6c7a6', '#2a1a1a', 54, 44),
      neck: neck('#f6c7a6', 58),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -950, -400, 140, 180), '#2f6a6a'); stroke(c, [R([-150, -620]), R([150, -620])], 9, '#1f4a4a');
        stroke(c, [R([-40, -950]), R([0, -700]), R([40, -950])], 4, '#f6f2ea'); },
      arms: (c, J, hs) => arms(c, J, hs, '#f6c7a6', '#f6c7a6', 50),
    },
    uniform: { // Kingsley: khaki WWI tunic
      legs: (c, J) => legsPair(c, J, '#7a6a42', '#3a2a1a', 92, 74),
      neck: neck('#efb48e'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -540, 168, 176), '#8a7a4a');
        for (const x of [-80, 80]) part(c, poly([R([x - 46, -880]), R([x + 46, -880]), R([x + 46, -820]), R([x - 46, -820])]), '#7a6a40', 4);
        for (const y of [-900, -800, -700, -620]) part(c, ca => ca.arc(...R([0, y]), 9, 0, Math.PI * 2), '#c9a14a', 3); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-60, -990]), R([60, -990]), R([50, -950]), R([-50, -950])]), '#7a6a40', 4); },
      arms: (c, J, hs) => arms(c, J, hs, '#8a7a4a', '#efb48e', 66),
    },
    greySuit: { // committee: grey lounge suit, white shirt, dark tie
      legs: (c, J) => legsPair(c, J, '#5a5c60', '#1f1f21', 92, 74),
      neck: neck('#eeb08a'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -540, 168, 176), '#66686e');
        part(c, poly([R([-56, -968]), R([56, -968]), R([0, -790])]), '#f4efe2', 4.5); part(c, poly([R([-12, -960]), R([12, -960]), R([16, -820]), R([0, -790]), R([-16, -820])]), '#5a2a2a', 3.5);
        part(c, poly([R([-62, -968]), R([-6, -720]), R([-96, -830])]), '#74767c', 4.5); part(c, poly([R([62, -968]), R([6, -720]), R([96, -830])]), '#74767c', 4.5); },
      arms: (c, J, hs) => arms(c, J, hs, '#66686e', '#eeb08a', 66, '#f4efe2'),
    },
  });
})(window);
