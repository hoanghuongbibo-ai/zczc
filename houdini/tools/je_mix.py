#!/usr/bin/env python3
"""The War of Jenkins' Ear — score cue sheet + final mix (uses the instruments and the real-track looper from pw_mix.py).

usage: python3 tools/je_mix.py <rendered.mp4> <out.mp4> [--stem music.wav]

The cue sheet follows the script's own [MUSIC] notes: low strings and creaks under the cold open, the room going silent at the ear, the
war montage on the epic track, music OUT for the asiento passage, Stono, and the cost of Cartagena (no music for the sombre stretches),
a gentle becalmed harp on the Rebecca, brass/march when Vernon rises, a single sustained note for the twist, drums for the battles,
warm strings for the legacy, and a light pluck for the comic beats. Intense and gentle alternate on purpose.
"""
import os, sys, subprocess
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pw_mix as P

SR = P.SR
ROOT = P.ROOT
JAUD = os.path.join(ROOT, 'jenkins', 'assets', 'audio')
P.AUD = os.path.join(ROOT, 'pigwar', 'assets', 'audio')  # the user's music tracks live with the Pig War assets

# (start, end, kind, gain) — times from the aligned narration
CUES = [
    (0.0, 22.6, 'suspense', .75), (25.0, 34.4, 'suspense', .7),                 # low strings under the Commons; silence as the jar is shown
    (34.4, 52.0, 'epic', .75),                                                    # the war montage
    (52.0, 70.0, 'curious', .7), (70.0, 84.0, 'dramatic', .65),                  # the strange part; "money … human beings"
    (84.0, 89.6, 'suspense', .5), (90.6, 93.0, 'drums', .6),                      # CTA: calm → tension → (silence) → BROADSIDE → drums
    (93.0, 120.5, 'curious', .7), (120.5, 136.5, 'playful', .7), (136.5, 165.0, 'somber', .7),
    # 165–190: music out (the 4,800 are people)
    (190.0, 234.0, 'suspense', .7), (234.0, 241.0, 'playful', .65), (241.0, 252.0, 'suspense', .7),
    (252.0, 268.0, 'dawn', .8), (268.0, 304.0, 'dramatic', .7),                 # becalmed → the boat, the boarding
    # 304–318: the cut — silence (gull foley only)
    (318.0, 343.0, 'curious', .65), (343.0, 353.0, 'reflective', .7),
    (353.0, 388.0, 'playful', .65), (388.0, 404.0, 'curious', .65), (404.0, 421.0, 'march', .65), (421.0, 430.0, 'playful', .65),
    (430.0, 476.0, 'curious', .65), (476.0, 504.0, 'dramatic', .7),
    (504.0, 514.0, 'epic', .7), (514.0, 524.0, 'somber', .7),
    # 524–582: music out (Stono)
    (582.0, 604.0, 'march', .75), (604.0, 625.0, 'epic', .7), (625.0, 662.0, 'playful', .7),
    (662.0, 678.0, 'curious', .65), (678.0, 708.0, 'suspense', .7), (708.0, 744.0, 'curious', .65), (744.0, 752.0, 'march', .7),
    (752.0, 790.0, 'epic', .7), (790.0, 815.0, 'reflective', .7), (815.0, 852.0, 'dramatic', .7), (852.0, 866.0, 'drums', .7),
    (866.0, 890.0, 'playful', .6), (890.0, 897.0, 'suspense', .7),
    (897.0, 927.0, 'somber', .7), (927.0, 937.0, 'drums', .6),
    # 937–976: music out (the retreat and the cost)
    (976.0, 1055.0, 'reflective', .5), (1055.0, 1070.0, 'drums', .55), (1070.0, 1093.0, 'reflective', .5),
    (1093.0, 1153.0, 'playful', .65), (1153.0, 1170.0, 'dramatic', .65), (1170.0, 1181.0, 'epic', .65), (1181.0, 1196.0, 'somber', .7),
    (1196.0, 1245.0, 'curious', .65), (1245.0, 1281.0, 'warm', .8), (1281.0, 1312.0, 'reflective', .75), (1312.0, 1329.0, 'playful', .8),
]
INTENSE = {'epic': 1.25, 'drums': 1.25, 'dramatic': 1.15, 'march': 1.15, 'suspense': 1.05}
GENTLE = {'dawn': .75, 'reflective': .75, 'somber': .8, 'pastoral': .75, 'warm': .85, 'curious': .85, 'playful': .9}
CUES[:] = [(a, b, k, g * INTENSE.get(k, GENTLE.get(k, 1))) for a, b, k, g in CUES]
AMBS = [(90.0, 93.0, 'amb-battle.mp3', 4.0, .4), (598.0, 606.0, 'amb-battle.mp3', 4.0, .45), (1061.0, 1069.0, 'amb-battle.mp3', 30.0, .4), (1171.0, 1178.0, 'amb-battle.mp3', 8.0, .35),
(852.0, 866.0, 'amb-battle.mp3', 0.0, .45), (927.0, 937.0, 'amb-battle.mp3', 14.0, .4), (1055.0, 1068.0, 'amb-battle.mp3', 25.0, .35)]

HITS = [(89.72, 'sfx-gunshot.mp3', .95)]

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
