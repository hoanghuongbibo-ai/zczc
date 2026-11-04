#!/usr/bin/env python3
"""Pompeii — score cue sheet + final mix (instruments and the real-track looper from pw_mix.py).

usage: python3 tools/pom_mix.py <rendered.mp4> <out.mp4> [--stem music.wav]

Follows the script's [MUSIC] notes: a record scratch into silence; plucky strings for the town; drums for the siege and the riot,
then music OUT on "people died"; tension building for Pliny; a single low, sombre bed for the eruption (no stings), silence when the
town is buried; a slow quiet theme for the squatters, humour back after; respectful quiet for the casts; brass/newsreel energy for 1943;
warm and reflective for the close, playful under the final CTA. Intense and gentle alternate; no cue runs much past ~90 s unchanged.
"""
import os, sys, subprocess
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pw_mix as P

SR = P.SR
ROOT = P.ROOT
JAUD = os.path.join(ROOT, 'pompeii', 'assets', 'audio')
P.AUD = os.path.join(ROOT, 'pigwar', 'assets', 'audio')  # the user's music tracks live with the Pig War assets

# (start, end, kind, gain) — times from the aligned narration
CUES = [
    (0.0, 22.4, 'curious', .6), (23.4, 34.0, 'playful', .65),                    # the bored plasterer; record scratch → silence → the news
    (34.0, 43.0, 'epic', .7), (45.0, 63.5, 'suspense', .65), (63.5, 73.4, 'dramatic', .65),   # the myth (BOOM) → rewound; buried five times
    (73.4, 88.2, 'dramatic', .6), (88.6, 93.3, 'playful', .6),                   # the soap-opera CTA
    (93.4, 138.0, 'playful', .65), (138.0, 152.8, 'march', .6), (152.8, 165.4, 'dramatic', .65), (165.4, 170.0, 'playful', .6),
    (170.0, 181.0, 'dramatic', .65), (181.0, 196.6, 'drums', .6), (196.6, 209.2, 'march', .6), (209.2, 222.6, 'playful', .6), (222.6, 255.6, 'curious', .6),
    (255.6, 287.6, 'playful', .6), (287.6, 335.0, 'curious', .6), (335.0, 354.9, 'drums', .6),
    # 355–370: music out (people died)
    (370.0, 392.0, 'curious', .55), (392.0, 410.6, 'dramatic', .65), (410.6, 434.4, 'playful', .6), (434.4, 460.3, 'playful', .55),
    (460.4, 473.7, 'playful', .55), (473.7, 532.0, 'suspense', .6), (532.0, 548.8, 'playful', .55), (548.8, 566.6, 'dramatic', .65), (566.6, 588.0, 'curious', .5),
    (589.0, 650.0, 'somber', .5), (650.0, 726.4, 'somber', .55),                  # TONE SHIFT: one low, quiet bed — no stings
    # 726–735: silence (buried under 20 feet)
    (735.0, 803.7, 'reflective', .5), (803.7, 823.0, 'playful', .55),            # the squatters (gentle) → humour returns
    (823.0, 873.0, 'curious', .55), (873.0, 893.2, 'playful', .55), (893.2, 921.6, 'warm', .6),
    (921.6, 939.0, 'curious', .55), (939.0, 1034.8, 'somber', .42), (1034.8, 1046.2, 'reflective', .5),   # the casts: soft, respectful
    (1046.2, 1063.2, 'march', .65), (1063.2, 1094.6, 'epic', .6), (1100.0, 1117.4, 'dramatic', .6), (1117.4, 1128.0, 'march', .5),
    (1128.0, 1145.3, 'suspense', .55), (1145.3, 1164.7, 'curious', .55), (1164.7, 1189.8, 'playful', .55),
    (1189.8, 1224.4, 'playful', .55), (1224.4, 1249.6, 'curious', .55),
    (1249.6, 1276.9, 'curious', .5), (1276.9, 1328.2, 'suspense', .5), (1328.2, 1355.8, 'reflective', .55), (1355.8, 1375.9, 'warm', .65),
    (1375.9, 1411.5, 'playful', .6),
]
INTENSE = {'epic': 1.25, 'drums': 1.25, 'dramatic': 1.15, 'march': 1.15, 'suspense': 1.05}
GENTLE = {'dawn': .75, 'reflective': .75, 'somber': .8, 'pastoral': .75, 'warm': .85, 'curious': .85, 'playful': .9}
CUES[:] = [(a, b, k, g * INTENSE.get(k, GENTLE.get(k, 1))) for a, b, k, g in CUES]
AMBS = [(1063.0, 1094.0, 'amb-battle.mp3', 4.0, .35), (181.0, 196.0, 'amb-battle.mp3', 20.0, .3), (335.0, 355.0, 'amb-battle.mp3', 40.0, .25)]

HITS = []

def build(total):
    P.CUES[:] = CUES; P.AMBS[:] = []
    M = P.build_music(total, [])
    for (t0, t1, f, off, g) in AMBS:
        y = P.load(os.path.join(P.AUD, f), off, t1 - t0); t = np.arange(len(y)) / SR; y = y * np.minimum(1, t / 1.2) * np.minimum(1, (len(y) / SR - t) / 1.2); P.place(M, y * g, t0)
    # hard hits with no fade-in (the CTA broadside)
    for (t0, f, g) in HITS:
        y = P.load(os.path.join(P.AUD, f), 0, 3.0); n = len(y); y = y * np.minimum(1, (n / SR - np.arange(n) / SR) / 1.5); P.place(M, y * g, t0)
    return M

def main():
    src, out = sys.argv[1], sys.argv[2]
    total = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout)
    print('decoding…'); film = P.load(src); narr = P.load(os.path.join(JAUD, 'narration-full.mp3'))
    print('composing…'); M = build(total)
    hop = 441; e = np.array([P.rms(narr[i:i + hop]) for i in range(0, len(narr), hop)]); act = np.clip((20 * np.log10(e + 1e-9) + 42) / 12, 0, 1)
    sm = np.zeros_like(act); v = 0
    for i, a in enumerate(act): v = v + (a - v) * (.5 if a > v else .04); sm[i] = v
    gain = 1 - .7 * np.repeat(sm, hop)[:len(M)]; gain = np.pad(gain, (0, max(0, len(M) - len(gain))), constant_values=1); M = M * gain
    n = min(len(film), len(M)); mix = film[:n] + M[:n]; print('peak', np.max(np.abs(mix)))
    wav = out + '.mix.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', wav], input=mix.astype(np.float32).tobytes(), check=True)
    if '--stem' in sys.argv: subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', sys.argv[sys.argv.index('--stem') + 1]], input=M.astype(np.float32).tobytes(), check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-af', P.loud_af(wav), '-c:a', 'aac', '-b:a', '192k', out], check=True)
    os.remove(wav); print('wrote', out)

if __name__ == '__main__':
    main()
