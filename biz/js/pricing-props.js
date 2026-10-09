/* Shared props + cast for the pricing video ("Your Price Isn't My Price"), used by every pricing part.
 *   Pr.YOU / Pr.NEIGHBOUR                 the recurring pair (skin-toned leads), Bean.person options
 *   Pr.extra(i)                            white-faced extra #i (varied hair / clothes, deterministic)
 *   Pr.phone(ctx, x, y, s, screen, o)      phone, centre (x, y), 300 × 580 at s = 1; screen(ctx, w, h) draws inside the glass
 *   Pr.tag(ctx, x, y, s, price, lt, o)     swing price tag on a string (o.color, o.rot, o.strike)
 *   Pr.eggs(ctx, x, y, s, o)               a dozen-egg carton, base centre at (x, y); o.brand draws the Lucerne wordmark
 *   Pr.store(ctx, x, y, s, logo, o)        store front, base centre (x, y); logo = image key with o.crop, or text
 *   Pr.pin(ctx, x, y, s, lt, col)          map pin dropping onto (x, y)
 *   Pr.calendar(ctx, x, y, s, top, big, o) desk calendar page (o.flip 0..1 = previous page lifting away)
 *   Pr.table(ctx, y, col)                  table top from y down */
(function (G) {
  'use strict';
  const K = G.Kit, B = G.Bean, Tn = G.Toon, IMG = Tn.IMG;
  const { P, HAND, PRINT, txt, sh, clamp, lerp, out, back } = K;
  const INK = K.INK;

  const YOU = { skin: B.SKIN, hair: 'short', hairColor: '#5a3a22', body: P.teal, top: 'plain', legs: '#2f3a4a' };
  const NEIGHBOUR = { skin: '#e8b48a', hair: 'bob', hairColor: '#2b1d14', body: P.yellow, top: 'plain', legs: '#3a3a40' };
  const HAIR = ['short', 'bob', 'side', 'long', 'bald', 'bun', 'short', 'side'], HC = ['#3a2a1e', '#d9a441', '#1f1c1a', '#8a5a32', '#6b4a2b', '#b9b6b0'];
  const CLOTH = [P.blue, P.red, P.green, P.purple, P.orange, '#6c757d', P.pink, '#3c6e8f'];
  const extra = i => ({ skin: 'white', hair: HAIR[i % HAIR.length], hairColor: HC[(i * 7) % HC.length], body: CLOTH[(i * 5) % CLOTH.length], glasses: i % 5 === 3 });

  function phone(ctx, x, y, s, screen, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
    sh(ctx, c => c.roundRect(-150 + 8, -290 + 10, 300, 580, 42), 'rgba(0,0,0,.15)', 0);
    sh(ctx, c => c.roundRect(-150, -290, 300, 580, 42), o.body || '#24272e', 5);
    ctx.save(); ctx.beginPath(); ctx.roundRect(-132, -262, 264, 524, 26); ctx.clip();
    ctx.fillStyle = o.glass || '#fff'; ctx.fillRect(-132, -262, 264, 524);
    ctx.translate(-132, -262); if (screen) screen(ctx, 264, 524); ctx.restore();
    sh(ctx, c => c.roundRect(-132, -262, 264, 524, 26), null, 3);
    sh(ctx, c => c.roundRect(-38, -280, 76, 10, 5), '#4a4e56', 0);
    ctx.restore();
  }
  // price tag hanging from a string, swings in on entrance
  function tag(ctx, x, y, s, price, lt, o = {}) {
    if (lt <= 0) return; const sw = Math.sin(lt * 7) * Math.exp(-lt * 3) * .35 + (o.rot || 0), k = back(clamp(lt / .3));
    ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.rotate(sw);
    ctx.font = HAND(700, o.size || 44); const tw = ctx.measureText(price).width, R = Math.max(58, tw / 2 + 14), L = -R - 34;   // body grows with the text; the hole sits left of it
    Tn.line(ctx, [[0, -40], [0, 0]], 3, INK);
    sh(ctx, c => { c.moveTo(L, 18); c.lineTo(L + 28, 0); c.lineTo(R, 0); c.lineTo(R, 64); c.lineTo(L + 28, 64); c.lineTo(L, 46); c.closePath(); }, o.color || '#fff', 4.5);
    sh(ctx, c => c.arc(L + 20, 32, 6, 0, 7), '#fff', 3);
    txt(ctx, price, (L + 34 + R) / 2, 33, HAND(700, o.size || 44), o.ink || INK);
    if (o.strike) K.strike(ctx, L + 36, 48, R - 6, 14, clamp(o.strike), P.red, 6);
    ctx.restore();
  }
  function eggs(ctx, x, y, s = 1, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-120, 0); c.lineTo(-128, -58); c.lineTo(128, -58); c.lineTo(120, 0); c.closePath(); }, '#f3e7cf', 4.5);     // tray
    for (let i = 0; i < 6; i++) sh(ctx, c => c.ellipse(-100 + i * 40, -62, 17, 12, 0, Math.PI, 0), '#fffaf0', 3);                  // egg tops peeking
    sh(ctx, c => { c.moveTo(-130, -60); c.quadraticCurveTo(-128, -118, -96, -122); c.lineTo(96, -122); c.quadraticCurveTo(128, -118, 130, -60); c.closePath(); }, o.lid || '#e9f2fb', 4.5);  // lid
    for (let i = 1; i < 6; i++) Tn.line(ctx, [[-128 + i * 43, -66], [-128 + i * 43, -110]], 2, 'rgba(60,80,110,.25)');
    if (o.brand !== false) { sh(ctx, c => c.roundRect(-74, -112, 148, 40, 10), '#1d4f91', 3); txt(ctx, 'Lucerne', 0, -92, HAND(700, 34), '#fff'); txt(ctx, '12 LARGE EGGS', 0, -26, PRINT(20), '#6b5b3e'); }
    ctx.restore();
  }
  function store(ctx, x, y, s, logo, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const w = o.w || 520, h = o.h || 300;
    sh(ctx, c => c.rect(-w / 2, -h, w, h), o.wall || '#f4efe6', 5);
    sh(ctx, c => c.rect(-w / 2 - 14, -h - 18, w + 28, 26), o.trim || P.red, 4.5);
    const lh = o.logoH || 60;
    sh(ctx, c => c.roundRect(-w * .32, -h + 22, w * .64, lh + 18, 12), '#fff', 4.5);
    if (IMG[logo]) { const cr = o.crop || [0, 0, IMG[logo].width, IMG[logo].height], lw = Math.min(w * .6, lh * cr[2] / cr[3]); ctx.drawImage(IMG[logo], cr[0], cr[1], cr[2], cr[3], -lw / 2, -h + 31, lw, lh); }
    else txt(ctx, logo, 0, -h + 31 + lh / 2, HAND(700, 46), o.trim || P.red);
    // windows + doors
    for (const sx of [-1, 1]) { sh(ctx, c => c.rect(sx * w * .27 - 70, -170, 140, 120), '#bfe6ff', 4); Tn.line(ctx, [[sx * w * .27, -170], [sx * w * .27, -50]], 3, INK); }
    sh(ctx, c => c.rect(-46, -150, 92, 150), '#9fd3f5', 4.5); Tn.line(ctx, [[0, -150], [0, 0]], 3.5, INK);
    const ay = -h + lh + 52; sh(ctx, c => { c.moveTo(-w / 2 + 10, ay); c.lineTo(w / 2 - 10, ay); c.lineTo(w / 2 + 6, ay + 38); c.lineTo(-w / 2 - 6, ay + 38); c.closePath(); }, o.awning || '#e04b3a', 4);
    for (let i = 0; i < 8; i++) { if (i % 2) continue; const a = -w / 2 + 10 + i * (w - 20) / 8; sh(ctx, c => { c.moveTo(a, ay + 2); c.lineTo(a + (w - 20) / 8, ay + 2); c.lineTo(a + (w - 20) / 8 + 2, ay + 36); c.lineTo(a - 2, ay + 36); c.closePath(); }, '#fff', 0); }
    ctx.restore();
  }
  function pin(ctx, x, y, s, lt, col = P.red) {
    if (lt <= 0) return; const fall = clamp(lt / .3), yy = lerp(y - 260, y, fall * fall), sq = fall >= 1 ? 1 - .18 * Math.sin(clamp((lt - .3) / .25) * Math.PI) : 1;
    if (fall >= 1) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, y + 4, 22 * s, 7 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.translate(x, yy); ctx.scale(s / sq * .98 + .02, s * sq);
    sh(ctx, c => { c.moveTo(0, 0); c.bezierCurveTo(-14, -26, -36, -44, -36, -70); c.arc(0, -70, 36, Math.PI, 0); c.bezierCurveTo(36, -44, 14, -26, 0, 0); c.closePath(); }, col, 4.5);
    sh(ctx, c => c.arc(0, -70, 14, 0, 7), '#fff', 3.5); ctx.restore();
  }
  function calendar(ctx, x, y, s, top, big, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, c => { c.moveTo(-120, 0); c.lineTo(-90, -230); c.lineTo(90, -230); c.lineTo(120, 0); c.closePath(); }, '#6d6f78', 4.5);       // tent stand
    const page = (t1, t2, fill = '#fff') => { sh(ctx, c => c.roundRect(-100, -250, 200, 230, 12), fill, 4.5); sh(ctx, c => c.roundRect(-100, -250, 200, 62, [12, 12, 0, 0]), o.head || P.red, 4.5); txt(ctx, t1, 0, -218, PRINT(30), '#fff'); txt(ctx, t2, 0, -112, HAND(700, o.bigSize || 80), INK); };
    page(top, big);
    if (o.flip != null && o.flip < 1) { const f = out(o.flip); ctx.save(); ctx.translate(0, -250); ctx.scale(1, Math.cos(f * Math.PI * .5) * (f < 1 ? 1 : 0)); ctx.translate(0, 250); ctx.globalAlpha = 1 - f * .3; page(o.prevTop || '', o.prevBig || '', '#f7f3ea'); ctx.restore(); }
    for (const rx of [-60, -20, 20, 60]) sh(ctx, c => c.arc(rx, -252, 7, 0, 7), '#c7cbd2', 3);
    ctx.restore();
  }
  function table(ctx, y, col = '#c98f5a') { ctx.fillStyle = col; ctx.fillRect(-200, y, 1680, 900); Tn.line(ctx, [[-200, y], [1480, y]], 5, INK); ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(-200, y + 6, 1680, 10); }
  G.Pr = { YOU, NEIGHBOUR, extra, phone, tag, eggs, store, pin, calendar, table };
})(window);
