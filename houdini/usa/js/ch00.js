/* The American Revolution — cold open (0–79.3 s): Christmas night 1776 on the Delaware; rags for shoes; four months of losing;
 * enlistments run out in six days; how does an army that keeps losing beat the most powerful empire on Earth?; the preview; get in the boat. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, U = G.US, PP = G.PEOPLE, { clamp, lerp, ease, INK, rng, mix } = C, k01 = S.k01;
  const YOU = Object.assign({}, G.CAST.you, { lead: false, speak: false });
  // 1. the riverbank: sleet, ice, boats loading; you stand on the bank, shivering
  function sBank(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.12, x: 40, y: 20 }, { z: 1.0, x: -20 }); Cn.layer(ctx, c, 1, () => { U.river(ctx, t, { top: 380, bot: 600 });
      for (let i = 0; i < 3; i++) U.boat(ctx, 300 + i * 360 + Math.sin(t * .2 + i) * 20, 470 + i * 14, .55 - i * .06, t, { men: 5 - i, seed: i * 3, oars: i === 1 });
      for (let i = 0; i < 6; i++) C.fig(ctx, 90 + i * 70, 690 + (i % 2) * 12, .5, t + i, Object.assign(PP.ragged(i), { pose: i % 3 ? 'hold' : 'stand', mood: 'sad', still: true, speak: false, turn: .45 }));
      const sh = Math.sin(t * 31) * 1.5; C.fig(ctx, 900 + sh, 712, .95, t, Object.assign({}, YOU, { pose: 'hold', mood: 'sad', still: true, turn: .45 })); });
    U.sleet(ctx, t, 170); S.date(ctx, 'CHRISTMAS NIGHT · 1776', k01(t, .4, .4)); if (t > 4.5) S.fact(ctx, 'the Pennsylvania bank of the Delaware River', k01(t, 4.5, .4)); C.finish(ctx, t, { pal: 'night', vig: .55 }); }
  // 2. the ice: slabs grinding along a boat's side, low over the water
  function sIce(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 20 }); Cn.layer(ctx, c, 1, () => { U.night(ctx, t, { horizon: 300, mx: 200, my: 90 }); ctx.fillStyle = '#22344a'; ctx.fillRect(-300, 300, 1900, 600);
      U.boat(ctx, 640, 470, 1.6, t, { men: 5, seed: 7 });
      const R = rng(4); for (let i = 0; i < 9; i++) { const x = ((i * 260 + t * 60) % 1900) - 300, y = 540 + (i % 3) * 50, w = 180 + R() * 120, h = 40 + R() * 20, jam = Math.abs(x - 640) < 360 ? Math.sin(t * 9 + i) * 3 : 0;
        P.cel(ctx, cc => { cc.moveTo(x, y + jam); cc.lineTo(x + w * .3, y - h * .7); cc.lineTo(x + w * .85, y - h * .6); cc.lineTo(x + w, y); cc.lineTo(x + w * .7, y + h * .6); cc.lineTo(x + w * .15, y + h * .5); cc.closePath(); }, '#d6e2ec', { shade: '#8a9eb4', light: '#f6faff', dx: 0, dy: 6, lw: 3.5 }); }
      if (t > 13) { ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const a = -2.4 + i * .3; ctx.beginPath(); ctx.moveTo(470 + Math.cos(a) * 30, 520 + Math.sin(a) * 30); ctx.lineTo(470 + Math.cos(a) * 60, 520 + Math.sin(a) * 60); ctx.stroke(); } } });
    U.sleet(ctx, t, 150); S.fact(ctx, 'like someone dragging furniture across a floor', k01(t, 12.5, .4)); C.finish(ctx, t, { pal: 'night', vig: .55 }); }
  // feet wrapped in rags, in the snow
  const ragFoot = (ctx, x, y, s, t, d) => { ctx.save(); ctx.translate(x, y); ctx.scale(s * d, s); P.cel(ctx, cc => { cc.moveTo(-90, 0); cc.quadraticCurveTo(-100, -60, -40, -70); cc.lineTo(40, -76); cc.lineTo(46, -220); cc.lineTo(110, -220); cc.lineTo(110, -40); cc.quadraticCurveTo(110, 4, 60, 6); cc.closePath(); }, '#9a8a70', { shade: '#6a5a44', light: '#c8b898', dx: 14, dy: 0, lw: 5 });
    ctx.strokeStyle = '#5a4a34'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 30, -10 - i * 6); ctx.quadraticCurveTo(-60 + i * 30, -60 - i * 4, -30 + i * 30, -68 - i * 6); ctx.stroke(); } ctx.fillStyle = '#e8b48c'; ctx.beginPath(); ctx.ellipse(-82, -18, 14, 10, 0, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  // 3. rags for shoes: feet shifting in the snow, the cold rising through them
  function sFeet(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.08 }); Cn.layer(ctx, c, 1, () => { ctx.fillStyle = '#2a3446'; ctx.fillRect(-300, -300, 1900, 1400); U.snowGround(ctx, 420, { col: '#d8e2ea', seed: 3 });
      const shift = Math.sin(t * 1.6) > 0 ? 1 : 0, lift = Math.max(0, Math.sin(t * 3.2)) * 18; ragFoot(ctx, 520, 640 - (shift ? lift : 0), 1.15, t, 1); ragFoot(ctx, 780, 640 - (shift ? 0 : lift), 1.15, t, -1);
      ctx.strokeStyle = 'rgba(160,210,255,.7)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const x = 440 + i * 60, ph = (t * .8 + i * .37) % 1; ctx.globalAlpha = 1 - ph; ctx.beginPath(); for (let y = 0; y < 60; y += 6) ctx.lineTo(x + Math.sin(y * .15 + i) * 8, 660 - ph * 260 - y); ctx.stroke(); } ctx.globalAlpha = 1; });
    U.sleet(ctx, t, 120); S.fact(ctx, 'your shoes gave out weeks ago — your feet are wrapped in rags', k01(t, 17.8, .4)); C.finish(ctx, t, { pal: 'night', vig: .6 }); }
  // 4. four months of losing: the retreat drawn across the map, NEW YORK and NEW JERSEY crossed out
  function sLost(ctx, lt, dur, t) { const v = S.view({ lon: -74.6, lat: 40.6, s: 4200, y: 380 }, { lon: -74.7, lat: 40.5, s: 5000, y: 380 }, ease.inOut(clamp(lt / dur)));
    const pr = C.map(ctx, v, { prov: true, fill: n => ({ 'New York': t > 30.1 ? '#a8a0a0' : '#d8c890', 'New Jersey': t > 31.4 ? '#a8a0a0' : '#d8c890', Pennsylvania: '#c8d8a0' })[n] || null, faces: n => n === 'New York' || n === 'New Jersey' ? (t > 31.4 || (n === 'New York' && t > 30.1) ? 'sad' : 'worried') : n === 'Pennsylvania' ? 'worried' : null, alpha: .85 });
    const end = U.route(ctx, pr, [[-73.95, 40.7], [-74.1, 40.9], [-74.45, 40.5], [-74.75, 40.22], [-74.9, 40.25]], k01(t, 27.7, 4.5), '#2a3a7a', 10, true); if (t > 27.7) U.dot(ctx, end[0], end[1], '#2a3a7a', 11);
    if (t > 30.1) { const [x, y] = pr(-74, 41.1); C.stamp(ctx, 'LOST', x, y, 46, -.12, k01(t, 30.1, .3)); } if (t > 31.4) { const [x, y] = pr(-74.5, 40.0); C.stamp(ctx, 'LOST', x, y, 46, .1, k01(t, 31.4, .3)); }
    S.date(ctx, 'AUG – DEC 1776', 1); C.headline(ctx, '4 MONTHS OF RUNNING', 900, 140, 40, { rot: -.03, bg: '#fbf8f0' }); C.finish(ctx, t); }
  // 5. the men who are gone: a line of soldiers; one by one they are captured, killed or walk home
  function sGone(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 470, seed: 51 })); Cn.layer(ctx, c, 1, () => { U.snowGround(ctx, 520, { seed: 5 }); U.treeline(ctx, 520, '#2a3a3a', 16, 4, .55);
      const tags = ['CAPTURED', 'KILLED', 'WENT HOME']; for (let i = 0; i < 9; i++) { const gone = t > 33.6 + i * .42 && i % 3 !== 1, x = 100 + i * 135; if (gone) { const u = clamp((t - 33.6 - i * .42) / .6); ctx.globalAlpha = 1 - u * .82; }
        C.fig(ctx, x, 700, .58, t + i, Object.assign(PP.ragged(i), { pose: 'stand', mood: gone ? 'sad' : 'calm', still: true, speak: false, turn: .45 })); ctx.globalAlpha = 1; if (gone && t < 37.6) C.label(ctx, tags[i % 3 === 0 ? (i / 3 | 0) % 3 : 2], x, 430 + (i % 2) * 30, 15, { rot: (i % 2 ? .04 : -.04), bg: i % 3 === 0 ? '#f4c44a' : '#fbf8f0' }); } });
    U.snowfall(ctx, t, 60); S.fact(ctx, 'thousands of men you marched with — captured, killed, or gone home', k01(t, 32.9, .4)); C.finish(ctx, t, { vig: .5 }); }
  // 6. six days: the enlistment paper, a calendar page counting down
  function sSixDays(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      ctx.save(); ctx.translate(380, 320); ctx.rotate(-.05); C.shadow(ctx, true, 10, .4); ctx.drawImage(C.paper('cream', 420, 500), -210, -250); C.shadow(ctx, false); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '34px "Luckiest Guy"'; ctx.fillText('ENLISTMENT', 0, -170); ctx.font = '700 20px Fredoka'; ['I, the undersigned, do', 'enlist in the Continental', 'Army until the last day', 'of December, 1776.'].forEach((l, i) => ctx.fillText(l, 0, -110 + i * 32)); ctx.font = '30px "Permanent Marker"'; ctx.fillStyle = '#2a3a7a'; ctx.fillText('— your name', 40, 60);
      if (t > 41) C.marker(ctx, 'circle', [0, -14, 170, 30], k01(t, 41, .6)); ctx.restore();
      const day = t < 40 ? 25 : Math.min(31, 25 + Math.floor((t - 40) * 1.6)); U.calendar(ctx, 900, 330, 1, 'DECEMBER', day, 1, { sub: day < 31 ? `${31 - day + 1} DAYS LEFT` : 'LAST DAY', rot: .04 }); });
    S.fact(ctx, 'your enlistment — and almost everyone\'s — runs out in six days', k01(t, 37.8, .4)); C.finish(ctx, t); }
  // 7. New Year's Day: the camp empties; the calendar flips to 1 January 1777
  function sEmpty(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06 }, { z: 1.0 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 460, seed: 61 })); Cn.layer(ctx, c, 1, () => { U.snowGround(ctx, 500, { seed: 6 });
      for (let i = 0; i < 7; i++) U.tent(ctx, 120 + i * 170, 520 + (i % 2) * 18, .9); S.campfire(ctx, 420, 640, .7, t); const go = clamp((t - 45.5) / 3.6);
      for (let i = 0; i < 8; i++) { const x0 = 160 + i * 130, x = lerp(x0, 1500 + i * 60, ease.in(clamp(go * 1.4 - i * .05))); C.fig(ctx, x, 700, .55, t + i, Object.assign(PP.ragged(i + 3), { pose: go > 0 ? 'walk' : 'stand', flip: false, mood: 'sad', speak: false, still: true })); }
      U.calendar(ctx, 1080, 230, .55, t < 47 ? 'DECEMBER' : 'JANUARY', t < 47 ? 31 : 1, 1, { sub: t < 47 ? '1776' : '1777', col: t < 47 ? '#c23a2c' : '#2a3a7a', rot: .05 }); });
    U.snowfall(ctx, t, 70); S.fact(ctx, "on New Year's Day, this army basically stops existing", k01(t, 45.2, .4)); C.finish(ctx, t, { vig: .5 }); }
  // 8. the question: a ragged little army in front of a giant redcoat and a wall of ships; then the title
  function sQuestion(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06, y: -20 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 480, seed: 71 })); Cn.layer(ctx, c, 1, () => { U.water(ctx, 470, t, { pal: 'storm' }); for (let i = 0; i < 6; i++) U.warship(ctx, 700 + i * 110, 500 + (i % 2) * 20, .28, t + i, { flag: 'uk' });
      U.ground(ctx, 560, '#7a8a5a', { amp: 6 }); C.fig(ctx, 980, 760, 2.4, t, Object.assign(PP.redcoat(1), { pose: 'crossed', mood: 'angry', still: true, speak: false, turn: -.45 }));
      for (let i = 0; i < 6; i++) C.fig(ctx, 120 + i * 70, 700 + (i % 2) * 10, .5, t + i, Object.assign(PP.ragged(i), { pose: i === 2 ? 'chin' : 'hold', mood: 'shock', still: true, speak: false, turn: -.45 }));
      const L = [['LOSES', 51.6], ['AND LOSES', 52.6], ['AND LOSES', 53.6]]; L.forEach(([w, kt], i) => { if (t > kt && t < 56) C.label(ctx, w, 260 + i * 40, 420 - i * 54, 20, { rot: -.05 + i * .04, bg: '#f4c44a' }); });
      if (t > 54.5) { C.headline(ctx, 'MOST POWERFUL EMPIRE ON EARTH', 980, 200, 30, { rot: .03, bg: '#c23a2c', col: '#fff' }); } });
    C.finish(ctx, t, { vig: .5 }); }
  // the title card
  function sTitle(ctx, lt, dur, t) { const g = ctx.createRadialGradient(640, 360, 60, 640, 360, 800); g.addColorStop(0, '#2a3a5a'); g.addColorStop(1, '#0a0e18'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720); U.flagPole(ctx, 1000, 700, 520, 'us', t, 1.6); U.flagPole(ctx, 280, 700, 520, 'uk', t, 1.6); ctx.fillStyle = 'rgba(10,14,24,.45)'; ctx.fillRect(0, 0, 1280, 720);
    const k = ease.back(k01(t, 56.2, .5)); ctx.save(); ctx.translate(640, 330); ctx.scale(k, k); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.font = '84px "Luckiest Guy"'; G.Type.outlined(ctx, 'THE AMERICAN', 0, -40, 84, ['#ffffff', '#e8e4dc']); ctx.font = '132px "Luckiest Guy"'; G.Type.outlined(ctx, 'REVOLUTION', 0, 90, 132, ['#ff5a4a', '#c8180e']); ctx.restore(); U.snowfall(ctx, t, 50); C.finish(ctx, t, { vig: .6 }); }
  // the preview cards
  const card = (ctx, x, y, rot, kt, t, cap, draw) => { const k = k01(t, kt, .35); if (k <= 0) return; S.polaroid(ctx, x, y, 280, 180, rot, (cc, w, h) => { cc.save(); cc.scale(w / 1280, h / 720); draw(cc); cc.restore(); }, cap, k, (x | 0) % 7); };
  function sPreview(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      card(ctx, 250, 230, -.06, 61.7, t, 'a midnight escape in the fog', cc => { U.river(cc, t, { top: 360, bot: 720, nearBank: false }); U.boat(cc, 640, 520, 1, t, { men: 6, oars: true }); U.fog(cc, t, .7); });
      card(ctx, 620, 210, .04, 63.9, t, '2,000 dead — no battle', cc => { Cn.sky(cc, 'storm', t, { horizon: 420, seed: 3 }); U.snowGround(cc, 440); for (let i = 0; i < 4; i++) U.hut(cc, 200 + i * 300, 640, .9, t, { snow: true }); U.snowfall(cc, t, 50); });
      card(ctx, 1000, 240, -.03, 68.2, t, "can't speak English", cc => { U.snowGround(cc, 300); C.fig(cc, 640, 760, 1.6, t, { face: 'steuben', pose: 'point', mood: 'angry', speak: false }); cc.font = '120px "Luckiest Guy"'; G.Type.outlined(cc, '!#@%', 980, 260, 120, '#ffe040'); });
      card(ctx, 640, 520, .05, 71.6, t, 'never sets foot on the battlefield', cc => { Cn.sky(cc, 'golden', t, { horizon: 400, seed: 5 }); U.water(cc, 400, t); U.warship(cc, 640, 560, .9, t, { flag: 'fr' }); });
    }); C.finish(ctx, t); }
  // 9. get in the boat: Washington standing in the bow; you step aboard
  function sBoard(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: 20 }, { z: 1.12, x: -20, y: 10 }); Cn.layer(ctx, c, 1, () => { U.river(ctx, t, { top: 360, bot: 610, mx: 260, my: 100 }); U.boat(ctx, 680, 560, 1.15, t, { men: 5, oars: true, seed: 2 });
      C.fig(ctx, 900, 528, .75, t, { face: 'washington', pose: 'point', still: true, speak: false, flip: true }); const step = clamp((t - 77) / 1.5); C.fig(ctx, lerp(300, 420, ease.inOut(step)), lerp(700, 560, ease.inOut(step)), .8, t, Object.assign({}, YOU, { pose: step > 0 && step < 1 ? 'walk' : 'stand', flip: true, mood: 'calm' })); });
    U.sleet(ctx, t, 140); S.fact(ctx, 'but first, you need to get in the boat', k01(t, 76.8, .4)); C.finish(ctx, t, { pal: 'night', vig: .55 }); }

  sTitle.noCover = true;
  const cut = [[0, sBank, 0], [10.4, sIce, .3], [16.9, sFeet, .3], [26.3, sLost, .3], [32.9, sGone, .3], [37.6, sSixDays, .3], [45.2, sEmpty, .3], [49.8, sQuestion, .3], [56, sTitle, 0], [58.5, sPreview, .3], [76.4, sBoard, .3]];
  F.chapter({ cut, sfx: [{ t: 30.1, type: 'stamp', gain: .5 }, { t: 31.4, type: 'stamp', gain: .5 }, { t: 41, type: 'scribble', gain: .3 }, { t: 47, type: 'paper', gain: .4 }, { t: 56.2, type: 'impact', gain: .6 }, { t: 61.7, type: 'pop', gain: .3 }, { t: 63.9, type: 'pop', gain: .3 }, { t: 68.2, type: 'pop', gain: .3 }, { t: 71.6, type: 'pop', gain: .3 }],
    moods: [{ t: 0, mood: 'mystery' }, { t: 26.3, mood: 'under' }, { t: 49.8, mood: 'tense' }, { t: 58.5, mood: 'still' }, { t: 76.4, mood: 'mystery' }] });
})(window);
