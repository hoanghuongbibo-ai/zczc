#!/usr/bin/env python3
"""Align the Part 4 script to the narration's word timings and write js/timing4.js.

The pocketsphinx transcript (JSON: [{a, b, words: [[word, start, end], ...]}, ...]) is matched to
the script word-by-word with difflib; unmatched script words are interpolated between matched
neighbours. Each shot anchor is the start time of a phrase in the script.

usage: python3 tools/align-part4.py transcript.json narration.mp3
"""
import difflib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = """
By 1926, Houdini was no longer a performer who exposed mediums on the side. Exposing mediums was becoming the main event.
That February, he testified before a House subcommittee in support of H.R. 8989, a bill against fortune-telling for money in the
District of Columbia. More hearings followed in May. Before they began, he sent an undercover investigator, Rose Mackenberg, to
visit local mediums. The hearing room filled with spiritualists who had come to fight him. He called them frauds to their faces.
They accused him of persecution.
The bill never became law. But the hearings put his campaign on front pages, and made his opponents more numerous and more personal.
He was escalating on stage too.
That summer, a performer named Rahman Bey stayed sealed in a box underwater for an hour and presented it as a trance. Houdini's
response was characteristic. He would do it with no trance at all.
On August 5, 1926, he was sealed into a metal casket and lowered into the pool of the Hotel Shelton in New York. He stayed in for
ninety-one minutes.
Afterward, he wrote that he'd begun to see yellow lights near the end. He sent his notes to a Bureau of Mines researcher studying
how trapped miners might survive on limited air.
It was the perfect Houdini argument: the impossible, explained. It was also his last great public test.
That fall, Houdini was on tour with a demanding full-evening show. In Albany, performing the Water Torture Cell, hanging upside
down in a locked tank of water, he fractured his ankle. He kept touring.
Next stop: Montreal.
On October 22, 1926 (some sources say the 20th), Houdini was resting on a couch in his dressing room, off his injured ankle, when
students from McGill University came to visit. One of them, J. Gordon Whitehead, asked whether it was true that Houdini could take
any punch to the stomach.
Accounts differ on whether Houdini clearly agreed and on how many blows landed. The core is consistent. Whitehead struck him hard
in the abdomen several times, before Houdini was ready, until Houdini stopped him.
Houdini performed anyway, in pain. Then he boarded an overnight train for Detroit.
By Detroit, he was seriously ill. A doctor diagnosed acute appendicitis and told him to go to a hospital. Houdini went to the
Garrick Theatre instead. On October 24, he performed with a fever reported at about 104 degrees Fahrenheit. He was hospitalized
after the show.
Surgeons removed his appendix the next day. It had already ruptured. He had peritonitis, an infection of the lining of the
abdomen. In 1926, before antibiotics, it was often fatal. Doctors operated again a few days later.
On October 31, Harry Houdini died at Grace Hospital in Detroit. He was fifty-two.
At the time, many people thought so. The New York Times reported that his physicians blamed one of the blows for bursting the
appendix. His life insurer ruled the death accidental and paid his widow, Bess, a double indemnity, a doubled payout for
accidental death.
Modern medicine is more skeptical. Appendicitis usually starts inside the appendix itself, with a blockage and infection. A blow
from outside causing it is possible, but extremely rare.
The likelier sequence is this. Houdini was probably already developing appendicitis. The punches gave him, and everyone around
him, an easy explanation for the pain: a bruise. So he kept performing, on a broken ankle and a failing abdomen. By the time a
surgeon saw his appendix, it had burst.
The punch may not have caused his death. But it may have disguised it.
Whitehead was never charged.
"""
ANCHORS = [
    ('d1', 'by 1926'), ('exposing', 'exposing mediums was'), ('feb', 'that february'), ('hr', 'h r'), ('bill', 'a bill against'),
    ('district', 'district of columbia'), ('may', 'more hearings'), ('before', 'before they began'), ('sent', 'he sent'), ('rose', 'rose mackenberg'),
    ('hearing', 'the hearing room'), ('frauds', 'he called them'), ('accused', 'they accused'), ('never', 'the bill never'),
    ('pages', 'but the hearings'), ('opponents', 'and made his opponents'), ('escalating', 'he was escalating'), ('summer', 'that summer'),
    ('box', 'sealed in a box'), ('trance', 'presented it'), ('response', "houdini's response"), ('notrance', 'he would do it'),
    ('aug5', 'on august'), ('casket', 'he was sealed'), ('lowered', 'and lowered'), ('ninety', 'he stayed in'), ('yellow', 'afterward'),
    ('lights', 'yellow lights'), ('notes', 'he sent his notes'), ('miners', 'trapped miners'), ('perfect', 'it was the perfect'),
    ('impossible', 'the impossible'), ('explained', 'explained'), ('last', 'it was also'), ('fall', 'that fall'), ('albany', 'in albany'),
    ('hanging', 'hanging upside'), ('fractured', 'he fractured'), ('touring', 'he kept touring'), ('next', 'next stop'), ('montreal', 'montreal'),
    ('oct22', 'on october 22'), ('sources', 'some sources'), ('resting', 'houdini was resting'), ('students', 'when students'),
    ('oneof', 'one of them'), ('whitehead', 'gordon whitehead'), ('asked', 'asked whether'), ('accounts', 'accounts differ'), ('blows', 'how many blows'),
    ('core', 'the core'), ('struck', 'whitehead struck'), ('stopped', 'until houdini stopped'), ('performed', 'houdini performed anyway'),
    ('train', 'then he boarded'), ('ill', 'by detroit'), ('doctor', 'a doctor'), ('hospital', 'told him to go'), ('garrick', 'houdini went to'),
    ('oct24', 'on october 24'), ('fever', 'with a fever'), ('hospitalized', 'he was hospitalized'), ('surgeons', 'surgeons removed'),
    ('ruptured', 'it had already'), ('peritonitis', 'he had peritonitis'), ('antibiotics', 'in 1926 before'), ('fatal', 'it was often fatal'),
    ('again', 'doctors operated'), ('oct31', 'on october 31'), ('died', 'harry houdini died'), ('age', 'he was fifty'),
    ('thought', 'at the time'), ('times', 'the new york times'), ('blamed', 'physicians blamed'), ('insurer', 'his life insurer'),
    ('bess', 'bess'), ('double', 'a double indemnity'), ('modern', 'modern medicine'), ('usually', 'appendicitis usually'),
    ('blockage', 'with a blockage'), ('outside', 'a blow from outside'), ('rare', 'extremely rare'), ('likelier', 'the likelier'),
    ('developing', 'houdini was probably'), ('punches', 'the punches gave'), ('bruise', 'a bruise'), ('kept', 'so he kept'),
    ('ankle', 'on a broken'), ('burst', 'by the time a surgeon'), ('caused', 'the punch may not'), ('disguised', 'but it may have'),
    ('charged', 'whitehead was never'),
]
NUM = {'1926': 'nineteen twenty six', '8989': 'eighty nine eighty nine', '5': 'fifth', '22': 'twenty second', '20th': 'twentieth', '24': 'twenty four', '104': 'one hundred and four', '31': 'thirty first'}

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
    with open(os.path.join(ROOT, 'js/timing4.js'), 'w') as f:
        f.write('/* Generated by tools/align-part4.py — Part 4 word anchors (s into narration-part4.mp3). */\n')
        f.write('window.T4 = ' + json.dumps(out, indent=1) + ';\n')
    print(f'{matched}/{len(sw)} script words matched; {len(out)} anchors; duration {dur:.2f}s')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
