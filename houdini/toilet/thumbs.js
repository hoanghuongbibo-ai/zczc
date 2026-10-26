/* "Where Does It Go?" — thumbnails in the approved "Two Sides" style (youtube-optimization skill, style B, clean variant):
 * a lively, detailed episode scene + two big characters reacting with their faces (surprise / panic) + ONE hero prop
 * + a one-line slogan. No starbursts, "!?" marks, tags or stamps.
 * Rendered with: node tools/_thumbs.mjs houdini/toilet/episode.html houdini/toilet/thumbs.js houdini/toilet/out/thumbs */
(function (G) {
  const T = G.Toon, TS = G.TS, EP = G.EP, P = G.Paint, L = EP.LIGHT, { W, H } = T, TAU = Math.PI * 2;
  const { sh, ln } = P;
  function slogan(g, words, y, size, maxW = 1180) { g.save(); g.font = `${size}px "Luckiest Guy"`; const sp = size * .28;
    let w = words.reduce((a, [s]) => a + g.measureText(s).width, 0) + sp * (words.length - 1); const k = Math.min(1, maxW / w); size *= k; g.font = `${size}px "Luckiest Guy"`; w *= k;
    let x = W / 2 - w / 2; g.lineJoin = 'round';
    for (const [s, col] of words) { const ww = g.measureText(s).width;
      g.fillStyle = 'rgba(0,0,0,.5)'; g.fillText(s, x + size * .04, y + size * .07); g.lineWidth = size * .2; g.strokeStyle = '#111'; g.strokeText(s, x, y);
      g.fillStyle = col; g.fillText(s, x, y); x += ww + sp * k; } g.restore(); }
  function ring(g, x, y, rx, ry, rot = -.1) { g.save(); g.translate(x, y); g.rotate(rot); g.lineCap = 'round'; for (const [w, c] of [[16, '#fff'], [9, '#e0261c']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.ellipse(0, 0, rx, ry, 0, -.2, TAU * .97); g.stroke(); } g.restore(); }
  function cross(g, x, y, r) { g.save(); g.lineCap = 'round'; for (const [w, c] of [[30, '#fff'], [18, '#e0261c']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x + r, y + r); g.moveTo(x + r, y - r); g.lineTo(x - r, y + r); g.stroke(); } g.restore(); }
  const topShade = g => { const v = g.createLinearGradient(0, 0, 0, 260); v.addColorStop(0, 'rgba(10,10,30,.5)'); v.addColorStop(1, 'rgba(10,10,30,0)'); g.fillStyle = v; g.fillRect(0, 0, W, 260); };
  const pop = g => { g.save(); g.globalCompositeOperation = 'soft-light'; g.globalAlpha = .25; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.restore(); };
  const glow = (g, x, y, r, col) => { const gr = g.createRadialGradient(x, y, 10, x, y, r); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); };
  const T0 = 300;
  const SURPRISE = side => ({ eyes: 'wide', mouth: 'o', brows: 'up', look: [-side * .5, -.1] }), PANIC = side => ({ eyes: 'wide', mouth: 'shock', brows: 'worried', sweat: true, look: [-side * .5, -.1] });
  function pair(g, left, right, light) {   // left = surprised (palms up), right = panicking (hands up); waist-up in the bottom corners
    EP.fig(g, left, 190, 1010, 1.3, { t: T0, pose: 'presentBoth', turn: .3, light, face: SURPRISE(-1) });
    EP.fig(g, right, 1090, 1010, 1.3, { t: T0, pose: 'cheer', turn: -.3, light, face: PANIC(1) }); }
  const THUMBS = [
    g => {   // A — "NOT CRAPPER?!": Crapper's Victorian showroom; the shiny toilet he did NOT invent
      TS.showroom(g, T0); pop(g); topShade(g);
      glow(g, 640, 440, 260, 'rgba(255,240,190,.55)'); sh(g, '#3a2418', 3, c => c.rect(500, 600, 280, 40)); TS.toilet(g, 640, 600, 1.0); ring(g, 640, 430, 200, 230, -.06);
      pair(g, 'viewer', 'crapper', L.day); slogan(g, [['NOT', '#ffffff'], ['CRAPPER?!', '#ffd23a']], 130, 128);
    },
    g => {   // B — "THE GREAT STINK!": Parliament over the stinking Thames, summer 1858; a chamber pot as the culprit
      TS.parliament(g, T0, { stink: .8 }); pop(g); topShade(g);
      G.potFace(g, 640, 470, 2.6, 'face'); ring(g, 640, 450, 170, 140, -.08);
      pair(g, 'lady1', 'mp1', L.day); slogan(g, [['THE GREAT', '#ffffff'], ['STINK!', '#9be03a']], 130, 124);
    },
    g => {   // C — "4,500-YEAR-OLD SEWER?!": Mohenjo-daro's covered brick street drain
      TS.mohenjo(g, T0, { worker: false }); pop(g); topShade(g);
      { const x0 = 430, x1 = 850, y0 = 520, y1 = 660; TS.bricks(g, x0 - 30, y0 - 20, x1 - x0 + 60, y1 - y0 + 40, { c: '#c47a4a', mortar: '#7a4a2a', bw: 46, bh: 18, seed: 3 });   // a cutaway of the brick street drain
        sh(g, '#2a1a12', 4, c => c.rect(x0, y0 + 20, x1 - x0, y1 - y0 - 30)); g.fillStyle = '#4a8ab0'; g.fillRect(x0 + 4, y0 + 70, x1 - x0 - 8, y1 - y0 - 84);
        g.fillStyle = 'rgba(220,240,255,.75)'; for (let i = 0; i < 7; i++) g.fillRect(x0 + 20 + i * 58, y0 + 82 + (i % 2) * 14, 30, 5);
        for (let i = 0; i < 5; i++) sh(g, '#b0a088', 3.5, c => c.rect(x0 - 10 + i * 88, y0 - 6, 84, 26)); }
      ring(g, 640, 585, 270, 115, -.03);
      pair(g, 'excavator', 'indus1', L.gold || L.day); slogan(g, [['4,500-YEAR-OLD', '#ffffff'], ['SEWER?!', '#ffd23a']], 130, 116);
    },
    g => {   // D — "WHERE DOES IT GO?!": today's bathroom, the toilet with an x-ray window into the pipe below
      TS.bathroom(g, T0); pop(g); topShade(g); TS.toilet(g, 640, 640, .9);
      const cx = 640, cy = 470, r = 150; g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip(); g.fillStyle = '#6a4a30'; g.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      sh(g, '#d8dee2', 4, c => c.rect(cx - 24, cy - r, 48, 2 * r)); for (let i = 0; i < 5; i++) { g.fillStyle = 'rgba(80,140,190,.8)'; g.fillRect(cx - 16, cy - r + 20 + i * 60, 32, 14); } g.restore();
      for (const [w, c] of [[16, '#fff'], [9, '#e0261c']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.arc(cx, cy, r + 6, 0, TAU); g.stroke(); }
      pair(g, 'viewer', 'bazalgette', L.day); slogan(g, [['WHERE DOES', '#ffffff'], ['IT GO?!', '#ffd23a']], 130, 124);
    },
  ];
  window.THUMB_N = THUMBS.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); THUMBS[i](g); return c.toDataURL('image/png'); };
})(window);
