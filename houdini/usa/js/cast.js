/* The American Revolution — the cast, in the same painted style as the Canada film (G.Paint.person via Col.fig).
 * "you" is the viewer's stand-in: a farm kid from Massachusetts who becomes a Continental private (16 in 1776). */
(function (G) {
  'use strict';
  const BUFF = '#d8c090', BLUE = '#2a3a6a', RED = '#b8322a', WHITE = '#efe6d2';
  G.CAST = {
    // the viewer's stand-in; never lip-syncs (the narrator is talking to him)
    you: { kind: 'coat', cloth: '#6a5a44', legs: '#7a6a50', shirt: '#e8dcc0', hat: 'tricorne', hatCol: '#3a2a20', hair: '#8a5a2a', skin: '#f2c9a2', coatLen: -150, seed: 501 },
    youFarm: { kind: 'tunic', cloth: '#a87a48', legs: '#6a5a44', hat: 'flatcap', hatCol: '#6a4a2a', hair: '#8a5a2a', skin: '#f2c9a2', seed: 501 },
    washington: { kind: 'coat', cloth: BLUE, legs: BUFF, facings: BUFF, hat: 'tricorne', hatCol: '#1e1a20', hatTrim: '#e8d8a8', hair: '#e8e4dc', skin: '#f0c8a0', coatLen: -130, epaulette: '#d8b048', sash: '#4a7aa8', seed: 511 },
    revere: { kind: 'coat', cloth: '#4a3a2a', legs: '#3a2a20', hat: 'tricorne', hatCol: '#2a2020', hair: '#3a2a1e', skin: '#f0c8a0', coatLen: -150, seed: 512 },
    dawes: { kind: 'coat', cloth: '#5a4a3a', legs: '#3a3028', hat: 'tricorne', hatCol: '#2a2020', hair: '#8a6a4a', skin: '#f4d2b0', coatLen: -150, seed: 513 },
    tallmadge: { kind: 'coat', cloth: BLUE, legs: BUFF, facings: '#c8c0b0', hat: 'tricorne', hair: '#c8b898', skin: '#f4d2b0', coatLen: -140, seed: 514 },
    steuben: { kind: 'coat', cloth: '#1e2a4a', legs: '#1e2a4a', facings: '#c23a2c', hat: 'tricorne', hatCol: '#1e1a20', hatTrim: '#e8d8a8', hair: '#e8e4dc', skin: '#f0b898', coatLen: -130, epaulette: '#d8b048', btn: '#d8b048', seed: 515 },
    cornwallis: { kind: 'coat', cloth: RED, legs: WHITE, facings: '#1e3a7a', hat: 'tricorne', hatTrim: '#d8b048', hair: '#e8e4dc', skin: '#f4d2b0', coatLen: -130, epaulette: '#d8b048', sash: '#c8323a', seed: 516 },
    degrasse: { kind: 'coat', cloth: '#1e2a5a', legs: '#e8e4d8', facings: '#c23a2c', hat: 'tricorne', hatTrim: '#d8b048', hair: '#e8e4dc', skin: '#f0c8a0', coatLen: -130, epaulette: '#d8b048', seed: 517 },
    rochambeau: { kind: 'coat', cloth: '#e8e4d8', legs: '#e8e4d8', facings: '#1e3a7a', hat: 'tricorne', hatTrim: '#d8b048', hair: '#e8e4dc', skin: '#f0c8a0', coatLen: -130, sash: '#c23a2c', seed: 518 },
    dunmore: { kind: 'coat', cloth: RED, legs: WHITE, facings: '#1e3a7a', hat: 'tricorne', hair: '#c8b898', skin: '#f4d2b0', coatLen: -130, seed: 519 },
    clinton: { kind: 'coat', cloth: RED, legs: WHITE, facings: '#1e3a7a', hat: 'tricorne', hatTrim: '#d8b048', hair: '#d8d0c0', skin: '#f0c8a0', coatLen: -130, epaulette: '#d8b048', seed: 520 },
    george: { kind: 'coat', cloth: '#7a1a2a', legs: WHITE, hat: 'crown', hair: '#e8e4dc', skin: '#f4d2b0', coatLen: -110, sash: '#2a4a9a', seed: 521 },
    adams: { kind: 'coat', cloth: '#3a2a20', legs: '#3a2a20', hair: '#d8d0c8', hairStyle: 'bald', skin: '#f0c0a0', coatLen: -140, seed: 522 },
    peckham: { kind: 'coat', cloth: '#5a5a60', legs: '#3a3a40', tie: '#7a2a2a', hair: '#8a8a84', glasses: true, skin: '#f0c8a0', seed: 523 },
  };
  G.PEOPLE = {
    redcoat: i => ({ kind: 'coat', cloth: RED, legs: WHITE, facings: '#1e3a7a', hat: 'tricorne', coatLen: -140, belt: WHITE, seed: 600 + i }),
    continental: i => ({ kind: 'coat', cloth: BLUE, legs: BUFF, facings: BUFF, hat: 'tricorne', coatLen: -140, skin: ['#f2c9a2', '#e8b48c', '#c98e66', '#6a3e2a'][i % 4], seed: 610 + i }),
    // the army as it really looked in 1776: mismatched farm clothes, hunting shirts, rags
    ragged: i => ({ kind: 'coat', cloth: ['#6a5a44', '#5a4a3a', '#7a6a50', '#4a4a3a', '#8a7050'][i % 5], legs: ['#6a5a44', '#4a3a2a', '#7a6a5a'][i % 3], hat: ['tricorne', 'flatcap', null, 'tricorne', 'fur'][i % 5], hatCol: '#3a2a20', hair: ['#5a3a24', '#3a2416', '#8a6a3a', '#1a1410'][i % 4], skin: ['#f2c9a2', '#e8b48c', '#c98e66', '#6a3e2a', '#f4d2b0'][i % 5], coatLen: -150, seed: 620 + i }),
    militia: i => ({ kind: 'coat', cloth: ['#5a4a3a', '#6a5a44', '#4a3a2a'][i % 3], legs: '#4a3a2a', hat: i % 2 ? 'tricorne' : 'flatcap', hatCol: '#3a2a20', hair: ['#5a3a24', '#3a2416', '#8a6a3a'][i % 3], coatLen: -150, seed: 640 + i }),
    hessian: i => ({ kind: 'coat', cloth: '#1e2a5a', legs: '#e8d8a0', facings: '#c23a2c', hat: 'mitre', hatCol: '#d8b048', mustache: '#3a2a1e', hair: '#5a3a24', coatLen: -140, belt: WHITE, seed: 650 + i }),
    french: i => ({ kind: 'coat', cloth: '#efeae0', legs: '#efeae0', facings: '#1e3a7a', hat: 'tricorne', coatLen: -140, seed: 660 + i }),
    colonist: i => ({ kind: i % 3 === 1 ? 'woman' : 'coat', cloth: ['#6a5a4a', '#8a6a5a', '#5a6a5a', '#7a5a3a'][i % 4], legs: '#4a3a2a', hat: i % 3 === 0 ? 'tricorne' : null, hatCol: '#2a2020', scarf: i % 3 === 1 ? '#e8dcc8' : undefined, hair: ['#3a2416', '#8a6a3a', '#5a3a24'][i % 3], coatLen: -150, seed: 670 + i }),
    loyalist: i => ({ kind: i % 2 ? 'woman' : 'coat', cloth: ['#3a3a5a', '#5a4a6a', '#4a3a3a'][i % 3], legs: '#3a3a40', hat: i % 2 ? null : 'tricorne', scarf: i % 2 ? '#d8c8e0' : undefined, hair: ['#5a4a3a', '#c8b898'][i % 2], coatLen: -150, seed: 680 + i }),
    black: i => ({ kind: i % 3 === 2 ? 'woman' : 'coat', cloth: ['#6a4a3a', '#5a5a44', '#8a6a4a'][i % 3], legs: '#4a3a2a', scarf: i % 3 === 2 ? '#c8b898' : undefined, hat: i % 3 === 0 ? 'flatcap' : null, hatCol: '#4a3a2a', skin: ['#6a3e2a', '#8a5a3a', '#5a3424'][i % 3], hair: '#1a1410', coatLen: -150, seed: 690 + i }),
    blackSoldier: i => ({ kind: 'coat', cloth: '#2a3a6a', legs: BUFF, facings: '#efe6d2', hat: i % 2 ? 'tricorne' : 'kepi', hatCol: '#1e1a20', skin: ['#6a3e2a', '#8a5a3a'][i % 2], hair: '#1a1410', coatLen: -140, seed: 700 + i }),
    haudenosaunee: i => ({ kind: 'tunic', cloth: ['#8a5a34', '#6a4a2a', '#7a5a3a'][i % 3], hat: i % 2 ? 'feather' : null, hatCol: '#c8a040', hair: '#1a1410', hairStyle: i % 2 ? 'short' : 'long', skin: ['#b88060', '#c08868'][i % 2], seed: 710 + i }),
    mp: i => ({ kind: 'coat', cloth: ['#1e1e24', '#3a2a44', '#2a3a2a', '#4a2a24'][i % 4], legs: '#2a2a30', hair: '#e8e4dc', skin: ['#f2c9a2', '#f4d2b0'][i % 2], coatLen: -120, seed: 720 + i }),
    sailor: i => ({ kind: 'coat', cloth: '#2a3a5a', legs: '#e8e4d8', hat: 'flatcap', hatCol: '#1e2a4a', hair: '#3a2416', coatLen: -170, seed: 730 + i }),
    prisoner: i => ({ kind: 'tunic', cloth: ['#8a8070', '#6a6050', '#7a7060'][i % 3], legs: '#5a5040', hair: ['#5a3a24', '#3a2416'][i % 2], beard: i % 2 === 0, beardCol: '#5a3a24', skin: ['#e8c8a8', '#d8b898'][i % 2], seed: 740 + i }),
    modern: i => ({ kind: 'coat', cloth: ['#3a6ab8', '#c23a2c', '#5a8a4a', '#e8b030', '#7a5a9a'][i % 5], legs: ['#3a3a44', '#4a5a7a'][i % 2], hair: ['#5a3a24', '#c8a050', '#1a1410'][i % 3], skin: ['#f2c9a2', '#c98e66', '#e8b48c', '#6a3e2a', '#a8724e'][i % 5], seed: 750 + i }),
  };
})(window);
