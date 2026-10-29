/* The American Revolution — the real-world layer, cut into the finished chapters: museum paintings, living paintings, photos of the real places,
 * myth-buster sticky notes, and the transitions. Inserts are new cuts (the original scene resumes after them); decorations wrap an existing
 * scene and draw on top of it; TRANS marks whip pans, smash zooms, ink blots and flashes. Runs after every chapter and before Film.build. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, U = G.US, PP = G.PEOPLE, X = G.FX, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const big = (ctx, text, y, size, col) => { ctx.save(); ctx.font = size + 'px "Luckiest Guy"'; ctx.textAlign = 'center'; G.Type.outlined(ctx, text, 640, y, size, col || '#ffffff'); ctx.restore(); };
  const IMG = k => G.Toon.IMG[k];
  // draw image k to cover a w×h box at the origin (for polaroid insides)
  const cover = (cc, k, w, h, z = 1, fx = .5, fy = .5) => { const im = IMG(k); if (!im) return; const cr = X.kb(k, z, fx, fy, w / h); cc.drawImage(im, cr[0] * im.width, cr[1] * im.height, cr[2] * im.width, cr[3] * im.height, 0, 0, w, h); };
  // ---------- find / wrap / resume the chapters' scenes ----------
  const all = () => F.chapters.flatMap(ch => ch.cut);
  const find = (t0) => all().find(c => Math.abs(c[0] - t0) < .02);
  const DECOR = []; const decorate = (t0, top, t1) => DECOR.push([t0, t1, top]);
  const tr0 = G.drawTransitions; G.drawTransitions = (ctx, t) => { for (const [t0, t1, fn] of DECOR) if (t >= t0 && t < t1) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fn(ctx, t - t0, t1 - t0, t); ctx.restore(); } tr0(ctx, t); };
  const before = (t) => { let best = null; for (const c of all()) if (c[0] <= t + 1e-6 && (!best || c[0] > best[0])) best = c; return best; };
  const cut = [], soundmap = {};
  // insert scene fn over [t0, t1); if resume, the scene that was playing at t1 comes back at t1
  const insert = (t0, fn, t1, amb, fade = .3, resume = true) => { const prev = before(t1 - .01); cut.push([t0, fn, fade]); if (amb) soundmap[fn.name] = amb; if (resume && prev && !all().some(c => Math.abs(c[0] - t1) < .02)) { cut.push([t1, prev[1], .2]); } };
  // ======================= COLD OPEN =======================
  // the real river: the Delaware in winter, graded to night, with the boat and the grinding slabs drawn on top
  function rIce(ctx, lt, dur, t) { X.living(ctx, 'delaware_ice', lt, dur, t, { z0: 1.05, z1: 1.2, fx0: .45, fx1: .55, fy0: .62, fy1: .66, tint: 'rgba(20,34,70,.55)' });
    U.boat(ctx, 640 + Math.sin(t * .6) * 10, 560, 1.25, t, { men: 5, seed: 7, oars: true });
    const R = rng(4); for (let i = 0; i < 7; i++) { const x = ((i * 300 + t * 70) % 1900) - 300, y = 640 + (i % 3) * 34, w = 170 + R() * 110, h = 34 + R() * 16, jam = Math.abs(x - 640) < 360 ? Math.sin(t * 9 + i) * 3 : 0;
      P.cel(ctx, cc => { cc.moveTo(x, y + jam); cc.lineTo(x + w * .3, y - h * .7); cc.lineTo(x + w * .85, y - h * .6); cc.lineTo(x + w, y); cc.lineTo(x + w * .7, y + h * .6); cc.lineTo(x + w * .15, y + h * .5); cc.closePath(); }, '#d6e2ec', { shade: '#8a9eb4', light: '#f6faff', dx: 0, dy: 6, lw: 3.5 }); }
    U.sleet(ctx, t, 170); X.note(ctx, 'the real Delaware\nin winter', 1080, 140, null, null, k01(t, 11.2, .5), { size: 18, rot: .05 }); S.fact(ctx, 'like someone dragging furniture across a floor', k01(t, 12.5, .4)); C.finish(ctx, t, { vig: .4 }); }
  rIce.noCover = true; insert(10.4, rIce, 16.9, 'river', .3, false);
  // ======================= THE SPARK =======================
  // the Old North Church: the real steeple, lanterns glowing in it; Copley's Revere pinned beside
  function rOldNorth(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, y: 10 }, { z: 1.1, y: -20 }); Cn.layer(ctx, c, .1, () => U.night(ctx, t, { horizon: 640, mx: 1100, my: 110 })); Cn.layer(ctx, c, 1, () => {
      ctx.save(); ctx.filter = 'brightness(.55) saturate(.6) hue-rotate(10deg)'; C.photo(ctx, 'old_north', 470, 400, 400, 534, { crop: [0, 0, 1, 1], torn: true, tape: false, border: 0, tornImg: true, shadow: false, seed: 4 }); ctx.restore();
      const glow = k01(t, 166.6, 1.2) * (0.85 + Math.sin(t * 7) * .1); for (const dx of [-14, 14]) { const g = ctx.createRadialGradient(470 + dx, 300, 2, 470 + dx, 300, 70); g.addColorStop(0, `rgba(255,220,120,${glow})`); g.addColorStop(1, 'rgba(255,200,90,0)'); ctx.fillStyle = g; ctx.fillRect(330, 160, 280, 280); ctx.fillStyle = `rgba(255,236,170,${glow})`; ctx.beginPath(); ctx.arc(470 + dx, 300, 7, 0, 7); ctx.fill(); }
      X.frame(ctx, 'revere', 960, 300, 260, 322, { k: k01(t, 166.8, .5), rot: .03, plaque: ['Paul Revere', 'John Singleton Copley, c. 1768'] }); });
    X.note(ctx, 'two lanterns = "by sea"', 470, 600, 470, 330, k01(t, 167.6, .6), { size: 20 }); C.finish(ctx, t, { pal: 'night', vig: .5 }); }
  rOldNorth.noCover = true; insert(166.2, rOldNorth, 170, 'night');
  // Lexington Green today: the Minuteman statue pinned into the dawn scene
  decorate(187, (ctx, lt, dur, t) => { X.cutout(ctx, 'minuteman', 1130, 230, 150, 250, t, 188, { rot: .06, caption: 'Lexington Green today', capSize: 15 }); }, 193.6);
  // who fired first: Amos Doolittle's 1775 engraving, question marks over both lines
  function rDoolittle(ctx, lt, dur, t) { X.museum(ctx, 'doolittle', lt, dur, t, { maxW: 640, maxH: 390, y: 270, z0: 1.0, z1: 1.35, fx: .35, fy: .5, plaque: ['The Battle of Lexington', 'Amos Doolittle, engraved 1775'], fg: (cc) => {
        for (const [x, y, kt] of [[440, 230, 196.4], [620, 220, 197]]) if (t > kt) { const k = ease.back(k01(t, kt, .35)); cc.save(); cc.translate(x, y); cc.scale(k, k); cc.font = '110px "Luckiest Guy"'; cc.textAlign = 'center'; G.Type.outlined(cc, '?', 0, 0, 110, '#ffe040'); cc.restore(); } } });
    X.note(ctx, 'drawn months later —\nstill no answer', 1070, 160, null, null, k01(t, 197.4, .5), { size: 17, rot: .05 }); S.fact(ctx, "to this day, historians don't know who fired first", k01(t, 196, .4)); C.finish(ctx, t); }
  rDoolittle.noCover = true; insert(196, rDoolittle, 199, 'room', .2, false);
  // Concord's North Bridge, pinned on the route map
  decorate(199, (ctx, lt, dur, t) => { X.cutout(ctx, 'north_bridge', 1060, 170, 300, 150, t, 199.6, { rot: -.04, caption: "Concord's North Bridge today", capSize: 15 }); }, 205.4);
  // ======================= THE ARMY =======================
  // the real Independence Hall behind the line of farmers
  function rHall(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: -20 }, { z: 1.08, x: 20 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 520, sun: [1100, 200], sunR: 40, seed: 121 })); Cn.layer(ctx, c, .6, () => { C.photo(ctx, 'indep_hall', 640, 330, 860, 570, { crop: [.02, .05, .96, .9], torn: true, tornImg: true, border: 0, tape: false, shadow: true, seed: 8 }); });
    Cn.layer(ctx, c, 1, () => { U.ground(ctx, 610, '#b8a888', { amp: 2 }); for (let i = 0; i < 6; i++) C.fig(ctx, 140 + i * 200, 712 + (i % 2) * 8, .6, t + i, Object.assign(PP.mp(i), { pose: i % 2 ? 'chin' : 'point', mood: 'calm', still: true, speak: false, turn: i < 3 ? .45 : -.45 })); });
    S.date(ctx, 'PHILADELPHIA · 1775', 1); X.note(ctx, 'Independence Hall —\nthe real building', 1110, 120, null, null, k01(t, 225.4, .5), { size: 17, rot: .04 }); S.fact(ctx, 'the Second Continental Congress needs an army', k01(t, 225, .4)); C.finish(ctx, t); }
  rHall.noCover = true; insert(224.5, rHall, 229.2, 'street');
  // Washington: Gilbert Stuart's portrait on the wall beside our cartoon
  decorate(233.7, (ctx, lt, dur, t) => { X.frame(ctx, 'washington_stuart', 230, 220, 170, 206, { k: k01(t, 235, .5), rot: -.03, plaque: ['George Washington', 'Gilbert Stuart, 1796'] }); X.note(ctx, 'the real face', 420, 120, 320, 190, k01(t, 235.8, .5), { size: 17 }); }, 238.4);
  // ======================= NEW YORK =======================
  function rDeclare(ctx, lt, dur, t) { X.museum(ctx, 'trumbull_declaration', lt, dur, t, { maxW: 780, maxH: 430, y: 300, z0: 1.0, z1: 1.25, fx: .55, fy: .55, plaque: ['Declaration of Independence', 'John Trumbull, 1818'], fg: (cc) => {
        for (let i = 0; i < 7; i++) { const x = 100 + i * 180, jump = Math.max(0, Math.sin(t * 6 + i)) * 10; C.fig(cc, x, 780 - jump, .55, t + i, Object.assign(PP.colonist(i), { pose: i % 2 ? 'up' : 'wave', mood: 'happy', still: true, speak: false, turn: i < 3 ? .45 : -.45 })); } } });
    S.date(ctx, 'JULY 4, 1776', 1); X.note(ctx, 'painted 42 years later', 1090, 130, null, null, k01(t, 265, .5), { size: 17, rot: .05 }); S.fact(ctx, 'Congress declares independence', k01(t, 264, .4)); C.finish(ctx, t); }
  rDeclare.noCover = true; insert(263.6, rDeclare, 267.6, 'crowd', .3, false);
  // the night retreat engraving, before the boats
  function rRetreat(ctx, lt, dur, t) { X.living(ctx, 'retreat_eng', lt, dur, t, { z0: 1.0, z1: 1.18, fx0: .4, fx1: .5, fy0: .45, fy1: .5, tint: 'rgba(10,20,50,.25)' }); U.rain(ctx, t, 140); S.date(ctx, 'NIGHT OF AUGUST 29, 1776', 1);
    X.note(ctx, 'Washington does\nsomething insane', 1060, 150, null, null, k01(t, 299, .5), { size: 20, rot: .04 }); C.finish(ctx, t, { vig: .5 }); }
  rRetreat.noCover = true; insert(298.5, rRetreat, 303.1, 'rain');
  // losing the battle: Chappel's Battle of Long Island
  function rLongIsland(ctx, lt, dur, t) { X.living(ctx, 'chappel_long_island', lt, dur, t, { z0: 1.05, z1: 1.22, fx0: .5, fx1: .6, fy0: .5, fy1: .45 }); big(ctx, t < 339.8 ? 'WASHINGTON LOSES THE BATTLE' : 'HE LOSES NEW YORK', 130, 50, '#ffffff');
    C.label(ctx, 'Battle of Long Island — Alonzo Chappel, 1858', 1060, 680, 14, { bg: '#fbf8f0' }); C.finish(ctx, t, { vig: .5 }); }
  rLongIsland.noCover = true; insert(337.9, rLongIsland, 340.6, 'battle');
  // ======================= TRENTON =======================
  // Leutze's painting — and what's wrong with it
  function rLeutze(ctx, lt, dur, t) { X.living(ctx, 'leutze', lt, dur, t, { z0: 1.0, z1: 1.25, fx0: .5, fx1: .42, fy0: .5, fy1: .45 }); U.sleet(ctx, t, 90);
    big(ctx, Math.round(2400 * k01(t, 365.3, 2)).toLocaleString('en-US') + ' MEN', 120, 60, '#ffffff');
    X.note(ctx, 'painted in 1851 —\n75 years later', 1080, 230, null, null, k01(t, 366, .5), { size: 18, rot: .04 });
    X.note(ctx, 'this flag didn\'t\nexist until 1777', 330, 230, 470, 130, k01(t, 367.4, .6), { size: 18, rot: -.05, bend: -30 });
    X.note(ctx, 'it was night,\nin sleet', 900, 470, null, null, k01(t, 368.8, .5), { size: 18, rot: .03, bg: '#c8e8ff' });
    C.label(ctx, 'Washington Crossing the Delaware — Emanuel Leutze, 1851', 640, 690, 14, { bg: '#fbf8f0' }); C.finish(ctx, t, { vig: .45 }); }
  rLeutze.noCover = true; insert(364.8, rLeutze, 370.4, 'river', .2, false);
  // the prisoners: Trumbull's Capture of the Hessians
  function rHessians(ctx, lt, dur, t) { X.museum(ctx, 'trumbull_trenton', lt, dur, t, { maxW: 700, maxH: 390, y: 350, z0: 1.0, z1: 1.3, fx: .45, fy: .5, plaque: ['The Capture of the Hessians at Trenton', 'John Trumbull, 1786–1828'] });
    big(ctx, '~' + Math.round(900 * k01(t, 385.5, 2)) + ' PRISONERS', 92, 54, '#ffffff'); C.finish(ctx, t); }
  rHessians.noCover = true; insert(385.1, rHessians, 389.5, 'room', .3, false);
  // Princeton: Trumbull's Death of General Mercer pinned beside the map
  decorate(396, (ctx, lt, dur, t) => { X.frame(ctx, 'trumbull_mercer', 1010, 250, 330, 220, { k: k01(t, 397, .5), rot: .03, plaque: ['The Death of General Mercer at Princeton', 'John Trumbull'] }); }, 409.9);
  // ======================= SARATOGA / VALLEY FORGE =======================
  decorate(419.2, (ctx, lt, dur, t) => { if (t > 433.4) X.frame(ctx, 'trumbull_burgoyne', 1020, 470, 300, 200, { k: k01(t, 433.4, .5), rot: -.03, plaque: ['Surrender of General Burgoyne', 'John Trumbull, 1821'] }); }, 441.6);
  function rTrego(ctx, lt, dur, t) { X.living(ctx, 'trego', lt, dur, t, { z0: 1.0, z1: 1.2, fx0: .35, fx1: .6, fy0: .55, fy1: .55 }); U.snowfall(ctx, t, 70); S.date(ctx, 'DECEMBER 19, 1777 · VALLEY FORGE', 1);
    big(ctx, '~' + Math.round(12000 * k01(t, 479.6, 2.5)).toLocaleString('en-US') + ' SOLDIERS', 175, 52); C.label(ctx, 'The March to Valley Forge — William Trego, 1883', 1050, 690, 14, { bg: '#fbf8f0' }); C.finish(ctx, t, { vig: .45 }); }
  rTrego.noCover = true; insert(479, rTrego, 484, 'snowwind');
  decorate(508, (ctx, lt, dur, t) => { X.cutout(ctx, 'valley_forge_hut', 1145, 520, 190, 126, t, 512, { rot: .05, caption: 'a rebuilt hut, Valley Forge', capSize: 13 }); }, 518);
  // ======================= STEUBEN =======================
  decorate(539.4, (ctx, lt, dur, t) => { if (t > 544.1) X.frame(ctx, 'steuben', 1090, 250, 210, 258, { k: k01(t, 544.3, .5), rot: .03, plaque: ['Baron von Steuben', 'Charles Willson Peale, 1780'] }); }, 552.8);
  // the recap, with real pictures in the polaroids
  function rRecap1(ctx, lt, dur, t) { C.bg(ctx, 'kraft'); const pics = [[260, 340, -.06, 569.6, 'NEW YORK: rowed away in the fog', 'retreat_eng'], [640, 320, .04, 573.2, 'TRENTON: a win', 'trumbull_trenton'], [1020, 340, -.03, 576.5, "VALLEY FORGE: didn't fall apart", 'valley_forge_hut']];
    for (const [x, y, r, kt, cap, k] of pics) if (t > kt) S.polaroid(ctx, x, y, 300, 200, r, (cc, w, h) => cover(cc, k, w, h, 1.1), cap, ease.back(k01(t, kt, .4)), 3);
    if (t < 569.6) big(ctx, t < 569.4 ? 'NOW WHERE WERE WE?' : 'RIGHT.', 360, 56); if (t > 580.7) C.headline(ctx, 'BY SPRING: SOMETHING NEW', 640, 600, 44, { rot: -.02, bg: '#ffe040' }); C.finish(ctx, t); }
  rRecap1.noCover = true; insert(568.6, rRecap1, 584.4, 'room', .3, false);
  // ======================= THE TWIST =======================
  decorate(608.1, (ctx, lt, dur, t) => { X.frame(ctx, 'jersey', 1080, 330, 200, 284, { k: k01(t, 609.5, .5), rot: .03, plaque: ['The prison ship Jersey', '19th-century engraving'] }); }, 616.7);
  function rBelow(ctx, lt, dur, t) { X.living(ctx, 'jersey_inside', lt, dur, t, { z0: 1.05, z1: 1.3, fx0: .5, fx1: .35, fy0: .5, fy1: .55, tint: 'rgba(30,20,10,.25)' }); S.fact(ctx, 'below deck: disease, bad food and almost no air', k01(t, 616.8, .4));
    C.label(ctx, 'Interior of the old Jersey prison ship — 19th-century engraving', 900, 140, 14, { bg: '#fbf8f0' }); C.finish(ctx, t, { vig: .6 }); }
  rBelow.noCover = true; insert(616.7, rBelow, 620.6, 'ship');
  decorate(664.1, (ctx, lt, dur, t) => { if (t > 667 && t < 675.5) { X.cutout(ctx, 'dunmore', 960, 330, 250, 390, t, 667, { rot: .04, how: 'pop', caption: 'the real broadside, 1775', capSize: 14 }); X.note(ctx, 'escape a rebel owner,\njoin the British → FREE', 1110, 600, 1000, 420, k01(t, 668.5, .6), { size: 17, rot: -.04 }); } }, 675.5);
  // ======================= THE SOUTH / YORKTOWN =======================
  decorate(783.2, (ctx, lt, dur, t) => { if (t < 789.9) X.frame(ctx, 'cornwallis', 280, 280, 220, 266, { k: k01(t, 783.8, .5), rot: -.03, plaque: ['Charles, Earl Cornwallis', 'Thomas Gainsborough, 1783'] }); }, 789.9);
  function rRedoubt(ctx, lt, dur, t) { X.living(ctx, 'redoubt10', lt, dur, t, { z0: 1.05, z1: 1.25, fx0: .6, fx1: .45, fy0: .45, fy1: .5, tint: 'rgba(10,20,50,.2)' }); S.date(ctx, 'NIGHT OF OCTOBER 14 · REDOUBTS 9 & 10', 1);
    X.note(ctx, 'stormed with bayonets —\nmuskets unloaded', 1040, 160, null, null, k01(t, 897.6, .5), { size: 17, rot: .04 }); C.label(ctx, 'Storming of Redoubt No. 10 — H. Charles McBarron (U.S. Army)', 900, 690, 14, { bg: '#fbf8f0' }); C.finish(ctx, t, { vig: .5 }); }
  rRedoubt.noCover = true; insert(896.6, rRedoubt, 900.6, 'battle');
  function rYorktown(ctx, lt, dur, t) { X.museum(ctx, 'trumbull_yorktown', lt, dur, t, { maxW: 720, maxH: 380, y: 270, z0: 1.0, z1: 1.2, fx: .5, fy: .55, plaque: ['Surrender of Lord Cornwallis', 'John Trumbull, 1820'] });
    S.date(ctx, 'OCTOBER 19, 1781 · YORKTOWN', 1); X.note(ctx, "Cornwallis isn't in it —\nhe sent his deputy", 1090, 140, 860, 330, k01(t, 911.6, .6), { size: 17, rot: .05, bend: 30 }); S.fact(ctx, 'the British army marches out, flags furled, and lays down its weapons', k01(t, 910.3, .4)); C.finish(ctx, t); }
  rYorktown.noCover = true; insert(910.1, rYorktown, 914.6, 'meadow');
  // ======================= AFTERMATH =======================
  function rTreaty(ctx, lt, dur, t) { X.museum(ctx, 'treaty_west', lt, dur, t, { maxW: 640, maxH: 470, x: 560, y: 320, z0: 1.0, z1: 1.15, fx: .4, fy: .5, plaque: ['American Commissioners of the Treaty of Paris', 'Benjamin West, 1783–84 (unfinished)'] });
    S.date(ctx, 'SEPTEMBER 3, 1783', 1); X.note(ctx, 'unfinished — the British\nside never sat for it', 1070, 280, 860, 300, k01(t, 951.8, .6), { size: 17, rot: .04, bend: -20 });
    if (t > 954.3) C.stamp(ctx, 'INDEPENDENT', 1050, 480, 52, -.08, k01(t, 954.4, .3)); C.finish(ctx, t); }
  rTreaty.noCover = true; insert(950.1, rTreaty, 958.3, 'room', .3, false);
  decorate(1024.9, (ctx, lt, dur, t) => { X.cutout(ctx, 'mount_vernon', 1110, 150, 250, 166, t, 1025.3, { rot: .05, caption: 'Mount Vernon today', capSize: 14 }); }, 1036.2);
  // ======================= CLOSE =======================
  function rRecap2(ctx, lt, dur, t) { C.bg(ctx, 'kraft'); big(ctx, 'IT WON BY NOT DISAPPEARING', 120, 52, '#ffe040');
    const pics = [[240, 1062.5, 'rowed away in the fog', 'retreat_eng'], [640, 1065.5, 'stayed together at Valley Forge', 'trego'], [1040, 1069.5, 'held on for France', 'lami_yorktown']];
    for (const [x, kt, cap, k] of pics) if (t > kt) S.polaroid(ctx, x, 380, 320, 210, (x - 640) / 4000, (cc, w, h) => cover(cc, k, w, h, 1.1), cap, ease.back(k01(t, kt, .4)), 5); C.finish(ctx, t); }
  rRecap2.noCover = true; insert(1060.5, rRecap2, 1075.5, 'room', .3, false);
  function rIdea(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft'); X.frame(ctx, 'declaration', 330, 350, 300, 356, { rot: -.03, plaque: ['The Declaration of Independence', 'engrossed copy, 1776'] });
      ctx.save(); ctx.translate(850, 330); ctx.rotate(.015); ctx.drawImage(C.paper('cream', 640, 420), -320, -210); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.strokeRect(-320, -210, 640, 420); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '34px "Luckiest Guy"'; ctx.fillText('A COUNTRY BUILT ON AN IDEA', 0, -150);
      ctx.font = '700 28px Fredoka'; const L = ['"…all men are created equal…"', '"…deriving their just powers', 'from the consent of the governed…"']; L.forEach((l, i) => { ctx.globalAlpha = k01(t, 1077 + i * 1.6, .5); ctx.fillText(l, 0, -60 + i * 56 + (i ? 16 : 0)); }); ctx.globalAlpha = 1; ctx.restore(); });
    if (t > 1087.2) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); C.headline(ctx, "DIDN'T LIVE UP TO IT — AT FIRST", 850, 600, 40, { rot: -.03, bg: '#fbf8f0' }); if (t > 1090.5) C.label(ctx, 'two and a half centuries of fighting about it — including a civil war', 640, 672, 20, { bg: '#f4c44a' }); }
    C.finish(ctx, t); }
  rIdea.noCover = true; insert(1075.5, rIdea, 1095.2, 'room', .3, false);
  function rFireworks(ctx, lt, dur, t) { X.living(ctx, 'fireworks', lt, dur, t, { z0: 1.0, z1: 1.12, fx0: .5, fx1: .5, fy0: .4, fy1: .45 }); for (let i = 0; i < 9; i++) C.fig(ctx, 80 + i * 140, 760, .62, t + i, Object.assign(PP.modern(i), { pose: i % 3 ? 'up' : 'stand', mood: 'happy', still: true, speak: false, turn: i < 4 ? .45 : -.45 }));
    S.date(ctx, 'NEXT FOURTH OF JULY', 1); C.finish(ctx, t); }
  rFireworks.noCover = true; insert(1095.2, rFireworks, 1100.4, 'night', .4);
  decorate(1110.3, (ctx, lt, dur, t) => { S.polaroid(ctx, 330, 470, 300, 200, -.07, (cc, w, h) => cover(cc, 'leutze', w, h, 1.3, .45, .45), 'more stories like this', ease.back(k01(t, 1110.8, .4)), 2); S.polaroid(ctx, 960, 470, 300, 200, .06, (cc, w, h) => cover(cc, 'trumbull_yorktown', w, h, 1.1), 'every week', ease.back(k01(t, 1111.3, .4)), 4); }, 1113.5);
  // ======================= TRANSITIONS =======================
  const T = [[149, 'whip', 1], [224.5, 'whip', -1], [263.6, 'whip', 1], [346.9, 'whip', -1], [419.2, 'whip', 1], [539.4, 'whip', -1], [726.4, 'whip', 1], [932.1, 'whip', -1], [1050.7, 'whip', 1], [814.5, 'whip', -1], [474.7, 'whip', 1],
    [153.5, 'smash'], [296.7, 'smash'], [344.4, 'smash'], [416.5, 'smash'], [536.4, 'smash'], [687.5, 'smash'], [758.4, 'smash'], [867.9, 'smash'], [928.5, 'smash'], [1058.5, 'smash'], [255.9, 'smash'],
    [193.6, 'ink'], [616.7, 'ink'], [1024.9, 'ink'], [598.1, 'ink'], [193.95, 'flash'], [364.8, 'flash']];
  for (const [t, k, d] of T) X.trans(t, k, d);
  const sfx = T.flatMap(([t, k]) => k === 'whip' ? [{ t: t - .12, type: 'swish', gain: .5 }] : k === 'ink' ? [{ t: t - .2, type: 'swish', gain: .3 }] : k === 'smash' ? [{ t, type: 'slap', gain: .25 }] : []);
  F.chapter({ cut, sfx, moods: [] });
  // the ambience map for these inserts (and for the scenes they hand back to)
  G.SOUNDMAP = G.SOUNDMAP || []; const merged = Object.assign({}, ...G.SOUNDMAP.filter(Boolean)); G.SOUNDMAP[F.chapters.length - 1] = Object.assign(merged, soundmap);
})(window);
