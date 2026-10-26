/* "It's About Salt" — painted sets, part 2 (G.TS). Every set has a ground plane; things stand on it with contact shadows.
 *   mine        Bronze Age gallery inside the Salzberg: rock strata with salt veins, timber props, the wooden staircase, torches
 *   larder      farmhouse kitchen in November: table with pork + a heap of salt, barrel, hanging hams, snowy window, hearth
 *   hanCourt    Han throne hall: red pillars, the throne dais, a cloud screen, lanterns, guards
 *   hanEstate   a salt-and-iron merchant's yard: brine pans steaming, storehouses, carts of sacks, a forge chimney, workers
 *   debate      81 BC: a long low table in a hall, two sides, a scoreboard hanging overhead
 *   via         the Via Salaria: paved road through the Italian hills, milestone, a cart of salt, Rome on its hills far off
 *   grenier     a royal salt store (grenier à sel): stone hall, weighing scale, sacks, a queue door + a separate noble door
 *   border      night border crossing: moonlit fields, a ford, a border stone, hedges and trees
 *   canal       the Erie Canal + Syracuse salt works: towpath, canal boat, boiling blocks steaming, salt sheds
 *   carthage    the ruined city on its coast (o.v 'ruin' | 'colony')
 *   camp        a Roman camp: tents, a paymaster's table with coins + wax-tablet pay records
 *   saltville   SW Virginia valley: salt furnaces with chimneys, kettle sheds, hills, railroad (o.v 'day' | 'dusk' | 'wrecked')
 *   marchRoad   a dusty Gujarat road with banyan trees and a village; dandi = the beach at Dandi, salt crust on the mud
 *   saltworks   19th-century English salt works: brick chimneys, open pans, heaps of white salt, carts
 *   grocery     a 1924 Michigan grocery: shelves, counter, the new iodized-salt boxes */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, TS = G.TS, FA = G.Fauna, PR = G.Props, EF = G.EF, ES = G.ES, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k), { bricks, slab, stoneCourses } = TS;
  const shadow = (g, x, y, rx, a = .3, ry = rx * .2) => { g.save(); g.fillStyle = `rgba(20,15,10,${a})`; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, TAU); g.fill(); g.restore(); };
  const tree = (g, x, y, s, seed, t = 0) => { shadow(g, x + 10, y + 2, 130 * s, .25); P.tree(g, x + PAD, y, t, seed, s); };
  const fig = (ctx, who, x, y, s, t, o = {}) => G.VK.fig(ctx, x, y, s, G.EP.cast(who, Object.assign({ t }, o)));
  const smoke = (ctx, t, x, y, a = .35) => G.VK.smoke(ctx, t, x, y, a);
  const steam = (ctx, t, x, y, w, a = .5) => { for (let i = 0; i < 8; i++) { const k = (t * .25 + i / 8) % 1; ctx.save(); ctx.globalAlpha = a * (1 - k) * Math.sin(k * PI); ctx.fillStyle = '#f4f4f0'; ctx.beginPath(); ctx.ellipse(x + (i / 8 - .5) * w + Math.sin(t + i) * 10, y - k * 120, 18 + k * 40, 12 + k * 20, 0, 0, TAU); ctx.fill(); ctx.restore(); } };
  const meadowGround = (g, y0, col = '#8ab25e', seed = 3) => { sh(g, col, 3, c => { c.moveTo(-PAD, y0); c.quadraticCurveTo(640, y0 - 8, W + PAD, y0); c.lineTo(W + PAD, H); c.lineTo(-PAD, H); c.closePath(); }); P2.meadow(g, y0 + 2, H, { seed }); };
  const roof = (g, x, y, w, h, col, tiles = true) => { sh(g, col, 3.5, c => { c.moveTo(x - 16, y); c.lineTo(x + w / 2, y - h); c.lineTo(x + w + 16, y); c.closePath(); }); if (tiles) { g.strokeStyle = 'rgba(0,0,0,.2)'; g.lineWidth = 2; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(x - 16 + i * (w + 32) / 6, y); g.lineTo(x + w / 2, y - h); g.stroke(); } } };
  const sack = (g, x, y, s = 1, col = '#e2d2a8', label) => { g.save(); g.translate(x, y); g.scale(s, s); shadow(g, 4, 2, 40, .25); sh(g, col, 3.5, c => { c.moveTo(-34, 0); c.quadraticCurveTo(-46, -50, -26, -76); c.lineTo(26, -76); c.quadraticCurveTo(46, -50, 34, 0); c.closePath(); }); ln(g, [[-22, -72], [22, -72]], 4, '#8a6a3a');
    if (label) { g.font = '700 18px Fredoka'; g.fillStyle = '#5a4a3a'; g.textAlign = 'center'; g.fillText(label, 0, -30); } g.restore(); };
  const saltHeap = (g, x, y, w, h) => { shadow(g, x, y + 2, w * .55, .2); sh(g, '#fbfbf8', 3, c => { c.moveTo(x - w / 2, y); c.quadraticCurveTo(x - w * .2, y - h * 1.1, x, y - h); c.quadraticCurveTo(x + w * .2, y - h * 1.1, x + w / 2, y); c.closePath(); }); g.fillStyle = 'rgba(160,180,200,.35)'; for (let i = 0; i < 30; i++) g.fillRect(x - w * .4 + (i * 37) % (w * .8), y - (i * 13) % (h * .8) - 4, 3, 3); };
  TS.sack = sack; TS.saltHeap = saltHeap; TS.steam = steam;

  // =================== the Bronze Age mine ===================
  const mineL = () => layer('s-mine', g => { g.fillStyle = '#2a2018'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    const r = rng(4); for (let y = 0; y < 560; y += 26) { g.fillStyle = mul(y % 52 ? '#5a4632' : '#6a5440', .8 + r() * .3); g.beginPath(); g.moveTo(-PAD, y); for (let x = -PAD; x <= W + PAD; x += 80) g.lineTo(x, y + Math.sin(x * .01 + y) * 8); g.lineTo(W + PAD, y + 30); g.lineTo(-PAD, y + 30); g.fill(); }
    for (let i = 0; i < 9; i++) { const y = 60 + i * 56 + r() * 20; g.strokeStyle = `rgba(240,225,215,${.4 + r() * .3})`; g.lineWidth = 6 + r() * 8; g.beginPath(); g.moveTo(-PAD, y); for (let x = -PAD; x <= W + PAD; x += 60) g.lineTo(x, y + Math.sin(x * .02 + i) * 14); g.stroke(); }   // salt veins
    g.fillStyle = grad(g, 0, 540, 0, H, [[0, '#6a5642'], [1, '#3e3226']]); g.fillRect(-PAD, 540, W + PAD * 2, H - 540);   // the gallery floor
    for (let i = 0; i < 40; i++) { g.fillStyle = 'rgba(255,250,240,.5)'; g.beginPath(); g.ellipse(-PAD + r() * (W + PAD * 2), 556 + r() * 150, 6 + r() * 14, 2 + r() * 3, 0, 0, TAU); g.fill(); }   // salt chips on the floor
    for (const x of [-60, 300, 980, 1330]) { ln(g, [[x, 560], [x, 40]], 26, '#2a1a0e'); ln(g, [[x, 560], [x, 40]], 18, '#8a6238'); } ln(g, [[-PAD, 50], [W + PAD, 50]], 30, '#2a1a0e'); ln(g, [[-PAD, 50], [W + PAD, 50]], 22, '#7a5430');   // timber props + cap
    // the wooden staircase (dated c. 1344 BC): two stringers with steps, going down to the right
    const sx0 = 520, sy0 = 300, sx1 = 900, sy1 = 600; shadow(g, 720, 604, 220, .35);
    sh(g, '#5a4632', 3.5, c => { c.moveTo(-PAD, 300); c.lineTo(540, 300); c.lineTo(560, 340); c.lineTo(-PAD, 340); c.closePath(); }); g.fillStyle = 'rgba(255,250,240,.35)'; g.fillRect(-PAD, 300, 760, 5);   // the upper level the stair comes down from
    for (const dy of [0, 30]) { ln(g, [[sx0, sy0 + dy], [sx1, sy1 + dy]], 22, '#2a1a0e'); ln(g, [[sx0, sy0 + dy], [sx1, sy1 + dy]], 14, '#a8783e'); }
    for (let i = 0; i < 9; i++) { const u = (i + .5) / 9, x = lerp(sx0, sx1, u), y = lerp(sy0, sy1, u); sh(g, '#b8884a', 3, c => c.rect(x - 22, y - 10, 44, 16)); }
    for (let i = 0; i < 3; i++) { sh(g, '#7a5a3a', 3, c => c.ellipse(140 + i * 30, 620 - i * 6, 26, 10, 0, 0, TAU)); }   // a coil of thick rope
    ln(g, [[150, 50], [170, 400]], 10, '#3a2a1a'); ln(g, [[150, 50], [170, 400]], 6, '#a88a5a');
  });
  function mine(ctx, t, o = {}) { put(ctx, mineL(), o.pan || 0, .25);
    for (const [x, y] of [[300, 220], [980, 220]]) { ln(ctx, [[x - 30, y + 20], [x + 10, y - 30]], 8, '#3a2a1a'); const f = Math.sin(t * 13 + x) * 3; sh(ctx, '#ffb43a', 0, c => { c.moveTo(x, y - 20); c.quadraticCurveTo(x - 14 + f, y - 50, x + 10, y - 80); c.quadraticCurveTo(x + 26 - f, y - 46, x + 18, y - 20); c.closePath(); });
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, x + 8, y - 40, 300, 'rgba(255,150,60,.28)'); ctx.restore(); }
    if (o.stair) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 710, 450, 260, `rgba(255,220,140,${.25 * o.stair})`); ctx.restore(); }
    P.motes(ctx, t, 22, 7); }

  // =================== the larder (salting pork for winter) ===================
  const larderL = () => layer('s-larder', g => { g.fillStyle = '#5a4030'; g.fillRect(-PAD, 0, W + PAD * 2, H); P2.planks && P2.planks(g, -PAD, 0, W + PAD * 2, 470, { c: '#6a4a32' });
    for (let x = -PAD; x < W + PAD; x += 120) ln(g, [[x, 0], [x, 470]], 6, 'rgba(30,20,10,.5)'); ln(g, [[-PAD, 60], [W + PAD, 60]], 26, '#3a2618');
    sh(g, '#3a2a1e', 4, c => c.rect(900, 140, 240, 200)); g.fillStyle = grad(g, 0, 150, 0, 330, [[0, '#9aaac0'], [1, '#e8eef4']]); g.fillRect(912, 152, 216, 176); ln(g, [[1020, 152], [1020, 328]], 6, '#3a2a1e');   // window with snow light
    sh(g, '#e8eef4', 0, c => c.rect(912, 296, 216, 32)); for (const x of [940, 1080]) TS.conifer(g, x, 300, .3, '#2e4a3a', 1);
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#7a6048'], [1, '#4a3828']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470); for (let y = 490; y < H; y += 34) ln(g, [[-PAD, y], [W + PAD, y]], 2, 'rgba(30,20,10,.35)');
    for (const [x, len] of [[160, 120], [260, 150], [360, 110]]) { ln(g, [[x, 60], [x, 80]], 3, '#2a1a10'); sh(g, '#b8644a', 3.5, c => { c.moveTo(x, 80); c.quadraticCurveTo(x - 46, 80 + len * .5, x - 10, 80 + len); c.quadraticCurveTo(x + 40, 80 + len * .7, x + 20, 90); c.closePath(); }); sh(g, '#f2e2d0', 2.5, c => c.ellipse(x - 4, 80 + len - 12, 12, 8, 0, 0, TAU)); }   // hams hanging from the beam
    // the work table (stands on the floor) and a barrel
    shadow(g, 640, 640, 360, .35); sh(g, '#8a6038', 4, c => c.rect(300, 470, 680, 34)); for (const x of [330, 930]) sh(g, '#6a4a2a', 3.5, c => c.rect(x, 504, 24, 140));
    PR.barrel(g, 1120, 640, 1.4);
  });
  function larder(ctx, t, o = {}) { put(ctx, larderL(), o.pan || 0, .25);
    saltHeap(ctx, 470, 472, 150, 54);
    const k = o.rub ?? (t * .5 % 1); for (let i = 0; i < 3; i++) { const x = 600 + i * 110; sh(ctx, '#e8a090', 3.5, c => c.roundRect(x, 444, 90, 26, 10)); ctx.fillStyle = '#fbf6ee'; ctx.fillRect(x + 6, 448, 78, 6); ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let j = 0; j < 12; j++) ctx.fillRect(x + 6 + (j * 23) % 78, 452 + (j * 7) % 14, 3, 3); }
    P2.fire(ctx, 100, 600, .8, t); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 100, 560, 260, 'rgba(255,150,60,.2)'); ctx.restore(); P.motes(ctx, t, 14, 3); }

  // =================== Han throne hall ===================
  const courtL = () => layer('s-hancourt', g => { g.fillStyle = '#3a1a14'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    g.fillStyle = grad(g, 0, 0, 0, 480, [[0, '#5a2a1e'], [1, '#7a3a26']]); g.fillRect(-PAD, 0, W + PAD * 2, 480);
    for (let x = -PAD + 30; x < W + PAD; x += 60) { g.strokeStyle = 'rgba(0,0,0,.2)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 480); g.stroke(); }
    // the cloud screen behind the throne
    sh(g, '#d8a83a', 4, c => c.rect(420, 90, 440, 300)); sh(g, '#e8dcc0', 3, c => c.rect(436, 106, 408, 268)); for (let i = 0; i < 6; i++) { const cx = 480 + (i % 3) * 140, cy = 170 + Math.floor(i / 3) * 110; g.strokeStyle = '#4a6a8a'; g.lineWidth = 4; for (const r of [26, 16]) { g.beginPath(); g.arc(cx, cy, r, PI, TAU * .95); g.stroke(); } g.beginPath(); g.moveTo(cx + 26, cy); g.quadraticCurveTo(cx + 60, cy + 6, cx + 70, cy - 10); g.stroke(); }
    // floor + the dais with steps
    g.fillStyle = grad(g, 0, 480, 0, H, [[0, '#4a3a30'], [1, '#2a201a']]); g.fillRect(-PAD, 480, W + PAD * 2, H - 480); for (let x = -PAD; x < W + PAD; x += 90) ln(g, [[x, 480], [x + (x - 640) * .4, H]], 2, 'rgba(0,0,0,.3)');
    for (let i = 0; i < 4; i++) sh(g, mul('#8a2a22', 1 - i * .06), 3, c => c.rect(380 - i * 30, 380 + i * 30, 520 + i * 60, 30));
    sh(g, '#d8a83a', 4, c => c.roundRect(560, 300, 160, 90, 12)); sh(g, '#c8322a', 3, c => c.rect(580, 320, 120, 50));
    // red lacquered pillars standing on stone bases
    for (const x of [140, 300, 980, 1140]) { shadow(g, x, 500, 70, .4); sh(g, '#b8322a', 4, c => c.rect(x - 34, 0, 68, 480)); g.fillStyle = 'rgba(255,255,255,.15)'; g.fillRect(x - 24, 0, 12, 480); sh(g, '#d8a83a', 3, c => c.rect(x - 40, 60, 80, 20)); sh(g, '#8a8070', 3.5, c => c.rect(x - 46, 470, 92, 34)); }
  });
  function hanCourt(ctx, t, o = {}) { put(ctx, courtL(), o.pan || 0, .25);
    for (const x of [220, 1060]) P2.lantern(ctx, x, 130, t, .9);
    if (o.guards !== false) for (const x of [70, 1210]) fig(ctx, 'hanAdv', x, 600, .42, t, { turn: x < 640 ? .4 : -.4, prop: 'none', outfit: 'hanRed' });
    P.motes(ctx, t, 16, 5); }

  // =================== merchant's salt & iron yard ===================
  const estateL = () => layer('s-estate', g => { ES.skyFor(g, 'day'); P.hills(g, 300, [[-PAD, 270], [300, 230], [700, 260], [1000, 220], [W + PAD, 250]], '#a8b890', '#8a9a72', 2);
    meadowGround(g, 300, '#b8a878', 11);
    // storehouses with tiled roofs along the back
    for (const [x, w] of [[40, 260], [340, 240], [880, 300]]) { shadow(g, x + w / 2, 402, w * .55, .3); sh(g, '#d8c8a0', 3.5, c => c.rect(x, 300, w, 100)); roof(g, x, 300, w, 60, '#3a3a40'); sh(g, '#6a4a2a', 3, c => c.rect(x + w / 2 - 26, 340, 52, 60)); }
    // the forge chimney + the brine pans (shallow iron pans over fires)
    sh(g, '#7a6a5a', 3.5, c => c.rect(680, 170, 60, 230)); stoneCourses(g, 680, 170, 60, 230, '#8a7a6a', 3); shadow(g, 710, 402, 60, .3);
    for (const x of [260, 520, 780, 1040]) { shadow(g, x, 560, 130, .35); sh(g, '#5a5a5e', 4, c => c.rect(x - 110, 520, 220, 26)); sh(g, '#e8eef2', 2, c => c.rect(x - 102, 522, 204, 10)); sh(g, '#7a6a5a', 3, c => c.rect(x - 100, 546, 200, 14)); }
  });
  function hanEstate(ctx, t, o = {}) { put(ctx, estateL(), o.pan || 0, .25); smoke(ctx, t, 710, 170, .4);
    for (const x of [260, 520, 780, 1040]) { P2.fire(ctx, x, 556, .35, t + x); steam(ctx, t + x, x, 516, 180, .45); }
    PR.cart(ctx, 160, 660, .9, 'sacks'); PR.cart(ctx, 1130, 670, .9, 'sacks'); for (const [x, y] of [[300, 640], [340, 655], [960, 660]]) sack(ctx, x, y, .8, '#e2d2a8');
    for (const [sp, ph, y] of [[22, 0, 470], [18, 300, 600], [26, 700, 690]]) { const L = 1100, u = ((t * sp + ph) % (2 * L)), x = 90 + (u < L ? u : 2 * L - u), d = u < L ? 1 : -1; fig(ctx, 'merchant', x, y, .28 + (y - 470) / 1200, t, { walk: t * 7, turn: .8 * d, outfit: 'hanScholar', hat: 'none', look: { width: 1 } }); }
    P.birds(ctx, t, [[200, 120, 26, 0], [700, 90, 30, 2]]); }

  // =================== the salt-and-iron debate, 81 BC ===================
  const debateL = () => layer('s-debate', g => { g.fillStyle = grad(g, 0, 0, 0, H, [[0, '#6a3a26'], [1, '#3a2016']]); g.fillRect(-PAD, 0, W + PAD * 2, H);
    for (const x of [100, 1180]) { sh(g, '#b8322a', 4, c => c.rect(x - 30, 0, 60, 520)); sh(g, '#8a8070', 3.5, c => c.rect(x - 40, 500, 80, 30)); }
    for (let i = 0; i < 4; i++) { sh(g, '#e8dcc0', 3, c => c.rect(250 + i * 200, 160, 140, 220)); g.fillStyle = '#2a1a10'; g.font = '700 18px serif'; g.textAlign = 'center'; for (let j = 0; j < 6; j++) g.fillText('鹽 鐵'[j % 3] || '論', 290 + i * 200 + (j % 2) * 50, 200 + Math.floor(j / 2) * 60); }
    g.fillStyle = grad(g, 0, 520, 0, H, [[0, '#4a3a2a'], [1, '#2a2018']]); g.fillRect(-PAD, 520, W + PAD * 2, H - 520);
    shadow(g, 640, 610, 480, .4); sh(g, '#6a3a22', 4, c => c.rect(180, 540, 920, 40)); for (const x of [200, 1060]) sh(g, '#4a2a18', 3, c => c.rect(x, 580, 22, 40)); for (let i = 0; i < 6; i++) PR.scroll ? 0 : 0;
    for (let i = 0; i < 6; i++) { const x = 260 + i * 150; sh(g, '#e8d8b0', 3, c => c.rect(x - 34, 528, 68, 14)); }
  });
  function debate(ctx, t, o = {}) { put(ctx, debateL(), o.pan || 0, .2);
    const sc = o.score || [0, 0]; ln(ctx, [[460, 0], [460, 40]], 4, '#2a1a10'); ln(ctx, [[820, 0], [820, 40]], 4, '#2a1a10');   // the hanging scoreboard
    sh(ctx, '#2a1a10', 4, c => c.roundRect(400, 36, 480, 110, 10)); for (const [i, lab, col] of [[0, 'GOVERNMENT', '#c8322a'], [1, 'SCHOLARS', '#3a6aa8']]) { const x = 520 + i * 240;
      ctx.font = '700 20px Fredoka'; ctx.fillStyle = '#f2e6cc'; ctx.textAlign = 'center'; ctx.fillText(lab, x, 66); sh(ctx, col, 2, c => c.roundRect(x - 40, 78, 80, 56, 8)); ctx.font = '46px "Luckiest Guy"'; ctx.fillStyle = '#fff'; ctx.fillText(String(sc[i]), x, 124); }
    P.motes(ctx, t, 12, 9); }

  // =================== the Via Salaria ===================
  const viaL = () => layer('s-via', g => { ES.skyFor(g, 'day'); P.hills(g, 330, [[-PAD, 300], [200, 250], [500, 290], [800, 240], [1100, 280], [W + PAD, 260]], '#a8bc8a', '#86a070', 2);
    // Rome on its hills, far off (left)
    for (const [x, w, h] of [[60, 60, 40], [120, 40, 60], [170, 70, 36], [250, 50, 50]]) { sh(g, '#e8dcc0', 2, c => c.rect(x, 300 - h, w, h)); sh(g, '#c87a4a', 2, c => { c.moveTo(x - 4, 300 - h); c.lineTo(x + w / 2, 300 - h - 14); c.lineTo(x + w + 4, 300 - h); c.closePath(); }); }
    meadowGround(g, 300, '#9ab866', 21);
    // the road: perspective from left-far to right-near, paved, with kerbs
    sh(g, '#b8a888', 3, c => { c.moveTo(250, 305); c.lineTo(300, 305); c.lineTo(1300 + PAD, 640); c.lineTo(1300 + PAD, 760); c.lineTo(700, H); c.closePath(); });
    g.save(); g.beginPath(); g.moveTo(250, 305); g.lineTo(300, 305); g.lineTo(1300 + PAD, 640); g.lineTo(1300 + PAD, 760); g.lineTo(700, H); g.closePath(); g.clip(); const r = rng(3);
    for (let i = 0; i < 260; i++) { const u = Math.pow(r(), .6), x = lerp(270, 1100, u) + (r() - .5) * lerp(30, 520, u), y = lerp(305, 690, u) + (r() - .5) * lerp(5, 60, u), s = lerp(.15, 1.3, u); sh(g, mul('#c8b898', .88 + r() * .2), 1.5, c => c.ellipse(x, y, 26 * s, 12 * s, 0, 0, TAU)); } g.restore();
    // a milestone, cypresses + umbrella pines along the road
    shadow(g, 860, 520, 40, .3); sh(g, '#e8dcc0', 3.5, c => { c.moveTo(830, 520); c.lineTo(830, 420); c.quadraticCurveTo(860, 400, 890, 420); c.lineTo(890, 520); c.closePath(); }); g.font = '700 14px serif'; g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText('VIA', 860, 448); g.fillText('SALARIA', 860, 466); g.fillText('XII', 860, 488);
    for (const [x, y, s] of [[420, 360, .4], [540, 380, .45], [1180, 560, .9]]) { shadow(g, x + 6, y + 2, 30 * s, .28); sh(g, '#2e5a2e', 3, c => { c.moveTo(x, y); c.quadraticCurveTo(x - 30 * s, y - 120 * s, x, y - 240 * s); c.quadraticCurveTo(x + 30 * s, y - 120 * s, x, y); }); }
    for (const [x, y, s] of [[60, 470, 1.0], [700, 350, .5]]) tree(g, x, y, s * .8, 30 + x);
  });
  function via(ctx, t, o = {}) { put(ctx, viaL(), o.pan || 0, .25); P.clouds(ctx, t, 0, [[100, 40, .8, 3, 5], [760, 70, .7, 7, 4]]);
    const u = o.cart ?? ((t * .03) % 1), x = lerp(320, 1150, u), y = lerp(320, 660, u), s = lerp(.2, 1, u);   // a mule cart of salt sacks coming toward us
    FA.horse(ctx, x + 110 * s, y, .55 * s, t, { dir: 1, coat: '#7a6a5a' }); PR.cart(ctx, x, y, .9 * s, 'sacks'); fig(ctx, 'legion', x + 170 * s, y + 6, .3 * s, t, { walk: t * 7, turn: .7, outfit: 'toga', hat: 'none' });
    P.birds(ctx, t, [[300, 120, 28, 0], [900, 80, 24, 2]]); }

  // =================== the royal salt store (grenier à sel) ===================
  const grenierL = () => layer('s-grenier', g => { g.fillStyle = '#d8c8a8'; g.fillRect(-PAD, 0, W + PAD * 2, H); stoneCourses(g, -PAD, 0, W + PAD * 2, 500, '#cbb898', 61);
    sh(g, '#5a3a22', 4, c => c.rect(-PAD, 0, W + PAD * 2, 44)); for (let x = -PAD; x < W + PAD; x += 180) ln(g, [[x, 44], [x + 90, 0]], 10, '#4a2a18');
    // the royal arms over the counter: blue shield with gold lilies
    sh(g, '#2a3e8a', 4, c => { c.moveTo(580, 80); c.lineTo(700, 80); c.lineTo(700, 150); c.quadraticCurveTo(640, 200, 580, 150); c.closePath(); }); g.fillStyle = '#e8c45a'; for (const [x, y] of [[610, 110], [670, 110], [640, 150]]) { g.beginPath(); g.ellipse(x, y, 8, 14, 0, 0, TAU); g.fill(); }
    g.font = '700 26px serif'; g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText('GRENIER À SEL', 640, 236);
    // arched doors: the queue door (left) and the side door for the exempt (right)
    for (const [x, w, col] of [[60, 200, '#3a2a1e'], [1080, 140, '#4a2a3a']]) { sh(g, col, 4, c => { c.moveTo(x, 500); c.lineTo(x, 300); c.quadraticCurveTo(x + w / 2, 230, x + w, 300); c.lineTo(x + w, 500); c.closePath(); }); }
    g.font = '700 18px Fredoka'; g.fillStyle = '#5a1e2a'; g.fillText('nobles · clergy', 1150, 286);
    g.fillStyle = grad(g, 0, 500, 0, H, [[0, '#8a7a62'], [1, '#5a4c3c']]); g.fillRect(-PAD, 500, W + PAD * 2, H - 500); for (let y = 520; y < H; y += 40) ln(g, [[-PAD, y], [W + PAD, y]], 2, 'rgba(30,20,10,.3)');
    // the counter with the big balance scale
    shadow(g, 640, 600, 300, .35); sh(g, '#7a5432', 4, c => c.rect(400, 440, 480, 150)); sh(g, '#8a6038', 4, c => c.rect(390, 430, 500, 20));
    ln(g, [[640, 430], [640, 300]], 8, '#3a2a1a'); ln(g, [[540, 310], [740, 310]], 6, '#3a2a1a'); for (const x of [540, 740]) { ln(g, [[x, 310], [x - 30, 370]], 2, '#3a2a1a'); ln(g, [[x, 310], [x + 30, 370]], 2, '#3a2a1a'); sh(g, '#b8945a', 3, c => c.ellipse(x, 372, 40, 10, 0, 0, TAU)); }
    for (const [x, y] of [[180, 600], [240, 620], [960, 600], [1020, 620], [990, 560]]) sack(g, x, y, .9, '#e8dcbc', 'SEL');
  });
  function grenier(ctx, t, o = {}) { put(ctx, grenierL(), o.pan || 0, .2); saltHeap(ctx, 740, 372, 70, 30); P.motes(ctx, t, 14, 9); }

  // =================== night border (smugglers) ===================
  const borderL = () => layer('s-border', g => { g.fillStyle = grad(g, 0, 0, 0, 380, [[0, '#0e1430'], [1, '#2e3a5e']]); g.fillRect(-PAD, 0, W + PAD * 2, 380);
    const r = rng(7); for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(255,250,235,${.2 + r() * .7})`; g.fillRect(-PAD + r() * (W + PAD * 2), r() * 340, 1.6, 1.6); }
    T.glow(g, 1040, 110, 160, 'rgba(240,240,220,.35)'); sh(g, '#f4f2e4', 0, circ(1040, 110, 46));
    P.hills(g, 400, [[-PAD, 360], [300, 320], [600, 350], [900, 310], [W + PAD, 340]], '#2a3a4a', '#1e2a38', 2);
    g.fillStyle = grad(g, 0, 380, 0, H, [[0, '#2e4048'], [1, '#1a2228']]); g.fillRect(-PAD, 380, W + PAD * 2, H - 380);
    // a stream (the provincial border) running across, with a ford of stones
    sh(g, '#3a5a7a', 3, c => { c.moveTo(-PAD, 500); c.quadraticCurveTo(400, 470, 700, 510); c.quadraticCurveTo(1000, 550, W + PAD, 520); c.lineTo(W + PAD, 560); c.quadraticCurveTo(1000, 590, 700, 550); c.quadraticCurveTo(400, 510, -PAD, 540); c.closePath(); });
    g.strokeStyle = 'rgba(220,230,255,.35)'; g.lineWidth = 2; for (let i = 0; i < 30; i++) { const x = -PAD + r() * (W + PAD * 2); g.beginPath(); g.moveTo(x, 515 + r() * 24); g.lineTo(x + 30, 515 + r() * 24); g.stroke(); }
    for (let i = 0; i < 6; i++) sh(g, '#6a7480', 2.5, c => c.ellipse(560 + i * 34, 520 + (i % 2) * 8, 16, 8, 0, 0, TAU));
    // the border stone, hedges and trees on the banks
    shadow(g, 860, 470, 30, .4); sh(g, '#9aa0a8', 3.5, c => { c.moveTo(840, 470); c.lineTo(840, 410); c.quadraticCurveTo(860, 396, 880, 410); c.lineTo(880, 470); c.closePath(); }); g.font = '700 13px serif'; g.fillStyle = '#2a2a34'; g.textAlign = 'center'; g.fillText('BRET.', 860, 436); g.fillText('ANJOU', 860, 456);
    for (const [x, y, s] of [[120, 470, .5], [1180, 480, .55]]) tree(g, x, y, s, 50 + x);
    g.fillStyle = 'rgba(10,20,30,.35)'; g.fillRect(-PAD, 0, W + PAD * 2, H);
  });
  function border(ctx, t, o = {}) { put(ctx, borderL(), o.pan || 0, .2); P.motes(ctx, t, 8, 2); }

  // =================== Erie Canal + Syracuse salt ===================
  const canalL = v => layer('s-canal-' + v, g => { ES.skyFor(g, 'day'); P.hills(g, 320, [[-PAD, 290], [300, 260], [700, 280], [1000, 250], [W + PAD, 270]], '#a6bc90', '#86a072', 2);
    meadowGround(g, 300, '#8ab25e', 5);
    if (v === 'salt') { for (const [x, w] of [[60, 220], [340, 200], [860, 260], [1150, 180]]) { shadow(g, x + w / 2, 392, w * .55, .3); sh(g, '#a87a4a', 3.5, c => c.rect(x, 320, w, 70)); roof(g, x, 320, w, 40, '#6a5a4a', false); sh(g, '#6a4a2a', 3, c => c.rect(x + w / 2 - 20, 350, 40, 40)); sh(g, '#8a7a6a', 3, c => c.rect(x + w - 40, 250, 24, 70)); } }
    else for (const [x, s] of [[80, .4], [200, .5], [1100, .45], [1220, .5]]) tree(g, x, 330, s, 60 + x);
    // the canal (straight, stone-lined), the towpath on its near bank
    sh(g, '#8a7a62', 3, c => c.rect(-PAD, 420, W + PAD * 2, 12)); g.fillStyle = grad(g, 0, 432, 0, 520, [[0, '#5a8aa0'], [1, '#3e6a80']]); g.fillRect(-PAD, 432, W + PAD * 2, 88);
    const r = rng(2); for (let i = 0; i < 40; i++) { const x = -PAD + r() * (W + PAD * 2), y = 440 + r() * 74; g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 26, y); g.stroke(); }
    sh(g, '#8a7a62', 3, c => c.rect(-PAD, 520, W + PAD * 2, 14)); sh(g, '#c8b088', 3, c => c.rect(-PAD, 534, W + PAD * 2, 60)); for (let i = 0; i < 40; i++) { g.fillStyle = 'rgba(120,90,60,.4)'; g.beginPath(); g.ellipse(-PAD + r() * (W + PAD * 2), 540 + r() * 50, 4, 2, 0, 0, TAU); g.fill(); }
  });
  function canal(ctx, t, o = {}) { const v = o.v || 'canal'; put(ctx, canalL(v), o.pan || 0, .25); P.clouds(ctx, t, 0, [[100, 40, .8, 3, 5], [700, 60, .7, 6, 4]]);
    if (v === 'salt') for (const x of [1192, 900 + 220, 460, 160]) smoke(ctx, t, x, 250, .3); if (v === 'salt') for (const x of [170, 440, 990]) steam(ctx, t + x, x, 330, 120, .4);
    const u = o.boat ?? ((t * .025) % 1), bx = lerp(-200, W + 200, u);   // a canal boat loaded with salt barrels, towed by a mule on the towpath
    ln(ctx, [[bx + 90, 470], [bx + 330, 520]], 2, '#3a2a1a'); FA.horse(ctx, bx + 360, 560, .55, t, { dir: 1, coat: '#6a5a4a' }); fig(ctx, 'peasant', bx + 450, 566, .3, t, { walk: t * 7, turn: .8 });
    shadow(ctx, bx, 490, 140, .2); sh(ctx, '#7a4a2a', 3.5, c => { c.moveTo(bx - 130, 470); c.lineTo(bx + 130, 470); c.lineTo(bx + 112, 494); c.lineTo(bx - 112, 494); c.closePath(); }); sh(ctx, '#d8c8a8', 3, c => c.rect(bx - 90, 444, 110, 26)); roof(ctx, bx - 90, 444, 110, 14, '#8a5a3a', false);
    for (let i = 0; i < 3; i++) PR.barrel(ctx, bx + 40 + i * 30, 470, .45);
    if (o.dig) for (const [x, ph] of [[220, 0], [420, 1], [880, 2]]) { const k = (Math.sin(t * 3 + ph) + 1) / 2; fig(ctx, 'peasant', x, 650, .55, t + ph, { turn: .4, pose: { L: [-60, -260 + k * 60], R: [80, -300 + k * 80], hL: 'hold', hR: 'hold' } }); ln(ctx, [[x + 20, 650 - 300 * .55 + k * 30], [x + 70, 650 - k * 10]], 6, '#6a4a2a'); }
    P.birds(ctx, t, [[200, 110, 26, 0], [800, 80, 30, 1.6]]); }

  // =================== Carthage ===================
  const carthL = v => layer('s-carth-' + v, g => { ES.skyFor(g, v === 'ruin' ? 'gold' : 'day');
    g.fillStyle = grad(g, 0, 300, 0, 380, [[0, '#5aa0c8'], [1, '#3a80aa']]); g.fillRect(-PAD, 300, W + PAD * 2, 80);   // the sea
    meadowGround(g, 380, v === 'ruin' ? '#b8a46a' : '#a8b866', 9);
    if (v === 'ruin') { for (const [x, w, h] of [[120, 120, 120], [300, 80, 70], [520, 160, 150], [760, 100, 90], [980, 140, 130]]) { shadow(g, x + w / 2, 382, w * .6, .35); sh(g, '#c8a878', 3.5, c => { c.moveTo(x, 380); c.lineTo(x, 380 - h); c.lineTo(x + w * .3, 380 - h + 20); c.lineTo(x + w * .5, 380 - h - 10); c.lineTo(x + w * .8, 380 - h + 30); c.lineTo(x + w, 380 - h * .6); c.lineTo(x + w, 380); c.closePath(); }); stoneCourses(g, x + 4, 380 - h * .55, w - 8, h * .5, '#b89868', x); }
      g.fillStyle = 'rgba(40,30,20,.3)'; for (let i = 0; i < 30; i++) g.fillRect(100 + (i * 41) % 1080, 400 + (i * 17) % 80, 18, 6); }
    else { for (const [x, w] of [[140, 200], [420, 160], [700, 220], [1000, 180]]) { shadow(g, x + w / 2, 382, w * .55, .3); sh(g, '#f2e6cc', 3.5, c => c.rect(x, 300, w, 80)); sh(g, '#c87a4a', 3, c => { c.moveTo(x - 10, 300); c.lineTo(x + w / 2, 268); c.lineTo(x + w + 10, 300); c.closePath(); }); }
      for (let r = 0; r < 4; r++) ln(g, [[-PAD, 480 + r * 50], [W + PAD, 470 + r * 50]], 4, 'rgba(120,90,40,.35)'); }   // ploughed farmland of the colony
  });
  function carthage(ctx, t, o = {}) { const v = o.v || 'ruin'; put(ctx, carthL(v), o.pan || 0, .25); if (v === 'ruin') { smoke(ctx, t, 580, 230, .35); smoke(ctx, t + 1, 1040, 250, .3); }
    else { P.clouds(ctx, t, 0, [[100, 40, .8, 3, 5]]); for (const x of [300, 900]) TS.conifer ? 0 : 0; } P.birds(ctx, t, [[300, 120, 26, 0], [900, 90, 24, 2]]); }

  // =================== a Roman camp (pay day) ===================
  const campL = () => layer('s-camp', g => { ES.skyFor(g, 'day'); P.hills(g, 320, [[-PAD, 290], [400, 250], [900, 280], [W + PAD, 260]], '#a8bc8a', '#86a070', 2); meadowGround(g, 320, '#9ab866', 31);
    for (const [x, s] of [[120, .9], [420, .7], [1000, .8]]) { shadow(g, x, 382, 110 * s, .3); sh(g, '#e8dcbc', 3.5, c => { c.moveTo(x - 100 * s, 380); c.lineTo(x - 80 * s, 280 * s + (1 - s) * 380); c.lineTo(x + 80 * s, 280 * s + (1 - s) * 380); c.lineTo(x + 100 * s, 380); c.closePath(); }); sh(g, '#d8c8a4', 3, c => { c.moveTo(x - 20 * s, 380); c.lineTo(x, 300 * s + (1 - s) * 380); c.lineTo(x + 20 * s, 380); c.closePath(); }); }
    sh(g, '#b8322a', 3, c => c.rect(760, 180, 10, 200)); sh(g, '#c8322a', 3, c => c.rect(770, 190, 70, 50)); g.fillStyle = '#e8c45a'; g.font = '700 18px serif'; g.fillText('SPQR', 774, 222);
    shadow(g, 640, 600, 260, .35); sh(g, '#8a6038', 4, c => c.rect(420, 500, 440, 26)); for (const x of [440, 820]) sh(g, '#6a4a2a', 3, c => c.rect(x, 526, 20, 80));
  });
  function camp(ctx, t, o = {}) { put(ctx, campL(), o.pan || 0, .25); P.clouds(ctx, t, 0, [[100, 40, .8, 3, 5], [700, 60, .7, 6, 4]]);
    for (let i = 0; i < 5; i++) sh(ctx, '#e8c45a', 2.5, c => c.ellipse(560 + (i % 3) * 18, 498 - Math.floor(i / 3) * 7, 16, 6, 0, 0, TAU));
    sh(ctx, '#7a5a3a', 3, c => c.rect(680, 474, 120, 26)); ctx.fillStyle = '#3a2a1a'; for (let i = 0; i < 3; i++) ctx.fillRect(690, 480 + i * 6, 100, 2); }

  // =================== Saltville, Virginia ===================
  const svL = v => layer('s-sv-' + v, g => { if (v === 'dusk') G.ES.skyFor(g, 'dusk'); else if (v === 'night') { g.fillStyle = grad(g, 0, 0, 0, 380, [[0, '#141a2e'], [1, '#3a3a50']]); g.fillRect(-PAD, 0, W + PAD * 2, 380); } else P2.overcast(g, [[0, '#7d8ea2'], [.5, '#b2bcc4'], [1, '#d8d4c8']], 5, [900, 200]);
    P.hills(g, 360, [[-PAD, 250], [250, 190], [500, 260], [800, 200], [1100, 240], [W + PAD, 210]], '#6a7a5a', '#4e5e42', 2.5);
    for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 1)(), x = -PAD + ((i * 97) % (W + PAD * 2)), y = 260 + ((i * 53) % 90); TS.conifer(g, x, y, .25 + (i % 3) * .05, '#2e4a32'); }
    meadowGround(g, 360, '#7a9a5a', 17);
    // the railroad along the valley
    sh(g, '#6a5a4a', 2, c => c.rect(-PAD, 420, W + PAD * 2, 12)); for (let x = -PAD; x < W + PAD; x += 24) ln(g, [[x, 416], [x, 436]], 5, '#4a3a2a'); ln(g, [[-PAD, 420], [W + PAD, 420]], 3, '#8a8a90'); ln(g, [[-PAD, 430], [W + PAD, 430]], 3, '#8a8a90');
    // the salt furnaces: long low sheds with kettles and tall brick chimneys
    for (const [x, w] of [[120, 300], [520, 260], [880, 320]]) { shadow(g, x + w / 2, 542, w * .55, .35); const dead = v === 'wrecked';
      sh(g, dead ? '#5a4a3a' : '#8a6a4a', 3.5, c => c.rect(x, 470, w, 70)); if (!dead) roof(g, x, 470, w, 36, '#4a3a30', false); else { ln(g, [[x, 470], [x + w * .4, 440]], 6, '#3a2a1e'); ln(g, [[x + w, 470], [x + w * .7, 450]], 6, '#3a2a1e'); }
      for (let i = 0; i < 5; i++) sh(g, '#3a3a3e', 2.5, c => c.ellipse(x + 30 + i * (w - 60) / 4, 500, 20, 8, 0, 0, TAU));
      sh(g, '#9a5a3a', 3, c => c.rect(x + w - 40, dead ? 420 : 360, 26, dead ? 50 : 110)); }
    if (v === 'wrecked') { g.fillStyle = 'rgba(30,20,10,.5)'; for (let i = 0; i < 16; i++) g.fillRect(100 + i * 70, 418 + (i % 3) * 6, 40, 4); }
  });
  function saltville(ctx, t, o = {}) { const v = o.v || 'day'; put(ctx, svL(v), o.pan || 0, .25);
    if (v === 'day' || v === 'dusk') for (const x of [433, 793, 1187]) smoke(ctx, t + x, x, 360, .4);
    if (v === 'wrecked') for (const x of [270, 650, 1040]) { smoke(ctx, t + x, x, 470, .55); P2.fire(ctx, x, 540, .6, t + x); }
    P.birds(ctx, t, [[200, 120, 26, 0], [800, 90, 24, 1.4]]); }

  // =================== the Salt March road + Dandi beach ===================
  const banyan = (g, x, y, s, seed) => { shadow(g, x, y + 2, 170 * s, .3); for (let i = -3; i <= 3; i++) ln(g, [[x + i * 30 * s, y], [x + i * 26 * s, y - 160 * s]], 7 * s + 2, '#6a4a2e'); ln(g, [[x, y], [x, y - 190 * s]], 40 * s, '#5a3a24');
    P.leafMass(g, x, y - 260 * s, 240 * s, 120 * s, seed, ['#2e4a22', '#3e6a2c', '#5a8a3a', '#7aa84a']); };
  const marchL = () => layer('s-march', g => { ES.skyFor(g, 'noon'); P.hills(g, 330, [[-PAD, 310], [400, 290], [900, 305], [W + PAD, 296]], '#c8b888', '#b0a070', 2);
    meadowGround(g, 330, '#c8b070', 41);
    for (const [x, w] of [[60, 120], [200, 90], [1060, 110], [1180, 90]]) { shadow(g, x + w / 2, 372, w * .55, .3); sh(g, '#d8b88a', 3, c => c.rect(x, 320, w, 50)); sh(g, '#8a6a3a', 3, c => { c.moveTo(x - 10, 320); c.lineTo(x + w / 2, 290); c.lineTo(x + w + 10, 320); c.closePath(); }); }
    sh(g, '#d8c09a', 3, c => { c.moveTo(560, 335); c.lineTo(720, 335); c.lineTo(1100, H); c.lineTo(180, H); c.closePath(); });
    const r = rng(6); for (let i = 0; i < 120; i++) { const u = r(), y = lerp(340, H, u), x = lerp(640, 640, u) + (r() - .5) * lerp(150, 900, u); g.fillStyle = 'rgba(150,120,80,.4)'; g.beginPath(); g.ellipse(x, y, 3 + u * 6, 1.5 + u * 3, 0, 0, TAU); g.fill(); }
    banyan(g, 120, 520, .9, 3); banyan(g, 1160, 540, 1.0, 5); for (const [x, s] of [[420, .35], [880, .4]]) EF.palm(g, x, 345, s, x);
  });
  function marchRoad(ctx, t, o = {}) { put(ctx, marchL(), o.pan || 0, .25); P.birds(ctx, t, [[200, 120, 26, 0], [800, 90, 24, 1.4]]); }
  const dandiL = () => layer('s-dandi', g => { ES.skyFor(g, 'dawn'); g.fillStyle = grad(g, 0, 300, 0, 420, [[0, '#7ab8d0'], [1, '#4a90b0']]); g.fillRect(-PAD, 300, W + PAD * 2, 120);
    const r = rng(9); for (let i = 0; i < 50; i++) { g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2; const x = -PAD + r() * (W + PAD * 2), y = 306 + r() * 110; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 30, y); g.stroke(); }
    sh(g, '#d8c49a', 3, c => { c.moveTo(-PAD, 420); c.quadraticCurveTo(640, 404, W + PAD, 420); c.lineTo(W + PAD, H); c.lineTo(-PAD, H); c.closePath(); }); g.fillStyle = grad(g, 0, 420, 0, H, [[0, 'rgba(120,100,70,.3)'], [1, 'rgba(255,255,255,0)']]); g.fillRect(-PAD, 420, W + PAD * 2, H - 420);
    for (let i = 0; i < 26; i++) { const x = 300 + r() * 700, y = 520 + r() * 160; sh(g, 'rgba(252,252,248,.95)', 1.5, c => c.ellipse(x, y, 20 + r() * 40, 6 + r() * 8, 0, 0, TAU)); }   // the white salt crust on the mud
    for (const [x, s] of [[80, .7], [190, .55], [1150, .75]]) EF.palm(g, x, 470, s, x);
  });
  function dandi(ctx, t, o = {}) { put(ctx, dandiL(), o.pan || 0, .25); for (let i = 0; i < 3; i++) { const k = (t * .2 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.6 * (1 - k)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-10, 418 - k * 10); ctx.quadraticCurveTo(640, 404 - k * 14, W + 10, 418 - k * 10); ctx.stroke(); }
    P.birds(ctx, t, [[200, 140, 26, 0], [800, 100, 30, 2]]); }

  // =================== 19th-century salt works ===================
  const worksL = () => layer('s-works', g => { P2.overcast(g, [[0, '#8a8a7e'], [.5, '#b8b4a4'], [1, '#d8d0bc']], 3, [900, 200]);
    meadowGround(g, 380, '#8a8a6a', 13);
    for (const [x, w] of [[80, 320], [500, 280], [880, 340]]) { shadow(g, x + w / 2, 482, w * .55, .35); bricks(g, x, 380, w, 100, { c: '#9a5a3a', mortar: '#6a3a26', bw: 30, bh: 12, seed: x }); roof(g, x, 380, w, 50, '#4a4a50', false); sh(g, '#9a5a3a', 3.5, c => c.rect(x + w - 50, 200, 34, 180)); }
    for (const [x, w] of [[120, 260], [700, 300]]) { shadow(g, x + w / 2, 620, w * .55, .3); sh(g, '#5a5a5e', 4, c => c.rect(x, 570, w, 40)); sh(g, '#f4f6f8', 2, c => c.rect(x + 6, 574, w - 12, 12)); }
  });
  function saltworks(ctx, t, o = {}) { put(ctx, worksL(), o.pan || 0, .25); for (const x of [367, 747, 1187]) smoke(ctx, t + x, x, 200, .5); for (const x of [250, 850]) steam(ctx, t + x, x, 570, 240, .5);
    saltHeap(ctx, 520, 690, 260, 110); saltHeap(ctx, 1080, 680, 220, 90); PR.wheelbarrow(ctx, 360, 690, 1); PR.cart(ctx, 1180, 700, 1, 'sacks'); }

  // =================== 1924 grocery ===================
  const groceryL = () => layer('s-grocery', g => { g.fillStyle = '#e8dcc0'; g.fillRect(-PAD, 0, W + PAD * 2, H); for (let x = -PAD; x < W + PAD; x += 40) ln(g, [[x, 0], [x, 420]], 2, 'rgba(120,90,50,.15)');
    for (let row = 0; row < 3; row++) { const y = 120 + row * 110; sh(g, '#8a5a34', 3.5, c => c.rect(40, y, 1200, 14)); const r = rng(row + 5);
      for (let x = 60; x < 1220; x += 46 + r() * 20) { const h = 50 + r() * 40, col = ['#c8322a', '#3a6aa8', '#e8c45a', '#5a8a4a', '#e8dcc0', '#7a4a8a'][Math.floor(r() * 6)]; sh(g, col, 2.5, c => c.rect(x, y - h, 38, h)); g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(x + 4, y - h + 8, 30, 6); } }
    g.font = '700 30px serif'; g.fillStyle = '#5a3a22'; g.textAlign = 'center'; g.fillText('GENERAL STORE · MICHIGAN', 640, 40);
    g.fillStyle = grad(g, 0, 420, 0, H, [[0, '#8a6a48'], [1, '#5a4430']]); g.fillRect(-PAD, 420, W + PAD * 2, H - 420); for (let x = -PAD; x < W + PAD; x += 60) ln(g, [[x, 420], [x + (x - 640) * .5, H]], 2, 'rgba(30,20,10,.3)');
    shadow(g, 640, 600, 420, .35); sh(g, '#7a4a2a', 4, c => c.rect(260, 460, 760, 140)); sh(g, '#9a6a3a', 4, c => c.rect(250, 450, 780, 20)); for (const x of [300, 980]) sh(g, '#d8c8a0', 3, c => c.rect(x - 30, 380, 60, 70));
  });
  function saltBox(ctx, x, y, s = 1, label = 'IODIZED') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadow(ctx, 0, 2, 40, .3); sh(ctx, '#2a5aa8', 3.5, c => c.roundRect(-34, -110, 68, 110, 8)); sh(ctx, '#f4f2ea', 2.5, c => c.ellipse(0, -110, 34, 9, 0, 0, TAU));
    sh(ctx, '#f4f2ea', 2, c => c.rect(-28, -86, 56, 46)); ctx.font = '700 12px Fredoka'; ctx.fillStyle = '#2a5aa8'; ctx.textAlign = 'center'; ctx.fillText('TABLE', 0, -70); ctx.fillText('SALT', 0, -56); ctx.fillStyle = '#c8322a'; ctx.fillText(label, 0, -44); ctx.restore(); }
  function grocery(ctx, t, o = {}) { put(ctx, groceryL(), o.pan || 0, .2); for (let i = 0; i < (o.boxes ?? 5); i++) saltBox(ctx, 470 + i * 80, 452, .9); P.motes(ctx, t, 12, 4); }

  Object.assign(TS, { mine, larder, hanCourt, hanEstate, debate, via, grenier, border, canal, carthage, camp, saltville, marchRoad, dandi, saltworks, grocery, saltBox, banyan });
})(window);
