/* Score + foley for the comedy-history channel (dynasty/), synthesised in plain JS.
 * Moods (switched at cue times): 'cold' — wind bed + low D drone + far ice creaks; 'warm' — soft major pad;
 * 'tense' — low pulse; 'drum' — steady snare/bass march; 'strings' — sustained minor strings; 'none'.
 * G.Soundtrack.render({ duration, sfx: [{ t, type, gain }], moods: [{ t, mood }], musicGain, sfxGain }) */
(function (G) {
  'use strict';
  const SR = 44100;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296 * 2 - 1; }; }
  const at = t => Math.max(0, Math.floor(t * SR));

  function tone(b, t, dur, fFn, vel, decay, att = 800) {
    const s = at(t); let ph = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) { const x = i / SR; ph += fFn(x) / SR; b[s + i] += vel * Math.sin(2 * Math.PI * ph) * Math.exp(-x * decay) * Math.min(1, x * att); }
  }
  function noise(b, t, dur, vel, lpK, envFn, seed = 1, hp = false) {
    const r = rng(seed), s = at(t); let lp = 0, prev = 0;
    for (let i = 0; i < dur * SR && s + i < b.length; i++) { lp += (r() - lp) * lpK; const v = hp ? lp - prev : lp; prev = lp; b[s + i] += vel * v * envFn(i / SR / dur); }
  }
  function bowed(b, t, note, dur, vel = 1) {
    const f = midi(note), s = at(t), len = Math.floor(dur * SR); let ph = 0;
    for (let i = 0; i < len && s + i < b.length; i++) { const x = i / SR, env = Math.min(1, x / .6) * Math.min(1, (dur - x) / .6);
      ph += f * (1 + .004 * Math.sin(2 * Math.PI * 5 * x)) / SR; b[s + i] += vel * env * (Math.sin(2 * Math.PI * ph) * .6 + (2 * (ph % 1) - 1) * .1); }
  }

  // ---- foley ----
  const SFX = {
    whoosh(b, t) { noise(b, t, .5, .7, .08, k => Math.sin(Math.PI * k), 14); },
    swoosh(b, t) { noise(b, t, .28, .6, .25, k => Math.sin(Math.PI * k) * (1 - k * .5), 15, true); },
    pop(b, t) { tone(b, t, .09, x => 480 + x * 4600, .45, 30); },
    stamp(b, t) { tone(b, t, .25, x => 90 - x * 100, 1, 16); noise(b, t, .06, 1, .3, k => 1 - k, 27); },
    thud(b, t) { tone(b, t, .35, x => 100 - x * 140, 1, 10); noise(b, t, .1, .8, .1, k => 1 - k, 26); },
    ice(b, t) { noise(b, t, 1.4, .9, .04, k => Math.sin(Math.PI * k) * (.6 + .4 * Math.sin(k * 40)), 41); for (let i = 0; i < 9; i++) noise(b, t + .1 + i * .13, .03, .7, .7, k => 1 - k, 60 + i, true); },
    crack(b, t) { noise(b, t, .06, 1.2, .9, k => 1 - k, 43, true); tone(b, t, .3, x => 160 - x * 120, .4, 12); },
    scrape(b, t) { const r = rng(44); for (let i = 0; i < 6; i++) tone(b, t + i * .16, .16, x => 520 + Math.sin(x * 90 + i) * 70 + r() * 20, .12, 3, 300); noise(b, t, 1, .5, .3, k => Math.sin(Math.PI * k), 45, true); },
    gust(b, t) { noise(b, t, 2.2, .55, .02, k => Math.sin(Math.PI * k), 46); },
    creak(b, t) { tone(b, t, .5, x => 170 + Math.sin(x * 38) * 30 + x * 100, .22, 4); noise(b, t, .45, .2, .08, k => Math.sin(Math.PI * k), 24); },
    flip(b, t) { noise(b, t, .1, .9, .4, k => Math.pow(1 - k, 2), 17); },
    paper(b, t) { noise(b, t, .14, .9, .35, k => Math.pow(1 - k, 2), 18); },
    ding(b, t) { for (const [f, v] of [[1318, .28], [1976, .14], [2637, .05]]) tone(b, t, 1.1, () => f, v, 4); },
    boom(b, t) { tone(b, t, 2.2, x => 55 - x * 8, 1, 1.6); noise(b, t, .3, .6, .05, k => 1 - k, 29); },
    rise(b, t) { tone(b, t, 1, x => 220 + x * 600, .1, 1.2); noise(b, t, 1, .3, .05, k => k * k, 35); },
    poof(b, t) { noise(b, t, .35, .8, .15, k => Math.pow(1 - k, 1.5), 50); },
    rope(b, t) { noise(b, t, .3, .5, .5, k => Math.sin(Math.PI * k), 51, true); },
    step(b, t) { noise(b, t, .08, .6, .2, k => 1 - k, 52); },
  };

  // ---- score ----
  function score(m, o) {
    const dur = o.duration, cues = o.moods && o.moods.length ? o.moods : [{ t: 0, mood: 'none' }];
    const moodAt = t => { let md = cues[0].mood; for (const c of cues) if (t >= c.t) md = c.mood; return md; };
    const segs = cues.map((c, i) => ({ mood: c.mood, a: c.t, b: (cues[i + 1] || { t: dur }).t }));
    // cold: wind (two lowpassed noises with slow swells) + D drone + sparse far creaks
    const r = rng(5); let l1 = 0, l2 = 0;
    for (let i = 0; i < m.length; i++) {
      const t = i / SR, md = moodAt(t);
      if (md === 'cold') {
        l1 += (r() - l1) * .012; l2 += (r() - l2) * .05;
        const sw = .55 + .45 * Math.sin(t * .37) * Math.sin(t * .11 + 1);
        m[i] += (l1 * 1.6 * sw + l2 * .25 * (1 - sw)) * .9 + (Math.sin(2 * Math.PI * 73.4 * t) * .05 + Math.sin(2 * Math.PI * 110 * t) * .025);
      }
    }
    for (const sg of segs) if (sg.mood === 'cold') for (let t = sg.a + 3; t < sg.b - 1; t += 7.3) tone(m, t, 1.2, x => 900 - x * 300, .05, 2.5, 50);
    for (const sg of segs) if (sg.mood === 'strings' || sg.mood === 'tense') for (let t = sg.a, k = 0; t < sg.b; t += 4, k++) bowed(m, t, [50, 46, 53, 48][k % 4], Math.min(4.2, sg.b - t), .09);
    for (const sg of segs) if (sg.mood === 'warm') for (let t = sg.a, k = 0; t < sg.b; t += 4, k++) for (const n of [[55, 59, 62], [52, 55, 59], [48, 52, 55], [50, 54, 57]][k % 4]) bowed(m, t, n, Math.min(4.2, sg.b - t), .05);
    for (const sg of segs) if (sg.mood === 'tense') for (let t = sg.a, k = 0; t < sg.b; t += .3125, k++) tone(m, t, .25, () => midi(k % 8 === 7 ? 37 : 38), .22, 7);
    for (const sg of segs) if (sg.mood === 'drum') for (let t = sg.a, k = 0; t < sg.b; t += .5, k++) {
      tone(m, t, .25, x => 90 - x * 120, k % 2 ? .3 : .55, 12);
      if (k % 2) noise(m, t, .12, .45, .7, q => Math.pow(1 - q, 2), 70 + k % 5, true);
    }
  }

  function render(o) {
    const buf = new Float32Array(Math.ceil(o.duration * SR));
    score(buf, o);
    const fadeIn = o.fadeIn ?? .8, fadeOut = o.fadeOut ?? 1.2;
    for (let i = 0; i < buf.length; i++) buf[i] *= (o.musicGain ?? (G.Show && G.Show.musicGain) ?? .5) * Math.min(1, i / SR / fadeIn) * Math.min(1, (o.duration - i / SR) / fadeOut);
    for (const c of o.sfx || []) if (SFX[c.type]) {
      const tmp = new Float32Array(buf.length); SFX[c.type](tmp, c.t);
      const g = (c.gain ?? 1) * (o.sfxGain ?? (G.Show && G.Show.sfxGain) ?? .4); for (let i = 0; i < buf.length; i++) buf[i] += tmp[i] * g;
    }
    let pk = 0; for (const v of buf) pk = Math.max(pk, Math.abs(v)); if (pk > .9) for (let i = 0; i < buf.length; i++) buf[i] *= .9 / pk;
    return buf;
  }
  G.Soundtrack = { SR, render };
})(window);
