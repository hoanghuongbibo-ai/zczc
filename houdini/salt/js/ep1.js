/* "It's About Salt" — BEAT 3 (Han China: Emperor Wu, the Xiongnu wars, the salt & iron merchants, the skit, the monopoly · counter 2)
 * + BEAT 4a (the 81 BC debate, Huan Kuan's book, Sang Hongyang's fall, two thousand years of monopoly) + BEAT 4b (the Via Salaria, the "salary" sticky note). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, EK = G.EK, TS = G.TS, EP = G.EP, M = G.MAP, { W, H, clamp, lerp, ease } = T;
  const { OUT, sh, ln } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, push, cover } = EP, say = Gd.say, L = n => G.TV['L' + n], big = EP.big;
  const HAN = [[98, 41], [106, 41.5], [114, 41], [120, 40.5], [123, 39], [121, 36.5], [122, 32], [121, 28], [118, 24], [111, 21.5], [108, 22.5], [103, 24], [101, 28], [100, 33], [97, 36], [96, 39]];
  const XIONGNU = [[92, 50], [104, 51], [116, 49], [122, 45], [118, 42.5], [108, 42.2], [100, 42.5], [92, 44]];

  // ===================== BEAT 3 — China discovers you can tax a necessity =====================
  mood(66, 'adventure'); fx(66, 'whoosh', .5);
  S(66, (ctx, lt, dur, t, R) => {   // now jump to China, about 2,100 years ago, the Han dynasty
    const v = EP.mapShot(ctx, t, lt, [[0, 108, 34, 7], [5, 108, 36, 8.5]], { D: 2.4 });
    if (lt > 2.4) { M.zone(ctx, v, HAN, '#c8322a', .35 * clamp((lt - 2.4) / .6)); M.label(ctx, v, 110, 33, 'HAN EMPIRE', { size: 28, col: '#8a1e18' }); }
    EP.dateTag(ctx, 'Han China · c. 100 BC');
  });
  S(67, (ctx, lt, dur, t, R) => {   // meet Emperor Wu of Han — Han Wudi. He ruled for 54 years, from 141 to 87 BC
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 420); TS.hanCourt(ctx, t);
    fig(ctx, 'wudi', 640, 760, .95, { t, pose: lt > R(68) ? 'hips' : 'idle', turn: 0, face: { mouth: 'smirk', brows: 'sly', eyes: 'half' } }); ctx.restore();
    EK.nameCard(ctx, lt, .3, 'EMPEROR WU OF HAN', 'Han Wudi · hahn woo-DEE', 300, 110, { icon: 'brush', w: 470 });
    if (lt > R(68)) EK.count(ctx, 1010, 200, 54, lt, R(68) + .2, 1.2, 'years on the throne · 141–87 BC', { size: 76 });
  });
  S(69, (ctx, lt, dur, t, R) => {   // and he spent a lot of them at war with the Xiongnu, a powerful nomadic confederation raiding China's northern border
    const v = M.view(108, 40, 9.5); M.draw(ctx, t, v); M.zone(ctx, v, HAN, '#c8322a', .3); M.zone(ctx, v, XIONGNU, '#3a6a8a', .35 * clamp(lt / .5), { hatch: true });
    M.label(ctx, v, 110, 33, 'HAN', { size: 28, col: '#8a1e18' }); if (lt > .3) M.label(ctx, v, 106, 47, 'XIONGNU', { size: 28, col: '#1e3a5a' });
    for (let i = 0; i < 4; i++) { const k = clamp((lt - R(70) - i * .25) / 1.2); if (k > 0) M.route(ctx, v, [[100 + i * 6, 46], [101 + i * 6, 43.5], [102 + i * 6, 41]], k, { w: 7, col: '#2a4a6a' }); }
    if (lt > R(70)) K.tag(ctx, 'SHYONG-noo · raids on the border', 640, 640, lt, R(70), { size: 26 });
  });
  S(71, (ctx, lt, dur, t, R) => {   // wars are expensive. So Wu's government noticed something.
    TS.hanCourt(ctx, t, { guards: false });
    sh(ctx, '#6a3a22', 4, c => c.rect(720, 560, 200, 100)); sh(ctx, '#8a4a2a', 4, c => c.rect(712, 540, 216, 26)); ctx.fillStyle = '#2a1608'; ctx.fillRect(732, 576, 176, 20);   // the treasury chest — empty
    fig(ctx, 'wudi', 460, 760, .9, { t, pose: lt > R(72) ? 'think' : 'shrug', turn: .3, face: lt > R(72) ? { mouth: 'flat', eyes: 'half', brows: 'sly', look: [.7, 0] } : { mouth: 'frown', brows: 'worried', sweat: true, look: [.7, .3] } });
    big(ctx, 'WARS = $$$', 900, 170, 60, lt, .2, '#ffd23a'); if (lt > .8) K.tag(ctx, 'the treasury', 820, 500, lt, .8, { size: 26 });
  });
  S(73, (ctx, lt, dur, t, R) => {   // in the early Han the richest people weren't nobles — they were salt and iron merchants, so rich their wealth reportedly rivaled the court's yearly tax take; some ran operations with more than a thousand workers
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 420); TS.hanEstate(ctx, t);
    fig(ctx, 'merchant', 640, 760, .9, { t, pose: lt > R(75) ? 'presentBoth' : 'hips', turn: .1, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); ctx.restore();
    if (lt > R(74)) EK.nameCard(ctx, lt, R(74), 'SALT & IRON MERCHANT', 'the early Han super-rich', 300, 110, { icon: 'brush', w: 430 });
    if (lt > R(75)) EP.card(ctx, 'wealth ≈ the court’s\nyearly tax take (reportedly)', 980, 120, lt, R(75), { size: 24 });
    if (lt > R(76)) EK.count(ctx, 980, 330, 1000, lt, R(76), 1.2, 'workers (some ran 1,000+)', { size: 60, suffix: '+' });
  });
  // the skit: Emperor Wu and his advisor
  mood(77, 'comic');
  S(77, (ctx, lt, dur, t, R) => {   // "So everyone needs salt." "Everyone." "Like, everyone everyone. Peasants. Soldiers. My cousin who hates me." "Even him." "…What if we sold it?"
    const wuTalk = (lt < R(78) - .1) || (lt > R(79) - .1 && lt < R(82) - .1) || lt > R(83) - .1, idea = lt > R(83);
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.hanCourt(ctx, t, { guards: false });
    fig(ctx, 'wudi', 420, 760, .9, { t, pose: idea ? 'pointUp' : lt > R(80) ? 'present' : 'think', turn: .35, vis: wuTalk ? say(t) : null, face: idea ? { mouth: 'grin', eyes: 'wide', brows: 'up', look: [.6, -.2] } : { mouth: 'smirk', brows: 'sly', look: [.7, 0] } }); EP.mark(ctx, 'wu', 420, 760, .9);
    fig(ctx, 'hanAdv', 880, 760, .88, { t, pose: lt > R(82) ? 'shrug' : 'idle', turn: -.35, vis: !wuTalk ? say(t) : null, face: lt > R(83) ? { mouth: 'o', eyes: 'wide', brows: 'up' } : { mouth: 'flat', eyes: 'half', brows: 'neutral', look: [-.6, 0] } }); EP.mark(ctx, 'adv', 880, 760, .88);
    ctx.restore();
    EP.speech(ctx, 'wu', '"So everyone needs salt."', L(77), L(78), t); EP.speech(ctx, 'adv', '"Everyone."', L(78), L(79), t);
    EP.speech(ctx, 'wu', '"Like, everyone everyone."', L(79), L(80), t); EP.speech(ctx, 'wu', '"Peasants. Soldiers. My cousin who hates me."', L(80), L(82), t);
    EP.speech(ctx, 'adv', '"Even him."', L(82), L(83), t); EP.speech(ctx, 'wu', '"…What if we sold it?"', L(83), L(84), t);
  });
  fx(84, 'stamp', .7, .4);
  S(84, (ctx, lt, dur, t, R) => {   // so the state nationalized salt and iron — government monopolies: the only store in town for two things you cannot live without. The money paid for the wars.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 400); TS.hanEstate(ctx, t); ctx.restore();
    const k = K.pop(lt, .3, .45); if (k > 0) { ctx.save(); ctx.translate(640, 250); ctx.scale(k, k); sh(ctx, '#2a1a10', 5, c => c.roundRect(-250, -70, 500, 140, 12)); sh(ctx, '#c8322a', 3, c => c.roundRect(-236, -56, 472, 112, 8));
      ctx.font = '44px "Luckiest Guy"'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('STATE STORE', 0, -4); ctx.font = '700 24px Fredoka'; ctx.fillText('SALT · IRON — monopoly', 0, 34); ctx.restore(); }
    if (lt > R(86)) K.tag(ctx, 'the only store in town', 640, 380, lt, R(86) + .3, { size: 28 });
    if (lt > R(87)) EP.card(ctx, 'monopoly money\n→ pays for the wars', 1000, 560, lt, R(87), { size: 26 });
  });
  EP.count(2, 88, -.3);
  S(88, (ctx, lt, dur, t, R) => {   // and once again… it's about salt
    TS.hanCourt(ctx, t, { guards: false }); fig(ctx, 'wudi', 260, 760, .9, { t, pose: 'thumbsUp', turn: .3, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } });
    EP.refrainSalt(ctx, lt, .1, { y: 120, gap: R(89) - .1 });
  });

  // ===================== BEAT 4a — the great salt debate, 81 BC =====================
  mood(90, 'curious');
  S(90, (ctx, lt, dur, t, R) => {   // monopolies have a side effect: great for the government, terrible for the guy buying salt
    TS.hanEstate(ctx, t); fig(ctx, 'sang', 360, 760, .85, { t, pose: 'cheer', prop: 'coins', turn: .3, face: { mouth: 'grin', eyes: 'happy' } }); fig(ctx, 'scholar', 900, 760, .85, { t, pose: 'shrug', turn: -.3, face: { mouth: 'frown', brows: 'worried', sweat: true } });
    if (lt > R(91)) { K.tag(ctx, 'great for the government', 360, 140, lt, R(91), { size: 28, fill: '#d8f0c8' }); K.tag(ctx, 'terrible for the buyer', 900, 140, lt, R(91, 6), { size: 28, fill: '#ffd8d0' }); }
  });
  S(92, (ctx, lt, dur, t, R) => {   // 81 BC, after Wu died: a public debate. One side Sang Hongyang, the money guy who built the system; the other, Confucian scholars: the monopolies were making ordinary people poor and pulling farmers off their land
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 380); TS.debate(ctx, t, { score: [0, 0] });
    fig(ctx, 'sang', 300, 760, .82, { t, pose: lt > R(94) && lt < R(96) ? 'present' : 'hips', turn: .4, face: { mouth: 'smirk', brows: 'sly', look: [.7, 0] } });
    fig(ctx, 'scholar', 980, 760, .82, { t, pose: lt > R(96) ? 'pointSideL' : 'crossed', turn: -.4, face: { mouth: lt > R(96) ? 'grit' : 'flat', brows: 'worried', look: [-.7, 0] } }); ctx.restore();
    EP.dateTag(ctx, '81 BC · the salt & iron debate');
    if (lt > R(94)) EK.nameCard(ctx, lt, R(94), 'SANG HONGYANG', 'SAHNG hong-YAHNG · built the system', 300, 230, { icon: 'brush', w: 470 });
    if (lt > R(96)) K.tag(ctx, 'Confucian scholars', 980, 230, lt, R(96), { size: 28 });
    if (lt > R(97)) EP.card(ctx, '"ordinary people poor,\nfarmers off their land"', 980, 330, lt, R(97), { size: 24 });
  });
  S(98, (ctx, lt, dur, t, R) => {   // Huan Kuan wrote it up as a book: the Discourses on Salt and Iron — one of the oldest recorded arguments over the question your uncle still yells about at Thanksgiving
    EP.board(ctx, 6, ['debate', 'hanCourt', 'hanEstate']);
    fig(ctx, 'huan', 300, 690, .62, { t, pose: 'present', turn: .3, face: { mouth: 'smile', brows: 'up' } });
    EK.nameCard(ctx, lt, .2, 'HUAN KUAN', 'hwahn KWAHN · official, writer', 820, 120, { icon: 'brush', w: 430 });
    const k = K.pop(lt, R(99) - .2, .4); if (k > 0) { ctx.save(); ctx.translate(820, 340); ctx.scale(k, k); sh(ctx, '#e8d8b0', 4, c => c.rect(-170, -90, 340, 180)); for (const sd of [-1, 1]) sh(ctx, '#8a5a2e', 3.5, c => c.roundRect(sd * 176 - 14, -104, 28, 208, 10));
      ctx.font = '700 26px Fredoka'; ctx.fillStyle = '#3a2618'; ctx.textAlign = 'center'; ctx.fillText('Discourses on', 0, -24); ctx.fillText('Salt and Iron', 0, 14); ctx.font = '700 20px serif'; ctx.fillText('鹽 鐵 論', 0, 56); ctx.restore(); }
    if (lt > R(100, 12)) K.tag(ctx, '(the Thanksgiving argument)', 820, 520, lt, R(100, 12), { size: 26, fill: '#fff3c8' });
    if (lt > R(101)) EP.card(ctx, 'run the economy…\nor get out of the way?', 820, 610, lt, R(101), { size: 26 });
  });
  fx(102, 'ding', .4, .5);
  S(102, (ctx, lt, dur, t, R) => {   // who won? Basically the government. The liquor monopoly got dropped, but salt and iron stayed.
    const sc = lt > R(103) ? [1, 0] : [0, 0]; TS.debate(ctx, t, { score: sc });
    fig(ctx, 'sang', 300, 760, .82, { t, pose: lt > R(103) ? 'cheer' : 'hips', turn: .4, face: lt > R(103) ? { mouth: 'grin', eyes: 'happy', brows: 'up' } : { mouth: 'flat' } });
    fig(ctx, 'scholar', 980, 760, .82, { t, pose: 'crossed', turn: -.4, face: { mouth: 'frown', brows: 'worried', look: [-.6, 0] } });
    if (lt > R(104)) { const k = K.pop(lt, R(104), .4); if (k > 0) { ctx.save(); ctx.translate(640, 300); ctx.scale(k, k); EF_jar(ctx); ctx.restore(); K.cross(ctx, 640, 290, 1.5, lt, R(104) + .3); } K.tag(ctx, 'liquor monopoly: dropped', 640, 420, lt, R(104), { size: 26 }); }
    if (lt > R(105)) K.tag(ctx, 'salt + iron: stayed ✓', 640, 480, lt, R(105), { size: 28, fill: '#d8f0c8' });
  });
  function EF_jar(ctx) { sh(ctx, '#a8603a', 4.5, c => { c.moveTo(-30, -60); c.quadraticCurveTo(-70, 0, -40, 50); c.lineTo(40, 50); c.quadraticCurveTo(70, 0, 30, -60); c.closePath(); }); sh(ctx, '#7a4428', 3.5, c => c.rect(-24, -76, 48, 18)); ctx.font = '700 20px serif'; ctx.fillStyle = '#f2e6cc'; ctx.textAlign = 'center'; ctx.fillText('酒', 0, 6); }
  mood(106, 'quiet');
  S(106, (ctx, lt, dur, t, R) => {   // and Sang Hongyang? executed the following year, 80 BC, for treason in a court power struggle — which wasn't about the debate itself
    TS.hanCourt(ctx, t, { guards: false }); ctx.save(); ctx.fillStyle = 'rgba(20,10,10,.45)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); fig(ctx, 'sang', 640, 760, .9, { t, prop: 'none', pose: 'idle', turn: 0, light: EP.LIGHT.dark, face: { mouth: 'flat', eyes: 'half', brows: 'worried' } }); ctx.restore();
    if (lt > R(107)) K.tag(ctx, 'executed · 80 BC', 640, 140, lt, R(107), { size: 32 });
    if (lt > R(108)) EP.card(ctx, 'treason · a court power struggle\n(not about the debate)', 640, 590, lt, R(108), { size: 24 });
  });
  mood(110, 'curious');
  S(110, (ctx, lt, dur, t, R) => {   // the monopoly outlived him: versions of a Chinese state salt monopoly kept coming back for most of the next two thousand years
    EP.board(ctx, 7, ['hanEstate', 'hanCourt', 'grocery']);
    ctx.save(); ln(ctx, [[120, 380], [1160, 380]], 10, '#3a2618'); const k = clamp((lt - .3) / (R(112) + 2));
    for (let i = 0; i < 10; i++) { const x = 140 + i * 112, on = k * 10 > i; if (!on) continue; sh(ctx, '#c8322a', 3, c => c.arc(x, 380, 14, 0, TAU)); }
    ctx.restore(); K.tag(ctx, '81 BC', 140, 440, lt, .3, { size: 24 }); if (lt > R(112)) K.tag(ctx, '…≈ 2,000 years', 1080, 440, lt, R(112) + 1, { size: 24 });
    big(ctx, 'THE MONOPOLY OUTLIVED HIM', 640, 220, 46, lt, .2, '#ffd23a');
  });

  // ===================== BEAT 4b — Rome and a road named after salt =====================
  mood(113, 'warm'); fx(113, 'whoosh', .5);
  S(113, (ctx, lt, dur, t, R) => {   // meanwhile, over in Italy, the Romans named one of their oldest roads the Via Salaria — literally "Salt Road"
    const v = EP.mapShot(ctx, t, lt, [[0, 12.9, 42.3, 70], [5, 12.9, 42.3, 90]], { D: 2.2 });
    if (lt > 2.2) { M.route(ctx, v, [[12.5, 41.9], [12.7, 42.25], [13.0, 42.45], [13.4, 42.6], [13.6, 42.85], [13.9, 42.95]], clamp((lt - 2.3) / 2), { w: 8 }); M.pin(ctx, v, 12.48, 41.9, 'Rome', clamp((lt - 2.2) / .4), { dx: -60 }); M.label(ctx, v, 13.8, 42.2, 'Adriatic →', { size: 18 }); }
    if (lt > R(115)) EP.label(ctx, lt, R(115), 'VIA SALARIA = "SALT ROAD"', 640, 620);
  });
  S(116, (ctx, lt, dur, t, R) => {   // salt went to Rome, money came out, and a road got built to make that easier
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 760, 480); TS.via(ctx, t, { cart: clamp(lt / 6) * .7 + .1 }); ctx.restore();
    if (lt > .2) K.tag(ctx, 'salt → Rome', 300, 160, lt, .2, { size: 28 }); if (lt > R(117)) K.tag(ctx, 'money ← out', 300, 230, lt, R(117), { size: 28, fill: '#fff3c8' }); if (lt > R(118)) K.tag(ctx, 'a road to make it easier', 900, 120, lt, R(118), { size: 28 });
  });
  fx(119, 'paper', .5, 1.8);
  S(119, (ctx, lt, dur, t, R) => {   // the most famous salt fact of all: "Roman soldiers were paid in salt → that's where 'salary' comes from!" Hold that thought.
    TS.camp(ctx, t); fig(ctx, 'legion', 360, 760, .85, { t, pose: 'presentBoth', turn: .3, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } });
    const hold = clamp((lt - R(120) - .2) / .6), x = lerp(860, 1110, ease.inOut(hold)), y = lerp(330, 150, ease.inOut(hold)), sc = lerp(1, .55, ease.inOut(hold));
    if (lt > R(119, 6)) { ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.translate(-x, -y); EP.quote(ctx, lt, R(119, 6), 'Roman soldiers were paid in salt\n→ that’s where “salary” comes from!', x, y, { size: 26, w: 520 }); ctx.restore(); }
    if (lt > R(120)) K.tag(ctx, 'hold that thought…', 640, 620, lt, R(120), { size: 30 });
  });
})(window);
