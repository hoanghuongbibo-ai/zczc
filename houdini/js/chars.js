/* Posable characters drawn in the supplied art's style: thick dark outlines,
 * flat fills, soft secondary shading, long faces, big round eyes, wiry limbs.
 *
 * Houdini is rebuilt from the supplied suit image so he can change outfit, pose
 * and expression while staying the same person. Coordinates are in that image's
 * pixel units with the origin between the feet (x right, y up negative); a full
 * figure is ~1460 units tall, so draw with a scale (e.g. 0.4).
 *
 * pose = {
 *   outfit: 'suit' | 'straitjacket' | 'swim' | 'gown' | <cast outfit>,
 *   head: <head fn key>, lean (rad, torso around pelvis), headTilt (rad),
 *   hands: { L: [x,y], R: [x,y] }  — targets in figure space (IK),
 *   feet:  { L: [x,y], R: [x,y] },
 *   handShape: { L, R } 'open' | 'fist' | 'steeple' | 'point',
 *   face: { eyes: 0..1 open, look: [x,y], brows: 'smug'|'calm'|'worried'|'strain'|'up', mouth: 'smirk'|'flat'|'o'|'grit'|'frown'|'smile' },
 *   breathe (0..1)
 * }
 */
(function (G) {
  'use strict';
  const INK = '#1d1a17', LW = 5.5;
  const lerp = (a, b, k) => a + (b - a) * k;

  // ---------- drawing primitives ----------
  // Fill a path with a clean outer outline (stroke underneath at double width).
  function part(ctx, path, fill, lw = LW) {
    ctx.beginPath(); path(ctx);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (lw) { ctx.lineWidth = lw * 2; ctx.strokeStyle = INK; ctx.stroke(); }
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  }
  function stroke(ctx, pts, w = 4, color = INK) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    if (pts.length === 3) ctx.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]);
    else for (const p of pts.slice(1)) ctx.lineTo(p[0], p[1]);
    ctx.lineWidth = w; ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  }
  const smooth = (pts, closed = true) => c => {
    const n = pts.length, P = i => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
    c.moveTo(pts[0][0], pts[0][1]);
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      c.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
    }
    if (closed) c.closePath();
  };
  const poly = pts => c => { c.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) c.lineTo(p[0], p[1]); c.closePath(); };
  // Tapered limb segment with round ends.
  const limb = (a, b, w1, w2) => c => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, ang = Math.atan2(dy, dx);
    c.moveTo(a[0] + nx * w1 / 2, a[1] + ny * w1 / 2); c.lineTo(b[0] + nx * w2 / 2, b[1] + ny * w2 / 2);
    c.arc(b[0], b[1], w2 / 2, ang + Math.PI / 2, ang - Math.PI / 2, true);
    c.lineTo(a[0] - nx * w1 / 2, a[1] - ny * w1 / 2);
    c.arc(a[0], a[1], w1 / 2, ang - Math.PI / 2, ang + Math.PI / 2, true); c.closePath();
  };
  // Two-bone IK: returns the middle joint for a limb from a toward target, bending to `bend` side (±1).
  function ik(a, target, l1, l2, bend) {
    const dx = target[0] - a[0], dy = target[1] - a[1], d = Math.min(Math.hypot(dx, dy), l1 + l2 - .5), th = Math.atan2(dy, dx);
    const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)))) * bend;
    const mid = [a[0] + Math.cos(th + al) * l1, a[1] + Math.sin(th + al) * l1];
    const end = [a[0] + Math.cos(th) * d, a[1] + Math.sin(th) * d];
    return [mid, end];
  }
  const rot = (p, o, a) => { const c = Math.cos(a), s = Math.sin(a), x = p[0] - o[0], y = p[1] - o[1]; return [o[0] + x * c - y * s, o[1] + x * s + y * c]; };

  // ---------- hands ----------
  function hand(ctx, at, dir, shape, skin, size = 1) {
    ctx.save(); ctx.translate(at[0], at[1]); ctx.rotate(dir - Math.PI / 2); ctx.scale(size, size);  // local +y points along the forearm
    if (shape === 'fist') {
      part(ctx, smooth([[-26, -6], [24, -8], [30, 26], [16, 46], [-18, 46], [-30, 24]]), skin);
      stroke(ctx, [[-14, 24], [20, 24]], 3); stroke(ctx, [[-12, 36], [18, 36]], 3);
    } else if (shape === 'point') {
      part(ctx, smooth([[-24, -6], [22, -8], [28, 24], [12, 40], [-20, 38], [-28, 18]]), skin);
      part(ctx, smooth([[-6, 30], [6, 30], [8, 92], [-6, 94]]), skin, 4.5);
    } else { // open / relaxed: palm + four fingers + thumb
      part(ctx, smooth([[-26, -6], [24, -8], [30, 30], [-28, 30]]), skin);
      for (const [fx, len] of [[-20, 48], [-7, 58], [7, 56], [20, 46]]) part(ctx, smooth([[fx - 7, 22], [fx + 7, 22], [fx + 6, 22 + len], [fx - 5, 22 + len]]), skin, 4);
      part(ctx, smooth([[22, 0], [44, 14], [50, 42], [38, 46], [24, 24]]), skin, 4);
    }
    ctx.restore();
  }

  function steeple(ctx, J, skin) {
    const mx = (J.wrL[0] + J.wrR[0]) / 2, my = (J.wrL[1] + J.wrR[1]) / 2;
    ctx.save(); ctx.translate(mx, my); ctx.rotate(J.lean);
    for (const s of [-1, 1]) {
      part(ctx, smooth([[s * 46, 30], [s * 52, -10], [s * 30, -60], [s * 4, -128], [s * 2, -60], [s * 10, 20]]), skin);   // palm + fingers rising to the apex
      for (const k of [0, 1, 2]) stroke(ctx, [[s * (34 - k * 9), -16 - k * 8], [s * (8 + k * 2), -96 + k * 18]], 2.5, 'rgba(29,26,23,.45)');
      part(ctx, smooth([[s * 40, 10], [s * 22, -20], [s * 10, -10], [s * 22, 22]]), skin, 4);                         // thumbs
    }
    ctx.restore();
  }

  // ---------- Houdini's head (geometry measured from the supplied suit art) ----------
  const O = [266, 1461];                                        // image origin → figure origin (between the feet)
  const L = pts => pts.map(([x, y]) => [x - O[0], y - O[1]]);
  const HEAD = {
    neck: [250 - O[0], 452 - O[1]],
    hair: L([[96, 248], [64, 214], [68, 160], [92, 118], [94, 44], [146, 76], [196, 44], [214, 8], [282, 12], [318, 46], [372, 40], [432, 38], [450, 86], [480, 108], [470, 166], [484, 212], [436, 244], [424, 300], [400, 352], [364, 392], [336, 380], [344, 300], [330, 232], [270, 172], [200, 176], [164, 214], [150, 254], [122, 264]]),
    face: L([[176, 202], [326, 186], [352, 244], [366, 326], [338, 408], [292, 438], [244, 452], [208, 446], [184, 414], [166, 344], [160, 272]]),
    ear: [378 - O[0], 320 - O[1]],
    eyeL: [196 - O[0], 285 - O[1], 31, 27], eyeR: [277 - O[0], 291 - O[1], 32, 26],
    pupilL: [176 - O[0], 274 - O[1]], pupilR: [257 - O[0], 280 - O[1]],
    fringe: [L([[168, 220], [196, 176], [246, 168], [226, 196], [204, 214]]), L([[236, 190], [270, 164], [318, 176], [300, 196], [266, 200]])],
  };
  const HOOKS = [ // each a curl that flicks outward, in image coords
    [[96, 120], [70, 76], [86, 58], [110, 92], [120, 120]],          // top-left hook
    [[200, 50], [222, 6], [262, 0], [236, 22], [226, 56]],           // crown spike
    [[300, 40], [340, 20], [356, 34], [330, 52]],
    [[420, 60], [450, 30], [470, 50], [452, 80]],                    // top-right curl
    [[452, 120], [492, 108], [500, 132], [470, 150]],                // right flick
    [[60, 210], [34, 196], [40, 180], [74, 186]],                    // left flick
    [[440, 220], [480, 236], [470, 258], [440, 250]],
  ];
  const HCOL = { skin: '#eeaa7b', skinShade: '#d98f62', hair: '#3a2a20', hairHi: '#5d4535', white: '#fbf0db' };

  function eye(ctx, e, p, face, browCut) {
    const [x, y, rx, ry] = e, open = face.eyes ?? 1;
    ctx.save();
    part(ctx, c => c.ellipse(x, y, rx, ry * Math.max(open, .06), 0, 0, Math.PI * 2), HCOL.white, 4.5);
    if (open > .15) {
      ctx.beginPath(); ctx.ellipse(x, y, rx, ry * open, 0, 0, Math.PI * 2); ctx.clip();
      const lk = face.look || [0, 0];
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(p[0] + lk[0] * rx * .5, p[1] + lk[1] * ry * .45, 9.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    if (open <= .15) stroke(ctx, [[x - rx, y], [x, y + ry * .35], [x + rx, y]], 5);   // closed: a soft lid line
  }
  const BROWS = { // [left brow pts, right brow pts] as quadratic curves in image coords, relative to their default
    smug: [[[160, 232], [186, 214], [232, 258]], [[234, 262], [280, 250], [322, 252]]],
    calm: [[[160, 238], [190, 226], [230, 244]], [[236, 252], [280, 244], [322, 250]]],
    worried: [[[160, 248], [196, 226], [230, 222]], [[236, 236], [270, 226], [320, 252]]],
    strain: [[[160, 238], [196, 238], [234, 266]], [[234, 270], [276, 248], [322, 240]]],
    up: [[[160, 222], [190, 200], [230, 214]], [[236, 220], [280, 206], [322, 226]]],
  };
  const MOUTHS = {
    smirk: c => stroke(c, L([[212, 394], [246, 400], [282, 382]]), 5),
    flat: c => stroke(c, L([[214, 396], [246, 398], [276, 392]]), 5),
    frown: c => stroke(c, L([[214, 402], [246, 390], [278, 400]]), 5),
    smile: c => { part(c, smooth(L([[210, 388], [282, 380], [262, 410], [228, 412]])), '#7a2e2a', 4.5); },
    o: c => part(c, c2 => c2.ellipse(244 - O[0], 400 - O[1], 15, 20, 0, 0, Math.PI * 2), '#5a2420', 4.5),
    grit: c => { part(c, smooth(L([[208, 388], [284, 380], [282, 404], [210, 408]])), '#fbf0db', 4.5); stroke(c, L([[210, 396], [282, 392]]), 3); },
  };
  function houdiniHead(ctx, face = {}) {
    const H = HEAD;
    for (const hk of HOOKS) part(ctx, smooth(L(hk)), HCOL.hair, 5);                         // hooked curl tips poking out of the mass
    part(ctx, smooth(H.hair), HCOL.hair);                                                  // hair mass behind
    for (const s of [[[110, 150], [130, 120], [160, 130]], [[380, 90], [410, 70], [440, 96]], [[400, 200], [430, 180], [448, 210]], [[360, 300], [390, 290], [380, 340]], [[230, 60], [260, 40], [290, 60]]])
      stroke(ctx, L(s), 4, HCOL.hairHi);                                                     // curl highlights
    part(ctx, c => c.ellipse(H.ear[0], H.ear[1], 22, 38, -.15, 0, Math.PI * 2), HCOL.skin);  // ear
    stroke(ctx, [[H.ear[0] - 6, H.ear[1] - 20], [H.ear[0] + 8, H.ear[1]], [H.ear[0] - 4, H.ear[1] + 22]], 3.5);
    part(ctx, smooth(H.face), HCOL.skin);                                                  // face
    ctx.save(); ctx.beginPath(); smooth(H.face)(ctx); ctx.clip();                            // soft shade on the far side of the jaw
    ctx.fillStyle = 'rgba(200,120,80,.18)'; ctx.beginPath(); ctx.ellipse(330 - O[0], 380 - O[1], 70, 90, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    for (const f of H.fringe) part(ctx, smooth(f), HCOL.hair, 4.5);                        // fringe locks over the forehead
    eye(ctx, H.eyeL, H.pupilL, face); eye(ctx, H.eyeR, H.pupilR, face);
    const b = BROWS[face.brows || 'smug'];
    for (const br of b) { const p = L(br); ctx.beginPath(); ctx.moveTo(...p[0]); ctx.quadraticCurveTo(...p[1], ...p[2]); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); }
    stroke(ctx, L([[176, 318], [196, 326], [222, 318]]), 3, 'rgba(29,26,23,.55)'); stroke(ctx, L([[254, 326], [278, 334], [302, 324]]), 3, 'rgba(29,26,23,.55)'); // under-eye lines
    // the long pointed nose
    part(ctx, smooth(L([[252, 300], [246, 330], [222, 352], [196, 366], [206, 376], [236, 374], [252, 362]]), false), null, 0);
    stroke(ctx, L([[252, 300], [240, 336], [198, 366]]), 5); stroke(ctx, L([[198, 366], [214, 380], [242, 372]]), 5); stroke(ctx, L([[240, 356], [248, 364], [242, 372]]), 4);
    (MOUTHS[face.mouth || 'smirk'])(ctx);
  }

  // ---------- skeleton ----------
  const SK = { pelvis: [0, -560], chest: [0, -930], shL: [-138, -930], shR: [138, -934], hipL: [-56, -560], hipR: [56, -560], ua: 250, fa: 235, th: 262, sh: 242 };

  function figure(ctx, pose = {}) {
    const lean = pose.lean || 0, br = (pose.breathe || 0) * 6;
    const P = SK.pelvis, Rt = p => rot(p, P, lean);
    const chest = Rt([0, SK.chest[1] - br]), shL = Rt([SK.shL[0], SK.shL[1] - br]), shR = Rt([SK.shR[0], SK.shR[1] - br]), neck = Rt([HEAD.neck[0], HEAD.neck[1] - br]);
    const feet = pose.feet || { L: [-70, -40], R: [70, -40] };
    const [kneeL, ankL] = ik(SK.hipL, feet.L, SK.th, SK.sh, 1), [kneeR, ankR] = ik(SK.hipR, feet.R, SK.th, SK.sh, -1);
    const hands = pose.hands || { L: [-120, -440], R: [120, -440] };
    const outward = (sh, target, side, forced) => { // pick the elbow solution that sits farther out from the body centre
      if (forced) return ik(sh, target, SK.ua, SK.fa, forced);
      const a = ik(sh, target, SK.ua, SK.fa, 1), b = ik(sh, target, SK.ua, SK.fa, -1);
      return (a[0][0] * side > b[0][0] * side) ? a : b;
    };
    const [elL, wrL] = outward(shL, hands.L, -1, pose.bendL), [elR, wrR] = outward(shR, hands.R, 1, pose.bendR);
    const J = { lean, chest, shL, shR, neck, kneeL, ankL, kneeR, ankR, elL, wrL, elR, wrR, P };
    const O2 = OUTFITS[pose.outfit || 'suit'];
    const hs = pose.handShape || {};
    O2.legs(ctx, J);
    if (O2.behind) O2.behind(ctx, J, pose);
    if (pose.armsBehind) O2.arms(ctx, J, hs);
    O2.torso(ctx, J, pose);
    if (O2.neck) O2.neck(ctx, J);
    ctx.save(); ctx.translate(neck[0], neck[1]); ctx.rotate(lean + (pose.headTilt || 0)); ctx.translate(-HEAD.neck[0], -HEAD.neck[1]);
    (HEADS[pose.head || 'houdini'])(ctx, pose.face || {});
    ctx.restore();
    if (O2.collar) O2.collar(ctx, J, pose);
    if (!pose.armsBehind) O2.arms(ctx, J, hs);
    if (hs.L === 'steeple' && hs.R === 'steeple') steeple(ctx, J, (pose.skin || HCOL.skin));
    if (O2.front) O2.front(ctx, J, pose);
  }

  // ---------- outfits ----------
  function legsPair(ctx, J, cloth, shoe, w1 = 92, w2 = 74) {
    for (const [hip, knee, ank] of [[SK.hipL, J.kneeL, J.ankL], [SK.hipR, J.kneeR, J.ankR]]) {
      part(ctx, limb(hip, knee, w1, w2 + 6), cloth); part(ctx, limb(knee, ank, w2 + 6, w2), cloth);
      if (shoe) part(ctx, smooth([[ank[0] - 46, ank[1] + 6], [ank[0] + 40, ank[1] + 2], [ank[0] + 56, ank[1] + 40], [ank[0] - 56, ank[1] + 44]]), shoe);
    }
  }
  function armsPair(ctx, J, sleeve, skin, hs, cuff, w = 66) {
    for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
      const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]), cx = Math.cos(dir), cy = Math.sin(dir);
      part(ctx, limb(sh, el, w, w - 8), sleeve); part(ctx, limb(el, [wr[0] - cx * 8, wr[1] - cy * 8], w - 8, w - 16), sleeve);
      if (cuff) part(ctx, limb([wr[0] - cx * 8, wr[1] - cy * 8], [wr[0] + cx * 2, wr[1] + cy * 2], w - 20, w - 20), cuff, 4);
      if (hs[side] !== 'steeple') hand(ctx, [wr[0] + cx * 4, wr[1] + cy * 4], dir, hs[side] || 'open', skin, .95);
    }
  }
  const torsoPath = (J, top = -960, hem = -545, wTop = 165, wHem = 175) => {
    const R = p => rot(p, J.P, J.lean);
    return c => { const p = (x, y) => R([x, y]);
      c.moveTo(...p(-62, top - 22)); c.lineTo(...p(62, top - 22));
      c.quadraticCurveTo(...p(wTop - 10, top - 6), ...p(wTop, top + 46));
      c.lineTo(...p(wTop - 16, -760)); c.lineTo(...p(wHem, hem)); c.lineTo(...p(-wHem, hem)); c.lineTo(...p(-wTop + 16, -760)); c.lineTo(...p(-wTop, top + 46));
      c.quadraticCurveTo(...p(-wTop + 10, top - 6), ...p(-62, top - 22)); c.closePath(); };
  };
  const OUTFITS = {
    suit: {
      legs: (c, J) => legsPair(c, J, '#2b2b2e', '#1f1f21'),
      torso: (c, J) => {
        const R = p => rot(p, J.P, J.lean);
        part(c, torsoPath(J), '#323235');
        part(c, poly([R([-62, -968]), R([62, -968]), R([0, -780])]), '#fbf0db', 4.5);       // shirt front
        part(c, poly([R([-50, -930]), R([50, -930]), R([40, -640]), R([-40, -640])]), '#2b2b2d', 4.5); // vest
        part(c, poly([R([-62, -968]), R([-4, -720]), R([-90, -820])]), '#3c3c40', 4.5);    // lapels
        part(c, poly([R([62, -968]), R([4, -720]), R([90, -820])]), '#3c3c40', 4.5);
        stroke(c, [R([-60, -880]), R([10, -760])], 0);
        for (const y of [-700, -650]) part(c, ca => ca.arc(...R([0, y]), 8, 0, Math.PI * 2), '#3c3c40', 3);
        stroke(c, [R([-20, -740]), R([20, -705]), R([30, -660])], 4, '#c9a14a');             // watch chain
      },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, poly([R([-46, -990]), R([0, -970]), R([46, -990]), R([46, -948]), R([0, -966]), R([-46, -948])]), '#2a2a2e', 4.5); part(c, ca => ca.arc(...R([0, -969]), 11, 0, Math.PI * 2), '#2a2a2e', 4); },
      arms: (c, J, hs) => armsPair(c, J, '#323235', HCOL.skin, hs, '#fbf0db'),
    },
    swim: { // 1920s dark bathing trunks, bare wiry torso
      legs: (c, J) => legsPair(c, J, HCOL.skin, null, 80, 62),
      torso: (c, J) => {
        const R = p => rot(p, J.P, J.lean);
        part(c, torsoPath(J, -960, -545, 150, 140), HCOL.skin);
        stroke(c, [R([-70, -860]), R([-30, -846]), R([-4, -856])], 3.5); stroke(c, [R([4, -856]), R([30, -846]), R([70, -860])], 3.5);
        stroke(c, [R([0, -820]), R([0, -680])], 3, 'rgba(29,26,23,.4)'); part(c, ca => ca.arc(...R([0, -660]), 5, 0, Math.PI * 2), null, 3);
        part(c, poly([R([-148, -600]), R([148, -600]), R([150, -470]), R([20, -470]), R([0, -520]), R([-20, -470]), R([-150, -470])]), '#24314a');
      },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1010]), R([0, -950]), 70, 76), HCOL.skin); },
      arms: (c, J, hs) => armsPair(c, J, HCOL.skin, HCOL.skin, hs, null, 64),
    },
    gown: {
      legs: (c, J) => legsPair(c, J, HCOL.skin, null, 80, 62),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, torsoPath(J, -962, -420, 160, 190), '#ddd4c5'); stroke(c, [R([-60, -900]), R([-50, -500])], 3, 'rgba(29,26,23,.25)'); stroke(c, [R([70, -880]), R([60, -480])], 3, 'rgba(29,26,23,.25)'); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1010]), R([0, -958]), 70, 76), HCOL.skin); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-70, -964]), R([0, -924]), R([70, -964]), R([60, -950]), R([0, -910]), R([-60, -950])]), '#ddd4c5', 4); },
      arms: (c, J, hs) => { // short sleeves: sleeve over the upper arm only
        for (const [sh, el, wr, side] of [[J.shL, J.elL, J.wrL, 'L'], [J.shR, J.elR, J.wrR, 'R']]) {
          const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]);
          hand(c, [wr[0] + Math.cos(dir) * 10, wr[1] + Math.sin(dir) * 10], dir, hs[side] || 'open', HCOL.skin, 1.05);
          part(c, limb(el, wr, 60, 52), HCOL.skin); part(c, limb(sh, el, 64, 60), HCOL.skin);
          part(c, limb(sh, [lerp(sh[0], el[0], .55), lerp(sh[1], el[1], .55)], 92, 86), '#ddd4c5');
        }
      },
    },
    straitjacket: {
      legs: (c, J) => legsPair(c, J, '#2b2b2e', '#1f1f21'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, torsoPath(J, -962, -540, 168, 180), '#d8cdb0'); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-80, -990]), R([0, -950]), R([80, -990]), R([84, -950]), R([0, -916]), R([-84, -950])]), '#b9ad8f', 4.5); },
      arms: (c, J) => { // arms crossed over the chest inside long sleeves, strapped
        const R = p => rot(p, J.P, J.lean);
        part(c, limb(R([-150, -930]), R([110, -740]), 84, 84), '#c7bb9c'); part(c, limb(R([150, -930]), R([-110, -720]), 84, 84), '#b9ad8f');
        for (const y of [-830, -640]) { part(c, poly([R([-176, y - 14]), R([176, y - 14]), R([178, y + 14]), R([-178, y + 14])]), '#7a5a3a', 4); part(c, poly([R([-18, y - 18]), R([18, y - 18]), R([18, y + 18]), R([-18, y + 18])]), '#c9a14a', 3.5); }
      },
    },
  };

  const HEADS = { houdini: houdiniHead };

  G.Chars = { figure, part, stroke, smooth, poly, limb, ik, rot, hand, HEADS, OUTFITS, SK, HEAD, HCOL, INK, LW };

  // ======================= supporting cast =======================
  // Heads share Houdini's construction (image-space coords → L()), but with their own faces.
  function genericFace(ctx, face, o) {
    const sk = o.skin;
    if (o.back) o.back(ctx);
    part(ctx, c => c.ellipse(o.ear[0], o.ear[1], 20, 32, -.15, 0, Math.PI * 2), sk);
    part(ctx, smooth(L(o.face)), sk);
    if (o.hair) o.hair(ctx);
    const open = face.eyes ?? 1, lk = face.look || [0, 0];
    for (const [x, y, rx, ry] of o.eyes) {
      const X = x - O[0], Y = y - O[1];
      part(ctx, c => c.ellipse(X, Y, rx, ry * Math.max(open, .06), 0, 0, Math.PI * 2), '#fbf0db', 4.5);
      if (open > .15) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(X + lk[0] * rx * .45, Y + lk[1] * ry * .4, o.pupil || 8, 0, Math.PI * 2); ctx.fill(); }
      else stroke(ctx, [[X - rx, Y], [X, Y + ry * .3], [X + rx, Y]], 4.5);
    }
    if (o.brows) for (const b of o.brows[face.brows || 'calm'] || o.brows.calm) { const p = L(b); ctx.beginPath(); ctx.moveTo(...p[0]); ctx.quadraticCurveTo(...p[1], ...p[2]); ctx.lineWidth = o.browW || 9; ctx.strokeStyle = o.browC || INK; ctx.lineCap = 'round'; ctx.stroke(); }
    if (o.nose) stroke(ctx, L(o.nose), 4.5);
    const m = o.mouths[face.mouth || 'flat'] || o.mouths.flat; m(ctx);
    if (o.front) o.front(ctx);
  }
  const mouthSet = (cx, cy, w) => ({
    flat: c => stroke(c, L([[cx - w, cy], [cx, cy + 2], [cx + w, cy - 2]]), 4.5),
    smile: c => stroke(c, L([[cx - w, cy - 4], [cx, cy + 10], [cx + w, cy - 6]]), 4.5),
    frown: c => stroke(c, L([[cx - w, cy + 6], [cx, cy - 4], [cx + w, cy + 6]]), 4.5),
    o: c => part(c, c2 => c2.ellipse(cx - O[0], cy - O[1], 11, 15, 0, 0, Math.PI * 2), '#5a2420', 4),
    grit: c => { part(c, smooth(L([[cx - w, cy - 8], [cx + w, cy - 10], [cx + w, cy + 10], [cx - w, cy + 10]])), '#fbf0db', 4); stroke(c, L([[cx - w, cy], [cx + w, cy - 1]]), 3); },
  });
  const BROW_SET = (l, r) => ({ calm: [l, r], worried: [[l[0], [l[1][0], l[1][1] - 6], [l[2][0], l[2][1] - 14]], [[r[0][0], r[0][1] - 14], [r[1][0], r[1][1] - 6], r[2]]], up: [l.map(([x, y]) => [x, y - 14]), r.map(([x, y]) => [x, y - 14])], strain: [[l[0], l[1], [l[2][0], l[2][1] + 12]], [[r[0][0], r[0][1] + 12], r[1], r[2]]] });

  // Doctor: balding, grey side hair, round spectacles, walrus moustache, head mirror.
  function doctorHead(ctx, face = {}) {
    genericFace(ctx, face, {
      skin: '#f0b48a', ear: [372 - O[0], 318 - O[1]],
      face: [[178, 196], [320, 186], [352, 240], [364, 330], [336, 410], [290, 444], [240, 452], [204, 440], [180, 404], [164, 330], [162, 260]],
      hair: c => { part(c, smooth(L([[164, 300], [150, 244], [170, 206], [180, 250], [176, 310]])), '#b9b4aa', 4.5); part(c, smooth(L([[352, 300], [368, 236], [352, 200], [338, 250], [342, 310]])), '#b9b4aa', 4.5);
        stroke(c, L([[210, 200], [260, 188], [300, 196]]), 3, 'rgba(255,255,255,.5)'); // shine on the bald crown
        part(c, c2 => c2.ellipse(260 - O[0], 200 - O[1], 34, 24, 0, 0, Math.PI * 2), '#d9dfe2', 4.5); part(c, c2 => c2.ellipse(260 - O[0], 200 - O[1], 14, 10, 0, 0, Math.PI * 2), '#9aa3a8', 3); // head mirror
        stroke(c, L([[170, 214], [226, 200]]), 7, '#3c3c3c'); stroke(c, L([[294, 200], [348, 214]]), 7, '#3c3c3c'); },
      eyes: [[214, 292, 22, 22], [290, 296, 24, 23]], pupil: 7.5,
      brows: BROW_SET([[190, 262], [214, 252], [238, 262]], [[266, 266], [292, 256], [318, 266]]), browC: '#8e8a82', browW: 10,
      nose: [[252, 300], [238, 348], [256, 360]],
      mouths: mouthSet(252, 410, 24),
      front: c => { for (const [x, y] of [[214, 292], [290, 296]]) part(c, c2 => c2.arc(x - O[0], y - O[1], 32, 0, Math.PI * 2), null, 3.5); stroke(c, L([[246, 292], [258, 292]]), 3.5);   // spectacles
        part(c, smooth(L([[200, 384], [252, 368], [306, 384], [292, 404], [252, 392], [212, 404]])), '#a8a39a', 4.5); },                                                                         // moustache
    });
  }
  // Nurse: oval face, auburn hair in a bun, starched cap with a single band.
  function nurseHead(ctx, face = {}) {
    genericFace(ctx, face, {
      skin: '#f4bd98', ear: [370 - O[0], 324 - O[1]],
      back: c => part(c, c2 => c2.arc(330 - O[0], 236 - O[1], 52, 0, Math.PI * 2), '#7a3f26'),                                   // bun
      face: [[184, 210], [318, 200], [348, 256], [356, 330], [328, 404], [282, 436], [240, 442], [208, 428], [186, 392], [172, 330], [170, 270]],
      hair: c => { part(c, smooth(L([[168, 300], [160, 224], [214, 180], [300, 178], [354, 226], [356, 300], [330, 250], [270, 224], [210, 236], [182, 280]])), '#7a3f26');
        part(c, poly(L([[180, 196], [340, 196], [328, 150], [196, 150]])), '#f6f4ee', 4.5); stroke(c, L([[186, 180], [334, 180]]), 6, '#4a5a7a'); },
      eyes: [[222, 300, 23, 25], [294, 304, 25, 26]], pupil: 8,
      brows: BROW_SET([[200, 264], [222, 256], [244, 264]], [[272, 268], [296, 260], [318, 268]]), browC: '#5a2c18', browW: 7,
      nose: [[258, 314], [248, 352], [264, 358]],
      mouths: mouthSet(258, 396, 20),
    });
  }
  // Stage assistant: flat cap, short dark hair, broad nose.
  function assistantHead(ctx, face = {}) {
    genericFace(ctx, face, {
      skin: '#e7a576', ear: [368 - O[0], 322 - O[1]],
      face: [[180, 210], [324, 200], [356, 256], [362, 338], [334, 412], [288, 444], [238, 450], [204, 434], [182, 396], [168, 330], [166, 268]],
      hair: c => { part(c, smooth(L([[166, 290], [168, 232], [200, 214], [330, 210], [360, 250], [362, 300], [340, 262], [190, 262]])), '#2e241e');
        part(c, smooth(L([[150, 230], [190, 168], [300, 156], [372, 196], [380, 228], [300, 222], [196, 228]])), '#5b5348'); part(c, smooth(L([[150, 230], [120, 238], [126, 252], [200, 244]])), '#4a4339', 4); },
      eyes: [[220, 298, 21, 22], [294, 302, 22, 23]], pupil: 7.5,
      brows: BROW_SET([[196, 266], [220, 258], [244, 266]], [[270, 270], [296, 262], [320, 270]]), browW: 9,
      nose: [[258, 310], [236, 356], [264, 366]],
      mouths: mouthSet(258, 404, 22),
    });
  }
  // The young man: neat side-parted hair, narrow face, small earnest eyes (an original figure, not a likeness).
  function youngHead(ctx, face = {}) {
    genericFace(ctx, face, {
      skin: '#f1b58c', ear: [366 - O[0], 326 - O[1]],
      face: [[186, 204], [318, 196], [346, 254], [352, 340], [326, 420], [282, 452], [240, 458], [210, 440], [190, 400], [176, 330], [174, 266]],
      hair: c => part(c, smooth(L([[172, 300], [168, 226], [204, 176], [290, 166], [352, 204], [356, 296], [342, 240], [300, 214], [240, 226], [200, 214], [186, 262]])), '#4a3424'),
      eyes: [[224, 302, 18, 20], [292, 306, 19, 21]], pupil: 7,
      brows: BROW_SET([[204, 270], [224, 262], [244, 270]], [[272, 274], [292, 266], [312, 274]]), browW: 8,
      nose: [[258, 314], [244, 360], [264, 366]],
      mouths: mouthSet(258, 410, 18),
    });
  }
  // Crowd: bowler-hat man with a moustache; woman in a cloche hat.
  function bowlerHead(ctx, face = {}) {
    genericFace(ctx, face, {
      skin: '#e3a272', ear: [366 - O[0], 326 - O[1]],
      face: [[180, 212], [324, 204], [356, 260], [362, 340], [334, 414], [288, 446], [238, 452], [204, 436], [182, 398], [168, 332], [166, 270]],
      hair: c => { part(c, smooth(L([[130, 236], [394, 228], [400, 244], [126, 252]])), '#262220'); part(c, smooth(L([[180, 236], [192, 168], [262, 140], [334, 166], [346, 234]])), '#2f2a26'); stroke(c, L([[186, 222], [340, 220]]), 7, '#5a3a2a'); },
      eyes: [[220, 300, 20, 21], [294, 304, 21, 22]], pupil: 7,
      brows: BROW_SET([[198, 268], [220, 260], [242, 268]], [[272, 272], [296, 264], [318, 272]]), browW: 9,
      nose: [[256, 310], [240, 352], [262, 360]],
      mouths: mouthSet(256, 412, 20),
      front: c => part(c, smooth(L([[214, 386], [256, 372], [300, 386], [284, 400], [256, 392], [226, 400]])), '#3a2c22', 4),
    });
  }
  function clocheHead(ctx, face = {}) {
    genericFace(ctx, face, {
      skin: '#f6c3a0', ear: [366 - O[0], 330 - O[1]],
      face: [[186, 214], [318, 206], [348, 262], [354, 340], [326, 410], [282, 440], [240, 446], [208, 432], [188, 396], [174, 334], [172, 272]],
      hair: c => { part(c, smooth(L([[160, 360], [158, 280], [176, 250], [190, 330], [186, 380]])), '#2b2018'); part(c, smooth(L([[356, 370], [362, 280], [344, 252], [334, 330], [338, 384]])), '#2b2018');
        part(c, smooth(L([[150, 270], [170, 180], [262, 146], [356, 182], [372, 272], [330, 250], [262, 240], [190, 252]])), '#8a4a5a'); stroke(c, L([[160, 254], [368, 254]]), 8, '#5a2a3a'); },
      eyes: [[222, 304, 21, 23], [292, 308, 22, 24]], pupil: 7.5,
      brows: BROW_SET([[202, 272], [222, 266], [242, 272]], [[272, 276], [292, 270], [312, 276]]), browW: 6,
      nose: [[258, 318], [250, 352], [264, 356]],
      mouths: { ...mouthSet(258, 396, 16), flat: c => part(c, smooth(L([[244, 392], [272, 390], [266, 402], [248, 402]])), '#b0414a', 3.5) },
    });
  }
  Object.assign(HEADS, { doctor: doctorHead, nurse: nurseHead, assistant: assistantHead, young: youngHead, bowler: bowlerHead, cloche: clocheHead });

  Object.assign(OUTFITS, {
    doctorCoat: {
      legs: (c, J) => legsPair(c, J, '#4a4a4e', '#2a2420'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, torsoPath(J, -962, -360, 170, 210), '#f1efe8');
        part(c, poly([R([-50, -968]), R([50, -968]), R([0, -820])]), '#9aa8b6', 4.5); stroke(c, [R([0, -960]), R([0, -360])], 3.5);
        part(c, poly([R([-60, -968]), R([-6, -760]), R([-96, -840])]), '#e2dfd6', 4.5); part(c, poly([R([60, -968]), R([6, -760]), R([96, -840])]), '#e2dfd6', 4.5);
        stroke(c, [R([-44, -950]), R([-70, -820]), R([-40, -760])], 5, '#3a3a3a'); stroke(c, [R([44, -950]), R([70, -820]), R([40, -760])], 5, '#3a3a3a'); part(c, ca => ca.arc(...R([-40, -756]), 12, 0, Math.PI * 2), '#9aa3a8', 3.5); // stethoscope
        part(c, poly([R([90, -700]), R([150, -700]), R([150, -640]), R([90, -640])]), '#e2dfd6', 3.5); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -960]), 70, 74), '#f0b48a'); },
      arms: (c, J, hs) => armsPair(c, J, '#f1efe8', '#f0b48a', hs, null, 70),
    },
    nurseDress: {
      legs: (c, J) => legsPair(c, J, '#f4bd98', '#1f1f21', 56, 46),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, torsoPath(J, -962, -380, 150, 200), '#4a5a7a');
        part(c, smooth([R([-90, -900]), R([90, -900]), R([110, -400]), R([-110, -400])]), '#f6f4ee', 4.5);
        stroke(c, [R([-90, -900]), R([-60, -960])], 6, '#f6f4ee'); stroke(c, [R([90, -900]), R([60, -960])], 6, '#f6f4ee'); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -962]), 64, 70), '#f4bd98'); },
      collar: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, smooth([R([-70, -966]), R([0, -930]), R([70, -966]), R([60, -948]), R([0, -916]), R([-60, -948])]), '#f6f4ee', 4); },
      arms: (c, J, hs) => armsPair(c, J, '#4a5a7a', '#f4bd98', hs, '#f6f4ee', 60),
    },
    assistantVest: {
      legs: (c, J) => legsPair(c, J, '#3c3a36', '#2a2420'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, torsoPath(J, -962, -545, 165, 168), '#efe9dc');
        part(c, smooth([R([-130, -930]), R([-40, -960]), R([0, -820]), R([40, -960]), R([130, -930]), R([150, -560]), R([-150, -560])]), '#6b4a36', 4.5);
        for (const y of [-800, -730, -660]) part(c, ca => ca.arc(...R([0, y]), 7, 0, Math.PI * 2), '#c9a14a', 3); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -962]), 70, 74), '#e7a576'); },
      arms: (c, J, hs) => { armsPair(c, J, '#efe9dc', '#e7a576', hs, null, 66);
        for (const [el, wr] of [[J.elL, J.wrL], [J.elR, J.wrR]]) part(c, limb([lerp(el[0], wr[0], .45), lerp(el[1], wr[1], .45)], wr, 54, 50), '#e7a576'); }, // rolled sleeves
    },
    sweater: {
      legs: (c, J) => legsPair(c, J, '#6e6a62', '#3a2c22'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean);
        part(c, torsoPath(J, -962, -560, 160, 150), '#5a6e5a');
        part(c, poly([R([-46, -966]), R([46, -966]), R([0, -860])]), '#f1ede2', 4.5); stroke(c, [R([0, -950]), R([0, -870])], 9, '#8a2a2a');
        stroke(c, [R([-150, -600]), R([150, -600])], 4, 'rgba(29,26,23,.35)'); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -962]), 66, 72), '#f1b58c'); },
      arms: (c, J, hs) => armsPair(c, J, '#5a6e5a', '#f1b58c', hs, null, 64),
    },
    overcoat: {
      legs: (c, J) => legsPair(c, J, '#3a3632', '#1f1f21'),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, torsoPath(J, -962, -420, 175, 195), '#4f463e'); part(c, poly([R([-60, -968]), R([-6, -740]), R([-100, -840])]), '#5f554b', 4.5); part(c, poly([R([60, -968]), R([6, -740]), R([100, -840])]), '#5f554b', 4.5); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -962]), 70, 74), '#e3a272'); },
      arms: (c, J, hs) => armsPair(c, J, '#4f463e', '#e3a272', hs, null, 72),
    },
    dress20s: {
      legs: (c, J) => legsPair(c, J, '#f6c3a0', '#3a2020', 54, 44),
      torso: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, torsoPath(J, -962, -440, 150, 190), '#7a5a8a'); stroke(c, [R([-150, -620]), R([150, -620])], 8, '#5a3a6a'); },
      neck: (c, J) => { const R = p => rot(p, J.P, J.lean); part(c, limb(R([0, -1012]), R([0, -962]), 60, 66), '#f6c3a0'); },
      arms: (c, J, hs) => armsPair(c, J, '#7a5a8a', '#f6c3a0', hs, null, 56),
    },
  });

  // Séance medium's hand: lace cuff, a ring, long fingers (prop).
  function seanceHand(ctx, x, y, rot2 = 0, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot2); ctx.scale(s, s);
    part(ctx, smooth([[0, -40], [260, -46], [270, 40], [0, 44]]), '#2a2026');                                       // dark sleeve
    for (let i = 0; i < 6; i++) part(ctx, c => c.arc(-6, -34 + i * 14, 9, 0, Math.PI * 2), '#efe6d6', 3);            // lace cuff
    part(ctx, smooth([[-10, -34], [-70, -40], [-110, -24], [-120, 6], [-80, 30], [-10, 32]]), '#f2c9aa');
    for (const [fy, len] of [[-30, 70], [-14, 80], [2, 76], [18, 60]]) part(ctx, smooth([[-100, fy - 6], [-100 - len, fy - 4], [-104 - len, fy + 6], [-100, fy + 8]]), '#f2c9aa', 4);
    part(ctx, c => c.arc(-150, -14, 7, 0, Math.PI * 2), '#c9a14a', 3);
    ctx.restore();
  }
  G.Chars.seanceHand = seanceHand;

})(window);
