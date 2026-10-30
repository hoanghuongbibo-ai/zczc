/* The Life of the Mona Lisa — BEAT 1: the cold open (L1–33, 0:00–1:47).
 * Crowd of phones → shuffle past rope / barrier / elbow / selfie stick → the reveal → "smaller than you expected" →
 * size diagram vs. a science-fair poster board → REWIND → 22 Aug 1911, Béroud and the four iron pegs → the question
 * (ticket) → six mystery clues → "she got famous every time somebody took her off a wall" → title → hands #1. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MS = G.MS, ML = G.ML, K2 = G.K2, GX = G.GX, EP = G.EP, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur));
  const MO = G.Soundtrack.MOODS;
  // extra moods for this episode
  MO.heist = { bpm: 92, prog: [[38, 50, 53, 57], [46, 58, 62, 65], [43, 55, 58, 62], [45, 57, 61, 64]], pent: [50, 53, 55, 57, 60, 62, 65, 67, 69], parts: { pizz: .12, bass: .22, pad: .05, fdrum: .07 } };
  MO.jazz = { bpm: 112, prog: [[48, 60, 64, 67], [45, 57, 60, 64], [50, 62, 65, 69], [43, 55, 59, 62]], pent: [60, 62, 64, 67, 69, 72, 74, 76, 79], parts: { honky: .08, bass: .2, pizz: .07, clop: .03 } };
  MO.renaissance = { bpm: 76, prog: [[41, 53, 57, 60], [48, 60, 64, 67], [50, 62, 65, 69], [46, 58, 62, 65]], pent: [60, 62, 65, 67, 69, 72, 74, 77, 79], parts: { harp: .07, cel: .07, pad: .08, bass: .15 } };
  MO.single = { bpm: 50, prog: [[38, 50, 57, 62], [38, 50, 57, 62], [38, 50, 57, 62], [38, 50, 57, 62]], pent: [62], parts: { pad: .1 } };
  const t0 = (n, k) => C.t(n, k);
  // the forest of phones: backs of heads + raised arms with glowing screens (foreground crowd, drawn in act)
  function heads(g, y, n, s, seed, t, o = {}) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = -60 + (i + r() * .5) * (1400 / n), yy = y + r() * 30 * s, hc = ['#2a1e16', '#5a3a22', '#15100c', '#8a5a2a', '#c8a070', '#3a2a2a'][Math.floor(r() * 6)], cc = ['#3a8ae8', '#e8a03a', '#3ab88a', '#c8281e', '#6a6a72', '#e86a9a', '#2a2a30'][Math.floor(r() * 7)];
      const bob = Math.sin(t * 2 + i) * 4 * s; g.fillStyle = cc; g.strokeStyle = '#15100c'; g.lineWidth = 4; g.beginPath(); g.ellipse(x, yy + 120 * s, 110 * s, 80 * s, 0, PI, TAU); g.fill(); g.stroke();
      if (o.phones !== false && r() < (o.p ?? .55)) { const ax = x + (r() - .5) * 60 * s, up = 170 * s + Math.sin(t * 1.3 + i) * 8 * s; g.lineCap = 'round'; for (const [w, c] of [[30 * s + 6, '#15100c'], [30 * s, cc]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x + 40 * s, yy + 60 * s); g.lineTo(ax, yy - up); g.stroke(); }
        g.save(); g.translate(ax, yy - up - 40 * s); g.rotate((r() - .5) * .3); g.fillStyle = '#15161c'; g.fillRect(-26 * s, -44 * s, 52 * s, 88 * s); g.fillStyle = r() < .5 ? '#9ac8e8' : '#e8d8a8'; g.fillRect(-21 * s, -38 * s, 42 * s, 76 * s); g.restore(); }
      g.fillStyle = hc; g.strokeStyle = '#15100c'; g.lineWidth = 4; g.beginPath(); g.ellipse(x, yy + bob, 62 * s, 70 * s, 0, 0, TAU); g.fill(); g.stroke(); } }
  const flashes = (g, t, n = 6, seed = 3) => { const r = rng(seed); for (let i = 0; i < n; i++) { const ph = (t * (1.2 + r()) + r() * 10) % 3; if (ph < .12) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 100 + r() * 1080, 150 + r() * 300, 60, 'rgba(255,255,255,.9)'); g.restore(); } } };

  // ---------------- L1–3 the gallery ----------------
  mood(1, 'curious'); AMB(1, 'crowd', 38, .9); K2.era(0, 'THE LOUVRE', 'TODAY');
  for (let i = 0; i < 18; i++) G.SFXat(.4 + i * 1.9 + (i % 3) * .37, 'camera', .35);   // phone-camera clicks
  C(1, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 370, 1.28]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { heads(g, 560, 9, .95, 2, t); flashes(g, t); }, atm: { warm: .15 },
    ui: c => DR.write(c, 'THE BIGGEST ROOM IN THE LOUVRE', 640, 110, 48, lt, .5) })), 'dissolve');
  C(1, 6, S((lt, R, t) => ({ cam: [[640, 300, 1.15], [640, 290, 1.2]], dof: 5, bg: (g, t) => MS.louvre(g, t), act: (g, t) => { heads(g, 420, 7, 1.2, 9, t, { p: .95 }); heads(g, 650, 6, 1.6, 4, t, { p: .9 }); flashes(g, t, 10, 7); } })), 'whip');
  SFX(2, 1, 'chime', .4);
  C(2, null, S((lt, R, t) => ({ cam: [[640, 380, 1.05], [640, 380, 1.1]], bg: (g, t) => MS.pyramid(g, t), crowd: DR.army(80, 560, 1200, 700, 26, ['tourist1', 'tourist2', 'tourist3', 'tourist4'], .26, .38, 11, { walk: true, spr: { turn: .1 } }), atm: { glare: [1100, 120, 300] },
    ui: c => { DR.write(c, 'TUESDAY MORNING', 640, 120, 60, lt, .2); DR.yearTag(c, 'PARIS', lt, .5); } })), 'whip');
  SFX(2, 8, 'crowd', .6, 2.5);
  C(2, 8, S((lt, R, t) => ({ cam: [[640, 360, 1.3], [640, 360, 1.38]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { const sq = Math.sin(lt * 6) * 6; heads(g, 300, 6, 1.5, 21, t, { p: .4 }); heads(g, 520 + sq, 5, 2.0, 22, t, { p: .3 }); }, ui: c => DR.callout(c, 'NOT ALONE.', 640, 140, lt, .2) })), 'whip');
  SFX(3, 4, 'coins', .4, null); SFX(3, 6, 'cash', .5);
  C(3, 3, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3440', '#3a4656'), act: (g, t) => { const k = clamp((lt - .1) / 2.2), n = Math.round(ease.out(k) * 20000);
      for (let i = 0; i < 40; i++) { const u = ((lt * .8 + i / 40) % 1), x = lerp(-80, 1360, u), y = 560 + (i % 4) * 30; P(g, ['tourist1', 'tourist2', 'tourist3', 'tourist4'][i % 4], x, y, .16, t + i, { walk: t * 8, turn: .8 }); }
      g.save(); g.translate(640, 300); g.font = MK(150); g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 22; g.strokeStyle = '#15100c'; g.strokeText(n.toLocaleString(), 0, 0); g.fillStyle = '#fff'; g.fillText(n.toLocaleString(), 0, 0); g.restore(); },
    ui: c => DR.write(c, 'VISITORS · A DAY', 640, 430, 52, lt, .4, { col: '#f2d23a' }) })), 'flash');
  SFX(3, 12, 'ding', .6);
  C(3, 12, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 360, 1.12]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => heads(g, 560, 9, .95, 31, t), ui: c => DR.callout(c, 'ONE THING', 640, 140, lt, .1, 640, 330) })), 'zoom');

  // ---------------- L4–8 the shuffle ----------------
  SFX(4, 0, 'footsteps', .7, 7); mood(4, 'adventure');
  C(4, null, S((lt, R, t) => ({ cam: [[640, 380 + Math.sin(lt * 9) * 5, 1.15], [640, 380, 1.24]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { heads(g, 470, 8, 1.3, 41, t, { p: .5 }); heads(g, 640 + Math.abs(Math.sin(lt * 5)) * 10, 5, 1.9, 42, t, { p: .2 }); },
    ui: c => DR.write(c, 'SHUFFLE…', 640, 120, 54, lt, .2) })));
  SFX(5, 1, 'swish', .5);
  C(5, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 380, 1.16]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { heads(g, 520, 8, 1.1, 51, t); const x = lerp(1500, -300, ease.inOut(clamp(lt / 1.2)));
      for (const sx of [x, x + 700]) { ln(g, [[sx, 720], [sx, 420]], 26, '#c8a24a'); g.fillStyle = '#c8a24a'; g.beginPath(); g.arc(sx, 410, 24, 0, TAU); g.fill(); } g.strokeStyle = '#a8202a'; g.lineWidth = 30; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, 430); g.quadraticCurveTo(x + 350, 560, x + 700, 430); g.stroke(); },
    ui: c => DR.write(c, 'PAST THE ROPE', 640, 120, 54, lt, .1) })), 'whipL');
  SFX(6, 1, 'swish', .5); SFX(6, 3, 'creak', .4);
  C(6, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [700, 410, 1.28]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { const x = lerp(900, -500, ease.inOut(clamp(lt / 1.5))); g.lineCap = 'round'; for (const [w, c] of [[90, '#15100c'], [76, '#a8784a']]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - 400, 700); g.quadraticCurveTo(x + 300, 560, x + 1100, 680); g.stroke(); } },
    ui: c => DR.write(c, 'PAST THE BARRIER', 640, 120, 54, lt, .1) })), 'whipL');
  SFX(7, 3, 'impact', .6); SFX(7, 3, 'gasp', .4); SFX(7, 6, 'whoosh', .6); SFX(7, 7, 'boing', .5);
  C(7, null, S((lt, R, t) => ({ cam: [[640, 380, 1.2], [640, 380, 1.24]], shake: lt > R(7, 3) && lt < R(7, 3) + .4 ? .8 : 0, bg: (g, t) => MS.louvre(g, t),
    act: (g, t) => { heads(g, 520, 7, 1.2, 61, t); const e = clamp((lt - R(7, 3) + .25) / .25) * (1 - clamp((lt - R(7, 3) - .6) / .3)); g.save(); g.translate(lerp(-200, 260, e), 470); g.rotate(-.4); g.fillStyle = '#3a8ae8'; g.strokeStyle = '#15100c'; g.lineWidth = 6; g.beginPath(); g.roundRect(-300, -60, 300, 120, 50); g.fill(); g.stroke(); g.beginPath(); g.arc(0, 0, 70, 0, TAU); g.fill(); g.stroke(); g.restore(); GX.impact(g, 320, 470, clamp((lt - R(7, 3)) / .35), .8);
      const sk = clamp((lt - R(7, 6) + .3) / .5); if (sk > 0) { g.save(); g.translate(lerp(1500, 860, ease.out(sk)), lerp(80, 320, ease.out(sk))); g.rotate(-.9 + sk * .3); ln(g, [[0, 0], [380, 0]], 14, '#9aa4b0'); g.fillStyle = '#15161c'; g.fillRect(-40, -60, 60, 110); g.fillStyle = '#9ac8e8'; g.fillRect(-34, -52, 48, 94); g.restore(); GX.impact(g, 860, 320, clamp((lt - R(7, 7)) / .35), .7); } },
    ui: c => { DR.write(c, "A STRANGER'S ELBOW", 400, 120, 46, lt, R(7, 2)); if (lt > R(7, 6)) DR.write(c, '…AND A SELFIE STICK', 860, 600, 46, lt, R(7, 6), { col: '#f2d23a' }); } })), 'whip');
  mood(8, 'tender'); SFX(8, 2, 'sparkle', .6); SFX(8, 3, 'chime', .5); AMB(8, 'crowd', 4, .4);
  C(8, null, S((lt, R, t) => ({ cam: [[640, 380, 1.15], [640, 360, 1.7], 'inOut'], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { const part = ease.inOut(clamp((lt - .2) / 1.4)); g.save(); g.translate(-part * 520, 0); heads(g, 560, 4, 1.4, 81, t, { p: .3 }); g.restore(); g.save(); g.translate(part * 520 + 700, 0); heads(g, 560, 4, 1.4, 82, t, { p: .3 }); g.restore();
      if (lt > 1.2) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 360, 180, `rgba(255,240,200,${.35 * clamp((lt - 1.2) / .6)})`); g.restore(); } },
    ui: c => { if (lt > 1) DR.write(c, 'THERE SHE IS.', 640, 600, 64, lt, 1); } })), 'dissolve');
  SFX(8, 8, 'clink', .7); SFX(8, 8, 'clink', .5, null, .22);
  C(8, 7, S((lt, R, t) => ({ cam: [[640, 360, 2.3], [640, 360, 2.4]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { const kk = (lt * 2.8) % 1; GX.hand(g, 735 + (kk < .3 ? 8 : 0), 300, .26, -PI * .82, { kind: 'fist', sleeve: '#3a4a6a' }); },
    ui: c => DR.callout(c, 'ARMORED GLASS', 1000, 150, lt, .15, 740, 300, { screen: true }) })), 'zoom');

  // ---------------- L9–12 smaller than you expected ----------------
  mood(9, 'comic'); SFX(9, 3, 'boing', .5);
  C(9, null, S((lt, R, t) => ({ cam: [[640, 360, 1.7], [640, 360, .95], 'out'], bg: (g, t) => MS.louvre(g, t), act: (g, t) => heads(g, 600, 9, .8, 91, t, { p: .8 }), ui: c => DR.write(c, 'SMALLER THAN YOU EXPECTED', 640, 120, 54, lt, .4) })), 'zoom');
  SFX(10, 0, 'pop', .6); SFX(10, 1, 'pop', .6); SFX(10, 2, 'pop', .6);
  C(10, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8b860', '#f6d898'), act: (g, t) => { [['tourist1', 260], ['tourist3', 640], ['tourist2', 1020]].forEach(([w, x], i) => { const k = GX.pop(lt, i * .35, .25); if (k <= 0) return; g.save(); g.translate(x, 0); g.scale(k, k); g.translate(-x, 0); head(g, w, x, 330, .9, t, { face: { mouth: 'o', eyes: 'wide', brows: 'up' } }); g.restore(); }); },
    ui: c => { GX.bubble(c, 'SO SMALL!', 260, 120, lt, 0, 260, 220, { size: 32 }); GX.bubble(c, 'TINY!', 640, 110, lt, .35, 640, 220, { size: 32 }); GX.bubble(c, "…THAT'S IT?", 1020, 120, lt, .7, 1020, 220, { size: 32 }); } })), 'whip');
  SFX(11, 3, 'pencil', .6, 1.2); SFX(11, 7, 'pencil', .6, 1.2); SFX(11, 13, 'pop', .5);
  C(11, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { ML.mona(g, 430, 380, 420, { frame: false }); const h = 420, w = h * ML.W / ML.H, k1 = clamp((lt - R(11, 3) + .2) / .8), k2 = clamp((lt - R(11, 7) + .2) / .8);
      DR.bpDraw(g, [[430 + w / 2 + 40, 380 - h / 2, 430 + w / 2 + 40, 380 + h / 2]], k1, { w: 6 }); DR.bpDraw(g, [[430 - w / 2, 380 + h / 2 + 40, 430 + w / 2, 380 + h / 2 + 40]], k2, { w: 6 });
      const pk = clamp((lt - R(11, 12)) / .4); if (pk > 0) { g.save(); g.translate(950, 380); g.scale(pk, pk); sh(g, '#f4f0e8', 5, c => c.rect(-w / 2, -h / 2, w, h)); g.font = MK(30); g.fillStyle = '#c8281e'; g.textAlign = 'center'; g.fillText('MY VOLCANO', 0, -h / 2 + 50); sh(g, '#8a5a3a', 4, c => { c.moveTo(-90, 120); c.lineTo(-20, -40); c.lineTo(20, -40); c.lineTo(90, 120); c.closePath(); }); sh(g, '#e8501e', 3, c => c.ellipse(0, -50, 30, 24, 0, 0, TAU)); g.font = MK(24); g.fillStyle = '#15100c'; g.fillText('GRADE 7 · A+', 0, 170); g.restore(); } },
    ui: c => { if (lt > R(11, 3)) DR.write(c, '30 in · 77 cm', 830, 160, 40, lt, R(11, 3), { col: '#f2d23a' }); if (lt > R(11, 7)) DR.write(c, '21 in · 53 cm', 430, 650, 40, lt, R(11, 7), { col: '#f2d23a' }); if (lt > R(11, 13)) DR.write(c, 'SAME SIZE!', 960, 650, 46, lt, R(11, 14)); } })), 'flash');
  mood(12, 'single'); SFX(12, 8, 'whoosh', .7); SFX(12, 9, 'zap', .4);
  C(12, null, S((lt, R, t) => { const rw = clamp((lt - R(12, 8) + .2) / 1.4), tt = rw > 0 ? t - rw * rw * 40 : t; return { cam: [[640, 380, 1.0], [640, 380, 1.0]], bg: (g) => MS.louvre(g, tt), act: (g) => { g.save(); if (rw > 0) g.translate(Math.sin(lt * 70) * 14 * rw, 0); heads(g, 560, 9, .95, 2, tt); g.restore(); },
    atm: { dark: lt < R(12, 8) ? clamp(lt / .8) * .3 : .3 }, ui: c => { if (lt < R(12, 8)) DR.write(c, 'HOLD ON TO THAT FEELING…', 640, 120, 50, lt, .2); if (rw > 0) { DR.write(c, '◀◀ REWIND', 640, 360, 90, lt, R(12, 8), { col: '#fff' }); c.save(); c.globalAlpha = .25; c.fillStyle = '#fff'; for (let y = 0; y < 720; y += 6) c.fillRect(0, y + (lt * 600 % 6), 1280, 2); c.restore(); } } }; }));

  // ---------------- L13–25 22 August 1911 ----------------
  mood(13, 'quiet'); K2.era(t0(13, 0), 'PARIS', '1911'); SFX(13, 0, 'card', .5); SFX(13, 3, 'gong', .4);
  C(13, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#2a2420'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const y = Math.round(lerp(2026, 1911, ease.out(clamp(lt / 1.6)))); g.save(); g.translate(640, 330); sh(g, '#f4ead4', 6, c => c.roundRect(-230, -200, 460, 400, 20)); sh(g, '#c8281e', 0, c => c.roundRect(-230, -200, 460, 90, 20)); g.font = MK(56); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(lt < 1.6 ? 'AUGUST' : 'AUGUST', 0, -155);
      g.font = MK(170); g.fillStyle = '#15100c'; g.fillText(lt < 1.6 ? String(Math.round(lerp(28, 22, clamp(lt / 1.6)))) : '22', 0, 10); g.font = MK(60); g.fillStyle = '#c8281e'; g.fillText(String(y), 0, 150); g.restore(); },
    ui: c => DR.write(c, 'TUESDAY', 640, 640, 54, lt, .9) })), 'dip');
  C(14, null, S((lt, R, t) => ({ cam: [[640, 380, 1.12], [640, 380, 1.0]], bg: (g, t) => MS.street(g, t), act: (g, t) => { g.save(); g.filter = 'none'; g.restore(); }, atm: { warm: .25 },
    ui: c => { DR.write(c, 'SAME PALACE…', 420, 120, 56, lt, .1); DR.write(c, 'DIFFERENT ROOM', 860, 200, 56, lt, R(14, 2), { col: '#f2d23a' }); } })), 'whip');
  SFX(15, 4, 'footsteps', .5, 3); SFX(15, 6, 'creak', .4); AMB(15, 'court', 14, .4);
  C(15, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.05]], bg: (g, t) => MS.salon(g, t, { sepia: 0 }), act: (g, t) => { const k = clamp(lt / 3), x = lerp(-80, 420, k); P(g, 'beroud', x, 690, .55, t, { walk: k < 1 ? t * 7 : 0, turn: k < 1 ? .8 : .3, face: { mouth: 'smile' } });
      g.save(); g.translate(x + 70, 560); g.rotate(-.2); ln(g, [[-40, 120], [0, -140]], 9, '#6a4a2a'); ln(g, [[40, 120], [0, -140]], 9, '#6a4a2a'); sh(g, '#f4f0e8', 3, c => c.rect(-50, -110, 100, 70)); g.restore(); },
    ui: c => { DR.write(c, 'LOUIS BÉROUD', 640, 640, 60, lt, .4); DR.yearTag(c, '1911', lt, .1); } })), 'dissolve');
  SFX(15, 13, 'pencil', .5, 1.4);
  C(15, 11, S((lt, R, t) => ({ cam: [[520, 360, 1.5], [520, 350, 1.6]], dof: 3, bg: (g, t) => MS.salon(g, t, { sepia: 0 }), act: (g, t) => { P(g, 'beroud', 400, 760, .7, t, { pose: 'presentL', turn: .6, face: { mouth: 'smile', eyes: 'happy' } }); ln(g, [[560, 760], [600, 380]], 12, '#6a4a2a'); sh(g, '#f4f0e8', 4, c => c.rect(520, 380, 180, 140)); },
    ui: c => DR.callout(c, 'A DAY OF COPYING', 900, 160, lt, .3) })), 'whip');
  SFX(16, 1, 'sting', .4); mood(16, 'single');
  C(16, null, S((lt, R, t) => ({ cam: [[640, 300, 2.3], [640, 290, 2.45]], dof: 7, bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => head(g, 'beroud', 640, 280, 1, t, { face: { mouth: lt > .6 ? 'o' : 'flat', eyes: lt > .6 ? 'wide' : 'open', look: [0, -.8], brows: lt > .6 ? 'up' : 'neutral' } }) })), 'whip');
  for (let i = 0; i < 4; i++) G.SFXat(C.t(17, 0) + .2 + i * .32, 'tick', .7);
  C(17, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.1]], bg: (g, t) => MS.salon(g, t, { missing: true }),
    ui: c => { const w = 210 * ML.W / ML.H; [[-.3, -.42], [.3, -.42], [-.3, .45], [.3, .45]].forEach(([dx, dy], i) => { if (lt > .2 + i * .32) { const [x, y] = DR.toScreen(640 + dx * w, 300 + dy * 210); DR.circle(c, x, y, 40, 40, lt, .2 + i * .32, { col: '#c8281e' }); } }); DR.write(c, 'FOUR IRON PEGS', 640, 650, 60, lt, 1.1); } })), 'zoom');
  SFX(18, 2, 'marker', .5);
  C(18, null, S((lt, R, t) => ({ cam: [[640, 300, 1.7], [640, 300, 1.75]], bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { const w = 210 * ML.W / ML.H + 36, h = 246, k = clamp((lt - .3) / 1.2); g.setLineDash([16, 12]); g.strokeStyle = '#c8281e'; g.lineWidth = 6; g.beginPath(); const L = 2 * (w + h) * k; let x = 640 - w / 2, y = 300 - h / 2; g.moveTo(x, y);
      const segs = [[w, 0], [0, h], [-w, 0], [0, -h]]; let rem = L; for (const [dx, dy] of segs) { const len = Math.abs(dx + dy), f = Math.min(1, rem / len); x += dx * f; y += dy * f; g.lineTo(x, y); rem -= len; if (rem <= 0) break; } g.stroke(); g.setLineDash([]); },
    ui: c => DR.callout(c, 'SLIGHTLY CLEANER WALL', 1000, 560, lt, 1.2, 760, 400, { screen: true }) })), 'whip');
  SFX(19, 0, 'whoosh', .3); SFX(19, 1, 'buzz', .25, 1.5);
  C(19, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.0]], bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { P(g, 'beroud', 360, 700, .45, t, { pose: 'shrug', turn: .4, face: { mouth: 'flat', eyes: 'half' } }); const x = lerp(1400, -100, clamp(lt / 1.6)); g.save(); g.translate(x, 670); g.rotate(-lt * 8); g.strokeStyle = '#8a7a5a'; g.lineWidth = 4; for (let i = 0; i < 9; i++) { g.beginPath(); g.arc(0, 0, 14 + i * 3, i, i + 2); g.stroke(); } g.restore(); },
    ui: c => DR.write(c, 'NOTHING ELSE.', 640, 120, 60, lt, .2) })), 'whip');
  mood(20, 'comic'); SFX(20, 3, 'boing', .3);
  C(20, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 400, 1.26]], bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { P(g, 'gardien', 470, 740, .62, t, { pose: 'crossed', turn: .3, face: { mouth: 'smile', eyes: 'half' } }); P(g, 'gardien', 810, 740, .62, t, { pose: 'hips', turn: -.3, face: { mouth: 'smile', eyes: 'happy' } }); },
    ui: c => DR.write(c, "THE GUARDS AREN'T WORRIED", 640, 120, 50, lt, .2) })), 'whip');
  SFX(21, 4, 'pop', .6); SFX(21, 4, 'zap', .5);
  C(21, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: g => { g.fillStyle = '#3a3030'; g.fillRect(-300, -300, 1900, 1400); g.fillStyle = '#5a4a40'; g.fillRect(-300, 560, 1900, 400); sh(g, '#e8e0d0', 4, c => c.rect(60, 120, 520, 440)); },
    act: (g, t) => { ML.mona(g, 320, 340, 260, { frame: 'gold' }); ln(g, [[900, 560], [860, 330]], 10, '#3a2a1a'); ln(g, [[1000, 560], [960, 330]], 10, '#3a2a1a'); sh(g, '#2a2420', 4, c => c.rect(830, 250, 200, 140)); sh(g, '#15100c', 3, c => c.arc(840, 320, 40, 0, TAU)); P(g, 'paris1911a', 1070, 740, .55, t, { pose: 'present', turn: -.5, face: { mouth: 'grin' } });
      const f = (lt - R(21, 4)); if (f > 0 && f < .5) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 840, 300, 600 * (1 - f * 2), 'rgba(255,255,240,.95)'); g.restore(); } GX.poof(g, 900, 230, clamp(f / .9), .7); },
    ui: c => DR.write(c, 'WITH THE PHOTOGRAPHERS?', 640, 110, 50, lt, .1) })), 'whip');
  C(22, null, S((lt, R, t) => ({ cam: [[640, 330, 2.0], [640, 330, 2.08]], dof: 6, bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => head(g, 'gardien', 640, 300, 1, t, { pose: 'thumbsUp', face: { mouth: 'smile', eyes: 'half' } }), ui: c => DR.write(c, 'THAT HAPPENS.', 640, 640, 60, lt, .1) })), 'whip');
  SFX(23, 2, 'creak', .4); SFX(24, 0, 'tick', .5); for (let i = 0; i < 10; i++) G.SFXat(C.t(24, 0) + .3 + i * .22, 'tick', .4);
  const clock = (g, x, y, r, a) => { sh(g, '#f4f0e8', 5, c => c.arc(x, y, r, 0, TAU)); for (let i = 0; i < 12; i++) ln(g, [[x + Math.cos(i / 12 * TAU) * r * .82, y + Math.sin(i / 12 * TAU) * r * .82], [x + Math.cos(i / 12 * TAU) * r * .92, y + Math.sin(i / 12 * TAU) * r * .92]], 3); ln(g, [[x, y], [x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .7]], 6); ln(g, [[x, y], [x + Math.cos(a / 12) * r * .45, y + Math.sin(a / 12) * r * .45]], 8); };
  C(23, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { sh(g, '#6a4a2a', 4, c => c.rect(380, 600, 520, 30)); P(g, 'beroud@sit', 640, 610, .55, t, { pose: 'crossed', turn: .1, face: { mouth: 'flat', eyes: 'half' } }); clock(g, 640, 160, 60, -PI / 2 + lt * .3); },
    ui: c => DR.write(c, 'SO BÉROUD WAITS.', 640, 660, 50, lt, .1) })), 'whip');
  C(24, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.24]], bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { sh(g, '#6a4a2a', 4, c => c.rect(380, 600, 520, 30)); P(g, 'beroud@sit', 640, 610, .55, t, { pose: 'idle', turn: .1, headTilt: .3, face: { mouth: 'o', eyes: 'closed' } }); clock(g, 640, 160, 60, -PI / 2 + lt * 18);
      const cw = clamp(lt / 2.4); g.strokeStyle = `rgba(255,255,255,${cw * .8})`; g.lineWidth = 2; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(380, 600); g.lineTo(380 + Math.cos(-i / 6 * PI / 2) * 120 * cw, 600 - Math.sin(i / 6 * PI / 2) * 120 * cw); g.stroke(); } g.font = MK(40); g.fillStyle = '#fff'; g.fillText('z', 700 + Math.sin(lt * 3) * 10, 380 - (lt * 40 % 80)); },
    ui: c => DR.write(c, '…AND WAITS.', 640, 660, 50, lt, .1) })), 'dissolve');
  mood(25, 'heist'); SFX(25, 3, 'gasp', .6); SFX(25, 4, 'sting', .6);
  C(25, null, S((lt, R, t) => ({ cam: [[640, 380, 1.3], [640, 380, 1.0], 'out'], shake: lt > R(25, 3) ? .3 : 0, bg: (g, t) => MS.salon(g, t, { missing: true }), act: (g, t) => { const sc = lt > R(25, 3); P(g, 'gardien', 480, 740, .62, t, { pose: sc ? 'facepalm' : 'idle', turn: .3, face: { mouth: sc ? 'shock' : 'flat', eyes: sc ? 'wide' : 'open', sweat: sc } }); P(g, 'gardien', 800, 740, .62, t, { pose: sc ? 'shrug' : 'idle', turn: -.3, face: { mouth: sc ? 'shock' : 'flat', eyes: sc ? 'wide' : 'open', sweat: sc } }); P(g, 'beroud', 1060, 740, .55, t, { pose: 'pointUp', turn: -.6, face: { mouth: 'open', brows: 'angry' } }); } })), 'whip');
  SFX(25, 9, 'drum', .6);
  C(25, 9, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), ui: c => GX.hangSign(c, 'GONE FOR', '?', '26 HRS', lt, 0, .5, { y: 340, col: '#c8281e' }) })), 'flash');

  // ---------------- L26–31 the question, the clues, the thesis ----------------
  mood(26, 'single'); SFX(26, 3, 'bell', .4);
  EP.ticket('HOW DID SHE GET FAMOUS?', t0(27, 0), t0(32, 0), 9e9, true);
  C(26, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#15161c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const k = GX.pop(lt, .2, .4); g.save(); g.translate(640, 360); g.scale(k, k); g.rotate(Math.sin(t * 2) * .05); g.font = MK(360); g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 30; g.strokeStyle = '#15100c'; g.strokeText('?', 0, 0); g.fillStyle = '#f2d23a'; g.fillText('?', 0, 0); g.restore(); } })), 'dip');
  SFX(27, 2, 'pop', .5); SFX(27, 3, 'stamp', .6); SFX(27, 8, 'pop', .5); SFX(27, 14, 'tada', .6);
  C(27, null, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 360, 1.05]], bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { const gk = clamp((lt - R(27, 12) + .3) / 1), s = lerp(160, 260, ease.out(gk));
      if (gk > 0) { g.save(); g.translate(640, 470); g.rotate(t * .4); g.fillStyle = '#4a8ac8'; g.strokeStyle = '#15100c'; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, 200 * gk, 0, TAU); g.fill(); g.stroke(); g.fillStyle = '#6aaa5a'; for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(Math.cos(i * 1.3) * 110 * gk, Math.sin(i * 2.1) * 110 * gk, 50 * gk, 30 * gk, i, 0, TAU); g.fill(); } g.restore(); }
      ML.mona(g, 640, lerp(360, 250, ease.out(gk)), s, {}); },
    ui: c => { if (lt > R(27, 2)) DR.callout(c, 'SMALL', 300, 200, lt, R(27, 2), 560, 280, { screen: true }); if (lt > R(27, 3)) DR.sign(c, 'UNFINISHED', 980, 200, lt, R(27, 3), { size: 40 }); if (lt > R(27, 7)) DR.callout(c, "A SILK MERCHANT'S WIFE", 340, 560, lt, R(27, 7)); if (lt > R(27, 13)) DR.write(c, 'MOST FAMOUS PAINTING ON THE PLANET', 640, 660, 44, lt, R(27, 13), { col: '#f2d23a' }); } })), 'whip');
  // six clues: cards flip on their words
  const CLUE = [["A KING'S BATH", 4, 'bath'], ["AN EMPEROR'S BEDROOM", 8, 'bed'], ['A WOODEN TRUNK', 12, 'trunk'], ['A CONVOY', 19, 'truck'], ['AN OCEAN LINER', 25, 'ship'], ['PUMPKIN SOUP', 30, 'soup']];
  CLUE.forEach(([, k]) => SFX(28, k, 'card', .6));
  const icon = (g, kind, t) => { g.save(); g.lineJoin = 'round';
    if (kind === 'bath') { sh(g, '#f4f0e8', 5, c => c.roundRect(-70, -10, 140, 50, 20)); for (let i = 0; i < 3; i++) { g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 6; g.beginPath(); g.moveTo(-30 + i * 30, -20); g.quadraticCurveTo(-40 + i * 30, -50, -30 + i * 30, -70); g.stroke(); } }
    else if (kind === 'bed') { sh(g, '#8a2a2e', 5, c => c.rect(-80, -10, 160, 50)); sh(g, '#f4f0e8', 4, c => c.roundRect(-74, -26, 60, 26, 10)); ln(g, [[-80, 40], [-80, -70]], 10, '#6a4a2a'); }
    else if (kind === 'trunk') G.MS.trunk(g, 0, 40, .45, 0);
    else if (kind === 'truck') { sh(g, '#4a5a3a', 5, c => c.rect(-80, -40, 110, 70)); sh(g, '#3a4a2a', 5, c => c.rect(30, -20, 50, 50)); for (const x of [-50, 50]) sh(g, '#15100c', 3, c => c.arc(x, 34, 18, 0, TAU)); }
    else if (kind === 'ship') { sh(g, '#15161c', 5, c => { c.moveTo(-90, 0); c.lineTo(90, 0); c.lineTo(70, 30); c.lineTo(-70, 30); c.closePath(); }); sh(g, '#f4f0e8', 3, c => c.rect(-50, -24, 90, 24)); for (const x of [-20, 20]) sh(g, '#c8281e', 3, c => c.rect(x - 8, -50, 16, 28)); }
    else { sh(g, '#c8a070', 5, c => c.rect(-40, -60, 80, 100)); sh(g, '#e8862a', 3, c => c.rect(-40, -30, 80, 40)); g.font = MK(20); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText('SOUP', 0, -4); } g.restore(); };
  C(28, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { CLUE.forEach(([lab, k, ic], i) => { const x = 140 + i * 200, y = 360, r = R(28, k), fl = clamp((lt - r + .2) / .35), sx = Math.abs(Math.cos(fl * PI)), front = fl > .5;
      g.save(); g.translate(x, y + Math.sin(t * 2 + i) * 4); g.scale(Math.max(.05, sx), 1); g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(-82, -112, 172, 240); g.fillStyle = front ? '#f4ead4' : '#3a3650'; g.fillRect(-90, -120, 172, 240); g.lineWidth = 6; g.strokeStyle = '#d8b04a'; g.strokeRect(-86, -116, 164, 232);
      if (front) { icon(g, ic, t); g.font = MK(lab.length > 14 ? 18 : 22); g.fillStyle = '#15100c'; g.textAlign = 'center'; g.fillText(lab, -4, 96); } else { g.font = MK(80); g.fillStyle = 'rgba(255,255,255,.4)'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('?', -4, 0); } g.restore(); }); },
    ui: c => DR.write(c, 'THE ANSWER INVOLVES…', 640, 110, 50, lt, .1) })), 'whip');
  mood(29, 'curious'); SFX(29, 4, 'whoosh', .4);
  C(29, null, S((lt, R, t) => ({ cam: [[640, 300, 1.6], [640, 300, 1.7]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => GX.hand(g, 820, 330, .45, -PI * .75, { kind: 'point' }), ui: c => GX.bubble(c, 'PSST…', 950, 160, lt, .3, 850, 260, { size: 40 }) })), 'whip');
  SFX(30, 7, 'stamp', .8);
  C(30, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 380, 1.14]], bg: (g, t) => MS.salon(g, t, {}), ui: c => { DR.write(c, 'FAMOUS BY HANGING ON A WALL?', 640, 110, 48, lt, .1); if (lt > R(30, 7)) DR.sign(c, 'NOPE', 640, 340, lt, R(30, 7), { size: 90, rot: -.1 }); } })), 'whip');
  // L31: hands snatch her off the wall — Renaissance sleeve, royal sleeve, white smock, war-time trench coat
  SFX(31, 4, 'whoosh', .6); SFX(31, 6, 'whoosh', .6); SFX(31, 8, 'whoosh', .6); SFX(31, 9, 'whoosh', .6);
  C(31, 3, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 360, 1.08]], bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { const sl = ['#7a4a5a', '#2a3a8a', '#f6f4ee', '#6a6040'], n = Math.min(3, Math.floor(lt / .55)), u = (lt % .55) / .55;
      const ang = [-.2, PI + .3, -PI / 2 - .2, PI / 2 + .4][n], dx = Math.cos(ang), dy = Math.sin(ang), d = 700 * ease.inOut(Math.max(0, u - .35) / .65);
      g.save(); g.translate(dx * d, dy * d); ML.mona(g, 640, 360, 300, {}); GX.hand(g, 640 + dx * 210, 360 + dy * 210, .55, ang, { kind: 'fist', sleeve: sl[n] }); g.restore(); GX.speed(g, 640, 360, dx > 0 ? 1 : -1, 6, 260 * clamp(u * 2)); },
    ui: c => DR.write(c, 'EVERY TIME SOMEBODY TOOK HER OFF ONE', 640, 650, 44, lt, .1) })), 'whip');
  SFX(31, 10, 'gong', .6); SFX(31, 10, 'tada', .5);
  C(31, { off: 3.3 }, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), act: (g, t) => { const k = GX.pop(lt, .1, .4); g.save(); g.translate(640, 300); g.scale(k, k); g.rotate(-.04); ML.mona(g, 0, 0, 260, {}); g.restore(); },
    ui: c => { DR.banner(c, 'THE LIFE OF THE MONA LISA', 640, 560, lt, .3, { size: 54 }); } })), 'flash');

  // ---------------- L32–33 the first hands ----------------
  mood(32, 'renaissance'); K2.hands(t0(32, 9), 1, 'LEONARDO');
  C(32, 6, S((lt, R, t) => ({ cam: [[760, 380, 1.15], [700, 370, 1.22]], bg: (g, t) => MS.studio(g, t, { easel: {} }), act: (g, t) => P(g, 'leonardo', 420, 740, .66, t, { pose: 'presentBoth', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }),
    ui: c => DR.write(c, 'THE MAN WHO PAINTED HER', 640, 110, 52, lt, .2) })), 'dissolve');
  SFX(33, 3, 'cloth', .6); SFX(33, 4, 'boing', .4);
  C(33, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 400, 1.26]], bg: (g, t) => MS.studio(g, t, { easel: false }), act: (g, t) => { const tug = Math.sin(lt * 7) * 22; ML.mona(g, 560 + tug, 420, 230, { frame: false }); P(g, 'leonardo', 450 + tug, 750, .66, t, { pose: 'crossed', turn: .4, face: { mouth: 'grit', eyes: 'squint', brows: 'angry' } });
      GX.hand(g, 720 + tug, 420, .4, 0, { kind: 'fist', sleeve: '#c8a24a' }); },
    ui: c => { DR.write(c, "…AND HE WOULDN'T LET GO", 640, 110, 52, lt, .1); GX.bubble(c, 'MINE!', 300, 240, lt, .5, 400, 340, { size: 40 }); } })), 'whip');
})(window);
