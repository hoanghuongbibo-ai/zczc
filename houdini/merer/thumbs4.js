/* Merer's Diary — thumbnails v5 (clean): the user found v4 too busy. One simple background (sky, one pyramid, sand
 * or a plain stone wall), two characters reacting (surprise / panic, faces only — no bursts, marks or drops), ONE prop in
 * the middle, the slogan on top. Injected into episode.html by tools/_thumbs.mjs; window.makeThumb(i) → PNG data URL. */
(function (G) {
  const T = G.Toon, ES = G.ES, EK = G.EK, EP = G.EP, EF = G.EF, P = G.Paint, L = EP.LIGHT, { W, H } = T, TAU = Math.PI * 2;
  const { sh, ln } = P;
  // slogan: words = [[text, colour], …] on one line, auto-fit to maxW, heavy black outline + drop shadow
  function slogan(g, words, y, size, maxW = 1180) { g.save(); g.font = `${size}px "Luckiest Guy"`; const sp = size * .28;
    let w = words.reduce((a, [s]) => a + g.measureText(s).width, 0) + sp * (words.length - 1); const k = Math.min(1, maxW / w); size *= k; g.font = `${size}px "Luckiest Guy"`; w *= k;
    let x = W / 2 - w / 2; g.textBaseline = 'alphabetic'; g.lineJoin = 'round';
    for (const [s, col] of words) { const ww = g.measureText(s).width;
      g.fillStyle = 'rgba(0,0,0,.5)'; g.fillText(s, x + size * .04, y + size * .07); g.lineWidth = size * .2; g.strokeStyle = '#111'; g.strokeText(s, x, y);
      g.fillStyle = col; g.fillText(s, x, y); x += ww + sp * k; } g.restore(); }
  function tag(g, s, x, y, size = 24, bg = '#141414', fg = '#fff', rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.font = `700 ${size}px Fredoka`; const w = g.measureText(s).width + size * .9, h = size * 1.5;
    g.fillStyle = bg; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 6); g.fill(); g.lineWidth = 3; g.strokeStyle = '#fff'; g.stroke(); g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 0, 2); g.restore(); }
  function ring(g, x, y, rx, ry, rot = -.1) { g.save(); g.translate(x, y); g.rotate(rot); g.lineCap = 'round'; for (const [w, c] of [[16, '#fff'], [9, '#e0261c']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.ellipse(0, 0, rx, ry, 0, -.2, TAU * .97); g.stroke(); } g.restore(); }
  function arrow(g, x0, y0, x1, y1) { const a = Math.atan2(y1 - y0, x1 - x0), mx = (x0 + x1) / 2 - (y1 - y0) * .18, my = (y0 + y1) / 2 + (x1 - x0) * .18; g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
    for (const [w, c] of [[22, '#fff'], [13, '#e0261c']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo(mx, my, x1, y1); g.stroke();
      g.fillStyle = c; g.beginPath(); g.moveTo(x1 + Math.cos(a) * w * 1.6, y1 + Math.sin(a) * w * 1.6); g.lineTo(x1 + Math.cos(a + 2.4) * w * 2.4, y1 + Math.sin(a + 2.4) * w * 2.4); g.lineTo(x1 + Math.cos(a - 2.4) * w * 2.4, y1 + Math.sin(a - 2.4) * w * 2.4); g.closePath(); g.fill(); } g.restore(); }
  function stamp(g, s, x, y, size = 46, rot = -.14, col = '#d92a1e') { g.save(); g.translate(x, y); g.rotate(rot); g.font = `${size}px "Luckiest Guy"`; const w = g.measureText(s).width + size * .8, h = size * 1.35;
    g.fillStyle = 'rgba(255,245,235,.92)'; g.fillRect(-w / 2, -h / 2, w, h); g.lineWidth = 6; g.strokeStyle = col; g.strokeRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 0, size * .08); g.restore(); }
  function cross(g, x, y, r) { g.save(); g.lineCap = 'round'; for (const [w, c] of [[30, '#fff'], [18, '#e0261c']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x + r, y + r); g.moveTo(x + r, y - r); g.lineTo(x - r, y + r); g.stroke(); } g.restore(); }
  const topShade = g => { const v = g.createLinearGradient(0, 0, 0, 260); v.addColorStop(0, 'rgba(10,10,30,.45)'); v.addColorStop(1, 'rgba(10,10,30,0)'); g.fillStyle = v; g.fillRect(0, 0, W, 260); };
  const pop = g => { g.save(); g.globalCompositeOperation = 'soft-light'; g.globalAlpha = .25; g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); g.restore(); };   // brighter, punchier colours
  const diary = (g, x, y, w, h, rot) => EK.papyrusSheet(g, x, y, w, h, { rot, seed: 9, border: true, draw: c => { for (let i = 0; i < 3; i++) EK.hieratic(c, -w / 2 + 60, -h / 2 + 50 + i * (h - 90) / 2.4, w - 120, 31 + i, 1, i ? '#2a2018' : '#b8322a', 4.5); } });
  function whip(g, x, y, s) {   // handle + a long wavy lash, clearly a whip
    g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-.5); g.lineCap = 'round'; g.lineJoin = 'round';
    for (const [w, c] of [[14, '#1e120c'], [7, '#9a6034']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.moveTo(40, 0); for (let i = 0; i <= 40; i++) { const u = i / 40; g.lineTo(40 + u * 300, Math.sin(u * 9) * 26 * (1 - u * .4) - u * u * 60); } g.stroke(); }
    sh(g, '#5a3420', 4, c => c.roundRect(-70, -13, 115, 26, 10)); for (let i = 0; i < 4; i++) ln(g, [[-55 + i * 22, -12], [-55 + i * 22, 12]], 3, '#3a2214'); g.restore(); }
  function loaves(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); for (const [dx, dy] of [[-60, 0], [0, -14], [60, 0], [-30, -50], [30, -54]]) sh(g, '#c8843e', 4, c => { c.moveTo(dx - 34, dy); c.quadraticCurveTo(dx, dy - 110, dx + 34, dy); c.closePath(); });
    for (const [dx, dy] of [[-60, 0], [0, -14], [60, 0]]) { g.fillStyle = 'rgba(255,230,180,.45)'; g.beginPath(); g.ellipse(dx - 8, dy - 46, 8, 22, -.2, 0, TAU); g.fill(); } g.restore(); }
  // simple backdrops: no camp, palms or crowds — just sky, one pyramid and sand; or a plain lit stone wall
  function desert(g, v = 'day') { const sky = v === 'gold' ? [['#5a8ad0', 0], ['#f2b98a', .75], ['#ffd9a0', 1]] : [['#3d8be0', 0], ['#9fd0f4', .75], ['#dff0fa', 1]];
    const s = g.createLinearGradient(0, 0, 0, 470); sky.forEach(([c, k]) => s.addColorStop(k, c)); g.fillStyle = s; g.fillRect(0, 0, W, 470);
    const sun = g.createRadialGradient(640, 300, 10, 640, 300, 420); sun.addColorStop(0, 'rgba(255,250,225,.85)'); sun.addColorStop(1, 'rgba(255,250,225,0)'); g.fillStyle = sun; g.fillRect(0, 0, W, 470);
    ES.pyramid(g, 640, 470, 620, { k: 1 });
    const d = g.createLinearGradient(0, 460, 0, H); d.addColorStop(0, '#f0cf8e'); d.addColorStop(1, '#d9a95e'); g.fillStyle = d; g.beginPath(); g.moveTo(0, 470); g.quadraticCurveTo(320, 450, 640, 470); g.quadraticCurveTo(960, 490, W, 462); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
    g.lineWidth = 4; g.strokeStyle = 'rgba(60,40,20,.6)'; g.stroke(); }
  function wall(g) { g.fillStyle = '#6a5a4c'; g.fillRect(0, 0, W, H); for (let r = 0; r < 6; r++) for (let i = -1; i < 6; i++) { const x = i * 260 + (r % 2) * 130, y = r * 124; g.fillStyle = '#9a8670'; g.fillRect(x + 4, y + 4, 252, 116); }
    const l = g.createRadialGradient(640, 400, 60, 640, 400, 760); l.addColorStop(0, 'rgba(255,220,160,.35)'); l.addColorStop(1, 'rgba(20,12,6,.75)'); g.fillStyle = l; g.fillRect(0, 0, W, H); }
  const T0 = 300;
  const SURPRISE = side => ({ eyes: 'wide', mouth: 'o', brows: 'up', look: [-side * .5, -.1] }), PANIC = side => ({ eyes: 'wide', mouth: 'shock', brows: 'worried', sweat: true, look: [-side * .5, -.1] });
  function pair(g, left, right, light) {   // left = surprised, right = panicking; both big, waist-up, at the bottom corners
    const draw = (who, x, side, face, pose) => (who === 'theo' ? EP.theo(g, x, 1010, 1.3, { t: T0, pose, turn: -side * .3, light, face }) : EP.fig(g, who, x, 1010, 1.3, { t: T0, pose, turn: -side * .3, light, face }));
    draw(left, 190, -1, SURPRISE(-1), 'presentBoth'); draw(right, 1090, 1, PANIC(1), 'cheer'); }
  const THUMBS = [
    g => { desert(g, 'day'); diary(g, 640, 380, 380, 230, -.05); ring(g, 640, 380, 235, 150); pair(g, 'theo', 'scientist', L.day); slogan(g, [['IT', '#ffffff'], ['SURVIVED?!', '#ffd23a']], 128, 120); },
    g => { desert(g, 'gold'); whip(g, 560, 410, 1.2); cross(g, 650, 340, 120); pair(g, 'theo', 'herodotus', L.gold); slogan(g, [['NOT', '#ffffff'], ['SLAVES?!', '#ff4a3a']], 135, 124); },
    g => { desert(g, 'day'); EF.jar(g, 600, 560, 3.4, '#b8653a'); EF.jar(g, 710, 568, 2.7, '#a85a36'); pair(g, 'merer', 'khufu', L.day); slogan(g, [['PAID IN', '#ffffff'], ['BEER?!', '#ffd23a']], 135, 128); },
    g => { wall(g); EK.graffiti(g, 'DRUNKARDS', 660, 400, 1, { size: 86, rot: -.05 }); EK.graffiti(g, 'DRUNKARDS', 660, 400, 1, { size: 86, rot: -.05 }); pair(g, 'theo', 'khufu', L.lamp); slogan(g, [['TEAM:', '#ffffff'], ['DRUNKARDS?!', '#ff4a3a']], 135, 116); },
  ];
  window.THUMB_N = THUMBS.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); THUMBS[i](g); return c.toDataURL('image/png'); };
})(window);
