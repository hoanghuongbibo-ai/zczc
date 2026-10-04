/* ~14 s preview, vintage print-collage cut. Same narration clip as the doodle
 * preview; hard cuts land on the pauses in the voice:
 *  0.00 "In November 1998,"         2.26 "five young men"
 *  3.55 "in Shenzhen started a small software company."
 *  6.16 "Their leader was Ma Huateng."   8.16 "In English, he goes by Pony,"
 *  9.71 "a play on his family name, Ma, which means"   12.10 "horse." */
(function (G) {
  'use strict';
  const C = G.Collage, P = G.Print, { INK } = P;
  const { W, H } = C;
  const BW = Math.round(W * 1.12), BH = Math.round(H * 1.12), OX = (BW - W) / 2, OY = (BH - H) / 2;

  // Draw layer content in 1280x720 coordinates inside the oversized plate.
  const at = fn => g => { g.translate(OX, OY); fn(g); };
  // Bust needs two masks at once; render it into one and discard the other.
  const bustLayer = (which, args) => at(g => {
    const scratch = P.canvas(BW, BH).getContext('2d'); scratch.translate(OX, OY);
    const L = which === 'tone' ? { tone: g, key: scratch } : { tone: scratch, key: g };
    args.forEach(a => P.bust(L, ...a));
  });

  function block(ctx, x, y, w, h, o = {}) { // flat ink block pasted on, scissor-cut
    if ((o.lt ?? 1) < 0) return;
    const slap = o.lt < .07 ? 1.06 : 1, r = C.rng(o.seed || 5);
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(slap, slap);
    const p = [[-w / 2 + r() * 5, -h / 2 + r() * 4], [w / 2 - r() * 5, -h / 2 + r() * 4], [w / 2 - r() * 5, h / 2 - r() * 4], [-w / 2 + r() * 5, h / 2 - r() * 4]];
    ctx.save(); ctx.translate(5, 7); C.pathPts(ctx, p); ctx.fillStyle = 'rgba(20,12,5,0.35)'; ctx.fill(); ctx.restore();
    C.pathPts(ctx, p); ctx.fillStyle = o.color || INK.red; ctx.fill();
    ctx.save(); ctx.clip(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .5; ctx.fillStyle = P.textureOf(ctx); ctx.fillRect(-w, -h, w * 2, h * 2); ctx.restore();
    if (o.draw) o.draw(ctx);
    ctx.restore();
  }

  const FIVE = [[200, 370, .62, { hair: 'flat' }], [420, 350, .62, { hair: 'wavy', glasses: true }], [640, 360, .66, { hair: 'part' }], [860, 350, .62, { hair: 'flat', glasses: true }], [1080, 370, .62, { hair: 'wavy' }]];

  const shots = [
    { // 1 — "In November 1998"
      start: 0, end: 2.26, zoom: [1.0, 1.07], drift: [-20, 0],
      build: () => P.plate(BW, BH, INK.mustard, [
        { color: INK.red, cell: 9, angle: .5, draw: at(g => { const grd = g.createRadialGradient(1010, 300, 20, 1010, 300, 330); grd.addColorStop(0, 'rgba(0,0,0,.75)'); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = grd; g.fillRect(600, -40, 800, 760); }) },
        { color: INK.red, solid: true, reg: [3, 2], draw: at(g => {
          g.save(); g.translate(1000, 200); g.rotate(-.05); g.fillRect(-150, -80, 300, 160);
          g.globalCompositeOperation = 'destination-out'; g.font = 'bold 120px "DejaVu Serif"'; g.textAlign = 'center'; g.textBaseline = 'middle';
          g.save(); g.scale(.85, 1); g.fillText('NOV.', 0, 8); g.restore(); g.restore();
        }) },
        { color: INK.black, solid: true, draw: at(g => {
          g.save(); g.translate(70, 560); g.rotate(-.06); g.font = 'italic bold 360px "FreeSerif"'; g.fillText('1998', 0, 0); g.restore();
        }) },
      ], 11),
      overlay(ctx, lt) {
        P.strip(ctx, 'In November…', 330, 120, { lt: lt - .35, bg: INK.black, fg: INK.yellow, size: 56, rot: -.05, seed: 12 });
      },
    },
    { // 2 — "five young men"
      start: 2.26, end: 3.55, zoom: [1.04, 1.0], drift: [0, 10],
      build: () => P.plate(BW, BH, INK.cream, [
        { color: INK.mustard, solid: true, draw: at(g => { g.fillRect(-80, 230, 1440, 330); }) },
        { color: INK.black, cell: 4, alpha: .2, solid: false, draw: at(g => { g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(-80, 560, 1440, 200); }) },
        { color: INK.red, cell: 6, angle: .26, draw: bustLayer('tone', FIVE) },
        { color: INK.black, cell: 5, angle: .78, reg: [2, 1], draw: bustLayer('key', FIVE) },
      ], 21),
      overlay(ctx, lt) {
        P.strip(ctx, 'five young men', 640, 640, { lt: lt - .1, size: 58, rot: .03, seed: 22 });
      },
    },
    { // 3 — "in Shenzhen started a small software company"
      start: 3.55, end: 6.16, zoom: [1.0, 1.06], drift: [25, 0],
      build: () => P.plate(BW, BH, INK.cream, [
        { color: INK.teal, cell: 8, angle: .4, draw: at(g => { const grd = g.createLinearGradient(0, -40, 0, 560); grd.addColorStop(0, 'rgba(0,0,0,.85)'); grd.addColorStop(1, 'rgba(0,0,0,.05)'); g.fillStyle = grd; g.fillRect(-80, -40, 1440, 640); }) },
        { color: INK.red, solid: true, reg: [2, 0], draw: at(g => { g.beginPath(); g.arc(940, 330, 120, 0, 7); g.fill(); }) },
        { color: INK.black, cell: 5, angle: .78, draw: at(g => { P.skyline(g, -60, 640, 1420, 8); g.fillStyle = 'rgba(0,0,0,1)'; g.fillRect(-80, 636, 1440, 120); }) },
        { color: INK.black, solid: true, alpha: .9, draw: at(g => { g.fillStyle = '#000'; g.fillRect(-80, 690, 1440, 60); }) },
      ], 31),
      overlay(ctx, lt) {
        P.strip(ctx, 'SHENZHEN', 360, 150, { lt: lt - .15, font: 'bold 92px "DejaVu Serif"', size: 92, squash: .82, bg: INK.red, fg: INK.cream, rot: -.04, seed: 32 });
        P.strip(ctx, 'a small software company', 820, 470, { lt: lt - 1.0, size: 46, rot: .035, seed: 33 });
        P.strip(ctx, 'EST. 1998', 1060, 560, { lt: lt - 1.6, font: 'bold 30px "DejaVu Sans Mono"', size: 30, bg: INK.yellow, rot: -.06, seed: 34 });
      },
    },
    { // 4 — "Their leader was Ma Huateng."
      start: 6.16, end: 8.16, zoom: [1.0, 1.07], drift: [-30, -10],
      build: () => P.plate(BW, BH, '#d8ccad', [
        { color: INK.black, solid: true, draw: at(g => { g.fillRect(-80, -40, 760, 800); }) },
        { color: INK.teal, cell: 7, angle: .3, draw: at(g => { const grd = g.createLinearGradient(80, 0, 200, 0); grd.addColorStop(0, 'rgba(0,0,0,0)'); grd.addColorStop(.5, 'rgba(0,0,0,.8)'); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = grd; g.fillRect(60, 380, 180, 400); }) },
        { color: INK.red, cell: 7, angle: .26, draw: bustLayer('tone', [[930, 300, 1.75, { hair: 'part' }]]) },
        { color: INK.black, cell: 6, angle: .78, reg: [3, 1], draw: bustLayer('key', [[930, 300, 1.75, { hair: 'part' }]]) },
      ], 41),
      overlay(ctx, lt) {
        P.strip(ctx, '“Their leader…', 330, 250, { lt: lt - .1, bg: 'none', fg: INK.yellow, size: 62, rot: -.07, seed: 42 });
        P.strip(ctx, 'Ma Huateng', 360, 360, { lt: lt - .55, bg: INK.black, fg: INK.yellow, size: 86, rot: -.07, seed: 43 });
      },
    },
    { // 5 — "In English, he goes by Pony,"
      start: 8.16, end: 9.71, zoom: [1.06, 1.0], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.mustard, [
        { color: INK.red, cell: 7, angle: .26, draw: bustLayer('tone', [[1090, 330, 1.35, { hair: 'part' }]]) },
        { color: INK.black, cell: 6, angle: .78, reg: [2, 2], draw: bustLayer('key', [[1090, 330, 1.35, { hair: 'part' }]]) },
        { color: INK.black, solid: true, draw: at(g => { g.save(); g.translate(60, 470); g.rotate(-.08); g.font = 'italic bold 330px "FreeSerif"'; g.fillText('Pony', 0, 0); g.restore(); }) },
      ], 51),
      overlay(ctx, lt) {
        P.strip(ctx, 'In English, he goes by…', 330, 130, { lt: lt - .05, size: 44, rot: -.03, seed: 52 });
      },
    },
    { // 6 — "a play on his family name, Ma, which means"
      start: 9.71, end: 12.1, zoom: [1.0, 1.05], drift: [0, -12],
      build: () => P.plate(BW, BH, INK.paper, [
        { color: INK.black, solid: true, alpha: .85, draw: at(g => {
          g.font = 'bold 104px "DejaVu Serif"'; g.save(); g.translate(560, 120); g.scale(.78, 1); g.textAlign = 'center'; g.fillText('FAMILY NAME!', 0, 0); g.restore();
          P.newsprint(g, 90, 175, 1100, 520, { cols: 3, size: 17, seed: 61, color: '#000' });
        }) },
        { color: INK.black, cell: 6, angle: .78, alpha: .9, draw: at(g => { g.font = 'bold 560px "DejaVu Serif"'; g.fillStyle = 'rgba(0,0,0,.35)'; g.fillText('M', -40, 690); }) },
      ], 61),
      overlay(ctx, lt) {
        P.strip(ctx, 'a play on his family name', 400, 230, { lt: lt - .15, size: 42, rot: -.04, seed: 62 });
        block(ctx, 700, 430, 330, 300, { lt: lt - 1.4, rot: .04, seed: 63, draw: c => {
          c.fillStyle = INK.cream; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.font = 'bold 190px "WenQuanYi Zen Hei"'; c.fillText('马', 0, -30);
          c.font = 'bold 64px "DejaVu Serif"'; c.fillText('MA', 0, 108);
        } });
      },
    },
    { // 7 — "horse."
      start: 12.1, end: 14.0, zoom: [1.0, 1.08], drift: [-20, 0],
      build: () => P.plate(BW, BH, INK.cream, [
        { color: INK.red, solid: true, reg: [3, 2], draw: at(g => { g.beginPath(); g.arc(560, 360, 270, 0, 7); g.fill(); }) },
        { color: INK.mustard, cell: 9, angle: .5, draw: at(g => { const grd = g.createRadialGradient(560, 360, 270, 560, 360, 520); grd.addColorStop(0, 'rgba(0,0,0,.7)'); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = grd; g.fillRect(-80, -40, 1440, 800); }) },
        { color: INK.black, cell: 5, angle: .78, draw: at(g => P.horse(g, 330, 190, 1.2)) },
      ], 71),
      overlay(ctx, lt) {
        P.strip(ctx, '= horse.', 1010, 560, { lt: lt - .2, size: 80, bg: INK.yellow, rot: -.05, seed: 72 });
      },
      after(ctx, lt) { // fade out to black at the end
        const k = C.clamp((lt - 1.3) / .6);
        if (k > 0) { ctx.fillStyle = `rgba(16,12,9,${k})`; ctx.fillRect(0, 0, W, H); }
      },
    },
  ];

  const SFX = [
    { t: .35, type: 'slap' }, { t: 2.36, type: 'slap' }, { t: 3.7, type: 'slap' }, { t: 4.55, type: 'slap' }, { t: 5.15, type: 'slap', gain: .7 },
    { t: 6.26, type: 'slap', gain: .6 }, { t: 6.71, type: 'slap' }, { t: 8.21, type: 'slap' }, { t: 9.86, type: 'slap' },
    { t: 11.11, type: 'thud', gain: .7 }, { t: 12.3, type: 'slap' },
  ];

  G.Preview = {
    duration: 14,
    narration: 'assets/audio/narration-preview.mp3',
    style: 'jazz',
    sfx: SFX,
    scenes: P.shotsToScenes(shots),
  };
})(window);
