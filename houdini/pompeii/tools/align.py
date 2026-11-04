#!/usr/bin/env python3
"""Align the Pompeii script to the narration's word timings and write pompeii/js/timing.js (window.TP anchors).

usage: python3 pompeii/tools/align.py transcript.json pompeii/assets/audio/narration.mp3
(transcript.json from houdini/tools/asr.py). Numbers are written out the way the narrator says them.
"""
import difflib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = open(os.path.join(ROOT, 'tools', 'script.txt')).read()

ANCHORS = [
 # cold open
 ('open', 'somewhere in a house'), ('notpaid', 'a guy who is very'), ('picks', 'picks up a lump'), ('scribbles', 'and scribbles a note'),
 ('date', 'a date a few'), ('fewwords', 'a few words'), ('eating', 'probably about somebody'), ('notsure', "we're honestly not sure"),
 ('down', 'he puts the charcoal'), ('home', 'he goes home'), ('forgets', 'he forgets about'),
 ('twok', 'two thousand years later that'), ('news', 'that doodle is in'), ('textbook', 'because it might prove'), ('wrongdate', 'has the wrong date'),
 ('thing', "and that's the thing"), ('know', 'you think you know'), ('boom', 'volcano goes boom'), ('freezes', 'everybody freezes'),
 ('theend', 'the end except'), ('except', 'except almost none'), ('fivetimes', "pompeii didn't get buried once"), ('count', 'by my count'),
 ('b1', 'by rome by'), ('b2', 'by a volcano'), ('b3', 'by time'), ('b4', 'by our own stories'), ('b5', 'and by its own crumbling'),
 ('dig', 'and every time somebody'), ('how', 'so how did a perfectly'), ('nobody', 'a place nobody important'), ('famous', 'become the most famous dead'),
 ('letsdig', "let's dig"), ('cta1', 'this story has more'), ('mother', 'a famous mother'), ('bombs', 'more than one hundred and sixty bombs'),
 ('datewrong', 'and a date that might'), ('watch', 'so make sure you watch'), ('backbay', 'now back to the bay'), ('cityup', 'we have a city to dig'),
 # beat 2
 ('b2start', 'to understand why pompeii'), ('rude', 'we first need to admit'), ('mostlife', 'for most of its life'),
 ('oscans', 'the town started out'), ('local', 'one of the many local'), ('pumpe', 'one popular theory'), ('five', 'meaning five'),
 ('villages', 'maybe five little villages'), ('maybe2', 'maybe nobody signed'), ('paperwork0', 'nobody signed the founding'),
 ('pizza', 'over the next few centuries'), ('greeks', 'greeks etruscans'), ('samnites', 'a tough hill people'),
 ('romeup', 'then rome shows up'), ('romedoes', 'and rome does what'), ('allies', 'for a long time pompeii'), ('polite', 'which is a polite'),
 ('language', 'you get to keep'), ('soldiers', 'you send us soldiers'), ('vote', "you don't get to vote"),
 ('ninety1', 'in ninety one b c'), ('social', "it's called the social"), ('brunch', 'which sounds like a fight'), ('bloody', "but it's a real"),
 ('picks2', 'pompeii picks a side'), ('wrongside', 'the wrong side'),
 # beat 3
 ('sulla', 'this is lucius'), ('sullah', "that's sull uh"), ('general', 'roman general future'), ('ticket', 'and a man with the warm'),
 ('besiege', 'in eighty nine b c he besieges'), ('funone', "now here's a fun one"), ('argue', 'historians still argue about whether'),
 ('walls', 'the walls show damage'), ('heldout', 'but some scholars think'), ('rome_wins', 'either way rome'), ('punish', 'and around eighty b c'),
 ('colony', 'he moves in a colony'), ('fewk', 'likely a few thousand'),
 ('sk1', 'congratulations pompeii'), ('sk2', 'oh wow'), ('sk3', "what's the catch"), ('sk4', 'two thousand of my guys'), ('sk5', 'whose houses'), ('sk6', 'great question'),
 ('newname', 'the town gets a new official'), ('mouthful', 'which is a mouthful'), ('latin', 'latin replaces oscan'), ('vanish', "the old language doesn't"),
 ('burial1', "and i'm going to count"), ('notash', 'not under ash under paperwork'), ('covered', 'the oscan town gets'), ('again1', 'pompeii buried again well'),
 ('firsttime', 'for the first time'), ('youknow', 'you know what i mean'),
 # beat 4
 ('b4start', 'over the next one hundred and fifty years'), ('fine', 'fine comfortable'), ('port', 'a busy port town'), ('range', 'historians argue about that number'),
 ('cooley', 'the historian alison'), ('nocrucial', 'no crucial moment'), ('nofamous', 'no famous pompeian'), ('usa', 'if rome were the united'),
 ('drive', 'pompeii would be a pleasant'), ('ordinary', 'but ordinary is exactly'), ('onething', 'because the people of pompeii did'),
 ('walls2', 'they wrote on the walls'), ('election', 'election ads'), ('love', 'love notes'), ('insults', 'insults gladiator'), ('fanart', 'gladiator fan art'),
 ('groupchat', "pompeii's walls were basically"), ('yelp', 'its yelp reviews'), ('sick', 'and somebody at some point'), ('morespots', 'and it shows up in more'),
 ('amazed', 'i am amazed wall'), ('ruins', 'that you have not fallen'), ('boring', 'you who bear the weight'), ('real', "that's real two"),
 ('comment', 'two thousand years ago a guy'), ('holdwall', 'hold onto that wall'), ('comeback', "it's going to come back"),
 ('ad59', 'now in a d fifty nine'), ('tacitus', 'the historian tacitus'), ('trash', 'trash talk between'), ('nuceria2', 'noo seer ee uh'),
 ('stones', 'turned into stones'), ('swords', 'then swords'), ('died', 'people died tacitus'), ('carried', 'tacitus says many'),
 ('painted', 'and somebody in pompeii later'), ('onlyimage', 'which is how we have'), ('response', "rome's response"), ('ban', 'the senate bans'),
 ('exiled', 'the organizer gets exiled'), ('clubs', 'the illegal associations'), ('nfl', 'imagine your nfl'),
 ('ground', 'then comes the ground'), ('feb5', 'on february fifth'), ('seneca1', 'seneca says one'), ('quake', 'a massive earthquake'),
 ('seneca2', 'the philosopher seneca writes'), ('sheep', 'and a flock of six hundred'), ('poisongas', 'which he blamed'),
 ('expect', "and here's where you'd"), ('angry', 'hey maybe the angry'), ('nobodydoes', 'nobody does the romans'), ('notvolcano', "the romans don't think"),
 ('green', "it's a big green"), ('air', 'seneca thinks earthquakes'), ('human', 'so pompeii does the most'), ('renovating', 'it starts renovating'),
 ('years', 'for years some'), ('stillrepair', 'some of the damage'), ('kitchen', 'which is why in a d seventy nine'), ('scaffold', 'scaffolding wet plaster'),
 ('bored', 'and one bored worker'),
 # beat 5 (no sponsor in the recording) + beat 6
 ('wherewere', 'now where were we'), ('recap', 'pompeii joined rome the hard'), ('mountain', "let's talk about the mountain"),
 ('teen', 'we know what happened next'), ('pliny', 'his name is pliny'), ('misenum', 'my see num'), ('uncle', 'with his uncle'),
 ('elder', 'the elder is a big deal'), ('wiki', 'and the author of an encyclopedia'), ('neverslept', 'if wikipedia had been written'),
 ('decades', 'decades later'), ('twoletters', 'the nephew writes back'), ('onlyeye', "they're the only eyewitness"),
 ('version', 'in the version that'), ('cloud', "when the nephew's mother"), ('unusual', 'he says it was of unusual'), ('pine', 'shaped he writes'),
 ('trunk', 'tall trunk'), ('scientist', 'and the uncle being'), ('research', 'research opportunity'),
 ('skb1', 'boat now'), ('skb2', 'uncle i have homework'), ('skb3', 'suit yourself'),
 ('basically', 'that part is basically true'), ('stayed', 'chose to stay and study'), ('homework', 'which might be the only time'),
 ('fleet', 'the uncle turns his rescue'), ('coast', 'because people along the coast'), ('ashships', 'ash and hot pumice'),
 ('helmsman', 'the helmsman tells'), ('refuses', 'according to the nephew he refuses'), ('fortune', 'fortune stood by'),
 ('stabiae', 'he lands at stabiae'), ('friend', "at a friend's villa"), ('sky', 'and then while the sky'), ('bath', 'he takes a bath'),
 ('sleep', 'eats dinner and goes'), ('snoring', 'his nephew reports'), ('pillows', 'the household ties pillows'), ('absurd', "it's absurd"),
 ('lastfunny', "and it's the last funny"),
 ('pumice', 'in pompeii itself'), ('inches', 'piling up in the streets'), ('roofs', 'roofs begin to give'), ('window', 'this is the window'),
 ('movies', 'and this is the part the movies'), ('gotout', 'most people likely got out'), ('notall', 'not all of them'),
 ('notfrozen', 'but pompeii was not a city frozen'), ('hours', 'it was a city that had hours'), ('many', 'and many did'),
 ('carry', 'some left with what'), ('guard', 'some stayed to guard'), ('old', 'the old the sick'), ('team', 'one team of volcanologists'),
 ('nineteen', 'and found a group of people'), ('notlava', "the end wasn't lava"), ('neverlava', 'lava never reached'),
 ('pdc', 'what came instead'), ('avalanches', 'avalanches of superheated'), ('slopes', 'that race down'), ('series', 'a series of them'),
 ('deadliest', 'when the deadliest'), ('nooutrun', 'there was no outrunning'), ('debated', 'exactly how they killed'),
 ('heat', 'one major study'), ('y2021', 'another from two thousand twenty one'), ('cooled', 'argues the current had cooled'),
 ('breathe', 'and that people died because'), ('together', 'either way they died fast'),
 ('remains', 'archaeologists have recovered'), ('noteveryone', "that's not everyone"), ('third', 'about a third of the city'),
 ('outside', 'and many died outside'), ('toll', "italy's culture ministry"),
 ('beach', 'at stabiae the elder pliny'), ('sheet', 'on a sheet his servants'), ('collapses', 'he collapses there'),
 ('fumes', 'his nephew believed'), ('edge', 'he was likely just'), ('run', 'across the bay the nephew'), ('crowd', 'in a crowd with ash'),
 ('survive', 'they survive'), ('letters', "that's why we have the letters"), ('twentyft', 'when it stopped pompeii'),
 ('burial2', "pompeii buried again here's"),
 # beat 7
 ('nobodytells', "here's the part nobody"), ('storywas', 'for a long time the story was'), ('stayeddead', 'pompeii died in a d'),
 ('y2025', 'but in two thousand twenty five'), ('cameback', 'that people came back'), ('notrich', 'not the rich'),
 ('traced', 'one researcher traced'), ('names', 'by following family'), ('nowhere', 'the people who came back were'),
 ('newcomers', 'plus newcomers'), ('upper', 'they lived in the upper'), ('cellars', 'they turned the old ground'),
 ('director', "the park's director"), ('gray', 'described it as a precarious'), ('camp', 'a kind of camp'), ('fifthc', 'people lived like that'),
 ('whyknow', "why didn't we know"), ('goodstuff', 'because early excavators'), ('frescoes', 'frescoes statues gold'),
 ('inway', 'the faint traces'), ('shoveled', 'so they shoveled them'), ('preview', 'which is a perfect preview'),
 ('leave', 'eventually even the squatters'), ('notcomplete', 'not completely the locals'), ('civita', 'the locals call the hill'),
 ('knew', 'so the people who lived on top'), ('which', "they just didn't know which"), ('burial3', 'pompeii buried again between'),
 # beat 8
 ('fontana', 'between about fifteen ninety two'), ('architect', 'an architect named'), ('tunnel', 'and his tunnel goes'),
 ('hit', 'his workers hit walls'), ('nothing', 'and he does nothing'), ('keeps', 'he keeps digging'), ('canaldue', "canal's due"),
 ('y1689', 'in sixteen eighty nine'), ('argue2', 'and scholars argue about it'), ('noshovel', 'nobody grabs a shovel'),
 ('y1748', 'the shovels finally arrive'), ('charles', 'sent by charles of bourbon'), ('spain', 'a man who will later'),
 ('alcubierre', 'his engineer a spaniard'), ('herculaneum', 'has already been tunneling'), ('moves', 'he moves his crew'),
 ('nomistake', 'but make no mistake'), ('notscience', "this isn't science"), ('treasure', 'this is a treasure hunt'),
 ('skc1', 'did you find anything'), ('skc2', 'your majesty'), ('skc3', 'streets homes the daily'), ('skc4', 'is any of it shiny'),
 ('skc5', "there's a statue"), ('skc6', 'bring me the statue'),
 ('y1763', "they don't even confirm"), ('respublica', 'when they find an inscription naming'), ('community', 'the community of the pompeians'),
 ('fifteenyrs', 'fifteen years of digging'), ('richkids', "meanwhile europe's rich"), ('grandtour', 'the grand tour'),
 ('aristocrats', 'young aristocrats'), ('ultimate', 'and a freshly dug up'),
 # beat 9
 ('fiorelli', 'then comes the man who turns'), ('fyoh', 'fyoh rel ee'), ('takesover', 'takes over the excavations'),
 ('writedown', 'write everything down'), ('order', 'dig in order'), ('asatown', 'treat the town as a town'),
 ('y1863', 'and in eighteen sixty three'), ('somethingelse', 'he figures out something else'),
 ('hardened', 'when the ash hardened'), ('decayed', 'the bodies themselves eventually'), ('hollow', 'leaving hollow spaces'),
 ('poured', "fiorelli's team poured"), ('set', 'when it set'), ('chipped', 'they chipped away'),
 ('people', 'what came out were people'), ('curled', 'shapes curled'), ('raised', 'arms raised'), ('covered2', 'faces covered'),
 ('powerful', 'the casts are still'), ('gavestories', 'and we did the most human thing possible with them'), ('stories', 'we gave them stories'),
 ('bracelet', 'an adult wearing a gold'), ('holding', 'holding a child became'), ('motherst', 'the mother protecting'),
 ('pair', 'a pair found together'), ('sisters', 'two sisters in a final'), ('guides', 'guides told these'),
 ('guesses', 'but they were guesses'), ('modern', 'based on how the bodies'), ('y2024', 'in two thousand twenty four a team'),
 ('harvard', 'from harvard'), ('florence', 'the university of florence'), ('maxplanck', 'and the max planck'),
 ('sampled', 'they sampled fourteen'), ('wasman', 'the adult with the gold bracelet was'), ('unrelated', "and he wasn't related"),
 ('genetics', 'the genetics also showed'), ('sleepy', "pompeii wasn't a sleepy"), ('crossroads', 'it was a crossroads'),
 ('overcorrect', 'the researchers themselves'), ('moving', 'a man holding an unrelated'), ('more', "if anything it's more"),
 ('true', "it's just true"), ('burial4', "so that's burial number four"), ('comforting', 'but under the comforting'),
 ('again4', 'pompeii buried again fast'),
 # beat 10
 ('y1943', 'fast forward to'), ('ww2', 'world war two'), ('salerno', 'the allies have landed'), ('counter', 'and german forces'),
 ('slowdown', 'the allies need to slow'), ('bombroads', 'so they bomb those'), ('inaccurate', 'and nineteen forty three bombing'),
 ('augsep', 'in august and september'), ('one60', 'more than one hundred sixty allied'), ('monuments', "some of pompeii's most famous"),
 ('forum', 'parts of the forum'), ('faun', 'the house of the faun'), ('museum', "and the site's museum"),
 ('pollard', 'the historian nigel pollard'), ('archives', 'who dug through'), ('sideeffect', 'concluded the damage'),
 ('notdeliberate', 'not a deliberate attack'), ('remember', 'remember that guy who'), ('finally', 'some of them finally did'),
 ('notfinished', 'and the mountain still'), ('y1944', 'in march nineteen forty four'), ('accounts', 'and according to accounts'),
 ('b25', 'it wrecked dozens'), ('airfield', 'parked at an airfield'), ('notes', 'somewhere pliny the elder is taking'),
 ('afterwar', 'after the war crews'), ('mind', 'keep that in mind'), ('thirtysec', 'because it matters'),
 ('nov6', 'november sixth'), ('rain', 'after a night of heavy rain'), ('schola', "a building on pompeii's main"),
 ('gladiators', 'often called the house'), ('collapse', 'collapses into a pile'), ('nohurt', 'nobody is hurt'),
 ('photos', 'but the photos go around'), ('embarrass', "and they're embarrassing"), ('twist', "here's the twist much"),
 ('recon', 'much of what fell'), ('original', 'not the original roman'), ('bombsfirst', 'the bombs got it first'),
 ('rainfinish', 'the rain finished it'), ('burial5', 'pompeii buried again and'), ('amazedabout', 'and that wall from'),
 ('money', 'this time the response'), ('gpp', 'in two thousand twelve'), ('budget', 'with a budget of'), ('dollars', 'roughly one hundred forty five'),
 ('drainage', 'drainage shoring'), ('shoring', 'shoring up the edges'), ('security', 'security actual'), ('maint', 'actual maintenance'),
 ('works', 'it works and then'), ('toowell', 'and then it works a little'),
 # beat 11
 ('visitors', 'pompeii now gets more'), ('freesunday', 'on one free entry'), ('k36', 'more than thirty six thousand'),
 ('ballpark', "that's like cramming"), ('fragile', 'and a little bit fragile'), ('cap', 'so starting november fifteenth'),
 ('k20', 'pompeii capped daily'), ('tickets', 'and started printing names'), ('uninvited', "two thousand years after sulla's"),
 ('digging', "and the digging hasn't"), ('third2', 'roughly a third of the city is still'), ('season', 'every season turns'),
 ('rooms', 'rooms frescoes scribbles'), ('imaging', 'thanks to new imaging'), ('dozens', 'even recovered dozens'),
 ('lovenotes', 'including love notes'), ('neverclosed', 'the comment section it turns'),
 # beat 12
 ('back', 'which brings us back'), ('found2018', 'his note was found'), ('oct17', 'it gives a date equal'),
 ('charcoal', "and because charcoal doesn't"), ('written79', 'archaeologists argued it was written'), ('fall', 'meaning the eruption'),
 ('oct24', 'maybe october twenty fourth'), ('notaug', 'not august twenty fourth the'), ('presswild', 'the press went wild'),
 ('hedging', 'textbooks started hedging'), ('but', 'but and you knew'), ('notover', "the story isn't over"),
 ('late2024', 'in late two thousand twenty four'), ('review', "the park's own director"), ('table', 'is still on the table'),
 ('foss', 'a scholar named'), ('manuscripts', 'had gone back through'), ('onlydate', 'and found that august twenty fourth is the only'),
 ('visible', 'and the park reported'), ('ad78', 'so it could have been written'), ('tenmonths', 'about ten months before'),
 ('otherside', 'on the other side autumn'), ('fruit', 'autumn fruit'), ('wool', 'heavy wool clothing'), ('coin', 'and a coin some'),
 ('conf', 'in november two thousand twenty five'), ('settle', 'just to settle the date'), ('didnt', "they didn't settle it"),
 ('leaves', "so here's where that leaves"), ('ordtown', 'pompeii was an ordinary town'), ('sports', 'its people argued'),
 ('griped', 'griped about their'), ('fixed', 'and fixed their houses'), ('killed', 'then a mountain they'),
 ('everyone', 'and everyone who came after'), ('kings', 'kings treasure'), ('hunters', 'treasure hunters'), ('guides2', 'tour guides'),
 ('bombers', 'bombers even'), ('historians2', 'even well meaning'), ('buriedagain', 'buried them again a little'), ('wanted', 'with what we wanted'),
 ('new', 'the archaeologists now digging'), ('letbe', 'trying to let pompeii'), ('messy', 'messy mixed'), ('mixed', 'mixed uncertain'),
 ('uncertain', 'uncertain real'), ('realw', 'real and about'), ('threemil', 'and about three million'), ('notdone', 'the mountain i promise'),
 # CTA 2
 ('cta2', 'we started with a scribble'), ('roman', 'which honestly might be'), ('like', 'if you enjoyed this'),
 ('subscribe', 'and subscribe for more'), ('free', "it's free and it takes"), ('wantknow', 'now i want to know'),
 ('buried2', 'if your town got buried'), ('y4026', 'what would archaeologists'), ('writewall', 'write it on the wall'),
 ('comments', 'i mean in the comments'), ('thanks', 'thanks for watching'),
]

def words(text):
    return re.findall(r"[a-z0-9']+", text.lower().replace('-', ' '))

def main(tr_path, audio):
    tr = json.load(open(tr_path))
    asr = [(w[0].lower(), w[1], w[2]) for seg in tr for w in seg['words']]
    sw = words(SCRIPT)
    sm = difflib.SequenceMatcher(a=sw, b=[w for w, _, _ in asr], autojunk=False)
    times = [None] * len(sw)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size): times[blk.a + k] = asr[blk.b + k][1]
    known = [i for i, v in enumerate(times) if v is not None]
    import bisect
    for i in range(len(sw)):
        if times[i] is None:
            j = bisect.bisect_left(known, i); lo = known[j - 1] if j > 0 else None; hi = known[j] if j < len(known) else None
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
    # word list too (for on-word reveals): [word, t]
    wl = [[w, round(t, 2)] for w, t in zip(sw, times)]
    matched = sum(b.size for b in sm.get_matching_blocks())
    with open(os.path.join(ROOT, 'js/timing.js'), 'w') as f:
        f.write('/* Generated by pompeii/tools/align.py — word anchors (s into narration.mp3). */\n')
        f.write('window.TP = ' + json.dumps(out) + ';\n')
        f.write('window.TPW = ' + json.dumps(wl) + ';\n')
    keys = list(out.items())
    bad = [(keys[i][0], keys[i][1], keys[i + 1][0], keys[i + 1][1]) for i in range(len(keys) - 2) if keys[i + 1][1] < keys[i][1]]
    print(f'{matched}/{len(sw)} script words matched; {len(out)} anchors; duration {dur:.2f}s; non-monotonic: {bad}')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
