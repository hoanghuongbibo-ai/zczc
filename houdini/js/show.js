/* The full opening (42 s): shot list on the narration's timeline, foley cues and
 * score moods. Shot boundaries sit on word timings from the narration transcript. */
(function (G) {
  'use strict';
  const A = G.Part1, B = G.Part2, C = G.Part3, FX = G.FX;
  G.Part2T.seal = 19.25; G.HT.punch = 29.4;
  const cut = [
    [0, A.shotExterior], [3.95, A.shotRoom], [5.4, A.shotCloseups], [6.95, FX.black],
    [7.7, A.shotStageWide], [9.6, A.shotStageClose], [12.05, A.shotStraitjacket], [13.6, A.shotMilkCan], [14.75, A.shotWaterCell],
    [17.15, B.shotCoffinOverhead], [19.25, B.shotCoffinSeal], [20.0, B.shotDescent], [21.15, B.shotCounter], [22.25, B.shotClimbOut],
    [22.9, B.shotBedDead], [25.2, B.shotRecord], [26.25, B.shotStampCause], [26.9, B.shotAppendix],
    [27.6, C.shotNewspapers], [28.85, C.shotPress], [29.4, C.shotPunch], [30.9, C.shotProphecy],
    [33.1, C.shotEvidence], [34.5, C.shotCemetery], [35.35, C.shotGrave], [37.6, FX.black], [38.2, C.shotTitle],
  ];
  const DURATION = 42.0;
  const shots = cut.map(([start, draw], i) => ({ start, end: i + 1 < cut.length ? cut[i + 1][0] : DURATION, draw }));
  const sfx = [
    { t: 3.45, type: 'window', gain: .9 }, { t: 7.72, type: 'rattle', gain: .4 },
    ...A.CUFFS.map(c => ({ t: c[4], type: 'click' })),
    { t: 12.25, type: 'creak', gain: .6 }, { t: 13.68, type: 'splash' }, { t: 14.22, type: "clang", gain: .8 }, { t: 14.36, type: "click" }, { t: 14.46, type: "click" },
    { t: 15.0, type: 'bubbles', gain: .6 }, { t: 16.1, type: 'bubbles', gain: .5 },
    { t: 17.2, type: 'slide', gain: .6 }, { t: 19.3, type: 'slide' }, { t: 19.55, type: 'clang' }, { t: 19.6, type: 'ratchet', gain: .7 },
    { t: 20.1, type: 'bubbles', gain: .6 }, { t: 20.8, type: 'thud', gain: .7 },
    { t: 22.27, type: 'creak', gain: .7 },
    { t: 25.55, type: 'scratch', gain: .7 }, { t: 26.3, type: 'thud' },
    { t: 27.65, type: 'paper' }, { t: 28.05, type: 'paper' }, { t: 28.45, type: 'paper' }, { t: 28.86, type: 'press', gain: .6 },
    { t: 30.0, type: 'whoosh', gain: .6 }, { t: 30.12, type: 'hit' },
    { t: 31.15, type: 'slide', gain: .6 },
    ...[33.2, 33.45, 33.7, 33.95, 34.2].map(t => ({ t, type: 'slide', gain: .5 })),
    { t: 34.5, type: 'wind', gain: .7 }, { t: 35.6, type: 'wind', gain: .6 },
    { t: 38.3, type: 'boom', gain: .8 },
  ];
  const moods = [
    { t: 0, mood: 'still' }, { t: 6.95, mood: 'silence' }, { t: 7.7, mood: 'tense' }, { t: 17.15, mood: 'mystery' }, { t: 20.0, mood: 'under' },
    { t: 22.25, mood: 'tense' }, { t: 22.9, mood: 'still' }, { t: 27.6, mood: 'mystery' }, { t: 33.1, mood: 'still' }, { t: 37.6, mood: 'silence' }, { t: 38.2, mood: 'mystery' },
  ];
  G.Show = {
    duration: DURATION, narration: 'assets/audio/narration.mp3', shots, sfx, moods,
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png', suitEyeL: 'assets/img/rig/suit-eye-l.png', suitEyeR: 'assets/img/rig/suit-eye-r.png', bedEyeL: 'assets/img/rig/bed-eye-l.png', bedEyeR: 'assets/img/rig/bed-eye-r.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
