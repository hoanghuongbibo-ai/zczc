/* "The War That Put $4.36 Gas in Your Tank" — part 1: COLD OPEN + SETUP (voice: assets/audio/gas-1.mp3).
 * Shot plan: biz/PLAN-gas-1.md. Times are the narration's word times (pocketsphinx transcript). */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Tn = G.Toon, Pr = G.Pr, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host;
  const drift = (lt, dur, z0 = 1, z1 = 1.05) => lerp(z0, z1, inout(clamp(lt / dur)));
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const YOU = Object.assign({}, Pr.YOU, { body: P.blue });   // the recurring driver for this video

  // ---------- shared gas-station set ----------
  function car(ctx, x, y, s, col = P.red) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-170, -30); c.lineTo(-160, -80); c.lineTo(-90, -86); c.lineTo(-50, -140); c.lineTo(80, -140); c.lineTo(130, -86); c.lineTo(175, -78); c.lineTo(180, -30); c.closePath(); }, col, 5);
    sh(ctx, c => { c.moveTo(-36, -128); c.lineTo(10, -128); c.lineTo(10, -88); c.lineTo(-70, -88); c.closePath(); }, '#bfe6ff', 4); sh(ctx, c => { c.moveTo(24, -128); c.lineTo(72, -128); c.lineTo(110, -88); c.lineTo(24, -88); c.closePath(); }, '#bfe6ff', 4);
    sh(ctx, c => c.rect(130, -70, 20, 16), '#2b2b2b', 3);                                // fuel door (open)
    for (const wx of [-100, 110]) { sh(ctx, c => c.arc(wx, -26, 32, 0, 7), INK, 0); sh(ctx, c => c.arc(wx, -26, 14, 0, 7), '#c9ced6', 3); }
    ctx.restore(); }
  function pump(ctx, x, y, s, price) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.roundRect(-50, -220, 100, 220, 10), '#f4f4f4', 5); sh(ctx, c => c.rect(-50, -220, 100, 36), P.red, 5);
    sh(ctx, c => c.roundRect(-36, -170, 72, 44, 6), '#1f2630', 4); txt(ctx, price || '$•.••', 0, -147, PRINT(20), '#7dffb0');
    sh(ctx, c => c.roundRect(-30, -110, 60, 40, 6), '#e9edf1', 3); ctx.restore(); }
  function canopy(ctx) { sh(ctx, c => c.rect(120, 90, 1100, 70), '#fff', 5); sh(ctx, c => c.rect(120, 140, 1100, 20), P.red, 0); Tn.line(ctx, [[120, 160], [1220, 160]], 5, INK); for (const px of [330, 1010]) sh(ctx, c => c.rect(px - 16, 160, 32, 440), '#dfe3e8', 5); }
  function priceBoard(ctx, x, y, s, price, o = {}) { // the AAA national-average sign on a pole
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => c.rect(-14, 0, 28, 300), '#8a8f99', 5);
    sh(ctx, c => c.roundRect(-170, -330, 340, 330, 20), '#1f3d7a', 6);
    if (IMG.aaa) { ctx.save(); ctx.beginPath(); ctx.roundRect(-150, -312, 90, 90, 14); ctx.clip(); ctx.drawImage(IMG.aaa, -150, -312, 90, 90); ctx.restore(); }
    txt(ctx, 'NATIONAL', 40, -288, PRINT(26), '#fff'); txt(ctx, 'AVERAGE', 40, -256, PRINT(26), '#fff');
    sh(ctx, c => c.roundRect(-150, -205, 300, 130, 14), '#111418', 4);
    ctx.save(); ctx.shadowColor = o.glow || '#ffd166'; ctx.shadowBlur = 18; txt(ctx, price, 0, -140, HAND(700, 104), o.glow || '#ffd166'); ctx.restore();
    txt(ctx, o.date || '', 0, -40, PRINT(28), '#fff');
    ctx.restore(); }
  function stationScene(ctx, lt, t, o = {}) {
    ctx.fillStyle = Tn.grad(ctx, 0, 0, 0, H, o.night ? [[0, '#3a4a7a'], [1, '#8a7aa8']] : [[0, '#ffc98a'], [1, '#ffe9c4']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    ctx.fillStyle = '#8c929c'; ctx.fillRect(-100, 600, W + 200, 220); Tn.line(ctx, [[-100, 600], [W + 100, 600]], 4, INK);
    canopy(ctx); pump(ctx, 540, 600, 1, o.pumpPrice); pump(ctx, 820, 600, 1, o.pumpPrice);
    car(ctx, 700, 690, 1.0, P.red);
  }

  // ================= COLD OPEN =================
  function a1(ctx, lt, dur, t) { // On February 26th, the average gallon of gas in America cost $2.98
    const T0 = 0, at = s => lt - (s - T0);
    ctx.save(); camZoom(ctx, drift(lt, dur, 1, 1.06), 640, 400);
    stationScene(ctx, lt, t, { pumpPrice: at(3.56) > 0 ? '$2.98' : null });
    // You at the pump: the nozzle hose runs from the pump to the car's fuel door
    // the hose runs from the pump into the car's fuel door; You waits beside the car
    Tn.line(ctx, [[860, 470], [880, 560], [846, 622]], 6, INK); sh(ctx, c => c.roundRect(832, 612, 34, 16, 5), '#2b2b2b', 3);
    bean(ctx, 1010, 690, .95, t, Object.assign({}, YOU, { armL: [.6, 1.2], face: { mouth: 'smile', brows: 'up', look: [-.6, .3] } }));
    ctx.restore();
    // the price board slides in from the left and flips to $2.98 on the word
    const bx = lerp(-200, 170, out(clamp(lt / .7)));
    const flip = at(3.56), digits = flip > 0 ? '$2.98' : ['$•.••', '$-.--'][Math.floor(t * 8) % 2];
    priceBoard(ctx, bx, 420, .95, digits, { date: at(.17) > 0 ? 'Feb 26, 2026' : '' });
    if (flip > 0 && flip < .4) { ctx.save(); ctx.globalAlpha = 1 - flip / .4; ctx.fillStyle = '#fff'; ctx.fillRect(bx - 140, 220, 280, 120); ctx.restore(); }
    K.source(ctx, 'Source: AAA national average (Feb 26, 2026)', at(2.3));
  }
  function tv(ctx, x, y, w, h, screen) { sh(ctx, c => c.roundRect(x - w / 2 - 16, y - h / 2 - 16, w + 32, h + 32, 16), '#24272e', 5); ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip(); ctx.translate(x - w / 2, y - h / 2); screen(ctx, w, h); ctx.restore(); Tn.line(ctx, [[x - 40, y + h / 2 + 16], [x - 70, y + h / 2 + 60]], 6, INK); Tn.line(ctx, [[x + 40, y + h / 2 + 16], [x + 70, y + h / 2 + 60]], 6, INK); }
  function a2(ctx, lt, dur, t) { // two days later, the United States and Israel launched strikes on Iran
    const T0 = 4.84, at = s => lt - (s - T0);
    ctx.fillStyle = '#e9e2d6'; ctx.fillRect(0, 0, W, H);
    // the station shop wall: a calendar flips 26 → 28, a TV breaks the news
    Pr.calendar(ctx, 220, 620, 1.0, 'FEB 2026', at(5.04) > .25 ? '28' : '26', { flip: clamp(at(5.04) / .5) < 1 ? clamp(at(5.04) / .5) : null, prevTop: 'FEB 2026', prevBig: '26', bigSize: 110 });
    if (at(5.32) > 0) popAt(ctx, 220, 200, at(5.32), () => { K.card(ctx, 80, 160, 280, 76, P.yellow, 16); txt(ctx, 'two days later', 220, 198, HAND(700, 40)); });
    tv(ctx, 820, 330, 640, 360, (c, w, h) => {
      c.fillStyle = '#16213a'; c.fillRect(0, 0, w, h);
      // a calm, schematic map glow (no explosions): the region named on screen
      c.fillStyle = '#23365e'; c.beginPath(); c.ellipse(w * .6, h * .45, 210, 120, -.2, 0, 7); c.fill();
      c.fillStyle = '#2f4a7a'; c.beginPath(); c.ellipse(w * .62, h * .42, 120, 70, -.2, 0, 7); c.fill();
      txt(c, 'IRAN', w * .64, h * .4, PRINT(30), 'rgba(255,255,255,.75)');
      const live = at(6.12) > 0; c.fillStyle = P.red; c.fillRect(0, h - 104, w, 44); txt(c, 'BREAKING NEWS', 20, h - 82, PRINT(26), '#fff', 'left');
      c.fillStyle = '#fff'; c.fillRect(0, h - 60, w, 60);
      if (live) { const k = clamp(at(6.12) / .5); c.save(); c.beginPath(); c.rect(0, h - 60, w * k, 60); c.clip(); txt(c, 'U.S. and Israel launch strikes on Iran', 20, h - 30, PRINT(28), INK, 'left'); c.restore(); }
      txt(c, 'FEB 28, 2026', w - 20, 30, PRINT(22), '#9ad1ff', 'right');
      if (Math.floor(t * 2) % 2) { c.fillStyle = P.red; c.beginPath(); c.arc(24, 30, 8, 0, 7); c.fill(); } txt(c, 'LIVE', 40, 30, PRINT(20), '#fff', 'left');
    });
    // You turns to watch, worried
    bean(ctx, 1180, 700, .75, t, Object.assign({}, YOU, { face: { mouth: at(7.11) > 0 ? 'o' : 'flat', brows: 'worried', look: [-.9, -.3] } }));
    K.source(ctx, 'Source: Encyclopaedia Britannica; NPR', at(6.2));
  }

  const SH = [[0, 4.84, a1], [4.84, 9.86, a2]];
  const DUR = 9.86;
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const hits = [[3.56, 'ding'], [5.04, 'paper'], [6.12, 'buzz'], [7.75, 'thud']].map(([t, type]) => ({ t, type, gain: .55 }));
  G.Show = { duration: DUR, narration: '../biz/assets/audio/gas-1.mp3', shots,
    sfx: cuts.concat(hits, [{ t: .17, type: 'pop', gain: .45 }, { t: 5.32, type: 'pop', gain: .45 }]), musicGain: .14,
    moods: [{ t: 0, mood: 'lofi' }, { t: 4.84, mood: 'lofiDark', fade: 2 }],
    images: { aaa: 'assets/gas/american-automobile-association.png' },
    fonts: G.BizFont.load };
})(window);
