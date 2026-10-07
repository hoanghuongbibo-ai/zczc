#!/usr/bin/env python3
"""Word-timed transcript of a narration with pocketsphinx (no network needed).

usage:
  ffmpeg -y -v error -i narration.mp3 -ac 1 -ar 16000 -f s16le voice.raw
  ffmpeg -i narration.mp3 -af silencedetect=n=-35dB:d=0.25 -f null - 2>&1 \
    | grep -oE "silence_(start|end): [0-9.]+" | awk '{print $2}' | paste - - > silences.txt
  python3 tools/asr.py voice.raw silences.txt transcript.json

Writes [{a, b, words: [[word, start, end], ...]}, ...] — one entry per speech segment between silences.
Feed it to tools/align-partN.py.
"""
import json, sys
from pocketsphinx import Decoder

raw_path, sil_path, out_path = sys.argv[1:4]
SR = 16000
sil = [tuple(map(float, l.split())) for l in open(sil_path) if len(l.split()) == 2]
raw = open(raw_path, 'rb').read()
segs, prev = [], 0.0
for s, e in sil:                                   # speech segments between silences
    if s - prev > 0.2: segs.append((prev, s))
    prev = e
segs.append((prev, len(raw) / 2 / SR))
dec, out = Decoder(), []
for a, b in segs:
    a2 = max(0, a - 0.1); chunk = raw[int(a2 * SR) * 2:int((b + 0.1) * SR) * 2]
    dec.start_utt(); dec.process_raw(chunk, full_utt=True); dec.end_utt()
    words = [(sg.word.split('(')[0], round(a2 + sg.start_frame / 100, 2), round(a2 + sg.end_frame / 100, 2))
             for sg in dec.seg() if not sg.word.startswith(('<', '['))]
    out.append({'a': a, 'b': b, 'words': words})
json.dump(out, open(out_path, 'w'))
print(len(segs), 'segments')
