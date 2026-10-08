/* "Why Americans Can't Buy a House Until 40" — part 2: CHAPTER 1 (The Math Stopped Working) + CHAPTER 2 (The Decade
 * America Stopped Building). Voice: assets/audio/housing-02-ch1-2.mp3; shot times are the narration's word times. */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Ch = G.Charts, I = G.Icons, Tn = G.Toon;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, inout, back, popAt, tween } = K;
  const INK = K.INK, W = 1280, H = 720;
  G.TOON_FINISH = { grain: .015, vignette: 0 };
  const host = K.host, money = v => '$' + Math.round(v).toLocaleString('en-US');
  const bean = (ctx, x, y, s, t, o) => B.person(ctx, x, y, s, Object.assign({ bob: Math.sin(t * 2.2 + x) * 2 }, o));
  const YOU = { skin: B.SKIN, hair: 'short', hairColor: '#5a3b26', body: P.teal, top: 'plain' };
  function camZoom(ctx, z, fx = W / 2, fy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  function chapterCard(ctx, lt, num, title, col) { // full-frame chapter title: number tab + handwritten title
    K.bg.color(ctx, col); ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let i = -4; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 90 + lt * 30, 0); ctx.lineTo(i * 90 + 300 + lt * 30, H); ctx.lineTo(i * 90 + 340 + lt * 30, H); ctx.lineTo(i * 90 + 40 + lt * 30, 0); ctx.fill(); }
    popAt(ctx, 640, 270, lt, () => { K.card(ctx, 520, 230, 240, 80, '#1f1c1a', 14, 0); txt(ctx, 'CHAPTER ' + num, 640, 270, PRINT(40), '#fff'); });
    popAt(ctx, 640, 390, lt - .15, () => txt(ctx, title, 640, 390, HAND(700, 84), '#fff'));
  }
  const bars = (ctx, o) => { // vertical bars that each appear on their own word time; o.data = [{label, v, at, color, fmt}]
    const { x, y, w, h, max, lt0 } = o, gw = w / o.data.length, bw = gw * .55;
    ctx.save(); ctx.globalAlpha = clamp(lt0 / .4) * .6; ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); for (let i = 1; i <= 4; i++) { const yy = y - h * i / 4; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w * clamp(lt0 / .6), yy); ctx.stroke(); } ctx.restore();
    Tn.line(ctx, [[x - 6, y], [x + (w + 12) * out(lt0 / .4), y]], 5, INK);
    o.data.forEach((d, i) => { const bx = x + gw * i + (gw - bw) / 2, kl = d.labelAt != null ? d.labelAt : d.at, k = d.at > 0 ? back(d.at / .55) : 0, bh = h * d.v / max * k;
      txt(ctx, d.label, bx + bw / 2, y + 32, PRINT(28), INK, 'center', clamp(kl / .3)); if (d.sub) txt(ctx, d.sub, bx + bw / 2, y + 60, PRINT(20), '#6b717a', 'center', clamp(kl / .3));
      if (bh > 1) sh(ctx, c => c.roundRect(bx, y - bh, bw, bh, [10, 10, 0, 0]), d.color || P.blue);
      if (d.at > 0) txt(ctx, (d.fmt || (v => v.toFixed(1)))(d.v * clamp(out(d.at / .55))), bx + bw / 2, y - bh - 30, HAND(700, 48), d.color === P.red ? P.red : INK, 'center', clamp(d.at / .3)); });
  };

  // ================= CHAPTER 1: THE MATH STOPPED WORKING =================
  function a1(ctx, lt, dur, t) { chapterCard(ctx, lt, 1, 'The Math Stopped Working', '#3b7dd8'); }
  function a2(ctx, lt, dur, t) { // a totally normal household: not rich, not broke — typical income $87,599 (Redfin)
    K.bg.cream(ctx); const T0 = 1.91, at = s => lt - (s - T0);
    popAt(ctx, 400, 640, at(2.0), () => bean(ctx, 400, 640, 1.25, t, Object.assign({ face: { mouth: 'smile', brows: 'calm', look: [.5, 0] }, armR: [.5, .3], armL: [.2, 0] }, YOU)));
    popAt(ctx, 400, 120, at(2.3), () => { K.card(ctx, 320, 82, 160, 76, '#1f1c1a', 14, 0); txt(ctx, 'YOU', 400, 121, HAND(700, 52), '#fff'); });
    // not rich / not broke
    popAt(ctx, 160, 300, at(4.39), () => { I.draw(ctx, 'moneyBag', 160, 300, 120, 1); K.cross(ctx, 160, 300, 110, clamp(at(4.6) / .4)); txt(ctx, 'not rich', 160, 390, HAND(700, 36)); });
    popAt(ctx, 160, 520, at(4.88), () => { I.draw(ctx, 'wallet', 160, 520, 110, 1); K.cross(ctx, 160, 520, 100, clamp(at(5.1) / .4)); txt(ctx, 'not broke', 160, 600, HAND(700, 36)); });
    // the income tag
    if (at(6.94) > 0) popAt(ctx, 880, 330, at(6.94), () => { ctx.save(); ctx.translate(880, 330); ctx.rotate(-.05); sh(ctx, c => { c.moveTo(-230, -90); c.lineTo(190, -90); c.lineTo(250, 0); c.lineTo(190, 90); c.lineTo(-230, 90); c.closePath(); }, P.yellow, 5); sh(ctx, c => c.arc(195, 0, 14, 0, 7), '#fff', 4); txt(ctx, 'typical household income', -20, -50, PRINT(28)); ctx.restore(); });
    if (at(10.06) > 0) Ch.counter(ctx, { x: 860, y: 345, value: 87599, prefix: '$', lt: at(10.06), dur: 1.6, size: 96, color: INK });
    K.logo(ctx, 'redfin', 880, 520, 230, at(9.26));
    if (at(12.6) > 0) popAt(ctx, 1080, 140, at(12.6), () => { K.card(ctx, 960, 100, 240, 76, '#fff', 14); txt(ctx, 'June 2026', 1080, 138, HAND(700, 42)); });
    K.source(ctx, 'Source: Redfin, Aug 4, 2026 (June data)', at(9.4));
  }
  function a3(ctx, lt, dur, t) { // a totally normal house: the median existing home sold for $429,100 in August
    K.bg.sky(ctx); const T0 = 13.55, at = s => lt - (s - T0);
    ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 590, W, 130); Tn.line(ctx, [[0, 590], [W, 590]], 4, INK);
    popAt(ctx, 520, 600, at(14.7), () => K.house(ctx, 520, 600, 1.7));
    bean(ctx, 170, 640, .9, t, Object.assign({ face: { mouth: at(18.05) > 0 ? 'o' : 'smile', brows: at(18.05) > 0 ? 'up' : 'calm', look: [.8, -.2] } }, YOU));
    if (at(16.0) > 0) popAt(ctx, 960, 300, at(16.0), () => { ctx.save(); ctx.translate(960, 300); ctx.rotate(.06); Tn.line(ctx, [[-260, -20], [-180, 0]], 4, INK); sh(ctx, c => { c.moveTo(-180, -90); c.lineTo(220, -90); c.lineTo(220, 90); c.lineTo(-180, 90); c.lineTo(-230, 0); c.closePath(); }, '#fff', 5); sh(ctx, c => c.arc(-190, 0, 12, 0, 7), P.yellow, 4); txt(ctx, 'median existing home', 20, -52, PRINT(28)); ctx.restore(); });
    if (at(18.05) > 0) Ch.counter(ctx, { x: 980, y: 325, value: 429100, prefix: '$', lt: at(18.05), dur: 1.6, size: 92, color: P.red });
    if (at(20.34) > 0) popAt(ctx, 1000, 470, at(20.34), () => { K.card(ctx, 880, 432, 240, 76, P.yellow, 14); txt(ctx, 'August 2026', 1000, 470, HAND(700, 42)); });
    K.source(ctx, 'Source: NAR via Mortgage News Daily, Sep 11, 2026', at(18));
  }
  function a4(ctx, lt, dur, t) { // price-to-income: 1990s 3.2× → 2019 4.1× → 2024 5.0× → 2026 report "nearly five times"
    K.bg.white(ctx); const T0 = 21.73, at = s => lt - (s - T0);
    txt(ctx, 'Typical home price ÷ typical income', 640, 70, HAND(700, 46), INK, 'center', clamp(lt / .4));
    K.logo(ctx, 'jchs', 1130, 150, 120, at(27.94));
    const f = v => v.toFixed(1) + '×';
    bars(ctx, { x: 170, y: 590, w: 820, h: 380, max: 5.6, lt0: at(22.3), data: [
      { label: '1990s', v: 3.2, at: at(24.81), labelAt: at(22.37), color: P.green, fmt: f },
      { label: '2019', v: 4.1, at: at(31.59), labelAt: at(30.37), color: P.orange, fmt: f },
      { label: '2024', v: 5.0, at: at(34.57), labelAt: at(33.16), color: P.red, fmt: f }] });
    if (at(38.08) > 0) popAt(ctx, 1110, 400, at(38.08), () => { K.card(ctx, 990, 320, 240, 170, P.yellow, 20); txt(ctx, '2026 report:', 1110, 360, PRINT(26)); txt(ctx, '"nearly 5×"', 1110, 420, HAND(700, 54), P.red); });
    if (at(39.66) > 0) K.arrow(ctx, [985, 405], [900, 300], clamp(at(39.66) / .5), INK, 5);
    K.source(ctx, 'Source: Harvard JCHS (Oct 2025 blog; State of the Nation\'s Housing 2026)', at(28));
  }
  function a5(ctx, lt, dur, t) { // in human terms: at the 1990s ratio your house would be about $280,000. Instead it's $429,100
    K.bg.cream(ctx); const T0 = 42.43, at = s => lt - (s - T0);
    ctx.fillStyle = '#9fd97f'; ctx.fillRect(0, 590, W, 130); Tn.line(ctx, [[0, 590], [W, 590]], 4, INK);
    popAt(ctx, 330, 600, at(44.3), () => K.house(ctx, 330, 600, 1.15, { wall: '#c8ecff', roof: P.green }));
    popAt(ctx, 330, 110, at(46.83), () => { K.card(ctx, 160, 72, 340, 76, '#fff', 14); txt(ctx, "at the '90s ratio (3.2×)", 330, 110, HAND(700, 36)); });
    if (at(49.21) > 0) K.slam(ctx, '≈ $280,000', 330, 230, at(49.21), 76, P.green);
    popAt(ctx, 900, 600, at(51.23), () => K.house(ctx, 900, 600, 1.4));
    popAt(ctx, 900, 110, at(51.4), () => { K.card(ctx, 770, 72, 260, 76, '#fff', 14); txt(ctx, 'today', 900, 110, HAND(700, 40)); });
    if (at(51.84) > 0) K.slam(ctx, '$429,100', 900, 215, at(51.84), 84, P.red);
    if (at(46.0) > 0) txt(ctx, '$87,599 × 3.2 ≈ $280,317 (our calculation)', 640, 690, PRINT(22), '#55606b', 'center', clamp(at(49.5) / .4));
  }
  function race(ctx, y, label, pct, col, lt, icon) {
    const x = 330, w = 760, k = lt > 0 ? out(lt / 1.2) : 0;
    txt(ctx, label, x - 30, y, HAND(700, 44), INK, 'right', clamp((lt + 3) / .3));
    sh(ctx, c => c.roundRect(x, y - 34, w, 68, 34), '#eef0f3', 4);
    if (k > .02) sh(ctx, c => c.roundRect(x, y - 34, Math.max(68, w * pct / 50 * k), 68, 34), col, 4);
    if (lt > 0) { txt(ctx, '+' + Math.round(pct * k) + '%', x + Math.max(68, w * pct / 50 * k) + 20, y, HAND(700, 52), col, 'left'); I.draw(ctx, icon, x + Math.max(68, w * pct / 50 * k) - 34, y, 50, 1); }
  }
  function a6(ctx, lt, dur, t) { // the stat that should make you mad: 2019–2024 prices +48%, incomes +22% — more than twice as fast
    const T0 = 54.73, at = s => lt - (s - T0);
    if (at(57.27) < 0) { K.bg.studio(ctx, '#ffb3a3', '#ffece6'); host(ctx, 640, 700, 1.2, t, [[T0, 'hips']], { mouth: 'flat', brows: 'angry', look: [0, 0] }); txt(ctx, '😤', 860, 220, PRINT(90), INK, 'center', clamp(at(56.1) / .3)); return; }
    K.bg.white(ctx);
    popAt(ctx, 640, 90, at(57.3), () => { K.card(ctx, 430, 52, 420, 76, P.yellow, 16); txt(ctx, '2019 → 2024', 640, 90, HAND(700, 48)); });
    race(ctx, 300, 'Home prices', 48, P.red, at(60.51), 'arrowUp');
    race(ctx, 460, 'Incomes', 22, P.blue, at(62.91), 'arrowUp');
    if (at(66.22) > 0) popAt(ctx, 640, 610, at(66.22), () => { K.card(ctx, 360, 565, 560, 90, '#1f1c1a', 18, 0); txt(ctx, 'more than 2× as fast', 640, 610, HAND(700, 54), '#fff'); });
    K.logo(ctx, 'jchs', 1170, 640, 90, at(59.46));
    K.source(ctx, 'Source: Harvard JCHS, Oct 6, 2025', at(60));
  }
  function a7(ctx, lt, dur, t) { // Redfin: 30% of income, 15% down → need $109,796; you make $87,599; $22,197 short, every year
    K.bg.white(ctx); const T0 = 68.01, at = s => lt - (s - T0);
    if (at(80.55) < 0) {
      host(ctx, 270, 700, 1.0, t, [[T0, 'think'], [71.7, 'presentL'], [75.1, 'count']], { mouth: 'flat', brows: 'up', look: [.6, -.2] });
      txt(ctx, 'Income needed to afford the typical home?', 790, 110, HAND(700, 44), INK, 'center', clamp(at(68.3) / .3));
      K.logo(ctx, 'redfin', 790, 240, 240, at(71.76));
      popAt(ctx, 640, 440, at(76.85), () => { K.card(ctx, 500, 380, 280, 130, P.yellow, 18); txt(ctx, '≤ 30%', 640, 425, HAND(700, 62)); txt(ctx, 'of income on housing', 640, 478, PRINT(22)); });
      popAt(ctx, 960, 440, at(78.71), () => { K.card(ctx, 820, 380, 280, 130, '#c8ecff', 18); txt(ctx, '15%', 960, 425, HAND(700, 62)); txt(ctx, 'down payment', 960, 478, PRINT(22)); });
      I.pop(ctx, 'calculator', 1180, 600, 120, at(74.0));
      return;
    }
    const x = 280, w = 860, s = w / 120000;
    popAt(ctx, 640, 70, at(80.6), () => txt(ctx, 'Income needed vs. income you have', 640, 70, HAND(700, 48)));
    // needed
    const k1 = at(80.9) > 0 ? out(at(80.9) / 1.4) : 0, k2 = at(83.91) > 0 ? out(at(83.91) / 1.2) : 0;
    txt(ctx, 'needed', x - 24, 230, HAND(700, 44), INK, 'right', clamp(at(80.9) / .3));
    if (k1 > 0) { sh(ctx, c => c.roundRect(x, 190, Math.max(20, 109796 * s * k1), 80, 14), P.green); txt(ctx, money(109796 * k1), x + 109796 * s * k1 - 20, 230, HAND(700, 52), '#fff', 'right'); }
    txt(ctx, 'you make', x - 24, 380, HAND(700, 44), INK, 'right', clamp(at(83.91) / .3));
    if (k2 > 0) { sh(ctx, c => c.roundRect(x, 340, Math.max(20, 87599 * s * k2), 80, 14), P.blue); txt(ctx, money(87599 * k2), x + 87599 * s * k2 - 20, 380, HAND(700, 52), '#fff', 'right'); }
    // the gap
    if (at(86.48) > 0) { const g0 = x + 87599 * s, g1 = x + 109796 * s, k = out(at(86.48) / .5);
      ctx.save(); ctx.setLineDash([12, 8]); ctx.lineWidth = 5; ctx.strokeStyle = P.red; ctx.strokeRect(g0, 340, (g1 - g0) * k, 80); ctx.restore();
      ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = P.red; ctx.fillRect(g0, 340, (g1 - g0) * k, 80); ctx.restore();
      popAt(ctx, (g0 + g1) / 2, 520, at(86.6), () => { K.card(ctx, (g0 + g1) / 2 - 170, 470, 340, 100, P.red, 18); txt(ctx, money(22197) + ' short', (g0 + g1) / 2, 520, HAND(700, 56), '#fff'); });
      K.arrow(ctx, [(g0 + g1) / 2, 468], [(g0 + g1) / 2, 428], clamp(at(86.8) / .3), P.red, 5); }
    K.stamp(ctx, 'EVERY SINGLE YEAR', 470, 610, at(89.5), { color: P.red, rot: -.06, size: 50 });
    K.source(ctx, 'Source: Redfin, Aug 4, 2026 (June 2026 data; 30% rule, 15% down)', at(80.9));
  }
  function xu(ctx, x, y, s, t, face) { bean(ctx, x, y, s, t, { skin: '#f6d2b0', hair: 'short', hairColor: '#1d1b1a', body: '#a9c9ef', top: 'shirt', face: Object.assign({ mouth: 'smile', brows: 'calm' }, face), armR: [.3, .4] }); }
  function a8(ctx, lt, dur, t) { // to be fair, the gap shrank: over $28,000 two years ago. Yingqi Xu: "stabilized… but that doesn't mean homes are affordable"
    const T0 = 91.23, at = s => lt - (s - T0);
    if (at(98.44) < 0) {
      K.bg.white(ctx); txt(ctx, 'The gap, to be fair, got smaller', 640, 80, HAND(700, 48), INK, 'center', clamp(lt / .3));
      Ch.bars(ctx, { x: 340, y: 580, w: 600, h: 360, lt: at(95.4), max: 32000, fmt: money, stagger: .5,
        data: [{ label: 'June 2024', value: 28834, color: '#9fbbe6' }, { label: 'June 2026', value: 22197, color: P.red }] });
      if (at(95.6) > 0) K.arrow(ctx, [560, 220], [760, 300], clamp(at(96.6) / .5), P.green, 6);
      K.source(ctx, 'Source: Redfin, Aug 4, 2026', at(95.5)); return;
    }
    K.bg.studio(ctx, '#c6ecd9', '#f1fbf5');
    popAt(ctx, 290, 650, at(98.5), () => xu(ctx, 290, 650, 1.15, t, at(106.63) > 0 ? { mouth: 'flat', brows: 'worried' } : {}));
    K.nameCard(ctx, 'Yingqi Xu', 'Senior Economist, Redfin', 290, 110, at(99.0));
    K.bubble(ctx, '"The earnings needed to buy a house have stabilized after several years of deterioration…', 840, 230, 640, [450, 300], at(102.11), { size: 40 });
    K.bubble(ctx, '…but that doesn\'t mean homes are affordable to the average American."', 840, 500, 640, [450, 360], at(106.63), { size: 40, fill: '#fff4d6' });
    K.source(ctx, 'Source: Redfin, Aug 4, 2026', at(102.2));
  }
  function a9(ctx, lt, dur, t) { // hold on to that word, "stabilized" — that was before September
    K.bg.studio(ctx, '#ffd76a', '#fff3c9'); const T0 = 109.84, at = s => lt - (s - T0);
    host(ctx, 350, 700, 1.15, t, [[T0, 'pointSide'], [112.1, 'shrug']], { mouth: 'flat', brows: at(113.14) > 0 ? 'worried' : 'up', look: [.6, 0] });
    popAt(ctx, 880, 250, at(110.6), () => { K.card(ctx, 680, 190, 400, 120, '#fff', 20); txt(ctx, '"stabilized"', 880, 250, HAND(700, 70), P.green); });
    if (at(113.1) > 0) popAt(ctx, 880, 480, at(113.1), () => { K.card(ctx, 760, 400, 240, 180, '#fff', 16); sh(ctx, c => c.roundRect(760, 400, 240, 54, [16, 16, 0, 0]), P.red, 4.5); txt(ctx, 'SEPTEMBER', 880, 428, PRINT(30), '#fff'); txt(ctx, '2026', 880, 515, HAND(700, 64)); });
    if (at(113.4) > 0) { const k = clamp(at(113.4) / .5); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#7f8a99'; for (const [dx, dy, r] of [[0, 0, 40], [44, -14, 48], [90, 0, 38], [46, 14, 40]]) { ctx.beginPath(); ctx.arc(1010 + dx, 360 + dy, r, 0, 7); ctx.fill(); } ctx.restore(); }
  }
  function a10(ctx, lt, dur, t) { // how did houses get this expensive? not because people suddenly want houses more → back almost 20 years
    const T0 = 114.23, at = s => lt - (s - T0);
    if (at(122.35) < 0) {
      K.bg.studio(ctx, '#d9ccff', '#f5f1ff');
      host(ctx, 330, 700, 1.15, t, [[T0, 'think'], [119.2, 'shrug']], { mouth: 'flat', brows: 'skeptic', look: [.5, -.2], eyes: 'side' });
      popAt(ctx, 880, 220, at(116.23), () => { K.card(ctx, 640, 160, 480, 120, '#fff', 20); txt(ctx, 'How did houses get', 880, 200, HAND(700, 46)); txt(ctx, 'this expensive?', 880, 248, HAND(700, 46), P.red); });
      popAt(ctx, 880, 480, at(119.98), () => { K.card(ctx, 680, 380, 400, 200, '#fff', 20); txt(ctx, 'wanting a house', 880, 420, PRINT(28)); const k = clamp(at(120.3) / .6); sh(ctx, c => c.roundRect(720, 460, 320, 40, 20), '#eef0f3', 3.5); sh(ctx, c => c.roundRect(720, 460, 320 * .6 * out(k), 40, 20), P.purple, 3.5); txt(ctx, 'no sudden spike', 880, 540, HAND(700, 34), '#6b717a', 'center', clamp(at(121.0) / .3)); });
      return;
    }
    // rewind the calendar: 2026 → 2008
    K.bg.color(ctx, '#2f3a4d'); const k = clamp(at(122.6) / 2.4), yr = Math.round(lerp(2026, 2008, inout(k)));
    for (let i = 0; i < 18; i++) { ctx.save(); ctx.globalAlpha = .08; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(640, 360, 60 + i * 40 + (lt * 120) % 40, 0, 7); ctx.stroke(); ctx.restore(); }
    popAt(ctx, 640, 340, at(122.4), () => { K.card(ctx, 470, 230, 340, 230, '#fff', 20); sh(ctx, c => c.roundRect(470, 230, 340, 60, [20, 20, 0, 0]), P.red, 4.5); txt(ctx, '⏪ REWIND', 640, 260, PRINT(30), '#fff'); txt(ctx, String(yr), 640, 380, HAND(700, 110), INK); });
    txt(ctx, 'almost 20 years back', 640, 540, HAND(700, 46), '#fff', 'center', clamp(at(123.68) / .3));
  }

  // ================= CHAPTER 2: THE DECADE AMERICA STOPPED BUILDING =================
  function street(ctx, n, t, sink = 0, signs = 0) { for (let i = 0; i < n; i++) { const x = 140 + i * 250, dy = sink * (40 + (i % 2) * 30); K.house(ctx, x, 600 + dy, .75, { wall: ['#ffcf7a', '#c8ecff', '#ffd3e0', '#d7f0c6', '#ffe1a8'][i % 5], roof: [P.red, P.blue, P.purple, P.green, P.orange][i % 5] });
    if (signs > i * .2) { ctx.save(); ctx.translate(x + 90, 600 + dy); ctx.rotate(-.05); Tn.line(ctx, [[0, 0], [0, -70]], 5, '#8a5a36'); sh(ctx, c => c.roundRect(-58, -112, 116, 46, 6), '#fff', 3.5); txt(ctx, 'FORECLOSURE', 0, -89, PRINT(15), P.red); ctx.restore(); } } }
  function b1(ctx, lt, dur, t) { // 2008: the housing market blew up — risky mortgages, collapse, the whole economy
    const T0 = 125.42, at = s => lt - (s - T0);
    if (lt < 1.6) { chapterCard(ctx, lt, 2, 'The Decade America Stopped Building', '#e04b3a'); return; }
    K.bg.color(ctx, '#d6dde6'); ctx.fillStyle = '#a9c48f'; ctx.fillRect(0, 600, W, 120); Tn.line(ctx, [[0, 600], [W, 600]], 4, INK);
    const shake = at(130.93) > 0 && at(130.93) < .6 ? Math.sin(lt * 70) * 6 * (1 - at(130.93) / .6) : 0;
    ctx.save(); ctx.translate(shake, 0); street(ctx, 5, t, clamp(at(130.93) / 1.2) * .6, clamp(at(129.4) / 1.5)); ctx.restore();
    popAt(ctx, 640, 90, at(127.1), () => { K.card(ctx, 520, 50, 240, 80, '#1f1c1a', 14, 0); txt(ctx, '2008', 640, 90, HAND(700, 56), '#fff'); });
    if (at(129.18) > 0) K.doc(ctx, 230, 230, 200, 150, 'risky mortgage', ['—', '—'], at(129.18), { rot: -.08, titleSize: 30 });
    if (at(130.14) > 0) K.stamp(ctx, 'BAD', 250, 330, at(130.14), { color: P.red, size: 50 });
    if (at(131.97) > 0) popAt(ctx, 1030, 240, at(131.97), () => { K.card(ctx, 920, 160, 220, 170, '#fff', 18); I.draw(ctx, 'barsDown', 1030, 230, 110, clamp(at(132.2) / .8)); txt(ctx, 'the economy', 1030, 305, HAND(700, 30)); });
  }
  function frameHouse(ctx, x, y, s, k) { // half-built timber frame
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const c = '#c98d4f';
    sh(ctx, cc => cc.rect(-120, -10, 240, 10), '#9aa0a6', 3);
    for (let i = 0; i <= 6; i++) Tn.line(ctx, [[-110 + i * 36.6, -10], [-110 + i * 36.6, -10 - 150 * Math.min(1, k * 1.4)]], 7, c);
    if (k > .5) { Tn.line(ctx, [[-120, -160], [120, -160]], 7, c); Tn.line(ctx, [[-130, -160], [0, -250]], 7, c); }
    ctx.restore();
  }
  function b2(ctx, lt, dur, t) { // after the crash, America basically stopped building homes
    K.bg.sky(ctx); const T0 = 133.92, at = s => lt - (s - T0);
    ctx.fillStyle = '#c9b48a'; ctx.fillRect(0, 590, W, 130); Tn.line(ctx, [[0, 590], [W, 590]], 4, INK);
    frameHouse(ctx, 280, 600, 1.2, .6); frameHouse(ctx, 640, 600, 1.2, .35); frameHouse(ctx, 1000, 600, 1.2, .8);
    // crane, frozen
    Tn.line(ctx, [[1170, 590], [1170, 120]], 10, P.yellow); Tn.line(ctx, [[900, 140], [1220, 140]], 10, P.yellow); Tn.line(ctx, [[960, 140], [960, 260]], 3, INK);
    if (at(137.67) > 0) popAt(ctx, 640, 200, at(137.67), () => { ctx.save(); ctx.translate(640, 200); ctx.rotate(-.05); sh(ctx, c => c.roundRect(-250, -60, 500, 120, 16), P.red, 5); txt(ctx, 'BUILDING PAUSED', 0, 4, PRINT(50), '#fff'); ctx.restore(); });
    if (at(136.33) > 0) popAt(ctx, 220, 110, at(136.33), () => { K.card(ctx, 100, 70, 240, 80, '#fff', 14); txt(ctx, 'after the crash', 220, 110, HAND(700, 38)); });
  }
  function b3(ctx, lt, dur, t) { // St. Louis Fed: permits per 1,000 people — 7.3 (2005) → 1.9 (2009) → 4.3 (2024), 35% below the 1960–2000 average
    K.bg.white(ctx); const T0 = 139.57, at = s => lt - (s - T0);
    K.nameCard(ctx, 'St. Louis Fed', 'Apr 2026', 1110, 90, at(140.09));
    txt(ctx, 'Building permits per 1,000 people', 520, 80, HAND(700, 44), INK, 'center', clamp(lt / .4));
    const x0 = 140, x1 = 1120, y0 = 600, hgt = 420, mx = 8, X = yr => lerp(x0, x1, (yr - 2003) / (2025 - 2003)), Y = v => y0 - hgt * v / mx;
    // grid + axis + year ticks
    ctx.save(); ctx.globalAlpha = clamp(lt / .4) * .6; ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); for (const v of [2, 4, 6, 8]) { ctx.beginPath(); ctx.moveTo(x0, Y(v)); ctx.lineTo(x1, Y(v)); ctx.stroke(); txt(ctx, String(v), x0 - 20, Y(v), PRINT(22), '#8a8f96', 'right'); } ctx.restore();
    Tn.line(ctx, [[x0 - 6, y0], [x0 + (x1 - x0 + 12) * out(lt / .4), y0]], 5, INK);
    // the 1960–2000 average (4.3 is 35% below it → about 6.6)
    if (at(160.43) > 0) { const k = out(at(160.43) / .6); ctx.save(); ctx.setLineDash([14, 10]); ctx.lineWidth = 4; ctx.strokeStyle = P.purple; ctx.beginPath(); ctx.moveTo(x0, Y(6.6)); ctx.lineTo(lerp(x0, x1, k), Y(6.6)); ctx.stroke(); ctx.restore(); txt(ctx, '1960–2000 average', x1 - 10, Y(6.6) - 24, HAND(700, 30), P.purple, 'right', clamp(at(161.56) / .3)); }
    const pts = [[2005, 7.3, 143.21], [2009, 1.9, 148.44], [2024, 4.3, 157.1]];
    for (let i = 0; i < pts.length; i++) { const [yr, v, s] = pts[i], k = at(s); txt(ctx, String(yr), X(yr), y0 + 30, PRINT(26), INK, 'center', clamp(k / .3));
      if (i > 0 && k > -1.2) { const [py, pv] = pts[i - 1], kk = clamp((k + 1.2) / 1.2), e = inout(kk); Tn.line(ctx, [[X(py), Y(pv)], [lerp(X(py), X(yr), e), lerp(Y(pv), Y(v), e)]], 8, i === 1 ? P.red : P.green); }
      if (k > 0) { sh(ctx, c => c.arc(X(yr), Y(v), 11 * back(k / .3), 0, 7), '#fff', 4); popAt(ctx, X(yr), Y(v) - 50, k, () => { K.card(ctx, X(yr) - 54, Y(v) - 82, 108, 60, i === 1 ? P.red : '#1f1c1a', 12, 0); txt(ctx, v.toFixed(1), X(yr), Y(v) - 52, HAND(700, 44), '#fff'); }); } }
    if (at(150.42) > 0) popAt(ctx, 560, 360, at(150.42), () => { K.card(ctx, 440, 320, 240, 80, P.yellow, 16); txt(ctx, '−74% in 4 years', 560, 360, HAND(700, 40), P.red); });
    if (at(153.99) > 0) txt(ctx, 'never really came back', 800, 540, HAND(700, 40), '#6b717a', 'center', clamp(at(153.99) / .3));
    if (at(160.81) > 0) { const xx = X(2024) + 40; K.arrow(ctx, [xx, Y(6.6) + 6], [xx, Y(4.3) - 6], clamp(at(160.81) / .4), P.purple, 4); popAt(ctx, xx - 250, Y(5.45), at(161.0), () => { K.card(ctx, xx - 340, Y(5.45) - 30, 180, 60, '#fff', 12); txt(ctx, '35% below', xx - 250, Y(5.45), HAND(700, 36), P.purple); }); }
    K.source(ctx, 'Source: St. Louis Fed, "America Underbuilt Inc.", Apr 8, 2026 (only these three years shown)', at(143));
  }
  function stackRow(ctx, x, y, n, kind, k, col) { for (let i = 0; i < n; i++) { const kk = clamp(k * n - i); if (kk <= 0) break; const cx = x + (i % 8) * 62, cy = y - Math.floor(i / 8) * 70; ctx.save(); ctx.translate(cx, cy); ctx.scale(back(kk) * .5, back(kk) * .5);
    if (kind === 'house') K.house(ctx, 0, 60, .55, { wall: col }); else B.head(ctx, 0, 0, 48, { skin: 'white', hair: ['short', 'bob', 'side', 'bun'][i % 4], hairColor: '#5a3b26', face: { mouth: 'smile' } }); ctx.restore(); } }
  function b4(ctx, lt, dur, t) { // for over a decade the country kept adding people and households, and didn't build enough → shortfall 3–5 million
    K.bg.cream(ctx); const T0 = 163.88, at = s => lt - (s - T0);
    if (at(172.96) < 0) {
      txt(ctx, 'new households', 340, 90, HAND(700, 46), INK, 'center', clamp(at(167.47) / .3));
      txt(ctx, 'new homes', 940, 90, HAND(700, 46), INK, 'center', clamp(at(170.55) / .3));
      stackRow(ctx, 120, 560, 32, 'people', clamp(at(167.47) / 3.5), null);
      stackRow(ctx, 720, 560, 18, 'house', clamp(at(170.66) / 2.0), '#ffcf7a');
      Tn.line(ctx, [[640, 130], [640, 640]], 4, '#c9b9a0');
      if (at(171.03) > 0) K.stamp(ctx, 'NOT ENOUGH', 940, 300, at(171.4), { color: P.red, size: 52 });
      return;
    }
    K.bg.white(ctx);
    popAt(ctx, 640, 120, at(173.0), () => K.nameCard(ctx, 'St. Louis Fed estimate', 'cumulative shortfall since 2008', 640, 120, 1));
    K.slam(ctx, '3–5 million', 640, 340, at(177.2), 150, P.red);
    txt(ctx, 'homes short', 640, 470, HAND(700, 56), INK, 'center', clamp(at(178.2) / .3));
    for (let i = 0; i < 9; i++) { const k = at(177.6 + i * .06); if (k <= 0) continue; const x = 240 + i * 100; ctx.save(); ctx.globalAlpha = .5; ctx.setLineDash([8, 6]); ctx.restore(); popAt(ctx, x, 610, k, () => { ctx.save(); ctx.globalAlpha = .35; K.house(ctx, x, 640, .32, { wall: '#fff', roof: '#c4c8ce' }); ctx.restore(); }); }
    K.source(ctx, 'Source: St. Louis Fed, Apr 8, 2026', at(177));
  }
  function b5(ctx, lt, dur, t) { // economists fight about this number — CRS lines up the estimates: Freddie 3.7M, Zillow 4.7M, Brookings 4.9M, NAR 5.5M
    const T0 = 179.25, at = s => lt - (s - T0);
    if (at(183.75) < 0) { K.bg.studio(ctx, '#bfe3ff', '#eef8ff'); host(ctx, 420, 700, 1.15, t, [[T0, 'presentL'], [180.9, 'shrug']], { mouth: 'flat', brows: 'worried', look: [.4, 0] }); popAt(ctx, 920, 330, at(180.94), () => { I.draw(ctx, 'question', 860, 330, 130, 1); I.draw(ctx, 'exclaim', 990, 330, 130, 1); txt(ctx, 'economists disagree', 920, 470, HAND(700, 44)); }); return; }
    K.bg.white(ctx);
    K.nameCard(ctx, 'Congressional Research Service', 'Dec 2025 — housing shortage estimates', 640, 80, at(183.8));
    const rows = [['freddie', 'Freddie Mac', 3.7, 187.42, [80, 110, 440, 110]], ['zillow', 'Zillow', 4.7, 190.3, [300, 300, 600, 220]], ['brookings', 'Brookings', 4.9, 192.95, null], ['nar', 'NAR', 5.5, 195.74, null]];
    rows.forEach(([key, name, v, s, crop], i) => { const y = 220 + i * 115, k = at(s); if (k <= -.2) return;
      K.logo(ctx, key, 200, y, key === 'brookings' ? 180 : 190, k, { crop, pad: 10, alt: name, ...(key === 'brookings' ? { crop: [0, 380, 1080, 320] } : {}) });
      const bk = k > 0 ? out((k - .3) / .9) : 0, bw = 760 * v / 6 * bk; if (bw > 2) sh(ctx, c => c.roundRect(340, y - 34, bw, 68, 12), i === 3 ? P.orange : P.blue);
      if (bk > 0) txt(ctx, (v * bk).toFixed(1) + 'M', 360 + bw, y, HAND(700, 52), INK, 'left'); });
    K.source(ctx, 'Source: CRS IN12628, Dec 15, 2025', at(184));
  }
  function seesaw(ctx, x, y, ang, lt) { ctx.save(); ctx.translate(x, y); sh(ctx, c => { c.moveTo(-50, 90); c.lineTo(0, 0); c.lineTo(50, 90); c.closePath(); }, '#9aa0a6'); ctx.rotate(ang);
    sh(ctx, c => c.roundRect(-380, -16, 760, 32, 12), '#c98d4f');
    sh(ctx, c => c.roundRect(-370, -110, 230, 94, 14), P.red); txt(ctx, 'SHORTAGE', -255, -63, PRINT(36), '#fff');
    sh(ctx, c => c.roundRect(140, -110, 230, 94, 14), P.green); txt(ctx, 'SURPLUS', 255, -63, PRINT(36), '#fff'); ctx.restore(); }
  function b6(ctx, lt, dur, t) { // Cato: small tweaks turn a shortage into a surplus. CRS: more about specific places and kinds of housing
    const T0 = 199.64, at = s => lt - (s - T0);
    if (at(210.11) < 0) {
      K.bg.white(ctx);
      K.nameCard(ctx, 'Cato Institute', 'two researchers, Sep 2025', 640, 90, at(202.22));
      const tip = at(207.61) > 0 ? lerp(.18, -.18, inout(clamp(at(207.61) / .9))) : .18;
      seesaw(ctx, 640, 470, tip, lt);
      if (at(204.83) > 0) popAt(ctx, 640, 640, at(204.83), () => { K.card(ctx, 420, 600, 440, 80, P.yellow, 16); txt(ctx, 'small tweak to assumptions', 640, 640, HAND(700, 38)); });
      if (at(206.84) > 0) { const k = at(206.84); ctx.save(); ctx.translate(640, 560); ctx.rotate(k * 3); sh(ctx, c => c.arc(0, 0, 26, 0, 7), '#5d6166', 4); Tn.line(ctx, [[0, 0], [0, -22]], 5, '#fff'); ctx.restore(); }
      K.source(ctx, 'Source: Cato Institute blog, Sep 29, 2025 (opposing view)', at(203));
      return;
    }
    K.bg.cream(ctx);
    K.nameCard(ctx, 'CRS itself says', null, 640, 90, at(210.2));
    // specific places: some towns glow red, most don't
    const towns = [[220, 330, 1], [420, 470, 0], [560, 290, 0], [760, 420, 1], [960, 300, 0], [1100, 470, 1], [330, 560, 0], [880, 590, 0]];
    towns.forEach(([x, y, hot], i) => popAt(ctx, x, y, at(211.9 + i * .12), () => { sh(ctx, c => c.arc(x, y, 62, 0, 7), hot && at(213.16) > 0 ? '#ffd2cc' : '#fff', 4); K.house(ctx, x - 18, y + 32, .28, { wall: '#ffcf7a' }); K.house(ctx, x + 22, y + 34, .24, { wall: '#c8ecff', roof: P.blue }); if (hot && at(213.16) > 0) K.scribbleCircle(ctx, x, y, 78, 78, clamp((at(213.16) - i * .08) / .5)); }));
    if (at(214.32) > 0) popAt(ctx, 640, 655, at(214.32), () => { K.card(ctx, 340, 615, 600, 80, '#fff', 16); txt(ctx, 'specific places · specific kinds of housing', 640, 655, HAND(700, 36)); });
    K.source(ctx, 'Source: CRS IN12628, Dec 15, 2025', at(211));
  }
  function b7(ctx, lt, dur, t) { // one number that's hard to argue with: 2024 homeowner vacancy 0.95% — lowest on record — nothing for sale
    const T0 = 217.52, at = s => lt - (s - T0);
    if (at(229.74) < 0) {
      K.bg.white(ctx);
      popAt(ctx, 640, 100, at(217.6), () => txt(ctx, 'one number that\'s hard to argue with', 640, 100, HAND(700, 48)));
      popAt(ctx, 640, 200, at(220.6), () => { K.card(ctx, 540, 160, 200, 80, P.yellow, 14); txt(ctx, '2024', 640, 200, HAND(700, 54)); });
      if (at(222.31) > 0) txt(ctx, 'homeowner vacancy rate', 640, 300, PRINT(40), INK, 'center', clamp(at(222.31) / .3));
      if (at(223.8) > 0) Ch.counter(ctx, { x: 640, y: 430, value: .95, decimals: 2, suffix: '%', lt: at(223.8), dur: 1.0, size: 170, color: P.red });
      K.stamp(ctx, 'LOWEST ON RECORD', 640, 590, at(228.34), { color: P.red, size: 54, rot: -.05 });
      K.source(ctx, 'Source: St. Louis Fed, Apr 8, 2026', at(225.6)); return;
    }
    K.bg.sky(ctx); ctx.fillStyle = '#7ccf55'; ctx.fillRect(0, 590, W, 130); Tn.line(ctx, [[0, 590], [W, 590]], 4, INK);
    for (let i = 0; i < 5; i++) { const x = 140 + i * 250; K.house(ctx, x, 600, .75, { wall: ['#ffcf7a', '#c8ecff', '#ffd3e0', '#d7f0c6', '#ffe1a8'][i], roof: [P.red, P.blue, P.purple, P.green, P.orange][i] });
      popAt(ctx, x + 90, 560, at(230.4 + i * .12), () => { ctx.save(); ctx.translate(x + 90, 600); Tn.line(ctx, [[0, 0], [0, -70]], 5, '#8a5a36'); sh(ctx, c => c.roundRect(-50, -110, 100, 44, 6), '#fff', 3.5); txt(ctx, 'SOLD', 0, -88, PRINT(26), P.red); ctx.restore(); }); }
    popAt(ctx, 640, 120, at(230.0), () => { K.card(ctx, 400, 78, 480, 84, '#fff', 18); txt(ctx, 'nothing for sale', 640, 120, HAND(700, 52)); });
  }
  function b8(ctx, lt, dur, t) { // why didn't builders build more? four constraints
    K.bg.white(ctx); const T0 = 231.84, at = s => lt - (s - T0);
    popAt(ctx, 640, 70, at(231.9), () => txt(ctx, "Why didn't builders just build more?", 640, 70, HAND(700, 48)));
    popAt(ctx, 160, 580, at(232.4), () => bean(ctx, 160, 640, .9, t, { skin: 'white', hair: 'none', body: P.orange, top: 'plain', face: { mouth: 'flat', brows: 'worried', look: [.8, -.3] } }));
    if (at(232.4) > 0) { sh(ctx, c => { c.moveTo(105, 348); c.quadraticCurveTo(160, 283, 215, 348); c.closePath(); }, P.yellow, 4); sh(ctx, c => c.roundRect(95, 342, 130, 12, 6), P.yellow, 3.5); }
    K.nameCard(ctx, 'St. Louis Fed', 'four constraints', 1100, 70, at(234.42));
    const cards = [['Not enough construction workers', '👷', 237.1], ['Rising costs: land, materials, labor', '💸', 239.13], ['Zoning rules & slow permitting', '📋', 242.74], ['Too little buildable land near jobs', '📍', 244.83]];
    cards.forEach(([label, emoji, s], i) => { const x = 380 + (i % 2) * 430, y = 230 + Math.floor(i / 2) * 230; popAt(ctx, x + 190, y + 90, at(s), () => { K.card(ctx, x, y, 390, 180, ['#ffe3de', '#fff1c6', '#e2efff', '#dff5e3'][i], 20); txt(ctx, String(i + 1), x + 40, y + 42, HAND(700, 54), P.red); txt(ctx, emoji, x + 330, y + 50, PRINT(54));
      K.wrap(ctx, label, HAND(700, 38), 330).forEach((l, j) => txt(ctx, l, x + 195, y + 100 + j * 40, HAND(700, 38))); }); });
    K.source(ctx, 'Source: St. Louis Fed, Apr 8, 2026', at(235.3));
  }
  function b9(ctx, lt, dur, t) { // that's the first thing that went wrong — but it doesn't explain why it got so much worse after 2022 → the second thing, one of the weirdest traps
    K.bg.studio(ctx, '#ffd9a8', '#fff4e6'); const T0 = 247.7, at = s => lt - (s - T0);
    host(ctx, 300, 700, 1.1, t, [[T0, 'count'], [250.95, 'presentBoth'], [254.89, 'pointUp'], [257.4, 'pointSide']], { mouth: 'flat', brows: at(257.47) > 0 ? 'up' : 'neutral', look: [.5, 0] });
    popAt(ctx, 870, 190, at(247.9), () => { K.card(ctx, 620, 130, 500, 120, '#fff', 20); txt(ctx, '#1', 680, 190, HAND(700, 64), P.red); txt(ctx, 'not enough homes built', 900, 190, HAND(700, 42)); });
    K.check(ctx, 1100, 160, 50, clamp(at(249.41) / .4));
    popAt(ctx, 870, 330, at(253.43), () => { K.card(ctx, 650, 290, 440, 80, P.yellow, 16); txt(ctx, 'so why worse after 2022?', 870, 330, HAND(700, 40)); });
    popAt(ctx, 870, 500, at(255.84), () => { K.card(ctx, 620, 430, 500, 140, '#1f1c1a', 20, 0); txt(ctx, '#2', 690, 500, HAND(700, 64), P.yellow); txt(ctx, '???', 920, 500, HAND(700, 64), '#fff'); });
    if (at(257.47) > 0) popAt(ctx, 1130, 620, at(257.47), () => { // a padlock: the trap teaser
      sh(ctx, c => c.arc(1130, 590, 34, Math.PI, 0), null, 12, '#5d6166'); sh(ctx, c => c.roundRect(1088, 590, 84, 70, 12), P.yellow, 4.5); sh(ctx, c => c.arc(1130, 620, 9, 0, 7), INK, 0); });
  }

  const SH = [
    [0, 1.91, a1], [1.91, 13.55, a2], [13.55, 21.73, a3], [21.73, 42.43, a4], [42.43, 54.73, a5], [54.73, 68.01, a6], [68.01, 91.23, a7], [91.23, 109.84, a8],
    [109.84, 114.23, a9], [114.23, 125.42, a10],
    [125.42, 133.92, b1], [133.92, 139.57, b2], [139.57, 163.88, b3], [163.88, 179.25, b4], [179.25, 199.64, b5], [199.64, 217.52, b6], [217.52, 231.84, b7], [231.84, 247.7, b8], [247.7, 259.63, b9],
  ];
  const shots = SH.map(([start, end, draw]) => ({ start, end, draw }));
  const cuts = SH.slice(1).map(([s]) => ({ t: s, type: 'swoosh', gain: .55 }));
  const pops = [2.0, 2.3, 4.4, 4.9, 6.9, 9.3, 12.6, 14.7, 16.0, 20.3, 27.9, 38.1, 44.3, 46.8, 51.2, 57.3, 66.2, 71.8, 76.9, 78.7, 86.6, 99.0, 102.1, 106.6, 110.6, 113.1, 116.2, 120.0, 127.1, 129.2, 132.0, 136.3, 137.7, 140.1, 150.4, 161.0, 173.0, 180.9, 183.8, 187.4, 190.3, 193.0, 195.7, 202.2, 204.8, 210.2, 214.3, 220.6, 230.0, 232.4, 234.4, 237.1, 239.1, 242.7, 244.8, 247.9, 253.4, 255.8, 257.5]
    .map(t => ({ t, type: 'pop', gain: .5 }));
  const hits = [[0, 'whoosh'], [10.06, 'cash'], [18.05, 'cash'], [24.81, 'tick'], [31.59, 'tick'], [34.57, 'tick'], [49.21, 'ding'], [51.84, 'thud'], [60.5, 'rise'], [62.9, 'tick'], [80.9, 'rise'], [86.48, 'buzz'], [89.5, 'stamp'], [96.6, 'ding'], [122.6, 'rise'], [125.42, 'whoosh'], [130.93, 'thud'], [130.14, 'stamp'], [143.21, 'tick'], [148.44, 'thud'], [157.1, 'tick'], [171.4, 'stamp'], [177.2, 'thud'], [207.61, 'boing'], [223.8, 'ding'], [228.34, 'stamp'], [249.41, 'ding']]
    .map(([t, type]) => ({ t, type, gain: .6 }));
  G.Show = { duration: 259.63, narration: '../biz/assets/audio/housing-02-ch1-2.mp3', shots, sfx: cuts.concat(pops, hits),
    moods: [{ t: 0, mood: 'bright' }, { t: 54.73, mood: 'soft' }, { t: 68.01, mood: 'bright' }, { t: 91.23, mood: 'soft' }, { t: 125.42, mood: 'tense' }, { t: 139.57, mood: 'soft' }, { t: 217.52, mood: 'bright' }, { t: 231.84, mood: 'soft' }, { t: 247.7, mood: 'tense' }],
    images: { redfin: 'assets/housing/redfin.png', jchs: 'assets/housing/harvard-jchs.webp', freddie: 'assets/housing/freddie-mac.jpg', zillow: 'assets/housing/zillow.webp', brookings: 'assets/housing/brooking.jpg', nar: 'assets/housing/nar.png' },
    fonts: ['700 40px Caveat', '40px "Patrick Hand"'] };
})(window);
