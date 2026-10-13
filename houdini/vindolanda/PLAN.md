# Vindolanda: "What did a Roman soldier at the edge of the world actually do?" (build plan)

Style: the painted skit look (`Guide.setTheme('warm')`, `js/paint.js`), lively in every shot. Narrated, so there are no
dialogue subtitles. Quotes from the tablets appear as paper on-screen text. Theo is the on-screen guide.
Length: ~2,450 words, about 16–17 min of voice. Delivered in parts (one mp4 per voice file / beat group).

## Preview built (no voice yet; timing estimated at ~150 wpm, TEMP captions)
`preview.html` + `js/cold.js` → `out/cold-open-preview.mp4` (Beat 1, first ~31 s):
inbox → 4 notifications stack (boss / supplies / package / party, confetti) → Theo hurls the phone into a wet ditch,
northern England (wind-up, ballistic arc, splash and ripples) → time-lapse cross-section, +1,900 YEARS, wet layer, no
oxygen → rain, the phone dissolves into a wooden leaf tablet, ink fades in → the four tablets with tags → Vindolanda
c. AD 100: timber fort on the Stanegate, smoke, flapping standard, auxiliaries marching.

## Assets needed from the user
| # | Asset | Where | Priority | Default if it doesn't come |
|---|---|---|---|---|
| 1 | Voice-over mp3 (one file, or one per beat) | all | **needed** | can't time the video without it |
| 2 | Photo of Robin Birley (excavating, 1973) | Beat 10 | nice | cartoon archaeologist with no likeness, named in a caption |
| 3 | Tab. Vindol. 291 hi-res (shows the change of hand) | Beat 8 | nice | faithful painted redraw with two visibly different hands |
| 4 | Tab. Vindol. 154 (strength report) | Beat 4 | nice | painted redraw + animated counter |
| 5 | Tab. Vindol. 628 (Masclus, beer), 2017 leave tablet | Beat 6 | nice | painted redraw |
| 6 | Tab. Vindol. 346 (socks, sandals, underpants) | Beat 7 | nice | painted redraw |
| 7 | Tab. Vindol. 155, 164; a side-on leaf tablet; an infrared tablet image | Beats 3, 5, 9, 10 | nice | painted redraws (infrared = animated reveal) |
| 8 | Children's shoe photo (Vindolanda Trust) | Beat 7 | nice | painted shoe (Trust images need their permission) |
| 9 | Sponsor: name, script, logo (or "no sponsor") | Beat 7 break | needed if sponsored | slot removed |
| 10 | Channel tagline + related-video title | Beat 10 outro | needed | placeholder end card |

Licensing: British Museum images are CC BY-NC-SA 4.0 (non-commercial). Check this before using them in a monetised video.

## I build
Maps (Roman Britain c. AD 90, the Stanegate between Tyne and Solway, pins for Vindolanda, Coria/Corbridge and London,
Hadrian's Wall drawing itself in AD 122), a headline slam with a made-up paper name, counters (752 / 456 / 296;
15 + 6 + 10 → 265; 343), barracks at grey dawn, the clerk's headcount, the supply chain in mud, the outpost in drizzle,
an empty beer barrel, the BEER / VACATION desk, a parcel, the soil-layer "no oxygen" diagram, lamplight in the
commander's house, the dusk gate, the 1973 dig, and an infrared reveal.
Cast (original designs, no known likenesses): Masclus, Flavius Cerialis, Sulpicia Lepidina, Claudia Severa, a scribe,
Iulius Verecundus, Tungrian and Batavian soldiers, local Britons, and enslaved household workers (drawn with dignity,
never as a gag). Theo's outfits: the suit (cold open, close) and a NEW auxiliary kit (mail shirt, helmet, oval shield)
for the "you are a Tungrian soldier" day.

## Engagement plan
- Hook: the phone-to-tablet cold open (built). It returns at the close, notifications stacking again.
- Myth Cards + BUSTED/FACT stamps: "Letters from Hadrian's Wall" (the Wall starts in 122) · "Roman soldiers fought
  all day" (a logistics company with swords) · the popular beer quote ≠ the published translation · "Nobody carves
  underpants into a triumphal arch" (FACT card).
- Refrain "Somebody wrote that down." gets a signature ink-and-stamp sting every time (and "Twice." gets two).
- Comic beats: Theo staring into the empty barrel; the sad tuba; Masclus' BEER + VACATION tablets; "sis".
- Tone shift in Beat 9: quiet music, no gags, muted palette.

## Data check (script only. The source log was NOT attached, so send it for a line-by-line check)
1. Stanegate "runs across the country from coast to coast": it ran roughly Corbridge (Tyne) to Carlisle (Solway), not
   literally coast to coast. Suggest "between the Tyne and the Solway".
2. Cold open "Somebody's mom sent a package" vs Beat 7 "probably family": the sender of Tab. Vindol. 346 is unknown.
   Suggest "somebody sent a package from home".
3. "Those exact four messages exist": boss = the 2017 leave request, supplies = 628 (beer), package = 346, party = 291.
   Confirm that mapping (the open then names only three of them).
4. Museum numbers (154 = BM 1989,0602.21; 291 = BM 1986,1001.64): please confirm against the log or the BM website.
5. "~5,000 shoes": totals vary by source and year (the Trust now cites more). It's fine as "one researcher's count".
6. [VERIFY] Cerialis = prefect of the Ninth Cohort of Batavians: consistent with the published tablets.
   The remaining checked facts match: AD 43, c. 85, 122, 752/456/46/337/296, 15/6/10 → 265, 343, cervesa, the 2017
   batch of ~25 with Masclus, 11 September, Brittunculi, 1973.

## Build notes (full voice, 13:11)
- The recording follows the script; it has no sponsor read, no channel tagline and no "[RELATED VIDEO]" line, so those
  slots are left out. pocketsphinx mishears names (Vindolanda, Masclus…) but timing anchors work on the recognised words.
- 95 shots on 271 voice anchors (`anchors.txt`), painted warm look, Theo in his suit as host and in Tungrian kit as "you".
- Costumes by the script: Tungrian auxiliaries (mail, focale scarf, studded belt, trousers, oval shield), Masclus as a
  cavalry decurion (plumed helmet, red cloak), Cerialis/Verecundus as equestrian prefects (narrow purple stripes, red
  cloak), officers' wives in stola + palla with Flavian curl crowns, Britons in checked wool with torcs, enslaved
  household workers in plain tunics, a 1973 digger in an anorak.
- New score (score2.js) with a mood per beat, ducking under the voice; new foley per action.
