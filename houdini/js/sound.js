/* Procedural score + foley for the Houdini opening, synthesised in plain JS.
 * Moods (switched at cue times): 'still' — sparse low piano + clock tick;
 * 'tense' — pulsing low strings ostinato + ticking; 'silence' — room tone only. */
(function (G) {
  'use strict';
  const SR = 44100;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296 * 2 - 1; }; }
  const at = (b, t) => Math.floor(t * SR);

  // ---- instruments ----
  function piano(b, t, notes, vel = 1, dec = 1.6) {
    const s = at(b, t), len = Math.floor(4 * SR);
    for (const n of notes) {
      const f = midi(n);
      for (let i = 0; i < len && s + i < b.length; i++) {
        const x = i / SR, env = Math.min(1, x * 400) * Math.exp(-x * dec);
        b[s + i] += vel * env * .22 * (Math.sin(2 * Math.PI * f * x) + .4 * Math.sin(4 * Math.PI * f * x) * Math.exp(-x * 3) + .15 * Math.sin(6 * Math.PI * f * x) * Math.exp(-x * 6));
      }
    }
  }
  function bowed(b, t, note, dur, vel = 1) { // soft string pad with slow swell and vibrato
    const f = midi(note), s = at(b, t), len = Math.floor(dur * SR); let ph = 0;
    for (let i = 0; i < len && s + i < b.length; i++) {
      const x = i / SR, env = Math.min(1, x / .25) * Math.min(1, (dur - x) / .3);
      ph += f * (1 + .004 * Math.sin(2 * Math.PI * 5 * x)) / SR;
      const saw = 2 * (ph % 1) - 1;
      b[s + i] += vel * env * (Math.sin(2 * Math.PI * ph) * .6 + saw * .12);
    }
  }
  function tick(b, t, vel = 1, hi = true) { // clock tick: short band-ish click
    const r = rng(hi ? 3 : 4), s = at(b, t); let p = 0;
    for (let i = 0; i < .03 * SR && s + i < b.length; i++) { const n = r(); const hp = n - p; p = n; b[s + i] += vel * hp * Math.exp(-i / SR * 220) * .8; }
    tone(b, t, .03, () => hi ? 2400 : 1800, vel * .25, 160);
  }
  function tone(b, t, dur, fFn, vel, decay) {
    const s = at(b, t); let ph = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) { const x = i / SR; ph += fFn(x) / SR; b[s + i] += vel * Math.sin(2 * Math.PI * ph) * Math.exp(-x * decay) * Math.min(1, x * 800); }
  }
  function noise(b, t, dur, vel, lpK, envFn, seed = 1) {
    const r = rng(seed), s = at(b, t); let lp = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) { lp += (r() - lp) * lpK; b[s + i] += vel * lp * envFn(i / SR / dur); }
  }

  // ---- foley ----
  const SFX = {
    click(b, t) { // handcuff latch: metallic click + ring
      noise(b, t, .02, 1.2, .9, k => 1 - k, 11);
      for (const f of [3150, 4720, 6180]) tone(b, t, .25, () => f, .12, 28);
      noise(b, t + .045, .015, .8, .9, k => 1 - k, 12);
    },
    clang(b, t) { for (const [f, d] of [[220, 3], [347, 4], [523, 5], [811, 7], [1290, 9]]) tone(b, t, 1.6, () => f, .25, d); noise(b, t, .05, 1, .6, k => 1 - k, 13); },
    rattle(b, t) { for (let k = 0; k < 6; k++) SFX.click(b, t + k * .045 + (k % 2) * .01); },
    whoosh(b, t) { noise(b, t, .5, .7, .08, k => Math.sin(Math.PI * k), 14); },
    hit(b, t) { tone(b, t, .45, x => 90 - x * 80, 1, 7); noise(b, t, .1, .8, .1, k => 1 - k, 15); },
    swell(b, t) { noise(b, t, 1.2, .35, .03, k => k * k * (1 - k) * 4, 16); },
    paper(b, t) { noise(b, t, .12, .9, .35, k => Math.pow(1 - k, 2), 17); },
    splash(b, t) { noise(b, t, .7, .9, .25, k => Math.pow(1 - k, 2), 21); noise(b, t + .05, .5, .5, .06, k => Math.sin(Math.PI * k) * (1 - k), 22); },
    bubbles(b, t) { const r = rng(23); for (let i = 0; i < 14; i++) { const tt = t + i * .11 + r() * .06, f0 = 500 + r() * 700; tone(b, tt, .07, x => f0 + x * 4000, .18, 30); } },
    ratchet(b, t) { for (let k = 0; k < 5; k++) { noise(b, t + k * .055, .012, .9, .9, q => 1 - q, 30 + k); tone(b, t + k * .055, .04, () => 1900, .1, 70); } },
    creak(b, t) { tone(b, t, .45, x => 180 + Math.sin(x * 40) * 30 + x * 120, .25, 4); noise(b, t, .45, .2, .08, k => Math.sin(Math.PI * k), 24); },
    scratch(b, t) { const r = rng(25); for (let i = 0; i < 8; i++) noise(b, t + i * .06 + r() * .02, .045, .5, .5, k => Math.sin(Math.PI * k), 40 + i); },
    thud(b, t) { tone(b, t, .3, x => 110 - x * 160, .9, 12); noise(b, t, .08, .7, .12, k => 1 - k, 26); },
    press(b, t) { for (let i = 0; i < 9; i++) { tone(b, t + i * .07, .06, () => 70, .5, 30); noise(b, t + i * .07, .03, .5, .4, k => 1 - k, 50 + i); } },
    slide(b, t) { noise(b, t, .25, .45, .3, k => Math.sin(Math.PI * k), 27); },
    wind(b, t) { noise(b, t, 3, .35, .02, k => Math.sin(Math.PI * k), 28); },
    boom(b, t) { tone(b, t, 2.2, x => 55 - x * 8, 1, 1.6); noise(b, t, .3, .6, .05, k => 1 - k, 29); },
    window(b, t) { noise(b, t, .9, .25, .05, k => Math.sin(Math.PI * k), 18); }, // soft air as we pass through the glass
  };

  // ---- score ----
  const PROG = [[38, 50, 53, 57], [34, 46, 50, 53], [31, 43, 46, 50], [33, 45, 49, 52]]; // Dm Bb Gm A
  function score(m, o) {
    const dur = o.duration, cues = o.moods || [{ t: 0, mood: 'still' }];
    const moodAt = t => { let md = cues[0].mood; for (const c of cues) if (t >= c.t) md = c.mood; return md; };
    // 'still': one low chord every 3.2 s, clock tick every second
    for (let t = 0, k = 0; t < dur; t += 3.2, k++) if (moodAt(t) === 'still') piano(m, t, PROG[k % 4], .55, 1.1);
    for (let t = .5; t < dur; t += 1) if (moodAt(t) === 'still') tick(m, t, .35, Math.round(t) % 2 === 0);
    // 'tense': eighth-note low string pulse (D pedal) + held pad + faster ticks
    const beat = 60 / 96 / 2;
    for (let t = 0, k = 0; t < dur; t += beat, k++) if (moodAt(t) === 'tense') {
      tone(m, t, beat * .9, () => midi(k % 8 === 7 ? 37 : 38), .32, 6);
      if (k % 2 === 0) tick(m, t, .22, k % 4 === 0);
    }
    for (const c of cues) if (c.mood === 'tense') {
      const end = (cues.find(x => x.t > c.t) || { t: dur }).t;
      for (let t = c.t, k = 0; t < end; t += 2.5, k++) bowed(m, t, [62, 65, 62, 61][k % 4], Math.min(2.6, end - t), .1);
    }
    for (let t = 0; t < dur; t += .02) {
      const md = moodAt(t);
      if (md === 'under' || md === 'mystery') { const s0 = at(m, t); for (let i = 0; i < .02 * SR && s0 + i < m.length; i++) { const x = (s0 + i) / SR; m[s0 + i] += (Math.sin(2 * Math.PI * 49 * x) * .5 + Math.sin(2 * Math.PI * 73.4 * x) * .25 * (md === 'mystery' ? 1 : .3)) * .16; } }
    }
    for (let t = 0, k = 0; t < dur; t += 1.6, k++) if (moodAt(t) === 'mystery') piano(m, t, [[74], [77], [73], [70]][k % 4], .32, 1.2);
    // gramophone-ish room hiss under everything
    const r = rng(5); let lp = 0;
    for (let i = 0; i < m.length; i++) { lp += (r() - lp) * .05; m[i] += lp * .02; }
  }

  function render(o) {
    const buf = new Float32Array(Math.ceil(o.duration * SR));
    score(buf, o);
    for (let i = 0; i < buf.length; i++) buf[i] *= (o.musicGain ?? .5) * Math.min(1, i / SR / .8) * Math.min(1, (o.duration - i / SR) / 1.2);
    for (const c of o.sfx || []) if (SFX[c.type]) {
      const tmp = new Float32Array(buf.length); SFX[c.type](tmp, c.t);
      const g = (c.gain ?? 1) * (o.sfxGain ?? .45); for (let i = 0; i < buf.length; i++) buf[i] += tmp[i] * g;
    }
    let pk = 0; for (const v of buf) pk = Math.max(pk, Math.abs(v)); if (pk > .95) for (let i = 0; i < buf.length; i++) buf[i] *= .95 / pk;
    return buf;
  }
  G.Soundtrack = { SR, render };
})(window);
