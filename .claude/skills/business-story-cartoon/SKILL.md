---
name: business-story-cartoon
description: Make a video for the user's money / business-story channel — bright cartoon "business story" style (round-head bean characters, white-faced extras, handwritten text, white explainer slides) with the channel's own animated host and modern chart motion (biz/). Use when the user sends a script (and later a voice-over) for this channel, asks which assets a script needs, or asks to change/improve this channel's style, host, icons or charts.
---

# Business-story cartoon video (money channel)

Work lives in `biz/`. References: `biz/references/ref1-story.mp4`, `ref2-business.mp4` (study a few frames before a
new video). Host sheets + icon sheet: `biz/assets/host/*.webp`. Approved demos: `biz/out/preview.mp4` (cold-open
style + brighter palette), `biz/out/host-demo.mp4` (talking host + icons + charts).

## Step 1 — when the user sends the SCRIPT + SOURCE LOG: read it all, then order the visual assets (agreed rule)

The user sends the full script together with its source log. Read the whole script and the whole log before anything
else. **All data work is mine:** extract every number, date, quote and claim from the log, check each against the
script line that says it, and flag anything missing, mismatched or outdated. Never ask the user to filter text or data.

Then reply with an asset order that contains **only visual assets the user can supply** (photos, logos, designs):
1. **Logos** — one per brand / company named in the video, with the exact name spelling. (Default if missing: the name
   as plain text in the channel font — never redraw a logo from memory.)
2. **Photos of people** — each real, named person, to draw as a cartoon in the house style. Say which people become
   white-faced characters or name cards instead (private individuals, victims, families).
3. **Photos / designs of things** — products, store fronts, buildings, app screens, packaging, documents the user wants
   shown as real screenshots.
For each item say where it appears (chapter / line), mark it *needed* / *nice to have*, and give the default if it
doesn't come. Also list in one short line what I'll build myself (charts, counters, maps, document cards with source
tags, fictional names) and any data issues found in the log. Then wait for the assets + voice-over (or "run").

## Step 2 onwards — the protocol (same as the history channel)

Intake → align the voice to the words (`houdini/tools/asr.py` + an aligner like `houdini/tools/align-part5.py`)
and compute the lip-sync envelope (`python3 biz/tools/envelope.py voice.mp3 biz/js/env-<slug>.js`) → plan
(`biz/PLAN-<slug>.md`, shot table keyed to anchor words) → ~10 s preview, wait for "run" (unless the user already
said run) → build chapter by chapter → contact-sheet review of every shot (`node houdini/tools/_stills.mjs ../biz/<page>.html <dir> 0.75`
from `houdini/`) → render (`node tools/export-video.mjs ../biz/<page>.html ../biz/out/<name>.mp4 30` from `houdini/`)
→ audio check (~−1.5 dB peaks) → commit + push → send. Long videos (20 min+) are delivered in chapter batches (one mp4 per voice file). Do NOT join them into a full video — the user only wants the parts.
After each video add the user's feedback to *Lessons* below and push this file.

## Look (locked)

- From the references: round heads, dot eyes + short brows, bean bodies on thin stick legs, thin dark outlines;
  the lead / key people have skin tone, everyone else a white face with a grey shading crescent (`G.Bean.person`,
  `biz/js/bean.js`). Fonts (user's choice after the housing video: professional, easy to read, eye-catching): **Fredoka** (rounded display —
  titles, numbers, labels, dialogue) + **Nunito** (small print, sources, body lines), both OFL in `biz/assets/fonts/`.
  Wired through `biz/js/fonts.js` (`window.BIZ_FONT = 'clean'`, the default; `'classic'` = the old Caveat + Patrick Hand,
  kept only so the housing pages re-render unchanged). Kit/Charts call `HAND(w, px)` / `PRINT(px)`; sizes auto-scale. Dialogue = handwritten line beside the speaker or a speech/thought bubble; names = black card
  with white handwriting; explainer beats = clean white slides with icons, `$$$` vs `$$`, ticks/crosses.
- **Brighter than the references** (user's request): clear blue sky, fresh green grass, warm red brick, saturated
  clothes, peach/cream memory backgrounds, bright chart colours. No vignette (`window.TOON_FINISH = { grain: .015, vignette: 0 }`).
- Motion: calm and readable — cuts, gentle push-ins, pops with a soft overshoot, bubbles popping in, small acting.

## The host (always alive — locked rule)

`G.Host` (`biz/js/host.js`) is the user's host, rebuilt from `biz/assets/host/` (messy brown hair, stubble beard,
white shirt, olive tie, black mitten hands, black stick legs). He must never stand like a paper cut-out:
- **Talks**: whenever the narration is his voice on screen, pass `talk: Host.talk(t)` (envelope lip sync) — the head
  nods slightly with the voice.
- **Breathes and blinks** automatically from `t`; **glances** with `face.look`.
- **Gestures on the beats**: `pose: Host.pose(t, [[t0,'present'], [t1,'pointUp'], …])` — change pose every 2–4 s on
  key words. Poses: idle, present, presentL, presentBoth, pointUp, pointSide, pointSideL, crossed, hips, think, cheer,
  wave, shrug, chest, ok, thumbsUp, count.
- **Expressions** match the line: eyes open/happy/closed/wink/side; brows neutral/up/worried/angry/skeptic; mouth
  flat/smile/open/laugh/o/frown/scared/smirk. `walk` phase for walking.
- Skits ([BIT]) use the host as a character in sets (props like a slide deck, a cheap-suit variant via colours).

## Entertainment first, precise always (user feedback, housing video — LOCKED RULE)

This is YouTube entertainment, not a lesson. The data must stay exact, but a stat shown as a bare number on a white
slide is not enough. For every data beat, first ask "what would this look like as a tiny cartoon scene?":
- **Act the stat out with characters.** Example from the user: "24% of Gen Z and millennial buyers used family money"
  → a Gen Z and a Millennial character walk up to a house, stare at the price tag, then Mom & Dad roll in a briefcase
  of cash. The 24% lands as a big tag inside the scene, and the 21% (gift box drops in) and 11% (a will unrolls) arrive
  as props with labels. Same numbers, but it plays like a sketch.
- **Turn numbers into props**: price tags on houses, a briefcase or gift box of cash, handcuffs for lock-in, ice for a
  frozen market, a ladder for "steeper", a rocket or elevator for rates, a race for prices vs incomes, a seesaw for a debate.
- **Put people in the shot**: the "You" character, families, buyers, sellers, investors with reactions (shock, sweat,
  grin) and small gags. Keep one recurring character (e.g. "You") through the video so viewers follow a story.
- **Keep charts for real comparisons and trends** (3+ values, a line over time), and even then add a character or a
  prop reacting to the chart, or put the chart inside the world (a billboard, a phone screen, a newspaper).
- **Rhythm**: never two plain slide shots in a row. Aim for at least half the shots being scenes or skits. The host
  shows up for reactions and transitions.
- **One staged scene per line, not one scene with cards popping in.** When the narration moves to a new idea, the
  scene changes to act it out (the camera moves, the set changes, the characters do something new). Cards are labels
  inside the scene, never the main event. Example (housing ending): "isn't the age" → the buyer's ID stamped AGE: OK;
  "price of the ticket" → the buyer at a theme-park ticket window; "3× to 5× income" → the clerk flips the board to 5×
  while the buyer has only 3 paycheck bundles; "a decade not building" → a half-built ride with a calendar flipping 10
  years; "half locked in" → riders strapped in golden cuffs, the exit chained; "rates went back up" → ice melts, then a
  storm cloud with 7.28% lightning refreezes it; "who your parents are" → a bouncer at a velvet rope asking "Parents'
  names?"; "the American Dream → an inheritance" → the sign over the house flips while a will gets someone in.
- Turn every number into the thing it measures: price ÷ income = stacks of yearly paychecks; a response rate = envelopes
  that come back; a share of homes = a street where some houses wear a top hat; a payment rise = a fatter bill and money
  bags flying off; "opposite directions" = a seesaw; a record low = a playground slide; rates rising = a rocket.
- Precision stays: exact figures and dates, source tags, our-math footnotes, no invented numbers. Funny about money,
  never about the dead or victims.

## Icons and modern chart motion

- `G.Icons` (`biz/js/icons.js`): the user's icon set as animatable vectors — barsUp, barsDown, lineUp, lineDown, pie,
  calculator, laptop, phone, doc, clipboard, books, moneyBag, coins, piggy, wallet, magnifier, bulb, question, exclaim,
  arrowUp, arrowDown, check, cross, warning, coin. `Icons.pop(ctx, name, x, y, size, lt)` = overshoot entrance + the
  icon's own animation (bars grow, line draws, coins drop, check draws, bulb lights…).
- `G.Charts` (`biz/js/charts.js`): `bars`, `compare` (A vs B groups + legend), `hbars` (ranked/breakdown), `line`
  (draw-on, area fill, travelling value tag, dashed projection), `donut` (sweep, popped slice, centre counter),
  `counter`, `progress`, `callout`. Rules: gridlines/axis fade in first, bars stagger with a soft overshoot while
  values count up, one highlight colour for the bar that matters (others dim to grey), callout points at the takeaway,
  every number from the script's source log (I extract and check it myself), source tag on screen for key figures.

## Shot kit, sound and page setup

- `G.Kit` (`biz/js/kit.js`): backgrounds (`bg.sky/white/cream/studio/color`), `popAt` overshoot entrances, `card`,
  `nameCard` (black card, white handwriting), `bubble`, `stamp`, `slam` (big number), `logo` (a supplied logo on a white
  card, `crop` option), `photoCircle`, `source` (bottom-left source tag), `headline`, `doc`, `house`, `envelope`,
  `strike/cross/check/arrow/scribbleCircle`, `host` (talking host shortcut), `tween`.
- Sound: `biz/js/bizsound.js` replaces the history score on biz pages — bright marimba bed (moods `bright`, `soft`,
  `tense`, `none`) + UI foley (`pop, click, whoosh, swoosh, thud, stamp, paper, ding, cash, tick, type, buzz, boing,
  rise, mail`). Put a `swoosh` on every cut and a `pop` on each card entrance.
- Page script order: `../houdini/js/toon.js`, `js/bizsound.js`, `js/fonts.js`, `js/bean.js`, `js/host.js`, `js/icons.js`,
  `js/charts.js`, `js/kit.js`, `js/env-<slug>.js`, `js/<slug>.js`, `../houdini/js/player.js` (example: `biz/housing-1.html`).
- Supplied assets go in `biz/assets/<video>/` with slug names; load them through `Show.images` and draw with `Kit.logo`.
  RAR archives: `apt-get install libarchive-tools`, then `bsdtar -xf`. Google Drive links are blocked here, so ask for a
  zip/rar in the chat or a GitHub upload instead.
- Spot-check frames at exact times: `node tools/_at.mjs biz/<page>.html <dir> 12.5 40 …` (from `houdini/`).
- Long scripts arrive as several voice files (e.g. cold open + setup); build one page per voice file and join at the end.

## Music per topic (user question after the housing video)

The housing video used one bright marimba bed with mood switches. From now on choose the bed per topic and say which in
the plan (the user can override or send their own tracks): upbeat/bright for money-explainers and success stories,
investigative/minor pulse for scandals, lawsuits and "how they quietly…" stories, soft/lo-fi for personal-finance and
reflective endings, tense for crashes and turning points. Switch moods at chapter beats. Keep music ~−20 dB under the
voice, and keep `Show.moods` cues on scene changes. Add new beds to `biz/js/bizsound.js` as named styles when a topic needs one.

## Physics and reality check (user feedback, housing video)

Before rendering, check every scene for things that break physical sense: feet on the ground (nothing floating unless it
is a balloon or flying on purpose), ropes and strings attached at both ends, objects resting on a surface, things
falling down not sideways, scale consistent between characters and props, characters holding props with a hand that
reaches them, doors and gates the right size for the people, liquids/ice/clouds behaving as expected. Fix anything that
would look "wrong" to a viewer even in a cartoon.

## Content rules

- Funny about money, never about the dead / victims; allegations always shown with the denial and the outcome
  (e.g. ALLEGED → DENIED → SETTLED stamps); "not advice" lines kept.
- No copied logos unless the user supplies the file; fictional names where the script asks (e.g. the funeral-home sign).
- Real people the script names: cartoon in house style from the user's photo, or a name card / white-faced figure.

## Lessons (keep adding)

- Keep IK targets reachable: arm length 90 + 86 units from the shoulder; hanging hands at ~(±84, −160).
- Charts: keep the legend away from the tallest bar's value label; callouts above the title line; the host goes in a
  corner that doesn't cover values.
- In tool-written JS, never let a `//` comment swallow code on the same line (it broke `host.js` once).
- Check the voice file matches the script before building (the first housing upload was the funeral cold open).
- Logos: check the supplied file is the right organisation (e.g. "The Cato Corporation" ≠ the Cato Institute) and flag it.
- Deliver parts only (one mp4 per voice file); the user doesn't want a joined full video. Chat uploads cap at 30 MB.
- Housing video feedback: the numbers and charts were right but the video felt like a lesson. Act stats out as scenes (see "Entertainment first, precise always").
- Housing ending feedback: don't keep one scene and pop title cards over it; build a scene for each line and put the card inside it.
- Housing video final feedback: all parts OK; some scenes broke the logic of physics/reality — run the physics check. Fonts switched to Fredoka + Nunito.
- Pricing video music: the user rejected the minor 'investigate' pizzicato bed, the upbeat 'pop' bed and the history channel's myth-buster score (`mstill`/`mystery`/`mtense`). After research (narrated money explainers mostly use lo-fi hip-hop: calm, leaves gaps for the voice) the bed is **`lofi`** (swung boom-bap at 82 BPM, electric-piano 7ths, sub bass, vinyl crackle) with **`lofiKeys`** (no drums) for serious beats — check the user's verdict on it before the next video. Keep the bed ~17 dB under the voice: pricing pages use `musicGain: .14`. `houdini/js/player.js` now passes `show.musicGain` / `sfxGain` to the sound engine (before, page-level musicGain was silently ignored). Music changes don't need a re-render: render the soundtrack and remux it onto the existing mp4.
- Check spoken numbers against the script after ASR (pricing part 2: ASR heard "$4.77" where the script says "$4.79"); show the script's figure and tell the user.
