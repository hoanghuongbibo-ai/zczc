/* Merer's Diary — thumbnails v4: "Two Sides" style, BOTH characters in surprise / panic, pushed with comic shock FX
 * (starburst behind the head, "!" / "!?" marks, tremble lines, flying sweat drops). Characters + content are our own.
 * Injected into episode.html by tools/_thumbs.mjs; window.makeThumb(i) → PNG data URL. */
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
  // ---- comic shock FX (hx, hy = head centre) ----
  function burst(g, x, y, r, col = '#ffe04a') { g.save(); g.translate(x, y); const n = 16; g.beginPath(); for (let i = 0; i <= n * 2; i++) { const a = i * Math.PI / n, rr = i % 2 ? r * .62 : r * (1 + (i % 4 ? .1 : 0)); g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath();
    g.lineWidth = 14; g.strokeStyle = '#fff'; g.stroke(); g.fillStyle = col; g.fill(); g.restore(); }
  function mark(g, s, x, y, size, rot, col = '#ff3a2a') { g.save(); g.translate(x, y); g.rotate(rot); g.font = `${size}px "Luckiest Guy"`; g.textAlign = 'center'; g.lineJoin = 'round';
    g.lineWidth = size * .28; g.strokeStyle = '#111'; g.strokeText(s, 0, 0); g.lineWidth = size * .12; g.strokeStyle = '#fff'; g.strokeText(s, 0, 0); g.fillStyle = col; g.fillText(s, 0, 0); g.restore(); }
  function tremble(g, x, y, r) { g.save(); g.lineCap = 'round'; for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) { const a = (i - 1) * .35, cx = x + sd * (r + 26 + i * 4), cy = y - 20 + (i - 1) * 46;
      for (const [w, c] of [[11, '#fff'], [6, '#111']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.arc(cx - sd * 30, cy, 30, sd > 0 ? -.6 + a : Math.PI - .6 + a, sd > 0 ? .6 + a : Math.PI + .6 + a); g.stroke(); } } g.restore(); }
  function drops(g, x, y, r, sd) { for (const [dx, dy, s] of [[.9, -.7, 1.2], [1.15, -.25, .9], [.75, -1.0, .8]]) { const px = x + sd * dx * r, py = y + dy * r; g.save(); g.translate(px, py); g.rotate(sd * .5); g.scale(s, s);
      g.beginPath(); g.moveTo(0, -26); g.quadraticCurveTo(18, 4, 0, 14); g.quadraticCurveTo(-18, 4, 0, -26); g.lineWidth = 5; g.strokeStyle = '#111'; g.stroke(); g.fillStyle = '#7fd0ff'; g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.ellipse(-4, 0, 3, 6, 0, 0, TAU); g.fill(); g.restore(); } }
  // a character in shock: starburst behind, figure, then marks + tremble + sweat; kind 'surprise' | 'panic'
  function shocked(g, who, x, side, kind, light, o = {}) { const hx = x + side * 18, hy = 445, r = 160;
    burst(g, hx, hy - 10, r * 1.45, kind === 'panic' ? '#ff9a3a' : '#ffe04a');
    const face = kind === 'panic' ? { eyes: 'wide', mouth: 'shock', brows: 'worried', sweat: true, look: [-side * .5, -.1] } : { eyes: 'wide', mouth: 'o', brows: 'up', look: [-side * .5, -.1] };
    const fig = who === 'theo' ? EP.theo : (g2, x2, y2, s2, oo) => EP.fig(g2, who, x2, y2, s2, oo);
    fig(g, x, 1010, 1.3, Object.assign({ t: T0, pose: kind === 'panic' ? 'cheer' : 'presentBoth', turn: -side * .3, light, face }, o));
    if (kind === 'panic') { tremble(g, hx, hy, r); drops(g, hx, hy, r, -side); mark(g, '!!', hx - side * 175, hy - 150, 96, -side * .22); }
    else mark(g, '!?', hx - side * 170, hy - 160, 100, -side * .18, '#ffd23a'); }
  const T0 = 300;
  const THUMBS = [
    g => {   // A — "IT SURVIVED?!": Theo stunned, the scientist panicking over a 4,500-year-old papyrus
      ES.giza(g, T0, 0, { v: 'day', k: .85 }); pop(g); topShade(g);
      diary(g, 640, 420, 360, 220, -.05); ring(g, 640, 420, 225, 145); tag(g, '4,500 YEARS OLD', 640, 552, 26, '#141414', '#ffd23a', -.04);
      shocked(g, 'theo', 190, -1, 'surprise', L.day); shocked(g, 'scientist', 1090, 1, 'panic', L.day);
      slogan(g, [['IT', '#ffffff'], ['SURVIVED?!', '#ffd23a']], 128, 120);
    },
    g => {   // B — "NOT SLAVES?!": Herodotus panics, Theo can't believe it; the whip is a myth
      ES.giza(g, T0, 0, { v: 'gold', k: .85 }); pop(g); topShade(g);
      whip(g, 540, 420, 1.15); cross(g, 640, 350, 115); stamp(g, 'MYTH', 640, 520, 54, -.12);
      shocked(g, 'theo', 190, -1, 'surprise', L.gold); shocked(g, 'herodotus', 1090, 1, 'panic', L.gold);
      slogan(g, [['NOT', '#ffffff'], ['SLAVES?!', '#ff4a3a']], 135, 124);
    },
    g => {   // C — "PAID IN BEER?!": Merer stunned, Khufu panicking at the ration bill
      ES.town(g, T0, 0, { v: 'day', people: false }); pop(g); topShade(g);
      loaves(g, 560, 520, 1.05); EF.jar(g, 715, 540, 2.9, '#b8653a'); EF.jar(g, 795, 548, 2.3, '#a85a36'); ring(g, 670, 455, 225, 138, .06); tag(g, 'daily rations', 680, 612, 24);
      shocked(g, 'merer', 190, -1, 'surprise', L.day); shocked(g, 'khufu', 1090, 1, 'panic', L.day);
      slogan(g, [['PAID IN', '#ffffff'], ['BEER?!', '#ffd23a']], 135, 128);
    },
    g => {   // D — "TEAM NAME: DRUNKARDS?!": the king panics, Theo is speechless
      ES.chamber(g, T0, { lampX: 640 }); pop(g); topShade(g);
      { const gl = g.createRadialGradient(640, 420, 40, 640, 420, 420); gl.addColorStop(0, 'rgba(255,214,150,.75)'); gl.addColorStop(1, 'rgba(255,214,150,0)'); g.fillStyle = gl; g.fillRect(0, 0, W, H); }
      EK.graffiti(g, 'DRUNKARDS', 660, 420, 1, { size: 80, rot: -.05 }); EK.graffiti(g, 'DRUNKARDS', 660, 420, 1, { size: 80, rot: -.05 }); ring(g, 640, 420, 320, 118, -.05);
      tag(g, 'a real crew name', 640, 530, 24, '#141414', '#ffd23a');
      shocked(g, 'theo', 190, -1, 'surprise', L.lamp); shocked(g, 'khufu', 1090, 1, 'panic', L.lamp);
      slogan(g, [['TEAM:', '#ffffff'], ['DRUNKARDS?!', '#ff4a3a']], 135, 116);
    },
  ];
  window.THUMB_N = THUMBS.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); THUMBS[i](g); return c.toDataURL('image/png'); };
})(window);
