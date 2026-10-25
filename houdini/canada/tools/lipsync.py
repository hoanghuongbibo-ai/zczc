"""Mouth openness per 1/30 s (0-9) from the narration, plus word onsets from js/timing.js -> js/lipsync.js (window.LIPSYNC)."""
import subprocess, numpy as np, re, json
SR, FPS = 16000, 30
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', 'assets/audio/narration-full.mp3', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
hop = SR // FPS; n = len(x) // hop
# speech band only (roughly 300-3000 Hz) so breaths and low hum don't open the mouth
X = np.fft.rfft(x[:n * hop].reshape(n, hop) * np.hanning(hop), axis=1); f = np.fft.rfftfreq(hop, 1 / SR)
e = np.sqrt((np.abs(X[:, (f > 300) & (f < 3000)]) ** 2).mean(1))
db = 20 * np.log10(e + 1e-9); lo, hi = np.percentile(db, 30), np.percentile(db, 97)
v = np.clip((db - lo) / (hi - lo), 0, 1) ** 1.2 * 9
v = np.where(v < 1.2, 0, v); v = np.round(np.convolve(v, [.25, .5, .25], 'same')).astype(int).clip(0, 9)
words = [float(m) for m in re.findall(r'\[\s*"[^"]*"\s*,\s*([\d.]+)\s*\]', open('js/timing.js').read())]
open('js/lipsync.js', 'w').write('// mouth openness per 1/30 s from narration-full.mp3 (0-9) and word onsets, for lip-sync and talk gestures (tools/lipsync.py)\nwindow.LIPSYNC = { fps: 30, env: "' + ''.join(map(str, v)) + '", words: ' + json.dumps([round(w, 2) for w in words]) + ' };\n')
print(n, 'frames', len(words), 'words', 'open share', (v > 0).mean().round(2))
