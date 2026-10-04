/* ~14 s preview: Chapter 1 opening — "In November 1998, five young men in
 * Shenzhen started a small software company. Their leader was Ma Huateng.
 * In English, he goes by Pony, a play on his family name, Ma, which means horse."
 * Cue times are aligned to the narration clip (assets/audio/narration-preview.mp3). */
(function (G) {
  'use strict';
  const C = G.Collage;
  const { PAL, prog, ease, lerp, clamp } = C;

  const DURATION = 14;
  const SHIRTS = [PAL.red, PAL.teal, PAL.blue, PAL.pink, PAL.green];
  const FIG_X = [400, 520, 640, 760, 880];
  const GROUND = 610;

  const SFX = [
    { t: 0.12, type: 'whoosh', gain: .7 },
    { t: 0.95, type: 'thud' },
    { t: 2.05, type: 'whoosh' },
    ...FIG_X.map((_, i) => ({ t: 2.9 + i * .28, type: 'pop' })),
    { t: 4.55, type: 'snip' },
    { t: 5.0, type: 'thud', gain: .8 },
    { t: 6.45, type: 'snip' },
    { t: 9.05, type: 'ding' },
    { t: 11.1, type: 'thud', gain: .6 },
    { t: 12.0, type: 'flip' },
    { t: 12.25, type: 'slide' },
    { t: 12.7, type: 'pop', gain: .8 },
  ];

  function bubble(ctx, x, y, text, k) {
    if (k <= 0) return;
    const s = ease.outBack(k);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.06);
    C.cutout(ctx, [[-70, -34], [70, -34], [76, 26], [-10, 30], [-34, 58], [-30, 30], [-76, 26]], { fill: PAL.white, seed: 610, tear: 2.5 });
    ctx.fillStyle = C.INK; ctx.font = 'bold italic 30px "DejaVu Serif"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, -2);
    ctx.restore();
  }

  function hanzi(ctx, x, y, k) { // the character 马 ("horse") on a red scrap
    if (k <= 0) return;
    const s = ease.outBack(k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(-.1 + (1 - k) * .8); ctx.scale(s, s);
    C.cutout(ctx, C.rectPts(-48, -52, 96, 104, 2), { fill: PAL.red, seed: 620, tear: 4 });
    ctx.fillStyle = PAL.white; ctx.font = 'bold 76px "WenQuanYi Zen Hei"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('马', 0, 4);
    ctx.restore();
    C.label(ctx, 'Ma = horse', x - 6, y - 78, { size: 20, rot: .06, seed: 621, scale: s, tape: false });
  }

  function drawPreview(ctx, t) {
    C.background(ctx);

    // ---- camera: push in on the leader 5.9–7.0 s, ease back a touch at the end ----
    const zin = ease.inOut(prog(t, 5.9, 7.0)), zout = ease.inOut(prog(t, 12.8, 13.8)) * .25;
    const zoom = 1 + .75 * zin - zout, fx = 640, fy = lerp(360, 445, zin);
    ctx.save();
    ctx.translate(640, 360); ctx.scale(zoom, zoom); ctx.translate(-fx, -fy);

    // ---- Shenzhen skyline rises (2.2–3.0 s) ----
    const rise = (1 - ease.outCubic(prog(t, 2.2, 3.0))) * 420;
    ctx.save(); ctx.translate(0, rise);
    if (t > 2.2) {
    C.sun(ctx, 1090, 200, 46);
    C.cloud(ctx, 260 + t * 8, 180, .9, 71); C.cloud(ctx, 820 - t * 5, 140, .7, 72);
    const B = [[90, 120, 210, PAL.grey], [215, 90, 150, PAL.kraft], [310, 70, 260, '#a9b8c7'], [390, 110, 180, PAL.mustard],
      [880, 100, 230, '#a9b8c7'], [985, 80, 160, PAL.grey], [1070, 130, 200, PAL.kraft]];
    B.forEach(([x, w, h, f], i) => C.building(ctx, x, GROUND, w, h, { fill: f, seed: 50 + i * 13 }));
    C.palm(ctx, 175, GROUND, .9, 81); C.palm(ctx, 1215, GROUND, 1, 82);
    }
    ctx.restore();

    // ground strip
    ctx.save(); ctx.translate(0, rise * .6);
    C.cutout(ctx, C.rectPts(-40, GROUND - 6, 1360, 200, 6), { fill: PAL.green, seed: 90, tear: 9, hatch: { gap: 12, seed: 90, angle: .3 } });
    ctx.restore();

    // ---- the little office drops in (5.0 s) ----
    const off = prog(t, 4.75, 5.05);
    if (off > 0) {
      const dy = (1 - ease.outCubic(off)) * -500;
      ctx.save(); ctx.translate(0, dy);
      C.cutout(ctx, C.rectPts(990, GROUND - 150, 190, 150, 3), { fill: PAL.cream, seed: 140, tear: 3 });
      C.cutout(ctx, [[975, GROUND - 148], [1085, GROUND - 215], [1195, GROUND - 148]], { fill: PAL.red, seed: 141, tear: 3 });
      C.cutout(ctx, C.rectPts(1060, GROUND - 70, 44, 70, 2), { fill: PAL.brown, seed: 142, tear: 2 });
      C.ink(ctx, C.rectPts(1005, GROUND - 120, 40, 34, 1), { seed: 143, width: 2 });
      C.ink(ctx, C.rectPts(1125, GROUND - 120, 40, 34, 1), { seed: 144, width: 2 });
      C.label(ctx, 'small software co.', 1085, GROUND - 250, { size: 17, rot: -.05, seed: 145 });
      ctx.restore();
    }

    // ---- five young men pop in (2.9 s +) ----
    const flip = prog(t, 12.0, 12.2), horseIn = prog(t, 12.2, 12.5);
    const figure = (x, i) => {
      const k = prog(t, 2.85 + i * .28, 3.2 + i * .28);
      if (k <= 0) return;
      const hop = Math.abs(Math.sin(Math.PI * (t + i * .15) / .6)) * 5;
      const s = ease.outBack(k), lead = i === 2;
      C.person(ctx, x, GROUND - hop, s, { shirt: SHIRTS[i], seed: 200 + i * 17, wave: lead && t > 6.4 && t < 8.2, noHead: lead });
      if (!lead) return;
      ctx.save(); ctx.translate(x, GROUND - hop - 128 * s);
      if (flip < 1) { ctx.scale(1 - ease.inOut(flip), 1); C.head(ctx, 0, 0, {}, 200 + i * 17); }
      else { ctx.scale(ease.outBack(horseIn), 1); C.horseHead(ctx, 0, 6, 1.05); }
      ctx.restore();
    };
    FIG_X.forEach((x, i) => i !== 2 && figure(x, i));
    if (zin > 0) { // paper veil pushes the other four back while we meet the leader
      ctx.fillStyle = `rgba(244,234,213,${.45 * zin})`; ctx.fillRect(-200, -200, C.W + 400, C.H + 400);
    }
    figure(FIG_X[2], 2);

    // ---- labels ----
    const sz = prog(t, 4.5, 4.8);
    if (sz > 0) C.label(ctx, 'SHENZHEN', 230, 330 + rise, { size: 26, rot: -.08 + Math.sin(t * 2) * .02, seed: 160, scale: ease.outBack(sz) });
    const nm = prog(t, 6.4, 6.75);
    if (nm > 0) C.label(ctx, 'MA HUATENG', 640, 545, { size: 15, rot: .04 + Math.sin(t * 2.5) * .03, seed: 170, scale: ease.outBack(nm), tape: false });
    const pn = prog(t, 9.0, 9.3);
    if (pn > 0) C.label(ctx, '"PONY"', 805, 392, { size: 24, rot: .14, seed: 180, fill: PAL.mustard, scale: ease.outElastic(pn) });
    hanzi(ctx, 498, 382, prog(t, 11.05, 11.4));
    bubble(ctx, 728, 306, 'neigh?', prog(t, 12.65, 12.9));

    ctx.restore(); // camera

    // ---- calendar page + stamp (0.3–2.6 s), screen space ----
    const calIn = prog(t, .25, .65), calOut = prog(t, 2.0, 2.7);
    if (calIn > 0 && calOut < 1) {
      ctx.save();
      ctx.translate(330 - calOut * 500, 380 - calOut * 420 + (1 - ease.outBack(calIn)) * 500);
      ctx.rotate(-.05 - calOut * 1.4);
      C.cutout(ctx, C.rectPts(-130, -150, 260, 300, 3), { fill: PAL.white, seed: 120, tear: 3 });
      C.cutout(ctx, C.rectPts(-130, -150, 260, 70, 3), { fill: PAL.red, seed: 121, tear: 3, outline: false });
      for (let i = 0; i < 5; i++) C.ink(ctx, C.ellipsePts(-100 + i * 50, -150, 6, 10, 8), { seed: 122 + i, width: 2 });
      ctx.fillStyle = PAL.white; ctx.font = 'bold 38px "DejaVu Serif"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('NOVEMBER', 0, -112);
      ctx.fillStyle = C.INK; ctx.font = 'bold 120px "DejaVu Serif"'; ctx.fillText('98', 0, 20);
      C.stamp(ctx, 'NOV 1998', 0, 100, prog(t, .8, 1.0), { size: 34, rot: -.18 });
      C.tape(ctx, 0, -150, 110, .08, 4);
      ctx.restore();
    }

    // ---- chapter title strip (always on top) ----
    const titleK = prog(t, .05, 1.6), titleOut = ease.inOut(prog(t, 5.6, 6.2));
    ctx.save(); ctx.translate(0, -titleOut * 170);
    C.label(ctx, 'CHAPTER 1', 640, 50, { size: 18, seed: 101, scale: ease.outBack(prog(t, 0, .3)), tape: false });
    C.ransom(ctx, 'THE COPYCAT FROM SHENZHEN', 640, 112, { size: 44, seed: 102, p: titleK });
    ctx.restore();

    // fade to paper at the very end
    const fo = prog(t, 13.4, 14);
    if (fo > 0) { ctx.fillStyle = `rgba(244,234,213,${fo})`; ctx.fillRect(0, 0, C.W, C.H); }
  }

  G.Preview = {
    duration: DURATION,
    narration: 'assets/audio/narration-preview.mp3',
    sfx: SFX,
    scenes: [{ start: 0, end: DURATION + 1, draw: (ctx, lt, t) => drawPreview(ctx, t) }],
  };
})(window);
