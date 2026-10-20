/* The Maya — shared sets and cast (loaded after nyc/js/corner.js for walker/person).
 * castillo(): El Castillo at Chichén Itzá, front view (9 terraces, north stair, serpent heads, temple on top).
 * plaza(): the fixed camera of the series — the pyramid across the grass, jungle behind, sky by time of day
 *   (tod: 0 night · 1 dawn · 2 morning), crowd band, torches. vendor(): the water seller in a huipil.
 * mayaMap(): southern Mexico / Guatemala / Belize / Honduras traced from lon/lat, borders labelled "today". */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, N = G.NYC;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, lerp, ease, clamp, glow } = T;
  const INK = FX.INK;
  const mix = (a, b, k) => { const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
    return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(k))).toString(16).padStart(2, '0')).join(''); };
  // sky stops by time of day: night → dawn → morning
  const SKY = [['#141a3e', '#3a2f6a', '#6a4a8a'], ['#3a5a9a', '#e88a6a', '#ffd08a'], ['#6ab8e8', '#a8dcf0', '#fbecc8']];
  const skyAt = (tod, i) => tod <= 1 ? mix(SKY[0][i], SKY[1][i], tod) : mix(SKY[1][i], SKY[2][i], tod - 1);

  function sky(ctx, t, tod, hy = 470) {
    shape(ctx, grad(ctx, 0, -300, 0, hy, [[0, skyAt(tod, 0)], [.6, skyAt(tod, 1)], [1, skyAt(tod, 2)]]), 0, rect(-600, -400, 2600, hy + 700));
    const night = clamp(1 - tod);
    if (night > 0) { ctx.save(); ctx.globalAlpha = night; for (let i = 0; i < 90; i++) { const x = (i * 337) % 2400 - 560, y = -200 + (i * 211) % 560, tw = .6 + .4 * Math.sin(t * 2 + i);
        shape(ctx, '#fff8e0', 0, circle(x, y, (i % 5 === 0 ? 2.6 : 1.5) * tw)); }
      glow(ctx, 1080, 90, 120, 'rgba(255,250,220,.35)'); shape(ctx, '#fbf6e0', 3, circle(1080, 90, 34)); shape(ctx, skyAt(tod, 0), 0, circle(1094, 82, 30)); ctx.restore(); }
    if (tod > .4 && tod < 1.8) { const k = Math.sin(Math.PI * clamp((tod - .4) / 1.4)); glow(ctx, 640, hy - 10, 520, `rgba(255,200,120,${.55 * k})`); }
    if (tod > .8) { const k = clamp((tod - .8) / .6); ctx.save(); ctx.globalAlpha = k * .9; for (let i = 0; i < 5; i++) { const x = ((i * 330 + t * 10) % 1900) - 300, y = 70 + (i % 3) * 40, w = 140 + (i % 2) * 70;
        shape(ctx, '#fff8ee', 3, smooth([[x - w / 2, y], [x - w / 4, y - w * .2], [x + w / 8, y - w * .28], [x + w / 2, y - w * .1], [x + w / 2 + 10, y + 6], [x, y + 12]])); } ctx.restore(); }
  }

  // jungle canopy band behind the plaza
  function jungle(ctx, y, tod, t) {
    const far = mix('#1e2a3a', '#4a7a5a', clamp(tod - .3)), near = mix('#16221e', '#3a6a3a', clamp(tod - .3));
    shape(ctx, far, 0, c => { c.moveTo(-600, y + 20); for (let x = -600; x <= 2200; x += 60) c.quadraticCurveTo(x + 30, y - 30 - ((x * 7) % 40), x + 60, y + ((x * 3) % 20) - 4); c.lineTo(2200, y + 200); c.lineTo(-600, y + 200); c.closePath(); });
    shape(ctx, near, 3, c => { c.moveTo(-600, y + 40); for (let x = -600; x <= 2200; x += 90) c.quadraticCurveTo(x + 45, y - 10 - ((x * 11) % 36), x + 90, y + 30); c.lineTo(2200, y + 200); c.lineTo(-600, y + 200); c.closePath(); });
  }

  // El Castillo front view. x = centre, y = base line, s = scale (s = 1 → 620 px wide, 360 px tall to the temple roof)
  function castillo(ctx, x, y, s, o = {}) {
    const tod = o.tod ?? 2, lit = clamp(1 - tod), stone = mix('#6a6488', '#d8cfb0', clamp(tod - .2)), dark = mix('#3a3658', '#a89c80', clamp(tod - .2)), hi = mix('#7a7498', '#ece4c8', clamp(tod - .2));
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, 'rgba(0,0,0,.18)', 0, ellipse(0, 6, 360, 22));
    const n = 9, H0 = 270, w0 = 310, w1 = 118, th = H0 / n;
    for (let i = 0; i < n; i++) { const y0 = -i * th, y1 = y0 - th, wa = lerp(w0, w1, i / n), wb = lerp(w0, w1, (i + .82) / n);
      shape(ctx, stone, 3.5, poly([[-wa, y0], [wa, y0], [wb, y1 + 4], [-wb, y1 + 4]]));
      shape(ctx, dark, 0, rect(-wb, y1 + 4, wb * 2, 5));
      for (let j = -6; j <= 6; j++) { const px = j * wa / 6.6; if (Math.abs(px) < 70) continue; shape(ctx, dark, 0, rect(px - wa / 16, y0 - th * .72, wa / 9, th * .42)); } // panels
      line(ctx, [[-wa, y0], [wa, y0]], 2, 'rgba(0,0,0,.25)'); }
    // the north stair with balustrades, serpent heads at the foot
    shape(ctx, hi, 3.5, poly([[-62, 0], [62, 0], [40, -H0], [-40, -H0]]));
    for (let k = 0; k < 30; k++) { const yy = -k * H0 / 30, ww = lerp(62, 40, k / 30); line(ctx, [[-ww, yy], [ww, yy]], 1.6, 'rgba(60,50,40,.35)'); }
    for (const d of [-1, 1]) { shape(ctx, stone, 3.5, poly([[d * 62, 0], [d * 80, 0], [d * 54, -H0], [d * 40, -H0]]));
      ctx.save(); ctx.translate(d * 78, -6); ctx.scale(d, 1); shape(ctx, dark, 3.5, smooth([[-20, 8], [-22, -26], [0, -38], [30, -30], [40, -10], [30, 8]])); shape(ctx, '#f4efe0', 2, poly([[14, -8], [20, 2], [26, -8]])); shape(ctx, INK, 0, circle(6, -20, 4)); ctx.restore(); }
    // temple on top
    const ty = -H0;
    shape(ctx, stone, 3.5, rect(-104, ty - 74, 208, 74)); shape(ctx, dark, 3.5, rect(-112, ty - 92, 224, 20)); shape(ctx, hi, 3, rect(-96, ty - 104, 192, 14));
    for (const dx of [-62, 0, 62]) { const glowDoor = lit > .1 && o.doorGlow; shape(ctx, glowDoor ? '#f0a050' : '#2a2430', 3, rect(dx - 17, ty - 60, 34, 60)); if (dx === 0) for (const cx of [-8, 8]) shape(ctx, stone, 2.5, rect(cx - 4, ty - 60, 8, 60)); }
    // warm uplight from torches and phones at night
    if (lit > 0 && o.uplight !== false) { ctx.globalCompositeOperation = 'lighter'; shape(ctx, grad(ctx, 0, 0, 0, -H0, [[0, `rgba(255,150,60,${.32 * lit})`], [1, 'rgba(255,150,60,0)']]), 0, poly([[-w0, 0], [w0, 0], [w1, -H0], [-w1, -H0]])); ctx.globalCompositeOperation = 'source-over'; }
    ctx.restore();
  }

  function torch(ctx, x, y, s, t, ph = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [[0, 0], [0, -150]], 9, '#4a3020'); shape(ctx, '#6a4a2a', 3, poly([[-14, -150], [14, -150], [10, -170], [-10, -170]]));
    const f = Math.sin(t * 9 + ph) * .5 + Math.sin(t * 13.7 + ph * 2) * .5; glow(ctx, 0, -190, 120, 'rgba(255,170,70,.45)');
    shape(ctx, '#ff8a2a', 2.5, c => { c.moveTo(-14, -170); c.quadraticCurveTo(-18 + f * 3, -200, f * 6, -232 - f * 4); c.quadraticCurveTo(18 + f * 3, -200, 14, -170); c.closePath(); });
    shape(ctx, '#ffe07a', 0, c => { c.moveTo(-7, -172); c.quadraticCurveTo(-8, -192, f * 3, -208); c.quadraticCurveTo(8, -192, 7, -172); c.closePath(); }); ctx.restore(); }

  // a band of small far people; lights = phones / candles / glow sticks at night
  function crowdBand(ctx, y, t, o = {}) { const n = o.n || 44, x0 = o.x0 ?? -200, x1 = o.x1 ?? 1480, s = o.s || 1.2, night = o.night ?? 0, thin = o.thin || 0;
    for (let row = 0; row < 3; row++) for (let i = 0; i < n; i++) { if (((i * 7 + row * 3) % 10) / 10 < thin) continue;
      const x = x0 + (i + (row % 2) * .5) / n * (x1 - x0) + (o.drift ? ((t * o.drift * (1 + (i % 3) * .2)) % 200) : 0), yy = y + row * 22, v = i * 3 + row;
      const col = ['#c8322a', '#2f4a7a', '#e8a83a', '#3a8a5a', '#7a4a8a', '#f4efe6', '#e86a4a', '#4a8ac8'][v % 8];
      N.person(ctx, x, yy, s * (1 + row * .12), night > .5 ? mix(col, '#2a2a40', .55) : col, { v, step: o.drift ? Math.sin(t * 6 + i) : 0 });
      if (night > 0 && (v % 3 === 0)) { const lx = x + 10 * s, ly = yy - 80 * s * (1 + row * .12); glow(ctx, lx, ly, 26, `rgba(255,${v % 2 ? 230 : 190},${v % 2 ? 160 : 90},${.6 * night})`); shape(ctx, v % 2 ? '#fff6d0' : '#ffd070', 0, circle(lx, ly, 3.2)); }
      if (night > 0 && v % 11 === 4) { line(ctx, [[x - 6, yy - 70 * s], [x - 14, yy - 100 * s]], 5, `rgba(120,255,160,${night})`); } } }

  // the plaza: one fixed camera on El Castillo for the whole series
  function plaza(ctx, t, o = {}) { const tod = o.tod ?? 2, hy = 470;
    sky(ctx, t, tod, hy); jungle(ctx, hy - 40, tod, t);
    shape(ctx, mix('#1e2a24', '#7aa858', clamp(tod - .3)), 0, rect(-600, hy, 2600, 600));
    for (let i = 0; i < 9; i++) line(ctx, [[-600, hy + 20 + i * 30], [2200, hy + 20 + i * 30]], 2, `rgba(255,255,255,${.04 + i * .005})`);
    castillo(ctx, 640, hy + 6, o.cs || .92, { tod, doorGlow: o.doorGlow });
    if (o.torches !== false && tod < 1.6) { const k = clamp(1.6 - tod); ctx.save(); ctx.globalAlpha = k; for (const [x, y, s] of [[200, 520, .7], [1080, 520, .7], [40, 600, .9], [1240, 600, .9]]) torch(ctx, x, y, s, t, x); ctx.restore(); }
    if (o.crowd !== false) crowdBand(ctx, 520, t, { night: clamp(1 - tod), thin: o.thin || 0, drift: o.drift, n: o.n });
  }

  // the water seller: white huipil with a flower-embroidered square yoke and hem, hair in a bun with a ribbon
  const FLOW = ['#e8423a', '#f6a828', '#d84a8a', '#3a8ad8', '#f4d23a'];
  function flowers(ctx, x0, x1, y, n, r = 6) { for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + .5) / n); for (let p = 0; p < 5; p++) shape(ctx, FLOW[(i + p) % 5], 1.5, circle(x + Math.cos(p * 1.26) * r * .7, y + Math.sin(p * 1.26) * r * .7, r * .55)); shape(ctx, '#f6d23a', 1, circle(x, y, r * .35));
    shape(ctx, '#3a8a3a', 1.2, ellipse(x + r * 1.1, y + r * .3, r * .7, r * .3, .4)); } }
  function vendor(ctx, x, y, s, t, o = {}) {
    N.walker(ctx, x, y, s, t, o.v ?? 1, { plain: true, still: !o.walk, coat: '#fbf8f0', pants: '#fbf8f0', skin: o.skin || '#b07848', hair: '#1d1a17', hs: 2, flip: o.flip, reach: o.reach, shoe: '#c8a878' });
    ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    shape(ctx, '#fbf8f0', 4, poly([[-38, -132], [38, -132], [46, -6], [-46, -6]])); // the long fustán skirt over the legs
    flowers(ctx, -40, 40, -24, 6, 7); line(ctx, [[-44, -12], [44, -12]], 3, '#e8423a');
    shape(ctx, '#fbf8f0', 0, rect(-34, -246, 68, 50)); ctx.lineWidth = 2.5; ctx.strokeStyle = '#e8423a'; ctx.strokeRect(-30, -250, 60, 50); flowers(ctx, -26, 26, -228, 4, 7);
    flowers(ctx, -34, 34, -134, 5, 6);
    shape(ctx, o.ribbon || '#e8423a', 2.5, poly([[-6, -352], [-24, -362], [-22, -342]])); shape(ctx, o.ribbon || '#e8423a', 2.5, poly([[6, -352], [24, -362], [22, -342]]));
    // her face: warm eyes with lashes, soft brows, blush, a big smile; gold hoops and flowers in her hair
    const sk = o.skin || '#b07848', bob = o.walk ? -Math.abs(Math.cos(t * 6.5 + (o.v ?? 1) * 1.7)) * 5 : 0; ctx.translate(0, bob);
    shape(ctx, sk, 0, ellipse(0, -289, 31, 23));
    for (const d of [-1, 1]) { shape(ctx, '#fff', 0, ellipse(d * 13, -297, 9, 9)); ctx.save(); ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(60,30,20,.7)'; ctx.beginPath(); ctx.ellipse(d * 13, -297, 9, 9, 0, Math.PI * .15, Math.PI * .85); ctx.stroke(); ctx.restore(); shape(ctx, '#4a2a18', 0, circle(d * 13 + (o.look ?? 0), -297, 6.5)); shape(ctx, INK, 0, circle(d * 13 + (o.look ?? 0), -297, 3.2)); shape(ctx, '#fff', 0, circle(d * 13 + (o.look ?? 0) + 2.5, -300, 2)); shape(ctx, '#fff', 0, circle(d * 13 + (o.look ?? 0) - 2, -294, 1));
      ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.ellipse(d * 13, -298, 10, 11, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(d * 21, -304); ctx.lineTo(d * 27, -309); ctx.moveTo(d * 18, -308); ctx.lineTo(d * 22, -314); ctx.stroke();
      ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(d * 6, -315); ctx.quadraticCurveTo(d * 14, -320, d * 22, -315); ctx.stroke(); ctx.restore();
      shape(ctx, 'rgba(240,100,110,.45)', 0, ellipse(d * 22, -282, 8, 5));
      ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#e8b830'; ctx.beginPath(); ctx.arc(d * 35, -284, 7, 0, 7); ctx.stroke(); ctx.restore(); }
    line(ctx, [[1, -292], [-1, -284], [3, -283]], 2.5, 'rgba(70,35,20,.55)');
    shape(ctx, '#8a2a2a', 2.5, c => { c.moveTo(-12, -276); c.quadraticCurveTo(0, -260, 12, -276); c.quadraticCurveTo(0, -272, -12, -276); c.closePath(); }); shape(ctx, '#fff', 0, c => { c.moveTo(-9, -275); c.quadraticCurveTo(0, -271, 9, -275); c.lineTo(8, -272); c.quadraticCurveTo(0, -269, -8, -272); c.closePath(); });
    for (const [fx, fy, fc] of [[-26, -340, '#e8423a'], [-38, -326, '#f6c945'], [-14, -352, '#d84a8a']]) { for (let p = 0; p < 5; p++) shape(ctx, fc, 1.5, circle(fx + Math.cos(p * 1.26) * 6, fy + Math.sin(p * 1.26) * 6, 5)); shape(ctx, '#fff2a0', 1, circle(fx, fy, 3)); }
    ctx.restore(); }

  // folding table with a cooler, bottles and a cardboard sign
  function table(ctx, x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (const d of [-1, 1]) { line(ctx, [[d * 120, -100], [d * 100, 0]], 6, '#7a7a80'); line(ctx, [[d * 100, -100], [d * 120, 0]], 6, '#7a7a80'); }
    shape(ctx, '#e8e2d2', 4, rect(-150, -116, 300, 18, 4)); shape(ctx, '#d4ccb8', 0, rect(-150, -100, 300, 4));
    shape(ctx, '#2a6ac8', 4, rect(-130, -196, 130, 80, 10)); shape(ctx, '#f4efe6', 4, rect(-134, -212, 138, 22, 8)); shape(ctx, '#f4efe6', 2, rect(-80, -200, 30, 8, 3));
    const nb = o.bottles ?? 6; for (let i = 0; i < nb; i++) { const bx = 24 + (i % 3) * 36, by = -116 - Math.floor(i / 3) * 4; shape(ctx, 'rgba(170,220,250,.85)', 3, rect(bx - 12, by - 64, 24, 64, 6)); shape(ctx, '#3a8ad8', 2.5, rect(bx - 6, by - 76, 12, 12, 2)); shape(ctx, '#f4efe6', 0, rect(bx - 11, by - 40, 22, 14)); }
    if (o.sign !== false) { ctx.save(); ctx.translate(-70, -40); ctx.rotate(-.05); shape(ctx, '#c8a46a', 3, rect(-60, -30, 120, 54, 3)); ctx.font = FX.DISPLAY(24); ctx.fillStyle = '#1d4a8a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('AGUA $15', 0, -2); ctx.restore(); }
    ctx.restore(); }

  // ---- map: lon −95.5..−85.5, lat 12.8..22.6 ----
  const MX = { lon0: -95.6, lon1: -85.4, lat0: 12.8, lat1: 22.6 };
  const MP = ([lon, lat]) => { const sx = 1280 / (MX.lon1 - MX.lon0) * .62, cx = 640, cy = 360; return [cx + (lon - (MX.lon0 + MX.lon1) / 2) * sx * .955 * 1.0, cy - (lat - (MX.lat0 + MX.lat1) / 2) * sx]; };
  const COAST = [[-96.5, 18.9], [-95.9, 18.75], [-94.8, 18.3], [-94.4, 18.15], [-93.6, 18.4], [-92.65, 18.55], [-91.85, 18.62], [-91.3, 18.75], [-90.72, 19.35], [-90.53, 19.85], [-90.42, 20.5], [-90.4, 20.86],
    [-90.0, 21.15], [-89.66, 21.28], [-88.9, 21.38], [-88.15, 21.6], [-87.5, 21.55], [-87.05, 21.6], [-86.8, 21.15], [-87.0, 20.7], [-87.45, 20.2], [-87.45, 19.6], [-87.75, 19.0], [-87.8, 18.6], [-88.3, 18.48],
    [-88.1, 18.2], [-88.2, 17.5], [-88.3, 16.9], [-88.6, 16.4], [-88.85, 16.1], [-88.6, 15.75], [-88.2, 15.72], [-87.95, 15.85], [-87.4, 15.8], [-86.8, 15.78], [-86.3, 15.85], [-85.0, 15.95], [-83.4, 15.3], [-83.6, 12.0], [-83.0, 10.0], [-80.0, 8.8], [-74.0, 8.5], [-74.0, 4.0]];
  const PACIFIC = [[-74.0, 4.0], [-79.5, 7.3], [-83.0, 8.2], [-85.7, 10.0], [-86.8, 12.0], [-87.3, 12.95], [-87.8, 13.25], [-88.6, 13.25], [-89.4, 13.5], [-90.1, 13.75], [-91.0, 13.92], [-91.8, 14.25], [-92.25, 14.53], [-92.9, 15.2], [-93.75, 16.05], [-94.5, 16.2], [-95.2, 16.17], [-96.5, 15.7]];
  const BORDERS = [
    [[-92.25, 14.53], [-92.15, 15.05], [-91.73, 16.07], [-90.45, 16.07], [-90.6, 16.5], [-91.1, 16.9], [-91.44, 17.25], [-90.98, 17.25], [-90.98, 17.82], [-89.15, 17.82], [-89.15, 15.9], [-88.85, 16.1]], // Mexico–Guatemala, Guatemala–Belize
    [[-89.15, 17.95], [-88.8, 18.2], [-88.3, 18.48]], // Belize–Mexico (Río Hondo)
    [[-88.2, 15.72], [-88.65, 15.25], [-89.15, 14.6], [-89.36, 14.42], [-90.1, 13.75]], // Guatemala–Honduras–El Salvador
    [[-89.36, 14.42], [-88.6, 14.0], [-87.8, 13.4]], // Honduras–El Salvador
    [[-90.98, 17.82], [-89.15, 17.82], [-89.15, 17.95]],
    [[-92.65, 18.2], [-91.44, 17.25]], // Tabasco–Campeche–Chiapas (state line, faint)
  ];
  const SITES = { chichen: [-88.57, 20.68], tikal: [-89.62, 17.22], copan: [-89.14, 14.84], palenque: [-92.05, 17.48], calakmul: [-89.74, 18.11], mirador: [-89.92, 17.75], aguada: [-91.05, 17.75],
    tonina: [-92.01, 16.9], quirigua: [-89.04, 15.27], mayapan: [-89.46, 20.63], nojpeten: [-89.89, 16.93], chichancanab: [-88.77, 19.87], mani: [-89.39, 20.39], piedras: [-91.11, 17.16], merida: [-89.62, 20.97], chansantacruz: [-88.05, 19.58] };
  function mayaMap(ctx, t, o = {}) {
    shape(ctx, grad(ctx, 0, 0, 0, H, [[0, '#7ac8e0'], [1, '#5ab0d0']]), 0, rect(-1400, -900, 4200, 2600));
    for (let i = 0; i < 14; i++) line(ctx, [[-600, 30 + i * 52 + Math.sin(t * .6 + i) * 3], [2200, 30 + i * 52 + Math.sin(t * .6 + i) * 3]], 2, 'rgba(255,255,255,.12)');
    const landPath = c => { c.moveTo(...MP([-114, 30])); c.lineTo(...MP([-97.2, 27])); c.lineTo(...MP([-97.6, 25])); c.lineTo(...MP([-97.4, 21.5])); c.lineTo(...MP([-96.5, 18.9])); for (const p of COAST) c.lineTo(...MP(p)); for (const p of PACIFIC) c.lineTo(...MP(p)); for (const p of [[-98.5, 16.3], [-99.9, 16.85], [-102, 17.9], [-105.3, 20.5], [-106, 23], [-114, 30]]) c.lineTo(...MP(p)); c.closePath(); };
    shape(ctx, '#e8dcb0', 5, landPath); ctx.save(); ctx.beginPath(); landPath(ctx); ctx.clip();
    // lowland forest (green) vs highlands (tan) shading
    shape(ctx, 'rgba(90,150,80,.35)', 0, c => { const pts = [[-92.8, 18.4], [-90.7, 19.4], [-90.4, 21.0], [-88.2, 21.5], [-87.4, 20.0], [-88.2, 17.4], [-88.8, 16.1], [-89.6, 15.9], [-90.6, 16.2], [-91.7, 16.4], [-92.8, 17.4]].map(MP); c.moveTo(...pts[0]); for (const p of pts.slice(1)) c.lineTo(...p); c.closePath(); });
    shape(ctx, 'rgba(160,110,70,.28)', 0, c => { const pts = [[-93.6, 16.2], [-92.4, 16.9], [-91.4, 15.8], [-90.2, 15.4], [-89.2, 14.9], [-88.6, 14.2], [-89.6, 14.0], [-91.0, 14.5], [-92.4, 15.0]].map(MP); c.moveTo(...pts[0]); for (const p of pts.slice(1)) c.lineTo(...p); c.closePath(); });
    ctx.restore(); shape(ctx, null, 5, landPath);
    if (o.borders !== false) { ctx.save(); ctx.setLineDash([10, 8]); for (const b of BORDERS) line(ctx, b.map(MP), 2.5, 'rgba(90,60,40,.55)'); ctx.restore();
      const lab = (s, ll) => { const [x, y] = MP(ll); ctx.save(); ctx.font = FX.FONT(800, 17); ctx.fillStyle = 'rgba(90,60,40,.75)'; ctx.textAlign = 'center'; ctx.fillText(s, x, y); ctx.restore(); };
      lab('MEXICO', [-94.0, 17.2]); lab('GUATEMALA', [-90.4, 15.1]); lab('BELIZE', [-88.6, 17.1]); lab('HONDURAS', [-87.0, 14.7]); lab('EL SALVADOR', [-89.1, 13.75]);
      if (o.today !== false) { const [x, y] = MP([-86.4, 21.9]); ctx.save(); ctx.font = FX.FONT(700, 15); ctx.fillStyle = 'rgba(40,60,90,.8)'; ctx.textAlign = 'right'; ctx.fillText('borders: today', x + 40, y); ctx.restore(); } }
    const sea = (s, ll, px = 20) => { const [x, y] = MP(ll); ctx.save(); ctx.font = FX.FONT(700, px); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.textAlign = 'center'; ctx.fillText(s, x, y); ctx.restore(); };
    sea('GULF OF MEXICO', [-92.6, 20.9]); sea('CARIBBEAN SEA', [-86.4, 17.6]); sea('PACIFIC OCEAN', [-93.4, 14.0]);
  }
  function site(ctx, key, k, label, o = {}) { if (k <= 0) return; const [x, y] = MP(SITES[key] || key), s = FX.settle(clamp(k / .35));
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, o.col || '#c8322a', 3, circle(0, 0, o.r || 9)); shape(ctx, '#fff', 0, circle(-2, -2, 3));
    if (label) { ctx.font = FX.FONT(800, o.px || 18); const w = ctx.measureText(label).width + 16, dx = o.left ? -w - 14 : 14; shape(ctx, '#f6f0e0', 2.5, rect(dx, -14, w, 28, 5)); ctx.fillStyle = INK; ctx.textBaseline = 'middle'; ctx.fillText(label, dx + 8, 1); }
    ctx.restore(); }


  // ---- Classic city pieces (reused for Tikal, Copán, Palenque…) ----
  // a steep temple-pyramid with a roof comb; x = centre, y = base; o.col stucco colour, o.k 0..1 builds it up from the ground
  function temple(ctx, x, y, s, o = {}) { const k = o.k ?? 1; if (k <= 0) return; const col = o.col || '#d8cdb4', dk = o.dark || mix(col, '#3a2a20', .35), n = o.tiers || 6, Hh = o.h || 300, w0 = o.w || 150;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.rect(-400, -900, 800, 900 + 40); ctx.rect(-400, 0, 800, 40); ctx.save(); ctx.beginPath(); ctx.rect(-400, -(Hh + 260) * k - 10, 800, (Hh + 260) * k + 60); ctx.clip();
    shape(ctx, 'rgba(0,0,0,.18)', 0, ellipse(0, 4, w0 * 1.3, 14));
    for (let i = 0; i < n; i++) { const y0 = -i * Hh / n, wa = lerp(w0, w0 * .45, i / n), wb = lerp(w0, w0 * .45, (i + .85) / n); shape(ctx, col, 3.5, poly([[-wa, y0], [wa, y0], [wb, y0 - Hh / n + 3], [-wb, y0 - Hh / n + 3]])); shape(ctx, dk, 0, rect(-wb, y0 - Hh / n + 3, wb * 2, 4)); }
    shape(ctx, mix(col, '#ffffff', .25), 3, poly([[-w0 * .2, 0], [w0 * .2, 0], [w0 * .13, -Hh], [-w0 * .13, -Hh]])); for (let j = 0; j < 16; j++) { const yy = -j * Hh / 16; line(ctx, [[-w0 * .2 + j * .5, yy], [w0 * .2 - j * .5, yy]], 1.4, 'rgba(60,40,30,.3)'); }
    const tw = w0 * .42; shape(ctx, col, 3.5, rect(-tw, -Hh - 70, tw * 2, 70)); shape(ctx, '#2a2024', 3, rect(-14, -Hh - 54, 28, 54, 4));
    shape(ctx, col, 3.5, poly([[-tw * .7, -Hh - 70], [tw * .7, -Hh - 70], [tw * .5, -Hh - 170], [-tw * .5, -Hh - 170]])); for (let j = 0; j < 3; j++) shape(ctx, dk, 0, rect(-tw * .4 + j * tw * .3, -Hh - 150, tw * .18, 50, 3)); // roof comb
    if (o.paint) { shape(ctx, 'rgba(200,60,50,.35)', 0, rect(-tw, -Hh - 70, tw * 2, 70)); shape(ctx, 'rgba(200,60,50,.25)', 0, poly([[-tw * .7, -Hh - 70], [tw * .7, -Hh - 70], [tw * .5, -Hh - 170], [-tw * .5, -Hh - 170]])); }
    ctx.restore(); ctx.restore(); }
  function palace(ctx, x, y, s, o = {}) { const k = o.k ?? 1; if (k <= 0) return; const col = o.col || '#e2d6bc'; ctx.save(); ctx.translate(x, y); ctx.scale(s, s * k);
    shape(ctx, mix(col, '#3a2a20', .2), 3.5, rect(-210, -40, 420, 40)); shape(ctx, col, 3.5, rect(-180, -120, 360, 80)); shape(ctx, mix(col, '#3a2a20', .3), 3, rect(-190, -136, 380, 18));
    for (let i = 0; i < 5; i++) shape(ctx, '#2a2024', 2.5, rect(-150 + i * 70, -100, 26, 60, 3)); if (o.paint) shape(ctx, 'rgba(200,60,50,.4)', 0, rect(-180, -120, 360, 14)); ctx.restore(); }
  function stelaSmall(ctx, x, y, s, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s * k); shape(ctx, '#bcae90', 3.5, c => { c.moveTo(-26, 0); c.lineTo(-24, -110); c.quadraticCurveTo(0, -124, 24, -110); c.lineTo(26, 0); c.closePath(); });
    shape(ctx, '#8a7c62', 2, circle(0, -86, 9)); shape(ctx, '#8a7c62', 2, rect(-9, -74, 18, 46, 4)); for (let i = 0; i < 3; i++) shape(ctx, '#3a8a5a', 1.5, ellipse(-8 + i * 8, -98, 3, 9, (i - 1) * .4)); ctx.restore(); }
  // a holy lord: quetzal plumes, jade collar, jaguar kilt, cape; walker underneath
  function king(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    const plume = o.plume || '#2f9a6a', sw = Math.sin(t * 1.4 + (o.ph || 0)) * .05; for (let i = 0; i < 9; i++) { const a = -1.1 + i * .275 + sw; ctx.save(); ctx.translate(0, -330); ctx.rotate(a); shape(ctx, i % 2 ? plume : mix(plume, '#ffffff', .2), 2.5, ellipse(0, -70, 13, 70)); ctx.restore(); }
    if (o.cape) shape(ctx, o.cape, 3.5, poly([[-44, -250], [44, -250], [64, -40], [-64, -40]]));
    ctx.restore();
    N.walker(ctx, x, y, s, t, o.v ?? 2, { plain: true, still: o.still ?? true, reach: o.reach, flip: o.flip, coat: o.coat || '#f0e6cc', pants: o.skin || '#8a5a34', skin: o.skin || '#8a5a34', hair: '#1d1a17', hs: 0, shoe: '#c8a040' });
    ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    shape(ctx, '#e8a040', 3, poly([[-38, -132], [38, -132], [34, -72], [-34, -72]])); for (let i = 0; i < 8; i++) shape(ctx, '#3a2a1a', 0, circle(-26 + (i % 4) * 17, -118 + Math.floor(i / 4) * 24 + (i % 2) * 6, 4.5)); // jaguar kilt
    for (let i = 0; i < 11; i++) shape(ctx, i % 2 ? '#2fa06a' : '#5ac08a', 1.5, circle(-30 + i * 6, -246 + Math.abs(i - 5) * -2 + Math.abs(i - 5) * 4, 5)); // jade collar
    shape(ctx, '#2fa06a', 3, circle(0, -224, 9)); shape(ctx, '#c8a040', 3, rect(-40, -140, 80, 12, 4));
    shape(ctx, '#c8a040', 3, c => { c.moveTo(-34, -330); c.quadraticCurveTo(0, -362, 34, -330); c.lineTo(30, -322); c.lineTo(-30, -322); c.closePath(); }); shape(ctx, '#2fa06a', 2.5, circle(0, -342, 9)); // headband with jade
    for (const d of [-1, 1]) shape(ctx, '#2fa06a', 2.5, circle(d * 38, -290, 7)); // ear spools
    if (o.staff) { line(ctx, [[80, -240], [96, 0]], 7, '#6a4a2a'); shape(ctx, '#2fa06a', 3, circle(78, -250, 14)); }
    ctx.restore(); }

  G.Maya = { temple, palace, stelaSmall, king, mix, sky, jungle, castillo, torch, crowdBand, plaza, vendor, table, flowers, mayaMap, site, MP, SITES };
})(window);
