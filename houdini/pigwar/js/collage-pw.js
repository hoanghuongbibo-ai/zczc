/* The Pig War — real-photo collage layer. Each insert appears only while the narration names that person, place or document, and leaves
 * when the line moves on. Styles match what the object is:
 *  - 'cabinet'  a 19th-century cabinet card for period portraits (cream mount, gilt line, sepia print, studio imprint)
 *  - 'polaroid' a taped instant print for modern photos (white border, handwritten caption)
 *  - 'torn'     a torn-paper clipping for paintings, watercolours and maps (ragged edges, a pin)
 *  - 'postcard' a picture postcard with stamp and postmark
 * Inserts are screen-space, sit in the free side of each shot, and carry a short caption so nobody mistakes a painting for a photo. */
(function (G) {
  'use strict';
  const F2 = G.F2, U = G.SUI, { shape, mix, clamp, lerp, rng, INK } = G.Rig, sh = shape, k01 = U.k01, ease = U.ease, at = F2.at;
  const IMG = k => G.Toon.IMG[k];
  const files = ['amcamp-painting', 'bellevue-watercolour', 'evacuate-1872', 'building-redoubt', 'ship-of-line', 'kaiser', 'kaiser-bw', 'limekiln', 'limekiln2', 'limekiln3', 'bellevue-site', 'redoubt-aerial', 'marines-uniform', 'marines-english-camp', 'bellevue-photo', 'english-camp-aerial', 'amcamp-prairie', 'amcamp-ridge', 'amcamp-today', 'english-camp-flag', 'garrison-watercolour', 'claims-map', 'redoubt-view', 'vancouver-1798', 'eagle', 'eagle2', 'camas', 'griffin', 'hornby', 'pickett', 'seal', 'robert', 'douglas', 'madrone', 'baynes', 'casey', 'harney'];
  const images = {}; for (const f of files) images['pw_' + f] = 'assets/img/' + f + '.jpg';
  // draw the image cover-cropped into a w×h box centred at 0,0
  const cover = (ctx, img, w, h, fx = .5, fy = .5) => { let sw = img.width, shh = img.height, sx = 0, sy = 0; if (sw / shh > w / h) { sw = shh * w / h; sx = (img.width - sw) * fx; } else { shh = sw * h / w; sy = (img.height - shh) * fy; } ctx.drawImage(img, sx, sy, sw, shh, -w / 2, -h / 2, w, h); };
  const tape = (ctx, x, y, r, w = 70) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.fillStyle = 'rgba(240,232,200,.78)'; ctx.fillRect(-w / 2, -12, w, 24); ctx.strokeStyle = 'rgba(160,150,120,.5)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i = -w / 2; i <= w / 2; i += 6) { ctx.moveTo(i, -12); ctx.lineTo(i + 3, -15); } ctx.stroke(); ctx.restore(); };
  const marker = (ctx, text, x, y, size, col = '#2a2420') => { ctx.save(); ctx.font = `400 ${size}px "Permanent Marker"`; ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y); ctx.restore(); };
  const fred = (ctx, text, x, y, size, col = INK, w = 700) => { ctx.save(); ctx.font = `${w} ${size}px Fredoka`; ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y); ctx.restore(); };
  const shadow = (ctx, x, y, w, h, a = .38) => { ctx.fillStyle = `rgba(0,0,0,${a})`; ctx.fillRect(x + 9, y + 12, w, h); };
  const STY = {
    cabinet(ctx, img, w, e) { const ar = img.width / img.height, ph = w / ar, W = w + 36, H = ph + 96; shadow(ctx, -W / 2, -H / 2, W, H); sh(ctx, c => c.roundRect(-W / 2, -H / 2, W, H, 8), '#efe3c4', { lw: 3 }); ctx.strokeStyle = '#b8903a'; ctx.lineWidth = 2; ctx.strokeRect(-w / 2 - 8, -H / 2 + 10, w + 16, ph + 16);
      ctx.save(); ctx.translate(0, -H / 2 + 18 + ph / 2); ctx.filter = 'sepia(.55) contrast(1.06) brightness(1.02)'; cover(ctx, img, w, ph, .5, e.fy ?? .3); ctx.filter = 'none'; const g = ctx.createRadialGradient(0, 0, Math.min(w, ph) * .3, 0, 0, Math.max(w, ph) * .75); g.addColorStop(0, 'rgba(60,40,10,0)'); g.addColorStop(1, 'rgba(60,40,10,.35)'); ctx.fillStyle = g; ctx.fillRect(-w / 2, -ph / 2, w, ph); ctx.restore();
      fred(ctx, e.studio || 'PORTRAIT · PERIOD PHOTOGRAPH', 0, H / 2 - 54, 11, '#8a6a2a', 600); ctx.fillStyle = '#b8903a'; ctx.fillRect(-w / 3, H / 2 - 44, w * 2 / 3, 1.5); marker(ctx, e.cap, 0, H / 2 - 22, Math.min(26, w / e.cap.length * 1.9)); },
    polaroid(ctx, img, w, e) { const ph = e.h || w * .78, W = w + 28, H = ph + 92; shadow(ctx, -W / 2, -H / 2, W, H, .32); sh(ctx, c => c.rect(-W / 2, -H / 2, W, H), '#fbfaf6', { lw: 2.5 }); ctx.save(); ctx.translate(0, -H / 2 + 14 + ph / 2); cover(ctx, img, w, ph, e.fx ?? .5, e.fy ?? .5); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5; ctx.strokeRect(-w / 2, -ph / 2, w, ph); ctx.restore();
      marker(ctx, e.cap, 0, H / 2 - 38, Math.min(28, w / e.cap.length * 2)); tape(ctx, -W / 2 + 18, -H / 2 + 4, -.6); tape(ctx, W / 2 - 18, -H / 2 + 4, .6); },
    torn(ctx, img, w, e) { const ar = img.width / img.height, ph = e.h || w / ar, R = rng(e.seed || 7), pts = []; const W = w + 20, H = ph + 20; for (let x = -W / 2; x <= W / 2; x += 14) pts.push([x, -H / 2 + R() * 7]); for (let y = -H / 2; y <= H / 2; y += 14) pts.push([W / 2 - R() * 7, y]); for (let x = W / 2; x >= -W / 2; x -= 14) pts.push([x, H / 2 - R() * 7]); for (let y = H / 2; y >= -H / 2; y -= 14) pts.push([-W / 2 + R() * 7, y]);
      const path = c => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); }; ctx.save(); ctx.translate(9, 12); ctx.fillStyle = 'rgba(0,0,0,.35)'; path(ctx); ctx.fill(); ctx.restore(); ctx.fillStyle = '#f4ecd8'; path(ctx); ctx.fill(); ctx.save(); path(ctx); ctx.clip(); cover(ctx, img, w, ph, e.fx ?? .5, e.fy ?? .5); ctx.restore(); ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = 3; path(ctx); ctx.stroke();
      ctx.fillStyle = '#c8302a'; ctx.beginPath(); ctx.arc(0, -H / 2 + 8, 10, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.arc(-3, -H / 2 + 5, 3, 0, 7); ctx.fill();
      if (e.cap) { ctx.font = '700 19px Fredoka'; const cw = ctx.measureText(e.cap).width + 28; ctx.save(); ctx.translate(0, H / 2 + 6); ctx.rotate(.02); sh(ctx, c => c.rect(-cw / 2, 0, cw, 34), '#fbf6ea', { lw: 2.5 }); fred(ctx, e.cap, 0, 18, 19); ctx.restore(); } },
    postcard(ctx, img, w, e) { const ph = w * .62, W = w + 30, H = ph + 30; shadow(ctx, -W / 2, -H / 2, W, H, .3); sh(ctx, c => c.rect(-W / 2, -H / 2, W, H), '#fbf6ea', { lw: 2.5 }); ctx.save(); cover(ctx, img, w, ph, e.fx ?? .5, e.fy ?? .5); ctx.restore(); ctx.save(); ctx.translate(0, -ph / 2 + 34); ctx.font = '400 30px "Luckiest Guy"'; ctx.textAlign = 'center'; ctx.lineWidth = 7; ctx.strokeStyle = '#ffffff'; ctx.strokeText(e.cap, 0, 0); ctx.fillStyle = '#c8302a'; ctx.fillText(e.cap, 0, 0); ctx.restore();
      ctx.save(); ctx.translate(W / 2 - 50, H / 2 - 52); ctx.rotate(.12); sh(ctx, c => c.rect(-26, -32, 52, 64), '#e8d8b0', { lw: 2 }); ctx.fillStyle = '#5a7aa8'; ctx.fillRect(-20, -26, 40, 40); fred(ctx, e.stamp || '2¢', 0, 24, 11, '#3a2a1a'); ctx.strokeStyle = 'rgba(40,30,60,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-28, -4, 22, 0, 7); ctx.stroke(); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-6, -14 + i * 9); ctx.quadraticCurveTo(14, -18 + i * 9, 34, -14 + i * 9); ctx.stroke(); } ctx.restore(); },
  };
  // one insert: [from, to, image, style, x, y, w, caption, extra]
  const draw = (ctx, ins, t) => { const [t0, t1, key, sty, x, y, w, cap, ex = {}] = ins; const img = IMG('pw_' + key); if (!img) return; const kin = k01(t, t0, .45), kout = k01(t, t1 - .35, .35); if (kin <= 0 || kout >= 1) return;
    const e = Object.assign({ cap }, ex), from = ex.from || (x > 640 ? 1 : -1), s = ease.back(clamp(kin)) * (1 - ease.inOut(kout) * .15), rot = (ex.rot ?? (x > 640 ? .04 : -.04)) + Math.sin(t * 1.3 + x) * .006;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - kout; ctx.translate(x + from * (1 - ease.out(clamp(kin))) * 420, y - (1 - ease.out(clamp(kin))) * 30); ctx.rotate(rot * (1 + (1 - clamp(kin)) * 4)); ctx.scale(s, s); STY[sty](ctx, img, w, e); ctx.restore(); };
  const T = s => at(s, 0);
  const L = [
    // the treaty problem: a real chart and the modern map of the two claims
    [T('is a scatter of islands') - .3, T('and the treaty doesnt say which one') - .4, 'vancouver-1798', 'torn', 1030, 330, 250, "VANCOUVER'S CHART · 1798", { seed: 3, rot: .05 }],
    [T('and the treaty doesnt say which one') - .2, T('trying to win an argument') + 1.5, 'claims-map', 'torn', 1010, 270, 400, 'THE TWO CLAIMS · HARO (US) vs ROSARIO (UK)', { seed: 5 }],
    // the people who lived here: camas
    [T('harvested camas') - .1, T('nobody asks them') - .5, 'camas', 'polaroid', 1120, 390, 200, 'camas in bloom', { rot: .06 }],
    // Belle Vue Farm and Charles Griffin
    [T('set up a sheep farm') - .2, T('the man in charge was charles') + .4, 'bellevue-watercolour', 'torn', 1010, 330, 330, 'BELLE VUE FARM · PERIOD WATERCOLOUR', { seed: 9 }],
    [T('the man in charge was charles') + .5, T('meanwhile the american government') + 1.6, 'griffin', 'cabinet', 1080, 330, 170, 'Charles Griffin', { studio: 'HBC · BELLE VUE FARM' }],
    [T('plus the companys farm staff') - .3, T('everyone is pretty sure') + 2.4, 'bellevue-photo', 'torn', 960, 260, 460, 'BELLE VUE FARM · OLD PHOTOGRAPH', { seed: 11, rot: -.03 }],
    // the men
    [T('this is brigadier general william selby harney') - .1, T('hes a veteran officer') + 2.5, 'harney', 'cabinet', 1090, 330, 180, 'Gen. William S. Harney'],
    [T('his name is george edward pickett') - .1, T('is a west point graduate') + 1, 'pickett', 'cabinet', 1090, 330, 170, 'George E. Pickett, aged 21', { fy: .25 }],
    [T('this is james douglas the governor') - .1, T('he has spent decades') + 1, 'douglas', 'cabinet', 190, 340, 150, 'Gov. James Douglas', { fy: .15 }],
    [T('captain geoffrey phipps hornby') - .1, T('can so now stand') - .4, 'hornby', 'cabinet', 1090, 320, 160, 'Capt. Geoffrey Phipps Hornby', { fy: .2 }],
    [T('youre on a grassy ridge') - .2, T('a frigate has its guns') + .4, 'redoubt-view', 'polaroid', 1100, 330, 240, "Pickett's ridge, today", { rot: .05 }],
    [T('the americans bring in reinforcements') - .4, T('heavier guns under') + .2, 'building-redoubt', 'torn', 960, 300, 440, 'BUILDING THE AMERICAN REDOUBT · MODERN PAINTING', { seed: 13 }],
    [T('heavier guns under') + .3, T('by late august') + 2.6, 'casey', 'cabinet', 1090, 330, 170, 'Lt. Col. Silas Casey', { fy: .2 }],
    [T('marines two thousand on one side') - 1.4, T('a very small bay') + .5, 'marines-uniform', 'torn', 1080, 330, 210, 'ROYAL MARINES · 1850s UNIFORMS', { seed: 15 }],
    // bored, far from home: a postcard home
    [T('theyre far from home') - .2, T('honestly the most tense thing') - .3, 'eagle', 'postcard', 980, 330, 360, 'GREETINGS FROM SAN JUAN!', { stamp: '3¢' }],
    [T('rear admiral robert lambert baynes') - .1, T('he arrives in early august') + 2.5, 'baynes', 'cabinet', 1170, 330, 150, 'R. Adm. R. Lambert Baynes', { fy: .2 }],
    [T('commander of the royal navys pacific station') + .2, T('governor douglas wants force') - .2, 'ship-of-line', 'torn', 200, 270, 180, 'A SHIP OF THE LINE, LIKE HMS GANGES', { seed: 17 }],
    // the joint occupation
    [T('marine at english camp on garrison bay') - .2, T('if youre american') - .3, 'marines-english-camp', 'torn', 960, 300, 440, 'ROYAL MARINES AT ENGLISH CAMP · 1860s', { seed: 19 }],
    [T('youre at american camp') - .2, T('for twelve years this is the arrangement') + 2, 'amcamp-painting', 'torn', 960, 300, 440, 'AMERICAN CAMP · PERIOD PAINTING', { seed: 21 }],
    // the Kaiser
    [T('kaiser wilhelm i now') - .2, T('never seen the pacific northwest') + .5, 'kaiser', 'cabinet', 1080, 330, 170, 'Kaiser Wilhelm I', { fy: .15, studio: 'BERLIN · PERIOD PORTRAIT' }],
    // the end of the occupation: the real photograph
    [T('the royal marines lower') - .3, T('thats the end of the pig war') + 1.6, 'evacuate-1872', 'torn', 940, 300, 470, 'BRITISH TROOPS LEAVE SAN JUAN ISLAND · 1872', { seed: 23 }],
    // careers
    // today
    [T('its a national historical park') - .1, T('park rangers still raise') - .3, 'english-camp-aerial', 'polaroid', 1010, 360, 330, 'English Camp today', { rot: .05 }],
    [T('park rangers still raise the british flag') + .2, T('so picture it one more time') - .3, 'english-camp-flag', 'polaroid', 260, 380, 280, 'the Union Jack, still up', { rot: -.05 }],
  ];
  // wildlife field notes in the "today" montage
  L.push([T('if you go to san juan island today') + .4, T('park rangers still raise') - .3, 'seal', 'polaroid', 230, 420, 220, 'harbor seal', { rot: -.06 }]);
  const ov0 = F2.overlays; F2.overlays = (ctx, t) => { ov0(ctx, t); for (const ins of L) if (t > ins[0] - .1 && t < ins[1] + .1) draw(ctx, ins, t); };
  F2.chapter({ cut: [], images, sfx: L.map(i => ({ t: i[0], type: 'paper', gain: .3 })) });
  G.PC = { draw, cover, tape, STY, L };
})(window);
