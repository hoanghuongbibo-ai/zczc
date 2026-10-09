/* Music bed + UI foley for the money channel (replaces houdini/js/sound.js on biz pages — that one is a dark
 * history score). Light, bright and out of the way of the voice: a soft marimba-style pluck pattern over a
 * major progression, a gentle kick and shaker, and short "explainer video" foley (pops, dings, swooshes, stamps).
 * Moods (switched at cue times): 'bright' (full bed), 'soft' (plucks + pad only), 'tense' (minor pulse),
 * 'investigate' (curious minor pizzicato + ticking hat — scandals, "how they quietly…" stories),
 * 'pop' (upbeat corporate pop: four-on-the-floor kick, claps, bright plucks), and the history channel's myth-buster score:
 * 'mstill' (sparse low piano chords + clock tick), 'mystery' (low drone + high piano notes), 'mtense' (low string pulse + ticks + bowed pad), 'none'.
 * Same API as the history score: G.Soundtrack.render({ duration, sfx:[{t, type, gain}], moods:[{t, mood}] }). */
(function (G) {
  'use strict';
  const SR = 44100, BPM = 100, BEAT = 60 / BPM;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296 * 2 - 1; }; }
  const at = t => Math.floor(t * SR);

  // ---- instruments ----
  function pluck(b, t, n, vel = 1, dec = 7) { // marimba-ish: sine + soft octave, fast decay
    const f = midi(n), s = at(t);
    for (let i = 0; i < .9 * SR && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x * 600) * Math.exp(-x * dec);
      b[s + i] += vel * e * .2 * (Math.sin(2 * Math.PI * f * x) + .35 * Math.sin(4 * Math.PI * f * x) * Math.exp(-x * 14) + .12 * Math.sin(2 * Math.PI * f * 3.9 * x) * Math.exp(-x * 30)); }
  }
  function pad(b, t, notes, dur, vel = 1) { // warm sine pad with slow swell
    const s = at(t);
    for (const n of notes) { const f = midi(n);
      for (let i = 0; i < dur * SR && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x / .6) * Math.min(1, (dur - x) / .6);
        b[s + i] += vel * e * .05 * (Math.sin(2 * Math.PI * f * x) + .2 * Math.sin(2 * Math.PI * f * 2.003 * x)); } }
  }
  function tone(b, t, dur, fFn, vel, decay) {
    const s = at(t); let ph = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) { const x = i / SR; ph += fFn(x) / SR; b[s + i] += vel * Math.sin(2 * Math.PI * ph) * Math.exp(-x * decay) * Math.min(1, x * 800); }
  }
  function noise(b, t, dur, vel, lpK, envFn, seed = 1, hp = false) {
    const r = rng(seed), s = at(t); let lp = 0, prev = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) { lp += (r() - lp) * lpK; const v = hp ? lp - prev : lp; prev = lp; b[s + i] += vel * v * envFn(i / SR / dur); }
  }
  const kick = (b, t, v = 1) => tone(b, t, .22, x => 120 * Math.exp(-x * 30) + 48, .55 * v, 14);
  const shaker = (b, t, v = 1, seed = 1) => noise(b, t, .06, .35 * v, .9, k => Math.pow(1 - k, 3), seed, true);
  const clap = (b, t, v = 1, seed = 1) => { for (let j = 0; j < 3; j++) noise(b, t + j * .011, .09, .32 * v, .55, k => Math.pow(1 - k, 4), seed + j, true); };

  // ---- foley ----
  const SFX = {
    pop(b, t) { tone(b, t, .09, x => 520 + x * 5200, .5, 30); },                                        // bubble / card pop-in
    click(b, t) { noise(b, t, .015, 1, .9, k => 1 - k, 11, true); tone(b, t, .04, () => 2600, .15, 90); },
    whoosh(b, t) { noise(b, t, .45, .8, .1, k => Math.sin(Math.PI * k), 14); },
    swoosh(b, t) { noise(b, t, .28, .7, .25, k => Math.sin(Math.PI * k) * (1 - k * .5), 15, true); },
    thud(b, t) { tone(b, t, .3, x => 110 - x * 160, .9, 12); noise(b, t, .08, .7, .12, k => 1 - k, 26); },
    stamp(b, t) { tone(b, t, .25, x => 90 - x * 100, 1, 16); noise(b, t, .06, 1, .3, k => 1 - k, 27); },
    paper(b, t) { noise(b, t, .14, .9, .35, k => Math.pow(1 - k, 2), 17); },
    ding(b, t) { for (const [f, v] of [[1568, .3], [2093, .18], [3136, .06]]) tone(b, t, 1.2, () => f, v, 4); },
    cash(b, t) { SFX.ding(b, t + .08); noise(b, t, .08, .6, .6, k => 1 - k, 31, true); for (let i = 0; i < 5; i++) tone(b, t + .02 * i, .05, () => 3000 + i * 400, .08, 60); },
    tick(b, t) { noise(b, t, .01, .9, .9, k => 1 - k, 33, true); },
    type(b, t) { const r = rng(34); for (let i = 0; i < 8; i++) noise(b, t + i * .07 + r() * .02, .012, .7, .9, k => 1 - k, 40 + i, true); },
    buzz(b, t) { tone(b, t, .35, () => 140, .35, 3); tone(b, t, .35, () => 147, .3, 3); },           // "wrong" buzzer
    boing(b, t) { tone(b, t, .5, x => 300 + Math.sin(x * 60) * 80 * Math.exp(-x * 6), .4, 6); },
    rise(b, t) { tone(b, t, .8, x => 300 + x * 900, .12, 1.5); noise(b, t, .8, .25, .05, k => k * k, 35); },
    mail(b, t) { noise(b, t, .2, .6, .3, k => Math.sin(Math.PI * k), 36); tone(b, t + .12, .06, () => 900, .12, 40); },
  };

  // ---- myth-buster score (ported from the history channel, houdini/js/sound.js) ----
  function piano(b, t, notes, vel = 1, dec = 1.6) { const s = at(t), len = 4 * SR;
    for (const n of notes) { const f = midi(n); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, env = Math.min(1, x * 400) * Math.exp(-x * dec);
      b[s + i] += vel * env * .22 * (Math.sin(2 * Math.PI * f * x) + .4 * Math.sin(4 * Math.PI * f * x) * Math.exp(-x * 3) + .15 * Math.sin(6 * Math.PI * f * x) * Math.exp(-x * 6)); } } }
  function bowed(b, t, note, dur, vel = 1) { const f = midi(note), s = at(t), len = Math.floor(dur * SR); let ph = 0;
    for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, env = Math.min(1, x / .25) * Math.min(1, (dur - x) / .3); ph += f * (1 + .004 * Math.sin(2 * Math.PI * 5.2 * x)) / SR;
      b[s + i] += vel * env * .5 * (Math.sin(2 * Math.PI * ph) + .3 * Math.sin(4 * Math.PI * ph) + .12 * Math.sin(6 * Math.PI * ph)); } }
  const tickC = (b, t, v = 1, hi = true) => { noise(b, t, .012, v, .9, k => 1 - k, hi ? 61 : 62, true); tone(b, t, .03, () => hi ? 2400 : 1800, .08 * v, 80); };
  const MYTH = new Set(['mstill', 'mystery', 'mtense']), PROGd = [[38, 50, 53, 57], [34, 46, 50, 53], [31, 43, 46, 50], [33, 45, 49, 52]]; // Dm Bb Gm A
  function mythScore(m, cues, dur) {
    const moodAt = t => { let md = cues[0].mood; for (const c of cues) if (t >= c.t) md = c.mood; return md; };
    for (let t = 0, k = 0; t < dur; t += 3.2, k++) if (moodAt(t) === 'mstill') piano(m, t, PROGd[k % 4], .55, 1.1);
    for (let t = .5; t < dur; t += 1) if (moodAt(t) === 'mstill') tickC(m, t, .35, Math.round(t) % 2 === 0);
    const beat = 60 / 96 / 2;
    for (let t = 0, k = 0; t < dur; t += beat, k++) if (moodAt(t) === 'mtense') { tone(m, t, beat * .9, () => midi(k % 8 === 7 ? 37 : 38), .32, 6); if (k % 2 === 0) tickC(m, t, .22, k % 4 === 0); }
    for (const c of cues) if (c.mood === 'mtense') { const end = (cues.find(x => x.t > c.t) || { t: dur }).t; for (let t = c.t, k = 0; t < end; t += 2.5, k++) bowed(m, t, [62, 65, 62, 61][k % 4], Math.min(2.6, end - t), .1); }
    for (let t = 0; t < dur; t += .02) if (moodAt(t) === 'mystery') { const s0 = at(t); for (let i = 0; i < .02 * SR && s0 + i < m.length; i++) { const x = (s0 + i) / SR; m[s0 + i] += (Math.sin(2 * Math.PI * 49 * x) * .5 + Math.sin(2 * Math.PI * 73.4 * x) * .25) * .16; } }
    for (let t = 0, k = 0; t < dur; t += 1.6, k++) if (moodAt(t) === 'mystery') piano(m, t, [[74], [77], [73], [70]][k % 4], .32, 1.2);
  }

  // ---- the bed ----
  // C – Am – F – G, one chord per bar (4 beats)
  const CH = [[48, [60, 64, 67, 72]], [45, [57, 60, 64, 69]], [41, [57, 60, 65, 69]], [43, [55, 59, 62, 67]]];
  const CHm = [[45, [57, 60, 64]], [41, [57, 60, 65]], [40, [55, 59, 64]], [45, [57, 60, 64]]];   // tense: Am F Em Am
  const CHp = [[48, [60, 64, 67, 72]], [43, [59, 62, 67, 71]], [45, [60, 64, 69, 72]], [41, [60, 65, 69, 72]]];   // pop: C G Am F
  function score(m, o) {
    const dur = o.duration, cues = o.moods || [{ t: 0, mood: 'bright' }];
    const moodAt = t => { let md = cues[0].mood; for (const c of cues) if (t >= c.t) md = c.mood; return md; };
    const eighth = BEAT / 2, PAT = [0, 2, 1, 2, 3, 2, 1, 2];
    for (let k = 0, t = 0; t < dur; k++, t = k * eighth) {
      const md = moodAt(t); if (md === 'none' || MYTH.has(md)) continue;
      const bar = Math.floor(k / 8), [bass, ch] = (md === 'tense' || md === 'investigate' ? CHm : md === 'pop' ? CHp : CH)[bar % 4], i = k % 8;
      if (md === 'tense') { tone(m, t, eighth * .9, () => midi(bass - 12 + 24), .07, 8); if (i % 4 === 0) kick(m, t, .6); continue; }
      if (md === 'pop') { // upbeat corporate pop: kick on every beat, claps on 2 and 4, off-beat bass, bright arpeggio, a little hook every other bar
        const ARP = [0, 1, 2, 3, 2, 1, 2, 3];
        pluck(m, t, ch[ARP[i]] + 12, i % 2 ? .3 : .42, 9);
        if (i % 2 === 0) kick(m, t, .7); if (i === 2 || i === 6) clap(m, t, .9, k); shaker(m, t + eighth / 2, .4, k + 7);
        if (i % 2 === 1) pluck(m, t, bass + 12, .55, 6);
        if (i === 0) pad(m, t, ch.slice(0, 3), BEAT * 4, .4);
        if (bar % 2 === 1 && (i === 4 || i === 5 || i === 7)) pluck(m, t, ch[[3, 2, 3][i === 4 ? 0 : i === 5 ? 1 : 2]] + 24, .22, 12);
        continue; }
      if (md === 'investigate') { // sneaky pizzicato walk over the minor loop, soft kick on 1 and 3, a ticking hat
        const WALK = [0, null, 2, 1, null, 2, 0, 1];
        if (WALK[i] !== null) pluck(m, t, ch[WALK[i]], i === 0 ? .5 : .34, 16);
        if (i === 0) { pluck(m, t, bass, .6, 5); pad(m, t, ch.slice(0, 3), BEAT * 4, .35); }
        if (i % 4 === 0) kick(m, t, .45); shaker(m, t, i % 2 ? .22 : .35, k);
        if (bar % 4 === 3 && i === 6) pluck(m, t, ch[2] + 12, .3, 10);
        continue; }
      pluck(m, t, ch[PAT[i]] + 12, i === 0 ? .55 : .38, md === 'soft' ? 9 : 7);
      if (i === 0) { pluck(m, t, bass, .7, 3); pad(m, t, ch.slice(0, 3), BEAT * 4, md === 'soft' ? .8 : .55); }
      if (md === 'bright') { if (i % 4 === 0) kick(m, t, .55); if (i % 2 === 1) shaker(m, t, .5, k); }
    }
  }

  function render(o) {
    const buf = new Float32Array(Math.ceil(o.duration * SR));
    score(buf, o);
    if ((o.moods || []).some(c => MYTH.has(c.mood))) mythScore(buf, o.moods, o.duration);
    const fadeOut = o.fadeOut ?? 1.5;
    for (let i = 0; i < buf.length; i++) buf[i] *= (o.musicGain ?? .32) * Math.min(1, i / SR / .6) * Math.min(1, (o.duration - i / SR) / fadeOut);
    for (const c of o.sfx || []) if (SFX[c.type]) {
      const tmp = new Float32Array(3 * SR), s0 = at(c.t); SFX[c.type](tmp, 0);              // render the effect in a 3 s window, then mix it in
      const g = (c.gain ?? 1) * (o.sfxGain ?? .4); for (let i = 0; i < tmp.length && s0 + i < buf.length; i++) buf[s0 + i] += tmp[i] * g;
    }
    let pk = 0; for (const v of buf) pk = Math.max(pk, Math.abs(v)); if (pk > .95) for (let i = 0; i < buf.length; i++) buf[i] *= .95 / pk;
    return buf;
  }
  G.Soundtrack = { SR, render };
})(window);
