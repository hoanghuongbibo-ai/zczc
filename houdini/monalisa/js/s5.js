/* The Life of the Mona Lisa — BEAT 8 (war + attackers, L222–246, serious tone) and BEAT 9 (1963 → today → why she matters
 * → the close + end screen, L247–301, 13:31–19:15). */
(function (G) {
  'use strict';
  const T = G.Toon, DR = G.DR, MS = G.MS, ML = G.ML, K2 = G.K2, GX = G.GX, EP = G.EP, M = G.MAP, { W, H, clamp, lerp, rng } = T;
  const { sh, ln } = G.Paint, TAU = Math.PI * 2, PI = Math.PI, MK = DR.MK, ease = DR.ease;
  const { C, P, head, SFX, AMB } = G, mood = EP.mood, S = f => (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, f(lt, R, t, dur)), t0 = (n, k) => C.t(n, k);
  Object.assign(G.CW, { curator: { outfit: 'suitGrey', look: { skin: '#f0d0b4', hairCol: '#5a4a3a', glasses: true } }, soldierDE: { outfit: 'suitDark', hat: 'cavHelmet', look: { skin: '#e8c8a8', hairCol: '#5a4a3a' } },
    family1: { outfit: 'suitDark', look: { skin: '#f0d0b4', hairCol: '#2a1e16', beard: 'stubble' } }, family2: { outfit: 'ladySuit', hat: 'none', look: { skin: '#f2d6c0', hair: 'curly', hairCol: '#2a1e16', lashes: true } } });
  const label = (g, s, x, y, size = 30, col = '#15100c') => { g.font = MK(size); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  const crate = (g, x, y, s, open = 0) => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#c8a070', 5, c => c.rect(-130, -170, 260, 170)); g.strokeStyle = 'rgba(90,60,30,.6)'; g.lineWidth = 4; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(-130, -170 + i * 42); g.lineTo(130, -170 + i * 42); g.stroke(); } ln(g, [[-130, -170], [130, 0]], 6, '#8a6a3a'); ln(g, [[130, -170], [-130, 0]], 6, '#8a6a3a');
    if (open) { g.save(); g.translate(0, -170); g.rotate(-open * 1.4); sh(g, '#d8b080', 5, c => c.rect(0, -16, 260, 16)); g.restore(); sh(g, '#a8202a', 3, c => c.rect(-120, -166, 240, 40)); } g.restore(); };
  const truck = (g, x, y, s, t) => { g.save(); g.translate(x, y); g.scale(s, s); sh(g, '#4a5a3a', 5, c => c.rect(-220, -160, 300, 150)); sh(g, '#3a4a2a', 5, c => { c.moveTo(80, -10); c.lineTo(80, -120); c.lineTo(170, -120); c.lineTo(200, -60); c.lineTo(200, -10); c.closePath(); }); sh(g, '#a8c8d8', 3, c => c.rect(100, -110, 60, 40)); for (const wx of [-150, 0, 150]) sh(g, '#15100c', 4, c => c.arc(wx, 0, 32, 0, TAU)); g.restore(); };

  // ---------------- L222–233 1939: saving her ----------------
  mood(222, 'somber'); K2.era(t0(222, 0), 'WAR', '1939–1945'); K2.hands(t0(222, 5), 6, 'THE RESCUERS'); SFX(222, 0, 'gong', .4);
  C(222, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a40', '#4a4a50'), act: (g, t) => { ML.mona(g, 640, 340, 280, {}); for (const sd of [-1, 1]) GX.hand(g, 640 + sd * lerp(500, 210, ease.out(clamp(lt / .8))), 380, .5, sd > 0 ? 0 : PI, { kind: 'open', sleeve: '#5a5e66' }); },
    ui: c => DR.write(c, 'NOW THE HANDS TRY TO SAVE HER', 640, 640, 48, lt, R(222, 9)) })), 'dip');
  SFX(223, 6, 'rumble', .6, 3); SFX(223, 9, 'tick', .5);
  C(223, null, S((lt, R, t) => { const v = M.view(6, 50, 26); return { bg: g => DR.map(g, t, v), act: (g, t) => { M.zone(g, v, [[6, 54], [15, 54], [15, 47.5], [7.5, 47.5], [6, 51]], '#5a5a62', .35 + .1 * Math.sin(lt * 4)); for (let i = 0; i < 5; i++) { const [x, y] = M.pt(v, 7 + i * .3, 49 + i * .8); const k = ease.out(clamp((lt - .5) / 2)); ln(g, [[x, y], [x - 60 * k, y + 10 * k]], 14, '#3a3a40'); } },
    ui: c => { DR.mapWrite(c, v, 2.35, 48.86, 'PARIS', lt, .1, { dy: -40, size: 36 }); DR.mapWrite(c, v, 11, 51.5, 'GERMANY', lt, .2, { dy: 0, size: 40 }); DR.yearTag(c, 'AUGUST 1939', lt, .3); if (lt > R(223, 9)) DR.write(c, 'WAR IS DAYS AWAY', 640, 640, 50, lt, R(223, 9)); } }; }), 'whip');
  SFX(224, 1, 'card', .5); SFX(224, 10, 'pencil', .5, 1.4);
  C(224, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.13]], bg: (g, t) => MS.galleryEmpty(g, t), act: (g, t) => { P(g, 'jaujard', 440, 760, .7, t, { pose: 'pointSide', turn: .5, face: { mouth: 'flat', brows: 'neutral' } }); g.save(); g.translate(900, 400); sh(g, '#dfe8f2', 4, c => c.rect(-150, -110, 300, 220)); DR.bpDraw(g, [[-120, 60, -40, -20], [-40, -20, 40, 20], [40, 20, 120, -60]], clamp((lt - R(224, 10)) / 1), { col: '#c8281e', w: 5, pencil: false }); g.restore(); },
    ui: c => { DR.write(c, 'JACQUES JAUJARD', 440, 120, 54, lt, .1); DR.callout(c, "DIRECTOR, FRANCE'S NATIONAL MUSEUMS", 820, 200, lt, R(224, 3), null, null, { size: 24 }); } })), 'whip');
  SFX(225, 4, 'truck', .4, 2);
  C(225, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a5a1e', '#a86a2e'), act: (g, t) => { for (let i = 0; i < 4; i++) crate(g, 260 + i * 260, 640, .6 + (i % 2) * .05); truck(g, lerp(-300, 640, ease.out(clamp(lt / 2))), 470, .8, t); },
    ui: c => { DR.write(c, 'HE HAD DONE THIS BEFORE:', 640, 100, 46, lt, .1); DR.write(c, 'THE PRADO, SPANISH CIVIL WAR', 640, 170, 40, lt, R(225, 4), { col: '#f2d23a' }); } })), 'whip');
  SFX(226, 9, 'cloth', .6); SFX(226, 15, 'thud', .7); SFX(226, 15, 'creak', .5);
  C(226, null, S((lt, R, t) => ({ cam: [[640, 400, 1.2], [640, 420, 1.3]], bg: (g, t) => MS.galleryEmpty(g, t), act: (g, t) => { const lid = 1 - clamp((lt - R(226, 14)) / .6), dn = clamp((lt - R(226, 8)) / 1); crate(g, 640, 700, 1.2, lid); if (lid > .3) ML.mona(g, 640, lerp(300, 560, ease.out(dn)), 200 * (1 - dn * .2), { frame: false }); if (lid <= .05) { g.save(); g.translate(640, 560); g.rotate(-.1); label(g, '? ? ?', 0, 0, 40, '#5a3a1e'); g.restore(); } },
    ui: c => { if (lt > R(226, 10)) DR.callout(c, 'RED VELVET', 980, 220, lt, R(226, 10), 700, 520, { screen: true }); if (lt > R(226, 17)) DR.write(c, 'NO HINT OF WHAT\'S INSIDE', 640, 100, 46, lt, R(226, 17)); } })), 'whip');
  SFX(227, 7, 'truck', .5, 3);
  C(227, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [700, 400, 1.06]], bg: (g, t) => MS.chambord(g, t), act: (g, t) => { for (let i = 0; i < 3; i++) truck(g, lerp(-300 - i * 340, 1500 - i * 340, clamp(lt / 4.6)), 640 + i * 10, .5, t); },
    ui: c => { DR.write(c, 'CHÂTEAU DE CHAMBORD', 640, 100, 54, lt, R(227, 5) - .2); if (lt > R(227, 14)) DR.tally(c, 'THOUSANDS', g => sh(g, '#c8a070', 2, c => c.rect(-9, -9, 18, 18)), 640, 620, lt, R(227, 14), { n: 14, label: '+ THOUSANDS OF WORKS' }); } })), 'whip');
  // L228–232 the hiding route, one stop per phrase
  const ROUTE = [[2.35, 48.86, 'PARIS'], [1.52, 47.62, 'CHAMBORD'], [2.06, 44.32, 'LOC-DIEU ABBEY'], [1.35, 44.02, 'MONTAUBAN'], [1.9, 43.7, 'COUNTRYSIDE']];
  SFX(228, 4, 'rumble', .5, 2); SFX(229, 1, 'stamp', .5); SFX(230, 7, 'stamp', .5); SFX(231, 3, 'stamp', .5);
  C(228, null, S((lt, R, t) => { const v = M.view(2, 46.2, 120), base = t0(228, 0), stopsT = [-9, -9, t0(229, 1) - base, t0(230, 7) - base, t0(231, 3) - base]; return { bg: g => DR.map(g, t, v), act: (g, t) => { for (let i = 1; i < ROUTE.length; i++) { const k = clamp((lt - stopsT[i] + .7) / .7); if (k > 0) M.route(g, v, [ROUTE[i - 1].slice(0, 2), ROUTE[i].slice(0, 2)], k, { w: 7, col: '#c8281e' }); }
      M.zone(g, v, [[-5, 51], [9, 51], [9, 47.5 - clamp(lt / 6) * 2.5], [-5, 47 - clamp(lt / 6) * 2.5]], '#5a5a62', .3); },
    ui: c => { ROUTE.forEach(([lo, la, nm], i) => DR.mapWrite(c, v, lo, la, nm, lt, stopsT[i] < 0 ? 0 : stopsT[i], { dy: 40, size: 28 })); if (lt > stopsT[3]) DR.yearTag(c, 'OCT 3, 1940', lt, stopsT[3]); } }; }), 'whip');
  SFX(232, 9, 'card', .5);
  C(232, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a40', '#4a4a50'), ui: c => GX.hangSign(c, 'TIMES\nMOVED:', 1, '≈6', lt, 0, R(232, 9), { y: 330, col: '#c8281e' }) })), 'whip');
  mood(233, 'quiet'); AMB(233, 'night', 6, .5);
  C(233, null, S((lt, R, t) => ({ cam: [[640, 420, 1.05], [640, 420, 1.12]], bg: (g, t) => MS.farm(g, t), act: (g, t) => { crate(g, 760, 690, 1); sh(g, '#8a7a6a', 4, c => c.roundRect(380, 640, 300, 50, 20)); P(g, 'curator@sit', 520, 640, .5, t, { pose: 'idle', turn: .3, headTilt: .3, face: { mouth: 'flat', eyes: 'closed' } }); ln(g, [[960, 690], [960, 650]], 10, '#f4f0e8'); G.Paint2.fire(g, 960, 646, .16, t); },
    atm: { night: .25 }, ui: c => DR.callout(c, 'CURATORS SLEPT BESIDE HER CRATE', 640, 110, lt, .3, null, null, { fill: '#fff3c8' }) })), 'dissolve');
  // L234–239 the looting — serious, no jokes, quiet
  mood(234, 'somber'); SFX(234, 9, 'bell', .4);
  C(234, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#1e1e24'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const r = rng(5); for (let i = 0; i < 20; i++) { g.save(); g.globalAlpha = .5 + .5 * clamp(lt * 2 - i * .05); ML.painting(g, 60 + (i % 5) * 240, 60 + Math.floor(i / 5) * 160, 140, 110, i + 2, {}); g.restore(); } g.fillStyle = 'rgba(20,20,26,.6)'; g.fillRect(-300, -300, 1900, 1400); },
    ui: c => DR.write(c, "NOT ABOUT ONE PAINTING", 640, 360, 60, lt, .3, { col: '#fff' }) })), 'dip');
  SFX(235, 7, 'thud', .4); SFX(235, 7, 'paper', .3);
  C(235, null, S((lt, R, t) => ({ cam: [[640, 400, 1.04], [640, 400, 1.08]], bg: (g, t) => MS.house(g, t), atm: { cold: .35, dark: .3 }, act: (g, t) => { const k = clamp((lt - R(235, 6)) / 2); ML.painting(g, lerp(540, 1500, k), 120, 200, 260, 4, {}); g.save(); g.filter = 'saturate(0.2)'; P(g, 'family1', 320, 760, .62, t, { pose: 'idle', turn: .4, face: { mouth: 'frown', eyes: 'half', brows: 'worried' } }); P(g, 'family2', 470, 760, .6, t, { pose: 'idle', turn: .4, face: { mouth: 'frown', eyes: 'half', brows: 'worried' } }); g.restore();
      g.save(); g.filter = 'brightness(0.15)'; P(g, 'soldierDE', lerp(1000, 1400, k), 760, .64, t, { walk: t * 6, turn: .8 }); g.restore(); },
    ui: c => { DR.write(c, 'SYSTEMATIC LOOTING', 640, 100, 52, lt, R(235, 6)); if (lt > R(235, 11)) DR.write(c, 'ESPECIALLY FROM JEWISH FAMILIES', 640, 650, 40, lt, R(235, 11), { col: '#f2d23a' }); } })), 'dissolve');
  C(236, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#1e1e24'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { for (let i = 0; i < 9; i++) { const x = 200 + (i % 3) * 440, y = 140 + Math.floor(i / 3) * 210; sh(g, '#6a5a3a', 5, c => c.rect(x - 90, y - 70, 180, 140)); g.fillStyle = '#2a2a30'; g.fillRect(x - 76, y - 56, 152, 112); } },
    ui: c => DR.write(c, 'MUCH OF IT NEVER RETURNED', 640, 650, 50, lt, .3, { col: '#fff' }) })), 'dissolve');
  SFX(237, 9, 'pencil', .5, 2.5); SFX(237, 4, 'card', .4);
  C(237, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.12]], bg: (g, t) => MS.galleryEmpty(g, t), atm: { dark: .3 }, act: (g, t) => { for (let i = 0; i < 4; i++) crate(g, 820 + (i % 2) * 230, 700 - Math.floor(i / 2) * 120, .55); P(g, 'valland', 440, 760, .7, t, { pose: 'present', turn: .5, face: { mouth: 'flat', eyes: 'half', look: [.5, .4] } }); g.save(); g.translate(520, 520); g.rotate(-.1); sh(g, '#f4ead4', 3, c => c.rect(-50, -36, 100, 72)); g.fillStyle = 'rgba(40,40,60,.7)'; for (let i = 0; i < 5; i++) g.fillRect(-40, -26 + i * 12, 80 * clamp(lt / 2 - i * .1), 4); g.restore(); },
    ui: c => { DR.write(c, 'ROSE VALLAND', 440, 120, 56, lt, R(237, 5)); if (lt > R(237, 9)) DR.callout(c, 'SECRETLY RECORDED WHAT THEY TOOK', 900, 200, lt, R(237, 9), null, null, { size: 26 }); } })), 'whip');
  mood(238, 'tender'); SFX(238, 4, 'chime', .5);
  C(238, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 370, 1.06]], bg: (g, t) => MS.salon(g, t, {}), act: (g, t) => { const k = ease.out(clamp(lt / 1.5)); P(g, 'jaujard', lerp(900, 640, k), 760, .6, t, { walk: k < 1 ? t * 6 : 0, pose: k >= 1 ? 'present' : 'idle', turn: -.4, face: { mouth: 'smile', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'HOME', 640, 100, 70, lt, .3); DR.yearTag(c, 'JUNE 1945', lt, R(238, 9)); } })), 'dissolve');
  mood(239, 'somber');
  C(239, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.08]], bg: (g, t) => MS.house(g, t), atm: { cold: .4, dark: .45 }, act: (g, t) => { sh(g, '#6a5a3a', 5, c => c.rect(520, 110, 240, 300)); g.fillStyle = '#e8d8b8'; g.fillRect(536, 126, 208, 268); ln(g, [[400, 640], [400, 600]], 8, '#f4f0e8'); G.Paint2.fire(g, 400, 596, .14, t); },
    ui: c => DR.write(c, 'MANY NEVER CAME HOME AT ALL', 640, 640, 46, lt, .3, { col: '#fff' }) })), 'dissolve');

  // ---------------- L240–246 the attackers + glass ----------------
  mood(240, 'danger'); K2.era(t0(240, 0), 'ATTACKS', '1956'); K2.hands(t0(241, 1), 7, 'THE ATTACKERS'); SFX(240, 3, 'sting', .5);
  C(240, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), act: (g, t) => { ML.mona(g, 640, 340, 280, {}); const k = clamp(lt / 1.5); for (const sd of [-1, 1]) GX.hand(g, 640 + sd * lerp(700, 260, k), 300, .5, sd > 0 ? 0 : PI, { kind: lt > 1 ? 'fist' : 'open', sleeve: '#2a2a30' }); } })), 'whip');
  C(241, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a2020', '#4a2a2a'), ui: c => DR.write(c, "NOW THEY'RE ATTACKERS", 640, 360, 72, lt, .1, { col: '#ff4a3a' }) })), 'flash');
  SFX(242, 6, 'splash', .6); SFX(242, 7, 'salthiss', .7, 1.5);
  C(242, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#2a3440'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const hit = clamp((lt - R(242, 7)) / .4); ML.mona(g, 640, 360, 440, { frame: 'gold', damage: hit > .5 ? 'acid' : null }); if (hit > 0 && hit < 1) { g.fillStyle = `rgba(200,230,140,${1 - hit})`; for (let i = 0; i < 20; i++) { g.beginPath(); g.arc(560 + (i * 37) % 160, 500 + (i * 13) % 80 - (1 - hit) * 200, 10, 0, TAU); g.fill(); } } },
    ui: c => { DR.yearTag(c, '1956', lt, .1); DR.write(c, 'ACID — THE LOWER PART', 640, 100, 50, lt, R(242, 10)); } })), 'whip');
  SFX(243, 7, 'whoosh', .6); SFX(244, 1, 'impact', .9); SFX(244, 1, 'glass', .9);
  C(243, null, S((lt, R, t) => ({ cam: [[640, 360, 1.2], [640, 360, 1.25]], bg: g => { g.fillStyle = '#2a3440'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { ML.mona(g, 640, 360, 440, { frame: 'gold', glass: true }); const k = clamp((lt - R(243, 7)) / .8); if (k > 0 && k < 1) { sh(g, '#8a8a8a', 4, c => c.arc(lerp(1400, 700, k), lerp(600, 420, k) - Math.sin(k * PI) * 120, 26, 0, TAU)); } },
    ui: c => DR.write(c, 'LATER THAT YEAR: A ROCK', 640, 100, 50, lt, R(243, 5)) })), 'whip');
  C(244, null, S((lt, R, t) => ({ cam: [[560, 460, 1.6], [560, 470, 1.8]], shake: lt < .4 ? 1 : 0, bg: g => { g.fillStyle = '#2a3440'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { ML.mona(g, 640, 360, 440, { frame: 'gold', damage: 'rock' }); g.strokeStyle = 'rgba(230,240,255,.9)'; g.lineWidth = 3; const r = rng(3); for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(560, 470); let x = 560, y = 470; for (let j = 0; j < 4; j++) { x += (r() - .5) * 120; y += (r() - .5) * 120; g.lineTo(x, y); } g.stroke(); } },
    ui: c => { const [x, y] = DR.toScreen(559, 524); DR.circle(c, x, y, 40, 40, lt, R(244, 8), { col: '#c8281e' }); if (lt > R(244, 12)) DR.callout(c, 'NEAR HER LEFT ELBOW', 980, 160, lt, R(244, 12), x, y, { screen: true }); } })), 'whip');
  SFX(245, 9, 'sparkle', .5);
  C(245, null, S((lt, R, t) => ({ cam: [[559, 524, 2.6], [559, 524, 2.9]], bg: g => { g.fillStyle = '#2a3440'; g.fillRect(-300, -300, 1900, 1400); ML.mona(g, 640, 360, 440, { frame: 'gold' }); }, act: g => { GX.hand(g, 600, 540, .25, -.4, { kind: 'point', sleeve: '#3a4a6a' }); }, ui: c => DR.write(c, 'THE RETOUCHED SPOT', 640, 640, 54, lt, R(245, 9) - .3) })), 'zoom');
  SFX(246, 3, 'clink', .6); SFX(246, 6, 'clink', .6); SFX(246, 8, 'thud', .6);
  C(246, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#2a3440'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { ML.mona(g, 640, 360, 360, { frame: 'gold' }); const n = Math.min(5, Math.floor(lt / .55) + 1); for (let i = 0; i < n; i++) { g.save(); g.globalAlpha = .18; g.fillStyle = '#cfe8ff'; g.fillRect(470 - i * 16, 150 - i * 16, 340 + i * 32, 420 + i * 32); g.restore(); g.strokeStyle = 'rgba(200,230,255,.8)'; g.lineWidth = 4; g.strokeRect(470 - i * 16, 150 - i * 16, 340 + i * 32, 420 + i * 32); } },
    ui: c => DR.write(c, 'THICKER… AND THICKER', 640, 650, 54, lt, R(246, 5)) })), 'whip');

  // ---------------- L247–262 1963: America ----------------
  mood(247, 'jazz'); K2.era(t0(247, 0), 'USA', '1963'); SFX(247, 1, 'tada', .5);
  C(247, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => ML.mona(g, 640, 330, 300, { glass: true }), ui: c => DR.write(c, 'BUT FAME MAKES HER USEFUL', 640, 640, 52, lt, .2) })), 'whip');
  SFX(248, 13, 'bell', .6); AMB(248, 'sea', 8, .6);
  C(248, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [700, 380, 1.08]], bg: (g, t) => MS.liner(g, t, { x: lerp(300, 760, clamp(lt / 6)) }), ui: c => { DR.write(c, 'SS FRANCE', 640, 100, 60, lt, R(248, 20)); DR.yearTag(c, 'WINTER 1962–63', lt, .3); } })), 'dissolve');
  C(248, 16, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: g => { g.fillStyle = '#e8dcc4'; g.fillRect(-300, -300, 1900, 1400); sh(g, '#4a6a8a', 5, c => c.arc(1000, 260, 70, 0, TAU)); g.fillStyle = '#9ac0e0'; g.beginPath(); g.arc(1000, 260, 56, 0, TAU); g.fill(); g.fillStyle = '#8a6a4a'; g.fillRect(-300, 560, 1900, 400); },
    act: (g, t) => { const rock = Math.sin(t * 1.2) * .03; g.save(); g.translate(640, 560); g.rotate(rock); g.translate(-640, -560); sh(g, '#c8a070', 5, c => c.rect(500, 360, 280, 200)); sh(g, '#a8202a', 3, c => c.rect(520, 380, 240, 50)); g.restore(); P(g, 'marine', 340, 760, .6, t, { pose: 'idle', turn: .4, face: { mouth: 'flat' } }); },
    ui: c => DR.callout(c, 'HER OWN CABIN', 980, 600, lt, .3) })), 'whip');
  SFX(249, 7, 'card', .6); SFX(249, 13, 'card', .6);
  C(249, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.12]], bg: (g, t) => MS.nga(g, t, {}), act: (g, t) => { P(g, 'jackie', 400, 760, .66, t, { pose: 'present', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }); if (lt > R(249, 12)) P(g, 'malraux', 880, 760, .66, t, { pose: 'presentL', turn: -.5, face: { mouth: 'flat', brows: 'up' } }); },
    ui: c => { DR.write(c, 'JACQUELINE KENNEDY', 400, 120, 46, lt, R(249, 6)); if (lt > R(249, 12)) DR.write(c, 'ANDRÉ MALRAUX', 880, 200, 46, lt, R(249, 12), { col: '#f2d23a' }); } })), 'whip');
  K2.hands(t0(249, 7), 8, 'A FIRST LADY'); SFX(250, 2, 'stamp', .6);
  C(250, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#c8281e'), act: (g, t) => { const k = ease.inOut(clamp((lt - .2) / 1.4)); g.save(); g.translate(lerp(300, 980, k), 360 - Math.sin(k * PI) * 120); ML.mona(g, 0, 0, 180, {}); g.restore(); { const x = 160; sh(g, '#2a4ab8', 3, c => c.rect(x - 75, 520, 50, 90)); sh(g, '#fff', 3, c => c.rect(x - 25, 520, 50, 90)); sh(g, '#c8281e', 3, c => c.rect(x + 25, 520, 50, 90)); }
      { const x = 1120; for (let i = 0; i < 7; i++) sh(g, i % 2 ? '#fff' : '#c8281e', 0, c => c.rect(x - 75, 520 + i * 13, 150, 13)); sh(g, '#2a3a8a', 0, c => c.rect(x - 75, 520, 64, 52)); g.strokeStyle = '#15100c'; g.lineWidth = 3; g.strokeRect(x - 75, 520, 150, 91); } },
    ui: c => DR.write(c, 'ON LOAN: TO THE AMERICAN PEOPLE', 640, 100, 46, lt, R(250, 5)) })), 'whip');
  SFX(251, 4, 'cash', .7); SFX(251, 8, 'stamp', .6);
  C(251, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const n = Math.round(lerp(0, 100, ease.out(clamp((lt - .2) / 1.4)))); label(g, '$' + n + ' MILLION', 640, 330, 110, '#fff'); },
    ui: c => { DR.write(c, 'INSURANCE VALUATION', 640, 160, 50, lt, R(251, 8) - .2); if (lt > R(251, 10)) DR.sign(c, 'A RECORD AT THE TIME', 640, 520, lt, R(251, 10), { size: 44 }); } })), 'whip');
  SFX(252, 4, 'cash', .7);
  C(252, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { label(g, '$100M (1962)', 640, 260, 60, '#fff'); label(g, '≈ $1 BILLION+ TODAY', 640, 380, 70, '#f2d23a'); }, ui: c => DR.write(c, 'BLS CPI INFLATION CALCULATOR', 640, 600, 30, lt, .6) })), 'whip');
  SFX(253, 8, 'crowd', .4, 3); SFX(253, 22, 'pop', .4); SFX(253, 24, 'pop', .4); SFX(253, 28, 'pop', .4);
  C(253, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.06]], bg: (g, t) => MS.nga(g, t, {}), crowd: DR.army(80, 620, 1200, 712, 22, ['visitor60', 'visitor60b', 'jaujard', 'malraux'], .38, .46, 253, { spr: { back: true } }), act: (g, t) => P(g, 'jfk', 640, 640, .5, t, { pose: 'presentBoth', face: { mouth: 'open', eyes: 'happy' } }),
    ui: c => { DR.yearTag(c, 'JAN 8, 1963', lt, .2); DR.write(c, 'PRESIDENT KENNEDY', 640, 100, 56, lt, R(253, 6) - .2); if (lt > R(253, 22)) DR.callout(c, 'CONGRESS', 220, 220, lt, R(253, 22)); if (lt > R(253, 24)) DR.callout(c, 'SUPREME COURT', 640, 200, lt, R(253, 24)); if (lt > R(253, 28)) DR.callout(c, 'DIPLOMATS', 1060, 220, lt, R(253, 28)); } })), 'whip');
  SFX(254, 4, 'creak', .7); SFX(254, 5, 'crowd', .6, 2);
  C(254, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [640, 400, 1.05]], bg: (g, t) => MS.queue(g, t), act: (g, t) => { const k = clamp((lt - R(254, 4)) / .6); for (const sd of [-1, 1]) sh(g, '#5a3a22', 5, c => c.rect(640 + sd * 90 * (1 - k) - (sd > 0 ? 0 : 90), 270, 90, 130)); }, ui: c => DR.write(c, 'OPEN TO EVERYONE', 640, 110, 56, lt, R(254, 5)) })), 'whip');
  mood(255, 'warm'); AMB(255, 'crowd', 8, .5);
  C(255, null, S((lt, R, t) => ({ cam: [[640, 400, 1.0], [520, 400, 1.08]], bg: (g, t) => MS.queue(g, t), crowd: (t2, l2) => { const L = []; for (let i = 0; i < 40; i++) L.push([['visitor60', 'visitor60b', 'jackie', 'tourist1'][i % 4], 1400 - i * 38 - l2 * 18, 560 + (i % 3) * 10, .28, { walk: true, spr: { turn: .8 } }]); return L; },
    act: (g, t) => { for (const x of [420, 860]) P(g, 'marine', x, 470, .3, t, { pose: 'idle', face: { mouth: 'flat' } }); }, atm: { snow: 70, cold: .15 },
    ui: c => { DR.write(c, 'A JANUARY LINE IN D.C.', 640, 90, 50, lt, .3); if (lt > R(256, 10) + t0(256, 0) - t0(255, 0)) DR.callout(c, 'UP TO 2 HOURS', 300, 220, lt, R(256, 10) + t0(256, 0) - t0(255, 0)); if (lt > R(256, 14) + t0(256, 0) - t0(255, 0)) DR.callout(c, 'U.S. MARINES, 24/7', 960, 220, lt, R(256, 14) + t0(256, 0) - t0(255, 0)); } })), 'whip');
  SFX(257, 4, 'tick', .6); SFX(257, 13, 'tada', .6);
  C(257, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a8a', '#3a4a9a'), act: (g, t) => { const n = Math.round(518525 * ease.out(clamp((lt - .3) / (R(257, 12) - .3)))); label(g, n.toLocaleString(), 640, 330, 130, '#fff'); for (let i = 0; i < 30; i++) { const u = ((lt * .7 + i / 30) % 1); P(g, ['visitor60', 'visitor60b', 'tourist1', 'jackie'][i % 4], lerp(-80, 1360, u), 620 + (i % 3) * 30, .16, t + i, { walk: t * 8, turn: .8 }); } },
    ui: c => DR.write(c, 'IN UNDER 4 WEEKS', 640, 160, 50, lt, .1) })), 'whip');
  SFX(258, 5, 'whoosh', .5); SFX(258, 15, 'crowd', .6, 2);
  C(258, null, S((lt, R, t) => { const v = M.view(-75.5, 40, 120); return { bg: g => DR.map(g, t, v), act: (g, t) => { M.route(g, v, [[-77.04, 38.9], [-73.96, 40.78]], clamp(lt / 1.2), { w: 8, col: '#c8281e' }); },
    ui: c => { DR.mapWrite(c, v, -77.04, 38.9, 'WASHINGTON', lt, .1, { dy: 40, size: 34 }); DR.mapWrite(c, v, -73.96, 40.78, 'NEW YORK', lt, 1.1, { dy: -40, size: 40 }); if (lt > R(258, 13)) DR.write(c, '+ ~1 MILLION MORE', 640, 620, 60, lt, R(258, 13), { col: '#f2d23a' }); } }; }), 'whip');
  mood(259, 'tender'); SFX(259, 8, 'chime', .5);
  C(259, null, S((lt, R, t) => ({ cam: [[640, 300, 2.0], [640, 300, 2.1]], dof: 6, bg: (g, t) => MS.nga(g, t, {}), act: (g, t) => head(g, 'visitor60', 640, 280, 1, t, { face: { mouth: 'o', eyes: 'wide', brows: 'up', look: [0, -.5] } }), ui: c => DR.write(c, 'THEIR FIRST TIME IN AN ART MUSEUM', 640, 640, 44, lt, R(259, 7)) })), 'whip');
  mood(260, 'adventure'); SFX(260, 10, 'stamp', .6); SFX(260, 27, 'stamp', .6); K2.era(t0(260, 0), 'WORLD TOUR', '1974');
  C(260, null, S((lt, R, t) => { const v = M.view(80, 45, 2.4); return { bg: g => DR.map(g, t, v), act: (g, t) => { M.route(g, v, [[2.35, 48.86], [60, 55], [139.7, 35.7]], clamp((lt - .2) / R(260, 10)), { w: 7, col: '#c8281e' }); if (lt > R(260, 24)) M.route(g, v, [[139.7, 35.7], [100, 55], [37.6, 55.75]], clamp((lt - R(260, 24)) / (R(260, 27) - R(260, 24))), { w: 7, col: '#c8281e' }); },
    ui: c => { DR.mapWrite(c, v, 139.7, 35.7, 'TOKYO', lt, R(260, 10), { dy: 40, size: 38 }); if (lt > R(260, 12)) DR.mapWrite(c, v, 139.7, 35.7, '~1.5 MILLION · 7 WEEKS', lt, R(260, 13), { dy: 90, size: 28 }); DR.mapWrite(c, v, 37.6, 55.75, 'MOSCOW', lt, R(260, 27), { dy: -40, size: 38 }); DR.yearTag(c, '1974', lt, .2); } }; }), 'whip');
  SFX(261, 3, 'stamp', .8);
  C(261, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), act: (g, t) => ML.mona(g, 640, 330, 280, { glass: true }), ui: c => DR.sign(c, 'NO MORE TRAVEL', 640, 610, lt, R(261, 3) - .1, { size: 54 }) })), 'flash');
  SFX(262, 6, 'buzz', .5);
  C(262, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), ui: c => GX.hangSign(c, 'LOANS\nSINCE 1974:', '?', 0, lt, 0, R(262, 6), { y: 330, col: '#c8281e' }) })), 'whip');

  // ---------------- L263–271 today: cake, soup, the jewel heist ----------------
  mood(263, 'comic'); K2.era(t0(263, 0), 'THE LOUVRE', 'TODAY'); SFX(263, 9, 'boing', .5);
  C(263, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 370, 1.06]], bg: (g, t) => MS.louvre(g, t), crowd: K2.phones(80, 600, 1200, 712, 20, 263), ui: c => DR.write(c, 'DIFFERENT PROPS', 640, 110, 56, lt, R(263, 8)) })), 'whip');
  SFX(264, 12, 'splash', .8); SFX(264, 12, 'gasp', .6);
  C(264, null, S((lt, R, t) => ({ cam: [[640, 380, 1.2], [640, 360, 1.3]], bg: (g, t) => MS.louvre(g, t, { mona: { splat: lt > R(264, 12) ? 'cake' : null, splatK: clamp((lt - R(264, 12)) / .4) } }), act: (g, t) => { const up = clamp((lt - R(264, 11)) / .4); P(g, 'tourist2', 840, 760, .6, t, { pose: up > 0 ? 'pointUp' : 'idle', turn: -.4, hat: 'periwig', face: { mouth: 'grin', eyes: 'happy' } }); sh(g, '#3a3a40', 4, c => c.roundRect(760, 640, 160, 80, 20)); for (const x of [780, 900]) sh(g, '#15100c', 4, c => c.arc(x, 720, 30, 0, TAU)); },
    ui: c => { DR.yearTag(c, '2022', lt, .1); DR.callout(c, 'A WIG + A WHEELCHAIR', 300, 200, lt, R(264, 7)); if (lt > R(264, 13)) DR.write(c, 'CAKE.', 640, 640, 70, lt, R(264, 13)); } })), 'whip');
  SFX(265, 7, 'splash', .9); SFX(265, 8, 'splash', .7, null, .2);
  C(265, null, S((lt, R, t) => ({ cam: [[640, 380, 1.2], [640, 370, 1.28]], bg: (g, t) => MS.louvre(g, t, { mona: { splat: lt > R(265, 7) ? 'soup' : null, splatK: clamp((lt - R(265, 7)) / .4) } }), act: (g, t) => { for (const [x, w] of [[420, 'tourist3'], [860, 'tourist1']]) P(g, w, x, 760, .6, t, { pose: lt > R(265, 6) ? 'pointUp' : 'idle', back: true }); },
    ui: c => { DR.yearTag(c, 'JAN 2024', lt, .1); if (lt > R(265, 8)) DR.write(c, 'PUMPKIN SOUP.', 640, 120, 70, lt, R(265, 8), { col: '#e8862a' }); } })), 'whip');
  SFX(266, 1, 'clink', .8); SFX(266, 7, 'boing', .5);
  C(266, null, S((lt, R, t) => ({ cam: [[640, 360, 1.6], [640, 360, 1.66]], bg: (g, t) => MS.louvre(g, t, { mona: { splat: 'soup' } }), act: (g, t) => { GX.hand(g, 740, 300, .3, -PI * .82, { kind: 'fist', sleeve: '#3a4a6a' }); }, ui: c => { DR.callout(c, 'ARMORED SINCE 2005', 1000, 140, lt, R(266, 2)); DR.write(c, 'IT TAKES IT ALL', 640, 640, 56, lt, R(266, 7)); } })), 'whip');
  SFX(267, 4, 'sparkle', .6); SFX(267, 4, 'ding', .5);
  C(267, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a8a4a', '#3a9a5a'), act: (g, t) => { ML.mona(g, 640, 330, 300, { glass: true }); for (let i = 0; i < 6; i++) { const a = i + lt * 2; g.fillStyle = '#fff'; g.font = MK(30); g.fillText('✦', 640 + Math.cos(a) * 200, 330 + Math.sin(a) * 220); } }, ui: c => DR.write(c, 'NOT A SCRATCH', 640, 630, 64, lt, .2) })), 'whip');
  mood(268, 'heist'); SFX(268, 6, 'impact', .7); SFX(268, 14, 'clink', .6); SFX(268, 16, 'sparkle', .6);
  C(268, null, S((lt, R, t) => ({ cam: [[640, 400, 1.05], [640, 400, 1.1]], bg: (g, t) => MS.apollo(g, t), act: (g, t) => { for (let i = 0; i < 3; i++) { g.save(); g.filter = 'brightness(0.12)'; P(g, 'decker', 380 + i * 220 + Math.sin(lt * 9 + i) * 20, 760, .58, t, { pose: i === 1 ? 'pointUp' : 'idle', hat: 'beanie', walk: t * 8 }); g.restore(); } if (lt > R(268, 15)) { const k = clamp((lt - R(268, 15)) / .8); for (let i = 0; i < 5; i++) { g.fillStyle = ['#2a6ab8', '#c8281e', '#2a8a4a', '#f2d23a', '#fff'][i]; g.beginPath(); g.arc(640 + (i - 2) * 30, lerp(500, 380, k) - (i % 2) * 20, 12, 0, TAU); g.fill(); } } },
    ui: c => { DR.yearTag(c, 'OCT 2025', lt, .1); DR.write(c, 'BROAD DAYLIGHT', 640, 100, 54, lt, R(268, 10)); if (lt > R(268, 15)) DR.callout(c, 'FRENCH CROWN JEWELS', 1000, 220, lt, R(268, 15)); } })), 'whip');
  SFX(269, 6, 'tick', .7); for (let i = 0; i < 8; i++) G.SFXat(C.t(269, 0) + .2 + i * .16, 'tick', .35);
  C(269, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#15100c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const s = Math.min(8 * 60, Math.round(lt * 220)); label(g, `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, 640, 340, 180, '#ff4a3a'); }, ui: c => DR.write(c, 'IN AND OUT: UNDER 8 MINUTES', 640, 600, 50, lt, .2) })), 'whip');
  SFX(270, 3, 'chime', .4);
  C(270, null, S((lt, R, t) => ({ cam: [[640, 360, 1.4], [640, 360, 1.46]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => {}, ui: c => { DR.write(c, "THEY DON'T GO NEAR HER", 640, 640, 56, lt, .1); GX.bubble(c, 'PHEW.', 900, 220, lt, .6, 720, 300, { size: 34 }); } })), 'whip');
  SFX(271, 4, 'paper', .5); SFX(271, 13, 'buzz', .4);
  C(271, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { const k = GX.pop(lt, .2, .4); g.save(); g.translate(640, 360); g.scale(k, k); g.rotate(-.04); sh(g, '#2a2a30', 5, c => c.roundRect(-220, -150, 440, 300, 20)); sh(g, '#c8281e', 0, c => c.roundRect(-220, -150, 440, 70, 20)); label(g, 'STILL MISSING', 0, -114, 44, '#fff'); label(g, '?', 0, 40, 160, '#f2d23a'); g.restore(); },
    ui: c => DR.write(c, 'THE DIRECTOR LATER RESIGNS', 640, 100, 46, lt, .1) })), 'whip');

  // ---------------- L272–276 the plan: a private room ----------------
  mood(272, 'rising'); SFX(272, 4, 'ding', .5);
  C(272, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { DR.bpDraw(g, [[300, 560, 980, 560], [300, 560, 300, 260], [980, 560, 980, 260], [300, 260, 640, 140], [640, 140, 980, 260], [580, 560, 580, 440], [700, 560, 700, 440], [580, 440, 700, 440]], clamp(lt / 1.6), { w: 5 }); },
    ui: c => DR.write(c, 'FRANCE HAS A PLAN', 640, 90, 54, lt, .1) })), 'whip');
  SFX(273, 15, 'tada', .5); SFX(273, 22, 'pop', .5); SFX(273, 26, 'pop', .5); SFX(273, 28, 'stamp', .6);
  C(273, null, S((lt, R, t) => ({ cam: [[640, 380, 1.15], [640, 360, 1.0]], bg: (g, t) => MS.newRoom(g, t), ui: c => { DR.write(c, 'THE LOUVRE NEW RENAISSANCE', 640, 90, 46, lt, R(273, 4)); if (lt > R(273, 15)) DR.callout(c, 'A ROOM OF HER OWN', 240, 300, lt, R(273, 15)); if (lt > R(273, 22)) DR.callout(c, 'OWN ENTRANCE', 1040, 260, lt, R(273, 22)); if (lt > R(273, 26)) DR.callout(c, 'OWN TICKET', 1040, 360, lt, R(273, 26)); if (lt > R(273, 28)) DR.yearTag(c, 'BY 2031', lt, R(273, 28)); } })), 'dissolve');
  C(274, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { label(g, '?', 640, 340, 200, '#f2d23a'); }, ui: c => DR.write(c, 'THINK ABOUT THAT.', 640, 600, 56, lt, .1) })), 'dip');
  SFX(275, 5, 'coins', .5); SFX(275, 17, 'sparkle', .5);
  C(275, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { K2.tl(g, [[.05, '1503', 'PAID, NEVER RECEIVED'], [.95, '2031', 'A PRIVATE ROOM']], clamp(lt / 2.5), { y: 420 }); P(g, 'francesco', 140, 700, .32, t, { pose: 'shrug', face: { mouth: 'frown' } }); },
    ui: c => DR.write(c, '500 YEARS LATER…', 640, 110, 56, lt, .1) })), 'whip');
  SFX(276, 1, 'tada', .6);
  C(276, null, S((lt, R, t) => ({ cam: [[640, 360, 1.3], [640, 340, 1.4]], bg: (g, t) => MS.newRoom(g, t), act: (g, t) => { for (const sd of [-1, 1]) { ln(g, [[640 + sd * 260, 640], [640 + sd * 260, 560]], 10, '#c8a24a'); g.fillStyle = '#c8a24a'; g.beginPath(); g.arc(640 + sd * 260, 556, 12, 0, TAU); g.fill(); } g.strokeStyle = '#a8202a'; g.lineWidth = 16; g.beginPath(); g.moveTo(380, 570); g.quadraticCurveTo(640, 620, 900, 570); g.stroke(); },
    ui: c => DR.sign(c, 'A PRIVATE VENUE', 640, 620, lt, R(276, 1), { size: 54, fill: '#2a2a30' }) })), 'flash');

  // ---------------- L277–285 why she matters ----------------
  mood(277, 'curious'); K2.era(t0(277, 0), 'WHY SHE MATTERS', '1503–NOW');
  C(277, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => ML.mona(g, 640, 330, 300, {}), ui: c => DR.write(c, 'SO WHY DOES SHE MATTER?', 640, 630, 54, lt, .1) })), 'whip');
  SFX(278, 4, 'buzz', .6);
  C(278, null, S((lt, R, t) => ({ bg: g => { g.fillStyle = '#15100c'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { ML.mona(g, 640, 330, 280, { frame: false }); g.save(); g.globalAlpha = .7; g.strokeStyle = '#3aff6a'; g.font = '700 26px monospace'; g.fillStyle = '#3aff6a'; for (let i = 0; i < 10; i++) g.fillText('01#∆' + (i * 7 % 10), 300 + i * 70, 120 + ((lt * 200 + i * 60) % 500)); g.restore(); },
    ui: c => { DR.write(c, 'A SECRET CODE?', 640, 620, 56, lt, .1); if (lt > R(278, 4)) DR.sign(c, 'NO', 1000, 200, lt, R(278, 4), { size: 70 }); } })), 'whip');
  SFX(279, 4, 'boing', .4); SFX(279, 7, 'buzz', .6);
  C(279, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { ML.mona(g, 640, 330, 300, { look: Math.sin(lt * 3) }); P(g, 'tourist1', lerp(200, 1080, (Math.sin(lt * 1.5) + 1) / 2), 760, .4, t, { walk: t * 6, turn: .8 }); },
    ui: c => { DR.write(c, 'EYES THAT FOLLOW YOU?', 640, 100, 52, lt, .1); if (lt > R(279, 7)) DR.sign(c, 'NO', 1000, 300, lt, R(279, 7), { size: 70 }); } })), 'whip');
  SFX(280, 6, 'whoosh', .5); SFX(280, 11, 'card', .6);
  C(280, null, S((lt, R, t) => ({ cam: [[640, 400, 1.08], [640, 400, 1.12]], bg: (g, t) => MS.studio(g, t, { easel: {}, ex: 900 }), act: (g, t) => P(g, 'livingstone', 400, 760, .68, t, { pose: 'pointSide', turn: .6, face: { mouth: 'smile', eyes: 'happy' } }),
    ui: c => { DR.write(c, 'NOT EVEN THE SMILE?', 640, 100, 50, lt, .1); DR.write(c, 'MARGARET LIVINGSTONE', 400, 640, 44, lt, R(280, 11) - .2); DR.callout(c, 'HARVARD NEUROSCIENTIST', 900, 640, lt, R(280, 9)); } })), 'whip');
  SFX(281, 14, 'sparkle', .5); SFX(281, 24, 'buzz', .4);
  C(281, null, S((lt, R, t) => { const side = lt > R(281, 9) && lt < R(281, 22); return { bg: g => { g.fillStyle = '#2a2420'; g.fillRect(-300, -300, 1900, 1400); }, act: (g, t) => { const x = side ? 360 : 640; g.save(); if (side) g.filter = 'blur(2px)'; ML.mona(g, x, 360, 460, { smile: side ? .95 : .15 }); g.restore(); const ex = side ? 1060 : 640, ey = side ? 220 : 120; g.save(); g.translate(ex, ey); sh(g, '#fff', 5, c => c.ellipse(0, 0, 70, 40, 0, 0, TAU)); sh(g, '#3a2a1a', 0, c => c.arc(side ? -40 : 0, side ? 20 : 20, 22, 0, TAU)); g.restore(); },
    ui: c => DR.write(c, side ? 'CORNER OF YOUR EYE: SMILE ✓' : 'STARE STRAIGHT AT IT: GONE', 640, 650, 44, lt, 0, { col: side ? '#7ae8a0' : '#ff8a6a' }) }; }), 'whip');
  SFX(282, 3, 'card', .5);
  C(282, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#e8c890', '#f4e0b0'), act: (g, t) => { P(g, 'livingstone', 400, 760, .6, t, { pose: 'present', turn: .6, face: { mouth: 'smile' } }); P(g, 'schlechter', 880, 760, .6, t, { pose: 'think', turn: -.6, face: { mouth: 'flat', eyes: 'half' } }); }, ui: c => GX.bubble(c, "ONLY PART OF IT…", 880, 220, lt, .3, 880, 340, { size: 30 }) })), 'whip');
  mood(283, 'rising'); SFX(283, 7, 'ding', .6);
  C(283, null, S((lt, R, t) => ({ bg: g => DR.blueprint(g), act: (g, t) => { const k = clamp(lt / 3.4); g.strokeStyle = '#f2d23a'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); const pts = [[100, 600], [300, 590], [400, 560], [560, 550], [640, 400], [800, 330], [1000, 200], [1180, 100]]; g.moveTo(...pts[0]); for (let i = 1; i < pts.length * k; i++) g.lineTo(...pts[i]); g.stroke(); [['1503', 100], ['1797', 400], ['1911', 640], ['1963', 1000]].forEach(([y, x]) => label(g, y, x, 650, 28, '#fff')); },
    ui: c => DR.write(c, 'HOW FAME ACTUALLY WORKS', 640, 100, 54, lt, R(283, 6) - .2) })), 'whip');
  SFX(284, 5, 'buzz', .4);
  C(284, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#3a3a4a', '#4a4a5a'), act: (g, t) => { const k = ease.out(clamp(lt / 1.4)); sh(g, '#7ae8a0', 5, c => c.rect(420, 560 - 300 * k, 140, 300 * k)); label(g, 'HOW GOOD', 490, 610, 28, '#fff'); sh(g, '#e8707a', 5, c => c.rect(720, 560 - 120 * k, 140, 120 * k)); label(g, 'FAME?', 790, 610, 28, '#fff'); },
    ui: c => DR.write(c, "ISN'T ONLY ABOUT HOW GOOD", 640, 100, 50, lt, .1) })), 'whip');
  ['taken', 'talked', 'fought', 'passed'].forEach((_, i) => SFX(285, [6, 7, 9, 12][i], 'stamp', .7));
  C(285, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#8a1e22', '#a8282a'), act: (g, t) => ML.mona(g, 640, 360, 260, {}),
    ui: c => { [['TAKEN', 6, 260, 180], ['TALKED ABOUT', 7, 1000, 180], ['FOUGHT OVER', 9, 260, 540], ['PASSED HAND TO HAND', 12, 1000, 540]].forEach(([s, k, x, y]) => { if (lt > R(285, k) - .2) DR.sign(c, s, x, y, lt, R(285, k) - .2, { size: 34, rot: (x > 640 ? .05 : -.05) }); }); } })), 'whip');

  // ---------------- L286–292 the roll call of hands (callback: each one a quick portrait + the count sign) ----------------
  mood(286, 'tender');
  const ROLL = [[286, 'leonardo', 'A PAINTER WHO WOULDN\'T LET GO', 'studio'], [287, 'francis', 'A KING', 'bath'], [288, 'napoleon', 'AN EMPEROR', 'tui'], [289, 'peruggia', 'A HANDYMAN IN A WHITE SMOCK', 'stair'], [290, 'jaujard', 'A MUSEUM DIRECTOR WITH A TRUCK', 'cham'], [291, 'jackie', 'A FIRST LADY', 'nga']];
  ROLL.forEach(([n, who, cap, set], i) => { SFX(n, null, 'whoosh', .5); SFX(n, null, 'card', .5, null, .15);
    C(n, null, S((lt, R, t) => ({ cam: [[640, 400, 1.15], [640, 400, 1.2]], bg: (g, t) => set === 'studio' ? MS.studio(g, t, { easel: {} }) : set === 'bath' ? MS.bath(g, t, {}) : set === 'tui' ? MS.tuileries(g, t, {}) : set === 'stair' ? MS.stair(g, t) : set === 'cham' ? MS.chambord(g, t) : MS.nga(g, t, {}),
      act: (g, t) => { if (set === 'cham') truck(g, 900, 700, .6, t); P(g, who, 400, 760, .7, t, { pose: 'present', turn: .5, face: { mouth: 'smile', eyes: 'happy' } }); }, atm: { warm: .25 },
      ui: c => { DR.write(c, cap, 640, 100, cap.length > 20 ? 44 : 60, lt, .05); c.save(); c.globalAlpha = .9; DR.write(c, `#${i + 1}`, 1100, 600, 90, lt, .1, { col: '#f2d23a' }); c.restore(); } })), i % 2 ? 'whipL' : 'whip'); });
  K2.hands(t0(292, 1), 9, '20,000 A DAY'); SFX(292, 1, 'tada', .6); for (let i = 0; i < 10; i++) G.SFXat(C.t(292, 6) + i * .2, 'tick', .3);
  C(292, null, S((lt, R, t) => ({ cam: [[640, 380, 1.0], [640, 370, 1.1]], bg: (g, t) => MS.louvre(g, t), crowd: K2.phones(-60, 590, 1340, 712, 40, 292, { s0: .3, s1: .44 }), act: (g, t) => { for (let i = 0; i < 8; i++) if (((t * 1.6 + i * .37) % 2) < .1) { g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 140 + i * 140, 420 + (i % 3) * 40, 60, 'rgba(255,255,255,.9)'); g.restore(); } },
    ui: c => DR.write(c, '20,000 STRANGERS A DAY', 640, 100, 56, lt, R(292, 1)) })), 'whip');

  // ---------------- L293–297 the return to the cold open (POV) ----------------
  mood(293, 'tender'); AMB(293, 'crowd', 14, .6);
  C(293, null, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 360, 1.25]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { /* heads drawn by s1's style */ }, crowd: K2.phones(-60, 640, 1340, 712, 18, 293, { s0: .5, s1: .6 }), ui: c => DR.write(c, 'AT THE FRONT OF THE CROWD', 640, 100, 50, lt, .3) })), 'dissolve');
  SFX(294, 0, 'pencil', .5, 1); SFX(294, 3, 'pencil', .5, 1);
  C(294, null, S((lt, R, t) => ({ cam: [[640, 360, 1.7], [640, 360, 1.76]], bg: (g, t) => MS.louvre(g, t), ui: c => { DR.write(c, '30 in', 1000, 360, 60, lt, .1, { col: '#f2d23a' }); DR.write(c, '× 21 in', 640, 620, 60, lt, R(294, 2), { col: '#f2d23a' }); } })), 'whip');
  SFX(295, 1, 'boing', .3);
  C(295, null, S((lt, R, t) => ({ cam: [[640, 360, 1.7], [640, 360, 1.0], 'out'], bg: (g, t) => MS.louvre(g, t), crowd: K2.phones(-60, 620, 1340, 712, 22, 295), ui: c => DR.write(c, 'SMALLER THAN YOU EXPECTED', 640, 100, 50, lt, .2) })), 'zoom');
  SFX(296, 3, 'camera', .9, null, .4);
  C(296, null, S((lt, R, t) => ({ bg: (g, t) => MS.louvre(g, t), act: (g, t) => K2.pov(g, t, lt, { up: clamp(lt / .9), flash: lt > R(296, 3) + .3 ? (lt - R(296, 3) - .3) / .4 : 0 }), ui: c => DR.write(c, 'YOU LIFT YOUR PHONE.', 420, 160, 48, lt, .2) })), 'whip');
  mood(297, 'rising'); SFX(297, 2, 'whoosh', .6); SFX(297, 4, 'tada', .5);
  C(297, null, S((lt, R, t) => ({ cam: [[640, 360, 1.0], [640, 360, 1.18]], bg: (g, t) => MS.louvre(g, t), act: (g, t) => { const sl = ['#7a4a5a', '#e8dcc0', '#1e2a4a', '#f6f4ee', '#5a5e66', '#e86a9a', '#3a8ae8', '#e8a03a']; for (let i = 0; i < 8; i++) { const a = PI * .15 + i / 7 * PI * .7, k = ease.out(clamp((lt - i * .18) / .5)), d = lerp(900, 360, k); GX.hand(g, 640 + Math.cos(a) * d * 1.3, 360 + Math.sin(a) * d, .5, a, { kind: 'open', sleeve: sl[i] }); } },
    ui: c => DR.write(c, 'AND THE HANDS KEEP COMING', 640, 110, 60, lt, .3) })), 'dissolve');

  // ---------------- L298–301 outro + end screen ----------------
  mood(298, 'warm'); EP.ticket('HOW DID SHE GET FAMOUS?', t0(283, 0), t0(298, 0), t0(283, 7), true);
  SFX(298, 4, 'ding', .7);
  C(298, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8281e', '#e8382e'), act: (g, t) => { ML.mona(g, 380, 360, 300, {}); const k = GX.pop(lt, R(298, 4), .3); if (k > 0) { g.save(); g.translate(880, 360); g.scale(k, k); sh(g, '#c8281e', 6, c => c.roundRect(-200, -60, 400, 120, 20)); label(g, 'SUBSCRIBE', 0, 4, 60, '#fff'); g.restore(); GX.hand(g, 1150, 520, .5, -2.6, { kind: 'point' }); } } })), 'whip');
  SFX(299, 3, 'pop', .6); SFX(299, 17, 'boing', .4);
  C(299, null, S((lt, R, t) => ({ cam: [[640, 400, 1.1], [640, 400, 1.15]], bg: (g, t) => MS.tuileries(g, t, {}), act: (g, t) => { P(g, 'napoleon', 900, 760, .66, t, { pose: 'thumbsUp', turn: -.4, face: { mouth: 'grin', eyes: 'happy' } }); },
    ui: c => { DR.write(c, 'QUESTION FOR THE COMMENTS', 640, 90, 46, lt, .2); GX.bubble(c, 'WHICH PAINTING\nWOULD YOU TAKE HOME\nFOR 4 YEARS?', 420, 420, lt, R(299, 6), 820, 520, { size: 34 }); } })), 'whip');
  SFX(300, 9, 'whoosh', .5);
  C(300, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#2a3a5a', '#3a4a6a'), act: (g, t) => { const k = GX.pop(lt, .2, .3); g.save(); g.translate(640, 360); g.scale(k, k); sh(g, '#15100c', 5, c => c.roundRect(-260, -150, 520, 300, 20)); ML.painting(g, -230, -120, 460, 240, 6); sh(g, '#c8281e', 0, c => c.arc(0, 0, 50, 0, TAU)); g.fillStyle = '#fff'; g.beginPath(); g.moveTo(-14, -24); g.lineTo(26, 0); g.lineTo(-14, 24); g.closePath(); g.fill(); g.restore(); },
    ui: c => DR.write(c, 'WATCH THIS NEXT', 640, 640, 56, lt, .3) })), 'whip');
  SFX(301, 0, 'tada', .6);
  C(301, null, S((lt, R, t) => ({ bg: g => DR.sunburst(g, t, '#c8a24a', '#f2d888'), act: (g, t) => { ML.mona(g, 640, 330, 300, { smile: .9 }); GX.hand(g, 900, 330, .45, -.3, { kind: 'open', sleeve: '#5a4a3a' }); }, ui: c => DR.write(c, 'THANKS FOR WATCHING!', 640, 640, 66, lt, .1) })), 'flash');
  // end screen (music only)
  C.at(1148.6, (ctx, lt, dur, t, R) => DR.shot(ctx, lt, dur, t, { bg: g => { g.fillStyle = '#20202c'; g.fillRect(-300, -300, 1900, 1400); g.save(); g.globalCompositeOperation = 'lighter'; T.glow(g, 640, 300, 500, 'rgba(255,220,160,.12)'); g.restore(); },
    act: (g, t) => { for (const x of [330, 950]) { sh(g, '#15100c', 5, c => c.roundRect(x - 230, 200, 460, 260, 18)); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(x - 210, 220, 420, 220); } ML.mona(g, 640, 620, 130, {}); },
    ui: c => { DR.write(c, 'WATCH NEXT', 330, 160, 40, lt, .1); DR.write(c, 'MORE STORIES', 950, 160, 40, lt, .2); } }), 'dissolve');
})(window);
