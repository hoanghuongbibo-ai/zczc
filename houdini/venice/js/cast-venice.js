/* Venice series cast — original designs in the house style (same image-space units as js/chars.js heads).
 *  - chronicler: the medieval Venetian monk-scribe who tells the city's "tidy" official story (tonsure, brown habit).
 *  - Lagoon: the water itself as a character (eyes peeking out of the waves) who changes hats with each job. */
(function (G) {
  'use strict';
  const C = G.Chars, { part, stroke, smooth, poly, rot, limb } = C, face = C.castFace, browSet = C.browSet;
  const O = [266, 1461], L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);
  const HABIT = '#7a5434', HABIT_D = '#5e3f25', SKIN = '#efbf98', HAIR = '#6a4a30';

  // Chronicler: round, well-fed face, monk's tonsure (bald crown, fringe of hair), a pleased little smile.
  function chronicler(ctx, f = {}) {
    face(ctx, f, {
      skin: SKIN, ear: [362, 330], cheek: [[212, 366], [312, 368]],
      face: [[184, 214], [322, 206], [352, 264], [358, 342], [332, 416], [286, 450], [240, 452], [204, 436], [184, 400], [170, 336], [168, 272]],
      hair: c => {
        part(c, smooth(L([[164, 330], [160, 262], [180, 222], [204, 240], [196, 300], [188, 340]])), HAIR, 4);
        part(c, smooth(L([[364, 330], [370, 262], [352, 222], [328, 240], [336, 300], [342, 340]])), HAIR, 4);
        part(c, smooth(L([[192, 236], [228, 218], [266, 214], [304, 218], [340, 236], [330, 252], [266, 240], [202, 252]])), HAIR, 4); // fringe
        stroke(c, L([[226, 196], [266, 186], [306, 196]]), 3, 'rgba(255,255,255,.35)');                                          // shine on the bald crown
        stroke(c, L([[222, 446], [260, 458], [300, 446]]), 3, 'rgba(29,26,23,.35)');                                              // double chin
      },
      eyes: [[222, 310, 19, 20], [294, 314, 20, 21]], pupil: 7,
      brows: browSet([[202, 280], [222, 272], [242, 280]], [[274, 284], [294, 276], [314, 284]]), browW: 7, browC: HAIR,
      nose: [[258, 322], [246, 360], [266, 364]],
      mouth: [260, 404, 18],
    });
  }
  Object.assign(C.HEADS, { chronicler });

  const legsPair = (ctx, J, cloth, shoe, w1, w2) => {
    for (const [hip, knee, ank] of [[C.SK.hipL, J.kneeL, J.ankL], [C.SK.hipR, J.kneeR, J.ankR]]) {
      part(ctx, limb(hip, knee, w1, w2 + 6), cloth); part(ctx, limb(knee, ank, w2 + 6, w2), cloth);
      if (shoe) part(ctx, smooth([[ank[0] - 44, ank[1] + 6], [ank[0] + 38, ank[1] + 2], [ank[0] + 52, ank[1] + 38], [ank[0] - 52, ank[1] + 42]]), shoe);
    }
  };
  const arms = (ctx, J, hs, sleeve, skin, w) => {
    for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]), cx = Math.cos(dir), cy = Math.sin(dir);
      part(ctx, limb(sh, el, w, w + 4), sleeve); part(ctx, limb(el, [wr[0] - cx * 6, wr[1] - cy * 6], w + 4, w + 18), sleeve);   // wide monk's sleeve
      C.hand(ctx, [wr[0] + cx * 4, wr[1] + cy * 4], dir, hs[side] || 'open', skin, .95);
    }
  };
  const body = (J, top, hem, wTop, wHem) => { const R = p => rot(p, J.P, J.lean);
    return c => { c.moveTo(...R([-62, top - 22])); c.lineTo(...R([62, top - 22])); c.quadraticCurveTo(...R([wTop - 10, top - 6]), ...R([wTop, top + 46])); c.lineTo(...R([wHem, hem])); c.lineTo(...R([-wHem, hem])); c.lineTo(...R([-wTop, top + 46])); c.quadraticCurveTo(...R([-wTop + 10, top - 6]), ...R([-62, top - 22])); c.closePath(); }; };
  Object.assign(C.OUTFITS, {
    habit: { // long brown habit, rope belt, hood folded on the shoulders, sandals under the hem
      legs: (c, J) => legsPair(c, J, SKIN, '#5a3a22', 50, 42),
      neck: (c, J) => part(c, limb(rot([0, -1012], J.P, J.lean), rot([0, -962], J.P, J.lean), 70, 74), SKIN),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, body(J, -958, -70, 175, 215), HABIT);
        stroke(c, [R([-60, -900]), R([-80, -120])], 3, 'rgba(29,26,23,.25)'); stroke(c, [R([70, -890]), R([90, -120])], 3, 'rgba(29,26,23,.25)');
        stroke(c, [R([-172, -640]), R([172, -640])], 12, '#d9c79a'); stroke(c, [R([40, -640]), R([60, -470])], 9, '#d9c79a'); part(c, cc => cc.arc(...R([62, -462]), 12, 0, Math.PI * 2), '#d9c79a', 3.5); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-150, -940]), R([0, -880]), R([150, -940]), R([120, -990]), R([0, -950]), R([-120, -990])]), HABIT_D, 4.5); },
      arms: (c, J, hs) => arms(c, J, hs, HABIT, SKIN, 66),
    },
  });

  // ---------- the Lagoon ----------
  // Drawn at (x, y) = centre of the water line, width w. o: { look:[x,y], eyes (0..1), hat: fn(ctx, x, y, s), mouth }
  const WATER = '#3f8ea6', WATER_D = '#2f6f86', FOAM = '#d9eef0';
  function lagoon(ctx, x, y, w, t, o = {}) {
    const s = w / 600, T = G.Toon;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const crest = (yy, amp, ph, col, lw) => T.shape(ctx, col, lw, c => { c.moveTo(-340, 400); c.lineTo(-340, yy);
      for (let i = 0; i <= 16; i++) { const xx = -340 + i * 42.5; c.lineTo(xx, yy + Math.sin(i * 1.1 + t * 1.6 + ph) * amp); } c.lineTo(340, 400); c.closePath(); });
    // body: a soft dome of water rising out of the waves
    T.shape(ctx, WATER, 5, T.smooth([[-230, 60], [-200, -60], [-110, -140], [0, -160], [110, -140], [200, -60], [230, 60]]));
    T.shape(ctx, 'rgba(255,255,255,.18)', 0, T.smooth([[-150, -70], [-100, -120], [-30, -138], [-60, -110], [-120, -60]]));
    const lk = o.look || [0, 0], open = o.eyes ?? 1;
    for (const ex of [-62, 62]) {
      T.shape(ctx, '#fbf0db', 4.5, T.ellipse(ex, -62, 30, 34 * Math.max(open, .07)));
      if (open > .15) { ctx.fillStyle = '#1d1a17'; ctx.beginPath(); ctx.arc(ex + lk[0] * 13, -62 + lk[1] * 12, 11, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + lk[0] * 13 + 4, -62 + lk[1] * 12 - 4, 3.5, 0, 7); ctx.fill(); }
      else T.line(ctx, [[ex - 28, -62], [ex, -54], [ex + 28, -62]], 4.5);
    }
    if (o.mouth === 'smile') T.line(ctx, [[-30, -10], [0, 6], [30, -10]], 4.5);
    else if (o.mouth === 'o') T.shape(ctx, '#1f4a5a', 4, T.ellipse(0, -6, 12, 15));
    if (o.hat) o.hat(ctx, 0, -150);
    crest(10, 9, 0, WATER_D, 5); crest(40, 7, 2, WATER, 5);
    for (let i = 0; i < 6; i++) { const xx = -280 + i * 110 + Math.sin(t + i) * 8; T.line(ctx, [[xx, 26 + (i % 2) * 22], [xx + 34, 26 + (i % 2) * 22]], 4, FOAM); }
    ctx.restore();
  }
  // Job hats (drawn centred on the lagoon's crown, y up = negative)
  const hats = {
    helmet(ctx, x, y) { const T = G.Toon; // iron kettle-hat: a soldier's helmet with a wide brim
      T.shape(ctx, '#8b929a', 5, c => { c.ellipse(x, y + 26, 150, 26, 0, 0, Math.PI * 2); });
      T.shape(ctx, '#a7aeb6', 5, c => { c.moveTo(x - 92, y + 22); c.bezierCurveTo(x - 92, y - 70, x + 92, y - 70, x + 92, y + 22); c.closePath(); });
      T.line(ctx, [[x, y - 44], [x, y + 18]], 5, '#6f767e'); T.shape(ctx, 'rgba(255,255,255,.35)', 0, T.ellipse(x - 40, y - 18, 16, 26, -.5));
    },
    hardhat(ctx, x, y) { const T = G.Toon; // job two: a builder's hard hat
      T.shape(ctx, '#f2b632', 5, c => { c.ellipse(x, y + 26, 140, 22, 0, 0, Math.PI * 2); });
      T.shape(ctx, '#f6c945', 5, c => { c.moveTo(x - 96, y + 24); c.bezierCurveTo(x - 96, y - 80, x + 96, y - 80, x + 96, y + 24); c.closePath(); });
      T.shape(ctx, '#e0a422', 4, c => c.roundRect(x - 16, y - 58, 32, 80, 10)); T.shape(ctx, 'rgba(255,255,255,.4)', 0, T.ellipse(x - 50, y - 16, 14, 24, -.5));
    },
    captain(ctx, x, y) { const T = G.Toon; // job three: a ship captain's cap
      T.shape(ctx, '#1f2f4f', 5, c => { c.moveTo(x - 110, y + 28); c.quadraticCurveTo(x, y + 60, x + 30, y + 30); c.lineTo(x - 110, y + 28); c.closePath(); });
      T.shape(ctx, '#f4efe2', 5, c => { c.moveTo(x - 100, y + 20); c.lineTo(x - 120, y - 40); c.quadraticCurveTo(x, y - 80, x + 120, y - 40); c.lineTo(x + 100, y + 20); c.closePath(); });
      T.shape(ctx, '#1f2f4f', 4, c => c.rect(x - 100, y - 4, 200, 26)); T.shape(ctx, '#e8c14a', 3.5, T.circle(x, y + 8, 14));
    },
    mask(ctx, x, y) { const T = G.Toon; // job four: a Carnival mask
      T.shape(ctx, '#f4efe2', 5, c => { c.moveTo(x - 120, y); c.quadraticCurveTo(x - 110, y - 50, x - 40, y - 46); c.quadraticCurveTo(x, y - 30, x + 40, y - 46); c.quadraticCurveTo(x + 110, y - 50, x + 120, y); c.quadraticCurveTo(x + 60, y + 50, x, y + 20); c.quadraticCurveTo(x - 60, y + 50, x - 120, y); c.closePath(); });
      for (const d of [-1, 1]) T.shape(ctx, '#1d1a17', 0, T.ellipse(x + d * 52, y - 8, 24, 12, d * .2));
      T.shape(ctx, '#c0303e', 3.5, c => { c.moveTo(x + 90, y - 30); c.quadraticCurveTo(x + 150, y - 120, x + 120, y - 160); c.quadraticCurveTo(x + 110, y - 90, x + 70, y - 40); c.closePath(); });
      for (let i = -3; i <= 3; i++) T.shape(ctx, '#e8c14a', 0, T.circle(x + i * 22, y - 36 + Math.abs(i) * 3, 5));
    },
    lifering(ctx, x, y) { const T = G.Toon; // job five: a life ring
      T.shape(ctx, '#f4efe2', 5, c => { c.arc(x, y - 10, 80, 0, Math.PI * 2); c.arc(x, y - 10, 38, 0, Math.PI * 2, true); });
      for (let i = 0; i < 4; i++) T.shape(ctx, '#d8402e', 4, c => { const a0 = i * Math.PI / 2 + .3, a1 = a0 + .7; c.arc(x, y - 10, 80, a0, a1); c.arc(x, y - 10, 38, a1, a0, true); c.closePath(); });
    },
  };

  // ---------- more cast ----------
  // Cassiodorus: senior Roman official — receding grey hair, short neat grey beard, long nose, tired clever eyes.
  function cassiodorus(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e8b48e', ear: [362, 332], lids: true,
      face: [[186, 210], [320, 204], [350, 262], [356, 342], [330, 414], [286, 448], [240, 452], [206, 436], [186, 400], [172, 334], [170, 270]],
      hair: c => { part(c, smooth(L([[166, 340], [160, 262], [176, 222], [206, 214], [196, 260], [190, 330]])), '#cfcac0', 4);
        part(c, smooth(L([[364, 340], [370, 262], [352, 222], [324, 214], [334, 260], [340, 330]])), '#cfcac0', 4);
        part(c, smooth(L([[190, 380], [194, 432], [236, 470], [290, 470], [334, 430], [340, 380], [312, 410], [286, 424], [262, 420], [240, 424], [214, 410]])), '#cfcac0', 4); },
      eyes: [[222, 306, 18, 19], [294, 310, 19, 20]], pupil: 7,
      brows: browSet([[200, 276], [222, 268], [244, 276]], [[272, 280], [294, 272], [316, 280]]), browW: 8, browC: '#9a958c',
      nose: [[256, 312], [238, 372], [266, 376]],
      mouth: [260, 400, 15],
    });
  }
  // Lagoon villagers: a young fisherman in a knitted cap, an older bearded man, a woman in a headscarf.
  function fisher(ctx, f = {}) {
    face(ctx, f, {
      skin: '#d99e74', ear: [362, 330], cheek: [[212, 366], [312, 368]],
      face: [[186, 214], [320, 206], [350, 264], [354, 340], [328, 412], [284, 444], [240, 448], [206, 432], [186, 398], [172, 336], [170, 274]],
      hair: c => { part(c, smooth(L([[164, 300], [160, 230], [200, 176], [266, 160], [332, 176], [372, 230], [368, 300], [330, 262], [266, 252], [200, 262]])), '#b8432f', 4);
        stroke(c, L([[176, 270], [266, 244], [356, 270]]), 4, 'rgba(29,26,23,.35)'); },
      eyes: [[222, 306, 18, 19], [292, 310, 19, 20]], pupil: 7,
      brows: browSet([[202, 278], [222, 270], [242, 278]], [[272, 282], [292, 274], [312, 282]]), browW: 7, browC: '#4a3020',
      nose: [[258, 318], [248, 352], [266, 356]], mouth: [260, 398, 16],
    });
  }
  function elder(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e3ad86', ear: [362, 330],
      face: [[186, 212], [320, 204], [350, 262], [356, 340], [330, 414], [286, 448], [240, 452], [206, 436], [186, 400], [172, 334], [170, 270]],
      hair: c => { part(c, smooth(L([[164, 330], [160, 240], [196, 190], [266, 176], [336, 190], [370, 240], [366, 330], [340, 250], [266, 232], [192, 250]])), '#5a4a3a', 4);
        part(c, smooth(L([[192, 372], [196, 446], [240, 492], [292, 492], [336, 446], [340, 372], [300, 404], [262, 410], [226, 404]])), '#5a4a3a', 4); },
      eyes: [[222, 306, 17, 18], [294, 310, 18, 19]], pupil: 7,
      brows: browSet([[200, 276], [222, 266], [244, 276]], [[272, 280], [294, 270], [316, 280]]), browW: 9, browC: '#3a2e24',
      nose: [[256, 314], [244, 362], [266, 366]], mouth: [260, 392, 14],
    });
  }
  function villagerW(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e6b08a', ear: [362, 330], cheek: [[214, 362], [310, 366]],
      back: c => part(c, smooth(L([[150, 440], [146, 300], [176, 200], [266, 166], [356, 200], [386, 300], [382, 440], [300, 470], [230, 470]])), '#c8b07a'),
      face: [[190, 220], [316, 214], [344, 270], [348, 344], [320, 410], [280, 438], [240, 442], [208, 428], [188, 394], [176, 336], [174, 278]],
      hair: c => { part(c, smooth(L([[170, 300], [168, 226], [210, 186], [266, 176], [322, 186], [364, 226], [362, 300], [330, 252], [266, 238], [202, 252]])), '#d8c08a', 4);
        stroke(c, L([[200, 252], [266, 238], [332, 252]]), 7, '#3a2a20'); },
      eyes: [[224, 310, 19, 21], [292, 314, 20, 22]], pupil: 7,
      brows: browSet([[204, 278], [224, 270], [244, 278]], [[274, 282], [292, 274], [312, 282]]), browW: 6, browC: '#3a2a20',
      nose: [[258, 322], [252, 350], [264, 354]], mouth: [258, 392, 13], lip: '#b04a44',
    });
  }
  // Pepin of Italy: young king, gold crown, fair hair, Frankish moustache.
  function pepin(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f0c09a', ear: [362, 330],
      face: [[186, 214], [320, 206], [350, 264], [354, 340], [328, 414], [284, 446], [240, 450], [206, 434], [186, 398], [172, 336], [170, 274]],
      hair: c => { part(c, smooth(L([[160, 400], [150, 290], [170, 220], [230, 190], [266, 186], [302, 190], [362, 220], [382, 290], [372, 400], [348, 330], [330, 250], [266, 236], [202, 250], [184, 330]])), '#d8a848', 4);
        part(c, poly(L([[186, 236], [186, 160], [214, 196], [240, 146], [266, 192], [292, 146], [318, 196], [346, 160], [346, 236]])), '#e8c14a', 4.5);
        for (const x of [228, 266, 304]) part(c, cc => cc.arc(x - O[0], 216 - O[1], 7, 0, Math.PI * 2), '#c0303e', 3); },
      eyes: [[222, 306, 18, 19], [292, 310, 19, 20]], pupil: 7,
      brows: browSet([[202, 278], [222, 270], [242, 278]], [[272, 282], [292, 274], [312, 282]]), browW: 7, browC: '#a8782a',
      nose: [[258, 318], [246, 356], [266, 360]], mouth: [260, 404, 16],
      front: c => part(c, smooth(L([[206, 392], [236, 376], [260, 384], [284, 376], [314, 392], [290, 388], [260, 394], [230, 388]])), '#c89a3a', 4),
    });
  }
  Object.assign(C.HEADS, { cassiodorus, fisher, elder, villagerW, pepin });

  const tunic = (cloth, trim, skin, legsC, w = 66, hem = -330) => ({
    legs: (c, J) => legsPair(c, J, legsC || skin, '#4a3420', 52, 44),
    neck: (c, J) => part(c, limb(rot([0, -1012], J.P, J.lean), rot([0, -962], J.P, J.lean), 68, 72), skin),
    torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, body(J, -956, hem, 160, 190), cloth);
      if (trim) { stroke(c, [R([-180, hem + 14]), R([180, hem + 14])], 10, trim); stroke(c, [R([-150, -640]), R([150, -640])], 10, trim); } },
    collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-60, -968]), R([0, -920]), R([60, -968]), R([50, -950]), R([0, -904]), R([-50, -950])]), cloth, 4); },
    arms: (c, J, hs) => { for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]), cx = Math.cos(dir), cy = Math.sin(dir);
      part(c, limb(sh, el, w, w - 6), cloth); part(c, limb(el, [wr[0] - cx * 8, wr[1] - cy * 8], w - 6, w - 14), cloth);
      C.hand(c, [wr[0] + cx * 4, wr[1] + cy * 4], dir, hs[side] || 'open', skin, .95); } },
  });
  Object.assign(C.OUTFITS, {
    roman: Object.assign(tunic('#efe8d8', null, '#e8b48e', '#e8b48e', 66, -120), { // white tunic, purple stripes, red cloak with a gold brooch
      front: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, smooth([R([-175, -935]), R([-40, -965]), R([60, -930]), R([-30, -700]), R([-120, -560]), R([-185, -640])]), '#9a3a30', 4.5);
        part(c, cc => cc.arc(...R([40, -930]), 15, 0, Math.PI * 2), '#e8c14a', 4); } }),
    tunicPoor: tunic('#8a6a4a', null, '#d99e74', '#d99e74'),
    tunicElder: tunic('#4f6a8a', '#d8c08a', '#e3ad86', '#5a4632'),
    dressPlain: tunic('#7a8a5a', null, '#e6b08a', '#e6b08a', 60, -120),
    king: Object.assign(tunic('#2f4f8a', '#e8c14a', '#f0c09a', '#5a3a2a'), {
      behind: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-190, -960]), R([190, -960]), R([240, -200]), R([0, -160]), R([-240, -200])]), '#a8322a'); } }),
  });

  // ---------- Job three cast ----------
  // A Venetian merchant: red cap (beretta), trimmed dark beard, shrewd friendly eyes.
  function merchant(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e8b48e', ear: [362, 330], cheek: [[212, 366], [312, 368]],
      face: [[186, 214], [320, 206], [350, 264], [354, 340], [328, 412], [284, 446], [240, 450], [206, 434], [186, 398], [172, 336], [170, 274]],
      hair: c => { part(c, smooth(L([[166, 330], [164, 262], [190, 240], [200, 300], [194, 340]])), '#3a2a20', 4); part(c, smooth(L([[364, 330], [368, 262], [342, 240], [334, 300], [340, 340]])), '#3a2a20', 4);
        part(c, smooth(L([[196, 392], [206, 450], [262, 486], [318, 450], [330, 392], [300, 420], [262, 428], [226, 420]])), '#3a2a20', 4);
        part(c, smooth(L([[150, 262], [160, 180], [230, 140], [300, 140], [370, 180], [384, 262], [330, 244], [266, 236], [200, 244]])), '#b8322a', 4.5); stroke(c, L([[160, 252], [376, 252]]), 7, '#8a1f1a'); },
      eyes: [[222, 306, 18, 19], [294, 310, 19, 20]], pupil: 7,
      brows: browSet([[202, 278], [222, 270], [242, 278]], [[272, 282], [292, 274], [312, 282]]), browW: 8, browC: '#3a2a20',
      nose: [[258, 318], [244, 360], [266, 364]], mouth: [260, 402, 15],
    });
  }
  // The Byzantine emperor: tall jewelled crown with hanging pendants, full dark beard.
  function emperor(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e3ad86', ear: [362, 330],
      face: [[186, 214], [320, 206], [350, 264], [354, 340], [328, 412], [284, 446], [240, 450], [206, 434], [186, 398], [172, 336], [170, 274]],
      hair: c => { part(c, smooth(L([[190, 380], [192, 460], [240, 512], [292, 512], [340, 460], [342, 380], [304, 412], [262, 420], [226, 412]])), '#2a1e18', 4);
        part(c, smooth(L([[166, 330], [164, 262], [190, 240], [200, 300], [194, 340]])), '#2a1e18', 4); part(c, smooth(L([[364, 330], [368, 262], [342, 240], [334, 300], [340, 340]])), '#2a1e18', 4);
        part(c, poly(L([[180, 250], [190, 130], [342, 130], [352, 250]])), '#e8c14a', 4.5); for (const x of [214, 266, 318]) part(c, cc => cc.arc(x - O[0], 186 - O[1], 11, 0, Math.PI * 2), ['#c0303e', '#2f6aa8', '#2f8a4a'][(x / 52 | 0) % 3], 3);
        part(c, cc => cc.ellipse(266 - O[0], 126 - O[1], 80, 18, 0, 0, Math.PI * 2), '#e8c14a', 4); for (const x of [176, 356]) { stroke(c, L([[x, 250], [x, 330]]), 3, '#e8c14a'); part(c, cc => cc.arc(x - O[0], 336 - O[1], 7, 0, Math.PI * 2), '#f4efe2', 2.5); } },
      eyes: [[222, 306, 17, 18], [294, 310, 18, 19]], pupil: 7,
      brows: browSet([[200, 276], [222, 268], [244, 276]], [[272, 280], [294, 272], [316, 280]]), browW: 9, browC: '#2a1e18',
      nose: [[256, 314], [242, 362], [266, 366]], mouth: [260, 392, 14],
    });
  }
  // The visiting king of France (1574): dark hair, small pointed beard, a black velvet toque with a white plume.
  function kingFR(ctx, f = {}) {
    face(ctx, f, {
      skin: '#f0c4a0', ear: [362, 330],
      face: [[188, 216], [318, 208], [348, 266], [352, 342], [326, 412], [284, 444], [240, 448], [208, 432], [188, 396], [174, 336], [172, 276]],
      hair: c => { part(c, smooth(L([[166, 340], [164, 262], [192, 236], [204, 300], [196, 344]])), '#2a1e18', 4); part(c, smooth(L([[364, 340], [366, 262], [340, 236], [330, 300], [336, 344]])), '#2a1e18', 4);
        part(c, smooth(L([[236, 420], [248, 470], [262, 484], [276, 470], [288, 420], [262, 432]])), '#2a1e18', 3.5);
        part(c, smooth(L([[160, 250], [170, 190], [240, 168], [320, 172], [372, 206], [370, 252], [266, 240]])), '#1f1f2a', 4.5); stroke(c, L([[176, 246], [366, 246]]), 6, '#e8c14a');
        part(c, smooth(L([[320, 190], [376, 120], [408, 110], [388, 160], [346, 200]])), '#f8f8f4', 3.5); },
      eyes: [[222, 308, 18, 19], [292, 312, 19, 20]], pupil: 7,
      brows: browSet([[202, 280], [222, 272], [242, 280]], [[272, 284], [292, 276], [312, 284]]), browW: 7, browC: '#2a1e18',
      nose: [[258, 320], [248, 356], [266, 360]], mouth: [260, 402, 14],
      front: c => part(c, smooth(L([[220, 394], [244, 382], [262, 388], [280, 382], [304, 394], [282, 392], [262, 398], [242, 392]])), '#2a1e18', 3.5),
    });
  }
  Object.assign(C.HEADS, { merchant, emperor, kingFR });
  Object.assign(C.OUTFITS, {
    merchantRobe: Object.assign(tunic('#b8322a', '#e8c14a', '#e8b48e', '#3a2a20', 70, -150), { behind: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-180, -950]), R([180, -950]), R([220, -180]), R([0, -150]), R([-220, -180])]), '#8a1f1a'); } }),
    byzantine: Object.assign(tunic('#5a2a6a', '#e8c14a', '#e3ad86', '#3a2030', 70, -90), { front: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-50, -950]), R([50, -950]), R([40, -120]), R([-40, -120])]), '#e8c14a', 4); for (let y = -900; y > -160; y -= 70) part(c, cc => cc.arc(...R([0, y]), 10, 0, Math.PI * 2), ['#c0303e', '#2f6aa8'][(y / 70 | 0) & 1], 3); } }),
    frenchRoyal: Object.assign(tunic('#2f4f9a', '#e8c14a', '#f0c4a0', '#1f1f2a', 66, -380), { front: (c, J) => { const R = p => rot(p, J.P, J.lean); for (let i = 0; i < 6; i++) part(c, cc => cc.arc(...R([-90 + (i % 3) * 90, -860 + Math.floor(i / 3) * 160]), 9, 0, Math.PI * 2), '#e8c14a', 2.5); part(c, smooth([R([-70, -968]), R([0, -930]), R([70, -968]), R([70, -1010]), R([0, -990]), R([-70, -1010])]), '#f8f8f4', 3.5); } }),
  });

  // ---------- The bill cast ----------
  // Enrico Dandolo: very old, blind (pale, unfocused eyes), long white beard, the doge's horned cap over a linen coif.
  function dandolo(ctx, f = {}) {
    face(ctx, f, {
      skin: '#ecc0a0', ear: [362, 332], lids: true,
      face: [[188, 214], [318, 206], [348, 264], [352, 342], [326, 412], [284, 446], [240, 450], [208, 434], [188, 398], [174, 336], [172, 274]],
      hair: c => { part(c, smooth(L([[184, 380], [180, 470], [214, 540], [262, 566], [310, 540], [344, 470], [342, 380], [306, 416], [262, 426], [220, 416]])), '#f2f0ea', 4);
        part(c, smooth(L([[156, 380], [150, 270], [176, 220], [356, 220], [380, 270], [374, 380], [350, 300], [266, 284], [182, 300]])), '#f8f6f0', 4);
        part(c, smooth(L([[166, 250], [170, 170], [230, 126], [300, 120], [350, 136], [392, 96], [400, 150], [372, 196], [368, 250], [266, 236]])), '#e8c14a', 4.5);
        stroke(c, L([[170, 246], [368, 246]]), 7, '#c8a038'); for (let i = 0; i < 4; i++) stroke(c, L([[200 + i * 40, 236], [210 + i * 40, 160]]), 2.5, 'rgba(160,120,40,.6)'); },
      eyes: [[222, 310, 17, 13], [292, 314, 18, 13]], pupil: 4,
      brows: browSet([[200, 282], [222, 276], [244, 284]], [[272, 286], [294, 278], [316, 284]]), browW: 8, browC: '#e8e6e0',
      nose: [[256, 318], [242, 366], [266, 370]], mouth: [260, 404, 15],
      front: c => { stroke(c, L([[204, 334], [236, 340]]), 2.5, 'rgba(29,26,23,.35)'); stroke(c, L([[278, 340], [310, 334]]), 2.5, 'rgba(29,26,23,.35)'); stroke(c, L([[214, 262], [250, 258]]), 2, 'rgba(29,26,23,.3)'); },
    });
  }
  // A crusader knight of 1201: mail coif framing the face, short brown beard.
  function knight(ctx, f = {}) {
    face(ctx, f, {
      skin: '#e8b08a', ear: [362, 330],
      back: c => part(c, smooth(L([[150, 440], [146, 300], [176, 196], [266, 160], [356, 196], [386, 300], [382, 440], [300, 476], [230, 476]])), '#a8aeb6'),
      face: [[192, 226], [314, 220], [342, 272], [346, 344], [320, 410], [280, 440], [242, 444], [210, 430], [190, 396], [178, 338], [176, 280]],
      hair: c => { part(c, smooth(L([[204, 380], [210, 430], [262, 456], [314, 430], [322, 380], [292, 404], [262, 410], [232, 404]])), '#6a4a2a', 4);
        part(c, smooth(L([[172, 300], [170, 220], [214, 180], [266, 172], [318, 180], [362, 220], [360, 300], [330, 250], [266, 240], [202, 250]])), '#a8aeb6', 4);
        for (let i = 0; i < 6; i++) stroke(c, L([[190 + i * 30, 212], [196 + i * 30, 244]]), 2, 'rgba(29,26,23,.25)'); },
      eyes: [[224, 312, 18, 19], [292, 316, 19, 20]], pupil: 7,
      brows: browSet([[204, 282], [224, 274], [244, 282]], [[274, 286], [292, 278], [312, 286]]), browW: 8, browC: '#4a3020',
      nose: [[258, 322], [248, 356], [266, 360]], mouth: [260, 398, 15],
    });
  }
  // The young Byzantine prince (Alexios): smooth face, dark curls, a thin gold circlet.
  function prince(ctx, f = {}) {
    face(ctx, f, {
      skin: '#eab48c', ear: [360, 334], cheek: [[214, 366], [310, 368]],
      face: [[190, 222], [316, 214], [346, 270], [350, 344], [322, 410], [280, 438], [240, 442], [208, 428], [188, 394], [176, 336], [174, 278]],
      hair: c => { for (const [x, y, r] of [[176, 290, 28], [184, 236, 32], [222, 200, 34], [266, 190, 36], [310, 200, 34], [348, 236, 32], [356, 290, 28]]) part(c, cc => cc.arc(x - O[0], y - O[1], r, 0, Math.PI * 2), '#2a1e18', 4);
        part(c, smooth(L([[186, 252], [266, 236], [346, 252], [346, 236], [266, 220], [186, 236]])), '#e8c14a', 3.5); part(c, cc => cc.arc(266 - O[0], 230 - O[1], 8, 0, Math.PI * 2), '#c0303e', 3); },
      eyes: [[224, 312, 20, 21], [292, 316, 21, 22]], pupil: 8,
      brows: browSet([[204, 280], [224, 272], [244, 280]], [[274, 284], [292, 276], [312, 284]]), browW: 6, browC: '#2a1e18',
      nose: [[258, 322], [250, 352], [264, 356]], mouth: [260, 396, 14],
    });
  }
  Object.assign(C.HEADS, { dandolo, knight, prince });
  Object.assign(C.OUTFITS, {
    doge: Object.assign(tunic('#d8a838', '#f4efe2', '#ecc0a0', '#7a5434', 72, -60), {
      behind: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-200, -960]), R([200, -960]), R([250, -80]), R([0, -40]), R([-250, -80])]), '#c8962a'); },
      front: (c, J) => { const R = p => rot(p, J.P, J.lean); for (let i = 0; i < 10; i++) part(c, cc => cc.arc(...R([-120 + (i % 4) * 80, -820 + Math.floor(i / 4) * 160]), 10, 0, Math.PI * 2), '#f0d070', 2.5);
        part(c, smooth([R([-190, -960]), R([0, -900]), R([190, -960]), R([170, -800]), R([0, -760]), R([-170, -800])]), '#f8f6f0', 4); for (const [x, y] of [[-120, -860], [0, -800], [110, -860]]) part(c, cc => cc.arc(...R([x, y]), 6, 0, Math.PI * 2), '#1d1a17', 0); } }),
    crusader: Object.assign(tunic('#f4efe2', null, '#e8b08a', '#8a8f96', 68, -300), {
      front: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-24, -900]), R([24, -900]), R([24, -560]), R([-24, -560])]), '#c0303e', 3.5); part(c, poly([R([-110, -800]), R([110, -800]), R([110, -750]), R([-110, -750])]), '#c0303e', 3.5); stroke(c, [R([-170, -620]), R([170, -620])], 10, '#6a4a2a'); } }),
    princeRobe: Object.assign(tunic('#2f6aa8', '#e8c14a', '#eab48c', '#2a2a3a', 66, -200), { front: (c, J) => { const R = p => rot(p, J.P, J.lean); stroke(c, [R([0, -950]), R([0, -220])], 14, '#e8c14a'); } }),
  });
  G.Venice = Object.assign(G.Venice || {}, { lagoon, hats, WATER, WATER_D, FOAM });
})(window);
