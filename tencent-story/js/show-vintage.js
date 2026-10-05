/* Full piece (~55 s): "How Tencent quietly bought into Western gaming" in a
 * vintage print-collage style. Narration is an edit of voice_1.mp3; beat
 * start times and in-beat pauses come from js/timing.js (tools/build-narration.py),
 * so hard cuts land on the voice's own pauses. All artwork is original. */
(function (G) {
  'use strict';
  const C = G.Collage, P = G.Print, { INK } = P, { M, O } = G.Props;
  const { W, H } = C;
  const T = G.TIMING;
  const BW = Math.round(W * 1.12), BH = Math.round(H * 1.12), OX = (BW - W) / 2, OY = (BH - H) / 2;

  const at = fn => g => { g.translate(OX, OY); fn(g); };
  const bustLayer = (which, args) => at(g => {
    const scratch = P.canvas(BW, BH).getContext('2d'); scratch.translate(OX, OY);
    const L = which === 'tone' ? { tone: g, key: scratch } : { tone: scratch, key: g };
    args.forEach(a => P.bust(L, ...a));
  });
  const solid = (color, fn, reg) => ({ color, solid: true, reg, draw: at(fn) });
  const dots = (color, cell, angle, fn, reg) => ({ color, cell, angle, reg, draw: at(fn) });
  const slab = (px, family = 'DejaVu Serif') => `bold ${px}px "${family}"`;
  const ital = px => `italic bold ${px}px "FreeSerif"`;
  const textMask = (g, s, x, y, font, o = {}) => {
    g.save(); g.translate(x, y); g.rotate(o.rot || 0); g.scale(o.sx || 1, 1);
    g.font = font; g.textAlign = o.align || 'center'; g.textBaseline = 'middle'; g.fillStyle = o.fill || '#000'; g.fillText(s, 0, 0); g.restore();
  };
  const glow = (cx, cy, r0, r1, a = .75) => g => {
    const grd = g.createRadialGradient(cx, cy, r0, cx, cy, r1);
    grd.addColorStop(0, `rgba(0,0,0,${a})`); grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd; g.fillRect(-80, -40, 1440, 800);
  };

  // Time helpers: beat start + k-th speech segment inside it.
  const B = id => T.beats[id];
  const seg = (id, k) => B(id).start + (k === 0 ? 0 : (B(id).pauses[k - 1] ?? B(id).dur * k / (B(id).pauses.length + 2)));

  const FIVE = [[200, 370, .62, { hair: 'flat' }], [420, 350, .62, { hair: 'wavy', glasses: true }], [640, 360, .66, { hair: 'part' }], [860, 350, .62, { hair: 'flat', glasses: true }], [1080, 370, .62, { hair: 'wavy' }]];
  const STUDIOS = ['RIOT', 'EPIC', 'SUPERCELL', 'UBISOFT', 'PARADOX', 'REMEDY', 'TECHLAND', 'KRAFTON', 'FROMSOFTWARE', 'FUNCOM', 'GRINDING GEAR'];

  // Each shot: at (absolute start), build, overlay(ctx, lt), zoom, drift. End = next shot's start.
  const shots = [
    // ---- B1: founding ----
    { at: seg('founding', 0), zoom: [1, 1.07], drift: [-20, 0],
      build: () => P.plate(BW, BH, INK.mustard, [
        dots(INK.red, 9, .5, glow(1010, 300, 20, 330)),
        solid(INK.red, g => { g.save(); g.translate(1000, 200); g.rotate(-.05); g.fillRect(-150, -80, 300, 160); g.globalCompositeOperation = 'destination-out'; textMask(g, 'NOV.', 0, 8, slab(120), { sx: .85 }); g.restore(); }, [3, 2]),
        solid(INK.black, g => { g.save(); g.translate(70, 560); g.rotate(-.06); g.font = ital(360); g.fillText('1998', 0, 0); g.restore(); }),
      ], 11),
      overlay: (ctx, lt) => P.strip(ctx, 'In November…', 330, 120, { lt: lt - .35, bg: INK.black, fg: INK.yellow, size: 56, rot: -.05, seed: 12 }) },
    { at: seg('founding', 1), zoom: [1.04, 1], drift: [0, 10],
      build: () => P.plate(BW, BH, INK.cream, [
        solid(INK.mustard, g => g.fillRect(-80, 230, 1440, 330)),
        { color: INK.red, cell: 6, angle: .26, draw: bustLayer('tone', FIVE) }, { ...dots(INK.black, 5, .78, null, [2, 1]), draw: bustLayer('key', FIVE) },
      ], 21),
      overlay: (ctx, lt) => P.strip(ctx, 'five young men', 640, 640, { lt: lt - .1, size: 58, rot: .03, seed: 22 }) },
    { at: seg('founding', 1) + 1.29, zoom: [1, 1.06], drift: [25, 0],
      build: () => P.plate(BW, BH, INK.cream, [
        dots(INK.teal, 8, .4, g => { const grd = g.createLinearGradient(0, -40, 0, 560); grd.addColorStop(0, 'rgba(0,0,0,.85)'); grd.addColorStop(1, 'rgba(0,0,0,.05)'); g.fillStyle = grd; g.fillRect(-80, -40, 1440, 640); }),
        solid(INK.red, g => { g.beginPath(); g.arc(940, 330, 120, 0, 7); g.fill(); }, [2, 0]),
        dots(INK.black, 5, .78, g => { P.skyline(g, -60, 640, 1420, 8); g.fillRect(-80, 636, 1440, 120); }),
      ], 31),
      overlay(ctx, lt) {
        P.strip(ctx, 'SHENZHEN', 360, 150, { lt: lt - .15, font: slab(92), size: 92, squash: .82, bg: INK.red, fg: INK.cream, rot: -.04, seed: 32 });
        P.strip(ctx, 'a small software company', 820, 470, { lt: lt - 1.0, size: 46, rot: .035, seed: 33 });
      } },
    // ---- B3: QQ ----
    { at: seg('qq', 0), zoom: [1.05, 1], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.mustard, [
        dots(INK.red, 10, .5, glow(780, 380, 40, 420, .8)),
        solid(INK.black, g => textMask(g, 'QQ', 780, 400, slab(420), { sx: .9 })),
      ], 61),
      overlay(ctx, lt) {
        P.strip(ctx, 'OICQ', 240, 190, { lt: lt - .05, font: slab(64), size: 64, squash: .9, rot: -.08, seed: 62 });
        if (lt > .5) { ctx.save(); ctx.strokeStyle = INK.red; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, 205); ctx.lineTo(150 + 180 * C.clamp((lt - .5) / .15), 170); ctx.stroke(); ctx.restore(); }
        P.strip(ctx, 'just two letters', 260, 600, { lt: lt - .9, size: 50, bg: INK.black, fg: INK.yellow, rot: .03, seed: 63 });
      } },

    // ---- B4: Naspers $32M ----
    { at: seg('naspers', 0), zoom: [1, 1.06], drift: [-15, 0],
      build: () => P.plate(BW, BH, INK.cream, [
        dots(INK.teal, 7, .3, g => M.globe(g, 330, 380, 230)),
        solid(INK.black, g => { textMask(g, '2001', 900, 250, ital(220)); }),
      ], 71),
      overlay(ctx, lt) {
        P.strip(ctx, 'NASPERS', 330, 120, { lt: lt - .2, font: slab(70), size: 70, squash: .85, bg: INK.red, fg: INK.cream, rot: -.04, seed: 72 });
        P.strip(ctx, 'South African media group, est. 1915', 880, 430, { lt: lt - .7, font: 'bold 24px "DejaVu Sans Mono"', size: 24, rot: .02, seed: 73 });
      } },
    { at: seg('naspers', 1) - .1, zoom: [1.06, 1], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.paper, [
        solid(INK.black, g => P.newsprint(g, 60, 60, 1160, 600, { cols: 4, size: 16, seed: 74, color: 'rgba(0,0,0,.55)' })),
        dots(INK.red, 7, .5, g => M.pie(g, 950, 380, 230, .465)),
      ], 75),
      overlay(ctx, lt) {
        O.block(ctx, lt - .05, 400, 330, 520, 250, { rot: -.04, seed: 76, draw: c => { O.text(c, '$32', 0, -30, slab(150), INK.cream); O.text(c, 'MILLION', 0, 80, slab(54), INK.cream); } });
        P.strip(ctx, '46.5% stake', 960, 640, { lt: lt - (seg('naspers', 2) - seg('naspers', 1)), size: 56, bg: INK.yellow, rot: -.04, seed: 77 });
      } },

    // ---- B5: best investment ----
    { at: seg('bestbet', 0), zoom: [1, 1.05], drift: [0, -10],
      build: () => P.plate(BW, BH, INK.cream, [
        solid(INK.black, g => { g.lineWidth = 4; g.strokeStyle = '#000'; g.beginPath(); g.moveTo(120, 80); g.lineTo(120, 640); g.lineTo(1180, 640); g.stroke(); for (let x = 220; x < 1180; x += 120) g.fillRect(x, 636, 3, 14); }),
        dots(INK.black, 4, .78, g => { g.fillStyle = 'rgba(0,0,0,.12)'; for (let y = 140; y < 640; y += 100) g.fillRect(120, y, 1060, 2); }),
      ], 81),
      overlay(ctx, lt, dur) {
        const pts = [[130, 630], [300, 625], [450, 610], [600, 590], [740, 540], [860, 460], [960, 340], [1060, 200], [1150, 90]];
        O.chart(ctx, pts, C.clamp(lt / (dur * .8)), { color: INK.red, width: 12 });
        P.strip(ctx, '$32M', 220, 580, { lt: lt - .05, font: slab(40), size: 40, rot: -.03, seed: 82 });
        P.strip(ctx, '≈ $130 BILLION', 900, 110, { lt: lt - dur * .75, font: slab(54), size: 54, bg: INK.red, fg: INK.cream, squash: .85, rot: -.05, seed: 83 });
        P.strip(ctx, 'by 2019', 1010, 190, { lt: lt - dur * .8, size: 36, rot: .03, seed: 84 });
      } },

    // ---- B6: Riot $400M ----
    { at: seg('riot', 0), zoom: [1, 1.06], drift: [20, 0],
      build: () => P.plate(BW, BH, INK.teal, [
        dots(INK.black, 6, .78, g => { P.skyline(g, -60, 720, 1420, 21); }),
      ], 91),
      overlay(ctx, lt) {
        P.strip(ctx, 'LOS ANGELES', 260, 90, { lt: lt - .05, font: slab(48), size: 48, squash: .85, rot: -.04, seed: 92 });
        O.cheque(ctx, lt - .3, 640, 380, 'RIOT GAMES', '$400M', { year: 'FEB 2011', seed: 93 });
        O.stampRed(ctx, lt - (seg('riot', 1) - seg('riot', 0)), '93%', 1080, 230, { size: 70 });
      } },

    // ---- B7: Epic $330M ----
    { at: seg('epic', 0), zoom: [1.06, 1], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.mustard, [
        dots(INK.red, 9, .4, glow(640, 360, 60, 520, .6)),
        dots(INK.black, 6, .78, g => { g.fillStyle = 'rgba(0,0,0,.8)'; for (let i = 0; i < 9; i++) { const x = 40 + i * 150; g.beginPath(); g.moveTo(x, 720); g.lineTo(x + 40, 520 + (i % 3) * 30); g.lineTo(x + 80, 720); g.fill(); } }),
      ], 101),
      overlay(ctx, lt) {
        P.strip(ctx, 'CARY, NORTH CAROLINA', 330, 90, { lt: lt - .05, font: slab(40), size: 40, squash: .85, rot: -.03, seed: 102 });
        O.cheque(ctx, lt - .3, 640, 380, 'EPIC GAMES', '$330M', { year: 'JUN 2012', rot: .04, seed: 103 });
      } },

    // ---- B9: other people's brands (one cut per sentence) ----
    ...[['RIOT', INK.red, 'DejaVu Serif'], ['EPIC', INK.black, 'DejaVu Sans'], ['SUPERCELL', INK.teal, 'FreeSerif']].map(([name, color, fam], i) => ({
      at: seg('brands', i), zoom: [1, 1.05], drift: [i % 2 ? 15 : -15, 0],
      build: () => P.plate(BW, BH, i === 1 ? INK.mustard : INK.cream, [
        solid(INK.black, g => P.newsprint(g, 60, 60, 1160, 600, { cols: 4, size: 16, seed: 120 + i, color: 'rgba(0,0,0,.4)' })),
      ], 121 + i),
      overlay(ctx, lt) {
        O.box(ctx, lt - .02, 470, 370, name, color, { font: `bold ${name.length > 5 ? 40 : 72}px "${fam}"`, rot: -.04 + i * .04, seed: 131 + i });
        P.strip(ctx, `${name[0]}${name.slice(1).toLowerCase()} is still ${name[0]}${name.slice(1).toLowerCase()}.`, 930, 560, { lt: lt - .15, size: 50, bg: INK.cream, rot: .03, seed: 134 + i });
        P.strip(ctx, 'TENCENT', 720, 170, { lt: lt - .5, font: 'bold 18px "DejaVu Sans Mono"', size: 18, bg: INK.yellow, rot: .12, seed: 137 + i }); // the quiet owner, tucked behind
      } })),
    { at: seg('brands', 3), zoom: [1.1, 1], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.paper, [
        solid(INK.black, g => P.newsprint(g, 40, 40, 1200, 640, { cols: 5, size: 15, seed: 140, color: 'rgba(0,0,0,.35)' })),
      ], 141),
      overlay(ctx, lt) {
        const pos = [[180, 140], [450, 110], [780, 130], [1090, 150], [220, 300], [1080, 320], [170, 470], [1060, 480], [300, 620], [640, 640], [980, 620]];
        STUDIOS.forEach((s, i) => {
          const [x, y] = pos[i];
          ctx.save(); ctx.strokeStyle = 'rgba(181,64,44,.8)'; ctx.lineWidth = 2.5; ctx.setLineDash([8, 6]);
          if (lt > .6) { ctx.beginPath(); ctx.moveTo(640, 380); ctx.lineTo(C.lerp(640, x, C.clamp((lt - .6) / .5)), C.lerp(380, y, C.clamp((lt - .6) / .5))); ctx.stroke(); }
          ctx.restore();
          P.strip(ctx, s, x, y, { lt: lt - i * .06, font: slab(30), size: 30, squash: .85, bg: [INK.cream, INK.mustard, INK.cream, INK.teal][i % 4], fg: i % 4 === 3 ? INK.cream : INK.black, rot: (i % 3 - 1) * .05, seed: 150 + i });
        });
        P.strip(ctx, 'TENCENT', 640, 380, { lt: lt - .5, font: slab(64), size: 64, squash: .85, bg: INK.red, fg: INK.cream, rot: -.03, seed: 149 });
        P.strip(ctx, 'other people’s brands', 640, 470, { lt: lt - 1.1, size: 40, bg: INK.black, fg: INK.yellow, rot: .02, seed: 148 });
      } },

    // ---- B10: two problems ----
    { at: seg('problem', 0), zoom: [1, 1.08], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.black, [
        dots(INK.red, 9, .4, glow(640, 380, 60, 420, .7)),
        { ...solid(INK.cream, g => textMask(g, '2', 640, 400, ital(520))), blend: 'source-over' },
      ], 161),
      overlay: (ctx, lt) => P.strip(ctx, 'problems', 870, 560, { lt: lt - (seg('problem', 1) - seg('problem', 0)), size: 60, bg: INK.yellow, rot: -.05, seed: 162 }) },
    { at: seg('problem', 2), zoom: [1, 1.05], drift: [-20, 0],
      build: () => P.plate(BW, BH, INK.red, [
        dots(INK.black, 6, .78, g => P.skyline(g, -60, 720, 760, 33)),
        solid(INK.mustard, g => { for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 4 / 5, r = 60; g.lineTo ? 0 : 0; } g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 26 : 64; g.lineTo(1000 + Math.cos(a) * r, 200 + Math.sin(a) * r); } g.closePath(); g.fill(); }),
      ], 171),
      overlay: (ctx, lt) => P.strip(ctx, 'BEIJING', 900, 420, { lt: lt - .05, font: slab(110), size: 110, squash: .85, bg: INK.cream, fg: INK.red, rot: -.04, seed: 172 }) },
    { at: seg('problem', 3), zoom: [1.05, 1], drift: [20, 0],
      build: () => P.plate(BW, BH, INK.navy, [
        { blend: 'source-over', ...dots(INK.cream, 6, .5, g => { g.fillStyle = 'rgba(0,0,0,.6)'; g.beginPath(); g.ellipse(640, 470, 260, 130, 0, Math.PI, 0); g.fill(); g.fillRect(380, 470, 520, 160); g.beginPath(); g.ellipse(640, 330, 70, 90, 0, Math.PI, 0); g.fill(); g.fillRect(560, 330, 160, 40); g.fillRect(630, 210, 20, 40); g.beginPath(); g.arc(640, 205, 14, 0, 7); g.fill(); g.globalCompositeOperation = 'destination-out'; for (let x = 405; x < 890; x += 34) g.fillRect(x, 500, 12, 120); for (let x = 575; x < 715; x += 26) g.fillRect(x, 340, 9, 26); g.fillRect(380, 470, 520, 10); g.globalCompositeOperation = 'source-over'; }) },
      ], 181),
      overlay: (ctx, lt) => P.strip(ctx, 'WASHINGTON', 640, 160, { lt: lt - .05, font: slab(100), size: 100, squash: .85, bg: INK.cream, fg: INK.navy, rot: .03, seed: 182 }) },

    // ---- B12: Pentagon list ----
    { at: seg('pentagon', 0), zoom: [1, 1.06], drift: [-10, 0],
      build: () => P.plate(BW, BH, INK.navy, [
        { blend: 'source-over', ...dots(INK.cream, 7, .5, g => M.pentagon(g, 360, 380, 260, true)) },
        { blend: 'source-over', ...solid(INK.cream, g => { g.save(); g.translate(890, 380); g.rotate(.04); g.fillRect(-200, -260, 400, 520); g.restore(); }) },
        solid(INK.black, g => { g.save(); g.translate(890, 380); g.rotate(.04); for (let i = 0; i < 12; i++) g.fillRect(-160, -170 + i * 36, 220 + (i * 53 % 90), 6); g.fillRect(-60, -250, 120, 36); g.restore(); }),
      ], 201),
      overlay(ctx, lt) {
        P.strip(ctx, 'JANUARY 2025', 330, 90, { lt: lt - .05, font: slab(40), size: 40, squash: .85, rot: -.03, seed: 202 });
        O.stampRed(ctx, lt - (seg('pentagon', 1) - seg('pentagon', 0)) - .3, 'SECTION 1260H', 890, 400, { size: 54, rot: -.18 });
      } },

    // ---- B13: keep its stakes? ----
    { at: seg('stakes', 0), zoom: [1, 1.05], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.cream, [
        dots(INK.red, 9, .4, glow(640, 360, 60, 560, .5)),
      ], 211),
      overlay(ctx, lt, dur) {
        [['EPIC', 330], ['RIOT', 640], ['SUPERCELL', 950]].forEach(([n, x], i) => O.tag(ctx, lt - .1 - i * .12, x, 330, n, { seed: 212 + i, size: 50, font: slab(50) }));
        P.strip(ctx, 'keep its stakes… at all?', 640, 560, { lt: lt - dur * .5, size: 56, bg: INK.black, fg: INK.yellow, rot: -.03, seed: 216 });
      },
      after(ctx, lt, dur) { // scissors creep in toward the strings
        const k = C.clamp(lt / dur);
        const cv = ctx; cv.save(); cv.translate(C.lerp(1450, 1060, k), 170); cv.rotate(Math.PI);
        cv.fillStyle = INK.black; cv.globalAlpha = .9;
        const m = P.canvas(500, 300), g = m.getContext('2d'); g.translate(250, 150); M.scissors(g, 0, 0, .8, .25 + .15 * Math.sin(lt * 9));
        cv.drawImage(m, -250, -150); cv.restore();
      } },

    // ---- B14: two governments + end card ----
    { at: seg('ending', 0), zoom: [1, 1.04], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.paper, [
        solid(INK.red, g => g.fillRect(-80, -40, 720, 800)),
        solid(INK.navy, g => g.fillRect(640, -40, 720, 800)),
        dots(INK.black, 6, .78, g => { M.hand(g, 300, 380, 1, false); M.hand(g, 980, 380, 1, true); }),
      ], 221),
      overlay(ctx, lt, dur) {
        const tug = Math.sin(lt * 3) * 18;
        ctx.save(); ctx.strokeStyle = INK.cream; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(360 + tug, 380); ctx.lineTo(920 + tug, 380); ctx.stroke(); ctx.restore();
        ['EPIC', 'RIOT', 'SUPERCELL'].forEach((n, i) => {
          const x = 500 + i * 140 + tug;
          ctx.save(); ctx.strokeStyle = INK.cream; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, 380); ctx.lineTo(x, 440); ctx.stroke(); ctx.restore();
          P.strip(ctx, n, x, 465, { lt: lt - .1, font: slab(26), size: 26, squash: .85, rot: (i - 1) * .06, seed: 222 + i });
        });
        const p1 = seg('ending', 1) - seg('ending', 0);
        P.strip(ctx, 'players?', 300, 140, { lt: lt - .3, size: 46, rot: -.05, seed: 226 });
        P.strip(ctx, 'markets?', 980, 140, { lt: lt - .9, size: 46, rot: .04, seed: 227 });
        if (lt > p1 - .1) for (const [x, y] of [[300, 140], [980, 140]]) { ctx.save(); ctx.strokeStyle = INK.black; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 110, y + 10); ctx.lineTo(x + 110, y - 10); ctx.stroke(); ctx.restore(); }
        P.strip(ctx, 'two governments.', 640, 620, { lt: lt - (p1 + .9), size: 70, bg: INK.yellow, rot: -.02, seed: 228 });
      } },
    { at: B('ending').start + B('ending').dur + .25, zoom: [1, 1.05], drift: [0, 0],
      build: () => P.plate(BW, BH, INK.black, [dots(INK.red, 10, .4, glow(640, 360, 40, 520, .6))], 231),
      overlay(ctx, lt) {
        C.ransom(ctx, 'WHO OWNS THE GAME?', 640, 330, { size: 64, seed: 232, p: C.clamp(lt / .8) });
        P.strip(ctx, 'For educational purposes only. Not investment advice.', 640, 520, { lt: lt - 1.0, font: '20px "DejaVu Sans Mono"', size: 20, rot: 0, seed: 233 });
      },
      after(ctx, lt) { const k = C.clamp((lt - 3.0) / .6); if (k > 0) { ctx.fillStyle = `rgba(10,8,6,${k})`; ctx.fillRect(0, 0, W, H); } } },
  ];

  shots.forEach((s, i) => { s.start = s.at; s.end = i + 1 < shots.length ? shots[i + 1].at : T.duration + 1; });

  // Paper slaps follow every strip's pop; derive them roughly from shot starts.
  const SFX = shots.flatMap(s => [{ t: s.start + .12, type: 'slap', gain: .6 }]);
  SFX.push({ t: seg('pentagon', 1) + .3, type: 'thud' }, { t: seg('riot', 1), type: 'thud', gain: .7 }, { t: seg('qq', 0) + .55, type: 'snip' });

  G.Show = { duration: T.duration, narration: 'assets/audio/narration-full.mp3', style: 'jazz', sfx: SFX, scenes: P.shotsToScenes(shots) };
})(window);
