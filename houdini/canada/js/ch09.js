/* Canada — Beat 9, Louis Riel (750.4–890.3 s): recap; Riel, 25, Métis, educated in Montreal; the 1869 provisional government blocks Canada;
 * the 1870 Manitoba Act (Deal #4 — somebody forced their way to the table); Thomas Scott, a wanted man, exile; 1885: the North-West Resistance,
 * troops by rail, Batoche, the trial; 7 Nov 1885 the last spike; 16 Nov Riel hanged in Regina; traitor / outrage / founder of Manitoba. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK } = C, k01 = S.k01;
  const a = (ph, from = 748) => F.at(ph, from);
  const A = { start: a('now where were we'), french: a('the french and english signed'), bought: a('and then it bought'), without: a('without asking'), leader: a('those people had'), name: a('his name was louis'), loo: a('loo-ee'), was25: a('he was 25'), montreal: a('educated in montreal'), mood: a('and absolutely not'),
    y1869: a('in 1869 riel'), prov: a('provisional government'), blocked: a('and blocked canada'), works: a('and it works'), forced: a('canada is forced'), withRR: a('this time with'), act: a('in 1870 the manitoba'), prot: a('with protections'),
    did: a('and canada did what canada does', 793), deal: a('it made a deal', 793), except: a('except this time'), somebody: a('somebody forced'), ends: a("but that's not where"), during: a('during the resistance'), scott: a('thomas scott'), hated: a('and that made riel'),
    troops: a('when troops arrived'), elected: a('he was elected'), expelled: a('and expelled'), asylum: a('he spent time'), fifteen: a('fifteen years later'), callback: a('they call riel back'), y1885: a("in 1885 there's"), nwr: a('north-west resistance'),
    sends: a('canada sends troops'), batoche: a('are defeated at batoche'), surrender: a('riel surrenders'), tried: a("he's tried for"), sanity: a('even though questions'), nov7: a('on november 7 1885'), lastspike: a('drives the last spike'), connected: a('the country is finally'), coast: a('coast to coast'),
    nine: a('nine days later'), regina: a('regina'), english: a('to many in english'), french2: a('to french canada'), honored: a('today he is honored'), rebel: a("whether he's a rebel"), argument: a('and that argument'), one: a('in one person') };
  const sc = (ctx, w, h, fn) => { ctx.save(); ctx.scale(w / 1280, h / 720); fn(ctx); ctx.restore(); };
  const CA67 = n => ({ Ontario: '#c86a5a', 'Québec': '#5a7ab8', Quebec: '#5a7ab8', 'Nova Scotia': '#d8a050', 'New Brunswick': '#7a9a5a' })[n] || null;
  // 1. recap: three polaroids on the board — the deal, the purchase, the people nobody asked
  function sRecap(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      S.polaroid(ctx, 230, 280, 300, 200, -.06, (cc, w, h) => sc(cc, w, h, c2 => S.dealTable(c2, t, { people: [{ x: 440, ...PP.politician(1) }, { x: 840, face: 'macdonald', flip: true }], doc: 'CONFEDERATION', sign: 1 })), '1867: a deal', k01(t, A.start + .2, .4), 3);
      S.polaroid(ctx, 640, 260, 300, 200, .04, (cc, w, h) => sc(cc, w, h, c2 => C.map(c2, { lon: -95, lat: 56, s: 700, x: 640, y: 380 }, { fill: n => n === 'Canada' ? '#c86a5a' : null, alpha: .7 })), 'half a continent', k01(t, A.bought, .4), 4);
      S.polaroid(ctx, 1050, 290, 300, 200, -.03, (cc, w, h) => sc(cc, w, h, c2 => S.redRiver(c2, t, {})), 'the people there', k01(t, A.without - .6, .4), 5);
      if (t > A.without) { C.marker(ctx, 'circle', [1050, 290, 190, 150], k01(t, A.without + .2, .6)); C.scrawl(ctx, 'nobody asked them!', 1040, 520, 34); } });
    S.date(ctx, 'SO FAR…', 1); C.finish(ctx, t); }
  // 2. Louis Riel: his portrait pinned up, the painted Riel beside it, arms down, not in the mood
  function sRiel(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06, x: -30 }, { z: 1.0 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      C.photo(ctx, 'louis-riel', 380, 290, 300, 334, { rot: -.04, tape: true, seed: 91, caption: 'Louis Riel', capSize: 20 });
      if (t > A.loo) { C.label(ctx, 'loo-EE  ree-EL', 380, 520, 26); }
      C.fig(ctx, 900, 690, 1.15, t, { face: 'riel', pose: t > A.mood ? 'stand' : 'talk', mood: t > A.mood ? 'angry' : 'calm', flip: true, seed: 501 });
      const notes = [['AGE 25', A.was25], ['MÉTIS', A.was25 + .8], ['EDUCATED IN MONTREAL', A.montreal]]; notes.forEach(([n, kt], i) => { if (t > kt) { ctx.save(); ctx.globalAlpha = k01(t, kt, .3); C.headline(ctx, n, 1130, 200 + i * 70, 26, { rot: (i - 1) * .04, bg: ['#fbf8f0', '#f4c44a', '#c8e0c0'][i] }); ctx.restore(); } });
      if (t > A.mood) C.stamp(ctx, 'NOT IN THE MOOD', 640, 600, 48, -.06, k01(t, A.mood + .5, .3)); });
    C.finish(ctx, t); }
  // 3. 1869: the Métis block the trail at Red River; Canadian surveyors stopped
  function sBlock(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: 30 }, { z: 1.08, x: -10 }); Cn.layer(ctx, c, 1, () => { S.redRiver(ctx, t, {});
      // the barricade: rails across the trail
      for (const dy of [0, 26]) P.cel(ctx, cc => { cc.save(); cc.translate(640, 640 + dy); cc.rotate(-.02); cc.rect(-120, -8, 240, 14); cc.restore(); }, '#9a7040', { shade: '#6a4a24', dx: 0, dy: 3, lw: 3 }); for (const dx of [-100, 100]) P.cel(ctx, cc => cc.rect(636 + dx, 600, 10, 100), '#7a5430', { dx: 0, dy: 0, lw: 3 });
      for (let i = 0; i < 4; i++) C.fig(ctx, 760 + i * 110, 708, .66, t + i, Object.assign(PP.metis(i), { pose: i === 0 ? (t > A.blocked ? 'point' : 'stand') : 'stand', flip: true, mood: 'calm' }));
      S.metisFlag(ctx, 1210, 470, 80, 50); P.ink(ctx, '#5a3a24', cc => cc.rect(1204, 470, 6, 236), 0);
      const back = t > A.works ? ease.inOut(k01(t, A.works, 2)) * 120 : 0; for (let i = 0; i < 2; i++) C.fig(ctx, 360 - i * 120 - back, 708, .66, t + i, { hat: 'top', coat: ['#4a4a5a', '#5a4a3a'][i], mood: t > A.blocked ? 'shock' : 'calm', pose: 'stand', seed: 520 + i });
      // a surveyor's tripod
      ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 5; for (const d of [-30, 0, 30]) { ctx.beginPath(); ctx.moveTo(470 - back, 590); ctx.lineTo(470 + d - back, 706); ctx.stroke(); } P.cel(ctx, cc => cc.rect(452 - back, 572, 36, 20), '#c8a048', { dx: 0, dy: 0, lw: 3 }); });
    S.date(ctx, '1869 · RED RIVER', 1); if (t > A.prov) C.headline(ctx, 'PROVISIONAL GOVERNMENT', 640, 150, 40, { rot: -.03, bg: '#fbf8f0', col: '#1e3a7a' }); if (t > A.works) C.stamp(ctx, 'AND IT WORKS', 980, 260, 44, .06, k01(t, A.works, .3));
    if (t > A.forced) S.fact(ctx, 'Canada has to negotiate new terms — with the people of Red River', k01(t, A.forced, .4)); C.finish(ctx, t); }
  // 4. the Manitoba Act at the deal table — Deal #4; this time somebody forced their way in
  function sManitoba(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.08, y: 20 }, { z: 1.0 }); Cn.layer(ctx, c, 1, () => { const inK = t > A.somebody ? ease.out(k01(t, A.somebody, .6)) : 0;
      S.dealTable(ctx, t, { people: [{ x: 380, face: 'macdonald' }, { x: 640, ...PP.politician(2) }, { x: 900, ...PP.metis(0), flip: true }, ...(inK > 0 ? [{ x: lerp(1500, 1110, inK), ...PP.metis(1), flip: true, pose: 'point' }] : [])], doc: 'MANITOBA ACT 1870', slide: k01(t, A.act, .8), sign: k01(t, A.prot, 3), sigs: 3,
        wall: cc => S.metisFlag(cc, 1040, 110, 140, 86) }); });
    S.date(ctx, '1870', k01(t, A.act, .4)); if (t > A.prot && t < A.did) S.fact(ctx, 'the province of Manitoba · protections for land, language and religion', k01(t, A.prot, .4));
    S.dealStamp(ctx, t, A.did, A.deal, 4, { until: A.except }); if (t > A.except) P.caption(ctx, 'Except this time, somebody forced their way to the table.', k01(t, A.except, .4), { size: 28, x: 640, y: 676, align: 'center' }); C.finish(ctx, t); }
  // 5. Thomas Scott: the execution makes Riel hated in English Canada — the newspapers, the wanted poster
  function sScott(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      if (t > A.during) S.paper(ctx, 370, 330, 380, 500, -.05, 'THE ONTARIO HERALD', 'SCOTT\nEXECUTED\nAT RED RIVER', { date: '1870 (illustrative)', hs: 54, scale: ease.back(k01(t, A.during, .4)) });
      if (t > A.hated) { ctx.save(); ctx.translate(900, 320); ctx.rotate(.04); ctx.scale(ease.back(k01(t, A.hated, .4)), ease.back(k01(t, A.hated, .4))); C.shadow(ctx, true, 10, .4); ctx.drawImage(C.paper('cream', 340, 470), -170, -235); C.shadow(ctx, false); C.tape(ctx, 0, -235, 90, -.04, 7); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '900 64px Anton'; ctx.fillText('WANTED', 0, -160);
        C.photo(ctx, 'louis-riel', 0, 10, 220, 245, { filter: 'sepia', border: 4, torn: false, shadow: false, seed: 93 }); ctx.fillStyle = INK; ctx.font = '900 34px Anton'; ctx.fillText('$5,000 REWARD', 0, 185); ctx.font = '700 16px Fredoka, sans-serif'; ctx.fillText('offered by Ontario, 1870s', 0, 212); ctx.restore(); } });
    if (t > A.during && t < A.hated) S.fact(ctx, 'his provisional government executed Thomas Scott', k01(t, A.during, .4)); if (t > A.hated) S.fact(ctx, 'Riel becomes a hated figure in English Canada', k01(t, A.hated, .4)); C.finish(ctx, t); }
  // 6. exile: Riel walks away by night across the prairie toward the border; the years tick by on cards
  function sExile(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.04 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'night', t, { horizon: 470, seed: 331 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 460, ['#2a3a3a', '#1e2c2c'], 6, 30));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 560, 1900, 400), '#2e3e2a', { dx: 0, dy: 0, lw: 0 }); const x = lerp(160, 900, clamp(lt / dur));
      C.fig(ctx, x, 690, .8, t, { face: 'riel', pose: 'walk', mood: 'sad', hat: 'top', seed: 531, prop: (cc) => P.cel(cc, c2 => c2.rect(-18, 0, 36, 28), '#5a3a24', { dx: 0, dy: 0, lw: 2 }) });
      P.ink(ctx, '#6a4a2a', cc => cc.rect(1100, 520, 8, 180), 0); P.cel(ctx, cc => cc.rect(1020, 500, 170, 50), '#d8c8a0', { dx: 0, dy: 4, lw: 3 }); C.label(ctx, 'U.S.A. →', 1105, 532, 20); });
    S.date(ctx, '1870 · HE FLEES', 1); const cards = [['ELECTED TO PARLIAMENT', A.elected], ['…AND EXPELLED', A.expelled], ['ASYLUMS IN QUEBEC', A.asylum + .5], ['LIVES IN THE UNITED STATES', A.asylum + 2.5]];
    cards.forEach(([n, kt], i) => { if (t > kt) { ctx.save(); ctx.globalAlpha = k01(t, kt, .3); C.headline(ctx, n, 330 + (i % 2) * 560, 170 + Math.floor(i / 2) * 80, 28, { rot: (i % 2 ? .03 : -.03), bg: i === 1 ? '#f4c44a' : '#fbf8f0' }); ctx.restore(); } }); C.finish(ctx, t); }
  // 7. Saskatchewan, fifteen years later: survey stakes across Métis lots; a rider goes to fetch Riel; 1885
  function sCallBack(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.06 }, { z: 1.0 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'golden', t, { horizon: 450, sun: [1080, 220], sunR: 40, seed: 341 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 440, ['#a8a868', '#8a9050'], 5, 24));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 520, 1900, 400), '#b8b068', { dx: 0, dy: 0, lw: 0 }); G.Cine.meadow && G.Cine.meadow(ctx, 520, 760, t, {});
      C.house(ctx, 230, 620, .9, { wall: '#8a6040', roof: '#6a4a2a' }); for (let i = 0; i < 6; i++) { const sx = 420 + i * 150, sy = 600 + (i % 2) * 40; P.ink(ctx, '#d8c8a0', cc => cc.rect(sx, sy - 50, 6, 52), 2); P.cel(ctx, cc => { cc.moveTo(sx + 6, sy - 50); cc.lineTo(sx + 30, sy - 42); cc.lineTo(sx + 6, sy - 34); cc.closePath(); }, '#d8241a', { dx: 0, dy: 0, lw: 2 }); }
      for (let i = 0; i < 3; i++) C.fig(ctx, 420 + i * 110, 700, .62, t + i, Object.assign(i < 2 ? PP.metis(i + 2) : PP.cree(0), { pose: i === 0 ? 'point' : 'stand', mood: 'sad', flip: i === 2 }));
      if (t > A.callback) { const hx = lerp(820, 1500, ease.in(k01(t, A.callback + .3, 2.5))); P.horse(ctx, hx, 700, .55, t, { walk: true, flip: true, col: '#5a3a24', rider: cc => C.fig(cc, 0, -120, .7, t, Object.assign(PP.metis(1), { pose: 'stand', flip: true })) }); C.label(ctx, '→ MONTANA: "COME BACK"', 1060, 470, 20); } });
    C.photo(ctx, 'batoche-saskatchewan', 1080, 190, 260, 196, { rot: .05, tape: true, seed: 95, caption: 'Batoche, Saskatchewan (today)', capSize: 13 });
    S.date(ctx, 'FIFTEEN YEARS LATER', 1); if (t > A.fifteen + 1.5 && t < A.y1885) S.fact(ctx, 'Métis and some Cree communities losing their land — and being ignored', k01(t, A.fifteen + 1.5, .4));
    if (t > A.y1885) C.stamp(ctx, 'NORTH-WEST RESISTANCE · 1885', 520, 300, 40, -.05, k01(t, A.nwr, .3)); C.finish(ctx, t); }
  // 8. troops by rail across the prairie; then Batoche
  function sTroops(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.04 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'dawn', t, { horizon: 470, seed: 351 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 460, ['#a8a868', '#8a9050'], 5, 20));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 520, 1900, 400), '#b8b068', { dx: 0, dy: 0, lw: 0 }); S.rails(ctx, 600, t); const x = lerp(-300, 1100, clamp(lt / Math.min(dur, 6)));
      for (let i = 0; i < 3; i++) { const cx = x - 300 - i * 250; for (let j = 0; j < 4; j++) C.fig(ctx, cx - 80 + j * 50, 560, .35, t + j, Object.assign(PP.redcoat(j), { hat: 'kepi', hatCol: '#1e1e2a' })); P.cel(ctx, cc => cc.rect(cx - 110, 520, 220, 80), '#8a3a2a', { shade: '#5a2418', dx: 0, dy: 8, lw: 3 }); for (const w of [-70, 70]) P.ink(ctx, '#1a1614', cc => cc.arc(cx + w, 604, 18, 0, 7), 3); }
      C.train(ctx, x, 604, .9, t, { flip: true }); });
    S.date(ctx, 'SPRING 1885', 1); if (t > A.sends && t < A.batoche) S.fact(ctx, 'troops sent west, fast — on the brand-new railway', k01(t, A.sends, .4));
    if (t > A.batoche - .3) C.photo(ctx, 'battle-of-batoche', 640, 300, 560 * ease.back(k01(t, A.batoche - .3, .4)), 394 * ease.back(k01(t, A.batoche - .3, .4)), { rot: -.03, tape: true, seed: 97, caption: 'The Battle of Batoche, May 1885', capSize: 16 });
    if (t > A.surrender) C.stamp(ctx, 'RIEL SURRENDERS', 640, 620, 44, -.05, k01(t, A.surrender, .3)); C.finish(ctx, t); }
  // 9. the trial: Riel in the dock; guilty of high treason
  function sTrial(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.05 }, { z: 1.0 }); Cn.layer(ctx, c, 1, () => { S.court(ctx, t);
      C.fig(ctx, 1070, 560, .8, t, { hat: null, coat: '#1a1a1e', hair: '#e8e4dc', mustache: '#e8e4dc', pose: 'talk', flip: true, seed: 541 }); P.cel(ctx, cc => cc.rect(860, 380, 420, 180), '#5a3418', { shade: '#3a2010', light: '#7a4a28', dx: 0, dy: 10, lw: 4 });
      C.fig(ctx, 270, 600, .8, t, { face: 'riel', pose: 'stand', mood: 'sad', seed: 542 }); P.cel(ctx, cc => cc.rect(120, 470, 300, 130), '#5a3418', { shade: '#3a2010', dx: 0, dy: 8, lw: 4 }); C.label(ctx, 'THE DOCK', 270, 540, 18); });
    S.date(ctx, 'REGINA · 1885', 1); if (t > A.tried + .6) C.stamp(ctx, 'GUILTY · HIGH TREASON', 640, 230, 50, -.05, k01(t, A.tried + .8, .3)); if (t > A.sanity) S.fact(ctx, 'questions about his sanity were raised at the time', k01(t, A.sanity, .4)); C.finish(ctx, t); }
  // 10. 7 Nov 1885: the last spike in the mountains of BC; coast to coast
  function sSpike(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: 20 }, { z: 1.06, x: -20 }); Cn.layer(ctx, c, 1, () => { S.rockies(ctx, t); S.rails(ctx, 650, t);
      C.fig(ctx, 520, 690, .85, t * 1.6, { hat: 'top', coat: '#2a2a30', beard: '#e8e4dc', hair: '#e8e4dc', pose: 'stand', seed: 551, prop: cc => { cc.rotate(-.5 + Math.abs(Math.sin(t * 2.2)) * .9); P.ink(cc, '#6a4428', c2 => c2.rect(-3, -6, 6, 86), 2); P.cel(cc, c2 => c2.rect(-22, 78, 44, 20), '#3a3a40', { dx: 0, dy: 0, lw: 2 }); } });
      for (let i = 0; i < 4; i++) C.fig(ctx, 760 + i * 90, 690, .7, t + i, { hat: i % 2 ? 'bowler' : 'top', coat: ['#3a3a44', '#4a3a2a', '#2a2a30', '#5a4a3a'][i], beard: i === 1 ? '#5a4a3a' : null, pose: 'stand', flip: true, seed: 560 + i }); });
    C.photo(ctx, 'the-last-spike-at-craigellachie-bc-7-nov', 1040, 190, 330, 242, { rot: .04, tape: true, seed: 99, caption: 'The Last Spike, Craigellachie, B.C.', capSize: 14 });
    S.date(ctx, '7 NOVEMBER 1885', 1); if (t > A.lastspike && t < A.connected) S.fact(ctx, 'the last spike of the Canadian Pacific Railway', k01(t, A.lastspike, .4)); if (t > A.connected) C.headline(ctx, 'COAST TO COAST', 640, 600, 48, { rot: -.03, bg: '#fbf8f0', col: '#c23a2c' }); C.finish(ctx, t); }
  // 11. nine days later: the spike photo and Riel's portrait side by side; 16 November, Regina
  function sNine(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft'); ctx.fillStyle = 'rgba(20,14,10,.45)'; ctx.fillRect(-300, -300, 1900, 1400);
      C.photo(ctx, 'the-last-spike-at-craigellachie-bc-7-nov', 340, 300, 400, 293, { rot: -.04, tape: true, seed: 99, filter: 'bw', caption: '7 November', capSize: 18 });
      C.photo(ctx, 'louis-riel', 930, 300, 280, 312, { rot: .03, tape: true, seed: 91, filter: 'bw', caption: '16 November', capSize: 18 });
      if (t > A.nine) { ctx.save(); ctx.globalAlpha = k01(t, A.nine, .4); C.headline(ctx, '9 DAYS', 640, 330, 44, { rot: -.04, bg: '#1e1a18', col: '#fbf8f0' }); ctx.restore(); } });
    if (t > A.regina - .5) S.fact(ctx, 'Louis Riel is hanged in Regina · 16 November 1885', k01(t, A.regina - .5, .4)); C.finish(ctx, t, { vig: .7 }); }
  // 12. traitor / outrage / founder of Manitoba; rebel or father of Confederation — a see-saw scale
  function sLegacy(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.04 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      if (t < A.rebel) { S.paper(ctx, 330, 340, 380, 500, -.06, 'THE ONTARIO HERALD', 'TRAITOR!', { date: 'English Canada (illustrative)', hs: 80 });
        if (t > A.french2) S.paper(ctx, 760, 350, 380, 500, .05, 'LA VOIX DE QUÉBEC', 'UN\nOUTRAGE!', { date: 'French Canada (illustrative)', hs: 70, scale: ease.back(k01(t, A.french2, .4)) });
        if (t > A.honored) { C.photo(ctx, 'louis-riel', 1100, 300, 220, 245, { rot: .04, tape: true, seed: 92, caption: 'Founder of Manitoba', capSize: 18, scale: ease.back(k01(t, A.honored, .4)) }); } }
      else { const tilt = Math.sin((t - A.rebel) * 1.6) * .18; ctx.save(); ctx.translate(640, 300); P.cel(ctx, cc => { cc.moveTo(-20, 0); cc.lineTo(20, 0); cc.lineTo(40, 340); cc.lineTo(-40, 340); cc.closePath(); }, '#8a6a3a', { shade: '#5a4424', dx: 8, dy: 0, lw: 3 }); ctx.rotate(tilt);
        P.cel(ctx, cc => cc.rect(-420, -10, 840, 20), '#a8844a', { shade: '#6a5030', dx: 0, dy: 4, lw: 3 }); for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 380, 10); ctx.rotate(-tilt); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, 110); ctx.moveTo(0, 0); ctx.lineTo(90, 110); ctx.stroke(); P.cel(ctx, cc => cc.ellipse(0, 116, 110, 20, 0, 0, 7), '#c8a048', { dx: 0, dy: 4, lw: 3 }); C.headline(ctx, d < 0 ? 'REBEL?' : 'FATHER OF\nCONFEDERATION?', 0, d < 0 ? 70 : 50, 26, { rot: 0, bg: d < 0 ? '#fbf8f0' : '#f4c44a' }); ctx.restore(); } ctx.restore();
        C.photo(ctx, 'louis-riel', 640, 160, 150, 167, { rot: -.03, tape: true, seed: 94 }); } });
    if (t > A.rebel) S.fact(ctx, 'depends on who you ask', k01(t, A.rebel + 1.5, .4)); if (t > A.argument) S.fact(ctx, 'the history of Canada — in one person', k01(t, A.argument, .4), { y: 60 }); C.finish(ctx, t); }

  const cut = [[A.start, sRecap, .4], [A.leader - .1, sRiel, .4], [A.y1869 - .2, sBlock, .4], [A.act - .2, sManitoba, .4], [A.ends - .1, sScott, .4], [A.troops - .2, sExile, .4], [A.fifteen - .2, sCallBack, .4], [A.sends - .2, sTroops, .4], [A.tried - .2, sTrial, .4], [A.nov7 - .2, sSpike, .4], [A.nine - .2, sNine, .5], [A.english - .2, sLegacy, .4]];
  F.chapter({ cut, sfx: [{ t: A.without, type: 'scratch', gain: .35 }, { t: A.mood + .5, type: 'press', gain: .4 }, { t: A.works, type: 'press', gain: .4 }, { t: A.deal, type: 'press', gain: .45 }, { t: A.somebody, type: 'slide', gain: .4 }, { t: A.during, type: 'paper', gain: .4 }, { t: A.hated, type: 'paper', gain: .4 },
    { t: A.nwr, type: 'press', gain: .4 }, { t: A.sends, type: 'rattle', gain: .35 }, { t: A.batoche - .3, type: 'boom', gain: .35 }, { t: A.tried + .8, type: 'press', gain: .45 }, { t: A.lastspike, type: 'clang', gain: .45 }, { t: A.lastspike + 1.2, type: 'clang', gain: .4 }, { t: A.nine, type: 'thud', gain: .35 }, { t: A.french2, type: 'paper', gain: .35 }],
    moods: [{ t: A.start, mood: 'still' }, { t: A.y1869, mood: 'tense' }, { t: A.act, mood: 'still' }, { t: A.ends, mood: 'mystery' }, { t: A.fifteen, mood: 'tense' }, { t: A.nov7, mood: 'still' }, { t: A.nine, mood: 'silence' }, { t: A.english, mood: 'under' }] });
})(window);
