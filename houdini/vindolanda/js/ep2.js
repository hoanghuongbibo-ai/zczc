/* BEAT 4 (morning: the headcount) + BEAT 5 (midday: the supply chain) */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, V = G.VS, TV = G.TV, { W, H, clamp, lerp, ease, grad, rng } = T;
  const { OUT, sh, ln, circ, motes } = P, TAU = Math.PI * 2, { S, fx, mood } = G.EP;
  const theo = o => Object.assign({ light: K.LIGHT.warm }, o), aux = o => K.cast('theoAux', Object.assign({ light: K.LIGHT.warm }, o));

  // ---------- 32. let's go there: Theo spins into a Tungrian ----------
  S('gothere', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0); const sp = R('tung2') - .7, k = clamp((lt - sp) / .5), th = ease.inOut(k) * TAU * 1.5, after = lt > sp + .25;
    const o = { t, turn: k > 0 && k < 1 ? Math.sin(th) : 0, back: k > 0 && k < 1 && Math.cos(th) < 0, talk: K.vtalk(t), pose: after ? Gd.pose(lt - sp, [[0, 'idle'], [.6, 'hips']]) : 'present', hair: Gd.hairRing(lt - sp - .4, .5), face: after ? { mouth: 'grin', brows: 'up', eyes: lt > sp + 1 ? 'happy' : 'open' } : { mouth: 'grin', brows: 'up' } };
    K.fig(ctx, 640, 700, .95, after ? aux(Object.assign(o, { prop: 'shield' })) : theo(o));
    K.puff(ctx, 640, 470, clamp((lt - sp - .2) / .25), 1 - clamp((lt - sp - .45) / .4));
    FX.dateTag(ctx, '18 MAY · AD 90s'); K.title(ctx, 'YOU: A TUNGRIAN SOLDIER', lt, R('tung2'), { y: 110, size: 54 }); });
  mood('gothere', 'morning'); fx('tung2', 'whoosh', .8, -.7); fx('tung2', 'pop', .7, -.45); fx('tung2', 'sparkle', .5, -.3);
  // ---------- 34. wake up in the barrack block, with the men you eat / march / complain with ----------
  S('wake', (ctx, lt, dur, t, R) => { V.barracks(ctx, t, lerp(0, 30, lt / dur));
    const up = ease.out(clamp((lt - .6) / .5));
    ctx.save(); ctx.translate(lerp(250, 300, up), lerp(470, 690, up)); ctx.rotate(-Math.PI / 2 * (1 - up)); Gd.draw(ctx, 0, 0, .78, aux({ t, hat: 'none', prop: null, light: Object.assign({}, K.LIGHT.grey, { cast: 0, contact: up }), pose: up < 1 ? 'idle' : Gd.pose(lt - 1.1, [[0, 'cheer'], [1.4, 'idle']]), face: up < .1 ? { eyes: 'closed', mouth: 'flat' } : lt < 2.6 ? { eyes: 'closed', mouth: 'o', brows: 'up' } : { mouth: 'smile', eyes: 'half' } })); ctx.restore();
    const who = [['tungA', 600, 218.68, 'cup', 'eat with'], ['tungB', 820, 219.33, null, 'march with'], ['tungC', 1040, 220.22, null, 'complain with']];
    who.forEach(([n, x, at, prop, l], i) => { const k = K.pop(t, at - .1); if (k <= 0) return; K.fig(ctx, x, 690 + (1 - k) * 60, .74, K.cast(n, { t: t + i, hat: 'none', prop: prop || undefined, walk: i === 1 ? t * 7 : null, turn: -.35, pose: i === 0 ? 'present' : i === 2 ? 'shrug' : 'idle', face: i === 2 ? { mouth: 'frown', brows: 'angry', look: [-.6, 0] } : { mouth: 'grin', look: [-.6, 0] }, light: K.LIGHT.grey, talk: i === 2 ? clamp(.5 + .5 * Math.sin(t * 15)) : 0 })); K.tag(ctx, l, x, 340, t, at, { size: 22 }); });
    if (lt < .6) K.bubble(ctx, 'z z z', 360, 360, lt, .05, { size: 24 }); });
  fx('wake', 'birds', .5, .2); fx('wake', 'boing', .5, .6); fx('wake', 'pop', .4, 3.2); fx('wake', 'pop', .4, 3.85); fx('wake', 'pop', .4, 4.7);
  // ---------- 35. spring: lovely … raining sideways ----------
  S('outside', (ctx, lt, dur, t) => { const wet = t > 226.9; V.street(ctx, t, 0, { v: wet ? 'rain' : 'day', slant: 1.1 });
    if (!wet && t > 225.0) { const r = rng(3); for (let i = 0; i < 20; i++) { const k = K.pop(t, 225.0 + i * .02); sh(ctx, P.FLOWERS[i % 6], 2, circ(100 + r() * 1080, 620 + r() * 90, 8 * k)); } }
    K.fig(ctx, 640, 690, .86, aux({ t, prop: 'spear', turn: wet ? 0 : .2, pose: wet ? 'idle' : Gd.pose(lt, [[0, 'idle'], [3.6, 'cheer']]), light: wet ? K.LIGHT.grey : K.LIGHT.warm, lean: wet ? -.05 : 0, face: wet ? { eyes: 'half', mouth: 'flat', brows: 'worried' } : { mouth: 'grin', eyes: lt > 3.6 ? 'happy' : 'open', brows: 'up' } }));
    if (wet) { K.rain(ctx, t, 1, 220, 1.1); for (let i = 0; i < 6; i++) { const y = 300 + ((t * 300 + i * 60) % 300); sh(ctx, '#bfe3f7', 2, c => c.ellipse(600 + (i % 3) * 40, y, 4, 7, 0, 0, TAU)); } }
    K.tag(ctx, wet ? 'raining sideways' : 'lovely?', 640, 110, t, wet ? 227.2 : 225.2, { size: 30 }); });
  fx('outside', 'birds', .6, .3); fx('sideways', 'rain', .7, -.3, 2.4); fx('sideways', 'wind', .6, -.3, 2.2); fx('sideways', 'boing', .4, -.3);
  // ---------- 36. the army's first question: who's here? ----------
  S('army', (ctx, lt, dur, t, R) => { V.street(ctx, t, 0, { v: 'dawn' });
    for (let i = 0; i < 9; i++) K.mini(ctx, 150 + i * 70, 640, 1.25, t, { mail: true, helmet: true, shield: true, spear: true, skin: K.SKINS[i % 6], ph: i });
    K.fig(ctx, 1000, 700, .82, K.cast('clerk', { t, prop: 'tablet', turn: -.45, pose: 'present', talk: 0, face: { mouth: 'flat', eyes: 'half', look: [-.8, 0] } }));
    const n = Math.floor(clamp((lt - .4) / 3) * 9); for (let i = 0; i < n; i++) K.tick(ctx, 150 + i * 70, 520, 16, lt, .4 + i / 3);
    K.title(ctx, 'WHO’S ACTUALLY HERE?', lt, R('whohere'), { y: 110, size: 56 }); });
  for (let i = 0; i < 9; i++) fx('army', 'tick', .5, .4 + i / 3); fx('whohere', 'pop', .6);
  S('thing', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0); K.fig(ctx, 420, 700, .92, aux({ t, turn: .3, prop: null, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'present'], [R('haveit'), 'presentBoth']]), face: { mouth: 'grin', brows: 'up' } }));
    if (lt > R('haveit')) K.tablet(ctx, 860, 340, 380, 210, { seed: 154, worn: true, glow: .3, scale: K.pop(lt, R('haveit')) }); K.tag(ctx, 'We have it.', 860, 520, lt, R('haveit') + .2, { size: 30 }); });
  fx('haveit', 'sparkle', .7);
  // ---------- 38. the strength report (Tab. Vindol. 154) ----------
  S('report', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); K.tablet(ctx, 470, 360, 560, 300, { seed: 154, worn: true, glow: .2, scale: K.pop(lt, 0), rows: 6 });
    K.paper(ctx, 1000, 260, 380, 200, { rot: .03, scale: K.pop(lt, .4), draw: c => { K.txt(c, 'Tab. Vindol. 154', 0, -60, K.FONT(700, 24), '#b2342f', 'center'); K.txt(c, 'strength report', 0, -22, K.FONT(700, 26), OUT, 'center'); K.txt(c, 'First Cohort of Tungrians', 0, 16, K.FONT(600, 20), OUT, 'center'); K.txt(c, '18 May · AD 90s', 0, 52, K.FONT(600, 18), '#8a5a3a', 'center'); } });
    if (lt > R('prefect')) { const k = K.pop(lt, R('prefect')); ctx.save(); ctx.translate(1000, 520); ctx.scale(k, k); sh(ctx, '#c99a3c', 5, c => c.roundRect(-110, -90, 220, 180, 12)); sh(ctx, '#f3e2c0', 3, c => c.roundRect(-96, -76, 192, 152, 8)); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.roundRect(1000 - 96 * k, 520 - 76 * k, 192 * k, 152 * k, 8); ctx.clip(); K.fig(ctx, 1000, 740, .6 * k, K.cast('verecundus', { t, pose: 'idle', face: { mouth: 'flat', eyes: 'half' }, light: Object.assign({}, K.LIGHT.night, { cast: 0, contact: 0 }) })); ctx.restore(); K.tag(ctx, 'prefect: Iulius Verecundus', 1000, 640, lt, R('prefect') + .2, { size: 20 }); } });
  fx('report', 'paper', .6); fx('prefect', 'pop', .5); mood('report', 'curious');
  // ---------- 39. the headcount: 752 on the books, 456 away, 296 here ----------
  const COLS = 32, cell = 17, gx0 = 90, gy0 = 210;
  function grid(ctx, t, lt, R, o) { for (let i = 0; i < 752; i++) { const c = i % COLS, r = Math.floor(i / COLS), x = gx0 + c * cell, y = gy0 + r * cell; let col = '#3c5a86', dx = 0, dy = 0, a = 1;
      if (o.away && i >= 296) { const grp = i < 296 + 46 ? 0 : i < 296 + 47 ? 1 : i < 296 + 47 + 337 ? 2 : 3, at = [o.guards, o.london, o.coria, o.away + .4][grp]; if (lt > at) { const k = ease.inOut(clamp((lt - at - (i % 40) * .01) / .9)), dest = [[900, 260], [1100, 260], [960, 470], [1150, 470]][grp]; dx = (dest[0] + (i % 9) * 6 - x) * k; dy = (dest[1] + Math.floor((i % 81) / 9) * 6 - y) * k; col = ['#c99a3c', '#d8433a', '#6f7a52', '#8a8a8a'][grp]; a = 1 - k * .3; } else col = '#b9a48a'; }
      if (o.unfit && i < 296) { if (i < 15 && lt > o.sick) col = '#e07a2e'; else if (i >= 15 && i < 21 && lt > o.wounded) col = '#d8433a'; else if (i >= 21 && i < 31 && lt > o.eyes) col = '#a050c0'; else if (lt > o.fit) col = '#3f9a4f'; }
      ctx.globalAlpha = a; sh(ctx, col, 1.5, circ(x + dx, y + dy, 6)); ctx.globalAlpha = 1; } }
  S('y752', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0, { plain: true }); const at = R('away');
    grid(ctx, t, lt, R, { away: at, guards: R('guards'), london: R('london'), coria: R('coria') });
    K.counter(ctx, 360, 120, 0, 752, lt, 0, 1.2, 'on the books · incl. 6 centurions', { size: 70 });
    if (lt > at) { K.counter(ctx, 1000, 120, 0, 456, lt, at, 1, 'away', { size: 60, color: '#ffb36a' }); }
    K.tag(ctx, '46 · governor’s bodyguards', 920, 330, lt, R('guards'), { size: 17 }); K.tag(ctx, '1 centurion · London', 1120, 220, lt, R('london'), { size: 17 }); K.tag(ctx, '337 · at Coria', 960, 560, lt, R('coria'), { size: 19 });
    if (lt > R('corb')) { const k = K.pop(lt, R('corb')); ctx.save(); ctx.translate(1130, 600); ctx.scale(k, k); sh(ctx, '#ecd9b2', 3.5, c => c.roundRect(-110, -40, 220, 80, 10)); ln(ctx, [[-90, 10], [90, 10]], 5, '#c9a46a'); sh(ctx, '#d8433a', 2.5, circ(-60, 10, 8)); sh(ctx, '#6f7a52', 2.5, circ(60, 10, 8)); K.txt(ctx, 'Vindolanda', -60, -16, K.FONT(700, 12), OUT, 'center'); K.txt(ctx, 'Coria ≈ Corbridge →', 50, -16, K.FONT(700, 12), OUT, 'center'); ctx.restore(); }
    K.tag(ctx, 'On the books: 752 · Away: 456 · Here: 296', 400, 680, lt, R('coria') + 1.6, { size: 22, fill: '#fde6c4' }); });
  fx('y752', 'rise', .5); fx('away', 'whoosh', .6); fx('guards', 'swish', .5); fx('london', 'pop', .5); fx('coria', 'whoosh', .6); fx('corb', 'ding', .4);
  // ---------- 40. more than half isn't here — and that was normal ----------
  S('half', (ctx, lt, dur, t, R) => { V.barracks(ctx, t, 0, { light: .05 }); K.fig(ctx, 640, 700, .9, aux({ t, prop: null, pose: Gd.pose(lt, [[0, 'shrug']]), face: lt < R('scholars') ? { mouth: 'shock', eyes: 'wide', brows: 'up' } : { mouth: 'smile', eyes: 'half', brows: 'sly' }, hair: Gd.hairRing(lt, .4) }));
    for (let i = 0; i < 6; i++) { const x = 80 + i * 40 + Math.sin(t * 2 + i) * 3; ctx.save(); ctx.globalAlpha = .6; K.mini(ctx, x, 660, .9, t, { mail: true, helmet: true }); ctx.restore(); }
    K.title(ctx, 'MORE THAN HALF: AWAY', lt, .1, { y: 110, size: 52 }); if (lt > R('scholars')) { K.paper(ctx, 1030, 330, 380, 170, { rot: -.03, scale: K.pop(lt, R('scholars')), draw: c => { K.txt(c, 'the editors:', -160, -40, K.FONT(700, 22), '#8a5a3a'); K.txt(c, 'splitting a unit like this', -160, 0, K.FONT(700, 22)); K.txt(c, 'seems fairly normal here.', -160, 36, K.FONT(700, 22)); } }); } });
  fx('half', 'boing', .5); fx('scholars', 'paper', .5);
  // ---------- 41. of the 296 present: sick, wounded, eye inflammation → 265 fit ----------
  S('present', (ctx, lt, dur, t, R) => { V.studio(ctx, t, 0, { plain: true });
    for (let i = 0; i < 296; i++) { const c = i % 24, r = Math.floor(i / 24), x = 120 + c * 22, y = 200 + r * 22; let col = '#3c5a86';
      if (t > 287.96 && i < 15) col = '#e07a2e'; else if (t > 289.46 && i >= 15 && i < 21) col = '#d8433a'; else if (t > 291.22 && i >= 21 && i < 31) col = '#a050c0'; else if (t > 294.4) col = '#3f9a4f'; const kk = K.pop(lt, .1 + i * .002); sh(ctx, col, 1.5, circ(x, y, 8 * kk)); }
    K.counter(ctx, 380, 120, 0, 296, lt, 0, .8, 'present', { size: 60 });
    [[287.96, '15 sick', '#e07a2e'], [289.46, '6 wounded', '#d8433a'], [291.22, '10 eye inflammation', '#a050c0']].forEach(([at, l, col], i) => { K.tag(ctx, l, 960, 230 + i * 70, t, at, { size: 24, fill: col, col: '#fff' }); });
    if (t > 294.4) K.counter(ctx, 960, 480, 296, 265, t, 294.4, 1.4, 'fit for duty', { size: 80, color: '#7fd08a' });
    if (t > 297.81) K.tag(ctx, 'more than 1 in 10 on the sick list', 640, 670, t, 297.81, { size: 26, fill: '#fde6c4' });
    // a little sick-bay vignette: a soldier with red, itchy eyes
    if (t > 291.22 && t < 294.4) { K.fig(ctx, 1160, 700, .5, K.cast('tungB', { t, hat: 'none', pose: 'facepalm', face: { mouth: 'frown', brows: 'worried', eyes: 'squint' } })); } });
  fx('sick', 'pop', .5); fx('wounded', 'pop', .5); fx('eyes', 'pop', .5); fx('fit', 'rise', .5); fx('fit', 'ding', .5, 1.4); fx('onein10', 'tick', .5);
  S('wrote2', (ctx, lt, dur, t) => K.wroteSting(ctx, lt, t)); fx('wrote2', 'wrote', .9);
  // ---------- 43. an honest note: worn edges, digits ±1–2 ----------
  S('honest', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); ctx.save(); T.cam(ctx, lerp(1, 1.25, ease.inOut(clamp(lt / 3))), 640, 380); K.tablet(ctx, 640, 380, 640, 330, { seed: 154, worn: true, rows: 6 }); ctx.restore();
    K.fig(ctx, 1090, 700, .7, aux({ t, turn: -.45, prop: 'magnifier', pose: 'magnify', hat: 'none', face: { mouth: 'flat', eyes: 'squint', brows: 'skeptic', look: [-.8, -.2] } }));
    K.tag(ctx, 'worn edges', 300, 160, lt, R('worn') + .5, { size: 24 }); K.tag(ctx, 'big numbers: certain ✓', 640, 600, lt, R('worn') + 2.4, { size: 24, fill: '#d8f0c8' });
    if (lt > R('digit')) { const d = Math.round(Math.sin(t * 6) * 1.5); K.title(ctx, `265 ${d >= 0 ? '+' : '−'} ${Math.abs(d)}`, lt, R('digit'), { y: 130, size: 60, color: '#ffd166' }); K.tag(ctx, 'a digit here or there could be off by one or two', 640, 670, lt, R('digit') + .3, { size: 22 }); } });
  fx('worn', 'paper', .4); fx('digit', 'boing', .4);

  // ================= BEAT 5 =================
  S('healthy', (ctx, lt, dur, t, R) => { V.street(ctx, t, lerp(-40, 40, lt / dur));
    const cx = lerp(-200, 1400, ((t * .06) % 1)); ctx.save(); ctx.translate(cx, 640); sh(ctx, '#8a5a36', 4, c => c.roundRect(-110, -90, 220, 70, 8)); for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * 70, -16); ctx.rotate(t * 3); sh(ctx, '#6b4428', 4, circ(0, 0, 30)); for (let k = 0; k < 4; k++) ln(ctx, [[0, 0], [Math.cos(k * Math.PI / 2) * 28, Math.sin(k * Math.PI / 2) * 28]], 4, '#3a2416'); ctx.restore(); } sh(ctx, '#c9a46a', 3, c => c.roundRect(-90, -130, 70, 44, 8)); sh(ctx, '#c9a46a', 3, c => c.roundRect(-10, -126, 70, 40, 8)); ctx.restore();
    for (let i = 0; i < 7; i++) { const u = ((t * .05 + i / 7) % 1), x = lerp(1400, -150, u); K.mini(ctx, x, 690 - (i % 3) * 20, 1.1, t, { walk: 1, ph: i, dir: -1, carry: i % 2 === 0, cloth: K.CLOTH[i % 8], skin: K.SKINS[i % 6], hair: K.HAIRS[i % 6] }); }
    K.counter(ctx, 640, 110, 265, 265, lt, 0, .1, 'healthy men: keep the place running', { size: 60, color: '#7fd08a' }); });
  mood('healthy', 'busy'); fx('healthy', 'crowd', .3, 0, 5);
  S('workplace', (ctx, lt, dur, t, R) => { V.office(ctx, t, 0); K.fig(ctx, 260, 700, .8, K.cast('clerk', { t, prop: 'stylus', pose: 'present', turn: .4, face: { mouth: 'smile', eyes: 'half' } }));
    K.paper(ctx, 760, 340, 560, 400, { rot: -.01, draw: c => { K.txt(c, 'AN ORDINARY WORKPLACE', 0, -160, K.FONT(700, 28), '#b2342f', 'center'); [['lists of goods supplied', R('goods')], ['requests for payment', R('goods') + 1.2], ['men sent off on errands', R('errands')]].forEach(([s, at], i) => { const a = K.fadeIn(lt, at); c.globalAlpha = a; K.txt(c, '• ' + s, -230, -80 + i * 60, K.FONT(700, 28)); c.globalAlpha = 1; if (a > 0) K.tick(c, 220, -80 + i * 60, 14, lt, at + .3); }); } });
    if (lt > R('errands')) { const u = lt - R('errands'); K.mini(ctx, lerp(-60, 1350, clamp(u / 1.6)), 680, 1.3, t, { walk: 1.6, ph: 2, cloth: '#d97a3a', carry: true }); } });
  fx('goods', 'pop', .5); fx('goods', 'pop', .5, 1.2); fx('errands', 'whoosh', .5);
  S('pay', (ctx, lt, dur, t, R) => { V.fortExt(ctx, t, lerp(0, 40, lt / dur), { march: false }); for (let i = 0; i < 6; i++) { const u = clamp((lt - .3) / 4.5) + i * .03, x = lerp(560, 1400, u); K.mini(ctx, x, 620 + (i % 2) * 8, .75, t, { walk: 1, ph: i, mail: true, helmet: true, spear: true, skin: K.SKINS[i] }); }
    ctx.save(); ctx.translate(lerp(600, 1440, clamp((lt - .3) / 4.5)), 560); sh(ctx, '#c9a46a', 3, c => { c.moveTo(-16, -6); c.quadraticCurveTo(-22, 22, 0, 24); c.quadraticCurveTo(22, 22, 16, -6); c.closePath(); }); K.txt(ctx, '$', 0, 10, K.FONT(700, 14), OUT, 'center'); ctx.restore();
    K.tag(ctx, 'sent off to collect pay', 640, 140, lt, .5, { size: 28 }); K.tag(ctx, 'Tab. Vindol. 154', 640, 200, lt, .9, { size: 18 }); });
  fx('pay', 'clink', .5, .5);
  S('t155', (ctx, lt, dur, t) => { V.street(ctx, t, 0);
    // a smithy: anvil, hammer arc, sparks
    const hk = Math.max(0, Math.sin(t * 6)); sh(ctx, '#4a4a52', 4, c => { c.moveTo(220, 600); c.lineTo(360, 600); c.lineTo(340, 620); c.lineTo(310, 620); c.lineTo(320, 680); c.lineTo(260, 680); c.lineTo(270, 620); c.lineTo(240, 620); c.closePath(); });
    K.fig(ctx, 420, 700, .74, K.cast('tungA', { t, hat: 'none', turn: -.4, pose: { L: [-68, -158], R: [-120 + hk * 20, -240 - hk * 120], hL: 'rest', hR: 'fist', cross: 0, out: false, shrug: 0, bow: 0 }, face: { mouth: 'grit', brows: 'angry', look: [-.7, .4] } }));
    if (hk < .2) { const r = rng(Math.floor(t * 6)); for (let i = 0; i < 10; i++) sh(ctx, '#ffcf5a', 0, circ(290 + (r() - .5) * 120, 590 - r() * 80, 3)); T.glow(ctx, 290, 590, 80, 'rgba(255,200,100,.5)'); }
    // a cobbler on the right
    K.fig(ctx, 900, 700, .74, K.cast('tungC', { t, hat: 'none', turn: .3, pose: 'think', face: { mouth: 'smile', eyes: 'half' } })); K.shoe(ctx, 1010, 600, .7);
    K.counter(ctx, 640, 120, 0, 343, lt, .2, 1.4, 'men assigned to workshops — on a single day', { size: 74 }); K.tag(ctx, 'Tab. Vindol. 155', 640, 260, lt, .8, { size: 18 }); });
  for (let k = 0; k < 400; k++) { const ht = (2 * k + 1) * Math.PI / 6; if (ht > TV.t155 + .2 && ht < TV.thinking - .2) G.EP.sfx.push({ t: ht, type: 'hammer', gain: .3 }); }   // on every strike of the smith's hammer
  // ---------- 48. "shouldn't they be fighting?" → MYTH CARD: a logistics company with swords ----------
  S('thinking', (ctx, lt, dur, t, R) => {
    if (lt < R('logistics')) { V.studio(ctx, t, 0); K.fig(ctx, 420, 700, .92, aux({ t, turn: .35, prop: null, talk: K.vtalk(t), pose: Gd.pose(lt, [[0, 'think'], [R('fighting'), 'pointUp'], [R('sure'), 'shrug']]), face: { mouth: 'smirk', brows: 'skeptic', look: [.7, -.3] } }));
      if (lt > R('fighting')) { const k = K.pop(lt, R('fighting')); ctx.save(); ctx.translate(880, 280); ctx.scale(k, k); sh(ctx, '#fffaf0', 4, c => c.ellipse(0, 0, 250, 150, 0, 0, TAU)); for (const [x, y, r] of [[-200, 150, 22], [-240, 200, 14]]) sh(ctx, '#fffaf0', 4, circ(x, y, r));
        for (let i = 0; i < 5; i++) { const x = -150 + i * 75 + Math.sin(t * 8 + i) * 6; K.mini(ctx, x, 70, 1.1, t, { walk: 1.5, ph: i, mail: true, helmet: true, shield: true, dir: i % 2 ? -1 : 1 }); } K.txt(ctx, 'FIGHTING?', 0, -90, K.DISP(36), '#b2342f', 'center'); ctx.restore(); } return; }
    K.mythCard(ctx, lt - R('logistics'), t, { myth: 'Roman soldiers spent their days fighting', lines: [['Day to day, a frontier army is', .3], ['a giant logistics company with swords.', .7, '#b2342f'], ['Food has to come in. Boots wear out. Tents rip.', R('food') - R('logistics')]], stamp: 'BUSTED', stampAt: 1.2, theoLook: { outfit: 'auxiliary' },
      draw: (c, u) => { for (let i = 0; i < 4; i++) { const k = K.pop(u, 1.5 + i * .15); if (k <= 0) continue; c.save(); c.translate(-300 + i * 110, 150); c.scale(k, k); sh(c, '#c9a46a', 3, cc => cc.roundRect(-40, -34, 80, 60, 6)); ln(c, [[-40, -10], [40, -10]], 3, '#8a5a3a'); c.restore(); } } }); });
  fx('fighting', 'whoosh', .5); fx('sure', 'clink', .4); fx('logistics', 'paper', .6); fx('logistics', 'stamp', .9, 1.2); mood('thinking', 'comic');
  // ---------- 49. boots wear out, tents rip, supplies run short → write to the boss ----------
  S('tents', (ctx, lt, dur, t, R) => { V.street(ctx, t, 0);
    if (t < 354.93) { sh(ctx, '#d9c9a0', 4, c => { c.moveTo(380, 690); c.lineTo(640, 420); c.lineTo(900, 690); c.closePath(); }); const rip = K.fadeIn(t, 353.8, .2); if (rip > 0) { ctx.save(); ctx.translate(640, 560); for (let i = 0; i < 5; i++) ln(ctx, [[-20 + i * 8, -60 + i * 22], [8 - i * 6, -40 + i * 22]], 4); sh(ctx, '#2a1d16', 3, c => { c.moveTo(-10, -70); c.lineTo(14, -20); c.lineTo(-6, 30); c.lineTo(10, 80); c.lineTo(-20, 20); c.lineTo(-2, -20); c.closePath(); }); ctx.restore(); }
      K.fig(ctx, 1000, 700, .8, K.cast('tungB', { t, hat: 'none', turn: -.4, pose: 'facepalm', face: { mouth: 'frown', brows: 'worried' } })); K.tag(ctx, 'tents rip', 640, 140, t, 353.63, { size: 30 }); return; }
    if (t < 356.37) { sh(ctx, '#7a5233', 4, c => c.rect(300, 380, 680, 300)); for (let s = 0; s < 3; s++) sh(ctx, '#5a3a22', 3, c => c.rect(310, 440 + s * 80, 660, 12)); K.title(ctx, 'SUPPLIES: SHORT', t, 354.93, { y: 140, size: 54, color: '#ffb36a' }); return; }
    K.fig(ctx, 640, 700, .9, K.cast('clerk', { t, prop: 'stylus', turn: .2, pose: 'present', face: { mouth: 'flat', brows: 'worried', look: [.4, .4] } })); K.tablet(ctx, 840, 520, 200, 110, { seed: 77, reveal: clamp((t - 356.4) / 1.6) }); K.tag(ctx, 'TO: THE BOSS', 840, 420, t, 356.9, { size: 24 }); });
  S('food', (ctx, lt, dur, t) => { V.street(ctx, t, 0); const k = K.pop(lt, .1); ctx.save(); ctx.translate(640, 520); ctx.scale(k, k); for (let i = 0; i < 6; i++) sh(ctx, ['#c9a46a', '#d9b06a', '#b98a4e'][i % 3], 3, c => c.roundRect(-180 + (i % 3) * 120, -40 - Math.floor(i / 3) * 80, 110, 76, 10)); ctx.restore();
    if (t > 352.35) { const u = t - 352.35; ctx.save(); ctx.translate(1050, 560); K.shoe(ctx, 0, 0, 1.4); ctx.rotate(Math.sin(u * 12) * .3); sh(ctx, '#3a2416', 3, c => c.ellipse(20, 20, 50, 10, 0, 0, TAU)); ctx.restore(); K.tag(ctx, 'boots wear out', 1050, 440, t, 352.4, { size: 24 }); }
    K.tag(ctx, 'food has to come in', 640, 140, lt, .2, { size: 30 }); });
  fx('food', 'thud', .5, .1); fx('food', 'boing', .5, 1.5); fx('tents', 'whoosh', .4, .2); fx('short', 'boing', .5); fx('writeboss', 'scratch', .6, .1, 1.6);
  // ---------- 50. which brings us to Masclus ----------
  S('masclus', (ctx, lt, dur, t) => { V.outpost(ctx, t, 0, { rain: .3 }); K.fig(ctx, 640, 700, 1.05, K.cast('masclus', { t, pose: Gd.pose(lt, [[0, 'idle'], [.6, 'hips']]), face: { mouth: 'smile', brows: 'sly', look: [.2, 0] }, light: K.LIGHT.grey, hair: Gd.hairRing(lt, .3) }));
    K.title(ctx, 'MASCLUS', lt, .2, { y: 110, size: 76 }); K.tag(ctx, '(MASK-lus) · decurion, a cavalry officer', 640, 180, lt, .5, { size: 22 }); });
  fx('masclus', 'ding', .6, .2); mood('masclus', 'comic');
})(window);
