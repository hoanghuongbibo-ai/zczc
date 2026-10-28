"""Transcribe the narration with pocketsphinx, segment by segment on silences; writes assets/audio/asr-full.json
[{a, b, words: [[word, start, end], ...]}, ...] in absolute seconds (what tools/align.py reads)."""
import json, os, re, subprocess, sys
from pocketsphinx import Decoder
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SR = 16000
mp3 = os.path.join(D, 'assets/audio/narration-full.mp3')
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', mp3, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
log = subprocess.run(['ffmpeg', '-i', mp3, '-af', 'silencedetect=noise=-38dB:d=0.35', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
dur = len(pcm) / 2 / SR; cuts = [0.0]
for s, e in zip(ss, se): cuts.append((s + e) / 2)
cuts.append(dur)
# merge tiny segments, split huge ones
segs = []; a = cuts[0]
for c in cuts[1:]:
    if c - a >= 2.5 or c == cuts[-1]: segs.append((a, c)); a = c
out = []
for a, b in segs:
    d = Decoder(samprate=SR); d.start_utt(); d.process_raw(pcm[int(a * SR) * 2:int(b * SR) * 2], full_utt=True); d.end_utt()
    ws = [[re.sub(r'\(\d+\)$', '', s.word), round(a + s.start_frame / 100, 2), round(a + s.end_frame / 100, 2)] for s in d.seg() if s.word not in ('<s>', '</s>', '<sil>', '[NOISE]', '[SPEECH]') and not s.word.startswith('+')]
    out.append({'a': round(a, 3), 'b': round(b, 3), 'words': ws})
    print(f'{a:7.1f} {" ".join(w for w, _, _ in ws)[:110]}', flush=True)
json.dump(out, open(os.path.join(D, 'assets/audio/asr-full.json'), 'w'))
