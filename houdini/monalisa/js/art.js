/* The paintings. G.ML.mona(g, cx, cy, h, o) draws the Mona Lisa (house-style painting in the Louvre colours: dark
 * varnish, green-blue sky, NO visible eyebrows) centred at (cx, cy), h px tall (30 × 21 in → w = h · .688).
 *   o.brows   draw eyebrows (Vasari's description gag)      o.smile 0..1 (default .55)      o.look [-1..1] eyes
 *   o.frame   'gold' (Louvre frame) | 'plain' | false        o.glass true → armoured glass sheen + reflections
 *   o.damage  'acid' | 'rock' marks   o.splat 'cake' | 'soup' on the glass   o.sepia 0..1   o.blank (just the poplar panel)
 * G.ML.panelBack(g, cx, cy, h)  the bare poplar back of the panel (what Peruggia carried under his smock)
 * G.ML.painting(g, x, y, w, h, seed, o)  a generic old-master painting in a gilt frame (gallery filler)
 * G.ML.pegs(g, cx, cy, h)  four iron pegs + the cleaner rectangle of wall (1911) */
(function (G) {
  'use strict';
  const T = G.Toon, { clamp, lerp, rng } = T, TAU = Math.PI * 2, PI = Math.PI;
  const PW = 530, PH = 770, cache = {};
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  function blurPath(g, px, fn) { g.save(); g.filter = `blur(${px}px)`; fn(g); g.restore(); }
  function paint(o) {
    const c = mk(PW, PH), g = c.getContext('2d');
    // sky + distant landscape
    let gr = g.createLinearGradient(0, 0, 0, PH * .55); gr.addColorStop(0, '#9fb8a0'); gr.addColorStop(.5, '#b8c49a'); gr.addColorStop(1, '#8aa088'); g.fillStyle = gr; g.fillRect(0, 0, PW, PH);
    blurPath(g, 3, g => { g.fillStyle = '#7a9a8e'; g.beginPath(); g.moveTo(0, 180); g.quadraticCurveTo(60, 120, 120, 160); g.quadraticCurveTo(170, 110, 220, 150); g.lineTo(220, 330); g.lineTo(0, 330); g.fill();
      g.beginPath(); g.moveTo(PW, 150); g.quadraticCurveTo(470, 100, 420, 150); g.quadraticCurveTo(380, 120, 330, 170); g.lineTo(330, 330); g.lineTo(PW, 330); g.fill();
      g.fillStyle = '#a8b89a'; g.beginPath(); g.ellipse(80, 250, 90, 22, 0, 0, TAU); g.fill(); g.beginPath(); g.ellipse(450, 230, 80, 18, 0, 0, TAU); g.fill();   // lakes
      g.fillStyle = '#6a7e5e'; g.beginPath(); g.moveTo(0, 300); g.quadraticCurveTo(100, 260, 200, 300); g.lineTo(200, 460); g.lineTo(0, 460); g.fill(); g.beginPath(); g.moveTo(PW, 290); g.quadraticCurveTo(420, 250, 340, 300); g.lineTo(340, 460); g.lineTo(PW, 460); g.fill(); });
    blurPath(g, 1.5, g => { g.strokeStyle = 'rgba(190,165,115,.75)'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(40, 430); g.bezierCurveTo(120, 400, 70, 360, 130, 340); g.stroke(); });   // winding road (left)
    blurPath(g, 1, g => { g.fillStyle = 'rgba(140,110,80,.8)'; g.fillRect(380, 372, 110, 10); g.fillStyle = '#8aa088'; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(394 + i * 27, 384, 10, PI, TAU); g.fill(); } });   // the bridge (right)
    // loggia ledge
    g.fillStyle = '#5a4a32'; g.fillRect(0, 470, PW, 30);
    // hair + veil behind
    g.fillStyle = '#2e2014'; g.beginPath(); g.moveTo(170, 150); g.quadraticCurveTo(140, 330, 150, 470); g.lineTo(360, 470); g.quadraticCurveTo(370, 330, 340, 150); g.quadraticCurveTo(255, 70, 170, 150); g.fill();
    // body: dark dress, mustard sleeves, folded hands
    gr = g.createLinearGradient(0, 380, 0, PH); gr.addColorStop(0, '#3a3a22'); gr.addColorStop(1, '#22220f'); g.fillStyle = gr;
    g.beginPath(); g.moveTo(90, PH); g.quadraticCurveTo(80, 480, 170, 410); g.quadraticCurveTo(255, 395, 345, 410); g.quadraticCurveTo(440, 480, 450, PH); g.fill();
    g.fillStyle = '#9a7a3a'; g.beginPath(); g.moveTo(80, PH); g.quadraticCurveTo(70, 600, 170, 540); g.quadraticCurveTo(260, 600, 300, 640); g.lineTo(290, PH); g.fill();   // sleeve (her right arm)
    g.fillStyle = '#8a6a32'; g.beginPath(); g.moveTo(470, PH); g.quadraticCurveTo(480, 600, 380, 560); g.quadraticCurveTo(320, 600, 300, 660); g.lineTo(320, PH); g.fill();
    g.strokeStyle = 'rgba(60,40,10,.3)'; g.lineWidth = 3; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(96 + i * 14, 700 + i * 12); g.quadraticCurveTo(120 + i * 12, 640 + i * 8, 160 + i * 10, 610 + i * 10); g.stroke(); }
    // neckline + chest
    gr = g.createRadialGradient(255, 430, 20, 255, 450, 120); gr.addColorStop(0, '#e8c890'); gr.addColorStop(1, '#b89060'); g.fillStyle = gr;
    g.beginPath(); g.moveTo(180, 432); g.quadraticCurveTo(255, 500, 330, 432); g.quadraticCurveTo(300, 390, 255, 385); g.quadraticCurveTo(210, 390, 180, 432); g.fill();
    g.strokeStyle = '#4a3a1a'; g.lineWidth = 3; g.beginPath(); g.moveTo(180, 432); g.quadraticCurveTo(255, 500, 330, 432); g.stroke();
    // hands (right over left)
    gr = g.createLinearGradient(200, 640, 380, 720); gr.addColorStop(0, '#e2bc88'); gr.addColorStop(1, '#b88c58'); g.fillStyle = gr;
    g.beginPath(); g.moveTo(170, 700); g.quadraticCurveTo(220, 650, 300, 662); g.quadraticCurveTo(350, 672, 352, 700); g.quadraticCurveTo(300, 726, 230, 722); g.quadraticCurveTo(180, 718, 170, 700); g.fill(); g.beginPath(); g.moveTo(280, 650); g.quadraticCurveTo(340, 630, 400, 660); g.quadraticCurveTo(398, 690, 350, 690); g.quadraticCurveTo(300, 682, 280, 650); g.fill();
    g.strokeStyle = 'rgba(90,60,30,.5)'; g.lineWidth = 2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(190 + i * 18, 700); g.lineTo(170 + i * 18, 720); g.stroke(); }
    // neck + face (sfumato)
    g.fillStyle = '#d8b07a'; g.beginPath(); g.moveTo(222, 320); g.lineTo(290, 320); g.lineTo(300, 410); g.lineTo(212, 410); g.closePath(); g.fill();
    gr = g.createRadialGradient(245, 230, 20, 255, 250, 110); gr.addColorStop(0, '#f2d8a2'); gr.addColorStop(.7, '#d8b07a'); gr.addColorStop(1, '#a87e4e'); g.fillStyle = gr;
    g.beginPath(); g.ellipse(255, 245, 78, 102, 0, 0, TAU); g.fill();
    blurPath(g, 6, g => { g.fillStyle = 'rgba(120,80,40,.35)'; g.beginPath(); g.ellipse(320, 260, 26, 80, 0, 0, TAU); g.fill(); g.beginPath(); g.ellipse(255, 345, 60, 14, 0, 0, TAU); g.fill(); });
    // eyes (looking to her right = our left… she glances toward the viewer)
    const lk = (o.look || 0) * 4;
    for (const [ex, sc] of [[222, 1], [290, .92]]) { g.fillStyle = '#e8d4b0'; g.beginPath(); g.ellipse(ex, 222, 18 * sc, 8, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(58,38,20,.8)'; g.beginPath(); g.arc(ex - 4 + lk, 222, 6, 0, TAU); g.fill();
      blurPath(g, 3, g => { g.fillStyle = 'rgba(110,70,40,.55)'; g.beginPath(); g.ellipse(ex, 212, 22 * sc, 7, 0, 0, TAU); g.fill(); }); g.strokeStyle = 'rgba(90,55,30,.5)'; g.lineWidth = 2; g.beginPath(); g.ellipse(ex, 222, 18 * sc, 8, 0, PI * 1.05, PI * 1.95); g.stroke(); }
    if (o.brows) { g.strokeStyle = '#3a2614'; g.lineWidth = 5; g.lineCap = 'round'; for (const ex of [222, 290]) { g.beginPath(); g.moveTo(ex - 18, 200); g.quadraticCurveTo(ex, 190, ex + 18, 198); g.stroke(); } }
    blurPath(g, 2, g => { g.strokeStyle = 'rgba(120,80,45,.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(258, 230); g.quadraticCurveTo(250, 268, 262, 276); g.stroke(); g.fillStyle = 'rgba(120,80,45,.35)'; g.beginPath(); g.ellipse(262, 280, 14, 6, 0, 0, TAU); g.fill(); });
    const sm = o.smile ?? .55; blurPath(g, 1.5, g => { g.strokeStyle = 'rgba(120,70,45,.6)'; g.lineWidth = 2.6; g.beginPath(); g.moveTo(236, 304 - sm * 3); g.quadraticCurveTo(258, 309 + sm * 2, 284, 302 - sm * 5); g.stroke();
      g.fillStyle = 'rgba(110,60,40,.22)'; for (const sd of [-1, 1]) { g.beginPath(); g.arc(258 + sd * 27, 302 - sm * 5, 4, 0, TAU); g.fill(); } });
    // veil over hair
    g.fillStyle = 'rgba(30,22,14,.55)'; g.beginPath(); g.moveTo(178, 150); g.quadraticCurveTo(255, 110, 335, 150); g.quadraticCurveTo(255, 130, 178, 150); g.fill();
    g.strokeStyle = 'rgba(20,14,8,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(178, 160); g.quadraticCurveTo(255, 135, 335, 160); g.stroke();
    for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(80,50,25,.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(190 - i * 3, 200 + i * 30); g.quadraticCurveTo(170, 220 + i * 30, 182, 240 + i * 30); g.stroke(); g.beginPath(); g.moveTo(322 + i * 3, 200 + i * 30); g.quadraticCurveTo(342, 220 + i * 30, 330, 240 + i * 30); g.stroke(); }
    // old varnish + vignette + craquelure
    g.globalCompositeOperation = 'multiply'; gr = g.createRadialGradient(255, 300, 120, 255, 380, 520); gr.addColorStop(0, 'rgba(255,236,190,1)'); gr.addColorStop(1, 'rgba(120,96,50,1)'); g.fillStyle = gr; g.fillRect(0, 0, PW, PH); g.globalCompositeOperation = 'source-over';
    const r = rng(11); g.strokeStyle = 'rgba(40,30,15,.06)'; g.lineWidth = .8; for (let i = 0; i < 200; i++) { let x = r() * PW, y = r() * PH; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 3; j++) { x += (r() - .5) * 26; y += (r() - .5) * 26; g.lineTo(x, y); } g.stroke(); }
    return c; }
  const key = o => [o.brows ? 1 : 0, Math.round((o.smile ?? .55) * 10), Math.round((o.look || 0) * 4)].join(',');
  function mona(g, cx, cy, h, o = {}) { const w = h * PW / PH, x = cx - w / 2, y = cy - h / 2;
    if (o.frame === 'gold' || o.frame === undefined) frameGold(g, x, y, w, h);
    else if (o.frame === 'plain') { g.fillStyle = '#5a3a1e'; g.fillRect(x - h * .03, y - h * .03, w + h * .06, h * 1.06); }
    if (o.blank) { panel(g, x, y, w, h); }
    else { const k = key(o); const c = cache[k] || (cache[k] = paint(o)); g.save(); if (o.sepia) g.filter = `sepia(${o.sepia}) contrast(1.05)`; g.drawImage(c, x, y, w, h); g.restore(); }
    if (o.damage === 'acid') { g.save(); g.globalAlpha = .7; g.fillStyle = '#e8e0c8'; for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(x + w * (.25 + (i * .07) % .5), y + h * (.82 + (i % 3) * .05), w * .03, h * .012, i, 0, TAU); g.fill(); } g.restore(); }
    if (o.damage === 'rock') { g.fillStyle = '#e8dcc0'; g.beginPath(); g.arc(x + w * .24, y + h * .8, h * .008, 0, TAU); g.fill(); }
    if (o.glass) { g.save(); g.globalAlpha = .22; const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.45, 'rgba(255,255,255,.9)'); gr.addColorStop(.55, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x, y, w, h); g.restore();
      g.strokeStyle = 'rgba(200,230,255,.5)'; g.lineWidth = Math.max(2, h * .006); g.strokeRect(x - h * .01, y - h * .01, w + h * .02, h * 1.02); }
    if (o.splat) { const r = rng(o.splat === 'cake' ? 5 : 9), col = o.splat === 'cake' ? '#f4ecd8' : '#e8862a', k = o.splatK ?? 1; g.save(); g.fillStyle = col; g.strokeStyle = o.splat === 'cake' ? '#d8c8a8' : '#b8601a'; g.lineWidth = 2;
      for (let i = 0; i < 14; i++) { const sx = x + w * (.2 + r() * .6), sy = y + h * (.2 + r() * .6), rr = h * (.02 + r() * .05) * k; g.beginPath(); g.arc(sx, sy, rr, 0, TAU); g.fill(); g.fillRect(sx - rr * .3, sy, rr * .6, rr * 2.5 * k); } g.restore(); } }
  function frameGold(g, x, y, w, h) { const b = h * .085; g.save(); g.fillStyle = 'rgba(20,12,6,.45)'; g.fillRect(x - b + h * .02, y - b + h * .025, w + b * 2, h + b * 2);
    let gr = g.createLinearGradient(x - b, y - b, x + w + b, y + h + b); gr.addColorStop(0, '#f2d888'); gr.addColorStop(.5, '#b8862e'); gr.addColorStop(1, '#e8c470'); g.fillStyle = gr; g.fillRect(x - b, y - b, w + b * 2, h + b * 2);
    g.strokeStyle = '#6a4a14'; g.lineWidth = Math.max(2, b * .1); g.strokeRect(x - b, y - b, w + b * 2, h + b * 2); g.strokeRect(x - b * .45, y - b * .45, w + b * .9, h + b * .9); g.strokeRect(x - 2, y - 2, w + 4, h + 4);
    g.fillStyle = 'rgba(255,240,180,.55)'; for (let i = 0; i < 18; i++) { const u = i / 18; g.beginPath(); g.arc(x - b * .72 + (w + b * 1.44) * u, y - b * .72, b * .12, 0, TAU); g.fill(); g.beginPath(); g.arc(x - b * .72 + (w + b * 1.44) * u, y + h + b * .72, b * .12, 0, TAU); g.fill(); } g.restore(); }
  function panel(g, x, y, w, h) { const gr = g.createLinearGradient(x, y, x + w, y); gr.addColorStop(0, '#c8a070'); gr.addColorStop(.5, '#dcb888'); gr.addColorStop(1, '#b88e5e'); g.fillStyle = gr; g.fillRect(x, y, w, h);
    g.strokeStyle = 'rgba(90,60,30,.35)'; g.lineWidth = Math.max(1, h * .004); for (let i = 0; i < 16; i++) { g.beginPath(); g.moveTo(x + w * (i + .5) / 16, y); g.bezierCurveTo(x + w * (i + .7) / 16, y + h * .3, x + w * (i + .3) / 16, y + h * .6, x + w * (i + .5) / 16, y + h); g.stroke(); }
    g.strokeStyle = '#5a3a1e'; g.lineWidth = Math.max(2, h * .01); g.strokeRect(x, y, w, h); }
  function panelBack(g, cx, cy, h) { const w = h * PW / PH; panel(g, cx - w / 2, cy - h / 2, w, h); g.fillStyle = 'rgba(60,40,20,.5)'; g.fillRect(cx - w / 2, cy - h * .1, w, h * .05); g.fillRect(cx - w / 2, cy + h * .25, w, h * .05); }
  const PAL = [['#6a4a2a', '#c8a060', '#3a5a3a'], ['#2a3a5a', '#d8c098', '#8a2a2a'], ['#4a3a2a', '#e8d0a0', '#5a6a3a'], ['#3a2a3a', '#c89070', '#2a4a5a'], ['#5a5a3a', '#e0c890', '#7a3a2a']];
  function painting(g, x, y, w, h, seed = 1, o = {}) { const r = rng(seed), p = PAL[seed % PAL.length]; const b = Math.min(w, h) * .09;
    g.fillStyle = 'rgba(20,12,6,.4)'; g.fillRect(x - b + 4, y - b + 5, w + b * 2, h + b * 2); g.fillStyle = o.frameCol || '#b8862e'; g.fillRect(x - b, y - b, w + b * 2, h + b * 2); g.strokeStyle = '#5a3a10'; g.lineWidth = 3; g.strokeRect(x - b, y - b, w + b * 2, h + b * 2); g.strokeRect(x - 1, y - 1, w + 2, h + 2);
    g.fillStyle = p[0]; g.fillRect(x, y, w, h); const kind = seed % 3;
    if (kind === 0) { g.fillStyle = p[1]; g.beginPath(); g.ellipse(x + w / 2, y + h * .38, w * .17, h * .17, 0, 0, TAU); g.fill(); g.fillStyle = p[2]; g.beginPath(); g.moveTo(x + w * .15, y + h); g.quadraticCurveTo(x + w / 2, y + h * .45, x + w * .85, y + h); g.fill(); }
    else if (kind === 1) { g.fillStyle = p[1]; g.fillRect(x, y, w, h * .5); g.fillStyle = p[2]; g.beginPath(); g.moveTo(x, y + h * .6); for (let i = 0; i <= 6; i++) g.lineTo(x + w * i / 6, y + h * (.45 + r() * .2)); g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.fill(); }
    else { g.fillStyle = p[1]; g.fillRect(x, y + h * .62, w, h * .38); for (let i = 0; i < 3; i++) { const fx = x + w * (.25 + i * .25), fy = y + h * (.66 + (i % 2) * .05); g.fillStyle = [p[2], '#e8d8b8', '#8a2a22'][i]; g.beginPath(); g.moveTo(fx - w * .07, fy + h * .05); g.lineTo(fx - w * .05, fy - h * .3); g.lineTo(fx + w * .05, fy - h * .3); g.lineTo(fx + w * .07, fy + h * .05); g.closePath(); g.fill(); g.fillStyle = '#e8c8a0'; g.beginPath(); g.arc(fx, fy - h * .36, Math.min(w, h) * .055, 0, TAU); g.fill(); } }
    g.fillStyle = 'rgba(80,60,20,.25)'; g.fillRect(x, y, w, h); }
  function pegs(g, cx, cy, h, o = {}) { const w = h * PW / PH, b = h * .085; g.fillStyle = 'rgba(255,248,230,.22)'; g.fillRect(cx - w / 2 - b, cy - h / 2 - b, w + b * 2, h + b * 2);
    g.strokeStyle = 'rgba(80,60,40,.25)'; g.lineWidth = 2; g.strokeRect(cx - w / 2 - b, cy - h / 2 - b, w + b * 2, h + b * 2);
    for (const [dx, dy] of [[-.3, -.42], [.3, -.42], [-.3, .45], [.3, .45]]) { const px = cx + dx * w, py = cy + dy * h; g.fillStyle = '#2a2420'; g.beginPath(); g.arc(px, py, h * .018, 0, TAU); g.fill(); g.strokeStyle = '#15100c'; g.lineWidth = h * .012; g.lineCap = 'round'; g.beginPath(); g.moveTo(px, py); g.lineTo(px, py - h * .04); g.stroke(); } }
  G.ML = { mona, panelBack, painting, pegs, frameGold, W: PW, H: PH };
})(window);
