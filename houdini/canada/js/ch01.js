/* Canada — Beat 1, Before "Canada" (92–225 s): ice sheets and the land bridge; the dating fight (14,000 vs 24,000, Bluefish Caves);
 * "since time immemorial"; hundreds of nations; Haudenosaunee, Cree, Inuit; lines over people; the Vikings and the 993/1021 tree-ring trick; gym membership. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const a = (ph, from = 92) => F.at(ph, from);
  const A = { start: 92.4, ice: a('during the last ice'), siberia: a('but siberia'), walked: a('and people walked'), when: a('when historians'), mainstream: a('the mainstream view'), k14: a('14,000 years'), site: a('but at a site'), researchers: a('researchers lauriane'),
    dated: a('dated cut marks'), k24: a('24,000 years ago'), some: a('some archaeologists'), others: a("others aren't"), many: a('many indigenous'), immemorial: a('we have been here'), nobody: a('what nobody debates'), over: a('over thousands'), hundreds: a('built hundreds'),
    haud: a('the haudenosaunee'), cree: a('the cree across'), inuit: a('the inuit in'), phone: a('your phone battery'), keep: a('keep that in mind'), every: a('every map'), fast: a('fast forward'), vikings: a('vikings sail'), camp: a('set up camp'),
    coolest: a("and here's the coolest"), y992: a('back in 992'), solar: a('a massive solar'), spike: a('radiocarbon spike'), y2021: a('in 2021 a team'), wood: a('found wood'), counted: a('counted the rings'), three: a('three different trees'), same: a('same answer'),
    cut: a('they were cut in'), y471: a("that's 471"), sono: a('so no columbus'), close: a("he wasn't even"), didnt: a("the vikings didn't"), which: a('which means our'), gym: a('gym membership') };
  // 1. hard to date: calendar pages tear off and fly, the year reads "????"
  function sCalendar(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.1 }); C.bg(ctx, 'cream'); const R = rng(7);
      for (let i = 0; i < 10; i++) { const ph = clamp(lt * 1.6 - i * .35); if (ph <= 0) continue; ctx.save(); ctx.translate(640 + ph * (R() - .3) * 900, 360 - ph * 300 + ph * ph * 500); ctx.rotate(ph * (R() - .5) * 6); C.shadow(ctx, true, 6, .3); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-140, -170, 280, 340); C.shadow(ctx, false); ctx.restore(); }
      ctx.save(); ctx.translate(640, 360); C.shadow(ctx, true, 10, .4); ctx.fillStyle = '#fbf8f0'; ctx.fillRect(-140, -170, 280, 340); C.shadow(ctx, false); ctx.fillStyle = '#c23a2c'; ctx.fillRect(-140, -170, 280, 70); ctx.fillStyle = '#fff'; ctx.font = '900 40px Anton'; ctx.textAlign = 'center'; ctx.fillText('YEAR', 0, -118); ctx.fillStyle = INK; ctx.font = '900 110px Anton'; ctx.fillText('????', 0, 60); ctx.restore();
      C.scrawl(ctx, 'hard to date!', 1010, 560, 48, '#c23a2c', -.1); ctx.restore(); C.finish(ctx, t); }
  // 2. the Ice Age: white paper ice over Canada; the land bridge; people walk across
  function sIce(ctx, lt, dur, t) { const v = S.view({ lon: -125, lat: 60, s: 650, y: 360 }, { lon: -160, lat: 63, s: 950, y: 330 }, ease.inOut(clamp((t - A.siberia + 1) / 3))); const pr = C.map(ctx, v, { borders: false, fill: () => null });
    // the ice sheets: torn white paper over most of Canada
    const iceR = rng(2); ctx.save(); C.shadow(ctx, true, 10, .35); ctx.fillStyle = '#f4f8fa'; ctx.beginPath(); for (let lo = -140; lo <= -58; lo += 3) for (let la = 50; la <= 80; la += 3) { if (la < 52 && (lo < -128 || lo > -70)) continue; const [x, y, vi] = pr(lo + (iceR() - .5) * 2, la + (iceR() - .5) * 2); if (vi < 0) continue; const r = v.s * .028 * (.8 + iceR() * .5); ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 7); } ctx.fill(); C.shadow(ctx, false); ctx.restore(); { const [x, y] = pr(-100, 62); C.label(ctx, 'ICE SHEETS', x, y, 26); }
    // Beringia: a pale land strip joining Siberia and Alaska
    const bk = k01(t, A.siberia, .8); if (bk > 0) { ctx.save(); ctx.globalAlpha = bk; C.shadow(ctx, true, 6, .3); ctx.fillStyle = '#e3c99a'; ctx.beginPath(); const P1 = [[-180, 66], [-172, 69], [-162, 70], [-158, 66], [-164, 61], [-176, 60], [-182, 63]].map(p => pr(...p)); P1.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); C.shadow(ctx, false); ctx.restore(); const [lx, ly] = pr(-172, 64); C.label(ctx, 'dry land: the Bering land bridge', lx, ly + 60, 20, { rot: -.04 }); }
    const wk = k01(t, A.walked, 3); if (wk > 0) { for (let i = 0; i < 5; i++) { const u = clamp(wk * 1.2 - i * .06), lo = lerp(-185, -150, u), la = 65 + Math.sin(u * 3) * 1.5, [x, y] = pr(lo, la); C.fig(ctx, x - i * 6, y, .14, t + i, { coat: ['#8a6a48', '#6a5a4a', '#9a7a58'][i % 3], hat: 'hood', hatCol: '#c8b898', skin: '#c89070', pose: 'walk', seed: 60 + i }); } C.mapArrow(ctx, pr, [-178, 66], [-140, 58], wk, '#c23a2c', 10, .15); }
    S.date(ctx, 'THE LAST ICE AGE', k01(t, A.ice, .4)); C.finish(ctx, t); }
  // 3. historians argue — loudly: two paper scholars shouting numbers at each other
  function sArgue(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.08 }); C.bg(ctx, 'graph'); const sh = Math.sin(C.step(t) * 30) * 3;
      C.fig(ctx, 330, 700, 1.2, t, { coat: '#3a4a6a', specs: 1, hair: '#8a8a84', beard: '#8a8a84', pose: 'point', mood: 'angry', seed: 70 }); C.fig(ctx, 950, 700, 1.2, t, { coat: '#6a3a3a', specs: 1, hair: '#3a2416', hat: 'bowler', pose: 'point', flip: true, mood: 'angry', seed: 71 });
      if (t > A.mainstream) C.bubble(ctx, '14,000!', 430 + sh, 160, 54, 360, 300); if (t > A.dated) C.bubble(ctx, '24,000!!', 850 - sh, 140, 60, 920, 300);
      C.headline(ctx, 'LOUDLY', 640, 560, 70, { bg: '#c23a2c', col: '#fff', rot: -.06 + sh * .004 }); ctx.restore(); C.finish(ctx, t); }
  // 4. the evidence board: timeline 30,000 → 10,000 years ago; Bluefish Caves pin; the bone figure; DEBATED
  function sBluefish(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.05, y: 10 }); S.board(ctx, 'kraft', 11);
      S.timeline(ctx, 540, 30000, 10000, [{ v: 14000, text: '~14,000 yrs ago · mainstream', k: k01(t, A.k14 - .4, .5), up: false }, { v: 24000, text: '~24,000 yrs ago · Bluefish Caves', k: k01(t, A.k24 - .4, .5), col: '#2c5a8a', up: false }], { ends: ['30,000 years ago', '10,000 years ago'] });
      if (t > A.site) { const k = k01(t, A.site, .5); ctx.save(); ctx.translate(250, 220); ctx.rotate(-.05); ctx.scale(ease.back(k), ease.back(k)); ctx.beginPath(); ctx.rect(-170, -130, 340, 260); ctx.save(); ctx.clip(); ctx.translate(-170, -130); ctx.scale(340 / 1280, 260 / 720); C.map(ctx, { lon: -135, lat: 64, s: 3200, x: 640, y: 360 }, { fill: n => n === 'Canada' ? '#e8d8a8' : null, riverW: 6 }); const pr = C.proj({ lon: -135, lat: 64, s: 3200, x: 640, y: 360 }); C.pin(ctx, pr, -140.5, 67.15, null, 1); ctx.restore(); ctx.strokeStyle = '#fbf8f0'; ctx.lineWidth = 12; ctx.strokeRect(-170, -130, 340, 260); ctx.restore(); C.label(ctx, 'Bluefish Caves · northern Yukon', 250, 380, 22); }
      if (t > A.researchers) C.photo(ctx, 'the-bluefish-caves-cut-mark-bone-figure-', 820, 240, 520, 315, { rot: .04, tape: true, seed: 12, scale: ease.back(k01(t, A.researchers, .5)) });
      if (t > A.researchers) C.label(ctx, 'Bourgeon · Burke · Higham (2017)', 820, 430, 20, { rot: -.02 });
      C.stamp(ctx, 'DEBATED', 1010, 470, 60, -.12, k01(t, A.others, .4)); if (t > A.some) C.scrawl(ctx, 'cut marks by humans?', 560, 110, 34, '#c23a2c', -.04);
      ctx.restore(); C.finish(ctx, t); }
  // 5. since time immemorial: elders around a fire at night, the words written in the smoke
  function sImmemorial(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.12, y: 20 }); C.bg(ctx, 'night'); for (let i = 0; i < 80; i++) { const R = rng(i + 3); ctx.fillStyle = `rgba(255,255,240,${.4 + .4 * Math.sin(t * 2 + i)})`; ctx.fillRect(R() * 1280, R() * 330, 2, 2); }
      C.hills(ctx, 430, ['#1e2a3c', '#16202e'], 5, 50); for (let i = 0; i < 10; i++) C.pine(ctx, 40 + i * 140, 470, .9, '#0e1820'); C.pc(ctx, '#1a1e22', c => c.rect(-60, 600, 1400, 200));
      S.campfire(ctx, 640, 640, 1, t); const ppl = [[400, 1, { coat: '#7a4a2a', long_hair: 1, hair: '#2a2420', skin: '#b88060' }], [520, 1, { coat: '#5a3a2a', braid: 1, hair: '#1a1410', skin: '#c08868' }], [780, -1, { coat: '#6a5040', hair: '#8a8a84', long_hair: 1, skin: '#b07a5a' }], [900, -1, { coat: '#4a3a30', hat: 'feather', skin: '#c08868' }]];
      ppl.forEach(([x, f, o], i) => C.fig(ctx, x, 690, .85, t, Object.assign({ pose: 'sit', flip: f < 0, seed: 80 + i, mood: 'calm' }, o)));
      if (t > A.immemorial) C.scrawl(ctx, '"We have been here since time immemorial."', 640, 160, 40, '#f4e2b0', -.02); else if (t > A.many) C.label(ctx, 'Many Indigenous oral traditions', 640, 160, 26); ctx.restore(); C.finish(ctx, t, { vig: .55 }); }
  // 6. hundreds of nations spread across the north: map with paper dots and nation names
  function sNations(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -95, lat: 55, s: 760, x: 640, y: 380 }, { fill: () => null, borders: false }); const R = rng(4), k = k01(t, A.over, 4);
    for (let i = 0; i < 160; i++) { const lo = -150 + R() * 95, la = 44 + R() * 30, d = R(); if (d > k) continue; const [x, y, vi] = pr(lo, la); if (vi < 0) continue; ctx.fillStyle = ['#c23a2c', '#e8a030', '#2c5a8a', '#3a7a4a', '#7a3a7a'][i % 5]; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); }
    const N = [['Haida', -132, 53], ['Nuu-chah-nulth', -126, 49.5], ['Dene', -118, 62], ['Blackfoot', -112, 50], ['Cree', -100, 55], ['Anishinaabe', -86, 48], ['Haudenosaunee', -76, 43.5], ["Mi'kmaq", -63, 46], ['Innu', -64, 53], ['Inuit', -88, 66]];
    N.forEach(([n, lo, la], i) => { const kk = clamp((t - A.hundreds) * 2 - i * .25); if (kk > 0) { const [x, y] = pr(lo, la); C.label(ctx, n, x, y, 18, { rot: (i % 2 ? .04 : -.04) }); } });
    if (t > A.hundreds) S.bigNum(ctx, 'HUNDREDS OF NATIONS', 640, 660, 52, k01(t, A.hundreds, .4)); C.finish(ctx, t); }
  // 7. Haudenosaunee: longhouse photo + paper longhouses and corn; 8. Cree: winter camp photo + bison; 9. Inuit: igloo, kayak, the dying phone
  function sHaud(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0, x: -20 }, { z: 1.06, x: 30 }); C.bg(ctx, 'sky'); C.hills(ctx, 420, ['#8aa86a', '#6f8f4a'], 9, 50); for (let i = 0; i < 8; i++) C.pine(ctx, 60 + i * 170, 450, .7, '#2f5a3a');
      S.longhouse(ctx, 330, 610, 1.1); S.longhouse(ctx, 820, 590, .8); for (let i = 0; i < 14; i++) S.corn(ctx, 560 + i * 50, 690 + (i % 2) * 10, 1.1);
      C.photo(ctx, 'haudenosaunee-longhouses', 1020, 200, 330, 230, { rot: .05, tape: true, seed: 13, caption: 'longhouse frame (museum reconstruction)', capSize: 14 });
      C.fig(ctx, 160, 720, .85, t, { coat: '#8a5a34', braid: 1, hair: '#1a1410', skin: '#c08868', pose: 'hold', seed: 90 }); C.fig(ctx, 480, 720, .8, t, { coat: '#6a4a2a', hair: '#1a1410', hairStyle: 'bald', skin: '#b88060', pose: 'walk', seed: 91 });
      C.label(ctx, 'HAUDENOSAUNEE · the east · farms & longhouses', 470, 90, 24); ctx.restore(); C.finish(ctx, t); }
  function sCree(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.05 }, { z: 1.0 }); C.bg(ctx, 'sky'); C.hills(ctx, 460, ['#c8b878', '#a89858'], 4, 20); for (let i = 0; i < 6; i++) C.pine(ctx, 900 + i * 70, 470, .8, '#2f5a3a');
      const gx = (C.step(t) * 30) % 200; for (let i = 0; i < 6; i++) S.bison(ctx, 60 + i * 230 - gx, 620 + (i % 2) * 50, .7, t, false);
      C.photo(ctx, 'cree-winter-camp', 920, 260, 420, 280, { rot: -.04, tape: true, seed: 14, caption: 'a winter camp in the woods', capSize: 16 });
      C.label(ctx, 'CREE · across the woodlands and plains', 420, 90, 26); ctx.restore(); C.finish(ctx, t); }
  function sInuit(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.08 }); C.bg(ctx, 'ice'); C.pc(ctx, '#f4f8fa', c => { c.moveTo(-60, 470); c.quadraticCurveTo(640, 430, 1340, 480); c.lineTo(1340, 800); c.lineTo(-60, 800); c.closePath(); });
      S.sea(ctx, 560, t, '#4a7a9a'); C.pc(ctx, '#f4f8fa', c => { c.moveTo(-60, 600); c.lineTo(500, 590); c.lineTo(560, 800); c.lineTo(-60, 800); c.closePath(); }); S.igloo(ctx, 240, 620, 1); S.kayak(ctx, 820, 640, 1, t);
      C.fig(ctx, 420, 720, .9, t, { coat: '#d8c8a8', hat: 'hood', hatCol: '#e8e0d0', skin: '#c89070', mood: 'happy', pose: 'wave', seed: 95 }); S.snow(ctx, t, 50, 6);
      if (t > A.phone) { const p = clamp(1 - (t - A.phone) / 2.5); S.phone(ctx, 1080, 300, 1.1, p, .1); if (p <= 0) C.scrawl(ctx, 'dead in 4 minutes', 1080, 470, 30, '#c23a2c', -.06); }
      C.label(ctx, 'INUIT · the Arctic · thriving', 420, 90, 26); ctx.restore(); C.finish(ctx, t); }
  // 10. every map you're about to see draws lines over people who were already there
  function sLines(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -95, lat: 55, s: 760, x: 640, y: 380 }, { fill: () => null, borders: false }); const R = rng(4);
    for (let i = 0; i < 160; i++) { const lo = -150 + R() * 95, la = 44 + R() * 30; R(); const [x, y, vi] = pr(lo, la); if (vi < 0) continue; ctx.fillStyle = ['#c23a2c', '#e8a030', '#2c5a8a', '#3a7a4a', '#7a3a7a'][i % 5]; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); }
    const k = k01(t, A.every, 2.5); ctx.save(); ctx.strokeStyle = '#1e1a18'; ctx.lineWidth = 5; ctx.setLineDash([16, 8]); const L = [[[-141, 70], [-141, 60]], [[-123, 49], [-95, 49]], [[-95, 49], [-80, 45]], [[-110, 60], [-110, 49]], [[-102, 60], [-102, 49]], [[-120, 60], [-60, 60]]]; L.forEach(([p, q], i) => { const kk = clamp(k * 6 - i); if (kk <= 0) return; const [x0, y0] = pr(...p), [x1, y1] = pr(...q); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, kk), lerp(y0, y1, kk)); ctx.stroke(); }); ctx.restore();
    // a ruler and pencil drawing them
    ctx.save(); const [rx, ry] = pr(-110, 52); ctx.translate(rx + Math.sin(t * 2) * 60, ry); ctx.rotate(-.3); C.pc(ctx, '#e8c040', c => c.rect(-300, -20, 600, 40)); ctx.fillStyle = INK; for (let i = 0; i < 30; i++) ctx.fillRect(-300 + i * 20, -20, 2, i % 5 ? 10 : 18); ctx.restore();
    C.label(ctx, 'every map draws lines over people who were already there', 640, 660, 22); C.finish(ctx, t); }
  // 11. the Vikings: a striped-sail ship from Greenland to Newfoundland; the L'Anse aux Meadows photo
  function sVikings(ctx, lt, dur, t) { const v = S.view({ lon: -50, lat: 58, s: 1300, y: 330 }, { lon: -56, lat: 52, s: 1900, y: 330 }, ease.inOut(clamp(lt / dur))); const pr = C.map(ctx, v, { fill: n => n === 'Greenland' ? '#e8eef2' : null });
    const k = k01(t, A.vikings, 2.6); C.mapArrow(ctx, pr, [-50, 64], [-55.5, 51.6], k, '#c23a2c', 10, -.2); const u = clamp(k), [sx, sy] = pr(lerp(-48, -55, u), lerp(63, 52.2, u) + Math.sin(u * 3)); C.ship(ctx, sx + 30, sy, .4, t, { viking: true, sail: '#f4ecd8' });
    if (t > A.camp) { C.pin(ctx, pr, -55.53, 51.6, "L'Anse aux Meadows", k01(t, A.camp, .4), { dy: 50 }); C.photo(ctx, 'lanse-aux-meadows-newfoundland', 360, 220, 400, 300, { rot: -.05, tape: true, seed: 15, scale: ease.back(k01(t, A.camp + .4, .5)), caption: "L'Anse aux Meadows, Newfoundland", capSize: 16 }); }
    S.date(ctx, '~1,000 years ago', k01(t, A.fast, .4)); C.finish(ctx, t); }
  // 12. the dating trick: a paper sun flares (993); a tree-ring slice with the spike ring; the Kuitems et al. chart; three stumps; 1021
  function sRings(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.05 }); C.bg(ctx, 'black');
      const fl = k01(t, A.solar, .6); C.sun(ctx, 230, 200, 70 + fl * 30 + Math.sin(C.step(t) * 20) * 6 * fl, '#f4c44a'); if (fl > 0) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(230, 200, 20, 230, 200, 400); g.addColorStop(0, `rgba(255,200,80,${.6 * fl})`); g.addColorStop(1, 'rgba(255,200,80,0)'); ctx.fillStyle = g; ctx.fillRect(-200, -200, 900, 900); ctx.restore(); C.label(ctx, 'a massive solar storm', 230, 340, 22); }
      // the ring slice
      const cx = 720, cy = 400, rk = k01(t, A.spike - .3, .6); ctx.save(); C.shadow(ctx, true, 10, .45); C.pc(ctx, '#c8a070', c => c.arc(cx, cy, 230, 0, 7), false); C.shadow(ctx, false); ctx.strokeStyle = '#8a5a34'; ctx.lineWidth = 2; for (let r = 10; r < 230; r += 9) { ctx.beginPath(); ctx.arc(cx + Math.sin(r) * 3, cy, r, 0, 7); ctx.stroke(); } ctx.strokeStyle = '#5a3a20'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(cx, cy, 236, 0, 7); ctx.stroke();
      if (rk > 0) { ctx.strokeStyle = '#d8241a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, 160, 0, Math.PI * 2 * rk); ctx.stroke(); C.label(ctx, 'the 993 spike', cx - 160, cy - 180, 22, { bg: '#f4c44a' }); }
      const ck = k01(t, A.counted, 2.4); if (ck > 0) { const n = Math.round(ck * 28); ctx.save(); ctx.fillStyle = '#d8241a'; for (let i = 0; i < n; i++) { const r = 165 + i * 2.4; ctx.beginPath(); ctx.arc(cx + r, cy, 3, 0, 7); ctx.fill(); } ctx.restore(); C.label(ctx, `+${n} rings → to the bark`, cx + 230, cy + 60, 22); } ctx.restore();
      if (t > A.y2021 && t < A.counted) C.photo(ctx, 'the-tree-ring-chart-from-kuitems-et-al-n', 1080, 330, 250, 350, { rot: .05, tape: true, seed: 16, scale: ease.back(k01(t, A.y2021, .5)), caption: 'Kuitems et al., Nature 2021', capSize: 14 });
      if (t > A.wood && t < A.counted) C.label(ctx, 'wood cut with METAL tools', 300, 560, 24, { bg: '#f4c44a' });
      if (t > A.three) { for (let i = 0; i < 3; i++) { const k = k01(t, A.three + i * .2, .4); if (k <= 0) continue; ctx.save(); ctx.translate(180 + i * 150, 620); ctx.scale(ease.back(k), ease.back(k)); C.pc(ctx, '#8a5a34', c => c.rect(-40, -60, 80, 60)); C.pc(ctx, '#c8a070', c => c.ellipse(0, -60, 40, 14, 0, 0, 7)); ctx.restore(); } if (t > A.same) C.scrawl(ctx, '= = =', 330, 520, 50, '#f4c44a', 0); }
      if (t > A.cut) { S.bigNum(ctx, 'AD 1021', 900, 160, 90, k01(t, A.cut + .3, .4)); S.fact(ctx, '1021 AD — Nature, 2021', k01(t, A.cut + .6, .4)); }
      ctx.restore(); C.finish(ctx, t); }
  // 13. 471 years before Columbus: a timeline 1000→1500, Columbus's ship arrives late
  function sColumbus(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.0 }, { z: 1.05 }); C.bg(ctx, 'sky'); S.sea(ctx, 520, t);
      const X = S.timeline(ctx, 170, 1000, 1500, [{ v: 1021, text: 'Vikings · 1021', up: false, k: 1 }, { v: 1492, text: 'Columbus · 1492', up: false, col: '#2c5a8a', k: k01(t, A.y471 + .5, .5) }], { ends: ['1000', '1500'] });
      C.ship(ctx, 200, 520, .55, t, { viking: true }); const ck = k01(t, A.y471 + .5, 3); C.ship(ctx, lerp(1500, 1000, ease.out(ck)), 540, .6, t, { flag: '#c23a2c', sail: '#f4ecd8' });
      if (t > A.y471) { ctx.save(); ctx.strokeStyle = '#c23a2c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(1021), 220); ctx.lineTo(X(1492), 220); ctx.stroke(); ctx.restore(); S.bigNum(ctx, '471 YEARS', (X(1021) + X(1492)) / 2, 300, 60, k01(t, A.y471, .4)); }
      if (t > A.close) C.scrawl(ctx, 'not even close', 1000, 660, 44, '#c23a2c', -.05); ctx.restore(); C.finish(ctx, t); }
  // 14. the Vikings didn't stay: a gym membership card, stamped CANCELLED
  function sGym(ctx, lt, dur, t) { ctx.save(); C.cam(ctx, lt, dur, { z: 1.1 }, { z: 1.0 }); C.bg(ctx, 'kraft');
      ctx.save(); ctx.translate(640, 360); ctx.rotate(-.05); C.shadow(ctx, true, 12, .45); ctx.fillStyle = '#fbf8f0'; ctx.beginPath(); ctx.roundRect(-330, -200, 660, 400, 26); ctx.fill(); C.shadow(ctx, false); ctx.fillStyle = '#2c5a8a'; ctx.beginPath(); ctx.roundRect(-330, -200, 660, 110, [26, 26, 0, 0]); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '900 54px Anton'; ctx.textAlign = 'center'; ctx.fillText('VINLAND FITNESS', 0, -125);
      ctx.fillStyle = INK; ctx.font = '400 28px "Special Elite"'; ctx.textAlign = 'left'; ['MEMBER: Norse explorers', 'JOINED: ~1021', 'VISITS: a few', 'STATUS: did not renew'].forEach((l, i) => ctx.fillText(l, -290, -30 + i * 46)); ctx.restore();
      C.ship(ctx, 1100, 640, .4, t, { viking: true, flip: true }); C.stamp(ctx, 'CANCELLED', 700, 420, 84, -.15, k01(t, A.which + .5, .4)); ctx.restore(); C.finish(ctx, t); }

  const cut = [[A.start, sCalendar, .3], [A.ice - .2, sIce, .4], [A.when - .2, sArgue, .3], [A.mainstream + 3.2, sBluefish, .4], [A.many - .2, sImmemorial, .5], [A.nobody - .1, sNations, .4], [A.haud - .2, sHaud, .3], [A.cree - .2, sCree, .3], [A.inuit - .2, sInuit, .3],
    [A.keep - .1, sLines, .3], [A.fast - .2, sVikings, .4], [A.coolest, sRings, .4], [A.y471 - .3, sColumbus, .3], [A.didnt - .2, sGym, .3]];
  F.chapter({ cut, sfx: [{ t: A.start + .3, type: 'paper', gain: .4 }, { t: A.start + .9, type: 'paper', gain: .3 }, { t: A.mainstream, type: 'hit', gain: .3 }, { t: A.dated, type: 'hit', gain: .35 }, { t: A.others, type: 'press', gain: .4 }, { t: A.solar, type: 'boom', gain: .35 }, { t: A.three, type: 'thud', gain: .3 },
    { t: A.cut + .3, type: 'press', gain: .45 }, { t: A.y471, type: 'swell', gain: .3 }, { t: A.which + .5, type: 'press', gain: .45 }],
    moods: [{ t: A.start, mood: 'still' }, { t: A.many, mood: 'mystery' }, { t: A.nobody, mood: 'still' }, { t: A.coolest, mood: 'tense' }, { t: A.y471, mood: 'still' }] });
})(window);
