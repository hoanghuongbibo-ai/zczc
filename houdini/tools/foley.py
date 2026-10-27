#!/usr/bin/env python3
"""Foley + ambience library for the history channel (stereo, 48 kHz, float32).

   python3 tools/foley.py OUTDIR        writes every one-shot to OUTDIR/<name>.wav
   import foley; foley.make(name, dur)  one-shot or ambience bed ('amb_rain', …) as an (n, 2) array

Real recordings (CC0, Kenney starter kits — see assets/sfx/CREDITS.md) are used where they beat synthesis:
footsteps, impact, truck engine, coin, break, nature ambience. Everything else is synthesised (filtered noise,
modal/inharmonic partials, formant babble for crowds) and passed through a small room reverb.
"""
import os, sys, numpy as np
from scipy.signal import lfilter, butter, sosfilt
SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
KEN = os.environ.get('KENNEY_DIR', '')
rng = np.random.default_rng(7)

def t_(d): return np.arange(int(d * SR)) / SR
def noise(d): return rng.standard_normal(int(d * SR))
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def env(n, a=.005, d=.2, s=0., sus=0., r=.05):
    a, d, sus, r = int(a * SR), int(d * SR), int(sus * SR), int(r * SR); e = np.concatenate([np.linspace(0, 1, max(1, a)), np.linspace(1, s, max(1, d)), np.full(sus, s), np.linspace(s, 0, max(1, r))])
    return np.pad(e, (0, max(0, n - len(e))))[:n]
def expd(n, tau): return np.exp(-np.arange(n) / SR / tau)
def norm(x, pk=.9): m = np.max(np.abs(x)) or 1; return x / m * pk
def st(x, pan=0., width=0.):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 2: return x
    l, r = x * np.sqrt((1 - pan) / 2), x * np.sqrt((1 + pan) / 2)
    if width: d = int(.011 * SR); r = np.concatenate([np.zeros(d), r])[:len(r)] * (1 - width * .3) + r * width * .3
    return np.stack([l, r], 1)
def reverb(x, wet=.25, size=1.):
    x2 = x if x.ndim == 2 else st(x); out = np.zeros_like(x2)
    for ch in (0, 1):
        s = x2[:, ch]; acc = np.zeros(len(s))
        for i, dl in enumerate([1557, 1617, 1491, 1422, 1277, 1356]):
            d = int(dl * size * (1 + ch * .023)); g = .78 + .02 * (i % 3); a = np.zeros(d + 1); a[0] = 1; a[d] = -g; acc += lfilter([1], a, s)
        for d in (225, 556, 441):
            d = int(d * size); g = .5; b = np.zeros(d + 1); b[0] = -g; b[d] = 1; a = np.zeros(d + 1); a[0] = 1; a[d] = -g; acc = lfilter(b, a, acc)
        out[:, ch] = s * (1 - wet) + lp(acc, 6000) * wet * .18
    return out
def pad(x, d): n = int(d * SR); return np.pad(x, ((0, max(0, n - len(x))), (0, 0)))[:n] if x.ndim == 2 else np.pad(x, (0, max(0, n - len(x))))[:n]
def load(rel):
    p = os.path.join(KEN, rel)
    if not KEN or not os.path.exists(p): return None
    import soundfile as sf
    try: y, sr = sf.read(p, always_2d=True)
    except Exception: return None
    if sr != SR:
        idx = np.arange(0, len(y), sr / SR); y = np.stack([np.interp(idx, np.arange(len(y)), y[:, c]) for c in range(y.shape[1])], 1)
    if y.shape[1] == 1: y = np.repeat(y, 2, 1)
    return y[:, :2]

# ---------------- one-shots ----------------
def slow(d, hz, seed=None):   # smooth random control signal in [0, 1]
    n = int(d * SR); k = max(2, int(d * hz) + 2); pts = rng.uniform(0, 1, k); return np.interp(np.linspace(0, k - 1, n), np.arange(k), pts)
def whoosh(d=.55, lo=300, hi=3000, pk=.6):
    n = int(d * SR); tt = np.linspace(0, 1, n); x = noise(d); y = np.zeros(n); cs = np.geomspace(lo, hi, 6)
    for i, c in enumerate(cs):   # overlapping bands peaking one after another = a smooth sweep, no block clicks
        centre = .25 + .5 * i / 5; w = np.exp(-((tt - centre) / .22) ** 2); y += bp(x, c * .7, min(SR / 2 - 100, c * 1.4)) * w * (1 + i * .15)
    y *= np.sin(np.pi * tt) ** 1.2; pan = np.linspace(-.7, .7, n)
    return norm(np.stack([y * np.sqrt((1 - pan) / 2), y * np.sqrt((1 + pan) / 2)], 1), pk)
def swish(): return whoosh(.32, 800, 6000, .45)
def whip(): return whoosh(.22, 1200, 7000, .5)
def pop():
    n = int(.12 * SR); tt = t_(.12); f = 900 * np.exp(-tt * 30) + 280; ph = np.cumsum(2 * np.pi * f / SR); return st(norm(np.sin(ph) * expd(n, .03), .55))
def tone(f, d, tau, partials=((1, 1),), detune=0.):
    tt = t_(d); y = sum(a * np.sin(2 * np.pi * f * m * tt + detune * m) * np.exp(-tt / (tau / (1 + .4 * (m - 1)))) for m, a in partials); return y
def ding(): return reverb(st(norm(tone(1760, 1.4, .5, ((1, 1), (2.76, .4), (5.4, .2))), .45)), .3)
def chime(): return reverb(st(norm(sum(tone(f, 1.2, .5, ((1, 1), (2.76, .3))) * (.8 ** i) for i, f in enumerate([1318, 1568, 1976, 2637])), .4)), .4)
def sparkle():
    y = np.zeros(int(1.2 * SR))
    for i in range(14): f = rng.uniform(2500, 6000); o = int(rng.uniform(0, .8) * SR); s = tone(f, .35, .08); y[o:o + len(s)] += s * rng.uniform(.3, 1)
    return reverb(st(norm(y, .3), width=1), .4)
def tada():
    d = 1.6; tt = t_(d); y = np.zeros(len(tt))
    for f in (392, 494, 587, 784):
        saw = 2 * ((f * tt) % 1) - 1; y += lp(saw, 2200) * env(len(tt), .02, .3, .5, .6, .5)
    y2 = norm(y, .5); s = sparkle(); out = st(y2, 0, 1); out[:len(s)] += s * .6; return reverb(out, .3)
def gong():
    d = 4; tt = t_(d); y = sum(np.sin(2 * np.pi * f * tt + rng.uniform(0, 6)) * np.exp(-tt / tau) * a for f, tau, a in [(110, 2.2, 1), (163, 1.8, .7), (247, 1.4, .5), (329, 1.0, .4), (437, .8, .3), (583, .6, .2)])
    y *= 1 - np.exp(-tt * 40); return reverb(st(norm(y, .6), 0, 1), .35, 1.3)
def thud(f=70, d=.5):
    tt = t_(d); y = np.sin(2 * np.pi * (f + 60 * np.exp(-tt * 25)) * tt) * np.exp(-tt * 9); y += lp(noise(d), 600) * np.exp(-tt * 30) * .5; return st(norm(y, .7))
def boom():
    d = 2.5; tt = t_(d); y = np.sin(2 * np.pi * (45 + 80 * np.exp(-tt * 8)) * tt) * np.exp(-tt * 1.6); y += lp(noise(d), 300) * np.exp(-tt * 2.2) * .8; return reverb(st(norm(y, .8), 0, 1), .3, 1.4)
def stamp(): x = thud(110, .3); n = len(x); x[:, 0] += hp(noise(.3), 1500)[:n] * expd(n, .02) * .3; x[:, 1] = x[:, 0]; return norm(x, .65)
def rumble(d=2.0): tt = t_(d); y = lp(noise(d), 120, 4) * env(len(tt), .3, .2, 1, d - .9, .4); y += lp(noise(d), 900) * .15 * env(len(tt), .1, .3, .5, d - .8, .4); return st(norm(y, .7), 0, 1)
def clink(f=2400):
    return reverb(st(norm(tone(f, .6, .12, ((1, 1), (2.4, .6), (3.9, .4), (5.6, .2))) + tone(f * 1.06, .6, .1, ((1, .5),)), .4)), .2)
def coins():
    y = np.zeros(int(1.0 * SR))
    for i in range(9): s = tone(rng.uniform(2200, 4200), .4, .07, ((1, 1), (2.6, .5))); o = int(rng.uniform(0, .6) * SR); y[o:o + len(s)] += s * rng.uniform(.4, 1)
    k = load('Starter-Kit-3D-Platformer/sounds/coin.ogg'); out = reverb(st(norm(y, .4), width=1), .2)
    if k is not None: out[:len(k)] += k[:len(out)] * .5
    return out
def cash():
    y = st(np.zeros(int(1.4 * SR))); m = thud(160, .2); y[:len(m)] += m * .4
    for i, o in enumerate([.05, .09, .13]): c = clink(2600 + i * 300); s = int(o * SR); y[s:s + len(c)] += c[:len(y) - s] * .5
    b = tone(2093, 1.0, .5, ((1, 1), (2.76, .3))); s = int(.22 * SR); y[s:s + len(b), 0] += b * .45; y[s:s + len(b), 1] += b * .45; return reverb(y, .2)
def card(): x = hp(noise(.12), 1800) * expd(int(.12 * SR), .025); return st(norm(x, .4), rng.uniform(-.4, .4))
def paper(d=.7):
    x = noise(d); e = np.abs(lp(noise(d), 18)) ** 1.5; return st(norm(bp(x, 1500, 7000) * e * env(len(x), .05, .2, .8, d - .4, .15), .35), 0, 1)
def pencil(d=1.4):
    x = noise(d); e = (np.sin(2 * np.pi * 7 * t_(d)) ** 2) * np.abs(lp(noise(d), 30)); return st(norm(bp(x, 2500, 9000) * e, .22))
def marker(d=.6): x = bp(noise(d), 1800, 5000) * (np.sin(2 * np.pi * 9 * t_(d)) ** 2); return st(norm(x * env(len(x), .02, .1, .8, d - .2, .05), .2))
def tick(): return st(norm(hp(noise(.03), 3000) * expd(int(.03 * SR), .004), .4))
def buzz(): tt = t_(.45); y = np.sign(np.sin(2 * np.pi * 110 * tt)) * .5 + np.sign(np.sin(2 * np.pi * 116 * tt)) * .5; return st(norm(lp(y, 1800) * env(len(tt), .01, .05, .9, .3, .05), .4))
def zap(): tt = t_(.35); f = 2400 * np.exp(-tt * 9) + 200; ph = np.cumsum(2 * np.pi * f / SR); return reverb(st(norm(np.sign(np.sin(ph)) * expd(len(tt), .1), .3)), .2)
def sting():
    d = 2.2; tt = t_(d); y = np.zeros(len(tt))
    for f in (73.4, 110, 146.8, 174.6, 220):   # low brass cluster (D minor) + timpani
        saw = 2 * ((f * tt) % 1) - 1; y += lp(saw, 900) * env(len(tt), .01, .4, .5, .8, .9)
    y += np.sin(2 * np.pi * (60 + 40 * np.exp(-tt * 18)) * tt) * np.exp(-tt * 3) * 2.5; return reverb(st(norm(y, .75), 0, 1), .35, 1.3)
def boing(): tt = t_(.6); f = 180 + 120 * np.sin(2 * np.pi * 9 * tt) * np.exp(-tt * 4); ph = np.cumsum(2 * np.pi * f / SR); return st(norm(np.sin(ph) * expd(len(tt), .25), .4))
def drop(): tt = t_(1.0); f = 2200 * np.exp(-tt * 2.2) + 150; ph = np.cumsum(2 * np.pi * f / SR); y = np.sin(ph) * env(len(tt), .02, .2, .8, .6, .1) * .5; return st(norm(y, .3))
def creak(d=1.2):
    tt = t_(d); f = 90 + 40 * np.sin(2 * np.pi * .7 * tt); ph = np.cumsum(2 * np.pi * f / SR); pulse = (np.sin(ph) > .97).astype(float); y = bp(lfilter([1], [1, -.95], pulse), 300, 2500) * env(len(tt), .2, .3, .8, d - .7, .2); return reverb(st(norm(y, .4)), .3)
def cloth(d=.5): x = noise(d); return st(norm(bp(x, 400, 3000) * np.abs(lp(noise(d), 12)) * env(len(x), .05, .2, .6, d - .35, .1), .3))
def sack(): a = thud(90, .4); b = cloth(.4); y = a * .8; y[:len(b)] += b * .7; return norm(y, .6)
def gasp(): x = noise(.5); y = bp(x, 600, 3500) * env(len(x), .08, .1, .6, .15, .15); return reverb(st(norm(y, .3)), .2)
def oink():
    d = .55; tt = t_(d); f = 180 + 60 * np.sin(2 * np.pi * 3 * tt); ph = np.cumsum(2 * np.pi * f / SR); src = np.sign(np.sin(ph)) + .3 * noise(d)
    y = bp(src, 500, 1300) * 1.0 + bp(src, 1800, 2600) * .4; e = env(len(tt), .02, .1, .7, .25, .1) * (1 + .5 * np.sin(2 * np.pi * 14 * tt)); return st(norm(y * e, .5))
def fly(d=3.0):
    tt = t_(d); y = np.zeros(len(tt))
    for i in range(3): f = 190 + 25 * i + 15 * np.sin(2 * np.pi * (1.3 + i) * tt); ph = np.cumsum(2 * np.pi * f / SR); y += np.sign(np.sin(ph)) * (.6 + .4 * np.sin(2 * np.pi * (.4 + .3 * i) * tt))
    pan = .7 * np.sin(2 * np.pi * .5 * tt); y = lp(y, 2500) * env(len(tt), .2, .1, 1, d - .5, .2) * .3; return np.stack([y * np.sqrt((1 - pan) / 2), y * np.sqrt((1 + pan) / 2)], 1)
def dig(): x = bp(noise(.5), 500, 4000) * env(int(.5 * SR), .02, .3, .2, .1, .1); y = st(norm(x, .4)); t2 = thud(120, .25); y[:len(t2)] += t2 * .5; return y
def splash(): x = noise(1.2); y = bp(x, 400, 6000) * env(len(x), .005, .25, .3, .3, .5) + hp(noise(1.2), 2000) * expd(len(x), .4) * .3; return reverb(st(norm(y, .55), 0, 1), .25)
def salthiss(d=2.5):
    y = np.zeros(int(d * SR))
    for i in range(int(d * 600)): o = int(rng.uniform(0, d - .01) * SR); g = hp(noise(.006), 3500) * np.hanning(int(.006 * SR)); y[o:o + len(g)] += g * rng.uniform(.2, 1)
    return st(norm(y * env(len(y), .2, .2, .8, d - .6, .3), .35), 0, 1)
def crunch():
    k = load('Starter-Kit-3D-Platformer/sounds/break.ogg')
    y = np.zeros(int(.6 * SR))
    for i in range(40): o = int(rng.uniform(0, .25) * SR); g = bp(noise(.01), 1500, 8000) * np.hanning(int(.01 * SR)); y[o:o + len(g)] += g * rng.uniform(.3, 1)
    out = st(norm(y, .4))
    if k is not None: out[:min(len(k), len(out))] += k[:len(out)] * .25
    return out
def footsteps(d=3.0, rate=2.0, gravel=True):
    k = load('Starter-Kit-3D-Platformer/sounds/walking.ogg'); n = int(d * SR); out = np.zeros((n, 2))
    if k is not None:
        for i in range(0, n, len(k)): out[i:i + len(k)] += k[:n - i] * .8
        return out
    for i in range(int(d * rate)): o = int(i / rate * SR); s = thud(160, .15) * .5; out[o:o + len(s)] += s[:n - o]
    return out
def march(d=4.0):
    n = int(d * SR); out = np.zeros((n, 2))
    for v in range(14):
        rate = 1.9 + rng.uniform(-.06, .06); ph = rng.uniform(0, .5); pan = rng.uniform(-.8, .8)
        for i in range(int(d * rate)):
            o = int((ph + i / rate) * SR)
            if o >= n: break
            s = lp(noise(.12), 900) * expd(int(.12 * SR), .03) * rng.uniform(.4, 1); s2 = st(s, pan); out[o:o + len(s2)] += s2[:n - o]
    out += st(rumble(d)[:, 0] * .2); return reverb(norm(out * env(n, .4, .1, 1, d - .9, .4)[:, None], .6), .25)
def machine(d=2.0):
    n = int(d * SR); out = np.zeros(n)
    for i in range(int(d * 6)): o = int(i / 6 * SR); c = tone(1400 + 300 * (i % 3), .15, .04, ((1, 1), (2.3, .5))) + bp(noise(.15), 2000, 6000) * expd(int(.15 * SR), .02) * .5; out[o:o + len(c)] += c[:n - o]
    out += lp(noise(d), 200) * .3; return reverb(st(norm(out, .5), 0, 1), .25)
def truck(d=10.0):
    k = load('Starter-Kit-Racing/audio/engine.ogg'); n = int(d * SR)
    if k is not None:
        k2 = np.concatenate([k] * int(np.ceil(n / len(k))))[:n]; idx = np.arange(0, len(k2) * .55, .55); k2 = np.stack([np.interp(idx[:n], np.arange(len(k2)), k2[:, c]) for c in (0, 1)], 1)
        return norm(lp(k2.T, 1200).T * env(n, .5, .1, 1, d - 1.6, 1.0)[:, None], .45)
    tt = t_(d); y = np.sign(np.sin(2 * np.pi * 38 * tt)) * .5 + lp(noise(d), 300); return st(norm(lp(y, 500) * env(n, .5, .1, 1, d - 1.6, 1.0), .45))
def impact():
    k = load('Starter-Kit-Racing/audio/impact.ogg'); return k if k is not None else thud(80, .6)
def sword(): return reverb(st(norm(tone(1800, 1.2, .35, ((1, 1), (2.6, .7), (4.1, .5), (6.3, .3), (8.9, .2))), .5)), .3)
def gallop(d=3.0):
    n = int(d * SR); out = np.zeros((n, 2)); beat = .42
    for i in range(int(d / beat)):
        for j, off in enumerate([0, .07, .16]):
            o = int((i * beat + off) * SR)
            if o >= n: continue
            s = thud(120 + j * 20, .14) * (.9 - j * .15); out[o:o + len(s)] += s[:n - o]
    return norm(out, .55)
def drum(): tt = t_(1.2); y = np.sin(2 * np.pi * (70 + 70 * np.exp(-tt * 20)) * tt) * np.exp(-tt * 4) + lp(noise(1.2), 400) * np.exp(-tt * 18) * .4; return reverb(st(norm(y, .7)), .35, 1.3)
def bell(): return reverb(st(norm(tone(523, 3, 1.2, ((1, 1), (2.0, .6), (2.4, .4), (3.0, .3), (4.2, .2), (5.4, .15))), .45), 0, 1), .45, 1.4)
def typewriter(d=1.2):
    y = np.zeros(int(d * SR))
    for i in range(int(d * 9)): o = int((i / 9 + rng.uniform(0, .03)) * SR); c = hp(noise(.02), 2000) * expd(int(.02 * SR), .004); y[o:o + len(c)] += c[:len(y) - o]
    return st(norm(y, .35))
def cramp(): tt = t_(.5); f = 900 * np.exp(-tt * 5) + 200; ph = np.cumsum(2 * np.pi * f / SR); return st(norm(np.sin(ph) * (1 + .5 * np.sign(np.sin(2 * np.pi * 30 * tt))) * expd(len(tt), .2), .3))
def cheer(d=2.5): c = crowd(d, voices=40, excite=1.8); return c
def fire_one(d=3.0): return amb_fire(d)
# ---------------- crowds + ambience beds ----------------
VOW = [(730, 1090), (530, 1840), (270, 2290), (570, 840), (440, 1020), (300, 870), (660, 1700)]
def crowd(d=4.0, voices=24, excite=1.0, room=.35):
    n = int(d * SR); out = np.zeros((n, 2)); tt = t_(d)
    for v in range(voices):
        f0 = rng.uniform(95, 240) * (1 + .04 * (slow(d, 3) - .5)); ph = np.cumsum(2 * np.pi * f0 / SR); src = (2 * (ph / (2 * np.pi) % 1) - 1) + .1 * noise(d)
        vs = [VOW[i] for i in rng.choice(len(VOW), 3, replace=False)]; ws = [slow(d, 5) for _ in vs]; tot = sum(ws) + 1e-6; y = np.zeros(n)
        for (f1, f2), w in zip(vs, ws): y += (bp(src, f1 * .8, f1 * 1.2) + .5 * bp(src, f2 * .85, f2 * 1.15)) * w / tot
        syl = np.clip(np.sin(2 * np.pi * rng.uniform(3, 5.5) * tt + rng.uniform(0, 6)), 0, 1) ** 1.5 * (slow(d, .8) > .35)
        out += st(y * syl * rng.uniform(.4, 1) * excite, rng.uniform(-.9, .9))
    out = lp(out.T, 3500).T; return reverb(norm(out * env(n, .5, .1, 1, max(0, d - 1.2), .6)[:, None], .45), room, 1.3)
def amb_wind(d):
    x = noise(d); y = bp(x, 150, 400) * slow(d, .4) + bp(x, 300, 800) * slow(d, .5) * .7 + bp(x, 700, 1600) * slow(d, .6) * .3
    return st(norm(y * env(len(x), 1, .1, 1, d - 2.2, 1.1), .5), 0, 1)
def amb_rain(d): x = st(lp(hp(noise(d), 800), 9000) * .5, 0, 1); x[:, 1] = lp(hp(noise(d), 800), 9000) * .5; return norm(x * env(len(x), 1, .1, 1, d - 2.2, 1.1)[:, None], .45)
def amb_fire(d):
    n = int(d * SR); y = lp(noise(d), 500) * .4
    for i in range(int(d * 40)): o = int(rng.uniform(0, d - .02) * SR); c = hp(noise(.008), 1500) * np.hanning(int(.008 * SR)) * rng.uniform(.3, 1.4); y[o:o + len(c)] += c
    return st(norm(y * env(n, .6, .1, 1, d - 1.4, .7), .45), 0, 1)
def amb_crowd(d): return crowd(d, 30, .8)
def amb_sea(d):
    tt = t_(d); w = (np.sin(2 * np.pi * tt / 7) + 1) / 2 * .8 + .2; y = lp(noise(d), 900) * w + hp(noise(d), 3000) * w ** 3 * .3; return st(norm(y * env(len(tt), 1, .1, 1, d - 2.2, 1.1), .45), 0, 1)
def amb_lake(d): return amb_sea(d) * .5
def amb_birds(d):
    k = load('Starter-Kit-City-Builder/sounds/ambience.ogg'); n = int(d * SR)
    if k is not None: k2 = np.concatenate([k] * int(np.ceil(n / len(k))))[:n]; return norm(k2 * env(n, 1, .1, 1, d - 2.2, 1.1)[:, None], .45)
    y = np.zeros(n)
    for i in range(int(d * 3)): o = int(rng.uniform(0, d - .3) * SR); tt = t_(.25); f = rng.uniform(2500, 4500) + 900 * np.sin(2 * np.pi * rng.uniform(8, 20) * tt); ph = np.cumsum(2 * np.pi * f / SR); s = np.sin(ph) * np.hanning(len(tt)) * .4; y[o:o + len(s)] += s
    return reverb(st(y, 0, 1), .3)
def amb_night(d):
    n = int(d * SR); tt = t_(d); y = np.zeros(n)
    for c in range(4): f = rng.uniform(3800, 5200); g = (np.sin(2 * np.pi * rng.uniform(14, 22) * tt) > .3) * (np.sin(2 * np.pi * rng.uniform(.4, .9) * tt + c) > 0); y += np.sin(2 * np.pi * f * tt) * g * .15
    return st(norm(y + lp(noise(d), 300) * .1, .3) * env(n, 1, .1, 1, d - 2.2, 1.1), 0, 1)
def amb_cave(d):
    n = int(d * SR); y = lp(noise(d), 150) * .4
    for i in range(int(d * 1.2)): o = int(rng.uniform(0, d - .5) * SR); s = tone(rng.uniform(900, 1600), .4, .06, ((1, 1), (2.1, .3))) * .5; y[o:o + len(s)] += s
    return reverb(st(norm(y * env(n, 1, .1, 1, d - 2.2, 1.1), .35), 0, 1), .5, 1.5)
def amb_court(d): x = st(lp(noise(d), 400) * .15, 0, 1); c = crowd(d, 8, .35, .5); return norm(x + c * .5, .3)
def amb_kitchen(d):
    n = int(d * SR); tt = t_(d); y = np.sin(2 * np.pi * 60 * tt) * .05 + np.sin(2 * np.pi * 120 * tt) * .03 + lp(noise(d), 300) * .05
    for i in range(int(d)): o = int(i * SR); c = hp(noise(.02), 2500) * expd(int(.02 * SR), .003) * .25; y[o:o + len(c)] += c[:n - o]
    return st(norm(y, .2) * env(n, .5, .1, 1, d - 1.2, .6), 0, 1)
def amb_factory(d): return norm(machine(d) * .6 + st(lp(noise(d), 200) * .3, 0, 1), .45)
def amb_street(d): return norm(crowd(d, 14, .5) + footsteps(d) * .3, .4)
def amb_battle(d): b = crowd(d, 36, 1.4, .4); return norm(b + march(d) * .5, .55)

ONE = dict(whoosh=whoosh, swish=swish, whip=whip, pop=pop, ding=ding, chime=chime, sparkle=sparkle, tada=tada, gong=gong, thud=thud, boom=boom, stamp=stamp, rumble=rumble, clink=clink, coins=coins, cash=cash, card=card,
           paper=paper, pencil=pencil, marker=marker, tick=tick, buzz=buzz, zap=zap, sting=sting, boing=boing, drop=drop, creak=creak, cloth=cloth, sack=sack, gasp=gasp, oink=oink, fly=fly, dig=dig, splash=splash,
           salthiss=salthiss, crunch=crunch, footsteps=footsteps, march=march, machine=machine, truck=truck, impact=impact, sword=sword, gallop=gallop, drum=drum, bell=bell, typewriter=typewriter, cramp=cramp,
           cheer=cheer, crowd=crowd, fire=fire_one)
VAR = {'pencil', 'paper', 'fly', 'salthiss', 'footsteps', 'march', 'machine', 'truck', 'gallop', 'typewriter', 'crowd', 'cheer', 'fire', 'rumble'}
def make(name, dur=None):
    if name.startswith('amb_'): return globals()[name](max(2.5, dur or 8))
    f = ONE.get(name)
    if f is None: raise KeyError(name)
    return f(dur) if (dur and name in VAR) else f()
if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True); import soundfile as sf
    for k in ONE: sf.write(os.path.join(out, k + '.wav'), make(k).astype(np.float32), SR); print(k)
