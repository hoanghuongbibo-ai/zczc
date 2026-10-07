/* Part 2 — "The Question" + "The Man with a Method".
 * Every shot is keyed to a word anchor in window.T2 (seconds into narration-part2.mp3),
 * written by tools/align-part2.py from the narration transcript. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, P = G.Props, Ch = G.Chars;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const A = G.T2, INK = FX.INK, S_IMG = [533, 1461];
  const at = k => A[k];
  const since = (t, k) => t - A[k];               // seconds since an anchor word
  const breathe = t => (Math.sin(t * 1.6) + 1) / 2;
  const blink = (t, ...ts) => 1 - G.Rig.blinkAt(t, ts);

  // ---------- shared bits ----------
  function chapter(ctx, text, lt) { // paper chapter strip drops in at top centre
    const k = FX.settle(clamp(lt / .35));
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2, lerp(-60, 130, k)); ctx.rotate(-.02);
    ctx.font = FX.DISPLAY(54); const w = ctx.measureText(text).width + 70;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -40, w, 86);
    shape(ctx, '#f1ead8', 4, rect(-w / 2, -46, w, 86, 3)); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  function frame(ctx, x, y, w, h, fill, drawInside) { // ornate picture frame
    T.shadow(ctx, x + 10, y + h / 2 + 16, w * .5, 14, .35, 8);
    shape(ctx, '#7a5a30', 5, rect(x - w / 2 - 22, y - h / 2 - 22, w + 44, h + 44, 6)); shape(ctx, '#c9a14a', 3, rect(x - w / 2 - 10, y - h / 2 - 10, w + 20, h + 20, 4));
    shape(ctx, fill, 3, rect(x - w / 2, y - h / 2, w, h));
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip(); drawInside(); ctx.restore();
  }
  function suitPhoto(ctx, x, y, s, filter) { G.Rig.drawSuit(ctx, x - S_IMG[0] * s / 2, y, s, filter ? { filter } : { breathe: 0 }); }
  const fig = FX.fig;
  const houdini = (o = {}) => Object.assign({ hands: { L: [-120, -470], R: [120, -470] }, feet: { L: [-70, -40], R: [70, -40] } }, o);
  const parlour = ctx => { // dark wallpapered room wall + floor
    shape(ctx, '#4a3a3e', 0, rect(-400, -300, 2100, 1000));
    ctx.save(); ctx.globalAlpha = .12; for (let x = -400; x < 1700; x += 70) for (let y = -300; y < 700; y += 70) { ctx.fillStyle = '#e8d8b8'; ctx.beginPath(); ctx.arc(x + ((y / 70) % 2) * 35, y, 6, 0, 7); ctx.fill(); } ctx.restore();
    shape(ctx, '#3a2c26', 0, rect(-400, 600, 2100, 400)); line(ctx, [[-400, 600], [1700, 600]], 4, 'rgba(0,0,0,.4)');
  };

  // ================= THE QUESTION =================
  function q1(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 380);
    ctx.save(); ctx.translate(500, 400); ctx.rotate(-.04);
    shape(ctx, '#f4efe2', 3, rect(-150, -200, 300, 380, 2)); shape(ctx, '#c8b48f', 2, rect(-130, -180, 260, 300));
    ctx.save(); ctx.beginPath(); ctx.rect(-130, -180, 260, 300); ctx.clip(); suitPhoto(ctx, 0, -172, .38, 'sepia(1) contrast(.9)'); ctx.restore(); ctx.restore();
    const drop = FX.dropBounce(lt - .25, 500, .3);
    FX.bigText(ctx, '?', 860, 400 - drop, 320, { color: '#f6c945' });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    chapter(ctx, 'THE QUESTION', lt);
  }
  function q2(ctx, lt, dur, t) { // the record, buried under headlines on "ordinary"
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    G.Part2.desk(ctx); G.Part2.record(ctx, 1, 1, 1);
    FX.stamp(ctx, 'RUPTURED APPENDIX', 700, 352, 1, { color: '#a8322a', size: 34, rot: -.06 });
    const t0 = since(t, 'ordinary');
    [['PUNCH?', 560, 340, .08], ['CURSE?', 720, 400, -.06], ['MURDER?', 640, 380, .03]].forEach(([h, x, y, r], i) => {
      const k = t0 + .2 - i * .18; if (k <= 0) return;
      const sc = k < .09 ? lerp(1.3, 1, ease.in(k / .09)) : 1 + FX.ring(k - .09, -.02, 4, 14);
      FX.paperDoc(ctx, x, y, 440 * sc, 560 * sc, { title: h, titleSize: 64, lines: 12, rot: r, seed: 40 + i });
    });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, 'NOV 1926');
  }
  // map of the north-east: the four places the story runs through
  const PLACES = [['montreal', 'MONTREAL', 560, 150, 'mirror'], ['atlantic', 'ATLANTIC CITY', 610, 560, 'key'], ['boston', 'BOSTON', 790, 300, 'candle'], ['code', 'A CODE FOR BESS', 1040, 470, 'envelope']];
  function icon(ctx, kind, x, y, k) {
    const s = FX.settle(k); if (s <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#f1ead8', 3.5, rect(-62, -62, 124, 124, 8));
    if (kind === 'mirror') { shape(ctx, '#cfe0e6', 3, rect(-36, -40, 72, 60, 4)); for (let i = 0; i < 4; i++) { shape(ctx, '#fff1c4', 2, circle(-30 + i * 20, -48, 6)); shape(ctx, '#fff1c4', 2, circle(-30 + i * 20, 28, 6)); } }
    if (kind === 'key') { shape(ctx, '#c9a14a', 3, circle(-20, -10, 18)); shape(ctx, '#c9a14a', 3, rect(-4, -16, 50, 12, 3)); shape(ctx, '#c9a14a', 3, rect(30, -6, 8, 18)); shape(ctx, '#a8322a', 3, rect(-40, 14, 46, 28, 4)); }
    if (kind === 'candle') { shape(ctx, '#efe6d0', 3, rect(-12, -10, 24, 50, 3)); shape(ctx, '#ffd27a', 2, smooth([[0, -12], [-8, -28], [0, -46], [8, -28]])); glow(ctx, 0, -28, 50, 'rgba(255,190,110,.5)'); }
    if (kind === 'envelope') { shape(ctx, '#e9dcb8', 3, rect(-44, -30, 88, 60, 3)); line(ctx, [[-44, -30], [0, 4], [44, -30]], 3); shape(ctx, '#a8322a', 2.5, circle(0, 6, 9)); }
    ctx.restore();
  }
  function q3(ctx, lt, dur, t) {
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 370);
    shape(ctx, '#9fc3cf', 0, rect(-400, -300, 2100, 1300));                                                         // sea
    shape(ctx, '#e8dcbc', 4, smooth([[-300, -200], [1100, -200], [1060, 60], [880, 200], [860, 280], [780, 330], [720, 420], [660, 470], [640, 600], [560, 760], [-300, 760]])); // coast
    for (const [x, y, rx, ry] of [[260, 260, 120, 40], [380, 200, 90, 50], [170, 340, 70, 30]]) shape(ctx, '#9fc3cf', 3, ellipse(x, y, rx, ry));      // lakes
    line(ctx, [[-300, 210], [470, 230], [700, 120], [1000, 60]], 3, 'rgba(120,80,40,.5)');                          // border
    ctx.save(); ctx.font = FX.FONT(700, 22); ctx.fillStyle = 'rgba(80,60,40,.6)'; ctx.fillText('CANADA', 60, 120); ctx.fillText('UNITED STATES', 100, 520); ctx.restore();
    // red string from pin to pin, drawn as each place is named
    const pts = PLACES.map(p => [p[2], p[3]]);
    for (let i = 1; i < pts.length; i++) {
      const k = clamp((t - at(PLACES[i][0])) / .35); if (k <= 0) continue;
      line(ctx, [pts[i - 1], [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]], 4, '#b8322a');
    }
    PLACES.forEach(([key, name, x, y, kind], i) => {
      const k = t - at(key); if (k <= 0) return;
      const drop = FX.dropBounce(k, 120, .3);
      shape(ctx, '#b8322a', 3, circle(x, y - drop, 12)); line(ctx, [[x, y - drop], [x, y - drop + 22]], 3);
      icon(ctx, kind, x + (i === 3 ? 0 : 110), y - 80, clamp((k - .1) / .25));
      FX.caption(ctx, name, k, .05, x + (i === 3 ? 90 : 220), y + 10);
    });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, '1926');
  }
  function q4(ctx, lt, dur, t) { // calendar page tears away on "Halloween"
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    FX.plankWall(ctx, -400, 1700, -300, 640, '#6a5a4a', 7); shape(ctx, '#3e2f25', 0, rect(-400, 640, 2100, 300));
    shape(ctx, '#6b4f39', 4, rect(820, 470, 300, 22, 4));                                                            // shelf + jack-o'-lantern
    shape(ctx, '#e07a2a', 4.5, ellipse(960, 420, 60, 48)); shape(ctx, '#5a7a3a', 3.5, rect(954, 362, 14, 20, 4));
    ctx.fillStyle = INK; for (const p of [[[938, 410], [952, 396], [952, 414]], [[982, 410], [968, 396], [968, 414]]]) { ctx.beginPath(); ctx.moveTo(...p[0]); ctx.lineTo(...p[1]); ctx.lineTo(...p[2]); ctx.closePath(); ctx.fill(); }
    shape(ctx, INK, 0, c => { c.moveTo(930, 440); c.quadraticCurveTo(960, 458, 990, 440); c.lineTo(980, 432); c.quadraticCurveTo(960, 446, 940, 432); c.closePath(); });
    glow(ctx, 960, 420, 120, 'rgba(255,170,80,.35)');
    // calendar: page behind (NOV 1), page in front (OCT 31) rips and falls
    const cx = 480, cy = 340, tear = since(t, 'halloween');
    const pg = (title, num, red) => { shape(ctx, '#f4efe2', 4, rect(-150, -170, 300, 340, 3)); shape(ctx, red ? '#a8322a' : '#4a5a7a', 0, rect(-150, -170, 300, 70)); ctx.fillStyle = '#fff'; ctx.font = FX.FONT(700, 34); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(title, 0, -134); ctx.fillStyle = INK; ctx.font = FX.DISPLAY(150); ctx.fillText(num, 0, 40); };
    ctx.save(); ctx.translate(cx, cy); pg('NOVEMBER', '1', false); ctx.restore();
    if (tear < 1.4) {
      ctx.save(); const k = Math.max(0, tear); ctx.translate(cx + k * 120, cy + 600 * k * k); ctx.rotate(k * 1.2); pg('OCTOBER', '31', true); ctx.restore();
    }
    shape(ctx, '#6b4f39', 3, rect(cx - 160, cy - 186, 320, 22, 4));
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '1926');
  }
  function q5(ctx, lt, dur, t) { // a war over whether the dead can speak
    const slam = FX.settle(clamp(lt / .35));                       // both sides are there from the cut
    const crack = FX.settle(clamp(since(t, 'war') / .2));          // the crack and "A WAR" land on the word
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#3a4a5a', 0, rect(-400, -300, 1040 + 400, 1300)); shape(ctx, '#3a2430', 0, rect(640, -300, 1100, 1300));
    glow(ctx, 330, 380, 400, 'rgba(255,240,220,.15)'); glow(ctx, 960, 420, 400, 'rgba(255,180,120,.18)');
    // the skeptic
    fig(ctx, lerp(-200, 330, slam), 700, .36, houdini({ hands: { L: [110, -760], R: [-110, -740] }, face: { brows: 'smug', mouth: 'flat', look: [.6, 0], eyes: blink(t, at('war') + .9) }, breathe: breathe(t) }), { mirror: true });
    // the medium at her table, trumpet glowing on "speak"
    const sp = clamp(since(t, 'speak') / .4), rise = ease.out(sp) * 60;
    fig(ctx, lerp(1480, 960, slam), 740, .34, { head: 'mediumScarf', outfit: 'shawl', hands: { L: [-150, -640], R: [150, -640] }, feet: { L: [-60, -40], R: [60, -40] }, face: { brows: 'calm', mouth: 'flat', look: [-.6, -.2], eyes: .8 } });
    shape(ctx, '#3a2018', 4, rect(lerp(1300, 820, slam), 560, 300, 40, 6));
    ctx.save(); ctx.translate(lerp(1480, 960, slam) + 90, 520 - rise); ctx.rotate(-.5); glow(ctx, 0, 0, 120 * sp, `rgba(255,220,140,${.5 * sp})`); shape(ctx, '#c9a14a', 4, poly([[-10, -8], [70, -36], [70, 36], [-10, 8]])); ctx.restore();
    // the crack between them
    if (crack > 0) { ctx.save(); ctx.globalAlpha = clamp(crack * 2); line(ctx, [[640, -100], [612, 120], [668, 260], [620, 420], [662, 560], [630, 800]], 10, '#f1ead8'); ctx.restore(); }
    ctx.restore();
    if (since(t, 'war') > 0) FX.bigText(ctx, 'A WAR', 640, 110, 90, { color: '#f1ead8' });
    FX.caption(ctx, 'CAN THE DEAD SPEAK?', lt, Math.max(.2, since(t, 'speak') + lt - .1));
    FX.vignette(ctx, 640, 380, .55);
  }

  // ================= THE MAN WITH A METHOD =================
  function m1(ctx, lt, dur, t) {
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    const k = FX.settle(clamp((lt - .2) / .3));
    ctx.save(); ctx.translate(640, 430); ctx.scale(k, k);                                       // padlock emblem
    shape(ctx, null, 22, c => c.arc(0, -60, 70, Math.PI, 0)); shape(ctx, '#c9a14a', 6, rect(-110, -60, 220, 180, 18)); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 10, 18, 0, 7); ctx.fill(); ctx.fillRect(-7, 14, 14, 50);
    ctx.restore(); ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    chapter(ctx, 'THE MAN WITH A METHOD', lt);
  }
  function m2(ctx, lt, dur, t) { // the portrait, c. 1913
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 360);
    parlour(ctx);
    frame(ctx, 560, 330, 300, 400, '#cdbb98', () => suitPhoto(ctx, 560, 140, .5, 'sepia(.6) contrast(.95)'));
    ctx.restore();
    const k = clamp((lt - .5) / .3);
    if (k > 0) { ctx.save(); ctx.translate(lerp(1400, 960, ease.out(k)), 420); ctx.rotate(.03); FX.paperDoc(ctx, 0, 0, 380, 150, { lines: 0, draw: c => { c.font = FX.FONT(600, 22); c.fillStyle = '#4a443d'; c.textAlign = 'center'; c.fillText('born', 0, -34); c.font = FX.DISPLAY(38); c.fillStyle = INK; c.fillText('ERIK WEISZ', 0, 4); c.font = FX.FONT(700, 22); c.fillText('BUDAPEST, 1874', 0, 44); } }); ctx.restore(); }
    FX.vignette(ctx, 640, 360, .55);
    FX.dateTag(ctx, 'c. 1913');
  }
  function m3(ctx, lt, dur, t) { // Budapest → America
    const k = ease.inOut(prog(lt, .3, dur - .3));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 380);
    shape(ctx, '#9fc3cf', 0, rect(-400, -300, 2100, 1300));
    shape(ctx, '#e8dcbc', 4, smooth([[-300, -100], [260, -60], [330, 160], [300, 420], [200, 640], [-300, 700]]));       // America
    shape(ctx, '#e8dcbc', 4, smooth([[900, -120], [1500, -120], [1500, 600], [1040, 560], [960, 420], [920, 240]]));    // Europe
    ctx.save(); ctx.font = FX.FONT(700, 22); ctx.fillStyle = 'rgba(80,60,40,.6)'; ctx.fillText('UNITED STATES', 20, 300); ctx.fillText('EUROPE', 1120, 140); ctx.restore();
    const a = [1150, 260], b = [250, 300], c = [700, 40];
    const pt = u => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];
    ctx.save(); ctx.setLineDash([14, 12]); ctx.beginPath(); for (let u = 0; u <= k; u += .01) { const p = pt(u); u ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.lineWidth = 5; ctx.strokeStyle = '#b8322a'; ctx.stroke(); ctx.restore();
    shape(ctx, '#b8322a', 3, circle(...a, 11)); FX.caption(ctx, 'BUDAPEST', lt, .1, a[0] + 140, a[1] + 20);
    const s = pt(k), s2 = pt(Math.min(1, k + .01)), ang = Math.atan2(s2[1] - s[1], s2[0] - s[0]);
    ctx.save(); ctx.translate(...s); ctx.rotate(ang + Math.PI); ctx.scale(-1, 1); const bob = Math.sin(t * 4) * 3; ctx.translate(0, bob);
    shape(ctx, '#3a3a3e', 3.5, poly([[-50, 0], [50, 0], [38, 22], [-40, 22]])); shape(ctx, '#e9e2cf', 3, rect(-26, -22, 46, 22, 3)); shape(ctx, '#a8322a', 3, rect(-6, -46, 14, 26, 2)); ctx.restore();
    if (k > .98) shape(ctx, '#b8322a', 3, circle(...b, 11));
    ctx.restore();
    FX.vignette(ctx, 640, 380, .45);
    FX.dateTag(ctx, '1878');
    FX.caption(ctx, 'AN IMMIGRANT FAMILY · TO AMERICA', lt, .4);
  }
  function m4(ctx, lt, dur, t) { // posters slap onto a brick wall
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    shape(ctx, '#8a5a48', 0, rect(-400, -300, 2100, 1300));
    ctx.save(); ctx.strokeStyle = 'rgba(40,20,14,.35)'; ctx.lineWidth = 3; for (let y = -300; y < 1000; y += 34) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1700, y); ctx.stroke(); for (let x = -400 + ((y / 34) % 2) * 40; x < 1700; x += 80) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 34); ctx.stroke(); } } ctx.restore();
    const posters = [['LONDON', '#a8322a', 250, 360, -.05], ['BERLIN', '#2f5a7a', 520, 330, .04], ['PARIS', '#6a3a7a', 790, 370, -.03], ['NEW YORK', '#2f6a4a', 1050, 340, .05]];
    posters.forEach(([city, col, x, y, r], i) => {
      const k = lt - .15 - i * (dur - .6) / 4; if (k <= 0) return;
      const sc = k < .08 ? lerp(1.25, 1, k / .08) : 1 + FX.ring(k - .08, -.02, 4, 14);
      ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(sc, sc);
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-106, -146, 220, 300);
      shape(ctx, '#efe3c6', 3.5, rect(-110, -150, 220, 300, 2)); shape(ctx, col, 0, rect(-100, -140, 200, 60));
      ctx.fillStyle = '#f1ead8'; ctx.font = FX.DISPLAY(40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('HOUDINI', 0, -110);
      ctx.save(); ctx.beginPath(); ctx.rect(-100, -76, 200, 150); ctx.clip(); G.Rig.drawSuit(ctx, -S_IMG[0] * .16 / 2, -74, .16, { tint: col }); ctx.restore();
      ctx.fillStyle = INK; ctx.font = FX.FONT(700, 24); ctx.fillText(city, 0, 106);
      ctx.restore();
    });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .5);
    FX.dateTag(ctx, '1900s');
  }
  function stageBg(ctx) {
    shape(ctx, '#7a2621', 0, rect(-600, -500, 2500, 1140));
    for (let x = -600; x < 1900; x += 78) { shape(ctx, '#5f1b17', 0, rect(x + 22, -500, 22, 1140)); shape(ctx, '#943229', 0, rect(x + 52, -500, 8, 1140)); }
    shape(ctx, '#5a4231', 0, rect(-600, 640, 2500, 400)); line(ctx, [[-600, 640], [1900, 640]], 4, 'rgba(0,0,0,.45)');
    glow(ctx, 640, 420, 420, 'rgba(255,220,160,.28)');
  }
  function m5(ctx, lt, dur, t) { // whatever you lock him in, he gets out
    const out = clamp(since(t, 'getsOut') / .35);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 400);
    stageBg(ctx);
    T.shadow(ctx, 640, 652, 110, 14, .5, 5);
    const ta = FX.settle(out);
    fig(ctx, 640, 650, .36, houdini({ hands: out > 0 ? { L: [lerp(-60, -330, ta), lerp(-560, -1180, ta)], R: [lerp(60, 330, ta), lerp(-560, -1180, ta)] } : { L: [-50, -560], R: [50, -560] },
      handShape: out > 0 ? { L: 'open', R: 'open' } : { L: 'fist', R: 'fist' }, face: { brows: out > 0 ? 'smug' : 'calm', mouth: out > 0 ? 'smile' : 'flat', look: [.5, 0] }, breathe: breathe(t) }));
    // restraints drop onto him one by one, then fall away when he gets out
    [[560, 480, 'cuff'], [720, 470, 'cuff'], [640, 440, 'lock']].forEach(([x, y, kind], i) => {
      const k = lt - .2 - i * .35; if (k <= 0) return;
      let yy = y - FX.dropBounce(k, 500, .25), rr = 0, a = 1;
      if (out > 0) { const f = since(t, 'getsOut'); yy += 900 * f * f + 60 * f; rr = (i - 1) * f * 3; a = clamp(1 - (f - .4) / .3); }
      ctx.save(); ctx.globalAlpha = a; ctx.translate(x, yy); ctx.rotate(rr);
      if (kind === 'cuff') P.handcuffPair(ctx, 0, 0, .35);
      else { const open = out > 0 ? 18 : 0; shape(ctx, null, 9, c => c.arc(0, -26 - open, 24, Math.PI, 0)); shape(ctx, '#c9a14a', 4, rect(-32, -26, 64, 56, 8)); }
      ctx.restore();
    });
    ctx.restore();
    if (out > 0) FX.bigText(ctx, 'HE GETS OUT.', 640, 120, 70, { color: '#f1ead8' });
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1900s');
  }
  function m6(ctx, lt, dur, t) { // blueprint: locks could be studied
    shape(ctx, '#23476e', 0, rect(0, 0, W, H));
    ctx.save(); ctx.strokeStyle = 'rgba(220,235,255,.18)'; ctx.lineWidth = 1.5; for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore();
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    const BL = '#e6f0ff', pins = 5, k0 = Math.max(lt * .0, 0), pickIn = ease.out(prog(lt, .3, .9));
    const lifted = i => clamp((lt - 1.0 - i * .35) / .15), open = clamp((lt - 1.0 - pins * .35) / .2);
    ctx.lineWidth = 4; ctx.strokeStyle = BL; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.arc(640, 220 - open * 60, 110, Math.PI, 0); ctx.moveTo(530, 220 - open * 60); ctx.lineTo(530, 300 - open * 60); ctx.moveTo(750, 220 - open * 60); ctx.lineTo(750, 300); ctx.stroke(); // shackle
    ctx.strokeRect(480, 290, 320, 260);                                                         // body
    ctx.strokeRect(500, 470, 280, 40);                                                          // keyway
    for (let i = 0; i < pins; i++) { // driver pins above, key pins below; a pick lifts each to the shear line
      const x = 530 + i * 55, up = lifted(i) * 26;
      ctx.strokeRect(x - 12, 330, 24, 70 - up); ctx.fillStyle = 'rgba(230,240,255,.25)'; ctx.fillRect(x - 12, 400 - up, 24, 60); ctx.strokeRect(x - 12, 400 - up, 24, 60);
      line(ctx, [[x - 12, 400], [x + 12, 400]], 2, 'rgba(255,220,120,.9)');
    }
    const tip = lerp(220, 530 + Math.min(pins - 1, Math.floor(Math.max(0, lt - 1.0) / .35)) * 55, pickIn);
    line(ctx, [[0, 492], [tip - 20, 492], [tip, 470]], 6, '#f6c945');
    ctx.restore();
    ctx.save(); ctx.font = FX.FONT(700, 24); ctx.fillStyle = BL; ctx.fillText('FIG. 1 — PIN TUMBLER LOCK', 80, 660); ctx.restore();
    if (open > 0) FX.stamp(ctx, 'OPEN', 1000, 300, open, { color: '#f6c945', size: 56 });
    FX.dateTag(ctx, 'METHOD');
  }
  function m7(ctx, lt, dur, t) { // bodies could be trained: breath-holding in an icy bath
    const dunk = ease.inOut(prog(lt, .25, .7));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    shape(ctx, '#d9e2e0', 0, rect(-400, -300, 2100, 1300));
    ctx.save(); ctx.strokeStyle = 'rgba(80,100,100,.25)'; ctx.lineWidth = 2; for (let x = -400; x < 1700; x += 60) { ctx.beginPath(); ctx.moveTo(x, -300); ctx.lineTo(x, 520); ctx.stroke(); } for (let y = -300; y < 520; y += 60) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1700, y); ctx.stroke(); } ctx.restore();
    shape(ctx, '#8a7a6a', 0, rect(-400, 520, 2100, 400));
    // him, lying back in the tub: head sinks below the waterline
    ctx.save(); ctx.beginPath(); ctx.rect(300, 0, 680, 455); ctx.clip();
    fig(ctx, 900, 430 + dunk * 90, .3, { outfit: 'swim', hands: { L: [-70, -520], R: [70, -520] }, feet: { L: [-50, -40], R: [50, -40] }, face: { brows: 'calm', mouth: 'flat', eyes: lt > .5 ? 0 : 1, look: [0, -.5] } }, { rot: -1.25 });
    ctx.restore();
    shape(ctx, 'rgba(150,200,220,.75)', 0, rect(330, 440, 620, 30));
    for (let i = 0; i < 6; i++) shape(ctx, 'rgba(240,250,255,.85)', 3, rect(360 + i * 95, 428 + (i % 2) * 6, 40, 30, 6));   // ice
    shape(ctx, '#f1efe8', 5, c => { c.moveTo(310, 450); c.lineTo(970, 450); c.quadraticCurveTo(960, 600, 860, 610); c.lineTo(420, 610); c.quadraticCurveTo(320, 600, 310, 450); c.closePath(); }); // clawfoot tub
    for (const x of [400, 880]) shape(ctx, '#c9a14a', 3.5, rect(x - 14, 600, 28, 40, 8));
    if (dunk > .9) for (let i = 0; i < 4; i++) { const k = ((lt * .8 + i / 4) % 1); shape(ctx, 'rgba(240,250,255,.8)', 2.5, circle(450 + i * 12, 450 - k * 40, 4 + k * 3)); }
    // stopwatch on the stool: sweep hand runs
    shape(ctx, '#6b4f39', 4, rect(1060, 470, 120, 20, 4)); shape(ctx, '#6b4f39', 4, rect(1100, 490, 40, 120));
    shape(ctx, '#c3cbd0', 4, circle(1120, 400, 62)); shape(ctx, '#f6f4ee', 3, circle(1120, 400, 50)); shape(ctx, '#c3cbd0', 3, rect(1110, 326, 20, 16, 4));
    const sw = Math.max(0, lt - .6) * 2.2; line(ctx, [[1120, 400], [1120 + Math.sin(sw) * 42, 400 - Math.cos(sw) * 42]], 4, '#a8322a');
    ctx.restore();
    FX.vignette(ctx, 640, 400, .45);
    FX.caption(ctx, 'TRAINING: HOLDING HIS BREATH', lt, .3);
    FX.dateTag(ctx, 'METHOD');
  }
  function m8(ctx, lt, dur, t) { // nothing supernatural
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    FX.paperDoc(ctx, 470, 380, 460, 300, { title: 'SUPERNATURAL', titleSize: 46, lines: 5, rot: -.03, seed: 61 });
    FX.stamp(ctx, 'NOT REQUIRED', 480, 430, since(t, 'supernatural'), { color: '#a8322a', size: 44 });
    const wag = Math.sin(lt * 9) * 40 * clamp(lt / .3);
    fig(ctx, 980, 700, .34, houdini({ hands: { L: [-120, -470], R: [400 + wag, -1230] }, handShape: { R: 'point' }, face: { brows: 'smug', mouth: 'smirk', look: [-.5, 0] }, breathe: breathe(t) }));
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
  }
  function m9(ctx, lt, dur, t) { // 1913: his mother dies
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.07), 640, 380);
    parlour(ctx);
    // rain on the window
    shape(ctx, '#e3d9c4', 4, rect(940, 90, 240, 300, 3)); ctx.fillStyle = '#5a6a76'; ctx.fillRect(954, 104, 212, 272);
    ctx.save(); ctx.beginPath(); ctx.rect(954, 104, 212, 272); ctx.clip(); const r = rng(9); for (let i = 0; i < 40; i++) { const x = 954 + r() * 212, y = (r() * 272 + t * 420) % 300 + 90; line(ctx, [[x, y], [x - 4, y + 18]], 2, 'rgba(220,235,245,.6)'); } ctx.restore();
    line(ctx, [[1060, 104], [1060, 376]], 5, '#e3d9c4');
    // Cecilia's portrait with a black ribbon
    frame(ctx, 520, 300, 240, 300, '#cdbb98', () => fig(ctx, 520, 560, .3, { head: 'cecilia', outfit: 'dress1900', face: { mouth: 'smile', look: [0, 0] } }, { filter: 'sepia(.7)' }));
    ctx.save(); ctx.translate(640, 150); ctx.rotate(.6); shape(ctx, '#151517', 3, rect(-90, -16, 180, 32)); ctx.restore();
    // Houdini beside it, head bowed, eyes closed
    fig(ctx, 820, 720, .38, houdini({ hands: { L: [-40, -620], R: [40, -620] }, headTilt: .22, face: { brows: 'worried', mouth: 'frown', eyes: 0 }, breathe: breathe(t) * .5 }), { mirror: true });
    ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, '1913');
    FX.caption(ctx, 'CECILIA WEISZ', lt, .5);
  }
  function m10(ctx, lt, dur, t) { // he went looking for her: a night walk
    const scroll = lt * 160;
    ctx.save(); cam(ctx, 1.02, 640, 380);
    ctx.fillStyle = grad(ctx, 0, -100, 0, 600, [[0, '#1c2436'], [1, '#3a4256']]); ctx.fillRect(-400, -300, 2100, 1300);
    shape(ctx, '#f1ead8', 0, circle(1040, 130, 46)); glow(ctx, 1040, 130, 160, 'rgba(240,235,210,.25)');
    for (let i = 0; i < 9; i++) { const x = ((i * 220 - scroll * .4) % 2000 + 2000) % 2000 - 300; ctx.fillStyle = '#262c3c'; ctx.fillRect(x, 300 - (i % 3) * 60, 180, 400); for (let k = 0; k < 4; k++) { ctx.fillStyle = (i + k) % 3 ? 'rgba(255,220,140,.5)' : '#1a1f2c'; ctx.fillRect(x + 30 + (k % 2) * 80, 340 - (i % 3) * 60 + Math.floor(k / 2) * 70, 40, 40); } }
    shape(ctx, '#3a3a40', 0, rect(-400, 620, 2100, 300));
    for (let i = 0; i < 4; i++) { const x = ((i * 480 - scroll) % 1920 + 1920) % 1920 - 300; line(ctx, [[x, 640], [x, 260]], 10, '#1a1a1e'); glow(ctx, x, 250, 120, 'rgba(255,220,150,.45)'); shape(ctx, '#ffe9a8', 3, circle(x, 250, 16)); }
    const ph = lt * 6, step = Math.sin(ph), bob = Math.abs(Math.cos(ph)) * 10;
    const look = Math.sin(lt * 1.3) * .8;
    fig(ctx, 600, 650 - bob, .36, houdini({ feet: { L: [-50, -40 - Math.max(0, step) * 50], R: [50, -40 - Math.max(0, -step) * 50] }, hands: { L: [-130 + step * 30, -470], R: [130 - step * 30, -470] }, handShape: { L: 'fist', R: 'fist' }, headTilt: look * .08, face: { brows: 'worried', mouth: 'flat', look: [look, -.1] } }));
    ctx.restore();
    FX.vignette(ctx, 640, 380, .65);
    FX.dateTag(ctx, '1913');
  }
  function m11(ctx, lt, dur, t) { // timeline 1914–1919
    FX.darkBg(ctx, '#2a2622');
    const x0 = 160, x1 = 1120, yr = y => lerp(x0, x1, (y - 1914) / 5), k = ease.inOut(prog(lt, .1, dur * .6));
    line(ctx, [[x0, 420], [lerp(x0, x1, k), 420]], 8, '#f1ead8');
    for (let y = 1914; y <= 1919; y++) if (yr(y) <= lerp(x0, x1, k) + 1) { line(ctx, [[yr(y), 404], [yr(y), 436]], 5, '#f1ead8'); ctx.font = FX.FONT(700, 26); ctx.fillStyle = '#f1ead8'; ctx.textAlign = 'center'; ctx.fillText(String(y), yr(y), 476); }
    const ww = clamp((lt - .5) / .3);
    if (ww > 0) { ctx.save(); ctx.globalAlpha = ww; shape(ctx, '#7a3a2a', 0, rect(yr(1914), 380, yr(1918.9) - yr(1914), 20)); ctx.restore();
      FX.bigText(ctx, 'WORLD WAR I', (yr(1914) + yr(1918.9)) / 2, 300, 48, { color: '#f1ead8' });
      for (let i = 0; i < 9; i++) { const kk = FX.settle(clamp((lt - .6 - i * .05) / .2)); ctx.save(); ctx.translate(yr(1914) + 60 + i * 72, 560); ctx.scale(kk, kk); shape(ctx, '#d8d2c2', 3, poly([[-6, -40], [6, -40], [6, -24], [20, -24], [20, -12], [6, -12], [6, 20], [-6, 20], [-6, -12], [-20, -12], [-20, -24], [-6, -24]])); ctx.restore(); } }
    const fl = clamp((lt - dur * .55) / .3);
    if (fl > 0) { ctx.save(); ctx.globalAlpha = fl; shape(ctx, '#3a5a6a', 0, rect(yr(1918), 440, yr(1919.6) - yr(1918), 20)); ctx.restore();
      FX.bigText(ctx, '1918 INFLUENZA', yr(1918.8), 640, 40, { color: '#cfe0e6' });
      ctx.save(); ctx.translate(yr(1918.8), 560); ctx.scale(FX.settle(fl), FX.settle(fl)); shape(ctx, '#f1efe8', 4, rect(-50, -24, 100, 48, 18)); line(ctx, [[-50, -10], [-80, -24]], 3); line(ctx, [[50, -10], [80, -24]], 3); ctx.restore(); }
    FX.dateTag(ctx, '1914 – 1919');
  }
  function m12(ctx, lt, dur, t) { // definition card + a medium
    FX.darkBg(ctx, '#2c2430');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    const def = 'the belief that the living can contact the dead, usually through a medium.';
    const n = Math.floor(def.length * clamp((t - at('spiritualism') - .3) / 2.6));
    FX.paperDoc(ctx, 470, 360, 600, 330, { lines: 0, rot: -.02, draw: c => {
      c.font = FX.DISPLAY(48); c.fillStyle = INK; c.textAlign = 'left'; c.fillText('SPIRITUALISM', -260, -90);
      c.font = FX.FONT(600, 22); c.fillStyle = '#6a5a4a'; c.fillText('(noun)', 120, -92);
      c.font = FX.FONT(600, 26); c.fillStyle = INK; const words = def.slice(0, n).split(' '); let line2 = '', y = -30;
      for (const w of words) { if (c.measureText(line2 + w).width > 500) { c.fillText(line2, -260, y); y += 38; line2 = ''; } line2 += w + ' '; } c.fillText(line2, -260, y);
    } });
    fig(ctx, 1030, 700, .34, { head: 'mediumFeather', outfit: 'beaded', hands: { L: [-90, -700], R: [90, -700] }, feet: { L: [-50, -40], R: [50, -40] }, face: { brows: 'calm', mouth: 'flat', eyes: .7, look: [-.4, -.3] } });
    shape(ctx, 'rgba(200,220,255,.6)', 4, circle(1030, 700 - 700 * .34 + 30, 34)); glow(ctx, 1030, 700 - 700 * .34 + 30, 90, 'rgba(180,200,255,.35)');   // crystal ball
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'SINCE 1848');
  }
  function m13(ctx, lt, dur, t) { // the surge
    FX.darkBg(ctx, '#2a2622');
    line(ctx, [[160, 140], [160, 600], [1140, 600]], 5, '#f1ead8');
    const pts = [[160, 560], [300, 550], [440, 540], [580, 530], [700, 500], [800, 420], [900, 300], [1000, 200], [1120, 150]];
    G.Props && 0; const k = clamp(lt / (dur * .8)), n = pts.length - 1, upto = k * n, i0 = Math.floor(upto);
    ctx.save(); ctx.strokeStyle = '#f6c945'; ctx.lineWidth = 10; ctx.lineCap = ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...pts[0]);
    for (let i = 1; i <= i0; i++) ctx.lineTo(...pts[i]); if (i0 < n) { const f = upto - i0; ctx.lineTo(lerp(pts[i0][0], pts[i0 + 1][0], f), lerp(pts[i0][1], pts[i0 + 1][1], f)); } ctx.stroke(); ctx.restore();
    ctx.font = FX.FONT(700, 22); ctx.fillStyle = '#d8d2c2'; ctx.textAlign = 'center'; ctx.fillText('1914', 580, 636); ctx.fillText('1918', 800, 636); ctx.fillText('1920s', 1060, 636);
    FX.caption(ctx, 'AFTER THE WAR AND THE FLU: SPIRITUALISM SURGES', lt, .4, W - 60, 60);
    if (k > .7) FX.bigText(ctx, 'SÉANCES', 980, 210, 54, { color: '#f6c945' });
    FX.dateTag(ctx, '1920s');
  }
  function seanceRoom(ctx, t, opts = {}) {
    shape(ctx, '#1e1618', 0, rect(-400, -300, 2100, 1300));
    glow(ctx, 640, 420, 520, 'rgba(255,190,110,.22)');
    if (opts.people) opts.people();
    const jolt = opts.knock > 0 && opts.knock < .35 ? FX.ring(opts.knock, 10, 9, 10) : 0;
    shape(ctx, '#4a2a22', 5, ellipse(640, 560 + jolt, 420, 90));                                       // table top
    shape(ctx, '#3a201a', 5, rect(260, 560 + jolt, 760, 160));
    shape(ctx, '#efe6d0', 3.5, rect(626, 470 + jolt, 28, 70, 3)); const fl = 1 + Math.sin(t * 13) * .08; glow(ctx, 640, 456 + jolt, 200 * fl, `rgba(255,190,110,${.5 * fl})`); shape(ctx, '#ffd27a', 2, smooth([[640, 470 + jolt], [631, 456 + jolt], [640, 434 + jolt], [649, 456 + jolt]]));
  }
  function m14(ctx, lt, dur, t) { // waiting for a knock, a voice, a message
    const knock = since(t, 'knock'), voice = clamp(since(t, 'voice') / .5), msg = clamp(since(t, 'message') / .6);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    seanceRoom(ctx, t, { knock, people: () => {
      const cast = [['cloche', 'dress20s', 330], ['bowler', 'overcoat', 500], ['mediumScarf', 'shawl', 640], ['young', 'sweater', 790], ['nurse', 'nurseDress', 950]];
      cast.forEach(([head, outfit, x], i) => fig(ctx, x, 860, .38, { head, outfit, hands: { L: [-160, -720], R: [160, -720] }, feet: { L: [-60, -40], R: [60, -40] },
        face: { brows: head === 'mediumScarf' ? 'calm' : (knock > 0 ? 'up' : 'worried'), mouth: knock > 0 && knock < 1.2 && head !== 'mediumScarf' ? 'o' : 'flat', eyes: head === 'mediumScarf' ? 0 : 1, look: [voice > 0 ? (640 - x) / 600 : 0, voice > 0 ? -.8 : 0] } }, { mirror: x > 640 }));
    } });
    if (knock > 0 && knock < .6) FX.bigText(ctx, 'KNOCK', 420, 470, 44, { color: '#f1ead8' });
    if (voice > 0) { const y = 470 - ease.out(voice) * 180; ctx.save(); ctx.translate(800, y); ctx.rotate(-.4); glow(ctx, 0, 0, 120, 'rgba(255,220,140,.5)'); shape(ctx, '#c9a14a', 4, poly([[-10, -8], [80, -38], [80, 38], [-10, 8]])); ctx.restore(); }
    if (msg > 0) { shape(ctx, '#2a2a2c', 4, rect(420, 520, 160, 100, 4)); ctx.save(); ctx.beginPath(); ctx.rect(430, 530, 140 * msg, 80); ctx.clip(); ctx.strokeStyle = '#f1efe8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(440, 570); for (let x = 0; x < 120; x += 6) ctx.lineTo(440 + x, 570 - Math.sin(x * .4) * 10 - Math.sin(x * .13) * 6); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    FX.vignette(ctx, 640, 400, .7);
    FX.dateTag(ctx, '1920s');
  }
  const MEDIUMS = [['mediumScarf', 'shawl'], ['mediumFeather', 'beaded'], ['mediumCollar', 'highCollar']];
  function m15(ctx, lt, dur, t) { // medium after medium — three quick cuts
    const i = Math.min(2, Math.floor(lt / (dur / 3))), lk = lt - i * dur / 3;
    ctx.save(); cam(ctx, 1.05 + lk * .02, 640, 400);
    seanceRoom(ctx, t, { people: () => {
      fig(ctx, 420, 900, .44, { head: MEDIUMS[i][0], outfit: MEDIUMS[i][1], hands: { L: [-170, -720], R: [170, -720] }, feet: { L: [-60, -40], R: [60, -40] }, face: { brows: 'calm', mouth: 'flat', eyes: .2, look: [0, -.5] } });
      fig(ctx, 880, 900, .44, houdini({ hands: { L: [110, -760], R: [-110, -740] }, face: { brows: lk > .4 ? 'smug' : 'calm', mouth: 'flat', look: [-.7, 0], eyes: blink(t, at('sat') + i * dur / 3 + .5) } }), { mirror: true });
    } });
    ctx.restore();
    FX.vignette(ctx, 640, 400, .65);
    FX.caption(ctx, `MEDIUM No. ${i + 1}`, lk, .05);
    FX.dateTag(ctx, '1920s');
  }
  function m16(ctx, lt, dur, t) { // x-ray under the table: how the tricks work
    const lens = ease.out(clamp((lt - .1) / .4));
    ctx.save(); cam(ctx, 1.05, 640, 400);
    seanceRoom(ctx, t, { knock: (lt % 1.2) < .3 ? lt % 1.2 : -1, people: () => fig(ctx, 420, 940, .44, { head: 'mediumCollar', outfit: 'highCollar', hands: { L: [-170, -720], R: [170, -720] }, feet: { L: [-60, -40], R: [60, -40] }, face: { brows: 'calm', mouth: 'flat', eyes: .2 } }) });
    ctx.restore();
    // the lens: inside it, the table is transparent and the tricks show
    ctx.save(); ctx.beginPath(); ctx.arc(640, 560, 260 * lens, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = '#123a4a'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#bfe8ff'; ctx.lineWidth = 3; ctx.strokeRect(270, 540, 740, 30); line(ctx, [[300, 570], [300, 760]], 6, '#bfe8ff'); line(ctx, [[980, 570], [980, 760]], 6, '#bfe8ff');
    const tap = Math.abs(Math.sin(lt * 5)) * 30;
    ctx.beginPath(); ctx.moveTo(420, 760); ctx.lineTo(480, 690); ctx.lineTo(560, 700 - tap); ctx.lineTo(610, 690 - tap); ctx.stroke();          // stockinged foot nudging the table leg
    line(ctx, [[520, 540], [760, 380]], 2, '#f6c945');                                                                                            // fine wire to the trumpet
    ctx.restore();
    if (lens > .5) { ctx.save(); ctx.font = FX.FONT(700, 24); ctx.fillStyle = '#bfe8ff'; ctx.fillText('FOOT ON THE LEG', 460, 790); ctx.fillStyle = '#f6c945'; ctx.fillText('A FINE WIRE', 700, 440); ctx.restore(); }
    shape(ctx, null, 6, c => c.arc(640, 560, 260 * lens, 0, Math.PI * 2));
    FX.vignette(ctx, 640, 400, .6);
    FX.caption(ctx, 'TRICKS WERE HIS PROFESSION', lt, .3);
  }
  function m17(ctx, lt, dur, t) { // a quiet skeptic: he shrugs
    const sh = FX.settle(clamp((t - at('nothing2')) / .3));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    parlour(ctx);
    shape(ctx, '#6a3a2a', 5, c => c.roundRect(860, 360, 260, 300, 40)); shape(ctx, '#7a4a36', 5, c => c.roundRect(840, 500, 300, 140, 30));   // armchair
    fig(ctx, 560, 700, .38, houdini({ hands: sh > 0 ? { L: [lerp(-60, -260, sh), lerp(-760, -880, sh)], R: [lerp(60, 260, sh), lerp(-760, -880, sh)] } : { L: [-80, -760], R: [80, -760] }, handShape: { L: 'open', R: 'open' },
      face: { brows: sh > 0 ? 'up' : 'calm', mouth: 'flat', look: sh > 0 ? [.5, 0] : [0, .7] }, breathe: breathe(t) }));
    if (sh <= 0) { ctx.save(); ctx.translate(560, 700 - 760 * .38); ctx.rotate(-.04); shape(ctx, '#ebe5d3', 3.5, rect(-90, -70, 180, 120, 2)); for (let i = 0; i < 6; i++) line(ctx, [[-76, -50 + i * 18], [70, -50 + i * 18]], 3, 'rgba(70,64,58,.4)'); ctx.restore(); }
    else { ctx.save(); const f = Math.max(0, t - at('nothing2')); ctx.translate(560 - 40, 700 - 280 + 600 * f * f); ctx.rotate(f * 2); shape(ctx, '#ebe5d3', 3.5, rect(-90, -60, 180, 120, 2)); ctx.restore(); }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1920s');
  }
  function m18(ctx, lt, dur, t) { // a friendship → a crusade
    FX.darkBg(ctx, '#2a2420');
    const meet = FX.approach(lt, .05, 1, 0, .12), shake = lt > .5 ? Math.sin((lt - .5) * 14) * 10 * Math.exp(-(lt - .5) * 2) : 0;
    ctx.save(); ctx.translate(0, shake);
    if (meet > .03) { // the two hands reach in, open, from either side
      for (const [s, sleeve, cuff, skin] of [[-1, '#2b2b2e', '#fbf0db', Ch.HCOL.skin], [1, '#7a6a4a', '#efe9dc', '#e7b08a']]) {
        const x = 640 + s * (110 + meet * 500);
        Ch.part(ctx, Ch.limb([x + s * 560, 420], [x, 400], 120, 108), sleeve); Ch.part(ctx, Ch.limb([x + s * 10, 400], [x - s * 20, 400], 92, 92), cuff, 4);
        ctx.save(); ctx.translate(x - s * 24, 400); ctx.scale(-s, 1); Ch.hand(ctx, [0, 0], 0, 'open', skin, 1.5); ctx.restore();   // mirrored for the right-hand side so both thumbs point up
      }
    } else Ch.handshake(ctx, 640, 400, 1.3, { reach: 560, sleeveA: '#2b2b2e', sleeveB: '#7a6a4a', cuffA: '#fbf0db', cuffB: '#efe9dc', skinB: '#e7b08a' });
    ctx.restore();
    FX.stamp(ctx, 'CRUSADE', 640, 560, since(t, 'crusade'), { color: '#a8322a', size: 74 });
    FX.caption(ctx, 'A FRIENDSHIP', lt, .3, W - 60, 60);
    T.fill(ctx, '#000', ease.in(prog(lt, dur - .6, dur)));
  }

  // ---------- timeline ----------
  const cut = [
    ['q1', q1], ['q2', q2], ['q3', q3], ['q4', q4], ['q5', q5], ['m1', m1], ['born', m2], ['immigrant', m3], ['star', m4], ['promise', m5],
    ['underneath', m6], ['trained', m7], ['nothing', m8], ['y1913', m9], ['looking', m10], ['search', m11], ['spiritualism', m12], ['after', m13],
    ['families', m14], ['sat', m15], ['tricks', m16], ['could', m17], ['instead', m18],
  ];
  const DURATION = A.end + 1.5;
  const shots = cut.map(([k, draw], i) => ({ start: i ? A[k] - .15 : 0, end: i + 1 < cut.length ? A[cut[i + 1][0]] - .15 : DURATION, draw }));
  const sfx = [
    { t: A.q1 + .5, type: 'thud', gain: .7 },
    ...[0, 1, 2].map(i => ({ t: A.ordinary + .2 + i * .18, type: 'paper' })),
    ...['montreal', 'atlantic', 'boston', 'code'].map(k => ({ t: A[k], type: 'click', gain: .6 })),
    { t: A.halloween, type: 'paper', gain: .9 }, { t: A.war, type: 'hit', gain: .7 }, { t: A.speak, type: 'swell', gain: .6 },
    { t: A.m1 + .25, type: 'clang', gain: .5 },
    ...[0, 1, 2, 3].map(i => ({ t: A.star + .15 + i * (A.promise - A.star - .6) / 4, type: 'slap' })),
    { t: A.promise + .3, type: 'rattle', gain: .4 }, { t: A.getsOut, type: 'click' },
    ...[0, 1, 2, 3, 4].map(i => ({ t: A.underneath + 1.0 + i * .35, type: 'click', gain: .4 })), { t: A.underneath + 2.8, type: 'click' },
    { t: A.trained + .3, type: 'splash', gain: .6 }, { t: A.supernatural, type: 'thud' },
    { t: A.search, type: 'boom', gain: .4 }, { t: A.knock, type: 'thud' }, { t: A.knock + .2, type: 'thud', gain: .7 }, { t: A.voice, type: 'swell', gain: .5 }, { t: A.message, type: 'scratch', gain: .6 },
    { t: A.crusade, type: 'thud' },
  ];
  const moods = [
    { t: 0, mood: 'mystery' }, { t: A.m1, mood: 'still' }, { t: A.promise, mood: 'tense' }, { t: A.y1913, mood: 'still' },
    { t: A.search, mood: 'silence' }, { t: A.spiritualism, mood: 'mystery' }, { t: A.instead, mood: 'tense' },
  ];
  G.Show = {
    duration: DURATION, narration: 'assets/audio/narration-part2.mp3', shots, sfx, moods,
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png', suitEyeL: 'assets/img/rig/suit-eye-l.png', suitEyeR: 'assets/img/rig/suit-eye-r.png', bedEyeL: 'assets/img/rig/bed-eye-l.png', bedEyeR: 'assets/img/rig/bed-eye-r.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
