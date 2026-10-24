/* Canada — the cast, drawn in the Rome series' style (G.Paint.person, 'coat' kind for 18th–20th c. clothes, hats in monk.js).
 * Real people get a cartoon look based on their portraits; the portraits themselves appear as collage cut-outs. */
(function (G) {
  'use strict';
  G.CAST = {
    buster: { kind: 'coat', cloth: '#6a6a5a', legs: '#5a5a4a', hat: 'bowler', hatCol: '#3a3228', mustache: '#3a2a1e', tie: '#a8322a', hair: '#3a2a1e', skin: '#f0c8a0', seed: 21 },
    busterUniform: { kind: 'coat', cloth: '#7a7a50', legs: '#6a6a44', hat: 'kepi', hatCol: '#6a6a44', hatTrim: '#a8322a', mustache: '#3a2a1e', belt: '#5a3a24', hair: '#3a2a1e', skin: '#f0c8a0', seed: 21 },
    cartier: { kind: 'coat', cloth: '#4a1a2a', legs: '#2a1a1a', coatLen: -170, hat: 'beret', hatCol: '#1e1a20', beard: true, hair: '#3a2416', beardCol: '#3a2416', skin: '#f0c8a0', seed: 11 },
    wolfe: { kind: 'coat', cloth: '#b8322a', legs: '#efe6d2', facings: '#1e3a7a', hat: 'tricorne', hair: '#c8a878', skin: '#f4d2b0', coatLen: -130, seed: 31 },
    montcalm: { kind: 'coat', cloth: '#e8e4d8', legs: '#e8e4d8', facings: '#1e3a7a', hat: 'tricorne', hair: '#e8e4dc', skin: '#f0c8a0', coatLen: -130, sash: '#c23a2c', seed: 32 },
    montgomery: { kind: 'coat', cloth: '#2a3a6a', legs: '#d8c090', facings: '#d8c090', hat: 'tricorne', hair: '#5a3a24', skin: '#f0c8a0', coatLen: -130, epaulette: '#d8b048', seed: 33 },
    arnold: { kind: 'coat', cloth: '#2a3a6a', legs: '#d8c090', facings: '#d8c090', hat: 'tricorne', hair: '#3a2416', skin: '#e8b48c', coatLen: -130, sash: '#c23a2c', seed: 34 },
    macdonald: { kind: 'coat', cloth: '#1e1e24', legs: '#2a2a30', hair: '#4a3a2e', hairStyle: 'curly', tie: '#1e1e24', skin: '#f0c8a0', coatLen: -140, seed: 35 },
    riel: { kind: 'coat', cloth: '#2a2a30', legs: '#3a3a40', hair: '#2a1e18', hairStyle: 'curly', mustache: '#2a1e18', tie: '#1a1a1e', skin: '#d8a880', coatLen: -150, seed: 36 },
    trudeau: { kind: 'coat', cloth: '#2a3a5a', legs: '#2a3a5a', hair: '#4a3a2e', tie: '#7a2a3a', skin: '#f0c8a0', seed: 37 },
    levesque: { kind: 'coat', cloth: '#2a2a2a', legs: '#2a2a2a', hair: '#3a2a1e', hairStyle: 'bald', tie: '#5a4a3a', skin: '#e8b48c', seed: 38 },
    charles: { kind: 'coat', cloth: '#7a1a2a', legs: '#2a1a1a', hat: 'crown', hair: '#1e1410', hairStyle: 'long', mustache: '#1e1410', skin: '#e8b48c', coatLen: -110, seed: 39 },
    donnacona: { kind: 'tunic', cloth: '#8a5a34', hat: 'feather', hair: '#1a1410', hairStyle: 'long', skin: '#b88060', seed: 40 },
    youngA: { kind: 'tunic', cloth: '#9a6a3a', hair: '#1a1410', hairStyle: 'long', skin: '#c08868', seed: 41 },
    youngB: { kind: 'tunic', cloth: '#7a4a2a', hair: '#1a1410', hairStyle: 'long', skin: '#b88060', seed: 42 },
    mulroney: { kind: 'coat', cloth: '#2a2a3a', legs: '#2a2a3a', hair: '#3a2a1e', tie: '#2a4a8a', skin: '#f0c8a0', seed: 43 },
    queen: { kind: 'stola', cloth: '#5a8ac8', cloth2: '#e8e4f0', hair: '#5a4a3a', hairStyle: 'bun', hat: 'crown', skin: '#f4d2b0', seed: 44 },
  };
  // generic period people
  G.PEOPLE = {
    redcoat: i => ({ kind: 'coat', cloth: '#b8322a', legs: '#efe6d2', facings: '#1e3a7a', hat: 'tricorne', coatLen: -140, belt: '#efe6d2', seed: 200 + i }),
    frenchSoldier: i => ({ kind: 'coat', cloth: '#e8e4d8', legs: '#e8e4d8', facings: '#1e3a7a', hat: 'tricorne', coatLen: -140, seed: 210 + i }),
    continental: i => ({ kind: 'coat', cloth: '#2a3a6a', legs: '#d8c090', facings: '#d8c090', hat: 'tricorne', coatLen: -140, seed: 220 + i }),
    settler: i => ({ kind: i % 3 === 1 ? 'woman' : 'coat', cloth: ['#6a5a4a', '#8a6a5a', '#5a6a5a', '#7a5a3a'][i % 4], legs: '#4a3a2a', hat: i % 3 === 0 ? 'top' : null, hatCol: '#3a2a20', scarf: '#d8c8a8', hair: ['#3a2416', '#8a6a3a', '#2a1a14'][i % 3], seed: 230 + i }),
    blackLoyalist: i => ({ kind: i % 2 ? 'woman' : 'coat', cloth: ['#6a4a3a', '#8a6a4a'][i % 2], legs: '#4a3a2a', scarf: '#c8b898', skin: ['#6a3e2a', '#8a5a3a'][i % 2], hair: '#1a1410', seed: 240 + i }),
    fenian: i => ({ kind: 'coat', cloth: '#2a5a3a', legs: '#3a3a44', hat: 'kepi', hatCol: '#2a5a3a', hatTrim: '#d8b048', beard: i % 2 === 0, hair: '#8a4a2a', beardCol: '#8a4a2a', seed: 250 + i }),
    militia: i => ({ kind: 'coat', cloth: '#1e3a2a', legs: '#1e2a24', hat: 'kepi', hatCol: '#1e3a2a', seed: 260 + i }),
    politician: i => ({ kind: 'coat', cloth: ['#1e1e24', '#2a2a34', '#3a2a24'][i % 3], legs: '#2a2a30', hat: i % 2 ? 'top' : null, beard: i % 3 === 2, mustache: i % 3 === 1 ? '#5a4a3a' : null, hair: ['#5a4a3a', '#8a8a84', '#2a1a14'][i % 3], seed: 270 + i }),
    metis: i => ({ kind: 'coat', cloth: ['#3a4a6a', '#5a3a2a', '#2a3a2a'][i % 3], legs: '#3a3a3a', sash: '#c23a2c', hat: i % 2 ? 'flatcap' : 'fur', hatCol: '#5a3a24', hair: '#2a1a14', skin: ['#c08868', '#d8a880'][i % 2], seed: 280 + i }),
    cree: i => ({ kind: 'tunic', cloth: ['#8a5a34', '#6a4a2a', '#7a5a3a'][i % 3], hair: '#1a1410', hairStyle: 'long', skin: ['#b88060', '#c08868'][i % 2], seed: 290 + i }),
    inuk: i => ({ kind: 'tunic', cloth: '#d8c8a8', hat: 'parka', hatCol: '#e8e0d0', skin: '#c89070', seed: 300 + i }),
    chinese: i => ({ kind: 'tunic', cloth: ['#4a5a6a', '#5a5a4a', '#3a4a5a'][i % 3], legs: '#3a3a3a', hat: 'conical', hair: '#1a1410', skin: '#e8c090', seed: 310 + i }),
    japanese: i => ({ kind: 'coat', cloth: ['#3a4a5a', '#5a4a3a', '#2a3a4a'][i % 3], legs: '#3a3a40', hat: i % 2 ? 'flatcap' : null, hair: '#1a1410', skin: '#e8c090', seed: 320 + i }),
    soldier1917: i => ({ kind: 'coat', cloth: '#7a7a50', legs: '#6a6a44', hat: 'brodie', hatCol: '#6a6a4a', belt: '#5a3a24', seed: 330 + i }),
    modern: i => ({ kind: 'coat', cloth: ['#3a6ab8', '#c23a2c', '#5a8a4a', '#e8b030', '#7a5a9a'][i % 5], legs: ['#3a3a44', '#4a5a7a'][i % 2], hair: ['#5a3a24', '#c8a050', '#1a1410'][i % 3], skin: ['#f2c9a2', '#c98e66', '#e8b48c', '#6a3e2a', '#a8724e'][i % 5], seed: 340 + i }),
    child: i => ({ kind: i % 2 ? 'woman' : 'tunic', cloth: ['#8a6a4a', '#6a7a8a', '#9a7a5a'][i % 3], hair: '#1a1410', hairStyle: 'long', skin: ['#b88060', '#c08868', '#c89070'][i % 3], seed: 350 + i }),
    quebecer: i => ({ kind: i % 2 ? 'woman' : 'coat', cloth: ['#2a4a8a', '#5a6a7a', '#8a3a3a'][i % 3], legs: '#3a3a44', hair: ['#3a2416', '#8a6a3a'][i % 2], seed: 360 + i }),
  };
})(window);
