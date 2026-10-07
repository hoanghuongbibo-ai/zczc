/* Preview (0–12.1 s): PART 01 "The Death of Harry Houdini" + the opening of
 * PART 02 (handcuffs). Cue times come from the narration's word timings:
 *  "died" 6.47 · "Harry Houdini" 7.67 · "getting out" 9.95 · "things" 10.39 · "killed" 11.14 */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, IMG, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng } = T;

  const C = {
    skyTop: '#8f979a', skyBot: '#c9c4b6', brick: '#8c5b4a', brickDark: '#6f4638', trim: '#e6dcc6', glass: '#55606a',
    lit: '#f1c272', tree: '#43372e', road: '#58554d', walk: '#8a8577', grass: '#6d6a4f',
    wall: '#5f6d6b', wainscot: '#4b524c', curtain: '#d8cdb3', wood: '#7a5a40', woodDark: '#5c4230',
    steel: '#a3abb0', steelDark: '#6f777c', gold: '#c9a14a', skin: '#e8a676', gown: '#d4cec2', sheet: '#e9e2d2',
    stageRed: '#5c1f1b',
  };

  // ---------- PART 01A props ----------
  function tree(ctx, x, y, s, seed) {
    const r = rng(seed);
    const branch = (x0, y0, len, ang, w, d) => {
      const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len;
      line(ctx, [[x0, y0], [x1, y1]], w, C.tree);
      if (d > 0) for (let i = 0; i < 2 + (r() > .6); i++) branch(x1, y1, len * (.62 + r() * .15), ang + (r() - .5) * 1.1, w * .66, d - 1);
    };
    branch(x, y, 120 * s, -Math.PI / 2 + (r() - .5) * .2, 14 * s, 5);
  }
  function car(ctx, x, y, s, color) { // 1920s sedan: tall cabin, arched fenders, spoked wheels
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, color, 3, poly([[-70, -34], [-66, -96], [26, -96], [34, -34]]));            // cabin
    shape(ctx, '#3b4448', 2.5, rect(-58, -88, 36, 34, 3)); shape(ctx, '#3b4448', 2.5, rect(-14, -88, 36, 34, 3));
    shape(ctx, color, 3, poly([[30, -54], [92, -50], [96, -26], [30, -24]]));              // bonnet
    shape(ctx, '#2a2a28', 3, rect(92, -56, 10, 32, 2));                                     // radiator
    shape(ctx, '#2a2a28', 3, rect(-84, -22, 186, 8, 3));                                    // running board
    for (const wx of [-56, 66]) {
      shape(ctx, '#2a2a28', 3, c => { c.moveTo(wx - 36, -10); c.quadraticCurveTo(wx, -58, wx + 36, -10); c.closePath(); }); // fender
      shape(ctx, '#222', 3, circle(wx, 0, 24)); shape(ctx, '#d8d0bc', 2, circle(wx, 0, 17));
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; line(ctx, [[wx, 0], [wx + Math.cos(a) * 16, Math.sin(a) * 16]], 2); }
      shape(ctx, '#222', 2, circle(wx, 0, 4));
    }
    shape(ctx, '#f0e2b0', 2.5, circle(102, -60, 7));
    ctx.restore();
  }
  function kid(ctx, x, y, s, kind) { // tiny far-off trick-or-treaters
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bob = Math.abs(Math.sin(T.E.t * 7 + x)) * 3;
    ctx.translate(0, -bob);
    if (kind === 'ghost') {
      shape(ctx, '#f1ede4', 2.5, smooth([[-16, 0], [-18, -40], [0, -62], [18, -40], [16, 0], [8, -6], [0, 0], [-8, -6]]));
      ctx.fillStyle = T.LINE; ctx.beginPath(); ctx.ellipse(-6, -40, 3, 4, 0, 0, 7); ctx.ellipse(6, -40, 3, 4, 0, 0, 7); ctx.fill();
    } else {
      shape(ctx, '#2c2a33', 2.5, poly([[-14, 0], [-10, -34], [10, -34], [14, 0]]));
      shape(ctx, C.skin, 2.5, circle(0, -44, 10));
      shape(ctx, '#2c2a33', 2.5, poly([[-18, -48], [18, -48], [2, -82]]));
    }
    ctx.restore();
  }
  function windowPane(ctx, x, y, w, h, litK = 0) {
    shape(ctx, C.trim, 3, rect(x - 6, y - 6, w + 12, h + 12));
    shape(ctx, litK ? mix(C.glass, C.lit, litK) : C.glass, 2.5, rect(x, y, w, h));
    line(ctx, [[x + w / 2, y], [x + w / 2, y + h]], 3, C.trim); line(ctx, [[x, y + h / 2], [x + w, y + h / 2]], 3, C.trim);
    if (litK) { ctx.save(); ctx.globalAlpha = .55 * litK; shape(ctx, '#c79a5a', 0, rect(x, y, w * .3, h)); shape(ctx, '#c79a5a', 0, rect(x + w * .72, y, w * .28, h)); ctx.restore(); }
  }
  function mix(a, b, k) {
    const p = s => [1, 3, 5].map(i => parseInt(s.substr(i, 2), 16)), A = p(a), B = p(b);
    return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})`;
  }
  const leaves = Array.from({ length: 34 }, (_, i) => { const r = rng(300 + i); return { x: r() * 1400 - 60, y0: r() * 720, sp: 30 + r() * 40, sw: r() * 6, c: ['#a65a2a', '#c58a3a', '#7d4a2a'][i % 3] }; });

  function shotExterior(ctx, lt, dur) {
    const z = lerp(1, 3.4, ease.in(prog(lt, .4, dur))), fx = lerp(640, 724, ease.inOut(prog(lt, 0, dur * .8))), fy = lerp(360, 329, ease.inOut(prog(lt, 0, dur * .8)));
    cam(ctx, z, fx, fy);
    ctx.fillStyle = grad(ctx, 0, 0, 0, 600, [[0, C.skyTop], [1, C.skyBot]]); ctx.fillRect(-200, -200, 1700, 1000);
    for (const [cx, cy, s] of [[200, 110, 1], [760, 70, 1.3], [1150, 130, .9]]) { // flat clouds drifting
      const x = cx + lt * 6;
      ctx.save(); ctx.globalAlpha = .55; shape(ctx, '#b3b5b0', 0, ellipse(x, cy, 120 * s, 26 * s)); shape(ctx, '#b3b5b0', 0, ellipse(x + 50 * s, cy - 18 * s, 70 * s, 24 * s)); ctx.restore();
    }
    // hospital
    shape(ctx, C.brick, 4, rect(300, 170, 700, 440));
    shape(ctx, C.brickDark, 4, poly([[290, 170], [1010, 170], [990, 140], [310, 140]]));
    shape(ctx, C.trim, 3, rect(280, 160, 740, 14));
    ctx.save(); ctx.globalAlpha = .18; for (let y = 190; y < 600; y += 14) line(ctx, [[302, y], [998, y]], 1.2, '#3b2219'); ctx.restore();
    for (let row = 0; row < 4; row++) for (let col = 0; col < 7; col++) {
      if (row === 3 && (col === 3)) continue;
      const x = 330 + col * 92, y = 200 + row * 96, target = row === 1 && col === 4;
      windowPane(ctx, x, y, 52, 66, target ? 1 : 0);
    }
    shape(ctx, C.trim, 3, rect(590, 500, 120, 110)); shape(ctx, '#3e3530', 3, rect(612, 520, 76, 90, 4)); // entrance
    shape(ctx, C.trim, 3, rect(555, 470, 190, 26)); ctx.fillStyle = T.LINE; ctx.font = 'bold 17px "DejaVu Serif"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('HOSPITAL', 650, 484);
    // street
    shape(ctx, C.walk, 3, rect(-200, 610, 1700, 30)); shape(ctx, C.road, 0, rect(-200, 640, 1700, 200));
    tree(ctx, 170, 610, 1.4, 7); tree(ctx, 1110, 612, 1.25, 9); tree(ctx, 60, 612, 1, 11);
    // trick-or-treaters crossing far back, small detail
    const kx = lerp(380, 560, lt / dur);
    kid(ctx, kx, 612, .55, 'ghost'); kid(ctx, kx - 34, 612, .55, 'witch');
    car(ctx, 210, 682, 1.1, '#2f3b3a'); car(ctx, 1060, 690, 1.05, '#4b3a33');
    // falling leaves
    for (const L of leaves) {
      const y = (L.y0 + lt * L.sp) % 740 - 20, x = L.x + Math.sin(lt * 1.6 + L.sw) * 12;
      shape(ctx, L.c, 1.5, ellipse(x, y, 6, 3, lt * 2 + L.sw));
    }
    // warm light swells as we reach the window
    T.fill(ctx, '#f6d9a0', ease.in(prog(lt, dur - .45, dur)) * .9);
  }

  // ---------- PART 01B: the room ----------
  function silhouette(ctx, x, y, s, kind) { // subdued doctor / nurse, read as shapes against the light
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const dark = '#2b302f', mid = '#363c3b';
    if (kind === 'doctor') { // long coat, head bowed slightly, clipboard held low
      shape(ctx, dark, 3, smooth([[-62, 0], [-58, -150], [-64, -250], [-30, -282], [30, -282], [62, -250], [56, -150], [60, 0]]));
      shape(ctx, mid, 2.5, poly([[-4, -282], [-26, -200], [-8, -120]], false));
      shape(ctx, dark, 3, smooth([[-60, -250], [-84, -160], [-70, -110], [-50, -150], [-44, -240]]));       // arm
      shape(ctx, '#3a403e', 2.5, rect(-104, -156, 46, 62, 3));                                          // clipboard
      shape(ctx, dark, 3, ellipse(6, -318, 34, 40, .12));                                                // head
      shape(ctx, dark, 3, poly([[-14, -282], [18, -282], [14, -292], [-10, -292]]));                       // neck
    } else { // nurse: cap, cape over shoulders, hands folded
      shape(ctx, dark, 3, smooth([[-50, 0], [-44, -140], [-58, -222], [-26, -256], [26, -256], [58, -222], [44, -140], [50, 0]]));
      shape(ctx, mid, 2.5, smooth([[-60, -224], [-30, -258], [30, -258], [60, -224], [40, -190], [-40, -190]]));
      shape(ctx, dark, 3, ellipse(-4, -290, 30, 36, -.1));
      shape(ctx, mid, 3, poly([[-34, -312], [26, -318], [20, -340], [-26, -336]]));
      shape(ctx, mid, 2.5, ellipse(0, -160, 22, 12));                                                   // folded hands
    }
    ctx.restore();
  }
  function shotRoom(ctx, lt, dur) {
    cam(ctx, lerp(1, 1.07, lt / dur), 620, 380);
    shape(ctx, C.wall, 0, rect(-100, -100, 1500, 620)); shape(ctx, C.wainscot, 3, rect(-100, 470, 1500, 400));
    // window with Detroit grey outside
    ctx.fillStyle = grad(ctx, 0, 110, 0, 430, [[0, '#a9aea9'], [1, '#cfc8b6']]); ctx.fillRect(930, 110, 230, 320);
    line(ctx, [[1000, 430], [1030, 300], [1080, 250], [1150, 230]], 6, '#5a5048'); line(ctx, [[1030, 300], [990, 240]], 4, '#5a5048');
    shape(ctx, null, 5, rect(930, 110, 230, 320)); line(ctx, [[1045, 110], [1045, 430]], 5, C.trim); line(ctx, [[930, 270], [1160, 270]], 5, C.trim);
    const sway = Math.sin(lt * 1.3) * 10;
    shape(ctx, C.curtain, 3, poly([[900, 90], [960, 90], [950 + sway, 470], [895, 470]]));
    shape(ctx, C.curtain, 3, poly([[1130, 90], [1190, 90], [1195, 470], [1140 + sway * .7, 470]]));
    // the bed (supplied art) and the two figures
    ctx.drawImage(IMG.bed, 330, 190, IMG.bed.width * .42, IMG.bed.height * .42);
    silhouette(ctx, 220, 720, 1.05, 'doctor');
    silhouette(ctx, 875, 700, .95, 'nurse');
    // dim the room except the window light falling on the bed
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createRadialGradient(900, 300, 80, 700, 380, 900); g.addColorStop(0, 'rgba(20,24,26,0.05)'); g.addColorStop(1, 'rgba(12,14,16,0.62)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    T.fill(ctx, '#f6d9a0', (1 - ease.out(prog(lt, 0, .5))) * .9); // match-cut glow carries over
  }

  // ---------- PART 01C: bedside objects → the hand ----------
  function glass(ctx, x, y) {
    ctx.save(); ctx.globalAlpha = .9;
    shape(ctx, 'rgba(200,215,220,0.35)', 4, poly([[x - 70, y - 260], [x + 70, y - 260], [x + 56, y], [x - 56, y]]));
    shape(ctx, 'rgba(150,180,190,0.45)', 0, poly([[x - 63, y - 150], [x + 63, y - 150], [x + 56, y], [x - 56, y]]));
    line(ctx, [[x - 63, y - 150], [x + 63, y - 150]], 3); line(ctx, [[x - 40, y - 230], [x - 34, y - 40]], 6, 'rgba(255,255,255,0.6)');
    ctx.restore();
  }
  function watch(ctx, x, y, lt) {
    ctx.beginPath(); ctx.moveTo(x + 105, y - 40); ctx.bezierCurveTo(x + 170, y + 20, x + 250, y - 20, x + 340, y + 16); ctx.lineWidth = 9; ctx.strokeStyle = T.LINE; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.gold; ctx.stroke();
    shape(ctx, C.gold, 5, circle(x, y - 70, 110)); shape(ctx, '#f3ead6', 4, circle(x, y - 70, 88));
    shape(ctx, C.gold, 4, rect(x - 18, y - 205, 36, 28, 6)); shape(ctx, null, 5, circle(x, y - 222, 16));
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [[x + Math.cos(a) * 72, y - 70 + Math.sin(a) * 72], [x + Math.cos(a) * 82, y - 70 + Math.sin(a) * 82]], 3); }
    line(ctx, [[x, y - 70], [x - 30, y - 110]], 6); line(ctx, [[x, y - 70], [x + 52, y - 52]], 4); // stopped at the hour
  }
  function cuffRing(ctx, x, y, rx, ry, rot, open = 0) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, open * 1.1, Math.PI * 2 - open * .2);
    ctx.lineWidth = ry * .55 + 10; ctx.strokeStyle = T.LINE; ctx.stroke();
    ctx.lineWidth = ry * .55; ctx.strokeStyle = C.steel; ctx.stroke();
    shape(ctx, C.steelDark, 3, rect(rx - 10, -ry * .5, 26, ry, 4)); // lock box
    ctx.restore();
  }
  function chain(ctx, pts, size = 10) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / (size * 1.6)));
      for (let k = 0; k < n; k++) { const f = (k + .5) / n; shape(ctx, C.steel, 2.5, ellipse(lerp(x0, x1, f), lerp(y0, y1, f), size, size * .55, Math.atan2(y1 - y0, x1 - x0) + (k % 2) * Math.PI / 2)); }
    }
  }
  function handcuffs(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    chain(ctx, [[-60, -40], [0, -20], [60, -40]], 11);
    cuffRing(ctx, -120, -40, 70, 40, -.15); cuffRing(ctx, 120, -40, 70, 40, .15);
    ctx.restore();
  }
  function hangingHand(ctx, x, y) { // side of the bed: sheet + blanket hems, metal rail, limp arm
    const hem = (y0, amp, seed) => { const r = rng(seed), pts = []; for (let k = 0; k <= 14; k++) pts.push([x + 420 - k * 80, y0 + Math.sin(k * 1.7) * amp + r() * amp]); return pts; };
    shape(ctx, '#2e3433', 0, rect(x - 760, y - 120, 1300, 400));                                           // shadow under the bed
    shape(ctx, '#8b8170', 4, rect(x - 760, y - 160, 1200, 26, 8));                                          // metal side rail
    shape(ctx, C.sheet, 4, poly([[x - 760, y - 520], [x + 420, y - 520], ...hem(y - 190, 12, 4), [x - 760, y - 190]]));
    for (const k of [-560, -420, -250, 160, 300]) line(ctx, [[x + k, y - 330], [x + k + 14, y - 200]], 2.5, 'rgba(29,26,23,.35)');
    shape(ctx, '#97a6a2', 4, poly([[x - 760, y - 520], [x + 420, y - 520], ...hem(y - 330, 10, 8), [x - 760, y - 330]]));
    for (const k of [-600, -380, -150, 220]) line(ctx, [[x + k, y - 500], [x + k + 20, y - 350]], 2.5, 'rgba(29,26,23,.35)');
    shape(ctx, C.gown, 4, smooth([[x - 80, y - 360], [x + 50, y - 370], [x + 64, y - 270], [x - 20, y - 240], [x - 74, y - 270]]));  // sleeve over the hem
    shape(ctx, C.skin, 4, smooth([[x - 30, y - 262], [x + 34, y - 268], [x + 32, y - 130], [x + 40, y - 50], [x + 52, y + 10], [x + 40, y + 70], [x + 10, y + 96], [x - 18, y + 90], [x - 26, y + 40], [x - 20, y - 40], [x - 26, y - 130]]));
    line(ctx, [[x + 40, y - 30], [x + 62, y + 20], [x + 54, y + 52]], 3.5);                                // thumb
    for (const k of [-8, 8, 24]) line(ctx, [[x + k, y + 30], [x + k + 3, y + 88]], 3);                    // fingers
  }
  function shotCloseups(ctx, lt, dur) {
    // pan: glass → watch → cuffs → hand ("died")
    const keys = [[0, 380], [.45, 1100], [.85, 1820], [1.15, 2500]];
    let px = keys[keys.length - 1][1];
    for (let i = 0; i < keys.length - 1; i++) if (lt < keys[i + 1][0]) { px = lerp(keys[i][1], keys[i + 1][1], ease.inOut(prog(lt, keys[i][0], keys[i + 1][0]))); break; }
    cam(ctx, 1, px, 360);
    shape(ctx, '#4f5b59', 0, rect(-400, -100, 3600, 1000));
    ctx.fillStyle = grad(ctx, 0, 470, 0, 760, [[0, C.wood], [1, C.woodDark]]); ctx.fillRect(-400, 470, 2560, 400);
    line(ctx, [[-400, 470], [2160, 470]], 5); line(ctx, [[2160, 470], [2160, 900]], 5);
    glass(ctx, 380, 520); watch(ctx, 1100, 540, lt); handcuffs(ctx, 1820, 520, 1.25);
    shape(ctx, '#3f4746', 0, rect(2160, -100, 1100, 1000));
    hangingHand(ctx, 2500, 520);
    // window light sliding across, and the final fade to black on "died"
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, 'rgba(10,12,14,.5)'); g.addColorStop(.5, 'rgba(10,12,14,0)'); g.addColorStop(1, 'rgba(10,12,14,.5)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    T.fill(ctx, '#000', ease.inOut(prog(lt, dur - .3, dur)));
  }

  // ---------- PART 02A: handcuffs on the supplied suit art ----------
  const IX = 374, IY = 0; // suit image placement in world space (scale 1)
  const CUFFS = [ // image-space wrists: [x, y, rot, clickTime]
    [222, 692, -.9, 9.95], [362, 700, .9, 10.39], [192, 768, -1.0, 11.14], [394, 778, 1.0, 11.45],
  ];
  function shotHandcuffs(ctx, lt, dur, t) {
    const close = lt > 1.9; // medium shot first ("Harry Houdini…"), then hard cut to the hands
    const shake = CUFFS.reduce((a, c) => a + (t > c[3] && t < c[3] + .12 ? (Math.sin(t * 160) * 4) : 0), 0);
    if (close) cam(ctx, lerp(2.1, 2.35, prog(lt, 1.9, dur)), IX + 292 + shake, IY + 720);
    else cam(ctx, lerp(.62, .7, lt / 1.9), IX + 266, IY + 640);
    // stage backdrop: red curtain folds + spotlight
    shape(ctx, C.stageRed, 0, rect(-800, -600, 2900, 2800));
    for (let x = -800; x < 2100; x += 70) { ctx.save(); ctx.globalAlpha = .25; shape(ctx, '#3d1210', 0, rect(x, -600, 26, 2800)); ctx.restore(); }
    const sp = ctx.createRadialGradient(IX + 266, IY + 600, 50, IX + 266, IY + 600, 900); sp.addColorStop(0, 'rgba(255,225,170,0.35)'); sp.addColorStop(1, 'rgba(255,225,170,0)');
    ctx.fillStyle = sp; ctx.fillRect(-800, -600, 2900, 2800);
    ctx.drawImage(IMG.suit, IX, IY);
    // chains drape from the lower cuffs off frame
    chain(ctx, [[IX + 192, IY + 790], [IX + 230, IY + 900], [IX + 250, IY + 1050]], 9);
    chain(ctx, [[IX + 394, IY + 800], [IX + 360, IY + 920], [IX + 350, IY + 1060]], 9);
    chain(ctx, [[IX + 222, IY + 708], [IX + 292, IY + 742], [IX + 362, IY + 716]], 8);
    for (const [x, y, rot, ct] of CUFFS) {
      const k = clamp((t - ct) / .5);
      if (k <= 0) cuffRing(ctx, IX + x, IY + y, 40, 20, rot, 0);
      else { // springs open and drops away
        ctx.save(); ctx.globalAlpha = 1 - ease.in(clamp((t - ct - .25) / .4));
        cuffRing(ctx, IX + x + (x < 292 ? -1 : 1) * k * 30, IY + y + ease.in(k) * 160, 40, 20, rot + (x < 292 ? -1 : 1) * k * .8, Math.min(1, k * 3));
        ctx.restore();
      }
    }
    T.fill(ctx, '#000', 1 - ease.out(prog(lt, 0, .18)));
    T.fill(ctx, '#000', ease.in(prog(lt, dur - .35, dur)));
  }

  const shots = [
    { start: 0, end: 4.15, draw: shotExterior },
    { start: 4.15, end: 5.45, draw: shotRoom },
    { start: 5.45, end: 7.1, draw: shotCloseups },
    { start: 7.1, end: 7.7, draw: () => {} }, // cut to black
    { start: 7.7, end: 12.1, draw: shotHandcuffs },
  ];
  const sfx = [
    { t: 3.7, type: 'window', gain: .8 },
    ...CUFFS.map(c => ({ t: c[3], type: 'click' })),
    { t: 7.72, type: 'rattle', gain: .5 },
  ];

  G.Show = {
    duration: 12.1, narration: 'assets/audio/narration-preview.mp3', shots, sfx,
    moods: [{ t: 0, mood: 'still' }, { t: 7.1, mood: 'silence' }, { t: 7.7, mood: 'tense' }],
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png' },
  };
})(window);
