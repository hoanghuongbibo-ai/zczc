/* "It's About Salt" — BEAT 7a (Saltville, Virginia, 1864 — serious, no gags · counter 5) + BEAT 7b (the Salt March, 1930 · counter 6)
 * + BEAT 8 (salt gets cheap · the goiter belt · iodized salt, 1924 · counter 7) + BEAT 9 (road salt today · the old trick · ∞ + end card). */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TS = G.TS, EP = G.EP, M = G.MAP, FA = G.Fauna, PR = G.Props, { W, H, clamp, lerp, ease } = T;
  const { OUT, sh, ln } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, push, cover } = EP, say = Gd.say, L = n => G.TV['L' + n], big = EP.big;
  const dim = (ctx, a) => { ctx.save(); ctx.fillStyle = `rgba(14,12,20,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); };

  // ===================== BEAT 7a — Saltville, Virginia, 1864 =====================
  mood(222, 'curious'); fx(222, 'whoosh', .5);
  S(222, (ctx, lt, dur, t, R) => {   // back to America and the Civil War. Remember: no fridges — every army runs on salted pork and beef.
    if (lt < R(223)) { const v = EP.mapShot(ctx, t, lt, [[0, -80, 37.5, 26], [4, -80.5, 37.2, 34]], { D: 2.2 }); if (lt > 2) M.label(ctx, v, -79, 38.2, 'VIRGINIA', { size: 24 }); EP.dateTag(ctx, 'USA · 1861–65'); }
    else { TS.saltville(ctx, t, { v: 'day' }); for (let i = 0; i < 3; i++) PR.barrel(ctx, 380 + i * 90, 690, 1.1); fig(ctx, 'confed', 900, 760, .85, { t, pose: 'present', turn: -.3, face: { mouth: 'flat', brows: 'neutral' } });
      K.tag(ctx, 'salted pork + beef', 470, 520, lt, R(224) - .2, { size: 28 }); if (lt > R(223)) K.tag(ctx, 'no fridges', 470, 140, lt, R(223), { size: 30 }); }
  });
  S(225, (ctx, lt, dur, t, R) => {   // the Confederacy had a big problem: the Union navy was blockading its ports and imported salt dried up
    const v = M.view(-80, 34, 14); M.draw(ctx, t, v); M.label(ctx, v, -86, 33, 'CONFEDERACY', { size: 26, col: '#5a4a3a' });
    const ships = [[-76.4, 36.9], [-75.6, 35.2], [-77.8, 33.8], [-79.9, 32.7], [-81.1, 31.8], [-81.4, 30.2], [-80.1, 26.5], [-82.8, 27.8], [-85.2, 29.6], [-88.1, 30.3], [-89.4, 28.9], [-94.8, 29.2]];
    ships.forEach(([lo, la], i) => { const k = clamp((lt - .3 - i * .12) / .3); if (k <= 0) return; const [x, y] = M.pt(v, lo, la); ctx.save(); ctx.translate(x + (lo > -82 && la > 30 ? 26 : 0), y + (la < 30.5 ? 20 : 0)); ctx.scale(k, k); sh(ctx, '#26365e', 3, c => { c.moveTo(-18, 0); c.lineTo(18, 0); c.lineTo(12, 8); c.lineTo(-12, 8); c.closePath(); }); ln(ctx, [[0, 0], [0, -20]], 3); sh(ctx, '#f4f4f0', 2, c => { c.moveTo(2, -18); c.lineTo(14, -4); c.lineTo(2, -4); c.closePath(); }); ctx.restore(); });
    if (lt > .6) K.tag(ctx, 'the Union blockade', 900, 140, lt, .6, { size: 30 }); if (lt > R(226, 8)) K.tag(ctx, 'imported salt: dried up', 900, 210, lt, R(226, 8), { size: 26 });
  });
  S(227, (ctx, lt, dur, t, R) => {   // the Confederacy's biggest saltworks, in a town literally called Saltville, Virginia — by one estimate two-thirds of the South's salt. So the Union made it a target.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 440); TS.saltville(ctx, t, { v: 'day' }); ctx.restore();
    EK.nameCard(ctx, lt, .3, 'SALTVILLE, VIRGINIA', 'the Confederacy\'s biggest saltworks', 330, 110, { icon: 'brush', w: 470 });
    if (lt > R(229)) { const k = K.pop(lt, R(229), .4); if (k > 0) { ctx.save(); ctx.translate(1010, 200); ctx.scale(k, k); K.paper(ctx, 0, 0, 300, 170, { draw: c => { EK.txt(c, '≈ 2/3', 0, -14, '60px "Luckiest Guy"', '#c8322a'); EK.txt(c, 'of the South\'s salt (one estimate)', 0, 44, '700 18px Fredoka', '#3a2618'); } }); ctx.restore(); } }
    if (lt > R(230)) { const k = clamp((lt - R(230)) / .5); ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[14, '#fff'], [8, '#e0261c']]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(640, 500, 300 * (1.4 - .4 * k), 0, TAU * k); ctx.stroke(); } ctx.restore(); K.tag(ctx, 'a target', 640, 640, lt, R(230) + .3, { size: 30 }); }
  });
  // the tone shift: low and quiet, no gags, no counter jokes
  mood(231, 'somber');
  S(231, (ctx, lt, dur, t, R) => {   // early October 1864: Union troops under Brig. Gen. Stephen Burbridge attacked Saltville and were driven back. Among them, the 5th United States Colored Cavalry, one of the few Black cavalry regiments to fight.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.04, 640, 460); TS.saltville(ctx, t, { v: 'dusk' }); dim(ctx, .25);
    if (lt < R(233)) fig(ctx, 'burbridge', 640, 760, .9, { t, turn: 0, light: EP.LIGHT.warm, face: { mouth: 'flat', brows: 'worried' } });
    else for (const [who, x, s] of [['uscav', 360, .8], ['uscav2', 640, .86], ['uscav', 920, .8]]) fig(ctx, who, x, 760, s, { t: t + x, turn: 0, light: EP.LIGHT.warm, face: { mouth: 'flat', brows: 'neutral' } });
    ctx.restore(); EP.dateTag(ctx, 'Saltville · October 2, 1864');
    if (lt < R(233)) EK.nameCard(ctx, lt, R(232, 4), 'BRIG. GEN. STEPHEN BURBRIDGE', 'Union attack — driven back', 640, 120, { icon: 'brush', w: 520 });
    else EK.nameCard(ctx, lt, R(233) + .3, '5th U.S. COLORED CAVALRY', 'one of the few Black cavalry regiments to fight', 640, 120, { icon: 'brush', w: 560 });
  });
  S(235, (ctx, lt, dur, t, R) => {   // after the battle, Confederate soldiers — mostly irregular militia — murdered wounded and captured Black soldiers. As many as 50 (American Battlefield Trust). Champ Ferguson was later tried and executed for this and other killings.
    TS.saltville(ctx, t, { v: 'night' }); dim(ctx, .35);
    ctx.save(); ctx.globalAlpha = .7; for (let i = 0; i < 9; i++) { const x = 200 + i * 110; ctx.fillStyle = '#0e0c14'; ctx.beginPath(); ctx.ellipse(x, 600, 28, 8, 0, 0, TAU); ctx.fill(); ctx.fillRect(x - 3, 520, 6, 80); ctx.fillRect(x - 18, 540, 36, 6); } ctx.restore();   // a quiet row of grave markers
    if (lt > R(236)) EP.card(ctx, 'wounded and captured Black soldiers\nwere murdered after the battle', 640, 200, lt, R(236), { size: 28 });
    if (lt > R(237)) EP.card(ctx, 'as many as 50\n— American Battlefield Trust', 640, 360, lt, R(237), { size: 26 });
    if (lt > R(238)) EK.nameCard(ctx, lt, R(238) + .3, 'CHAMP FERGUSON', 'guerrilla leader · later tried and executed', 640, 600, { icon: 'brush', w: 520 });
  });
  mood(239, 'tender');
  S(239, (ctx, lt, dur, t, R) => {   // these men had enlisted to fight for their own freedom and the freedom of millions of other people. They were killed after the fighting was over.
    TS.saltville(ctx, t, { v: 'dusk' }); dim(ctx, .4);
    ctx.save(); ctx.globalAlpha = clamp(lt / 1.2); fig(ctx, 'uscav2', 640, 760, .95, { t, turn: 0, light: EP.LIGHT.warm, face: { mouth: 'flat', brows: 'neutral', eyes: 'open', look: [0, -.1] } }); ctx.restore();
    if (lt > .6) K.tag(ctx, 'enlisted to fight for freedom', 640, 140, lt, .6, { size: 30 });
    if (lt > R(241)) K.tag(ctx, 'killed after the fighting was over', 640, 640, lt, R(241), { size: 28 });
  });
  mood(242, 'curious'); fx(244, 'rumble', .5, .2); fx(244, 'fire', .4, .3, 4);
  S(242, (ctx, lt, dur, t, R) => {   // two months later, December 1864, Union cavalry under Gen. George Stoneman came back, won, and wrecked the saltworks. Running again within ~2 months — but the railroads were torn up, and the Confederacy had about four months left
    const wrecked = lt > R(244, 2); ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 470); TS.saltville(ctx, t, { v: wrecked ? 'wrecked' : 'day' });
    if (!wrecked) fig(ctx, 'stoneman', 360, 760, .85, { t, pose: 'pointSide', turn: .3, face: { mouth: 'grit', brows: 'neutral' } }); ctx.restore();
    EP.dateTag(ctx, 'Saltville · December 1864');
    if (!wrecked) EK.nameCard(ctx, lt, R(243, 4), 'GEN. GEORGE STONEMAN', 'Union cavalry · came back and won', 900, 120, { icon: 'brush', w: 470 });
    if (lt > R(245)) K.tag(ctx, 'running again in ~2 months…', 640, 140, lt, R(245), { size: 28 }); if (lt > R(246)) K.tag(ctx, '…but the railroads: torn up', 640, 210, lt, R(246), { size: 28 });
    if (lt > R(247)) K.tag(ctx, 'the Confederacy: ~4 months left', 640, 620, lt, R(247), { size: 28 });
  });
  EP.count(5, 247, .5);

  // ===================== BEAT 7b — the Salt March, 1930 =====================
  mood(248, 'rising'); fx(248, 'whoosh', .5);
  S(248, (ctx, lt, dur, t, R) => {   // which brings us to the most famous pinch of salt in history
    const v = EP.mapShot(ctx, t, lt, [[0, 72.7, 22.2, 60], [4, 72.7, 22.0, 70]], { D: 2.4 });
    if (lt > 2.4) { M.label(ctx, v, 74.2, 23.4, 'BRITISH INDIA', { size: 24 }); M.label(ctx, v, 70.6, 20.8, 'ARABIAN SEA', { size: 18, col: '#2a5a7a' }); }
    EP.dateTag(ctx, 'India · 1930');
  });
  S(249, (ctx, lt, dur, t, R) => {   // in British India the British held a monopoly on salt: under the Salt Act of 1882, Indians weren't allowed to make or sell their own salt — even next to the ocean — they had to buy it, taxed
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 480); TS.dandi(ctx, t);
    fig(ctx, 'marcher2', 360, 740, .75, { t, pose: 'shrug', turn: .3, hat: 'none', face: { mouth: 'frown', brows: 'worried' } }); ctx.restore();
    const k = K.pop(lt, R(251) - .2, .4); if (k > 0) { ctx.save(); ctx.translate(900, 380); ctx.scale(k, k); ln(ctx, [[0, 160], [0, -20]], 8, '#5a3a22'); sh(ctx, '#f2ece0', 4, c => c.rect(-150, -150, 300, 140)); EK.txt(ctx, 'SALT ACT 1882', 0, -104, '28px "Luckiest Guy"', '#8a1e18'); EK.txt(ctx, 'no making salt', 0, -64, '700 22px Fredoka', '#3a2618'); EK.txt(ctx, 'no selling salt', 0, -34, '700 22px Fredoka', '#3a2618'); ctx.restore(); }
    if (lt > R(253)) K.tag(ctx, 'right next to the ocean…', 400, 160, lt, R(253), { size: 28 }); if (lt > R(254)) K.tag(ctx, '…buy it, taxed', 400, 230, lt, R(254), { size: 28, fill: '#ffd8d0' });
  });
  S(255, (ctx, lt, dur, t, R) => {   // Mohandas Gandhi, leader of India's nonviolent independence movement, picked this law on purpose. Not land, not voting. Salt. Every single person needed salt — anyone could break the law in their own kitchen.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 440); TS.marchRoad(ctx, t);
    fig(ctx, 'gandhi', 640, 760, .95, { t, pose: lt > R(259) ? 'present' : 'idle', turn: 0, face: { mouth: 'smile', brows: lt > R(257) ? 'up' : 'neutral' } }); ctx.restore();
    if (lt < R(257)) EK.nameCard(ctx, lt, .3, 'MOHANDAS GANDHI', 'leader of India\'s nonviolent movement', 330, 110, { icon: 'brush', w: 470 });
    if (lt > R(258)) { K.tag(ctx, 'land', 240, 160, lt, R(258), { size: 30 }); K.cross(ctx, 240, 160, 1, lt, R(258) + .3); K.tag(ctx, 'voting', 240, 240, lt, R(258, 2), { size: 30 }); K.cross(ctx, 240, 240, 1, lt, R(258, 2) + .3); }
    if (lt > R(259)) EP.label(ctx, lt, R(259), 'SALT', 1000, 180);
    if (lt > R(260)) K.tag(ctx, 'rich or poor · Hindu or Muslim', 1000, 270, lt, R(260), { size: 26 }); if (lt > R(264)) K.tag(ctx, 'anyone · in their own kitchen', 640, 640, lt, R(264), { size: 28 });
  });
  S(265, (ctx, lt, dur, t, R) => {   // March 2, 1930: Gandhi wrote to the British viceroy, Lord Irwin, warning him what was coming
    EP.board(ctx, 17, ['marchRoad', 'dandi', 'kitchen']);
    const k = K.pop(lt, .2, .4); if (k > 0) { ctx.save(); ctx.translate(560, 380); ctx.scale(k, k); ctx.rotate(-.02); K.paper(ctx, 0, 0, 420, 400, { draw: c => { EK.txt(c, 'March 2, 1930', 0, -160, '700 22px Fredoka', '#6a5040'); EK.txt(c, 'Dear Friend,', -100, -110, '700 26px serif', '#2a1a10');
      for (let i = 0; i < 7; i++) { c.fillStyle = 'rgba(40,30,20,.45)'; c.fillRect(-170, -70 + i * 34, 320 - (i % 3) * 30, 5); } EK.txt(c, '— M. K. Gandhi', 70, 170, '700 22px serif', '#2a1a10'); } }); ctx.restore(); }
    if (lt > R(266, 4)) { fig(ctx, 'irwin', 980, 690, .62, { t, turn: -.3, prop: 'scroll', face: { mouth: 'flat', brows: 'skeptic', eyes: 'half' } }); EK.nameCard(ctx, lt, R(266, 4), 'LORD IRWIN', 'British viceroy of India', 980, 140, { icon: 'brush', w: 380 }); }
    if (lt > R(267)) K.tag(ctx, 'a warning', 560, 620, lt, R(267), { size: 30 });
  });
  fx(268, 'crowd', .3, .4, 8);
  S(268, (ctx, lt, dur, t, R) => {   // March 12: he set out from his ashram near Ahmedabad with 78 volunteers. About 240 miles — roughly New York City to Washington, D.C. Gandhi was 60. Crowds grew as they went.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 520); TS.marchRoad(ctx, t);
    const n = lt > R(273) ? 9 : 6; for (let i = n - 1; i >= 0; i--) { const row = Math.floor(i / 3), col = i % 3, y = 520 + row * 50, s = .26 + row * .06, x = 640 + (col - 1) * (110 + row * 30) + Math.sin(t + i) * 4;
      fig(ctx, i === 0 ? 'gandhi' : (i % 2 ? 'marcher' : 'marcher2'), x, y + (i === 0 ? 150 : 0), i === 0 ? .55 : s, t + i, { walk: t * 6, turn: 0 }); }
    ctx.restore(); EP.dateTag(ctx, 'March 12, 1930 · Sabarmati → Dandi');
    if (lt > R(269, 7)) EK.count(ctx, 1040, 170, 78, lt, R(269, 7), 1, 'volunteers', { size: 64 });
    if (lt > R(270)) EK.count(ctx, 240, 170, 240, lt, R(270), 1.4, 'miles · ≈ NYC → Washington', { size: 64 });
    if (lt > R(272)) K.tag(ctx, 'Gandhi: age 60', 640, 330, lt, R(272), { size: 28 }); if (lt > R(273)) K.tag(ctx, 'crowds grew', 640, 640, lt, R(273), { size: 28 });
  });
  fx(276, 'ping', .4, 1.4);
  S(274, (ctx, lt, dur, t, R) => {   // on the morning of April 6, 1930, at the beach at Dandi, Gandhi bent down and picked up a lump of natural salt from the shore. That was it. That was the crime.
    const bend = lt > R(276, 2), lift = lt > R(276, 8); ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [R(276), 1.25, 600, 470]]); TS.dandi(ctx, t);
    for (let i = 0; i < 5; i++) fig(ctx, i % 2 ? 'marcher' : 'marcher2', 860 + i * 70, 620 - (i % 2) * 20, .4, t + i, { turn: -.4, face: { mouth: lift ? 'o' : 'flat', brows: 'up' } });
    fig(ctx, 'gandhi', 520, 720, .7, { t, prop: lift ? 'none' : 'staff', pose: lift ? { L: [-60, -150], R: [90, -330], hL: 'rest', hR: 'hold' } : bend ? { L: [-60, -150], R: [60, -60], hL: 'rest', hR: 'hold' } : 'idle', turn: .3, face: { mouth: 'smile', eyes: lift ? 'happy' : 'half' } });
    if (lift) { ctx.save(); ctx.translate(520 + 90 * .7 + 14, 720 - 330 * .7 - 20); sh(ctx, '#fbfbf8', 3, c => c.ellipse(0, 0, 16, 11, 0, 0, TAU)); ctx.restore(); }
    ctx.restore(); EP.dateTag(ctx, 'Dandi · April 6, 1930');
    if (lt > R(277)) EP.label(ctx, lt, R(278), 'THE CRIME', 640, 140);
  });
  S(279, (ctx, lt, dur, t, R) => {   // and it worked: across India people made their own salt; the British answered with mass arrests — nearly 60,000 jailed, Gandhi included; newspapers + newsreels covered it worldwide; independence came in 1947, but the world started watching here
    if (lt < R(285)) { ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 480); TS.dandi(ctx, t);
        for (let i = 0; i < 6; i++) { const x = 160 + i * 180; fig(ctx, i % 2 ? 'marcher' : 'marcher2', x, 700 - (i % 2) * 40, .5, t + i, { pose: { L: [-60, -150], R: [70, -100], hL: 'rest', hR: 'hold' }, turn: .2, face: { mouth: 'smile' } }); sh(ctx, '#5a5a5e', 3, c => c.rect(x + 20, 690 - (i % 2) * 40, 60, 12)); }
        ctx.restore(); if (lt > R(281)) K.tag(ctx, 'everyone making their own salt', 640, 140, lt, R(281), { size: 28 });
        if (lt > R(283)) EK.count(ctx, 640, 300, 60000, lt, R(283), 1.4, 'jailed (nearly) — Gandhi included', { size: 70 }); }
    else { EP.board(ctx, 18, ['dandi', 'marchRoad', 'highway']); const k = K.pop(lt, R(285), .4); if (k > 0) { ctx.save(); ctx.translate(600, 360); ctx.scale(k, k); ctx.rotate(-.03); K.paper(ctx, 0, 0, 560, 380, { fill: '#f2ead8', draw: c => { EK.txt(c, 'THE WORLD NEWS', 0, -150, '40px "Luckiest Guy"', '#1e1a18'); c.fillStyle = '#1e1a18'; c.fillRect(-250, -126, 500, 4); EK.txt(c, 'GANDHI’S SALT MARCH', 0, -80, '700 34px serif', '#1e1a18');
        for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(40,30,20,.4)'; c.fillRect(-240, -30 + i * 30, 220, 5); c.fillRect(20, -30 + i * 30, 220, 5); } } }); ctx.restore(); }
      if (lt > R(286)) K.tag(ctx, 'independence: 1947', 960, 560, lt, R(286), { size: 28 }); if (lt > R(287)) K.tag(ctx, 'the world started watching', 600, 630, lt, R(287), { size: 28, fill: '#fff3c8' }); }
  });
  EP.count(6, 288, -.3);
  S(288, (ctx, lt, dur, t, R) => {   // and once again… it's about salt
    TS.dandi(ctx, t); fig(ctx, 'gandhi', 260, 760, .9, { t, pose: 'present', turn: .3, face: { mouth: 'smile', eyes: 'happy' } });
    EP.refrainSalt(ctx, lt, .1, { y: 120, gap: R(289) - .1 });
  });

  // ===================== BEAT 8 — when salt got cheap =====================
  mood(290, 'comic');
  S(290, (ctx, lt, dur, t, R) => {   // after thousands of years of empires squeezing everyone for salt, industry got so good at making it that salt became cheap. Britain scrapped its salt tax in 1825 — factories needed tons of it. Once salt is cheap, nobody can control you with it.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 470); TS.saltworks(ctx, t); ctx.restore();
    if (lt > R(292)) EP.label(ctx, lt, R(292, 8), 'CHEAP', 640, 130, '#2a8a52');
    if (lt > R(293)) K.tag(ctx, 'Britain: salt tax scrapped · 1825', 640, 210, lt, R(293), { size: 28 }); if (lt > R(294)) K.tag(ctx, 'factories needed tons', 640, 270, lt, R(294), { size: 26 });
    if (lt > R(296)) K.tag(ctx, 'cheap = no more control', 640, 620, lt, R(296), { size: 30, fill: '#fff3c8' });
  });
  S(297, (ctx, lt, dur, t, R) => {   // so people found a new bet: put something in it
    TS.kitchen(ctx, t, { sh: { turn: 1, face: 'happy' } }); const k = K.pop(lt, R(298), .4);
    if (k > 0) { ctx.save(); ctx.translate(820, 440); ctx.scale(k, k); sh(ctx, '#7a4a2a', 4, c => c.roundRect(-34, -90, 68, 90, 10)); sh(ctx, '#e8dcc0', 3, c => c.rect(-26, -64, 52, 36)); EK.txt(ctx, 'I', 0, -40, '30px "Luckiest Guy"', '#5a2a6a'); sh(ctx, '#3a2a1a', 3, c => c.rect(-14, -110, 28, 22)); ctx.restore(); }
    if (lt > R(298)) K.tag(ctx, 'put something IN it', 640, 140, lt, R(298), { size: 32 });
  });
  const BELT = [[-97, 49], [-89, 48.5], [-84, 46.5], [-82.5, 45], [-82.4, 42], [-87, 41.6], [-91, 40.6], [-96, 42], [-97.2, 45]];
  S(299, (ctx, lt, dur, t, R) => {   // early 1900s: a big chunk of the upper Midwest was nicknamed the "goiter belt"
    const v = EP.mapShot(ctx, t, lt, [[0, -88, 44, 22], [4, -88, 44, 26]], { D: 1.8 });
    if (lt > 1.6) { M.zone(ctx, v, BELT, '#8a3a8a', .45 * clamp((lt - 1.6) / .6), { hatch: true }); M.label(ctx, v, -90, 45.2, 'THE GOITER BELT', { size: 26, col: '#4a1a4a' }); }
    EP.dateTag(ctx, 'USA · early 1900s');
  });
  S(301, (ctx, lt, dur, t, R) => {   // the soil there was low in iodine, and without iodine the thyroid gland in your neck swells up into a goiter
    EP.board(ctx, 19, ['grocery', 'kitchen', 'saltworks']);
    const sw = clamp((lt - R(302, 9)) / 1.4); fig(ctx, 'peasant', 420, 690, .65, { t, prop: 'none', hat: 'none', turn: .1, face: { mouth: sw > .5 ? 'grit' : 'flat', brows: sw > .5 ? 'worried' : 'neutral' } });
    if (sw > 0) { ctx.save(); ctx.globalAlpha = .9; sh(ctx, G.CW.peasant.look.skin, 3.5, c => c.ellipse(424, 690 - 336 * .65, 34 * sw, 22 * sw, 0, 0, TAU)); ctx.restore(); }
    if (lt > .2) K.tag(ctx, 'soil: low in iodine', 860, 220, lt, .2, { size: 28 }); if (lt > R(302)) K.tag(ctx, 'thyroid needs iodine', 860, 300, lt, R(302), { size: 28 }); if (lt > R(302, 9)) EP.label(ctx, lt, R(302, 9), 'GOITER', 860, 420);
  });
  S(303, (ctx, lt, dur, t, R) => {   // when the US drafted men for World War I, doctors in Michigan noticed how many registrants had goiters
    EP.board(ctx, 20, ['grocery', 'highway', 'saltworks']);
    for (let i = 0; i < 5; i++) fig(ctx, 'peasant', 300 + i * 110, 690, .48, t + i, { hat: 'none', prop: 'none', outfit: 'suit', turn: .1, face: { mouth: 'flat' } });
    fig(ctx, 'cowie', 960, 690, .6, { t, pose: 'magnify', turn: -.3, face: { mouth: 'o', brows: 'up' } });
    EP.dateTag(ctx, 'World War I draft · 1917–18'); if (lt > R(304)) K.tag(ctx, 'so many goiters', 640, 160, lt, R(304), { size: 30 });
  });
  S(305, (ctx, lt, dur, t, R) => {   // so a University of Michigan pediatrician, David Murray Cowie, had an idea borrowed from Switzerland: add a tiny bit of iodine to table salt. Everyone already eats salt. Done.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); TS.grocery(ctx, t, { boxes: 0 });
    fig(ctx, 'cowie', 420, 760, .92, { t, pose: lt > R(308) ? 'present' : 'pointUp', turn: .3, face: { mouth: 'smile', brows: 'up', eyes: lt > R(310) ? 'happy' : 'open' } }); ctx.restore();
    EK.nameCard(ctx, lt, R(306), 'DR DAVID MURRAY COWIE', 'KOW-ee · U. of Michigan pediatrician', 900, 110, { icon: 'brush', w: 480 });
    if (lt > R(307)) { const k = K.pop(lt, R(307), .4); if (k > 0) { ctx.save(); ctx.translate(1050, 280); ctx.scale(k, k); sh(ctx, '#d8261c', 3.5, c => c.rect(-44, -44, 88, 88)); ctx.fillStyle = '#fff'; ctx.fillRect(-10, -30, 20, 60); ctx.fillRect(-30, -10, 60, 20); ctx.restore(); K.tag(ctx, 'idea from Switzerland', 860, 280, lt, R(307), { size: 24 }); } }
    if (lt > R(308)) { TS.saltBox(ctx, 800, 600, 1.4 * K.pop(lt, R(308), .4)); K.tag(ctx, '+ a tiny bit of iodine', 860, 400, lt, R(308), { size: 28 }); }
    if (lt > R(310)) EP.label(ctx, lt, R(310), 'DONE.', 1080, 480, '#2a8a52');
  });
  fx(311, 'ding', .5, .6);
  S(311, (ctx, lt, dur, t, R) => {   // May 1, 1924: the first iodized salt hit Michigan grocery shelves. By that fall, sold nationally. It worked spectacularly: goiter in Michigan schoolchildren 38.6% (1924) → 1.4% (1951)
    if (lt < R(315)) { ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); TS.grocery(ctx, t, { boxes: Math.min(5, Math.floor(lt * 2)) }); ctx.restore(); EP.dateTag(ctx, 'Michigan · May 1, 1924'); if (lt > R(313)) K.tag(ctx, 'by fall: sold nationally', 640, 140, lt, R(313), { size: 30 }); }
    else { EP.board(ctx, 21, ['grocery', 'kitchen', 'saltworks']); const k = clamp((lt - R(317)) / 1.2);
      for (const [i, v, lab, at] of [[0, 38.6, '1924', R(317)], [1, 1.4, '1951', R(318)]]) { if (lt < at) continue; const h = v / 38.6 * 360 * (i ? 1 : k), x = 520 + i * 260; sh(ctx, i ? '#2a8a52' : '#c8322a', 4, c => c.rect(x - 60, 600 - Math.max(6, h), 120, Math.max(6, h))); EK.txt(ctx, v + '%', x, 590 - Math.max(6, h) - 24, '40px "Luckiest Guy"', i ? '#2a8a52' : '#c8322a'); EK.txt(ctx, lab, x, 630, '700 24px Fredoka', '#3a2618'); }
      ln(ctx, [[420, 600], [880, 600]], 6, '#3a2618'); K.tag(ctx, 'goiter · Michigan schoolchildren', 640, 140, lt, R(316), { size: 28 }); }
  });
  S(319, (ctx, lt, dur, t, R) => {   // the salt shaker went from a tax collector's weapon to a medicine cabinet
    TS.kitchen(ctx, t, { sx: 640, ss: 1.4, sh: { turn: 1, glasses: lt > R(320) - .3, coat: lt > R(320) - .3, face: 'happy' } });
    if (lt < R(320)) K.tag(ctx, "a tax collector's weapon", 640, 140, lt, .2, { size: 30, fill: '#ffd8d0' }); else K.tag(ctx, '→ a medicine cabinet', 640, 140, lt, R(320), { size: 32, fill: '#d8f0c8' });
  });
  EP.count(7, 320, 1.2);

  // ===================== BEAT 9 — legacy + close =====================
  mood(321, 'warm');
  S(321, (ctx, lt, dur, t, R) => {   // so why does salt matter now? It's literally on the ground. USGS: America produced about 40 million tons of salt in 2024; highway deicing ate about 41 percent. Interstates → road salt took off: nobody wanted to wait for spring.
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 700, 470); TS.highway(ctx, t, { drive: clamp(lt / 20) * .7 }); ctx.restore();
    if (lt > R(322)) K.tag(ctx, 'literally on the ground', 640, 600, lt, R(322), { size: 30 });
    if (lt > R(323)) EK.nameCard(ctx, lt, R(323), 'U.S. GEOLOGICAL SURVEY', 'salt · 2024', 330, 110, { icon: 'brush', w: 420 });
    if (lt > R(324)) EK.count(ctx, 1000, 150, 40, lt, R(324, 3), 1.2, 'million tons of US salt · 2024', { size: 64, prefix: '≈' });
    if (lt > R(325)) EK.count(ctx, 1000, 360, 41, lt, R(325, 3), 1.2, 'percent → highway deicing', { size: 64, suffix: '%' });
    if (lt > R(326)) K.tag(ctx, 'the interstates → road salt took off', 640, 520, lt, R(326), { size: 26 });
  });
  S(329, (ctx, lt, dur, t, R) => {   // and the old trick of taxing the thing everybody needs? It never left — it moved from salt, to gas, to sales tax, to anything you can't easily avoid buying
    EP.board(ctx, 22, ['grenier', 'hanCourt', 'highway']);
    [['SALT', R(331, 3), '#e8f4ff'], ['GAS', R(331, 5), '#ffe2a8'], ['SALES TAX', R(331, 7), '#f4d8ff'], ['ANYTHING YOU CAN’T\nEASILY AVOID', R(332), '#ffd8d0']].forEach(([s2, at, f], i) => { if (lt > at - .1) EP.card(ctx, s2, 300 + (i % 2) * 520 + (i > 1 ? 0 : 0), 240 + Math.floor(i / 2) * 220, lt, at, { size: 34, fill: f }); });
    if (lt > R(330)) K.tag(ctx, 'it never left', 640, 600, lt, R(330), { size: 30 });
  });
  fx(334, 'gong', .5, .2);
  S(333, (ctx, lt, dur, t, R) => {   // so the next time you get your salary — a word that came from salt… thanks for watching
    TS.kitchen(ctx, t, { sh: { turn: 1 - .3 * Math.sin(clamp(lt / 1.5) * PI), face: lt > R(334) ? 'happy' : 'smug' } });
    if (lt < R(334)) K.tag(ctx, 'salary ← sal (salt)', 640, 150, lt, .4, { size: 30 });
    if (lt > R(334)) { EP.big(ctx, 'IT WAS ALWAYS ABOUT CONTROL', 640, 130, 44, lt, R(334) - .4, '#ffd23a'); EP.card(ctx, 'SUBSCRIBE\nfor more history stories', 340, 470, lt, R(334) + .4, { size: 30 }); K.tag(ctx, 'thanks for watching!', 340, 620, lt, R(334) + .8, { size: 28 }); }
  });
  EP.count('∞', 334, .3);
})(window);
