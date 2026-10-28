/* Canada — a realistic(ish) procedural sound library layered over the series score (js/sound.js):
 *  - AMB: ambience beds per scene (wind, birds, campfire, sea, harbour gulls, river, rain, crickets, crowds, a town street,
 *    a distant battle, the trenches, a steam train, room tone, a courtroom, the Commons, a stadium, a car, a TV room…)
 *  - FX: one-shot foley (musket volley, cannon, hooves, train whistle, hammer on steel, pickaxe, bells, typewriter, pen, stamp,
 *    paper, tape rip, gavel, applause, cheering, gasps, boos, chair scrape, cash register, gulls, flag flap, marching…)
 * Everything is synthesised (filtered noise, resonators, formant "voices", a small reverb) into short local buffers that are
 * mixed in at their offsets, so a 23-minute soundtrack renders in seconds. Replaces Soundtrack.render; the old type names still work. */
(function (G) {
  'use strict';
  const ST = G.Soundtrack, SR = ST.SR, TAU = Math.PI * 2;
  function rng(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  // ---- DSP ----
  function Bq(type, f, Q = .707) { const st = { x1: 0, x2: 0, y1: 0, y2: 0 }; let b0, b1, b2, a1, a2;
    const set = (ff, qq = Q) => { const w = TAU * Math.min(ff, SR * .45) / SR, cs = Math.cos(w), al = Math.sin(w) / (2 * qq), a0 = 1 + al;
      if (type === 'lp') { b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = b0; } else if (type === 'hp') { b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = b0; } else { b0 = al; b1 = 0; b2 = -al; }
      b0 /= a0; b1 /= a0; b2 /= a0; a1 = -2 * cs / a0; a2 = (1 - al) / a0; };
    set(f); const p = x => { const y = b0 * x + b1 * st.x1 + b2 * st.x2 - a1 * st.y1 - a2 * st.y2; st.x2 = st.x1; st.x1 = x; st.y2 = st.y1; st.y1 = y; return y; }; p.set = set; return p; }
  function pinkGen(seed) { const r = rng(seed); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0; return () => { const w = r() * 2 - 1; b0 = .99886 * b0 + w * .0555179; b1 = .99332 * b1 + w * .0750759; b2 = .969 * b2 + w * .153852; b3 = .8665 * b3 + w * .3104856; b4 = .55 * b4 + w * .5329522; b5 = -.7616 * b5 - w * .016898; const o = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362) * .11; b6 = w * .115926; return o; }; }
  function brownGen(seed) { const r = rng(seed); let l = 0; return () => { l = (l + (r() * 2 - 1) * .02) * .998; return l * 3.5; }; }
  const whiteGen = seed => { const r = rng(seed); return () => r() * 2 - 1; };
  // a small Schroeder reverb applied in place to a local buffer
  function reverb(buf, wet = .3, size = 1) { const combs = [1557, 1617, 1491, 1422].map(d => ({ d: Math.round(d * size), b: new Float32Array(Math.round(d * size)), i: 0, f: .84 })), aps = [225, 556].map(d => ({ d, b: new Float32Array(d), i: 0 }));
    for (let n = 0; n < buf.length; n++) { const x = buf[n]; let y = 0; for (const c of combs) { const o = c.b[c.i]; c.b[c.i] = x + o * c.f; c.i = (c.i + 1) % c.d; y += o; } y *= .25; for (const a of aps) { const o = a.b[a.i]; a.b[a.i] = y + o * .5; a.i = (a.i + 1) % a.d; y = o - y * .5; } buf[n] = x * (1 - wet * .5) + y * wet; } return buf; }
  // event helpers: write into a local buffer L at local time t (s)
  const ix = t => Math.max(0, Math.round(t * SR));
  function burst(L, t, dur, amp, filt, env = k => Math.exp(-k * 6), seed = 1) { const w = whiteGen(seed), s = ix(t), n = Math.round(dur * SR); for (let i = 0; i < n && s + i < L.length; i++) L[s + i] += filt(w()) * amp * env(i / n); }
  function sine(L, t, dur, f, amp, dec, f2) { const s = ix(t), n = Math.round(dur * SR); let ph = 0; for (let i = 0; i < n && s + i < L.length; i++) { const k = i / n, ff = f2 ? f + (f2 - f) * k : f; ph += TAU * ff / SR; L[s + i] += Math.sin(ph) * amp * Math.exp(-i / SR * dec) * Math.min(1, i / 40); } }
  function partials(L, t, dur, list, amp) { for (const [f, a, d] of list) sine(L, t, dur, f, amp * a, d); }
  // a formant "voice" for crowds: glottal pulse train through two vowel formants, syllable-modulated
  const VOW = [[730, 1090], [270, 2290], [300, 870], [530, 1840], [660, 1720], [490, 1350], [440, 1020], [400, 2000]];
  function voice(L, t, dur, o = {}) { const r = rng(o.seed || 1), s = ix(t), n = Math.round(dur * SR), f0 = (o.f0 || 120) * (.85 + r() * .3), F1 = Bq('bp', 500, 6), F2 = Bq('bp', 1500, 8), lp = Bq('lp', 3200); let ph = 0, syl = 0, sylLen = 1, vi = 0, amp = 0;
    const rate = o.rate || 4.5, gap = o.gap ?? .25, A = o.amp || .05;
    for (let i = 0; i < n && s + i < L.length; i++) { if (i >= syl + sylLen) { syl = i; sylLen = Math.round(SR / (rate * (.7 + r() * .6))); vi = Math.floor(r() * VOW.length); F1.set(VOW[vi][0] * (o.form || 1), 6); F2.set(VOW[vi][1] * (o.form || 1), 8); amp = r() < gap ? 0 : .5 + r() * .5; }
      const k = (i - syl) / sylLen, e = amp * Math.sin(Math.PI * k) ** .7, f = f0 * (1 + .04 * Math.sin(i / SR * 5 + o.seed) + (o.rise || 0) * (i / n)); ph += f / SR; if (ph >= 1) ph -= 1; const g = (ph < .4 ? Math.sin(Math.PI * ph / .4) : 0) - .25 + (r() - .5) * .3;
      const env = Math.min(1, i / 2000, (n - i) / 4000); L[s + i] += lp(F1(g) * 1.6 + F2(g) * .9) * e * A * env; } }
  function crowd(L, t, dur, o = {}) { const N = o.n || 10; for (let v = 0; v < N; v++) voice(L, t + (v % 3) * .05, dur, { seed: (o.seed || 1) * 31 + v, f0: o.f0 ? o.f0 : (v % 3 === 0 ? 210 : 115), rate: o.rate || 4 + (v % 4) * .4, gap: o.gap ?? .3, amp: (o.amp || .03), rise: o.rise || 0, form: v % 3 === 0 ? 1.15 : 1 }); }
  // ---- one-shots (local time starts at .02 s; each returns its length in seconds) ----
  const FX = {};
  const crack = (L, t, a, seed) => { const hp = Bq('hp', 900), lp = Bq('lp', 6000); burst(L, t, .09, a, x => lp(hp(x)), k => Math.exp(-k * 9), seed); sine(L, t, .12, 95, a * .7, 30, 50); };
  FX.shot = { len: 2, fn: L => { crack(L, .02, .9, 3); reverb(L, .35, 1.1); } };
  FX.volley = { len: 3.2, fn: L => { const r = rng(7); for (let i = 0; i < 34; i++) crack(L, .02 + r() ** 1.6 * .45, .35 + r() * .45, 10 + i); const lp = Bq('lp', 300); burst(L, .05, 1.6, .5, x => lp(x), k => Math.exp(-k * 3), 99); reverb(L, .45, 1.3); } };
  FX.musket = FX.shot;
  FX.cannon = { len: 4, fn: L => { crack(L, .02, 1, 5); sine(L, .02, 2.5, 52, 1, 1.4, 30); const lp = Bq('lp', 220), lp2 = Bq('lp', 900); burst(L, .02, 3, 1.1, x => lp(x), k => Math.exp(-k * 2.2), 6); burst(L, .02, .4, .5, x => lp2(x), k => Math.exp(-k * 5), 7); reverb(L, .45, 1.4); } };
  FX.artillery = { len: 3.5, fn: L => { const lp = Bq('lp', 160); burst(L, .02, 3, 1.3, x => lp(x), k => (Math.min(1, k * 30)) * Math.exp(-k * 2.5), 8); sine(L, .02, 2, 40, .5, 1.6, 28); } };
  FX.mg = { len: 2.2, fn: L => { for (let i = 0; i < 16; i++) crack(L, .02 + i * .09, .4, 20 + i); const lp = Bq('lp', 1800); for (let i = 0; i < L.length; i++) L[i] = lp(L[i]); reverb(L, .4, 1.2); } };
  FX.explosion = { len: 4, fn: L => { FX.cannon.fn(L); const r = rng(9), hp = Bq('hp', 2500); for (let i = 0; i < 40; i++) burst(L, .3 + r() * 1.6, .012, .2 * r(), x => hp(x), k => 1 - k, 40 + i); } };
  FX.thunder = { len: 5, fn: L => { const lp = Bq('lp', 400), w = brownGen(4); const n = L.length; for (let i = 0; i < n; i++) { const k = i / n; L[i] += lp(w()) * (Math.min(1, k * 20) * Math.exp(-k * 3)) * (1 + .6 * Math.sin(k * 40)) * .9; } crack(L, .03, .5, 4); reverb(L, .4, 1.5); } };
  const clop = (L, t, a, seed) => { const bp = Bq('bp', 900 + (seed % 5) * 120, 3); burst(L, t, .05, a, x => bp(x) * 3, k => Math.exp(-k * 8), seed); sine(L, t, .06, 320 + (seed % 3) * 40, a * .25, 60); };
  FX.gallop = { len: 3, fn: L => { for (let b = 0; b < 6; b++) for (let k = 0; k < 3; k++) clop(L, .02 + b * .45 + k * .08, .5 * (b < 1 ? .5 : 1) * (1 - b / 9), b * 3 + k); } };
  FX.hooves = { len: 3, fn: L => { for (let b = 0; b < 8; b++) clop(L, .02 + b * .34 + (b % 2) * .06, .35, b); } };
  FX.chuff = { len: 4, fn: L => { for (let i = 0; i < 12; i++) { const bp = Bq('bp', 700, 1.2); burst(L, .02 + i * .3 * (1 - i * .02), .2, .45, x => bp(x) * 2, k => Math.exp(-k * 4), 60 + i); } } };
  FX.whistle = { len: 2.6, fn: L => { const n = Math.round(2.2 * SR), bp = Bq('bp', 1600, 2), w = whiteGen(3); let p = [0, 0, 0]; const fs = [392, 494, 587]; for (let i = 0; i < n; i++) { const k = i / n, e = Math.min(1, k * 12) * Math.min(1, (1 - k) * 6), vib = 1 + .006 * Math.sin(i / SR * 30); let y = 0; fs.forEach((f, j) => { p[j] += f * vib / SR; y += Math.sin(TAU * p[j]) + .3 * Math.sin(TAU * p[j] * 2); }); L[ix(.02) + i] += (y * .12 + bp(w()) * .25) * e; } reverb(L, .35, 1.2); } };
  FX.train = { len: 4.5, fn: L => { FX.chuff.fn(L); const T = new Float32Array(L.length); FX.whistle.fn(T); for (let i = 0; i < L.length; i++) L[i] += T[i] * .8; } };
  const metal = (L, t, a, f0 = 800) => { partials(L, t, 1.6, [[f0, 1, 5], [f0 * 1.63, .7, 7], [f0 * 2.71, .45, 9], [f0 * 3.9, .3, 12], [f0 * 5.2, .2, 16]], a * .25); const hp = Bq('hp', 2000); burst(L, t, .02, a * .8, x => hp(x), k => 1 - k, 5); };
  FX.hammer = { len: 2.4, fn: L => { metal(L, .02, 1, 760); sine(L, .02, .1, 140, .5, 40); metal(L, .9, .9, 760); sine(L, .9, .1, 140, .4, 40); reverb(L, .3, 1.3); } };
  FX.spike = FX.hammer;
  FX.pick = { len: 1.6, fn: L => { for (let i = 0; i < 3; i++) { metal(L, .02 + i * .45, .5, 1900 + i * 80); const bp = Bq('bp', 1200, 1); burst(L, .02 + i * .45, .12, .4, x => bp(x) * 2, k => Math.exp(-k * 5), 80 + i); } reverb(L, .3, 1.4); } };
  FX.bell = { len: 5, fn: L => { partials(L, .02, 4.8, [[220, 1, .6], [440, .8, .9], [528, .5, 1.2], [660, .45, 1.4], [880, .35, 1.8], [1150, .25, 2.4], [1480, .15, 3]], .25); reverb(L, .3, 1.4); } };
  FX.shipbell = { len: 3, fn: L => { for (let k = 0; k < 2; k++) partials(L, .02 + k * .5, 2.4, [[880, 1, 1.4], [1760, .5, 2], [2390, .3, 3], [3300, .2, 4]], .18); } };
  FX.ding = { len: 1.5, fn: L => partials(L, .02, 1.4, [[2093, 1, 3], [4186, .4, 5], [5600, .2, 7]], .22) };
  FX.phone = { len: 2.2, fn: L => { for (let i = 0; i < 30; i++) partials(L, .02 + i * .05, .12, [[1250 + (i % 2) * 60, 1, 30], [2600, .4, 40]], .15); } };
  FX.typewriter = { len: 2.2, fn: L => { const r = rng(11); for (let i = 0; i < 14; i++) { const t = .02 + i * .11 + r() * .03, hp = Bq('hp', 1500); burst(L, t, .025, .55, x => hp(x), k => Math.exp(-k * 8), 100 + i); sine(L, t, .04, 180, .25, 80); } partials(L, 1.75, .5, [[2600, 1, 6]], .25); } };
  FX.pen = { len: 1.6, fn: L => { const hp = Bq('hp', 2800), w = whiteGen(5), r = rng(5), n = Math.round(1.4 * SR); let a = 0; for (let i = 0; i < n; i++) { if (i % 600 === 0) a = r() < .25 ? 0 : .2 + r() * .3; L[ix(.02) + i] += hp(w()) * a * (.6 + .4 * Math.sin(i / SR * TAU * 23)); } } };
  FX.scribble = FX.pen;
  FX.stamp = { len: 1, fn: L => { sine(L, .02, .2, 120, .9, 25, 70); const bp = Bq('bp', 1400, 1.2); burst(L, .02, .06, .8, x => bp(x) * 2, k => Math.exp(-k * 7), 3); reverb(L, .15, .8); } };
  FX.rustle = { len: 1, fn: L => { const r = rng(13); for (let i = 0; i < 22; i++) { const hp = Bq('hp', 1800 + r() * 2500); burst(L, .02 + r() * .6, .02 + r() * .04, .25 + r() * .25, x => hp(x), k => Math.exp(-k * 6), 120 + i); } } };
  FX.tear = { len: 1, fn: L => { const hp = Bq('hp', 1200), w = whiteGen(7), r = rng(7), n = Math.round(.55 * SR); for (let i = 0; i < n; i++) L[ix(.02) + i] += hp(w()) * (r() < .5 ? 1 : .3) * Math.min(1, i / 800) * (1 - i / n) * .6; } };
  FX.tape = FX.tear;
  FX.gavel = { len: 1.6, fn: L => { for (let k = 0; k < 3; k++) { const bp = Bq('bp', 520, 4); burst(L, .02 + k * .32, .07, .9, x => bp(x) * 4, kk => Math.exp(-kk * 7), 140 + k); sine(L, .02 + k * .32, .08, 230, .35, 40); } reverb(L, .35, 1.3); } };
  FX.knock = { len: 1.2, fn: L => { for (let k = 0; k < 3; k++) { const bp = Bq('bp', 380, 3); burst(L, .02 + k * .2, .06, .8, x => bp(x) * 4, kk => Math.exp(-kk * 7), 150 + k); } reverb(L, .25, 1); } };
  FX.chair = { len: 1, fn: L => { const bp = Bq('bp', 300, 5), w = whiteGen(9), n = Math.round(.6 * SR); for (let i = 0; i < n; i++) { const k = i / n; bp.set(260 + Math.sin(k * 30) * 60 + k * 200, 6); L[ix(.02) + i] += bp(w()) * 3 * Math.sin(Math.PI * k) * (.6 + .4 * Math.sin(i / SR * TAU * 38)) * .5; } } };
  FX.door = { len: 1.6, fn: L => { const n = Math.round(1.2 * SR); let ph = 0; const r = rng(3); for (let i = 0; i < n; i++) { const k = i / n, f = 220 + Math.sin(k * 9) * 80 + k * 140; ph += f / SR; const saw = (ph % 1) * 2 - 1; L[ix(.02) + i] += saw * (r() < .7 ? 1 : 0) * Math.sin(Math.PI * k) * .12; } } };
  const clap = (L, t, a, seed) => { const bp = Bq('bp', 900 + (seed % 7) * 220, 1.4); burst(L, t, .02, a, x => bp(x) * 2.5, k => Math.exp(-k * 9), seed); };
  FX.applause = { len: 4.2, fn: L => { const r = rng(17); for (let i = 0; i < 520; i++) { const t = .02 + r() * 3.8, env = Math.min(1, t * 3) * Math.min(1, (4 - t) * 1.2); clap(L, t, .22 * env * (.5 + r() * .5), 200 + i); } reverb(L, .3, 1.2); } };
  FX.cheer = { len: 4, fn: L => { crowd(L, .02, 3.6, { n: 16, f0: 190, rate: 2.2, gap: .05, amp: .045, rise: .25, seed: 3 }); const T = new Float32Array(L.length); FX.applause.fn(T); for (let i = 0; i < L.length; i++) L[i] += T[i] * .7; reverb(L, .25, 1.3); } };
  FX.murmur = { len: 3, fn: L => crowd(L, .02, 2.8, { n: 10, amp: .035, seed: 5 }) };
  FX.gasp = { len: 1.4, fn: L => { const bp = Bq('bp', 1300, 1.2); burst(L, .02, .7, .7, x => bp(x) * 2, k => Math.min(1, k * 8) * Math.exp(-k * 3), 21); crowd(L, .1, .9, { n: 8, f0: 220, gap: .05, rate: 1.5, amp: .03, seed: 8 }); } };
  FX.boo = { len: 3, fn: L => { for (let v = 0; v < 12; v++) voice(L, .02 + v * .03, 2.4, { seed: 300 + v, f0: 100 + (v % 3) * 25, rate: .9, gap: 0, amp: .04, form: .75 }); reverb(L, .2, 1.2); } };
  FX.splash2 = { len: 2, fn: L => { const lp = Bq('lp', 3000); burst(L, .02, 1.2, .8, x => lp(x), k => Math.min(1, k * 20) * Math.exp(-k * 4), 31); } };
  FX.wave = { len: 3.5, fn: L => { const lp = Bq('lp', 600), w = pinkGen(5), n = Math.round(3.2 * SR); for (let i = 0; i < n; i++) { const k = i / n; lp.set(300 + 2500 * Math.sin(Math.PI * Math.min(1, k * 1.6)) ** 2); L[ix(.02) + i] += lp(w()) * Math.sin(Math.PI * k) ** 1.5 * 1.4; } } };
  FX.ignite = { len: 2.2, fn: L => { const bp = Bq('bp', 400, .8), w = pinkGen(9), n = Math.round(1.5 * SR); for (let i = 0; i < n; i++) { const k = i / n; bp.set(300 + k * 1200, .8); L[ix(.02) + i] += bp(w()) * Math.min(1, k * 4) * (1 - k) * 2.2; } const r = rng(3), hp = Bq('hp', 2500); for (let i = 0; i < 30; i++) burst(L, .2 + r() * 1.8, .006, .3 * r(), x => hp(x), k => 1 - k, 400 + i); } };
  FX.car = { len: 3.6, fn: L => { const n = Math.round(3.4 * SR), lp = Bq('lp', 700), w = brownGen(3); let ph = 0; for (let i = 0; i < n; i++) { const k = i / n, dop = 1 + .08 * Math.cos(Math.PI * k), e = Math.exp(-((k - .5) ** 2) * 12); ph += 62 * dop / SR; const saw = (ph % 1) * 2 - 1; L[ix(.02) + i] += (lp(saw) * .5 + w() * .25) * e; } } };
  FX.truck = FX.car;
  FX.register = { len: 1.8, fn: L => { for (let k = 0; k < 4; k++) { const hp = Bq('hp', 1500); burst(L, .02 + k * .07, .02, .5, x => hp(x), kk => 1 - kk, 500 + k); } partials(L, .35, 1.3, [[2350, 1, 2.5], [4700, .4, 4], [3520, .3, 3]], .25); const bp = Bq('bp', 600, 1); burst(L, .4, .35, .4, x => bp(x) * 2, k => Math.sin(Math.PI * k), 510); } };
  FX.coins = { len: 1.4, fn: L => { const r = rng(4); for (let i = 0; i < 7; i++) partials(L, .02 + r() * .8, .5, [[3200 + r() * 1800, 1, 14], [6100 + r() * 900, .5, 20]], .12); } };
  const gull = (L, t, a, seed) => { const r = rng(seed), n = Math.round(.55 * SR); let ph = 0; for (let i = 0; i < n; i++) { const k = i / n, f = (1500 + 900 * Math.sin(Math.PI * Math.min(1, k * 1.3)) - k * 500) * (1 + .03 * Math.sin(i / SR * 70)); ph += f / SR; const y = Math.tanh(Math.sin(TAU * ph) * 3) + (r() - .5) * .3; L[ix(t) + i] += y * a * Math.sin(Math.PI * k) ** .6 * .5; } };
  FX.gull = { len: 2, fn: L => { gull(L, .02, .35, 1); gull(L, .7, .3, 2); gull(L, 1.25, .22, 3); } };
  const chirp = (L, t, a, f0, seed) => { const r = rng(seed); const m = 2 + Math.floor(r() * 4); for (let k = 0; k < m; k++) sine(L, t + k * .09, .06, f0 + r() * 900, a, 30, f0 + 1400 + r() * 900); };
  FX.birds = { len: 2.5, fn: L => { for (let i = 0; i < 5; i++) chirp(L, .02 + i * .42, .12, 3000 + (i % 2) * 900, 600 + i); } };
  FX.flag = { len: 2, fn: L => { const bp = Bq('bp', 500, .8), w = pinkGen(3), r = rng(3), n = Math.round(1.8 * SR); let a = 0; for (let i = 0; i < n; i++) { if (i % 1400 === 0) a = .4 + r() * .8; L[ix(.02) + i] += bp(w()) * a * Math.abs(Math.sin(i / SR * TAU * 7)) * Math.sin(Math.PI * i / n) * 2; } } };
  FX.march = { len: 4.2, fn: L => { for (let s = 0; s < 8; s++) for (let m = 0; m < 10; m++) { const bp = Bq('bp', 250 + m * 30, 1.5); burst(L, .02 + s * .5 + m * .012, .08, .14, x => bp(x) * 2, k => Math.exp(-k * 6), 700 + s * 10 + m); } } };
  FX.crunch = { len: 2.6, fn: L => { for (let s = 0; s < 5; s++) { const hp = Bq('hp', 1800), r = rng(s); for (let g = 0; g < 18; g++) burst(L, .02 + s * .5 + r() * .12, .006, .25, x => hp(x), k => 1 - k, 800 + s * 20 + g); } } };
  FX.steps = { len: 2.6, fn: L => { for (let s = 0; s < 5; s++) { const bp = Bq('bp', 260, 2); burst(L, .02 + s * .48, .06, .5, x => bp(x) * 3, k => Math.exp(-k * 7), 900 + s); } reverb(L, .25, 1); } };
  FX.drumroll = { len: 2.2, fn: L => { const n = 36; for (let i = 0; i < n; i++) { const hp = Bq('hp', 700); burst(L, .02 + i * .05, .04, .12 + .25 * (i / n), x => hp(x), k => Math.exp(-k * 6), 1000 + i); } sine(L, 1.8, .4, 70, .6, 8); } };
  FX.bugle = { len: 5, fn: L => { const notes = [[392, .5], [523, .5], [659, 1], [523, .45], [659, .45], [784, 1.4]]; let t = .02; for (const [f, d] of notes) { const n = Math.round(d * SR), lp = Bq('lp', 2400); let ph = 0; for (let i = 0; i < n; i++) { const k = i / n; ph += f * (1 + .004 * Math.sin(i / SR * 30)) / SR; const saw = (ph % 1) * 2 - 1; L[ix(t) + i] += lp(saw) * Math.min(1, k * 14) * Math.min(1, (1 - k) * 8) * .14; } t += d + .03; } reverb(L, .5, 1.5); } };
  FX.glass = { len: 1.6, fn: L => { partials(L, .02, 1.5, [[2700, 1, 3], [5400, .4, 5], [3900, .3, 4]], .15); partials(L, .08, 1.4, [[3100, 1, 3], [6200, .4, 5]], .12); } };
  FX.pop = { len: .5, fn: L => { sine(L, .02, .08, 600, .4, 40, 200); const bp = Bq('bp', 1500, 1); burst(L, .02, .03, .4, x => bp(x) * 2, k => 1 - k, 3); } };
  FX.slap = { len: .5, fn: L => { const bp = Bq('bp', 1800, .9); burst(L, .02, .05, .7, x => bp(x) * 2, k => Math.exp(-k * 6), 4); sine(L, .02, .06, 160, .3, 50); } };
  FX.ballot = { len: 1, fn: L => { const bp = Bq('bp', 2200, 1); burst(L, .02, .25, .3, x => bp(x) * 2, k => Math.sin(Math.PI * k), 5); sine(L, .3, .12, 150, .6, 30); } };
  FX.tvclick = { len: 1, fn: L => { const hp = Bq('hp', 1200); burst(L, .02, .02, .7, x => hp(x), k => 1 - k, 6); burst(L, .05, .6, .25, x => hp(x), k => Math.exp(-k * 4), 7); } };
  FX.wolf = { len: 3, fn: L => { const n = Math.round(2.6 * SR); let ph = 0; for (let i = 0; i < n; i++) { const k = i / n, f = (420 + 300 * Math.sin(Math.PI * Math.min(1, k * 1.6)) - k * 120) * (1 + .01 * Math.sin(i / SR * 30)); ph += f / SR; L[ix(.02) + i] += (Math.sin(TAU * ph) + .15 * Math.sin(TAU * ph * 2)) * Math.sin(Math.PI * k) ** .5 * .2; } reverb(L, .6, 1.6); } };
  FX.cough = { len: 1, fn: L => { for (let k = 0; k < 2; k++) { const bp = Bq('bp', 700, 1.4); burst(L, .02 + k * .25, .15, .6, x => bp(x) * 2.5, kk => Math.exp(-kk * 5), 30 + k); } reverb(L, .4, 1.3); } };
  FX.scrape = FX.chair;
  FX.swish = { len: .6, fn: L => { const bp = Bq('bp', 800, 1.2), w = pinkGen(11), n = Math.round(.32 * SR); for (let i = 0; i < n; i++) { const k = i / n; bp.set(500 + 2600 * Math.sin(Math.PI * k), 1.4); L[ix(.02) + i] += bp(w()) * Math.sin(Math.PI * k) ** 2 * 1.6; } } };
  FX.riser = { len: 2, fn: L => { const bp = Bq('bp', 400, 2), w = pinkGen(13), n = Math.round(1.6 * SR); let ph = 0; for (let i = 0; i < n; i++) { const k = i / n; bp.set(300 + 3200 * k * k, 2.5); ph += (120 + 520 * k * k) / SR; L[ix(.02) + i] += (bp(w()) * 1.4 + Math.sin(TAU * ph) * .12) * k ** 2.2; } } };
  FX.impact = { len: 2.6, fn: L => { sine(L, .02, 2.2, 58, 1, 2.2, 36); const lp = Bq('lp', 260); burst(L, .02, .9, .9, x => lp(x), k => Math.exp(-k * 4), 17); const hp = Bq('hp', 3000); burst(L, .02, .05, .4, x => hp(x), k => 1 - k, 18); reverb(L, .35, 1.4); } };

  // ---- ambience beds: write [t0, t1) into the master buffer M at level lv (with 0.8 s fades) ----
  const AMB = {};
  function bed(M, t0, t1, lv, gen) { const s = ix(t0), e = Math.min(M.length, ix(t1)), fd = .8 * SR; for (let i = s; i < e; i++) { const k = Math.min(1, (i - s) / fd, (e - i) / fd); M[i] += gen(i - s, (i - s) / SR) * lv * k; } }
  // scatter one-shots through a bed
  function scatter(M, t0, t1, lv, every, jitter, fx, seed) { const r = rng(seed); for (let t = t0 + r() * every; t < t1 - 1; t += every * (1 - jitter + r() * jitter * 2)) addFx(M, fx, t, lv * (.6 + r() * .4), Math.floor(r() * 1e6)); }
  function windGen(seed, lo = 250, hi = 700, q = .9) { const p = pinkGen(seed), bp = Bq('bp', 400, q), r = rng(seed); const ph = [r() * 9, r() * 9, r() * 9]; return (i, t) => { const g = .55 + .25 * Math.sin(t * .37 + ph[0]) + .2 * Math.sin(t * .91 + ph[1]) + .12 * Math.sin(t * 2.3 + ph[2]); if (i % 64 === 0) bp.set(lo + (hi - lo) * Math.max(0, g), q); return bp(p()) * 3 * g; }; }
  AMB.wind = (M, a, b, s) => bed(M, a, b, .07, windGen(s));
  AMB.snowwind = (M, a, b, s) => { bed(M, a, b, .08, windGen(s, 500, 1500, 2.2)); bed(M, a, b, .05, windGen(s + 1, 200, 450)); };
  AMB.meadow = (M, a, b, s) => { bed(M, a, b, .035, windGen(s)); scatter(M, a, b, .5, 2.2, .6, 'birds', s); };
  AMB.forest = (M, a, b, s) => { const hp = Bq('hp', 2500), p = pinkGen(s + 3); bed(M, a, b, .04, windGen(s, 300, 900)); bed(M, a, b, .015, (i, t) => hp(p()) * (.5 + .5 * Math.sin(t * 1.3))); scatter(M, a, b, .45, 3, .6, 'birds', s + 1); };
  AMB.campfire = (M, a, b, s) => { const lp = Bq('lp', 250), br = brownGen(s), r = rng(s), hp = Bq('hp', 2200), w = whiteGen(s); let cr = 0, crA = 0;
    bed(M, a, b, .06, (i) => { if (r() < 9 / SR) { cr = Math.round(SR * (.002 + r() * .006)); crA = r() ** 2.5; } let c = 0; if (cr > 0) { c = hp(w()) * crA * 3; cr--; } return lp(br()) * .6 + c; }); bed(M, a, b, .02, windGen(s + 5, 200, 500)); };
  AMB.night = (M, a, b, s) => { bed(M, a, b, .025, windGen(s, 200, 500)); for (let c = 0; c < 3; c++) { const f = 4300 + c * 500, per = .55 + c * .17; let ph = 0; bed(M, a, b, .02, (i, t) => { const tt = (t + c * .21) % per; ph += f / SR; return tt < .09 && (tt % .03) < .02 ? Math.sin(TAU * ph) : 0; }); } };
  AMB.sea = (M, a, b, s) => { const lp = Bq('lp', 500), p = pinkGen(s), hp = Bq('hp', 2000), p2 = pinkGen(s + 1); bed(M, a, b, .12, (i, t) => { const sw = .5 + .5 * Math.sin(t * TAU / 7.3 + s), c = Math.max(0, Math.sin(t * TAU / 7.3 + s - .4)) ** 3; if (i % 64 === 0) lp.set(250 + 500 * sw); return lp(p()) * (.4 + .8 * sw) * 1.4 + hp(p2()) * c * .5; }); };
  AMB.harbour = (M, a, b, s) => { AMB.sea(M, a, b, s); scatter(M, a, b, .4, 5, .5, 'gull', s); scatter(M, a, b, .25, 9, .5, 'door', s + 2); };
  AMB.ship = (M, a, b, s) => { AMB.sea(M, a, b, s); scatter(M, a, b, .3, 4, .5, 'door', s + 3); scatter(M, a, b, .3, 6, .5, 'flag', s + 4); bed(M, a, b, .03, windGen(s + 6)); };
  AMB.river = (M, a, b, s) => { const bp = Bq('bp', 1200, .7), p = pinkGen(s), r = rng(s); bed(M, a, b, .06, (i, t) => bp(p()) * 2.2 * (.75 + .25 * Math.sin(t * 7 + Math.sin(t * 2.3)))); scatter(M, a, b, .2, 1.2, .8, 'pop', s); };
  AMB.rain = (M, a, b, s) => { const hp = Bq('hp', 1500), p = pinkGen(s), r = rng(s), w = whiteGen(s), hp2 = Bq('hp', 3000); let d = 0; bed(M, a, b, .07, () => { if (r() < 60 / SR) d = 40; let c = 0; if (d > 0) { c = hp2(w()) * .8; d--; } return hp(p()) * 1.5 + c; }); };
  AMB.room = () => {}; // indoor shots: no hiss bed, the score carries them
  AMB.map = () => {};
  AMB.court = (M, a, b, s) => { AMB.room(M, a, b, s); scatter(M, a, b, .25, 6, .6, 'cough', s); };
  AMB.office = (M, a, b, s) => { AMB.room(M, a, b, s); scatter(M, a, b, .06, 8, .6, 'typewriter', s); };
  function crowdBed(M, a, b, s, o) { const L = new Float32Array(Math.ceil((b - a + .2) * SR)); crowd(L, 0, b - a, o); if (o.rev) reverb(L, o.rev, 1.3); const st = ix(a), fd = .8 * SR; for (let i = 0; i < L.length && st + i < M.length; i++) { const k = Math.min(1, i / fd, (L.length - i) / fd); M[st + i] += L[i] * k * (o.lv || 1); } }
  AMB.crowd = (M, a, b, s) => crowdBed(M, a, b, s, { n: 10, amp: .022, seed: s });
  AMB.commons = (M, a, b, s) => { crowdBed(M, a, b, s, { n: 14, amp: .018, seed: s, rev: .45 }); AMB.room(M, a, b, s); };
  AMB.street = (M, a, b, s) => { crowdBed(M, a, b, s, { n: 5, amp: .016, seed: s }); scatter(M, a, b, .35, 4, .5, 'hooves', s); bed(M, a, b, .02, windGen(s)); };
  AMB.stadium = (M, a, b, s) => { crowdBed(M, a, b, s, { n: 24, amp: .03, seed: s, rate: 3, gap: .1, rev: .3 }); const bp = Bq('bp', 900, .5), p = pinkGen(s); bed(M, a, b, .05, (i, t) => bp(p()) * 2 * (.7 + .3 * Math.sin(t * .8))); };
  AMB.battle = (M, a, b, s) => { bed(M, a, b, .04, windGen(s)); scatter(M, a, b, .16, 4, .6, 'artillery', s); scatter(M, a, b, .06, 6, .6, 'volley', s + 1); };
  AMB.trench = (M, a, b, s) => { bed(M, a, b, .06, windGen(s, 200, 600)); scatter(M, a, b, .22, 3.2, .6, 'artillery', s); scatter(M, a, b, .05, 8, .6, 'mg', s + 2); };
  AMB.train = (M, a, b, s) => { const bp = Bq('bp', 650, 1.1), p = pinkGen(s), lp = Bq('lp', 200), br = brownGen(s); bed(M, a, b, .045, (i, t) => { const ph = (t * 3.4) % 1; return bp(p()) * 2.5 * Math.exp(-ph * 5) + lp(br()) * .6 + ((t * 1.1) % 1 < .01 ? 1.5 : 0) * Math.sin(t * 900); }); };
  AMB.mountain = (M, a, b, s) => { bed(M, a, b, .06, windGen(s, 300, 900, 1.4)); scatter(M, a, b, .18, 2.4, .5, 'pick', s); };
  AMB.car = (M, a, b, s) => { const lp = Bq('lp', 300), br = brownGen(s), p = pinkGen(s + 1), lp2 = Bq('lp', 900); let ph = 0; bed(M, a, b, .06, (i, t) => { ph += (34 + 3 * Math.sin(t * .7)) / SR; const saw = (ph % 1) * 2 - 1; return lp(saw) * .9 + lp2(p()) * .7 + lp(br()) * .3; }); };
  AMB.tv = (M, a, b, s) => { AMB.room(M, a, b, s); const L = new Float32Array(Math.ceil((b - a + .2) * SR)); voice(L, 0, b - a, { seed: s, f0: 130, rate: 5, gap: .2, amp: .011 }); const bp = Bq('bp', 1200, .8), st = ix(a); for (let i = 0; i < L.length && st + i < M.length; i++) M[st + i] += bp(L[i]) * 1.5 * Math.min(1, i / 30000, (L.length - i) / 30000); };
  AMB.ww2 = (M, a, b, s) => { bed(M, a, b, .04, windGen(s)); scatter(M, a, b, .18, 4.4, .1, 'march', s); const lp = Bq('lp', 300); let ph = 0; bed(M, a, b, .02, (i, t) => { ph += (88 + Math.sin(t * .5) * 4) / SR; return lp((ph % 1) * 2 - 1) * (.5 + .5 * Math.sin(t * .3)); }); };
  AMB.highway = (M, a, b, s) => { bed(M, a, b, .04, windGen(s)); scatter(M, a, b, .22, 3.2, .4, 'truck', s); };
  AMB.none = () => {};

  // ---- mixing ----
  const cache = {};
  function addFx(M, type, t, gain, seed = 0) { const f = FX[type]; if (!f) return false; const key = type + ':' + (seed % 3); let L = cache[key]; if (!L) { L = new Float32Array(Math.ceil(f.len * SR)); f.fn(L, seed); cache[key] = L; } const st = ix(t - .02); for (let i = 0; i < L.length && st + i < M.length; i++) M[st + i] += L[i] * gain; return true; }
  const orig = ST.render;
  ST.render = o => {
    // three stems: the score (old renderer, plus the legacy foley types it knows), the ambience beds, and the foley.
    // Wherever a sound effect plays, the beds duck almost out and the score dips, so the effect reads clean.
    const N = Math.ceil(o.duration * SR), legacy = (o.sfx || []).filter(c => !FX[c.type]);
    const Mu = orig(Object.assign({}, o, { sfx: [], musicGain: o.musicGain ?? .42, noHiss: true })), A = new Float32Array(N), S = new Float32Array(N), duck = new Float32Array(Math.ceil(N / 256) + 2);
    const mark = (t, len) => { for (let k = Math.max(0, Math.floor((t - .25) * SR / 256)); k < Math.min(duck.length, Math.ceil((t + len) * SR / 256)); k++) duck[k] = 1; };
    for (const c of legacy) { const tmp = orig({ duration: 3.2, sfx: [{ t: .1, type: c.type, gain: c.gain }], moods: [{ t: 0, mood: 'silence' }], musicGain: 0, noHiss: true }); const st = ix(c.t - .1); for (let i = 0; i < tmp.length && st + i < N; i++) S[st + i] += tmp[i]; mark(c.t, 1); }
    for (const a of o.amb || []) (AMB[a.type] || AMB.none)(A, a.t0, a.t1, Math.round(a.t0 * 7) + 3);
    for (const c of o.sfx || []) if (FX[c.type]) { addFx(S, c.type, c.t, (c.gain ?? 1) * (o.sfxGain ?? .6), Math.round(c.t * 10)); mark(c.t, Math.min(FX[c.type].len, 3)); }
    // smooth the duck envelope (~0.3 s ramps) and mix
    let g = 0; const M = new Float32Array(N); for (let i = 0; i < N; i++) { if ((i & 255) === 0) { const tgt = duck[i >> 8]; g += (tgt - g) * .09; } M[i] = Mu[i] * (1 - .45 * g) + A[i] * (1 - .9 * g) + S[i]; }
    let pk = 0; for (const v of M) pk = Math.max(pk, Math.abs(v)); if (pk > .95) for (let i = 0; i < M.length; i++) M[i] *= .95 / pk;
    return M; };
  ST.FX = FX; ST.AMB = AMB;
})(window);
