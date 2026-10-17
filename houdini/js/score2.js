/* SCORE 2: a fresh, warm, playful synthesised score + new foley (replaces sound.js on pages that load it).
 * Instruments: Karplus-Strong plucked strings (pizzicato/harp), marimba, FM celesta/bells, detuned-saw pads with a
 * low-pass, round bass, soft kick, shaker, finger snaps. Moods = small arrangements on their own tempo and chord loop;
 * melodies are drawn from the key's pentatonic scale on fixed rhythms, so nothing clashes. Music ducks under the
 * voice when window.VENV (narration loudness, fps + v[]) is present.
 * API (same as sound.js): G.Soundtrack = { SR, render({ duration, moods:[{t,mood}], sfx:[{t,type,gain}] }) } */
(function (G) {
  'use strict';
  const SR = 44100, TAU = Math.PI * 2;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  const S = t => Math.floor(t * SR);

  // ---------------- instruments (all add into buffer b) ----------------
  function pluck(b, t, n, vel = .5, dec = .996, bright = .5) {   // Karplus–Strong string
    const f = midi(n), N = Math.max(2, Math.round(SR / f)), r = rng(n * 977 + Math.floor(t * 1000)), buf = new Float32Array(N);
    for (let i = 0; i < N; i++) buf[i] = (r() * 2 - 1); let lp = 0; for (let i = 0; i < N; i++) { lp += (buf[i] - lp) * bright; buf[i] = lp; }
    const s0 = S(t), len = Math.min(Math.floor(SR * 2.2), b.length - s0); let idx = 0;
    for (let i = 0; i < len; i++) { const j = idx % N, k = (idx + 1) % N, v = buf[j]; buf[j] = (v + buf[k]) * .5 * dec; b[s0 + i] += v * vel * Math.min(1, i / 40); idx++; }
  }
  function marimba(b, t, n, vel = .4) {
    const f = midi(n), s0 = S(t), len = Math.min(Math.floor(SR * 1.2), b.length - s0);
    for (let i = 0; i < len; i++) { const x = i / SR, e = Math.exp(-x * 6); b[s0 + i] += vel * (Math.sin(TAU * f * x) * e + .25 * Math.sin(TAU * f * 4 * x) * Math.exp(-x * 22) + .08 * Math.sin(TAU * f * 10 * x) * Math.exp(-x * 60)) * Math.min(1, i / 30); }
  }
  function celesta(b, t, n, vel = .3, dec = 2.6) {   // FM bell
    const f = midi(n), s0 = S(t), len = Math.min(Math.floor(SR * 2.5), b.length - s0);
    for (let i = 0; i < len; i++) { const x = i / SR, I = 2.2 * Math.exp(-x * 4); b[s0 + i] += vel * Math.sin(TAU * f * x + I * Math.sin(TAU * f * 3.5 * x)) * Math.exp(-x * dec) * Math.min(1, i / 60); }
  }
  function bass(b, t, n, dur, vel = .5) {
    const f = midi(n), s0 = S(t), len = Math.min(Math.floor(SR * dur), b.length - s0);
    for (let i = 0; i < len; i++) { const x = i / SR, e = Math.min(1, i / 200) * Math.exp(-x * 2.2) * Math.min(1, (dur - x) / .05); b[s0 + i] += vel * e * (Math.sin(TAU * f * x) + .3 * Math.sin(TAU * 2 * f * x)); }
  }
  function pad(b, t, notes, dur, vel = .1, cutoff = .06) {   // 3 detuned saws per note, one-pole low-pass, slow swell
    const s0 = S(t), len = Math.min(Math.floor(SR * dur), b.length - s0), ph = notes.map(() => [0, .33, .66]); let lp = 0;
    for (let i = 0; i < len; i++) { const x = i / SR, env = Math.min(1, x / .8) * Math.min(1, (dur - x) / 1.0); let v = 0;
      notes.forEach((n, k) => { const f = midi(n); [-.004, 0, .005].forEach((d, j) => { ph[k][j] = (ph[k][j] + f * (1 + d) / SR) % 1; v += ph[k][j] * 2 - 1; }); });
      lp += (v - lp) * cutoff; b[s0 + i] += lp * vel * env / notes.length; }
  }
  function fdrum(b, t, vel = .2) { const s0 = S(t), len = Math.min(Math.floor(SR * .45), b.length - s0); let ph = 0, lp = 0; const r = rng(Math.floor(t * 100)); for (let i = 0; i < len; i++) { const x = i / SR; ph += (95 + 25 * Math.exp(-x * 20)) / SR; lp += ((r() * 2 - 1) - lp) * .05; b[s0 + i] += vel * (Math.sin(TAU * ph) * .9 + lp * .5 * Math.exp(-x * 30)) * Math.min(1, i / 120) * Math.exp(-x * 7); } }
  function kick(b, t, vel = .5) { const s0 = S(t), len = Math.min(Math.floor(SR * .35), b.length - s0); let ph = 0; for (let i = 0; i < len; i++) { const x = i / SR, f = 50 + 90 * Math.exp(-x * 30); ph += f / SR; b[s0 + i] += vel * Math.sin(TAU * ph) * Math.exp(-x * 9); } }
  function noiseHit(b, t, dur, vel, hp = .7, seed = 1, shape = x => 1 - x) { const s0 = S(t), len = Math.min(Math.floor(SR * dur), b.length - s0), r = rng(seed); let lp = 0, prev = 0;
    for (let i = 0; i < len; i++) { const w = r() * 2 - 1; lp += (w - lp) * (1 - hp); const v = hp > .5 ? w - lp : lp; b[s0 + i] += v * vel * shape(i / len); prev = v; } }
  const shaker = (b, t, vel = .06) => noiseHit(b, t, .07, vel, .85, Math.floor(t * 100), x => Math.sin(Math.PI * Math.min(1, x * 2)) * (1 - x));
  const snap = (b, t, vel = .12) => { noiseHit(b, t, .05, vel, .6, Math.floor(t * 77), x => Math.pow(1 - x, 3)); };

  // ---- western voices (cowboy episode): whistle, harmonica, woodblock clip-clop, strummed / twangy guitar ----
  function whistle(b, t, n, dur, vel = .12) { const f = midi(n), s0 = S(t), len = Math.min(Math.floor(SR * (dur + .25)), b.length - s0), r = rng(n + Math.floor(t * 50)); let ph = 0, lp = 0;
    for (let i = 0; i < len; i++) { const x = i / SR, vib = 1 + .007 * Math.sin(TAU * 5.4 * x) * Math.min(1, x / .25), env = Math.min(1, x / .06) * Math.min(1, Math.max(0, (dur + .2 - x) / .2)); ph = (ph + f * vib / SR) % 1; lp += ((r() * 2 - 1) - lp) * .08;
      b[s0 + i] += vel * env * (Math.sin(TAU * ph) + .06 * Math.sin(TAU * ph * 2) + lp * .05); } }
  function harmonica(b, t, n, dur, vel = .06) { const f = midi(n), s0 = S(t), len = Math.min(Math.floor(SR * (dur + .2)), b.length - s0), A = [1, .55, .42, .28, .18, .1]; let ph = 0, lp = 0;
    for (let i = 0; i < len; i++) { const x = i / SR, env = Math.min(1, x / .08) * Math.min(1, Math.max(0, (dur + .15 - x) / .15)) * (1 + .15 * Math.sin(TAU * 6 * x)); ph = (ph + f / SR) % 1; let v = 0; for (let h = 0; h < 6; h++) v += A[h] * Math.sin(TAU * ph * (h + 1)); lp += (v - lp) * .25; b[s0 + i] += vel * env * lp * .45; } }
  function clop(b, t, vel = .08) { const s0 = S(t); for (let i = 0; i < SR * .05 && s0 + i < b.length; i++) { const x = i / SR; b[s0 + i] += vel * (Math.sin(TAU * 1250 * x) * .6 + Math.sin(TAU * 780 * x) * .4) * Math.exp(-x * 90); } }
  function strum(b, t, notes, vel = .1, bright = .55) { notes.forEach((n, i) => pluck(b, t + i * .014, n, vel * (1 - i * .08), .996, bright)); }
  // ---------------- moods ----------------
  const D = [[50, 62, 66, 69], [47, 59, 62, 66], [43, 55, 59, 62], [45, 57, 61, 64]], Dp = [62, 64, 66, 69, 71, 74, 76, 78, 81];          // D Bm G A
  const Gk = [[43, 55, 59, 62], [50, 62, 66, 69], [40, 52, 55, 59], [48, 60, 64, 67]], Gp = [55, 57, 59, 62, 64, 67, 69, 71, 74];       // G D Em C
  const Ck = [[48, 60, 64, 67], [45, 57, 60, 64], [41, 53, 57, 60], [43, 55, 59, 62]], Cp = [60, 62, 64, 67, 69, 72, 74, 76, 79];       // C Am F G
  const Fk = [[41, 53, 57, 60], [48, 60, 64, 67], [50, 62, 65, 69], [46, 58, 62, 65]], Fp = [60, 62, 65, 67, 69, 72, 74, 77, 79];       // F C Dm Bb
  const Am = [[45, 57, 60, 64], [41, 53, 57, 60], [48, 60, 64, 67], [43, 55, 59, 62]], Ap = [57, 60, 62, 64, 67, 69, 72, 74, 76];       // Am F C G
  const Dm = [[38, 50, 53, 57], [46, 58, 62, 65], [43, 55, 58, 62], [45, 57, 61, 64]], Dmp = [50, 53, 55, 57, 60, 62, 65, 67, 69];      // Dm Bb Gm A
  // v3 (user: "don't deafen the listener"): softer, warmer, lyre-and-harp feel for a Roman story — no kick, no snaps,
  // no shaker; a soft frame drum (fdrum) only where the story moves; melodies an octave lower; everything low-passed.
  const MOODS = {
    curious:   { bpm: 88,  prog: D,  pent: Dp,  parts: { ost: .16, cel: .09, bass: .2, pad: .06 } },
    adventure: { bpm: 96,  prog: Gk, pent: Gp,  parts: { ost: .16, mar: .1, fdrum: .12, bass: .22, pad: .07 } },
    quiet:     { bpm: 66,  prog: Am, pent: Ap,  parts: { pad: .09, bell: .07, bass: .12 } },
    morning:   { bpm: 80,  prog: Ck, pent: Cp,  parts: { arp: .12, pad: .07, bass: .18, cel: .06 } },
    busy:      { bpm: 100, prog: Fk, pent: Fp,  parts: { ost: .15, mar: .1, fdrum: .12, bass: .22 } },
    comic:     { bpm: 96,  prog: Ck, pent: Cp,  parts: { pizz: .15, bass: .2, mar: .07 } },
    warm:      { bpm: 78,  prog: Fk, pent: Fp,  parts: { cel: .08, pad: .08, ost: .1, bass: .18 } },
    tender:    { bpm: 62,  prog: D,  pent: Dp,  parts: { pad: .09, bell: .08, bass: .12, arp: .07 } },
    somber:    { bpm: 56,  prog: Dm, pent: Dmp, parts: { pad: .08, bell: .05, bass: .1 } },
    // western (cowboy episode): Am G F E spaghetti cadence; G C D G trail; C Am F G campfire; Dm danger; C F G C saloon
    western:   { bpm: 84,  prog: [[45, 57, 60, 64], [43, 55, 59, 62], [41, 53, 57, 60], [40, 52, 56, 59]], pent: [57, 59, 60, 62, 64, 65, 68, 69, 71, 72, 76], parts: { whistle: .1, twang: .12, clop: .07, bass: .18, pad: .04 } },
    trail:     { bpm: 92,  prog: [[43, 55, 59, 62], [48, 60, 64, 67], [50, 62, 66, 69], [43, 55, 59, 62]], pent: Gp, parts: { strum: .07, clop: .07, harp: .05, bass: .17 } },
    campfire:  { bpm: 66,  prog: Ck, pent: Cp, parts: { arpG: .08, harp: .045, bass: .11, pad: .04 } },
    danger:    { bpm: 108, prog: Dm, pent: Dmp, parts: { fdrum: .13, twang: .1, bass: .2, pad: .06 } },
    saloon:    { bpm: 116, prog: [[48, 60, 64, 67], [41, 53, 57, 60], [43, 55, 59, 62], [48, 60, 64, 67]], pent: Cp, parts: { honky: .09, bass: .18, clop: .04 } },
    rising:    { bpm: 92,  prog: Gk, pent: Gp,  parts: { ost: .15, mar: .09, fdrum: .1, bass: .22, pad: .08, cel: .07 } },
  };
  const RH = { mel: [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0], pizz: [1, 0, 1, 1, 0, 1, 0, 1] };
  function arrange(b, md, t0, t1) {
    const M = MOODS[md]; if (!M) return;
    const beat = 60 / M.bpm, bar = beat * 4, P = M.parts, r = rng(md.length * 101 + Math.floor(t0));
    for (let bt = t0, k = 0; bt < t1 - .05; bt += bar, k++) {
      const ch = M.prog[k % M.prog.length], end = Math.min(bar, t1 - bt);
      if (P.pad) pad(b, bt, ch.slice(1), end + .6, P.pad, md === 'somber' ? .03 : .06);
      if (P.bass) { bass(b, bt, ch[0], beat * 1.8, P.bass); if (end > beat * 2.2) bass(b, bt + beat * 2, ch[0] + (k % 2 ? 7 : 0), beat * 1.8, P.bass * .8); }
      for (let i = 0; i < 8; i++) { const t = bt + i * beat / 2; if (t >= t1) break;
        if (P.ost) pluck(b, t, [ch[1], ch[2], ch[3], ch[2]][i % 4], P.ost * (i % 2 ? .7 : 1), .994, .3);
        if (P.arp) marimba(b, t, [ch[1], ch[2], ch[3], ch[1] + 12][i % 4], P.arp * (i % 2 ? .7 : 1));
        if (P.pizz && RH.pizz[i]) pluck(b, t, ch[1 + (i % 3)], P.pizz, .985, .4);
        if (P.shake) shaker(b, t + beat / 4, P.shake * (i % 2 ? 1 : .6));
        if (P.kick && i % 4 === 0) kick(b, t, P.kick);
        if (P.fdrum && (i === 0 || i === 5)) fdrum(b, t, P.fdrum * (i ? .6 : 1));
        if (P.snap && i % 4 === 2) snap(b, t, P.snap);
      }
      if (P.whistle || P.twang || P.strum || P.arpG || P.honky || P.harp || P.clop) {
        const beat2 = beat, ch2 = ch;
        if (P.clop) for (let i = 0; i < 4; i++) { const tt = bt + i * beat2; if (tt < t1) { clop(b, tt, P.clop); clop(b, tt + beat2 * .32, P.clop * .7); } }
        if (P.twang) { const riff = [0, 7, 12, 7, 10, 7, 5, 3]; for (let i = 0; i < 8; i++) { const tt = bt + i * beat2 / 2; if (tt < t1 && (i % 2 === 0 || i === 3)) pluck(b, tt, ch2[0] + 12 + (riff[i] % 12) * (i % 4 === 0 ? 0 : 1) * 0 + [0, 0, 7, 0, 12, 0, 7, 3][i], P.twang * (i % 2 ? .6 : 1), .997, .75); } }
        if (P.strum) for (let i = 0; i < 4; i++) { const tt = bt + i * beat2; if (tt < t1) strum(b, tt + (i % 2 ? beat2 / 2 : 0), i % 2 ? ch2.slice(1) : [ch2[0] + 12, ...ch2.slice(1)], P.strum * (i % 2 ? .7 : 1)); }
        if (P.arpG) for (let i = 0; i < 8; i++) { const tt = bt + i * beat2 / 2; if (tt < t1) pluck(b, tt, [ch2[0] + 12, ch2[1], ch2[2], ch2[3], ch2[2] + 12, ch2[3], ch2[2], ch2[1]][i], P.arpG * (i % 2 ? .7 : 1), .996, .45); }
        if (P.honky) for (let i = 0; i < 8; i++) { const tt = bt + i * beat2 / 2; if (tt < t1) { if (i % 2) strum(b, tt, ch2.slice(1).map(n => n + 12), P.honky, .7); else pluck(b, tt, ch2[0], P.honky * 1.2, .995, .6); } }
        const MOT = [[[4, 0, 1.5], [3, 1.5, .5], [4, 2, 2]], [[6, 0, 1], [5, 1, .5], [4, 1.5, .5], [2, 2, 2]], [[4, 0, .5], [5, .5, .5], [7, 1, 2], [6, 3, 1]], [[5, 0, 1.5], [3, 1.5, .5], [1, 2, 2]]];
        if (P.whistle && k % 4 !== 3 && (k >> 2) % 2 === 0) for (const [ix, st, du] of MOT[k % 4]) { const tt = bt + st * beat2; if (tt < t1) whistle(b, tt, M.pent[Math.min(M.pent.length - 1, ix)] + 12, du * beat2 * .95, P.whistle); }
        if (P.harp && k % 2 === 1) for (const [ix, st, du] of MOT[(k >> 1) % 4]) { const tt = bt + st * beat2; if (tt < t1) harmonica(b, tt, M.pent[Math.min(M.pent.length - 1, ix)], du * beat2 * .9, P.harp); }
      }
      // melody: pentatonic notes on a fixed rhythm (16ths over the bar), contour gently wandering
      if (P.cel || P.mar || P.bell) { let idx = 3 + (k % 3);
        for (let i = 0; i < 16; i++) { if (!RH.mel[i]) continue; const t = bt + i * beat / 4; if (t >= t1) break; idx = Math.max(0, Math.min(M.pent.length - 1, idx + (r() < .5 ? -1 : 1) * (r() < .3 ? 2 : 1))); const n = M.pent[idx] + (P.bell ? 12 : 0);
          if (P.cel && (k % 2 === 0 || i < 8)) celesta(b, t, n, P.cel); if (P.mar) marimba(b, t, n, P.mar * .8); if (P.bell && i % 4 === 0) celesta(b, t, n, P.bell, 1.6); } }
    }
  }

  // ---------------- foley ----------------
  const SFX = {
    ping(b, t, g) { celesta(b, t, 88, .5 * g, 5); celesta(b, t + .09, 93, .45 * g, 4); },
    pop(b, t, g) { const s0 = S(t); let ph = 0; for (let i = 0; i < SR * .12 && s0 + i < b.length; i++) { const x = i / SR; ph += (360 * Math.exp(-x * 25) + 220) / SR; b[s0 + i] += g * .6 * Math.sin(TAU * ph) * Math.exp(-x * 30); } },
    whoosh(b, t, g) { g *= .55; const s0 = S(t), len = Math.floor(SR * .55), r = rng(Math.floor(t * 31)); let lp = 0, lp2 = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len, c = .02 + .25 * Math.sin(Math.PI * x); lp += (r() * 2 - 1 - lp) * c; lp2 += (lp - lp2) * c; b[s0 + i] += g * .9 * (lp - lp2) * Math.sin(Math.PI * x); } },
    swish(b, t, g) { SFX.whoosh(b, t, g * .6); },
    stamp(b, t, g) { kick(b, t, .9 * g); noiseHit(b, t, .09, .6 * g, .3, 7); noiseHit(b, t + .01, .2, .25 * g, .8, 9); },
    wrote(b, t, g) { for (let i = 0; i < 7; i++) noiseHit(b, t + i * .045, .04, .18 * g, .75, 60 + i, x => Math.sin(Math.PI * x)); celesta(b, t + .35, 81, .3 * g, 2); celesta(b, t + .35, 86, .22 * g, 2); SFX.stamp(b, t + .5, .5 * g); },
    tuba(b, t, g) { const s0 = S(t), len = Math.floor(SR * 1.6); let ph = 0, lp = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / SR, f = midi(43) * (1 - .06 * Math.min(1, x / 1.2)) * (1 + .012 * Math.sin(TAU * 5 * x)); ph = (ph + f / SR) % 1; const saw = ph * 2 - 1; lp += (saw - lp) * .08; b[s0 + i] += g * .7 * lp * Math.min(1, x / .05) * Math.min(1, (1.6 - x) / .4); } },
    splash(b, t, g) { noiseHit(b, t, .6, .7 * g, .2, 21, x => Math.pow(1 - x, 2)); const r = rng(5); for (let i = 0; i < 9; i++) { const tt = t + .05 + r() * .5, s0 = S(tt); let ph = 0; for (let j = 0; j < SR * .05 && s0 + j < b.length; j++) { ph += (900 + r() * 30 + j * 8) / SR; b[s0 + j] += g * .15 * Math.sin(TAU * ph) * (1 - j / (SR * .05)); } } },
    rain(b, t, g, dur = 4) { const s0 = S(t), len = Math.floor(SR * dur), r = rng(77); let lp = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len; lp += (r() * 2 - 1 - lp) * .35; b[s0 + i] += g * .18 * lp * Math.min(1, x * 6) * Math.min(1, (1 - x) * 6); } for (let k = 0; k < dur * 14; k++) noiseHit(b, t + r() * dur, .01, .12 * g, .9, 300 + k); },
    wind(b, t, g, dur = 3) { const s0 = S(t), len = Math.floor(SR * dur), r = rng(13); let lp = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len; lp += (r() * 2 - 1 - lp) * (.01 + .01 * Math.sin(x * 9)); b[s0 + i] += g * .6 * lp * Math.sin(Math.PI * x); } },
    paper(b, t, g) { const r = rng(Math.floor(t * 13)); for (let i = 0; i < 6; i++) noiseHit(b, t + i * .05 + r() * .03, .06, .14 * g, .8, 90 + i, x => Math.sin(Math.PI * x)); },
    scratch(b, t, g, dur = 1.2) { const r = rng(44); for (let tt = 0; tt < dur; tt += .07 + r() * .05) noiseHit(b, t + tt, .05, .08 * g, .9, Math.floor(tt * 1000), x => Math.sin(Math.PI * x)); },
    tick(b, t, g) { noiseHit(b, t, .015, .35 * g, .9, Math.floor(t * 999)); },
    ding(b, t, g) { celesta(b, t, 84, .4 * g, 1.8); celesta(b, t, 88, .3 * g, 1.8); celesta(b, t, 91, .25 * g, 1.8); },
    sparkle(b, t, g) { [84, 88, 91, 96, 100].forEach((n, i) => celesta(b, t + i * .06, n, .2 * g, 4)); },
    confetti(b, t, g) { const r = rng(9); for (let i = 0; i < 14; i++) SFX.pop(b, t + r() * .5, .25 * g); SFX.sparkle(b, t, .6 * g); },
    clink(b, t, g) { [2100, 3170, 4400].forEach((f, i) => { const s0 = S(t); for (let j = 0; j < SR * .4 && s0 + j < b.length; j++) b[s0 + j] += g * .12 * Math.sin(TAU * f * j / SR) * Math.exp(-j / SR * (8 + i * 4)); }); },
    hammer(b, t, g) { kick(b, t, .3 * g); SFX.clink(b, t, g); },
    birds(b, t, g) { const r = rng(Math.floor(t)); for (let k = 0; k < 6; k++) { const tt = t + r() * 2, s0 = S(tt), f0 = 2600 + r() * 1400; let ph = 0; for (let j = 0; j < SR * .09 && s0 + j < b.length; j++) { const x = j / (SR * .09); ph += (f0 + 900 * Math.sin(Math.PI * x)) / SR; b[s0 + j] += g * .07 * Math.sin(TAU * ph) * Math.sin(Math.PI * x); } } },
    crowd(b, t, g, dur = 3) { const s0 = S(t), len = Math.floor(SR * dur), r = rng(19); let a = 0, c = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len; a += (r() * 2 - 1 - a) * .08; c += (a - c) * .04; b[s0 + i] += g * .5 * (a - c) * (.6 + .4 * Math.sin(i / SR * 7.3) * Math.sin(i / SR * 3.1)) * Math.sin(Math.PI * x); } },
    rumble(b, t, g, dur = 2.5) { const s0 = S(t), len = Math.floor(SR * dur); let ph = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len; ph += (40 + 20 * x) / SR; b[s0 + i] += g * .4 * Math.sin(TAU * ph) * Math.sin(Math.PI * x); } noiseHit(b, t, dur, .08 * g, .1, 3, x => Math.sin(Math.PI * x)); },
    fire(b, t, g, dur = 3) { const r = rng(55); for (let tt = 0; tt < dur; tt += .03 + r() * .12) noiseHit(b, t + tt, .012, (.1 + r() * .15) * g, .85, Math.floor(tt * 997)); noiseHit(b, t, dur, .05 * g, .05, 8, x => Math.sin(Math.PI * x)); },
    rise(b, t, g) { const s0 = S(t), len = Math.floor(SR * 1.2); let ph = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len; ph += (300 + 900 * x * x) / SR; b[s0 + i] += g * .12 * Math.sin(TAU * ph) * x; } },
    boing(b, t, g) { return SFX.pluckUp(b, t, g); const s0 = S(t); let ph = 0; for (let i = 0; i < SR * .5 && s0 + i < b.length; i++) { const x = i / SR; ph += (220 + 120 * Math.sin(x * 40) * Math.exp(-x * 6)) / SR; b[s0 + i] += g * .35 * Math.sin(TAU * ph) * Math.exp(-x * 6); } },
    pluckUp(b, t, g) { pluck(b, t, 67, .5 * g, .99, .3); pluck(b, t + .09, 74, .45 * g, .99, .3); },   // a soft two-note harp flick replaces the cartoon boing
    moo(b, t, g) { const s0 = S(t), len = Math.floor(SR * 1.3); let ph = 0, lp = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / len, f = 110 + 40 * Math.sin(Math.PI * Math.min(1, x * 1.6)) - 20 * x; ph = (ph + f / SR) % 1; const saw = ph * 2 - 1; lp += (saw - lp) * .05; b[s0 + i] += g * .5 * lp * Math.sin(Math.PI * x); } },
    hooves(b, t, g, dur = 2, rate = 7) { const r = rng(Math.floor(t * 7)); for (let tt = 0; tt < dur; tt += 1 / rate * (.8 + r() * .4)) { kick(b, t + tt, .18 * g); noiseHit(b, t + tt, .03, .12 * g, .5, Math.floor(tt * 997)); } },
    thunder(b, t, g) { noiseHit(b, t, 2.6, .55 * g, .04, 31, x => Math.pow(1 - x, 1.6) * (x < .05 ? x * 20 : 1)); kick(b, t, .5 * g); },
    cough(b, t, g) { for (let i = 0; i < 3; i++) noiseHit(b, t + i * .32, .16, .35 * g, .35, 70 + i, x => Math.sin(Math.PI * Math.min(1, x * 3)) * (1 - x)); },
    clap(b, t, g) { noiseHit(b, t, .05, .7 * g, .6, 12, x => Math.pow(1 - x, 4)); kick(b, t, .25 * g); },
    gong(b, t, g) { celesta(b, t, 52, .4 * g, 1.2); celesta(b, t, 59, .25 * g, 1.2); },
    buzz(b, t, g, dur = 2) { const s0 = S(t), len = Math.floor(SR * dur); let ph = 0; for (let i = 0; i < len && s0 + i < b.length; i++) { const x = i / SR, f = 210 + 30 * Math.sin(x * 9); ph = (ph + f / SR) % 1; b[s0 + i] += g * .06 * (ph < .5 ? 1 : -1) * (.5 + .5 * Math.sin(x * 13)) * Math.sin(Math.PI * i / len); } },
    whip(b, t, g) { noiseHit(b, t, .08, .6 * g, .85, 17, x => Math.pow(1 - x, 2)); },
    river(b, t, g, dur = 4) { SFX.rain(b, t, g * .8, dur); },
    sizzle(b, t, g, dur = 2) { SFX.fire(b, t, g, dur); },
    thud(b, t, g) { kick(b, t, .7 * g); noiseHit(b, t, .06, .3 * g, .3, 26); },
  };

  function render(o) {
    const dur = o.duration, b = new Float32Array(Math.ceil(dur * SR)), m = new Float32Array(b.length), cues = o.moods || [];
    for (let i = 0; i < cues.length; i++) arrange(m, cues[i].mood, cues[i].t, (cues[i + 1] || { t: dur }).t + .8);
    // cross-fade at mood changes + duck under the voice
    { let a = 0; for (let i = 0; i < m.length; i++) { a += (m[i] - a) * .45; m[i] = a; } }
    const env = G.VENV, gain = o.musicGain ?? .3;
    let duck = 1;
    for (const c of cues) { const s0 = S(c.t - .8); for (let i = Math.max(0, s0); i < S(c.t) && i < m.length; i++) m[i] *= .4 + .6 * (1 - (i - s0) / (SR * .8)); }   // dip into each new mood
    for (let i = 0; i < m.length; i++) {
      const t = i / SR; let v = 0; if (env) { const k = t * env.fps, a = env.v[Math.floor(k)] || 0; v = a; }
      duck += ((v > .12 ? .36 : 1) - duck) * (v > .12 ? .0009 : .00012);
      b[i] = m[i] * gain * duck * Math.min(1, t / 1.5) * Math.min(1, (dur - t) / 2);
    }
    // foley on its own bus: quieter overall, the punchy ones tamed further, then a soft clipper so nothing stabs the ear
    const fx = new Float32Array(b.length), LOUD = { stamp: .45, thud: .45, tuba: .5, splash: .5, boom: .4, hammer: .35, rumble: .45, crowd: .35, rain: .45, wind: .5, fire: .5, confetti: .5, clink: .5, ping: .6, sparkle: .6, ding: .6, scratch: .6, paper: .7 };
    for (const c of o.sfx || []) if (SFX[c.type]) SFX[c.type](fx, c.t, (c.gain ?? 1) * (o.sfxGain ?? .24) * (LOUD[c.type] || 1), c.dur);
    { let a = 0; for (let i = 0; i < fx.length; i++) { a += (fx[i] - a) * .55; fx[i] = a; } }
    for (let i = 0; i < b.length; i++) { let v = fx[i]; if (env) { const e = env.v[Math.floor(i / SR * env.fps)] || 0; if (e > .12) v *= .75; } b[i] += Math.tanh(v * 2.2) / 2.2 * .9; }
    let pk = 0; for (const v of b) pk = Math.max(pk, Math.abs(v)); if (pk > .9) for (let i = 0; i < b.length; i++) b[i] *= .9 / pk;
    return b;
  }
  G.Soundtrack = { SR, render, MOODS, SFX };
})(window);
