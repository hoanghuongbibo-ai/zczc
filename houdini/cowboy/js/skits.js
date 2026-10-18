/* The dialogue scenes, re-choreographed. Rules from the user:
 *   - polished acting: camera coverage that eases onto whoever speaks (EP.cover), listeners react, walk-ins with a gait;
 *   - the RIGHT hand stays still (handled in Guide.act: only the other arm gestures);
 *   - the dialogue follows the speech: a bubble shows ONLY the words that character is saying right now, appears when the
 *     line starts, reveals word by word as it is spoken, points at the speaker, and is gone when the line ends (EP.speech).
 * EP.R(key, fn) replaces the shot registered on that anchor in ep0–ep4. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, P = G.Paint, K = G.VK, CS = G.CS, CK = G.CK, B = G.Beasts, TV = G.TV, { W, H, clamp, lerp, ease, rng } = T;
  const { OUT, sh, ln, circ } = P, TAU = Math.PI * 2, EP = G.EP, { cast, fig, theo } = EP;
  const say = Gd.say, TC = o => Object.assign({ outfit: 'cowTheo', hat: 'stetson', light: K.LIGHT.warm }, o);
  EP.R = (key, fn, off = 0) => { const tt = Math.max(0, TV[key] + off), s = EP.shots.find(x => Math.abs(x.t - tt) < 1e-6); if (s) s.fn = fn; else EP.shots.push({ t: tt, fn }); };
  EP.cover = (ctx, lt, keys, d = .55) => { let A = keys[0], Bk = keys[0], k = 1; for (let i = 0; i < keys.length; i++) if (lt >= keys[i][0]) { A = i ? keys[i - 1] : keys[i]; Bk = keys[i]; k = clamp((lt - keys[i][0]) / d); }
    const e = ease.inOut(k), z = lerp(A[1], Bk[1], e); let fx_ = lerp(A[2], Bk[2], e), fy = lerp(A[3], Bk[3], e);
    fx_ = clamp(fx_, 640 / z, W - 640 / z); fy = clamp(fy, 360 / z, H - 360 / z); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-fx_, -fy); };
  const R_ = EP.R, cover = EP.cover;
  const walkIn = (lt, t0, d, x0, x1) => { const k = clamp((lt - t0) / d); return { x: lerp(x0, x1, ease.inOut(k)), walking: k > 0 && k < 1, bob: k > 0 && k < 1 ? Math.abs(Math.sin((lt - t0) * 8)) * -6 : 0, k }; };

  // ---------- speech bubbles that follow the voice ----------
  const marks = {};
  // remember where a speaker's mouth is on screen (call inside the camera transform, right after drawing the figure)
  EP.mark = (ctx, who, x, y, s, dy = 400) => { marks[who] = ctx.getTransform().transformPoint(new DOMPoint(x, y - dy * s)); };
  // end of a line = last voiced frame before `limit`
  const lineEnd = (from, limit) => { const V = G.VIS; if (!V) return limit; for (let i = Math.floor(limit * V.fps); i > from * V.fps; i--) if (V.o[i] > .12) return i / V.fps + .1; return limit; };
  const ends = {};
  EP.speech = (ctx, who, text, from, limit, t, o = {}) => {
    const key = from + ':' + limit, end = ends[key] ?? (ends[key] = lineEnd(from, limit));
    if (t < from - .05 || t > end + .3) return;
    const pin = marks[who]; if (!pin) return; const p = ctx.getTransform().inverse().transformPoint(pin);
    const words = text.split(' '), shown = Math.min(words.length, Math.ceil(words.length * clamp((t - from) / Math.max(.3, (end - from) * .9)) + .001));
    const pop = FX.settle(clamp((t - from + .05) / .22)), out = clamp((t - end) / .3), size = o.size || 28;
    ctx.save(); ctx.font = `700 ${size}px Fredoka, sans-serif`; const said = words.slice(0, shown).join(' '), wf = ctx.measureText(text).width + 46, h = size * 1.9;
    // the box is placed for the whole line but only grows as wide as the words spoken so far
    const bx = clamp(o.x ?? p.x, wf / 2 + 24, W - wf / 2 - 24), by = clamp(o.y ?? (p.y - 150), h / 2 + 40, H - 120);
    const w0 = Math.max(h * 1.6, ctx.measureText(said).width + 46), w = Math.min(wf, w0), cx = clamp(p.x - bx, -wf / 2 + w / 2, wf / 2 - w / 2);
    ctx.globalAlpha = 1 - out; ctx.translate(bx + cx, by); ctx.scale(pop, pop);
    const px = p.x - bx - cx, tx = clamp(px, -w / 2 + 30, w / 2 - 30), tipX = clamp(px, -w, w), tipY = Math.min(Math.max(p.y - by - 40, h / 2 + 18), h / 2 + 70);
    sh(ctx, '#fffaf0', 3.5, c => { c.roundRect(-w / 2, -h / 2, w, h, h / 2); c.moveTo(tx - 14, h / 2 - 2); c.lineTo(tipX * .6 + tx * .4, tipY); c.lineTo(tx + 14, h / 2 - 2); });
    ctx.fillStyle = '#fffaf0'; ctx.fillRect(tx - 12, h / 2 - 6, 24, 6);
    ctx.font = `700 ${size}px Fredoka, sans-serif`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = OUT; ctx.fillText(said, -w / 2 + 23, 1);
    ctx.restore();
  };
  // narrator lines shown as a caption strip (only while spoken)
  EP.caption = (ctx, text, from, limit, t) => { const key = 'c' + from + ':' + limit, end = ends[key] ?? (ends[key] = lineEnd(from, limit)); if (t < from - .05 || t > end + .3) return;
    const a = clamp((t - from + .05) / .2) * (1 - clamp((t - end) / .3)); ctx.save(); ctx.globalAlpha = a; K.tag(ctx, text, 640, 640, 1, 0, { size: 26 }); ctx.restore(); };
  const sp = EP.speech, cap = EP.caption, GX1 = 320, GX2 = 960, GY = 650;

  // ---------------- COLD OPEN ----------------
  R_('action', (ctx, lt, dur, t, R) => {
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 360], [.2, 1.18, 880, 460], [R('action') - .05, 1.0, 640, 360]], .45); CS.movieSet(ctx, t, 0, { crew: true });
    CS.longShadow(ctx, GX1, GY, 34); CS.longShadow(ctx, GX2, GY, 34);
    fig(ctx, 'gun1', GX1, GY, .62, { t, pose: 'idle', turn: .6, face: { mouth: 'flat', look: [.6, 0] } }); fig(ctx, 'gun2', GX2, GY, .62, { t: t + 1, pose: 'idle', turn: -.6, face: { mouth: 'flat' } });
    const up = lt > R('action') - .3 ? Math.sin(clamp((lt - R('action') + .3) / .5) * Math.PI) * 18 : 0;
    CS.longShadow(ctx, 1040, 760, 44, 200);
    fig(ctx, 'director', 1040, 760 - up, .78, { t, pose: 'present', turn: -.3, face: { mouth: 'open', brows: 'up', eyes: lt > R('action') ? 'happy' : 'open' }, vis: say(t, 0, TV.town - .1) }); EP.mark(ctx, 'dir', 1040, 760 - up, .78);
    ctx.restore();
    const ck = clamp((lt - R('action') + .12) / .12); EP.clapper(ctx, 420, 380 + Math.max(0, 1 - lt / .3) * 300 + (lt > R('action') + .4 ? (lt - R('action') - .4) * 900 : 0), .9, ck, t);
    sp(ctx, 'dir', 'Aaand… ACTION!', 0, TV.town, t, { size: 32 }); EP.filmLook(ctx, t);
  });

  R_('town', (ctx, lt, dur, t, R) => {
    const d1 = R('draw');
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 400], [.35, 1.6, GX1 + 60, 440], [d1 - .15, 1.6, GX2 - 60, 440], [dur - .5, 1.15, 640, 430]], .5); CS.movieSet(ctx, t, 0, { tph: .2 });
    CS.longShadow(ctx, GX1, GY, 34); CS.longShadow(ctx, GX2, GY, 34);
    const v1 = say(t, TV.town, TV.draw - .1), v2 = say(t, TV.draw, TV.excuse);
    fig(ctx, 'gun1', GX1, GY, .62, { t, pose: 'idle', turn: .7, vis: v1, face: { mouth: 'flat', brows: 'angry', eyes: 'squint', look: [.8, 0] } }); EP.mark(ctx, 'g1', GX1, GY, .62);
    fig(ctx, 'gun2', GX2, GY, .62, { t: t + 1, pose: lt > d1 - .3 ? 'hips' : 'idle', turn: -.7, vis: v2, face: { mouth: 'flat', brows: 'angry', eyes: lt < d1 && lt > 1.6 ? 'half' : 'squint', look: [-.8, 0] } }); EP.mark(ctx, 'g2', GX2, GY, .62);
    const u = (lt - .6) / 3.2; if (u > 0 && u < 1) B.tumbleweed(ctx, lerp(-60, 1340, u), 690 - Math.abs(Math.sin(u * 16)) * 36, 30, t * 6);
    ctx.restore();
    sp(ctx, 'g1', 'This town ain\'t big enough for the both of us.', TV.town, TV.draw, t); sp(ctx, 'g2', 'Then draw, partner.', TV.draw, TV.excuse, t, { size: 30 });
    EP.filmLook(ctx, t);
  });

  R_('excuse', (ctx, lt, dur, t, R) => {
    const w = walkIn(lt, 0, 2.2, -100, 640);
    ctx.save(); cover(ctx, lt, [[0, 1.1, 640, 470], [2.1, 1.5, 640, 470], [R('lost') - .1, 1.12, 640, 450], [R('lost') + 2.2, 1.35, 640, 460]], .6); CS.movieSet(ctx, t, 0, { tph: .5 });
    const vC = say(t, TV.excuse, TV.cut), look1 = clamp((w.x - GX1) / 300) * .9, react = lt > R('lost') + .6;
    CS.longShadow(ctx, GX1, GY, 34); CS.longShadow(ctx, GX2, GY, 34); CS.longShadow(ctx, w.x, 660, 32);
    fig(ctx, 'gun1', GX1, GY, .62, { t, pose: react ? 'crossed' : 'hips', turn: .5, listen: vC, face: { mouth: react ? 'smirk' : 'o', brows: 'skeptic', eyes: react ? 'half' : 'open', look: [look1, .1] } });
    fig(ctx, 'gun2', GX2, GY, .62, { t: t + 1, pose: lt > R('lost') + 1.4 ? 'facepalm' : 'hips', turn: -.5, listen: vC, face: { mouth: lt > R('lost') + 1.4 ? 'frown' : 'flat', brows: 'worried', eyes: lt > R('lost') + 1.4 ? 'closed' : 'open', look: [-.6, .1] } });
    CK.puff(ctx, w.x - 30, 650, (lt * 2) % 1, w.walking ? .5 : 0, 46);
    fig(ctx, 'cowhand', w.x, 660 + w.bob, .6, { t, walk: w.walking ? t * 8 : null, turn: w.walking ? .6 : 0, pose: w.walking ? 'idle' : 'shrug', vis: vC, face: { mouth: 'smile', brows: 'worried' } }); EP.mark(ctx, 'ch', w.x, 660 + w.bob, .6);
    CK.stink(ctx, w.x + 60, 360, t, .8);
    ctx.restore();
    sp(ctx, 'ch', '\'Scuse me.', TV.excuse, TV.cows, t, { size: 30 }); sp(ctx, 'ch', 'Has anybody seen about two thousand cows?', TV.cows, TV.lost, t); sp(ctx, 'ch', 'I lost \'em in a thunderstorm last night.', TV.lost, TV.cut, t);
    EP.filmLook(ctx, t);
  });

  R_('cut', (ctx, lt, dur, t, R) => {
    const sk = Math.max(0, 1 - lt / .5) * 10, jump = Math.sin(clamp(lt / .45) * Math.PI) * 40;
    ctx.save(); ctx.translate(Math.sin(lt * 60) * sk, 0); cover(ctx, lt, [[0, 1.0, 640, 360], [.2, 1.12, 560, 400], [R('wholet') - .1, 1.2, 640, 380]], .5);
    ctx.save(); ctx.filter = 'blur(3px)'; CS.movieSet(ctx, t, 0, { tumble: false }); ctx.restore();
    fig(ctx, 'cowhand', 860, 560, .4, { t, pose: lt > R('wholet') ? 'shrug' : 'wave', face: { mouth: 'grin', brows: 'up' }, light: false });
    fig(ctx, 'director', 520, 800 - jump, 1.0, { t, pose: 'pointSide', turn: .25, lean: .06, face: { mouth: 'shock', brows: 'angry', eyes: 'wide' }, vis: say(t, TV.cut, TV.know) }); EP.mark(ctx, 'dir', 520, 800 - jump, 1.0);
    ctx.restore();
    K.title(ctx, 'CUT!', lt, 0, { y: 120, size: 110, color: '#e8433a' }); sp(ctx, 'dir', 'Who let the extra in?', TV.wholet, TV.know, t, { size: 30, x: 900 });
    EP.filmLook(ctx, t);
  });

  R_('cut2', (ctx, lt, dur, t, R) => {
    const w = walkIn(lt, 0, .9, 1500, 1010), vD = say(t, TV.cut2, TV.getto - .05), vT = say(t, TV.getto, TV.trail);
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 380], [1.0, 1.35, 900, 440], [R('getto') - .15, 1.35, 380, 450]], .55); CS.prairie(ctx, t, 0, { v: 'day', seed: 7 });
    [['vet', 190, 'crossed', { mouth: 'flat', brows: 'skeptic' }], ['vaquero', 340, 'idle', { mouth: 'smirk', brows: 'skeptic' }], ['freed', 490, 'hips', { mouth: 'flat', brows: 'up' }], ['freed2', 640, 'shrug', { mouth: 'flat', brows: 'skeptic' }]]
      .forEach(([n, x, p, f], i) => fig(ctx, n, x, 660, .52, { t: t + i, pose: lt > .8 + i * .2 ? p : 'idle', turn: .55, listen: vD, face: Object.assign({ look: [.9, 0] }, f) }));
    fig(ctx, 'director', w.x, 760 + w.bob, .92, { t, walk: w.walking ? t * 9 : null, pose: 'pointSideL', turn: -.35, vis: vD, face: { mouth: 'shock', brows: 'angry', eyes: 'wide' } }); EP.mark(ctx, 'dir', w.x, 760 + w.bob, .92);
    if (lt > R('getto') - .4) { const k = clamp((lt - R('getto') + .4) / .4), x = lerp(-120, 150, ease.out(k)); theo(ctx, x, 760, .72, { t, pose: 'presentBoth', turn: .5, vis: vT, face: { mouth: 'smirk', eyes: 'half', brows: 'skeptic' } }); EP.mark(ctx, 'theo', x, 760, .72); }
    ctx.restore();
    K.title(ctx, 'CUT!', lt, 0, { y: 100, size: 90, color: '#e8433a' });
    sp(ctx, 'dir', 'None of my cowboys look like that.', TV.mycowboys, TV.getto, t); sp(ctx, 'theo', 'Yeah. We\'ll get to why.', TV.getto, TV.trail, t);
    EP.filmLook(ctx, t, .6);
  });

  R_('coffee', (ctx, lt, dur, t, R) => {
    const vC = say(t, TV.coffee, TV.couldi - .05) || say(t, TV.menu, TV.morning), vT = say(t, TV.couldi, TV.menu - .05), slump = lt > R('menu') + 2.2;
    ctx.save(); cover(ctx, lt, [[0, 1.0, 640, 400], [.15, 1.4, 820, 400], [R('couldi') - .1, 1.4, 430, 410], [R('menu') - .1, 1.4, 820, 400], [R('menu') + 2.1, 1.1, 640, 400]], .5);
    CS.camp(ctx, t, 0, { v: 'dawn', wagon: true });
    fig(ctx, 'cook', 860, 720, .86, { t, prop: lt < R('couldi') ? 'coffee' : 'ladle', pose: lt < R('complaints') ? 'present' : lt < R('menu') ? 'crossed' : 'present', turn: -.35, light: K.LIGHT.dusk, vis: vC, listen: vT,
      face: { mouth: lt > R('complaints') ? 'smirk' : 'flat', brows: 'skeptic', eyes: lt > R('complaints') && lt < R('menu') ? 'half' : 'open', look: [-.7, 0] } }); EP.mark(ctx, 'cook', 860, 720, .86);
    theo(ctx, 400, 720, .82, TC({ t, prop: 'plate', pose: slump ? 'shrug' : 'present', turn: .35, light: K.LIGHT.dusk, vis: vT, listen: vC, lean: slump ? .06 : 0,
      face: lt > R('menu') + .4 ? { mouth: 'frown', brows: 'worried', eyes: 'half', look: [.7, .2] } : { mouth: 'smile', brows: 'up', look: [.7, 0] } })); EP.mark(ctx, 'theo', 400, 720, .82);
    ctx.restore();
    sp(ctx, 'cook', 'Coffee\'s on.', TV.coffee, TV.beanson, t, { size: 30 }); sp(ctx, 'cook', 'Beans are on.', TV.beanson, TV.complaints, t, { size: 30 }); sp(ctx, 'cook', 'Complaints are off.', TV.complaints, TV.couldi, t, { size: 30 });
    sp(ctx, 'theo', 'Could I maybe get—', TV.couldi, TV.menu, t, { size: 30 });
    sp(ctx, 'cook', 'You want a menu?', TV.menu, TV.kc, t, { size: 30 }); sp(ctx, 'cook', 'Go to Kansas City.', TV.kc, TV.morning, t, { size: 30 });
  });

  R_('robbers', (ctx, lt, dur, t, R) => {
    const vD = say(t, TV.robbers, TV.no - .05), st = lt > R('gary') + 1 ? clamp((lt - R('gary') - 1) / .5) : 0;
    ctx.save(); cover(ctx, lt, [[0, 1.35, 300, 450], [R('no') - .1, 1.0, 640, 380], [R('gary') + .6, 1.4, 820, 480]], .6); CS.prairie(ctx, t, 0, { v: 'day', seed: 13 });
    B.steed(ctx, 800, 690, .95, t, { gait: st > 0 ? 'stand' : 'walk', coat: '#b07a4a', stumble: st > 0 ? Math.sin(st * Math.PI) * .9 : 0, rider: cast('gary', { light: { cast: 0, contact: 0 }, pose: st > 0 ? 'cheer' : 'idle', face: st > 0 ? { mouth: 'shock', eyes: 'wide', brows: 'worried' } : { mouth: 'smile', eyes: 'half' } }) });
    if (st > 0) { sh(ctx, '#5a4030', 3, c => c.ellipse(900, 700, 40, 10, 0, 0, TAU)); CK.puff(ctx, 890, 680, st, .7, 70); }
    const dy = 780 - (lt < .5 ? Math.sin(lt / .5 * Math.PI) * 20 : 0);
    fig(ctx, 'director', 230, dy, .82, { t, prop: 'megaphone', pose: lt < R('no') ? 'present' : 'shrug', turn: .3, vis: vD,
      face: lt < R('no') ? { mouth: 'grin', brows: 'up', eyes: 'wide' } : lt < R('gary') + 1.2 ? { mouth: 'flat', brows: 'skeptic', eyes: 'half', look: [.9, 0] } : { mouth: 'shock', brows: 'worried', eyes: 'wide', look: [.9, .2] } }); EP.mark(ctx, 'dir', 230, dy, .82);
    CS.foreground(ctx, t, 0); ctx.restore();
    sp(ctx, 'dir', 'Is this where the bank robbers show up?', TV.robbers, TV.no, t);
    cap(ctx, 'No. This is where Gary\'s horse steps in a hole.', TV.no, TV.afternoon, t);
  });

  R_('song', (ctx, lt, dur, t, R) => {
    CS.prairie(ctx, t, 0, { v: 'night', seed: 15 }); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(80,90,140,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    B.face(ctx, 820, 470, .9, t, { mood: 'meh', coat: 2, look: -1 });
    theo(ctx, 240, 760, .7, TC({ t, pose: 'present', turn: .5, light: K.LIGHT.night, face: { mouth: 'o', eyes: 'closed', brows: 'up' }, vis: say(t, TV.song, TV.nobody) })); EP.mark(ctx, 'theo', 240, 760, .7); CK.notes(ctx, 300, 340, t, 1, 4);
    sp(ctx, 'theo', 'Ohhh, please don\'t stampede…', TV.song, TV.nobody, t, { size: 28 });
  });

  R_('fine', (ctx, lt, dur, t, R) => {
    const vD = say(t, TV.fine, TV.check - .1), hype = lt > R('towns') - .2;
    ctx.save(); cover(ctx, lt, [[0, 1.35, 640, 450], [R('towns') - .2, 1.0, 640, 380], [R('shootouts') - .1, 1.25, 640, 430]], .6); CS.cowtown(ctx, t, 0, { v: 'night' });
    const y = 780 - (hype ? Math.abs(Math.sin((lt - R('towns')) * 5)) * 10 : 0);
    fig(ctx, 'director', 640, y, 1.0, { t, prop: 'megaphone', pose: hype ? 'present' : 'facepalm', turn: .1, light: K.LIGHT.night, vis: vD, face: hype ? { mouth: 'grin', eyes: 'wide', brows: 'up' } : { mouth: 'frown', eyes: 'closed', brows: 'worried' } }); EP.mark(ctx, 'dir', 640, y, 1.0);
    ctx.restore();
    sp(ctx, 'dir', 'Fine. FINE.', TV.fine, TV.towns, t, { size: 32 }); sp(ctx, 'dir', 'But the cow towns. Abilene. Dodge City.', TV.towns, TV.shootouts, t); sp(ctx, 'dir', 'Those were shootouts every night!', TV.shootouts, TV.check, t, { size: 30 });
    EP.filmLook(ctx, t, .5);
  });

  R_('buffalo', (ctx, lt, dur, t, R) => {
    const vN = say(t, TV.buffalo, TV.reportedly2 - .05) || say(t, TV.newspaper, TV.didnt - .05), vT = say(t, TV.reportedly2, TV.newspaper - .05) || say(t, TV.didnt, TV.strangest);
    ctx.save(); cover(ctx, lt, [[0, 1.3, 460, 460], [R('reportedly2') - .1, 1.45, 1050, 500], [R('newspaper') - .1, 1.3, 460, 460], [R('didnt') - .1, 1.45, 1050, 500]], .45);
    CS.prairie(ctx, t, 0, { v: 'day', seed: 21 });
    for (let i = 0; i < 11; i++) { const x = 760 + (i % 4) * 120 + Math.floor(i / 4) * 40 + Math.sin(t * 2 + i) * 4, y = 560 + Math.floor(i / 4) * 50; ctx.save(); ctx.translate(x, y); ctx.scale(.42, .42); sh(ctx, '#5a3a24', 4, c => c.ellipse(0, -90, 110, 60, 0, 0, TAU)); sh(ctx, '#3e2616', 4, c => c.ellipse(80, -110, 60, 70, 0, 0, TAU)); sh(ctx, '#3e2616', 3, c => c.ellipse(100, -70, 30, 30, 0, 0, TAU)); for (const lx of [-60, -30, 40, 70]) ln(ctx, [[lx, -40], [lx, 0]], 14, '#3e2616'); ctx.restore(); ctx.save(); ctx.strokeStyle = '#c9a868'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(430, 360); ctx.quadraticCurveTo((430 + x) / 2, 290 + Math.sin(t * 3 + i) * 10, x + 30, y - 60); ctx.stroke(); ctx.restore(); }
    B.steed(ctx, 400, 690, .95, t, { gait: 'stand', coat: '#d8c4a0', paint: true, rider: cast('natlove', { light: { cast: 0, contact: 0 }, prop: lt > R('newspaper') ? 'newspaper' : 'lasso', pose: 'cheer', vis: vN, face: { mouth: 'grin', eyes: 'happy', brows: 'up' } }) }); EP.mark(ctx, 'nat', 392, 690 - 140 * .95 + 150 * .38, .38);
    theo(ctx, 1110, 780, .62, { t, pose: lt > R('didnt') ? 'shrug' : 'crossed', turn: -.4, vis: vT, listen: vN, face: lt > R('didnt') ? { mouth: 'grin', eyes: 'half', blush: 1 } : { mouth: 'flat', brows: 'skeptic', eyes: 'half', look: [-.8, 0] } }); EP.mark(ctx, 'theo', 1110, 780, .62);
    ctx.restore();
    sp(ctx, 'nat', 'And then I roped eleven buffalo with one hand—', TV.buffalo, TV.reportedly2, t); sp(ctx, 'theo', 'Reportedly.', TV.reportedly2, TV.newspaper, t, { size: 30 });
    sp(ctx, 'nat', '—while reading a newspaper.', TV.newspaper, TV.didnt, t); sp(ctx, 'theo', 'That part he didn\'t say.', TV.didnt, TV.madeup, t); sp(ctx, 'theo', 'I made that up.', TV.madeup, TV.strangest, t, { size: 30 });
  });

  R_('lasttake', (ctx, lt, dur, t, R) => {
    const vD = say(t, TV.lasttake, TV.walkcows - .05) || say(t, TV.worst, TV.thejob - .05), vC = say(t, TV.walkcows, TV.worst - .05) || say(t, TV.thejob, TV.leaves);
    ctx.save(); cover(ctx, lt, [[0, 1.35, 980, 430], [R('walkcows') - .1, 1.4, 540, 420], [R('worst') - .1, 1.4, 980, 430], [R('thejob') - .1, 1.45, 540, 420]], .5);
    CS.movieSet(ctx, t, 0, { crew: true, tumble: false }); CS.longShadow(ctx, 520, 700, 40); CS.longShadow(ctx, 1000, 760, 44, 200);
    fig(ctx, 'cowhand', 520, 700, .8, { t, pose: lt > R('thejob') ? 'shrug' : 'present', turn: .45, vis: vC, listen: vD, face: lt > R('thejob') ? { mouth: 'smile', eyes: 'half', brows: 'up' } : { mouth: 'smile', brows: 'up', look: [.8, 0] } }); EP.mark(ctx, 'ch', 520, 700, .8);
    fig(ctx, 'director', 1000, 760, .86, { t, prop: 'megaphone', pose: lt > R('worst') ? 'facepalm' : lt > R('walkcows') ? 'crossed' : 'present', turn: -.4, vis: vD, listen: vC,
      face: lt > R('worst') ? { mouth: 'frown', brows: 'worried', eyes: 'closed' } : lt > R('singcows') ? { mouth: 'frown', brows: 'skeptic', eyes: 'half', look: [-.8, 0] } : { mouth: 'open', brows: 'up', look: [-.8, 0] } }); EP.mark(ctx, 'dir', 1000, 760, .86);
    ctx.restore();
    sp(ctx, 'dir', 'Okay, okay. Last take.', TV.lasttake, TV.whatdoes, t); sp(ctx, 'dir', 'What does the real cowboy do?', TV.whatdoes, TV.walkcows, t);
    sp(ctx, 'ch', 'Walk cows.', TV.walkcows, TV.eatbeans, t, { size: 30 }); sp(ctx, 'ch', 'Eat beans.', TV.eatbeans, TV.singcows, t, { size: 30 }); sp(ctx, 'ch', 'Sing to the cows.', TV.singcows, TV.dontdrown, t, { size: 30 }); sp(ctx, 'ch', 'Don\'t drown.', TV.dontdrown, TV.worst, t, { size: 30 });
    sp(ctx, 'dir', '…That\'s the worst movie I\'ve ever heard.', TV.worst, TV.thejob, t); sp(ctx, 'ch', 'That\'s the job.', TV.thejob, TV.leaves, t, { size: 32 });
    CK.filmFrame(ctx, t, 1);
  });
})(window);
