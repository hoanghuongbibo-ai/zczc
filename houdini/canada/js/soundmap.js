/* Canada — the sound design: one ambience bed per scene (by chapter, by scene function name) and contextual foley cued to
 * the narration ([phrase, search-from seconds, FX type, gain, offset s]). Film.build turns these into Show.amb and extra Show.sfx. */
(function (G) {
  'use strict';
  G.SOUNDMAP = [
    /* 00 cold open */ { sRoad: 'car', sOfficer: 'office', sChecks: 'office', sFolder: 'office', sMap: 'map', sSorry: 'room', sNervous: 'room', sOneCountry: 'room', sQuestion: 'map', sPattern: 'room', sTable: 'room', sOutside: 'snowwind', sTitle: 'room' },
    /* 01 first peoples, Vikings */ { sCalendar: 'room', sIce: 'snowwind', sArgue: 'room', sBluefish: 'room', sImmemorial: 'campfire', sNations: 'map', sHaud: 'forest', sCree: 'meadow', sInuit: 'snowwind', sLines: 'map', sVikings: 'sea', sRings: 'room', sColumbus: 'sea', sGym: 'room' },
    /* 02 Cartier */ { sRiver: 'sea', sBoard: 'ship', sKanata: 'room', sStretch: 'map', sOldMap: 'map', sVillage: 'meadow' },
    /* 03 fur trade, HBC */ { sFreeze: 'snowwind', sFashion: 'street', sTrade: 'river', sNewFrance: 'map', sCharter: 'room', sRupert: 'map', sKing: 'room', sStore: 'street' },
    /* 04 Seven Years' War */ { sEmpires: 'map', sNeighbours: 'meadow', sWorldWar: 'map', sCliffs: 'river', sWolfe: 'battle', sClimb: 'night', sPlains: 'meadow', sMontcalm: 'room', sVolley: 'battle', sGenerals: 'room', sTreaty: 'map', sProblem: 'room' },
    /* 05 Quebec Act, 1775, Loyalists */ { sAct: 'room', sAngry: 'street', sInvade: 'map', sMontreal: 'street', sBlizzard: 'snowwind', sBadly: 'snowwind', sLoyalMap: 'map', sLoyalists: 'snowwind', sFurniture: 'snowwind' },
    /* 06 1812 */ { sRound: 'room', sGoal: 'office', sYork: 'battle', sWashington: 'battle', sMyth: 'room', sCousin: 'crowd', sDraw: 'campfire' },
    /* 07 Fenians, Confederation */ { sStreet: 'street', sFenians: 'wind', sSwap: 'room', sRidgeway: 'battle', sDebated: 'meadow', sMacdonald: 'room', sDominion: 'map', sSmall: 'map' },
    /* 08 Rupert's Land */ { sHandoff: 'office', sReceipt: 'room', sMap: 'map', sRedRiver: 'river' },
    /* 09 Riel */ { sRecap: 'room', sRiel: 'room', sBlock: 'river', sManitoba: 'room', sScott: 'room', sExile: 'night', sCallBack: 'meadow', sTroops: 'train', sTrial: 'court', sSpike: 'mountain', sNine: 'room', sLegacy: 'room' },
    /* 10 never at the table */ { sWorkers: 'mountain', sTax: 'room', sFamilies: 'harbour', sBan: 'room', sReserves: 'wind', sSchool: 'wind', sYear: 'wind', sTRC: 'room', sChair: 'room' },
    /* 11 Vimy */ { sAuto: 'map', sVimy: 'trench', sOver: 'trench', sTaken: 'wind', sCrosses: 'wind', sBirth: 'room', sCountry: 'street', sRewind: 'room' },
    /* 12 the plans */ { sScheme: 'map', sProblem: 'office', sRed: 'office', sAllies: 'meadow' },
    /* 13 internment */ { sWar: 'ww2', sRemoval: 'harbour', sCharged: 'room', sApology: 'court' },
    /* 14 Newfoundland, flag, constitution */ { sNfld: 'harbour', sTenth: 'map', sFlagDebate: 'commons', sRaise: 'crowd', sConstitution: 'room', sNine: 'room' },
    /* 15 1995 */ { sTV: 'tv', sMargin: 'room', sTape: 'room' },
    /* 16 close */ { sNunavut: 'map', sQuestion: 'map', sDeals: 'room', sAsked: 'room', sBorder: 'highway', sEnd: 'meadow', sCTA: 'room' },
  ];
  G.SOUNDFX = [
    // cold open
    ['is driving around', 0, 'car', .6], ['checking roads', 0, 'pen', .5], ['rail lines', 0, 'chuff', .3], ['defence scheme no 1', 0, 'stamp', .6], ['canada should invade first', 0, 'drumroll', .5],
    ['grab them fast', 0, 'march', .5], ['apologizing to furniture', 0, 'chair', .6], ['invaded them before', 0, 'cannon', .35], ['made a deal', 50, 'pen', .5], ['everybody signed it', 0, 'pen', .6],
    ['who wasnt invited', 0, 'knock', .4], ['this is the entire history', 0, 'cheer', .25],
    // first peoples
    ['buried under ice', 92, 'wind', .1], ['people walked across', 92, 'crunch', .5], ['loudly', 92, 'gavel', .4], ['time immemorial', 92, 'ignite', .5], ['farms and longhouses', 92, 'birds', .5],
    ['woodlands and plains', 92, 'hooves', .3], ['phone battery', 92, 'tvclick', .4], ['vikings sail', 92, 'wave', .5], ['set up camp', 92, 'pick', .3], ['massive solar storm', 92, 'thunder', .3],
    ['cut with metal tools', 92, 'pick', .4], ['gym membership', 92, 'door', .4],
    // Cartier, furs, HBC
    ['second voyage', 225, 'shipbell', .4], ['two young men', 225, 'wave', .3], ['kanata', 225, 'rustle', .4], ['beaver fur', 270, 'rustle', .3], ['felt hats', 270, 'register', .3],
    ['gives a charter', 300, 'stamp', .6], ['the sole right', 300, 'pen', .4], ['department store', 300, 'register', .5],
    // Seven Years' War
    ['world war', 352, 'cannon', .3], ['quebec city', 360, 'shipbell', .3], ['all summer', 360, 'cannon', .35], ['sneak up a narrow path', 360, 'crunch', .5], ['a farmer', 380, 'birds', .4],
    ['the battle', 395, 'volley', .6], ['wolfe is shot', 395, 'shot', .5], ['rushes out to fight', 390, 'drumroll', .45], ['both generals', 395, 'bell', .35], ['france signs new france', 420, 'pen', .5],
    // 1774–1783
    ['the quebec act', 440, 'pen', .5], ['theyre angry', 455, 'boo', .5], ['approves an invasion', 460, 'drumroll', .5], ['take montreal', 470, 'march', .5], ['blizzard', 480, 'wind', .2],
    ['killed in the first', 480, 'volley', .55], ['flee north', 505, 'crunch', .4],
    // 1812
    ['round two', 540, 'drumroll', .5], ['burn government buildings', 550, 'ignite', .6], ['march into washington', 555, 'march', .45], ['set fire to the capitol', 555, 'ignite', .55], ['party', 580, 'glass', .5],
    // Fenians, Confederation
    ['and then come the fenians', 600, 'march', .45], ['ridgeway', 625, 'volley', .55], ['so they sit down', 660, 'chair', .5], ['heavy drinker', 660, 'glass', .5], ['on july 1 1867', 670, 'bell', .35], ['one dominion', 670, 'cheer', .3],
    // Rupert's Land, Riel
    ['canada pays', 705, 'register', .6], ['red river settlement', 705, 'hooves', .4], ['provisional government', 770, 'gavel', .5], ['and it works', 775, 'cheer', .3], ['thomas scott', 800, 'shot', .35],
    ['he fled', 810, 'crunch', .5], ['call riel back', 820, 'gallop', .55], ['canada sends troops', 830, 'whistle', .55], ['defeated at batoche', 830, 'volley', .5], ['high treason', 840, 'gavel', .6],
    ['last spike', 850, 'hammer', .7], ['coast to coast', 850, 'whistle', .5], ['is hanged in regina', 860, 'bell', .35],
    // never at the table
    ['workers from china', 886, 'pick', .5], ['head tax', 900, 'register', .5], ['banned almost all', 920, 'stamp', .6], ['onto reserves', 940, 'wind', .2], ['residential schools', 950, 'bell', .3],
    // Vimy
    ['automatically at war', 1000, 'drumroll', .45], ['called vimy', 1008, 'artillery', .5], ['went over', 1030, 'mg', .5], ['were killed and', 1036, 'artillery', .4], ['61,000', 1044, 'bugle', .55],
    ['embassy in washington', 1068, 'pen', .4], ['scouting the northern', 1080, 'car', .5],
    // plans, internment
    ['grab key cities', 1090, 'march', .45], ['was shelved', 1100, 'door', .4], ['war plan red', 1110, 'stamp', .5], ['closest allies', 1115, 'cheer', .3], ['canada fought hard', 1125, 'march', .5],
    ['after pearl harbor', 1130, 'phone', .4], ['taken and sold', 1145, 'register', .4], ['prime minister brian', 1160, 'gavel', .4],
    // Newfoundland, flag, constitution, 1995
    ['it votes twice', 1175, 'ballot', .6], ['52.34', 1180, 'cheer', .4], ['the final vote', 1205, 'gavel', .6], ['parliament hill', 1212, 'flag', .6], ['flag of its own', 1215, 'cheer', .35],
    ['queen elizabeth', 1230, 'pen', .5], ['refuses', 1245, 'door', .45], ['october 30 1995', 1265, 'tvclick', .5], ['all night', 1275, 'murmur', .5], ['50.58', 1280, 'cheer', .45], ['49.42', 1285, 'gasp', .45],
    ['football game', 1295, 'cheer', .55], ['held together with tape', 1300, 'tape', .7],
    // close
    ['nunavut', 1315, 'cheer', .3], ['pulling up more', 1365, 'chair', .6], ['enormous volumes', 1375, 'truck', .5], ['it made a deal', 1386, 'pen', .5],
  ];
})(window);
