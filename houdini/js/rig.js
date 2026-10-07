/* Cut-out puppet rigs built from the supplied character art.
 * Each flat image is sliced into layers (head, hands, collar…) with pivots,
 * hidden "clean plate" fills are painted behind the cuts so moving parts never
 * reveal holes, and eyes are re-painted live for blinks and eye direction.
 * Coordinates below are in each image's own pixel space. */
(function (G) {
  'use strict';
  const T = G.Toon, { clamp, lerp } = T;
  const INK = '#1d1a17';

  function canvasOf(img) { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; return c; }
  const path = (g, pts) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) g.lineTo(p[0], p[1]); g.closePath(); };
  function clipLayer(img, pts) { const c = canvasOf(img), g = c.getContext('2d'); path(g, pts); g.clip(); g.drawImage(img, 0, 0); return c; }
  function cutLayer(img, cuts) { const c = canvasOf(img), g = c.getContext('2d'); g.drawImage(img, 0, 0); g.globalCompositeOperation = 'destination-out'; for (const p of cuts) { path(g, p); g.fill(); } return c; }

  // Re-paint one eye inside its exact eye-white mask (cut from the art), so the
  // original outline and the brows that overlap the eye stay untouched.
  const eyeBuf = document.createElement('canvas');
  function eye(ctx, e, look, blink, colors) {
    const m = T.IMG[e.mask]; if (!m) return;
    eyeBuf.width = m.width; eyeBuf.height = m.height; const g = eyeBuf.getContext('2d');
    g.fillStyle = colors.white; g.fillRect(0, 0, m.width, m.height);
    const px = e.px - e.ox + look[0] * e.range[0], py = e.py - e.oy + look[1] * e.range[1];
    g.fillStyle = colors.pupil; g.beginPath(); g.arc(px, py, e.pr, 0, Math.PI * 2); g.fill();
    if (blink > 0) {
      const lid = m.height * blink * 1.05;
      g.fillStyle = colors.skin; g.fillRect(0, 0, m.width, lid);
      g.beginPath(); g.moveTo(0, lid); g.quadraticCurveTo(m.width / 2, lid + 5 * (1 - blink), m.width, lid);
      g.lineWidth = 4; g.strokeStyle = INK; g.stroke();
    }
    g.globalCompositeOperation = 'destination-in'; g.drawImage(m, 0, 0); g.globalCompositeOperation = 'source-over';
    ctx.drawImage(eyeBuf, e.ox, e.oy);
  }

  // Natural blink curve: quick close, slightly slower open. Returns 0..1.
  function blinkAt(t, times, dur = .22) {
    for (const b of times) { const k = (t - b) / dur; if (k >= 0 && k <= 1) return k < .4 ? k / .4 : 1 - (k - .4) / .6; }
    return 0;
  }

  // ---------------- Houdini in the suit (houdini-suit.png, 533×1461) ----------------
  const SUIT = {
    head: [[20, 0], [530, 0], [530, 300], [470, 335], [410, 395], [340, 428], [300, 442], [255, 454], [205, 452], [168, 430], [140, 400], [106, 350], [90, 300], [20, 260]],
    headPivot: [248, 448],
    collar: [[185, 470], [215, 458], [310, 456], [350, 470], [352, 525], [182, 525]],
    hands: [[300, 532], [346, 578], [382, 640], [398, 690], [366, 714], [300, 706], [250, 714], [204, 702], [194, 670], [224, 628], [258, 574]],
    handsPivot: [298, 705],
    eyes: [{ mask: 'suitEyeL', ox: 165, oy: 265, px: 176, py: 274, pr: 9.5, range: [15, 10] }, { mask: 'suitEyeR', ox: 245, oy: 270, px: 257, py: 280, pr: 10, range: [16, 10] }],
    colors: { white: '#fbf0db', pupil: '#130e12', skin: '#eeaa7b', suit: '#323234', vest: '#2b2b2d', shirt: '#fbf0db' },
    feet: [266, 1461],
  };
  let suitParts = null;
  function suitRig() {
    if (suitParts) return suitParts;
    const img = T.IMG.suit;
    suitParts = { body: cutLayer(img, [SUIT.head, SUIT.hands]), head: clipLayer(img, SUIT.head), collar: clipLayer(img, SUIT.collar), hands: clipLayer(img, SUIT.hands) };
    return suitParts;
  }
  // Canvas straitjacket strapped over the torso and crossed arms (image space).
  function straitjacket(ctx, t) {
    const lw = 5, CAN = '#d8cdb0', SH = '#b9ad8f', STRAP = '#7a5a3a';
    const body = c => { c.moveTo(118, 496); c.lineTo(414, 496); c.quadraticCurveTo(468, 560, 456, 700); c.lineTo(436, 900); c.lineTo(104, 900); c.lineTo(80, 700); c.quadraticCurveTo(70, 560, 118, 496); c.closePath(); };
    ctx.beginPath(); body(ctx); ctx.fillStyle = CAN; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke();
    // crossed sleeves wrapping the front
    for (const [a, b2, c2] of [[[96, 560], [300, 760], [440, 700]], [[438, 560], [234, 760], [94, 700]]]) {
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(b2[0], b2[1] - 120, c2[0], c2[1]); ctx.lineWidth = 74; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke();
      ctx.lineWidth = 64; ctx.strokeStyle = SH; ctx.stroke();
    }
    // straps with buckles, collar
    for (const y of [610, 800]) {
      ctx.fillStyle = STRAP; ctx.fillRect(84, y - 14, 370, 28); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(84, y - 14, 370, 28);
      ctx.fillStyle = '#c9a14a'; ctx.fillRect(250, y - 18, 36, 36); ctx.strokeRect(250, y - 18, 36, 36); ctx.fillStyle = STRAP; ctx.fillRect(258, y - 10, 20, 20);
    }
    ctx.beginPath(); ctx.moveTo(180, 470); ctx.quadraticCurveTo(266, 520, 352, 470); ctx.lineTo(360, 500); ctx.quadraticCurveTo(266, 548, 172, 500); ctx.closePath(); ctx.fillStyle = SH; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
    ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(29,26,23,.3)'; for (const [x1, y1, x2, y2] of [[150, 660, 180, 880], [380, 660, 352, 880], [266, 830, 266, 896]]) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
  }
  function ankleIrons(ctx) { // stocks/irons clamped around both ankles (image space)
    ctx.fillStyle = '#6f777c'; ctx.lineWidth = 5; ctx.strokeStyle = INK;
    for (const x of [150, 370]) { ctx.beginPath(); ctx.roundRect(x - 64, 1352, 128, 34, 8); ctx.fill(); ctx.stroke(); }
    ctx.beginPath(); ctx.roundRect(60, 1338, 420, 16, 6); ctx.fillStyle = '#5d656b'; ctx.fill(); ctx.stroke();
  }

  // pose: { sway (rad), breathe (0..1), headRot (rad), headX, headY, look [x,y], blink 0..1, handsY, handsRot,
  //         jacket (bool), irons (bool), tint (css colour → silhouette), filter (css filter, e.g. sepia) }
  const suitBuf = document.createElement('canvas');
  function drawSuit(ctx, x, y, s, pose = {}) {
    if (pose.tint || pose.filter) { // render the whole puppet flat, then composite as silhouette / old photo
      const img = T.IMG.suit; suitBuf.width = img.width; suitBuf.height = img.height;
      const g = suitBuf.getContext('2d'); drawSuitRaw(g, 0, 0, 1, pose);
      if (pose.tint) { g.globalCompositeOperation = 'source-in'; g.fillStyle = pose.tint; g.fillRect(0, 0, img.width, img.height); }
      ctx.save(); if (pose.filter) ctx.filter = pose.filter; ctx.drawImage(suitBuf, x, y, img.width * s, img.height * s); ctx.restore();
      return;
    }
    drawSuitRaw(ctx, x, y, s, pose);
  }
  function drawSuitRaw(ctx, x, y, s, pose = {}) {
    const P = suitRig(), C = SUIT.colors;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    // whole-body sway around the feet + breathing stretch
    ctx.translate(SUIT.feet[0], SUIT.feet[1]); ctx.rotate(pose.sway || 0); ctx.scale(1, 1 + (pose.breathe || 0) * .006); ctx.translate(-SUIT.feet[0], -SUIT.feet[1]);
    // clean plates: neck under the head, vest and shirt front under the hands
    ctx.fillStyle = C.skin; ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(300, 398); ctx.lineTo(306, 474); ctx.lineTo(198, 474); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(198, 474); ctx.moveTo(300, 398); ctx.lineTo(306, 474); ctx.stroke();
    path(ctx, SUIT.hands); ctx.fillStyle = C.vest; ctx.fill();
    ctx.fillStyle = C.shirt; ctx.fillRect(284, 520, 32, 80);
    ctx.drawImage(P.body, 0, 0);
    // head on its neck pivot, eyes repainted inside the head's space
    ctx.save();
    ctx.translate(SUIT.headPivot[0] + (pose.headX || 0), SUIT.headPivot[1] + (pose.headY || 0)); ctx.rotate(pose.headRot || 0); ctx.translate(-SUIT.headPivot[0], -SUIT.headPivot[1]);
    ctx.drawImage(P.head, 0, 0);
    for (const e of SUIT.eyes) eye(ctx, e, pose.look || [0, 0], pose.blink || 0, C);
    ctx.restore();
    if (pose.irons) ankleIrons(ctx);
    if (pose.jacket) { straitjacket(ctx); ctx.restore(); return; } // jacket hides hands and collar
    ctx.drawImage(P.collar, 0, 0); // collar sits over the neck seam
    // hands on the wrist pivot
    ctx.save();
    ctx.translate(SUIT.handsPivot[0], SUIT.handsPivot[1] + (pose.handsY || 0)); ctx.rotate(pose.handsRot || 0); ctx.translate(-SUIT.handsPivot[0], -SUIT.handsPivot[1]);
    ctx.drawImage(P.hands, 0, 0);
    ctx.restore();
    ctx.restore();
  }

  // ---------------- Houdini in the hospital bed (houdini-bed.png, 1149×1212) ----------------
  const BED = {
    chest: [[200, 380], [720, 380], [800, 560], [820, 700], [180, 700]],
    chestBase: [500, 700],
    eyes: [{ mask: 'bedEyeL', ox: 324, oy: 183, px: 334, py: 199, pr: 7, range: [11, 10] }, { mask: 'bedEyeR', ox: 384, oy: 192, px: 394, py: 207, pr: 7, range: [12, 11] }],
    colors: { white: '#fbf3df', pupil: '#191114', skin: '#f3a879' },
  };
  let bedParts = null;
  function drawBed(ctx, x, y, s, pose = {}) {
    const img = T.IMG.bed;
    if (!bedParts) bedParts = { chest: clipLayer(img, BED.chest) };
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.drawImage(img, 0, 0);
    // shallow breathing: the chest layer only ever scales up, so nothing behind it is revealed
    const b = 1 + Math.max(0, pose.breathe || 0) * .012;
    ctx.save(); ctx.translate(BED.chestBase[0], BED.chestBase[1]); ctx.scale(1 + (b - 1) * .4, b); ctx.translate(-BED.chestBase[0], -BED.chestBase[1]);
    ctx.drawImage(bedParts.chest, 0, 0); ctx.restore();
    for (const e of BED.eyes) eye(ctx, e, pose.look || [0, 0], pose.blink || 0, BED.colors);
    ctx.restore();
  }

  G.Rig = { drawSuit, drawBed, blinkAt, SUIT, BED };
})(window);
