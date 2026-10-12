/* New York — helpers shared by the parts: the obituary notice + counter, framed images, sailing ships, maps from lon/lat,
 * and period figures built on G.NYC.walker. Loaded after corner.js. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, lerp, ease, clamp, glow } = T;
  const INK = FX.INK, RED = '#c8322a', PAPER = '#f1ead8', GOLD = '#f6c945';
  const txt = (ctx, s, x, y, font, color = INK, align = 'center') => { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  const slam = (k, d = .09) => k <= 0 ? 0 : k < d ? lerp(1.3, 1, ease.in(k / d)) : 1 + FX.ring(k - d, -.02, 4, 14);

  // the black-bordered obituary notice with its running count
  function notice(ctx, x, y, k, count) { if (k <= 0) return; const s = slam(k); ctx.save(); ctx.translate(x, y); ctx.rotate(-.02); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-330, -150, 680, 320)); shape(ctx, '#fbf6ea', 5, rect(-340, -160, 680, 320, 4)); ctx.lineWidth = 10; ctx.strokeStyle = '#1d1a17'; ctx.strokeRect(-322, -142, 644, 284);
    txt(ctx, 'OBITUARY', 0, -96, FX.FONT(700, 22), '#5a5048'); txt(ctx, 'NEW YORK', 0, -36, FX.DISPLAY(66)); txt(ctx, 'IS FINISHED.', 0, 34, FX.DISPLAY(56), RED); line(ctx, [[-200, 84], [200, 84]], 3, '#9a8a7a');
    if (count != null) { shape(ctx, '#1d1a17', 0, rect(130, 98, 190, 52, 6)); txt(ctx, 'COUNT: ' + count, 225, 125, FX.DISPLAY(28), GOLD); }
    ctx.restore(); }
  // a full obituary shot: dark room, the notice slams, the count ticks from n-1 to n
  function obituaryShot(ctx, lt, t, n, kSlam, kCount, era) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#2a2420'], [1, '#14100e']]), 0, rect(0, 0, W, H)); glow(ctx, 640, 360, 420, 'rgba(255,220,160,.25)');
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.translate(160 + i * 240, 600 + (i % 2) * 40); ctx.rotate((i - 2) * .1); shape(ctx, '#f4ead4', 2, rect(-90, -60, 180, 120, 3)); ctx.restore(); }
    notice(ctx, 640, 330, kSlam, kCount > 0 ? n : n - 1);
    if (era) txt(ctx, era, 640, 560, FX.DISPLAY(30), '#d8c8a8');
    if (kCount > 0) { const s = slam(kCount); ctx.save(); ctx.translate(640, 640); ctx.scale(s, s); txt(ctx, ['', 'THAT\'S ONE.', 'THAT\'S TWO.', 'THAT\'S THREE.', 'THAT\'S FOUR.'][n] || '', 0, 0, FX.DISPLAY(44), GOLD); ctx.restore(); }
    FX.vignette(ctx, 640, 380, .25); }
  function frame(ctx, im, x, y, w, h, k, label) { if (k <= 0 || !im) return; const e = FX.settle(clamp(k / .5)); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); ctx.rotate(-.015);
    shape(ctx, 'rgba(0,0,0,.35)', 0, rect(-w / 2 + 10, -h / 2 + 12, w + 24, h + 24)); shape(ctx, '#8a5a2a', 5, rect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, 4)); shape(ctx, '#c89a5a', 3, rect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8));
    ctx.drawImage(im, -w / 2, -h / 2, w, h); if (label) { shape(ctx, PAPER, 3, rect(-190, h / 2 + 22, 380, 34, 3)); txt(ctx, label, 0, h / 2 + 40, FX.FONT(700, 15)); } ctx.restore(); }
  // a sailing ship; flag 'nl' | 'en' | 'us' | 'red' (British red ensign)
  function ship(ctx, x, y, s, t, flag) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4 + x) * 3); ctx.scale(s, s);
    shape(ctx, '#7a4a2a', 4, c => { c.moveTo(-130, -40); c.lineTo(130, -40); c.lineTo(150, -70); c.lineTo(110, 10); c.lineTo(-100, 10); c.lineTo(-150, -60); c.closePath(); }); line(ctx, [[-120, -26], [120, -26]], 4, '#e8c860');
    for (let i = 0; i < 5; i++) shape(ctx, '#1d1a17', 0, rect(-90 + i * 40, -20, 14, 10));
    for (const [mx, mh] of [[-60, 200], [10, 240], [80, 180]]) { line(ctx, [[mx, -40], [mx, -40 - mh]], 6, '#5a3a20'); for (let k = 0; k < 2; k++) shape(ctx, '#f4efe2', 3, c => { const y0 = -40 - mh + 20 + k * mh * .45, w = 52 - k * 6; c.moveTo(mx - w, y0); c.quadraticCurveTo(mx, y0 - 10, mx + w, y0); c.quadraticCurveTo(mx + w * .9, y0 + mh * .35, mx + w, y0 + mh * .38); c.quadraticCurveTo(mx, y0 + mh * .32, mx - w, y0 + mh * .38); c.closePath(); }); }
    ctx.translate(10, -290); line(ctx, [[0, 0], [0, 10]], 3); const w = Math.sin(t * 4) * 4;
    if (flag === 'en') { shape(ctx, '#fff', 2.5, poly([[0, 0], [60, w], [60, 36 + w], [0, 36]])); shape(ctx, RED, 0, rect(26, 2 + w * .5, 8, 32)); shape(ctx, RED, 0, rect(2, 14 + w * .5, 56, 8)); }
    else if (flag === 'red') { shape(ctx, RED, 2.5, poly([[0, 0], [60, w], [60, 36 + w], [0, 36]])); shape(ctx, '#2a3a7a', 0, rect(0, 0, 26, 18)); line(ctx, [[0, 0], [26, 18]], 3, '#fff'); line(ctx, [[26, 0], [0, 18]], 3, '#fff'); }
    else if (flag === 'us') { for (let i = 0; i < 6; i++) shape(ctx, i % 2 ? '#fff' : RED, 0, poly([[0, i * 6], [60, i * 6 + w], [60, i * 6 + 6 + w], [0, i * 6 + 6]])); shape(ctx, '#2a3a7a', 0, rect(0, 0, 24, 18)); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.strokeRect(0, 0, 60, 36); }
    else { for (let i = 0; i < 3; i++) shape(ctx, ['#e8742a', '#f4efe6', '#2f4a8a'][i], 0, poly([[0, i * 12], [60, i * 12 + w], [60, i * 12 + 12 + w], [0, i * 12 + 12]])); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.strokeRect(0, 0, 60, 36); }
    ctx.restore(); }
  function steamer(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.2 + x) * 2); ctx.scale(s, s); shape(ctx, '#2a2a30', 4, poly([[-180, -30], [180, -30], [150, 14], [-150, 14]])); shape(ctx, '#f4efe2', 3.5, rect(-120, -70, 220, 40)); for (let i = 0; i < 8; i++) shape(ctx, '#3a5a7a', 0, circle(-100 + i * 26, -50, 6));
    for (const fx of [-50, 30]) { shape(ctx, '#c8322a', 3, rect(fx - 14, -130, 28, 60)); shape(ctx, '#1d1a17', 0, rect(fx - 14, -130, 28, 10)); for (let j = 0; j < 3; j++) { const q = (t * .5 + j / 3) % 1; ctx.save(); ctx.globalAlpha = .4 * (1 - q); shape(ctx, '#8a8a90', 0, circle(fx - q * 60, -140 - q * 70, 14 + q * 18)); ctx.restore(); } } ctx.restore(); }

  // maps: Manhattan along its axis (RL) and the New York region (PP)
  const MAN = [[-74.018, 40.700], [-74.0, 40.703], [-73.976, 40.711], [-73.972, 40.73], [-73.972, 40.75], [-73.958, 40.762], [-73.942, 40.776], [-73.929, 40.797], [-73.934, 40.81], [-73.934, 40.835], [-73.927, 40.85], [-73.912, 40.873],
    [-73.92, 40.879], [-73.93, 40.875], [-73.946, 40.851], [-73.959, 40.83], [-73.97, 40.81], [-73.989, 40.785], [-74.009, 40.756], [-74.012, 40.73], [-74.016, 40.712]];
  const RL = ([lon, lat]) => { const dx = (lon + 73.968) * 84.3, dy = (lat - 40.787) * 111, a = 29 * Math.PI / 180, u = dx * Math.sin(a) + dy * Math.cos(a), v = dx * Math.cos(a) - dy * Math.sin(a); return [640 + u * 52, 400 + v * 52]; };

  // period figures on the modern walker body
  const W_ = (o) => (ctx, x, y, s, t, v, more = {}) => N.walker(ctx, x, y, s, t, v, Object.assign({}, o(v), more));
  const redcoat = W_(v => ({ plain: true, coat: '#b8322a', pants: '#f4efe2', shoe: '#1d1a17', tricorn: true, hs: 0, hair: '#e8e4dc', sash: '#f4efe2' }));
  const patriot = W_(v => ({ plain: true, coat: '#2f4a8a', pants: '#e8d8b0', shoe: '#1d1a17', tricorn: true, hs: 0, hair: '#e8e4dc' }));
  const colonist = W_(v => ({ plain: true, coat: ['#6a4a2a', '#3a4a5a', '#7a3a3a', '#4a5a3a'][v % 4], pants: '#5a4a3a', shoe: '#1d1a17', tricorn: v % 2 === 0, hs: v % 2 ? 1 : 0 }));
  const merchant1835 = W_(v => ({ plain: true, coat: ['#1d1a17', '#2f3a4a', '#4a3a2a'][v % 3], pants: '#3a3a40', shoe: '#1d1a17', tallhat: v % 2 === 0, hs: 0 }));
  const fireman = W_(v => ({ plain: true, coat: '#c8322a', pants: '#2a2a30', shoe: '#1d1a17', firehat: true, hs: 0 }));
  const immigrant = W_(v => ({ plain: true, coat: ['#5a4a3a', '#3a4a5a', '#6a3a3a', '#4a5a4a', '#8a7a5a'][v % 5], pants: '#3a3a40', shoe: '#3a2a20', cap1900: v % 3 === 0, shawl: v % 3 === 1 ? ['#8a3a3a', '#3a5a8a', '#5a7a3a'][v % 3] : null, hs: v % 3 === 1 ? 1 : 0 }));

  G.NYC = Object.assign(G.NYC || {}, { notice, obituaryShot, frame, ship, steamer, MAN, RL, redcoat, patriot, colonist, merchant1835, fireman, immigrant });
})(window);
