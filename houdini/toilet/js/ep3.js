/* "Where Does It Go?" — BEAT 7 (the city that flushed itself sick: London, the Thames, Soho 1854 and John Snow, the
 * Great Stink, Bazalgette's sewers) + BEAT 8 (aftermath: 3.4 billion still without safe sanitation) + BEAT 9 (legacy recap,
 * back to the viewer, the last refrain, sign-off, Crapper waves goodbye). Soho and beat 8 carry no jokes. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, P2 = G.Paint2, K = G.VK, EK = G.EK, TS = G.TS, EF = G.EF, EP = G.EP, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, PI = Math.PI;
  const { S, fx, mood, fig, theo, sit, push, cover, card, refrain, label, LIGHT } = EP;
  const say = Gd.say, L = n => TV['L' + n];
  const dim = (ctx, a) => { ctx.save(); ctx.fillStyle = `rgba(10,12,20,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); };

  // ===================== BEAT 7 — the city that flushed itself sick =====================
  mood(242, 'rising');
  fx(245, 'confetti', .5);
  S(242, (ctx, lt, dur, t, R) => {   // now the toilet works: it doesn't stink; wealthy Londoners start installing them. Progress!
    TS.showroom(ctx, t); fig(ctx, 'mp2', 420, 760, .9, { t, pose: 'presentBoth', prop: null, turn: .3, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); fig(ctx, 'lady1', 760, 760, .85, { t: t + 1, pose: 'idle', turn: -.2, face: { mouth: 'smile', brows: 'up' } });
    if (lt > R(243)) K.tag(ctx, 'no smell (thanks, Mr Cumming)', 640, 220, lt, R(243), { size: 28 }); if (lt > R(244)) K.tag(ctx, 'wealthy Londoners install them', 640, 290, lt, R(244), { size: 28 });
    if (lt > R(245)) FX.bigText(ctx, 'PROGRESS!', 640, 130, 90 * K.pop(lt, R(245), .4), { fill: '#ffd23a' });
  });
  S(246, (ctx, lt, dur, t, R) => {   // except — remember the refrain? It still has to go somewhere.
    TS.thames(ctx, t); dim(ctx, .2); theo(ctx, 400, 760, .95, { t, outfit: 'victorian', hat: 'topHat', pose: lt < R(248) ? 'think' : 'pointUp', turn: .3, vis: say(t), face: { mouth: 'smile', brows: 'skeptic', look: [.6, -.2] } });
    if (lt > R(248)) refrain(ctx, lt, R(248), null, { y: 150 });
  });
  S(249, (ctx, lt, dur, t, R) => {   // in 1800s London "somewhere" = old sewers built for rainwater → cesspits → the Thames — the same river people draw water from
    if (lt < R(255)) { EK.board(ctx, 18); const steps = [[R(251), 'old sewers\n(built for rain)'], [R(252), 'cesspits'], [R(254), 'THE RIVER\nTHAMES']];
      steps.forEach(([a, s2], i) => { if (lt > a) EP.card(ctx, s2, 260 + i * 380, 330, lt, a, { size: 32, fill: i === 2 ? '#d8e8c8' : undefined }); if (i && lt > a) { const k = clamp((lt - a) / .4); ln(ctx, [[260 + (i - 1) * 380 + 120, 330], [260 + (i - 1) * 380 + 120 + k * 140, 330]], 10, '#8a7a4a'); } });
      EP.dateTag(ctx, 'London · 1800s'); return; }
    ctx.save(); push(ctx, lt - R(255), dur - R(255), 1.0, 1.08, 640, 520); TS.thames(ctx, t);
    fig(ctx, 'neo2', 420, 760, .8, { t, prop: 'jug', pose: { L: [-68, -158], R: [160, -230], hL: 'rest', hR: 'hold' }, turn: .5, face: { mouth: 'flat', look: [.6, .5] } }); ctx.restore();
    K.tag(ctx, 'the same river people drink from', 760, 160, lt, R(255), { size: 30 });
  });
  S(256, (ctx, lt, dur, t, R) => {   // more flushing doesn't clean the city — it pours more sewage into the river, faster
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 700, 520); TS.thames(ctx, t * 1.8, { stink: .7 }); ctx.restore();
    K.tag(ctx, 'more flushing ≠ a cleaner city', 640, 140, lt, .3, { size: 30 }); if (lt > R(258)) FX.bigText(ctx, 'FASTER', 640, 260, 80 * K.pop(lt, R(258), .4), { fill: '#c8e06a' });
  });

  // ----- Soho, 1854 — the music drops out; no jokes -----
  mood(259, 'somber');
  S(259, (ctx, lt, dur, t, R) => {   // late August 1854: cholera breaks out in Soho, central London
    ctx.save(); push(ctx, lt, dur, 1.0, 1.05, 640, 420); TS.soho(ctx, t); ctx.restore(); EP.dateTag(ctx, 'Soho, London · August 1854');
  });
  S(262, (ctx, lt, dur, t, R) => {   // cholera: an infection spread through contaminated water. It can kill within a day.
    TS.soho(ctx, t); dim(ctx, .55); EP.card(ctx, 'CHOLERA', 640, 260, lt, .2, { size: 54 });
    if (lt > .8) K.tag(ctx, 'spread through contaminated water', 640, 380, lt, .8, { size: 30 }); if (lt > R(263)) K.tag(ctx, 'can kill within a day', 640, 450, lt, R(263), { size: 30 });
  });
  S(264, (ctx, lt, dur, t, R) => {   // Dr John Snow believes it spreads through water, not through "bad air" — what most experts believed
    TS.soho(ctx, t); fig(ctx, 'snow', 380, 760, .95, { t, pose: lt > R(265) ? 'present' : 'think', turn: .35, light: LIGHT.dark, face: { mouth: 'flat', brows: 'worried', look: [.6, -.1] } });
    EK.nameCard(ctx, lt, .2, 'DR JOHN SNOW', 'physician · 1813–1858', 340, 110, { icon: 'brush', w: 400 });
    EP.card(ctx, 'WATER', 900, 280, lt, .6, { size: 44, fill: '#d8e8f4' }); if (lt > R(265)) { EP.card(ctx, '"BAD AIR"', 900, 440, lt, R(265), { size: 40 }); K.cross(ctx, 900, 440, 1.6, lt, R(265) + .6); }
    if (lt > R(266)) K.tag(ctx, 'what most experts believed', 900, 530, lt, R(266), { size: 24 });
  });
  S(267, (ctx, lt, dur, t, R) => {   // he maps the deaths house by house; they cluster around one pump on Broad Street; 89 deaths in a single week
    TS.sohoMap(ctx, t, clamp(lt / 3.5)); if (lt > R(268)) { const k = clamp((lt - R(268)) / .6); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = `rgba(200,40,30,${k})`; ctx.beginPath(); ctx.arc(640, 352, 150, 0, TAU); ctx.stroke(); ctx.restore(); }
    if (lt > R(269)) { const k = K.pop(lt, R(270), .4); ctx.save(); ctx.translate(1060, 560); ctx.scale(k, k); K.paper(ctx, 0, 0, 340, 200, { draw: c => { EK.txt(c, '89', 0, -30, '80px "Luckiest Guy"', '#2a2420'); EK.txt(c, 'cholera deaths in one week', 0, 50, '700 22px Fredoka', '#3a2618'); } }); ctx.restore(); }
    EP.dateTag(ctx, "Snow's map · 1854");
    TS.globeOver(ctx, t, lt, -0.137, 51.513, { D: 2.4 });
  });
  S(272, (ctx, lt, dur, t, R) => {   // 8 September: the pump's handle is removed. Later: a cesspit a few feet away had been leaking into the well.
    if (lt < R(274)) { ctx.save(); push(ctx, lt, dur, 1.2, 1.35, 640, 420); TS.soho(ctx, t, { handle: lt < R(273) + .6 }); ctx.restore(); EP.dateTag(ctx, '8 September 1854'); if (lt > R(273)) K.tag(ctx, 'the handle is removed', 640, 140, lt, R(273) + .4, { size: 30 }); return; }
    // cutaway under the street: the well shaft beside a cesspit, seepage between them
    ctx.fillStyle = '#2a2824'; ctx.fillRect(0, 0, W, 200); ctx.fillStyle = '#6a5a44'; ctx.fillRect(0, 200, W, H - 200); TS.stoneCourses(ctx, 0, 200, W, 20, '#5a5048', 3);
    sh(ctx, '#3a3a3e', 4, c => c.rect(560, 120, 40, 90)); sh(ctx, '#4a5a66', 4, c => c.rect(540, 210, 80, 480)); ctx.fillStyle = '#5a7a8a'; ctx.fillRect(548, 520, 64, 160);
    sh(ctx, '#3a2e22', 4, c => c.roundRect(760, 260, 220, 300, 30)); ctx.fillStyle = '#5a5a2a'; ctx.fillRect(770, 360, 200, 190);
    for (let i = 0; i < 6; i++) { const k = (t * .5 + i / 6) % 1; ctx.fillStyle = `rgba(140,150,60,${.7 * (1 - k)})`; ctx.beginPath(); ctx.ellipse(lerp(760, 630, k), 480 + i * 12, 10, 6, 0, 0, TAU); ctx.fill(); }
    K.tag(ctx, 'the well', 580, 720 - 40, lt, R(274), { size: 26 }); K.tag(ctx, 'a cesspit — a few feet away', 870, 230, lt, R(275), { size: 26 }); if (lt > R(276)) K.tag(ctx, 'leaking into the well', 700, 440, lt, R(276), { size: 26, fill: '#e8d0a0' });
  });
  S(277, (ctx, lt, dur, t, R) => {   // the famous version vs the record: the outbreak was already declining before the handle came off
    EK.board(ctx, 19); label(ctx, lt, .2, 'MYTH vs. RECORD', 640, 90);
    EP.card(ctx, 'the famous version:\nSnow pulls the handle,\nsaves the city', 320, 300, lt, .4, { size: 28 });
    if (lt > R(279)) { const k = K.pop(lt, R(279), .4); ctx.save(); ctx.translate(900, 320); ctx.scale(k, k); K.paper(ctx, 0, 0, 480, 300, { draw: c => {
      const pts = [0, 30, 90, 140, 110, 70, 40, 25, 15, 10, 6]; c.lineWidth = 6; c.strokeStyle = '#2a2420'; c.beginPath(); pts.forEach((v, i) => c.lineTo(-190 + i * 38, 90 - v * .9)); c.stroke();
      c.setLineDash([10, 8]); c.strokeStyle = '#c8322a'; c.lineWidth = 4; c.beginPath(); c.moveTo(-190 + 6 * 38, -110); c.lineTo(-190 + 6 * 38, 100); c.stroke(); c.setLineDash([]);
      EK.txt(c, 'handle off', -190 + 6 * 38, -124, '700 18px Fredoka', '#c8322a'); EK.txt(c, 'deaths per day', 0, 124, '700 18px Fredoka', '#6a5040'); } }); ctx.restore(); }
    if (lt > R(280)) K.tag(ctx, 'already declining', 900, 520, lt, R(280) + .6, { size: 28 });
  });
  S(281, (ctx, lt, dur, t, R) => {   // his real legacy: the map, and the proof that dirty water kills. At the time, many authorities didn't believe him.
    TS.sohoMap(ctx, t, 1); dim(ctx, .25); fig(ctx, 'snow', 220, 780, .8, { t, pose: 'present', turn: .35, face: { mouth: 'flat', brows: 'neutral', look: [.6, -.2] } });
    EP.card(ctx, 'the map — and the proof\nthat dirty water kills', 760, 160, lt, .3, { size: 32, fill: '#fff3c8' });
    if (lt > R(284)) { fig(ctx, 'mp1', 1080, 780, .8, { t, pose: 'crossed', prop: null, turn: -.35, face: { mouth: 'frown', eyes: 'half', brows: 'skeptic' } }); K.tag(ctx, 'many authorities: not convinced', 900, 360, lt, R(284), { size: 26 }); }
  });

  // ----- the Great Stink, 1858 — the music comes back, lighter -----
  mood(285, 'busy');
  S(285, (ctx, lt, dur, t, R) => {   // four years later, the hot summer of 1858: the Thames smells so bad newspapers call it "The Great Stink"
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 500); TS.thames(ctx, t, { v: 'stink', stink: 1 }); ctx.restore(); EP.dateTag(ctx, 'London · summer 1858');
    if (lt > R(289)) { const k = K.pop(lt, R(289) - .3, .45); ctx.save(); ctx.translate(640, 330); ctx.rotate(-.05); ctx.scale(k, k); K.paper(ctx, 0, 0, 640, 300, { fill: '#efe8d6', draw: c => {
      EK.txt(c, 'THE LONDON DAILY', 0, -110, '600 24px Georgia, serif', '#2a2420'); ln(c, [[-280, -90], [280, -90]], 2, '#2a2420'); EK.txt(c, 'THE GREAT STINK', 0, -20, '64px "Luckiest Guy"', '#2a2420');
      for (let i = 0; i < 4; i++) ln(c, [[-260, 40 + i * 22], [260 - (i % 2) * 60, 40 + i * 22]], 3, 'rgba(40,36,32,.4)'); } }); ctx.restore(); }
  });
  S(290, (ctx, lt, dur, t, R) => {   // and the brand-new Houses of Parliament sit right on the river (Londoners holding their noses)
    ctx.save(); push(ctx, lt, dur, 1.0, 1.06, 640, 420); TS.parliament(ctx, t); ctx.restore();
    fig(ctx, 'mp2', 1000, 780, .7, { t, pose: { L: [-68, -158], R: [40, -360], hL: 'rest', hR: 'hold' }, prop: 'hanky', turn: -.3, face: { mouth: 'grit', eyes: 'squint', brows: 'worried' } });
    fig(ctx, 'lady2', 220, 780, .7, { t: t + 1, pose: 'facepalm', turn: .3, face: { mouth: 'frown', eyes: 'squint', brows: 'worried' } });
    K.tag(ctx, 'the brand-new Houses of Parliament', 640, 110, lt, .3, { size: 28 });
  });
  fx(293, 'stamp', .6);
  S(291, (ctx, lt, dur, t, R) => {   // they try soaking the curtains in chloride of lime. It doesn't work.
    TS.parliament(ctx, t, { inside: true, stink: .5 + .3 * Math.sin(t) }); K.tag(ctx, 'curtains soaked in chloride of lime', 640, 120, lt, .3, { size: 30 });
    if (lt > R(293)) FX.stamp(ctx, 'DOESN\'T WORK', 640, 300, clamp((lt - R(293)) / .3), { color: '#c8322a', size: 64, rot: -.08 });
  });
  S(294, (ctx, lt, dur, t, R) => {   // SKIT — MP 1: "Shall we debate the sewage bill?"  MP 2 (eyes watering): "Shall we debate it quickly?"
    ctx.save(); cover(ctx, lt, [[0, 1.4, 470, 340], [R(296) - .1, 1.4, 820, 340]]); TS.parliament(ctx, t, { inside: true, stink: .7 });
    fig(ctx, 'mp1', 470, 760, .9, { t, pose: 'present', prop: null, turn: .35, vis: lt < R(296) - .1 ? say(t) : null, face: { mouth: 'smile', brows: 'up', look: [.6, 0] } }); EP.mark(ctx, 'mp1', 470, 760, .9);
    fig(ctx, 'mp2', 820, 760, .9, { t, pose: { L: [-68, -158], R: [40, -360], hL: 'rest', hR: 'hold' }, prop: 'hanky', turn: -.35, vis: lt > R(296) - .1 ? say(t) : null, face: { mouth: 'grit', eyes: 'squint', brows: 'worried', sweat: true } }); EP.mark(ctx, 'mp2', 820, 760, .9);
    if (lt > R(296)) for (const sd of [-1, 1]) { const k = (t * 1.5 + (sd > 0 ? .5 : 0)) % 1; ctx.fillStyle = 'rgba(120,190,240,.9)'; ctx.beginPath(); ctx.ellipse(lerp(820 + sd * 30, 820 + sd * 50, k) - 640 + 640, 460 + k * 80, 6, 9, 0, 0, TAU); ctx.fill(); }
    ctx.restore(); EP.speech(ctx, 'mp1', '"Shall we debate the sewage bill?"', L(294), L(296), t); EP.speech(ctx, 'mp2', '"Shall we debate it… quickly?"', L(296), L(297), t);
  });
  fx(299, 'stamp', .7, .3);
  S(297, (ctx, lt, dur, t, R) => {   // people dying in Soho wasn't enough. Politicians smelling it themselves? That got a sewer funded.
    EK.board(ctx, 20); EP.card(ctx, 'people dying in Soho', 380, 260, lt, .2, { size: 32 }); if (lt > .9) K.tag(ctx, 'not enough', 380, 360, lt, .9, { size: 28 });
    if (lt > R(298)) { EP.card(ctx, 'politicians smelling it', 900, 260, lt, R(298), { size: 32 }); }
    if (lt > R(299)) FX.stamp(ctx, 'SEWER FUNDED', 900, 400, clamp((lt - R(299) - .2) / .3), { color: '#2a7a4a', size: 54, rot: -.08 });
  });

  // ----- Joseph Bazalgette -----
  mood(300, 'rising');
  S(300, (ctx, lt, dur, t, R) => {   // enter Joseph Bazalgette, engineer. His plan: intercepting sewers along the Thames, catching waste before the centre, carrying it far downstream
    if (lt < R(302)) { TS.sewer(ctx, t); fig(ctx, 'bazalgette', 640, 760, 1.0, { t, pose: 'pointSide', turn: .1, face: { mouth: 'smile', brows: 'up' } });
      EK.nameCard(ctx, lt, .2, 'JOSEPH BAZALGETTE', 'BAZZ-ul-jet · engineer, 1819–1891', 380, 110, { icon: 'brush', w: 480 }); return; }
    TS.londonMap(ctx, t, clamp((lt - R(302)) / 5)); if (lt > R(303)) K.tag(ctx, 'catch the waste BEFORE the river', 640, 660, lt, R(303), { size: 28 }); if (lt > R(304)) K.tag(ctx, '…carry it far downstream →', 1000, 600, lt, R(304), { size: 26 });
  });
  fx(306, 'tick', .4); fx(307, 'hammer', .4, .4);
  S(305, (ctx, lt, dur, t, R) => {   // main system finished by 1875; Historic England: 1,000+ miles of new sewers and ~318 million bricks
    ctx.save(); push(ctx, lt, dur, 1.0, 1.08, 640, 440); TS.sewer(ctx, t);
    for (const [x, y, s, i] of [[360, 760, .8, 0], [900, 760, .8, 1]]) fig(ctx, 'navvy', x, y, s, { t: t + i, pose: Gd.pose((t * .6 + i) % 2, [[0, 'idle'], [1, 'present']]), turn: i ? -.3 : .3, face: { mouth: 'flat', brows: 'neutral' } });
    fig(ctx, 'bazalgette', 640, 760, .85, { t, pose: 'idle', prop: 'plans', turn: 0, face: { mouth: 'smile', brows: 'up' } }); ctx.restore();
    EP.dateTag(ctx, 'finished by 1875'); if (lt > R(306)) EK.count(ctx, 330, 230, 1000, lt, R(306), 1.6, 'miles of new sewers (1,000+)', { size: 72, suffix: '+' });
    if (lt > R(307)) EK.count(ctx, 950, 230, 318000000, lt, R(307), 2, 'bricks · Historic England', { size: 58 });
  });
  S(308, (ctx, lt, dur, t, R) => {   // enough brick sewer to run from New York to past Chicago — under one city
    const v = { lon: -80, lat: 41.6, z: 1.0 }; TS.map(ctx, t, 'usa', v); const [x0, y0] = TS.mapPt('usa', v, -74.0, 40.7), [x1, y1] = TS.mapPt('usa', v, -91.5, 41.9), k = ease.inOut(clamp((lt - .4) / 2.4));
    ctx.save(); ctx.lineCap = 'round'; ln(ctx, [[x0, y0], [lerp(x0, x1, k), lerp(y0, y1, k)]], 20, '#3a2418'); ln(ctx, [[x0, y0], [lerp(x0, x1, k), lerp(y0, y1, k)]], 13, '#b8643e'); ctx.restore();
    TS.pin(ctx, 'usa', v, -74.0, 40.7, 'New York', clamp(lt / .4)); TS.pin(ctx, 'usa', v, -87.6, 41.9, 'Chicago', clamp((lt - 1.6) / .4));
    K.tag(ctx, '≈ 1,000+ miles of brick sewer', 640, 120, lt, 1.0, { size: 30 }); if (lt > R(309)) K.tag(ctx, '…all of it under ONE city', 640, 640, lt, R(309), { size: 32 });
    TS.globeOver(ctx, t, lt, -82, 41.3, { D: 2.2 });
  });
  S(310, (ctx, lt, dur, t, R) => {   // London suffers one more cholera outbreak, in 1866 — in an area not yet connected to the new system
    TS.londonMap(ctx, t, 1); const k = clamp((lt - R(311)) / .5); ctx.save(); ctx.globalAlpha = .35 * k; ctx.fillStyle = '#c8322a'; ctx.beginPath(); ctx.ellipse(1040, 300, 130, 80, 0, 0, TAU); ctx.fill(); ctx.restore();
    if (lt > R(311)) K.tag(ctx, '1866: one more outbreak', 1000, 200, lt, R(311), { size: 28 }); if (lt > R(312)) K.tag(ctx, 'not yet connected', 1040, 420, lt, R(312), { size: 26 });
    EP.dateTag(ctx, 'London · 1866');
  });
  fx(316, 'stamp', .6, .2);
  S(313, (ctx, lt, dur, t, R) => {   // that's when the toilet becomes safe for everyone — not when the flush was invented, but when a city answered: where does it go?
    TS.sewer(ctx, t); theo(ctx, 640, 760, .95, { t, outfit: 'victorian', hat: 'topHat', pose: lt < R(314) ? 'present' : lt < R(316) ? 'shrug' : 'pointUp', turn: 0, vis: say(t), face: { mouth: 'smile', brows: 'up' } });
    if (lt > R(314)) { K.tag(ctx, 'inventing the flush', 280, 300, lt, R(314), { size: 26 }); K.cross(ctx, 280, 300, 1.4, lt, R(314) + .6); }
    if (lt > R(315)) K.tag(ctx, 'a city answering the question', 1000, 300, lt, R(315), { size: 26 });
    if (lt > R(316)) FX.bigText(ctx, 'WHERE DOES IT GO?', 640, 140, 72 * K.pop(lt, R(316), .4), { fill: '#ffd23a' });
  });

  // ===================== BEAT 8 — aftermath & human cost (quiet, no jokes) =====================
  mood(317, 'tender');
  function people(ctx, x, y, n, on, k, sz = 46) { for (let i = 0; i < n; i++) { const a = clamp(k * n - i); if (a <= 0) continue; ctx.save(); ctx.globalAlpha = a; ctx.translate(x + i * sz * 1.4, y); const col = i < on ? '#c8643a' : '#8aa6b8';
      sh(ctx, col, 3, circ(0, -sz * 1.4, sz * .36)); sh(ctx, col, 3, c => c.roundRect(-sz * .45, -sz * 1.0, sz * .9, sz, sz * .3)); ctx.restore(); } }
  S(317, (ctx, lt, dur, t, R) => {   // here's the part that stops being funny: the toilet you used today isn't a finished story
    EK.board(ctx, 21); theo(ctx, 640, 760, .95, { t, pose: 'idle', turn: 0, vis: say(t), face: { mouth: 'flat', brows: 'neutral' } });
  });
  S(319, (ctx, lt, dur, t, R) => {   // WHO/UNICEF: in 2024, 3.4 billion people lacked safely managed sanitation; 354 million still had no toilet at all
    EK.board(ctx, 22); EP.dateTag(ctx, 'WHO / UNICEF JMP · 2025 report');
    if (lt > R(321)) { EK.count(ctx, 640, 170, 3.4, lt, R(321), 1.6, 'billion people without safely managed sanitation (2024)', { size: 90, dec: 1 }); people(ctx, 330, 420, 10, 4, clamp((lt - R(321) - .5) / 1.5)); }
    if (lt > R(322)) K.tag(ctx, 'safely managed = waste safely contained or treated', 640, 500, lt, R(322), { size: 24 });
    if (lt > R(323)) K.tag(ctx, 'the same problem London had', 640, 560, lt, R(323), { size: 24 });
    if (lt > R(324)) EP.card(ctx, '354 million: still no toilet at all\n(open defecation)', 640, 640, lt, R(324), { size: 26, fill: '#fff3c8' });
  });
  S(325, (ctx, lt, dur, t, R) => {   // the numbers are improving: 1.2 billion gained safe sanitation 2015–2024; the same lesson Skara Brae, Rome and Soho taught
    EK.board(ctx, 23);
    if (lt < R(328)) { EK.count(ctx, 640, 260, 1.2, lt, R(327), 1.4, 'billion people gained safe sanitation, 2015–2024', { size: 100, dec: 1, prefix: '+' }); K.tag(ctx, 'improving', 640, 440, lt, .4, { size: 30, fill: '#cfe8c0' }); return; }
    [['Skara Brae', R(328)], ['Rome', R(328) + .7], ['Soho', R(329)]].forEach(([s2, a], i) => { if (lt > a) EP.card(ctx, s2, 300 + i * 340, 240, lt, a, { size: 34 }); });
    if (lt > R(330)) EP.card(ctx, 'a toilet without a safe place for the waste to go\nisn\'t really a solution', 640, 480, lt, R(330), { size: 28, fill: '#fff3c8' });
  });

  // ===================== BEAT 9 — legacy + close =====================
  mood(332, 'warm');
  const RECAP = [[333, 'Scotland: a drain under a stone cell', 'skara'], [334, 'Indus: the street sewers', 'indus'], [335, 'Rome: the giant ones…', 'rome'], [336, '…and the most awkward group chat', 'bench'],
    [337, 'Europe: back to the bucket', 'bucket'], [338, "a queen's godson: the flush", 'harington'], [339, '…and nobody cared', null], [340, 'a watchmaker: bent the pipe', 'cumming'], [341, 'a plumber: Crapper sold it', 'crapper'], [342, 'a Stink: built the sewers', 'bazalgette']];
  S(332, (ctx, lt, dur, t, R) => {   // so let's say it back — the whole 5,000 years in one sweep
    EK.board(ctx, 24); FX.bigText(ctx, "LET'S SAY IT BACK", 640, 80, 52 * K.pop(lt, .1, .4), { fill: '#ffd23a' });
    const cur = RECAP.filter(([n]) => lt > R(n)).length, pan = lerp(0, Math.max(0, (cur - 4) * 300), ease.inOut(clamp((lt - (cur ? R(RECAP[Math.max(0, cur - 1)][0]) : 0)) / .6)));
    ctx.save(); ctx.translate(-Math.max(0, (cur - 4)) * 300 + 0, 0);
    RECAP.forEach(([n, s2, who], i) => { if (lt < R(n)) return; const k = K.pop(lt, R(n), .4), x = 200 + i * 300, y = 380; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate((i % 2 ? 1 : -1) * .03);
      K.paper(ctx, 0, 0, 270, 330, { draw: c => { c.save(); c.beginPath(); c.rect(-120, -150, 240, 210); c.clip(); c.fillStyle = '#d8c8a8'; c.fillRect(-120, -150, 240, 210);
        if (who === 'skara') { c.fillStyle = '#9a8e76'; c.fillRect(-120, -150, 240, 210); sh(c, '#1e1a16', 3, cc => cc.roundRect(-40, -80, 80, 120, 30)); }
        else if (who === 'indus') TS.bricks(c, -120, -150, 240, 210, { c: '#c47a4a', bw: 40, bh: 16 });
        else if (who === 'rome') { c.fillStyle = '#9ab8d0'; c.fillRect(-120, -150, 240, 210); for (let j = 0; j < 4; j++) sh(c, '#d8c09a', 3, cc => cc.rect(-120 + j * 64, -60, 20, 120)); sh(c, '#d8c09a', 3, cc => cc.rect(-120, -80, 240, 24)); }
        else if (who === 'bench') { c.fillStyle = '#c8644a'; c.fillRect(-120, -150, 240, 210); sh(c, '#f2ece0', 3, cc => cc.rect(-120, 0, 240, 40)); G.VK.fig(c, -50, 210, .32, EP.cast('marcus', { t })); G.VK.fig(c, 50, 210, .32, EP.cast('roman2', { t })); }
        else if (who === 'bucket') { sh(c, '#c47a48', 4, cc => { cc.moveTo(-50, -40); cc.quadraticCurveTo(-70, 40, -40, 50); cc.lineTo(40, 50); cc.quadraticCurveTo(70, 40, 50, -40); cc.closePath(); }); }
        else if (who) G.VK.fig(c, 0, 250, .45, EP.cast(who, { t, face: { mouth: 'grin', eyes: 'happy' } }));
        else { FX.bigText(c, '…', 0, -40, 90, { fill: '#6a5040' }); }
        c.restore(); G.EK.txt(c, '', 0, 0, '700 1px Fredoka'); const words = s2.split(' '), l1 = [], l2 = []; words.forEach(w => (l1.join(' ').length < 18 ? l1 : l2).push(w)); EK.txt(c, l1.join(' '), 0, 96, '700 20px Fredoka', '#3a2618'); EK.txt(c, l2.join(' '), 0, 124, '700 20px Fredoka', '#3a2618'); } }); ctx.restore(); });
    ctx.restore();
  });
  fx(344, 'splash', .6, .9); fx(344, 'river', .4, 1.0, 2);
  S(344, (ctx, lt, dur, t, R) => {   // back to the viewer: the next time you flush, you're using 5,000 years of people answering one question
    ctx.save(); push(ctx, lt, dur, 1.0, 1.1, 640, 400); EP.viewerScene(ctx, t, lt, { pose: lt > .8 && lt < 2 ? { L: [-68, -158], R: [120, -330], hL: 'rest', hR: 'point' } : undefined, turn: .2, face: { mouth: 'smile', eyes: 'open', brows: 'up', look: [.2, -.2] } }); ctx.restore();
    if (lt > R(346)) EP.card(ctx, '5,000 years of people\nanswering one question', 1000, 180, lt, R(346), { size: 30 });
  });
  fx(347, 'stamp', .7, .4);
  S(347, (ctx, lt, dur, t, R) => {   // …and it still has to go somewhere.
    TS.bathroom(ctx, t); TS.toilet(ctx, 640, 700, .95); refrain(ctx, lt, .2, null, { y: 200 });
  });
  S(348, (ctx, lt, dur, t, R) => {   // subscribe for more history stories · which era's bathroom would you survive longest in? · another history video · thanks for watching
    TS.bathroom(ctx, t, { pan: 60 });
    if (lt < R(349)) { theo(ctx, 380, 760, .95, { t, pose: 'present', turn: .35, vis: say(t), face: { mouth: 'grin', brows: 'up' } }); EP.card(ctx, 'SUBSCRIBE\nfor more history stories', 900, 300, lt, .3, { size: 40, fill: '#fff3c8' }); }
    else if (lt < R(351)) { EK.board(ctx, 25); EP.card(ctx, 'Which era\'s bathroom would YOU survive longest in?', 640, 120, lt, R(349), { size: 30 });
      [['stone cell', 'skara'], ['Roman bench', 'bench'], ['garderobe', 'castle'], ['Victorian WC', 'wc']].forEach(([s2], i) => { if (lt > R(350) + i * .3) EP.card(ctx, s2, 220 + i * 280, 380, lt, R(350) + i * .3, { size: 32 }); });
      K.tag(ctx, 'tell me in the comments', 640, 600, lt, R(350) + 1.4, { size: 28 }); }
    else { theo(ctx, 300, 760, .9, { t, pose: 'wave', turn: .3, vis: say(t), face: { mouth: 'grin', brows: 'up', eyes: 'happy' } });
      ctx.save(); ctx.setLineDash([16, 12]); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.strokeRect(640, 60, 560, 300); ctx.restore(); K.tag(ctx, 'another history video →', 920, 400, lt, R(351), { size: 26 });
      if (lt > R(352)) { fig(ctx, 'crapper', 1050, 760, .8, { t, pose: 'wave', turn: -.3, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }); FX.bigText(ctx, 'THANKS FOR WATCHING', 640, 520, 54 * K.pop(lt, R(352), .4), { fill: '#ffd23a' }); }
      const fade = clamp((lt - (dur - 1.2)) / 1.2); if (fade > 0) dim(ctx, fade); }
  });
})(window);
