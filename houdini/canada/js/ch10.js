/* Canada — Beat 10, the people never at the table (890.3–1002.6 s): Chinese railway workers in the BC mountains; the $50 head tax (1885),
 * $500 in 1903, families split; 1 July 1923 the exclusion act — Humiliation Day — until 1947, apology 2006; reserves and broken treaties;
 * residential schools 1880s–1996; the TRC 2015, "cultural genocide"; the empty chair at the deal table. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const a = (ph, from = 886) => F.at(ph, from);
  const A = { start: a('that railway was'), dangerous: a('most dangerous sections'), china: a('workers from china'), soon: a('and as soon as'), tax: a('head tax'), noother: a('no other group'), y1903: a('in 1903 it went'), wages: a('two years'), families: a('families were split'),
    july: a('then on july'), banned: a('banned almost all'), humiliation: a('humiliation day'), lasted: a('the ban lasted'), apol: a('formally apologized'), same: a('and at the same time'), reserves: a('onto reserves'), broken: a('often broken'), system: a('another system'),
    schools: a('residential schools'), n150: a('more than 150,000'), taken: a('were taken from'), purpose: a('main purpose'), abused: a('many were abused'), died: a('thousands died'), records: a('poor records'), last: a('the last school'), not: a('not 1896'),
    trc: a('in 2015 the truth'), genocide: a('cultural genocide'), these: a('these were the people'), never: a('never at the table'), paid: a('paid for in part'), end: a('in 1914 when') };
  const pick = (cc) => { P.ink(cc, '#6a4428', c2 => c2.rect(-3, -64, 6, 76), 2); P.cel(cc, c2 => { c2.moveTo(-34, -60); c2.quadraticCurveTo(0, -78, 34, -60); c2.lineTo(30, -56); c2.quadraticCurveTo(0, -68, -30, -56); c2.closePath(); }, '#5a5a60', { dx: 0, dy: 0, lw: 2 }); };
  // 1. the railway through the BC mountains: Chinese workers cutting a ledge, a blast of rock dust
  function sWorkers(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.08, x: 30 }, { z: 1.0, x: -20 }); Cn.layer(ctx, c, 1, () => { S.rockies(ctx, t, { pal: 'golden' });
      // the rock face and the ledge
      P.cel(ctx, cc => { cc.moveTo(-300, 900); cc.lineTo(-300, 420); cc.lineTo(200, 380); cc.lineTo(520, 470); cc.lineTo(520, 640); cc.lineTo(1600, 640); cc.lineTo(1600, 900); cc.closePath(); }, '#8a7a6a', { shade: '#5a4a3e', light: '#a89888', dx: 20, dy: 0, lw: 4 }); S.rails(ctx, 640, t);
      Cn.smoke(ctx, 300, 430, .9, t, { col: '200,190,176', n: 12, speed: .3 });
      for (let i = 0; i < 5; i++) { const x = 600 + i * 140; C.fig(ctx, x, 690, .7, t * 1.4 + i, Object.assign(PP.chinese(i), { pose: i % 2 ? 'pry' : 'haul', flip: i === 4 })); }
      for (let i = 0; i < 3; i++) C.fig(ctx, 100 + i * 120, 470 - i * 10, .5, t + i, Object.assign(PP.chinese(i + 2), { pose: 'pry' })); });
    S.date(ctx, '1880s · BRITISH COLUMBIA', 1); if (t > A.china) S.fact(ctx, 'thousands of workers from China built some of the most dangerous sections', k01(t, A.china, .4)); C.finish(ctx, t); }
  // 2. the head tax: the certificate pinned up, a price tag that jumps from $50 to $500
  function sTax(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      C.photo(ctx, 'a-chinese-head-tax-certificate', 440, 300, 520, 365, { rot: -.03, tape: true, seed: 101, caption: 'A head tax certificate ($500), 1923', capSize: 16 });
      const big = t > A.y1903; ctx.save(); ctx.translate(1000, 260); ctx.rotate(Math.sin(C.step(t) * 3) * .06 + .1); const s = big ? 1 + (1 - ease.out(k01(t, A.y1903, .4))) * .5 : ease.back(k01(t, A.tax - .4, .4)); ctx.scale(s, s);
      P.cel(ctx, cc => { cc.moveTo(-90, -60); cc.lineTo(110, -60); cc.lineTo(110, 60); cc.lineTo(-90, 60); cc.lineTo(-140, 0); cc.closePath(); }, '#f4ecd8', { dx: 5, dy: 5, lw: 3 }); P.ink(ctx, '#c8b898', cc => cc.arc(-100, 0, 10, 0, 7), 2); ctx.fillStyle = big ? '#c23a2c' : INK; ctx.font = '900 64px Anton'; ctx.textAlign = 'center'; ctx.fillText(big ? '$500' : '$50', 20, 22); ctx.restore();
      if (t > A.tax) C.label(ctx, big ? '1903' : '1885', 1010, 370, 24); if (t > A.wages) C.scrawl(ctx, 'about 2 years of a labourer\'s wages', 1000, 450, 30); });
    if (t > A.noother && t < A.y1903) S.fact(ctx, 'every Chinese immigrant — no other group had to pay it', k01(t, A.noother, .4)); C.finish(ctx, t); }
  // 3. families split: a man on a Vancouver dock; across the ocean a woman and child on another
  function sFamilies(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.04 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'sunset', t, { horizon: 430, sun: [640, 380], sunR: 50, seed: 361 })); Cn.layer(ctx, c, 1, () => { Cn.water(ctx, -300, 430, 1600, 900, t, { pal: 'sunset' });
      for (const [x0, x1] of [[-300, 330], [950, 1600]]) { P.cel(ctx, cc => cc.rect(x0, 560, x1 - x0, 30), '#8a6040', { shade: '#5a3a20', dx: 0, dy: 6, lw: 3 }); for (let x = x0 + 30; x < x1; x += 90) P.ink(ctx, '#5a3a20', cc => cc.rect(x, 590, 14, 140), 2); }
      C.fig(ctx, 230, 560, .8, t, Object.assign(PP.chinese(0), { hat: null, mood: 'sad', flip: false, seed: 371 })); C.fig(ctx, 1080, 560, .8, t, { kind: 'woman', cloth: '#6a4a5a', hair: '#1a1410', hairStyle: 'bun', skin: '#e8c090', mood: 'sad', flip: true, seed: 372 }); C.fig(ctx, 1170, 560, .48, t, Object.assign(PP.child(0), { skin: '#e8c090', flip: true }));
      C.label(ctx, 'CANADA', 180, 640, 20); C.label(ctx, 'CHINA', 1180, 640, 20); });
    S.fact(ctx, 'families split for decades — men couldn\'t afford to bring wives and children', k01(t, A.families, .4)); C.finish(ctx, t); }
  // 4. 1 July 1923: the calendar page — Dominion Day crossed out, Humiliation Day; the ban 1923–1947; apology 2006
  function sBan(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      ctx.save(); ctx.translate(380, 290); ctx.rotate(-.04); C.shadow(ctx, true, 10, .4); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-170, -200, 340, 400); C.shadow(ctx, false); ctx.fillStyle = '#c23a2c'; ctx.fillRect(-170, -200, 340, 80); ctx.fillStyle = '#fff'; ctx.font = '900 46px Anton'; ctx.textAlign = 'center'; ctx.fillText('JULY 1923', 0, -142); ctx.fillStyle = INK; ctx.font = '900 190px Anton'; ctx.fillText('1', 0, 90); ctx.font = '22px "Special Elite"'; ctx.fillText('Dominion Day', 0, 150);
      if (t > A.humiliation) C.marker(ctx, 'x', [0, 142, 40], k01(t, A.humiliation, .4)); ctx.restore(); if (t > A.humiliation) C.scrawl(ctx, 'HUMILIATION DAY', 390, 560, 44, '#c23a2c', -.06);
      if (t > A.banned) { ctx.save(); ctx.globalAlpha = k01(t, A.banned, .4); ['CHINESE IMMIGRATION ACT', 'almost all Chinese', 'immigration BANNED'].forEach((l, i) => C.headline(ctx, l, 930, 150 + i * 56, i ? 30 : 34, { rot: .03 - i * .02, bg: i === 2 ? '#f4c44a' : '#fbf8f0' })); ctx.restore(); }
      if (t > A.lasted) S.timeline(ctx, 450, 1920, 2010, [{ v: 1923, text: '1923 ban', k: 1, size: 20 }, { v: 1947, text: '1947 ends', size: 20, k: k01(t, A.lasted, .5) }, { v: 2006, text: '2006 apology', size: 20, k: k01(t, A.apol, .5) }].map(m => Object.assign(m, { up: false })), { x0: 680, x1: 1120 }); });
    S.date(ctx, '1 JULY 1923', 1); C.finish(ctx, t); }
  // 5. the West: First Nations pushed onto reserves; a treaty torn in two
  function sReserves(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 450, seed: 371 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 440, ['#8a8a5a', '#6a7048'], 5, 24));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 520, 1900, 400), '#9a9858', { dx: 0, dy: 0, lw: 0 }); for (let x = 560; x < 1500; x += 110) { P.ink(ctx, '#6a4a2a', cc => cc.rect(x, 560, 10, 110), 2); } ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 3; for (const y of [580, 620]) { ctx.beginPath(); ctx.moveTo(560, y); ctx.lineTo(1500, y + 4); ctx.stroke(); }
      P.ink(ctx, '#6a4a2a', cc => cc.rect(600, 460, 8, 210), 0); P.cel(ctx, cc => cc.rect(530, 440, 160, 50), '#d8c8a0', { dx: 0, dy: 4, lw: 3 }); C.label(ctx, 'RESERVE', 610, 466, 20);
      for (let i = 0; i < 4; i++) C.fig(ctx, 760 + i * 130, 700, .66, t + i, Object.assign(PP.cree(i), { mood: 'sad', flip: true }));
      // the treaty: two halves pulling apart
      const k = k01(t, A.broken, 1); for (const d of [-1, 1]) { ctx.save(); ctx.translate(300 + d * 70 * ease.out(k), 300); ctx.rotate(d * .12 * k); ctx.beginPath(); ctx.rect(d < 0 ? -140 : 0, -110, 140, 220); ctx.clip(); C.shadow(ctx, true, 8, .35); ctx.fillStyle = '#efe0b8'; ctx.fillRect(-140, -110, 280, 220); C.shadow(ctx, false); ctx.fillStyle = INK; ctx.font = '900 34px Anton'; ctx.textAlign = 'center'; ctx.fillText('TREATY', 0, -60); ctx.globalAlpha = .35; for (let i = 0; i < 6; i++) ctx.fillRect(-110, -30 + i * 20, 220 - (i % 2) * 40, 4); ctx.restore(); } });
    if (t > A.reserves) S.fact(ctx, 'First Nations pushed onto reserves — under treaties that were often broken', k01(t, A.reserves, .4)); C.finish(ctx, t); }
  // a residential school: a long grim brick building with a bell tower
  const school = (ctx, x, y) => { P.cel(ctx, cc => cc.rect(x - 380, y - 200, 760, 200), '#8a4a3a', { shade: '#5a2a24', light: '#a8604a', dx: 30, dy: 0, lw: 4 }); P.cel(ctx, cc => { cc.moveTo(x - 400, y - 196); cc.lineTo(x - 360, y - 250); cc.lineTo(x + 360, y - 250); cc.lineTo(x + 400, y - 196); cc.closePath(); }, '#3a3a40', { dx: 10, dy: 0, lw: 4 });
    P.cel(ctx, cc => cc.rect(x - 50, y - 330, 100, 130), '#8a4a3a', { shade: '#5a2a24', dx: 14, dy: 0, lw: 4 }); P.cel(ctx, cc => { cc.moveTo(x - 64, y - 326); cc.lineTo(x, y - 400); cc.lineTo(x + 64, y - 326); cc.closePath(); }, '#3a3a40', { dx: 6, dy: 0, lw: 4 }); P.ink(ctx, '#2a2a30', cc => { cc.rect(x - 3, y - 440, 6, 44); cc.rect(x - 16, y - 428, 32, 6); }, 0);
    for (let r = 0; r < 2; r++) for (let i = -6; i <= 6; i++) if (i) P.ink(ctx, '#3a4a5a', cc => cc.rect(x + i * 54 - 14, y - 180 + r * 80, 28, 44), 3); P.cel(ctx, cc => cc.rect(x - 30, y - 80, 60, 80), '#3a2418', { dx: 0, dy: 0, lw: 3 }); };
  // 6. residential schools: children walking from their families toward the school
  function sSchool(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: 20 }, { z: 1.06, x: -20 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, 'storm', t, { horizon: 470, seed: 381 })); Cn.layer(ctx, c, .4, () => C.hills(ctx, 460, ['#6a7a5a', '#5a6a4a'], 5, 24));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 540, 1900, 400), '#7a8a5a', { dx: 0, dy: 0, lw: 0 }); school(ctx, 880, 560);
      const go = clamp((t - A.taken) / 9), reach = t > A.taken + .4;
      for (let i = 0; i < 3; i++) C.fig(ctx, 90 + i * 90 + (reach && i === 1 ? 30 : 0), 700, .7, t + i, Object.assign(i === 1 ? PP.cree(1) : PP.metis(i), { mood: 'sad', flip: false, still: true, pose: reach ? (i === 1 ? 'point' : i === 0 ? 'chin' : 'hold') : 'stand', eyes: reach && i === 1 ? 'wide' : undefined }));
      // before they are taken the children stand with their families; then an official leads them to the school
      for (let i = 0; i < 5; i++) { const x0 = 330 + i * 52, x = lerp(x0, 640 + i * 58, ease.inOut(go)), moving = go > 0 && go < 1; C.fig(ctx, x, 700 + (i % 2) * 12, .42, t * 1.2 + i, Object.assign(PP.child(i), { pose: moving ? 'walk' : 'stand', mood: 'sad', flip: !moving && go < .5, still: true, turn: go === 0 ? -.45 : undefined })); }
      if (t > A.taken - 1.5) { const u = clamp((t - A.taken + 1.5) / 1.5), x = go > 0 ? lerp(330 + 5 * 52 + 50, 960, ease.inOut(go)) : lerp(1200, 610, ease.out(u)); C.fig(ctx, x, 702, .66, t * 1.1, { coat: '#1e1e24', pants: '#2a2a30', hat: 'top', mood: 'calm', mustache: '#3a2a20', pose: go > 0 && go < 1 ? 'walk' : (u < 1 ? 'walk' : 'point'), flip: go === 0 && u < 1, seed: 383, profile: go > 0 && go < 1 }); }
      if (t > A.purpose) { const k = ease.out(clamp((t - A.purpose) / .5)); ctx.save(); ctx.translate(1110, 470); ctx.rotate(-.03); ctx.scale(k, k); P.cel(ctx, cc => cc.rect(-110, -64, 220, 128), '#2e3e34', { shade: '#1e2a22', dx: 0, dy: 0, lw: 6 }); P.ink(ctx, '#8a5a34', cc => { cc.rect(-120, -74, 240, 12); cc.rect(-120, 62, 240, 12); }, 3);
        ctx.fillStyle = '#e8eee8'; ctx.font = '700 30px "Permanent Marker"'; ctx.textAlign = 'center'; ctx.fillText('ENGLISH', 0, -10); ctx.fillText('ONLY', 0, 34); ctx.restore(); P.ink(ctx, '#5a3a24', cc => cc.rect(1106, 534, 8, 160), 0); } });
    if (t > A.abused) { ctx.save(); ctx.fillStyle = `rgba(14,18,30,${.38 * clamp((t - A.abused) / 2)})`; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); }
    S.date(ctx, '1880s – 1996', 1); const lines = [[A.schools, 'residential schools — run by the federal government with churches'], [A.n150, 'more than 150,000 First Nations, Métis and Inuit children'], [A.purpose, 'the main purpose: cut ties to language, culture and family'], [A.abused, 'many were abused · thousands died, mostly of disease and malnutrition'], [A.records, 'the exact number isn\'t known — the schools kept poor records']];
    let cur = null; for (const l of lines) if (t > l[0]) cur = l; if (cur) S.fact(ctx, cur[1], k01(t, cur[0], .4)); C.finish(ctx, t, { vig: .6 }); }
  // 7. the last school closed in 1996 — not 1896
  function sYear(ctx, lt, dur, t) { Cn.sky(ctx, 'storm', t, { horizon: 470, seed: 381 }); ctx.fillStyle = 'rgba(20,20,26,.55)'; ctx.fillRect(-300, -300, 1900, 1400);
    S.bigNum(ctx, '1996', 640, 330, 200, k01(t, A.last + 1, .3), '#fbf8f0', '#1e1a18'); if (t > A.not) { C.scrawl(ctx, 'not 1896', 640, 520, 54, '#f4c44a', -.04); }
    S.fact(ctx, 'the last residential school closed', k01(t, A.last, .4), { y: 120 }); C.finish(ctx, t, { vig: .7 }); }
  // 8. the TRC, 2015: "cultural genocide"
  function sTRC(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      ctx.save(); ctx.translate(640, 320); ctx.rotate(-.02); C.shadow(ctx, true, 10, .4); ctx.drawImage(C.paper('cream', 640, 440), -320, -220); C.shadow(ctx, false); C.tape(ctx, -260, -220, 90, -.3, 4); C.tape(ctx, 260, -220, 90, .3, 5);
      ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '22px "Special Elite"'; ctx.fillText('TRUTH AND RECONCILIATION COMMISSION OF CANADA', 0, -150); ctx.fillText('Final Report · 2015', 0, -115); ctx.fillRect(-260, -95, 520, 3);
      if (t > A.genocide - .3) { ctx.font = '900 82px Anton'; ctx.fillStyle = '#7a1a14'; ctx.globalAlpha = k01(t, A.genocide - .3, .4); ctx.fillText('"CULTURAL', 0, 10); ctx.fillText('GENOCIDE"', 0, 100); } ctx.restore(); });
    C.finish(ctx, t); }
  // 9. the empty chair: never at the table
  function sChair(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.12, y: -20 }); Cn.layer(ctx, c, 1, () => S.dealTable(ctx, t, { people: [{ x: 300, face: 'macdonald' }, { x: 980, ...PP.politician(1), flip: true }], chairs: 1, chairX: () => 640, doc: 'THE DEAL' }));
    P.caption(ctx, 'These were the people who were never at the table.', k01(t, A.these, .4), { size: 30, x: 640, y: 676, align: 'center' }); if (t > A.paid) P.caption(ctx, 'And the deal was paid for, in part, by them.', k01(t, A.paid, .4), { size: 30, x: 640, y: 60, align: 'center' }); C.finish(ctx, t, { vig: .7 }); }

  const cut = [[A.start, sWorkers, .4], [A.soon - .1, sTax, .4], [A.families - .1, sFamilies, .4], [A.july - .1, sBan, .4], [A.same - .1, sReserves, .4], [A.system - .1, sSchool, .5], [A.last - .1, sYear, .5], [A.trc - .1, sTRC, .4], [A.these - .2, sChair, .5]];
  F.chapter({ cut, sfx: [{ t: A.taken - 1.5, type: 'steps', gain: .3 }, { t: A.taken + .4, type: 'gasp', gain: .25 }, { t: A.purpose, type: 'knock', gain: .3 }, { t: A.start + .5, type: 'clang', gain: .3 }, { t: A.tax - .4, type: 'paper', gain: .35 }, { t: A.y1903, type: 'hit', gain: .45 }, { t: A.humiliation, type: 'scratch', gain: .4 }, { t: A.broken, type: 'paper', gain: .45 }, { t: A.last + 1, type: 'thud', gain: .4 }, { t: A.genocide - .3, type: 'thud', gain: .35 }],
    moods: [{ t: A.start, mood: 'under' }, { t: A.same, mood: 'mystery' }, { t: A.system, mood: 'silence' }, { t: A.these, mood: 'under' }] });
})(window);
