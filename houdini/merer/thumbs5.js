/* Merer's Diary — thumbnails v6: the episode's full, lively scenery (Red Sea galleries, Giza building site, bakery town,
 * Nile at dawn) + two characters reacting (surprise / panic, faces only) + ONE prop + slogan. No comic FX, tags or stamps.
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
  const T0 = 300;
  const SURPRISE = side => ({ eyes: 'wide', mouth: 'o', brows: 'up', look: [-side * .5, -.1] }), PANIC = side => ({ eyes: 'wide', mouth: 'shock', brows: 'worried', sweat: true, look: [-side * .5, -.1] });
  function pair(g, left, right, light) {   // left = surprised, right = panicking; both big, waist-up, at the bottom corners
    const draw = (who, x, side, face, pose) => (who === 'theo' ? EP.theo(g, x, 1010, 1.3, { t: T0, pose, turn: -side * .3, light, face }) : EP.fig(g, who, x, 1010, 1.3, { t: T0, pose, turn: -side * .3, light, face }));
    draw(left, 190, -1, SURPRISE(-1), 'presentBoth'); draw(right, 1090, 1, PANIC(1), 'cheer'); }
  function log(g, x, y, w, h, rot) {   // Merer's logbook page: hieratic lines, each ending in a red tick
    EK.papyrusSheet(g, x, y, w, h, { rot, seed: 12, border: true, draw: c => { for (let i = 0; i < 4; i++) { const yy = -h / 2 + 46 + i * (h - 70) / 4; EK.hieratic(c, -w / 2 + 56, yy, w - 170, 41 + i, 1, '#2a2018', 4);
      c.lineCap = 'round'; c.lineWidth = 7; c.strokeStyle = '#c8261c'; c.beginPath(); c.moveTo(w / 2 - 92, yy); c.lineTo(w / 2 - 78, yy + 14); c.lineTo(w / 2 - 54, yy - 16); c.stroke(); } } }); }
  const THUMBS = [
    g => {   // A — "IT SURVIVED?!" at the Wadi al-Jarf galleries on the Red Sea
      ES.jarf(g, T0, 0, { v: 'day' }); pop(g); topShade(g);
      diary(g, 640, 400, 360, 220, -.05); ring(g, 640, 400, 225, 145);
      pair(g, 'scientist', 'theo', L.day); slogan(g, [['IT', '#ffffff'], ['SURVIVED?!', '#ffd23a']], 128, 120);
    },
    g => {   // B — "NOT SLAVES?!" over the busy Giza building site at golden hour
      ES.giza(g, T0, 0, { v: 'gold', k: .85 }); pop(g); topShade(g);
      whip(g, 560, 410, 1.2); cross(g, 650, 340, 120);
      pair(g, 'theo', 'herodotus', L.gold); slogan(g, [['NOT', '#ffffff'], ['SLAVES?!', '#ff4a3a']], 135, 124);
    },
    g => {   // C — "PAID IN BEER?!" in the bakery town under the pyramids
      ES.town(g, T0, 0, { v: 'day', people: false }); pop(g); topShade(g);
      EF.jar(g, 600, 560, 3.4, '#b8653a'); EF.jar(g, 710, 568, 2.7, '#a85a36');
      pair(g, 'merer', 'khufu', L.day); slogan(g, [['PAID IN', '#ffffff'], ['BEER?!', '#ffd23a']], 135, 128);
    },
    g => {   // D (new) — "THE FIRST TIMESHEET?!": dawn on the Nile, Merer's log ticks off every day's work
      ES.nile(g, T0, 0, { v: 'dawn' }); pop(g); topShade(g);
      log(g, 640, 400, 380, 260, .04);
      pair(g, 'w2', 'theo', L.dawn); slogan(g, [['THE FIRST', '#ffffff'], ['TIMESHEET?!', '#ffd23a']], 130, 116);
    },
  ];
  window.THUMB_N = THUMBS.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); THUMBS[i](g); return c.toDataURL('image/png'); };
})(window);
