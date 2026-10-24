/* Canada — Beat 2, a word for "village" (225–277 s): Cartier up the St. Lawrence in 1535 with two young men from Stadacona; "kanata";
 * Cartier stretches the word; maps label everything "Canada"; a country named "Village". */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const a = (ph, from = 225) => F.at(ph, from);
  const A = { start: 225.1, y1535: a('in 1535'), cartier: a('jacques cartier'), sails: a('sails up the giant'), board: a('on board are two'), stad: a('stadacona'), taken: a('cartier had taken'), tell: a('they tell him'), iroq: a('in their iroquoian'),
    talking: a('they were talking'), though: a('cartier though'), land: a('the land around'), chief: a('its chief donnacona'), decade: a('within about a decade'), second: a('so the second largest'), honestly: a('which honestly') };
  const SAILOR = { coat: '#3a3a5a', hat: 'cap', hatCol: '#5a2a2a', beard: '#5a3a24' };
  const YOUNG = i => ({ coat: ['#8a5a34', '#7a4a2a'][i], hair: '#1a1410', long_hair: 1, skin: '#c08868', seed: 300 + i });
  // 1. 1535: Cartier (his portrait head) on the deck as his ship pushes up the St. Lawrence on the paper map
  function sRiver(ctx, lt, dur, t) { const k = ease.inOut(clamp((t - A.sails) / 6)); const v = S.view({ lon: -62, lat: 48.5, s: 3200, y: 380 }, { lon: -69, lat: 47.5, s: 3600, y: 380 }, k); const pr = C.map(ctx, v, { fill: () => null, riverW: 7 });
    const [sx, sy] = pr(lerp(-61, -70.5, k), lerp(49.3, 47.2, k)); C.ship(ctx, sx, sy, .55, t, { flag: '#f4f0e4', sail: '#f4ecd8' });
    C.pin(ctx, pr, -71.2, 46.8, 'Stadacona (today: Quebec City)', k01(t, A.stad, .5), { dy: -60 }); S.date(ctx, '1535', k01(t, A.y1535, .4));
    C.photo(ctx, 'jacques-cartier', 200, 500, 240, 290, { rot: -.04, tape: true, seed: 17 }); C.label(ctx, 'Jacques Cartier · "zhahk kar-tee-AY"', 210, 680, 18, { rot: -.03 });
    C.finish(ctx, t); }
  const since = (t, x) => t - x;
  // 2. on board: two young men from Stadacona; the painting of Cartier's meeting; they had been taken to France and are guiding him home
  function sBoard(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.06, x: 30 }); C.bg(ctx, 'sky'); S.sea(ctx, 520, t);
      C.ship(ctx, 640, 600, 1.6, t, { flag: '#f4f0e4', sail: '#f4ecd8' }); C.fig(ctx, 500, 540, .75, t, Object.assign({ pose: 'point', flip: true }, YOUNG(0))); C.fig(ctx, 600, 540, .75, t, Object.assign({ pose: 'stand' }, YOUNG(1))); C.fig(ctx, 800, 540, .75, t, { coat: '#3a1a2a', face: 'cartier', headS: .5, pose: 'hold', seed: 8 });
      C.photo(ctx, 'taignoagny', 1040, 190, 340, 236, { rot: .05, tape: true, seed: 21, caption: 'Cartier and the St. Lawrence Iroquoians (later painting)', capSize: 12 });
      if (t > A.taken) { const k = k01(t, A.taken, 2.5); ctx.save(); ctx.translate(250, 170); C.shadow(ctx, true, 8, .35); ctx.fillStyle = '#f4ecd8'; ctx.fillRect(-190, -110, 380, 220); C.shadow(ctx, false); ctx.fillStyle = '#5a97ba'; ctx.fillRect(-180, -100, 360, 200); C.pc(ctx, '#e8d8a8', c => { c.moveTo(-180, -100); c.lineTo(-120, -100); c.quadraticCurveTo(-90, 0, -130, 100); c.lineTo(-180, 100); c.closePath(); c.moveTo(180, -100); c.lineTo(130, -100); c.quadraticCurveTo(110, 0, 140, 100); c.lineTo(180, 100); c.closePath(); }, false); C.marker(ctx, 'arrow', [-120, -20, 130, -40, -60], clamp(k * 2), '#d8241a', 5); if (k > .5) C.marker(ctx, 'arrow', [130, 30, -120, 40, -60], clamp(k * 2 - 1), '#2c5a8a', 5); ctx.font = '400 16px "Special Elite"'; ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('Stadacona', -150, 90); ctx.fillText('France', 150, 90); ctx.restore(); }
      C.label(ctx, 'two young men from Stadacona', 560, 330, 22, { rot: -.02 }); if (t > A.tell) C.bubble(ctx, 'This way to\n"kanata"!', 430, 200, 30, 500, 360);
      ctx.restore(); C.finish(ctx, t); }
  // 3. a dictionary card: kanata = village; they meant their village (a paper village of longhouses)
  function sKanata(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.08 }, { z: 1.0 }); C.bg(ctx, 'cream');
      ctx.save(); ctx.translate(420, 300); ctx.rotate(-.04); C.shadow(ctx, true, 10, .4); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-300, -170, 600, 340); C.shadow(ctx, false); ctx.strokeStyle = '#c86a6a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-300, -110); ctx.lineTo(300, -110); ctx.stroke(); ctx.strokeStyle = '#8ab0d0'; ctx.lineWidth = 1; for (let y = -80; y < 170; y += 34) { ctx.beginPath(); ctx.moveTo(-300, y); ctx.lineTo(300, y); ctx.stroke(); }
      ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.font = '900 64px "Liberation Serif"'; ctx.fillText('kanata', -270, -130); ctx.font = 'italic 30px "Liberation Serif"'; ctx.fillText('(Iroquoian)  noun', -40, -130); ctx.font = '400 40px "Special Elite"'; ctx.fillText('= village', -260, -30); ctx.font = '400 24px "Special Elite"'; ctx.fillText('a settlement; where people live', -260, 30); ctx.restore();
      ctx.save(); ctx.translate(960, 420); C.shadow(ctx, true, 10, .4); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-260, -200, 520, 400); C.shadow(ctx, false); ctx.beginPath(); ctx.rect(-240, -180, 480, 360); ctx.clip(); ctx.drawImage(C.paper('sky'), -240, -180); C.hills(ctx, 20, ['#8aa86a'], 2, 20); for (let i = 0; i < 4; i++) S.longhouse(ctx, -170 + i * 120, 150 - (i % 2) * 20, .45); ctx.restore(); C.tape(ctx, 960, 220, 90, .05);
      if (t > A.talking) { C.scrawl(ctx, 'THEIR village', 960, 660, 44, '#c23a2c', -.04); C.marker(ctx, 'circle', [960, 440, 270, 220], k01(t, A.talking + .4, .6)); }
      ctx.restore(); C.finish(ctx, t); }
  // 4. Cartier stretches the word: "Canada" covers the village → the land around → everything Donnacona ruled
  function sStretch(ctx, lt, dur, t) { const v = { lon: -71, lat: 47.2, s: 5000, x: 640, y: 380 }; const pr = C.map(ctx, v, { fill: () => null, riverW: 8 }); const [qx, qy] = pr(-71.2, 46.8);
    const r = [0, 60, 180, 420][(t > A.though) + (t > A.land) + (t > A.chief)]; const rr = lerp(r * .7, r, clamp(((t - [A.though, A.land, A.chief][Math.max(0, (t > A.land) + (t > A.chief))]) * 2)));
    if (r > 0) { ctx.save(); ctx.globalAlpha = .45; ctx.fillStyle = '#c23a2c'; ctx.beginPath(); ctx.ellipse(qx, qy, rr * 1.3, rr, -.4, 0, 7); ctx.fill(); ctx.restore(); C.headline(ctx, 'CANADA', qx, qy - Math.max(60, rr * .6), 30 + rr * .12, { bg: false, col: '#7a1a14' }); }
    C.pin(ctx, pr, -71.2, 46.8, null, 1); if (t > A.chief) { C.photo(ctx, 'domagaya', 1060, 170, 330, 210, { rot: .05, tape: true, seed: 22, caption: 'Cartier meets the people of Stadacona (postcard)', capSize: 12 }); C.fig(ctx, 1160, 700, .9, t, { coat: '#7a4a2a', hat: 'feather', skin: '#b88060', hair: '#1a1410', long_hair: 1, pose: 'shrug', mood: 'shock', seed: 330 }); C.label(ctx, 'Chief Donnacona', 1160, 330 + 400, 18); }
    C.label(ctx, ['the village', 'the village', '…the land around it', '…everything its chief ruled'][(t > A.though) + (t > A.land) + (t > A.chief)], 360, 660, 26); C.finish(ctx, t); }
  // 5. within a decade, European maps label everything north of the river "Canada": an old map, ink spreading
  function sOldMap(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -68, lat: 50, s: 1500, x: 640, y: 380 }, { sea: 'sand', land: 'cream', borders: false, fill: () => null }); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(200,160,100,.35)'; ctx.fillRect(0, 0, 1280, 720); ctx.restore();
    const k = k01(t, A.decade, 3); ctx.save(); const [cx, cy] = pr(-72, 52); ctx.globalAlpha = .55; ctx.fillStyle = '#7a3a1a'; const R = rng(5); for (let i = 0; i < 40; i++) { const an = R() * 6.28, d = R() * 340 * k; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * d * 1.4, cy + Math.sin(an) * d * .7, 30 * k + R() * 20 * k, 0, 7); ctx.fill(); } ctx.restore();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.06); ctx.font = `italic 700 ${40 + 60 * k}px "Liberation Serif"`; ctx.fillStyle = '#3a1a0a'; ctx.textAlign = 'center'; ctx.globalAlpha = clamp(k * 2); ctx.fillText('CANADA', 0, 0); ctx.restore();
    // compass rose and a sea monster scrap
    ctx.save(); ctx.translate(1100, 560); ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, i % 2 ? -40 : -80); ctx.stroke(); } ctx.restore(); C.label(ctx, '1540s-style map', 200, 660, 22); C.finish(ctx, t, { vig: .5 }); }
  // 6. a country named "Village": a road sign and the beaver
  function sVillage(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.1, y: 20 }); C.bg(ctx, 'sky'); C.hills(ctx, 440, ['#8aa86a', '#6f8f4a'], 12, 50); for (let i = 0; i < 9; i++) C.pine(ctx, 40 + i * 150, 470, .8);
      C.pc(ctx, '#7a5432', c => { c.rect(500, 400, 16, 300); c.rect(780, 400, 16, 300); }); ctx.save(); ctx.translate(648, 360); ctx.rotate(.02); C.shadow(ctx, true, 8, .4); ctx.fillStyle = '#2a6a3a'; ctx.beginPath(); ctx.roundRect(-240, -110, 480, 220, 16); ctx.fill(); C.shadow(ctx, false); ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-226, -96, 452, 192, 10); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = '400 26px "Special Elite"'; ctx.fillText('WELCOME TO', 0, -50); ctx.font = '900 76px Anton'; ctx.fillText('"VILLAGE"', 0, 30); ctx.font = '400 20px "Special Elite"'; ctx.fillText('2nd-largest country on Earth', 0, 76); ctx.restore();
      S.beaverSays(ctx, t, A.honestly, 'very on-brand.', { x: 1080, s: .9 }); ctx.restore(); C.finish(ctx, t); }

  const cut = [[A.start, sRiver, .4], [A.board - .2, sBoard, .3], [A.iroq - .2, sKanata, .3], [A.though - .2, sStretch, .3], [A.decade - .2, sOldMap, .4], [A.second - .2, sVillage, .3]];
  F.chapter({ cut, sfx: [{ t: A.y1535, type: 'splash', gain: .3 }, { t: A.tell, type: 'paper', gain: .3 }, { t: A.talking + .4, type: 'scratch', gain: .3 }, { t: A.decade, type: 'swell', gain: .3 }, { t: A.honestly, type: 'hit', gain: .25 }],
    moods: [{ t: A.start, mood: 'still' }] });
})(window);
