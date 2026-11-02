/* "Did medieval peasants work less than you?" — cast, original designs in the house style.
 * Hugh Miller (villein of Alwalton, 1279), the Abbot of Peterborough, the steward, Walter (Elsworth),
 * Hugh's wife and children, King Edward III and his advisor. Same image-space units as js/chars.js
 * (figure ≈ 1460 tall, origin between the feet). Needs js/chars.js + js/cast3.js (face builder). */
(function (G) {
  'use strict';
  const C = G.Chars, { part, stroke, smooth, poly, rot, limb, hand, SK, INK } = C, face = C.castFace, browSet = C.browSet;
  const O = [266, 1461], L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);
  const lerp = (a, b, k) => a + (b - a) * k;

  // ---------------- heads ----------------
  // Hugh: weathered everyman in his thirties. Sandy-brown shaggy hair, short beard, sun-reddened cheeks,
  // a nose that has been broken once. Warm, tired, quietly funny.
  function hugh(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e2a074', ear: [364, 330], cheek: [[208, 352], [314, 356]],
      face: [[184, 214], [320, 206], [352, 262], [356, 342], [330, 412], [288, 444], [240, 448], [206, 434], [186, 398], [172, 336], [170, 272]],
      hair: c => {
        part(c, smooth(L([[164, 330], [154, 250], [178, 190], [232, 160], [300, 158], [356, 186], [376, 250], [370, 330], [352, 276], [334, 236], [300, 226], [276, 246], [256, 226], [226, 240], [196, 236], [180, 280]])), '#8a5a32');
        for (const s of [[[200, 196], [236, 180], [262, 192]], [[284, 182], [320, 186], [344, 210]]]) stroke(c, L(s), 3.5, 'rgba(255,225,180,.35)');
      },
      eyes: [[222, 304, 18, 19], [294, 308, 19, 20]], pupil: 7,
      brows: browSet([[200, 274], [222, 266], [244, 274]], [[272, 278], [294, 270], [316, 278]]), browW: 8, browC: '#6a4022',
      nose: [[258, 314], [242, 352], [262, 358]],
      mouth: [258, 400, 17],
      front: (c, ff) => {   // short beard framing the jaw, mouth stays readable
        part(c, smooth(L([[184, 372], [204, 420], [240, 456], [280, 458], [318, 430], [336, 376], [318, 396], [300, 420], [258, 428], [218, 418], [198, 396]])), '#7a4e2a', 4.5);
        stroke(c, L([[236, 382], [258, 376], [282, 382]]), 6, '#7a4e2a');
      },
    });
  }
  // The Abbot of Peterborough: well fed, monastic tonsure (bald crown, ring of grey hair), jowls,
  // small satisfied eyes. Never cruel-looking: he is a manager reading a ledger.
  function abbot(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f0bc98', ear: [372, 330], cheek: [[204, 372], [320, 376]],
      face: [[178, 196], [330, 190], [366, 252], [374, 344], [352, 428], [304, 470], [236, 474], [190, 448], [166, 400], [158, 330], [160, 256]],
      hair: c => {
        part(c, smooth(L([[158, 300], [150, 250], [170, 222], [186, 270], [180, 312]])), '#cfc8bc');
        part(c, smooth(L([[372, 306], [380, 250], [360, 222], [348, 270], [356, 312]])), '#cfc8bc');
        stroke(c, L([[204, 210], [262, 196], [322, 208]]), 3, 'rgba(255,255,255,.55)');   // shine on the tonsure
      },
      eyes: [[222, 306, 15, 14], [294, 310, 16, 15]], pupil: 6, lids: true,
      brows: browSet([[200, 278], [222, 272], [244, 280]], [[272, 282], [294, 276], [316, 282]]), browW: 7, browC: '#a8a096',
      nose: [[258, 316], [240, 360], [266, 366]],
      mouth: [258, 412, 20],
      front: c => stroke(c, L([[214, 450], [258, 462], [302, 450]]), 3.5, 'rgba(29,26,23,.45)'),   // double chin
    });
  }
  // The steward: lean clerk, long nose, a small black coif tied under the chin, ink-stained.
  function steward(ctx, f = {}) {
    face(ctx, f, {
      skin: '#ecb48e', ear: [360, 330],
      face: [[192, 214], [316, 206], [344, 262], [348, 344], [320, 420], [278, 452], [242, 456], [212, 440], [192, 402], [180, 336], [178, 274]],
      hair: c => {
        part(c, smooth(L([[170, 330], [166, 230], [214, 176], [266, 166], [320, 176], [366, 230], [362, 330], [344, 262], [266, 226], [188, 262]])), '#2e2a2c');
        stroke(c, L([[176, 330], [214, 452]]), 5, '#2e2a2c'); stroke(c, L([[358, 330], [314, 452]]), 5, '#2e2a2c');   // coif strings
      },
      eyes: [[224, 306, 16, 17], [292, 310, 17, 18]], pupil: 6.5,
      brows: browSet([[204, 276], [224, 268], [244, 276]], [[272, 280], [292, 272], [312, 280]]), browW: 6, browC: '#3a2a20',
      nose: [[258, 304], [236, 368], [262, 372]],
      mouth: [260, 412, 14],
    });
  }
  // Walter of Elsworth: round face, stubble, rosy, a red hood pulled up — the cheerful skiver.
  function walter(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eab08a', ear: [366, 334], cheek: [[206, 362], [318, 366]],
      back: c => part(c, smooth(L([[150, 400], [146, 230], [196, 150], [266, 130], [340, 150], [390, 230], [386, 400], [266, 470]])), '#a23a2c'),
      face: [[180, 220], [324, 214], [356, 270], [360, 350], [330, 422], [284, 452], [240, 454], [204, 440], [180, 400], [168, 340], [168, 280]],
      hair: c => { part(c, smooth(L([[176, 270], [196, 210], [266, 192], [340, 210], [360, 270], [320, 240], [266, 232], [210, 242]])), '#4a3020');
        stroke(c, L([[170, 250], [200, 186], [266, 164], [336, 186], [366, 250]]), 10, '#8a2e22'); },  // hood rim
      eyes: [[224, 310, 18, 18], [292, 314, 19, 19]], pupil: 7,
      brows: browSet([[204, 280], [224, 272], [244, 280]], [[272, 284], [292, 276], [312, 284]]), browW: 7, browC: '#4a3020',
      nose: [[258, 320], [246, 352], [266, 358]],
      mouth: [258, 404, 18],
    });
  }
  // Hugh's wife (name not recorded): linen veil and wimple, strong brows, practical.
  function wife(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eeb48c', ear: [362, 330],
      back: c => part(c, smooth(L([[150, 470], [150, 240], [200, 160], [266, 140], [332, 160], [384, 240], [384, 470]])), '#e9e1cf'),
      face: [[192, 230], [314, 224], [342, 274], [346, 346], [318, 414], [278, 442], [240, 446], [210, 432], [190, 398], [180, 340], [180, 284]],
      hair: c => { part(c, smooth(L([[178, 290], [186, 206], [266, 178], [346, 206], [356, 290], [330, 236], [266, 222], [204, 236]])), '#efe8d8');   // veil over the brow
        part(c, smooth(L([[186, 396], [214, 448], [266, 470], [318, 448], [346, 396], [354, 470], [178, 470]])), '#efe8d8', 4.5); },          // wimple under the chin
      eyes: [[224, 310, 19, 20], [292, 314, 20, 21]], pupil: 7.5,
      brows: browSet([[204, 278], [224, 270], [244, 278]], [[272, 282], [292, 274], [312, 282]]), browW: 7, browC: '#5a3a24',
      nose: [[258, 320], [250, 354], [264, 358]],
      mouth: [258, 398, 15], lip: '#b8605a',
    });
  }
  // The children: big eyes, round faces. kidBoy = tousled hair; kidGirl = plaits.
  const kid = hair => (ctx, f = {}) => face(ctx, f, {
    skin: '#f2bd96', ear: [362, 340], cheek: [[212, 372], [312, 376]],
    face: [[184, 236], [320, 230], [352, 286], [354, 356], [324, 420], [280, 446], [240, 448], [208, 434], [184, 400], [172, 352], [172, 294]],
    hair, eyes: [[224, 326, 22, 24], [292, 330, 23, 25]], pupil: 8.5,
    brows: browSet([[204, 290], [224, 282], [244, 290]], [[272, 294], [292, 286], [312, 294]]), browW: 6, browC: '#6a4426',
    nose: [[258, 340], [252, 366], [264, 368]], mouth: [258, 404, 14],
  });
  const kidBoy = kid(c => part(c, smooth(L([[170, 320], [164, 250], [196, 196], [250, 180], [310, 184], [356, 214], [372, 280], [362, 320], [340, 270], [300, 252], [262, 266], [234, 248], [196, 266]])), '#a06a38'));
  const kidGirl = kid(c => { part(c, smooth(L([[168, 330], [164, 250], [204, 196], [266, 182], [328, 196], [368, 250], [364, 330], [344, 264], [266, 234], [188, 264]])), '#6a3e22');
    for (const x of [160, 372]) for (let i = 0; i < 4; i++) part(c, cc => cc.ellipse(x - O[0], 360 + i * 34 - O[1], 15, 19, 0, 0, 7), '#6a3e22', 4); });
  // King Edward III: long golden-brown forked beard, gold crown, steady hooded eyes.
  function edward(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eeb894', ear: [364, 330], lids: true,
      face: [[184, 214], [320, 206], [352, 262], [356, 342], [330, 412], [288, 444], [240, 448], [206, 434], [186, 398], [172, 336], [170, 272]],
      hair: c => {
        part(c, smooth(L([[160, 420], [150, 270], [186, 200], [266, 180], [346, 200], [382, 270], [372, 420], [348, 330], [340, 250], [266, 226], [192, 250], [184, 330]])), '#a8743a');
        // crown: band + fleurs
        part(c, poly(L([[176, 222], [356, 222], [362, 172], [334, 196], [310, 140], [286, 190], [266, 128], [246, 190], [222, 140], [198, 196], [170, 172]])), '#e3b23c', 4.5);
        for (const x of [210, 266, 322]) part(c, cc => cc.arc(x - O[0], 206 - O[1], 7, 0, 7), x === 266 ? '#b8323a' : '#3a6aa8', 3);
      },
      eyes: [[222, 304, 17, 17], [294, 308, 18, 18]], pupil: 6.5,
      brows: browSet([[200, 274], [222, 266], [244, 274]], [[272, 278], [294, 270], [316, 278]]), browW: 7, browC: '#7a5028',
      nose: [[258, 312], [244, 356], [264, 360]],
      mouth: [258, 398, 16],
      front: c => { part(c, smooth(L([[192, 380], [210, 450], [236, 520], [256, 480], [276, 522], [306, 452], [326, 380], [300, 404], [258, 414], [216, 404]])), '#a8743a', 4.5);
        stroke(c, L([[226, 384], [258, 378], [290, 384]]), 7, '#a8743a'); },
    });
  }
  // The advisor: chaperon hat with a draped tail, clean-shaven, anxious.
  function advisor(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eab28c', ear: [362, 332],
      face: [[188, 220], [316, 212], [346, 266], [350, 344], [322, 414], [280, 444], [240, 448], [208, 434], [188, 398], [176, 338], [176, 278]],
      hair: c => { part(c, smooth(L([[372, 250], [420, 330], [430, 450], [404, 452], [390, 340], [352, 280]])), '#2f4a6a');
        part(c, smooth(L([[160, 250], [170, 170], [230, 130], [306, 130], [366, 170], [378, 250], [330, 236], [266, 230], [204, 236]])), '#2f4a6a');
        stroke(c, L([[164, 240], [266, 222], [374, 240]]), 12, '#243a54'); },
      eyes: [[224, 306, 18, 19], [292, 310, 19, 20]], pupil: 7,
      brows: browSet([[204, 274], [224, 266], [244, 274]], [[272, 278], [292, 270], [312, 278]]), browW: 6, browC: '#3a2a20',
      nose: [[258, 314], [246, 354], [264, 358]], mouth: [258, 400, 15],
    });
  }
  Object.assign(C.HEADS, { hugh, abbot, steward, walter, wife, kidBoy, kidGirl, edward, advisor });

  // ---------------- outfits ----------------
  const neck = (skin, w = 70) => (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -958]), w, w + 4), skin); };
  const body = (J, top, hem, wTop, wHem, flare = 0) => { const R = p => rot(p, J.P, J.lean);
    return c => { const p = (x, y) => R([x, y]);
      c.moveTo(...p(-62, top - 22)); c.lineTo(...p(62, top - 22)); c.quadraticCurveTo(...p(wTop - 10, top - 6), ...p(wTop, top + 46));
      c.lineTo(...p(wTop - 22, -740)); c.quadraticCurveTo(...p(wHem - 10, hem + 120), ...p(wHem + flare, hem));
      c.quadraticCurveTo(...p(0, hem + Math.min(18, -hem * .03)), ...p(-wHem - flare, hem));
      c.quadraticCurveTo(...p(-wHem + 10, hem + 120), ...p(-wTop + 22, -740)); c.lineTo(...p(-wTop, top + 46));
      c.quadraticCurveTo(...p(-wTop + 10, top - 6), ...p(-62, top - 22)); c.closePath(); }; };
  function legs(c, J, cloth, shoe, w1 = 84, w2 = 66) {
    for (const [hip, knee, ank] of [[SK.hipL, J.kneeL, J.ankL], [SK.hipR, J.kneeR, J.ankR]]) {
      part(c, limb(hip, knee, w1, w2 + 6), cloth); part(c, limb(knee, ank, w2 + 6, w2), cloth);
      if (shoe) part(c, smooth([[ank[0] - 44, ank[1] + 4], [ank[0] + 34, ank[1]], [ank[0] + 58, ank[1] + 34], [ank[0] - 50, ank[1] + 42]]), shoe);
    }
  }
  function feetOnly(c, J, shoe) { for (const ank of [J.ankL, J.ankR]) part(c, smooth([[ank[0] - 44, ank[1] + 4], [ank[0] + 34, ank[1]], [ank[0] + 58, ank[1] + 34], [ank[0] - 50, ank[1] + 42]]), shoe); }
  function arms(c, J, hs, sleeve, skin, w = 64, cuff = null, bell = 0) {
    for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]), cx = Math.cos(dir), cy = Math.sin(dir);
      part(c, limb(sh, el, w, w - 8), sleeve); part(c, limb(el, [wr[0] - cx * 8, wr[1] - cy * 8], w - 8, w - 16 + bell), sleeve);
      if (cuff) part(c, limb([wr[0] - cx * 14, wr[1] - cy * 14], [wr[0] - cx * 2, wr[1] - cy * 2], w - 14 + bell, w - 14 + bell), cuff, 4);
      if (hs[side] !== 'steeple') hand(c, [wr[0] + cx * 4, wr[1] + cy * 4], dir, hs[side] || 'open', skin, .95);
    }
  }
  const belt = (c, J, y, col = '#4a3020', buckle = '#b8a070') => { const R = p => rot(p, J.P, J.lean);
    part(c, poly([R([-162, y - 14]), R([162, y - 14]), R([164, y + 14]), R([-164, y + 14])]), col, 4); part(c, poly([R([-16, y - 18]), R([16, y - 18]), R([16, y + 18]), R([-16, y + 18])]), buckle, 3.5); };

  Object.assign(C.OUTFITS, {
    // Hugh: knee-length russet wool tunic, hood-cape over the shoulders, belt + pouch + knife, grey hose, turnshoes.
    tunic: {
      legs: (c, J) => legs(c, J, '#6e6a5a', '#3a2a1c'),
      neck: neck('#e2a074'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, body(J, -962, -360, 168, 196, 10), '#9a5a34');
        stroke(c, [R([-70, -700]), R([-90, -380])], 3, 'rgba(40,20,10,.25)'); stroke(c, [R([60, -700]), R([80, -380])], 3, 'rgba(40,20,10,.25)');
        part(c, smooth([R([-130, -404]), R([-90, -380]), R([-30, -404]), R([20, -378]), R([90, -404]), R([140, -380]), R([150, -368]), R([-150, -368])]), '#7e4628', 3);   // worn hem
        belt(c, J, -620);
        part(c, smooth([R([60, -606]), R([108, -606]), R([112, -540]), R([84, -524]), R([58, -540])]), '#6a4426', 4);   // purse
        part(c, poly([R([-110, -606]), R([-96, -606]), R([-92, -500]), R([-114, -500])]), '#4a3020', 3.5); },        // knife sheath
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean);   // hood down: cape over shoulders, cowl bunched behind neck
        part(c, smooth([R([-150, -900]), R([-80, -1000]), R([0, -980]), R([80, -1000]), R([150, -900]), R([110, -840]), R([0, -820]), R([-110, -840])]), '#5e6a4a'); },
      arms: (c, J, hs) => arms(c, J, hs, '#9a5a34', '#e2a074', 64),
    },
    // Field work: same tunic hitched up, sleeves rolled, no hood (summer/harvest).
    tunicWork: {
      legs: (c, J) => legs(c, J, '#e2a074', '#3a2a1c', 70, 56),
      neck: neck('#e2a074'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -470, 168, 190, 6), '#b0744a');
        part(c, poly([R([-46, -968]), R([46, -968]), R([0, -880])]), '#e2a074', 4); belt(c, J, -640); },
      arms: (c, J, hs) => { arms(c, J, hs, '#b0744a', '#e2a074', 62);
        for (const [el, wr] of [[J.elL, J.wrL], [J.elR, J.wrR]]) part(c, limb([lerp(el[0], wr[0], .3), lerp(el[1], wr[1], .3)], wr, 50, 46), '#e2a074'); },
    },
    // Abbot: black Benedictine habit to the ankles, scapular, cowl, gold pectoral cross, rope belt.
    habit: {
      legs: (c, J) => feetOnly(c, J, '#1f1a18'),
      neck: neck('#f0bc98', 76),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, body(J, -962, -30, 186, 250, 20), '#2a2628');
        part(c, poly([R([-96, -960]), R([96, -960]), R([110, -40]), R([-110, -40])]), '#343034', 4);                 // scapular
        for (const x of [-170, 170]) stroke(c, [R([x * .7, -700]), R([x, -60])], 3, 'rgba(255,255,255,.08)');
        stroke(c, [R([-200, -560]), R([0, -540]), R([200, -560])], 7, '#8a7a5a');                                        // rope girdle
        stroke(c, [R([-60, -546]), R([-70, -400])], 6, '#8a7a5a');
        stroke(c, [R([-40, -950]), R([0, -800]), R([40, -950])], 3, '#c9a14a');                                          // chain
        part(c, poly([R([-10, -830]), R([10, -830]), R([10, -790]), R([34, -790]), R([34, -770]), R([10, -770]), R([10, -700]), R([-10, -700]), R([-10, -770]), R([-34, -770]), R([-34, -790]), R([-10, -790])]), '#e3b23c', 3.5); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-140, -930]), R([-70, -1010]), R([0, -990]), R([70, -1010]), R([140, -930]), R([80, -900]), R([0, -890]), R([-80, -900])]), '#1f1c1e'); },
      arms: (c, J, hs) => arms(c, J, hs, '#2a2628', '#f0bc98', 74, '#1f1c1e', 22),
    },
    // Steward: long green robe, ink pot + tally sticks at the belt.
    stewardRobe: {
      legs: (c, J) => feetOnly(c, J, '#2a2018'),
      neck: neck('#ecb48e', 64),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -60, 160, 210, 10), '#3e6a52');
        stroke(c, [R([0, -960]), R([0, -70])], 3.5, 'rgba(29,26,23,.4)'); belt(c, J, -620, '#2a2018', '#c9a14a');
        part(c, c2 => c2.ellipse(...R([110, -580]), 18, 24, 0, 0, 7), '#1f1c1e', 3.5);                                      // ink horn
        for (const dx of [-120, -100]) part(c, poly([R([dx, -610]), R([dx + 12, -610]), R([dx + 12, -480]), R([dx, -480])]), '#c8a878', 3); },
      arms: (c, J, hs) => arms(c, J, hs, '#3e6a52', '#ecb48e', 60),
    },
    // Walter: shorter blue-grey tunic (woad), red hood (on the head), bare shins + leg-wraps.
    walterTunic: {
      legs: (c, J) => legs(c, J, '#8a8070', '#3a2a1c', 80, 64),
      neck: neck('#eab08a', 74),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -420, 176, 196, 8), '#5a6e86'); belt(c, J, -630);
        part(c, smooth([R([-150, -900]), R([-60, -1000]), R([60, -1000]), R([150, -900]), R([0, -840])]), '#a23a2c'); },
      arms: (c, J, hs) => arms(c, J, hs, '#5a6e86', '#eab08a', 66),
    },
    // Hugh's wife: ankle-length kirtle (madder-dyed), linen apron, sleeves pushed up for work.
    kirtle: {
      legs: (c, J) => feetOnly(c, J, '#3a2a1c'),
      neck: neck('#eeb48c', 60),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -30, 150, 220, 16), '#9a4a3e');
        part(c, smooth([R([-110, -680]), R([110, -680]), R([140, -100]), R([0, -86]), R([-140, -100])]), '#e9e1cf', 4); stroke(c, [R([-150, -680]), R([150, -680])], 8, '#e9e1cf'); },
      arms: (c, J, hs) => { arms(c, J, hs, '#9a4a3e', '#eeb48c', 56);
        for (const [el, wr] of [[J.elL, J.wrL], [J.elR, J.wrR]]) part(c, limb([lerp(el[0], wr[0], .35), lerp(el[1], wr[1], .35)], wr, 46, 42), '#eeb48c'); },
    },
    kidTunic: {   // draw children with a smaller figure scale (×0.62)
      legs: (c, J) => legs(c, J, '#e8b088', '#3a2a1c', 74, 60),
      neck: neck('#f2bd96', 64),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -470, 150, 168, 4), '#b8a070'); stroke(c, [R([-150, -640]), R([150, -640])], 10, '#6a4a2a'); },
      arms: (c, J, hs) => arms(c, J, hs, '#b8a070', '#f2bd96', 58),
    },
    kidDress: {
      legs: (c, J) => feetOnly(c, J, '#3a2a1c'),
      neck: neck('#f2bd96', 60),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -40, 140, 190, 10), '#6a7a9a'); },
      arms: (c, J, hs) => arms(c, J, hs, '#6a7a9a', '#f2bd96', 54),
    },
    // Edward III: crimson robe, ermine collar, gold-trimmed mantle.
    royal: {
      legs: (c, J) => feetOnly(c, J, '#3a1a1a'),
      neck: neck('#eeb894', 66),
      behind: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-190, -940]), R([190, -940]), R([290, -20]), R([-290, -20])]), '#2f4a8a'); },   // blue mantle behind
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -24, 176, 230, 12), '#a8282e');
        stroke(c, [R([-180, -540]), R([180, -540])], 12, '#e3b23c'); stroke(c, [R([0, -530]), R([0, -40])], 6, '#e3b23c'); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, smooth([R([-190, -900]), R([-80, -1000]), R([80, -1000]), R([190, -900]), R([100, -850]), R([0, -836]), R([-100, -850])]), '#f4efe4');
        c.fillStyle = INK; for (const [x, y] of [[-120, -900], [-50, -930], [20, -880], [90, -930], [140, -890], [-10, -960]]) { const p = R([x, y]); c.beginPath(); c.moveTo(p[0], p[1] - 9); c.lineTo(p[0] + 5, p[1] + 7); c.lineTo(p[0] - 5, p[1] + 7); c.fill(); } },
      arms: (c, J, hs) => arms(c, J, hs, '#a8282e', '#eeb894', 70, '#f4efe4', 18),
    },
    advisorGown: {
      legs: (c, J) => legs(c, J, '#3a3a40', '#1f1f21'),
      neck: neck('#eab28c', 66),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -962, -380, 166, 200, 10), '#7a6a8a'); stroke(c, [R([0, -960]), R([0, -390])], 3.5, 'rgba(29,26,23,.4)'); belt(c, J, -640, '#3a2a3a', '#c9a14a'); },
      arms: (c, J, hs) => arms(c, J, hs, '#7a6a8a', '#eab28c', 66, null, 10),
    },
  });
})(window);
