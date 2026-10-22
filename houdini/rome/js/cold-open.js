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
  // the cast, all in the style of the user's clip monk (js/monk.js). The monk is the one main character: "you" in the 1300s and the
  // man hauling the stone are both him.
  const YOU = { kind: 'monk', seed: 3 };
  const WOMAN = { kind: 'woman', robe: '#8fa4b8', scarf: '#efe6d2', hairStyle: 'long', hair: '#4a3020', seed: 5 };
  const MAN = { kind: 'monk', seed: 3 };
  const SENATOR = { kind: 'toga', robe: '#f4efe4', trim: '#7a2a62', hair: '#8a8a84', hairStyle: 'short', seed: 9 };
  const CROWD = [{ kind: 'tunic', robe: '#c87a4a', hair: '#2a1a14', hairStyle: 'curly' }, { kind: 'tunic', robe: '#6a8aa8', hair: '#5a3a24', hairStyle: 'short', beard: true }, { kind: 'stola', robe: '#d8c49a', cloth2: '#b8604a', hair: '#1a1410', hairStyle: 'bun' },
    { kind: 'tunic', robe: '#8aa06a', hair: '#7a5a3a', hairStyle: 'short', beard: true }, { kind: 'stola', robe: '#b86a6a', cloth2: '#efe0c0', hair: '#2a1a14', hairStyle: 'long' }, { kind: 'toga', robe: '#efe8da', hair: '#4a3020', hairStyle: 'curly' }];
  const TOUR = [{ kind: 'tourist', robe: '#3a6ab8', hair: '#d8b878', hairStyle: 'short', cap: '#e84a3a' }, { kind: 'tourist', robe: '#e84a6a', cloth2: '#3a4a6a', hair: '#2a1a14', hairStyle: 'long', fem: true }, { kind: 'tourist', robe: '#f6c945', cloth2: '#5a6a7a', hair: '#5a3a24', hairStyle: 'bun', fem: true },
    { kind: 'tourist', robe: '#3a8a5a', hair: '#1a1410', hairStyle: 'short', pack: '#3a3a40' }, { kind: 'tourist', robe: '#f4efe6', cloth2: '#8a6a4a', hair: '#8a5a34', hairStyle: 'curly', cap: '#2a5a8a' }, { kind: 'tourist', robe: '#7a4a8a', hair: '#3a2a20', hairStyle: 'short', beard: true }];
  const phone = (ctx, x, y) => { ink(ctx, '#2a2a30', c => c.rect(x - 8, y - 30, 16, 26), 3); ctx.fillStyle = '#9ad0f0'; ctx.fillRect(x - 5, y - 27, 10, 18); };
  const crowbar = (ctx, x, y) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(x - 10, y + 10); ctx.lineTo(x + 120, y - 70); ctx.stroke(); ctx.strokeStyle = '#6a6a72'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); };

  // ---------- little scenes of people doing things together ----------
  // two people talking: they face each other, take turns, gesture and nod
  function convo(ctx, x, y, s, t, A, B, seed = 0) { const turn = Math.floor((t + seed) / 1.8) % 2;
    chibi(ctx, x - 52 * s / .5 * .5, y, s, t, Object.assign({ seed: seed + 1, dir: 1, look: 1, talk: turn === 0, arms: turn === 0 ? 'point' : 'down', eyes: turn === 0 ? 'open' : 'happy', tilt: turn === 1 ? Math.sin(t * 4) * .06 : 0 }, A));
    chibi(ctx, x + 52 * s / .5 * .5, y, s, t, Object.assign({ seed: seed + 2, dir: -1, look: -1, talk: turn === 1, arms: turn === 1 ? 'hips' : 'down', eyes: turn === 1 ? 'open' : 'half', tilt: turn === 0 ? Math.sin(t * 4 + 1) * .06 : 0 }, B)); }
  const amphora = (ctx, hx, hy) => { ctx.save(); ctx.translate(hx - 6, hy - 40); ctx.rotate(-.5); cel(ctx, c => { c.moveTo(-14, -40); c.quadraticCurveTo(-30, 0, -10, 40); c.lineTo(10, 40); c.quadraticCurveTo(30, 0, 14, -40); c.closePath(); }, '#c8784a', { shade: '#8a4a2a', dx: 5, dy: 3, lw: 3.5 }); ink(ctx, '#c8784a', c => c.rect(-8, -52, 16, 14), 3); ctx.restore(); };
  const flag = (ctx, hx, hy, t) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 4, hy - 120); ctx.stroke(); const f = Math.sin(t * 6) * 6; ink(ctx, '#e84a3a', c => { c.moveTo(hx + 4, hy - 120); c.quadraticCurveTo(hx + 30, hy - 116 + f, hx + 54, hy - 112); c.lineTo(hx + 50, hy - 88); c.quadraticCurveTo(hx + 28, hy - 92 + f, hx + 4, hy - 94); c.closePath(); }, 3); ctx.restore(); };
  const jug = (ctx, hx, hy) => { cel(ctx, c => { c.ellipse(hx, hy - 30, 18, 24, 0, 0, 7); }, '#b8784a', { shade: '#7a4a2a', dx: 4, dy: 3, lw: 3 }); };
  const stick = (ctx, hx, hy) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - 70, hy + 70); ctx.stroke(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  function stall(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P.contact(ctx, 0, 4, 320, .45);
    for (const d of [-1, 1]) ink(ctx, '#7a5434', c => c.rect(d * 120 - 6, -230, 12, 230), 3.5);
    chibi(ctx, 0, -30, .62, t, Object.assign({ seed: 61, robe: '#c87a4a', hair: '#2a1a14', hairStyle: 'short', beard: true, arms: 'wave', talk: true, eyes: 'happy' }, o.vendor || {}));
    cel(ctx, c => c.rect(-140, -110, 280, 26), '#a8784e', { shade: '#7a5434', dx: 0, dy: 8, lw: 4 }); ink(ctx, '#9a6a44', c => c.rect(-130, -84, 260, 84), 4);
    for (let i = 0; i < 4; i++) { const bx = -100 + i * 66; ink(ctx, '#b8884a', c => c.ellipse(bx, -112, 28, 10, 0, 0, 7), 3); for (let k = 0; k < 5; k++) cel(ctx, c => c.arc(bx - 14 + k * 7, -120 - (k % 2) * 6, 8, 0, 7), ['#e8423a', '#f6a828', '#8ab040', '#c84a8a'][i], { dx: 2, dy: 2, lw: 2 }); }
    for (let i = 0; i < 7; i++) cel(ctx, c => { c.moveTo(-150 + i * 43, -230); c.lineTo(-150 + (i + 1) * 43, -230); c.lineTo(-150 + (i + 1) * 43, -200 + Math.sin(t * 2 + i) * 2); c.quadraticCurveTo(-150 + i * 43 + 21, -190, -150 + i * 43, -200); c.closePath(); }, i % 2 ? '#f4efe2' : '#c8423a', { dx: 0, dy: 4, lw: 3 });
    ctx.restore(); }
  // ---------- the fixed Forum shot ----------
  function mudGround(ctx, t, y) { const g = ctx.createLinearGradient(0, y, 0, 760); g.addColorStop(0, '#9a8a5a'); g.addColorStop(.3, '#86704a'); g.addColorStop(1, '#5a422c'); ctx.fillStyle = g; ctx.fillRect(-600, y, 2600, 900);
    let sd = 5; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    // soil: furrow strokes and clods, denser toward the camera
    ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 180; i++) { const yy = y + Math.pow(r(), .7) * (760 - y), k = (yy - y) / (760 - y), x = -60 + r() * 1400; ctx.strokeStyle = r() < .5 ? 'rgba(60,40,24,.35)' : 'rgba(170,140,100,.3)'; ctx.lineWidth = 1 + k * 2.5; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + 10 + k * 30, yy + (r() - .5) * 3); ctx.stroke(); } ctx.restore();
    P.softPatches(ctx, -100, 1400, y, 760, ['#7f9a4a', '#98a85a', '#6a5a3a', '#a89464', '#5e7a3a'], 26, 7);
    P.track(ctx, [[640, y + 6], [600, y + 80], [520, y + 170], [420, 780]], 10, 90);
    P.grassField(ctx, t, -40, 1320, y + 10, 760, { n: 420, seed: 9 });
    for (let i = 0; i < 7; i++) { const x = (i * 337) % 1300 + 20, yy = y + 70 + (i * 71) % 200, w = 52 + (i % 3) * 30;
      const pg = ctx.createLinearGradient(0, yy - w * .16, 0, yy + w * .16); pg.addColorStop(0, 'rgba(250,236,200,.85)'); pg.addColorStop(1, 'rgba(150,180,200,.75)'); ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(x, yy, w, w * .16, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(60,40,20,.45)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w * .4, yy - 2); ctx.lineTo(x - w * .05, yy - 3); ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const x = r() * 1300, yy = y + 20 + r() * 280; ctx.fillStyle = 'rgba(225,215,190,.9)'; ctx.beginPath(); ctx.ellipse(x, yy, 3 + r() * 4, 2 + r() * 2, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(60,40,24,.5)'; ctx.lineWidth = 1.2; ctx.stroke(); } }
  function paving(ctx, y) { pavingBase(ctx, y); P.softPatches(ctx, -100, 1400, y, 760, ['rgba(150,120,80,.5)', 'rgba(250,240,220,.6)', 'rgba(120,140,80,.35)'], 20, 11); }
  function pavingBase(ctx, y) { const g = ctx.createLinearGradient(0, y, 0, 760); g.addColorStop(0, '#e8dcc4'); g.addColorStop(1, '#c8b28c'); ctx.fillStyle = g; ctx.fillRect(-600, y, 2600, 900);
    let sd = 3; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    // flagstones in one-point perspective: joints converge on a vanishing point at the horizon
    const vx = 640, vy = y - 160, X = (u, yy) => vx + u * (yy - vy) / (760 - vy);  // u = position on the bottom edge
    const rows = []; for (let k = 0; k <= 12; k++) rows.push(y + (760 - y) * Math.pow(k / 12, 1.7));
    for (let k = 0; k < 12; k++) { const y0 = rows[k], y1 = rows[k + 1], cols = 22, off = (k % 2) * .5;
      for (let i = -cols; i <= cols; i++) { const u0 = (i + off) * 120, u1 = (i + 1 + off) * 120; const q = [[X(u0, y0), y0], [X(u1, y0), y0], [X(u1, y1), y1], [X(u0, y1), y1]]; if (q[1][0] < -100 || q[0][0] > 1380) continue;
        const tone = r(); ctx.fillStyle = `rgba(${196 + tone * 44},${180 + tone * 38},${146 + tone * 32},.6)`; ctx.beginPath(); ctx.moveTo(...q[0]); ctx.lineTo(...q[1]); ctx.lineTo(...q[2]); ctx.lineTo(...q[3]); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(110,86,60,.42)'; ctx.lineWidth = .6 + 2 * (y1 - y) / (760 - y); ctx.stroke();
        if (r() < .07) { ctx.beginPath(); ctx.moveTo(lerp(q[0][0], q[1][0], .3), y0); ctx.lineTo(lerp(q[3][0], q[2][0], .5), (y0 + y1) / 2); ctx.lineTo(lerp(q[3][0], q[2][0], .42), y1); ctx.stroke(); } } } }
  function hut(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.sideFace(ctx, -80, -110, 0, 26, '#b89a72');
    cel(ctx, c => c.rect(-80, -110, 160, 110), '#b89a72', { shade: '#7a6040', dx: 10, dy: 0 }); ink(ctx, '#5a3a24', c => c.rect(-22, -70, 44, 70), 4); ink(ctx, '#3a2a1a', c => c.rect(36, -84, 24, 22), 3);
    cel(ctx, c => { c.moveTo(-104, -100); c.lineTo(0, -190); c.lineTo(104, -100); c.closePath(); }, '#c8a660', { shade: '#8a6a34', light: '#e8cc88', dx: -6, dy: 8 }); ctx.save(); ctx.strokeStyle = 'rgba(90,60,30,.6)'; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 22, -104); ctx.lineTo(-40 + i * 10, -170); ctx.stroke(); } ctx.restore(); ctx.restore(); }
  function laundry(ctx, x0, y0, x1, y1, t) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 18, x1, y1); ctx.stroke(); ctx.restore();
    const C = ['#f4efe2', '#c8d8e8', '#e8c8a8', '#f4efe2', '#b8c89a']; for (let i = 0; i < 5; i++) { const u = (i + .7) / 5.6, x = lerp(x0, x1, u), y = lerp(y0, y1, u) + Math.sin(u * Math.PI) * 18, w = 34 + (i % 2) * 10, fl = Math.sin(t * 3 + i) * 6;
      ink(ctx, C[i], c => { c.moveTo(x - w / 2, y); c.lineTo(x + w / 2, y); c.quadraticCurveTo(x + w / 2 + fl, y + 30, x + w / 2 + fl * 1.5, y + 54); c.lineTo(x - w / 2 + fl * 1.5, y + 54); c.quadraticCurveTo(x - w / 2 + fl, y + 30, x - w / 2, y); c.closePath(); }, 3); } }
  function tower(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cel(ctx, c => c.rect(-34, -220, 68, 220), '#b8987a', { shade: '#806048', dx: 10, dy: 0 }); for (let i = 0; i < 4; i++) ink(ctx, '#b8987a', c => c.rect(-34 + i * 19, -236, 12, 16), 3); ink(ctx, '#3a2a1a', c => c.rect(-7, -180, 14, 26), 3); ctx.restore(); }
  // the two hills are drawn solid (ink outline) so everything on them stands on visible ground
  const HILL_L = c => { c.moveTo(-220, 490); c.lineTo(-220, 336); c.quadraticCurveTo(60, 318, 200, 336); c.quadraticCurveTo(320, 360, 440, 490); c.closePath(); };
  const HILL_R = c => { c.moveTo(860, 490); c.quadraticCurveTo(960, 360, 1080, 340); c.quadraticCurveTo(1260, 326, 1500, 336); c.lineTo(1500, 490); c.closePath(); };
  function hillPaint(ctx, fn, haze) { cel(ctx, fn, mix('#8fa45a', haze, .22), { shade: mix('#5e7a3c', haze, .2), light: mix('#b8c878', haze, .2), dx: -10, dy: 12, lw: 4 }); ctx.save(); ctx.beginPath(); fn(ctx); ctx.clip(); P.grassField(ctx, 0, -220, 1500, 320, 500, { n: 200, seed: 21, dark: 'rgba(70,96,44,.45)', light: 'rgba(200,210,130,.45)' }); ctx.restore(); }
  function capitoline(ctx, era, haze) { hillPaint(ctx, HILL_L, haze); P.slopeFlora(ctx, HILL_L, [[140, 372, 'b', .9], [90, 360, 'f'], [-30, 352, 'b', .8], [20, 366, 'f'], [150, 390, 'f']], 0);
    for (const [cx, cy, cs] of [[200, 352, .34], [262, 370, .3], [-60, 338, .36]]) P.cypress(ctx, cx, cy, cs, 0);
    if (era === 'ancient') { P.temple(ctx, 70, 334, .32, { roof: '#d8b048' }); P.footing(ctx, 70, 334, 180, 0, { earth: 'rgba(110,130,70,.6)' }); }
    else if (era === 'medieval') { ink(ctx, '#c8b090', c => c.rect(30, 270, 100, 62), 4); cel(ctx, c => { c.moveTo(20, 272); c.lineTo(80, 232); c.lineTo(140, 272); c.closePath(); }, '#a8603a', { dx: -4, dy: 4 }); ink(ctx, '#5a3a24', c => c.rect(70, 300, 20, 32), 3); }
    else { ink(ctx, '#f0ece2', c => c.rect(-20, 270, 180, 64), 4); for (let i = 0; i < 6; i++) ink(ctx, '#f8f4ea', c => c.rect(-6 + i * 28, 280, 12, 50), 2.5); } }
  function palatine(ctx, era, haze, t) { hillPaint(ctx, HILL_R, haze); P.slopeFlora(ctx, HILL_R, [[920, 460, 'b', 1.0], [1000, 420, 'f'], [1100, 440, 'b', 1.2], [1180, 410, 'f'], [1260, 450, 'b', 1.1], [1060, 470, 'f'], [1330, 420, 'f']], t);
    if (era === 'ancient') { ink(ctx, '#e4d6bc', c => c.rect(1070, 270, 260, 66), 4); for (let i = 0; i < 6; i++) ink(ctx, '#8a6a4a', c => { const x = 1086 + i * 40; c.moveTo(x, 330); c.lineTo(x, 300); c.arc(x + 12, 300, 12, Math.PI, 0); c.lineTo(x + 24, 330); c.closePath(); }, 2.5); cel(ctx, c => { c.moveTo(1058, 272); c.lineTo(1200, 236); c.lineTo(1342, 272); c.closePath(); }, '#c89a48', { dx: -4, dy: 6 }); }
    else { for (let i = 0; i < 4; i++) P.tree(ctx, 1010 + i * 90, 352 + (i % 2) * 6, .3 + (i % 3) * .04, t, { col: '#7f9a46' }); P.pine(ctx, 1380, 342, .42, t); }
    for (const [cx, cy, cs] of [[960, 410, .3], [1000, 372, .32]]) P.cypress(ctx, cx, cy, cs, t); }
  // the arch of Septimius Severus (buried to its knees in the 1300s), the Column of Phocas, the three columns of Castor & Pollux
  function forum(ctx, t, era, o = {}) { const haze = era === 'ancient' ? '#f6e4b4' : era === 'today' ? '#cfe2ee' : '#efdcae';
    P.sky(ctx, era === 'ancient' ? 'gold' : era === 'today' ? 'noon' : (o.sky || 'dawn'), t, { sun: era === 'today' ? null : [980, 250] });
    if (era !== 'today') P.rimClouds(ctx, t, { y: 90, x0: 120 }); P.birds(ctx, t, 5, 150, 200, 26);
    P.hills(ctx, 400, '#6a7a8a', haze, .55, 5); P.hills(ctx, 430, '#7a8a6a', haze, .4, 1); P.treeLine(ctx, 428, haze, .45, 3);
    capitoline(ctx, era, haze); palatine(ctx, era, haze, t);
    const gy = 470; if (era === 'medieval') mudGround(ctx, t, gy); else if (era === 'ancient') paving(ctx, gy); else { paving(ctx, gy); ctx.fillStyle = 'rgba(140,150,90,.35)'; ctx.fillRect(-600, gy, 2600, 400); }
    // long dawn shadows, rubble and shrubs (painted density like the reference)
    if (era !== 'ancient') { P.castShadow(ctx, 300, 600, 240, 520, -2.9, .22); P.castShadow(ctx, 640, 522, 30, 360, -2.9, .2); P.castShadow(ctx, 892, 545, 150, 460, -2.9, .2); }
    else { P.castShadow(ctx, 880, 560, 330, 420, -2.9, .18); P.castShadow(ctx, 300, 600, 240, 420, -2.9, .18); }
    for (const [bx, by, br, bc] of [[30, 500, 60, '#8aa04a'], [470, 482, 40, '#93a84e'], [1010, 486, 54, '#86a046'], [1220, 500, 70, '#7f9a46'], [720, 478, 30, '#93a84e']]) { P.contact(ctx, bx, by + br * .7, br * 2.2, .45); P.bush(ctx, bx, by, br, { col: era === 'today' ? mix(bc, '#5a8a3a', .3) : bc }); }
    if (era === 'medieval') for (const [rx, ry, rr] of [[560, 640, 26], [990, 650, 34], [1150, 700, 22], [420, 700, 30], [700, 712, 18]]) { P.contact(ctx, rx, ry + 2, rr * 2.6, .4); P.rock(ctx, rx, ry, rr, '#ddd2bc'); }
    if (era === 'medieval') for (const [rx, ry, rs] of [[60, 600, .7], [520, 560, .5], [1000, 600, .6], [1240, 640, .8], [760, 700, .5]]) P.reeds(ctx, rx, ry, rs, t, 6);
    // the arch
    const buried = era === 'medieval' ? 1 : 0, ab = 600; P.archW(ctx, 300, ab, 260, 300, { col: era === 'ancient' ? '#efe6d4' : '#d8c8a6' });
    if (buried) { const bank = c => { c.moveTo(60, ab + 16); c.quadraticCurveTo(150, ab - 110, 300, ab - 118); c.quadraticCurveTo(450, ab - 112, 540, ab + 16); c.closePath(); }; P.contact(ctx, 300, ab + 14, 520, .5);
      cel(ctx, bank, '#8a7448', { shade: '#5e4a2c', light: '#a89060', dx: -12, dy: 10, lw: 4 }); ctx.save(); ctx.beginPath(); bank(ctx); ctx.clip(); P.softPatches(ctx, 60, 540, ab - 120, ab + 16, ['#7f9a4a', '#98a85a', '#6a8a3e'], 10, 17); P.grassField(ctx, t, 60, 540, ab - 118, ab + 16, { n: 160, seed: 31 }); ctx.restore(); P.footing(ctx, 300, ab + 12, 480, t, { ao: .3 });
      P.contact(ctx, 130, ab - 68, 150, .5); hut(ctx, 130, ab - 70, .62); P.footing(ctx, 130, ab - 70, 110, t, { ao: .2 }); }
    else P.footing(ctx, 300, ab, 270, t, { earth: era === 'ancient' ? 'rgba(170,150,110,.5)' : 'rgba(120,96,64,.6)' });
    // the Column of Phocas
    if (era === 'medieval') { P.column(ctx, 640, 520, 30, 120, { base: false }); P.footing(ctx, 640, 522, 70, t); }
    else { ink(ctx, '#e0d4bc', c => c.rect(600, 520, 80, 40), 4); P.column(ctx, 640, 522, 30, 210, {}); P.footing(ctx, 640, 560, 90, t, { earth: 'rgba(170,150,110,.5)' }); }
    // Castor & Pollux
    if (era === 'ancient') { P.contact(ctx, 880, 562, 400, .5); P.sideFace(ctx, 880 - 260 * .62, 560 - 60 * .62, 560, 18, '#e0d4bc'); P.temple(ctx, 880, 560, .62, { n: 5, roof: '#d8b048' }); P.footing(ctx, 880, 562, 340, t, { earth: 'rgba(170,150,110,.45)' }); }
    else { for (let i = 0; i < 3; i++) P.column(ctx, 840 + i * 52, era === 'medieval' ? 540 : 580, 34, era === 'medieval' ? 150 : 290, { base: era !== 'medieval' }); ink(ctx, '#e0d4bc', c => c.rect(812, (era === 'medieval' ? 540 - 186 : 580 - 326), 160, 30), 4);
      P.footing(ctx, 892, era === 'medieval' ? 542 : 582, 200, t, era === 'medieval' ? {} : { earth: 'rgba(170,150,110,.45)' }); }
    if (era === 'medieval' && !o.empty) { // a herder minding the cows, a woman fetching water
      chibi(ctx, 905, 662, .26, t, Object.assign({}, MAN, { seed: 71, dir: -1, look: -1, arms: 'up', prop: stick, eyes: 'half' }));
      const wx = ((t * 34) % 1700) - 200; chibi(ctx, wx, 600, .22, t, Object.assign({}, WOMAN, { seed: 72, walk: true, dir: 1, arms: 'up', prop: jug }));
      cow(ctx, 760, 640, .38, t, { graze: true }); cow(ctx, 1080, 600, .3, t, { flip: true, graze: true, spots: [[-40, -110, 30, 20]] }); goat(ctx, 520, 600, .5, t); goat(ctx, 470, 620, .45, t, { flip: true, col: '#bfae98' }); }
    if (era === 'ancient' && !o.empty) { // market life: a fruit stall, people chatting, a porter and passers-by going about their day
      stall(ctx, 500, 650, .4, t);
      convo(ctx, 190, 660, .3, t, CROWD[0], CROWD[1], 0); convo(ctx, 1010, 650, .28, t, CROWD[2], Object.assign({ toga: '#fbf8ef' }, CROWD[5]), 3); convo(ctx, 760, 708, .34, t, CROWD[3], CROWD[4], 5);
      const px = ((t * 40) % 1700) - 200; chibi(ctx, px, 620, .22, t, Object.assign({ seed: 81, walk: true, dir: 1, arms: 'up', prop: amphora }, CROWD[3]));
      const qx = 1450 - ((t * 30) % 1700); chibi(ctx, qx, 672, .25, t, Object.assign({ seed: 82, walk: true, dir: -1, toga: '#fbf8ef' }, CROWD[1])); }
    if (era === 'today' && !o.empty) { // a guided tour following a flag, a selfie by the columns, two friends pointing at the arch
      const gx = 120 + ((t * 26) % 600); chibi(ctx, gx + 120, 650, .25, t, Object.assign({ seed: 91, walk: true, dir: 1, arms: 'up', prop: flag, talk: true }, TOUR[3]));
      for (let i = 0; i < 4; i++) chibi(ctx, gx - i * 46, 650 + (i % 2) * 10, .23, t, Object.assign({ seed: 92 + i, walk: true, dir: 1, arms: i % 2 ? 'hold' : 'down', prop: i % 2 ? phone : null }, TOUR[i]));
      chibi(ctx, 1010, 690, .27, t, Object.assign({ seed: 97, arms: 'up', prop: phone, eyes: 'happy', mouth: 'grin', dir: -1 }, TOUR[4])); chibi(ctx, 1062, 690, .27, t, Object.assign({ seed: 98, arms: 'wave', eyes: 'happy', mouth: 'smile', dir: -1 }, TOUR[1]));
      convo(ctx, 420, 700, .26, t, Object.assign({ arms: 'point' }, TOUR[5]), TOUR[2], 7); }
  }

  // dark foliage framing the bottom corners (the reference's foreground depth)
  function framing(ctx, t, side = 0) { ctx.save(); if (side <= 0) { P.bush(ctx, -30, 740, 150, { col: '#55702e', seed: 1 }); P.bush(ctx, 110, 790, 120, { col: '#4c6628', seed: 4 }); } if (side >= 0) { P.bush(ctx, 1320, 750, 160, { col: '#55702e', seed: 2 }); P.bush(ctx, 1180, 800, 110, { col: '#4c6628', seed: 7 }); } ctx.restore(); }
  // ---------- the user's painted plates (assets/img/plates) ----------
  function plateShot(key, o = {}) { return function plate(ctx, lt, dur, t) { const im = T.IMG[key]; ctx.save(); P.camPush(ctx, lt, dur, o.z0 ?? 1.02, o.z1 ?? 1.08, o.fx ?? 640, o.fy ?? 360, o.pan || 0);
      if (im) { const sc = Math.max(W / im.width, H / im.height) * (o.cover ?? 1.1); ctx.drawImage(im, 640 - im.width * sc / 2, 360 - im.height * sc / 2, im.width * sc, im.height * sc); }
      ctx.restore();
      // drifting mist low over the ground, and dust motes in the light
      ctx.save(); ctx.filter = 'blur(18px)'; ctx.globalAlpha = o.mist ?? .18; ctx.fillStyle = '#fff4dc'; for (let i = 0; i < 5; i++) { const x = ((i * 330 + t * 14) % 1700) - 200; ctx.beginPath(); ctx.ellipse(x, (o.mistY ?? 560) + (i % 2) * 30, 260, 26, 0, 0, 7); ctx.fill(); } ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 28; i++) { const x = (i * 157 + Math.sin(t * .4 + i) * 30) % W, y = ((i * 97 - t * (8 + i % 5)) % H + H) % H, a = .35 + .35 * Math.sin(t * 1.7 + i); ctx.fillStyle = `rgba(255,236,190,${a})`; ctx.beginPath(); ctx.arc(x, y, 1.6 + (i % 3), 0, 7); ctx.fill(); } ctx.restore();
      if (o.extra) o.extra(ctx, lt, dur, t); }; }
  const pCity = plateShot('city', { cover: 1.02, z0: 1.0, z1: 1.04, fx: 640, fy: 360, mist: .1, mistY: 640, extra: (ctx, lt, dur, t) => { if (since(t, 'europe') > -.2) P.caption(ctx, 'no European city that big again until London, c. 1800', since(t, 'europe') + .2, { size: 22, y: 686 }); } });
  // ---------- the user's generated clips (assets/clips/<name>/fNNN.jpg, 24 fps, mark removed) ----------
  // map(lt, t) -> seconds into the clip; neighbouring frames are blended so slowed-down clips stay smooth
  function clipShot(key, map, o = {}) { return function plate(ctx, lt, dur, t) { const sec = Math.max(0, Math.min(9.95, map(lt, t, dur))), f = sec * 24, i0 = Math.min(239, Math.floor(f)), fr = f - i0;
      // camera in clip pixels: zoom z about (cx, cy), clamped so the frame always fills the screen (no black edges) and the baked marks
      // (bottom-right sparkle, bottom-left caption) stay below maxY
      const k = ease.inOut(clamp(lt / dur)), z = lerp(o.z0 ?? 1.2, o.z1 ?? o.z0 ?? 1.2, k), hw = 640 / z, hh = 360 / z;
      const cx = clamp(lerp(o.cx0 ?? 640, o.cx1 ?? o.cx0 ?? 640, k), hw, 1280 - hw), maxY = cx + hw > 1100 ? 600 : (o.maxY ?? 600);
      const cy = clamp(lerp(o.cy0 ?? 300, o.cy1 ?? o.cy0 ?? 300, k), hh, Math.max(hh, maxY - hh));
      ctx.save(); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-cx, -cy);
      const a = T.IMG[key + (i0 + 1)], b = T.IMG[key + Math.min(240, i0 + 2)]; if (a) ctx.drawImage(a, 0, 0, 1280, 720); if (b && fr > .05) { ctx.globalAlpha = fr; ctx.drawImage(b, 0, 0, 1280, 720); ctx.globalAlpha = 1; }
      ctx.restore();
      if (o.dust !== false) { ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let q = 0; q < 20; q++) { const x = (q * 157 + Math.sin(t * .4 + q) * 30) % W, y = ((q * 97 - t * (8 + q % 5)) % H + H) % H; ctx.fillStyle = `rgba(255,236,190,${.25 + .25 * Math.sin(t * 1.7 + q)})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + (q % 3), 0, 7); ctx.fill(); } ctx.restore(); }
      if (o.extra) o.extra(ctx, lt, dur, t); }; }
  // ONE place, ONE man: every medieval shot is the same cow field from clip B (its real-looking cows and goats), and the only person
  // is its hooded monk. His cart segment is played in reverse in the source (he faces left but slides right), so it runs backwards here.
  // seg(key, f0, f1): frames f0 -> f1 (1-based) spread over the shot; f1 < f0 plays backwards
  const seg = (key, f0, f1, o) => clipShot(key, (lt, t, dur) => (f0 - 1 + (f1 - f0) * clamp(lt / dur)) / 24, o);
  const cap = (text, key, o) => (ctx, lt, dur, t) => { if (since(t, key) > -.3) P.caption(ctx, text, since(t, key) + .3, o); };
  // 1. the pasture: wide on the grazing herd, then the camera settles down toward the mud
  const cPasture = seg('cB', 1, 20, { z0: 1.3, z1: 1.6, cx0: 640, cx1: 430, cy0: 330, cy1: 420, extra: (ctx, lt) => P.caption(ctx, 'Rome, the mid-1300s', lt - .6, { size: 28, sub: 'the old Forum' }) });
  // 2. the same goats, picking through the weeds
  const cGoats = seg('cB', 20, 30, { z0: 2.0, z1: 2.15, cx0: 800, cx1: 830, cy0: 460 });
  // 3. the half-buried column, the giant's finger
  const cColumn = seg('cB', 30, 50, { z0: 1.75, z1: 1.95, cx0: 470, cx1: 430, cy0: 340, extra: cap('"like a giant\'s finger"', 'finger', { size: 26, x: 70, y: 110 }) });
  // 4. the little house against the arch, laundry on the line; the monk stands by his door
  const cHouse = seg('cB', 50, 78, { z0: 1.5, z1: 1.62, cx0: 860, cx1: 900, cy0: 360, extra: cap('a house built against an ancient arch', 'arch', { size: 24, x: 70, y: 110 }) });
  // 5. the same monk hauling cut stone (reversed so he walks the way he faces)
  const cCart = seg('cB', 134, 110, { z0: 1.2, z1: 1.26, cx0: 560, cy0: 400, maxY: 720, extra: cap('he didn\'t quarry it', 'didnt', { size: 26, x: 1060, y: 110, align: 'right' }) });
  // 6. ...prying it off a building: push past him to the ruined colonnade the stone came from
  const cPry = seg('cB', 110, 86, { z0: 1.26, z1: 1.6, cx0: 560, cx1: 840, cy0: 400, cy1: 280, maxY: 720, extra: cap('1,000+ years old ↓', 'thousand', { size: 26, x: 1000, y: 120, align: 'center' }) });
  // 7. the whole field, named
  const cField = seg('cB', 1, 78, { z0: 1.2, extra: (ctx, lt, dur, t) => { P.caption(ctx, 'Campo Vaccino', since(t, 'field') + .2, { size: 34, sub: '"the cow field"' }); if (since(t, 'hold') > 0) P.caption(ctx, 'hold this exact spot…', since(t, 'hold'), { size: 26, x: 1210, y: 90, align: 'right' }); } });
  // 8. rewind: clip B's own time-whirl
  const cRewind = seg('cB', 141, 156, { z0: 1.2, dust: false });
  // 9. the same place, AD 100
  const cAD100 = seg('cA', 118, 176, { z0: 1.2, z1: 1.26, cy0: 300, extra: (ctx, lt, dur, t) => { P.caption(ctx, 'Same place · around AD 100', since(t, 'same') + .2, { size: 28 }); if (since(t, 'marble') > 0) P.caption(ctx, 'marble everywhere', since(t, 'marble'), { size: 24, x: 1210, y: 90, align: 'right' }); if (since(t, 'temples') > 0) P.caption(ctx, 'gilded temple roofs', since(t, 'temples'), { size: 24, x: 1210, y: 140, align: 'right' }); } });
  // 10. the crowd
  const cCrowd = seg('cB', 157, 205, { z0: 1.2, z1: 1.25, extra: cap('senators in white wool', 'senators', { size: 24, x: 60, y: 90 }) });
  // 11. back to the cow field: "a million people → cows"
  const cBetween = seg('cB', 40, 78, { z0: 1.25, z1: 1.2, extra: cap('a million people → cows', 'million2', { size: 28, x: 1220, y: 90, align: 'right' }) });
  // 12. the stranger question, over the lone column (framed left of the plate's drawn sheep)
  const pWhy = plateShot('column', { z0: 1.3, z1: 1.38, fx: 640, fy: 300, mistY: 600, extra: cap('why didn\'t it just… end?', 'why', { size: 30 }) });
  // 13. what it lost: the field at dusk
  const cLost = seg('cB', 50, 78, { z0: 1.35, z1: 1.45, cx0: 820, cy0: 330, extra: (ctx, lt, dur, t) => { P.grade(ctx, '#5a4a7a', .25);
    const L = [['its empire', 'empire'], ['its emperors', 'emperors'], ['its water', 'water2'], ['almost all its people', 'people']]; for (let i = 0; i < 4; i++) { const k = since(t, L[i][1]) + .1; if (k > 0) P.caption(ctx, 'lost ' + L[i][0], k, { size: 28, x: 70, y: 110 + i * 54, a: i === 3 || since(t, L[i + 1][1]) < 0 ? 1 : .55 }); } } });
  // 14. today, the real place
  const cToday = seg('cA', 193, 226, { z0: 1.2, z1: 1.26, extra: (ctx, lt, dur, t) => { P.caption(ctx, 'still here', since(t, 'still') + .3, { size: 32 }); if (since(t, 'capital') > 0) P.caption(ctx, 'still a capital · still full of people', since(t, 'capital'), { size: 24, y: 690 }); P.caption(ctx, 'today', since(t, 'today'), { size: 28, x: 1220, y: 90, align: 'right' }); } });
  // 15. title over the same view at sunset
  const cTitle = seg('cA', 226, 240, { z0: 1.26, z1: 1.2, extra: (ctx, lt, dur, t) => { P.grade(ctx, '#2a1810', .35); titleText(ctx, lt, t); } });
  // ---------- shots ----------
  function s1(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 380); forum(ctx, t, 'medieval'); P.grassFG(ctx, t, -40, 1320, 740, 90, '#55702e'); framing(ctx, t); ctx.restore(); P.shafts(ctx, 1100, -100, .12); P.caption(ctx, 'Rome, the mid-1300s', lt - .6, { size: 28, sub: 'the old Forum' }); }
  function boots(ctx, lt, dur, t) { // you, ankle-deep
    ctx.save(); ctx.translate(640, 300); ctx.scale(1.5, 1.5); ctx.translate(-640, -380); forum(ctx, t, 'medieval', { empty: true }); ctx.restore();
    ctx.save(); P.camPush(ctx, lt, dur, 1.04, 1.1, 640, 470);
    mudGround(ctx, t, 560); for (const [rx, rs] of [[260, .9], [380, .7], [960, .8], [1080, 1.0]]) P.reeds(ctx, rx, 640, rs, t, 7); chibi(ctx, 640, 720, 1.25, t, Object.assign({}, YOU, { eyes: 'half', speak: true, tilt: .06, brow: 'sad' }));
    ctx.save(); ink(ctx, '#6e5236', c => c.ellipse(640, 712, 150, 26, 0, 0, 7), 0); ctx.strokeStyle = 'rgba(160,130,90,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(640, 712, 132, 20, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.fillStyle = 'rgba(255,240,210,.25)'; ctx.beginPath(); ctx.ellipse(600, 706, 50, 6, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5e4630'; for (let i = 0; i < 6; i++) { const a = i * 1.05, k = clamp((lt - .2) / .5), r = 110 + k * 40; ctx.beginPath(); ctx.arc(640 + Math.cos(a) * r, 690 - Math.abs(Math.sin(a)) * 30 * (1 - k), 8 - k * 4, 0, 7); ctx.fill(); } ctx.restore();
    ctx.restore(); }
  function goatsShot(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 420, 60);
    P.sky(ctx, 'dawn', t, { sun: [1100, 200], y1: 460 }); P.hills(ctx, 420, '#7a8a6a', '#efdcae', .6); mudGround(ctx, t, 460);
    for (let i = 0; i < 9; i++) P.weeds(ctx, 120 + i * 130, 640 + (i % 2) * 30, 1.2, t);
    goat(ctx, 380, 640, 1.3, t); goat(ctx, 800, 660, 1.2, t, { flip: true, col: '#bfae98' }); goat(ctx, 1080, 600, .9, t);
    P.grassFG(ctx, t, -40, 1320, 735, 170, '#4f6a2a', { blur: 2 }); ctx.restore(); }
  function finger(ctx, lt, dur, t) { const k = ease.inOut(clamp(lt / dur)); ctx.save(); ctx.translate(0, lerp(-60, 80, k));
    P.sky(ctx, 'dawn', t, { sun: [1000, 300], y1: 560 }); P.hills(ctx, 520, '#7a8a6a', '#efdcae', .6); mudGround(ctx, t, 560);
    P.column(ctx, 640, 600, 96, 420, { broken: false }); ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.ellipse(640, 602, 170, 30, 0, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    goat(ctx, 860, 660, .9, t, { flip: true }); P.grassFG(ctx, t, -40, 1320, 820, 150, '#4f6a2a'); ctx.restore();
    if (since(t, 'finger') > -.3) P.caption(ctx, '"like a giant\'s finger"', since(t, 'finger') + .3, { size: 26, x: 70, y: 120 }); }
  function laundryShot(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 560, 400);
    P.sky(ctx, 'dawn', t, { sun: [1150, 220], y1: 520 }); P.hills(ctx, 470, '#7a8a6a', '#efdcae', .6); mudGround(ctx, t, 520);
    P.arch(ctx, 820, 760, 620, 700, { col: '#d8c8a6' }); ctx.save(); ctx.fillStyle = '#7e6644'; ctx.beginPath(); ctx.moveTo(400, 770); ctx.quadraticCurveTo(560, 460, 820, 450); ctx.quadraticCurveTo(1080, 460, 1240, 770); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    hut(ctx, 360, 650, 1.6); laundry(ctx, 520, 360, 1000, 330, t);
    chibi(ctx, 760, 690, .62, t, Object.assign({}, WOMAN, { arms: 'up', eyes: 'happy', mouth: 'smile' }));
    P.grassFG(ctx, t, -40, 1320, 740, 90, '#4f6a2a'); framing(ctx, t, -1); ctx.restore(); P.shafts(ctx, 1200, -100, .1, 3); }
  // the stone cart from the user's clip: plank sides, cut blocks, one big spoked wheel, long poles to the man pulling it
  function handcart(ctx, x, y, t, roll) { ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = 'rgba(40,24,14,.28)'; ctx.beginPath(); ctx.ellipse(10, 0, 190, 16, 0, 0, 7); ctx.fill();
    for (let i = 0; i < 5; i++) { const bx = -110 + (i % 3) * 78 + (i > 2 ? 38 : 0), by = -190 - (i > 2 ? 60 : 0); cel(ctx, c => c.rect(bx, by, 74, 60), '#e6dcc8', { shade: '#b8a88e', light: '#f6f0e4', dx: 8, dy: 6, lw: 4 }); ctx.strokeStyle = 'rgba(120,100,80,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx + 12, by + 18); ctx.lineTo(bx + 30, by + 26); ctx.stroke(); }
    cel(ctx, c => { c.moveTo(-140, -150); c.lineTo(160, -150); c.lineTo(150, -70); c.lineTo(-130, -70); c.closePath(); }, '#8a5e38', { shade: '#5e3e24', light: '#a8784a', dx: 0, dy: 10, lw: 5 });
    ctx.strokeStyle = 'rgba(50,30,16,.7)'; ctx.lineWidth = 3; for (const yy of [-124, -98]) { ctx.beginPath(); ctx.moveTo(-136, yy); ctx.lineTo(154, yy); ctx.stroke(); } for (const xx of [-90, 10, 110]) ink(ctx, '#6e4a2c', c => c.rect(xx, -156, 14, 92), 3);
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(-130, -96); ctx.lineTo(-330, -112); ctx.stroke(); ctx.strokeStyle = '#7a5232'; ctx.lineWidth = 9; ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(30, -66); ink(ctx, '#7a5232', c => { c.arc(0, 0, 66, 0, 7); c.moveTo(52, 0); c.arc(0, 0, 52, 0, 7, true); }, 4); ctx.rotate(roll);
    for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(54, 0); ctx.stroke(); ctx.strokeStyle = '#8a5e38'; ctx.lineWidth = 5; ctx.stroke(); }
    ink(ctx, '#5e3e24', c => c.arc(0, 0, 13, 0, 7), 3.5); ctx.restore(); ctx.restore(); }
  function cartShot(ctx, lt, dur, t) { const x = lerp(1180, 260, lt / dur);
    ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.03, 640, 400);
    P.sky(ctx, 'dawn', t, { sun: [900, 220], y1: 500 }); P.hills(ctx, 440, '#7a8a6a', '#efdcae', .6);
    for (let i = 0; i < 4; i++) P.column(ctx, 160 + i * 300, 560, 46, 160 + (i % 2) * 70, { broken: true }); mudGround(ctx, t, 540);
    // he walks left, the way he faces, pulling the cart by its poles; the wheel turns with the distance travelled
    handcart(ctx, x + 340, 690, t, -(x / 66));
    P.monk(ctx, x, 690, .6, t, { pose: 'haul', look: 'effort', speed: .8 });
    P.grassFG(ctx, t, -40, 1320, 740, 80, '#4f6a2a'); framing(ctx, t, 1); ctx.restore(); }
  function prying(ctx, lt, dur, t) { const pop = clamp((t - A.building + .1) / .5);
    ctx.save(); P.camPush(ctx, lt, dur, 1.04, 1.0, 640, 380);
    P.sky(ctx, 'dawn', t, { sun: [1100, 120], y1: 300 }); cel(ctx, c => c.rect(260, 40, 900, 640), '#e4d8c0', { shade: '#b8a68a', dx: 0, dy: 0 });
    ctx.save(); ctx.strokeStyle = 'rgba(90,70,50,.5)'; ctx.lineWidth = 3; for (let r = 0; r < 6; r++) for (let c2 = 0; c2 < 5; c2++) ctx.strokeRect(260 + c2 * 180 + (r % 2) * 90, 40 + r * 106, 180, 106); ctx.restore();
    P.weather(ctx, 260, 40, 900, 640, 11); P.weather(ctx, 260, 360, 900, 320, 23);
    ink(ctx, '#d0c0a0', c => c.rect(560, 180, 360, 90), 4); ctx.save(); ctx.strokeStyle = 'rgba(80,60,40,.6)'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(590 + i * 44, 226, 14, 0, Math.PI * 1.5); ctx.stroke(); } ctx.restore();
    const bx = 720 + pop * 60, by = 420 + pop * pop * 260, br = pop * .5; ctx.save(); ctx.translate(bx + 90, by + 55); ctx.rotate(br); cel(ctx, c => c.rect(-90, -55, 180, 110), P.MARBLE, { shade: '#b8a993', dx: 8, dy: 8 }); ctx.restore();
    if (pop > 0 && pop < 1) for (let i = 0; i < 10; i++) { const a = i * .63, r = pop * 120; ctx.fillStyle = `rgba(220,205,180,${1 - pop})`; ctx.beginPath(); ctx.arc(810 + Math.cos(a) * r, 470 + Math.sin(a) * r * .6, 14 + i % 3 * 6, 0, 7); ctx.fill(); }
    // ground at the wall's foot, then the monk levering the block out with the bar wedged under it
    cel(ctx, c => c.rect(-100, 680, 1500, 200), '#8a7a52', { shade: '#6a5a3a', dx: 0, dy: 0 }); for (let i = 0; i < 14; i++) P.weeds(ctx, 280 + i * 64, 684, .7, t);
    const lift = pop > 0 ? 0 : Math.sin(t * 6) * 4; P.monk(ctx, 560, 720, .85, t, { pose: 'pry', dir: 1, look: pop > 0 ? 'calm' : 'effort', mouth: pop > 0 ? 'smile' : 'flat' });
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(652, 560); ctx.lineTo(742, 470 + lift); ctx.stroke(); ctx.strokeStyle = '#6a6a72'; ctx.lineWidth = 7; ctx.stroke(); ctx.restore();
    ctx.restore(); if (since(t, 'thousand') > 0) P.caption(ctx, '1,000+ years old', since(t, 'thousand'), { size: 26, x: 1220, y: 640, align: 'right' }); }
  function cowClose(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.04, 640, 360);
    P.sky(ctx, 'dawn', t, { sun: [200, 260], y1: 480 }); P.hills(ctx, 470, '#7a8a6a', '#efdcae', .55); mudGround(ctx, t, 480);
    cow(ctx, 900, 860, 1.75, t, { unimpressed: lt > 1.0, look: -1 });
    P.grassFG(ctx, t, -40, 1320, 760, 110, '#4f6a2a'); framing(ctx, t, 1); ctx.restore();
    P.caption(ctx, 'Campo Vaccino', since(t, 'field') + .2, { size: 34, sub: '"the cow field"' }); }
  function holdShot(ctx, lt, dur, t) { const rw = clamp((t - A.rewind) / 1.1);
    ctx.save(); P.camPush(ctx, lt, dur, 1.06, 1.06, 640, 380); forum(ctx, t - rw * rw * 40, 'medieval'); ctx.restore();
    chibi(ctx, 190, 760, .95, t, Object.assign({}, YOU, { eyes: since(t, 'move') > 0 ? 'wide' : 'open', speak: true, arms: since(t, 'hold') > 0 && since(t, 'move') < 0 ? 'point' : 'down' }));
    if (rw > 0) { P.grade(ctx, '#8a7a9a', .35 * rw, 'saturation'); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 6; i++) { const y = ((t * 900 + i * 157) % 760) - 20; ctx.fillStyle = `rgba(255,240,210,${.25 * rw})`; ctx.fillRect(0, y, W, 6 + i % 3 * 4); } ctx.restore();
      ctx.save(); ctx.translate(640, 360); ctx.rotate(-rw * 6); ctx.strokeStyle = `rgba(255,236,180,${.6 * rw})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 120 + rw * 300, 0, Math.PI * 1.4); ctx.stroke(); ctx.restore(); } }
  function ancientWide(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.06, 1.0, 640, 380); forum(ctx, t, 'ancient'); ctx.restore(); P.shafts(ctx, 1100, -120, .14);
    if (since(t, 'temples') > 0) for (const [x, y] of [[880, 300], [180, 125], [1180, 225]]) { const k = clamp((since(t, 'temples') - x / 3000) / .7); if (k > 0 && k < 1) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, x, y, 60 * Math.sin(k * Math.PI), 'rgba(255,240,180,.9)'); ctx.restore(); } }
    P.caption(ctx, 'Same place · around AD 100', since(t, 'same') + .2, { size: 28 }); }
  function senators(ctx, lt, dur, t) { const sx = lerp(1380, -120, clamp(lt / (dur + .6)));
    ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.04, 640, 420);
    ctx.save(); forum(ctx, t, 'ancient', { empty: true }); ctx.restore();
    // middle distance: the stall crier, a quarrel, a porter
    stall(ctx, 190, 640, .55, t, { vendor: { eyes: sx < 420 ? 'wide' : 'happy' } });
    convo(ctx, 840, 640, .42, t, Object.assign({ arms: 'hips' }, CROWD[2]), Object.assign({ brow: 'angry' }, CROWD[3]), 2);
    chibi(ctx, 560 + Math.sin(t) * 6, 650, .42, t, Object.assign({ seed: 33, arms: 'up', prop: amphora, eyes: Math.abs(sx - 560) < 200 ? 'wide' : 'half', look: sx < 560 ? -1 : 1 }, CROWD[1]));
    // the senator, pushing through
    chibi(ctx, sx, 712, .72, t, Object.assign({}, SENATOR, { walk: true, dir: -1, eyes: 'half', mouth: 'flat', brow: 'angry', arms: 'point' }));
    // the front row: everyone in his path jumps aside, stares, and one basket of fruit goes flying
    const FR = [[110, 0, 800], [350, 1, 840], [650, 2, 790], [930, 3, 850], [1180, 4, 805]];
    for (const [x, k, fy] of FR) { const d = sx - x, near = Math.abs(d) < 170, past = d < -40; const lean = near ? (d > 0 ? -.18 : .18) : 0;
      chibi(ctx, x + (near ? (d > 0 ? -30 : 30) : 0), fy, .58 + (fy - 790) / 400, t, Object.assign({ seed: 40 + k, eyes: near ? 'wide' : past ? 'side' : 'half', look: d > 0 ? 1 : -1, mouth: near ? 'o' : past ? 'frown' : 'flat', arms: near ? 'up' : 'down', tilt: lean, brow: past ? 'angry' : undefined }, CROWD[k % 6])); }
    const drop = clamp((640 - sx) / 260); if (drop > 0) for (let i = 0; i < 6; i++) { const fx = 640 + (i - 2.5) * 30 + drop * (i - 2.5) * 90, fy = 700 + Math.min(1, drop * 2) * 70 - Math.sin(Math.min(1, drop * 2) * Math.PI) * 60; cel(ctx, c => c.arc(fx, fy, 11, 0, 7), ['#e8423a', '#f6a828', '#8ab040'][i % 3], { dx: 3, dy: 3, lw: 2.5 }); }
    ctx.restore(); P.caption(ctx, 'senators in white wool', since(t, 'senators') + .3, { size: 24, x: 60, y: 90 }); }
  function underFeet(ctx, lt, dur, t) { const tilt = ease.inOut(clamp(lt / 1.4)); ctx.save(); ctx.translate(0, -tilt * 300);
    P.sky(ctx, 'gold', t, { y1: 420 }); P.hills(ctx, 380, '#7a8a6a', '#f6e4b4', .5); paving(ctx, 420);
    for (let i = 0; i < 7; i++) { const c = CROWD[i % 6]; chibi(ctx, 100 + i * 180, 480, .32, t, Object.assign({ seed: i, walk: true, dir: i % 2 ? 1 : -1 }, c)); }
    const g = ctx.createLinearGradient(0, 480, 0, 1100); g.addColorStop(0, '#8a6a48'); g.addColorStop(1, '#5a4030'); ctx.fillStyle = g; ctx.fillRect(-100, 480, 1500, 700); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-100, 482); ctx.lineTo(1400, 482); ctx.stroke();
    for (let i = 0; i < 30; i++) { ctx.fillStyle = 'rgba(60,40,20,.35)'; ctx.beginPath(); ctx.ellipse((i * 173) % 1300, 520 + (i * 61) % 520, 14, 8, i, 0, 7); ctx.fill(); }
    // soil strata, buried stones and roots
    for (let k = 0; k < 5; k++) { const y = 540 + k * 70; ctx.fillStyle = `rgba(${k % 2 ? '70,48,28' : '150,110,70'},.22)`; ctx.beginPath(); ctx.moveTo(-100, y); for (let x = -100; x <= 1400; x += 100) ctx.quadraticCurveTo(x + 50, y + 12 * Math.sin(x * .02 + k), x + 100, y + 4 * Math.cos(x * .03 + k)); ctx.lineTo(1400, y + 30); ctx.lineTo(-100, y + 30); ctx.closePath(); ctx.fill(); }
    for (const [rx, ry, rr] of [[120, 690, 26], [420, 560, 18], [760, 700, 30], [1040, 560, 22], [1230, 690, 20], [300, 920, 30], [880, 940, 24]]) P.rock(ctx, rx, ry, rr, '#a8987a');
    ctx.save(); ctx.strokeStyle = 'rgba(90,60,36,.8)'; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const x = 140 + i * 210; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 486); ctx.quadraticCurveTo(x + 20, 520, x - 10 + (i % 2) * 30, 570); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 6, 520); ctx.quadraticCurveTo(x + 30, 540, x + 40, 560); ctx.stroke(); } ctx.restore();
    // the stone channel and lead pipe, with water racing toward the city
    cel(ctx, c => c.rect(-60, 760, 1420, 120), '#b8a888', { shade: '#7a6a50', dx: 0, dy: 10 }); ctx.save(); ctx.beginPath(); ctx.rect(-60, 780, 1420, 80); ctx.clip(); ctx.fillStyle = '#4a8ac0'; ctx.fillRect(-60, 780, 1420, 80); for (let i = 0; i < 26; i++) { const x = ((-t * 260 + i * 70) % 1500 + 1500) % 1500 - 60; ctx.strokeStyle = 'rgba(220,240,255,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 800 + (i % 3) * 20); ctx.lineTo(x + 34, 800 + (i % 3) * 20); ctx.stroke(); } ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(80,64,44,.6)'; ctx.lineWidth = 2.5; for (let x = -60; x < 1360; x += 110) { ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x, 780); ctx.moveTo(x + 55, 860); ctx.lineTo(x + 55, 880); ctx.stroke(); } ctx.restore(); P.weather(ctx, -60, 860, 1420, 20, 4);
    cel(ctx, c => c.rect(-60, 600, 1420, 36), '#8a8a92', { shade: '#5a5a62', light: '#c0c0c8', dx: 0, dy: 8 }); for (let x = 0; x < 1360; x += 160) { ink(ctx, '#7a7a84', c => c.rect(x - 8, 596, 16, 44), 3); }
    ctx.restore();
    if (since(t, 'mountains') > -.3) { const k = clamp((since(t, 'mountains') + .3) / .5); ctx.save(); ctx.globalAlpha = k; ctx.translate(1010, 120); ink(ctx, '#efe2c4', c => c.rect(-210, -90, 420, 200), 5); ctx.save(); ctx.beginPath(); ctx.rect(-210, -90, 420, 200); ctx.clip(); P.sky(ctx, 'noon', t, { y0: -90, y1: 110, clouds: 0 }); P.hills(ctx, 40, '#6a7a8a', '#cfe2ee', .2, 3); ctx.fillStyle = '#4a8ac0'; ctx.fillRect(-210, 60, 420, 12); ctx.restore(); ink(ctx, null, c => c.rect(-210, -90, 420, 200), 5); ctx.restore(); P.caption(ctx, 'springs dozens of miles away', k, { size: 22, x: 1010, y: 340, align: 'center' }); } }
  // the million-person city, drawn in the series style after the user's city image: temple on its cliff with cypresses and
  // umbrella pines, an aqueduct striding across, the Colosseum, and tiled roofs to the horizon
  function house(ctx, x, y, s, seed) { const r = (k => () => (k = (k * 16807) % 2147483647) / 2147483647)(seed * 977 + 13);
    const w = (70 + r() * 50) * s, h = (56 + r() * 60) * s, wall = ['#ead6b6', '#e4c8a0', '#efdcc0', '#dcc09a'][seed % 4], roof = ['#c8643a', '#b8582e', '#d4703f'][seed % 3];
    cel(ctx, c => c.rect(x - w / 2, y - h, w, h), wall, { shade: mix(wall, '#7a5a3a', .3), dx: w * .18, dy: 0, lw: 2.5 + s * 1.5 });
    ink(ctx, roof, c => { c.moveTo(x - w / 2 - 6 * s, y - h); c.lineTo(x - w * .3, y - h - 26 * s); c.lineTo(x + w * .3, y - h - 26 * s); c.lineTo(x + w / 2 + 6 * s, y - h); c.closePath(); }, 2.5 + s * 1.5);
    ctx.strokeStyle = 'rgba(90,30,10,.35)'; ctx.lineWidth = 1.2 * s; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + k * w / 4 - 4 * s, y - h); ctx.lineTo(x - w * .3 + k * w * .15, y - h - 24 * s); ctx.stroke(); }
    ctx.fillStyle = '#6a4630'; const rows = Math.max(1, Math.floor(h / (26 * s))); for (let rr = 0; rr < rows; rr++) for (let k = 0; k < 3; k++) if (r() > .2) ctx.fillRect(x - w / 2 + (12 + k * (w / s - 24) / 2.4) * s, y - h + (12 + rr * 26) * s, 9 * s, 12 * s);
    if (r() > .88) { ctx.fillStyle = 'rgba(240,235,225,.3)'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + w * .2 + k * 4 * s, y - h - 30 * s - k * 12 * s, (5 + k * 2) * s, 0, 7); ctx.fill(); } } }
  function colosseum(ctx, x, y, rx, ry, H) {
    ink(ctx, '#cdb48a', c => c.ellipse(x, y, rx, ry, 0, 0, 7), 4); // the bowl: tiers of seating ringing the arena
    for (let k = 1; k <= 5; k++) { ctx.strokeStyle = k % 2 ? 'rgba(120,90,60,.55)' : 'rgba(250,236,210,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y + k * 4, rx * (1 - k * .1), ry * (1 - k * .1), 0, Math.PI, 0); ctx.stroke(); }
    ink(ctx, '#e2cfa8', c => c.ellipse(x, y + 22, rx * .42, ry * .36, 0, 0, 7), 3);
    // the outer wall's front half, three storeys of arches following the curve
    const wall = c => { c.ellipse(x, y, rx, ry, 0, 0, Math.PI); c.lineTo(x - rx, y + H); c.ellipse(x, y + H, rx, ry, 0, Math.PI, 0, true); c.closePath(); };
    cel(ctx, wall, '#e6d2ac', { shade: '#b8996e', light: '#f4e6c8', dx: 22, dy: 0, lw: 4.5 });
    for (let tier = 0; tier < 3; tier++) { const ty = y + 18 + tier * H / 3.2, th = H / 3.2 * .62;
      ctx.strokeStyle = 'rgba(110,80,50,.6)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, ty - 10, rx, ry, 0, .05, Math.PI - .05); ctx.stroke();
      for (let i = 1; i < 22; i++) { const a = Math.PI * i / 22, ax = x + Math.cos(a) * rx, ay = ty + Math.sin(a) * ry, sw = 13 * Math.sin(a) + 3; ink(ctx, '#7a5636', c => { c.moveTo(ax - sw / 2, ay + th); c.lineTo(ax - sw / 2, ay + th * .4); c.arc(ax, ay + th * .4, sw / 2, Math.PI, 0); c.lineTo(ax + sw / 2, ay + th); c.closePath(); }, 1.5); } } }
  function aqueduct(ctx, x0, x1, y, h) { const bay = 62;
    cel(ctx, c => c.rect(x0, y - 16, x1 - x0, 16), '#dcc49c', { shade: '#b09468', dx: 0, dy: 5, lw: 3.5 });
    for (let x = x0; x < x1; x += bay) { cel(ctx, c => { c.moveTo(x, y); c.lineTo(x + bay, y); c.lineTo(x + bay, y + h); c.lineTo(x + bay - 12, y + h); c.lineTo(x + bay - 12, y + 40); c.arc(x + bay / 2 + 0, y + 40, bay / 2 - 12, 0, Math.PI, true); c.lineTo(x + 12, y + h); c.lineTo(x, y + h); c.closePath(); }, '#e2cba2', { shade: '#b8996e', dx: 6, dy: 0, lw: 3 }); } }
  function cityView(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.05, 640, 420, 60);
    P.sky(ctx, 'gold', t, { sun: [930, 330], y1: 430 }); P.rimClouds(ctx, t, { y: 120, col: '#f0d0b0', shade: '#c8988a' });
    P.hills(ctx, 410, '#8a9a6a', '#f6d8a8', .55, 2); P.treeLine(ctx, 412, '#f6d8a8', .45, 3, 560, 1400);
    aqueduct(ctx, 560, 1400, 330, 170);
    const g = ctx.createLinearGradient(0, 420, 0, 760); g.addColorStop(0, '#c8a070'); g.addColorStop(1, '#8a6040'); ctx.fillStyle = g; ctx.fillRect(-200, 430, 1700, 400);
    // rows of houses, far (small, hazy) to near; the Colosseum sits among them
    const rowsY = [452, 480, 512, 548, 590, 636, 690, 750], rowS = [.32, .38, .45, .53, .62, .72, .84, .98];
    for (let rI = 0; rI < rowsY.length; rI++) { if (rI === 3) colosseum(ctx, 890, 470, 215, 58, 140);
      for (let i = 0; i < 26; i++) { const x = 520 + i * 74 * rowS[rI] + ((rI * 37 + i * 13) % 30) - (rI > 3 ? 600 : 0); if ((rI < 3 && x > 680 && x < 1130) || (rI >= 3 && rI <= 5 && x > 640 && x < 1140)) continue; if (x < -80 || x > 1360) continue; if (rI < 3 && x < 600) continue; house(ctx, x, rowsY[rI], rowS[rI], rI * 31 + i); }
      if (rI === 2) { // the Capitoline cliff with its temple, cypresses and umbrella pines
        cel(ctx, c => { c.moveTo(-100, 640); c.lineTo(-100, 330); c.lineTo(470, 330); c.quadraticCurveTo(520, 360, 530, 420); c.quadraticCurveTo(560, 520, 640, 600); c.closePath(); }, '#c89a64', { shade: '#9a7048', light: '#e0b47a', dx: 18, dy: 0, lw: 5 });
        ctx.strokeStyle = 'rgba(110,70,40,.45)'; ctx.lineWidth = 3; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(380 + k * 20, 350 + k * 40); ctx.quadraticCurveTo(450 + k * 18, 380 + k * 40, 520 + k * 12, 400 + k * 44); ctx.stroke(); }
        cel(ctx, c => { c.moveTo(-100, 336); c.quadraticCurveTo(200, 316, 474, 332); c.lineTo(470, 352); c.quadraticCurveTo(200, 340, -100, 360); c.closePath(); }, '#7a9a4a', { shade: '#5a7a34', dx: 0, dy: 6, lw: 4 });
        P.temple(ctx, 240, 336, .44, { roof: '#c8a050' });
        ink(ctx, '#e4d2b0', c => { c.moveTo(380, 340); c.lineTo(420, 340); c.lineTo(600, 600); c.lineTo(540, 600); c.closePath(); }, 3.5); ctx.strokeStyle = 'rgba(120,90,60,.5)'; ctx.lineWidth = 2; for (let k = 1; k < 16; k++) { const f = k / 16; ctx.beginPath(); ctx.moveTo(380 + f * 160, 340 + f * 260); ctx.lineTo(420 + f * 180, 340 + f * 260); ctx.stroke(); }
        for (const [cx, cy, cs] of [[30, 360, .9], [480, 370, .8], [530, 470, .7], [80, 360, .75]]) P.cypress(ctx, cx, cy, cs, t); for (const [px, py, ps] of [[-20, 350, .8], [500, 400, .7]]) P.pine(ctx, px, py, ps, t);
        for (let k = 0; k < 5; k++) P.person(ctx, 412 + k * 30, 380 + k * 44, .07, t, { kind: k % 2 ? 'toga' : 'tunic', pose: 'walk', seed: k, face: 1 }); }
    }
    for (const [cx, cy, cs] of [[30, 760, 1.1], [1250, 740, .9]]) P.cypress(ctx, cx, cy, cs, t);
    ctx.restore();
    if (since(t, 'million') > -.3) P.caption(ctx, 'maybe a million people', since(t, 'million') + .3, { size: 32 });
    if (since(t, 'europe') > -.2) P.caption(ctx, 'no European city that big again until London, c. 1800', since(t, 'europe') + .2, { size: 22, y: 686 }); }
  function between(ctx, lt, dur, t) { const k = ease.inOut(clamp((lt - .6) / 3.0));
    ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.03, 640, 380); forum(ctx, t, 'ancient'); ctx.restore();
    ctx.save(); ctx.globalAlpha = k; P.camPush(ctx, lt, dur, 1.0, 1.03, 640, 380); forum(ctx, t, 'medieval'); ctx.restore();
    if (since(t, 'cows') > -.4) { const c = clamp((since(t, 'cows') + .4) / .8); cow(ctx, lerp(-260, 220, ease.out(c)), 900, 1.3, t, { flip: true, unimpressed: true }); }
    P.caption(ctx, 'a million people → cows', since(t, 'million2'), { size: 28, x: 1220, y: 90, align: 'right' }); }
  function puzzled(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.0, 1.06, 640, 400);
    ctx.save(); forum(ctx, t, 'medieval', { empty: true }); ctx.restore();
    chibi(ctx, 640, 860, 1.4, t, Object.assign({}, YOU, { arms: since(t, 'why') > 0 ? 'down' : 'chin', eyes: since(t, 'why') > 0 ? 'wide' : 'half', look: 1, speak: true, brow: since(t, 'why') > 0 ? '' : 'sad', tilt: .04 })); ctx.restore(); }
  function palm(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sw = Math.sin(t * .9 + x) * 4;
    cel(ctx, c => { c.moveTo(-10, 0); c.quadraticCurveTo(10, -120, sw + 20, -250); c.lineTo(sw + 34, -248); c.quadraticCurveTo(26, -120, 12, 0); c.closePath(); }, '#9a7048', { shade: '#6a4a2c', dx: 5, dy: 0, lw: 4 }); ctx.save(); ctx.strokeStyle = 'rgba(70,40,20,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(-6 + i * 2, -20 - i * 23); ctx.lineTo(12 + i * 2, -26 - i * 23); ctx.stroke(); } ctx.restore();
    for (let i = 0; i < 7; i++) { const a = -Math.PI + i * Math.PI / 6 + Math.sin(t + i) * .05; ctx.save(); ctx.translate(sw + 27, -250); ctx.rotate(a); cel(ctx, c => { c.moveTo(0, 0); c.quadraticCurveTo(60, -30, 120, 20); c.quadraticCurveTo(60, -6, 0, 10); c.closePath(); }, '#6f8a3a', { shade: '#4a6428', light: '#9ab45a', dx: 4, dy: 6, lw: 3 }); ctx.restore(); } ctx.restore(); }
  function sandTex(ctx, t, y0, y1, seed) { let sd = seed; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647; ctx.save(); ctx.lineCap = 'round';
    for (let i = 0; i < 140; i++) { const y = y0 + Math.pow(r(), .8) * (y1 - y0), k = (y - y0) / (y1 - y0), x = -40 + r() * 1360; ctx.strokeStyle = r() < .5 ? 'rgba(120,80,40,.3)' : 'rgba(255,236,190,.35)'; ctx.lineWidth = 1 + k * 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 20 + k * 30, y - 4, x + 40 + k * 60, y); ctx.stroke(); } ctx.restore(); }
  function ruinVignette(ctx, lt, dur, t, kind) { ctx.save(); P.camPush(ctx, lt, dur, 1.08, 1.0, 640, 380);
    if (kind === 'babylon') { P.sky(ctx, 'dusk', t, { sun: [900, 380], y1: 480 }); P.rimClouds(ctx, t, { y: 120, col: '#f0c8a8', shade: '#c08a7a' });
      P.hills(ctx, 470, '#b88a58', '#f0b878', .45, 2);
      const g = ctx.createLinearGradient(0, 470, 0, 760); g.addColorStop(0, '#dcae6c'); g.addColorStop(1, '#9a6a38'); ctx.fillStyle = g; ctx.fillRect(-200, 470, 1700, 400);
      for (let d = 0; d < 3; d++) { ctx.fillStyle = ['rgba(232,190,120,.7)', 'rgba(200,150,90,.6)', 'rgba(180,130,80,.55)'][d]; ctx.beginPath(); ctx.moveTo(-200, 760); for (let x = -200; x <= 1500; x += 120) ctx.quadraticCurveTo(x + 60, 520 + d * 60 - 30 * Math.sin(x * .01 + d), x + 120, 540 + d * 60); ctx.lineTo(1500, 760); ctx.closePath(); ctx.fill(); }
      // the ziggurat's eroded stump: stepped mud brick with courses, stains and slumped corners
      for (let i = 0; i < 4; i++) { const x0 = 420 + i * 34, w = 440 - i * 68, y0 = 470 - (i + 1) * 52; cel(ctx, c => { c.moveTo(x0, y0 + 52); c.lineTo(x0 + 8, y0 + 4); c.lineTo(x0 + w * .3, y0); c.lineTo(x0 + w * .34, y0 + 8); c.lineTo(x0 + w - 6, y0 + 2); c.lineTo(x0 + w, y0 + 52); c.closePath(); }, '#c8925a', { shade: '#8a5a34', light: '#e8b878', dx: 10, dy: 0, lw: 4 });
        ctx.save(); ctx.strokeStyle = 'rgba(100,60,30,.4)'; ctx.lineWidth = 1.5; for (let r2 = 1; r2 < 5; r2++) { ctx.beginPath(); ctx.moveTo(x0 + 6, y0 + r2 * 10); ctx.lineTo(x0 + w - 6, y0 + r2 * 10); ctx.stroke(); } ctx.restore(); P.weather(ctx, x0, y0, w, 52, 7 + i); }
      ink(ctx, "#3a2414", c => c.rect(618, 384, 40, 34), 3);
      for (let i = 0; i < 7; i++) { const x = 60 + i * 190, h = 50 + (i * 37) % 70; cel(ctx, c => { c.moveTo(x, 520); c.lineTo(x + 4, 520 - h); c.lineTo(x + 20, 520 - h - 8); c.lineTo(x + 34, 520 - h + 6); c.lineTo(x + 58, 520 - h); c.lineTo(x + 62, 520); c.closePath(); }, '#b8844e', { shade: '#7a5030', dx: 8, dy: 0, lw: 3.5 }); }
      palm(ctx, 140, 620, .9, t); palm(ctx, 1150, 600, .75, t); palm(ctx, 1240, 640, .6, t);
      sandTex(ctx, t, 520, 760, 13); }
    else { P.sky(ctx, 'noon', t, { y1: 440 }); P.rimClouds(ctx, t, { y: 110, col: '#fbf6ee', shade: '#d8dce8' });
      ctx.fillStyle = mix('#7a9a8a', '#cfe2ee', .45); ctx.beginPath(); ctx.moveTo(-200, 410); for (let x = -200; x <= 1500; x += 200) ctx.quadraticCurveTo(x + 100, 370, x + 200, 410); ctx.lineTo(1500, 420); ctx.lineTo(-200, 420); ctx.closePath(); ctx.fill();
      const sea = ctx.createLinearGradient(0, 410, 0, 530); sea.addColorStop(0, '#5aa8d0'); sea.addColorStop(1, '#2a78a8'); ctx.fillStyle = sea; ctx.fillRect(-200, 410, 1700, 130);
      for (let i = 0; i < 26; i++) { const x = (i * 97 + t * 20) % 1500 - 100, y = 425 + (i % 6) * 18; ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2 + (i % 6) * .4; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 15, y - 4, x + 30 + (i % 6) * 5, y); ctx.stroke(); }
      for (let i = 0; i < 8; i++) { const x = (i * 180 + 40), y = 528 + Math.sin(t * 1.4 + i) * 3; ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.ellipse(x, y, 70, 5, 0, 0, 7); ctx.fill(); }
      const g = ctx.createLinearGradient(0, 520, 0, 760); g.addColorStop(0, '#e6d6ac'); g.addColorStop(1, '#b49a6a'); ctx.fillStyle = g; ctx.fillRect(-200, 528, 1700, 400); sandTex(ctx, t, 540, 760, 29);
      for (const [rx, ry, rr] of [[80, 600, 46], [1180, 640, 60], [980, 700, 30], [300, 710, 26]]) P.rock(ctx, rx, ry, rr, '#c8b8a0');
      ink(ctx, '#d8c8a8', c => c.rect(250, 600, 760, 26), 4); P.weather(ctx, 250, 600, 760, 26, 5);
      for (let i = 0; i < 6; i++) P.column(ctx, 300 + i * 130, 604, 40, 80 + (i * 47) % 150, { broken: true, col: '#e6d6b6' });
      for (const [bx, by] of [[150, 650], [1080, 620], [700, 690]]) P.weeds(ctx, bx, by, 1.1, t); }
    ctx.restore(); P.caption(ctx, kind === 'babylon' ? 'Babylon' : 'Carthage', lt, { size: 38, sub: 'ended.', subSize: 22 }); }
  function lost(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.02, 1.08, 640, 380); forum(ctx, t, 'medieval', { sky: 'dusk', empty: true, noLaundry: true }); cow(ctx, 900, 640, .42, t, { graze: true }); ctx.restore(); P.grade(ctx, '#5a4a7a', .25);
    const L = [['its empire', 'empire'], ['its emperors', 'emperors'], ['its water', 'water2'], ['almost all its people', 'people']]; for (let i = 0; i < 4; i++) { const k = since(t, L[i][1]) + .1; if (k > 0) P.caption(ctx, 'lost ' + L[i][0], k, { size: 28, x: 70, y: 110 + i * 54, a: i === 3 || since(t, L[i + 1][1]) < 0 ? 1 : .55 }); } }
  function today(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.05, 1.0, 640, 380); forum(ctx, t, 'today'); ctx.restore();
    P.caption(ctx, 'still here', since(t, 'still') + .1, { size: 32 }); if (since(t, 'capital') > 0) P.caption(ctx, 'still a capital · still full of people', since(t, 'capital'), { size: 24, y: 690 }); P.caption(ctx, 'today', since(t, 'today'), { size: 28, x: 1220, y: 90, align: 'right' }); }
  function title(ctx, lt, dur, t) { ctx.save(); P.camPush(ctx, lt, dur, 1.08, 1.0, 640, 380); forum(ctx, t, 'medieval', { sky: 'gold', empty: true, noLaundry: true }); ctx.restore(); P.grade(ctx, '#2a1810', .25); titleText(ctx, lt, t); }
  function titleText(ctx, lt, t) { const k = clamp((lt - .3) / 1.2); ctx.save(); ctx.globalAlpha = k; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 120px "Liberation Serif", serif'; ctx.lineJoin = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(30,15,10,.85)'; ctx.strokeText('ROME', 640, 280); ctx.fillStyle = '#f6e2b0'; ctx.fillText('ROME', 640, 280);
    ctx.font = '700 30px "Liberation Serif", serif'; ctx.lineWidth = 7; ctx.strokeText('the city that should have died at least five times', 640, 370); ctx.fillStyle = '#fbf0d8'; ctx.fillText('the city that should have died at least five times', 640, 370); ctx.restore();
    for (let i = 0; i < 5; i++) { const kk = clamp((since(t, 'five') - i * .18) / .3); if (kk <= 0) continue; ctx.save(); ctx.translate(480 + i * 80, 450); ctx.scale(kk, kk); ink(ctx, '#a8322a', c => c.arc(0, 0, 22, 0, 7), 4); ctx.fillStyle = '#f6e2b0'; ctx.font = '700 22px "Liberation Serif", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(['I', 'II', 'III', 'IV', 'V'][i], 0, 1); ctx.restore(); }
    if (since(t, 'didnt2') > -.1) P.caption(ctx, '…and didn\'t.', since(t, 'didnt2') + .1, { size: 34, x: 640, y: 530, align: 'center', col: '#f6c945' }); }

  // every frame: paper grain + a soft vignette (the reference's painted finish)
  const SUN = { s1: [1000, 250], boots: [1060, 180], holdShot: [1000, 250], ancientWide: [1000, 240], senators: [1050, 200], between: [1000, 250], puzzled: [1040, 200], babylonShot: [900, 380], lost: [980, 300], title: [1000, 260] };
  const NOSUN = ['today', 'carthageShot', 'underFeet'], MISTY = { underFeet: 420, babylonShot: 470, carthageShot: 500, title: 470 };
  function atmos(ctx, t) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(20px)'; ctx.globalAlpha = .16; ctx.fillStyle = '#fff2d6'; for (let i = 0; i < 5; i++) { const x = ((i * 330 + t * 12) % 1700) - 200; ctx.beginPath(); ctx.ellipse(x, 470 + (i % 2) * 40, 280, 24, 0, 0, 7); ctx.fill(); } ctx.restore();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 22; i++) { const x = (i * 157 + Math.sin(t * .4 + i) * 30) % W, y = ((i * 97 - t * (8 + i % 5)) % H + H) % H; ctx.fillStyle = `rgba(255,236,190,${.3 + .3 * Math.sin(t * 1.7 + i)})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, 7); ctx.fill(); } ctx.restore(); }
  const fin = draw => (ctx, lt, dur, t) => { draw(ctx, lt, dur, t); if (draw.name !== 'plate') { const nm = draw.name || 'x'; P.enhance(ctx, t, { sun: NOSUN.includes(nm) ? null : (SUN[nm] || [1000, 250]), mistY: MISTY[nm] ?? 480, mist: .04, bloom: .07, tex: .06, rays: .05 }); P.grade(ctx, '#c86a30', .1, 'overlay'); } P.grade(ctx, '#ffb070', .1, 'soft-light'); P.grain(ctx, t, .03); P.vignette(ctx, .35); };
  const cut = [[0, fin(s1), 0], [A.mud - .2, fin(boots), .35], [A.goats - .3, fin(goatsShot), .4], [A.over - .2, fin(finger), .5], [A.somebody - .2, fin(laundryShot), .5],
    [A.man - .2, fin(cartShot), .5], [A.prying - .3, fin(prying), .4], [A.locals - .2, fin(cowClose), .4], [A.hold - .25, fin(holdShot), .5],
    [A.same - .15, fin(ancientWide), .7], [A.senators - .2, fin(senators), .5], [A.under - .1, fin(underFeet), .5], [A.around - .2, fin(cityView), .6],
    [A.so - .2, fin(between), .6], [A.stranger - .4, fin(puzzled), .5], [A.babylon - .15, fin(function babylonShot(c, l, d, t) { ruinVignette(c, l, d, t, 'babylon'); }), .3],
    [A.carthage - .1, fin(function carthageShot(c, l, d, t) { ruinVignette(c, l, d, t, 'carthage'); }), .3], [A.but - .1, fin(lost), .5], [A.still - .3, fin(today), .7], [A.story - .3, fin(title), .8]];
  const shots = P.cutList(cut, A.end);
  const sfx = [
    { t: .2, type: 'wind', gain: .35 }, { t: A.pasture, type: 'clang', gain: .18 }, { t: A.mud, type: 'splash', gain: .3 }, { t: A.goats + .3, type: 'click', gain: .2 },
    { t: A.laundry, type: 'paper', gain: .25 }, { t: A.cart, type: 'creak', gain: .3 }, { t: A.building, type: 'thud', gain: .5 }, { t: A.field, type: 'clang', gain: .15 },
    { t: A.rewind, type: 'whoosh', gain: .6 }, { t: A.rewind + .25, type: 'boom', gain: .3 }, { t: A.same, type: 'swell', gain: .45 }, { t: A.senators, type: 'rattle', gain: .2 }, { t: A.water, type: 'splash', gain: .3 },
    { t: A.million, type: 'swell', gain: .35 }, { t: A.cows, type: 'thud', gain: .3 }, { t: A.babylon, type: 'wind', gain: .3 }, { t: A.carthage, type: 'wind', gain: .3 },
    { t: A.still, type: 'swell', gain: .4 }, { t: A.five, type: 'clang', gain: .25 }, { t: A.didnt2, type: 'thud', gain: .45 },
  ];
  const moods = [{ t: 0, mood: 'still' }, { t: A.rewind - .2, mood: 'silence' }, { t: A.same - .1, mood: 'under' }, { t: A.so - .2, mood: 'mystery' }, { t: A.still - .3, mood: 'still' }];
  G.Show = { duration: A.end, narration: 'rome/assets/audio/narration-coldopen.mp3', shots, sfx, moods,
    images: { city: 'assets/img/plates/city.jpg' }, fonts: ['700 20px Nunito', '700 30px "Liberation Serif"'] };
})(window);
