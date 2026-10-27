/* "It's About Salt" remake — BEAT 8 (290–320: salt gets cheap · the goiter belt · iodized salt 1924 · counter 7)
 * + BEAT 9 (321–334: road salt today · the old trick · the close) + an end screen (music only, after the voice ends). */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, K = G.VK, { W, H, clamp, lerp, rng } = T;
  const { sh, ln, circ } = G.Paint, TAU = Math.PI * 2, PI = Math.PI;
  const { C, P, head, SFX, AMB, say } = G, L = G.L, mood = EP.mood;
  G.CW.kid = { outfit: 'hoodie', hat: 'none', look: { skin: '#f2cfae', hair: 'mop', hairCol: '#8a5a2a', width: .9 } };
  G.CW.draftee = { outfit: 'suit', hat: 'none', look: { skin: '#f0c8a8', hairCol: '#5a3a22' } };
  const BELT = [[-97, 49], [-89, 48.5], [-84, 46.5], [-82.5, 45], [-82.4, 42], [-87, 41.6], [-91, 40.6], [-96, 42], [-97.2, 45]];
  const lab = (g, t) => { g.fillStyle = '#dfe8ee'; g.fillRect(-200, -200, 1700, 1100); for (let y = 0; y < 470; y += 40) for (let x = -200 + ((y / 40) % 2) * 30; x < 1500; x += 60) sh(g, '#eef4f6', 1.5, c => c.rect(x, y, 58, 38)); sh(g, '#c8d2d8', 4, c => c.rect(-200, 470, 1700, 30)); g.fillStyle = '#9aaab4'; g.fillRect(-200, 500, 1700, 400);
    sh(g, '#8a6a4a', 3, c => c.rect(120, 250, 380, 18)); for (const [x, h, col] of [[150, 70, '#8a6ad8'], [220, 90, '#e2a24a'], [300, 60, '#6aba8a'], [370, 80, '#d8c070'], [440, 64, '#5a9ad8']]) { sh(g, 'rgba(230,240,245,.9)', 3, c => c.roundRect(x - 26, 250 - h, 52, h, 8)); sh(g, col, 0, c => c.rect(x - 22, 250 - h * .7, 44, h * .7 - 4)); } };
  function thyroid(g, x, y, s, k) { g.save(); g.translate(x, y); g.scale(s, s); for (const sd of [-1, 1]) sh(g, '#d86a6a', 4, c => c.ellipse(sd * 60, 0, 50 * (1 + k * .5), 90 * (1 + k * .4), sd * .2, 0, TAU)); sh(g, '#d86a6a', 4, c => c.rect(-30, -14, 60, 34)); g.restore(); }
  function plow(g, x, y, s, t) { TS.truck(g, x, y, s, t, { spray: 1 }); }
  function pump(g, x, y, s, label, price) { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#c8281e', 4, c => c.roundRect(-70, -260, 140, 260, 14)); sh(g, '#f4f2ea', 3, c => c.rect(-50, -230, 100, 70)); g.font = DR.MK(28); g.fillStyle = '#1e1612'; g.textAlign = 'center'; g.fillText(price, 0, -184); g.font = DR.MK(26); g.fillStyle = '#fff'; g.fillText(label, 0, -110);
    ln(g, [[70, -160], [110, -160], [110, -40]], 8, '#1e1612'); g.restore(); }

  // ===================== BEAT 8 — when salt got cheap =====================
  mood(290, 'warm'); SFX(290, null, 'whoosh', .5);
  C(290, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#e8d8b0'; g.fillRect(-200, -200, 1700, 1100); G.Paint2.grain(g, -200, -200, 1700, 1100, .3, 5, 'multiply', 1.3); },
    act: (g, t) => { const k = clamp((lt - .2) / 3); ln(g, [[100, 420], [100 + 1080 * k, 420]], 12, '#3a2618'); const crowns = [['wudi', .05], ['taxman', .3], ['sepoy', .55], ['sang', .8]]; crowns.forEach(([who, a]) => { if (k > a) P(g, who, 100 + 1080 * a + 60, 400, .32, t, { pose: 'hips', face: { mouth: 'smirk', brows: 'sly' } }); }); },
    ui: c => DR.write(c, 'THOUSANDS OF YEARS OF SQUEEZING', 640, 130, 48, lt, .2, { col: '#c8281e' }) }), 'ink');
  SFX(291, null, 'sting', .4);
  C(291, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 380, 2.0], [610, 380, 2.2]], dof: 5, bg: (g, t) => TS.kitchen(g, t, { shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'shock' }), ui: c => DR.callout(c, 'SOMETHING STRANGE', 980, 160, lt, .2) }));
  mood(292, 'busy'); AMB(292, 'factory', 9, .7);
  C(292, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [700, 440, 1.08]], bg: (g, t) => TS.saltworks(g, t), crowd: DR.army(100, 620, 1200, 720, 14, ['digger', 'navvy'], .4, .5, 401, { walk: true, spr: { turn: .6 } }), atm: { haze: .15 }, ui: c => DR.callout(c, 'INDUSTRY', 640, 130, lt, .2) }), 'whip');
  SFX(292, 9, 'coins', .5);
  C(292, 9, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: g => DR.sunburst(g, t, '#4a8a52', '#9ad08a'), act: (g, t) => { const tilt = -.25 * clamp(lt / .6); g.save(); g.translate(640, 640); sh(g, '#8a6a3a', 4, c => c.rect(-80, 0, 160, 26)); ln(g, [[0, 0], [0, -260]], 12, '#6a4a2a'); g.translate(0, -260); g.rotate(tilt); ln(g, [[-220, 0], [220, 0]], 10, '#6a4a2a');
      for (const [sd, fn] of [[-1, gg => sh(gg, '#e8c45a', 2.5, c => c.ellipse(0, 124, 16, 6, 0, 0, TAU))], [1, gg => TS.saltHeap(gg, 0, 130, 140, 60)]]) { g.save(); g.translate(sd * 210, 0); g.rotate(-tilt); ln(g, [[0, 0], [-60, 130]], 3, '#3a2a1a'); ln(g, [[0, 0], [60, 130]], 3, '#3a2a1a'); sh(g, '#c8a060', 4, c => c.ellipse(0, 132, 80, 18, 0, 0, TAU)); fn(g); g.restore(); } g.restore(); },
    ui: c => DR.banner(c, 'SALT GETS CHEAP', 640, 130, lt, .1, { col: '#2a8a52' }) }), 'flash');
  SFX(293, 6, 'stamp', .7);
  C(293, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => TS.court(g, t), crowd: DR.army(100, 600, 1180, 710, 18, ['mp1', 'mp2', 'duke'], .4, .48, 411, { spr: { pose: 'cheer' } }), ui: c => { DR.write(c, 'BRITAIN · 1825', 640, 130, 60, lt, .2, { col: '#fff', halo: '#1e1612' }); if (lt > R(293, 6)) G.UI.sign(c, 'SALT TAX: SCRAPPED', 640, 260, 52, { k: G.FX.settle(clamp((lt - R(293, 6)) / .25)), fill: '#2a8a52' }); } }), 'whip');
  C(294, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: (g, t) => TS.saltworks(g, t), act: (g, t) => { for (let i = 0; i < 4; i++) { const x = (lt * 120 + i * 300) % 1600 - 160; PR.cart(g, x, 700, 1, 'sacks'); } }, ui: c => DR.callout(c, 'FACTORIES NEEDED TONS', 640, 130, lt, .2) }));
  SFX(295, 3, 'pop', .4);
  C(295, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 380, 1.9], [610, 380, 2.0]], dof: 5, bg: (g, t) => TS.kitchen(g, t, { shaker: false }), act: (g, t) => { EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'happy' }); const sw = Math.sin(t * 3) * .12; g.save(); g.translate(640, 300); g.rotate(sw); ln(g, [[0, 0], [30, 50]], 2, '#3a2a1a'); sh(g, '#f4e6c8', 3, c => c.roundRect(10, 50, 120, 60, 8)); g.font = DR.MK(26); g.fillStyle = '#c8281e'; g.textAlign = 'center'; g.fillText('$0.50', 70, 92); g.restore(); },
    ui: c => { if (lt > R(296)) DR.callout(c, 'NO MORE CONTROL', 980, 160, lt, R(296)); } }));
  mood(297, 'comic'); SFX(298, null, 'ding', .6);
  C(297, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: g => lab(g, t), act: (g, t) => { EP.shaker(g, 640, 474, 1, t, { turn: 1, face: lt > R(298) ? 'shock' : 'smug' }); if (lt > R(298)) { const k = clamp((lt - R(298)) / .6); g.save(); g.translate(640, 260 - (1 - k) * 160); ln(g, [[0, -90], [0, -20]], 8, '#7a8a9a'); sh(g, '#e8f0f8', 3, c => c.roundRect(-12, -20, 24, 50, 6)); g.fillStyle = '#7a4ac8'; g.beginPath(); g.arc(0, 40 + k * 40, 7, 0, TAU); g.fill(); g.restore(); } },
    ui: c => { DR.callout(c, 'A NEW BET', 300, 160, lt, .2); if (lt > R(298)) DR.callout(c, 'PUT SOMETHING IN IT', 980, 160, lt, R(298)); } }), 'whip');
  mood(299, 'curious'); SFX(299, null, 'paper', .5);
  C(299, null, (ctx, lt, dur, t, R) => { const v = M.fly(lt, [[0, -95, 40, 10], [1.4, -89, 44.5, 34]]); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, BELT, '#8a3a8a', .45 * clamp((lt - R(300, 6)) / .5), { hatch: true }); },
    ui: c => { DR.write(c, 'EARLY 1900s', 640, 110, 54, lt, .2, { col: '#c8281e' }); if (lt > R(300, 7)) DR.mapWrite(c, v, -89, 44.6, 'THE GOITER BELT', lt, R(300, 7), { dy: 0, size: 58, col: '#4a1a4a' }); } }); });
  C(300, 8, (ctx, lt, dur, t, R) => { const v = M.view(-87.5, 44.6, 50); DR.shot(ctx, lt, dur, t, { bg: g => { DR.map(g, t, v); M.zone(g, v, BELT, '#8a3a8a', .45, { hatch: true }); }, act: (g, t) => { for (const [lo, la, n] of [[-84.6, 43.6, 'MICHIGAN'], [-89.6, 44.6, 'WISCONSIN'], [-94.4, 46.2, 'MINNESOTA']]) DR.mapPin(g, v, lo, la, lt, .2); },
    ui: c => { for (const [lo, la, n, a] of [[-84.6, 43.6, 'MICHIGAN', .2], [-89.6, 44.6, 'WISCONSIN', .5], [-94.4, 46.2, 'MINNESOTA', .8]]) DR.mapWrite(c, v, lo, la, n, lt, a, { dy: 60, size: 34 }); } }); });
  SFX(301, 5, 'pencil', .5, 1.5);
  C(301, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.3], [640, 440, 1.4]], dof: 3, bg: (g, t) => TS.village(g, t, .3), act: (g, t) => { g.save(); g.translate(640, 640); for (let i = 0; i < 4; i++) { sh(g, ['#8a6a4a', '#7a5a3a', '#6a4a2a', '#5a3a22'][i], 3, c => c.rect(-500, i * 30, 1000, 30)); } g.restore(); },
    ui: c => { DR.callout(c, 'SOIL: LOW IN IODINE', 640, 130, lt, .2, 640, 650); DR.write(c, 'I', 640, 560, 80, lt, .6, { col: '#7a4ac8' }); } }));
  SFX(302, 9, 'boing', .5);
  C(302, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { g.save(); g.globalAlpha = .9; head(g, 'draftee', 640, 240, .8, t, { face: { mouth: 'flat', brows: 'worried' } }); g.restore(); thyroid(g, 640, 520, .9, clamp((lt - R(302, 9)) / 1.2)); },
    ui: c => { DR.write(c, 'THYROID', 300, 520, 50, lt, .3, { col: '#f2d23a', halo: false }); if (lt > R(302, 9)) DR.write(c, '→ GOITER', 980, 520, 56, lt, R(302, 9), { col: '#fff', halo: false }); } }), 'flash');
  mood(303, 'curious'); SFX(303, null, 'drum', .4);
  C(303, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.06]], bg: g => lab(g, t), crowd: DR.army(80, 600, 1100, 710, 16, ['draftee'], .4, .5, 421, { spr: { turn: 0 } }), ui: c => DR.write(c, 'WORLD WAR I DRAFT', 640, 120, 54, lt, .2, { col: '#2a5aa8' }) }), 'whip');
  C(304, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.4], [640, 380, 1.46]], dof: 3, bg: g => lab(g, t), act: (g, t) => { P(g, 'cowie', 400, 760, .85, t, { pose: 'magnify', face: { mouth: 'o', brows: 'up', eyes: 'wide' } }); P(g, 'draftee', 860, 760, .85, t, { turn: -.3, face: { mouth: 'flat', brows: 'worried', sweat: true } }); },
    ui: c => DR.callout(c, 'SO MANY GOITERS', 640, 120, lt, R(304, 5)) }));
  mood(305, 'warm'); SFX(305, null, 'card', .7);
  C(305, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[520, 380, 1.4], [520, 380, 1.46]], dof: 3, bg: g => lab(g, t), act: (g, t) => P(g, 'cowie', 400, 760, .85, t, { pose: 'present', face: { mouth: 'smile', brows: 'up' } }),
    ui: c => DR.statCard(c, { name: 'DR DAVID M. COWIE', cls: 'U. OF MICHIGAN PEDIATRICIAN', who: 'cowie', stats: [['MEDICINE', 5], ['KIDS', 5], ['BIG IDEAS', 5]] }, 940, 360, lt, .1) }));
  SFX(307, 6, 'whoosh', .5);
  C(307, null, (ctx, lt, dur, t, R) => { const v = M.view(8.2, 46.8, 120); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: () => DR.mapPin(ctx, v, 8.2, 46.8, lt, .2), ui: c => { DR.mapWrite(c, v, 8.2, 46.8, 'SWITZERLAND', lt, .3, { dy: 70, size: 50 }); DR.callout(c, 'IDEA BORROWED FROM HERE', 640, 620, lt, .6); } }); }, 'whip');
  SFX(308, 4, 'pop', .5); SFX(308, 6, 'sparkle', .5);
  C(308, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.3], [640, 380, 1.4]], bg: g => lab(g, t), act: (g, t) => { EP.shaker(g, 640, 474, 1, t, { turn: 1, face: 'happy' }); const k = clamp((lt - R(308, 4)) / .8); if (k > 0 && k < 1) { g.fillStyle = '#7a4ac8'; g.beginPath(); g.arc(640, lerp(150, 240, k), 9, 0, TAU); g.fill(); } if (k >= 1) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 360, 200, 'rgba(180,140,255,.35)'); g.restore(); } },
    ui: c => DR.callout(c, '+ A TINY BIT OF IODINE', 980, 160, lt, R(308, 4)) }));
  SFX(309, null, 'crowd', .5, 2); SFX(310, null, 'tada', .7);
  C(309, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.04]], bg: (g, t) => TS.kitchen(g, t, { shaker: false }), crowd: DR.army(80, 600, 1200, 720, 16, ['kid', 'viewer', 'peasant', 'villager'], .44, .54, 431, { spr: { pose: 'present', face: { mouth: 'grin', eyes: 'happy' } } }),
    ui: c => { DR.callout(c, 'EVERYONE ALREADY EATS SALT', 640, 130, lt, .1); if (lt > R(310)) G.UI.sign(c, 'DONE.', 640, 260, 70, { k: G.FX.settle(clamp((lt - R(310)) / .25)), fill: '#2a8a52' }); } }));
  mood(311, 'busy'); SFX(312, 3, 'ding', .6); AMB(311, 'street', 10, .4);
  C(311, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 400, 1.1]], bg: (g, t) => TS.grocery(g, t, { boxes: Math.min(5, Math.floor(lt * 2)) }), ui: c => DR.write(c, 'MAY 1, 1924', 640, 120, 66, lt, .2, { col: '#c8281e', underline: '#c8281e' }) }), 'whip');
  C(312, 3, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 2.6], [640, 420, 2.8]], dof: 4, bg: (g, t) => TS.grocery(g, t, { boxes: 5 }), ui: c => DR.callout(c, 'THE FIRST IODIZED SALT', 640, 140, lt, .1) }));
  C(313, null, (ctx, lt, dur, t, R) => { const v = M.view(-96, 39, 9.5); DR.shot(ctx, lt, dur, t, { bg: g => DR.map(g, t, v), act: (g, t) => { const r = rng(7); for (let i = 0; i < 30; i++) { const lo = -120 + r() * 46, la = 30 + r() * 17; if (lt > .3 + i * .06) { const [x, y] = M.pt(v, lo, la); TS.saltBox(g, x, y, .3); } } },
    ui: c => { DR.write(c, 'BY THAT FALL', 640, 110, 54, lt, .1, { col: '#c8281e' }); if (lt > R(314)) DR.callout(c, 'SOLD NATIONALLY', 640, 640, lt, R(314)); } }); }, 'whip');
  mood(315, 'rising'); SFX(315, 3, 'tada', .5);
  C(315, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: g => DR.sunburst(g, t, '#4a8a52', '#9ad08a'), crowd: DR.army(100, 560, 1180, 720, 26, ['kid'], .4, .52, 441, { spr: { pose: 'cheer', face: { mouth: 'grin', eyes: 'happy' } } }), ui: c => DR.banner(c, 'IT WORKED — SPECTACULARLY', 640, 130, lt, R(315, 3) - .1, { col: '#2a8a52', size: 36 }) }), 'flash');
  SFX(317, null, 'pencil', .5, 2); SFX(318, null, 'pencil', .5, 2);
  C(316, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => DR.blueprint(g), act: (g, t) => { const bars = [[38.6, '1924', R(317)], [1.4, '1951', R(318) + .4]]; bars.forEach(([v, lab, at], i) => { const k = clamp((lt - at) / 1.2); if (k <= 0) return; const h = v / 38.6 * 380 * k, x = 480 + i * 320; g.fillStyle = i ? '#6ae08a' : '#f26a5a'; g.fillRect(x - 80, 600 - Math.max(6, h), 160, Math.max(6, h)); g.strokeStyle = '#fff'; g.lineWidth = 4; g.strokeRect(x - 80, 600 - Math.max(6, h), 160, Math.max(6, h)); }); DR.bpDraw(g, [[340, 600, 940, 600], [340, 600, 340, 180]], clamp(lt / .6), { w: 5, pencil: false }); },
    ui: c => { DR.write(c, 'GOITER · MICHIGAN SCHOOLCHILDREN', 640, 110, 40, lt, .1, { col: '#fff', halo: false }); if (lt > R(317) + 1) DR.write(c, '38.6%', 480, 180, 54, lt, R(317) + 1, { col: '#f26a5a', halo: false }); if (lt > R(318) + 1.4) DR.write(c, '1.4%', 800, 540, 54, lt, R(318) + 1.4, { col: '#6ae08a', halo: false }); for (const [x, s, a] of [[480, '1924', R(317)], [800, '1951', R(318)]]) if (lt > a) DR.write(c, s, x, 650, 36, lt, a, { col: '#fff', halo: false }); } }));
  mood(319, 'comic'); SFX(319, null, 'sting', .4); SFX(320, null, 'sparkle', .6);
  C(319, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.4], [640, 380, 1.5]], bg: (g, t) => TS.grenier(g, t), act: (g, t) => { EP.shaker(g, 640, 600, 1.1, t, { turn: 1, face: 'smug' }); P(g, 'taxman', 1000, 760, .75, t, { turn: -.3, pose: 'hips' }); }, atm: { dark: .3 }, ui: c => DR.callout(c, "A TAX COLLECTOR'S WEAPON", 640, 120, lt, .2) }));
  C(320, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: g => { DR.sunburst(g, t, '#8a6ad8', '#c8b8f0'); sh(g, '#9a948a', 5, c => c.ellipse(640, 620, 240, 50, 0, 0, TAU)); }, act: (g, t) => EP.shaker(g, 640, 620, 1.4, t, { turn: 1, glasses: true, coat: true, face: 'happy' }), ui: c => DR.banner(c, '→ A MEDICINE CABINET', 640, 130, lt, .2, { col: '#2a5aa8' }) }), 'flash');
  EP.count(7, 320, .3);

  // ===================== BEAT 9 — legacy + close =====================
  mood(321, 'warm'); SFX(321, null, 'whoosh', .5); AMB(321, 'wind', 9, .7); SFX(321, null, 'truck', .6, 8);
  C(321, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 1.0], [660, 380, 1.1]], bg: (g, t) => TS.highway(g, t, { drive: .5 }), atm: { snow: 140 }, ui: c => DR.write(c, 'SO WHY DOES SALT MATTER NOW?', 640, 120, 46, lt, .2, { col: '#fff', halo: 'rgba(20,30,60,.8)' }) }), 'ink');
  SFX(322, null, 'salthiss', .7, 2);
  C(322, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[700, 600, 3.0], [700, 590, 3.2]], bg: (g, t) => TS.highway(g, t, { drive: .25 }), atm: { snow: 90 }, ui: c => DR.callout(c, 'LITERALLY ON THE GROUND', 640, 140, lt, .2) }));
  C(323, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.3], [640, 420, 1.36]], dof: 3, bg: g => lab(g, t), act: (g, t) => P(g, 'cowie', 640, 760, .85, t, { outfit: 'eLab', hat: 'specs', pose: 'present', look: { skin: '#d8a27c', hairCol: '#2a1e16' }, face: { mouth: 'smile', brows: 'up' } }), ui: c => DR.callout(c, 'U.S. GEOLOGICAL SURVEY', 640, 120, lt, .2) }), 'whip');
  SFX(324, 7, 'cash', .5);
  C(324, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 400, 1.06]], bg: (g, t) => { g.fillStyle = '#9aa8c4'; g.fillRect(-400, -400, 2200, 1600); TS.highway(g, t, { drive: .9, spray: 0 }); TS.saltHeap(g, 640, 680, 1200, 420); },
    ui: c => DR.tally(c, '40M', g => { g.fillStyle = '#5a5e66'; g.fillRect(-10, -10, 20, 20); }, 640, 120, lt, .2, { n: 14, label: '≈ 40 million tons · 2024' }) }));
  SFX(325, 5, 'swish', .5);
  C(325, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.03]], bg: (g, t) => TS.highway(g, t, { drive: .7 }), act: (g, t) => { const a = clamp((lt - .4) / 1.4) * .41; g.save(); g.translate(640, 400); sh(g, '#f4f2ea', 6, c => c.arc(0, 0, 200, 0, TAU)); sh(g, '#c8281e', 5, c => { c.moveTo(0, 0); c.arc(0, 0, 200, -PI / 2, -PI / 2 + a * TAU); c.closePath(); }); g.restore(); }, atm: { snow: 80 },
    ui: c => { if (lt > 1.6) DR.write(c, '≈ 41%', 640, 400, 90, lt, 1.6, { col: '#fff', halo: '#1e1612' }); DR.callout(c, 'HIGHWAY DEICING', 640, 660, lt, .3); } }));
  SFX(326, null, 'truck', .6, 4);
  C(326, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 380, 1.0], [640, 380, 1.05]], bg: (g, t) => { G.ES.skyFor(g, 'day'); g.fillStyle = '#8ab25e'; g.fillRect(-200, 380, 1700, 400); sh(g, '#3e4048', 3, c => { c.moveTo(-200, 520); c.lineTo(1500, 440); c.lineTo(1500, 540); c.lineTo(-200, 640); c.closePath(); }); for (let i = 0; i < 12; i++) { g.fillStyle = '#e8c23a'; g.fillRect(-160 + i * 150, 578 - i * 9.4, 70, 6); } },
    act: (g, t) => { for (let i = 0; i < 5; i++) { const x = ((lt * 220 + i * 320) % 1700) - 200; sh(g, ['#c8281e', '#2a5aa8', '#e8c23a', '#5a8a4a', '#7a4ac8'][i], 3, c => c.roundRect(x, 560 - x * .055 - 40, 110, 44, 10)); for (const d of [20, 86]) sh(g, '#1e1e22', 2, c => c.arc(x + d, 560 - x * .055 + 6, 12, 0, TAU)); } },
    ui: c => { DR.callout(c, 'THE INTERSTATE HIGHWAY SYSTEM', 640, 130, lt, .1); if (lt > R(327)) DR.callout(c, 'ROAD SALT TOOK OFF', 640, 220, lt, R(327), null, null, { fill: '#fff3c8' }); } }), 'whip');
  SFX(328, 6, 'boing', .4);
  C(328, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 300, 2.1], [640, 300, 2.2]], dof: 7, bg: (g, t) => TS.highway(g, t, { drive: .4 }), act: (g, t) => head(g, 'viewer', 640, 270, 1.0, t, { hat: 'beanie', face: { mouth: 'grit', brows: 'angry', eyes: 'squint' } }), atm: { snow: 120 }, ui: c => DR.callout(c, 'WAIT FOR SPRING? NO.', 980, 160, lt, R(328, 4)) }));
  mood(329, 'curious'); SFX(329, null, 'whoosh', .5);
  C(329, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#e8d8b0'; g.fillRect(-200, -200, 1700, 1100); G.Paint2.grain(g, -200, -200, 1700, 1100, .3, 5, 'multiply', 1.3); },
    act: (g, t) => { for (const [who, x, a] of [['wudi', 300, .1], ['taxman', 640, .4], ['sepoy', 980, .7]]) if (lt > a) P(g, who, x, 560, .55, t, { pose: 'hips', face: { mouth: 'smirk', brows: 'sly' } }); },
    ui: c => DR.write(c, 'THE OLD TRICK: TAX WHAT EVERYONE NEEDS', 640, 640, 40, lt, .2, { col: '#c8281e' }) }), 'ink');
  C(330, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[610, 380, 2.0], [610, 380, 2.1]], dof: 5, bg: (g, t) => TS.kitchen(g, t, { shaker: false }), act: (g, t) => EP.shaker(g, 610, 474, 1, t, { turn: 1, face: 'smug' }), ui: c => DR.callout(c, 'IT NEVER LEFT', 980, 160, lt, .1) }));
  SFX(331, 3, 'card', .6); SFX(331, 5, 'card', .6); SFX(331, 7, 'card', .6); SFX(332, null, 'card', .7);
  C(331, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#2a2a48'; g.fillRect(-200, -200, 1700, 1100); },
    
    ui: c => DR.mystery(c, [{ who: 'wudi', name: 'SALT' }, { who: 'driver', name: 'GAS' }, { who: 'viewer', name: 'SALES TAX' }, { who: 'kid', name: 'ANYTHING YOU NEED' }], 640, 370, lt, .05, [R(331, 3), R(331, 5), R(331, 7), R(332) + .2], { w: 210 }) }));
  // ---------- the close (the recording jumps from "salary…" to "thanks for watching") ----------
  mood(333, 'warm'); SFX(333, 8, 'sparkle', .5);
  C(333, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 420, 1.0], [640, 420, 1.04]], bg: (g, t) => TS.camp(g, t), act: (g, t) => { P(g, 'viewer', 640, 760, .85, t, { pose: 'present', prop: 'coins', face: { mouth: 'grin', eyes: 'happy' } }); }, ui: c => { DR.callout(c, 'YOUR SALARY', 640, 130, lt, .2); if (lt > R(333, 8)) DR.write(c, 'SALARIUM ← SAL (SALT)', 640, 240, 44, lt, R(333, 8), { col: '#fff', halo: '#1e1612' }); } }), 'whip');
  mood(334, 'rising'); SFX(334, null, 'tada', .7);
  C(334, null, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: g => { DR.sunburst(g, t, '#e8a040', '#f8d888'); sh(g, '#9a948a', 5, c => c.ellipse(640, 640, 300, 50, 0, 0, TAU)); }, act: (g, t) => EP.shaker(g, 640, 640, 1.3, t, { turn: 1, face: 'happy' }),
    crowd: [...DR.army(40, 620, 380, 720, 8, ['wudi', 'gandhi', 'miner', 'peasant'], .4, .48, 451, { spr: { pose: 'cheer' } }), ...DR.army(900, 620, 1240, 720, 8, ['legion', 'taxman', 'cowie', 'digger'], .4, .48, 452, { spr: { pose: 'cheer' } })],
    ui: c => { DR.banner(c, 'THANKS FOR WATCHING!', 640, 130, lt, .2, { size: 46 }); } }), 'flash');
  // end screen: music only, ~7 s after the voice ends
  C.at(885.6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#2a2a48'; g.fillRect(-200, -200, 1700, 1100); const r = rng(2); for (let i = 0; i < 60; i++) { g.fillStyle = 'rgba(255,255,255,.05)'; g.beginPath(); g.arc(r() * 1280, r() * 720, 40 + r() * 80, 0, TAU); g.fill(); } },
    act: (g, t) => { EP.shaker(g, 1080, 640, 1.1, t, { turn: 1, face: 'happy' }); for (const [x, y] of [[180, 200], [620, 200]]) { sh(g, '#1e1612', 5, c => c.rect(x, y, 400, 225)); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(x + 8, y + 8, 384, 209); } },
    ui: c => { DR.write(c, 'NEXT: WATCH THIS', 600, 150, 40, lt, .2, { col: '#f2d23a', halo: false }); DR.callout(c, 'SUBSCRIBE', 380, 560, lt, .6, null, null, { fill: '#e0261c', ink: '#fff', size: 40 }); DR.write(c, 'WHAT EVERYDAY OBJECT HAS A DRAMATIC HISTORY?', 640, 670, 30, lt, 1.0, { col: '#fff', halo: false }); } }), 'dissolve');
})(window);
