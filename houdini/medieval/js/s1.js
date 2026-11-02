/* Medieval peasants — BEAT 1–3 (L1–106, 0:00–5:02): the alarm + the meme, meet Hugh (skit 1), the setup, the world
 * before (map, manor org chart, villeins), the Hundred Rolls deal (dues + egg counter + the abbot's hand on every fee),
 * Kanzaka's custom-as-shield, the source warning. Also defines the shared helpers (G.MH) used by s2–s5. */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MD = G.MD, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, F = G.FARM, FA = G.Fauna, ML = G.ML, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  const MO = G.Soundtrack.MOODS;
  MO.medieval = { bpm: 92, prog: [[50, 57, 62, 66], [48, 55, 60, 64], [45, 52, 57, 60], [50, 57, 62, 66]], pent: [62, 64, 66, 69, 71, 74, 76, 78, 81], parts: { harp: .08, ost: .1, fdrum: .07, bass: .16, pad: .06 } };
  MO.pipe = { bpm: 104, prog: [[43, 55, 59, 62], [48, 60, 64, 67], [50, 62, 66, 69], [43, 55, 59, 62]], pent: [67, 69, 71, 74, 76, 79, 81, 83, 86], parts: { whistle: .07, mar: .08, fdrum: .1, bass: .18, pizz: .06 } };
  MO.dawn = { bpm: 64, prog: [[45, 57, 60, 64], [41, 53, 57, 60], [48, 60, 64, 67], [43, 55, 59, 62]], pent: [57, 60, 62, 64, 67, 69, 72], parts: { pad: .09, harp: .06, bell: .04, bass: .1 } };
  MO.modern = { bpm: 118, prog: [[48, 60, 64, 67], [45, 57, 60, 64], [41, 53, 57, 60], [43, 55, 59, 62]], pent: [60, 62, 64, 67, 69, 72, 74, 76], parts: { arp: .1, bass: .2, mar: .05, snap: .05 } };
  // ---------------- shared helpers (G.MH) ----------------
  const label = (g, s, x, y, size = 30, col = '#15100c') => { g.font = MK(size); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const card = (g, x, y, w, h, fill = '#f6efe0', r = 14) => { g.fillStyle = 'rgba(10,6,4,.35)'; g.beginPath(); g.roundRect(x - w / 2 + 6, y - h / 2 + 8, w, h, r); g.fill(); g.fillStyle = fill; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, r); g.fill(); g.lineWidth = 5; g.strokeStyle = '#15100c'; g.stroke(); };
  const talk = (lt, a, b) => lt > a && lt < b ? (Math.abs(Math.sin(lt * 15)) * .7 + .1) : 0;
  // a parchment roll / document with ink lines that write themselves in, a red seal
  const parchment = (g, x, y, w, h, k = 1, o = {}) => { g.save(); g.translate(x, y); g.rotate(o.rot || 0); g.fillStyle = 'rgba(10,6,4,.35)'; g.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); g.fillStyle = '#efe0bc'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = 'rgba(160,120,60,.18)'; for (let i = 0; i < 8; i++) g.fillRect(-w / 2, -h / 2 + i * h / 8, w, 3);
    for (const sd of [-1, 1]) { g.fillStyle = '#d8c49a'; g.beginPath(); g.ellipse(0, sd * h / 2, w / 2 + 8, 14, 0, 0, TAU); g.fill(); g.strokeStyle = '#8a6a3a'; g.lineWidth = 3; g.stroke(); }
    const n = o.lines || 9; g.fillStyle = '#3a2614'; for (let i = 0; i < n; i++) { const kk = clamp(k * n - i); if (kk > 0) g.fillRect(-w / 2 + 24, -h / 2 + 34 + i * (h - 60) / n, (w - 48 - (i % 3) * 30) * kk, 5); }
    if (o.title) { g.font = 'italic 700 26px Georgia, serif'; g.fillStyle = '#7a1e10'; g.textAlign = 'center'; g.fillText(o.title, 0, -h / 2 + 22); } if (o.seal) { g.fillStyle = '#a8202a'; g.beginPath(); g.arc(w / 2 - 30, h / 2 - 30, 22, 0, TAU); g.fill(); } g.restore(); };
  const eggRow = (g, x, y, n, s = 1, t = 0) => { for (let i = 0; i < n; i++) { const k = GX.pop(t, i * .12, .25); if (k <= 0) continue; g.save(); g.translate(x + (i - (n - 1) / 2) * 60 * s, y); g.scale(k * s, k * s); g.fillStyle = '#fbf3e0'; g.strokeStyle = '#15100c'; g.lineWidth = 4; g.beginPath(); g.ellipse(0, 0, 22, 30, 0, 0, TAU); g.fill(); g.stroke(); g.fillStyle = 'rgba(200,170,120,.4)'; g.beginPath(); g.ellipse(6, 8, 8, 12, 0, 0, TAU); g.fill(); g.restore(); } };
  const stage = (g, t) => { g.fillStyle = '#2a1a2a'; g.fillRect(-300, -300, 1900, 1400); for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#7a1e22' : '#8a2a2a'; g.fillRect(-300 + i * 220, -300, 220, 900); } g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-300, -300, 1900, 1400); sh(g, '#a87a4a', 4, c => c.rect(-300, 560, 1900, 300)); for (let i = 0; i < 14; i++) ln(g, [[-300 + i * 140, 560], [-300 + i * 140 - 60, 860]], 3, '#8a6038');
    g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 300, 520, 'rgba(255,230,170,.3)'); g.restore(); for (const sd of [-1, 1]) sh(g, '#a8202a', 4, c => { c.moveTo(640 + sd * 900, -100); c.lineTo(640 + sd * 520, -100); c.quadraticCurveTo(640 + sd * 560, 300, 640 + sd * 700, 600); c.lineTo(640 + sd * 900, 600); c.closePath(); }); };
  const skitCard = (c, lt) => { const k = GX.pop(lt, 0, .3); G.UI.box(c, 1120, 680, 300, 50, cc => { cc.save(); cc.translate(1120, 680); cc.scale(k, k); cc.fillStyle = '#15100c'; cc.beginPath(); cc.roundRect(-140, -20, 280, 40, 10); cc.fill(); cc.font = MK(22); cc.fillStyle = '#f2d23a'; cc.textAlign = 'center'; cc.textBaseline = 'middle'; cc.fillText('★ SKIT ★ invented dialogue', 0, 1); cc.restore(); }, { free: true }); };
  G.MH = { label, card, talk, parchment, eggRow, stage, skitCard };
  // egg counter + PTO meter + photos + grim spans (read by final.js)
  const EGGS = G.EGGS = []; const egg = (t, n, fire) => EGGS.push({ t, n, fire });
  const PTO = G.PTO = []; const PH = G.MED_PHOTOS = []; G.GRIM = [];

  // ---------------- L1–8 the alarm and the meme ----------------
  mood(1, 'modern'); K2.era(0, 'YOU', 'TODAY'); PTO.push({ a: t0(2, 0), b: t0(9, 0), v0: .4, v1: .07 });
  SFX(1, 4, 'buzz', .9, 2.2); SFX(1, 9, 'impact', .7); SFX(1, 9, 'thud', .5);
  C(1, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [880, 450, 1.6], 'inOut'], shake: lt > R(1, 3) && lt < R(1, 9) ? .25 : 0, bg: (g, t) => MD.bedroom(g, t, { ring: lt < R(1, 9) ? 1 : 0 }),
    act: (g, t) => { const up = lt > R(1, 9); P(g, 'viewer2@sit', 300, 470, .5, t, { pose: up ? 'facepalm' : 'idle', turn: .3, face: up ? { mouth: 'grit', eyes: 'half' } : { mouth: 'o', eyes: 'closed' } }); const sl = clamp((lt - R(1, 9) + .3) / .3); if (sl > 0 && sl < 1) { GX.hand(g, lerp(1300, 940, ease.out(sl)), 450, .45, 0, { kind: 'open', sleeve: '#3a9a8e' }); } GX.impact(g, 900, 460, clamp((lt - R(1, 9)) / .35), .7); },
    ui: c => DR.write(c, 'A MACHINE SCREAMED AT YOU', 640, 100, 50, lt, .3) })), 'dissolve');
  SFX(2, 2, 'pop', .5); SFX(2, 7, 'tick', .5);
  C(2, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#1e2430'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { g.save(); g.translate(640, 380); sh(g, '#15161c', 6, c => c.roundRect(-170, -300, 340, 600, 40)); sh(g, '#f4f6f8', 0, c => c.roundRect(-150, -270, 300, 540, 20));
      label(g, 'HR PORTAL', 0, -220, 30, '#2a5aa8'); label(g, 'PTO BALANCE', 0, -130, 28, '#5a6a80'); const n = Math.max(0, Math.round(lerp(6, 2, clamp((lt - .4) / 1.4)))); label(g, n + ' DAYS', 0, -40, 72, n < 3 ? '#e8382a' : '#15100c'); sh(g, '#dfe6ee', 0, c => c.roundRect(-110, 40, 220, 26, 13)); sh(g, n < 3 ? '#e8382a' : '#3ab88a', 0, c => c.roundRect(-110, 40, 220 * n / 15, 26, 13)); g.restore(); },
    ui: c => DR.write(c, 'DAYS OF PTO LEFT?', 640, 70, 46, lt, .2) })), 'whip');
  SFX(3, 1, 'buzz', .6);
  C(3, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.1]], dof: 5, bg: (g, t) => MD.bedroom(g, t, {}), act: (g, t) => head(g, 'viewer2', 640, 280, 1, t, { face: { mouth: 'frown', eyes: 'half', brows: 'worried' } }), ui: c => DR.write(c, "IT WASN'T ENOUGH.", 640, 640, 60, lt, .1) })), 'whip');
  // the meme (Bruegel-style harvesters, painted in the house style) scrolls past on a phone feed
  mood(4, 'pipe'); SFX(4, 3, 'swish', .6); SFX(4, 5, 'pop', .5);
  const harvesters = (g, x, y, w, h, t) => { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.fillStyle = '#e8d090'; g.fillRect(x, y, w, h); g.fillStyle = '#c8b070'; g.fillRect(x, y, w, h * .35); g.fillStyle = '#8aa070'; g.beginPath(); g.moveTo(x, y + h * .35); g.quadraticCurveTo(x + w / 2, y + h * .25, x + w, y + h * .4); g.lineTo(x + w, y + h * .5); g.lineTo(x, y + h * .5); g.fill();
    g.fillStyle = '#d8b050'; g.fillRect(x, y + h * .5, w, h * .5); for (let i = 0; i < 40; i++) ln(g, [[x + (i * 37) % w, y + h * .55 + (i * 13) % (h * .4)], [x + (i * 37) % w + 2, y + h * .5 + (i * 13) % (h * .4)]], 2, '#a8803a');
    { const tx = x + w * .45, ty = y + h * .72; sh(g, '#5a3a22', 3, c => c.rect(tx - 8, ty - 90, 16, 90)); for (const [dx, dy, r] of [[0, -130, 60], [-44, -100, 44], [44, -100, 44]]) sh(g, '#4a6a3a', 3, c => c.arc(tx + dx, ty + dy, r, 0, TAU)); } for (let i = 0; i < 4; i++) G.P(g, ['vill1', 'vill4', 'vill2', 'vill5'][i], x + w * (.15 + i * .2), y + h * .95, h / 1900, t + i, { pose: i === 2 ? 'idle' : 'presentL', turn: .4 }); G.P(g, 'vill3@sit', x + w * .62, y + h * .85, h / 2000, t, { pose: 'idle', headTilt: .3, face: { eyes: 'closed', mouth: 'o' } }); g.restore(); };
  C(4, 3, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#e8ecf0'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const sc = 700 - ease.out(clamp(lt / .8)) * 640; g.save(); g.translate(0, sc - 60);
      for (const [yy, kind] of [[0, 'post'], [560, 'meme'], [1120, 'post']]) { card(g, 640, 300 + yy, 620, 520, '#fff', 10); g.fillStyle = '#5a6a80'; g.beginPath(); g.arc(380, 80 + yy, 22, 0, TAU); g.fill(); g.font = '700 22px sans-serif'; g.fillStyle = '#15100c'; g.textAlign = 'left'; g.fillText(kind === 'meme' ? 'history_memes_lol' : 'some_guy', 412, 88 + yy);
        if (kind === 'meme') { harvesters(g, 350, 120 + yy, 580, 330, t); g.font = '900 30px Impact, Anton, sans-serif'; g.textAlign = 'center'; g.lineWidth = 7; g.strokeStyle = '#000'; g.fillStyle = '#fff'; g.strokeText('MEDIEVAL PEASANTS WORKED', 640, 160 + yy); g.fillText('MEDIEVAL PEASANTS WORKED', 640, 160 + yy); g.strokeText('150 DAYS A YEAR', 640, 430 + yy); g.fillText('150 DAYS A YEAR', 640, 430 + yy); g.fillStyle = '#e8382a'; g.font = '700 22px sans-serif'; g.fillText('♥ 412K   ↻ 88K', 640, 500 + yy); }
        else { g.fillStyle = '#dfe6ee'; g.fillRect(360, 120 + yy, 560, 330); } } g.restore(); } })), 'whipL');
  SFX(5, 0, 'pop', .6); SFX(6, 0, 'pop', .6); SFX(7, 0, 'pop', .6); SFX(7, 1, 'boing', .3);
  C(5, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#d8a840', '#f6d88a'), act: (g, t) => { const r0 = t0(5, 0), s0 = R(5, 0); [[t0(5, 0), 'FEWER WORK DAYS', '#2a8a4a'], [t0(6, 0), 'TONS OF HOLIDAYS', '#2a5aa8'], [t0(7, 0), 'AFTERNOON NAPS', '#7a3aa8']].forEach(([tt, s, col], i) => { const k = GX.pop(lt, tt - r0 + s0, .3); if (k <= 0) return; g.save(); g.translate(330, 200 + i * 150); g.scale(k, k); g.rotate(-.03 + i * .02); card(g, 0, 0, 440, 110, '#fff'); label(g, '✓', -170, 2, 60, col); label(g, s, 30, 4, 34, '#15100c'); g.restore(); });
      G.P(g, 'hugh@sit', 940, 600, .55, t, { pose: 'idle', headTilt: lt > t0(7, 0) - r0 ? .35 : 0, face: lt > t0(7, 0) - r0 ? { eyes: 'closed', mouth: 'o' } : { mouth: 'grin', eyes: 'happy' } }); sh(g, '#d8b860', 3, c => c.ellipse(940, 610, 160, 30, 0, 0, TAU)); if (lt > t0(7, 0) - r0) label(g, 'z z z', 1040, 360 - (lt * 30) % 40, 40, '#fff'); },
    ui: c => DR.write(c, 'THE INTERNET SAYS…', 640, 70, 48, lt, .1) })), 'whip');
  SFX(8, 2, 'tada', .5); SFX(8, 6, 'card', .6);
  C(8, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { G.P(g, 'hugh', 330, 740, .7, t, { pose: 'thumbsUp', turn: .4, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => DR.statCard(c, { name: 'BENEFITS PACKAGE', cls: 'A MEDIEVAL SERF (ACCORDING TO MEMES)', who: 'hugh', stats: [['HOLIDAYS', 5], ['NAPS', 5], ['DENTAL', 0]] }, 860, 340, lt, R(8, 5)) })), 'whip');

  // ---------------- L9–13 meet Hugh ----------------
  mood(9, 'pipe'); SFX(9, 1, 'whoosh', .6); K2.era(t0(10, 0), 'ALWALTON', '1279');
  C(9, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const k = clamp(lt / 1.2); g.save(); g.translate(640, 360); g.rotate(-k * 6); g.scale(1 - k * .6, 1 - k * .6); sh(g, '#f6efe0', 6, c => c.roundRect(-300, -200, 600, 400, 20)); label(g, '150 DAYS?', 0, 0, 90, '#c8281e'); g.restore(); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + lt * 3; ln(g, [[640 + Math.cos(a) * 200 * k, 360 + Math.sin(a) * 200 * k], [640 + Math.cos(a) * 600 * k, 360 + Math.sin(a) * 600 * k]], 4, 'rgba(255,255,255,.4)'); } },
    ui: c => DR.write(c, "LET'S CHECK.", 640, 600, 70, lt, .2, { col: '#f2d23a' }) })), 'zoom');
  SFX(10, 1, 'tada', .6); AMB(10, 'birds', 14, .6);
  C(10, null, S((lt, R, t) => ({ cam: [[640, 400, 1.3], [640, 420, 1.0], 'out'], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => { G.P(g, 'hugh', 640, 712, .62, t, { pose: 'wave', face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'MEET HUGH.', 640, 110, 76, lt, R(10, 1) - .1); DR.yearTag(c, 'ALWALTON · 1279', lt, .6); } })), 'whip');
  SFX(11, 0, 'card', .6); SFX(11, 4, 'stamp', .7);
  C(11, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.14]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => G.P(g, 'hugh', 420, 740, .7, t, { pose: 'present', turn: .5, face: { mouth: 'smile' } }),
    ui: c => { DR.write(c, 'HUGH MILLER', 420, 120, 60, lt, .1); DR.sign(c, 'A REAL PERSON', 900, 300, lt, R(11, 4), { size: 46, fill: '#2a8a4a' }); } })), 'whip');
  SFX(12, 5, 'paper', .7); SFX(12, 12, 'stamp', .6);
  C(12, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a5a1e', '#a86a2e'), act: (g, t) => { parchment(g, 640, 360, 640, 420, clamp((lt - .2) / 2.4), { title: 'Alwalton · Rotuli Hundredorum', lines: 11, seal: true }); const k = clamp((lt - R(12, 5)) / .5); g.fillStyle = `rgba(255,220,60,${.45 * k})`; g.fillRect(352, 236, 560 * k, 40); },
    ui: c => { DR.write(c, 'ONE PARAGRAPH', 640, 110, 50, lt, R(12, 5)); DR.yearTag(c, 'ROYAL SURVEY · 1279', lt, R(12, 10)); } })), 'whip');
  SFX(13, 6, 'stamp', .8);
  C(13, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { parchment(g, 640, 360, 640, 420, 1, { title: 'Alwalton · Rotuli Hundredorum', lines: 11, seal: true }); },
    ui: c => { if (lt > R(13, 6) - .2) DR.sign(c, 'EMPLOYMENT CONTRACT', 640, 360, lt, R(13, 6) - .2, { size: 54, rot: -.08 }); } })), 'whip');

  // ---------------- L14–28 skit 1: Hugh asks the abbot for time off ----------------
  mood(14, 'comic'); AMB(14, 'court', 30, .35); SFX(14, 0, 'card', .5);
  const skit1 = (wh, face1, face2, pose1, pose2, bub, bx) => S((lt, R, t, dur) => ({ cam: [[640, 400, 1.08], [640, 400, 1.13]], bg: (g, t) => MD.abbotHall(g, t),
    act: (g, t) => { G.P(g, 'hugh', 380, 760, .76, t, { pose: pose1 || 'idle', turn: .5, talk: wh === 'h' ? talk(lt, 0, dur - .2) : 0, face: face1 }); G.P(g, 'abbot@sit', 870, 560, .72, t, { pose: pose2 || 'idle', turn: -.4, talk: wh === 'a' ? talk(lt, 0, dur - .2) : 0, face: face2 }); },
    ui: c => { skitCard(c, lt); if (bub) GX.bubble(c, bub, bx || (wh === 'h' ? 380 : 880), 160, lt, .05, wh === 'h' ? 400 : 860, 260, { size: 32 }); } }));
  C(14, null, skit1('h', { mouth: 'grin', eyes: 'happy' }, { mouth: 'flat', eyes: 'half' }, 'wave', 'crossed', "HI. I'D LIKE TO REQUEST\nSOME TIME OFF."), 'whip');
  SFX(16, 0, 'chime', .4); SFX(17, 3, 'pop', .5); SFX(17, 7, 'pop', .5); SFX(17, 11, 'pop', .5);
  C(16, null, S((lt, R, t, dur) => ({ cam: [[640, 400, 1.08], [700, 400, 1.13]], bg: (g, t) => MD.abbotHall(g, t), act: (g, t) => { G.P(g, 'hugh', 380, 760, .76, t, { pose: 'idle', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }); G.P(g, 'abbot@sit', 870, 560, .72, t, { pose: 'present', turn: -.4, talk: talk(lt, 0, dur), face: { mouth: 'smile', eyes: 'half' } }); },
    ui: c => { skitCard(c, lt); const b = t0(17, 0) - t0(16, 0); [['CHRISTMAS', 5], ['EASTER', 8], ['WHITSUN', 12]].forEach(([s, k], i) => { if (lt > b + R(17, k) - R(17, 0) - .2) DR.callout(c, '1 WEEK · ' + s, 300 + i * 340, 150, lt, b + R(17, k) - R(17, 0) - .2, null, null, { size: 28 }); }); } })), 'whip');
  SFX(18, 0, 'tada', .4);
  C(18, null, skit1('h', { mouth: 'grin', eyes: 'happy', brows: 'up' }, { mouth: 'flat', eyes: 'half' }, 'cheer', 'crossed', 'GREAT! AND THE REST\nOF THE YEAR?'), 'whip');
  // the abbot's list: each item lands on Hugh's back
  SFX(20, 0, 'stamp', .7); SFX(20, 4, 'stamp', .6); SFX(21, 1, 'stamp', .6); SFX(22, 1, 'pop', .6); SFX(23, 2, 'pop', .6);
  C(20, null, S((lt, R, t, dur) => { const tt = n => t0(n, 0) - t0(20, 0); return { cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MD.abbotHall(g, t),
    act: (g, t) => { const n = [tt(20), tt(21), tt(22), tt(23)].filter(v => lt > v).length, sag = n * .06; G.P(g, 'hugh', 380, 760 + n * 6, .76, t, { pose: 'idle', turn: .5, lean: sag, face: { mouth: n > 2 ? 'o' : 'flat', eyes: n > 2 ? 'wide' : 'open', sweat: n > 1 } });
      G.P(g, 'abbot@sit', 870, 560, .72, t, { pose: 'pointSideL', turn: -.4, talk: talk(lt, 0, dur), face: { mouth: 'smirk', brows: 'sly' } });
      if (lt > tt(22)) { FA.chicken(g, 300, 520, .35, t, { dir: 1 }); FA.chicken(g, 360, 512, .35, t, { dir: -1, ph: 1 }); FA.chicken(g, 420, 520, .35, t, { dir: 1, ph: 2 }); } if (lt > tt(23)) F.rooster(g, 380, 460, .45, t, { dir: 1, crow: true }); },
    ui: c => { skitCard(c, lt); [[tt(20), '3 DAYS A WEEK · EVERY WEEK'], [tt(21), '+ 2 MEN EVERY DAY AT HARVEST'], [tt(22), '+ 3 HENS'], [tt(23), '+ A ROOSTER']].forEach(([a, s], i) => { if (lt > a) DR.callout(c, s, 900, 120 + i * 62, lt, a, null, null, { size: 26, fill: i ? '#fff' : '#ffe0e0' }); }); } }; }), 'whip');
  egg(t0(25, 1), 0); SFX(24, 0, 'boing', .5);
  C(24, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.1]], dof: 6, bg: (g, t) => MD.abbotHall(g, t), act: (g, t) => head(g, 'hugh', 640, 270, 1, t, { face: { mouth: 'flat', eyes: 'half', brows: 'skeptic' } }), ui: c => { skitCard(c, lt); GX.bubble(c, '…A ROOSTER.', 640, 120, lt, .05, 640, 200, { size: 40 }); } })), 'zoom');
  for (let i = 0; i < 5; i++) G.SFXat(t0(25, 1) + i * .14, 'pop', .5);
  C(25, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8c060', '#f8e098'), act: (g, t) => { eggRow(g, 640, 380, 5, 1.6, lt - R(25, 1)); G.P(g, 'abbot', 1100, 760, .5, t, { pose: 'present', turn: -.5, face: { mouth: 'smirk' } }); }, ui: c => { skitCard(c, lt); DR.write(c, 'AND 5 EGGS AT EASTER', 640, 140, 56, lt, R(25, 1)); } })), 'flash');
  for (let i = 0; i < 5; i++) egg(t0(25, 1) + i * .14, i + 1);
  SFX(26, 3, 'paper', .5);
  C(26, null, skit1('h', { mouth: 'flat', eyes: 'half', brows: 'skeptic' }, { mouth: 'smirk', brows: 'sly' }, 'pointSide', 'crossed', 'CAN I GET THAT\nIN WRITING?'), 'whip');
  SFX(27, 1, 'paper', .8); SFX(28, 3, 'sting', .5);
  C(27, null, S((lt, R, t, dur) => ({ cam: [[640, 400, 1.05], [760, 380, 1.15]], bg: (g, t) => MD.abbotHall(g, t), act: (g, t) => { G.P(g, 'hugh', 380, 760, .76, t, { pose: 'shrug', turn: .5, face: { mouth: 'o', eyes: 'wide' } }); G.P(g, 'abbot@sit', 870, 560, .72, t, { pose: 'presentL', turn: -.4, talk: talk(lt, 0, dur), face: { mouth: 'grin', eyes: 'happy' } }); parchment(g, 640, 430, 200, 140, 1, { lines: 6 }); },
    ui: c => { skitCard(c, lt); GX.bubble(c, "IT'S LITERALLY IN WRITING.", 880, 140, lt, .05, 860, 240, { size: 30 }); const b = t0(28, 0) - t0(27, 0); if (lt > b) GX.bubble(c, "THAT'S HOW THEY FOUND YOU.", 640, 250, lt, b, 640, 380, { size: 30, fill: '#fff3c8' }); } })), 'whip');

  // ---------------- L29–36 the question + the roadmap + CTA ----------------
  mood(29, 'curious'); EP.ticket('DID THEY WORK LESS THAN YOU?', t0(29, 3), t0(37, 0), 9e9, true);
  C(29, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { G.P(g, 'hugh', 380, 740, .62, t, { pose: 'crossed', turn: .5, face: { mouth: 'flat', brows: 'skeptic' } }); G.P(g, 'viewer2', 900, 740, .62, t, { pose: 'crossed', turn: -.5, face: { mouth: 'flat', brows: 'skeptic' } }); label(g, 'VS', 640, 470, 90, '#f2d23a'); },
    ui: c => DR.write(c, 'WHO WORKED MORE?', 640, 100, 56, lt, .2) })), 'whip');
  SFX(30, 4, 'ding', .6); SFX(30, 5, 'buzz', .6); SFX(30, 8, 'boing', .5);
  C(30, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { [['YES', 4, '#2a8a4a'], ['NO', 5, '#c8281e'], ['IT DEPENDS', 8, '#e8862a']].forEach(([s, k, col], i) => { const p = GX.pop(lt, R(30, k) - .1, .3); if (p <= 0) return; g.save(); g.translate(280 + i * 360, 380); g.scale(p, p); g.rotate((i - 1) * .06); card(g, 0, 0, 300, 160, col); label(g, s, 0, 4, i === 2 ? 44 : 70, '#fff'); g.restore(); }); },
    ui: c => { if (lt > R(30, 9)) DR.write(c, '…ON WHAT YEAR YOU ASK', 640, 600, 50, lt, R(30, 9)); } })), 'whip');
  // the roadmap: four mystery cards flip on their words
  const RM = [['RENT IN EGGS', 9, 'egg'], ['A COURT THAT FINED LATENESS', 18, 'gavel'], ['3 RUINED HARVESTS', 24, 'rain'], ['THE STRANGEST PAY RAISE', 29, 'coin']];
  RM.forEach(([, k]) => SFX(31, k, 'card', .6));
  C(31, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { RM.forEach(([lab, k, ic], i) => { const x = 200 + i * 290, y = 380, fl = clamp((lt - R(31, k) + .2) / .35), sx = Math.abs(Math.cos(fl * PI)), front = fl > .5;
      g.save(); g.translate(x, y + Math.sin(t * 2 + i) * 4); g.scale(Math.max(.05, sx), 1); g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(-112, -152, 240, 320); g.fillStyle = front ? '#f4ead4' : '#3a3650'; g.fillRect(-120, -160, 240, 320); g.lineWidth = 6; g.strokeStyle = '#d8b04a'; g.strokeRect(-114, -154, 228, 308);
      if (front) { if (ic === 'egg') eggRow(g, 0, -30, 3, .9, 9); else if (ic === 'gavel') { g.save(); g.rotate(-.5); sh(g, '#6a4a2a', 4, c => c.rect(-10, -40, 20, 110)); sh(g, '#6a4a2a', 4, c => c.roundRect(-50, -70, 100, 40, 10)); g.restore(); } else if (ic === 'rain') { sh(g, '#6a7480', 4, c => c.ellipse(0, -60, 70, 36, 0, 0, TAU)); for (let j = 0; j < 6; j++) ln(g, [[-50 + j * 20, -20], [-56 + j * 20, 20]], 4, '#5ab0e8'); } else { sh(g, '#f2c43a', 5, c => c.arc(0, -30, 56, 0, TAU)); label(g, '↑', 0, -30, 70, '#8a5a10'); }
        g.font = MK(lab.length > 18 ? 20 : 24); g.fillStyle = '#15100c'; g.textAlign = 'center'; lab.split(' ').reduce((a, w) => { const l = a[a.length - 1]; if ((l + ' ' + w).length > 14) a.push(w); else a[a.length - 1] = (l + ' ' + w).trim(); return a; }, ['']).forEach((l, j) => g.fillText(l, 0, 70 + j * 28)); }
      else { label(g, '?', 0, 0, 120, 'rgba(255,255,255,.4)'); } g.restore(); }); },
    ui: c => DR.write(c, 'TO GET THERE, WE NEED…', 640, 90, 48, lt, .1) })), 'whip');
  // CTA #1 — subscribe (a scribe signs the button with a quill)
  mood(32, 'warm'); SFX(32, 9, 'paper', .5); SFX(32, 16, 'ding', .7); SFX(33, 1, 'pop', .5); SFX(34, 1, 'boing', .5);
  C(32, null, S((lt, R, t) => ({ cam: [[640, 400, 1.04], [640, 400, 1.1]], bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { G.P(g, 'clerk@sit', 340, 470, .6, t, { pose: 'present', turn: .5, face: { mouth: 'smile', eyes: 'half' } });
      for (let i = 0; i < 4; i++) { g.save(); g.translate(760 + (i % 2) * 40, 300 - i * 30); g.rotate((i - 1.5) * .1); sh(g, '#e8dcb8', 3, c => c.rect(-80, -50, 160, 100)); g.fillStyle = 'rgba(60,40,20,.5)'; for (let l = 0; l < 6; l++) g.fillRect(-64, -36 + l * 14, 128, 4); g.restore(); }
      const k = GX.pop(lt, R(32, 16) - .3, .35); if (k > 0) { g.save(); g.translate(880, 560); g.scale(k, k); sh(g, '#c8281e', 6, c => c.roundRect(-180, -50, 360, 100, 20)); label(g, 'SUBSCRIBE', 0, 4, 54, '#fff'); g.restore(); } },
    ui: c => { DR.callout(c, 'THE BORING DOCUMENTS', 760, 100, lt, R(32, 9), 760, 240, { screen: true }); if (lt > t0(33, 0) - t0(32, 0)) DR.write(c, "IT'S FREE.", 900, 680, 46, lt, t0(33, 0) - t0(32, 0)); if (lt > t0(34, 0) - t0(32, 0)) DR.callout(c, 'NO EGGS REQUIRED', 400, 160, lt, t0(34, 0) - t0(32, 0), null, null, { fill: '#fff3c8' }); } })), 'whip');
  SFX(35, 0, 'whoosh', .7); SFX(36, 2, 'gong', .5);
  C(35, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const y = Math.round(lerp(2026, 1279, ease.inOut(clamp(lt / 1.6)))); label(g, String(y), 640, 330, 180, '#f2d23a'); for (let i = 0; i < 14; i++) { const a = i / 14 * TAU + lt * 2; ln(g, [[640 + Math.cos(a) * 260, 330 + Math.sin(a) * 160], [640 + Math.cos(a) * 640, 330 + Math.sin(a) * 400]], 4, 'rgba(255,255,255,.25)'); } },
    ui: c => DR.write(c, 'BACK TO 1279', 640, 560, 60, lt, .3) })), 'zoom');

  // ---------------- L37–69 the world before ----------------
  mood(37, 'medieval'); K2.era(t0(37, 0), 'ENGLAND', 'c. 1300');
  C(37, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.06]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => { G.P(g, 'hugh', 640, 712, .5, t, { pose: 'shrug', face: { mouth: 'flat', brows: 'up' } }); },
    ui: c => { DR.write(c, "WHO OWNED HUGH'S WEEK?", 640, 100, 50, lt, R(37, 10) - .4); } })), 'dissolve');
  SFX(38, 2, 'whoosh', .5);
  C(38, null, S((lt, R, t) => { const v = M.fly(lt, [[0, -2, 53, 9], [2.5, -.3, 52.6, 22]]); return { bg: g => DR.map(g, t, v), act: (g, t) => { const r = rng(9); for (let i = 0; i < 60; i++) { const [x, y] = M.pt(v, -4.5 + r() * 6.2, 50.8 + r() * 4); const k = clamp((lt - .4 - i * .02) / .3); if (k > 0) { g.fillStyle = '#8a5a2a'; g.beginPath(); g.arc(x, y, 4 * k, 0, TAU); g.fill(); } } if (lt > 1.6) DR.mapPin(g, v, -.38, 52.57, lt, 1.6); },
    ui: c => { DR.mapWrite(c, v, -1.5, 52.4, 'ENGLAND', lt, .2, { dy: 0, size: 60 }); if (lt > 1.6) DR.mapWrite(c, v, -.38, 52.57, 'ALWALTON', lt, 1.7, { dy: 46, size: 30 }); DR.write(c, 'A COUNTRY OF VILLAGES', 640, 660, 46, lt, R(38, 6)); } }; }), 'whip');
  SFX(39, 2, 'boing', .4);
  C(39, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { const p = Math.sin(lt * 5) * 10; G.P(g, 'clerk', 400 + p, 750, .62, t, { pose: 'pointSide', turn: .6, face: { mouth: 'open', brows: 'angry' } }); G.P(g, 'monk', 880 - p, 750, .62, t, { pose: 'pointSideL', turn: -.6, face: { mouth: 'grit', brows: 'angry' } }); },
    ui: c => { DR.write(c, 'HOW MANY PEOPLE?', 640, 100, 56, lt, .1); if (lt > t0(40, 0) - t0(39, 0)) { GX.bubble(c, '4.5 MILLION!', 330, 240, lt, t0(40, 0) - t0(39, 0), 400, 340, { size: 30 }); GX.bubble(c, '7 MILLION!', 960, 240, lt, t0(40, 0) - t0(39, 0) + .4, 880, 340, { size: 30 }); } } })), 'whip');
  SFX(41, 11, 'tick', .6); SFX(41, 18, 'tick', .6);
  C(41, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const a = ease.out(clamp((lt - R(41, 10) + .3) / .8)), b = ease.out(clamp((lt - R(41, 17) + .3) / .8)); g.fillStyle = '#7ae8a0'; g.fillRect(220, 470 - 200 * a, 260, 200 * a); g.fillStyle = '#e8c870'; g.fillRect(800, 470 - 310 * b, 260, 310 * b); ln(g, [[160, 470], [1120, 470]], 6, '#fff');
      label(g, '4.5 M', 350, 440 - 200 * a, 44, '#fff'); label(g, '7 M', 930, 440 - 310 * b, 44, '#fff'); label(g, 'LOW ESTIMATE', 350, 510, 26, '#fff'); label(g, 'HIGH ESTIMATE', 930, 510, 26, '#fff'); },
    ui: c => { DR.write(c, 'PEAK, BEFORE 1315', 640, 90, 50, lt, .1); DR.callout(c, 'DEBATED', 640, 620, lt, R(41, 19), null, null, { fill: '#fff3c8' }); } })), 'whip');
  SFX(42, 9, 'pop', .5); SFX(42, 20, 'pop', .5);
  C(42, null, S((lt, R, t) => { const v = M.view(-50, 42, 6.5); return { bg: g => DR.map(g, t, v), act: (g, t) => { const k = clamp((lt - R(42, 18)) / 1.2); const [ex, ey] = M.pt(v, -1.5, 52.4), [ax, ay] = M.pt(v, -86.8, 32.8); M.zone(g, v, [[-5.7, 50], [1.8, 51], [1.8, 53], [-.2, 55.8], [-3, 55.8], [-5.2, 53.3], [-4.5, 51.5]], '#c8281e', .6); M.zone(g, v, [[-88.5, 35], [-85, 35], [-85, 31], [-87.6, 31], [-88.4, 30.2]], '#2a5aa8', .6 * k);
      g.setLineDash([10, 8]); g.strokeStyle = '#15100c'; g.lineWidth = 4; g.beginPath(); g.moveTo(ex, ey); g.quadraticCurveTo((ex + ax) / 2, ey - 140, ax, ay); g.stroke(); g.setLineDash([]); if (lt > R(42, 8)) DR.mapPin(g, v, -87.6, 41.9, lt, R(42, 8)); },
    ui: c => { DR.mapWrite(c, v, -1.5, 52.4, 'ENGLAND', lt, .1, { dy: -50, size: 40 }); if (lt > R(42, 8)) DR.mapWrite(c, v, -87.6, 41.9, 'CHICAGO AREA', lt, R(42, 9), { dy: -46, size: 32 }); if (lt > R(42, 18)) DR.mapWrite(c, v, -86.8, 32.8, 'ALABAMA', lt, R(42, 20), { dy: 40, size: 32 }); DR.write(c, 'SAME SIZE · FEWER PEOPLE THAN CHICAGO', 640, 660, 40, lt, R(42, 14)); } }; }), 'whip');
  SFX(44, 0, 'stamp', .7);
  C(43, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: (g, t) => MD.demesne(g, t, {}), ui: c => { DR.write(c, 'ALMOST EVERYONE: ONE JOB', 640, 90, 50, lt, .1); if (lt > t0(44, 0) - t0(43, 0)) DR.sign(c, 'FARMING', 640, 200, lt, t0(44, 0) - t0(43, 0), { size: 60, fill: '#5a7a44' }); } })), 'whip');
  SFX(45, 1, 'buzz', .5); SFX(46, 1, 'buzz', .5);
  C(45, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { const b = t0(46, 0) - t0(45, 0); [[0, 'FACTORY', 330], [b, 'OFFICE', 950]].forEach(([a, s, x]) => { const k = GX.pop(lt, a, .3); if (k <= 0) return; g.save(); g.translate(x, 400); g.scale(k, k);
      if (s === 'FACTORY') { sh(g, '#8a6a5a', 5, c => { c.moveTo(-160, 120); c.lineTo(-160, -20); c.lineTo(-80, -80); c.lineTo(-80, -20); c.lineTo(0, -80); c.lineTo(0, -20); c.lineTo(80, -80); c.lineTo(80, 120); c.closePath(); }); sh(g, '#6a5a4a', 4, c => c.rect(110, -160, 40, 280)); } else { sh(g, '#9ab0c8', 5, c => c.rect(-110, -160, 220, 280)); for (let i = 0; i < 12; i++) sh(g, '#e8f0f8', 2, c => c.rect(-90 + (i % 3) * 64, -140 + Math.floor(i / 3) * 64, 44, 44)); }
      label(g, s, 0, 160, 40, '#fff'); g.strokeStyle = '#c8281e'; g.lineWidth = 20; g.lineCap = 'round'; const kk = clamp((lt - a - .3) / .3); g.beginPath(); g.moveTo(-170, -170); g.lineTo(-170 + 340 * kk, -170 + 340 * kk); g.stroke(); g.restore(); }); } })), 'whip');
  SFX(47, 1, 'thud', .6); SFX(48, 5, 'stamp', .7);
  C(47, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 380, 1.0]], bg: (g, t) => MD.strips(g, t), ui: c => { DR.write(c, 'LAND IS THE JOB', 640, 120, 66, lt, .1); if (lt > t0(48, 0) - t0(47, 0)) DR.sign(c, 'OWN THE LAND = OWN THE JOB', 640, 600, lt, t0(48, 0) - t0(47, 0), { size: 40 }); } })), 'whip');
  SFX(49, 4, 'tada', .5); SFX(50, 2, 'pop', .5); SFX(50, 5, 'pop', .5); SFX(50, 10, 'bell', .6);
  C(49, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), act: (g, t) => { const b = t0(50, 0) - t0(49, 0), r50 = k => b + R(50, k) - R(50, 0); [['edward1', r50(2), 'A KNIGHT'], ['steward', r50(5), 'A BARON'], ['abbot', r50(10), 'A MONASTERY']].forEach(([w, a, s], i) => { const k = GX.pop(lt, a - .1, .3); if (k <= 0) return; g.save(); g.translate(260 + i * 380, 0); g.scale(k, 1); G.P(g, w, 0, 690, .55, t, { pose: 'hips', face: { mouth: 'smirk' }, hat: w === 'edward1' ? 'cavHelmet' : undefined, outfit: w === 'edward1' ? 'tunicRed' : undefined }); label(g, s, 0, 330, 36, '#fff'); g.restore(); }); },
    ui: c => DR.write(c, 'THE LORD', 640, 100, 70, lt, R(49, 4) - .2) })), 'whip');
  SFX(51, 3, 'bell', .7); SFX(51, 6, 'card', .6);
  C(51, null, S((lt, R, t) => ({ cam: [[640, 380, 1.1], [640, 360, 1.02]], bg: (g, t) => MD.abbey(g, t), ui: c => { DR.write(c, 'THE ABBOT OF PETERBOROUGH', 640, 90, 50, lt, R(51, 3)); DR.callout(c, 'BIG · RICH · BENEDICTINE', 640, 660, lt, R(51, 11), null, null, { size: 30 }); } })), 'dissolve');
  PH.push([51, 52, 'peterborough', 1100, 420, 210, .06, 'PETERBOROUGH TODAY']);
  // the manor as an org chart
  SFX(52, 3, 'pop', .6); SFX(53, 6, 'card', .6);
  const org = (g, t, lt, k) => { const nodes = [[640, 140, 'abbot', 'THE LORD'], [640, 300, 'steward', 'STEWARD'], [640, 430, 'reeve', 'REEVE']]; ln(g, [[640, 200], [640, 250]], 6, '#fff'); ln(g, [[640, 360], [640, 390]], 6, '#fff');
    nodes.forEach(([x, y, w, s], i) => { const p = GX.pop(lt, i * .3, .3); if (p <= 0) return; g.save(); g.translate(x, y); g.scale(p, p); card(g, 0, 0, 300, 100, '#f6efe0'); g.save(); g.beginPath(); g.arc(-110, 0, 40, 0, TAU); g.clip(); g.fillStyle = '#e8dcc0'; g.fillRect(-150, -40, 80, 80); G.P(g, w, -110, 120, .26, t, {}); g.restore(); label(g, s, 40, 4, 32); g.restore(); });
    ln(g, [[160, 510], [1120, 510]], 6, '#fff'); for (let i = 0; i < 9; i++) { const p = GX.pop(lt, 1 + i * .1, .25); if (p <= 0) continue; const x = 200 + i * 110; ln(g, [[x, 510], [x, 540]], 4, '#fff'); g.save(); g.translate(x, 600); g.scale(p * .6, p * .6); sh(g, '#e8d8b0', 3, c => c.rect(-60, -50, 120, 60)); sh(g, '#b8944a', 3, c => { c.moveTo(-76, -46); c.lineTo(0, -110); c.lineTo(76, -46); c.closePath(); }); g.restore(); } };
  C(52, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => org(g, t, lt), ui: c => { DR.write(c, 'THE MANOR = A BUSINESS', 640, 690, 46, lt, t0(53, 0) - t0(52, 0)); } })), 'whip');
  SFX(54, 7, 'stamp', .6); SFX(55, 2, 'ding', .5); SFX(56, 6, 'pencil', .5, 1.4);
  C(54, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 380, 1.04]], bg: (g, t) => MD.strips(g, t), act: (g, t) => { const k = clamp((lt - .2) / .5); g.strokeStyle = '#f2d23a'; g.lineWidth = 10; g.setLineDash([16, 10]); g.strokeRect(570, 30, 700 * k, 280); g.setLineDash([]); const b = t0(56, 0) - t0(54, 0); if (lt > b) { const k2 = clamp((lt - b) / 1); g.strokeStyle = '#3ab0e8'; g.lineWidth = 8; for (let i = 0; i < 5; i++) { g.strokeRect(-100 + i * 26, 400 + i * 50, 560 * k2, 22); } } },
    ui: c => { DR.write(c, 'THE DEMESNE (de-MAIN)', 900, 360, 44, lt, R(54, 7) - .2); if (lt > t0(55, 0) - t0(54, 0)) DR.callout(c, 'THE COMPANY FARM', 900, 420, lt, t0(55, 0) - t0(54, 0)); if (lt > t0(56, 0) - t0(54, 0)) DR.callout(c, "HUGH'S RENTED STRIPS", 300, 360, lt, t0(56, 0) - t0(54, 0) + .4, null, null, { fill: '#e0f2ff' }); } })), 'whip');
  // free vs unfree
  mood(57, 'curious'); SFX(57, 3, 'whoosh', .5); SFX(58, 3, 'chime', .5); SFX(59, 8, 'footsteps', .5, 1.2); SFX(60, 6, 'clink', .7);
  C(57, null, S((lt, R, t) => { const b = n => t0(n, 0) - t0(57, 0); return { bg: g => { g.fillStyle = '#f2e6c8'; g.fillRect(-300, -300, 1900, 1400); g.fillStyle = '#c8e0b0'; g.fillRect(-300, -300, 940, 1400); g.fillStyle = '#d8c0c0'; g.fillRect(640, -300, 940, 1400); ln(g, [[640, 0], [640, 720]], 10, '#15100c'); },
    act: (g, t) => { const lv = clamp((lt - b(59) - R(59, 6) + R(59, 0)) / 1.4); G.P(g, 'vill2', lerp(320, -100, lv), 720, .6, t, { pose: lv > 0 ? 'wave' : 'present', walk: lv > 0 ? t * 6 : 0, turn: lv > 0 ? -.8 : .3, face: { mouth: 'grin', eyes: 'happy' } }); if (lt > b(59) - .2) { sh(g, '#f2c43a', 3, c => c.ellipse(lerp(420, 0, lv), 520, 24, 10, 0, 0, TAU)); }
      if (lt > b(60)) { G.P(g, 'hugh', 960, 720, .6, t, { pose: 'idle', turn: -.3, face: { mouth: 'frown', brows: 'worried' } }); const k = clamp((lt - b(60) - R(60, 6) + R(60, 0)) / .3); ln(g, [[960, 700], [1180, 700]], 6, '#5a5a62'); sh(g, '#5a5a62', 4, c => c.arc(1180, 700, 20, 0, TAU)); sh(g, '#3a3a40', 4, c => c.ellipse(960, 700, 30 * k, 12 * k, 0, 0, TAU)); } },
    ui: c => { DR.write(c, 'FREE', 320, 100, 70, lt, b(58) - .2, { col: '#2a8a4a' }); if (lt > b(59)) DR.callout(c, 'PAYS IN MONEY · CAN LEAVE', 320, 200, lt, b(59)); if (lt > b(60)) DR.write(c, 'UNFREE', 960, 100, 70, lt, b(60) + R(60, 6) - R(60, 0) - .3, { col: '#c8281e' }); } }; }), 'whip');
  SFX(61, 2, 'card', .6);
  C(61, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.08]], dof: 6, bg: (g, t) => MD.village(g, t, {}), act: (g, t) => head(g, 'hugh', 640, 270, 1, t, { face: { mouth: 'flat', eyes: 'half' } }), ui: c => { DR.write(c, 'VILLEIN (VIL-in) = SERF', 640, 640, 54, lt, R(61, 2) - .2); } })), 'whip');
  SFX(62, 4, 'creak', .5); SFX(62, 7, 'boing', .6); SFX(63, 2, 'stamp', .8);
  C(62, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => { const k = clamp((lt - R(62, 6)) / 1.4), bounce = k > .7 ? Math.sin((k - .7) * 20) * 40 * (1 - k) : 0; G.P(g, 'hugh', lerp(500, 1000, Math.min(k, .7) / .7) - bounce, 712, .52, t, { walk: k < .7 ? t * 7 : 0, turn: .8, pose: k > .7 ? 'shrug' : 'idle', face: k > .7 ? { mouth: 'shock', eyes: 'wide' } : { mouth: 'grin' } });
      sh(g, '#8a6a3a', 3, c => c.ellipse(lerp(560, 1060, Math.min(k, .7) / .7), 560, 30, 26, 0, 0, TAU)); g.strokeStyle = 'rgba(200,40,30,.8)'; g.lineWidth = 8; g.setLineDash([20, 12]); g.beginPath(); g.moveTo(1080, 400); g.lineTo(1080, 720); g.stroke(); g.setLineDash([]); },
    ui: c => { DR.write(c, "CAN'T JUST MOVE AWAY", 640, 100, 52, lt, .1); if (lt > t0(63, 0) - t0(62, 0)) DR.sign(c, 'BELONGS TO THE MANOR', 640, 200, lt, t0(63, 0) - t0(62, 0), { size: 44 }); } })), 'whip');
  // the abbot wears four hats
  mood(64, 'comic'); [[65, 4, 'pop'], [66, 2, 'pop'], [67, 3, 'pop'], [68, 3, 'clink']].forEach(([n, k, s]) => SFX(n, k, s, .7));
  C(64, null, S((lt, R, t) => { const b = n => t0(n, 0) - t0(64, 0); return { bg: g => DR.sunburst(g, t, '#2a5a8a', '#3a6a9a'), act: (g, t) => { const hats = [[b(65), 'LANDLORD', '#2a8a4a'], [b(66), 'EMPLOYER', '#2a5aa8'], [b(66) + 1.6, 'TRAFFIC COURT', '#7a3aa8'], [b(67), 'HOA', '#e8862a']]; const n = hats.filter(h => lt > h[0]).length;
      G.P(g, 'abbot', 640, 760, .74, t, { pose: n > 3 ? 'hips' : 'present', face: { mouth: 'smirk', eyes: 'half', brows: 'sly' } }); hats.forEach(([a, s, col], i) => { const k = GX.pop(lt, a, .3); if (k <= 0) return; g.save(); g.translate(i % 2 ? 1000 : 280, 180 + Math.floor(i / 2) * 200); g.scale(k, k); card(g, 0, 0, 300, 90, col); label(g, s, 0, 4, 34, '#fff'); g.restore(); });
      if (lt > b(68)) { const k = clamp((lt - b(68)) / .4); g.strokeStyle = '#5a5a62'; g.lineWidth = 12; for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(140 + i * 125, 0); g.lineTo(140 + i * 125, 720 * k); g.stroke(); } } },
    ui: c => { DR.write(c, 'SO PICTURE THIS…', 640, 70, 44, lt, .1); if (lt > b(68)) DR.write(c, "…AND YOU CAN'T MOVE OUT", 640, 660, 50, lt, b(68)); } }; }), 'whip');
  SFX(69, 1, 'ding', .6);
  C(69, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 400, 1.26]], bg: (g, t) => MD.village(g, t, {}), act: (g, t) => G.P(g, 'hugh', 640, 740, .66, t, { pose: 'shrug', face: { mouth: 'flat', eyes: 'half' } }), ui: c => DR.write(c, "THAT'S HUGH.", 640, 120, 70, lt, .1) })), 'whip');

  // ---------------- L70–106 the Hundred Rolls deal ----------------
  mood(70, 'medieval'); K2.era(t0(70, 0), 'THE HUNDRED ROLLS', '1279'); SFX(70, 4, 'tada', .5); SFX(70, 8, 'gallop', .6, 2.5); SFX(70, 14, 'pencil', .6, 2);
  C(70, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MD.palace(g, t), act: (g, t) => G.P(g, 'edward1', 640, 760, .7, t, { pose: 'pointSide', turn: .4, face: { mouth: 'grit', brows: 'angry' } }), ui: c => { DR.write(c, 'KING EDWARD I', 640, 640, 56, lt, R(70, 4)); DR.yearTag(c, '1279', lt, .1); } })), 'whip');
  PH.push([70, 71, 'edward_i', 1110, 400, 170, .06, 'EDWARD I']);
  C(70, 8, S((lt, R, t) => { const v = M.view(-1.8, 52.6, 22); return { bg: g => DR.map(g, t, v), act: (g, t) => { const r = rng(4); for (let i = 0; i < 8; i++) { const k = clamp((lt - i * .12) / 2), a = r() * TAU, d = 1.2 + r() * 2; const [x, y] = M.pt(v, -.12 + Math.cos(a) * d * 1.6 * k, 51.5 + Math.sin(a) * d * k); FA.horse(g, x, y + 10, .16, t + i, { dir: Math.cos(a) > 0 ? 1 : -1, coat: '#5a3a22' }); } },
    ui: c => { DR.mapWrite(c, v, -.12, 51.5, 'LONDON', lt, .1, { dy: 40, size: 30 }); DR.callout(c, 'WHO HOLDS WHAT? WHAT DO THEY OWE?', 640, 640, lt, R(70, 14), null, null, { size: 30 }); } }; }), 'whip');
  SFX(71, 4, 'paper', .7);
  C(71, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.14]], bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { G.P(g, 'clerk@sit', 460, 470, .6, t, { pose: 'present', turn: .3, face: { mouth: 'flat', eyes: 'half', look: [0, .6] } }); G.P(g, 'monk@sit', 820, 470, .6, t, { pose: 'present', turn: -.3, face: { mouth: 'flat', eyes: 'half', look: [0, .6] } }); },
    ui: c => DR.write(c, 'THE HUNDRED ROLLS', 640, 100, 66, lt, R(71, 4) - .3) })), 'whip');
  PH.push([71, 72, 'hundred_rolls_2', 1110, 420, 180, .07, 'A COUNTY & ITS HUNDREDS']);
  SFX(72, 5, 'stamp', .6); SFX(72, 9, 'ding', .5);
  C(72, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a5a1e', '#a86a2e'), act: (g, t) => { parchment(g, 640, 360, 640, 420, 1, { title: 'Alwalton', lines: 11 }); const k = clamp((lt - R(72, 9)) / .5); g.fillStyle = `rgba(255,220,60,${.45 * k})`; g.fillRect(352, 236, 560 * k, 40); g.save(); g.translate(1020, 290); g.scale(k, k); G.P(g, 'hugh', 0, 200, .32, t, { pose: 'wave', face: { mouth: 'grin' } }); g.restore(); },
    ui: c => { if (lt > R(72, 9)) DR.callout(c, 'HUGH = THE EXAMPLE', 1020, 100, lt, R(72, 9)); } })), 'whip');
  for (let i = 0; i < 17; i++) G.SFXat(t0(73, 3) + i * .06, 'pop', .25);
  C(73, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.04]], bg: (g, t) => MD.village(g, t, {}), crowd: (t2, l2) => { const L = [['hugh', 640, 712, .44, {}]]; const n = Math.floor(clamp((l2 - R(73, 3)) / 1) * 17); const r = rng(73); for (let i = 0; i < n; i++) L.push([['vill1', 'vill2', 'vill3', 'vill6'][i % 4], 120 + (i * 61) % 1040, 600 + r() * 100, .3 + r() * .06, { spr: { pose: 'present' } }]); return L; },
    ui: c => DR.tally(c, '17', g => { g.fillStyle = '#8a6a44'; g.beginPath(); g.arc(0, -6, 7, 0, TAU); g.fill(); g.fillRect(-7, 2, 14, 12); }, 640, 110, lt, R(73, 3), { n: 17, label: '+17 OTHERS · SAME DEAL' }) })), 'whip');
  SFX(74, 3, 'paper', .5);
  // "the deal" on a manuscript-style ledger that fills in, item by item, with the egg counter
  const DEAL = [[75, 5, '3 DAYS A WEEK · ALL YEAR'], [76, 4, 'BREAKS: CHRISTMAS · EASTER · WHITSUN'], [77, 5, 'HARVEST: 2 MEN EVERY DAY'], [79, 1, '1 BUSHEL OF WHEAT'], [80, 0, '18 SHEAVES OF OATS'], [81, 0, '3 HENS'], [82, 0, '1 ROOSTER'], [83, 1, '5 EGGS AT EASTER']];
  DEAL.forEach(([n, k]) => SFX(n, k, 'pencil', .5, .6));
  C(74, null, S((lt, R, t) => { const b = (n, k) => t0(n, k) - t0(74, 0); return { cam: [[640, 360, 1.0], [640, 380, 1.06]], bg: g => { g.fillStyle = '#3a2618'; g.fillRect(-300, -300, 1900, 1400); },
    act: (g, t) => { g.save(); g.translate(640, 380); g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(-372, -312, 760, 640); g.fillStyle = '#efe0bc'; g.fillRect(-380, -320, 760, 640); g.strokeStyle = '#8a6a3a'; g.lineWidth = 6; g.strokeRect(-360, -300, 720, 600);
      g.font = 'italic 700 32px Georgia, serif'; g.fillStyle = '#7a1e10'; g.textAlign = 'center'; g.fillText("Hugh's deal", 0, -250); g.textAlign = 'left'; g.font = MK(30);
      DEAL.forEach(([n, k, s], i) => { if (lt < b(n, k)) return; const kk = clamp((lt - b(n, k)) / .4); g.save(); g.beginPath(); g.rect(-330, -210 + i * 62, 660 * kk, 60); g.clip(); g.fillStyle = '#3a2614'; g.fillText('✦ ' + s, -320, -170 + i * 62); g.restore(); });
      g.restore(); if (lt > b(83, 1)) eggRow(g, 1110, 600, 5, .7, lt - b(83, 1)); if (lt > b(81, 0)) FA.chicken(g, 140, 600, .45, t, { dir: 1 }); if (lt > b(82, 0)) F.rooster(g, 200, 520, .5, t, { dir: 1 }); },
    ui: c => { if (lt > b(76, 15)) DR.callout(c, 'WHITSUN = PENTECOST, 7 WEEKS AFTER EASTER', 640, 690, lt, b(76, 15), null, null, { size: 24 }); } }; }), 'whip');
  // the fees: the abbot's hand reaches in each time
  mood(84, 'heist'); SFX(84, 5, 'sting', .5);
  const fees = [[85, 'MERCHET', 'DAUGHTER MARRIES', 'ring'], [86, 'HERIOT', 'SOMEONE DIES → BEST ANIMAL', 'cow'], [88, 'TALLAGE', 'A TAX…', 'coins']];
  fees.forEach(([n]) => { SFX(n, 2, 'whoosh', .6); SFX(n, 2, 'cash', .5, null, .3); });
  C(84, null, S((lt, R, t) => { const b = n => t0(n, 0) - t0(84, 0); return { bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), act: (g, t) => { G.P(g, 'hugh', 300, 740, .62, t, { pose: 'crossed', turn: .4, face: { mouth: 'frown', brows: 'worried', sweat: lt > b(86) } });
      fees.forEach(([n, s, sub, ic], i) => { const a = b(n) + R(n, 2) - R(n, 0), k = GX.pop(lt, a - .3, .3); if (k <= 0) return; const x = 640 + i * 230, y = 300; g.save(); g.translate(x, y); g.scale(k, k); card(g, 0, 0, 210, 240, '#f6efe0');
        if (ic === 'ring') { g.strokeStyle = '#e8c86a'; g.lineWidth = 10; g.beginPath(); g.arc(0, -40, 30, 0, TAU); g.stroke(); } else if (ic === 'cow') F.cow(g, 0, -10, .3, t, { dir: 1 }); else for (let j = 0; j < 5; j++) sh(g, '#f2c43a', 2.5, c => c.ellipse(0, -20 - j * 12, 40, 10, 0, 0, TAU));
        label(g, s, 0, 50, 30, '#7a1e10'); g.font = MK(17); g.fillStyle = '#3a2a1a'; g.textAlign = 'center'; g.fillText(sub, 0, 90); g.restore();
        const hk = clamp((lt - a) / .5), out = clamp((lt - a - 1.1) / .5); if (hk > 0 && out < 1) GX.hand(g, x + 20, lerp(-300, y - 40, ease.out(hk)) - out * 600, .55, -PI / 2, { kind: hk > .9 ? 'fist' : 'open', sleeve: '#1e1a22' }); }); },
    ui: c => DR.write(c, 'AND THEN THERE ARE THE FEES', 640, 640, 50, lt, .1) }; }), 'whip');
  SFX(88, 13, 'stamp', 1); SFX(89, 0, 'gong', .5);
  C(88, 12, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 360, 1.12]], bg: g => { g.fillStyle = '#3a2618'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { parchment(g, 640, 360, 700, 400, 1, { lines: 9 }); g.font = 'italic 700 40px Georgia, serif'; g.fillStyle = '#7a1e10'; g.textAlign = 'center'; g.fillText('"…ad voluntatem dicti abbatis"', 640, 330); g.font = 'italic 28px Georgia, serif'; g.fillText('(at the will of the said abbot)', 640, 390); },
    ui: c => DR.sign(c, 'AT THE WILL OF THE SAID ABBOT', 640, 600, lt, R(88, 13) - .1, { size: 44, rot: -.05 }) })), 'zoom');
  mood(90, 'comic'); SFX(90, 3, 'buzz', .5); SFX(91, 1, 'tada', .6);
  C(90, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#7a3aa8', '#8a4ab8'), act: (g, t) => { G.P(g, 'abbot', 640, 760, .7, t, { pose: 'hips', face: { mouth: 'smirk', eyes: 'half', brows: 'sly' } }); const k = clamp(lt / 3); g.save(); g.translate(640, 250); for (let i = 0; i < 8; i++) { g.rotate(lt * .5 + i * .8); g.fillStyle = `rgba(255,255,255,${.1 * k})`; g.fillRect(0, -6, 400, 12); } g.restore(); },
    ui: c => { DR.write(c, "THAT'S NOT A TAX RATE.", 640, 120, 54, lt, .1); if (lt > t0(91, 0) - t0(90, 0)) DR.write(c, "THAT'S A VIBE.", 640, 210, 70, lt, t0(91, 0) - t0(90, 0), { col: '#f2d23a' }); } })), 'whip');
  // Kanzaka: custom = a cage AND a shield
  mood(92, 'curious'); SFX(93, 4, 'sting', .4);
  C(92, null, S((lt, R, t) => ({ bg: (g, t) => GX.evil(g, t, lt, { eyes: .8, bg: '#2a1a2a' }), act: (g, t) => { if (lt > .8) label(g, 'MWAHAHA', 640, 640, 50, 'rgba(255,255,255,.6)'); }, ui: c => DR.write(c, 'A CARTOON VILLAIN?', 640, 110, 56, lt, .2) })), 'flash');
  SFX(94, 7, 'pencil', .5, 1.2); SFX(95, 8, 'card', .6);
  C(94, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const b = t0(95, 0) - t0(94, 0), k = GX.pop(lt, b + R(95, 7) - R(95, 0) - .3, .35); if (k > 0) { g.save(); g.translate(400, 380); g.scale(k, k); g.rotate(-.05); card(g, 0, 0, 380, 460, '#f4ead4'); label(g, 'JUNICHI KANZAKA', 0, -170, 30, '#7a1e10'); label(g, 'Villein rents in', 0, -110, 24); label(g, '13th-century England', 0, -80, 24); g.fillStyle = 'rgba(60,40,20,.5)'; for (let i = 0; i < 6; i++) g.fillRect(-150, -30 + i * 30, 300 - (i % 2) * 60, 8); label(g, 'Economic History Review', 0, 180, 18, '#5a4a3a'); g.restore(); }
      const k2 = clamp((lt - b - .5) / 1.6); ['FREE TENANT', 'VILLEIN'].forEach((s, i) => { const h = (i ? 160 : 260) * ease.out(k2); g.fillStyle = i ? '#7ae8a0' : '#e8707a'; g.fillRect(760 + i * 200, 560 - h, 140, h); label(g, s, 830 + i * 200, 600, 22, '#fff'); }); label(g, 'RENT', 930, 220, 30, '#fff'); },
    ui: c => { DR.write(c, 'HISTORIANS CRUNCHED THE NUMBERS', 640, 70, 44, lt, .1); if (lt > t0(95, 0) - t0(94, 0) + R(95, 16) - R(95, 0)) DR.callout(c, 'SET BY LOCAL CUSTOM', 930, 660, lt, t0(95, 0) - t0(94, 0) + R(95, 16) - R(95, 0)); } })), 'whip');
  SFX(97, 3, 'clink', .7); SFX(97, 9, 'impact', .5);
  C(97, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a5a8a', '#3a6a9a'), act: (g, t) => { const sh2 = lt > R(97, 9) - .2; g.save(); g.translate(640, 420); if (!sh2) { g.strokeStyle = '#5a5a62'; g.lineWidth = 12; for (let i = 0; i < 7; i++) { g.beginPath(); g.moveTo(-180 + i * 60, -260); g.lineTo(-180 + i * 60, 140); g.stroke(); } sh(g, '#5a5a62', 4, c => c.ellipse(0, -260, 200, 30, 0, 0, TAU)); }
      else { sh(g, '#8a8a92', 6, c => { c.moveTo(-180, -220); c.lineTo(180, -220); c.lineTo(180, 0); c.quadraticCurveTo(0, 220, -180, 0); c.closePath(); }); sh(g, '#c8281e', 0, c => c.rect(-30, -220, 60, 300)); GX.impact(g, 260, -80, clamp((lt - R(97, 9)) / .4), .7); } g.restore(); G.P(g, 'hugh', 640, 640, .45, t, { pose: sh2 ? 'cheer' : 'crossed', face: sh2 ? { mouth: 'grin', eyes: 'happy' } : { mouth: 'frown' } }); },
    ui: c => { DR.write(c, 'CUSTOM WAS A CAGE…', 640, 90, 52, lt, .1); if (lt > R(97, 6)) DR.write(c, '…BUT ALSO A SHIELD', 640, 160, 52, lt, R(97, 6), { col: '#f2d23a' }); } })), 'whip');
  SFX(98, 4, 'buzz', .6);
  C(98, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.12]], bg: (g, t) => MD.abbotHall(g, t), act: (g, t) => { G.P(g, 'abbot', 640, 760, .7, t, { pose: 'shrug', face: { mouth: 'frown', brows: 'worried' } }); const k = GX.pop(lt, R(98, 4) - .2, .3); if (k > 0) { g.save(); g.translate(1000, 300); g.scale(k, k); card(g, 0, 0, 260, 120, '#fff'); label(g, 'RENT × 2', 0, 4, 46, '#c8281e'); g.strokeStyle = '#c8281e'; g.lineWidth = 10; g.beginPath(); g.moveTo(-120, -50); g.lineTo(120, 50); g.stroke(); g.restore(); } } })), 'whip');
  // source warning: the rolls are the landlord's paperwork; Hugh's own voice is missing
  mood(99, 'curious'); SFX(99, 3, 'sting', .4);
  C(99, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8862a', '#f8a03a'), act: (g, t) => { sh(g, '#f2d23a', 8, c => { c.moveTo(640, 160); c.lineTo(860, 540); c.lineTo(420, 540); c.closePath(); }); label(g, '!', 640, 420, 180, '#15100c'); }, ui: c => DR.write(c, 'A QUICK WARNING ABOUT OUR SOURCE', 640, 640, 46, lt, .2) })), 'flash');
  SFX(100, 9, 'coins', .5);
  C(100, null, S((lt, R, t) => ({ cam: [[640, 400, 1.06], [640, 400, 1.1]], bg: (g, t) => MD.scriptorium(g, t), act: (g, t) => { G.P(g, 'clerk@sit', 460, 470, .6, t, { pose: 'present', turn: .3, face: { mouth: 'smirk', eyes: 'half' } }); G.P(g, 'abbot', 900, 760, .62, t, { pose: 'thumbsUp', turn: -.4, face: { mouth: 'grin', eyes: 'happy' } }); }, ui: c => DR.callout(c, 'BY + FOR THE RENT COLLECTORS', 640, 110, lt, R(100, 6)) })), 'whip');
  SFX(101, 7, 'ding', .5); SFX(102, 3, 'boing', .3); SFX(103, 1, 'buzz', .5);
  C(101, null, S((lt, R, t) => { const b = n => t0(n, 0) - t0(101, 0); return { bg: g => { g.fillStyle = '#f2e6c8'; g.fillRect(-300, -300, 1900, 1400); g.fillStyle = '#e8f0e0'; g.fillRect(-300, -300, 940, 1400); ln(g, [[640, 0], [640, 720]], 8, '#15100c'); },
    act: (g, t) => { parchment(g, 320, 380, 420, 440, 1, { title: 'What Hugh owed', lines: 12 }); label(g, '✓ PERFECT DETAIL', 320, 640, 34, '#2a8a4a'); if (lt > b(102)) { card(g, 960, 380, 420, 440, '#fff'); label(g, 'What Hugh thought', 960, 200, 30, '#7a1e10'); label(g, '?', 960, 400, 200, '#d8d0c0'); } },
    ui: c => { if (lt > b(103)) DR.sign(c, 'NOBODY WROTE IT DOWN', 960, 640, lt, b(103), { size: 36 }); } }; }), 'whip');
  SFX(104, 1, 'stamp', .5); SFX(105, 12, 'swish', .5);
  C(104, null, S((lt, R, t) => { const b = n => t0(n, 0) - t0(104, 0); return { bg: g => DR.blueprint(g), act: (g, t) => { const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']; days.forEach((d, i) => { const ab = i < 3, k = GX.pop(lt, i * .12, .25); if (k <= 0) return; g.save(); g.translate(160 + i * 160, 360); g.scale(k, k); card(g, 0, 0, 140, 200, ab ? '#2a2630' : '#f6efe0'); label(g, d, 0, -60, 30, ab ? '#f2d23a' : '#15100c');
      if (ab) { g.save(); g.translate(0, 70); g.scale(.18, .18); G.P(g, 'abbot', 0, 0, 1, t, {}); g.restore(); } else if (lt > b(105) && i < 6) { g.save(); g.translate(0, 70); g.scale(.18, .18); G.P(g, 'hugh', 0, 0, 1, t, { pose: 'present' }); g.restore(); } else if (i === 6) label(g, '⛪', 0, 30, 50); g.restore(); }); },
    ui: c => { DR.write(c, '3 DAYS → THE ABBOT', 400, 600, 44, lt, .4, { col: '#f2d23a' }); if (lt > b(105)) DR.write(c, "HUGH'S OWN FARM GETS WHAT'S LEFT", 640, 670, 40, lt, b(105) + .5); } }; }), 'whip');
  SFX(106, 4, 'bell', .6);
  C(106, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 420, 1.15]], bg: (g, t) => MD.village(g, t, { v: 'dawn' }), atm: { warm: .25 }, ui: c => DR.write(c, 'WHERE THE DAY REALLY STARTS', 640, 110, 50, lt, .2) })), 'dissolve');
})(window);
