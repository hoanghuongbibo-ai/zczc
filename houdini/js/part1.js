/* PART 01 + PART 02 of the full opening (0–17.15 s), explainer style: flat sets, soft
 * vignette + centre glow, a paper date tag top-left, slow steady push-ins,
 * hard cuts, props that drop/snap in with a small settle, damped swings.
 * Cues (narration words): "the most famous" 4.17 · "died" 6.47 · "Harry Houdini" 7.67 ·
 * "getting out" 9.95 · "things" 10.39 · "killed" 11.14. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Props, FX = G.FX;
  const { W, H, IMG, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow, keys } = T;
  const FONT = (w, px) => `${w} ${px}px Fredoka, "DejaVu Sans", sans-serif`;
  const INK = T.LINE;

  // ---------- shared explainer elements ----------
  const back = k => { const c = 1.6; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); }; // overshoot-and-settle
  const push = (lt, dur, a = 1, b = 1.07) => lerp(a, b, ease.sine(clamp(lt / dur)));
  function dateTag(ctx, text) {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.font = FONT(600, 26); const w = ctx.measureText(text).width + 34;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(52 + 4, 30 + 5, w, 46);
    shape(ctx, '#f1ead8', 3, rect(52, 30, w, 46, 3)); line(ctx, [[58, 36], [52 + w - 6, 36]], 1.5, 'rgba(0,0,0,.15)');
    ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, 69, 54);
    ctx.restore();
  }
  function caption(ctx, text, lt, at = .4, x = W - 60, y = H - 58) {
    const k = clamp((lt - at) / .3); if (k <= 0) return;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = k;
    ctx.font = FONT(700, 20); const w = ctx.measureText(text).width + 30, xx = x - w + (1 - ease.out(k)) * 40;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(xx + 4, y + 4, w, 38);
    shape(ctx, '#f1ead8', 3, rect(xx, y, w, 38, 2)); ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, xx + 15, y + 20);
    ctx.restore();
  }
  function plankWall(ctx, x0, x1, top, bottom, base, seed = 1) {
    const r = rng(seed);
    for (let x = x0, i = 0; x < x1; x += 56, i++) { const v = (r() - .5) * .08; ctx.fillStyle = shade(base, 1 + v); ctx.fillRect(x, top, 56, bottom - top); line(ctx, [[x, top], [x, bottom]], 2.5, 'rgba(0,0,0,.22)'); }
  }
  function shade(hex, k) { const p = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16)); return `rgb(${p.map(v => Math.round(clamp(v * k, 0, 255))).join(',')})`; }
  function lamp(ctx, x, y) {
    line(ctx, [[x, -200], [x, y]], 3);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .14; ctx.fillStyle = grad(ctx, 0, y, 0, y + 420, [[0, '#ffe9b8'], [1, 'rgba(0,0,0,0)']]);
    ctx.beginPath(); ctx.moveTo(x - 30, y + 20); ctx.lineTo(x + 30, y + 20); ctx.lineTo(x + 230, y + 440); ctx.lineTo(x - 230, y + 440); ctx.closePath(); ctx.fill(); ctx.restore();
    glow(ctx, x, y + 24, 120, 'rgba(255,230,170,.35)');
    shape(ctx, '#c9a35a', 3.5, poly([[x - 16, y], [x + 16, y], [x + 34, y + 24], [x - 34, y + 24]]));
  }
  function wallClock(ctx, x, y, r) {
    shape(ctx, '#6b4f39', 3.5, circle(x, y, r + 6)); shape(ctx, '#f1ead8', 3, circle(x, y, r));
    const hA = (1 + 26 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 26 / 60 * Math.PI * 2 - Math.PI / 2;  // 1:26 p.m.
    line(ctx, [[x, y], [x + Math.cos(hA) * r * .45, y + Math.sin(hA) * r * .45]], 4); line(ctx, [[x, y], [x + Math.cos(mA) * r * .7, y + Math.sin(mA) * r * .7]], 3);
  }
  function vignette(ctx, cx = W / 2, cy = H * .42, a = .55) {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createRadialGradient(cx, cy, H * .25, cx, cy, H * 1.05); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  }

  // ================= 01A — Grace Hospital, Detroit =================
  const WIN = { x: 607, y: 268, w: 50, h: 66 }, WC = [WIN.x + WIN.w / 2, WIN.y + WIN.h / 2];
  function bareTree(ctx, x, y, s, seed, color) {
    const r = rng(seed);
    const br = (x0, y0, len, ang, w, d) => {
      const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len;
      line(ctx, [[x0, y0], [x1, y1]], w, color);
      if (d > 0) for (let i = 0; i < 2; i++) br(x1, y1, len * (.66 + r() * .12), ang + (i ? 1 : -1) * (.3 + r() * .35), w * .62, d - 1);
    };
    br(x, y, 110 * s, -Math.PI / 2, 13 * s, 5);
  }
  const LEAVES = Array.from({ length: 14 }, (_, i) => { const r = rng(40 + i); return { x: r() * 1300, y0: r() * 700, sp: 34 + r() * 26, ph: r() * 6, c: ['#b0662f', '#c99a45', '#8a5230'][i % 3] }; });
  function shotExterior(ctx, lt, dur, t) {
    const z = keys(lt, [[0, 1], [3.0, 1.22], [dur, 1.75]], ease.sine);
    const fx = lerp(640, WC[0], ease.sine(prog(lt, 0, dur))), fy = lerp(380, WC[1] + 60, ease.sine(prog(lt, 0, dur)));
    ctx.save(); cam(ctx, z, fx, fy);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 560, [[0, '#8796a0'], [1, '#c5c9c3']]); ctx.fillRect(-300, -300, 1900, 1300);
    ctx.fillStyle = 'rgba(236,236,230,.55)';
    for (const [x, y, s] of [[230, 120, 1], [820, 80, 1.3], [1130, 150, .8]]) { const xx = x + lt * 8; ctx.beginPath(); ctx.ellipse(xx, y, 110 * s, 22 * s, 0, 0, 7); ctx.ellipse(xx + 50 * s, y - 14 * s, 60 * s, 20 * s, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#a7aca8'; for (let x = -200; x < 1500; x += 90) { const h = 70 + ((x * 53) % 80 + 80) % 80; ctx.fillRect(x, 560 - h, 80, h); } // flat far city
    // hospital: flat masses, outlined like the reference's props
    shape(ctx, '#6e4639', 4, poly([[910, 150], [1010, 182], [1010, 560], [910, 560]]));
    shape(ctx, '#8d5d4b', 4, rect(310, 150, 600, 410));
    shape(ctx, '#e3d9c4', 4, rect(296, 132, 628, 22, 2));
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      if (r === 3 && (c === 2 || c === 3)) continue;
      const x = 337 + c * 90, y = 178 + r * 90, lit = r === 1 && c === 3;
      shape(ctx, lit ? '#f4c66e' : '#4e5c66', 3, rect(x, y, 50, 66, 2));
      if (lit) { glow(ctx, x + 25, y + 33, 110, 'rgba(255,200,120,.5)'); shape(ctx, '#d79a52', 0, rect(x + 2, y + 2, 13, 62)); shape(ctx, '#d79a52', 0, rect(x + 35, y + 2, 13, 62)); }
      else line(ctx, [[x + 8, y + 56], [x + 30, y + 10]], 4, 'rgba(255,255,255,.12)');
      line(ctx, [[x + 25, y], [x + 25, y + 66]], 3, '#e3d9c4'); line(ctx, [[x, y + 33], [x + 50, y + 33]], 3, '#e3d9c4');
      shape(ctx, '#e3d9c4', 3, rect(x - 6, y + 66, 62, 8, 2));
    }
    shape(ctx, '#e3d9c4', 4, rect(500, 446, 220, 114, 2)); shape(ctx, '#3b302b', 3.5, rect(574, 476, 72, 84, 3));
    shape(ctx, '#e3d9c4', 4, rect(468, 420, 284, 34, 3));
    ctx.fillStyle = INK; ctx.font = FONT(700, 20); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GRACE HOSPITAL', 610, 438);
    // street
    shape(ctx, '#8f8b80', 0, rect(-300, 560, 1900, 30)); shape(ctx, '#5b5953', 0, rect(-300, 590, 1900, 400));
    line(ctx, [[-300, 560], [1600, 560]], 3, 'rgba(0,0,0,.35)');
    bareTree(ctx, 180, 562, 1.35, 3, '#3c322b'); bareTree(ctx, 1080, 562, 1.2, 9, '#3c322b');
    // two small trick-or-treaters crossing far back
    for (const [dx, kind] of [[0, 'ghost'], [-34, 'witch']]) {
      const x = lerp(430, 560, lt / dur) + dx, b = Math.abs(Math.sin(t * 8 + dx)) * 3;
      ctx.save(); ctx.translate(x, 560 - b); ctx.scale(.55, .55);
      if (kind === 'ghost') { shape(ctx, '#f2efe7', 3, smooth([[-16, 0], [-18, -40], [0, -62], [18, -40], [16, 0], [8, -6], [0, 0], [-8, -6]])); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-6, -40, 3, 4, 0, 0, 7); ctx.ellipse(6, -40, 3, 4, 0, 0, 7); ctx.fill(); }
      else { shape(ctx, '#2c2a33', 3, poly([[-14, 0], [-10, -34], [10, -34], [14, 0]])); shape(ctx, P.PAL.skin, 3, circle(0, -44, 10)); shape(ctx, '#2c2a33', 3, poly([[-20, -48], [20, -48], [3, -86]])); }
      ctx.restore();
    }
    P.car(ctx, 200, 650, 1.1, '#34403e'); P.car(ctx, 1100, 660, 1.05, '#4f3d35');
    for (const L of LEAVES) { const y = (L.y0 + lt * L.sp) % 760 - 30, x = L.x + Math.sin(lt * 1.5 + L.ph) * 14; ctx.save(); ctx.translate(x, y); ctx.rotate(lt * 2 + L.ph); shape(ctx, L.c, 2, ellipse(0, 0, 7, 3.5)); ctx.restore(); }
    ctx.restore();
    vignette(ctx, 640, 330, .45);
    dateTag(ctx, '31 OCT 1926');
    caption(ctx, 'DETROIT, MICHIGAN', lt, .6);
  }

  // ================= 01B — the room =================
  function doctorBack(ctx, x, y, s, t, shadowed) { // seen from behind, foreground left — faceless, subdued
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, Math.sin(t * 1.3) * 1.5);
    shape(ctx, shadowed ? '#9c9a92' : '#e9e6de', 4.5, smooth([[-150, 260], [-140, 60], [-96, -10], [-40, -30], [40, -30], [96, -10], [140, 60], [150, 260]]));     // white coat
    line(ctx, [[0, -24], [0, 260]], 3, 'rgba(0,0,0,.18)'); line(ctx, [[-60, 120], [-40, 260]], 3, 'rgba(0,0,0,.12)');
    shape(ctx, shadowed ? '#b98260' : '#e8a676', 4, rect(-22, -60, 44, 40, 8));                                                                                          // neck
    shape(ctx, shadowed ? '#b98260' : '#e8a676', 4, ellipse(-62, -112, 12, 20)); shape(ctx, shadowed ? '#b98260' : '#e8a676', 4, ellipse(62, -112, 12, 20));                                  // ears
    shape(ctx, shadowed ? '#2e251e' : '#4a3a2e', 4.5, smooth([[-60, -70], [-66, -140], [-40, -186], [0, -196], [40, -186], [66, -140], [60, -70], [30, -52], [-30, -52]])); // hair (back of head)
    line(ctx, [[-20, -180], [-26, -120]], 2.5, 'rgba(255,255,255,.12)'); line(ctx, [[10, -186], [14, -110]], 2.5, 'rgba(255,255,255,.12)');
    ctx.restore();
  }
  function nurseBack(ctx, x, y, s, t) { // by the window, looking out
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, Math.sin(t * 1.1 + 1) * 1.2);
    shape(ctx, '#53607a', 4, smooth([[-52, 0], [-44, -150], [-46, -230], [-24, -262], [24, -262], [46, -230], [44, -150], [52, 0]]));
    shape(ctx, '#ecebe4', 3.5, poly([[-30, -150], [30, -150], [36, 0], [-36, 0]]));                                                          // apron
    line(ctx, [[-10, -150], [-24, -110]], 3); line(ctx, [[10, -150], [24, -110]], 3);                                                        // apron ties
    shape(ctx, '#e8a676', 3.5, rect(-11, -278, 22, 20, 5));
    shape(ctx, '#3b2e26', 4, ellipse(0, -310, 30, 36));                                                                                       // hair, back of head
    shape(ctx, '#3b2e26', 3.5, circle(0, -280, 14));                                                                                          // bun
    shape(ctx, '#f6f4ee', 3.5, poly([[-30, -330], [30, -330], [22, -356], [-22, -356]]));                                                     // cap
    ctx.restore();
  }
  function shotRoom(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, push(lt, dur, 1.0, 1.06), 640, 380);
    plankWall(ctx, -100, 1400, -100, 470, '#7a877d', 2);
    shape(ctx, '#e9e2cf', 3.5, rect(520, 110, 120, 86, 2)); shape(ctx, '#9fb0a6', 0, rect(530, 120, 100, 66)); shape(ctx, '#6f8a7a', 0, poly([[530, 186], [570, 140], [600, 170], [615, 150], [630, 186]])); // framed landscape
    wallClock(ctx, 740, 150, 30);
    lamp(ctx, 470, 40);
    shape(ctx, '#5c675f', 0, rect(-100, 420, 1500, 60)); line(ctx, [[-100, 420], [1400, 420]], 4, '#9aa69c');
    shape(ctx, '#5d4a3b', 0, rect(-100, 480, 1500, 400)); line(ctx, [[-100, 480], [1400, 480]], 4, 'rgba(0,0,0,.4)');   // floor
    // window: grey Detroit sky, bare branch, curtains that breathe
    shape(ctx, '#e3d9c4', 4, rect(890, 90, 250, 300, 3));
    ctx.fillStyle = grad(ctx, 0, 104, 0, 376, [[0, '#a5b0b5'], [1, '#d4d3ca']]); ctx.fillRect(904, 104, 222, 272);
    line(ctx, [[904, 330], [960, 250], [1010, 210], [1126, 180]], 7, '#5f5650'); line(ctx, [[960, 250], [940, 190]], 4, '#5f5650');
    line(ctx, [[1015, 104], [1015, 376]], 5, '#e3d9c4'); line(ctx, [[904, 240], [1126, 240]], 5, '#e3d9c4'); shape(ctx, null, 4, rect(904, 104, 222, 272));
    for (const [x0, w, ph] of [[862, 58, 0], [1110, 58, 2]]) {
      const sw = Math.sin(t * 1.2 + ph) * 6;
      shape(ctx, '#e7dcc0', 4, poly([[x0, 76], [x0 + w, 76], [x0 + w + sw * .4, 300], [x0 + w + sw, 430], [x0 + sw, 430]]));
      line(ctx, [[x0 + w / 2, 90], [x0 + w / 2 + sw * .7, 420]], 2.5, 'rgba(0,0,0,.12)');
    }
    shape(ctx, '#3b3430', 4, rect(840, 66, 330, 14, 7));
    glow(ctx, 1015, 240, 360, 'rgba(230,236,230,.16)');
    // the bed (supplied art) with contact shadow
    T.shadow(ctx, 560, 712, 280, 26, .45, 6);
    G.Rig.drawBed(ctx, 290, 160, .47, {
      breathe: (Math.sin(t * 1.5) + 1) / 2,
      blink: G.Rig.blinkAt(t, [4.5], .55),                                        // one slow, heavy blink
      look: [lerp(-.2, .75, ease.inOut(prog(lt, .2, dur))), lerp(0, -.45, ease.inOut(prog(lt, .2, dur)))], // eyes drift to the window
    });
    // bedside table
    shape(ctx, '#6b4f39', 4, rect(840, 520, 110, 190, 3)); shape(ctx, '#83634a', 4, rect(828, 506, 134, 20, 3));
    shape(ctx, 'rgba(210,225,230,.7)', 3, rect(848, 470, 18, 36, 3)); shape(ctx, P.PAL.gold, 3, circle(890, 494, 11)); P.metalStroke(ctx, c => c.ellipse(930, 498, 14, 7, 0, 0, 7), 3);
    nurseBack(ctx, 1010, 640, .95, t);
    doctorBack(ctx, 120, 720, 1.05, t, true);
    ctx.restore();
    vignette(ctx, 700, 330, .5);
    dateTag(ctx, '31 OCT 1926');
  }

  // ================= 01C — bedside: glass → watch → cuffs → hand =================
  const OBJ = [380, 980, 1600, 2300];
  function shotCloseups(ctx, lt, dur, t) {
    const cx = keys(lt, [[0, OBJ[0]], [.42, OBJ[1]], [.78, OBJ[2]], [1.1, OBJ[3]]]);
    ctx.save(); cam(ctx, push(lt, dur, 1.0, 1.06), cx, 380);
    plankWall(ctx, -600, 3200, -200, 470, '#5f6b63', 5);
    shape(ctx, '#7b5b42', 4, rect(-600, 470, 2580, 400)); shape(ctx, '#8d6a4e', 0, rect(-600, 474, 2576, 18));
    shape(ctx, '#2c2826', 0, rect(1982, 470, 1200, 500));
    P.waterGlass(ctx, OBJ[0], 640, 300, t);
    P.pocketWatch(ctx, OBJ[1], 520, 110, t);
    P.handcuffPair(ctx, OBJ[2], 610, 1.1);
    P.hangingHand(ctx, OBJ[3], 560, t);
    ctx.restore();
    vignette(ctx, 640, 360, .6);
    dateTag(ctx, '31 OCT 1926');
  }

  // ================= 02A — on stage: handcuffs =================
  function stage(ctx, t) {
    shape(ctx, '#7a2621', 0, rect(-600, -500, 2500, 1140));
    for (let x = -600, i = 0; x < 1900; x += 78, i++) { const sw = Math.sin(t * .9 + i) * 2; shape(ctx, '#5f1b17', 0, poly([[x + 22, -500], [x + 44, -500], [x + 46 + sw, 640], [x + 20 + sw, 640]])); shape(ctx, '#943229', 0, poly([[x + 52, -500], [x + 60, -500], [x + 62 + sw, 640], [x + 54 + sw, 640]])); }
    shape(ctx, '#4a1714', 4, rect(-600, -500, 2500, 560));
    for (let x = -600; x < 1900; x += 150) { shape(ctx, '#5f1b17', 4, c => { c.moveTo(x, 58); c.quadraticCurveTo(x + 75, 116, x + 150, 58); c.closePath(); }); line(ctx, [[x + 6, 64], [x + 75, 108], [x + 144, 64]], 5, '#c9a14a'); }
    shape(ctx, '#5a4231', 0, rect(-600, 640, 2500, 400)); line(ctx, [[-600, 640], [1900, 640]], 4, 'rgba(0,0,0,.45)');
    glow(ctx, 640, 420, 420, 'rgba(255,220,160,.28)');
    glow(ctx, 640, 650, 260, 'rgba(255,220,160,.25)');
  }
  // cuffs in the suit art's image space: [x, y, forearm axis, radius, click time]
  const CUFFS = [[224, 690, -.94, 36, 9.95], [362, 700, -2.17, 36, 10.39], [186, 766, -.98, 44, 11.14], [398, 778, -2.2, 44, 11.5]];
  function cuffState(c, t) {
    const [x, y, axis, , ct] = c, k = t - ct;
    if (k < 0) return { x, y, axis, open: 0, a: 1 };
    // spring open on the hinge (with overshoot), then fall: gravity + sideways kick + spin
    const open = clamp(FX.settle(k / .14)), fall = Math.max(0, k - .12), side = x < 292 ? -1 : 1;
    return { x: x + side * fall * 140, y: y + .5 * 2000 * fall * fall, axis: axis + side * fall * 4, open, a: clamp(1 - (fall - .45) / .2) };
  }
  // connecting chain: slung between the upper cuffs; when the left cuff opens it
  // swings down from the right cuff as a damped pendulum, then leaves with it.
  function linkChain(ctx, S, t) {
    const L = 140, t0 = CUFFS[0][4];
    if (S[0].open === 0) { P.chain(ctx, [S[0].x + 14, S[0].y + 16], [S[1].x - 14, S[1].y + 16], 24, 0, 8); return; }
    const a = FX.pendulum(t - t0, -1.25, L * 1.6, .9), ax = S[1].x - 14, ay = S[1].y + 16;
    ctx.save(); ctx.globalAlpha = S[1].a;
    P.chain(ctx, [ax, ay], [ax + Math.sin(a) * L, ay + Math.cos(a) * L], 10, 0, 8); ctx.restore();
  }
  function cuffs(ctx, t) {
    const S = CUFFS.map(c => cuffState(c, t));
    linkChain(ctx, S, t);
    for (const i of [2, 3]) { // free chains hanging from the lower cuffs: they swing when a jolt hits them
      const s = S[i], jolt = CUFFS.reduce((acc, c) => acc + (t > c[4] ? FX.ring(t - c[4], .16, .9, 2.2) * Math.sin(Math.PI * clamp((t - c[4]) / .05)) : 0), 0);
      const a = FX.pendulum(t - 7.7, .08, 320, .5) + jolt;
      ctx.save(); ctx.globalAlpha = s.a; P.chain(ctx, [s.x, s.y + 14], [s.x + Math.sin(a) * 320, s.y + 14 + Math.cos(a) * 320], 12, 0, 9); ctx.restore();
    }
    S.forEach((s, i) => { if (s.a > 0) { ctx.save(); ctx.globalAlpha = s.a; P.cuffBand(ctx, s.x, s.y, CUFFS[i][3], s.axis, { open: s.open }); ctx.restore(); } });
  }
  const SW = .44, SX = 640 - 533 * SW / 2, SY = 650 - 1461 * SW;
  function shotStageWide(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, push(lt, dur, 1.0, 1.08), 640, 380);
    stage(ctx, t);
    T.shadow(ctx, 640, 652, 110, 14, .5, 5);
    const smug = ease.inOut(prog(lt, .15, .7)) - ease.inOut(prog(lt, 1.35, 1.8)) * .6;
    G.Rig.drawSuit(ctx, SX, SY, SW, {
      sway: Math.sin(t * .9) * .006, breathe: (Math.sin(t * 1.7) + 1) / 2,
      headRot: -.06 * smug + Math.sin(t * 1.1) * .008, headX: -3 * smug, headY: -2 * smug,
      look: lt < 1.25 ? [.55, .15] : [.15, .95],                                   // eyes to camera, then down to the cuffs
      blink: G.Rig.blinkAt(t, [8.35, 9.2]),
    });
    ctx.save(); ctx.translate(SX, SY); ctx.scale(SW, SW); cuffs(ctx, t); ctx.restore();
    ctx.restore();
    vignette(ctx, 640, 380, .55);
    dateTag(ctx, '1891 – 1926');
    caption(ctx, 'HARRY HOUDINI · ESCAPE ARTIST', lt, .5);
  }
  function shotStageClose(ctx, lt, dur, t) {
    const jolt = CUFFS.reduce((a, c) => { const k = t - c[4]; return a + (k > 0 && k < .2 ? Math.sin(k * 80) * 5 * (1 - k / .2) : 0); }, 0);
    ctx.save(); cam(ctx, push(lt, dur, 2.15, 2.32), 374 + 292 + jolt, 722);
    ctx.save(); ctx.translate(374 - 640 * 1.9, 722 - 380 * 1.9); ctx.scale(1.9, 1.9); stage(ctx, t); ctx.restore();
    let hy = 0, hr = 0;
    for (const c of CUFFS) { const k = t - c[4];
      if (k > -.18 && k <= 0) { const w = ease.inOut((k + .18) / .18); hy += 4 * w; hr -= .025 * w; }          // brace: wrists press down and twist
      else if (k > 0) { hy += FX.ring(k, 4, 0, 1) * 0 + (k < .6 ? -9 * Math.exp(-k * 9) * Math.cos(k * 30) : 0); hr += k < .6 ? .03 * Math.exp(-k * 9) : 0; } } // release: spring up, settle
    G.Rig.drawSuit(ctx, 374, 0, 1, { breathe: (Math.sin(t * 1.7) + 1) / 2, handsY: hy, handsRot: hr, look: [.15, .95] });
    ctx.save(); ctx.translate(374, 0); cuffs(ctx, t); ctx.restore();
    ctx.restore();
    vignette(ctx, 640, 360, .5);
    dateTag(ctx, '1891 – 1926');
  }


  // ================= 02B — straitjacket, upside down over the street =================
  const CRANE = [640, -260];
  function street(ctx, t) {
    ctx.fillStyle = grad(ctx, 0, -300, 0, 720, [[0, '#9fb1bd'], [1, '#d7d6cc']]); ctx.fillRect(-500, -500, 2300, 1500);
    // facades converging upward (low camera)
    for (const [side, col] of [[-1, '#8d5d4b'], [1, '#7c6a58']]) {
      const xIn = 640 + side * 260, xOut = 640 + side * 980;
      shape(ctx, col, 4, poly([[xIn, -400], [xOut, -400], [640 + side * 900, 900], [640 + side * 380, 900]]));
      for (let r = 0; r < 7; r++) for (let c = 0; c < 3; c++) {
        const f = (c + .5) / 3, y = -340 + r * 170, x0 = lerp(xIn, xOut, f), x1 = lerp(640 + side * 380, 640 + side * 900, f), x = lerp(x0, x1, (y + 400) / 1300), w = 46 + (y + 400) / 1300 * 30;
        shape(ctx, '#4e5c66', 3, rect(x - w / 2, y, w, w * 1.3, 2));
      }
    }
    // the crane arm the rope hangs from
    shape(ctx, '#3b3430', 4, rect(300, -300, 680, 26, 6));
  }
  function crowd(ctx, t) { // bowler hats and heads seen from behind, all turned up toward him
    const r = rng(17);
    for (let row = 0; row < 2; row++) for (let i = 0; i < 12; i++) {
      const x = -40 + i * 120 + (row ? 60 : 0) + r() * 30, y = 700 + row * 40 + r() * 20, s = 1.1 + row * .25;
      const look = Math.sin(t * 1.3 + i) * 2;
      ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + i) * 1.5); ctx.scale(s, s);
      shape(ctx, ['#2f2c2a', '#3a3530', '#433a33'][i % 3], 4, smooth([[-56, 80], [-50, 10], [-30, -10], [30, -10], [50, 10], [56, 80]]));
      shape(ctx, ['#3a2c22', '#262220', '#4a3626'][i % 3], 4, T.ellipse(look, -40, 34, 36));
      if ((i + row) % 3 !== 1) { shape(ctx, '#1f1c1a', 4, T.ellipse(look, -66, 44, 10)); shape(ctx, '#1f1c1a', 4, c => { c.ellipse(look, -72, 28, 26, 0, Math.PI, 0); c.closePath(); }); }
      ctx.restore();
    }
  }
  function shotStraitjacket(ctx, lt, dur, t) {
    // struggle drives the swing: he thrashes, the rope pendulum responds and decays
    const thrash = Math.sin(2 * Math.PI * 1.6 * lt) * .55 + Math.sin(2 * Math.PI * 2.7 * lt + 1) * .25;
    const swing = .1 * Math.sin(2 * Math.PI * .6 * lt + .4) + .025 * thrash;
    const S = .34, ank = [266, 1385];
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 360, swing * .35);   // camera rolls a little with his body
    street(ctx, t);
    ctx.save(); ctx.translate(CRANE[0], CRANE[1]); ctx.rotate(-swing);
    const ropeL = 410;
    line(ctx, [[0, 0], [0, ropeL]], 5, '#6b5a44');
    ctx.translate(0, ropeL); ctx.rotate(Math.PI + thrash * .06);                  // hanging head-down; torso twists with each thrash
    ctx.scale(1 - Math.abs(thrash) * .05, 1);
    G.Rig.drawSuit(ctx, -ank[0] * S, -ank[1] * S, S, { jacket: true, headRot: thrash * .08, look: [-.2, -.9], blink: G.Rig.blinkAt(t, [13.2], .2) });
    ctx.save(); ctx.scale(S, S); line(ctx, [[-120, -1385], [120, -1385]], 9, '#6b5a44'); ctx.restore(); // rope lashed round the ankles
    ctx.restore();
    crowd(ctx, t);
    ctx.restore();
    FX.vignette(ctx, 640, 300, .45);
    FX.dateTag(ctx, '1915');
    FX.caption(ctx, 'SUSPENDED STRAITJACKET ESCAPE', lt, .3);
  }

  // ================= 02C — the milk can =================
  function canBody(ctx, x, y, w, h, front) {
    const mouthW = w * .62, neckY = y - h + 70;
    if (!front) { shape(ctx, '#2a2f33', 4, T.ellipse(x, neckY - 40, mouthW / 2, 18)); return; }   // dark mouth (behind him)
    shape(ctx, grad(ctx, x - w / 2, 0, x + w / 2, 0, [[0, '#6f777c'], [.35, '#c3cbd0'], [.6, '#9aa3a8'], [1, '#5d656b']]), 5,
      c => { c.moveTo(x - mouthW / 2, neckY - 40); c.lineTo(x - mouthW / 2, neckY); c.quadraticCurveTo(x - w / 2, neckY + 40, x - w / 2, neckY + 110); c.lineTo(x - w / 2, y); c.lineTo(x + w / 2, y); c.lineTo(x + w / 2, neckY + 110); c.quadraticCurveTo(x + w / 2, neckY + 40, x + mouthW / 2, neckY); c.lineTo(x + mouthW / 2, neckY - 40); c.ellipse(x, neckY - 40, mouthW / 2, 18, 0, 0, Math.PI); c.closePath(); });
    for (const yy of [neckY + 170, y - 60]) line(ctx, [[x - w / 2, yy], [x + w / 2, yy]], 6, '#5d656b');
    shape(ctx, '#7d868b', 4, rect(x - w / 2 - 22, neckY + 140, 24, 60, 6)); shape(ctx, '#7d868b', 4, rect(x + w / 2 - 2, neckY + 140, 24, 60, 6)); // handles
  }
  function shotMilkCan(ctx, lt, dur, t) {
    const X = 640, Y = 690, Wc = 330, Hc = 520, neckY = Y - Hc + 70, mouthY = neckY - 40;
    const S = .4, sink = FX.approach(lt, 0, -260, 520, .1);                       // lowered in and folds down until fully below the rim
    const lidT = .62, lidH = 160, lidFall = Math.sqrt(2 * lidH / 2400), lid = FX.dropBounce(lt - (lidT - lidFall), lidH, .25); // lid lands exactly at lidT (the clang)
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    T.shape(ctx, '#2e3f55', 0, rect(-400, -300, 2100, 1300));                        // blue stage curtain
    for (let x = -400, i = 0; x < 1700; x += 78, i++) shape(ctx, '#243346', 0, rect(x + 22, -300, 22, 1300));
    shape(ctx, '#5a4231', 0, rect(-400, 690, 2100, 300)); line(ctx, [[-400, 690], [1700, 690]], 4, 'rgba(0,0,0,.45)');
    glow(ctx, 640, 420, 420, 'rgba(255,220,160,.25)');
    T.shadow(ctx, X, Y + 4, Wc * .62, 16, .5, 6);
    canBody(ctx, X, Y, Wc, Hc, false);
    if (lt < lidT) { // him, visible only above the mouth of the can
      ctx.save(); ctx.beginPath(); ctx.rect(0, -400, 1280, mouthY + 400); ctx.clip();
      G.Rig.drawSuit(ctx, X - 266 * S, mouthY - 1461 * S + 120 + sink, S, { look: [.3, .6], breathe: 0 });
      ctx.restore();
    }
    canBody(ctx, X, Y, Wc, Hc, true);
    if (lt > .08 && lt < .5) { const r = rng(5); for (let i = 0; i < 14; i++) { const k = lt - .08, a = -Math.PI / 2 + (r() - .5) * 1.6, v = 300 + r() * 260; const px = X + Math.cos(a) * v * k, py = mouthY + Math.sin(a) * v * k + 1100 * k * k; shape(ctx, '#bfe3ef', 2, T.ellipse(px, py, 7, 10)); } } // splash
    if (lt > lidT - lidFall) { const ly = mouthY - lid; shape(ctx, '#aab2b7', 5, T.ellipse(X, ly - 8, Wc * .36, 22)); shape(ctx, '#8b9398', 5, rect(X - 26, ly - 46, 52, 30, 8)); }
    if (lt >= lidT) for (const s of [-1, 1]) { // hasps: hinged on the lid rim, folded down over staples riveted to the collar
      const hx = X + s * 96, fold = FX.settle(clamp((lt - lidT - .02) / .1));
      ctx.save(); ctx.translate(hx, mouthY - 10); ctx.scale(1, lerp(-.3, 1, fold));
      shape(ctx, '#7d868b', 4, rect(-10, 0, 20, 58, 4)); shape(ctx, '#2a2f33', 2, rect(-4, 40, 8, 12, 2)); ctx.restore();
      shape(ctx, '#5d656b', 3, rect(hx - 9, mouthY + 34, 18, 16, 3));                                   // staple on the collar
    }
    for (const [i, s] of [[0, -1], [1, 1]]) { // padlock shackle passes through hasp + staple, then snaps shut
      const k = lt - (lidT + .14 + i * .1); if (k <= 0) continue;
      const hx = X + s * 96, sw = FX.ring(k, .25, 2.2, 4);                                                // swings, then hangs still
      ctx.save(); ctx.translate(hx, mouthY + 44); ctx.rotate(sw); ctx.scale(FX.settle(k / .1), FX.settle(k / .1));
      shape(ctx, null, 6, c => c.arc(0, 8, 12, Math.PI, 0)); shape(ctx, '#c9a14a', 4, rect(-17, 8, 34, 30, 5));
      ctx.fillStyle = FX.INK; ctx.beginPath(); ctx.arc(0, 20, 3.5, 0, 7); ctx.fill(); ctx.fillRect(-1.5, 21, 3, 8); ctx.restore();
    }
    if (lt > lidT + .25) for (let i = 0; i < 3; i++) { const k = ((lt - lidT - .25) * 1.6 + i / 3) % 1; shape(ctx, '#bfe3ef', 2, T.ellipse(X + 120 - i * 50, mouthY + 20 + k * 400, 5, 8)); } // water leaking from the rim
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1908');
    FX.caption(ctx, 'THE MILK CAN ESCAPE', lt, .25);
  }

  // ================= 02D — the water torture cell (held) =================
  function shotWaterCell(ctx, lt, dur, t) {
    const TX = 640, top = 120, bot = 690, tw = 300, S = .36, ank = [266, 1370];
    const lidY = top - 10, water = top + 10;                                          // stocks board at ankle height; tank filled to the brim
    const drift = Math.sin(t * 1.1) * .025, bob = 0;                                  // ankles are clamped: he can only sway from them
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.12), 640, 400);
    shape(ctx, '#1f2a3d', 0, rect(-400, -300, 2100, 1300));
    for (let x = -400; x < 1700; x += 78) shape(ctx, '#18212f', 0, rect(x + 22, -300, 22, 1300));
    shape(ctx, '#3e3027', 0, rect(-400, 690, 2100, 300));
    glow(ctx, TX, 420, 380, 'rgba(160,210,255,.22)');
    // water volume behind him
    ctx.fillStyle = grad(ctx, 0, water, 0, bot, [[0, 'rgba(120,190,220,.55)'], [1, 'rgba(40,110,150,.75)']]); ctx.fillRect(TX - tw / 2, water, tw, bot - water);
    // him, head-down; the ankle pivot sits exactly in the stocks, feet stick out above the lid
    ctx.save(); ctx.translate(TX, lidY); ctx.rotate(Math.PI + drift);
    G.Rig.drawSuit(ctx, -ank[0] * S, -ank[1] * S, S, { look: [.1, .3], blink: G.Rig.blinkAt(t, [16.2], .35), breathe: 0 });
    ctx.restore();
    // bubbles from his mouth rise toward his feet (the surface) and gather under the lid
    const mouthR = 1461 * S - 70 - (1461 - ank[1]) * S, mouth = [TX - Math.sin(drift) * mouthR - 8, lidY + Math.cos(drift) * mouthR];
    for (let i = 0; i < 9; i++) { const k = ((lt * .55 + i / 9) % 1), wob = Math.sin(k * 14 + i) * 8; const yy = lerp(mouth[1], water + 12, k); shape(ctx, 'rgba(230,248,255,.5)', 2.5, circle(mouth[0] + wob + i % 3 * 6, yy, 4 + k * 7)); }
    // water surface, caustic ripples, glass and frame on top
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .12; for (let i = 0; i < 6; i++) { const y = top + 80 + i * 90 + Math.sin(t * 1.4 + i) * 8; line(ctx, [[TX - tw / 2, y], [TX - 40, y + 14], [TX + tw / 2, y - 6]], 3, '#e8fbff'); } ctx.restore();
    line(ctx, [[TX - tw / 2, water + Math.sin(t * 2) * 1.5], [TX + tw / 2, water - Math.sin(t * 2) * 1.5]], 3, 'rgba(230,248,255,.8)');
    ctx.fillStyle = 'rgba(220,240,255,.1)'; ctx.fillRect(TX - tw / 2, top, tw, bot - top);
    line(ctx, [[TX - tw / 2 + 24, top + 60], [TX - tw / 2 + 24, bot - 40]], 6, 'rgba(255,255,255,.35)');
    for (const x of [TX - tw / 2, TX + tw / 2]) shape(ctx, '#6f777c', 4, rect(x - 10, top - 10, 20, bot - top + 20, 4));
    // stocks lid: two half-boards closed around the ankles, hasps + padlocks on both ends
    shape(ctx, '#5c4637', 4, rect(TX - tw / 2 - 30, lidY - 16, tw + 60, 32, 4)); line(ctx, [[TX - tw / 2 - 30, lidY], [TX + tw / 2 + 30, lidY]], 3);
    for (const ax of [(266 - 150) * S, (266 - 370) * S]) { const x = TX + ax * Math.cos(drift); shape(ctx, '#2a1f18', 3, T.ellipse(x, lidY, 16, 7)); }
    for (const s of [-1, 1]) { const x = TX + s * (tw / 2 + 12);
      shape(ctx, '#7d868b', 3.5, rect(x - 8, lidY - 14, 16, 46, 3));
      ctx.save(); ctx.translate(x, lidY + 36); ctx.rotate(Math.sin(t * .9 + s) * .04);
      shape(ctx, null, 5, c => c.arc(0, 6, 10, Math.PI, 0)); shape(ctx, '#c9a14a', 3.5, rect(-14, 6, 28, 26, 4)); ctx.restore(); }
    shape(ctx, '#6f777c', 4, rect(TX - tw / 2 - 20, bot - 6, tw + 40, 26, 4));
    ctx.restore();
    FX.vignette(ctx, 640, 400, .6);
    FX.dateTag(ctx, '1912');
    FX.caption(ctx, 'THE WATER TORTURE CELL', lt, .4);
  }

  G.Part1 = { shotExterior, shotRoom, shotCloseups, shotStageWide, shotStageClose, shotStraitjacket, shotMilkCan, shotWaterCell, CUFFS };
})(window);
