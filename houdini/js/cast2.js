/* Part 2 cast — original designs in the same style as js/chars.js:
 * Cecilia (Houdini's mother, portrait only) and three spiritualist mediums.
 * Heads are drawn in the same image-space units as Houdini's head (origin
 * between the feet of a ~1460-unit figure), so they plug into Chars.figure. */
(function (G) {
  'use strict';
  const C = G.Chars, { part, stroke, smooth, poly, rot } = C, INK = C.INK;
  const O = [266, 1461], L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);

  function face(ctx, f, o) {
    const open = f.eyes ?? 1, lk = f.look || [0, 0];
    if (o.back) o.back(ctx);
    part(ctx, c => c.ellipse(o.ear[0] - O[0], o.ear[1] - O[1], 19, 30, -.15, 0, Math.PI * 2), o.skin);
    part(ctx, smooth(L(o.face)), o.skin);
    if (o.hair) o.hair(ctx);
    for (const [x, y, rx, ry] of o.eyes) {
      const X = x - O[0], Y = y - O[1];
      part(ctx, c => c.ellipse(X, Y, rx, ry * Math.max(open, .06), 0, 0, Math.PI * 2), '#fbf0db', 4.5);
      if (open > .15) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(X + lk[0] * rx * .45, Y + lk[1] * ry * .4, o.pupil || 7.5, 0, Math.PI * 2); ctx.fill(); }
      else stroke(ctx, [[X - rx, Y], [X, Y + ry * .3], [X + rx, Y]], 4.5);
      if (o.lids) stroke(ctx, [[X - rx, Y - ry * .35], [X, Y - ry * .6], [X + rx, Y - ry * .35]], 4);     // heavy lids (mystic look)
    }
    for (const b of o.brows) { const p = L(b); ctx.beginPath(); ctx.moveTo(...p[0]); ctx.quadraticCurveTo(...p[1], ...p[2]); ctx.lineWidth = o.browW || 7; ctx.strokeStyle = o.browC || INK; ctx.lineCap = 'round'; ctx.stroke(); }
    stroke(ctx, L(o.nose), 4.5);
    const [mx, my, mw] = o.mouth, m = f.mouth || 'flat';
    if (m === 'smile') stroke(ctx, L([[mx - mw, my - 4], [mx, my + 9], [mx + mw, my - 5]]), 4.5);
    else if (m === 'o') part(ctx, c => c.ellipse(mx - O[0], my - O[1], 10, 14, 0, 0, Math.PI * 2), '#5a2420', 4);
    else if (m === 'frown') stroke(ctx, L([[mx - mw, my + 6], [mx, my - 4], [mx + mw, my + 6]]), 4.5);
    else part(ctx, smooth(L([[mx - mw, my - 2], [mx + mw, my - 4], [mx + mw - 6, my + 6], [mx - mw + 6, my + 6]])), o.lip || '#a84a4a', 3.5);
    if (o.front) o.front(ctx);
  }

  // Cecilia: grey hair parted and pinned in a bun, soft round face, small spectacles on a chain.
  function cecilia(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f1bf9c', ear: [364, 330],
      back: c => part(c, c2 => c2.arc(266 - O[0], 176 - O[1], 54, 0, Math.PI * 2), '#c9c4bc'),
      face: [[186, 220], [318, 212], [350, 270], [354, 346], [324, 414], [280, 444], [238, 448], [204, 432], [184, 396], [172, 336], [170, 276]],
      hair: c => { part(c, smooth(L([[164, 330], [158, 250], [200, 196], [266, 186], [334, 198], [366, 252], [362, 330], [338, 262], [272, 236], [196, 262]])), '#c9c4bc'); stroke(c, L([[266, 190], [266, 240]]), 3, 'rgba(29,26,23,.35)'); },
      eyes: [[222, 310, 20, 21], [292, 314, 21, 22]], pupil: 7,
      brows: [[[204, 280], [222, 274], [240, 280]], [[274, 284], [292, 278], [310, 284]]], browC: '#8e8a82',
      nose: [[258, 320], [250, 356], [266, 362]],
      mouth: [258, 398, 18], lip: '#b8706a',
      front: c => { for (const [x, y] of [[222, 310], [292, 314]]) part(c, c2 => c2.arc(x - O[0], y - O[1], 27, 0, Math.PI * 2), null, 3); stroke(c, L([[249, 310], [265, 310]]), 3); },
    });
  }
  // Medium A: headscarf knotted at the side, hoop earrings, heavy-lidded eyes.
  function mediumScarf(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e9ad85', ear: [364, 330], lids: true,
      face: [[184, 214], [318, 206], [350, 264], [356, 342], [326, 414], [282, 446], [238, 450], [206, 434], [186, 398], [172, 336], [170, 274]],
      hair: c => { part(c, smooth(L([[150, 300], [150, 220], [210, 168], [300, 160], [370, 206], [378, 290], [340, 250], [270, 226], [200, 240], [176, 290]])), '#7a2a3a');
        part(c, smooth(L([[370, 250], [418, 270], [430, 320], [392, 316], [376, 286]])), '#7a2a3a'); for (let i = 0; i < 5; i++) part(c, c2 => c2.arc(200 + i * 32 - O[0], 210 - (i % 2) * 8 - O[1], 6, 0, Math.PI * 2), '#e3b14a', 2.5); },
      eyes: [[222, 306, 21, 20], [294, 310, 22, 21]],
      brows: [[[200, 270], [222, 260], [244, 268]], [[272, 272], [296, 262], [318, 270]]], browW: 8,
      nose: [[258, 318], [242, 360], [264, 366]],
      mouth: [258, 404, 18], lip: '#9a3a44',
      front: c => part(c, c2 => c2.arc(364 - O[0], 380 - O[1], 14, 0, Math.PI * 2), null, 4),
    });
  }
  // Medium B: bobbed black hair, beaded headband with a feather (a 1920s parlour medium).
  function mediumFeather(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f3c4a2', ear: [364, 334], lids: true,
      face: [[186, 218], [318, 210], [348, 268], [352, 344], [324, 412], [280, 442], [238, 446], [206, 432], [186, 396], [174, 336], [172, 276]],
      hair: c => { part(c, smooth(L([[156, 380], [150, 260], [196, 200], [270, 188], [346, 206], [380, 270], [374, 384], [344, 330], [340, 262], [270, 246], [196, 262], [186, 340]])), '#1f1a1c');
        stroke(c, L([[160, 252], [376, 252]]), 9, '#c9a14a'); part(c, smooth(L([[332, 250], [350, 160], [372, 110], [366, 180], [348, 252]])), '#e8e2d4', 4); },
      eyes: [[224, 310, 20, 21], [292, 314, 21, 22]],
      brows: [[[204, 278], [224, 270], [244, 276]], [[274, 280], [292, 272], [312, 278]]], browW: 6,
      nose: [[258, 320], [250, 354], [264, 358]],
      mouth: [258, 398, 16], lip: '#b0303e',
    });
  }
  // Medium C: severe grey-streaked hair pulled tight, high lace collar, narrow eyes.
  function mediumCollar(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eebd9a', ear: [362, 330],
      face: [[190, 214], [316, 206], [344, 264], [348, 344], [320, 418], [278, 452], [238, 456], [208, 440], [190, 400], [178, 336], [176, 274]],
      hair: c => { part(c, smooth(L([[170, 300], [166, 228], [214, 182], [300, 176], [354, 214], [358, 300], [336, 246], [266, 220], [200, 238], [184, 290]])), '#5a5550'); stroke(c, L([[220, 196], [300, 186]]), 5, '#a8a39a'); },
      eyes: [[226, 308, 18, 15], [292, 312, 19, 16]], pupil: 6.5,
      brows: [[[206, 280], [226, 274], [246, 284]], [[272, 286], [292, 276], [312, 280]]], browW: 7,
      nose: [[258, 318], [248, 360], [264, 364]],
      mouth: [258, 406, 16], lip: '#8a4a4a',
    });
  }
  Object.assign(C.HEADS, { cecilia, mediumScarf, mediumFeather, mediumCollar });

  // Outfits for the new cast (bodies reuse the shared skeleton).
  const legsPair = (ctx, J, cloth, shoe, w1, w2) => {
    for (const [hip, knee, ank] of [[C.SK.hipL, J.kneeL, J.ankL], [C.SK.hipR, J.kneeR, J.ankR]]) {
      part(ctx, C.limb(hip, knee, w1, w2 + 6), cloth); part(ctx, C.limb(knee, ank, w2 + 6, w2), cloth);
      if (shoe) part(ctx, smooth([[ank[0] - 40, ank[1] + 6], [ank[0] + 36, ank[1] + 2], [ank[0] + 48, ank[1] + 36], [ank[0] - 48, ank[1] + 40]]), shoe);
    }
  };
  const arms = (ctx, J, hs, sleeve, skin, w = 58) => {
    for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]);
      part(ctx, C.limb(sh, el, w, w - 6), sleeve); part(ctx, C.limb(el, wr, w - 6, w - 14), sleeve);
      C.hand(ctx, [wr[0] + Math.cos(dir) * 4, wr[1] + Math.sin(dir) * 4], dir, hs[side] || 'open', skin, .9);
    }
  };
  const gown = (top, hem, wTop, wHem) => J => { const R = p => rot(p, J.P, J.lean);
    return c => { c.moveTo(...R([-60, top - 20])); c.lineTo(...R([60, top - 20])); c.quadraticCurveTo(...R([wTop - 10, top - 4]), ...R([wTop, top + 46])); c.lineTo(...R([wHem, hem])); c.lineTo(...R([-wHem, hem])); c.lineTo(...R([-wTop, top + 46])); c.quadraticCurveTo(...R([-wTop + 10, top - 4]), ...R([-60, top - 20])); c.closePath(); }; };
  Object.assign(C.OUTFITS, {
    dress1900: { // long dark dress, white lace collar (Cecilia)
      legs: (c, J) => legsPair(c, J, '#2f2a34', '#1f1a1c', 70, 60),
      neck: (c, J) => part(c, C.limb(rot([0, -1010], J.P, J.lean), rot([0, -960], J.P, J.lean), 62, 68), '#f1bf9c'),
      torso: (c, J) => part(c, gown(-962, -40, 150, 230)(J), '#3a3242'),
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-70, -966]), R([0, -920]), R([70, -966]), R([60, -940]), R([0, -900]), R([-60, -940])]), '#efe9dc', 4); },
      arms: (c, J, hs) => arms(c, J, hs, '#3a3242', '#f1bf9c'),
    },
    shawl: { // fringed shawl over a dark dress (medium A)
      legs: (c, J) => legsPair(c, J, '#2a2228', '#1f1a1c', 70, 60),
      neck: (c, J) => part(c, C.limb(rot([0, -1010], J.P, J.lean), rot([0, -960], J.P, J.lean), 62, 68), '#e9ad85'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, gown(-962, -60, 150, 220)(J), '#2e2a3a');
        part(c, poly([R([-170, -930]), R([170, -930]), R([0, -620])]), '#8a3a2a'); for (let x = -150; x <= 150; x += 30) stroke(c, [R([x, -930 + Math.abs(x) * 1.9]), R([x * .9, -890 + Math.abs(x) * 1.9])], 3, '#e3b14a'); },
      arms: (c, J, hs) => arms(c, J, hs, '#2e2a3a', '#e9ad85'),
    },
    beaded: { // 1920s beaded evening dress (medium B)
      legs: (c, J) => legsPair(c, J, '#f3c4a2', '#1f1a1c', 54, 44),
      neck: (c, J) => part(c, C.limb(rot([0, -1010], J.P, J.lean), rot([0, -960], J.P, J.lean), 58, 64), '#f3c4a2'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, gown(-950, -380, 140, 170)(J), '#1f3a3a'); for (const y of [-800, -650, -500]) stroke(c, [R([-150, y]), R([150, y])], 5, '#c9a14a'); },
      arms: (c, J, hs) => arms(c, J, hs, '#f3c4a2', '#f3c4a2', 50),
    },
    highCollar: { // stiff black dress with a high lace collar (medium C)
      legs: (c, J) => legsPair(c, J, '#1f1d22', '#1f1a1c', 70, 60),
      neck: (c, J) => part(c, C.limb(rot([0, -1010], J.P, J.lean), rot([0, -960], J.P, J.lean), 60, 66), '#eebd9a'),
      torso: (c, J) => part(c, gown(-962, -40, 150, 230)(J), '#1f1d22'),
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-46, -1000]), R([46, -1000]), R([52, -950]), R([-52, -950])]), '#efe9dc', 4); },
      arms: (c, J, hs) => arms(c, J, hs, '#1f1d22', '#eebd9a'),
    },
  });
})(window);
