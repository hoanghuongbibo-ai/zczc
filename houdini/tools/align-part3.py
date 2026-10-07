#!/usr/bin/env python3
"""Align the Part 3 script to the narration's word timings and write js/timing3.js.

The pocketsphinx transcript (JSON: [{a, b, words: [[word, start, end], ...]}, ...]) is matched to
the script word-by-word with difflib; unmatched script words are interpolated between matched
neighbours. Each shot anchor is the start time of a phrase in the script.

usage: python3 tools/align-part3.py transcript.json narration.mp3
"""
import difflib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = """
Sir Arthur Conan Doyle had created the most rational detective in fiction. He was also one of Spiritualism's most
famous champions. He had publicly embraced the movement in 1916, and he believed he had communicated with family
members lost in the war, including his son, Kingsley.
Houdini and Doyle met in England in 1920 and became real friends. They disagreed about the spirits, but they kept
the disagreement civil.
Then, in June 1922, the Houdinis joined the Doyles at the Ambassador Hotel in Atlantic City.
Doyle's wife, Jean, practiced what's called automatic writing. A medium holds a pencil, and a spirit is said to
guide the hand. She offered to try to reach Houdini's mother.
Houdini agreed. Lady Doyle entered what she believed was a trance and wrote quickly, page after page, about fifteen
in all. The pages were full of loving words, presented as his mother's.
Houdini read them. The message didn't hold.
It was written in fluent English. His mother had spoken little English. The first page was marked with a cross.
His mother was a devout Jewish woman, married to a rabbi. And by Houdini's account, the seance took place on or
around her birthday. The message never mentioned it.
Houdini doesn't seem to have thought the Doyles were cheating. He seems to have believed they were sincere. That was
what troubled him. If honest, loving people could produce a false message from the dead, grief alone could
manufacture evidence.
When his doubts became public, Doyle defended his wife. The friendship never recovered.
And Houdini went from doubter to the movement's most visible opponent.
In the early 1920s, Scientific American magazine offered twenty five hundred dollars to any medium who could convince a
committee of investigators that their powers were genuine. Houdini sat on that committee.
By 1924, one candidate looked close to winning. Mina Crandon of Boston, known in the press as Margery, was the
wife of a respected surgeon. In her darkened seances, a voice she said belonged to her dead brother, Walter,
spoke, swore and gave orders. Bells rang. Objects moved.
In July 1924, Houdini went to Boston to sit with her himself.
One test used a bell box, a wooden box that rang when pressure was applied to its lid. Houdini sat beside Margery,
holding her hand, his leg pressed against hers. He later wrote that he felt her leg move as she reached the box
with her foot.
Next, Houdini had a cabinet built to confine her body during the seance. At one sitting, a folding carpenter's
ruler turned up inside it, exactly the kind of tool that could press a bell from a distance. Margery's supporters
said Houdini had planted it to frame her. Houdini said it had been planted to discredit him. That dispute has never
been resolved.
What was resolved: Margery did not get the prize. Houdini published a pamphlet exposing what he called her tricks.
And in the seance room, Walter's voice turned on him.
According to several accounts, Walter predicted that Houdini would be dead within a year. The details change from
telling to telling: the date, the wording, even who first made it public. One Houdini historian argues that Houdini
himself helped circulate the story, because it was excellent publicity.
Either way, a prophecy of his death was now on the record.
"""
ANCHORS = [  # key -> phrase that starts the beat (first occurrence after the previous anchor)
    ('s1', 'sir arthur'), ('detective', 'rational detective'), ('champion', 'he was also'), ('y1916', 'he had publicly'),
    ('believed', 'and he believed'), ('kingsley', 'kingsley'), ('met', 'houdini and doyle met'), ('friends', 'real friends'),
    ('disagreed', 'they disagreed'), ('civil', 'civil'), ('june', 'then in june'), ('ambassador', 'ambassador'),
    ('jean', "doyle's wife"), ('automatic', 'automatic writing'), ('medium', 'a medium holds'), ('spirit', 'and a spirit'),
    ('offered', 'she offered'), ('mother', 'mother'), ('agreed', 'houdini agreed'), ('trance', 'lady doyle'), ('page', 'page after page'),
    ('fifteen', 'about fifteen'), ('loving', 'the pages were'), ('read', 'houdini read them'), ('hold', "the message didn't"),
    ('fluent', 'it was written'), ('little', 'his mother had'), ('cross', 'the first page'), ('devout', 'his mother was a devout'),
    ('birthday', "and by houdini's"), ('bday', 'birthday'), ('never', 'the message never'), ('cheating', "houdini doesn't"),
    ('sincere', 'he seems to have believed'), ('troubled', 'that was what'), ('honest', 'if honest'), ('grief', 'grief alone'),
    ('public', 'when his doubts'), ('defended', 'doyle defended'), ('recovered', 'the friendship never'), ('doubter', 'and houdini went'),
    ('opponent', 'opponent'), ('early', 'in the early'), ('sciam', 'scientific american'), ('offered2', 'offered twenty'), ('convince', 'to any medium'),
    ('sat', 'houdini sat on'), ('y1924', 'by 1924'), ('mina', 'mina crandon'), ('margery', 'known in the press'), ('surgeon', 'was the wife'),
    ('darkened', 'in her darkened'), ('spoke', 'spoke swore'), ('swore', 'swore'), ('orders', 'gave orders'), ('bells', 'bells rang'), ('objects', 'objects moved'),
    ('july', 'in july'), ('bellbox', 'one test used'), ('pressure', 'pressure was'), ('beside', 'houdini sat beside'), ('holding', 'holding her hand'),
    ('leg', 'his leg pressed'), ('felt', 'he later wrote'), ('foot', 'with her foot'), ('cabinet', 'next houdini'), ('sitting', 'at one sitting'),
    ('ruler', 'a folding'), ('exactly', 'exactly the kind'), ('supporters', "margery's supporters"), ('discredit', 'houdini said it'),
    ('dispute', 'that dispute'), ('resolved', 'what was resolved'), ('prize', 'did not get'), ('pamphlet', 'houdini published'),
    ('turned', 'and in the seance room'), ('turnedOn', 'turned on him'), ('according', 'according to'), ('dead', 'would be dead'),
    ('details', 'the details change'), ('date', 'the date'), ('wording', 'the wording'), ('who', 'even who'), ('historian', 'one houdini historian'),
    ('publicity', 'excellent publicity'), ('either', 'either way'), ('record', 'on the record'),
]
NUM = {'1916': 'nineteen sixteen', '1920': 'nineteen twenty', '1922': 'nineteen twenty two', '1920s': 'nineteen twenties', '1924': 'nineteen twenty four'}

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
    with open(os.path.join(ROOT, 'js/timing3.js'), 'w') as f:
        f.write('/* Generated by tools/align-part3.py — Part 3 word anchors (s into narration-part3.mp3). */\n')
        f.write('window.T3 = ' + json.dumps(out, indent=1) + ';\n')
    print(f'{matched}/{len(sw)} script words matched; {len(out)} anchors; duration {dur:.2f}s')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
