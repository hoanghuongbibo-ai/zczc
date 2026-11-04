#!/usr/bin/env python3
"""usage: when.py "phrase" ... -> time of each phrase in js/timing.js (first match)"""
import json, sys, re, os
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(D, 'js/timing.js')).read(); w = json.loads(s[s.index('=') + 1:].rstrip(';'))
for ph in sys.argv[1:]:
    p = [re.sub(r"[^a-z0-9]", '', x) for x in ph.lower().split()]; hit = None
    for i in range(len(w) - len(p)):
        if all(re.sub(r"[^a-z0-9]", '', w[i + j][0]) == p[j] for j in range(len(p))): hit = w[i][1]; break
    print(f'{hit if hit is not None else "--":>8}  {ph}')
