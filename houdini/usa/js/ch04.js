/* The American Revolution — Beat 4b, New York (263.6–346.9 s): independence; the biggest invasion fleet; Brooklyn Heights and the flank;
 * pinned against the East River; the night escape, the nor'easter and the fog; Tallmadge; losing New York — but the army is still here. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, U = G.US, PP = G.PEOPLE, { clamp, lerp, ease, INK, rng, mix } = C, k01 = S.k01;
  const YOU = Object.assign({}, G.CAST.you, { lead: false, speak: false });
  const musket = (cc) => P.ink(cc, '#5a3a24', c2 => c2.rect(-3, -110, 6, 120), 2);
  // 1. July 1776: the declaration is read aloud; the crowd cheers, hats fly
  function sDeclare(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06, y: -10 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 520, sun: [1100, 140], sunR: 40, seed: 141 })); Cn.layer(ctx, c, 1, () => { U.meetinghouse(ctx, 640, 560, 1.0); U.ground(ctx, 560, '#b8a888', { amp: 2 });
      C.fig(ctx, 640, 600, .7, t, Object.assign(PP.mp(1), { pose: 'point', mood: 'happy', still: true, speak: false, prop: (cc) => { P.cel(cc, c2 => c2.rect(-40, -60, 80, 100), '#f4ecd8', { dx: 4, dy: 4, lw: 2.5 }); } }));
      for (let i = 0; i < 10; i++) { const x = 80 + i * 124 + (i > 4 ? 40 : -40), jump = Math.max(0, Math.sin(t * 6 + i)) * 12; C.fig(ctx, x, 712 - jump, .55, t + i, Object.assign(PP.colonist(i), { pose: i % 2 ? 'up' : 'wave', mood: 'happy', still: true, speak: false, turn: i < 5 ? .45 : -.45 })); }
      const R = rng(9); for (let i = 0; i < 8; i++) { const u = (t * .7 + R()) % 1, x = 100 + R() * 1080; ctx.save(); ctx.translate(x, 520 - Math.sin(u * Math.PI) * 300); ctx.rotate(u * 9); P.cel(ctx, cc => { cc.moveTo(-22, 4); cc.lineTo(0, -14); cc.lineTo(22, 4); cc.closePath(); }, '#2a2a30', { dx: 2, dy: 2, lw: 2.5 }); ctx.restore(); } });
    S.date(ctx, 'JULY 4, 1776', 1); S.fact(ctx, 'Congress declares independence', k01(t, 264, .4)); C.finish(ctx, t); }
  // 2. the fleet: warships crowding the harbor, a forest of masts; counter of ships and men
  function sFleet(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.12, x: 60 }, { z: 1.0, x: -40 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 400, sun: [200, 120], sunR: 36, seed: 151 })); Cn.layer(ctx, c, 1, () => { U.water(ctx, 400, t);
      const R = rng(12); const ships = []; for (let i = 0; i < 26; i++) ships.push([R() * 1500 - 100, 410 + R() * 260, .18 + R() * .35, R()]); ships.sort((a, b) => a[1] - b[1]);
      ships.forEach(([x, y, s, r], i) => { const kt = 268 + i * .18; if (t < kt) return; U.warship(ctx, x + Math.sin(t * .4 + r * 6) * 6, y, s * (.6 + y / 900), t, { flag: 'uk', flip: r > .5 }); }); });
    if (t > 270.8) { ctx.save(); ctx.font = '64px "Luckiest Guy"'; ctx.textAlign = 'center'; G.Type.outlined(ctx, Math.round(400 * k01(t, 270.8, 2)) + '+ SHIPS', 640, 210, 64, '#ffffff'); ctx.restore(); }
    if (t > 273.5) C.label(ctx, '~32,000 soldiers', 640, 270, 24, { bg: '#f4c44a' }); S.date(ctx, 'NEW YORK HARBOR · SUMMER 1776', 1); C.finish(ctx, t); }
  // 3. Brooklyn Heights: you behind a dirt wall; then the flank — arrows sweep around you on the map
  function sHeights(ctx, lt, dur, t) { if (t < 282.2) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.08 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 460, sun: [1000, 220], sunR: 40, seed: 161 })); Cn.layer(ctx, c, .5, () => C.hills(ctx, 440, ['#8aa86a', '#6f8f4a'], 5, 30)); Cn.layer(ctx, c, 1, () => { U.ground(ctx, 540, '#8a9a58');
        for (let i = 0; i < 6; i++) C.fig(ctx, 140 + i * 110 + (i > 2 ? 380 : 0), 690, .58, t + i, Object.assign(PP.continental(i), { pose: 'hold', mood: 'worried', still: true, speak: false, turn: .45, prop: musket }));
        C.fig(ctx, 640, 712, .92, t, Object.assign({}, YOU, { pose: 'hold', mood: 'worried', still: true, turn: .45, prop: musket })); U.earthwork(ctx, 640); });
      S.fact(ctx, "you're dug in on Brooklyn Heights", k01(t, 279, .4)); C.finish(ctx, t); return; }
    // a hand-drawn battle diagram on parchment: Manhattan, the East River, Brooklyn; the British swing round through the pass behind you
    const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft'); ctx.save(); ctx.translate(640, 370); ctx.rotate(-.015); ctx.drawImage(C.paper('cream', 1160, 620), -580, -310); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(-580, -310, 1160, 620); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(62, 62, 1156, 616); ctx.clip(); ctx.fillStyle = '#9ac8e0'; ctx.fillRect(60, 60, 1160, 620);
      P.cel(ctx, cc => { cc.moveTo(250, 60); cc.lineTo(470, 60); cc.quadraticCurveTo(470, 260, 400, 400); cc.lineTo(330, 420); cc.quadraticCurveTo(280, 260, 250, 60); cc.closePath(); }, '#e8dcb0', { shade: '#c8b888', dx: 6, dy: 0, lw: 3.5 });
      P.cel(ctx, cc => { cc.moveTo(540, 60); cc.lineTo(1240, 60); cc.lineTo(1240, 700); cc.lineTo(420, 700); cc.quadraticCurveTo(470, 560, 520, 420); cc.quadraticCurveTo(560, 250, 540, 60); cc.closePath(); }, '#c8d8a0', { shade: '#a0b878', dx: 6, dy: 0, lw: 3.5 });
      ctx.strokeStyle = '#6a8a4a'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(600, 640); ctx.quadraticCurveTo(800, 460, 1180, 420); ctx.stroke(); ctx.setLineDash([]);
      for (let i = 0; i < 5; i++) P.cel(ctx, cc => cc.rect(600 + i * 34, 300 + (i % 2) * 18, 26, 26), '#2a4a9a', { dx: 3, dy: 3, lw: 2.5 });
      for (let i = 0; i < 5; i++) P.cel(ctx, cc => cc.rect(700 + i * 34, 560, 26, 26), '#c23a2c', { dx: 3, dy: 3, lw: 2.5 });
      const k = k01(t, 282.4, 3.2); if (k > 0) C.marker(ctx, 'arrow', [1150, 640, 820, 220, -160], k, '#c23a2c', 14); if (k > .6) C.marker(ctx, 'arrow', [880, 560, 720, 380, 30], k01(t, 284.6, 1), '#c23a2c', 10);
      ctx.restore();
      C.label(ctx, 'MANHATTAN', 360, 120, 20); C.label(ctx, 'EAST RIVER', 500, 470, 18, { bg: '#c8e0f0', rot: -1.2 }); C.label(ctx, 'BROOKLYN HEIGHTS · YOU', 700, 260, 18, { bg: '#7ac8ff' }); C.label(ctx, 'BRITISH', 770, 620, 18, { bg: '#f0c8c0' }); if (k > .5) C.label(ctx, 'JAMAICA PASS', 1080, 380, 18, { bg: '#f4c44a' }); });
    if (t > 283) S.fact(ctx, 'August 27th: the British go around your flank', k01(t, 283, .4)); C.finish(ctx, t); }
  // 4. pinned: water behind, army in front, the navy able to sail in
  function sPinned(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.1 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 380, seed: 171 })); Cn.layer(ctx, c, 1, () => { U.water(ctx, 380, t); if (t > 293) U.warship(ctx, lerp(1500, 1050, ease.out(k01(t, 293, 3))), 430, .45, t, { flag: 'uk', flip: true });
      ctx.fillStyle = '#7a8a50'; ctx.beginPath(); ctx.moveTo(-300, 520); ctx.quadraticCurveTo(640, 480, 1600, 520); ctx.lineTo(1600, 1000); ctx.lineTo(-300, 1000); ctx.fill();
      for (let i = 0; i < 5; i++) C.fig(ctx, 90 + i * 110, 660 + (i % 2) * 14, .6, t + i, Object.assign(PP.continental(i), { pose: 'hold', mood: 'shock', still: true, speak: false, turn: .45, prop: musket }));
      for (let i = 0; i < 8; i++) C.fig(ctx, lerp(1500, 760, ease.out(k01(t, 289.5, 3))) + (i % 4) * 120 + (i / 4 | 0) * 50, 650 + (i / 4 | 0) * 50, .55 + (i / 4 | 0) * .05, t + i, Object.assign(PP.redcoat(i), { pose: 'hold', still: true, speak: false, mood: 'angry', flip: true, turn: -.45, prop: musket })); });
    if (t > 288) C.label(ctx, 'WATER BEHIND YOU', 400, 330, 26, { bg: '#c8e0f0' }); if (t > 290.5) C.label(ctx, 'BRITISH ARMY', 960, 470, 26, { bg: '#f0c8c0' }); if (t > 293) C.label(ctx, 'ROYAL NAVY', 1050, 300, 22, { bg: '#f4c44a' });
    if (t > 296.7) C.stamp(ctx, 'YOU SHOULD BE DONE', 640, 360, 60, -.08, k01(t, 296.7, .3)); C.finish(ctx, t, { vig: .55 }); }
  // 5. the night escape: rain and wind, little boats rowing back and forth across the river
  function sEscape(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.08, x: 30 }, { z: 1.0, x: -30 }); Cn.layer(ctx, c, .1, () => U.night(ctx, t, { horizon: 300, mx: -200 })); Cn.layer(ctx, c, 1, () => { ctx.fillStyle = '#1a2a3e'; ctx.fillRect(-300, 300, 1900, 700); ctx.fillStyle = '#2a3428'; ctx.fillRect(-300, 290, 1900, 24);
      for (let i = 0; i < 6; i++) { const dir = i % 2 ? 1 : -1, u = ((t * .05 + i * .17) % 1), x = dir > 0 ? lerp(-200, 1500, u) : lerp(1500, -200, u); U.boat(ctx, x, 380 + i * 50, .35 + i * .07, t + i, { men: dir > 0 ? 5 : 1, oars: true, seed: i, turn: dir < 0 }); }
      ctx.fillStyle = '#2e3a2a'; ctx.beginPath(); ctx.moveTo(-300, 660); ctx.quadraticCurveTo(640, 620, 1600, 680); ctx.lineTo(1600, 1000); ctx.lineTo(-300, 1000); ctx.fill();
      if (t < 303.1) { C.fig(ctx, 640, 712, .9, t, { face: 'washington', pose: 'point', mood: 'calm', brow: 'angry' }); }
      else for (let i = 0; i < 6; i++) C.fig(ctx, 120 + i * 200, 712, .62, t + i, Object.assign(PP.continental(i), { pose: 'walk', mood: 'worried', still: true, speak: false, profile: true, flip: true })); });
    U.rain(ctx, t, 180); S.date(ctx, 'NIGHT OF AUGUST 29, 1776', 1); if (t > 303.1 && t < 307.5) S.fact(ctx, "you're told you're preparing for an attack", k01(t, 303.1, .4)); else if (t > 307.5) S.fact(ctx, 'about 9,000 men rowed across to Manhattan', k01(t, 307.5, .4)); C.finish(ctx, t, { pal: 'night', vig: .55 }); }
  // 6. the weather: the nor'easter blows the fleet back; dawn fog swallows the last boats
  function sFog(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.08 }); const dawn = t > 318.3; Cn.layer(ctx, c, .1, () => dawn ? Cn.sky(ctx, 'dawn', t, { horizon: 380, sun: [1000, 360], sunR: 40, seed: 181 }) : Cn.sky(ctx, 'storm', t, { horizon: 380, seed: 181 })); Cn.layer(ctx, c, 1, () => { U.water(ctx, 380, t);
      if (!dawn) { for (let i = 0; i < 3; i++) U.warship(ctx, 1100 + i * 140 + Math.sin(t * 2 + i) * 18, 420 + i * 30, .32, t, { flag: 'uk', flip: true }); ctx.save(); ctx.translate(500, 250); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 7; i++) { const u = (t * 1.4 + i * .3) % 1; ctx.globalAlpha = 1 - u; ctx.beginPath(); ctx.moveTo(-300 + u * 900, i * 50 - 100); ctx.quadraticCurveTo(-200 + u * 900, i * 50 - 130, -100 + u * 900, i * 50 - 100); ctx.stroke(); } ctx.restore(); ctx.globalAlpha = 1; }
      else { for (let i = 0; i < 3; i++) U.boat(ctx, 300 + i * 300 + (t - 318) * 30, 500 + i * 40, .55, t + i, { men: 5, oars: true, seed: i + 4 }); } });
    if (dawn) U.fog(ctx, t, k01(t, 318.6, 2.5), 300); S.fact(ctx, dawn ? 'at dawn a heavy fog rolls in and hides them' : "a nor'easter keeps the British fleet out of the river", k01(t, dawn ? 318.6 : 314.6, .4)); C.finish(ctx, t, { pal: dawn ? 'dawn' : 'night' }); }
  // 7. Washington steps into the last boat
  function sLast(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.1, y: 10 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'dawn', t, { horizon: 400, sun: [1000, 360], sunR: 40, seed: 191 })); Cn.layer(ctx, c, 1, () => { U.water(ctx, 400, t); U.boat(ctx, 760, 520, .9, t, { men: 4, oars: true, seed: 11 });
      ctx.fillStyle = '#6a7a50'; ctx.beginPath(); ctx.moveTo(-300, 560); ctx.lineTo(560, 580); ctx.lineTo(500, 1000); ctx.lineTo(-300, 1000); ctx.fill(); const x = lerp(360, 560, ease.inOut(k01(t, 325, 2.5))); C.fig(ctx, x, 712, .95, t, { face: 'washington', pose: x < 550 ? 'walk' : 'stand', mood: 'calm', profile: x < 550, flip: false }); });
    U.fog(ctx, t, .7, 300); S.fact(ctx, 'Washington is reportedly one of the last men to leave', k01(t, 324.8, .4)); C.finish(ctx, t, { pal: 'dawn' }); }
  // 8. the Tallmadge quote on a memoir page
  function sQuote(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft'); ctx.save(); ctx.translate(640, 360); ctx.rotate(-.02); ctx.drawImage(C.paper('cream', 860, 460), -430, -230); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(-430, -230, 860, 460); ctx.restore();
      ctx.save(); ctx.font = '700 38px Fredoka'; ctx.fillStyle = INK; ctx.textAlign = 'center'; const L = ['"In the history of warfare', 'I do not recollect a more', 'fortunate retreat."']; L.forEach((l, i) => { const k = k01(t, 329 + i * 1.6, .5); ctx.globalAlpha = k; ctx.fillText(l, 640, 270 + i * 66); }); ctx.globalAlpha = 1; ctx.font = '26px "Permanent Marker"'; ctx.fillStyle = '#c23a2c'; ctx.globalAlpha = k01(t, 334, .5); ctx.fillText('— Benjamin Tallmadge, memoir', 680, 500); ctx.restore();
      C.fig(ctx, 1150, 712, .7, t, { face: 'tallmadge', pose: 'chin', mood: 'calm', flip: true }); });
    C.finish(ctx, t); }
  // 9. loses New York, chased across New Jersey; but the army is still here
  function sChased(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -74.45, lat: 40.45, s: 13000, x: 640, y: 380 }, { prov: true, fill: n => ({ 'New York': t > 339.8 ? '#a8a0a0' : '#d8c890', 'New Jersey': t > 341.5 ? '#c8b8a0' : '#d8c890', Pennsylvania: '#c8d8a0' })[n] || null, faces: n => n === 'New York' && t > 339.8 ? 'sad' : null, alpha: .85 });
    const e = U.route(ctx, pr, [[-73.98, 40.76], [-74.15, 40.85], [-74.45, 40.5], [-74.75, 40.22], [-74.95, 40.15]], k01(t, 340.6, 3.5), '#2a3a7a', 10); if (t > 340.6) { U.dot(ctx, ...e, '#2a3a7a', 14); const b = U.route(ctx, pr, [[-73.98, 40.76], [-74.15, 40.85], [-74.45, 40.5], [-74.75, 40.22]], k01(t, 341.4, 3.5), '#c23a2c', 6, true); U.dot(ctx, ...b, '#c23a2c', 10); }
    if (t > 339.8) C.marker(ctx, 'x', [...pr(-73.98, 40.76), 30], k01(t, 339.8, .4)); C.label(ctx, 'NEW YORK', pr(-73.98, 40.76)[0] + 70, pr(-73.98, 40.76)[1] - 30, 18); C.label(ctx, 'DELAWARE RIVER', pr(-75.05, 40.35)[0] - 70, pr(-75.05, 40.35)[1], 16, { bg: '#c8e0f0', rot: -.3 });
    if (t > 344.4) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); C.headline(ctx, 'BUT THE ARMY IS STILL HERE', 640, 360, 56, { rot: -.03, bg: '#ffe040' }); } else S.fact(ctx, t < 339.8 ? 'Washington loses the battle' : t < 340.6 ? 'he loses New York' : "he'll spend the fall being chased across New Jersey", k01(t, t < 339.8 ? 338 : t < 340.6 ? 339.8 : 340.6, .3)); C.finish(ctx, t); }

  sQuote.noCover = true; sPinned.noCover = true; sChased.noCover = true; sFleet.noCover = true;
  const cut = [[263.6, sDeclare, .3], [267.6, sFleet, .3], [278.7, sHeights, .3], [286.6, sPinned, .3], [298.5, sEscape, .3], [314.5, sFog, .3], [324.4, sLast, .3], [327.2, sQuote, .3], [337.9, sChased, .3]];
  F.chapter({ cut, sfx: [{ t: 264, type: 'cheer', gain: .5 }, { t: 264.5, type: 'bell', gain: .35 }, { t: 268, type: 'shipbell', gain: .4 }, { t: 270.8, type: 'riser', gain: .3 }, { t: 282.3, type: 'cannon', gain: .55 }, { t: 283.5, type: 'volley', gain: .5 }, { t: 293, type: 'cannon', gain: .4 }, { t: 296.7, type: 'impact', gain: .7 },
    { t: 314.6, type: 'thunder', gain: .5 }, { t: 324.6, type: 'splash2', gain: .3 }, { t: 329, type: 'pen', gain: .3 }, { t: 339.8, type: 'stamp', gain: .5 }, { t: 344.4, type: 'impact', gain: .6 }],
    moods: [{ t: 263.6, mood: 'under' }, { t: 278.7, mood: 'tense' }, { t: 298.5, mood: 'mystery' }, { t: 327.2, mood: 'still' }, { t: 337.9, mood: 'tense' }, { t: 344.4, mood: 'under' }] });
})(window);
