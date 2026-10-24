/* Canada — Beat 5, Deal #1 and Invasion #1 (441–542 s): the Quebec Act of 1774 at the deal table; the Thirteen Colonies furious;
 * 1775 invasion: Montreal falls, Montgomery and Arnold attack Quebec in a blizzard and fail; the deal held; the Loyalists flee north. */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, F = G.Film, P = G.Paint, Cn = G.Cine, PP = G.PEOPLE, { clamp, lerp, ease, INK, rng } = C, k01 = S.k01;
  const a = ph => F.at(ph, 441);
  const A = { start: 441.1, y1774: a('in 1774'), lets: a('it lets the people'), basically: a('basically you can'), dont: a("just don't join"), did: a('and canada did what'), deal: a('it made a deal'), hate: a('the thirteen colonies hate'), prot: a("they're protestant"),
    y1775: a('in 1775 the new'), plan: a('the plan march'), invite: a('and invite the locals'), first: a('at first it works'), montreal: a('american troops take montreal'), lastnight: a('then on the last night'), montgomery: a('general richard montgomery'), yes: a('yes that benedict'),
    badly: a('it goes badly'), killed: a('montgomery is killed'), spring: a('by the next spring'), most: a('most of the people'), held: a('the deal held'), revolution: a('then when the revolution'), shapes: a('something happens that'), tens: a('tens of thousands'),
    flee: a('the loyalists flee'), farmers: a('farmers merchants'), haud: a('haudenosaunee allies'), black: a('and about 3,500'), won: a('many of whom had won'), faced: a('and who then faced'), english: a('so english speaking') };
  const OFFICIAL = { kind: 'coat', cloth: '#b8322a', legs: '#efe6d2', hat: null, hair: '#e8e4dc', skin: '#f4d2b0', facings: '#d8b048', seed: 501 };
  const SEIGNEUR = { kind: 'coat', cloth: '#3a4a3a', legs: '#2a2a2a', hat: 'tricorne', hair: '#5a4a3a', skin: '#f0c8a0', seed: 502 };
  const BISHOP = { kind: 'monk', cloth: '#2a2224', hat: 'mitre', beard: false, seed: 503 };
  // 1. the deal table: the Quebec Act slides across to a seigneur and a bishop; the satirical print of the Act pinned on the wall
  function sAct(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.1, y: 40 }, { z: 1.0 }); Cn.layer(ctx, c, 1, () => { S.dealTable(ctx, t, { wall: cc => C.photo(cc, 'a-page-of-the-quebec-act-1774', 1080, 170, 300, 177, { rot: .04, tape: true, seed: 61, caption: 'a 1774 cartoon about the Quebec Act', capSize: 12 }),
      people: [{ x: 300, ...OFFICIAL, pose: since(t, A.basically) > 0 ? 'point' : 'hold', talk: t > A.basically && t < A.did }, { x: 760, ...SEIGNEUR, flip: true, mood: 'happy' }, { x: 960, ...BISHOP, flip: true, mood: since(t, A.lets) > 0 ? 'happy' : 'calm' }], doc: 'QUEBEC ACT', slide: k01(t, A.y1774 + .5, .8), sign: k01(t, A.did, 1.4) });
      if (t > A.lets) { ['keep the Catholic faith', 'keep French civil law'].forEach((w, i) => { const k = clamp((t - A.lets) * 1.5 - i * 1.2); if (k > 0) C.label(ctx, w, 640, 130 + i * 56, 26, { rot: (i ? .03 : -.03), bg: i ? '#c8d8f0' : '#f4c44a' }); }); }
      if (t > A.basically && t < A.did) C.bubble(ctx, t > A.dont ? '…just don\'t join\nthe guys down south.' : 'You can keep\nbeing you.', 360, 160, 28, 320, 270); });
    S.date(ctx, '1774', k01(t, A.y1774, .4)); S.dealStamp(ctx, t, A.did, A.deal, 1); C.finish(ctx, t); }
  const since = (t, x) => t - x;
  // 2. the Thirteen Colonies hate it: Protestant, angry, about to start a revolution — colonists read the news, furious
  function sAngry(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.08 }); Cn.layer(ctx, c, 1, () => { S.room(ctx, t, { wall: '#c8b898' }); C.photo(ctx, 'a-page-of-the-quebec-act-1774', 380, 210, 380, 224, { rot: -.04, tape: true, seed: 62 });
      for (let i = 0; i < 4; i++) C.fig(ctx, 640 + i * 160, 700, .9, t, Object.assign(PP.settler(i + 1), { mood: 'angry', pose: ['point', 'up', 'crossed', 'point'][i], flip: true })); C.fig(ctx, 200, 700, .9, t, Object.assign(PP.politician(1), { mood: 'angry', pose: 'hold', prop: (cc, x, y) => P.cel(cc, c2 => c2.rect(x - 30, y - 50, 60, 70), '#efe6d2', { dx: 3, dy: 3, lw: 3 }) })); });
    ['Protestant', 'angry', 'about to start a revolution'].forEach((w, i) => { const k = clamp((t - A.prot) * 1.5 - i * .9); if (k > 0) C.label(ctx, w, 940, 100 + i * 56, 26, { rot: (i - 1) * .03, bg: ['#fbf8f0', '#f4c44a', '#c23a2c'][i], col: i === 2 ? '#fff' : INK }); });
    S.fact(ctx, 'the Thirteen Colonies hate it', k01(t, A.hate, .4)); C.finish(ctx, t); }
  // 3. 1775: Congress approves an invasion; arrows north to Montreal and Quebec; the invasion counter clicks to 1
  function sInvade(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -73, lat: 44, s: 2600, x: 640, y: 360 }, { fill: n => n === 'Canada' ? '#e8a090' : null }); const k = k01(t, A.plan, 2.5);
    C.mapArrow(ctx, pr, [-73.8, 42.6], [-73.6, 45.4], k, '#2c5a8a', 16, .05); C.mapArrow(ctx, pr, [-70.5, 44], [-71.2, 46.7], k01(t, A.plan + 1, 2.4), '#2c5a8a', 14, -.1);
    C.pin(ctx, pr, -73.6, 45.5, 'Montreal', k01(t, A.plan + 1, .4), { dy: -50 }); C.pin(ctx, pr, -71.2, 46.8, 'Quebec', k01(t, A.plan + 1.5, .4), { dy: -50 });
    S.counter(ctx, 1080, 150, .7, 1, k01(t, A.y1775 + .5, .4), { flip: k01(t, A.y1775 + .8, .5) }); if (t > A.invite) C.bubble(ctx, 'Join the revolution!', 380, 560, 28, 450, 470);
    S.date(ctx, '1775', 1); C.finish(ctx, t); }
  // 4. at first it works: Montreal, November 1775, taken without a fight — the townspeople shrug
  function sMontreal(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: -30 }, { z: 1.06, x: 30 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, { top: '#8a9cb0', mid: '#c8ccd0', low: '#dcdcd8', hor: '#e8e6e0', sun: null, cloud: '#e8eaee', cloudSh: '#a0a8b4', haze: '#d8dcdc', grade: '#a8b0c0' }, t, { horizon: 460, seed: 171 }));
    Cn.layer(ctx, c, .5, () => { for (let i = 0; i < 7; i++) C.house(ctx, 80 + i * 180, 480, .9, { wall: ['#c8b8a0', '#d8c8a8', '#b8a890'][i % 3], roof: '#6a7a8a' }); });
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 480, 1900, 400), '#b8a888', { shade: '#8a7a5a', dx: 0, dy: 0, lw: 0 }); const go = k01(t, A.montreal, 4); for (let i = 0; i < 7; i++) C.fig(ctx, lerp(-100, 700, go) - i * 80, 640 + (i % 2) * 20, .55, t + i, Object.assign(PP.continental(i), { pose: 'walk', flip: false }));
      for (let i = 0; i < 3; i++) C.fig(ctx, 900 + i * 120, 650, .6, t, Object.assign(PP.settler(i + 8), { pose: 'shrug', flip: true, mood: 'calm' })); });
    S.date(ctx, 'MONTREAL · NOVEMBER 1775', 1); S.fact(ctx, 'taken without a fight', k01(t, A.montreal + 1, .4)); C.finish(ctx, t, { pal: 'dawn' }); }
  // 5. the last night of the year: Montgomery and Arnold attack Quebec in a blizzard — their portraits pinned; "yes, THAT Benedict Arnold"
  function sBlizzard(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.1, x: -40 }); Cn.layer(ctx, c, 1, () => { S.quebec(ctx, t, { night: true, snow: true }); for (let i = 0; i < 6; i++) C.fig(ctx, 760 + i * 80, 620, .3, t + i, Object.assign(PP.continental(i), { pose: 'walk', flip: true })); });
    if (t > A.montgomery) C.photo(ctx, 'richard-montgomery', 170, 170, 230, 188, { rot: -.05, tape: true, seed: 63, caption: 'Gen. Richard Montgomery', capSize: 15 });
    if (t > A.montgomery + 1) C.photo(ctx, 'benedict-arnold', 1110, 200, 200, 261, { rot: .05, tape: true, seed: 64, caption: 'Benedict Arnold', capSize: 15 });
    if (t > A.yes) C.stamp(ctx, 'LATER: SWITCHED SIDES', 1090, 400, 28, -.1, k01(t, A.yes + .5, .4)); S.date(ctx, '31 DECEMBER 1775', 1); C.finish(ctx, t, { pal: 'night' }); }
  // 6. it goes badly: Montgomery killed in the first volley; spring retreat; most of Quebec didn't want to join — the deal held
  function sBadly(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0 }, { z: 1.06 }); const sp = t > A.spring;
    Cn.layer(ctx, c, 1, () => { if (!sp) { S.quebec(ctx, t, { night: true, snow: true }); Cn.smoke(ctx, 600, 300, 1.4, t, { col: '235,232,225', a: .6, h: 200 }); C.fig(ctx, 760, 640, .5, t, Object.assign({}, G.CAST.montgomery, { pose: 'stand', lean: -1.2, eyes: 'closed' })); for (let i = 0; i < 4; i++) C.fig(ctx, 900 + i * 90, 640, .32, t + i, Object.assign(PP.continental(i), { pose: 'shrug', mood: 'shock', flip: true })); }
      else { S.quebec(ctx, t, {}); const go = k01(t, A.spring, 4); for (let i = 0; i < 6; i++) C.fig(ctx, 760 + i * 80 + go * 600, 640, .3, t + i, Object.assign(PP.continental(i), { pose: 'walk' })); C.label(ctx, 'retreat →', 1100, 520, 26); } });
    if (t > A.most) { for (let i = 0; i < 4; i++) C.fig(ctx, 120 + i * 110, 710, .6, t, Object.assign(PP.settler(i + 12), { pose: 'crossed', mood: 'calm', flip: false })); C.bubble(ctx, 'Non, merci.', 280, 300, 30, 280, 400); }
    if (t > A.held) C.stamp(ctx, 'DEAL #1 · HELD', 900, 160, 50, -.08, k01(t, A.held, .4)); if (!sp) S.fact(ctx, 'Montgomery is killed in the first volley', k01(t, A.killed, .4)); C.finish(ctx, t, { pal: sp ? 'golden' : 'night' }); }
  // 7. the Revolution ends, 1783: tens of thousands of Loyalists flee north — arrows into Nova Scotia, New Brunswick, along Lake Ontario
  function sLoyalMap(ctx, lt, dur, t) { const pr = C.map(ctx, { lon: -72, lat: 44, s: 1900, x: 640, y: 370 }, { fill: n => n === 'Canada' ? '#e8a090' : null }); const k = k01(t, A.tens, 3);
    [[[-74, 40.7], [-65.5, 44.6]], [[-74.5, 41.5], [-66.5, 45.8]], [[-75, 42.5], [-76.5, 44.2]], [[-77, 41], [-79.4, 43.6]], [[-79, 41.8], [-80.3, 43.1]]].forEach(([p, q], i) => C.mapArrow(ctx, pr, p, q, clamp(k * 1.5 - i * .15), '#c23a2c', 12, (i % 2 ? .2 : -.15)));
    for (const [lo, la, n] of [[-63.5, 45, 'Nova Scotia'], [-66.5, 46.5, 'New Brunswick'], [-80.2, 43.1, 'Grand River'], [-77.5, 44.4, 'Lake Ontario shore']]) C.pin(ctx, pr, lo, la, n, k01(t, A.flee + .5, .4), { dy: -46 });
    S.date(ctx, '1783', 1); S.fact(ctx, 'the Loyalists flee north', k01(t, A.flee, .4)); C.finish(ctx, t); }
  // 8. who they were: farmers, merchants, Haudenosaunee allies, about 3,500 Black Loyalists — walking north in the snow
  function sLoyalists(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.0, x: 60 }, { z: 1.05, x: -40 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, { top: '#7a9cc0', mid: '#c8d8e4', low: '#e8eef2', hor: '#f4f6f8', sun: '#fffbe8', cloud: '#f4f6f8', cloudSh: '#a8b8c8', haze: '#dce6ee', grade: '#a8c8e8' }, t, { horizon: 450, sun: [300, 260], sunR: 40, seed: 181 }));
    Cn.layer(ctx, c, .4, () => { Cn.mounds(ctx, { y: 450, n: 5, seed: 182, col: '#c8d4dc', far: .3, sunX: 300, t, w: 560, h: 80, copses: 0 }); for (let i = 0; i < 9; i++) C.pine(ctx, 40 + i * 160, 480, .8, '#2f4a3a'); });
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 480, 1900, 400), '#eef2f4', { shade: '#c8d4dc', dx: 0, dy: 0, lw: 0 }); const go = (t - A.tens) * 22;
      const grp = [[PP.settler(0), 'farmers', A.farmers], [PP.politician(0), 'merchants', A.farmers + .8], [PP.cree(1), 'Haudenosaunee allies', A.haud], [PP.blackLoyalist(0), '~3,500 Black Loyalists', A.black], [PP.blackLoyalist(1), null, A.black], [PP.settler(2), null, A.tens]];
      grp.forEach(([o, lab, kt], i) => { const x = 1300 - i * 210 - go; C.fig(ctx, x, 660 + (i % 2) * 24, .6, t + i, Object.assign({}, o, { pose: 'walk', flip: true })); if (lab && t > kt) C.label(ctx, lab, x, 330 + (i % 2) * 24, 20, { rot: (i % 2 ? .03 : -.03) }); });
      for (let i = 0; i < 2; i++) { const x = 1300 - (i * 3 + 1.5) * 210 - go; P.cel(ctx, cc => cc.rect(x - 60, 610, 120, 40), '#8a6040', { shade: '#5a3a20', dx: 0, dy: 6, lw: 3 }); for (const d of [-40, 40]) P.ink(ctx, '#5a3a20', cc => cc.arc(x + d, 660, 18, 0, 7), 4); } S.snow(ctx, t, 60, 8); });
    if (t > A.won) S.fact(ctx, 'many had won their freedom fighting for Britain — then faced serious discrimination in the Maritimes', k01(t, A.won, .4), { size: 22 }); C.finish(ctx, t, { pal: 'dawn' }); }
  // 9. English-speaking Canada, founded by Americans who lost an argument: a Loyalist family in the snow beside their furniture, looking south
  function sFurniture(ctx, lt, dur, t) { const c = Cn.cam(lt, dur, { z: 1.08 }, { z: 1.0 }); Cn.layer(ctx, c, .1, () => Cn.sky(ctx, { top: '#7a9cc0', mid: '#c8d8e4', low: '#e8eef2', hor: '#f4f6f8', sun: '#fffbe8', cloud: '#f4f6f8', cloudSh: '#a8b8c8', haze: '#dce6ee', grade: '#a8c8e8' }, t, { horizon: 470, sun: [1000, 260], sunR: 40, seed: 191 }));
    Cn.layer(ctx, c, 1, () => { P.cel(ctx, cc => cc.rect(-300, 470, 1900, 400), '#eef2f4', { shade: '#c8d4dc', dx: 0, dy: 0, lw: 0 }); for (let i = 0; i < 6; i++) C.pine(ctx, 80 + i * 230, 500, .9, '#2f4a3a');
      // the furniture pile: a grandfather clock, a chair, a chest, a mirror
      P.cel(ctx, cc => cc.rect(760, 420, 70, 260), '#7a4a28', { shade: '#5a3418', light: '#9a6a42', dx: 10, dy: 0, lw: 4 }); P.ink(ctx, '#f4efe2', cc => cc.arc(795, 470, 26, 0, 7), 3); S.chair(ctx, 900, 680, 1.1); P.cel(ctx, cc => cc.rect(860, 600, 220, 80), '#8a5a34', { shade: '#5a3a20', dx: 0, dy: 8, lw: 4 }); P.cel(ctx, cc => cc.ellipse(1040, 520, 50, 70, 0, 0, 7), '#c8d8e4', { shade: '#98a8b8', dx: 6, dy: 0, lw: 5 });
      C.fig(ctx, 360, 700, .85, t, Object.assign(PP.settler(0), { mood: 'sad', pose: 'chin', flip: false })); C.fig(ctx, 500, 700, .8, t, Object.assign(PP.settler(1), { mood: 'sad', pose: 'stand' })); C.fig(ctx, 600, 700, .5, t, Object.assign(PP.child(1), { mood: 'sad' })); S.snow(ctx, t, 80, 9); });
    C.ransom(ctx, 'FOUNDED BY AMERICANS', 640, 110, 44, k01(t, A.english + .8, 1.2), { seed: 7 }); C.ransom(ctx, 'WHO LOST AN ARGUMENT', 640, 180, 44, k01(t, A.english + 2.2, 1.2), { seed: 8 }); C.finish(ctx, t, { pal: 'dawn' }); }

  const cut = [[A.start, sAct, .4], [A.hate - .2, sAngry, .3], [A.y1775 - .2, sInvade, .4], [A.first - .2, sMontreal, .3], [A.lastnight - .2, sBlizzard, .4], [A.badly - .2, sBadly, .3], [A.revolution - .2, sLoyalMap, .4], [A.farmers - .3, sLoyalists, .3], [A.english - .2, sFurniture, .4]];
  F.chapter({ cut, sfx: [{ t: A.y1774 + .5, type: 'slide', gain: .3 }, { t: A.did + .4, type: 'scratch', gain: .3 }, { t: A.deal, type: 'press', gain: .45 }, { t: A.y1775 + .8, type: 'ratchet', gain: .45 }, { t: A.lastnight, type: 'wind', gain: .45 }, { t: A.killed, type: 'boom', gain: .4 }, { t: A.held, type: 'press', gain: .4 }, { t: A.flee, type: 'whoosh', gain: .3 }],
    moods: [{ t: A.start, mood: 'still' }, { t: A.y1775, mood: 'tense' }, { t: A.most, mood: 'still' }, { t: A.english, mood: 'still' }] });
})(window);
