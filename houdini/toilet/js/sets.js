/* "Where Does It Go?" — painted sets (G.TS), in the repainted look (layered depth, soft light, lush foreground).
 *   bathroom(ctx,t,o) + toilet(ctx,x,y,s,o)   modern bright bathroom; the porcelain toilet drawn separately (front/behind)
 *   orkney(ctx,t,pan,o)                     windswept clifftop + grey sea + the stone village sunk in the grass
 *   skara(ctx,t,o)                          inside a Skara Brae house: stone beds, hearth, dresser, wall cell + drain cutaway
 *   village(ctx,t,k,o)                      early farming village, k 0..1 = how crowded it gets
 *   map(ctx,t,name,v)                       painted relief maps: 'southasia' | 'med' | 'west476' | 'usa' (v = {lon,lat,z})
 *   mohenjo(ctx,t,o)                        baked-brick street, bathing platform, covered drain cutaway with a worker
 *   (part 2, sets2.js) rome / forica / castle / medieval / court / kelston / showroom / thames / soho / parliament / sewer */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Paint, P2 = G.Paint2, ES = G.ES, EF = G.EF, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, layer, put, PAD } = P, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => G.Guide.hexMul(h, k);
  const FONT = (w, s) => `${w} ${s}px Fredoka`, DISP = s => `${s}px "Luckiest Guy"`;
  const txt = (g, s, x, y, font, col = OUT, align = 'center') => { g.font = font; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); };

  // ---------- shared texture painters ----------
  function bricks(g, x, y, w, h, o = {}) { const bw = o.bw || 46, bh = o.bh || 20, r = rng(o.seed || 3), base = o.c || '#b8643e';
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.fillStyle = o.mortar || '#8a6a52'; g.fillRect(x, y, w, h);
    for (let row = 0, yy = y; yy < y + h; row++, yy += bh) for (let xx = x - (row % 2) * bw / 2; xx < x + w; xx += bw) { g.fillStyle = mul(base, .86 + r() * .24); g.fillRect(xx + 2, yy + 2, bw - 4, bh - 4); g.fillStyle = 'rgba(255,230,200,.12)'; g.fillRect(xx + 2, yy + 2, bw - 4, 3); }
    g.restore(); }
  function tiles(g, x, y, w, h, o = {}) { const s = o.size || 54, r = rng(o.seed || 5); g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.fillStyle = o.grout || '#c9d6dc'; g.fillRect(x, y, w, h);
    for (let yy = y; yy < y + h; yy += s) for (let xx = x; xx < x + w; xx += s) { g.fillStyle = mul(o.c || '#eaf3f6', .97 + r() * .05); g.fillRect(xx + 2, yy + 2, s - 4, s - 4); g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(xx + 4, yy + 4, s - 8, 4); }
    g.restore(); }
  function slab(g, x, y, w, h, col, seed) { const r = rng(seed); sh(g, col, 3, c => { c.moveTo(x + r() * 6, y + r() * 4); c.lineTo(x + w - r() * 6, y + r() * 4); c.lineTo(x + w - r() * 4, y + h); c.lineTo(x + r() * 4, y + h); c.closePath(); });
    g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x + 6, y + 4, w - 12, 4); g.strokeStyle = 'rgba(60,50,40,.25)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x + 8, y + h * .55); g.lineTo(x + w - 8, y + h * .5); g.stroke(); }
  function stoneCourses(g, x, y, w, h, base, seed) { const r = rng(seed); for (let yy = y; yy < y + h;) { const hh = 14 + r() * 14; for (let xx = x; xx < x + w;) { const ww = 40 + r() * 70; slab(g, xx, yy, Math.min(ww, x + w - xx), hh, mul(base, .82 + r() * .3), seed + xx + yy); xx += ww; } yy += hh; } }

  // =================== 1. modern bathroom ===================
  const bathL = () => layer('t-bath', g => {
    tiles(g, -PAD, 0, W + PAD * 2, 470, { c: '#eef6f7', grout: '#cfdde2', size: 58 });
    g.fillStyle = grad(g, 0, 300, 0, 470, [[0, 'rgba(160,200,210,0)'], [1, 'rgba(120,170,190,.25)']]); g.fillRect(-PAD, 300, W + PAD * 2, 170);
    sh(g, '#5aa0b4', 3, c => c.rect(-PAD, 440, W + PAD * 2, 30));   // tile band
    tiles(g, -PAD, 470, W + PAD * 2, H - 470, { c: '#d8e2e6', grout: '#aab8be', size: 90, seed: 9 });
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, 'rgba(0,30,40,.12)'], [1, 'rgba(0,30,40,0)']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470);
    // window with frosted glass and morning light, a plant on the sill
    sh(g, '#f8fbfc', 5, c => c.rect(150, 70, 260, 250)); g.fillStyle = grad(g, 150, 70, 410, 320, [[0, '#dff2fb'], [1, '#b8dcee']]); g.fillRect(162, 82, 236, 226); ln(g, [[280, 82], [280, 308]], 5); ln(g, [[162, 195], [398, 195]], 5);
    sh(g, '#f2f6f8', 4, c => c.rect(130, 318, 300, 18)); sh(g, '#d07a4a', 3.5, c => { c.moveTo(250, 318); c.lineTo(310, 318); c.lineTo(302, 270); c.lineTo(258, 270); c.closePath(); });
    for (let i = 0; i < 9; i++) { const a = -PI / 2 + (i - 4) * .3; ln(g, [[280, 270], [280 + Math.cos(a) * 60, 270 + Math.sin(a) * 70]], 7, OUT); ln(g, [[280, 270], [280 + Math.cos(a) * 58, 270 + Math.sin(a) * 68]], 4, i % 2 ? '#4e9a4a' : '#6ab45a'); }
    // mirror cabinet, towel rail with towels, a shelf with bottles
    sh(g, '#cfe4ec', 5, c => c.roundRect(860, 70, 230, 170, 12)); g.fillStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.moveTo(880, 90); g.lineTo(940, 90); g.lineTo(890, 200); g.closePath(); g.fill();
    ln(g, [[1110, 300], [1260, 300]], 6, '#9aa6ae'); sh(g, '#f2a65a', 4, c => c.roundRect(1130, 300, 56, 120, 6)); sh(g, '#5aa0b4', 4, c => c.roundRect(1196, 300, 52, 100, 6));
    sh(g, '#f8fbfc', 4, c => c.rect(520, 250, 200, 14)); [[540, '#f2c04a'], [580, '#e86a6a'], [620, '#7ac0e0'], [664, '#9ad07a']].forEach(([x, col], i) => sh(g, col, 3, c => c.roundRect(x, 250 - 40 - i * 4, 26, 40 + i * 4, 6)));
    // light pool from the window
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = 'rgba(255,250,230,.14)'; g.beginPath(); g.moveTo(160, 80); g.lineTo(400, 80); g.lineTo(900, H); g.lineTo(200, H); g.closePath(); g.fill(); g.restore();
  });
  function toilet(ctx, x, y, s = 1, o = {}) {   // front view; y = floor; o.part 'back' (tank) | 'front' (bowl) | both
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const part = o.part || 'all';
    if (part !== 'front') { sh(ctx, '#fbfdfe', 5, c => c.roundRect(-110, -420, 220, 170, 18)); sh(ctx, '#f2f6f8', 4, c => c.roundRect(-118, -432, 236, 22, 8));
      sh(ctx, '#c8d2d8', 3, c => c.roundRect(60, -400, 38, 14, 6)); ctx.fillStyle = 'rgba(160,190,205,.35)'; ctx.fillRect(-100, -300, 200, 40); }
    if (part !== 'back') { sh(ctx, '#fbfdfe', 5, c => { c.moveTo(-60, 0); c.lineTo(60, 0); c.quadraticCurveTo(70, -90, 120, -170); c.lineTo(-120, -170); c.quadraticCurveTo(-70, -90, -60, 0); c.closePath(); });
      sh(ctx, '#f4f8fa', 5, c => c.roundRect(-140, -200, 280, 40, 18)); ctx.fillStyle = 'rgba(150,180,195,.3)'; ctx.fillRect(-60, -150, 30, 140); }
    ctx.restore(); }
  function bathroom(ctx, t, o = {}) { put(ctx, bathL(), o.pan || 0, .3); P.motes(ctx, t, 14, 5); }

  // =================== 2. Orkney clifftop + Skara Brae sunk in the grass ===================
  const orkL = v => layer('t-ork-' + v, g => {
    P2.overcast(g, v === 'storm' ? [[0, '#5e6a78'], [.5, '#8a96a2'], [1, '#c6c8c2']] : [[0, '#7d8ea2'], [.45, '#b2bcc4'], [.75, '#d8d6cc'], [1, '#e6dfc8']], 3, [980, 220]);
    // sea: grey-green with long swells and white caps toward the horizon
    g.fillStyle = grad(g, 0, 300, 0, 470, [[0, '#9aaab0'], [.5, '#6e8a92'], [1, '#4e6e78']]); g.fillRect(-PAD, 300, W + PAD * 2, 170);
    const r = rng(8); for (let i = 0; i < 90; i++) { const x = -PAD + r() * (W + PAD * 2), y = 306 + r() * 150, w = 20 + r() * 60 * (y - 290) / 150; g.strokeStyle = `rgba(240,248,250,${.25 + r() * .3})`; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + w / 2, y - 3, x + w, y); g.stroke(); }
    // far headland
    P.hills(g, 330, [[-PAD, 318], [120, 300], [300, 290], [420, 312], [560, 330]], '#7c8c74', '#6a7a62', 2);
    // the clifftop meadow sweeping down
    sh(g, '#7aa25a', 3, c => { c.moveTo(-PAD, H); c.lineTo(-PAD, 430); c.quadraticCurveTo(300, 410, 640, 440); c.quadraticCurveTo(980, 470, W + PAD, 452); c.lineTo(W + PAD, H); c.closePath(); });
    P2.meadow(g, 440, H, { seed: 12 }); g.fillStyle = grad(g, 0, 430, 0, H, [[0, 'rgba(255,255,230,.15)'], [1, 'rgba(30,50,20,.25)']]); g.fillRect(-PAD, 430, W + PAD * 2, H - 430);
    // the stone village: round-cornered houses dug into the turf, linked by covered passages
    const house = (cx, cy, rw, rh, seed) => { g.save(); g.beginPath(); g.ellipse(cx, cy, rw, rh, 0, 0, TAU); g.clip(); g.fillStyle = '#6a6252'; g.fillRect(cx - rw, cy - rh, rw * 2, rh * 2);
        stoneCourses(g, cx - rw, cy - rh, rw * 2, rh * .9, '#a69a84', seed); g.fillStyle = 'rgba(40,36,28,.45)'; g.fillRect(cx - rw, cy, rw * 2, rh);
        slab(g, cx - rw * .5, cy + rh * .2, rw * .4, rh * .3, '#9a8e78', seed + 1); slab(g, cx + rw * .15, cy + rh * .25, rw * .35, rh * .25, '#a69a84', seed + 2); sh(g, '#8a7a62', 2, c => c.rect(cx - 12, cy + rh * .2, 24, 18)); g.restore();
        g.lineWidth = 10; g.strokeStyle = '#5e8a46'; g.beginPath(); g.ellipse(cx, cy, rw + 4, rh + 4, 0, PI * 1.05, PI * 1.95); g.stroke(); };
    house(380, 560, 150, 58, 21); house(700, 590, 170, 64, 31); house(1010, 560, 140, 54, 41); house(560, 660, 110, 40, 51);
    g.strokeStyle = 'rgba(70,64,52,.8)'; g.lineWidth = 16; g.beginPath(); g.moveTo(520, 570); g.lineTo(560, 600); g.moveTo(860, 590); g.lineTo(890, 570); g.stroke();
    for (const [x, y] of [[180, 520], [1180, 520], [80, 640], [1220, 660]]) EF.tuft(g, x, y, 1.6, '#5e8a3e');
  });
  function orkney(ctx, t, pan = 0, o = {}) { put(ctx, orkL(o.v || 'grey'), pan, .4); P.birds(ctx, t, [[100, 160, 30, 0], [400, 120, 26, 1.4], [700, 180, 34, 2.1]]);
    P.blades(ctx, 40 - pan, 720, 26, 90, t * 1.8, 7); P.blades(ctx, 980 - pan, 720, 22, 80, t * 1.8, 9); if (o.mist !== false) P2.haze && P.motes(ctx, t, 18, 3); }

  // =================== 3. inside a Skara Brae house ===================
  const skaraL = () => layer('t-skara', g => {
    g.fillStyle = '#3a342c'; g.fillRect(-PAD, 0, W + PAD * 2, H);
    stoneCourses(g, -PAD, 40, W + PAD * 2, 480, '#a49880', 61);
    g.fillStyle = grad(g, 0, 0, 0, 200, [[0, 'rgba(20,16,12,.85)'], [1, 'rgba(20,16,12,0)']]); g.fillRect(-PAD, 0, W + PAD * 2, 200);   // turf roof shadow
    // floor of beaten earth + flagstones
    g.fillStyle = grad(g, 0, 500, 0, H, [[0, '#7a6a52'], [1, '#5a4c3a']]); g.fillRect(-PAD, 500, W + PAD * 2, H - 500);
    const r = rng(7); for (let i = 0; i < 14; i++) slab(g, -PAD + r() * (W + PAD * 2), 560 + r() * 140, 80 + r() * 90, 18 + r() * 12, '#8a7c64', 70 + i);
    // stone dresser at the back (two shelves on legs)
    for (const yy of [250, 330, 410]) slab(g, 520, yy, 240, 22, '#b0a48a', yy); for (const xx of [530, 630, 730]) slab(g, xx, 260, 20, 160, '#9a8e76', xx);
    // box beds of upright slabs, left and right
    for (const [x, w] of [[90, 260], [920, 260]]) { slab(g, x, 380, w, 120, '#a89c82', x); slab(g, x - 14, 340, 26, 170, '#9a8e76', x + 1); slab(g, x + w - 12, 340, 26, 170, '#9a8e76', x + 2); g.fillStyle = 'rgba(150,120,70,.6)'; g.fillRect(x + 20, 386, w - 40, 30); }
    // the wall cell (a small doorway in the wall) on the right, with a drain channel running under the floor
    sh(g, '#16120e', 3, c => { c.moveTo(1150, 520); c.lineTo(1150, 330); c.quadraticCurveTo(1200, 300, 1250, 330); c.lineTo(1250, 520); c.closePath(); });
    slab(g, 1136, 300, 130, 28, '#b0a48a', 99);
  });
  function skara(ctx, t, o = {}) { put(ctx, skaraL(), o.pan || 0, .3);
    // central square hearth of edge-set stones with a peat fire
    sh(ctx, '#6a5e4a', 3, c => c.rect(560, 560, 200, 70)); sh(ctx, '#3a2e22', 2, c => c.rect(580, 570, 160, 50)); P2.fire(ctx, 660, 600, .9, t);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, 660, 560, 420, 'rgba(255,150,60,.16)'); ctx.restore();
    if (o.drain) { const k = clamp(o.drain);   // cutaway: the floor peels back to show the drain under the cell
      ctx.save(); ctx.globalAlpha = k; sh(ctx, '#2a241c', 3, c => c.rect(1000, 640, 300, 50)); sh(ctx, '#4a6a7a', 0, c => c.rect(1004, 652, 292, 26));
      for (let i = 0; i < 8; i++) { const x = 1300 - ((t * 60 + i * 40) % 300); ctx.fillStyle = 'rgba(220,240,250,.6)'; ctx.fillRect(x, 662, 18, 4); }
      for (const x of [1000, 1060, 1120, 1180, 1240]) slab(ctx, x, 628, 60, 16, '#8a7c64', x); K().tag(ctx, 'drain', 1150, 710, 1, 0, { size: 22 }); ctx.restore(); }
    P.motes(ctx, t, 26, 4); }
  const K = () => G.VK;

  // =================== 4. the early farming village (k: how crowded) ===================
  function hut(ctx, x, y, s, seed) { const r = rng(seed); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, '#b49a74', 4, c => c.rect(-70, -70, 140, 70)); for (let i = 0; i < 5; i++) ln(ctx, [[-60 + i * 30, -66], [-60 + i * 30, -4]], 2, 'rgba(90,60,30,.3)');
    sh(ctx, mul('#c8a24a', .9 + r() * .15), 4, c => { c.moveTo(-96, -60); c.quadraticCurveTo(0, -190, 96, -60); c.closePath(); });
    ctx.strokeStyle = 'rgba(120,90,30,.4)'; ctx.lineWidth = 2; for (let i = -80; i < 90; i += 14) { ctx.beginPath(); ctx.moveTo(i * .4, -150); ctx.lineTo(i, -64); ctx.stroke(); }
    sh(ctx, '#3a2a1a', 3, c => c.roundRect(-18, -54, 36, 54, 10)); ctx.restore(); }
  const villageL = () => layer('t-village', g => { ES.skyFor(g, 'day'); P.hills(g, 380, [[-PAD, 360], [200, 320], [520, 350], [800, 310], [1100, 340], [W + PAD, 330]], '#9ab87a', '#7a9a5a', 2);
    sh(g, '#8ab25e', 3, c => c.rect(-PAD, 400, W + PAD * 2, H - 400)); P2.meadow(g, 400, H, { seed: 3 });
    for (let i = 0; i < 6; i++) EF.bushMass(g, -PAD + i * 260, 410, 180, 60, 30 + i, .9); });
  function village(ctx, t, k = 0, o = {}) { put(ctx, villageL(), o.pan || 0, .3); P.clouds(ctx, t, 0, [[100, 40, .8, 3, 6], [700, 70, .7, 5, 4]]);
    const spots = [[640, 560], [420, 520], [860, 520], [260, 600], [1040, 600], [540, 470], [760, 470], [140, 520], [1150, 520], [340, 450], [940, 450], [640, 650], [460, 660], [820, 660]], n = Math.round(lerp(3, spots.length, clamp(k)));
    spots.slice(0, n).sort((a, b) => a[1] - b[1]).forEach(([x, y], i) => hut(ctx, x, y, .6 + (y - 450) / 600, 10 + i)); }

  // =================== 5. painted relief maps ===================
  const MAPS = {
    southasia: { box: [58, 37, 82, 13], sea: '#3a7aa6',
      land: [[[58, 37], [82, 37], [82, 13], [74.6, 13], [74, 15.5], [73.4, 17], [72.9, 19], [72.8, 20.5], [72.6, 21.6], [71.5, 20.7], [70, 20.9], [68.9, 22.3], [70.2, 22.6], [69, 22.8], [68.4, 23.6], [67.5, 24], [67, 24.8], [66.5, 25.4], [64, 25.3], [61.6, 25.2], [58, 25.6]]],
      rivers: [[[72.6, 35.6], [71.6, 33.6], [71.1, 32], [70.6, 30], [69.6, 28.4], [68.4, 27.2], [68.2, 25.4], [67.6, 24.2]], [[74.8, 31.6], [73.5, 30.8], [72, 30.2], [71.2, 29.4], [70.6, 29]]],
      ridges: [[70, 34], [80, 36], 160], labels: [['ARABIAN SEA', 63.5, 19, 30, '#cfe6f6'], ['PAKISTAN', 69.5, 30.5, 22], ['INDIA', 77, 24, 22], ['INDUS', 69.4, 26.2, 16, '#2a5a7a']] },
    med: { box: [-11, 49, 42, 27], sea: '#2f6fa4',
      land: [[[-11, 49], [-4.5, 48.4], [-1.2, 46], [-1.8, 43.4], [-8.9, 43.3], [-9.4, 39], [-8.9, 37], [-6, 36.2], [-5.6, 36], [-2, 36.7], [-0.5, 38.3], [0.2, 39.6], [3.2, 41.9], [3, 43.3], [4.8, 43.4], [7.5, 43.8], [8.9, 44.4], [10.2, 43.9], [12.3, 41.7], [14.2, 40.8], [15.6, 40], [15.7, 38], [16.6, 38.4], [17.2, 39.4], [16.9, 40.4], [18.5, 40.1], [16.2, 41.3], [14, 42.3], [12.4, 44.3], [12.3, 45.4], [13.7, 45.6], [15, 44.6], [16.4, 43.5], [18.5, 42.4], [19.5, 41.8], [19.4, 40.3], [20.2, 39.4], [21.1, 38.3], [21.6, 36.8], [22.9, 36.4], [23.1, 37.9], [24, 38], [22.9, 40.6], [24, 40.8], [26, 40.8], [26.4, 40.1], [26.2, 39.3], [27.2, 37.9], [28, 36.8], [30.6, 36.8], [32.5, 36.1], [34.6, 36.8], [36.2, 36.6], [35.9, 35.4], [35.9, 34.5], [35.1, 33.1], [34.5, 31.5], [42, 31.5], [42, 49]],
        [[-11, 27], [-9.8, 30.4], [-6.8, 34], [-5.9, 35.8], [-2, 35.1], [1, 36.5], [5, 36.8], [9.8, 37.3], [11.1, 36.9], [10.5, 35.4], [10.1, 34.2], [11.2, 33.2], [13.2, 32.9], [15.4, 32.3], [19.2, 30.3], [20.1, 31.2], [20.9, 32.7], [23, 32.6], [25.2, 31.6], [29.9, 31.2], [32.3, 31.3], [34.5, 31.5], [42, 31.5], [42, 27]],
        [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7], [12.5, 37.6]], [[8.4, 41.1], [9.8, 41], [9.6, 39.1], [8.4, 39], [8.2, 40.6]], [[9.4, 43], [9.5, 42], [9.2, 41.4], [8.6, 41.9], [8.7, 42.6]],
        [[23.5, 35.6], [26.3, 35.3], [26, 35], [23.6, 35.2]], [[32.3, 35.1], [34.6, 35.7], [33.9, 34.6], [32.5, 34.7]]],
      seas: [[[27.5, 42.5], [29, 41.2], [31, 41.1], [33, 42], [35, 42], [38, 41], [41.5, 41.5], [41.6, 42.8], [39, 44.5], [37.5, 45.2], [36.5, 45.4], [33.5, 44.5], [32.5, 45.3], [33.5, 46], [31.8, 46.6], [30.5, 46.3], [29.7, 45.2], [28.6, 44.2]]],
      rivers: [[[13.4, 42.6], [12.9, 42.2], [12.3, 41.75]]],
      labels: [['MEDITERRANEAN SEA', 18, 34.3, 26, '#cfe6f6'], ['ITALY', 14.5, 42.6, 18], ['GAUL', 2.5, 46.5, 18], ['HISPANIA', -4, 40, 18], ['AFRICA', 6, 30, 18], ['GREECE', 22, 39.2, 16]] },
    usa: { box: [-93, 47, -66, 37], sea: '#2f6fa4',
      land: [[[-93, 47], [-66, 47], [-67, 44.8], [-70.2, 43.6], [-70.6, 42.6], [-70, 41.8], [-71.4, 41.4], [-73.8, 40.7], [-74.1, 40.4], [-74.1, 39.6], [-75.1, 38.8], [-75.6, 37], [-76, 37], [-93, 37]]],
      seas: [[[-87.8, 41.6], [-87.5, 42.5], [-87.9, 43.4], [-87.6, 44.3], [-86.3, 45.8], [-85, 45.8], [-86.4, 44.2], [-86.2, 42.5], [-86.9, 41.7]], [[-83.5, 41.7], [-81.6, 41.5], [-79.8, 42.1], [-78.9, 42.9], [-80.4, 42.6], [-82.6, 42.0]],
        [[-79.8, 43.3], [-76.4, 43.4], [-76.2, 44.1], [-77.8, 43.9], [-79.4, 43.7]], [[-84.6, 45.8], [-82.5, 43], [-81.7, 44.5], [-83.4, 45.9]]], rivers: [], labels: [] },
  };
  const mapCache = {};
  function mapCv(name) { if (mapCache[name]) return mapCache[name]; const M = MAPS[name], [lo0, la0, lo1, la1] = M.box, SC = 1600 / (lo1 - lo0), mw = 1600, mh = Math.round((la0 - la1) * SC * 1.12);
    const c = document.createElement('canvas'); c.width = mw; c.height = mh; const g = c.getContext('2d'), px = (lo, la) => [(lo - lo0) * SC, (la0 - la) * SC * 1.12];
    const poly = (pts, path = new Path2D()) => { pts.forEach((p, i) => { const [x, y] = px(...p); i ? path.lineTo(x, y) : path.moveTo(x, y); }); path.closePath(); return path; };
    g.fillStyle = grad(g, 0, 0, mw, mh, [[0, M.sea], [1, mul(M.sea, .8)]]); g.fillRect(0, 0, mw, mh);
    const land = new Path2D(); M.land.forEach(p => poly(p, land)); const seas = new Path2D(); (M.seas || []).forEach(p => poly(p, seas));
    g.save(); g.filter = 'blur(10px)'; g.lineWidth = 30; g.strokeStyle = 'rgba(110,200,210,.55)'; g.stroke(land); g.restore();
    g.fillStyle = '#e2c890'; g.fill(land); g.save(); g.clip(land); P2.grain(g, 0, 0, mw, mh, .35, 5, 'multiply', 2);
    g.fillStyle = 'rgba(110,150,70,.28)'; for (let i = 0; i < 40; i++) { const r = rng(i + 3); g.beginPath(); g.ellipse(r() * mw, r() * mh, 80 + r() * 160, 40 + r() * 70, r() * 3, 0, TAU); g.fill(); }
    if (M.ridges) { const [[a0, b0], [a1, b1], n] = M.ridges, rr = rng(5); g.save(); g.filter = 'blur(2px)'; for (let i = 0; i < n; i++) { const [x, y] = px(lerp(a0, a1, rr()), lerp(b0, b1, rr())); g.fillStyle = 'rgba(110,70,40,.22)'; g.beginPath(); g.ellipse(x + 4, y + 3, 26, 9, -.3, 0, TAU); g.fill(); g.fillStyle = 'rgba(255,245,225,.3)'; g.beginPath(); g.ellipse(x - 3, y - 3, 18, 5, -.3, 0, TAU); g.fill(); } g.restore(); }
    g.restore(); g.fillStyle = M.sea; g.fill(seas); g.lineWidth = 3; g.strokeStyle = 'rgba(60,40,20,.8)'; g.stroke(land); g.stroke(seas);
    for (const rv of M.rivers) { g.beginPath(); rv.forEach((p, i) => { const [x, y] = px(...p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = 10; g.strokeStyle = 'rgba(80,130,60,.6)'; g.stroke(); g.lineWidth = 5; g.strokeStyle = '#4f86a0'; g.stroke(); }
    for (const [s, lo, la, sz, col] of M.labels) { const [x, y] = px(lo, la); g.font = DISP(sz); g.textAlign = 'center'; g.fillStyle = col || 'rgba(90,64,38,.55)'; g.fillText(s, x, y); }
    return (mapCache[name] = { c, px, mw, mh }); }
  // draw a map centred on v.lon/v.lat with zoom v.z (map px per screen px)
  function map(ctx, t, name, v) { const M = mapCv(name), [fx, fy] = M.px(v.lon, v.lat); ctx.save(); ctx.fillStyle = MAPS[name].sea; ctx.fillRect(0, 0, W, H); ctx.drawImage(M.c, 640 - fx * v.z, 360 - fy * v.z, M.mw * v.z, M.mh * v.z); ctx.restore(); }
  const mapPt = (name, v, lo, la) => { const M = mapCv(name), [x, y] = M.px(lo, la), [fx, fy] = M.px(v.lon, v.lat); return [640 + (x - fx) * v.z, 360 + (y - fy) * v.z]; };
  function pin(ctx, name, v, lo, la, label, k = 1, o = {}) { if (k <= 0) return; const [x, y] = mapPt(name, v, lo, la), s = G.FX.settle(clamp(k));
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sh(ctx, o.col || '#d8402a', 3, c => { c.moveTo(0, 0); c.bezierCurveTo(-26, -34, -18, -58, 0, -58); c.bezierCurveTo(18, -58, 26, -34, 0, 0); }); sh(ctx, '#fff', 0, circ(0, -40, 7));
    if (label) G.EK.scroll(ctx, label, 0, -88, 1, { size: o.size || 24 }); ctx.restore(); }

  // =================== 6. Mohenjo-daro: baked-brick street + covered drain cutaway ===================
  const mohL = () => layer('t-moh', g => { ES.skyFor(g, 'gold'); P.hills(g, 300, [[-PAD, 290], [400, 270], [900, 285], [W + PAD, 275]], '#d8b48a', '#c09a70', 2);
    // the citadel mound + stupa-like silhouette far away
    sh(g, '#c99a6a', 3, c => { c.moveTo(780, 300); c.lineTo(820, 230); c.lineTo(1120, 230); c.lineTo(1160, 300); c.closePath(); }); bricks(g, 822, 232, 296, 66, { c: '#c47a4a', bw: 24, bh: 10, seed: 3 });
    // houses: plain brick walls with few windows, flat roofs with timber beams
    for (const [x, w, h, seed] of [[-PAD, 420, 260, 1], [400, 300, 230, 2], [880, 520, 250, 3]]) { bricks(g, x, 470 - h, w, h, { c: '#c47a4a', seed }); sh(g, null, 4, c => c.rect(x, 470 - h, w, h));
      for (let i = 0; i < w / 60; i++) sh(g, '#7a4a2a', 2.5, c => c.rect(x + 10 + i * 60, 462 - h, 16, 14)); }
    sh(g, '#2a1a10', 3, c => c.roundRect(560, 330, 70, 140, 6)); // doorway with a bathing platform visible
    sh(g, '#d8a070', 3, c => c.rect(570, 430, 50, 30));
    // the street (brick paving) and a covered drain down its side, partly cut away
    g.fillStyle = grad(g, 0, 470, 0, H, [[0, '#d8b080'], [1, '#b88a5a']]); g.fillRect(-PAD, 470, W + PAD * 2, H - 470); bricks(g, -PAD, 520, W + PAD * 2, 60, { c: '#b86a3e', bw: 60, bh: 20, seed: 9 });
    sh(g, '#3a2a20', 3, c => c.rect(-PAD, 580, W + PAD * 2, 80)); g.fillStyle = grad(g, 0, 600, 0, 660, [[0, '#7a8a78'], [1, '#4e6a6a']]); g.fillRect(-PAD, 610, W + PAD * 2, 40);
    bricks(g, -PAD, 660, W + PAD * 2, 60, { c: '#a85e36', bw: 50, bh: 18, seed: 12 });
    for (let x = -PAD; x < W + PAD; x += 90) slab(g, x, 572, 80, 16, '#c88a5a', x);   // cover bricks
  });
  function mohenjo(ctx, t, o = {}) { put(ctx, mohL(), o.pan || 0, .3);
    for (let i = 0; i < 12; i++) { const x = ((t * 50 + i * 120) % (W + 100)) - 50; ctx.fillStyle = 'rgba(220,235,230,.5)'; ctx.fillRect(x, 624, 26, 4); }   // flow in the drain
    if (o.worker !== false) { sh(ctx, '#1e140c', 3, c => c.ellipse(900, 576, 46, 12, 0, 0, TAU)); }
    P.motes(ctx, t, 22, 7); }

  G.TS = { bricks, tiles, slab, stoneCourses, toilet, bathroom, orkney, skara, village, hut, map, mapPt, pin, mohenjo, MAPS, txt, FONT, DISP };
})(window);
