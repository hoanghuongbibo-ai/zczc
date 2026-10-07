/* PART 06 "But…", PART 07 "The Prophecy", PART 08 "Dig Him Up" + title (27.6–42 s).
 * Anchors: "But within days" 27.65 · "newspapers" 28.44 · "stranger's punch" 29.47–30.10 ·
 * "prophecy" 32.11 · "eighty years later" 33.29 · "family" 34.54 · "dig him up" 35.46. */
(function (G) {
  'use strict';
  const T = G.Toon, P = G.Props, FX = G.FX;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const INK = FX.INK, S_IMG = [533, 1461];

  // ================= 06A — newspapers slam down over the record =================
  function newspaper(ctx, x, y, rot, headline, seed, sc = 1) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-300 + 8, -380 + 10, 600, 760);
    shape(ctx, '#ebe5d3', 3.5, rect(-300, -380, 600, 760, 2));
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '700 34px "DejaVu Serif", serif'; ctx.fillText('THE DAILY GAZETTE', 0, -330);
    line(ctx, [[-270, -305], [270, -305]], 3); line(ctx, [[-270, -298], [270, -298]], 1.5);
    ctx.font = FX.DISPLAY(headline.length > 7 ? 84 : 110); ctx.fillText(headline, 0, -215);
    const r = rng(seed);
    shape(ctx, '#bdb6a3', 2.5, rect(-270, -140, 250, 180));                                          // photo block
    for (let c = 0; c < 2; c++) for (let i = 0; i < 16; i++) { const yy = (c ? -140 : 60) + i * 20; if (yy > 350) break; line(ctx, [[c ? 10 : -270, yy], [(c ? 10 : -270) + 250 * (.7 + r() * .3), yy]], 4, 'rgba(70,64,58,.4)'); }
    ctx.restore();
  }
  const PAPERS = [[0, 'HOUDINI', 700, 360, -.08], [.4, 'PUNCH', 560, 380, .06], [.8, 'DEATH', 690, 400, -.03]]; // [delay, headline, x, y, rot]
  function shotNewspapers(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.06), 640, 380);
    G.Part2.desk(ctx); G.Part2.record(ctx, 1, 1, 1);
    FX.stamp(ctx, 'RUPTURED APPENDIX', 700, 352, 1, { color: '#a8322a', size: 34, rot: -.06 });
    PAPERS.forEach(([d, h, x, y, r], i) => {
      const k = lt - .05 - d; if (k <= 0) return;
      const drop = k < .09 ? lerp(1.35, 1, ease.in(k / .09)) : 1 + FX.ring(k - .09, -.025, 4, 14);   // slams down, tiny bounce
      newspaper(ctx, x, y, r + (k < .09 ? (1 - k / .09) * .08 : 0), h, 30 + i, drop * .82);
    });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'NOV 1926');
  }
  function shotPress(ctx, lt, dur, t) { // presses run, stacks pile up
    FX.darkBg(ctx, '#2c2723');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.0, 1.05), 640, 380);
    for (const [x, y, r] of [[360, 250, 90], [560, 250, 90], [460, 410, 70]]) {
      const a = t * 9;
      shape(ctx, '#55606a', 5, circle(x, y, r)); shape(ctx, '#3b444b', 4, circle(x, y, r * .3));
      for (let i = 0; i < 6; i++) { const aa = a + i * Math.PI / 3; line(ctx, [[x + Math.cos(aa) * r * .3, y + Math.sin(aa) * r * .3], [x + Math.cos(aa) * r * .9, y + Math.sin(aa) * r * .9]], 4); }
    }
    // paper web running off the rollers onto a growing stack
    const run = (t * 900) % 120;
    shape(ctx, '#ebe5d3', 3.5, poly([[300, 340], [900, 340], [900, 370], [300, 370]]));
    for (let x = 300 - run; x < 900; x += 120) line(ctx, [[x, 345], [x, 365]], 3, 'rgba(70,64,58,.5)');
    const sheets = Math.floor(4 + lt * 30);
    for (let i = 0; i < sheets; i++) { const y = 620 - i * 9; shape(ctx, i % 2 ? '#ebe5d3' : '#e2dbc7', 2.5, rect(860 + Math.sin(i * 2.1) * 5, y, 240, 9)); }
    const fall = (lt * 30) % 1; shape(ctx, '#ebe5d3', 2.5, rect(860, 620 - sheets * 9 - 60 + fall * 60, 240, 9));
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'NOV 1926');
  }

  // ================= 06B — reconstruction: the punch, frozen at impact =================
  function student(ctx, x, y, s, pull, hit) { // original silhouette: slim young man, arm drawn back then driven forward
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const D = '#17181b';
    shape(ctx, D, 0, smooth([[-34, 0], [-30, -150], [-40, -270], [-20, -300], [24, -300], [44, -270], [30, -150], [34, 0]]));
    shape(ctx, D, 0, rect(-30, 0, 24, 160, 8)); shape(ctx, D, 0, rect(8, 0, 24, 160, 8));
    shape(ctx, D, 0, rect(-12, -320, 24, 30, 6)); shape(ctx, D, 0, ellipse(0, -360, 34, 40)); shape(ctx, D, 0, smooth([[-36, -372], [-20, -404], [24, -404], [38, -372], [10, -384]]));
    // punching arm: shoulder at (-20,-270). Pull: elbow back; hit: fully extended forward (toward -x)
    const sh = [-24, -268], ext = hit, back = pull * (1 - hit);
    const elbow = [sh[0] - 70 * ext + 50 * back, sh[1] + 60 + 20 * ext + 20 * back], fist = [sh[0] - 170 * ext + 70 * back, sh[1] + 50 * (1 - ext) - 10 * back + 110 * ext]; // drives low, into the abdomen
    ctx.lineCap = 'round'; ctx.strokeStyle = D; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(...sh); ctx.lineTo(...elbow); ctx.lineTo(...fist); ctx.stroke();
    shape(ctx, D, 0, circle(fist[0], fist[1], 22));
    ctx.restore();
    return [x + (sh[0] - 170 * hit) * s, y + (sh[1] + 110 * hit) * s];
  }
  function shotPunch(ctx, lt, dur, t) {
    const tHit = 30.12 - G.HT.punch;                               // impact lands on "punch"
    const freeze = lt > tHit + .03, tt = freeze ? tHit + .03 : lt;   // freeze frame immediately at impact
    const step = FX.approach(tt, .05, 160, 0, .14), pull = ease.inOut(prog(tt, .2, tHit - .08)), hit = ease.in(prog(tt, tHit - .08, tHit));
    ctx.save(); cam(ctx, freeze ? 1.0 + (lt - tHit) * .05 : 1.0, 640, 380);
    // dressing room, back-lit: vanity mirror ringed with bulbs
    shape(ctx, '#8a7a66', 0, rect(-400, -300, 2100, 1300)); shape(ctx, '#5e5043', 0, rect(-400, 600, 2100, 400));
    shape(ctx, '#d9e2e6', 5, rect(420, 70, 440, 380, 8));
    for (let i = 0; i < 7; i++) for (const yy of [60, 460]) { glow(ctx, 440 + i * 66, yy, 50, 'rgba(255,230,170,.6)'); shape(ctx, '#fff4cf', 3, circle(440 + i * 66, yy, 13)); }
    glow(ctx, 640, 260, 500, 'rgba(255,235,190,.35)');
    // Houdini as a silhouette (supplied art, tinted), the stranger stepping in on the right
    const S = .38; G.Rig.drawSuit(ctx, 470 - S_IMG[0] * S / 2, 690 - S_IMG[1] * S, S, { tint: '#141518' });
    const fist = student(ctx, 860 + step, 690, 1.0, pull, hit);
    if (hit > .5) { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) line(ctx, [[fist[0] + 40, fist[1] - 20 + i * 20], [fist[0] + 150, fist[1] - 20 + i * 20]], 4, 'rgba(255,255,255,.5)'); ctx.restore(); } // speed lines
    ctx.restore();
    if (freeze) { // flash, then hold desaturated with a red cast
      T.fill(ctx, '#fff', clamp(1 - (lt - tHit) / .12));
      ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#888'; ctx.globalAlpha = .7; ctx.fillRect(0, 0, W, H); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#d9a39a'; ctx.globalAlpha = .45; ctx.fillRect(0, 0, W, H); ctx.restore();
    }
    FX.vignette(ctx, 640, 360, .6);
    FX.dateTag(ctx, '22 OCT 1926');
    FX.caption(ctx, 'RECONSTRUCTION', lt, .2);
  }

  // ================= 07 — the prophecy =================
  function shotProphecy(ctx, lt, dur, t) {
    const cardIn = FX.approach(lt, .25, 1, 0, .1), handOut = ease.inOut(prog(lt, .75, 1.05));
    const focus = ease.inOut(prog(lt, .7, 1.7)), fade = ease.inOut(prog(lt, 1.3, 2.1));
    ctx.save(); cam(ctx, lerp(1.0, 1.35, focus), lerp(640, 760, focus), lerp(380, 430, focus));
    shape(ctx, '#140f0d', 0, rect(-400, -300, 2100, 1300));
    shape(ctx, '#3a1f22', 6, ellipse(640, 400, 560, 300));                                            // round table, dark velvet
    for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; line(ctx, [[640 + Math.cos(a) * 560, 400 + Math.sin(a) * 300], [640 + Math.cos(a) * 575, 400 + Math.sin(a) * 312 + 12]], 3, '#5a3a2a'); }
    // clippings and the framed photograph (supplied art as an old sepia print)
    FX.paperDoc(ctx, 380, 300, 200, 150, { title: 'MEDIUM', titleSize: 20, lines: 4, lineGap: 18, rot: -.18, seed: 4 });
    FX.paperDoc(ctx, 440, 520, 220, 140, { title: 'SPIRITS?', titleSize: 20, lines: 3, lineGap: 18, rot: .12, seed: 6 });
    ctx.save(); ctx.translate(560, 300); ctx.rotate(-.05);
    shape(ctx, '#6b4f39', 4, rect(-80, -110, 160, 220, 4)); shape(ctx, '#d8c9a8', 3, rect(-66, -96, 132, 192));
    ctx.save(); ctx.beginPath(); ctx.rect(-66, -96, 132, 192); ctx.clip();
    G.Rig.drawSuit(ctx, -S_IMG[0] * .34 / 2, -96, .34, { filter: 'sepia(1) contrast(.9) brightness(.95)' });
    ctx.fillStyle = `rgba(10,6,5,${.92 * fade})`; ctx.fillRect(-70, -100, 140, 200);                   // portrait sinks into darkness
    ctx.restore(); ctx.restore();
    // the card, placed by a hand, with an ominous circled date
    const cx = 800 + cardIn * 420, cy = 450;
    FX.paperDoc(ctx, cx, cy, 230, 150, { fill: '#efe3c6', lines: 0, rot: .05, draw: c => {
      c.font = FX.DISPLAY(44); c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('OCT 31', 0, 6);
      if (lt > .9) { const k = clamp((lt - .9) / .35); c.beginPath(); c.ellipse(0, 6, 98, 40, -.05, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); c.lineWidth = 5; c.strokeStyle = '#a8322a'; c.stroke(); }
    } });
    if (handOut < 1) { const hx = cx + 120 + handOut * 500; shape(ctx, '#e7c7a8', 4, smooth([[hx - 40, cy - 30], [hx + 20, cy - 50], [hx + 70, cy - 20], [hx + 60, cy + 30], [hx - 30, cy + 30]])); shape(ctx, '#2a2420', 4.5, rect(hx + 50, cy - 60, 400, 100, 30)); }
    // the candle: flame flickers, gutters as the portrait fades
    const fl = 1 + Math.sin(t * 13) * .08 + Math.sin(t * 7.3) * .06 - fade * .35;
    shape(ctx, '#efe6d0', 4, rect(940, 200, 50, 130, 6));
    glow(ctx, 965, 180, 260 * fl, `rgba(255,190,110,${.45 * fl})`);
    shape(ctx, '#ffd27a', 2.5, smooth([[965, 196], [954, 178], [965, 150 - 10 * fl], [976, 178]]));
    ctx.restore();
    FX.vignette(ctx, 900, 300, .75);
    FX.dateTag(ctx, '1926');
  }

  // ================= 08A — the evidence, eighty years on =================
  function photoPrint(ctx, x, y, w, h, rot, fn) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 8, w, h);
    shape(ctx, '#f4efe2', 3, rect(-w / 2, -h / 2, w, h, 2));
    ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 40); ctx.clip(); fn(ctx, w - 24, h - 40); ctx.restore();
    ctx.restore();
  }
  function shotEvidence(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, lerp(1.7, 1.0, ease.inOut(prog(lt, 0, dur))), 640, 380);
    shape(ctx, '#3d4a3f', 0, rect(-400, -300, 2100, 1300));                                            // green desk blotter
    const items = [ // [delay, fromX, fromY, draw]
      [.1, -500, 0, () => { ctx.save(); ctx.translate(330, 230); ctx.rotate(-.1); ctx.scale(.42, .42); newspaper(ctx, 0, 0, 0, 'HOUDINI', 31); ctx.restore(); }],
      [.35, 600, -400, () => FX.paperDoc(ctx, 950, 230, 230, 290, { title: 'DEATH RECORD', titleSize: 20, lines: 7, seed: 8, rot: .08, draw: c => FX.stamp(c, 'APPENDIX', 10, 70, 1, { color: '#a8322a', size: 22 }) })],
      [.6, -400, 500, () => photoPrint(ctx, 320, 540, 200, 230, .07, (c, w, h) => { c.fillStyle = '#bcae94'; c.fillRect(-w / 2, -h / 2, w, h); student(c, 10, 120, .38, 0, 0); })],
      [.85, 500, 500, () => photoPrint(ctx, 960, 540, 240, 200, -.06, (c, w, h) => { c.fillStyle = '#c9c7bb'; c.fillRect(-w / 2, -h / 2, w, h); for (let i = 0; i < 4; i++) shape(c, '#8e8f88', 2.5, rect(-90 + i * 50, -6, 30, 40, 10)); c.fillStyle = '#7b7c74'; c.fillRect(-w / 2, 34, w, 40); })],
      [1.1, 0, 600, () => FX.paperDoc(ctx, 640, 600, 300, 200, { title: 'PETITION TO EXHUME', titleSize: 20, lines: 5, seed: 12, rot: -.03 })],
    ];
    // the Houdini photograph in the centre, already there
    photoPrint(ctx, 640, 360, 240, 300, -.03, (c, w, h) => { c.fillStyle = '#c8b48f'; c.fillRect(-w / 2, -h / 2, w, h); G.Rig.drawSuit(c, -S_IMG[0] * .32 / 2, -h / 2 + 4, .32, { filter: 'sepia(1) contrast(.9)' }); });
    for (const [d, fx, fy, draw] of items) {
      const k = lt - d; if (k <= 0) continue;
      const s = FX.approach(k, 0, 1, 0, .07);                         // slides in from off the table, settles
      ctx.save(); ctx.translate(fx * s, fy * s); draw(); ctx.restore();
    }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '2007');
    FX.caption(ctx, '80 YEARS LATER', lt, .3);
  }

  // ================= 08B/08C — the cemetery, the grave =================
  function headstone(ctx, x, y, s, shapeK = 0) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    T.shadow(ctx, 0, 0, 70, 10, .3, 5);
    shape(ctx, shapeK ? '#9a9a92' : '#8f908a', 4, shapeK ? rect(-50, -130, 100, 130, 4) : c => { c.moveTo(-55, 0); c.lineTo(-55, -100); c.quadraticCurveTo(0, -150, 55, -100); c.lineTo(55, 0); c.closePath(); });
    ctx.restore();
  }
  function fog(ctx, t, y, a) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#e6e8e4'; for (let i = 0; i < 5; i++) { const x = ((i * 380 + t * 18) % 2200) - 500; ctx.beginPath(); ctx.ellipse(x, y + Math.sin(i) * 20, 320, 46, 0, 0, 7); ctx.fill(); } ctx.restore(); }
  function shotCemetery(ctx, lt, dur, t) {
    const z = lerp(1.0, 1.22, ease.sine(prog(lt, 0, dur)));
    const row = (d, fn) => { ctx.save(); cam(ctx, 1 + (z - 1) * d, 640, 420); fn(); ctx.restore(); };
    row(.2, () => { ctx.fillStyle = grad(ctx, 0, -200, 0, 520, [[0, '#b9c3c7'], [1, '#e2e2da']]); ctx.fillRect(-400, -300, 2100, 1300); ctx.fillStyle = '#9aa29a'; ctx.fillRect(-400, 420, 2100, 400); });
    row(.4, () => { for (let i = 0; i < 12; i++) headstone(ctx, 40 + i * 110, 430, .45, i % 3 === 0); fog(ctx, t, 430, .5); });
    row(.7, () => { for (let i = 0; i < 9; i++) headstone(ctx, -20 + i * 160, 500, .7, i % 2); (function tree(x0, y0, len, ang, w, d) { const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len; line(ctx, [[x0, y0], [x1, y1]], w, '#4a4038'); if (d > 0) { tree(x1, y1, len * .7, ang - .45, w * .62, d - 1); tree(x1, y1, len * .68, ang + .4, w * .62, d - 1); } })(1060, 500, 130, -Math.PI / 2, 14, 5); fog(ctx, t * 1.2, 500, .45); });
    row(1.0, () => { shape(ctx, '#8d9886', 0, rect(-400, 560, 2100, 400)); for (const x of [120, 1160]) headstone(ctx, x, 640, 1.1, 0); headstone(ctx, 640, 600, .95, 1); fog(ctx, t * 1.5, 620, .4); });
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '2007');
    FX.caption(ctx, 'MACHPELAH CEMETERY, QUEENS', lt, .2);
  }
  function shotGrave(ctx, lt, dur, t) {
    const z = FX.approach(lt, 0, 1.0, 1.1, .45);                     // slow track in that eases to a full stop
    ctx.save(); cam(ctx, z, 640, 380);
    ctx.fillStyle = grad(ctx, 0, -200, 0, 520, [[0, '#b3bdc1'], [1, '#dcdcd3']]); ctx.fillRect(-400, -300, 2100, 1300);
    for (let i = 0; i < 6; i++) headstone(ctx, 60 + i * 240, 470, .5, i % 2);
    fog(ctx, t, 470, .55);
    shape(ctx, '#86917f', 0, rect(-400, 540, 2100, 400));
    // the marker: carved name
    T.shadow(ctx, 640, 600, 300, 22, .4, 8);
    shape(ctx, grad(ctx, 0, 220, 0, 600, [[0, '#b2b2aa'], [1, '#8c8d86']]), 5, c => { c.moveTo(380, 600); c.lineTo(380, 300); c.quadraticCurveTo(640, 170, 900, 300); c.lineTo(900, 600); c.closePath(); });
    line(ctx, [[410, 330], [870, 330]], 3, 'rgba(0,0,0,.25)'); line(ctx, [[410, 560], [870, 560]], 3, 'rgba(0,0,0,.25)');
    ctx.save(); ctx.font = FX.DISPLAY(96); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillText('HOUDINI', 643, 453); ctx.fillStyle = '#5b5c56'; ctx.fillText('HOUDINI', 640, 450); ctx.restore();
    ctx.save(); ctx.font = FX.FONT(700, 22); ctx.fillStyle = '#5b5c56'; ctx.textAlign = 'center'; ctx.fillText('1874 – 1926', 640, 520); ctx.restore();
    const r = rng(3); for (let i = 0; i < 14; i++) shape(ctx, ['#8a5230', '#a66a33', '#6e4a2a'][i % 3], 2, ellipse(360 + r() * 560, 610 + r() * 70, 9, 4, r() * 3)); // fallen leaves
    fog(ctx, t * 1.4, 640, .35);
    ctx.restore();
    FX.vignette(ctx, 640, 400, .6);
    FX.dateTag(ctx, '2007');
  }
  function shotTitle(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#221e1b');
    const k = prog(lt, .1, .7), s = FX.settle(k);
    ctx.save(); ctx.globalAlpha = clamp(k * 2) * (1 - prog(lt, dur - .7, dur));
    ctx.translate(640, 360); ctx.scale(lerp(.9, 1, s), lerp(.9, 1, s));
    ctx.font = FX.FONT(700, 34); ctx.fillStyle = '#e9e1cd'; ctx.textAlign = 'center'; ctx.fillText('THE DEATH OF', 0, -70);
    FX.bigText(ctx, 'HARRY HOUDINI', 0, 10, 100, { color: '#f1ead8' });
    line(ctx, [[-220, 90], [220, 90]], 3, '#c9a14a');
    ctx.restore();
  }

  G.HT = { punch: 0 };
  G.Part3 = { shotNewspapers, shotPress, shotPunch, shotProphecy, shotEvidence, shotCemetery, shotGrave, shotTitle };
})(window);
