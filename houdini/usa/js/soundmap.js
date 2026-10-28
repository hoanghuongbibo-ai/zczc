/* The American Revolution — the sound design: one ambience bed per scene (by chapter, by scene function name) and contextual foley cued
 * to the narration ([phrase, search-from seconds, FX type, gain, offset s]). Film.build turns these into Show.amb and extra Show.sfx. */
(function (G) {
  'use strict';
  G.SOUNDMAP = [
    /* 00 cold open */ { sBank: 'river', sIce: 'river', sFeet: 'snowwind', sLost: 'map', sGone: 'snowwind', sSixDays: 'snowwind', sEmpty: 'snowwind', sQuestion: 'room', sTitle: 'room', sPreview: 'room', sBoard: 'river' },
    /* 01 British America */ { sRewind: 'room', sFarm: 'meadow', sKing: 'court', sDebt: 'office', sTaxes: 'street', sProtest: 'crowd', sArgument: 'room', sDrill: 'meadow', sGage: 'map' },
    /* 02 the spark */ { sMyth: 'night', sAllBritish: 'night', sOhio: 'room', sRegulars: 'night', sAlarm: 'map', sLexington: 'meadow', sWho: 'room', sRoad: 'map', sWalls: 'battle', sDead: 'room', sBell: 'meadow' },
    /* 03 the army */ { sCongress: 'street', sWashington: 'room', sScore: 'room', sEquation: 'meadow', sJob: 'room' },
    /* 04 New York */ { sDeclare: 'crowd', sFleet: 'harbour', sHeights: 'meadow', sPinned: 'sea', sEscape: 'rain', sFog: 'river', sLast: 'river', sQuote: 'room', sChased: 'map' },
    /* 05 Trenton */ { sDwindle: 'snowwind', sGamble: 'room', sCross: 'river', sMarch: 'snowwind', sFight: 'battle', sScore: 'room', sPrinceton: 'map', sReenlist: 'snowwind' },
    /* 06 Saratoga, Valley Forge */ { sSaratoga: 'map', sAid: 'harbour', sAlliance: 'meadow', sWorld: 'map', sForge: 'snowwind', sWeather: 'room', sNeeds: 'snowwind', sHut: 'campfire', sDisease: 'room', sToll: 'snowwind' },
    /* 07 Steuben */ { sStranger: 'snowwind', sProblem: 'snowwind', sDrill: 'snowwind', sRecap: 'room', sModel: 'meadow', sMarchOut: 'meadow' },
    /* 08 the twist */ { sNobody: 'room', sHulks: 'harbour', sBelow: 'ship', sShape: 'room', sFreedom: 'room', sDunmore: 'night', sClinton: 'room', sOneInFive: 'room' },
    /* 09 South, Yorktown */ { sTheory: 'map', sThirds: 'room', sSouth: 'map', sBackcountry: 'forest', sCornwallis: 'map', sToYork: 'map', sDeGrasse: 'sea', sSouthMarch: 'room', sArrive: 'sea', sCapes: 'sea', sNotHis: 'sea', sSiege: 'map', sTrenches: 'trench', sStorm: 'rain', sSurrender: 'meadow' },
    /* 10 aftermath */ { sParliament: 'commons', sTreaty: 'room', sCost: 'room', sExile: 'harbour', sNations: 'forest', sLedger: 'room' },
    /* 11 close */ { sQuestion: 'room', sRecap: 'room', sIdea: 'room', sFireworks: 'night', sCTA: 'room' },
  ];
  G.SOUNDFX = [];
})(window);
