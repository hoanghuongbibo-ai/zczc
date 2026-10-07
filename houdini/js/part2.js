/* PART 03 "91 Minutes", PART 04 match cut, PART 05 "The Official Cause" (17.15–27.6 s).
 * Narration anchors: "sealed inside" 18.53 · "metal coffin" 19.15 · "swimming pool" 20.51 ·
 * "ninety-one minutes" 21.30 · "climbed out" 22.36 · "fifty-two" 24.25 · "on the record" 25.62 ·
 * "ruptured appendix" 26.30. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Props, FX = G.FX;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, S_IMG = [533, 1461];

  // ================= 03A/03B — overhead: he lies down in the coffin, the lid is sealed =================
  const CF = { x: 640, y: 380, w: 300, l: 760 };               // coffin seen from above, lying left–right
  function poolDeck(ctx) {
    shape(ctx, '#e7e1d3', 0, rect(-400, -300, 2100, 1300));
    ctx.save(); ctx.strokeStyle = 'rgba(80,90,90,.25)'; ctx.lineWidth = 2;
    for (let x = -400; x < 1700; x += 60) { ctx.beginPath(); ctx.moveTo(x, -300); ctx.lineTo(x, 1000); ctx.stroke(); }
    for (let y = -300; y < 1000; y += 60) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1700, y); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle = grad(ctx, 0, 600, 0, 900, [[0, '#5fa9c4'], [1, '#3b88a8']]); ctx.fillRect(-400, 610, 2100, 400);  // pool edge at the bottom of frame
    shape(ctx, '#d8d1c0', 4, rect(-400, 590, 2100, 24));
  }
  function topFigure(ctx, x, y, rot, coat, hair) { // assistant seen from directly above: shoulders + head
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    T.shadow(ctx, 6, 8, 70, 40, .25, 6);
    shape(ctx, coat, 4, ellipse(-62, 26, 22, 44)); shape(ctx, coat, 4, ellipse(62, 26, 22, 44));            // arms
    shape(ctx, coat, 4, c => c.roundRect(-76, -30, 152, 64, 30));                                               // shoulders
    shape(ctx, hair, 4, ellipse(0, -2, 30, 32)); line(ctx, [[-6, -30], [-2, 22]], 2.5, 'rgba(255,255,255,.25)'); // head + parting
    ctx.restore();
  }
  function coffinOpen(ctx) {
    T.shadow(ctx, CF.x + 10, CF.y + 16, CF.l * .52, CF.w * .55, .35, 10);
    shape(ctx, '#8f989d', 5, rect(CF.x - CF.l / 2, CF.y - CF.w / 2, CF.l, CF.w, 10));
    shape(ctx, '#3c4246', 4, rect(CF.x - CF.l / 2 + 20, CF.y - CF.w / 2 + 20, CF.l - 40, CF.w - 40, 6));
  }
  function bolts(ctx, t, t0) { // bolt heads around the lid, tightened one after another
    const pts = []; for (let i = 0; i < 5; i++) { const x = CF.x - CF.l / 2 + 70 + i * (CF.l - 140) / 4; pts.push([x, CF.y - CF.w / 2 + 14], [x, CF.y + CF.w / 2 - 14]); }
    pts.forEach(([x, y], i) => {
      const k = t - (t0 + i * .035), turn = k > 0 ? Math.min(1, k / .12) * Math.PI * .66 : 0;
      ctx.save(); ctx.translate(x, y); ctx.rotate(turn);
      shape(ctx, '#c3cbd0', 3, poly([0, 1, 2, 3, 4, 5].map(j => [Math.cos(j * Math.PI / 3) * 11, Math.sin(j * Math.PI / 3) * 11]))); line(ctx, [[-6, 0], [6, 0]], 2.5);
      ctx.restore();
    });
  }
  function lyingHoudini(ctx, settleK, t, look, blink) {
    // overhead: the suit art rotated so his head points left, settling into the box
    const S = .46, drop = (1 - settleK) * 60, sc = 1 + (1 - settleK) * .08;    // seen from above: feet to the right, head to the left
    ctx.save(); ctx.translate(CF.x + 335, CF.y - drop * .2); ctx.scale(sc, sc);
    FX.fig(ctx, 0, 0, S, { outfit: 'swim', hands: { L: [-40, -640], R: [40, -640] }, feet: { L: [-50, -40], R: [50, -40] }, face: { brows: 'calm', mouth: 'flat', look, eyes: 1 - blink }, breathe: (Math.sin(t * 1.6) + 1) / 2 }, { rot: -Math.PI / 2 });
    ctx.restore();
  }
  function shotCoffinOverhead(ctx, lt, dur, t) {
    const settle = FX.settle(prog(lt, .05, .55));                // he lowers himself in, small settle
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.08), 640, 380);
    poolDeck(ctx);
    coffinOpen(ctx);
    lyingHoudini(ctx, settle, t, [lerp(.6, 0, prog(lt, .6, 1.2)), lerp(.2, -.4, prog(lt, .6, 1.2))], G.Rig.blinkAt(t, [18.4]));
    topFigure(ctx, 300, 140, .3, '#e9e6de', '#4a3a2e'); topFigure(ctx, 1010, 130, -.4, '#3a3d42', '#2b231d'); topFigure(ctx, 1080, 600, .2, '#e9e6de', '#6b5a48');
    ctx.restore();
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, '5 AUG 1926');
    FX.caption(ctx, 'HOTEL SHELTON POOL, NEW YORK', lt, .4);
  }
  function shotCoffinSeal(ctx, lt, dur, t) {
    const lower = Math.min(1, ease.in(prog(lt, .02, .3))), lidS = lerp(1.22, 1, lower), lidX = CF.x;  // lowered toward the coffin from above
    const lidLand = lt >= .3 ? FX.ring(lt - .3, .012, 6, 18) : 0;                                         // a hard metal landing
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.18, 1.26), 600, 380);
    poolDeck(ctx); coffinOpen(ctx);
    lyingHoudini(ctx, 1, t, [0, -.4], 0);
    // the closing lid steals the light from his face
    const gap = 1 - lower;
    ctx.save(); ctx.globalAlpha = .55 * (1 - gap); ctx.fillStyle = '#000'; ctx.fillRect(CF.x - CF.l / 2 + 20, CF.y - CF.w / 2 + 20, CF.l - 40, CF.w - 40); ctx.restore();
    T.shadow(ctx, lidX + 10 + 60 * gap, CF.y + 14 + 50 * gap, CF.l * .5 * (1 + gap * .2), CF.w * .5 * (1 + gap * .2), .3 + .2 * lower, 8 + 14 * gap); // shadow sharpens as it nears
    ctx.save(); ctx.translate(lidX, CF.y); ctx.scale(lidS + lidLand, lidS + lidLand); ctx.translate(-lidX, -CF.y);
    shape(ctx, grad(ctx, 0, CF.y - CF.w / 2, 0, CF.y + CF.w / 2, [[0, '#b7bfc4'], [1, '#8f989d']]), 5, rect(lidX - CF.l / 2, CF.y - CF.w / 2, CF.l, CF.w, 10));
    line(ctx, [[lidX - CF.l / 2 + 30, CF.y - CF.w / 2 + 26], [lidX + CF.l / 2 - 30, CF.y - CF.w / 2 + 26]], 4, 'rgba(255,255,255,.35)');
    ctx.restore();
    if (lt > .32) bolts(ctx, t, G.Part2T.seal + .32);
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '5 AUG 1926');
  }

  // ================= 03C/03D — it sinks to the bottom; 91 minutes pass =================
  function underwater(ctx, t) {
    ctx.fillStyle = grad(ctx, 0, -200, 0, 720, [[0, '#4f9ab8'], [1, '#1b4a63']]); ctx.fillRect(-400, -300, 2100, 1300);
    ctx.save(); ctx.globalAlpha = .18; ctx.strokeStyle = '#d8f2ff'; ctx.lineWidth = 2;               // tiled pool wall
    for (let x = -400; x < 1700; x += 80) { ctx.beginPath(); ctx.moveTo(x, 80); ctx.lineTo(x, 640); ctx.stroke(); }
    for (let y = 80; y < 640; y += 80) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1700, y); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter';                                              // light shafts from the surface
    for (let i = 0; i < 5; i++) { const x = 150 + i * 260 + Math.sin(t * .4 + i) * 30; ctx.globalAlpha = .08; ctx.fillStyle = '#eaffff'; ctx.beginPath(); ctx.moveTo(x, -50); ctx.lineTo(x + 60, -50); ctx.lineTo(x + 160, 700); ctx.lineTo(x + 40, 700); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    // surface with distorted figures above it
    for (let i = 0; i < 5; i++) { const x = 220 + i * 210, wob = Math.sin(t * 2 + i) * 6; ctx.fillStyle = 'rgba(20,40,55,.35)'; ctx.beginPath(); ctx.ellipse(x + wob, 20, 34 + Math.sin(t * 3 + i) * 6, 70, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = 'rgba(220,245,255,.55)'; ctx.beginPath(); ctx.moveTo(-400, 60); for (let x = -400; x <= 1700; x += 40) ctx.lineTo(x, 60 + Math.sin(x * .02 + t * 2) * 5); ctx.lineTo(1700, 0); ctx.lineTo(-400, 0); ctx.closePath(); ctx.fill();
    shape(ctx, '#2c5f78', 0, rect(-400, 640, 2100, 300)); line(ctx, [[-400, 640], [1700, 640]], 4, 'rgba(0,0,0,.35)');   // pool floor
  }
  function coffinSide(ctx, x, y, tilt) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
    shape(ctx, grad(ctx, 0, -60, 0, 60, [[0, '#a6aeb3'], [1, '#6f777c']]), 5, rect(-330, -55, 660, 110, 8));
    line(ctx, [[-330, -32], [330, -32]], 4); for (let i = 0; i < 6; i++) shape(ctx, '#c3cbd0', 2.5, circle(-280 + i * 112, -44, 6));
    ctx.restore();
  }
  function shotDescent(ctx, lt, dur, t) {
    // sinks with water drag: fast at first, decelerating, touching down at ~0.8 s with a soft settle
    const land = .8, y = lt < land ? lerp(140, 585, 1 - Math.pow(1 - lt / land, 2.2)) : 585 + FX.ring(lt - land, -6, 1.4, 5) + 6;
    const tilt = lt < land ? Math.sin(lt * 3) * .04 : FX.ring(lt - land, .03, 1.2, 4);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    underwater(ctx, t);
    for (const dx of [-290, 290]) { const ax = 640 + dx * Math.cos(tilt), ay = y - 55 + dx * Math.sin(tilt); line(ctx, [[640 + dx * 1.05, 40], [ax, ay]], 4, '#cbbf9e'); } // lowering ropes
    coffinSide(ctx, 640, y, tilt);
    for (let i = 0; i < 10; i++) { const k = ((lt * .7 + i / 10) % 1); shape(ctx, 'rgba(230,248,255,.5)', 2, circle(380 + i * 55 + Math.sin(k * 12 + i) * 6, y - 60 - k * 520, 3 + k * 6)); }  // air escaping the seams
    if (lt > land) { const k = lt - land; ctx.save(); ctx.globalAlpha = clamp(.5 - k * .5); ctx.fillStyle = '#9fc6d4'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(640 + s * (340 + k * 120), 636 - k * 20, 60 + k * 90, 18 + k * 20, 0, 0, 7); ctx.fill(); } ctx.restore(); } // silt puff on landing
    ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, '5 AUG 1926');
  }
  function hourglass(ctx, x, y, k, t) {
    shape(ctx, '#6b4f39', 4, rect(x - 48, y - 110, 96, 16, 4)); shape(ctx, '#6b4f39', 4, rect(x - 48, y + 94, 96, 16, 4));
    const gl = c => { c.moveTo(x - 38, y - 94); c.lineTo(x + 38, y - 94); c.quadraticCurveTo(x + 36, y - 30, x + 5, y); c.quadraticCurveTo(x + 36, y + 30, x + 38, y + 94); c.lineTo(x - 38, y + 94); c.quadraticCurveTo(x - 36, y + 30, x - 5, y); c.quadraticCurveTo(x - 36, y - 30, x - 38, y - 94); c.closePath(); };
    shape(ctx, 'rgba(220,235,240,.35)', 0, gl);
    ctx.save(); ctx.beginPath(); gl(ctx); ctx.clip(); ctx.fillStyle = '#e1b867';
    ctx.fillRect(x - 40, y - 94 + (1 - (1 - k)) * 0 + 90 * k, 80, 90 * (1 - k) + 2);                       // top bulb draining
    ctx.beginPath(); ctx.moveTo(x - 40, y + 94); ctx.lineTo(x + 40, y + 94); ctx.lineTo(x + 40, y + 94 - 80 * k); ctx.quadraticCurveTo(x, y + 94 - 110 * k, x - 40, y + 94 - 80 * k); ctx.closePath(); ctx.fill();
    if (k < .99) ctx.fillRect(x - 2, y - 2, 4, 96);
    ctx.restore();
    shape(ctx, null, 4, gl);
  }
  function shotCounter(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, 1.05, 640, 380); underwater(ctx, t); coffinSide(ctx, 640, 591, 0); ctx.restore();
    ctx.save(); ctx.fillStyle = 'rgba(10,25,35,.45)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    // ease-out count like the reference's counters: 01 → 91, landing exactly on "minutes"
    const k = ease.out(prog(lt, .05, .9)), n = Math.max(1, Math.round(1 + 90 * k));
    FX.bigText(ctx, `${String(n).padStart(2, '0')} MIN`, 700, 300, 120);
    ctx.save(); ctx.font = FX.FONT(700, 26); ctx.fillStyle = '#e8f2f4'; ctx.textAlign = 'center'; ctx.fillText('SEALED UNDERWATER', 700, 390); ctx.restore();
    hourglass(ctx, 360, 320, k, t);
    FX.dateTag(ctx, '5 AUG 1926');
  }

  // ================= 03E — the lid swings open and he sits up =================
  function shotClimbOut(ctx, lt, dur, t) {
    const lidA = FX.settle(prog(lt, 0, .3)) * 1.48;                 // lid swings up on its back hinge to just short of vertical
    const sit = ease.out(prog(lt, .12, .62));                       // he sits up from lying
    const CX = 640, CY = 520;
    ctx.save(); cam(ctx, 1.04, 640, 400);
    shape(ctx, '#d8d2c2', 0, rect(-400, -300, 2100, 1300));
    ctx.save(); ctx.strokeStyle = 'rgba(80,90,90,.2)'; ctx.lineWidth = 2; for (let x = -400; x < 1700; x += 60) { ctx.beginPath(); ctx.moveTo(x, -300); ctx.lineTo(x, 560); ctx.stroke(); } ctx.restore();
    ctx.fillStyle = grad(ctx, 0, 560, 0, 720, [[0, '#5fa9c4'], [1, '#3b88a8']]); ctx.fillRect(-400, 600, 2100, 300); shape(ctx, '#cfc8b6', 4, rect(-400, 580, 2100, 24));
    // him: hips are the pivot; only what is above the coffin's rim is visible
    const S = .4;
    // the lid, seen edge-on from the side: hinged on the far long edge, so it rises as a panel behind him
    const lidH = 110 * Math.sin(lidA); shape(ctx, '#aab2b7', 5, rect(CX - 330, CY - 55 - lidH, 660, Math.max(8, lidH), 6));
    ctx.save(); ctx.beginPath(); ctx.rect(0, -400, 1280, CY - 50 + 400); ctx.clip();
    ctx.translate(CX + 120, CY - 30); ctx.rotate(lerp(-Math.PI / 2, -.18, sit));
    ctx.scale(S, S); ctx.translate(0, 560);                                           // pivot at the pelvis
    const wave = clamp((lt - .35) / .15), wx = Math.sin((lt - .35) * 14) * 70 * wave;   // once upright he raises a hand and waves
    G.Chars.figure(ctx, { outfit: 'swim', hands: { L: [-150, -600], R: [lerp(150, 320 + wx, wave), lerp(-600, -1250, wave)] }, handShape: { R: 'open' },
      face: { brows: 'smug', mouth: 'smile', look: [.5, .1], eyes: 1 - G.Rig.blinkAt(t, [22.75]) } });
    ctx.restore();
    coffinSide(ctx, CX, CY, 0);
    ctx.restore();
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, '5 AUG 1926');
    FX.caption(ctx, '91 MINUTES · ALIVE', lt, .2);
  }

  // ================= 04/05A — match cut: alive → dead. Pull back from the bed =================
  function shotBedDead(ctx, lt, dur, t) {
    // match the climb-out framing (head upper-left of centre), then pull back
    const z = lerp(1.55, 1.0, ease.inOut(prog(lt, 0, dur))), fx = lerp(480, 640, ease.inOut(prog(lt, 0, dur))), fy = lerp(280, 380, ease.inOut(prog(lt, 0, dur)));
    ctx.save(); cam(ctx, z, fx, fy);
    FX.plankWall(ctx, -100, 1400, -100, 470, '#6e7a72', 2);
    shape(ctx, '#545e57', 0, rect(-100, 420, 1500, 60)); shape(ctx, '#55443a', 0, rect(-100, 480, 1500, 400));
    FX.wallClock(ctx, 740, 150, 30);
    FX.lamp(ctx, 470, 40, .55);
    shape(ctx, '#e3d9c4', 4, rect(890, 90, 250, 300, 3)); ctx.fillStyle = grad(ctx, 0, 104, 0, 376, [[0, '#8f9aa0'], [1, '#b8b7ae']]); ctx.fillRect(904, 104, 222, 272);
    line(ctx, [[1015, 104], [1015, 376]], 5, '#e3d9c4'); line(ctx, [[904, 240], [1126, 240]], 5, '#e3d9c4');
    T.shadow(ctx, 560, 712, 280, 26, .45, 6);
    G.Rig.drawBed(ctx, 290, 160, .47, { blink: 1, breathe: 0, look: [0, 0] });          // eyes closed, no breath
    ctx.restore();
    ctx.save(); ctx.fillStyle = 'rgba(15,20,25,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    FX.vignette(ctx, 640, 340, .6);
    FX.dateTag(ctx, '31 OCT 1926');
    if (lt > 1.2) FX.caption(ctx, 'HARRY HOUDINI · 1874 – 1926', lt, 1.3);
  }

  // ================= 05B/05C — the record: AGE 52, signed; RUPTURED APPENDIX =================
  function record(ctx, lt, sig, ageK) {
    FX.paperDoc(ctx, 640, 380, 560, 640, { title: 'CERTIFICATE OF DEATH', sub: 'DETROIT, MICHIGAN · OCTOBER 31, 1926', lines: 0, draw: c => {
      c.font = FX.FONT(600, 20); c.fillStyle = INK; c.textAlign = 'left'; c.textBaseline = 'middle';
      const rows = [['NAME', 'Harry Houdini'], ['AGE', '52'], ['CAUSE', '']];
      rows.forEach(([k, v], i) => {
        const y = -170 + i * 70;
        if (k === 'AGE' && ageK > 0) { c.fillStyle = 'rgba(246,201,69,.75)'; c.fillRect(-240, y - 18, 200 * ease.out(ageK), 36); }
        c.fillStyle = '#4a443d'; c.font = FX.FONT(700, 18); c.fillText(k + ' —', -230, y);
        c.fillStyle = INK; c.font = FX.FONT(600, 24); c.fillText(v, -120, y);
        line(c, [[-125, y + 18], [230, y + 18]], 2, 'rgba(70,64,58,.4)');
      });
      for (let i = 0; i < 5; i++) line(c, [[-230, 40 + i * 28], [-230 + 460 * (.6 + (i * 37 % 40) / 100), 40 + i * 28]], 4, 'rgba(70,64,58,.35)');
      line(c, [[40, 260], [240, 260]], 2, INK);
      c.font = FX.FONT(600, 13); c.fillStyle = '#4a443d'; c.fillText('ATTENDING PHYSICIAN', 40, 278);
      if (sig > 0) { // the signature writes itself
        c.save(); c.beginPath(); c.rect(40, 200, 200 * sig, 70); c.clip();
        c.beginPath(); c.moveTo(48, 250); for (let x = 0; x <= 180; x += 6) c.lineTo(48 + x, 250 - Math.sin(x * .12) * 14 - Math.sin(x * .31) * 6 - (x < 30 ? x * .3 : 0));
        c.lineWidth = 3; c.strokeStyle = '#1e2a4a'; c.stroke(); c.restore();
      }
    } });
  }
  function penHand(ctx, x, y) { // doctor's hand holding a pen (original drawing)
    ctx.save(); ctx.translate(x, y);
    ctx.rotate(-.35);
    shape(ctx, '#e9e6de', 4.5, poly([[110, -34], [420, -60], [430, 60], [118, 40]]));                         // white-coat sleeve
    shape(ctx, '#f6f4ee', 4, rect(96, -40, 30, 84, 6));                                                        // shirt cuff
    shape(ctx, P.PAL.skin, 4, smooth([[24, -20], [60, -40], [100, -34], [104, 30], [70, 40], [40, 24]]));       // back of hand
    shape(ctx, P.PAL.skin, 4, smooth([[14, -4], [40, -14], [56, 0], [40, 12]]));                                // index finger on the pen
    shape(ctx, P.PAL.skin, 4, smooth([[30, 18], [56, 14], [64, 30], [36, 34]]));                                // thumb
    line(ctx, [[0, 0], [90, -24]], 9); line(ctx, [[0, 0], [90, -24]], 5, '#1e2a4a'); shape(ctx, '#c9a14a', 2.5, circle(2, 0, 4));
    ctx.restore();
  }
  function desk(ctx) { shape(ctx, '#6e4f39', 0, rect(-400, -300, 2100, 1300)); ctx.save(); ctx.globalAlpha = .2; for (let y = -300; y < 1000; y += 46) line(ctx, [[-400, y], [1700, y + 10]], 3, '#3d2a1d'); ctx.restore(); }
  function shotRecord(ctx, lt, dur, t) {
    const sigK = prog(lt, .35, .95);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    desk(ctx); record(ctx, lt, sigK, prog(lt, .08, .35));
    const px = 680 + 180 * sigK, py = 630 - Math.sin(sigK * 22) * 12;
    penHand(ctx, px, py);
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '31 OCT 1926');
  }
  function shotStampCause(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.12, 1.18), 640, 330);
    desk(ctx); record(ctx, lt, 1, 1);
    FX.stamp(ctx, 'RUPTURED APPENDIX', 700, 352, lt - .05, { color: '#a8322a', size: 34, rot: -.06 });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '31 OCT 1926');
  }
  function shotAppendix(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2b2724');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 380);
    const torso = smooth([[520, 80], [760, 80], [830, 180], [820, 420], [790, 660], [490, 660], [460, 420], [450, 180]]);
    shape(ctx, '#e7c7a8', 5, torso);
    ctx.save(); ctx.beginPath(); torso(ctx); ctx.clip();
    // large intestine frame + small-bowel loops, clinical and simple
    ctx.lineCap = 'round';
    const colon = [[560, 560], [560, 340], [720, 330], [720, 560]];
    ctx.beginPath(); ctx.moveTo(...colon[0]); for (const p of colon.slice(1)) ctx.lineTo(...p);
    ctx.lineWidth = 40; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 32; ctx.strokeStyle = '#d99a86'; ctx.stroke();
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(640, 420 + i * 34, 60, 14, 0, 0, 7); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(29,26,23,.5)'; ctx.stroke(); }
    // appendix at the lower right of the frame: swells, then ruptures
    const swell = prog(lt, .05, .45), burst = prog(lt, .45, .9);
    const ax = 568, ay = 580;
    if (burst > 0) { const g = ctx.createRadialGradient(ax, ay + 20, 5, ax, ay + 20, 40 + burst * 160); g.addColorStop(0, 'rgba(70,40,30,.8)'); g.addColorStop(1, 'rgba(70,40,30,0)'); ctx.fillStyle = g; ctx.fillRect(ax - 240, ay - 220, 480, 440); }
    ctx.save(); ctx.translate(ax, ay + 10); ctx.rotate(.4); const w = 10 + swell * 12 - burst * 4;
    shape(ctx, burst > 0 ? '#8e2a22' : mix('#d99a86', '#c8463a', swell), 4, c => c.roundRect(-w, 0, w * 2, 56 + swell * 10, w)); ctx.restore();
    ctx.restore();
    shape(ctx, null, 5, torso);
    line(ctx, [[ax - 20, ay + 40], [380, 620]], 3, '#f1ead8'); // label leader
    ctx.restore();
    ctx.save(); ctx.font = FX.FONT(700, 22); ctx.fillStyle = '#f1ead8'; ctx.textAlign = 'right'; ctx.fillText('APPENDIX', 372, 628); ctx.restore();
    FX.dateTag(ctx, '31 OCT 1926');
  }
  function mix(a, b, k) { const p = s => [1, 3, 5].map(i => parseInt(s.substr(i, 2), 16)), A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})`; }

  G.Part2T = { seal: 0 };
  G.Part2 = { shotCoffinOverhead, shotCoffinSeal, shotDescent, shotCounter, shotClimbOut, shotBedDead, shotRecord, shotStampCause, shotAppendix, record, desk };
})(window);
