/* Canada — Cold open (0–92 s): Buster Brown scouts the US in 1921; Defence Scheme No. 1; the invasion counter runs the other way;
 * the question; the pattern: a table and a deal; who wasn't invited; title. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, { clamp, lerp, ease, INK } = C, k01 = S.k01;
  const a = (ph) => F.at(ph, 0);
  const A = { start: 0, officer: a('a canadian army officer'), buster: a('his friends call him'), driving: a('is driving around'), checking: a("he's checking roads"), bridges: a('bridges'), rail: a('rail lines'), plan: a('because buster has'),
    scheme: a('defence scheme no'), war: a('and it says that if war'), wait: a('canada should not wait'), first: a('canada should invade first'), seattle: a('seattle'), falls: a('great falls'), minn: a('minneapolis'), albany: a('albany'),
    grab: a('grab them fast'), britain: a('then fall back'), thinking: a("now i know what you're"), furniture: a('the country famous'), thing: a("but here's the thing"), nervous: a('canadians had very good'), invaded: a('americans had invaded them'),
    twice: a('twice'), plenty: a('and plenty of americans'), howdid: a('so how did a cold'), next: a('right next to the most'), second: a('end up as the second'), swallowed: a('and never get swallowed'), answer: a("the answer isn't"),
    pattern: a("it's a pattern"), everytime: a('every time canada was'), table: a('somebody sat down'), nobody: a('nobody loved'), everybody: a('everybody signed'), real: a('and the real story'), wasnt: a("who wasn't invited"), title: a('this is the entire') };
  // Buster: paper-cut officer in a slightly-too-new civilian suit, with a (fake) moustache
  const BUSTER = { coat: '#6a6a5a', pants: '#5a5a4a', hat: 'bowler', hatCol: '#3a3228', mustache: '#3a2a1e', tie: '#a8322a', collar: '#fbf8f0', skin: '#f0c8a0', seed: 21 };
  function road(ctx, t, lt, o = {}) { C.bg(ctx, 'sky'); C.sun(ctx, 1060, 140, 50); C.cloud(ctx, 300 + lt * 4, 120, 1.1); C.cloud(ctx, 820 - lt * 3, 90, .8); C.hills(ctx, 360, ['#9cb27a', '#7f9a5a'], 3, 70); for (let i = 0; i < 9; i++) C.pine(ctx, 80 + i * 150 + (i % 2) * 40, 420 + (i % 3) * 8, .7, '#3a6a44');
    C.pc(ctx, '#c9a978', c => { c.moveTo(-100, 560); c.lineTo(1400, 560); c.lineTo(1400, 760); c.lineTo(-100, 760); c.closePath(); }); ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#a8865a'; for (let i = 0; i < 30; i++) ctx.fillRect((i * 97 + lt * 200) % 1500 - 100, 600 + (i % 4) * 30, 40, 4); ctx.restore(); }
  function sign(ctx, x, y, s) { C.pc(ctx, '#7a5432', c => { c.rect(x - 60 * s, y - 160 * s, 14 * s, 160 * s); c.rect(x + 46 * s, y - 160 * s, 14 * s, 160 * s); }); ctx.save(); ctx.translate(x, y - 200 * s); ctx.rotate(-.03); C.shadow(ctx, true, 6, .35); ctx.fillStyle = '#f4efe2'; ctx.fillRect(-150 * s, -60 * s, 300 * s, 120 * s); C.shadow(ctx, false); C.flagUS(ctx, -136 * s, -48 * s, 60 * s, 34 * s); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = `700 ${20 * s}px Fredoka, sans-serif`; ctx.fillText('WELCOME TO THE', 30 * s, -22 * s); ctx.font = `900 ${32 * s}px Anton`; ctx.fillText('UNITED STATES', 30 * s, 16 * s); ctx.font = `700 ${14 * s}px Fredoka, sans-serif`; ctx.fillText('drive carefully', 30 * s, 44 * s); ctx.restore(); }
  const driver = t => cc => { cc.save(); cc.beginPath(); cc.rect(-50, -150, 140, 56); cc.clip(); C.fig(cc, 10, 90, .5, t, Object.assign({}, BUSTER, { pose: 'sit' })); cc.restore(); };
  // 1. 1921: a dusty car rolls past the WELCOME sign; date tag
  function sRoad(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.05, x: 40 }, { z: 1.15, x: -60, y: -20 }); road(ctx, t, lt); sign(ctx, 900 - lt * 10, 560, 1); const cx = lerp(1500, 360, ease.out(clamp(lt / 4))); C.car(ctx, cx, 640, .9, t, { col: '#2f3a2a', flip: true, driver: driver(t) });
      for (let i = 0; i < 6; i++) { const ph = (C.step(t) * 1.2 + i / 6) % 1; C.pc(ctx, `rgba(200,170,120,${.5 * (1 - ph)})`, c => c.arc(cx + 170 + ph * 160, 600 - ph * 40, 14 + ph * 30, 0, 7), false); } ctx.restore();
    S.date(ctx, '1921', k01(t, .2)); C.finish(ctx, t); }
  // 2. the officer: a pinned photo of Canadian officers, a name card and the nickname scrawled
  function sOfficer(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.12, x: 30 }); S.board(ctx, 'kraft', 3);
      C.photo(ctx, 'james-buster-sutherland-brown', 560, 330, 620, 441, { filter: 'sepia', rot: -.04, tape: true, seed: 9 });
      C.label(ctx, 'Lt.-Col. James Sutherland Brown', 560, 600, 28, { rot: .02 }); C.label(ctx, 'Canadian Army · Director of Military Operations', 560, 650, 18, { rot: -.01 });
      ctx.save(); ctx.translate(1050, 330); ctx.rotate(.06); C.shadow(ctx, true, 8, .35); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-150, -170, 300, 340); C.shadow(ctx, false); C.fig(ctx, 0, 150, .85, t, Object.assign({}, BUSTER, { hat: null, pose: since(t, A.buster) > 0 ? 'wave' : 'stand', mood: 'happy' })); ctx.restore(); C.tape(ctx, 1050, 170, 90, .1);
      if (t > A.buster) { C.scrawl(ctx, '"Buster"', 1060, 560, 64, '#c23a2c', -.08); C.marker(ctx, 'under', [960, 600, 1170], k01(t, A.buster + .3, .5)); } ctx.restore(); C.finish(ctx, t); }
  const since = (t, x) => t - x;
  // 3. checking roads · bridges · rail lines: three polaroids on graph paper, each ticked
  function sChecks(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.06 }); C.bg(ctx, 'graph');
      const ins = [(c, w, h) => { c.drawImage(C.paper('sky'), 0, 0); C.hills(c, h * .5, ['#8aa86a'], 2, 30); C.pc(c, '#c9a978', cc => { cc.moveTo(w * .45, h * .5); cc.lineTo(w * .55, h * .5); cc.lineTo(w, h); cc.lineTo(0, h); cc.closePath(); }); },
        (c, w, h) => { c.drawImage(C.paper('sky'), 0, 0); S.sea(c, h * .7, t); C.pc(c, '#8a8a90', cc => { cc.rect(0, h * .45, w, 14); for (let i = 0; i < 4; i++) cc.rect(20 + i * w / 4, h * .45, 14, h * .55); }); c.strokeStyle = '#5a5a60'; c.lineWidth = 4; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(i * w / 6, h * .45); c.lineTo((i + .5) * w / 6, h * .25); c.lineTo((i + 1) * w / 6, h * .45); c.stroke(); } },
        (c, w, h) => { c.drawImage(C.paper('sky'), 0, 0); C.hills(c, h * .45, ['#9cb27a'], 4, 20); C.pc(c, '#7a6a5a', cc => cc.rect(0, h * .62, w, h)); c.strokeStyle = '#5a3a24'; c.lineWidth = 6; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(i * 30 - 10, h * .66); c.lineTo(i * 30 - 30, h); c.stroke(); } c.strokeStyle = '#3a3a40'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, h * .72); c.lineTo(w, h * .72); c.moveTo(0, h * .88); c.lineTo(w, h * .88); c.stroke(); C.train(c, w * .55, h * .7, .35, t); }];
      const keys = [A.checking, A.bridges, A.rail], caps = ['roads', 'bridges', 'rail lines'];
      ins.forEach((f, i) => { const kk = k01(t, keys[i] - .1, .35); S.polaroid(ctx, 260 + i * 380, 330 + (i % 2) * 30, 300, 220, (i - 1) * .06, f, caps[i], kk, i + 1); if (kk >= 1) C.marker(ctx, 'arrow', [200 + i * 380, 540, 230 + i * 380, 560, 0], 0); });
      keys.forEach((kt, i) => { const kk = k01(t, kt + .5, .3); if (kk > 0) { ctx.save(); ctx.strokeStyle = '#2a8a3a'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); const x = 360 + i * 380, y = 210 + (i % 2) * 30; ctx.moveTo(x - 30, y); ctx.lineTo(x - 30 + 20 * clamp(kk * 2), y + 20 * clamp(kk * 2)); if (kk > .5) ctx.lineTo(x - 10 + 50 * clamp(kk * 2 - 1), y + 20 - 50 * clamp(kk * 2 - 1)); ctx.stroke(); ctx.restore(); } });
      C.fig(ctx, 1160, 720, .7, t, Object.assign({}, BUSTER, { pose: 'hold', prop: (c, x, y) => { C.pc(c, '#f4efe2', cc => cc.rect(x - 20, y - 40, 40, 50)); } })); ctx.restore(); S.date(ctx, '1921', 1); C.finish(ctx, t); }
  // 4. the plan: a manila folder, typed "DEFENCE SCHEME No. 1", stamped SECRET
  function sFolder(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.1 }); C.bg(ctx, 'black'); const g = ctx.createRadialGradient(640, 330, 30, 640, 360, 600); g.addColorStop(0, 'rgba(255,220,150,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720);
      const op = k01(t, A.war - .2, .8); S.folder(ctx, 640, 380, 720, 460, 'DEFENCE SCHEME No. 1', op, { sub: 'Canadian General Staff · 1921', rot: -.02, inner: (c, x, y, w, h) => { c.drawImage(C.paper('cream'), x, y, w, h); c.fillStyle = INK; c.font = '700 26px Fredoka, sans-serif'; c.textAlign = 'left'; const L = ['IN THE EVENT OF WAR BETWEEN', 'THE UNITED STATES AND', 'THE BRITISH EMPIRE:', '', '1. Do not wait to be invaded.', '2. Strike first.', '3. Fall back. Wait for Britain.']; L.forEach((l, i) => { const kk = clamp((t - A.war) * 1.6 - i * .5); c.save(); c.globalAlpha = kk; c.fillText(l.slice(0, Math.floor(l.length * kk)), x + 40, y + 60 + i * 44); c.restore(); }); } });
      C.stamp(ctx, 'SECRET', 900, 220, 54, .12, k01(t, A.scheme + .4, .4)); C.stamp(ctx, 'INVADE FIRST!', 820, 560, 64, -.1, k01(t, A.first + .1, .4)); if (t > A.first) C.marker(ctx, 'circle', [460, 446, 200, 34], k01(t, A.first, .6));
      ctx.restore(); C.finish(ctx, t); }
  // 5. Seattle, Great Falls, Minneapolis, Albany: arrows punch south across the paper map; Britain's ship sails in
  function sMap(ctx, lt, dur, t) { const v = S.view({ lon: -98, lat: 47, s: 1500, y: 300 }, { lon: -96, lat: 46, s: 1650, y: 310 }, ease.inOut(clamp(lt / dur))); const pr = C.map(ctx, v, { fill: n => n === 'Canada' ? '#d86a5a' : n === 'United States of America' ? '#e8d8a8' : null });
    const tg = [[A.seattle, [-123, 50], [-122.3, 47.6], 'Seattle'], [A.falls, [-111, 50.5], [-111.3, 47.5], 'Great Falls'], [A.minn, [-95, 50], [-93.3, 45], 'Minneapolis'], [A.albany, [-73.6, 45.5], [-73.8, 42.7], 'Albany']];
    const back = k01(t, A.britain, 1.2);
    tg.forEach(([kt, from, to, nm]) => { const kk = k01(t, kt - .15, .6); C.mapArrow(ctx, pr, from, back > 0 ? [lerp(to[0], from[0], back * .7), lerp(to[1], from[1], back * .7)] : to, kk, '#c23a2c', 16, .1); C.pin(ctx, pr, to[0], to[1], nm, k01(t, kt + .2, .4), { dy: 40 }); });
    if (back > 0) { const [sx, sy] = pr(-55, 44); C.ship(ctx, lerp(1400, sx + 40, ease.out(back)), sy, .35, t, { flag: '#1e3a7a' }); C.flagUK(ctx, lerp(1400, sx + 40, ease.out(back)) - 10, sy - 110, 34, 20); C.label(ctx, 'wait for Britain…', 1080, 560, 22, { rot: .04 }); }
    S.counter(ctx, 1080, 140, .62, '?!', k01(t, A.seattle, .4), { col: '#c23a2c', note: 'direction: ⬇ reversed?!' });
    C.label(ctx, 'grab them fast!', 300, 640, 26, { rot: -.04, bg: '#f4c44a' }); C.finish(ctx, t); }
  // 6. apologizing to furniture: a paper Canadian bows to a chair — "SORRY!"
  function sSorry(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.1, x: 40, y: 20 }); C.bg(ctx, 'cream'); C.pc(ctx, '#c49a6c', c => c.rect(-60, 560, 1400, 300)); ctx.save(); ctx.globalAlpha = .3; for (let x = -60; x < 1400; x += 80) { ctx.fillStyle = x % 160 ? '#a87c50' : '#b88c60'; ctx.fillRect(x, 560, 80, 300); } ctx.restore();
      C.photo(ctx, 'cree-winter-camp', 300, 230, 260, 170, { rot: -.05, tape: true, filter: 'sepia', seed: 3 }); S.chair(ctx, 760, 640, 1.4); C.pc(ctx, '#7a4a28', c => { c.rect(690, 560, 160, 18); c.rect(690, 578, 14, 80); c.rect(836, 578, 14, 80); });
      const bow = Math.sin(clamp(lt * 1.5) * Math.PI) * .45; C.fig(ctx, 470, 700, 1.05, t, { coat: '#b8322a', pants: '#2a3a5a', hat: 'fur', hatCol: '#5a3a24', beard: '#5a3a24', lean: bow, pose: 'shrug', mood: 'sad', seed: 4 });
      if (lt > .5) C.bubble(ctx, 'Oh — sorry!\nSo sorry!', 420, 210, 30, 470, 330); C.mapleLeaf(ctx, 1100, 160, 70); ctx.restore(); C.finish(ctx, t); }
  // 7. good reasons to be nervous: a giant US flag cut-out looms over the little Canadian ensign; invaded twice: two scraps, 1775 and 1813
  function sNervous(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.04 }, { z: 1.0 }); C.bg(ctx, 'news');
      const tw = k01(t, A.twice - .1, .4), iv = k01(t, A.invaded, .5);
      ctx.save(); ctx.translate(380, 300); ctx.rotate(-.05 + Math.sin(C.step(t) * 3) * .01); C.shadow(ctx, true, 12, .45); C.flagUS(ctx, -280, -180, 560, 360); C.shadow(ctx, false); ctx.restore();
      ctx.save(); ctx.translate(980, 520); ctx.rotate(.06); C.shadow(ctx, true, 8, .4); C.flagRedEnsign(ctx, -110, -60, 220, 120); C.shadow(ctx, false); ctx.restore(); C.label(ctx, 'Canada, 1921 (still flying the Red Ensign)', 980, 640, 17);
      if (iv > 0) { C.photo(ctx, 'richard-montgomery', 820, 230, 230, 188, { rot: .07, tape: true, filter: 'sepia', caption: '1775', capSize: 26, seed: 5, scale: ease.back(iv) }); }
      if (tw > 0) { C.photo(ctx, 'a-fenian-flag-and-a-ridgeway-battle-prin', 1120, 260, 240, 145, { rot: -.08, tape: true, caption: '1812–14', capSize: 26, seed: 7, crop: [.45, .1, .55, .8], scale: ease.back(tw) }); S.bigNum(ctx, 'TWICE.', 640, 620, 90, tw); }
      ctx.restore(); C.finish(ctx, t); }
  // 8. plenty of Americans said the whole continent should be one country: newspaper scraps with slogans
  function sOneCountry(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.08, x: -30 }, { z: 1.0, x: 20 }); S.board(ctx, 'kraft', 8);
      S.paper(ctx, 360, 360, 420, 560, -.07, 'THE DAILY EAGLE', 'ONE FLAG\nFROM THE ARCTIC\nTO MEXICO!', { date: 'An American newspaper, 1800s (illustrative)', hs: 46 });
      S.paper(ctx, 860, 330, 380, 500, .06, 'MANIFEST TIMES', 'ANNEX\nCANADA', { date: '(illustrative)', hs: 70 });
      for (const [x, y, s, f] of [[700, 720, .9, 1], [1120, 730, .95, -1]]) C.fig(ctx, x, y, s, t, { coat: '#2a2a34', hat: 'top', mustache: '#5a4a3a', pose: 'point', flip: f < 0, mood: 'angry', seed: x });
      C.bubble(ctx, 'The whole continent\nshould be ONE country!', 640, 120, 26, 700, 300); ctx.restore(); C.finish(ctx, t); }
  // 9. the question: a cold, thin patchwork next to a giant; second-largest; never swallowed
  function sQuestion(ctx, lt, dur, t) { const v = S.view({ lon: -98, lat: 55, s: 700, y: 400 }, { lon: -98, lat: 52, s: 640, y: 380 }, ease.inOut(clamp(lt / dur)));
    const pal = ['#c86a5a', '#d8a050', '#7a9a5a', '#5a8aa8', '#a87aa8', '#d8c070', '#6aa8a0', '#c8806a', '#8a7aa8', '#b8a070', '#7aa880', '#d88a8a', '#9aa860'];
    let i = 0; const P = {}; for (const nm in G.GEO.provinces) P[nm] = pal[(i++) % pal.length];
    const pr = C.map(ctx, v, { prov: true, fill: n => (n in P && t > A.howdid + .3 && isCan(n)) ? P[n] : n === 'United States of America' ? '#b8a888' : null, alpha: .9 });
    S.snow(ctx, t, 40); C.label(ctx, 'cold · thinly populated · a patchwork of colonies', 400, 90, 22, { rot: -.02 });
    if (t > A.next) { const [x, y] = pr(-98, 39); C.headline(ctx, 'MOST POWERFUL NATION ON EARTH', x, y, 28, { bg: '#24324c', col: '#fff', rot: .02 }); }
    if (t > A.second) { const [x, y] = pr(-105, 62); S.bigNum(ctx, '#2 BY AREA', x, y, 64, k01(t, A.second, .4)); }
    if (t > A.swallowed) { const k = k01(t, A.swallowed, 1); ctx.save(); const [x, y] = pr(-95, 38); ctx.translate(x, y - 40); ctx.fillStyle = '#24324c'; for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * (.6 - Math.abs(Math.sin(k * Math.PI * 2)) * .5)); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(260, d * 24); ctx.lineTo(0, d * 60); ctx.closePath(); ctx.fill(); ctx.restore(); } ctx.restore(); C.scrawl(ctx, 'never swallowed?', 980, 640, 40, '#c23a2c', -.05); }
    C.finish(ctx, t); }
  const isCan = n => ['Ontario', 'Québec', 'Quebec', 'British Columbia', 'Alberta', 'Saskatchewan', 'Manitoba', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island', 'Yukon', 'Northwest Territories', 'Nunavut'].includes(n);
  G.isCan = isCan;
  // 10. not a war, a pattern: a cannon cut-out crossed out; then the table icon repeats down the page like wallpaper
  function sPattern(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.06 }); C.bg(ctx, 'cream'); const pk = k01(t, A.pattern, .5);
      if (pk < 1) { ctx.save(); ctx.globalAlpha = 1 - pk; ctx.translate(640, 380); C.pc(ctx, '#3a3a40', c => { c.roundRect(-220, -60, 380, 90, 40); }); C.pc(ctx, '#6a4428', c => c.arc(-60, 50, 70, 0, 7)); C.marker(ctx, 'x', [0, 0, 200], k01(t, A.answer + .3, .5)); ctx.restore(); C.headline(ctx, 'NOT A WAR', 640, 140, 70, { rot: -.03 }); }
      if (pk > 0) { for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const kk = clamp(pk * 20 - (r * 5 + c) * .6); if (kk <= 0) continue; ctx.save(); ctx.translate(140 + c * 250, 130 + r * 160); ctx.scale(ease.back(kk) * .5, ease.back(kk) * .5); C.pc(ctx, '#6a4426', cc => { cc.moveTo(-150, 0); cc.lineTo(150, 0); cc.lineTo(180, 60); cc.lineTo(-180, 60); cc.closePath(); }); C.pc(ctx, '#f4ecd8', cc => cc.rect(-50, 10, 100, 30)); S.chair(ctx, -90, 0, .8); S.chair(ctx, 90, 0, .8); ctx.restore(); }
        C.headline(ctx, "IT'S A PATTERN", 640, 660, 60, { bg: '#c23a2c', col: '#fff', rot: .02 }); }
      ctx.restore(); C.finish(ctx, t); }
  // 11. somebody sat down at a table and made a deal; nobody loved it; everybody signed
  function sTable(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.1, y: 40 }, { z: 1.0 }); const nb = t > A.nobody, sg = k01(t, A.everybody, 1.6);
      S.dealTable(ctx, t, { people: [{ x: 300, coat: '#3a2a4a', hat: 'top', mustache: '#3a2a1e', mood: nb ? 'angry' : 'calm', pose: sg > 0 ? 'hold' : 'stand' }, { x: 640, coat: '#2a3a2a', hat: 'tricorne', mood: nb ? 'sad' : 'calm', pose: 'stand' }, { x: 980, coat: '#5a2a2a', hat: 'bowler', beard: '#5a3a24', mood: nb ? 'angry' : 'calm', pose: 'stand' }],
        doc: 'THE DEAL', slide: k01(t, A.table + .4, .8), sign: sg }); if (nb) C.scrawl(ctx, 'nobody loved it…', 640, 170, 44, '#f4c44a', -.03); if (sg > 0) C.scrawl(ctx, '…everybody signed it anyway', 640, 230, 36, '#fbf8f0', .02);
      ctx.restore(); C.finish(ctx, t); }
  // 12. who wasn't invited: the camera pulls back from the lit table to the cold dark outside, where people stand at the window
  function sOutside(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: .8, y: -20 }); C.bg(ctx, 'night'); S.snow(ctx, t, 80, 3);
      ctx.save(); ctx.translate(640, 330); C.shadow(ctx, true, 14, .5); ctx.fillStyle = '#3a2a20'; ctx.fillRect(-330, -210, 660, 420); C.shadow(ctx, false); ctx.save(); ctx.beginPath(); ctx.rect(-300, -180, 600, 360); ctx.clip(); ctx.translate(-300, -180); ctx.scale(600 / 1280, 360 / 720); S.dealTable(ctx, t, { people: [{ x: 300, coat: '#3a2a4a', hat: 'top' }, { x: 640, coat: '#2a3a2a', hat: 'tricorne' }, { x: 980, coat: '#5a2a2a', hat: 'bowler' }], doc: 'THE DEAL', sign: 1 }); ctx.restore(); ctx.fillStyle = '#3a2a20'; ctx.fillRect(-6, -180, 12, 360); ctx.fillRect(-300, -6, 600, 12); ctx.restore();
      C.pc(ctx, '#e8eef2', c => { c.moveTo(-200, 800); c.lineTo(-200, 600); c.quadraticCurveTo(640, 560, 1500, 600); c.lineTo(1500, 800); c.closePath(); });
      const out = [[120, { coat: '#6a4a3a', hat: 'feather', long_hair: 1, skin: '#c89070' }], [250, { coat: '#3a5a6a', hat: 'hood', hatCol: '#d8d0c0', skin: '#c89070' }], [1040, { coat: '#2a2a34', hat: 'cap', skin: '#e8c090' }], [1170, { coat: '#5a6a4a', braid: 1, skin: '#c89070' }]];
      out.forEach(([x, o], i) => C.fig(ctx, x, 700, .9, t, Object.assign({ mood: 'sad', seed: i + 40, pose: 'stand', face_: x > 640 ? -1 : 1 }, o)));
      C.scrawl(ctx, "who wasn't invited?", 640, 640, 50, '#f4c44a', -.03); ctx.restore(); C.finish(ctx, t, { vig: .5 }); }
  // 13. title: THE ENTIRE HISTORY OF CANADA in ransom letters, a maple leaf and the beaver
  function sTitle(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.12 }, { z: 1.0 }); C.bg(ctx, 'kraft'); C.photo(ctx, 'lanse-aux-meadows-newfoundland', 200, 180, 260, 160, { rot: -.1, filter: 'sepia', seed: 1 }); C.photo(ctx, 'the-last-spike-at-craigellachie-bc-7-nov', 1100, 170, 270, 190, { rot: .08, filter: 'bw', seed: 2 }); C.photo(ctx, 'vimy-ridge-france', 1100, 560, 220, 220, { rot: -.06, filter: 'sepia', seed: 3 }); C.photo(ctx, 'haudenosaunee-longhouses', 190, 560, 260, 180, { rot: .07, filter: 'sepia', seed: 4 });
      const k = clamp(lt / 1.6); C.ransom(ctx, 'THE ENTIRE', 640, 270, 70, k, { seed: 3 }); C.ransom(ctx, 'HISTORY OF', 640, 370, 70, clamp(k * 1.3 - .3), { seed: 5 }); C.ransom(ctx, 'CANADA', 640, 490, 110, clamp(k * 1.6 - .6), { seed: 9 }); C.mapleLeaf(ctx, 640, 610, 60 * ease.back(clamp(lt - 1.2))); ctx.restore(); C.finish(ctx, t); }

  const cut = [[0, sRoad, 0], [A.officer, sOfficer, .3], [A.checking - .4, sChecks, .3], [A.plan - .2, sFolder, .3], [A.seattle - .5, sMap, .4], [A.thinking - .2, sSorry, .3], [A.thing, sNervous, .3], [A.plenty - .2, sOneCountry, .3],
    [A.howdid - .2, sQuestion, .4], [A.answer - .2, sPattern, .3], [A.everytime + 1.5, sTable, .4], [A.real - .1, sOutside, .5], [A.title - .1, sTitle, .2]];
  F.chapter({ cut, sfx: [{ t: .3, type: 'wind', gain: .3 }, { t: A.buster + .3, type: 'scratch', gain: .3 }, { t: A.checking, type: 'paper', gain: .3 }, { t: A.bridges, type: 'paper', gain: .3 }, { t: A.rail, type: 'paper', gain: .3 }, { t: A.scheme + .4, type: 'press', gain: .4 }, { t: A.first + .1, type: 'press', gain: .45 },
    { t: A.seattle, type: 'whoosh', gain: .3 }, { t: A.falls, type: 'whoosh', gain: .3 }, { t: A.minn, type: 'whoosh', gain: .3 }, { t: A.albany, type: 'whoosh', gain: .3 }, { t: A.twice, type: 'hit', gain: .35 }, { t: A.swallowed, type: 'thud', gain: .3 }, { t: A.everybody, type: 'scratch', gain: .3 }, { t: A.title, type: 'boom', gain: .4 }],
    moods: [{ t: 0, mood: 'tense' }, { t: A.thinking, mood: 'still' }, { t: A.real, mood: 'mystery' }, { t: A.title, mood: 'still' }] });
})(window);
