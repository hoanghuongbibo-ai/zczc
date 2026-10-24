/* Canada — Beat 3, beavers, hats and a company (277–352 s): why sail to freeze? hats. Felt from beaver fur; New France and the fur trade;
 * the Hudson's Bay Company charter of 2 May 1670; Rupert's Land; a king hands a company a third of a continent; 355 years and a price tag. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const a = ph => F.at(ph, 277);
  const A = { start: 277.1, why: a('now why would'), hats: a('one word hats'), europe: a('in europe the hottest'), felt: a('the best felt'), early: a('so the early history'), france: a('france builds'), small: a("it's small catholic"), trade: a('it lives on the fur'),
    england: a('then england joins'), may2: a('on may 2 1670'), charles: a('king charles'), gov: a('the governor and company'), sole: a('they get the sole'), rupert: a("they name it rupert's"), prince: a('prince rupert'), pause: a('pause on that'), king: a('a king in london'),
    hands: a('hands a private'), people: a('land full of people'), lasted: a('that company lasted'), dept: a('it became a department'), hold: a('hold onto it'), tag: a('with a price tag') };
  const HBAY = [[-115, 54.5], [-113, 59], [-108, 62], [-100, 63.5], [-92, 66], [-86, 68], [-80, 64], [-78, 60], [-72, 59], [-66, 58], [-66, 54], [-72, 50], [-79, 47.5], [-85, 48.2], [-90, 47.8], [-94, 49], [-97, 46], [-100, 45.8], [-104, 47.5], [-110, 49], [-114, 50.5]];
  // 1. why sail across an ocean to freeze? a shivering sailor on an icy deck — then a giant felt hat drops: HATS.
  function sFreeze(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.06 }); C.bg(ctx, 'snow'); S.sea(ctx, 520, t, '#5a7a90'); C.ship(ctx, 640, 610, 1.4, t, { sail: '#e8eef2' }); S.snow(ctx, t, 120, 9);
      const shiver = Math.sin(C.step(t) * 40) * 3; C.fig(ctx, 760 + shiver, 540, .8, t, { coat: '#3a3a5a', hat: 'cap', hatCol: '#5a2a2a', mood: 'shock', pose: 'shrug', seed: 340 }); C.bubble(ctx, 'b-b-brrr…', 900, 180, 30, 790, 300);
      const hk = k01(t, A.hats - .1, .5); if (hk > 0) { ctx.save(); ctx.translate(0, (1 - ease.out(hk)) * -700); C.feltHat(ctx, 640, 520, 2.6); ctx.restore(); C.ransom(ctx, 'HATS.', 640, 640, 100, clamp(hk * 1.5), { seed: 4 }); }
      ctx.restore(); C.finish(ctx, t); }
  // 2. in Europe, felt hats were the fashion; the best felt was beaver; the beaver is horrified
  function sFashion(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.06 }, { z: 1.0 }); S.board(ctx, 'news', 31);
      C.photo(ctx, 'benjamin-west', 330, 330, 300, 366, { rot: -.05, tape: true, seed: 31, caption: 'the look: a big felt hat (18th-c. portrait)', capSize: 13 });
      for (let i = 0; i < 4; i++) { const k = clamp((t - A.europe) * 2 - i * .4); if (k > 0) { ctx.save(); ctx.translate(640 + i * 150, 230 + (i % 2) * 40); ctx.rotate((i - 1.5) * .1); ctx.scale(ease.back(k), ease.back(k)); C.feltHat(ctx, 0, 0, .7 + (i % 2) * .15, ['#3a2a22', '#5a3a2a', '#2a2a30', '#4a3a2a'][i]); ctx.restore(); } }
      C.label(ctx, 'EUROPE · the hottest fashion: FELT HATS', 860, 90, 24);
      if (t > A.felt) { C.beaver(ctx, 900, 690, 1.2, t, { mood: 'shock' }); C.label(ctx, 'best felt = beaver fur', 900, 440, 26, { bg: '#f4c44a', rot: -.03 }); C.scrawl(ctx, '!!', 1040, 500, 70, '#c23a2c', .1); }
      ctx.restore(); C.finish(ctx, t); }
  // 3. a story about beavers and the people who traded them: trader and trapper, pelts for goods, a canoe at the shore
  function sTrade(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0, x: -20 }, { z: 1.06, x: 20 }); C.bg(ctx, 'sky'); C.hills(ctx, 420, ['#7f9a5a', '#5f7a3e'], 15, 60); for (let i = 0; i < 10; i++) C.pine(ctx, 20 + i * 140, 460, .9);
      S.sea(ctx, 600, t, '#4f8db0'); C.canoe(ctx, 300, 650, 1, t); C.pc(ctx, '#c8b088', c => c.rect(600, 560, 800, 40));
      for (let i = 0; i < 5; i++) C.pc(ctx, ['#7a4a2a', '#8a5a34', '#6a3a20'][i % 3], c => c.ellipse(700 + (i % 3) * 40, 560 - Math.floor(i / 3) * 24, 40, 14, (i - 2) * .2, 0, 7));
      C.fig(ctx, 620, 600, .95, t, { coat: '#7a4a2a', hat: 'feather', skin: '#b88060', hair: '#1a1410', long_hair: 1, pose: 'hold', seed: 350, prop: (c, x, y) => C.pc(c, '#7a4a2a', cc => cc.ellipse(x, y, 30, 12, .5, 0, 7)) });
      C.fig(ctx, 940, 600, .95, t, { coat: '#2a3a6a', hat: 'tricorne', beard: '#5a3a24', pose: 'hold', flip: true, seed: 351, prop: (c, x, y) => { C.pc(c, '#a8a8b0', cc => cc.rect(x - 20, y - 10, 40, 24)); } });
      C.label(ctx, 'the fur trade', 780, 90, 30); ctx.restore(); C.finish(ctx, t); }
  // 4. New France along the St. Lawrence: small, Catholic, French-speaking — with Indigenous partners
  function sNewFrance(ctx, lt, dur, t) { const v = S.view({ lon: -70, lat: 47.5, s: 2600, y: 380 }, { lon: -71, lat: 47, s: 3000, y: 380 }, ease.inOut(clamp(lt / dur))); const pr = C.map(ctx, v, { fill: () => null, riverW: 7 });
    ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = '#2c5a8a'; ctx.beginPath(); [[-74.5, 45.3], [-71.5, 46.7], [-69.5, 47.6], [-67, 49.2], [-66.2, 48.9], [-69.8, 47.1], [-72, 46.1], [-74, 45.0]].forEach((p, i) => { const [x, y] = pr(...p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); ctx.restore();
    for (const [lo, la, nm] of [[-71.2, 46.8, 'Québec'], [-72.55, 46.35, 'Trois-Rivières'], [-73.6, 45.5, 'Montréal']]) C.pin(ctx, pr, lo, la, nm, k01(t, A.france + .3, .4), { dy: 42 });
    ctx.save(); ctx.translate(1080, 200); C.shadow(ctx, true, 8, .4); C.flagFR(ctx, -90, -60, 180, 120, true); C.shadow(ctx, false); ctx.restore(); C.headline(ctx, 'NEW FRANCE', 1080, 330, 46, { rot: .03 });
    const tags = ['small', 'Catholic', 'French-speaking']; tags.forEach((w, i) => { const k = clamp((t - A.small) * 2.5 - i * .9); if (k > 0) C.label(ctx, w, 1080, 400 + i * 52, 26, { rot: (i - 1) * .03, bg: ['#fbf8f0', '#f4c44a', '#c8d8f0'][i] }); });
    if (t > A.trade) C.label(ctx, '+ Indigenous partners who knew the land, the rivers and the animals', 640, 660, 20); C.finish(ctx, t); }
  // 5. England joins: 2 May 1670, Charles II's charter — the painting, a wax seal, and the company's very long name typed out
  function sCharter(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.05, x: 20 }); C.bg(ctx, 'cream');
      C.photo(ctx, 'signing-of-hbc-charter-2', 470, 230, 760, 300, { rot: -.02, tape: true, seed: 41, caption: 'the charter is granted, 1670 (later painting)', capSize: 14 });
      if (t > A.england) { ctx.save(); ctx.translate(1080, 230); ctx.rotate(.08); C.shadow(ctx, true, 8, .4); C.flagUK(ctx, -110, -60, 220, 120); C.shadow(ctx, false); ctx.restore(); }
      S.date(ctx, '2 MAY 1670', k01(t, A.may2, .4));
      if (t > A.gov) { const L = '"The Governor and Company of Adventurers of England trading into Hudson\'s Bay"'; const n = Math.floor(clamp((t - A.gov) / 3.5) * L.length); ctx.save(); ctx.translate(640, 540); C.shadow(ctx, true, 8, .35); ctx.fillStyle = '#f4ecd8'; ctx.fillRect(-560, -70, 1120, 150); C.shadow(ctx, false); ctx.fillStyle = INK; ctx.font = '400 28px "Special Elite"'; ctx.textAlign = 'center'; const s = L.slice(0, n); ctx.fillText(s.slice(0, 52), 0, -10); ctx.fillText(s.slice(52), 0, 36); ctx.restore(); }
      // wax seal
      if (t > A.charles) { const k = k01(t, A.charles, .4); ctx.save(); ctx.translate(1100, 620); ctx.scale(ease.back(k), ease.back(k)); C.pc(ctx, '#a8222a', c => { for (let i = 0; i < 20; i++) { const an = i / 20 * 6.28, r = 56 + (i % 2) * 6; c.lineTo(Math.cos(an) * r, Math.sin(an) * r); } c.closePath(); }); ctx.fillStyle = '#7a1418'; ctx.beginPath(); ctx.arc(0, 0, 40, 0, 7); ctx.fill(); ctx.fillStyle = '#d8a8a0'; ctx.font = '900 30px "Liberation Serif"'; ctx.textAlign = 'center'; ctx.fillText('C R', 0, 10); ctx.restore(); C.label(ctx, 'King Charles II', 1100, 700, 18); }
      ctx.restore(); C.finish(ctx, t); }
  // 6. every river draining into Hudson Bay: the drainage basin floods in; RUPERT'S LAND
  function sRupert(ctx, lt, dur, t) { const v = S.view({ lon: -90, lat: 57, s: 1050, y: 380 }, { lon: -92, lat: 56, s: 950, y: 390 }, ease.inOut(clamp(lt / dur))); const pr = C.map(ctx, v, { fill: () => null, borders: false });
    const k = k01(t, A.sole + 1, 2.5); if (k > 0) { ctx.save(); const [cx, cy] = pr(-86, 58); ctx.beginPath(); HBAY.forEach((p, i) => { const [x, y] = pr(...p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.save(); ctx.clip(); ctx.globalAlpha = .6; ctx.fillStyle = '#c23a2c'; ctx.beginPath(); ctx.arc(cx, cy, 800 * ease.out(k), 0, 7); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#7a1a14'; ctx.lineWidth = 4; ctx.setLineDash([10, 6]); ctx.stroke(); ctx.restore(); }
    // river arrows draining in
    for (const [p, q] of [[[-112, 54], [-96, 57]], [[-100, 50], [-94, 56]], [[-82, 49], [-82, 54]], [[-72, 52], [-79, 55]]]) C.mapArrow(ctx, pr, p, q, k01(t, A.sole + .5, 1.2), '#2c5a8a', 8, .1);
    if (t > A.rupert) { const [x, y] = pr(-96, 58.5); C.headline(ctx, "RUPERT'S LAND", x, y, 54, { bg: '#fbf8f0', col: '#7a1a14', rot: -.04 }); }
    if (t > A.prince) C.label(ctx, '…named after the king\'s cousin, Prince Rupert', 640, 660, 22); C.label(ctx, 'every piece of land whose rivers drain into Hudson Bay', 640, 60, 22); C.finish(ctx, t); }
  // 7. pause: a king in London hands a tiny merchant a slice of continent bigger than any European country; people there look up — who?
  function sKing(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.04 }, { z: 1.0 }); C.bg(ctx, 'cream'); const hk = k01(t, A.hands, 1.2);
      C.pc(ctx, '#c49a6c', c => c.rect(-60, 600, 700, 200)); C.fig(ctx, 220, 690, 1.25, t, { coat: '#7a1a2a', hat: 'top', hatCol: '#d8b048', long_hair: 1, hair: '#2a1a14', mustache: '#2a1a14', pose: 'point', seed: 360 }); C.label(ctx, 'a king in London', 220, 250, 22);
      C.fig(ctx, 520, 690, .65, t, { coat: '#2a2a34', hat: 'top', mood: 'happy', pose: 'up', seed: 361 }); C.label(ctx, 'a private company', 520, 430, 18);
      // the chunk of continent: a torn cut-out of Rupert's Land
      ctx.save(); ctx.translate(lerp(360, 470, hk), lerp(400, 300, hk)); ctx.rotate(-.2 + hk * .2); ctx.scale(.42, .42); const pr = C.proj({ lon: -90, lat: 57, s: 1050, x: 0, y: 0 }); C.shadow(ctx, true, 10, .45); ctx.fillStyle = '#d86a5a'; ctx.beginPath(); HBAY.forEach((p, i) => { const [x, y] = pr(...p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); C.shadow(ctx, false); ctx.restore();
      if (t > A.people) { C.pc(ctx, '#7f9a5a', c => c.rect(680, 560, 700, 300)); for (let i = 0; i < 4; i++) C.fig(ctx, 760 + i * 130, 700, .8, t, { coat: ['#7a4a2a', '#5a6a4a', '#d8c8a8', '#6a4a3a'][i], hat: i === 2 ? 'hood' : i === 0 ? 'feather' : null, hatCol: '#e8e0d0', long_hair: i % 2, skin: '#c08868', pose: 'shrug', mood: 'shock', seed: 370 + i }); C.bubble(ctx, '…who?', 980, 260, 36, 960, 380); }
      ctx.restore(); C.finish(ctx, t); }
  // 8. that company lasted 355 years and became a department store chain; hold onto it — it comes back with a price tag
  function sStore(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.06 }); C.bg(ctx, 'kraft');
      S.timeline(ctx, 140, 1670, 2025, [{ v: 1670, text: 'charter · 1670', up: false }, { v: 2025, text: 'closes · 2025', up: false, k: k01(t, A.lasted + .5, .4) }], { ends: ['', ''] }); S.bigNum(ctx, '355 YEARS', 640, 300, 64, k01(t, A.lasted + .6, .4));
      if (t > A.dept) { const k = k01(t, A.dept, .5); ctx.save(); ctx.translate(500, 560); ctx.scale(ease.back(k), ease.back(k)); C.pc(ctx, '#e8dcc4', c => c.rect(-300, -170, 600, 170)); for (let i = 0; i < 5; i++) C.pc(ctx, '#3a4a5a', c => c.rect(-270 + i * 112, -120, 80, 120), false); C.pc(ctx, '#1e3a2a', c => c.rect(-320, -210, 640, 50)); ctx.fillStyle = '#f4e2b0'; ctx.font = '900 34px Anton'; ctx.textAlign = 'center'; ctx.fillText('DEPARTMENT STORE', 0, -172); ctx.restore(); }
      if (t > A.tag) { const k = k01(t, A.tag, .5), sw = Math.sin(C.step(t) * 3) * .1; ctx.save(); ctx.translate(980, 360); ctx.rotate(sw); C.pc(ctx, '#f4c44a', c => { c.moveTo(-60, 0); c.lineTo(-20, -60); c.lineTo(140, -60); c.lineTo(140, 60); c.lineTo(-20, 60); c.closePath(); }); ctx.fillStyle = '#c49a6c'; ctx.beginPath(); ctx.arc(-24, 0, 10, 0, 7); ctx.fill(); ctx.fillStyle = INK; ctx.font = '900 46px Anton'; ctx.textAlign = 'center'; ctx.fillText('£ ? ? ?', 60, 16); ctx.restore(); C.scrawl(ctx, 'hold onto it…', 1000, 520, 40, '#c23a2c', -.05); }
      ctx.restore(); C.finish(ctx, t); }

  const cut = [[A.start, sFreeze, .3], [A.europe - .2, sFashion, .3], [A.early - .1, sTrade, .3], [A.france - .2, sNewFrance, .4], [A.england - .2, sCharter, .3], [A.sole - .2, sRupert, .4], [A.pause - .1, sKing, .3], [A.lasted - .2, sStore, .3]];
  F.chapter({ cut, sfx: [{ t: A.hats, type: 'thud', gain: .45 }, { t: A.felt, type: 'hit', gain: .3 }, { t: A.charles, type: 'press', gain: .4 }, { t: A.rupert, type: 'swell', gain: .3 }, { t: A.people, type: 'paper', gain: .3 }, { t: A.tag, type: 'click', gain: .35 }],
    moods: [{ t: A.start, mood: 'still' }, { t: A.pause, mood: 'mystery' }, { t: A.lasted, mood: 'still' }] });
})(window);
