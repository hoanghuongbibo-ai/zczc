/* Canada — Beat 11, Vimy (1002.6–1086.5 s): 1914, at war automatically; April 1917, Vimy Ridge, all four divisions together; the French losses;
 * Easter Monday 9 April, 5:30 a.m., sleet and snow; the ridge taken by 12 April, 3,598 killed, ~7,000 wounded; 61,000 dead from 8 million;
 * "the birth of a nation" — partly memory; less a colony, more a country (Washington legation, Britain stops legislating); back to 1921 and Buster Brown. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const a = (ph, from = 1000) => F.at(ph, from);
  const A = { start: a('in 1914 when'), auto: a('automatically at war'), choose: a('get to choose'), april: a('but in april 1917'), vimy: a('called vimy'), changed: a('something changed'), four: a('all four canadian'), every: a('every part of the country'), french: a('the french had'), n100: a('100,000'),
    easter: a('on easter monday'), apr9: a('april 9'), sleet: a('sleet and snow'), over: a('went over'), apr12: a('by april 12'), theirs: a('the ridge was theirs'), killed: a('3,598'), wounded: a('7,000 wounded'), whole: a('across the whole war'), n61: a('61,000'), m8: a('8 million'),
    hear: a("you'll often hear"), birth: a('birth of a nation'), partly: a('partly how'), debate: a('historians debate'), memory: a('grew in memory'), clear: a("what's clear is that canada"), colony: a('less like a colony'), embassy: a('own embassy'), decade: a('over the next decade'), laws: a('stopped making laws'),
    moment: a("and that's the moment"), y1921: a('1921 buster'), scouting: a('scouting the northern') };
  // the Western Front: a grey sky, churned mud with shell craters, the ridge rising on the right, a trench across the foreground, wire
  const front = (ctx, t, o = {}) => { Cn.sky(ctx, o.pal || 'storm', t, { horizon: 430, seed: 401 }); const R = rng(41);
    P.cel(ctx, cc => { cc.moveTo(-300, 900); cc.lineTo(-300, 470); cc.quadraticCurveTo(500, 440, 760, 400); cc.quadraticCurveTo(1000, 300, 1600, 290); cc.lineTo(1600, 900); cc.closePath(); }, '#6a5a44', { shade: '#4a3e30', light: '#8a7a5e', dx: 0, dy: 20, lw: 4 });
    for (let i = 0; i < 14; i++) { const x = R() * 1500 - 100, y = 470 + R() * 200; P.ink(ctx, '#4a3e30', cc => cc.ellipse(x, y, 30 + R() * 30, 8 + R() * 6, 0, 0, 7), 2); }
    for (let i = 0; i < 6; i++) { const x = 900 + R() * 600, y = 330 + R() * 80; P.ink(ctx, '#3a3028', cc => { cc.rect(x, y - 70, 6, 70); cc.rect(x - 14, y - 50, 26, 5); }, 0); }
    if (o.snow) { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#e8eef4'; ctx.fillRect(-300, 300, 1900, 700); ctx.restore(); }
    for (let x = -200; x < 1500; x += 120) { P.ink(ctx, '#3a3028', cc => cc.rect(x, 560, 6, 60), 0); } ctx.strokeStyle = '#3a3028'; ctx.lineWidth = 1.5; for (let x = -200; x < 1500; x += 6) { ctx.beginPath(); ctx.arc(x, 580 + Math.sin(x * .3) * 4, 6, 0, 7); ctx.stroke(); }
    P.cel(ctx, cc => cc.rect(-300, 640, 1900, 120), '#3a2e22', { dx: 0, dy: 0, lw: 4 }); P.cel(ctx, cc => cc.rect(-300, 630, 1900, 14), '#7a6a4e', { dx: 0, dy: 0, lw: 3 }); for (let x = -300; x < 1600; x += 50) P.ink(ctx, '#c8b088', cc => cc.rect(x, 610, 44, 22), 2); };
  // 1. 1914: Britain goes to war — and Canada with it, no choice
  function sAuto(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -40, lat: 50, s: 700, x: 640, y: 400 }, { fill: n => (n === 'United Kingdom' && t > A.start + .8) || (n === 'Canada' && t > A.auto) ? '#c23a2c' : null, alpha: .75 });
    if (t > A.start + .8) { const [x, y] = pr(-2, 54); C.headline(ctx, 'AT WAR', x + 30, y - 70, 34, { rot: .05 }); C.flagUK(ctx, x - 20, y + 30, 70, 40); } if (t > A.auto) { const [x, y] = pr(-100, 58); C.headline(ctx, 'AT WAR TOO', x, y, 40, { rot: -.05 }); C.mapArrow(ctx, pr, [-6, 52], [-70, 55], k01(t, A.auto, .8)); }
    if (t > A.choose) C.stamp(ctx, 'NOBODY ASKED CANADA', 640, 620, 44, -.05, k01(t, A.choose, .3)); S.date(ctx, '1914', 1); C.finish(ctx, t); }
  // 2. Vimy Ridge, April 1917: all four divisions in the line together
  function sVimy(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06, x: -30 }, { z: 1.0, x: 30 }); Cn.layer(ctx, c, 1, () => { front(ctx, t);
      // shells bursting on the ridge from 'something changed'; an officer walks the line and the men turn to watch him pass
      if (t > A.changed) for (let k = 0; k < 6; k++) { const per = 2.3 + k * .37, u = ((t - A.changed + k * .9) % per) / per, x = 760 + ((k * 197) % 520), y = 330 + ((k * 61) % 70) - (x - 760) * .05; if (u < .35) { const r = 20 + u * 160, a = 1 - u / .35;
        ctx.fillStyle = `rgba(255,${190 - u * 200 | 0},90,${a * .9})`; ctx.beginPath(); ctx.arc(x, y, r * .45, 0, 7); ctx.fill(); ctx.fillStyle = `rgba(70,62,56,${a * .8})`; for (let q = 0; q < 5; q++) { ctx.beginPath(); ctx.arc(x + Math.cos(q * 1.3) * r * .5, y - u * 60 - Math.sin(q * 2.1) * r * .3, r * .38, 0, 7); ctx.fill(); }
        ctx.strokeStyle = `rgba(60,40,30,${a})`; ctx.lineWidth = 3; for (let q = 0; q < 6; q++) { const an = -Math.PI * (.15 + q * .14); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * .3, y + Math.sin(an) * r * .3); ctx.lineTo(x + Math.cos(an) * r * .8, y + Math.sin(an) * r * .8 - u * 30); ctx.stroke(); } } }
      const ox = 1380 - (t - A.april) * 62, walking = ox > 120 && ox < 1380;
      for (let d = 0; d < 4; d++) { for (let j = 0; j < 3; j++) { const sx = 90 + d * 300 + j * 60, near = walking && Math.abs(sx - ox) < 220; C.fig(ctx, sx, 700, .55, t + d + j, Object.assign(PP.soldier1917(d * 3 + j), { flip: true, turn: walking ? (ox > sx ? -.45 : .45) : undefined, pose: near && j === 1 ? 'chin' : near && j === 2 ? 'point' : (t > A.changed && (d + j) % 3 === 0 ? 'hold' : 'stand'), mood: t > A.french ? 'sad' : 'calm' })); } if (t > A.four + d * .4) C.label(ctx, ['1st', '2nd', '3rd', '4th'][d] + ' DIVISION', 150 + d * 300, 420, 18, { rot: (d % 2 ? .03 : -.03) }); }
      if (walking) C.fig(ctx, ox, 712, .58, t * 1.1, { coat: '#6a6a44', pants: '#5a5a3a', hat: 'kepi', hatCol: '#5a5a3a', hatTrim: '#c23a2c', mustache: '#5a4a3a', belt: '#5a3a24', pose: 'walk', flip: true, seed: 470 });
      if (t > A.french) { ctx.save(); ctx.globalAlpha = k01(t, A.french, .4); C.headline(ctx, 'FRENCH LOSSES HERE: 100,000+ killed & wounded', 900, 200, 26, { rot: .03, bg: '#fbf8f0' }); ctx.restore(); } });
    S.date(ctx, 'APRIL 1917 · VIMY RIDGE, FRANCE', 1); if (t > A.every && t < A.french) S.fact(ctx, 'men from every part of the country, side by side', k01(t, A.every, .4)); C.finish(ctx, t); }
  // 3. Easter Monday, 5:30 a.m., sleet and snow — they go over the top
  function sOver(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.08, y: -20 }); Cn.layer(ctx, c, 1, () => { front(ctx, t, { pal: 'night', snow: true }); const k = k01(t, A.over - .6, 3);
      for (let i = 0; i < 7; i++) { const y = lerp(720, 600, ease.out(clamp(k * 1.5 - i * .08))); C.fig(ctx, 80 + i * 180 + k * 60, y, .55, t * 1.3 + i, Object.assign(PP.soldier1917(i), { pose: k > 0 ? 'walk' : 'stand', flip: false, lean: k > 0 ? .12 : 0 })); } });
    S.snow(ctx, t, 120, 9); ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = '#0a0e1a'; ctx.fillRect(0, 0, 1280, 720); ctx.restore();
    S.date(ctx, 'EASTER MONDAY · 9 APRIL 1917 · 5:30 A.M.', k01(t, A.easter, .4)); if (t > A.sleet) S.fact(ctx, 'in sleet and snow, the Canadians went over', k01(t, A.sleet, .4)); C.finish(ctx, t, { vig: .7 }); }
  // 4. 12 April: the ridge is theirs — a flag on the crest; the cost
  function sTaken(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { front(ctx, t, { pal: 'dawn' }); const k = ease.out(k01(t, A.theirs, 1.2));
      P.ink(ctx, '#5a3a24', cc => cc.rect(1100, 300 - 160 * k, 8, 160 * k + 4), 0); if (k > .3) C.flagRedEnsign(ctx, 1108, 300 - 160 * k, 120, 70);
      for (let i = 0; i < 4; i++) C.fig(ctx, 980 + i * 80, 330 + i * 4, .4, t + i, Object.assign(PP.soldier1917(i), { pose: i === 1 ? 'up' : 'stand', mood: 'calm' })); });
    S.date(ctx, '12 APRIL 1917', 1); if (t > A.killed - .3) { C.headline(ctx, '3,598 KILLED', 380, 220, 50, { rot: -.04, bg: '#1e1a18', col: '#fbf8f0' }); } if (t > A.wounded) C.headline(ctx, '~7,000 WOUNDED', 380, 300, 40, { rot: .03, bg: '#fbf8f0', col: '#7a1a14' }); C.finish(ctx, t); }
  // 5. the whole war: a field of crosses and poppies; 61,000 out of just over 8 million
  function sCrosses(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'sunset', t, { horizon: 380, sun: [1000, 300], sunR: 40, seed: 411 })); Cn.layer(ctx, c, 1, () => {
      P.cel(ctx, cc => cc.rect(-300, 380, 1900, 600), '#6a8a4a', { dx: 0, dy: 0, lw: 0 }); const R = rng(7);
      for (let r = 0; r < 9; r++) { const y = 400 + r * r * 4.5 + r * 10, s = .45 + r * .14; for (let i = 0; i < 26 - r * 1.5; i++) { const x = 640 + (i - (26 - r * 1.5) / 2) * (40 + r * 18); P.cel(ctx, cc => { cc.rect(x - 4 * s, y - 60 * s, 8 * s, 60 * s); cc.rect(x - 20 * s, y - 48 * s, 40 * s, 8 * s); }, '#f4f2ea', { dx: 0, dy: 0, lw: 1.5 }); if (R() < .4) P.ink(ctx, '#c8241a', cc => cc.arc(x + 22 * s, y - 2, 7 * s, 0, 7), 1); } } });
    S.bigNum(ctx, '61,000', 640, 200, 110, k01(t, A.n61, .3), '#fbf8f0', '#1e1a18'); if (t > A.m8) S.fact(ctx, 'Canadians died in the war — from a country of just over 8 million', k01(t, A.m8, .4)); S.date(ctx, '1914–1918', 1); C.finish(ctx, t); }
  // 6. "the birth of a nation"? — the Vimy memorial; how much at the time vs. in memory
  function sBirth(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      C.photo(ctx, 'vimy-ridge-france', 340, 290, 400, 400, { rot: -.04, tape: true, seed: 111, caption: 'The Vimy Memorial (built 1925–36)', capSize: 15 });
      C.photo(ctx, 'vimy-ridge-france-2', 1060, 300, 240, 362, { rot: .05, tape: true, seed: 112 });
      if (t > A.birth - .3) C.headline(ctx, '"THE BIRTH OF A NATION"', 700, 140, 40, { rot: -.03, bg: '#fbf8f0' }); if (t > A.partly) C.scrawl(ctx, '…partly memory?', 720, 220, 38);
      if (t > A.debate) { const k = k01(t, A.debate, .4); ctx.save(); ctx.globalAlpha = k; C.label(ctx, 'mattered at the time?', 700, 360, 22, { rot: -.03 }); C.label(ctx, 'grew in memory?', 700, 420, 22, { rot: .03 }); ctx.restore(); } });
    C.finish(ctx, t); }
  // 7. less a colony, more a country: the legation in Washington, and Britain stops legislating for Canada
  function sCountry(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.04 }, { z: 1.0 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 520, sun: [1100, 200], sunR: 40, seed: 421 }));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 600, 1900, 300), '#b8b0a0', { dx: 0, dy: 0, lw: 0 });
      // a townhouse legation
      P.cel(ctx, cc => cc.rect(380, 280, 360, 320), '#d8c8b0', { shade: '#a89880', light: '#efe4d0', dx: 24, dy: 0, lw: 4 }); P.cel(ctx, cc => cc.rect(360, 260, 400, 26), '#a89880', { dx: 0, dy: 4, lw: 3 }); for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) P.ink(ctx, '#4a5a6a', cc => cc.rect(410 + i * 82, 310 + r * 90, 40, 56), 3); P.cel(ctx, cc => cc.rect(530, 520, 60, 80), '#5a3a24', { dx: 0, dy: 0, lw: 3 });
      P.ink(ctx, '#5a5a5a', cc => cc.rect(556, 130, 6, 140), 0); C.flagRedEnsign(ctx, 562, 130, 110, 64); C.label(ctx, 'CANADIAN LEGATION · WASHINGTON', 560, 640, 20);
      C.fig(ctx, 860, 690, .8, t, { hat: 'top', coat: '#1e1e24', pose: 'wave', mood: 'happy', flip: true, seed: 431 }); });
    if (t > A.embassy) S.date(ctx, '1927 · ITS OWN MAN IN WASHINGTON', 1); if (t > A.decade) { ctx.save(); ctx.translate(1040, 300); ctx.rotate(.05); const k = ease.back(k01(t, A.decade, .4)); ctx.scale(k, k); C.shadow(ctx, true, 8, .4); ctx.drawImage(C.paper('cream', 300, 220), -150, -110); C.shadow(ctx, false); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '900 30px Anton'; ctx.fillText('STATUTE OF', 0, -50); ctx.fillText('WESTMINSTER · 1931', 0, -14); ctx.font = '700 17px Fredoka, sans-serif'; ctx.fillText('Britain stops making', 0, 30); ctx.fillText('laws for Canada', 0, 54); ctx.restore(); }
    if (t > A.colony && t < A.embassy) S.fact(ctx, 'less like a colony — more like a country', k01(t, A.colony, .4)); C.finish(ctx, t); }
  // 8. rewind to the cold open: 1921, Buster Brown in civilian clothes
  function sRewind(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      C.photo(ctx, 'james-buster-sutherland-brown', 380, 290, 480, 341, { rot: -.03, tape: true, seed: 121, filter: 'sepia', caption: 'Col. James "Buster" Sutherland Brown (seated, centre)', capSize: 14 }); C.marker(ctx, 'circle', [380, 300, 50, 60], k01(t, A.y1921 + .4, .6));
      C.fig(ctx, 940, 690, 1.0, t, { face: 'buster', pose: t > A.scouting ? 'point' : 'stand', mood: 'calm', flip: true, seed: 441 }); });
    S.bigNum(ctx, '⟲ 1921', 640, 100, 60, k01(t, A.moment, .3)); if (t > A.y1921 + .8) S.fact(ctx, 'Buster Brown, in civilian clothes, scouting the northern US', k01(t, A.y1921 + .8, .4)); C.finish(ctx, t); }

  const cut = [[A.start, sAuto, .4], [A.april - .1, sVimy, .4], [A.easter - .2, sOver, .4], [A.apr12 - .1, sTaken, .4], [A.whole - .1, sCrosses, .5], [A.hear - .1, sBirth, .4], [A.clear - .1, sCountry, .4], [A.moment - .2, sRewind, .4]];
  F.chapter({ cut, sfx: [{ t: A.changed + .9, type: 'artillery', gain: .3 }, { t: A.changed + 3.2, type: 'artillery', gain: .25 }, { t: A.four + .5, type: 'artillery', gain: .25 }, { t: A.every, type: 'artillery', gain: .22 }, { t: A.french + 1, type: 'artillery', gain: .25 }, { t: A.april + .2, type: 'steps', gain: .25 }, { t: A.auto, type: 'boom', gain: .35 }, { t: A.choose, type: 'press', gain: .4 }, { t: A.over, type: 'boom', gain: .45 }, { t: A.over + .8, type: 'boom', gain: .35 }, { t: A.theirs, type: 'swell', gain: .35 }, { t: A.n61, type: 'thud', gain: .4 }, { t: A.birth - .3, type: 'paper', gain: .35 }, { t: A.decade, type: 'paper', gain: .35 }, { t: A.moment, type: 'whoosh', gain: .45 }],
    moods: [{ t: A.start, mood: 'tense' }, { t: A.whole, mood: 'silence' }, { t: A.hear, mood: 'still' }, { t: A.moment, mood: 'mystery' }] });
})(window);
