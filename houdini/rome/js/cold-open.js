/* Rome — Cold open (narration-coldopen.mp3 = narration-full.mp3 0–93.4 s + tail). New "storybook" style (paint.js):
 * long painted holds, slow pushes, cross-dissolves, acting chibis, quiet serif captions. The fixed Forum shot (forum())
 * is the series anchor: 'medieval' (1300s cow field) · 'ancient' (~AD 100) · 'today'. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, { W, H, lerp, clamp, ease } = T, { INK, ink, cel, chibi, cow, goat, mix } = P;
  const A = { pasture: 3.49, mud: 4.61, goats: 6.56, over: 8.62, top: 9.6, finger: 13.33, somebody: 14.48, arch: 17.1, laundry: 18.12, man: 19.5, cart: 20.57,
    didnt: 22.74, prying: 24.4, building: 25.0, thousand: 26.73, locals: 28.75, field: 30.41, hold: 31.98, move: 33.8, rewind: 34.77, same: 36.03, year: 37.34,
    marble: 39.29, temples: 41.11, senators: 43.16, superbowl: 46.2, under: 48.12, water: 49.58, mountains: 51.97, around: 54.62, million: 56.97, more: 58.45,
    europe: 59.61, thousand2: 61.51, so: 63.25, million2: 66.76, cows: 68.02, stranger: 69.82, why: 71.33, babylon: 73.48, carthage: 74.63, but: 76.0,
    empire: 77.28, emperors: 78.23, water2: 79.14, people: 81.01, still: 82.27, capital: 83.66, full: 84.79, today: 86.01, story: 87.99, five: 90.66, didnt2: 92.26 };
  A.end = 96.6;
  const since = (t, k) => t - A[k];
  const k01 = (t, k, d = .4) => clamp(since(t, k) / d);

  // cast
  const YOU = { robe: '#7d5c40', hood: '#6a4a32', hair: '#5a3a24', hairStyle: 'short', seed: 3 };
  const WOMAN = { robe: '#9fb4c6', robeSh: '#6a7e94', hood: '#efe6d2', hairStyle: 'long', hair: '#4a3020', seed: 5 };
  const MAN = { robe: '#8a6a4c', hair: '#3a2a1a', hairStyle: 'short', beard: true, belt: '#5a3a24', seed: 7 };
  const SENATOR = { robe: '#f4efe4', toga: '#fbf8ef', trim: '#7a2a62', hair: '#8a8a84', hairStyle: 'short', seed: 9 };
  const CROWD = [{ robe: '#c87a4a', hair: '#2a1a14', hairStyle: 'curly' }, { robe: '#6a8aa8', hair: '#5a3a24', hairStyle: 'short' }, { robe: '#d8c49a', hair: '#1a1410', hairStyle: 'bun' },
    { robe: '#8aa06a', hair: '#7a5a3a', hairStyle: 'short', beard: true }, { robe: '#b86a6a', hair: '#2a1a14', hairStyle: 'long' }, { robe: '#e8dcc0', hair: '#4a3020', hairStyle: 'curly' }];
  const TOUR = [{ robe: '#3a6ab8', hair: '#d8b878', hairStyle: 'short' }, { robe: '#e84a6a', hair: '#2a1a14', hairStyle: 'long' }, { robe: '#f6c945', hair: '#5a3a24', hairStyle: 'bun' },
    { robe: '#3a8a5a', hair: '#1a1410', hairStyle: 'short' }, { robe: '#f4efe6', hair: '#8a5a34', hairStyle: 'curly' }, { robe: '#7a4a8a', hair: '#3a2a20', hairStyle: 'short' }];
  const phone = (ctx, x, y) => { ink(ctx, '#2a2a30', c => c.rect(x - 8, y - 30, 16, 26), 3); ctx.fillStyle = '#9ad0f0'; ctx.fillRect(x - 5, y - 27, 10, 18); };
  const crowbar = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(x - 10, y + 10); ctx.lineTo(x + 120, y - 70); ctx.stroke(); ctx.strokeStyle = '#6a6a72'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); };

  // ---------- the fixed Forum shot ----------
  function mudGround(ctx, t, y) { const g = ctx.createLinearGradient(0, y, 0, 760); g.addColorStop(0, '#9a8a5a'); g.addColorStop(.3, '#86704a'); g.addColorStop(1, '#5e4630'); ctx.fillStyle = g; ctx.fillRect(-600, y, 2600, 900);
    for (let i = 0; i < 14; i++) { const x = (i * 211) % 1500 - 60, yy = y + 30 + (i * 53) % 220, w = 60 + (i % 4) * 40; ctx.fillStyle = i % 3 ? 'rgba(122,150,74,.85)' : 'rgba(150,170,92,.8)'; ctx.beginPath(); ctx.ellipse(x, yy, w, w * .18, 0, 0, 7); ctx.fill(); }
    for (let i = 0; i < 6; i++) { const x = (i * 337) % 1300 + 20, yy = y + 70 + (i * 71) % 190, w = 50 + (i % 3) * 30; ctx.fillStyle = 'rgba(190,210,220,.55)'; ctx.beginPath(); ctx.ellipse(x, yy, w, w * .16, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(60,40,20,.35)'; ctx.lineWidth = 2; ctx.stroke(); } }
  function paving(ctx, y) { const g = ctx.createLinearGradient(0, y, 0, 760); g.addColorStop(0, '#e8dcc4'); g.addColorStop(1, '#cbb894'); ctx.fillStyle = g; ctx.fillRect(-600, y, 2600, 900);
    ctx.strokeStyle = 'rgba(120,96,64,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { const yy = y + i * i * 3.2; ctx.beginPath(); ctx.moveTo(-600, yy); ctx.lineTo(2000, yy); ctx.stroke(); } for (let i = -20; i < 30; i++) { ctx.beginPath(); ctx.moveTo(640 + i * 20, y); ctx.lineTo(640 + i * 120, 900); ctx.stroke(); } }
  function hut(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    cel(ctx, c => c.rect(-80, -110, 160, 110), '#b89a72', { shade: '#7a6040', dx: 10, dy: 0 }); ink(ctx, '#5a3a24', c => c.rect(-22, -70, 44, 70), 4); ink(ctx, '#3a2a1a', c => c.rect(36, -84, 24, 22), 3);
    cel(ctx, c => { c.moveTo(-104, -100); c.lineTo(0, -190); c.lineTo(104, -100); c.closePath(); }, '#c8a660', { shade: '#8a6a34', light: '#e8cc88', dx: -6, dy: 8 }); ctx.save(); ctx.strokeStyle = 'rgba(90,60,30,.6)'; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 22, -104); ctx.lineTo(-40 + i * 10, -170); ctx.stroke(); } ctx.restore(); ctx.restore(); }
  function laundry(ctx, x0, y0, x1, y1, t) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 18, x1, y1); ctx.stroke(); ctx.restore();
    const C = ['#f4efe2', '#c8d8e8', '#e8c8a8', '#f4efe2', '#b8c89a']; for (let i = 0; i < 5; i++) { const u = (i + .7) / 5.6, x = lerp(x0, x1, u), y = lerp(y0, y1, u) + Math.sin(u * Math.PI) * 18, w = 34 + (i % 2) * 10, fl = Math.sin(t * 3 + i) * 6;
      ink(ctx, C[i], c => { c.moveTo(x - w / 2, y); c.lineTo(x + w / 2, y); c.quadraticCurveTo(x + w / 2 + fl, y + 30, x + w / 2 + fl * 1.5, y + 54); c.lineTo(x - w / 2 + fl * 1.5, y + 54); c.quadraticCurveTo(x - w / 2 + fl, y + 30, x - w / 2, y); c.closePath(); }, 3); } }
  function tower(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => c.rect(-34, -220, 68, 220), '#b8987a', { shade: '#806048', dx: 10, dy: 0 }); for (let i = 0; i < 4; i++) ink(ctx, '#b8987a', c => c.rect(-34 + i * 19, -236, 12, 16), 3); ink(ctx, '#3a2a1a', c => c.rect(-7, -180, 14, 26), 3); ctx.restore(); }
  // the two hills are drawn solid (ink outline) so everything on them stands on visible ground
  const HILL_L = c => { c.moveTo(-220, 490); c.lineTo(-220, 336); c.quadraticCurveTo(60, 318, 200, 336); c.quadraticCurveTo(320, 360, 440, 490); c.closePath(); };
  const HILL_R = c => { c.moveTo(860, 490); c.quadraticCurveTo(960, 360, 1080, 340); c.quadraticCurveTo(1260, 326, 1500, 336); c.lineTo(1500, 490); c.closePath(); };
  function hillPaint(ctx, fn, haze) { cel(ctx, fn, mix('#8fa45a', haze, .22), { shade: mix('#5e7a3c', haze, .2), light: mix('#b8c878', haze, .2), dx: -10, dy: 12, lw: 4 }); }
  function capitoline(ctx, era, haze) { hillPaint(ctx, HILL_L, haze);
    if (era === 'ancient') P.temple(ctx, 70, 334, .32, { roof: '#d8b048' });
    else if (era === 'medieval') { ink(ctx, '#c8b090', c => c.rect(30, 270, 100, 62), 4); cel(ctx, c => { c.moveTo(20, 272); c.lineTo(80, 232); c.lineTo(140, 272); c.closePath(); }, '#a8603a', { dx: -4, dy: 4 }); ink(ctx, '#5a3a24', c => c.rect(70, 300, 20, 32), 3); }
    else { ink(ctx, '#f0ece2', c => c.rect(-20, 270, 180, 64), 4); for (let i = 0; i < 6; i++) ink(ctx, '#f8f4ea', c => c.rect(-6 + i * 28, 280, 12, 50), 2.5); } }
  function palatine(ctx, era, haze, t) { hillPaint(ctx, HILL_R, haze);
    if (era === 'ancient') { ink(ctx, '#e4d6bc', c => c.rect(1070, 270, 260, 66), 4); for (let i = 0; i < 6; i++) ink(ctx, '#8a6a4a', c => { const x = 1086 + i * 40; c.moveTo(x, 330); c.lineTo(x, 300); c.arc(x + 12, 300, 12, Math.PI, 0); c.lineTo(x + 24, 330); c.closePath(); }, 2.5); cel(ctx, c => { c.moveTo(1058, 272); c.lineTo(1200, 236); c.lineTo(1342, 272); c.closePath(); }, '#c89a48', { dx: -4, dy: 6 }); }
    else for (let i = 0; i < 5; i++) P.tree(ctx, 1000 + i * 78, 352 + (i % 2) * 6, .3 + (i % 3) * .04, t, { col: '#7f9a46' }); }
  // the arch of Septimius Severus (buried to its knees in the 1300s), the Column of Phocas, the three columns of Castor & Pollux
  function forum(ctx, t, era, o = {}) { const haze = era === 'ancient' ? '#f6e4b4' : era === 'today' ? '#cfe2ee' : '#efdcae';
    P.sky(ctx, era === 'ancient' ? 'gold' : era === 'today' ? 'noon' : (o.sky || 'dawn'), t, { sun: era === 'today' ? null : [980, 250] });
    P.hills(ctx, 430, '#7a8a6a', haze, .65, 1);
    capitoline(ctx, era, haze); palatine(ctx, era, haze, t);
    const gy = 470; if (era === 'medieval') mudGround(ctx, t, gy); else if (era === 'ancient') paving(ctx, gy); else { paving(ctx, gy); ctx.fillStyle = 'rgba(140,150,90,.35)'; ctx.fillRect(-600, gy, 2600, 400); }
    // long dawn shadows, rubble and shrubs (painted density like the reference)
    if (era !== 'ancient') { P.castShadow(ctx, 300, 600, 240, 520, -2.9, .22); P.castShadow(ctx, 640, 522, 30, 360, -2.9, .2); P.castShadow(ctx, 892, 545, 150, 460, -2.9, .2); }
    else { P.castShadow(ctx, 880, 560, 330, 420, -2.9, .18); P.castShadow(ctx, 300, 600, 240, 420, -2.9, .18); }
    for (const [bx, by, br, bc] of [[30, 500, 60, '#8aa04a'], [470, 482, 40, '#93a84e'], [1010, 486, 54, '#86a046'], [1220, 500, 70, '#7f9a46'], [720, 478, 30, '#93a84e']]) P.bush(ctx, bx, by, br, { col: era === 'today' ? mix(bc, '#5a8a3a', .3) : bc });
    if (era === 'medieval') for (const [rx, ry, rr] of [[560, 640, 26], [990, 650, 34], [1150, 700, 22], [420, 700, 30], [700, 712, 18]]) { P.rock(ctx, rx, ry, rr, '#ddd2bc'); }
    // the arch
    const buried = era === 'medieval' ? 1 : 0, ab = 600; P.arch(ctx, 300, ab, 260, 300, { col: era === 'ancient' ? '#efe6d4' : '#d8c8a6' });
    if (buried) { ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.moveTo(100, ab + 10); ctx.quadraticCurveTo(160, ab - 120, 300, ab - 118); ctx.quadraticCurveTo(440, ab - 122, 500, ab + 10); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); hut(ctx, 130, ab - 70, .62); }
    // the Column of Phocas
    if (era === 'medieval') { P.column(ctx, 640, 520, 30, 120, {}); ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.ellipse(640, 522, 60, 14, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else { ink(ctx, '#e0d4bc', c => c.rect(600, 520, 80, 40), 4); P.column(ctx, 640, 522, 30, 210, {}); }
    // Castor & Pollux
    if (era === 'ancient') P.temple(ctx, 880, 560, .62, { n: 5, roof: '#d8b048' });
    else { for (let i = 0; i < 3; i++) P.column(ctx, 840 + i * 52, era === 'medieval' ? 540 : 580, 34, era === 'medieval' ? 150 : 290, { base: era !== 'medieval' }); ink(ctx, '#e0d4bc', c => c.rect(812, (era === 'medieval' ? 540 - 186 : 580 - 326), 160, 30), 4);
      if (era === 'medieval') { ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.ellipse(892, 542, 120, 18, 0, 0, 7); ctx.fill(); ctx.restore(); } }
    if (era === 'medieval' && !o.empty) { cow(ctx, 760, 640, .38, t, { graze: true }); cow(ctx, 1080, 600, .3, t, { flip: true, graze: true, spots: [[-40, -110, 30, 20]] }); goat(ctx, 520, 600, .5, t); goat(ctx, 470, 620, .45, t, { flip: true, col: '#bfae98' }); }
    if (era === 'ancient' && !o.empty) { for (let i = 0; i < 26; i++) { const x = 60 + (i * 97) % 1220, y = 560 + ((i * 37) % 120), c = CROWD[i % 6]; chibi(ctx, x + Math.sin(t * .6 + i) * 8, y, .16 + (y - 560) / 1200, t, Object.assign({ seed: i, walk: i % 3 === 0, dir: i % 2 ? 1 : -1, toga: i % 4 === 0 ? '#fbf8ef' : null }, c)); } }
    if (era === 'today' && !o.empty) { for (let i = 0; i < 22; i++) { const x = 40 + (i * 113) % 1240, y = 570 + ((i * 41) % 110), c = TOUR[i % 6]; chibi(ctx, x, y, .16 + (y - 560) / 1200, t, Object.assign({ seed: i, arms: i % 3 === 0 ? 'hold' : 'down', prop: i % 3 === 0 ? phone : null }, c)); } }
  }

  // dark foliage framing the bottom corners (the reference's foreground depth)
  function framing(ctx, t, side = 0) { ctx.save(); ctx.filter = 'blur(1.5px)'; if (side <= 0) { P.bush(ctx, -30, 740, 150, { col: '#55702e', seed: 1 }); P.bush(ctx, 110, 790, 120, { col: '#4c6628', seed: 4 }); } if (side >= 0) { P.bush(ctx, 1320, 750, 160, { col: '#55702e', seed: 2 }); P.bush(ctx, 1180, 800, 110, { col: '#4c6628', seed: 7 }); } ctx.restore(); }
  // ---------- the user's painted plates (assets/img/plates) ----------
  function plateShot(key, o = {}) { return function plate(ctx, lt, dur, t) { const im = T.IMG[key]; ctx.save(); P.camPush(ctx, lt, dur, o.z0 ?? 1.02, o.z1 ?? 1.08, o.fx ?? 640, o.fy ?? 360, o.pan || 0);
      if (im) { const sc = Math.max(W / im.width, H / im.height) * 1.1; ctx.drawImage(im, 640 - im.width * sc / 2, 360 - im.height * sc / 2, im.width * sc, im.height * sc); }
      ctx.restore();
      // drifting mist low over the ground, and dust motes in the light
      ctx.save(); ctx.filter = 'blur(18px)'; ctx.globalAlpha = o.mist ?? .18; ctx.fillStyle = '#fff4dc'; for (let i = 0; i < 5; i++) { const x = ((i * 330 + t * 14) % 1700) - 200; ctx.beginPath(); ctx.ellipse(x, (o.mistY ?? 560) + (i % 2) * 30, 260, 26, 0, 0, 7); ctx.fill(); } ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 28; i++) { const x = (i * 157 + Math.sin(t * .4 + i) * 30) % W, y = ((i * 97 - t * (8 + i % 5)) % H + H) % H, a = .35 + .35 * Math.sin(t * 1.7 + i); ctx.fillStyle = `rgba(255,236,190,${a})`; ctx.beginPath(); ctx.arc(x, y, 1.6 + (i % 3), 0, 7); ctx.fill(); } ctx.restore();
      if (o.extra) o.extra(ctx, lt, dur, t); }; }
  const pGoats = plateShot('goats', { z0: 1.0, z1: 1.06, pan: 60, mistY: 520 });
  const pColumn = plateShot('column', { z0: 1.0, z1: 1.1, fx: 620, fy: 420, mistY: 600, extra: (ctx, lt, dur, t) => { if (since(t, 'finger') > -.3) P.caption(ctx, '"like a giant\'s finger"', since(t, 'finger') + .3, { size: 26, x: 70, y: 120 }); } });
  const pLaundry = plateShot('laundry', { z0: 1.06, z1: 1.0, fx: 700, fy: 400, mist: .1 });
  const pCart = plateShot('cart', { z0: 1.0, z1: 1.07, fx: 560, fy: 420, pan: -50, mistY: 520 });
  const pWall = plateShot('wall', { z0: 1.06, z1: 1.0, fx: 560, fy: 460, mist: .08, extra: (ctx, lt, dur, t) => { const k = clamp((t - A.building) / .9); if (k > 0 && k < 1) { for (let i = 0; i < 12; i++) { const a = i * .55, r = 30 + k * 150; ctx.fillStyle = `rgba(232,220,196,${.75 * (1 - k)})`; ctx.beginPath(); ctx.arc(860 + Math.cos(a) * r, 690 + Math.sin(a) * r * .45 - k * 30, 16 + (i % 3) * 8, 0, 7); ctx.fill(); } }
    if (since(t, 'thousand') > 0) P.caption(ctx, '1,000+ years old', since(t, 'thousand'), { size: 26, x: 1210, y: 120, align: 'right' }); } });
  const pCow = plateShot('cowClose', { z0: .91, z1: .95, fx: 640, fy: 380, mistY: 600 });
  // ---------- shots ----------
  function s1(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 380); forum(ctx, t, 'medieval'); P.grassFG(ctx, t, -40, 1320, 740, 90, '#55702e'); framing(ctx, t); ctx.restore(); P.shafts(ctx, 1100, -100, .12); P.caption(ctx, 'Rome, the mid-1300s', lt - .6, { size: 28, sub: 'the old Forum' }); }
  function boots(ctx, lt, dur, t) { // you, ankle-deep
    ctx.save(); ctx.filter = 'blur(5px)'; ctx.translate(640, 300); ctx.scale(1.5, 1.5); ctx.translate(-640, -380); forum(ctx, t, 'medieval', { empty: true }); ctx.restore();
    ctx.save(); P.camPush(ctx, lt, dur, 1.04, 1.1, 640, 470);
    mudGround(ctx, t, 560); chibi(ctx, 640, 700, 1.25, t, Object.assign({}, YOU, { eyes: 'half', mouth: 'frown', tilt: .12, brow: 'sad' }));
    ctx.save(); ctx.fillStyle = '#5e4630'; ctx.beginPath(); ctx.ellipse(640, 700, 150, 30, 0, 0, 7); ctx.fill(); for (let i = 0; i < 6; i++) { const a = i * 1.05, k = clamp((lt - .2) / .5), r = 110 + k * 40; ctx.beginPath(); ctx.arc(640 + Math.cos(a) * r, 690 - Math.abs(Math.sin(a)) * 30 * (1 - k), 8 - k * 4, 0, 7); ctx.fill(); } ctx.restore();
    ctx.restore(); }
  function goatsShot(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 420, 60);
    P.sky(ctx, 'dawn', t, { sun: [1100, 200], y1: 460 }); P.hills(ctx, 420, '#7a8a6a', '#efdcae', .6); mudGround(ctx, t, 460);
    for (let i = 0; i < 9; i++) P.weeds(ctx, 120 + i * 130, 640 + (i % 2) * 30, 1.2, t);
    goat(ctx, 380, 640, 1.3, t); goat(ctx, 800, 660, 1.2, t, { flip: true, col: '#bfae98' }); goat(ctx, 1080, 600, .9, t);
    P.grassFG(ctx, t, -40, 1320, 735, 170, '#4f6a2a', { blur: 2 }); ctx.restore(); }
  function finger(ctx, lt, dur, t) { const k = ease.inOut(clamp(lt / dur)); ctx.save(); ctx.translate(0, lerp(-60, 80, k));
    P.sky(ctx, 'dawn', t, { sun: [1000, 300], y1: 560 }); P.hills(ctx, 520, '#7a8a6a', '#efdcae', .6); mudGround(ctx, t, 560);
    P.column(ctx, 640, 600, 96, 420, { broken: false }); ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.ellipse(640, 602, 170, 30, 0, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    goat(ctx, 860, 660, .9, t, { flip: true }); P.grassFG(ctx, t, -40, 1320, 820, 150, '#4f6a2a', { blur: 2 }); ctx.restore();
    if (since(t, 'finger') > -.3) P.caption(ctx, '"like a giant\'s finger"', since(t, 'finger') + .3, { size: 26, x: 70, y: 120 }); }
  function laundryShot(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 560, 400);
    P.sky(ctx, 'dawn', t, { sun: [1150, 220], y1: 520 }); P.hills(ctx, 470, '#7a8a6a', '#efdcae', .6); mudGround(ctx, t, 520);
    P.arch(ctx, 820, 760, 620, 700, { col: '#d8c8a6' }); ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.moveTo(400, 770); ctx.quadraticCurveTo(560, 460, 820, 450); ctx.quadraticCurveTo(1080, 460, 1240, 770); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    hut(ctx, 360, 650, 1.6); laundry(ctx, 520, 360, 1000, 330, t);
    chibi(ctx, 760, 690, .62, t, Object.assign({}, WOMAN, { arms: 'up', eyes: 'happy', mouth: 'smile' }));
    P.grassFG(ctx, t, -40, 1320, 740, 90, '#4f6a2a'); framing(ctx, t, -1); ctx.restore(); P.shafts(ctx, 1200, -100, .1, 3); }
  function cartShot(ctx, lt, dur, t) { const x = lerp(-120, 1500, lt / (dur + 1.5));
    ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.03, 640, 400);
    P.sky(ctx, 'dawn', t, { sun: [900, 220], y1: 500 }); P.hills(ctx, 440, '#7a8a6a', '#efdcae', .6);
    for (let i = 0; i < 4; i++) P.column(ctx, 160 + i * 300, 560, 46, 160 + (i % 2) * 70, { broken: true }); mudGround(ctx, t, 540);
    // the handcart, pushed side-on (he walks the way he faces)
    ctx.save(); ctx.translate(x + 150, 690); for (const wx of [-50, 60]) { ink(ctx, '#8a6a44', c => c.arc(wx, -34, 34, 0, 7), 5); ctx.save(); ctx.translate(wx, -34); ctx.rotate(t * 3); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 4); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.stroke(); } ctx.restore(); }
      ink(ctx, '#a07a4e', c => c.rect(-110, -110, 220, 54), 5); for (let i = 0; i < 6; i++) cel(ctx, c => c.rect(-100 + (i % 3) * 66, -170 - Math.floor(i / 3) * 52 + 0, 60, 54), P.MARBLE, { shade: '#b8a993', dx: 6, dy: 6, lw: 4 }); ink(ctx, null, c => { c.moveTo(-110, -90); c.lineTo(-200, -130); }, 7); ctx.restore();
    chibi(ctx, x, 690, .62, t, Object.assign({}, MAN, { walk: true, dir: 1, arms: 'point' }));
    P.grassFG(ctx, t, -40, 1320, 740, 80, '#4f6a2a'); framing(ctx, t, 1); ctx.restore(); }
  function prying(ctx, lt, dur, t) { const pop = clamp((t - A.building + .1) / .5);
    ctx.save(); P.camPush(ctx, lt, dur, 1.04, 1.0, 640, 380);
    P.sky(ctx, 'dawn', t, { sun: [1100, 120], y1: 300 }); cel(ctx, c => c.rect(260, 40, 900, 640), '#e4d8c0', { shade: '#b8a68a', dx: 0, dy: 0 });
    ctx.save(); ctx.strokeStyle = 'rgba(90,70,50,.5)'; ctx.lineWidth = 3; for (let r = 0; r < 6; r++) for (let c2 = 0; c2 < 5; c2++) ctx.strokeRect(260 + c2 * 180 + (r % 2) * 90, 40 + r * 106, 180, 106); ctx.restore();
    ink(ctx, '#d0c0a0', c => c.rect(560, 180, 360, 90), 4); ctx.save(); ctx.strokeStyle = 'rgba(80,60,40,.6)'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(590 + i * 44, 226, 14, 0, Math.PI * 1.5); ctx.stroke(); } ctx.restore();
    const bx = 720 + pop * 60, by = 420 + pop * pop * 260, br = pop * .5; ctx.save(); ctx.translate(bx + 90, by + 55); ctx.rotate(br); cel(ctx, c => c.rect(-90, -55, 180, 110), P.MARBLE, { shade: '#b8a993', dx: 8, dy: 8 }); ctx.restore();
    if (pop > 0 && pop < 1) for (let i = 0; i < 10; i++) { const a = i * .63, r = pop * 120; ctx.fillStyle = `rgba(220,205,180,${1 - pop})`; ctx.beginPath(); ctx.arc(810 + Math.cos(a) * r, 470 + Math.sin(a) * r * .6, 14 + i % 3 * 6, 0, 7); ctx.fill(); }
    chibi(ctx, 470, 720, .95, t, Object.assign({}, MAN, { arms: 'hold', eyes: pop > 0 ? 'happy' : 'half', mouth: 'grin', prop: (c, hx, hy) => crowbar(c, hx, hy) }));
    ctx.restore(); if (since(t, 'thousand') > 0) P.caption(ctx, '1,000+ years old', since(t, 'thousand'), { size: 26, x: 1220, y: 640, align: 'right' }); }
  function cowClose(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.04, 640, 360);
    P.sky(ctx, 'dawn', t, { sun: [200, 260], y1: 480 }); P.hills(ctx, 470, '#7a8a6a', '#efdcae', .55); mudGround(ctx, t, 480);
    cow(ctx, 900, 860, 1.75, t, { unimpressed: lt > 1.0, look: -1 });
    P.grassFG(ctx, t, -40, 1320, 760, 110, '#4f6a2a'); framing(ctx, t, 1); ctx.restore();
    P.caption(ctx, 'Campo Vaccino', since(t, 'field') + .2, { size: 34, sub: '"the cow field"' }); }
  function holdShot(ctx, lt, dur, t) { const rw = clamp((t - A.rewind) / 1.1);
    ctx.save(); P.camPush(ctx, lt, dur, 1.06, 1.06, 640, 380); forum(ctx, t - rw * rw * 40, 'medieval'); ctx.restore();
    chibi(ctx, 190, 760, .95, t, Object.assign({}, YOU, { eyes: since(t, 'move') > 0 ? 'wide' : 'open', mouth: since(t, 'move') > 0 ? 'o' : 'flat', arms: since(t, 'hold') > 0 && since(t, 'move') < 0 ? 'point' : 'down' }));
    if (rw > 0) { P.grade(ctx, '#8a7a9a', .35 * rw, 'saturation'); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 6; i++) { const y = ((t * 900 + i * 157) % 760) - 20; ctx.fillStyle = `rgba(255,240,210,${.25 * rw})`; ctx.fillRect(0, y, W, 6 + i % 3 * 4); } ctx.restore();
      ctx.save(); ctx.translate(640, 360); ctx.rotate(-rw * 6); ctx.strokeStyle = `rgba(255,236,180,${.6 * rw})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 120 + rw * 300, 0, Math.PI * 1.4); ctx.stroke(); ctx.restore(); } }
  function ancientWide(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.06, 1.0, 640, 380); forum(ctx, t, 'ancient'); ctx.restore(); P.shafts(ctx, 1100, -120, .14);
    if (since(t, 'temples') > 0) for (const [x, y] of [[880, 300], [180, 125], [1180, 225]]) { const k = clamp((since(t, 'temples') - x / 3000) / .7); if (k > 0 && k < 1) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, x, y, 60 * Math.sin(k * Math.PI), 'rgba(255,240,180,.9)'); ctx.restore(); } }
    P.caption(ctx, 'Same place · around AD 100', since(t, 'same') + .2, { size: 28 }); }
  function senators(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.04, 640, 400);
    ctx.save(); ctx.filter = 'blur(3px)'; forum(ctx, t, 'ancient', { empty: true }); ctx.restore();
    for (let i = 0; i < 7; i++) { const c = CROWD[i % 6], x = 120 + i * 175 + Math.sin(t * 1.5 + i) * 10; chibi(ctx, x, 600, .5, t, Object.assign({ seed: i + 20, eyes: i % 3 ? 'side' : 'half', look: i % 2 ? 1 : -1 }, c)); }
    const sx = lerp(1320, -80, clamp(lt / (dur + 1))); chibi(ctx, sx, 690, .72, t, Object.assign({}, SENATOR, { walk: true, dir: -1, eyes: 'half', mouth: 'flat', brow: 'angry' }));
    for (let i = 0; i < 6; i++) { const c = CROWD[(i + 2) % 6], x = 40 + i * 240 + Math.sin(t * 2 + i) * 14; chibi(ctx, x, 800, .62, t, Object.assign({ seed: i + 40, eyes: Math.abs(x - sx) < 160 ? 'wide' : 'half', look: x > sx ? -1 : 1, mouth: Math.abs(x - sx) < 160 ? 'o' : 'flat' }, c)); }
    ctx.restore(); P.caption(ctx, 'senators in white wool', since(t, 'senators') + .3, { size: 24, x: 60, y: 90 }); }
  function underFeet(ctx, lt, dur, t) { const tilt = ease.inOut(clamp(lt / 1.4)); ctx.save(); ctx.translate(0, -tilt * 300);
    P.sky(ctx, 'gold', t, { y1: 420 }); P.hills(ctx, 380, '#7a8a6a', '#f6e4b4', .5); paving(ctx, 420);
    for (let i = 0; i < 7; i++) { const c = CROWD[i % 6]; chibi(ctx, 100 + i * 180, 480, .32, t, Object.assign({ seed: i, walk: true, dir: i % 2 ? 1 : -1 }, c)); }
    const g = ctx.createLinearGradient(0, 480, 0, 1100); g.addColorStop(0, '#8a6a48'); g.addColorStop(1, '#5a4030'); ctx.fillStyle = g; ctx.fillRect(-100, 480, 1500, 700); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-100, 482); ctx.lineTo(1400, 482); ctx.stroke();
    for (let i = 0; i < 30; i++) { ctx.fillStyle = 'rgba(60,40,20,.35)'; ctx.beginPath(); ctx.ellipse((i * 173) % 1300, 520 + (i * 61) % 520, 14, 8, i, 0, 7); ctx.fill(); }
    // the stone channel and lead pipe, with water racing toward the city
    cel(ctx, c => c.rect(-60, 760, 1420, 120), '#b8a888', { shade: '#7a6a50', dx: 0, dy: 10 }); ctx.save(); ctx.beginPath(); ctx.rect(-60, 780, 1420, 80); ctx.clip(); ctx.fillStyle = '#4a8ac0'; ctx.fillRect(-60, 780, 1420, 80); for (let i = 0; i < 26; i++) { const x = ((-t * 260 + i * 70) % 1500 + 1500) % 1500 - 60; ctx.strokeStyle = 'rgba(220,240,255,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 800 + (i % 3) * 20); ctx.lineTo(x + 34, 800 + (i % 3) * 20); ctx.stroke(); } ctx.restore();
    cel(ctx, c => c.rect(-60, 600, 1420, 36), '#8a8a92', { shade: '#5a5a62', light: '#c0c0c8', dx: 0, dy: 8 }); ctx.restore();
    if (since(t, 'mountains') > -.3) { const k = clamp((since(t, 'mountains') + .3) / .5); ctx.save(); ctx.globalAlpha = k; ctx.translate(1010, 120); ink(ctx, '#efe2c4', c => c.rect(-210, -90, 420, 200), 5); ctx.save(); ctx.beginPath(); ctx.rect(-210, -90, 420, 200); ctx.clip(); P.sky(ctx, 'noon', t, { y0: -90, y1: 110, clouds: 0 }); P.hills(ctx, 40, '#6a7a8a', '#cfe2ee', .2, 3); ctx.fillStyle = '#4a8ac0'; ctx.fillRect(-210, 60, 420, 12); ctx.restore(); ink(ctx, null, c => c.rect(-210, -90, 420, 200), 5); ctx.restore(); P.caption(ctx, 'springs dozens of miles away', k, { size: 22, x: 1010, y: 340, align: 'center' }); } }
  function cityView(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.08, 640, 400, 80);
    P.sky(ctx, 'gold', t, { sun: [1050, 230], y1: 420 }); P.hills(ctx, 350, '#7a8a6a', '#f6e4b4', .6, 2);
    // roofs to the horizon (atmospheric: farther = paler)
    for (let row = 0; row < 9; row++) { const y = 360 + row * 44, s = .5 + row * .12, fade = 1 - row / 9; for (let i = 0; i < 22; i++) { const x = (i * 97 + row * 53) % 1500 - 100, w = (40 + (i * 13) % 40) * s, h = (30 + (i * 7) % 50) * s, col = mix(['#d89a6a', '#e8cba0', '#c88a5a', '#e0d0b0'][(i + row) % 4], '#f6e4b4', fade * .6);
      ink(ctx, col, c => c.rect(x, y - h, w, h), 2 + row * .3); ink(ctx, mix('#b8603a', '#f6e4b4', fade * .6), c => { c.moveTo(x - 4, y - h); c.lineTo(x + w / 2, y - h - w * .3); c.lineTo(x + w + 4, y - h); c.closePath(); }, 2 + row * .3); } }
    // the Colosseum and an aqueduct striding in
    ctx.save(); ctx.translate(820, 470); cel(ctx, c => c.ellipse(0, 0, 150, 70, 0, 0, 7), '#e4d4b4', { shade: '#b89a74', dx: 10, dy: 8 }); for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) { const a = Math.PI * (.05 + i / 12 * .9); ink(ctx, '#7a5a40', c => c.rect(Math.cos(a) * -140 - 5, 10 - r * 22 + Math.sin(a) * 30 - 30, 10, 14), 1.5); } ctx.restore();
    for (let i = 0; i < 14; i++) { const x = 1300 - i * 60, y = 330 + i * 6; ink(ctx, '#d8c8a6', c => { c.moveTo(x, y); c.lineTo(x, y - 60); c.lineTo(x - 60, y - 60); c.lineTo(x - 60, y); c.lineTo(x - 46, y); c.arc(x - 30, y - 20, 16, Math.PI, 0); c.lineTo(x - 14, y); c.closePath(); }, 3); }
    P.temple(ctx, 300, 420, .5, { roof: '#d8b048' }); ctx.restore(); P.shafts(ctx, 1150, -120, .14);
    if (since(t, 'million') > -.3) P.caption(ctx, 'maybe a million people', since(t, 'million') + .3, { size: 32 });
    if (since(t, 'europe') > -.2) P.caption(ctx, 'no European city that big again until London, c. 1800', since(t, 'europe') + .2, { size: 22, y: 690 }); }
  function between(ctx, lt, dur, t) { const k = ease.inOut(clamp((lt - .6) / 3.0));
    ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.03, 640, 380); forum(ctx, t, 'ancient'); ctx.restore();
    ctx.save(); ctx.globalAlpha = k; P.camPush(ctx, lt, dur, 1.0, 1.03, 640, 380); forum(ctx, t, 'medieval'); ctx.restore();
    if (since(t, 'cows') > -.4) { const c = clamp((since(t, 'cows') + .4) / .8); cow(ctx, lerp(-260, 220, ease.out(c)), 900, 1.3, t, { flip: true, unimpressed: true }); }
    P.caption(ctx, 'a million people → cows', since(t, 'million2'), { size: 28, x: 1220, y: 90, align: 'right' }); }
  function puzzled(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 400);
    ctx.save(); ctx.filter = 'blur(4px)'; forum(ctx, t, 'medieval', { empty: true }); ctx.restore();
    chibi(ctx, 640, 860, 1.4, t, Object.assign({}, YOU, { arms: 'chin', eyes: since(t, 'why') > 0 ? 'side' : 'half', look: 1, mouth: 'frown', tilt: .1 })); ctx.restore(); }
  function ruinVignette(ctx, lt, dur, t, kind) { ctx.save(); P.camPush(ctx, lt, dur, 1.08, 1.0, 640, 380);
    if (kind === 'babylon') { P.sky(ctx, 'dusk', t, { sun: [900, 380], y1: 480 }); const g = ctx.createLinearGradient(0, 470, 0, 760); g.addColorStop(0, '#d8a868'); g.addColorStop(1, '#a8743e'); ctx.fillStyle = g; ctx.fillRect(-200, 470, 1700, 400);
      for (let i = 0; i < 4; i++) cel(ctx, c => c.rect(420 + i * 30, 470 - (4 - i) * 50, 440 - i * 60, 50), '#c8925a', { shade: '#8a5a34', dx: 10, dy: 0, lw: 4 }); for (let i = 0; i < 6; i++) cel(ctx, c => c.rect(100 + i * 200, 480 - (i % 3) * 30, 60, 60 + (i % 3) * 30), '#b8844e', { shade: '#7a5030', lw: 4 }); }
    else { P.sky(ctx, 'noon', t, { y1: 440 }); ctx.fillStyle = '#3a8ac0'; ctx.fillRect(-200, 400, 1700, 120); for (let i = 0; i < 8; i++) { ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3; ctx.beginPath(); const x = (i * 190 + t * 20) % 1500 - 100; ctx.moveTo(x, 430 + (i % 3) * 25); ctx.lineTo(x + 50, 430 + (i % 3) * 25); ctx.stroke(); }
      const g = ctx.createLinearGradient(0, 510, 0, 760); g.addColorStop(0, '#d8c8a0'); g.addColorStop(1, '#a8946a'); ctx.fillStyle = g; ctx.fillRect(-200, 510, 1700, 400); for (let i = 0; i < 6; i++) P.column(ctx, 300 + i * 130, 620, 40, 80 + (i * 47) % 150, { broken: true, col: '#e0d0b0' }); }
    ctx.restore(); P.caption(ctx, kind === 'babylon' ? 'Babylon' : 'Carthage', lt, { size: 38, sub: 'ended.', subSize: 22 }); }
  function lost(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.02, 1.08, 640, 380); forum(ctx, t, 'medieval', { sky: 'dusk', empty: true, noLaundry: true }); cow(ctx, 900, 640, .42, t, { graze: true }); ctx.restore(); P.grade(ctx, '#5a4a7a', .25);
    const L = [['its empire', 'empire'], ['its emperors', 'emperors'], ['its water', 'water2'], ['almost all its people', 'people']]; for (let i = 0; i < 4; i++) { const k = since(t, L[i][1]) + .1; if (k > 0) P.caption(ctx, 'lost ' + L[i][0], k, { size: 28, x: 70, y: 110 + i * 54, a: i === 3 || since(t, L[i + 1][1]) < 0 ? 1 : .55 }); } }
  function today(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.05, 1.0, 640, 380); forum(ctx, t, 'today'); ctx.restore();
    P.caption(ctx, 'still here', since(t, 'still') + .1, { size: 32 }); if (since(t, 'capital') > 0) P.caption(ctx, 'still a capital · still full of people', since(t, 'capital'), { size: 24, y: 690 }); P.caption(ctx, 'today', since(t, 'today'), { size: 28, x: 1220, y: 90, align: 'right' }); }
  function title(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.08, 1.0, 640, 380); forum(ctx, t, 'medieval', { sky: 'gold', empty: true, noLaundry: true }); ctx.restore(); P.grade(ctx, '#2a1810', .25);
    const k = clamp((lt - .3) / 1.2); ctx.save(); ctx.globalAlpha = k; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 120px "Liberation Serif", serif'; ctx.lineJoin = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(30,15,10,.85)'; ctx.strokeText('ROME', 640, 280); ctx.fillStyle = '#f6e2b0'; ctx.fillText('ROME', 640, 280);
    ctx.font = '700 30px "Liberation Serif", serif'; ctx.lineWidth = 7; ctx.strokeText('the city that should have died at least five times', 640, 370); ctx.fillStyle = '#fbf0d8'; ctx.fillText('the city that should have died at least five times', 640, 370); ctx.restore();
    for (let i = 0; i < 5; i++) { const kk = clamp((since(t, 'five') - i * .18) / .3); if (kk <= 0) continue; ctx.save(); ctx.translate(480 + i * 80, 450); ctx.scale(kk, kk); ink(ctx, '#a8322a', c => c.arc(0, 0, 22, 0, 7), 4); ctx.fillStyle = '#f6e2b0'; ctx.font = '700 22px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(['I', 'II', 'III', 'IV', 'V'][i], 0, 1); ctx.restore(); }
    if (since(t, 'didnt2') > -.1) P.caption(ctx, '…and didn\'t.', since(t, 'didnt2') + .1, { size: 34, x: 640, y: 530, align: 'center', col: '#f6c945' }); }

  // every frame: paper grain + a soft vignette (the reference's painted finish)
  function atmos(ctx, t) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(20px)'; ctx.globalAlpha = .16; ctx.fillStyle = '#fff2d6'; for (let i = 0; i < 5; i++) { const x = ((i * 330 + t * 12) % 1700) - 200; ctx.beginPath(); ctx.ellipse(x, 470 + (i % 2) * 40, 280, 24, 0, 0, 7); ctx.fill(); } ctx.restore();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 22; i++) { const x = (i * 157 + Math.sin(t * .4 + i) * 30) % W, y = ((i * 97 - t * (8 + i % 5)) % H + H) % H; ctx.fillStyle = `rgba(255,236,190,${.3 + .3 * Math.sin(t * 1.7 + i)})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, 7); ctx.fill(); } ctx.restore(); }
  const fin = draw => (ctx, lt, dur, t) => { draw(ctx, lt, dur, t); if (draw.name !== 'plate') { atmos(ctx, t); P.shafts(ctx, 1150, -150, .1, 4); } P.grade(ctx, '#ffb070', .14, 'soft-light'); P.grain(ctx, t, .05); P.vignette(ctx, .32); };
  const cut = [[0, fin(s1), 0], [A.mud - .2, fin(boots), .35], [A.goats - .3, fin(pGoats), .4], [A.over - .2, fin(pColumn), .5], [A.somebody - .2, fin(pLaundry), .5],
    [A.man - .2, fin(pCart), .5], [A.prying - .3, fin(pWall), .4], [A.locals - .2, fin(pCow), .4], [A.hold - .25, fin(holdShot), .5],
    [A.same - .15, fin(ancientWide), .7], [A.senators - .2, fin(senators), .5], [A.under - .1, fin(underFeet), .5], [A.around - .2, fin(cityView), .6],
    [A.so - .2, fin(between), .6], [A.stranger - .4, fin(puzzled), .5], [A.babylon - .15, fin((c, l, d, t) => ruinVignette(c, l, d, t, 'babylon')), .3],
    [A.carthage - .1, fin((c, l, d, t) => ruinVignette(c, l, d, t, 'carthage')), .3], [A.but - .1, fin(lost), .5], [A.still - .3, fin(today), .7], [A.story - .3, fin(title), .8]];
  const shots = P.cutList(cut, A.end);
  const sfx = [
    { t: .2, type: 'wind', gain: .35 }, { t: A.pasture, type: 'clang', gain: .18 }, { t: A.mud, type: 'splash', gain: .3 }, { t: A.goats + .3, type: 'click', gain: .2 },
    { t: A.laundry, type: 'paper', gain: .25 }, { t: A.cart, type: 'creak', gain: .3 }, { t: A.building, type: 'thud', gain: .5 }, { t: A.field, type: 'clang', gain: .15 },
    { t: A.rewind, type: 'whoosh', gain: .6 }, { t: A.same, type: 'swell', gain: .45 }, { t: A.senators, type: 'rattle', gain: .2 }, { t: A.water, type: 'splash', gain: .3 },
    { t: A.million, type: 'swell', gain: .35 }, { t: A.cows, type: 'thud', gain: .3 }, { t: A.babylon, type: 'wind', gain: .3 }, { t: A.carthage, type: 'wind', gain: .3 },
    { t: A.still, type: 'swell', gain: .4 }, { t: A.five, type: 'clang', gain: .25 }, { t: A.didnt2, type: 'thud', gain: .45 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.rewind - .2, mood: 'silence' }, { t: A.same - .1, mood: 'under' }, { t: A.so - .2, mood: 'mystery' }, { t: A.still - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-coldopen.mp3', shots, sfx, moods,
    images: { goats: 'assets/img/plates/goats.jpg', column: 'assets/img/plates/column.jpg', laundry: 'assets/img/plates/laundry.jpg', cart: 'assets/img/plates/cart.jpg', wall: 'assets/img/plates/prying-wall.jpg', cowClose: 'assets/img/plates/cow-closeup.jpg' }, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
