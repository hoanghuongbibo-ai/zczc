/* Preview (0–12.1 s) in the reference's explainer style: flat sets, soft
 * vignette + centre glow, a paper date tag top-left, slow steady push-ins,
 * hard cuts, props that drop/snap in with a small settle, damped swings.
 * Cues (narration words): "the most famous" 4.17 · "died" 6.47 · "Harry Houdini" 7.67 ·
 * "getting out" 9.95 · "things" 10.39 · "killed" 11.14. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Props;
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
    const open = back(clamp(k / .14)), fall = Math.max(0, k - .12), side = x < 292 ? -1 : 1;
    return { x: x + side * fall * 140, y: y + 1000 * fall * fall, axis: axis + side * fall * 4, open: clamp(open), a: clamp(1 - (fall - .4) / .2) };
  }
  function cuffs(ctx, t) {
    const S = CUFFS.map(c => cuffState(c, t));
    if (S[0].open === 0 && S[1].open === 0) P.chain(ctx, [S[0].x + 14, S[0].y + 16], [S[1].x - 14, S[1].y + 16], 24, Math.sin(t * 2.2) * 3, 8);
    for (const i of [2, 3]) {
      const s = S[i], settle = Math.exp(-Math.max(0, t - 7.7) * .6); // chain swing dies down after the cut in
      ctx.save(); ctx.globalAlpha = s.a; P.chain(ctx, [s.x, s.y + 14], [s.x + Math.sin(t * 2.4 + i) * 40 * (.3 + settle), s.y + 320], 14, 0, 9); ctx.restore();
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
    const flex = CUFFS.reduce((a, c) => { const k = t - c[4]; return a + (k > 0 && k < .5 ? Math.sin(k * 18) * Math.exp(-k * 7) : 0); }, 0);
    G.Rig.drawSuit(ctx, 374, 0, 1, { breathe: (Math.sin(t * 1.7) + 1) / 2, handsY: -10 * flex + Math.sin(t * 2.4) * 1.5, handsRot: .04 * flex, look: [.15, .95] });
    ctx.save(); ctx.translate(374, 0); cuffs(ctx, t); ctx.restore();
    ctx.restore();
    vignette(ctx, 640, 360, .5);
    dateTag(ctx, '1891 – 1926');
  }

  const shots = [
    { start: 0, end: 3.95, draw: shotExterior },
    { start: 3.95, end: 5.4, draw: shotRoom },
    { start: 5.4, end: 6.95, draw: shotCloseups },
    { start: 6.95, end: 7.7, draw: () => {} },          // cut to black after "died"
    { start: 7.7, end: 9.6, draw: shotStageWide },
    { start: 9.6, end: 12.1, draw: shotStageClose },
  ];
  const sfx = [{ t: 7.72, type: 'rattle', gain: .4 }, ...CUFFS.map(c => ({ t: c[4], type: 'click' }))];

  G.Show = {
    duration: 12.1, narration: 'assets/audio/narration-preview.mp3', shots, sfx,
    moods: [{ t: 0, mood: 'still' }, { t: 6.95, mood: 'silence' }, { t: 7.7, mood: 'tense' }],
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png', suitEyeL: 'assets/img/rig/suit-eye-l.png', suitEyeR: 'assets/img/rig/suit-eye-r.png', bedEyeL: 'assets/img/rig/bed-eye-l.png', bedEyeR: 'assets/img/rig/bed-eye-r.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka'],
  };
})(window);
