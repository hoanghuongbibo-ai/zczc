#!/usr/bin/env python3
"""The Pig War — scene-matched score and final mix.

usage: python3 tools/pw_mix.py <rendered.mp4> <out.mp4> [--stem music.wav]

The rendered film already carries narration + foley + ambience (the old synth score is switched off). This adds:
  * real music from pigwar/assets/audio (epic, war drums, dramatic) where the scene is big, looped seamlessly with crossfades
  * newly composed cues for everything else, synthesised here with a small orchestra (harp, pizzicato, piano, strings, glockenspiel,
    flute, brass, snare, timpani) through a hall reverb: pastoral, playful, curious, march, reflective, warm
  * real ambience beds (dawn birdsong, meadow bees, a distant battle) and the real gunshot
Music ducks under the narration (measured from the narration track itself) and swells in the gaps.
"""
import subprocess, sys, json, os
import numpy as np

SR = 44100
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUD = os.path.join(ROOT, 'pigwar', 'assets', 'audio')

def load(path, start=0.0, dur=None):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(start)] + (['-t', str(dur)] if dur else []) + ['-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(np.float64)

def midi(n): return 440.0 * 2 ** ((n - 69) / 12)
def rms(x): return float(np.sqrt(np.mean(x ** 2) + 1e-12))
def onepole_lp(x, a):  # simple smoothing low-pass, vectorised enough via cumulative trick for small a? keep loop-free with np.convolve kernel
    k = int(max(1, a)); return np.convolve(x, np.ones(k) / k, mode='same')

# ---------------------------------------------------------------- instruments (all vectorised additive synthesis)
RNG = np.random.default_rng(7)
def env_adsr(n, a, d, s, r, sus_len):
    t = np.arange(n) / SR; e = np.zeros(n)
    e = np.where(t < a, t / max(a, 1e-4), e)
    m = (t >= a) & (t < a + d); e[m] = 1 - (1 - s) * (t[m] - a) / max(d, 1e-4)
    m = (t >= a + d) & (t < sus_len); e[m] = s
    m = t >= sus_len; e[m] = s * np.exp(-(t[m] - sus_len) / max(r, 1e-4))
    return e

def harp(f, dur=2.5, vel=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for h, amp in [(1, 1), (2, .45), (3, .25), (4, .12), (5, .06)]:
        if f * h > 12000: break
        y += amp * np.sin(2 * np.pi * f * h * t) * np.exp(-t * (1.2 + h * 1.1))
    return vel * y * np.minimum(1, t * 300)

def pizz(f, dur=.6, vel=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for h, amp in [(1, 1), (2, .6), (3, .35), (4, .2), (6, .08)]:
        y += amp * np.sin(2 * np.pi * f * h * t + h) * np.exp(-t * (7 + h * 3))
    return vel * y * np.minimum(1, t * 500)

def piano(f, dur=3.0, vel=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; y = np.zeros(n); B = .0004
    for h in range(1, 8):
        fh = f * h * np.sqrt(1 + B * h * h)
        if fh > 14000: break
        y += (1 / h ** 1.1) * np.sin(2 * np.pi * fh * t) * np.exp(-t * (.7 + h * .55))
    y += .02 * RNG.standard_normal(n) * np.exp(-t * 60)
    return vel * y * np.minimum(1, t * 600)

def glock(f, dur=1.6, vel=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    y = np.sin(2 * np.pi * f * t) * np.exp(-t * 2.2) + .4 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6) + .2 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 12)
    return vel * y * np.minimum(1, t * 900)

def strings(f, dur, vel=1.0, att=.6, rel=.8):
    n = int((dur + rel) * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for det in (-.0035, 0, .004):
        vib = 1 + .0045 * np.sin(2 * np.pi * 5.2 * t + det * 900)
        ph = 2 * np.pi * np.cumsum(f * (1 + det) * vib) / SR
        for h in range(1, 9):
            if f * h > 9000: break
            y += (1 / h ** 1.6) * np.sin(h * ph)
    e = env_adsr(n, att, .3, .85, rel / 3, dur)
    return vel * .3 * y * e

def flute(f, dur, vel=1.0):
    n = int((dur + .3) * SR); t = np.arange(n) / SR
    vib = 1 + .006 * np.sin(2 * np.pi * 5 * t) * np.minimum(1, t * 2)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    y = np.sin(ph) + .12 * np.sin(2 * ph) + .05 * np.sin(3 * ph)
    breath = onepole_lp(RNG.standard_normal(n), 3) * .05
    return vel * (y + breath) * env_adsr(n, .08, .1, .8, .1, dur)

def brass(f, dur, vel=1.0):
    n = int((dur + .25) * SR); t = np.arange(n) / SR; y = np.zeros(n)
    bright = np.minimum(1, t * 6)
    for h in range(1, 12):
        if f * h > 8000: break
        y += (1 / h) * np.sin(2 * np.pi * f * h * t) * (bright if h > 3 else 1)
    return vel * .35 * y * env_adsr(n, .05, .15, .75, .12, dur)

def snare(vel=1.0, dur=.25):
    n = int(dur * SR); t = np.arange(n) / SR; w = RNG.standard_normal(n)
    w = onepole_lp(w, 3); w = w - onepole_lp(w, 14)  # band-limited rattle (~1.5–7 kHz), not a full-band hiss
    return vel * (.7 * w * np.exp(-t * 32) + .45 * np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30))

def timp(f=55, vel=1.0, dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR
    return vel * (np.sin(2 * np.pi * f * t * (1 + .06 * np.exp(-t * 10))) * np.exp(-t * 2.4) + .2 * onepole_lp(RNG.standard_normal(n), 8) * np.exp(-t * 25))

def block(vel=1.0):
    n = int(.08 * SR); t = np.arange(n) / SR
    return vel * np.sin(2 * np.pi * 1400 * t) * np.exp(-t * 70)

def place(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i >= len(buf) or i + len(sig) <= 0: return
    a, b = max(0, i), min(len(buf), i + len(sig)); buf[a:b] += gain * sig[a - i:b - i]

def reverb(x, secs=2.4, mix=.28):
    n = int(secs * SR); t = np.arange(n) / SR
    ir = RNG.standard_normal(n) * np.exp(-t * 6.9 / secs); ir = onepole_lp(ir, 6); ir[:int(.012 * SR)] = 0; ir /= np.sqrt(np.sum(ir ** 2))
    L = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, L) * np.fft.rfft(ir, L), L)[:len(x)]
    return x * (1 - mix) + wet * mix * 1.4

# ---------------------------------------------------------------- composed cues
CH = {  # chord tables (midi roots + triads)
    'G': [55, 59, 62], 'D': [50, 54, 57], 'Em': [52, 55, 59], 'C': [48, 52, 55], 'Am': [57, 60, 64], 'F': [53, 57, 60], 'Bb': [58, 62, 65],
    'Dm': [50, 53, 57], 'Gm': [55, 58, 62], 'A': [57, 61, 64], 'Eb': [51, 55, 58], 'E': [52, 56, 59], 'Fm': [53, 56, 60], 'Bdim': [59, 62, 65],
}
def cue_pastoral(dur, seed, bright=1.0):
    bpm = 74; beat = 60 / bpm; prog = ['G', 'D', 'Em', 'C'] if seed % 2 == 0 else ['C', 'G', 'Am', 'F']; out = np.zeros(int((dur + 4) * SR))
    tune = [7, 9, 11, 9, 7, 4, 2, 4, 7, 11, 14, 12, 11, 9, 7, 7]
    bar = 0; t = 0.0
    while t < dur:
        ch = CH[prog[bar % 4]]
        for k in range(8):  # harp arpeggio in eighths over two octaves
            n = [ch[0], ch[1], ch[2], ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 12, ch[2]][k]
            place(out, harp(midi(n), 2.2, .32 * bright), t + k * beat / 2)
        place(out, strings(midi(ch[0] - 12), beat * 4, .5), t)
        place(out, strings(midi(ch[1]), beat * 4, .22), t)
        if bar % 8 >= 4 and bright > .6:  # a simple flute tune every other phrase
            for q in range(4): place(out, flute(midi(67 + tune[(bar % 4) * 4 + q] - 7 + (0 if prog[0] == 'G' else 5)), beat * .9, .16), t + q * beat)
        bar += 1; t += 4 * beat
    return out

def cue_playful(dur, seed):
    bpm = 112; beat = 60 / bpm; prog = ['F', 'Bb', 'C', 'F', 'Dm', 'Gm', 'C', 'C'] if seed % 2 == 0 else ['Bb', 'Eb', 'F', 'Bb', 'Gm', 'Eb', 'F', 'F']; out = np.zeros(int((dur + 3) * SR))
    motif = [0, 4, 7, 12, None, 7, 9, 7, 5, 4, None, 2, 0, None, None, None]; bar = 0; t = 0.0
    while t < dur:
        ch = CH[prog[bar % len(prog)]]
        for q in range(4):
            place(out, pizz(midi(ch[0] - 12 + (7 if q % 2 else 0)), .5, .9), t + q * beat)  # oom
            place(out, pizz(midi(ch[1]), .35, .35), t + q * beat + beat / 2); place(out, pizz(midi(ch[2]), .35, .3), t + q * beat + beat / 2)  # pah
        if bar % 2 == 1 or bar % 8 >= 4:
            for i in range(8):
                m = motif[(bar % 2) * 8 + i]
                if m is not None: place(out, glock(midi(ch[0] + 24 + m), 1.0, .2), t + i * beat / 2)
        if bar % 4 == 3: place(out, block(.25), t + 3.5 * beat); place(out, block(.2), t + 3.75 * beat)
        bar += 1; t += 4 * beat
    return out

def cue_curious(dur, seed):
    bpm = 88; beat = 60 / bpm; prog = ['Dm', 'Bb', 'Gm', 'A']; out = np.zeros(int((dur + 3) * SR)); bar = 0; t = 0.0
    while t < dur:
        ch = CH[prog[bar % 4]]
        for q in range(4): place(out, pizz(midi(ch[0] - 12 - [0, 2, 3, 5][q] * (bar % 2)), .55, .8), t + q * beat)  # walking pizz bass
        place(out, strings(midi(ch[2]), beat * 4, .16), t)
        for i, m in enumerate([0, 3, 7, 3, 12, 10, 7, 5][: (8 if bar % 2 else 4)]):
            place(out, glock(midi(ch[0] + 24 + m), 1.2, .14), t + i * beat / 2 + beat * 2 * (1 - bar % 2))
        bar += 1; t += 4 * beat
    return out

def cue_march(dur, seed, weight=1.0):
    bpm = 104; beat = 60 / bpm; prog = ['Bb', 'F', 'Gm', 'F'] if seed % 2 == 0 else ['Dm', 'A', 'Dm', 'A']; out = np.zeros(int((dur + 3) * SR)); bar = 0; t = 0.0
    fan = [0, 0, 7, 7, 12, 7, 4, 0]
    while t < dur:
        ch = CH[prog[bar % 4]]
        for q in range(4):
            place(out, timp(midi(ch[0] - 24), .5 * weight if q % 2 == 0 else .25 * weight), t + q * beat)
            place(out, snare(.18), t + q * beat + beat / 2)
            if q == 3: [place(out, snare(.12), t + q * beat + beat * (.5 + j / 6)) for j in range(3)]
        place(out, strings(midi(ch[0] - 12), beat * 4, .4), t); place(out, strings(midi(ch[2]), beat * 4, .15), t)
        if bar % 4 in (0, 2):
            for i, m in enumerate(fan): place(out, brass(midi(ch[0] + m - 12), beat * .45, .16 * weight), t + i * beat / 2)
        bar += 1; t += 4 * beat
    return out

def cue_reflective(dur, seed, dark=False):
    bpm = 62; beat = 60 / bpm; prog = (['Am', 'F', 'C', 'G'] if not dark else ['Dm', 'Bb', 'Gm', 'A']) if seed % 2 == 0 else ['C', 'Am', 'F', 'G']; out = np.zeros(int((dur + 5) * SR)); bar = 0; t = 0.0
    mel = [4, 2, 0, 2, 4, 4, 4, None, 2, 2, 2, None, 4, 7, 7, None]
    while t < dur:
        ch = CH[prog[bar % 4]]
        place(out, piano(midi(ch[0] - 12), 4, .45), t)
        for i, n in enumerate([ch[1], ch[2], ch[0] + 12, ch[2]]): place(out, piano(midi(n), 3, .22), t + (i + .5) * beat)
        place(out, strings(midi(ch[0]), beat * 4, .2, att=1.2), t); place(out, strings(midi(ch[0] - 12), beat * 4, .25, att=1.2), t)
        if bar >= 2:
            for q in range(4):
                m = mel[(bar % 4) * 4 + q]
                if m is not None: place(out, piano(midi(72 + m - (0 if prog[0] in ('Am', 'C') else 2)), 2.5, .2), t + q * beat)
        bar += 1; t += 4 * beat
    return out

def cue_warm(dur, seed):
    bpm = 70; beat = 60 / bpm; prog = ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'C']; out = np.zeros(int((dur + 5) * SR)); bar = 0; t = 0.0
    while t < dur:
        ch = CH[prog[bar % len(prog)]]; sw = min(1, .5 + bar * .12)
        place(out, strings(midi(ch[0] - 12), beat * 4, .45 * sw, att=.9), t); place(out, strings(midi(ch[1]), beat * 4, .25 * sw, att=.9), t); place(out, strings(midi(ch[2] + 12), beat * 4, .12 * sw, att=1.2), t)
        for k in range(8): place(out, harp(midi([ch[0], ch[1], ch[2], ch[0] + 12][k % 4] + 12 * (k // 4)), 2.2, .2), t + k * beat / 2)
        if bar % 4 == 0: place(out, timp(midi(ch[0] - 24), .25), t)
        if bar >= 4: place(out, brass(midi(ch[2]), beat * 3.5, .07 * sw), t)
        bar += 1; t += 4 * beat
    return out

COMPOSED = {'pastoral': cue_pastoral, 'playful': cue_playful, 'curious': cue_curious, 'march': cue_march, 'reflective': cue_reflective, 'warm': cue_warm,
            'somber': lambda d, s: cue_reflective(d, 0, dark=True), 'dawn': lambda d, s: cue_pastoral(d, 0, bright=.55)}

# ---------------------------------------------------------------- real tracks, extended by crossfaded loops
REAL = {  # file, loop start, loop end (seconds), intro start
    'epic': ('music-epic.mp3', 0.6, 32.4, 0.0),
    'drums': ('music-drums.mp3', 1.0, 38.8, 0.0),
    'dramatic': ('music-dramatic.mp3', 13.0, 25.8, 0.0),
    'suspense': ('music-dramatic.mp3', 0.2, 12.4, 0.0),
}
_cache = {}
def real(kind, dur):
    f, a, b, s0 = REAL[kind]
    if f not in _cache: _cache[f] = load(os.path.join(AUD, f))
    x = _cache[f]; xf = int(2.5 * SR); N = int(dur * SR); out = np.zeros(N + len(x))
    seg = x[int(s0 * SR):int(b * SR)].copy(); loop = x[int(a * SR):int(b * SR)]; pos = 0
    while pos < N:
        s = seg.copy()
        if pos > 0: s[:xf] *= np.linspace(0, 1, xf)          # fade in over the tail of the previous pass
        s[-xf:] *= np.linspace(1, 0, xf)                      # fade out into the next pass
        out[pos:pos + len(s)] += s; pos += len(s) - xf; seg = loop
    return out[:N]

# ---------------------------------------------------------------- the cue sheet (seconds; from the narration timing)
CUES = [
    (0.0, 24.0, 'dawn', .8), (24.0, 57.7, 'dramatic_full', .9), (57.7, 72.9, 'curious', .8),
    (72.9, 121.0, 'playful', .8), (121.0, 148.9, 'curious', .85),
    (148.9, 180.0, 'reflective', .75), (180.0, 200.5, 'pastoral', .85), (200.5, 228.0, 'playful', .8), (228.0, 245.4, 'pastoral', .85),
    (245.4, 272.6, 'playful', .8), (276.0, 312.0, 'playful', .75), (312.0, 340.3, 'curious', .8), (340.3, 352.4, 'suspense', .6),
    (352.4, 379.4, 'march_dark', .75), (379.4, 395.8, 'somber', .8), (395.8, 404.6, 'march_dark', .8),
    (404.6, 466.0, 'drums', .65), (466.0, 541.6, 'epic', .72),
    (541.6, 557.4, 'playful', .8), (557.4, 582.3, 'curious', .8), (582.3, 598.3, 'suspense', .6), (598.3, 650.3, 'warm', .8),
    (650.3, 666.0, 'playful', .8), (666.0, 690.4, 'march', .7), (690.4, 713.8, 'playful', .8),
    (713.8, 752.5, 'pastoral', .85), (752.5, 769.8, 'somber', .85), (769.8, 787.2, 'suspense', .6), (787.2, 821.5, 'drums', .68),
    (821.5, 830.7, 'somber', .8), (830.7, 868.0, 'curious', .8), (868.0, 891.5, 'warm', .8), (891.5, 937.4, 'reflective', .8),
    (937.4, 958.0, 'warm', .85), (958.0, 977.8, 'playful', .75), (977.8, 990.0, 'pastoral', .9), (990.0, 997.2, 'dawn', .8),
    (998.5, 1004.4, 'warm', .8), (1004.4, 1022.5, 'playful', .85),
]
AMBS = [(0.0, 22.0, 'amb-birds.mp3', 2.0, .22), (188.0, 228.0, 'amb-bees.mp3', 8.0, .3), (714.0, 745.0, 'amb-bees.mp3', 60.0, .25), (795.0, 816.0, 'amb-battle.mp3', 0.0, .55), (988.0, 997.0, 'amb-birds.mp3', 40.0, .18)]

def build_music(total, shots):
    M = np.zeros(int(total * SR) + SR)
    for i, (t0, t1, kind, g) in enumerate(CUES):
        dur = t1 - t0 + 1.6
        if kind in REAL: y = real(kind, dur); y = y / (rms(y[:int(min(dur, 20) * SR)]) + 1e-9) * .075
        elif kind == 'dramatic_full': y = real('suspense', min(12.2, dur)); y2 = real('dramatic', max(1, dur - 11.0)); z = np.zeros(int(dur * SR)); place(z, y / (rms(y) + 1e-9) * .05, 0); place(z, y2 / (rms(y2) + 1e-9) * .09, 11.0); y = z
        else:
            base = kind.replace('_dark', ''); y = COMPOSED[base](dur, i) if base in COMPOSED else cue_curious(dur, i)
            if kind == 'march_dark': y = cue_march(dur, 1, weight=.8)
            y = reverb(y[:int((dur + 2) * SR)]); y = y / (rms(y[:int(dur * SR)]) + 1e-9) * .062
        n = int(dur * SR); y = y[:n]; t = np.arange(len(y)) / SR
        fade = np.minimum(1, t / 1.2) * np.minimum(1, (len(y) / SR - t) / 1.6)
        place(M, y * fade * g, t0)
    for (t0, t1, f, off, g) in AMBS:
        y = load(os.path.join(AUD, f), off, t1 - t0); t = np.arange(len(y)) / SR; y = y * np.minimum(1, t / 1.5) * np.minimum(1, (len(y) / SR - t) / 1.5)
        place(M, y * g, t0)
    return M

def main():
    src, out = sys.argv[1], sys.argv[2]
    shots = json.loads(os.environ.get('PW_SHOTS', '[36.9, 273.87, 997.3]'))
    total = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout)
    print('decoding film audio + narration…'); film = load(src); narr = load(os.path.join(AUD, 'narration-full.mp3'))
    print('composing score…'); M = build_music(total, shots)
    # ducking: narration envelope (fast attack, slow release) → music gain 1 in gaps, ~0.42 under speech
    hop = 441; e = np.array([rms(narr[i:i + hop]) for i in range(0, len(narr), hop)]); act = np.clip((20 * np.log10(e + 1e-9) + 42) / 12, 0, 1)
    sm = np.zeros_like(act); v = 0
    for i, a in enumerate(act): v = v + (a - v) * (.5 if a > v else .04); sm[i] = v
    gain = 1 - .58 * np.repeat(sm, hop)[:len(M)]; gain = np.pad(gain, (0, max(0, len(M) - len(gain))), constant_values=1)
    M = M * gain
    # the real gunshot, placed on its onset
    gs = load(os.path.join(AUD, 'sfx-gunshot.mp3')); on = int(np.argmax(np.abs(gs) > .2 * np.max(np.abs(gs)))); gs = gs[max(0, on - 200):]
    for s in shots: place(M, gs / np.max(np.abs(gs)) * .6, s)
    n = min(len(film), len(M)); mix = film[:n] + M[:n]
    pk = np.max(np.abs(mix)); print('peak before limit', pk)
    wav = out + '.mix.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', wav], input=mix.astype(np.float32).tobytes(), check=True)
    if '--stem' in sys.argv:
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', sys.argv[sys.argv.index('--stem') + 1]], input=M.astype(np.float32).tobytes(), check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-af', 'alimiter=limit=0.79:level=false', '-c:a', 'aac', '-b:a', '192k', out], check=True)
    os.remove(wav); print('wrote', out)

if __name__ == '__main__':
    main()
