/* Procedural soundtrack: a whimsical music-box / pizzicato loop plus paper-craft
 * sound effects, synthesised sample-by-sample in plain JS (no audio files). */
(function (G) {
  'use strict';
  const SR = 44100;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);

  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296 * 2 - 1; };
  }

  // ---- instruments: each adds into buffer `b` starting at time t (s) ----
  function musicBox(b, t, note, vel = 1) {
    const f = midi(note), start = Math.floor(t * SR), len = Math.floor(1.6 * SR);
    for (let i = 0; i < len && start + i < b.length; i++) {
      const x = i / SR, env = Math.min(1, x * 400) * Math.exp(-x * 3.2);
      b[start + i] += vel * env * (Math.sin(2 * Math.PI * f * x) * .6 + Math.sin(2 * Math.PI * f * 3.01 * x) * .12 * Math.exp(-x * 8) + Math.sin(2 * Math.PI * f * 5.4 * x) * .05 * Math.exp(-x * 14));
    }
  }
  function pizz(b, t, note, vel = 1) { // plucked bass: decaying triangle-ish
    const f = midi(note), start = Math.floor(t * SR), len = Math.floor(.5 * SR);
    for (let i = 0; i < len && start + i < b.length; i++) {
      const x = i / SR, env = Math.min(1, x * 300) * Math.exp(-x * 9);
      const ph = (f * x) % 1, tri = 1 - 4 * Math.abs(ph - .5);
      b[start + i] += vel * env * (tri * .5 + Math.sin(2 * Math.PI * f * x) * .5);
    }
  }
  function shaker(b, t, vel = 1, seed = 1) {
    const r = rng(seed), start = Math.floor(t * SR), len = Math.floor(.06 * SR);
    let prev = 0;
    for (let i = 0; i < len && start + i < b.length; i++) {
      const n = r(), hp = n - prev; prev = n; // crude high-pass
      b[start + i] += vel * hp * Math.exp(-i / SR * 60) * .5;
    }
  }

  // ---- sound effects ----
  const SFX = {
    pop(b, t) { tone(b, t, .09, x => 420 + x * 6000, .5, 40); },
    snip(b, t) { shaker(b, t, 1.6, 7); shaker(b, t + .07, 1.3, 8); },
    thud(b, t) {
      tone(b, t, .3, x => 120 - x * 220, .9, 14);
      const r = rng(3), s = Math.floor(t * SR); let lp = 0;
      for (let i = 0; i < .12 * SR && s + i < b.length; i++) { lp += (r() - lp) * .08; b[s + i] += lp * Math.exp(-i / SR * 30) * .9; }
    },
    whoosh(b, t) {
      const r = rng(5), s = Math.floor(t * SR), len = .45 * SR; let lp = 0;
      for (let i = 0; i < len && s + i < b.length; i++) {
        const k = i / len, cut = .02 + .25 * Math.sin(Math.PI * k);
        lp += (r() - lp) * cut; b[s + i] += lp * Math.sin(Math.PI * k) * .6;
      }
    },
    ding(b, t) { musicBox(b, t, 96, .5); musicBox(b, t + .01, 103, .25); },
    slide(b, t) { tone(b, t, .55, x => 500 + 900 * Math.sin(Math.PI * x / .55), .35, 2.5); },
    slap(b, t) { // a paper cutout pasted down
      const r = rng(21), s = Math.floor(t * SR); let lp = 0;
      for (let i = 0; i < .09 * SR && s + i < b.length; i++) { lp += (r() - lp) * .25; b[s + i] += lp * Math.exp(-i / SR * 45) * 1.4; }
      tone(b, t, .08, x => 180 - x * 600, .35, 40);
    },
    flip(b, t) { shaker(b, t, 1.2, 11); shaker(b, t + .05, .9, 12); shaker(b, t + .1, .6, 13); },
  };
  function tone(b, t, dur, freqFn, vel, decay) {
    const s = Math.floor(t * SR); let ph = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) {
      const x = i / SR; ph += freqFn(x) / SR;
      b[s + i] += vel * Math.sin(2 * Math.PI * ph) * Math.exp(-x * decay) * Math.min(1, x * 500);
    }
  }

  // ---- song: F major, 100 bpm, I–vi–IV–V ----
  const BPM = 100, BEAT = 60 / BPM;
  const CHORDS = [[53, 57, 60], [50, 53, 57], [46, 50, 53], [48, 52, 55]]; // F Dm Bb C
  const MELODY = [ // [beat offset in 2-bar phrase, midi note]
    [0, 77], [.5, 81], [1, 84], [2, 81], [2.5, 79], [3, 77],
    [4, 74], [4.5, 77], [5, 81], [6, 79], [7, 77], [7.5, 76],
  ];
  const MELODY_B = [
    [0, 82], [.5, 81], [1, 79], [1.5, 77], [2, 79], [3, 72],
    [4, 76], [4.5, 77], [5, 79], [6, 84], [6.5, 81], [7, 79],
  ];

  function musicBoxBed(music, dur) {
    const bars = Math.ceil(dur / (BEAT * 4)) + 1;
    for (let bar = 0; bar < bars; bar++) {
      const t0 = bar * 4 * BEAT, ch = CHORDS[bar % 4];
      pizz(music, t0, ch[0] - 12, .55); pizz(music, t0 + 2 * BEAT, ch[0] - 12, .4);
      pizz(music, t0 + 1 * BEAT, ch[1], .22); pizz(music, t0 + 3 * BEAT, ch[2], .22);
      for (let k = 0; k < 8; k++) shaker(music, t0 + (k + .5) * BEAT / 2, k % 2 ? .25 : .12, bar * 8 + k + 1);
    }
    for (let ph = 0; ph * 8 * BEAT < dur; ph++) {
      const mel = ph % 2 ? MELODY_B : MELODY;
      for (const [beat, n] of mel) musicBox(music, ph * 8 * BEAT + beat * BEAT, n, .5);
    }
  }

  // ---- vintage jazz bed: walking bass, brushes, comping piano, vibes, vinyl crackle ----
  function piano(b, t, notes, vel = 1) {
    const start = Math.floor(t * SR), len = Math.floor(1.4 * SR);
    for (const n of notes) {
      const f = midi(n);
      for (let i = 0; i < len && start + i < b.length; i++) {
        const x = i / SR, env = Math.min(1, x * 600) * Math.exp(-x * 3.5);
        b[start + i] += vel * env * .25 * (Math.sin(2 * Math.PI * f * x) + .45 * Math.sin(4 * Math.PI * f * x) * Math.exp(-x * 4) + .2 * Math.sin(6 * Math.PI * f * x) * Math.exp(-x * 7));
      }
    }
  }
  function upright(b, t, note, vel = 1) {
    const f = midi(note), start = Math.floor(t * SR), len = Math.floor(.7 * SR);
    for (let i = 0; i < len && start + i < b.length; i++) {
      const x = i / SR, env = Math.min(1, x * 250) * Math.exp(-x * 5);
      b[start + i] += vel * env * (Math.sin(2 * Math.PI * f * x) * .8 + Math.sin(4 * Math.PI * f * x) * .25 * Math.exp(-x * 10));
    }
  }
  function vibes(b, t, note, vel = 1) {
    const f = midi(note), start = Math.floor(t * SR), len = Math.floor(1.8 * SR);
    for (let i = 0; i < len && start + i < b.length; i++) {
      const x = i / SR, env = Math.min(1, x * 500) * Math.exp(-x * 2.2) * (1 + .35 * Math.sin(2 * Math.PI * 5.5 * x));
      b[start + i] += vel * env * (Math.sin(2 * Math.PI * f * x) * .6 + Math.sin(2 * Math.PI * f * 4 * x) * .08 * Math.exp(-x * 9));
    }
  }
  function brush(b, t, vel = 1, seed = 1, len = .22) {
    const r = rng(seed), start = Math.floor(t * SR), n = Math.floor(len * SR); let lp = 0, prev = 0;
    for (let i = 0; i < n && start + i < b.length; i++) {
      const w = r(); lp += (w - lp) * .35; const hp = lp - prev; prev = lp;
      const k = i / n; b[start + i] += vel * hp * Math.sin(Math.PI * Math.min(1, k * 3)) * (1 - k) * .9;
    }
  }
  const J_BPM = 116, JB = 60 / J_BPM, SWING = 2 / 3;
  const J_CHORDS = [[57, 60, 64, 65], [54, 57, 60, 62], [55, 58, 62, 65], [52, 55, 58, 60]]; // Fmaj7 D7 Gm7 C7 voicings
  const J_BASS = [[41, 45, 48, 50], [38, 42, 45, 44], [43, 46, 50, 49], [36, 40, 43, 40]];
  const J_VIBES = [[0, 72], [SWING, 74], [1, 77], [2, 81], [3 + SWING, 79], [5, 78], [5 + SWING, 74], [6, 77], [7, 74]];
  function jazzBed(music, dur) {
    const bars = Math.ceil(dur / (JB * 4)) + 1;
    for (let bar = 0; bar < bars; bar++) {
      const t0 = bar * 4 * JB, i = bar % 4;
      J_BASS[i].forEach((n, k) => upright(music, t0 + k * JB, n, k ? .5 : .62));
      piano(music, t0 + (1 + SWING) * JB, J_CHORDS[i], .45); // Charleston-ish comp
      piano(music, t0 + 3 * JB, J_CHORDS[i], .3);
      for (let k = 0; k < 4; k++) { // brushes: swish on 2 & 4, swung taps
        if (k % 2) brush(music, t0 + k * JB, .9, bar * 9 + k, .3);
        brush(music, t0 + (k + SWING) * JB, .35, bar * 13 + k + 99, .08);
      }
    }
    for (let ph = 0; ph * 8 * JB < dur; ph++) if (ph % 2 === 0 || ph > 1) for (const [beat, n] of J_VIBES) vibes(music, ph * 8 * JB + beat * JB, n + (ph % 2 ? -2 : 0), .38);
    const r = rng(77); // vinyl crackle + hiss
    for (let i = 0; i < music.length; i++) {
      music[i] += r() * .012;
      if (r() > .99975) music[i] += r() * .35;
    }
  }

  function render(o) {
    const dur = o.duration, buf = new Float32Array(Math.ceil(dur * SR));
    const music = new Float32Array(buf.length);
    (o.style === 'jazz' ? jazzBed : musicBoxBed)(music, dur);
    // gentle fade in/out on the music bed
    const fadeOut = o.fadeOut ?? 1.2;
    for (let i = 0; i < music.length; i++) {
      const x = i / SR;
      buf[i] = music[i] * (o.musicGain ?? .38) * Math.min(1, x / .6) * Math.min(1, (dur - x) / fadeOut);
    }
    for (const c of o.sfx || []) if (SFX[c.type]) {
      const tmp = new Float32Array(buf.length); SFX[c.type](tmp, c.t);
      const g = (c.gain ?? 1) * (o.sfxGain ?? .35);
      for (let i = 0; i < buf.length; i++) buf[i] += tmp[i] * g;
    }
    let peak = 0; for (let i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i]));
    if (peak > .95) for (let i = 0; i < buf.length; i++) buf[i] *= .95 / peak;
    return buf;
  }

  G.Soundtrack = { SR, render };
})(window);
