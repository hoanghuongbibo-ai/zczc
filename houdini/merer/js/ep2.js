/* Merer's Diary — CH 5 (morning: the quarry at Tura) + CH 6 (midday: the river is the highway). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, ES = G.ES, EK = G.EK, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, PI = Math.PI, DISP = s => `${s}px "Luckiest Guy"`;
  const { S, fx, mood, fig, theo, push, cover, card, LIGHT } = EP;
  const mul = (h, k) => Gd.hexMul(h, k);

  // schematic map of the Giza / Tura stretch: desert plateau, green floodplain, the modern Nile, the old "Khufu branch"
  function localMap(ctx, lt, t, o = {}) {
    ctx.fillStyle = '#e6cf9e'; ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .35, 201, 'multiply', 1.4);
    ctx.fillStyle = '#9fbf6a'; ctx.beginPath(); ctx.moveTo(380, 0); ctx.bezierCurveTo(420, 200, 360, 420, 420, H); ctx.lineTo(1010, H); ctx.bezierCurveTo(960, 480, 1040, 220, 980, 0); ctx.closePath(); ctx.fill(); P2.grain(ctx, 360, 0, 700, H, .3, 203, 'overlay', 1);
    // the modern Nile (east)
    ctx.lineCap = 'round'; ctx.lineWidth = 34; ctx.strokeStyle = '#4f86a0'; ctx.beginPath(); ctx.moveTo(880, -20); ctx.bezierCurveTo(840, 200, 920, 420, 860, H + 20); ctx.stroke(); ctx.lineWidth = 24; ctx.strokeStyle = '#8fc0d6'; ctx.stroke();
    // the old western branch near the plateau, drawn on o.branch (0..1), with the harbor basin
    const b = clamp(o.branch ?? 0); if (b > 0) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H * b); ctx.clip(); ctx.lineWidth = 26; ctx.strokeStyle = '#4f86a0'; ctx.beginPath(); ctx.moveTo(470, -20); ctx.bezierCurveTo(440, 200, 520, 420, 470, H + 20); ctx.stroke(); ctx.lineWidth = 16; ctx.strokeStyle = '#8fc0d6'; ctx.stroke(); ctx.restore(); }
    if ((o.basin ?? 0) > 0) { ctx.save(); ctx.globalAlpha = clamp(o.basin); sh(ctx, '#8fc0d6', 4, c => c.ellipse(380, 360, 60, 40, 0, 0, TAU)); ln(ctx, [[436, 366], [470, 360]], 14, '#8fc0d6'); ctx.restore(); }
    // the Giza plateau (west) with the pyramids, the Tura cliffs (east bank)
    for (const [x, y, w] of [[250, 330, 90], [180, 430, 74], [130, 510, 50]]) ES.pyramid(ctx, x, y, w, { k: 1 });
    ctx.fillStyle = '#efe6d2'; ctx.beginPath(); ctx.moveTo(1050, 380); ctx.lineTo(1280, 340); ctx.lineTo(1280, 640); ctx.lineTo(1060, 620); ctx.closePath(); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = OUT; ctx.stroke(); for (let i = 0; i < 5; i++) ln(ctx, [[1070, 400 + i * 45], [1270, 380 + i * 45]], 2, 'rgba(110,90,60,.4)');
    EK.txt(ctx, 'GIZA', 220, 590, DISP(30), '#7a4a2a'); EK.txt(ctx, 'TURA', 1160, 680, DISP(30), '#7a4a2a'); EK.txt(ctx, 'NILE today', 900, 120, '700 22px Fredoka', '#2a5a7a');
    if (b > .7) EK.txt(ctx, 'the "Khufu branch"', 520, 90, '700 22px Fredoka', '#2a5a7a');
    if (o.loop) ES.route(ctx, [[1050, 520], [880, 470], [700, 440], [480, 400], [430, 370]].map(p => [p[0], p[1]]), { lon: 0, lat: 0, z: 1 }, 0);
  }
  EP.localMap = localMap;
  const loopPath = [[1080, 560], [880, 520], [660, 470], [470, 400], [420, 362]];
  const drawPath = (ctx, pts, k, col = '#b8322a', w = 7, dash) => { if (k <= 0) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let rem = L * clamp(k); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const go = (lw, c, d) => { let r2 = rem; ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length && r2 > 0; i++) { const f = Math.min(1, r2 / seg[i - 1]); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); r2 -= seg[i - 1]; } ctx.lineWidth = lw; ctx.strokeStyle = c; ctx.setLineDash(d || []); ctx.stroke(); };
    go(w + 5, 'rgba(255,250,235,.85)'); go(w, col, dash ? [14, 10] : null); ctx.restore(); };
  EP.drawPath = drawPath;

  // ===================== CH 5: morning at Tura =====================
  mood('boatback', 'nileWork');
  fx('boatback', 'river', .4, 0, 6);
  S('boatback', (ctx, lt, dur, t, R) => {   // you're one of ~40 men — a phyle — part of a gang of ~160 named after its boat
    const z = lerp(1.25, 1.0, ease.inOut(clamp((lt - R('gang')) / 1.6))); ctx.save(); ctx.translate(640, 520); ctx.scale(z, z); ctx.translate(-640, -520);
    ES.nile(ctx, t, 0, { v: 'day', cliff: 'near', h: 300, bankY: 560 }); ES.boat(ctx, 860, 520, .7, t, { blocks: 0 });
    const n = lt > R('gang') ? 4 : 1; for (let c = 0; c < n; c++) for (let i = 0; i < 40; i++) { const x = 420 + (i % 10) * 34 + (c % 2) * 380 - (c > 1 ? 190 : 0), y = 600 + Math.floor(i / 10) * 26 + (c > 1 ? 104 : 0); if (c > 0) { const a = clamp((lt - R('gang') - c * .25) / .3); if (a <= 0) continue; } ES.ew(ctx, x, y, .8, t, { pose: 'stand', seed: i + c * 40, dir: -1 }); }
    ctx.restore(); EK.chapter(ctx, lt, 5, 'Morning: the quarry at Tura');
    if (lt > R('forty2')) K.counter(ctx, 640, 150, 0, 40, lt, R('forty2') + .6, .8, 'men in your crew', { prefix: '~', size: 76 });
    if (lt > R('phyle')) K.tag(ctx, 'a phyle (FILE) = a work crew', 1000, 300, lt, R('phyle') + .2, { size: 24 });
    if (lt > R('gang')) K.tag(ctx, 'a gang ≈ 160 men, named after its boat', 300, 300, lt, R('gang') + 1.6, { size: 24, fill: '#f6c945' });
  });
  S('boatname', (ctx, lt, dur, t, R) => {   // the boat's name: "The Uraeus of Khufu Is Its Prow"; a uraeus = the royal cobra
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.nile(ctx, t, 0, { v: 'day', near: false, h: 260 }); ES.boat(ctx, 300, 600, 1.7, t, { blocks: 1, mast: false }); ctx.restore();
    EK.logCard(ctx, lt, R('uraeus') - .6, '"The Uraeus of Khufu Is Its Prow"', { x: 760, y: 170, w: 760, size: 34, source: '— the boat\'s name, trans. Tallet', writeDur: .8 });
    if (lt > R('cobra')) { const k = K.pop(lt, R('cobra') + .3); ctx.save(); ctx.translate(1060, 420); ctx.scale(k, k); G.Guide.draw(ctx, 0, 230, .5, EP.cast('khufu', { pose: 'idle', still: true, light: { cast: 0, contact: 0 } })); ctx.restore(); K.tag(ctx, 'uraeus = the royal cobra on the king\'s crown', 760, 650, lt, R('cobra') + .5, { size: 24 }); }
    if (lt > R('shirt')) { const k = K.pop(lt, R('shirt') + .2); ctx.save(); ctx.translate(780, 420); ctx.scale(k, k); ctx.rotate(-.05); sh(ctx, '#2a6a96', 4.5, c => { c.moveTo(-120, -120); c.lineTo(-40, -150); c.quadraticCurveTo(0, -126, 40, -150); c.lineTo(120, -120); c.lineTo(150, -60); c.lineTo(100, -40); c.lineTo(100, 130); c.lineTo(-100, 130); c.lineTo(-100, -40); c.lineTo(-150, -60); c.closePath(); });
      EK.txt(ctx, 'TEAM', 0, -60, DISP(34), '#f6c945'); EK.txt(ctx, 'ROYAL SNAKE', 0, -20, DISP(30), '#f6c945'); sh(ctx, '#e0b440', 3, c => { c.moveTo(-10, 100); c.quadraticCurveTo(20, 70, 0, 40); c.quadraticCurveTo(-20, 20, 4, 10); c.quadraticCurveTo(26, 14, 18, 34); c.lineTo(8, 40); c.quadraticCurveTo(28, 70, 6, 100); c.closePath(); }); ctx.restore(); }
  });
  S('tura', (ctx, lt, dur, t, R) => {   // the east bank at Tura, across from (modern) Cairo — pan across the river to the white cliffs
    const pan = lerp(260, -160, ease.inOut(clamp(lt / dur))); ctx.save(); ES.nile(ctx, t, pan, { v: 'day', cliff: 'near', h: 300, bankY: 570 });
    for (let i = 0; i < 12; i++) ES.ew(ctx, 520 + i * 60 - pan, 620 + (i % 3) * 18, 1.4, t, { pose: i % 4 ? 'stand' : 'walk', seed: i + 7, dir: -1 }); ctx.restore();
    EP.dateTag(ctx, 'TURA · EAST BANK OF THE NILE');
    if (lt > R('cairo')) { const k = K.pop(lt, R('cairo') + .2); ctx.save(); ctx.translate(1060, 200); ctx.scale(k * .28, k * .28); ctx.translate(-640, -360); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); localMap(ctx, lt, t, { branch: 0 }); EK.txt(ctx, '(modern Cairo ↑)', 900, 40, '700 40px Fredoka', '#7a4a2a'); ctx.restore(); ctx.strokeStyle = OUT; ctx.lineWidth = 4; ctx.strokeRect(1060 - 179 * k, 200 - 101 * k, 358 * k, 202 * k); }
  });
  fx('fine', 'sparkle', .4, .3);
  S('special', (ctx, lt, dur, t, R) => {   // fine, white and smooth: the casing stone
    ctx.save(); push(ctx, lt, dur, 1.2, 1.32, 520, 300); ES.cliff(ctx, t, 0, { v: 'day' }); ctx.restore();
    [['fine', R('fine')], ['white', R('fine') + .9], ['smooth', R('fine') + 1.8], ['the good stuff', R('fine') + 2.5]].forEach(([s2, at], i) => K.tag(ctx, s2, 200 + i * 290, 600, lt, at, { size: 30, rot: (i % 2 ? .04 : -.04), fill: i === 3 ? '#f6c945' : undefined }));
    if (lt > R('outside')) { const k = K.pop(lt, R('outside') + .2); ctx.save(); ctx.translate(1000, 280); ctx.scale(k, k); sh(ctx, '#7ab0d8', 4, c => c.roundRect(-170, -150, 340, 300, 14)); ES.pyramid(ctx, 0, 120, 280, { k: 1, casing: 1 }); ctx.save(); ctx.globalCompositeOperation = 'lighter'; T.glow(ctx, -20 + Math.sin(t * 2) * 30, -10, 120, 'rgba(255,250,230,.6)'); ctx.restore(); ctx.restore(); K.tag(ctx, 'the outside of a monument that shines', 1000, 470, lt, R('outside') + .5, { size: 22 }); }
  });
  fx('notcarve', 'clink', .4, .4); fx('notcarve', 'clink', .3, 1.1); fx('quarrymen', 'clink', .3, .3);
  S('notcarve', (ctx, lt, dur, t, R) => {   // not your job: quarrymen do that
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 400); ES.cliff(ctx, t, 0, { v: 'day' }); for (let i = 0; i < 8; i++) ES.ew(ctx, 180 + i * 130, 470 + (i % 2) * 10, 1.5, t, { pose: 'chisel', seed: i + 3, dir: i % 2 ? 1 : -1 }); ctx.restore();
    K.tag(ctx, 'quarrymen: cutting the blocks', 640, 640, lt, R('quarrymen') - .2, { size: 28 });
  });
  fx('haul', 'rumble', .35, .5);
  S('haul', (ctx, lt, dur, t, R) => {   // your job: haul the finished blocks to the water and load them onto the boat (a timber ramp up to the deck)
    ctx.save(); push(ctx, lt, dur, 1.0, 1.04); ES.nile(ctx, t, 0, { v: 'day', cliff: 'near', h: 280, bankY: 560, reeds: false }); ES.boat(ctx, 1010, 548, .7, t, { blocks: 1, mast: false });
    sh(ctx, '#9a6a3e', 3.5, c => { c.moveTo(700, 610); c.lineTo(930, 520); c.lineTo(940, 538); c.lineTo(712, 630); c.closePath(); }); for (let i = 0; i < 8; i++) ln(ctx, [[720 + i * 28, 606 - i * 11], [728 + i * 28, 624 - i * 11]], 2, 'rgba(60,36,16,.6)');
    const bx = lerp(250, 560, ease.inOut(clamp(lt / dur))); ES.sledge(ctx, bx, 660, .62, { ropeTo: 540, ropeY: -40 });
    for (let i = 0; i < 7; i++) ES.ew(ctx, bx + 120 + i * 40, 650 + (i % 2) * 6, 1.25, t, { pose: 'pull', seed: i + 11, speed: 3 }); ES.ew(ctx, bx - 110, 668, 1.25, t, { pose: 'push', seed: 19, speed: 3 });
    ctx.restore();
    if (lt > R('tons')) K.title(ctx, '2–3 metric tons each', lt, R('tons') + .2, { y: 120, size: 52 }); if (lt > R('pounds')) K.tag(ctx, '≈ 4,400–6,600 lb', 640, 190, lt, R('pounds') + .3, { size: 30 });
  });
  fx('spendday', 'scratch', .6, .2); fx('night1', 'scratch', .5, .2);
  S('entry', (ctx, lt, dur, t, R) => {   // the log: "Spends the day with his team hauling stones in Tura South"
    ctx.fillStyle = '#4a3020'; ctx.fillRect(0, 0, W, H); EP.deck(ctx, 0, .7);
    EK.logCard(ctx, lt, R('spendday') - .5, 'Spends the day with his team hauling stones in Tura South.', { y: 260, w: 980, size: 34 });
    if (lt > R('night1')) EK.logCard(ctx, lt, R('night1'), 'Spends the night there.', { y: 520, w: 640, size: 34, rot: .015, seed: 5 });
  });
  fx('hauled', 'stamp', .5); fx('slept', 'stamp', .5);
  S('thatsit', (ctx, lt, dur, t, R) => {   // that's it. No complaints, no heroics. We hauled. We slept here.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); ES.nile(ctx, t, 0, { v: 'night', near: false, h: 320 }); EP.deck(ctx, 560, .5);
    for (let i = 0; i < 6; i++) ES.ew(ctx, 90 + i * 150, 610 + (i % 2) * 14, 2.1, t, { pose: 'sleep', seed: i + 21 }); P2.lantern(ctx, 1040, 470, t, .8);
    fig(ctx, 'merer', 980, 740, .75, { t, pose: 'idle', turn: -.4, light: LIGHT.lamp, face: { mouth: 'smile', eyes: 'half' } }); ctx.restore();
    if (lt > R('heroics')) K.tag(ctx, 'no complaints · no heroics', 640, 110, lt, R('heroics') + .2, { size: 28 });
    if (lt > R('hauled')) FX.stamp(ctx, 'WE HAULED.', 380, 300, lt - R('hauled'), { color: '#c8322a', size: 46, rot: -.12 }); if (lt > R('slept')) FX.stamp(ctx, 'WE SLEPT HERE.', 860, 340, lt - R('slept'), { color: '#2a6a96', size: 46, rot: .08 });
  });
  S('wondering', (ctx, lt, dur, t, R) => {   // why move giant rocks by boat when you could drag them? (split: drag across the desert vs float)
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 636, H); ctx.clip(); ctx.translate(-300, 0); ES.desertRamp(ctx, t, 0, {}); const bx = 700 + Math.sin(t) * 4; ES.sledge(ctx, bx, 600, .7, { ropeTo: 300, ropeY: -20 }); for (let i = 0; i < 5; i++) ES.ew(ctx, bx + 170 + i * 46, 600, 1.2, t, { pose: 'pull', seed: i + 31, speed: 2 }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(644, 0, 636, H); ctx.clip(); ctx.translate(320, 0); ES.nile(ctx, t, 0, { v: 'day', near: false, h: 300 }); ES.boat(ctx, 640 + Math.sin(t * .3) * 20, 560, .8, t, { blocks: 3, sail: .9 }); ctx.restore(); ln(ctx, [[640, 0], [640, H]], 8);
    K.tag(ctx, 'drag it 10 miles?', 320, 110, lt, .3, { size: 30 }); K.tag(ctx, '…or float it?', 960, 110, lt, 1.6, { size: 30 }); if (lt > R('herewhy')) K.title(ctx, 'HERE\'S WHY', lt, R('herewhy'), { y: 360, size: 64 });
  });

  // ===================== CH 6: the river is the highway =====================
  mood('fourmi', 'nile');
  fx('branch', 'whoosh', .4, .4);
  S('fourmi', (ctx, lt, dur, t, R) => {   // MAP: the Nile today ~4 miles from the pyramids; in Khufu's time a branch ran close to the plateau
    localMap(ctx, lt, t, { branch: clamp((lt - R('branch')) / 2.2) });
    if (lt < R('branch') + 1) { ctx.save(); ctx.setLineDash([10, 8]); ln(ctx, [[300, 300], [860, 300]], 4, '#b8322a'); ctx.restore(); K.tag(ctx, '~4 miles today', 580, 270, lt, .5, { size: 26 }); }
    EK.chapter(ctx, lt, 6, 'Midday: the river is the highway');
  });
  S('pnas', (ctx, lt, dur, t, R) => {   // 2022, PNAS: sediment cores + ancient pollen → 8,000 years of water levels → ~40 % of maximum
    ctx.fillStyle = '#efe4cc'; ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .25, 211, 'multiply', 1);
    EK.nameCard(ctx, lt, .2, 'HADER SHEISHA + team', 'study in PNAS, 2022', 330, 110, { icon: 'drill', w: 460 });
    // a sediment core: coloured layers, pollen grains appearing
    const ck = K.pop(lt, R('cores') - .2, .4); if (ck > 0) { ctx.save(); ctx.translate(330, 420); ctx.scale(ck, ck); const cols = ['#c8a06a', '#8a6a4a', '#b8905a', '#6a5a4a', '#a8885a', '#7a6a50', '#c0a070']; cols.forEach((c2, i) => sh(ctx, c2, 3, cc => cc.rect(-50, -200 + i * 57, 100, 57))); const r = rng(4); for (let i = 0; i < 30; i++) { const a = clamp((lt - R('cores') - .5 - i * .05) / .2); if (a <= 0) continue; sh(ctx, '#e8d84a', 1.5, circ(-40 + r() * 80, -190 + r() * 380, 4 * a)); } ctx.restore(); K.tag(ctx, 'sediment cores + ancient pollen', 330, 670, lt, R('cores') + .3, { size: 22 }); K.tag(ctx, '8,000 years of water levels', 330, 160 + 60, lt, R('cores') + 2.5, { size: 22, fill: '#f6c945' }); }
    // the gauge
    const gk = clamp((lt - R('forty3')) / 1.4); if (lt > R('result')) { ctx.save(); ctx.translate(900, 420); sh(ctx, '#f7eedb', 4, c => c.roundRect(-90, -230, 180, 460, 16)); const lvl = lerp(0, .4, ease.out(gk)); ctx.save(); ctx.beginPath(); ctx.roundRect(-80, -220, 160, 440, 12); ctx.clip(); ctx.fillStyle = '#4f86a0'; ctx.fillRect(-80, 220 - 440 * lvl, 160, 440 * lvl); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-80, 220 - 440 * lvl, 160, 6); ctx.restore();
      for (let i = 0; i <= 10; i++) ln(ctx, [[60, 220 - i * 44], [80, 220 - i * 44]], 2); EK.txt(ctx, Math.round(lvl * 100) + '%', 0, 120, DISP(54), '#fff6e0'); ctx.restore(); K.tag(ctx, 'Khufu\'s reign: the branch stayed fairly high', 900, 120, lt, R('reigns') + .2, { size: 22 }); if (gk >= 1) K.tag(ctx, '≈ 40 % of its maximum', 900, 690, lt, R('forty3') + 1.4, { size: 26, fill: '#f6c945' }); }
  });
  fx('lake', 'splash', .3, 1);
  S('lake', (ctx, lt, dur, t, R) => {   // a lake or basin of Khufu, an entrance to it, right by the building site — boats unloading
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 480); ES.giza(ctx, t, 0, { v: 'day', k: .9, basin: true, basinY: 560 });
    ES.boat(ctx, 360, 640, .55, t, { blocks: 2 }); ES.boat(ctx, 900, 660, .62, t, { blocks: 1, ph: 2 }); for (let i = 0; i < 6; i++) ES.ew(ctx, 520 + i * 40, 556, .9, t, { pose: i % 2 ? 'carry' : 'walk', seed: i + 51 }); ctx.restore();
    if (lt > R('basin')) K.tag(ctx, 'a "lake / basin of Khufu"', 400, 150, lt, R('basin'), { size: 26 }); if (lt > R('basin') + 2) K.tag(ctx, '…and an entrance to it', 400, 200, lt, R('basin') + 2, { size: 22 }); if (lt > R('site')) K.tag(ctx, 'right by the building site', 900, 150, lt, R('site'), { size: 26, fill: '#f6c945' });
  });
  // the inundation: fields go under water
  function floodScene(ctx, t, lvl, pan = 0) {
    ES.nile(ctx, t, pan, { v: 'day', near: false, h: 300, reeds: false });
    const y0 = 330, r = rng(61); for (let i = 0; i < 12; i++) { const x = -40 + i * 120, y = y0 + 20 + (i % 3) * 70; sh(ctx, i % 2 ? '#7aa84a' : '#9ac05a', 2.5, c => c.rect(x, y, 110, 60)); ctx.strokeStyle = 'rgba(60,90,30,.4)'; ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x + 6, y + 8 + k * 11); ctx.lineTo(x + 104, y + 8 + k * 11); ctx.stroke(); } }
    for (const [x, y] of [[300, 400], [820, 360], [1100, 470]]) { sh(ctx, '#c8a070', 3, c => c.ellipse(x, y + 30, 90, 26, 0, 0, TAU)); sh(ctx, '#d8b884', 3, c => c.rect(x - 40, y - 30, 80, 56)); sh(ctx, '#2a1e16', 0, c => c.rect(x - 8, y - 6, 16, 32)); ES.palm(ctx, x + 60, y + 24, .5, 3 + x); }
    if (lvl > 0) { const top = lerp(720, 330, lvl); ctx.save(); ctx.globalAlpha = .92; ES.water(ctx, t, top, H, 'day', { flow: .6 }); ctx.restore(); ln(ctx, [[0, top], [W, top]], 3, 'rgba(255,255,255,.5)');
      for (const [x, y] of [[300, 400], [820, 360], [1100, 470]]) if (top < y + 40) { sh(ctx, '#d8b884', 3, c => c.rect(x - 40, y - 30, 80, Math.max(0, top - (y - 30)))); sh(ctx, '#2a1e16', 0, c => c.rect(x - 8, y - 6, 16, Math.max(0, Math.min(32, top - y + 6)))); } }
  }
  S('second', (ctx, lt, dur, t, R) => {   // the inundation, July–October: farmers' fields go under water; the flood becomes the delivery system
    const lvl = ease.inOut(clamp((lt - R('under')) / 3)); ctx.save(); push(ctx, lt, dur, 1.0, 1.05); floodScene(ctx, t, lvl); if (lt > R('delivery')) ES.boat(ctx, lerp(-300, 640, ease.out(clamp((lt - R('delivery')) / 3))), 600, .7, t, { blocks: 2, sail: .9 }); ctx.restore();
    K.tag(ctx, 'the inundation: the summer flood', 640, 110, lt, R('inund'), { size: 28 }); if (lt > R('julyoct')) K.tag(ctx, '≈ July → October', 640, 160, lt, R('julyoct'), { size: 26, fill: '#f6c945' });
    if (lt > R('farmers') && lt < R('delivery')) K.tag(ctx, 'most of the year: farmers', 300, 230, lt, R('farmers'), { size: 24 }); if (lt > R('under') && lt < R('delivery')) K.tag(ctx, 'fields under water', 960, 230, lt, R('under') + .5, { size: 24 });
    if (lt > R('delivery')) K.title(ctx, 'the flood = the delivery system', lt, R('delivery') + .2, { y: 250, size: 44 }); if (lt > R('float')) K.tag(ctx, 'boats float right up to the desert\'s edge', 640, 660, lt, R('float'), { size: 24 });
  });
  fx('day26', 'scratch', .6, .4);
  S('sail', (ctx, lt, dur, t, R) => {   // Merer's log, day 26: casts off from Tura, loaded with stone, for Akhet-Khufu
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05); ES.nile(ctx, t, lt * 20, { v: 'day', near: false, h: 260 }); ES.boat(ctx, 640, 600, 1.0, t, { blocks: 3, sail: clamp((lt - R('castsoff')) / 1.2), rowers: 6 }); ctx.restore();
    EK.logCard(ctx, lt, R('day26') - .3, 'Day 26: Inspector Merer casts off with his team from Tura [South], loaded with stone, for Akhet-Khufu.', { y: 190, w: 1000, size: 30, writeDur: 1 });
  });
  S('horizon', (ctx, lt, dur, t, R) => {   // Akhet-Khufu (AH-ket KOO-foo) = "Horizon of Khufu" — the name of the Great Pyramid itself
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 380); ES.giza(ctx, t, 0, { v: 'dawn', k: 1 }); ctx.restore();
    const k = K.pop(lt, .3); if (k > 0) { ctx.save(); ctx.translate(640, 230); ctx.scale(k, k); sh(ctx, '#f7eedb', 4, c => c.roundRect(-110, -80, 220, 160, 14)); sh(ctx, '#d89a3a', 3, c => { c.moveTo(-70, 40); c.quadraticCurveTo(-60, -10, -30, 40); c.closePath(); }); sh(ctx, '#d89a3a', 3, c => { c.moveTo(30, 40); c.quadraticCurveTo(60, -10, 70, 40); c.closePath(); }); sh(ctx, '#c8322a', 3, circ(0, 14, 24)); ln(ctx, [[-90, 44], [90, 44]], 4); ctx.restore(); }
    K.title(ctx, 'AKHET-KHUFU', lt, .6, { y: 400, size: 64 }); K.tag(ctx, '(AH-ket KOO-foo) = "Horizon of Khufu"', 640, 470, lt, 1.0, { size: 28 }); if (lt > R('itself')) K.tag(ctx, 'the name of the Great Pyramid itself', 640, 530, lt, R('itself') + .2, { size: 26, fill: '#f6c945' });
  });
  S('nightnear', (ctx, lt, dur, t, R) => {   // a night near the basin, unload next day — then back upriver, empty
    const empty = lt > R('upriver'); ctx.save(); push(ctx, lt, dur, 1.0, 1.04);
    if (!empty) { ES.giza(ctx, t, 0, { v: 'night', k: .9, basin: true, basinY: 540 }); ES.boat(ctx, 640, 640, .8, t, { blocks: 3, sleepers: 6 }); P2.lantern(ctx, 900, 560, t, .6); }
    else { ES.nile(ctx, t, -lt * 20, { v: 'day', near: false, h: 280 }); ES.boat(ctx, 640, 600, .9, t, { blocks: 0, sail: 1, dir: -1, rowers: 5 }); }
    ctx.restore(); if (!empty) K.tag(ctx, 'a night near the basin · unload next day', 640, 120, lt, .4, { size: 26 }); else K.tag(ctx, 'back upriver, empty, to Tura', 640, 120, lt, R('upriver') + .2, { size: 28 });
  });
  S('loop', (ctx, lt, dur, t, R) => {   // the loop ≈ 25 miles; 2–3 round trips / 10 days; ~30 blocks a trip; ≈ 200 a month for one team
    localMap(ctx, lt, t, { branch: 1, basin: 1 });
    drawPath(ctx, loopPath, clamp((lt - .3) / 1.6)); drawPath(ctx, loopPath.slice().reverse().map(p => [p[0] + 14, p[1] + 26]), clamp((lt - 2) / 1.6), '#2a6a96', 6, true);
    K.tag(ctx, 'the whole loop: ~25 miles', 760, 640, lt, 1.4, { size: 28 });
    EK.onScreen(ctx, lt, R('trips') + .3, '~2–3 round trips per 10 days · ~30 blocks per trip (estimate)', { y: 70, size: 24 });
    if (lt > R('twohundred')) EK.count(ctx, 640, 300, 200, lt, R('twohundred') + .4, 1, 'blocks a month · one team', { prefix: '≈ ', size: 84 });
  });
  S('tendays', (ctx, lt, dur, t, R) => {   // ten days = the Egyptian work week — longer than mine; but not all year
    ctx.fillStyle = '#efe4cc'; ctx.fillRect(0, 0, W, H); P2.grain(ctx, 0, 0, W, H, .25, 221, 'multiply', 1);
    EK.calendar(ctx, lt, .2, { y: 360 });
    if (lt > R('notyear')) K.tag(ctx, '…but not all year: only during the flood', 640, 600, lt, R('notyear') + .2, { size: 28, fill: '#f6c945' });
  });
})(window);
