/* ~11.6 s demo of THEO, the channel guide: turn-around + wave, the magnifier investigation, a BUSTED stamp, sign-off.
 * No voice (silent track); with a narration, pass talk: Guide.talk(t) and the mouth follows the voice. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Gd = G.Guide, { W, H, clamp, lerp, ease, shape, rect, grad } = T;
  const INK = FX.INK;
  function study(ctx) { // warm paper study: wall, wainscot, floor, framed map, shelf
    ctx.fillStyle = grad(ctx, 0, 0, 0, 560, [[0, '#e9d9b8'], [1, '#d9c39a']]); ctx.fillRect(-200, -200, W + 400, 760);
    ctx.fillStyle = '#9b6a43'; ctx.fillRect(-200, 470, W + 400, 90); T.line(ctx, [[-200, 470], [W + 200, 470]], 4);
    ctx.fillStyle = '#7b5133'; ctx.fillRect(-200, 560, W + 400, 400); T.line(ctx, [[-200, 560], [W + 200, 560]], 4);
    shape(ctx, '#6b4a30', 4, rect(430, 90, 420, 270, 4)); shape(ctx, '#efe2c2', 3, rect(446, 106, 388, 238, 2));
    ctx.fillStyle = '#c9b48a'; ctx.beginPath(); ctx.moveTo(480, 180); ctx.bezierCurveTo(540, 130, 620, 170, 650, 150); ctx.bezierCurveTo(700, 190, 640, 250, 600, 300); ctx.bezierCurveTo(540, 300, 500, 260, 480, 180); ctx.fill();
    ctx.beginPath(); ctx.moveTo(700, 140); ctx.bezierCurveTo(760, 130, 800, 180, 790, 230); ctx.bezierCurveTo(760, 290, 720, 300, 700, 240); ctx.fill();
    T.line(ctx, [[560, 210], [740, 190]], 3, '#b5462f'); shape(ctx, '#d8433a', 2.5, T.circle(740, 190, 7));
    for (const [x, h, c] of [[1010, 120, '#8e3b32'], [1040, 140, '#3d5a7a'], [1072, 110, '#c99a3c'], [1100, 130, '#4f6b45'], [1130, 120, '#8e3b32']]) shape(ctx, c, 3, rect(x, 300 - h, 28, h, 2));
    shape(ctx, '#6b4a30', 3.5, rect(990, 300, 190, 16, 2));
  }
  function a(ctx, lt, dur, t) { // back to camera at the map → turns (curl springs) → waves hello
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 380); study(ctx);
    T.shadow(ctx, 640, 690, 105, 15, .3);
    const back = lt < 1.0, turn = lt < 1.0 ? 0 : -1 + ease.out(clamp((lt - 1.0) / .45));
    Gd.draw(ctx, 640, 690, .98, { t, back, turn, pose: Gd.pose(lt, [[0, 'idle'], [1.6, 'wave'], [3.2, 'present']]), hair: Gd.hairRing(lt - 1.0, .45) + Gd.hairRing(lt - 1.6, .2),
      face: lt < 1.6 ? { mouth: 'smile', brows: 'up', look: [.2, 0] } : lt < 3.2 ? { mouth: 'grin', eyes: 'happy', brows: 'up' } : { mouth: 'grin', brows: 'neutral', look: [.5, 0] }, headTilt: lt > 1.6 && lt < 3.2 ? -.06 : 0 });
    ctx.restore(); FX.dateTag(ctx, 'MEET THEO');
    FX.caption(ctx, 'your guide to the myths of history', lt, 3.3);
  }
  function b(ctx, lt, dur, t) { // the investigation: magnifier on the myth → BUSTED stamp → he celebrates
    ctx.save(); T.cam(ctx, FX.push(lt, dur, 1.02, 1.1), 640, 380); study(ctx);
    shape(ctx, '#b78a5a', 4, rect(700, 120, 380, 330, 6)); shape(ctx, '#c99e6e', 0, rect(712, 132, 356, 306, 4));
    FX.paperDoc(ctx, 890, 290, 290, 250, { title: 'MYTH', sub: '"Napoleon was tiny"', lines: 5, rot: .02, seed: 5 });
    shape(ctx, '#d8433a', 3, T.circle(890, 172, 8));
    FX.stamp(ctx, 'BUSTED', 890, 315, lt - 2.4, { color: '#c8322a', size: 46, rot: -.14 });
    T.shadow(ctx, 520, 680, 100, 15, .3);
    const keys = [[0, 'idle'], [.4, 'magnify'], [2.5, 'magnify'], [2.95, 'cheer']];
    const face = lt < 2.45 ? { mouth: 'flat', brows: 'skeptic', eyes: 'squint', look: [.8, -.2] } : lt < 2.95 ? { mouth: 'shock', brows: 'up', eyes: 'wide', look: [.8, -.1] } : { mouth: 'grin', eyes: 'happy', brows: 'up' };
    Gd.draw(ctx, 520, 680, .92, { t, turn: lt < 2.95 ? .55 : .2, pose: Gd.pose(lt, keys), prop: 'magnifier', face, hair: Gd.hairRing(lt - 2.45, .5) + Gd.hairRing(lt - 2.95, .25), lean: lt > 2.95 ? 0 : -.03 * ease.out(clamp((lt - .4) / .5)) });
    ctx.restore(); FX.dateTag(ctx, 'MYTH CHECK');
    FX.caption(ctx, 'Napoleon: about 1.69 m (5 ft 7 in) — average for his day', lt, 3.0);
  }
  function c(ctx, lt, dur, t) { // sign-off: close-up, thumbs-up + wink under the title
    FX.darkBg(ctx, '#2f2a26');
    const k = FX.settle(clamp((lt - .15) / .45));
    ctx.save(); ctx.translate(640, 140); ctx.scale(k, k); FX.bigText(ctx, 'MYTH BUSTED!', 0, 0, 84, { color: '#f6c945' }); ctx.restore();
    Gd.draw(ctx, 640, 1010, 1.25, { t, pose: Gd.pose(lt, [[0, 'idle'], [.55, 'thumbsUp']]), hair: Gd.hairRing(lt - .55, .3),
      face: lt < .55 ? { mouth: 'smile', brows: 'neutral' } : { mouth: 'smile', eyes: 'wink', brows: 'sly' }, headTilt: lt > .55 ? .05 : 0 });
  }
  const shots = [[0, 4.2, a], [4.2, 8.4, b], [8.4, 11.6, c]].map(([start, end, draw]) => ({ start, end, draw }));
  G.Show = { duration: 11.6, narration: 'assets/audio/silence.mp3', shots,
    sfx: [{ t: 1.0, type: 'whoosh', gain: .5 }, { t: 1.6, type: 'click', gain: .5 }, { t: 4.2, type: 'paper', gain: .5 }, { t: 4.6, type: 'slide', gain: .4 },
      { t: 6.6, type: 'thud', gain: .9 }, { t: 6.62, type: 'press', gain: .5 }, { t: 7.15, type: 'swell', gain: .5 }, { t: 8.4, type: 'whoosh', gain: .5 }, { t: 8.55, type: 'hit', gain: .7 }, { t: 8.95, type: 'click', gain: .5 }],
    moods: [{ t: 0, mood: 'still' }, { t: 4.2, mood: 'mystery' }, { t: 8.4, mood: 'under' }], images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '40px "Luckiest Guy"'] };
})(window);
