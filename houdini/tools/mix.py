#!/usr/bin/env python3
"""Stereo mix for an episode: narration + music bed (ducked under the voice) + foley cues + ambience beds → master.

usage: python3 tools/mix.py NARR.mp3 MUSIC.raw CUES.json DURATION OUT.wav
  MUSIC.raw  the page's soundtrack (s16le mono 44.1 kHz, as written by tools/export-par.mjs into .parts/music.raw)
  CUES.json  [{t, type, gain, dur}]  — type = a foley name (tools/foley.py) or 'amb_<bed>'
Levels (before mastering): voice 0 dB; music −14 dB, ducked a further −7 dB while the voice talks; one-shots −10 dB,
−3 dB more under the voice; ambience −22 dB. Master: loudness-normalised to −14 LUFS / −1.5 dBTP (ffmpeg loudnorm).
"""
import sys, os, json, subprocess, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import foley
from foley import SR
narr, music, cues_p, dur, out = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), sys.argv[5]
N = int(dur * SR)
def ff_read(path, args_in=()):
    raw = subprocess.run(['ffmpeg', '-v', 'error', *args_in, '-i', path, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    y = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).astype(np.float64); return np.pad(y, ((0, max(0, N - len(y))), (0, 0)))[:N]
voice = ff_read(narr)
mus = ff_read(music, ['-f', 's16le', '-ar', '44100', '-ac', '1'])
d = int(.013 * SR); mus[:, 1] = np.concatenate([np.zeros(d), mus[:-d, 1]]) * .85 + mus[:, 1] * .15   # widen the mono score a little
# voice envelope → ducking gain
v = np.abs(voice).mean(1); win = int(.05 * SR); rms = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, 'same')); thr = np.percentile(rms[rms > 1e-4], 40) if np.any(rms > 1e-4) else 1
act = np.clip(rms / thr, 0, 1); sm = np.zeros(N); a_att, a_rel = 1 - np.exp(-1 / (.08 * SR)), 1 - np.exp(-1 / (.6 * SR))
step = 240; cur = 0.
for i in range(0, N, step): tgt = act[i]; cur += (tgt - cur) * (1 - (1 - (a_att if tgt > cur else a_rel)) ** step); sm[i:i + step] = cur
db = lambda x: 10 ** (x / 20)
mix = voice.copy()
mix += mus * (db(-14) * (1 - sm * (1 - db(-7))))[:, None] / max(1e-6, np.max(np.abs(mus))) * .9
cues = json.load(open(cues_p)); cache = {}; rng = np.random.default_rng(3); fx = np.zeros((N, 2)); amb = np.zeros((N, 2))
for c in cues:
    t0 = int(c['t'] * SR)
    if t0 >= N or t0 < 0: continue
    typ, g = c['type'], c.get('gain', 1) or 1; dd = c.get('dur')
    key = (typ, round(dd or 0, 1), len([k for k in cache if k[0] == typ]) % 3)
    if key not in cache:
        try: cache[key] = foley.make(typ, dd)
        except KeyError: print('unknown sfx', typ); continue
    s = cache[key]; s = s[:N - t0]; pan = rng.uniform(-.25, .25)
    if typ.startswith('amb_'): amb[t0:t0 + len(s)] += s * g * db(-22) / max(1e-6, np.max(np.abs(s))) * .9
    else:
        s2 = s.copy(); s2[:, 0] *= np.sqrt(1 - pan); s2[:, 1] *= np.sqrt(1 + pan); fx[t0:t0 + len(s)] += s2 * g * db(-10) / max(1e-6, np.max(np.abs(s)))
mix += fx * (1 - sm * (1 - db(-3)))[:, None] + amb * (1 - sm * (1 - db(-4)))[:, None]
pk = np.max(np.abs(mix)); mix = mix / pk * .95 if pk > .95 else mix
tmp = out + '.pre.wav'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', tmp], input=mix.astype(np.float32).tobytes(), check=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af', f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true", '-ar', str(SR), out], check=True)
os.remove(tmp); print('mixed', out, 'cues', len(cues), 'input LUFS', j['input_i'])
