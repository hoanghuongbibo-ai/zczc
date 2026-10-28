/* Canada — film-wide overlay layers after the reference channel, drawn in screen space over every shot:
 *  - ERA BADGE (top-left): the era's flag and name + years, flipping over when the era changes ("QIN · 221 B.C." style).
 *  - NAME CARDS: big outlined name with a handwritten role line and arrow when a key person is introduced ("LIU BANG").
 *  - LETTERBOX: black bars slide in for the dramatic beats.
 *  - DEAL COUNT: a wooden sign that swings in and flips its number on each stamped deal ("WARRING STATES COUNT").
 * Times are narration anchors (Film.at). */
(function (G) {
  'use strict';
  const F = G.Film, C = G.Col, INK = '#1e1612', clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), eo = k => 1 - (1 - k) ** 3, back = k => { const c = 1.7; return 1 + (c + 1) * (k - 1) ** 3 + c * (k - 1) ** 2; };
  const a = (ph, from = 0) => F.at(ph, from);
  const tipi = (ctx, x, y, w, h) => { ctx.fillStyle = '#e8d2a0'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#a8603a'; ctx.beginPath(); ctx.moveTo(x + w / 2, y + 4); ctx.lineTo(x + w * .82, y + h - 4); ctx.lineTo(x + w * .18, y + h - 4); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#5a3018'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#3a2010'; ctx.beginPath(); ctx.moveTo(x + w / 2, y + h * .55); ctx.lineTo(x + w * .58, y + h - 4); ctx.lineTo(x + w * .42, y + h - 4); ctx.closePath(); ctx.fill(); };
  const ERAS = [[0, 'CANADA', '1921', (c, x, y, w, h) => C.flagRedEnsign(c, x, y, w, h)], [92.4, 'FIRST PEOPLES', 'since time immemorial', tipi],
    [a('next up france'), 'NEW FRANCE', '1534 – 1763', (c, x, y, w, h) => C.flagFR(c, x, y, w, h, true)], [a('then england joins'), 'NEW FRANCE + HBC', '1670 – 1763', (c, x, y, w, h) => C.flagFR(c, x, y, w, h, true)],
    [a('in 1763 france signs', 380), 'BRITISH NORTH AMERICA', '1763 – 1867', (c, x, y, w, h) => C.flagUK(c, x, y, w, h)], [a('on july 1 1867'), 'DOMINION OF CANADA', '1867 –', (c, x, y, w, h) => C.flagRedEnsign(c, x, y, w, h)],
    [a('in 1914 when'), 'THE WORLD WARS', '1914 – 1945', (c, x, y, w, h) => C.flagRedEnsign(c, x, y, w, h)], [a('after the war the deal'), 'DOMINION OF CANADA', '1945 –', (c, x, y, w, h) => C.flagRedEnsign(c, x, y, w, h)],
    [a('on february 15'), 'CANADA', '1965 – today', (c, x, y, w, h) => C.flagCA(c, x, y, w, h)]].filter(e => e[0] > 0 || e[1] === 'CANADA').sort((p, q) => p[0] - q[0]);
  const NAMES = [[a('named james sutherland'), 'BUSTER BROWN', 'Canadian army officer', 40], [a('jacques cartier'), 'JACQUES CARTIER', 'French explorer, 2nd voyage', 0], [a('james wolfe'), 'JAMES WOLFE', 'the British commander', 0],
    [a('the marquis de montcalm'), 'MONTCALM', 'the French commander', 0], [a('richard montgomery'), 'MONTGOMERY & ARNOLD', 'the American generals', 0], [a('the leading figure'), 'JOHN A. MACDONALD', 'soon: first prime minister', 0],
    [a('his name was louis'), 'LOUIS RIEL', 'Métis leader, age 25', 0], [a('prime minister brian'), 'BRIAN MULRONEY', 'Prime Minister, 1988', 0], [a('prime minister pierre'), 'PIERRE TRUDEAU', 'Prime Minister', 0],
    [a('queen elizabeth'), 'QUEEN ELIZABETH II', 'signs it in Ottawa', 0], [a("quebec's premier"), 'RENÉ LÉVESQUE', 'Premier of Quebec — says no', 0]];
  const BARS = [[a('the battle', 395), a('both generals', 395) + 1.5], [a('wolfe is shot', 395) - .2, a('each side', 400)], [a('on easter monday'), a('by april 12')], [a('many were abused') - .3, a('poor records') + 2],
    [a('nine days later') - .2, a('to many in english')], [a('then the final'), a('the country survived') + 1.5], [a('not a single'), a('back to the coast')]].filter(b => b[1] > b[0]);
  function badge(ctx, t) { let i = 0; while (i + 1 < ERAS.length && t >= ERAS[i + 1][0]) i++; const [t0, name, yrs, flag] = ERAS[i], flip = clamp((t - t0) / .45), sx = t0 > 0 ? Math.abs(Math.cos(Math.PI * (1 - eo(flip)))) : 1, show = flip < .5 && i > 0 ? ERAS[i - 1] : ERAS[i];
    ctx.save(); ctx.translate(20, 16); ctx.font = '22px "Luckiest Guy"'; const w = Math.max(150, ctx.measureText(show[1]).width + 86); ctx.translate(w / 2, 0); ctx.scale(Math.max(.05, sx), 1); ctx.translate(-w / 2, 0);
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.roundRect(3, 4, w, 58, 12); ctx.fill(); ctx.fillStyle = 'rgba(251,248,240,.95)'; ctx.beginPath(); ctx.roundRect(0, 0, w, 58, 12); ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.roundRect(8, 9, 56, 40, 6); ctx.clip(); show[3](ctx, 8, 9, 56, 40); ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(8, 9, 56, 40, 6); ctx.stroke();
    ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(show[1], 74, 32); ctx.font = '700 14px Fredoka'; ctx.fillStyle = '#6a5040'; ctx.fillText(show[2], 75, 49); ctx.restore(); return 80; }
  function nameCard(ctx, t) { for (const [t0, name, role, dy] of NAMES) { const u = t - t0; if (u < -.1 || u > 3.6) continue; const kin = eo(clamp(u / .35)), kout = clamp((u - 3.1) / .5), x = 54 - (1 - kin) * 400 - kout * 60, y = 560 - (dy || 0);
      ctx.save(); ctx.globalAlpha = 1 - kout; ctx.font = '62px "Luckiest Guy"'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; G.Type.outlined(ctx, name, x, y, 62, ['#ffffff', '#f0e8d8']);
      const nw = ctx.measureText(name).width, kw = clamp((u - .35) / .4); ctx.fillStyle = '#d8241a'; ctx.fillRect(x, y + 10, nw * eo(kw), 7);
      if (u > .5) { const k2 = clamp((u - .5) / .3); ctx.globalAlpha = (1 - kout) * k2; ctx.save(); ctx.translate(x + 6, y + 50); ctx.rotate(-.04); ctx.font = '28px "Permanent Marker"'; ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = '#fffaf0'; ctx.strokeText(role, 0, 0); ctx.fillStyle = '#c23a2c'; ctx.fillText(role, 0, 0); ctx.restore(); }
      ctx.restore(); } }
  function bars(ctx, t) { let k = 0; for (const [t0, t1] of BARS) k = Math.max(k, Math.min(eo(clamp((t - t0) / .5)), eo(clamp((t1 - t) / .5)))); if (k <= 0) return; const h = 74 * k; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1280, h); ctx.fillRect(0, 720 - h, 1280, h); }
  // the deal-count sign, called by Scenes.dealStamp with its number
  G.dealSign = (ctx, t, tDeal, n) => { const u = t - tDeal + .3; if (u < 0 || u > 3.8) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const drop = eo(clamp(u / .45)), out = clamp((u - 3.3) / .5), sw = Math.sin(u * 5) * Math.exp(-u * 1.4) * .12;
    ctx.translate(1060, -40 + drop * 60 - out * 240); ctx.rotate(sw); ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 5; for (const d of [-90, 90]) { ctx.beginPath(); ctx.moveTo(d * .6, -60); ctx.lineTo(d, 30); ctx.stroke(); }
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(-150 + 5, 30 + 7, 300, 108, 12); ctx.fill(); const g = ctx.createLinearGradient(0, 30, 0, 138); g.addColorStop(0, '#a8743e'); g.addColorStop(1, '#7a4e26'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-150, 30, 300, 108, 12); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#3a2410'; ctx.stroke();
    ctx.strokeStyle = 'rgba(60,36,16,.4)'; ctx.lineWidth = 2; for (const yy of [62, 96]) { ctx.beginPath(); ctx.moveTo(-140, yy); ctx.quadraticCurveTo(0, yy + 6, 140, yy - 2); ctx.stroke(); }
    ctx.font = '30px "Luckiest Guy"'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#2a1608'; ctx.fillText('DEAL', -128, 66); ctx.fillText('COUNT:', -128, 104);
    const fl = clamp((u - .9) / .35), num = fl < .5 ? n - 1 : n, sy = Math.abs(Math.cos(Math.PI * fl)); ctx.save(); ctx.translate(76, 84); ctx.rotate(.05 - (fl > 0 && fl < 1 ? .3 * Math.sin(Math.PI * fl) : 0)); ctx.scale(1, Math.max(.05, sy)); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-36, -36, 72, 72); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(-36, -36, 72, 72); ctx.fillStyle = INK; ctx.font = '54px "Luckiest Guy"'; ctx.textAlign = 'center'; ctx.fillText(String(num), 0, 6); ctx.restore();
    ctx.restore(); };
  G.drawOverlays = (ctx, t) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); bars(ctx, t); if (t > 2) badge(ctx, t); nameCard(ctx, t); ctx.restore(); };
})(window);
