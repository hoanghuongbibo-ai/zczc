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
  };
  G.Venice = Object.assign(G.Venice || {}, { lagoon, hats, WATER, WATER_D, FOAM });
})(window);
