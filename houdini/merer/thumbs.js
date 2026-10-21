/* Merer's Diary — YouTube thumbnails (1280×720), drawn with the episode's own sets/cast/kit.
 * Injected into episode.html by tools/_thumbs.mjs; window.makeThumb(i) → PNG data URL. */
(function (G) {
  const T = G.Toon, ES = G.ES, EK = G.EK, EP = G.EP, EF = G.EF, L = EP.LIGHT, { W, H } = T;
  function big(g, t, x, y, size, fill, rot = 0, align = 'center') { g.save(); g.translate(x, y); g.rotate(rot); g.font = `${size}px "Luckiest Guy"`; g.textAlign = align; g.lineJoin = 'round';
    g.lineWidth = size * .24; g.strokeStyle = '#2a1a12'; g.strokeText(t, 0, 0); g.fillStyle = fill; g.fillText(t, 0, 0); g.restore(); }
  function pill(g, t, x, y, size, bg) { g.font = `700 ${size}px Fredoka`; const w = g.measureText(t).width + size * 1.2, h = size * 1.7;
    g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.roundRect(x - w / 2 + 5, y - h / 2 + 6, w, h, h / 2); g.fill();
    g.fillStyle = bg; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, h / 2); g.fill(); g.lineWidth = 4; g.strokeStyle = '#2a1a12'; g.stroke();
    g.fillStyle = '#2a1a12'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(t, x, y + 2); g.textBaseline = 'alphabetic'; }
  const shade = (g, a0, a1) => { const v = g.createLinearGradient(0, 0, W, 0); v.addColorStop(0, `rgba(30,15,5,${a0})`); v.addColorStop(.6, 'rgba(30,15,5,0)'); v.addColorStop(1, `rgba(30,15,5,${a1})`); g.fillStyle = v; g.fillRect(0, 0, W, H); };
  const sheet = (g, x, y, w, h, rot, lines = 3) => EK.papyrusSheet(g, x, y, w, h, { rot, seed: 7, border: true, draw: c => { for (let i = 0; i < lines; i++) EK.hieratic(c, -w / 2 + 70, -h / 2 + 60 + i * 52, w - 140, 11 + i, 1, i === 0 ? '#b8322a' : '#2a2018', 4); } });
  const T0 = 300;
  const THUMBS = [
    g => {   // A: golden Nile, Merer with his papyrus — "4,500-YEAR-OLD WORK DIARY"
      ES.nile(g, T0, 0, { v: 'gold' }); shade(g, .6, 0);
      sheet(g, 330, 560, 420, 200, -.06, 3);
      EP.fig(g, 'merer', 1000, 905, 1.12, { t: T0, pose: 'idle', prop: 'papyrus', turn: -.25, light: L.gold, face: { mouth: 'smile', brows: 'up', eyes: 'open', look: [-.4, .1] } });
      big(g, '4,500-YEAR-OLD', 360, 170, 84, '#f6c945', -.04); big(g, 'WORK DIARY', 360, 290, 112, '#ffffff', -.04);
      pill(g, 'written by a Great Pyramid builder', 360, 380, 28, '#f3e6cf');
    },
    g => {   // B: Giza building site — "WHAT DID THEY DO ALL DAY?"
      ES.giza(g, T0, 0, { v: 'day', k: .85 }); shade(g, .55, .1);
      EP.fig(g, 'merer', 1010, 905, 1.12, { t: T0, pose: 'idle', prop: 'papyrus', turn: -.3, light: L.day, face: { mouth: 'smirk', brows: 'up', look: [-.5, .1] } });
      big(g, 'WHAT DID', 380, 175, 110, '#ffffff', -.04); big(g, 'THEY DO', 380, 300, 110, '#ffffff', -.04); big(g, 'ALL DAY?', 380, 430, 122, '#f6c945', -.04);
      pill(g, 'the pyramid builders’ own diary', 380, 530, 30, '#f3e6cf');
    },
    g => {   // C: myth-buster — "NOT SLAVES?!"
      ES.giza(g, T0, 0, { v: 'gold', k: .85 }); shade(g, .6, .15);
      EP.fig(g, 'merer', 1010, 905, 1.12, { t: T0, pose: 'idle', prop: 'papyrus', turn: -.3, light: L.gold, face: { mouth: 'open', brows: 'up', eyes: 'wide', look: [-.5, .1] } });
      big(g, 'NOT', 330, 210, 120, '#ffffff', -.05); big(g, 'SLAVES?!', 360, 340, 140, '#f6c945', -.05);
      g.save(); g.translate(600, 92); g.rotate(.12); g.font = '700 30px Fredoka'; g.textAlign = 'center'; g.lineWidth = 5; g.strokeStyle = '#c8322a'; g.strokeRect(-90, -28, 180, 56); g.fillStyle = '#c8322a'; g.fillText('MYTH?', 0, 11); g.restore();
      pill(g, 'what a 4,500-year-old diary really says', 360, 450, 28, '#f3e6cf');
    },
  ];
  window.THUMB_N = THUMBS.length;
  window.makeThumb = async i => { await Promise.all([document.fonts.load('80px "Luckiest Guy"'), document.fonts.load('700 30px Fredoka')]);
    const c = Object.assign(document.createElement('canvas'), { width: W, height: H }), g = c.getContext('2d'); THUMBS[i](g); return c.toDataURL('image/png'); };
})(window);
