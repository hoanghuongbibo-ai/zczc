/* The Life of the Mona Lisa — BEAT 2 + 3: Florence 1503, the commission, Vespucci's margin note, the never-ending
 * painting and the road to France (L34–85, 1:47–4:55). */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MS = G.MS, ML = G.ML, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, FA = G.Fauna, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  Object.assign(G.CW, { apelles: { outfit: 'toga', look: { skin: '#ecc8a6', hairCol: '#eae6e0', beard: 'full', beardCol: '#eae6e0' } },
    schlechter: { outfit: 'suitGrey', look: { skin: '#f2d6c0', hairCol: '#8a7a6a', glasses: true } }, kid1: { outfit: 'renTunic', look: { skin: '#f4dcc4', hairCol: '#3a2618', width: .8 } } });
  const FLOR = [11.25, 43.77], MIL = [9.19, 45.46], ROM = [12.5, 41.9], AMBO = [.98, 47.41];
  const card = (g, x, y, w, h, fill = '#f6efe0') => { g.fillStyle = 'rgba(10,6,4,.35)'; g.beginPath(); g.roundRect(x - w / 2 + 6, y - h / 2 + 8, w, h, 14); g.fill(); g.fillStyle = fill; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 14); g.fill(); g.lineWidth = 5; g.strokeStyle = '#15100c'; g.stroke(); };
  const label = (g, s, x, y, size = 30, col = '#15100c') => { g.font = MK(size); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const coinRain = (g, lt, n = 24, seed = 2) => { const r = rng(seed); for (let i = 0; i < n; i++) { const y = ((lt * 520 * (.7 + r() * .5) + r() * 700) % 820) - 80, x = 60 + r() * 1160; sh(g, '#f2c43a', 2.5, c => c.ellipse(x, y, 16, 7, lt * 5 + i, 0, TAU)); } };

  // ---------------- L34–42 Florence runs on money ----------------
  mood(34, 'renaissance'); AMB(34, 'street', 22, .5); K2.era(t0(34, 0), 'FLORENCE', '1503'); SFX(34, 2, 'whoosh', .6);
  C(34, null, S((lt, R, t) => { const v = M.fly(lt, [[0, 10, 48, 18], [1.6, 11.2, 43.8, 70]]); return { bg: g => DR.map(g, t, v), act: g => { if (lt > 1.4) DR.mapPin(g, v, ...FLOR, lt, 1.4); }, ui: c => { DR.mapWrite(c, v, ...FLOR, 'FLORENCE', lt, 1.5, { dy: 70, size: 54 }); DR.yearTag(c, '1503', lt, .3); } }; }), 'dissolve');
  SFX(35, 3, 'pop', .4); SFX(35, 3, 'pop', .4, null, .2); SFX(35, 3, 'pop', .4, null, .4);
  C(35, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#c4dade'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => {
      [['MILAN', 400, 200, 140, 90, '#7a9ae8', 'smug'], ['VENICE', 760, 210, 130, 80, '#e8907a', 'happy'], ['FLORENCE', 560, 330, 110, 70, '#e8c84a', 'happy'], ['PAPAL\nSTATES', 760, 420, 120, 90, '#9ac87a', 'sleepy'], ['NAPLES', 900, 580, 150, 90, '#c890d8', 'angry']].forEach(([nm, x, y, rx, ry, col, md], i) => {
        const k = GX.pop(lt, .1 + i * .15, .3); if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k, k); GX.blob(g, 0, 0, rx, ry, col, 20 + i, t); GX.face(g, 0, 0, .6, md, t + i); nm.split('\n').forEach((l, j) => label(g, l, 0, ry * .55 + 18 + j * 26, 26)); g.restore(); }); },
    ui: c => DR.write(c, 'NOT A COUNTRY YET', 640, 90, 58, lt, .2) })), 'whip');
  SFX(36, 8, 'coins', .6); SFX(36, 10, 'cash', .5);
  C(36, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [700, 400, 1.12]], bg: (g, t) => MS.florence(g, t), crowd: DR.army(60, 600, 1220, 712, 18, ['francesco', 'vespucci', 'salai', 'musician'], .3, .4, 34, { walk: true, spr: { turn: .7 } }),
    act: g => { if (lt > R(36, 8)) coinRain(g, lt - R(36, 8)); }, ui: c => { DR.write(c, 'A CITY THAT RUNS ITSELF', 640, 90, 52, lt, .2); if (lt > R(36, 8)) DR.write(c, '…ON MONEY', 640, 170, 60, lt, R(36, 8), { col: '#f2d23a' }); } })), 'whip');
  SFX(37, 0, 'pop', .6); SFX(37, 1, 'pop', .6); SFX(37, 3, 'pop', .6);
  C(37, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#d8a840', '#f6d88a'), act: (g, t) => { [[0, 'WOOL', '#f4f0e8'], [1, 'BANKING', '#f2c43a'], [3, 'SILK', '#c8281e']].forEach(([k, lab, col], i) => { const p = GX.pop(lt, R(37, k), .3); if (p <= 0) return; const x = 260 + i * 380; g.save(); g.translate(x, 360); g.scale(p, p);
      if (lab === 'WOOL') { for (let j = 0; j < 7; j++) sh(g, col, 4, c => c.arc(Math.cos(j) * 50, Math.sin(j * 2) * 30, 50, 0, TAU)); } else if (lab === 'BANKING') { for (let j = 0; j < 6; j++) sh(g, col, 3, c => c.ellipse(0, 40 - j * 18, 70, 18, 0, 0, TAU)); } else { for (let j = 0; j < 3; j++) sh(g, ['#c8281e', '#7a3aa8', '#2a8a8a'][j], 4, c => c.roundRect(-80 + j * 54, -60, 50, 130, 10)); }
      label(g, lab, 0, 140, 46); g.restore(); }); } })), 'whip');
  SFX(38, 1, 'creak', .6);
  C(38, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 390, 1.08]], bg: (g, t) => MS.house(g, t), act: (g, t) => { const k = clamp(lt / 2.5); P(g, 'francesco', lerp(1300, 820, ease.out(k)), 740, .62, t, { walk: k < 1 ? t * 6 : 0, turn: -.6, pose: k >= 1 ? 'presentL' : 'idle', face: { mouth: 'smile' } }); },
    ui: c => { if (lt > R(38, 9) - .2) DR.write(c, 'FRANCESCO DEL GIOCONDO', 640, 640, 50, lt, R(38, 9) - .2); } })), 'dissolve');
  SFX(39, 0, 'card', .6);
  C(39, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.16]], bg: (g, t) => MS.house(g, t), act: (g, t) => P(g, 'francesco', 360, 750, .7, t, { pose: 'hips', turn: .4, face: { mouth: 'smirk', brows: 'sly' } }),
    ui: c => DR.statCard(c, { name: 'FRANCESCO', cls: 'SILK MERCHANT · LATE 30s', who: 'francesco', stats: [['MONEY', 4], ['SILK', 5], ['PROOF OF IT', 1]] }, 900, 340, lt, .2) })), 'whip');
  SFX(40, 0, 'stamp', .9);
  C(40, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), ui: c => DR.sign(c, 'PROOF.', 640, 360, lt, 0, { size: 120, rot: -.06 }) })), 'flash');
  SFX(41, 3, 'thud', .5);
  C(41, null, S((lt, R, t) => ({ cam: [[640, 380, 1.15], [640, 380, 1.2]], bg: (g, t) => MS.house(g, t), act: (g, t) => { const k = clamp((lt - .2) / .5); g.save(); g.translate(0, (1 - ease.out(k)) * -500); ML.painting(g, 540, 120, 200, 260, 4, {}); g.restore(); P(g, 'francesco', 360, 750, .7, t, { pose: 'pointUp', turn: .5, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => DR.write(c, 'A PORTRAIT = PROOF', 640, 640, 56, lt, .3) })), 'whip');
  // L42 the script's visual: a portrait frame — family photo, luxury car, big house, a LinkedIn-style headline, then all on one plank
  SFX(42, 5, 'pop', .6); SFX(42, 9, 'pop', .6); SFX(42, 11, 'pop', .5); SFX(42, 13, 'ding', .6); SFX(42, 17, 'thud', .7);
  C(42, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a5a8a', '#3a6a9a'), act: (g, t) => { const plank = clamp((lt - R(42, 17)) / .4);
      g.save(); g.translate(640, 380); g.scale(1 - plank * .5, 1 - plank * .5); sh(g, '#c8862e', 8, c => c.rect(-330, -240, 660, 480)); sh(g, '#f4ead4', 4, c => c.rect(-300, -210, 600, 420));
      const pf = GX.pop(lt, R(42, 5), .3); if (pf > 0) { g.save(); g.scale(pf, pf); P(g, 'tourist1', -60, 170, .4, t, { pose: 'present', face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'tourist3', 40, 170, .38, t, { pose: 'idle', face: { mouth: 'grin', eyes: 'happy' } }); P(g, 'kid1', -10, 175, .26, t, { pose: 'cheer', face: { mouth: 'grin' } }); g.restore(); }
      const pc = GX.pop(lt, R(42, 9), .3); if (pc > 0) { g.save(); g.translate(-200, 120); g.scale(pc, pc); sh(g, '#c8281e', 4, c => { c.moveTo(-80, 0); c.lineTo(-60, -40); c.lineTo(40, -44); c.lineTo(80, -10); c.lineTo(80, 10); c.lineTo(-80, 10); c.closePath(); }); for (const x of [-50, 50]) sh(g, '#15100c', 3, c => c.arc(x, 12, 14, 0, TAU)); g.restore(); }
      const ph = GX.pop(lt, R(42, 11) - .3, .3); if (ph > 0) { g.save(); g.translate(210, 90); g.scale(ph, ph); sh(g, '#e8dcc0', 4, c => c.rect(-80, -60, 160, 100)); sh(g, '#8a3a2a', 4, c => { c.moveTo(-96, -58); c.lineTo(0, -120); c.lineTo(96, -58); c.closePath(); }); g.restore(); }
      const pl = GX.pop(lt, R(42, 13), .3); if (pl > 0) { g.save(); g.translate(0, -150); g.scale(pl, pl); sh(g, '#fff', 4, c => c.roundRect(-230, -36, 460, 72, 10)); sh(g, '#0a66c2', 0, c => c.roundRect(-220, -24, 48, 48, 8)); label(g, 'in', -196, 2, 30, '#fff'); g.textAlign = 'left'; g.font = MK(24); g.fillStyle = '#15100c'; g.fillText('Successful Silk Merchant', -160, -6); g.font = '16px sans-serif'; g.fillStyle = '#5a5a5a'; g.fillText('Florence · 500+ connections', -160, 18); g.restore(); }
      if (plank > 0) { g.fillStyle = `rgba(200,150,90,${plank})`; g.fillRect(-300, -210, 600, 420); g.strokeStyle = `rgba(90,60,30,${plank * .5})`; g.lineWidth = 3; for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(-300 + i * 50, -210); g.lineTo(-290 + i * 50, 210); g.stroke(); } } g.restore(); },
    ui: c => { if (lt > R(42, 17)) DR.write(c, 'ALL ON ONE PLANK OF WOOD', 640, 640, 52, lt, R(42, 17)); } })), 'whip');

  // ---------------- L43–51 Lisa ----------------
  mood(43, 'tender'); SFX(43, 8, 'sparkle', .5);
  C(43, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 390, 1.18]], bg: (g, t) => MS.house(g, t), act: (g, t) => { P(g, 'lisa', 640, 750, .7, t, { pose: 'idle', turn: .1, face: { mouth: 'smile', eyes: 'happy' } }); P(g, 'francesco', 330, 750, .64, t, { pose: 'presentBoth', turn: .5, face: { mouth: 'grin' } }); },
    ui: c => { if (lt > R(43, 8) - .2) DR.write(c, 'LISA GHERARDINI', 640, 640, 58, lt, R(43, 8) - .2); } })), 'whip');
  SFX(44, 4, 'card', .5); SFX(44, 6, 'ding', .5);
  C(44, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#f2e6c8'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { card(g, 640, 360, 560, 400, '#fffaf0'); label(g, 'BORN', 640, 220, 40, '#7a5a3a'); label(g, 'LISA GHERARDINI', 640, 290, 44);
      if (lt > R(44, 4)) label(g, 'JUNE 15', 640, 380, 70, '#c8281e'); if (lt > R(44, 6)) label(g, '1479', 640, 470, 80); } })), 'whip');
  SFX(45, 4, 'clink', .5); SFX(45, 8, 'drop', .5);
  C(45, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a060', '#e8c890'), act: (g, t) => { const tilt = lerp(0, -.22, ease.out(clamp((lt - R(45, 8)) / .6))); g.save(); g.translate(640, 560); sh(g, '#6a4a2a', 4, c => c.rect(-70, 0, 140, 30)); ln(g, [[0, 0], [0, -300]], 14, '#6a4a2a'); g.translate(0, -300); g.rotate(tilt); ln(g, [[-300, 0], [300, 0]], 12, '#6a4a2a');
      for (const sd of [-1, 1]) { g.save(); g.translate(sd * 280, 0); g.rotate(-tilt); ln(g, [[0, 0], [-70, 140]], 4); ln(g, [[0, 0], [70, 140]], 4); sh(g, '#c8a060', 4, c => c.ellipse(0, 144, 100, 20, 0, 0, TAU)); if (sd < 0) { label(g, 'GOOD OLD NAME', 0, 100, 28); for (let i = 0; i < 3; i++) label(g, '★', -30 + i * 30, 132, 30, '#c8281e'); } else { label(g, 'MONEY', 0, 100, 28); sh(g, '#f2c43a', 2.5, c => c.ellipse(0, 134, 20, 7, 0, 0, TAU)); } g.restore(); } g.restore(); } })), 'whip');
  SFX(46, 1, 'bell', .5); SFX(46, 10, 'pop', .5); SFX(46, 14, 'pop', .5);
  C(46, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.12]], bg: (g, t) => MS.florence(g, t), crowd: DR.army(80, 640, 1200, 712, 12, ['salai', 'musician', 'vespucci'], .28, .34, 46, { spr: { pose: 'cheer' } }),
    act: (g, t) => { P(g, 'lisa', 560, 760, .64, t, { pose: 'idle', turn: .3, face: { mouth: 'smile' } }); P(g, 'francesco', 760, 760, .66, t, { pose: 'present', turn: -.3, face: { mouth: 'grin', eyes: 'happy' } }); const r = rng(4); for (let i = 0; i < 30; i++) { g.fillStyle = ['#fff', '#f4c8d8', '#f2d23a'][i % 3]; g.fillRect(r() * W + Math.sin(lt * 3 + i) * 10, ((lt * 120 + r() * 720) % 760) - 20, 8, 8); } },
    ui: c => { DR.yearTag(c, '1495', lt, .2); if (lt > R(46, 10)) DR.callout(c, 'SHE: 15', 400, 230, lt, R(46, 10), 560, 380, { screen: true }); if (lt > R(46, 14)) DR.callout(c, 'HE: 29', 900, 230, lt, R(46, 14), 760, 380, { screen: true }); } })), 'whip');
  SFX(47, 13, 'pop', .4); SFX(47, 16, 'bell', .3);
  C(47, null, S((lt, R, t) => { const sad = lt > R(47, 15); return { cam: [[640, 400, 1.08], [640, 400, 1.14]], bg: (g, t) => MS.house(g, t), act: (g, t) => { P(g, 'lisa', 560, 750, .66, t, { pose: sad ? 'idle' : 'presentBoth', turn: .2, face: sad ? { mouth: 'frown', eyes: 'half', brows: 'worried' } : { mouth: 'smile' } });
      const n = Math.min(3, Math.floor(clamp((lt - R(47, 12) + .3) / .9) * 3 + (lt > R(47, 12) ? 1 : 0))); for (let i = 0; i < n; i++) P(g, 'kid1', 760 + i * 110, 750, .32 + i * .02, t + i, { pose: 'cheer', turn: -.3, face: { mouth: 'grin' } });
      if (sad) { ln(g, [[420, 600], [420, 560]], 10, '#f4f0e8'); G.Paint2.fire(g, 420, 555, .16, t); } }, atm: { dark: sad ? clamp((lt - R(47, 15)) / .5) * .3 : 0 }, ui: c => DR.yearTag(c, '1503 · MID-20s', lt, .2) }; }), 'dissolve');
  mood(48, 'curious'); SFX(48, 3, 'boing', .4);
  C(48, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a5a', '#4a4a6a'), act: (g, t) => { ML.mona(g, 640, 360, 360, {}); const k = GX.pop(lt, .3, .3); g.save(); g.translate(900, 220); g.scale(k, k); g.rotate(Math.sin(t * 3) * .1); label(g, '?', 0, 0, 200, '#f2d23a'); g.restore(); },
    ui: c => DR.write(c, 'WHY NOW?', 640, 650, 70, lt, .1) })), 'whip');
  SFX(49, 2, 'cloth', .5);
  C(49, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: g => DR.sunburst(g, t, '#e8c890', '#f4e0b0'), act: (g, t) => { const p = Math.sin(lt * 4) * 14; P(g, 'vasari', 400 + p, 750, .62, t, { pose: 'pointSide', turn: .6, face: { mouth: 'open', brows: 'angry' } }); P(g, 'schlechter', 880 - p, 750, .6, t, { pose: 'pointSideL', turn: -.6, face: { mouth: 'grit', brows: 'angry' } }); },
    ui: c => { DR.write(c, 'HISTORIANS STILL ARGUE', 640, 100, 54, lt, .1); GX.bubble(c, 'A SON!', 330, 240, lt, .4, 400, 330, { size: 30 }); GX.bubble(c, 'A HOUSE!', 960, 240, lt, .9, 880, 330, { size: 30 }); } })), 'whip');
  SFX(50, 4, 'chime', .5); SFX(50, 11, 'thud', .5);
  C(50, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a6a5a', '#3a7a6a'), act: (g, t) => { const a = GX.pop(lt, R(50, 4) - .2, .3), b = GX.pop(lt, R(50, 10) - .2, .3);
      if (a > 0) { g.save(); g.translate(400, 380); g.scale(a, a); sh(g, '#c8a060', 5, c => { c.moveTo(-110, -20); c.quadraticCurveTo(0, 100, 110, -20); c.closePath(); }); ln(g, [[-110, -20], [110, -20]], 8, '#8a6a3a'); sh(g, '#f4dcc4', 3, c => c.arc(-30, -40, 30, 0, TAU)); label(g, 'A SON?', 0, 130, 44); g.restore(); }
      if (b > 0) { g.save(); g.translate(880, 380); g.scale(b, b); sh(g, '#e8c890', 5, c => c.rect(-110, -60, 220, 140)); sh(g, '#a8302a', 5, c => { c.moveTo(-130, -58); c.lineTo(0, -150); c.lineTo(130, -58); c.closePath(); }); label(g, 'A NEW HOME?', 0, 130, 44); g.restore(); } } })), 'whip');
  SFX(51, 1, 'paper', .5); SFX(51, 4, 'drop', .5);
  C(51, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#3a2a1e'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { card(g, 640, 380, 480, 560, '#f4ead4'); label(g, 'REASON FOR PORTRAIT:', 640, 160, 34, '#5a4a3a'); ln(g, [[460, 240], [820, 240]], 3, '#a89878');
      const qk = clamp((lt - R(51, 4)) / .6); g.save(); g.translate(lerp(760, 820, qk), lerp(300, 640, ease.inOut(qk))); g.rotate(-.6 - qk * 1.4); ln(g, [[0, 0], [0, -180]], 6, '#f4f0e8'); sh(g, '#fff', 3, c => c.ellipse(0, -140, 20, 60, 0, 0, TAU)); g.restore(); },
    ui: c => DR.write(c, 'NOBODY WROTE IT DOWN', 640, 650, 54, lt, .2) })), 'whip');

  // ---------------- L52–56 Leonardo, famous for not finishing ----------------
  mood(52, 'curious'); SFX(52, 5, 'sting', .5);
  C(52, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#15161c'; g.fillRect(-300, -300, 1900, 1400); const k = clamp((lt - .6) / .6); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 300, 420 * k + 10, 'rgba(255,240,200,.5)'); g.restore(); },
    act: (g, t) => { const k = clamp((lt - .6) / .6); g.save(); g.globalAlpha = .35 + k * .65; g.filter = k < 1 ? `brightness(${.1 + k * .9})` : 'none'; P(g, 'leonardo', 640, 720, .7, t, { pose: 'idle', face: { mouth: 'flat' } }); g.restore(); }, ui: c => DR.write(c, 'WHO THEY HIRED', 640, 100, 54, lt, .1) })), 'dip');
  SFX(53, 0, 'tada', .6); SFX(53, 5, 'card', .6); K2.era(t0(53, 0), 'FLORENCE', '1503');
  C(53, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.studio(g, t, { easel: 'blank' }), act: (g, t) => P(g, 'leonardo', 330, 750, .7, t, { pose: 'present', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }),
    ui: c => { DR.write(c, 'LEONARDO DA VINCI', 640, 640, 58, lt, .1); DR.statCard(c, { name: 'LEONARDO', cls: 'AGE 51 · MOST FAMOUS ARTIST IN TOWN', who: 'leonardo', stats: [['PAINTING', 5], ['INVENTING', 5], ['FINISHING', 0]] }, 920, 320, lt, R(53, 5)); } })), 'whip');
  mood(54, 'comic'); SFX(54, 4, 'boing', .4); SFX(55, 1, 'stamp', .8);
  C(54, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MS.studio(g, t, { easel: 'blank', ex: 1000 }), act: (g, t) => { const r = rng(5); [['HORSE STATUE', 220, 520], ['FLYING MACHINE', 520, 300], ['THE BATTLE MURAL', 760, 520], ['ADORATION', 1000, 300]].forEach(([lab, x, y], i) => { const k = GX.pop(lt, .1 + i * .25, .3); if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k, k); g.rotate((i % 2 - .5) * .1); card(g, 0, 0, 230, 150, '#f4ead4'); g.setLineDash([10, 8]); g.strokeStyle = '#6a4a2a'; g.lineWidth = 4; g.beginPath(); g.arc(0, -10, 40, 0, PI * (1.1 + r() * .3)); g.stroke(); g.setLineDash([]); label(g, lab, 0, 55, 20); g.restore(); }); },
    ui: c => { DR.write(c, 'FAMOUS FOR SOMETHING ELSE…', 640, 100, 50, lt, .1); if (lt > R(55, 1) + (t0(55, 0) - t0(54, 0))) DR.sign(c, 'NOT FINISHING THINGS', 640, 640, lt, R(55, 1) + (t0(55, 0) - t0(54, 0)), { size: 52, rot: -.05 }); } })), 'whip');
  mood(56, 'quiet'); SFX(56, 13, 'whoosh', .4);
  C(56, 8, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#2a2420'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const f = clamp((lt - .3) / 2.2), fb = .5 + .5 * Math.sin(lt * 9); g.save(); g.globalAlpha = 1 - f * (.6 + .4 * fb); ML.mona(g, 640, 360, 440, { frame: false }); g.restore(); g.save(); g.globalAlpha = f * (.6 + .4 * fb); ML.mona(g, 640, 360, 440, { frame: false, blank: true }); g.restore(); },
    ui: c => DR.write(c, 'IT ALMOST NEVER EXISTED', 640, 650, 54, lt, .5) })), 'dip');

  // ---------------- L57–63 Vespucci's margin note ----------------
  mood(57, 'curious'); AMB(57, 'court', 16, .35); SFX(57, 13, 'paper', .6); K2.era(t0(57, 0), 'FLORENCE', 'OCT 1503');
  C(57, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 390, 1.14]], bg: (g, t) => MS.house(g, t), act: (g, t) => { sh(g, '#5a3a22', 4, c => c.rect(420, 560, 520, 30)); P(g, 'vespucci@sit', 640, 560, .6, t, { pose: 'present', turn: .1, face: { mouth: 'flat', eyes: 'half', look: [0, .6] } });
      g.save(); g.translate(640, 540); sh(g, '#7a2a22', 4, c => c.rect(-130, -30, 260, 40)); sh(g, '#f4ead4', 3, c => { c.rect(-120, -50, 115, 30); c.rect(5, -50, 115, 30); }); label(g, 'CICERO', 0, -6, 20, '#f2d23a'); g.restore(); },
    ui: c => { DR.write(c, 'AGOSTINO VESPUCCI', 640, 640, 52, lt, R(57, 10) - .2); DR.yearTag(c, 'OCT 1503', lt, .2); if (lt > R(57, 18) - .2) DR.callout(c, 'READING CICERO', 960, 200, lt, R(57, 18) - .2, 700, 480, { screen: true }); } })), 'dissolve');
  SFX(58, 11, 'pencil', .7, 2);
  C(58, 6, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#4a3020'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { sh(g, '#f2e6c4', 5, c => c.rect(240, 80, 820, 580)); ln(g, [[650, 80], [650, 660]], 6, '#c8b088'); g.fillStyle = 'rgba(60,50,40,.7)'; for (let i = 0; i < 16; i++) { g.fillRect(290, 120 + i * 32, 260 - (i % 4) * 20, 10); g.fillRect(700, 120 + i * 32, 300 - (i % 3) * 30, 10); }
      const k = clamp((lt - R(58, 11) + .3) / 1.6); g.save(); g.font = 'italic 22px Georgia, serif'; g.fillStyle = '#7a2a18'; const txt = 'Apelles… sic Leonardus…'; g.fillText(txt.slice(0, Math.floor(txt.length * k)), 1010, 180); g.restore();
      if (k < 1 && k > 0) { g.save(); g.translate(1010 + 200 * k, 170); g.rotate(-.6); ln(g, [[0, 0], [0, -200]], 6, '#f4f0e8'); sh(g, '#fff', 3, c => c.ellipse(0, -150, 22, 70, 0, 0, TAU)); g.restore(); } },
    ui: c => DR.callout(c, 'IN THE MARGIN', 300, 640, lt, R(58, 13), 1000, 180, { screen: true }) })), 'whip');
  SFX(59, 8, 'pop', .5); SFX(59, 13, 'ding', .6);
  C(59, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8b860', '#f6d898'), act: (g, t) => { P(g, 'apelles', 320, 700, .6, t, { pose: 'present', turn: .4, face: { mouth: 'smile' } }); if (lt > R(59, 12)) P(g, 'leonardo', 960, 700, .6, t, { pose: 'presentL', turn: -.4, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'APELLES', 320, 140, 50, lt, R(59, 8) - .3); DR.write(c, '(ANCIENT GREEK PAINTER)', 320, 200, 28, lt, R(59, 8)); if (lt > R(59, 12)) { DR.write(c, '=', 640, 380, 140, lt, R(59, 12), { col: '#c8281e' }); DR.write(c, 'LEONARDO', 960, 140, 50, lt, R(59, 13)); } } })), 'whip');
  SFX(60, 10, 'marker', .6); SFX(60, 13, 'sparkle', .6);
  C(60, null, S((lt, R, t) => ({ cam: [[880, 180, 2.0], [900, 190, 2.2]], bg: g => { g.fillStyle = '#4a3020'; g.fillRect(-300, -300, 1900, 1400); sh(g, '#f2e6c4', 5, c => c.rect(240, 80, 820, 580)); g.fillStyle = 'rgba(60,50,40,.7)'; for (let i = 0; i < 16; i++) g.fillRect(700, 120 + i * 32, 300 - (i % 3) * 30, 10); g.font = 'italic 22px Georgia, serif'; g.fillStyle = '#7a2a18'; g.textAlign = 'left'; g.fillText('…caput Lisae del Giocondo…', 760, 230); },
    act: g => { const k = clamp((lt - R(60, 10)) / .8); g.fillStyle = 'rgba(255,230,60,.45)'; g.fillRect(756, 210, 290 * k, 30); } ,
    ui: c => { DR.write(c, '"…the head of Lisa del Giocondo…"', 640, 560, 44, lt, R(60, 12)); DR.write(c, '— Agostino Vespucci, October 1503', 640, 630, 30, lt, R(60, 14), { col: '#f2d23a' }); } })), 'zoom');
  SFX(61, 2, 'creak', .4); SFX(61, 6, 'fly', .3, 2);
  C(61, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#3a2618'; g.fillRect(-300, -300, 1900, 1400); for (let r = 0; r < 3; r++) { g.fillStyle = '#5a3a22'; g.fillRect(-300, 200 + r * 180, 1900, 20); for (let i = 0; i < 26; i++) sh(g, ['#7a2a22', '#2a4a6a', '#5a5a2a', '#6a4a2a'][(i + r) % 4], 2, c => c.rect(-100 + i * 58, 70 + r * 180, 50, 130)); } },
    act: (g, t) => { const k = clamp(lt / 3.6); g.fillStyle = `rgba(200,190,170,${k * .6})`; g.fillRect(-300, -300, 1900, 1400); g.strokeStyle = `rgba(240,240,240,${k})`; g.lineWidth = 1.5; for (let i = 0; i < 10; i++) { g.beginPath(); g.moveTo(640, 290); g.lineTo(640 + Math.cos(i / 10 * TAU) * 260 * k, 290 + Math.sin(i / 10 * TAU) * 200 * k); g.stroke(); } },
    ui: c => { const y = Math.round(lerp(1503, 2005, clamp(lt / 3.6))); DR.write(c, String(y), 640, 380, 140, lt, 0, { col: '#fff' }); DR.write(c, 'UNNOTICED', 640, 560, 54, lt, .3); } })), 'whip');
  SFX(62, 9, 'sting', .4); SFX(62, 14, 'tick', .5); SFX(62, 14, 'pop', .4, null, .2);
  C(62, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 380, 1.22]], bg: (g, t) => MS.studio(g, t, { easel: false }), act: (g, t) => P(g, 'schlechter', 560, 760, .72, t, { pose: 'magnify', prop: 'magnifier', turn: .4, face: { mouth: lt > R(62, 9) ? 'o' : 'flat', eyes: lt > R(62, 9) ? 'wide' : 'open' } }),
    ui: c => { DR.write(c, 'HEIDELBERG UNIVERSITY LIBRARY', 640, 100, 44, lt, R(62, 3)); DR.write(c, 'ARMIN SCHLECHTER', 640, 640, 50, lt, R(62, 7) - .2); DR.exclaim(c, 760, 240, lt, R(62, 9)); if (lt > R(62, 14)) DR.yearTag(c, 'ANNOUNCED 2008', lt, R(62, 14)); } })), 'whip');
  SFX(63, 7, 'typewriter', .6, 1.6); SFX(63, 10, 'cash', .6);
  C(63, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a6a5a', '#3a7a6a'), act: (g, t) => { const k = clamp((lt - .2) / 1.6), h = 460 * ease.out(k); sh(g, '#3a3a40', 5, c => c.roundRect(480, 560, 320, 110, 16)); g.save(); g.beginPath(); g.rect(400, 0, 480, 580); g.clip(); g.translate(0, 560 - h);
      sh(g, '#fffdf6', 3, c => c.rect(520, 0, 240, 470)); g.textAlign = 'center'; g.font = '700 22px monospace'; g.fillStyle = '#15100c'; ['RECEIPT', '------------', 'PORTRAIT OF', 'LISA DEL GIOCONDO', 'ARTIST: LEONARDO', 'DATE: OCT 1503', '------------', 'TIME-STAMPED ✓'].forEach((l, i) => g.fillText(l, 640, 40 + i * 50)); g.restore(); },
    ui: c => DR.write(c, 'A TIME-STAMPED RECEIPT', 640, 90, 52, lt, .2) })), 'whip');

  // ---------------- L64–70 he keeps going ----------------
  mood(64, 'renaissance'); SFX(64, 1, 'pencil', .5, 1.2);
  C(64, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [680, 400, 1.15]], bg: (g, t) => MS.studio(g, t, { easel: lt < 1 ? 'blank' : {} }), act: (g, t) => { sh(g, '#6a4a2a', 4, c => c.rect(160, 600, 140, 22)); P(g, 'lisa@sit', 230, 600, .52, t, { pose: 'idle', turn: .5, face: { mouth: 'smile', eyes: 'half' } }); P(g, 'leonardo', 560, 750, .62, t, { pose: 'pointSide', turn: .6, face: { mouth: 'flat', brows: 'neutral' } }); },
    ui: c => DR.write(c, 'SO LEONARDO STARTS', 640, 100, 52, lt, .1) })), 'whip');
  for (let i = 0; i < 8; i++) G.SFXat(C.t(65, 0) + .2 + i * .28, 'paper', .25);
  C(65, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a060', '#e8c890'), act: (g, t) => { const yr = Math.floor(lt * 3); for (let i = 0; i < 6; i++) { const u = ((lt * 2.4 + i / 6) % 1); g.save(); g.translate(lerp(640, 1500, u), lerp(300, -200, u)); g.rotate(u * 3); sh(g, '#fff', 4, c => c.rect(-80, -60, 160, 120)); label(g, ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'][i], 0, 0, 40, '#c8281e'); g.restore(); } ML.mona(g, 400, 380, 340, { frame: false }); },
    ui: c => DR.write(c, '…AND KEEPS GOING', 640, 640, 56, lt, .1) })), 'whip');
  SFX(66, 1, 'boing', .4);
  C(66, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: (g, t) => MS.studio(g, t, { easel: {} }), act: (g, t) => { P(g, 'leonardo', 440, 750, .62, t, { pose: 'think', turn: .5, face: { mouth: 'flat', eyes: 'half' } }); const k = clamp(lt / 1.2); g.strokeStyle = `rgba(255,255,255,${k * .8})`; g.lineWidth = 2; for (let i = 0; i < 7; i++) { g.beginPath(); g.moveTo(900, 180); g.lineTo(900 - Math.cos(i / 7 * PI / 2) * 160 * k, 180 + Math.sin(i / 7 * PI / 2) * 160 * k); g.stroke(); } },
    ui: c => DR.write(c, '…AND GOING', 640, 100, 56, lt, .1) })), 'dissolve');
  SFX(67, 3, 'card', .5); SFX(67, 15, 'pop', .5); SFX(67, 20, 'stamp', .8);
  C(67, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.13]], bg: (g, t) => MS.house(g, t), act: (g, t) => { sh(g, '#5a3a22', 4, c => c.rect(160, 580, 460, 26)); P(g, 'vasari@sit', 380, 580, .6, t, { pose: 'present', turn: .2, face: { mouth: 'smile', eyes: 'half' } }); g.save(); g.translate(380, 560); sh(g, '#2a4a6a', 4, c => c.rect(-80, -26, 160, 30)); label(g, 'LIVES OF THE ARTISTS', 0, -10, 14, '#f2d23a'); g.restore(); },
    ui: c => { DR.write(c, 'GIORGIO VASARI', 940, 140, 50, lt, R(67, 3) - .2); DR.yearTag(c, '1550', lt, R(67, 7)); if (lt > R(67, 15)) DR.tally(c, '4 YEARS', g => { g.fillStyle = '#c8281e'; g.fillRect(-10, -12, 20, 24); }, 900, 360, lt, R(67, 15), { n: 4, label: '4 YEARS' }); if (lt > R(67, 20)) DR.sign(c, 'UNFINISHED', 900, 520, lt, R(67, 20), { size: 46 }); } })), 'whip');
  SFX(68, 0, 'whoosh', .4);
  SFX(69, 3, 'coins', .7);
  C(69, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.studio(g, t, { easel: false }), act: (g, t) => { P(g, 'francesco', 380, 750, .64, t, { pose: 'present', turn: .6, face: { mouth: 'grin' } }); P(g, 'leonardo', 880, 750, .64, t, { pose: 'presentL', turn: -.6, face: { mouth: 'smile', eyes: 'happy' } }); const k = clamp((lt - R(69, 3)) / .6); for (let i = 0; i < 6; i++) sh(g, '#f2c43a', 2.5, c => c.ellipse(lerp(470, 800, k) + i * 8, 470 - Math.sin(k * PI) * 80 - i * 6, 14, 6, 0, 0, TAU)); },
    ui: c => DR.write(c, 'HE PAID FOR A PORTRAIT…', 640, 100, 52, lt, .1) })), 'whip');
  mood(70, 'comic'); SFX(70, 2, 'drop', .6); SFX(70, 3, 'fly', .3, 1.5);
  C(70, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.22]], bg: (g, t) => MS.house(g, t), act: (g, t) => { const r = rng(1); P(g, 'francesco', 640, 750, .7, t, { pose: 'shrug', turn: 0, face: { mouth: 'frown', eyes: 'half', brows: 'worried' } }); sh(g, '#c8862e', 6, c => c.rect(820, 300, 160, 210)); sh(g, '#e8dcc0', 3, c => c.rect(840, 320, 120, 170)); label(g, '?', 900, 410, 80, '#a89878'); },
    ui: c => { DR.write(c, '…AND NEVER GOT IT', 640, 100, 56, lt, .1); DR.callout(c, 'DELIVERY: NEVER', 1000, 600, lt, .9, null, null, { fill: '#ffe0e0' }); } })), 'whip');

  // ---------------- L71–82 the road to France ----------------
  mood(71, 'adventure'); K2.era(t0(71, 0), 'ON THE ROAD', '1506–1519');
  const mapRoute = (lt, R, t, stops, keys) => { const v = M.view(6.6, 44.6, 82); return { bg: g => DR.map(g, t, v), act: (g, t) => { keys.forEach(([a, b, k0, k1]) => { const k = clamp((lt - k0) / (k1 - k0)); if (k > 0) M.route(g, v, [a, b], k, { w: 7, col: '#c8281e' }); }); stops.forEach(([p, t1]) => { if (lt > t1) DR.mapPin(g, v, ...p, lt, t1); }); },
    ui: c => stops.forEach(([p, t1, nm]) => DR.mapWrite(c, v, ...p, nm, lt, t1 + .1, { dy: 50, size: 40 })) }; };
  SFX(71, 4, 'whoosh', .5); SFX(71, 7, 'stamp', .5);
  C(71, null, S((lt, R, t) => mapRoute(lt, R, t, [[FLOR, 0, 'FLORENCE'], [MIL, R(71, 7), 'MILAN']], [[FLOR, MIL, R(71, 4), R(71, 7)]])), 'whip');
  SFX(72, 2, 'gallop', .5, 2);
  C(72, null, S((lt, R, t) => ({ cam: [[640, 420, 1.05], [700, 420, 1.1]], bg: (g, t) => MS.amboise(g, t), act: (g, t) => { const x = lerp(-200, 900, clamp(lt / 2.4)); FA.horse(g, x + 160, 640, .55, t, { dir: 1, coat: '#7a5a3a' }); ln(g, [[x + 60, 620], [x + 110, 590]], 6, '#5a3a22'); sh(g, '#8a6a3a', 4, c => c.rect(x - 160, 540, 220, 70)); for (const wx of [x - 120, x + 20]) sh(g, '#5a3a22', 4, c => c.arc(wx, 620, 26, 0, TAU));
      g.save(); g.translate(x - 50, 480); g.rotate(-.05); ML.mona(g, 0, 0, 110, { frame: false }); g.restore(); P(g, 'leonardo', x - 120, 650, .4, t, { walk: t * 6, turn: .8 }); },
    ui: c => DR.write(c, 'THE PAINTING GOES WITH HIM', 640, 100, 50, lt, .1) })), 'whip');
  SFX(73, 1, 'stamp', .5);
  C(73, null, S((lt, R, t) => mapRoute(lt, R, t, [[FLOR, -1, 'FLORENCE'], [MIL, -1, 'MILAN'], [ROM, R(73, 1), 'ROME']], [[FLOR, MIL, -2, -1], [MIL, ROM, 0, R(73, 1)]])), 'whip');
  SFX(74, 7, 'paper', .5); SFX(74, 11, 'tada', .5); SFX(74, 20, 'stamp', .5);
  C(74, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#3a4a9a'), act: (g, t) => { const k = GX.pop(lt, R(74, 6), .4); g.save(); g.translate(640, 380); g.scale(k, k); g.rotate(-.04); card(g, 0, 0, 560, 380, '#f4ead4'); label(g, 'YOU ARE INVITED', 0, -130, 40, '#2a3a8a'); label(g, 'TO FRANCE', 0, -80, 40, '#2a3a8a'); g.font = 'italic 26px Georgia, serif'; g.fillStyle = '#3a2a1a'; g.fillText('a manor near Amboise awaits you', 0, -10); label(g, '— FRANCIS I', 120, 70, 30); sh(g, '#c8281e', 4, c => c.arc(-160, 110, 46, 0, TAU)); label(g, 'R', -160, 112, 40, '#f2d23a'); g.restore(); },
    ui: c => { DR.write(c, 'FROM THE YOUNG KING OF FRANCE', 640, 90, 46, lt, R(74, 9)); DR.yearTag(c, 'c. 1516', lt, R(74, 11)); } })), 'whip');
  C(74, 15, S((lt, R, t) => mapRoute(lt, R, t, [[ROM, -1, 'ROME'], [AMBO, R(74, 20), 'AMBOISE']], [[ROM, [7, 45.5], 0, .8], [[7, 45.5], AMBO, .8, R(74, 20)]])), 'whip');
  SFX(75, 0, 'gallop', .4, 2);
  C(75, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: g => { const gr = g.createLinearGradient(0, 0, 0, 720); gr.addColorStop(0, '#9ac0e0'); gr.addColorStop(1, '#e8eef4'); g.fillStyle = gr; g.fillRect(-300, -300, 1900, 1400); for (let i = 0; i < 6; i++) { const x = -200 + i * 300; sh(g, '#8a98a8', 4, c => { c.moveTo(x - 200, 560); c.lineTo(x, 200 + (i % 2) * 60); c.lineTo(x + 200, 560); c.closePath(); }); sh(g, '#fff', 0, c => { c.moveTo(x - 60, 300 + (i % 2) * 60); c.lineTo(x, 200 + (i % 2) * 60); c.lineTo(x + 60, 300 + (i % 2) * 60); c.closePath(); }); } g.fillStyle = '#f2f4f8'; g.fillRect(-300, 560, 1900, 400); },
    act: (g, t) => { const x = lerp(1400, 300, clamp(lt / 2.4)); FA.horse(g, x, 640, .55, t, { dir: -1, coat: '#8a6a4a' }); g.save(); g.translate(x + 10, 520); ML.mona(g, 0, 0, 100, { frame: 'plain' }); g.restore(); P(g, 'salai', x + 150, 660, .38, t, { walk: t * 6, turn: -.8 }); }, atm: { snow: 60, cold: .15 },
    ui: c => DR.write(c, 'OVER THE ALPS, AGAIN', 640, 100, 50, lt, .1) })), 'whip');
  SFX(76, 5, 'pencil', .5, 2);
  C(76, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const n = Math.floor(clamp((lt - .3) / 3.5) * 30); for (let i = 0; i < n; i++) { g.fillStyle = `rgba(${200 - i * 3},${180 - i * 2},${120 + i},.55)`; g.fillRect(380, 470 - i * 9, 520, 8); } sh(g, '#c8a070', 3, c => c.rect(380, 470, 520, 70)); label(g, 'POPLAR PANEL', 640, 505, 28); label(g, n + ' LAYERS', 640, 470 - n * 9 - 40, 40, '#f2d23a'); },
    ui: c => DR.write(c, 'LAYER BY THIN LAYER', 640, 100, 56, lt, R(76, 10) - .3) })), 'whip');
  mood(77, 'curious'); SFX(77, 5, 'boing', .3);
  C(77, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: (g, t) => MS.amboise(g, t), act: (g, t) => { ML.mona(g, 760, 480, 200, { frame: false }); P(g, 'leonardo', 560, 760, .64, t, { pose: 'crossed', turn: .4, face: { mouth: 'smile', eyes: 'happy' } }); [[900, 220], [1000, 300], [960, 160]].forEach(([x, y], i) => { const k = GX.pop(lt, .4 + i * .3, .3); if (k > 0) { g.save(); g.translate(x, y); g.scale(k, k); label(g, '?', 0, 0, 80, '#f2d23a'); g.restore(); } }); },
    ui: c => DR.write(c, 'WHY HOLD ON FOR LIFE?', 640, 100, 52, lt, .1) })), 'whip');
  SFX(78, 2, 'cloth', .4);
  C(78, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.08]], dof: 6, bg: (g, t) => MS.amboise(g, t), act: (g, t) => head(g, 'leonardo', 640, 270, 1, t, { pose: 'shrug', face: { mouth: 'flat', eyes: 'half', brows: 'up' } }), ui: c => DR.write(c, "HONESTLY? WE DON'T KNOW.", 640, 640, 54, lt, .1) })), 'whip');
  SFX(79, 4, 'clink', .5); SFX(79, 5, 'zap', .3);
  C(79, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { sh(g, '#8a6a44', 5, c => c.rect(200, 500, 880, 40)); ML.mona(g, 640, 340, 280, { frame: false }); for (const x of [470, 810]) { sh(g, '#9aa4b0', 4, c => c.rect(x - 20, 180, 40, 60)); ln(g, [[x, 240], [x, 300]], 10, '#9aa4b0'); } for (let i = 0; i < 4; i++) sh(g, ['#e8c84a', '#c8281e', '#3a8a4a', '#2a5a9a'][i], 3, c => c.roundRect(260 + i * 60, 440, 36, 60, 8)); },
    ui: c => DR.write(c, 'A TEST BENCH?', 640, 650, 56, lt, .1) })), 'whip');
  SFX(80, 7, 'pencil', .5, .4); SFX(80, 8, 'pencil', .5, .4);
  C(80, null, S((lt, R, t) => ({ cam: [[700, 360, 1.5], [700, 360, 1.56]], bg: (g, t) => MS.studio(g, t, { easel: { smile: .45 + .25 * Math.sin(lt * 4) } }), act: (g, t) => { const dab = Math.sin(lt * 9) > 0; P(g, 'leonardo', 470, 760, .62, t, { pose: dab ? 'pointSide' : 'idle', turn: .6, face: { mouth: 'grit', eyes: 'squint' } }); },
    ui: c => GX.bubble(c, 'ONE MORE TOUCH…', 400, 200, lt, .3, 470, 300, { size: 30 }) })), 'whip');
  mood(81, 'somber'); SFX(81, 1, 'bell', .5);
  C(81, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.04]], bg: (g, t) => MS.studio(g, t, { easel: {} }), act: (g, t) => { sh(g, '#6a4a2a', 4, c => c.rect(260, 560, 140, 22)); for (const x of [270, 390]) ln(g, [[x, 582], [x, 680]], 8, '#5a3a22'); ln(g, [[330, 560], [330, 520]], 12, '#f4f0e8'); G.Paint2.fire(g, 330, 514, .2, t); }, atm: { dark: .35 },
    ui: c => { DR.write(c, 'LEONARDO DIES IN FRANCE', 640, 100, 52, lt, .2); DR.yearTag(c, '1519', lt, R(81, 5)); } })), 'dip');
  SFX(82, 2, 'stamp', .7);
  C(82, null, S((lt, R, t) => { const v = M.view(6.6, 44.6, 82); return { bg: g => DR.map(g, t, v), act: (g, t) => { M.route(g, v, [AMBO, [7, 45.5], FLOR], clamp(lt / 1.2), { w: 7, col: '#c8281e' }); },
    ui: c => { DR.mapWrite(c, v, ...FLOR, 'FLORENCE', lt, 0, { dy: 50, size: 40 }); DR.mapWrite(c, v, ...AMBO, 'AMBOISE', lt, 0, { dy: 50, size: 40 }); if (lt > 1.2) DR.sign(c, 'NEVER GOES BACK', 640, 360, lt, 1.2, { size: 50, rot: -.08 }); } }; }), 'whip');
  mood(83, 'tender'); SFX(83, 5, 'card', .6);
  C(83, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), ui: c => GX.hangSign(c, 'HANDS\nCOUNT:', 0, 1, lt, 0, R(83, 5), { y: 330, col: '#c8281e' }) })), 'flash');
  C(84, null, S((lt, R, t) => ({ cam: [[640, 420, 1.05], [640, 420, 1.12]], bg: g => { const gr = g.createLinearGradient(0, 0, 0, 720); gr.addColorStop(0, '#f2a050'); gr.addColorStop(1, '#5a2a3a'); g.fillStyle = gr; g.fillRect(-300, -300, 1900, 1400); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 520, 300, 'rgba(255,220,150,.6)'); g.restore(); g.fillStyle = '#2a1a1e'; g.fillRect(-300, 560, 1900, 400); },
    act: (g, t) => { g.save(); g.filter = 'brightness(0.1)'; P(g, 'leonardo', 640, 690, .7, t, { pose: 'presentBoth', turn: .2 }); ML.mona(g, 760, 450, 160, { frame: false }); g.restore(); },
    ui: c => DR.write(c, "…WOULDN'T GIVE HER UP", 640, 100, 52, lt, .3) })), 'dissolve');
  mood(85, 'adventure'); for (let i = 0; i < 6; i++) G.SFXat(C.t(85, 0) + .15 + i * .3, 'whoosh', .35);
  C(85, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a2a3a', '#3a3a4a'), act: (g, t) => { ML.mona(g, 640, 360, 300, {}); const sl = ['#2a3a8a', '#1e2a4a', '#f6f4ee', '#6a6a72', '#e86a9a', '#3a8ae8']; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + .3, k = ease.out(clamp((lt - i * .3) / .5)), d = lerp(900, 330, k); GX.hand(g, 640 + Math.cos(a) * d, 360 + Math.sin(a) * d, .5, a, { kind: 'open', sleeve: sl[i] }); } },
    ui: c => DR.write(c, 'AND THE HANDS KEPT COMING', 640, 650, 54, lt, .2) })), 'whip');
})(window);
