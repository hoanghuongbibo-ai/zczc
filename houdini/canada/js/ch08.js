/* Canada — Beat 8, Canada goes shopping (710.6–750.4 s): the HBC hands Rupert's Land to the Crown, the Crown passes it to Canada;
 * £300,000 plus land for the company; the largest land purchase in Canadian history (Deal #3); nobody asked the ~11,000 people at Red River. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK } = C, k01 = S.k01;
  const a = (ph, from = 705) => F.at(ph, from);
  const A = { start: a('so canada goes shopping'), hands: a("hands rupert's"), crown: a('back to the british crown'), passes: a('which passes it'), pays: a('canada pays'), plus: a('plus millions'), largest: a("it's the largest land"),
    did: a('and canada did what canada does', 727), deal: a('it made a deal', 727), problem: a("there's just one problem"), nobody: a('nobody asked'), people: a('11,000 people'), red: a('red river settlement'), mixed: a('people of mixed'), own: a('with their own language') };
  // the deed: a rolled scroll marked RUPERT'S LAND
  const deed = (ctx, x, y, s = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P.cel(ctx, c => c.rect(-60, -22, 120, 44), '#efe0b8', { shade: '#c8b080', dx: 0, dy: 6, lw: 3 }); for (const d of [-1, 1]) P.cel(ctx, c => c.ellipse(d * 62, 0, 10, 24, 0, 0, 7), '#d8c498', { dx: 0, dy: 0, lw: 3 }); ctx.fillStyle = INK; ctx.font = '700 13px "Special Elite"'; ctx.textAlign = 'center'; ctx.fillText("RUPERT'S LAND", 0, 5); P.ink(ctx, '#b8322a', c => c.arc(30, 16, 8, 0, 7), 2); ctx.restore(); };
  // 1. the hand-off: HBC governor → the Crown → Canada (Macdonald), in a panelled office
  function sHandoff(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.04, x: -20 }, { z: 1.0, x: 20 }); Cn.layer(ctx, c, 1, () => { S.room(ctx, t, { wall: '#c8b48a', window: true, wx: 1040, sky: 'golden' });
      C.photo(ctx, 'signing-of-hbc-charter-2', 640, 170, 330, 131, { rot: -.02, tape: true, seed: 81, filter: 'sepia' });
      const stage = t < A.crown ? 0 : t < A.passes ? 1 : 2, kk = stage === 0 ? 0 : stage === 1 ? k01(t, A.crown, .8) : 1 + k01(t, A.passes, .8), dx = lerp(260, 640, ease.inOut(Math.min(kk, 1))) + (kk > 1 ? lerp(0, 400, ease.inOut(kk - 1)) : 0);
      C.fig(ctx, 220, 650, 1.0, t, { hat: 'top', coat: '#3a2a20', pants: '#2a2a2a', mustache: '#6a5a4a', hair: '#8a7a6a', pose: kk < .2 ? 'point' : 'stand', seed: 401 });
      C.fig(ctx, 640, 650, 1.0, t, { face: 'queen', cloth: '#2a2430', hair: '#7a6a5a', pose: 'stand', seed: 402 });
      C.fig(ctx, 1060, 650, 1.0, t, { face: 'macdonald', pose: t > A.passes + .8 ? 'up' : 'stand', mood: t > A.passes + .8 ? 'happy' : 'calm', flip: true, seed: 403 });
      deed(ctx, dx, 395, 1.1); C.label(ctx, 'HUDSON\'S BAY CO.', 220, 690, 18); C.label(ctx, 'THE CROWN', 640, 690, 18); C.label(ctx, 'CANADA', 1060, 690, 18); });
    S.date(ctx, 'THE LATE 1860s', 1); C.finish(ctx, t); }
  // 2. the receipt: £300,000 + land for the company — a typed receipt pinned on the board, then the biggest purchase
  function sReceipt(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.05 }); Cn.layer(ctx, c, 1, () => { C.bg(ctx, 'kraft');
      ctx.save(); ctx.translate(640, 300); ctx.rotate(-.03); C.shadow(ctx, true, 10, .4); ctx.drawImage(C.paper('cream', 520, 440), -260, -220); C.shadow(ctx, false); C.tape(ctx, 0, -220, 110, .05, 3);
      ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = '900 40px Anton'; ctx.fillText('RECEIPT', 0, -160); ctx.font = '22px "Special Elite", "Liberation Serif", serif'; ctx.textAlign = 'left';
      const lines = [["Item:", "Rupert's Land"], ["Seller:", "Hudson's Bay Co."], ["Buyer:", "Canada"], ["Price:", "£300,000"], ["Plus:", "millions of acres"], ["", "kept by the company"]];
      lines.forEach(([l, r], i) => { const kt = A.pays + i * .4; if (t < kt - 1.6) return; ctx.globalAlpha = k01(t, kt - 1.6, .3); ctx.fillText(l, -220, -100 + i * 40); ctx.fillText(r, -90, -100 + i * 40); }); ctx.globalAlpha = 1;
      if (t > A.pays) C.marker(ctx, 'circle', [30, 14, 120, 24], k01(t, A.pays + .3, .6)); ctx.restore();
      if (t > A.largest) S.bigNum(ctx, 'LARGEST LAND PURCHASE IN CANADIAN HISTORY', 640, 600, 38, k01(t, A.largest, .5)); });
    C.beaver(ctx, 140, 690, .8, t, {}); C.finish(ctx, t); }
  // 3. the map: Rupert's Land joins Canada — Deal #3
  function sMap(ctx, lt, dur, t) { const v = S.view({ lon: -88, lat: 52, s: 900 }, { lon: -95, lat: 56, s: 760 }, ease.inOut(k01(t, A.largest, 4))); const pr = C.map(ctx, v, { prov: true, fill: n => ({ Ontario: '#c86a5a', 'Québec': '#5a7ab8', Quebec: '#5a7ab8', 'Nova Scotia': '#d8a050', 'New Brunswick': '#7a9a5a' })[n] || null, alpha: .8 });
    { const [, ny] = pr(-80, 49.5); C.landClip(ctx, pr, 'Canada', () => { ctx.fillStyle = '#d8cc98'; ctx.fillRect(-300, -300, 1900, ny + 300); }); }
    const k = k01(t, A.start + 1.5, 2); ctx.save(); ctx.globalAlpha = .55 * k; C.landClip(ctx, pr, 'Canada', () => { ctx.fillStyle = '#c86a5a'; ctx.beginPath(); [[-141, 70], [-95, 73], [-80, 66], [-78, 62], [-70, 60], [-66, 57], [-72, 52], [-80, 50.5], [-90, 48.5], [-95, 49], [-114, 49], [-120, 53.8], [-120, 60], [-141, 60]].forEach((p, i) => { const [x, y] = pr(...p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); }); ctx.restore();
    if (t < A.did) { const [x, y] = pr(-105, 58); C.headline(ctx, 'SOLD!', x, y, 60 * ease.back(k), { rot: -.08, col: '#7a1a14' }); }
    S.dealStamp(ctx, t, A.did, A.deal, 3, { sy: 360 }); C.finish(ctx, t); }
  // 4. Red River: the farms along the river, carts, the Métis — nobody asked them
  function sRedRiver(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.08, x: 40 }, { z: 1.0, x: -20 }); Cn.layer(ctx, c, 1, () => { S.redRiver(ctx, t, { carts: true });
      for (let i = 0; i < 4; i++) C.fig(ctx, 760 + i * 120, 708, .62, t + i, Object.assign(PP.metis(i), { pose: i === 1 ? 'talk' : 'stand', flip: i % 2 === 0 }));
      S.metisFlag(ctx, 660, 470, 90, 56); P.ink(ctx, '#5a3a24', cc => cc.rect(654, 470, 6, 236), 0); });
    if (t > A.nobody) C.stamp(ctx, 'NOBODY ASKED', 330, 200, 54, -.08, k01(t, A.nobody, .3));
    if (t > A.people) S.fact(ctx, '~11,000 people at the Red River settlement · mostly Métis', k01(t, A.people, .4), { y: 60 });
    if (t > A.mixed) S.fact(ctx, t > A.own ? 'their own language · their own farms · their own way of life' : 'mixed First Nations and European (mostly French) ancestry', k01(t, t > A.own ? A.own : A.mixed, .4));
    C.finish(ctx, t); }
  const cut = [[A.start, sHandoff, .4], [A.pays - .2, sReceipt, .3], [A.largest + 2.2, sMap, .4], [A.problem - .1, sRedRiver, .4]];
  F.chapter({ cut, sfx: [{ t: A.crown, type: 'whoosh', gain: .3 }, { t: A.passes, type: 'whoosh', gain: .3 }, { t: A.pays, type: 'ratchet', gain: .4 }, { t: A.largest, type: 'hit', gain: .4 }, { t: A.deal, type: 'press', gain: .45 }, { t: A.nobody, type: 'press', gain: .45 }],
    moods: [{ t: A.start, mood: 'still' }, { t: A.problem, mood: 'mystery' }] });
})(window);
