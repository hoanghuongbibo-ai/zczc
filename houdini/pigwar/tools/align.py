#!/usr/bin/env python3
"""Align script.txt to the pocketsphinx transcript; write js/timing.js = window.WORDS = [[word, t], ...] (script order)."""
import difflib, json, re, sys, os
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ONES = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = 'zero ten twenty thirty forty fifty sixty seventy eighty ninety'.split()
def n2w(n):
    if n < 20: return ONES[n]
    if n < 100: return TENS[n // 10] + ('' if n % 10 == 0 else ' ' + ONES[n % 10])
    if n < 1000: return ONES[n // 100] + ' hundred' + ('' if n % 100 == 0 else ' and ' + n2w(n % 100))
    if n < 1000000: return n2w(n // 1000) + ' thousand' + ('' if n % 1000 == 0 else ' ' + n2w(n % 1000))
    return n2w(n // 1000000) + ' million'
def year(n):
    if 1000 <= n <= 1999 or 2010 <= n <= 2099: return n2w(n // 100) + ' ' + (n2w(n % 100) if n % 100 >= 10 else ('hundred' if n % 100 == 0 else 'oh ' + n2w(n % 100)))
    return n2w(n)
def tok(text):
    text = text.replace('—', ' ').replace('-', ' ').replace('£', ' ').replace('$', ' ')
    out = []
    for w in re.findall(r"[A-Za-zÀ-ÿ']+|\d[\d,\.]*", text):
        if w[0].isdigit():
            w2 = w.rstrip('.').replace(',', '')
            if '.' in w2: a, b = w2.split('.'); out.append((w, (n2w(int(a)) + ' point ' + ' '.join(ONES[int(c)] for c in b)).split())); continue
            n = int(w2); out.append((w, (year(n) if (900 < n < 2100 and ',' not in w) else n2w(n)).split()))
        else: out.append((w, [w.lower().replace("'", "")]))
    return out
script = open(os.path.join(D, 'script.txt')).read()
sw = tok(script)
flat, owner = [], []
for i, (w, parts) in enumerate(sw):
    for p in parts: flat.append(p); owner.append(i)
asr = json.load(open(os.path.join(D, 'assets/audio/asr-full.json')))
tw = [(w.lower().replace("'", ""), s) for seg in asr for w, s, e in seg['words']]
sm = difflib.SequenceMatcher(None, flat, [w for w, _ in tw], autojunk=False)
times = [None] * len(flat)
for a, b, n in sm.get_matching_blocks():
    for k in range(n): times[a + k] = tw[b + k][1]
# interpolate
known = [i for i, t in enumerate(times) if t is not None]
for i in range(len(times)):
    if times[i] is None:
        lo = max([k for k in known if k < i], default=None); hi = min([k for k in known if k > i], default=None)
        if lo is None: times[i] = times[hi]
        elif hi is None: times[i] = times[lo]
        else: times[i] = times[lo] + (times[hi] - times[lo]) * (i - lo) / (hi - lo)
wt = {}
for j, i in enumerate(owner):
    if i not in wt: wt[i] = times[j]
words = [[re.sub(r"[^a-z0-9']", '', w.lower()), round(wt[i], 2)] for i, (w, _) in enumerate(sw)]
open(os.path.join(D, 'js/timing.js'), 'w').write('window.WORDS=' + json.dumps(words, separators=(',', ':')) + ';')
print(len(words), 'matched', len(known), '/', len(flat), 'last', words[-1])
