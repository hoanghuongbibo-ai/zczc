/* Merer's Diary — YouTube thumbnails v2 (1280×720), drawn with the episode's own sets/cast/kit.
 * Eye-catching recipe: blurred + darkened scene, a hot sunburst behind the hero, the hero as a white-outlined
 * "sticker" with a big expression, one huge 2–3 word slogan, one small pill. Slogans sum up the whole script:
 * the pyramids were built by organised, fed, named crews — and someone kept the paperwork.
 * Injected into episode.html by tools/_thumbs.mjs; window.makeThumb(i) → PNG data URL. */
(function (G) {
  const T = G.Toon, ES = G.ES, EK = G.EK, EP = G.EP, EF = G.EF, L = EP.LIGHT, { W, H } = T, TAU = Math.PI * 2;
  const cv = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  function big(g, t, x, y, size, fill, rot = 0, o = {}) { g.save(); g.translate(x, y); g.rotate(rot); g.font = `${size}px "Luckiest Guy"`; g.textAlign = o.align || 'center'; g.lineJoin = 'round';
    g.fillStyle = 'rgba(0,0,0,.45)'; g.fillText(t, size * .05, size * .08);   // drop shadow
    g.lineWidth = size * .26; g.strokeStyle = '#1e120c'; g.strokeText(t, 0, 0);
    const gr = g.createLinearGradient(0, -size * .8, 0, size * .1); gr.addColorStop(0, o.top || fill); gr.addColorStop(1, fill); g.fillStyle = gr; g.fillText(t, 0, 0); g.restore(); }
  function pill(g, t, x, y, size, bg, fg = '#2a1a12') { g.font = `700 ${size}px Fredoka`; const w = g.measureText(t).width + size * 1.2, h = size * 1.7;
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.roundRect(x - w / 2 + 5, y - h / 2 + 6, w, h, h / 2); g.fill();
    g.fillStyle = bg; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, h / 2); g.fill(); g.lineWidth = 4; g.strokeStyle = '#1e120c'; g.stroke();
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(t, x, y + 2); g.textBaseline = 'alphabetic'; }
  // the scene behind: blurred, darkened at the text side, warm vignette
  function backdrop(g, draw, blur = 5, dark = .5) { const c = cv(), x = c.getContext('2d'); draw(x);
    g.save(); g.filter = `blur(${blur}px) saturate(1.25)`; g.drawImage(c, -20, -12, W + 40, H + 24); g.restore();
    const v = g.createLinearGradient(0, 0, W, 0); v.addColorStop(0, `rgba(20,8,2,${dark})`); v.addColorStop(.55, 'rgba(20,8,2,.05)'); v.addColorStop(1, 'rgba(20,8,2,.15)'); g.fillStyle = v; g.fillRect(0, 0, W, H);
    const r = g.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 900); r.addColorStop(0, 'rgba(0,0,0,0)'); r.addColorStop(1, 'rgba(20,8,2,.55)'); g.fillStyle = r; g.fillRect(0, 0, W, H); }
  function burst(g, x, y, R, c0, c1, n = 18) { g.save(); g.translate(x, y); for (let i = 0; i < n; i++) { const a = i * TAU / n; g.fillStyle = i % 2 ? c0 : c1; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R, a, a + TAU / n); g.closePath(); g.fill(); }
    const rg = g.createRadialGradient(0, 0, 0, 0, 0, R); rg.addColorStop(0, 'rgba(255,250,220,.95)'); rg.addColorStop(.35, 'rgba(255,230,150,.35)'); rg.addColorStop(1, 'rgba(255,200,100,0)'); g.fillStyle = rg; g.beginPath(); g.arc(0, 0, R, 0, TAU); g.fill(); g.restore(); }
  // a white-outlined "sticker" of whatever draw() paints (characters, props)
  function sticker(g, draw, px = 9) { const c = cv(), x = c.getContext('2d'); draw(x);
    const s = cv(), sx = s.getContext('2d'); sx.drawImage(c, 0, 0); sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#fff'; sx.fillRect(0, 0, W, H);
    g.save(); g.filter = 'drop-shadow(6px 10px 0 rgba(0,0,0,.45))'; const o = cv(), ox = o.getContext('2d'); for (let i = 0; i < 24; i++) { const a = i * TAU / 24; ox.drawImage(s, Math.cos(a) * px, Math.sin(a) * px); } ox.drawImage(s, 0, 0); g.drawImage(o, 0, 0); g.restore();
    g.drawImage(c, 0, 0); }
  const T0 = 300;
  const THUMBS = [
    g => {   // A — the whole script in three words: the pyramids were an organisation, and Merer kept its paperwork
      backdrop(g, x => ES.giza(x, T0, 0, { v: 'gold', k: .85 }), 2.5, .7);
      burst(g, 930, 330, 620, 'rgba(255,190,60,.35)', 'rgba(255,140,40,.18)');
      sticker(g, x => { EK.papyrusSheet(x, 1150, 250, 250, 170, { rot: .16, seed: 9, border: true, draw: c => { for (let i = 0; i < 3; i++) EK.hieratic(c, -90, -40 + i * 38, 180, 21 + i, 1, i ? '#2a2018' : '#b8322a', 4); } }); });
      sticker(g, x => EP.fig(x, 'merer', 930, 930, 1.2, { t: T0, pose: 'idle', prop: 'papyrus', turn: -.2, light: L.gold, face: { mouth: 'smirk', brows: 'up', eyes: 'open', look: [-.5, .05] } }), 10);
      big(g, 'THE PYRAMIDS', 360, 170, 76, '#ffffff', -.05); big(g, 'HAD', 360, 285, 100, '#ffffff', -.05);
      big(g, 'PAPERWORK', 365, 420, 112, '#ffc21a', -.05, { top: '#fff07a' });
      pill(g, 'a builder’s 4,500-year-old diary', 365, 520, 30, '#f3e6cf');
    },
    g => {   // B — the myth the script busts, turned into a punchline
      backdrop(g, x => ES.giza(x, T0, 0, { v: 'day', k: .85 }), 2.5, .65);
      burst(g, 920, 360, 640, 'rgba(255,220,90,.32)', 'rgba(120,200,255,.15)');
      sticker(g, x => { EP.fig(x, 'w2', 760, 860, .95, { t: T0, pose: 'cheer', turn: .2, light: L.day, face: { mouth: 'grin', eyes: 'happy' } });
        EP.fig(x, 'w4', 1160, 860, .95, { t: T0, pose: 'thumbsUp', turn: -.3, light: L.day, face: { mouth: 'grin', eyes: 'open' } });
        EP.fig(x, 'merer', 960, 900, 1.1, { t: T0, pose: 'idle', prop: 'papyrus', turn: -.1, light: L.day, face: { mouth: 'smile', brows: 'up', look: [-.4, .05] } }); }, 10);
      big(g, 'NOT SLAVES.', 330, 210, 100, '#ffffff', -.05);
      big(g, 'COWORKERS.', 330, 350, 112, '#ffc21a', -.05, { top: '#fff07a' });
      pill(g, 'fed · named · even given medical care', 330, 455, 28, '#f3e6cf');
    },
    g => {   // C — the funniest true detail: real crew names painted inside the pyramids
      backdrop(g, x => { ES.chamber(x, T0, { lampX: 640 }); EK.graffiti(x, 'DRUNKARDS OF MENKAURE', 400, 590, 1, { size: 44, rot: -.04 }); }, 1.2, .45);
      burst(g, 980, 340, 600, 'rgba(255,120,60,.3)', 'rgba(255,200,80,.14)');
      sticker(g, x => { EF.jar(x, 1210, 700, 2.2, '#b8653a'); EP.fig(x, 'w1', 980, 930, 1.2, { t: T0, pose: 'cheer', turn: -.2, light: L.lamp, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); }, 10);
      big(g, 'TEAM NAME:', 350, 180, 80, '#ffffff', -.05);
      big(g, 'DRUNKARDS', 355, 315, 108, '#ff6a3a', -.05, { top: '#ffd06a' });
      pill(g, 'real pyramid crews signed their work', 355, 420, 28, '#f3e6cf');
    },
  ];
  window.THUMB_N = THUMBS.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = cv(), g = c.getContext('2d'); THUMBS[i](g); return c.toDataURL('image/png'); };
})(window);
