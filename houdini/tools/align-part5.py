#!/usr/bin/env python3
"""Align the Part 5 script to the narration's word timings and write js/timing5.js.

The pocketsphinx transcript (JSON: [{a, b, words: [[word, start, end], ...]}, ...]) is matched to
the script word-by-word with difflib; unmatched script words are interpolated between matched
neighbours. Each shot anchor is the start time of a phrase in the script.

usage: python3 tools/align-part5.py transcript.json narration.mp3
"""
import difflib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = """
That should have been the end: a tragic, ordinary death. But Houdini had spent four years making sure his death could not be ordinary.
For believers, the pattern was irresistible. A man who mocked the spirits had died on Halloween, after a spirit voice had reportedly
foretold it. For skeptics, it was a vague prediction about a man in his fifties doing dangerous stunts, remembered because it happened to land.
He was buried on November 4, at Machpelah Cemetery in Queens, in the bronze casket he'd had built for a buried-alive act.
But Houdini had arranged one more test.
He and Bess had agreed on a secret message. If he could reach her from the other side, he would use it. A medium who delivered it
word for word would prove that he had.
The code came from their old mind-reading act, where ordinary words stood for numbers, and numbers for letters. It began with
Rosabelle, the song Bess sang when they first met, engraved inside her wedding ring. The rest, answer, tell, pray answer, look,
tell, answer answer, tell, spelled out one word.
Believe.
Bess held seances on the anniversary of his death. Then, in January 1929, a medium named Arthur Ford delivered the code. Bess signed a
statement saying it was correct. Newspapers reported that Houdini had come through.
But the secret wasn't secret. The couple's code had been published the year before, in Harold Kellock's 1928 biography of Houdini.
Ford could have learned it the ordinary way. Bess later repudiated his claim.
On Halloween 1936, ten years after his death, Bess held the Final Houdini Seance on the roof of the Knickerbocker Hotel in Hollywood,
in front of a crowd of about three hundred. Houdini did not come through. When it was over, she put out a candle said to have burned
beside his photograph for ten years.
The theories didn't stop with Bess.
In 2006, biographers William Kalush and Larry Sloman published The Secret Life of Houdini. They argued his death deserved a second
look. No autopsy had been performed. Houdini had received threats from Spiritualist opponents. They cited a 1924 letter in which
Conan Doyle wrote that Houdini would get his just desserts. And they raised questions about an experimental serum he was given in
the hospital, and about poison.
In 2007, Houdini's grandnephew, George Hardeen, announced he backed an exhumation to test for poison. Relatives on Bess's side
publicly objected. The plan stalled, and according to later reporting, the paperwork was never filed. Houdini remains where he was buried in 1926.
So weigh it the way Houdini would have. On one side: an illness confirmed in surgery, a man who performed through a 104 degree fever,
and an era before antibiotics. On the other: hostility, threats and suspicion, but no physical evidence of poison.
Murder isn't impossible. It just isn't supported.
So what killed Harry Houdini? Most likely an ordinary illness he wouldn't stop to treat, hidden behind a punch he didn't take
seriously, in a body he'd spent his life proving could survive almost anything.
And why was his death never allowed to be ordinary? Because Houdini had made it part of the argument. He spent his last years
warning that grief makes people see what they want to see. Then he died on the one night of the year built for ghosts, and people
saw exactly what they wanted.
His final act wasn't an escape. It was a single word, left with the one person who knew him best. Believe. And for ten years, Bess
kept his test honest.
Less than a month after Houdini's funeral, the most famous mystery writer in Britain vanished from her home. For eleven days, a
nation searched for Agatha Christie, and one of the people who joined the hunt was Arthur Conan Doyle.
"""
ANCHORS = [
    ('e1', 'that should'), ('ordinary1', 'a tragic'), ('fouryears', 'but houdini had spent'), ('believers', 'for believers'),
    ('mocked', 'a man who mocked'), ('halloween', 'halloween'), ('foretold', 'after a spirit'), ('skeptics', 'for skeptics'),
    ('fifties', 'in his fifties'), ('land', 'remembered because'), ('buried', 'he was buried'), ('machpelah', 'at machpelah'),
    ('bronze', 'in the bronze'), ('test', 'but houdini had arranged'), ('bess', 'he and bess'), ('reach', 'if he could reach'),
    ('medium', 'a medium who'), ('code', 'the code came'), ('words', 'where ordinary'), ('began', 'it began'), ('rosabelle', 'rosabelle'),
    ('song', 'the song'), ('ring', 'wedding ring'), ('rest', 'the rest'), ('c1', 'answer tell pray'), ('c2', 'tell pray'), ('c3', 'pray answer look'),
    ('c4', 'look tell'), ('c5', 'tell answer answer'), ('c6', 'answer answer tell'), ('c7', 'tell spelled'), ('spelled', 'spelled out'),
    ('believe', 'believe bess'), ('seances', 'bess held seances'), ('jan1929', 'then in january'), ('ford', 'arthur ford'), ('signed', 'bess signed'),
    ('newspapers', 'newspapers reported'), ('secret', 'but the secret'), ('published', "the couple's code"), ('kellock', 'harold'),
    ('could', 'ford could'), ('repudiated', 'bess later'), ('h1936', 'on halloween 1936'), ('tenyears', 'ten years after'), ('final', 'bess held the final'),
    ('crowd', 'in front of'), ('notthrough', 'houdini did not'), ('candle', 'when it was over'), ('theories', "the theories didn't"),
    ('y2006', 'in 2006'), ('book', 'published the secret'), ('argued', 'they argued'), ('autopsy', 'no autopsy'), ('threats', 'houdini had received'),
    ('letter', 'they cited'), ('desserts', 'just desserts'), ('serum', 'and they raised'), ('poison', 'and about poison'), ('y2007', 'in 2007'),
    ('hardeen', 'george hardeen'), ('exhumation', 'an exhumation'), ('objected', 'relatives on'), ('stalled', 'the plan stalled'),
    ('paperwork', 'the paperwork'), ('remains', 'houdini remains'), ('weigh', 'so weigh'), ('oneside', 'on one side'), ('surgery', 'an illness confirmed'),
    ('fever', 'a man who performed'), ('antibiotics', 'and an era'), ('other', 'on the other'), ('hostility', 'hostility threats'),
    ('noevidence', 'but no physical'), ('murder', "murder isn't"), ('supported', 'it just'), ('what', 'so what killed'), ('illness', 'most likely'),
    ('hidden', 'hidden behind'), ('body', 'in a body'), ('why', 'and why was'), ('argument', 'because houdini had made'), ('warning', 'he spent his last'),
    ('ghosts', 'then he died'), ('saw', 'and people saw'), ('escape', 'his final act'), ('word', 'it was a single'), ('left', 'left with'),
    ('believe2', 'believe and for'), ('kept', 'and for ten years bess'), ('bridge', 'less than a month'), ('vanished', 'the most famous mystery'),
    ('eleven', 'for eleven days'), ('christie', 'agatha christie'), ('doyle', 'and one of the people'),
]
NUM = {'4': 'four', '1929': 'nineteen twenty nine', '1928': 'nineteen twenty eight', '1936': 'nineteen thirty six', '2006': 'two thousand six', '2007': 'two thousand seven', '1924': 'nineteen twenty four', '1926': 'nineteen twenty six', '104': 'one hundred and four'}

def words(text):
    out = []
    for w in re.findall(r"[a-z0-9']+", text.lower()):
        out += NUM.get(w, w).split()
    return out

def main(tr_path, audio):
    tr = json.load(open(tr_path))
    asr = [(w[0].lower(), w[1]) for seg in tr for w in seg['words']]
    sw = words(SCRIPT)
    sm = difflib.SequenceMatcher(a=sw, b=[w for w, _ in asr], autojunk=False)
    times = [None] * len(sw)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size): times[blk.a + k] = asr[blk.b + k][1]
    # interpolate gaps between matched words
    known = [i for i, v in enumerate(times) if v is not None]
    for i in range(len(sw)):
        if times[i] is None:
            lo = max([k for k in known if k < i], default=None); hi = min([k for k in known if k > i], default=None)
            if lo is None: times[i] = times[hi]
            elif hi is None: times[i] = times[lo] + .35 * (i - lo)
            else: times[i] = times[lo] + (times[hi] - times[lo]) * (i - lo) / (hi - lo)
    out, pos = {}, 0
    for key, phrase in ANCHORS:
        p = words(phrase)
        for i in range(pos, len(sw) - len(p) + 1):
            if sw[i:i + len(p)] == p: out[key] = round(times[i], 2); pos = i + 1; break
        else: raise SystemExit(f'anchor not found: {key} / {phrase}')
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', audio], capture_output=True, text=True).stdout)
    out['end'] = round(dur, 2)
    matched = sum(1 for b in sm.get_matching_blocks() for _ in range(b.size))
    with open(os.path.join(ROOT, 'js/timing5.js'), 'w') as f:
        f.write('/* Generated by tools/align-part5.py — Part 5 word anchors (s into narration-part5.mp3). */\n')
        f.write('window.T5 = ' + json.dumps(out, indent=1) + ';\n')
    print(f'{matched}/{len(sw)} script words matched; {len(out)} anchors; duration {dur:.2f}s')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
