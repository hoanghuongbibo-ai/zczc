/* Pompeii score + foley, synthesised in plain JS (runs in the browser and in Node for the exporter).
 * Moods (cues [{t, mood}]): pluck (light plucky strings), market (upbeat street), tension, drone (one low note),
 * gentle (slow quiet theme), brass (1940s newsreel), warm (reflective), none.
 * Every instrument only touches the samples it sounds on, so long videos render fast. */
(function (G) {
  'use strict';
  const SR = 44100;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296 * 2 - 1; }; }
  const I = t => Math.floor(t * SR);

  // ---------- instruments ----------
  function pluck(b, t, n, v = 1, dec = 6) { const f = midi(n), s = I(t), len = Math.floor(1.2 * SR); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x * 900) * Math.exp(-x * dec); b[s + i] += v * e * (Math.sin(6.2832 * f * x) * .6 + Math.sin(12.566 * f * x) * .25 * Math.exp(-x * 9) + Math.sin(18.85 * f * x) * .12 * Math.exp(-x * 14)); } }
  function marimba(b, t, n, v = 1) { const f = midi(n), s = I(t), len = Math.floor(.9 * SR); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x * 1200) * Math.exp(-x * 7); b[s + i] += v * e * (Math.sin(6.2832 * f * x) + .35 * Math.sin(6.2832 * f * 4 * x) * Math.exp(-x * 25)); } }
  function piano(b, t, n, v = 1, dec = 1.8) { const f = midi(n), s = I(t), len = Math.floor(3 * SR); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x * 500) * Math.exp(-x * dec); b[s + i] += v * e * (Math.sin(6.2832 * f * x) * .7 + Math.sin(12.566 * f * x) * .25 * Math.exp(-x * 3) + Math.sin(18.85 * f * x) * .08 * Math.exp(-x * 6)); } }
  function pad(b, t, n, dur, v = 1) { const f = midi(n), s = I(t), len = Math.floor(dur * SR); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x / .6) * Math.min(1, (dur - x) / .6); b[s + i] += v * e * (Math.sin(6.2832 * f * x) * .5 + Math.sin(6.2832 * f * 1.003 * x) * .3 + Math.sin(12.566 * f * x) * .12); } }
  function bass(b, t, n, dur = .4, v = 1) { const f = midi(n), s = I(t), len = Math.floor(dur * SR); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x * 300) * Math.exp(-x * 4) * Math.min(1, (dur - x) * 30); b[s + i] += v * e * (Math.sin(6.2832 * f * x) + .3 * Math.sin(12.566 * f * x)); } }
  function brass(b, t, n, dur, v = 1) { const f = midi(n), s = I(t), len = Math.floor(dur * SR); for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, e = Math.min(1, x / .04) * Math.min(1, (dur - x) / .08) * (1 + .04 * Math.sin(x * 34)); let y = 0; for (let h = 1; h <= 6; h++) y += Math.sin(6.2832 * f * h * x) / (h * h * .6 + .4); b[s + i] += v * e * y * .5; } }
  function noise(b, t, dur, v, lp, envF, seed = 1) { const r = rng(seed), s = I(t), len = Math.floor(dur * SR); let a = 0; for (let i = 0; i < len && s + i < b.length; i++) { a += (r() - a) * lp; b[s + i] += v * a * envF(i / len); } }
  function hp(b, t, dur, v, envF, seed = 1) { const r = rng(seed), s = I(t), len = Math.floor(dur * SR); let p = 0; for (let i = 0; i < len && s + i < b.length; i++) { const n = r(); b[s + i] += v * (n - p) * envF(i / len); p = n; } }
  function tone(b, t, dur, fF, v, dec = 0) { const s = I(t), len = Math.floor(dur * SR); let ph = 0; for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR; ph += fF(x, i / len) / SR; b[s + i] += v * Math.sin(6.2832 * ph) * Math.exp(-x * dec) * Math.min(1, x * 600) * Math.min(1, (len - i) / 200); } }

  // ---------- foley ----------
  const SFX = {
    scratch(b, t) { for (let i = 0; i < 3; i++) hp(b, t + i * .16, .11, .55, k => Math.sin(Math.PI * k), 40 + i); },
    recordScratch(b, t) { tone(b, t, .45, (x, k) => 900 - 1500 * k + 600 * Math.sin(k * 20), .25); noise(b, t, .45, .9, .5, k => Math.sin(Math.PI * k) * (1 - k), 3); },
    whoosh(b, t) { noise(b, t, .45, .8, .07, k => Math.sin(Math.PI * k) ** 2, 14); },
    pop(b, t) { tone(b, t, .09, (x, k) => 500 + 900 * k, .45, 30); },
    thud(b, t) { tone(b, t, .3, x => 110 - x * 160, .9, 12); noise(b, t, .08, .7, .12, k => 1 - k, 26); },
    stamp(b, t) { tone(b, t, .2, x => 140 - x * 200, .8, 18); noise(b, t, .06, 1, .4, k => 1 - k, 27); },
    paper(b, t) { noise(b, t, .16, .8, .35, k => Math.pow(1 - k, 2), 17); },
    ding(b, t) { for (const [f, d] of [[1568, 3], [3136, 6], [2350, 5]]) tone(b, t, 1.4, () => f, .18, d); },
    boom(b, t) { tone(b, t, 2.2, x => 55 - x * 8, 1, 1.6); noise(b, t, .5, .8, .04, k => 1 - k, 29); },
    rumble(b, t) { noise(b, t, 3.5, 1.6, .012, k => Math.sin(Math.PI * k) ** .5, 31); tone(b, t, 3.5, x => 38 + Math.sin(x * 9) * 3, .4, .2); },
    quake(b, t) { noise(b, t, 3, 2, .01, k => Math.sin(Math.PI * k), 32); for (let i = 0; i < 8; i++) hp(b, t + .2 + i * .3, .06, .3, k => 1 - k, 60 + i); },
    crumble(b, t) { const r = rng(9); for (let i = 0; i < 18; i++) { const tt = t + i * .06 + (r() + 1) * .03; tone(b, tt, .12, x => 160 + r() * 80 - x * 300, .35, 20); noise(b, tt, .05, .5, .3, k => 1 - k, 70 + i); } noise(b, t, 1.4, .8, .03, k => Math.sin(Math.PI * k) * (1 - k), 33); },
    whistle(b, t) { tone(b, t, 1.3, (x, k) => 1600 - 1100 * k, .22); },
    explosion(b, t) { noise(b, t, 1.6, 1.8, .05, k => Math.pow(1 - k, 2), 34); tone(b, t, 1.2, x => 70 - x * 30, 1, 2.5); },
    cheer(b, t) { noise(b, t, 2.2, .7, .2, k => Math.sin(Math.PI * k), 35); noise(b, t, 2.2, .5, .5, k => Math.sin(Math.PI * k) * (.6 + .4 * Math.sin(k * 40)), 36); },
    crowd(b, t) { noise(b, t, 3, .5, .15, k => Math.sin(Math.PI * k), 37); },
    sheep(b, t) { const s = I(t), len = Math.floor(.8 * SR); let ph = 0; for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, k = i / len, f = 290 + 30 * Math.sin(x * 38) - 40 * k; ph += f / SR; const saw = 2 * (ph % 1) - 1; b[s + i] += .25 * saw * Math.sin(Math.PI * k) * (.6 + .4 * Math.sin(x * 40)); } },
    snore(b, t) { for (let i = 0; i < 2; i++) { noise(b, t + i * 1.4, .9, 1.4, .03, k => Math.sin(Math.PI * k) * (.5 + .5 * Math.sin(k * 90)), 38 + i); tone(b, t + i * 1.4, .9, x => 70 + x * 20, .2); } },
    flash(b, t) { hp(b, t, .03, .8, k => 1 - k, 41); tone(b, t + .02, .4, (x, k) => 2000 + 3000 * k, .05); },
    coin(b, t) { tone(b, t, .5, () => 2637, .2, 9); tone(b, t + .07, .5, () => 3520, .2, 9); },
    cash(b, t) { SFX.coin(b, t); hp(b, t, .08, .5, k => 1 - k, 42); tone(b, t + .1, .8, () => 1760, .15, 5); },
    creak(b, t) { tone(b, t, .5, x => 180 + Math.sin(x * 40) * 30 + x * 120, .25, 4); },
    dig(b, t) { noise(b, t, .22, .9, .25, k => Math.pow(1 - k, 1.5), 43); hp(b, t, .03, .5, k => 1 - k, 44); },
    splash(b, t) { noise(b, t, .7, .9, .25, k => Math.pow(1 - k, 2), 21); },
    tick(b, t) { hp(b, t, .02, .7, k => 1 - k, 45); tone(b, t, .03, () => 2400, .2, 150); },
    type(b, t) { for (let i = 0; i < 8; i++) { hp(b, t + i * .09, .015, .6, k => 1 - k, 46 + i); } },
    wind(b, t) { noise(b, t, 4, .6, .015, k => Math.sin(Math.PI * k), 28); },
    rainLoop(b, t) { hp(b, t, 6, .12, k => Math.min(1, k * 8, (1 - k) * 8), 47); },
    swell(b, t) { noise(b, t, 1.2, .4, .03, k => k * k * (1 - k) * 4, 16); },
    bell(b, t) { for (const [f, d] of [[523, 1.2], [1046, 2], [1568, 3]]) tone(b, t, 2.5, () => f, .2, d); },
    plane(b, t) { const s = I(t), len = Math.floor(3 * SR); let ph = 0; const r = rng(5); let a = 0; for (let i = 0; i < len && s + i < b.length; i++) { const k = i / len; ph += (85 + 10 * Math.sin(k * 3)) / SR; a += (r() - a) * .08; b[s + i] += (Math.sin(6.2832 * ph) * .3 + Math.sin(6.2832 * ph * 2) * .15 + a * .5) * Math.sin(Math.PI * k) * .6; } },
    sizzle(b, t) { hp(b, t, 1.5, .2, k => Math.sin(Math.PI * k), 48); },
    boing(b, t) { tone(b, t, .5, (x, k) => 200 + 120 * Math.sin(k * 30) * (1 - k), .35, 4); },
    gong(b, t) { for (const [f, d] of [[110, .8], [166, 1.1], [247, 1.4], [370, 2]]) tone(b, t, 4, x => f * (1 + .01 * Math.sin(x * 6)), .25, d); },
    sting(b, t) { brass(b, t, 58, .25, .35); brass(b, t + .25, 65, .6, .35); },
    tada(b, t) { brass(b, t, 60, .15, .3); brass(b, t + .15, 64, .15, .3); brass(b, t + .3, 67, .7, .35); },
    sad(b, t) { brass(b, t, 62, .35, .25); brass(b, t + .35, 61, .35, .25); brass(b, t + .7, 60, .9, .25); },
  };

  // ---------- score ----------
  const PROGS = {
    pluck: { bpm: 104, ch: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]], bassN: [48, 45, 41, 43] },
    market: { bpm: 116, ch: [[65, 69, 72], [62, 65, 69], [58, 62, 65], [60, 64, 67]], bassN: [41, 38, 46, 48] },
    tension: { bpm: 84, ch: [[62, 65, 69], [58, 62, 65], [60, 64, 67], [61, 64, 69]], bassN: [38, 34, 36, 37] },
    gentle: { bpm: 64, ch: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], bassN: [45, 41, 36, 43] },
    warm: { bpm: 72, ch: [[53, 57, 60], [60, 64, 67], [50, 53, 57], [58, 62, 65]], bassN: [41, 48, 38, 46] },
    brass: { bpm: 112, ch: [[58, 62, 65], [63, 67, 70], [65, 69, 72], [58, 62, 65]], bassN: [46, 51, 53, 46] },
  };
  function score(m, o) {
    const dur = o.duration, cues = (o.moods || [{ t: 0, mood: 'pluck' }]).slice().sort((a, b) => a.t - b.t);
    for (let ci = 0; ci < cues.length; ci++) {
      const a = cues[ci].t, b = Math.min(dur, ci + 1 < cues.length ? cues[ci + 1].t : dur), md = cues[ci].mood, P = PROGS[md];
      const fadeIn = 0.4;
      if (md === 'drone') { pad(m, a, 33, b - a, .35); pad(m, a, 45, b - a, .12); continue; }
      if (md === 'none' || !P) continue;
      const beat = 60 / P.bpm, bar = beat * 4;
      for (let t = a, k = 0; t < b - .05; t += beat / 2, k++) {
        const barI = Math.floor((t - a) / bar) % 4, ch = P.ch[barI], step = k % 8, vIn = Math.min(1, (t - a) / fadeIn), vOut = Math.min(1, (b - t) / .5), v = vIn * vOut;
        if (md === 'pluck') { pluck(m, t, ch[[0, 1, 2, 1, 0, 2, 1, 2][step]] + 12, .32 * v, 7); if (step % 4 === 0) pluck(m, t, P.bassN[barI], .5 * v, 4); }
        if (md === 'market') { marimba(m, t, ch[[0, 2, 1, 2, 0, 1, 2, 1][step]] + 12, .28 * v); if (step % 2 === 0) bass(m, t, P.bassN[barI], beat * .9, .4 * v); if (step % 2 === 1) hp(m, t, .03, .18 * v, q => 1 - q, 90 + step); }
        if (md === 'tension') { if (step % 1 === 0) bass(m, t, P.bassN[barI], beat * .45, .35 * v); if (step === 0) pad(m, t, ch[0] - 12, bar, .14 * v); if (step === 4) pluck(m, t, ch[2] + 12, .12 * v, 3); }
        if (md === 'gentle') { if (step === 0) { pad(m, t, ch[0] - 12, bar + .2, .12 * v); piano(m, t, ch[0], .22 * v); } if (step === 3) piano(m, t, ch[1] + 12, .14 * v); if (step === 6) piano(m, t, ch[2], .16 * v); }
        if (md === 'warm') { if (step === 0) { pad(m, t, ch[0] - 12, bar + .2, .14 * v); pad(m, t, ch[1], bar + .2, .06 * v); } if (step % 2 === 0) pluck(m, t, ch[(step / 2) % 3] + 12, .14 * v, 4); }
        if (md === 'brass') { if (step === 0 || step === 3 || step === 6) brass(m, t, ch[0], beat * .4, .14 * v); if (step === 0) { brass(m, t, ch[1], beat * .8, .1 * v); brass(m, t, ch[2], beat * .8, .1 * v); } if (step % 2 === 0) bass(m, t, P.bassN[barI], beat * .4, .35 * v); hp(m, t, .05, (step % 2 ? .1 : .2) * v, q => 1 - q, 95 + step); }
      }
    }
  }

  function render(o) {
    const n = Math.ceil(o.duration * SR), music = new Float32Array(n), fx = new Float32Array(n);
    score(music, o);
    for (const c of o.sfx || []) { const f = SFX[c.type]; if (!f) continue; if (c.gain == null || c.gain === 1) f(fx, c.t); else { const tmp = new Float32Array(Math.ceil(5 * SR)); f(tmp, 0); const s = I(c.t); for (let i = 0; i < tmp.length && s + i < n; i++) fx[s + i] += tmp[i] * c.gain; } }
    const mg = o.musicGain ?? .22, fg = o.sfxGain ?? .38, out = new Float32Array(n);
    for (let i = 0; i < n; i++) out[i] = music[i] * mg * Math.min(1, i / SR / .8) * Math.min(1, (n - i) / SR / 1.5) + fx[i] * fg;
    return out;
  }
  const api = { SR, render, SFX: Object.keys(SFX) };
  (typeof window !== 'undefined' ? window : globalThis).PSound = api;
})();
